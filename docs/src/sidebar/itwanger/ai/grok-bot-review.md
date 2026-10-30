---
title: 自从吸上了 Grok bot，我已经摆脱 Claude 了。
shortTitle: Grok bot 深度实测
description: Grok bot 深度实测与高阶玩法教程。拆解 xAI 持久化云电脑与多子 Bot 矩阵，手把手教你配置热点情报与改稿答疑 Bot，并在云主机中调用 Codex、安装 Pi Agent 接入 DeepSeek API Key 省下干活 Token。
keywords:
  - Grok bot
  - Pi Agent
  - DeepSeek
  - Codex
  - Personal Agent
tag:
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-10-30
---

上周，我的克劳德大姐姐挂了，莫名其妙的原因。当然了，按照 A\ 的尿性也实属正常。

于是我就开始找各种替代品，有 Gemini 4 Argon，有 Codex+GPT-6.1 Sol，有 DeepSeek Harness，当然还有 Grok bot，他们组合在一起，几乎完美承接了 Claude 之前的所有工作。

![](https://cdn.paicoding.com/stutymore/sucai-20261030142835.png)

大致的分工是这样的，有需要的同学也可以作为参考。

Gemini 4 Argon 分担一部分的写作任务，Codex 继续编码+生图+做视频+处理各种杂事，DeepSeek Harness 从昨天开始负责视频生成，主要是 GPT-6.1 Sol 突然开始变得很慢，很慢很慢，以前一个视频 1 个小时肯定能做完，但这几天需要四五个小时。

争点气吧，OpenAI。

接着来说说我的 Grok bot 分工。当然了，我觉得读者的分享更牛逼，大家可以先看下。

![](https://cdn.paicoding.com/stutymore/sucai-20261030144537.png)

>你有试过在gork送的那个云pc装Orc，把它当成一台远程服务器；你的 MacBook 和手机上的 Orc 通过接入，直接控制跑在 Grok Bot 上的 CC吗？这个方案便宜又稳定

我打算后面也试试。

## 01、Grok bot 是什么？

“Grok 送的那个云 PC”，正是 xAI 在 8 月 11 日发布的 Grok bot 最让我喜欢的地方。

官方给 Grok bot 的定义是“your team of always-on agents”，也就是一支 24 小时在线的 Agent 团队。

![](https://cdn.paicoding.com/stutymore/what-is-personal-agent-02-20261011145301-ebc8cbf1.png)

我们平时在本地跑的 DeepSeek Harness 或者 Claude Code，都必须挂在我们自己的电脑上。

Grok bot 走的是云端虚拟主机路线，xAI 给每个账号在云端分配了一台持久化的 Linux 虚拟机，里面配齐了独立的云端浏览器、文件系统、终端和凭证保险箱。

它的记忆、下载到本地磁盘的文件、浏览器里的网站登录状态，都会跨会话保留在云电脑里。遇到需要输入验证码或者复杂交互的网页，还能在桌面端或手机 App 里点一下接管桌面，手动在云端浏览器里输完密码，再把控制权交还给 Bot 继续。

![](https://cdn.paicoding.com/stutymore/grok-bot-review-cloud-pc-20261030160152-639e4567.png)

除了自带一台云主机，Grok bot 还有两个支撑日常干活的机制：

- Routine 例行任务：你把一个网页操作或工作流手把手演示一遍，或者定好触发条件，Grok bot 会把它保存成一个可复用的 Skill，之后按 Cron 定时计划或外部 Webhook 事件自动执行
- 权限与独立审查：操作权限分为允许一次、始终允许和拒绝，遇到付款、外发邮件或修改生产配置这类高风险动作，系统会先交给一个独立的 Auto Review 模型审查一遍，如果你不在电脑前，Bot 发起的审批请求大约 10 分钟后就会自动过期

因为 Grok bot 的云主机本身就是一台拥有完整 Shell 环境、跑在机房的 Linux 机器，你可以在让 Grok bot 干活的同时，把这台机器当成免运维的开发机。

## 02、我的多 Bot 实战

我的 Grok bot 主要负责情报收集，润稿，以及星球答疑等等。

我发现这玩意，把玩性可太高了。

你需要什么，直接让主 bot 帮你创建对应的子 bot 就行。

带金色星标的 `Grok Bot` 是主控 Bot，下面整整齐齐挂着 `Agent bot`、`改稿 Bot`、`星球答疑 Bot`、`写作 Bot` 和 `Pi Bot`。想新增一个角色时，跟主 Bot 说清楚这个新助手要盯什么数据源、按什么时间跑、输出什么格式，主 Bot 就会在同一个云端工作区里帮你把子 Bot 和对应的定时 Routine 建好。

比如我有 Pi bot，主要负责在云主机上做一些开发工作，背后接的 DeepSeek Harness。

比如我有 Agent bot，主要负责帮我收集最新的热点信息，像《王二讲 Agent》里面的热点稿，都是由这个 bot 帮我收集的。

![](https://cdn.paicoding.com/stutymore/sucai-20261030143739.png)

以前我自己找选题，很容易被信息流里的水帖分散精力。现在我给 `Agent bot` 定了一套严格的信源筛选规矩，利用 Grok 原生的 `x_search` 实时检索能力，每天早、午、晚定时跑一趟巡检。

如果你也想在自己的 Grok bot 里养一个同款情报员，把下面这段话发给主 Bot 就能生成。

```text
请帮我创建一个名为「Agent bot」的子 Bot，并配置每天 08:30、12:30、20:00 的定时 Routine。
任务要求：
1. 调用 x_search 扫描过去 8 小时内 AI Agent、大模型发布、AI Coding 工具领域的一手推文与官方博客。
2. 只推送浏览量破 50 万或具备重大工程突破的硬核内容，每条包含：核心技术事实（精确到参数、模型对比与实验数据）、发布时间与互动数据、原帖与高赞转述链接、中文圈传播度，以及 1 个文章标题建议和 1 道对应的工程面试题。
3. 未达标的热点不要刷屏，统一在末尾「没推的几条」中用一句话说明不推的理由（如未官宣泄露、浏览量过低）。
```

抓完热点写好初稿，就轮到下一个主力助手登场了。

比如我有改稿 bot，主要帮我调整一些文字稿，有时候我发现 Gemini 4 Argon 生成出来的我不满意，我就会让改稿 bot 帮我调整一下。

![](https://cdn.paicoding.com/stutymore/sucai-20261030143941.png)

我很喜欢的一个博主范凯就曾说，Grok bot 会路由 Opus 5.5，虽然我用指纹检测器测出来是千问，但多个文本对比，会让我有更多的灵感。

比如说我有星球答疑 Bot，每天监控有哪些读者在提问，提问了什么，我把我已有的服务告诉它，它大致能给我一个不错的草稿。

![](https://cdn.paicoding.com/stutymore/grok-bot-review-multi-bot-20261030161111-bb6095b0.png)

搭这个 `星球答疑 Bot` 的窍门，是在云电脑的工作区目录里放一份我自己的知识库索引文件，把《Java 面试指南》《面渣逆袭》、PaiCLI、派聪明、JobClaw 等项目的技术栈和适用人群写清楚。`星球答疑 Bot` 巡检到新问题后，会先核对提问读者的学历和求职目标，从文档里挑出匹配的路线和项目，写好初稿放进待办列表，我检查确认后再发出去。

## 03、让 Grok bot 调用 Codex 干活

接下来聊聊怎么把 Grok bot 的云电脑变成代码开发基地，让它去调用 Codex。

很多小伙伴可能会好奇，Grok bot 自己就能写代码，为什么还要在里面调 Codex？

原因在于术业有专攻。

Grok bot 的强项是 24 小时驻留云端、监听各路 Webhook 消息、管理定时 Routine 和操作浏览器；而面对几十个文件的工程重构、跨模块符号跳转和反复跑单测修 Bug，Codex 的工具调用和仓库级上下文管理上更加成熟。把 Codex 装进 Grok bot 的云端 Linux 虚拟机里，相当于给一个全天候在线的包工头配了一位顶尖的施工队长。

![](https://cdn.paicoding.com/stutymore/grok-bot-review-codex-20261030161550-e4812e57.png)

配置过程很简单，在 Grok bot 的对话框里让它打开云端终端执行安装命令就行。

```bash
npm install -g @openai/codex
```

装好之后，把你的 OpenAI API Key 或者 `~/.codex/config.toml` 配置写入云电脑的主目录，再用 `git clone` 把常维护的代码仓库拉到云主机的工作区里。

日常调度时，不要让 Grok bot 去模拟交互式按键，改用 Codex CLI 提供的非交互式执行子命令 `codex exec`。你可以给负责研发的子 Bot 写一条明确的调度规则。

```text
当收到代码修复或新功能开发任务时，不要自己直接改大段业务代码，请按以下步骤在云端终端执行：
1. 切换到目标仓库目录，拉取最新分支并创建新特性分支。
2. 在终端运行：codex exec --full-auto "请根据需求完成代码修改并运行单元测试验证：<具体需求描述>"
3. 等待 Codex 执行完毕后，运行 git status 和 git diff --stat 检查变更文件列表。
4. 将变更摘要、单测通过情况汇报给我，经我确认后再执行 git push 并创建 Pull Request。
```

这样一来，云电脑里的 Grok bot 就会在后台拉起 Codex 吭哧吭哧改代码、跑测试。

如果你平时在本地电脑上主力用 Codex，还可以反过来玩。GitHub 上有一个高赞的开源桥接工具 `Walvez/grok-subagent`，它通过 MCP 协议把官方的 Grok Build CLI 包装成一个受控的外部 Sub-agent。你在本地用 Codex 审查代码或者接入新框架时，可以让 Codex 唤起 Grok 去实时检索最新报错讨论。

## 04、安装 Pi Agent 加 DeepSeek

先说说我为什么要在 Grok bot 的云主机上专门装一个 `Pi Agent`。

![](https://cdn.paicoding.com/stutymore/grok-bot-review-20261030154303.png)

Kimi 其实也是基于 Pi 来设计自家的 Harness。

这背后的工程取舍是这样的，“Weak loop, Strong tool”（弱循环、强工具）。

Agent Loop 干的事情各家都没什么差别，无非是上下文拼接、工具调用和兼容不同格式的模型；而在主循环之外，Pi 允许你对 System Prompt、Tool Schema、终端 TUI 界面和 Extensions 扩展系统做深度定制。

如果我们在云电脑里跑大批量代码生成，或者自动化脚本测试，全靠 Grok bot 的订阅是不够用的。

在 Grok bot 的云电脑里装上 `Pi Agent`，再挂上 DeepSeek 的 API Key，就能搭建出一套主从分流架构。

让 Grok bot 负责顶层的定时唤醒、跨应用收发消息和任务拆解，把消耗成 Token 的代码编写、批处理交给跑在云终端里的 `Pi Agent + DeepSeek`。

由于 DeepSeek V4 系列原生支持 `1M` 上下文窗口，且命中 Prefix Caching 的输入 Token 价格只有未命中的十分之一，长期跑下来能帮你省下相当可观的成本。

![](https://cdn.paicoding.com/stutymore/grok-bot-review-20261030155008.png)

下面把在 Grok bot 云主机上安装 `Pi Agent` 并接入 DeepSeek API Key 的完整配置流程放出来，大家可以把整段步骤发给你的 Grok bot，让它在云端终端里自己配好。

先在云电脑终端里安装 Pi CLI。确认云主机的 Node.js 版本在 20 以上，用 npm 全局安装或者执行官方安装脚本。

```bash
npm install -g @mariozechner/pi-coding-agent
# 或者使用官方脚本安装
curl -fsSL https://pi.dev/install.sh | sh
```

## ending

说说我的真实感受。

它最打动我的地方，是把“云端持久化虚拟电脑”和“一句话派生子 Bot”结合在了一起。

以前我们要搭一套 24 小时跑的自动化工作流，得自己买服务器、配 Docker、写定时脚本、管进程保活；现在主 Bot 带着 `Agent bot`、`改稿 Bot`、`星球答疑 Bot` 和 `Pi Bot` 各司其职，关掉电脑照样能替我盯热点、改稿子，再叠加上 Codex 和挂载了 DeepSeek API Key 的 Pi Agent，成本可控，干活也利索。

总体来看，在克劳德缺席的这段日子里，这套多模型加 Grok bot 云主机的组合已经稳稳接住了我的全部日常产出（真的不烧心。

感兴趣的小伙伴不妨照着上面的配置动手搭一套试试。

我们下期见。
