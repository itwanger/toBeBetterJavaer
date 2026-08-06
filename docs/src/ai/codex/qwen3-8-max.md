---
title: 阿里继续发力，Qwen3.8-Max 正式发布。
shortTitle: Qwen3.8-Max 正式发布
description: Qwen3.8-Max 正式版发布，2.4T 总参数、95B 激活参数、1M 上下文、131K 最大输出，API 定价 2 美元输入、6 美元输出。本文拆解官方基准、跨 Harness 稳定性、10 天以上长任务案例与真实使用成本，并说明哪些结论仍待独立验证。
keywords: Qwen3.8-Max, 通义千问, Coding Agent, Harness, 大模型 API 价格
tag:
  - AI
  - 大模型
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-08-03
---

阿里正式发布了 Qwen3.8-Max。

2.4T 总参数，支持图像和视频输入，原生多模态。100 万 Token 上下文，最大输出 13.1 万 Token。

下周会开放 Qwen3.8-Max 和 Qwen3.8-27B 的权重，预示着你可以在本地部署，哈哈，不过一般人的电脑没有这配置。

![](https://cdn.paicoding.com/stutymore/qwen3-8-max-20260804083907.png)

这两年，看过太多模型发布后，我越来越不愿意只盯着参数和榜单了。一个模型在表格里多赢两项，对开发团队未必有多大意义。

我真正想要的是，它换到我们的工作流里还能不能打，跑的轮次多了会不会失忆，出错后能不能自己纠错。

## 01、第一梯队

Qwen3.8-Max 是一个 2.4T 总参数、95B 激活参数的 MoE 模型。

MoE 可以理解成一家公司养了很多专家，但每次接任务时，不需要所有人一起上，而是根据问题只调动其中一部分。这样既能把模型容量做大，又不用为每个 Token 激活全部参数。

![](https://cdn.paicoding.com/stutymore/qwen3-8-max-20260804084331.png)

Qwen3.8-Max 面向 Coding 和 professional work，支持文本、图像、视频输入，也支持 Function Calling、结构化输出、Web Search、Code Interpreter 等能力。官方还宣称，它可以自主编码并交付持续 10 天以上的完整项目。

官方还给出了 OpenAI Chat Completions、Responses API 和 Anthropic API 三套接入方式，并提供 Claude Code、Codex、Qoder CLI、Qwen Code、OpenClaw 的配置示例。

能跑不同工具，不只取决于模型会不会调用函数，也取决于服务端能否接住对应协议，以及推理过程、工具调用结果能不能在多轮之间正确传递。

这次还增加了 `reasoning_effort`，可以在 low、medium、xhigh 三档之间调节，默认是 xhigh；`preserve_thinking` 默认开启，用来在多轮工具调用之间保留必要的推理状态。

说人话就是，同一个模型可以按任务难度分配脑力。

简单改文案、查字段，没必要每次都开到最高档；复杂重构和长链路调试，再把推理强度拉满。

注意，长任务的结果会同时受到模型、Harness、工具权限、上下文管理、测试环境和人类介入程度影响。

## 02、跑分环节

官方发布材料列出了 16 项主要能力对比，覆盖软件工程、电脑操作、专业知识工作、视觉理解和长视频等任务。

Qwen3.8-Max 的 PaperBench 得分是 93.0，高于 Claude Fable 5 的 88.8 和 GPT-5.6 Sol 的 90.5；OSWorld-Verified 得分 86.1；在 ERQA、PerceptionBench、LVBench 等视觉与长视频项目上也排在前列。

![](https://cdn.paicoding.com/stutymore/qwen3-8-max-20260804084630.png)

但它不是全项第一。

比如 SWE-bench Pro，Qwen3.8-Max 是 67.7，Claude Fable 5 是 80.0；FrontierSWE 上，前者是 73.5，后者是 88.8。更准确的说法应该是“按官方评测，能力均衡，进入全球第一梯队”。

这 16 项并不是同一种考试。

PaperBench 更接近论文理解与复现，OSWorld-Verified 看的是桌面环境操作，SWE-bench Pro 和 FrontierSWE 更靠近真实软件工程。

做代码 Agent 的团队，应该优先看软件工程与工具调用；做合同审查和行业研究的团队，更该看长文档、检索和专业工作任务。

还有一个经常被忽略的问题：不同模型的分数，未必跑在完全相同的 Harness、推理强度和工具配置下。

Harness 就是包在模型外面的那层工程脚手架。Claude Code、Codex、Qwen Code、OpenClaw 都可以看作不同的 Harness。它们负责给模型描述工具、拼接上下文、处理失败重试、截断输出，甚至在模型跑偏时把它拉回来。

同一个模型，套上不同 Harness，最后的完成率完全可能差一截。

Qwen 这次专门给了一组 Cross-Harness 数据。Qwen3.8-Max 被放进 QwenWork、Claude Code、Codex、OpenClaw、Hermes 和 OpenCode 后，CoWorkBench 大致落在 73.2 到 75.8，WorkspaceBench 大致落在 67 到 71.2，JobBench 大致落在 53.4 到 59.8。

![](https://cdn.paicoding.com/stutymore/qwen3-8-max-harness-generalization-3.8.png)

这组数据的意义不是“换什么工具都一样”。JobBench 的最高和最低仍然差了 6 个多点。

它真正能说明的是，Qwen 团队至少把同一个模型放进了多种主流工具自测，而不是只给 QwenWork 一个分数。按这组官方结果，换 Harness 后没有出现整体断崖式下降。

但官方没有完整披露每一组任务的版本、推理档位、Token 预算和重试策略，也不能排除模型针对特定 Harness 做过适配。

官方还展示了一条强化学习环境数量与效果的曲线：没有环境训练时是 0.474，扩到约 4000 个环境时达到 0.725，继续堆到 4500 和 5000 个，反而回落到 0.719 和 0.689。

![](https://cdn.paicoding.com/stutymore/qwen3-8-max-20260804085134.png)

## 03、长程任务

官方展示了一个持续 16 天的自主编程项目：累计 265 次提交、127 个 Pull Request、151 个 Issue。

![](https://cdn.paicoding.com/stutymore/qwen3-8-max-20260804085316.png)

有需要造轮子的小伙伴可以直接看看源码，算是和我的PaiCLI同一种类型，做终端Agent的。

“上下文很长”和“长程任务能跑完”是两个概念。

1M 上下文只是给了模型一张更大的工作台，它不等于模型拥有十天不会衰减的永久记忆。如果把所有终端日志、完整源码和每轮思考都无脑塞进去，再大的窗口也会被填满。

真正的长任务还要会压缩历史、保存计划、记录已经通过的验收项，并把关键状态写进仓库、任务面板或外部记忆，而不是只放在对话里。

## 04、API 价格

API 价格是：每百万 Token 输入 2 美元，输出 6 美元；隐式缓存输入 0.25 美元，显式缓存创建 2.5 美元，显式缓存读取 0.17 美元。

![](https://cdn.paicoding.com/stutymore/qwen3-8-max-20260804085654.png)

为了有个直观感受，我统一按普通 API 标准价，算一个 10 万输入 Token、2 万输出 Token 的任务。

| 模型 | 输入价/百万 Token | 输出价/百万 Token | 固定 Token 用量下的账面成本 |
| --- | ---: | ---: | ---: |
| Qwen3.8-Max | 2 美元 | 6 美元 | 0.32 美元 |
| Gemini 3.1 Pro Preview | 2 美元 | 12 美元 | 0.44 美元 |
| Claude Opus 4.8 | 5 美元 | 25 美元 | 1.00 美元 |
| GPT-5.6 Sol | 5 美元 | 30 美元 | 1.10 美元 |
| Claude Fable 5 | 10 美元 | 50 美元 | 2.00 美元 |

![](https://cdn.paicoding.com/stutymore/qwen3-8-max-cost-20260803152535-8c76fc47.png)

和国产模型比，Qwen3.8-Max 也不是最低价。DeepSeek 官方当前给 V4-Pro 的价格是缓存未命中输入 3 元、输出 6 元每百万 Token，纯 Token 单价明显更低。

那为什么我仍然认为价格是 Qwen3.8-Max 的核心竞争力？

因为 Agent 的成本不能只看一次请求，而要看“完成一个任务总共花了多少”。

一个按官方评测进入第一梯队、输出价格又只有 Opus 4.8 不到四分之一的模型，只要真实完成率足够接近，就能显著降低大规模部署门槛。

缓存也很关键。

Agent 每一轮都会重复携带系统提示词、工具定义、仓库说明和部分历史对话。如果稳定前缀能大量命中缓存，真实输入成本还会继续下降。

## 05、要不要换

如果你的任务需要读大仓库、处理超长文档、频繁调工具，或者连续工作几个小时，那它就值得进候选名单。

1M 上下文、图像和视频输入、结构化输出、Function Calling，以及相对海外旗舰更低的输出价格，正好服务于这类工作流。

我建议拿自己团队过去已经完成的 20 到 50 个真实任务做一次 A/B 测试。

固定同一个 Harness、相同工具权限、相同超时和 Token 预算，然后记录五个指标：任务一次完成率、平均重试次数、人工介入次数、P95 完成时间，以及每个通过验收任务的总成本。

任务集至少要覆盖新功能、旧代码修复、跨文件重构、测试补齐和文档任务；再按简单、中等、困难分层。

每个模型使用同一个仓库快照，跑完后由自动测试和人工代码审查共同验收。

![](https://cdn.paicoding.com/stutymore/qwen3-8-max-ab-test-20260803152552-47784c51.png)

很多看起来惊艳的长任务，真正放进团队后成本暴涨，问题就出在这些没有进入 Token 账单的隐形劳动上。

比如模型 A 每次只花 0.2 美元，但通过率 40%；模型 B 每次花 0.5 美元，通过率 90%。粗略按成功任务折算，A 的基础调用成本是 0.5 美元，B 是 0.56 美元，两者已经很接近。但把重试等待和人工修复算进去，B 反而可能更便宜。

## 06、写在最后

写完这篇，我对 Qwen3.8-Max 最大的感受，不是国产模型又多了一个 2.4T 的大块头。

而是模型厂商开始正面回答开发团队最关心的三个问题：它能不能在不同工具里保持稳定，能不能把一件事持续做完，以及做完以后这张账单能不能承受。

![](https://cdn.paicoding.com/stutymore/qwen3-8-max-engineering-triangle-20260803152910-2803d61b.png)

按 Qwen 官方公布的结果，Qwen3.8-Max 给出的答案很有竞争力：能力进入第一梯队，跨 Harness 自测没有整体断崖式下跌，长任务案例足够惊艳，API 价格又明显低于几款海外旗舰。

后面我会用它专门跑一下我手头已经有的项目，给大家展示一下到底有多强。
