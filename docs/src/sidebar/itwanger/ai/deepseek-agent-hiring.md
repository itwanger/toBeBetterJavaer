---
title: DeepSeek 最新的招人标准
shortTitle: DeepSeek 的招人标准
description: 从 DeepSeek 官方招聘页拆解 Agent 岗位要求，解读 AI 时代工程师该补什么技术素质，附 PaiCLI 实战简历包装。
tag:
  - Agent
  - DeepSeek
category:
  - AI
author: 沉默王二
date: 2026-04-29
---

大家好，我是二哥呀。

上周写了一篇关于 DeepSeek V4 的内容，点赞和转发的小伙伴非常多。

所以今天的选题就从 DeepSeek 的最新招人标准切入，看看 AI 时代，我们应该往哪个方向去发展，我想这也是大家非常关心的。

![](https://cdn.paicoding.com/tobebetterjavaer/images/mdnice/49717ab6a126-6c6d799b-086a-46ae-bb0d-d687c5c49a3b.png)

从 4 月 27 号这一天开始，DeepSeek 官网上心了不少岗位，基本上都和 Agent 有关。

每一个岗位我都点进去看了一下，认真总结出来这些关键信息，大家可以管中窥豹，作为接下来自己学习的重点。

知彼知己，方能在这个时代立于不败之地。

![](https://cdn.paicoding.com/tobebetterjavaer/images/mdnice/a35e92b30d3a-51751ad6-7636-482b-b275-b0557407094b.jpg)

## 01、DeepSeek 在招什么人

我是从 DeepSeek 官网挂的 Moka 招聘系统入手的，地址是 `https://app.mokahr.com/social-recruitment/high-flyer/140576`。

Moka 有公开的 API 接口，可以直接拿到结构化的岗位数据。

![](https://cdn.paicoding.com/tobebetterjavaer/images/mdnice/bc83e6ba69bf-5f32aa2b-0659-4cc6-9f84-80342a017701.jpg)

截至 2026 年 4 月 29 日，DeepSeek 社招站点一共返回了 30 个岗位。

Agent 相关岗位集中在 4 月 27 日发布或更新，说明这一波是有组织的集中放量，不是零星补人。

30 个岗位里，跟 Agent 直接相关的涵盖了好几个方向：

- Agent 全栈工程师
- Agent 数据策略
- 模型策略产品经理（Agent 方向）
- 算法研究（Agent 评测）。

还有一些岗位虽然名字里没写 Agent，但 JD 里明确提到了 Tool Use、MCP、Function Calling 这些关键词。

![](https://cdn.paicoding.com/tobebetterjavaer/images/mdnice/11d74d0f0ce1-b9a0c96b-0db5-4c0f-826c-22ca7b55120f.jpg)

最让我意外的是数据中心运维岗。

这是 DeepSeek 第一次公开招运维，工作地点在内蒙古乌兰察布，月薪据说能开到 3 万。

乌兰察布是国家“东数西算”工程的核心节点之一，电价便宜、气候又适合散热，很多大厂的算力中心都建在这。DeepSeek 在这建数据中心，说明它的算力需求非常大。

![](https://cdn.paicoding.com/tobebetterjavaer/images/mdnice/344792b31e60-30578514-1d46-42bd-84b6-e73ee5d69b20.jpg)

## 02、Agent 的招人标准

把这些 Agent 相关岗位的 JD 拆开来看，我发现 DeepSeek 要的能力可以分成 5 层。

### 第一层：Agent 工程化能力

JD 里明确写着，具备 Claude Code、Cursor、OpenClaw 等 AI 编程工具的重度使用经验。

对 AI 辅助编程有自己的理解和思考。

![](https://cdn.paicoding.com/tobebetterjavaer/images/mdnice/f24a25fb0f87-f506515d-5e0f-4fcf-9cdb-bd2f73b26366.png)

我的理解是，不光要会用 Claude Code 写代码，还得知道它内部是怎么拆解任务的、上下文是怎么管理的、工具调用的 schema 是怎么设计的。

能接入 LangChain、OpenAI Agents SDK 这些外部框架，还要能做 Agent 的容器服务、运行时环境、轨迹回放和调试分析。

Docker、Kubernetes、CI/CD、Git 工作流、代码审查，这些在 JD 里是明确要求，不是“加分项”。

![](https://cdn.paicoding.com/tobebetterjavaer/images/mdnice/ef2b9a27e30b-88b0cd49-9c8c-4fe2-8c08-a2e92c20e6f2.jpg)

### 第二层：模型机制理解

JD 里明确提到要理解 Context Window 和 Token 机制。

- 上下文为什么会爆？
- 工具 schema 为什么占 token？
- 多轮对话怎么压缩？
- 长上下文对 Agent 可靠性有什么影响？

这些问题直接决定了 Agent 在长任务中的可靠性。

![](https://cdn.paicoding.com/tobebetterjavaer/images/mdnice/e68165649ead-24d6a077-1fff-4ea8-9c43-89f5ee860071.jpg)

DeepSeek 自家的 V4 Preview 已经把上下文窗口推到了 1M，Agentic Coding 是重点方向。

### 第三层：Tool Use、Function Calling 和 MCP

Agent 全栈岗位直接把 MCP、Tool Use、Function Calling 列为加分项。

- 你能不能定义稳定的工具接口？
- 能不能设计参数 schema？
- 能不能处理工具返回的各种格式？
- 调用链怎么做观测？
- 失败了怎么重试？
- 权限怎么隔离？

拿 MCP 来说，它的全称是 Model Context Protocol，Anthropic 在 2024 年底提出的开放协议，现在已经成了 Agent 接入外部工具的事实标准。

网上我看到有些博主说 MCP 过时了，觉得挺可笑的，因为这玩意就是接入外部工具的最佳方式，只是说 AI 圈新概念新东西太多了，导致有些本身挺好的东西，被掩盖了。

![](https://cdn.paicoding.com/paicoding/68c1df6fc1a320e6a8a1e982f1a9aa53.png)

我昨天也是刚把 MCP 接入了 PaiCLI，代码已经在 GitHub 上开源，个人觉得这里面其实有蛮多东西可以讲。

### 第四层：Planning、Multi-Agent 和长期记忆

模型策略产品经理的 JD 里，Agent 方向明确关注四个东西：Tool Use、Planning、长期记忆、Multi-Agent 协作。

典型场景包括个人助理、Deep Research、自动化工作流、多模态设备控制。

要求是能把一个模糊的用户需求拆成模型能力 gap、数据构造方案和评测指标。

![](https://cdn.paicoding.com/paicoding/93ec63333beca5cd6e394cf1a346d6dd.jpg)

PaiCLI 也接入了这三项能力，让我对 Agent 也有了更进一步的认知。

### 第五层：数据、评测和 RL 循环

Agent 数据策略岗位强调围绕代码生成和通用 Agent 来构造训练语料和端到端测试用例。

评估维度列得很细：可用性、代码规范、工程质量、任务完成度、规划能力、工具调用准确率、多轮交互连贯性、指令跟随等等。

算法研究岗位则要求推理、生成、指令遵循、RLHF/RLAIF、过程奖励、偏好学习，最终形成“数据 → 训练 → 评测”的完整循环。

![](https://cdn.paicoding.com/tobebetterjavaer/images/mdnice/d2b032befdb3-28ced544-eab8-4ecd-9f59-e68128cebac3.jpg)

这个循环是大模型公司的核心竞争力，数据质量决定训练效果，评测体系决定迭代方向。DeepSeek 能在短时间内追上甚至超越一些老牌选手，跟它在评测闭环上的投入密不可分。

## 03、AI 时代该补什么技术？

### 工程基础设施

Linux、网络、数据库、Docker、K8s、CI/CD，这些在 DeepSeek 的 JD 里不是“了解即可”，是明确要求。

Agent 跑起来之后，它不是在你电脑上跑一次就完事，得部署、得监控、得在出问题的时候能快速定位。

### Agent 原理

Tool Use、Function Calling、MCP、context、token、Memory、planning、权限，这些不是概念，每一个背后都对应实际的工程问题。

我在做 PaiCLI 的 MCP 模块时感触特别深。

MCP 协议本身不复杂，JSON-RPC 2.0 加上 stdio 或 Streamable HTTP 两种传输方式。

![](https://cdn.paicoding.com/paicoding/edb1d47942a5394c67b5088ddd1e2848.png)

但真正要做好，你得处理初始化超时、工具注册和命名空间冲突、Schema 清洗让 LLM 能正确理解参数格式、多 Server 并行启动时的错误隔离。这些细节，不亲手写一遍根本体会不到。

### AI 编程工具

Claude Code、Codex 这些 Coding 工具，你得能说清楚它们在哪些任务上强，怎么改 prompt、改上下文、改工具链。

为什么同样的工具，别人 Coding 出来和你 Coding 出来的东西不一样，差距就体现在对这些 AI 工具的驾驭能力上。

像 Codex 的 computer use 是真的好用，可以直接接入 IntelliJ IDEA，很多东西已经不需要人主动去控制了，Agent 就可以接管了。

![](https://cdn.paicoding.com/tobebetterjavaer/images/mdnice/cbc48800a654-c40ceb7b-1c7c-4a7f-8276-5bbcc475a9d9.png)

梁文峰在之前的访谈里说过，DeepSeek 招人“看能力不看经验”，强调“热爱和好奇心”。

是的，处在 AI 时代，我们没办法停下来脚步，和大家一样，有时候我也会感觉很累，但 AI 圈的变化的确能让我学到很多新的知识。

以前脑子里装的很多想法，也都可以落地成为产品。

PaiCLI、派简历、JobClaw、PaiSwitch、PaiAgent、PaiFlow、派聪明，这些都是在 AI 的帮助下完成的。

## 04、怎么学才能满足 JD？

我的建议是，别光看教程，动手做一个 Agent 出来。

具体的学习路径，我觉得可以分三步走。

### 第一步，掌握一个 AI 编程工具

不管是 Claude Code 还是其他任何一个工具，选一个深度使用三个月以上。

在这个过程中你会自然地接触到 prompt 工程、上下文管理、工具调用这些概念，因为你会不断碰到“为什么 Agent 这次没按我想的来”的问题。

比如 Claude Code 在处理超大项目时，上下文经常会被压缩，之前说过的需求它也会忘。那就会逼着我们去学会用 CLAUDE.md 做持久化指令、用 memory 做跨会话记忆、用 compact 策略控制上下文膨胀。

![](https://cdn.paicoding.com/stutymore/build-agent-p3-memory-20260420205808.png)

### 第二步，读一个 Agent 框架的源码。

LangChain、OpenAI Agents SDK、或者 Anthropic 的 Claude Agent SDK 都行。

不需要全读，重点看它怎么做工具调用、怎么管理对话历史、怎么处理错误。

![](https://cdn.paicoding.com/stutymore/cc-gui-idea-20260428100747.png)

之前给大家推荐的 CC GUI，核心就是 Claude Code 的 SDK 和 Codex 的 SDK。

![](https://cdn.paicoding.com/tobebetterjavaer/images/mdnice/1c4faaab0462-d80e4344-1a17-4bd0-ad8a-23cd1e4a0d28.jpg)

![](https://cdn.paicoding.com/tobebetterjavaer/images/mdnice/0c91c64101fd-f019dc18-2fcd-427d-a6ca-36cfaffac7a7.jpg)

### 第三步，自己实现一个

哪怕只实现一个最小可用的 Agent，涵盖工具定义、工具调用、上下文管理、多轮对话这几个核心环节就行。

> https://github.com/itwanger/paicli

![](https://cdn.paicoding.com/tobebetterjavaer/images/mdnice/ec034bb300b5-c4663bb4-2c25-40bf-8f16-9a2409cde689.jpg)

我自己就是每天 Coding 一个小模块，目前已经实现了 ReAct、Multi-Agent、planning、MCP、Memory 机制、RAG、人工审批等等功能。

虽然离成熟的产品，Claude Code 还有很远的距离，但这些核心的 Agent 技术栈都了解的很透彻了。

![](https://cdn.paicoding.com/paicoding/0a494256f19f42765191cb3bb94d252d.jpg)

简历上能写上这些核心技术栈我认为就很有竞争力。

- 基于 JSON-RPC 2.0 协议实现 MCP 客户端，通过 CompletableFuture + ConcurrentHashMap 实现异步请求-响应配对，支持 stdio 和 Streamable HTTP 两种传输方式
- 将 RAG 封装为 search_code 工具注册到 Agent 工具，通过 LLM 系统提示词引导自动触发检索，ReAct 和 Plan-and-Execute 双模式均支持代码库理解
- 设计并实现 Multi-Agent 主从协作架构，解决单 Agent 处理复杂任务的瓶颈，可通过斜杠命令 /team 开启，支持 Planner / Worker / Reviewer 3 类角色。
- 实现上下文压缩器，采用 Map-Reduce 策略分片摘要后合并，保留最近 3 轮完整消息不参与压缩，并支持自动提取关键事实到长期记忆
- 将 web_search 和 web_fetch 作为 Function Calling 工具注册到 Agent 的工具链中，实现了 LLM 自主判断联网时机的智能工具选择

DeepSeek 招人标准的背后，其实是一整套 Agent 的学习标准。

哪怕不是去做大模型本身，去做任何一个细分领域，都很值得。

CLI 只是 Agent 的一个分支，更宏观的 Hermes Agent、OpenClaw，包括 Qoder 这种 AI Coding 工具，以及 Codex 这种 super APP，都能让我们在这个时代有一席之地。

哪怕是 chatbot 这种。

![](https://cdn.paicoding.com/tobebetterjavaer/images/mdnice/ac30e5eff919-34d1c9a6-c73b-4b1e-bc0c-ef90a75aed21.jpg)

我们下期见。
