---
title: 不用Claude，阿里推出国产Cowork就很猛，我测了一天，直呼太香！
shortTitle: 阿里国产 cowork Skills 生态
description: 阿里推出的国产版 Cowork——QoderWork，不仅能整理文件、处理文档，最牛的是支持 Skills 生态！实测 SEO Audit Skill 优化技术派网站，从工具到生态的跨越。
tag:
  - 程序员
category:
  - AI
author: 二哥
date: 2026-01-30
---

大家好，我是二哥呀。

白天给大家分享了 QoderWork 的测评，讲了它怎么帮我 6 秒钟整理完 2444 份简历，怎么删除重复文件，怎么生成PPT，怎么把视频转成 GIF。

![](https://cdn.paicoding.com/stutymore/qoderwork-review-20260130062840.png)

有读者私信问我："二哥，这东西确实香，能用 Skills 吗？"

答案是肯定的。

这篇内容就来给大家详细唠唠，QoderWork 的 Skills 生态到底有多猛。

## 01、从工具到生态的跨越

先说结论，QoderWork 不只是一个能帮你整理文件、处理文档的 AI 助手，它还是一个**开放的 AI 智能体平台**。

什么意思呢？就是你可以像给 Claude Code 安装 Skills 一样，给 QoderWork 安装各种技能包，扩展它的能力边界。

怎么添加自定义的 Skills 呢？

点左下角头像，选择设置，再点技能，就能看到 Skills 管理界面了。

![](https://cdn.paicoding.com/stutymore/qoderwork-review2-20260130201947.png)

QoderWork 自带了一些内置 Skills，比如 find skill，可以帮你搜索和安装其他 Skills。你也可以从 skills.sh 这样的开源平台安装第三方 Skills。

![](https://cdn.paicoding.com/stutymore/agent-skills-top10-20260125171319.png)

这个设计的厉害之处在于，它把 AI 助手从"固定功能的产品"变成了"可扩展的生态平台"。

你有什么需求，就去装对应的 Skill，不用等官方更新。

## 02、什么是 Skills 生态系统

在深入实测之前，先给不熟悉 Skills 的同学科普一下。

Skills 是一套 AI 智能体技能，主打一个"可复用的程序化知识"。说白了，就是把某个领域的专业经验打包成 Skill，其他人可以一键安装使用，不用从头摸索。

除了 skills.sh 这样的第三方平台，GitHub上也有很多类似的开源 Skill 仓库。

>https://github.com/ComposioHQ/awesome-claude-skills

![](https://cdn.paicoding.com/stutymore/qoderwork-review2-20260130202348.png)

现在几乎人人都在谈Skills，就是因为他把复杂的提示词工程具象化了。之前对于大多数普通人来说，写不了高大上的提示词，因为这玩意涉及到大量领域知识和经验积累。

但有了 Skills，大家可以直接拿来用，省去了大量摸索和试错的时间。

目前 skills.sh 平台上已经有 8 万个智能体 Skills 可选，5 万人在用，覆盖开发者办公场景。

比如 SEO 优化、代码审查、数据分析、文档生成等等，基本上你工作中遇到的重复性劳动，都能找到对应的 Skill。

最关键的是，这些 Skills 大部分都是开源的，你甚至可以自己改一改，定制成符合自己需求的版本。

为了方便安装，我直接把整个仓库下载到了本地：`https://github.com/coreyhaines31/marketingskills`

![](https://cdn.paicoding.com/stutymore/qoderwork-review2-20260130203024.png)

## 03、用 SEO Audit Skill 优化技术派

光说不练假把式，我选了一个非常实用的 Skill——SEO Audit，来实测一下 QoderWork 的 Skills 集成能力。

背景是这样的，我有个技术派学习网站（paicoding.com），平时更新文章比较勤快，但 SEO 优化这块一直没太重视。

每次写完文章，也就是检查下标题、关键词，再看看有没有错别字，至于更专业的 SEO 指标，根本没考虑。

借这个机会，我们来给 QoderWork 安装上 SEO Audit Skill。需要提前打成压缩包。

![](https://cdn.paicoding.com/stutymore/qoderwork-review2-20260130203416.png)

然后在自定义Skills这里选择我们刚刚压缩的技能包，点【上传】就行了。

![](https://cdn.paicoding.com/stutymore/qoderwork-review2-20260130203329.png)

完事回到QoderWork的技能界面，就能看到刚刚安装的 SEO Audit Skill 了。

![](https://cdn.paicoding.com/stutymore/qoderwork-review2-20260130203525.png)

好，我们回到QoderWork的主界面，甩给它一句指令："@seo-audit 帮我检查 paicoding.com 的 SEO 情况，给出优化建议"。

![](https://cdn.paicoding.com/stutymore/qoderwork-review2-20260130203628.png)


你们猜猜怎么着？它真的像个 SEO 专家一样，从多个维度分析了我的网站。

先调用 browser 技能打开我的网站。

![](https://cdn.paicoding.com/stutymore/qoderwork-review2-20260130203740.png)

![](https://cdn.paicoding.com/stutymore/qoderwork-review2-20260130203859.png)

首先是技术层面，检查了页面加载速度、移动端适配、HTTPS 配置、robots.txt 和 sitemap 是否完整。

这些东西我以前都没怎么关注，结果它发现我的 robots.txt 是 404，难怪搜索引擎收录不全。

![](https://cdn.paicoding.com/stutymore/qoderwork-review2-20260130204037.png)

好，我们回到技术派源码的终端，让Qoder CLI来帮我们完成优化任务。

![](https://cdn.paicoding.com/stutymore/qoderwork-review2-20260130204251.png)

稍等片刻，就搞定了，帮我们追加了一个 `robots.txt` 的请求，然后会返回对应的规则。

![](https://cdn.paicoding.com/stutymore/qoderwork-review2-20260130204614.png)

本地测试一下，没问题。

![](https://cdn.paicoding.com/stutymore/qoderwork-review2-20260130204751.png)

后面服务更新我自测一下。还有关于这个首页缺少 meta description - 失去了在搜索结果中吸引用户的重要机会，我一开始不理解为什么，因为我查了一下，网站是有 description 标签的。

![](https://cdn.paicoding.com/stutymore/qoderwork-review2-20260130205732.png)

原来是我用错了，我滴乖乖。

听劝改进。

![](https://cdn.paicoding.com/stutymore/qoderwork-review2-20260130210553.png)

然后是内容层面，分析了标题标签、描述标签、关键词密度、H1-H6 标签结构、图片 alt 属性等等。

![](https://cdn.paicoding.com/stutymore/qoderwork-review2-20260130210634.png)


最后，它生成了一份清晰的优化清单，按照优先级排好了顺序。

![](https://cdn.paicoding.com/stutymore/qoderwork-review2-20260130210838.png)

讲真，这个 SEO Audit Skill 的专业程度，比我自己瞎琢磨强了一百倍。

以前觉得 SEO 是门玄学，现在发现有了 AI 助手，小白也能快速上手。

## 04、QoderWork 自带 Skills 体验

除了从 skills.sh 安装第三方 Skills，QoderWork 还自带了一些内置 Skills，我试了试 find skill，体验也很不错。

find skill 的作用是帮你快速搜索和定位文件。你想想，我们的电脑里有多少文件？成千上万肯定是有的。想找个东西，要么靠记忆，要么用系统自带的搜索，但效率都不高。

这次我直接甩给 QoderWork 一句指令："@find-skill 帮我找一下所有包含'简历'的 PDF 文件，修改时间在 2026 年 1 月之后"。

![](https://cdn.paicoding.com/stutymore/qoderwork-review2-20260130211102.png)

几秒钟后，它就给出了结果，列出了所有符合条件的 PDF 文件，包括文件路径、修改时间。比我手动搜索快了不知多少倍。

![](https://cdn.paicoding.com/stutymore/qoderwork-review2-20260130211046.png)

我试着又搜了几个其他条件，比如"所有超过 100MB 的视频文件"、"所有包含'面试'的 Word 文档"，它都能快速定位到。对于我们这种文件多到爆炸的人，这个 Skill 简直是救星。

从这两个实测案例能看出来，QoderWork 的 Skills 生态不是噱头，是真的能解决实际问题的。而且它用的是 @ 符号调用，和 Claude Code 的用法一致，学习成本很低。

## ending

折腾了一圈，QoderWork 给我的感觉是，这已经不是一个单纯的 AI 办公助手，而是一个**开放的 AI 智能体生态平台**。

从文件整理、文档处理这样的基础功能，到 Skills 扩展带来的无限可能，它展现出了比传统工具更强的想象空间。

尤其是有了 Skills 之后，你想干什么，就去装对应的 Skill，或者自己写一个。主动权完全在你手里。

而且 QoderWork 把 Claude Code 的 Skills 机制带到了国内，不仅不需要略施魔法，语言和场景也更贴合国内用户。对于我们这些想用 AI 提升效率，但又不想折腾的人来说，真的是个福音。

![](https://cdn.paicoding.com/stutymore/qoderwork-review2-20260130211231.png)

2026 年，AI 不再是一个遥远的概念，而是会涌现更多像 QoderWork 这样的产品，从工具进化成生态，真正走进我们的工作环境，帮我们解决问题。

保持期待，保持对未来的热情。我相信 AI 会给我们带来更多的惊喜，更多的便捷，更多的可能。

如果这篇内容对你有用，记得点赞，转发给需要的人。

我们下期见！

---

**Sources:**
- [Vercel 推出AI 智能体技能开源平台skills.sh](https://www.80aj.com/2026/01/21/vercel-ai-skills-platform/)
- [Skills商店来了：5万人在用的Top 10热门Skills，我帮你试了一遍](https://www.53ai.com/news/gerentixiao/2026012443529.html)
- [Top 10热门Agent Skills，我试了个遍，发现真的能让生产力翻倍](https://paicoding.com/article/detail/2602900050593796)
- [seo-optimizer - 分析并优化网站的页面结构与元数据](https://ai.codefather.cn/skills/2014279378832666625)
- [八万个智能体Skills 怎么选？skills.sh 排行榜帮你避开所有坑](https://www.51cto.com/aigc/10140.html)
