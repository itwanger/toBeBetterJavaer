---
title: 手搓 Java 终端 Agent 第 5 期，主从 Multi-Agent 编排、Sub-agent 池化并发与闭合失败审查
shortTitle: Java Multi-Agent 协作与并发
description: PaiCLI 第 5 期，基于最新源码拆解 Multi-Agent 与 Sub-agent 并发协作实现，涵盖主从三角色分工、无工具角色权限隔离、Kahn 拓扑计划校验、BlockingQueue 执行池并发与防交错缓冲、结构化交付协议以及闭合失败审查重试。
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

前四期我们给 PaiCLI 搭好了 ReAct 循环、Plan-and-Execute 调度、三级上下文记忆和本地 RAG 代码检索。现在的单 Agent 已经能看懂项目结构、定位源码行号、动手改代码并跑命令验证了。

但只要把一个跨模块的大任务交给同一个 Agent 独立跑完，很容易遇到两个棘手的问题。

第一个问题是角色串味。同一个模型既要拆解全局计划，又要盯着单步工具报错改代码，经常在规划阶段就一头扎进某个文件的细节里，写出来的计划顾头不顾尾。

第二个问题是自己审自己的代码容易放水。模型刚顺着自己的思路写完一段逻辑，紧接着让它在同一个上下文里检查有没有漏洞，它往往顺着刚才的假设往下看，把只完成了一半或者缺了边界校验的结果当成合格交付。

解决这两个问题的工程做法是拆分角色，引入主从结构的 Multi-Agent 协作。我们把原本大包大揽的单 Agent 拆分为规划者（Planner）、执行者（Worker）和检查者（Reviewer）三类子 Agent（Sub-agent），由编排器统一调度，规划者不碰工具只管拆解任务图，多个执行者从池子里领任务并行干活，检查者用独立的干净上下文逐一验收，不合格就退回重做。

![](https://cdn.paicoding.com/stutymore/paicli-multi-agent-wanger-01-20261108090159-9e5ff98d.jpg)

这一期我们对照 PaiCLI 的最新源码，把这套 Multi-Agent 与 Sub-agent 并发协作的机制从头到尾讲清楚：

- 为什么选主从编排架构，三类角色和七种通信消息怎么配合；
- 怎么隔离三类 Sub-agent 的工具权限，按变化频率组装角色提示词；
- 规划阶段怎么剥离代码块围栏，用拓扑排序拦截未知依赖和循环依赖；
- 执行阶段怎么用阻塞队列池化 Worker 并行干活，并用独立内存缓冲防止终端输出乱序；
- Worker 怎么传递上下文与已授权网址，Reviewer 怎么执行闭合失败（Fail-Closed）审查与带反馈重试。

## 01、为什么需要主从架构与三角色分工

市面上的 Multi-Agent 协作大致分两条路线。

一条是像微软 AutoGen（57.3K Star）那样的对等对话路线，多个 Agent 围绕同一个议题互相发消息协商，适合开放式头脑风暴。另一条是像 CrewAI（49.5K Star）那样的主从委派路线，先明确定义每个角色的职责边界，再按固定流程分发任务和验收结果。

![](https://cdn.paicoding.com/paicoding/3e1ab7812e7a2ea7a5dd956880405a59.jpg)

如果让终端里的多个子 Agent 自由点对点对话，调用链很容易演变成网状结构，不仅难以预测还要消耗多少轮 Token，出现死循环时也不好排查。

PaiCLI 选择了主从架构（Orchestrator-SubAgent）。编排器 `AgentOrchestrator` 是唯一的指挥中心，各个 `SubAgent` 只对编排器负责。子 Agent 之间不发生点对点通信，所有的任务下发、结果收集、审查打回和依赖流转都由编排器集中路由。

![](https://cdn.paicoding.com/stutymore/paicli-multi-agent-wanger-02-20261108090200-da3b930d.jpg)

在这个主从结构下，`AgentRole` 枚举定义了三类专职角色：

- `PLANNER`（规划者）：接收用户的原始需求，将其拆解为带类型和依赖关系的步骤列表，只输出结构化计划，不执行任何具体操作
- `WORKER`（执行者）：接收单个步骤描述与前置依赖上下文，调用文件读写、代码检索和终端命令等工具完成实操，按约定格式汇报交付状态
- `REVIEWER`（检查者）：对照步骤原始要求与执行者提交的产出独立验收，通过则放行下游步骤，不通过则给出具体问题列表打回重做

```java
// src/main/java/com/paicli/agent/AgentRole.java
public enum AgentRole {
    PLANNER("规划者", "负责分析用户任务，制定执行计划，将复杂任务拆解为可执行的子任务"),
    WORKER("执行者", "负责执行具体任务步骤，调用工具完成文件操作、命令执行等操作"),
    REVIEWER("检查者", "负责检查执行结果的质量和正确性，提供改进建议");
}
```

编排器与三类子 Agent 之间交互的数据载体是 `AgentMessage`，用 Java 17 的 `record` 定义，包含发送方名称 `fromAgent`、发送方角色 `fromRole`、消息正文 `content` 和消息类型 `type`。

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

这里的 `Type` 枚举覆盖了协作全流程的七种状态。`TASK` 是编排器派发给子 Agent 的任务指令，`RESULT` 是子 Agent 正常完成后的输出，`PARTIAL` 表示执行者在预算或轮数耗尽时收尾保留的部分产出，`FEEDBACK`、`APPROVAL` 和 `REJECTION` 用于承载审查阶段的反馈与结论，`ERROR` 则代表模型调用失败或违规调用工具等错误。

![](https://cdn.paicoding.com/stutymore/paicli-multi-agent-wanger-03-20261108090200-a32be9e9.jpg)

围绕这套主从模型，`agent/` 包下的八个核心类分工如下：

- `AgentRole`：定义规划者、执行者、检查者三类角色枚举
- `AgentMessage`：封装主从通信的不可变消息对象与七种状态类型
- `SubAgent`：子 Agent 实例，维护独立的角色提示词、对话历史与上下文压缩器，共享底层工具注册表和模型客户端
- `AgentOrchestrator`：主控编排器，串联规划、DAG 分批并发执行、审查重试与结果汇总
- `TeamStructuredReply`：三类角色最终回复的严格 JSON 读取器，负责剥离外层代码块围栏并拦截重复键与尾随文本
- `TeamPlanParser`：校验规划者输出的 JSON 计划，执行步骤重编号、未知依赖拦截与 Kahn 拓扑排序环检测
- `TeamWorkerReport`：解析执行者的结构化交付报告，区分已完成（`completed`）与受阻（`blocked`）
- `TeamReviewVerdict`：解析检查者的审查结论，执行闭合失败判定并按优先级提取打回原因

## 02、三类 Sub-agent 的工具边界与提示词组装

虽然规划者、执行者和检查者都是 `SubAgent` 类的实例，但它们在工具使用权限和系统提示词上有着严格的隔离。

在 `SubAgent.shouldUseTools` 中，只有角色为 `WORKER` 的实例才会返回 `true`。

```java
// src/main/java/com/paicli/agent/SubAgent.java
private boolean shouldUseTools() {
    return role == AgentRole.WORKER;
}
```

当 `SubAgent` 向大模型发起请求时，会先根据 `shouldUseTools()` 判断要不要挂载工具定义。对于 `PLANNER` 和 `REVIEWER`，传给 `llmClient.chat` 的工具列表是 `null`。

如果允许规划者在制定计划阶段顺手调用 `read_file` 或 `execute_command`，它一旦开始自己读文件跑命令，就会退化成边做边拆的混合角色，丧失全局视角；同样，检查者如果能调用写文件工具，就可能越俎代庖去替执行者改代码。此外，评测审计（`TeamRequestAudit`）也要求规划与审查请求在协议层不能暴露任何工具 Schema。

万一底层模型不守规矩，在没有挂载工具的情况下依然在响应里硬塞了 `tool_calls`，或者在正文里残留了类似 `<｜DSML｜function_calls>` 的未执行工具调用标签，怎么处理？

`SubAgent` 在响应返回后做了拦截。只要检测到 `!shouldUseTools() && response.hasToolCalls()`，立刻终止当前调用，向终端打印“本角色不提供工具，工具调用未执行”，并返回 `AgentMessage.error` 让编排器按失败处理；对于正文里残留的未执行工具标签，则通过 `llmClient.looksLikeUnexecutedToolCall` 识别并提示用户，随后由 JSON 解析器拒绝这团非结构化文本。

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

工具边界划清之后，还要通过系统提示词给每个角色立规矩。`SubAgent.getSystemPrompt` 不会把提示词硬编码在 Java 字符串里，而是根据当前角色映射到 `PromptMode` 中的 `TEAM_PLANNER`、`TEAM_WORKER` 或 `TEAM_REVIEWER`，统一交给 `PromptAssembler.assemble` 组装。

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

`PromptAssembler` 在拼接提示词时，如果发现当前角色的 `toolsEnabled` 为 `false`，会先调用 `stripToolSections` 把基础提示词 `base.md` 里的 `## Tools` 和 `## Tool Policy` 两节删掉，再紧接着补上一节 `## Tool Availability`，明确告知规划者“把需要读取文件、执行命令等操作写成计划步骤，交给执行者”，告知检查者“根据收到的任务与执行结果进行审查，证据不足时在 issues 中说明”。

整份系统提示词按照内容变化频率从低到高排列：

- 最前面是会话期间固定不变的 `base.md`、性格设定 `calm.md`、角色模式文件（`team-planner.md` / `team-worker.md` / `team-reviewer.md`）、审批规则、上下文管理说明和输出格式说明
- 往后是仅向 Worker 注入的 `## Skills` 索引，只在启停 Skill 时变化
- 再往后是按天变化的 `## Runtime Context`（当前日期与时区）
- 最后是 `## Project Context`，依次放入项目的 `PAI.md` 规范、相关长期记忆与 MCP 资源索引

这种把静态规则放开头、动态上下文放末尾的排布方式，能让同一个 Sub-agent 在多轮工具调用或多次重试时，前面一大段提示词字节保持一致，稳定命中大模型服务端的前缀缓存（Prefix Caching）。

![](https://cdn.paicoding.com/stutymore/paicli-multi-agent-wanger-04-20261108090201-9dc8153b.jpg)

三份角色模式文件各自规定了严密的输出契约。

`prompts/modes/team-planner.md` 要求规划者只输出一个包含 `summary` 和 `steps` 数组的 JSON 对象，简单任务拆 `1` 到 `3` 步，复杂任务拆 `5` 到 `10` 步。遇到可以独立完成的步骤时，保持 `dependencies` 为空，方便编排器并行分给多个 Worker；同时把用户限定的工具、交付结果和验收条件写进相关步骤描述里。

`prompts/modes/team-worker.md` 规定执行者查代码时优先使用 `glob_files`、`grep_code` 和 `read_file` 现用现查，语义模糊时才用 `search_code`。完成工具调用后，给编排器的最后一条回复必须是单个 JSON 对象，交付成功返回 `completed`，缺少必要条件返回 `blocked`。

`prompts/modes/team-reviewer.md` 则要求检查者按步骤要求的交付物逐项核对，只输出包含布尔值 `approved`、`summary`、`issues` 和 `suggestions` 的 JSON 对象。

## 03、规划阶段的严格 JSON 解析与 DAG 校验

规划者返回一段文本后，编排器不能拿正则表达式随便抠一个 JSON 出来就往下跑。

在实际调用中，大模型返回的结构化内容经常在 JSON 外面套一层 Markdown 代码块围栏，或者在闭合大括号后面顺手加两句解释文字；更麻烦的是在计划里写出重复的步骤 ID、引用根本不存在的前置步骤，甚至写出 `step_1` 依赖 `step_2`、`step_2` 又依赖 `step_1` 的循环依赖。

如果解析器对未知依赖睁一只眼闭一只眼，保留了一条指向不存在步骤的依赖边，后面执行阶段检查前置步骤是否完成时，这个步骤就会永远处于等待状态，导致整个工作流卡死。

为了把这些问题拦在执行之前，PaiCLI 先用 `TeamStructuredReply.parseObject` 做严格的 JSON 语法解析，再用 `TeamPlanParser.parse` 校验任务图的拓扑结构。

`TeamStructuredReply` 内部维护了一个开启了严格校验开关的 Jackson `ObjectMapper`：

- 开启 `STRICT_DUPLICATE_DETECTION`，只要 JSON 对象里出现同名重复键（比如两个 `"approved"` 字段），立刻抛异常拒绝
- 开启 `FAIL_ON_TRAILING_TOKENS`，JSON 闭合大括号后面只要跟着任何多余的解释文字，立刻报错
- 调用 `unwrapWholeFence` 处理代码块围栏，只有当整段回复从头到尾被单个无标记或 `json` 标记的 Markdown 围栏包裹时，才剥掉最外层围栏；如果步骤描述字符串内部包含 `bash` 等代码片段，则原样保留，绝不破坏内部内容

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

拿到干净的 `JsonNode` 后，`TeamPlanParser.parse` 接手校验任务图（DAG，有向无环图）的合法性。

它先读取 `steps` 数组（兼容读取 `tasks` 字段），如果数组为空就抛异常。接着遍历每个步骤节点，检查 `id` 必须是非空字符串，并按出现顺序统一重编号为 `step_1`、`step_2` 直到 `step_N`，放进 `idMapping` 映射表。遇到重复的原始 `id` 时，`idMapping.putIfAbsent` 返回非空，立刻报错拒绝。

接着解析每个步骤的 `dependencies` 数组。解析器拿着每个依赖项去 `idMapping` 里查对应的重编号 ID，只要查不到（`mapped == null`），说明模型引用了一个未声明的步骤 ID，立即抛出 `IOException("计划依赖必须引用已声明的步骤 id: ...")`，绝不静默丢弃或猜测别名。

最后一步是调用 `requireAcyclic` 做环检测，用的是经典的 Kahn 拓扑排序算法。

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

算法先统计每个步骤的入度（也就是它依赖多少个前置步骤），放进 `pendingDeps`，同时用 `dependents` 记录每个步骤被哪些下游步骤依赖。先把所有入度为 `0` 的无依赖步骤放进队列 `ready`，每次从队列里取出一个步骤，`visited` 计数加 `1`，并把依赖它的下游步骤入度减 `1`；一旦某个下游步骤的入度降到 `0`，就加入 `ready` 队列。

队列清空后，如果访问过的节点数 `visited` 不等于总步骤数 `steps.size()`，说明图里存在入度永远降不到 `0` 的环（无论是自己依赖自己的自环，还是两步互相依赖的互环），立即判定计划不合法并终止流程。

![](https://cdn.paicoding.com/stutymore/paicli-multi-agent-wanger-05-20261108090202-a4f4a900.jpg)

## 04、按依赖分批调度与 Worker 池化并发

计划通过拓扑校验后，就交由 `AgentOrchestrator` 启动执行循环。

编排器在构造时默认初始化 `1` 个规划者、`2` 个执行者（`worker-1` 和 `worker-2`）以及 `1` 个检查者。所有子 Agent 共享同一个模型客户端 `llmClient`、工具注册表 `toolRegistry` 和只追加会话账本 `conversationLedger`。

```java
// src/main/java/com/paicli/agent/AgentOrchestrator.java
this.planner = new SubAgent("planner", AgentRole.PLANNER, llmClient, toolRegistry);
this.workers = List.of(
        new SubAgent("worker-1", AgentRole.WORKER, llmClient, toolRegistry),
        new SubAgent("worker-2", AgentRole.WORKER, llmClient, toolRegistry)
);
this.reviewer = new SubAgent("reviewer", AgentRole.REVIEWER, llmClient, toolRegistry);
```

进入执行阶段后，`runObserved` 开启一个 `while (true)` 循环，每轮调用 `getExecutableSteps(steps)` 找出当前这一批可以启动的步骤。

怎么判断一个步骤现在能不能跑？同时满足两个条件即可：

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

如果 `getExecutableSteps` 返回空列表，说明所有能跑的步骤都跑完了，循环结束。

![](https://cdn.paicoding.com/stutymore/paicli-multi-agent-wanger-06-20261108090202-21563303.jpg)

如果当前批次只有 `1` 个可执行步骤，编排器就走单步串行路径，用轮询游标 `singleStepCursor % workers.size()` 在 `worker-1` 和 `worker-2` 之间轮流挑一个执行，流式输出实时打印到终端 `out` 上，保持流畅的打字机观感。

如果当前批次筛出了多个互不依赖的步骤（`executable.size() > 1`），比如 `step_1` 是读取后端配置文件、`step_2` 是扫描前端目录结构，两边没有任何依赖关系，编排器就调用 `runBatchParallel` 让它们多线程并行执行。

把多个 Sub-agent 放到多线程里并发跑，立刻会碰上三个并发工程问题：

- 两个线程如果同时抢到同一个 `worker-1` 实例，它们的对话历史 `conversationHistory` 就会混在一起
- 并发步骤跑完后如果同时找同一个 `this.reviewer` 实例做审查，检查者的 `conversationHistory` 同样会发生并发读写冲突，甚至一个线程刚把审查请求放进去，另一个线程审完调 `clearHistory()` 把它的上下文给清空了
- 多个 Worker 同时往终端 `System.out` 流式打印思考过程和工具调用日志，屏幕上的文字会一行 `worker-1`、一行 `worker-2` 地交错穿插，根本没法看

我们来看看 `runBatchParallel` 是怎么一次性解决这三个问题的。

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

针对第一个问题，我们把 `workers` 放进一个线程安全的阻塞队列 `LinkedBlockingQueue<SubAgent>`，做成一个简易对象池。每个并行任务启动后，先调 `workerPool.take()` 租借一个空闲的 Worker；如果当前批次有 3 个并行步骤而池子里只有 2 个 Worker，第 3 个步骤就会在队列上阻塞等待；等某个步骤在 `finally` 块里调完 `worker.clearHistory()` 清空对话历史，再调 `workerPool.offer(worker)` 把实例归还入池，下一个步骤才能拿走复用。这样同一个 Worker 实例在同一时刻最多只会被一个线程持有。

针对第二个问题，并行路径不去争抢成员变量 `this.reviewer`，而是在每个并行任务内部单独创建一个局部的检查者实例 `new SubAgent("reviewer-" + step.id(), AgentRole.REVIEWER, ...)`，绑定相同的外部上下文提供器和会话账本。每个步骤独享自己的检查者实例，审查过程互不干扰。

针对第三个问题，编排器在提交线程任务前，先为批次里的每个步骤分配一个独立的内存字节流 `ByteArrayOutputStream`，包装成 `PrintStream stepOut` 传给 `runStep`。并发执行期间，各个 Worker 和 Reviewer 的流式输出都写进各自步骤的内存缓冲区里。等 `futures` 列表里的所有任务都执行完毕后，主线程再按 `batch` 里的 `step_id` 顺序遍历 `buffers`，把每个步骤的完整输出一次性刷到终端 `out` 上。这样既拿到了多线程并发的速度，用户在终端上看到的日志又是按 `step_1`、`step_2` 整整齐齐排列的。

![](https://cdn.paicoding.com/stutymore/paicli-multi-agent-wanger-07-20261108090203-921b9896.jpg)

## 05、执行者的内部循环、上下文传递与交付协议

当某个 Worker 领到一个具体步骤后，它在内部是怎么把这个步骤跑完的？

打开 `SubAgent.executeObserved` 可以看到，每个 Worker 内部运行的是一套完整的 ReAct 循环，并且复用了主 Agent 的全套安全阀与上下文管理基础设施：

- 每次迭代前检查取消信号 `CancellationContext.isCancelled()`，支持用户随时按 ESC 中断多 Agent 任务
- 每个步骤独立持有 `AgentBudget` 和 `RunawayGuard`。当同一个工具调用或同一类错误连续出现 `3` 步时，`RunawayGuard` 会往当前 Worker 的对话里注入一条 `[runaway guard]` 提醒换思路；如果连续 `5` 步调用签名一模一样触发停滞检测，或者达到了显式配置的 Token 与轮数上限，就调用 `finalizePartialResult` 关掉工具做一次收尾整理，返回 `AgentMessage.Type.PARTIAL`
- 每次调用模型前，先通过 `injectPendingLspDiagnostics` 把修改 Java 文件后产生的语法诊断信息注入对话，再调用 `AutoCompactionManager.compactIfNeeded` 按需执行旧工具结果清理或生成结构化摘要
- 工具调用统一走 `activeToolPolicy.execute`，返回结果全部用 `ToolResultBoundary.wrap` 包上 `trust="untrusted-data"` 不可信数据标签；如果调用了 `load_skill`，Skill 正文也会在同一轮紧跟工具结果注入当前 Worker 的对话历史

除了单步内部的循环，多步协作还需要解决上下游怎么交接信息的问题。如果下一步需要用到上一步查出来的配置或者搜索到的网页地址，Worker 从哪拿？

编排器通过 `buildStepContext` 和 `TurnToolPolicy` 沿着 DAG 依赖边向后传递结果预览与可信网址。

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

在拼接文本上下文时，`buildStepContext` 只挑出当前步骤在 `dependencies` 里显式声明、且状态已经是 `COMPLETED` 的上游步骤，把它们的步骤描述和执行结果拼进“总任务上下文”。为了防止上游步骤读了一个大文件把下游 Worker 的上下文窗口撑满，每个上游结果超过 `500` 个字符时，只截取前 `500` 个字符加省略号。

光传文本还不够，如果上游步骤搜出了几个网页，下游步骤要用 `web_fetch` 抓取，还会遇到网址访问权限的传递问题。PaiCLI 的安全策略规定，`web_fetch` 和浏览器只能访问用户本轮亲手输入的网址，或者本次执行分支里 `web_search` 返回的结构化结果 `discoveredUrls`。为此，编排器维护了一张 `stepTrustedUrls` 映射表。

当某个步骤通过检查者验收并调用 `markStepCompleted` 时，编排器才会把该步骤策略里的 `trustedUrlContext()` 存进映射表。下游步骤启动前，通过 `dependencyTrustedUrls` 收集它所依赖的上游步骤留下的可信网址，再调用 `turnToolPolicy.forkWithTrustedUrls(dependencyUrls)` 派生出当前步骤专属的策略副本，同时把这些网址列在 `buildStepContext` 末尾告诉 Worker。

这样一来，只有声明了 DAG 依赖的下游步骤，才能合法抓取上游搜出来的网页；两个没有依赖关系的并行步骤之间策略相互隔离，而且上游输出的文字内容本身不能产生新的网址授权，防住了跨步骤的提示词注入。

当 Worker 跑完工具循环、准备向编排器交差时，如果任由它返回一段自由格式的自然语言，就会出现一个麻烦，当某个必需的输入文件根本不存在，或者某项操作被权限策略拦住时，Worker 写了一段“因为找不到 xxx 文件，所以我没法继续”的说明文字，编排器却分不清这是正常交付的产出还是遇到了阻碍，照样把它送给检查者去审。

所以最新源码引入了 `TeamWorkerReport`，强制执行者在最后一条回复里按结构化协议汇报状态。

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

编排器拿到解析结果后按状态分流：

- `completed` 状态：必须提供非空的 `result` 字符串，且不能同时带有 `reason` 阻塞原因，通过后把 `result` 送交检查者验收
- `blocked` 状态：必须提供非空的 `reason` 说明缺少什么输入或权限（已做的部分工作可放在 `result` 里保留），编排器收到后将该步骤标记为 `StepStatus.BLOCKED`，跳过审查，也不触发无意义的重试
- 非法状态或格式错误：回复无法解析成合法 JSON，或者 `status` 既不是 `completed` 也不是 `blocked` 时，编排器捕获 `IOException`，将该步骤标记为 `StepStatus.FAILED` 并立即终止该步骤

![](https://cdn.paicoding.com/stutymore/paicli-multi-agent-wanger-08-20261108090204-5b6ff699.jpg)

## 06、检查者的闭合失败判定与带反馈重试

当执行者正常提交了 `completed` 报告后，就轮到检查者 `Reviewer` 把关了。

编排器调用 `reviewer.review(step.description(), retainedResult, out, reviewCall)`，把这一步的原始任务描述和执行者提交的产出一起发给检查者，然后把检查者返回的文本交给 `TeamReviewVerdict.parse` 解析。

当检查者返回的文本格式不规范（比如没按要求输出 JSON，而是写了一段自然语言评价）时，应该算通过还是算不通过？

如果用“包含‘通过’且不含‘不通过’”这类关键词匹配做兜底，模型一旦写出“虽然前置检查通过，但核心配置项依然缺失”这样的句子，关键词匹配或者松散判断就很容易误判放行。一步错放过去，依赖它的所有下游步骤都会基于错误产物继续往下跑。

因此，`TeamReviewVerdict` 采用了严格的闭合失败（Fail-Closed）策略。

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

只有当检查者的回复是单个合法的 JSON 对象，并且其中的 `approved` 字段是 JSON 布尔类型的 `true` 时，才算审查通过。空回复、自然语言段落、JSON 语法错误、缺少 `approved` 字段，哪怕是把布尔值写成了字符串 `"true"` 或数字 `1`，`approvedNode.isBoolean()` 都会返回 `false`，一律按未通过处理。

![](https://cdn.paicoding.com/stutymore/paicli-multi-agent-wanger-09-20261108090205-0f76c85c.jpg)

判定为未通过时，`feedbackOf` 会按固定优先级从 JSON 里提取打回原因，先取 `issues` 数组拼成列表，如果 `issues` 为空再取 `suggestions` 数组，还没有就取 `summary` 字段，全都拿不到则使用默认文案“审查未通过，请改进执行结果”。

拿到反馈后，`runStepWithPolicy` 启动带反馈重试循环，单步最多重试 `MAX_RETRIES_PER_STEP = 2` 次（即首次执行加最多 `2` 次重做）。

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

`reviewer.review` 每次调用结束后，都会在紧跟着的 `finally` 块里立刻执行 `reviewer.clearHistory()`，确保检查者每次验收都是不带历史包袱的独立判断。而 `worker.clearHistory()` 则放在整个步骤执行结束的 `runObserved` 或 `runBatchParallel` 的外层 `finally` 块里。

也就是说，在同一个步骤的第 `2` 次、第 `3` 次重试期间，Worker 保留着前一次尝试的完整对话历史。它既能看到自己上一轮调了什么工具、改了哪几行代码，又能看到本轮新注入的审查拒绝原因，顺着上次的现场把问题修好，不用从头再把所有文件读一遍。

等这一步最终通过审查，或者重试 `2` 次后依然没通过时，外层的 `finally` 块才会调用 `worker.clearHistory()`，保留 `conversationHistory.get(0)` 的系统提示词，清空其余消息，并往 `ConversationLedger` 账本里写一条 `history_clear` 事件，干干净净地去接下一个步骤。

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

![](https://cdn.paicoding.com/stutymore/paicli-multi-agent-wanger-10-20261108090205-52d2a842.jpg)

如果检查者自身的模型调用发生异常（`review.type() != AgentMessage.Type.RESULT`），或者 Worker 重试满 `2` 次仍未通过审查，编排器都不会把有隐患的结果当成 `COMPLETED` 放行，而是将已有产出保存在 `retainedResult` 中供用户查看，同时把当前步骤状态更新为 `StepStatus.FAILED`。

一旦某个步骤停在 `FAILED` 或 `BLOCKED` 状态，外层调度循环里的 `getExecutableSteps` 就会自动拦住所有依赖它的下游步骤（不影响其他独立分支继续执行）。等主循环退出后，编排器遍历所有还停留在 `PENDING` 状态的残留步骤，逐一打印跳过提示。

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

把代码编译打包，启动 PaiCLI 实测一下 `/team` 模式下的多角色协作。

```bash
mvn clean package
java -jar target/paicli-1.0-SNAPSHOT.jar
```

在命令行里可以先单独输入 `/team` 切换模式，再输入任务描述；也可以在 `/team` 后面跟上任务内容，一条命令启动协作。

```text
👤 你: /team 创建一个 Spring Boot 项目，写一个 HelloController，然后验证项目结构
```

![](https://cdn.paicoding.com/paicoding/2b332fc673ae441984874893e0d77e1c.jpg)

终端上会依次打印出规划阶段和执行阶段的完整推进过程。

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

可以看到，规划者先把需求拆分为四步并标明依赖关系；接着 `worker-1` 和 `worker-2` 按拓扑批次接手步骤调用工具，每跑完一步都交由检查者独立验收。

![](https://cdn.paicoding.com/paicoding/63f44a7feaf8685ed9842deabc6ae637.jpg)

![](https://cdn.paicoding.com/paicoding/3985913a13cb50d0c8e28561937051df.jpg)

所有步骤执行完毕后，`buildFinalResult` 会生成一份简明汇总。因为每个步骤的详细输出在执行阶段已经流式打印过了，汇总阶段会把每个步骤的 `result` 截取前 `120` 个字符作为预览，按 `✅`（已完成）、`❌`（失败，附保留产出与原因）、`⛔`（受阻，附缺少的条件）和 `⏭️`（因前置未完成而跳过）四类图标清晰列出。

整个协作过程中，编排器和各个 Sub-agent 收发的每条消息、每次工具调用、每次上下文压缩与清空历史事件，都会以 `mode="team"` 并带上各自的角色实例名（如 `planner`、`worker-1`、`reviewer-step_2`）追加写进 `~/.paicli/history/raw/<session>.jsonl` 会话账本。当所有步骤全部 `COMPLETED` 且任务未被取消时，编排器还会在收尾阶段调用 `memoryManager.extractFactsFromUserTurn`，从用户本轮原话里自动提取长期记忆事实。

一次 `/team` 任务跑完后，会话会自动回到默认的 ReAct 模式，不需要手动切回。

![](https://cdn.paicoding.com/paicoding/aa8f91f2ba8399fec220183264cff8d4.png)

我们也针对这套主从协作机制编写了完整的单元测试与评测审计测试，覆盖拓扑校验、15 种畸形计划拦截、双 Worker 并发峰值验证、闭合失败审查、受阻分支隔离以及可信网址沿 DAG 传递等场景，可以用下面的命令一键跑通验证。

```bash
mvn test -Dtest=AgentRoleTest,AgentMessageTest,SubAgentTest,TeamPlanParserTest,TeamReviewVerdictTest,AgentOrchestratorTest,TeamExecutionObservationTest,TeamRequestAuditTest -DskipTests=false
```

到这里，PaiCLI 的三条核心执行路径就全部齐备了，它们共享同一套 `ToolRegistry`、`MemoryManager`、`SnapshotService` 和 `ConversationLedger` 底座，按任务复杂度分工配合：

- 默认 ReAct 模式：适合单步或探索性强的日常问答、代码定位与小幅修改
- `/plan`（Plan-and-Execute 模式）：适合步骤较多、需要先审阅修改计划再按 DAG 推进的任务
- `/team`（Multi-Agent 模式）：适合跨模块、要求执行与验收严格分离、每一步都需要独立审查把关的复杂工程任务

下一期我们将接入 HITL（Human-in-the-Loop）人工确认与安全策略体系，给 Agent 的高危命令和文件操作装上多层安全护栏。

## PaiCLI 如何写到简历上？

**项目名称**：PaiCLI（Java 终端 Coding Agent，第 5 期）

**项目简介**：设计并实现基于主从架构的 Multi-Agent 协作与 Sub-agent 并发调度引擎，支持 Planner、Worker、Reviewer 三角色权限隔离、DAG 拓扑分批并发、结构化交付协议与闭合失败审查重试。

**技术栈**：Java 17、Jackson、ExecutorService、LinkedBlockingQueue、Kahn 拓扑排序、ByteArrayOutputStream、Prefix Caching

**核心职责**：

- 基于主从编排模式实现 `/team` 多 Agent 协作引擎，划分规划者、执行者、检查者 3 类 Sub-agent 角色与 7 种消息状态，在协议层剥离无工具角色的工具 Schema 并拦截违规工具调用。
- 基于 Jackson 严格模式（开启重复键检测与尾随字符报错）与 Kahn 拓扑排序实现任务图校验，拦截未知依赖边与循环依赖，覆盖 15 类畸形计划单测，消除非法依赖引发的下游死锁。
- 基于 `ExecutorService + LinkedBlockingQueue` 实现 Worker 池化并发调度，并行批次为每步分配独立 Reviewer 实例与 `ByteArrayOutputStream` 缓冲并按步骤顺序刷出，解决上下文并发污染与终端输出交错问题。
- 基于 DAG 依赖关系实现跨步骤上下文与可信网址传递，注入上游已完成步骤前 500 字符预览并派生网址授权副本，通过结构化 JSON 交付协议区分已完成（`completed`）与受阻（`blocked`）以跳过受阻下游分支。
- 基于闭合失败（Fail-Closed）原则实现独立审查与重试机制，仅放行合法 JSON 布尔值 `approved: true`，拒绝时按优先级提取问题列表注入上下文驱动最多 2 次带历史重试，重试耗尽时保留已有产出并阻断依赖分支。
