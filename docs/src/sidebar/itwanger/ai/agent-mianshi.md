---
title: 阿里一面，我霸气反问：你说你们在做Agent项目，说说langchain、muti-agent、a2a这些你们都是怎么做的？面试官一直在擦汗。。
shortTitle: 阿里Agent面试
description: 阿里一面Agent方向面试复盘，涵盖LangChain架构、Multi-Agent、A2A协议、MCP、Transformer自注意力、大模型对比等核心面试题
tag:
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-04-17
---

老王桌上放了一瓶农夫山泉，旁边还放了一瓶怡宝。

面试开始前他拧开农夫山泉喝了一口，又拧开怡宝喝了一口，然后对我说：“你知道我为什么同时喝两瓶水吗？”

我一脸懵逼。

老王笑了：“因为我们部门在做 Agent，所以什么事情都习惯并行处理。”

没绷住，真没绷住，第一次见这么逗比的面试官。😄

行吧，这开场白我给满分。

老王看了一眼我的简历：“PaiAgent，LangGraph4j + Spring AI，工作流编排……还有个 RAG 知识库项目。看起来是认真搞过 Agent 的。”


![](https://cdn.paicoding.com/paicoding/4bfb845d60feb891889adbb831f09b00.png)


我说：“王哥，那必须啊，我可是提前调研过咱们你这个岗位的，这次必须成功，不许失败。”

- 问langchain架构
- agent开发方式有几种
- langchain有哪些核心的模块
- 介绍你项目中muti-agent的情况
- 讲一下agent之间的通讯协议
- 用mcp做过什么
- transformer了解么
- 自注意机制是什么
- 现在市面很多大模型，对彼此的对比了解么，比如说生成音频的哪个最好之类的
- 编辑器用的哪个
- 对模型内部算法了解么

>系好安全带，我们出发～全文比较肝，可以收藏起来慢慢看（背）

## content

### 01、聊聊 LangChain 的架构

老王直接开始：“先聊个基础的，LangChain 架构你了解吗？整体是怎么设计的？”

整体可以分为三层。


![](https://cdn.paicoding.com/paicoding/bed5368bf527eabf9154cffe4e726642.jpg)


最底下是基础抽象层，定义了 LLM、ChatModel、Prompt、OutputParser 这些核心接口。所有上层功能都围绕这些接口展开，换模型只要换实现类就行。

中间是能力层，包括 Chain（链式调用）、Agent（自主决策）、Memory（对话记忆）、Retriever（检索器）这些模块。Chain 负责把多个步骤串起来，Agent 负责根据目标自主选择工具，Memory 负责维护上下文。

最上面是应用层，LangServe 做部署，LangSmith 做调试和监控，LangGraph 做复杂的状态图编排。

老王不住地点头，看起来对我这个回答很满意：“**那 LangChain 和 LangGraph 什么关系？**”

我说：“LangChain 的 Chain 是线性的，A→B→C 一条路走到黑。但真实的 Agent 场景经常需要条件分支、循环、并行执行，Chain 搞不定。”

“LangGraph 可以解决这个问题。它把工作流从链式升级成了图式——节点处理步骤，边可以带条件，还支持循环。我们项目里用的 LangGraph4j 就是它的 Java 版本，底层是 StateGraph，用状态驱动整个执行流程。”

![](https://cdn.paicoding.com/paicoding/79f0096582e5d1b4de66f2dc1209fe30.png)

老王追问：“你们为什么选 LangGraph4j 而不是直接用 Python 版？”

我说：“因为我们整个技术栈是 Java 的，Spring Boot + Spring AI。Java 生态里做 Agent 编排的选择不多，LangGraph4j 是目前最成熟的。而且它和 Spring AI 配合得不错，ChatModel 可以直接复用。”

### 02、Agent 开发方式有几种

老王抿了一口农夫山泉，继续追问：“不局限于 LangChain，Agent 开发方式你知道哪几种？”

“四种，我一个个说。”


![](https://cdn.paicoding.com/paicoding/92f045734b8d5b7192a25e04dc711617.jpg)


第一种是 ReAct 模式。模型接到任务后，交替做推理（Reasoning）和执行（Acting）。先想清楚这一步该干嘛，再调具体的工具去执行，拿回结果再想下一步，周而复始，直到任务完成。LangChain 的 Agent 就是这个模式。

第二种是 Plan-and-Execute。先让模型一口气规划出整个执行计划，然后按计划逐步执行。好处是不容易走弯路。坏处是计划一旦定了就不太好调整。

第三种是 Multi-Agent 协作。多个 Agent 各司其职，一个负责写代码，一个负责审查，一个负责测试。它们之间通过消息传递协调。AutoGen、CrewAI 都是这个思路。

第四种就是状态图编排，也就是 LangGraph 这种。开发者把工作流画成一张图，定义好节点、边和条件分支，Agent 在图上按路径执行。

老王靠到椅背上：“你们项目选了第四种？”

“对，因为我们的场景不是简单的问答，是多步工作流——用户在前端拖拽节点连线，后端按图执行。我们需要更可控的执行路径。”

### 03、LangChain 有哪些核心模块

（内心 OS：幸好之前做足了功课，不然上来这两道题就直接贵了～～～）

老王听的特别认真，也没有打断我，真的很友好啊。

等我回答完，他继续问：“LangChain 的核心模块，具体展开说说？”

一共六个。

![](https://cdn.paicoding.com/paicoding/3ee9425150deb7af38d53179d248a10e.png)

**Models**：对各家大模型的统一封装。不管是 OpenAI、DeepSeek 还是通义千问，上层调用的接口都是 `ChatModel.call()`。我们项目里虽然没直接用 LangChain，但 Spring AI 的 ChatModel 思路是一样的。

**Prompts**：提示词管理。支持模板变量、Few-Shot 示例、动态拼装。我们 PaiAgent 里的 PromptTemplateService 就干的是这个活，支持双括号 `{{variable}}` 语法做变量替换。

**Indexes**：文档索引，主要用于 RAG。包括文档加载器（DocumentLoader）、文本分割器（TextSplitter）、向量存储（VectorStore）、检索器（Retriever）。我们的派聪明项目里用的 Elasticsearch + 阿里 Embedding 做的混合检索，BM25 关键词 + KNN 向量召回。

**Memory**：记忆管理。短期记忆用 BufferMemory 直接存最近几轮对话，长期记忆可以接 VectorStore 做语义检索。

**Chains**：把多个步骤串在一起。最常用的 LLMChain 就是 Prompt + Model + OutputParser 三步串联。

**Agents**：自主决策模块。模型根据当前目标自己选择调用哪个工具、传什么参数。这是 LangChain 区别于普通 LLM 调用最核心的模块。


![](https://cdn.paicoding.com/paicoding/525e71839d8e0708a647f3419ebf8afa.png)

老王面漏悦色，看起来对我的回答很认可。

于是继续问：“这六个模块，你们项目里用到了几个？”

“除了 Chains，全用了。”我顿了一下，“不过用的不是 LangChain 的实现，是 Spring AI + 自研。Chains 没用是因为我们直接上了 LangGraph4j 的 StateGraph，比 Chain 灵活。”

### 04、介绍你项目中 Multi-Agent 的情况

老王明显对 Agent 这方面有深入的研究，于是问到了多智能体：“你项目里有 Multi-Agent 吗？”

我羞涩地笑了一下：“王哥，我跟你说实话——严格来讲，PaiAgent 不是传统意义上的 Multi-Agent 系统。”

传统 Multi-Agent 是多个独立的 Agent 各自有自己的目标和记忆，通过消息传递协作，比如 AutoGen 里一个 Coder Agent 写代码，一个 Critic Agent 审代码，它们之间有来有回。

PaiAgent 做的是**工作流编排**。多个节点——LLM 节点、TTS 节点、Input/Output 节点——通过有向图连接起来，按拓扑顺序执行。每个节点不是独立的 Agent，而是工作流里的一个处理环节。

但我们有一个设计是和 Multi-Agent 思路相通的：**EngineSelector 双引擎路由**。


![](https://cdn.paicoding.com/paicoding/8f84b84673bf453ba8afbe8d311a1bc4.png)


简单的线性工作流走 DAG 引擎（拓扑排序 + DFS 循环检测），有条件分支和循环的复杂工作流走 LangGraph 引擎。两个引擎共享同一套 NodeExecutor 执行器，通过 NodeAdapter 适配。

![](https://cdn.paicoding.com/paicoding/e85f71e954de8705afcf9c1a43ce72ee.png)

老王眼睛一亮：“你很坦诚啊。那如果让你设计一个真正的 Multi-Agent 系统，你打算怎么做？”

“让每个 Agent 有自己独立的 StateGraph，Agent 之间通过一个消息总线通信。”我越说越自信，“每个 Agent 订阅自己关心的消息类型，处理完把结果发布到总线上。低耦合，新增一个 Agent 不影响其他的。”

看老王状态很不错，我借机反问了一句：“王哥，你们阿里内部做 Agent 项目，Multi-Agent 是怎么架构的？各个 Agent 之间的状态同步怎么处理？”

老王愣了一下，擦了擦额头上的汗：“呃……我们组目前还是以单 Agent + 工具调用为主，Multi-Agent 还在探索阶段。”

（内心 OS：嘿嘿嘿，老王，被我拿捏了吧，🤣。）

### 05、讲一下 Agent 之间的通讯协议

老王咳了一声，赶紧把话题拉回来：“那 Agent 之间的通讯协议你了解哪些？”

目前主流的就是 Google 提出的 **A2A协议**。


![](https://cdn.paicoding.com/paicoding/674bdbbd1aa1f84ab0bd9d7b49ec8d9d.png)


它的核心思路是给每个 Agent 一个“能力名片”（Agent Card），用 JSON 描述这个 Agent 能干嘛、接受什么输入、返回什么输出。Agent 之间通过标准的 HTTP API 通信，用 Task 作为协作单元，支持同步和异步两种模式。

A2A 解决的是跨团队、跨组织的 Agent 互操作问题。比如一个电商平台的订单 Agent 和物流公司的配送 Agent 要协作，它们可能用不同的框架、不同的模型，但只要都遵循 A2A 协议就能通信。


#### MCP 和 A2A 有什么区别？

MCP 解决的问题不太一样，它主要是让 Agent 能调用外部工具和服务。

MCP Server 把自己的能力通过 JSON Schema 暴露出去，Agent 通过 MCP Client 发现和调用这些能力。

两者的区别：**A2A 是 Agent 对 Agent，MCP 是 Agent 对工具**。一个解决 Agent 协作，一个解决 Agent 能力扩展。


![](https://cdn.paicoding.com/paicoding/51c95a63d073401455c3a0b50432dc50.jpg)


老王歪了歪头：“那实际项目中你用过哪个？”

“A2A 我们没直接用。但 MCP 我们在派聪明里实现过——封装了本地文件操作、PDF 生成和数据库查询三个 Server。”

然后我又忍不住问了一句：“王哥，你们内部的 Agent 之间通信用的是什么协议？自研的还是开源的？”

老王又擦了一下汗：“我们……用的是内部的 RPC 框架，也在看 A2A。”

### 06、用 MCP 做过什么

（内心 OS：前面五道题下来，感觉王哥对我的项目挺感兴趣的，节奏不错。）

老王拧开那瓶怡宝又喝了一口：“MCP 你具体做了什么？”

“派聪明 RAG 项目里，我们封装了三个 MCP Server。”


![](https://cdn.paicoding.com/paicoding/9620f33f29a54ca3b3e7df37aaec29e2.jpg)


第一个是**文件操作 Server**。把本地文件的读写、目录遍历这些能力封装成 MCP 工具。Agent 需要读取用户上传的文档时，就通过 MCP 调用而不是直接操作文件系统。

第二个是**PDF 生成 Server**。Agent 把分析结果生成 PDF 报告，调用 MCP 工具传入内容和模板，Server 端用 iText 渲染成 PDF 存到 MinIO。

第三个是**数据库查询 Server**。Agent 需要查业务数据时，通过 MCP 发起 SQL 查询。Server 端我们还做了 SQL 注入检测和查询超时限制。

MCP 的好处是把工具能力标准化了。

Agent 不需要知道 PDF 是用 iText 还是 wkhtmltopdf 生成的，它只需要知道 MCP 的工具描述，填参数调用就行。换了底层实现，Agent 那边一行代码不用改。

老王往前凑了凑：“MCP Server 的注册和发现你们怎么做的？”

“目前是配置文件静态注册，MCP 配置里写好每个 Server 的地址和端口。”不能慌，不能慌，这个时候我主打的就是胡扯，哦不，自信，“没做动态发现，Server 就三个，静态配置够用了。后续多了的话，可以接注册中心，每个 Server 启动时上报 Agent Card，Agent 从注册中心拉取可用工具列表。”


### 07、Transformer 了解么

老王突然画风一转，问：“Transformer 架构了解吗？”

“那必须了解啊。”我坐直了一点，“2017 年 Google 那篇《Attention Is All You Need》，现在基本上所有大模型都是基于它或者它的变体。”

![](https://cdn.paicoding.com/stutymore/anshui-yin-mianshi-20260414132100.png)

整体结构分 Encoder 和 Decoder 两部分。

Encoder 负责理解输入，把文本编码成一组向量表示。Decoder 负责生成输出，一个 token 一个 token 地往外输出。

Transformer 之前大家用的是 RNN 和 LSTM，最大的痛点是处理长序列时信息会衰减，而且没法并行——必须一个词一个词地顺序处理。

Transformer 用 Self-Attention 机制优化了循环结构，每个位置都能直接“看到”序列里所有其他位置，而且可以并行计算。这是它能处理几万甚至几十万 token 上下文的基础。


![](https://cdn.paicoding.com/paicoding/1654dc29441aa0aa8cb8377f08c3cf0d.png)


老王对这方面还挺感兴趣，继续问：“Transformer 里除了 Attention，还有哪些关键组件？”

“三个。”

**位置编码（Positional Encoding）**：Attention 本身不知道词的前后顺序，位置编码给每个 token 加上位置信息。原始论文用的是正弦余弦函数，现在很多模型改成了可学习的位置编码，或者 RoPE（旋转位置编码）。

**Layer Normalization**：每个子层后面都接一个 LayerNorm，稳定训练过程。

**Feed-Forward Network**：每个 Attention 层后面接一个两层的全连接网络，做非线性变换。实际上模型的大部分参数都集中在这里，Attention 层的参数占比反而不算大。

### 08、自注意力机制是什么

老王没给我喘息的机会，紧跟着追：“Self-Attention 具体怎么算的？”

（内心 OS：这是要把 Transformer 从头到脚给我扒一遍啊。）

“核心就三个矩阵：Query、Key、Value。”

![](https://cdn.paicoding.com/stutymore/anshui-yin-mianshi-20260414132439.png)

输入序列经过三个不同的线性变换，得到 Q、K、V 三组向量。然后用 Q 和 K 做点积算相似度，除以 √d（d 是向量维度，防止数值太大），过一个 Softmax 得到注意力权重，最后用权重对 V 加权求和。

```
Attention(Q, K, V) = softmax(Q·K^T / √d) · V
```

打个比方，我们在读一篇文章《母猪为什么会上树？》。读到“它”这个字的时候，我们的大脑会自动去找这个“它”指代的是什么——那头母猪。Self-Attention 做的就是这件事：每个 token 去“看”序列里所有其他 token，算出跟谁关系最近，然后把相关信息聚合过来。


![](https://cdn.paicoding.com/paicoding/1ea22a2abd82ecd22dbe9889f9de1038.jpg)


老王点了点头，接着挖：“Multi-Head Attention 又是怎么回事？”


![](https://cdn.paicoding.com/paicoding/a2c75c3c99038c14a731414264ab8da8.png)


“一个 Head 只能捕捉一种关联模式。”我用手比了两个方向，“比如一个 Head 关注语法关系——主谓宾，另一个 Head 关注语义关系——同义替代。”

Multi-Head 就是并行跑多组 Attention，每组用不同的 Q、K、V 投影矩阵，最后把所有 Head 的输出拼接起来。

这样模型就能同时从多个维度理解 token 之间的关系，比单个 Attention 表达能力强得多。

### 09、大模型对比

老王伸了个懒腰，换了个轻松的坐姿：“现在大模型这么多，你对它们的对比有什么了解？比如音频生成哪家最好？”

“这个我还真研究过。”我来了精神，“PaiAgent 里接了好几家模型，踩坑踩出来的经验。”

![](https://cdn.paicoding.com/paicoding/652ab83802c8a097ce15108290443e5f.png)

先说文本生成。

目前综合最强的还是 Claude 系列，国产里 DeepSeek V3 性价比最高。通义千问 Qwen3 在中文场景下表现不错，尤其是长文本理解。GLM-5.1 的编程能力，尤其是长任务，在国产模型上还是顶级。

代码生成方面，Claude Opus 和 GPT-5.4 是第一梯队。

音频生成的话，TTS 领域我测过几家。阿里百炼的 qwen-tts 系列音色比较自然，我们 PaiAgent 里用的就是 qwen3-tts-flash。

图片生成方面，Nano Banana 2 是标杆。国产里通义万相和即梦（字节）进步很快。


### 10、AI Coding 工具用的哪个？

老王突然画风一转：“你平时开发用什么 AI Coding 工具？”

“以前主力是 IDEA，现在主力是 Claude Code + Codex。”

“读代码、改代码、跑测试、查日志，主要交给 Codex，量大管饱。”我想了想补了一句，“如果需要调查方案，或者 Codex 解决不了的时候，我会上 Claude Code，目前配的是 Opus 4.6。”

不过 IDEA 也没完全扔掉，调试器和代码导航还是不可替代。现在两个搭着用，Claude Code 写代码，IDEA 做调试。

![](https://cdn.paicoding.com/paicoding/5a1530ede32d7387514f83d6f5e3bb35.png)


### 11、对模型内部算法了解么

（内心 OS：一个小时结束了，老王这体力是真好，还特么能问，劳资快顶不住了。）

老王看了看时间，做出最后冲刺的姿态：“最后一个，对模型内部的训练算法了解吗？”

“了解个大概，不算特别深入。”我实话实说。

大模型训练大致分三个阶段。

第一阶段是**预训练（Pre-training）**。用海量文本数据做自监督学习，目标就是预测下一个 token。这个阶段消耗的算力最大，动辄几千张 GPU 跑几个月。模型在这个阶段主要学习语言的基本结构和世界知识。

第二阶段是**SFT（Supervised Fine-Tuning）**。用人工标注的指令-回答做有监督微调，让模型学会按指令做事。这个阶段把一个“能说话但说不到点子上”的模型，训练成一个“能听懂指令并给出有用回答”的助手。

第三阶段是**RLHF（Reinforcement Learning from Human Feedback）**。先训一个奖励模型（Reward Model），用人类偏好数据告诉它什么样的回答是好的。然后用强化学习（PPO 算法）让主模型的回答尽量往奖励模型打高分的方向靠。这个阶段让模型的输出更符合人类预期。


![](https://cdn.paicoding.com/paicoding/e8d4a839d09e03006f3fd47f64998568.jpg)


老王眼睛盯着我：“RLHF 和 DPO 有什么区别？”

“RLHF 要单独训一个奖励模型，再用 PPO 做强化学习，流程比较重。”我用手比了个砍的动作，“DPO 把奖励模型这步直接砍掉了，用偏好数据对来优化策略模型，两步并一步。训练更简单、更稳定，效果也不差。”

老王沉默了几秒钟，看起来中雨要结束了。

“好，你有什么想问我的吗？”

我等的就是这句话。

“王哥，你说你们部门在做 Agent 项目，那我想问问——LangChain、Multi-Agent、A2A 这些方向上，你们具体是怎么做的？”

老王差点没把水喷出来，又开始擦汗：“我们……嗯……用的主要是。。。。。。Multi-Agent 还在 POC 阶段，A2A 确实还没接入……”

我笑了。

老王也笑了，把两瓶水都拧上盖子：“你什么时候能来上班？”

“下周一，我回去请宿友们吃个饭🎉”

