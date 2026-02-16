---
title: 不用纠结了！GLM-5+GPT-5.3-Codex就很猛，我用他们升级了Claude Code模型切换工具，真香。
shortTitle: GLM-5+Codex实测PaiSwitch
description: 用 GLM-5 和 GPT-5.3-Codex 开发了一个 Claude Code 底层模型切换工具 PaiSwitch，支持 Web 端管理、AI 智能切换，基于 SpringAI 和 Function Calling 实现。
tag:
  - GLM-5
  - GPT-5.3-Codex
  - Claude Code
category:
  - AI
author: 沉默王二
date: 2026-02-13
---

大家好，我是二哥呀。

GLM-5的热度是真的高，国内的大多数Agent工具都接入了，包括TRAE、Qoder、OpenCode等。

![](https://cdn.paicoding.com/stutymore/glm5-paiswitch-20260213081908.png)

我也是连续两天高强度测试，把PaiSwitch这个Claude Code底层模型切换工具彻底重构和升级了。

除了macOS端，我新加了后端和Web前端，后端的技术栈包括SpringAI、MySQL和JDK 17。

![支持AI助手智能切换](https://cdn.paicoding.com/stutymore/glm5-paiswitch-20260213081557.png)

代码已经开源在GitHub上，想手搓的小伙伴可以二开（非常适合新手，写到简历上也很不错）。

>https://github.com/itwanger/PaiSwitch

当然了，整体还有蛮多优化的空间。

比如说，后续我想让PaiSwitch作为一个容器，把Claude Code嵌入进来，然后把历史记录持久化到MySQL中，并且利用ElasticSearch做一个混合检索，不仅支持关键字还支持语义检索，算是RAG的另外一个应用场景吧。

大部分代码是由GLM-5完成的，还有一部分是通过GPT-5.3-Codex完成的。

![](https://cdn.paicoding.com/stutymore/glm5-paiswitch-20260213082847.png)

讲真，GLM-5+GPT-5.3-Codex 是我目前我觉得最稳的Vibe Coding组合。前者量大管饱，后者精准高效，尤其在修复bug方面，GPT-5.3-Codex的表现真的无可挑剔。

## 01、为什么需要 PaiSwitch？

用 Claude Code 的小伙伴应该都有这个困扰。

想切换到底层模型，得去改 `.claude/settings.json`，填 ANTHROPIC_BASE_URL、ANTHROPIC_AUTH_TOKEN，改完还得重启终端。

要是只用一个模型还好，问题是现在好模型太多了。

GLM-5 刚发布，编程能力开源第一；GPT-5.3-Codex 速度飞快，Terminal-Bench 跑了 77.3%；DeepSeek 新版马上要出。每个模型都有自己的杀手锏。

我就想，能不能做一个工具，把这些模型统一管理起来？

有小伙伴可能会讲，不是有 CC Switch 了吗？干嘛还要重复造轮子？

不一样的，真不一样，我可以去买油车，也可以去买新能源，这样才好嘛。

说干就干。我把需求扔给 GLM-5：

> 我正在做一个叫 PaiSwitch 的工具，主要功能是切换 Claude Code 的底层模型。目前已经完成了macOS端，但我还想追加一个Web端，最好能用后端做持久化。另外，还可以通过AI助手进行模型智能切换。

下面是GLM-5给我的技术栈选择。

![](https://cdn.paicoding.com/stutymore/sucai-20260213072908.png)

这是目录结构，一眼就能看清楚项目架构。

![](https://cdn.paicoding.com/stutymore/sucai-20260213072925.png)

整个对话持续大概有 22 个小时，还是蛮久的，GLM-5 给我的反馈我认为还是蛮不错的，我想要什么，基本上都能实现。

响应也很快，这很关键。

![](https://cdn.paicoding.com/stutymore/glm5-paiswitch-20260213083811.png)


## 02、GPT-5.3-Codex 的 bug 修复能力

用GLM-5完成大体框架的开发后，我就切换到了GPT-5.3-Codex，主要是想测试一下它在修复bug方面的能力。

我们就拿 Function Calling 的后端逻辑这块来讲吧，一开始GLM-5 只是定义了函数，但并没有真正去调用。

也就是说，AI助手说要切换到某个模型，但程序并没有真正去执行这个切换的逻辑。

这种 bug 很隐蔽，接口不报错，返回也是正常的，但功能就是不对劲。

我把问题丢给 GPT-5.3-Codex，没有做任何额外解释。

![](https://cdn.paicoding.com/stutymore/sucai-20260213073154.png)

它没有急着改代码，而是先分析了一波：Function Calling 的执行链路是什么样的？当前代码和预期行为差在哪里？

然后给我指出了问题所在：函数定义有了，但没有执行。于是他就帮我补齐了功能，并且主动编译看看有没有语法错误。

不仅如此，GPT-5.3-Codex还会主动检查边界情况。

![](https://cdn.paicoding.com/stutymore/sucai-20260213073702.png)

比如有个功能是清空对话，很明显这种场景下，不应该再从后端拉回记录。

这个我之前压根没考虑过。

GPT-5.3-Codex 多想的这一步，对编程老手可能没什么，但对新手来说，真的很有帮助。

就像一个有经验的老同事，不会只盯着你说的那个点，而是会帮你把整个链路都捋一遍。

代码改完后，IntelliJ IDEA 会热加载。

![](https://cdn.paicoding.com/stutymore/sucai-20260213073806.png)

前端也跑起来。

![](https://cdn.paicoding.com/stutymore/sucai-20260213073841.png)

打开 Web 界面，模型管理、一键切换、链接测试，全都能用。

这种感觉，就像你刚组装完一辆车，拧钥匙一打火，发动机直接响了。

爽歪歪。

## 03、GLM-5和海外模型的差距

当然了，GLM-5和GPT-5.3-Codex、Claude Opus 4.6 这类海外模型还是有差距的。

虽然 GLM-5 在 BrowseComp、MCP-Atlas、τ2-Bench 三项 Agent 评测中都拿了开源第一。

![](https://cdn.paicoding.com/stutymore/glm5-paiswitch-f929b83b4fd62121afeb56d187c43ff0.png)

但从实际体验来看，我们离顶级的编程模型还有一段距离，需要追赶。

| 模型 | 参数规模 | 核心优势 |
|------|---------|---------|
| **GLM-5** | 744B (激活40B) | Agent 能力开源第一，系统工程能力强劲 |
| **GPT-5.3-Codex** | 未公开 | Terminal-Bench 77.3%，推理速度满分 |
| **Claude Opus 4.6** | 未公开 | SWE-bench Verified 80.8%，企业级应用 |

### 差距在哪里？

我这次高强度测试了22个小时，说说真实感受。

GLM-5 在做系统级工程的时候表现很好，你给它一个完整的需求，它能帮你搭框架、写接口、配数据库，整体思路清晰。但遇到那种特别隐蔽的 bug，有时候需要你多提醒几次它才能定位到。

GPT-5.3-Codex 就不一样了。你把报错信息往那一贴，它直接给你分析调用链，告诉你哪一步出了问题，为什么会出问题，然后给你修复方案。那种感觉就像你旁边坐了个资深同事，看一眼就知道问题在哪。

还有响应速度。GLM-5 的流式输出已经很流畅了，但 GPT-5.3-Codex 的首 token 延迟更低，尤其是在处理复杂代码逻辑的时候，这种差距能明显感觉到。

不过话说回来，GLM-5 是开源的，这点太重要了。你可以在本地部署，数据不用传到海外服务器，对企业级应用来说，这个优势无可替代。





## 04、如何写到简历上？

PaiSwitch 这个项目其实非常适合写到简历上，因为它涉及的技术栈很全面，而且是一个完整的全栈项目。

**项目名称**：PaiSwitch - Claude Code 模型管理平台

**项目简介**：一个支持多模型切换的 Claude Code 管理工具，提供 macOS 客户端、Web 前端和后端服务，支持 AI 智能切换和对话历史管理。

**技术栈**：Spring Boot 3.x、SpringAI、MySQL 8.0、Vue 3、Function Calling、JDK 17

**核心职责**：

1. 设计并实现基于 SpringAI 的多模型统一接入层，支持 GLM、GPT、Claude 等多种大模型的动态配置和热切换，将模型切换时间从手动修改配置的 5 分钟降低到 Web 端一键切换的 3 秒内。

2. 利用 Function Calling 技术实现 AI 智能助手功能，用户可以通过自然语言描述需求（如"帮我切换到编程能力最强的模型"），系统自动识别意图并执行模型切换，提升用户体验。

3. 设计模型配置的数据库表结构，实现模型信息的持久化存储和管理，支持 API Key 加密存储、链接测试、配置导入导出等功能。

4. 开发 macOS 原生客户端，通过 Shell 脚本实现 Claude Code 配置文件的自动修改和环境变量注入，解决跨终端配置同步问题。

5. 实现前后端分离架构，后端提供 RESTful API，前端基于 Vue 3 构建响应式界面，支持模型管理、对话历史查看、AI 助手交互等功能模块。

**面试加分点**：

- 可以聊聊 SpringAI 的优势和劣势，以及为什么选择它而不是 LangChain
- Function Calling 的实现原理，以及如何处理函数调用的异常情况
- 多模型统一接入的设计思路，如何抽象不同模型的 API 差异
- 数据库设计中的加密存储方案，API Key 的安全性如何保障

这个项目的亮点在于它解决了一个真实痛点，而且技术选型比较新，能体现出你对 AI 工程化的理解。

## 05、后续规划

PaiSwitch 现在只是个雏形，我还有一些想法准备慢慢加进去。

比如把 Claude Code 的历史记录保存到 MySQL，支持检索。

或者在这个工具里直接运行 Claude Code，作为一个容器。然后支持历史记录的查找，类似 Cowork 那种自然语言检索，有关联性的那种。

还有一个方向是界面美化。我准备让不同的模型来设计界面，看看哪个做得漂亮就用哪个。让 AI 卷 AI，我们坐享其成。

![](https://cdn.paicoding.com/stutymore/sucai-20260213072633.png)

模型管理界面目前已经能用了，点击"链接测试"可以验证配置是否正确。

有需要的小伙伴可以直接去 GitHub 拿代码：https://github.com/itwanger/PaiSwitch

clone 下来，配置好 API Key，启动后端和前端就能用。



## ending

AI 编程这条路，越走越有意思。

以前我们纠结用什么编辑器、什么框架。现在我们纠结用什么模型、怎么切换、怎么组合。

工具在变，但本质没变：让机器帮我们干苦活，我们把精力放在创造上。

GLM-5 能做系统级工程，GPT-5.3-Codex 能秒级修 bug。

搭配使用，对我们开发者来说，也是好事。

说实话，这次重构 PaiSwitch 的过程让我感触挺深的。

两年前，我写代码还是一行一行敲，遇到 bug 先自己想，想不出来去 Stack Overflow 搜，搜不到就去问同事。一个功能从构思到上线，少说也要几天。

现在不一样了。

你有一个想法，扔给 AI，它帮你搭框架。你发现 bug，贴给 AI，它帮你定位修复。你想要什么功能，描述清楚，它帮你实现。

整个过程就像你在指挥一个不知疲倦的助手。

它不会累，不会抱怨，不会说你这个需求太奇葩。它只会默默地执行，然后给你一个结果。

当然，这个结果不一定完美。

但即便不完美，也帮你省掉了 80% 的重复劳动。

剩下那 20%，才是真正需要你动脑子的地方：架构设计、业务逻辑、用户体验。这些 AI 暂时还帮不了你，或者说，帮得不够好。

PaiSwitch 只是一个小尝试。

它解决的是一个小痛点：切换模型太麻烦。

但这个小痛点背后，其实是一个更大的趋势：我们正在进入一个多模型并存的时代。

GLM-5 擅长系统工程，GPT-5.3-Codex 擅长精准修复，Claude 擅长复杂推理，DeepSeek 擅长性价比。

每个模型都有自己的长处，也都有自己的短板。

我们需要做的，不是选一个"最好"的模型，而是学会在不同场景下使用不同的模型。

就像你不会用锤子去拧螺丝，也不会用螺丝刀去砸钉子。

工具要用对地方，才能发挥最大价值。

PaiSwitch 就是在做这件事：让切换模型变得足够简单，简单到你不需要思考"怎么切"，只需要思考"切哪个"。

【希望每个人都能找到适合自己的 AI 编程方式，让代码不再是负担，而是创造力的延伸。】

如果这篇内容对你有用，记得点赞转发哦。

我们下期见！
