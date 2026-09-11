面试官问你：“Agent 的 Plan 模式有哪些实现方式？”

如果你回答：“不就是让大模型把任务拆成步骤一、步骤二，然后顺序执行嘛。”那面试官听完直摇头，认为你只写过 Demo，根本没在真实工程里实践过。

这道题考察的是不同场景下的工程权衡。Plan-and-Execute 适合确定性强的多步骤长流程任务；图状多路径搜索规划（Graph-based Planning）适合数学推导、复杂代码生成和逻辑博弈。

基于反思与自我纠错的规划(Reflective Planning)适合易出错、需要试错调整的开放任务；SOP 和状态机规划适合工业级落地、合规要求高的业务流程。

![](https://cdn.paicoding.com/stutymore/agent-plan-modes-01-overview-20260911105933-5c13d5b9.png)

哈喽大家好，我是二哥呀。今天花三分钟，带你彻底吃透这道 Agent 高频架构面试题。

告诉面试官，Plan-and-Execute 的核心是把规划与执行解耦。通常用高智商的强模型作为 Planner 规划器，一次性把目标拆成步骤一、步骤二；再交给轻量高效的小模型作为 Executor 执行器，依次调用工具。

LangChain 里的 Plan-and-Execute 就是这个思路。相比走一步看一步的 ReAct，它有了全局视角，不容易被局部的工具细节带偏。

![](https://cdn.paicoding.com/stutymore/agent-plan-modes-02-plan-execute-20260911110113-0c0f2553.png)

那面试官肯定会继续问你：“如果某一步执行报错了，后面的计划该怎么动态调整？”

告诉面试官，上基于反思与自我纠错的 Reflective Planning，在每步执行后插入反思评估环节。

系统拿着工具返回的结果和预期目标对比：成功了吗？有没有偏离？

一旦报错或偏离，规划器立刻介入，根据最新的上下文动态重排剩余的步骤。这样 Plan 模式就具备了动态容错能力。

![](https://cdn.paicoding.com/stutymore/agent-plan-modes-03-reflection-20260911110245-090e74f2.png)

那面试官如果继续深挖：“遇到需要多路径探索的复杂难题，怎么办？”

告诉面试官，上图状多路径搜索规划（Graph-based Planning），比如思维树（Tree of Thoughts）和蒙特卡洛树搜索（MCTS）。就像高手下围棋，脑子里要同时预判多种走法。

之前的模式都是串行的，一步接一步；而图状规划是规划了一张四通八达的网状路线图。在需要关键决策的分叉口，Agent 不再只给一种解决方案，而是同时给出方案 A、方案 B、方案 C 等多条解题路径。

然后再由评估器打分，优先沿着胜率最高的分支推演。走不通的话，再回溯换其他路，这样就能找出最优的解题思路。

在数学推演、复杂代码生成和逻辑博弈等高难度场景下，Graph-based Planning 会非常高效。

![](https://cdn.paicoding.com/stutymore/agent-plan-modes-04-tree-search-20260911110528-93463af0.png)

如果面试官继续追问：“企业级业务里，合规要求极高，怎么办？”

告诉面试官，上 SOP 和状态机规划。企业级的业务场景最怕不受控制，一旦 LLM 跳过了某个前置环节，就会带来严重的业务风险。

SOP 和状态机规划的核心逻辑是，用确定性的工程骨架，去约束大模型，LangGraph 就是典型代表。

具体怎么做呢？由开发者预先定义好标准的业务流程（SOP）和状态转化图（如状态机）。LLM 的“规划”被严格限定在给定的路由分支和状态节点间做出选择，而不是自由生成任意步骤。

![](https://cdn.paicoding.com/stutymore/agent-plan-modes-05-state-machine-20260911110739-aefbdb91.png)

最后简单总结下。

确定性强的多步骤长任务，用 Plan-and-Execute，全局清晰；

易出错、需要动态试错的开放任务，用 Reflective Planning，动态纠偏；

复杂的数学推导与代码生成，用 Graph-based Planning，多路径全局搜索；

至于企业级的生产场景，SOP 和状态机规划则是定海神针。

想解锁更多 Agent 面试题的源码级拆解，点赞关注，我是二哥，咱们下期见！

![](https://cdn.paicoding.com/stutymore/sucai-20260911111102.png)

![](https://cdn.paicoding.com/stutymore/sucai-20260911111109.png)

![](https://cdn.paicoding.com/stutymore/sucai-20260911111116.png)