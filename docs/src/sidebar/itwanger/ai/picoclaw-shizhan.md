---
title: 一周狂揽 8000+ Star！Go 版 OpenClaw 开源平替来了，我花半小时部署完直呼太香
shortTitle: PicoClaw实战
description: PicoClaw 是一个用 Go 语言编写的超轻量级 AI 助手，内存占用不到 10MB，可以运行在 10 美元的 RISC-V 开发板上。本文从 AI 实战项目角度，带你部署运行 PicoClaw，并教你如何把这个项目写到简历上。
tag:
  - AI
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-02-14
---

大家好，我是二哥呀。

昨天刷 GitHub 的时候，被一个项目惊艳到了。

一周狂揽 8000+ Star，OpenClaw的又一个开源平替，仅用五分钟我就在本地跑起来了。

![](https://cdn.paicoding.com/stutymore/picoclaw-shizhan-20260215125713.png)

>GitHub仓库：https://github.com/sipeed/picoclaw

我原本以为这种复刻的项目只是阉割版 demo，结果接入GLM-5实测一天后发现，它能干的事情和OpenClaw不相上下。

大龙虾能接入 Telegram 它也能，大龙虾能接入 Discord 它也能、大龙虾能接入 QQ、钉钉、飞书，它也能。

如果你正在做 AI Agent 相关的项目，或者想给简历加点 AI 实战经验，这个项目绝对值得你花 30 分钟跑一遍。

我已经准备了丰富的简历写法和面试题，跑完项目后直接照着抄和背就可以了。

>点赞收藏，我们发车。😄

## 01、PicoClaw 是什么

PicoClaw 是矽速科技（Sipeed）开源的超轻量级个人 AI 助手，用 Go 语言从零重构，定位是 OpenClaw 的平替版。

OpenClaw 很强，但它需要 1GB 以上内存，启动要 500 多秒，跑起来得用 Mac mini 这种 599 美元的设备。

![](https://cdn.paicoding.com/stutymore/picoclaw-shizhan-20260215131326.png)

而 PicoClaw 呢？内存占用不到 10MB，启动 1 秒内完成，9.9 美元的 RISC-V 开发板就能带动。

|  | OpenClaw | NanoBot | PicoClaw |
| --- | --- | --- | --- |
| 语言 | TypeScript | Python | Go |
| 内存占用 | >1GB | >100MB | <10MB |
| 启动时间 | >500秒 | >30秒 | <1秒 |
| 硬件成本 | Mac Mini $599 | ~$50 | $10 |

这个项目最有意思的地方在于它的诞生方式。官方说法是AI 自举，也就是用 AI Agent 自己来驱动整个架构迁移和代码优化，人类只负责监督和微调。最终产出了大约 4000 行 Go 代码，其中 95% 由 AI 生成。

从技术栈来看，PicoClaw 依赖外部大模型提供推理能力，本地只做消息路由和记忆管理。

支持智谱 GLM-5、OpenRouter、Anthropic、OpenAI、DeepSeek 等多个 LLM 提供商，可以通过 Brave Search API 实现网络搜索，还能用 Groq Whisper 做语音转录。

这种架构设计非常聪明。把计算密集型的推理任务外包给云端，本地只保留轻量的协调逻辑，所以才能做到 10MB 内存跑起来。

## 02、动手跑起来

说再多不如动手试试。PicoClaw 的安装方式有多种，我这里选择的是Docker，环境依赖最少，适合快速上手。

![](https://cdn.paicoding.com/stutymore/picoclaw-shizhan-20260215130957.png)

先用GitHub桌面版把仓库拉到本地。

![](https://cdn.paicoding.com/stutymore/picoclaw-shizhan-20260215130910.png)

接下来是关键的配置环节。打开 `~/.picoclaw/config.json`，配置你的 LLM 提供商。

![](https://cdn.paicoding.com/stutymore/picoclaw-shizhan-20260215131045.png)

我这里用智谱的 GLM-5：

```json
{
  "agents": {
    "defaults": {
      "workspace": "~/.picoclaw/workspace",
      "model": "glm-5",
      "max_tokens": 8192,
      "temperature": 0.7,
      "max_tool_iterations": 20
    }
  },
  "providers": {
    "zhipu": {
      "api_key": "你的智谱API Key",
      "api_base": "https://open.bigmodel.cn/api/paas/v4"
    }
  }
}
```

智谱 Plan 套餐的 API 前缀是 `https://open.bigmodel.cn/api/coding/paas/v4`。注意不要填错。

![](https://cdn.paicoding.com/stutymore/picoclaw-shizhan-20260215131423.png)

配置完成后，就可以直接使用Docker拉取镜像了：

```bash
docker compose --profile gateway up -d
```

![](https://cdn.paicoding.com/stutymore/picoclaw-shizhan-20260215131623.png)

想要交互式聊天的话，直接运行：

```bash
docker compose run --rm picoclaw-agent
```

![](https://cdn.paicoding.com/stutymore/picoclaw-shizhan-20260215131746.png)

就会进入一个类似 REPL 的交互环境，可以连续对话。

我输入的提示词是：今天是马年春节第一天，还有多少小伙伴在卷啊？

![](https://cdn.paicoding.com/stutymore/picoclaw-shizhan-20260215132037.png)

回复的速度还是挺快的，我贴出来顺带给大家拜个年。

哈哈，新年好啊！🐴🧧

确实，春节期间还在卷的小伙伴们都是真爱！不过话说回来：

- 技术人的卷——可能是赶项目、准备年后面试，或者纯粹热爱钻研
- 也有些岗位（运维、客服、游戏等）需要坚守

但大年初一还是建议：
- 吃顿好饭
- 放松一下
- 给家人朋友拜年
- 好好休息

新年快乐，祝这一年代码顺心，offer 拿到手软！你今天是在休息，还是在悄悄卷呢？

## 03、接入Te实现随时对话

命令行聊天只是基础功能。PicoClaw 真正强大的地方在于它能接入各种聊天平台，变成一个 24 小时在线的私人助手。

我这里演示接入 Te，因为配置最简单。

**第一步：创建 Te**

打开 Te，搜索 `@BotFather`，发送 `/newbot`，按照提示给你的机器人起个名字。完成后会得到一个 Bot Token。

**第二步：配置 PicoClaw**

在 `~/.picoclaw/config.json` 中添加 Telegram 配置：

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "token": "你的Bot Token",
      "allowFrom": ["你的用户ID"]
    }
  }
}
```

`allowFrom` 是白名单机制，只有名单里的用户才能和机器人对话，防止被人滥用。

**第四步：启动网关**

```bash
docker compose restart picoclaw-gateway
```

![](https://cdn.paicoding.com/stutymore/picoclaw-shizhan-20260215154455.png)

现在打开 Te，给你的机器人发消息试试。

![](https://cdn.paicoding.com/stutymore/picoclaw-shizhan-20260215154720.png)

这个体验就完全不一样了。以后不管在哪里，掏出手机就能和自己的 AI 助手聊天，问问题、查资料、设提醒，都可以。

除了 Te，PicoClaw 还支持 Discord、QQ、钉钉、飞书。QQ 和钉钉的配置稍微复杂一点，需要去对应的开放平台申请应用。但核心逻辑都一样：拿到凭证，填到配置文件里，启动网关。

## 04、定时任务和心跳机制

PicoClaw 还有一个很实用的功能：心跳机制。你可以配置一些周期性任务，让 Agent 每隔一段时间自动执行。

在工作区创建 `HEARTBEAT.md` 文件：

```markdown
# Periodic Tasks

- 检查最新的 AI 新闻并总结
```

然后在配置文件中启用心跳：

```json
{
  "heartbeat": {
    "enabled": true,
    "interval": 30
  }
}
```

这样 Agent 每 30 分钟就会读取这个文件，执行里面的任务，并把结果通过 Telegram 发给你。

![](https://cdn.paicoding.com/stutymore/picoclaw-shizhan-20260215160123.png)

对于耗时较长的任务，PicoClaw 还支持 spawn 子 Agent 异步执行，不会阻塞主进程。这个设计在工程上非常成熟。

## 05、写到简历上

好，实战跑完了，接下来聊聊怎么把这个项目写到简历上。

毕竟学了东西不落到简历上，就白学了对吧？

**项目名称：** PicoClaw 轻量级 AI Agent

**项目简介：** 基于 Go 语言开发的超轻量 AI Agent 项目，在 10MB 内存、$10 硬件环境下实现 OpenClaw 级别的智能助手能力，支持多平台消息接入、定时任务、长期记忆等功能。

**技术栈：** Go 1.21+、智谱 GLM-5、Telegram Bot API、Brave Search API、RISC-V/ARM/x86 多架构

**核心职责：**

- 完成 PicoClaw 在 Linux 环境下的源码编译与部署，配置智谱 GLM-5 作为底层推理引擎，实现 Agent 对话、网络搜索、定时任务等核心功能
- 基于 Telegram Bot API 实现消息网关接入，配置用户白名单机制保障安全性，实现 7×24 小时私人 AI 助手服务
- 研究 PicoClaw 的架构设计，理解本地协调 + 云端推理的分层模式，以及 Go 语言单二进制、跨平台编译的工程优势
- 配置心跳机制实现周期性任务自动执行，支持 spawn 子 Agent 异步处理耗时任务，保证主进程不阻塞
- 对比分析 PicoClaw 与 OpenClaw 的技术差异，理解极致资源优化背后的架构取舍

这套经历写到简历上，面试官一看就知道你动过手、踩过坑、有思考。

## 06、可能会问的面试题

既然把项目写到简历上了，面试的时候肯定会被问到。我提前帮你整理几个高频问题：

### Q1：PicoClaw 为什么能做到只用 10MB 内存？

答：核心原因是架构设计上把计算密集型的 LLM 推理外包给云端 API，本地只做消息路由、会话管理、记忆存储这些轻量操作。再加上 Go 语言本身编译成静态二进制，没有运行时依赖，内存占用天然就低。

### Q2：Go 语言相比 TypeScript/Python 做 Agent 有什么优势？

答：三点。第一，Go 编译成单一二进制文件，部署不需要 Node.js 或 Python 运行时，嵌入式设备友好。第二，Go 的内存管理更高效，没有 V8 或 CPython 的额外开销。第三，Go 原生支持交叉编译，一条命令就能编译出 RISC-V、ARM、x86 三个平台的可执行文件。

### Q3：PicoClaw 的心跳机制是怎么实现的？

答：它会定期读取工作区下的 `HEARTBEAT.md` 文件，解析里面的任务列表，然后逐个调用 Agent 执行。

对于耗时任务，会通过 spawn 创建子 Agent 异步执行，执行完成后通过 message 工具把结果推送给用户。整个过程不阻塞主心跳循环。

### Q4：如果让你优化 PicoClaw，你会从哪些方向入手？

答：几个方向。第一，可以考虑支持本地小模型（比如 Phi-3、Qwen-1.5B），在网络不可用时降级到本地推理。第二，消息队列可以引入优先级机制，紧急任务优先处理。第三，长期记忆目前是文件存储，可以考虑用 SQLite 做结构化存储，支持更复杂的查询。

这几个问题答好了，基本能证明你不是走马观花，而是真正理解了这个项目。

## ending

如果你需要本地训练、本地推理，那确实需要强算力。但如果只是做一个私人助手，处理日常问答、设置提醒、查个资料，云端 API + 轻量本地协调，可能是更聪明的选择。

PicoClaw 的成功案例就是一个不错的学习目标。这是一个 90% 以上代码由AI自举完成的开源项目。


![](https://files.mdnice.com/user/3903/e9ea6ef4-f32e-4f7c-bcf5-2d85b70d74de.jpg)


意味着，以后的软件开发可能会变成：人定义架构和约束，AI 负责填充实现细节。

【不是 AI 取代程序员，而是程序员和 AI 协作，变成更强的程序员。】

还没体验过的小伙伴，建议花半小时跑一遍。

不为别的，就为给简历加一个 AI Agent 实战项目经验，也值了。

我们下期见～
