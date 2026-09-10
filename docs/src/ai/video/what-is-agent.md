面试官问你：“什么是 Agent？和直接调大模型 API 有什么本质区别？”如果你回答“Agent 就是加了 system prompt 的大模型调用”，那这道送分题，你又没能稳稳接住。

为什么？

因为只加 system prompt 还不能叫 Agent。它只是给模型加了一层行为约束，真正的 Agent 还需要 tool call、ReAct 决策和 Harness 环境。

哈喽大家好，我是二哥呀。今天用 3 分钟，带你吃透 Agent 和 LLM API 调用的本质区别。

拿到这道题，先想清楚面试官考什么。

他问“什么是 Agent”，表面在问概念，实际在考察三件事：

第一，你对 Agent 的理解是不是架构级的；第二，你能不能说清它和直接调 API 的本质区别；第三，你有没有真正搭过 Agent。

好，接下来给你满分回答，照着背就完事了。三个本质区别。

第一个，一问一答 vs 循环决策。

直接调 API 是什么？发一条 prompt，拿一条 completion，结束。下一步做什么，你的代码说了算，流程写死在业务逻辑里。

Agent 不一样。核心是一个 ReAct 循环——LLM 自己想下一步做什么，然后调用工具执行一个动作，拿到反馈结果后，再想，再做，直到任务完成。

更准确地说，下一步“做什么”的决策由 LLM 决定，而“能不能做、怎么执行、失败了怎么处理、什么时候停止”由 Agent Harness 控制。

第二个，只会说 vs 能动手。

直接调 API，用户问“北京天气怎么样”，模型只能从训练数据里编一个答案，可能是去年的，也可能现编的。

Agent 呢？LLM 判断出“需要实时数据”，通过 Function Calling 返回 tool_calls，指定调用 query-weather，参数 city 等于北京。Agent 执行调用，拿到真实结果——晴，32度，再基于真实数据生成回答。

换句话说，直接调 API 不会主动去查实时数据，Agent 的区别在于：LLM 可以判断自己需要实时数据，生成 tool_calls，由 Harness 执行工具，再把结果喂回模型继续推理。

第三个，失忆 vs 有状态。

直接调 API 是无状态的，每次调用相互独立，上一轮聊了什么它不知道，除非你手动把对话历史拼进 prompt。

Agent 通常由 Harness 维护运行状态：当前任务、历史消息、工具调用结果、失败原因、剩余步骤。LLM 基于这些状态继续决策，所以 Agent “有记忆”。

面试官如果追问：“RAG 算不算 Agent？”

不算。RAG 是固定模式：检索文档、塞进 prompt、生成回答，每一步都是代码写死的。

什么时候才算 Agent？当 LLM 自己决定要不要检索、用什么 query、结果够不够用、要不要换个关键词再搜一轮——有了这个决策循环，才叫 Agent。

换句话说，Agent 不是“加了 system prompt 的大模型”，而是 Model + Harness。Model 负责理解目标、规划下一步、选择工具；Harness 提供工具、维护状态、执行调用、控制权限、处理失败和终止循环。

所以 Agent 和直接调 API 的本质区别，不是有没有 prompt，而是有没有 ReAct。模型根据当前状态决定下一步，Agent 执行动作，把结果再交给模型，直到任务完成。

这道题你学废了吗？想解锁更多 Agent 面试题的源码级拆解，点赞关注，我是二哥，下期见！

![](https://cdn.paicoding.com/stutymore/what-is-agent-1cfeb82c1e39037e1b8846e83ecac575.png)

![](https://cdn.paicoding.com/stutymore/what-is-agent-07614bc4f94d86d8dafdd9352e9072c1.png)