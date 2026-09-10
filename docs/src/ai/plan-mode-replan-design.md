# Plan-and-Execute 执行期重规划设计

> 调研基准：DeepSeek Harness `packages/plan/plan-mode`（GitHub 开源，`deepseek-ai/deepseek-harness`）、Claude Code plan mode 官方文档、Armin Ronacher《What Actually Is Claude Code's Plan Mode?》、PaiCLI `com.paicli.plan` 源码。
> 本文回答一个问题：计划生成之后，执行过程中该怎么修正计划，才既不失真、又不推倒重来。

## 一、先看清现状：三个系统都没把"执行中改计划"做透

DeepSeek Harness 的 plan mode 只做三件事：激活期间在每个请求里注入一段部署自写的 guidance、注册一个 `exit_plan_mode` 工具、把计划交给用户评审。它的文档里写得很直白——**plan mode is guidance, not enforcement**，强制约束留在 sandbox mode 和 approval policy 两条独立轴上。全仓库搜不到任何执行期重规划机制：计划批准后就是对话历史里的一段 markdown，工具结果只有一句 `carry out the plan starting with your next step`，之后靠模型自觉。

Claude Code 的 plan mode 是一个 permission mode：工具目录不变，编辑在权限层被拦住，直到用户批准；计划写在 plans 文件夹的 markdown 里，退出时从文件读回来。社区还记录过权限泄漏的 bug（anthropics/claude-code #19874、#40324）。它的重点同样在"进门"和"出门"，不在执行期怎么改计划。

PaiCLI 有真正的结构化计划：`ExecutionPlan` 带 DAG、拓扑排序、循环依赖检测、并行批次，执行时用固定线程池跑可执行任务。但它的重规划只有两个触发点——评审阶段用户给反馈、任务失败且整体进度不到 50%——而且都是 `planner.createPlan(...)` **整份重来**，不是对剩余计划做增删改查。进度超过一半时任务失败，它不重规划，记录失败继续往下走。

三个系统对照下来，结论很清楚：**计划怎么生成、怎么审批，业界已经有共识；计划在执行中怎么安全地改，还是空白。** 这正是最值得设计的部分。

## 二、四段闭环

```
Planner ──plan──> Gate ──approved──> Executor ──evidence──> Replanner
   ^                                                            │
   │                       patch / retry / replan               │
   └────────────────────────────────────────────────────────────┘
                          escalate ──> 人类
```

四个角色的职责必须分开，尤其不能让执行器自己改计划——执行器手里只有局部信息，让它改计划，等于让施工队自己改图纸。

- **Planner**：只读调研 + 拆解 + 标注验收。不执行。
- **Gate**：人批准。这是 DSH 的 `exit_plan_mode`、Claude Code 的 plan 审批。
- **Executor**：一次只执行一个已解锁任务，回传结构化结果和证据。
- **Replanner**：只输出对当前计划的最小补丁，不改目标。

## 三、计划的数据结构：决定它能不能被修正

一段 prose 计划是没法打补丁的。要能被修正，计划至少要有下面这些字段：

```jsonc
{
  "id": "plan_1",
  "revision": 0,                 // 每次修补 +1，用于审计和防抖
  "goal": "给 CLI 加 --greeting 参数",   // 来自用户原话，不允许模型改
  "invariants": [                // 不许动的东西
    { "id": "i1", "text": "不引入新的第三方依赖", "source": "user" }
  ],
  "assumptions": [               // 计划依赖的事实，每条都可验证
    { "id": "a1", "claim": "入口在 src/cli.ts", "check": "read src/cli.ts 的前 40 行",
      "status": "holds", "evidence": "..." }
  ],
  "tasks": [
    {
      "id": "t1",
      "desc": "解析 --greeting 参数",
      "type": "EDIT",            // READ | EDIT | COMMAND | ANALYSIS | VERIFY
      "deps": [],
      "assumptions": ["a1"],     // 这个任务依赖哪些假设
      "acceptance": { "how": "npm test -- greeting", "expected": "全部用例通过" },
      "status": "pending",       // pending | ready | running | done | failed | blocked | dropped
      "evidence": { "commands": [], "files": [], "output": "" }
    }
  ],
  "budget": { "maxReplans": 3, "maxToolCalls": 60 }
}
```

三个字段是设计的核心：

- **acceptance**：让"完成"可判定。模型说 done 不算，`acceptance.how` 跑通才算。PaiCLI 的 `Task` 只有 `status` 和 `result`，没有验收条件，所以 `markCompleted` 完全靠执行器自述。
- **assumptions**：让"计划为什么错"可归因。任务失败往往不是任务写得差，而是它依赖的某条事实不成立。把假设显式列出来，重规划器才能只重写受影响的后续任务，而不是推翻整份计划。
- **evidence**：让重规划器看到事实，而不是看到模型的自述。PaiCLI 的 `PlanExecutionObserver` 已经把任务进入/退出、工具批返回、结果指纹记下来了，方向是对的，只是这些观察目前只用于诊断，没有回灌给规划器；DSH 一侧同样有完整的工具调用与结果事件，可以作为证据源。

## 四、三段提示词

### 4.1 规划器

```
你是这个仓库的规划器。你的产出是一份可执行、可验收、可修补的计划，不是一篇方案说明。

第一步，只读调研。用 glob / grep / read 把下面这些事实查清楚，不要凭文件名猜：
- 需求会碰到哪些文件、哪些调用链；
- 项目怎么构建、怎么跑测试（从 package.json / pom.xml / Makefile 里读，不要猜命令）；
- 现有代码里和需求冲突的地方。

第二步，输出计划。同时给人读的 markdown 和下面的 JSON：
{ ...见第三节的数据结构... }

规则：
1. 每条 assumption 必须能被一次工具调用验证。写不出 check 的假设，就不要写。
2. 每个任务必须有 acceptance。写不出验收条件的任务，说明它太虚，拆细。
3. deps 只能引用已声明的 id，不允许环。
4. 只给一条推荐路径，不要罗列备选方案。
5. 任务数控制在 3-8 个；一个任务一步能做完就保持最短。
6. 不要为了"保存中间结果"额外造 READ / WRITE 任务。
```

关键在"不许猜命令"和"写不出验收就拆细"这两条。模型规划翻车，八成是因为它编了一个不存在的测试命令，或者把"优化一下"这种没法验收的话当成任务。

### 4.2 执行器

```
你一次只执行一个任务。任务之外的事，一律不做。

执行前：
1. 读依赖任务的 evidence，不要重复已完成的工作。
2. 确认 acceptance 里的检查怎么跑。

执行中：
3. 只调用完成该任务必需的工具。发现顺手能改的无关问题，记下来，不要动手。

执行后，必须返回结构化结果：
{
  "status": "done" | "failed" | "blocked",
  "acceptance": { "ran": "<实际执行的检查>", "result": "<实际输出摘要>", "passed": true },
  "evidence": { "files": [], "commands": [], "output": "<关键输出>" },
  "discoveries": [
    { "kind": "assumption_broken" | "blocker" | "shortcut" | "new_fact",
      "detail": "...", "affects": ["t3", "t4"] }
  ]
}

规则：
4. acceptance 没通过，不许报 done。报 failed，把实际输出放进 evidence。
5. 任务描述和代码事实冲突时，不要硬做，报 blocked，把冲突写进 discoveries。
6. 发现更短路径，不要自己改计划，写进 discoveries 交给重规划器。
7. 不要为了让检查通过而修改检查本身。
```

第 6 条是整个设计的纪律：**执行器只上报，不修改计划。** 一旦允许执行器顺手改计划，"计划"就退化成了执行日志。

### 4.3 重规划器

```
你是重规划器。输入是 goal、invariants、当前 plan、每个任务的 evidence、
以及执行器上报的 discoveries。输出是对当前计划的最小补丁，不是一份新计划。

输出 JSON：
{
  "decision": "continue" | "retry" | "patch" | "replan" | "escalate",
  "reason": "<一句话，必须引用具体的 evidence 或 discovery>",
  "assumption_updates": [{ "id": "a1", "status": "broken", "evidence": "..." }],
  "keep": ["t1", "t2"],
  "add": [{ ...同 task 结构... }],
  "drop": ["t5"],
  "modify": [{ "id": "t4", "desc": "...", "deps": ["t3"] }],
  "escalate": null | { "to": "human", "question": "..." }
}

硬约束：
- 不允许环，不允许引用不存在的 id。
- 不允许 drop 一个有已完成后继的任务。
- 不允许修改 goal 和 invariants。
- 每个补丁必须说明它依据的 evidence；没有新证据，不许再次补丁。
```

## 五、触发条件：什么时候该改计划

不是风吹草动都要改。把触发条件收敛成五类，其余情况走重试：

| 触发 | 信号 | 典型动作 |
|---|---|---|
| T1 假设被证伪 | `discovery.kind = assumption_broken` | 重写依赖该假设的后续任务 |
| T2 任务失败/阻塞 | `status ∈ {failed, blocked}` 且有后继 | 插入诊断修复任务，或改依赖 |
| T3 用户改需求 | 运行中收到新指令 | 更新 goal，重新过评审 |
| T4 发现更优路径 | `discovery.kind = shortcut` | 合并/删除冗余任务 |
| T5 预算超限 | 工具调用数、重规划数、时限 | 降级或停下来问人 |

**明确不触发重规划的情况**：单次可重试的工具报错（先重试）、模型觉得"还能写得更好"、任务描述措辞不满意。把这三类挡在门外，能挡掉大部分计划抖动。

## 六、决策阶梯与防抖

从便宜到贵，能停在上一步就不要往下走：

1. **retry**：临时性错误（超时、锁、网络），原地重试，计划不动。
2. **patch**：单任务失败但不推翻假设，在失败任务后插入"诊断 + 修复"子任务，其余原封不动。
3. **patch（假设驱动）**：某条 assumption 被证伪，只重写依赖它的后续任务。
4. **replan**：剩余计划整体失效（依赖的接口/方案不存在），用已完成任务的 evidence 重建剩余部分，已完成任务一律 keep。
5. **escalate**：冲突触及 invariant，或需要缩小目标、降低验收标准 —— 交给人类。

配套三条防抖规则，缺一条都会"越改越乱"：

- **只出差异**：重规划器输出补丁，不许重写整份计划。整份重来会丢掉已完成任务的证据，PaiCLI 的 `replan()` 就是这个模式。
- **保护已完成**：不许 drop 有已完成后继的任务，不许让已完成的证据失效。
- **需要新证据 + 次数上限**：同一份计划的重规划次数封顶（建议 3 次），且每次补丁必须引用一条新的 evidence 或 discovery。连续两次补丁后可执行集没有变化，直接 escalate，不要继续空转。

## 七、人机门禁：什么时候必须停下来问人

DSH 的门禁设计可以直接抄：`exit_plan_mode` 有三个出口——Approve、Keep planning（带反馈回去改）、以及用户关掉评审卡片直接说话（模型被告知停下等消息）。Claude Code 的批准还分"用 auto 模式批准 / 手动逐个批准 / 不批准继续规划"。

执行期同样需要门禁，阈值按"改动是否越过已批准的范围"划：

- **自动应用**：补丁只在已批准的 envelope 内（不动 goal、不动 invariants、不动验收标准），自动应用并把差异叙述给用户。
- **重新评审**：补丁要改 goal、改 invariants、删掉已批准的任务、或降低验收标准 —— 重新过一遍人机门禁。
- **立即中断**：需要缩小目标、需要用户提供外部信息（密钥、账号、业务决策），停下来用 `ask_user_question` 问，不要猜。

## 八、状态与恢复：每次改计划都要落盘

这是 DSH 给的最重要的一条工程经验：`plan/mode` 是一个**落日志的整值替换事件**，resume、fork、compaction 都靠折叠日志恢复，而不是靠内存里的对象。它还有两个细节值得抄：

- **两阶段提交**：turn 开着的时候，用户改模式的意图先挂起（pending），等下一个被接受的 in-turn pre-step 才落盘，避免在请求组装到一半时改状态。
- **工具目录稳定**：`exit_plan_mode` 在非激活状态下也保持注册，进出 plan mode 只改 prompt 段落，不改工具目录，避免 KV cache 抖动。

对应到重规划：**每一次 revision 都应该是一条独立的事件**，带上 revision 号、依据的 evidence、以及被改动的任务 id。这样上下文压缩把对话摘要掉之后，计划本身还在日志里，不会凭空消失。

## 九、接到 DSH 现有 seam 上

如果要在 DSH 里实现上面这套，不用新造轮子，用现成的接法：

| 设计部件 | DSH 现有 seam |
|---|---|
| Planner 角色约束 | `plan:policy` prompt 段（部署自写 `section`） |
| Gate | `exit_plan_mode` + `ctx.userQuestions` 的 `plan-review` intent |
| 执行期活计划 | `todo_write`（整表替换，每次更新落 `todo/write` 事件） |
| 长期目标 | `create_goal` / `update_goal`（CAS revision，`edit` 需要人类） |
| escalate 问人 | `ask_user_question` |
| 每次 revision 落盘 | `session.append` 一条自定义事件 + 一个 session projection |
| 证据采集 | PaiCLI `PlanExecutionObserver` 那类观察者；DSH 侧用工具调用与结果事件 |

其中 `todo_write` 是最接近"执行期活计划"的现成能力：整表替换、per-session 归属、UI 渲染成 checklist、事件落日志。它缺的正是 `acceptance` 和 `assumptions` 两个字段——把这两个字段补进 todo 的 item 结构，DSH 的 plan mode 就具备了执行期重规划的最小骨架。

## 十、验收清单

设计做完，用这七条自查：

1. 计划里每个任务都有可执行的 acceptance，而不是"完成某某功能"。
2. 计划里每条 assumption 都有 check，且执行器会真的去验。
3. 执行器无法修改计划，只能上报 discoveries。
4. 重规划器输出的是补丁（keep/add/drop/modify），不是新计划。
5. 补丁有结构校验：无环、无悬空依赖、不删已完成后继、不动 goal/invariants。
6. 有重规划次数上限和"新证据"门槛，能挡住空转。
7. 每次 revision 落盘，resume / fork / compaction 之后计划仍在。
