---
title: 7 天破 9000 Star，Go 版OpenClaw 来了，附钉钉接入教程。
shortTitle: PicoClaw钉钉实战
description: OpenClaw 为什么突然火遍全网？它解决了 AI Agent 的哪些痛点？本文从求职角度出发，带你用 PicoClaw（OpenClaw 轻量版）接入钉钉，搭建一个能写进简历的 AI Agent 项目，并挖掘相关面试题。
tag:
  - AI
  - Agent
  - OpenClaw
category:
  - AI
author: 沉默王二
date: 2026-02-15
---

大家好，我是二哥呀。

OpenClaw 火有一段时间了，这周除了Seedance 2.0能压它一头之外，再无其他。

就连这个复刻版的 PicoClaw，也在短短一周时间内拿到了 9000+ star。

![](https://cdn.paicoding.com/stutymore/picoclaw-dingding-20260215194005.png)

Go 语言重写，能接入钉钉、Discord 等平台，关键是非常容易上手，10分钟就能跑起来。

我也接入了钉钉，搭建了一个派聪明机器人。接下来就给大家详细介绍一下这个项目，为什么它能火，怎么用它接入钉钉，以及这个项目在求职中的价值。

## 01、OpenClaw 为什么突然火了

在聊 PicoClaw 之前，先说说 OpenClaw 为什么爆火。

**核心原因：它把 AI 从聊天工具变成了能干活的数字员工。**

以前的 AI 助手，只能给你建议、回答问题。你问它帮我预定明天的会议室，它会告诉你怎么操作，但你还得自己打开浏览器、登录系统、点按钮。

OpenClaw 不一样。它能直接控制你的电脑，运行脚本、打开浏览器、点按钮、传文件，甚至写完代码直接在本机跑起来。

这就是从对话到执行的质变。

![](https://cdn.paicoding.com/stutymore/picoclaw-dingding-20260215194602.png)

OpenClaw 爆火的第二个原因是**本地优先**。

现在大部分 AI 应用都跑在云端，你的数据、对话记录、工作流程全在别人服务器上。OpenClaw 则完全运行在你自己的设备上，拥有系统级权限，数据本地存储，隐私完全可控。

对企业和开发者来说，这意味着敏感数据不出本地、API 调用可控、甚至可以接入内网系统。

## 02、部署PicoClaw

PicoClaw 的安装方式有多种，我这里选择的是Docker，环境依赖最少，适合快速上手。

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

回答还不赖。

## 03、接入钉钉

这次我们要实现的功能是：用 PicoClaw 接入钉钉，搭建一个派聪明机器人，能处理日常咨询、设置提醒、查询资料。

第一步，到钉钉的开发者中心，`https://open.dingtalk.com/`，点击创建应用。

![](https://cdn.paicoding.com/stutymore/sucai-20260215183942.png)

填写名字、描述和上传图标，然后点击保存。

![](https://cdn.paicoding.com/stutymore/sucai-20260215184022.png)

第二步，进入机器人配置。机器人名称可以选择使用应用名称，图标也可以。

![](https://cdn.paicoding.com/stutymore/sucai-20260215184120.png)

接着填写机器人简介、机器人描述等。

![](https://cdn.paicoding.com/stutymore/sucai-20260215184213.png)

重要的是，消息接收模式要选择stream模式。

![](https://cdn.paicoding.com/stutymore/sucai-20260215184311.png)

官方是这样解释的。不同于HTTP 模式，Stream 模式可以监听机器人回调、事件订阅回调和注册卡片回调。钉钉开放平台将通过 Websocket 连接与应用程序通讯，将极大降低接入门槛和资源依赖，不需要公网服务器、IP、域名等资源。

![](https://cdn.paicoding.com/stutymore/sucai-20260215184500.png)

第三步，进入版本管理与发布。

![](https://cdn.paicoding.com/stutymore/sucai-20260215184529.png)

新建一个版本，填写版本号、描述，选择应用可见的人员等，然后点击保存就可以了。

![](https://cdn.paicoding.com/stutymore/sucai-20260215184605.png)

接着回到凭证与基础信息这里，复制 Client ID 和 Client Secret，准备填到 PicoClaw 的配置文件里。

![](https://cdn.paicoding.com/stutymore/sucai-20260215184713.png)

好，回到PicoClaw 的配置文件里，找到 channels 下面的钉钉配置项，填入刚才复制的 Client ID 和 Client Secret。

```json
{
  "channels": {
    "dingtalk": {
      "enabled": true,
      "clientId": "你的Client ID",
      "clientSecret": "你的Client Secret",
      "allowFrom": ["你的用户ID"]
    }
  }
}
```

![](https://cdn.paicoding.com/stutymore/sucai-20260215184851.png)

重启Gateway网关。

```bash
docker compose restart picoclaw-gateway
```

如果看到 DingTalk channel started 就说明接入成功了。

![](https://cdn.paicoding.com/stutymore/sucai-20260215185005.png)

回到钉钉，给你的机器人发消息试试。

在消息这里搜【派聪明】，就可以看到我们之前创建的机器人了。

![](https://cdn.paicoding.com/stutymore/sucai-20260215183333.png)

我之前发布完就过来搜，一直搜不到，出门遛弯狗回来，一搜竟然搜到了，也不知道为什么。

反正就是假如你没有搜到的话，那就稍微等一会再试试。

我还一直怀疑是我自己哪里操作的不对劲。

好，我们回到和派聪明的聊天窗口，随便输入一个提示词，看看它能不能回复。

![](https://cdn.paicoding.com/stutymore/sucai-20260215183554.png)

喊老板出来发红包也没问题。

![](https://cdn.paicoding.com/stutymore/sucai-20260215183825.png)

## 04、OpenClaw 在求职中的价值

我最近看了不少 AI Agent 岗位的 JD，发现了一个趋势：**企业越来越看重AI 应用工程化能力，而不只是会调 API。**

几个典型的 JD 要求：

- 熟悉大模型周边技术（RAG、Prompt 工程）
- 具备 Agent 工作流设计和编排能力
- 了解 OpenClaw、LangGraph 等 Agent 框架
- 有实际项目落地经验

换句话说，光会写调用 OpenAI API 实现对话功能已经不够了。面试官更想看到：

- 你能不能设计一个完整的 Agent 工作流
- 你懂不懂 Agent 的记忆管理、任务拆解、工具调用
- 你有没有把 Agent 真正落地到业务场景的经验

OpenClaw 或者 PicoClaw 这类项目，正好能帮你补齐这些能力。

## 05、PicoClaw 和 OpenClaw 的区别

PicoClaw 是矽速科技（Sipeed）开源的超轻量级 AI Agent，用 Go 语言从零重写，定位是 OpenClaw 的平替版。

从架构设计上看，两者的核心理念不同：

**OpenClaw 的设计哲学：功能完备、插件丰富、社区驱动。**

它有完整的生态系统（ClawHub），支持浏览器自动化（Playwright）、可视化配置界面、多种存储方案（JSONL、SQLite、Vector）。如果你需要一个全能型的 Agent 框架，OpenClaw 是首选。

**PicoClaw 的设计哲学：极致轻量、资源高效、嵌入式友好。**

它把计算密集型的 LLM 推理外包给云端 API，本地只做消息路由、会话管理、记忆存储。这样做的好处是内存占用极低，能跑在 RISC-V 开发板、工控机、甚至摄像头上。

技术选型上的差异也很有意思：

OpenClaw 用 TypeScript，优势是前端生态丰富、开发效率高、社区活跃。但 TypeScript 依赖 Node.js 运行时，内存开销大，部署到嵌入式设备比较困难。

PicoClaw 用 Go，编译成单一二进制文件，没有运行时依赖。Go 的内存管理更高效，原生支持并发，交叉编译一条命令就能搞定 RISC-V、ARM、x86 三个平台。

## 06、写到简历上

好，实战完成了，接下来聊聊怎么把这个项目写进简历。

**项目名称：** 基于 PicoClaw 的企业级 AI Agent 钉钉集成

**项目简介：** 基于 Go 语言超轻量 AI Agent 框架 PicoClaw，通过 Stream 模式实现钉钉企业应用接入，搭建私有化部署的智能助手，支持自然语言对话、定时任务、长期记忆等功能。

**技术栈：** Go 1.21+、智谱 GLM-4.7 / OpenRouter API、钉钉 Stream SDK、WebSocket、Docker

**核心职责：**

- 基于 PicoClaw 框架完成本地编译部署，配置智谱 GLM-5 作为底层推理引擎，实现 Agent 核心能力（对话、搜索、记忆）
- 研究钉钉 Stream 模式接入机制，配置 WebSocket 通信通道，实现零公网资源的企业应用接入，避免传统 HTTP 模式的域名和服务器依赖
- 设计用户白名单机制保障系统安全，实现基于钉钉用户 ID 的访问控制，防止未授权调用
- 配置心跳机制（Heartbeat）实现周期性任务自动执行，支持通过 spawn 创建子 Agent 异步处理耗时任务（如网络搜索、数据分析），保证主进程响应不阻塞
- 对比研究 PicoClaw 与 OpenClaw的架构差异，理解本地协调 + 云端推理的分层设计模式，以及 Go 单二进制编译、跨平台部署的工程优势

## 07、可能会问的面试题

既然写进简历了，面试肯定会被问到。我提前帮你准备几道高频题：

**Q1：OpenClaw 和 PicoClaw 的核心区别是什么？技术选型上为什么一个用 TypeScript 一个用 Go？**

答：OpenClaw 定位是功能完备的 Agent 框架，用 TypeScript 开发，优势是前端生态丰富、社区活跃、开发效率高，适合需要可视化界面和丰富插件的场景。但它依赖 Node.js 运行时，内存占用大（>1GB），启动慢（>500秒），部署到嵌入式设备或低配服务器比较困难。

PicoClaw 定位是超轻量 Agent，用 Go 重写。Go 编译成单一静态二进制文件，无运行时依赖，内存占用不到 10MB，启动不到 1 秒，原生支持交叉编译，一条命令就能编译出 RISC-V、ARM、x86 三个平台的可执行文件。适合资源受限环境、边缘设备、快速部署的场景。

技术选型的本质差异是：OpenClaw 追求功能完备性，PicoClaw 追求资源极致优化。

**Q2：钉钉的 Stream 模式和传统 HTTP 模式有什么区别？为什么 Stream 模式门槛更低？**

答：传统 HTTP 模式是钉钉服务器主动推送消息到你的服务器，所以你需要一个公网 IP、域名、SSL 证书，配置 webhook 回调地址。对个人开发者来说，光搞定这些前置条件就很麻烦。

Stream 模式是你的应用主动建立 WebSocket 连接到钉钉服务器，钉钉通过这个长连接推送消息。这样就不需要公网资源了，本地开发环境、内网服务器都能接入。

从架构上看，Stream 模式是拉模式（应用拉取消息），HTTP 模式是推模式（钉钉推送消息）。拉模式的好处是部署灵活、调试方便。

**Q3：OpenClaw 的车道式指令队列是什么原理？为什么要这样设计？**

答：车道式指令队列是 OpenClaw 用来解决并发冲突的机制。简单说，Agent 执行任务时，每个用户（或会话）分配一个独立的车道，车道内的指令串行执行，车道之间并行隔离。

为什么要这样设计？因为 Agent 操作系统资源（文件、浏览器、网络），如果多个任务并发执行，可能出现资源竞争、状态冲突。比如两个任务同时写同一个文件，或者同时操作同一个浏览器窗口，就会出问题。

车道机制保证了同一用户的任务按顺序执行，避免自己和自己冲突，同时不同用户的任务可以并行处理，不会相互阻塞。这是一个典型的单用户串行、多用户并行的并发模型。

**Q4：如果让你优化 PicoClaw，你会从哪些方向入手？**

答：几个方向：

第一，支持本地小模型降级。现在 PicoClaw 完全依赖云端 API，如果网络断了或者 API 限流，就完全不可用。可以考虑接入 Ollama 或 llama.cpp，在本地跑 Phi-3、Qwen-1.5B 这种小模型，网络异常时自动降级到本地推理。

第二，优化长期记忆的存储和检索。目前记忆是存在 MEMORY.md 文件里，检索靠 Grep，效率不高。可以引入 SQLite + FTS5 全文搜索，或者用向量数据库（Chroma、Qdrant），支持语义检索。

第三，增强任务编排能力。现在 PicoClaw 的任务执行比较线性，可以参考 LangGraph 的思路，支持有向无环图（DAG）编排，实现条件分支、循环、并行执行。

第四，完善监控和可观测性。加个简单的 Web Dashboard，展示任务执行历史、API 调用统计、错误日志，方便排查问题。

## 08、OpenClaw 在 AI Agent 开发中的学习价值

最后聊聊学习价值。

很多人可能觉得，OpenClaw 或 PicoClaw 只是个框架，学会用就行了，没必要深究原理。

我的观点恰恰相反：**这类项目的价值不在于会用，而在于理解它为什么这样设计。**

OpenClaw 的架构设计里藏了很多工程智慧：

**1. 分层设计的价值**

网关层（Orchestrator）、执行层（Agent Runner）、存储层（Memory）、安全层（Security），每一层职责清晰，可以独立替换。这种分层思想在任何中大型系统中都适用。

**2. 异步任务的处理**

Heartbeat 心跳机制 + spawn 子 Agent，保证长任务不阻塞主进程。这是典型的任务队列 + Worker模式，在后端开发中非常常见。

**3. 本地优先的取舍**

为了隐私和可控性，选择本地部署，代价是部署复杂度和资源占用。PicoClaw 通过本地协调 + 云端推理做了折中，这种权衡思维在架构设计中至关重要。

**4. 安全机制的实现**

允许列表（Allow List）、指令分类、权限控制，这些都是企业级应用必备的安全设计。学会这些，以后做任何涉及权限的系统都用得上。

从求职角度看，OpenClaw 项目能帮你建立AI 应用工程化的认知框架。

面试官不会问你会不会调 OpenAI API，这太基础了。

他们会问：

- 你怎么设计一个可扩展的 Agent 架构？
- 你如何处理 Agent 执行任务时的异常和重试？
- 你怎么保证 Agent 的安全性和可控性？
- 你如何平衡本地部署和云端调用的成本？

这些问题的答案，OpenClaw 和 PicoClaw 的架构里都有。

## ending

OpenClaw 的爆火不是偶然。

它踩中了几个关键点：从对话到执行的能力跃迁、本地优先的隐私保护、开箱即用的部署体验。

PicoClaw 则用 Go 语言把这套理念做到了极致轻量，让 AI Agent 能跑在任何设备上。

从学习角度说，这两个项目给了我们一个完整的AI Agent 工程化样本。

从求职角度说，这是一个能写进简历、经得起追问、体现工程思维的项目。

我自己用 PicoClaw 接入钉钉之后，最大的感受是：

【AI Agent 的价值不在于多智能，而在于它能多大程度上融入你的工作流。】

OpenClaw 和 PicoClaw 做的事情，就是把 AI 从你偶尔打开聊几句的工具，变成随时在后台帮你干活的助手。

这才是 AI Agent 的终局。

还没试过的同学，建议花半小时跑一遍。
