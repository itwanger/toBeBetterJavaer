---
title: RAG 2.0 深入解读
shortTitle: RAG 2.0 深入解读
description: 本文从RAG 2.0 面临的主要挑战和部分关键技术来展开叙事，还包括了RAG的技术升级和关键技术等。
author: 燕衡
category:
  - 微信公众号
---

![](https://mmbiz.qpic.cn/mmbiz_jpg/Z6bicxIx5naIgDRAN4PtVEmE63I8L58XXFNtEuGfJof8x3Ebr28Cd5VibyuPM4J8icEXRtALicMYPv4yF87uWGNQTg/640?wx_fmt=jpeg)

阿里妹导读

  

本文从RAG 2.0 面临的主要挑战和部分关键技术来展开叙事，还包括了RAG的技术升级和关键技术等。

一、Introduction

过去一年可谓是RAG元年，检索增强生成技术迅速发展与深刻变革，其创新与应用已深刻重塑了大模型落地的**技术范式**。站在2025年，RAG不仅突破了早期文本处理的局限，更通过多模态融合、混合检索优化和语义鸿沟跨越等突破，开始在各个行业落地。如果把2024之前的RAG称为RAG 1.0，那目前已进入RAG 2.0时代。

一个显着的进步是**长上下文窗口**，这一功能引发了争议，但到年中逐渐平息。很多人觉得长上下窗口就够了，传统的检索和RAG会被取代。此外，LLMOps 等架构的成熟使企业和个人能够使用矢量数据库、嵌入/重新排名模型、分块工具、Multimodal技术的快速发展。RAG方面的Paper每周达到几十篇甚至更多。可以说，RAG经历了野蛮快速生长的RAG，从1.0超快速的进入了2.0时代。

RAG越来越多的应用在企业和生产场景，但是仍面临很多的技术挑战，本文我们从RAG 2.0 面临的主要挑战和部分关键技术来展开叙事。首先快速过一下RAG 2.0的主要问题：

**多模态与复杂任务扩展**

*   **多模态支持不足**：当前的RAG技术主要针对文本数据，但在处理图像、视频等多模态数据时仍面临挑战。例如，如何有效检索和利用多模态信息仍是一个开放性问题。现有 LLMOps 解决方案大多限于纯文本场景。PDF、PPT 或文本与图像结合的文档无法充分发挥其商业潜力。这些类型的文档通常构成企业数据中的大多数。  
*   **复杂推理任务**：尽管RAG通过检索外部知识增强了模型的推理能力，但在处理多跳推理或复杂逻辑任务时，其性能仍有待提升。

**检索质量与噪声问题**

*   **检索精度不足**：RAG的性能高度依赖于检索到的文档质量。如果检索到的文档与查询不相关或包含噪声信息，会导致生成结果不准确甚至错误。
*   **Semantic GAP**：RAG 的核心在于搜索功能。只有能够根据用户的查询“搜索”答案时，它才能发挥作用。然而，这一先决条件往往无法满足，因为查询模糊或含糊，缺乏明确的意图，或者“多跳”问题需要从多个子问题中综合而来。在这种情况下，提出的问题和检索到的答案之间存在显著的语义差距，这使得传统的搜索方法无效。
*   **噪声数据的影响**：文档中的噪声信息可能混淆模型的推理路径，导致生成内容出现偏差。例如，过时或不准确的信息会误导模型，降低生成结果的可信度。
*   **召回率低**：在某些情况下，RAG可能无法检索到所有相关文档，导致生成模型缺乏足够的背景信息来构造完整的答案。比如，纯向量数据库导致召回率和命中率偏低：单纯依赖向量数据库会导致召回率和命中率偏低，阻碍有效的现实问答。这是因为向量表示无法精确地表示准确的信息，并且在检索过程中会造成语义损失。

**生成过程中的幻觉与冗余**

*   **幻觉问题**：尽管RAG通过检索外部知识减少了模型生成幻觉的概率，但在检索信息不足或相关性较低时，模型仍可能生成虚构或不准确的内容\[6\]。
*   **冗余与重复**：当检索到的文档包含相似信息时，生成内容可能出现冗余或重复，影响回答的质量和简洁性。

**计算资源与效率问题**

*   **计算资源消耗**：RAG需要额外的计算资源来支持检索机制和数据库维护，如向量化模型和向量知识库的构建与更新\[6\]。  
*   **推理延迟**：由于增加了检索步骤，RAG的推理时间可能比传统LLM更长，尤其是在处理复杂查询时\[6\]。  
*   **实时性要求**：RAG需要实时检索最新信息，但知识库的更新频率和检索效率可能无法满足高实时性需求。

**安全与隐私问题**

*   **数据安全**：RAG需要访问外部知识库，这可能涉及敏感数据。如何确保数据的安全性和隐私性是一个重要挑战\[8\]。

*   **对抗性攻击**：RAG系统可能受到对抗性数据注入或上下文冲突等攻击，导致生成内容被操纵或误导

**奖励函数与训练机制优化**

*   **奖励函数设计**：当前的RAG系统通常采用基于结果的奖励函数，但在复杂任务场景中，这种设计可能无法捕捉细微差异，影响模型性能\[1\]。
*   **训练数据依赖**：RAG的训练需要高质量的交互数据，但获取和标注这些数据可能成本高昂且耗时.

二、技术范式的升级

RAG从最初概念诞生到现在，架构经历了三个阶段演化：基础检索生成（Naive RAG）→ 检索全流程优化（Advanced RAG）→ 具备反思能力的模块化系统（Modular RAG）。其中模块化架构通过LLM的递归调用实现动态检索决策，例如让模型自主判断何时触发检索或修正答案，形成类Agent的交互范式。具体可以看下图，细节在此不表，重点关注核心技术。

其实不管哪种范式，其本质都是搜索 + LLM的融合，所有核心技术的其实都是搜索和大模型的技术的变革。

![](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naKb86ubrNiaORezhgBBahiaZkPa6nrLiagmB69xTxgmzUrWkVJxpY8obK1OAiafh2nbQib5jWJ6Dm0sdnA/640?wx_fmt=png&from=appmsg)

三、关键技术

**3.1 检索技术**

#### 3.1.1 混合搜索

前面提到过目前RAG的Retrieval存在一些弊端，比如召回率低，准确率低，噪声大，存在冗余查询，效率和鲁棒性差等。因此我们需要Hybrid Search。目前比较通用的混合搜索是三路混合检索：**全文搜索 with BM25** + **稠密向量（语义匹配）** + **稀疏向量（关键词增强）。**首先我们先简单介绍一下这集中检索方式：

**全文索引**

常使用倒排索引（Inverted Index）等技术，将文档中的每个单词映射到包含该单词的文档列表，从而实现高效的查询。查询速度快，适合精确匹配。支持复杂的查询语法（如布尔查询、通配符查询）。缺点是无法理解语义，仅依赖字面匹配。对同义词、语义相似性等处理能力有限，当然这可以通过归一化等预处理来解决。相关性排序**，**常用算法为**BM25算法**，基于词频、文档长度和逆文档频率的综合评分。

BM25（Best Matching 25）是一种**基于概率模型的文档相关性评分算法**，广泛用于全文搜索引擎中，用于衡量查询（Query）与文档（Document）之间的匹配程度。它是传统TF-IDF算法的改进版本，尤其在处理文档长度和词频分布上表现更优。BM25通过结合词频、逆文档频率和文档长度归一化，提供了一种高效评估文档与查询相关性的方法，具有高效、灵活和鲁棒的特点。BM25因其简洁性和高效性，至今仍是文本检索的基石技术，尤其在需要快速响应和可解释性的场景中不可替代。

**Sparse vector search**

稀疏检索是一种基于稀疏向量的搜索技术，通常用于传统的信息检索任务。稀疏向量是指向量中大部分元素为零，只有少数元素非零。使用词袋模型（Bag of Words, BoW）或 TF-IDF 等方法将文本表示为稀疏向量，然后通过计算向量之间的相似度（如点积）来检索相关文档。主要使用在传统文本检索（如搜索引擎）。计算效率高，适合大规模数据集，但是无法理解语义。

稀疏向量难以替代全文搜索：稀疏向量旨在替代全文搜索，其方法是使用标准预训练模型消除冗余词并添加扩展词，从而得到固定维度（例如 30,000 或 100,000 维）的稀疏向量输出。这种方法在一般查询任务上表现良好；但是，许多用户查询关键字可能不存在于用于生成稀疏向量的预训练模型中，例如特定的机器模型、手册和专业术语。因此，虽然稀疏向量和全文搜索都服务于精确召回的目的，但它们各有千秋，无法互相替代。

**Vector Search**

Vector search 是一种基于向量空间模型的搜索技术，将数据（如文本、图像、音频）转换为高维向量（通常是稠密向量），并通过计算向量之间的相似度（如余弦相似度或欧氏距离）来找到最相关的结果。利用机器学习模型（如深度学习）将数据映射到向量空间，语义相近的数据在向量空间中距离较近。主要应用场景是语义搜索（Semantic Search）：理解查询的语义，而不仅仅是关键词匹配。能够捕捉语义信息，支持模糊匹配。适合处理非结构化数据（如文本、图像）。但是需要预训练模型生成向量，计算复杂度较高。对硬件资源（如GPU）要求较高。

![](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naKb86ubrNiaORezhgBBahiaZkCljlLGnwxzDBNJdMCaKJlKoWO81ZcmR544ib5QYEGHicKYPyVJZM9bwQ/640?wx_fmt=png&from=appmsg)

采用多种召回方法可以为 RAG 带来更好的结果。具体来说，将向量搜索、稀疏向量搜索和全文搜索结合起来可以实现最佳召回率。这很容易理解，因为向量可以表示语义；一个句子甚至整篇文章都可以封装在一个向量中。本质上，向量传达了文本的“含义”，表示其与上下文窗口内其他文本共现的压缩概率。因此，向量无法精确表示查询。例如，如果用户问：“我们公司 2024 年 3 月的财务计划包括哪些组合？”结果可能会返回来自其他时间段的数据或不相关的主题，例如运营计划或营销管理。相比之下，全文搜索和稀疏向量主要表达精确的语义。因此，将这些方法结合起来可以满足我们日常对语义理解和精度的需求。

![](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naKb86ubrNiaORezhgBBahiaZkFJnrg3ibFrx6QmavGeqaiafIWey1Xg1zIeuBGkP8hlbNxnQYLXqSicVhA/640?wx_fmt=png&from=appmsg)

下图显示了使用 Infinity 在公共基准数据集上进行评估的结果，比较了单向召回方法（向量、稀疏向量、全文搜索）、双向召回和三向召回。纵轴表示排序质量，很明显三向召回取得了最佳结果，充分验证了 BlendedRAG 的效果。

![](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naKb86ubrNiaORezhgBBahiaZk1yITbVGCJBequn6iaxgwibosyNd9dR3DoZwqjrPJsMw72TJhyxc0wWAQ/640?wx_fmt=png&from=appmsg)

目前的混合搜索架构中，不同的数据存储和检索大都是通过异构数据库和存储介质来实现的，这会带来效率和精准度的问题，因此同时支持多种检索的数据库显得尤为重要，但是有较大挑战，目前市面上实现此类功能的数据库有Milvus（支持多模态向量+标量过滤） ， Weaviate（内置混合搜索）。

#### 3.1.2 DPR（Dense Passage Retrieval）

在RAG（Retrieval-Augmented Generation，检索增强生成）系统中，DPR（Dense Passage Retrieval，稠密段落检索）是检索模块的核心技术之一。DPR通过使用密集向量表示来检索与查询最相关的文档或段落，是RAG系统的重要基础。由 Facebook AI Research 团队在2020年首次提出。

DPR是一种基于深度学习的检索方法，专注于将查询（query）和文档（passage）编码为稠密向量，并通过计算向量之间的相似度来检索与查询最相关的文档。DPR是稠密向量检索在段落检索任务中的一个具体实现，它利用深度学习模型将查询和文档编码为稠密向量，并通过相似度计算来检索相关文档。

**DPR的核心功能**

**1\. 双编码器架构：DPR采用双编码器架构，分别对查询和文档进行编码，将它们映射到高维向量空间中。通过计算查询向量和文档向量之间的相似度（如内积），DPR能够高效地检索出与查询最相关的文档。**

**2\. 语义匹配：与传统的稀疏检索方法（如BM25）不同，DPR能够捕捉查询和文档之间的语义相似性，而不仅仅是关键词匹配。这使得DPR在处理复杂的自然语言查询时表现出色。**

**3\. 高效检索：DPR利用密集向量表示和高效的最近邻搜索算法（如MIPS，Maximum Inner Product Search），能够快速从大规模知识库中检索出相关文档。**

DPR作为RAG系统中的检索器，负责从外部知识库中检索与用户查询最相关的文档或段落。这些检索到的文档随后被送至生成模块，生成模块利用这些文档生成高质量、上下文相关的回答。DPR的高效语义检索能力显著提升了RAG系统在开放域问答等任务中的表现。

尽管DPR已经取得了显著的成果，但仍有改进空间。例如，DPR训练过程中的知识分散化（decentralization）可以进一步优化，以提高检索的多样性和准确性。此外，研究者们也在探索如何更好地将DPR与预训练语言模型结合，以进一步提升检索和生成的性能。

**3.2 重排序 Ranking Models**

我们前面讲过，三路召回（BM25 + 稠密向量 + 稀疏向量）效果最优，但如何高效融合多路结果并重排序（Reranking）仍是难题。

排名是任何搜索系统的核心。排名涉及两个组件：一个是用于粗过滤的部分也就是**粗排**；另一个是用于微调阶段的重排序模型也叫**重排**或者精排。混合检索能够结合不同检索技术的优势获得更好的召回结果，但在不同检索模式下的查询结果需要进行合并和归一化（将数据转换为统一的标准范围或分布，以便更好地进行比较、分析和处理），然后再一起提供给大模型。这时候我们需要引入一个评分系统：重排序模型（Rerank Model）。

重排序模型会计算候选文档列表与用户问题的语义匹配度，根据语义匹配度重新进行排序，从而改进语义排序的结果。其原理是计算用户问题与给定的每个候选文档之间的相关性分数，并返回按相关性从高到低排序的文档列表。常见的 Rerank 模型如：Cohere rerank、bge-reranker 等。

![](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naKb86ubrNiaORezhgBBahiaZk1spXdaJsy8zyx67ZG8TPicvCXTAPdrfla3k04WDiazRxWLGyUyONnI1Q/640?wx_fmt=png&from=appmsg)

*不过，重排序并不是只适用于不同检索系统的结果合并，即使是在单一检索模式下，引入重排序步骤也能有效帮助改进文档的召回效果，比如我们可以在关键词检索之后加入语义重排序。*

在具体实践过程中，除了将多路查询结果进行归一化之外，在将相关的文本分段交给大模型之前，我们一般会限制传递给大模型的分段个数（即 TopK，可以在重排序模型参数中设置），这样做的原因是大模型的输入窗口存在大小限制（一般为 4K、8K、16K、128K 的 Token 数量），你需要根据选用的模型输入窗口的大小限制，选择合适的分段策略和 TopK 值。

需要注意的是，即使模型上下文窗口很足够大，过多的召回分段会可能会引入相关度较低的内容，导致回答的质量降低，所以重排序的 TopK 参数并不是越大越好。

在RAG（Retrieval-Augmented Generation）系统中，检索完成后进行重排序（reranking）的目的是为了提高最终生成结果的质量和相关性。尽管初始检索阶段已经返回了一组相关文档或段落，但这些结果可能并不完全符合生成模型的需求，或者可能存在排序不合理的情况。重排序可以帮助筛选出最相关、最有用的信息，从而提升生成模型的输出效果。

接下来我们重点介绍几种常用的Reranker。

#### 3.2.1 Cross-Encoder Reranker

Cross-Encoder Reranker 是一种基于深度学习的重排序模型，通过**联合编码查询-文档对**（将查询和文档拼接后输入模型）直接预测相关性分数，而非生成独立向量。其核心是利用交叉编码器（Cross-Encoder）架构来评估查询（query）和文档（document）对之间的相似度。与双编码器（Bi-Encoder）不同，交叉编码器不是分别对查询和文档进行编码，而是将查询和文档作为一个整体输入到模型中，从而能够更有效地捕获两者之间的交互和关系。这种架构通常由多层神经网络单元组成，例如Transformer或循环神经网络（RNN），能够将输入序列中的信息编码为固定大小的表。比传统向量检索更精准，能捕捉深层次语义关系。它通过端到端分类任务（如二元相关性判断）优化，适合对Top-K候选文档进行精排。代表模型有`<font style="color:rgb(64, 64, 64);">BAAI/bge-reranker-large</font>`。

Cross-Encoder可以与延迟交互（Late Interaction）结合，如本文前面提到过的**ColPali**（多模态RAG场景），通过分解查询-文档交互矩阵为多向量外积，实现高效语义排序，同时保留细粒度交互能力。

在效率方面，可以将大型Cross-Encoder（如BERT-large）蒸馏为轻量级模型（如TinyBERT），或采用FP16/INT8量化降低推理延迟。这些都是比较通用的方法，在此不表。

使用示例：

  

```
import numpy
```
```
import lancedb
```
```
from lancedb.embeddings import get_registry
```
```
from lancedb.pydantic import LanceModel, Vector
```
```
from lancedb.rerankers import CrossEncoderReranker
```
 
```
```
 
```
embedder = get_registry().get("sentence-transformers").create()
```
```
db = lancedb.connect("~/.lancedb")
```
 
```
```
 
```
class Schema(LanceModel):
```
```
    text: str = embedder.SourceField()
```
```
    vector: Vector(embedder.ndims()) = embedder.VectorField()
```
 
```
```
 
```
data = [
```
```
    {"text": "hello world"},
```
```
    {"text": "goodbye world"}
```
```
]
```
 
```
```
 
```
tbl = db.create_table("test", schema=Schema, mode="overwrite")
```
```
tbl.add(data)
```
 
```
```
 
```
reranker = CrossEncoderReranker()
```
 
```
```
 
```
# Run vector search with a reranker
```
```
result = tbl.search("hello").rerank(reranker=CrossEncoderReranker()).to_list()
```

#### 3.2.2 Graph-Based Reranking

当前主流RAG系统遵循"检索-排序-生成"的线性流程，其中重排序环节通常采用两类方法：(1) 基于独立编码的交叉注意力模型（如MonoT5），单独评估每个文档与查询的相关性；(2) 基于列表级损失的排序模型（如ListNet），优化整个文档序列的排列。这两种范式都存在根本性局限——它们将文档视为**孤立的个体**，完全忽视了文档间丰富的语义关联，导致三个关键问题：

**1\. 信息整合失效**：当答案需要综合多篇文档信息时（如对比型问题"比较A与B的优缺点"），独立排序可能将与A、B分别相关但单独评分不高的文档排在后位，而实际上这些文档的组合才最具回答价值\[2\]\[3\]。

**2\. 冗余放大效应**：高度相似的多篇文档可能因独立评分都较高而同时位居前列，挤占其他重要但独特信息的展示空间。论文图1展示了传统方法在HotpotQA数据集上出现的典型冗余案例，前5篇文档中有3篇内容重叠度超过70%。

**3\. 关系认知盲区**：现有系统无法识别文档间的因果、时序、对比等逻辑关系，而这些关系往往是解答复杂问题的关键。例如回答"COVID-19如何导致经济衰退"需要串联病因学文档与经济分析文档，尽管它们的主题相似度可能很低。

更本质地，这些问题的根源在于传统排序将文档视为**独立同分布**样本，而现实中文档间存在复杂的**条件依赖**关系。该论文首次提出将文档集合建模为图结构，其中节点表示文档，边表示语义关系，通过图算法挖掘全局结构信息来指导排序决策。

现有RAG系统在处理文档与问题上下文关系时存在挑战，当文档与问题的关联性不明显或仅包含部分信息时，模型可能无法有效利用这些文档。此外，现有方法通常忽视文档之间的连接，导致无法充分利用文档间的语义信息。

这篇 Paper 《Don't Forget to Connect! Improving RAG with Graph-based Reranking》该论文提出了一种基于图的重排方法G-RAG，旨在通过利用文档之间的连接信息和语义信息，更有效地识别文档中的有价值信息，从而提高RAG在ODQA中的性能。

![](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naKb86ubrNiaORezhgBBahiaZk9evHwticCJlfPaxicKByddvBC2iaoh34cUe6DN7HfqD0unGNFKJsfkFTg/640?wx_fmt=png&from=appmsg)

**关键技术**

**1\. 图结构构建**  

*   将检索到的文档或文本块表示为图中的节点，节点间的边通过以下方式建立：

*   **语义相似性**（如向量余弦相似度）；
*   **实体共现关系**（如命名实体在同一文档中的关联）；
*   **逻辑依赖**（如文档间的引用或因果链）\[2\]\[3\]。

*   例如，类似GraphRAG的方法会预生成实体知识图，并通过社区检测划分紧密关联的节点组。

2. **图神经网络架构**

基于GNN的架构来重排序检索到的文档：

*   **节点特征**：使用预训练的语言模型（如BERT）编码文档文本，并结合AMR图中的最短路径信息来增强这些特征。

框架应用预先训练的语言模型对给定问题 q 的 { p 1 , p 2 , ⋯ , p n }  中所有 n 检索到的文档进行编码。文档嵌入表示为

![](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naKb86ubrNiaORezhgBBahiaZkbrMIAn8rqhx556ZBtibVvDjSFpglYBTUrhG7VgkUuvKpb2yibYMzGgeg/640?wx_fmt=png&from=appmsg)

，其中 d 是隐藏维度，

![](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naKb86ubrNiaORezhgBBahiaZk0y3upBNlh63ibxmM1lIxmdVc7sODaOZvuGAoKFj9dFFzk8sv1vU6tBw/640?wx_fmt=png&from=appmsg)

的每一行由以下公式给出

![](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naKb86ubrNiaORezhgBBahiaZkKZKBMjNrnUYyFU2o7IMkOxRvgNUr9MrmGOGITuV7SLzFnZ0abNw8FA/640?wx_fmt=png&from=appmsg)

某些负面文档无法与其文本中的问题上下文建立足够的联系。此外，负面文档还会遇到另一种极端情况，即路径包含大量与问题文本相关的信息，但缺乏有价值信息。这种独特的模式提供了有价值的见解，可在编码过程中利用它们来提高重排器的性能。

因此，建议的文档嵌入由

![](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naKb86ubrNiaORezhgBBahiaZkZJW10QeKO73ldFicE6ecqhaOV3OVwlvgPN4EDogFicEVKMp84ZSvwaUA/640?wx_fmt=png&from=appmsg)

给出，并且 X 的每一行可以由

![](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naKb86ubrNiaORezhgBBahiaZkdZQvdAyC5VvVgtNyhBIYUIea6WVRlV2kqTibDic1FnDep5uGpNSaW9qQ/640?wx_fmt=png&from=appmsg)

给出：

![](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naKb86ubrNiaORezhgBBahiaZkvsWUeTOKDZzicdFKUWejQoianY80mS2Ud8vFgc7o5yObMohX8NI43rmw/640?wx_fmt=png&from=appmsg)

*   边特征：利用AMR图中共同节点和边的数量作为边特征。结合了AMR图，不仅捕捉文档的语义信息，还通过图结构增强了文档之间的语义关联。

*   **表示更新**：通过GNN模型更新节点和边的表示，利用消息传递机制传递信息。

**3\. 图算法重排序**

*   采用**个性化PageRank**或**社区影响力评分**对节点（文档）进行重要性排序，优先选择图中中心性高或与问题节点连接紧密的文档。  

*   类似R4框架的图注意力机制，学习文档间的交互关系以优化顺序。  

*   通过多跳推理挖掘间接关联的文档（如RAE框架的链式检索策略）。

**4\. 动态响应生成**

*   对重排序后的文档集，分两步生成答案：  

**1）局部响应生成**：每个高权重文档或社区摘要独立生成部分答案；

**2）全局整合**：通过LLM对局部响应去冗余并合成最终答案。  

*   类似HippoRAG的神经启发方法，模拟人脑记忆整合机制优化知识融合。 

**5\. 端到端优化**

*   引入强化学习（如R4的奖励机制）或轻量级评估器（如CRAG）联合优化检索与生成模块。

#### 3.2.3 ColBERT Reranker

ColBERT（Contextualized Late Interaction over BERT）是一种高效的检索模型，特别适用于大规模文本集合的检索任务。它通过延迟交互机制（late interaction architecture）结合BERT的上下文表示，实现了高效的检索和重排序。这里我们Jina-ColBERT-v2

**1\. 延迟交互机制（Late Interaction）**：ColBERT引入了一种延迟交互相似性函数，通过分别对查询和文档进行编码，然后在推理时计算查询和文档之间的相似性（MaxSim），从而实现延迟交互。这种方法在保持高效推理的同时，能够捕捉到查询和文档之间的复杂关系。

**2\. 多向量表示**：与传统的单向量检索模型不同，ColBERT为查询和文档中的每个标记生成一个嵌入向量，然后通过聚合这些标记嵌入来计算相关性分数。这种方法能够更细致地捕捉文本的语义信息。

**3\. 多语言预训练**：Jina-ColBERT-v2使用XLM-RoBERTa作为其基础模型，并通过在多种语言的数据上进行预训练，提高了模型的多语言性能。

**4\. 弱监督学习**：论文提出在大规模的弱监督文本对上进行预训练，以学习文本的一般语义结构。这些文本对包括句子对、问答对和查询-文档对，涵盖了多种语言和领域。

**5\. 三元组训练**：在预训练的基础上，模型进一步在多种语言的检索数据上进行微调，使用标注的三元组数据和硬负样本进行训练，以提高检索性能。

**3.3 Multimodal RAG 多模态RAG**

目前，多模态检索增强生成（Multimodal RAG） 已成为 RAG 技术中最前沿和流行的方向之一，它通过整合文本、图像、音频、视频等多种模态数据，显著提升了 AI 系统的理解和生成能力。

对于多模态文档，传统方法是使用模型将多模态文档转换为文本，然后再进行索引以供检索。另一种方法是直接多模态向量化，比如利用 视觉语言模型 VLM，**直接生成向量，绕过复杂的 OCR 过程**。2024 出现的 ColPali。ColPali 将图像视为 1024 个图像块，并为每个块生成嵌入，有效地将单个图像表示为张量。比如：

![](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naKb86ubrNiaORezhgBBahiaZkic5FcFlK6a2yBYfn3jBURtULibTOqFVyhhvOiaumHYhHic8Ac3AAbdz7uA/640?wx_fmt=png&from=appmsg)

这意味着 VLM 对图像的理解更加深入，不再仅仅识别日常物品，而是可以高效识别企业级多模态文档。例如，来自 Google 的开源 3B 模型 PaliGemma，能够将图像块（Image Patches）嵌入到与文本相似的潜在空间中。ColPali 在此基础上扩展，通过投影层将模型输出的高维嵌入降维至 128 维，生成多向量表示（每个图像块对应一个向量），从而保留文档的细粒度视觉信息。借鉴文本检索模型 ColBERT 的“延迟交互”策略，ColPali 在检索阶段计算查询文本的每个 token 向量与文档图像块向量的最大相似度（MaxSim），而非传统的**单向量相似度**。这种方法避免了早期交互的计算负担，同时提升了检索精度。

![](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naKb86ubrNiaORezhgBBahiaZkHLVq9OKFhiap5UXcficWMestC4YITA5npPcVPbHJ0dx2ZHib5LAlOhptg/640?wx_fmt=png&from=appmsg)

这种技术的优势非常明显，端到端处理复杂文档**，直接输入文档图像（如 PDF 页面），无需传统 OCR、文本提取或布局分析等预处理步骤，显著简化流程并减少错误传播。还可以实现**多模态联合检索，通过视觉和文本嵌入的统一表示，模型能同时理解图表、表格和文本内容。例如，在财务报告或科学论文中，ColPali 可检索出纯文本方法可能遗漏的视觉关键信息。

如果我们可以使用 RAG 根据用户查询在大量 PDF 中查找包含答案的图像和文本，那么我们就可以使用 VLM 生成最终答案。这就是多模态 RAG 的意义所在，它不仅仅是简单的图像搜索。

检索过程需要一个 Versatile 的数据库，不仅支持基于张量的重新排序，而且还能在向量检索阶段容纳**多向量索引**。

![](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naKb86ubrNiaORezhgBBahiaZk7FmKOHWhnO3nalQEWy6S5jcibIicKy02ICYGRGicBgia6f0gjYVcwwJ04Q/640?wx_fmt=png&from=appmsg)

在这里我们简单介绍一下直接多模态向量化和模态转换。

**直接多模态向量化**

*   **核心思想**：  

使用多模态模型（如CLIP、Flamingo）直接生成跨模态的向量表示，跳过中间文本转换步骤。

*   **核心任务**：  

通过模型（如CLIP、Flamingo）将不同模态数据（图/文/音）映射到**同一向量空间**，确保语义相似的输入（如“狗”的图片和文本“犬”）向量距离相近。

*   **关键技术**：

1）对比学习（Contrastive Learning）：如CLIP的图文对齐训练。

2）共享编码器（Shared Encoder）：同一模型处理多模态输入。
*   **输出**：  

向量（如512维浮点数组），不直接完成检索任务。
*   **流程**

![](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naKb86ubrNiaORezhgBBahiaZk1ut1lnEdII4tT6H3k8ZFCKFKcTlL8dULXWlf1xj9QvuEbnDCPShb6w/640?wx_fmt=png&from=appmsg)

**模态转换，多模态转文本（Modality-to-Text）**

*   **技术原理**：将非文本模态（如图像、音频）转换为文本描述（如 OCR、ASR、图像描述生成），再使用传统文本 RAG 进行检索和生成。
*   优势：

*   实现简单，兼容现有文本 RAG 架构。
*   适用于结构化数据（如表格、PDF）和语音转文本任务。

*   **代表工具**：

*   **BLIP-2**（Salesforce）：生成高质量的图像描述。  
*   **Whisper**（OpenAI）：语音转文本（ASR）。

*   流程

![](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naKb86ubrNiaORezhgBBahiaZkAVOcTfcLLg0QdLFA0dZDyFDgpKsy1s4deY5DoJPDGe5k10D74VycNQ/640?wx_fmt=png&from=appmsg)

多模态转文本（Modality-to-Text）和直接多模态向量化（Direct Multimodal Embedding）对比

![](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naKb86ubrNiaORezhgBBahiaZkMC55bYrOpoJT4cBwibON391s9yTEFkLiarZZ6picyzdXsI3ibvPggK0C8Q/640?wx_fmt=png&from=appmsg)

当然，现实情况中，我们有多模态融合的scenarios，这个时候我们需要建立一个共享向量空间，使用**跨模态模型**（如 OpenAI的CLIP、DeepMind的Flamingo）将不同模态的数据（如图片、文本、音频）映射到同一向量空间，文档中的文本、图像等模态均可检索，通过距离计算匹配用户查询，实现跨模态语义对齐，比如以图搜文，以文搜图等。

**3.4 强化学习**

#### 3.4.1 DeepRAG

强化学习（Reinforcement Learning, RL）RAG 中的应用并不鲜见。RL能够优化RAG系统的**检索策略**、查询生成和答案推理过程，可以说，强化学习是 RAG 最好的军师。比如 DeepSeek-R1 就是通过基于规则的强化学习 (RL) 成功激发推理能力。

这篇 Paper 《DeepRAG: Thinking to Retrieval Step by Step for Large Language Models》提出了DeepRAG，采用马尔可夫决策过程（MDP）建模检索增强推理，动态决定何时检索外部知识。优化了推理精准度，减少不必要检索，提升计算效率。

![](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naKb86ubrNiaORezhgBBahiaZkIJicO7diacH5E6bNSqm0OaR1I2ibFCZBibzXUiaQkGDGP8aFo5bkwFBl3Hw/640?wx_fmt=png&from=appmsg)

*   **DeepRAG框架**：DeepRAG将检索增强推理建模为马尔可夫决策过程（MDP），通过迭代分解查询，动态决定在每一步是否检索外部知识或依赖参数推理。**奖励函数**根据答案的正确性和检索成本来评估状态，结合答案正确性和检索成本，鼓励高效且准确的推理路径。  
*   **检索叙事（Retrieval Narrative）**：确保结构化和自适应的检索流程，根据先前检索到的信息生成子查询。  
*   **原子决策（Atomic Decisions）**：动态决定每个子查询是否检索外部知识或仅依赖LLMs的参数知识。  
*   **二叉树搜索（Binary Tree Search）**：为每个子查询构建二叉树，探索基于参数知识或外部知识库的不同回答策略。  
*   **模仿学习（Imitation Learning）**：通过二叉树搜索合成数据，使模型学习“子查询生成 - 原子决策 - 中间答案”的模式。  
*   **校准链（Chain of Calibration）**：通过校准每个原子决策来细化模型对其自身知识边界的理解，使其能够更准确地做出检索必要性的决策。

![](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naKb86ubrNiaORezhgBBahiaZkz2pSeAbHEVF6GymV5VhptzRRsEjkuBSo16WZ9wtb6QzllrKZ5HiaWicQ/640?wx_fmt=png&from=appmsg)

DeepRAG** **将检索增强推理建模为 MDP，结合二进制树搜索与校准链，实现了动态检索决策。减少冗余检索和不必要的噪声，能够显著提高系统的准确性和效率。但是其训练和推理过程可能需要较高的计算资源，且检索策略和知识边界校准方法有待提高，以泛化到更多的场景。

#### 3.4.2 CoRAG

传统的RAG方法通常在生成过程之前采用**一次性检索**策略，也就是只进行一次检索，但这种方法在处理复杂查询时可能效果有限，因为检索结果可能并不完全准确，做过搜索的同学应该都知道，想要完成一次准确的搜索，需要很多步骤，多路找回，多次检索，合并，粗排，精排等等。这篇Paper 《Chain-of-Retrieval Augmented Generation》提出了CoRAG，核心思想是将检索过程分解为多个步骤，逐步获取和整合外部知识。

![](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naKb86ubrNiaORezhgBBahiaZkxBdx5LWAa8iaUIjn7AluW3EDNDPxjZhfkib0wnbYMaMBAibA0v7A2ufDg/640?wx_fmt=png&from=appmsg)

CoRAG 通过**链式检索机制和强化学习**，提升了检索增强生成技术的效率和性能，CoRAG将检索过程分解为多个步骤，实现了逐步检索和动态调整，并且通过强化学习训练检索策略，使模型能够根据任务需求自适应调整检索行为。

![](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naKb86ubrNiaORezhgBBahiaZk6moVpRNsckicwh2W4rzno4tL1oqqPibZXFwxtEd81ZicoXHFoXZEW31Ww/640?wx_fmt=png&from=appmsg)

**链式检索机制**  逐步检索：将检索增强推理建模为**多步决策过程，**在生成过程中，模型根据当前生成的内容和任务需求，动态决定是否进行下一步检索。采用**自适应检索策略**：若中间答案置信度低，则重新检索；否则依赖已有信息继续生成。检索策略调整：通过强化学习或启发式规则，优化检索策略，确保每次检索都能获取最相关的信息。

大多数 RAG 数据集仅附带查询 Q 以及相应的最终答案 A ，而无需提供中间检索步骤。CoRAG 提出了一种通过拒绝抽样自动生成检索链的方法。

**检索与生成的协同**  多步检索整合：将每次检索的结果通过注意力机制与生成模型结合，确保生成内容与检索信息的一致性。

动态生成控制：根据检索结果的质量和相关性，动态调整生成策略，避免冗余或无关信息的引入。

**训练与优化**  训练数据：使用包含多步检索任务的数据集进行训练。数据集中的每个训练实例都表示为一个元组 ( Q , A , Q 1 : L , A 1 : L ) ，并附有查询 Q 和每个子查询的相应前 k 个检索文档。使用多任务学习框架中的标准下一个标记预测目标对增强数据集进行微调。

奖励设计：结合任务目标（如答案准确性、文本连贯性）设计奖励函数，引导模型学习最优检索策略。

模型架构：基于Transformer架构，扩展了检索决策模块和检索结果整合模块。

**3.5 GNN图神经网络**

传统RAG方法在处理复杂关系和多源知识整合方面存在不足，难以捕捉知识片段之间的复杂关系（如多跳推理任务），如多步检索或基于图的检索面临计算成本高、图结构噪声或不完整、泛化性差等挑战。这篇Paper 《GFM-RAG: Graph Foundation Model for Retrieval Augmented Generation》提出了 GFM-RAG，通过构建图结构来显式建模知识之间的复杂关系，可以提高检索和推理的效率。当然，这些方法仍然受到图结构噪声和不完整性的影响，可能会限制其性能。

![](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naKb86ubrNiaORezhgBBahiaZk99GxRJVfiapicfo78fx2PLgvk5UrC5RQeVR6wyjPfIb67ibIt94N2FtXg/640?wx_fmt=png&from=appmsg)

**GFM-RAG框架**：GFM-RAG通过构建知识图谱索引（KG-index）和图基础模型（GFM）来增强LLMs的推理能力。KG-index从文档中提取实体和关系，形成一个结构化的知识索引。GFM则利用图神经网络（GNN）来捕捉查询和知识图之间的复杂关系。

![](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naKb86ubrNiaORezhgBBahiaZkiaJwYwhOuAMMJ0aWxAESCEamvcyBvAffU5mRs1T1fPND8bOSyc80r5A/640?wx_fmt=png&from=appmsg)

包含三个核心组件：

**1\. KG索引构建**：从文档中提取实体和关系，构建知识图谱（KG-index），并通过实体解析增强语义连接。

传统的基于嵌入的索引方法将文档编码为单独的向量，但这些方法在对它们之间的关系进行建模方面受到限制。另一方面，知识图谱 (KG) 明确捕捉了数百万个事实之间的关系，可以提供跨多个文档的知识的结构化索引。KG 索引的结构性质与人类海马记忆索引理论非常吻合，其中 KG 索引就像一个人工海马，用于存储知识记忆之间的关联，增强了复杂推理任务对各种知识的整合。

为了构建 KG 索引，给定一组文档 𝒟 ，我们首先从文档中提取实体 ℰ 和关系 ℛ 以形成三元组 𝒯 。然后，构建实体到文档的倒排索引 M∈{0,1}|ℰ|×|𝒟| 来记录每个文档中提到的实体。这一过程可以通过现有的开放信息提取 (OpenIE) 工具实现。为了更好地捕捉知识之间的联系，进一步进行实体解析，在具有相似语义的实体之间添加额外边 𝒯+ ，例如 ( USA ， equivalent ， United States of America )。因此，最终的 KG 索引 𝒢 构建为 G \= { ( e , r , e ′ ) ∈ T ∪ T + } 。在实施过程中，利用 LLM 作为 OpenIE 工具，并利用预先训练的密集嵌入模型进行实体解析。

**2\. 图基础模型检索器（GFM Retriever）**：

*   **查询依赖的GNN**：动态调整消息传递过程，基于查询语义和KG结构进行多跳推理。

传统的 GNN 遵循消息传递范式，该范式迭代地聚合来自邻居的信息以更新实体表示。这种范式不适用于 GFM 检索器，因为它是特定于图的，并且忽略了查询的相关性。但是 query-dependent GNNs 在捕获查询特定信息和对不可见图的通用性方面表现出良好：

![](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naKb86ubrNiaORezhgBBahiaZksibdUkjzKudIsJn8P3mduftianj1Dia3AgHHQSztjJujz94mEVfERYV8A/640?wx_fmt=png&from=appmsg)

其中

![](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naKb86ubrNiaORezhgBBahiaZkwIp2OBgUsvPjswsFlr2LibcvJ63KGYWuQ2WkxflBn0aDviamTcsVMLhw/640?wx_fmt=png&from=appmsg)

表示初始实体特征， HqL 表示在经过 L 层依赖于查询的消息传递之后以查询 q 为条件的更新后的实体表示。

查询相关的 GNN 表现出更好的表达能力和逻辑推理能力，作为 GFM 检索器的骨干。它允许 GFM 检索器根据用户查询动态调整消息传递过程，并在图上找到最相关的信息。

*   **两阶段训练**

*   无监督KG补全预训练：在大规模KG上学习图推理能力
*   有监督文档检索微调：优化查询-文档相关性。

**GFM** 检索器的训练目标是最大化与查询相关的实体的可能性，可以通过最小化二元交叉熵 (BCE) 损失来优化：

![](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naKb86ubrNiaORezhgBBahiaZkS1EQmlibU1z0lyN8lQ8CL6icls1Mj6Wvv8Is8X0NByhHQmtljvFFtozw/640?wx_fmt=png&from=appmsg)

其中 𝒜q 表示与查询 q 相关的目标实体集， ℰ-⊆ℰ∖𝒜q 表示从 KG 中采样的负实体集。然而，由于目标实体的稀疏性，BCE 损失可能遭受梯度消失问题。为了解决这个问题，进一步引入了排名损失， 以最大化正负实体之间的边际：

![](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naKb86ubrNiaORezhgBBahiaZkBwHB48ew9iaKU0ibZGwnB5acLibgTWicpicnia9E6x1yNicfAUd0ZibQlYGiccg/640?wx_fmt=png&from=appmsg)

最终的训练目标是 BCE 损失和排名损失的加权组合：

![](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naKb86ubrNiaORezhgBBahiaZkSTGvTMjKAuq9oDfMG2IDolTicjKgf7voclB9hFib7vXdia2Y6Y6ZfKBDQ/640?wx_fmt=png&from=appmsg)

3\. 文档排序与答案生成：根据实体相关性得分排序文档，输入LLM生成最终答案。

鉴于 GFM 检索器预测的实体相关性得分 Pq∈ℝ|ℰ|×1 ，首先检索相关性得分最高的前 T 个实体 ℰqT ：

![](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naKb86ubrNiaORezhgBBahiaZkTPC4gRTTV3wbtIW5PicPo3fCpLZmxuMBMkg5FicVzIvBVy7H8wfRqk7A/640?wx_fmt=png&from=appmsg)

然后，文档排名器使用这些检索到的实体来获取最终文档。为了减少热门实体的影响，按照实体在文档倒排索引 M∈{0,1}|ℰ|×|𝒟| 中被提及的频率的倒数来加权实体，并通过对文档中提及的实体的权重求和来计算最终的文档相关性得分：

![](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naKb86ubrNiaORezhgBBahiaZkkePbiaIic8PpjDxfciauZZBzeEic42icPVyFQUpmibbn4W8FeBpXTBDpLibMw/640?wx_fmt=png&from=appmsg)

根据文档相关性得分 Pd 检索排名前 K 的文档，并以检索增强生成的方式输入到 LLMs 的上下文中，以生成最终答案：

![](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naKb86ubrNiaORezhgBBahiaZkQgvkbP99CJUia05OibouqG1bwO0ic4Mbh0qbykGVyKZFFo6mY6icxSW3sQ/640?wx_fmt=png&from=appmsg)

**图基础模型（GFM）**：GFM是一个基于查询的GNN，能够根据用户查询动态调整信息传递过程，从而在单步中完成多跳推理。GFM经过两个阶段的训练：无监督的知识图完成预训练和有监督的文档检索微调。模型有8M参数，通过大规模训练（60个KG、14M三元组、700k文档）实现跨数据集零样本泛化。在7个领域数据集上 zero-shot 表现优于HippoRAG 18.9%。

关于 Scaling Law，从图中我们看到模型性能随模型参数大小和训练数据大小变化的拟合趋势线。从趋势线中我们可以看到 GFM-RAG 的性能随着模型参数大小和训练数据大小的增加而提高。同时，随着模型参数大小的增大，需要更大的训练数据量才能达到最佳性能。也就是说，同时扩大模型大小和训练数据可以进一步提高 GFM-RAG 的性能。

![](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naKb86ubrNiaORezhgBBahiaZkpzr91iadoEZqiamM3DiazTQZEplfCUzBmNr5aN8ibAwNWoc3jiaLPiaSWNBg/640?wx_fmt=png&from=appmsg)

**训练过程**：

*   **无监督知识图完成预训练**：通过掩码知识图中的实体来创建合成查询，训练GFM预测被掩码的实体。

*   **有监督文档检索微调**：使用标注的查询-文档对进行训练，使GFM能够更好地理解用户查询并检索相关文档。

GFM-RAG通过图结构建模和图神经网络推理，显著提升了RAG在复杂推理任务中的性能。但还是同样的问题，训练和推理过程可能需要较高的计算资源。如果有更高效的训练策略和更大的模型规模，模型的效率和泛化性将会得到显著提高。

**3.6 Agentic RAG**

LLM横行的年代，大多数人言则Agent，事实确实如此，LLM的落地一定是Agent，RAG也不例外。代理和 RAG 之间存在着不可分割的关系，RAG 本身是代理的关键组件，使它们能够访问内部数据；相反，代理可以增强 RAG 功能，从而产生了所谓的 Agentic RAG，例如 Self RAG 和 Adaptive RAG，因此两者实际上你中有我，我中有你的关系。

这种高级形式的 RAG 允许以受控的方式在更复杂的场景中进行自适应更改。要实现 Agentic RAG，代理框架必须具备“闭环”功能。在 Andrew Ng 的四种代理设计模式中，这种“闭环”能力被称为反射能力。

![](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naKb86ubrNiaORezhgBBahiaZkOImcp3G2pxTAjoYEOqibMY60bfZghibH8xpcLkGqyOF1XYAnZn9AL84A/640?wx_fmt=png&from=appmsg)

Agentic RAG（基于代理的检索增强生成）代表了RAG技术的最新发展方向，通过将人工智能代理(Agent)的自主规划与决策能力引入传统检索增强生成框架，实现了对复杂查询任务的高效处理。本文将全面解析Agentic RAG的核心概念、技术架构、优势特点以及实际应用场景，帮助读者深入理解这一前沿技术如何通过智能代理的动态编排机制和多跳推理能力，显著提升传统RAG系统在复杂信息处理任务中的表现。

![](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naKb86ubrNiaORezhgBBahiaZkyEJbgGx497xNz4vksylZ740MbcbiaXSnvYOXzOsbGpe0MYB5EHtquibw/640?wx_fmt=png&from=appmsg)

#### 3.6.1 核心概念与产生背景

Agentic RAG（基于代理的检索增强生成）是传统检索增强生成技术的**高级演进形式**，它通过**引入人工智能代理(Agent)的自主决策能力**，使RAG系统从被动的信息检索-生成管道转变为具有主动规划和反思能力的智能体，本质上是一种融合了Agent能力与RAG架构的混合系统，其核心创新在于将AI智能体的自主规划（如路由、行动步骤、反思等）能力整合到传统的RAG流程中，以适应更加复杂的查询任务。

Agentic RAG的**产生背景**正是为了解决传统RAG在复杂场景下的这些不足。随着企业知识管理需求的日益复杂化，简单的问答式RAG已不能满足实际业务需求。企业环境中存在大量异构数据源（如结构化数据库、非结构化文档、知识图谱等），用户查询往往需要跨源关联和综合推理。同时，许多高级任务还需要结合外部工具（如计算器、API服务等）才能完整解答。这些挑战促使RAG技术向更智能、更自主的方向发展，从而催生了Agentic RAG这一新兴范式。

AI Agent 是具有环境感知、自主决策和行动执行能力的智能体，能够基于目标动态规划行动步骤。将这种能力引入RAG系统后，系统能够自主决定是否需要检索、选择哪种检索策略、评估检索结果质量、决定是否重新检索或改写查询，以及在必要时调用外部工具。这种进化使RAG系统具备了感知，决策和行动能力。

从系统构成角度看，Agentic RAG可被视为RAG工具化的Agent框架。在这种视角下，传统的RAG管道（检索器+生成器）被降级为Agent可使用的一种工具，而Agent则负责更高阶的任务规划与协调。这种架构转变带来了设计范式的根本变化：不再是"如何改进RAG管道"，而是"如何让Agent更有效地利用RAG工具"，从而打开了更广阔的设计空间和优化可能性。

*表：传统RAG与Agentic RAG的核心区别*

![](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naKb86ubrNiaORezhgBBahiaZkCaibWk7mNJoak2aKibAgiaTib8SvjibGsZ5PjxGpKciaNk98JpK7SLYxdx9g/640?wx_fmt=png&from=appmsg)

#### 3.6.2 技术架构与关键组件

Agentic RAG系统的技术架构呈现出多样化的设计范式，从**单Agent控制**到**多Agent协同**的不同实现方式。与传统的线性RAG流程不同，Agentic RAG 将检索与生成过程重构为基于智能代理的动态可编排系统，通过引入规划、反思和工具使用等Agent核心能力，显著提升了复杂信息处理任务的解决能力。

**单Agent架构模式**

单Agent架构是Agentic RAG的**基础实现形式**，其核心思想是构建一个具备规划能力的 Master 智能体，将各种RAG管道和外部工具作为该 Agent 可调用的"工具"。在这种架构中，传统RAG的检索器、生成器等组件被工具化，成为 Agent 执行计划时可选择的资源。当用户查询进入系统后，Master Agent 会首先分析查询意图和复杂度，然后动态规划解决方案，可能包括：决定是否需要检索、选择哪种检索策略（如向量检索、关键词检索或混合检索）、确定是否需要进行多步检索以及是否需要调用外部工具等。

单Agent架构中的**关键组件**包括：

*   **查询分析器**：负责深度理解用户查询，识别隐含意图和所需的信息类型。先进的实现可能采用few-shot学习或思维链(Chain-of-Thought)技术提升意图识别准确率。
*   **策略规划器**：基于查询分析结果，制定检索与生成策略。例如，对于"比较X和Y"类的对比查询，规划器可能决定并行检索X和Y的相关信息，然后进行对比生成。
*   **工具集**：包括各种专业化RAG管道（如面向事实查询的向量检索、面向摘要任务的文本压缩检索等）和外部工具（如计算器、API接口等）。Agent将这些工具视为可插拔的模块。
*   **反思模块**：评估中间结果的质量，决定是否需要调整策略。例如，当首次检索结果不理想时，反思模块可能触发查询改写或更换检索策略。

单Agent架构的优势在于**设计相对简单**和**资源需求较低**，适合中等复杂度的应用场景。但当面对企业级复杂知识环境（如跨部门多源异构数据）时，单个Agent可能面临规划负担过重、专业知识不足等挑战，这时就需要考虑更高级的多Agent架构。

**多Agent分层架构**

多Agent分层架构是应对**企业级复杂场景**的 Agentic RAG 解决方案，通过引入层级化的 Agent 组织，实现关注点分离和专业化分工。典型的双层架构包含一个顶层协调Agent和多个专业领域Agent，每个下层Agent负责特定类型的数据源或任务，而顶层Agent则负责任务分解、协调和结果整合。

多Agent架构中的**典型角色划分**包括：

*   **顶层协调Agent**：作为系统入口，接收用户查询并进行任务分析和规划。它了解整个系统的能力分布，负责将复杂查询分解为子任务并分配给合适的专业Agent。
*   **领域Agent**：每个Agent专门负责某一类文档或特定领域的数据源。例如，企业环境中可能有财务Agent（处理财报数据）、产品Agent（管理产品文档）和客户Agent（处理CRM数据）等。这些Agent内部可以集成多种RAG工具，如向量检索、SQL查询等，根据子任务特点选择最佳工具。
*   **工具Agent**：管理外部工具和API的访问，如网络搜索Agent、计算工具Agent等。当领域Agent需要额外能力时，可以通过顶层Agent协调调用这些工具Agent。

多Agent架构的**核心优势**在于其**卓越的可扩展性**和**专业分工**。新增数据源或工具时，只需添加相应的专业Agent而无需修改核心架构。同时，每个Agent可以专注于特定领域，通过精细化优化提供更专业的服务。腾讯云开发者社区的一篇文章中提到，这种架构"既能准确地解析不同类型的文件，还能利用Agent强大的规划和推理能力，面对用户Query选择最合适的路由策略和处理方法，大幅提升系统面对海量文档、跨文档检索、全局提炼与总结等问题时的处理能力"。

在通信机制的设计上，有中心化通信VS去中心化通信。

中心化通信（Centralized communication），在中心化通信中，存在一个中心节点，所有智能体都直接与这个中心节点进行通信。中心节点负责协调和集成所有智能体的信息，然后向各个智能体发出指令或反馈。中心节点可以全局地了解所有智能体的状态和信息，有助于做出全局最优的决策。但是容易出现单点故障，中心节点的故障可能导致整个系统的通信瘫痪。

去中心化通信（Decentralized communication），在去中心化通信中，智能体之间直接进行通信，没有中心节点，每个智能体只与它的邻居或部分智能体交换信息。有单点故障的风险，系统的鲁棒性更强，同时可扩展性极强。但是没有全局信息，难以做出全局最优的决策。

关于Multi Agent系统的设计，又是另外一个复杂的 Topic 了，不做赘述。

四、Challenges and Future Directions in RAG

**4.1 统一多模态大模型**

通过直接多模态向量化，RAG系统能更自然地处理复杂现实数据，而不仅限于文本世界。实际选型时需权衡计算成本、领域适配性和实时性需求。如GPT-4V、Gemini 1.5的端到端多模态理解。目前的Multimodal 还是处于发展期，远没有成熟，问题包括但不限于：

**1\. 多模态表示与检索的挑战**

*   **跨模态知识表示**：不同模态的数据（如文本、图像、音频）需要转换为统一的向量表示，以便进行跨模态的高效检索。然而，如何设计一个能够准确捕捉不同模态语义信息的统一表示是一个关键问题。例如，CLIP模型通过学习图像和文本的对齐表示实现了跨模态检索，但其在复杂场景下的泛化能力仍有待提升。  
*   **检索效率与准确性**：在大规模多模态数据中进行高效检索是一个挑战。向量检索方法虽然能够快速找到相似的模态数据，但可能难以区分语义上的细微差别，导致检索结果不准确。此外，多模态数据的稀疏性也增加了检索难度，尤其是在信息分散于多个文档时。
*   **数据对齐问题**：不同模态的数据在语义上需要对齐，例如一段文本描述了一张图片的内容，如何将这两者在语义上进行有效对齐是一个关键挑战。
*   **生成内容的质量**：多模态RAG系统需要确保生成内容的准确性和一致性。由于检索到的知识片段可能来自不同的模态和文档，模型需要有效地整合这些信息，比如我们之前讲的如何对多路、多模态Reranker就是一个挑战。

2\. 效率与性能

*   **计算资源需求**：多模态RAG系统需要处理大量的数据和复杂的模型计算，对计算资源的需求较高。特别是在实时应用中，如何优化检索和生成过程以减少延迟是一个关键问题。
*   **模型训练与微调**：为了提升多模态RAG系统的性能，需要对模型进行微调。然而，不同模态数据的训练难度不同，且微调过程需要大量的标注数据。
*   **鲁棒性与可解释性**：相比于传统的搜索系统，多模态RAG系统在复杂场景下的鲁棒性不足，当然，这不只是RAG的问题。

**4.2 安全 (TrustRAG)**

检索外部知识库可能引入敏感信息（如专利、隐私数据），RAG模型可能被滥用于生成虚假信息或恶意内容等等，但是我们这里主要讲恶意攻击和注入。这篇Paper 《TrustRAG: Enhancing Robustness and Trustworthiness in RAG》，提出了一种两阶段防御机制：首先，利用 K-means 聚类识别检索文档中的潜在攻击模式，基于语义嵌入有效隔离可疑内容；其次，通过余弦相似度和 ROUGE 指标检测恶意文档，并通过自我评估过程解决模型内部知识与外部信息之间的差异。

![](https://mmbiz.qpic.cn/mmbiz_png/Z6bicxIx5naKb86ubrNiaORezhgBBahiaZkSL6Kn7yictz9kpMEOYagsbGNR3BVjZLibibfibCbMCy71Gy7pqicpOibvYtA/640?wx_fmt=png&from=appmsg)

TrustRAG 的主要工作流：

*   **识别恶意文档**：利用 K-means 聚类分析文档的语义嵌入分布，识别出潜在的恶意文档簇。
*   **过滤恶意内容**：根据嵌入分布过滤掉恶意文档，保留干净文档。
*   **提取内部知识**：利用 LLM 的内部知识生成准确的推理结果。
*   **解决冲突**：通过整合内部和外部知识，解决知识冲突，去除不相关或矛盾的文档。
*   **生成可靠答案**：基于精炼后的文档生成最终的可靠回答

其实关于安全这一块，是一个非常重要的课题，可以确定的是，LLM一定会超过单个碳基生命的智慧。如何做好安全防护，一定是使用者首先要关注的，比如Deep Mind就有一个Red Team团队专门研究大模型安全的课题，这里我们不做过多介绍，后续可以单独作为一个研究的 Topic。

## Reference

*   Advanced AI and Retrieval-Augmented Generation for Code Development in High-Performance Computing | NVIDIA Technical Blog：https://developer.nvidia.com/blog/advanced-ai-and-retrieval-augmented-generation-for-code-development-in-high-performance-computing/
*   LLM as HPC Expert: Extending RAG Architecture for HPC Data：https://arxiv.org/abs/2501.14733
*   Blended RAG: Improving RAG (Retriever-Augmented Generation) Accuracy with Semantic Search and Hybrid Query-Based Retrievers：https://arxiv.org/abs/2404.07220
*   ColPali: Efficient Document Retrieval with Vision Language Models：https://arxiv.org/abs/2407.01449
*   RAG-Reward: Optimizing RAG with Reward Modeling and RLHF：https://arxiv.org/abs/2501.13264
*   GFM-RAG: Graph Foundation Model for Retrieval Augmented Generation：https://arxiv.org/abs/2502.01113
*   TrustRAG: Enhancing Robustness and Trustworthiness in RAG：https://arxiv.org/abs/2501.00879
*   Chain-of-Retrieval Augmented Generation：https://arxiv.org/abs/2501.14342
*   VideoRAG: Retrieval-Augmented Generation over Video Corpus：https://arxiv.org/abs/2501.05874
*   The Power of Noise: Redefining Retrieval for RAG Systems：https://arxiv.org/abs/2401.14887
*   Don’t Forget to Connect! Improving RAG with Graph-based Reranking：https://arxiv.org/abs/2405.18414
*   Agentic Retrieval-Augmented Generation: A Survey on Agentic RAG：https://arxiv.org/abs/2501.09136
*   Improving Retrieval-Augmented Generation through Multi-Agent Reinforcement Learning：https://arxiv.org/abs/2501.15228
*   Dense Passage Retrieval for Open-Domain Question Answering：https://arxiv.org/abs/2004.04906
*   DeepRAG: Thinking to Retrieval Step by Step for Large Language Models：https://arxiv.org/abs/2502.01142
*   Application of Multi-Way Recall Fusion Reranking Based on Tensor and ColBERT in RAG：https://ieeexplore.ieee.org/document/10761558
*   Multimodal Embedding Models | Weaviate：https://weaviate.io/blog/multimodal-models
*   R1/o1的风又吹到了RAG，微软CoRAG高达93%的复杂推理效果~：https://mp.weixin.qq.com/s/9Pu6wijQ9BLbH6nrP6YBTA
*   The Rise and Evolution of RAG in 2024 A Year in Review | RAGFlow：https://ragflow.io/blog/the-rise-and-evolution-of-rag-in-2024-a-year-in-review
*   Advanced RAG Techniques | Weaviate：https://weaviate.io/blog/advanced-rag
*   Jina-ColBERT-v2: A General-Purpose Multilingual Late Interaction Retriever：https://arxiv.org/pdf/2408.16672
*   LLMs的推理之路：从链式思维到强化学习，迈向大型推理模型：https://mp.weixin.qq.com/s/tesV5lAsLXVBdP2WqUCrmw
*   From RAG to Memory: Non-Parametric Continual Learning for Large Language Models：https://arxiv.org/pdf/2502.14802
*   RAG vs. GraphRAG: A Systematic Evaluation and Key Insights：https://arxiv.org/pdf/2502.11371
*   ColBERT: Efficient and Effective Passage Search via Contextualized Late Interaction over BERT：https://arxiv.org/abs/2004.12832
*   SafeRAG: Benchmarking Security in Retrieval-Augmented Generation of Large Language Model：https://arxiv.org/pdf/2501.18636

**实时与AI智能体进行语音通话**

  

AI实时语音互动是一种旨在帮助企业快速构建AI与用户之间的语音通话应用的解决方案。用户只需通过白屏化的界面操作，即可快速构建一个专属的AI智能体，并通过视频云ARTC网络与终端用户进行实时交互。

  

点击阅读原文查看详情。

>参考链接：[https://mp.weixin.qq.com/s/pe9r6OSCI6l5ocUw1LHmMw](https://mp.weixin.qq.com/s/pe9r6OSCI6l5ocUw1LHmMw)，整理：沉默王二
