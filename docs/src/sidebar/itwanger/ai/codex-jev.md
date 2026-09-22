---
title: 给Codex配上Jev，直接起飞。
shortTitle: Codex + Jev 实测
description: 在 Codex 中安装 Jev 判断模型实测，Agent 决策比 LLM 快 40-200 倍，便宜 40-400 倍，输出 Token 免费
keywords: Jev, TypeSafe AI, Codex, 判断模型, Agent决策
tag:
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-09-22
---

大家好，我是二哥呀。

昨天在王二讲 Agent 的视频里分享了 Jev，播放直接爆了。

看来大家对 Jev 的热情是真的高。

简单介绍下，Jev 是一种判断模型（Judgment Model），我们输入一个状态和几个选项，它告诉我们该选哪个，置信度多少。

就这么简单。

下图是我用Codex配合Jev填写一个千问的表单，真的很无敌，速度超级快，效果还超级好。

![](https://cdn.paicoding.com/stutymore/codex-jev-20260922130556.png)

今天带大家在 Codex 里安装好 Jev 的官方 Skill，然后实测一下 Agent 决策的效果。Claude Code 和 PI 也都支持。

复制下面这段提示词发给 Codex 就行。

```
安装 TypeSafe 技能。如果你在 Claude Code 中，请运行 claude plugin marketplace add typesafe-ai/skills，然后运行 claude plugin install typesafe@typesafe-ai。如果你在其他 Coding Agent 中，请运行 npx skills add typesafe-ai/skills --skill typesafe-ai 并选择你的 Coding Agent。请使用其中一种安装方式。你可以直接阅读该技能的说明文档：https://github.com/typesafe-ai/skills/blob/main/skills/typesafe-ai/SKILL.md。之后在开发此项目时即可使用 TypeSafe 技能。
```

![](https://cdn.paicoding.com/stutymore/jev-20260922100858.png)

安装完成后，从下一轮的对话开始，Codex 就会在涉及 AI 判断、分类、路由、抽取、排序或者验证时自动使用 TypeSafe Skill。

使用之前，需要先有 Jev 的 API Key。去 TypeSafe AI 官网注册就行。

> https://typesafe.ai/

我注册的时候大概花了两分钟，邮箱验证通过之后就能拿到 API Key 了。

![](https://cdn.paicoding.com/stutymore/jev-20260922101426.png)

然后在终端设置环境变量。

```bash
export TYPESAFE_API_KEY="你的 API Key"
```

记得想要持久化的话，把这行加到 `.zshrc` 或者 `.bashrc` 里，不然重启终端就失效了。

准备工作搞定，来看一个完整的Case。

```
使用 typesafe-ai Skill。

这次任务的下一步动作必须由 Jev决定。请实际调用 Jev API，不要只进行文字分析。

state：
{
"userRequest": "帮我分析今天英伟达股价为什么上涨",
"knownFacts": [],
"availableTools": [
"直接回答",
"联网搜索",
"检查本地代码",
"询问用户"
]
}

问题：
"为了可靠完成用户请求，下一步应该采取哪个动作？"

候选项：

- answer_directly：已有稳定信息，可以直接回答
- web_search：依赖最新外部信息，需要联网检索
- inspect_code：需要检查本地项目文件
- ask_user：缺少完成任务所必需的信息
- human_review：风险较高或没有合适选项

执行规则：

- 实际调用 Jev Choice。
- confidence ≥ 0.8 时，Codex执行 Jev选择的动作。
- confidence < 0.8 时，改为 human_review。
- 输出实际模型、Token 用量、完整概率和最终动作。
- 如果 Jev调用失败，停止并报告，不允许 Codex自行补充判断。
```

这段提示词做了三件事。

第一，把当前状态传给 Jev。请求是 “帮我分析今天英伟达股价为什么上涨”，已知事实为空，可用工具有四个。

第二，给出 5 个候选动作，每个都有明确的含义。直接回答、联网搜索、检查代码、问用户、转人工。Jev 会从这些选项中选出概率最高的那个。

第三，设置执行规则。置信度达到 0.8 才执行 Jev 的选择，低于 0.8 一律转人工审核。这个阈值可以根据场景调整，对准确性要求高的场景可以设到 0.9 甚至 0.95。

![](https://cdn.paicoding.com/stutymore/jev-20260922111351.png)

点开 Codex 的运行过程，能看到它实际发起了一个 HTTP 请求，调用的就是 Jev 的 Choice API。

![](https://cdn.paicoding.com/stutymore/jev-20260922111603.png)

然后 Jev 返回了这样一个结果。

```json
{
  "model": "jev-1.13.0",
  "usage": {
    "input_tokens": 495,
    "output_tokens": 63
  },
  "choice": "web_search",
  "confidence": 0.99,
  "probabilities": {
    "human_review": 0,
    "ask_user": 0.01,
    "inspect_code": 0,
    "web_search": 0.99,
    "answer_directly": 0
  },
  "finalAction": "web_search"
}
```

`model` 是 jev-1.13.0，Jev 当前的模型版本。`usage` 显示这次调用输入消耗了 495 个 Token，输出 63 个 Token。输出 Token 是免费的。

再看 `probabilities`。web_search 的概率是 0.99，ask_user 是 0.01，其余三个全是 0。Jev 认为这个问题必须联网搜索。

因为 confidence 0.99 远超 0.8 的阈值，Codex 直接执行了联网搜索。

![](https://cdn.paicoding.com/stutymore/jev-20260922111905.png)

Codex 直接把判断权交给 Jev。Jev 用极低的成本和极快的速度给出选择，Codex 拿到结果后直接去执行。判断和执行，各司其职。

![](https://cdn.paicoding.com/stutymore/codex-jev-20260922134117.png)

有小伙伴可能会问，这个意图识别，我用 GPT-6 Astra 也能做啊，为什么要多引入一个 Jev？

能做，确实能做。但 Token 消耗完全不是一个级别。

![](https://cdn.paicoding.com/stutymore/what-is-jev-20260921162611.png)

从 TypeSafe AI 官方给出的性能数据来看，Jev 比同类 LLM 快 40 到 200 倍，便宜 40 到 400 倍。输入价格 0.042 刀每百万 Token，输出免费，延迟在 70 到 500 毫秒之间。

也就是说，Jev 把判断能力从大模型里单独拆了出来，做成一个轻量的专用模型。它不需要理解整个世界，只需要理解你给它的 state 和候选项之间的关系。

Jev 支持三种决策类型，覆盖了 Agent 开发中绝大多数的判断场景。

![](https://cdn.paicoding.com/stutymore/what-is-jev-primitives-20260921164437-69df99e6.png)

①、**Noul**，给一个是或否的概率。

举个例子，用户在平台上发了一条评论，你需要判断这条评论有没有恶意。把评论内容传给 Jev，它返回一个 0 到 1 之间的数字。0.95 以上基本可以确认有恶意，0.05 以下基本可以排除。中间地带的可以转人工审核。适合做内容审核、安全过滤、垃圾信息检测这类二元判断。

再比如一个 Agent 准备执行某个工具调用，你想让它先过一道安全检查，判断这次调用有没有风险。Noul 返回一个概率，高于阈值就拦截，低于阈值就放行。

②、**Choice**，从预定义的选项里选一个。

给 Jev 几个候选动作，它告诉你选哪个，每个选项的概率分别是多少。适合做意图路由、工具选择、任务分发。

比如一个客服 Agent 收到用户消息，需要判断应该转到技术支持、账单查询还是投诉处理，用 Choice 一步到位。又比如一个编程 Agent 收到用户指令，需要判断该用哪个工具来完成任务，是读文件、跑命令还是搜索代码。

③、**Score**，打一个 0 到 1 之间的分数。

比如 RAG 系统召回了 20 个文档片段，需要判断哪些和用户的问题真正相关。Jev 给每个片段打一个分，0.9 表示高度相关，0.3 表示勉强沾边。按分数排序取前几个，喂给大模型生成回答。比用大模型做 rerank 快得多也便宜得多。

Score 还有一个用法是做质量评估。Agent 生成了一段回答，你不确定质量怎么样，用 Score 打个分。分数低的让 Agent 重新生成，分数高的直接返回给用户。

三种类型也可以组合使用。

比如一个完整的 Agent 流程，先用 Choice 判断该调用哪个工具，再用 Noul 检查这次调用是否安全，工具返回结果之后用 Score 打分，分数低于阈值就让 Agent 重新生成。

Jev 这个名字取自 19 世纪的经济学家 William Stanley Jevons，边际效用理论的提出者。TypeSafe AI 用这个名字，意思大概是每一次判断都应该追求最高的边际效用，用最小的成本得到最准确的结果。

![](https://cdn.paicoding.com/stutymore/codex-jev-20260922124347.png)

有网友已经整理好了 Jev 的完整使用案例，涵盖了意图识别、内容分类、安全审核、优先级排序等多个场景。

![](https://cdn.paicoding.com/stutymore/jev-b5d2f210e66e6d682b8d0f54712f8f8e.png)

> GitHub 地址：https://github.com/Hiwoniu/Jev-Case

甚至全自动化的很多方案，尤其是做选择题这种，感觉 Jev 可以轻松拿捏。

说说我的真实感受。

Jev 最大的价值在于它把 Agent 的 “判断” 和 “执行” 拆开了。以前 Codex 既要判断该做什么又要去执行，现在把“该做什么” 这件事可以交给一个更快更便宜的专用模型来做。

![](https://cdn.paicoding.com/stutymore/codex-jev-20260922134102.png)

如果用认知科学的话来说，Jev 就是 System 1，大模型就是 System 2。System 1 是直觉，是第六感，看一眼就知道答案，不需要深入思考。System 2 是理性分析，要推理、要权衡、要组织语言。人类大脑在日常生活中大部分决策都是靠直觉完成的，只有碰到复杂问题才会启动深度思考。Agent 也应该这样，简单的判断交给 Jev 秒出结果，需要推理和生成内容的复杂任务再让大模型慢慢想。

这才是合理的分工。

我估计，后面的大模型也都会快速跟进上这一块。

因为判断模型本质上并不难做。

像比较出名的开源复刻 kev，就是基于 Qwen3.5 + LoRA 搞出来的，由知名开发者 Jared Palmer 用 Devin 编写。完美对齐 TypeSafe 的官方 System One API 接口，可直接搭配官方 Python SDK 本地运行。

![](https://files.mdnice.com/user/3903/3f390fd2-5328-474c-b0b5-600161f9ba71.png)

比如说 Luna 6 就很适合做这种。

现在的 GPT-6 Astra 太费 Token 了，5.6 Sol 的时候我一周到 20x pro 根本用不完，现在最多坚持3天，太离谱了。

Jev 在很多程度上能够减少 Codex 的额度消耗。

我们下期见。
