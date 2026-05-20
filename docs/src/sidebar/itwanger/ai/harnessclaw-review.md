---
title: 不用再切一堆AI网页了，HarnessClaw这个本地Agent工作台我实测了一遍
shortTitle: HarnessClaw实测
description: HarnessClaw 桌面端和 Engine 实测：从多 Agent 聚合管理、Electron 跨平台，到 Harness 工程化执行平台，真实体验它为什么不是普通聊天框。
tag:
  - Agent
  - AI Coding
category:
  - AI
author: 沉默王二
date: 2026-05-19
---

大家好，我是二哥呀。

这两年 AI 工具是真的多。一个网页负责聊天，一个网页负责代码，一个网页负责知识库，一个网页负责 Agent，再加上模型厂商自己的控制台，桌面上很容易开成一排标签页。

所以我看到 HarnessClaw 的第一反应是：它到底是不是一个新的聊天壳子？如果只是把模型搬到桌面端，那意思不大。真正有价值的点应该是，把模型、Agent、工具、技能和项目放到一个本地工作台里，让它能像一个 AI 指挥台一样用起来。

我这次没有只看 README，也没有只写产品介绍，而是把 HarnessClaw Engine、桌面客户端、多模型配置、内置 Specialists、Skill 市场都实际点了一遍。结论先放前面：最适合写成推广案例的，是“本地 AI Agent 工作台”。

这篇文章重点就讲三件事：多 Agent 聚合管理，告别“一个窗口一个模型”；Electron 加持的跨平台体验，Mac/Win/Linux 开发者都能看到想象空间；Harness 工程化思维，它不是普通聊天框，而是围绕 AI 组织工具、任务流的执行平台。

【此处插入 HarnessClaw 总览图：截图目标：证明桌面端已经连接 Engine 并进入主界面；关键词：HarnessClaw、已连接、Emma；建议位置：桌面客户端主界面】

## 01、先把 HarnessClaw Engine 跑起来

HarnessClaw 分成两块：一块是桌面客户端，一块是后端 Engine。桌面端负责交互，Engine 负责承接本地服务、任务调度、模型请求和运行状态。

Engine 的 GitHub 地址是：[harnessclaw/harnessclaw-engine](https://github.com/harnessclaw/harnessclaw-engine)。

![](https://cdn.paicoding.com/stutymore/sucai-20260519155425.png)

克隆到本地。

我仍然推荐用 GitHub Desktop。对刚接触这类开源项目的同学来说，点 `Code`，再选择 `Open with GitHub Desktop`，比在命令行里处理路径和认证要省心不少。

项目克隆好之后，在根目录下执行：

```bash
go run ./cmd/server
```

如果之前没有安装 Go 环境，问题也不大，按终端提示把 Go 环境补上就行。

![](https://cdn.paicoding.com/stutymore/sucai-20260519155800.png)

服务启动成功后，终端里会看到 Engine 相关日志。我的机器上 Engine 后面监听了本地端口，桌面端可以正常识别连接状态。

![](https://cdn.paicoding.com/stutymore/sucai-20260519160013.png)

【此处插入 Engine 启动日志图：截图目标：证明 Engine 已经本地启动并等待桌面端连接；关键词：go run、cmd/server、server started；建议位置：终端】

从这个结构看，HarnessClaw 并不是一个单纯的网页聊天入口。它更像把一个本地运行的 Agent Engine 放在后面，再用桌面端做统一入口。这个设计有一个好处：后面接项目、接技能、接工具，都不必完全依赖云端页面。

如果把它放到研发场景里，Engine 就像本地的 AI 服务底座，桌面端像操作台。你可以先把模型接进去，再慢慢把项目、Agent 和技能加进来。这个思路比“再做一个聊天框”更有想象空间。

## 02、桌面客户端装完就像一个 AI 控制台

桌面客户端的 GitHub 地址是：[harnessclaw/harnessclaw](https://github.com/harnessclaw/harnessclaw)。

Release 页面提供了 macOS 和 Windows 安装包。官方 README 里也写得很清楚，HarnessClaw 是 Electron + React + Vite 的桌面应用。

![](https://cdn.paicoding.com/stutymore/sucai-20260519160340.png)

macOS 用户要注意芯片版本。Apple 芯片下载 `arm64`，Intel 芯片下载 `x64`。这个地方别下错，不然安装后可能打不开，或者打开后表现很奇怪。

Electron 的好处也在这里：它天然就是面向跨平台桌面端的技术栈。对开发者来说，Mac、Windows、Linux 不再是三套完全割裂的客户端，而是可以共用一套前端工程、一套桌面壳、一套产品交互。当前公开安装包我实际看到的是 Mac 和 Windows，Linux 更适合放在“开源工程可构建、跨平台方向明确”的口径里讲。

![](https://cdn.paicoding.com/stutymore/sucai-20260519160547.png)

首次启动后的界面如下所示。

![](https://cdn.paicoding.com/stutymore/sucai-20260519160632.png)

整体界面比较清爽，第一眼不是那种复杂后台，左侧是功能入口，中间是主要工作区，右侧会根据不同页面展示配置或状态。

继续下一步，会让我们选择 API 接入方式。现在大部分 LLM 厂商都提供 OpenAI 或 Anthropic 兼容接口，所以这里不需要纠结太久，关键是后面 Base URL、API Key、Model ID 要写对。

![](https://cdn.paicoding.com/stutymore/sucai-20260519160718.png)

我这次先用 DeepSeek 跑了一遍。

- Base URL：`https://api.deepseek.com/anthropic`
- API Key：在 DeepSeek 控制台创建后复制过来
- Model ID：`deepseek-v4-pro`

后面也可以在设置页继续调整。

![](https://cdn.paicoding.com/stutymore/sucai-20260519163246.png)

HarnessClaw 支持科大讯飞、DeepSeek、GLM 等国产模型，也支持海外模型。对国内用户来说，这个点很关键，因为很多团队现在并不会只用一个模型，常见做法是一个主模型负责日常任务，一个备用模型负责兜底。

任务画像我这里选择的是研发与自动化运维。

![](https://cdn.paicoding.com/stutymore/sucai-20260519161308.png)

然后就进入 HarnessClaw 主界面了。

![](https://cdn.paicoding.com/stutymore/sucai-20260519161517.png)

【此处插入 桌面端模型配置图：截图目标：证明 DeepSeek、GLM 等模型可以在设置中配置；关键词：Model Provider、DeepSeek、GLM；建议位置：HarnessClaw 设置页】

这里可以把 HarnessClaw 理解成三个东西的组合。

第一，它是一个本地桌面端 AI 入口。普通聊天、项目对话、Agent 调用，都能在同一个窗口里完成。

第二，它是一个模型配置中心。你不必把每个模型的 Key 分散放在不同工具里，而是统一在这里管理。

第三，它是一个 Agent 工作台。它不只是问答，还能围绕 Agent、项目、技能、工具去组织任务。

用一句话概括，就是一个“桌面端 AI 指挥台”。这也是我觉得它比普通聊天客户端更值得写的地方。

## 03、多 Agent 聚合管理才是重点

我这次测试时，设置页里可以看到 DeepSeek 和智谱 GLM 都是开启状态。Agent 默认设置里，Primary model 可以选 `zhipu:glm-5.1`，fallback model 可以选 `deepseek:deepseek-v4-pro`，并且 fallback 是启用的。

【此处插入 多模型设置图：截图目标：证明 Primary model 和 fallback model 可以分别配置；关键词：zhipu:glm-5.1、deepseek-v4-pro、fallback；建议位置：HarnessClaw 设置页】

这个功能看起来不花哨，但对真实使用很重要。它直接解决了一个很烦的问题：以前我们用 AI，经常是一个窗口一个模型，一个工具一套 Key，一个项目一套上下文。问 DeepSeek 要切窗口，问 GLM 要切窗口，换到另一个 Agent 又要重新组织提示词。

因为 AI 应用最怕的不是界面不够酷，而是模型一报错，整个工作就卡住。比如我第一次测试时，就遇到过 `bifrost: stream request failed` 这类请求错误。后来配置调通后，普通聊天可以正常返回，我让它“只回复两个字：收到”，它也确实回了“收到”。

这类小测试很有意义。一个 AI 工作台再会讲概念，如果最基础的模型请求不稳定，后面所有 Agent 和 Skill 都没有意义。

多模型配置的价值就在这里：主模型负责主要任务，备用模型在异常时接上。对内容创作、代码审查、资料整理这类工作来说，能稳定完成一次任务，比页面里多几个花哨入口更重要。

但 HarnessClaw 更想表达的不是“我支持很多模型”，而是“我能把多个模型、多个 Agent、多个 Skill 放进一个工作台”。这就是多 Agent 聚合管理。

以前你可能要开四个窗口：一个窗口写文章，一个窗口查资料，一个窗口做代码分析，一个窗口管理 API Key。现在更合理的方式是：人只负责掌舵，把任务说清楚；Agent 负责执行，把合适的能力拿出来用。

我建议文章里的产品主线不要写成“某个模型特别强”，而是写成“多 Agent 聚合管理”。这样就能把 DeepSeek、GLM、讯飞、海外模型、内置专家和 Skill 市场放到一个框架里讲，甲方也更容易接受，因为这不是押注某一家模型，而是把多个模型和多个 Agent 变成可配置、可调度的工作资源。

## 04、真正跑通的是 Specialists

接下来是我最关心的部分：Agent 能不能用。

HarnessClaw 里有内置 Specialists。它们不像普通模型那样只负责聊天，而是有明确分工，比如 writer、researcher、analyst、developer、scheduler、travel planner、recommender 等。

我实测时给 Emma 发了一句：

```text
请调用 Specialists 里的 developer，让它只用一句话说明自己能做什么；不要写文件。
```

这次不是普通回复，而是触发了 `Specialists` 工具卡片。界面里出现了 specialists agent 卡，任务执行完成后，结果回到了主聊天里。

【此处插入 Specialists 调用图：截图目标：证明主助手可以调度 developer specialist 并拿到结果；关键词：Specialists、developer、completed；建议位置：HarnessClaw 聊天页】

这个结果很关键。

因为从产品案例角度看，用户不关心后台有多少配置项，用户关心的是：我发出一个任务后，主助手能不能把任务交给合适的专家，并把结果拿回来。

内置 Specialists 已经具备这个雏形。比如你可以设计一个研发类 case：

- researcher 负责查资料和背景
- developer 负责读代码、解释实现
- analyst 负责总结风险和结论
- writer 负责整理成面向用户的输出

这就和“AI 研发助手”有关系了。不是一个 Agent 从头聊到尾，而是主助手根据任务，把不同部分交给不同专家处理。

如果要拿它满足甲方“Agent 能力展示”的需求，我会优先用这条路径。因为它能把“人掌舵，Agent 执行”讲清楚：用户提出目标，主助手判断任务类型，再把具体动作交给更适合的专家。

## 05、Skill 市场已经能接入仓库并发现技能

除了 Specialists，另一个值得写的是 Skill 市场。

我一开始打开 Skill 市场时，已安装技能是 0，仓库也是 0。这很正常，说明它不是预置一堆不可控插件，而是需要用户自己添加技能源。

这次我添加的是 `openclaw/clawhub` 仓库，地址是：

```text
https://github.com/openclaw/clawhub
```

分支选择 `main`，扫描路径填 `.agents/skills`，展示名填 `ClawHub`。

【此处插入 Skill 仓库添加图：截图目标：证明可以手动添加 Skill 仓库；关键词：ClawHub、.agents/skills、main；建议位置：Skill 市场仓库配置页】

添加后点击刷新，Skill 市场扫描出了 11 个技能，包括：

- `autoreview`
- `clawhub-moderation`
- `clawhub-pr-maintainer`
- `clawhub-ui-proof`
- `convex`
- `convex-create-component`
- `convex-migration-helper`
- `convex-performance-audit`
- `convex-quickstart`
- `convex-setup-auth`
- `crabbox`

【此处插入 Skill 扫描结果图：截图目标：证明 Skill 市场已经发现 ClawHub 中的技能；关键词：autoreview、clawhub-ui-proof、convex；建议位置：Skill 市场列表页】

这里我会写得保守一点：仓库添加和技能发现是可用的，安装某个外部技能还需要进一步确认和测试。

为什么要这样写？

因为这篇文章要可用，不是为了强行夸。Skill 市场最适合承担“生态入口”的定位。也就是说，HarnessClaw 不只想做一个桌面客户端，它还想让用户把不同任务能力装进来，像给 Agent 加工具箱一样扩展能力。

这和甲方需求里的“技能市场”“Agent 能力扩展”是能关联上的。只要 case 设计得务实，就可以写成：先接入 Skill 仓库，再发现可用技能，再让 Agent 在具体项目里调用技能。这个方向比空讲“万能 Agent”靠谱很多。

## 06、Harness 的工程化思维

如果只看界面，HarnessClaw 很容易被误解成一个漂亮点的聊天客户端。

但我体验完更愿意把它叫作 Harness，也就是“把 AI 能力装进一套可控的执行结构里”。它不是让用户不断和模型闲聊，而是把模型、Agent、Skill、项目、会话记录、配置管理放在一个工作台里。

【此处插入 Harness 工程化结构图：截图目标：展示模型配置、Agent 调用、Skill 市场和项目入口的关系；关键词：Model Provider、Specialists、Skill Marketplace、Projects；建议位置：文章配图或产品截图拼图】

这个思路和普通聊天框有明显区别。

普通聊天框的核心是“你问我答”。用户每次都要自己判断该问谁、该怎么问、上下文该放哪里、结果该怎么保存。

HarnessClaw 的核心更像“组织 AI 执行”。用户仍然是掌舵的人，负责决定目标、判断结果、控制边界；Agent 负责执行，负责调用模型、使用技能、处理任务、把结果交回来。

这就是我觉得它适合写给开发者的地方。开发者不缺聊天框，真正缺的是一个能把 AI 能力管起来的工作台。

比如同样是做一次项目分析，普通聊天框通常是这样：

- 打开一个模型窗口
- 粘贴项目背景
- 粘贴代码片段
- 让模型分析
- 再打开另一个工具整理输出

而 HarnessClaw 的叙事可以变成：

- 在一个桌面端里配置模型
- 用项目入口组织上下文
- 通过 Specialists 拆分任务
- 用 Skill 市场扩展能力
- 把结果保留在会话和项目里

这就从“问模型一个问题”变成了“让 Agent 在可控环境里完成任务”。

## 07、我会怎么设计这个 Case

如果要围绕 HarnessClaw 做一篇真正能交付的内容，我会把 Case 定成：

> 用 HarnessClaw 搭一个本地 AI 研发工作台：把多个模型、多个 Agent 和多个 Skill 聚合到一个桌面端里，让人负责决策，让 Agent 负责执行。

【此处插入 Case 路线图：截图目标：展示 Engine、桌面端、模型、Specialists、Skill 市场之间的关系；关键词：Engine、Model Provider、Specialists、Skill；建议位置：文章配图或流程图】

这个 Case 分三步走，刚好对应甲方最关心的三条主线。

第一步，做多 Agent 聚合管理。

这一步不讲复杂概念，就讲一个痛点：以前是一个窗口一个模型，现在是一个桌面端管多个模型、多个 Agent、多个 Skill。截图可以放主界面、模型设置、Specialists 调用结果，读者一眼就能看懂“聚合”的价值。

第二步，强调 Electron 跨平台。

这里可以把安装段落放进去。Mac 有 Apple Silicon 和 Intel 包，Windows 有独立安装包，Linux 可以从 Electron 技术栈和开源工程角度讲跨平台潜力。标题里可以写“Mac/Win/Linux 开发者狂喜”，正文里把口径收住：当前实测安装以 Mac/Win 为主，Linux 更适合讲开源可构建和技术栈方向。

第三步，讲 Harness 工程化执行平台。

这一步就放我们跑通的 Specialists。比如让 Emma 调度 developer specialist 分析一个代码项目：

```text
请调用 Specialists 里的 developer，帮我分析这个项目适合做哪些自动化测试入口，并用三条建议返回。
```

如果要做内容创作，也可以让 writer specialist 接着把 developer 的结论改写成文章段落：

```text
请让 writer 根据 developer 的分析，把结论改写成一段面向技术读者的说明。
```

这个过程能体现“人掌舵，Agent 执行”的产品能力。

Skill 市场可以作为这个 case 的加分项。先展示添加 ClawHub、扫描技能、看到 `autoreview`、`clawhub-ui-proof` 等技能。读者就能明白，HarnessClaw 不是只靠内置能力，它有继续扩展的入口。

这三步连起来，就是一个比较完整的本地 AI 工作台案例。它和 HarnessClaw 当前可用功能匹配，也能满足甲方要看“产品能力”和“使用场景”的需求。

## 08、它和 BF 需求能对上的地方

甲方一般不会只想看一篇安装教程。他们更想看到：这个产品到底能帮用户解决什么问题，功能是不是有可信案例，未来是不是有扩展空间。

从这个角度看，HarnessClaw 目前能和需求对上的点主要有三个。

【此处插入 功能匹配表：截图目标：把甲方需求和 HarnessClaw 可用功能对应起来；关键词：多 Agent 聚合、Electron 跨平台、Harness 工程化；建议位置：文章表格截图或文档配图】

第一，多 Agent 聚合管理。

Engine 加桌面端的组合，适合讲“统一入口”。它不是单次问答工具，而是有项目、Agent、技能、模型这些模块。对读者来说，最直接的价值就是少切窗口，少搬上下文，少在不同模型之间来回复制。

第二，Electron 跨平台体验。

官方工程是 Electron + React + Vite，桌面端体验对开发者友好。Mac 和 Windows 的安装路径很清晰，Linux 可以从开源工程和 Electron 技术栈角度讲扩展空间。这个点适合写成“开发者不再被平台限制在浏览器标签页里”。

第三，Harness 工程化执行平台。

内置 Specialists 能跑通，Skill 市场可以添加外部仓库并发现技能。它能承接“工具、任务、执行”的叙事：人负责提出目标和判断结果，Agent 负责执行具体动作。

所以最好的标题和主线不是“又一个 AI 聊天工具”，而是“本地 AI Agent 工作台实测”。这样更准，也更能把 HarnessClaw 和普通聊天框区分开。

## 09、如果写到简历或项目介绍里

如果有人想把 HarnessClaw 这类项目写到简历里，也可以这样包装，但要写得像真实做过的项目，而不是堆一串名词。

【此处插入 项目介绍截图：截图目标：展示 HarnessClaw 在项目、模型、Specialists 页面中的组合使用；关键词：Projects、Agents、Model Provider；建议位置：HarnessClaw 项目页】

项目名称可以叫：

> 基于 HarnessClaw 的本地 AI 研发工作台搭建与验证

技术关键词可以写：

- Electron 桌面端
- Go Engine
- WebSocket 通信
- 多模型 Provider 配置
- Agent Specialists 调度
- Skill 仓库扩展

项目职责可以写成：

- 完成 HarnessClaw Engine 本地部署，并验证桌面端连接状态
- 接入 DeepSeek、GLM 等模型，验证主模型和备用模型配置
- 测试内置 Specialists 调度能力，验证 developer specialist 可被主助手调用
- 接入 ClawHub Skill 仓库，验证 Skill 市场扫描和技能发现能力
- 梳理多 Agent 聚合管理、跨平台桌面端和 Harness 工程化执行平台的产品卖点

这样写出来，比“使用 AI Agent 提升研发效率”更可信。因为它有部署、有配置、有验证、有边界判断。

真实项目不是所有功能都一次性成熟。能把可用部分跑出来，把不可用部分判断清楚，本身就是产品评测和技术落地里很重要的一环。

## ending

这次体验下来，HarnessClaw 还不是一个“万事都能自动完成”的超级 Agent 平台。

但它已经有了一个很清楚的方向：用本地 Engine 承接能力，用桌面端统一管理模型、项目、Agent 和技能，再通过 Specialists 和 Skill 市场把任务能力扩展出去。

【此处插入 结尾总结图：截图目标：展示 HarnessClaw 主界面、Specialists、Skill 市场三个关键页面；关键词：HarnessClaw、Specialists、Skill Marketplace；建议位置：文章结尾拼图】

如果现在要做一篇对甲方可用的内容，我会把重点放在三句话上。

第一，多 Agent 聚合管理：告别“一个窗口一个模型”。

第二，Electron 跨平台：Mac/Win/Linux 开发者都有参与空间。

第三，Harness 工程化思维：这不是普通聊天框，而是围绕 AI 组织工具、任务流的执行平台。

人掌舵，Agent 执行。这个表达，才是 HarnessClaw 现在最适合打出去的产品定位。
