调研日期 2026-09-24，基于 paicli commit ea8e05a

# PaiCLI Plan-and-Execute 源码调研

源码根目录 `/Users/itwanger/Documents/GitHub/paicli`。下文路径均相对该目录。以源码为准，`docs/agents-reference.md` 和 `AGENTS.md` 只作交叉印证。

## 0. 相关文件一览

| 文件 | 行数 | 职责 |
|---|---|---|
| `src/main/java/com/paicli/plan/Planner.java` | 340 | 调 LLM 生成计划、解析校验 JSON、重新规划、简单任务短路 |
| `src/main/java/com/paicli/plan/Task.java` | 129 | 任务节点、TaskType / TaskStatus 枚举、`isExecutable` |
| `src/main/java/com/paicli/plan/ExecutionPlan.java` | 338 | 任务集合、DFS 拓扑排序、进度、`visualize()` / `summarize()` / `getExecutionBatches()` |
| `src/main/java/com/paicli/plan/PlanExecutionObserver.java` | 99 | 默认关闭的执行观察接口（评测用） |
| `src/main/java/com/paicli/agent/PlanExecuteAgent.java` | 1239 | 审阅循环、按轮并行执行、任务内工具循环、失败重规划、结果汇总 |
| `src/main/java/com/paicli/cli/Main.java` | 3000+ | `/plan` 入口、`createPlanAgent`、`createPlanReviewHandler`（按键交互） |
| `src/main/java/com/paicli/cli/CliCommandParser.java` | - | 解析 `/plan`、`/plan <任务>` 为 `SWITCH_PLAN` |
| `src/main/java/com/paicli/cli/PlanReviewInputParser.java` | 40 | 审阅阶段文本输入解析（回退行模式和“补充>”输入） |
| `src/main/resources/prompts/modes/planner.md` | 40 | Planner 的 system prompt（PromptMode.PLANNER） |
| `src/main/resources/prompts/modes/plan.md` | 8 | 每个任务执行时的 system prompt（PromptMode.PLAN） |
| `src/main/java/com/paicli/agent/AgentBudget.java` | - | 任务内循环的退出预算（和 ReAct、SubAgent 共用） |
| `src/main/java/com/paicli/agent/TeamPlanParser.java` | 134 | Team 模式计划解析（不和 Planner 共用代码，见第 13 节） |

近期相关提交（只列动到 Plan 路径的）：

- `e8d8a16`（2026-08-25）：删除 `MAX_TASK_ITERATIONS = 5`，任务内循环改用 `AgentBudget`；新增预算触发后的 `finalizePartialTask`；新增 `ConversationLedger` 记账；新增 `TurnToolPolicy`（URL 来源策略、并行分支 fork、依赖继承 TrustedUrlContext）。
- `c086e4d`：`ConversationHistoryCompactor` 换成 `AutoCompactionManager`；删除 `memoryManager.addUserMessage / addAssistantMessage / addToolResult` 的影子写入。
- `98e96d5`：工具结果回灌改为 `ToolResultBoundary.wrap(toolResult)`（不可信数据边界）。
- `2ce84ae`（2026-09-23，提交信息“测试”）：`Planner.parsePlan` 严格校验；`runExplicitTask`；`PlanExecutionObserver` 观察事件。
- `36a2677`：只给工具标签加了 `edit_file`，不涉及调度逻辑。
- `9fd726b`：压缩日志新增 `tool_result_clearing` 事件；绑定 `ExternalContextTracker`。
- `ea8e05a`：计划结果以“✅”开头时，从用户原文自动提取项目事实。
- `a0fd238` / `42bf855`：只改 Team 的 prompt 和 `TeamPlanParser` / `TeamStructuredReply`，不动 Plan 代码。

## 1. 入口和触发方式

**只有用户显式触发，没有自动判断是否进入 Plan 模式。** ReAct 的 `Agent.java` 里没有任何升级到 Plan 的逻辑（`grep -i plan Agent.java` 无结果）。

- `CliCommandParser`：`/plan`（无参数）和 `/plan <任务>` 都解析为 `CommandType.SWITCH_PLAN`。
- `Main.java` 599-605 行：

```java
case SWITCH_PLAN -> {
    if (command.payload() == null || command.payload().isEmpty()) {
        nextTaskUsePlanMode = true;
        ui.println("📋 下一条任务将使用 Plan-and-Execute 模式，输入任务前按 ESC 可取消，执行完成后自动回到默认 ReAct。\n");
        continue;
    }
    input = command.payload();
}
```

- `/plan` 只“武装”下一条输入，输入前按 ESC 会打印“↩️ 已取消待执行的 Plan-and-Execute，回到默认 ReAct。”；执行完后 `nextTaskUsePlanMode = false`，一次性生效。
- `Main.java` 940-949 行：每次都 `new` 一个 `PlanExecuteAgent`（`createPlanAgent`），共享 ReAct Agent 的 `ToolRegistry`、`MemoryManager`、`ConversationLedger`，调用 `planAgent.run(taskInput, submittedInput)`。`taskInput` 是展开 `@` 引用后的文本，`submittedInput` 是用户原文，后者只用于工具策略（`TurnToolPolicy`）。整轮包在 `snapshotService.runTurn("plan", ...)` 里（Side-Git 快照）。
- TUI 模式（`tui/TuiSessionController.java` 226-237、279-287 行）：只支持 `/plan <任务>`，并且审阅回调写死为 `PlanReviewDecision.execute()`，**不经过用户审阅**直接执行。
- 评测入口 `BenchmarkWorkerMain` / `BenchmarkRelayWorkerMain` 调 `runExplicitTask`（2ce84ae 新增），区别只在 `TurnToolPolicy.forExplicitTask`，跳过“裸标题可执行性”启发式。

调用链：`run` → `runInternal` → `runWithPlan`（`planner.createPlan(goal)`）→ `reviewAndExecutePlan`（审阅循环）→ `executePlan`（按轮执行）→ `executeTaskBatch` → `executeTask` → `executeObservedTask` → `executeTaskWithPolicy`（任务内工具循环）。

注意：`PlanExecuteAgent.run` 的 Javadoc 写着“运行任务（自动判断是否需要规划）”，但方法体总是调用 `planner.createPlan`，所谓“判断”只是 Planner 内部的简单任务短路（第 12 节），不是 ReAct / Plan 的模式路由。

## 2. Planner 的 prompt

`Planner.createPlan`（59-90 行）：

```java
if (isSimpleGoal(goal)) {
    return createMinimalPlan(goal);
}
List<LlmClient.Message> messages = Arrays.asList(
        LlmClient.Message.system(promptAssembler.assemble(PromptMode.PLANNER, PromptContext.builder()
                .projectMemoryContext(buildProjectMemoryContext())
                .build())),
        LlmClient.Message.user("请为以下任务制定执行计划：\n" + goal)
);
conversationLedger.appendMessage("plan", "planner", "system_prompt", messages.get(0));
conversationLedger.appendMessage("plan", "planner", "planning_request", messages.get(1));
PlanningStreamRenderer streamRenderer = new PlanningStreamRenderer(out);
LlmClient.ChatResponse response = llmClient.chat(messages, null, streamRenderer);
```

- system prompt 来自 `prompts/modes/planner.md`，由 `PromptAssembler` 组装，并注入 PAI.md 项目记忆（`projectMemorySupplier`，PlanExecuteAgent 构造时设成 `this::buildProjectMemoryContext`）。
- 规划请求**不带工具**（tools 传 `null`），流式只渲染 reasoning（“🧠 规划思考”），正文 JSON 不流式显示。
- 历史上曾是 Java 常量 `PLANNING_PROMPT`，在 `bceb60b` 移到 prompt 文件，当前源码已无该常量。

`planner.md` 原文要点（“## Mode: Plan Builder”）：

- 身份：“你是一个任务规划专家。请将用户的复杂任务分解为一系列可执行的子任务。”
- 可用任务类型 5 种（不含 PLANNING）：`FILE_READ` 读取文件内容；`FILE_WRITE` 写入文件内容；`COMMAND` 执行 Shell 命令；`ANALYSIS` 分析结果并做出决策；`VERIFICATION` 验证结果是否正确。
- 规则 8 条：
  1. 每个任务必须有唯一 id，如 `task_1`、`task_2`。
  2. `dependencies` 列出依赖的任务 id。
  3. 任务应该按执行顺序排列。
  4. 任务描述要具体明确。
  5. 简单任务允许只生成 1-3 个任务，不要为了凑步数引入无关步骤。
  6. 复杂任务拆分为 5-10 个子任务。
  7. 不要为了“保存中间结果”额外创建 `FILE_WRITE` / `FILE_READ`，除非用户明确要求落盘。
  8. 如果一个任务一步就能完成，就保持最短计划。
- 结尾：“只输出 JSON，不要有其他内容。”

任务执行 prompt `plan.md`（“## Mode: Plan Task Executor”）带 `{{taskType}}`、`{{taskDescription}}` 两个变量，要求理解代码库时优先 `glob_files` / `grep_code` / `read_file`，语义模糊时再用 `search_code`；`ANALYSIS` / `VERIFICATION` 上下文足够时直接输出、不调工具。

## 3. JSON 格式与解析校验

LLM 必须输出：

```json
{
  "summary": "任务摘要",
  "tasks": [
    { "id": "task_1", "description": "任务描述", "type": "FILE_READ", "dependencies": [] }
  ]
}
```

`Planner.parsePlan`（105-184 行），严格校验是 `2ce84ae` 加的：

```java
if (planJson == null || planJson.isBlank()) {
    throw new IOException("计划必须包含非空 JSON 对象");
}
String cleaned = planJson.replaceAll("```json\\s*", "")
        .replaceAll("```\\s*", "")
        .trim();
JsonNode root = mapper.readTree(cleaned);
if (root == null || !root.isObject()) {
    throw new IOException("计划必须是 JSON 对象");
}
String summary = root.path("summary").asText();
JsonNode tasksNode = root.path("tasks");
if (!tasksNode.isArray() || tasksNode.isEmpty()) {
    throw new IOException("计划 tasks 必须是非空数组");
}
...
    JsonNode idNode = taskNode.path("id");
    if (!taskNode.isObject() || !idNode.isTextual() || idNode.asText().isBlank()) {
        throw new IOException("计划任务必须具有非空字符串 id");
    }
    String originalId = idNode.asText();
    String newId = "task_" + taskIndex++;
    if (idMapping.putIfAbsent(originalId, newId) != null) {
        throw new IOException("计划中存在重复任务 id");
    }
```

第二遍建依赖：

```java
JsonNode depsNode = taskNode.path("dependencies");
if (!depsNode.isMissingNode() && !depsNode.isArray()) {
    throw new IOException("计划 dependencies 必须是任务 id 数组");
}
if (depsNode.isArray()) {
    for (JsonNode depNode : depsNode) {
        if (!depNode.isTextual() || !idMapping.containsKey(depNode.asText())) {
            // Never silently remove an edge or resolve a guessed normalized alias.
            throw new IOException("计划依赖必须引用已声明的任务 id");
        }
        ...
        task.addDependency(newDepId);
        dep.addDependent(task.getId());
    }
}
...
if (!plan.computeExecutionOrder()) {
    throw new IOException("计划中存在循环依赖");
}
```

校验规则汇总：

| 检查项 | 行为 |
|---|---|
| 回复为空 / 空白 | 抛 `IOException` |
| 不是 JSON 对象 | 抛（非法 JSON 由 Jackson 抛 `JsonProcessingException`，也是 `IOException`） |
| `tasks` 缺失、非数组、空数组 | 抛 |
| 任务不是对象、id 非字符串或空白 | 抛（空白按 Java `String.isBlank()`，NBSP 不算空白） |
| id 重复 | 抛。**旧版是 `idMapping.put` 覆盖，不报错** |
| `description` 出现但不是字符串 | 抛；缺失则为空字符串 |
| `dependencies` 出现但不是数组 | 抛；缺失等同空数组 |
| 依赖引用未声明 id | 抛。**旧版是 `getOrDefault` 加 `if (dep != null)`，静默丢边** |
| 有环 | 抛 |
| `type` 非法或缺失 | **宽松**：`parseTaskType` 的 default 分支返回 `ANALYSIS`，不报错 |
| `summary` | 不校验 |

id 重编号：不管 LLM 给的 id 是什么，都按数组顺序重编成 `task_1..task_N`，依赖通过 `idMapping` 从原始 id 映射到新 id。两遍扫描是为了支持前向引用。

和 Team 版严格程度的差别（未必是设计意图，只是事实）：Planner 用默认 `ObjectMapper`，没有开启 `STRICT_DUPLICATE_DETECTION` 和 `FAIL_ON_TRAILING_TOKENS`，所以 JSON 后面的尾随文字、重复键不会被拒；围栏用全局正则剥离，值里的 ``` 也会被删。`AGENTS.md` 231 行说明这个正则要和评测重放器 `e1_replay.py` 逐字对齐，改动前要同步。

**失败怎么办**：`parsePlan` 抛出的 `IOException` 一路上抛，没有重试，没有回退到 ReAct。`runInternal` 的 catch 把它变成：

```java
String errorMessage = "❌ 执行失败: " + e.getMessage();
```

写入 `ConversationLedger`（source=`run_error`）后返回给用户。重规划（第 8 节）和补充要求后的再规划（第 9 节）解析失败也走同一条路径，整个 `/plan` 终止。

## 4. Task 字段和枚举

`Task.java`：

```java
private final String id;
private final String description;
private final TaskType type;
private volatile TaskStatus status;
private volatile String result;
private volatile String error;
private final List<String> dependencies;  // 依赖的其他任务ID
private final List<String> dependents;    // 依赖此任务的其他任务ID
private volatile long startTime;
private volatile long endTime;
```

- `TaskType`：`PLANNING, FILE_READ, FILE_WRITE, COMMAND, ANALYSIS, VERIFICATION`（6 个）。但 Planner prompt 只列 5 个，`parseTaskType` 也没有 `PLANNING` 分支，LLM 写 `PLANNING` 会落到 default 变成 `ANALYSIS`。`PLANNING` 在主流程中不可达，只在评测 `PlanRequestAudit` 里被映射成 `ANALYSIS`。
- `TaskStatus`：`PENDING, RUNNING, COMPLETED, FAILED, SKIPPED`（5 个）。`markSkipped()` 方法存在，但**全仓库 main 代码没有任何调用方**，`SKIPPED` 实际不可达。
- 状态、结果、时间戳字段是 `volatile`，因为并行任务在线程池里写、主线程读。
- `getDependencies()` / `getDependents()` 返回副本。
- `isExecutable(allTasks)`：自身 `PENDING` 且所有依赖都 `COMPLETED`。依赖失败的下游永远停在 `PENDING`。
- 任务类型在执行时只作为 `{{taskType}}` 变量进 prompt，**不限制可用工具**（所有任务拿到同一份工具定义，再经 `TurnToolPolicy.expose` 过滤）。

`ExecutionPlan.PlanStatus`：`CREATED, RUNNING, COMPLETED, FAILED, CANCELLED`。`CANCELLED` 同样没有调用方设置，用户取消时 `executePlan` 直接返回“⏹️ 已取消当前计划执行。”，不改计划状态。

## 5. 依赖和拓扑排序（真实算法）

`ExecutionPlan.computeExecutionOrder`（94-135 行）是 **DFS 后序**，沿“依赖”方向递归，先访问依赖再加入自己，所以得到的顺序天然是“依赖在前”，**不需要也没有 reverse**：

```java
public boolean computeExecutionOrder() {
    executionOrder.clear();
    Set<String> visited = new HashSet<>();
    Set<String> visiting = new HashSet<>();
    for (Task task : tasks.values()) {
        if (!visited.contains(task.getId())) {
            if (!topologicalSort(task, visited, visiting)) {
                return false;  // 有环
            }
        }
    }
    return true;
}

private boolean topologicalSort(Task task, Set<String> visited, Set<String> visiting) {
    String id = task.getId();
    if (visiting.contains(id)) {
        return false;  // 有环
    }
    if (visited.contains(id)) {
        return true;
    }
    visiting.add(id);
    for (String depId : task.getDependencies()) {
        Task dep = tasks.get(depId);
        if (dep != null) {
            if (!topologicalSort(dep, visited, visiting)) {
                return false;
            }
        }
    }
    visiting.remove(id);
    visited.add(id);
    executionOrder.add(id);
    return true;
}
```

- `tasks` 是 `LinkedHashMap`，外层按插入顺序（task_1..N）遍历，结果确定。
- `visiting` 是递归栈（灰色节点），再次遇到即有环；`visited` 是已完成（黑色节点）。
- 入度为 0 的 Kahn 算法在 PaiCLI 里只出现在 Team 的 `TeamPlanParser.requireAcyclic`，Plan 模式没有用。

**拓扑序在执行中的真实作用很有限**：调度靠每轮重新计算 `isExecutable`，拓扑序只用于给同一轮的可执行任务排序（`getExecutableTasksInOrder`）、`visualize()` 编号、观察事件。`getExecutionBatches()`（266-292 行，按层剥离）只被 `summarize()` 用来显示“并行批次数 / 首批执行 / 最终收敛”，不参与调度。`getRootTasks()` 无调用方。

## 6. 执行主循环与并行

`PlanExecuteAgent.executePlan`（426-515 行）核心：

```java
while (true) {
    if (CancellationContext.isCancelled()) {
        return "⏹️ 已取消当前计划执行。";
    }
    List<Task> executableTasks = getExecutableTasksInOrder(plan);
    if (executableTasks.isEmpty()) {
        break;
    }
    List<TaskExecutionResult> batchResults = executeTaskBatch(
            plan, executableTasks, streamState, taskTrustedUrls, observation);
    for (TaskExecutionResult batchResult : batchResults) {
        ...
    }
}
```

即“按轮”执行：每轮取出当前所有可执行任务，整轮做完（屏障）后再算下一轮。它不是事件驱动的 DAG 调度器，某个任务的依赖提前完成，也要等本轮其他任务全部结束才会启动。

`executeTaskBatch`（528-605 行）：

- 本轮只有 1 个任务：在调用线程直接执行，输出直接写 `out`。
- 多个任务：

```java
out.println("⚡ 本轮并行执行 " + executableTasks.size() + " 个任务: " + parallelTaskIds);
ExecutorService executor = Executors.newFixedThreadPool(Math.min(executableTasks.size(), 4), r -> {
    Thread t = new Thread(r, "paicli-plan-executor");
    t.setDaemon(true);
    return t;
});
```

- 并发度：`Math.min(本轮任务数, 4)`，4 是字面量，没有命名常量，也没有配置项。每轮新建线程池，`finally` 里 `shutdownNow()`。守护线程，线程名 `paicli-plan-executor`。
- 每个并行任务的输出写进自己的 `ByteArrayOutputStream`，全部 `future.get()` 完成后按任务顺序一次性 flush 到终端，避免交错（“按任务顺序 flush 各缓冲区到 stdout，避免并行输出交错”）。代价是并行任务执行期间终端看不到它们的流式输出。
- 某个任务抛异常不会取消同轮其他任务，结果统一收集后处理。
- 源码中没有看到跨并行任务的文件写锁，两个并行任务写同一文件的冲突没有专门处理（未确认是否有其他层兜底）。
- 任务内的多个工具调用另走 `ToolRegistry.executeTools` 的并行（`MAX_PARALLEL_TOOLS = 4`，线程名 `paicli-tool-executor`），这是第 7 期“并行工具调用”的调度器，和计划级并行是两层独立的线程池。

## 7. 每个任务是否跑子 ReAct 循环

是，但它是 `PlanExecuteAgent.executeTaskWithPolicy`（651-794 行）里**独立实现**的一套工具循环，不复用 `Agent`（ReAct 类）。每个任务新建自己的 `messages`：system（plan.md）+ 一条 user（任务上下文），任务之间不共享对话历史。

```java
AgentBudget budget = AgentBudget.fromLlmClient(llmClient);
while (true) {
    if (CancellationContext.isCancelled()) { ... }
    AgentBudget.ExitReason exitReason = budget.check();
    if (exitReason != AgentBudget.ExitReason.WITHIN_BUDGET) {
        return finalizePartialTask(task, messages, actor, exitReason, budget,
                allResults, streamRenderer, taskToolPolicy, out);
    }
    int iteration = budget.beginIteration();
    injectPendingLspDiagnostics(messages, out, actor);
    maybeCompactHistory(messages, out, actor);
    List<LlmClient.Tool> toolDefinitions = llmClient.supportsTools()
            ? toolRegistry.getToolDefinitions() : null;
    TurnToolPolicy.ToolExposure toolExposure = taskToolPolicy.expose(toolDefinitions);
    LlmClient.ChatResponse response = llmClient.chat(messages, toolExposure.definitions(), streamRenderer);
    ...
    if (!response.hasToolCalls()) {
        ... return TaskRunResult.of(response.content(), ...);
    }
    budget.recordToolCalls(response.toolCalls());
    ...
    List<ToolExecutionResult> toolResults = executeToolCalls(
            task.getId(), iteration, response.toolCalls(), taskToolPolicy, toolExposure, observation);
    for (ToolExecutionResult toolResult : toolResults) {
        allResults.append(toolResult.result()).append("\n");
        appendTaskMessage(messages, actor, "tool_execution",
                LlmClient.Message.tool(toolResult.id(), ToolResultBoundary.wrap(toolResult)));
    }
    appendImageToolMessages(messages, toolResults, actor);
}
```

退出条件：

- 模型不再调用工具：返回 `response.content()`；如果正文为空但前面调过工具，返回累积的工具结果文本 `allResults.trim()`。
- `AgentBudget`（e8d8a16 起替代旧的 `MAX_TASK_ITERATIONS = 5`）：
  - token 预算 `paicli.react.token.budget`，默认 `Integer.MAX_VALUE`（实质不限）；
  - 停滞检测 `paicli.react.stagnation.window`，默认 3，连续 3 轮工具名加参数完全相同即判停滞；
  - 硬轮数 `paicli.react.hard.max.iterations`，默认不限（`UNLIMITED_ITERATIONS = Integer.MAX_VALUE`）。
  - 命中后 `finalizePartialTask`：追加一条收尾 user 消息，**不带工具**再调一次模型，结果包成“⚠️ 部分完成（原因）”，任务仍记为 `COMPLETED`。
- 用户取消：返回“⏹️ 已取消任务 [task_x]。”，也作为成功结果记 `COMPLETED`。

其他每轮动作：注入 LSP 诊断、`AutoCompactionManager` 压缩（触发阈值 `ContextProfile.compressionTriggerTokens()`）、工具结果用 `ToolResultBoundary.wrap` 包成不可信数据、图片类工具结果额外追加一条 user 消息。全部消息写入 `ConversationLedger`，actor 为 `task:<id>`。

**什么算任务失败**：只有 `executeTask` 抛出异常（例如 LLM 调用 IOException）。工具报错、预算触发、取消都不算失败。

## 8. 失败处理和重新规划

`executePlan` 474-490 行：

```java
Exception error = batchResult.error();
task.markFailed(error.getMessage());
out.println("❌ 失败 [" + task.getId() + "]: " + error.getMessage() + "\n");

if (plan.getProgress() < 0.5) {
    out.println("🔄 尝试重新规划...\n");
    ExecutionPlan replanned = planner.replan(plan, error.getMessage());
    return reviewAndExecutePlan(replanned, streamState, explicitTaskEnvelope).result();
}

if (!finalResult.isEmpty()) {
    finalResult.append("\n");
}
finalResult.append("任务 ").append(task.getId()).append(" 失败: ").append(error.getMessage());
```

- 触发条件：某个任务抛异常，且 `plan.getProgress() < 0.5`。`getProgress()` = `COMPLETED` 任务数 / 总任务数（不是“成功率”）。同一轮中排在前面、已被标记完成的任务计入。
- 次数上限：**没有**。`reviewAndExecutePlan → executePlan → replan → reviewAndExecutePlan` 是递归，源码里没有计数器；只要新计划又在进度过半前失败，就会继续重规划（直到 Planner 解析失败抛异常或用户在审阅时取消）。
- 重规划计划会再次经过审阅回调，交互 CLI 下用户会再看到一次审阅界面。
- `Planner.replan`（210-229 行）上下文：

```java
context.append("原任务: ").append(failedPlan.getGoal()).append("\n");
context.append("失败原因: ").append(failureReason).append("\n");
context.append("已完成的任务:\n");
for (Task task : failedPlan.getAllTasks()) {
    if (task.getStatus() == Task.TaskStatus.COMPLETED) {
        context.append("- ").append(task.getId())
                .append(": ").append(task.getDescription())
                .append("\n");
    }
}
context.append("\n请制定新的执行计划，避开之前的问题。");
return createPlan(context.toString());
```

  只带已完成任务的 id 和描述，**不带它们的执行结果**；新计划是全新 `ExecutionPlan`，不继承完成状态。新计划的 goal 就是这段上下文，多次重规划会层层嵌套“原任务”。
- 进度 ≥ 0.5 时失败：不重规划，记录失败，继续跑其他可执行任务；失败任务的下游停在 `PENDING`（不会标 `SKIPPED`）。循环结束后：

```java
String planSummary = finalResult.isEmpty()
        ? buildFinalResult(plan, streamedTaskOutputs)
        : finalResult.toString();
if (plan.hasFailed()) {
    plan.markFailed();
    ...
    return "⚠️ 计划部分完成，有任务失败。\n" + planSummary;
}
```

  注意只要有失败，汇总就只剩“任务 task_x 失败: ...”几行，已完成任务的结果不会出现在最终返回里（它们在执行时已经流式打印过）。
- 没有任务级重试。
- 如果循环结束时既没全部完成也没失败（理论上的死锁），返回“⚠️ 计划未能继续推进，存在未满足依赖的任务。”；严格校验后正常情况下不可达。

## 9. 计划审阅（用户确认 / 补充）

接口在 `PlanExecuteAgent`（88-110 行）：`PlanReviewHandler.review(goal, plan)` 返回 `PlanReviewDecision`，动作枚举 `PlanReviewAction { EXECUTE, SUPPLEMENT, CANCEL }`。

`reviewAndExecutePlan`（388-412 行）：

```java
while (true) {
    PlanReviewDecision decision = reviewHandler.review(plan.getGoal(), plan);
    if (decision == null || decision.action() == PlanReviewAction.EXECUTE) {
        return PlanRunOutcome.executed(executePlan(plan, streamState, explicitTaskEnvelope));
    }
    if (decision.action() == PlanReviewAction.CANCEL) {
        return PlanRunOutcome.canceled("⏹️ 已取消本次计划执行。");
    }
    String feedback = decision.feedback() == null ? "" : decision.feedback().trim();
    if (feedback.isEmpty()) {
        return PlanRunOutcome.executed(executePlan(plan, streamState, explicitTaskEnvelope));
    }
    out.println("📝 已收到补充要求，正在重新规划...\n");
    String revisedGoal = plan.getGoal() + "\n补充要求：" + feedback;
    submittedPolicyInput = submittedPolicyInput + "\n补充要求：" + feedback;
    turnToolPolicy = policyFor(submittedPolicyInput, explicitTaskEnvelope);
    plan = planner.createPlan(revisedGoal);
}
```

- 补充要求不是“编辑计划”，而是把补充文本拼到 goal 后**整份重新规划**，并重建工具策略（例如补充“不要联网”会收紧策略）。补充次数不设上限。
- 不支持逐条编辑、删除任务。

交互 CLI 的实现在 `Main.createPlanReviewHandler`（1484-1557 行），默认打印 `plan.summarize()`（折叠摘要），提示：

```
📝 计划已生成。
   - 回车：按当前计划执行
   - Ctrl+O：展开完整计划
   - ESC：折叠或取消本次计划
   - I：输入补充要求后重新规划
```

- raw mode 读单键：Enter 执行；Ctrl+O 打印 `plan.visualize()`（带状态图标的方框图）；ESC 在展开状态下是折叠，折叠状态下是取消；I 进入 `补充> ` 行输入，再交给 `PlanReviewInputParser.parse`；方向键等转义序列被忽略。
- 读不到单键时回退到行模式 `操作/补充> `，`/view` 展开，其余交给 `PlanReviewInputParser`。
- `PlanReviewInputParser.parse`：单独 ESC 字符、`cancel`、`esc`、`/cancel` → CANCEL；空串、`y`、`yes`、`run`、`/run` → EXECUTE；其他文本 → SUPPLEMENT。
- 简单任务的单步计划也会经过审阅。

`summarize()` 输出字段：目标（48 字截断）、任务数、并行批次、当前可执行、状态、首批执行、最终收敛（每批最多列 5 个 id）。

## 10. 任务间上下文传递

`buildTaskContext`（1171-1206 行）：

```java
context.append("总目标：").append(goal).append("\n");
context.append("当前任务：").append(task.getDescription()).append("\n");
if (task.getDependencies().isEmpty()) {
    context.append("依赖任务：无\n");
} else {
    context.append("依赖任务结果：\n");
    for (String depId : task.getDependencies()) {
        Task dep = plan.getTask(depId);
        ...
        context.append("- ").append(dep.getId())
                .append(" / ").append(dep.getDescription())
                .append(" / 状态=").append(dep.getStatus())
                .append("\n");
        if (dep.getResult() != null && !dep.getResult().isBlank()) {
            context.append(dep.getResult()).append("\n");
        }
    }
}
... "依赖分支经 web_search 验证的 URL（可供当前任务抓取/导航）："
context.append("请执行此任务。如果是ANALYSIS或VERIFICATION类型，请基于以上上下文直接给出结果。");
```

- 只传**直接依赖**的完整结果文本（不截断、不做摘要），不传间接依赖，也不传无依赖关系的兄弟任务。
- 之后追加长期记忆 `memoryManager.buildContextForQuery(task.getDescription(), memoryContextTokens)`，再在最前面拼上 Skill 正文缓冲（`prependSkillBodies`）；system prompt 中另有 PAI.md 项目记忆、MCP resource 索引、Skill 索引。
- 工具授权上下文：每个任务从本轮顶层 `TurnToolPolicy` fork 一份（`forkWithTrustedUrls`），只有 DAG 中声明的依赖分支经 `web_search` 得到的 `TrustedUrlContext` 会传给下游；任务结果文本里的 URL 不作为授权来源（e8d8a16）。
- 最终结果 `buildFinalResult`：优先拼接“叶子任务”（没有下游的任务）中未流式输出过的结果，格式 `[task_x] 结果`；都没有则取最后一个有结果的任务。

## 11. 输出与状态展示

- 执行期只有逐行日志：“🚀 开始执行计划...”“▶️ 执行任务 [task_1]: ...”“⚡ 本轮并行执行 N 个任务: ...”“▶️ 并行任务 [...]”“✅ 完成 [task_1]: 前 100 字”“❌ 失败 [...]”，以及每个任务的流式“🧠 任务思考 [id]”“🤖 任务输出 [id]”。
- 没有执行期实时刷新的状态图。`visualize()` 里的 ⏳ ▶️ ✅ ❌ ⏭️ 图标只在审阅阶段按 Ctrl+O 时打印一次，那时所有任务都是 ⏳。

## 12. 简单任务跳过规划

`Planner.isSimpleGoal`（231-268 行），三个条件同时满足才跳过 LLM 规划：

1. 不含多步提示词：`然后`、`并且`、`并`、`再`、`最后`、`同时`、`先`、`之后`、`接着`、`以及`；
2. 去首尾空白后长度 ≤ 30 个字符（`normalized.length() > 30` 即返回 false）；
3. 含以下任一关键词：`列出`、`查看`、`读取`、`显示`、`执行`、`运行`、`搜索`、`当前目录`、`文件`。

命中后 `createMinimalPlan` 生成单任务计划：id 固定 `task_1`，描述是原文，summary 为“直接执行简单任务：<原文>”，类型由 `inferSimpleTaskType` 推断：

```java
if (normalized.contains("读取") || normalized.contains("打开") || normalized.contains("查看")
        && normalized.contains("文件")) {
    return Task.TaskType.FILE_READ;
}
```

`&&` 优先级高于 `||`，实际语义是“含读取，或含打开，或同时含查看和文件”。其后依次判断写入/修改/创建文件 → FILE_WRITE，分析/总结/解释 → ANALYSIS，验证/检查 → VERIFICATION，否则 COMMAND。

- 判断只在 Plan 模式内部生效，不做 ReAct / Plan 模式路由。
- 判断对象是展开 `@` 引用后的 goal；补充要求和重规划的 goal 带有额外文本，长度基本都超过 30，不会再命中。
- 单步计划仍经过审阅，执行时仍要调用模型。

## 13. Team 计划解析是否和 Plan 共用代码

不共用。`a0fd238` 新增的 `TeamPlanParser`（`agent/TeamPlanParser.java`）是独立实现，只是 Javadoc 写明“Validation follows the Plan-and-Execute planner”，规则对齐：

| 维度 | Plan `Planner.parsePlan` | Team `TeamPlanParser.parse` |
|---|---|---|
| 数组字段 | `tasks` | `steps`（兼容 `tasks`） |
| 重编号 | `task_N` | `step_N` |
| JSON 读取 | 默认 ObjectMapper，全局正则去围栏 | `TeamStructuredReply`：只剥整段外层一层围栏，开启重复键检测和尾随 token 拒绝 |
| 环检测 | DFS（`ExecutionPlan.computeExecutionOrder`） | Kahn 入度法（`requireAcyclic`） |
| type | 未知值宽松转 ANALYSIS | 必须是字符串，缺省 `COMMAND`，不校验取值 |
| 失败 | 抛异常，整次 `/plan` 报“❌ 执行失败” | 返回空列表，Orchestrator 返回“❌ 规划失败：无法解析执行计划”（PLAN_INVALID） |

`42bf855` 只改 reviewer 的布尔判定，和 Plan 无关。

## 14. 其他新机制（文档未覆盖）

- `ConversationLedger`：Planner 的 system/请求/响应和每个任务的全部消息都以 append-only JSONL 记账（mode=`plan`，actor=`planner` / `task:<id>` / `plan-agent`）。
- `TurnToolPolicy`：工具暴露和执行都经过按轮策略；并行分支隔离 URL 授权。
- `AgentBudget` + 部分结果收尾（替代固定 5 轮）。
- `AutoCompactionManager`：任务内消息接近窗口阈值时清理旧工具结果或压缩为摘要。
- `ToolResultBoundary.wrap`：工具结果作为不可信数据回灌。
- LSP 诊断注入：写文件后的诊断在下一轮调用前追加进任务消息。
- `PlanExecutionObserver`：默认关闭，事件 `PlanStarted / TaskEntered / TaskInputPrepared / ToolBatchReturned / TaskExited`，只记指纹不记正文，每次执行（含重规划）独立 executionId，给评测 E1 用。
- 自动事实提取（ea8e05a）：结果以“✅”开头且未取消时，调用 `memoryManager.extractFactsFromUserTurn(submittedUserInput)`，打印“💾 自动提取并保存 N 条项目事实（待核实…）”。
- `runExplicitTask`：评测入口专用。
- TUI 模式下 `/plan` 不审阅直接执行。

## 15. 文档对照：build-agent-p2-plan-execute.md

| 位置 | 文档说法 | 源码事实 | 源码位置 |
|---|---|---|---|
| 02「Task 类设计」代码块 | 字段无修饰 | `status/result/error/startTime/endTime` 是 `volatile`（并行需要） | `plan/Task.java` 12-18 |
| 02 任务类型列表 | “`PLANNING`：规划任务，用于分析和决策” | Planner prompt 不列 PLANNING，`parseTaskType` 无该分支，写了也变 ANALYSIS，主流程不可达 | `Planner.java` 189-198；`planner.md` |
| 02 任务状态 | “`SKIPPED`：被跳过（依赖失败）” | `markSkipped()` 无调用方；依赖失败的下游停在 PENDING | `Task.java` 97；全仓库 grep |
| 02「任务的生命周期」 | `PENDING → RUNNING → COMPLETED/FAILED/SKIPPED` | SKIPPED 不可达；预算触发和取消的任务记为 COMPLETED | `PlanExecuteAgent.java` 461、797-843 |
| 02 第一个「### 依赖关系」(130-155) 与 157-176 | 157-164 重复了 82-89 的任务类型列表；168 起第二个「### 依赖关系」和 130 起几乎逐字重复，只是换了一张图 | 结构问题，建议保留第一个（含 `isExecutable` 代码），删掉 157-176，或把两张图合并到一节 | 文档自身 |
| 02「拓扑排序算法」文字 | “找到所有入度为 0 的节点…移除这些节点及其出边…”（Kahn 思路）后接“我们用 DFS 算法来实现” | Plan 只用 DFS 后序；Kahn 只在 Team 的 `TeamPlanParser.requireAcyclic` | `ExecutionPlan.java` 94-135；`TeamPlanParser.java` 105-133 |
| 02「拓扑排序算法」代码 | `Collections.reverse(executionOrder);` | 源码**没有 reverse**。DFS 沿依赖递归、后序加入，结果已是依赖在前；加 reverse 会把下游排到上游前面 | `ExecutionPlan.java` 94-108 |
| 02「计划状态管理」 | `CANCELLED`：被取消 | 没有代码设置 CANCELLED；取消时直接返回字符串 | `PlanExecuteAgent.java` 447-449 |
| 03 Planner 示意代码 | `LlmClient.Message.system(PLANNING_PROMPT)`、`llmClient.chat(messages, null)` | 常量已在 bceb60b 删除；prompt 在 `prompts/modes/planner.md`，经 `PromptAssembler`（PromptMode.PLANNER）组装并注入 PAI.md；`chat` 带第三个参数 `PlanningStreamRenderer`；有 Ledger 记账 | `Planner.java` 59-90 |
| 03「规划提示词工程」类型描述 | “FILE_READ: 读取文件内容，用于获取信息”等 | 现文案：“读取文件内容”“写入文件内容”“执行 Shell 命令”“分析结果并做出决策”“验证结果是否正确” | `planner.md` 5-11 |
| 03 规则 | 5 条，“5. 复杂任务拆分为5-10个子任务” | 8 条：新增“简单任务允许只生成 1-3 个任务”“不要为了保存中间结果额外创建 FILE_WRITE / FILE_READ”“一步能完成就保持最短计划”，末尾“只输出 JSON” | `planner.md` 29-40 |
| 03「解析 LLM 输出」 | “LLM 生成的任务 ID 可能重复或格式不统一，我们需要重新映射”，代码 `idMapping.put(originalId, newId);` | 重复 id 直接抛“计划中存在重复任务 id”（`putIfAbsent`）；另有空回复、非对象、tasks 非空数组、id 非空字符串、description 类型、dependencies 类型、未知依赖、环等严格校验，任何一项不合法整次 `/plan` 报“❌ 执行失败: …”，无重试、无回退 | `Planner.java` 105-184（2ce84ae） |
| 03「解析 LLM 输出」省略的第二遍 | 未说明未知依赖怎么处理 | 旧版静默丢边，新版抛“计划依赖必须引用已声明的任务 id” | `Planner.java` 163-168 |
| 03「重新规划」代码 | `String context = buildContext(failedPlan, failureReason);` | 无 `buildContext` 方法，内联 StringBuilder；只带已完成任务的 id 和描述，不带结果 | `Planner.java` 210-229 |
| 03「重新规划」 | 未写触发条件和上限 | 触发：任务抛异常且 `getProgress() < 0.5`；没有次数上限（递归）；新计划会再走一次审阅 | `PlanExecuteAgent.java` 480-484 |
| 04 PlanExecuteAgent 骨架 | `System.out.println(plan.visualize());` 然后 `for (String taskId : plan.getExecutionOrder())` 串行执行 | 默认打印 `summarize()` 并进入审阅循环；执行是“按轮取可执行任务、同轮并行（≤4 线程）”，拓扑序只用于轮内排序 | `PlanExecuteAgent.java` 388-526；`Main.java` 1484-1557 |
| 04 正文 | “直到任务结束或达到预算上限” | 正确，但可补：预算默认不限轮数，靠停滞检测（连续 3 次相同调用）兜底；旧 `MAX_TASK_ITERATIONS = 5` 已删；预算命中后无工具收尾，结果标“⚠️ 部分完成” | `AgentBudget.java`；`PlanExecuteAgent.java` 696-716、797-843 |
| 04「简单任务跳过模型规划」 | 只说“符合条件时跳过” | 可补具体规则：无多步提示词 + 长度 ≤ 30 + 含指定动词/名词；单步计划仍经审阅 | `Planner.java` 231-304 |
| 05「计划可视化」 | “执行过程中实时更新状态图标：⏳ → ▶️ → ✅/❌” | 没有实时刷新的状态图。`visualize()` 只在审阅阶段 Ctrl+O 时打印一次；执行期是逐行日志“▶️ 执行任务”“⚡ 本轮并行执行”“✅ 完成”“❌ 失败” | `ExecutionPlan.java` 210-238；`Main.java` 1534、1549；`PlanExecuteAgent.java` 430-478 |
| 06「运行测试」 | “这里我们可以加一个交互…直接让 Codex 帮我们来补全这一步” | 审阅交互早已存在：Enter / Ctrl+O / ESC / I，另有行模式回退 `/view`、`/cancel`；截图可能是旧 UI（未确认） | `Main.java` 1484-1557；`PlanReviewInputParser.java` |
| 06 | `java -jar target/paicli-1.0-SNAPSHOT.jar` | 一致（pom `artifactId=paicli`、`version=1.0-SNAPSHOT`、Java 17） | `pom.xml` |
| 07「混合使用」 | “3. 如果某步失败，用 ReAct 分析原因并决定是重试还是重规划” | PaiCLI 不这样做：失败后是否重规划由固定规则 `progress < 0.5` 决定，无重试 | `PlanExecuteAgent.java` 480 |
| 08「进阶：并行执行」示意代码 | `CompletableFuture.runAsync` + `allOf().join()` | 真实：`Executors.newFixedThreadPool(Math.min(n, 4))`，守护线程 `paicli-plan-executor`，每轮新建、`shutdownNow`；单任务不开线程池；并行任务输出先写各自缓冲区，结束后按序 flush | `PlanExecuteAgent.java` 528-605 |
| 08「并行执行可能遇到的问题」 | “我们已经实现了哈” | 输出混乱：已用缓冲区解决；错误处理：一个失败不取消同轮其他任务；资源冲突：源码未见跨任务文件写锁（未确认是否有其他层兜底） | 同上 |
| 08「规划的自我修正」 | `validatePlan` 伪代码“检查重复ID / 依赖是否存在 / 循环依赖 / 任务类型是否合法” | 前三项已在 `parsePlan` 内实现为抛异常；任务类型**不校验**，非法值转 ANALYSIS | `Planner.java` 105-198 |
| 08「规划的自我修正」 | `if (successRate < 0.5) replan(plan, "前序任务成功率低")` | 真实判断是在任务失败时 `plan.getProgress() < 0.5`（已完成数 / 总数，不是成功率），原因传的是异常消息 | `PlanExecuteAgent.java` 480-482 |
| 简历 | “实现 6 种任务类型和 5 种状态流转” | PLANNING、SKIPPED 在主流程不可达 | 见上 |
| 简历 | “使用 LLM 将复杂任务分解为 5-10 个可执行子任务” | prompt 同时要求简单任务 1-3 个、能一步完成就保持最短 | `planner.md` |
| 简历 | “相比串行执行效率大幅提升” | 仓库里没有对应的性能测试或数据（未确认） | - |
| 简历 | 未提严格校验 | 可补“计划 JSON 严格校验（重复 id、未知依赖、环直接拒绝）” | `Planner.java` |

## 16. 文档对照：paicli-interview-agent-core.md 第 04、05、11 题

| 位置 | 文档说法 | 源码事实 | 源码位置 |
|---|---|---|---|
| 04 | “用户确认后，再按计划逐个执行子任务” | 按轮执行，同轮无依赖任务并行（≤4 线程） | `PlanExecuteAgent.java` 446-456、552 |
| 04 流程图 | “用户确认（回车执行 / ESC 取消 / I 补充要求）” | 另有 Ctrl+O 展开完整计划；ESC 在展开状态是折叠；补充要求是整份重新规划，不是编辑 | `Main.java` 1484-1557 |
| 04 流程图 | “每个子任务内部走 ReAct 循环” | 基本正确，但是 `executeTaskWithPolicy` 自己的工具循环，不复用 `Agent` 类；每个任务独立消息历史，只拿到直接依赖的结果 | `PlanExecuteAgent.java` 651-794、1171-1206 |
| 04「它比 ReAct 好在哪」 | “`PlanReviewInputParser.java` 实现了计划确认交互：回车执行、ESC 取消、按 I…” | 按键交互在 `Main.createPlanReviewHandler`；`PlanReviewInputParser` 只解析文本（回退行模式和“补充>”输入：空/y/yes/run → 执行，cancel/esc/`/cancel` → 取消，其余 → 补充） | `Main.java` 1484；`PlanReviewInputParser.java` |
| 04 | “这个确认机制是受 Claude Code 启发” | 源码和 paicli/docs 无依据（未确认） | - |
| 04 | “当然代价是多了一轮 Planner 的 LLM 调用” | 简单目标命中 `isSimpleGoal` 时不调 Planner；补充要求和重规划会多调 | `Planner.java` 62-64 |
| 04 | “默认 ReAct，用户显式 `/plan` 才切换，执行完自动回到 ReAct” | 正确。可补：`/plan` 单独输入是武装下一条，ESC 可撤销；`/plan <任务>` 直接执行；TUI 下不审阅 | `Main.java` 599-605、408-410；`TuiSessionController.java` 279-287 |
| 05 | “每个子任务声明自己依赖哪些前置任务（`depends_on` 字段）” | 字段名是 `dependencies` | `planner.md`；`Planner.java` 159 |
| 05 | “`PlanExecuteAgent` 执行时用拓扑排序把任务分成批次” | 批次不是拓扑排序算出来的：每轮用 `isExecutable` 取所有依赖已完成的 PENDING 任务，拓扑序只决定轮内顺序。`getExecutionBatches()` 只用于摘要展示 | `PlanExecuteAgent.java` 517-526；`ExecutionPlan.java` 243-292 |
| 05 | “同一批次内的任务通过第 7 期的并行调度器并行执行” | 计划级并行是 `PlanExecuteAgent.executeTaskBatch` 自己的线程池（`paicli-plan-executor`，min(n,4)）；第 7 期的是任务内工具并行 `ToolRegistry.executeTools`（`MAX_PARALLEL_TOOLS = 4`） | `PlanExecuteAgent.java` 552；`ToolRegistry.java` 64、1507 |
| 05「某个任务失败了怎么办」 | “所有直接或间接依赖它的下游任务自动标记为 `SKIPPED`” | 错误。`markSkipped()` 无调用方，下游停在 PENDING，永远不执行 | `Task.java` 97；`PlanExecuteAgent.java` 475-490 |
| 05 | “和它没有依赖关系的其他任务不受影响，继续执行” | 只在进度 ≥ 50% 时成立；进度 < 50% 时立即整体重规划 | `PlanExecuteAgent.java` 480-484 |
| 05 | “这个设计是参考了 CI/CD 流水线的做法” | 源码无依据（未确认），且 SKIPPED 机制本身不存在 | - |
| 05 | “Plan-and-Execute 当前没有任务级重试” | 正确；但漏了失败重规划（`progress < 0.5`，无次数上限） | 同上 |
| 05 | “Multi-Agent 模式下 Reviewer 审查不通过时有重做机制（最多 2 次）” | 常量 `MAX_RETRIES_PER_STEP = 2` 存在；重做的具体触发语义本次未深入核对 | `AgentOrchestrator.java` 51 |
| 11 | “默认 ReAct，`/plan` 或 `/team` 显式切换，执行完自动回到 ReAct” | 正确 | `Main.java` 599-620、971-972 |
| 11 | “日常使用中 80% 的交互 ReAct 就能搞定” | 无数据来源（未确认），按写作规范应改模糊表达 | - |
| 11 | “模式路由层”方案 | 是设计设想，PaiCLI 当前没有实现；唯一的“自动判断”是 Plan 模式内部的 `isSimpleGoal` 短路，不跨模式 | `Planner.java` 231-268 |
