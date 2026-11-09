---
title: 手搓 Java 终端 Agent 第 5 期，主从 Multi-Agent 编排、Sub-agent 池化并发与默认拒绝审查
shortTitle: Java Multi-Agent 协作与并发
description: PaiCLI 第 5 期，基于最新源码拆解 Multi-Agent 与 Sub-agent 并发协作的实现，涵盖主从结构下的三角色分工、无工具角色的权限隔离、基于 Kahn 拓扑排序的计划校验、BlockingQueue 执行池并发与防输出交错的缓冲、结构化交付协议以及默认拒绝（Fail-Closed）的审查重试。
keywords: Multi-Agent, Sub-agent, Java Agent, 任务编排, PaiCLI
tag:
  - Agent
  - Java
category:
  - AI
author: 沉默王二
date: 2026-04-22
---

大家好，我是二哥呀。

前四期我们给 PaiCLI 实现了 ReAct 循环、Plan-and-Execute、上下文管理和 RAG。

但如果把一个跨多个模块的大任务交给同一个 Agent 从头做到尾，很容易遇到两个问题。

第一个问题是职责乱。同一个模型既要拆解计划，又要根据工具的报错信息去修改代码，很容易在规划阶段就陷入某个细节不能自拔，导致 Plan 考虑不全面，前后步骤也对不上。

第二个问题是自己检查自己写的代码，标准容易主观。模型按自己的思路写完一段逻辑，紧接着在同一个上下文里检查这段逻辑有没有漏洞，它往往会沿用刚才的假设，把只完成了一半、或者缺少边界校验的结果判定为合格的。

解决这两个问题的常见做法是拆分角色，引入主从结构的 Multi-Agent 协作。

把原来什么都做的单个 Agent 拆分成规划者（Planner）、执行者（Worker）和检查者（Reviewer）三个子 Agent（Sub-agent），由编排器统一调度。

规划者不调用工具，只负责把任务拆分成带依赖关系的步骤；多个执行者从 Worker 池中领取步骤并行执行；检查者在一个不带历史对话的独立上下文里逐个验收步骤，不合格就退回重做。

![](https://cdn.paicoding.com/stutymore/paicli-multi-agent-roles-20261109101939-adafd552.png)

这一期我们对照 PaiCLI 的最新源码，把这套 Multi-Agent 与 Sub-agent 并发协作的机制从头到尾讲清楚：

- 为什么选择主从编排架构，三类角色和七种消息类型怎么配合；
- 怎么隔离 Sub-agent 的工具权限，怎么按内容的变化频率组装各角色的提示词；
- 规划阶段怎么去掉 JSON 外层的代码块标记，怎么用拓扑排序拦截未知依赖和循环依赖；
- 执行阶段怎么用阻塞队列管理一组 Worker 并行执行，怎么用各自独立的内存缓冲区防止终端输出混在一起；
- Worker 之间怎么传递上下文和已授权的网址，Reviewer 怎么按默认拒绝（Fail-Closed）策略审查，以及审查不通过时怎么带着反馈重试。

## 01、为什么需要主从架构

目前主流的 Multi-Agent 协作方式大致分为两种。

一种是微软 AutoGen（57.3K Star）采用的对等对话方式，多个 Agent 围绕同一个议题互相发消息、协商结论，适合开放式的讨论。另一种是 CrewAI（49.5K Star）采用的主从委派方式，先明确每个角色的职责范围，再按固定流程分发任务、验收结果。

![](https://cdn.paicoding.com/paicoding/3e1ab7812e7a2ea7a5dd956880405a59.jpg)

如果让终端里的多个子 Agent 两两之间自由对话，它们之间的调用关系很容易变成网状结构，既无法预估总共要进行多少轮对话、消耗多少 Token，出现死循环时也很难排查。

PaiCLI 选择了主从架构（Orchestrator-SubAgent）。编排器 `AgentOrchestrator` 是唯一的调度中心，每个 `SubAgent` 只和编排器交互。子 Agent 之间不直接通信，任务下发、结果收集、审查退回以及把上游结果传给下游，都由编排器统一处理。

![](https://cdn.paicoding.com/stutymore/paicli-multi-agent-routing-20261109101939-d663996c.png)

在这个主从结构下，`AgentRole` 枚举定义了三类角色。

- `PLANNER`（规划者）：接收用户的原始需求，把需求拆解为带类型和依赖关系的步骤；只输出结构化的计划，不执行任何具体操作
- `WORKER`（执行者）：接收单个步骤的描述以及前置步骤的结果，调用文件读写、代码检索和终端命令等工具完成这个步骤，再按约定格式汇报完成情况
- `REVIEWER`（检查者）：对照步骤的原始要求，独立验收执行者提交的结果；验收通过后，依赖这个步骤的下游才能执行，验收不通过则列出具体问题，退回给执行者重做

```java
// src/main/java/com/paicli/agent/AgentRole.java
public enum AgentRole {
    PLANNER("规划者", "负责分析用户任务，制定执行计划，将复杂任务拆解为可执行的子任务"),
    WORKER("执行者", "负责执行具体任务步骤，调用工具完成文件操作、命令执行等操作"),
    REVIEWER("检查者", "负责检查执行结果的质量和正确性，提供改进建议");
}
```

编排器和三类子 Agent 之间传递的消息对象是 `AgentMessage`，它用 Java 17 的 `record` 定义，包含发送方名称 `fromAgent`、发送方角色 `fromRole`、消息正文 `content` 和消息类型 `type` 四个字段。

```java
// src/main/java/com/paicli/agent/AgentMessage.java
public record AgentMessage(
        String fromAgent,
        AgentRole fromRole,
        String content,
        Type type
) {
    public enum Type {
        TASK,
        RESULT,
        PARTIAL,
        FEEDBACK,
        APPROVAL,
        REJECTION,
        ERROR
    }
}
```

这里的 `Type` 枚举覆盖了协作全流程中的七种消息类型。

- `TASK` 是编排器派发给子 Agent 的任务；
- `RESULT` 是子 Agent 正常完成后的输出；
- `PARTIAL` 表示执行者在 Token 预算或对话轮数用完时提前结束，只交回了部分结果；
- `FEEDBACK`、`APPROVAL` 和 `REJECTION` 分别表示审查阶段的反馈、通过和不通过；
- `ERROR` 表示模型调用失败、或者在不允许的情况下调用了工具等错误。

![](https://cdn.paicoding.com/stutymore/paicli-multi-agent-messages-20261109101939-c44455d6.png)

围绕这套主从结构，`agent/` 包下的八个核心类分工如下。

- `AgentRole`：定义规划者、执行者、检查者三类角色
- `AgentMessage`：编排器和子 Agent 之间传递的不可变消息对象，带有七种消息类型
- `SubAgent`：子 Agent 实例，各自维护角色提示词、对话历史和上下文压缩，共用同一个工具注册表和模型客户端
- `AgentOrchestrator`：编排器，按顺序完成规划、按 DAG 分批并发执行、审查重试和结果汇总
- `TeamStructuredReply`：按严格规则把三类角色的最终回复解析成 JSON，负责去掉外层的代码块标记，并拒绝重复的键和 JSON 后面多余的文字
- `TeamPlanParser`：校验规划者输出的 JSON 计划，负责给步骤重新编号、拦截未知依赖，并用 Kahn 拓扑排序检测循环依赖
- `TeamWorkerReport`：解析执行者的结构化交付报告，区分已完成（`completed`）和受阻（`blocked`）两种状态
- `TeamReviewVerdict`：解析检查者的审查结论，按默认拒绝原则判定是否通过，并按优先级提取退回原因

## 02、三类 Sub-agent

规划者、执行者和检查者虽然都是 `SubAgent` 类的实例，但它们能使用的工具和系统提示词是严格区分开的。

在 `SubAgent.shouldUseTools` 中，只有角色为 `WORKER` 的实例才会返回 `true`。

```java
// src/main/java/com/paicli/agent/SubAgent.java
private boolean shouldUseTools() {
    return role == AgentRole.WORKER;
}
```

`SubAgent` 向大模型发起请求时，会先根据 `shouldUseTools()` 判断请求里要不要带上工具定义。对于 `PLANNER` 和 `REVIEWER`，传给 `llmClient.chat` 的工具列表是 `null`。

如果允许规划者在制定计划时调用 `read_file` 或 `execute_command`，就会变成一边执行一边拆解，很难再从整体上安排步骤；同样，检查者如果能调用写文件工具，就可能直接修改执行者的代码，做不属于自己职责的事。此外，评测审计测试 `TeamRequestAudit` 也会检查，发给规划者和检查者的请求里，不能包含任何工具 Schema。

如果底层模型没有遵守约定，请求里明明没有提供工具，响应里却依然带有 `tool_calls`，或者在正文里留下了 `<｜DSML｜function_calls>` 这类没有被执行的工具调用标签，该怎么处理？

`SubAgent` 会在收到响应后进行检查。只要满足 `!shouldUseTools() && response.hasToolCalls()`，就立即结束本次调用，在终端打印“本角色不提供工具，工具调用未执行”，并返回 `AgentMessage.error`，让编排器按失败处理。对于正文里残留的工具调用标签，则先通过 `llmClient.looksLikeUnexecutedToolCall` 进行识别并提示用户，随后这段不符合格式的文本会被 JSON 解析器拒绝。

```java
// src/main/java/com/paicli/agent/SubAgent.java
if (response.hasToolCalls() && !shouldUseTools()) {
    streamRenderer.finish();
    String reason = "本角色不提供工具，工具调用未执行";
    conversationLedger.appendMessage("team", name, "llm_response", LlmClient.Message.assistant(
            response.reasoningContent(), response.content(), response.toolCalls()));
    out.println(AnsiStyle.subtle(reason));
    return AgentMessage.error(name, role, reason);
}
```

划清工具权限之后，还要通过系统提示词约束每个角色的行为。

`SubAgent.getSystemPrompt` 没有把提示词硬编码在 Java 字符串里，而是先把当前角色对应到 `PromptMode` 中的 `TEAM_PLANNER`、`TEAM_WORKER` 或 `TEAM_REVIEWER`，再统一交给 `PromptAssembler.assemble` 组装。

```java
// src/main/java/com/paicli/agent/SubAgent.java
private String getSystemPrompt() {
    return promptAssembler.assemble(promptMode(), PromptContext.builder()
            .projectMemoryContext(buildProjectMemoryContext())
            .externalContext(buildExternalContext())
            .skillIndex(shouldUseTools() ? buildSkillIndex() : "")
            .toolsEnabled(shouldUseTools() && llmClient.supportsTools())
            .build());
}
```

`PromptAssembler` 拼接提示词时，如果当前角色的 `toolsEnabled` 为 `false`，会先调用 `stripToolSections`，删掉基础提示词 `base.md` 里的 `## Tools` 和 `## Tool Policy` 两节，再补上一节 `## Tool Availability`，告诉规划者“把需要读取文件、执行命令等操作写成计划步骤，交给执行者”，告诉检查者“根据收到的任务与执行结果进行审查，证据不足时在 issues 中说明”。

整份系统提示词按内容变化的频率从低到高依次排列。

- 最前面是整个会话期间都不变的内容：`base.md`、性格设定 `calm.md`、角色模式文件（`team-planner.md` / `team-worker.md` / `team-reviewer.md`）、审批规则、上下文管理说明和输出格式说明
- 其次是只提供给 Worker 的 `## Skills` 索引，只有在启用或停用 Skill 时才会变化
- 系统提示词中的 `## Project Context` 放 PAI.md 等文件里的项目规范。可用的 Skill 目录排在项目规范后面；如果模型窗口足够大，而且外部服务提供了资源，末尾还会附上 MCP 资源索引。
- 日期和时区放在本轮任务的开头。

把不变的规则放在开头、经常变化的上下文放在末尾，同一个 Sub-agent 在多轮工具调用或多次重试时，提示词的前半部分就能保持逐字节一致，从而命中大模型服务端的前缀缓存（Prefix Caching），减少重复计算的时间和费用。

![](https://cdn.paicoding.com/stutymore/paicli-multi-agent-tool-boundaries-20261109102216-7aa22123.png)

三份角色模式文件分别规定了严格的输出格式。

发给模型的提示词大概是这样的。

```
【系统消息】

基础规则、执行者职责、审批规则、上下文管理和输出要求……

## Project Context
项目规范（来自 PAI.md）
- 项目使用 Java 17。
- 修改配置后运行对应测试。

## Skills
……执行者可用的技能目录……

## MCP Resources 索引（仅 URI / 描述，不含正文）
- @docs:demo://config-guide — 项目配置说明

【本轮任务消息】

<paicli-turn-context>
当前日期: 2026-11-09
当前时区: Asia/Taipei
</paicli-turn-context>

总任务上下文：检查项目配置是否符合团队规范。

当前任务：读取配置文件，核对 Java 版本。
```

`prompts/modes/team-planner.md` 要求规划者只输出一个包含 `summary` 和 `steps` 数组的 JSON 对象。简单任务拆成 `1` 到 `3` 步，复杂任务拆成 `5` 到 `10` 步。可以独立完成的步骤，`dependencies` 保持为空，这样编排器就能把它们同时分给多个 Worker 并行执行；用户指定的工具、交付结果和验收条件，也要写进对应步骤的描述里。

`prompts/modes/team-worker.md` 规定执行者查代码时，优先用 `glob_files`、`grep_code` 和 `read_file` 在需要时直接查找，只有无法用关键词精确定位、需要按语义检索时才用 `search_code`。工具调用全部完成后，执行者发给编排器的最后一条回复必须是单个 JSON 对象，顺利完成就返回 `completed`，缺少必要条件就返回 `blocked`。

`prompts/modes/team-reviewer.md` 要求检查者对照步骤要求的交付物逐项核对，只输出一个包含布尔值 `approved` 以及 `summary`、`issues`、`suggestions` 字段的 JSON 对象。

## 03、规划阶段的 JSON 解析与 DAG 校验

规划者返回一段文本后，编排器不能用正则表达式从中随便截取一段 JSON 就继续执行。

在实际调用中，大模型返回的 JSON 经常被包在一层 Markdown 代码块标记里，或者在 JSON 结尾的右大括号后面多写几句解释。

更麻烦的是计划内容本身的出错，步骤 ID 重复，引用了根本不存在的前置步骤，甚至出现 `step_1` 依赖 `step_2`、`step_2` 又依赖 `step_1` 的循环依赖。

如果解析器没有拦截未知依赖，保留了一条指向不存在步骤的依赖关系，那么在执行阶段检查前置步骤是否完成时，这个步骤会一直处于等待状态，整个流程也就无法继续推进。

为了在执行之前拦住这些问题，PaiCLI 先用 `TeamStructuredReply.parseObject` 做严格的 JSON 语法解析，再用 `TeamPlanParser.parse` 校验任务图的结构。

`TeamStructuredReply` 内部持有一个开启了严格校验选项的 Jackson `ObjectMapper`。

- 开启 `STRICT_DUPLICATE_DETECTION`：只要 JSON 对象里出现同名的重复键（比如两个 `"approved"` 字段），就抛出异常
- 开启 `FAIL_ON_TRAILING_TOKENS`：JSON 结尾的右大括号后面只要还有多余的文字，就报错
- 调用 `unwrapWholeFence` 处理代码块标记：只有当整段回复从头到尾被一个 Markdown 代码块包住，并且这个代码块没有标注语言或者标注为 `json` 时，才去掉最外层的代码块标记；如果步骤描述的字符串里包含 `bash` 等代码片段，则原样保留，不会改动其中的内容

```java
// src/main/java/com/paicli/agent/TeamStructuredReply.java
private static final ObjectMapper STRICT_MAPPER = new ObjectMapper()
        .enable(JsonParser.Feature.STRICT_DUPLICATE_DETECTION)
        .enable(DeserializationFeature.FAIL_ON_TRAILING_TOKENS);

static JsonNode parseObject(String reply) throws IOException {
    if (reply == null || reply.isBlank()) {
        throw new IOException("回复为空");
    }
    JsonNode root;
    try {
        root = STRICT_MAPPER.readTree(unwrapWholeFence(reply.trim()));
    } catch (IOException e) {
        throw new IOException("回复不是单个合法 JSON 对象", e);
    }
    if (root == null || !root.isObject()) {
        throw new IOException("回复必须是 JSON 对象");
    }
    return root;
}
```

得到格式正确的 `JsonNode` 后，再由 `TeamPlanParser.parse` 校验任务图（DAG，有向无环图）是否合法。

它先读取 `steps` 数组（没有 `steps` 时也兼容读取 `tasks` 字段），数组为空就抛出异常。然后遍历每个步骤，检查 `id` 是否为非空字符串，并按出现顺序把步骤重新编号为 `step_1`、`step_2`……`step_N`，原始 ID 和新编号的对应关系存进 `idMapping`。如果某个原始 `id` 重复出现，`idMapping.putIfAbsent` 会返回非空值，解析器随即报错。

接下来解析每个步骤的 `dependencies` 数组。解析器用每个依赖项去 `idMapping` 里查找对应的新编号，只要查不到（`mapped == null`），就说明模型引用了一个计划里没有的步骤 ID，解析器会立即抛出 `IOException("计划依赖必须引用已声明的步骤 id: ...")`。它既不会悄悄丢掉这条依赖，也不会去猜这个 ID 可能指的是哪个步骤。

最后调用 `requireAcyclic` 检测循环依赖，使用的是经典的 Kahn 拓扑排序算法。

```java
// src/main/java/com/paicli/agent/TeamPlanParser.java
private static void requireAcyclic(List<AgentOrchestrator.ExecutionStep> steps) throws IOException {
    Map<String, Integer> pendingDeps = new HashMap<>();
    Map<String, List<String>> dependents = new HashMap<>();
    for (AgentOrchestrator.ExecutionStep step : steps) {
        pendingDeps.put(step.id(), step.dependencies().size());
        for (String dep : step.dependencies()) {
            dependents.computeIfAbsent(dep, key -> new ArrayList<>()).add(step.id());
        }
    }
    Deque<String> ready = new ArrayDeque<>();
    pendingDeps.forEach((id, count) -> {
        if (count == 0) {
            ready.add(id);
        }
    });
    int visited = 0;
    while (!ready.isEmpty()) {
        String id = ready.poll();
        visited++;
        for (String dependent : dependents.getOrDefault(id, List.of())) {
            if (pendingDeps.merge(dependent, -1, Integer::sum) == 0) {
                ready.add(dependent);
            }
        }
    }
    if (visited != steps.size()) {
        throw new IOException("计划中存在循环依赖");
    }
}
```

算法先统计每个步骤的入度（也就是它依赖几个前置步骤），存进 `pendingDeps`，同时用 `dependents` 记录每个步骤被哪些下游步骤依赖。然后把所有入度为 `0` 的步骤（没有任何依赖的步骤）放进队列 `ready`。每次从队列里取出一个步骤，`visited` 计数加 `1`，并把依赖它的下游步骤的入度减 `1`；某个下游步骤的入度一旦降到 `0`，就把它加入 `ready` 队列。

队列清空后，如果处理过的步骤数 `visited` 不等于总步骤数 `steps.size()`，说明有些步骤的入度永远降不到 `0`，也就是图里存在环。不管是一个步骤依赖它自己，还是两个步骤互相依赖，都会被检测出来。这时解析器判定计划不合法，流程随之终止。

![](https://cdn.paicoding.com/stutymore/paicli-multi-agent-plan-validation-20261109102216-beb7e5f7.png)

## 04、按依赖分批调度与 Worker 池化并发

计划通过校验后，`AgentOrchestrator` 开始执行。

编排器在构造时默认创建 `1` 个规划者、`2` 个执行者（`worker-1` 和 `worker-2`）和 `1` 个检查者。所有子 Agent 共用同一个模型客户端 `llmClient`、同一个工具注册表 `toolRegistry`，以及同一个会话记录 `conversationLedger`。会话记录只能在末尾追加，不能修改已经写入的内容。

```java
// src/main/java/com/paicli/agent/AgentOrchestrator.java
this.planner = new SubAgent("planner", AgentRole.PLANNER, llmClient, toolRegistry);
this.workers = List.of(
        new SubAgent("worker-1", AgentRole.WORKER, llmClient, toolRegistry),
        new SubAgent("worker-2", AgentRole.WORKER, llmClient, toolRegistry)
);
this.reviewer = new SubAgent("reviewer", AgentRole.REVIEWER, llmClient, toolRegistry);
```

进入执行阶段后，`runObserved` 开始 `while (true)` 循环，每一轮调用 `getExecutableSteps(steps)`，找出当前这一批可以开始执行的步骤。

一个步骤要现在就能执行，需要同时满足两个条件：

- 该步骤当前的状态是 `StepStatus.PENDING`（待执行）
- 它在 `dependencies` 里声明的所有前置步骤，状态全部是 `StepStatus.COMPLETED`（已完成并通过审查）

```java
// src/main/java/com/paicli/agent/AgentOrchestrator.java
List<ExecutionStep> getExecutableSteps(List<ExecutionStep> steps) {
    Map<String, StepStatus> statusMap = new HashMap<>();
    for (ExecutionStep step : steps) {
        statusMap.put(step.id(), step.status());
    }

    return steps.stream()
            .filter(step -> step.status() == StepStatus.PENDING)
            .filter(step -> step.dependencies().stream()
                    .allMatch(dep -> statusMap.get(dep) == StepStatus.COMPLETED))
            .toList();
}
```

如果 `getExecutableSteps` 返回了空列表，说明已经没有可以执行的步骤。要么所有步骤都执行完了，要么剩下的步骤所依赖的前置步骤失败或受阻。

这时循环结束。

![](https://cdn.paicoding.com/stutymore/paicli-multi-agent-dag-20261109102238-09c8e354.gif)

如果当前批次只有 `1` 个可执行步骤，编排器就按单步顺序执行。

用计数器 `singleStepCursor % workers.size()` 在 `worker-1` 和 `worker-2` 之间轮流选一个来执行，模型的流式输出直接打印到终端，用户能实时看到逐字输出的效果。

如果当前批次有多个互不依赖的步骤（`executable.size() > 1`），比如 `step_1` 是读取后端配置文件、`step_2` 是扫描前端目录结构，两者之间没有依赖关系，编排器就调用 `runBatchParallel`，用多个线程并行执行它们。

让多个 Sub-agent 在多个线程里同时执行，会遇到三个并发问题：

- 如果两个线程同时拿到了同一个 `worker-1` 实例，两个步骤的对话历史 `conversationHistory` 就混在了一起
- 如果多个并发步骤执行完后，同时交给同一个 `this.reviewer` 实例审查，检查者的 `conversationHistory` 同样会出现并发读写冲突；甚至可能出现一个线程刚把审查请求写进去，另一个线程审查完调用 `clearHistory()`，把前一个线程的上下文清空了
- 多个 Worker 同时向终端 `System.out` 流式打印思考过程和工具调用日志，屏幕上 `worker-1` 和 `worker-2` 的输出会交错在一起，很难阅读

下面来看 `runBatchParallel` 是怎么同时解决这三个问题的。

```java
// src/main/java/com/paicli/agent/AgentOrchestrator.java
private void runBatchParallel(List<ExecutionStep> batch, List<ExecutionStep> steps,
                              TurnToolPolicy turnToolPolicy,
                              Map<String, TurnToolPolicy.TrustedUrlContext> stepTrustedUrls,
                              TeamObservation observation, int batchOrdinal) {
    int parallelism = Math.min(batch.size(), workers.size());
    ExecutorService executor = Executors.newFixedThreadPool(parallelism, r -> {
        Thread t = new Thread(r, "paicli-multi-agent");
        t.setDaemon(true);
        return t;
    });
    BlockingQueue<SubAgent> workerPool = new LinkedBlockingQueue<>(workers);
    Map<String, ByteArrayOutputStream> buffers = new ConcurrentHashMap<>();
    List<Future<?>> futures = new ArrayList<>();

    for (ExecutionStep step : batch) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        buffers.put(step.id(), baos);
        PrintStream stepOut = new PrintStream(baos, true, StandardCharsets.UTF_8);
        // ... 准备 stepPolicy 与 context
        futures.add(executor.submit(() -> {
            SubAgent worker = null;
            SubAgent localReviewer = new SubAgent(
                    "reviewer-" + step.id(), AgentRole.REVIEWER, llmClient, toolRegistry);
            localReviewer.setExternalContextSupplier(externalContextSupplier);
            localReviewer.setConversationLedger(conversationLedger);
            try {
                worker = workerPool.take();
                runStep(step, steps, worker, localReviewer, context, stepOut,
                        stepPolicy, stepTrustedUrls, stepObservation);
            } finally {
                if (worker != null) {
                    worker.clearHistory();
                    workerPool.offer(worker);
                }
                stepOut.flush();
            }
            return null;
        }));
    }
    // 等待整批完成并按 step_id 顺序刷出缓冲
}
```

针对第一个问题，编排器把 `workers` 放进线程安全的阻塞队列 `LinkedBlockingQueue<SubAgent>`，作为一个简单的对象池。

每个并行任务启动后，先调用 `workerPool.take()` 从队列里取出一个空闲的 Worker。如果当前批次有 3 个并行步骤，而队列里只有 2 个 Worker，第 3 个步骤就会阻塞等待。某个步骤执行完后，会在 `finally` 块里先调用 `worker.clearHistory()` 清空对话历史，再调用 `workerPool.offer(worker)` 把实例放回队列，等待中的步骤这时才能取出它继续使用。这样，同一个 Worker 实例在同一时刻最多只会被一个线程使用。

针对第二个问题，并行执行时不再共用成员变量 `this.reviewer`，而是在每个并行任务内部单独创建一个局部的检查者实例 `new SubAgent("reviewer-" + step.id(), AgentRole.REVIEWER, ...)`，并为它设置相同的外部上下文和会话记录。每个步骤使用自己的检查者实例，审查过程互不影响。

针对第三个问题，编排器在提交线程任务之前，先为批次里的每个步骤创建一个独立的内存字节流 `ByteArrayOutputStream`，包装成 `PrintStream stepOut` 传给 `runStep`。并发执行期间，Worker 和 Reviewer 的流式输出都写进所属步骤的内存缓冲区，而不是直接写到终端。等 `futures` 列表里的所有任务都执行完毕，主线程再按 `batch` 里的步骤顺序遍历 `buffers`，把每个步骤的完整输出依次打印到终端 `out` 上。这样既保留了多线程并发的速度，用户在终端上看到的日志也是按 `step_1`、`step_2` 的顺序整齐排列的。

![](https://cdn.paicoding.com/stutymore/paicli-multi-agent-worker-pool-20261109102216-e9d21892.png)

## 05、执行者的上下文传递与任务交付

一个 Worker 分配到具体步骤后，内部是怎么完成这个步骤的？

打开 `SubAgent.executeObserved` 可以看到，每个 Worker 内部运行的都是一套完整的 ReAct 循环，并且复用了主 Agent 的全部安全保护机制和上下文管理功能：

- 每次迭代前检查取消信号 `CancellationContext.isCancelled()`，用户随时可以按 ESC 中断多 Agent 任务
- 每个步骤都有自己的 `AgentBudget` 和 `RunawayGuard`。当同一个工具调用或同一类错误连续出现 `3` 次时，`RunawayGuard` 会在当前 Worker 的对话里加入一条 `[runaway guard]` 提醒，要求模型换一种做法；如果连续 `5` 次的调用签名完全相同，触发了停滞检测，或者达到了配置的 Token 上限或轮数上限，就调用 `finalizePartialResult`，在不提供工具的情况下让模型做最后一次总结，并返回 `AgentMessage.Type.PARTIAL`
- 每次调用模型之前，先通过 `injectPendingLspDiagnostics` 把修改 Java 文件后产生的语法诊断信息加入对话，再调用 `AutoCompactionManager.compactIfNeeded`，在上下文过长时清理旧的工具结果，或者生成结构化摘要
- 所有工具调用都通过 `activeToolPolicy.execute` 执行，返回结果统一用 `ToolResultBoundary.wrap` 加上 `trust="untrusted-data"` 标签，标明这是不可信的数据；如果调用的是 `load_skill`，Skill 的正文也会在同一轮里紧跟在工具结果之后，加入当前 Worker 的对话历史

除了单个步骤内部的循环，多个步骤协作时还要解决上下游之间传递信息的问题。如果下一步要用到上一步查到的配置，或者上一步搜索到的网页地址，Worker 从哪里获取这些信息呢？

编排器通过 `buildStepContext` 和 `TurnToolPolicy`，沿着 DAG 中的依赖关系，把上游步骤的结果预览和可信网址传给下游步骤。

```java
// src/main/java/com/paicli/agent/AgentOrchestrator.java
private String buildStepContext(List<ExecutionStep> steps, ExecutionStep currentStep,
                                List<TurnToolPolicy.TrustedUrlContext> dependencyUrls) {
    StringBuilder context = new StringBuilder();
    context.append("总任务上下文：\n");

    for (ExecutionStep step : steps) {
        if (step.status() == StepStatus.COMPLETED && currentStep.dependencies().contains(step.id())) {
            context.append("已完成的依赖步骤 [").append(step.id()).append("]: ")
                    .append(step.description()).append("\n");
            if (step.result() != null && !step.result().isBlank()) {
                String preview = step.result().length() > 500
                        ? step.result().substring(0, 500) + "..."
                        : step.result();
                context.append("结果：").append(preview).append("\n");
            }
            context.append("\n");
        }
    }

    Set<String> trustedDependencyUrls = dependencyUrls.stream()
            .flatMap(contextItem -> contextItem.urls().stream())
            .collect(Collectors.toCollection(LinkedHashSet::new));
    if (!trustedDependencyUrls.isEmpty()) {
        context.append("依赖分支经 web_search 验证的 URL（可供当前步骤抓取/导航）：\n");
        trustedDependencyUrls.forEach(url -> context.append("- ").append(url).append("\n"));
        context.append("\n");
    }

    return context.toString();
}
```

拼接上下文时，`buildStepContext` 只选取两类条件都满足的上游步骤。

当前步骤在 `dependencies` 里明确声明依赖它，并且它的状态已经是 `COMPLETED`。这些上游步骤的描述和执行结果会被拼进“总任务上下文”。为了防止上游步骤读取了一个大文件、占满下游 Worker 的上下文窗口，每个上游结果超过 `500` 个字符时，只保留前 `500` 个字符，再加上省略号。

只传递文本还不够。如果上游步骤搜索到了几个网页，下游步骤要用 `web_fetch` 抓取这些网页，还涉及网址访问权限的传递。PaiCLI 的安全策略规定，`web_fetch` 和浏览器只能访问两类网址：用户本轮直接输入的网址，以及本次执行分支中 `web_search` 返回的结构化结果 `discoveredUrls`。为此，编排器维护了一张映射表 `stepTrustedUrls`。

只有当某个步骤通过检查者验收、编排器调用 `markStepCompleted` 时，才会把该步骤策略中的 `trustedUrlContext()` 存进这张映射表。下游步骤启动前，编排器通过 `dependencyTrustedUrls` 收集它所依赖的上游步骤留下的可信网址，再调用 `turnToolPolicy.forkWithTrustedUrls(dependencyUrls)` 复制出一份只属于当前步骤的策略，同时把这些网址列在 `buildStepContext` 生成的上下文末尾，告诉 Worker 可以访问。

这样一来，只有声明了依赖关系的下游步骤，才能访问上游步骤搜索到的网页；两个没有依赖关系的并行步骤，各自的策略互不影响。而且，上游输出的文字里即使出现了某个网址，这个网址也不会因此获得访问权限。这就防止了攻击者通过网页内容跨步骤进行提示词注入。

Worker 完成所有工具调用、准备向编排器提交结果时，如果允许它返回一段任意格式的自然语言，就会出现问题。当某个必需的输入文件不存在，或者某项操作被权限策略拦截时，Worker 会写一段“因为找不到 xxx 文件，所以无法继续”的说明，编排器却分不清这是正常的交付结果还是遇到了阻碍，仍然把它交给检查者审查。

所以最新源码引入了 `TeamWorkerReport`，要求执行者在最后一条回复里按结构化格式汇报状态。

```java
// src/main/java/com/paicli/agent/TeamWorkerReport.java
record TeamWorkerReport(String result, String blockedReason) {

    static TeamWorkerReport parse(String reply) throws IOException {
        JsonNode json = TeamStructuredReply.parseObject(reply);
        String result = textField(json, "result");
        String reason = textField(json, "reason");
        return switch (json.path("status").asText()) {
            case "completed" -> {
                if (result == null || result.isBlank() || reason != null && !reason.isBlank()) {
                    throw new IOException("completed 需要非空 result，不能同时报告阻塞原因");
                }
                yield new TeamWorkerReport(result, null);
            }
            case "blocked" -> {
                if (reason == null || reason.isBlank()) throw new IOException("blocked 需要说明 reason");
                yield new TeamWorkerReport(result, reason);
            }
            default -> throw new IOException("status 必须是 completed 或 blocked");
        };
    }
}
```

编排器拿到解析结果后，按状态分别处理：

- `completed` 状态：必须提供非空的 `result` 字符串，并且不能同时带有阻塞原因 `reason`；校验通过后，编排器把 `result` 交给检查者验收
- `blocked` 状态：必须提供非空的 `reason`，说明缺少什么输入或权限（已经完成的部分工作可以放在 `result` 里保留）；编排器收到后把该步骤标记为 `StepStatus.BLOCKED`，跳过审查，也不会进行没有意义的重试
- 状态非法或格式错误：如果回复无法解析成合法的 JSON，或者 `status` 既不是 `completed` 也不是 `blocked`，编排器会捕获 `IOException`，把该步骤标记为 `StepStatus.FAILED`，并立即结束这个步骤

![](https://cdn.paicoding.com/stutymore/paicli-multi-agent-worker-report-20261109102536-db117c98.png)

## 06、检查者的拒绝策略与反馈重试

执行者正常提交 `completed` 报告后，就轮到检查者 `Reviewer` 验收了。

编排器调用 `reviewer.review(step.description(), retainedResult, out, reviewCall)`，把这一步的任务描述和执行者提交的结果一起发给检查者，再把检查者返回的文本交给 `TeamReviewVerdict.parse` 解析。

如果检查者返回的文本格式不规范，比如没有按要求输出 JSON，而是写了一段评价，这时应该算通过还是不通过？

假设用关键词匹配来判断，规则是“包含‘通过’并且不包含‘不通过’就算通过”。当模型写出“虽然前置检查通过，但核心配置项依然缺失”这样的句子时，这句话包含“通过”、不包含“不通过”，就会被误判为通过。一个步骤被误判为通过后，所有依赖它的下游都会基于错误的结果继续执行。

因此，`TeamReviewVerdict` 采用了严格的默认拒绝（Fail-Closed）策略，只要审查结论不明确，就一律按不通过处理。

```java
// src/main/java/com/paicli/agent/TeamReviewVerdict.java
record TeamReviewVerdict(boolean approved, String feedback) {

    static final String DEFAULT_FEEDBACK = "审查未通过，请改进执行结果";

    static TeamReviewVerdict parse(String reviewContent) {
        JsonNode root;
        try {
            root = TeamStructuredReply.parseObject(reviewContent);
        } catch (IOException e) {
            return rejected("审查结论无法解析（" + e.getMessage() + "），按未通过处理");
        }
        JsonNode approvedNode = root.get("approved");
        if (approvedNode == null || !approvedNode.isBoolean()) {
            return rejected("审查结论缺少布尔类型的 approved 字段，按未通过处理");
        }
        return new TeamReviewVerdict(approvedNode.booleanValue(), feedbackOf(root));
    }
}
```

只有当检查者的回复是单个合法的 JSON 对象，并且其中的 `approved` 字段是布尔类型的 `true` 时，才算审查通过。空回复、JSON 语法错误、缺少 `approved` 字段，都按未通过处理；即使 `approved` 写成了字符串 `"true"` 或数字 `1`，`approvedNode.isBoolean()` 也会返回 `false`，同样按未通过处理。

![](https://cdn.paicoding.com/stutymore/paicli-multi-agent-verdict-20261109102536-0becad10.png)

判定为未通过时，`feedbackOf` 会按固定的优先级从 JSON 里提取退回原因：先把 `issues` 数组拼成问题列表；`issues` 为空时取 `suggestions` 数组；`suggestions` 也为空时取 `summary` 字段；这些都没有时，使用默认文案“审查未通过，请改进执行结果”。

得到反馈后，`runStepWithPolicy` 进入带反馈的重试循环。每个步骤最多重试 `MAX_RETRIES_PER_STEP = 2` 次，也就是首次执行之后，最多再重做 `2` 次。

```java
// src/main/java/com/paicli/agent/AgentOrchestrator.java
for (int attempt = 1; attempt <= 1 + MAX_RETRIES_PER_STEP; attempt++) {
    if (cancelStepIfRequested(step, steps, observation, out)) return;
    String workerContext = context;
    if (attempt > 1) {
        out.println("⚠️ 步骤 [" + step.id() + "] 重新执行，反馈：" + feedback);
        workerContext += "\n\n之前的执行结果被审查拒绝，原因：\n" + feedback;
    }
    ActivationObservation workerCall = observation == null ? null : observation.worker(worker, attempt);
    AgentMessage result = worker.executeWithContext(task, workerContext, out, stepPolicy, workerCall);
    // ... 校验 TeamWorkerReport 并调用 reviewer.review
    try {
        review = reviewer.review(step.description(), retainedResult, out, reviewCall);
    } finally {
        reviewer.clearHistory();
    }
    // ... 解析 TeamReviewVerdict，通过则 markStepCompleted 并 return
}
String reason = "重试 " + MAX_RETRIES_PER_STEP + " 次后仍未通过审查：" + feedback;
updateStep(steps, step.id(), step.withFailed(reason, retainedResult));
```

重试过程中，两个角色调用 `clearHistory()` 清空对话历史的时机并不相同。

每次 `reviewer.review` 调用结束后，紧跟着的 `finally` 块会立即执行 `reviewer.clearHistory()`，保证检查者每次验收都是独立判断，不受之前审查内容的影响。而 `worker.clearHistory()` 则放在外层的 `finally` 块里（位于 `runObserved` 或 `runBatchParallel` 中），等整个步骤执行结束后才调用。

也就是说，在同一个步骤的第 `2` 次、第 `3` 次执行期间，Worker 保留着之前几次尝试的完整对话历史。它既能看到自己上一次调用了哪些工具、改了哪几行代码，又能看到这一次新加入的不通过原因，可以在上一次的基础上直接修正问题，不用从头把所有文件再读一遍。

等这一步最终通过审查，或者重试 `2` 次后仍然没有通过，外层的 `finally` 块才会调用 `worker.clearHistory()`。保留 `conversationHistory.get(0)` 中的系统提示词，清空其余消息，并在 `ConversationLedger` 会话记录里写入一条 `history_clear` 事件，然后这个 Worker 才去处理下一个步骤。

```java
// src/main/java/com/paicli/agent/SubAgent.java
public void clearHistory() {
    autoCompactionManager.clear(conversationHistory);
    LlmClient.Message systemMsg = conversationHistory.get(0);
    conversationLedger.appendEvent(
            "history_clear",
            "team",
            name,
            "task_boundary",
            Map.of("discardedViewMessages", Math.max(0, conversationHistory.size() - 1)));
    conversationHistory.clear();
    conversationHistory.add(systemMsg);
    observationHistoryGeneration++;
}
```

![](https://cdn.paicoding.com/stutymore/paicli-multi-agent-retry-20261109102536-aa8285e9.gif)

如果检查者自身的模型调用出现异常（`review.type() != AgentMessage.Type.RESULT`），或者 Worker 重试 `2` 次后仍未通过审查，编排器都不会把可能有问题的结果标记为 `COMPLETED`，而是把已有的结果保存在 `retainedResult` 中供用户查看，同时把当前步骤的状态更新为 `StepStatus.FAILED`。

某个步骤一旦处于 `FAILED` 或 `BLOCKED` 状态，外层里的 `getExecutableSteps` 就不会再选出依赖它的下游步骤，但不影响其他不相关的步骤继续执行。主循环退出后，编排器遍历所有仍处于 `PENDING` 状态的步骤，逐个打印跳过提示。

```java
// src/main/java/com/paicli/agent/AgentOrchestrator.java
for (ExecutionStep step : steps) {
    if (step.status() == StepStatus.PENDING) {
        observation.blocked(step);
        out.println("⏭️ 步骤 [" + step.id() + "] 因前置步骤未完成被跳过: " + step.description());
    }
}
```

## 07、跑起来看看

编译打包代码，启动 PaiCLI，实际测试一下 `/team` 模式下的多角色协作。

```bash
mvn clean package
java -jar target/paicli-1.0-SNAPSHOT.jar
```

在命令行里，可以先单独输入 `/team` 切换模式，再输入任务描述；也可以直接在 `/team` 后面写上任务内容，用一条命令启动协作。

```text
👤 你: /team 创建一个 Spring Boot 项目，写一个 HelloController，然后验证项目结构
```

![](https://cdn.paicoding.com/paicoding/2b332fc673ae441984874893e0d77e1c.jpg)

终端会依次打印规划阶段和执行阶段的完整过程。

```text
📋 第一阶段：规划
🧑‍💼 规划者正在分析任务...

📋 执行计划
  ⏳ [step_1] 创建 Spring Boot 项目基础结构，包括目录和 pom.xml 配置文件 (依赖: 无)
  ⏳ [step_2] 创建 Spring Boot 主启动类 DemoApplication.java (依赖: step_1)
  ⏳ [step_3] 创建 HelloController.java，实现返回 'Hello, Spring Boot!' 的接口 (依赖: step_1)
  ⏳ [step_4] 验证项目结构是否完整，并执行编译命令确保无语法错误 (依赖: step_2, step_3)

⚡ 第二阶段：执行
🛠️ worker-1 执行步骤 [step_1]: 创建 Spring Boot 项目基础结构，包括目录和 pom.xml 配置文件
🔍 reviewer 正在审查步骤 [step_1] 的结果...
✅ 步骤 [step_1] 审查通过
🛠️ worker-2 执行步骤 [step_2]: 创建 Spring Boot 主启动类 DemoApplication.java
🔍 reviewer 正在审查步骤 [step_2] 的结果...
✅ 步骤 [step_2] 审查通过
🛠️ worker-1 执行步骤 [step_3]: 创建 HelloController.java，实现返回 'Hello, Spring Boot!' 的接口
🔍 reviewer 正在审查步骤 [step_3] 的结果...
✅ 步骤 [step_3] 审查通过
🛠️ worker-2 执行步骤 [step_4]: 验证项目结构是否完整，并执行编译命令确保无语法错误
🔍 reviewer 正在审查步骤 [step_4] 的结果...
✅ 步骤 [step_4] 审查通过
```

![](https://cdn.paicoding.com/paicoding/67bc74b702847d2a00febfc89c8a0bc4.jpg)

![](https://cdn.paicoding.com/paicoding/0fa494814207e1c9d78b44ac48df2968.jpg)

![](https://cdn.paicoding.com/paicoding/eeee47f81292aac089b4c57631275daf.png)

可以看到，规划者先把需求拆成四个步骤，并标明了步骤之间的依赖关系；接着 `worker-1` 和 `worker-2` 按依赖顺序分批领取步骤，调用工具完成任务，每完成一步都交给检查者独立验收。

![](https://cdn.paicoding.com/paicoding/63f44a7feaf8685ed9842deabc6ae637.jpg)

![](https://cdn.paicoding.com/paicoding/3985913a13cb50d0c8e28561937051df.jpg)

所有步骤执行完毕后，`buildFinalResult` 会生成一份简短的汇总。由于每个步骤的详细输出在执行阶段已经打印过，汇总时只截取每个步骤 `result` 的前 `120` 个字符作为预览，并用四种图标标明状态：`✅`（已完成）、`❌`（失败，附上保留的结果和失败原因）、`⛔`（受阻，附上缺少的条件）和 `⏭️`（前置步骤未完成，因此被跳过）。

在整个协作过程中，编排器和各个 Sub-agent 收发的每条消息、每次工具调用、每次上下文压缩和清空历史的事件，都会标记为 `mode="team"`，并带上各自的实例名（如 `planner`、`worker-1`、`reviewer-step_2`），追加写入会话记录 `~/.paicli/history/raw/<session>.jsonl`。如果所有步骤都是 `COMPLETED` 状态，并且任务没有被取消，编排器在最后还会调用 `memoryManager.extractFactsFromUserTurn`，从用户本轮的输入中自动提取需要长期记住的信息。

一次 `/team` 任务执行完后，会话会自动回到默认的 ReAct 模式，不需要手动切换。

![](https://cdn.paicoding.com/paicoding/aa8f91f2ba8399fec220183264cff8d4.png)

我们还为这套主从协作机制编写了单元测试和评测审计测试，覆盖拓扑校验、15 种格式错误计划的拦截、两个 Worker 是否真正并发执行、默认拒绝审查、受阻步骤不影响其他分支，以及可信网址沿 DAG 依赖传递等场景。用下面的命令可以一次运行全部测试。

```bash
mvn test -Dtest=AgentRoleTest,AgentMessageTest,SubAgentTest,TeamPlanParserTest,TeamReviewVerdictTest,AgentOrchestratorTest,TeamExecutionObservationTest,TeamRequestAuditTest -DskipTests=false
```

到这里，PaiCLI 的三种核心执行模式就全部实现了。它们共用同一套 `ToolRegistry`、`MemoryManager`、`SnapshotService` 和 `ConversationLedger` 基础组件，适用于不同复杂度的任务：

- 默认 ReAct 模式：适合需要边查边做的日常问答、代码定位和小范围修改
- `/plan`（Plan-and-Execute 模式）：适合步骤较多、需要用户先审阅和修改计划，再按 DAG 依次执行的任务
- `/team`（Multi-Agent 模式）：适合跨多个模块、要求执行和验收严格分开、每一步都需要独立审查的复杂工程任务

下一期我们将接入 HITL（Human-in-the-Loop）人工确认和安全策略，为 Agent 执行高危命令和文件操作增加多层安全防护。

## PaiCLI 如何写到简历上？

**项目名称**：PaiCLI（Java 终端 Coding Agent，第 5 期）

**项目简介**：设计并实现基于主从架构的 Multi-Agent 与 Sub-agent 并发调度引擎，支持 Planner、Worker、Reviewer 三个角色的权限隔离、按 DAG 依赖分批执行、结构化交付。

**技术栈**：Java 17、Jackson、ExecutorService、LinkedBlockingQueue、Kahn、ByteArrayOutputStream、Prefix Caching

**核心职责**：

- 基于主从编排模式实现 `/team` 多 Agent 协作引擎，划分规划者、执行者、检查者 3 类 Sub-agent 角色；仅向 Worker 提供 Tool Schema。并将固定角色指令放在提示词前面的部分，便于多轮执行时复用相同前缀。
- 基于 Jackson 严格模式（开启重复键检测和尾随内容报错）与 Kahn 拓扑排序实现任务图校验，拦截未知依赖和循环依赖，单元测试覆盖 15 类格式错误的计划，避免非法依赖导致下游步骤永远等待。
- 基于 `ExecutorService + LinkedBlockingQueue` 实现 Worker 池化并发调度，并行批次为每个步骤分配独立的 Reviewer 实例和 `ByteArrayOutputStream` 缓冲区，执行结束后按步骤顺序输出，解决对话历史并发混用和终端输出交错的问题。
- 基于 DAG 依赖关系实现跨步骤的上下文和可信网址传递，向下游注入上游已完成步骤结果的前 500 字符，并为每个步骤复制独立的网址授权策略；通过结构化 JSON 交付协议区分已完成（`completed`）和受阻（`blocked`），受阻时跳过依赖它的下游步骤。
- 基于默认拒绝（Fail-Closed）原则实现独立审查与重试机制，只有合法 JSON 中的布尔值 `approved: true` 才算通过；不通过时按优先级提取问题列表加入 Worker 上下文，保留对话历史最多重试 2 次，重试用完后保留已有结果，并阻止依赖它的下游步骤执行。
