# 百度词元所（Token Exchange）与开源 Token 交易所架构调研

> 调研日期：2026-11-13｜调研对象：百度词元所官网（`https://cysuo.com`）、百度世界2026大会发布信息、模型指纹论文（arXiv:2607.10252 / arXiv:2410.20247）及开源网关源码（`QuantumNous/new-api`、`songquanpeng/one-api`、`maximhq/bifrost`、`BerriAI/litellm`、`higress-group/higress`、`tensorzero/tensorzero`）。

---

## 1. 百度词元所（Token Exchange）一手产品事实

### 1.1 发布背景与规模数据
- **发布时间与场合**：2026 年 11 月 12 日，李彦宏在「百度世界2026」大会开幕式正式发布大模型交易平台「词元所」（英文名 `Token Exchange`，Slogan：「词元所 大模型的交易所 / 上词元所 用可信的Token」）。
- **官网地址**：`https://cysuo.com`（同步对话与生图 API 网关：`https://api.cysuo.com`，广州地域；异步视频 API 网关：`https://vod.bj.baidubce.com`，北京地域）。
- **官方披露规模数据**：
  - 百度世界2026大会披露（上线一个月数据）：入驻供应资源超 **100 个**，日均调用次数突破 **5000 万次**，日均调用 Token 超 **7000 亿**。
  - 官网首页实时看板（截至 2026-11-13）：`200B+` 日均 Token 调用、`6千万+` 日均调用次数、`70+` 模型资源数。
  - 公开评测数据集（`cysuo.com/evaluations` RSC 数据，截至 2026-11-13）：共收录 **57 家供应商**、**38 款模型**、**146 个供应端点（Endpoint）** 与 **146 份信用评测档案**。

### 1.2 核心产品形态：类证券交易所的“订单簿（Orderbook）”模式
同一个标准模型 ID 下挂载多家不同供应商（包含模型原厂与第三方算力/云服务商），公开透明展示实时行情与履约指标：
- **示例 1：`deepseek-v4.1-flash`**（深度求索 2026-09-10 发布的 1M 上下文原生多模态 MoE 模型，支持 OpenAI / Anthropic 双协议，近 7 天调用量 3.3355 亿次）：
  - 博川科技（云服务，广州）：支持 OpenAI + Anthropic 协议，输入 `¥0.74` / 百万 Token、输出 `¥2.96` / 百万 Token（省 63%），首 Token 延迟 `970 ms`，吞吐 `94 token/s`，7 天成功率 `99.96%`，7 天调用量 `3.3 亿`。
  - 金灵狐（深圳）科技（云服务，广州）：仅支持 OpenAI 协议，输入 `¥0.8` / 百万 Token、输出 `¥3.2` / 百万 Token（省 60%），首 Token 延迟 `2116 ms`，吞吐 `18 token/s`，7 天成功率 `99.32%`，7 天调用量 `1.55 万`。
  - 同一款模型在不同算力供应商处，首 Token 延迟相差 2 倍以上，输出吞吐（`94 token/s` vs `18 token/s`）相差超过 5 倍。
- **示例 2：其他热门在售模型（截至 2026-11-13）**：
  - `glm-5.3-flash`：12 家供应商，输入 `¥0.52` 起 / 百万 Token，输出 `¥1.82` 起 / 百万 Token。
  - `kimi-k3`：4 家供应商，输入 `¥13.68` 起 / 百万 Token，输出 `¥68.42` 起 / 百万 Token。
  - `ERNIE-5.1`：1 家供应商，输入 `¥4` 起 / 百万 Token，输出 `¥18.00` 起 / 百万 Token。
  - 视频原厂入驻：可灵 AI（`kling-3.0-turbo` 等 12 个资源）、MiniMax（`MiniMax-H3` 等）、爱诗科技（PixVerse `v5.6`/`v6`）、生数科技（Vidu）。

### 1.3 词元所最值得学习的 5 个工程设计细节（源自 `cysuo.com/docs` 与公开评测数据）

1. **双模式路由（统一池化路由 + 供应商直连锁定）**：
   - 模式 A（API Key 绑定优先级 + 同级权重池）：在开发者中心为 API Key 添加多家供应商资源，配置**优先级（Priority）**与**权重（Weight）**。同一优先级内按权重分配流量，高优先级故障时按顺序降级到下一优先级。客户端调用统一入口 `https://api.cysuo.com/v1/chat/completions`。
   - 模式 B（URL 路径前缀锁定单一供应商）：每个供应商分配独立路径前缀，如 `https://api.cysuo.com/pd-1039`，客户端无需改代码，仅替换 `base_url` 即可锁定单一供应商做压测或定点采购。

2. **多原生协议直通 + 两层错误结构隔离（拒绝有损协议强转）**：
   - 同时暴露 OpenAI（`/v1/chat/completions`、`/v1/responses`）、Anthropic（`/v1/messages`、`/v1/messages/count_tokens`）、Gemini（`generateContent`、`interactions`）原生端点。如果某个供应商不支持该原生路径，直接返回 `40403 model not exist in this path`，不做静默降级转译（避免 Claude Code 的 `cache_control` / Thinking 块或 Codex 的 `Responses API` 状态在转译中丢失）。
   - 错误隔离：未通过网关自身校验时返回平台统一结构 `{requestId, code, message}`（如 `40100`、`40900`、`42900`）；一旦请求发往上游模型，上游返回的错误**原样透传**对应协议（OpenAI / Anthropic / Gemini）的原生 JSON 错误体，确保客户端 SDK 自带的重试与上下文压缩判断不被破坏。

3. **请求级防重放幂等控制（`X-Vod-Request-Id`）**：
   - 支持客户端传入 16～64 字符的 `X-Vod-Request-Id`，同一账号 **8 小时内重复使用同一 ID 直接返回 `409 Conflict (40900)`**，防止大模型长耗时场景下客户端超时盲目重试造成双倍扣费。响应头必返全局唯一任务单号 `X-Vod-Task-Id` 供对账排障。

4. **HTTP 流式中断与异常断流的 13 态精细计费表（`/docs/faq/http-interrupted-billing`）**：
   - 请求未发给上游前客户端断开：输入、输出均不计费。
   - 请求已发给上游但尚未收到首包时客户端断开：上游已执行 Prefill 计算，**输入按估算计费，输出不计费**。
   - SSE 流式输出中途断开（客户端主动断开或上游异常断流）：上游未返回末尾 `usage` 块时，按已完整刷出的内容兜底估算（不完整的最后一段残缺 chunk 不计费）；非流式请求若上游中途断流，网关返回 `500` 且双向不计费。
   - 兜底 Token 估算标准：纯文本/代码/工具参数统一用 `o200k_base` 分词器计数；图片固定 `520 tokens/张`；音频固定 `256 tokens/段`；视频固定 `8192 tokens/段`；非纯文本文件固定 `4096 tokens/个`。

5. **“准入承诺基线 + 黄金参考端点比对 + 五级动态征信 + 区块链存证”**：
   - 四大评定维度：**真实性**（`authenticity` 模型身份一致性综合分，满分 100）、**稳定达成**（成功率、错误率、超时率、P95 首 Token 时延、P95 端到端时延）、**性能容量达成**（最大稳定并发、TPM、RPM）、**能力达成**（代码任务通过率、标准答案正确率，并计算与 `isOfficialReference: true` 原厂黄金参考端点的偏差 `delta`）。
   - 五级信用评级：**优信（AAA）→ 良好（AA）→ 可信（A）→ 观察 → 冻结（C）**。以首次引入测评值作为 `promised` 履约承诺，定期复评更新，并将关键评定结果上区块链存证防篡改。
   - 真实案例验证：公开的 146 份测评档案中，`AAA` 128 个、`AA` 15 个、`A` 1 个、`C`（冻结）2 个；其中某供应商的 `kimi-k3` 端点首次准入承诺正确率为 `85.7%`，在复评时 `authenticity`（真实性）掉至 `0` 分、正确率掉至 `0%`，直接被平台打入 `C` 级冻结——直接印证了“上架时用真模型过审、半夜偷换假模型”的灰产套路必须靠持续复评拦截。

---

## 2. 模型验真与指纹比对技术方案调研（防“套壳/降级/掺假”灰产）

### 2.1 中转站常见的四种掺假手段
1. **整包偷换**：用户请求旗舰模型（如 `Opus 5.5`、`GPT-6.1 Sol`、`kimi-k3`），网关在后台把 `model` 字段静默改写成廉价模型（如 `Qwen-7B` 或 `Flash` 系列），再用前置 System Prompt 注入身份话术伪造自我介绍。
2. **按比例掺水（Mixture 混流）**：同一个渠道池里配置 20% 权重走真原厂节点应付抽查，80% 权重走廉价蒸馏模型赚取差价。
3. **激进低比特量化虚标**：宣称提供原生 `BF16` / `FP8` 精度，实际部署 `INT4` / `FP4` 量化权重，导致长链条工具调用 Schema 损坏、代码逻辑退化（OpenRouter 上的 `quantizations` 标签目前主要依赖供应商自申报而非网关强审计）。
4. **暗阉推理预算与缓存**：吞掉 `reasoning_effort` / `thinking` 参数，或打散请求导致 `Prefix Caching` 无法命中却按未命中原价向用户收费。

### 2.2 为什么传统 Benchmark 题库验真会失效？
- MMLU、GSM8K、HumanEval 等公开评测集早已被不良中转站录入规则库，一旦检测到题库特征字符串，中转网关立即把该条请求切回真原厂接口（“应试作弊”），普通业务流量继续走假模型。
- 传统评测单次需要生成数百至数千 Token，高频巡检成本高、耗时长。

### 2.3 核心技术方案一：单 Token 输出分布指纹（arXiv:2607.10252 + `mallochio/llm-fingerprint`）
- **论文出处**：Tomáš Bruckner, *"One Token Is Enough: Fingerprinting and Verifying Large Language Models from Single-Token Output Distributions"*, arXiv:2607.10252。
- **开源实现**：`mallochio/llm-fingerprint`（MIT 协议，Python）。
- **核心原理**：不同模型由于预训练语料先验、Tokenizer 词表切分以及后训练 RLHF 偏好的差异，在面对无约束的极简日常指令（如“说出一个 1 到 100 之间的随机整数”“说出一个随机的汉字”“你最喜欢的数字是什么”）时，其首个输出 Token 的概率分布极度不均匀且具有高度可复现的个体特征（例如很多模型对 `47`、`73`、`37` 的偏好比例截然不同）。
- **源码实现细节（核对自 `mallochio/llm-fingerprint`）**：
  - 探针矩阵（`batteries/v1/prompts.json`）：10 类日常微指令（随机数字、最喜欢的数字、随机字母/汉字、随机词、随机颜色、抛硬币等）× 4 种语言（英、俄、中、阿）构成 40 个测试单元（精简巡检仅需 8 个单元、约 100 次单 Token 请求，总消耗不到几千 Token）。
  - 采样参数：设 `temperature = 1.0`、限制单 Token 或极短输出，采集经验离散分布 $P$（待测供应商端点）与 $Q$（`isOfficialReference` 原厂黄金参考端点）。
  - 距离度量（`src/fingerprint/distance.py:jsd_base2`）：计算以 2 为底的对称 **Jensen-Shannon 散度（JSD）**，取值严格落在 `[0, 1]` 之间：
    $$D_{JS}(P \| Q) = \frac{1}{2} \sum_{x} P(x)\log_2 \frac{P(x)}{M(x)} + \frac{1}{2} \sum_{x} Q(x)\log_2 \frac{Q(x)}{M(x)}, \quad M = \frac{1}{2}(P + Q)$$
  - 判定阈值（`src/fingerprint/verify.py:verify`）：每个有效单元至少采样 `min_n = 10` 次，默认阈值 `tau = 0.05`；若平均 JSD $\le 0.05$ 判定为同一模型权重，跨模型家族或被替换后 JSD 通常高出一个数量级。
  - 混流审计（`src/fingerprint/verify.py:mixture_report`）：跨多个独立会话采样并比对最近邻参考模型，可直接揪出“真假模型按比例混流”的渠道。

### 2.4 核心技术方案二：双样本核统计检验（Stanford `Model Equality Testing`, arXiv:2410.20247）
- **论文与代码**：Irena Gao, Percy Liang, Carlos Guestrin (Stanford, ICLR 2025), *"Model Equality Testing: Which Model Is This API Serving?"*, arXiv:2410.20247，仓库 `irenasaracay/model-equality-testing`。
- **核心原理**：针对“模型家族对得上，但疑似被偷偷做了 INT4 量化或微调篡改”的灰盒场景，固定温度采样完整长输出，在 `model_equality_testing/src/algorithm.py` 中使用基于字符串汉明距离核的 **最大均值差异（MMD, Maximum Mean Discrepancy）** 或 $G^2$ 统计量做双样本置换检验（`two_sample_permutation_pvalue`，`b = 1000` 次 Bootstrap），输出统计学 $p$-value。当 $p < 0.01$ 时即可在统计意义上拒绝“待测端点与原厂参考权重一致”的原假设，精准识别隐蔽量化降级。

### 2.5 核心技术方案三：物理侧信道与协议能力探针（辅助交叉核验）
- **Tokenizer 边界探针**：利用特定生僻 Unicode 字符、特殊空白符与 `max_tokens=1` 截断位置验证底层 Tokenizer 词表是否与宣称模型一致。
- **速度—参数量物理侧信道（TPS vs TTFT 异常检测）**：显存带宽决定解码吞吐上限。若某供应商标称满血超大参数 MoE/Dense 模型，实测单流输出吞吐却高达 `250+ token/s` 且无投机解码特征，高度疑似替换为小参数模型。
- **原生特性探针**：校验工具调用（Tool Call JSON Schema 严格模式）、思维链签名字段（如 Anthropic `thinking` signature / OpenAI `reasoning`）、`Prefix Caching` 命中返回的 `cached_tokens` 计数字段是否真实生效。

---

## 3. 云原生 AI 网关技术对照：Higress（`higress-group/higress`）
- **仓库状态**：9.8k Star，Go + Envoy + WebAssembly，Apache-2.0 协议。
- **最值得吸收的三个机制（核对自 `plugins/wasm-go/extensions/`）**：
  1. `ai-load-balancer` 的 **`prefix_cache` 路由与 `cluster_hash`（FNV-1a 一致性哈希）**：普通网关做随机加权轮询会把同一 Agent 会话的多轮请求打散到不同供应商或推理实例，导致上游 `Prefix Caching` 失效重算；按会话 ID 或 Prompt 前缀哈希做粘滞路由，既能分流又能保住 KV Cache 命中率。
  2. `ai-statistics` 的 **零缓冲流式遥测**：开启 `use_default_response_attributes` 时不缓冲整个 SSE 响应体，边转发 chunk 边增量提取 `llm_first_token_duration`（TTFT）、`llm_service_duration`、`input_token`、`output_token`。
  3. `ai-token-ratelimit` 的 **Redis Cluster 多维叠加限流**：支持全局阈值 + 动态 Key（API Key / 租户 / 模型）的 `token_per_minute` 滑动限流。

---

## 4. 可二开开源底座源码深度核对（截至 2026-11-13）

### 4.1 开源底座横向选型矩阵
| 仓库 | Star 数（2026-11-13） | 技术栈 | 开源协议 | 适用定位与二开取舍 |
|---|---|---|---|---|
| `songquanpeng/one-api` | 37.4k | Go + React | **MIT** | 协议宽松无传染性，适合需要闭源商业化或深度魔改账务体系的团队；缺点是早期架构将所有协议强转为 OpenAI Chat，且重试预扣费模型较粗糙。 |
| `QuantumNous/new-api` | 51.8k | Go + React | **AGPL-3.0** | 目前功能最完整的分发网关，原生支持 OpenAI Chat/Responses、Anthropic `/v1/messages`、Gemini 四协议无损透传，自带 `BillingSession` 事务与平滑加权路由；若开源共建直接选它（注意 SaaS 闭源商用受 AGPL-3.0 约束）。 |
| `maximhq/bifrost` | 9.5k | Go (`fasthttp` + `sonic`) | **Apache-2.0** | 性能天花板（5,000 RPS 下网关附加开销约 `11 µs`），内置洋葱式插件管道、按供应商隔离的 Worker 队列与语义缓存，适合拆出数据面做自研高性能转发引擎。 |
| `BerriAI/litellm` | 63.2k | Python + Rust Core | MIT Core + 商业企业目录 | 覆盖 100+ 厂商的模型价格字典（`model_prices_and_context_window.json`）最全，适合做内部网关或同步模型元数据，重度高并发交易撮合不如 Go/Rust 底座省资源。 |
| `higress-group/higress` | 9.8k | Go + Envoy + Wasm | **Apache-2.0** | 云原生 AI 网关，内置 `prefix_cache` 前缀缓存粘滞路由、`ai-statistics` 零缓冲流式统计与 `ai-token-ratelimit`，适合已有 K8s/Envoy 基础设施的团队。 |
| `tensorzero/tensorzero` | 11.7k | Rust + ClickHouse | **Apache-2.0** | `<1ms` P99 转发延迟，将网关、ClickHouse 海量推理日志落盘、在线评估与 A/B 路由合一，适合重度可观测与评测驱动的交易所。 |

### 4.2 `QuantumNous/new-api` 核心源码机制（二开改造成交易所的直接抓手）
1. **分层优先级 + 平滑加权随机选路**（`model/channel_cache.go`、`service/channel_select.go`）：
   - 内存维护 `group2model2channels map[string]map[string][]int`（由 `channelSyncLock sync.RWMutex` 保护）。
   - `GetRandomSatisfiedChannel(group, model, retry, filters)` 提取候选渠道去重后的优先级切片 `sortedUniquePriorities`（降序），按重试轮次 `retry` 严格逐层降级（`targetPriority := int64(sortedUniquePriorities[retry])`）；同一优先级层内按 `channel.GetWeight()` 做加权随机（当总权重为 0 时平滑为 100 等概率，平均权重 `<10` 时乘 `smoothingFactor = 100`）。
   - 支持 `GetPreferredChannelByAffinity` 会话亲和性路由（第 0 次尝试命中同一渠道，保护上游 KV Cache）。
   - 故障摘除：`ProcessChannelError`（`service/relay_error.go`）结合状态码与 Aho-Corasick 自动机（`AcSearch`）扫描报错文本关键词，命中后异步调用 `DisableChannel` 更新状态并从内存路由表实时剔除故障渠道。
2. **SSE 流式首 Token 延迟（TTFT）与慢客户端防护**（`relay/common/relay_info.go`、`relay/helper/stream_scanner.go`、`service/log_info_generate.go`）：
   - `RelayInfo` 记录 `StartTime`；`StreamScannerHandler`（`stream_scanner.go:309-311`）在收到首个非空且非 `[DONE]` 的 `data:` 块时调用 `info.SetFirstResponseTime()`，落库时按 `FirstResponseTime.UnixMilli() - StartTime.UnixMilli()` 写入毫秒级首字耗时 `"frt"`。
   - 内置 `DefaultPingInterval = 10s` 保活心跳防止长思维链推理期间被反向代理掐断；内置 `StreamWriteBudget`（最低吞吐 `8KB/s` + `30s` 上限）防止僵死客户端占满 TCP 窗口拖死网关协程。
3. **Redis Lua 预扣费 + `BillingSession` 结算 + 断流本地分词兜底**（`service/billing_session.go`、`model/quota_reserve.go`、`relay/channel/openai/relay-openai.go`）：
   - 高余额信任旁路：`BillingSession.shouldTrust` 对余额充足账户跳过预扣写放大；普通账户由 `model/quota_reserve.go` 执行 Redis Lua 脚本（`tokenQuotaReserveScript`、`userQuotaReserveScript`）原子扣减预留额度。
   - 流中断防逃单：监听到 `<-c.Request.Context().Done()` 时立即关闭上游 `resp.Body` 止损，等待已到达分片拼入 `responseTextBuilder`；若上游未发回末尾 `usage` 帧（`!containStreamUsage`），调用 `service.ResponseText2Usage` 用本地 `tokenkit.Estimate` 统计已输出文本 Token（另加 `toolCount * 7`），执行 `BillingSession.Settle(actualQuota)` 多退少补（使用 `shopspring/decimal` 定点数计算），杜绝客户端收完正文瞬间断连白嫖。
4. **四协议原生无损透传与原位字节重放**（`router/relay-router.go`、`relay/channel/adapter.go`）：
   - 独立暴露 `/v1/chat/completions`、`/v1/responses`、`/v1/messages`、`/v1beta/models/*path` 四大入口；开启 `PassThroughBodyEnabled` 时通过 `NewReplayableBodyReader` 直接重放原始请求字节流（裁剪禁用字段用 `ojson` 原位字节操作，不破坏 JSON 键序，也不对多模态 Base64 大图二次编解码）。

### 4.3 `maximhq/bifrost` 极低延迟数据面源码亮点（可吸收进自研网关）
- `valyala/fasthttp` + `bytedance/sonic` SIMD JSON + `fasthttp.SetBodySizePoolLimit(4 MiB)`（`transports/bifrost-http/lib/bodybufferpool.go`）：常规请求零分配复用缓冲区，超过 4 MiB 的长上下文/多模态报文用完即释，防止连接池内存只涨不降。
- 启动预热 6 个 `DefaultInitialPoolSize = 5000` 的 `sync.Pool`（`core/bifrost.go:361-408`），归还 Map 时用 `clear(map)` 保留桶容量。
- 每个上游供应商独立隔离固定 Worker 池与有界队列 `ProviderQueue`（`core/bifrost.go:5332`），某一家小供应商卡死不会拖垮全局协程池；热路径用 `atomic.Pointer` 无锁读取路由表与插件链。
- `core/network/http.go` 针对大模型全量 `POST` 请求专门实现 `StaleConnectionRetryIfErr`，自动捕获空闲长连接关闭产生的 `EPIPE` / `ECONNRESET` 透明重试 3 次，消除偶发 `502` 毛刺。

### 4.4 模型验真双引擎源码精确参数（可封装为交易所独立 Sidecar 巡检服务）
- **实时轻量巡检（`mallochio/llm-fingerprint`，arXiv:2607.10252）**：
  - `batteries/v1/prompts.json`：10 道极简题 × 4 语种 = 40 个探测单元，强约束单 Token/单词作答。
  - `src/fingerprint/adapters/openai_compat.py`：`temperature = 1.0`，常规模型 `max_completion_tokens = 16`（推理模型设 `24` + `reasoning_effort = "minimal"`），每单元采样 `n_per_cell = 20`。
  - `src/fingerprint/normalize.py`：Unicode NFC 规范化、拒答过滤、多语种数字规约与 22 色跨语种词表映射。
  - `src/fingerprint/distance.py` & `verify.py`：计算以 2 为底的 `jsd_base2`（有界 `[0, 1]`），`min_n = 10`，默认阈值 `tau = 0.05`（`distance <= 0.05` 判真），支持 `mixture_report()` 估算混流比例。
- **深度量化/篡改审计（`irenasaracay/model-equality-testing`，arXiv:2410.20247）**：
  - `model_equality_testing/src/utils.py` & `tests.py` & `pvalue.py`：将输出按 Unicode 码点转为定长整数序列（`L = 200` 或 `1000`），避免依赖特定 Tokenizer 或 `logprobs`；使用同 Prompt 掩码的汉明位置核 `mmd_hamming` 或 $k$-gram 谱核 `mmd_kspectrum` 计算无偏 U 统计量，经 `b = 1000` 次随机置换检验（`two_sample_permutation_pvalue`）求经验 $p$ 值，`p < 0.05` 拒绝原假设，识别隐蔽 `INT4` 量化降级。
- **配套压测与联动接口（2026-11-13 核对）**：
  - `vllm-project/guidellm`（1.8k Star，Apache-2.0）：vLLM 官方并发压测工具，支持测绘 TTFT、ITL 与最大吞吐容量。
  - `Portkey-AI/gateway`（13.4k Star，MIT）与 `Portkey-AI/models`（MIT，40+ 供应商、2300+ 模型 JSON 定价）。
  - `new-api` 渠道自动熔断接口：`router/channel-router.go` 注册 `POST /api/channel/:id/status`，`controller/channel.go:UpdateChannelStatus` 接收 `{"status": 2}`（`common.ChannelStatusManuallyDisabled = 2`），更新状态后自动调用 `model.InitChannelCache()` 与 `closeActiveChannelWebSockets([]int{id})`。
  - 本机实测混流审计（`llm-fingerprint` v0.1.0）：对宣称 `claude-fable-5`、底层按 20% `claude-fable-5` + 80% `deepseek-v4` 混流的本地 HTTP 转发服务跑 5 轮审计（`--n-per-cell 20`），实测 `Observed Distance (JSD) = 0.6421 > 0.0500`（`Verdict: FAILED`），最近邻第 1 名准确命中 `deepseek-v4`（`JSD = 0.1729`）。
