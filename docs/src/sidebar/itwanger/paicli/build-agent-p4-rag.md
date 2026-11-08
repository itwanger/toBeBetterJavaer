---
title: 手搓 Java 终端 Agent 第 4 期，ripgrep 精确搜索、AST 代码分块与 SQLite 混合检索
shortTitle: Agent代码检索与RAG
description: PaiCLI 第 4 期，基于最新源码拆解 Agent 的代码检索与本地 RAG 实现，涵盖 glob_files 与 grep_code 的双层截断和行段建议、JavaParser AST 多粒度代码分块、跨文件批量 Embedding、SQLite 向量存储与 SHA-256 增量索引、Jieba 分词混合检索以及代码关系图谱。
keywords: Agent RAG, 代码检索, JavaParser AST, SQLite 向量检索, PaiCLI
tag:
  - Agent
  - Java
  - RAG
category:
  - AI
author: 沉默王二
date: 2026-04-21
---

大家好，我是二哥呀。

前三期我们给自研的 PaiCLI Harness 搭好了 ReAct 循环、Plan-and-Execute 任务调度和三级上下文记忆。现在 Agent 已经能接下多步任务，也能在长对话里管住上下文窗口了。

但只要把它放进一个几万行代码的真实项目里，新的问题马上就会冒出来。

比如你问它，“项目里是怎么压缩上下文的”，或者“权限拦截的逻辑写在哪”。

模型在回答之前，得先去代码库里找到相关的源码文件。怎么找？

在日常开发里，找代码通常分两种情况。

第一种情况是知道明确的类名、方法名、配置项或者报错字符串，比如想找 `@Transactional` 用在哪些类上，或者 `AutoCompactionManager` 在哪被调用。这时候用 `glob_files` 按文件名匹配、用 `grep_code` 调起底层的 `ripgrep` 扫描文本，几十毫秒就能定位到具体行号，既不需要提前建索引，也不会漏掉刚改过的代码。

第二种情况是用户只给了一句模糊的自然语言描述，比如“处理登录超时的地方”或者“批量算向量的逻辑”，自己也叫不出类名。这时候让模型靠猜词去跑 `grep_code`，往往搜上三四轮都捞不到目标代码。

所以在 PaiCLI 的 Harness 设计里，我们把两套方案结合了起来。日常找文件名、搜精确符号，优先走 4 路并行的 `glob_files`、`grep_code` 和 `read_file`；遇到模糊的自然语言提问，或者普通搜索无果时，就调用 `search_code` 走本地 RAG 混合检索。

![](https://cdn.paicoding.com/paicoding/0a494256f19f42765191cb3bb94d252d.jpg)

这一期我们对照 PaiCLI 的最新源码，把这套代码搜索与本地 RAG 的实现细节从头到尾讲清楚：

- `glob_files`、`grep_code`、`read_file` 和 `search_code` 四个工具怎么配合；
- 怎么用 JavaParser 按语法树把源码切成类块和方法块；
- 向量怎么跨文件批量生成，怎么用 SQLite 和 SHA-256 指纹做秒级增量索引；
- 混合检索怎么把语义相似度、关键词位置加分和代码块类型结合起来，以及怎么从语法树里提取类的继承和调用关系。

## 01、精确搜索与 RAG 混合检索怎么分工

PaiCLI 的系统提示词 `prompts/base.md` 给模型定下了明确的代码查找顺序。遇到当前项目内的文件和代码问题，先用 `glob_files`、`grep_code` 和 `read_file` 现用现查；只有用户描述模糊、关键词难以确定，或者普通搜索多轮无果时，才调用 `search_code` 做语义辅助。

```markdown
- 当前项目内的文件和代码优先使用 `glob_files` / `grep_code` / `read_file` 现用现查：先找文件或符号，再按需读取具体行段。
- 精确符号、文件名、字符串、命令入口、调用链定位优先 `grep_code` / `glob_files`，不要为了这类任务先走 `search_code`。
- `grep_code` 返回 `partial: true` 或 `suggested_reads` 时，优先缩小 `path`/`glob`/`pattern` 或按建议调用 `read_file offset/limit` 读取命中附近上下文，不要一次性读取大文件。
- `search_code` 只作为语义辅助：适合用户描述很模糊、关键词难以确定、普通搜索多轮无果，或代码/文档/知识混合检索场景。
```

这四个工具都用于读取项目内容，全部放进了 `ToolRegistry.PARALLEL_SAFE_TOOLS` 白名单。模型在同一轮里连续发起多个搜索或读文件请求时，执行器会用最多 `4` 个线程并行执行，最后按原来的顺序把结果交回模型。

其中 `grep_code` 由 `RipgrepCodeSearchEngine` 和 `JavaCodeSearchEngine` 双引擎驱动。本机装了 `ripgrep` 时优先拉起 `rg --json` 子进程，限时 `8` 秒；本机没装 `rg` 或者启动异常时，自动切回 Java 原生的文件遍历与正则匹配，跳过超过 `2 M` 的大文件和前 `4096` 字节里含 `\0` 的二进制文件。

为了防止一次搜索返回几千行结果把上下文窗口占满，`grep_code` 做了两道截断保护：

- 在搜索引擎内部，单个文件命中满 `head_limit`（默认 `20` 条）就不再收录该文件的后续行，总命中满 `max_results`（默认 `50` 条）就终止搜索并标上 `partial: true`；
- 在结果拼接阶段，输出总长度达到 `max_chars`（默认 `24000` 个字符）就停止拼接，提示模型缩小搜索范围。

光搜出命中的那一行还不够，模型还得看那一行前后的代码。如果让模型自己猜行号去读文件，经常会读偏，或者干脆把整个大文件全读进来。所以 `ToolRegistry.appendSuggestedReads` 会在 `grep_code` 的结果末尾自动附上最多 `3` 条分段读取建议。

```java
// src/main/java/com/paicli/tool/ToolRegistry.java
private void appendSuggestedReads(StringBuilder sb, List<GrepMatch> matches) {
    if (matches.isEmpty()) {
        return;
    }
    sb.append("\nsuggested_reads:");
    Set<String> seen = new LinkedHashSet<>();
    for (GrepMatch match : matches) {
        if (seen.size() >= 3 || !seen.add(match.file())) {
            continue;
        }
        int offset = Math.max(1, match.lineNumber() - 20);
        sb.append("\n- read_file {\"path\":\"")
                .append(match.file().replace("\\", "\\\\").replace("\"", "\\\""))
                .append("\",\"offset\":").append(offset)
                .append(",\"limit\":80}");
    }
}
```

每条建议都以命中行号为中心，往前推 `20` 行作为起始行 `offset`，往下读 `80` 行作为 `limit`。模型照着建议调用一次 `read_file`，就能拿到带行号的目标代码段。

![](https://cdn.paicoding.com/stutymore/build-agent-p4-rag-20261106155251-b693d8a2.jpg)

那么遇到模糊提问，轮到 `search_code` 上场时，本地 RAG 需要依次跨过切分、存储和检索三道关卡。

源码如果按固定字数硬切，经常把一个方法从中间劈成两半，丢失类名和方法签名，所以得先按语法结构切成文件、类和方法三个粒度。

切完算出来的向量还得找地方存。PaiCLI 是一个开箱即用的命令行工具，如果要求用户先装 Docker、启动 Milvus 或 Elasticsearch 才能查代码，使用门槛就太高了，用内嵌的 SQLite 配合增量索引，单文件就能落盘。

存进 SQLite 之后，最后还要解决怎么搜得准确的问题。纯向量检索对自然语言同义词灵敏，但对代码里的精确类名和方法名不够敏感，需要把向量相似度、分词关键词位置加分和代码块类型加分结合起来。

围绕这三个环节，PaiCLI 的 `rag/` 包拆分成了这些核心类：

- `CodeChunk`：代码块数据模型，记录文件路径、块类型、名称、源码内容和起止行号
- `JavaSourceParser`：用 `ThreadLocal` 管理非线程安全的 `JavaParser` 实例
- `CodeChunker`：基于 AST 语法树切分 Java 代码，非 Java 文件按行分段
- `CodeRelation` 与 `CodeAnalyzer`：从 AST 提取继承、实现、导入、包含和方法调用五种关系
- `EmbeddingClient`：封装本地 Ollama 与远程 OpenAI 兼容向量接口，支持跨文件批量请求
- `VectorStore`：基于 SQLite 持久化代码块、关系图谱与文件增量指纹
- `CodeIndex`：多线程增量索引流水线入口
- `RagQueryTokenizer`：结合 `jieba` 中文分词与正则提取代码标识符
- `CodeRetriever`：执行语义打底与关键词加权的混合检索
- `SearchResultFormatter`：生成零延迟检索摘要，格式化终端与工具输出

## 02、用 JavaParser 按语法结构切分代码

代码分块决定了后面检索的上限。分块时如果把两个不相干的方法拼在一起，或者把方法头和核心逻辑拆开，算出来的向量就会失真。

PaiCLI 对 Java 源码和其他文本文件采取不同的切分策略。

![](https://cdn.paicoding.com/paicoding/cab7c86aefca9012ae6d79fd3cd5f836.png)

Java 源码统一由 `JavaSourceParser` 调用 `JavaParser` 解析成抽象语法树（AST，即 `CompilationUnit`），语言级别设为 `JAVA_17`，支持文本块、`record` 和 `sealed class` 等语法。

由于官方说明 `JavaParser` 实例不是线程安全的，而在建索引时会有多个线程同时解析文件，`JavaSourceParser` 用 `ThreadLocal` 为每个工作线程分配一个独立的解析器实例。

```java
// src/main/java/com/paicli/rag/JavaSourceParser.java
final class JavaSourceParser {
    private static final ThreadLocal<JavaParser> PARSER = ThreadLocal.withInitial(() -> new JavaParser(
            new ParserConfiguration().setLanguageLevel(ParserConfiguration.LanguageLevel.JAVA_17)));

    static Optional<CompilationUnit> parse(String content) {
        ParseResult<CompilationUnit> result = PARSER.get().parse(content);
        if (!result.isSuccessful()) {
            return Optional.empty();
        }
        return result.getResult();
    }
}
```

解析出来的 `Optional<CompilationUnit>` 会同时传给分块器 `CodeChunker` 和关系分析器 `CodeAnalyzer`，保证每个 Java 文件在建索引时只解析一次语法树。

拿到语法树后，`CodeChunker.chunkJavaFile` 会遍历文件里的类、接口、枚举和 `record` 声明，生成类和方法两种粒度的代码块。

针对类声明本身，分块器只截取开头的最多 `6` 行（从起始行 `classStart` 到 `classStart + 5`）生成 `class` 块，包含包名上下文、类注释、类名、泛型签名和开头的字段声明，不把几百行的方法实现塞进去。

接着分块器继续往里遍历类里的每个方法与构造函数，用 `getDeclarationAsString(false, false, false)` 提取不带修饰符、返回类型和异常声明的简短签名（例如 `run(String userInput)`），拼成 `类名.方法签名` 作为块名称，正文则保留从 `methodStart` 到 `methodEnd` 的完整方法体源码，单独生成 `method` 块。

```java
// src/main/java/com/paicli/rag/CodeChunker.java
cu.findAll(ClassOrInterfaceDeclaration.class).forEach(clazz -> {
    int classStart = clazz.getBegin().map(p -> p.line).orElse(0);
    int classEnd = clazz.getEnd().map(p -> p.line).orElse(0);
    String className = clazz.getNameAsString();
    String classHeader = extractLines(content, classStart, Math.min(classStart + 5, classEnd));
    chunks.add(CodeChunk.classChunk(filePath.toString(), className, classHeader, classStart, classEnd));

    clazz.getMethods().forEach(method -> {
        int methodStart = method.getBegin().map(p -> p.line).orElse(0);
        int methodEnd = method.getEnd().map(p -> p.line).orElse(0);
        String methodSignature = method.getDeclarationAsString(false, false, false);
        String methodContent = extractLines(content, methodStart, methodEnd);
        chunks.add(CodeChunk.methodChunk(filePath.toString(),
                className + "." + methodSignature, methodContent, methodStart, methodEnd));
    });
});
```

非 Java 文件（如 Markdown、YAML、XML、Python、TypeScript 等），或者极少数存在语法错误导致 AST 解析失败的 Java 文件，会自动退化到 `chunkLargeText` 处理。

`chunkLargeText` 按行累积，每段以 `2000` 个字符为目标。短文件整份收录，长文件记录每段的起止行号。单行本身超过 2000 个字符时，仍保留完整的一行，送给向量模型时才截断。

每个切出来的代码块都封装成 `CodeChunk` 记录。在送去计算向量之前，`toEmbeddingText` 会把块类型和块名称拼到源码正文最前面。

```java
// src/main/java/com/paicli/rag/CodeChunk.java
public record CodeChunk(String filePath, String chunkType, String name,
                        String content, int startLine, int endLine) {
    public String toEmbeddingText() {
        return String.format("[%s:%s] %s", chunkType, name, content);
    }
}
```

比如 `Agent` 类的 `run` 方法，送给向量模型的文本会变成 `[method:Agent.run(String userInput)] public String run(String userInput) { ... }`。把所属类名和方法签名显式带进向量输入，能帮向量模型区分不同类里的同名方法。

## 03、本地与远程 Embedding 怎么跨文件批量调用

切好代码块之后，下一步是由 `EmbeddingClient` 把文本转成浮点数向量 `float[]`。

为了兼顾离线隐私和低配机器，`EmbeddingClient` 同时支持本地 Ollama 模型和远程 OpenAI 兼容接口（如智谱 GLM、OpenAI 等）。默认走本地 Ollama 的 `nomic-embed-text:latest` 模型，代码不出本机，断网也能建索引。

![](https://cdn.paicoding.com/paicoding/04f191f1fc08dbdc9b26841789c5728b.jpg)

如果本机不想跑本地模型，通过环境变量就能切换到智谱等远程接口，不需要改动代码。

```bash
export EMBEDDING_PROVIDER=glm
export EMBEDDING_MODEL=embedding-3
export EMBEDDING_BASE_URL=https://open.bigmodel.cn/api/paas/v4
export EMBEDDING_API_KEY=your_key_here
```

单条输入的字符上限 `MAX_INPUT_CHARS` 设为 `2000`。中文占比较高的文本，2000 个字符大约对应 4000 到 6000 个 Token，控制在 8192 上下文窗口模型的安全范围内；超出 2000 个字符的超长方法，在向量化前截断前 2000 个字符，避免远程接口报长度超限错误。HTTP 客户端的连接超时设为 `30` 秒，读取超时设为 `120` 秒，留出 Ollama 首次把模型加载进内存的时间。

在 `/search` 或 `search_code` 查询阶段，每次只需要把用户的提问转成一条向量，调用 `embed(String)` 即可。但在 `/index` 建索引阶段，一个中型项目往往有上万个代码块，如果每个代码块发一次 HTTP 请求，网络往返的开销会把索引时间拖得很长。

所以建索引时走的是批量方法 `embedAll(List<String>)`，默认每 `32` 条文本打包成一批（可通过环境变量 `EMBEDDING_BATCH_SIZE` 调整）。

批量调用时有三个细节需要处理。

第一个细节是空文本保序。列表里如果遇到空字符串或 `null`，客户端会跳过网络发送，在本地填入空数组 `new float[0]`，并用 `batchSlots` 记下每条非空文本在原列表里的下标，收到响应后再按槽位放回，保证返回的向量列表和输入列表严格一一对应。

第二个细节是远程接口的乱序归位。OpenAI 兼容接口的批量请求发往 `/embeddings`，响应体里的 `data` 数组不保证按输入顺序排列，所以 `embedOpenAICompatibleBatch` 会读取每个元素的 `index` 字段，按 `ordered[index]` 放回原位置。

第三个细节是 Ollama 新旧版本的接口兼容。Ollama 从 0.3 版本开始提供批量接口 `/api/embed`，接收字符串数组 `input` 并返回二维数组 `embeddings`；更早的旧版本只有单条接口 `/api/embeddings`。

```java
// src/main/java/com/paicli/rag/EmbeddingClient.java
private List<float[]> embedOllamaBatch(List<String> inputs) throws IOException {
    if (!ollamaBatchUnsupported) {
        ObjectNode requestBody = mapper.createObjectNode();
        requestBody.put("model", model);
        ArrayNode input = requestBody.putArray("input");
        inputs.forEach(input::add);
        try {
            String responseBody = postJson(baseUrl + "/api/embed", requestBody.toString(), false);
            JsonNode embeddings = mapper.readTree(responseBody).path("embeddings");
            if (!embeddings.isArray()) {
                throw new IOException("Ollama 返回的 embeddings 格式不正确: " + abbreviate(responseBody));
            }
            List<float[]> result = new ArrayList<>(embeddings.size());
            embeddings.forEach(node -> result.add(toVector(node)));
            return result;
        } catch (NotFoundException e) {
            if (!e.getMessage().contains("page not found")) {
                throw e;
            }
            ollamaBatchUnsupported = true;
        }
    }
    List<float[]> result = new ArrayList<>(inputs.size());
    for (String text : inputs) {
        result.add(embedOllama(text));
    }
    return result;
}
```

这里有一个很容易踩坑的地方，Ollama 在不同故障下都会返回 HTTP 404。旧版 Ollama 不认识 `/api/embed` 这个路径时，响应体是 `404 page not found`；而用户还没执行 `ollama pull` 拉取对应的模型时，响应体是 `{"error":"model ... not found"}`。

`embedOllamaBatch` 捕获到 404 后，会检查错误信息里是否包含 `page not found`。只有确认是接口路径不存在，才把 `ollamaBatchUnsupported` 设为 `true`，后续批次自动回退到 `/api/embeddings` 逐条调用；如果是模型未安装导致的 404，则原样抛出异常提醒用户，不会白白退化去重试 32 次单条请求。

我们在 Apple M3 Max 上用本地 Ollama 的 `nomic-embed-text` 模型，抽取 PaiCLI 源码里 200 个真实方法体（平均长度 454 个字符）做了实测对比：

- 逐条调用 `/api/embeddings`：平均每条耗时 `16.4ms`；
- 批量调用 `/api/embed`（10 条/批）：平均每条耗时降到 `8.1ms`；
- 批量调用 `/api/embed`（50 条/批）：平均每条耗时降到 `7.2ms`。

按 5 个开源项目共 `37106` 个代码块折算，批量调用能把向量化耗时从约 10 分钟缩短一半以上。

## 04、SQLite 向量存储与 SHA-256 增量索引

算出来的向量和代码块，由 `VectorStore` 统一存进本地 SQLite 数据库，默认路径是 `~/.paicli/rag/codebase.db`（可通过系统属性 `paicli.rag.dir` 覆盖）。所有项目共用这一个数据库文件，表里通过 `project_path` 字段隔离不同项目的数据。

![](https://cdn.paicoding.com/paicoding/2c798a2cd3ececb90e8663832bf4c7eb.jpg)

`VectorStore.initTables` 在初始化时建了三张表和 7 个索引：

- `code_chunks` 表：保存每个代码块的项目路径、文件路径、块类型、名称、源码正文、起止行号，以及序列化为 JSON 数组的向量 `embedding_json`；
- `code_relations` 表：保存类与方法之间的五种依赖与调用关系；
- `indexed_files` 表：以 `(project_path, file_path)` 为联合主键，记录每个已索引文件的内容哈希 `content_sha256` 和当时使用的向量模型标识 `embedding_model`。旧索引升级后仍能搜索，再执行一次 `/index` 会重新处理旧文件，补齐行号。

7 个 B-Tree 索引分别建在 `code_chunks` 的 `project_path`、`file_path`、`chunk_type` 列，以及 `code_relations` 的 `project_path`、`from_name`、`to_name` 和 `(project_path, from_file)` 列上，保证按项目过滤、按类名查调用关系和按文件删除旧索引时不会触发全表慢查询。

把向量存成 JSON 文本并在内存里计算余弦相似度，够不够快？

一个常见的中小型项目通常是几百到几千个代码块。以 768 维的 `float[]` 向量为例，1000 个代码块在内存里只占约 3 M 空间，遍历计算一遍点积与模长的余弦相似度只需几十毫秒，省去了部署独立向量数据库的运维负担。

单次查询只需几十毫秒，接下来要解决的是建索引的速度。如果每次执行 `/index` 都把旧表清空、所有文件重新解析和算向量，一个近两千个文件的项目每次都要等两三分钟；万一中途网络抖动或 Ollama 没启动，清空后的索引还会丢失。

所以 `CodeIndex` 设计了一套多线程并行解析 + 滑动窗口限流 + SHA-256 增量更新的索引流水线。

![](https://cdn.paicoding.com/stutymore/build-agent-p4-rag-20261106155554-1caa677b.jpg)

流水线启动后，先扫描项目目录，跳过 `node_modules`、`target`、`build`、`.git`、`.idea` 等目录以及所有以 `.` 开头的隐藏目录，只保留 `.java`、`.py`、`.js`、`.ts`、`.go`、`.rs`、`.md`、`.xml`、`.yaml` 等 18 种源码与配置文件后缀。超过 `1 M`（`MAX_FILE_BYTES`）的文件一并跳过，这类文件多半是打包产物或生成代码。索引器只收录普通文件，会跳过符号链接。

扫描完当前磁盘上的文件列表后，先和 `indexed_files` 表里的历史记录做一次比对。如果某个文件已经在磁盘上删除了，或者现在体积超过了 `1 M`，就调用 `store.removeFiles` 把它在三张表里的旧记录清掉。

接下来进入并行解析阶段。`CodeIndex` 默认启动 `4` 个工作线程（可通过环境变量 `PAICLI_INDEX_THREADS` 调整）。为什么默认是 4 线程而不是把 CPU 核心占满？

我们在 Apple M3 Max（JDK 21，`-Xmx2g`）上，拿 `flexmark-java`、`PaiFlow`、`pmhub`、`ruoyi-ai`、`paicoding` 五个本地项目的 `5874` 个 Java 文件（共 58 万行代码，解析出 6297 个类、30809 个方法和 189455 处方法调用）做了对比测试，不同线程数下的耗时如下表所示。

| 线程数 | 解析总耗时 | 现象说明 |
|---|---|---|
| 1 线程 | 4.6 秒 | 单核顺序解析基准耗时 |
| 2 线程 | 2.5 秒 | 耗时缩短近一半 |
| 4 线程 | 1.9 秒 | 达到吞吐峰值 |
| 8 线程 | 2.3 秒 | AST 临时对象分配过快，触发 70 次 Young GC，耗时不降反升 |
| 16 线程 | 3.0 秒 | 线程竞争与 GC 开销进一步放大（扩到 `-Xmx8g` 表现一致） |

此外，AST 解析的速度远快于 Embedding 网络请求。如果让 4 个线程一口气把几千个文件全解析完堆在队列里等 Embedding，内存很快就会被 AST 节点和代码块文本撑满。

为此，`CodeIndex.IndexRun` 用一个双端队列 `Deque<Future<ParsedFile>> window` 做了滑动窗口背压控制，窗口上限设为 `threads * 4`（默认 `16` 个文件）。

```java
// src/main/java/com/paicli/rag/CodeIndex.java
for (Path file : files) {
    window.add(pool.submit(() -> parse(file)));
    if (window.size() >= threads * 4) {
        accept(window.poll().get());
    }
}
while (!window.isEmpty()) {
    accept(window.poll().get());
}
```

队列里待处理的文件达到 16 个时，主线程就停下来调用 `window.poll().get()` 消费最早提交的文件，触发向量化和落库，保证解析队列最多容纳 16 个任务，等着批量向量化的文件还会暂存在 `pending` 中。

在每个工作线程内部，`parse(Path)` 先读取文件字节算出 `SHA-256` 摘要，并拼上当前的向量模型标识 `provider:model`。

```java
// src/main/java/com/paicli/rag/CodeIndex.java
byte[] bytes;
try (var input = Files.newInputStream(file, LinkOption.NOFOLLOW_LINKS)) {
    bytes = input.readNBytes((int) MAX_FILE_BYTES + 1);
}
if (bytes.length > MAX_FILE_BYTES) {
    throw new IOException("文件超过 1MB");
}
String sha256 = HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256").digest(bytes));
VectorStore.IndexedFile previous = known.get(file.toString());
if (previous != null && previous.contentSha256().equals(sha256)
        && previous.embeddingModel().equals(embeddingModel)) {
    return new ParsedFile(file, sha256, true, List.of(), List.of(), null);
}
```

只要文件内容哈希和上次一样，而且用户没有切换向量模型，就标记为 `unchanged = true` 返回，既不解析语法树，也不调用向量模型。如果用户切换了 `EMBEDDING_MODEL`，由于不同模型产出的向量不能混在一起算余弦相似度，条件不满足，所有文件就会自动重新向量化。

对于发生变化的文件，主线程在 `accept` 方法里把它们暂存进 `pending` 列表，跨文件累加代码块数量。一旦攒够 `32` 个代码块（`embeddingClient.getBatchSize()`），就触发一次 `flush()`，先调 `embedAll` 批量算出这批代码块的所有向量，再调用 `VectorStore.replaceFiles` 在单个 SQLite 事务里完成更新。

```java
// src/main/java/com/paicli/rag/VectorStore.java
public void replaceFiles(List<FileIndex> files) throws SQLException {
    inTransaction(() -> {
        deleteFileRows(files.stream().map(FileIndex::filePath).toList());
        List<CodeChunkEntry> entries = new ArrayList<>();
        List<CodeRelation> relations = new ArrayList<>();
        files.forEach(file -> {
            entries.addAll(file.entries());
            relations.addAll(file.relations());
        });
        insertChunkRows(entries);
        insertRelationRows(relations);
        // 批量更新 indexed_files 指纹表...
    });
}
```

`replaceFiles` 关闭了 `autoCommit`，在同一个事务里依次删掉这批文件旧的代码块和关系记录、批量插入新代码块、批量插入新关系，并写入新的 `SHA-256` 指纹。全部成功才执行 `commit()`，中途任何一步出错就整批 `rollback()`。

如果某一批调用 `embedAll` 时报错（比如某个文件含有特殊字符，或者远程服务闪断），`flush` 会立即退化为按单个文件循环重试，能成功算向量的文件照常更新落库，失败的那个文件打印一行警告，数据库里保留它上一次的旧索引和旧指纹，等下次执行 `/index` 时自动补上。

拿 `pmhub` 项目的 `1892` 个文件实测，旧版每次清空重建需要 `218.9` 秒；改成 4 线程解析加 32 条批量 Embedding 后，首次全量索引降到 `128.7` 秒，不改代码再跑一次 `/index`，只需 `0.8` 秒就完成了全库校验。

## 05、向量打底与关键词加权的混合检索

索引建好之后，怎么把用户要找的代码准确排到第一位？

纯向量检索在代码场景下有一个短板。比如用户问“Agent 的 ReAct 循环是怎么实现的”，库里有一个简短的 `Task.getId()` 方法，碰巧在向量空间里离这句话挺近（假设余弦相似度 `0.85`），而核心的 `Agent.run(String userInput)` 因为方法体长、细节多，余弦相似度只有 `0.80`。只按向量相似度排序，核心方法就会排到后面去。

为了解决这个问题，`CodeRetriever.hybridSearch` 把语义检索、分词关键词检索、双重命中奖励、代码块类型加分和单文件限流组合在了一起。

![](https://cdn.paicoding.com/paicoding/118d8c939237b500fc5adabee1c69760.jpg)

在查关键词之前，先由 `RagQueryTokenizer.tokenize` 把用户的自然语言提问拆分成有效词项。

如果只用 `jieba` 中文分词，遇到 `MemoryManager.compress`、`user_id`、`spring.datasource.url` 这类带点号、下划线或连字符的代码标识符，分词器会把它们拆碎。所以 `RagQueryTokenizer` 走了双路提取，结果合并进 `LinkedHashSet` 保序去重：

- 调 `JiebaSegmenter.sentenceProcess` 做中文分词；
- 用正则 `[A-Za-z][A-Za-z0-9_.$-]{1,}` 从原句里提取长度至少为 2 的英文与代码符号。

```java
// src/main/java/com/paicli/rag/RagQueryTokenizer.java
static Set<String> tokenize(String query) {
    LinkedHashSet<String> tokens = new LinkedHashSet<>();
    if (query == null || query.isBlank()) return tokens;
    String normalized = query.trim();
    for (String word : SEGMENTER.sentenceProcess(normalized)) {
        if (isUsefulToken(word.trim())) tokens.add(word.trim());
    }
    Matcher matcher = ASCII_TOKEN.matcher(normalized);
    while (matcher.find()) {
        if (isUsefulToken(matcher.group())) tokens.add(matcher.group());
    }
    return tokens;
}
```

拆分出来的词项还会去掉单字符，并过滤掉 `"怎么"`、`"如何"`、`"什么"`、`"哪些"`、`"一下"`、`"实现"`、`"的是"`、`"一个"`、`"可以"`、`"这里"`、`"那里"` 这 11 个高频疑问虚词。像“Agent 的 ReAct 循环是怎么实现的”这句话，拆分完就只留下 `Agent`、`ReAct`、`循环` 三个核心词。

有了干净的词项，`CodeRetriever.hybridSearch` 就可以把语义召回和关键词匹配融合起来重排。

```java
// src/main/java/com/paicli/rag/CodeRetriever.java
public List<VectorStore.SearchResult> hybridSearch(String query, int topK) throws Exception {
    Map<String, VectorStore.SearchResult> merged = new HashMap<>();
    int semanticLimit = Math.max(topK * 2, 10);
    for (VectorStore.SearchResult result : semanticSearch(query, semanticLimit)) {
        keepHighestScore(merged, result);
    }

    Map<String, VectorStore.SearchResult> bestKeywords = new HashMap<>();
    for (String keyword : RagQueryTokenizer.tokenize(query)) {
        for (VectorStore.SearchResult result : keywordSearch(keyword)) {
            keepHighestScore(bestKeywords, boostKeywordMatch(result, keyword));
        }
    }

    // 每个块最多从关键词一路进入一次，此处发生合并时一定是两路都命中。
    bestKeywords.forEach((key, keyword) -> merged.merge(key, keyword, (semantic, lexical) ->
            withScore(semantic, Math.max(semantic.similarity(), lexical.similarity()) + 0.1)));

    List<VectorStore.SearchResult> ranked = new ArrayList<>();
    for (VectorStore.SearchResult r : merged.values()) {
        double typeBoost = switch (r.chunkType()) {
            case "method" -> 0.15;
            case "class" -> 0.10;
            default -> 0.0;
        };
        ranked.add(typeBoost == 0.0 ? r : withScore(r, r.similarity() + typeBoost));
    }

    ranked.sort(Comparator.comparingDouble(VectorStore.SearchResult::similarity).reversed()
            .thenComparing(VectorStore.SearchResult::filePath)
            .thenComparing(VectorStore.SearchResult::name));
    return limitPerFile(ranked, topK, 2);
}
```

检索器先把提问转成向量，从 `VectorStore` 取出余弦相似度最高的前 `Math.max(topK * 2, 10)` 条语义候选，以 `filePath + "#" + name` 为唯一键放进 `merged` 表打底。

在此基础上，检索器对每个分词结果调用 `vectorStore.searchByKeyword`，在 SQLite 里用转义过通配符的 `LIKE ... ESCAPE '\'` 扫描块名称和正文。命中的代码块给 `0.3` 的基础分，再由 `boostKeywordMatch` 根据命中位置累加奖励：

- 块名称（类名或方法签名）命中：`+ 0.3`；
- 文件路径命中：`+ 0.1`；
- 代码正文命中：`+ 0.1`。

单个关键词的得分上限控制在 `0.3 + 0.3 + 0.1 + 0.1 = 0.8` 以内，避免仅靠单个常见词匹配就压过余弦相似度接近 `1.0` 的高相关语义结果。

每个代码块先保留命中关键词中的最高分，再与语义候选合并。两路都命中时，取两路分数中较高的一个，加一次 `0.1`。只命中一路时，直接用这一路的分数。这样，在语义候选和各关键词得分相同的情况下，交换关键词顺序也会得到相同的排名。

合并完两路召回后，还要考虑代码块的粒度差异。用户问某个功能怎么实现时，给具体的方法体比给整个配置文件更有参考价值，因此 `method` 块额外 `+ 0.15`，`class` 块 `+ 0.10`，`file` 块不加分。

按总分从高到低排好序后，最后由 `limitPerFile(ranked, topK, 2)` 限制同一个源文件最多保留 `2` 条代码块，防止某个大类里的七八个重载方法把前 `topK` 个名额全部占满。

回到刚才的例子，`Agent.run(String userInput)` 语义分 `0.80`，同时被关键词命中拿到 `+ 0.1` 双重命中奖励，再加上 `method` 块 `+ 0.15`，总分达到 `1.05`，稳稳排在第一名。终端和工具输出把这个数标为“综合得分”，它可以大于 1。

## 06、基于 AST 提取代码关系图谱

找到核心方法之后，开发者和 Agent 往往还需要顺藤摸瓜，看看这个类继承了谁、实现了什么接口、内部又调用了哪些方法。

`CodeAnalyzer` 在建索引时复用 `JavaSourceParser` 解析出的语法树，提取五种代码结构关系，封装成 `CodeRelation(fromFile, fromName, toFile, toName, relationType)` 存入 `code_relations` 表：

- `imports`：文件导入的外部类，过滤掉 `java.` 和 `javax.` 开头的 JDK 标准库，只记录业务类与第三方组件简单名；
- `extends`：类的继承关系，记录子类名指向父类名；
- `implements`：接口实现关系，记录实现类名指向接口名；
- `contains`：类的包含关系，记录类名指向 `类名.方法名`；
- `calls`：方法调用关系，记录调用方 `类名.方法名` 指向被调用的目标方法。

```java
// src/main/java/com/paicli/rag/CodeAnalyzer.java
private void extractClassRelations(String filePath, CompilationUnit cu, List<CodeRelation> relations) {
    cu.findAll(ClassOrInterfaceDeclaration.class).forEach(clazz -> {
        String className = clazz.getNameAsString();
        clazz.getExtendedTypes().forEach(ext ->
                relations.add(new CodeRelation(filePath, className, null, ext.getNameAsString(), "extends")));
        clazz.getImplementedTypes().forEach(impl ->
                relations.add(new CodeRelation(filePath, className, null, impl.getNameAsString(), "implements")));
        clazz.getMethods().forEach(method ->
                relations.add(new CodeRelation(filePath, className, filePath,
                        className + "." + method.getNameAsString(), "contains")));
    });
    cu.findAll(MethodCallExpr.class).forEach(call -> {
        findParentMethod(call).ifPresent(method -> {
            if (method.getParentNode().orElse(null) instanceof ClassOrInterfaceDeclaration owner) {
                String caller = owner.getNameAsString() + "." + method.getNameAsString();
                relations.add(new CodeRelation(filePath, caller, null, call.getNameAsString(), "calls"));
            }
        });
    });
}
```

提取 `calls` 调用关系时，语法树上的 `MethodCallExpr` 节点只知道自己调了什么方法，并不知道自己写在外层的哪个方法里面。

分析器对每个调用点只处理一次。它向上找到直接包住它的方法，再取声明该方法的类名。这样，内部类里的调用会记在内部类名下。目标只保存方法名，例如 `memoryManager.buildContextForQuery(...)` 的目标是 `buildContextForQuery`。要确认具体调用的是哪个类、哪个重载，还需要读源码。

![](https://cdn.paicoding.com/paicoding/e1c257a6f1d22a8fa12fd785ac43f185.png)

查询时，`VectorStore.getRelations` 用 `from_name = ? OR to_name = ?` 精确匹配关系两端。用类名查这个类的直接关系，用 `类名.方法名` 查该方法发出的调用。

## 07、封装为 search_code 工具接入 Agent

底层的索引和检索都准备好了，最后一步是在 `ToolRegistry` 里注册 `search_code` 工具，把它暴露给 ReAct、Plan-and-Execute 和 Team 三种执行模式。

```java
// src/main/java/com/paicli/tool/ToolRegistry.java
tools.put("search_code", new Tool(
        "search_code",
        "语义检索代码库，根据自然语言描述查找相关代码块",
        createParameters(
                new Param("query", "string", "自然语言查询描述，例如'用户登录的实现'", true),
                new Param("top_k", "integer", "返回结果数量（默认5）", false)
        ),
        args -> {
            String query = args.get("query");
            int topK = clampInt(parseIntArg(args.get("top_k"), 5), 1, 30);
            try (CodeRetriever retriever = new CodeRetriever(projectPath)) {
                VectorStore.IndexStats stats = retriever.getStats();
                if (stats.chunkCount() == 0) {
                    return "代码库尚未索引，请先使用 /index 命令索引当前项目。";
                }
                List<VectorStore.SearchResult> results = retriever.hybridSearch(query, topK);
                return SearchResultFormatter.formatForTool(query, results);
            }
        }
));
```

`top_k` 默认取 `5`，范围限制在 `1` 到 `30` 之间。如果当前项目还没有执行过 `/index`，`stats.chunkCount()` 为 `0`，工具会返回一句明确的提示，引导模型改用 `glob_files` 和 `grep_code` 搜索或者提醒用户先建索引。

拿到 `hybridSearch` 的结果后，还要先经过 `SearchResultFormatter` 整理结构，再交回模型。

`SearchResultFormatter` 区分了两种输出格式：

- `formatForCli` 给终端里的 `/search` 命令使用，每条结果截取前 `120` 个字符的代码预览；
- `formatForTool` 给大模型的 `search_code` 工具使用，每条结果附上文件路径、起止行号、块类型、名称、保留三位小数的得分，以及前 `180` 个字符的代码片段。

更重要的是，`SearchResultFormatter.buildSummary` 会在结果列表最上方，用零延迟的本地规则生成三句检索摘要：

- 指出得分最高的入口是哪个代码块、位于哪个相对路径；
- 汇总前几条结果主要集中在哪几个源文件；
- 说明本次排序综合参考了哪几个分词关键词与语义相似度，建议模型先看第 1 条再按行号用 `read_file` 展开。

![](https://cdn.paicoding.com/stutymore/build-agent-p4-rag-20261106155614-0661e0dc.jpg)

这里还有一个跨目录索引的联动细节。`ToolRegistry` 启动时的 `projectPath` 默认是当前工作目录，但用户可能在命令行里执行 `/index /Users/xxx/another-project` 去索引另一个目录。

目标目录有可检索的代码块后，`/index` 会把项目路径同步给工具和记忆模块。`search_code`、`/search`、`/graph` 都使用这个路径。如果新目录不存在或没有可检索的代码块，会话继续使用之前的项目。

```java
// src/main/java/com/paicli/cli/Main.java
case INDEX_CODE -> {
    String indexPath = command.payload() != null ? command.payload() : ".";
    CodeIndex indexer = new CodeIndex(ui::println);
    CodeIndex.IndexResult result = indexer.index(indexPath);
    ui.println();

    // 同步项目路径到 ToolRegistry，让 search_code 工具可以正常工作
    if (result.chunkCount() == 0) {
        continue;
    }
    String absPath = Path.of(indexPath).toAbsolutePath().normalize().toString();
    reactAgent.getToolRegistry().setProjectPath(absPath);
    reactAgent.getMemoryManager().setProjectPath(absPath);
    continue;
}
```

## 08、跑起来看看

把代码编译打包，启动 PaiCLI 验证一下索引和检索流程。

```bash
mvn clean package
java -jar target/paicli-1.0-SNAPSHOT.jar
```

先输入 `/index` 给当前项目建立代码索引。命令行会输出扫描到的文件数、每 10 个文件的解析进度，以及最终入库的代码块数量和代码关系数量。

![](https://cdn.paicoding.com/paicoding/888ae1ad52f49e3e140dea47d86965bf.png)

索引建好后，输入 `/search` 加上一句自然语言描述，就能看到检索摘要和排好序的代码块。

![](https://cdn.paicoding.com/paicoding/48105ef353072dc07fede9b6daac3868.jpg)

在 PaiCLI 仓库启动后，可以输入 `/index src/test/resources/rag`，给自带的示例建索引。`/graph SampleService` 能看到这个类继承、实现和包含了什么。要看某个方法调用了谁，再查方法名。

```text
👤 你: /graph SampleService.findUserById
🕸️ 查询类关系图谱: SampleService.findUserById
📋 找到 2 条关系:

   SampleService ├── contains --> [SampleService.findUserById]
   SampleService.findUserById ├── calls --> [findById]
```

在普通对话模式下向 Agent 提问时，模型会根据问题类型自己挑工具，问精确符号时调 `grep_code` 并顺着 `suggested_reads` 读上下文，问模糊实现时调 `search_code` 拿到入口方法，再读源码给出回答。

为了持续验证代码定位的准确性，我们在 `src/test/resources/code-search/golden-set.json` 和 `CodeSearchGoldenSetTest` 中维护了一套代码搜索黄金标集（预先标注好标准答案的基准测试集），覆盖未知斜杠命令拦截、并行工具执行、图片引用解析、计划审阅按键处理和工具注册 5 类真实定位任务。测试会运行 Java 搜索，本机有 ripgrep 时也会运行 ripgrep。两条路径都验证 `grep_code` 能否在 `6000` 个字符的正文预算内（总输出允许多 500 个字符）命中目标文件与行号、生成 `suggested_reads`，并验证按建议的 `offset` 和 `limit` 调用 `read_file` 后能否读回目标代码行。

```bash
mvn test -Dtest=CodeChunkerTest,CodeAnalyzerTest,VectorStoreTest,CodeIndexTest,CodeIndexIncrementalTest,CodeRetrieverTest,EmbeddingClientBatchTest,CodeSearchGoldenSetTest -DskipTests=false
```

![](https://cdn.paicoding.com/paicoding/6c331b6aaf0e33771a11ba9a603286e7.jpg)

日常使用的三条代码检索命令如下：

- `/index [path]`：对当前目录或指定路径建立 AST 与向量增量索引
- `/search <query>`：使用自然语言混合检索相关代码块
- `/graph <类名或类名.方法名>`：查看与这个名称直接相连的关系

下一期我们将进入 Multi-Agent 协作（`/team` 模式），让规划器、执行器和审查器分工配合，处理跨模块的复杂工程任务。

## PaiCLI 如何写到简历上？

**项目名称**：PaiCLI（Java 终端 Coding Agent，第 4 期）

**项目简介**：为 Agent 构建融合 ripgrep 精确搜索与 AST + SQLite 混合 RAG 的代码检索模块，支持多粒度语法分块、多线程增量索引、本地/远程批量向量化与 AST 调用关系提取。

**技术栈**：Java 17、JavaParser AST、SQLite、Jieba 分词、ripgrep、Ollama / OpenAI Embedding、OkHttp

**核心职责**：

- 基于 ripgrep 与 Java 原生双引擎实现 `grep_code` 精确搜索，设计单文件与总字符数双层截断并自动生成 `read_file` 行段读取建议，配合 4 路只读工具并行执行完成代码定位。
- 基于 JavaParser AST 与 ThreadLocal 线程隔离将源码切分为类声明块与方法体块，提取继承、实现与方法调用关系存入 SQLite，单文件分块与关系分析复用同一棵语法树。
- 基于 SHA-256 指纹、4 线程解析与 16 文件滑动窗口实现增量索引，跨文件按 32 条攒批调用 Embedding 并单事务落库；实测 5874 个 Java 文件解析耗时从 4.6s 降至 1.9s，1892 个文件项目二次无改动索引仅需 0.8s。
- 封装本地 Ollama 与远程 OpenAI 兼容向量接口，处理空串保序、响应按 `index` 归位及旧版 Ollama 404 自动回退逐条接口，实测本地单条向量化耗时从 16.4ms 降至 8.1ms。
- 基于向量余弦相似度、Jieba 分词 + 正则标识符位置加权、双重命中奖励、代码块类型加分与单文件最多 2 条限流实现混合检索，并生成零延迟检索摘要引导模型按需展开上下文。
