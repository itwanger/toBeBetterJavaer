---
title: 斩获14k+Star，把OpenClaw+Claude Code等多个Agent装进一个UI
shortTitle: AionUi测评
description: AionUi横空出世，免费开源的多Agent桌面应用，支持Claude Code、Gemini CLI、Codex等，GitHub斩获14.2k+星，一键打通AI办公自动化，
tag:
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-02-10
---

大家好，我是二哥呀。

这两天，GitHub 上有一个项目在疯狂刷屏。

AionUi。

![](https://cdn.paicoding.com/stutymore/aionui-review-20260210235734.png)

一个免费、开源、本地的多AI Agent桌面应用，短短一个月就在 GitHub 上斩获了 **14.2k+ Star**，多次登上 GitHub Trending 榜单。

说实话，第一眼看到这个项目的时候，我愣了一下。

![](https://cdn.paicoding.com/stutymore/aionui-review-20260211000007.png)

这不是就是 Cowork 的开源平替吗？

要知道，Anthropic 官方的 Cowork +Chat+Code每个月要 20 美刀，而且只支持 macOS 和 Claude 模型。

但 AionUi 完全免费，还支持 Gemini CLI、Claude Code、Codex、Qwen Code、Goose CLI、OpenClaw、Augment Code 等主流的命令行 AI 工具，更是横跨 macOS、Windows、Linux 三大平台。

要我说，这是要偷 Anthropic 的家啊。

![](https://cdn.paicoding.com/stutymore/aionui-review-20260211004651.png)

更狠的是，AionUi 还内置了 10+ 专业助手，从文件管理到 PPT 生成，从 PDF 转换到 UI 设计，几乎把 AI 办公+Code自动化这条路给走通了。

接下来，我就带大家实测一下这个杀疯了的开源项目。

## 01、一键安装，开箱即用

AionUi 的安装非常简单，直接去 GitHub Releases 下载最新版本就可以了。

支持 macOS 10.15+、Windows 10+、Linux Ubuntu 18.04+，内存推荐 4GB 以上。

> 下载地址：https://github.com/iOfficeAI/AionUi/releases

我本机是macOS，且安装了 Homebrew，所以我就直接用这行命令来安装：

```bash
brew install aionui
```

很快，就搞定了。

![](https://cdn.paicoding.com/stutymore/aionui-review-20260211000450.png)

安装完成后，第一次打开 AionUi，你会发现它已经内置了 Gemini CLI，官方称不需要任何额外配置就可以直接使用。

我没成功，可能是我多个Google账号之间登录的IP污染了，一直授权不成功。

![](https://cdn.paicoding.com/stutymore/aionui-review-20260211000543.png)

不过不用担心，我们还可以配置自己的 API Key。AionUi 支持绝大多数主流的 AI 模型：

- Gemini（Google 账号登录或 API Key）
- OpenAI（API Key）
- Claude（API Key）
- Qwen（通义千问）
- DeepSeek
- 本地模型（Ollama、LM Studio）
- 等等

我暂时只配置了OpenRouter路由的Claude Opus 4.6、Gemini 3 Pro-image和GLM-4.7。

![](https://cdn.paicoding.com/stutymore/aionui-review-20260211000728.png)

配置完成后，我们就可以开始体验了。

## 02、多 Agent 协同，统一管理

AionUi 最大的卖点，就是它的多 Agent 模式。

简单来说，你可以把 Gemini CLI、Claude Code、Codex、Qwen Code 这些命令行 AI 工具，全部整合到一个图形界面里，统一管理。

![](https://github.com/iOfficeAI/AionUi/raw/main/resources/multi-agent%E6%94%AF%E6%8C%81openclaw.gif)

这意味着什么？

意味着你不再需要在终端里敲命令，不再需要记忆复杂的 CLI 参数，不再需要在多个工具之间来回切换。

所有的一切，都在一个界面里完成。

而且，AionUi 还支持多会话并行。你可以同时开启多个对话，每个会话都有独立的上下文记忆，互不干扰。

![](https://cdn.paicoding.com/stutymore/aionui-review-20260211102457.png)

对于我这种经常需要同时处理多个任务的人来说，这个功能简直太实用了。

一边Vibe Coding，一边写教程，还能随时切换不同的 AI 模型，效率直接拉满。

## 03、WebUI 远程访问，随时随地

AionUi 另一个让我惊艳的功能，是它的 WebUI 远程访问。

简单来说，你可以在服务器上运行 AionUi，然后通过浏览器从任何设备访问——手机、平板、电脑，统统支持。

支持局域网、跨网络和服务器部署。可以通过扫描二维码或账号密码登录，操作简单方便。

![](https://cdn.paicoding.com/stutymore/aionui-review-20260211004802.png)

这意味着什么？

意味着你可以在公司电脑上配置好 AionUi，回家后用平板继续使用；或者把 AionUi 部署在服务器上，随时随地通过手机访问你的 AI 助手。

我试了一下局域网，从手机访问 AionUi 的 WebUI，首次有点慢，但后续的交互速度还不错，完全可以接受。

![](https://cdn.paicoding.com/stutymore/sucai-c49f2b39bd0be44e92bee4461ec53b7a.jpg)

只需要在设置这里，启用WebUI功能即可，然后微信扫码二维码就可以了。

![](https://cdn.paicoding.com/stutymore/aionui-review-20260211001628.png)

而且，AionUi 还支持 Telegram、飞书、Slack 等聊天平台的集成。你可以直接在这些平台上和 AI 助手对话，真正的 7×24 小时 AI 陪伴。

## 04、实时预览，9+ 格式支持

AionUi 内置了强大的预览面板，支持 9+ 种格式的实时预览：PDF、Word、Excel、PPT、代码、Markdown、图片、HTML、Diff 等。

![](https://cdn.paicoding.com/stutymore/aionui-review-20260211102847.png)

这意味着什么？

意味着当 AI 生成文件后，你可以立即查看预览，不需要切换到其他应用。而且预览面板支持实时跟踪文件变化，编辑器和预览会智能同步。

对于 Markdown、代码、HTML 等格式，还支持实时编辑，所见即所得。

这个功能在调试 AI 生成的代码时特别有用，改完立马看效果，效率直接翻倍。

## 05、定时任务，自动化工作流

AionUi 还支持定时任务功能。

设置好定时任务后，AI 助手会按照你设定的时间自动执行，真正实现 7×24 小时无人值守运行。

![](https://cdn.paicoding.com/stutymore/aionui-review-20260211004827.png)

使用场景包括：

- 定时数据汇总
- 定期报告生成
- 自动文件整理
- 定时提醒

你可以用自然语言告诉 AI 你想做什么，就像正常聊天一样。然后设置执行时间（每天、每周、每月都可以），AionUi 就会自动执行。

对于我这种经常忘记事情的人来说，这个功能太贴心了。

## 06、10+ 专业助手，开箱即用

AionUi 内置了 10+ 专业助手，每个助手都有预定义的能力。

![](https://cdn.paicoding.com/stutymore/aionui-review-20260211002012.png)

- **Cowork** - 自主任务执行（文件操作、文档处理、工作流规划）
- **PPTX Generator** - 生成 PPTX 演示文稿
- **PDF to PPT** - PDF 转 PPT
- **UI/UX Pro Max** - 专业 UI/UX 设计（57 种风格，95 种配色）
- **Planning with Files** - 基于文件的复杂任务规划
- **Social Job Publisher** - 职位发布和发布（HR的福音）
- **moltbook** - 零部署集成，自动心跳调度、活动报告、无缝 AI Agent 社交
- **Beautiful Mermaid** - 流程图、序列图等

比如说我们让 AionUi 生成一张PaiFlow项目的学习路线图。

![](https://cdn.paicoding.com/stutymore/aionui-review-20260211002400.png)

来看一下效果，个人觉得水平还是非常高的。

![](https://cdn.paicoding.com/stutymore/aionui-review-learn-paiflow.png)


## 07、ending

如果只用一句话来总结我的真实体验：

**AionUi 已经坐实了 AI 办公+编程自动化的最佳实践。**

从多 Agent 协同到 WebUI 远程访问，从智能文件管理到定时任务自动化，从 10+ 专业助手到 AI 绘图，AionUi 几乎覆盖了打工人的所有场景。

最重要的是，它完全免费、开源。

![](https://cdn.paicoding.com/stutymore/aionui-review-20260211003343.png)

GitHub：https://github.com/iOfficeAI/AionUi

目前已经斩获 **14.2k+ Star**，而且还在快速增长中。

「工具的价值，是让我们专注于创造，而不是重复劳动。」

如果你也在用 Claude Code、Gemini CLI 这些命令行 AI 工具，或者你正在寻找一款强大的 AI 办公自动化平台，AionUi 绝对值得一试。

我们下期见～


资源推荐：
- 顺嘴，好背👍：面渣逆袭 2.0 版
- 6大实战项目👌：派派工作流Agent、派聪明RAG、社区技术派、微服务PmHub等
