---
title: AI Agent 面试题第一弹：ReAct、Plan-and-Execute、Multi-Agent 核心架构 13 题
shortTitle: 面试题：Agent 核心架构
description: 围绕 PaiCLI 21 期实战，精选 13 道 AI Agent 核心架构面试题，覆盖 ReAct 循环、Plan-and-Execute、Multi-Agent 协作、DAG 任务调度和并行工具调用。
tag:
  - Agent
  - 面试题
category:
  - AI
author: 沉默王二
date: 2026-05-11
---

大家好，我是二哥呀。

PaiCLI 的 21 期教程写完了，从 400 行 ReAct 循环一路做到了图片输入、Runtime API，基本对齐了 Claude Code 的核心能力。

接下来就是收尾阶段了——把这 21 期里的 AI Agent 知识点提炼成面试题，方便大家查漏补缺，也方便写到简历上之后能经得住面试官的追问。

第一弹，我们聚焦 **Agent 核心架构**：ReAct 循环、Plan-and-Execute、Multi-Agent 协作、异步并行。这几个是面试官最爱问的方向，也是 PaiCLI 第 1、2、5、7 期的核心内容。

## 01、什么是 ReAct 模式？它和传统的 Chain-of-Thought 有什么区别？

ReAct 是 Reasoning + Acting 的缩写，由 Yao et al. 2022 提出。核心思路是让 LLM 在推理（Thought）的同时能执行动作（Action），然后根据动作结果（Observation）继续推理，形成一个循环。

```
用户输入 → Thought → Action → Observation → Thought → ... → 最终回答
```

和 Chain-of-Thought（CoT）的区别：

- **CoT** 只推理不行动，LLM 一口气想完所有步骤，输出最终答案。适合纯推理任务（数学题、逻辑题），但碰到需要外部信息的任务就歇菜了。
- **ReAct** 边推理边行动，每一步推理之后可以调用工具获取真实信息，再基于真实结果继续推理。适合需要和外部世界交互的场景（读文件、执行命令、搜索网页）。

在 PaiCLI 中，ReAct 循环的实现在 `Agent.java`，核心就是一个 while 循环：LLM 返回 tool_calls 就执行工具，把结果塞回消息历史，再请求 LLM；LLM 不再返回 tool_calls 就结束循环。

## 02、ReAct 循环里，Agent 怎么知道该调用哪个工具？

Agent 本身不做工具选择，**工具选择完全由 LLM 决定**。

Agent 在构造请求时，会把所有可用工具的定义（名称 + 描述 + 参数 JSON Schema）放在 `tools` 字段里发给 LLM。LLM 根据用户意图和工具描述，在响应的 `tool_calls` 字段里返回要调用的工具名和参数。

这就是 OpenAI 定义的 **Function Calling** 协议，GLM、DeepSeek、Kimi 等国产模型都兼容这套协议。

PaiCLI 的做法是通过 `ToolRegistry` 维护一个工具注册表，每个工具注册时提供 name、description、parameters schema。Agent 每次请求 LLM 前，从 `ToolRegistry` 拉出全量工具定义塞进请求体。LLM 选了哪个工具，Agent 就从注册表里找到对应的执行逻辑来跑。

关键点：**工具描述的质量直接决定 LLM 的选择准确率**。描述越清晰、参数越明确，LLM 越不容易选错工具。

## 03、ReAct 循环可能无限循环吗？怎么防？

会的。常见原因有两种：

1. **工具执行失败 → LLM 反复重试同一个工具**：比如 `execute_command` 超时，LLM 不甘心，换个参数再试，又超时，无限循环。
2. **LLM 陷入自言自语**：LLM 输出一段推理但不调用工具也不给最终答案，Agent 又把这段推理塞回去请求下一轮，LLM 继续自言自语。

PaiCLI 的防护手段：

- **最大循环次数**：`AgentBudget` 设置了最大轮次上限（默认基于 token 预算动态计算），超过就强制终止。
- **工具执行超时**：`execute_command` 有 60 秒硬超时，超时工具直接返回超时结果给 LLM。
- **Token 预算**：对话历史接近上下文窗口的 80% 时，触发摘要压缩或直接终止。
- **用户取消**：运行中按 ESC 或输入 `/cancel` 可以请求取消当前 Agent run。

## 04、什么是 Plan-and-Execute 模式？它比 ReAct 好在哪？

Plan-and-Execute 是先规划后执行的两阶段模式：

1. **Plan 阶段**：把用户任务拆解成多个子任务，明确依赖关系，生成执行计划。
2. **Execute 阶段**：按计划逐个（或并行）执行子任务，每个子任务内部仍走 ReAct 循环。

和纯 ReAct 比：

| 维度 | ReAct | Plan-and-Execute |
|---|---|---|
| 适合场景 | 简单任务、单步操作 | 多步骤、有依赖的复杂任务 |
| 执行顺序 | 逐步试探 | 预先规划，按依赖顺序执行 |
| 可预测性 | 低，LLM 随机发挥 | 高，用户可以在执行前审核计划 |
| 成本 | 低（直接执行） | 略高（多一轮规划请求） |

PaiCLI 在第 2 期实现了 `PlanExecuteAgent`，用 `/plan` 命令触发。Planner 生成 JSON 格式的任务列表，包含每个任务的 id、描述、类型和依赖关系，然后按 DAG 拓扑排序执行。

## 05、Plan-and-Execute 里的 DAG 是怎么工作的？

DAG（有向无环图）用来管理子任务之间的依赖关系。每个子任务声明自己依赖哪些任务（`depends_on` 字段），形成一个有向无环图。

执行时按拓扑排序分批：

```
批次1: task_1, task_2（无依赖，可并行）
批次2: task_3（依赖 task_1）, task_4（依赖 task_2）
批次3: task_5（依赖 task_3 和 task_4）
```

同一批次内的任务可以并行执行（复用第 7 期的并行调度器），不同批次之间严格串行。

PaiCLI 的实现里，`ExecutionPlan` 持有任务列表和 DAG 关系，`PlanExecuteAgent` 在执行时调用拓扑排序拿到批次列表，逐批提交给线程池执行。

如果某个任务失败了：

- 该任务标记为 `FAILED`
- 所有直接或间接依赖它的任务自动标记为 `SKIPPED`
- 不影响和它没有依赖关系的其他任务

## 06、Multi-Agent 协作是怎么实现的？各角色分别干什么？

PaiCLI 第 5 期实现了三角色 Multi-Agent 架构：

- **Planner（规划者）**：拆解任务、分配工作、制定执行计划。
- **Worker（执行者）**：实际执行子任务，共享完整工具集（读写文件、执行命令、代码检索等）。
- **Reviewer（检查者）**：审查 Worker 的执行结果，判断是否达标，不达标则带反馈打回重做。

编排流程：

```
用户任务 → Planner 拆解 → Worker 执行 task_1 → Reviewer 审查
                                                    ↓
                                              通过 → 下一个 task
                                              不通过 → Worker 重做（最多2次）
```

`AgentOrchestrator` 是编排器，负责协调三个角色。每个角色都是一个 `SubAgent`，有独立的 system prompt 和角色定义，但共享同一套 `ToolRegistry` 和 `MemoryManager`。

和单 Agent 比，Multi-Agent 的核心价值是**关注点分离**：Planner 只管拆任务，Worker 只管执行，Reviewer 只管质量。单 Agent 什么都自己干，容易顾此失彼。

## 07、Multi-Agent 里，Reviewer 审查不通过怎么处理？

Reviewer 审查 Worker 结果后会给出判定：通过或不通过。不通过时会附带具体反馈（哪里不行、期望什么样的结果）。

处理流程：

1. Reviewer 返回"不通过 + 反馈内容"
2. Orchestrator 把反馈作为补充上下文，连同原始任务一起再次交给 Worker
3. Worker 带着反馈重新执行
4. 重新提交给 Reviewer 审查
5. 最多重试 2 次，超过次数强制标记为完成（带警告）

这个"审查-反馈-重做"循环模拟了真实团队里的 Code Review 流程。但要注意，每次重试都消耗额外的 LLM 调用，成本会翻倍，所以限制了最大重试次数。

## 08、同一轮 LLM 返回多个 tool_calls 时怎么处理？

当 LLM 认为当前步骤需要同时做多件事时（比如同时读 3 个文件），会在一次响应里返回多个 `tool_calls`。

PaiCLI 第 7 期实现了**并行工具调用**：

1. 从 LLM 响应中解析出所有 `tool_calls`
2. 通过 `ExecutorService` 提交到线程池并行执行
3. 等待所有工具执行完成（有统一超时兜底）
4. 按原始 `tool_call` 顺序拼装结果
5. 把所有工具结果一起塞回消息历史，发起下一轮 LLM 请求

按原始顺序拼装这一点很重要——LLM 的 API 协议要求 `tool_call_id` 和结果严格对应，乱序会导致模型理解错误。

并行执行的好处是显而易见的：如果 3 个文件读取各需要 100ms，串行要 300ms，并行只需要约 100ms。对于 I/O 密集型工具调用，提速非常明显。

## 09、并行工具调用会有冲突吗？怎么处理？

会。典型场景：两个工具同时写同一个文件、一个工具读文件而另一个在改同一个文件。

PaiCLI 的处理策略偏简单直接：

- **不做细粒度锁**：并行工具的冲突检测交给 LLM 来保证——如果 LLM 在同一轮返回了两个写同一文件的 tool_calls，那是 LLM 的 prompt 没写好，应该优化 system prompt 让 LLM 避免这种情况。
- **超时兜底**：每个工具有独立超时，批次有整体超时。某个工具卡死不会阻塞其他工具。
- **失败隔离**：单个工具执行失败，只返回该工具的错误信息给 LLM，不影响其他工具的结果。

这种"靠 LLM 不犯错 + 工程兜底"的设计在业界很常见。Claude Code、Cursor 等产品也基本是同样的思路。

## 10、Agent 的 Token 预算是怎么管理的？

LLM 有上下文窗口限制（GLM-5.1 是 200k，DeepSeek V4 是 1M），Agent 必须在窗口范围内工作。

PaiCLI 的 Token 预算管理：

- **动态预算**：`AgentBudget` 按当前模型的 `maxContextWindow()` 动态计算，默认取窗口的 80%。
- **摘要压缩**：对话历史接近预算时，`ContextCompressor` 对早期对话做摘要压缩——用 LLM 生成一段精炼摘要替代原始的多轮对话。
- **长上下文模式**：窗口 ≥ 100k 的模型可以开启 long 模式，跳过摘要压缩直接用原始历史，充分利用大窗口。
- **成本可视化**：每轮输出当前 token 使用量、缓存命中量、估算成本。

关键公式：`可用预算 = maxContextWindow × 80% - system_prompt_tokens - tools_definition_tokens`。

剩余可用空间全部留给对话历史和工具结果。

## 11、Plan-and-Execute 的 Human-in-the-Loop 确认机制是怎么设计的？

PaiCLI 的 Plan-and-Execute 在计划生成后、执行前会暂停等待用户确认：

- **回车**：按当前计划执行
- **ESC**：取消本次计划
- **I**：输入补充要求，让 Planner 重新规划

这个设计是受 Claude Code 启发——Claude Code 在执行高风险操作前也会暂停等用户确认。

实现上，`PlanReviewInputParser` 在 JLine3 终端里监听按键事件，根据用户按键走不同分支。按 I 后收集用户的补充内容，拼接到原始任务里重新调用 Planner 生成新计划。

这个确认机制的核心价值是**可控性**——用户能在 Agent 真正动手之前审核它的计划。特别是涉及文件写入、命令执行这种不可逆操作时，提前看一眼计划能避免很多问题。

## 12、ReAct、Plan-and-Execute、Multi-Agent 三种模式怎么选？

实际使用中的选择原则：

| 场景 | 推荐模式 | 原因 |
|---|---|---|
| 简单问答、单文件修改 | ReAct | 一两步就能搞定，规划是浪费 |
| 创建项目、多文件重构 | Plan-and-Execute | 步骤多、有依赖，需要先规划 |
| 大规模任务、需要质量保障 | Multi-Agent | 分工协作 + 审查机制 |

PaiCLI 的设计是**默认 ReAct**，用户显式输入 `/plan` 或 `/team` 才切换模式，执行完自动回到 ReAct。

这个设计背后的考虑是：**大多数交互是简单的**。日常使用中 80% 的请求 ReAct 就能搞定，强制走 Plan-and-Execute 反而增加一轮 LLM 调用的延迟和成本。

## 13、如果让你从零设计一个 Agent 架构，你会怎么做？

这是一道开放设计题，面试官想看你的架构思维。参考 PaiCLI 的演进路径，推荐这样回答：

**第一步：最小可用的 ReAct 循环**。一个 while 循环 + LLM 客户端 + 工具注册表，400 行代码就能跑。先跑通"用户输入 → LLM 推理 → 工具调用 → 结果回灌 → 继续推理"这条链路。

**第二步：加防护**。Token 预算、循环次数上限、工具超时——这三个不加，Agent 会失控。

**第三步：按需加复杂度**。任务复杂了加 Plan-and-Execute，质量要求高了加 Multi-Agent，工具多了加并行调度。

**设计原则**：

- 抽象 `LlmClient` 接口，不绑死某个模型
- 工具注册表是核心扩展点，新功能 = 新工具
- 消息历史是 Agent 的"记忆"，按 OpenAI 协议的 role/content/tool_calls 格式维护
- 可观测性从第一天就要有（日志、token 用量、工具调用记录）

## ending

这 13 道题覆盖了 Agent 核心架构的主要知识点：ReAct 循环、Plan-and-Execute、Multi-Agent 协作、DAG 调度、并行工具调用、Token 预算管理。

下一篇我们进入**记忆与上下文工程**——Memory 系统、RAG 检索、长上下文策略，这块在面试中出现的频率也非常高。
