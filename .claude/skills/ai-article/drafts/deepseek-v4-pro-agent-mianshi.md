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

嗯哼，原来小字是这么玩的，梁圣伟大。

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

【截图：面试题列表】

（全文比较肝，保证大家能学到很多很多，系好安全带，我们粗粗粗发～）

## content

### 01、Pro 和 Flash 都支持 100 万上下文，为什么实际 Agent 能力仍然会有明显区别？

“上下文窗口只是输入容量，决定的是能塞多少内容进去。模型能从这些内容里理解多少、用好多少，取决于激活参数量。”

V4 Pro 总参数 1.6 万亿，每次推理激活大约 49B；Flash 总参数 284B，每次推理激活大约 13B。激活参数差了将近 4 倍，直接影响推理深度。

【截图：Pro vs Flash 激活参数对比；风格：data-board；截图目标：展示两个模型的参数量和激活参数差异；关键词：V4 Pro、V4 Flash、激活参数】

Agent 场景对推理深度的要求比普通对话高得多。一次工具调用需要模型理解用户意图、选对工具、生成正确的参数格式、判断返回结果是否符合预期。

这几步里任何一步出错，Agent 就要多跑一轮甚至整个任务失败。激活参数越多，模型在复杂 schema 的工具调用上准确率越高，长链推理的持续性也越好。

还有一个容易忽略的点。上下文很长的时候，中间位置的信息容易被注意力机制忽略，这就是 Lost in the Middle 现象。

大尺寸模型在这方面的表现通常更稳定，更多的注意力头可以覆盖更广的上下文范围。

### 02、如果让你设计一个同时使用 Pro 和 Flash 的 Coding Agent，你会如何实现模型路由？

“按任务类型分。规划、代码审查、复杂推理这些需要深度思考的任务走 Pro，文件读写、格式化、简单补全走 Flash。”

用户输入进来之后，先用 Flash 做一轮意图识别和任务分级。这一步本身不需要太强的推理能力，Flash 完全够用。

分级结果决定后续用哪个模型。PaiCLI 的 LlmClientFactory 支持 7 个 provider 的动态切换，运行时通过 /model 命令可以手动切换模型，也可以根据任务类型自动路由。

每个 provider 实现了 LlmClient 接口，声明 maxContextWindow、supportsTools、supportsPromptCaching 这些能力标记，路由逻辑根据标记做匹配。

“还需要一个降级兜底。Pro 的并发上限是 500，Flash 是 2500。”

高峰期 Pro 限流的时候，自动降级到 Flash，保证任务不中断。

【截图：模型路由流程；风格：swimlane；截图目标：展示任务从输入到模型选择的完整流程；关键词：意图识别、任务分级、Pro、Flash、降级】

#### 怎么判断一个任务该用 Pro 还是 Flash？

“看推理步数和工具调用复杂度。”

如果任务需要连续推理 3 步以上，比如说先分析需求、再拆分子任务、最后生成执行计划，用 Pro。工具调用涉及嵌套参数、多个可选字段的复杂 schema，也用 Pro，参数生成错误率在这种场景下会显著上升。

单步工具调用、文件的增删改查、代码格式化、简单的文本转换，Flash 就够了。这类任务即使用 Pro 也不会有明显提升，但成本会高 3 倍。

【截图：任务分级判断维度；风格：checklist-card；截图目标：列出 Pro 和 Flash 各自适合的任务类型；关键词：推理步数、工具调用复杂度、成本】

### 03、为什么不能让所有任务都直接调用能力更强的 Pro？

“成本、延迟和并发，三个限制同时卡着。”

Pro 的输入输出价格都是 Flash 的 3 倍。一个 Agent 任务平均跑十几到二十轮工具调用，全用 Pro 的话账单直接翻 3 倍。

激活参数越多推理时间越长。Agent 场景对延迟比较敏感，用户在终端里等 Agent 回复，每多等一秒体验就差一截。

Pro 的并发上限只有 Flash 的五分之一。所有任务都走 Pro，高并发场景下请求会排队，任务的端到端时间被拉长。

【截图：Pro 与 Flash 的成本延迟对比；风格：data-board；截图目标：对比两个模型在成本、延迟、并发上的差异；关键词：成本、并发限制、延迟】

“还有一点，简单任务让大尺寸模型来做，模型有时候反而会过度推理，想太多做太复杂。”

### 04、Pro 的缓存未命中输入价格是 Flash 的 3 倍，但缓存命中价格差距很小，这会如何影响 Agent 的上下文设计？

“缓存命中和未命中的价格差了差不多 50 倍。上下文怎么拼接，直接决定 Agent 的运行成本。”

前缀缓存的机制是按 token 序列前缀匹配的，前面的 token 和上一次请求完全一致，这部分就能命中缓存。所以上下文的布局策略就是把不变的内容放前面，变化的内容放后面。

System Prompt、工具定义、长期记忆、Few-shot 示例这些在一次任务内基本不会变的内容，放在上下文的最前面。用户输入、工具调用结果、当前轮的临时状态放在后面。

【截图：上下文布局策略；风格：three-layer；截图目标：展示前缀（稳定/缓存）和尾部（变化）的分层结构；关键词：System Prompt、工具定义、前缀缓存、动态内容】

“PaiCLI 的 ContextProfile 就是这么做的。系统提示和工具定义拼在最前面，记忆上下文紧跟其后，用户消息和工具结果放在尾部。”

每一轮对话，前面好几千 token 的内容都走缓存价。

一个 Agent 任务跑 20 轮，前缀稳定的话只有第一轮走未命中价格，剩下 19 轮都走缓存价。省掉的前缀费用占总输入成本的绝大部分。

### 05、从 Agent 工程角度看，正式版和 Preview 版本的区别仅仅是模型效果不同吗？

“从工程角度看，API 稳定性、功能完整度和版本控制能力的差异，对线上 Agent 系统的影响比模型效果本身更直接。”

Preview 版本的行为可能随时调整，参数、输出格式、推理路径都有可能在不通知的情况下变化。正式版有 SLA 保障，行为变更会提前通知，开发者可以做好适配。

功能完整度方面，V4 Pro 正式版支持 Responses API，Preview 版本不支持。Responses API 让工具调用更结构化、上下文管理更高效，这个差异对 Agent 场景的影响很大。

“版本锁定能力也不一样。正式版可以指定 deepseek-v4-pro-0813 这样的具体版本号，Preview 没有这个保障。”

线上跑着的 Agent 任务，模型行为突然变了，排查起来非常痛苦。

【截图：Preview 与正式版差异对比；风格：data-board；截图目标：从 API 稳定性、功能、版本控制、SLA 四个维度对比；关键词：Preview、正式版、SLA、版本锁定】

V4 Flash 从 Preview 到正式版，Agent 相关的 benchmark 提升幅度非常大，说明后训练阶段做了大量针对 Agent 场景的优化。Preview 期间跑出来的评测数据不一定代表正式版的表现。

### 06、为什么模型架构和参数量不变，只重新进行后训练，也可能显著提升 Agent 能力？

“预训练给的是知识和语言能力，后训练给的是行为模式。Agent 需要的大部分关键能力，恰好是行为层面的。”

【截图：预训练与后训练分工；风格：whiteboard；截图目标：展示预训练（知识）和后训练（行为模式）各自负责的能力范围；关键词：预训练、SFT、RL、Agent 能力】

模型需要严格按照 JSON Schema 生成工具调用参数，字段名不能错，类型不能错，可选字段该填的填该空的空。后训练就够了，SFT 给格式示范，RL 强化准确率。

Agent 任务经常需要连续推理十几步，中间不能跑偏。RL 可以让模型学会在长链推理中保持目标一致性。

工具调用失败之后，模型需要判断失败原因，决定是重试、换个工具还是调整参数。这种失败后的恢复策略，SFT 提供示范，RL 强化正确的决策路径。

“V4 Flash 就是一个典型的例子。架构没变，参数量没变，但正式版在 Agent benchmark 上大幅超过 Preview。”

后训练拉开的差距，就这么明显。

### 07、如果 API 中的 deepseek-v4-pro 自动从 Preview 切换到正式版，怎样保证线上任务可复现？

“第一步，锁版本号。用 deepseek-v4-pro-0813，不用 deepseek-v4-pro。”

模型名不带日期后缀的，随时可能指向新版本。

第二步，维护一套离线回归测试集，50 到 100 个真实任务，覆盖主要使用场景。每次模型版本更新之前先跑一遍，对比新旧版本的工具调用成功率、平均迭代次数、任务完成率。

切换的时候走灰度。先在测试环境跑一遍，再把少量线上流量切到新版本，观察一段时间没有异常再全量切换。

“上线之后也不能放手不管。持续监控工具调用失败率、任务放弃率、平均完成步数，这些指标一旦出现突变，大概率就是模型行为变了。”

【截图：版本管理和灰度切换流程；风格：swimlane；截图目标：展示从版本锁定到灰度切换到监控的完整流程；关键词：版本号、回归测试、灰度切换、监控指标】

PaiCLI 的做法是在 LlmClient 接口里维护 currentModel 字段，每次 LLM 调用的响应里记录实际使用的模型版本号。ConversationLedger 会写入模型版本信息，方便事后追溯。

### 08、什么是 Agent Harness？它与大尺寸模型、MCP、Skill 和普通工具调用分别是什么关系？

“Harness 就是模型之外的一切工程设施。循环控制、上下文管理、工具调度、记忆管理、安全审批，全部归 Harness 管。”

大尺寸模型负责推理和生成，接收上下文，输出文本或工具调用指令。模型本身不执行任何操作，只做决策。

Harness 负责把模型的决策变成实际操作。用户输入进来，Harness 组装上下文发给模型，模型返回工具调用指令，Harness 执行工具、收集结果、判断要不要继续循环。

Claude Code、Codex、PaiCLI 都是 Harness。

MCP 是工具接入的标准协议，Harness 通过 MCP 连接外部工具服务器，协议负责工具发现、参数传递和结果返回。Skill 是预定义的能力包，包含提示词模板、推荐的工具组合和触发条件，触发后把提示词注入到上下文里，引导模型按特定模式工作。

普通工具调用是单次的函数调用，模型说“调用 read_file”，Harness 执行 read_file 并返回结果。Harness 把多次工具调用串成完整的任务流程。

【截图：Harness 分层架构；风格：three-layer；截图目标：展示模型、Harness、MCP、Skill、工具调用之间的层级关系；关键词：Harness、MCP、Skill、工具调用、模型】

“PaiCLI 的分层结构就很清楚。Agent 是循环主体，ToolRegistry 管工具调度，SkillRegistry 管能力包，McpServerManager 桥接外部工具，MemoryManager 管记忆。”

### 09、为什么同一个模型接入 Codex、Claude Code 和其他 Coding Agent 后，效果可能完全不同？

“Harness 控制的变量太多了。上下文怎么拼、工具怎么调、错误怎么处理、记忆怎么管理、循环什么时候停，每一个环节的实现不同，最终效果就不同。”

同样是 DeepSeek V4，接入 Codex 的时候，System Prompt 是经过大量 A/B 测试优化过的，工具定义的 schema 精心设计过，上下文在 80% 窗口时触发压缩，工具调用失败有分级重试策略。

换一个只做简单循环的 Agent，把用户输入发给模型，模型返回工具调用就执行，上下文不压缩也不做错误恢复。同一个模型，表现差距可能非常大。

【截图：Harness 工程设施对比；风格：data-board；截图目标：对比精细 Harness 和简单循环 Agent 在各维度上的差异；关键词：Codex、PaiCLI、上下文管理、工具调度】

“之前看到一个观点挺有意思，说 loop 是 Harness 的核心，但 loop 无非就是上下文的拼接和各种格式的端点处理，大家写出来都差不多。围绕 loop 的工程设施决定了 Harness 的水平。”

平时我用 PaiCLI 也是这么做的。Agent.run() 主循环大约 160 行代码，循环本身的逻辑不复杂。

但围绕它的配套设施加起来有几千行，ContextCompressor 做上下文压缩、AgentBudget 做循环预算控制、TurnToolPolicy 做工具策略管理、ConversationHistoryCompactor 做历史压缩。

### 10、模型已经支持 100 万上下文，Harness 为什么还需要做上下文压缩？

“100 万 token 的窗口用起来是有成本的。Token 费用随输入长度线性增长，一个 Agent 任务跑 20 轮，不做压缩的话后面几轮的输入可能达到几十万 token。”

注意力稀释是另一个原因。上下文越长，中间位置的信息被注意力机制关注到的概率就越低，这就是 Lost in the Middle 现象。

Agent 的工具调用结果和中间推理过程如果落在长上下文的中间段，模型可能会忽略它们，导致重复调用或者决策偏差。

延迟也会增加，输入越长模型计算第一个 token 的时间越长。Agent 场景下用户在终端里等着，首 token 延迟从 1 秒变成 3 秒，体验差距很明显。

“PaiCLI 的做法是在 80% 窗口阈值时触发压缩。ConversationHistoryCompactor 保留最近几轮的完整消息，更早的消息用 Map-Reduce 做摘要。”

压缩后的摘要保留用户意图、执行结果和关键决策，丢掉中间的冗余细节。

【截图：上下文压缩机制；风格：swimlane；截图目标：展示从原始对话到压缩后的上下文变化流程；关键词：Map-Reduce、80%阈值、摘要压缩、Lost in the Middle】

实际 Agent 任务也确实不需要完整的历史对话，最近几轮的上下文对当前决策影响最大，更早的内容只需要保留关键信息。

### 11、Responses API 相比传统 Chat Completions API，为什么更适合 Agent？

“Chat Completions 是无状态的，每次请求都要把完整的对话历史重新发一遍。Responses API 是有状态的，可以引用前一轮的 response ID，不用重传历史。”

工具调用的处理方式也不同。Chat Completions 里，工具调用的指令混在模型的文本输出里，Harness 需要解析文本来提取工具调用信息。

Responses API 把 tool_calls 做成了独立的结构化数据，和推理内容、最终回复分开返回，Harness 直接读取结构化字段就行。

推理过程的持久化是另一个区别。模型在第一轮推理时做出的判断，比如说“根因在配置文件里”，Chat Completions 下这个判断只存在于文本里，后续轮次需要模型重新从文本理解。

Responses API 把推理过程作为独立组件保存，跨轮次可以直接引用。

“前缀缓存的友好度也不一样。Chat Completions 每次都重传整个上下文，复杂度是 O(n²)。”

Responses API 引用前一轮的 ID，只发新增内容，复杂度降到 O(n)。

【截图：Responses API 与 Chat Completions 对比；风格：data-board；截图目标：从状态管理、工具调用、推理持久化、缓存效率四个维度对比；关键词：有状态、结构化工具调用、推理持久化、O(n)】

#### Responses API 怎么帮助降低成本？

“一个 Agent 任务跑 20 多轮，每轮都重传 System Prompt 和工具定义的话，这部分 token 重复计费。”

System Prompt 和工具定义加起来通常有好几千 token，这些内容在一次任务内完全不变。Chat Completions 每轮都要重传，每轮都按未命中价格收费。

Responses API 首次请求之后，后续轮次引用前一轮的 response ID，静态前缀走缓存价。拿 DeepSeek V4 来说，缓存命中和未命中的价格差了差不多 50 倍。

20 轮任务下来，省掉的前缀费用占总输入成本的绝大部分。

【截图：Responses API 成本节省；风格：data-board；截图目标：展示多轮任务下两种 API 的成本差异；关键词：50倍差价、前缀缓存、多轮任务】

### 12、DeepSeek Harness 和 PaiCLI 的 Better Harness 是同一个概念吗？

“完全不是一个东西。DeepSeek Harness 是一个完整的 Coding Agent 产品，PaiCLI 的 Better Harness 是一个审计工具。”

DeepSeek Harness 对标的是 Claude Code 和 Codex，职责是接收用户的自然语言指令，通过 ReAct 循环调用模型和工具，完成编码任务。模型做决策，Harness 做执行，最终交付代码修改。

PaiCLI 的 Better Harness 做的事情完全不同，它检查 Agent 干得怎么样。BetterHarnessRunner 会并行启动三个取证通道，分别是会话证据通道、项目配置通道和 Agent 配置通道。

会话证据通道从 ConversationLedger 里提取去标识化的元数据，比如说工具调用次数、模型切换记录、任务生命周期信息。项目配置通道扫描仓库里的测试、CI 文件和交付约束。

Agent 配置通道检查 Skill 配置、MCP 设置和记忆入口。

三个通道各自独立分析，最后交给一个汇总模型做综合评审，按五个维度打分，分别是任务理解、执行可控、变更验证、交付可靠、学习积累。

【截图：DeepSeek Harness 与 Better Harness 对比；风格：whiteboard；截图目标：展示两者的定位和职责差异；关键词：Coding Agent、审计工具、三通道取证、五维度评审】

“DeepSeek Harness 让 Agent 干活，Better Harness 检查 Agent 干活的质量。一个是施工队，一个是验收方。”

---

以下是 DeepSeek V4 Pro + Harness 方向的简历参考。

#### 怎么写到简历上？

项目名称：CodeMate——Agent CLI 编程助手 2026.03 – 2026.05

项目简介：面向 Java 项目的本地 CLI 编程 Agent，支持自然语言驱动代码检索、任务规划、代码修改及自动诊断，集成 Multi-Agent、代码检索、长期记忆及安全执行能力，实现从需求分析到代码交付的自动化开发流程。

技术栈：Java 21、JLine、JavaParser、SQLite、JGit、Ollama、Jieba

核心职责：

- 设计 ReAct 与 Plan-Execute 双模式执行框架，简单任务采用 ReAct 完成工具调用与迭代推理，复杂任务拆分为 DAG 并由调度器按依赖关系并行执行；结合 Planner、Worker、Reviewer 多 Agent 协作，根据审查结果自动修复失败节点并控制重试次数，提高复杂开发任务执行成功率。
- 实现多 provider 模型路由机制，支持 7 个 LLM provider 的动态切换和运行时模型选择，每个 provider 声明上下文窗口、工具支持、缓存模式等能力标记，路由逻辑根据任务复杂度自动匹配模型，高峰期自动降级保证服务连续性。
- 构建代码仓库检索能力，优先通过 ripgrep 快速定位代码，再结合 JavaParser 按类、方法生成 AST 索引，并融合 Ollama Embedding、Jieba、BM25 等方式完成语义检索与关键词检索，实现跨文件代码定位；在千级代码块规模下检索 P90 延迟保持在 94ms。
- 设计短期、长期双层记忆机制，将对话、工具结果及任务状态分别管理，并采用 Map-Reduce 对历史上下文进行摘要压缩；长期记忆基于 SQLite 持久化，结合 BM25 与向量检索动态召回相关历史，提高跨会话代码开发连续性。
- 建立 Java Code Agent 自动评测体系，基于 SWE-bench Multilingual 与 Harbor 构建 43 个真实开源 Issue 测试集，在固定代码版本及隔离环境下自动验证 Patch，成功修复 27 个任务，Pass@1 达到 62.8%。

## ending

DeepSeek Harness 还在最后一轮内测。公众号一篇文章都没发，34 位朋友已经关注了。

做 PaiCLI 的时候我有一个很深的体会，Harness 的工程复杂度比很多人想象的要高。上下文管理、工具调度、记忆系统、错误恢复，每一个环节都有大量细节需要打磨。

DeepSeek 自家的模型配自家的 Harness，适配的上限会比第三方高不少。

**等它公测出来，就看 Agent 体验能不能给 Claude Code 和 Codex 带来压力。**

下期见。
