---
star: true
title: 2026年最值得收藏的AI Agent学习路线（建议收藏🔥）
shortTitle: AI Agent学习路线
category:
  - 学习路线
tag:
  - 学习路线
description: AI Agent学习路线，从AI应用开发岗位的能力模型、学习策略、理论知识清单、工具准备、面试八股到项目实战，帮你系统掌握RAG、Agent、工作流编排等AI应用开发核心技术。
date: 2026-07-24
head:
  - - meta
    - name: keywords
      content: AI Agent,学习路线,RAG,Agent,大模型,Spring AI,MCP,Tool Calling,AI应用开发
---

## 一、AI应用开发岗位到底需要什么能力

很多人一听到AI就觉得要学深度学习、要会训练模型、要懂数学推导。这是对AI岗位最大的误解。AI领域的岗位分三类，你要搞清楚你该对标哪一类。

第一类是做模型训练和算法研究的。需要硕博学历、深度学习功底、论文发表经验。这个方向的天花板最高，但门槛也最高——没有顶会论文和大厂算法组经历，简历关都过不了。

第二类是做AI基础设施的（推理部署、算力调度、模型优化）。需要C++或CUDA编程经验、对GPU架构和模型推理的深入理解。这条路的核心技能是系统编程，做的是让模型跑得更快更省的事情。

第三类是做AI应用开发的——把大模型的能力集成到实际的业务系统里，做RAG知识库、Agent智能体、AI工作流编排。这个方向的核心能力是后端工程能力加大模型集成能力，不需要你会训练模型，但需要你会把模型的能力用好。这是我们星球大部分球友应该努力的方向。

![](https://cdn.paicoding.com/stutymore/ai-agent-20260725083611-e569c78b.png)

为什么我推荐第三类？因为AI应用开发的岗位数量最多、增速最快、门槛对有工程经验的人来说最友好。你已经会写Spring Boot、会用MySQL和Redis、理解微服务架构，这些能力在AI应用开发里全部用得上。你需要做的不是从零开始学一个新领域，而是在现有的工程能力上"长出"AI的那一层。

AI应用开发岗位的能力模型可以拆成四层。

### 第一层：工程基础能力

Java/Spring Boot的后端开发、MySQL/Redis/Kafka/ES等中间件的使用和调优、微服务架构的设计和实践、Docker/K8s的容器化部署。这一层大部分球友已经具备了，只需要在某些方面加深（比如微服务组件的底层原理）。

![](https://cdn.paicoding.com/stutymore/ai-agent-20260725084011-21c9f2e5.png)

拿星球的项目来说，PmHub就是用Spring Cloud全家桶（Nacos、Gateway、Sentinel、OpenFeign、Seata）搭建的微服务系统；派聪明用Spring Boot 3.4加MySQL加Redis加Kafka加Elasticsearch；PaiFlow用JDK 21虚拟线程加Docker Compose编排。你做这些项目的过程就是巩固和深化工程基础能力的过程。

### 第二层：AI核心概念的理解

大模型的基本原理（不需要推公式但要理解它在做什么）、Token和上下文窗口的机制、Embedding和向量检索的原理、Prompt工程的核心技巧、幻觉的成因和缓解方式。这一层不少球友需要从零建立，但有工程背景的人理解这些概念比零基础的人快很多。

![](https://cdn.paicoding.com/stutymore/ai-agent-20260725100210-c7c6481e.png)

举个例子，PaiCLI的Token预算管理模块会根据不同模型的上下文窗口大小（GLM-5.1是200k、DeepSeek V4是1M、Agnes 2.0是1M）动态计算可用Token，超过阈值自动触发上下文压缩。你理解了Token和上下文窗口的机制，再看这段代码就会发现它在解决的就是"长对话怎么不把上下文撑爆"这个工程问题。

### 第三层：AI应用开发的核心技术

这一层是AI应用开发岗位的核心竞争力，拆开来有五个技术方向。

**RAG的完整Pipeline。** 文档解析（Apache Tika解析PDF/Word/Excel）、文本切片（512字符切片加100字符Overlap保留语义连贯性）、向量化（通义千问Embedding API生成2048维向量）、混合检索（KNN向量检索加BM25关键词检索，RRF融合排序）、大模型生成（DeepSeek V4基于检索结果回答）。派聪明的源码里每个环节都有对应的实现。

**Agent的核心范式。** ReAct推理（思考→执行→观察循环）、Plan-and-Execute（先规划任务DAG再逐步执行）、多Agent编排（Orchestrator分发任务给Worker和Reviewer）。PaiCLI三种范式全覆盖——默认的ReAct循环、`/plan`命令触发的DAG任务分解、`/team`命令触发的多Agent协作。

**工作流编排。** DSL定义工作流、节点执行器解耦（策略模式加工厂模式）、变量在节点间传递（模板引擎渲染`{{node-id.output}}`）、条件路由和并行执行。PaiFlow的Java引擎实现了30种节点类型，支持DAG拓扑排序、Kahn算法检测循环依赖。

**流式输出。** SSE（Server-Sent Events）实时推送大模型逐字生成的Token。派聪明用Spring WebFlux的响应式流处理LLM的SSE输出，PaiFlow用SseEmitter逐Token推送给前端。

**多轮对话管理。** 上下文压缩（当Token用量接近窗口上限时自动摘要早期对话）、Memory分层（短期对话记忆加长期事实记忆加项目级指令记忆）。PaiCLI的Memory系统分三层：短期的对话记忆、跨会话的长期事实记忆（存储在JSON文件中）、项目级的PAI.md指令。

![](https://cdn.paicoding.com/stutymore/ai-agent-20260725100441-8b843820.png)

### 第四层：AI工程化能力

AI应用的可观测性（Agent调用链追踪、Tool执行监控）——PaiFlow集成了OpenTelemetry做分布式追踪，PaiCLI有结构化的审计日志（JSONL格式记录每次工具调用的参数、结果、耗时）。

AI应用的质量保障（幻觉检测、输出校验、效果评测）——派聪明的ReAct Agent循环最多4轮、最多8次工具调用，防止LLM无限循环；PaiCLI的Agent预算模块检测连续3次重复调用自动终止。

AI应用的性能优化（向量检索的索引策略、大模型调用的缓存和批处理、流式输出的延迟优化）——派聪明的Embedding采用批处理（每批10条文本），Token用量走预约-结算模式避免超额；PaiCLI并行执行工具调用（每批最多4个并发）。

![](https://cdn.paicoding.com/stutymore/ai-agent-20260725100649-0046c152.png)

这一层是让你从"会用"到"用好"的进阶能力，通过项目实战和深入思考来积累。

![](https://cdn.paicoding.com/stutymore/ai-agent-20260725100902-f258d58c.png)

## 二、学习策略：不要从理论开始，从项目倒推

很多人转AI的第一反应是先看吴恩达的课程、先学Transformer的论文、先搞懂注意力机制的数学推导。

这条路对大部分球友来说效率最低——你花两个月学完理论，发现自己还是不会写一个RAG系统。

应该反过来——先做项目，在项目中遇到什么概念就学什么概念。这种以项目驱动、按需学习的方式对有工程经验的人来说效率最高。

具体的策略是这样的。

### 第一步：建立最小认知（一到两周）

不需要系统学习，只需要搞清楚三件事。

大模型能做什么不能做什么——能理解自然语言、能生成文本和代码、能做推理和分类，但不能访问实时数据、不能保证事实准确性、有上下文长度限制。

RAG是什么解决什么问题——检索增强生成，用外部知识库给大模型"喂"准确的信息，解决大模型知识过时和幻觉的问题。

Agent是什么解决什么问题——给大模型装上"手脚"让它能调用工具和执行操作，解决大模型只能生成文字但不能操作外部系统的问题。

![](https://cdn.paicoding.com/stutymore/ai-agent-20260725101107-88ef7542.png)

这些概念每个花半小时让Claude给你解释就够了。别看书，别报课，直接问AI。

### 第二步：做第一个项目建立手感（三到四周）

做派聪明RAG知识库。派聪明的技术栈是Spring Boot 3.4.2加MySQL加Redis加Kafka加Elasticsearch 8.10加Spring WebFlux，对有Java后端经验的人来说上手很快。

在做的过程中你会依次遇到这些技术问题，遇到一个解决一个。

文档怎么解析——Apache Tika 2.9.1支持PDF、Word、Excel、Markdown等格式，派聪明还集成了LiteParse做OCR，支持扫描版PDF的中英文识别。

切片策略怎么设计——512字符一个切片、100字符Overlap、最小切片100字符。为什么要Overlap？因为一个完整的语句可能跨越两个切片，Overlap保证语义不断裂。

向量化用什么模型——通义千问的text-embedding-v4，2048维度，cosine距离度量。调用方式是批量请求（每批10条文本），返回的向量存入Elasticsearch的dense_vector字段。

检索策略怎么选——纯向量检索会漏掉关键词完全匹配的场景（比如搜"Spring Boot 3.4.2"，向量检索可能返回"Spring Boot 3.x系列"的内容而遗漏精确版本号的段落）。所以派聪明用混合检索：先做KNN向量检索（召回topK×30个候选），再用BM25做二阶段重排，两路分数按0.2（KNN）和1.0（BM25）权重融合。

权限怎么控制——多租户场景下的文档隔离。派聪明在Elasticsearch查询中加入用户ID和组织标签的过滤条件，每次检索只返回当前用户有权访问的文档。

每解决一个你就掌握了一个AI的核心知识点。做完派聪明之后你对RAG的理解就不再是概念而是实战级别的。

![](https://cdn.paicoding.com/stutymore/ai-agent-20260725101323-fbf575f7.png)

### 第三步：做第二个项目加深理解（三到四周）

这一步有两个选择，根据你的目标岗位来定。

如果你的目标是AI应用开发岗，做PaiFlow。PaiFlow是JDK 21加Spring Boot 3.5加Spring AI 1.1的工作流编排平台，你会学到DAG拓扑排序、节点执行器的策略模式、SSE流式推送、JDK 21虚拟线程的并发模型。做完之后你能跟面试官讲清楚"一个AI工作流引擎是怎么设计的"。

如果你的目标是微服务方向（社招居多），做PmHub。PmHub是Spring Cloud 2021加Spring Cloud Alibaba的微服务项目管理系统，覆盖Nacos、Gateway、Sentinel、OpenFeign、Seata、RocketMQ、Flowable工作流引擎。做完之后面试官问你微服务架构设计，你就能从注册中心的原理讲到分布式事务的实现。

![](https://cdn.paicoding.com/stutymore/ai-agent-20260725101536-1223d256.png)

### 第四步：系统化整理你的知识体系（一到两周）

项目做完之后回头整理——你学了哪些AI概念、每个概念在项目中怎么用的、面试官可能怎么追问。

![](https://cdn.paicoding.com/stutymore/ai-agent-20260725101757-847f3208.png)

这时候再回去看一些理论资料（比如Transformer的科普文章、RAG的论文综述），你会发现之前看不懂的东西现在一看就明白了，因为你有了项目实战的对照。比如你在派聪明里做过KNN向量检索，再看HNSW索引原理的论文就完全能对应上——原来HNSW就是在向量空间里建了一个分层的跳表结构，每一层做近似最近邻搜索，逐层下探找到最终结果。

![](https://cdn.paicoding.com/stutymore/ai-agent-20260725102024-15f0619d.png)

这个四步走的策略，核心思想是先做后学、边做边学、做完再补。

你不需要先成为AI专家才能做AI项目，你只需要带着问题去做项目，在解决问题的过程中自然就成为了AI应用开发的实践者。

## 三、需要补充的理论知识清单

你不需要学深度学习和模型训练，但以下这些AI基础知识你必须搞清楚，面试官会问。

### 大模型的核心机制（必须能用自己的话讲清楚）

![](https://cdn.paicoding.com/stutymore/ai-agent-20260725102259-52fa1301.png)

- Transformer的自注意力机制——不需要推公式，能讲清楚它在做什么（每个词跟其他所有词算相关性然后加权求和，让模型理解上下文关系）。面试官追问的高频点是"为什么自注意力的计算复杂度是O(n²)"——因为每个Token要跟序列中所有其他Token算一次注意力分数，所以是长度的平方。
- KV Cache——大模型推理时为什么第一个Token慢后面快（缓存了之前的计算结果避免重复计算）。这也是为什么大模型的上下文窗口有上限——KV Cache会占显存，窗口越长显存消耗越大。PaiCLI的代码里可以看到不同模型的上下文窗口差异很大：GLM-5.1是200k、DeepSeek V4是1M。
- Token和Tokenizer——一段文字怎么变成模型能处理的数字、为什么中文一个字可能对应多个Token。这个概念直接影响你做AI应用时的成本计算——调用API是按Token计费的，中文文本的Token数通常是字数的1.5到2倍。
- 上下文窗口——为什么大模型有长度限制（显存和计算量的平方增长）、超了怎么处理（截断、压缩、RAG外挂知识库）。PaiCLI处理这个问题的方式是三段式：短上下文模式（50k以内）、平衡模式（50k到100k）、长上下文模式（100k以上），不同模式下RAG检索的topK和自动压缩策略都不同。
- Temperature和采样策略——这些参数怎么影响模型输出的确定性和创造性。Temperature为0时模型输出最确定（适合代码生成、结构化输出），Temperature升高时输出更随机更有创造性（适合头脑风暴、文案写作）。

### 模型训练流程（了解即可不需要深入）

![](https://cdn.paicoding.com/stutymore/ai-agent-20260725102519-e724bd6b.png)

预训练（学习通用的语言能力，在海量文本上做"下一个词预测"）、SFT监督微调（学会按指令回答问题，用人工标注的指令-回答对来训练）、RLHF人类反馈强化学习（学会什么样的回答是人类偏好的，通过奖励模型引导）。

LoRA低秩适配——用少量参数对大模型做领域适配的轻量级微调方法。你不需要会做微调但要知道微调是什么、什么场景下需要微调而不是用RAG。

简单的判断标准是这样的：如果你的需求是让模型基于特定数据回答问题（比如企业内部知识库问答），用RAG；如果你的需求是让模型学会一种新的"说话方式"或"行为模式"（比如让模型学会用特定的语气回复客服问题），才需要微调。

### Embedding和向量检索（必须深入理解）

![](https://cdn.paicoding.com/stutymore/ai-agent-20260725091641-c2d32e1d.png)

- Embedding是什么——文本怎么变成固定维度的向量、为什么语义相似的文本向量距离近。派聪明用的是通义千问的text-embedding-v4模型，输出2048维的向量。"Java后端开发"和"Spring Boot开发"的向量在2048维空间里的cosine距离会很近，但"Java后端开发"和"Python爬虫"的距离就远得多。
- 向量检索的原理——ANN近似最近邻算法、HNSW索引的基本思想（分层图结构加快检索速度）。暴力遍历所有向量做精确最近邻在数据量大时太慢，HNSW通过在向量空间里建一个分层的图结构来做近似搜索，牺牲一点精度换取几个数量级的速度提升。
- 为什么需要混合检索——纯向量检索会漏掉关键词完全匹配的场景，加上BM25关键词检索做互补。派聪明的实现是先KNN召回大量候选（topK的30倍），再BM25重排，最后RRF融合。面试官问"为什么不只用向量检索"，你就可以用派聪明的实际案例来讲。
- RRF融合排序——多路检索结果怎么合并成一个统一的排序。RRF的公式很简单：每个文档的最终分数等于它在各路排序中的排名的倒数之和。排名越靠前、出现在的路数越多，最终分数越高。

### Prompt工程（必须掌握到实用水平）

![](https://cdn.paicoding.com/stutymore/ai-agent-20260725091942-ed5ada81.png)

- System Prompt和User Prompt的区别和设计技巧。PaiCLI的Prompt架构是分层组装的——base.md（基础指令）加人格（calm.md）加模式（agent.md/plan.md/team-*.md）加审批策略加运行时上下文加项目记忆加Skill描述，总共七层叠加。这套分层设计在面试中讲出来会非常有说服力。
- Few-shot——在Prompt中给示例让模型理解你要什么格式的输出。比如你要让大模型输出JSON格式的结构化数据，先给两三个示例，模型的输出准确率会大幅提升。
- Chain of Thought——引导模型分步推理提高复杂问题的回答质量。Agent的ReAct范式本质上就是一种Chain of Thought——让模型先思考（Reasoning）再行动（Acting）。
- Prompt注入的防范——用户可能在输入中嵌入恶意指令怎么防。PaiCLI用了多层防护：路径守卫（限制文件操作在项目目录内）、命令黑名单（禁止sudo/rm -rf等危险命令）、HITL人类审批（高风险操作需要用户确认）。

### 幻觉（必须能讲清楚成因和缓解）

![](https://cdn.paicoding.com/stutymore/ai-agent-20260725092120-b225c6e4.png)

- 大模型为什么会编造信息——模型的本质是概率预测而不是事实检索，它会生成统计上最可能的下一个词而不是最正确的。
- 缓解方式——RAG提供事实依据（派聪明的做法）、Prompt约束（"只基于给定信息回答，不知道就说不知道"）、后处理校验（检查输出中的实体和数据是否有来源）、Temperature调低减少随机性。
- 工程手段——派聪明的ReAct Agent循环限制了最多4轮、8次工具调用，防止模型在自己的幻觉上不断迭代；PaiCLI的Agent预算模块检测连续3次相同工具调用自动停止，避免"死循环式幻觉"。

这些知识点你不需要买书或者报课程学。你直接问Claude让它逐个给你讲，每个概念花十五到二十分钟理解清楚用自己的话能复述就行。

## 四、需要准备的工具

### AI编程工具

Claude Code是你的主力开发工具。

Claude Code在终端里直接用自然语言描述需求就能帮你生成代码、修改文件、运行测试。Claude Code的能力在项目级别的代码生成和理解上特别强——它能读取整个项目的上下文，理解模块之间的依赖关系，生成的代码能直接跑。你做星球项目的时候全程用Claude Code辅助，效率会提升好几倍。

![](https://cdn.paicoding.com/stutymore/ai-agent-20260725092315-5d1380b8.png)

Codex是你的辅助工具。在需要快速原型验证或者做独立脚本的时候可以用Codex。Claude Code和Codex是当前最强的AI编程工具，你切换过来之后会明显感受到效率的提升。

PaiCLI本身就是一个学习样本。它是用Java 17写的、对标Claude Code的Agent CLI产品，210个Java源文件、42个模块，从ReAct循环到MCP协议到Skill系统到浏览器自动化全都有。你在用Claude Code写代码的同时，还能拿PaiCLI的源码学习"一个Agent CLI是怎么从零搭建的"。

### 大模型API/Token plan/Coding plan

![](https://cdn.paicoding.com/stutymore/ai-agent-20260725092507-b7d45677.png)

注册一个DeepSeek的API账号，DeepSeek的API最便宜而且中文能力很强。你做派聪明和其他AI项目的时候需要调用大模型API，DeepSeek的性价比最高。

千问的Embedding API用来做文档向量化，text-embedding-v4模型输出2048维的向量，效果不错价格也便宜。派聪明的源码里默认就是用的千问Embedding。

如果你想在本地跑Embedding不花钱，可以装一个Ollama，用nomic-embed-text模型。PaiCLI的RAG模块默认就支持本地Ollama Embedding。

### 本地开发环境

不同项目的JDK版本不一样，具体来说：派聪明用JDK 17、PmHub用JDK 8、PaiCLI用JDK 17、PaiFlow用JDK 21、PaiAgent用JDK 21、JobClaw用JDK 21。建议直接装JDK 21，向下兼容除了PmHub以外的所有项目。

中间件用Docker Compose一键拉起来：MySQL 8.0、Redis 7.0、Elasticsearch 8.10（派聪明需要安装IK分词插件做中文分词）、Kafka（派聪明的异步文件处理管道需要）、MinIO（派聪明和PaiFlow的文件存储）。派聪明的仓库里有现成的infra.sh脚本一键启动所有基础设施。

IDEA作为IDE你已经很熟悉了。前端项目（PaiAgent用React 18加TypeScript、PaiFlow用React 18加ReactFlow、JobClaw用Next.js 15）需要装Node.js 18以上。

![](https://cdn.paicoding.com/stutymore/ai-agent-20260725092655-649f2228.png)

### 向量数据库

![](https://cdn.paicoding.com/stutymore/ai-agent-20260725092847-c2fe72b5.png)

派聪明用的是Elasticsearch 8.10做向量存储和检索。ES 8.x原生支持dense_vector字段类型和KNN检索，你不需要额外安装专门的向量数据库。

PaiCLI用的是SQLite做本地向量存储——对CLI工具来说SQLite最轻量，不需要外部依赖，代码索引和cosine相似度计算都在本地完成。

但你要了解市面上其他向量数据库的存在——Milvus（开源分布式向量数据库，支持十亿级向量）、ChromaDB（Python生态最常用）、Pinecone（SaaS服务免运维）、Weaviate（支持混合检索）。面试官可能会问你为什么选ES而不是专门的向量数据库——ES的优势是同时支持关键词检索和向量检索，做混合检索不需要两套系统；专门的向量数据库在纯向量检索场景下性能更好。

## 五、面试中AI方向的八股怎么准备

你做完项目之后还需要系统整理AI方向的面试八股。传统后端八股（Java基础、MySQL、Redis、Spring Boot、微服务）面渣逆袭里都有，只需要复习巩固。

AI方向的八股是你需要新增的，星球的项目面试篇里都有。

### 第一梯队：必须能流利讲清楚的

![](https://cdn.paicoding.com/stutymore/ai-agent-20260725093144-4ccd8cd0.png)

- RAG完整流程——从文档解析到切片到向量化到检索到生成，每个环节的技术选型和优化策略。面试官追问的高频点：切片大小怎么选（太大语义混杂检索不准，太小丢失上下文）、为什么要混合检索（纯向量漏关键词、纯关键词漏语义）、检索结果跟问题不相关怎么处理（Reranking二次排序、Query Rewriting改写查询）。派聪明的源码是你回答这些问题的一手素材。
- Agent核心范式——ReAct是什么（交替推理和行动，PaiCLI默认模式）、Plan-and-Execute是什么（先用Planner生成任务DAG、再用Worker逐步执行，PaiCLI的`/plan`命令）、两者的适用场景（ReAct适合简单直接的任务，Plan-and-Execute适合需要多步协调的复杂任务）。
- Tool Calling机制——大模型怎么知道有哪些工具（工具Schema以JSON格式注入System Prompt）、怎么决定调哪个工具（模型根据用户意图和工具描述做匹配）、工具的Schema怎么定义（名称、描述、参数类型和约束）。PaiCLI内置了11个工具（read_file、write_file、grep_code、execute_command等），每个工具的Schema定义在ToolRegistry里。
- MCP协议——是什么（Model Context Protocol，标准化AI工具接入的协议，Anthropic提出）、跟直接的Function Calling有什么区别（MCP让工具方独立开发和部署，Agent通过标准协议发现和调用工具，不需要硬编码工具逻辑）。PaiCLI支持Stdio和Streamable HTTP两种MCP传输方式，配置文件在mcp.json里定义。JobClaw也集成了MCP客户端和服务端——既能调用外部MCP工具，也能把自己的岗位数据通过MCP协议暴露出去。
- Spring AI——Java生态里集成大模型的框架，怎么用它做模型调用和Prompt管理。PaiAgent用Spring AI 1.0.0-M5做统一的LLM接口抽象，PaiFlow用Spring AI 1.1.2，JobClaw用Spring AI 2.0.0-M4。Spring AI的核心价值是提供了跨模型厂商的统一接口——切换DeepSeek到千问只需要改配置，不需要改代码。

### 第二梯队：需要了解能讲出思路的

![](https://cdn.paicoding.com/stutymore/ai-agent-20260725093328-295c8eb7.png)

- 多Agent协作——多个Agent怎么分工、怎么通信、什么场景需要多Agent。PaiCLI的`/team`模式有三个角色：Planner（分解任务）、Worker（执行任务，默认2个并发）、Reviewer（检查结果质量）。JobClaw用的是另一种模式：意图分类器先识别用户意图，然后Router把消息路由到对应的业务Agent（身份采集Agent、岗位抓取Agent、岗位推荐Agent）。
- 指代消解（Query Rewriting）——多轮对话中用户的指代怎么解析（比如用户说"它是什么意思"需要结合上文理解）。
- 工作流编排——DSL怎么定义工作流、节点执行器怎么解耦、变量怎么在节点间传递。PaiFlow的实现最值得研究：30种节点类型用NodeTypeEnum枚举定义，每种节点有对应的NodeExecutor实现（策略模式），节点间的变量传递通过VariablePool加模板引擎（`{{node-id.output}}`语法）完成。PaiAgent用LangGraph4J做状态图编排，支持条件边路由。
- 向量检索的索引策略——HNSW和IVF的基本原理和适用场景。HNSW适合查询延迟敏感的在线场景（构建慢但查询快），IVF适合数据量极大的离线场景（构建快但查询需要遍历多个桶）。
- 大模型的推理优化——KV Cache、量化、批处理的基本概念。

### 第三梯队：加分项

![](https://cdn.paicoding.com/stutymore/ai-agent-20260725093524-206c040d.png)

- Vibe Coding面试题——怎么用AI提效、怎么管理上下文、怎么保证AI生成代码的质量、团队怎么做AI协作规范。PaiCLI本身就是一个Vibe Coding的标杆实现：用Claude Code辅助开发、PAI.md定义项目级指令、侧Git快照实现版本回退、HITL审批保障安全。
- AI应用的可观测性——Agent调用链怎么追踪、Tool执行的监控指标有哪些。PaiCLI的审计日志系统（JSONL格式）记录每次工具调用的时间戳、工具名、参数、结果、耗时、审批方式，可以完整复现Agent的决策链路。PaiFlow集成OpenTelemetry做分布式追踪。

![](https://cdn.paicoding.com/stutymore/ai-agent-20260725093707-ca0b067d.png)

PaiFlow/派聪明RAG/PaiCLI/JobClaw/PaiAgent的教程里配套了超1000道AI面试题，覆盖了上面这些方向，做完项目之后直接用来复习效率很高。

## 六、星球九个项目的排序和你的最佳组合

基于上面的能力模型和学习策略，我帮大家把星球的项目做个优先级排序。

### 第一梯队：必做，直接写到简历上

#### PaiCLI 终端Agent（排名第一）

PaiCLI是一个对标Claude Code的Java Agent CLI产品，从第一期的ReAct单代理循环逐步演进到第二十三期的TUI产品化，210个Java源文件，42个模块，覆盖了Agent开发的完整技术栈。

![](https://cdn.paicoding.com/stutymore/ai-agent-20260725093902-aed15a38.png)

做PaiCLI你会学到这些核心技术。

**三种Agent执行范式。** ReAct循环（思考→工具调用→观察结果→继续思考，直到模型自行停止）、Plan-and-Execute（Planner生成任务DAG，通过拓扑排序确定执行顺序，支持并行执行同层级无依赖的任务）、多Agent编排（Orchestrator分配任务给Worker和Reviewer，Worker并发执行，Reviewer做质量检查）。

**11个内置工具和Tool Calling全链路。** 文件读写（read_file/write_file）、代码搜索三级策略（glob_files确定性匹配→grep_code正则搜索→search_code向量语义搜索）、命令执行（execute_command，60秒超时，8KB输出限制）、Web搜索和抓取、记忆保存、Skill加载。每批最多4个工具并行调用。

**MCP协议完整实现。** Stdio传输（子进程标准输入输出通信）和Streamable HTTP传输两种方式。配置文件合并策略——用户级`~/.paicli/mcp.json`加项目级`.paicli/mcp.json`，项目级优先覆盖。MCP服务启动有8秒超时，未就绪的后台继续加载，不阻塞主流程。支持环境变量替换（`${PROJECT_DIR}`、`${HOME}`）和资源发现（自动注册list_resources/read_resource虚拟工具）。

**Skill系统（三层加载）。** 内置Skill（jar包内）、用户Skill（`~/.paicli/skills/`）、项目Skill（`.paicli/skills/`），后加载的优先。Skill通过YAML Frontmatter加Markdown定义，Agent系统提示里嵌入Skill索引（最多20个，总共4KB），模型调用load_skill工具后把Skill内容注入下一轮对话。

**Memory三层管理。** 短期对话记忆（当前会话）、长期事实记忆（跨会话持久化，JSON文件存储，语义去重）、项目级指令记忆（PAI.md，启动时注入系统提示）。当Token用量接近窗口上限时，自动触发上下文压缩——把早期对话摘要化，保留最近3轮用户输入和工具调用边界。

**HITL人类审批。** 工具按危险等级分类：高危（execute_command需要审批）、中危（write_file需要审批）、MCP工具（默认需要审批加审计）。用户可以选择批准一次、全部批准（按工具或服务范围）、拒绝、跳过、修改参数后执行。审计日志以JSONL格式记录每次工具调用。

**安全防护体系。** 路径守卫（限制文件操作在项目根目录内，阻止`..`遍历和符号链接突破）、命令黑名单（禁止sudo、rm -rf、mkfs、fork bomb、curl|sh等危险命令）、结构化审计日志（每日滚动，600权限）。

**侧Git快照。** 用JGit（纯Java，不依赖系统git）在每次Agent执行前后创建快照，存储在`~/.paicli/snapshots/`下。支持`/snapshot`查看历史、`/restore`回退到指定版本。每个项目最多保留50个快照。

#### JobClaw 多Agent实战（排名第二）

JobClaw是一个OpenClaw架构的多Agent求职应用，不是简单的爬虫——它是一个可插拔的多Agent运行时，把来自不同IM渠道（微信/钉钉/飞书/WebSocket）的消息通过统一的Agent内核路由到专门的业务Agent。

![](https://cdn.paicoding.com/stutymore/ai-agent-20260725094057-12f69b82.png)

技术栈是Java 21加Spring Boot 4.0加Spring Modulith 2.0加Spring AI 2.0加LangGraph4J 1.6。这套技术栈比PaiCLI更新，用到了Spring最前沿的版本。

做JobClaw你会学到这些核心技术。

**事件驱动的消息总线。** 所有IM渠道（微信/钉钉/飞书/WebSocket）通过统一的Channel接口接入，消息通过Spring ApplicationEvent发布，MsgRouter监听事件做消息处理。渠道和Agent完全解耦——加一个新渠道只需要实现Channel接口，不需要改任何Agent代码。

**意图分类与Agent路由。** IntentClassifier用关键词加LLM混合策略识别用户意图，AgentRouter把识别结果映射到对应的业务Agent，SessionAgentBinder维护用户和Agent的会话绑定关系，支持上下文切换。

**LangGraph4J状态图工作流。** 岗位采集流水线由四个Agent节点组成：TaskClassifyAgent（任务分类）→TaskGatherAgent（数据采集）→DraftWasherAgent（数据清洗）→DraftPublishAgent（发布入库），通过条件边实现流程控制。状态在节点间通过OcAgentState传递。

**Spring Modulith模块化。** 用`@Modulith`注解强制模块边界，core、channels、providers、agents、plugins各自独立，跨模块调用通过接口抽象。新增一个Agent只需要`@Component implements BizAgent`，AgentRegistry自动发现注册。

**多模型Provider抽象。** 支持OpenAI、智谱、Anthropic、阿里云四种LLM提供方，用户可以配置偏好的模型（`provider#modelName`格式），ModelProviders做运行时解析和切换。

**用户画像三层模型。** Soul（性格偏好）、Identity（技能经验）、Info（基础信息），存储在用户工作空间文件里，AI自动提取和更新。Agent回答问题时注入用户画像做个性化推荐。

#### 派聪明RAG知识库（排名第三）

RAG是AI应用开发最成熟、面试问得最多的方向。派聪明是一个企业级的RAG知识库管理系统，技术栈是Spring Boot 3.4.2加MySQL 8.0加Redis 7.0加Kafka加Elasticsearch 8.10加Spring WebFlux，前端是Vue 3加TypeScript加Naive UI。

做派聪明重点吃透这些模块。

**文档解析全链路。** Apache Tika 2.9.1支持PDF/Word/Excel/PPT/TXT/MD/JSON/XML/HTML，针对扫描版PDF集成了LiteParse做OCR（支持chi_sim+eng中英文混合识别，DPI 150，超时300秒）。解析采用流式处理，内存占用超过80%阈值时触发GC。

**切片策略设计。** 默认512字符切片、100字符Overlap、最小100字符。还支持父级切片（1MB大小），用于层级检索——先从父级切片定位大致段落，再从子级切片精确命中。面试官问"Overlap有什么用"，你回答"保证跨切片的完整语句不丢失语义连贯性"。

**异步处理管道。** 用户上传文件后API立即返回，上传事件发到Kafka的file-processing-topic1，FileProcessingConsumer按顺序处理：从MinIO下载文件→Tika流式解析→批量调用Embedding API（每批10条）→ES批量索引。失败消息进入Dead Letter Topic。文件处理状态（processing/completed/failed）实时推送给前端。

**混合检索实现。** 第一阶段KNN：用cosine相似度在ES中检索topK×30个候选。第二阶段BM25 Rescore：用关键词匹配做二次排序，分数融合权重KNN 0.2、BM25 1.0。查询条件中加入userId、orgTag、isPublic的权限过滤。Embedding调用失败时自动降级为纯文本BM25检索。

**ReAct Agent循环。** 对话通过WebSocket推送，ChatHandler构建ReAct Prompt（包含工具定义），流式调用LLM，解析返回的tool_calls，执行工具（knowledge_search、generate_summary、submit_feedback），把工具结果作为tool_message追加到消息列表，继续调用LLM。最多4轮、8次工具调用。

**多租户权限模型。** 三级权限：用户私有文档（userId匹配）、组织级文档（orgTag层级匹配，子组织可继承父组织知识）、公开文档。所有检索操作都在Elasticsearch查询中嵌入权限过滤条件。

**Token配额管理。** 每日LLM配额30万Token、Embedding配额100万Token，每分钟LLM请求20次、Embedding批次60次。采用预约-结算模式：调用API前先预扣配额，调用成功后结算实际用量，失败则回退预扣额度。Redis做请求计数。

![](https://cdn.paicoding.com/stutymore/ai-agent-20260725094316-43b20a93.png)

### 第二梯队：强烈推荐，时间允许一定要做

#### PaiFlow工作流编排（排名第一）

PaiFlow是一个企业级的AI Agent工作流编排平台，对标Dify/Coze/n8n，支持通过拖拽方式可视化编排大模型节点、工具节点和流程逻辑。

![](https://cdn.paicoding.com/stutymore/ai-agent-20260725094622-0a1fe039.png)

技术栈是JDK 21加Spring Boot 3.5.4加Spring AI 1.1.2加MyBatis-Plus 3.5.7（Java引擎），前端React 18加TypeScript加ReactFlow 11加Ant Design 5加Zustand。还有一个Python引擎（FastAPI加LangChain加OpenTelemetry）形成双引擎架构。

做PaiFlow你会学到这些核心技术。

**工作流引擎设计。** 30种节点类型（NodeTypeEnum枚举：LLM、KNOWLEDGE_BASE、IF_ELSE、CODE、ITERATION、PLUGIN等）。每种节点有对应的NodeExecutor实现（策略模式），通过NodeExecutorFactory在构造器注入时自动建立映射关系。执行引擎支持两种模式：WorkflowEngine顺序执行（Kahn算法做拓扑排序、DFS做循环检测）、ParallelWorkflowEngine并行执行（CompletableFuture加JDK 21虚拟线程）。

**节点间变量传递。** VariablePool用ConcurrentHashMap存储每个节点的输出结果。下游节点用`{{node-id.output}}`模板语法引用上游结果，VariableTemplateRender在执行前做变量替换。支持嵌套路径访问（比如`data[0].voice_url`从JSON数组中提取字段）。

**SSE流式推送。** SseStreamCallback通过SseEmitter逐Token推送给前端，消息类型包括workflow_start、node_start、node_process、node_end、workflow_end。异步消息消费用ConcurrentLinkedQueue加虚拟线程实现。

**重试策略。** AbstractNodeExecutor（模板方法模式）统一处理重试和超时，子类只需实现executeNode方法。三种重试策略：固定间隔（1秒×次数）、线性递增（1秒×重试次数）、指数退避（1秒×2的重试次数减一次方）。

**多模型LLM集成。** ModelServiceClient通过OpenAI兼容接口调用各种模型（OpenAI、DeepSeek、千问、智谱、讯飞），ChatClientFactory做动态客户端创建。支持获取模型的推理内容（DeepSeek的thinking output）。TTS语音合成集成了千问和StepFun的接口。

#### PmHub微服务项目（排名第二）

![](https://cdn.paicoding.com/stutymore/ai-agent-20260725094920-0d64c047.png)

PmHub是基于Spring Cloud和LLM的微服务智能项目管理系统，提供单体版（pmhub-boot）和微服务版两种部署模式，适合不同阶段的学习。

技术栈是Spring Boot 2.7.18加Spring Cloud 2021.0.8加Spring Cloud Alibaba 2021.0.5.0，前端Vue 2加Element UI加BPMN.js。

微服务版包含8个服务：Gateway网关（6880端口）、Auth认证服务（6800端口）、System系统服务（6801端口）、Project项目服务（6806端口）、Workflow工作流服务（6808端口）、Gen代码生成服务（6802端口）、Job定时任务服务（6803端口）、Monitor监控服务（6888端口）。

做PmHub你会深入掌握微服务的核心组件。

**Nacos注册中心和配置中心。** 服务注册发现、运行时配置热更新、多环境配置管理。

**Spring Cloud Gateway网关。** 统一入口、路由转发、CORS处理、限流熔断（集成Sentinel）。

**Sentinel限流熔断。** 流量控制规则、线程池隔离、Fallback降级处理。配合Nacos做规则持久化。

**OpenFeign服务调用。** 声明式HTTP客户端、Fallback工厂做容错。UserFeignService和ProcessFeignService是两个核心的跨服务调用接口。

**Seata分布式事务。** 跨服务的数据一致性保障。pmhub-base-seata模块封装了Seata的集成配置。

**RocketMQ异步消息。** pmhub-base-notice模块用RocketMQ 5.0做工作流审批通知、任务分配提醒等异步消息推送。

**Flowable工作流引擎。** BPMN流程定义、流程实例管理、任务审批链。前端用BPMN.js做可视化流程设计。

社招面试官对候选人有微服务深度的期望。你做完PmHub之后面试官问你微服务的架构设计你就能从原理层面讲清楚。对于社招来说微服务的深度理解是硬指标。

#### PaiAgent（排名第三）

![](https://cdn.paicoding.com/stutymore/ai-agent-20260725095118-e5766ad2.png)

PaiAgent是一个Vibe Coding版本的AI工作流可视化编排平台，跟PaiFlow定位类似但架构更轻量。

技术栈是JDK 21加Spring Boot 3.4.1加Spring AI 1.0.0-M5加Spring AI Alibaba 1.0.0-M6.1加LangGraph4J 1.8.0-beta3，前端React 18加@xyflow/react 12.9加Ant Design 6加Zustand 5。

PaiAgent的特色在于双引擎架构——DAG引擎（Kahn拓扑排序，向后兼容）和LangGraph4J引擎（异步状态图，支持条件分支），通过EngineSelector路由器动态切换。新增了Skill系统（YAML Frontmatter加Markdown定义，三级渐进加载减少Token消耗）和ReAct Agent节点（最多5次迭代，可配到20次）。

23种以上的节点类型涵盖了主流AI场景：LLM节点（OpenAI/DeepSeek/千问/智谱/AIPing）、知识库节点（检索和写入）、记忆节点（读写持久化事实）、Web节点（搜索和抓取）、多媒体节点（图像生成/视频生成/视觉分析/TTS语音合成）、控制流节点（条件分支/循环）。

如果你时间有限只能在PaiFlow和PaiAgent之间选一个，PaiFlow更偏企业级（双引擎Java+Python、Docker Compose部署、OpenTelemetry追踪），PaiAgent更偏轻量和前沿（Spring AI Alibaba原生支持、LangGraph4J状态图、Skill系统）。两个都做效果最好，能对比不同的架构设计思路。

### 第三梯队：可选，根据时间和需求决定

#### 技术派（排名第一）

![](https://cdn.paicoding.com/stutymore/ai-agent-20260725095326-1b2122a4.png)

技术派是paicoding.com的源码，前后端分离的技术社区系统，后端Spring Boot 2.7加MyBatis-Plus加MySQL加Redis加ElasticSearch 8.0加RabbitMQ，前端Thymeleaf服务端渲染。

AI方面追加了8种大模型集成（ChatGPT、智谱、讯飞、DeepSeek、千问、豆包、智谱Coding、内置Mock），通过Facade模式统一管理模型选择（10分钟缓存），Factory模式创建模型服务实例。支持流式和同步两种响应模式，多模型Fallback机制（主模型故障自动切换备用模型）。

技术派适合想做一个"有AI功能的完整应用"的球友，它展示的是怎么把AI能力优雅地集成到一个已有的业务系统里，而不是从零搭一个AI项目。

#### MYDB（排名第二）

![](https://cdn.paicoding.com/stutymore/ai-agent-20260725095619-3bfddfb7.png)

MYDB是一个纯Java手写的轻量级SQL数据库，总共5011行代码，参考MySQL/PostgreSQL/SQLite实现。

七个核心模块：事务管理器（2PL两阶段锁协议）、版本管理器（MVCC多版本并发控制，支持读已提交和可重复读两种隔离级别）、数据管理器（页缓存、页索引、日志和检查点）、表管理器（表和字段的Schema管理）、SQL解析器（基础SQL语法解析）、Socket服务端、交互式CLI客户端。

MYDB跟AI方向没有直接关系，但面试官问你"MySQL的MVCC是怎么实现的"或者"事务隔离级别的底层原理是什么"的时候，你能说"我自己手写过一个数据库实现了MVCC"，这个杀伤力是非常大的。

剩下还有几个项目，暂时就不一一介绍了。

![](https://cdn.paicoding.com/stutymore/ai-agent-20260725095943-40f06367.png)

总之，按照我这个思路去学，AI Agent 方向你是完全有能力拿下的。offer多到飞起。
