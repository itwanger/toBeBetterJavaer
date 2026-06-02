---
title: AI Agent 面试 258 题合集
shortTitle: AI Agent 面试 258 题
description: AI Agent 面试 258 题合集，围绕派聪明、PaiAgent、PaiCLI 三个实战项目展开，覆盖 Agent、RAG、LLM、MCP、AI Coding、工程化和模型工程等方向
tag:
  - 面试
category:
  - AI
author: 沉默王二
date: 2026-05-20
---

投了几十家大厂，好不容易拿到一家面试，结果面试官一开口：“你做过 Agent 项目吗？”

嘴巴张了张，一个字也蹦不出来。

我花了三周时间，把牛客、星球里高频出现的 Agent/RAG/Prompt/LLM/MCP 相关面试题全过了一遍，按出现频次 × 难度权重筛出 258 道题目（后面会按照大家的反馈，继续补充）。

这些题目我们会串联到三个实战项目来讲。

- **PaiAgent**（LangGraph4j + Spring AI 的工作流编排平台）
- **派聪明**（基于 ES 混合搜索的 RAG 知识库）
- **PaiCLI**（对标 Claude Code 的 Java Agent 命令行工具）。

除此之外，还有 NLP、Transformer、LangChain、微调训练和 AI Coding 新趋势等。后续我会逐题拆解并给出加精答案，这篇先把 258 道题目给到大家，方便收藏按图索骥。

题目难度分三级：🟢 基础、🟡 进阶、🔴 深入。

答案会尽量映射到派聪明、PaiAgent、PaiCLI 的项目真实回答场景，避免纯粹的八股😄。

## 01、Agent 核心机制（18 题）

Agent 是这轮 AI 面试的绝对 C 位，18 道题覆盖了从基础概念到生产实战的完整知识点。PaiCLI 本身就是一个完整的 ReAct Agent，PaiAgent 则在工作流层面支持多节点编排。

### 1. 什么是 Agent？和直接调大模型 API 有什么本质区别？
大模型只会“接收输入→生成输出”，Agent 在此基础上加了感知环境、自主决策、调用工具、迭代反馈的能力。一个是被动的问答机器，一个是能自己动手干活的智能体。

🟢 基础 | `→ PaiCLI` | 字节、腾讯、阿里

### 2. Agent 的核心架构由哪些组件构成？
经典四件套：规划（Planning）、记忆（Memory）、工具调用（Tool Use）、行动（Action）。PaiCLI 四个都有：Plan-and-Execute 做规划、SQLite 存记忆、MCP 接工具、ReAct 循环执行行动。

🟢 基础 | `→ PaiCLI` | 字节、阿里云

### 3. Workflow、Agent、Tools 三个概念怎么区分？
Tools 是原子能力（搜索、计算、读文件），Agent 是能自主决策调用 Tools 的智能体，Workflow 是多个 Agent 或步骤按预设流程编排。PaiAgent 就是 Workflow 层面的产品，PaiCLI 是 Agent 层面的产品，它们都调用各种 Tools。

🟢 基础 | `→ PaiCLI（Agent）`

### 4. 什么是 ReAct 框架？思考-行动-观察循环怎么落地的？
面试出现频率最高的一道，没有之一。能说清 Thought→Action→Observation 的循环机制是及格线，能讲清自己项目里怎么控制最大迭代次数、怎么处理工具返回异常才是加分项。

🟡 进阶 | `→ PaiCLI` | 淘天、腾讯、字节、百度

### 5. ReAct、Plan-and-Execute、Reflection 三种范式有什么核心区别？
ReAct 边想边干，适合探索型任务；Plan-and-Execute 先出完整计划再逐步执行，适合步骤明确的复杂任务；Reflection 在执行后加一轮自我评估和修正。PaiCLI 同时实现了 ReAct 和 Plan-and-Execute，还有编译反馈驱动的 Reflection 机制。

🟡 进阶 | `→ PaiCLI` | 淘天、腾讯

### 6. 复杂任务怎么做拆分？为什么要拆？效果怎么提升的？
大模型一次性处理复杂任务容易逻辑混乱。拆成子任务后每一步专注一件事，成功率显著提升。

🟡 进阶 | `→ PaiCLI` | 字节、阿里

### 7. 多 Agent 协作有哪些模式？实际踩过什么坑？
常见的有主从模式、平等协商模式、层级委派模式。

🟡 进阶 | `→ PaiCLI` | 字节、阿里云、蚂蚁、小红书

### 8. 单 Agent 和多 Agent 怎么做选型判断？
一句话：任务能拆成独立子任务就上多 Agent，否则单 Agent 加工具就够了。

🟡 进阶 | `→ PaiCLI` | 字节、淘天、阿里云

### 9. Agent 上下文管理怎么做？怎么避免上下文爆炸？
对话轮次一多，token 就炸了。常见方案有滑动窗口、摘要压缩、关键信息提取。

🟡 进阶 | `→ PaiCLI` | 快手、百度、字节、阿里云、蚂蚁

### 10. Agent 的短期记忆和长期记忆分别怎么实现？
短期记忆就是当前对话上下文，长期记忆需要持久化存储跨会话的事实。

🟡 进阶 | `→ PaiCLI` | 淘天、快手

### 11. Agent 记忆压缩通常有哪些方法？
主流三种：摘要压缩（把 10 轮对话压成一段摘要）、实体提取（只保留关键实体和关系）、向量化存储（记忆转向量，按相似度召回）。

🟡 进阶 | `→ PaiCLI` | 腾讯

### 12. 长期记忆的 FIFO 淘汰有什么问题？怎么优化？
FIFO 最大的坑是把重要但不常用的记忆淘汰掉了。

🔴 深入 | `→ PaiCLI` | 腾讯

### 13. 多轮工具调用，怎么判断该继续调用还是该停？
两种策略：一是模型自己判断（返回的 finish_reason 不含 tool_calls 时停止），二是工程侧兜底（设最大迭代次数）。

🟡 进阶 | `→ PaiCLI` | 淘天

### 14. Agent 的 Planning 模块有哪些实现方式？
主流两种：Step-by-step（走一步看一步，类似 ReAct）和 Plan-and-execute（先出完整计划再逐步执行）。更高级的还有 Plan→Execute→Replan 循环，执行过程中发现计划不对就重新规划。PaiCLI 的 Plan-and-Execute 模式就支持动态重新规划。

🟡 进阶 | `→ PaiCLI`

### 15. Agent 的反思机制是什么？为什么需要反思？
反思就是让 Agent 评估自己的输出质量，发现错误就自我修正。没有反思的 Agent 犯了错只会一条路走到黑。

🟡 进阶 | `→ PaiCLI`

### 16. 为什么你选择手搓 Agent 而不用框架？
框架（LangChain、LlamaIndex）封装太重。

🟡 进阶 | `→ PaiCLI`

### 17. Agent 怎么做经验积累和自我学习？

Skill

🔴 深入 | `→ PaiCLI`

### 18. 多 Agent 协作时意见冲突怎么统一？
常见方案有投票机制（少数服从多数）、裁判 Agent（专门做最终决策）、层级委派（上级 Agent 拍板）。

🔴 深入 | `→ PaiCLI` | 字节、阿里

## 02、RAG 全流程（20 题）

RAG 是 AI 面试的第二大热门方向，20 道题覆盖了从文档切片到检索排序的完整流程。派聪明项目是回答这些题的最佳弹药，它用 Elasticsearch 做向量存储、支持 KNN + BM25 混合搜索、还实现了多租户权限隔离，每一个技术选型背后都有真实的踩坑故事可以讲。

### 19. 为什么需要 RAG？直接把文档塞给大模型不行吗？
上下文窗口有限、塞太多 token 费钱又慢、模型对长文档的“注意力”分配不均匀（中间内容容易被忽略）。RAG 的核心价值是“先检索再生成”，只把最相关的片段喂给模型。

🟢 基础 | `→ 派聪明整体架构` | 字节、淘天

### 20. RAG 和微调怎么选？各自适合什么场景？
RAG 适合知识频繁更新、需要溯源的场景（客服、文档问答）；微调适合需要改变模型行为风格、固定领域的场景（医疗、法律术语）。两者不互斥，可以先微调让模型熟悉领域术语，再用 RAG 补充最新知识。派聪明选的就是 RAG 路线。

🟢 基础 | `→ 派聪明（RAG 路线）`

### 21. 描述一下完整的 RAG 系统工作流程？
文档摄入（解析→分块→向量化→入库）→ 查询处理（查询向量化→KNN 召回→关键词匹配与权限过滤→BM25 rescore）→ 生成（拼接检索结果 + 用户问题→LLM 生成→引用标注）。派聪明的核心链路都有对应实现，面试时画出来逐步讲最有效。

🟢 基础 | `→ 派聪明完整实现` | 字节、快手

### 22. 文档分块策略怎么设计？chunk 大小怎么定？
派聪明用的是 512 字符块、100 字符重叠的配置，最小块 100 字符。分块太大语义不聚焦，太小丢失上下文。当前 ParseService 用流式父缓冲承接长文档，再切成子块入库；命中 child 后扩展 parent 上下文可以作为后续 Parent-Child RAG 增强点。

🟡 进阶 | `→ 派聪明 ParseService 512/100 配置` | 快手、字节、Moka、阿里

### 23. 怎么规避语义被切割掉的问题？
三个手段：重叠切分（相邻 chunk 留重叠区）、按自然语义边界切分（段落、句号、标题）、递归切分（先按大结构切，不够再细分）。派聪明的 ParseService 优先在标点符号处断句，避免在词语中间截断。

🟡 进阶 | `→ 派聪明标点符号断句逻辑`

### 24. Embedding 模型怎么选型？维度越高越好吗？
不是。维度高意味着存储成本高、检索速度慢。派聪明用的是阿里 Embedding 模型，2048 维，在中文场景下效果和性价比都不错。选型时要综合考虑语言支持、维度、速度和价格。

🟡 进阶 | `→ 派聪明阿里 Embedding 2048 维` | 快手、阿里

### 25. Embedding 有哪几种算法？各自的特点是什么？
Word2Vec（静态词向量，不考虑上下文）、BERT 类（双向编码，适合短文本语义匹配）、Sentence Transformers（专门做句子级别嵌入）、BGE/GTE 系列（中文优化，MTEB 榜单前列）。派聪明默认走阿里 text-embedding-v4，维度 2048，也预留了智谱 embedding-3 这类 OpenAI 兼容 Embedding Provider 的切换口径。

🟡 进阶 | `→ 派聪明选型依据`

### 26. 向量数据库怎么选型？你们项目用的哪个？
主流选择：Milvus（大规模分布式）、Qdrant（Rust 高性能）、Weaviate（GraphQL 友好）、Elasticsearch（已有 ES 集群就直接用）、Chroma/FAISS（轻量原型验证）。派聪明选了 ES，因为团队本身就熟悉 ES 生态，不需要额外引入新组件。

🟡 进阶 | `→ 派聪明 ES 8.10 + dense_vector` | 字节、快手

### 27. 向量检索和关键词检索的混合搜索怎么做？
派聪明的 HybridSearchService 先用 KNN 做向量召回，召回窗口是 topK×30；同时用 textContent match 做关键词约束，并叠加 userId、public、orgTag 权限过滤，最后通过 BM25 rescore 做第二阶段排序。纯向量搜索容易漏掉精确关键词，纯关键词又缺语义理解，混合搜索两头都兼顾了。

🟡 进阶 | `→ 派聪明 HybridSearchService KNN + BM25` | 快手、字节

### 28. 什么是 Query Rewrite？为什么需要改写用户查询？
用户提问经常口语化、模糊、有歧义。Query Rewrite 把用户原始问题改写成更适合检索的形式，比如补全指代、拆分多意图、扩展同义词。派聪明当前主链路是查询向量化 + KNN/BM25 混合检索，Query Rewrite 可以作为检索增强点继续接入。

🟡 进阶 | `→ 派聪明可扩展` | 快手、阿里

### 29. 什么是多路召回？具体怎么做？
同一个查询走多条检索通道（向量召回、关键词召回、知识图谱召回），每条通道返回一批候选，最后合并去重排序。派聪明当前更准确地说是 KNN 召回叠加关键词约束和 BM25 rescore，不是完全独立的多路召回；后续可以扩展成向量、关键词、知识图谱等多路候选合并。多路召回的核心价值是降低单一路径漏召回的风险。

🟡 进阶 | `→ 派聪明 KNN + BM25 rescore，可扩展多路召回` | 快手、字节

### 30. 为什么检索之后还需要 Rerank？
向量检索是“粗筛”，召回量大但排序不够精准。Rerank 可以用交叉编码器对 query 和每个候选文档做精细打分，把最相关的排到前面。派聪明当前采用的是 KNN 召回后再用 BM25 rescore 做第二阶段排序，独立 Rerank 可以作为后续增强。

🟡 进阶 | `→ 派聪明 KNN 召回 + BM25 rescore` | 快手

### 31. Rerank 的 Top-K 怎么确定？
没有银弹，靠实验。一般先设一个较大的召回窗口，然后在测试集上逐步缩小，找到精度和延迟的平衡点。K 太大增加排序和上下文拼接成本，K 太小可能漏掉相关文档。派聪明现在的思路是 topK 放大召回窗口，再用 BM25 rescore 收敛结果。

🟡 进阶 | `→ 派聪明召回窗口与 rescore 权重` | 快手

### 32. RAG 系统怎么评测？核心指标有哪些？
检索阶段看召回率（Recall）、精准率（Precision）、MRR（平均倒数排名）。生成阶段看忠实度（Faithfulness，答案是否基于检索到的内容）、相关性（Relevancy）、有害性。RAGAS 框架把这套评测体系标准化了。

🟡 进阶 | `→ 派聪明 RAG 评测指标` | 快手、Moka

### 33. 向量数据库里的历史文档怎么做时间衰减？
老文档的信息可能过时了，但向量相似度不会因为时间变化而降低。解决方案：给检索分数乘以一个时间衰减因子（比如指数衰减），或者在索引里加时间字段做过滤。

🟡 进阶 | `→ 派聪明 ES 元数据过滤可扩展` | 快手

### 34. 在什么场景下会用图数据库来增强向量检索？
当知识之间有复杂的关联关系时（比如“A 公司收购了 B 公司，B 公司的 CEO 是 C”），纯向量检索很难捕捉这种多跳关系。图数据库（Neo4j、NebulaGraph）擅长处理实体关系查询，和向量检索配合可以回答“C 现在在哪家公司任职”这类需要推理的问题。

🔴 深入 | `→ 派聪明未来可扩展方向`

### 35. Agentic RAG 和传统 RAG 的核心区别？
传统 RAG 是“检索→生成”的单次流水线。Agentic RAG 给 RAG 加了 Agent 能力，模型可以判断“这次检索结果不够好，换个关键词再搜一次”，或者“这个问题需要先查 A 再查 B 最后综合”。派聪明的 ReAct 循环和 AgentToolRegistry 里的 search_knowledge 工具，就是把知识库检索变成 Agent 可调用工具的实现。

🟡 进阶 | `→ 派聪明 ReAct + search_knowledge 工具`

### 36. 处理长文档时怎么避免 OOM？
派聪明在 ParseService 里做了两个关键设计：一是流式分块处理，避免一次性把整个文档加载进内存；二是内存阈值保护，运行时内存占用超过 80% 会先触发 GC，复查后仍超阈值才拒绝继续处理。大文件场景下，这比单纯扩大 JVM 堆更稳。

🟡 进阶 | `→ 派聪明流式处理 + 内存阈值保护`

### 37. RAG 知识库怎么实现动态更新？
文档更新后要同步更新向量索引。派聪明通过 Kafka 异步处理文件上传队列（默认 topic 为 file-processing-topic1），新文档上传后自动触发“解析→分块→向量化→入库”的完整流程，不需要手动重建索引。删除文档时同步清理对应的向量记录。

🟡 进阶 | `→ 派聪明 Kafka 异步更新`

### 38. 多租户场景下 RAG 的权限隔离怎么做？
派聪明用了三层权限过滤：userId（用户私有文档）、orgTag（组织级隔离）、isPublic（公开标志）。检索时在 ES 查询里加 filter 条件，确保 A 公司的人搜不到 B 公司的文档。这道题在 ToB 方向的公司面试里高频出现。

🟡 进阶 | `→ 派聪明 userId + orgTag + isPublic 三层过滤`

## 03、LLM 基础与工程（25 题）

这 25 道题从 Transformer 架构一路聊到模型部署，覆盖了大模型的底层原理和工程实践。不需要每道都答得像论文一样深，但 Transformer、注意力机制、KV Cache 这几个点几乎是必考题。能结合项目经验回答的就结合，纯理论的就把核心机制说清楚。

### 39. 什么是大语言模型？和传统 NLP 模型有什么区别？
传统 NLP 模型（LSTM、CRF）针对特定任务训练，换任务就得重新训练。大语言模型通过海量数据预训练获得通用语言能力，一个模型能处理翻译、摘要、问答、代码生成等各种任务，靠 Prompt 引导就行。

🟢 基础

### 40. 讲讲 Transformer 的基本架构？Encoder 和 Decoder 分别干什么？
Encoder 负责理解输入（把文本编码成语义向量），Decoder 负责生成输出（基于语义向量逐 token 生成文本）。GPT 系列只用 Decoder，BERT 只用 Encoder，T5 用完整的 Encoder-Decoder。现在主流的大语言模型基本都是 Decoder-only 架构。

🟢 基础 | 字节、腾讯

### 41. 多头注意力（MHA）有哪些局限？MQA、GQA、Flash Attention 怎么解决？
MHA 每个头都有独立的 KV 矩阵，显存占用大。MQA（Multi-Query Attention）所有头共享一组 KV，省显存但效果有损。GQA（Grouped-Query Attention）折中方案，几个头共享一组 KV。Flash Attention 从计算层面优化，减少 HBM 访问次数，不改注意力机制本身。

🟡 进阶 | 字节、腾讯

### 42. 位置编码是干什么用的？RoPE 和 ALiBi 有什么区别？
Transformer 本身不感知 token 顺序，位置编码告诉模型“第几个词在第几个位置”。RoPE（旋转位置编码）通过旋转矩阵编码相对位置，外推性好。ALiBi 直接在注意力分数上加一个和距离相关的偏置，实现简单，不需要额外参数。

🟡 进阶

### 43. 分词器是什么？BPE、WordPiece、SentencePiece 有什么区别？
分词器把文本拆成 token（模型能理解的最小单位）。BPE（字节对编码）从字符出发逐步合并高频对，GPT 系列在用。WordPiece 类似 BPE 但用似然概率选合并对，BERT 在用。SentencePiece 直接在原始文本上训练，不依赖预分词，多语言友好。

🟡 进阶

### 44. 大模型是怎么训练出来的？预训练→SFT→RLHF 三阶段讲一下？
预训练（在海量无标注文本上学语言能力）→ SFT（用人工标注的指令-回答对微调，学会“听话”）→ RLHF（用人类偏好反馈做价值观校准，学会“说人话”）。三阶段花费依次降低但重要性递增。

🟡 进阶 | 字节、腾讯

### 45. 什么是 Scaling Law？大模型的涌现能力是怎么回事？
Scaling Law 说的是模型性能随参数量、数据量、算力的增加呈可预测的幂律关系。涌现能力是指模型规模达到某个阈值后突然出现的能力（比如思维链推理），小模型完全不会，大模型突然就会了。

🟡 进阶

### 46. 大模型微调有哪些方案？LoRA 的原理是什么？
全量微调（改所有参数，贵）、LoRA（冻结原始权重，只训练低秩分解矩阵，参数量减少 99%+）、QLoRA（量化 + LoRA，更省显存）、Adapter（在层间插入小模块）、Prefix Tuning（只调前缀向量）。LoRA 是目前性价比最高的方案。

🟡 进阶 | 字节、阿里

### 47. SFT 之后还有哪些 Post-Training？RLHF、DPO、GRPO 什么关系？
SFT 让模型学会格式和基本能力，Post-Training 让模型学会“什么样的回答更好”。RLHF 用奖励模型 + PPO 训练，DPO 去掉奖励模型直接用偏好对训练，GRPO 去掉 Critic 网络用组内相对比较。进化路径是越来越简化训练流程。

🔴 深入 | 作业帮、腾讯

### 48. DPO 和 PPO 的区别是什么？
PPO 需要先训一个奖励模型，再用奖励模型的分数做策略梯度优化，流程复杂。DPO 直接用偏好数据对（好回答 vs 坏回答）优化策略，把奖励模型隐式地融入到损失函数里，训练更简单稳定。

🔴 深入 | 腾讯、三七互娱

### 49. 大模型生成文本时有哪些解码策略？
贪心搜索（每步选概率最高的 token，确定性强但无聊）、束搜索（保留 top-k 条候选路径）、温度采样（temperature 控制随机性）、Top-P 采样（nucleus sampling，动态截断低概率 token）、Top-K 采样（只从前 K 个 token 里采样）。

🟡 进阶

### 50. Temperature、Top-P、Top-K 分别是什么？怎么调？
Temperature 控制概率分布的“平滑度”（低→保守，高→发散），Top-P 控制累积概率阈值，Top-K 控制候选集大小。代码生成建议低 temperature（0.1-0.3），创意写作用高 temperature（0.7-1.0）。PaiAgent 的 ChatClientFactory 默认 temperature=0.7。

🟡 进阶 | `→ PaiAgent ChatClientFactory temperature 配置`

### 51. KV Cache 是什么？Prompt Caching 又是什么？
KV Cache 缓存已计算的 Key/Value 矩阵，避免每生成一个新 token 都重新算前面所有 token 的注意力。Prompt Caching 更上一层，缓存相同前缀 Prompt 的计算结果，多次请求共享同一份缓存。PaiCLI 支持 Prompt Cache 可视化，让用户看到缓存命中率。

🟡 进阶 | `→ PaiCLI Prompt Cache 可视化`

### 52. 大模型量化是什么？INT8/INT4/AWQ/GPTQ 怎么选？
把模型参数从 FP16 压缩到 INT8/INT4，显存占用直接减半或减四分之三。GPTQ 是训后量化（快但精度损失稍大），AWQ（Activation-aware）考虑激活值分布做量化（精度更好），INT4 省显存最多但精度损失最大。实际选型看你的显卡显存和精度要求。

🟡 进阶

### 53. 长上下文压缩有哪些方案？
主流方案有三种：对话摘要（把历史对话压缩成一段摘要）、关键信息提取（只保留重要的事实和决策）、滑动窗口（只保留最近 N 轮）。PaiCLI 支持 1M token 窗口的模型，同时配合动态压缩策略，在窗口快满时自动触发压缩。

🟡 进阶 | `→ PaiCLI 动态压缩 + 1M token 窗口` | 快手、淘天、拼多多、腾讯

### 54. 大模型幻觉问题怎么减少？
RAG 是最有效的方案之一，让模型基于检索到的真实文档回答，而不是“自由发挥”。派聪明用 generationId 关联 referenceMappings，并在 ChatGenerationStateService / ConversationService 中保存引用详情，前端可以点击“来源”回看命中的 chunk。其他手段还有降低 temperature、增加 system prompt 约束、让模型说“我不确定”。

🟡 进阶 | `→ 派聪明 generationId + referenceMappings 引用追踪` | 阿里云、京东、蚂蚁

### 55. 什么是 CoT（思维链）？为什么效果好？有什么局限？
CoT 让模型“一步步想”而不是直接给答案，把推理过程显式化。效果好是因为把复杂问题分解成了多个简单步骤。局限是增加了 token 消耗和延迟，而且模型可能生成“看起来合理但实际错误”的推理链。

🟡 进阶

### 56. MoE 混合专家模型是什么？DeepSeek、Qwen 为什么用 MoE？
MoE 把一个大模型拆成多个“专家”子网络，每次推理只激活其中几个专家。好处是模型总参数量大（知识储备多），但每次推理的计算量小（只用部分专家）。DeepSeek V3 用的就是 MoE，671B 总参数但每次只激活 37B。

🟡 进阶

### 57. 多模型动态切换怎么实现？不重启服务就能换？
PaiAgent 的 ChatClientFactory 每次调用都 new 一个新的 ChatClient，不用 Spring 单例。每个节点可以配不同的 apiUrl 和 model，第一个节点用 DeepSeek 做初步分析，第二个节点用 GPT 做精细加工，改个配置下次执行就生效。

🟡 进阶 | `→ PaiAgent ChatClientFactory 动态工厂` | Shopee、腾讯、Moka

### 58. OpenAI 兼容协议是什么？各家大模型的差异在哪？
请求格式统一走 `/v1/chat/completions`，差异在 base_url 和 api_key。响应大部分字段一致，个别细节不同，比如 token 统计有的叫 prompt_tokens 有的叫 input_tokens。PaiAgent 用 Spring AI 的 OpenAiChatModel 统一了 OpenAI、DeepSeek、通义千问三家的接入。

🟡 进阶 | `→ PaiAgent OpenAiApi 统一多厂商`

### 59. 如何写好 Prompt？分享下 Prompt 工程的实践经验？
核心原则：角色设定（“你是一个资深Java工程师”）、明确任务（具体描述要做什么）、输出格式约束（JSON/Markdown）、Few-shot 示例（给几个例子）、约束条件（不要做什么）。PaiCLI 做了一套 Prompt 分层设计，从系统级到 Skill 级，层级越高优先级越高。

🟡 进阶 | `→ PaiCLI Prompt 分层覆盖机制`

### 60. 流式输出（SSE / WebSocket）怎么设计？
派聪明用 WebSocket 做长连接，结合 DeepSeek 流式接口实现“打字机效果”，模型每生成一个 token 就推送给前端。还支持用户主动停止生成。技术细节包括心跳保活、断线重连、背压处理。

🟡 进阶 | `→ 派聪明 WebSocket + DeepSeek 流式接口` | 快手

### 61. Token 预算管理怎么做？
在模型调用前估算本次请求的 token 用量，如果超预算就先压缩上下文。PaiCLI 支持 Prompt Cache 可视化，让用户能看到每次请求的 token 消耗分布（系统提示词占了多少、历史对话占了多少、工具描述占了多少），方便针对性优化。

🟡 进阶 | `→ PaiCLI 动态预算 + Prompt Cache 可视化`

### 62. 大模型部署有哪些主流方案？vLLM、TGI、llama.cpp 怎么选？
vLLM（PagedAttention，显存利用率高，适合高并发在线服务）、TGI（HuggingFace 出品，和 HF 生态集成好）、llama.cpp（C++ 实现，CPU/低端 GPU 也能跑）、SGLang（RadixAttention，适合复杂 Prompt 复用场景）。生产环境高并发首选 vLLM。

🟡 进阶

### 63. 对比使用过哪些主流大模型？你们项目里最终选了哪个？
PaiAgent 支持 OpenAI、DeepSeek、通义千问、智谱四家。PaiCLI 接了 GLM、DeepSeek V4、Kimi、StepFun 等。选型原则：代码生成优先 DeepSeek/Claude，中文对话优先通义千问/GLM，性价比优先 DeepSeek。没有最好的模型，只有最适合场景的模型。

🟡 进阶 | `→ PaiAgent 四家模型 / PaiCLI 多模型适配` | Shopee、腾讯

## 04、MCP 与工具调用（14 题）

MCP（Model Context Protocol）是 2025 年以来最火的 AI 基础设施协议，Anthropic 提出、各大厂商跟进。这 14 道题从 Function Calling 的底层原理到 MCP 的工程落地，再到 A2A 这种新协议，覆盖面比较全。PaiCLI 从第一天就深度集成了 MCP，支持 60+ 工具自动注册，面试时能讲清原理和落地经验绝对是加分项。

### 64. Function Calling 底层是怎么实现的？
模型在训练阶段见过大量“函数描述→调用参数”的样本，推理时根据用户意图生成结构化的函数调用 JSON。PaiAgent 里每个工具通过 Spring AI 的 FunctionCallback 接口注册，getName/getDescription/getInputTypeSchema 三件套就是 Function Calling 的标准协议。

🟡 进阶 | `→ PaiAgent FunctionCallback 实现` | 字节、阿里

### 65. LLM 是如何学会调用外部工具的？Function Call 能力怎么训练？
两种路径：一是在 SFT 阶段用大量“用户问题→工具调用→工具返回→最终回答”的样本做微调；二是在 Prompt 里描述工具并给 Few-shot 示例，利用 In-Context Learning 能力。前者效果更稳定，后者不需要重新训练。GPT 系列走的是第一条路。

🟡 进阶

### 66. MCP 是什么？它解决了什么问题？
MCP 是一套标准化的“模型↔工具”通信协议，让 AI 应用能像 USB 一样即插即用地接入各种外部工具。之前每接一个工具就要写一套适配代码，有了 MCP，工具提供方按协议封装一次，所有支持 MCP 的 Agent 都能直接用。

🟡 进阶 | `→ PaiCLI MCP 集成 / PaiAgent MCP 工具配置` | 腾讯、蚂蚁、字节

### 67. MCP 由哪几部分组成？
三大组件：MCP Server（提供工具/资源的服务端）、MCP Client（Agent 侧的客户端，发起调用）、协议规范（定义工具描述格式、请求响应格式、传输方式）。PaiCLI 里同时实现了 Client 端（调用外部 MCP Server）和对协议的完整支持。

🟡 进阶 | `→ PaiCLI MCP Client 实现`

### 68. MCP 和 Function Calling 有什么区别？
Function Calling 是模型层面的能力，模型决定调用什么函数、传什么参数。MCP 是传输层的协议，规定了工具怎么描述自己、怎么接收调用、怎么返回结果。可以理解为 Function Calling 是“大脑的决策”，MCP 是“手脚的执行通道”。

🟡 进阶 | `→ PaiAgent（Function Calling）+ PaiCLI（MCP 传输）` | 作业帮、腾讯

### 69. Function Calling、Skill、MCP 三者有什么区别？
FC 是模型决策层（决定调什么工具），MCP 是传输层（工具怎么通信），Skill 是知识层（预置的最佳实践指南）。三者不互斥，一次完整的工具调用可能同时涉及：Skill 告诉模型“这个场景该用搜索工具”，模型通过 FC 生成调用参数，MCP 把请求发给搜索服务。

🟡 进阶 | `→ PaiAgent（FC + Skill）+ PaiCLI（FC + MCP + Skill）`

### 70. MCP Server 的 stdio 和 HTTP 模式分别怎么用？
stdio 模式通过子进程通信，适合本地工具（文件操作、Git 命令等），延迟低但只能单机。HTTP 模式走网络请求，适合远程服务（数据库、第三方 API），支持分布式但有网络开销。PaiCLI 两种都支持，还能自动发现和注册 MCP Server 的工具列表。

🟡 进阶 | `→ PaiCLI stdio + HTTP 双模式`

### 71. 为什么有些推理模型不支持 MCP？
推理模型（比如 o1、DeepSeek-R1）在设计时优化了长链推理能力，但牺牲了工具调用能力。它们的训练数据和 RLHF 流程侧重于“想清楚再回答”而不是“边调工具边回答”。解决方案是用推理模型做规划，再用普通模型执行工具调用。

🟡 进阶

### 72. 什么是 A2A 协议？和 MCP 有什么区别？
A2A（Agent-to-Agent）是 Google 提出的 Agent 间通信协议，解决的是“Agent 和 Agent 怎么对话”的问题。MCP 解决的是“Agent 和工具怎么通信”。一个是 Agent 间的横向协作，一个是 Agent 向下调用工具。

🟡 进阶

### 73. WebSocket 和 SSE 通信有什么区别？在 AI 场景中各自怎么用？
SSE 是单向的（服务端→客户端），适合模型流式输出。WebSocket 是双向的，适合需要客户端随时发消息的场景（比如中途打断生成）。派聪明用 WebSocket 就是因为需要支持用户主动停止生成。

🟡 进阶 | `→ 派聪明 WebSocket 双向通信`

### 74. 工具描述（Tool Description）怎么写才能让模型准确调用？
关键是写清楚“什么时候该用这个工具”而不只是“这个工具能干什么”。比如 `search_code` 的描述不该是“搜索代码”，而该是“当需要在代码库中查找特定函数、变量名或代码片段时使用”。PaiAgent 的 FunctionCallback.getDescription() 就遵循这个原则。

🟡 进阶 | `→ PaiAgent FunctionCallback 描述设计`

### 75. 敏感工具的安全控制怎么做？
PaiCLI 实现了一套完整的安全机制：HITL（Human-in-the-Loop）人工审批，执行高危操作前先问用户同意；路径围栏，限制文件操作只能在项目目录内；命令黑名单，禁止 `rm -rf /` 这类危险命令；结构化审计日志，每次工具调用都有迹可查。

🟡 进阶 | `→ PaiCLI HITL + 路径围栏 + 命令黑名单` | 快手

### 76. 模型编造不存在的工具调用（工具幻觉）怎么防？
两个手段：一是在工具列表里做白名单校验，模型返回的 tool_calls 如果不在已注册列表里就直接拒绝；二是优化工具描述让模型更准确地理解工具边界。PaiAgent 的 NodeExecutorFactory 通过 Map 注册机制天然实现了白名单校验。

🟡 进阶 | `→ PaiAgent NodeExecutorFactory 白名单` | 淘天

### 77. 有没有用过大模型网关框架？网关层解决了什么问题？
大模型网关（如 LiteLLM、OneAPI）统一管理多个模型提供商的 API 密钥、请求路由、限流、重试、负载均衡。PaiAgent 的 ChatClientFactory 其实就承担了部分网关职责，根据节点配置动态路由到不同的模型服务。生产环境建议上专门的网关。

🟡 进阶 | `→ PaiAgent ChatClientFactory 路由功能`

## 05、AI Coding（8 题）

AI Coding 是最近半年面试里增长最快的方向。PaiCLI 对标 Claude Code，是一个完整的 Java Agent CLI 产品，从代码生成、AST 分析到 Git 安全回滚都有实现，拿来回答这个方向的题就是降维打击。

### 78. AI 辅助编程在实际工作中怎么提效的？
这道题考的不是技术深度，而是真实使用经验。PaiCLI 在日常开发中能做到：自然语言描述需求 → 自动生成代码 → 编译检查 → 自动修复错误 → 提交 Git。关键不在于代码生成准确率有多高，而在于“生成→反馈→修正”的循环效率。

🟡 进阶 | `→ PaiCLI 日常开发全流程` | 小红书、蚂蚁、影石

### 79. 代码生成场景下 AST 分析有什么用？
AST（抽象语法树）能让 Agent 理解代码的结构而不只是文本。PaiCLI 集成了 JavaParser 做 AST 分析，可以精确定位类、方法、字段的位置和关系，比正则匹配靠谱得多。生成代码时能确保插入位置正确、不破坏已有的代码结构。

🟡 进阶 | `→ PaiCLI JavaParser AST 分析`

### 80. LSP 诊断注入在 AI Coding 中解决什么问题？
LSP（Language Server Protocol）能提供实时的编译错误、类型检查、未使用变量等诊断信息。PaiCLI 把 LSP 诊断信息注入到 Agent 的上下文里，让模型在生成和修改代码时能“看到”IDE 级别的错误提示，修复准确率大幅提升。

🟡 进阶 | `→ PaiCLI LSP 诊断注入`

### 81. 怎么保障 AI 改代码的安全性？Git 快照回滚怎么做？
AI 改错代码是常有的事，关键是能快速恢复。PaiCLI 实现了 Git Side-History 机制，每次 AI 修改前自动创建快照，改坏了一键回滚到修改前的状态。类似游戏里的存档读档，心理负担一下子就没了。

🟡 进阶 | `→ PaiCLI Git Side-History 快照回滚`

### 82. 代码库的向量化和语义搜索怎么做？
把代码文件按函数/类切块，生成向量存入数据库，搜索时用自然语言描述找到语义最匹配的代码片段。PaiCLI 用 SQLite 做代码向量的持久化存储，还构建了代码关系图谱，能理解函数之间的调用关系。

🟡 进阶 | `→ PaiCLI SQLite 向量存储 + 代码关系图谱`

### 83. AI 代码审查和人工代码审查有什么互补关系？
AI 审查擅长的是：风格一致性检查、常见 bug 模式识别、安全漏洞扫描、代码复杂度评估。人工审查擅长的是：业务逻辑正确性、架构合理性、可维护性判断。最佳实践是 AI 先过一轮自动审查，人工只关注 AI 标记出来的问题和业务逻辑。

🟡 进阶

### 84. 多文件编辑时上下文怎么管理？
AI 改一个功能可能涉及 5-10 个文件，全部塞进上下文 token 就炸了。PaiCLI 的做法是：先用 Glob/Grep 精准定位相关文件和代码段，只把必要的片段加入上下文，改完一个文件就释放那部分上下文。代码关系图谱在这里也能帮忙，自动找出“改了 A 文件，B、C 文件也需要同步改”。

🟡 进阶 | `→ PaiCLI Glob/Grep + 代码关系图谱`

### 85. CLI 形态的 AI Agent 和 IDE 插件形态有什么优劣？
CLI 形态（PaiCLI、Claude Code）：不依赖特定 IDE，跨平台通用，适合全栈开发和 DevOps 场景，但缺少 GUI 交互。IDE 插件形态（GitHub Copilot、通义灵码）：和编辑器深度集成，补全体验好，但绑定特定 IDE。PaiCLI 选 CLI 是因为 Java 开发者用的 IDE 太分散了，IntelliJ、Eclipse、VS Code 都有人用。

🟡 进阶 | `→ PaiCLI CLI 形态设计考量`

## 06、工程化与生产落地（15 题）

最后 15 道题聚焦“怎么把 Agent 从 demo 做成产品”。面试官考这些题的目的是看你有没有真正把 Agent 上过线、扛过流量、处理过线上事故。PaiAgent 和 PaiCLI 都是跑在生产环境里的项目，拿来举例底气足。

### 86. Agent 系统从 demo 到生产级落地要走哪些流程？
需求定义 → 技术选型 → 原型验证 → 工具集成 → 评测体系搭建 → 安全审计 → 灰度发布 → 监控告警。PaiAgent 的完整落地历程就经历了这些阶段，从单节点 DAG 到 LangGraph4j 双引擎的演进过程本身就是很好的面试素材。

🟡 进阶 | `→ PaiAgent 从 DAG 到 LangGraph4j 的演进` | 万类智生、蚂蚁、字节、腾讯

### 87. Agent 的执行效果怎么评估？
三个维度：任务完成率（Agent 能不能把事干完）、回答质量（输出是否准确有用）、用户满意度（人工评分或隐式反馈）。PaiAgent 的执行记录会以成功/失败状态写入数据库，方便后续统计分析。量化指标能拿出来说的候选人凤毛麟角。

🔴 深入 | `→ PaiAgent 执行记录 + 状态追踪` | 数坤科技、字节

### 88. 大模型能力评测指标有哪些？
通用能力看 MMLU（多学科知识）、HumanEval（代码生成）、GSM8K（数学推理）。中文场景看 C-Eval、CMMLU。对话能力看 MT-Bench、Chatbot Arena ELO 排名。RAG 场景看 RAGAS。选型时不能只看一个榜，要结合自己场景做私有评测。

🟡 进阶

### 89. Agent 响应太慢怎么优化？
工程侧：工具调用并行化、缓存高频查询结果、流式输出减少用户等待感。基座侧：用更快的模型做初筛（比如 Haiku），复杂任务再调大模型。PaiAgent 的 TTS 模块就用了 CompletableFuture 做并行处理，多个音频片段同时生成。

🟡 进阶 | `→ PaiAgent CompletableFuture 并行 / PaiCLI 多模型切换`

### 90. Agent 系统有哪些安全风险？怎么防范？
三大风险：Prompt Injection（恶意指令注入）、沙箱逃逸（Agent 执行了不该执行的系统命令）、越权操作（Agent 访问了不该访问的数据）。PaiCLI 的防范体系包括 HITL 人工审批、路径围栏、命令黑名单、结构化审计日志四道防线。

🔴 深入 | `→ PaiCLI 四道安全防线`

### 91. Skill 预置知识包机制是什么？怎么设计的？
Skill 是把某个专业领域的最佳实践封装成结构化知识包，Agent 执行任务时自动加载对应 Skill 的指南和参考文档。PaiAgent 的 SkillRegistry 在应用启动时一次性加载所有 Skill 到 ConcurrentHashMap，支持全量注入和渐进式加载两种模式。PaiCLI 也有独立的 Skill 系统，还多了站点经验库的积累能力。

🟡 进阶 | `→ PaiAgent SkillRegistry / PaiCLI Skill + 站点经验`

### 92. 多工具调度引擎怎么设计？工具之间有依赖怎么处理？
核心是拓扑排序。先分析工具之间的输入输出依赖关系，构建 DAG，然后按拓扑序执行。PaiAgent 的 GraphBuilder 就是干这事的，通过边的 source/target 关系构建执行图，没有入边的节点先执行。

🔴 深入 | `→ PaiAgent GraphBuilder 拓扑构建` | 字节、阿里云

### 93. Agent 流式输出怎么设计？怎么提升用户体验？
模型还在“想”的时候就开始给用户展示中间结果。PaiCLI 在 ReAct 循环中实时展示 Thought（“我在想...”）、Action（“正在调用 xxx 工具”）、Observation（“工具返回了...”），让用户看到 Agent 的思考过程而不是干等一个最终结果。

🟡 进阶 | `→ PaiCLI ReAct 过程可视化`

### 94. Agent 系统的可观测性怎么做？需要监控哪些指标？
核心指标：请求成功率、平均响应时间、token 消耗量、工具调用成功率、模型 API 错误率。PaiAgent 的每次工作流执行都记录完整的执行日志（每个节点的输入输出、耗时、状态），出了问题能快速定位是哪个节点挂了。

🟡 进阶 | `→ PaiAgent 执行日志 + 节点级追踪`

### 95. Agent 灰度发布怎么做？
不能一次性把新版 Agent 推给所有用户。常见做法是按用户 ID 或流量比例分桶，先让 5% 的用户用新版，观察一段时间（错误率、满意度）没问题再逐步扩大。PaiAgent 可以通过工作流配置实现 A/B 测试，同一个任务走两套不同的节点编排。

🟡 进阶 | `→ PaiAgent 工作流 A/B 配置`

### 96. Agent 系统的成本怎么控制？
大模型 API 按 token 计费，成本失控是真实风险。控制手段：设用户级别的 token 配额、用小模型做初筛（PaiCLI 支持多模型切换）、Prompt Cache 减少重复计算、批量请求合并。派聪明就设了聊天消息每分钟 30 次的速率限制。

🟡 进阶 | `→ PaiCLI 多模型切换 / 派聪明速率限制`

### 97. Agent 系统怎么做容错？单点故障怎么处理？
工具调用失败要有重试和降级策略，模型 API 挂了要能自动切换到备用模型，消息队列保证异步任务不丢。PaiAgent 的节点执行失败会把 status 设为 FAILED 并记录 errorMessage，上层可以根据失败类型决定重试还是跳过。

🟡 进阶 | `→ PaiAgent FAILED 状态 + 错误记录`

### 98. 数据标注在 Agent 项目中有多重要？怎么做？
评测数据集需要人工标注“标准答案”，Prompt 优化需要标注“好回答 vs 坏回答”，微调需要高质量的指令-回答对。标注质量直接决定了模型效果的上限。可以用 AI 辅助标注（先让模型生成初版，人工校正），效率能提升 3-5 倍。

🟡 进阶

### 99. Agent 项目如何处理合规与用户隐私？
用户输入可能包含敏感信息（个人信息、商业机密），不能直接存储或发送给第三方模型。处理方式：输入脱敏、审计日志加密、模型 API 选择数据不出境的国内厂商、用户明确授权后才开启数据收集。派聪明的多租户隔离也是合规要求之一。

🟡 进阶 | `→ 派聪明多租户隔离`

### 100. 你在 Agent 项目中遇到的最大技术挑战是什么？
开放题，但最能看出候选人的真实水平。建议准备 2-3 个真实案例：一个架构层面的（比如 PaiAgent 从 DAG 引擎迁移到 LangGraph4j 双引擎的决策过程），一个工程层面的（比如 PaiCLI 上下文爆炸的优化方案），一个业务层面的（比如派聪明多租户权限隔离的需求变更）。

🔴 深入 | `→ 三个项目各准备一个案例`

## 07、三项目知识点补齐（158 题）

这一部分是基于派聪明、PaiAgent、PaiCLI 三个项目继续做的知识点补齐。口径是按“核心知识点”去重，而不是按题目标题去重：只要前 100 道项目化核心题已经能覆盖同一类知识点或面试追问，就不再重复加入；这里保留的是本地题单尚未明显覆盖的细分原理、框架机制和工程场景题。

已合并进前 100 题的知识点示例：RAG 基本流程、文档分块、Embedding 选型、向量数据库选型、混合检索、Rerank、Agent 基本架构、ReAct、长短期记忆、MCP 基础、Function Calling、LoRA/QLoRA 基础、Prompt 基本结构等。

### NLP 与传统模型基础（29 题）

### 101. 什么是词嵌入（Word Embedding）？有哪些常见的词嵌入方法？
🟡 中等 | `自然语言处理（NLP） / 词嵌入 / Word2Vec` | → PaiCLI / PaiAgent 大模型应用基础

### 102. 是否使用 Word2Vec 训练过数据？在这个过程中，如何获取语料？如何选择超参数？语料、词表和维度大小如何确定？怎样把握训练时长？
🔴 困难 | `自然语言处理（NLP） / 词嵌入 / Word2Vec` | → PaiCLI / PaiAgent 大模型应用基础

### 103. Word2Vec 有哪些加速方法？
🔴 困难 | `自然语言处理（NLP） / 词嵌入 / Word2Vec` | → PaiCLI / PaiAgent 大模型应用基础

### 104. 解释 hierarchical softmax 的流程，以及它有什么优点？
🔴 困难 | `自然语言处理（NLP） / 词嵌入 / Word2Vec / hierarchical softmax` | → PaiCLI / PaiAgent 大模型应用基础

### 105. 说一说负采样技术在 Word2Vec 中的运用。
🟡 中等 | `自然语言处理（NLP） / 词嵌入 / Word2Vec / 负采样` | → PaiCLI / PaiAgent 大模型应用基础

### 106. CBOW 和 Skip-gram 分别更适合哪些应用场景？
🟡 中等 | `自然语言处理（NLP） / CBOW / Skip-gram` | → PaiCLI / PaiAgent 大模型应用基础

### 107. 说说 GloVE 技术，怎样进行训练？有哪些应用场景？相比 Word2Vec 有哪些优缺点？
🔴 困难 | `自然语言处理（NLP） / Word2Vec / GloVE` | → PaiCLI / PaiAgent 大模型应用基础

### 108. 说说 FastText 技术，是否比 Word2Vec 更优越？哪些情况下更适合使用 FastText
🔴 困难 | `自然语言处理（NLP） / Word2Vec / FastText` | → PaiCLI / PaiAgent 大模型应用基础

### 109. 聊一聊 ELMo 技术，它有哪些优缺点？可以做到一词多义吗？为什么？
🔴 困难 | `自然语言处理（NLP） / ELMo` | → PaiCLI / PaiAgent 大模型应用基础

### 110. 说说 LSTM 的基本原理。
🟢 简单 | `自然语言处理（NLP） / LSTM` | → PaiCLI / PaiAgent 大模型应用基础

### 111. 与循环神经网络（RNN）相比，LSTM 是如何解决梯度消失问题的？
🟡 中等 | `自然语言处理（NLP） / LSTM / RNN / 梯度消失` | → PaiCLI / PaiAgent 大模型应用基础

### 112. 解释一个 LSTM 单元（LSTM cell）的基本组成，以及它们各自的作用。
🟡 中等 | `自然语言处理（NLP） / LSTM` | → PaiCLI / PaiAgent 大模型应用基础

### 113. LSTM 中，隐藏状态（hidden state）和单元状态（cell state）有什么区别？
🟡 中等 | `自然语言处理（NLP） / LSTM` | → PaiCLI / PaiAgent 大模型应用基础

### 114. LSTM 和 GRU 有什么区别？
🟡 中等 | `自然语言处理（NLP） / LSTM / GRU` | → PaiCLI / PaiAgent 大模型应用基础

### 115. 请描述 BERT 模型的架构和应用场景。
🟡 中等 | `自然语言处理（NLP） / BERT` | → PaiCLI / PaiAgent 大模型应用基础

### 116. BERT 是如何处理自然语言文本中不常见词或者罕见词的？
🟡 中等 | `自然语言处理（NLP） / BERT` | → PaiCLI / PaiAgent 大模型应用基础

### 117. Word2Vec 到 BERT 有怎样的改进？
🟡 中等 | `自然语言处理（NLP） / BERT / Word2Vec` | → PaiCLI / PaiAgent 大模型应用基础

### 118. BERT 怎样进行 mask 相比 CBOW 有什么区别？
🟡 中等 | `自然语言处理（NLP） / BERT / CBOW` | → PaiCLI / PaiAgent 大模型应用基础

### 119. 你有什么办法可以比较好地解决 BERT 输入长度的限制？
🔴 困难 | `自然语言处理（NLP） / BERT` | → PaiCLI / PaiAgent 大模型应用基础

### 120. 说说你是怎样有效地优化和微调 BERT，以应对你做过的一些特定的 NLP 任务的？
🔴 困难 | `自然语言处理（NLP） / BERT` | → PaiCLI / PaiAgent 大模型应用基础

### 121. 如何比较文本的相似度？
🟢 简单 | `自然语言处理（NLP） / 文本分类` | → PaiCLI / PaiAgent 大模型应用基础

### 122. 支持向量机可以用于文本分类任务吗？若可以，请说明。
🟢 简单 | `自然语言处理（NLP） / 文本分类 / 支持向量机` | → PaiCLI / PaiAgent 大模型应用基础

### 123. 在文本分类任务中，如何处理高维和稀疏数据？
🟡 中等 | `自然语言处理（NLP） / 文本分类` | → PaiCLI / PaiAgent 大模型应用基础

### 124. 在文本分类任务中，如何处理样本（类别）不平衡的问题？
🟡 中等 | `自然语言处理（NLP） / 文本分类` | → PaiCLI / PaiAgent 大模型应用基础

### 125. 现有文本分类算法在处理多语种文本数据时可能遭遇哪些挑战？
🟡 中等 | `自然语言处理（NLP） / 文本分类` | → PaiCLI / PaiAgent 大模型应用基础

### 126. 简述 Word Embedding 可以怎样运用于文本分类任务？
🟡 中等 | `自然语言处理（NLP） / 文本分类 / Word Embedding` | → PaiCLI / PaiAgent 大模型应用基础

### 127. 简述 LLaMA（Large Language Model Meta AI）的基本原理。
🟡 中等 | `自然语言处理（NLP） / 大语言模型` | → PaiCLI / PaiAgent 大模型应用基础

### 128. LLaMA 模型中，输入句子的长度理论上是否可以无限长？
🔴 困难 | `自然语言处理（NLP） / 大语言模型` | → PaiCLI / PaiAgent 大模型应用基础

### 129. LLaMA 有哪些实际应用？
🟢 简单 | `自然语言处理（NLP） / 大语言模型` | → PaiCLI / PaiAgent 大模型应用基础

### Transformer 细节与多模态（21 题）

### 130. Transformer 在计算 attention 的时候使用的是点乘还是加法？请说明理由。
🟡 中等 | `Transformer` | → PaiAgent / PaiCLI 模型选型背景

### 131. self attention 中的 K 和 Q 是用来做什么的？
🟢 简单 | `Transformer / 自注意力机制` | → PaiAgent / PaiCLI 模型选型背景

### 132. K 和 Q 可以使用同一个值通过对自身进行点乘得到吗？
🟡 中等 | `Transformer` | → PaiAgent / PaiCLI 模型选型背景

### 133. 如果让 K 和 Q 变成同一个矩阵，你觉得对模型性能会带来怎样的影响？
🔴 困难 | `Transformer` | → PaiAgent / PaiCLI 模型选型背景

### 134. 在不考虑计算量的情况下，head 能否无限增多？
🟡 中等 | `Transformer / 多头注意力机制` | → PaiAgent / PaiCLI 模型选型背景

### 135. 在进行多头注意力的时候需要对每个 head 进行降维吗？
🟡 中等 | `Transformer / 多头注意力机制` | → PaiAgent / PaiCLI 模型选型背景

### 136. 讲一下你对 Transformer 的 Encoder 模块的理解。
🟡 中等 | `Transformer / Encoder` | → PaiAgent / PaiCLI 模型选型背景

### 137. Transformer 中，Decoder 阶段的多头自注意力和 Encoder 阶段的多头自注意力是相同的吗？
🟡 中等 | `Transformer / Encoder / Decoder / 多头自注意力机制` | → PaiAgent / PaiCLI 模型选型背景

### 138. 了解 Transformer 模型训练中的梯度裁剪（Gradient Clipping）吗？
🟡 中等 | `Transformer / 梯度裁剪` | → PaiAgent / PaiCLI 模型选型背景

### 139. Transformer 为什么采用 Layer Normalization 而不是 Batch Normalization
🟡 中等 | `Transformer / normalization` | → PaiAgent / PaiCLI 模型选型背景

### 140. Transformer 中的注意力遮蔽（Attention Masking）的工作原理是什么？
🟡 中等 | `Transformer / 注意力遮蔽` | → PaiAgent / PaiCLI 模型选型背景

### 141. 什么是自回归属性（autoregressive property）？
🟡 中等 | `Transformer / 自回归属性` | → PaiAgent / PaiCLI 模型选型背景

### 142. Transformer 中的“残差连接”可以缓解梯度消失问题吗？
🟡 中等 | `Transformer / 残差连接 / 梯度消失` | → PaiAgent / PaiCLI 模型选型背景

### 143. Transformer 中，如何处理大型数据集？
🟡 中等 | `Transformer` | → PaiAgent / PaiCLI 模型选型背景

### 144. Transformer 模型训练完成后，如何评估其性能和效果？
🟡 中等 | `Transformer` | → PaiAgent / PaiCLI 模型选型背景

### 145. Transformer 模型的性能瓶颈在哪？
🟡 中等 | `Transformer` | → PaiAgent / PaiCLI 模型选型背景

### 146. 你觉得可以怎样缓解这个性能瓶颈？
🔴 困难 | `Transformer` | → PaiAgent / PaiCLI 模型选型背景

### 147. 了解 ViT（Vision Transformer） 吗？
🟡 中等 | `Vision Transformer` | → PaiAgent / PaiCLI 模型选型背景

### 148. 了解 ViLT（Vision-and-Language Transformer） 吗？
🔴 困难 | `ViLT` | → PaiAgent / PaiCLI 模型选型背景

### 149. ViLT 模型是如何将 Transformer 应用于图像识别任务的
🟡 中等 | `ViLT / 图像识别` | → PaiAgent / PaiCLI 模型选型背景

### 150. chatGLM 和 GPT 在结构上有什么区别？
🟡 中等 | `Transformer / 语言模型` | → PaiAgent / PaiCLI 模型选型背景

### RAG 检索细节与生产优化（19 题）

### 151. 在 RAG 应用中为了优化检索精度，其中的数据清洗和预处理怎么做？
🟡 中等 | `AI / 大模型 / RAG` | → 派聪明

### 152. 什么自查询？为什么在 RAG 中需要自查询？
🟢 简单 | `AI / 大模型 / RAG` | → 派聪明

### 153. 什么提示压缩？为什么在 RAG 中需要提示压缩？
🟢 简单 | `AI / 大模型 / RAG` | → 派聪明

### 154. 在 RAG 中，索引流程中的文档解析你们怎么做的？
🟡 中等 | `AI / 大模型 / RAG` | → 派聪明

### 155. 向量数据库中的 HNSW、LSH、PQ 分别是什么意思？
🟡 中等 | `AI / 大模型 / RAG / 向量数据库` | → 派聪明

### 156. 向量数据库中的 ANN 是什么？为什么需要用它？
🟡 中等 | `AI / 大模型 / RAG / 向量数据库` | → 派聪明

### 157. 向量数据库中，常见的向量搜索方法：余弦相似度、欧几里得距离和曼哈顿距离分别是什么？有什么区别？
🟡 中等 | `AI / 大模型 / RAG / 向量数据库` | → 派聪明

### 158. 什么是 Advanced RAG？
🟡 中等 | `AI / 大模型 / RAG` | → 派聪明

### 159. 什么是 Modular RAG？
🟡 中等 | `AI / 大模型 / RAG` | → 派聪明

### 160. 什么是上下文查询增强？它有什么作用？如何基于 Spring AI 实现上下文查询增强来处理无关问题？
🟡 中等 | `后端` | → 派聪明

### 161. 什么是 Spring AI 提出的模块化 RAG 架构？预检索、检索和后检索阶段各自负责什么？
🟡 中等 | `后端` | → 派聪明

### 162. 你有多个知识库，做 RAG 的时候，怎么保证查询效率和准确性兼容，并尽可能减少幻觉？
🟡 中等 | `AI / 大模型 / RAG` | → 派聪明

### 163. RAG 系统如何处理 PDF、Word、Markdown 等不同格式文档？
🟡 中等 | `RAG / 文档处理` | → 派聪明

### 164. 如何构建和使用向量索引？HNSW 和 IVF 有什么区别？
🟡 中等 | `RAG / 向量索引` | → 派聪明

### 165. RAG 检索时相似度阈值如何设置？设置不当有什么影响？
🟡 中等 | `RAG / 相似度阈值` | → 派聪明

### 166. RAG 系统如何利用元数据过滤提升检索精度？
🟡 中等 | `RAG / 元数据过滤` | → 派聪明

### 167. 如何处理 RAG 检索不到相关文档的情况？
🟡 中等 | `RAG / 检索失败处理` | → 派聪明

### 168. RAG 系统如何标注信息来源和提供引用？
🟡 中等 | `RAG / 引用标注` | → 派聪明

### 169. RAG 系统在生产环境中如何优化性能和降低成本？
🔴 困难 | `RAG / 性能优化` | → 派聪明

### Agent 协议、框架与工程边界（38 题）

### 170. 在 Spring AI 框架中如何集成 MCP？
🟢 简单 | `大模型 / AI / MCP / Spring / Spring AI / Java` | → PaiAgent（Spring AI）/ PaiCLI（MCP 对照）

### 171. MCP 协议安全性设计包含哪些层面？
🟢 简单 | `大模型 / AI / MCP / 安全性` | → PaiAgent / PaiCLI

### 172. 如何将已有的应用转换成 MCP 服务？
🟢 简单 | `大模型 / AI / MCP / 开发实践` | → PaiAgent / PaiCLI

### 173. 什么是护栏技术？
🟢 简单 | `AI / 大模型` | → PaiAgent / PaiCLI

### 174. 什么是 GPT Structured Outputs？
🟢 简单 | `AI / 大模型` | → PaiAgent / PaiCLI

### 175. 什么是 LangGraph ？
🟢 简单 | `AI / 大模型 / LangGraph / 工作流编排` | → PaiAgent

### 176. LangGraph 编排的原理是什么？
🟢 简单 | `AI / 大模型 / LangGraph / 工作流编排` | → PaiAgent

### 177. ​LangChain 和 LangGraph 有什么区别？
🟢 简单 | `AI / 大模型 / LangGraph / 工作流编排` | → PaiAgent

### 178. 什么是 Manus？说说你对它的了解
🟢 简单 | `AI / 大模型 / Manus` | → PaiAgent / PaiCLI

### 179. Computer Use 是什么？说说它的原理
🟡 中等 | `AI / 大模型` | → PaiAgent / PaiCLI

### 180. Copilot 模式和 Agent 模式的区别是什么？
🟡 中等 | `AI / 大模型` | → PaiAgent / PaiCLI

### 181. LLM Agent 在多模态任务中如何执行推理？
🔴 困难 | `大模型 / AI / Agent` | → PaiAgent / PaiCLI

### 182. 市面上有哪些主流的 LLM Agent 框架？各自的特点是什么？
🟢 简单 | `大模型 / AI / Agent` | → PaiAgent / PaiCLI

### 183. LlamaIndex 如何与 LangChain 结合？
🔴 困难 | `大模型 / AI / Agent / LangChain / LlamaIndex` | → PaiAgent 框架选型对比

### 184. AutoGPT 如何实现自主决策？
🔴 困难 | `大模型 / AI / Agent / AutoGPT` | → PaiCLI / PaiAgent Agent 范式对比

### 185. 什么是 A2A 协议，它的核心架构及主要组件有哪些？
🟡 中等 | `大模型 / AI / A2A / 系统架构` | → PaiAgent / PaiCLI

### 186. A2A 协议有哪五大设计原则？
🟡 中等 | `大模型 / AI / A2A / 系统架构` | → PaiAgent / PaiCLI

### 187. 什么是 Google ADK？
🟢 简单 | `AI / 大模型` | → PaiAgent / PaiCLI

### 188. 什么是 Spring AI 框架？它有哪些核心特性？
🟢 简单 | `后端 / Spring AI` | → PaiAgent

### 189. 什么是结构化输出？Spring AI 是怎么实现结构化输出的？
🟡 中等 | `后端 / Spring AI` | → PaiAgent

### 190. 什么是 Re-Reading？如何基于 Spring AI 实现 Re-Reading Advisor？
🟡 中等 | `后端 / Spring AI` | → PaiAgent

### 191. 什么是工具调用 Tool Calling？如何利用 Spring AI 实现工具调用？
🟡 中等 | `后端 / Spring AI` | → PaiAgent

### 192. 什么是 OpenManus？它的实现原理是什么？
🔴 困难 | `后端` | → PaiAgent / PaiCLI

### 193. Agent 死循环问题有遇到过吗？如何解决？
🟡 中等 | `后端 / AI / 大模型 / 场景题` | → PaiAgent / PaiCLI

### 194. 最近 OpenClaw 这么火，你知道它的原理吗？
🟢 简单 | `AI / OpenClaw / 大模型应用开发 / Agent 开发 / AI 应用开发` | → PaiAgent / PaiCLI

### 195. OpenClaw 是什么？它要解决什么问题？它的核心能力有哪些？
🟢 简单 | `AI / OpenClaw / 大模型应用开发 / AI应用开发 / Agent开发` | → PaiAgent / PaiCLI

### 196. OpenClaw 的核心组件有哪些？请描述它们之间的关系
🟡 中等 | `AI / OpenClaw / 大模型应用开发 / AI应用开发 / Agent开发` | → PaiAgent / PaiCLI

### 197. 如果一个 Agent 系统要同时接入 Web、飞书、钉钉等渠道，你会怎么设计渠道抽象层？OpenClaw 的 Channel Plugin 接口是怎么设计的？
🟢 简单 | `AI / OpenClaw / 大模型应用开发 / AI应用开发 / Agent开发` | → PaiAgent / PaiCLI

### 198. MCP 和 Skills 有什么区别？分别适用于什么场景？
🟢 简单 | `AI / 大模型 / Agent / Skills` | → PaiAgent / PaiCLI

### 199. 如何设计和管理 AI Agent 的 Skills 体系？在实际项目中有哪些挑战？
🟡 中等 | `AI / 大模型 / Agent / Skills` | → PaiAgent / PaiCLI

### 200. 同一个系统里可能有多个 Agent，不同渠道用户群组的消息需要路由到不同的 Agent。你会怎么设计这个路由？OpenClaw 的路由匹配优先级是怎样的？
🟡 中等 | `AI / OpenClaw / 大模型应用开发 / Agent开发 / AI应用开发` | → PaiAgent / PaiCLI

### 201. 同一个用户在私聊和群组里和 Agent 对话，应该共享会话还是隔离？OpenClaw 是怎么设计会话隔离粒度的？
🟡 中等 | `AI / OpenClaw / 大模型应用开发 / AI应用开发 / Agent开发` | → PaiAgent / PaiCLI

### 202. 同一个工具（比如「执行命令」）在不同场景下应该有不同的权限。你会怎么设计工具的权限控制？OpenClaw 的工具策略管道是怎么分层的？
🟡 中等 | `AI / OpenClaw / 大模型应用开发 / AI应用开发 / Agent开发` | → PaiAgent / PaiCLI

### 203. 不同的 LLM Provider 对 Tool Schema 的支持不完全一致，你会怎么处理这种差异？OpenClaw 是怎么做 Schema 适配的？
🟡 中等 | `AI / OpenClaw / 大模型应用开发 / AI应用开发` | → PaiAgent / PaiCLI

### 204. Agent 系统中 Hook 中间件模式有什么用？能举几个典型场景吗？OpenClaw 的 Hook 系统是怎么设计的？
🟡 中等 | `AI / OpenClaw / 大模型应用开发 / AI应用开发 / Agent开发` | → PaiAgent / PaiCLI

### 205. 父 Agent spawn 子 Agent 时，有哪些边界问题需要考虑？OpenClaw 做了哪些限制和保护？
🟡 中等 | `AI / 大模型应用开发 / AI应用开发 / Agent开发` | → PaiAgent / PaiCLI

### 206. OpenClaw 采用插件架构，第三方可以注册新渠道、工具、Hook。设计一个插件系统需要考虑哪些关键问题？OpenClaw 的插件 API 长什么样？
🟡 中等 | `AI / OpenClaw / 大模型应用开发 / AI应用开发 / Agent开发` | → PaiAgent / PaiCLI

### 207. OpenClaw 的 Gateway 对 Agent 请求做了幂等性处理。为什么 Agent 系统特别需要幂等性？工具已经产生副作用时怎么办？
🟡 中等 | `AI / OpenClaw / 大模型应用开发 / AI应用开发 / Agent开发` | → PaiAgent / PaiCLI

### Prompt 工程细分方法（12 题）

### 208. 提示词中的分隔符有什么作用？如何使用？
🟢 简单 | `Prompt / 分隔符` | → PaiCLI / PaiAgent

### 209. 什么是系统提示词 System Prompt？它和用户提示词有什么区别？
🟢 简单 | `Prompt / System Prompt` | → PaiCLI / PaiAgent

### 210. 什么是 Few-shot Learning？Zero-shot、One-shot、Few-shot 有什么区别？
🟡 中等 | `Prompt / Few-shot Learning` | → PaiCLI / PaiAgent

### 211. 如何选择和设计 Few-shot 示例以提升效果？
🟡 中等 | `Prompt / Few-shot 示例设计` | → PaiCLI / PaiAgent

### 212. 什么是自洽性？如何应用？
🟡 中等 | `Prompt / 自洽性` | → PaiCLI / PaiAgent

### 213. 什么是负面提示词？在什么场景下使用？
🟡 中等 | `Prompt / 负面提示词` | → PaiCLI / PaiAgent

### 214. 什么是提示词链接？如何实现？
🟡 中等 | `Prompt / 提示词链接` | → PaiCLI / PaiAgent

### 215. 如何为不同领域设计专用提示词？比如编程、创作、数据分析
🟡 中等 | `Prompt / 领域专用提示词` | → PaiCLI / PaiAgent

### 216. 如何系统地评估和优化提示词的效果？
🔴 困难 | `Prompt / 效果评估` | → PaiCLI / PaiAgent

### 217. 提示词注入攻击是什么？如何防范？
🔴 困难 | `Prompt / 安全防护` | → PaiCLI / PaiAgent

### 218. 在实际项目中如何进行提示词的 AB 测试和迭代？
🔴 困难 | `Prompt / A/B 测试` | → PaiCLI / PaiAgent

### 219. 什么是思维树 Tree of Thoughts？它相比 CoT 有什么优势？
🔴 困难 | `Prompt / 思维树` | → PaiCLI / PaiAgent

### LangChain 框架细节（13 题）

### 220. LangChain 中的 Chain 是什么？有哪些常见类型？
🟢 简单 | `LangChain / Chain 链式调用` | → PaiAgent 框架选型对比

### 221. LangChain 的 Memory 组件有什么作用？常见的 Memory 类型有哪些？
🟡 中等 | `LangChain / Memory 记忆机制` | → PaiAgent 框架选型对比

### 222. 在 LangChain 中如何实现流式输出？
🟡 中等 | `LangChain / 流式输出` | → PaiAgent 框架选型对比

### 223. 如何在 LangChain 中自定义 Tool 工具？
🟡 中等 | `LangChain / Tool 工具` | → PaiAgent 框架选型对比

### 224. LangChain 和 LlamaIndex 有什么区别？各自适合什么场景？
🟡 中等 | `LangChain / LlamaIndex / 框架对比` | → PaiAgent 框架选型对比

### 225. LangChain 中的 DocumentLoader 有哪些类型？如何选择？
🟢 简单 | `LangChain / DocumentLoader 文档加载` | → PaiAgent 框架选型对比

### 226. LangChain 的 OutputParser 有什么作用？有哪些常见类型？
🟢 简单 | `LangChain / OutputParser 输出解析` | → PaiAgent 框架选型对比

### 227. LangChain 中的 Callback 回调机制是什么？有什么用？
🟡 中等 | `LangChain / Callback 回调` | → PaiAgent 框架选型对比

### 228. LangChain 中的 LCEL 表达式语言是什么？有什么优势？
🟡 中等 | `LangChain / LCEL` | → PaiAgent 框架选型对比

### 229. LangChain 中如何实现条件分支和动态路由？
🟡 中等 | `LangChain / 条件路由` | → PaiAgent 框架选型对比

### 230. LangChain 中的 Retriever 检索器有哪些类型？各有什么特点？
🟡 中等 | `LangChain / Retriever 检索器` | → PaiAgent 框架选型对比

### 231. 如何处理 LangChain 应用中的错误和异常？
🟡 中等 | `LangChain / 异常处理` | → PaiAgent 框架选型对比

### 232. 如何保证 LangChain 应用的输出质量和一致性？
🔴 困难 | `LangChain / 质量保证` | → PaiAgent 框架选型对比

### 微调、训练与模型压缩（17 题）

### 233. 微调中常用的优化器有哪些？
🟡 中等 | `大模型 / AI / 微调 / 优化器` | → PaiAgent / PaiCLI 模型工程面试扩展

### 234. 微调的过拟合风险如何通过正则化缓解？
🔴 困难 | `大模型 / AI / 微调` | → PaiAgent / PaiCLI 模型工程面试扩展

### 235. 在多模态微调（如图文生成）中，如何确保文本和图像数据的对齐质量？
🔴 困难 | `大模型 / AI / 微调 / 多模` | → PaiAgent / PaiCLI 模型工程面试扩展

### 236. 参数高效微调（PEFT）如何减少计算成本？
🔴 困难 | `大模型 / AI / 微调` | → PaiAgent / PaiCLI 模型工程面试扩展

### 237. 冻结层在微调中的作用是什么？
🔴 困难 | `大模型 / AI / 微调` | → PaiAgent / PaiCLI 模型工程面试扩展

### 238. 为什么需要混合精度训练？
🔴 困难 | `大模型 / AI / 微调` | → PaiAgent / PaiCLI 模型工程面试扩展

### 239. 模型输出重复和幻觉如何微调解决？
🔴 困难 | `大模型 / AI / 微调` | → PaiAgent / PaiCLI 模型工程面试扩展

### 240. 微调大模型需要什么样的硬件？7B 和 70B 模型分别需要多少显存？
🟢 简单 | `大模型 / 微调 / 显存评估` | → PaiAgent / PaiCLI 模型工程面试扩展

### 241. 2026 年主流的微调工具有哪些？Unsloth、Axolotl、TRL 各有什么特点？
🟢 简单 | `大模型 / 微调工具 / Unsloth / Axolotl / TRL` | → PaiAgent / PaiCLI 模型工程面试扩展

### 242. LoRA 的超参数应该怎么设置？有什么经验法则？
🟢 简单 | `大模型 / LoRA / 超参数` | → PaiAgent / PaiCLI 模型工程面试扩展

### 243. 对比 LoRA、QLoRA、DoRA 和全量微调，在不同场景下应该如何选择？
🟢 简单 | `大模型 / LoRA / QLoRA / DoRA / 全量微调` | → PaiAgent / PaiCLI 模型工程面试扩展

### 244. 在多模态微调中，如何确保文本和图像数据的对齐质量？有哪些技术挑战？
🟢 简单 | `大模型 / 多模态微调 / 数据对齐` | → PaiAgent / PaiCLI 模型工程面试扩展

### 245. ORPO 是什么？它如何将指令微调和偏好对齐合二为一？
🟢 简单 | `大模型 / ORPO / 偏好对齐` | → PaiAgent / PaiCLI 模型工程面试扩展

### 246. 如何构建高质量的 SFT 微调数据集？数据质量和数量哪个更重要？
🟢 简单 | `大模型 / SFT / 数据集构建` | → PaiAgent / PaiCLI 模型工程面试扩展

### 247. 什么是模型蒸馏（Knowledge Distillation）？它和模型量化有什么区别？
🟢 简单 | `大模型 / 模型蒸馏 / 模型量化` | → PaiAgent / PaiCLI 模型工程面试扩展

### 248. 大模型的训练和推理分别是什么？它们在计算资源需求上有什么区别？
🟢 简单 | `大模型 / 训练 / 推理 / 资源评估` | → PaiAgent / PaiCLI 模型工程面试扩展

### 249. 什么是大模型的参数量？参数量和模型能力之间是什么关系？
🟢 简单 | `大模型 / 参数量 / 模型能力` | → PaiAgent / PaiCLI 模型工程面试扩展

### LLM 工程与 AI Coding 新趋势（9 题）

### 250. 什么是 GPTCache？
🟢 简单 | `AI / 大模型` | → PaiCLI / PaiAgent

### 251. 如果一个GPU集群的LLM处理能力为1000tokenss，那1000个用户同时并发访问，响应给每个用户的性能只有1 tokens吗？怎么分析性能瓶颈
🟡 中等 | `后端 / 场景题 / 大模型` | → PaiCLI / PaiAgent

### 252. 什么是 Agentic Engineering？它和 Vibe Coding 有什么区别？
🟢 简单 | `AI Coding / Agentic Engineering / Vibe Coding` | → PaiCLI / PaiAgent

### 253. 什么是 ACP 协议？它有哪两个不同的含义？
🟢 简单 | `AI Coding / ACP 协议 / Agent 协议` | → PaiCLI / PaiAgent

### 254. 什么是深度思考（Deep Thinking）和自适应思考（Adaptive Thinking）？它们在 AI 编程中有什么应用？
🟢 简单 | `AI Coding / Deep Thinking / Adaptive Thinking` | → PaiCLI / PaiAgent

### 255. 大模型的 Token 是什么？输入 Token 和输出 Token 在计费上有什么区别？
🟢 简单 | `大模型 / Token / 计费模型` | → PaiCLI / PaiAgent

### 256. 什么是 Background Agent（后台 Agent）？它改变了 AI 编程的什么工作方式？
🟢 简单 | `AI Coding / Background Agent / 异步任务` | → PaiCLI / PaiAgent

### 257. 什么是 Token 缓存机制？它如何帮助降低 AI 应用的成本？
🟢 简单 | `大模型 / Token 缓存 / 成本优化` | → PaiCLI / PaiAgent

### 258. 什么是 AI 编程中的自动修复循环（Auto-fix Loop）？它的工作流程和退出策略怎么设计？
🟢 简单 | `AI Coding / 自动修复循环 / 退出策略` | → PaiCLI / PaiAgent

## ending

258 道题，14 个方向，3 个实战项目。

前 100 道，是 Agent、RAG、LLM、MCP、AI Coding、工程化 6 个项目化核心方向。

后 158 道，是围绕派聪明、PaiAgent、PaiCLI 继续补齐的 8 个细分方向：NLP 与传统模型基础、Transformer 细节与多模态、RAG 检索细节与生产优化、Agent 协议/框架/工程边界、Prompt 工程细分方法、LangChain 框架细节、微调训练与模型压缩、LLM 工程与 AI Coding 新趋势。

这不是让大家死记硬背的题库，

而是一张带着项目的作战地图。

面试官问 Transformer，你从注意力机制聊到 PaiAgent 的多模型动态切换。

问 RAG 分块，你说派聪明为什么选了 512 字符加 100 字符重叠。

问 MCP，你说 PaiCLI 同时支持 stdio 和 HTTP 两种模式，60 多个工具即插即用。

问 LoRA，你把训练到部署的完整路径都串起来。

每道题背后都有真实代码、真实踩坑、真实数据。

后面我会逐题拆解，给出完整的加精答案，

每篇覆盖 5-8 题，带代码、带架构图、带面试官追问的回答思路。

【收藏这篇，不亏】
