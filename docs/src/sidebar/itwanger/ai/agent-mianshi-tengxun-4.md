---
title: 鹅厂员工：羡慕隔壁组做 WorkBuddy 的，月活1000万+，已经成为AI办公的王牌，感觉晋升和年终奖肯定少不了（附Agent面试题）
shortTitle: 腾讯WorkBuddy Agent面试10问
description: 腾讯 WorkBuddy 千万月活背后的 Agent 工程化实力，附 10 道 Agent 面试题全解：容错恢复、LangGraph 工作流、异步工具调用、多模态 RAG、LoRA/DPO 微调、IVF 索引、游戏 NPC Agent。
keywords: Agent 面试题, 容错恢复, 多模态 RAG, LoRA 微调, IVF 索引
tag:
  - 面试
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-08-27
---

私下里和鹅厂的一个朋友交流，他说特别羡慕 WorkBuddy 团队，踩中了 Agent 时代的红利。

事实也的确如此。

刚看到花叔整理的一份国内办公类产品排行榜，WorkBuddy 竟然已经是千万级别的 MAU（月活）了。不知道大家意不意外，反正这是我完全没想到的。

![](https://cdn.paicoding.com/stutymore/sucai-20260827105336.png)

老汤分享的【关于腾讯慢了】的内容里也提到，从 CodeBuddy 演化出来的 WorkBuddy，上线短短三个月，就迭代了四十多个版本，算是接住了逐渐衰减的龙虾热。

其中一段话我觉得特别值得分享给大家共勉下。

>过去做产品，往往要先写文档、评审、排期，再进入开发；而 WorkBuddy 团队是先让 AI 把东西做出来，大家围着一个能跑的原型看效果、提意见、再调整。

其实AI时代，我们人的学习方式也要跟着改变。

以前是思想→语言→行动。

现在是行动→语言→思想。

反着来了。

因为 AI 带来的最大便利，就是我们可以快速做出产品原型，然后再去迭代升级。

就像我这周，就用各种 Agent 工具组合在一起（包括 Codex、Claude Code、DSH、WorkBuddy 等等），迭代出来了两个产品。

一个是 Agent 八股：`https://javabetter.cn/ai/video/`，按 Agent 基础、上下文与记忆、Harness、RAG、LLM、Claude Code、Codex、DeepSeek、Prompt、MCP、LangChain、Spring AI 和模型微调分类整理了 288 道高频面试题。

![](https://cdn.paicoding.com/stutymore/sucai-20260827110929.png)

另外一个是派简历：`https://resume.paicoding.com/`，让 AI 和你一起，写一份高质量简历。

![](https://cdn.paicoding.com/stutymore/sucai-20260827112558.png)

先做再说，先体验了再说，利用 AI 来提升我们的执行力。

当然了，讲良心话，WorkBuddy 的产品体验确实做得不错，读者群里也有不少同学吐露心声，Codex 蹬完了就用 WorkBuddy 稳稳接住。

![](https://cdn.paicoding.com/stutymore/sucai-20260827110022.png)

如果你是一位愿意相信努力、相信过程、相信一步一个脚印、相信自己能在 AI 时代分一杯羹的人，那接下来的硬核内容，希望你能认真读一读。

![](https://cdn.paicoding.com/stutymore/agent-mianshi-tengxun-4-20260827144014.png)

（全文比较肝，保证大家能学到很多很多，系好安全带，我们粗粗发～）

## content

### 01、Agent 执行过程中工具调用失败或任务中断，恢复机制怎么设计？

首先是重试。LLM API 调用失败的时候，先判断错误类型——HTTP 429（限流）、5xx（服务端错误）、连接超时、流式传输中断，这些属于临时性故障，可以重试。参数格式错误这类不属于临时性故障，直接返回给模型，让模型自己决定下一步怎么办。

![](https://cdn.paicoding.com/stutymore/agent-mianshi-tengxun-4-20260827125200-a77d2e1d.png)

“重试策略记得用指数退避加随机抖动。加随机抖动是为了防止多个请求同时重试把服务端打崩。当然了，如果服务端返回了 Retry-After 头，按它说的时间等。”

“工具执行失败的处理方式不一样。错误信息原样返回给 LLM，让模型自己判断要不要换个参数、换个工具、还是直接告诉用户出了什么问题。”

对于状态恢复，后台任务可以用 SQLite 持久化。重启之后，扫一遍所有状态为“执行中”的任务，重新执行。

![](https://cdn.paicoding.com/stutymore/agent-mianshi-tengxun-4-20260827125201-ee90aeda.png)

最后是快照回滚。每一轮对话开始前，对工作目录做一次 Git 快照。Agent 改了文件，如果发现改错了，可以回滚到之前的任意状态。

#### 状态保存的粒度怎么选？

“按轮次保存。”

![](https://cdn.paicoding.com/stutymore/agent-mianshi-tengxun-4-20260827125201-b5da6c27.png)

用户可以精确回滚到出问题的那一轮；频率又不高，开销可控。

### 02、如果 Agent 分析出的故障根因存在错误，怎么重新触发诊断？

PaiAgent 的工作流引擎在每个节点执行完之后都会保存一份快照。下游环节发现之前分析有问题，可以从快照恢复之前节点的状态，然后重新执行。

![](https://cdn.paicoding.com/stutymore/agent-mianshi-tengxun-4-20260827125202-1ae1665d.png)

每次重新执行，快照里的重试计数记得加一。比如最多重试 3 次，防止同一个节点反复重试。

#### 在 LangGraph 工作流中，节点跳转条件和边界判断怎么设计？

LangGraph 用的是状态图来定义工作流的。节点是处理单元，边是节点之间的连接。

普通边是固定跳转。A 执行完一定跳到 B。条件边是动态路由，A 执行完根据输出结果里的某个字段做判断，决定跳到 B 还是 C 还是 D。

![](https://cdn.paicoding.com/stutymore/agent-mianshi-tengxun-4-20260827125205-ad4ee967.png)

“比如一个故障诊断工作流，诊断节点输出一个严重等级字段，条件边判断：等于 P0 走紧急处理，等于 P1 走常规修复，字段为空走人工审核。”

没被选中的分支上的所有下游节点会被递归标记为“跳过”。

### 03、ReAct Agent 调外部工具时服务启动慢，同步调用还是异步调用？

ReAct（Reasoning + Acting，推理加行动）的循环是：先想（Thought）→ 再行动（Action，比如调用工具）→ 拿到结果（Observation）→ 再想。正因为如此，模型做下一步决策时，依赖的是工具返回的结果。

![](https://cdn.paicoding.com/stutymore/agent-mianshi-tengxun-4-20260827125206-06a0f6ef.png)

“多个工具之间如果没有依赖关系，就可以并行。PaiCLI 用线程池做了并发执行，最多 4 个工具同时跑。并行执行完了之后，所有结果还是要同步送回 LLM。”

#### 异步方案的后台任务和结果回调怎么实现？

![](https://cdn.paicoding.com/stutymore/agent-mianshi-tengxun-4-20260827125207-3462a8f0.png)

第一步，把操作放进后台队列，然后立刻返回一个任务 ID。后台的工作线程会从队列里取出任务执行，并把状态持久化到 SQLite。

第二步，通过任务 ID 去查状态，如果任务还在跑就返回进度信息，跑完了就返回完整结果。

### 04、多模态 RAG 系统怎么设计？

首要解决的问题是把不同模态的内容放到同一个向量空间里做检索。

![](https://cdn.paicoding.com/stutymore/agent-mianshi-tengxun-4-20260827125207-136a1158.png)

“两种技术路线。”

“第一种是用原生多模态的 Embedding。所谓 Embedding，就是把文字、图片转成在同一空间里能算距离的向量。文本和图片共享同一个向量空间。”

第二种是模态转换。图片先用视觉模型生成文字描述，把描述当普通文本做 Embedding。

视频需要先按固定间隔抽取关键帧，然后把每一帧当做图片处理。音频部分转成文字。最后把关键帧的视觉特征和音频转写的文本一起入库，检索命中某一帧时返回对应的时间戳。

![](https://cdn.paicoding.com/stutymore/agent-mianshi-tengxun-4-20260827125208-74992183.png)

### 05、用 LLM 生成图片描述再做文本匹配检索，有什么问题？

![](https://cdn.paicoding.com/stutymore/agent-mianshi-tengxun-4-20260827125208-78651126.png)

自然语言在表达视觉信息时有天然的瓶颈，很难通过文本表达清楚所有的视觉信息。另外就是语义偏移。同一张图片，不同的 LLM，生成的描述可能差别很大，检索准确率比原生多模态 Embedding 会低不少。

### 06、RAG 系统的召回率 85% 怎么计算？测试集怎么构建？

“Recall@K = 检索结果命中的相关文档数 ÷ 该查询的全部相关文档数。”

举个例子。测试集里某条查询标注了 10 篇相关文档，检索返回 top-20 个结果，其中有 8 篇命中了标注。这条查询的 Recall@20 就是 8 ÷ 10 = 80%。把所有测试查询的召回率取平均，得到 85%，就是整体召回率 85%。

![](https://cdn.paicoding.com/stutymore/agent-mianshi-tengxun-4-20260827125209-70022899.png)

“K 的选择要和业务场景匹配。K 越大召回率越高，但送进 LLM 的无关内容也越多，生成质量可能反而下降。”

#### 测试集怎么构建？

![](https://cdn.paicoding.com/stutymore/agent-mianshi-tengxun-4-20260827125209-369b161e.png)

第一步，从真实用户的历史提问里抽样，按查询类型分层，保证测试集覆盖不同的检索难度。

第二步，人工标注所有相关的文档。

第三步，知识库有更新，测试集也要跟着更新。

### 07、介绍一下 LoRA 和 DPO 微调流程，训练数据是自己准备的吗？

LoRA 的思路是冻结原始模型的所有权重，在需要微调的层旁边加两个小矩阵做旁路。原始权重矩阵的维度是 d × d，LoRA 把更新量分解成两个矩阵 A（d × r）和 B（r × d），r 远小于 d，一般取 8 到 64。训练时只更新 A 和 B，参数量只占原始模型的很小一部分。

![](https://cdn.paicoding.com/stutymore/agent-mianshi-tengxun-4-20260827125210-07931539.png)

训练完之后，把 A × B 的结果加回原始权重矩阵，合并成一个完整模型，再部署。推理时和没做 LoRA 的模型结构一样，没有额外开销。

LoRA 是一种参数高效的微调手段，通常配合指令微调（SFT）用，教模型怎么做；DPO 是偏好优化算法，教模型哪个更好。

DPO（Direct Preference Optimization，直接偏好优化）的训练数据是偏好对，一个样本由三部分组成：同一个输入、一个更好的回答、一个更差的回答。DPO 直接用这些偏好对来优化模型的策略，不需要先训一个奖励模型再做强化学习。相比 RLHF，流程要简单很多。

![](https://cdn.paicoding.com/stutymore/agent-mianshi-tengxun-4-20260827125210-3c37e5bc.png)

#### 训练数据怎么准备？

用 LoRA 做指令微调，训练数据是指令-响应对。一条数据包含输入指令（“帮我检查这段代码的 bug”）和期望的输出（完整的检查结果）。来源通常是人工标注，或者让模型生成多个回答之后人工筛选最好的那个。

![](https://cdn.paicoding.com/stutymore/agent-mianshi-tengxun-4-20260827125211-aee04d18.png)

DPO 的数据就是偏好对。实际操作中，让模型对同一个输入生成多个回答，人工挑出最好的和最差的组成一条偏好对。

“质量比数量重要。好的数据一千条效果可能比差的数据一万条都好。”

### 08、向量数据库中的 IVF 索引原理是什么？nprobe 参数有什么影响？

IVF（Inverted File Index，倒排文件索引）的思路是分区检索，先把数据分成很多堆，查询的时候只在最可能的几堆里找。

建索引的时候，先用 K-Means 算法把所有向量聚成 N 个簇，每个簇有一个聚类中心。每个向量归入离它最近的簇。每个簇维护一个倒排列表，记录归入该簇的所有向量。查询的时候，算查询向量和所有聚类中心的距离，找到距离最近的 nprobe 个簇（nprobe 就是要搜索的簇的数量），只在这几个簇的倒排列表里做精确比对。

![](https://cdn.paicoding.com/stutymore/agent-mianshi-tengxun-4-20260827125211-9ff89e8e.png)

“和暴力搜索的区别就在这里——暴力搜索要和库里每一个向量比对，IVF 只搜 nprobe 个簇里的向量。如果总共 1000 个簇、nprobe 设 10，实际大约只搜了百分之一的数据。”

#### nprobe 对速度和准确率有什么影响？

nprobe 越大，搜索的簇越多，准确率越高，但速度越慢。nprobe 越小，速度越快，但可能漏掉相关向量——查询向量如果刚好落在两个簇的边界附近，离它最近的簇中心，未必是真正藏着最近邻向量的那个簇，nprobe 太小，只搜少数几个簇，就可能把真正相关的向量漏掉。

![](https://cdn.paicoding.com/stutymore/agent-mianshi-tengxun-4-20260827125212-c417aaf3.png)

极端情况下 nprobe 等于簇的总数，就退化成了暴力搜索。

在线场景对延迟敏感，nprobe 设小一点，牺牲一点准确率换速度。离线场景（比如评测、批量处理）不赶时间，nprobe 可以设大一些。

### 09、Agent 应用到游戏场景做 NPC 智能交互，有哪些落地场景？怎么设计？

“三个方向比较有价值。”

第一个是动态对话 NPC。传统 NPC 对话走的是预设的对话树，选 A 走 A 分支，选 B 走 B 分支。Agent 驱动的 NPC 可以更自由地对话。玩家说什么它都能接得住，回话也更容易基于当前剧情、玩家进度和 NPC 自身的人设生成。

![](https://cdn.paicoding.com/stutymore/agent-mianshi-tengxun-4-20260827125212-9f665231.png)

第二个是任务引导 NPC。Agent 可以根据玩家当前的装备、等级、已完成任务给出针对性的提示。

第三个是战术 AI 队友。组队副本里，AI 队友可以快速根据战场实况做决策，优先治疗谁、优先打哪个怪、什么时候用技能，会更灵活。

#### 怎么设计？

感知层负责把游戏状态翻译成 LLM 能理解的文本，包括玩家位置、周围环境、背包物品等。

![](https://cdn.paicoding.com/stutymore/agent-mianshi-tengxun-4-20260827125213-fcc452cc.png)

决策层负责设定 NPC 的人设，执行层负责把 LLM 的决策翻译成游戏引擎的 API 调用。


### 10、平时用 AI Coding 工具吗？公司限制国外大模型 API 怎么办？

“日常主力是 Claude Code 和 Codex。”

![](https://cdn.paicoding.com/stutymore/agent-mianshi-tengxun-4-20260827125213-7b379b9d.png)

“随着国产大模型能力的提升，以及 Agent 产品的升级迭代，目前已有的替代方案不少了。比如说 WorkBuddy、DSH、Qoder 都已经很不错了。”

## ending

其实 AI 时代最大的便利，我觉得就是，让所有的普通人都能被看到。

技术能力顶尖的人和技术能力一般的人之间的差距，在 AI 的帮助下被大幅缩小了。

所以，我认为这对于普通人来说，就是最好的机会。

只是需要多一点自信，多一点坚持。

扔一次石头没有激起水花，就多扔几次。

念念不忘，总有回响的。


