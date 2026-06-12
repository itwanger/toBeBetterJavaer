---
title: 用Codex+iLink Bot API给Agent接入微信，基于这个开源Skill
shortTitle: 微信里爽用Claude Code
description: 基于 wechat-claude-code 开源方案，用 Codex+Claude Code 在 PaiCLI 中实现微信接入 Claude Code，涵盖 Codex 调研、技术方案设计、iLink Bot API 长轮询消息引擎、安全沙箱和输出适配全流程原理。
keywords:
  - Claude Code
  - 微信
  - PaiCLI
  - iLink Bot API
  - Agent 开发
tag:
  - Agent
  - PaiCLI
category:
  - AI
author: 沉默王二
date: 2026-06-12
---



大家好，我是二哥呀。

昨天看到逛逛开源的 wechat-claude-code，可以在微信里爽用 Claude Code，我就想把这个功能引入到 PaiCLI 中。

现在有了 Codex 和 Claude Code，基本上只要有想法，就可以很快去落地。

给大家展示一下，已经实现了基本的交互哈～

![](https://cdn.paicoding.com/paicoding/bafc66c9cd9284d5b360d5627acb04d1.png)

这markdown也是支持的，分段搞得也是像模像样。

这里多说一句。

PaiCLI 是我用 Claude Code+Codex 开发的一个类 Qoder CLI 的 Agent 工具（主要就是想给大家提供一个 Agent CLI 的实战体验）。

![](https://cdn.paicoding.com/stutymore/sucai-20260612103615.png)

整体的交互体验参考了 Qoder CLI，并且体验还是非常不错的，虽然没办法和顶级的商业产品相比，但阅读代码，做一些多 Agent 调研，使用 Chrome Devtools MCP 打开微信文章，这些基本操作，都已经实现了。

其实之前写 OpenClaw 的微信交互方案的时候，就觉得很有趣。

![](https://cdn.paicoding.com/stutymore/sucai-20260612134514.png)

今天有空，刚好可以实践一下。

我也会把自己完整的开发方案分享出来，供大家在使用 Claude Code/Codex 开发的时候做一些参考。

OK，系好安全带，我们粗粗粗发～

## 01、Codex 调研微信连 CC 的方案

这一步非常关键。

需要先搞清楚，微信连 CC 的技术原理是什么。

直接把这个提示词发给 Codex。

> wechat-claude-code 研究一下是什么原理，为什么能在微信里链接 Claude Code

![](https://cdn.paicoding.com/stutymore/sucai-20260612134012.png)

- 微信侧靠 iLink Bot API，扫码登录、长轮询收消息、发消息、发“正在输入”。这些关键词需要调研清楚。
- 本机 daemon 负责收发与排队，相当于 OpenClaw 当时的 Gateway，方案是长轮询微信消息，拿到消息后进入队列，再调用 Claude
- Claude Code 侧就是启动本地 claude 进程，通过把微信消息写进 stdin，从 stdout 读取 Claude Code 的 stream-json 输出，解析增量文本，再流式推回微信。

整体的技术方案并不复杂。

但为了不出错，我特意补了一手新的信息源。

> 结合 https://paicoding.com/wechat-openclaw 这篇里提到的@tencent-weixin/openclaw-weixin-cli@latest，两个之间有什么关联

![](https://cdn.paicoding.com/stutymore/sucai-20260612134621.png)

刚好我直接在实践微信官方的 clawbot 方案的时候写过一篇帖子，里面提到了 openclaw-weixin-cli 插件。

两种方案结合在一起就可以确认了。

![](https://cdn.paicoding.com/stutymore/sucai-20260612135151.png)

扫码拿 token、getupdates 长轮询收消息、sendmessage 回消息、context_token 路由会话、媒体走 CDN/AES、sendtyping 展示“正在输入”。

搞清楚之后，我们就要 Codex 给我们一个出完整的技术方案了。

![](https://cdn.paicoding.com/stutymore/sucai-20260612134945.png)

一定要确认清楚，Codex 的理解和我们的理解是一致的。

不理解的，就和 Codex 反复沟通。

![](https://cdn.paicoding.com/stutymore/sucai-20260612140003.png)

否则后期开发很容易出错。

所以，大家有没有发现，AI 确实很厉害了，但依然需要我们开发者和 AI 之间保持同频。

如果不能保持同频，你就没办法描述清楚需求，AI 搞错了你也发现不了。

这一点非常非常的关键。

## 02、Claude 再次确认调研

对于我能力之外的需求，我一般还会让 Claude 再次确认一下。

方法很简单。

就是让 Codex 把计划输出到文件中，再把文件交给 Claude。

刚好有最顶级的 Fable 5 可以用，直接让调研分析一番。

![](https://cdn.paicoding.com/stutymore/sucai-20260612135301.png)

- 要做的不是“关 HITL”，而是把交互式审批换成非交互式策略。
- iLink 扫码登录的是一个微信账号，getupdates 会收到所有给这个号发消息的人。如果只校验 boundUserId == sender，那没绑定的人发来的消息怎么处理？

觉得 Claude 说的对的，就可以修改一下开发计划。

![](https://cdn.paicoding.com/stutymore/sucai-20260612135631.png)

如果你没有 Claude，Codex 重新开一个子 Agent 去做这件事也是 OK 的。

> 开一个 subagent 重新审查一下我们的计划，看看有没有漏洞

![](https://cdn.paicoding.com/stutymore/sucai-20260612140111.png)

记住一定要是子 Agent，正所谓旁观者清，当局者迷。

主 Agent 很有可能会陷入定性思维，觉得自己之前的计划是对的。

看到没，AI 时代，并不意味着开发者就可以不动脑子，相反，我觉得，开发者需要比以前更动脑子。

否则你就会跟不上 AI 的理解和能力。

就没办法发挥出 AI 的威力。

啧啧啧。

## 03、开发和测试

开发阶段就很简单了。

> 放到 docs/phase-23-wechat-channel.md 了，开始实施吧

![](https://cdn.paicoding.com/stutymore/sucai-20260612140253.png)

这一步，也可以交给一些物美价廉的 LLM，比如说 DeepSeek V4 Pro，也基本上不会出错。

因为我们已经把开发需求讨论清楚了。

剩下的，其实就看我们个人对产品的把控了。

比如说

> 我觉得整个交互体验有点问题，第一，微信里收到的回复很奇怪啊，思考过程如果要返回给微信侧的话，应该也需要一个正常的 SSE 过程，或者说不需要显示思考过程吧，思考过程应该是在 PaiCLI 这侧显示才对

![](https://cdn.paicoding.com/stutymore/sucai-20260612140628.png)

再比如说交互方式应该优化为，进入 PaiCLI 主交互后输入 /wechat，扫码绑定并后台启动微信通道。

![](https://cdn.paicoding.com/stutymore/sucai-20260612140742.png)

你想要什么样的效果，就反复和 Claude Code/Codex 沟通就好了。

![](https://cdn.paicoding.com/stutymore/sucai-20260612141019.png)

顶级模型的编码能力我觉得都很强了，你想要什么样的功能，什么样的交互体验，基本上都可以实现。

## 04、微信+PaiCLI 的原理

整体架构分三层。

![](https://cdn.paicoding.com/stutymore/wechat-claude-code-paicli-20260612143613.png)

微信用户发一条消息，PaiCLI 本地进程收到后交给 Agent 处理，Agent 的输出再推回微信。

### 连接层：iLink Bot API

iLink Bot API 是微信官方提供的 Bot 网关，所有和微信的通信都经过它。

![](https://cdn.paicoding.com/stutymore/wechat-claude-code-paicli-20260612143550.png)

连接的第一步是扫码登录。

PaiCLI 调用 iLink 的二维码接口，拿到一个临时二维码，用户在微信上扫码确认后，iLink 返回一个 bot_token。

后续所有请求都要带着这个 token，相当于身份凭证。

登录完成后，PaiCLI 会把 token、账号 ID、绑定的用户 ID、工作区路径这些信息持久化到本地的 JSON 文件里。下次启动微信通道时直接读取本地凭证，不需要重新扫码。

![](https://cdn.paicoding.com/stutymore/wechat-claude-code-paicli-20260612143635.png)

只有当 iLink 返回 session expired（错误码 -14）时才需要重新绑定。

收消息用的是长轮询。

PaiCLI 向 iLink 发一个 getUpdates 请求，带上一个同步游标（syncBuf），iLink 会一直连着这个请求，直到有新消息或者超时（默认 35 秒）才返回。

有消息就返回消息列表和新的游标，没消息就返回空。下一轮请求会带上新游标，循环往复。

iLink 会有一个 context_token 字段，用来标识会话上下文。同一个用户在不同聊天窗口发的消息，context_token 是不一样的，回消息的时候要带上对应的 token，否则消息会发到错误的窗口。

长轮询的超时时间也是自适应的。

![](https://cdn.paicoding.com/stutymore/wechat-claude-code-paicli-20260612143652.png)

首次启动用 35 秒作为默认值，之后 iLink 服务端会在响应里带一个建议的超时时间，PaiCLI 据此调整下一轮请求的等待时间。

Agent 任务运行期间，轮询超时会缩短到 3 秒，这样可以更及时地检查 Agent 是否完成和刷新 typing 状态。

![](https://cdn.paicoding.com/stutymore/wechat-claude-code-paicli-20260612143802.png)

发消息用 sendMessage 接口，发“正在输入”状态用 sendTyping 接口。

sendTyping 比较特殊，需要先调一次 getConfig 拿到一个临时的 typing_ticket，再用这个 ticket 去设置状态。每隔 5 秒刷新一次，否则微信那边的“对方正在输入”提示就会消失。

### 消息引擎

消息引擎是整个微信通道的调度中枢。

核心是一个事件循环。PaiCLI 启动微信通道后，进入一个 while 循环，每轮做三件事，检查当前 Agent 任务是否完成、消费消息队列、发起下一轮长轮询。

![](https://cdn.paicoding.com/stutymore/wechat-claude-code-paicli-20260612144900.png)

收到消息后，先做两道过滤。第一道是消息去重，用消息 ID 做判断，避免网络抖动导致同一条消息被处理两次。第二道是身份校验，只处理绑定用户发来的消息，其他人发来的直接丢弃并记录日志。

![](https://cdn.paicoding.com/stutymore/wechat-claude-code-paicli-20260612144009.png)

之后是命令解析。微信用户可以发送斜杠命令来控制通道。

- `/help` 查看帮助
- `/status` 查看通道状态和队列深度
- `/clear` 清空当前会话历史
- `/compact` 手动压缩上下文
- `/pause` 暂停消息消费
- `/resume` 恢复消费
- `/stop` 取消正在运行的 Agent 任务

消息队列是一个先进先出的队列，每次 Agent 空闲时从队列头部取一条消息提交给 Agent 会话。

提交之前先给微信用户发一个“正在输入”的状态提示，Agent 运行期间每 5 秒刷新一次，让用户知道 PaiCLI 在工作中。

消息解析这块也需要处理多种消息类型。iLink 返回的每条消息里有一个 item_list 数组，每个 item 可能是文本、语音转文字、图片或者文件。文本和语音转文字直接拼成提示词，图片和文件会被标记为媒体附件。

### Agent

Agent 负责把微信用户的消息交给大模型处理。

PaiCLI 在启动微信通道时会创建一个 Agent 会话实例，包含一个单线程的异步执行器。

用户消息提交后，Agent 在后台线程里执行，不阻塞消息引擎的事件循环。这样消息引擎可以继续轮询新消息、响应旁路命令、刷新 typing 状态。

上下文管理方面，`/clear` 会清空整个对话历史，`/compact` 会调用 LLM 对当前历史做一次摘要压缩。

### 输出适配

第一，简化 Markdown。去掉代码块的语言标记（`java →`）、去掉标题的 `#` 前缀、去掉加粗的 `**` 标记。

第二，消息分段。微信单条消息有长度限制，适配器把超过 3800 字符的回复按换行符切分成多条消息依次发送。

第三，思考过程和工具调用细节不发到微信，微信用户只收到最终的文字回复。

![](https://cdn.paicoding.com/stutymore/wechat-claude-code-paicli-20260612144809.png)

微信渲染器还做了流式发送。不是等 Agent 完全执行完才一次性推消息，而是每积攒 180 个字符或者每隔 1.2 秒就 flush 一次，让微信用户能实时看到回复在“打字”，体验上更接近聊天而不是等邮件。

## 05、PaiCLI 如何写到简历上？

**项目名称**：PaiCLI 微信通道

**项目简介**：基于 iLink Bot API 的微信接入方案，让用户通过微信消息与本地运行的 AI Agent 交互，支持代码阅读、文件操作、多模型切换等功能。

**技术栈**：Java 21、OkHttp、Jackson、iLink Bot API、长轮询、非交互式安全策略

![](https://cdn.paicoding.com/stutymore/wechat-claude-code-paicli-20260612145927.png)

**核心职责**：

- 基于 iLink Bot API 实现扫码登录和长轮询消息收发，消息延迟控制在 1 秒内
- 设计消息引擎的事件循环和异步队列调度，支持旁路命令即时响应和普通消息排队处理
- 开发双渲染器架构，Agent 输出同时分发到本地终端和微信，微信侧自动过滤思考过程、ANSI 码和 Markdown 格式
- 支持 daemon 后台进程管理，实现 7×24 小时无人值守运行，提供 start/stop/restart/logs 全套运维命令
