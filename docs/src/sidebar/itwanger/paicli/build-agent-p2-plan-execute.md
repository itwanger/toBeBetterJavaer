---
title: 给Agent CLI加上Plan-and-Execute，让Agent先规划后执行，支持DAG。
shortTitle: Agent任务规划与DAG调度
description: 第2期：为Java Agent CLI加入Plan-and-Execute能力，按最新源码讲清任务建模、DFS拓扑排序、严格计划校验、按轮并行调度、依赖失败跳过和有上限的重新规划。
keywords: Plan-and-Execute, DAG, 拓扑排序, 任务规划, PaiCLI
tag:
  - Agent
  - Java
category:
  - AI
author: 沉默王二
date: 2026-04-19
---

大家好，我是二哥呀。

PaiCLI 的第 1 期我们已经实现了，一个基础的 ReAct Agent，能一步一步执行任务，一边思考一边行动。

但这种方式有个问题，**复杂任务需要很多轮对话**，每一步都需要调用 LLM，走到哪算哪，用户事先也不知道它打算怎么做。

比如“创建一个 Spring Boot 项目，写个 REST API，然后打包运行”这个任务。

![](https://cdn.paicoding.com/paicoding/7128dac401f41d2b2ede4c193e240e9d.png)

图中是 ReAct 多轮调用的示意，调用次数取决于模型是否继续使用工具，不能据此推断另一种模式只调用一次模型。

第 2 期，我们来实现 **Plan-and-Execute** 模式，先生成任务计划，再让执行器逐项完成。这里的“规划一次”只描述首次生成计划；执行每个任务仍会调用 LLM，任务中使用工具后还可能继续调用，失败或用户补充要求时也可能重新规划。

这篇文章写于 4 月，9 月我按最新源码校正了一遍。这几个月 Plan 模式改了不少地方，计划 JSON 从“能解析就行”改成了严格校验，重新规划加了次数上限，依赖失败的下游任务会明确标成跳过，失败时的汇总也不再丢掉已经完成的结果。

## 01、Plan-and-Execute 的核心思想

Plan-and-Execute 的核心是把任务规划与逐项执行分开。

规划器决定任务及其依赖，执行器根据任务结果调用模型和工具；它们的调用次数不能混为一谈。

```text
复杂目标 → Planner（首次规划：1 次 LLM 调用）→ 任务 DAG
                                      ├─ 任务 1：至少 1 次 LLM 调用，可能调用工具并继续询问模型
                                      ├─ 任务 2：至少 1 次 LLM 调用，可能调用工具并继续询问模型
                                      └─ 任务 3：至少 1 次 LLM 调用，可能调用工具并继续询问模型
用户补充要求或执行失败 → 可能重新规划，产生额外的 LLM 调用
```

这样做的好处有：

1. **提前安排任务**：先明确步骤和依赖，再逐项执行；LLM 调用次数不一定比 ReAct 少
2. **可预测性更强**：执行前用户能看到整份计划，可以确认、补充或取消
3. **支持并行执行**：识别无依赖的任务并行处理
4. **失败可处理**：任务失败后可以依据已完成的进度重新规划；是否需要重做步骤取决于新计划

代价是规划本身增加了一次模型请求和等待时间。如果执行中发现计划有问题，还可能再次请求模型重规划；能否节省 Token 和时间，要看任务数、每个任务的执行轮数及并行程度。

![](https://cdn.paicoding.com/stutymore/build-agent-p2-plan-execute-20260924182030-166934ea.png)

## 02、任务建模

要实现 Plan-and-Execute，首先要定义什么是“任务”。

### 为什么需要任务建模

在 ReAct 模式中，任务隐含在对话历史中。LLM 通过阅读历史消息知道当前该做什么。这种方式有两个问题。

第一，**上下文膨胀**。复杂任务需要很多轮对话，随着历史消息越来越长，Token 的消耗剧增。

第二，**状态不清晰**。对话历史里混杂了思考过程、工具调用、执行结果，很难一眼看出任务执行到哪一步。

任务建模把“做什么”和“怎么做”分离开来。计划阶段确定“做什么”（任务列表），执行阶段解决“怎么做”（具体执行）。

### Task 类设计

```java
public class Task {
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
}
```

状态、结果和时间戳都加了 `volatile`。同一轮里的多个任务会在线程池里并行执行，工作线程写状态，主线程读状态，不加 `volatile` 就可能读到旧值。

枚举里定义了 6 种任务类型，Planner 的提示词只给模型列出其中 5 种：

- `FILE_READ`：读取文件，获取信息
- `FILE_WRITE`：写入文件，输出结果
- `COMMAND`：执行命令，编译运行等
- `ANALYSIS`：分析结果，中间决策
- `VERIFICATION`：验证结果，检查正确性

第 6 种 `PLANNING` 是早期设计留下的，现在的解析逻辑里没有这个分支，模型写了也会被当成 `ANALYSIS`。任务类型只作为提示词变量交给执行器，不限制任务能用哪些工具。

任务状态有 5 种，`PENDING`、`RUNNING`、`COMPLETED`、`FAILED`、`SKIPPED`。`SKIPPED` 在很长一段时间里其实用不到，依赖失败的下游任务一直停在 `PENDING`。9 月的修复补上了这一步，下文讲失败处理时再展开。

### 任务的生命周期

一个任务从创建到完成，完整的生命周期如下所示。

```
PENDING → RUNNING → COMPLETED / FAILED
PENDING → SKIPPED（依赖的任务失败，或达到重新规划上限）
```

每个状态转换都有对应的方法。

```java
public void markStarted() {
    this.status = TaskStatus.RUNNING;
    this.startTime = System.currentTimeMillis();
}

public void markCompleted(String result) {
    this.status = TaskStatus.COMPLETED;
    this.result = result;
    this.endTime = System.currentTimeMillis();
}

public void markFailed(String error) {
    this.status = TaskStatus.FAILED;
    this.error = error;
    this.endTime = System.currentTimeMillis();
}
```

记录时间戳有两个用途，一是统计执行耗时，二是分析任务瓶颈。如果某个任务总是耗时很长，可能需要优化或者拆分。

### 依赖关系

复杂任务有先后依赖。比如“写代码”依赖“创建项目”，“运行”依赖“编译”。

我们用 DAG（有向无环图）表示依赖关系。

![](https://cdn.paicoding.com/paicoding/7ec21fcc8f1031ffef6704fd6c9d8586.png)

每个任务声明自己依赖哪些任务（dependencies），同时记下哪些任务依赖自己（dependents）。前者用来判断能不能开始执行，后者用来在失败时找出受影响的下游。

判断能不能执行的方法是 `isExecutable`。

```java
public boolean isExecutable(Map<String, Task> allTasks) {
    if (status != TaskStatus.PENDING) return false;
    for (String depId : dependencies) {
        Task dep = allTasks.get(depId);
        if (dep == null || dep.getStatus() != TaskStatus.COMPLETED) {
            return false;
        }
    }
    return true;
}
```

只有当所有依赖都已完成时，任务才可以执行。执行器每一轮都用它重新筛一遍可执行任务，调度就靠这一个检查。

![](https://cdn.paicoding.com/paicoding/8840940d9c21255b3aea4da40cf38d81.png)

### 执行计划

多个任务可以组成一个执行计划。

```java
public class ExecutionPlan {
    private final String id;
    private final String goal;                   // 计划目标
    private final Map<String, Task> tasks;       // 所有任务，LinkedHashMap 保持插入顺序
    private final List<String> executionOrder;   // 拓扑排序后的顺序
    private PlanStatus status;
    private String summary;
}
```

![](https://cdn.paicoding.com/paicoding/4d0ca17a2df7ff04df8d39c8b99ca37b.png)

### 拓扑排序算法

`computeExecutionOrder()` 用 DFS 把 DAG 转换成线性顺序。沿着“依赖”方向递归，先把所有依赖加进结果，再加自己，也就是后序遍历。这样得到的顺序天然就是依赖在前。

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

旧版文章的代码在最后多写了一行 `Collections.reverse(executionOrder)`。沿依赖方向做后序遍历，结果本来就是依赖在前，再反转一次顺序就错了，源码里也没有这一行。同一节开头还讲了“找入度为 0 的节点”，那是 Kahn 算法的思路，PaiCLI 的 Plan 模式没有用它，只有 Team 模式的计划解析用入度法检测环。

![](https://cdn.paicoding.com/stutymore/build-agent-p2-plan-execute-20260924182251-1c5c3b96.png)

算法用两个集合来跟踪状态，`visiting` 是当前递归栈中的节点，用于检测环；`visited` 是已处理完的节点，用于避免重复处理。

如果检测到环（`visiting.contains(id)`），说明任务依赖关系有问题，比如 A 依赖 B，B 依赖 C，C 又依赖 A。这种计划没法执行，解析阶段会直接报错。

拓扑序在执行时的作用其实有限。调度靠每一轮重新调用 `isExecutable`，拓扑序只用来给同一轮的可执行任务排个先后，另外用在计划展示的编号上。

### 计划状态管理

执行计划本身也有状态，`CREATED`、`RUNNING`、`COMPLETED`、`FAILED`、`CANCELLED`。其中 `CANCELLED` 目前没有代码设置，用户取消时执行器直接返回“已取消”的提示。

```java
public void markStarted() {
    this.status = PlanStatus.RUNNING;
    this.startTime = System.currentTimeMillis();
}

public boolean hasFailed() {
    return tasks.values().stream()
        .anyMatch(t -> t.getStatus() == TaskStatus.FAILED);
}
```

计划级别的状态让用户能快速了解整体执行情况，不需要逐个检查任务。

## 03、规划器实现

规划器负责把用户输入的复杂任务分解成可执行的计划。

```java
public ExecutionPlan createPlan(String goal) throws IOException {
    if (isSimpleGoal(goal)) {
        return createMinimalPlan(goal);
    }
    List<LlmClient.Message> messages = Arrays.asList(
            LlmClient.Message.system(promptAssembler.assemble(PromptMode.PLANNER, PromptContext.builder()
                    .projectMemoryContext(buildProjectMemoryContext())
                    .build())),
            LlmClient.Message.user("请为以下任务制定执行计划：\n" + goal)
    );
    PlanningStreamRenderer streamRenderer = new PlanningStreamRenderer(out);
    LlmClient.ChatResponse response = llmClient.chat(messages, null, streamRenderer);
    return parsePlan(goal, response.content());
}
```

和 4 月的版本相比有三处变化。提示词从 Java 常量挪到了 `prompts/modes/planner.md`，由提示词组装模块拼装，并带上 PAI.md 项目记忆。规划请求不带工具，流式只显示模型的思考过程。另外开头多了一个简单任务的短路判断，第 04 节再讲。

![](https://cdn.paicoding.com/paicoding/105743aeb47ee7523d8abfc4841f54c5.png)

### 规划提示词工程

关键是给 LLM 一个清晰的提示，让它输出标准格式的计划。提示词里有三块内容。

**第一，明确输出格式**。告诉 LLM 必须输出 JSON，并且给出完整示例，结尾再强调一句“只输出 JSON，不要有其他内容”。

```json
{
  "summary": "任务摘要",
  "tasks": [
    { "id": "task_1", "description": "任务描述", "type": "FILE_READ", "dependencies": [] }
  ]
}
```

**第二，定义任务类型**。列出 5 种可用类型和用途，让 LLM 知道什么场景用什么类型。

**第三，给出约束规则**。现在的规则有 8 条：

```
1. 每个任务必须有唯一 id，如 task_1、task_2
2. dependencies 列出依赖的任务 id
3. 任务应该按执行顺序排列
4. 任务描述要具体明确
5. 简单任务允许只生成 1-3 个任务，不要为了凑步数引入无关步骤
6. 复杂任务拆分为 5-10 个子任务
7. 不要为了“保存中间结果”额外创建 FILE_WRITE / FILE_READ，除非用户明确要求落盘
8. 如果一个任务一步就能完成，就保持最短计划
```

第 5、7、8 条是后来加的，针对的是简单任务被拆得过细、为了保存中间结果额外建读写任务这两种情况。

![](https://cdn.paicoding.com/stutymore/build-agent-p2-plan-execute-20260924182401-d5181230.png)

### 解析 LLM 输出

旧版文章写的是“LLM 生成的任务 ID 可能重复或格式不统一，我们需要重新映射”。当时的代码遇到重复 id 会直接覆盖，依赖里引用了不存在的 id 也会悄悄丢掉这条边，计划看起来能跑，其实已经不是模型原本的意思了。

9 月 23 日这部分改成了严格校验，任何一项不合格都直接失败。

````java
String cleaned = planJson.replaceAll("```json\\s*", "")
        .replaceAll("```\\s*", "")
        .trim();
JsonNode root = mapper.readTree(cleaned);
if (root == null || !root.isObject()) {
    throw new IOException("计划必须是 JSON 对象");
}
JsonNode tasksNode = root.path("tasks");
if (!tasksNode.isArray() || tasksNode.isEmpty()) {
    throw new IOException("计划 tasks 必须是非空数组");
}
// 第一遍：登记 id，重复即失败
JsonNode idNode = taskNode.path("id");
if (!taskNode.isObject() || !idNode.isTextual() || idNode.asText().isBlank()) {
    throw new IOException("计划任务必须具有非空字符串 id");
}
if (idMapping.putIfAbsent(idNode.asText(), "task_" + taskIndex++) != null) {
    throw new IOException("计划中存在重复任务 id");
}
// 第二遍：建立依赖，引用未声明的 id 即失败
if (!depNode.isTextual() || !idMapping.containsKey(depNode.asText())) {
    throw new IOException("计划依赖必须引用已声明的任务 id");
}
// 最后：拓扑排序失败说明有环
if (!plan.computeExecutionOrder()) {
    throw new IOException("计划中存在循环依赖");
}
````

两遍扫描保留了下来。LLM 可能先定义 task_2，再定义 task_1，而 task_2 依赖 task_1。第一遍先登记所有 id，第二遍再建立依赖，前向引用就不会出问题。不管模型给的 id 叫什么，最终都按数组顺序重新编号成 `task_1` 到 `task_N`。

![](https://cdn.paicoding.com/stutymore/build-agent-p2-plan-execute-20260924182549-5438f8da.png)

只有任务类型是宽松的，写错或缺失都按 `ANALYSIS` 处理。解析失败时没有自动重试，也不会退回 ReAct，整次 `/plan` 直接返回“❌ 执行失败”和具体原因。我的判断是，计划形状都不对的时候，与其猜模型想干什么，不如让用户看到错误重新描述一遍。

### 重新规划

执行中某个任务失败，而且计划完成度低于一半时，执行器会基于已完成的进度重新规划。

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

上下文里只有已完成任务的 id 和描述，没有它们的执行结果。新生成的计划是一份全新的 `ExecutionPlan`，**不会继承**旧计划的完成状态或执行产物，所以不能保证失败后只重做失败的那一步，执行前仍要检查新计划有没有重复操作。

这里原来还有一个隐患，重新规划没有次数上限。新计划只要又在完成一半之前失败，就会再规划一次，一直递归下去。9 月 24 日加了上限，默认最多重新规划 2 次，可以用 `PAICLI_PLAN_MAX_REPLANS` 调整。

```java
if (!stopAfterBatch && plan.getProgress() < 0.5) {
    int maxReplans = maxReplans();
    if (replansUsed < maxReplans) {
        out.println("🔄 尝试重新规划（第 " + (replansUsed + 1) + "/" + maxReplans + " 次）...\n");
        ExecutionPlan replanned = planner.replan(plan, error.getMessage());
        return reviewAndExecutePlan(replanned, streamState, explicitTaskEnvelope, replansUsed + 1)
                .result();
    }
    // 不再启动任何新任务，只收完本批已返回的结果
    stopAfterBatch = true;
    continue;
}
```

到达上限后不再启动新任务，只把当前这一轮已经返回的结果收完，其余任务全部标成 `SKIPPED`。PaiCLI 的评测重放器要求重规划触发点之后不能再有新的工作，到上限时直接停下，正好和这条约束一致。

## 04、PlanExecuteAgent

现在把规划器和执行器整合起来。4 月的版本是“显示计划，再按拓扑序一个个执行”，现在的主流程多了审阅和按轮并行。

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
        // 成功则标记完成；失败则判断是否重新规划，或者跳过它的下游
    }
}
```

每一轮取出当前所有可执行的任务，整轮执行完，再重新计算下一轮。它不是事件驱动的调度器，某个任务的依赖提前完成了，也要等这一轮其他任务全部结束才会启动。

![](https://cdn.paicoding.com/stutymore/build-agent-p2-plan-execute-20260924182704-ec070123.png)

每个任务内部是一个独立的工具循环。任务有自己的消息列表，system 是任务执行提示词，user 是任务上下文；模型返回工具调用就执行工具，把结果交回模型，直到模型不再调用工具为止。

任务上下文只带**直接依赖**的完整结果，不带间接依赖，也不带无关的兄弟任务。这样每个任务的上下文都很干净，代价是下游任务如果需要更早的信息，只能靠直接依赖在结果里转述。

### 任务之间怎么传递上下文

下游任务拿到的第一条 user 消息，是执行器按依赖关系拼出来的任务上下文。

```java
context.append("总目标：").append(goal).append("\n");
context.append("当前任务：").append(task.getDescription()).append("\n");
if (task.getDependencies().isEmpty()) {
    context.append("依赖任务：无\n");
} else {
    context.append("依赖任务结果：\n");
    for (String depId : task.getDependencies()) {
        Task dep = plan.getTask(depId);
        context.append("- ").append(dep.getId())
                .append(" / ").append(dep.getDescription())
                .append(" / 状态=").append(dep.getStatus())
                .append("\n");
        if (dep.getResult() != null && !dep.getResult().isBlank()) {
            context.append(dep.getResult()).append("\n");
        }
    }
}
context.append("请执行此任务。如果是ANALYSIS或VERIFICATION类型，请基于以上上下文直接给出结果。");
```

依赖结果原样拼进来，不截断也不做摘要。上游读了一个大文件、下游又依赖了好几个上游时，这条消息会很长，好在任务内部也有上一期讲的自动压缩兜底。上下文后面还会追加和任务描述相关的长期记忆。

![](https://cdn.paicoding.com/stutymore/build-agent-p2-plan-execute-20260924182820-c5b9ffbb.png)

联网权限也按依赖关系传递。每个任务从本轮的工具策略复制一份自己的副本，并行的兄弟任务之间不共享新发现的 URL。上游任务通过 `web_search` 拿到的可信 URL，只会传给 DAG 里声明依赖它的下游；上游回复正文里写的网址不算数，下游想抓取也会被拒绝。这样一个任务读到的网页内容再怎么诱导，也没法让另一个分支去访问它指定的地址。

旧版任务循环写死了最多 5 轮，复杂一点的任务可能还没做完就被截断。现在改成循环预算机制，默认不限轮数，只开停滞检测，连续 3 轮工具调用完全相同就判定原地打转。预算触发后，程序关掉工具再调一次模型，让它基于已有结果收尾，任务结果标“⚠️ 部分完成”。

什么才算任务失败？只有任务执行过程中抛出异常，比如模型调用失败。工具报错、预算触发、用户取消都不算失败，它们会作为结果正常交给后续任务。

一个复杂任务至少是 **1 次规划 + 每个任务至少 1 次执行** 的 LLM 调用；工具调用和重规划会增加次数。

### 简单任务跳过模型规划

用户输入 `/plan <任务>` 时，PaiCLI 会进入 Plan-and-Execute 模式。规划器内部有一个简单任务判断，三个条件同时满足才跳过 LLM 规划。

- 不含“然后、并且、再、最后、同时、先、之后、接着、以及”这类多步提示词
- 去掉首尾空白后不超过 30 个字符
- 含“列出、查看、读取、显示、执行、运行、搜索、当前目录、文件”之一

命中后直接生成只有一个任务的计划，任务描述就是用户原文。这个计划仍然会经过审阅，执行时仍要调用模型。它不是在 ReAct 和 Plan 两种模式之间自动切换，PaiCLI 默认走 ReAct，只有用户输入 `/plan` 才进入计划模式，执行完自动回到 ReAct。

## 05、计划审阅

计划生成之后，执行之前，会先停下来让用户看一眼。

![](https://cdn.paicoding.com/paicoding/d2786097e271ba2ac5d129c43c9dfa1e.png)

默认显示的是折叠摘要，包括目标、任务数、并行批次数、首批执行和最终收敛的任务。按键的含义如下。

```
📝 计划已生成。
   - 回车：按当前计划执行
   - Ctrl+O：展开完整计划
   - ESC：折叠或取消本次计划
   - I：输入补充要求后重新规划
```

Ctrl+O 展开的是带状态图标的完整任务图。旧版文章说“执行过程中实时更新状态图标”，现在的代码没有这个功能，执行期间只有逐行日志，比如“▶️ 执行任务”“⚡ 本轮并行执行 N 个任务”“✅ 完成”“❌ 失败”。

![](https://cdn.paicoding.com/stutymore/build-agent-p2-plan-execute-20260924182939-aa5b4d92.png)

按 I 输入的补充要求会拼到目标后面，整份重新规划，原计划不支持逐条编辑或删除任务。补充里如果写了“不要联网”，工具策略也会跟着收紧。终端读不到单键时会退回行模式，直接回车执行，输入 `/view` 展开，输入 `cancel` 取消，其他文字当作补充要求。

## 06、运行测试

编译运行：

```bash
mvn clean package
java -jar target/paicli-1.0-SNAPSHOT.jar
```

输入 `/plan` 进入计划模式，然后输入提示词：创建一个 Java 项目叫 demo，写一个 Hello 类输出 Hello World，然后编译运行

![](https://cdn.paicoding.com/paicoding/25e552a18c8fe15d5be6a0137844adbd.png)

规划了 5 个任务，task5 依赖 task4，task4 依赖 task3，task3 依赖 task2，task2 依赖 task1。

![](https://cdn.paicoding.com/paicoding/5350cd11f2aba24ef9f3ed20a0588f96.png)

然后开始执行计划。

![](https://cdn.paicoding.com/paicoding/fc0313d703fbfa1dc8858be32217b52e.jpg)

第 2 期刚上线时，计划一生成就直接执行，用户没有机会插话。后来加了上一节讲的审阅环节，这部分当时是让 Codex 帮忙补全的。

![](https://cdn.paicoding.com/paicoding/e9dd603e9c4a1aad1f2b52cba8ebd46e.png)

加上审阅之后的效果。

![](https://cdn.paicoding.com/paicoding/598c7bbdfce39dc87a1e0b05280e2439.jpg)

整个流程清晰可见，每一步都知道在做什么。

![](https://cdn.paicoding.com/stutymore/build-agent-p2-plan-execute-20260924183055-961d1c17.png)

## 07、和 ReAct 的对比

两种模式各有优劣，适用场景不同。

| 特性         | ReAct            | Plan-and-Execute   |
| ------------ | ---------------- | ------------------ |
| LLM 调用次数 | 由行动和观察轮数决定 | 首次规划、每个任务的执行及必要的重规划都会调用；不保证更少 |
| 执行速度     | 取决于行动轮数       | 增加规划耗时；独立任务并行时可能缩短总耗时               |
| Token 消耗   | 取决于对话历史       | 取决于计划、任务上下文和执行轮数；不保证更低             |
| 灵活性       | 高（随时调整）   | 低（按 plan 执行） |
| 可预测性     | 低               | 高                 |
| 错误恢复     | 容易（随时改）   | 需要重规划         |
| 适用场景     | 简单/探索性任务  | 复杂/确定性任务    |

任务简单、一两步就能完成，或者需要边看边决定下一步的探索性操作，用 ReAct 更顺手。比如“查看当前目录有什么文件”，直接 ReAct 一步完成。

任务复杂、步骤之间有明确依赖，用户又希望执行前先看到完整流程，用 Plan-and-Execute 更合适。比如“读取配置、分析源码结构、再输出一份迁移方案”。

两种模式在 PaiCLI 里其实是嵌套使用的。外层用 Plan-and-Execute 制定整体计划，每个任务内部是一个多轮的模型与工具循环。任务失败后，重不重新规划由固定规则决定（完成度低于一半且没到上限），没有再让模型分析一遍失败原因。其他产品的内部实现不能仅凭表面行为推断。

## 08、并行执行进阶

PaiCLI 当前会按 DAG 的依赖关系分批执行，同一轮里互不依赖的任务并行。

```java
out.println("⚡ 本轮并行执行 " + executableTasks.size() + " 个任务: " + parallelTaskIds);
ExecutorService executor = Executors.newFixedThreadPool(Math.min(executableTasks.size(), 4), r -> {
    Thread t = new Thread(r, "paicli-plan-executor");
    t.setDaemon(true);
    return t;
});
```

并发度是本轮任务数和 4 取小，每一轮新建线程池，结束时关闭。本轮只有一个任务时不开线程池，直接在当前线程执行。

比如“读取 pom.xml”和“列出 src 目录”可以同时进行，最后再汇总。

### 并行执行可能遇到的问题

并行执行会遇到三类问题，两个任务同时写同一个文件，日志交错看不清，一个任务失败后其他任务怎么办。PaiCLI 对这三类问题分别做了处理。

输出交错的处理最直接。每个并行任务的输出先写进自己的缓冲区，整轮结束后按任务顺序一次性打印。代价是并行任务执行期间，终端看不到它们的流式输出。

![](https://cdn.paicoding.com/stutymore/build-agent-p2-plan-execute-20260924183208-2fe0d6d3.png)

写入冲突分两层看。计划层面，两个并行任务写同一个文件目前没有专门的锁，要靠规划时把它们设计成有依赖关系。工具层面，9 月 24 日修了一个更常见的问题，同一轮模型返回多个 `edit_file`，旧代码会并行执行，它们各自读文件、改一处、整文件写回，后写的会把先写的改动盖掉。代码审查时实测过同一个文件的并发编辑，50 轮里有 49 轮丢了改动，工具却都报告成功。现在只有读文件、搜索这类只读工具才并行，写文件、执行命令、MCP 调用一律按模型给出的顺序串行。

失败处理见下一小节。

提示词：

```
/plan 请把任务拆成可并行的 DAG：
1. 读取 pom.xml
2. 列出 src/main/java 下的文件
3. 列出 src/test/java 下的文件
4. 读取 README.md 的前 80 行
5. 最后汇总以上结果，告诉我这个项目的构建方式、源码结构和测试情况。
要求：前 4 个任务彼此独立并行执行，最后 1 个任务依赖前 4 个任务；在执行日志里明确提示哪些任务是并行执行的。
```

![](https://cdn.paicoding.com/paicoding/a3e75ca18361da8e7c45be61a2471e7d.jpg)

开始并行执行任务。

![](https://cdn.paicoding.com/paicoding/f15e467c02e8f2662922d9c4973fcf98.jpg)

当所有并行任务结束后，开始汇总。

![](https://cdn.paicoding.com/paicoding/768597fa4d66a36f278666398a00fabc.jpg)

### 失败之后怎么收场

一个任务失败后，执行器先看完成度。低于一半且没到重规划上限，就重新规划；否则继续执行不受影响的任务。

9 月 24 日之前，这里有两个问题。依赖失败任务的下游一直停在 `PENDING`，最后的汇总也看不出它们为什么没执行；只要有任务失败，最终返回就只剩“任务 X 失败”这几行，前面已经完成的结果一条都不给。

现在失败任务的直接和间接下游都会标成 `SKIPPED`，汇总先列已完成任务的结果，再列失败和跳过的原因。格式如下，内容为示意。

```
⚠️ 计划部分完成，有任务失败。
已完成的任务结果:
[task_1] pom.xml 使用 Maven 构建，Java 17
[task_2] src/main/java 下共有 3 个包
任务 task_3 失败: 读取 README.md 超时
任务 task_5 已跳过: 依赖的任务 task_3 失败
```

![](https://cdn.paicoding.com/stutymore/build-agent-p2-plan-execute-20260924183403-4e7044a4.png)

已经流式显示过的任务结果不会重复打印。到达重规划上限的情况，汇总里会多一行“已达到重新规划上限（2 次），停止执行剩余任务”。

### 更智能的规划

复杂任务还可以考虑**分层规划**，这部分 PaiCLI 还没有实现。

```
第一层规划：确定主要阶段
- 阶段1：环境搭建
- 阶段2：核心功能开发
- 阶段3：测试验证

第二层规划：细化每个阶段
- 阶段1包含：安装依赖、配置环境、初始化项目
- 阶段2包含：写模块A、写模块B、集成测试
```

分层规划的好处是高层计划稳定，低层计划可以灵活调整。某个阶段的详细计划有问题，只需要重规划这个阶段，不影响整体。

旧版文章在这里还画了一个 `validatePlan` 做规划验证。重复 id、依赖是否存在、循环依赖这三项，现在都已经放进解析阶段直接校验了；任务类型是否合法这一项没有校验，写错就按分析任务处理。

## PaiCLI 如何写到简历上？

**PaiCLI 项目（第 2 期）| 2026.04 - 2026.09 | Agent 开发**

**项目描述**：为 Agent CLI 加入 Plan-and-Execute 能力，实现任务分解、DAG 依赖管理、严格计划校验、按轮并行调度和有上限的失败重规划。

**技术栈**：Java 17、Maven、GLM-5.1 API、DAG 拓扑排序、JSON 解析、JLine3

**核心职责**：

- 设计任务模型，实现 5 种任务状态流转和依赖双向追踪，失败任务的传递下游自动标记为跳过，并发读写状态用 volatile 保证可见性
- 实现基于 DFS 后序遍历的拓扑排序和环检测，按轮筛选依赖已完成的任务，用线程池并行执行同一轮的独立任务，并行输出先缓冲再按任务顺序打印
- 开发 Planner 规划器，提示词约束简单任务 1-3 步、复杂任务 5-10 步，对模型输出的计划做严格校验，重复 id、未声明依赖和循环依赖直接拒绝，避免静默丢边
- 实现失败处理，完成度低于一半时基于已完成进度重新规划且默认最多 2 次，失败汇总同时保留已完成结果与失败、跳过原因
- 集成 JLine3 实现计划审阅交互，支持回车执行、展开完整计划、取消和输入补充要求整份重新规划
