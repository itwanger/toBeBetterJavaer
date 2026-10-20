---
title: 在洛阳理工的两天开放式AI实训，聊聊派聪明RAG、PaiCLI与派简历
shortTitle: 洛阳理工AI实训开班稿
description: 面向洛阳理工学院同学的两天开放式AI实训开班文字稿，涵盖人生戒断期交流、飞书1095份简历归档数据、DeepSeek Harness与Codex演进、派聪明RAG与PaiCLI源码拆解，以及派简历一页PDF生成。
keywords: 派聪明RAG,PaiCLI,DeepSeek Harness,派简历,AI Agent实训
tag:
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-10-18
---

我们这两天的课，是一场完全开放、没有任何距离感的技术交流。大家在听课过程中有任何关于技术、关于找工作、关于人生规划的疑问，随时可以打断我。

先说一下我的成绩，不然你们可能提不起学习的兴趣。

我的笔名叫沉默王二，如果你们打开微信，搜【沉默王二】，可能会发现你有好友关注我的号，当然了，一个都没有的同学，可以举手我看一下。

![](https://cdn.paicoding.com/stutymore/luoyang-lit-ai-bootcamp-20261018113736.png)

应该说是整个洛阳，或者整个河南，非常头部的一位技术博主。当然了，放在全国，也是非常头部的。

另外，我可以给大家展示一下我这些年改过的简历，985、211 的也非常多，除了清华大学本科的没有辅导过，其余的都有。

![](https://cdn.paicoding.com/stutymore/luoyang-lit-ai-bootcamp-20261018113703.png)

拿到过互联网大厂 offer 的同学也是非常多，飞书多维表格里记载的，也都是一些私信发我的。

![](https://cdn.paicoding.com/stutymore/luoyang-lit-ai-bootcamp-20261018113925.png)

这两天我们要一起做的事情包括。

1、先给大家解疑，看看大家有什么问题，我都会一一回答，回答不了的，我会让 Gemini 回答大家，我的 Claude 上周刚被封，不然回答的质量会更高。

技术的问题、人生的问题、求职的问题，甚至谈恋爱的问题都可以。

2、我会把我星球的实战项目无私的分享给大家，不需要你们为我付费哈，包括 PaiCLI，一个类似 Claude Code 的终端 Agent，用 Java 做的，当然也有 Go、TypeScript、Python 版本。

![](https://cdn.paicoding.com/stutymore/luoyang-lit-ai-bootcamp-20261018114359.png)

包括派聪明 RAG，一个企业级知识库项目，这个不管是大厂还是小厂，都可以落地。

![](https://cdn.paicoding.com/stutymore/luoyang-lit-ai-bootcamp-20261018114422.png)

其他的项目，还有 JobClaw、PmHub、技术派、PaiFlow/PaiAgent 等等，大家有需要我也可以共享给大家。当然，我们重点只讲 PaiCLI 和派聪明，因为这俩项目都比较经典，也是 AI 时代最容易上手，最容易被面试官/HR 青睐的两个项目。

我还开源有二哥的 Java 进阶之路，在 GitHub 上 1.7完多 star，还有王二讲 Agent，飞书知识库一周就有 3000 多阅读，抖音短视频账号每个月也有 100 多万的播放。

![](https://cdn.paicoding.com/stutymore/luoyang-lit-ai-bootcamp-20261018115032.png)

![](https://cdn.paicoding.com/stutymore/luoyang-lit-ai-bootcamp-d88bc74ba9173d23a7c4171d94b3abd3.png)

第二天，我会带大家完成一份相当不错的求职简历，把这两个项目写到简历上，保证大家有一个可以投递的求职状态。

![](https://cdn.paicoding.com/stutymore/luoyang-lit-ai-bootcamp-20261018114625.png)

最后，和大家聊聊 AI Agent，这也是 AI 时代，无法避开的一个话题，张嘴闭嘴，或者以后不管你干什么，都可能会用得上，并且，如果你想拥有一个相对不错的工作，你需要掌握这些。

包括 DeepSeek、Gemini、OpenAI 等，我们都可以谈。

## 01、AI 的发展

大家平常都用哪个 AI 工具啊，不管是国产的还是海外的，我觉得至少得有一个趁手的。

DeepSeek Harness？

Codex？或者叫 ChatGPT？

Claude Code？

Gemini？

WorkBuddy？豆包工作？

## 02、派聪明企业级 RAG 知识库实战

实训的第一阶段，我们先来拆解派聪明（PaiSmart）企业级 RAG 知识库。很多同学听说过检索增强生成（RAG），以为就是把一篇文档切碎了算出向量存起来，用户提问的时候查询一下向量相似度再拼进提示词里。如果面试只讲到这一层，面试官追问大文件上传怎么防重、异步解析崩溃了怎么恢复、专业术语搜不出来怎么办，很容易就卡壳了。

文件入口处采用大文件分片上传机制，前端把文件按固定 5MB 大小切分成片上传，后端同时在三个地方记录分片进度，包括 Redis 位图（key 格式为 `upload:{userId}:{fileMd5}`）、MySQL 的分片信息表以及 MinIO 对象存储里的分片文件。等所有分片上传完毕，系统通过数据库的条件更新把状态从上传中改为合并中，调用 MinIO 将全部分片合并到 `merged/{fileMd5}` 路径下，合并状态更新成功后才清理临时分片。

![](https://cdn.paicoding.com/stutymore/luoyang-lit-ai-bootcamp-upload-swimlane-20261018120601-80b3f70d.png)

文件合并完成后，怎样保证后续的文档解析与向量化任务全部可靠送达？

派聪明在这里使用了本地消息表（Outbox）模式。系统在同一个数据库事务里将文件状态改为待处理，同时写入一条待发送记录；事务提交后由异步线程池投递到 Kafka，如果遇到线程池满或网络抖动，后台每 5 秒运行一次的定时任务会按指数退避策略自动扫描认领并补发。

Kafka 消费端拿到任务后，先通过数据库条件更新认领处理租约。随后消费线程从 MinIO 读取合并后的文件，先按文件 MD5 和上传者 ID 清理旧的索引数据，接着开始解析，其中 PDF 文档调用 LiteParse 解析以保留版面页码，其余 Word、Excel、Markdown 等调用 Apache Tika 解析并切分成文本块，每写入一批向量到 Elasticsearch 就回调一次数据库更新心跳时间。如果某个实例在向量化中途宕机导致心跳超过 600 秒未更新，每 60 秒运行一次的恢复任务会自动将其重新放回待处理队列。

```java
// 认领条件：状态不是处理中，或心跳为空，或心跳早于 600 秒前
// 认领成功后写入 processing_started_at 与 heartbeat_at 作为租约凭证
```

到了用户提问阶段，派聪明引入了 ReAct 循环，由大模型自主调用 `search_knowledge` 知识检索工具。每次检索时，系统先注入当前登录用户的组织标签与公开属性权限过滤，确保不同部门员工只能检索到自己权限范围内的文档；随后并行发起 Elasticsearch 的 BM25 关键词检索与 KNN 向量余弦相似度检索，将两路召回结果通过倒数排名融合算法（RRF）合并，再调用 `gte-rerank-v2` 模型重排序，经过分数阈值过滤后把命中的子分块扩展为包含完整上下文的父分块交给大模型。最终大模型通过 SSE 流式输出回答时，每一处结论都会附带形如 `(来源#编号: 文件名 | 第X页)` 的精确引用标记。

![](https://cdn.paicoding.com/stutymore/luoyang-lit-ai-bootcamp-hybrid-retrieval-20261018120932-21a60602.png)

## 03、PaiCLI 命令行 Agent 实战

实训的第二阶段，我会带大家从零手搓的命令行编程工具 PaiCLI。这是一个直接对标 Claude Code 的终端 Agent 项目，能让你看清一个能读代码、改文件、执行终端命令、连接浏览器的 Agent 在代码层面到底是怎么组织起来的。

整个程序提供了三条核心执行路径，分别是默认的 ReAct 循环路径、通过 `/plan` 命令或 Shift+Tab 切换进入的先规划后执行路径（Plan-and-Execute），以及通过 `/team` 命令触发的多 Agent 团队协作路径（Multi-Agent，包含负责拆解任务的 Planner、负责并行执行的 Worker 和负责审查结果的 Reviewer 三种角色）。

```java
// 每次调用模型前依次执行：注入待发的 LSP 诊断 -> 按需压缩历史上下文 -> 检查预算与停滞状态
// 工具返回结果统一包裹为 untrusted-data 边界后再送入下一轮思考
```

这里面可以讲的内容包括：https://t.zsxq.com/N8Z8o


## 04、用派简历生成一页直投简历

### 派聪明与 PaiCLI 简历包装

**项目名称**：派聪明（PaiSmart）企业级多源异构 RAG 知识库

**项目简介**：面向企业内部私密文档管理与精准问答场景的检索增强生成系统，涵盖大文件分片上传、多格式文档异步解析、双路混合检索、重排序与带页码引用的流式问答。

**技术栈**：Spring Boot 3、Elasticsearch、Kafka、Redis、MinIO、MySQL、Apache Tika、SSE

**核心职责**：

- 按固定 5MB 切分前端上传文件，联合 Redis 位图（48 小时过期）、MySQL 分片表唯一键与 MinIO 对象状态三处校验分片完整性，Redis 缓存缺失时自动从数据库回填，并通过数据库条件更新完成防重合并。
- 在文件合并同一事务内写入本地消息表，事务提交后异步投递 Kafka，配合每 5 秒一轮、封顶 300 秒的指数退避定时补发；消费端采用 600 秒租约认领与每批向量化心跳续期机制，结合每 60 秒一次的超时扫描任务自动恢复中断任务（最多重试 3 次）。
- 基于文件扩展名白名单校验 22 种文档格式，PDF 文档调用 LiteParse 提取并保留页码，其余 21 种格式调用 Apache Tika 解析切块；重建或覆盖索引时按文件 MD5 与上传者 ID 精确清理旧向量数据。
- 在检索阶段注入用户组织标签与公开属性过滤，并行执行 Elasticsearch 的 BM25 关键词检索与 KNN 向量检索，经 RRF 算法融合与 `gte-rerank-v2` 模型重排序后，按阈值过滤并扩展为完整父分块上下文。
- 支持最多 4 轮、8 次工具调用的 ReAct 问答循环，大模型通过 SSE 流式输出回答并自动附带文件名与页码引用标记，引用映射同步持久化至 MySQL 与 Redis。

---

**项目名称**：PaiCLI 终端自主编程 Agent

**项目简介**：对标 Claude Code 与 Codex 的命令行 Agent 工具，支持 ReAct、Plan-and-Execute 与 Multi-Agent 团队协作三条执行路径，具备文件编辑、代码检索、终端执行、MCP 协议扩展与浏览器自动化能力。

**技术栈**：Java 21、DeepSeek API、MCP 协议（stdio / Streamable HTTP）、CompletableFuture、Git 快照、JLine / Lanterna

**核心职责**：

- 构建 ReAct 默认循环、`/plan` 规划执行与 `/team` 多角色团队（Planner、Worker、Reviewer）三条执行路径，底层复用同一套工具注册表、长期记忆管理器、回合快照服务与对话账本，并支持命令行交互、微信接入与 HTTP 运行时接口。
- 将系统提示词按稳定度从高到低划分为基础策略、性格、模式、审批、上下文规范、技能索引、运行时日期及动态项目记忆共 9 层依次拼接，并对 18 个内置工具定义按名称排序发送，最大化提升大模型前缀缓存命中率。
- 基于标准输入输出与流式 HTTP 手写 MCP 客户端协议，实现外部工具动态挂载；设计渐进式 Skill 加载机制，提示词仅保留技能摘要，在模型调用 `load_skill` 工具时同轮注入完整指令正文，大幅节省上下文窗口开销。
- 实现失控提醒守卫与 5 轮停滞检测机制，当模型连续 3 步重复相同工具参数或连续 3 步命中 8 类正则错误时自动注入换思路提醒；当连续 5 轮工具调用签名完全相同时强制中止工具执行，仅允许一次无工具收尾调用如实汇报已完成与未完成事项。
- 根据用户每轮实际提交的原始输入构造当轮工具权限策略，将所有工具返回结果包裹在非信任数据边界标签内防止提示词注入，并结合 Git 快照服务支持任意回合代码变更的一键回滚。

![](https://cdn.paicoding.com/stutymore/luoyang-lit-ai-bootcamp-resume-layout-20261018120845-7f29d3bd.png)


