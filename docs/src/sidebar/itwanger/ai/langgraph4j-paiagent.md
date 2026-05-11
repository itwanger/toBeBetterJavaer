---
title: 同事：“AI 时代你还在用 Java 的 LangGraph4J 不切到 Python 吗？”我笑了：“Codex+Claude Code 啥语言不行？Agent根本不在乎。”
shortTitle: LangGraph4J 实战面试指南
description: 用 PaiAgent 实战 LangGraph4J，从状态图到节点适配器到引擎切换，面试中最容易被追问的 Agent 编排细节全在这里。
tag:
  - Agent
  - LangGraph4J
  - Spring AI
category:
  - AI
author: 沉默王二
date: 2026-05-07
---

大家好，我是二哥呀。

AI 时代，我碰到不少小伙伴还在纠结是学 Java 还是学 Python，要我说，编程语言只是载体，根本不用在乎学哪一门。

因为 Agent 哪一门语言都精通啊。

不管是 Claude Code 还是 Codex，写出来的代码已经超过 99.9% 的程序员了。

这一点毋庸置疑。

只要有这两个 Agent，任何一个人都可以成为顶级的全栈工程师。

看看，这是我刚刚刚用 Codex 一句话复刻的 dify 前端，PaiAgent 的颜值一下子就提高了一大截。

![](https://cdn.paicoding.com/paicoding/5aa9b60de477dda11f71b488698adc34.jpg)

> ps：PaiAgent 是我在 GitHub 开源的一个 Vibe Coding 项目，一直没怎么宣传，也有 300 多 star 了。

选 Python 还是 Java？

我们只需要考虑一件事，原有的项目是用 Java 写还是 Python 写。或者说，面试官是 Java 出身的多，还是 Python 出身的多，因为当前的面试场景还是会考察八股的。

Java 生态的 AI 基建，已经补上来了。

Spring AI 已经很强，LangChain4j 拿到了 4.9k 星标，LangGraph4j 也到了 1.6k 星标。

该有的都有了。

![](https://cdn.paicoding.com/paicoding/090c9469cdbe93c0c04536b1cb462108.jpg)

## 01、LangChain4j

先说 LangChain4j，因为它是基础。

LangChain4j 是 Python LangChain 的 Java 移植版，定位是“通用 LLM 集成工具箱”。它解决的核心问题是：怎么在 Java 项目里方便地调用大模型。

![](https://cdn.paicoding.com/paicoding/eb0d9645ac78c8d4d0969a0cde165222.jpg)

它干的事情包括：

①、统一 API 调用——不管底层是 OpenAI、通义千问、DeepSeek 还是智谱，上层代码写法一致。切换模型供应商只需要改配置，业务代码不动。

②、Tool 注册——用 `@Tool` 注解把 Java 方法标记为“可被 LLM 调用的工具”。模型需要查天气就调天气方法，需要查数据库就调查询方法。Function Calling 的 Java 实现。

③、RAG 检索——集成了 20 多种 Embedding 存储（Milvus、Pinecone、Qdrant 等），帮你做文档切分、向量化、相似度检索。

④、Prompt 模板——变量替换、Few-shot 示例管理。

⑤、会话记忆——管理多轮对话的上下文窗口。

对于“调一次模型拿结果”“做一个简单的 RAG 问答”“注册几个 Tool 让模型自己选”这些场景，LangChain4j 完全够用。

但如果需求变成：“Agent 先搜索，根据搜索结果判断是否需要追问，追问后再总结，总结质量不够就重新搜索。”这种多步骤、有条件分支、有循环的复杂流程，LangChain4j 就力不从心了。

因为 LangChain4j 的执行模式是链式的（Chain），本质上是一条直线。你可以加 if-else，但那是硬编码的控制流，不够灵活。

这就是 LangGraph4j 出场的理由。

![](https://cdn.paicoding.com/paicoding/c448b5815ce0f88a0bd2a4410dd71711.jpg)

## 02、LangGraph4j

LangGraph4j 解决的是“怎么编排多个 Agent 协作”的问题。状态图、条件路由、循环重试、检查点恢复，这些能力 LangChain4j 做不了，LangGraph4j 做得到。

截至 2026 年 5 月，LangGraph4j 在 GitHub 上拿到了 1.6k 星标，最新版本 1.8.14（2026-04-27 发布）。MIT 协议，最低要求 Java 17。

![](https://cdn.paicoding.com/paicoding/e19183935fb25cc72f1a5fe4a3f7edf3.jpg)

它和 LangChain4j 不是竞争关系，是上下层关系。

LangGraph4j 官方是这样解释的：designed to work seamlessly with both LangChain4j and Spring AI。

画一张图帮大家建立直觉：

![](https://cdn.paicoding.com/paicoding/2d0bf390f13189f5b24b733c921f3d15.png)

LangChain4j 只能走直线，LangGraph4j 能走图。图意味着可以有分支、有循环、有并行。

打个比方：LangChain4j 是高速公路，从入口到出口只有一条路。LangGraph4j 是城市路网，每个路口都能根据路况选择走哪条路，还能掉头。

我们的 PaiAgent（派聪明的工作流引擎）用的就是这套组合——Spring AI 充当 LangChain4j 的角色负责底层模型调用，LangGraph4j 负责顶层的工作流编排。

![](https://cdn.paicoding.com/paicoding/c4f79ebb2c3a381d127bd31969e41b78.png)

## 03、LangGraph4j 的三个核心概念

面试官问 LangGraph4j，一定会追问三个东西：

StateGraph、AgentState、Edge。

这三个概念就是底层执行模型的全部。

### StateGraph

StateGraph 是整张图的定义。我们在上面注册节点、连边、设置入口出口，最后调 `compile()` 编译成一个不可变的 CompiledGraph 来执行。

![](https://cdn.paicoding.com/paicoding/58afe06e1f4e69e3f1db94f3a0d65e81.png)

编译这一步会做结构校验——检查有没有孤立节点、有没有入口出口。

如果图结构有问题，编译阶段就报错。

PaiAgent 用的是 `langgraph4j-core-jdk8`（1.1.5）加上 `langgraph4j-spring-ai`（1.8.0-beta3），前者提供核心的图引擎，后者做 Spring AI 的集成层。

### AgentState

AgentState 是节点之间共享的状态容器。

本质上就是一个 `Map<String, Object>`，每个节点都能读它、改它，改完的结果传给下一个节点。和 React 的 state 管理很像——状态是不可变的，每个节点返回一份新的状态 Map，框架帮你合并。

![](https://cdn.paicoding.com/paicoding/8071bf0561de2cbba5d5d11fd28dc1fc.jpg)

LangGraph4j 还支持一种叫 Channel 的机制，可以定义 Reducer 来控制状态更新策略。

比如 `AppenderChannel` 会把每次的值追加到列表里而不是覆盖。

这在 ReAct 模式里特别有用——Agent 每轮循环产生的 intermediate_steps 需要累积，用 AppenderChannel 就能做到。每次 Agent 调用工具后的结果都会追加到列表里，下一轮 Agent 能看到完整的历史。

### Edge（边）

普通边就是 A → B 的固定连线。

条件边是根据当前状态决定下一步去哪——EdgeAction 接收当前状态，返回一个路由字符串，框架根据这个字符串决定走哪条边。

条件边是 LangGraph4j 最强大的武器。有了它，Agent 可以自己决定“我是直接给答案，还是先调个工具再回来”。这就是 ReAct 模式的图结构表达——Agent 判断任务完成就走到 END，判断需要工具就路由到 tool_executor 节点，执行完再回来继续思考，形成循环。

![](https://cdn.paicoding.com/paicoding/936c3e20e93ebe0ab503e5ed803fb9f3.png)

## 04、PaiAgent 的图构建器

概念讲完，看 PaiAgent 里怎么落地的。

PaiAgent 的工作流编排有两套引擎：一套老的 DAG 引擎（拓扑排序顺序执行），一套新的 LangGraph 引擎。

![](https://cdn.paicoding.com/paicoding/0a2070594b7103a92769d76d795f38e2.png)

核心类是 `GraphBuilder`，负责把前端传过来的 JSON 配置变成一张 LangGraph4j 的 StateGraph：

![](https://cdn.paicoding.com/paicoding/f9e1f19305a3ec4f4ba133a7f19df7e3.png)

入口节点的识别逻辑很简单：遍历所有节点，如果一个节点没有任何入边指向它，它就是入口。

出口同理。

这样前端用户不需要显式标记哪个是开始哪个是结束，画完图自动推断。

![](https://cdn.paicoding.com/paicoding/361a0bb1e1344db3dc13323034088c98.png)

前端传过来的 JSON 结构长这样：

```json
{
  "nodes": [
    {"id": "input-1", "type": "input", "data": {"label": "输入"}},
    {"id": "qwen-1", "type": "qwen", "data": {"configId": 1, "prompt": "{{question}}"}},
    {"id": "output-1", "type": "output", "data": {"responseContent": "{{response}}"}}
  ],
  "edges": [
    {"source": "input-1", "target": "qwen-1"},
    {"source": "qwen-1", "target": "output-1"}
  ]
}
```

GraphBuilder 做的事情就是把这份 JSON “翻译”成 LangGraph4j 的 API 调用。

## 05、节点适配器

面试中如果被问“你们怎么把业务节点接入 LangGraph4j 的”，答 NodeAdapter 就对了。

PaiAgent 有很多种节点类型：Input、Output、各种 LLM（Qwen、DeepSeek、智谱、OpenAI）。

这些节点的执行逻辑各不相同，但 LangGraph4j 要求所有节点必须实现 `AsyncNodeAction<AgentState>` 接口，返回一个 `CompletableFuture<Map<String, Object>>`。

![](https://cdn.paicoding.com/paicoding/f3fe7de7ded2af5dddfd335ad98f7881.png)

NodeAdapter 就是这个桥梁。

它的核心逻辑分五步：从状态里提取 currentInput → 通过工厂拿到对应的 NodeExecutor → 执行节点逻辑 → 构建新状态（不可变更新，`new HashMap<>(state.data())`）→ 把输出写回 currentInput 和 nodeOutputs。

![](https://cdn.paicoding.com/paicoding/0e334d1b962b86190709c60e808e7dcf.jpg)

这里有几个关键设计：

- **不可变状态更新**——每个节点都 `new HashMap<>(state.data())` 拷贝一份再改，不直接修改原状态。保证即使某个节点执行失败，前面的状态也不会被污染。
- **currentInput 链式传递**——每个节点的输出会被塞进 `currentInput`，下一个节点从 `currentInput` 里拿输入。这样节点之间形成了一条隐式的数据管道。
- **nodeOutputs 全局存档**——所有节点的输出都存在 `nodeOutputs` 里，Output 节点可以通过 `{{nodeId.paramName}}` 的模板语法引用任意节点的输出。

![](https://cdn.paicoding.com/paicoding/9026dc8987e287fa98fd86af56a6b366.png)

面试的时候这么回答：“我们用适配器模式把业务节点的执行逻辑和 LangGraph4j 的状态模型解耦。NodeExecutor 只关心输入输出，不需要知道 LangGraph4j 的存在。NodeAdapter 负责状态的提取和回写。”

## 06、状态管理器

状态怎么初始化、怎么在节点之间流转、最后怎么提取结果，是由 StateManager 负责的。

![](https://cdn.paicoding.com/paicoding/a22aa97598b30f1a2ced5f3b6fb44396.png)

初始化时，StateManager 往状态 Map 里塞五个 key：

- `inputData`（原始输入）
- `currentInput`（当前节点的输入，初始值就是原始输入）
- `nodeOutputs`（所有节点的输出历史，初始为空 Map）
- `status`（RUNNING）
- `startTime`。

执行完成后，`getFinalOutput()` 直接从 `currentInput` 里取最后一个节点写入的值——因为每个节点执行完都会把自己的输出覆盖到 `currentInput`，所以最终的 `currentInput` 就是最后一个节点的输出。

状态流转的完整生命周期：初始化 → Node A 执行 → 状态更新 → Node B 执行 → 状态更新 → ... → 提取最终输出。

![](https://cdn.paicoding.com/paicoding/b6942b389bcfa36134f324d5c471e1eb.png)

每个节点看到的状态都包含前面所有节点的输出历史。这意味着后面的节点可以回溯引用前面任意节点的结果。

举个实际场景：一个“翻译 + 校对”的工作流，Translation 节点输出翻译结果，Review 节点不仅能看到翻译结果（通过 currentInput），还能看到原文（通过 `nodeOutputs["input-1"]`）。

再比如一个“先搜索再总结”的工作流，Search 节点调 RAG 检索到三篇文档，Summary 节点需要同时看到用户原始问题和检索结果。

如果只有 currentInput 链式传递，Summary 节点就丢失了原始问题。nodeOutputs 全局存档解决了这个问题——任何节点都能“回头看”。

## 07、LLM 节点怎么对接 Spring AI

PaiAgent 支持很多种 LLM 供应商（Qwen、DeepSeek、智谱、OpenAI、阶跃星辰），但它们共享同一套执行逻辑。

这就是 `AbstractLLMNodeExecutor` 的价值所在。

![](https://cdn.paicoding.com/paicoding/b2262fc7be94c076d46d1dfb8761fd48.png)

执行流程分六步：提取配置（API URL、Key、Model、Temperature）→ 加载关联的 Skill（可选）→ Prompt 模板替换（把 `{{question}}` 替换成实际输入）→ 通过 ChatClientFactory 创建 ChatClient → 调用 LLM → 提取结果和 Token 统计。

![](https://cdn.paicoding.com/paicoding/0e7c48e6c7cd86e26a346362fb5191e7.jpg)

Spring AI 的 `ChatClient` 是统一的 LLM 调用入口。

不管底层是 Qwen 还是 DeepSeek，上层代码写法完全一致——`chatClient.prompt().system(systemPrompt).user(userPrompt).call().chatResponse()`。ChatClientFactory 根据 provider 选择不同的 Model 实现，对外暴露统一的接口。

面试中可以这么说：“我们的 LLM 节点基于 Spring AI 的 ChatClient 做了一层抽象，通过工厂模式支持多供应商切换，同时保留了流式输出能力，前端通过 SSE 实时渲染。”

## 08、DAG 和 LangGraph 双引擎切换

`WorkflowExecutor` 是统一接口，DAGWorkflowEngine 和 LangGraphWorkflowEngine 都实现了它。

![](https://cdn.paicoding.com/paicoding/49c088bc47e87e4b65da68c14b99e941.png)

`EngineSelector` 根据 Workflow 实体上的 `engineType` 字段做分发——“dag” 走老引擎，“langgraph” 走新引擎，找不到就默认回退 DAG。

Spring 自动注入所有实现，典型的策略模式。

为什么保留两套？

因为简单的线性工作流用 DAG 引擎就够了，拓扑排序顺序执行，逻辑简单性能也好。

LangGraph 引擎的价值体现在需要条件分支和循环的场景——比如“如果 LLM 回答质量不够就重新生成”，或者“根据用户意图路由到不同的处理分支”。这些场景 DAG 做不了，因为 DAG 不允许有环。

![](https://cdn.paicoding.com/paicoding/7bb9562d927a6f27da017c2b64b2f204.png)

这个设计在面试里叫**策略模式 + 向后兼容**。新功能用新引擎，旧功能不强制升级，平滑过渡。

## 09、事件系统

工作流跑起来之后，前端怎么知道“现在跑到哪了”？

PaiAgent 用事件回调 + SSE 解决这个问题。

每个节点在执行前后都会触发事件：

![](https://cdn.paicoding.com/paicoding/4706c2f913a4952fc4dbc57a4cfb108e.png)

前端通过 SSE 实时接收这些事件，在画布上高亮当前执行的节点，展示每个节点的耗时和输出。

```
GET /api/workflows/{id}/execute/stream?inputData=...

→ WORKFLOW_START
→ NODE_START (input-1)
→ NODE_SUCCESS (input-1, 2ms)
→ NODE_START (qwen-1)
→ NODE_PROGRESS (qwen-1, "生成中...")
→ NODE_PROGRESS (qwen-1, "生成中...")
→ NODE_SUCCESS (qwen-1, 1523ms)
→ NODE_START (output-1)
→ NODE_SUCCESS (output-1, 1ms)
→ WORKFLOW_COMPLETE (SUCCESS, 1527ms)
```

![](https://cdn.paicoding.com/paicoding/2a122d4f81391c31f55517863e77af5e.png)

## 10、动手跑一个工作流

### 第一步，创建工作流

访问 PaiAgent 前端 `http://localhost:5173`，新建一个工作流，引擎类型选 LangGraph。

在画布上拖入三个节点：

- Input 节点
- DeepSeek V4 LLM 节点（配置好 API Key 和模型）
- Output 节点

按顺序连线：Input → DeepSeek V4 → Output。

在 DeepSeek V4 节点的配置里，Prompt 写：

```
请用回答以下问题，要求简洁有深度：{{input}}
```

Output 节点的 responseContent 写：

```
{{output}}
```

**第二步，执行工作流**

输入框里填：

```
LangGraph4j 和 LangChain4j 有什么区别？请从架构层面解释。
```

点击“运行”。

你会看到节点依次高亮，DeepSeek V4 节点执行时会有流式输出，最终 Output 节点汇总结果。

![](https://cdn.paicoding.com/paicoding/d3aa1447acfd3d5eebc469ece9d39071.jpg)

**第三步，观察执行记录**

执行完成后查看执行记录，能看到每个节点的：

- 输入和输出
- 执行耗时
- Token 消耗（输入 Token / 输出 Token / 总 Token）

## 11、LangGraph4J 面试十问十答

帮大家整理 10 道高频面试题，答案都是口述版本，直接背下来就能用。

### Q1：LangGraph4j 和 LangChain4j 什么关系？能不能用一句话说清楚？

A：LangChain4j 管“怎么调模型”，LangGraph4j 管“怎么编排多个调用”。

LangChain4j 提供统一的 ChatClient、Tool 注册、Embedding 存储、RAG 检索这些基础设施。

![](https://cdn.paicoding.com/paicoding/02774024e61a6caff923a880dd7879d8.jpg)

LangGraph4j 在这之上，把多个 Agent 节点串成一张状态图，支持条件分支和循环。

两者不是替代关系，是上下层关系。在 PaiAgent 项目里，Spring AI 充当了 LangChain4j 的角色，负责底层模型调用，LangGraph4j 负责顶层的工作流编排。

### Q2：StateGraph 的执行模型是什么？和普通 DAG 有什么区别？

A：StateGraph 是一个有向图，支持环。

编译后变成不可变的 CompiledGraph，执行时从 START 出发，沿着边依次执行节点。

每个节点接收当前状态、处理后返回新状态。

![](https://cdn.paicoding.com/paicoding/25d8472cf54e1c9fac01a562b367df92.jpg)

普通 DAG 不允许有环，只能拓扑排序顺序执行。LangGraph4j 的核心优势就在这里——支持条件边做运行时路由，支持循环。这让 ReAct 模式（思考 → 调用工具 → 再思考）成为可能。DAG 做不了这个。

### Q3：AgentState 是什么？为什么不直接用方法参数传值？

A：AgentState 本质是个 Map，它是所有节点共享的全局状态容器。

不直接用方法参数是因为图的拓扑在编译时已经确定，但运行时走哪条路径是动态的——条件边可能跳过某些节点。

![](https://cdn.paicoding.com/paicoding/09dcc4ca3a1b9e2748d05abce7b85fdc.png)

如果用方法参数，跳过的节点就传不了值给后面的节点。用共享状态就没这个问题，任何节点都能读到任意前驱节点写入的数据。我们项目里约定了 currentInput 做链式传递，nodeOutputs 做全局存档，两种方式互补。

### Q4：条件边怎么用？举个实际场景。

A：条件边的核心是 EdgeAction，它接收当前状态、返回一个路由字符串，框架根据这个字符串决定走哪条边。

![](https://cdn.paicoding.com/paicoding/d74322c03e4a88fc8a25a885ea44311f.png)

实际场景比如“质量检查”——LLM 生成一段文本后，Quality 节点判断质量分数，分数低于阈值就路由回 LLM 节点重新生成，分数达标就路由到 Output 节点输出。

这就是一个循环，DAG 做不了。还有 ReAct 模式——Agent 判断是否需要调用工具，需要就路由到 tool_executor，执行完再回来继续思考。

### Q5：你们怎么把业务逻辑接入 LangGraph4j 的？

A：适配器模式。

业务层有一套 NodeExecutor 接口，每种节点类型（Input、Output、各种 LLM）各自实现 execute 方法，只关心输入输出。

![](https://cdn.paicoding.com/paicoding/7edc32f7513c5a74118e9efcc8e69dba.png)

中间有一层 NodeAdapter，把 NodeExecutor 包装成 LangGraph4j 要求的 AsyncNodeAction。Adapter 负责从 AgentState 里提取 currentInput、调用 executor、把输出回写到新状态里。这样做的好处是：如果以后我们要换编排引擎，所有的 NodeExecutor 一行都不用改。

### Q6：Spring AI 在项目里扮演什么角色？和 LangGraph4j 怎么配合？

A：Spring AI 负责模型调用这一层——提供统一的 ChatClient 接口，不管底层是通义千问、DeepSeek 还是 OpenAI，上层调用代码完全一致。

我们的 ChatClientFactory 根据 provider 参数选择不同的 Model 实现，对外暴露统一接口。

![](https://cdn.paicoding.com/paicoding/fe2392f1666f5865b6832445234d5bf5.jpg)

LangGraph4j 在更上层，它不关心模型怎么调，只关心节点之间怎么流转。两者的交汇点是 LLM 节点——LangGraph4j 把状态传给 LLM 节点，LLM 节点内部用 Spring AI 的 ChatClient 调模型，拿到结果再回写状态。

### Q7：Java 做 AI 应用开发，相比 Python 有什么优势？为什么不直接用 Python？

A：核心观点一句话：AI 时代是给现有系统赋能，不是推倒重来。

国内绝大部分企业级应用——电商、金融、ERP、CRM——都是 Java 写的。这些系统需要的不是用 Python 重写一遍，而是在原有架构上追加 AI 能力。

![](https://cdn.paicoding.com/paicoding/807872b4c406b46f44e821363d958335.jpg)

Java 的优势是：成熟的企业级生态（Spring Boot、微服务、分布式事务）、完善的类型系统和编译检查、更容易做大规模工程管理。

Python 擅长快速原型和算法研究，Java 擅长把 AI 能力嵌入到生产级系统里。两者不冲突，场景不同。

### Q8：AI 时代 Java 开发者需要学什么新东西？

A：三个方向。

第一，Spring AI——这是 Spring 官方的 AI 集成框架，已经 GA 了，统一了各家模型的调用接口，支持 Function Calling、RAG、流式输出。

![](https://cdn.paicoding.com/paicoding/d95bc9042bb50506c86dd01d94615ed8.jpg)

第二，LangGraph4j——当业务需要多步骤 Agent 协作、条件路由、循环重试的时候，需要图编排能力。

第三，MCP 协议——让 Agent 能调用外部工具的标准化协议，Java 侧有完整的 server/client 实现。

总结一下就是：调用层用 Spring AI，编排层用 LangGraph4j，工具层用 MCP。这三层加起来，Java 开发者就能构建完整的 AI Agent 应用。

### Q9：你们的双引擎设计（DAG + LangGraph）是怎么切换的？

A：策略模式。

WorkflowExecutor 是统一接口，DAGWorkflowEngine 和 LangGraphWorkflowEngine 都实现了它。

EngineSelector 根据 Workflow 实体上的 engineType 字段做分发——“dag” 走老引擎，“langgraph” 走新引擎。

![](https://cdn.paicoding.com/paicoding/5cfe31c33c3895bebe220127e1fb9bfe.jpg)

老工作流不改 engineType，默认继续用 DAG；新建工作流选择 LangGraph 引擎。这样做的考虑是：简单的线性流用 DAG 就够了，性能好、逻辑清晰。需要条件分支和循环的复杂场景才用 LangGraph。没有收益的迁移只会制造风险。

### Q10：如果让你从零设计一个 AI 工作流引擎，你会怎么做？

A：分四层。

最底层是模型调用层，用 Spring AI 统一所有 LLM 供应商的接口。

第二层是节点执行层，每种节点类型实现自己的 execute 方法，只关心输入输出。

第三层是编排层，用 LangGraph4j 的 StateGraph 定义图结构，NodeAdapter 做桥接。

最顶层是 API 层，提供 REST 接口和 SSE 事件流，让前端能可视化编辑和实时监控。

![](https://cdn.paicoding.com/paicoding/9cf81dd3f8c281b2d9a7a6ad3f516036.jpg)

关键的设计决策是：编排层和执行层解耦，用适配器模式桥接。这样每一层都可以独立替换——换模型不影响编排，换编排引擎不影响业务节点。



![](https://cdn.paicoding.com/paicoding/63086cd06b096b1bd215c8ee5fd669b2.jpg)

