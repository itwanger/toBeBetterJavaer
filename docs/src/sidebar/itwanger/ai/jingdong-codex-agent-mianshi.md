---
title: JD员工：同事觉得电脑写代码太卡，让我用Codex帮他修，结果不小心看到了他正在写的辞职信还有已经到手的offer，该不该跟领导说呢（附Agent面试题）
shortTitle: 京东Agent面试5问
description: 京东员工用 Codex 帮同事修电脑看到辞职信与 offer 引发热议，深入拆解 5 道生产级 Agent 工程面试题，涵盖长上下文与 MCP 子进程治理、多租户与沙箱资源划分、千级并发沙箱调度、服务重启状态恢复与长周期行为漂移纠正。
keywords:
  - Agent 面试题
  - 多租户隔离
  - 沙箱调度
  - 会话状态恢复
  - 行为漂移
tag:
  - 面试
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-10-19
---

大家好，我是二哥呀。

刷到一位老哥的帖子，同事觉得电脑写代码太卡，喊他过去用 Codex 帮忙排查，结果在电脑里不小心看到了同事正在写的辞职信，还有已经到手的下家 offer。

![](https://cdn.paicoding.com/stutymore/sucai-20261019095439.png)

要我说，这种事连半秒钟都不用犹豫，直接把嘴闭严实，出了门就把刚才看到的画面忘掉。

人家把电脑交给你排查，是因为拿你当信得过的同事。在正式发起离职审批之前，跳槽和 offer 属于个人最敏感的职场隐私。这时候跑去跟领导透风，且不说领导会不会觉得你爱打小报告，万一出点波折，纯粹是损人不利己。帮人把电脑卡顿的问题解决掉，顺手把窗口关好，一句多余的话都别提，这是职场里最让人舒服的分寸感。

聊聊 JD，这两年他们在 AI 和 Agent 方向落地的东西其实不少。平时大家聊起大模型，声音大多集中在阿里、字节、鹅厂还有智谱、DeepSeek、Kimi 这些厂，JD 对外宣传不算高调，但它的核心护城河在自营零售数据、仓储物流网络和供应链履约体系，这些重度业务流恰恰最需要 Agent 去串联。

![JoyAgent 官方开发平台](https://cdn.paicoding.com/stutymore/jingdong-codex-agent-mianshi-official-joyagent-20261019102411-233888f0.png)

底层模型方面，JD 有言犀（JoyAI）系列大模型，覆盖了语言模型 JoyAI-LLM Flash、图像编辑模型 JoyAI-Image-Edit、具身模型 JoyAI-RA 以及工业大模型 JoyIndustrial。内部研发有 JoyCoder 编码助手，平台侧有 JoyAgent 和开源的 JoyAgent-JDGenie，支撑采销决策、智能客服和物流履约等复杂场景。

好，接下来继续上我们的硬菜，仍然是 Agent 有关的题目。

不知不觉，已经 10 月下旬了，今年也只有两个月时间了，每年到这个时候，就会有无限的感慨，时光飞速啊。

## content

### 01、你的Agent项目遇到过最大的工程挑战是什么？怎么解决的？

“我在做终端代码 Agent 项目 PaiCLI 的时候，遇到的最大工程挑战是长周期自主执行下的上下文急剧膨胀与本地内存开销失控。”

“刚把 ReAct 循环搭起来的时候，执行 `grep_code` 搜索代码库或者运行 `execute_command` 跑单元测试，单次工具调用动辄返回几万个字符。多跑几轮之后，上下文窗口迅速被塞满，而且早期有个隐蔽的内存坑，每轮请求都会把完整的对话历史先调用 `toString()` 拼成一个巨大的 JSON 字符串，再交给 OkHttp 转成 UTF-8 字节数组。实测在约 1M token 的长上下文（350 万字符代码）加上 3 张 1MB 截图的场景下，请求体本身只有 7.9MB，但单次请求在 JVM 堆里分配了 90.5MB 的临时内存，在 G1 垃圾收集器里直接成为巨型对象，频繁引发 GC 抖动。”

![PaiCLI 仓库历史测试记录，本次未复测](https://cdn.paicoding.com/stutymore/jingdong-codex-agent-mianshi-memory-record-20261019102411-f29823b7.png)

“为了把上下文体积和堆内存同时降下来，我在上下文入口做了三档渐进式压缩，又在网络出口重写了请求体序列化。单次工具输出一旦超过 32000 个字符，卸载器会直接把完整结果写进 `.paicli/tool-outputs/<session>/` 目录下的独立文件，上下文里只保留文件路径、开头 2000 个字符和结尾 800 个字符的预览。随着对话继续推进，当 token 数触及阈值时，清理器会把除最近 3 条之外的旧 `tool` 消息正文替换成 `[已清理的旧工具结果]` 占位符，同时保留 `tool_call_id` 维持消息配对。等到上下文真正逼近窗口上限（比如 200k 窗口在约 167k token 时触发），才启动摘要压缩，保留最近 3 个完整用户轮次，把更早的历史按 60000 个字符分块生成结构化摘要。而在网络发送端，我自定义了 OkHttp 请求体，用 Jackson 的生成器直接把内存里的 JSON 语法树写进网络输出流，先往一个计数的空输出流写一遍拿到 `Content-Length`，再原样写出字节，单次请求的内存分配直接从 90.5MB 降到了 4.7MB。”

```java
// src/main/java/com/paicli/llm/JsonRequestBody.java:46
@Override
public synchronized long contentLength() throws IOException {
    if (contentLength < 0) {
        CountingOutputStream counter = new CountingOutputStream();
        write(counter);
        contentLength = counter.count;
    }
    return contentLength;
}

@Override
public void writeTo(BufferedSink sink) throws IOException {
    write(sink.outputStream());
}

private void write(OutputStream out) throws IOException {
    // 不能让 Jackson 关掉 OkHttp 的输出流，否则请求体后面就写不进去了
    try (JsonGenerator generator = MAPPER.getFactory().createGenerator(out)
            .disable(JsonGenerator.Feature.AUTO_CLOSE_TARGET)) {
        MAPPER.writeTree(generator, body);
    }
}
```

#### 外部MCP子进程崩溃或卡死时怎么保证主流程不挂？

“本地 MCP 服务大多是通过 `npx` 或 Python 启动的 stdio 子进程，早期只要子进程往标准输出打印了一行非 JSON 的调试日志，JSON-RPC 读线程捕获异常就会直接退出，导致后续所有调用卡死在 60 秒超时；更糟的是子进程发生死锁时就会不响应，或者 JVM 异常退出时残留 `node` 孤儿进程。”

![](https://cdn.paicoding.com/stutymore/jingdong-codex-agent-mianshi-mcp-20261019102412-ff3aea73.png)

“针对这个问题，我把 stdio 读循环改成了单行隔离解析，遇到非 JSON 行直接写入容量 200 行的 stderr 环形缓冲区并跳过，保证读线程绝不退出；同时区分消息里是否包含 `method` 字段，防止把服务端发来的 `ping` 请求误当成客户端请求的响应而发生 ID 串号。对于子进程崩溃和假死，服务管理器一方面通过 `Process.onExit()` 监听进程退出，另一方面每 30 秒对空闲的本地 stdio 服务发一次 `ping`（正在处理长耗时工具调用的跳过，避免误杀单线程服务），连续 2 次不回就判定为卡死。”

```java
// src/main/java/com/paicli/mcp/McpServerManager.java:662
private synchronized void onServerDied(McpServer server, McpClient client, String reason) {
    if (server.client() != client) {
        return; // 已经被主动关闭或换成新进程，旧进程的退出不用管
    }
    boolean wasStable = server.uptime().compareTo(STABLE_UPTIME) >= 0;
    unregisterTools(server);
    server.close();
    server.status(McpServerStatus.ERROR);
    server.errorMessage(reason);
    notices.add("⚠️ MCP server " + server.name() + " 断开：" + reason);
    scheduleRestartOrGiveUp(server, reason, wasStable);
}
```

“一旦确认子进程退出或卡死，管理器立刻从工具注册表卸载该服务的工具，调用 `ProcessHandle.descendants()` 拿到整棵子进程树，先关闭标准输入等待 1 秒，再从叶子进程开始依次发送终止信号，2 秒后强制清理，随后按 1 秒、2 秒、4 秒做指数退避自动重启；如果稳定运行超过 60 秒后再次崩溃，重启计数会自动清零，连续 3 次都没救回来才彻底停下并提示用户手动排查。每次启动子进程时还会把进程 PID、启动时间戳和命令行写入 `~/.paicli/mcp-pids.json`，下次启动时先核对并清理上次遗留的孤儿进程。”

### 02、多租户场景下，Agent怎么做隔离？模型资源和沙箱资源怎么划分？

“多租户隔离要顺着请求进入系统的路径，把数据存储与检索、模型调用配额、代码执行沙箱全部隔开，任何一处共享出问题都会导致跨租户数据泄露。”

“最基础的是知识库数据与会话上下文的隔离。在派聪明里，我们遇到过不同用户上传同一份 PDF 文档（文件 MD5 相同）导致索引互相覆盖和被连带删除的问题。为了彻底隔离，MySQL 的分块向量表把唯一键设成了 `(file_md5, user_id, chunk_id)`，Elasticsearch 文档 ID 拼接为 `fileMd5_userId_chunkId`，MinIO 临时分片路径也带上用户 ID 存放在 `chunks/{userId}/{fileMd5}/{chunkIndex}`。在线问答发起混合检索时，系统先从 Redis 读取当前用户缓存的有效组织标签集合（包含当前组织、递归上级组织以及默认公共标签），然后在 Elasticsearch 的 BM25 布尔过滤器和 2048 维向量 KNN 的预过滤器（pre-filter）里同时注入权限条件，要求命中文档必须满足属于当前用户私有、标记为公开、或者组织标签在用户有效标签列表内这三项中的至少一项。把权限过滤放入 KNN 预过滤内部，能保证向量近似最近邻搜索在召回候选阶段就只扫描当前租户有权访问的文档，杜绝先召回再过滤把结果置空或者跨租户的数据串联。”

```java
// src/main/java/com/yizhaoqi/smartpai/service/HybridSearchService.java:406
public static Query buildPermissionFilter(String userDbId, List<String> userEffectiveTags) {
    return Query.of(q -> q.bool(b -> {
        b.should(s -> s.term(t -> t.field("userId").value(userDbId)));
        b.should(s -> s.term(t -> t.field(EsDocument.FIELD_PUBLIC).value(true)));
        if (userEffectiveTags != null && !userEffectiveTags.isEmpty()) {
            b.should(s -> s.terms(t -> t.field("orgTag")
                    .terms(tv -> tv.value(userEffectiveTags.stream()
                            .map(co.elastic.clients.elasticsearch._types.FieldValue::of)
                            .toList()))));
        }
        return b.minimumShouldMatch("1");
    }));
}
```

#### 单个租户批量跑后台任务时，怎么防止把在线问答的模型配额占满？

“数据隔开之后，紧接着就是模型资源争抢的问题。不同租户共用底层的大模型 API 和向量化接口，如果某个租户一次性上传几十份大文档触发后台批量向量化，或者跑离线评测，很容易把供应商的 QPS 和 Token 配额占满，导致其他租户的在线实时问答全部报 429 限流。”

![](https://cdn.paicoding.com/stutymore/jingdong-codex-agent-mianshi-quota-20261019101945-e776c5ae.png)

“我们在模型资源划分上做了租户级配额加流量优先级预留。接入层用 Redis Lua 脚本实现原子令牌桶，按用户限制聊天频率和向量查询频率，同时在账户表维护每个租户独立的 LLM 与 Embedding Token 余额，扣减超限直接抛出余额不足异常并跳过重试。到了底层的模型调用治理层，我们按调用范围与供应商建立独立的 Resilience4j 并发上限控制和熔断器，并在 QPS 令牌桶上把请求划分为在线和后台两个优先级。”

```java
// src/main/java/com/yizhaoqi/smartpai/client/resilience/ModelCallRateLimiter.java:50
String key = "model:qps:" + scope + ":" + provider;
double reserve = priority == ModelCallPriority.BACKGROUND ? qps * clampRatio(config.getOnlineReserveRatio()) : 0D;
if (tryAcquire(key, qps, reserve).allowed()) {
    return;
}

boolean online = priority == ModelCallPriority.ONLINE;
Semaphore waiters = online ? onlineWaiters : backgroundWaiters;
if (!waiters.tryAcquire()) {
    throw new RateLimitExceededException("模型调用排队已满，请稍后重试", 1L);
}
```

“当后台任务（文档解析向量化、上下文生成、离线评测）来申请令牌时，必须给在线请求留出 30% 的令牌余量（`onlineReserveRatio=0.3`）。一旦桶里的剩余令牌低于 30%，后台请求就拿不到令牌，只能进入后台有界等待队列；而在线问答可以使用全部令牌。面向企业级 SaaS 多租户时，还可以在这一层按租户等级挂载租户维度的并发信号量与加权公平队列，确保大租户突发流量不会挤占其他租户。”

![](https://cdn.paicoding.com/stutymore/jingdong-codex-agent-mianshi-sandbox-20261019101947-257242ae.png)

“至于代码与命令执行的沙箱资源划分，如果只是单机或内部受信工具，PaiCLI 采用的是轻量级进程沙箱。路径守卫会向上寻找最近存在的祖先目录解析真实物理路径，拦截通过软链接逃逸到工作区外的读写；启动子进程前先清空继承自父进程的环境变量，剥离所有的 `*_API_KEY`、`*_SECRET`、`*_PASSWORD`，只放入 `PATH`、`HOME`、代理和证书等白名单变量；执行命令时在 macOS 下用 Seatbelt、Linux 下用 bubblewrap 挂载只读根文件系统，仅放行当前租户的工作区目录可写，将 `HOME` 和 `TMPDIR` 重定向到工作区私有目录，并默认切断外部网络。但在多租户云端平台里，不同租户的 Agent 可能生成并执行完全不可信的代码，共用宿主机内核的 Linux namespace 或普通 Docker 容器存在内核漏洞提权风险。生产级多租户必须按会话或租户分配独立的轻量级微虚拟机（如 Firecracker MicroVM）或 Kata Containers 安全容器，每个沙箱拥有独立的客户机内核与虚拟网卡，底层通过 Linux cgroup 严格划分单沙箱的 CPU 时间片、内存硬上限、最大进程数以及块设备 IOPS 和磁盘空间配额，网络出口统一经过宿主机侧的 eBPF 过滤与白名单代理，彻底阻断沙箱之间的横向探测与宿主机元数据访问。”

### 03、如果并发1000个沙箱实例，你怎么设计资源池和调度策略？

“并发 1000 个沙箱实例时，最先碰到的瓶颈是冷启动延迟。如果每次收到 Agent 的代码执行请求才去拉取镜像、启动微虚拟机、初始化 Python 或 JVM 运行时，单次启动就要花掉几秒到十几秒，ReAct 循环根本没法交互。所以资源池必须设计成‘预热池（Warm Pool）+ 休眠池（Paused Pool）+ 冷镜像模板’的三级结构。”

![](https://cdn.paicoding.com/stutymore/jingdong-codex-agent-mianshi-pool-20261019102413-9bc27064.png)

“具体做法是把装好常用编译工具链、基础依赖包的环境预先启动，做成内存快照加磁盘基础镜像（Base Image）。宿主机集群在预热池里常驻一批已经启动完毕、挂载了独立 OverlayFS 的空白热实例，Agent 发起会话请求时，调度器直接从预热池里划拨一个现成实例，通过写时复制（Copy-on-Write）绑定租户工作区，整个分配耗时控制在 100 毫秒以内。控制器在后台实时监控预热池余量，一旦空闲热实例低于设定水位，立刻异步通过 Firecracker 内存快照克隆技术批量补充新实例，避免高峰期把预热池掏空。”

#### 沙箱在等待大模型推理的空闲期怎么省内存？任务结束后怎么安全回收？

“如果 1000 个沙箱每个分配 2 核 CPU 和 2GB 内存，全部常驻内存就要吃掉 2TB 物理内存，但 Coding Agent 的负载有很强的潮汐特征。Agent 在一个会话里，大部分时间都在等待大模型流式输出或者等待用户确认，真正执行编译和跑测试满载运行的时间只占整个会话周期的 10% 到 20%。如果让空闲沙箱一直占着物理内存，资源浪费极大。”

![](https://cdn.paicoding.com/stutymore/jingdong-codex-agent-mianshi-idle-20261019102413-b0691696.png)

“针对这种潮汐特性，调度策略的核心是‘会话亲和（Session Affinity）+ 闲置自动冻结（Auto-Pause）’。同一个会话 ID 的连续工具调用，由网关按一致性哈希或路由表固定分发到同一台宿主机的同一个沙箱实例上，这样前一步下载的依赖包、Maven 本地构建缓存和修改了一半的工作区文件都在原处，不需要跨节点反复同步。一旦某个沙箱执行完当前命令，进入等待大模型推理或等待用户输入的空闲状态，计时器开始倒计时；只要连续空闲超过 60 秒，宿主机代理就调用 cgroup freezer 暂停进程，并将微虚拟机的内存状态增量转储到高性能本地 NVMe 盘上，把实例移入休眠池，立刻释放出物理内存供其他活跃沙箱使用。等大模型下一轮生成了新的 `execute_command` 调用，调度器从本地磁盘恢复内存状态继续执行。”

### 04、服务重启后，Agent的会话状态怎么恢复？状态存在哪？

“服务重启后能无缝恢复的前提，是把应用实例做成彻底无状态的，把Agent的运行状态拆分为已完成的对话历史、正在执行中的任务进度、以及工作区的文件状态三部分分别持久化。”

“对于已完成的对话历史，如果是云端多租户架构，派聪明采用的是 MySQL 加 Redis 双写存储。每轮问答结束时，先往 MySQL 的 `conversations` 表写入完整的用户问题、模型回答以及序列化成 JSON 的分块引用映射，落库成功后再往 Redis 的 `conversation:{conversationId}` 列表写入最近 20 条热数据并设置 7 天过期时间。服务重启后，多轮对话优先从 Redis 读取最近 6 条历史拼进提示词，哪怕 Redis 缓存过期或丢失，也能直接从 MySQL 兜底查出完整上下文。如果是终端或本地形态的 Agent，PaiCLI 用的是只追加的本地文件，把每一条原始消息实时追加写入 `~/.paicli/history/raw/<session>.jsonl`。因为运行中途可能触发过上下文压缩或清理，直接重放全部历史会和重启前模型看到的窗口不一致，所以每次修改内存里的对话历史后，都会立刻追加一条 `view_checkpoint` 记录；重启后执行 `/resume` 恢复会话时，直接定位到最后一条 `view_checkpoint` 还原压缩后的基准视图，再重放它后面的增量消息，就能一字不差地恢复重启前的上下文。”

![](https://cdn.paicoding.com/stutymore/jingdong-codex-agent-mianshi-recovery-20261019103021-8fb855d0.png)

“更棘手的情况是服务重启恰好发生在任务执行到一半的时候，比如后台正在做大文档解析向量化，或者多步 Agent 刚执行完第 2 步。为了恢复这类半途中断的任务，我们在数据库里设计了带持有凭证和心跳的租约状态机。以派聪明的异步文档处理为例，`file_upload` 表除了记录状态，还维护了认领时间戳 `processing_started_at`、心跳时间戳 `heartbeat_at` 和重试次数 `retry_count`。消费者认领任务时写入当前时间作为持有凭证，每处理完一批分块的向量化并写入 Elasticsearch，就带着这个凭证去刷新一次数据库心跳。”

```java
// src/main/java/com/yizhaoqi/smartpai/service/reliability/FileProcessingRecoveryJob.java:83
if (file.getRetryCount() >= properties.getMaxRetries()) {
    String message = String.format("处理超时，已自动重试 %d 次仍未完成，请手动重试", file.getRetryCount());
    if (fileUploadRepository.failStaleVectorization(file.getId(), file.getHeartbeatAt(), message, now) == 1) {
        handled++;
        statusNotifier.notifyChanged(file.getId());
        logger.error("[ALERT] 向量化任务多次卡住，已标记失败: fileMd5={}, fileUploadId={}, retryCount={}, lastHeartbeat={}",
                file.getFileMd5(), file.getId(), file.getRetryCount(), file.getHeartbeatAt());
    }
    continue;
}

Boolean requeued = transactionTemplate.execute(status -> {
    if (fileUploadRepository.requeueStaleVectorization(file.getId(), file.getHeartbeatAt(), now) == 0) {
        return false;
    }
    outboxService.append(buildRetryTask(file));
    return true;
});
```

“恢复任务在扫描到卡死记录后，会用扫描时看到的心跳时间戳作为乐观锁条件去更新数据库，这样即便多实例同时扫描也只有一个实例能抢占成功；随后在同一个数据库事务里把文件状态改回待处理、`retry_count` 加 1，并往 `file_processing_outbox` 本地消息表插入一条重投记录。对于 Plan-and-Execute 或状态图这类多步编排任务，同样需要在每完成一个子任务节点后，把整个 DAG 任务图的节点状态、每个已完成节点的输出摘要持久化到数据库的 Checkpoint 表里。服务重启后读取最新的 Checkpoint，已经成功的节点直接跳过，从中断前处于‘执行中’的那个节点重新拉起。”

#### 如果重启恰好发生在工具执行中途，怎么防止副作用重复执行或文件写坏？

“从中断节点重新拉起时，如果中断的那一步是纯只读查询（比如 `search_knowledge` 或 `read_file`），直接重新执行一遍没有任何问题；但如果那一步正在修改本地代码文件，或者正在调用外部系统创建订单，盲目重跑就会造成文件改乱或者重复下单。”

![](https://cdn.paicoding.com/stutymore/jingdong-codex-agent-mianshi-idempotency-20261019103022-a64cede5.png)

“为了解决副作用和脏数据，需要按操作类型做两手准备。对于在线问答和外部 API 调用，派聪明用 `chat:request:{userId}:{sha256(会话+问题)}` 生成请求级幂等键，前端在连接闪断或重启恢复后发送带 `generationId` 的 WebSocket `resume` 帧，可以直接接回正在进行或刚完成的流并补齐已生成内容；如果是调用外部写接口的工具，必须把 `sessionId + stepId + toolCallId` 拼成确定性的业务幂等键传给下游服务，由下游保证同一幂等键只执行一次。而对于本地工作区的文件修改，PaiCLI 靠的是独立于用户项目 `.git` 之外的快照机制，在 `~/.paicli/snapshots/<父目录哈希>/<项目路径哈希>/.git` 里维护一个影子仓库，每个顶层轮次开始前同步执行一次 `PRE_TURN` 快照。万一进程在修改多个文件的中途崩溃重启，恢复会话时先调用 `restorePreTurn` 把工作区所有已跟踪文件还原到本轮开始前的干净状态，清理掉写了一半的脏文件，然后再重新执行这一轮指令，确保磁盘文件状态和对话账本完全一致。”

### 05、长周期任务中，Agent容易行为漂移，你怎么检测和纠正？

“要防住因为记忆冲淡引起的漂移，需要把目标约束从容易被压缩的对话历史里拎出来，放到不可压缩的位置并做结构化校验。在 PaiCLI 的提示词组装器里，安全策略、模式守则和项目级规范（`PAI.md`）固定拼在系统提示词里，每一轮调用模型都会全量注入，不参与任何对话压缩。遇到复杂长任务时，先经过 Plan 模式生成带依赖关系的 JSON 任务图，由拓扑排序和环检测校验通过后，每一步把已完成节点和当前待办节点显式传给模型，当成外部进度看板。即便对话过长触发了历史摘要压缩，压缩器也会强制要求生成的摘要必须按顺序包含‘当前目标与成功条件、用户要求与已确认决定、已完成工作及证据、未解决问题与下一步’四个固定要素；代码里会对生成的摘要做结构校验，一旦发现漏掉了任何一个要素，先自动调用一次模型修复格式，要是还缺就直接放弃本次压缩。”

![](https://cdn.paicoding.com/stutymore/jingdong-codex-agent-mianshi-drift-20261019103023-00de5332.png)

“在 PaiCLI 里，只要模型调用了 `write_file` 或 `edit_file` 修改了 Java 代码，后置钩子会立刻自动触发 JavaParser 做语法诊断，在下一轮调用模型前把最多 20 条 `[LSP 诊断注入]` 组装成 user 消息放入上下文，提醒模型先把眼前的语法错误修好，防止它带着编译不过的代码继续往下跑。”

### PaiCLI 如何写到简历上？

**项目名称**：PaiCLI 终端与云端代码 Agent 工具

**项目简介**：对标 Claude Code 的 Java 版命令行代码 Agent，支持 ReAct、Plan-and-Execute、Multi-Agent Team 三种执行模式，涵盖代码检索、局部文件编辑、MCP 协议接入、独立 Git 快照回滚与自动化基准评测。

**技术栈**：Java 21、Spring AI、OkHttp、JGit、JavaParser、SQLite、JSON-RPC 2.0（MCP 协议）

![](https://cdn.paicoding.com/stutymore/jingdong-codex-agent-mianshi-resume-20261019102611-eff9ffa6.png)

**核心职责**：

- 设计三档渐进式上下文压缩与流式请求体写出机制，单次工具输出超 32000 字符自动卸载落盘，超阈值依次清理旧工具结果并生成结构化摘要，结合 Jackson 流式网络输出流，1M token 长对话场景下单次请求 JVM 内存分配从 90.5MB 降至 4.7MB
- 实现多工具读写分离调度与影子 Git 快照回滚，限制 8 类只读工具最大 4 线程并发执行、写文件与命令工具严格按序串行，每轮执行前在独立目录生成 `PRE_TURN` 快照，彻底解决并发编辑丢失更新与改坏代码无法恢复的问题
- 手写 MCP 客户端与子进程生命周期守护，实现项目级配置 SHA-256 指纹信任校验、子进程环境变量白名单清洗、stdio 逐行解析容错、30 秒空闲心跳探测、1s/2s/4s 指数退避重启及整棵进程树清理，消除外部工具卡死与孤儿进程残留
- 结合只读与自动模式下的大模型审查分类器及 bubblewrap/Seatbelt 沙箱隔离工作区与网络，所有写操作与命令调用落盘 JSONL 审计日志
- 搭建长周期任务防漂移体系，利用编辑后 JavaParser 自动语法诊断注入；基于文件 SHA-256 增量索引、4 线程并行解析与每批 32 条批量向量化，1892 个源码文件全量索引耗时从 218.9 秒降至 128.7 秒，无改动增量校验仅需 0.8 秒

## ending

职场上最舒服的关系，就是彼此留一点余地，看破不说破。

今天的内容希望对你有所帮助，感觉很多技术深入下去，一个知识点就能讲很多。

而这也是 AI 发展带给我们最大的便利。

我们下期见。
