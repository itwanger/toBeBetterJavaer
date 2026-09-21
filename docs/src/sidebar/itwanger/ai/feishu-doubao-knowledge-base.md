---
title: 我用飞书+豆包工作，找到了最邪修的用法。
shortTitle: 飞书+豆包工作知识库
description: 用飞书+豆包工作把 300 多篇文章变成可查询的 AI 知识库，从上传到跨库检索到邪修用法的完整实测记录
keywords: 飞书知识库, 豆包工作, AI知识库, 个人知识管理, 豆包工作评测
tag:
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-09-20
---

大家好，我是二哥呀。

前几天和一位高校的院长交流，把账号推送给她的时候，她惊讶地说自己竟然有18位好友关注，并且注意到我已经发表了近2000篇原创内容。

【这得坚持多久啊，你这也太厉害了。】她感慨说。

我嘴上说没什么，但心里已经乐开了花。

今天早上看到朋友cxuan用AI搭了一个知识库，把自己写过的文章全部上传，然后让AI梳理知识脉络，看起来很有搞头。于是我就想把自己写过的内容，也用豆包工作+飞书搭了一个本地的知识库。

先给大家看一眼效果（会自动生成示意图），这种精确的知识检索可太方便了（后面会带大家从0带大家实操起来）。

![](https://cdn.paicoding.com/stutymore/feishu-doubao-knowledge-base-20260921152559.png)

或者可以直接用可视化技能帮你直接绘图讲清楚一个知识点。

![](https://cdn.paicoding.com/stutymore/feishu-doubao-knowledge-base-20260921154523.png)

是不是很爽？

第一步，打开豆包工作，找到飞书插件，点击启用。

![](https://cdn.paicoding.com/stutymore/feishu-doubao-knowledge-base-20260921092125.png)

第一次使用的话，需要先绑定飞书账号。如果你登录豆包工作的时候，直接用的飞书账号，这一步可以直接跳过。

推荐飞书账号登录，这样豆包工作能直接把你飞书上的内容全部加载进来。

![](https://cdn.paicoding.com/stutymore/feishu-doubao-knowledge-base-20260921140630.png)

第二步，斜杠找到知识库这个技能，然后输入提示词。

>我本地已经写了非常多的AI原创内容，放在docs/src/sidebar/itwanger/ai这个目录下，你直接帮我把这些内容整理到飞书云文档，作为我本地的一个知识库。

![](https://cdn.paicoding.com/stutymore/feishu-doubao-knowledge-base-20260921091831.png)

能看到豆包工作会先梳理好分类，然后再把200多篇的内容同步上去，这一部分很关键，否则一股脑上传上去的知识库是杂乱无章的。

![](https://cdn.paicoding.com/stutymore/feishu-doubao-knowledge-base-20260921092718.png)

趁豆包工作干活的期间，多给大家聊两句。

由于豆包工作原生接入了飞书的文档、群聊、会议纪要、知识库，所以我们可以通过豆包工作在你的权限范围内直接调用这些数据。飞书提供底层的环境，身份、协作、存储都在飞书上。

![](https://cdn.paicoding.com/stutymore/feishu-doubao-knowledge-base-architecture-20260921153740-b418dead.png)

知识库上传完成了，一个11个一级分类，17个二级分类，包括面试篇、Claude Code、Codex、大模型测评等等。

![](https://cdn.paicoding.com/stutymore/feishu-doubao-knowledge-base-20260921114822.png)

当然了，如果你是飞书账号登录的话，点击【云盘】，也可以手动把整个本地文件夹上传到云盘，通过云盘来管理整个知识库也是完全OK的。

![](https://cdn.paicoding.com/stutymore/feishu-doubao-knowledge-base-20260921140454.png)

好，我们先问他一个简单任务。

> 列出我已有的知识库都有哪些

![](https://cdn.paicoding.com/stutymore/feishu-doubao-knowledge-base-20260921115657.png)

我们让豆包工作分析一下我写过的文章都包含了哪些内容。

> 看一下沉默王二的知识库里面都包括哪些类型的文章

![](https://cdn.paicoding.com/stutymore/feishu-doubao-knowledge-base-20260921115932.png)

![](https://cdn.paicoding.com/stutymore/feishu-doubao-knowledge-base-20260921120209.png)

面试篇最多，其次是大模型测评，然后是 Agent 核心技术拆解、工具对比、技术原理讲解。

还可以这么用。比如我不知道今年都写了哪些方向的内容，我想让豆包工作梳理一张内容发展脉络图出来。

> 请你根据我知识库中的内容，来梳理一份今年以来的写作主题脉络图

![](https://cdn.paicoding.com/stutymore/feishu-doubao-knowledge-base-20260921120604.png)

豆包工作整理出来的脉络还挺清晰的，以月份为线索，把每个阶段的写作重心都标出来了。1-2月主要是主要AI infra 和 Skills，以及 PicoClaw/ZeroClaw/ArkClaw/AstronClaw 等一波 Claw 衍生平台。

3月份主要是OpenClaw生态挖掘；4-6月主要是Claude Code的源码拆解；7-8月主要是个加公司的面试题篇；9月主要是各种新模型和新工具。

OK，现在豆包工作已经足够了解我了。现在我想学习一本书，我想基于我目前的知识水平，来让豆包工作评估这本书接下来我需要学习的重点是什么。这是我觉得知识库最有价值的场景之一。

我先让豆包工作查一下我的云盘里面有没有这本书。

> 能看到《深入理解 AI Agent：设计原理与工程实践》这本书吗？

![](https://cdn.paicoding.com/stutymore/feishu-doubao-knowledge-base-20260921144702.png)

下面这个 prompt 我认为是知识库最有价值的体现了。

> 基于我已有写作内容的知识量，再以这本书为基线，你觉得我首要应该提升的地方在哪里，我最应该读哪几章的内容？

![](https://cdn.paicoding.com/stutymore/feishu-doubao-knowledge-base-20260921150514.png)

还有邪修用法。很多小伙伴不都有收藏癖么，你可以把网上搞到的资源直接扔到知识库中，然后写个定时任务，定时检索你都扔进去什么东西，写个系统性的清单出来，比单纯点个收藏有用多了。

比如说我就按照上面这个方法，把王二讲Agent的底稿整理到飞书文档了，预计会更新 347 题，基本上把市面上所有高频的题目都收录了。

![](https://cdn.paicoding.com/stutymore/feishu-doubao-knowledge-base-20260921145815.png)

>https://my.feishu.cn/docx/OMEydeGrSodQSixF6rDcoNTanOh

每周一早上，检索我知识库里上周新入库的内容，按主题归类，输出一份清单。这周我存了什么、分别是什么类型、哪些还没看过、哪些值得整理成文章。

飞书的优势在于，豆包工作支持定时任务，可以设一个每周一自动执行的计划，结果直接发到我的飞书消息里。

![](https://cdn.paicoding.com/stutymore/feishu-doubao-knowledge-base-20260921150217.png)

区别在这儿。收藏只是把东西从别人的网页挪进你的收藏夹，东西还是那些东西。入库加定期检索，是让豆包工作替你读一遍，然后告诉你你存了什么。前者是囤积，后者才算复盘。

这样的话，有任何疑问都可以直接丢给豆包工作，让它从我的知识库里找答案，比如「Agent 的记忆机制怎么实现的？」。

第一种，直接在飞书里点开【问问豆包】。

![](https://cdn.paicoding.com/stutymore/feishu-doubao-knowledge-base-20260921151130.png)

输入提问。

![](https://cdn.paicoding.com/stutymore/feishu-doubao-knowledge-base-20260921151047.png)

然后豆包工作就会从我们的知识库去查询。看到没？

>这个问题在题库中对应第 38、39、40 题（怎么让 Agent 拥有记忆、短期记忆、长期记忆）

![](https://cdn.paicoding.com/stutymore/feishu-doubao-knowledge-base-20260921151403.png)

它不仅给出了答案，还标注了答案来源是哪篇文章、哪个章节。甚至还有示意图。

![](https://cdn.paicoding.com/stutymore/feishu-doubao-knowledge-base-20260921151500.png)

答题思路也是从短期记忆开始，然后到长期记忆。

![](https://cdn.paicoding.com/stutymore/feishu-doubao-knowledge-base-20260921151541.png)

![](https://cdn.paicoding.com/stutymore/feishu-doubao-knowledge-base-20260921151554.png)

第二种，从豆包工作进去，也是完全可以的，两边其实会自动同步。

![](https://cdn.paicoding.com/stutymore/feishu-doubao-knowledge-base-20260921151652.png)

这种学习方法，是不是就高效多了？

有一说一，飞书 + 豆包工作的体验非常不错。和飞书文档天然打通，不需要额外装连接器，上传完直接就能用。

不过，有一点我不太满意，批量上传 200 多个文件的时候加载比较慢。但整体来说，瑕不掩瑜。

**我觉得这是 AI 时代最适合飞书用户的知识管理方案。**

咱们下期再见。
