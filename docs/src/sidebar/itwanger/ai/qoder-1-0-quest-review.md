---
title: Qoder 1.0 实测，Quest 独立视窗 + 跨项目并行，Claude Code 暂时做不到的它做到了。
shortTitle: Qoder 1.0 实测
description: Qoder 1.0 深度测评，从 AI IDE 升级为自主开发工作台，Quest 独立视窗、跨项目多任务并行、团队知识引擎、自定义专家团四大核心升级实测。
tag:
  - Qoder
  - AI编程
category:
  - AI
author: 沉默王二
date: 2026-05-15
---

大家好，我是二哥呀。

之前推荐 Qoder 的时候，评论区反馈最多的就是贵。

但你知道 Qoder 现在多少用户吗？

500 万。

![](https://cdn.paicoding.com/paicoding/8566cd3d9e125564fe59e4456433f56b.png)

70% 的营收竟然来自企业，说明贵的东西除了贵没毛病。

说实话，我从 Qoder 0.1 开始用，一路看着它从一个“还行”的 AI IDE 变成现在这副模样，中间写了好几篇测评，每次都觉得“这次升级挺大的了”，结果下一次又把我惊到。

这次 1.0 直接换了个名字——Autonomous Development Desktop，自主开发工作台。

![](https://cdn.paicoding.com/paicoding/c798f4b4d0a8cc18b7e25193d7a1ed51.jpg)

把 Quest 从 Qoder 中拆出来，独立分了家，哈哈。

AI IDE 这个词已经不够用了。

以前的 Qoder 是“我写代码的时候 AI 在旁边帮忙”，现在是“我告诉 AI 要干什么，它自己去干，干完了叫我验收”。这个转变听起来微妙，实际上是从协作走向了委托。

这篇内容就来聊聊 Qoder 1.0 的核心升级：

Quest 独立视窗、跨项目多任务并行、自定义专家团，外加底层的 Agent Harness 重构。

我会把每个功能掰开了讲，该上手的上手，该吐槽的吐槽。

## 01、Quest 独立视窗

先说最大的变化。

Quest 从 IDE 里的一个模式，升级成了独立视窗。

任务管理、状态追踪、产物审查、知识调用，全部在 Quest 视窗内完成。文件目录、代码变更、终端输出、浏览器预览这些工程信息都支持按需展开，不用离开当前任务的上下文就能深入查看项目细节。

![](https://cdn.paicoding.com/paicoding/f9f651d5af98a5d635d37b2e6fef7cd4.png)

这意味着什么？

我们可以一边在 Editor 里手动改代码，一边让 Quest 自主执行另一个任务。两个窗口之间上下文无缝衔接，在“自己动手”和“委托 AI”两种模式之间自由切换。

以前的 AI 编程工具像副驾驶，我们开车它导航。现在 Quest 更像是雇了一个司机，我们在后座处理别的事，偶尔抬头看看路线对不对。

打开 Quest 视窗后给它一个任务：

> 帮我给 PaiAgent 项目的 workflow 模块添加一个“条件分支”节点，参考现有的 LLM 节点实现方式，支持基于上一步输出的 JSON 字段做条件判断，走不同的下游分支。写完之后跑一下单元测试。

Quest 接到任务后自己拆步骤、读代码、写实现、跑测试。中间 Quest 遇到一个类型定义的问题，弹了个确认框问我怎么处理，我看了一眼选了个方案，它继续干。

![](https://cdn.paicoding.com/paicoding/d61ee715931d9a14c78cc90083a61d57.jpg)

然后控制浏览器开始帮我测试。


![](https://cdn.paicoding.com/paicoding/91335faf9700b234dc463cccf97ee9e2.png)


我在浏览器这里也能看得到他在操作。


![](https://cdn.paicoding.com/paicoding/f86bd334315a95f3410fc62848900eb6.jpg)

这种感觉还是非常爽的。哈哈。

说实话，Quest从Qoder分离出来是对的，就目前来说，我去看代码的时间越来越少了，基本上就是完全信任AI。

出了问题，直接反馈给 Agent，基本上都能搞定。

## 02、跨项目多任务并行

如果说 Quest 独立视窗解决的是“一个项目里你和 AI 分头干活”的问题，那跨项目多任务并行解决的就是“我同时在搞好几个项目”的问题。

Qoder 1.0 把并行范围扩展到了跨项目、跨代码库的维度。你可以在多个 Workspace 中同时运行不同项目的 Agent 任务，通过一个统一面板实时追踪所有任务的动态。

每个 Quest 任务都有独立的状态标签：运行中、等待确认、已完成。不用逐个切窗口去看进度。

我手上同时有 PaiAgent、派聪明、PaiFlow 三个项目，以前想让 AI 帮忙处理不同项目的任务，得开好几个 IDE 窗口来回切。现在在 Qoder 1.0 里，我可以一口气给三个项目各分配一个任务，然后在统一面板里盯着进度就行。

之前已经给 PaiAgent 开了个任务了，这次我们给 PaiCLI 再加一个任务：

> **提示词 2（PaiCLI 项目）**：如果我想让 PaiCLI 能够连接手机端，比如说直接用微信 bot 来进行通信，该怎么办

面板里能看到各自的进度。

![](https://cdn.paicoding.com/paicoding/48d39106150f27f9c32a55dc36d789a4.png)

任务完成后，Qoder 会自动生成一份 Summary 交付清单，涵盖任务进展、产物文档和代码变更，供快速审查。

![](https://cdn.paicoding.com/paicoding/4aace85e4cd1fecd3abfbb2fc3d9b610.jpg)



## 03、Experts 专家团进化

Experts 专家团模式我在之前的文章里已经详细测评过了，当时给我的感受是：

终于不是一个 AI 在战斗了。

但之前有个遗憾：Experts 只能在 Chat 侧边栏里用，没法在 Quest 视窗里用。

1.0 版本把 Experts 正式引入了 Quest 视窗。

![](https://cdn.paicoding.com/paicoding/48ef992424b7dca18a971d97aaa2083d.png)

现在你在 Quest 里可以自由选择单 Agent 模式或 Experts 专家团模式。专家团由规划、调研、编码、审查、测试五类专家组成，以流水线方式协同交付。

简单任务用单 Agent 就够了，复杂任务切到 Experts，Leader Agent 自动拆任务、分配给不同专家、盯进度、合并结果。


![](https://cdn.paicoding.com/paicoding/f948556dc5cc7c5007f2b68bd66541a7.jpg)


更大的升级是自定义专家能力。

以前的 Experts 是 Qoder 预设好的五个角色，只能用他们提供的配置。现在我们可以自己创建专属 Agent 团队，为每个 Agent 配置领域知识、任务技能和外部工具接口。

这个功能的想象空间很大。理论上每个团队都可以根据自己的技术栈和业务场景打造一套专属的 Agent 团队。

![](https://cdn.paicoding.com/paicoding/c24661cf6ce30c2e53288bd0943cb5b5.png)

前端团队可以有 React 专家、Vue 专家；后端团队可以有微服务专家、数据库专家；测试团队可以有接口测试专家、性能测试专家。

## 04、Agent Harness 底层重构

模型提供智能，Harness 决定这份智能能否转化为可用交付。

现在每个任务都有独立的运行时环境，绑定到具体的 Workspace。任务从源工程创建，在绑定的执行环境中运行，产物、Review 和 Commit 落到明确的交付目标。

更重要的是 Artifact 流水线的概念。

Agent 的执行过程被结构化为可审查的产物线索，每一步都有清晰的归属和状态。你可以追溯 Agent 在第三步做了什么决策、为什么改了这个文件、测试结果是什么。

![](https://cdn.paicoding.com/paicoding/4ef811db3f27d23771e14060e2acac89.png)


## ending

Quest 独立视窗让我第一次觉得，“委托 AI 干活”不再是一句口号。

AI 编程的下一步，不是让 AI 写更快的代码，而是让 AI 接手更完整的任务。

从“帮我写这个函数”到“帮我实现这个功能”再到“帮我完成这个项目”。Qoder 1.0 正在朝着这个方向走。

【我觉得 AI 编程工具的终极形态，可能真的要把编辑器去掉了，就像 Quest 从 Qoder 分家一样。】

我们下期见。

