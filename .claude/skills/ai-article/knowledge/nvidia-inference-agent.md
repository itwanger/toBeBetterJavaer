# 英伟达推理侧与 AI Agent 的关系：一手依据

调研日期：2026-09-02。所有来源为 NVIDIA 官方博客、官方文档、GitHub 仓库或官方财报新闻稿，访问日期均为 2026-09-02。引文为原文摘录，中文说明为调研整理。

## 1. KV Cache 是什么，为什么长上下文吃显存

- 定义（NVIDIA 技术博客《Mastering LLM Techniques: Inference Optimization》，2023-11-17，作者 Shashank Verma、Neal Vaidya）：
  - 原文："In the prefill phase, the LLM processes the input tokens to compute the intermediate states (keys and values), which are used to generate the 'first' new token."
  - 原文："In the decode phase, the LLM generates output tokens autoregressively one at a time, until a stopping criteria is met."
  - 原文："One common optimization for the decode phase is KV caching. The decode phase generates a single token at each time step, but each token depends on the key and value tensors of all previous tokens."
- 显存公式（同一篇博客）：
  - 原文："Size of KV cache per token in bytes = 2 * (num_layers) * (num_heads * dim_head) * precision_in_bytes"
  - 原文："Total size of KV cache in bytes = (batch_size) * (sequence_length) * 2 * (num_layers) * (hidden_size) * sizeof(FP16)"
  - 原文示例："with a Llama 2 7B model in 16-bit precision and a batch size of 1, the size of the KV cache will be 1 * 4096 * 2 * 32 * 4096 * 2 bytes, which is ~2 GB."
  - 注意：博客公式里写的是 num_heads（Llama 2 7B 是 MHA，KV 头数等于注意力头数）。同一篇博客说明 MQA/GQA 用更少的 KV 头来减少 KV cache 占用。
  - 来源：https://developer.nvidia.com/blog/mastering-llm-techniques-inference-optimization/
- GQA 版本的公式（用 KV 头数）在 TensorRT-LLM 官方文档 KV Cache Manager 页面可以印证：
  - 原文：缓冲区形状 "[num_blocks, 2, num_tokens_per_block, num_kv_heads, head_dim]"；构造参数 `num_layers` 取 `config.num_hidden_layers`，`num_kv_heads` 取 `config.num_key_value_heads`。
  - 由此每 token 的 KV 大小 = 2 × num_layers × num_kv_heads × head_dim × 精度字节。这是从官方数据结构推出的形式，NVIDIA 博客原话用的是 num_heads。
  - 来源：https://nvidia.github.io/TensorRT-LLM/torch/kv_cache_manager.html
- TensorRT-LLM 官方文档《KV Cache System》：TensorRT-LLM 利用 GQA 节省显存，KV cache 只为离散的查询头组分配空间；MHA 每个头一组，MQA 所有头共用一组。
  - 来源：https://nvidia.github.io/TensorRT-LLM/latest/features/kvcache.html
- NVIDIA 博客《Introducing New KV Cache Reuse Optimizations in NVIDIA TensorRT-LLM》（2025-01-16）原文："Key-value (KV) cache grows linearly with the size of the language model, number of batched requests, and sequence context lengths, leading to growing memory requirements."
  - 来源：https://developer.nvidia.com/blog/introducing-new-kv-cache-reuse-optimizations-in-nvidia-tensorrt-llm/
- 结论：KV cache 随序列长度线性增长，长上下文直接把显存吃掉，这是所有后续优化（复用、卸载、路由）的出发点。

## 2. Prefix Caching / KV cache reuse（TensorRT-LLM block reuse）

- TensorRT-LLM 官方文档《KV cache reuse》：
  - 机制：多个请求以相同的 prompt 开头时，KV cache 的页可以共享，显著降低首 token 延迟，共享 prompt 越长收益越大。
  - 块大小：默认 128 token 一个块，可用 `trtllm-build --tokens_per_block 32` 调整。（KV Cache System 文档补充：tokens_per_block 必须是大于 1 的 2 的幂。）
  - 命中条件：只有完整的块可以被复用，不能复用半个块；前缀必须相同。
  - 原文："KV cache state only becomes reusable after the request that computed the state terminates"（这是传统复用的限制，第一个请求算完 system prompt 后，第二个请求才能复用）。
  - 开启方式：`trtllm-build --use_paged_context_fmha enable`，Executor API 中 `KvCacheConfig` 的 `enableBlockReuse=true`（默认开启）；Triton 参数 `enable_kv_cache_reuse: "true"`。
  - 淘汰策略：可复用块按 LRU 淘汰。
  - 来源：https://nvidia.github.io/TensorRT-LLM/advanced/kv-cache-reuse.html
- TensorRT-LLM 官方文档《KV Cache System》：块存放在基数树（radix tree）里，后续请求前缀匹配即可复用；淘汰策略是"prioritized LRU"，块优先级 0 到 100，只有叶子块可以被淘汰。
  - 来源：https://nvidia.github.io/TensorRT-LLM/latest/features/kvcache.html
- 优先级淘汰（2025-01-16 博客）：用户可以给 token 范围指定 priority 和 duration；原文："Our internal benchmarks show priority-based eviction increasing cache hit rate by around 20% and varies based on the workload."
  - 同一篇博客的 KV cache event API：块被存储、移除、更新时发出事件，应用可以据此得到 KV cache 状态的最终一致视图，用于多实例之间的请求路由。
  - 来源：https://developer.nvidia.com/blog/introducing-new-kv-cache-reuse-optimizations-in-nvidia-tensorrt-llm/
- TTFT 数字（NVIDIA 博客《5x Faster Time to First Token with NVIDIA TensorRT-LLM KV Cache Early Reuse》，2024-11-08，H100，LLAMA70B）：
  - 原文："we can instead reuse the system prompt as it is being generated in real time, enabling it to be shared across all users during the burst, rather than recalculating it for each user. This can significantly accelerate inference for use cases requiring system prompts by up to 5x."
  - 块大小对复用率的影响：块可以从 64 token 细分到 2 token；80 token 的缓存用 64 token 块会浪费 16 token，用 16 token 块可以全部命中；块从 64 降到 8 token 时 LLAMA70B 在 H100 上"up to 7%"提升。
  - 来源：https://developer.nvidia.com/blog/5x-faster-time-to-first-token-with-nvidia-tensorrt-llm-kv-cache-early-reuse/
- 对多轮 Agent 对话的收益（NVIDIA 博客《Full-Stack Optimizations for Agentic Inference with NVIDIA Dynamo》，2026-04-17）：
  - 原文："write-once-read-many (WORM) access pattern: the system prompt and growing conversation prefix are computed once, then served from cache on every subsequent call"
  - 多轮结构原文："long prefill, tool call, extend prefix, repeat"
  - 博客分析 Claude Code 流量：单 worker 缓存命中率 85%-97%；4 个 teammates 的多 Agent 团队聚合命中率 97.2%；读写比 11.7 倍。
  - 来源：https://developer.nvidia.com/blog/full-stack-optimizations-for-agentic-inference-with-nvidia-dynamo/
- 前缀稳定性（NVIDIA 博客《Streaming Tokens and Tools: Multi-Turn Agentic Harness Support in NVIDIA Dynamo》，2026-05-08）：
  - Claude Code 每次请求都带数千 token 的可复用 prompt 脚手架（系统指令和工具定义），但会话相关的计费头会污染缓存前缀。
  - 用 `--strip-anthropic-preamble` 去掉不稳定前缀后，52K token prompt 的 TTFT 为 168ms，不去掉为 912ms，博客称约 5 倍下降。
  - B200 实验：52K token system prompt 加约 500 token 思考内容，下一轮前缀不变时 TTFT 167ms，思考内容被改动时 322ms，约 1.9 倍差距。
  - 来源：https://developer.nvidia.com/blog/streaming-tokens-and-tools-multi-turn-agentic-harness-support-in-nvidia-dynamo/

## 3. NVIDIA Dynamo：KV-aware routing 与 disaggregated serving

- Dynamo 定位（GitHub README）：开源的数据中心规模推理栈，位于推理引擎之上的编排层，把 TensorRT-LLM、vLLM、SGLang 组成多节点推理系统，Rust 写性能层、Python 写扩展层。
  - README 列出的特性：Disaggregated Serving、KV-Aware Routing（按 worker 负载和缓存重叠度路由，README 称 TTFT 约 2 倍提升）、KV Block Manager、Planner（SLA 驱动的自动扩缩容）。
  - 来源：https://github.com/ai-dynamo/dynamo
- Dynamo 发布博客（2025-03-18）：
  - 原文："Disaggregated serving separates the prefill and decode phases onto different GPUs or nodes."
  - 原文："The NVIDIA Dynamo Smart Router tracks KV cache across large fleets of GPUs in multinode and disaggregated deployments, and efficiently routes incoming requests, minimizing the need for their costly recomputation."
  - 数字：DeepSeek-R1 671B 在 GB200 NVL72 上吞吐"up to 30x"；Llama 70B 在 Hopper 上吞吐翻倍以上。
  - 来源：https://developer.nvidia.com/blog/introducing-nvidia-dynamo-a-low-latency-distributed-inference-framework-for-scaling-reasoning-ai-models/
- KV-aware routing 官方文档（Dynamo v0.7.1 设计文档）：
  - 代价函数原文："cost = overlap_score_weight * prefill_blocks + decode_blocks"。prefill_blocks 是需要 prefill 的 token 数除以块大小（根据输入 token 和各 worker 已缓存块预测），decode_blocks 由输入 token 和 worker 上活跃序列估计。选代价最低的 worker。
  - `kv_overlap_score_weight` 原文："Higher values improve Time To First Token (TTFT) at the cost of Inter-Token Latency (ITL)."
  - 原文："The KVIndexer builds and maintains a global view of cached blocks in a prefix tree."引擎发出 KV stored / KV removed 事件，通过 NATS JetStream 汇总到路由器。
  - 来源：https://docs.dynamo.nvidia.com/dynamo/v-0-7-1/additional-resources/router-details/kv-cache-routing
- 为什么 Agent 负载需要 KV-aware routing（2026-04-17 博客）：
  - 原文："Without cache-aware routing, turn 2 of a conversation has a ~1/N chance of landing on the same worker as turn 1."
  - 路由器维护"a global index of which KV cache blocks exist on which workers"，每个请求查询各 worker 的重叠分数，选"minimizes the combined cost of cache miss and current decode load"的 worker。
  - 来源：https://developer.nvidia.com/blog/full-stack-optimizations-for-agentic-inference-with-nvidia-dynamo/
- Disaggregated serving 官方设计文档（Dynamo v0.7.1）：
  - 原文："using a larger TP for the memory-bound decoding phase while a smaller TP for the computation-bound prefill phase allows both phases to be computed efficiently"
  - 原文："for requests with long context, separating their prefill phase into dedicated prefill engines allows the ongoing decoding requests to be efficiently processed without being blocked by these long prefills"
  - KV 传输原文："Dynamo leverage NIXL to transfer KV cache directly from the VRAM of prefill engine to the VRAM of decode engine"，传输非阻塞。
  - 条件分离：prefill 短的请求在 decode 引擎本地算；prefill 队列积压时也转为本地 prefill。
  - 来源：https://docs.dynamo.nvidia.com/dynamo/v-0-7-1/design-docs/disaggregated-serving
- Dynamo 整体架构文档（v0.7.1）：原文 "Dynamo employs KV cache-aware routing, which directs requests to the worker with the highest cache hit rate while maintaining load balance"。
  - 来源：https://docs.dynamo.nvidia.com/dynamo/v-0-7-1/design-docs/overall-architecture
- Dynamo 1.0 博客（2026-03-16）：
  - 原文："Multi-turn agents, however, reuse prefixes and follow predictable patterns. An evicted multi-turn KV block will need to be recomputed, resulting in wasted compute and higher inference costs."
  - 路由器接受 agent hints：latency sensitivity、priority、expected output sequence length (OSL)，用于队列排序和负载均衡。
  - 数字：Agentic 推理场景 TTFT 最高降低 4 倍、吞吐提升 1.5 倍；GB200 NVL72 上用 disaggregated encode/prefill/decode 加宽专家并行，请求数最高提升 7 倍。
  - 来源：https://developer.nvidia.com/blog/nvidia-dynamo-1-production-ready
- 为什么适合 Agent："长输入短输出、多轮"意味着 prefill 占比高、前缀重复率高。Disaggregated serving 让长 prefill 不阻塞其他会话的 decode；KV-aware routing 让第 N+1 轮落到缓存了前 N 轮前缀的 GPU 上。以上两点分别对应 Dynamo 设计文档的原话和 2026-04-17 博客的 1/N 论述。

## 4. Continuous batching / in-flight batching

- TensorRT-LLM 官方文档《Multi-Head, Multi-Query, and Group-Query Attention》原文："TensorRT-LLM supports in-flight batching of requests (also known as continuous batching or iteration-level batching) for higher serving throughput."文档还说明 context 阶段（处理全部输入 token）和 generation 阶段（逐 token 生成）的序列可以在同一批里一起处理。
  - 来源：https://nvidia.github.io/TensorRT-LLM/advanced/gpt-attention.html
- NVIDIA 博客《NVIDIA TensorRT-LLM Supercharges Large Language Model Inference on NVIDIA H100 GPUs》原文："With in-flight batching, rather than waiting for the whole batch to finish before moving on to the next set of requests, the TensorRT-LLM runtime immediately evicts finished sequences from the batch. It then begins executing new requests while other requests are still in flight."
  - 数字：原文 "minimally double the throughput on a benchmark of real-world LLM requests on NVIDIA H100 Tensor Core GPUs"。
  - 来源：https://developer.nvidia.com/blog/nvidia-tensorrt-llm-supercharges-large-language-model-inference-on-nvidia-h100-gpus/
- 与 Agent 的关系：Agent 每轮工具调用结束后发起的新请求，不必等当前 batch 里其他请求全部结束，而是在下一个迭代就能插入 batch。排队延迟从"等整批"变成"等一次迭代"，这是 in-flight batching 的定义直接决定的。（此句为调研整理，非官方原话。）

## 5. KV cache 卸载到 CPU 内存 / NVMe

- TensorRT-LLM 官方文档《KV Cache System》：块从 GPU 淘汰前可以选择卸载到 host 内存，在 host 内存中仍可复用，复用时先拷回 GPU。参数 `host_cache_size` 指定 host 内存字节数，默认 0；`secondary_offload_min_priority` 默认 35，优先级低于 35 的块不卸载，直接淘汰。
  - 来源：https://nvidia.github.io/TensorRT-LLM/latest/features/kvcache.html
- TensorRT-LLM 官方文档《KV cache reuse》：卸载扩大了可复用内存，但卸载和回载有拷贝成本；host 缓冲区是 pinned memory，x86 上分配大量 pinned memory 可能要几十秒，一次性成本。示例参数 `kv_host_cache_bytes`（示例 45 GB）。
  - 来源：https://nvidia.github.io/TensorRT-LLM/advanced/kv-cache-reuse.html
- TensorRT-LLM 官方示例《KV Cache Offloading》：GPU KV cache 只够放一个请求，按 A、B、A、B 发四个请求；原文 "When prompt 'A' is sent again, its KV cache is loaded back from host RAM to the GPU, which is significantly faster than recomputing it."参数 `host_cache_size=1024**3`、`enable_block_reuse=True`、`tokens_per_block=16`。
  - 来源：https://nvidia.github.io/TensorRT-LLM/examples/llm_kv_cache_offloading.html
- 不活跃会话的场景（NVIDIA 博客《NVIDIA GH200 Superchip Accelerates Inference by 2x in Multiturn Interactions with Llama Models》，2024-10-28）：
  - 用户间歇性交互时，长期把 KV cache 留在显存里浪费资源；卸载到 CPU 内存，用户回来时再载回 GPU。
  - 原文："For the Llama 3 70B model running on a server with NVIDIA H100 Tensor Core GPUs connected through PCIe to an x86 host processor, KV cache offloading can accelerate TTFT by up to 14x."
  - 原文："Offloading KV cache for the Llama 3 70B model on GH200 delivers up to 2x more speedup for TTFT compared to offloading on x86-H100 in multiturn scenarios."（2024-11-08 博客把这两项合写为 x86 H100 上 14 倍、GH200 上 28 倍。）
  - 来源：https://developer.nvidia.com/blog/nvidia-gh200-superchip-accelerates-inference-by-2x-in-multiturn-interactions-with-llama-models/
- Dynamo KV Block Manager（KVBM）：
  - 官方文档定义原文："A scalable runtime component designed to handle memory allocation, management, and remote sharing of Key-Value (KV) blocks for inference tasks across heterogeneous and distributed environments."覆盖 GPU 内存、pinned host 内存、远端 RDMA 内存、本地或分布式 SSD 池、远端文件/对象/云存储；支持 vLLM 和 TensorRT-LLM（SGLang 当时未支持）。
  - 来源：https://docs.dynamo.nvidia.com/dynamo/v-0-7-1/components/kvbm/overview
  - NVIDIA 博客《How to Reduce KV Cache Bottlenecks with NVIDIA Dynamo》（2025-09-18）：KVBM 分三层（模型集成层、内存管理层、基于 NIXL 的存储与传输层）；原文 "NIXL, a low-latency transfer library, Dynamo can quickly move KV Cache blocks between GPU memory and external storage without interrupting inference"。WEKA 测试单 H100 达 35 GB/s、8 卡 270 GB/s。
  - 来源：https://developer.nvidia.com/blog/how-to-reduce-kv-cache-bottlenecks-with-nvidia-dynamo/
  - 2026-04-17 博客提到四级内存层次（GPU、CPU、本地 NVMe、远端存储），块走 write-through 路径，用于让空闲会话持久化。
- 多轮场景下 KVBM 的 TTFT 提升倍数：搜索摘要提到"2.2 倍到 12 倍"，但未能在官方页面原文中核实，按未找到官方数字处理。

## 6. NVIDIA 的 Agent 方向产品

- NeMo Agent Toolkit（原 AgentIQ，后改名 Agent Intelligence toolkit，再改名 NeMo Agent toolkit）：开源库，用于连接和优化多 Agent 团队，框架无关，与 LangChain、LlamaIndex、CrewAI、Microsoft Semantic Kernel、Google ADK 并行工作；提供 profiling、评估、MCP 和 A2A 支持。改名说明见 GitHub README 与官方产品页。
  - 来源：https://github.com/NVIDIA/NeMo-Agent-Toolkit ；https://developer.nvidia.com/nemo-agent-toolkit
- NIM 微服务（NVIDIA 博客，2024-03-18）原文："NIM is a set of optimized cloud-native microservices designed to shorten time-to-market and simplify deployment of generative AI models anywhere, across cloud, data center, and GPU-accelerated workstations."容器内含标准 API、优化推理引擎和企业运行时。
  - 来源：https://developer.nvidia.com/blog/nvidia-nim-offers-optimized-inference-microservices-for-deploying-ai-models-at-scale/

## 7. 最新财季数据中心收入

- NVIDIA 2027 财年第二季度（季度截止 2026-07-26，新闻稿发布 2026-08-26）：总收入 962 亿美元；数据中心收入 890 亿美元，环比增长 18%，同比增长 117%。
  - 来源：https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-second-quarter-fiscal-2027
  - SEC 8-K 附件：https://www.sec.gov/Archives/edgar/data/1045810/000104581026000073/q2fy27pr.htm

## 未找到或未核实的项

- NVIDIA 官方博客没有直接写出带 num_kv_heads 的每 token 公式，只有 num_heads 版本；GQA 版本由 TensorRT-LLM KV Cache Manager 文档的数据结构推出。
- Dynamo 官方文档中"KV-aware routing 在 10 万条 R1 请求上 TTFT 提升 3 倍"和 Agent 用户指南中"turns 2+ TTFT 最高约 3 倍"两个数字，对应文档页面本次无法访问（docs.nvidia.com 被拦截、docs.dynamo.nvidia.com 返回 404），未核实，不要引用。
- NIM 文档中关于 prefix caching 的描述（docs.nvidia.com）本次无法访问。
