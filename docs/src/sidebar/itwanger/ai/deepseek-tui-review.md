---
title: 叫板Claude Code，12M的DeepSeek TUI真有点东西啊
shortTitle: DeepSeek TUI 实测
description: DeepSeek TUI 深度实测，12MB 的 Rust 终端 Agent，和 Claude Code 到底差在哪？
tag:
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-05-09
---

大家好，我是二哥呀。

先叠个甲，我是 Claude Code 的重度用户，也是 Codex 的重度用户，所以这篇不会贬低 Claude Code 来凸显 DeepSeek TUI。

那为什么我还要推荐 DeepSeek TUI？

因为萝卜白菜各有所爱，另外我自己最近也在肝一款类似 Claude Code 的 CLI Agent，多体验几种工具，会让我更多的灵感和想法去完善 PaiCLI。


![](https://cdn.paicoding.com/paicoding/a32b8f4c773b2c15ef2f02d69992bf91.jpg)


![](https://cdn.paicoding.com/stutymore/sucai-20260509101934.png)

师夷长技以制夷，哈哈。

况且 DeepSeek TUI 竟然是一个外国老哥鲸鱼兄弟搞出来的，GitHub 飙升到 21k star 了。

![](https://cdn.paicoding.com/stutymore/sucai-20260509101712.png)

如果有小伙伴正在寻求一款 CLI Agent，或者本身就是 DeepSeek V4 的重度用户，那可以体验一下。

最大的优点是：和 DeepSeek 融为一体，上层任务默认用 DeepSeek V4 pro，一些简单认为会切到 DeepSeek V4 flash，token 上能省则省。

之前卡神说 Claude Code 和 DeepSeek V4 的适配不是特别丝滑，虽然我个人并没有这种感受。

我也是第一次用 DeepSeek TUI。


![](https://cdn.paicoding.com/paicoding/f7ff0c44c6ec0092b66ec7df0f432a47.png)


说实话，目前也是抱着怀疑态度 😄。

## 01、DeepSeek TUI 安装

> https://deepseek-tui.com/zh/install

外国老哥还特意做了一个中文版的安装手册，非常详细，我第一眼看到的时候，也是稍微有点震惊，太用心了兄弟。

![](https://cdn.paicoding.com/stutymore/sucai-20260509102711.png)

我这里选用的是第二种安装方式。

> npm install -g deepseek-tui

![](https://cdn.paicoding.com/stutymore/sucai-20260509102853.png)

执行`deepseek-tui` 或者 `deepseek` 就会看到这样一个界面。

![](https://cdn.paicoding.com/stutymore/sucai-20260509102829.png)

语言一共有四种。

![](https://cdn.paicoding.com/stutymore/sucai-20260509103023.png)

按 4 选择简体中文。

![](https://cdn.paicoding.com/stutymore/sucai-20260509103100.png)

按 1 选择信任整个文件夹。

![](https://cdn.paicoding.com/stutymore/sucai-20260509103200.png)

然后就可以直接对话了。

我这里竟然跳过了 API key 的接入，可能我之前哪里配置过，直接读取了，我也是很不解。

问了一嘴，原来是我之前已经配置过了，虽然我也不记得我配置过，但无所谓了，用就用呗。

![](https://cdn.paicoding.com/stutymore/sucai-20260509103559.png)

总之这个交互体验是和 Claude Code 完全不同的。

我个人的第一感觉还是非常喜欢的。

尤其是底部这个花费统计，和 cache 命中，让我就觉得很省心，很有安全感。

## 02、偷师 DeepSeek TUI

我已经把 DeepSeek TUI 的代码下载到本地了，先偷师一把。

> 请分析一下这个项目，有哪些值得学习、深挖的地方，尤其是原理、底层的东西。

![](https://cdn.paicoding.com/stutymore/sucai-20260509104806.png)

执行任务的时候，DeepSeek TUI 有一个海浪的动画，感觉人的多巴胺都变多了，太棒了。

DeepSeek TUI 有一个非常贴心的小功能，支持右键，比如说鼠标在某一段落，右键就可以粘贴出来。

![](https://cdn.paicoding.com/stutymore/sucai-20260509105129.png)

我随便抽一部分大家感受下。

```
▏
▏ 一、最值得深挖的模块（按学习价值排序）
▏
▏ - 事件驱动架构：Engine 在后台 tokio 任务中运行，通过 mpsc::channel 与 TUI 前端通信。
▏   EngineHandle 暴露 send(Op) 和 rx_event，TUI 端只管发操作收事件。
▏ - Turn Loop：handle_deepseek_turn() 是 600+ 行的核心循环，每一步：
▏ 1. 检查取消、steer 输入
▏ 2. 自动压缩（如果消息太多）
▏ 3. 容量护栏检查（Capacity Guardrails）
▏ 4. 构建请求 → 流式调用 LLM
▏ 5. 解析 SSE 事件（thinking / text / tool_calls）
▏ 6. 并行/串行执行工具
▏ 7. 注入 tool_result 回对话 → 循环
▏ - 流式透明重试（#103）：当 HTTP/2 连接中途断开且还没有任何 content
▏   时，自动重发请求（最多 3 次），而不是把断连报给用户。这个设计在长 thinking 的 V4
▏   模型下特别关键。
▏ - 子 Agent 完成回调（#756）：当父 Agent 调用 agent_spawn 后，子 Agent 完成后通过
▏   tx_subagent_completion 回到父 Agent 的 turn loop，父 Agent 会把 sentinel
▏   注入对话历史——保证即使父 Agent 的 turn 已经结束也不会丢失子 Agent 结果。
▏ - 循环防护：LoopGuard 检测连续相同的 tool call（防死循环），AttemptDecision /
▏   OutcomeDecision 控制是否 halt。
```

整个交互体验，越用越喜欢，头部的进度条，内容的输出折叠，高亮显示，作者确实有水平。

![](https://cdn.paicoding.com/stutymore/sucai-20260509110124.png)

不过也不是完全没有缺点，在修改文件上感觉耗时比较长，我让修改 roadmap.md 加一些任务，明显感觉卡顿严重，任务几乎停止。

![](https://cdn.paicoding.com/stutymore/sucai-20260509110900.png)

这个咱真的有一说一，不黑不吹。

我是强制 ctrl+c 中断后重新执行的任务。

![](https://cdn.paicoding.com/stutymore/sucai-20260509111546.png)

毕竟这 DeepSeek TUI 没上线多久，这个问题也是情有可原。

## 03、DeepSeek TUI 小试牛刀

我的第一个任务是，让 DeepSeek TUI 帮我做一个 PaiCLI 的官方网站，参考 `https://deepseek-tui.com/zh`，看看最后的效果怎么样。

![](https://cdn.paicoding.com/paicoding/6784ddb9d4cad0fa4b6121e2ddfe5032.jpg)

让我比较惊喜的是，DeepSeek TUI 在拿到任务后，先进入了一段比较长的思考过程，然后拆出了技术选型、目录结构、页面设计三个子任务，自己一步步推进。

![](https://cdn.paicoding.com/paicoding/6784ddb9d4cad0fa4b6121e2ddfe5032.jpg)

![](https://cdn.paicoding.com/paicoding/ca5f94b086c18bfe71ee6233be9abebc.jpg)

最终生成出来的网站，首页有 hero banner、功能特性卡片、安装命令展示、底部 footer，布局上确实参考了 deepseek-tui.com 的风格。

![](https://cdn.paicoding.com/paicoding/aa9fe98fdb2bb35751157a87d8f07953.jpg)

我认为结果还是牛逼的。

DeepSeek V4 本身还是文本模型，不是多模态，所以前端这块能力有限，期待 DeepSeek 的多模态。

## 04、Rust 双二进制架构

说完体验，来聊聊 DeepSeek TUI 底层让我觉得最有意思的东西。

这个项目的架构和 Claude Code、Codex 都不一样。

Claude Code 是 TypeScript 写的，Codex 也是 TypeScript，DeepSeek TUI 用的是 Rust + ratatui。

![](https://cdn.paicoding.com/paicoding/95517cd163d166fc775c63a4ed8b7acf.jpg)

更有意思的是它的双二进制设计。

项目编译出来两个可执行文件：`deepseek` 和 `deepseek-tui`。

- `deepseek` 是调度器，负责解析命令行参数、管理配置、分发任务；
- `deepseek-tui` 是运行时，负责终端界面渲染和 Agent 逻辑执行。

两者通过进程间通信协作。

再看它的工具调用体系，通过七类注册表来管理：

- Shell 执行终端命令
- 文件操作负责读写编辑
- Git 做版本控制
- 网络搜索做在线检索
- 子代理负责任务分发
- MCP 连接外部服务器
- RLM 做并行推理。

每一类工具都有独立的注册和发现机制，扩展新工具只需要往对应的注册表里加就行了。

![](https://cdn.paicoding.com/paicoding/6b2dcfb88c54c7158c92eafbdd239905.jpg)

我在偷师的时候重点看了 Turn Loop 的实现。

`handle_deepseek_turn()` 这个函数有 600 多行，是整个 Agent 的心脏。

每一轮循环的流程是这样的：

![](https://cdn.paicoding.com/paicoding/e22cc165df4c56a982dc05935c3f308c.jpg)

先检查用户有没有取消或者插入新指令，然后判断上下文是不是快撑爆了需要压缩，接着做容量护栏检查，构建请求发给 LLM，解析流式返回的 SSE 事件（分 thinking、text、tool_calls 三种），执行工具拿到结果，注入回对话历史，进入下一轮。

这个循环里藏了一个特别巧妙的设计：流式透明重试。

当 HTTP/2 连接中途断开，但还没有返回任何 content 的时候，DeepSeek TUI 会自动重发请求，最多重试 3 次，用户完全无感知。

还有一个细节值得一提：循环防护机制 LoopGuard。

它会检测连续相同的 tool call，防止模型陷入死循环。比如模型反复执行同一条命令拿到相同结果，LoopGuard 会介入决定是否终止。

## 05、思维链和百万上下文

DeepSeek V4-Pro 在给出最终回答之前，会先在 `reasoning_content` 字段里输出一段完整的思考过程。

DeepSeek TUI 在展示方式上做得不错。

它把思维链以流式形式展现在一个独立面板里，用户可以实时看到模型在想什么、在分析什么、在哪个环节改变了判断。

![](https://cdn.paicoding.com/paicoding/bd1e60eb885a36eea5a44fcc86826d61.png)

再说百万 token 上下文。DeepSeek V4 原生支持 1M token 的上下文窗口，DeepSeek TUI 把这个能力用到了极致。

DeepSeek TUI 在容量接近上限时会自动压缩历史记录，压缩策略优先保留前缀部分，因为 DeepSeek 的 API 计费规则里，命中前缀缓存的 token 成本只有未命中的十分之一。

![](https://cdn.paicoding.com/paicoding/98fc4e485a7e7ef1f4af79f9e021de00.png)

这就意味着，同样一个长会话，DeepSeek TUI 通过精心设计的压缩策略，能把 API 费用控制在一个比较合理的水平。

## 06、RLM 并行子代理

RLM 是 DeepSeek TUI 自己造的一个概念，全称是 Reinforced Language Model 并行推理。

简单说就是一个主 Agent 可以同时召唤 1 到 16 个子 Agent，每个子 Agent 跑的是更便宜的 DeepSeek V4-Flash 模型，大家并行干活，最后主 Agent 汇总结果。

![](https://cdn.paicoding.com/paicoding/256e9ef74acaed0ec5a611fc5e420301.png)

V4-Flash 的输出成本大约是 V4-Pro 的三分之一。

## 07、三档交互模式

DeepSeek TUI 的交互模式分三档：Plan、Agent、YOLO。

Plan 模式是只读的。模型可以分析代码、读取文件、搜索内容，但不能执行命令、不能修改文件、不能写入任何东西。

Agent 模式是默认状态，所有涉及修改的操作都需要人工确认。这和 Claude Code 的默认行为基本一致，每次写文件、跑命令前都会停下来等你按回车。

YOLO 模式最刺激。在受信任的工作区内，所有操作自动执行，不需要逐条审批。

![](https://cdn.paicoding.com/paicoding/fb0792e2bc6bceb27068804d61d7c686.png)

我个人比较喜欢 YOLO 模式的设定，直接 TAB 键切换。

![](https://cdn.paicoding.com/paicoding/04e0e27f5fa721282205550e35a438ae.jpg)

Claude Code 虽然也有类似的 `--dangerously-skip-permissions` 参数。

## 08、Skills 兼容和 MCP 生态

DeepSeek TUI 在生态上完全兼容 Claude Code 的 Skills 系统。

它的技能发现机制支持多个路径，既认 `.claude/skills` 目录，也认 `~/.deepseek/skills` 目录。如果你之前给 Claude Code 写过 Skills 文件，直接拿过来就能用，不需要做任何改动。

![](https://cdn.paicoding.com/paicoding/b838f65f893cb40360689051d9f97d2d.png)

MCP 方面也是标准实现，通过 stdio 传输协议连接各类 MCP 服务器。

对于已经在 Claude Code 上积累了大量 Skills 和 MCP 配置的开发者来说，试用 DeepSeek TUI 几乎是零门槛的。

## ending

用了一上午 DeepSeek TUI，说说我最真实的感受。

它确实有不少粗糙的地方。

文件写入偶尔卡死，长任务稳定性还需要打磨。

但它也有让我眼前一亮的东西——界面交互耳目一新。

![](https://cdn.paicoding.com/paicoding/28f7e0935d1ef6194faee426a5cc5b59.jpg)

**【我目前的心态就是拿 DeepSeek TUI 作为一个备选选项。】**

Claude Code 一直给我的感觉就是畏惧，总有点担心，和 Codex 不一样，并且 DeepSeek V4 在文本能力上，尤其是中文场景，真不错。

我们下期见。

