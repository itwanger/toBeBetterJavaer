---
title: 字节版 OpenClaw 来了！ArkClaw 无需部署，开箱即用。
shortTitle: ArkClaw + Coding Plan 实测
description: 火山引擎 ArkClaw 云端版 OpenClaw 完整测评，配合 Coding Plan 套餐 tokens 不限量，首月只要 9.9 元。从注册到接入飞书，帮你判断值不值得上车。
tag:
  - ArkClaw
  - OpenClaw
  - 火山引擎
category:
  - AI
author: 沉默王二
date: 2026-03-08
---

大家好，我是二哥呀。

之前写了篇 OpenClaw 本地部署的保姆级教程，评论区纷纷叫好，很多小伙伴都在本地养起了自己的龙虾。

好好好，但有两个问题亟需解决。

一，对于非技术的小伙伴来说，OpenClaw 本地部署的门槛依然存在，不然上门部署 OpenClaw 这门生意不会这么火爆。

二，不是没有 Mac mini，不是不会安装，而是 token 实在是用不起啊，下面这位小伙伴十几天就消耗了三亿多 token，我也算是见过夸张本人了。

![](https://cdn.paicoding.com/paicoding/c11be84a19bfd44aee6bc0b99b954365.png)

那有没有优雅的解决方案呢？

答案是必须有。

这不，我们牛哄哄的宇宙厂字节出手了，不仅带来了自家的 OpenClaw——ArkClaw，天生集成飞书办公套件，包括多维表格在内；内置网盘存储；内置 Skills 安全扫描；兼容 Doubao-seed-2.0、Kimi、GLM-5、MiniMax 等顶级模型。

![](https://cdn.paicoding.com/paicoding/111928f5f35c5a0ed7786cb0075e8cd7.jpg)

零配置、零部署，打开浏览器就能用。更狠的是，配合他们家的 **Coding Plan 套餐**，tokens 不限量不限量不限量（敲黑板划重点了），新用户首月只要 9.9 元。

![](https://cdn.paicoding.com/paicoding/955ca6c2120b622573788b302fd1a747.jpg)

真不是我在嘴嗨，是字节的实力有目共睹，确实能支撑起这件事。

除了用于 OpenClaw，Coding Plan 还能用于 Claude Code、Codex、Cursor 等编程工具，可以说一站式解决了 token 焦虑。

订阅地址我贴一下，有需要的小伙伴可以冲：`https://volcengine.com/L/5W07iDTdKlg`

记得填一下我的邀请码：`VAN5M9H3`，不仅你可以享受额外的 9 折优惠，相当于首月 8.9 元，我还能获得 10% 的代金券奖励，想想就觉得美滋滋（😄）。

省流总结版：**如果你想用 OpenClaw 的能力，又不想折腾环境，ArkClaw 就是目前最省心的方案。**

这篇内容会帮你搞明白三件事：ArkClaw 到底好在哪，Coding Plan 怎么选最划算，以及从注册到接入飞书的完整流程。

## 01、方舟 Coding Plan 套餐

玩龙虾的小伙伴都知道，最费钱的是龙虾身体，而是大脑，也就是我们给他配置的 LLM 大模型。

火山方舟的 Coding Plan 比较离谱，因为官方承诺不限量。

注意我说的是**不限量**。

![](https://cdn.paicoding.com/paicoding/d6c4837622619f1713aa1d2eab2d57bf.png)

深度玩过龙虾的小伙伴都知道，OpenClaw 在跑任务的时候，一个复杂的指令，比如说一次性帮我审批 20 个 gitcode 账号，Agent 在后台调用大模型至少得 20 轮。

token 的消耗量还是不小的，直接调用 API 会非常贵，有小伙伴直言试了下 Claude 的 opus 差不多一分钟 3 块，钱包有点遭不住啊。

![](https://cdn.paicoding.com/paicoding/558b4f6d0ca40fe376d409c2b7919c10.png)

方舟的 Coding Plan 主打一个**量大管饱，不限速，不限量**。你不用再掰着手指头算今天还剩多少 token，放开了用就行。

这对 OpenClaw 这样的 Agent 工具来说太关键了。因为 Agent 的本质就是大量的模型调用。你让它帮你整理一份文档，它可能要先读取文件、再分析内容、再生成摘要、再格式化输出——每一步都是一次模型调用。如果 token 有限量，你根本不敢放手让它干。

有了 Coding Plan，OpenClaw 也就能真正痛快地玩起来了。

![](https://cdn.paicoding.com/paicoding/38cffb59a56f9ff6a2224c609348503a.jpg)

> 订阅地址：https://www.volcengine.com/activity/codingplan?ac=MMAP8JTTCAQ2&rc=VAN5M9H3

要我说，大家也不用关心谁家的模型好，记住一条，谁家有价格低的就订阅谁家的，主打一个省吃俭用，全家不饿。😄

据我实测，Coding Plan 的用量普通场景下根本用不完。

## 02、ArkClaw 是什么？

先说背景。

OpenClaw 从发布到现在，三个多月，GitHub Star 数已经冲到 28 万+，稳坐 2026 年最火 AI 开源项目的位子。

各大云厂商看到这波流量，也全都坐不住了，一个比一个能卷。

![](https://cdn.paicoding.com/paicoding/d847d3b7ea67cb6bd197dc788ad83b8d.jpg)

一句话：ArkClaw 是火山引擎推出的 OpenClaw 云端托管版，说人话就是：火山帮我们把 OpenClaw 部署好了，直接用就行。

和本地版的核心区别，我整理了一张表：

| 维度          | 本地版 OpenClaw  | ArkClaw 云端版                |
| ------------- | ---------------- | ----------------------------- |
| 部署方式      | 手动安装，配环境 | 零配置，浏览器打开即用        |
| 在线时长      | 电脑关了就没了   | 7×24 小时在线                 |
| 模型接入      | 自己配 API Key   | Coding Plan 直接覆盖          |
| 飞书/钉钉接入 | 手动配置权限     | 可视化一键配置（3.10 后上线） |
| 数据存储      | 本地             | 云端（TOS 网盘）              |
| 安全          | 自己负责         | 火山引擎企业级安全加固        |

说白了，ArkClaw 就是拎包入住版的 OpenClaw。你不用管 Node.js 版本，不用管端口冲突，不用管服务挂了怎么重启。

火山引擎全给你包了。

![](https://cdn.paicoding.com/paicoding/5508ab84334da87e244aca622fcbc080.jpg)

那什么人适合用 ArkClaw？

如果你是程序员，喜欢折腾，想改 OpenClaw 源码，想自己装插件，那本地版更适合你。

如果你只是想用 OpenClaw 的能力——在飞书里指挥 AI 干活、处理文档、跑定时任务——不想在环境配置上浪费时间，ArkClaw 就是你的菜。

## 03、ArkClaw 部署实测

好，我们直接来看效果。

### 注册和开通

打开火山引擎的 ArkClaw 体验入口：

> https://v2ig.cn/cRm03IcFyUU/

用火山引擎账号登录（没有的话注册一个）。

![](https://cdn.paicoding.com/paicoding/223ef2aa00b5f83276a7212f00062199.png)

如果已经订阅了方舟 Coding Plan，就可以免费开启 ArkClaw。

### 一键部署体验

和本地版比，ArkClaw 的部署体验可以说是降维打击。

本地版你得：装 Node.js → 跑安装脚本 → 配模型 → 配飞书 → 启动 Gateway → 检查端口 → 排错。

ArkClaw 你只需要：点击【立即创建】就可以了。

![](https://cdn.paicoding.com/paicoding/5df050a22647a8b8024504b01542302f.png)

预计 1-2 分钟搞定。

![](https://cdn.paicoding.com/paicoding/34ab8a7e8d40103a96df0f3e201ab6bd.png)

对，就这样搞定了。

### 首次对话测试

然后在控制台的聊天窗口里，发一条测试消息：

> 你好，介绍一下你自己，以及你能帮我做什么。

ArkClaw 会回复它的能力范围——读写文件、执行命令、联网搜索、处理文档、定时任务等等。基本上和本地版 OpenClaw 能干的事是一样的。

![](https://cdn.paicoding.com/paicoding/e2ddc24acd8c123320c454c6c2f4b041.jpg)

![](https://cdn.paicoding.com/paicoding/5d94a54db46ffc7b3062591d8cdef5f8.jpg)

响应速度方面，我实测下来，用 Doubao-Seed-2.0 模型，普通对话的首 token 响应大概在 1 秒左右，流畅度还是很高的。

## 04、飞书接入实测

ArkClaw 接入飞书的流程，和本地版差不多，我把流程帮大家过一遍。

### 创建飞书应用

进入飞书开放平台：

> https://open.feishu.cn/app?lang=zh-CN

创建一个企业自建应用，名字随便取，比如 ArkClaw 助手。

![](https://cdn.paicoding.com/paicoding/8507618aa3caf77daf8757189a8e1ffd.png)

添加机器人能力，获取 App ID 和 App Secret。

![](https://cdn.paicoding.com/paicoding/8349824ca5ae547f883e2e39f64ef084.png)

### 配置权限

在权限管理页面，开通以下权限：

- `im:message`：获取与发送消息
- `im:message:send_as_bot`：以机器人身份发消息
- `im:chat`：获取群组信息
- `im:chat:readonly`：读取群组信息

或者直接用批量导入按钮，把 OpenClaw 官方推荐的权限一次性全导进去。

![](https://cdn.paicoding.com/paicoding/950684d3d4ad45f3ce5cffa933baec4f.png)

### 在 ArkClaw 中配置飞书通道

把 App ID 和 App Secret 填入 ArkClaw 的 IM 通道配置中。

![](https://cdn.paicoding.com/paicoding/4c0f0b3235bdef98cae26c9bdc970596.png)

等待配对结束。

![](https://cdn.paicoding.com/paicoding/ad697cb6af607a52530a1eb535096309.png)

### 配置事件订阅

在事件订阅页面，开启长链接模式，添加 `im.message.receive_v1` 事件。

![](https://cdn.paicoding.com/paicoding/c8d3532fa7a29f1dbc771fad101d856b.png)

这样在飞书里唤醒机器人时，消息会推送到 ArkClaw。

### 发布应用并测试

在飞书开放平台的版本管理页面，创建版本并发布（飞书的审核基本是秒过的）。

![](https://cdn.paicoding.com/paicoding/900f5a6d76930177b6c48d75d6344e0e.png)

发布后，在飞书里找到你的机器人，给他发一条消息：

> 你好，帮我整理一下今天的待办事项。

如果收到正常回复，飞书接入就搞定了。

![](https://cdn.paicoding.com/paicoding/2d4848261892e0ed47a4679908d76c51.png)

首次需要配对，回到 ArkClaw，点击【飞书配对】，填写刚刚 OpenClaw 回复的配对密钥。

![](https://cdn.paicoding.com/paicoding/27b07251a2c2bb72858823eae7fe3d80.png)

点击【确定】，等待配对结束就行了。

![](https://cdn.paicoding.com/paicoding/d39cfab266be4102148252e13544ba96.png)

## 04、多模型切换体验

和别家的 Coding Plan 不一样，火山方舟不是只绑了一个模型，它支持多模型自由切换。这意味着你订阅了一份套餐，就能在不同模型之间随便换，找到最适合你场景的那个。

良心啊！

模型切换的方法非常简单。

点击【设置】→【配置模型】，就可以跳转到模型广场。

![](https://cdn.paicoding.com/paicoding/cc04df84d1172a5e3448049dfa71a78f.jpg)

目前支持的模型有：

①、**Doubao-Seed-2.0 系列（重点推荐）**

这是字节自研的最新一代大模型，也是 ArkClaw 上体验最好的模型——毕竟同厂原生，从模型到飞书到 ArkClaw 都是字节自家的东西，调用链路最短，兼容性最强，稳定性也最高。

默认是 auto，点击左边的单选框就可以随时切换。

![](https://cdn.paicoding.com/paicoding/6d49591c483320fb3749a2afe0f37284.png)

②、**MiniMax-M2.5**

MiniMax 的 M2.5 也正式加入了 Coding Plan 的模型列表。MiniMax 在长文本和创意写作方面一直有口碑，M2.5 在多轮对话上的表现也不错。如果你的 ArkClaw 使用场景偏向内容生成、文案撰写，M2.5 是一个值得试试的选项。

![](https://cdn.paicoding.com/paicoding/7ed82e9bdcd6d6e47ae467616d60fab2.png)

**其他模型**

- **GLM 系列**（智谱）：后端工程能力强，在 Java/Spring 生态的代码生成上表现不错。
- **Kimi-K2.5**（月之暗面）：长文本、前端能力突出，适合需要大上下文窗口的场景。
- **DeepSeek 系列**：性价比之选，常规开发任务完全够用。

一份套餐，一堆模型随便切。

今天用 Doubao-Seed-2.0-Pro 跑复杂任务，明天切 Lite 处理日常对话，后天换 MiniMax-M2.5 写文案——这才是方舟 Coding Plan 的爽点。

不同模型在不同任务上的表现确实有差异，我简单试了几个场景。

### Doubao-Seed-2.0-Pro：玩转飞书文档 + 多维表格

Pro 的综合推理能力强，我拿它试了个很有意思的场景——让 ArkClaw 自学飞书插件能力，然后把学到的东西自动整理成文档和多维表格。

就一句话：

> 自行学习一下新插件的能力，创建一个总结文档，用插件能力体现你学会的功能。

然后 ArkClaw 就开始干活了。

![](https://cdn.paicoding.com/paicoding/2f00da5188e3522158075a1a4e6592e4.png)

![](https://cdn.paicoding.com/paicoding/4b9ee737e2199436b2a986676a43ee5d.jpg)

![](https://cdn.paicoding.com/paicoding/fd4f5c9c46af83aa4ac98af295e721d8.jpg)

它先扫了一遍已安装的飞书插件，搞清楚每个插件能干什么（创建文档、读取文档、操作多维表格、管理日历、管理任务……），然后直接在飞书空间里创建了**一份飞书云文档**，标题叫【飞书OpenClaw插件能力总览】，把每个插件的功能、用法、适用场景写得清清楚楚，格式工整，排版也不错。

![](https://cdn.paicoding.com/paicoding/7a9a94abd2b00d2d8ea65d9090ead63e.jpg)

这个 case 为什么要重点说？

因为它体现了 ArkClaw 的一个核心优势：**Doubao-Seed-2.0 + 飞书 + ArkClaw 同厂原生**。

从大模型到办公套件到 Agent 平台，全是字节自家的东西。

调飞书文档 API 用的是 `feishu_create_doc`、`feishu_update_doc`，操作多维表格用的是 `feishu_bitable_app`、`feishu_bitable_app_table_record`——这些飞书插件工具都是原生集成的，不需要你额外配置，开箱即用。

### Doubao-Seed-2.0-Lite：日常任务性价比之王

日常对话、文档处理、简单的信息整理，Lite 版本完全够用，而且响应速度明显更快。

点开 ArkClaw 的技能 button，点击【周报生成器】，然后安装这个技能。

![](https://cdn.paicoding.com/paicoding/b848eefdd97e3be0d5be44307a8463d4.png)

然后让 ArkClaw 帮我们生成一份周报。

![](https://cdn.paicoding.com/paicoding/dc46add4596839f7049be7a4b5f6d1ed.png)

然后让他每周五下班前一个小时帮我们完成。

![](https://cdn.paicoding.com/paicoding/1a33d8d0b0c37657a54f49e3f71c7a3d.jpg)

这样下班前 ArkClaw 就可以把周报通过飞书发送给我们。是不是爽歪歪。

### MiniMax-M2.5：内容创作有一手

切到 MiniMax-M2.5 之后，我试了一下让它帮我写一段产品介绍文案。出来的东西确实更有味道——遣词造句比纯 Code 模型要好，表达更自然，不那么生硬。

![](https://cdn.paicoding.com/paicoding/28f0f5dcd84e868fccd070e185f0b9fb.jpg)

以我的家乡，小学生四年级为环境切入，感觉写出来的内容还真的挺有画面感，很温馨。

我贴出来一部分，大家读一读，放松下，老师、家长的福音啊。

> 我有两个家乡，一个是爸爸妈妈工作的大城市，另一个是我最爱的乡下老家。
>
> 我最喜欢回老家了，那里一年四季都很美。
>
> 春天，村庄旁边的油菜花开了，金灿灿的一大片，像金色的海洋。蜜蜂在花丛中嗡嗡地唱歌，蝴蝶在花间翩翩起舞。我和哥哥在田边捉蝴蝶，玩得可开心了！
>
> 我爱我的家乡，爱那里的一草一木，爱那里的亲人。我想长大后也要经常回去看看，因为那里有我最美好的回忆。

如果你的 ArkClaw 除了干活还要帮你写东西——公众号文案、活动介绍、邮件回复这类，M2.5 值得试试。

## ending

我想起第一次用 OpenClaw 的场景。

那时候还在本地折腾，装 Node.js、配环境、调飞书权限，搞了一下午，终于跑通了第一个帮我审核 gitcode 账号的指令。当时觉得，这玩意儿真牛逼，但也真麻烦。

现在用 ArkClaw，打开浏览器，点两下，就能让 AI 帮我整理周报、汇总待办、操作飞书文档、管理多维表格。

这不是技术进步有多快，而是有人把门槛打下来了。

以前玩 OpenClaw 是技术人的专利，你得懂命令行、会配 API、能看日志。

![](https://cdn.paicoding.com/paicoding/a1a25e6486ceba942011e66b3c7f6eed.jpg)

现在呢？不用你在本地安装了，云厂商把这件事帮你做好了。

说实话，我测 ArkClaw 这几天，最大的感受是原来这件事可以这么简单。

比如说我想要一个学校的云图，ArkClaw收到命令后自己会去学习，然后等会把结果反馈给我。

![](https://cdn.paicoding.com/paicoding/ba0897e70c5d6fc900957a86c391ada7.png)

这在以前得多麻烦啊！

加上方舟 Coding Plan 的 tokens 不限量，让我们可以更加放心大胆地去试、去折腾。

我想，

【**工具的价值，不在于它有多强，而在于它能让多少人变强。**】

如果你还在观望 OpenClaw，不知道从哪里开始养一只龙虾，ArkClaw 是个不错的起点。

有问题评论区见。

