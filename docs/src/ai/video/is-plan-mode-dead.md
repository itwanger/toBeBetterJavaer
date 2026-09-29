---
title: Plan 模式已经死了吗？
description: Claude Code 团队的 Boris Cherny 说：“plan mode was useful, and is no longer useful.” 翻译翻译就是 Plan 模式以前有用，现在没用了。
---

2026 年 9 月 24 日，Ayman Nadeem 发了一篇文章，标题相当暴论，《Plan mode is dead》。作者正在做一款 AI 编程产品 Nuanced，之前是 GitHub 的高级工程师。

文章第二天被转发到 Hacker News，截至到发稿前，共有 508 条评论。

![](https://cdn.paicoding.com/stutymore/is-plan-mode-dead-20260929080132.png)

真正让讨论炸锅的，是评论区里的一条回复。Claude Code 团队的 Boris Cherny 留言说：“plan mode was useful, and is no longer useful.” 翻译翻译就是 Plan 模式以前有用，现在没用了。

要知道，就在今年 1 月 31 日，他还建议大家，每个复杂任务都从 Plan 模式开始，把精力花在计划上，让 Claude 一次就把代码写对。

![](https://cdn.paicoding.com/stutymore/is-plan-mode-dead-20260928221818-344c2f68.png)

八个月，态度可以说大反转。这也是 AI 时代的最大问题，明明不到一年时间，一切都变了，并且变得让你摸不着头脑，为什么 Claude Code 的开发者，Plan 模式的倡导者，说 Plan 模式没用了？

我翻了 Nadeem 的原文、Claude Code 和 Codex 的官方文档，可以自信地、大方地、光明磊落地帮你搞清楚这三件事。

- Claude Code 的 Plan 模式，底层到底做了什么？
- 为什么说它死了？
- 以后还要不要先规划再动手？

哈喽大家好，我是二哥呀。今天用 3 分钟，帮你把 Plan 模式讲清楚。

**先说第一件事，Plan 模式底层到底做了什么。**

在 Claude Code 里按 Shift+Tab 或者输入 /plan，就进入了 Plan 模式。官方文档的说法是，Plan 只做研究、提出方案，等你批准之后才修改代码。

![](https://cdn.paicoding.com/stutymore/is-plan-mode-dead-20260929080510.png)

那聪明的你肯定要问，Claude Code 本身注册了很多工具，为什么 Plan 模式能只做计划不动手呢？

答案很简单，Plan 做的事情，只是在每条用户消息后面追加了一句提醒，“you’re in plan mode, please don’t code yet”。换句话说，Plan 模式做的是，让 Agent 别着急写代码，别动工具集，否则容易让 Prompt Cache 失效。之前讲 Prefix Caching 就讲过，工具定义要放在请求的最前面，并且要尽量保持不动，否则后面的缓存会全部作废。

![](https://cdn.paicoding.com/stutymore/is-plan-mode-dead-20260929081029.png)

Codex 的思路类似。它的 Plan 模式是一套协作模板，要求模型不能执行任何修改，有疑问就调用 request_user_input 来问你，最后交出一份 decision complete 计划。

Pi Agent 做的更激进，根本就没有内置 Plan 模式，只能扩展。当你打开 Plan 模式，Pi Agent 会通过 setActiveTools 把 edit 和 write 这两个工具直接拿掉，bash 也只放行只读命令。

![](https://cdn.paicoding.com/stutymore/is-plan-mode-dead-20260928221936-b518120b.png)

**那聪明的你肯定想到了：Plan 为什么会被判死刑？**

Nadeem 在文章里说，Plan 模式原本有两项职责。第一，给 Agent 足够精确的指令；第二，帮用户理解自己要做的到底是什么。

第一项正在快速废弃。因为模型越来越聪明，能读懂大型的代码库了，模型能自己做出可靠的决定越多，需要用户提前写进计划里的就越少。Cherny 的说法更直接，用上 Opus 5.5 之后，他觉得模型基本能猜对意图。因为 Opus 5.5 对多轮交互的意图理解有了大幅提升，早期模型“一听到任务就急着写代码”的毛病已经被治好。

Nuanced 透露说，他曾经习惯把计划做成一份独立的 Spec 文档，还专门加一个能让自己浏览 Spec 的功能，结果发现 Spec “信息更多了，却没有更清楚”。所以他的结论是，“我们把规划这个动作，和计划这份文档混为一谈了”，我们需要的是 Planning，但不需要 Plan Mode 了。

以前是计划、审批、执行三步走；现在像 Codex 这样的 Agent，是理解、动手、检查、澄清、调整，再动手，规划和执行交织在同一个 loop 里，两者的边界正在消失。

![](https://cdn.paicoding.com/stutymore/is-plan-mode-dead-20260928222050-3233e9d7.png)

换句话说，模型越来越聪明，根本不需要我们主动让他开启 Plan 模式，审批后再让他开始，Agent 会在需要的时候自己做好计划然后再动手，并且计划完全不需要我们人去审批。

**那聪明的你肯定又要问了：那我以后还要不要先规划再动手？**

看情况。当需求本身不清楚的时候，模型仍然会搞错，一旦搞错，在复杂系统里不仅会浪费大量上下文与 Token，重构的成本也很高；Plan 模式真正的价值，是逼用户停下来看一眼。Cherny 就坦诚，Plan 模式不会被删掉，/plan 会一直存在，只是 Shift+Tab 这个快捷键可能会分给别的功能。

Claude Code 官方的最佳实践里也给了一条很实用的建议。方向不确定、要改多个文件、对代码不熟悉，这三种情况先规划；如果一句话就能说清楚要改什么，就跳过计划。

Pi 的作者 Mario Zechner 认为把计划落盘，能让 Agent 跨会话共享，还能和代码一起做版本管理。

所以对我们开发者来说。一句话说得清，直接让 Agent 动手；方向拿不准，先用 /plan 看一眼方案；要跨会话，或者要分给多个 Agent 去做，就让 Claude 用 AskUserQuestion 把需求问清楚，写成 SPEC.md，再开一个新会话去执行，这也是 Claude Code 官方推荐的做法。

![](https://cdn.paicoding.com/stutymore/is-plan-mode-dead-20260928222201-ed2849f0.png)

我个人也觉得“Plan 模式暂时还死不了”，因为模型还不足够强，等模型足够强了，确实就不需要 Plan 模式了。从我自己的使用情况来看，Plan 模式用的越来越少，真正的架构演进往往是一边讨论、一边调整，而非单次的“生成计划—执行计划”。

这个知识点你学会了吗？想解锁更多 Agent 硬核知识，点赞关注，我是二哥，咱们下期见！

<!-- video-covers:start -->
## 视频封面

![Plan 模式 16:9 封面](https://cdn.paicoding.com/stutymore/is-plan-mode-dead-cover-horizontal-16x9-20260928222006-1b2226bb.png)

![Plan 模式 4:3 封面](https://cdn.paicoding.com/stutymore/is-plan-mode-dead-cover-horizontal-4x3-20260928222006-e4bac0d9.png)

![Plan 模式 3:4 封面](https://cdn.paicoding.com/stutymore/is-plan-mode-dead-cover-vertical-3x4-20260928222006-52556bf1.png)
<!-- video-covers:end -->
