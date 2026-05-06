---
title: 打饭时我问老板：“你说你用Claude，你用的是 CLI，还是 Agent、Opus？”老板懵了：“这有区别吗？不都是Claude”，打饭阿姨听了直摇头。
shortTitle: Agent与Harness解析
description: 深度剖析 CLI、Agent、Harness、模型之间的关系，搞懂为什么同一个模型在不同工具里表现天差地别
tag:
  - Agent
  - CLI
category:
  - AI
author: 沉默王二
date: 2026-04-27
---



大家好，我是二哥呀。

像 Claude，不仅有网页版，还有 Claude APP，以及 Claude Code，他们之间到底有什么区别，和 Agent 有什么关系，和 CLI 又有什么关系呢？

![](https://cdn.paicoding.com/paicoding/9311005c867d258fd4f7c2d09498635a.png)

今天就来给大家详细的盘点一下，搞清楚，装比的时候咱也有底气😄。

> 系好安全带，我们粗粗粗粗发～

我画了一张图，大家瞅一眼就能知道个大概。

就能理解为什么同一个 Claude，在不同地方用起来体验差距会这么大。


![](https://cdn.paicoding.com/paicoding/f0a4284533eb21a0978a6fc5998b0942.jpg)

最底层是**模型层**。Opus 4.7、Sonnet 4.6、DeepSeek V4、GLM-5.1、GPT-5.5，这些都是模型。

模型就是发动机，决定了这辆车的马力上限。Opus 4.7 是 V12 双涡轮，Sonnet 4.6 是四缸，下限差不多，但上限完全不同。

中间是 **Harness**。2026 年 2 月，OpenAI 的 Ryan Lopopolo 给过这么一个定义：**Agent = Model + Harness**。

Harness 包括 tool call、context 管理、权限系统、Memory、ReAct 等等，决定了模型的能力能发挥出几成。

我最近就在肝一个项目，名叫 PaiCLI，目前已经实现的功能包括以下这些，还是非常经典的一个 Agent 项目，大家可以期待一下最终的交付效果。

![](https://cdn.paicoding.com/paicoding/3ad47eeee4e3d1bf7320ea3c7164d19a.jpg)

最上层是**外壳**，也就是我们平时接触到的 GUI。

Claude Code、Claude 桌面版、Qoder、IntelliJ IDEA 的各种 AI 插件等等，这些都是外壳。

![](https://cdn.paicoding.com/paicoding/721aaea70a6d7aaa94149dc0b821aa68.png)

外壳决定了我们和 AI 交互的方式，对用户友不友好，能不能让模型发挥出他该有的价值。

在 Claude 网页版，用的是 Opus 模型 + 网页版的 Harness + 浏览器外壳。在终端里用 Claude Code，用的是同一个 Opus 模型 + Claude Code 的 Harness + 命令行外壳。

拉开差距的正是工具对 Harness 的封装。

## 01、CLI 到底是个啥？

CLI 全称 Command Line Interface，命令行界面。

打开 macOS 的终端，输入 `ls` 查看文件列表，输入 `git commit` 提交代码，这些都是在用 CLI。

![](https://cdn.paicoding.com/paicoding/1493cbcbc55c0c4637c4405efe3e04b2.png)

和它对应的概念是 GUI（Graphical User Interface），就是有按钮、有窗口、能用鼠标点的图形界面。

Claude Code 就是一个 CLI 工具。

在终端里输入 `claude`，它就启动了。没有花里胡哨的界面，就是一个命令行窗口。


为什么要用 CLI 而不用好看的 GUI？

因为 Agent 这个场景天然适合命令行。

![](https://cdn.paicoding.com/paicoding/3102283d433c1e55bbf82154b829e78b.jpg)

代码文件本身就是纯文本，终端可以直接读写。

让 AI 直接在终端里干活，省去了“复制代码 → 粘贴到编辑器 → 运行 → 看报错 → 再复制回去问 AI”来回折腾的过程。

Claude Code 能直接读项目目录，能直接改文件，能直接跑测试命令，能直接看报错日志。

整个工作流在一个窗口里，这就是 CLI 的优势。


![](https://cdn.paicoding.com/paicoding/5658790e41e6ec9375d588a6d5710d7b.jpg)


而且 CLI 还有一个容易被忽略的好处——省 token。因为 GUI 需要渲染大量界面信息，这些信息对 AI 来说都市无效燥音。

当然了，CLI 也不是万能的。

如果要做前端页面调试、看 UI 效果，纯命令行确实不太方便。所以现在主流的做法是混合使用，我会用Claude Code编码，然后调用Chrome Devtools MCP 做自动化测试。

## 02、模型是基本功

模型是一切的起点。

没有好的模型，Harness 做得再好也白搭——你不能指望一台拖拉机的发动机装到法拉利就能跑出飞一般的感觉。

Claude Opus 4.7 和 GPT-5.5 就是目前最屌的模型层，能力方面确实没得说。


![](https://cdn.paicoding.com/paicoding/455763218b895f0494cc27180e2f633a.png)


我日常开发的第一梯队就是他俩，谁的剩余额度多就先用谁的，谁出bug了解决不了，就切到另外一个去搞定。

基本上没有遇到迈不过去的坎。

虽然都在说Opus 4.7 在降智，但我觉得编程方向没什么问题，就是文本方面不说人话了。

第二梯队，我认为就是GLM-5.1、DeepSeek V4和Kimi 2.6，GLM-5.1 我是max 套餐，所以画图、派聪明RAG、PaiCLI等项目我都接的 GLM-5.1，不够用了，再切到其他两个选项。

![](https://cdn.paicoding.com/paicoding/3b1702a13719102f7613e7a629508fcd.png)

## 03、Harness 是胜负手

**同一个模型，在不同的 Harness 框架里，表现天差地别。**

就比如说，把 DeepSeek V4 接到我的PaiCLI，他发挥出来的功力可能就是一成，因为PaiCLI不算是生产级别的工具，和Claude Code这种没法比。

![](https://cdn.paicoding.com/paicoding/b79c309cd363e94c2f8f39a96b4c84ba.jpg)

如果你感觉自己的模型降智了，很可能是上下文污染了，或者你用的工具和模型不适配。

为什么？

**第一，Agent Loop**。

Claude Code 的 Agentic Loop 我研究过源码，它每一轮循环都会做三件事：gather context（收集上下文）→ take action（采取动作）→ verify work（验证结果）。

这三件事在 Claude 官方的工程博客里被反复强调，是所有 Agent 设计的骨架。

![](https://cdn.paicoding.com/paicoding/cc9e6fe6313d4e0426d67587acc1e9ff.jpg)

**第二，Tool System**。

Tool System 的作用，就是把模型的文字输出翻译成可执行的动作。

读文件、写文件、跑命令、查数据库、调外部 API，全都得通过工具。Claude Code 有一个非常巧妙的设计哲学——少而精的工具，原子组合。

它的内置工具不多，就那十几个（Read、Write、Edit、Bash、Grep、Glob 等等），但组合起来能解决绝大部分开发任务。

![](https://cdn.paicoding.com/paicoding/6b404838749f688cbcf6e0d98bb73e82.png)

**第三，context 管理**。Claude Code 的一次会话可能会累积大量的上下文——读了哪些文件、跑了哪些命令、grep 了哪些结果、diff 了哪些代码。

当上下文快撑爆的时候，Harness 会自动压缩——保留当前任务、最近的报错、文件名这些关键信息，丢掉中间过程的细节。

![](https://cdn.paicoding.com/paicoding/84c97191f5c6cf0cbce57f7734b9d5b8.png)

之前有小伙伴跟我抱怨 GLM-5.1 在编程方面效果很差，一问用的什么工具，是 OpenCode。

我不是说 OpenCode 不好，但同样的底层模型，Harness 做得好不好，体验差距确实很大。

Claude Code 本身是免费的，可以接入各种大模型，能把本身模型的能力拉到满中满。

我自己就做了一个PaiSwitch，底层模型切换比 CC switch 好用。因为本质上很简单，就是改一下URL，改一下API key。

![](https://cdn.paicoding.com/paicoding/35e1d58ad8a981e883e51b348beff079.png)


## 04、Agent 是什么意思？

说实话，Agent 这个词有点被用烂了。

在 AI 编程的语境里，Agent 指的是**能自主决策和执行任务的 AI 系统**。

注意关键词是“自主”，不是你问一句它答一句的问答模式，而是你给它一个目标，它自己能拆解任务、自己选工具、自己执行、自己验证结果。

就比如说 PaiCLI 可以针对你的问题进行规划，拆解。

![](https://cdn.paicoding.com/paicoding/db3c564515556918368f731a4bcb10db.jpg)


传统的 AI 聊天是这样的：你问“这段代码有什么 bug”，它告诉你“第 15 行的变量没有初始化”。完了。

它只负责回答，不负责动手。

Agent 模式是这样的：你说“这段代码有什么 bug”，它会先读相关的代码文件，理解项目结构，定位 bug 位置，写出修复代码，跑测试验证，如果测试没过再回去改，直到修好为止。

整个过程你可以不参与。

Claude Code 就是一个典型的 Agent。你在终端里给它下达任务，它会自己规划步骤、调用工具（读文件、写文件、跑命令）、根据反馈调整策略。你能看到它在做什么，觉得不对可以随时喊停，但大多数时候它能自己搞定。

就比如说 Claude Code 能用时 13 分钟来完成第九期联网功能的开发，并自己测试，然后给出下一步的建议。

![](https://cdn.paicoding.com/paicoding/7382be9c2876b86e641767429f649c5c.jpg)

**Agent = Model + Harness**。

Model 是大脑，提供理解和推理能力。

Harness 是身体和工具，提供感知环境和执行动作的能力。

两者合在一起，才构成一个完整的 Agent。

所以当有人说“我用 Claude Code 写代码”的时候，他实际上是在用一个由 Opus 模型驱动、Claude Code Harness 武装起来的 Agent 在干活。

## 05、当下主流 AI 编程工具对比

**Claude Code**：Anthropic 官方出品的终端 Agent。

底层模型是 Opus/Sonnet（当然也可以接DeepSeek V4和GLM-5.1、Kimi 2.6），Harness 做得非常扎实（前面详细讲过了），外壳是 CLI。

Agent 能力最完整、上下文窗口最大（1M）、token 效率最高。

目前是我的主力编程工具。

**Codex**：OpenAI 的 super APP，我的第二主力编程工具，最牛逼的是能 computer use、浏览器 use，量大管饱。

![](https://cdn.paicoding.com/paicoding/734a02497ba1a8f77a982565503dee08.png)

**Qoder/Qoder CLI**：阿里系的产品，底层模型据说有一些是Claude Opus，我会在 Claude 额度不够的时候启用。

专家团是目前我用的最多的场景。

IntelliJ IDEA，我现在也是基本上每天必开，毕竟是个后端，这玩意看代码目前没办法被取代，吊打任何一款 AI IDE，比如说 Cursor。

有很多种方法可以接入 Codex、Claude Code，比如说 CC GUI，比如说 IntelliJ IDEA 原生的 AI 助手，再比如说其他各种插件，如 Qoder。

![](https://cdn.paicoding.com/paicoding/2b57f505d6366cc447a7b02f557e1e58.png)

**Cursor**：AI 原生 IDE，我已经弃用了。

以上这些，至少必须拥有一个。

这些玩意是真的挺烧钱的，还有很多小伙伴在蹭免费额度，但不管怎么样，必须得用上一个，别天天喊给大模型公司打工。

现阶段，你不拥抱AI，差距只会越拉越大，时代变了。

别头铁。

## 06、我自已的 CLI 实践

最近我在从 0 到 1 写一个 CLI 工具。

![](https://cdn.paicoding.com/paicoding/c0167f624e57075b8e8536039d7d3c57.jpg)

底层模型可以切换 GLM-5.1 和 DeepSeek V4。

目前已经实现了 ReAct + Tool Call、Plan-and-Execute、Memory、RAG、Multi-Agent、Human-in-the-Loop、并发、多模型适配这些基础能力。

今天打算实现 Web search 和 web fetch。

为什么要自己造？

因为用了大半年的 Claude Code，我越来越清楚 Harness 这一层有多重要，也越来越想理解它到底是怎么工作的。最好的学习方式就是自己造一个。

哈哈哈，装比下。

其实就是想给大家提供一个 Agent 的实战项目。

![](https://cdn.paicoding.com/paicoding/0dbcbf9fbf17a661b3782575512b5a89.jpg)

代码也是完全开源的：`https://github.com/itwanger/paicli`

需要的小伙伴，可以一起学习啊。


## ending

CLI、Agent、Opus、Harness，这四个词看起来像在说四件事，其实在说同一件事的四个维度。

CLI 是你和 AI 对话的方式，

Opus 是 AI 的大脑，

Harness 是 AI 的工程化实践，让AI发挥最大能力，让AI被你所用，

Agent 是它们三个合在一起之后的产物。

![](https://cdn.paicoding.com/paicoding/fa97384bd11591c801cca7caff34aafa.jpg)

**【工具的价值不在于它有多强，而在于它到底有没有帮助到你，有没有提升你的生产力。】**

我们要做的，就是理解它，明白这些概念、原理和底层；也只有这样，我们才能不被拉开差距，才能脱颖而出。

毕竟 AI 放大了我们的边界能力。

一个不懂操作系统页面置换原理的人，也能 Coding 出一个牛奔的产品。

记住这句话，宁可盲目的自信，也不要妄自菲薄。

冲吧。

