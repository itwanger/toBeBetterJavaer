---
title: 真上强度啊，百度上线Token交易所。
shortTitle: 百度词元所与开源Token交易所架构拆解
description: 拆解百度世界2026发布的词元所（Token Exchange）产品机制，详解开源Token交易所四层架构、模型真伪核验、真实成本比价、流式延迟统计及new-api与Bifrost二次开发方案。
keywords:
  - 词元所
  - Token Exchange
  - 模型指纹验真
  - AI网关
  - new-api
tag:
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-11-13
---

大家好，我是二哥呀。

说真心话，【词元所】这个名字起得真不错，英文名 Token Exchange 也好听，我怎么就没想到呢。

![](https://cdn.paicoding.com/stutymore/sucai-20261113093708.png)

在百度世界 2026 大会上，宏哥发布了这款大模型 Token 交易平台。官方公布的试运营数据是，入驻的供应资源超过 `100` 个，日均调用超过 `5000` 万次，日均消耗 Token 超过 `7000` 亿。

我只能说，国内的 Token 需求量是真的大啊。

我滴乖。

身边确实有很多朋友为了省钱，会接入第三方的聚合平台，但存在一个实际的问题。

页面上标的是旗舰模型的折扣价，实际运行的可能是参数更小的蒸馏版本，或者压缩成 `INT4` 精度的量化版本。

这段时间，我其实也在琢磨做一套开源的 Token 交易所，所以今天结合词元所的产品形态和公开文档，讲清楚四件事。

- 系统架构怎么设计
- 模型真伪怎么核验
- 真实成本怎么计算
- 延迟和成功率怎么统计
- 最后再盘点几个适合二开的 GitHub 开源项目。

大家可以期待一下我的新作品，也记得来鞭策一下我，真抽那种。😄

## 01、词元所到底做对了什么

以前用第三方聚合接口，调用方只能看到一个模型名称，请求最终发给了哪家算力商、用的是什么精度，一概不知。

词元所把模型和供应商分开展示，同一个模型 ID 下面列出多家原厂和云服务商的实时行情。

以近 `7` 天调用量超过 `3.3` 亿次的 `deepseek-v4.1-flash` 为例，同一款模型下有多家供应商，各项指标的差异一目了然。

![](https://cdn.paicoding.com/stutymore/baidu-token-exchange-market-redrawn-20261113144032-a7ef02d8.png)

只看单价，两家只差几毛钱；把首 Token 延迟和每秒输出速度列出来，差距就很明显了。

同一款模型，首字延迟差了两倍多，输出速度差了 `5` 倍。

比行情透明更重要的，是“验真”和“征信”两套机制。词元所从模型真伪、服务稳定性、并发能力和输出质量四个方面评估供应商，信用评级分为优信、良好、可信、观察、冻结五档。供应商首次接入时的测评结果作为基准，平台之后定期抽检，关键评定结果写入区块链作为呈堂公证，😄。

![](https://cdn.paicoding.com/stutymore/baidu-token-exchange-pixel-02-20261113121633-7aff071c.png)

那，如果我们自己做一套开源的 Token 交易所，模块该怎么划分？

## 02、四层架构设计

普通的 API 聚合网关只做三件事，鉴权、转发、扣费。

Token 交易所还要多做两件事，在多家供应商之间比价路由，以及抽检模型真伪。抽检和账单统计都比较耗时，如果放进转发流程，会拖慢接口响应，所以整套系统要按职责拆成四层。

![](https://cdn.paicoding.com/stutymore/baidu-token-exchange-pixel-03-20261113121634-c168cd03.png)

**第一层是交易与配置管理层**，同时面向供应商和。供应商入驻后，填写接口地址、支持的协议和单价。在控制台对比行情后，有两种用法，一是给自己的 API Key 勾选多家供应商，设置优先级和分流比例；二是像词元所的那样，用专属路径前缀把请求固定发给某一家供应商。

**第二层是请求转发网关层**，只负责路由、SSE 流式转发和计费。网关在内存里维护一张路由表，按“分组 + 模型名 + 优先级”组织。转发时直接读内存、不查数据库，网关自身的处理耗时可以控制在 `1` 毫秒以内。

**第三层是模型抽检服务**，和网关并列运行。定期模拟用户，向各个在售接口发送测试题，把返回结果的统计规律、答题准确率和输出速度跟官方接口对比。一旦某个接口明显偏离，抽检服务就通知管理层下调它的信用评级，并同步更新网关里的路由表。

**第四层是结算与监控**。调用方的额度预扣、费用结算和供应商分账，用 Redis Lua 脚本加 PostgreSQL 事务完成，保证账目准确。每次流式调用的首字延迟、输出速度和状态码，通过异步队列批量写入 ClickHouse，再按小时和近 `7` 天汇总成公开的行情看板。

四层里技术难度最高的是抽检服务。上游供应商只给一个 HTTP 接口，既不公开模型权重，通常也不返回每个候选词的概率（`logprobs`）。

抽检服务凭什么判断底层模型有没有被换掉？

## 03、模型真伪核验怎么实现

先看第三方接口常见的三类造假。

最直接的一类，是用小模型加一段系统提示词冒充高端模型。另外两类更隐蔽。

- 真假实例混用：同一个接口背后同时挂着原版模型和低配模型，按比例随机分配请求，人工偶尔测几次很难发现
- 量化缩水：页面标称 `BF16` 或 `FP8` 精度，实际部署的是 `INT4` 量化版本。

![](https://cdn.paicoding.com/stutymore/baidu-token-exchange-pixel-04-20261113121634-c7bf1698.png)

早期不少团队用 MMLU、GSM8K、HumanEval 这类公开评测集来抽查，效果并不好。一是题目固定，上游很容易识别出来，单独走缓存或转给真模型；二是跑一轮评测要消耗几十万 Token，没法高频抽检。

### 用首字输出偏好识别

2026 年 7 月发表的论文《One Token Is Enough》和配套开源项目 `mallochio/llm-fingerprint` 给出了一套轻量方案。

只看第一个输出 Token 的概率分布，就能识别模型身份。

![](https://cdn.paicoding.com/stutymore/baidu-token-exchange-pixel-05-20261113121635-aa39c178.png)

原理是这样的。

不同模型的训练数据、词表和微调方式都不同，面对“说一个 1 到 100 之间的随机整数”、“说一个随机的汉字”、“你最喜欢什么颜色”这类简短问题时，第一个输出的词并不是均匀分布的，每款模型都有稳定的偏好。

比如同样是挑随机数，有的模型常说 `47` 和 `73`，另一款模型则集中在 `37` 和 `42`。这些测试题跟平时测接口通不通的请求没什么两样，上游不容易识别；而靠加系统提示词，也模仿不出原厂模型的概率分布。

`mallochio/llm-fingerprint` 准备了 `10` 道只需回答一个词的测试题，分别用中、英、俄、阿 `4` 种语言提问，共 `40` 个测试单元。

抽检程序把采样温度设为 `temperature = 1.0`，限制只生成很短的内容，每个测试单元请求 `20` 次，统计每个词出现的频率，得到待测接口的分布 `p`。

再拿官方原厂接口的分布 `q` 做对比，`src/fingerprint/distance.py` 会计算出两者的 Jensen-Shannon 散度（JSD，衡量两个概率分布差异的指标），取值在 `0` 到 `1` 之间，越小越接近。

所有测试单元的 JSD 取平均，默认合格线是 `0.05`。同一款模型两次独立采样，平均 JSD 一般在 `0.05` 以内；如果上游换成了别的模型，平均 JSD 会大十倍以上。

对于真假实例混用的情况，这个工具可以跨多个独立会话采样，再跟已知模型的指纹库比对，估算出背后混了哪几款模型、各占多少比例。

日常抽检只需要挑 `8` 个区分度高的测试单元，发大约 `100` 次短请求，总消耗不到两千 Token，几分钱就能测一轮。

### 长文本比对与输出速度校验

首字分布擅长识别“换成了另一款模型”。

但如果供应商部署的确实是同款模型（比如 `DeepSeek-V4.1-Flash` 或 `GLM-5.3`），只是把 `FP8` 换成了 `INT4`，首字偏好可能很接近，这时就要靠长文本比对。

![](https://cdn.paicoding.com/stutymore/baidu-token-exchange-pixel-06-20261113121635-2c9e831c.png)

斯坦福团队在《Model Equality Testing》，开源仓库 `irenasaracay/model-equality-testing` 里给出了一套方法。

用同一批提示词分别多次请求原厂接口和待测接口，取每次输出的前 `200` 个字符逐位比较，再用统计检验判断两边的生成规律是否一致。如果检验得到的 p 值小于 `0.05`，就可以在统计意义上认定，待测接口的模型权重被替换或压缩过。

工程上还有两项辅助检查：

- 看输出速度有没有超过硬件上限。显卡的显存带宽决定了每秒最多能读多少模型参数。如果某家供应商号称部署的是完整的大参数模型，单个请求的输出速度却超过每秒 `250` 个 Token，那多半跑的是小模型
- 测原生的工具调用和前缀缓存。发送有严格 JSON 格式要求的工具调用请求和长上下文请求，检查响应里的缓存命中计数（`cached_tokens`）和思考过程签名是否完整。简化过的接口，往往在这些原生字段上出问题

## 04、比价、首字延迟与成功率

确认了模型是真的，挑供应商时需要关心三项指标，价格、延迟、成功率。

### Agent 任务的真实成本

不少比价页面只按“每百万输入/输出 Token 单价”排序。挑了最便宜的一家，跑了一周 Agent 任务，总账单反而更贵。原因主要有三个。

- 缓存折扣：Agent 多轮执行时，历史对话和工具定义占了输入 Token 的大头。支持 `Prefix Caching` 的正规云厂商，对命中缓存的部分按 `1` 到 `2` 折收费；不支持缓存的低价渠道每轮都按原价收
- 思考过程计费：开启深度思考后，模型生成的推理内容按输出单价计费，而各家默认的思考长度差别很大
- 重试损耗：不稳定的渠道一旦中途报错或超时，客户端重试时要把几万字的上下文再发一遍，多付一次输入费用

![](https://cdn.paicoding.com/stutymore/baidu-token-exchange-pixel-07-20261113121636-56dd44be.png)

所以行情页除了列出单价，还应该按一组典型的 Agent 任务参数算出一列“Agent 标准任务预估成本”。

### 统计首字延迟、输出速度与成功率

衡量接口快慢，不能看整次 HTTP 请求的总耗时，因为生成 `50` 个字和生成 `4000` 个字的耗时没法比。

网关必须把两个指标分开统计，首字延迟（TTFT，从发出请求到收到第一个字的时间）和输出速度（TPS，收到第一个字之后每秒生成的 Token 数）。

开源网关 `QuantumNous/new-api` 的 `relay/helper/stream_scanner.go` 给出了一种标准做法，不需要把整个响应缓存下来。

请求进入网关时记下开始时间 `StartTime`；网关逐行读取上游返回的 SSE 数据，读到第一条非空、且不是结束标记 `[DONE]` 的数据时，记下首包时间 `FirstResponseTime`。

```go
// QuantumNous/new-api: relay/helper/stream_scanner.go
data, hasDataPrefix := strings.CutPrefix(data, "data:")
data = strings.TrimSpace(data)
if (!hasDataPrefix && data != "[DONE]") || data == "" {
    continue
}
if data != "[DONE]" {
    info.SetFirstResponseTime()
    info.ReceivedResponseCount++
    dataChan <- data
}
```

流式传输结束后，首字延迟等于 `FirstResponseTime - StartTime`；输出速度等于输出 Token 总数除以 `(EndTime - FirstResponseTime)`。

这样算，提示词很长导致的首字等待时间就不会拉低输出速度。对外展示时也不能只给平均值，因为少数高峰期的超时会被大量正常请求平均掉。

更好的做法是参考词元所，在 ClickHouse 里统计 `P50`（中位数）、`P90`、`P95` 分位值，把慢请求如实反映出来。

![](https://cdn.paicoding.com/stutymore/baidu-token-exchange-pixel-08-sse-timing-20261113121651-02b5e83c.gif)

成功率也不能只看上游有没有返回 `HTTP 200`：

- 算总请求数时，要剔除调用方自己传错参数导致的 `400`、`401`，不能让用户的错误拉低供应商的评分
- 算失败请求时，除了 `429` 限流和 `5xx` 服务端错误，还要把这几种情况算进去，返回 `200` 但内容为空、流式传输中途断开、工具调用的 JSON 不完整

有了实时的健康数据，网关就能按优先级自动调度。

请求先发给高优先级渠道，同一优先级内按权重分配；某个渠道一旦返回错误，网关立刻把它从可用列表移除，切换到备选渠道。

## 05、能拿来二开的 GitHub 项目

做 Token 交易所，没必要从零写上百家厂商的接口适配。

GitHub 上已经有几个经过大规模生产验证的网关项目。

| 开源仓库 | Star 数 | 技术栈 | 许可证 | 特长与适用场景 |
|---|---|---|---|---|
| `QuantumNous/new-api` | `51.8k` | Go + React | `AGPL-3.0` | 原生支持 OpenAI Chat、OpenAI Responses、Anthropic、Gemini 四种协议转发，内置计费事务和加权路由，适合做开源项目 |
| `songquanpeng/one-api` | `37.4k` | Go + React | `MIT` | 单个可执行文件即可运行，许可证宽松，适合打算闭源商用、需要自己补多协议和账务模块的团队 |
| `maximhq/bifrost` | `9.5k` | Go (`fasthttp` + `sonic`) | `Apache-2.0` | `5000` RPS 压测下网关自身耗时仅 `11` 微秒，自带插件机制、按供应商隔离的队列和语义缓存，适合对延迟要求极高的场景 |
| `higress-group/higress` | `9.8k` | Go + Envoy + Wasm | `Apache-2.0` | 阿里开源的云原生 AI 网关，内置前缀缓存路由、流式监控和 Redis 限流插件，适合熟悉 K8s 的团队 |
| `tensorzero/tensorzero` | `11.7k` | Rust + ClickHouse | `Apache-2.0` | `P99` 转发开销低于 `1` 毫秒，把路由、推理日志、在线评测和 A/B 测试集成在一起 |

除了网关本身，抽检、压测和比价这几个模块也有现成的。

- 指纹抽检：`mallochio/llm-fingerprint`（`MIT`），基于首 Token 概率分布做指纹采集和混用检测，适合日常高频抽检
- 量化缩水检测：`irenasaracay/model-equality-testing`（`MIT`），斯坦福开源的长文本统计检验库，适合低频排查量化缩水
- 并发压测：`vllm-project/guidellm`（`1.8k` Star，`Apache-2.0`），vLLM 官方的推理性能压测工具，能按不同并发量测出供应商接口的首字延迟、字间延迟和最大稳定吞吐
- 单价数据：`Portkey-AI/models`（`MIT`），社区持续维护的模型价格 JSON 仓库，覆盖 `40+` 家供应商、`2300+` 款模型的输入、输出和缓存命中价格

![](https://cdn.paicoding.com/stutymore/baidu-token-exchange-pixel-09-20261113121636-48f1f7c6.png)

如果要做一套完全开源的 Token 交易所，最省事的是基于 `new-api` 二开。

如果打算闭源商用，可以选 `MIT` 许可证的 `songquanpeng/one-api`、`Portkey-AI/gateway`，或 `Apache-2.0` 许可证的 `maximhq/bifrost`。

## 06、词元所值得借鉴的四个设计

对照词元所的官方文档和 `new-api`、`Bifrost`、`Higress` 的源码，有四个工程细节值得参考。

### 原生接口

早期网关普遍把所有请求转成 OpenAI Chat 格式再发给下游厂商。到了 Agent 时代，这种转换会丢掉关键功能。

比如 Claude Code 依赖 Anthropic `/v1/messages` 接口的思考过程签名（`thinking`）和缓存断点（`cache_control`），Codex 依赖 OpenAI `/v1/responses` 接口在服务端保存的会话状态。

强行转换格式，不仅会丢掉这些字段，遇到多模态请求时还要反复解析和拼接很长的图片 Base64 字符串，白白消耗 CPU 和内存。

词元所和 `new-api` 都改成了多协议原生直通，同时提供 `/v1/chat/completions`、`/v1/responses`、`/v1/messages` 和 Gemini 的 `:generateContent` 四类接口路径。

![](https://cdn.paicoding.com/stutymore/baidu-token-exchange-pixel-10-20261113121637-63961529.png)

### 流式中断

流式输出往往要持续几十秒，客户端断网、用户按 `Ctrl+C` 取消、上游中途断开，都会发生。

词元所公开了一份《连接中断计费逻辑》，覆盖 `13` 种场景。

- 转发前客户端断开：请求还没发给上游，输入和输出都不收费
- 转发后、收到第一个数据包前断开：上游已经开始处理提示词，输入按估算的 Token 数收费，输出不收费
- 流式输出中途断开：不论是客户端断开还是上游断开，只要没收到最后的用量统计（`usage`），就按已经完整收发的内容估算费用。文字用 `o200k_base` 分词器统计，图片每张固定按 `520` Token 计，音频每段 `256` Token，视频每段 `8192` Token

`new-api` 转发前，会用 Redis Lua 脚本按估算金额预扣；流式输出期间，一旦发现客户端断开，立即关闭上游的连接，避免上游继续生成；断开之后，用本地分词器统计已经发给客户端的文本和工具调用内容，按实际用量多退少补。

另外，词元所还支持客户端在请求头里传一个 `16` 到 `64` 位的请求唯一标识 `X-Vod-Request-Id`。同一账号在 `8` 小时内重复提交相同的 ID，会收到 `409 Conflict`。网关实现起来很简单，一条带 `8` 小时过期时间的 Redis `SET NX` 命令，就能拦住客户端超时重试造成的重复扣费。

![](https://cdn.paicoding.com/stutymore/baidu-token-exchange-pixel-11-20261113121637-5c970536.png)

### 提高缓存命中率

假设给 `deepseek-v4.1-flash` 勾选了权重相同的 A、B 两家供应商，网关每次随机分配。

Agent 第 `1` 轮请求发给了 A，A 那边缓存了 `5` 万 Token 的前缀；第 `2` 轮请求却被分给了 B。

B 上没有这份 `KV Cache`，只能把这 `5` 万多 Token 从头算一遍，首字延迟翻倍，本来能省下八成输入费用的缓存折扣也没了。

`new-api` 的解决办法是按会话固定路由。网关读取请求头里的会话 ID，或者对开头固定不变的系统提示词计算哈希值，在渠道可用的前提下，把同一会话的后续请求都发给同一家供应商。

![](https://cdn.paicoding.com/stutymore/baidu-token-exchange-pixel-12-sticky-routing-20261113121652-477a5587.gif)

### 限制内存缓冲区大小

先说慢连接。如果某个客户端连上 SSE 流后迟迟不读数据，操作系统的网络缓冲区会被填满，网关负责发送数据的协程就会一直阻塞。`new-api` 在 `stream_scanner.go` 里按“每秒至少读取 `8 KB`”来计算每次写入的超时时间，再加上 `30` 秒的基础宽限。

再说内存。`maximhq/bifrost` 用高性能网络库 `valyala/fasthttp` 来复用连接，但 `fasthttp` 默认会让每个缓冲区保持在它处理过的最大请求的大小。大模型场景下，来几个几十 MB 的长上下文或多模态请求，连接池里的缓冲区就会被撑爆，服务器的内存占用就降不下来。`Bifrost` 在 `transports/bifrost-http/lib/bodybufferpool.go` 里用几行代码解决了这个问题：

```go
// maximhq/bifrost: transports/bifrost-http/lib/bodybufferpool.go
const DefaultBodyBufferPoolLimitBytes = 4 * 1024 * 1024

func ApplyBodyBufferPoolLimit(serverConfig *ServerConfig, maxRequestBodySizeBytes int) {
    limit := ResolveBodyBufferPoolLimit(serverConfig, maxRequestBodySizeBytes)
    if limit != BodyBufferPoolLimitDisabled {
        fasthttp.SetBodySizePoolLimit(limit, BodyBufferPoolLimitDisabled)
    }
}
```

这段代码把可复用缓冲区的上限设为 `4 M`。几十 K 的普通请求照常复用缓冲区；超过 `4 M` 的大请求处理完之后，缓冲区不再放回池子，交给垃圾回收器回收。此外，`Bifrost` 给每家供应商分配了独立的工作协程池和固定长度的等待队列，某一家供应商的接口卡住了，积压的请求也只留在它自己的队列里，不会拖慢其他供应商。

![](https://cdn.paicoding.com/stutymore/baidu-token-exchange-pixel-13-20261113121637-ed5221aa.png)

## ending

经过这一轮技术分析后，我觉得复刻一个词元所没什么难度了。

大家可以期待一下我的新作品。

到时候也开源出来给大家用。

![](https://cdn.paicoding.com/stutymore/baidu-token-exchange-architecture-20261113120612.png)

其实 AI 时代，最大的好处，我想就是让每一个人的想法都可以快速落地。

碰到一个你想做的，都可以很快去调查清楚，研究清楚，定好技术栈就可以开始了。

等我。