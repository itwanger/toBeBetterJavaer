---
title: 网易龙虾开源，实测看看国产Agent距离OpenClaw还有多远。
shortTitle: 国产小龙虾开源！网易有道开源 LobsterAI
description: 实测网易有道 LobsterAI：从纯聊天到真正干活，这个本地 Agent 能自动刷 HackerNews、处理邮件，7x24 小时待命。测评 HackerNews 自动摘要、邮件自动回复等真实场景，看看国产 Agent 距离 OpenClaw 还有多远。
tag:
  - Agent
  - 国产大模型
  - AI工具
category:
  - AI
author: 沉默王二
date: 2026-02-21
---

大家好，我是二哥呀。

OpenClaw 出现之前，我身边的同事清一色地认为本地 Agent 只是个噱头。

然而 OpenClaw 的爆火彻底改变了这种认知，大家都在本地用起来了，并且生产效率提升了不是一星半点。

最近，网易也开源了他们家的龙虾 LobsterAI，我只能说这家老牌互联网公司终于在 AI 时代有所作为了。

![](https://cdn.paicoding.com/paicoding/2ec9c04d380008fc1d4a5a9bed18bac9.jpg)

如果你正在找一个能 7x24 小时帮你处理邮件、抓取信息、生成报告的工具，这篇实测会帮你少踩很多坑。

![](https://cdn.paicoding.com/paicoding/17215b0063c95340a892a72abb14ca88.jpg)

LobsterAI 内置了 16 个 Skill，同时支持飞书、钉钉、Telegram、Discord 四大 IM 平台远程控制。并且内置 Memory 长记忆，会记住你的偏好，跨 Session 也可以自动复用。

主打一个全场景办公助理。

![](https://cdn.paicoding.com/paicoding/6d7411c7848af86e380d99ec88a41967.jpg)

> GitHub 地址：https://github.com/netease-youdao/LobsterAI

## 01、LobsterAI 的优势

不了解 OpenClaw 的小伙伴可能会问，ChatGPT、Claude、Kimi、豆包都能用自然语言聊天，为什么还要在本地跑一个 Agent？

答案藏在一个词里：**脏活**。

云端 Agent 可以给你建议、写代码、分析问题，但它永远干不了那些需要访问本地文件、操作终端、调用本地软件的活。

每天早上自动去 HackerNews 抓热门文章生成摘要发钉钉？云端 Agent 做不了，因为它没权限访问你的钉钉机器人。

定时检查 163 邮箱，有人发简历但忘记带星球编号就自动回复？云端 Agent 做不了，它连你的邮箱都登录不了。

监控 GitHub 仓库有新 issue 就自动回复？云端 Agent 做不了，GitHub API 调用需要本地环境。

这些事情看起来不难，但它们才是真正吃时间的地方。手动做一次没啥，但如果**每天重复做、7x24 小时盯着做**就很烦。

![](https://cdn.paicoding.com/paicoding/ce1a14e41bc8d4344523f241344c5a1b.jpg)

LobsterAI 就是来干这个脏活累活的。

## 02、LobsterAI 的架构

LobsterAI 基于 **Electron + React + TypeScript** 构建，采用严格的进程隔离架构。主进程负责文件系统和终端操作，渲染进程负责 UI 展示和用户交互，两者通过 IPC 通信互不干扰。

![](https://cdn.paicoding.com/paicoding/546c7dd9021209b60e1add5671240745.jpg)

数据存储用的是本地的 SQLite，所有对话记录、任务历史、用户偏好都存在本地。这个设计保证了：**你的数据不会被上传到云端**。

状态管理用的 Redux Toolkit，UI 用的 TailwindCSS，构建工具是 Vite。技术栈选的都是当下最主流的方案。

```
src/
├── main/                           # Electron 主进程
│   ├── main.ts                     # 入口，IPC 处理
│   ├── preload.ts                  # 安全桥接
│   ├── sqliteStore.ts              # SQLite 存储
│   ├── coworkStore.ts              # 会话/消息 CRUD
│   ├── skillManager.ts             # 技能管理
│   ├── im/                         # IM 网关（钉钉/飞书/Telegram/Discord）
│   └── libs/
│       ├── coworkRunner.ts         # Agent SDK 执行器
│       ├── coworkVmRunner.ts       # 沙箱 VM 执行
│       ├── coworkSandboxRuntime.ts # 沙箱生命周期
│       └── coworkMemoryExtractor.ts # 记忆提取
│
├── renderer/                        # React 前端
│   ├── App.tsx                     # 根组件
│   ├── types/                      # TypeScript 类型定义
│   ├── store/slices/               # Redux 状态切片
│   ├── services/                   # 业务逻辑层（API/IPC/i18n）
│   └── components/
│       ├── cowork/                 # Cowork UI 组件
│       ├── artifacts/              # Artifact 渲染器
│       ├── skills/                 # 技能管理 UI
│       ├── im/                     # IM 集成 UI
│       └── Settings.tsx            # 设置面板
│
SKILLs/                              # 技能定义目录
├── skills.config.json              # 技能启停与排序配置
├── web-search/                     # Web 搜索
├── docx/                           # Word 文档生成
├── xlsx/                           # Excel 表格
├── pptx/                           # PowerPoint 演示
├── pdf/                            # PDF 处理
├── remotion/                       # 视频生成
├── playwright/                     # Web 自动化
└── ...                             # 更多技能
```

## 03、如何使用 LobsterAI

LobsterAI 支持 macOS(Intel + Apple Silicon)和 Windows 双版本，Linux 版本据说也在规划中。

下载后直接安装即可（我是 Apple 芯片）。

![](https://cdn.paicoding.com/paicoding/ca2acd5bc22092b5211749e9d8feeb0a.png)

> 官网地址：https://lobsterai.youdao.com

安装完之后需要配置 LLM 的 API Key。LobsterAI 支持所有兼容 OpenAI API 格式的模型，包括 GPT 系列、智谱 GLM 系列、DeepSeek 系列、通义千问系列、Kimi 系列等。

![](https://cdn.paicoding.com/paicoding/4b11de42cd5e74f06b6519ad646816b4.png)

配置完 API Key 之后就可以开始和 LobsterAI 对话了。不过我上来就测到了一个 bug，如果余额不足，竟然没有任何提示，也不断开。

![](https://cdn.paicoding.com/paicoding/2e6dd301dab8bc3a550b45f2d6a01cdd.png)

如果你用的是 GLM-5 的 plan 套餐，注意这里的 base URL 为`https://open.bigmodel.cn/api/coding/paas/v4/chat/completions`。

![](https://cdn.paicoding.com/paicoding/893bddcab783e73372f5530a4e472146.png)

点击【测试连接】可以看看你填写的是否正确。

然后回到对话窗口，就可以看到 LobsterAI 可以工作了。

![](https://cdn.paicoding.com/paicoding/bd408ef0064a04f56722cdbbb5163803.png)

## 03、自动刷 HackerNews

好，直接来实测。

这次的场景是：每天早上自动去 HackerNews 抓热门文章，生成摘要发到钉钉。

这是个典型的【定时任务 + 数据抓取 + IM 通知】组合场景。传统开发需要写爬虫脚本、摘要生成逻辑、钉钉机器人推送、配置 cron 定时任务，再部署到服务器保证稳定运行。整个流程下来没个半天搞不定。

在 LobsterAI 里，我们只需要一句话:

> 每天早上九点去 HackerNews 抓取热门文章，选出最有趣的十篇生成摘要，发到我的钉钉。

![](https://cdn.paicoding.com/paicoding/dca7a3d7876e8892af3d7339c6303405.png)

当然了，我们需要先配置【钉钉】的 client id 和 secret 并启用。

![](https://cdn.paicoding.com/paicoding/7e200c40ae1b74d04865cfac37396b44.png)

可以点击【测试】查看钉钉是否处于连接的状态。

![](https://cdn.paicoding.com/paicoding/e82d1f03b45a283ae5c7706366e2b858.png)

如果不确定机器人是否可以工作，可以在对话框中输入信息，然后再次检测。

![](https://cdn.paicoding.com/paicoding/28d052b77a8528a34d205cd95d156aa7.png)

![](https://cdn.paicoding.com/paicoding/f2c39c7f21b450cdb1b93afaa458fa2b.png)

LobsterAI 的思考过程是这样的。

> 用户想要创建一个定时任务：
>
> 1.  每天早上九点执行
> 2.  去 HackerNews 抓取热门文章
> 3.  选出最有趣的十篇生成摘要
> 4.  发送到钉钉
>
> 这是一个定时任务场景，我应该使用 scheduled-task 技能来完成。让我先读取该技能的 SKILL.md 文件。

然后帮我们创建一个 Skill，来完成这次任务。

![](https://cdn.paicoding.com/paicoding/0e16266178d8e5654bf4cc164db2fc6f.png)

包括：

> 1.  创建任务配置 JSON
> 2.  使用脚本创建任务
> 3.  设置 notifyPlatforms 为 ["dingtalk"]
>
> 让我先创建任务配置文件，然后执行创建脚本。
>
> 关键点：
>
> - prompt 需要写清楚执行时的具体指令
> - schedule 使用 cron 表达式 `0 9 * * *`
> - notifyPlatforms 设置为 ["dingtalk"]

当然了，也可以在定时任务中完成这项任务。

![](https://cdn.paicoding.com/paicoding/491777f0e0f745b44f0a645c3c7f58df.png)

和之前的方式是完全一致的，提示词不用再指定9点，直接告诉它目标任务是什么就可以。

![](https://cdn.paicoding.com/paicoding/3e23a51c1f13386c75b56930a94647f5.png)

在更多选项里点击【编辑】可以修改任务。

![](https://cdn.paicoding.com/paicoding/c4a8b1d645025ba81f9bd60cb17aa3d9.png)

点击【立即运行】就可以看到结果。

![](https://cdn.paicoding.com/paicoding/c4a7f066e83b3442a26f43447744222f.png)

![](https://cdn.paicoding.com/paicoding/8fb895ed864cbd42d95e0ed199315496.jpg)

![](https://cdn.paicoding.com/paicoding/0df2cd026b6c62bc06054219d9894042.png)

钉钉里也收到通知了。

![](https://cdn.paicoding.com/paicoding/b69d02b2f53dc9f9e65452b86d0ef8a1.png)

但和我预期的把 10 篇摘要同步到钉钉并不符合，我们需要解决这个问题。

在钉钉的群聊中添加自定义机器人，并复制 webhook 到 LobsterAI 中。

![](https://cdn.paicoding.com/paicoding/b8bc0ab9d4386e9528ce44e3db48db03.png)

![](https://cdn.paicoding.com/paicoding/2ea2a52b79d5a8c67f2b73552586efce.png)

然后我们来看一下，这次群里已经收到信息了。

![](https://cdn.paicoding.com/paicoding/ac29687f3917811fd7c3d57678fb1ded.png)

如果对某个主题感兴趣的话，点击【查看原文】还可以看到对应的内容，非常方便。

![](https://cdn.paicoding.com/paicoding/535d70882e02f3f055352a169064db9b.jpg)

如果你的工作群里也需要这样一个机器人，就完全可以按照这个流程来，只不过机器人负责的内容不同而已。

## 04、长记忆能力

传统的 AI 对话工具，比如 ChatGPT，记忆是会话级的。你关闭对话窗口再打开，它就不记得你之前说过什么了。

LobsterAI 的记忆是全局级的。它把所有对话、所有任务、所有偏好都存在本地数据库里，跨 session 自动复用。

我第一次告诉它我的钉钉 Webhook 是 xxx，之后所有涉及钉钉推送的任务都不需要再重复配置。

刚好之前我们创建了两个定时任务，这次运行另外一个定时任务再来看看结果。

![](https://cdn.paicoding.com/paicoding/d747ab71d27882ef510064cc0f35c156.png)

![](https://cdn.paicoding.com/paicoding/9f90aa9f5a91479ef926622ef7d2362a.jpg)

![](https://cdn.paicoding.com/paicoding/b7512d8c136fda37c69a31e2df0e6394.jpg)

OK，听到钉钉【叮叮】的声音了，去看一下，果然 OK。

![](https://cdn.paicoding.com/paicoding/aaf327407ed0810ecb91909ddfc9f173.png)

这种长记忆能力会让 LobsterAI 越用越聪明。你不需要每次都从零开始教它，它会主动学习你的习惯。

## 05、ending

LobsterAI 的出现让我看到了国产 Agent 的另一种可能。

**【AI 不应该只是一个聊天工具，它应该是一个 7x24 小时待命的同事。】**

它可以在你睡觉的时候帮你监控服务器。

它可以在你开会的时候帮你整理文档。

它可以在你通勤的时候帮你生成报表。

你只需要告诉它要做什么，剩下的事情它会自己搞定。

这才是 Agent 该有的样子。

如果你也在做 AI 应用开发，如果你也想让 AI 真正干活而不是只会聊天，那 LobsterAI 值得你花时间试一试。

还没有体验的同学可以尝试一把。

我们下期见!

