> 调研日期：2026-10-15｜仓库：/Users/itwanger/Documents/GitHub/PaiSmart（main）｜commit：c6889244
`git -C /Users/itwanger/Documents/GitHub/PaiSmart log --oneline --since=2026-10-15`

# 派聪明 RAG 源码知识库

- 本文件只依据 main 分支已提交内容（c6889244，main 与 origin/main 一致）。调研时工作区有未提交的评测改动（`service/eval/*`、`eval/paismart-eval-v1.jsonl`、`docs/*`），没有采用。RustFS 分支的内容也没有采用。
- 路径约定：Java 文件相对 `src/main/java/com/yizhaoqi/smartpai/`；“yml”指 `src/main/resources/application.yml`；“计划文档”指 `docs/interview-upgrade-plan.md`。
- 写稿时如果 `git log --since` 有新提交，先看提交说明和改动文件，再决定补哪一节。

---

## 一、总链路

1. 上传：前端按 5MB 切片上传，Redis bitmap + `chunk_info` 记录进度，MinIO 存分片，合并后得到 `merged/{fileMd5}`。
2. 投递：合并成功后同一事务写状态和 outbox，事务提交后发 Kafka；失败由定时任务补发。
3. 消费：租约认领 → 清旧数据 → 解析切块（PDF 走 LiteParse，其他走 Tika）→ 分批向量化写 ES → 完成。
4. 问答：ReAct 循环（最多 4 轮、8 次工具调用），模型调 `search_knowledge` 工具检索。
5. 检索：BM25 与 KNN 两路并行召回 → RRF 融合 → gte-rerank-v2 重排序 → 分数阈值过滤 → 父块扩展后交给模型。
6. 回答：带 `(来源#编号: 文件名 | 第X页)` 引用，引用映射存 MySQL 和 Redis；可选逐句引用校验（默认关）。

---

## 二、上传分块与合并

- 接口：`POST /api/v1/upload/chunk`、`GET /api/v1/upload/status`、`POST /api/v1/upload/merge`、`GET /api/v1/upload/supported-types`（controller/UploadController.java:31,75,206,265,490）。
- 文件类型：只在第 0 片校验，白名单 22 种扩展名（pdf、doc、docx、xls、xlsx、ppt、pptx、txt、rtf、md、odt、ods、odp、html、htm、xml、json、csv、epub、pages、numbers、keynote），另有黑名单，未知或缺扩展名一律拒绝（UploadController.java:90-108；service/FileTypeValidationService.java:23-50,56-82,102,122-126）。
- 大小：multipart 单文件 50MB、单请求 100MB（yml:30-31）；非管理员再按组织的 `uploadMaxSizeBytes` 校验，超限返回 413（UploadController.java:34,136-156）。
- 分片大小写死 5MB，总片数 = ceil(totalSize / 5MB)（service/UploadService.java:482-483）。
- 分片进度三处记录：
  - Redis bitmap，key `upload:{userId}:{fileMd5}`，每次 setBit 后续期 48 小时（UploadService.java:287,313,316；config/FileProcessingReliabilityProperties.java:30；yml:189）。
  - `chunk_info` 表，唯一键 `uk_chunk_user_md5_index(user_id, file_md5, chunk_index)`（model/ChunkInfo.java:15）。
  - MinIO 对象 `chunks/{userId}/{fileMd5}/{chunkIndex}`（UploadService.java:656-662）。bucket 名 `"uploads"` 在 UploadService 里写死，不读 `minio.bucketName`。
- 判定“分片已存在”要三处同时成立：bitmap 置位、`chunk_info` 有记录、MinIO `statObject` 成功；Redis 丢了而库和对象都在时回填 bitmap（UploadService.java:102-121）。查进度时 bitmap 缺失或全零就从库里查并回填 Redis（UploadService.java:351-414）。
- `file_upload` 唯一键 `uk_file_upload_md5_user(file_md5, user_id)`；状态 UPLOADING=0、COMPLETED=1、MERGING=2；新增列 `processing_started_at`、`heartbeat_at`、`retry_count`（model/FileUpload.java:18,26-28,106,113,119）。建记录时用本地 `ConcurrentHashMap` 锁 `userId:fileMd5` 双检，插入撞唯一键按幂等成功处理（UploadService.java:818-867）。
- 合并防重全靠数据库条件更新，没有分布式锁：
  - 已 COMPLETED 直接返回幂等结果；MERGING 返回 409；分片不全返回 400（UploadController.java:296-321）。
  - `updateStatusIfCurrent` 把 UPLOADING 改成 MERGING，影响行数为 0 时重读状态（UploadController.java:323-341；repository/FileUploadRepository.java:101）。合并抛异常时改回 UPLOADING（UploadController.java:352）。
  - `mergeChunks`：逐片 `statObject` → `composeObject` 到 `merged/{fileMd5}` → `completeMerge`（MERGING → COMPLETED 的条件更新）→ 成功后才清理分片对象、`chunk_info` 和 bitmap（UploadService.java:533-631,664-705；FileUploadRepository.java:112-117）。状态没改成功时分片还在，用户可以重新合并。
- 合并后先估算 Embedding Token（占一个解析许可），再 `enqueueVectorization` 写 outbox（UploadController.java:361-401）。

---

## 三、异步投递与消费

### 3.1 outbox 投递

- 表 `file_processing_outbox`，索引 `(status, next_attempt_at)`，状态 PENDING / SENT（model/FileProcessingOutbox.java:15-17）。
- `enqueueVectorization` 是一个事务：文件状态改 PENDING、清 `processing_started_at`、`retry_count` 归零，同事务写 outbox（service/reliability/FileProcessingOutboxService.java:71-101）。事务提交后在 `outboxDispatchExecutor`（1/2/200，DiscardPolicy）异步投递，队列满了交给定时补发（FileProcessingOutboxService.java:176-188；config/AsyncExecutorConfig.java:99-111）。
- 定时补发每 5 秒一轮、每轮 50 条；认领方式是对 `next_attempt_at` 做条件更新并推后 60 秒作为租约（FileProcessingOutboxService.java:103-119,138-141）。
- 退避：base = min(300, 5 × 2^(attempts-1)) 秒，实际延迟在 [base/2, base] 之间随机，封顶 300 秒；失败 5 次起打 `[ALERT]`（FileProcessingOutboxService.java:39,165,193-198）。
- 已发送记录每天 3:30 清理 7 天前的（FileProcessingOutboxService.java:121-127）。
- 消息 key = fileMd5，用 `executeInTransaction` 发送并同步等 10 秒（FileProcessingOutboxService.java:146-157）。

### 3.2 Kafka 配置（config/KafkaConfig.java）

- 生产端：acks=all、幂等、retries=3、max.block.ms=10000、事务前缀 `file-upload-tx-`（:111-119）。
- 消费端：`isolation.level=read_committed`（:138）、`max.poll.records=1`（:140）、`max.poll.interval.ms` 取向量化心跳超时（默认 600 秒，:143-156）；启动时如果 LiteParse 超时 + 解析许可等待（300 + 120 秒）不小于这个间隔会打 WARN。
- 每实例 1 个消费线程：没调 `setConcurrency`，`@KafkaListener` 也没设 concurrency（:159-175；consumer/FileProcessingConsumer.java:58-60）；topic 分区默认 1（yml:58）。
- 错误处理：`DefaultErrorHandler(FixedBackOff(3000L, 4))`，即首次 + 重试 4 次共 5 次，耗尽后进 `file-processing-dlt`（:164-169）。死信监听器用 `FixedBackOff(1000L, 2)`（:185）。
- yml 里 `spring.kafka.producer.*` / `consumer.*` 的大部分值被 KafkaConfig 自建工厂覆盖，真正生效的只有 bootstrap-servers、group-id、auto-offset-reset、trusted packages 和 topic 名。

### 3.3 消费与幂等

- `FileProcessingConsumer.processTask` 顺序（consumer/FileProcessingConsumer.java:58-113）：租约认领 → 从 MinIO `merged/{md5}` 读文件（失败才用任务里的 filePath，:142-156）→ `clearIndexedData` → 解析入库 → 心跳 → 分批向量化（每批写完 ES 回调一次心跳，:85-92）→ 完成 → 发 `DocumentVectorizedEvent`。
- 租约（service/reliability/VectorizationLeaseService.java:43-81；FileUploadRepository.java:134-171）：
  - 上传任务已 COMPLETED 直接跳过；重建任务（REINDEX）不跳过。
  - 认领条件：状态不是 PROCESSING，或心跳为空，或心跳早于 600 秒前。认领时写 `processing_started_at = heartbeat_at = now`。
  - `processing_started_at` 是持有凭证：心跳、完成、失败都带它做条件更新。心跳更新 0 行抛 `VectorizationLeaseLostException`，旧消费者主动放弃，消息正常提交。
- 清旧数据：`clearIndexedData` 对 ES 别名 `knowledge_base` 按 `fileMd5` delete-by-query，再删 `document_vectors`；ES 删除失败直接抛出让任务重试（service/DocumentService.java:265-275）。
- 覆盖写：ES 文档 id = `fileMd5_chunkId`（service/VectorizationService.java:184）；`document_vectors` 唯一键 `uk_document_vectors_md5_chunk(file_md5, chunk_id)`（model/DocumentVector.java:17）。
- 异常分流（FileProcessingConsumer.java:97-122）：租约丢失吞掉；`InsufficientBalanceException`（余额不足，继承 `RateLimitExceededException`）标记失败后直接返回，不走 Kafka 重试和死信；其他异常标记失败并抛出，走重试 → 死信。
- 死信消费者按 (topic, partition, offset) 唯一键幂等落库 `file_processing_dead_letter` 并打 `[ALERT]`，用独立监听器工厂（consumer/FileProcessingDeadLetterConsumer.java:36-65；model/FileProcessingDeadLetter.java:16-19）。

### 3.4 卡住任务恢复（service/reliability/FileProcessingRecoveryJob.java）

- `@Scheduled` 每 60 秒一次、每批 50 条，依次处理向量化卡住、合并卡住、废弃上传（:52-60）。每个实例都跑，靠“扫描时看到的心跳”做条件更新互斥。
- 向量化：PROCESSING 且心跳超过 600 秒（:72-106）：
  - 没有 `processing_started_at` 的视为升级前遗留任务，直接 FAILED，不再重投（:29,72-81）。
  - `retry_count >= 3` 标记 FAILED 并打 `[ALERT]`。
  - 否则同一事务里改回 PENDING、`retry_count + 1`、写 outbox 重投。
- 合并：MERGING 超过 600 秒改回 UPLOADING（:114-129）。
- 废弃上传：UPLOADING 超过 24 小时没有新分片，先条件删除记录，删成功再清 MinIO 分片（按记录和按前缀各删一遍）、`chunk_info`、bitmap（:134-148；UploadService.java:710-737）。
- 状态推送：`DocumentStatusNotifier` 在事务提交后发 Redis 频道 `paismart:document-status`，各实例订阅后经聊天 WebSocket 推给上传者的所有页面，事件类型 `document_status`（service/reliability/DocumentStatusNotifier.java:31-32,56-107）。

### 3.5 解析背压

- 解析并发：公平信号量 2，`tryAcquire` 等 120 秒，超时抛 `ParseCapacityExceededException`；Kafka 消费、同步重建、上传估算共用（service/parse/ParseConcurrencyLimiter.java:25-58；yml:203-204）。
- 堆内存背压：每秒检查，堆使用率 ≥ 80% 暂停 Kafka 文件消费，≤ 70% 恢复；暂停超过 300 秒强制恢复一次并告警；不调用 `System.gc()`（consumer/FileProcessingBackpressureMonitor.java:44-61,105-133；yml:201-211）。
- 暂停原因是集合（`heap-pressure`、`index-switch`），全部清除才恢复（consumer/FileProcessingListenerGate.java:22-64）。

---

## 四、解析与切块（service/ParseService.java）

- 格式判断：文件头是 `%PDF-` 走 LiteParse，其他走 Tika `AutoDetectParser`（:129-143,556-561）。输入包一层 8KB `BufferedInputStream`（:60,128）。
- 非 PDF 流式解析：自定义 `BodyContentHandler(-1)`，`characters()` 往 StringBuilder 里追加，长度达到 `parentChunkSize` 就切子块入库并清空（:186-233）。
  - `parentChunkSize` 默认 1048576，只有 `@Value` 默认值，三个 yml 都没配（:57）。单位是字符（`buffer.length()`，:205），日志里写的 bytes 不准（:220）。
  - 父块之间没有重叠；子块重叠只在同一个父块内部计算。
- PDF：LiteParse 外部进程，命令 `lit parse <in.pdf> --format json --output <out.json> --max-pages 1000 --dpi 150 --ocr-language chi_sim+eng --quiet`，超时 300 秒后 `destroyForcibly`（:336-426；yml:212-223）。开启阿里云 OCR（默认关）时传 `--ocr-server-url` 指向本服务的 `/api/v1/internal/ocr/liteparse`（:428-439；service/LiteParseOcrAdapterService.java）。
  - PDF 按页切块，每块带 `pageNumber`，不使用 parentChunkSize（:302-315）。
  - 文本规整：去掉中文间多余空格、丢弃 `No. x / y` 形式的页脚行（:38,482-533）。
- `anchorText` = 分块文本压缩空白后取前 120 字符（:580-591），用于前端 PDF 高亮定位。
- 子块切分（:596-924），长度都按字符计：
  1. 按 `\n\n+` 分段，段落拼到不超过 512。
  2. 超长段落按句末标点 `[。！？；.!?;]` 分句；句子还超长用 HanLP `StandardTokenizer` 分词拼接；HanLP 异常时按字符硬切。
  3. 小于 100 的块与相邻块合并，合并后不超过 512 + 100 = 612。
  4. 重叠：从上一块尾部取整句，最多 100 字符，前置到下一块开头（`overlap + "\n\n" + chunk`）；整句放不下时按 HanLP 词边界取尾部。
  - 所以入库分块可能超过 512 字符（合并后最多约 612，再加最多 102 的重叠）。
- 子块逐条 `documentVectorRepository.save()`，没有用 saveAll；chunkId 从 1 开始跨父块、跨页连续（:282-300）。
- `ChunkTextMerger` 是反向操作：把相邻分块拼回去并去掉重叠，供父块扩展和上下文检索使用（service/chunk/ChunkTextMerger.java:13-59）。

---

## 五、向量化与索引

### 5.1 向量化（service/VectorizationService.java）

- 从 MySQL 按 chunkId 分页读，每页 10 条（`embedding.api.batch-size`，yml:422），embedding 后立刻 bulk 写 ES，一批一个请求（:49-50,93-107,199）。EmbeddingClient 自身 `@Value` 默认 100，靠 yml 改成 10（client/EmbeddingClient.java:36）。
- 每个文件开始时固定一次供应商，`modelVersion = provider:model:dimension`，如 `aliyun:text-embedding-v4:2048`（:85-87；EmbeddingClient.java:210-212）。
- 写入 ES 的 fileName 取上传者最新的上传记录，没有再取该 MD5 最新记录（:148-156,198）。
- 默认 Embedding：阿里云百炼 OpenAI 兼容接口 `text-embedding-v4`，2048 维，`encoding_format: float`；备选智谱 `embedding-3`（EmbeddingClient.java:149-178；service/ModelProviderConfigService.java:47-56,271-274）。Embedding 不切换供应商，不同模型的向量不能混用。

### 5.2 ES 索引

- 别名 `knowledge_base`，实际索引名 `knowledge_base_{modelVersion 规整后}`，如 `knowledge_base_aliyun_text-embedding-v4_2048`（service/index/KnowledgeIndexNames.java:7,12,24-36）。
- mapping 模板 `src/main/resources/es-mappings/knowledge_base.json`：
  - `fileName`、`textContent`、`chunkContext`：text，`ik_max_word` 建索引、`ik_smart` 查询。
  - `vector`：dense_vector 2048 维，`similarity: cosine`。
  - `fileMd5`、`modelVersion`、`userId`、`orgTag`：keyword；`chunkId`、`pageNumber`：integer；`anchorText`：不建索引。
- 公开标记字段名：模板里声明的是 `isPublic`，但 `EsDocument` 用 Lombok `boolean isPublic`，默认 Jackson 序列化成 `public`，权限过滤查的也是 `public`（entity/EsDocument.java:25；config/EsConfig.java:74；HybridSearchService.java:408；测试断言见 HybridSearchServiceTest.java:362）。模板里的 `isPublic` 实际没被写入。
- 启动初始化 `EsIndexInitializer`（@Order(2)）：别名存在就补齐模板字段；没有就按当前 Embedding 供应商建版本化索引并挂别名（config/EsIndexInitializer.java:86-133）。
- 文件名回填 `FileNameIndexBackfill`（@Order(3)，后台线程）：对缺 `fileName` 的旧分块按 fileMd5 `update_by_query` 补写，可重复执行（service/index/FileNameIndexBackfill.java:26-92，commit 6b730153）。

### 5.3 换 Embedding 模型重建索引（service/index/EmbeddingReindexService.java）

- 入口 `POST /api/v1/admin/knowledge-index/rebuild`（yml:249）。单线程执行，同时只有一个任务（:109-133）。
- 流程：准备新索引 → 全量重建 → 暂停 Kafka 文件消费（原因 `index-switch`）→ 追平期间新增 → 校验 → 原子切换别名并启用新供应商 → 切换后再追平一次 → 恢复消费（:166-194）。
- 单文件已有分块数和 modelVersion 都对上就跳过；重建时复用 MySQL 里的 chunkContext，不再调 LLM（:243-297）。
- 校验：文档数必须一致；`validation-queries`（默认空）里每个问题至少召回 1 条才允许切换（:330-357）。启用新供应商失败时别名切回（:371-379）。

### 5.4 上下文检索（Contextual Retrieval，默认关）

- 开关 `knowledge.contextual-retrieval.enabled=false`（yml:260）。开启后每 8 个分块一次 LLM 调用，带前后各 2 个相邻分块作窗口（上限 6000 字符），每个分块生成不超过 200 字符的说明（config/ContextualRetrievalProperties.java；service/contextual/*）。
- 说明存 `document_vectors.chunk_context` 和 ES `chunkContext` 字段；embedding 输入是“说明 + `\n\n` + 原文”，ES 的 `textContent` 仍只存原文，展示和引用只用原文（service/chunk/ContextualChunkText.java:16-22；VectorizationService.java:169-188）。
- 开启时 BM25 用 `combined_fields` 同时查 `chunkContext` 和 `textContent`（BM25F），rerank 输入也换成“说明 + 原文”（HybridSearchService.java:358-381）。
- 提示词固定在 system 里，便于复用供应商的前缀缓存；只在限流异常时重试 2 次、间隔 10 秒（service/contextual/ChunkContextGenerator.java:29-37,63-79）。
- 来源 commit 1e36fa56（2026-09-24）。

### 5.5 文档冲突检测

- 新文件向量化完成后异步扫描：取该文件前 200 个分块，每块 KNN 找其他文件的 3 个近邻，余弦 ≥ 0.9，且把数字、版本号、日期替换成占位符后字符二元组 Dice ≥ 0.8，而两边取值集合不同，记为疑似冲突（service/conflict/ConflictCandidateFinder.java:88-176；KeyValueConflictAnalyzer.java:58-142；yml:276-291）。
- LLM 二次确认默认关；只记录不处理，管理员在 `/api/v1/admin/document-conflicts` 人工决定（commit 8f810a3a）。

---

## 六、检索、融合与重排（service/HybridSearchService.java）

配置类 config/HybridSearchProperties.java，yml:331-377。

### 6.1 两路召回

- 查询向量生成失败只算 KNN 这一路失败，BM25 照常召回（:153-159,486-503）。
- 每路窗口 = min(topK × 30, 300)，且不小于 topK；topK=5 时 150 条（:227-230）。
- 两路在 `searchRecallExecutor`（8/32/200，CallerRuns）上并行，共用一个等待截止时间 = min(10 秒, 问答请求剩余时间)；每路单独等待，超时或异常只让这一路失败（:156-165,200-213；AsyncExecutorConfig.java:46-58）。
- 模式：两路都成功 `HYBRID`；只剩一路 `BM25_ONLY` / `KNN_ONLY`，仍走 RRF 和 rerank；两路都失败抛异常，外层退到 `TEXT_ONLY`（:166-173,126-131）。
- KNN：`k = window`，`num_candidates = window × 2`（上限 10000），权限过滤放在 knn 内部做预过滤，保证返回的 k 条都有权限（:383-400）。
- BM25（:316-376）：
  - 正文默认单字段 `match textContent`；开启上下文检索时改 `combined_fields(chunkContext, textContent)`。
  - 文件名作为 should 加分项，`fileName` 权重 0.5，只给正文已匹配的分块加分；文件名单独成字段，不和正文合并统计词频。
  - `minimum_should_match`（默认空）和短语加分（默认 0，slop 2）可配但默认不开。
  - k1、b 用 ES 默认值。

### 6.2 RRF 融合（service/search/RrfFusion.java）

- `score = Σ 1/(k + rank)`，k=60，两路权重都是 1；只看名次不看原始分；同一路重复出现取最靠前名次；稳定排序（:26-58）。
- 值域：两路都排第 1 为 2/61 ≈ 0.0328；只被一路召回最多 1/61 ≈ 0.0164；窗口 150 时下界 1/210 ≈ 0.0048。

### 6.3 rerank 与阈值

- rerank 模型 DashScope `gte-rerank-v2`，输入 RRF 前 max(50, topK) 条，每条截断 2000 字符，按 `relevance_score ≥ 0.1` 过滤后取 topK（:232-270；HybridSearchProperties.java:65-76；yml:353-367）。topK 只是上限，阈值决定实际返回条数。
- RerankClient 每次调用新建 WebClient，不走统一的模型调用治理，超时 = min(10 秒, 请求剩余时间)（client/RerankClient.java:63-73）。
- 跳过 rerank 的三种情况：rerank 关闭、请求剩余时间 < 2000ms、rerank 调用异常（:242-248,266-269）。这三种都走 `rrfTopK`：
  - 按 RRF 阈值过滤再取 topK，模式加后缀 `_RRF`（如 `HYBRID_RRF`）（:275-287）。
  - 阈值 `rrf-score-threshold` 默认 0.028（约等于两路平均名次 11 名以内）；只有一路召回时阈值自动减半为 0.014（:277-278；yml:342）。
  - HybridSearchProperties.java:61 的注释写“关闭后不做阈值截断”，和代码不符，以代码为准。
- `thresholdDroppedInTopK`：排在前 topK 名却因低于阈值被丢掉的条数，供评测看阈值有没有误伤（:261-262,285）。

### 6.4 出口分数

- 统一换算到 0 到 1，用固定上界，不用 min-max（分母随当批结果变化，跨查询不可比）（:289-303）：
  - rerank 分原样（本身在 0 到 1）。
  - `_RRF` 模式：RRF 分 ÷ 2/(k+1)。
  - `TEXT_ONLY`：BM25 分 ÷ (BM25 分 + 10)，饱和常数 `bm25-score-saturation` 默认 10。
- 原始分保存在 `SearchResult.rawScore`（entity/SearchResult.java:10-11；HybridSearchService.java:472）。
- 给模型的文本里写的是换算后的分数 `score=%.4f`（service/AgentToolRegistry.java:290-291），rawScore 只进引用映射，不给模型看。

### 6.5 纯文本降级 TEXT_ONLY

- 只在两路都失败（或权限解析之后的混合检索整体抛异常）时触发：BM25 查询 + `min_score 0.3`，size = topK（:64,126-131,431-455）。
- 用户权限解析失败直接返回空结果，拒绝搜索（:116-124）。

### 6.6 父块扩展（small-to-big，service/search/ParentContextExpander.java）

- 默认开启：命中分块前后各扩 1 个相邻分块，单个父块不超过 1500 字符，一次检索所有父块合计不超过 6000 字符，超出预算的命中只给小分块（config/ParentContextProperties.java:17-23；yml:368-377）。
- 相邻分块从 MySQL 按 chunkId 范围取，用 `ChunkTextMerger` 去重叠后拼接（:81-130）。
- `parentKey = fileMd5#起始chunkId-结束chunkId`；后续命中落在已有父块范围内就复用，父块只发一次（:55-67,110,132-136）。
- 引用、页码、证据片段仍指向命中的小分块（entity/SearchResult.java:20-21,64-71）。来源 commit 1e36fa56。

### 6.7 查询改写

- 没有独立的查询改写模块，由模型在 ReAct 里自己构造 query。约束写在两处：`search_knowledge` 的 query 参数说明“应保留用户原话中的核心实体、缩写和限定词，可包含原始问句和必要的等价改写”（AgentToolRegistry.java:196）；system 提示词规则 2 要求保留核心名词、可合并原句与等价改写（service/LlmProviderRouter.java:153）。

---

## 七、权限隔离

- 检索过滤（HybridSearchService.java:402-417），bool should 三选一，`minimum_should_match: 1`：
  1. `userId` = 当前用户数据库 id（私有）；
  2. `public` = true（公开）；
  3. `orgTag` in 用户有效组织标签。
- 有效组织标签 = 用户自己的标签 + 递归上级标签 + `DEFAULT`。子组织成员能看上级组织的文档，反过来不行；缓存 key `user:effective_org_tags:{username}`，TTL 24 小时；出错时只返回 DEFAULT（service/OrgTagCacheService.java:29-32,136-202）。
- 两路召回都带同一个过滤：BM25 放在 bool filter，KNN 放在 knn.filter 预过滤（:316-328,393-396）。
- 资源级访问 `OrgTagAuthorizationFilter`：公开、无标签、DEFAULT 标签放行；所有者、ADMIN 放行；`PRIVATE_` 开头的私人空间拒绝；其余要求 JWT 里的组织标签直接包含资源标签，这里没有层级继承（config/OrgTagAuthorizationFilter.java:148-189,317-323）。
- 上传只能传到自己的 `PRIVATE_{username}` 空间或自己所属的组织，管理员身份不额外放宽（commit e4d77b59，`UserService.validateUploadOrganization`）。

---

## 八、对话与引用

### 8.1 ReAct 循环（service/ChatHandler.java）

- 上限：4 轮、8 次工具调用、每轮最大补全 2000 token（:53-55）。
- 请求级截止时间：收到消息时算出 120 秒总预算（:118；config/ChatDeadlineProperties.java:16-20；utils/RequestDeadline.java）。
  - 每轮模型调用等待 = min(120 秒, 请求剩余时间)（:52,474-477）。
  - 工具执行在内层作用域里跑，截止时间再减去给最终回答预留的 30 秒（:303,349-354）。
  - 第 1 轮总是带工具；从第 2 轮起，剩余时间不够“15 秒工具轮 + 30 秒预留”就收尾（:269,344-347）。
  - 轮次或时间用完时追加一条 user 消息“ReAct 轮次或时间预算已用尽，请不要再调用工具，直接基于已有 tool 结果给出最终回答。”，再不带工具调一次（:323-329）。
  - 工具调用超过 8 次后，后续调用不执行，返回“工具调用预算已用尽”（:295-300）。
- 线程：ReAct 在 `chatMonitorExecutor`（4/16/200，默认 AbortPolicy）里跑，拒绝时返回“系统繁忙，请稍后重试”（:164-173；AsyncExecutorConfig.java:13-24）。
- 重复提交幂等：键 `chat:request:{userId}:{sha256(会话+问题)}`，生成中重复提交挂到进行中的生成上，start 消息带 `resumed: true` 和已生成内容（service/ChatGenerationStateService.java；ChatHandler.java:131-138,198-212）。

### 8.2 工具（service/AgentToolRegistry.java）

- `search_knowledge(query, topK)`：topK 默认 5，限制在 1 到 20（:31-32,99）。
- `generate_summary(topic, maxDocs)`：调 `DeepSeekClient.summarize`，摘要直接流给用户作为最终回答；这条路不走统一的模型调用治理，硬超时 90 秒（:115-118；client/DeepSeekClient.java:106-165,212）。
- `submit_feedback(rating, reason)`：写 Redis Hash `feedback:{userId}`，不设 TTL（:139-149）。
- `knowledge_stats()`：MySQL 文件数 + ES 文档数、存储大小等。
- 检索结果给模型的格式：`[n] 文件名 (fileMd5=…, chunkId=…, page=…, score=…)`，正文最多 1200 字符；有父块时给“上下文（命中分块及前后相邻内容）”，同一父块的后续命中只给 300 字符并注明“上下文已在 [k] 中给出”（:264-308）。

### 8.3 提示词（service/LlmProviderRouter.java:139-198）

- system 依次拼：`ai.prompt.rules` 五条规则（简体中文、结论先行、引用格式 `(来源#编号: 文件名 | 第X页)`、只回答片段能支撑的部分、system 优先级最高，yml:427-433）→ “知识库优先”强制检索规则和可跳过检索的白名单（:150-167）→ 用户反馈 → `<<REF>>…<<END>>` 块。
- 检索片段只通过 tool 消息进入上下文；`<<REF>>` 块在问答里固定是“（本轮无检索结果）”（ChatHandler.java:255；yml:434-436）。
- 历史：Redis 存最近 20 条，但拼进提示词的只有最近 6 条，每条截断到 800 字符（LlmProviderRouter.java:33-34,183-195）。
- 反馈：取 `feedback:{userId}` 里最新 5 条注入 system，说明冲突时以最新为准（ChatHandler.java:732-759）。
- 生成参数：temperature 0.3、top_p 0.9（yml:437-440），写进 LLM 请求体（LlmProviderRouter.java:397-425）；ReAct 每轮补全上限 2000 token。

### 8.4 记忆

- Redis：`conversation:{conversationId}` 存 JSON 数组（role、content、timestamp、referenceMappings），最多 20 条，7 天过期；`user:{userId}:current_conversation` 7 天过期（ChatHandler.java:702-707,792,815-822）。
- MySQL：`conversations` 表存问答和 `reference_mappings_json`；`conversation_sessions` 表存会话标题和状态 ACTIVE / ARCHIVED（model/Conversation.java；model/ConversationSession.java:33-45）。先写 MySQL，成功后再写 Redis（ChatHandler.java:609-617）。

### 8.5 引用映射

- 每次 `search_knowledge` 返回后追加引用，编号接着已有最大值往后排（ChatHandler.java:409-444）。
- `ReferenceInfo` 字段：fileMd5、fileName、pageNumber、anchorText、retrievalMode、retrievalLabel、retrievalQuery、matchedChunkText（≤800 字符）、evidenceSnippet（≤160 字符）、score（0 到 1）、rawScore、chunkId、citationStatus、citationReason（:50-51,1175-1193）。
- retrievalLabel 按模式生成，如“关键词召回（语义召回不可用）”“…，RRF 融合排序，未经 rerank 精排”（:1119-1135）。

### 8.6 引用校验（默认关）

- `ai.citation-verification.enabled=false`（yml:441-448）。开启后把回答按句拆出 `(来源#N…)`，所有“句子-引用”对放进一次非流式 LLM 调用判断是否被片段支撑；同一编号只要有一句不被支撑就标 SUSPICIOUS；调用失败视为未校验（service/citation/CitationExtractor.java:20-22；CitationVerificationService.java:32-40,76-87,156-173）。
- 校验时看的是父块文本，跑在独立的 `citationVerificationExecutor`（2/8/50，CallerRuns）（ChatHandler.java:625-648；AsyncExecutorConfig.java:29-41）。

### 8.7 多窗口

- WebSocket 支持 `{"type":"chat","message","conversationId"}` 和 `{"type":"resume","generationId"}`；生成按 generationId 绑定订阅连接，只推给该生成的订阅者；文档状态这类广播推给用户的全部连接（handler/ChatWebSocketHandler.java:98-126；service/ChatSessionRegistry.java:20-89）。来源 commit e4d77b59、521369a8。

---

## 九、模型调用治理与限流

### 9.1 统一调用链（client/resilience/*，commit 1b5c78da）

- `ModelCallGuard` 由外到内：重试 → 熔断器 → 并发上限（Resilience4j Bulkhead）→ 单次尝试总超时（从订阅开始计时，覆盖整个流）→ QPS 令牌桶 → HTTP 调用。每次重试都重新拿令牌和并发许可（ModelCallGuard.java:28-33,69-92,117-126）。
- 走这条链的：LLM 流式问答、ReAct 非流式和流式（LlmProviderRouter.java:86,225,266）、Embedding（EmbeddingClient.java:149-180）。不走的：RerankClient、DeepSeekClient.summarize。
- 每个 `scope:provider` 一套熔断器、并发上限、重试预算、连接池。

### 9.2 重试（以源码为准，只有这一套模型调用重试）

- `ModelRetryPolicy`：最多重试 2 次（共 3 次尝试）；初始 500ms，指数翻倍，封顶 8 秒；在 [exp/2, exp] 之间随机（代码注释写“全抖动”，实际取值范围是 equal jitter）；有 Retry-After 时按它等，超过 30 秒不重试；只重试网络错误、超时、408、429、5xx；收到第一条流式数据后不重试（ModelRetryPolicy.java:35-64,81-92；config/ModelCallProperties.java:52-64；yml:137-146）。
- `RetryBudget`：10 秒滑动窗口内重试数超过请求数的 10% 就停，低流量保底 3 次（RetryBudget.java:43-52）。
- 业务层另有几处重试，和上面不是一回事：
  - Kafka 消费 3 秒 × 4 次（见 3.2），会和客户端重试叠加，最坏一批分块调 5 × 3 次模型（计划文档:88）。
  - outbox 补发指数退避封顶 300 秒（见 3.1）。
  - 重建索引只在限流异常时重试 5 次、每次等 20 秒（EmbeddingReindexService.java:299-315）。
  - 上下文生成只在限流异常时重试 2 次、每次等 10 秒。
  - 评测输出为空时重试 1 次（见 10.2）。
  - 余额不足 `InsufficientBalanceException` 在以上业务重试里都被排除。

### 9.3 熔断、并发、超时、切换

- 熔断：失败率 50%，慢调用 120 秒且占比 80%，计数窗口 20 次，最少 10 次才计算，打开 30 秒，半开放行 3 次；限流异常不计入失败（ModelCallGuard.java:128-142；yml:147-154）。
- 并发上限：LLM 50、Embedding 20，满了立即拒绝不等待（maxWaitMs=0 只在 Java 默认值里，ModelCallProperties.java:79-86；yml:155-157）。
- 连接：按供应商共享 Reactor Netty 连接池，最大 100 连接，连接超时 5 秒，两次读之间最长 60 秒（流式 token 间隔也受它约束）（ModelWebClientFactory.java:48-62；yml:126-131）。
- 单次尝试总超时：LLM 流式 180 秒、非流式 90 秒、Embedding 30 秒（Embedding 再与请求剩余时间取小）（yml:133-136；EmbeddingClient.java:165-166）。问答整体由 ChatHandler 的 120 秒请求预算截断。
- LLM 切换：主供应商任何错误且还没输出内容时，按备用链切到下一个已启用且配了 Key 的供应商，并换成它的模型名；已输出内容后不切，保证一次回答不混两个模型（LlmProviderRouter.java:306-363；ModelProviderConfigService.java:87-112）。内置 LLM 供应商 deepseek（默认 `deepseek-chat`）、qwen（qwen-flash）、zhipu（glm-4.5-air）（ModelProviderConfigService.java:260-268）。

### 9.4 QPS 令牌桶（ModelCallRateLimiter + Lua）

- `src/main/resources/scripts/token_bucket.lua`：补充、扣减、写回、PEXPIRE 在一个脚本里原子执行，时间取 Redis `TIME`。
- 模型 QPS：LLM 20、Embedding 20，桶容量 = 每秒补充量；后台请求（上传向量化、上下文生成、冲突确认、离线评测）要给在线请求留 30% 余量（client/resilience/ModelCallRateLimiter.java:50-97；yml:114-122）。
- 拿不到令牌进有界等待：在线最多 200 个排队、等 5 秒；后台最多 50 个、等 60 秒；超时或队列满抛限流异常。Redis 故障时放行（ModelCallRateLimiter.java:34-35,58-92）。

### 9.5 请求限流与 Token 配额

- 请求限流全部换成 Lua 令牌桶（key 前缀 `ratelimit:tb:`）：注册每 IP 20 次 / 600 秒，登录每 IP 30 次 / 60 秒，聊天每用户 30 次 / 60 秒，Embedding 查询每用户 60 次 / 分钟且 5000 次 / 天（service/RateLimitService.java:27-62,95-100；service/TokenBucketRateLimiter.java；yml:101-111）。管理员可在 `/api/v1/admin/rate-limits` 运行时调整，存 `rate_limit_configs` 表。
- 全局 Token 预算（Java 默认值）：LLM 12 万 / 分钟、800 万 / 天；Embedding 上传 20 万 / 分钟、2000 万 / 天；Embedding 查询 6 万 / 分钟、400 万 / 天（config/RateLimitProperties.java:13-16）。
- 用户 Token：yml 默认走余额模式（`use-user-token-balance: true`），新用户 LLM、Embedding 各 1 万，管理员 Embedding 10 万；余额不足抛 `InsufficientBalanceException`（yml:164-177；service/UsageBalanceQuotaService.java:37-81；service/UserTokenService.java:327-335）。requesterId 以 `system` 开头的后台任务不受用户配额限制（UsageQuotaService.java:442-444）。

### 9.6 降级汇总

| 故障 | 处理 | 位置 |
|---|---|---|
| 查询向量生成失败 | 只算 KNN 失败，`BM25_ONLY` 继续 RRF + rerank | HybridSearchService.java:153-165 |
| 单路召回超时或异常 | 另一路继续，`BM25_ONLY` / `KNN_ONLY` | :166-173 |
| 两路都失败 | `TEXT_ONLY`，BM25 + min_score 0.3 | :126-131 |
| rerank 关闭、超时、异常、剩余时间 < 2 秒 | RRF 顺序 + RRF 阈值 0.028（单路 0.014），模式加 `_RRF` | :242-287 |
| LLM 主供应商失败且未输出 | 切备用供应商 | LlmProviderRouter.java:318-342 |
| Embedding 供应商失败 | 不切换，重试耗尽后失败 | EmbeddingClient.java:147 |
| 堆内存 ≥ 80% | 暂停 Kafka 文件消费 | FileProcessingBackpressureMonitor.java |
| chatMonitorExecutor 满 | 返回“系统繁忙” | ChatHandler.java:167-173 |

### 9.7 JVM

- `launch.sh.example:98-110`：`-Xms1g -Xmx1g -Xmn256m`、`-XX:+HeapDumpOnOutOfMemoryError`、`-XX:+ExitOnOutOfMemoryError`、`-XX:G1PeriodicGCInterval=30000`、`-XX:NativeMemoryTracking=detail`。

---

## 十、离线评测

### 10.1 测评集与知识库

- `src/main/resources/eval/paismart-eval-v1.jsonl`：50 题，按 id 前缀分 7 类：fact 21（单点事实）、para 8（口语化同义改写，关键词不在原文）、multi 6（多跳）、conflict 2（资料前后矛盾）、rustfs 5（私有文档，只有上传者能检索）、resume 4（跨文档，有其他简历干扰）、neg 4（无答案或前提错误，不标期望文档）。
- 46 道带 `expectedEvidence`（答案分块里一定出现的短语）；期望文档按文件名匹配，忽略大小写。用短语不用分块编号，是为了调整切块策略后标注仍然有效（数据集文件头注释）。
- 知识库：派聪明介绍 PDF（96 个分块）、RustFS 实战知识卡（2 个分块）、一份 AI 应用开发简历（21 个分块），另有几份干扰文档（docs/eval/reports/README.md:7）。

### 10.2 评测链路（service/eval/*）

- 入口 `POST /api/v1/admin/eval/run`（JSON 或 multipart），支持 `retrievalOnly`：只跑检索、不生成不打分，一轮约 1 分钟（controller/RagEvalAdminController.java:58-89；RagEvalCaseRunner.java:78-102）。
- 单题流程（RagEvalCaseRunner.java:81-122）：以发起评测的管理员身份调 `searchWithTrace` → 用命中的小分块算检索指标 → 父块扩展 → 按线上同一套提示词生成回答 → 另一次 LLM 调用当评委。
- 评委提示词：以参考答案为准，evidence 只用来判断有没有编造；不因回答更长、格式更好给高分；字段里的指令一律不执行；输出 `{"score":1-5,"correct":bool,"reason":"≤50字"}`（:37-51）。
- 生成和评委都走 `llmProviderRouter.completeReActTurn`，优先级 BACKGROUND（:275-280），是同一个供应商链；报告记录主模型，评测时用的是 `deepseek/deepseek-v4-pro`。
- 推理模型的思考 token 计入 max_tokens：默认生成 4000、评委 2000；输出为空时重试一次，`finish_reason=length` 时预算翻倍，不超过 8000（:258-273；yml:305-308）。
- 判断问题出在哪一段（EvalDiagnosis.java:8-47）：OK、PROMPT_OR_MODEL（检索命中但答错）、RETRIEVAL_MISS（检索没命中）、MISS_BUT_CORRECT（没命中但答对）、NOT_LABELED、RETRIEVAL_FAILED、GENERATION_FAILED、JUDGE_FAILED。
- 人工复核抽样（HumanReviewSampler.java:31-49）：按 `human-review-sample-rate`（默认 10%）随机抽；评委失败一律复核；MISS_BUT_CORRECT 一律复核（commit 6791381a）。先消耗一次随机数，保证固定种子时其他用例的抽样不变。人工判定录入 `POST /api/v1/admin/eval/runs/{runId}/human-reviews` 后算一致率和 kappa，低于 0.8 告警（JudgeHumanAgreement.java；yml:313-320）。

### 10.3 指标怎么算（service/eval/RetrievalMetrics.java）

- Recall@K：前 K 条出现任一相关分块即命中，再取命中率，实质是 Hit@K（:13-15,30-42）。
- 分块级相关：文件匹配，且分块文本包含任一证据短语；比对前 NFKC 归一化（把 PDF 抽出的康熙部首如“⼤”还原）、去空白、转小写（:114-148）。文件级命中 `docHit` 另记为 docRecallAtK（:47-57）。
- MRR：第一个相关分块名次的倒数取平均（:94-96）。
- NDCG@K：二元相关，理想排序取 RRF 候选池里的相关条数（:72-88）。
- 分阶段（RagEvalCaseRunner.java:161-201）：召回阶段看 RRF 候选（rerank 输入）里有没有相关分块，即 Recall@50；BM25、KNN 各自的命中和首个相关名次；精排看 NDCG@K。
- Precision@K 的分母是实际返回条数而不是 K：固定分母下“返回 2 条、2 条相关”和“返回 5 条、2 条相关”都是 0.4，看不出阈值过滤噪声的效果（计划文档:151）。

### 10.4 评测数据（docs/eval/reports/README.md，评测时间 2026-10-10 到 10-11，topK=5）

| 轮次 | rerank 阈值 | 分块级 Recall@5 | 文件级 Recall@5 | MRR | 检索为空 | 评委准确率 | 失败 |
|---|---|---|---|---|---|---|---|
| 01 基线 | 0.2 | 56.5% | 78.3% | 0.46 | 13 | 65.3% | 1 |
| 02 | 0.1 | 76.1% | 100% | 0.59 | 0 | 86.0% | 0 |
| 03 | 0.0 | 76.1% | 100% | 0.59 | 0 | 85.7% | 1 |
| 04 默认值回归 | 0.1 | 76.1% | 100% | 0.59 | 0 | 89.4% | 3 |
| 05~07 分块级三轮 | 0.1 | 76.1% | 100% | 0.59 | 0 | 86.0% ×3 | 0 |

- 01~04 跑的时候还没有分块级标注，分块级数字是归档时用同一套标注离线重算的；用同样方法重算 05，与实跑一致。
- 05~07 检索指标完全一致（检索是确定性的），评委平均分在 4.32 到 4.42 之间波动。
- 第三轮基线（计划文档:152）：召回阶段 Recall@50 100%（BM25 97.8%、KNN 100%），精排 NDCG@5 0.545。召回已经饱和，短板在重排序没把相关分块排进前 5。
- 关掉 rerank 只走 RRF 兜底：分块级 Recall@5 80.4%、MRR 0.59，比 rerank 后的 76.1% 还高，说明 gte-rerank-v2 对口语化问句的排序有提升空间（计划文档:136）。
- 阈值 0.0 和 0.1 的 Recall、MRR、NDCG 完全相同，但 0.1 在 2 道 RustFS 题的前 5 名里丢掉 6 条不相关结果（这两题 0.1 下只返回 2 条，0 下多出 3 条 0.06 到 0.09 分的无关分块），Precision@K 19.1% → 20.4%，每题不相关条数 4.04 → 3.91（计划文档:153；README:26）。
- 无答案题的 rerank 分 0.18 到 0.30，高于 0.1，阈值 0 和 0.1 下都返回 5 条；口语化提问的正确分块只有 0.14 到 0.19，两者重叠，阈值承担不了拒答，拒答靠提示词。

### 10.5 评委人工校准（基于 05 轮，docs/eval/human-review-v1.md）

- 分层抽 15 道：
  - A 层：评委判错的 7 道全部入选，检验评委是否判得过严。
  - B 层：评委判对、但检索没召回答案分块（MISS_BUT_CORRECT）的 4 道全部入选，检验评委在缺证据时是否放水。
  - C 层：其余 39 道评委判对的题随机抽 4 道，作为对照。
- 复核方式：把参考答案拆成要点（★ 为核心要点），复核人只勾“回答说到了哪些点”，判定和分数按固定规则从勾选结果算出，复核人看不到评委打分。
- 结果：A 7/7、B 1/4、C 4/4，合计 12/15，一致率 80%，Cohen's kappa 0.61，评委分与人工分平均差 0.53。B 层 3 道分歧都是评委判对、人判错：没检索到证据时模型漏了核心要点，评委仍然放行。A、B 是定向挑的难题，这个一致率会比在全部题目上偏低。
- 交叉评审（docs/eval/cross-model-review-v1.md）：DeepSeek 评委 vs 人工 12/15、kappa 0.61；另一个 AI vs 人工 13/15、0.73；两个模型之间 14/15、0.87。两个模型在同样的地方偏宽松，用一个模型复核另一个模型替代不了人工。

---

## 十一、演进记录

按时间顺序，只记适合当面试素材的变化。

1. **检索打分：rescore → RRF + rerank（4aa8f3df，2026-09-23）**。之前是 KNN 召回 topK×30 条，再用 ES `rescore` 叠 BM25，`queryWeight 0.2`（保留部分 KNN 分）、`rescoreQueryWeight 1.0`（BM25 主导），等于把两种量纲不同的分数直接加权（`git show 4aa8f3df^:…/HybridSearchService.java` 第 89-125 行）。之后改成两路独立召回 + RRF 只看名次 + gte-rerank-v2 精排。同一提交还加了索引别名重建和堆内存背压。
2. **上下文检索与父子检索（1e36fa56，2026-09-24）**。
3. **可靠性一轮升级（1b5c78da，2026-10-07）**，对照的是 2026-10-06 面试文章，详见计划文档 P0、P1：
   - 上传消费原来不清旧数据、`document_vectors` 没唯一键，Kafka 重试会插重复分块；本地库升级前一个文件的 7 个分块各存了 5 份（1 次投递 + 4 次重试）。改成租约认领 + 先清后写 + 唯一键。
   - `chunk_info` 唯一键原来不含 userId，两个用户同时传同一文件，一方合并会删掉另一方的分片；改成按用户隔离（`LegacySchemaMigration` 处理老库）。
   - 合并完成原来是普通 `save()`，改成 MERGING → COMPLETED 条件更新。
   - 原来全项目没有 `@Scheduled`、bitmap 不过期；新增卡住任务恢复、废弃上传清理、bitmap 48 小时 TTL。
   - 原来合并写 COMPLETED 后才发 Kafka，发送失败没人管，消费端没设 read_committed，死信没人消费；改成 outbox + read_committed + 死信落库告警。
   - 原来限流是 INCR + EXPIRE 两条命令的固定窗口，非原子，进程在两条命令之间崩溃会留下永不过期的 key；改成 Lua 令牌桶。
   - Embedding 原来固定 1 秒间隔重试 3 次（`Retry.fixedDelay(3, 1s)`），LLM 流式没有超时和重试、每次新建 WebClient；统一改成 `ModelCallGuard`。
   - yml 里 `rate-limit.llm-request`、`rate-limit.embedding-batch` 两段没绑定任何配置类，已删除。
4. **上线事故修复（521369a8，2026-10-07）**：第一次发布后，恢复任务把生产上 29 个升级前就卡在 PROCESSING 的历史文件（4 月到 9 月）全部重投；大文件每次 LiteParse 约 4 分钟，又因余额不足失败，Kafka 整份重试 5 次，单消费线程被占约半小时，新上传排在后面。最终 15 个成功、14 个余额不足进死信。修复三处：没有 `processing_started_at` 的遗留任务直接 FAILED 不重投；余额不足不重试不进死信；知识库页面状态从 3 秒轮询改为 Redis 频道 + WebSocket 推送（轮询降为兜底，WebSocket 正常 30 秒、断开 5 秒）（计划文档:94-99）。
5. **请求级截止时间与 Kafka 拉取参数（85cc9f7f，2026-10-10）**：原来 ReAct 每轮各自 120 秒，4 轮加最终回答最坏要等好几个 120 秒；改成整个请求共用 120 秒预算，检索、rerank 都取自身超时和剩余时间的较小值。一开始第 1 轮也检查剩余时间，40 秒预算实测时模型一次没检索就答“暂无相关材料”，所以改成第 1 轮总是带工具。原来 `max.poll.records`、`max.poll.interval.ms` 用客户端默认（500 条、5 分钟），LiteParse 300 秒 + 等许可 120 秒可能超过 5 分钟触发再均衡；改成 1 条、与心跳超时 600 秒对齐（计划文档:105-118）。
6. **rerank 阈值 0.2 → 0.1（bba1e88d，2026-10-11）**：阈值 0.2 时 8 道口语化改写题全部返回 0 条，gte-rerank-v2 给它们正确分块只打 0.14 到 0.19 分。数据见 10.4 表 01 → 02。注意该提交说明里写的是文件级数字（Recall@5 78.3% → 100%、MRR 0.73 → 0.93），评委模型也写错成 deepseek-flash，后者在 e338dff0 里更正为 deepseek-v4-pro。
7. **文件级 → 分块级命中标准（e338dff0，2026-10-11）**：同一批结果文件级 Recall@5 100%、分块级 76.1%，差 24 个百分点，原因是一份 PDF 占了大部分分块，召回同文件任何一块都算对。MRR 从文件级 0.93 变成分块级 0.59。只按文件标注时有 5 到 7 道题被判成“检索命中但答错”（PROMPT_OR_MODEL），换成分块级后全部变成“检索未命中”，即同一文件里的错误分块。同一提交加了空输出重试，失败用例从 3 降到 0。
8. **`.env` 污染测试（04e83fc7，2026-10-11）**：`DotenvEnvironmentPostProcessor` 把 `.env` 以操作系统环境变量的优先级加载，压过 `application-test.yml`，测试上下文连到了本地 MySQL 而驱动仍是 H2；改成 test profile 下不加载 `.env`。
9. **MISS_BUT_CORRECT 一律人工复核（6791381a，2026-10-13）**：来自 10.5 的 B 层结论。
10. **检索打分第三轮（6b730153，2026-10-13）**，对照字节 Agent 面试文章 02、03、04 题：
    - 原来两路用 `CompletableFuture.allOf(...).get(timeout)` 一起等，任一路失败就整体退到 TEXT_ONLY，另一路结果被丢；改成各自等待，单路失败标 BM25_ONLY / KNN_ONLY。
    - 原来 RRF 兜底不做任何过滤；新增 `rrf-score-threshold`。用 `scripts/eval_rrf_threshold.py` 拿报告里的 RRF 候选离线模拟，发现 RRF 前 5 名几乎全是两路共同召回的（原始分 0.026 到 0.033），0.0164 以下的阈值什么都过滤不掉；相关分块最低 0.029，和无答案题大面积重叠。取 0.028：分块级 Recall@5 不变（80.4%），无答案题平均返回 5 条降到 4 条；超过 0.030 召回率明显下降。关掉 rerank 实测无答案题返回 5 / 4 / 2 / 5 条，与模拟一致。
    - 原来出口分数三种量纲混用（rerank 约 0 到 1、RRF 约 0.0048 到 0.0328、BM25 无上界）且原样写给模型和引用；改成固定上界换算 + rawScore。`withParentContext` 复制时原来会丢掉 rawScore，聊天实测时发现并修复。
    - 原来 ES 没有文件名字段，文件名检索后从 MySQL 关联，不参与打分；新增 IK 字段 `fileName` 并回填。评测：所有组合最终 Recall@5 都是 76.1%（最终顺序由 rerank 决定），差异只在 BM25 一路；`minimum_should_match` 30% 让 3 道口语化长问句的相关分块掉出 BM25 前 50，召回阶段 Recall@50 从 100% 降到 97.8%，默认不开；短语加分 1.5 没有可测量的影响；文件名权重 2 时 BM25 MRR 0.591 → 0.560（本地文件名 paismart.pdf 这类不具描述性，加权会把同一文件所有分块一起抬高），取 0.5（BM25 MRR 0.587）。
    - 评测新增 NDCG@K、Precision@K、分阶段指标和 `retrievalOnly`。
    - 局限：评测集里没有“按标题找文档”的问题，文件名加分的收益没法量化；本地开发库旧索引里的 `fileName` 早先被动态映射成标准分词，本地评测是在标准分词上做的（计划文档:146）。

---

## 十二、现有差距

面试答案如果按期望方案写，下面这些地方会超出源码，写稿时要分清“现状”和“应该怎么做”。

1. **评委和被评回答是同一个模型**：生成和评委都走 `llmProviderRouter.completeReActTurn`（service/eval/RagEvalCaseRunner.java:206-237,275-280），没有 `eval.judge-provider` 之类的配置。交叉评审已经显示模型间会同向偏宽松（10.5）。计划文档:160-162 列为待办。
2. **评测没接入发布流程**：只能管理员手动调 `POST /api/v1/admin/eval/run`（RagEvalAdminController.java:58），前后对比靠手动跑 `scripts/eval_compare.py`；`scripts/deploy-release.sh`、`deploy_release.py` 里没有评测环节，指标退化不会拦截发布（计划文档:163-165）。
3. **评测检索占用管理员的 Embedding 查询限流，降级不告警**：评测以管理员 id 作请求方（RagEvalAdminController.java:168-173 → HybridSearchService.java:154），计入每用户 60 次 / 分钟、5000 次 / 天的查询限流（RateLimitService.java:58-62）；超限后查询向量生成失败，检索退成 BM25_ONLY。报告只统计 `retrievalModeCounts`（EvalReportAggregator.java:34,72），出现非 HYBRID 模式不告警（计划文档:166-168）。
4. **rerank 不在统一治理里**：RerankClient 每次新建 WebClient，没有重试、熔断、并发上限、QPS 限流（client/RerankClient.java:63-73）；失败只能退到 RRF。`DeepSeekClient.summarize`（`generate_summary` 工具）同样不走 `ModelCallGuard`，也没接请求截止时间（client/DeepSeekClient.java:47-54,106-165,212）。
5. **rerank 后的效果还不如 RRF**：RRF 兜底分块级 Recall@5 80.4%，rerank 后 76.1%；精排 NDCG@5 0.545，召回阶段 Recall@50 已经 100%（10.4）。阈值 0.1 全局固定，无答案题 rerank 分 0.18 到 0.30 与口语化正确分块 0.14 到 0.19 重叠，拒答只能靠提示词。
6. **RRF 不加权、BM25 参数未调**：两路权重固定为 1（RrfFusion.java:48）；k1、b 用 ES 默认值；mapping 里没有自定义 similarity。
7. **同一文件多用户共享索引数据**：ES 文档 id 是 `fileMd5_chunkId`（VectorizationService.java:184），`document_vectors` 唯一键是 `(file_md5, chunk_id)`（DocumentVector.java:17），`clearIndexedData` 按 fileMd5 删（DocumentService.java:269-271），都不带 userId。两个用户上传同一个文件时，后处理的一方会覆盖 ES 里的 userId、orgTag、public。`deleteDocument` 也按 fileMd5 删除所有用户的 ES 数据、`document_vectors`、`chunk_info` 和 `file_upload` 记录（DocumentService.java:118-184），计划文档:89 记为未改。
8. **Token 配额计数器仍是非原子固定窗口**（请求限流和模型 QPS 已换成 Lua 令牌桶，这两处没换）：全局 Token 预算 `reserveGlobalRollingTokens` 是 INCR → 首次 EXPIRE → 超限再 INCR 负数回滚（service/UsageQuotaService.java:317-343）；每日配额 `reserveDailyTokens` 同理（:303-315）。余额模式只做 GET 检查、结算时扣减，并发下余额可能为负（UserTokenService.java:130-178）。
9. **Kafka 重试与客户端重试叠加**：消费端 3 秒 × 4 次的任务级重试不区分模型错误，最坏一批分块调 5 × 3 次模型（KafkaConfig.java:169；计划文档:88）。
10. **单消费线程、单分区**：每实例 1 个消费线程、topic 默认 1 个分区（KafkaConfig.java:159-175；yml:58），大文件解析会阻塞后续文件，521369a8 的事故就是这个原因放大的。
11. **切块按字符不按 token**：512 / 100 / 100 都是 `String.length()`，入库分块可能超过 512（第四节）；子块逐条 save；父块大小 1048576 只在 `@Value` 默认值里，非 PDF 父块之间没有重叠（ParseService.java:57,205,296）。
12. **上下文检索、引用校验、冲突 LLM 确认默认都关**（yml:260,288,443），评测数据都是在关闭状态下跑的。
13. **没有独立的查询改写模块**：没有 HyDE、多查询改写或查询分解，全靠模型在 ReAct 里构造 query（6.7）。
14. **ES mapping 的 `isPublic` 与实际字段 `public` 不一致**：模板声明 `isPublic`，文档实际写入 `public` 并靠动态映射（第五节 5.2）。
15. **资源访问没有组织层级继承**：检索时子组织成员能看上级组织文档，但 `OrgTagAuthorizationFilter` 对单个资源只认 JWT 里直接包含的标签（config/OrgTagAuthorizationFilter.java:317-323），两处规则不一致。
