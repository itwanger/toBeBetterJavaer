---
title: 腾讯面试官：“为什么 Claude Code 不用 RAG 检索代码，而是 grep？”我：“因为...我也不知道”，他沉默了。
shortTitle: CC为什么用grep不用RAG
description: 从原理讲透 Claude Code 为什么用 grep 而不是 RAG 检索代码，涵盖 Anthropic 官方回答、亚马逊论文验证、Cursor 反面论证。
tag:
  - Agent
  - RAG
category:
  - AI
author: 沉默王二
date: 2026-05-20
---

大家好，我是二哥呀。

有没有想过？

Claude Code 的代码搜得又快又准，到底是怎么实现的？

![](https://files.mdnice.com/user/3903/2c29849f-6e4b-48bd-b38c-2fc937066e54.jpg)

我花了一早上时间，认真研究了会，翻了翻 Anthropic 首席工程师 Boris Cherny 的播客、亚马逊科学团队发的论文、Cursor 官方博客的论证、Claude Code 源码，把这件事从头到尾捋了一遍。

>系好安全带，我们粗粗发～

## 01、Claude Code 到底怎么查找代码的？

先回答最基本的问题：Claude Code 在分析代码仓库时，用的是什么工具？

答案很简单——三个工具：**Glob、Grep、Read**。

是不是很意外，是不是很惊喜？


![](https://files.mdnice.com/user/3903/113152fd-64b8-456c-9f4a-77a1e6be0e26.jpg)


- Glob 负责按文件名模式匹配，比如 `**/*.java` 找出所有 Java 文件。返回的结果按修改时间排序。
- Grep 负责在文件内搜索，底层用的是 ripgrep（一个 Rust 写的高性能搜索工具）。比如我们想找哪个文件里用了 `@Transactional` 注解，Grep 很快就能返回结果。
- Read 负责读取具体文件的内容。可以读整个文件，也可以指定行号范围只读一部分。支持图片、PDF、Jupyter Notebook，覆盖面很广。

没有向量数据库，没有 Embedding 模型，没有索引构建过程，没有 Chunk 分片策略。

Claude Code 拿到一个任务之后，先用 Glob 看看目录结构，再用 Grep 搜关键词，最后用 Read 读取相关文件。


![](https://files.mdnice.com/user/3903/01807c1b-ffb6-4769-ba64-369e6d25fce1.jpg)


Anthropic 内部给这种方式起了个名字，叫 **Agentic Search**（智能体搜索）。


![](https://files.mdnice.com/user/3903/72de1839-e351-4463-8de7-fa4b814f118c.png)


核心思路是：

不预先构建任何索引，而是让 Agent 在执行任务的过程中，根据当前的上下文和目标，动态决定搜什么、怎么搜、搜到之后下一步干什么。

这三个工具还有一个关键属性：它们都是 `isConcurrencySafe = true` 的只读工具，可以并行执行。Claude Code 经常同时发起多个 Grep 搜索，一次性扫描多个关键词，效率拉满。

## 02、RAG 检索代码的五个问题

要理解 Claude Code 为什么不用 RAG，得先搞清楚 RAG 用在代码搜索上到底有什么问题。

### 第一：代码不是自然语言，语义相似度在代码这块不管用。

RAG 的核心逻辑是把文本转成向量，然后用余弦相似度找“语义最接近”的内容。

![](https://cdn.tobebetterjavaer.com/paicoding/527d52f603a6cd42e4f327e80a8f3156.png)

这个逻辑在自然语言场景下很好使，比如“如何处理用户认证”和“用户登录流程”语义上确实接近。

但代码不一样。

`createD1HttpClient` 和 `buildD1HttpClient` 语义上很接近，但在代码仓库里它们可能是两个完全不同的函数。我们要找的是那个精确的函数名，不是“差不多的”函数名。

反过来，`handleAuth` 和 `validateJwtToken` 语义上看起来不太相关，但后者可能就是前者内部调用的关键逻辑。向量相似度不会帮我找到这种调用关系，但一个简单的 grep 搜索 `validateJwtToken` 就能精确定位。

代码世界里，精确匹配比语义匹配重要得多。


![](https://files.mdnice.com/user/3903/401176b8-8526-4e03-ab54-ad0b97e60a4c.jpg)


一个变量名、一个方法签名、一个 import 路径，要么完全匹配，要么就是找错了。

没有“大概对”这回事。


### 第二：索引同步成本很高

写代码的小伙伴都知道，代码是不断变化的。

刚改了一个方法名，RAG 的索引里还是旧的名字。新增了一个文件，索引里没有。删了一个类，索引里还在。

要保持索引和代码的实时同步，得做增量更新、文件监听、冲突处理。这套东西做起来的复杂度，比 RAG 本身还高。

而 grep 天然不存在这个问题，它搜索的永远是磁盘上此时此刻的文件内容。代码改了，grep 的结果就跟着变了，不需要任何同步机制。

### 第三：安全和隐私

RAG 需要一个 Embedding 模型来生成向量。

这个模型要么跑在本地（消耗计算资源），要么调用远程 API（代码内容要发到外部服务器）。

![](https://cdn.paicoding.com/paicoding/04f191f1fc08dbdc9b26841789c5728b.jpg)

代码库是“非常敏感”的，我们肯定不愿意把代码发送到任何第三方服务去生成 Embedding。本地部署 Embedding，又需要很高的算力成本。

grep 直接在本地磁盘上搜索。从安全的角度看，这个优势是碾压级的。


![](https://files.mdnice.com/user/3903/78573d1f-92ec-4318-aee0-b2a55512390b.jpg)


## 03、ripgrep 凭什么这么猛

说到 grep，大家可能第一反应是 Linux 上的 GNU grep。

Claude Code 用的不是这个，是 ripgrep，一个用 Rust 写的现代搜索工具。


![](https://files.mdnice.com/user/3903/5cbb56ae-a8dc-4d5b-9e0f-287c72e9b684.jpg)


ripgrep 的作者叫 Andrew Gallant，他在 Rust 的正则表达式引擎上花了两年半的时间。这个引擎用了 SIMD 指令集加速，简单说就是用 CPU 的矢量计算单元来做文本匹配，搜索速度能逼近内存带宽的极限。

一般来说，在一个几万个文件的中型代码仓库里，ripgrep 跑一次全文搜索大概需要 200 毫秒。

而同样的搜索任务，如果走 RAG 流程：

先把查询文本发给 Embedding 模型生成向量（一次网络往返），再去向量数据库里做 KNN 搜索（又一次网络往返），拿到结果后可能还要做 Rerank（又一次模型调用）。整个链路下来至少 8 个步骤、四五个服务。

![](https://cdn.paicoding.com/paicoding/0a494256f19f42765191cb3bb94d252d.jpg)

ripgrep 还有几个对 Agent 特别友好的特性。

它默认递归搜索整个目录，自动跳过 `.gitignore` 里列出的文件和二进制文件，输出结果自带文件名和行号。这些恰好就是 Agent 在分析代码时最需要的信息。

Claude Code 的 Grep 工具在 ripgrep 之上还封装了一层保护机制。默认最多返回 250 行（通过 `head_limit` 控制），防止一次搜索返回几千行代码把上下文窗口撑爆。如果 ripgrep 超时了但有部分结果，它会把最后一行不完整的结果丢掉，返回已经拿到的部分。如果完全没有结果，才会抛出超时错误。

这种“尽力返回结果”的设计哲学，和 RAG 的“要么成功要么失败”形成了鲜明对比。


![](https://files.mdnice.com/user/3903/8bd87158-49bf-4abe-823a-4b8c5b42f57f.png)


## 04、Anthropic 官方怎么说

这一段的信息来源是 Boris Cherny（Claude Code 首席工程师）2025 年 5 月 7 日在 Latent Space 播客上的原话。这期节目的另一位嘉宾是 Catherine Wu，也是 Claude Code 的核心工程师。

Boris 说了这样一句：**Claude Code 早期版本确实用过 RAG。**

他们用的是 Voyage 的 Embedding 模型，做了一套本地向量索引。效果“还行”。但后来他们试了另一种方式，就是我们前面说的 Glob + Grep + Read 的 Agentic Search。结果发现这种方式在各项指标上全面碾压 RAG。

Boris 原话说的是 “outperformed everything, by a lot”（全面超越，而且差距很大）。


![](https://files.mdnice.com/user/3903/fd6c92e3-4ddd-4345-aefd-3fab7dd7285c.jpg)

他坦承这个判断主要基于“内部 vibes”，也就是直觉和体感，加上一些内部 benchmark 的数据。

Boris 给出了放弃 RAG 的核心原因。

第一是性能。Agentic Search 的搜索质量更高。这里的“质量”不只是准确率，还包括搜索结果的可用性。grep 返回的是精确的代码行和文件路径，Agent 拿到就能直接用；RAG 返回的是一堆“相关”的代码片段，Agent 还得二次理解和筛选。

第二是简洁。RAG 需要维护索引的同步、处理增量更新、管理向量数据库的生命周期。Agentic Search 不需要任何预处理，打开一个代码仓库，直接开始搜，没有“初始化索引”这个步骤。


## 05、亚马逊论文的实锤

2025 年 12 月，亚马逊科学团队发表了一篇论文，题目：**“Keyword search is all you need: Achieving RAG-Level Performance without vector databases using agentic tool use”**（关键词搜索就够了：用 Agent 工具调用达到 RAG 级别的性能，不需要向量数据库）。

![](https://files.mdnice.com/user/3903/66eeb798-bb9b-408e-8c6e-30348a5ca12e.png)

他们的研究方法是：搭建一个标准的 RAG 系统（向量数据库 + Embedding + 检索 + 生成），和一个只有关键词搜索工具的 Agent 系统，然后在相同的问答任务上对比两者的表现。


![](https://files.mdnice.com/user/3903/6e188a53-a96c-4683-9034-73f87aa97413.png)


结论是：**基于关键词搜索的 Agent 系统可以达到传统 RAG 系统 90% 以上的性能指标。**

论文还有一个关键发现：对于代码这种符号精确的结构化文本，关键词搜索的表现实际上比语义检索还要好。因为代码的命名约定通常是一致的，函数名、变量名、类名本身就携带了足够的语义信息，不需要额外的语义理解。


## 06、Cursor 的反面论证

说到这里，可能有小伙伴要问了：如果 grep 这么好，为什么 Cursor 还在用向量搜索？

这是个好问题。

Cursor 训练了自己的 Embedding 模型，建了一套完整的索引管道，用 Turbopuffer 做向量数据库。他们的 A/B 测试结果显示：加入语义搜索后，Agent 的准确率提升了不少。



![](https://files.mdnice.com/user/3903/4e1f190a-2ef8-4c0b-9bb5-d6651105daba.jpg)


在超过 1000 个文件的大型代码仓库中，提升效果更加明显，代码留存率（Agent 写的代码被用户保留的比例）增加了 2.6%。


![](https://files.mdnice.com/user/3903/01e484ec-189f-4b1d-afcb-04962b105a63.png)


几个关键区别。

第一，Cursor 是 IDE 级别的产品，用户在 IDE 里工作时，代码仓库是相对稳定的，索引同步的压力没那么大。而 Claude Code 是一个命令行工具，用户可能随时切换到不同的代码仓库。

第二，Cursor 用的是混合检索，grep 和向量搜索都用，而不是只用向量搜索。他们的结论是“两者配合使用效果最好”，而不是“向量搜索比 grep 好”。这反过来证明了 grep 是不可或缺的基础能力。


## 07、LLM 就是最好的 Reranker

在 Agentic Search 的架构里，LLM 本身就充当了 Reranker 的角色。

传统 RAG 的工作流是：Embedding → 向量检索 → Rerank → 生成。

其中 Rerank 这一步是为了弥补向量检索精度不够的问题，向量搜索返回的“Top K”结果里经常混进不相关的内容，需要一个更精细的模型来重新排序。

但在 Claude Code 的架构里，grep 返回的结果是确定性的，搜 `createD1HttpClient` 就只会返回包含这个精确字符串的代码行。Agent 拿到这些精确的搜索结果后，用 LLM 自己的推理能力来判断哪些结果是有用的、接下来应该读哪个文件、还需要搜什么关键词。

这种模式下，LLM 做的不是简单的 Rerank，而是**理解 + 决策 + 行动**。

它会根据第一轮搜索的结果调整后续的搜索策略，比如发现一个关键函数调用后，顺藤摸瓜去搜被调用的函数定义。这种多轮迭代的搜索能力，是 RAG 的“一次检索”模式做不到的。


![](https://files.mdnice.com/user/3903/c401aadc-b09a-4123-b8e8-2323953bfe3c.jpg)


RAG 像是去图书馆让管理员帮忙找书，管理员根据描述找了几本“可能相关”的放到桌上，至于对不对，得自己翻了才知道。

而 Agentic Search 像是自己去图书馆，先看楼层指引（Glob 看目录结构），再去对应楼层的书架上找（Grep 搜内容），找到了翻开看看（Read 读文件），不对就换个关键词再找。

## 09、简历怎么写

**项目名称**：PaiCLI 智能代码分析平台

**项目简介**：基于 Agentic Search 架构的代码分析工具，采用 grep + LLM 的方式替代传统 RAG 检索，实现对大型代码仓库的高效分析和理解。

**核心职责**：

- 基于 ripgrep 实现了代码级的全文检索引擎，支持正则表达式和 Glob 模式匹配，单次搜索耗时控制在 200ms 以内
- 设计了 Agent 多轮迭代搜索策略，通过 Glob→Grep→Read 的工具链实现代码上下文的逐步聚焦，搜索精确率达到 95% 以上
- 实现了搜索结果的智能截断机制（head_limit + partial results），将单次搜索的 token 消耗控制在 6K 以内，避免上下文溢出
