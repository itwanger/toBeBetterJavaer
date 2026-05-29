---
title: 当了leader才发现，大厂最吃香的，不是代码写得快的，也不是会拍马屁的，而是把AI办公用到极致的。
shortTitle: 办公小浣熊桌面版2.0实测
description: 实测办公小浣熊桌面版 2.0 六大能力，本地文件智能归类、浏览器自动化选题调研、Quick Bar 全局唤起、飞书数据一键同步、定时任务自动跑，附 OPC 能力挑战赛 300 万奖池活动详情。
keywords:
  - 办公小浣熊
  - 小浣熊桌面版
  - AI办公工具
  - OPC能力挑战赛
  - 飞书AI集成
tag:
  - AI办公
category:
  - AI
author: 沉默王二
date: 2026-05-27
---

大家好，我是二哥呀。

假如你用 AI 办公的方式还停留在“复制内容→粘贴给 AI→等回答→再复制回来”的四步循环里。

那我强烈推荐你体验一下办公小浣熊桌面 2.0 版。

![](https://files.mdnice.com/user/3903/b1395be1-5aa7-4b96-8bea-d0a6c1c2236c.png)

他让 AI 不再只是一个等着提问的对话框，而是一个能直接在电脑里帮你干活的执行助手。

- **本地文件直读**：支持 Excel、CSV、PDF、Word、PPT 等 20+ 格式，授权目录后直接在本地干活
- **浏览器自动化**：内置 Playwright MCP，一句话让 AI 自己开网页、抓信息
- **Quick Bar 全局唤起**：⌘K / Ctrl+K 随时随地唤醒小浣熊
- **打通飞书**：一键导入/导出飞书文档
- **本地记忆**：跨会话记住你的使用偏好和习惯
- **定时任务**：设好时间让 AI 自动执行重复性工作

办公效率拉到满中满。

摸鱼时间多到数不清，嘿嘿。

## 01、Case 1：文件智能归类

2026 的上半年，我写了至少 140 篇和 AI 有关的原创内容。

涵盖 Claude Code、Codex、IDE 插件、Skills、RAG、LLM、AI Agent 面试题等，但一直没有系统地整理过。

![](https://cdn.paicoding.com/stutymore/bangongxiaohuanxiong-desktop-2-review-20260527225607.png)

我把文章目录授权给小浣熊，丢了一句话进去：

> 读取这个目录下的所有 Markdown 文章，按以下分类维度进行归类：Claude Code、Codex、IDE 插件、Skills、RAG、LLM 大模型、面试篇。同时统计每篇文章的字数、发布日期、涉及的核心技术栈。最后生成一份内容矩阵表格，标注每个分类下已有多少篇、哪些分类内容较少还有挖掘空间。

![](https://cdn.paicoding.com/stutymore/bangongxiaohuanxiong-desktop-2-review-20260527225836.png)

小浣熊会先扫描整个目录，识别出所有 `.md` 文件，然后逐篇读取 frontmatter 里的标题、标签、日期，再结合正文内容做分类判断。

为了提升效率，小浣熊还会多并发开启多个子任务处理。

![](https://cdn.paicoding.com/stutymore/bangongxiaohuanxiong-desktop-2-review-20260527230309.png)

大概 10 分钟，一份内容矩阵表格就出来了。

![](https://cdn.paicoding.com/stutymore/bangongxiaohuanxiong-desktop-2-review-20260528154843.png)

![](https://cdn.paicoding.com/stutymore/bangongxiaohuanxiong-desktop-2-review-20260527233510.png)

好家伙，经过小浣熊这一通分析，我发现自己真没少写啊。其中 LLM 相关的最多，接下来是 Claude Code 和 IDE 插件，一目了然，后面就能有针对性地去挖掘 Codex、RAG、AI Agent 这些内容较少的方向了。

![](https://cdn.paicoding.com/stutymore/bangongxiaohuanxiong-desktop-2-review-20260527233559.png)

这个场景的核心价值在于**不用再把内容上传到云端**。

要是走传统的“上传→处理→下载”流程，光等上传就让人受不了。况且很多平台上传文件的数量和大小还有限制，无法做到如此大量的文件处理。

现在授权完目录后，小浣熊直接在里面干活，体验完全不一样。

## 02、Case 2：浏览器自动调研

第二个场景更有意思，让小浣熊帮我去网上找选题。

作为一个技术博主，我经常需要看看 Claude Code 和 Codex 最近有没有新功能、社区里有没有新玩法、哪些方向还没有人写过保姆级教程。

这事以前得自己一个个去翻官方文档、GitHub Issues、X 上的讨论，半天时间就没了。

我对小浣熊说：

> 帮我调研 Claude Code 和 Codex 这两个 AI Coding 工具，分别去它们的官方文档站和 GitHub 仓库看看，找出还有哪些功能点值得写保姆级教程。我之前已经写过 CLAUDE.md 配置指南、Grep 搜索技巧这些选题，帮我排除已有的，重点找还没人写过或者写得少的方向，比如 hooks、MCP 配置、上下文压缩、多 Agent 协作、权限管理等。整理成一份选题清单，每个选题标注：功能名称、一句话描述、预估读者需求、参考链接。

![](https://cdn.paicoding.com/stutymore/bangongxiaohuanxiong-desktop-2-review-20260527231550.png)

小浣熊接到任务后，内置的 Playwright 浏览器自动启动了。

![](https://cdn.paicoding.com/stutymore/bangongxiaohuanxiong-desktop-2-review-20260527232003.png)

PS：记得在设置【插件】里启用 Playwright MCP 工具，才能使用这个功能。

![](https://cdn.paicoding.com/stutymore/bangongxiaohuanxiong-desktop-2-review-20260527232134.png)

我能看到它在一步步执行：

打开 Claude Code 的官方文档，翻阅了 Features、Configuration、Advanced 几个板块；然后切到 GitHub 仓库，看了一下 README 和 Discussions；接着又去 Codex 的文档做了同样的操作。

整个过程大概三四分钟，最后给了我一份选题清单。

![](https://cdn.paicoding.com/stutymore/bangongxiaohuanxiong-desktop-2-review-20260527234602.png)

![](https://cdn.paicoding.com/stutymore/bangongxiaohuanxiong-desktop-2-review-20260528002910.png)

标题都替我起好了，你别说，都是蛮值得去写的选题。

## 03、Case 3：Quick Bar随叫随到

第三个场景测的是 Quick Bar 全局唤起，在任何应用里按 ⌘K 就能唤醒小浣熊。

比如说我在 Chrome 里打开了一篇关于 Claude Code 上下文压缩机制的英文博客。

选中了一段关于 compaction 触发策略的描述，⌘K 唤起小浣熊：

> 翻译这段内容，并提炼 3 个核心要点

![](https://cdn.paicoding.com/stutymore/bangongxiaohuanxiong-desktop-2-review-20260527232841.png)

小浣熊直接在浮窗里给出了翻译和要点提炼，不用切窗口、不用复制粘贴。

![](https://cdn.paicoding.com/stutymore/bangongxiaohuanxiong-desktop-2-review-20260527233306.png)

翻译质量过关，技术术语处理得也准确。

方便！

## 04、Case 4：飞书数据分析

我在飞书里积累了不少数据：帮读者修改简历的记录、读者拿到 offer 后的喜报信息。

![](https://cdn.paicoding.com/stutymore/bangongxiaohuanxiong-desktop-2-review-20260527234334.png)

现在小浣熊桌面版 2.0 直接打通了飞书，一键授权就能拿到飞书里 20 多个 Skill 的能力。我对小浣熊说：

> 帮我从飞书文档里找到简历修改记录和读者喜报的数据，分析一下：简历修改最集中的问题有哪些、读者喜报中拿到 offer 最多的公司和岗位方向是什么、薪资区间分布情况。分析完之后生成一份数据洞察报告，直接导出到飞书文档里。

![](https://cdn.paicoding.com/stutymore/bangongxiaohuanxiong-desktop-2-review-20260527235402.png)

这个任务量可不小，因为我已经沉淀了 800 多条数据，所以小浣熊会分多个子任务去拉取数据。

![](https://cdn.paicoding.com/stutymore/bangongxiaohuanxiong-desktop-2-review-20260528000912.png)

分析结果出来后，给大家先看看读者提到的公司和岗位。

![](https://cdn.paicoding.com/stutymore/bangongxiaohuanxiong-desktop-2-review-20260528001715.png)

其中阿里、字节、腾讯是最多的，岗位最多的是 AI/大模型方向，然后再是 Java 后端。

然后关键的一步来了：小浣熊直接把报告导入到了飞书文档。

![](https://cdn.paicoding.com/stutymore/bangongxiaohuanxiong-desktop-2-review-20260528002051.png)

这才是“打通”的意义。

以前用 AI 分析完数据，结果停留在对话框里，还得手动复制粘贴到飞书才算完事。现在从数据获取到分析到最终落地飞书文档，整个流程都在小浣熊里一步走完了。

小浣熊还提供了一个第三方数据接口，可以直连飞书文档，不用装飞书客户端，直接在小浣熊里管理飞书文档。

![](https://cdn.paicoding.com/stutymore/bangongxiaohuanxiong-desktop-2-review-20260527234448.png)

## 05、Case 5：每天自动送 AI 日报

第五个场景测定时任务，让小浣熊每天自动给我送一份 AI 行业早报。

做内容的人都知道，追热点是日常刚需。

每天早上起来先刷 36kr、量子位、X 平台，看看 AI 圈昨天发生了什么，哪些值得跟进写文章。这事不难，但每天都得花 20 到 30 分钟，纯粹是重复劳动。

我给小浣熊设了一个定时任务：

> 每天早上 9 点执行：去 36kr AI 频道、量子位、X 平台搜索 “AI Coding” 和 “AI Agent” 相关内容，抓取昨天的热点新闻和讨论，整理成一份 AI 日报，包含标题、一句话摘要、原文链接、热度评估。

![](https://cdn.paicoding.com/stutymore/bangongxiaohuanxiong-desktop-2-review-20260528000529.png)

设置过程很直观，选好执行频率和时间就行。小浣熊会在后台自动运行，到点就去抓取信息、整理报告。

为了验证，我们这里先手动执行一次。

![](https://cdn.paicoding.com/stutymore/bangongxiaohuanxiong-desktop-2-review-20260528000626.png)

日报里有十几条热点，每条都有标题、摘要和原文链接。

以及热点背后的原因，比如说AI编程这个，分析得就挺到位。

AI 编程竞争已经不只是“哪个模型刷题更强”。真正决定开发者使用感的，是编辑器、代码上下文、终端、Diff、代码审查、团队权限这些工作流。

![](https://cdn.paicoding.com/stutymore/bangongxiaohuanxiong-desktop-2-review-20260528002244.png)

这个功能用了几天之后最明显的感受是：早上不用刷手机了。

以前得在各个平台之间来回切，现在打开小浣熊一页全看完。省下来的时间可以直接进入写作状态，这对做内容的我来说，太实用了。

定时任务这里还有其他模板可选，比如说学习英语单词、准备面试、工作周报等等。

![](https://cdn.paicoding.com/stutymore/bangongxiaohuanxiong-desktop-2-review-20260528001411.png)

## 06、300 万奖池的任务挑战

5 月 23 日，商汤小浣熊真实任务挑战季正式开启，总奖池超过 300 万元。

这个活动分两部分。

![](https://cdn.paicoding.com/stutymore/bangongxiaohuanxiong-desktop-2-review-668ee085455f1c6b46e6e3fc91bfba81.jpg)

**第一部分：OPC 能力挑战赛**，由商汤小浣熊和 Datawhale 联合发起，奖池 55 万。

OPC 这个概念最近非常火，意思是一个人加上 AI 就能干以前一个团队才能干的事。

赛道一是 OPC 新手出道赛，用办公小浣熊完成一次真实任务，发到小红书、知乎或公众号就能参与。整个赛季 4 轮，每周抽奖，早参与轮次多。还能得到知乎、小红书平台的官方流量扶持。

赛道二是 OPC 高手创造赛，围绕真实行业场景完成完整作品，最高个人单项奖金 10 万。

![](https://cdn.paicoding.com/stutymore/bangongxiaohuanxiong-desktop-2-review-20260527235952.png)

同步推出的还有全国首个 OPC 能力认证体系，从 OPC Learner 到 OPC Builder 再到 OPC Founder，用真实任务和作品来验证 AI 实战能力。

**第二部分：21 天真实任务打卡挑战**，5 月 27 日开启，奖池超过 200 万。每天完成一次真实任务打卡，连续打卡拿坚果奖励，坚果兑换周边和会员。还有 Mac mini、iPad Air、AirPods Max 这些硬货。

![](https://cdn.paicoding.com/stutymore/bangongxiaohuanxiong-desktop-2-review-20260528000032.png)

可以点击「**阅读原文**」了解活动详情。

>活动地址：https://community.xiaohuanxiong.com/2026-spring

不得不说，小浣熊这次是真金白银地鼓励大家拿真实任务来试。

正好能把自己的工作流跑一遍，顺便还能拿奖，何乐不为。

我们下期见。
