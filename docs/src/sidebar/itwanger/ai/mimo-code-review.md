---
title: 小米版Claude Code正式发布，这次开源给到夯。
shortTitle: MiMo Code测评
description: MiMo Code 是小米 MiMo 团队开源的终端编程 Agent，针对长程自动化编程任务设计，围绕计算、记忆、进化三大核心，实测安装配置和实战表现。
keywords:
  - MiMo Code
  - 小米编程Agent
  - Claude Code替代
  - AI编程工具
  - 长程编程任务
tag:
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-06-11
---

大家好，我是二哥呀。

MiMo Code 0.1 板正式发布，并采用 MIT 许可协议正式开源。支持：

- MiMo Auto（限时免费），想薅 token 的小伙伴请抓紧
- 小米 MiMo 平台 OAuth 登录
- 从 Claude Code 导入一键迁移已有认证
- 自定义 Provider，可添加任意 OpenAI 兼容的 API

安装方式非常简单，一行命令搞定：`curl -fsSL https://mimo.xiaomi.com/install | bash`。

![](https://cdn.paicoding.com/stutymore/sucai-20260611070051.png)

这个安装界面的颜值整的还挺高，不得不说，兄弟姐妹们，小米在外观这方面确实有一套。

内部集成了 `https://ai-sdk.dev/` 的 SDK，支持多种模型和平台的无缝对接。还有 `https://models.dev/` 的模型库，提供丰富的预训练模型选择。

## 01、安装和上手

官方说启动方式非常简单，直接 `mimo` 就行，但实际体验下来，这块是没有做好的，我河边直接报错了。

![](https://cdn.paicoding.com/stutymore/sucai-20260611070734.png)

好在Warp提供了默认的Agent服务，按照提示修复一下就好。

![](https://cdn.paicoding.com/stutymore/sucai-20260611071110.png)

给大家也看一下解决方案。

![](https://cdn.paicoding.com/stutymore/sucai-20260611071151.png)

就是重新执行一下source，让环境变量生效。或者新开一个终端。

![](https://cdn.paicoding.com/stutymore/sucai-20260611071539.png)

好家伙，开屏还有流星划过。

输入 `/connect` 我们连一下服务商。

![](https://cdn.paicoding.com/stutymore/sucai-20260611071844.png)

为了方便，我们就选择auto，这样可以免登录。

顺带再配一下DeepSeek V4吧，同样执行 `/connect`，选择 DeepSeek 供应商，然后输入 API Key，再选择要接入的模型即可。

![](https://cdn.paicoding.com/stutymore/sucai-20260611072153.png)

## 02、Harness 架构总览

整体的Harness做的还是很全面的，在 计算、记忆、进化上下了大功夫。

![](https://cdn.paicoding.com/stutymore/sucai-20260611072444.png)

主要解决了两个问题。

第一，由于上下文窗口终将会被耗尽，所以除了要做必要的摘要压缩，还要能在检索和存储方面做得更好，让Agent能够更智能的持久化写入和召回关键信息。

第二，由于模型的指令遵循会随着输入长度的增加而变差，所以需要通过必要的机制来提升 Agent 的指令遵循能力，保证它在长对话中的表现。

## 03、给 PaiCLI 做宣传页

我们的第一个任务是：

>为我们的PaiCLI做一个宣传页，参考https://mimo.xiaomi.com/mimocode

![](https://cdn.paicoding.com/stutymore/sucai-20260611073208.png)

来看看MiMo Code的表现。

![](https://cdn.paicoding.com/stutymore/sucai-20260611075323.png)

很可惜，先用了Web fetch，没拿到结果，然后又准备用 CDP，结果还是没拿到。

那我们必须上点家法了。

![](https://cdn.paicoding.com/stutymore/sucai-20260611075557.png)

让MiMo Code先安装一下web-access这个Skill。

>安装一下https://github.com/eze-is/web-access 这个Skills，然后你就能获得到网页了。

从输出上能看到，用了 Claude Code的默认目录。

![](https://cdn.paicoding.com/stutymore/sucai-20260611075707.png)

按理说，我之前在Claude Code中安装过的，但不知道为什么还需要重新安装。

不管了。

![](https://cdn.paicoding.com/stutymore/sucai-20260611075829.png)

给权限。

能看到这次 CDP 代理已经启动了。

![](https://cdn.paicoding.com/stutymore/sucai-20260611075913.png)

继续给权限。

![](https://cdn.paicoding.com/stutymore/sucai-20260611075945.png)

这次能获取页面内容了。

![](https://cdn.paicoding.com/stutymore/sucai-20260611080024.png)

搞清楚了网站的设计风格：浅色暖调背景、极简排版、PingFang SC 字体、终端安装命令。

开始重新设计 PaiCLI 宣传页。

等一下，看看MiMo Code的表现。

![](https://cdn.paicoding.com/stutymore/sucai-20260611080546.png)

搞定了，我们来打开看看效果，整体风格确实还很不错。

![](https://cdn.paicoding.com/stutymore/sucai-20260611080703.png)

![](https://cdn.paicoding.com/stutymore/sucai-20260611080743.png)

MiMo Code 还支持运行时新指令排队。

![](https://cdn.paicoding.com/stutymore/sucai-20260611084027.png)

完工后我们直接配置个子域名，大家可以直接访问体验一下。

>https://paicli.paicoding.com/

![](https://cdn.paicoding.com/stutymore/mimo-code-review-20260611114739.png)

## 04、用算力换可靠性

前面提到了 MiMo Code 围绕计算、记忆、进化三个主题设计 Harness，接下来逐个拆解。

先看计算。

一个编程 Agent 的基本结构是把语言模型放进一个运行时中循环调用，模型负责推理和决策，运行时负责管理工具、持久化状态、组装每一轮的输入。模型本身是无状态的，每次调用都从空白开始，所有连续性由运行时提供。

![](https://cdn.paicoding.com/stutymore/mimo-code-review-20260611120113.png)

对于短任务（10 轮以内），这个结构没问题，把完整对话历史传给模型就行。但当任务规模达到几十步甚至上百步时，每一步的错误率会被累积放大，Agent 在长程运行中又缺乏外部纠正信号。

MiMo Code 的思路是在不同粒度上投入额外的计算来换取可靠性。



### Max Mode

Max Mode 是 MiMo Code 最有意思的一个设计。

每一轮决策时，它并行生成 N 个候选方案（默认 N=5），每个候选独立完成推理和工具调用规划，但不实际执行。然后由同一个模型作为 judge，对比所有候选的推理过程和行动计划，选出最优的一个执行。

默认使用 temperature=1 进行 5 次独立采样，几乎不会产出相同结果。如果多个候选方案恰好指向同一个方向，这本身就表明该方向的置信度高；而当候选之间差异较大时，由低温度的 judge 从中选出最稳健的方案，比依赖单次采样更可靠。

![](https://cdn.paicoding.com/stutymore/mimo-code-review-20260611120219.png)

在 SWE-Bench Pro 上，Max Mode 相比单次采样提升了 10-20%，代价是约 4 到 5 倍的 token 消耗。这个代价不小，但对于那些一步走错全盘皆输的长任务来说，值得。

目前 Max Mode 仅为实验性功能，需要手动配置开启。MiMo Code 的配置文件路径是项目级 `.mimocode/mimocode.json` 或全局 `~/.config/mimocode/mimocode.json`，在其中设置 `experimental.maxMode` 为 `true` 即可。



### Goal

Max Mode 解决的是"做对"，Goal 解决的是"做完"。

长任务中有一种非常常见的失败模式，Agent 在后续轮次看到之前已有的进展，就倾向于提前宣称"完成了"或者反过来向用户提问。

Goal 的机制是。

![](https://cdn.paicoding.com/stutymore/mimo-code-review-20260611121225.png)

用户设定一个自然语言描述的停止条件，比如"所有测试通过且代码已提交"。Agent 每次尝试终止时，系统自动发起一次独立的模型调用来审查完整对话历史，判断条件是否真正满足。如果未满足，把具体差距反馈给 Agent，让它继续干；如果确认无法完成，则判定为不可能并退出。

这个验证者不参与实际工作，因此不会对 Agent 已完成的部分产生认同偏差。它每次获得与 Agent 完全相同的上下文，包括工具的实际输出。实际运行中，误拦比漏放更常见，整体死循环概率小于 0.5%，到达上限后会自动退出。

Max Mode 是并行维度，同一步花 N 倍算力选最优；Goal 是串行维度，在同一个任务上做更长的自我检查和执行。

两者可以同时启用。

### Dynamic Workflow

当任务规模足够大时，比如将整个项目从一种语言迁移到另一种语言，需要同时协调几十甚至上百个并行工作单元，逐轮的工具调用就不够用了。

传统的做法是把流程写进 Skill 文件，用自然语言告诉模型"先做 A，再做 B，如果 C 就做 D"。

这在简单场景下能用，但在复杂流程中会系统性失效，上下文压缩可能吞掉步骤、模型可能跳过某些环节、分支和重试逻辑靠模型判断而非代码保证、同一流程两次执行路径不同。

问题的本质在于，编排逻辑以自然语言存在，而自然语言是模糊的、可遗忘的、不可验证的。

Dynamic Workflow 把编排逻辑变成了代码。

![](https://cdn.paicoding.com/stutymore/mimo-code-review-20260611122030.png)

主 Agent 会生成一段 JavaScript 脚本，在隔离沙箱中确定性执行。

脚本通过 `agent()` 派出 Sub-agent，通过 `parallel()` 和 `pipeline()` 控制并发。

MiMo Code 的实现兼容了 Anthropic Dynamic Workflow 的核心语义，在此基础上做了几项扩展。

- `workflow()` 允许脚本调用其他脚本，使编排逻辑可以复用和组合；
- 每个 `agent()` 调用的结果同步落盘，进程中断后可从日志恢复而非从头重跑；沙箱内可直接读写文件。

换个角度来看，Skill 是用自然语言写的 SOP，Workflow 是用代码写的 SOP。

## 05、让上下文无限延伸

把会话想象成一串从左到右排开的对话轮次。

窗口是有上限的，轮次在不断累积，窗口最终会被填满。如果不干预的话，会话到达上限时要么结束，要么悄悄退化。

MiMo Code 的做法是在窗口到达上限之前的几个固定位置介入，这些位置被称为 checkpoint。

![](https://cdn.paicoding.com/stutymore/mimo-code-review-20260611121934.png)

每个 checkpoint 处派出一个独立的 writer Sub-agent，读取所有对话，将结构化状态写入磁盘。主 Agent 继续工作，writer 并发执行，互不干扰。

当窗口接近上限的时候，执行一次 rebuild，切断当前窗口，开启新窗口，用已持久化的文件作为种子重建上下文。

主 Agent 在新窗口中醒来后可以继续工作。

一段被 checkpoint 打过点、最终以 rebuild 收尾的对话轮次序列，就是一个 cycle。Cycle 没有数量上限，每一个 cycle 受限于物理窗口大小，但逻辑会话是 cycle 的链，而那条链没有最大长度。


### 四层记忆

Writer 不只写一个文件，它维护一个分层的记忆体系，每一层有不同的生命周期。

![](https://cdn.paicoding.com/stutymore/mimo-code-review-20260611122248.png)

- **Session 记忆**（checkpoint.md），只在当前逻辑会话内存活，记录这次会话的完整工作状态
- **Project 记忆**（MEMORY.md），项目级持久知识库，保存架构决定、用户规则、反复验证过的技术事实。
- **Global 记忆**，用户级偏好，跨项目生效
- **History**，每个会话的完整 SQLite 轨迹，每条消息、每次工具调用原文存储，不做索引。当结构化记忆中找不到某个细节时，Agent 通过 history 工具回溯到原始记录

主 Agent 可以随时往里追加零散发现，writer 在每次 checkpoint 时读取它、将内容路由到对应的结构化字段，然后清空。

相当于给主 Agent 一个"便签本"，主 Agent 不需要操心信息该放在哪个结构化字段里，只管随手记下来，交给 writer 去分拣。

## ending

这里必须夸一下 OpenCode。

MiMoCode 正是基于 OpenCode 构建的，保留了几乎全部核心能力（多 Provider、TUI、LSP、MCP、插件）。

并在此基础上构建了持久化记忆、智能上下文管理、子智能体编排、目标驱动的自主循环、Compose 工作流，以及通过 dream/distill 实现的自我进化。

![](https://cdn.paicoding.com/stutymore/mimo-code-review-20260611135713.png)

这或许就是开源的意义，站在巨人的肩膀上，做出更有价值的东西来。

我们下期见。
