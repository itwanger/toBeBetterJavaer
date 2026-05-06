---
title: 老板下了死命令：限你一天，把RAG升级成Agent，我反抗后无效，只能掏出Claude Code+Opus 4.7猛猛干
shortTitle: RAG升级Agent实战
description: 从派聪明的纯 RAG 知识库出发，三层递进升级成 Agent，结合 PaiCLI 的真实代码拆解工具调用、ReAct 决策循环和记忆管理的完整实现。
tag:
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-05-06
---

大家好，我是二哥呀。

上周老板扔了一句话过来："派聪明现在只能问答，太被动了，你给它升级成 Agent，能自己调工具、自己做决策那种。限你一天。"

我当时就想反抗：一天？你当 Agent 是装个插件就搞定的事？

但反抗无效。老板不懂技术，他只知道市面上"Agent"这个词已经满天飞了，派聪明还停留在"用户问一句、系统答一句"的阶段，确实显得落后。

好在我手头有一个现成的参考对象：PaiCLI。这玩意从第 1 期的简单 ReAct 循环，到现在 v13 已经是一个完整的 Agent CLI 产品，里面的工具调用、决策循环、记忆管理、MCP 集成全部跑通了，连 Human-in-the-Loop 审批机制都做了。派聪明要走的路，PaiCLI 已经走过一遍了。

掏出 Claude Code + Opus 4.7，开干。

【此处插入老板对话截图：截图目标：展示老板下达任务的聊天记录；关键词：Agent、升级、一天；建议位置：微信/飞书聊天记录】

今天这篇就把整个升级过程完整拆解出来。不讲概念，只讲实操：派聪明的代码现在长什么样、三层升级分别改了什么、每一步用 Claude Code 怎么执行。

跟着做的小伙伴，需要提前准备好 Claude Code + Opus 4.7（或者 Codex + GPT-5.5 也行），以及一个基于 Spring Boot 的 RAG 项目。没有现成项目的可以用派聪明的开源代码练手。

## 01、派聪明现在长什么样

先搞清楚起点在哪。

派聪明是一个 RAG 知识库系统，Spring Boot 3.4 + Elasticsearch 8.10 + DeepSeek API。核心流程就四步：用户提问 → 混合检索 → 拼装上下文 → 大模型生成回答。

整个问答链路的入口在 `ChatHandler.java`，关键方法是 `processMessage`：

```java
public void processMessage(String userId, String userMessage, 
                           WebSocketSession session) {
    // 1. 拿到对话历史
    List<Map<String, String>> history = getConversationHistory(userId);
    
    // 2. 混合检索：向量相似度 + BM25 关键词
    List<SearchResult> results = hybridSearchService
        .searchWithPermission(userMessage, userId, 5);
    
    // 3. 把检索结果拼成上下文
    String context = buildContext(results);
    
    // 4. 调 DeepSeek 生成回答，流式返回
    deepSeekClient.streamResponse(userId, userMessage, context, 
        history, chunk -> sendToWebSocket(session, chunk));
}
```

【此处插入派聪明架构图：截图目标：展示当前 RAG 的四步流程；关键词：用户提问、混合检索、上下文拼装、流式回答；建议位置：draw.io 架构图或白板】

检索用的是 `HybridSearchService`，策略是先用 KNN 向量搜索拉 30 倍候选集，再用 BM25 重打分，最后做权限过滤：

```java
public List<SearchResult> searchWithPermission(String query, 
                                                String userId, int topK) {
    // KNN 向量搜索（30x 候选窗口）+ BM25 重打分
    SearchResponse response = elasticClient.search(s -> s
        .index("knowledge_chunks")
        .knn(k -> k.field("embedding").queryVector(embedQuery(query))
            .numCandidates(topK * 30).k(topK * 5))
        .query(q -> q.bool(b -> b
            .should(textMatch(query))
            .filter(permissionFilter(userId))
        )),
        SearchResult.class
    );
    return parseResults(response, topK);
}
```

这套流程跑了大半年，问答质量还不错。但问题在于它是**完全被动的**：用户问什么就答什么，不能主动执行任何操作。

用户说"帮我把这份文档上传到知识库"，派聪明只能回答"请通过上传功能上传文件"。用户说"帮我检查知识库里有没有 2026 年的产品手册"，派聪明只能做一次检索然后告诉用户结果，不能进一步判断"没有的话要不要帮忙上传"。

这就是 RAG 和 Agent 的根本区别：**RAG 是被动问答，只能回答问题；Agent 是主动决策加执行，能自己动手干活。**

【此处插入派聪明问答截图：截图目标：展示派聪明当前的问答效果；关键词：用户提问、知识库回答、被动响应；建议位置：派聪明网页界面】

## 02、第一层：给 RAG 加上工具调用

升级的第一步，让系统不只是回答问题，还能调用工具去执行操作。

原理说白了就是一件事：给大模型配一组 Tool（工具），每个 Tool 定义了名称、功能描述、输入参数。大模型接收到用户的问题之后，先判断"这个问题是应该检索知识库回答，还是应该调用某个工具来执行"。

PaiCLI 的 `ToolRegistry` 已经把这套模式跑通了，我们直接参考它的注册方式：

```java
public class ToolRegistry {
    private final Map<String, Tool> tools = new LinkedHashMap<>();

    private void registerFileTools() {
        tools.put("read_file", new Tool(
            "read_file",
            "读取文件内容（仅限项目根目录之内）",
            createParameters(
                new Param("path", "string", "文件路径", true)
            ),
            args -> {
                Path safe = pathGuard.resolveSafe(args.get("path"));
                return "文件内容:\n" + Files.readString(safe);
            }
        ));
    }
}
```

每个 Tool 就是四样东西：名称、描述、参数定义、执行逻辑。大模型根据描述来判断该不该调用这个 Tool，所以**描述的质量直接决定了 Agent 的决策准确率**。描述写得含糊，大模型就可能选错工具。

这里有一个实际踩过的坑：我一开始给 `search_knowledge` 写的描述是"搜索文档"，结果大模型经常在用户随便聊天的时候也去调这个 Tool。改成"在知识库中搜索与用户问题相关的文档片段，仅在用户明确需要查询知识库内容时调用"之后，误调率直接降到了 5% 以下。Tool 的描述不是给人看的，是给大模型看的，得从大模型的理解角度去写。

【此处插入 PaiCLI ToolRegistry 代码截图：截图目标：展示工具注册的完整代码结构；关键词：Tool 定义、参数声明、执行逻辑；建议位置：IDE 代码编辑器】

在派聪明的基础上，我们需要注册这几个 Tool：

**知识库文档搜索 Tool**：跟现在的 RAG 检索功能一样，但包装成了 Tool 的形式让 Agent 按需调用。

```java
tools.put("search_knowledge", new Tool(
    "search_knowledge",
    "在知识库中搜索相关文档片段，返回最匹配的结果",
    createParameters(
        new Param("query", "string", "搜索关键词", true),
        new Param("topK", "integer", "返回结果数量，默认5", false)
    ),
    args -> {
        int topK = args.containsKey("topK") ? 
            Integer.parseInt(args.get("topK")) : 5;
        List<SearchResult> results = hybridSearchService
            .searchWithPermission(args.get("query"), currentUserId, topK);
        return formatSearchResults(results);
    }
));
```

**文档上传 Tool**：接收文件路径，调用 MinIO 的上传接口。

```java
tools.put("upload_document", new Tool(
    "upload_document",
    "将指定文件上传到知识库并自动向量化",
    createParameters(
        new Param("filePath", "string", "文件路径", true),
        new Param("category", "string", "文档分类", false)
    ),
    args -> {
        String filePath = args.get("filePath");
        String objectKey = minioService.upload(filePath);
        vectorizationService.vectorizeAsync(objectKey, currentUserId);
        return "文件已上传并开始向量化处理，文档ID: " + objectKey;
    }
));
```

**文档删除 Tool** 和 **知识库统计 Tool** 的逻辑类似，就不贴完整代码了。

【此处插入 Claude Code 生成 Tool 代码截图：截图目标：展示用 Claude Code 生成 Tool 注册代码的过程；关键词：自动生成、Tool 定义、代码质量；建议位置：Claude Code 终端】

这一步完成之后，派聪明就从"只能回答问题"变成了"能管理知识库"。用户说"帮我把最新的产品说明书上传到知识库"，Agent 会自主调用 `upload_document` 这个 Tool 把文件传上去，然后告诉用户"已经帮您上传成功了"。

但这一层还有一个明显的局限：**它是单步的**。大模型判断一次，调用一个 Tool 就结束了。碰到需要多步操作的任务，比如"检查有没有某个文档，没有的话帮我上传"，它就搞不定了。

这就需要第二层：ReAct 决策循环。

## 03、第二层：加上 ReAct 决策循环

ReAct 是 Reasoning + Acting 的缩写。核心思想是让 Agent 进入一个循环：**思考该做什么 → 执行操作 → 观察结果 → 再思考下一步**，直到任务完成。

PaiCLI 的 `Agent.java` 里有一个非常清晰的 ReAct 循环实现，核心逻辑大概 100 行：

```java
public String run(String userInput) {
    conversationHistory.add(userMessage(userInput));
    
    while (true) {
        // 预算检查（token 上限、迭代次数上限）
        AgentBudget.ExitReason exitReason = budget.check();
        if (exitReason != null) break;
        
        // 调用大模型，带上所有 Tool 定义
        LlmClient.ChatResponse response = llmClient.chat(
            conversationHistory,
            toolRegistry.getToolDefinitions(),
            streamRenderer
        );
        
        if (response.hasToolCalls()) {
            // 执行工具调用（支持并行，最多4个同时跑）
            List<ToolExecutionResult> results = 
                executeToolCalls(response.getToolCalls());
            // 把执行结果加到对话历史，继续循环
            conversationHistory.addAll(toToolMessages(results));
        } else {
            // 大模型认为任务完成，输出最终回答
            break;
        }
    }
    return lastAssistantMessage();
}
```

【此处插入 ReAct 循环流程图：截图目标：展示 Reasoning→Acting→Observation 的循环过程；关键词：思考、执行、观察、循环；建议位置：draw.io 流程图】

这段代码的关键在于 `while(true)` 循环。每一轮循环里，大模型会根据当前的对话历史（包含之前所有的思考过程和工具执行结果）来决定：是继续调用工具，还是直接给出最终回答。

在派聪明的场景下，一个典型的多步任务长这样：

**用户说**："帮我检查知识库里有没有 2026 年的产品手册，如果没有就帮我上传这份文件。"

**Agent 的决策过程**：

第一轮循环——思考：用户想查知识库里有没有 2026 年产品手册，我应该先搜索一下。于是调用 `search_knowledge` 工具，参数 `query="2026年产品手册"`。

第二轮循环——观察到搜索结果为空。思考：知识库里没有，用户要求没有的话就上传，所以我应该调用 `upload_document` 工具。于是调用上传。

第三轮循环——观察到上传成功。思考：任务完成了，我可以回复用户了。于是输出最终回答："已经检查过知识库，没有找到 2026 年的产品手册，已经帮您上传成功了。"

**三轮循环，零人工干预，Agent 自己完成了"检查→判断→执行"的全过程。**

【此处插入 Agent 多步决策截图：截图目标：展示 Agent 自主完成多步任务的对话过程；关键词：搜索知识库、判断结果、自动上传；建议位置：派聪明对话界面或终端】

这里有一个很重要的工程细节：**预算控制**。

PaiCLI 用 `AgentBudget` 来防止 Agent 跑飞，设定最大循环次数（比如 10 次）和 token 上限。超了就强制退出，避免死循环。Opus 4.7 在这方面做了一个很好的改进，叫"任务预算"（Task Budget），模型内置了一个倒计时器，会自己控制节奏，在预算耗尽前优雅收尾。

另一个兜底机制是在 System Prompt 里明确告诉大模型：**如果不确定该怎么做，直接问用户，不要瞎猜。** 这一条非常关键，能避免 Agent 在不确定的情况下调用了错误的 Tool（比如误删文档）。

PaiCLI 里还有一个设计值得学习：Tool 执行支持并行。`ToolRegistry` 内部用 `ExecutorService` 管理并行度，最多同时跑 4 个 Tool，单个 Tool 超时 90 秒自动中断。当大模型在一轮循环里同时请求多个 Tool 调用（比如同时搜索三个不同分类的文档），这些调用会并行执行而不是排队等。这对效率影响很大，尤其是涉及网络请求的 Tool，并行可以把等待时间压缩到原来的几分之一。

【此处插入预算控制代码截图：截图目标：展示 AgentBudget 的限制逻辑和并行执行配置；关键词：最大循环次数、token 上限、并行度、超时控制；建议位置：IDE 代码编辑器】

我给 Claude Code 的提示词是这样的：

```
参考 PaiCLI 的 Agent.java 中的 ReAct 循环实现，
给派聪明的 ChatHandler 加上 ReAct 决策循环：
1. 保留现有的 WebSocket 流式输出
2. 支持多轮 Tool 调用，每轮结果加入上下文
3. 加预算控制：最大 10 轮循环、单次最大 8000 token
4. 在 System Prompt 中注入已注册的 Tool 列表
5. Tool 执行失败时让 Agent 重新思考，不要直接报错
```

Claude Code + Opus 4.7 拿到这个指令后，先读了 PaiCLI 的 Agent.java 学习循环结构，再读派聪明的 ChatHandler 理解现有流程，然后一口气改了三个文件。最让我惊喜的是它**保留了原来的 WebSocket 流式推送逻辑**，在每一轮 Tool 调用时也会实时把 Agent 的"思考过程"推给前端，用户能看到 Agent 在想什么、在做什么。

【此处插入 Claude Code 改造过程截图：截图目标：展示 Claude Code 读取两个项目代码并生成改造方案的过程；关键词：读取 PaiCLI、分析 ChatHandler、生成改造代码；建议位置：Claude Code 终端】

【此处插入改造后的代码 diff 截图：截图目标：展示 ChatHandler 改造前后的代码差异；关键词：ReAct 循环、Tool 调用、预算控制；建议位置：IDE diff 视图或 git diff】

## 04、第三层：加上记忆管理

Agent 要真正好用，还需要有记忆能力。

派聪明现在的多轮对话是把最近几轮对话拼到 Prompt 里，这种方式有两个问题：上下文窗口有限，历史太长就得截断；跨会话记忆完全丢失，昨天聊的内容今天再问就忘了。

PaiCLI 的记忆系统分两层，设计得很清晰：

**短期记忆（ConversationMemory）**：管理当前任务的执行上下文。Agent 在一个多步任务中需要记住前面几步做了什么、结果是什么，才能正确决策下一步。

```java
public class ConversationMemory {
    private final List<MemoryEntry> entries = new ArrayList<>();
    private final int tokenBudget;  // 可配置的 token 上限
    
    public void add(MemoryEntry entry) {
        entries.add(entry);
        if (totalTokens() > tokenBudget) {
            compress();  // 超预算时自动压缩早期记忆
        }
    }
    
    private void compress() {
        // 保留最近 N 条完整记录
        // 更早的记录压缩成摘要
    }
}
```

当 token 预算超了，不是简单地砍掉最早的对话，而是把早期记忆压缩成摘要。这样 Agent 既不会忘记关键信息，又不会撑爆上下文窗口。

**长期记忆（LongTermMemory）**：跨会话持久化，存在本地 JSON 文件里。

```java
public class LongTermMemory {
    private final Map<String, MemoryEntry> entries;
    private final File storageFile;  // long_term_memory.json

    public void store(MemoryEntry entry) {
        // 去重：完全相同的内容不重复存储
        boolean duplicate = entries.values().stream()
            .anyMatch(e -> e.getContent().equals(entry.getContent()));
        if (duplicate) return;
        
        entries.put(entry.getId(), entry);
        saveToDisk();
    }
}
```

【此处插入记忆架构图：截图目标：展示短期记忆和长期记忆的双层结构；关键词：ConversationMemory、LongTermMemory、压缩、持久化；建议位置：draw.io 架构图】

在派聪明的场景下，记忆管理可以做这些事情：

短期记忆用来管理 ReAct 循环的执行上下文。比如 Agent 在第一步搜索了知识库、第二步上传了文档，到第三步的时候它需要记住前两步的结果才能给出正确的回答。这个用 ReAct 循环里的 `conversationHistory` 就能实现，每一步的输入输出都在 history 里传递。

长期记忆可以记住用户的偏好和习惯。比如 Agent 记住某个用户经常查询"产品手册"相关的文档，下次这个用户提问的时候可以优先从产品手册分类里检索，提升命中率。这个用向量数据库存储用户的历史交互摘要就行，按语义检索最相关的历史上下文。

我给 Claude Code 的提示词：

```
给派聪明加上双层记忆管理：
1. 短期记忆：复用 ReAct 循环的 conversationHistory，加上 token 预算压缩
2. 长期记忆：用 Redis 存储用户交互摘要，每次会话结束时提取关键信息持久化
3. 在每次 ReAct 循环开始时，从长期记忆中检索与当前问题相关的历史上下文
4. 参考 PaiCLI 的 memory/ 目录实现
```

【此处插入 Claude Code 实现记忆管理截图：截图目标：展示 Claude Code 生成记忆管理代码的过程；关键词：双层记忆、Redis 持久化、上下文注入；建议位置：Claude Code 终端】

## 05、用 Claude Code + Opus 4.7 实际跑一遍

三层架构讲完了，来看实际的开发过程。

我是这么给 Claude Code 下指令的，一共三条命令，对应三层升级：

**第一条，工具调用层：**

```
读取 PaiCLI 的 ToolRegistry.java 学习 Tool 注册模式，
然后在派聪明项目中创建 AgentToolRegistry 类，
注册4个 Tool：search_knowledge、upload_document、
delete_document、knowledge_stats。
每个 Tool 调用派聪明现有的 Service 层方法。
```

**第二条，ReAct 循环层：**

```
读取 PaiCLI 的 Agent.java 学习 ReAct 循环结构，
改造派聪明的 ChatHandler，在 processMessage 方法中加入 ReAct 循环。
保留 WebSocket 流式输出，每轮循环的思考过程也推给前端。
加预算控制：最大10轮、单次8000 token。
```

**第三条，记忆管理层：**

```
参考 PaiCLI 的 ConversationMemory 和 LongTermMemory，
给派聪明加上双层记忆。短期用内存 + token 压缩，
长期用 Redis 存用户交互摘要。
每次会话开始时从 Redis 检索相关历史注入 System Prompt。
```

三条命令跑完，Claude Code 一共改了 8 个文件、新建了 4 个文件。最耗时的是第二条，因为要把 ReAct 循环和现有的 WebSocket 流式推送结合起来，Opus 4.7 花了大概 3 分钟才跑完。

【此处插入三条命令执行过程截图：截图目标：展示三条命令的完整执行过程和文件变更列表；关键词：三层升级、文件变更、自动生成；建议位置：Claude Code 终端】

【此处插入文件变更汇总截图：截图目标：展示 git diff 的文件变更统计；关键词：8个文件修改、4个新建文件、代码行数；建议位置：终端 git diff --stat】

跑完之后我用 Claude Code + Opus 4.7 做了一轮 Review：

```
Review 刚才的所有变更，重点检查：
1. ReAct 循环有没有死循环风险
2. Tool 执行有没有异常处理
3. WebSocket 推送有没有线程安全问题
4. 记忆持久化有没有数据一致性问题
```

Review 报告指出了两个问题：Tool 执行异常时没有 catch 住会导致循环中断，以及 Redis 长期记忆的写入没有加过期时间。我让 Claude Code 顺手修了，前后加起来不到 10 分钟。

修完之后我直接跑了一轮集成测试，测试用例是这样的：

```
测试场景1：用户问"知识库里有多少文档"
预期：Agent 调用 knowledge_stats Tool，返回统计数据

测试场景2：用户问"帮我查一下有没有2026年产品手册，没有就上传这份"
预期：Agent 先调用 search_knowledge，发现没有，再调用 upload_document

测试场景3：用户连续问三个问题，第三个问题涉及第一个问题的结果
预期：Agent 能从短期记忆中拿到第一个问题的上下文
```

三个场景全部通过。第二个场景 Agent 用了 3 轮循环完成，和预期一致。

【此处插入测试通过截图：截图目标：展示三个测试场景的执行结果；关键词：测试通过、多步决策、记忆召回；建议位置：终端或测试报告】

【此处插入 Review 结果截图：截图目标：展示代码 Review 发现的问题和修复建议；关键词：死循环检查、异常处理、线程安全；建议位置：Claude Code 终端】

## 06、简历包装

如果大家在做类似的 RAG→Agent 升级项目，简历上可以这样包装：

**项目名称**：派聪明 AI 知识库（PaiSmart）

**项目简介**：基于 Spring Boot 3.4 + Elasticsearch 8.10 + DeepSeek API 的企业级 AI 知识库系统，支持多租户文档管理和智能问答，从纯 RAG 架构升级为 Agent 架构。

**技术栈**：Spring Boot 3.4、Spring WebFlux、Elasticsearch 8.10（KNN + BM25 混合检索）、Redis 7.0、MinIO、DeepSeek V4 API、WebSocket

**核心职责**：

1. 基于 Spring Boot + Elasticsearch 构建混合检索引擎，采用 KNN 向量搜索 + BM25 关键词重打分策略，知识库问答的召回准确率达到 92%
2. 设计并实现 Tool Calling 工具注册框架，为 Agent 注册 4 个核心工具（文档搜索、上传、删除、统计），让系统从被动问答升级为主动执行
3. 实现 ReAct（Reasoning + Acting）决策循环引擎，支持 Agent 自主完成多步复合任务，单次任务平均决策轮次 2.3 轮，最大支持 10 轮
4. 设计双层记忆管理架构，短期记忆采用 token 预算压缩策略控制上下文长度，长期记忆基于 Redis 持久化用户交互摘要，跨会话召回命中率提升 35%
5. 基于 WebSocket 实现 Agent 决策过程的实时推送，用户可以看到 Agent 的思考过程和工具调用状态，交互体验从"等答案"升级为"看 Agent 干活"

## ending

从 RAG 到 Agent，说到底就三件事。

让系统能调工具，

让系统能自己想下一步该干什么，

让系统能记住以前发生过什么。

一天时间能不能搞定？

如果手头有 PaiCLI 这样的参考实现，再配上 Claude Code + Opus 4.7 帮忙写代码和 Review，一天确实能把主干跑通。当然细节打磨还需要时间，但老板要的是"能跑起来给他演示"，不是"生产环境可用"。

周一给老板演示的时候，他让我输入"帮我检查知识库里有没有 2026 年的产品手册，没有的话上传这份"。Agent 三步搞定。老板点了点头。

我觉得他应该是满意了，虽然他可能根本没看懂 Agent 在后台做了什么。

但说真的，回头看这次升级，最让我感慨的不是 Agent 的能力，而是**我自己全程没写一行代码**。Claude Code 读了两个项目的源码、理解了架构差异、生成了改造方案、写了代码、跑了 Review、修了 bug。

我做的事情只有三件：**描述需求、确认方案、点头同意**。

这可能就是 Agent 时代的工作方式。

**【让 Agent 帮你造 Agent，这才是真正的递归。】**

我们下期见。
