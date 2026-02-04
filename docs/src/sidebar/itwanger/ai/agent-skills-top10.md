---
title: Top 10热门Agent Skills，我试了个遍，发现真的能让生产力翻倍
shortTitle: 狂飙20万+安装的Agent Skills
description: 我花了两天时间测试了Top 10热门Agent Skills，发现这些AI编程插件真的能让生产力翻倍。从安装到实战，一文带你搞懂这个2026年最火的技术趋势。
tag:
  - Agent Skills
  - Claude Code
  - AI编程
category:
  - 技术文章
author: 二哥
date: 2026-01-25
---

大家好，我是二哥呀。

如果这几个月你有关注 AI 编程圈子，应该会明显感觉到一个变化：大家不再只讨论哪个模型更强，而是开始讨论「怎么让 AI 更好地干活」。

这背后其实有一个很朴素的需求，我们需要的不是一个会聊天的 AI，而是一个能真正理解项目、能写完整代码、能解决问题的工程助手。

这种转变下，**Agent Skills** 这个概念就开始频繁出现在视野里了。

简单来说，Skills 就是给 AI Agent 装上的「技能插件」，让它掌握特定领域能力。就好比你玩游戏给角色学技能一样，AI 也可以通过安装 Skills 变得更厉害。

![](https://cdn.paicoding.com/stutymore/agent-skills-top10-20260125171319.png)

前两天我刷到一个叫 skills.sh 的网站，上面列出了各种热门 Skills，总安装量已经突破 **20 万+**。

我花了两天时间，把这些 Top 10 热门 Skills 一个个试了一遍，今天就把我的实测体验和思考分享给大家。

## 01、Agent Skills 到底是什么

这个我们之前的文章分享过，这里再次强调下。

**Prompt 更像是一次性指令**。你在某个对话里写了一段很详细的提示词，AI 按照你的要求去执行。但这个提示词很难复用，下次换个项目、换个场景，你又得重新写一遍。

**Skills 则是可复用的能力模块**。它把某个领域的最佳实践、工作流程、技术规范都封装好，AI 可以直接调用。

就好比你是一个 Java 开发，你熟悉 Spring Boot、MyBatis、Redis 这些技术栈，这些就是你的「Skills」。当 AI 也掌握这些 Skills 时，它就能像你一样思考和编码。

举个例子，`vercel-react-best-practices` 这个 Skill 目前安装量 **43.3K**，排在整个榜单的第一名。

![](https://cdn.paicoding.com/stutymore/agent-skills-top10-20260125171446.png)

它里面封装了 React 开发的一系列最佳实践：组件怎么拆分、状态怎么管理、性能怎么优化。当 AI 装上这个 Skill 后，它写出的 React 代码就会自然遵循这些规范，而不是像普通 prompt 那样需要你一遍遍强调。

从技术实现上看，Skills 就是一个个 Git 仓库，里面有 SKILL.md 文件描述能力，还有一些配套的代码和配置。安装的时候，只需要一条命令：

```bash
npx skills add <owner/repo>
```

这个命令会把 Skill 的配置信息写入你的项目，AI 编程工具（比如 Claude Code、Cursor、Windsurf 等）就能识别并调用这些能力了。

## 02、Top 10 热门 Skills 横评

好了，我们来看实战。我把 Top 10 Skills 分了类，方便大家按需选择。

### 前端类

排在前三的 `vercel-react-best-practices`、`web-design-guidelines`、`frontend-design` 都是前端方向的。这三个我都试了，体验确实不错。

`vercel-react-best-practices` 我用它重构了一个 React 组件。之前的代码是直接用 AI 写的，能用但不够规范。

装上这个 Skill 后，AI 主动帮我做了几件事：把大组件拆成了小组件、把状态提升到合适的位置、加了必要的性能优化。整个过程我没怎么干预，AI 就按照 Vercel 的规范把代码改得更好了。

![](https://cdn.paicoding.com/stutymore/agent-skills-top10-20260125171708.png)

`web-design-guidelines` 这个 Skill 更有意思。它不是教你写代码，而是教你怎么做设计。

我问它「帮我设计一个开发者工具的落地页」，它不是直接给我代码，而是先问我的目标用户是什么、核心卖点有哪些、希望用户有什么样的情绪体验。这些问题问得还挺专业的，明显有产品思维在里面。

![](https://cdn.paicoding.com/stutymore/agent-skills-top10-20260125172100.png)

`frontend-design` 是 Anthropic 官方的 Skill，安装量 **11K**。

它和 `web-design-guidelines` 的区别在于，它更偏向「把设计变成代码」。我给了一个 Figma 设计稿，它直接生成了对应的前端代码，而且用的还是 Tailwind CSS，刚好符合我的技术栈。

### 框架最佳实践类

`remotion-best-practices` 是关于 Remotion 框架的，安装量 **26.4K**。

Remotion 是一个用 React 写视频的工具，挺小众但很酷。我之前用 Remotion 做过动画视频，当时踩了不少坑。这个 Skill 把 Remotion 的最佳实践都总结好了：怎么组织 timeline、怎么做性能优化、怎么导出不同格式的视频。

试了一下，我用它重新写了一个 Remotion 项目，代码结构清晰了很多，而且 AI 还主动提醒我几个容易踩的坑，比如视频渲染时的内存管理问题。

### 工具能力类

`skill-creator` 这个 Skill 安装量 **5.2K**，它的作用是「教你如何创建自己的 Skill」。这个思路挺好的，就像授人以渔。

我用它尝试写了一个「Spring Boot 最佳实践」的 Skill，它会一步步引导你：这个 Skill 的定位是什么、能解决什么问题、需要包含哪些知识模块。

不过我平常更喜欢使用Claude直接来写Skills。这俩其实是一个东西。

![](https://cdn.paicoding.com/stutymore/agent-skills-top10-20260125173350.png)

`agent-browser` 是给 AI 装上浏览器能力的，安装量 **4.3K**。之前 AI 只能处理代码和文本，装上这个后，它可以直接访问网页、抓取数据。我试了一下让它抓取某个网站的公开 API 文档，然后生成对应的调用代码，确实省了不少事。

### 专业领域类

`building-native-ui` 是 Expo 团队出的，专门针对原生 UI 开发，安装量 **3.3K**。

如果你用 React Native 做移动开发，这个 Skill 会很有用。它里面封装了很多原生组件的使用规范，比如导航怎么搭、状态栏怎么适配、动画怎么做。

`seo-audit` 和 `audit-website` 是关于网站优化的，安装量都是 **3K+**。

前者偏向 SEO，会分析你的网站在搜索引擎上的表现；后者偏向性能和安全，会检查加载速度、代码质量、安全漏洞。我拿自己的博客试了一下，确实发现了一些可以优化的地方。

### 数据库类

`supabase-postgres-best-practices` 是 Supabase 团队出的，安装量 **3.1K**。Supabase 是一个开源的 Firebase 替代方案，底层用的是 PostgreSQL。

这个 Skill 封装了 PostgreSQL 的最佳实践，比如表怎么设计、索引怎么优化、查询怎么写。我试了一下让它帮我优化一个慢查询，它给出的建议还挺专业的。

## 03、如何安装和使用

体验了一圈，我发现 Skills 的安装和使用其实挺简单的。

### 第一步，选择合适的 Skill

你可以去 skills.sh 这个网站上浏览，上面有所有 Skills 的介绍、安装量、最后更新时间。

安装量高的说明经过了很多人的验证，一般比较靠谱。最后更新时间也很重要，有些 Skill 可能已经半年没更新了，这种就要谨慎选择。

**第二步，使用命令安装**

假设你想装 `vercel-react-best-practices`，只需要在终端执行：

```bash
npx skills add vercel-labs/agent-skills
```

这个命令会做几件事：克隆对应的 Git 仓库、把 Skill 配置写入你的项目、如果有依赖的话会自动安装。

**第三步，在 AI 编程工具中调用**

装好之后，你就可以在 Claude Code、Cursor、Windsurf 这些工具里直接使用了。你不需要显式地「启动」某个 Skill，AI 会根据你的需求自动判断应该调用哪个能力。

比如我在 Claude Code 里说「帮我重构这个 React 组件」，它就会自动调用 `vercel-react-best-practices` 里的规范。你可以在输出日志里看到 AI 引用了哪些 Skills，这个过程是透明的。


## 04、我的使用建议

试了这么多 Skills，我有几个实用的建议想分享给大家。

**不要贪多，按需安装**

我看到有些开发者一口气装了十几个 Skills，其实没必要。Skills 装多了会有两个问题：一是 AI 在调用时要遍历更多能力，响应会变慢；二是不同 Skills 之间可能有冲突，反而影响效果。

我建议是「按需安装」，你当前项目需要什么能力就装什么。比如你最近在写 React，就装 `vercel-react-best-practices`；如果你要做 SEO 优化，再装 `seo-audit`。

**优先选择官方或知名团队的 Skills**

从榜单上看，排名靠前的 Skills 基本都是官方或者知名团队出的。比如 Anthropic 官方的 `frontend-design`、Expo 团队的 `building-native-ui`、Supabase 的 `supabase-postgres-best-practices`。这些 Skills 的质量有保证，而且更新也比较频繁。

对于个人开发的 Skills，我会看几个指标：安装量、最后更新时间、GitHub 上的 star 数、issues 的处理情况。如果这些数据都不错，说明这个 Skill 比较活跃且可靠。

**把 Skills 当成辅助，不要完全依赖**

这一点特别重要。Skills 确实能提升 AI 的能力，但它不是银弹。我在使用过程中就遇到过，AI 按照 Skill 的规范写代码，但没考虑到我项目的特殊情况，反而需要我去调整。

所以我的做法是，把 AI 生成的代码当成「参考」，我会仔细审查每一段代码，确认它是否符合项目需求、有没有潜在问题。Skills 能帮我节省时间，但不能替代我的判断。

**尝试创建自己的 Skill**

如果你在某个领域有丰富的经验，可以考虑把自己的最佳实践封装成 Skill。一方面可以帮助其他开发者，另一方面也能加深自己的理解。

`skill-creator` 这个 Skill 就是专门教你做这件事的。它会一步步引导你：Skill 的定位、解决的问题、包含的知识模块、如何测试和验证。

**关注 2026 年的新动态**

2026 年被称为「Skills 元年」，这个领域发展得非常快。谷歌的 Antigravity 已经支持 Agent Skills，越来越多的 AI 编程工具也在接入这个生态。

我建议大家可以多关注 skills.sh 这个网站，或者订阅相关的技术博客，及时了解最新动态。

## 06、ending

花了两天时间测试这些 Skills，我的整体感受是：Agent Skills 确实是 2026 年的一个技术趋势，它让 AI 从「通用助手」变成了「领域专家」。

以前我们用 AI 写代码，可能只是一次性对话。现在有了 Skills，AI 可以持续学习、积累经验，甚至在不同项目之间复用能力。这种转变对于提升工程效率是有实际价值的。

但我也要提醒一句，Skills 再强，也只是工具。真正决定项目质量的，还是开发者自己的判断和经验。AI 能帮你写代码，但不能替你做决策；AI 能帮你优化性能，但不能替你理解业务。

从职业发展的角度看，我建议大家可以把 Agent Skills 当成一个技能点去学习。一方面，它能提升你的开发效率；另一方面，懂得如何使用和创建 Skills，本身也是 2026 年开发者的一项核心竞争力。

还没有体验过的同学，可以选一个自己感兴趣的 Skill 试一试。相信我，你会打开新世界的大门。


参考资料：
- [The Agent Skills Directory - skills.sh](https://skills.sh)
- [2026年AI编程的分水岭:为什么懂Agent Skills的人已经赢了?](https://aicoding.csdn.net/6971c0167c1d88441d8eb8d9.html)
- [2026年Skills元年正式开启！谷歌Antigravity支持Agent Skills](https://juejin.cn/post/7595425302968647721)
- [awesome-agent-skills GitHub 仓库](https://github.com/skillmatic-ai/awesome-agent-skills)
- [Claude Code Skills 国内实践全指南](https://www.53ai.com/news/LargeLanguageModel/2026010976504.html)
- [Claude Code 又推出了Skills！！（保姆级安装和使用教程分享）](https://www.cnblogs.com/javastack/p/19176207)
