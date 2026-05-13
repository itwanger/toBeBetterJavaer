---
title: AI Agent 面试题第八弹：综合设计题——架构选型、对比分析、场景设计 13 题
shortTitle: 面试题：综合设计题
description: 围绕 PaiCLI 实战，精选 13 道 AI Agent 综合设计面试题，覆盖架构选型、Claude Code 对比、从零设计 Agent、安全模型、可观测性和开源项目经验。
tag:
  - Agent
  - 面试题
  - 架构
category:
  - AI
author: 沉默王二
date: 2026-05-11
---

大家好，我是二哥呀。

这是面试题系列的最后一弹——综合设计题。

前面七篇我们聊了 Agent 核心架构、记忆与上下文、工具与安全、MCP 协议、多模型适配、Prompt 与 Skill、产品化，每一篇都在拆某个具体方向的知识点。但面试到后半段，面试官不会再问你“HITL 的五种审批决策是什么”这种可以查代码的细节了。他要看的是你的**系统设计能力、技术判断力和工程品味**。

综合设计题没有标准答案。回答的关键不是背一段结论，而是**展示你的思考过程**——怎么分析问题、怎么权衡取舍、怎么在约束条件下做出合理选择。这也是我做 PaiCLI 21 期教程最大的体会：写代码是手段，做决策才是核心能力。

## 01、PaiCLI 和 Claude Code 在架构上有哪些相似和不同

这是一道非常好的开场题。面试官不是让你做功能清单对比，而是想听你对两个 Agent 产品的**架构层面**理解。

### 相似点有哪些

先说共性。PaiCLI 和 Claude Code 在骨架上高度一致：

**第一，ReAct 核心循环**。两者的心脏都是一个 while 循环——把消息历史发给 LLM，检查响应里有没有 `tool_calls`，有的话执行工具把结果塞回历史，没有就退出循环。PaiCLI 的实现在 `Agent.java`，400 行代码能跑出完整效果。

```java
// Agent.java - ReAct 核心循环
while (true) {
    if (CancellationContext.isCancelled()) {
        return "⏹️ 已取消当前任务。";
    }
    maybeCompactHistory();
    AgentBudget.ExitReason exitReason = budget.check();
    if (exitReason != AgentBudget.ExitReason.WITHIN_BUDGET) {
        // Token 预算耗尽，兜底退出
        break;
    }
    // 发请求、解析 tool_calls、执行工具、塞回历史...
}
```

**第二，MCP 生态**。都支持 MCP 协议接入外部工具，PaiCLI 的 `McpServer.java` 实现了 stdio 和 Streamable HTTP 两种传输，Claude Code 也是类似的设计。

**第三，HITL 审批**。都有危险操作确认机制——在 Agent 要做高风险事情之前暂停等人确认。

**第四，Inline TUI**。都采用主屏直出 + 底部状态栏 + 工具调用折叠的交互范式。PaiCLI 的 `InlineRenderer` 和 `StatusInfo` 就是对标 Claude Code 的渲染形态。

**第五，记忆系统**。Claude Code 有 CLAUDE.md 做项目级记忆，PaiCLI 有 `LongTermMemory.java` 做持久化长期记忆，概念上异曲同工。

### 不同点在哪里

不同点才是面试的重点。

| 维度 | Claude Code | PaiCLI |
|---|---|---|
| 语言 | TypeScript | Java |
| 模型 | Claude 系列 | GLM/DeepSeek/Kimi/StepFun |
| 定位 | Anthropic 官方产品 | 教学项目，从零构建 |
| Multi-Agent | 单 Agent | 三角色协作（Planner/Worker/Reviewer） |
| Plan 模式 | 内置自动规划 | 用户显式 `/plan` 触发 |
| RAG | 无内置（靠工具搜索） | 内置 `CodeRetriever` + 向量检索 |
| Skill | 无明确概念 | 独立 `SkillRegistry` 系统 |
| Runtime API | 无 | HTTP/SSE API |

面试时**重点说不同点里你的设计选择和理由**。比如为什么 PaiCLI 选了显式 `/plan` 而不是像 Claude Code 那样自动规划？因为 PaiCLI 面向教学，显式触发让学生能清楚看到“什么时候用 ReAct、什么时候用 Plan-and-Execute”，理解两种模式的适用场景。产品化的 Agent 可以做自动路由，但教学项目需要可见性。

【此处插入 截图目标：PaiCLI 和 Claude Code 的终端界面并排对比，展示 inline TUI 的相似性；关键词：PaiCLI、Claude Code、TUI、状态栏；建议位置：终端截图拼接】

## 02、为什么选 Java 而不是 Python/TypeScript 来做 Agent CLI

这是一道“技术选型”题。面试官不是想听你站队“Java 好”或“Python 好”，他想看你能不能**跳出语言之争，从实际约束出发分析**。

### Java 的选型理由

PaiCLI 选 Java 有五个具体原因，每一个都对应源码里的真实决策：

**教学目标**。PaiCLI 面向 Java 开发者群体，这帮人天天写 Spring Boot，用 Java 实现 Agent 他们能看懂每一行代码。换 Python 写，读者还得先学 Python 的异步——asyncio 那套东西对 Java 程序员是额外认知负担。

**工程成熟度**。Java 的类型系统在大项目里优势明显。PaiCLI 发展到 21 期，几十个类之间的依赖关系，靠 IDE 的类型检查和重构工具管理起来很顺畅。Python 的 type hints 是可选的，大了之后容易乱。

**并发处理**。JVM 的 `ExecutorService`、`CompletableFuture` 开箱即用。PaiCLI 第 7 期做并行工具调用，直接用 `ExecutorService.invokeAll()` 就搞定了，不需要引入额外的并发框架。`SnapshotService` 的异步快照也是一个 `Executors.newSingleThreadExecutor()` 解决：

```java
// SnapshotService.java - 异步快照
private final ExecutorService executor = Executors.newSingleThreadExecutor(r -> {
    Thread thread = new Thread(r, "paicli-snapshot-writer");
    thread.setDaemon(true);
    return thread;
});
```

**JGit**。纯 Java 的 Git 实现，`SideGitManager` 用 JGit 做 Side-History 快照不依赖本机 git 命令。Python 也有 GitPython，但底层其实是调系统 git。

**JavaParser**。AST 分析代码关系图谱，PaiCLI 的 `CodeAnalyzer.java` 用 JavaParser 解析 Java 源码做 RAG 分块，Java 生态在这块有成熟方案。

### Python/TypeScript 的优势

公正分析一下对手：

- **Python**：AI/ML 生态最成熟，LangChain、LlamaIndex 等框架丰富，写原型最快
- **TypeScript**：Claude Code 自身就是 TS，MCP SDK 的 TypeScript 版本最完整，和前端生态打通方便

结论：没有绝对的对错。选型取决于**团队背景 + 项目目标 + 生态需求**。面试官想听的不是“Java 天下第一”，而是你能不能列出约束条件、逐条分析、给出有理有据的结论。

【此处插入 截图目标：PaiCLI 的 pom.xml 依赖列表，展示 JGit、JavaParser、Jackson 等关键依赖；关键词：pom.xml、JGit、JavaParser、依赖；建议位置：IDE 截图】

## 03、如果从零设计一个 Agent 产品，你怎么规划迭代路径

这道题考的是你的**产品规划能力**——不是写一份 PPT，而是真正做过从 0 到 1 的人才能回答出来的东西。

### 规划路径怎么排

参考 PaiCLI 的 21 期演进，我把它浓缩成四个阶段：

**Phase 1：最小可用（1-2 周）**

目标就一个——跑通。ReAct 循环 + 基础工具（读写文件、执行命令） + 单模型接入 + 纯 println 输出。PaiCLI 第一期就是这个状态，400 行代码，能对话、能调工具。

**Phase 2：核心能力（2-4 周）**

这一步加的都是“没有就不能用于生产”的东西：Plan-and-Execute 模式、Memory 系统（短期 + 长期）、HITL 审批 + 安全策略、多模型适配。PaiCLI 的 2-8 期对应这个阶段。

**Phase 3：生态集成（2-4 周）**

打通外部世界：MCP 协议（stdio + HTTP）、联网能力（搜索 + 抓取）、浏览器操控。PaiCLI 的 9-14 期。`McpServer.java`、`WebFetcher.java`、`BrowserConnector.java` 都在这个阶段落地。

**Phase 4：产品化（2-4 周）**

让用户真正用得起来：TUI 渲染（`InlineRenderer`）、LSP 诊断注入、Git 快照与回滚（`SnapshotService`）、后台任务 + API。PaiCLI 的 15-21 期。

### 关键原则是什么

**先跑通再优化**。Phase 1 的 400 行代码能跑，比一上来就设计完美架构重要得多。我见过太多人还没写第一行代码就在纠结用什么框架、怎么分层——结果一行有效代码都没产出。

**安全从第二步就加**。不要等到最后才补安全，改造成本极高。PaiCLI 第 6 期就上了 HITL + PathGuard + CommandGuard，后面所有新工具都自动受这层保护。如果安全是在第 20 期才补的，前面 19 期的工具都要回头改。

**工具决定能力**。Agent 的能力边界 = 工具集。优先做用户最需要的工具，不要为了“架构完整”去做用户根本不会用的东西。

【此处插入 截图目标：PaiCLI 21 期的 ROADMAP 全景图，展示从 ReAct 到 Runtime API 的完整演进路径；关键词：ROADMAP、21 期、迭代路径；建议位置：Markdown 文件渲染截图或白板时间线】

## 04、Agent 的可观测性怎么设计

一个生产级 Agent 必须回答三个问题：**它在干什么？它花了多少钱？它出问题了怎么排查？**

### 运行时状态怎么看

PaiCLI 的状态栏（`StatusInfo` + `InlineRenderer`）实时显示当前模型、token 用量、HITL 状态、MCP server 状态。`/context` 命令输出上下文模式、prompt cache、RAG topK、resources 状态。

```java
// StatusInfo.java 构建状态栏数据
public record StatusInfo(
    String model,
    String tokenUsage,
    boolean hitlEnabled,
    int mcpServerCount,
    String mode
) {}
```

### 成本怎么追踪

每轮输出 token 用量和估算成本。`TokenUsageFormatter.java` 区分普通 input / cached input / output 三种类型。这个区分很重要——cached input 的价格通常只有普通 input 的十分之一，不区分的话成本估算偏差很大。

### 审计日志怎么做

`AuditLog.java` 在 `com.paicli.policy` 包下，把每次危险工具调用记录成 JSONL 格式：

```java
// AuditLog.java - 审计日志设计
// 落盘策略：一行一条 JSON（JSONL），按天分文件 audit-YYYY-MM-DD.jsonl
// 默认目录 ~/.paicli/audit
// 写入失败只在 stderr 提示，不抛出——审计故障不能影响主流程

public static final String OUTCOME_ALLOW = "allow";   // 工具执行成功
public static final String OUTCOME_DENY  = "deny";    // 被 HITL 拒绝或策略拦截
public static final String OUTCOME_ERROR = "error";   // 工具执行异常
```

设计意图写得很清楚：把 Agent 的“实际副作用”变成可回放的事实流。行为评估、差错复盘、监控告警都从这一条数据流里出。

### 调试日志和对话历史

调试日志写在 `~/.paicli/logs/paicli.log`，LLM 的 `reasoning_content` 写入日志但不进对话历史（避免占 Token 预算）。`LlmTraceLogger.java` 负责这部分。

对话历史存在 `~/.paicli/history/session_*.jsonl`，完整记录可重放、可分析。

面试的时候把这五层——状态栏、成本追踪、审计日志、调试日志、对话历史——按层次讲清楚就够了。面试官真正看重的是你有没有“可观测性分层”的意识。

【此处插入 截图目标：PaiCLI 运行时的状态栏和 token 用量显示，以及 audit 日志文件的内容示例；关键词：状态栏、token、audit、JSONL；建议位置：终端截图 + 日志文件截图拼接】

## 05、怎么处理 LLM 的幻觉问题

Agent 场景下幻觉不是“回答不准确”那么简单——LLM 编造一个不存在的文件路径，Agent 真去读了，读失败了，LLM 又编造另一个路径，Agent 又去读……这就是幻觉驱动的死循环。

### 典型表现有哪些

三种最常见：LLM 编造不存在的文件路径、编造不存在的 API 或函数名、对工具返回的结果做错误解读。

### PaiCLI 怎么应对

**策略一：工具结果为准**。这是最核心的防线。Agent 的推理基于工具返回的真实结果，而不是 LLM 的“记忆”。LLM 说“这个文件应该有 X 函数”，但 `read_file` 返回的内容里没有，Agent 会把真实内容喂给 LLM 纠正。整个 ReAct 循环的设计哲学就是**不信任 LLM 的陈述，信任工具返回的事实**。

**策略二：RAG 提供真实数据**。`CodeRetriever.java` 检索并注入真实代码段，减少 LLM 凭空想象的空间。LLM 面前摆着真实的代码片段，比让它自己回忆“这个项目大概有什么类”靠谱多了。

**策略三：LSP 诊断兜底**。LLM 编造了不存在的类名/方法名写进代码，LSP 诊断会报编译错误，`LspDiagnosticReport` 把错误信息注入下一轮对话，LLM 自动修复。这层兜底非常重要——它把“运行时才发现的错”提前到了“编辑时就能发现”。

**策略四：Reviewer 角色**。Multi-Agent 模式下，`SubAgent` 作为 Reviewer 对 Worker 的输出做质量审查，能发现部分幻觉问题。相当于给 Agent 的输出加了一层代码审查。

**策略五：用户确认**。HITL 让用户在关键操作前有机会检查 LLM 的输出是否合理。人是最后一道防线。

面试回答的重点是那句话：**不信任 LLM 的陈述，信任工具返回的事实**。这句话能覆盖 80% 的幻觉问题。

【此处插入 截图目标：PaiCLI 中 LLM 幻觉被工具结果纠正的对话记录，展示 read_file 返回真实内容后 LLM 修正推理；关键词：幻觉、read_file、纠正；建议位置：终端会话截图】

## 06、Agent 的错误恢复策略有哪些

Agent 不是跑一次就完事的脚本，它是一个持续运行的循环。任何一个环节出问题都不应该让整个 Agent 挂掉——好的错误恢复是 Agent 产品化的核心指标。

### 轻度故障怎么处理

工具执行失败是最常见的情况。PaiCLI 的做法是把错误信息直接返回给 LLM，让 LLM 自己决定重试还是换方案。

比如 `read_file` 文件不存在——LLM 拿到“文件不存在”的错误后，通常会调 `list_dir` 找正确路径。单个工具失败不影响其他并行工具，`ToolRegistry` 的并行执行逻辑保证了这一点。

### 中度故障怎么处理

MCP Server 挂了属于中度故障。该 Server 的工具暂时不可用，Agent 可以用其他工具替代。比如 chrome-devtools MCP 挂了，fallback 到 `WebFetcher.java` 的 `web_fetch` 工具。

`/mcp restart <name>` 可以手动重启。PaiCLI 的 `McpServer` 有状态管理，重启后自动重新注册工具。

### 重度故障怎么处理

LLM API 超时或限流。流式响应中断时，`Agent.java` 里已收到的部分输出会保留，不会因为最后一个 chunk 超时就丢掉前面所有内容。限流时有退避策略。API 完全不可用时，`LlmClientFactory` 支持运行时切换到另一个模型：

```java
// LlmClientFactory.java - 多模型 fallback
return switch (normalized) {
    case "glm"     -> new GLMClient(apiKey, model);
    case "deepseek"-> new DeepSeekClient(apiKey, model);
    case "step"    -> new StepClient(apiKey, model, baseUrl);
    case "kimi"    -> new KimiClient(apiKey, model, baseUrl);
    default        -> null;
};
```

### 致命故障怎么处理

Agent 改坏了文件——这是最可怕的情况。`SnapshotService` 在每轮 Agent 执行前后都做 Git Side-History 快照，`/restore <N>` 可以回滚到任意快照点。`revert_turn` 工具甚至允许 Agent 自己触发回滚。

```java
// SnapshotService.java - 每轮执行前后快照
public <T> T runTurn(String mode, String input, ThrowingSupplier<T> supplier)
        throws Exception {
    String turnId = turnId(mode);
    snapshotBeforeTurn(turnId, summarize(mode, input));
    try {
        return supplier.get();
    } finally {
        snapshotAfterTurnAsync(turnId, summarize(mode, input));
    }
}
```

【此处插入 截图目标：PaiCLI 的 /restore 命令回滚快照的终端交互过程；关键词：restore、snapshot、回滚；建议位置：终端会话截图】

## 07、手写 Agent 和用框架有什么区别

### 核心差异在哪

| 维度 | 手写（PaiCLI） | 框架（LangChain/Spring AI） |
|---|---|---|
| 学习成本 | 理解原理，但开发慢 | 上手快，但黑盒多 |
| 灵活性 | 完全可控 | 受框架约束 |
| 调试 | 断点就能查 | 抽象层多，调试困难 |
| 依赖 | 最小化 | 大量传递依赖 |
| 升级 | 自己维护 | 框架 breaking change |
| 适合场景 | 教学、定制化产品 | 快速原型、标准场景 |

### PaiCLI 为什么选手写

教学项目需要学生看懂每一行代码。你用 Spring AI 写个 Agent，三行注解就跑了，但学生完全不知道底下发生了什么——ReAct 循环在哪？tool_calls 怎么解析的？Token 预算怎么管理的？全藏在框架里了。

PaiCLI 的 `Agent.java` 从第一行 `while (true)` 到最后一行 `return finalReply`，中间经历了什么一目了然。这对理解 Agent 原理的价值是框架给不了的。

而且 PaiCLI 的 Roadmap 里专门规划了 Pro 版本——用 Spring AI / LangGraph4J 重写核心模块，让用户对比“手写 vs 框架”的差异。这两版并存本身就是最好的教学材料。

### 面试怎么回答

先说手写的好处（理解原理、完全可控），再说框架的好处（效率高、生态丰富），最后说你的选择逻辑——“快速验证用框架，需要深度定制或教学用手写”。别站队，面试官不想听极端观点。

【此处插入 截图目标：PaiCLI 手写 Agent.java 的 while 循环 vs Spring AI 的注解式 Agent 配置对比；关键词：手写、框架、Agent.java、Spring AI；建议位置：代码对比截图】

## 08、Agent 的测试策略是什么

### 难点在哪

Agent 测试最大的难点是 **LLM 输出是非确定性的**。同样的输入跑两次，LLM 可能返回不同的工具调用顺序、不同的推理路径。你不能像测一个函数那样断言输出等于某个固定值。

### PaiCLI 怎么做测试分层

**第一层：单元测试（确定性）**

把能确定性测试的部分独立出来。`PathGuard.validatePath()` 的规则匹配、`CommandGuard` 的黑名单检查、JSON-RPC 解析、SSE 增量合并、`TokenBudget` 的计算——这些全是纯函数，输入确定输出确定，标准 JUnit 就能搞定。

`mvn test -Pquick` 快速回归这批用例。

**第二层：集成测试（半确定性）**

MCP Server 启动和工具注册、HITL 审批流程、配置加载优先级（`PaiCliConfig` 的四级加载顺序）。这些涉及多个组件协作但不依赖 LLM，结果是确定的。

**第三层：端到端测试（非确定性）**

完整的 ReAct 循环需要 API Key，浏览器 MCP 端到端需要本机 Chrome。这类测试通常不在 CI 里自动跑，手工验证。

**第四层：Prompt 回归测试**

固定一组测试用例 + 预期行为。改了 `PromptAssembler` 的模板或者调了 `base.md` 的措辞后跑一遍，人工比对输出有没有偏差。

### 核心原则

**把能确定性测试的部分独立出来测**。Agent 循环是非确定性的，但循环里的每个组件——`ToolRegistry.executeTool()`、`PathGuard.validatePath()`、`AuditLog.record()`——都是确定性的。测试覆盖这些组件，Agent 的可靠性就有保障了。

【此处插入 截图目标：PaiCLI 的测试目录结构和典型单元测试代码；关键词：test、JUnit、PathGuard、单元测试；建议位置：IDE 截图】

## 09、如何向面试官介绍你的 Agent 项目

### 1 分钟版本怎么说

这是面试最高频的问题，但大多数人讲不好。要么讲太细面试官听不下去，要么讲太泛没有技术含量。1 分钟版本要做到**有骨架、有亮点、有数据**。

参考话术：

“我从零开始用 Java 实现了一个 AI Agent CLI，对标 Claude Code。项目分 21 期迭代：

核心是 ReAct 循环 + Function Calling，支持 Plan-and-Execute 和 Multi-Agent 两种高级模式。接入了 GLM、DeepSeek、Kimi、StepFun 四个模型，运行时可切换。实现了 MCP 协议，能通过 stdio 和 HTTP 接入外部工具，内置 Chrome DevTools 浏览器操控。

安全层有 HITL 审批、路径围栏、命令黑名单、操作审计。记忆系统支持短期/长期/RAG 三层，长上下文模式适配 200k-1M 窗口。产品化方面做了 inline TUI、LSP 诊断注入、Git 快照回滚、后台任务和 HTTP API。

整个项目从第一期的 400 行代码演进到现在的完整产品，最大的收获是理解了 Agent 从原理到产品的全链路。“

### 面试官可能追问什么

说完 1 分钟版本，面试官通常会从中挑一个方向深入追问。如果他问“MCP 协议具体怎么实现的”，你就展开讲 `McpServer.java` 的 JSON-RPC 解析和工具注册。如果他问“多模型怎么切换”，就讲 `LlmClientFactory` 的 switch 和 `LlmClient` 接口抽象。

关键是你得对 21 期的每一期都心中有数，面试官追到哪你都能接上。

【此处插入 截图目标：PaiCLI 的启动 Banner，展示版本号、当前模型、可用工具数等信息；关键词：PaiCLI、Banner、版本；建议位置：终端截图】

## 10、你在做 PaiCLI 的过程中踩过哪些坑

面试官爱问“踩坑”，这比成功经验更能体现真实能力。坑踩得越具体，面试官越相信你是真做过的。

### 踩过哪些典型的坑

**坑 1：Tool 描述太模糊导致 LLM 乱选工具**

早期 `execute_command` 的描述写得太泛，LLM 经常用 `cat` 命令代替 `read_file` 读文件。排查了半天才意识到问题出在工具描述而不是模型能力上。解决方法很土但有效——在描述里明确写“不要用 execute_command 读文件”。

这个教训的本质是：Function Calling 的质量取决于工具描述的质量。LLM 的“工具选择能力”其实就是“理解工具描述的能力”。

**坑 2：SSE 增量 tool_calls 解析**

流式响应的 tool_calls 是增量的——每个 chunk 只有一部分 JSON，不是完整的。一开始我以为每个 chunk 都是一个完整的 tool_call JSON，解析直接报错。查了好久才搞清楚，需要按 `index` 字段累积拼接 `name` 和 `arguments`。

```java
// 增量合并逻辑伪代码
// chunk1: {index:0, function:{name:"read"}}
// chunk2: {index:0, function:{arguments:"{\"pa"}}
// chunk3: {index:0, function:{arguments:"th\":\"pom.xml\"}"}}
// 最终: {index:0, function:{name:"read_file", arguments:"{\"path\":\"pom.xml\"}"}}
```

**坑 3：MCP Server 启动超时**

chrome-devtools MCP 首次启动要用 npx 拉包，30 秒超时不够。用户一启动就报超时，以为是配置错了。解决方案是超时提升到 60 秒 + 加进度提示让用户知道在等什么。

**坑 4：符号链接绕过路径校验**

`PathGuard` 早期用 `getCanonicalPath()` 校验路径，但如果项目内有一个指向 `/etc/` 的符号链接，canonical path 解析后就绕过了围栏。后来改用 `Files.toRealPath()` 并且对 real path 做二次校验才堵住。

这个坑很隐蔽。`PathGuard.java` 里那行 `resolved.toRealPath()` 就是血泪教训。

【此处插入 截图目标：PaiCLI PathGuard.java 中符号链接校验的关键代码段；关键词：PathGuard、toRealPath、符号链接；建议位置：IDE 代码截图】

## 11、如果要把 PaiCLI 部署到生产环境，还需要做什么

### 教学项目和生产产品的 Gap 在哪

这道题考的是你对“生产级”的理解。写一个能跑的 Agent 和运营一个稳定的 Agent 产品之间，差距是巨大的。

**沙箱隔离**。当前 PaiCLI 的 `execute_command` 直接操作宿主文件系统。生产环境必须用 Docker / microVM 隔离，Agent 在容器内执行，通过 volume mount 限制可访问目录。`PathGuard` 是软防护，容器是硬隔离。

**多租户**。PaiCLI 是单用户的。生产环境每个用户需要独立的对话历史（`ConversationMemory`）、长期记忆（`LongTermMemory`）、配置（`PaiCliConfig`）——互不干扰。

**限流和配额**。按用户限制 LLM 调用次数 / token 消耗。当前 `AgentBudget` 只管单次运行的 Token 预算，不管累计消费。

**监控告警**。Prometheus + Grafana 监控 Agent 延迟、错误率、token 消耗。`AuditLog` 的 JSONL 可以作为告警的数据源，但需要一个采集和分析管道。

**日志聚合**。当前日志在 `~/.paicli/logs/` 本地。多节点部署需要 ELK / Loki 做集中式日志。

**认证鉴权**。Runtime API 当前用简单的 API Key。生产环境需要 OAuth / JWT，还要做 RBAC。

**模型网关**。统一的 LLM 调用网关做负载均衡、fallback、成本控制。当前 `LlmClientFactory` 是进程内切换，不够。

【此处插入 截图目标：PaiCLI 生产化改造的架构示意图，展示沙箱、网关、监控的层次关系；关键词：生产环境、沙箱、网关、监控；建议位置：白板/架构图】

## 12、Agent 领域你觉得下一个大方向是什么

这是开放讨论题，面试官想看你对行业趋势有没有自己的判断。别背新闻稿，说你真正关注的方向。

### 有哪些值得关注的方向

**Computer Use / GUI Agent**。Agent 不只操作 API 和命令行，而是能像人一样操作 GUI——点击按钮、填表单、拖拽文件。PaiCLI 的 Chrome DevTools MCP（`BrowserConnector.java`）其实已经在做这件事了，只不过是通过 CDP 协议而不是像素级操作。Anthropic 的 Computer Use、Google 的 Project Mariner 代表了更激进的方向。

**多 Agent 协作标准化**。当前 Multi-Agent 各家实现不同，PaiCLI 的三角色模型（Planner/Worker/Reviewer）是自定义的。Google 的 A2A（Agent-to-Agent）协议在尝试标准化 Agent 间通信。如果这个标准化成了，不同厂商的 Agent 就能互相协作。

**Agent 安全与对齐**。随着 Agent 能力增强，安全问题越来越重要。PaiCLI 做了 HITL、PathGuard、CommandGuard、AuditLog 这四层防护，但这是“已知风险”的防护。真正难的是“未知风险”——如何防止 Agent 被 prompt 注入利用、如何保证 Agent 在长时间自主运行时不偏离目标。

**端到端评估**。如何系统化评估 Agent 的能力——不是评估 LLM 的文本生成质量，而是评估 Agent 完成复杂任务的成功率。SWE-bench、GAIA 这些 benchmark 在做，但还远远不够。PaiCLI 的 Prompt 回归测试只是最基础的评估。

**低成本推理**。Agent 的 token 消耗远超普通对话。一个 PaiCLI 的 Plan-and-Execute 任务，可能要消耗几十万 token。推理成本降低（更高效的 KV Cache、推测解码、小模型 + 大模型混合路由）直接影响 Agent 的商业可行性。

【此处插入 截图目标：PaiCLI 的 Chrome DevTools MCP 操控浏览器截图，展示 GUI Agent 能力；关键词：Chrome、CDP、GUI Agent；建议位置：终端 + 浏览器截图拼接】

## 13、你觉得 AI Agent 会取代程序员吗

面试官偶尔会问这种开放问题。这道题没有对错，但你的回答能暴露你的思考深度。

### 我的判断是什么

**不会取代，但会重新定义“程序员”的工作内容。**

Agent 擅长的事情很多——模板化工作（CRUD、配置修改、测试用例生成）、搜索和检索（找 API、查文档、读代码）、重复性重构（批量重命名、格式化、迁移）。这些体力活确实会被 Agent 接管，而且接管的速度会比大多数人预期的快。

但 Agent 不擅长的事情也很明确：

**理解模糊需求**。客户说“做个像抖音一样的”，Agent 不知道该怎么开始。人能通过追问、推测、类比来把模糊需求转化成具体方案，Agent 做不到。

**架构决策**。微服务还是单体、SQL 还是 NoSQL、自建还是买服务——这些决策需要理解业务上下文、组织约束、长期演进方向。PaiCLI 选 Java 而不是 Python 的决策过程，Agent 做不了。

**创造性设计**。做 PaiCLI 的 inline TUI 时，我反复在 Claude Code 的交互上找灵感、在终端限制中做取舍。这种“在约束中创造”的过程，目前的 Agent 能力远远不够。

未来的程序员更像是“Agent 的指挥者”——定义目标、审核输出、处理 Agent 搞不定的复杂决策。日常编码的体力活交给 Agent，人类专注在更高层次的思考上。

用 PaiCLI 的话来说：**你是用户，Agent 是执行者。HITL 不会消失，因为最终的决策权必须在人手里。**

【此处插入 截图目标：PaiCLI HITL 审批流程截图，呼应“决策权在人手里”的主题；关键词：HITL、审批、人机协同；建议位置：终端会话截图】

## ending

8 篇面试题系列到这里就全部完结了。

回头看一下这个系列：第一弹 Agent 核心架构（ReAct、Plan-and-Execute、Multi-Agent），第二弹记忆与上下文（Memory 三层、Token 预算、上下文压缩），第三弹工具与安全（Function Calling、HITL、PathGuard），第四弹 MCP 协议（JSON-RPC、stdio、Streamable HTTP），第五弹多模型适配（LlmClient 接口、运行时切换），第六弹 Prompt 与 Skill（分层 Prompt、SkillRegistry），第七弹产品化（TUI、LSP、Git 快照、Runtime API），第八弹综合设计（选型对比、架构规划、生产化）。

加起来大概 100 道题，覆盖了 AI Agent 开发的完整知识体系。

但我想说的是——这 100 道题的答案不是用来背的。如果你能把每道题背后的**设计思路和工程权衡**搞明白，面试官怎么追问你都能接上。面试官真正想考的不是“你知不知道 ReAct”，而是“你能不能在实际项目中做出合理的技术决策”。

PaiCLI 的源码已经开源在 GitHub 上，21 期教程 + 100 道面试题 + 完整源码，三者结合着看效果最好。

理解比记忆重要，做过比看过重要。

## 简历包装

> 以下内容仅供简历参考，面试时结合自己的理解表达。

**项目名称**：PaiCLI — 基于 Java 的 AI Agent CLI（对标 Claude Code）

**项目简介**：从零构建的 AI Agent 命令行工具，实现了 ReAct 循环、Plan-and-Execute、Multi-Agent 协作等核心模式，支持 MCP 协议接入外部工具生态，内置 HITL 安全审批、RAG 代码检索、长上下文管理和 Inline TUI，可作为开发辅助的 Agent 产品落地。

**技术栈**：Java 17 / Maven / JGit / JavaParser / Jackson / JLine / Lanterna / OkHttp / SSE / JSON-RPC / MCP / Chrome DevTools Protocol

**核心职责**：

1. **全链路 Agent 架构设计**：从 400 行 ReAct 原型演进到 21 期完整产品，涵盖 ReAct 循环、Plan-and-Execute DAG 调度、Multi-Agent 三角色协作（Planner/Worker/Reviewer），支持 GLM/DeepSeek/Kimi/StepFun 四模型运行时切换（`LlmClientFactory` + `LlmClient` 接口抽象）
2. **MCP 协议与浏览器操控**：实现 MCP stdio 和 Streamable HTTP 双传输，支持 tools/resources/prompts 三大能力；集成 Chrome DevTools MCP 实现浏览器自动化操控，含 CDP 会话复用和登录态保持（`BrowserConnector` + `BrowserSession`）
3. **安全与可观测体系**：设计四层安全防护（HITL 审批、PathGuard 路径围栏、CommandGuard 命令黑名单、AuditLog 操作审计），实现 JSONL 审计日志、Token 成本追踪、状态栏实时监控，支持 Git Side-History 快照与一键回滚（`SnapshotService` + `SideGitManager`）
4. **记忆与上下文工程**：实现短期/长期/RAG 三层记忆系统，设计 Token 预算管理（`AgentBudget`）和对话历史自动压缩（`ConversationHistoryCompactor`），Prompt 分层架构支持 base/personality/mode/approval 四层组装（`PromptAssembler`）
5. **产品化交付**：Inline TUI 流式渲染（对标 Claude Code 交互体验）、LSP 诊断注入实现“编辑即纠错”、Skill 系统支持 Markdown 扩展点、Runtime API（HTTP/SSE）支持后台任务和外部集成、图片复制粘贴输入（`ImageProcessor` + `ClipboardImage`）
