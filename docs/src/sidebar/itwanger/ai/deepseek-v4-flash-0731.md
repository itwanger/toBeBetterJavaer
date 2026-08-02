---
title: DeepSeek V4 正式版发布，Responses API 完美适配Codex
shortTitle: DeepSeek V4 正式版适配 Codex
description: DeepSeek V4-Flash 正式版（0731）更新日志逐条拆解，原生支持 Responses API 适配 Codex、九项 Agent 基准、极简 Harness 测试条件、峰谷定价怎么算才不亏。
keywords: DeepSeek V4, DeepSeek V4-Flash 正式版, Responses API, Codex, Agent 基准测试
tag:
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-07-31
---

大家好，我是二哥呀。

就在今天，DeepSeek 更新了 API 文档，V4-Flash 正式版上线公测。

![](https://cdn.paicoding.com/stutymore/deepseek-v4-flash-0731-20260731193544.png)

> DeepSeek-V4-Flash-0731 的模型结构、尺寸和 DeepSeek-V4-Flash-Preview 保持一致，仅重新进行了后训练。

结构没改，尺寸没改，还是 284B 总参数、13B 激活参数。但 Agent 能力大幅增强，基准测试远超 V4-Pro-Preview。

## 01、这次到底改了什么

本次仅升级了 DeepSeek-V4-Flash 的 API 接口，DeepSeek-V4-Pro API 及 APP/WEB 端模型未做更改。

![](https://cdn.paicoding.com/stutymore/deepseek-v4-flash-0731-20260731174815-71a13c43.png)

这里需要解释一下预训练和后训练的分工。

预训练是模型读遍互联网学到的东西，世界知识、语言规律、代码语法都在这个阶段进去。后训练是在这个基础上教模型怎么做事，包括监督微调和强化学习，教的内容是行为模式——收到一个任务先干什么、什么时候该调工具、工具报错了怎么办、什么情况下可以宣布完成。

预训练决定模型知道多少，后训练决定模型会不会干活。

![](https://cdn.paicoding.com/stutymore/deepseek-v4-flash-0731-20260731175312-34b57ac8.png)

**这次 Flash 正式版改的是后半截。**

## 02、13B 激活凭什么超过 49B

为什么只改后训练，Agent 基准能超过激活参数大自己四倍的 Pro 预览版？

大家可以回想一下自己用 Agent 的过程。给它一个任务，比如说把这个模块的报错查出来修掉，它需要做的事情是这样几步。

先判断该看哪些文件，然后调用读文件的工具，读完之后从一堆输出里挑出有用的部分，判断信息够不够，不够就再读，够了就动手改，改完跑一遍测试，测试没过就回到上一步重来，测试过了才停下来。

这一整套流程里，需要世界知识的环节其实很少。

真正决定成败的是别的东西。工具选得对不对、参数填得全不全、工具返回一大堆内容时能不能挑出关键那几行、失败之后会不会换个方式重试而不是在原地反复撞、以及最要命的一点，知不知道什么时候该停。

![](https://cdn.paicoding.com/stutymore/deepseek-v4-flash-0731-20260731175759-9580c43a.png)

这些全是行为模式，全在后训练里。

Agent 干活的时候，需要的信息大多来自它自己读到的文件和工具返回的结果，而不是模型脑子里存的东西。

**在 Agent 场景里，激活参数的边际收益比在问答场景里低得多。**

![](https://cdn.paicoding.com/stutymore/deepseek-v4-flash-0731-20260731180657-793ef2b2.png)

一是选模型的时候别只看参数规模，跑 Agent 类任务，同一家的小模型和大模型差距可能比参数比例暗示的小很多，价格差距却是实打实的。

二是自己的 Agent 跑不稳的时候，先别急着换更大的模型。按上面那条流程逐环节看，工具描述有没有写清楚、失败有没有重试、上下文有没有及时截断，这些环节的收益往往比换模型大。

## 03、跑个分

这次更新日志给了九项基准分数。我先把它们完整列出来。

| 基准 | 分数 |
| --- | --- |
| Terminal Bench 2.1 | 82.7 |
| Cybergym | 76.7 |
| Toolathlon verified | 70.3 |
| DSBench-FullStack | 68.7 |
| DSBench-Hard | 59.6 |
| DeepSWE | 54.4 |
| NL2Repo | 54.2 |
| Agent Last Exam | 25.2 |
| Automation Bench (Public) | 25.1 |

![](https://cdn.paicoding.com/stutymore/deepseek-v4-flash-0731-20260731181256-bf4dedbf.png)

九项基准大致能归成三类。

终端与软件工程类，包括 Terminal Bench 2.1、DeepSWE、NL2Repo，考的是在终端环境和真实代码仓库里完成开发任务。工具调用与自动化类，包括 Toolathlon verified、Automation Bench、Agent Last Exam，考的是多工具协作和长流程任务。全栈开发类，就是 DSBench 那两项，官方标注了这是内部测试集。

分数其实是次要的，因为它随着测试条件浮动，条件不说清楚，分数就没法比。

官方写的测试配置是这样的，公开基准测试使用 DeepSeek Harness 极简模式。

Harness 这个词得解释一下。它指的是模型外面套的那层脚手架，Claude Code 之所以好用，不只是因为它把提示词转发给模型，而是它在中间加了任务拆解、文件读写、终端操作、自动纠错这些能力。这层能力就是 Harness。

![](https://cdn.paicoding.com/stutymore/deepseek-v4-flash-0731-20260731181914-3131d6a8.png)

同一个模型，套在不同的 Harness 里，表现可以差出一大截。

反过来说，同一个 Harness 换不同的底层模型，也能直观看出模型之间的差距。这是我们平时判断模型能力的常用方法。

所以跑基准的时候用什么 Harness，直接决定了分数里有多少是模型的功劳、有多少是脚手架的功劳。一个足够聪明的 Harness 可以帮模型兜住很多问题——模型忘了重试，Harness 帮它重试；模型输出格式错了，Harness 帮它修。

**我的推断是，用极简 Harness 报分数，说明 DeepSeek 想强调这些成绩主要由模型自身能力贡献，而不是靠外层框架兜出来的。**

平时看到某个模型的基准分数很漂亮，接到自己项目里却达不到那个水平，很常见的原因就是人家跑分用的 Harness 比我们自己搭的那套强得多。

![](https://cdn.paicoding.com/stutymore/deepseek-v4-flash-0731-20260731182348-16448c16.png)

而极简 Harness 跑出来的分数，落差通常会小一些。

## 04、原生支持 Responses API

这次更新里还有一条，我认为更值得关注。

正式版 V4-Flash 原生支持 Responses API 格式并针对性适配 Codex。

要说清楚这条为什么重要，得先说清楚 Responses API 和我们熟悉的那套接口差在哪。

大家平时调大模型用的基本都是 Chat Completions 格式，一个 messages 数组丢过去，模型返回一段内容。这套接口是无状态的，每一轮对话我们都得把之前的全部历史重新拼进 messages 里再发一次。

Responses API 是 OpenAI 后来推出的另一套接口格式，两个关键差别。

第一是它可以是有状态的，服务端记得上一轮的响应，下一轮可以直接引用响应 ID 接着往下走，不用每轮都把历史全量重传。

第二是它对推理过程和工具调用有专门的结构化表达。模型的思考过程、工具调用请求、工具返回结果，在这套格式里是各自独立的条目，而不是全都压成一段文本塞进 messages 里。

第二点对 Agent 特别关键。

![Chat Completions 与 Responses API 的结构差异](https://cdn.paicoding.com/stutymore/deepseek-v4-flash-0731-20260731182747-60e8d461.png)

因为一个 Agent 跑长任务的时候，模型的推理过程需要在多轮之间传下去。这一轮它想明白了「这个报错的根因在配置文件」，下一轮它应该记得这个判断，而不是从零重新推一遍。

用 Chat Completions 传递这种信息，中间层需要把推理过程序列化成文本再塞回去，过程中容易丢失。

所以现在的终端 Agent 工具，Codex 走的就是 Responses API 这套协议。

如果一个模型只提供 Chat Completions 接口，想接到 Codex 上就得在中间加一层协议转换，把 Responses 格式的请求翻译成 Chat Completions，再把返回结果翻译回去。这层转换写起来不难，麻烦在于它是有损的，推理过程和工具调用的结构化信息在转换里很容易被压扁。

原生支持意味着这层转换不需要了。

再加上官方说的针对性适配 Codex，我的理解是不只协议格式对得上，模型在后训练阶段还专门练过 Codex 那套工具约定和交互习惯。

![Codex 接入 DeepSeek V4-Flash 的配置](https://cdn.paicoding.com/stutymore/deepseek-v4-flash-0731-20260731182934-691efe51.png)


## 05、价格表和峰谷定价

单位为元每百万 tokens。

| 项目 | V4-Flash | V4-Pro |
| --- | --- | --- |
| 上下文长度 | 1M | 1M |
| 最大输出 | 384K | 384K |
| 输入（缓存命中） | 0.02 | 0.025 |
| 输入（缓存未命中） | 1 | 3 |
| 输出 | 2 | 6 |
| 并发限制 | 2500 | 500 |

![DeepSeek V4-Flash 的价格并发与上下文优势](https://cdn.paicoding.com/stutymore/deepseek-v4-flash-0731-20260731183128-5186c911.png)

这张表里我认为最该盯的是缓存命中那一行，0.02 元每百万 tokens。

和缓存未命中的 1 元比，差了五十倍。

为什么这一行对 Agent 场景格外重要？因为 Agent 干活的时候，每一轮请求里都有很大一块内容是重复的——系统提示词、工具定义、项目结构说明、之前几轮的对话历史。这些内容在一次任务的几十轮请求里会被反复传送。

如果这部分能命中缓存，实际账单和不命中的情况能差出一个量级。

最后是这次要留意的新规则，峰谷定价。

官方定价页写的是高峰时段价格为平时价格的 2 倍，时段为北京时间每日 9:00 到 12:00 和 14:00 到 18:00。

![DeepSeek 峰谷定价时段说明](https://cdn.paicoding.com/stutymore/deepseek-v4-flash-0731-20260731183318-6045ff21.png)

这两个时段正好是大家上班的时候。

## 06、怎么接进来

按官方文档，DeepSeek 的接口兼容 OpenAI 格式，Base URL 是 `https://api.deepseek.com`，模型名填 `deepseek-v4-flash` 就是这次的正式版。API Key 在 DeepSeek 开放平台申请。

所以凡是支持自定义 OpenAI 兼容接口的工具，配置方式都是一样的三件套，Base URL、API Key、model 名称。

Codex 这边因为有原生 Responses API 支持，配置的时候可以直接指向 DeepSeek 的接口，不需要中间层做协议转换。

![三类工具接入 DeepSeek V4-Flash 的配置对照](https://cdn.paicoding.com/stutymore/deepseek-v4-flash-0731-20260731183518-ddce9356.png)

## ending

V4-Flash 正式版的骨架和四月预览版完全一样，变化全部来自重做的后训练，而 Agent 能力提升主要就来自这一层——这件事本身在提醒我们，Agent 跑得好不好，模型有多大不是唯一变量。

原生支持 Responses API 并适配 Codex。它意味着一个价格便宜、并发给到 2500 的模型，可以直接插进主流 Agent 工具里，中间不用垫一层协议转换。

**打开自己 Agent 项目的请求日志，看一眼系统提示词和工具定义有没有稳定待在请求前缀里。**

![提升缓存命中率的请求拼装要点](https://cdn.paicoding.com/stutymore/deepseek-v4-flash-0731-20260731183706-b3517f70.png)

Pro 正式版，我们等着。

下期见。
