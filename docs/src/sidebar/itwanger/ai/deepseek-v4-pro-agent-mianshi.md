---
title: DeepSeek 员工：DeepSeek V4 Pro 正式发布，Harness 也进入最后一个内测版本（附Agent面试题）
shortTitle: DeepSeek V4 Pro 与 Harness Agent面试题
description: DeepSeek V4 Pro 正式发布，Agent 能力大幅提升，支持 Responses API。12 道 Agent 面试题深入讲解模型路由、上下文工程、Harness 概念和 Responses API 的工程实现
keywords: DeepSeek V4 Pro, Agent面试题, Harness, Responses API, 模型路由
tag:
  - 面试
category:
  - AI
author: 沉默王二
date: 2026-08-13
---

大家好，我是二哥呀。

好家伙，DeepSeek V4 Pro 正式版是真的发布了。

仍然是官方偷偷摸摸的一句小字提醒！

![](https://cdn.paicoding.com/stutymore/sucai-20260813101149.png)

嗯哼，原来这才是小字的正确玩法啊，梁圣伟大。

从小字能看得出来，Agent 能力有了大幅提升，和 Flash 版本一样，支持 Responses API，也就意味着可以和Codex完美适配。

同时，DeepSeek 新的斩杀线也来了。

![](https://cdn.paicoding.com/stutymore/sucai-f1ad0f28e12f9059363b545951efc39f.png)

线下的兄弟模型们要加油啊。

就冲价格屠夫这一点，DeepSeek 就应该赢得更多的赞誉，否则死贵的 Token 根本都不可能打下来。

另外，群里还看到这样一则爆料，DeepSeek 的 Harness 工具也要马上公测了。

![](https://cdn.paicoding.com/stutymore/sucai-20260813101813.png)

就连 DeepSeek Harness 团队的公众号已经 34 位朋友关注了，哪怕一篇文章还没法，我只能说DeepSeek的关注度是真的高。

大家都很期待这个工具能出来和Codex、Claude Code掰一掰手腕，就像当初 R1 给的惊艳一样。

我自己做 PaiCLI 时也有一个非常明显的感受，模型决定 Agent 的能力上限，Harness 决定这个上限能不能稳定兑现。

![](https://cdn.paicoding.com/stutymore/sucai-20260813102735.png)

>PaiCLI是一个类似Claude Code的终端Harness，Go/Python/TypeScript版本已经上传GitHub：https://github.com/itwanger/PaiCLI-Python

如果你是一位愿意相信努力、相信过程、相信一步一个脚印、相信自己能在 AI 时代分一杯羹的人，那接下来的硬核内容，希望你能认真读一读。

![](https://cdn.paicoding.com/stutymore/deepseek-v4-pro-agent-mianshi-20260813115911-124c8dfa.png)

（全文比较肝，保证大家能学到很多很多，系好安全带，我们粗粗粗发～）

## content

### 01、Pro 和 Flash 都支持 100 万上下文，为什么实际 Agent 能力仍然会有明显区别？

“上下文窗口只是输入容量，决定的是能塞多少内容进去。模型能从这些内容里理解多少、用好多少，取决于激活参数量。”

V4 Pro 的总参数是 1.6 万亿，每次推理激活大约 49B；Flash 总参数是 284B，每次推理激活大约 13B。激活参数差了将近 4 倍，这直接影响了模型的推理深度。

![](https://cdn.paicoding.com/stutymore/deepseek-v4-pro-agent-mianshi-20260813121111-6e5f2789.png)

Agent 场景对推理深度的要求比普通对话高得多。

一次工具调用需要模型理解用户意图、选对工具、生成正确的参数格式、判断返回结果是否符合预期。

任何一步出错，Agent 就要多跑一轮甚至整个任务都会失败。激活参数越多，模型在复杂 schema 的工具调用上的准确率就越高，长程任务的推理持续性也越好。

还有一点。

上下文很长的时候，中间位置的信息容易被注意力机制忽略。大尺寸模型在这方面的表现通常更稳定，更多的注意力头可以覆盖更广的上下文范围。

### 02、如果让你设计一个同时使用 Pro 和 Flash 的 Coding Agent，你会如何实现模型路由？

“按任务类型区分。规划、代码审查、复杂推理这些需要深度思考的任务走 Pro，文件读写、格式化、简单补全走 Flash。”

![](https://cdn.paicoding.com/stutymore/deepseek-v4-pro-agent-mianshi-20260813122835-a069d779.png)

用户输入进来之后，先用 Flash 做一轮意图识别和任务分级。

分级结果决定后续用哪个模型。

PaiCLI 的模型路由模块支持 7 个供应商的动态切换，运行时通过 /model 命令可以手动切换模型，也可以根据任务类型自动路由。

“还需要一个降级兜底。”

高峰期 Pro 限流的时候，自动降级到 Flash，保证任务不会被中断。

#### 怎么判断一个任务该用 Pro 还是 Flash？

“看推理步数和工具调用的复杂度。”

![](https://cdn.paicoding.com/stutymore/deepseek-v4-pro-agent-mianshi-20260813124352-f7c24257.png)

如果任务需要连续推理 3 步以上，比如说先分析需求、再拆分子任务、最后生成执行计划，就用 Pro。工具调用涉及嵌套参数、多个可选字段的复杂 schema，也用 Pro。

单步工具调用、文件的增删改查、代码格式化、简单的文本转换，Flash 就够用了。这类任务即使用 Pro 也不会有明显提升，但成本会高 3 倍。

### 03、为什么不能让所有任务都直接调用能力更强的 Pro？

Pro 的输入输出价格是 Flash 的 3 倍。一个复杂的 Agent 任务可能要跑几十轮工具调用，全用 Pro 的话账单会比较贵。

![Pro 与 Flash 的成本延迟对比](https://cdn.paicoding.com/stutymore/deepseek-v4-pro-agent-mianshi-20260813130430-93f39e4e.png)

还有就是激活参数越多，推理时间就越长。

Agent 场景对延迟比较敏感，简单任务尽快响应给用户肯定是更优解。

“还有一点，简单任务让大尺寸模型来做，模型有时候反而会过度推理，想太多也会做的太复杂。”

### 04、Pro 的缓存未命中输入价格是 Flash 的 3 倍，但缓存命中价格差距很小，这会如何影响 Agent 的上下文设计？

前缀缓存（Prompt Caching）的机制是按 token 序列前缀匹配的，前面的 token 和上一次请求完全一致，这部分就能命中缓存。所以上下文的布局策略就是把不变的内容放前面，变化的内容放后面。

System Prompt、工具定义、长期记忆、Few-shot 示例这些在一次任务内基本不会变的内容，放在上下文的最前面。用户输入、工具调用结果、当前轮次的临时状态放在后面。

![上下文布局策略](https://cdn.paicoding.com/stutymore/deepseek-v4-pro-agent-mianshi-20260813130551-8bf137a5.png)

“PaiCLI 的上下文拼接模块就是这么做的。系统提示和工具定义拼在最前面，记忆紧跟其后，用户消息和工具结果放在尾部。”

### 05、从 Agent 工程角度看，正式版和 Preview 版本的区别仅仅是模型效果不同吗？

“从工程角度看，API 稳定性、功能完整度和版本控制能力的差异，对线上 Agent 的影响比模型效果本身更直接。”

![Preview 与正式版差异对比](https://cdn.paicoding.com/stutymore/deepseek-v4-pro-agent-mianshi-20260813130841-f3ad9793.png)

Preview 版本可能会随时调整，比如说参数、输出格式、推理路径都有可能变化。正式版有 SLA（Service Level Agreement，服务等级协议）保障，行为变更会提前通知，开发者可以做好适配。

比如说功能完整度方面，V4 正式版支持 Responses API，能更好的兼容 Codex 等 Agent 工具，这对 Agent 表现力影响很大。

另外就是正式版的后训练做得更好，能让 Agent 在特定场景下的表现力更好。

### 06、为什么模型架构和参数量不变，只重新进行后训练，也可能显著提升 Agent 能力？

“预训练让模型具备了更多的知识储备和语言能力，后训练让模型在更多具体的场景下具备更优雅的行为模式。而 Agent 需要的大部分关键能力，恰好是行为层面的。”

![预训练与后训练分工](https://cdn.paicoding.com/stutymore/deepseek-v4-pro-agent-mianshi-20260813131115-de1fb46c.png)

后训练通常分两步，SFT（Supervised Fine-Tuning，监督微调）会用高质量的示范数据教模型“正确的做法是什么样子”，RL（Reinforcement Learning，强化学习）会在此基础上用奖励信号强化模型做出正确决策的概率。

拿工具调用来说，模型需要严格按照 JSON Schema 生成参数，字段名不能错，类型不能错，可选字段该填的填，该空的空。后训练阶段就可以强化 LLM 的 Function Calling 能力。

“V4 Flash 就是一个典型的例子。架构没变，参数量没变，但正式版在 Agent benchmark 上大幅超过 Preview。”

### 07、如果 API 中的 deepseek-v4-pro 自动从 Preview 切换到正式版，怎样保证线上任务可复现？

“第一步，锁定版本号。比如说用具体的模型名称 deepseek-v4-pro-0813 替代通用的模型名称 deepseek-v4-pro。”

![版本管理和灰度切换流程](https://cdn.paicoding.com/stutymore/deepseek-v4-pro-agent-mianshi-20260813131319-51a34acc.png)

第二步，维护一套离线回归测试集。每次模型更新之前先跑一遍，对比新旧版本的工具调用成功率、平均迭代次数、任务完成率。

“上线之后持续监控工具调用的失败率、任务放弃率、平均完成步数，这些指标一旦出现较大的变化，大概率就是模型升级了。”

### 08、什么是 Agent Harness？它与大模型、MCP、Skill 和工具调用分别是什么关系？

“Harness 就是模型之外的一切工程设施。循环控制、上下文管理、工具调度、记忆管理、安全审批，全部归 Harness 管。”

![Harness 分层架构](https://cdn.paicoding.com/stutymore/deepseek-v4-pro-agent-mianshi-20260813131524-8862a6ce.png)

大模型负责推理和生成，接收上下文，输出文本或工具调用指令。模型本身不执行任何操作，只做决策。

Harness 负责把模型的决策变成实际操作。用户输入进来，Harness 组装上下文发给模型，模型返回工具调用指令，Harness 执行工具、收集结果、判断要不要继续。

Claude Code、Codex、PaiCLI 这些 Agent 工具做的都是 Harness。

MCP 是工具接入的标准协议，Harness 通过 MCP 连接外部工具服务器，协议负责工具发现、参数传递和结果返回。Skill 是预定义的技能包，包含提示词模板、推荐的工具组合和触发条件，触发后把提示词注入到上下文里，引导模型按特定工作模式。

tool call 是单次的函数调用，模型说“调用 read_file”，Harness 执行 read_file 并返回结果。

### 09、为什么同一个模型接入 Codex、Claude Code 和其他 Coding Agent 后，效果可能完全不同？

“Harness 控制的变量太多了。上下文怎么拼接、工具怎么调用、错误怎么处理、记忆怎么管理、循环什么时候停，每一个环节的实现不同，最终的效果就不同。”

![Harness 工程设施对比](https://cdn.paicoding.com/stutymore/deepseek-v4-pro-agent-mianshi-20260813131900-fc06980b.png)

### 10、模型已经支持 100 万上下文，Harness 为什么还需要做上下文压缩？

“再大的上下文窗口也有被撑爆的那一刻，尤其是在长程任务，跑1个小时，一天一夜，上下文窗口总有用完的时候。”

另外，上下文越长，中间位置的信息被注意力机制关注到的概率就越低。

Agent 的工具调用结果和中间推理过程如果落在中间段，模型可能就会忽略它们，导致重复调用或者决策偏差。

![上下文压缩机制](https://cdn.paicoding.com/stutymore/deepseek-v4-pro-agent-mianshi-20260813132253-a5694e0b.png)

还有，延迟也会增加，输入越长模型计算第一个 token 的时间就越长。因此必须要做上下文压缩。

实际 Agent 任务也确实不需要完整的历史对话，最近几轮的上下文对当前决策影响最大，更早的内容只需要保留关键信息。

### 11、Responses API 相比传统 Chat Completions API，为什么更适合 Agent？

“Chat Completions 是无状态的，每次请求都要把完整的对话历史重新发一遍。Responses API 是有状态的，可以引用前一轮的 response ID，不用重传历史上下文。”

![Responses API 与 Chat Completions 对比](https://cdn.paicoding.com/stutymore/deepseek-v4-pro-agent-mianshi-20260813132608-84c0beea.png)

工具调用的处理方式也不同。Chat Completions 里，工具调用的指令混在模型的文本输出里，Harness 需要解析文本来提取工具调用信息。

Responses API 把 tool_calls 做成了独立的结构化数据，和推理内容、最终回复分开返回，Harness 直接读取结构化字段就行。

#### Responses API 怎么帮助 Agent 降低 Token 调用成本？

Chat Completions 每轮都要重传 System Prompt 和工具定义，每轮都按未命中价格收费。

![Responses API 成本节省](https://cdn.paicoding.com/stutymore/deepseek-v4-pro-agent-mianshi-20260813132845-190d4eed.png)

Responses API 首次请求后，后续轮次会引用前一轮的 response ID，静态前缀就能走缓存命中时候的价格。费用自然就便宜。

### 12、DeepSeek Harness 和 PaiCLI 的 Better Harness 是同一个概念吗？

“不是一个东西。DeepSeek Harness 是一个完整的 Coding Agent 产品，PaiCLI 的 Better Harness 是一个审计工具。”

![DeepSeek Harness 与 Better Harness 对比](https://cdn.paicoding.com/stutymore/deepseek-v4-pro-agent-mianshi-20260813133207-621f10bd.png)

DeepSeek Harness 对标的是 Claude Code 和 Codex，职责是接收用户的自然语言指令，通过 ReAct 循环调用模型和工具，完成编码任务。模型做决策，Harness 做执行。

PaiCLI 的 Better Harness 用来检查 Agent 干得怎么样。执行器会并行启动三个取证通道。

会话证据通道从对话记录里提取去标识化的元数据，比如说工具调用次数、模型切换记录、任务生命周期信息。项目配置通道会扫描仓库里的测试、CI 文件和交付约束。

配置通道用于检查 Skill 的配置、MCP 的设置和记忆入口。

最后按五个维度打分，从而检查出 Agent 干活的质量。

#### PaiCLI 怎么写到简历上？

项目名称：CodeMate——Agent CLI 编程助手 2026.03 – 2026.05

项目简介：面向 Java 项目的本地 CLI 编程 Agent，支持自然语言驱动代码检索、任务规划、代码修改及自动诊断，集成 Multi-Agent、代码检索、长期记忆及安全执行能力，实现从需求分析到代码交付的自动化开发流程。

技术栈：Java 21、JLine、JavaParser、SQLite、JGit、Ollama、Jieba

核心职责：

- 设计 ReAct 与 Plan-Execute 双模式执行框架，简单任务采用 ReAct 完成工具调用与迭代推理，复杂任务拆分为 DAG 并由调度器按依赖关系并行执行；结合 Planner、Worker、Reviewer 多 Agent 协作，根据审查结果自动修复失败节点并控制重试次数。
- 实现多 provider 模型路由机制，根据任务复杂度自动匹配模型。
- 构建代码仓库检索能力，优先通过 ripgrep 快速定位代码，再结合 JavaParser 按类、方法生成 AST 索引，并融合 Ollama Embedding、Jieba、BM25 等方式完成语义检索与关键词检索；在千行级代码块规模下检索 P90 延迟保持在 94ms。
- 设计短期、长期记忆机制，将对话、工具结果及任务状态分别管理，并采用 Map-Reduce 对历史上下文进行摘要压缩；长期记忆基于 SQLite 持久化，结合 BM25 与向量检索动态召回相关历史。
- 基于 SWE-bench Multilingual 与 Harbor 构建 43 个真实开源 Issue 测试集，在固定代码版本及隔离环境下自动验证 Patch，成功修复 27 个任务，Pass@1 达到 62.8%。

## ending

V4 Pro 正式版发布，一定会重塑大模型的生态位。

价格打下来了，Responses API 支持了，Harness 那边也快了。

自家模型配自家 Harness，从提示词优化到工具调度到上下文管理，每一层都可以做到最深层次的适配。

说实话，Agent 进化这半年，模型一直在变强，Coding 能力确实也在增强。

但所有的模型配所有的工具，都开始不会说人话了，希望 DeepSeek Harness 一定要做好文本生成这块啊。

**希望真能有一个和 Claude Code、Codex 掰掰手腕的国产 Agent 工具。**

我们下期见。
