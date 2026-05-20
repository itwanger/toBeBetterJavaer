---
title:
shortTitle:
description: HarnessClaw 实测：多 Agent 聚合管理、Electron 跨平台、Harness 工程化执行，它凭什么不是普通聊天框？
tag:
  - Agent
  - AI Coding
category:
  - AI
author: 沉默王二
date: 2026-05-19
---

大家好，我是二哥呀。

这两年 AI 工具是真的多。每天打开电脑，光 AI 相关的标签页就能数出七八个。一个聊天，一个写代码，一个查知识库，一个跑 Agent，再加上各家模型的控制台。切来切去，脑子不是用在任务上，全用在找窗口上了。

直到我看到 HarnessClaw。第一反应是：又一个聊天壳子？如果只是把模型搬到桌面端，那跟在网页上聊有什么区别？但实际装上去跑了一遍之后，我发现这个东西的野心比我想的大得多，它想做的不是"又一个 AI 聊天工具"，而是"本地 AI Agent 工作台"。

这篇文章我就讲三件事。多 Agent 聚合管理，告别一个窗口一个模型的日子；Electron 跨平台桌面端，Mac、Windows、Linux 开发者都能用；Harness 工程化思维，让 AI 从"你问我答"变成"人掌舵，Agent 执行"的任务调度平台。

## 01、先把 Engine 跑起来

HarnessClaw 分两块：前端是桌面客户端，后端是 Engine。

桌面端管交互、管 UI、管我们跟 Agent 之间的对话。Engine 管的东西更多，模型请求、任务调度、工具调用、运行状态，全在 Engine 这一层。两者之间用 WebSocket 长连接通信，所以多轮对话的上下文能丝滑衔接，不像 HTTP 轮询那样动不动就断片。

Engine 的 GitHub 地址：[harnessclaw/harnessclaw-engine](https://github.com/harnessclaw/harnessclaw-engine)

![](https://cdn.paicoding.com/stutymore/sucai-20260519155425.png)

克隆仓库到本地，我推荐用 GitHub Desktop。对不太熟悉命令行的小伙伴来说，直接点 `Code` 按钮，选 `Open with GitHub Desktop`，一步到位，省得折腾路径和 SSH Key。

项目拉下来之后，在根目录执行一行命令就能启动：

```bash
go run ./cmd/server
```

之前没装过 Go？问题不大。执行这个命令后，终端提示缺 Go 环境，按提示装上就行。Go 的安装体验在各种语言里算顺滑的，基本不会卡住。

![](https://cdn.paicoding.com/stutymore/sucai-20260519155800.png)

服务启动成功后，终端里会看到 Engine 的日志输出，显示本地端口已经在监听了。

![](https://cdn.paicoding.com/stutymore/sucai-20260519160013.png)

【此处插入 Engine 日志详情截图：截图目标：证明 Engine 已在本地启动并监听 WebSocket 端口；关键词：server started、listening、WebSocket；建议位置：终端】

这个架构让我想到一个词：前后端分离。桌面端只管 UI 和交互，Engine 管所有"脏活累活"。以后要升级模型、加工具、接项目，都不用动桌面端，只需要在 Engine 那一层配。这比那些"前后端混在一起"的 AI 客户端灵活太多了。

而且 Engine 是用 Go 写的。Go 天然适合做高并发网络服务，如果以后想把 Engine 部署到团队服务器上，让整个团队共享同一个 AI 服务底座，技术上完全走得通。

## 02、桌面端安装和 Electron 跨平台

桌面客户端的 GitHub release 地址：[harnessclaw/harnessclaw](https://github.com/harnessclaw/harnessclaw/releases)

![](https://cdn.paicoding.com/stutymore/sucai-20260519160340.png)

macOS 和 Windows 都有对应的安装包。macOS 要注意芯片版本，Apple 芯片下载 `arm64`，Intel 芯片下载 `x64`。这个地方别下错，下错了可能装不上，或者装上了跑起来奇怪得很。

![](https://cdn.paicoding.com/stutymore/sucai-20260519160547.png)

为什么要强调跨平台？因为这件事说起来容易做起来难。

很多 AI 桌面工具只做了 Mac 版，或者只做了 Windows 版，Linux 用户直接被抛弃。HarnessClaw 用的是 Electron + React + Vite 技术栈，Electron 天然就是为跨平台而生的，用 Web 技术写一套代码，打包出 Mac、Windows、Linux 三个平台的桌面应用。

从实际体验看，我在 Mac 上安装顺畅，界面流畅。Windows 同事也装了一份，体验基本一致。Linux 虽然暂时没有在 Release 页面看到预编译包，但既然底层是 Electron，社区完全可以自己构建。对开源项目来说，"技术栈支持"比"预编译包齐全"更重要，因为前者意味着门是开着的。

首次启动后的界面长这样：

![](https://cdn.paicoding.com/stutymore/sucai-20260519160632.png)

清爽。左侧是功能入口，中间是工作区，没有那种铺满按钮、让人一脸懵的复杂后台感。第一次打开就知道该点哪里，这在开源 AI 工具里算难得的。

接下来会让我们选 API 接入方式。现在大部分 LLM 厂商都兼容 OpenAI 或 Anthropic 的接口协议，所以选哪个都行。

![](https://cdn.paicoding.com/stutymore/sucai-20260519160718.png)

我这次先接了 DeepSeek。Base URL 填 `https://api.deepseek.com/anthropic`，API Key 在 DeepSeek 控制台创建一个复制过来，Model ID 选 `deepseek-v4-pro`。

任务画像我选了"研发与自动化运维"。

![](https://cdn.paicoding.com/stutymore/sucai-20260519161308.png)

配好之后，直接进入 HarnessClaw 主界面。

![](https://cdn.paicoding.com/stutymore/sucai-20260519161517.png)

【此处插入 模型配置完成截图：截图目标：证明 DeepSeek 模型配置成功并进入主界面；关键词：deepseek-v4-pro、API Key、Connected；建议位置：HarnessClaw 设置页】

到这一步，整个安装过程就结束了。Engine 启动一行命令，桌面端下载安装包双击，接入模型填三个参数。对一个开源项目来说，这个上手门槛已经很低了。

## 03、多 Agent 聚合管理才是杀手锏

装好之后，第一个让我觉得"这不是普通聊天框"的地方，就是多模型管理。

在设置页里，我可以同时启用 DeepSeek 和智谱 GLM。Agent 配置里有两个关键选项：Primary model 和 Fallback model。我把主模型设成 `zhipu:glm-5.1`，备用模型设成 `deepseek:deepseek-v4-pro`，然后开启 fallback。

【此处插入 多模型配置截图：截图目标：证明主模型和备用模型可以分别配置并开启 fallback；关键词：Primary model、Fallback model、glm-5.1、deepseek-v4-pro；建议位置：HarnessClaw Agent 设置页】

这个功能看着不花哨，但解决了一个非常现实的痛点。

我之前用 AI 工具写东西，遇到过不止一次"主模型突然挂了"的情况。要么是模型提供商在维护，要么是网络波动，要么是请求量太大被限流。每次遇到这种情况，我只有两个选择：干等，或者手动切到另一个工具重新开始。上下文全丢，之前聊的半小时白费。

HarnessClaw 的 fallback 机制就像给 AI 工作流加了一个保险，主模型挂了，备用模型自动顶上。对内容创作、代码审查、资料整理这类需要连续性的工作来说，稳定完成一次任务，比什么花哨功能都重要。

我第一次测试时也确实遇到了 `bifrost: stream request failed` 这类请求错误。后来配置调通之后，我让它"只回复两个字：收到"，它果然回了"收到"。

![](https://cdn.paicoding.com/stutymore/sucai-20260519163246.png)

别小看这个测试。一个 AI 工作台再怎么吹概念，如果最基础的模型请求都不稳，后面所有 Agent 和 Skill 全白搭。

但多模型管理只是表面。HarnessClaw 更想表达的是"多 Agent 聚合管理"这个概念。不是"我支持很多模型"，而是"我能把多个模型、多个 Agent、多个技能放进一个工作台里统一管理"。

【此处插入 多模型开启状态截图：截图目标：展示 DeepSeek 和 GLM 都处于开启状态；关键词：DeepSeek、GLM、Enabled；建议位置：HarnessClaw 模型设置页】

以前我们可能是这样的：一个标签页开着 DeepSeek 的网页版，一个标签页开着 GLM 的网页版，一个标签页开着 ChatGPT，一个标签页开着 Claude。写文章问一个，查代码问另一个，整理资料又换一个。脑子不是用在任务上，全用在"这个问题该去哪个窗口问"上面。

HarnessClaw 的做法是：所有模型都在一个界面里配好，想用哪个选哪个，主力模型挂了备用自动顶。问谁、怎么问、上下文怎么管，全在一个工作台里搞定。

这才是"聚合管理"的价值。不是多了几个模型选项，而是少切了无数次窗口。

## 04、Specialists 让 Agent 真正干活

接下来是我最好奇的部分：Agent 到底能不能干活？

HarnessClaw 里有一个叫 Specialists 的功能。它不像普通模型只负责聊天，Specialists 有明确的角色分工，比如 writer 负责写作、researcher 负责查资料、analyst 负责分析、developer 负责代码。

我实测了一下，给主助手 Emma 发了这样一段话：

```text
请调用 Specialists 里的 developer，让它只用一句话说明自己能做什么；不要写文件。
```

结果很有意思。这次不是普通的文本回复，而是在界面上弹出了一张 `Specialists` 工具卡片，任务状态从"执行中"变成"已完成"，developer specialist 的回答被带回到了主聊天窗口里。

【此处插入 Specialists 调用截图：截图目标：证明主助手调度了 developer specialist 并拿到结果；关键词：Specialists、developer、completed、tool card；建议位置：HarnessClaw 聊天页面】

这个结果为什么关键？因为它验证了一件事：HarnessClaw 的 Agent 不只是换了个皮肤的聊天机器人，而是真的能"分配任务"。

想想看，如果把这个能力用到实际研发场景里，完全可以设计这样一条流程。先让 researcher 查背景资料，再让 developer 分析代码实现，然后让 analyst 总结风险点，最后让 writer 把结论改写成面向用户的文档。每一步都有专门的专家负责，主助手只负责调度。

这就跟"AI 研发助手"挂上钩了。不是一个 Agent 从头聊到尾，而是一个调度中心根据任务类型，把不同部分交给最合适的专家处理。

我又追加了一个测试：

```text
请让 developer 分析一下 Java 中 ConcurrentHashMap 的线程安全实现，重点说三个关键设计。
```

developer specialist 果然给出了相当专业的回答，从分段锁到 CAS 操作到 volatile 变量，说得很有条理。

这让我确信了一件事：Specialists 不是摆设，它真的能在特定领域给出比通用模型更聚焦的回答。因为每个 specialist 的系统提示词是针对性调过的，不会像通用模型那样"什么都知道一点、什么都不够深入"。

## 05、Skill 市场给 Agent 扩展工具箱

除了内置的 Specialists，HarnessClaw 还有一个 Skill 市场。

我第一次打开 Skill 市场的时候，已安装技能是 0 个，仓库也是 0 个。这很正常，HarnessClaw 不是预装一堆不知道能不能用的插件，而是让用户自己添加技能来源。我反而觉得这样更干净。

我添加了 `openclaw/clawhub` 这个仓库作为技能源：

```text
https://github.com/openclaw/clawhub
```

分支选 `main`，扫描路径填 `.agents/skills`，展示名填 `ClawHub`。

【此处插入 Skill 仓库添加截图：截图目标：证明用户可以手动添加 Skill 仓库；关键词：ClawHub、.agents/skills、main、Add Repository；建议位置：Skill 市场配置页】

点击刷新后，Skill 市场一共扫出来 11 个技能，包括 `autoreview`、`clawhub-moderation`、`clawhub-pr-maintainer`、`clawhub-ui-proof`、`convex` 系列，还有 `crabbox`。

【此处插入 Skill 列表截图：截图目标：证明 Skill 市场成功扫描出 ClawHub 仓库中的技能；关键词：autoreview、clawhub-ui-proof、convex、11 skills；建议位置：Skill 市场列表页】

这里我想说一句掏心窝的话：Skill 市场目前还处于"能发现、能展示"的阶段，具体某个技能安装后能不能在对话中被 Agent 自动调用，还需要进一步测试。但这并不影响它的价值定位，Skill 市场承担的是"生态入口"的角色。

它说明 HarnessClaw 不只想做一个封闭的桌面客户端，而是想让用户能像给 IDE 装插件一样，给 Agent 加工具箱。今天能接 ClawHub，明天就能接自己团队内部的技能仓库。这个想象空间比"我内置了 30 个功能"要大得多。

从用过 Claude Code 的 web-access Skill 之后，我对"给 Agent 扩展能力"这件事有了新的认知。一个好的 Skill 不只是多了一个 API 调用，而是给 Agent 加了一整套策略和经验。HarnessClaw 的 Skill 市场如果能往这个方向走，潜力相当可观。

## 06、Harness 工程化思维

说到这里，我想聊一个更底层的问题：HarnessClaw 到底和普通 AI 聊天工具有什么本质区别？

如果只看界面，它确实像一个好看的桌面端聊天工具。但用了一圈之后，我越来越觉得关键不在"桌面端"，而在"Harness"这个词。

Harness 的英文原意是"驾驭"。放到 AI 语境下，它的意思是：把 AI 的能力装进一套可控的执行结构里，让人来驾驭、让 Agent 来执行。

普通聊天框的模式是"你问我答"。用户每次都要自己判断该问谁、该怎么问、上下文放哪里、结果怎么保存。说白了，操心的是人，干活的也是人，模型只负责回话。

HarnessClaw 的模式更像"组织 AI 执行"。用户负责决定目标、判断结果、控制边界，这是掌舵。Agent 负责调模型、用技能、处理任务、把结果交回来，这是执行。

【此处插入 工程化思维对比图：截图目标：对比普通聊天框和 HarnessClaw 的工作模式差异；关键词：你问我答 vs 组织执行、Model+Agent+Skill；建议位置：文章配图或产品截图拼图】

打个比方。同样是做一次项目代码分析，普通聊天框的流程是：打开某个模型的网页，复制项目背景进去，再复制代码片段进去，让模型分析，看完结果再打开另一个工具整理。每一步都要人去切窗口、搬上下文、手动衔接。

HarnessClaw 的流程可以变成：在桌面端配好模型，用项目入口组织上下文，通过 Specialists 拆分任务，用 Skill 市场扩展能力，结果保留在会话和项目里。每一步都有对应的功能模块承接，人只需要在关键节点做决策。

这就是从"问模型一个问题"到"让 Agent 在可控环境里完成任务"的转变。

我之前用 Claude Code 和 Codex 这类 AI Coding 工具比较多，它们走的也是类似的路线，不是让用户一直跟模型聊，而是把模型的能力包装成任务执行。HarnessClaw 把这个思路搬到了更通用的场景：不只是代码，文档、调研、分析、创作，都可以用同样的"人掌舵、Agent 执行"模式来组织。

## 07、竞品对比

为了让大家更直观地感受 HarnessClaw 的定位，我把它和两类常见工具做了个对比。

第一类是"纯聊天大模型 App"，就是 ChatGPT、DeepSeek 网页版、GLM 网页版这些。它们的核心定位是对话问答。问一个问题，给一个回答。多数情况下是单会话为主，没有 Agent 编排能力，也没有技能扩展。模型能力确实强，但用法比较单一。

第二类是"单一 IDE 插件"，比如各种 AI 代码补全、AI 翻译插件。它们通常绑定在某个 IDE 或某个应用内部，能力是固定的、封闭的。好处是上手快，坏处是能力边界很死，它能做什么就只能做什么，没办法给它加新工具。

HarnessClaw 想走的是第三条路：多 Agent 桌面控制台 + 后端执行引擎。开源、支持私有化部署，能接多个模型、多个 Agent、多个技能，而且后端有 Engine 做硬核的任务调度和权限控制。

| 维度 | HarnessClaw | 纯聊天大模型 App | 单一 IDE 插件 |
|------|-------------|-----------------|--------------|
| 核心定位 | 多 Agent 桌面控制台 + 后端引擎 | 对话问答 | 特定任务 |
| 部署形态 | 开源，支持本地/云私有化部署 | 依赖云端托管 | 绑定 IDE，部分闭源 |
| Agent 能力 | 多 Agent 编排 + 技能路由 | 单会话为主 | 固定能力 |
| 工具集成 | 可对接本地/外部工具 | 少数官方插件 | IDE 内部生态 |
| 可扩展性 | Skill 市场，可自定义 | 有限 | 有限 |

当然，HarnessClaw 目前还是一个年轻的开源项目，很多功能还在迭代。但方向是清楚的：它不想做第 N 个聊天框，而是想做 AI Agent 时代的"桌面端控制中心"。

## 08、写到简历里怎么包装

如果有小伙伴想把 HarnessClaw 相关的实践经验写到简历里，也完全可以。但要写得像真正做过的项目，不能只堆一串名词。

项目名称：基于 HarnessClaw 的本地 AI 研发工作台搭建与验证

项目简介：基于 HarnessClaw Engine（Go）+ 桌面客户端（Electron）搭建本地 AI Agent 工作台，完成多模型接入、Agent 调度验证和 Skill 市场接入，验证"人掌舵、Agent 执行"的工程化思路在研发场景中的可行性。

技术栈：Go、Electron、WebSocket、DeepSeek API、智谱 GLM API、Agent Specialists、Skill Marketplace

核心职责：

- 完成 HarnessClaw Engine 本地部署，基于 Go 和 WebSocket 实现前后端长连接通信，验证多轮对话上下文衔接
- 接入 DeepSeek、GLM 等多模型 Provider，配置主备模型 fallback 机制，保障 AI 服务稳定性
- 测试内置 Specialists 调度能力，验证 developer specialist 可被主助手自动调用并返回结果
- 接入 ClawHub Skill 仓库，验证 Skill 市场的技能发现和展示能力，探索 Agent 能力扩展路径
- 梳理多 Agent 聚合管理、跨平台桌面端和 Harness 工程化执行平台的产品差异化定位

【此处插入 简历参考截图：截图目标：展示 HarnessClaw 项目、Agent、模型配置的组合使用；关键词：Projects、Agent Settings、Model Provider；建议位置：HarnessClaw 项目页或配置页拼图】

这样写出来，比简历上一句"使用 AI 工具提升开发效率"要有说服力得多。因为它有部署、有配置、有测试、有判断。能把可用的部分跑通，能把暂时受限的部分说清楚，这本身就是技术落地中最有价值的能力。

## ending

HarnessClaw 现在还不是一个"万事都能自动完成"的超级平台。
但方向已经很清楚了。

用本地 Engine 承接能力，
用桌面端统一管理模型、Agent 和技能，
用 Specialists 拆分任务，
用 Skill 市场扩展工具箱。

以前我们用 AI，像在不同的房间里找不同的人帮忙。
现在 HarnessClaw 想做的，是把所有人请到同一个指挥室里。

我们负责拍板，Agent 负责干活。

多 Agent 聚合管理：告别"一个窗口一个模型"。
Electron 跨平台：Mac、Windows、Linux 开发者都有位置。
Harness 工程化思维：这不是普通聊天框，而是围绕 AI 组织工具和任务流的执行平台。

【人掌舵，Agent 执行。这才是 AI 工作台该有的样子。】

我们下期见。
