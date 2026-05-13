---
title: AI Agent 面试题第二弹：Memory 系统、RAG 检索、长上下文工程 13 题
shortTitle: 面试题：记忆与上下文
description: 围绕 PaiCLI 第 3、4、12 期源码，精选 13 道记忆与上下文工程面试题，从短期记忆到 RAG 向量检索到长上下文自适应策略，每道题结合源码深度拆解。
tag:
  - Agent
  - 面试题
  - RAG
category:
  - AI
author: 沉默王二
date: 2026-05-11
---

大家好，我是二哥呀。

上一篇我们聊了 Agent 核心架构（ReAct、Plan-and-Execute、Multi-Agent），这篇进入第二个高频面试方向：**记忆与上下文工程**。

这块是很多小伙伴在面试里翻车的重灾区。你说你做了 RAG，面试官问“余弦相似度和欧氏距离的区别是什么”、“分块粒度怎么选的”、“长上下文模型出来后 RAG 还有必要吗”——一连串追问，答不上来就尴尬了。

PaiCLI 在第 3 期做了 Memory 系统，第 4 期做了 RAG 检索 + 代码库理解，第 12 期做了长上下文工程。这三期的代码分布在 `com.paicli.memory`、`com.paicli.rag`、`com.paicli.context` 三个包里，面试的时候随便抽一个包出来都能讲半小时。

## 01、Agent 的记忆系统分哪几层

典型的 Agent 记忆系统分三层，对应人类认知心理学的工作记忆和长期记忆模型。

**短期记忆（Working Memory）** 就是当前对话的消息历史。用户输入、LLM 回复、工具调用和结果，每一轮都在追加。PaiCLI 的 `ConversationMemory.java` 负责管理这个消息列表的增删查。生命周期是一次会话，关掉终端就没了。

**长期记忆（Long-term Memory）** 是跨会话持久化的关键事实。用户通过 `/save 这个项目用的是 Java 17` 或自然语言“记一下”触发保存。PaiCLI 的 `LongTermMemory.java` 把记忆条目序列化成 JSON 写到 `~/.paicli/memory/long_term_memory.json`。每次新会话启动时，`MemoryRetriever.java` 从长期记忆里检索和当前对话相关的条目注入上下文。

**外部记忆（External Memory）** 是通过 RAG 检索访问的外部知识库。不在对话历史里常驻，按需检索相关片段注入。PaiCLI 的 `CodeRetriever.java` 就是这层的入口——Agent 调用 `search_code` 工具时，背后是向量检索拿到相关代码段。

【此处插入三层记忆架构图：截图目标：展示短期记忆、长期记忆、外部记忆的层次关系和数据流向；关键词：ConversationMemory、LongTermMemory、CodeRetriever；建议位置：白板/流程图】

### 三层之间是什么关系

短期记忆是“当前工作台”，所有活跃信息都在这里。长期记忆是“笔记本”，只存稳定事实，新会话时翻出来参考。外部记忆是“图书馆”，需要的时候去查，不会整本搬到桌上。

`MemoryManager.java` 是门面类，统一协调三层。Agent 每轮请求 LLM 前，MemoryManager 负责把长期记忆的相关检索结果和 RAG 检索结果拼装到 prompt 里。

## 02、短期记忆会溢出吗

会。LLM 有上下文窗口限制（GLM-5.1 是 200k，DeepSeek V4 是 1M），对话历史不管理的话，几十轮下来就可能撞墙。特别是工具调用的结果——读一个大文件可能就是好几千 token，`execute_command` 的输出如果不截断也是灾难级别的。

PaiCLI 的解决方案在 `com.paicli.memory` 包里：

`TokenBudget.java` 实时跟踪当前对话占用的 token 数。当占用接近预算阈值（默认 80% 窗口），触发 `ContextCompressor.java`。

### 摘要压缩具体怎么做

`ContextCompressor` 用 Map-Reduce 策略：先把长对话分段，每段用 LLM 生成摘要（Map），再把多段摘要合并成一个总摘要（Reduce），用摘要替代原始的多轮对话。

```
原始历史：[msg1, msg2, msg3, ..., msg18, msg19, msg20, msg21, msg22]
                    ↓ 压缩前 18 轮
压缩后：  [summary_of_1_to_18, msg19, msg20, msg21, msg22]
```

保留最近几轮原始对话是关键设计——LLM 需要看到最新的上下文才能连贯回答。如果把最近几轮也压缩了，LLM 连“用户上一句说了什么”都不知道，回答质量断崖式下跌。

【此处插入摘要压缩前后对比图：截图目标：展示压缩前的完整历史和压缩后的 summary + 近期原文；关键词：Map-Reduce、summary、保留近期；建议位置：白板/流程图】

另外 `execute_command` 的输出在 PaiCLI 里是有截断的——超过 8KB 只保留首尾部分。这是在源头控制膨胀速度。

## 03、长期记忆什么时候存、什么时候取

### 存（写入）

两个触发路径。用户显式输入 `/save 这个项目用的是 Java 17`，或者用户说“记一下以后用 Maven 不用 Gradle”时 Agent 主动调用 `save_memory` 工具。

PaiCLI 的设计原则是**只存稳定事实，不存临时信息**。“用户偏好中文回复”可以存，“当前正在改 Main.java 第 42 行”不应该存——后者是短期记忆的事，下次会话不需要知道。

每条记忆是一个 `MemoryEntry`，包含内容、时间戳、来源标记。所有条目序列化成 JSON 数组写入文件。

### 取（检索）

每轮对话开始前，`MemoryRetriever.java` 拿用户输入和所有长期记忆做关键词匹配 + 简单相似度评分，取 top-k 条相关记忆注入到 system prompt。

这个方案用的是最朴素的关键词匹配而不是向量检索——因为长期记忆通常就几十条，关键词匹配够用且零依赖。如果记忆量到了几千条，就应该换成向量检索了。

【此处插入长期记忆的存取流程图：截图目标：展示 /save 写入和每轮请求前的检索注入流程；关键词：MemoryEntry、MemoryRetriever、system prompt 注入；建议位置：白板/流程图】

## 04、什么是 RAG

RAG（Retrieval-Augmented Generation）= 检索增强生成。在 LLM 生成回答之前，先从外部知识库检索相关内容，把检索结果塞进 prompt 一起发给 LLM。

### Agent 为什么需要 RAG

LLM 不认识你的代码库。你让 Agent“帮我重构登录模块”，它不知道你的 `LoginService` 在哪个文件、有哪些方法、被谁调用。全量代码塞进上下文？一个中型 Java 项目 10 万行代码，远超任何模型的窗口。

RAG 的做法是**只检索相关的代码片段**。用户问“登录逻辑在哪”，RAG 从向量库里检索出 `LoginService.java` 和 `AuthController.java` 的相关方法，只把这几百行代码喂给 LLM。

PaiCLI 第 4 期的 RAG 全流程在 `com.paicli.rag` 包下：

```
代码库 → CodeChunker 分块 → EmbeddingClient 向量化 → VectorStore 存入 SQLite
    ↓
用户查询 → EmbeddingClient 查询向量化 → VectorStore 余弦相似度检索 → Top-K 代码块 → 注入 prompt
```

用户执行 `/index` 命令触发索引构建，`/search <查询>` 手动检索，Agent 也可以通过 `search_code` 工具自动检索。

【此处插入 RAG 检索流程图：截图目标：展示从代码库到向量存储到检索返回的完整链路；关键词：CodeChunker、Embedding、VectorStore、余弦相似度；建议位置：白板/流程图】

## 05、代码怎么分块

分块（Chunking）是 RAG 的关键环节。分块太粗，一个文件里有 10 个方法但只有 1 个相关，检索出来夹带大量无关内容。分块太细，一行代码脱离上下文毫无意义。

PaiCLI 的 `CodeChunker.java` 支持三种粒度，不是按固定行数切，而是用 JavaParser 做 AST 解析，按语法结构切分。

**文件级**：整个文件一块。适合小文件（< 100 行）。

**类级**：每个类/接口作为一个 chunk。包含类声明、字段、所有方法。适合中等文件。

**方法级**：每个方法单独成块，附带所属类名和 import 信息。这是默认粒度，精确度最高。

### 为什么不按固定行数切

按行数切有个致命问题——会把一个方法从中间劈开。上半截在 chunk A，下半截在 chunk B。检索到 chunk A 时 LLM 看到半个方法，不知道这方法到底在干什么。

AST 解析保证每个 chunk 是一个完整的语义单元。JavaParser 从语法树中提取 `ClassOrInterfaceDeclaration` 和 `MethodDeclaration` 节点的起止行号，按节点边界切分。

```java
// CodeChunker.java 的核心逻辑（简化）
CompilationUnit cu = JavaParser.parse(sourceCode);
cu.findAll(MethodDeclaration.class).forEach(method -> {
    String className = method.findAncestor(ClassOrInterfaceDeclaration.class)
                             .map(c -> c.getNameAsString()).orElse("Unknown");
    chunks.add(new CodeChunk(className + "." + method.getNameAsString(), 
                             method.toString(), filePath));
});
```

【此处插入代码分块示意图：截图目标：展示同一个 Java 文件被切成多个方法级 chunk 的效果；关键词：JavaParser、MethodDeclaration、chunk 边界；建议位置：IDE/代码截图】

面试官可能追问“Python 代码怎么办”。PaiCLI 当前只做了 Java 的 AST 分块，其他语言回退到文件级分块。生产级方案可以用 tree-sitter 做通用的多语言 AST 解析。

## 06、Embedding 是什么

Embedding 是把文本映射到高维向量空间的过程。两段语义相近的文本，映射出来的向量在空间中的距离就近（余弦相似度高）。

### 为什么代码检索需要 Embedding

关键词匹配搞不定语义查询。用户输入“处理用户登录的代码”，关键词匹配只能找到包含“用户”“登录”这些词的文件。但如果代码里写的是 `authenticate()`、`SessionManager`，一个都匹配不上。

Embedding 能理解语义——“用户登录”和“authenticate + session”在向量空间里距离很近，检索就能命中。

PaiCLI 的 `EmbeddingClient.java` 支持两种模式：本地 Ollama 运行 `nomic-embed-text` 模型（默认，免费但需要本机 Ollama），或者远程 API。生成的向量存到 `VectorStore.java` 管理的 SQLite 数据库（`~/.paicli/rag/codebase.db`）。

向量维度取决于 Embedding 模型——`nomic-embed-text` 是 768 维，每个代码块对应一个 768 维浮点数组。

【此处插入 Embedding 向量空间示意图：截图目标：展示语义相近的代码段在向量空间中距离更近；关键词：nomic-embed-text、768 维、余弦相似度；建议位置：白板/示意图】

## 07、向量检索用的什么算法

PaiCLI 的 `VectorStore.java` 用余弦相似度（Cosine Similarity）做检索。

### 余弦相似度怎么算

公式：`cos(A, B) = (A · B) / (|A| × |B|)`

`A · B` 是两个向量的点积（对应元素相乘再求和），`|A|` 和 `|B|` 是各自的模长（元素平方和的开方）。值域 [-1, 1]，越接近 1 越相似。

### 为什么选余弦不选欧氏距离

两个原因。第一，余弦只看方向不看大小，不受向量长度影响——两段代码的 Embedding 长度可能不同（取决于文本长度），余弦不受干扰。第二，高维空间里欧氏距离有“维度灾难”问题（所有点距离趋于相同），余弦更稳定。

PaiCLI 没有引入专门的向量数据库，而是直接在 SQLite 里存向量（JSON 数组形式），检索时用 Java 代码逐一计算余弦相似度，排序取 Top-K。

```java
// VectorStore.java 检索逻辑（简化）
public List<CodeChunk> search(float[] queryVector, int topK) {
    return allChunks.stream()
        .map(chunk -> new ScoredChunk(chunk, cosineSimilarity(queryVector, chunk.vector())))
        .sorted(Comparator.comparingDouble(ScoredChunk::score).reversed())
        .limit(topK)
        .map(ScoredChunk::chunk)
        .toList();
}
```

这个暴力检索的复杂度是 O(n)。对于几千个 chunk（中小型代码库），完全够用。如果代码库有几百万个 chunk，需要用 ANN（近似最近邻）算法加速——HNSW、IVF 这些，或者直接上 Milvus、Qdrant 这类向量数据库。

【此处插入向量检索的 /search 命令输出截图：截图目标：展示语义检索返回的 Top-K 代码块和相似度分数；关键词：search_code、余弦相似度、Top-K；建议位置：终端会话窗口】

## 08、代码关系图谱是什么

PaiCLI 的 `CodeAnalyzer.java` 用 JavaParser 分析 AST，提取代码元素之间的五种结构关系：extends（继承）、implements（接口实现）、imports（导入）、calls（方法调用）、contains（包含）。关系存到 `CodeRelation` 表里，用户查 `/graph ClassName` 就能看到完整的关系链。

### 和 RAG 有什么关系

两者互补。RAG 回答“哪段代码和登录有关”（语义检索），图谱回答“LoginService 被谁调用了”“UserController 依赖哪些类”（结构查询）。

Agent 重构代码时，光靠 RAG 找到目标代码不够——还要知道改了这个类会影响到哪些调用方。比如你改了 `LoginService.authenticate()` 的签名，图谱能直接告诉你 `AuthController.java` 和 `SecurityFilter.java` 在调用它，这两个文件也需要改。

PaiCLI 的 `/graph` 命令背后就是 `CodeAnalyzer` 的查询。Agent 在 `search_code` 工具返回结果时，也会把相关的图谱关系附带上去，帮 LLM 理解代码上下游。

【此处插入 /graph 命令输出截图：截图目标：展示某个类的继承、实现、调用关系图；关键词：extends、implements、calls、CodeAnalyzer；建议位置：终端会话窗口】

## 09、长上下文模型出来后，RAG 还有必要吗

这道题面试出现频率极高，而且很容易答偏——要么说“完全不需要了”，要么说“当然需要”但说不出为什么。

答案是**有必要，但角色变了**。

### 成本问题

200k token 全填满的 API 调用，费用是只填 10k 的 20 倍。RAG 精准检索只把相关代码塞进去，是天然的成本优化手段。对于按 token 计费的 API，这个差距是真金白银。

### 注意力精度问题

“大海捞针”实验表明，模型对长文本中间部分的信息关注度会下降（Lost in the Middle 问题，Liu et al. 2023）。RAG 预先筛选出最相关的内容放在显眼位置，准确率更高。

### 超大代码库问题

50 万行代码的 monorepo，1M 窗口也装不下。

### PaiCLI 的自适应策略

第 12 期的 `ContextProfile.java` 按模型窗口自动选择策略：

| 窗口 | 模式 | RAG topK | 摘要压缩 |
|---|---|---|---|
| < 32k | short | 5 | 激进压缩 |
| 32k-100k | balanced | 10 | 适度压缩 |
| ≥ 100k | long | 20 | 跳过压缩 |

长窗口不是不用 RAG，而是多检索一些（topK 从 5 提到 20），给模型更完整的上下文。从“压缩选择”变成了“加速 + 精排”。

【此处插入 /context 命令输出截图：截图目标：展示当前上下文模式、RAG topK、窗口大小；关键词：context mode、topK、window；建议位置：终端会话窗口】

## 10、Prompt Caching 是什么

Prompt Caching 是 LLM 提供商的服务端优化——如果连续请求的 prompt 前缀相同，服务端复用上一次的 KV Cache，跳过重复计算。缓存命中的 token 按原价的 10%-20% 计费。

### 对 Agent 的影响有多大

Agent 的请求模式天然适合 caching。System prompt 每轮都一样——完美的缓存前缀。对话历史是追加式的——新一轮请求 = 旧请求 + 新消息，大部分前缀重复。

PaiCLI 第 19 期的 `PromptAssembler.java` 遵循“volatile content last”原则组装 prompt：`base.md`（几乎不变）→ `personality`（不变）→ `mode`（按模式切，同模式不变）→ 动态内容。前面 60-70% 的 prompt 能持续命中 cache。

`LlmClient` 接口通过 `supportsPromptCaching()` 和 `promptCacheMode()` 声明每个模型的缓存能力。DeepSeek V4 走 automatic prefix cache（无需客户端操作），usage 响应里返回 `cached_tokens`。PaiCLI 在每轮输出里展示缓存命中量。

【此处插入 Token 用量输出截图：截图目标：展示 cached input tokens 和估算成本；关键词：cached、input tokens、估算成本；建议位置：终端会话窗口】

## 11、上下文压缩有哪些策略

### 截断法

最简单，直接丢弃最早的对话。快但粗暴，可能丢掉关键背景。

### 摘要法

用 LLM 对早期对话生成摘要，用摘要替代原文。PaiCLI 的 `ContextCompressor` 用的就是这种（Map-Reduce）。保留语义，但摘要本身消耗一次 LLM 调用。

### 选择性保留

只保留 system prompt + 最近 N 轮 + 所有工具调用结果，中间的“闲聊”丢掉。需要判断哪些是“闲聊”，实现复杂。

### PaiCLI 的选择

摘要法 + 长上下文模式跳过。短窗口（< 100k）用摘要法，长窗口（≥ 100k）直接不压缩，省掉摘要的 LLM 调用成本。两种策略覆盖所有场景，架构简洁。

面试官追问“摘要压缩的时机怎么选”时，回答 `TokenBudget` 实时跟踪 token 数，达到预算的 85% 时触发压缩，留 15% 缓冲区给压缩过程中可能产生的新消息。

## 12、对话历史的消息格式为什么要严格遵循协议

LLM 的聊天 API 对消息格式有严格要求：`system`（系统指令）、`user`（用户输入）、`assistant`（LLM 回复，可能包含 `tool_calls`）、`tool`（工具结果，必须有 `tool_call_id`）。

### 不遵循会怎样

`tool` 消息没有匹配的 `tool_call_id` → API 直接报 400 错误。`assistant` 和 `user` 顺序错乱 → 模型理解混乱。把工具结果塞进 `user` 消息而不是 `tool` 消息 → 模型分不清这是用户说的还是工具返回的。

PaiCLI 的 `ConversationMemory` 严格按协议维护消息列表。做摘要压缩时有个容易踩的坑：被压缩掉的消息如果包含 `tool_calls` 和对应的 `tool` 结果，摘要后的 assistant 消息**不能保留 tool_calls 字段**——因为对应的 tool 消息已经被删了，留着 tool_calls 会导致 id 不匹配报错。

这个坑我在做 PaiCLI 的时候踩过，调了好一会儿才发现是压缩后的消息格式不对。

【此处插入消息历史格式示意图：截图目标：展示 system/user/assistant/tool 消息的正确排列顺序；关键词：role、tool_call_id、消息顺序；建议位置：白板/示意图】

## 13、RAG 检索效果不好怎么优化

这是一道开放题，面试官想看你的优化思路。从四个方向展开。

### 分块策略优化

从固定大小分块切换到语义分块——按方法、类、段落边界切，保证每个 chunk 语义完整。PaiCLI 用 JavaParser AST 解析做的就是语义分块。还可以在 chunk 里加上父级上下文（所属类名、import 信息），帮助 LLM 理解代码片段的位置。

### Embedding 模型选择

`nomic-embed-text` 是通用文本模型，不是专门为代码训练的。换成代码专用的 Embedding 模型（比如 OpenAI 的 `text-embedding-3-large` 或 Voyage 的 `voyage-code-2`）效果通常更好。

### 混合检索

单纯的向量检索可能遗漏关键词完全匹配的情况——用户搜“LoginService”，这是精确类名匹配，向量检索不一定排第一。可以做 Hybrid Search：向量检索 + BM25 关键词检索，两路结果合并去重排序。

### 查询改写

用户的查询往往很口语化。“登录那块代码”改写成“用户认证和会话管理的实现代码”后，Embedding 的语义匹配会更精准。这个改写可以用一轮轻量 LLM 调用完成。

【此处插入 RAG 优化对比截图：截图目标：展示优化前后的检索结果对比；关键词：分块策略、混合检索、查询改写；建议位置：白板/对比图】

## ending

这 13 道题对应的源码集中在三个包里。

`com.paicli.memory` 里的 `ConversationMemory`、`LongTermMemory`、`ContextCompressor`、`TokenBudget`、`MemoryRetriever`。`com.paicli.rag` 里的 `CodeChunker`、`EmbeddingClient`、`VectorStore`、`CodeAnalyzer`、`CodeRetriever`。`com.paicli.context` 里的 `ContextProfile`、`ContextMode`。

面试聊到 RAG，把 `VectorStore.java` 的余弦相似度计算拿出来讲。聊到记忆系统，把 `MemoryManager.java` 的三层协调逻辑拿出来讲。面试官问“长上下文和 RAG 的关系”，指着 `ContextProfile.java` 里的 topK 自适应代码回答。

下一篇进入**工具系统与安全**——Tool Call 协议、HITL 审批、路径围栏、命令黑名单。

**简历包装**

**项目名称**：PaiCLI — Java Agent CLI（对标 Claude Code）

**项目简介**：从零实现的终端 AI Agent，内置三层记忆架构（短期/长期/RAG 外部记忆）和长上下文自适应策略，支持 200k-1M 窗口模型的上下文工程优化。

**技术栈**：Java 17、JavaParser AST 分析、Ollama nomic-embed-text Embedding、SQLite 向量存储 + 余弦相似度检索、Map-Reduce 摘要压缩

**核心职责**：

1. 设计三层记忆架构：`ConversationMemory` 管理短期对话、`LongTermMemory` 持久化跨会话事实到 JSON 文件、`CodeRetriever` 通过 RAG 向量检索访问代码库，`MemoryManager` 统一协调三层并在每轮 LLM 请求前注入相关上下文
2. 基于 JavaParser 实现 AST 级代码分块（`CodeChunker`），按方法/类/文件三种粒度切分，保证每个 chunk 语义完整，相比固定行数切分检索准确率显著提升
3. 实现代码关系图谱（`CodeAnalyzer`），从 AST 中提取 extends/implements/imports/calls/contains 五种关系存入 SQLite，支持 `/graph` 命令查询类的上下游依赖链
4. 基于 `ContextProfile` 实现长上下文自适应策略（short/balanced/long 三种模式），根据模型 `maxContextWindow()` 自动选择 RAG topK（5/10/20）和摘要压缩策略，适配 200k-1M 窗口
5. 实现 Map-Reduce 摘要压缩（`ContextCompressor`），在 Token 预算达到 85% 阈值时自动触发，保留近期原始对话 + 压缩早期历史，配合 `TokenBudget` 实时跟踪实现动态上下文管理
