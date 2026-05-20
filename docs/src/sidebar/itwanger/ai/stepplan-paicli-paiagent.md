---
title: 又一款国产模型诞生，StepPlan性价比杀疯了！
shortTitle: 阶跃星辰 Step Plan 实测
description: 阶跃星辰 Step Plan 实测，配合 Claude Code 肝出 PaiCLI TUI 界面，StepAudio 2.5 TTS 接入 PaiAgent 工作流，真实开发者场景体验分享。
tag:
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-05-08
---



大家好，我是二哥呀。

最近高强度体验了一下阶跃星辰 Step Plan，配合 Claude Code 的 Agent 能力，直接肝出来了一个 PaiCLI——类似 Claude Code 那种终端交互体验的 Java 版 Agent。

全程 step-3.5-flash-2603 在干活。

我录个屏，大家感受一下。

【视频】

整体完成度还是非常高的 😄

阶跃星辰 Step Plan 非常良心，不仅支持 LLM 的 step-3.5-flash-2603，还支持 TTS 的 stepaudio-2.5-tts，以及能够绘图的 step-image-edit-2（我打算下一期给 PaiAgent 加一个画板）。

![](https://cdn.paicoding.com/paicoding/99d73c7d7bd52feeaccacb16ef420937.jpg)

StepAudio 2.5 TTS + Step 3.5 Flash LLM 这个 AI 播客工作流，整体的效果也很不错。

来试听一下音频。

【音频】

两个项目一口气跑下来，整体感受就一个字：稳。

![嘿嘿](https://cdn.paicoding.com/paicoding/7a2122be09e3b4780b9b13742ff3945a.png)

国产模型在 Claude Code 这种强无敌的 Harness 架构下，跑起来也是完全超出预期。

这里必须点名表扬一下 A 厂，虽然他的很多做法招人恨，但就这一个 Agent CLI，确实给 AI 的发展提供了无限可能 😄。

刚好最近有不少小伙伴需要 Coding Plan 这种订阅服务，我就把自己的真实体验分享给大家，看看阶跃星辰 Step Plan 到底值不值得冲。

## 01、在 CC 中配置阶跃星辰 Step Plan

第一步，去阶跃星辰的官网开通 Step Plan 账号，然后创建一个 API Key。

![](https://cdn.paicoding.com/stutymore/sucai-20260508151939.png)

阶跃星辰 Step Plan 目前有四档套餐，从 Flash Mini 的 49 元/月到 Flash Max 的 699 元/月。

我订的是季度套餐，日常 Coding 场景够用。

![性价比拉满](https://cdn.paicoding.com/paicoding/2481c1536def4c5a16edddcc409c184e.jpg)

和 GPT-5.5 一样，阶跃星辰 Step Plan 也是每 5 小时刷新一次调用额度，每周刷新一个总额度。

实际跑下来，中间档一天高强度写代码也没碰到过限额，够用。

第二步，使用 PaiSwitch（这是我自己很早起 Vibe Coding 的一个，一直也没宣传）或者 CCSwitch 在 Claude Code 中配置阶跃星辰 Step Plan 的 API Key。


![](https://cdn.paicoding.com/paicoding/e9691707c0c289813eda82bc2f37749b.png)


其中 base URL 填写 `https://api.stepfun.com/step_plan/v1`，模型可以选择 `step-3.5-flash-2603`。

这个模型在代码理解和生成方面表现相当不错。

![](https://cdn.paicoding.com/paicoding/abc5fddfbb24c792456630b1d90aadf7.png)


第三步，启动 Claude Code，重载模型，就可以在 Claude Code 中使用阶跃星辰 Step Plan 的能力了。

可以键入 `/status` 来确认是否生效。

![](https://cdn.paicoding.com/stutymore/sucai-20260508152401.png)

看到模型名切换过来就说明配置成功了。

兼容性做得很到位，凡是支持自定义 base URL 的工具都能无缝接入。

## 02、用 CC 完成 PaiCLI TUI

先交代一下背景。

PaiCLI 是我做的一个 Java CLI Agent，定位类似 Claude Code，但完全用 Java 写的。

核心能力包括 ReAct 推理、Plan-and-Execute 任务拆解、Memory 记忆系统、RAG 语义代码搜索、MCP 工具协议、Skill 专家决策系统等等。

![](https://cdn.paicoding.com/paicoding/bf66178394355d6b8fd486acd5771e39.jpg)

### 分析需求

这一步非常关键。

模型的能力已经非常强了，不管是国产模型，还是顶级的 Opus 4.7 或者 GPT-5.5。

出问题的地方往往在于我们怎么使用 Agent，或者使用了什么样的 Agent 工具。

当然了，不管使用哪一个工具，如果需求分析不到位，后面的交付结果就只能呵呵了。

提示词：`分析一下第 16 期要开发的需求，我们先讨论一下，看看哪些需要调整。`

![](https://cdn.paicoding.com/stutymore/sucai-20260508153208.png)

Claude Code 会从 ROADMAP.md 中提取需求，分析边界，帮我们梳理出几个关键决策点：技

- 术选型是用 Lanterna 还是 JLine？
- 文件树浏览怎么做？
- 代码高亮用什么方案？
- 对话历史可视化怎么设计？

这些问题如果不在动手之前讨论清楚，后面返工的概率极高。

好，接下来我直接把决定权交给 Agent。

提示词：`需要你给一份非常完整的需求文档，你直接出，可以参考前几期。`

![](https://cdn.paicoding.com/stutymore/sucai-20260508154316.png)

Claude Code 这里选择了 Lanterna 3 作为全屏 TUI 的渲染方案，同时保留 JLine 3 作为内联流式渲染的基础。如果我们不确定 Agent 的选择是否靠谱，可以多方求证一下。

![](https://cdn.paicoding.com/stutymore/sucai-20260508154524.png)

比如说可以问一嘴 Gemini，看看它的判断。

![](https://cdn.paicoding.com/stutymore/sucai-20260508154643.png)

最终 PaiCLI 的 TUI 方案确定下来了：

默认走 InlineRenderer（类似 Claude Code 的内联流式输出），可选切换到 Lanterna 全屏三栏布局（文件树 + 对话流 + 状态栏），还有一个 PlainRenderer 作为兜底。三种渲染模式共享同一套 Agent 内核，通过 `PAICLI_RENDERER` 环境变量切换。

这个方案既保证了默认体验的轻量感，又给重度用户留了全屏模式的选择。

没有问题后，就可以让 Agent 狠狠干活了。

### 开始干活

接下来，就是两手一摊，看 Agent 表演了。

![](https://cdn.paicoding.com/stutymore/sucai-20260508155017.png)

已经运行 7 分钟了，还在继续干活，看来任务量不小。

![](https://cdn.paicoding.com/stutymore/sucai-20260508155433.png)

这期间我们完全不需要插手。

step-3.5-flash-2603 在跑长任务上的表现让我挺意外的。

它的推理速度接近 200 tokens/s，根据 Artificial Analysis 的实测数据是 179 tps，在 212 个模型里排第 13 位。

![](https://cdn.paicoding.com/paicoding/30179915f77a7532cb29db396c3e4b37.jpg)

![](https://cdn.paicoding.com/paicoding/00143f96a20cb388e4afa40cc9682e89.png)

更关键的是，它在代码生成场景下的上下文理解很扎实。

7 分钟、十几分钟持续输出代码，逻辑连贯性没出过问题。

要知道 PaiCLI 是一个 Java 项目，技术栈涉及 JLine 3 的终端控制、Lanterna 3 的全屏渲染、ANSI 转义序列处理、DECSTBM 滚动区域设定这些比较底层的东西。

我简单翻了一下 Claude Code 的执行日志，这一轮它做了这些事情：创建了 Renderer 接口和三个实现类、实现了 InlineRenderer 的 DECSTBM 滚动区域控制和底部状态栏、实现了 BlockRegistry 和 ToolCallRenderer 做工具调用的折叠展示、写了 HITL 审批的单字符交互逻辑（输入 y/n/a/s/m 就能决策）、还做了终端能力检测，如果终端不支持滚动区域就自动降级到 PlainRenderer。

整个过程大概改了二十多个文件，新增了十来个类。如果是我自己手写，保守估计得两三天（其实可能得二三十天，给自己脸上贴贴金）。

![](https://cdn.paicoding.com/stutymore/sucai-20260508162208.png)

### 验收结果

我现在的工作流一般是这样的：如果让 Claude Code 先跑，那就用 Codex 来验收交付结果。

反之亦然。

两个 Agent 交叉验证，只要双方都认为 OK，基本上就没啥大问题。

![](https://cdn.paicoding.com/stutymore/sucai-20260508162504.png)

把 Claude Code 生成的代码丢给 Codex review，让它从架构设计、代码质量、潜在 bug 三个维度去分析。

![](https://cdn.paicoding.com/stutymore/sucai-20260508163356.png)

Codex 对这次的代码改动还是非常满意的，给了很高的评价。

这再次说明 step-3.5-flash-2603 的代码能力确实已经到了一个相当不错的水平——不是“能写代码”那种及格线，而是“写出来的代码经得住另一个 Agent review”的水平。

好，激动人心的时刻到了。我们来看一下最终的效果。

![](https://cdn.paicoding.com/paicoding/0af0355f27e5caab631ece82a2ae165d.png)

![](https://cdn.paicoding.com/paicoding/59f1373eb3d0094bfb28194540c70602.png)

当然了，这期间还有很多细节，比如 HITL 审批弹窗的交互、工具调用的折叠展示、内联 git diff 的渲染，很枯燥，我就不一一截图展示了。

![](https://cdn.paicoding.com/stutymore/sucai-20260508173616.png)

只能说 Claude Code 真的太强了，把模型的能力拉满了。

step-3.5-flash-2603 能做到这个效果，离不开 Claude Code 的 Agent 框架。

好马配好鞍，不是没有道理，哈哈。

## 03、StepAudio 2.5 TTS 接入

阶跃星辰 Step Plan 里面不只有文本模型。

还有 StepAudio 2.5 TTS 这个语音合成模型，这是我觉得阶跃星辰 Step Plan 比较有意思的一点，一个订阅搞定文本加语音，不用再单独去接第三方 TTS 服务。

![](https://cdn.paicoding.com/stutymore/sucai-322b2114b3f0729438ac36f14da3eff5.jpg)

刚好 PaiAgent 里有一个 TTS 节点，之前接的是通义千问的 Qwen3 TTS，现在我们把 StepAudio 2.5 TTS 也接进去体验下。

PaiAgent 是我做的另一个开源项目，AI 工作流编排平台，前端 React + ReactFlow 可视化拖拽，后端 Spring Boot 3 + Spring AI。

![](https://cdn.paicoding.com/paicoding/0ea7a6823d8fdb94efc03ed141d83b01.png)

第一步，启动 PaiAgent 后，点击全局配置，把阶跃星辰的 TTS 模型和 LLM 模型配置好。

![](https://cdn.paicoding.com/paicoding/c1c41087ea485a55677550f3a121801d.png)

TTS 模型名填写 `stepaudio-2.5-tts`，LLM 模型名填写 `step-3.5-flash-2603`，API 地址和 API 密钥和之前的一样。

PaiAgent 的 ChatClientFactory 会根据供应商名称自动匹配对应的 API 协议，阶跃星辰走的是 OpenAI 兼容接口，配起来没有额外的适配成本。

> PS：这个全局的模型配置也是 Step 3.5 Flash 2603 完成的，老读者应该还有印象。我之前也分享过。

第二步，配置好 AI 播客的工作流。四个节点串起来：输入 → 大模型文本生成 → TTS 音频合成 → 输出。

![](https://cdn.paicoding.com/stutymore/sucai-20260508202633.png)

LLM 节点和 TTS 节点都选择我们刚刚配置好的阶跃星辰供应商。

然后点调试，输入“阶跃星辰 Step Plan 真不错啊”，点执行工作流。

![](https://cdn.paicoding.com/stutymore/sucai-20260508202131.png)

很快，30 秒，音频文件就拿到了。

StepAudio 2.5 TTS 支持单次最多 1000 个字符的输入，PaiAgent 的 TTSNodeExecutor 会自动按标点符号切分长文本，用 CompletableFuture 并行处理每个文本块，最后把 WAV 音频合并。

所以即使输入一篇上千字的文章稿，也能很快拿到完整音频。

这个音频的质量让我挺惊喜的，语音自然流畅，完全没有机械感。

StepAudio 2.5 在语气停顿和情感表达上很自然，尤其是语句之间的衔接不会有那种“一字一顿”的割裂感。

【音频】

当然了，TTS 的音色选择也很丰富。

StepAudio 2.5 TTS 默认用的是“磁性男声”（cixingnansheng），还可以通过 instruction 参数调整语速、音量和说话风格，最长支持 200 个字符的指令描述。

![](https://cdn.paicoding.com/stutymore/stepplan-paicli-paiagent-20260508230409.png)

StepAudio 2.5 能处理 1000 个字符，分块次数少，合成速度明显很快，音频衔接处的停顿也很自然。

对于做 AI 播客、有声读物、语音助手这些场景，可玩性很高。

我甚至在想，后面要不要在 PaiAgent 里做一个“每日技术播报”的工作流模板，早上自动抓取 GitHub Trending，用 LLM 生成播报文案，再用 StepAudio 合成音频，推到飞书群里。整个流程在 PaiAgent 里四五个节点就能搞定。

## 04、Step 3.5 Flash 2603 很强

聊完体验，我们来看看数据。

毕竟感受是主观的，数据不会骗人。

step-3.5-flash-2603 的架构是稀疏 MoE（混合专家模型），总参数量 196B，但每个 token 只激活 11B 参数。45 层 Transformer，每层 288 个路由专家加 1 个共享专家，Top-8 激活。支持 256K 上下文窗口。

翻译成人话就是：模型很强壮，但跑起来很轻快。因为每次推理只用到一小部分参数，所以速度快、成本低。

![](https://cdn.paicoding.com/stutymore/stepplan-paicli-paiagent-20260508232941.png)

如果聚焦到 Coding 和 Agent 这两个场景，step-3.5-flash-2603 的表现确实是第一梯队的。

还有一个值得一提的能力：

阶跃星辰 Step Plan 里有一个 step-router-v1 智能路由模型，它会根据任务复杂度自动调度不同模型。

简单任务走轻量模型省额度，复杂任务走重量级模型保质量。对于 Agent 场景来说很实用——Agent 一轮对话里可能有“读个文件名”这种简单操作，也有“重构一整个模块”这种重活，用路由模型自动调度比我们手动切换省心得多。

![](https://cdn.paicoding.com/stutymore/stepplan-paicli-paiagent-20260508233228.png)

另外阶跃星辰 Step Plan 还包含 stepaudio-2.5-asr（语音识别）和 step-image-edit-2（图片编辑）这些多模态能力，一个订阅覆盖了文本、语音、图像三个方向。

对于想做多模态 Agent 的开发者来说，不用到处开账号、到处充钱，一个阶跃星辰 Step Plan 就够了。

## 05、简历怎么写？

### PaiCLI — Terminal-First Agent IDE

**项目简介**：基于 Java 17 的终端 AI Agent，支持 ReAct 推理、Plan-and-Execute 任务拆解、Memory 记忆系统、RAG 语义代码搜索、MCP 工具协议和 Skill 专家决策系统，提供三种渲染模式的 TUI 交互体验。

**核心职责**：

- 基于 ReAct 框架实现 Think-Act-Observe 推理循环，支持多轮工具调用和上下文追踪，Agent 任务完成率提升至 89%
- 设计并实现 Renderer 抽象层，支持 InlineRenderer（DECSTBM 滚动区域）、LanternaRenderer（全屏三栏）、PlainRenderer 三种渲染模式，终端兼容性覆盖率达 95%
- 基于 SQLite 向量存储和 JavaParser AST 分析实现 RAG 语义代码搜索，top-5 召回准确率 82%
- 实现 MCP 协议适配层，支持 stdio 和 Streamable HTTP 两种传输方式，已接入 Chrome DevTools 等 5 个 MCP Server

![](https://cdn.paicoding.com/paicoding/e1366f6555dfeb3607a94a7ecdb933cf.png)

### PaiAgent — AI 工作流编排平台

**项目简介**：企业级 AI 工作流可视化编排平台，前端基于 React + ReactFlow 实现拖拽式流程设计，后端基于 Spring Boot 3 + Spring AI 实现多模型调度和 DAG 引擎执行。

**核心职责**：

- 基于 Kahn 算法实现 DAG 拓扑排序引擎，支持条件分支和循环节点，工作流执行延迟 P99 < 200ms
- 设计 ChatClientFactory 动态工厂，运行时根据节点配置创建 ChatClient 实例，支持 OpenAI、DeepSeek、通义千问、智谱、阶跃星辰等 6 家模型供应商热切换
- 实现 TTS 节点执行器，支持 StepAudio 2.5 和 Qwen3 两种 TTS 引擎，基于 CompletableFuture 并行处理文本分块，单次合成延迟降低 60%
- 集成 LangGraph4j 状态图引擎，支持条件路由和动态分支，覆盖多轮对话、文档审批等复杂编排场景

## ending

说实话，这次体验下来，阶跃星辰 Step Plan 给我最大的感受是它在真实开发场景里的“可用度”。

用 step-3.5-flash-2603 配合 Claude Code 完成 PaiCLI TUI 模块的开发，从需求分析到代码生成到交叉验证，中间没出过大的 bug。

49 一个月的订阅价格，对于每天都在跟 Agent 打交道的开发者来说，绝对是一笔很划算的投资。

如果是像我这样每天用 Claude Code 写代码、用工作流跑任务的场景，阶跃星辰 Step Plan 确实值得一试（包年会更划算）。

> https://platform.stepfun.com/plan-subscribe


![](https://cdn.paicoding.com/paicoding/152c6c49e23b0bcb7031251523f87e52.png)



【**好的工具从来不是让我们多一个选择，而是让我们少纠结一次**。】

我们下期见。

