---
title: 手机版 Codex + ChatGPT，夯爆了！
shortTitle: Codex手机版
description: Codex 和 ChatGPT 手机端打通了，手机编程时代来了？实测体验+技术原理+实战案例。
tag:
  - Codex
  - ChatGPT
category:
  - AI
author: 沉默王二
date: 2026-05-15
---

大家好，我是二哥呀。

自从有了 Codex 和 Claude Code 之后，我的编程方式可以说发生了翻天覆地的变化。

IntelliJ IDEA 逐渐成为一个代码 review 工具。

![免费版就行](https://cdn.paicoding.com/paicoding/23bcf648e01c503fcbc500433c0d971e.png)

现在是：打开 Codex，输入提示词，然后打开手机刷小姐姐。

哦不，盯着屏幕发呆，等 Codex 的宠物提醒我任务完成。

![](https://cdn.paicoding.com/stutymore/sucai-20260515101801.png)

确认完成度没问题，继续下一个任务。

![](https://cdn.paicoding.com/stutymore/sucai-20260515102135.png)

换句话说，写提示词的时间远远小于我盯着手机屏幕的时间。

怪不得最近老想换个超大屏手机，苹果的折叠屏未来你别说，真不是鸡肋。

我就一直在想，Codex 如果能上线一个手机端的功能该多好啊。以后我就只需要一个手机。

然后今天，它真的来了。

![](https://cdn.paicoding.com/paicoding/75623e5cae1708ac95f6617e37a66414.jpg)

ChatGPT 手机端可以直接连接桌面端的 Codex 进行编程了。安卓和 iOS 都可用。

md，以后蹲个坑都得想着干活了

> 还没有实践的小伙伴，请系好安全带，我们出出出出发！

## 01、Codex 更新到最新版

第一步，把桌面端的 Codex 更新到最新版。

更新完之后，上来就会弹一个新功能提示，告诉我们 Codex 现在支持从 ChatGPT 手机端远程连接了。

![](https://cdn.paicoding.com/stutymore/sucai-d61dbb9e7e34e86ec74319771db9411b.png)

点击【Get Started】，进入连接设置。

![](https://cdn.paicoding.com/stutymore/sucai-5dbf8859f5ad9fd23e80013a64e3bc0e.png)

这里会弹出一个权限确认窗口，问你是否允许 ChatGPT 手机端连接到这台电脑上的 Codex 实例。

![](https://cdn.paicoding.com/stutymore/sucai-20260515103318.png)

点击【允许】，然后等手机端的 ChatGPT 过来连接。

连接成功后，在 Codex 的设置界面点击【连接】，可以看到刚连上的 ChatGPT 设备信息。

![](https://cdn.paicoding.com/stutymore/sucai-20260515102820.png)

我用的安卓。

整个配置过程不到两分钟，比我预想的简单太多了。

## 02、ChatGPT 手机端更新到最新版

手机端也得是最新版。

我用的 Google Play。iOS 用户直接去 App Store 更新就行，都一样。

![](https://cdn.paicoding.com/stutymore/sucai-1d12831a04d264606637a622c51f92b4.jpg)

更新完打开 ChatGPT，在首页就能看到一个 Codex 的入口选项。

![](https://cdn.paicoding.com/stutymore/sucai-eb71b4cb783291157ec3e4cb641d3dd1.jpg)

点进去，手机端会自动和你 macOS 上的 Codex 进行同步。这个过程是全自动的，不需要扫码、不需要输入什么配对码，只要你在两端都登录了同一个 OpenAI 账号就行。

![](https://cdn.paicoding.com/stutymore/sucai-cc7c2ea503ef4d7e5101b3f2f25b63c9.jpg)

同步完成后，手机端就能看到 Codex 上的所有项目了。

你在桌面端创建的任务、已经完成的任务、正在进行的任务，全部都在这里。

这意味着什么？

意味着你在公司用 Codex 开了一个任务，下班路上掏出手机就能看到进度，甚至可以在地铁上发起新的编程任务。

就是你的 macOS 得一直处于唤醒状态。

或者等有一天，Codex 真的成了一个 supper 应用，有任务直接唤醒电脑工作就完事。

## 03、背后的技术原理

很多小伙伴可能好奇，手机端和桌面端是怎么打通的？

先说一个数据：截至 2026 年 5 月 14 日，Codex 的周活跃用户数已经突破了 400 万。这么大的用户基数，手机端远程操控的需求一直是开发者社区里呼声最高的 Feature 之一。

OpenAI 的官方解释是：底层走了一层 **secure relay**（安全中继），让运行 Codex 的机器能跨设备保持可达，同时又不直接暴露在公网上。

翻译成人话就是 OpenAI 在中间架了一层代理服务。你的手机端 ChatGPT 发出一条指令，先到 OpenAI 的中继服务器，中继服务器再转发到你桌面端的 Codex。响应也是反过来走同一条路。文件、凭证、权限这些敏感数据始终留在你的主机上，只有更新信息流向手机。

![](https://cdn.paicoding.com/paicoding/fb951ffd139e684e77d8c8e1211983c3.png)

你别说，有点 OpenClaw 的 Gateway 影子。

这个设计有几个好处：

**第一，安全**。你的 Codex 不需要开放任何端口到公网，也不需要什么 NAT 穿透或者 DDNS 这些花活。所有通信都经过 OpenAI 的加密中继，CLI 和 MCP OAuth 登录强制走 ChatGPT 认证。

**第二，会话状态跟着账号走**。你在哪台设备登录 ChatGPT，上下文就跟到哪里。在手机上开了一个编程任务，回到电脑前打开 Codex，上下文还在。这个体验跟 iCloud 同步笔记是一个意思，但同步的是整个编程会话——截图、终端输出、diff、测试结果，全部实时推到手机端。

**第三，架构讨巧**。OpenAI 没给 Codex 单独做手机 App，而是直接塞进了 ChatGPT 主 App。

手机端把 Codex 塞进 ChatGPT，也是超级 App 战略的延续。

桌面端走独立 App 整合，手机端走 ChatGPT 内嵌。

## 04、用手机端 Codex 开发技术派的视频组件

刚好技术派有一个视频组件功能要开发，正好拿来做测试，完全用 Codex + ChatGPT 手机端协作来搞定。

### 需求说明

技术派需要一个视频播放组件，支持用户在文章中嵌入视频。

涉及到的任务包括：前端播放器组件开发、后端视频点播（VOD）服务对接、VOD 加速域名配置、SSL 证书配置。

这个需求如果不让 Agent 搞，光配置 VOD 加速域名和 SSL 证书就得折腾小半天，还得翻一堆文档。

### 手机端发起任务

我直接在手机端的 ChatGPT 里打开 Codex，选择技术派的项目，然后描述了需求。

![](https://cdn.paicoding.com/stutymore/sucai-886c0252f26a199a12881ac0f729088f.jpg)

发出去之后，Codex 桌面端能同时看到任务开始执行了。

这个细节很赞：手机端能实时看到 Codex 的执行状态。

Codex 在干什么、当前进度如何、有没有报错，全部同步到手机端。

![](https://cdn.paicoding.com/stutymore/sucai-20260515120741.png)

### Codex 的执行过程

代码编写、单元测试、甚至调用 Chrome 浏览器进行前端测试——全自动。

![](https://cdn.paicoding.com/stutymore/sucai-20260515121138.png)

![](https://cdn.paicoding.com/stutymore/sucai-20260515121156.png)

你看，搞定了。前端播放器组件跑起来了，视频能正常播放。

涉及到 VOD 服务的开通和配置，Codex 也帮忙列举清楚了。

VOD 点播服务的开通：

![](https://cdn.paicoding.com/stutymore/sucai-20260515121552.png)

VOD 加速域名的配置：

![](https://cdn.paicoding.com/stutymore/sucai-20260515121609.png)

SSL 证书的配置：

![](https://cdn.paicoding.com/stutymore/sucai-20260515121642.png)

## 05、手机端 Codex 的不足

### 没办法直接截图

手机端虽然也可以让 Codex 使用 Chrome、使用 Computer（use computer），但有一个关键能力缺失，没办法直接截图反馈给 Codex。

![](https://cdn.paicoding.com/stutymore/sucai-ed32db263b6c7cfa53801ac26754dfbd.jpg)

截图这个能力看起来不起眼，但在实际开发中非常重要。

很多时候 Codex 的代码跑起来没报错，但很多细节 Codex 自己发现不了，需要我们人工反馈。

![](https://cdn.paicoding.com/stutymore/sucai-20260515123634.png)

在桌面端，可以截个图丢给 Codex。

手机端目前做不到这一点，以后可以加，但手机端终究是没办法验证桌面端的情况。

### 连接不稳定

我个人的体验。

手机端 ChatGPT 和 Codex 之间的连接会掉线，并且没有一键重连的功能。

我试出来的经验是，得杀掉 ChatGPT 重新启动，才能重新连接上。不知道大家有没有遇到同样的问题？

![](https://cdn.paicoding.com/stutymore/sucai-746d3165d1e5b9b346e8d4b1c3c637a7.jpg)

怎么判断有没有掉线呢？

看 Codex 连接状态那里的小圆点就行。

绿点 = 连接正常，黄点 = 掉线了。

网络波动这种事情，总搞得人提心吊胆的，哈哈。

你懂的。

## 06、手机编程的未来

说几句我自己的判断，纯个人观点，不一定对。

手机端操控 Agent 编程这件事，短期内不会取代桌面端。

前面说了，手机屏幕太小、输入不方便、截图反馈缺失，这些硬伤不是靠软件优化能解决的。

![](https://cdn.paicoding.com/paicoding/84bf6b684cf0aef5a6df17e0086adc07.png)

但手机端有自己的独特价值，那就是远程控制。

这也是 OpenClaw 当时爆发的主要原因。

OpenAI 同期还发布了 Remote SSH GA 和 Programmatic Access Tokens（编程访问令牌）。Remote SSH 意味着你可以把 Codex 连接到远程开发环境，比如公司的开发服务器或者云端的 GPU 实例。编程访问令牌则让 Codex 可以接入 CI/CD 流水线，自动化程度又上了一个台阶。

![](https://cdn.paicoding.com/paicoding/c6c0945985ca6c84897176d13f7bd3f3.png)

OpenAI 的超级 App 战略也是奔着这个方向去的。

ChatGPT + Codex + Atlas 浏览器整合成一个入口，以后一个 App 搞定聊天、编程、上网。

**【真正改变习惯的技术，刚出来的时候都不太好用，但你一旦用过，就再也回不去了。】**

我们下期见。
