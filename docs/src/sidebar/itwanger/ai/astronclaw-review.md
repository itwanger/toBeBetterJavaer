---
title: 讯飞版OpenClaw来了，5分钟搞定同事一辈子的幸福。
shortTitle: AstronClaw实测
description: 科大讯飞版“龙虾”AstronClaw上线实测，16.8元/月，支持飞书、钉钉、企业微信，131个技能包秒级部署，沙箱隔离安全又智能。
tag:
  - Agent
  - 科大讯飞
category:
  - AI
author: 沉默王二
date: 2026-03-13
---

大家好，我是二哥呀。

最近 AI 圈是真的热闹，各大厂轮番上新自家的 OpenClaw。

这不，讯飞版的“龙虾”AstronClaw 也上线了，主打：

- 无需编写代码，无需额外设备。
- 省去复杂的安装流程，节省高额的部署成本。
- 即开即用，彻底告别环境依赖。

并且 AstronClaw 是隔离运行在讯飞自研的 Sandbox 中，可以放心安全地使用，不用担心数据问题。

![](https://cdn.paicoding.com/stutymore/sucai-20260312221247.png)

如果你还在纠结要不要上手 OpenClaw，这篇内容会帮你少踩很多很多坑。

顺带给大家分享一句话，元宝说的，但我觉得特别好。

> 幸福不在装与卸之间，而在它能否夹起你碗里的热饭。工具如筷，合手才暖。

![](https://files.mdnice.com/user/3903/735e9fc2-3a05-43f3-8b55-a0924ad3d560.png)

系好安全带，我们发车。

养虾第一步，浏览器打开这个地址：`https://agent.xfyun.cn/astron-claw`，选择【基础版】套餐，首月只需要 16.8 元就可以让你的「电子龙虾」上岗。

![](https://cdn.paicoding.com/stutymore/sucai-20260312230049.png)

而且讯飞这波诚意给的很足，**即日起到 3 月 20 日 10:00，订阅任一套餐都能享受对话不扣积分、不扣积分、不扣积分**，等于无限畅聊。

选完套餐后点击【立即部署】，只需要 1-2 分钟就可以拥有你自己的虾了，干净又卫生，哦不，安全又智能。

![](https://cdn.paicoding.com/stutymore/sucai-20260312221514.png)

我用了一天下来，没有出现任何卡顿或者报错的情况，稳定性这方面讯飞作为大厂确实靠谱。

## 01、标书校验实战体验

这次我们一改往日的风格，先给大家上实战。看看AstronClaw到底能帮我们做些什么，到底应用场景在哪里？

直接上视频大家先感受下。

【录屏】

这是公司做标书的同事求我做的一件事，她之前是在一个网站上做校验的，一次校验就要 100 块大洋，真的很肉疼。

做过标书的小伙伴应该知道，标书这玩意需要反复打磨，每搞一个版本就要校验一次，很费钱的。

所以我就那 AstronClaw 来试试，看看能不能做一个自动化的 Skills，我把要校验的标书规则发给他，再把要校验的标书发给他，看看什么结果哈。

> 提示词：我现在有另外一个重要的事情交给你。我有一份标书，要你帮我校验，我会告诉你校验的规则，还会发你要校验的标书，你能做到吗？

![](https://files.mdnice.com/user/3903/036c8397-855b-4751-b63f-bbe859e4ac30.png)

好，AstronClaw 已经搞清楚规则了。

![](https://files.mdnice.com/user/3903/18ae4bf5-dd1c-49e4-8398-fcc400bf664a.png)

包括：

- 签章要求
- 排版要求
- 标题编号格式
- 图表要求
- 内容禁忌

然后我们把要校验的标书发给他。

![](https://files.mdnice.com/user/3903/a277a585-41ff-434b-8d0c-3c0ea9869853.png)

很快，校验的结果出来了。

![](https://files.mdnice.com/user/3903/cdabb2de-2da3-4bc1-b3d8-5556bd0fda33.png)

其中签章要求合格、排版要求不合格、标题编号合格、图表要求合格、内容要求合格。

然后把不合格的条目一一都列了出来，还有修改建议，非常贴心。

那我们继续，让 AstronClaw 按照之前的检测报告格式，也给我们生成一份，看看他的学习能力。

![](https://files.mdnice.com/user/3903/31b2c294-03a4-4e32-b7e0-cdf40bbaebef.png)

OK，检测报告也出来了。

![](https://files.mdnice.com/user/3903/69cb744d-9cd4-4d23-8ebd-8f8091a5226f.png)

我发给同事后，评语只有一个：相当可以。能不能批量检测。

![](https://files.mdnice.com/user/3903/f36fe5a5-0dc3-4ca0-817d-3de539514457.png)

那必须是可以的啊。

![](https://files.mdnice.com/user/3903/21ed6c9a-cc6e-42e0-9a56-f2801f3d00fa.jpg)

全部搞定。


![](https://files.mdnice.com/user/3903/2bc8554f-a32a-4728-b5dd-7cd5876045bb.png)


## 02、多模型自动切换

AstronClaw 支持的模型阵容很豪华，有讯飞的 Spark-X2、GLM-5、MiniMax 2.5 和 Kimi 2.5，这些都是目前最火的国产大模型。

![](https://cdn.paicoding.com/stutymore/sucai-20260312221633.png)

最让我惊喜的是 Auto 模式，AstronClaw 可根据任务需求自由切换模型，无需繁琐配置，无需管理 API Key。

你完全不用操心模型选择这件事，交给 AstronClaw 自己判断就行。比如你要写代码，它会自动选 Spark-X2；要做长文本理解，会切到 GLM-5。

这种自动切换的设计，避免了你在不同模型之间来回切换的麻烦。

而且，不同模型擅长的事情不一样，自动路由能保证每次任务都用最合适的模型来处理，效率自然就上去了。

## 03、10000+ Skills

AstronClaw 已经内置连接 ClawHub 生态，能轻松调用 10000+ Skills。

点击右侧的 Skills 小图标，这里已经可以看到 131 个已安装的技能包。包括智能简历生成、OCR、播客生成器、声音克隆等。

![](https://cdn.paicoding.com/stutymore/sucai-20260312222110.png)

如果你想安装第三方的 Skills，往下翻。

只需要鼠标轻轻一点就可以，几乎可以说秒安装。

![](https://cdn.paicoding.com/stutymore/sucai-20260312222441.png)

当然，你也可以上传自己的 Skill，让 AstronClaw 更懂你。

## 04、飞书、钉钉、企微全支持

渠道依然是御三家，飞书、钉钉和企业微信。这里我们就以飞书为例。

![](https://cdn.paicoding.com/stutymore/sucai-20260312222648.png)

点击配置说明中的紫字【飞书开放平台】，新建一个 AstronClaw 助手应用。

![](https://cdn.paicoding.com/stutymore/sucai-20260312222831.png)

添加机器人能力。

![](https://cdn.paicoding.com/stutymore/sucai-20260312223004.png)

进入权限管理，将以下配置批量导入，这是科大讯飞官方给我们提供的推荐配置，直接无脑复制就可以了。

```
{
  "scopes": {
    "tenant": [
      "aily:file:read",
      "aily:file:write",
      "application:application.app_message_stats.overview:readonly",
      "application:application:self_manage",
      "application:bot.menu:write",
      "cardkit:card:write",
      "contact:user.employee_id:readonly",
      "corehr:file:download",
      "docs:document.content:read",
      "event:ip_list",
      "im:chat",
      "im:chat.access_event.bot_p2p_chat:read",
      "im:chat.members:bot_access",
      "im:message",
      "im:message.group_at_msg:readonly",
      "im:message.group_msg",
      "im:message.p2p_msg:readonly",
      "im:message:readonly",
      "im:message:send_as_bot",
      "im:resource",
      "sheets:spreadsheet",
      "wiki:wiki:readonly"
    ],
    "user": ["aily:file:read", "aily:file:write", "im:chat.access_event.bot_p2p_chat:read"]
  }
}
```

![](https://cdn.paicoding.com/stutymore/sucai-20260312223228.png)

接下来，回到 AstronClaw 的消息渠道配置，把飞书【凭证与基础信息】中的 APP ID 和 APP secret 复制粘贴到输入框里。

![](https://cdn.paicoding.com/stutymore/sucai-20260312223356.png)

点击【保存配置】。

![](https://cdn.paicoding.com/stutymore/sucai-20260312223653.png)

回到飞书的【事件与回调】，把长连接打开。

![](https://cdn.paicoding.com/stutymore/sucai-20260312223749.png)

把 AstronClaw 推荐的 `im.message.receive_v1` 接收消息事件添加上。

![](https://cdn.paicoding.com/stutymore/sucai-20260312223953.png)

提醒大家把回调配置的长连接也打开，顺带把【卡片回调交互】添加上。

![](https://cdn.paicoding.com/stutymore/sucai-20260312224113.png)

这样飞书的交互体验会更加友好一点。

然后就可以点击版本管理与发布，准备通过 AstronClaw 和飞书交互起来吧。

![](https://cdn.paicoding.com/stutymore/sucai-20260312224239.png)

进入飞书，找到我们的 AstronClaw 助手，随便发送一条消息。

![](https://cdn.paicoding.com/stutymore/sucai-20260312225155.png)

收到回复的话，就证明我们的飞书渠道打通了，可以开始愉快地养虾了。

给我们的虾起个名字，就叫 AstronClaw 助手，他是平行世界里我们的 AI 助手。

![](https://cdn.paicoding.com/stutymore/sucai-20260312225254.png)

## 05、定时任务实战

好，我们继续来上实战应用场景。你可以扩展到其他的定时任务，比如说帮你盯股票，😄

比如说我想要 AstronClaw 每天早上 9 天给我汇报 hack news 上的 AI 早报，他就会到点给我整理。

提示词也很简单：

> 每天早上 9 点帮我盯一下 hacknews 上有趣的 AI 讯息，整理几条发给我。

![](https://files.mdnice.com/user/3903/fb1c2478-f0ae-486c-858b-18e95ec5e53f.jpg)

- AI 人脸识别误判导致无辜女性入狱
- Anthropic 发布 Claude 可直接生成交互图表/可视化
- Axe（12MB）主打替代重型 AI 框架（Show HN）
- RAG 文档投毒攻击实战分析

确认都是我蛮感兴趣的点，整个过程我也就给了一句提示而已。

### 06、简历生成实战

金三银四，这个场景蛮刚需的。

尤其是我在修改简历的过程中，发现很多小伙伴的简历写的一团糟。

那刚好，我看到 AstronClaw 提供了简历生成 Skills，我们就来测试一下。

> 提示词：我想让你帮我生成一份简历，你那边有简历生成的 Skills 吗

![](https://files.mdnice.com/user/3903/4df9dc40-9068-460f-a4c8-678f35075f5f.jpg)

看到 AstronClaw 回复我们了，说有的，有一个 xfyun-resume 的 Skills 可以用。

包括基本信息、教育背景、工作经历、专业技能、求职意向、奖项证书等。

> 提示词：我们先从项目经历开始写，好吧

![](https://files.mdnice.com/user/3903/504f062f-976f-4cf5-b388-382d60ce98dc.png)

那我们就先从项目经历出手，因为这部分是最重要的。

然后把我们的项目经历告诉 AstronClaw。

> PaiFlow Java 后端开发 2025 年 12 月-2026 年 1 月

项目介绍：派派工作流是一个企业级 AI Agent 工作流编排平台，支持用户通过可视化方式编排大模型节点、插件与逻辑控制流。项目采用微服务架构，集成了 LLM、超拟人音频合成等工具，提供从工作流设计、调试到发布的完整生命周期管理。

技术栈（Java 版工作流这样写）：Java 21, Spring Boot, MySQL 8.4, Redis, MinIO, Docker Compose, MyBatis-Plus, SSE，SpringAI，LangChain4j

核心职责：

- 编写并优化 Docker Compose 编排脚本 ，统一管理 MySQL、Redis、MinIO、Console Hub 及 Workflow Engine 等 5+ 个核心服务的依赖关系与健康检查，实现了“一键拉起”开发环境，将本地环境搭建时间从小时级降低至 30 分钟以内。
- 基于 LangGraph4j 的 BaseCheckpointSaver 实现工作流检查点机制，支持执行状态持久化与断点续传。

然后 AstronClaw 就开始收集我们的信息并告诉我们还需要填哪些信息。

![](https://files.mdnice.com/user/3903/2a785f2b-9f11-4eba-9ca1-512049709843.jpg)

> 提示词：姓名：沉默王二 年龄：18 学校：郑州大学 我是找暑期实习，所以还没有工作经历，专业技能暂时不填，求职意向是 AI 应用开发工程师。

![](https://files.mdnice.com/user/3903/d79ec7e9-db0e-4f9d-a1a2-9a6cb63a295e.png)

告诉他，我们的求职意向是 AI 应用开发工程师，然后我们来看看简历的排版，是否满足我们的预期哈。

![](https://files.mdnice.com/user/3903/3660e1da-fa21-45c2-8cf2-136ad0ff38b0.png)

不仅有 word 版本，还有 PDF 版本，并且都提供了下载地址。

![](https://files.mdnice.com/user/3903/6728709d-3882-46c0-ab88-0cebb6ae4998.jpg)

打开看一下。

![](https://files.mdnice.com/user/3903/4539fb59-8685-4bdf-b473-eb10faf57af9.png)

毕业时间没有给，但知道暑期实习是 27 届，还挺有水平的。

![](https://files.mdnice.com/user/3903/3d10ea5c-1fde-412b-9fba-634ccf9435bf.png)


## ending

AstronClaw 让我想起了当年云计算刚起来的时候，大家都在争论要不要上云，现在谁还自己架服务器？

AI Agent 也会走这条路的。

未来每个人都会有自己的数字助手，不是那种还要自己配置模型、自己写代码的玩具，而是真正能干活的伙伴。

![](https://files.mdnice.com/user/3903/29d192d0-4b7a-4d4f-b17b-5192426651d5.jpg)

16.8 元，一杯咖啡的钱，就能拥有一个懂业务、能扩展、安全可靠的 AI 助手。

这种普惠，才会让 AI 真正走进每个人的工作和生活。

可能你不需要，因为你已经有非常强大的工具了，但对于那些不懂 AI，不懂编程的小白来说，OpenClaw 能给予的帮助可实在太大了。

**就像我给同事做的标书检测 Skills，对于她来说，可能是一辈子都无法自己完成的事情，毕竟她真的不懂，但我通过 AstronClaw，几分钟就搞定了**。

这可能才是AI普惠的真正价值。

让龙虾去帮助到那些真正需要帮助的人，也许不是你，也许不是我，但可能是他/她。

