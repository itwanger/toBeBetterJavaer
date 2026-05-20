---
title: 技术 Leader：“还在 Vibe Coding 呢？就不能让 Agent 自己干？”我微微一笑：“我正在做这样一个Agent CLI 呢”，领导：“这么厉害？”
shortTitle: 面试题：Agent 进阶10题
description: 围绕 PaiCLI 实战源码，精选 10 道 AI Agent 进阶面试题，覆盖上下文压缩、长任务持久化、Hook 机制、规划能力、Agent 框架选型、微调数据集、Agent 与 Workflow 边界等硬核主题。
tag:
  - 面试
category:
  - AI
author: 沉默王二
date: 2026-05-14
---



大家好，我是二哥呀。

昨天又高强度肝了一天的 PaiCLI Agent，把整个交互体验又提升了一个档次。

200 刀的 Codex 消耗了 50% 的额度，我只能说终端 CLI 的开发，不管是 Claude Code 还是 Codex，都还缺一块。

![](https://cdn.paicoding.com/stutymore/sucai-20260514131916.png)

缺一块像 use browser 那样直接在浏览器里的调试，有些 bug 的解决必须得人工介入去调查，调查清楚后再引导 Agent 才能解决。

啧啧啧。

好在功夫不负有心人，深入研究了 jline 这个库的源码后，终于把棘手的 bug 都解决了。

![](https://cdn.paicoding.com/paicoding/1bb7741a4a852ef958f6b0bd2b9d8658.jpg)

现在的交互体验已经很接近 Qoder CLI 了。

做这个项目的过程当中，我对整个 AI Agent 的技术栈，包括 ReAct、Multi-Agent、RAG、Memory 机制、MCP、tool use 等等，各个方面都有了更深入的理解。

也搞清楚了，在使用 Codex、Claude Code 进行 Vibe Coding 的时候，用什么样的 prompt，能让 Agent 更出色地完成任务。

> 全文比较肝，系好安全带，我们出出出发～ 😄

## content

### 01、你的 AI 项目的亮点是什么？

老王翻了翻我的简历，很快锁定了 PaiCLI 这个项目，他饶有兴趣地问：“这个终端 Agent 工具，你觉得最大的亮点在哪？”

我说：“最大的亮点是，整个项目从零到一完全靠 Vibe Coding 完成的，用 Claude Code 和 Codex 做主力开发，我自己写的代码不超过 5%。”

老王挑了挑眉：“那不就是 AI 写的？你能讲清楚里面的技术细节吗？”

我笑了笑：“能，因为每一行代码我都 review 过，每一个架构决策都是我做的。Vibe Coding 不是把任务丢给 AI 就完事了，prompt 怎么写、架构怎么拆、出了 bug 怎么引导 Agent 去定位，这些全是人的活儿。”

![](https://cdn.paicoding.com/paicoding/da13c27247c7c434ea77cac4b40d6b9e.jpg)

（内心 OS：老王这是在试探我到底是写代码的还是复制粘贴的 🤣）

“说回项目本身，PaiCLI 有几个我觉得比较硬核的点。”

![](https://cdn.paicoding.com/paicoding/fae5ff4db3b752cafdad050fafb5a14c.jpg)

第一个是完整的 ReAct 循环。

不是简单的一问一答，而是 LLM 推理 → 工具调用 → 观察结果 → 继续推理的完整循环。支持单轮最多 20 次迭代，4 个工具并行执行，还有动态 Token 预算管理。

第二个是三层记忆系统。

短期记忆用 ConversationMemory 管理当前对话，长期记忆用 SQLite 持久化跨会话的知识，中间还有一个 ConversationHistoryCompactor 做上下文压缩，90% 窗口占用时自动触发摘要。

第三个是 MCP 集成。

通过 MCP 接入外部工具生态，支持 stdio 和 HTTP 两种传输协议，Chrome DevTools MCP 可以直接操作浏览器。

![](https://cdn.paicoding.com/paicoding/68c1df6fc1a320e6a8a1e982f1a9aa53.png)

第四个是 Plan-and-Execute + Multi-Agent 协作。

复杂任务先由 Planner 拆解成 DAG，然后 Worker 并行执行，Reviewer 逐个审核，失败的任务还能自动重试。

老王点了点头：“听起来功能确实不少。那我们挑几个深入聊聊。”

### 02、上下文压缩算法的触发条件是什么？

老王第一个追问就直奔技术细节：“你刚提到上下文压缩，触发条件是什么？压缩算法怎么设计的？”

我说：“触发条件是，当前对话历史的 Token 数量达到上下文窗口的 90% 就触发。”

在 PaiCLI 里，Agent 每一轮迭代开始前都会调用 `maybeCompactHistory()` 做检查。这个方法会用 `estimateTokens()` 估算当前对话历史的 Token 总数，如果超过了 `compressionTriggerTokens()`（也就是窗口大小的 90%），就触发压缩。

比如用的模型支持 128K 上下文，那触发阈值就是 115K 左右。

为什么选 90% 而不是 80% 或 95%？太早压缩会丢信息，太晚压缩可能来不及，90% 是一个实测出来的平衡点。

![](https://cdn.paicoding.com/stutymore/build-agent-p3-memory-20260420221555.png)

压缩算法分四步走。

第一步，找到分割点。

遍历对话历史，找到所有 user 角色消息的位置，保留最近 3 轮对话不动，把更早的历史标记为“待压缩区间”。分割点必须卡在 user 消息的边界，这一点很关键，因为 tool_call 和 tool_result 必须成对出现，如果从中间截断，LLM 会困惑。

```java
// 保留最近 3 轮，更早的历史做摘要
int splitIdx = userMessageIndices.get(userMessageIndices.size() - retainRounds);
```

第二步，调用 LLM 做摘要。

把待压缩区间的消息格式化成文本，限制在 60000 字符以内，发给 LLM 让它生成 1-3 段的摘要。这里用的是独立的 LLM 调用，不会和主对话混在一起。

![](https://cdn.paicoding.com/paicoding/91311d410532c36402cc4caf70f8f8e2.png)

第三步，重建对话历史。

新的历史变成：系统提示词 → 一条 user 消息，内容是“已压缩的历史对话摘要” → 一条 assistant 确认消息，内容是“好的，我已了解之前的上下文” → 最近 3 轮完整对话。

第四步，记录日志。输出压缩前后的 Token 数和消息数对比，方便调试。

老王追问：“**那压缩后摘要质量不行怎么办？关键信息丢了，后续对话不就偏了吗？**”

我说：“先说一个现有的保护措施：保留最近 3 轮完整对话，这里面通常包含了当前任务的核心上下文。更早的历史被摘要压缩后，即使丢了一些细节，只要最近几轮的信息完整，LLM 一般还能正常推理。”

### 03、长任务在你的项目中是怎么做的？

“如果一个任务执行好几天、步骤特别多，你们怎么处理？”老王问出了一个很现实的问题。

我说：“PaiCLI 引入了 DurableTaskManager，专门解决长任务持久化的问题。”

![](https://cdn.paicoding.com/paicoding/6963567c298e1c0e7bca36c551676899.jpg)

核心思路是把任务状态持久化到 SQLite，用后台线程池异步执行，即使进程重启也能恢复。

整个生命周期是这样的：`enqueued → running → completed/failed/canceled`。用户提交任务时，DurableTaskManager 会生成一个 UUID 作为任务 ID，写入 SQLite 的 `runtime_tasks` 表，状态设为 `enqueued`。

```java
DurableTask enqueue(String prompt) {
    // 生成 UUID，INSERT 到 runtime_tasks
    // 通知 worker 线程有新任务
    return task;
}
```

后台有一个 worker 线程池，默认 2 个线程（可以通过 `PAICLI_TASK_WORKERS` 环境变量调整）。

每个 worker 循环查询 `enqueued` 状态的任务，按先进先出的顺序取出执行。执行过程就是启动一个 Agent.run()，带上 CancellationToken 支持中途取消。

**最亮眼的设计是进程恢复机制**。

DurableTaskManager 启动时会调用 `recoverRunningTasks()`，扫描数据库里所有 `running` 状态的任务——这些是上次进程意外退出时正在执行的任务——把它们重置为 `enqueued`，让 worker 重新执行。

```java
void recoverRunningTasks() {
    // 找到上次进程退出时还在 running 的任务
    // 重置为 enqueued，重新排队
}
```

老王问：“**那任务执行到一半重启了，不会从头开始吗？**”

我说：“目前确实是从头开始的，因为 Agent 的对话历史没有持久化。这是一个 trade-off，如果要做断点续传，需要把每一轮迭代的对话历史和工具执行状态都序列化到数据库，复杂度会高很多。目前的策略是，长任务尽量拆成多个小任务提交，每个小任务的执行结果通过长期记忆保存下来，后续任务可以从记忆里恢复上下文。”

![](https://cdn.paicoding.com/paicoding/60758dc541c051c8f17f857e0b02a67c.jpg)

（内心 OS：这个回答应该比较实在，老王应该满意了吧 😏）

老王追问了一句：“用户怎么监控这些后台任务？”

我说：“提供了一套 CLI 命令：`/task list` 查看任务列表，`/task status <id>` 查看单个任务的执行进度，`/task cancel <id>` 可以终止正在执行的任务。cancel 的实现是通过 Thread.interrupt() 中断 worker 线程，同时把数据库里的状态更新为 `canceled`。”

### 04、有了解 Claude Code 的 Hook 机制吗？解释一下

老王突然换了个方向：“Claude Code 你肯定用过吧？它的 Hook 机制你了解多少？”


![](https://cdn.paicoding.com/paicoding/1f3c93723e8fc3c6bdcc177ba3906f95.png)


我说：“了解，而且我自己就在用。Hook 是 Claude Code 提供的一种生命周期回调机制，允许用户在特定事件触发时自动执行 Shell 命令。”

简单说，Hook 就是在 Claude Code 的工作流程中插入的'钩子'，在特定的时间点自动执行用户定义的脚本。

![](https://cdn.paicoding.com/paicoding/46e3b5f336e02495d34886d379f7b69c.jpg)

Claude Code 支持几种 Hook 事件。

- `PreToolUse` 在工具调用之前触发，可以用来做参数校验或者阻止危险操作。
- `PostToolUse` 在工具调用之后触发，可以用来做日志记录或者触发后续流程。
- `Notification` 在 Claude Code 需要通知用户时触发。
- `Stop` 在 Agent 停止时触发。

配置方式是在 `.claude/settings.json` 里加一个 `hooks` 字段，每个 Hook 定义匹配的事件类型和要执行的命令。

举个实际的例子：我在写 PaiCLI 的时候，配了一个 `PostToolUse` Hook，每次 Claude Code 修改完 Java 文件后自动跑一遍 `mvn compile`，编译不过的话 Hook 的 stderr 输出会自动反馈给 Claude Code，它就知道刚才的改动有编译错误，会自动修复。

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "write_file",
        "command": "if [[ \"$TOOL_INPUT\" == *.java ]]; then mvn compile -q 2>&1; fi"
      }
    ]
  }
}
```

老王追问：“**那 PaiCLI 自己有没有类似的 Hook 机制？**”

我说：“PaiCLI 没有用户层面的 Hook 配置，但在代码层面有类似的生命周期集成点。比如 `ToolRegistry` 里的 `WriteFileObserver`，每次写文件后会通知 InlineRenderer 渲染 diff。还有 LSP 诊断注入，write_file 执行完后 `LspManager.reportPostEdit()` 会收集编译诊断信息，在下一轮 Agent 迭代时自动注入到对话历史里，效果和 Claude Code 的 Hook 类似，只是实现方式不同。”

老王面露悦色：“你把两个产品的同类机制做了对比，不错。”

### 05、在 Agent 的设计中，有哪些主流方法可以赋予 LLM 规划能力？

“继续聊规划能力。”老王翘着二郎腿问，“主流的方法有哪些？各自的优缺点呢？”

我说：“目前业界主流的有四种方法。”

第一种是 ReAct，也就是 Reasoning + Acting。

LLM 每一步推理完就立刻执行，根据执行结果再推理下一步。优点是实现简单、反馈即时，PaiCLI 的核心 Agent 循环就是这个模式。缺点是缺乏全局视角，LLM 容易“走一步看一步”，在复杂任务上可能走弯路。

![](https://cdn.paicoding.com/paicoding/2b87dffe07ccdfb8256df30f8602806c.png)

第二种是 Plan-and-Execute。

先让 LLM 生成一个完整的执行计划，通常是一个 DAG，然后按拓扑顺序逐步执行。PaiCLI 的 Planner 就是这个思路。它会分析用户目标里有没有“然后”“并且”“先”“之后”这些多步骤线索词，有的话就走 Plan 模式，否则走单步 ReAct。

```java
// Planner.java 里的判断逻辑
boolean isSimpleGoal(String goal) {
    // 检查有没有多步骤线索词
    // "然后""并且""先""之后""接着"...
}
```

![](https://cdn.paicoding.com/paicoding/81e521d5e99bf9ab4c0e16792eb823bf.jpg)

第三种是 Tree of Thoughts（ToT）。

和 Plan-and-Execute 不同，ToT 不是生成一个计划就执行，而是同时探索多条推理路径，用评估函数打分，选最优的路径继续。可以理解为在推理空间里做了一次广度优先搜索。适合需要创意或者解空间很大的任务，但 Token 消耗很高，工程落地的案例不多。

第四种是 Reflexion。

让 LLM 在执行完任务后自我反思，把反思结论存到记忆里，下次遇到类似任务时参考。有点像人类的复盘。

PaiCLI 的 Multi-Agent 架构里有个 Reviewer 角色，审核失败的任务会生成反馈注入到 Worker 的重试执行中，这和 Reflexion 的思路是相通的。

![](https://cdn.paicoding.com/paicoding/67acb28809d05d2d35f283fcc3a02059.jpg)

老王追问：“**你在实际开发中，怎么选？**”

我说：“大多数场景 ReAct 就够了。只有当用户的指令里明显包含多个步骤、而且步骤之间有依赖关系时，才启动 Plan-and-Execute。ToT 和 Reflexion 更多是学术上的探索，工程上的 ROI 不高。我的经验是，80% 的任务 ReAct 搞定，15% 的任务需要 Plan，剩下 5% 可能需要人工介入拆解。”

### 06、有微调过 Agent 能力吗？数据集如何收集？

老王问了一个我没完全预料到的问题：“有微调过 Agent 的能力吗？”

我说：“PaiCLI 本身没有做过模型微调，因为我们用的是闭源模型的 API，比如 GLM、DeepSeek、Kimi。但这个问题我有认真思考过，也做过一些调研。”

（内心 OS：虽然没亲手微调过，但理论基础还是要有的，不能露怯 😤）

Agent 微调和普通的 SFT 最大的区别在于，数据集不是简单的问答对，而是完整的**工具调用轨迹**，包括 LLM 的推理过程、tool_call 的参数、工具执行结果、以及 LLM 基于结果的后续推理。

数据集收集有几种常见的方式。

第一种是日志回放。把生产环境中 Agent 的完整对话日志收集起来，筛选出执行成功的案例，整理成训练数据。PaiCLI 的对话历史格式天然就是 `[user, assistant(tool_calls), tool(result), assistant]` 这种结构，直接就能作为微调数据。

![](https://cdn.paicoding.com/paicoding/22c74f58f0f70945dc0ecc9011857550.jpg)

第二种是拒绝采样（Rejection Sampling）。给模型同一个任务跑多次，有的成功有的失败，只保留成功的轨迹。这种方式的好处是能自动生成大量高质量数据，缺点是计算成本高。

第三种是人工标注。让标注员模拟 Agent 的行为，手动选择每一步应该调用什么工具、传什么参数。质量最高但成本也最高。

第四种是 DPO（Direct Preference Optimization）。收集同一个任务的好/坏两个轨迹，让模型学会偏好好的轨迹。比如一个文件读取任务，好的轨迹是直接 `read_file("pom.xml")`，坏的轨迹是先 `list_dir(".")`，再 `list_dir("./src")`，然后才 `read_file("pom.xml")`——绕了远路。

![](https://cdn.paicoding.com/stutymore/paismart-rag-mianshi-20260415113939.png)

老王点头：“**那如果让你微调，你会怎么做？**”

我说：“我会从日志回放入手。PaiCLI 每次对话的完整历史都可以导出为 JSONL 格式，筛选条件是任务执行成功、工具调用次数在合理范围内、没有触发 Token 预算超限。大概积累个几千条高质量轨迹，用 LoRA 对一个开源模型做微调，重点优化工具选择的准确率和参数填充的正确率。”

### 07、说一下 LangChain 和 LlamaIndex 的区别？

老王话锋一转：“说说 LangChain 和 LlamaIndex，这两个框架你怎么理解？”

我说：“一句话概括的话，LangChain 侧重编排，LlamaIndex 侧重检索。”

![](https://cdn.paicoding.com/paicoding/55532f4febb2b7def31688de2626efd7.jpg)

LangChain 的核心能力是把 LLM、工具、记忆、外部数据源这些组件串联起来，构建复杂的 Agent 工作流。

它提供了 Chain、Agent、Memory、Tool 这些抽象。可以把 LangChain 理解为 AI 应用的“胶水框架”，它解决的是“怎么把各种能力组合起来”的问题。

LlamaIndex 的核心能力是数据索引和检索。

它擅长的事情是把各种格式的文档，如 PDF、网页、数据库，加载进来，切分成 chunk，建立向量索引，然后在用户提问时做相似度检索，返回相关片段。它解决的是“怎么从大量数据中找到相关信息”的问题。

| 维度       | LangChain                | LlamaIndex         |
| ---------- | ------------------------ | ------------------ |
| 核心定位   | 应用编排框架             | 数据索引与检索引擎 |
| 擅长场景   | 多步骤 Agent、工作流串联 | RAG、知识库问答    |
| 数据处理   | 有但不是重点             | 核心能力           |
| Agent 支持 | 成熟（ReAct、Plan 等）   | 有但偏简单         |
| 生态集成   | 工具集成丰富             | 数据连接器丰富     |

实际项目中这两个框架经常搭配使用。比如用 LlamaIndex 做数据索引和检索，把检索结果喂给 LangChain 的 Agent 做进一步推理和工具调用。

老王追问：“**那你们 PaiCLI 用了哪个？**”

我说：“都没用。PaiCLI 是 Java 生态，这两个都是 Python 框架。我们用的是 Spring AI 做 LLM 集成，自己写的 Agent 循环、Memory 管理和工具注册。不过 PaiAgent 那个项目用了 LangGraph4j，这是 LangChain 团队出的 Java 版图编排库。但说实话，LangGraph4j 的文档和社区活跃度和 Python 版差距很大，踩了不少坑。”

### 08、你用过哪些 Agent 框架？选型是如何选的？

老王接着问：“除了 LangGraph4j 和 Spring AI，你还用过或者调研过哪些 Agent 框架？选型的时候怎么评估？”

我说：“调研过不少，选型的时候主要考虑四个维度。”

![](https://cdn.paicoding.com/paicoding/8b916209cae6aefacea48e5acd64e169.jpg)

第一个维度是语言生态。我们的主力技术栈是 Java + Spring Boot，所以 Python 的框架只能作为参考。Java 生态里能用的选择不多，Spring AI 是最成熟的，LangGraph4j 是 LangChain 团队官方出的 Java 版本。

第二个维度是抽象粒度。有的框架抽象太高，封装了太多细节，出问题很难排查。有的框架抽象太低，相当于自己从零写。Spring AI 的抽象粒度比较合适，它提供了 ChatClient、FunctionCallback 这些核心接口。

第三个维度是社区活跃度。LangChain 版社区很活跃，Star 有 10 万+。

第四个维度是和已有系统的集成成本。PaiCLI 的后端是 Spring Boot，Spring AI 天然就能注入 Bean、用 Starter 配置。LangGraph4j 是独立的图引擎，集成进 Spring 需要自己写适配层，就是 PaiAgent 里 NodeAdapter 和 ChatClientFactory 干的事情。

老王追问：“**你有没有考虑过 AutoGen 或者 CrewAI？**”

![](https://cdn.paicoding.com/paicoding/6302a934ce8754489b5ee5a697d51fcf.jpg)

我说：“调研过。AutoGen 是微软出的 Multi-Agent 框架，核心理念是多个 Agent 之间通过消息传递协作。它的 Python 版设计很优雅。CrewAI 更偏向“角色扮演”，给每个 Agent 定义一个角色，如产品经理、程序员、测试，然后让它们协作完成任务。PaiCLI 的 Multi-Agent 架构借鉴了 AutoGen 的思路，用 Planner、Worker、Reviewer 三种角色，但实现上是自己写的，没有依赖第三方框架。”

“我的选型原则是：核心 Agent 循环自己写，LLM 调用用 Spring AI，复杂的图编排才考虑引入 LangGraph4j。自己写的好处是完全可控，出了问题能直接改源码，不用等框架发版修 bug。”

### 09、你怎么理解 Agent 和 Workflow 的边界？

老王喝了口水，问了一个更宏观的问题：“Agent 和 Workflow，这两个概念你怎么理解？边界在哪？”

我说：“最核心的区别是自主决策权。”

Workflow 是确定性的，节点是什么、顺序怎么走、在哪分支，全部在设计时就定好了。运行时只是按部就班地执行。PaiAgent 里的工作流就是典型的例子，用户在前端拖拽编辑器里画好节点和连线，运行时 LangGraph4j 按照图的拓扑顺序执行，LLM 只在单个节点内部做推理，不会改变整体的流程走向。

![](https://cdn.paicoding.com/paicoding/5aa9b60de477dda11f71b488698adc34.jpg)

Agent 是不确定的，给它一个目标，它自己决定执行什么工具、执行多少轮、什么时候停下来。

PaiCLI 的 ReAct 循环就是这个模式，LLM 每一轮都在做决策：我要不要调用工具？调用哪个工具？参数是什么？执行结果符合预期吗？需要继续吗？

用一个生活化的比喻，Workflow 像流水线工人，每一步干什么都有 SOP。Agent 像项目经理，给他一个目标，他自己拆解任务、分配资源、处理异常。

![](https://cdn.paicoding.com/paicoding/0bfc82c7583b6f1a1e08977b4630e0a4.jpg)

**那什么时候用 Workflow，什么时候用 Agent？**

我的经验是看两个指标。

第一个是流程的确定性。如果业务流程是固定的，比如“先翻译 → 再润色 → 最后配音”，用 Workflow，因为执行路径是确定的，可以做监控、做审计、做回溯。

第二个是对错误的容忍度。Workflow 出错了可以精确定位到某个节点，Agent 出错了可能整个推理链都得回溯。对错误零容忍的生产场景，比如财务报表生成，用 Workflow 更安全。

![](https://cdn.paicoding.com/paicoding/63086cd06b096b1bd215c8ee5fd669b2.jpg)

老王追问：“那两者能结合吗？”

我说：“完全可以，PaiCLI 就是两者结合的例子。Workflow 的某个节点内部可以跑一个 Agent 循环，让 LLM 自主决策怎么处理这个节点的任务。反过来，Agent 在推理过程中也可以触发一个预定义的 Workflow。PaiAgent 的 LLM 节点就是这样的，每个 LLM 节点本质上是一个 mini Agent，它可以调用 Function Calling，进行多轮工具调用，但它被嵌套在 Workflow 的确定性流程里。”

### 10、提取摘要的时候如何避免摘要提取错误导致上下文扭曲？

老王问了最后一个问题：“你们上下文压缩用的是 LLM 做摘要，那如果摘要提取错了呢？关键信息丢了、意思歪曲了，后续的推理不就全偏了吗？”

我说：“这是上下文压缩最大的风险点，也是我在开发 PaiCLI 的时候反复调试过的问题。”

![](https://cdn.paicoding.com/paicoding/0dcb45951dc433920f0f2f9d64550411.jpg)

第一个策略是分割点卡边界。

前面聊过，压缩时分割点必须卡在 user 消息的边界，保证 tool_call 和 tool_result 成对出现。如果从一组工具调用的中间截断，摘要里就会出现“调用了工具但没有结果”或者“有结果但不知道是什么调用”的断裂信息，LLM 会根据这种不完整信息做出错误推理。

第二个策略是保留近期上下文。

压缩只动历史消息，最近 3 轮对话完整保留。这意味着当前任务相关的直接上下文不会被摘要，摘要质量再差也不会影响到最近的推理链。

第三个策略是摘要 prompt 的精心设计。

给 LLM 做摘要时，prompt 里明确要求“保留所有文件路径、变量名、错误信息等具体细节”，不要只输出泛泛的总结。这一点很关键，因为 LLM 默认做摘要时倾向于抽象化，会把“读取了 pom.xml，发现版本号是 3.4.1”压缩成“检查了项目配置文件”，后者丢失了关键信息。

第四个策略是输入长度限制。

待压缩的文本限制在 60000 字符以内。如果对话历史特别长，超出这个限制的部分会被截断。这看起来像是在丢信息，但实际上更早的历史和当前任务的关联度已经很低了，与其让 LLM 处理一个超长的输入导致摘要质量下降，不如只处理最有价值的那部分。

```java
// 限制摘要输入长度
String textToSummarize = historicalText;
if (textToSummarize.length() > 60000) {
    textToSummarize = textToSummarize.substring(
        textToSummarize.length() - 60000);
}
```

## 如何写到简历上？

### 智能终端助手｜ Agent 开发｜ PaiCLI 2026-03 ～ 至今

项目简介：基于 Java + Spring AI 的终端 AI Agent 工具，支持 ReAct 循环、Multi-Agent 协作、MCP 工具生态集成、三层记忆系统和异步任务管理，可在终端中通过自然语言驱动代码开发和调试。

![](https://cdn.paicoding.com/paicoding/b33dab9a052afbea1e4db25afbaf43d7.png)

技术栈：Java 21、Spring Boot 3.4、Spring AI 1.0、JLine 3、SQLite、JGit、Chrome DevTools Protocol

核心职责：

1. 基于 ReAct 实现核心 Agent 循环，支持 4 个工具并行执行和动态 Token 预算管理，上下文压缩算法在 90% 窗口占用时自动触发摘要，保留最近 3 轮完整对话。
2. 设计长任务持久化方案，基于 SQLite 存储任务状态，后台 Worker 线程池异步执行，支持进程重启后自动恢复未完成任务。
3. 实现三层记忆系统：短期记忆管理当前对话、长期记忆用 SQLite 持久化跨会话知识、Compactor 做边界感知的上下文压缩，支持 BM25 + 余弦相似度混合检索。
4. 集成 MCP 接入外部工具生态，支持 stdio/HTTP 双传输协议和 Schema 自动裁剪，并通过 HITL 审批机制实现工具调用的安全管控。
5. 构建 Plan-and-Execute + Multi-Agent 架构，Planner 将复杂任务拆解为 DAG，Worker 并行执行，Reviewer 审核质量并支持自动重试，最大并行 4 线程。

