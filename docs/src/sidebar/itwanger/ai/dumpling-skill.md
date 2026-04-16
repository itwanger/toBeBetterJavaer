---
title: 北邮附近的饺子馆，在 GitHub 上开源了自己的 Skill，有意思。
shortTitle: 饺子馆.skill
description: 北邮旁边的金谷园饺子馆在 GitHub 上开源了自己的 Skill，用 MCP 协议接入 AI Agent，能查菜单、问 WiFi、甚至排队取号。技术不难，但视野完全不一样了。
tag:
  - Agent
  - Skills
category:
  - AI
author: 沉默王二
date: 2026-04-13
---

这几天，有一家饺子馆火了，在北京邮电大学旁边。

名叫金谷园，第一家和 AI 接轨的饺子馆。

![](https://cdn.paicoding.com/stutymore/sucai-aacb4bc15bcf6027c774ec49a5594f09.jpg)

不是段子，是真的。

> GitHub 地址在此：https://github.com/JinGuYuan/jinguyuan-dumpling-skill

![](https://cdn.paicoding.com/stutymore/sucai-20260413153432.png)

这视野，我真自愧不如。他们这个 Skill 也做的特别有水平，除了 SKILL.md ，还有一个 skill.json，里面定义了这几点：

- mcp_server.url — MCP 服务地址，Agent 可以自动发现和连接
- tools`[]` — 每个工具的 name、description、inputSchema、annotations（只读/幂等标记）
- brand_prompt — 品牌语气指导（“像朋友推荐常去的馆子”）
- `keywords[]` — 触发词列表，方便 Agent 匹配意图

额。

不愧是北邮附近的饺子馆。😄

## 01、一家饺子馆为什么要做 Skill

先说背景。

金谷园的老板李博，北邮计算机通信专业毕业，毕业后没写过代码，一头扎进餐饮行业干了快二十年。

> 信息来源于搜狐的一篇报道：https://m.sohu.com/a/1008127619_121948415

4 月 7 号下午，李博在咖啡馆刷手机，看到字节 Coze 要发 2.5 版本、腾讯 WorkBuddy 也在搞事情。他做了一个判断：Agent 面向大众普及的起点到了。

当晚回到家，打开电脑，用 vibe coding 的方式开搞。他用字节的 Coze 做调研和需求梳理，用阿里的 Qoder 做任务编排和代码生成（通过 AI 分身团队协作），最后用腾讯 CloudBase 做云托管部署。

然后他用饺子店公众号发了篇推文。

当时就有小伙伴在群里转发这件事。

![](https://cdn.paicoding.com/paicoding/665a40ceb08e18905eba6212e6fedd0e.png)

现在有 1.9 万转发，2000 多点赞，非常火 🔥。

说真的，一家饺子馆搞出这动静，技术已经很牛了，视角也够牛逼。

## 02、饺子.Skill 到底能干啥

我把这个 Skill 装到了 Claude Code 里（没装龙虾，我的龙虾已经有一周没用了，最近敲代码比较多），实际体验了一圈。

安装很简单，直接告诉 Agent：

```
帮我安装金谷园饺子馆 Skill，仓库地址：https://gitee.com/JinGuYuan/jinguyuan-dumpling-skill
```

Agent 会自动克隆仓库、自动识别目录下的 SKILL.md，下次启动就会自动加载这个 Skill。

![](https://cdn.paicoding.com/paicoding/98ce6b0223aba990ccf7852f0e1f341f.png)

装完之后我试了试。

“金谷园在哪？”

它告诉我北邮店在杏坛路文教产业园 K 座南 2 层，五道口店在东源大厦 4 层，营业时间 10:00 到 22:00。

![](https://cdn.paicoding.com/paicoding/6bf6e6adf87010e0edfe67ed0044c4fa.jpg)

只不过 MCP 的注册有点问题。

重启 Claude Code 也没解决，但是不耽误用。

本质上是通过 Streamable HTTP 和部署在腾讯 CloudBase 上的云函数通信。

说白了就是 Agent 问，云端答，中间走 MCP 协议。

## 03、在 Agent 里排队吃饺子

这个 Skill 内嵌了美团的排队能力。不是跳转美团 App，是 Agent 直接帮你取号。

我试了一下：“帮我在北邮店排个队，2 个人。”

![](https://cdn.paicoding.com/paicoding/1d0be3f0ce7f741691cc248d3465a595.png)

不过 Claude Code 我没有连手机端，这个功能是需要美团授权的，电脑短暂没法搞。

![](https://cdn.paicoding.com/paicoding/38ca527bf995c228374922d77a2170fe.png)

需要体验完整流程的话，最好是在飞书、微信 bot 中连 OpenClaw 或者爱马仕 Agent，我暂时就不体验了。

毕竟人此刻不在北邮。😄

就不浪费资源了。

北邮的小伙伴可以试试。

内部的原理我倒是可以讲一讲。

首次使用需要授权美团账号，Agent 会引导你完成，同一会话内不用重复登录。技术上是通过内嵌的 `meituan-queue` 子 Skill 实现的，和主 Skill 版本独立演进。

![](https://cdn.paicoding.com/paicoding/e256a09a38460a15f1e686685d1b1e55.jpg)

讲真，排队这个功能才是整个 Skill 里最有想象力的部分。

![](https://cdn.paicoding.com/paicoding/e76a71344dbdc0bed0e481f334d164f6.png)

一句话说就是：一个 Python 脚本 + 美团点评的 Web API + 美团 Passport 鉴权，把排队取号包装成了 CLI 命令，再由 Claude Code 的 Skill 系统串起来给用户调用。

偏技术角度就是。

排队功能的核心是一个 Python 脚本（mt_queue.py）通过 urllib 直接调用大众点评的排队 API（m.dianping.com/queue/mdp/ajax/）。

![](https://cdn.paicoding.com/paicoding/774f92fd77fc544e9afcc4b1ad36316b.png)

整个流程分四步：先调 queueIndexV2 接口查门店是否支持在线排队、有哪些桌型（小桌 2 人、中桌 3-4 人等）、每个桌型前面排了几桌；

然后根据用户说的人数自动匹配合适的桌型，校验人数是否在桌型容量范围内；确认后 POST queue 接口取号，取号成功后立即轮询 queueOrderDetail 接口（最多 3 次，间隔 1 秒）拿到排队号、状态、前方等待桌数、预计等待时间等完整信息返回给用户；

后续还能随时查进度或调 cancelQueue 取消。脚本做了不少防护：取号前检查是否已有订单防止重复取号，无人排队时要求 --force 确认，人数与桌型不匹配直接拦截，取号成功后即使轮询详情失败也不会报错（因为号已经取到了）。

鉴权是排队功能最复杂的部分，采用了 Skill 嵌套依赖的方式解决。

![](https://cdn.paicoding.com/paicoding/2956d46484946a93d82980213eea5ef2.jpg)

mt_queue.py 需要一个美团登录 token 才能调 API，这个 token 通过内嵌的 meituan-passport-user-auth Skill 获取——它本质上是一个全局安装的 Node.js CLI 工具（mt-passport），执行 auth 命令向美团 Passport 服务申请一个授权链接，用户在手机上点击链接并确认授权后，脚本通过 --poll 参数轮询等待授权完成（最长等 3 分钟），成功后 token 缓存到 `~/.xiaomei-workspace/mt_passport_auth.json`，同会话内复用不用反复授权。

mt_queue.py 拿到 token 后放进 HTTP 请求头的 token 字段，配合 enterchannel=2（标识美团渠道）发起请求。

整个过程对用户来说就是点一下授权链接，剩下的全自动。

## 04、饺子.Skill 技术架构

翻了一下 Skill 的目录结构：

```
jinguyuan-dumpling-skill/
├── SKILL.md                 # 核心：元数据 + Agent 指令
├── skill.json               # MCP 端点和工具定义
├── references/
│   └── meituan-queue/       # 美团排队子 Skill
│       ├── SKILL.md
│       ├── scripts/         # 排队脚本（mt_queue.py 等）
│       └── references/      # 鉴权子 Skill
└── README.md
```

SKILL.md 定义 Agent 怎么和用户聊天，skill.json 定义 MCP 工具接口，云函数负责返回数据。

排队功能复杂一点，多了一层美团的鉴权和 API 调用。

![](https://cdn.paicoding.com/paicoding/b58ac91b2f27dc4e925f7bd7a5512db7.png)

信息查询（地址、营业时间、外卖、Wi-Fi、动态）这类走远程 MCP Server，部署在腾讯云 CloudBase
上，通过 Streamable HTTP 协议提供 5 个只读工具，Claude Code 启动时自动发现并注册。

排队操作（取号、查进度、取消）走本地 Python 脚本直连美团大众点评的 Web API，纯 stdlib 实现。

## ending

饺子馆老板李博在接受采访时说了一句话：“Skill 是未来的小程序。”

想想好像是这么回事。

一家饺子馆可以有 Skill。一家理发店可以有 Skill。一个街边的早餐摊都可以有 Skill——“今天包子还有吗？”“豆浆是现磨的还是冲的？”“帮我预留两个茶叶蛋，我十分钟到。”

一个足够智能的 Agent，完全可以帮你省掉去 APP 上查看信息的步骤。😄

![](https://cdn.paicoding.com/paicoding/901f19f9f09bed9ad22049dbad797912.png)

用不了多久，每个人都会有自己的专属 AI 助理，你走到一家餐厅附近，你的 Agent 和餐厅的 Agent 在后台自动“握手”，交换信息——有没有座位、等多久、今天推荐什么、你过敏的食材有没有。

你什么都不用做，手机震一下，弹出一条消息：“金谷园有座，牛肉大葱水饺今天新到，要不要进？”

你说“进”，Agent 自动取号、选桌、甚至提前下单。你走进去的时候，饺子刚好端上桌。

谁先做，谁就先占住了 Agent 里的那个位置。

金谷园就是那只螃蟹。哦不，那只饺子。

不得不承认。

**【看到机会的那一秒，比写一万行代码都值钱。】**

AI 时代，连饺子馆都在 GitHub 上开源了 Skill。我们这些开发还在等什么？