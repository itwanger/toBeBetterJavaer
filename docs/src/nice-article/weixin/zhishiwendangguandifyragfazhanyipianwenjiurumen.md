---
title: 只是文档灌Dify？RAG发展一篇文就入门！
shortTitle: 只是文档灌Dify？RAG发展一篇文就入门！
author: 章文俊
category:
  - 微信公众号
---

  

RAG，全称检索增强生成（Retrieval-Augmented Generation），作为当前 AI 应用中常见的辅助方法，有效提升了 LLM 输出的准确性和可靠性。但总有人戏言，RAG 不过是“把文档丢进 Dify”这么简单，真的吗？    

关于 RAG 的技术流程，网上已经有非常多高质量的文章介绍，因此笔者想从 RAG 的技术发展角度来写这篇文章，从最基本的 RAG 到当前热门的 Graph RAG、Agentic RAG，介绍 RAG 的不同类型和区别，希望大家能够从文中受益。

  

## 01、RAG 是什么

  

介绍 RAG 前，先介绍大语言模型（LLM）面临的两个问题，一是 LLM 的**知识截止**，二是 LLM 存在**幻觉现象**。

  

###   ** 1.1 ****知识截止**

  

LLM 训练不是实时的，而是离线训练好的。在训练过程中，使用的数据都是提前准备的，而且大多数是公开、开源的数据，这就导致了 LLM 训练后具备的知识是有范围的。换句话说，**模型知识仅限于训练数据所涵盖的知识范围，**对于新的知识（比如今天的新闻）或未训练的知识（比如未公开的数据），模型本身不具备这些知识，仅具备推理能力。

  

###    **1.2 幻觉现象**

  

幻觉现象有多种维度的解释。一方面，LLM 是一个条件概率模型，以前文作为条件的词表概率逐词生成文本，这一机制导致其可能出现**看似逻辑严谨（概率高）但其实缺乏事实依据的生成，**也就是“一本正经地胡说八道”。另一方面，LLM 的训练过程，是**对训练数据的知识进行压缩提炼的过程，但不是无损压缩知识，**边缘知识容易在主流知识冲击下出现扭曲，导致产生了幻觉。

  

打个比方，LLM 好比一个多年备战的考生，当他在做试题的时候，遇到他从没学过的新学科知识点时，就无从下笔**（知识截止）**；当他遇到他没掌握牢固的知识点时，就凭借模糊的记忆或真或假地编了个答案**（幻觉现象）**。

  

###    **1.3 RAG**

  

![](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe954SejBgXtx0nFZdZPgd868jG1hONrX4rBoewfGnaWJibTDPeqosvm9CHynF4Jn0HJ1d1NhKDbSoXg/640?wx_fmt=png&from=appmsg)

  

而 RAG 就是一种能够有效幻觉模型知识截止和幻觉现象的方法。RAG 是检索增强生成（Retrieval-Augmented Generation）的缩写。检索增强生成，是指对大语言模型（LLM）输入进行优化，使其能够在生成响应之前引用训练数据来源之外的知识，作为回答的根据。这是一种经济高效地改进 LLM 输出的方法，让 LLM 保持相关性、准确性和实用性。

  

RAG系统有两个最主要的组成部分：

*   **检索（Retrieval）：**查询外部数据源，例如知识库、向量数据库或者网页搜索API。常见的检索方法有全文检索、向量检索、图检索等。
*   **生成（Generation）：**将检索信息提供给 LLM，生成回答。

  

对于大模型这个考生来说，RAG 就像参考书或者“第二个大脑”，让模型遇到没学过或者学不牢的知识点时可以翻一翻书找参考资料，提高回答问题的准确性。

  

  

## 02、RAG 的发展

  

从近年 RAG 的发展历程看，RAG 主要经历了 Naive RAG、Advanced RAG、Modular RAG、Graph RAG，以及最近热门的 Agentic RAG 几种类型的发展。

*   **Naive RAG** 是 RAG 最基础的实现。
*   **Advanced RAG** 是在 Naive RAG 的基础上，对检索前、检索、检索后分别进行优化。
*   **Modular RAG** 代表了主流 RAG 的工程化实现。
*   **Graph RAG** 利用图检索能力，让 RAG 增强 multi-hop 检索和丰富上下文。
*   **Agentic RAG** 利用 Agent 能力，让 RAG 有了智能化的思考分析，大大增强了检索能力。

  

###    **2.1 Naive RAG**

  

Naive RAG 是 RAG 系统的最基本实现，使用单一的全文检索或向量检索，从文档集合中检索出与 query 相关的文档，直接将检索的文档用于增强 LLM 的生成。

  

Naive RAG 具有几个局限性：

*   **缺乏语义理解：**全文匹配依赖词汇匹配，无法捕捉到 query 与文档之间的语义关联；向量检索受限于间接匹配，语义理解能力也不足。
*   **输出效果差：**由于缺乏对 query、文档的高级预处理、后处理，召回的文档容易包含过多或过少信息，导致最终生成的回答过于宽泛。
*   **效果优化困难：**系统过于依赖单一检索技术，未对 query、文档进行增强，导致优化局限于检索技术。

  

![](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe954SejBgXtx0nFZdZPgd868NpbrRlhLhaYxXvvtht1ibI9VLuEVaKUdklurbE9KcB4SVYuuDx7goWg/640?wx_fmt=png&from=appmsg)

  

###    **2.2 Advanced RAG**

  

Advanced RAG 在 Naive RAG 的基础上，**对检索前、检索、检索后三个阶段进行改进。**

  

在**检索前**阶段，增强文档质量，比如优化章节结构、增强标题等，过滤低质量信息；优化索引结构，优化 chunk size 使得 context 粒度符合应用场景的需求；优化索引信息，对 chunk 进行提取、增强，作为 embedding 文本；对用户 query 的进行 rewriting。

  

在**检索**阶段，使用域内知识对 embedding 进行 fine-tune，或使用 llm-based embedding 模型，生成对上下文理解更准确的语义向量。

  

在**检索后**阶段，增加 reranking 提高检索文档的相关性，增加 context-compression 使提供给模型的信息更加集中。

  

![](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe954SejBgXtx0nFZdZPgd868e3AGBOicgSKu26vdLfXNcHDgrTMgG3QGxaxOibgQx2tgThE874WBYukg/640?wx_fmt=png&from=appmsg)

  

###    **2.3 Modular RAG**

  

Modular RAG 是当前主流的 RAG 系统设计，将检索和生成分解为独立可复用的组件，从而实现特定域的优化和任务适应性。Modular RAG 将 RAG 系统所使用到的多种检索、存储、路由等等全部模块化，并且可以根据特定的场景，对这些模块进行重新排列，如多种检索方式的混合检索等，以取得更好的效果。

  

![](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe954SejBgXtx0nFZdZPgd868xTzdsQ3Wjs5SQuwpmicy7sibCBbrf7gXOIUjw0q92IvWLm7QcCPicvyAg/640?wx_fmt=png&from=appmsg)

  

###    **2.4 Graph RAG**

  

Graph RAG 使用图结构来扩展传统的 RAG 系统，利用图的关系和层级结构，增强 multi-hop 推理和 context 丰富度。Graph RAG 可以生成的结果更丰富更准确，特别是对于需要关系理解的任务。

  

Graph RAG 具备以下局限性：

*   **高质量图数据依赖：**高质量的图数据对 Graph RAG 非常关键，如果处理出高质量的图数据有时很困难，特别是对于无结构的纯文本或标注质量不高的数据。
*   **应用的复杂性：**对于一个 RAG 系统，同时支持非结构化数据和图数据的混合检索，会增加检索系统设计和实现的复杂性。

  

![](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe954SejBgXtx0nFZdZPgd868EAswk7C8geicfguhr80I3drG1PxWpFeic5Ypc8YGMFho68DNb1LCfPEg/640?wx_fmt=png&from=appmsg)

  

###    **2.5 Agentic RAG**

  

与前面的静态 RAG 不同，**Agentic RAG 使用能够动态决策和工具调用的 LLM-based agent，来解决更加复杂、实时和多域的查询。**

  

得助于 LLM-based 的工具调用能力，**Agentic RAG 能够使用更多更复杂的工具来辅助检索，**比如搜索引擎、计算器等各类以 API 形式能够访问的工具。另外 **Agentic RAG 可以根据实际的检索场景动态决策，**比如决定是否进行检索、决定使用什么工具检索、评估检索到的上下文决定是否需要继续检索等等。

  

![](https://mmbiz.qpic.cn/mmbiz_png/VY8SELNGe954SejBgXtx0nFZdZPgd868QXvOzgaNC9GNEs43qBXwoMcib3TzXszzYgictmIRuQf3ia1oaMs6J9khg/640?wx_fmt=png&from=appmsg)

  

  

  

## 03、总结

  

RAG|特点|优点|
---｜---｜---｜
Naive RAG|\- 单一索引，如TF-IDF、BM25、向量检索|\- 简单，易于实现  \- 缓解模型幻觉|
Advanced RAG|\- 文档增强  \- 索引优化  \- query重写  \- reranking|\- 更准确的检索  \- 增强检索相关性|
Modular RAG|\- 混合检索  \- 工具、API集成  \- 模块化、工程化的实现|\- 更强的灵活性  \- 适应更多元的场景|
Graph RAG|\- 图结构索引  \- multi-hop推理  \- 基于图节点的上下文内容增强|\- 关系推理能力  \- 适合结构化数据|
Agentic RAG|\- 使用LLM-based agents  \- 动态决策、检索  \- 自动流程优化|\- 更高的检索准确性  \- 适合更复杂、更多域的任务|

  

从 RAG 近年来的发展的来，未来 RAG 的发展有几个方向：

*   **智能化：**随着 LLM 应用的发展，功能越来越复杂，对 RAG 的要求也会越来越高。Agentic RAG 是这个方向的开始，未来更加智能的 RAG 才能成为 LLM 的“好搭档”。
*   **数据多元化：**Graph RAG 让 RAG 有了图检索的能力，但是如何将普通文本、图数据，以及其他类型的数据比如代码、图片等等多元化的数据，兼容到一个统一的 RAG 系统里进行索引、检索、排序，未来复杂 LLM 应用将会对这个能力提出挑战。

  


>参考链接：[https://mp.weixin.qq.com/s/ZwT1h9Q_tX9qgQXVU0ycQg](https://mp.weixin.qq.com/s/ZwT1h9Q_tX9qgQXVU0ycQg)，整理：沉默王二
