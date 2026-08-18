---
title: DeepSeek员工：Harness开始内测，有plugin、skill、MCP、Agent开源项目者优先，并赠送API额度（附Agent面试题）
shortTitle: DeepSeek Agent面试13问
description: DeepSeek Harness 内测招募引爆开发者社区，13 道 Agent 工程面试题全解：三路径架构、上下文压缩、混合检索、记忆设计、容错机制、context 管理，附简历包装。
keywords: Agent 面试题, DeepSeek Harness, 上下文工程, 记忆设计, 容错机制
tag:
  - 面试
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-08-06
---

讲真，期待 DeepSeek Harness 很久了。

虽然 DeepSeek 对 Codex 和 Claude Code 都做了深度兼容，但官方原生的肯定更好用，毕竟 API 的入参、出参，每家大模型都不太一样。

![](https://cdn.paicoding.com/stutymore/sucai-20260806122821.png)

**Model + Harness = Agent**，已经是人尽皆知的一个公式。

也就是说，模型负责推理，Harness 负责模型之外的一切。工具调用、记忆管理、上下文控制、桌面集成、MCP 协议、Skills 体系等等。

其实国内的很多大模型厂商都有自己的Harness，比如阿里的 Qoder，月之暗面的Kimi Code，智谱的 Zcode 等。

大家都很期待，DeepSeek 自家的Harness，哪怕 DeepSeek API 要大幅涨价，我相信性价比仍然会非常高。

继续狠狠斩杀就对了。😄

从目前泄露的架构信息来看，DSH 支持 Sub-agent、KV Cache 智能复用、跨会话记忆持久化这些特性。

当然了，这些也都是一个 Agent 必备的。我自己做的 PaiCLI 终端 Agent 也都集成了。

![](https://cdn.paicoding.com/stutymore/deepseek-harness-agent-mianshi-20260806131955.png)

>代码已开源在GitHub，Java/Go/Python/TypeScript版本都已实现：https://github.com/itwanger/PaiCLI-Python

对大家来说，**Agent 工程化的能力，正在成为大厂招人的硬标准**。

如果你是一位愿意相信努力、相信过程、相信一步一个脚印、相信自己能在 AI 时代分一杯羹的人，那接下来的硬核内容，希望你能认真读一读。

![](https://cdn.paicoding.com/stutymore/deepseek-harness-agent-mianshi-20260806154005-001e9522.png)

（全文比较肝，保证大家能学到很多很多，系好安全带，我们粗粗粗发～）

## content

### 01、介绍一下自己的项目，整体架构和技术栈是什么？

“做了两个项目，一个终端 Agent，一个 RAG 知识库。”

![](https://cdn.paicoding.com/stutymore/deepseek-harness-agent-mianshi-20260806154006-97906eba.png)

“终端 Agent 叫 PaiCLI，对标 Claude Code。其中 ReAct 模式用于实时交互的短任务，Plan-and-Execute 模式用于需要分步规划的复杂任务，Multi-Agent Team 模式用于多角色协作。”

“RAG 知识库叫派聪明，基于 Elasticsearch 做混合检索。向量检索用 KNN，关键词检索用 BM25，两个结合起来做召回和排序。上层用了自定义的 ReAct 来支持工具调用和多轮对话。”

“技术栈层面，PaiCLI 是 Java 21 + OkHttp + SQLite + JLine，非常原生，没有用 Spring AI 这些框架。派聪明是 Spring Boot + Elasticsearch 8.x + Embedding/LLM API + Redis。”

#### PaiCLI 为什么设计三个模式？

“因为不同的任务需要不同的模式来适配。”

![](https://cdn.paicoding.com/stutymore/deepseek-harness-agent-mianshi-20260806154430-54012004.png)

“举个例子，用户问‘这个方法是干什么用的’，ReAct 模式就搞定了。但如果用户的指令是‘帮我重构这个模块，改完测试一下’，ReAct 就不够用了，需要用Plan-and-Execute 先拆解任务、编排依赖、然后再分步执行。更复杂的场景，比如需要多 Agent 协作，就可以上 Team 模式。”

### 02、项目中 Agent 的完整流程是怎样的？

“以 ReAct 模式为例。”

![](https://cdn.paicoding.com/stutymore/deepseek-harness-agent-mianshi-20260806154628-a2f5e7ce.png)

“用户输入进来后，第一步做输入预处理，比如说本地路径的展开、图片引用的解析等。第二步检索长期记忆，把和当前输入相关的记忆找出来注入系统提示词。第三步组装 Prompt，分层拼接，静态的放在动态层的前面，充分利用大模型的缓存命中，降低 API 的调用成本。”

“然后进入 ReAct 循环主体。每轮都要检查退出条件，比如说 token 预算是否耗尽、有没有连续多次调用同样的工具、是否超过迭代上限等。检查通过后开始调用 LLM，如果返回了 Function Calling，就执行工具。多个工具可以并行执行。再把工具的执行结果作为新的消息追加到对话历史，发给 LLM 继续决策。”

“如果 LLM 没有返回工具调用，说明任务完成了，就把输出格式化为 HTML 返回给用户。”

#### 审批机制怎么设计的？

![](https://cdn.paicoding.com/stutymore/deepseek-harness-agent-mianshi-20260806154625-39b07db5.png)

“write_file、execute_command 这些工具在执行前会走 HITL（Human-in-the-Loop，人机协作）审批。路径检查器会判断文件路径是否在允许范围内，命令检查器会判断命令是否安全等。审批策略分三档：auto（自动通过）、suggest（建议确认）、never（必须手动确认）。”

“读操作不需要审批，直接执行。”

### 03、项目过程中针对 Agent 做过哪些优化？具体怎么调优？

“印象中最深刻的有两点。”

“第一点，通过 Prompt Caching，也就是缓存命中来提高 Token 的利用率，最大程度减少 API的调用成本。”

![](https://cdn.paicoding.com/stutymore/deepseek-harness-agent-mianshi-20260806155046-04907f4d.png)

比如说，PaiCLI 的 Prompt 一共有 9 层，前四层是静态的，像身份定义、人格定义、模式指令、审批策略这些，整个会话期间都不变，就把他们放在提示词的最前面，Prompt Caching 是按最长公共前缀命中的，所以前缀越稳定，缓存命中率就越高。

“第二点是上下文的管理。拿短期记忆来说吧，在上下文达到阈值的 80% 时，我们会新起一个 SubAgent，进行摘要压缩。”

然后再把压缩后的内容加上最近三轮的完整信息发送给 LLM。

因为 LLM 的窗口都是有上限的，DeepSeek V4 是 1M，已经很大了，但一个长任务很容易就会把窗口撑爆，摘要压缩是目前主流Agent的一个解决方案。

![](https://cdn.paicoding.com/stutymore/deepseek-harness-agent-mianshi-20260806155226-31c65c06.png)

当然了，为了避免摘要压缩的时候把一些关键信息丢失，我们会沉淀一些事实信息到长期记忆。

长期记忆暂时用关键词匹配召回最相关的信息，和摘要、最近3轮的完整信息一起组装到Prompt，重新发给 LLM。

### 04、Agent 优化有哪些常见手段？

“第一，简单任务用小尺寸模型，复杂任务上大尺寸模型。”

比如说意图识别，判断用户是要读文件还是执行命令，这种分类任务用小尺寸模型就够了，速度快、成本低。复杂推理像任务规划和代码生成才需要大尺寸模型。平场我用 Claude Code 也是这么做的，日常用 Sonnet，复杂任务就切到 Opus。

![](https://cdn.paicoding.com/stutymore/deepseek-harness-agent-mianshi-20260806160433-fd28e12e.png)

“第二，工具并行。”

Agent 经常要调好几个工具，比如同时读 3 个文件。如果前后没有依赖关系的话，就并行执行。

第三，就是前面提到的 Prompt Caching，也是投入产出比最高的。

#### 为什么？

“因为 LLM 已经帮我们实现了缓存命中，我们只需要在 Agent 调用 LLM 之前把不变的内容放到 Prompt 的最前面就行了，不用改架构。”

拿 DeepSeek V4 来说，缓存命中的情况下，百万 Token 的输入价格只有 0.02 元，未命中需要 1 元，差了 50 倍。

![](https://cdn.paicoding.com/stutymore/api-cache-hit-miss-20260806110405.png)

### 05、基于项目设计一个场景，如果遇到类似问题应该怎么解决？

“比如用户让 Agent 重构一个涉及多个文件的模块，改完后测试要全部通过。”

“就不能只用 ReAct。ReAct 的一个流程是观察、思考、行动。它改了文件 A，中间跑一次测试，测试挂了。但这个‘挂’不是因为 A 改错了，是因为 B、C、D 还没改。Agent 看到报错，可能会尝试修复一个根本不该修的问题，越改越乱。”

![](https://cdn.paicoding.com/stutymore/deepseek-harness-agent-mianshi-20260806155550-279bdf8c.png)

“这种任务就要切到 Plan 模式。规划器先读完所有文件，理解模块内部的依赖关系，然后生成一个任务图。”

“任务图是一个 DAG。假设 A 文件定义了接口，B 和 C 各自实现了这个接口，D 依赖 B 的输出。规划器生成的图大致是这样。”

先读所有文件（READ 类型，无依赖，并行）→ 改 A 的接口定义 → 改 B 和 C 的实现（互不依赖，并行）→ 改 D（依赖 B）→ 跑测试。

执行按拓扑排序来，每一轮找出所有入度为 0 的节点——就是没有前置依赖的任务——这一批并行执行。这批完成后更新依赖图，再找下一批。

![](https://cdn.paicoding.com/stutymore/deepseek-harness-agent-mianshi-20260806160432-cc9cccf5.png)

#### 改到一半发现计划有问题怎么办？

“比如改到第 4 个文件时发现，A 的接口变更了，还影响了一个之前漏掉的文件 E。”

“这时候分两种情况。”

如果进度不到一半，说明规划阶段对模块的理解可能有偏差，带着错误信息整体重新规划。

如果进度过半，已完成的工作量太大，推倒重来不划算，保留已完成的部分，追加 E 的修改任务，调整后续依赖关系，接着执行。

![](https://cdn.paicoding.com/stutymore/deepseek-harness-agent-mianshi-20260806161335-7ddb6373.png)

### 06、语义检索是如何实现的？

“派聪明用的是混合检索。”

![](https://cdn.paicoding.com/stutymore/deepseek-harness-agent-mianshi-20260806160853-79fbafe8.png)

“先说向量检索。用户的查询文本通过 text-embedding-v4 模型转成 2048 维的向量，然后在 Elasticsearch 里做 KNN 搜索。为了保证召回率，召回窗口设的比较大，是最终返回数量的 30 倍，如果最终要 5 条结果，KNN 先召回 150 条候选。”

“然后用 BM25 做二阶段重排序。在 KNN 召回的候选集上，对文本内容做关键词匹配打分。KNN 权重 0.2，BM25 权重 1.0，关键词匹配在排序中占主导。”

“这样做的好处是，向量检索负责语义层面的召回，不会漏掉表述不同但意思相近的内容；BM25 负责精排，确保关键词完全匹配的结果排在前面。”

#### 为什么用 BM25 做重排序？

![](https://cdn.paicoding.com/stutymore/deepseek-harness-agent-mianshi-20260806161332-43c8c168.png)

“向量检索对专有名词和缩写的匹配不够精确。用户搜‘MCP 协议’，向量可能会把‘RPC 协议’也召回来，因为语义上它们确实相近。但用户要的就是 MCP。BM25 能把关键词完全匹配的结果排到最前面，弥补向量检索在精确匹配上的不足。”

### 07、向量数据库在项目中具体承担什么作用？

“派聪明没有单独部署向量数据库，Elasticsearch 同时做向量存储和全文检索。”

“ES 里每条文档有两个核心字段。vector 字段存 2048 维的 Embedding 向量，ES 用 HNSW（Hierarchical Navigable Small World，分层可导航小世界图）算法建索引，做近似最近邻搜索。textContent 字段存原始文本，走 ES 自带的倒排索引做 BM25 关键词检索。”

![](https://cdn.paicoding.com/stutymore/deepseek-harness-agent-mianshi-20260806161859-e294c77d.png)

“文档入库前做分块，分块策略直接决定检索质量。分块大小 512 字符，相邻块重叠 100 字符。因为一个完整的概念可能正好跨在两个块的边界上，重叠保证边界处的语义不被截断。”

“分块逻辑分三级。先按双换行符切段落，每段独立。某段超过 512 字符，再按句子切分。切完如果某块不足 100 字符，就和前一块合并，太碎的块 Embedding 质量差，检索出来没什么用。”

![](https://cdn.paicoding.com/stutymore/deepseek-harness-agent-mianshi-20260806161900-8f5eded3.png)

“文档还有一层父子结构。子块就是 512 字符的检索单元，用来做精确匹配。父块最大 1MB，差不多是整篇文档的全文。检索命中子块后，可以回溯到父块拿完整上下文，让 LLM 看到更多信息再回答。大文件用流式解析，防止一次加载撑爆内存。”

#### 什么情况下该换专门的向量数据库？

“看数据规模和检索 QPS。派聪明的知识库在几万到几十万文档这个量级，ES 的 HNSW 完全撑得住。多部署一个 Milvus 或者 Qdrant，要多维护一套集群、多做一份数据同步，收益不大。”

![](https://cdn.paicoding.com/stutymore/deepseek-harness-agent-mianshi-20260806162239-61a0ee9e.png)

“但如果数据量到了千万级，或者检索 QPS 要求很高，ES 的 KNN 会成为瓶颈。HNSW 的内存开销随数据量线性增长，2048 维的向量每条占 8KB 左右，一千万条就是差不多 80GB 纯向量数据。到这个阶段，专用向量数据库的分布式检索和量化压缩能力就有价值了。”

### 08、为什么选择 langchain、langgraph 这些框架？底层流程了解吗？

“PaiCLI 没有用任何 AI 框架，全部自研。HTTP 层用的 OkHttp 直连各家大模型的 API。”

![](https://cdn.paicoding.com/stutymore/deepseek-harness-agent-mianshi-20260806162241-0936985a.png)

#### 为什么不用框架？

因为每家大模型的 API 规范不一样。GLM 的 Prompt Caching 用 glm-prompt-cache 模式，DeepSeek 用 automatic-prefix-cache，Kimi 用 moonshot-context-cache。

错误码的定义、重试策略、流式输出的格式也各有差异。框架把这些差异抹掉了，但我需要针对每家模型做精细控制，比如缓存命中率、token 计费、流式中断恢复，框架反而麻烦。

不过 LangGraph 的底层原理我了解。

它围绕一个状态图（State Graph）展开，节点是处理函数，边是条件路由。每个节点接收当前状态、执行操作、返回更新后的状态。Checkpoint 机制把每步的状态快照存下来，支持断点恢复和回放。

#### 什么场景下你会选框架？

![](https://cdn.paicoding.com/stutymore/deepseek-harness-agent-mianshi-20260806162733-d1455930.png)

“如果是快速验证一个想法，用框架跑通原型比较快。但如果项目要上生产、要做多模型适配和精细化控制，自研更合适。现在 AI Coding 能力很强，自研的开发成本已经很低了。”

### 09、模型输出结果如何控制规则？

“Prompt 约束是基础。”

系统提示词里定义了行为边界，哪些操作可以做、哪些禁止、输出格式怎么组织。这些规则每轮对话都在，模型看得到。但 Prompt 毕竟是自然语言，模型不一定百分百遵守，特别是上下文很长、注意力分散的时候。

“工具 Schema 是第一层约束。每个工具注册时带一个 JSON Schema，定义参数类型、必填项、取值范围。模型生成的工具调用参数必须通过 Schema 校验，不合规就拒绝执行，把错误消息返回给模型让它重新生成。比如说 write_file 的 file_path 必须是字符串、content 不能为空，这些约束模型绕不过去。”

![](https://cdn.paicoding.com/stutymore/deepseek-harness-agent-mianshi-20260806162736-211305c1.png)

“MCP 工具的 Schema 需要额外做一步清洗。MCP Server 返回的 Schema 经常带 $ref 引用和 anyOf 联合类型，模型遇到这些嵌套结构容易生成错误格式的参数。PaiCLI 在注册 MCP 工具时会把所有 $ref 展开、anyOf 拍平成最常用的类型，确保模型看到的是一个干净的参数定义。”

![](https://cdn.paicoding.com/stutymore/deepseek-harness-agent-mianshi-20260806163410-455f5ff2.png)

“审批是最后一层。”

即使参数完全合规，写操作在执行前还要过 HITL 审批。路径检查器拦截项目根目录以外的文件操作，命令检查器拦截危险命令。审批策略分三档，auto 自动通过、suggest 建议确认、never 必须手动确认，按工具的风险等级配置。

#### 审批被用户拒绝后 Agent 怎么反应？

![](https://cdn.paicoding.com/stutymore/deepseek-harness-agent-mianshi-20260806163723-3ce4e91f.png)

“拒绝结果作为 tool_result 返回给模型，消息里写明‘这个操作被用户拒绝了’。”

模型看到后自己决定下一步，可能换一种方式达成目标，比如说用户拒绝了直接覆盖文件，模型改成先备份再写入。

### 10、记忆模块是怎么设计的？

“PaiCLI 的记忆分了三层。”

![](https://cdn.paicoding.com/stutymore/deepseek-harness-agent-mianshi-20260806163724-6f11c7ca.png)

“短期记忆是会话级别的，只在当前会话内有效。底层是一个LinkedHashMap，先进来的排前面。token 预算是上下文窗口的 45%，超了就淘汰最旧的条目。”

“长期记忆是持久化的，跨会话存活。存在 SQLite 里，按类型和作用域分类。每轮 LLM 调用前，检索和当前输入相关的长期记忆条目，注入系统提示词。新存入的条目会做去重检测，避免重复。”

“项目记忆是开发者提前写好的规则文件，类似 Claude Code 的 CLAUDE.md。按优先级加载：PAI.md → .paicli/PAI.md → PAI.local.md → .paicli/PAI.local.md，后面的覆盖前面的。”

### 11、多轮、多会话场景下 memory 如何处理？

“多轮场景，对话越来越长，上下文窗口迟早装不下。PaiCLI 的做法是保留最近 3 轮完整对话不动，更早的历史用 LLM 生成摘要替换。摘要保留关键诉求、已完成操作、达成的共识和待办事项。”

“多轮场景还有一个容易忽略的点，短期记忆的 token 预算。预算上限是上下文窗口的 45%，超了就从最旧的条目开始淘汰。淘汰不是直接删除，被淘汰的条目先用 LLM 做一次压缩摘要再替换，关键信息不会完全丢掉。”

![](https://cdn.paicoding.com/stutymore/deepseek-harness-agent-mianshi-20260806164142-af8bca81.png)

“多会话场景靠长期记忆的持久化。PaiCLI 的长期记忆存在 SQLite 里，按类型和作用域分类。新会话启动时从磁盘加载，Agent 还记得之前存过的偏好和规则。新存入的条目会做去重检测，同一条偏好不会存两份。”

“/clear 命令只清短期记忆和对话历史，长期记忆不受影响。用户说‘清一下上下文’通常是想换个话题重新开始，不是想让 Agent 忘掉所有偏好。”

![](https://cdn.paicoding.com/stutymore/deepseek-harness-agent-mianshi-20260806164657-7e54cd85.png)


### 12、如果系统出现异常，整体的容错和异常处理机制怎么设计？

“LLM 调 API 可能报错，工具执行可能出错，Agent 自身可能跑进死循环。”

![](https://cdn.paicoding.com/stutymore/deepseek-harness-agent-mianshi-20260806164700-9f7f9ef6.png)

“LLM 层，重试 3 次，指数退避加随机抖动。退避基数 500 毫秒，上限 30 秒。”

只有特定错误码才重试，比如 429（限流）、500/502/503/504（服务端异常）、408（超时）。400（参数错误）、401（认证失败）这些不重试，因为重试也不会好。如果响应头带了 Retry-After，优先用服务端建议的等待时间。

“工具层，单个工具执行失败不中断整体流程。失败的工具返回一条错误消息，作为 tool_result 追加到对话历史，LLM 看到错误消息后自己决定是换一种方式重试还是跳过。并行执行的多个工具，总超时 90 秒。”

“Agent 层，防止死循环。检测到连续相同的工具调用就强制退出。Plan 模式下，如果任务执行到中途失败，看进度，进度不到一半就带着错误信息重新规划，进度过半就保留已完成的部分继续推进。”

### 13、再给一个上下文处理相关的场景题，如何优化 context 管理？

“比如一个 200K 窗口的 Agent，处理一个大型项目，对话到第 30 轮时上下文即将溢出。”

“到第 30 轮，对话历史加上工具调用的结果，token 数很可能已经逼近压缩触发阈值了。”

200K 窗口的触发阈值大约 167K，算法是窗口大小减去两个预留量，min(20K, 窗口/4) 预留给压缩后的摘要，min(13K, 窗口/8) 预留给后续对话。

两个预留加起来大约 33K，200K 减掉就是 167K。预留空间的目的是防止压缩完马上又溢出。

![](https://cdn.paicoding.com/stutymore/deepseek-harness-agent-mianshi-20260806165129-1bf517f4.png)

“触发压缩后第一步扫描对话历史，找到所有 user 消息的位置索引。”

第二步从最后一条 user 消息往前数 3 条，这 3 轮完整对话标记为保留区，保留区内的所有消息，包括 user、assistant、tool_call、tool_result，都不动。

第三步把保留区之前的所有消息发给 LLM 生成摘要，摘要替换掉原始消息。

![](https://cdn.paicoding.com/stutymore/deepseek-harness-agent-mianshi-20260806165512-3965dbd9.png)

“摘要必须保留四类信息，用户的关键诉求、已完成的操作、双方达成的共识、待办事项。”

## ending

这么说吧。

Harness 将成为未来五年内的主题，除了模型，各大厂都在争先恐后做自己的 Harness。

当然，换一个名字，叫 Agent 也行。

其实所有的 Agent 都是在做 Harness，让模型更好用，更匹配业务。

而Harness最关键的，就是上下文管理、Memory管理、多 Agent 协作，以及提示词优化。

别的，就只是界面的交互了。

而拥有Harness经验的，未来一定会非常吃香。

信我说的，准没错。
