---
title: 蚂蚁员工：现在这些应届生，base开这么高，结果菜得不行，入职大半年了离了AI啥都不会干，怎么招的人，还自以为很厉害（附Agent面试题）
shortTitle: 蚂蚁RAG与Agent面试5问
description: 蚂蚁员工吐槽应届生离了 AI 不会写代码，围绕派聪明企业级 RAG 与问答 Agent 的 5 道面试题，深入拆解负向反馈修正与评测回归、ReAct 意图识别与强制检索白名单、单次多意图并行与分步调用、以及三阶段幻觉治理。
keywords:
  - RAG 面试题
  - Agent 意图识别
  - 大模型幻觉治理
  - 负向反馈
  - 派聪明
tag:
  - 面试
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-10-16
---

大家好，我是二哥呀。

刷到一位蚂蚁老哥的吐槽，火气还挺大。他说现在招进来的应届生 base 开得那么高，结果菜得不行，入职大半年了离了 AI 啥都不会干，还自以为很厉害。

![](https://cdn.paicoding.com/stutymore/paismart-agent-intent-hallucination-mianshi-20261016091136.png)

在团队里配合过就知道，现在用 Claude Code、Codex 写功能，十分钟就能提交一个大 PR，表面上看产出飞快。麻烦往往出线上故障排查的时候，不知道AI干了什么，也不知道AI怎么干的，人和AI之间的对齐就很花时间。

不过反过来说，应届生一上来就习惯用 AI 写代码，这件事本身顺应了时代的发展。工具就在手边，没必要为了证明基本功扎实，放着现成的 Agent 不用去手敲代码。

我现在已经不手敲代码了，代码开发的工作都交给了 Opus 5.5 和 GPT-6.1 Sol，只不过 Claude 昨天刚被办，今天还处在戒断反应的第一天，有点不习惯。

也不能说不习惯，就是很难受。

说说蚂蚁吧。这两年在 AI 方向的投入很大。底层有百灵大模型家族，包括万亿参数的 `Ling-2.5-1T`、深度思考模型 `Ring-2.5-1T` 和主打高效率的 `Ling-2.6-flash`；应用层有独立 App 形态的服务型 Agent 支小宝、全模态助手灵光，以及百宝箱和 AWorld 等智能体开发平台，深入到了智能风控、财富顾问、生活办事和医疗健康等核心业务。

![](https://cdn.paicoding.com/stutymore/paismart-agent-intent-hallucination-mianshi-01-20261016101736-0d1a08e0.png)

如果你想做金融方向的 Agent，我觉得接入 Ling-3.0-flash-Fin 模型就很适配，蚂蚁在通用模型上进行了金融领域的增强，重点涉及资料检索、证据核对、计算建模等。

灵光开出来的时候还是挺惊艳的，主打【生成一个交互界面】，但说老实话，我觉得这个场景的应用其实也有限，因为对于大多数人来说，去做个 APP 只能自嗨，没有实际的意义。

但 AI 的发展已经是必然，就看后面蚂蚁在这方面怎么发展吧。

接下来，继续上硬菜。

## content

### 01、挑一个你觉得比较好的项目，再介绍一下。

“拿派聪明来说吧，这是一个面向企业内部知识库的 RAG 问答 Agent。我负责文档上传解析、文本切分、向量化入库，以及在线问答时的混合检索、工具调用和离线评测。后端用 Spring Boot 3 加 Elasticsearch 8，文本向量化和重排序接的是阿里百炼的 `text-embedding-v4` 和 `gte-rerank-v2`，问答生成用 DeepSeek，异步文档处理用 Kafka，文件存储在 MinIO，会话状态和限流放在 Redis。”

![](https://cdn.paicoding.com/stutymore/paismart-agent-intent-hallucination-mianshi-02-20261016101855-eaab52be.png)

“一个文档从上传到能被检索，中间经过了这么几步。前端先把大文件按 5MB 切片上传到 MinIO，用 Redis 位图和 MySQL 分片表同时记录上传进度。所有分片上传完毕后，合并接口用带状态条件的 SQL 更新抢占合并权，调用 MinIO 服务端合并接口拼成完整文件，然后在同一个数据库事务里把文件状态改成待处理并写入本地消息表。事务提交后由后台线程把任务发送到 Kafka，发送失败用定时任务每 5 秒扫描补发，保证文件合并成功后一定能进入解析队列。”

“Kafka 消费者拿到任务后，先认领处理租约并清理该文件可能残留的旧分块，随后根据文件头判断格式。PDF 文档交给外部进程 LiteParse 按页解析并提取页码，其他格式交给 Apache Tika 流式读取。提取出的文本先按双换行分段，超长段落再按句末标点或 HanLP 分词切分成不超过 512 个字符的子块，相邻子块之间保留最多 100 个字符的整句重叠。子块先存入 MySQL，再按每批 10 条调用 `text-embedding-v4` 生成 2048 维向量，批量写入 Elasticsearch。消费者每写完一批向量就会刷新一次数据库心跳，万一进程崩溃，每分钟执行一次的恢复任务会把心跳超过 10 分钟的记录重新发回队列。”

![](https://cdn.paicoding.com/stutymore/paismart-agent-intent-hallucination-mianshi-03-20261016102208-cd6033f8.png)

“在线问答采用的是 Agent Loop，单次提问最多允许 4 轮推理、最多调用 8 次工具，整条请求受 120 秒总截止时间约束。大模型决定调用知识库检索工具后，系统在 Elasticsearch 里同时发起 BM25 关键词检索和 2048 维向量 KNN 检索，两路都带上当前用户的私有、公开和组织标签三级权限过滤，各自取前 150 条候选。两路结果先用 RRF 倒数排名融合（常数 k 取 60），取出前 50 条交给 `gte-rerank-v2` 做交叉编码重排序，过滤掉低于 0.1 分的结果后取前 5 条。为了防止 512 字符的小分块丢失主语或上下文，命中分块还会去 MySQL 取出前后相邻的 1 个分块，去重合并成最多 1500 个字符的父块交给大模型，最终生成带文件名和页码引用的回答。”

“为了量化检索和回答的质量，我还在项目里搭了一套包含 50 道题的离线评测集，覆盖单点事实、口语化改写、跨段落汇总、资料冲突、私有文档、跨文档干扰和无答案拒答 7 类场景。每次调整切块策略、重排序阈值或提示词，都会运行评测算出分块级 Recall@5、MRR、NDCG@5 以及大模型评委打分，同时抽样 10% 的题目和全部异常题目做人工复核，计算评委与人工判断的一致率。”

### 02、如果用户点了不满意，你们后面后续会有什么措施呢？

“处理措施包括立即生效的会话级修正，和后台异步推进的数据排查。”

“先说立即生效的部分。用户在前端页面点击不满意按钮，会调用反馈接口把评价等级 `bad`、不满意原因、会话 ID 和当次生成的唯一标识一起提交；如果用户直接在输入框里用文字批评了刚才的回答，大模型也会在 ReAct 循环里主动调用反馈记录工具。这两条入口最终都会以用户 ID 为键、当前毫秒时间戳为字段，把反馈记录写进 Redis 的 Hash 结构里。”

![](https://cdn.paicoding.com/stutymore/paismart-agent-intent-hallucination-mianshi-04-20261016102403-81c0d91f.png)

“这个用户在后续的对话里再次提问时，问答处理器会从 Redis 里读取该用户按时间倒序排列的最新 5 条反馈，拼成一段显式约束注入到提示词的 system 层，提醒大模型避免重复刚才被点踩的回答方式。比如用户刚才点踩的原因是回答太啰嗦或者漏掉了具体参数，下一轮对话模型就能直接看到这条警告并立刻调整输出风格。”

```java
// src/main/java/com/yizhaoqi/smartpai/service/ChatHandler.java:732
private String buildRecentFeedbackGuidance(String userId) {
    if (userId == null || userId.isBlank() || redisTemplate == null) {
        return "";
    }
    Map<Object, Object> entries = redisTemplate.opsForHash().entries("feedback:" + userId);
    if (entries == null || entries.isEmpty()) {
        return "";
    }
    List<String> recent = entries.entrySet().stream()
            .sorted((a, b) -> Long.compare(parseTimestamp(b.getKey()), parseTimestamp(a.getKey())))
            .limit(FEEDBACK_PROMPT_MAX_ITEMS)
            .map(e -> "- " + String.valueOf(e.getValue()))
            .toList();
    return "近期用户对回答的显式反馈如下，按时间倒序排列；当两条反馈要求相反时，以排在最前面的最新反馈为准（good 表示用户认可这类回答方式，bad 表示需要避免类似问题，但不得违背知识库优先与事实依据原则）：\n"
            + String.join("\n", recent);
}
```

“不过光往提示词里加提醒，只能解决回答语气和篇幅格式的问题。如果用户点不满意是因为知识库根本没检索到对应文档，或者检索到了错误的分块，怎么提醒大模型都没用。所以点不满意的记录同时还要落入数据库的负向反馈表，通过请求里携带的会话 ID 和生成 ID，去对话记录表里关联取出当次问答的三个关键现场数据，也就是用户的原始问题、模型的完整回答，以及 JSON 格式保存的分块引用映射。”

“拿到这三个数据之后，后台任务会自动定位问题出在哪一个阶段，打上对应的分类标签。定位清楚之后，高频出现或者具有代表性的点踩样本经过脱敏和人工编写参考答案，会补充进项目的 JSONL 离线评测集。后续无论是补充上传了缺失的业务文档、调整了重排序的分数阈值，还是修改了系统提示词，都要重新运行一遍包含这些点踩样本的评测集，确认原来点不满意的问题已经修复。”

#### 怎么区分用户点不满意是因为检索没找对，还是模型没答好？

“区分的依据都在对话表保存的分块引用映射字段里。派聪明每次调用检索工具，都会把返回结果的文件 MD5、文件名、页码、分块编号、命中的分块正文、重排序分数、原始分数以及检索模式完整序列化成 JSON 存进这一列。”

![](https://cdn.paicoding.com/stutymore/paismart-agent-intent-hallucination-mianshi-05-20261016102611-309ead10.png)

“排查时先看引用映射列表是不是空的，或者检索模式是不是降级成了只用关键词的纯文本模式。如果引用列表为空，说明检索阶段一条达到 0.1 分阈值的分块都没找到，问题出在知识库缺少对应文档，或者用户的口语化问法和文档用词差距太大，需要补文档或者优化查询词改写。”

“如果引用列表不为空，就要看引用的分块正文里到底有没有包含能回答用户问题的事实依据。我们会把用户的原始问题、引用映射里的父块文本和模型的实际回答一起交给评估模型做一次交叉比对。假如引用的 5 个分块里压根没有答案，比如都是同一份 PDF 里的无关章节，那就判定为检索召回或重排序阶段失准；反过来，假如引用的父块里明明写着准确的参数或流程，模型却漏答了核心条件或者自己编造了结论，那就明确归类为提示词约束不足或生成模型自身的问题。”

### 03、意图识别，它识别的一定准确吗？

“不可能百分百准确。不管是训练一个专门的小尺寸分类模型做前置路由，还是直接用大模型的 Function Calling 做工具选择，面对用户的口语化简写、省略主语的追问或者边界模糊的提问时，都会出现误判。”

“既然意图识别一定会有误差，架构设计上就要保证误判发生时可以补救。派聪明没有在最前面放一个独立的意图分类器，而是把意图识别直接做成 ReAct 循环里的工具选择，在工具注册表里定义了 4 个职责边界完全不重叠的工具，分别是搜索知识库文档的 `search_knowledge`、针对特定主题生成结构化总结的 `generate_summary`、记录用户满意或不满意评价的 `submit_feedback`，以及查询 MySQL 文档总数和 Elasticsearch 分块总数的 `knowledge_stats`。”

![](https://cdn.paicoding.com/stutymore/paismart-agent-intent-hallucination-mianshi-06-20261016102733-eb1eac79.png)

“不用独立前置分类器的原因很简单。如果前置分类器把一句本该查询知识库的业务问题误判成了普通闲聊，请求直接转给不带检索能力的对话分支，就失去了查询知识库的机会。放在 ReAct 循环里由大模型选工具，就算第一次没选准或者工具返回结果不够，模型在循环里还能根据观察到的结果重新调用。”

“把选择权交给大模型以后，最容易出现的意图识别失误是大模型过于自信。有些问题里包含常见的技术名词或通用流程，模型觉得自己预训练时见过，就不调用 `search_knowledge`，直接凭训练记忆作答，结果答出来的和企业内部规定完全对不上。为了堵住这个漏洞，派聪明在代码和提示词两层同时加了硬性约束。”

```java
// src/main/java/com/yizhaoqi/smartpai/service/ChatHandler.java:267
// 第一轮总是带工具：知识库优先，至少要检索一次；它的工具执行仍受"截止时间减最终回答预留"约束。
// 从第二轮起，剩余时间不够再来一轮工具调用就提前收尾
if (round > 1 && !hasTimeForToolRound()) {
    logger.info("问答剩余时间不足以再进行一轮工具调用，提前收尾: generationId={}, round={}, remainingMs={}",
            generationId, round, RequestDeadline.remaining().map(Duration::toMillis).orElse(-1L));
    break;
}

LlmProviderRouter.ReActTurn turn = streamReActTurnBlocking(
        userId, conversationId, generationId, messages, agentToolRegistry.getTools());
```

### 04、有没有存在用户就想一次性询问两个意图的情况？

“有，一种是跨工具的组合意图，比如用户说‘帮我查询一下派聪明的限流设计，顺便看看现在知识库里一共存了多少篇文档’，这同时触发了知识库检索和知识库统计两个工具；或者用户要求‘把知识库里关于分片上传的资料整理成一份结构化总结’，这需要先调用 `search_knowledge` 圈定材料，再调用 `generate_summary` 生成总结。另一种是同一个检索工具下的多子问题意图，比如用户一句话里同时问‘分片上传的单片大小是多少，还有重排序的分数阈值定在多少’，两个问题落在同一份或不同文档的不同章节里。”

![](https://cdn.paicoding.com/stutymore/paismart-agent-intent-hallucination-mianshi-07-20261016102904-7fff59d1.png)

“如果用户在一句话里放进了两个互不相关的子问题，大模型只合成一条长 `query` 去调用一次 `search_knowledge`，检索效果往往很差。因为两条子问题的关键词混在一起，BM25 和向量检索召回的前 5 条结果很容易被其中一个子问题霸占，另一个子问题的分块排在后面进不了前 5 名。所以在提示词和工具说明里，我们明确引导大模型遇到包含多个独立实体或多个子问题的复合提问时，拆分成多次独立的工具调用。”

“为了承接模型拆分出来的多个意图，派聪明的流式和非流式响应解析器都支持在单轮回复里解析多个工具调用决策。流式传输时，模型通过 SSE 分片返回 `tool_calls` 数组，累加器按数组下标 `index` 把每个工具的名称和 JSON 参数片段分别拼接到对应的槽位里，流结束时一次性拿到完整的工具调用列表。”

```java
// src/main/java/com/yizhaoqi/smartpai/service/ChatHandler.java:421
int firstReferenceNumber = generationReferenceMappings
        .getOrDefault(generationId, Map.of())
        .keySet()
        .stream()
        .mapToInt(Integer::intValue)
        .max()
        .orElse(0) + 1;
```

“拿到同一轮的多个工具调用后，如果都是 `search_knowledge`、`knowledge_stats` 这类没有副作用的只读工具，后端通过线程池并发执行，把总耗时控制在最慢那一次检索的耗时内。每次 `search_knowledge` 返回结果后，引用映射组装器都会先查出当前这次生成已经分配过的最大引用编号，新一批检索结果从最大编号加 1 开始顺延排号。比如第一个子问题检索出的 5 个分块编号是 `来源#1` 到 `来源#5`，第二个子问题检索出的 5 个分块就会自动排成 `来源#6` 到 `来源#10`，再把各自的 `tool_call_id` 和对应结果写回消息列表。这样大模型在汇总回答两个意图时，两边的资料和引用编号清清楚楚，不会互相覆盖。”

“要是两个意图之间存在先后依赖，比如第二个意图的检索词必须等第一个意图查出具体模块名称后才能确定，或者先调用 `search_knowledge` 确认有相关文档后再调用 `generate_summary` 做摘要，那就走多轮 ReAct 循环。”

### 05、你在调用这个 agent 的时候，会不会出现一些幻觉问题呢？

“肯定会出现。只要底层依赖生成式大模型，幻觉就不可能消失。RAG 场景下的幻觉主要来自三个源头，分别是检索阶段把不相关的噪声分块交给了模型、文档切块时把主语或前提条件切断导致模型断章取义，以及检索片段只覆盖了一半问题时模型自己脑补另一半。”

![](https://cdn.paicoding.com/stutymore/paismart-agent-intent-hallucination-mianshi-08-20261016103108-fad5aef0.png)

“第一个措施，先在检索出口把不相关的噪声拦住。大模型有个毛病，只要检索工具返回了 5 段文字，哪怕这 5 段文字和用户问题八竿子打不着，它也会硬着头皮顺着材料编出一套看似通顺的回答。所以派聪明里的 `topK=5` 只是一个数量上限，实际决定返回几条的是相关性分数阈值。正常走混合检索加 `gte-rerank-v2` 重排序时，相关性分数低于 `0.1` 的分块直接丢弃；如果重排序服务超时或剩余时间不足 2 秒退回到 RRF 排序，就启用 `0.028` 的 RRF 分数阈值（约等于两路平均名次必须在第 11 名以内，单路召回时自动减半为 `0.014`）；如果连向量检索也失败、退回到纯关键词检索，就按 Elasticsearch 的 BM25 分数 `0.3` 截断。宁可检索工具返回 0 条结果让模型老老实实回答暂无相关资料，也绝不把低分噪声放进上下文。”

“拦住噪声之后，还要解决 512 字符小分块断章取义的问题。比如文档里有一段写着‘该配置默认开启，生产环境严禁关闭’，可‘该配置’到底指哪个参数，写在上一个分块里。只把当前小分块给模型，模型就会张冠李戴安到别的参数头上。派聪明默认开启了父块扩展（Small-to-Big），检索命中 512 字符的小分块后，自动去 MySQL 取出同一份文档、同一个上传者在该分块前后相邻的各 1 个分块，去掉相邻块之间的重叠文本后拼成最多 1500 个字符的完整父块（单次检索所有父块总预算 6000 个字符）交给大模型阅读，而前端展示的引用页码和锚点仍然精确指向命中的小分块。对准确率要求更高的知识库，还可以打开入库时的上下文描述生成，每 8 个分块调用一次大模型生成 200 字以内的背景说明拼进检索文本，同时在入库后通过向量余弦相似度 `0.9` 加字符二元组 Dice 相似度 `0.8` 自动扫描跨文档的数值和版本矛盾，从源头减少错召回和资料冲突引发的幻觉。”

“到了大模型生成回答这一步，我们先把采样温度 `temperature` 压低到 `0.3`、`top_p` 设为 `0.9`，减少随机发散；同时在提示词的 system 层和每次检索工具返回文本的开头做双重约束。只要检索返回了片段，每句事实性陈述句末都必须按 `(来源#编号: 文件名 | 第X页)` 的格式标明出处；如果检索回来的片段只够回答问题的前半截，模型必须只回答片段能支撑的部分，对片段没覆盖的后半截明确说明‘资料中没有相关说明’，严禁为了凑出完整回答而凭空编造或者给没有依据的句子硬标一个来源编号。”

#### 如果模型还是编造了内容，或者乱标了引用编号怎么发现？

“模型偶尔还是会出现‘虚假引用’，也就是句子末尾规规矩矩标注了 `(来源#1: 派聪明架构文档.pdf | 第3页)`，但翻开第 3 页的分块一看，里面根本没写这句话。为了抓出这种隐蔽的幻觉，派聪明在生成结束后加了一道事后引用核验，同时在线下用评测集做常态化抽检。”

![](https://cdn.paicoding.com/stutymore/paismart-agent-intent-hallucination-mianshi-09-20261016103343-44b93661.png)

“当流式回答生成完毕、准备落库和推送完成事件之前，引用抽取器会用正则表达式扫描整篇回答，找出所有带 `来源#N` 标记的位置，往前扫描到上一个句末标点，把这句话和它引用的编号切分出来（单句最长截取 300 个字符）。接着把每一句陈述和对应编号的父块原文（最长 800 个字符，最多组装 12 对）配成 JSON 数组，在独立的核验线程池里发起一次 20 秒超时的非流式大模型调用。”

```java
// src/main/java/com/yizhaoqi/smartpai/service/citation/CitationVerificationService.java:156
Map<Integer, CitationVerdict> aggregate(List<ClaimPair> pairs, Map<Integer, Judgement> judgements) {
    Map<Integer, CitationVerdict> verdicts = new LinkedHashMap<>();
    for (ClaimPair pair : pairs) {
        Judgement judgement = judgements.get(pair.id());
        if (judgement == null) {
            continue;
        }
        CitationVerdict existing = verdicts.get(pair.referenceNumber());
        if (existing != null && existing.status() == CitationVerdict.Status.SUSPICIOUS) {
            continue;
        }
        CitationVerdict verdict = judgement.supported()
                ? new CitationVerdict(CitationVerdict.Status.SUPPORTED, null)
                : new CitationVerdict(CitationVerdict.Status.SUSPICIOUS, describe(pair, judgement));
        verdicts.put(pair.referenceNumber(), verdict);
    }
    return verdicts;
}
```

“核验时拿去比对的是扩展后的父块文本，因为生成模型当时看到的就是父块，如果只拿 512 字符的小分块去核验，模型合法引用了相邻分块的内容反而会被误判成幻觉。核查提示词要求只依据给定的文档片段判断能否直接推出该句陈述，未提及或矛盾的一律判为不支持。汇总结果时采用一票否决，同一个引用编号只要被回答里的任何一句话错误引用，这个编号的状态就会被标记为 `SUSPICIOUS`（可疑），连同核查理由一起写进引用映射，随完成事件推给前端做降权和风险提示。”

## ending

失去 Claude 的第一天，说实话，真不适应。

昨天晚上觉都没睡好。

这玩意，永久了，有感情，他不只是一个助手，而是一个顶级导师，我有很多认知上，思维上的问题都会问他。

得到的答案也都非常靠谱。

现在没有了，就会觉得很难受。

目前还没有想好应对策略，因为我不知道为什么被封，两年了，再注册一个新号，如果不注意也很可能会被很快办掉。

但生活还要继续，分享还要继续，所以我不能停下脚步。

我们下期见。

