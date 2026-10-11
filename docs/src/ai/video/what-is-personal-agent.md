---
title: 最近爆火的 Personal Agent 到底是什么？
description: Grok Bot、Muse、Cue、dots，三分钟全了解。
---

8 月 11 日，xAI 发布了 Grok Bot。9 月 8 日，Meta 发布了 Muse。9 月 28 日，Manus 发布了 Cue。9 月 29 日，OpenAI 在 DevDay 上发布了 dots。

不到两个月，四家公司发布了同一类 AI 产品，也就是最近爆火的 Personal Agent，以理解和代表个人行动为中心、具备长期记忆与工具执行能力的数字助手。

![](https://cdn.paicoding.com/stutymore/what-is-personal-agent-01-20261011145152-b4939866.png)

根据 Sensor Tower 的统计，Muse 上线不到两周，下载量就超过了 250 万。xAI 在 9 月 3 日的企业版公告里说，Grok Bot 发布以来，已经有数千家机构在使用。

那聪明的你一定会问，这些 Personal Agent 和 OpenClaw 到底有什么区别？

我的答案是，Grok Bot、Muse、Cue、dots 都是“云端虚拟人”，服务商在云端为你开了一台虚拟电脑（也就是所谓的沙箱）。AI 在云端的电脑里帮你注册邮箱、登录网站、用服务商的钱包去付款，当然需要你先充值。你不需要开着自己的电脑，它们在云端 24 小时替你跑。

OpenClaw 是“本地代言人”，它必须运行在你自己的物理设备上（比如你的 Mac、PC 或私有服务器）。它操控的是你眼前这台真实的电脑、你登录好的本地浏览器，你的云虚拟主机。

我翻了 Meta、OpenAI、xAI、Manus 四家的官方发布和产品文档，可以自信地、大方地、光明磊落地帮你把这四个产品讲清楚。

**先说第一个，xAI 的 Grok Bot。**

![正在制作游戏的 Grok Bot](https://cdn.paicoding.com/stutymore/what-is-personal-agent-20261011145206.png)

官方给它的定义是“your team of always-on agents”，一支一直在线的 Agent 团队。每个 Bot 都有自己的名字、分工，以及随时间不断积累的上下文。

“一直在线”靠的是云电脑。每个 Bot 运行在一台持久化的云电脑上，有浏览器、文件系统和终端。你电脑关机了，它还在接着干活。记忆、文件、浏览器的登录状态都会跨会话保留下来。

![](https://cdn.paicoding.com/stutymore/what-is-personal-agent-02-20261011145301-ebc8cbf1.png)

最有意思的是 routine（例行任务）。你把一个流程手把手演示一遍，Grok Bot 会把它保存成一个 Skill，之后按你设定的时间自动执行。比如每周一早上整理上周的销售数据，你只需要教它一次。

权限上分三档，允许一次、始终允许和拒绝。高风险动作还会交给一个独立的 Auto Review 模型再审查一遍。如果你不在电脑前，Bot 发起的审批请求大约 10 分钟后就会自动过期。

一句话概括，Grok Bot 想做的不是一个工具，而是成为你团队里的一位同事。

**那聪明的你肯定想到了，Agent 能自己干活了，万一它被人骗了怎么办？**

这正是 Meta 的 Muse 最在意的事情。

![OpenMuse](https://cdn.paicoding.com/stutymore/openmuse-review-20261008151946.png)

Muse 的官方定义是“It doesn't just answer questions, it actually does the work”，意思是不只回答问题，而是真的把活干完。你关掉 App，它还在工作，有了新进展或者需要你审批的时候，再回来找你。它能打开浏览器填表单、替你发邮件、预订行程，发邮件和购物之前都会先问你。背后的模型是 Meta 超级智能实验室的 Muse Spark。

Muse 的安全架构是四家里最让人放心的。Muse 在一台叫 Secure VM 的虚拟机里干活，旁边还有一个独立的 Sentinel Agent 负责审核。官方原话的意思是，Sentinel 不批准的话，Muse 做的任何事情都不能公开到互联网。而且 Muse 本身永远看不到真实的访问令牌。

![](https://cdn.paicoding.com/stutymore/what-is-personal-agent-03-20261011145523-270f4aee.png)

为什么这么谨慎？Meta 在 9 月 8 日的安全博客里直接承认，Prompt Injection（提示词注入）仍然是整个行业没有解决的问题。提示词注入就是攻击者把恶意指令藏在网页或者邮件里，Agent 读到以后会执行一些搞破坏的动作。所以网页、邮件这些外部内容进入 Muse 的上下文时，一律被标记为不可信输入。Meta 还为这类漏洞开出了最高 13 万刀的赏金。

**那聪明的你肯定又要问了，Agent 要替你办事，它总得有个身份吧？**

Manus 团队的 Cue 解决的就是这个问题。

![](https://cdn.paicoding.com/stutymore/what-is-personal-agent-20261011150105.png)

Cue 是一个独立的 App，手机和电脑上都能用，底层和 Manus 用的是同一套基础设施。官方是这样介绍的，每个 Agent 都有自己的邮箱、电话号码、钱包和电脑。

![](https://cdn.paicoding.com/stutymore/what-is-personal-agent-04-20261011145631-cafb0073.png)

有了这四样东西，Agent 就能在真实的世界里自己行动。它能用自己的号码发消息，能在你设定的预算内付款，能替你接电话，挂断后在 Cue 里给你留一份通话摘要。你在餐厅扫一下二维码，它能替你点餐、排队。

多个 Agent 还可以拉进同一个群聊，分工协作，互相交接任务。方向由你来定，最后拍板的也是你。

**最后一个，OpenAI 的 dots。**

![OpenAI Dots 构建多个 AI 公司](https://cdn.paicoding.com/stutymore/what-is-personal-agent-20261011150319.png)

dots 搭载的是 GPT-6 Astra，你拥有的每一个 Agent 叫作一个 dot。官方的定义是“an always-on agent that keeps work moving across your tools and projects”，一个一直在线、推动你的工作在各个工具和项目之间往前走的 Agent。

它同样有自己的云电脑和浏览器。你可以在 ChatGPT、Teams 里找它，也可以直接给它打电话。OpenAI 官方说 dots 能连接 4000 多个应用。它的记忆有三个来源，当前对话、ChatGPT 的记忆，以及 dot 自己记的笔记。

dots 最值得说的是两个设计。

第一个是规则。你可以给它定好哪些事直接做、哪些事先问你、哪些事永远不做。它在后台主动做的调研是只读的，想进一步动手，必须先拿到对应的权限。

第二个是派活。dot 不一定亲自干，它可以把任务交给 Codex 或者 ChatGPT Work 去执行。

![](https://cdn.paicoding.com/stutymore/what-is-personal-agent-05-20261011145852-0c423604.png)

一句话概括，dots 是一个调度员，它自己负责盯着进度，具体的活派给 Codex。

这个知识点你学会了吗？想解锁更多 Agent 硬核知识，点赞关注，我是二哥，咱们下期见！

<!-- video-covers:start -->

## 视频封面

![竖版封面](https://cdn.paicoding.com/stutymore/what-is-personal-agent-cover-portrait-20261011150842-671cfab6.png)

![宽屏横版封面](https://cdn.paicoding.com/stutymore/what-is-personal-agent-cover-wide-20261011150842-c982618e.png)

![标准横版封面](https://cdn.paicoding.com/stutymore/what-is-personal-agent-cover-standard-20261011150843-f267fb1c.png)

<!-- video-covers:end -->
