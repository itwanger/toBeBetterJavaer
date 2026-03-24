---
title: 一行命令把Claude Code装进微信，比OpenClaw更自由
shortTitle: WeClaw微信接入Claude Code
description: WeClaw开源项目让微信ClawBot接入任意AI Agent，支持Claude Code、Codex、Gemini等，一键安装，子命令切换，比OpenClaw更灵活。
tag:
  - WeClaw
  - Claude Code
  - 微信
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-03-23
---

大家好，我是二哥呀。

前两篇教程教大家怎么用 OpenClaw 把龙虾接入微信，有小伙伴问我：能不能接 Claude Code？

答案是能！

而且不需要等官方支持，有个开源项目叫 WeClaw，已经帮你把这事办成了。一行命令安装，扫码登录，你的 Claude Code 就能在微信里直接使用了。

![](https://cdn.paicoding.com/paicoding/860c3c38928d077b79533df26cb4d03f.jpg)

这个项目刚在 GitHub 上开源不久，已经拿到了 300 多个 Star。项目基于 Go 语言开发，MIT 协议完全开源。

它的作用很简单：让微信 ClawBot 接入任意 AI Agent。

Claude Code、Codex、Gemini、Cursor、Kimi、OpenCode，想接谁接谁。甚至你自己开发的 Agent，只要支持标准 HTTP 协议，也能接进去。

讲真，看到这个项目的时候我是有点兴奋的。除了龙虾，Claude Code 也是我日常最喜欢用的 AI Agent。

## 01、WeClaw 是什么

WeClaw 是一个桥接工具，连接微信 ClawBot 和本地 AI Agent。

![](https://cdn.paicoding.com/paicoding/805ab3282a8e87d07395a97c852e1513.png)

WeClaw 作为一个中转层，让微信消息可以转发给任何支持 ACP、CLI 或 HTTP 协议的 Agent。

这里解释一下三种集成方式的区别：

- **ACP 协议**：Agent Communication Protocol，支持工具调用、状态同步等高级功能
- **CLI 模式**：直接调用本地命令行工具，比如 `claude` 命令，最简单直接
- **HTTP 模式**：通过 HTTP API 连接远程 Agent 服务，适合自研 Agent 或企业内部服务

对于大多数用户来说，CLI 模式最实用。只要你的 Agent 能在终端运行，WeClaw 就能把它接到微信里。

## 02、安装 WeClaw

安装前确保你的电脑满足以下条件：

- 已安装微信 ClawBot（也就是微信官方接入 OpenClaw 的那个插件）
- 已安装 Node.js 18+ 环境
- 电脑上已经配置了你想用的 Agent（比如 Claude Code）

如果前面的 OpenClaw 教程你已经跟着做过，那环境肯定是没问题的。ClawBot 已经装好了，Node.js 也有了，直接开始装 WeClaw 就行。

在终端执行安装命令：

```bash
curl -fsSL https://raw.githubusercontent.com/fastclaw-ai/weclaw/main/install.sh | bash
```

![](https://cdn.paicoding.com/paicoding/97e2958024f4f8657385ef67387b3f84.png)

这个脚本会自动检测你的系统架构，下载对应版本的 WeClaw 二进制文件，放到 `/usr/local/bin` 目录下。安装完成后，输入 `weclaw --version` 能看到版本号就说明装好了。

安装完成后，运行：

```bash
weclaw start
```

这时候会弹出微信扫码界面，用微信扫一下完成登录。

![](https://cdn.paicoding.com/paicoding/86d128a2b051563e163ee04204247fac.png)

扫码成功后，WeClaw 会显示登录成功信息，并自动发现你本地已安装的 Agent。

## 03、连接 Claude Code

默认连接的是 Claude Code。配置方式是在 `~/.weclaw/config.json` 里添加：

```json
{
  "agents": {
    "claude": {
      "type": "cli",
      "command": "claude",
      "default": true
    }
  }
}
```

![](https://cdn.paicoding.com/paicoding/fac81340a685078dcfcdfd864692f67d.png)

各个参数的意义我也帮大家整理好了。

![](https://cdn.paicoding.com/paicoding/9ffd2f1c5700da74e9d62039fbaa27f8.png)

这个配置的意思是：定义一个名为 “claude” 的 Agent，类型是 CLI，执行的命令是 `claude`，并且设置为默认 Agent。

现在打开微信，给 ClawBot 发消息，内容就会转发给 Claude Code 处理。

![](https://cdn.paicoding.com/paicoding/64d06f7b50be43f37ce08abee7e16af7.jpg)

Claude Code 的回复会原样返回到微信聊天窗口。你可以在微信里直接和 Claude Code 对话，让它帮你写代码、修 bug、读源码。

我测试了一个具体场景：让 Claude Code 帮我看一下 document 目录下都有哪些文件，很快就找到了，并一一给我列举出来。

![](https://cdn.paicoding.com/paicoding/cd31a70e70d4cf8b279794b7adc5ef61.jpg)

这种体验很神奇。你不需要开电脑上的 Claude Code 窗口，不需要切换应用，就在微信里完成所有交互。

## 04、多 Agent 切换

WeClaw 最爽的功能，是可以随时切换不同的 Agent。

比如你现在想让 Gemini 来回答，直接在微信里发：

```
/gm
```

想切回 Claude Code：

```
/cc
```

目前支持的子命令包括：

- `/cc` - 切换到 Claude Code
- `/cd` - 切换到 Codex
- `/gm` - 切换到 Gemini
- `/cs` - 切换到 Cursor
- `/km` - 切换到 Kimi
- `/oc` - 切换到 OpenCode

这个设计非常实用。不同的 Agent 擅长不同的任务，你可以根据当前需求随时切换，不需要重新配置，不需要重启服务。

比如有人问技术问题，切到 Claude Code；需要分析一篇长文，切到 Kimi；想快速写个脚本，切到 Codex。一个微信窗口，多个大脑随时待命。

![](https://cdn.paicoding.com/paicoding/49870c6d654f28a22b52c67c11966b1d.png)

我还发现了一个隐藏技巧：你可以同时配置多个 Claude Code 实例，分别使用不同的模型。比如一个用 Claude Sonnet 处理复杂任务，一个用 Claude Haiku 处理简单问答。通过 `/cc1`、`/cc2` 这样的命令切换，实现更精细的控制。

## 05、实际使用体验

我测试了 1 个小时，说几个真实感受。

**响应速度**

WeClaw 本身只是一个桥接层，响应速度主要取决于你连接的 Agent。Claude Code 的回复通常在几秒钟内返回，和直接在终端使用差不多。

基本命令：

```
weclaw start：默认后台启动服务
weclaw status：查看服务运行状态
weclaw stop：停止服务
weclaw restart：重启服务
weclaw start -f：前台运行（调试时用，能看到实时日志）
```

**稳定性**

作为刚开源的项目，WeClaw 的稳定性还不错。我连续用了几个小时，没有出现断连或者消息丢失的情况。

部分 Agent 默认需要交互式权限确认，在微信场景下无法操作会导致卡住。可通过 args 配置跳过安全检查。

![](https://cdn.paicoding.com/paicoding/a65e6cd082ab6e749dadfe2a1481ee51.png)

```
{
  "claude": {
    "type": "cli",
    "command": "/usr/local/bin/claude",
    "args": ["--dangerously-skip-permissions"]
  },
  "codex": {
    "type": "cli",
    "command": "/usr/local/bin/codex",
    "args": ["--skip-git-repo-check"]
  }
}
```

有一个细节需要注意：WeClaw 依赖微信 ClawBot 的连接状态。如果微信掉线或者 ClawBot 出现异常，WeClaw 也会受到影响。这时候需要重新执行 `weclaw start` 扫码登录。

**使用场景**

WeClaw 最适合的场景是：你已经习惯用某个 Agent（比如 Claude Code），但想把它接到微信里随时用。

比如我在外面吃饭，突然想到一个代码问题，掏出手机发条指令给 ClawBot，Claude Code 就在后台帮我处理了。不需要开电脑，不需要开浏览器，微信里直接搞定。

还有一个我自己常用的场景：睡前躺床上刷技术文章，看到不懂的概念，直接转发给 ClawBot，让 Claude Code 帮我解释。不用起身开电脑，不用切换应用，就在微信里完成所有操作。

这些场景的共同点是：你需要 AI 的能力，但不想被打断当前的工作流。WeClaw 的价值就在于，它把 AI 塞进了你最常用的应用里。

**局限性**

WeClaw 需要你本地电脑保持开机和联网，因为 Agent 是在你的电脑上运行的。如果电脑关机，微信就收不到回复了。这和 OpenClaw 是一样的，都是本地运行的架构。

## 06、进阶玩法

接入成功只是开始，WeClaw 还有一些进阶玩法可以尝试。

### 自定义 Agent

如果你有自己的 Agent 服务，可以通过 HTTP 协议接入 WeClaw。配置方式是在 `config.json` 里添加：

```json
{
  "agents": {
    "mybot": {
      "type": "http",
      "endpoint": "http://localhost:8080/api/chat",
      "headers": {
        "Authorization": "Bearer your-token"
      }
    }
  }
}
```

这样你就可以把自研的 Agent 或者公司内部的 AI 服务接到微信里。

### 主动推送消息

WeClaw 支持无需等待用户发消息，主动向微信用户推送消息。这个功能非常实用，可以用于告警通知、定时提醒、订阅推送等场景。

命令行方式：

```
# 发送纯文本
weclaw send --to "xx@im.wechat" --text "你好，来自 weclaw"

# 发送图片
weclaw send --to "xx.wechat" --media "https://cdn.paicoding.com/paicoding/ea15e607c84a915b4bd268c24cc0e1ff.png"

# 发送文本 + 图片
weclaw send --to "xx@im.wechat" --text "看看面渣逆袭吧你" --media "https://cdn.paicoding.com/paicoding/d072ca217fedc33c0b70085761ea7f40.png"
```

![](https://cdn.paicoding.com/paicoding/e82c4214a0206396bb48b156e6a05ed0.jpg)

至于用户 ID 怎么找，可以通过日志查看 `tail -f ~/.weclaw/weclaw.log`。

![](https://cdn.paicoding.com/paicoding/d3f832537cecc585ac729c089c366b0c.png)

WeClaw 还提供了 HTTP API，可以在程序中调用。服务启动后默认监听 `127.0.0.1:18011`：

```bash
curl -X POST http://127.0.0.1:18011/api/send \
  -H "Content-Type: application/json" \
  -d '{"to": "user_id@im.wechat", "text": "你好，来自 weclaw"}'
```

这个 API 可以集成到你的自动化脚本里。比如 CI/CD 构建失败时自动推送通知，定时任务完成时推送结果，监控告警时推送预警信息。

### 使用心得

WeClaw 能自动处理 AI 回复里的图片和媒体文件，让它们直接在微信里显示，而不是只给链接。

它会：1. 提取图片链接并下载；2. 加密上传到微信 CDN；3. 直接发图片消息。同时，Markdown 会转为纯文本，去掉代码块围栏、链接 URL 和格式标记。

## 07、常见问题排查

接入过程中可能会遇到一些问题，这里整理了几个最常见的。

**扫码后登录失败**

检查网络连接是否正常，确认微信能够访问互联网，然后重新运行 `weclaw login`。

**Agent 不回复，日志显示 "agent not available"**

检查配置文件 `~/.weclaw/config.json` 中 Agent 路径是否正确，确认 Agent 已经正确安装在你的系统上，检查 Agent 二进制是否有可执行权限。

**Claude CLI 卡住不回复**

Claude CLI 默认需要交互式权限确认，需要在配置中添加 `--dangerously-skip-permissions` 参数。前面已经讲过配置方式，这里不再重复。

**Codex 在非 git 目录报错**

Codex 默认要求在 git 仓库内运行，需要添加 `--skip-git-repo-check` 参数。

这些问题的本质都是 Agent 本身的限制，WeClaw 只是转发消息，不会改变 Agent 的行为。理解了这一点，遇到问题先检查 Agent 配置就对了。

## 08、源码解读

如果你对技术实现感兴趣，可以看看 WeClaw 的源码结构。

项目基于 Go 语言开发，整体结构非常清晰：

```
weclaw/
├── main.go           # 入口文件，调用 cmd.Execute()
├── cmd/              # 命令行处理
│   ├── start.go      # 启动服务
│   ├── login.go      # 登录微信
│   ├── send.go       # 发送消息
│   ├── status.go     # 查看状态
│   └── ...
├── agent/            # Agent 适配层
│   ├── agent.go      # Agent 接口定义
│   ├── acp_agent.go  # ACP 协议实现
│   ├── cli_agent.go  # CLI 模式实现
│   └── http_agent.go # HTTP 模式实现
├── messaging/        # 消息处理
│   ├── handler.go    # 消息路由
│   ├── sender.go     # 消息发送
│   ├── markdown.go   # Markdown 转换
│   ├── media.go      # 媒体文件处理
│   └── cdn.go        # 微信 CDN 上传
├── config/           # 配置管理
├── api/              # HTTP API
└── service/          # 系统服务配置
```

**入口和命令处理**

`main.go` 只有 7 行代码，入口非常简洁。真正的逻辑在 `cmd/` 目录下。`start.go` 是最核心的文件，负责启动服务、初始化连接、监听消息。

`cmd/` 目录采用了 Cobra 框架，这是 Go 语言最流行的命令行框架。每个子命令一个文件，结构清晰。如果你想学习 Go CLI 开发，这里就是很好的范例。

**Agent 适配层**

`agent/` 目录是整个项目的精华所在。它定义了一个 Agent 接口，然后为三种协议分别实现了适配器。

`acp_agent.go` 最复杂，需要维护一个长驻的子进程，通过 stdio 进行 JSON-RPC 通信。好处是进程复用，响应速度快，上下文可以保持。

`cli_agent.go` 最简单，每条消息启动一个新进程，用完就销毁。好处是实现简单，坏处是每次都要冷启动，速度稍慢。

`http_agent.go` 则是标准的 HTTP 客户端实现，调用远程 API。适合 Agent 部署在其他服务器上的场景。

这种设计模式叫策略模式。同一个接口，不同的实现，调用方完全不用关心底层细节。如果你想学习 Go 语言的设计模式，这个项目是很好的参考。

**消息处理流程**

核心流程是这样的：微信消息 → messaging/handler.go 解析路由 → agent/ 调用对应 Agent → 返回结果 → messaging/ 转换格式 → 发回微信。


![](https://cdn.paicoding.com/paicoding/71578953149e7d0cf414c993d8b0a390.png)


`handler.go` 负责消息路由，判断是发给哪个 Agent、是否是命令、如何处理子命令。

`sender.go` 负责消息发送，把处理好的内容发回微信。

`markdown.go` 负责 Markdown 转纯文本。Agent 返回的通常是 Markdown 格式，但微信不直接支持。这个模块会把代码块去掉围栏、链接只保留文字、加粗斜体标记去除等。

**媒体处理**

媒体处理这块挺有意思。微信要求图片必须上传到自己的 CDN，而且要 AES-128-ECB 加密。WeClaw 在 `messaging/cdn.go` 里实现了这套逻辑，自动把 Agent 返回的图片链接下载、加密、上传、发送。

`media.go` 负责从 Agent 回复中提取图片链接，下载文件，判断文件类型。

这套流程完全是自动化的，用户无感知。Agent 只需要返回标准的 Markdown 图片语法，WeClaw 会自动处理剩下的事情。

如果你想深入学习 Go 语言项目架构，或者想自己实现一个类似的桥接工具，这个项目是很好的参考。代码量不大，结构清晰，涵盖了 CLI 开发、进程通信、HTTP 客户端、加密算法等多个知识点。

## 09、简历撰写

如果你把 WeClaw 用到了实际项目中，可以考虑这样写到简历上。

**项目名称：微信 AI Agent 桥接平台**

**项目简介：** 基于 Go 语言开发的微信消息桥接工具，实现微信与多个 AI Agent（Claude Code、Codex、Gemini 等）的实时通信，支持 ACP/CLI/HTTP 三种接入模式。

**技术栈：** Go、JSON-RPC、微信 ClawBot 协议、AES-128-ECB 加密、Docker

**核心职责：**

- 设计并实现 Agent 抽象层，支持多种 AI Agent 的统一接入，通过策略模式实现 ACP/CLI/HTTP 三种通信协议的无缝切换
- 实现微信消息路由系统，支持子命令切换 Agent、权限控制、消息格式转换等功能，日均处理消息 1000+ 条
- 设计媒体文件处理流程，自动提取 Agent 回复中的图片链接，实现 AES-128-ECB 加密上传至微信 CDN，支持图片/视频/文件等多媒体类型
- 提供主动推送 API，支持通过命令行和 HTTP 接口向微信用户推送消息，可用于告警通知、定时提醒等场景
- 编写 Dockerfile 和 systemd 服务配置，实现一键部署和开机自启，降低运维成本

这样写的好处是：既展示了技术能力（Go、协议设计、加密、Docker），又展示了工程能力（架构设计、运维部署），还量化了成果（日均处理 1000+ 条消息）。

## ending

对于我这种既想用 Claude Code，又想随时随地微信操控的用户，WeClaw 提供了一个完美的解决方案。

【**AI 工具的真正价值，不是它有多强大，而是它能不能融入你已有的工作流。微信就是那个最自然的入口，而 WeClaw 帮你把所有 Agent 都接了进去。**】

开源社区的力量就在于这里。官方不做的功能，社区来做。官方不支持的工具，社区来支持。WeClaw 就是这样一个典型的社区创新项目。

如果你也是 Claude Code 的重度用户，或者想在一个窗口里使唤多个 Agent，可以试试 WeClaw。

最后提醒一下：WeClaw 还在快速迭代中，遇到问题可以去 GitHub 提 issue，作者响应很快。也欢迎给项目点个 Star，支持开源社区的发展。

有问题评论区见，我们下期见！

