# 员工系列已发布清单

> 更新日期：2026-10-16

> 用途：写新的员工系列文章前先查这份清单，了解已经写过哪些公司、用过哪些员工原声。
>
> 出题原则：Agent 面试题不需要跨篇去重，题目重复没关系。筛选标准只有两条，一是和该公司的业务相关，二是和 AI Agent 相关，能给读者提供帮助。系列规划几百篇，去重不现实，也没必要。下面记录每篇的面试题主题，是为了方便查阅同类公司写过什么角度，不是为了回避。
>
> 系列定义：标题为「某公司员工：+ 一句员工原声」，正文由员工原声切入公司业务，再落到该公司相关的 Agent 面试题，标题末尾带「（附Agent面试题）」。
>
> 文件位置：`docs/src/sidebar/itwanger/ai/`
>
> 维护提醒：每发一篇，在本文件补一行并打勾。日期为文件 frontmatter 中的 date 字段。

## 一、已发布（28 篇）

- [x] **2026-07-22 腾讯**｜`agent-mianshi-tengxun-2.md`
  为什么腾讯offer含金量永远都这么高？有人为了进腾讯，2年内面试6次（附Agent面试题）
  面试题角度：长文本、上下文记忆、Harness Engineering 与 Loop Engineering、Skills 放 system 层、SFT/RL、reward 与 verifier、reward hacking、PPO 与 GRPO、Agent 评测

- [x] **2026-07-24 小米**｜`agent-mianshi-xiaomi.md`
  小米员工：从现在开始，除了本职工作每天还要做AI相关的创新工作，AI相关成果会作为核心产出（附Agent面试题）
  面试题角度：Agent 架构、单 Agent 与多 Agent 分工、路由、上下文工程、查询改写、并行化意图识别、Skills 体系、效果评估、Badcase 定位、Self-Attention

- [x] **2026-07-28 中兴**｜`agent-mianshi-zhongxing.md`
  中兴员工：从华子跳到中兴，以前无法理解，直到认识一位14级来养老的，才知道中兴AI发展这么好了（附Agent面试题）
  面试题角度：提示词模板、单/多 Agent 分工、分支覆盖率、代码前置分析、单测生成准确度、过度压缩、Mock 机制、Skills 底层实现、QKV、并行化意图识别、To-Do List 机制

- [x] **2026-07-29 比亚迪**｜`agent-mianshi-byd.md`
  比亚迪员工：工作4年，年薪19万左右，30岁，211本，F3等级，明年后半年，跳槽能涨多少？（附Agent面试题）
  面试题角度：工具调用失败处理、意图优化、测评数据构建、Prompt 心得、Coding Agent 调用量、Vibe Coding 交付、Memory 模块设计、长短期记忆分层与写入更新、Agent 与 Workflow、Badcase 沉淀

- [x] **2026-07-30 阿里**｜`agent-mianshi-ali.md`
  阿里员工：羡慕隔壁组做 Qoder 的，感觉每天一个新花样，年终奖肯定少不了，算是踩中了 AI 时代的红利啊（附Agent面试题）
  面试题角度：框架选型（LangChain/LlamaIndex 与自研）、自主性边界与安全护栏、幻觉与合规拦截、多模态改造、AI Native 与传统软件工程差异、双十一级流量架构挑战

- [x] **2026-08-03 海康威视**｜`haikang-agent-eval-mianshi.md`
  海康威视员工：去年绩效只要是合格及以上的，都会普调，8月份工资见分晓就行了，不用怀疑（附Agent面试题）
  面试题角度：Agent 自进化、自进化产物提取标准、数据质量判断、沙箱环境与隔离、快照时机、评测体系、Harness 层构建、评测维度与业务结合、Go 重写 Agent

- [x] **2026-08-04 长鑫存储**｜`agent-mianshi-changxin.md`
  长鑫存储员工：落地后疯狂扩招，月薪两万多的工程师扎堆涌入，周边房租直接暴涨50%（附Agent面试题）
  面试题角度：Memory 与 DRAM 的联系、KV Cache 显存占用、算力瓶颈与内存带宽瓶颈、多 Agent OOM、记忆分层、存储选型、上下文压缩、KV Cache 量化/分页/卸载、状态持久化与故障恢复、监控指标

- [x] **2026-08-05 腾讯**｜`agent-mianshi-tengxun-3.md`
  腾讯员工：目前 30 来岁，这轮靠 AI 赚了点钱，经济上已经没有太大压力了。同时职场发展基本到头了（附Agent面试题）
  面试题角度：Agent 的真正难点、文档权限校验、终端 Agent 升级桌面级、审计记录、重复调用副作用、长任务续跑、失败重试、模型路由、企业级 Agent 价值评测、会议记录到任务分配

- [x] **2026-08-06 DeepSeek**｜`deepseek-harness-agent-mianshi.md`
  DeepSeek员工：Harness开始内测，有plugin、skill、MCP、Agent开源项目者优先，并赠送API额度（附Agent面试题）
  面试题角度：项目架构与技术栈、Agent 完整流程、Agent 调优手段、语义检索、向量数据库作用、LangChain/LangGraph 底层、输出规则控制、记忆模块设计、多轮多会话 memory、容错与异常处理、context 管理

- [x] **2026-08-07 阿里**｜`agent-mianshi-ali-375.md`
  阿里员工：作为一名合格的375员工，老板在的时候9点走，老板不在的时候6点半走，老板9点前走了那就跟着走（附Agent面试题）
  面试题角度：购物 Agent 全链路、RAG 实时性、高风险操作权限与审计、下单幂等、MCP 封装业务工具、工具动态加载、Harness 任务生命周期、千问驱动的记忆划分、Golden Set、大促延迟与成本

- [x] **2026-08-10 赛力斯**｜`agent-mianshi-sailis.md`
  赛力斯员工：连续两次被打C了，辛辛苦苦用 Agent 做座舱测试，完了领导说我们不看项目结果，只看积极性，你积极性不高，所以被打C了（附Agent面试题）
  面试题角度：端云切分、端侧模型裁剪、断网降级、不可逆操作安全边界、多模态感知与隐私、多轮上下文恢复、端到端延迟预算、鸿蒙跨设备调用、车规OTA灰度回滚、世界模型与座舱Agent边界、Token年预算控制

- [x] **2026-08-11 京东**｜`agent-mianshi-jingdong.md`
  京东员工：实习生、应届生结合JoyCoder写的代码一坨屎，我 Code Review的时候真是一口老血吐屏幕上，这种情况怎么办啊？（附Agent面试题）
  面试题角度：Agent 与传统工作流、聊天机器人的区别、购物 Agent 模块设计、ReAct 与 Plan-and-Execute、MCP 工具封装与 Schema 设计、创建订单防重复、规划与下单之间库存变化的处理、商品描述提示词注入防护、采销 Agent、大促期间价格优惠券库存的时效、客服 Agent 的 RAG 设计、购物与履约 Agent 整体架构

- [x] **2026-08-12 宇树科技**｜`agent-mianshi-yushu.md`
  宇树员工：入职五年了，薪资一共涨了 58%，主要是入职时的基数太低了，不过现在已经很知足了（附Agent面试题）
  面试题角度：软件Agent与具身Agent区别、VLM/VLA/LLM+工具调用架构对比、大脑与小脑分工、世界模型训练、Skill封装与Tool Calling、模糊指令拆解、VLA训练数据、OTA灰度发布与回滚、具身Agent Memory设计、仿真+合成+真实数据混合训练、收拾桌子Agent系统设计

- [x] **2026-08-13 DeepSeek**｜`deepseek-v4-pro-agent-mianshi.md`
  DeepSeek 员工：DeepSeek V4 Pro 正式发布，Harness 也进入最后一个内测版本（附Agent面试题）
  面试题角度：Pro vs Flash 激活参数与 Agent 能力、模型路由设计、成本延迟并发权衡、前缀缓存与上下文布局、Preview vs 正式版工程差异、后训练提升 Agent 能力、版本管理与灰度切换、Harness 概念与分层、Harness 工程设施差异、上下文压缩机制、Responses API vs Chat Completions、DeepSeek Harness vs Better Harness

- [x] **2026-08-25 字节跳动**｜`agent-mianshi-zijie.md`
  字节员工：部门对 AI 作弊零容忍，逮到作弊的终生不录用，其实作弊还是很明显的，比如眼睛往一个方向瞟，或者切屏幕（附Agent面试题）
  面试题角度：Agent 项目经历、Coding Agent 记忆、与 Claude Code/Codex 的区别、Agent 评测、云 Agent 容器迁移或重启后的上下文恢复、Goal 任务持续推进与行为漂移、Coding Agent 接入的模型、模型能力强时 Agent 最重要的是什么、Lost in the Middle、广告投放策略自动优化 Agent 设计

- [x] **2026-08-26 阿里**｜`agent-mianshi-ali-qwen.md`
  阿里员工：在 Qwen 事业部一个月，周末来公司健身灯都是关的，基本没人加班。最爽的是正式员工每月 200 刀 AI 额度，能感受到踩中 AI 红利的轻松氛围了（附Agent面试题）
  面试题角度：自我介绍与项目串联、Agent项目架构设计、单Agent/多Agent/Workflow选型、ReAct执行流程与Observation注回、Tool Message设计与tool_call_id绑定、短期长期记忆实现、上下文窗口溢出两层压缩、多模态视觉编码器融合、SFT/RL/Agentic CFT与Observation Mask、Redis会话缓存/语义缓存/分布式锁/速率限制

- [x] **2026-08-27 腾讯**｜`agent-mianshi-tengxun-4.md`
  鹅厂员工：羡慕隔壁组做 WorkBuddy 的，月活1000万+，已经成为AI办公的王牌，感觉晋升和年终奖肯定少不了（附Agent面试题）
  面试题角度：三级容错恢复（重试/状态持久化/快照回滚）、LangGraph条件边与断点续执行、ReAct同步异步工具调用、多模态RAG两条技术路线、LLM生成描述的信息瓶颈、Recall@K计算与测试集构建、LoRA低秩分解与DPO偏好优化、IVF倒排索引与nprobe调参、游戏NPC Agent三层架构、AI Coding国产替代与Harness方案

- [x] **2026-08-31 美团**｜`agent-mianshi-meituan.md`
  美团员工：羡慕隔壁 LongCat 团队的兄弟，作为公司 AI 战略的王牌，已经成为 C 端小团、B 端 NoCode 等产品基座。这种资源一路绿灯的团队，年终奖和晋升肯定不会少（附 Agent 面试题）
  面试题角度：智能运维Agent动机与架构、RAG vs 大上下文窗口、RAG vs Agent grep、切块粒度与混合检索权重、无标题Markdown切分、短query与长chunk嵌入差异、HyDE查询扩展、长query处理、LLM-as-Judge错误检测与引用核验、Agent与Harness区别与职责、两层上下文压缩、Prompt Cache前缀命中、Vibe Coding与Spec Coding

- [x] **2026-09-01 中国银行**｜`agent-mianshi-zhonghang.md`
  中行总部员工：211硕士毕业刚满一年，在软件中心做研发，转正之后第一个完整年拿了22万左右，六险二金拉满，很满意（附 Agent 面试题）
  面试题角度：RAG瓶颈定位（Embedding rate limit/KNN扫描/LLM串行）、架构优化（查询改写/语义缓存/动态权重）、Badcase定位问题再打标与Golden Set回归、海量异步任务耗时统计（滑动窗口/T-Digest）、Vibe Coding设计分布式限流（令牌桶/Redis Lua）、分布式限流一致性与降级、全自动流水线可靠性、订单分页（OFFSET vs Keyset）、支付回执时间切面、token传递防串号、对账超时归并优化、状态机防回退、Vibe Coding工程实践

- [x] **2026-09-04 亚信科技**｜`yaxin-keji-agent-mianshi.md`
  亚信科技员工：公司确定参与Kimi Token 利润分成，我相信5G专网将在AI的推动下进入一轮爆发期，很期待（附Agent面试题）
  面试题角度：PaiCLI 项目动机、MySQL 索引失效、消息队列在 Agent 系统中的作用、多模态大模型结构、Redis 应用场景、RAG 父子索引、ReAct 消息格式、tool response 角色、Agentic CPT/SFT/RL 三阶段训练、Agent 记忆机制

- [x] **2026-09-11 字节跳动**｜`agent-mianshi-zijie-aitest.md`
  宇宙厂员工：坐标北京月base 7.7，年终奖按3个月算，23万股权激励每年30万，总包差不多 145万（附Agent面试题）
  面试题角度：竞品分析报告任务拆解、人在 Agent 工作流中的作用、检索外部资料的版权风险、合并有序数组的测试用例设计、大数据量下的性能/内存/线程安全、百万级有序数组优化、大模型从零开发到落地的阶段、预训练/中训练/后训练、SWE 数据集、AI 测试开发岗位理解

- [x] **2026-09-14 小米**｜`xiaomi-coding-agent-mianshi.md`
  xiaom员工：年终奖3月5号发，已经谈了系数，今年的年终奖有点给力，基本都拿满了（附Agent面试题）
  面试题角度：本地 Coding Agent 完整流程、多模型后端的请求格式抽象、工具注册与发现、工具调用失败处理、多轮任务上下文治理、压缩后的校验标准、任务摘要/文件摘要/过程笔记的生成与维护、摘要遗漏关键约束的发现与修复、过时文件摘要污染长期记忆、错误结论写入记忆

- [x] **2026-09-23 华为**｜`huawei-agent-rag-mianshi.md`
  菊厂员工：朋友家的孩子，上海交大毕业后进入华子年薪42万，干了一年，OPPO来挖他做芯片，直接开到56万（附Agent面试题）
  面试题角度：记忆污染管理、上下文压缩与语义精确性权衡、提示词注入与工具执行数据污染、模型调用前后与工具执行前的安全措施、Top-K 取值、结构化切分与非结构化数据结构化、简历建库、分块稳定性与效果评估、降低幻觉、强制引用来源与虚空引用、上线后效果观测、知识库保鲜、OOM 风险点、冲突文档处理、MinIO 上传

- [x] **2026-10-06 OPPO**｜`paismart-paicli-mianshi.md`
  OPPO员工：工位对面坐了一个O16职级的女孩，每天上班乐呵呵的，两口子每年100多万，确实没理由上班不乐呵（附Agent面试题）。
  面试题角度：Kafka 异步解析、并发触发文件合并、十万人规模企业的加强方向、CompletableFuture 并行编排、无界队列堆积、模型每秒 50 请求的限流、解析任务卡在中间状态的恢复、大文件一次性读取、服务商超时下自动重试与用户重复点击

- [x] **2026-10-09 海康威视**｜`haikang-robot-agent-mianshi.md`
  海康员工：机器人业务现在是双休，周一到周四，早九点到晚八点半，周五五点下班，海康真不卷（附Agent面试题）
  面试题角度：Tool Registry 参数校验与异常兜底、串行调用大模型的接口超时、stdio 子进程通信、JavaParser 构建代码上下文、并发 Agent 下 Java 后端 GC、Kafka 与 Spring 异步线程池对比、黑盒生产者速率不可控时的有界/无界队列重构

- [x] **2026-10-13 字节跳动**｜`agent-mianshi-zijie-compiler.md`
  宇宙厂员工：不打算往上爬的话，苟在2-2/3性价比最高，尽量多存款多靠近AI，再往上，过程累、成功率30%左右（附Agent面试题）
  面试题角度：AI 项目串联、RAG 混合检索相关性计算（cosine 与 RRF k=60）、BM25 三因子与 ik 分词粒度、三种降级模式下分数的值域与阈值扫描

- [x] **2026-10-15 张江芯片 / 字节跳动**｜`agent-mianshi-zijie-bianyiqi.md`
  张江芯片员工：32岁税前80个，没有互联网那么卷，现在国产卡都在招人，算是踩中这波算力红利了（附Agent面试题）
  面试题角度：AI 编译器岗位内容与字节开源（ByteIR/Flux/Triton-distributed）、CPU 与 GPU 架构区别、GPU 存储层级与 TMA/线程块簇/Tensor Memory、LLVM 与 MLIR 渐进式 lowering 与 Triton 四级 IR、AI/GPU DSL 生态与国产路线

- [x] **2026-10-16 蚂蚁集团**｜`paismart-agent-intent-hallucination-mianshi.md`
  蚂蚁员工：现在这些应届生，base开这么高，结果菜得不行，入职大半年了离了AI啥都不会干，怎么招的人，还自以为很厉害（附Agent面试题）
  面试题角度：派聪明项目整体介绍、用户点不满意后的实时修正与离线评测集回归、ReAct 意图识别与第一轮强制检索加五类白名单、单次多意图并行与分步调用及引用编号顺延、检索/生成/事后逐句核验三阶段幻觉治理

## 二、已覆盖公司统计

| 公司 | 篇数 | 已发布日期 |
|---|---|---|
| 腾讯 | 3 | 07-22、08-05、08-27 |
| 小米 | 2 | 07-24、09-14 |
| 中兴通讯 | 1 | 07-28 |
| 比亚迪 | 1 | 07-29 |
| 阿里巴巴 | 3 | 07-30、08-07、08-26 |
| 海康威视 | 2 | 08-03、10-09 |
| 长鑫存储 | 1 | 08-04 |
| DeepSeek | 2 | 08-06、08-13 |
| 赛力斯 | 1 | 08-10 |
| 京东 | 1 | 08-11 |
| 宇树科技 | 1 | 08-12 |
| 字节跳动 | 4 | 08-25、09-11、10-13、10-13 |
| 美团 | 1 | 08-31 |
| 中国银行 | 1 | 09-01 |
| 亚信科技 | 1 | 09-04 |
| 华为 | 1 | 09-23 |
| OPPO | 1 | 10-06 |
| 蚂蚁集团 | 1 | 10-16 |

## 三、公司池里尚未写过的（候选）

对照 `china-ai-company-checklist.md`，以下公司还没出过员工系列，可优先选题。

### 第一梯队大厂

- [ ] 百度
- [ ] 网易
- [ ] 快手
- [ ] 滴滴
- [ ] 拼多多

### AI 原生模型公司

- [ ] 智谱
- [ ] 月之暗面
- [ ] MiniMax
- [ ] 阶跃星辰
- [ ] 零一万物
- [ ] 百川智能
- [ ] 商汤科技
- [ ] 科大讯飞
- [ ] 第四范式
- [ ] 昆仑万维
- [ ] 面壁智能

### 芯片、算力与硬科技

- [ ] 寒武纪
- [ ] 海光信息
- [ ] 地平线
- [ ] 浪潮信息
- [ ] 中科曙光
- [ ] 中芯国际
- [ ] 长江存储
- [ ] 大疆
- [ ] 联影医疗
- [ ] 大华股份

### 智能驾驶与机器人

- [ ] 小鹏汽车
- [ ] 理想汽车
- [ ] 蔚来
- [ ] 吉利 / 极氪
- [ ] 零跑汽车
- [ ] Momenta
- [ ] 小马智行
- [ ] 文远知行
- [ ] 智元机器人
- [ ] 优必选

## 四、相邻系列（面试官体）

这些不属于员工系列，但同样带 Agent 面试题，写作时可以参考它们的出题角度。

- [x] 2026-04-17 `agent-mianshi.md`｜阿里一面，我霸气反问：你说你们在做Agent项目，说说langchain、muti-agent、a2a这些你们都是怎么做的？面试官一直在擦汗。。
- [x] 2026-07-20 `agent-mianshi-kangya.md`｜面试官皱眉：“就一个Agent项目也敢来面试？”我气笑了：“简历下半页还有一个你倒是看看啊。”面试官：“挺能抗压啊你。”
- [x] 2026-07-21 `agent-mianshi-tengxun.md`｜腾讯面试官：“你说你做了一个终端Agent，那说说 LLM 和 Agent的区别，ReAct、MCP、Tool、Memory、Skills？”我信誓旦旦开始背了起来～
- [x] 2026-07-23 `agent-mianshi-shengchanji.md`｜面试官皱眉：“让你负责一个生产级 Agent，你会怎么设计？”，我上来就开始背 ReAct、Function Calling、Skills。面试官听完摇头。
- [x] 2026-07-27 `agent-mianshi-xiecheng.md`｜面试官：“看简历你在做终端 Agent，那你说说Prompt组装、上下文压缩、Tool与Skill区别、多Agent编排、Plan设计？”我心里暗喜，开背～

## 五、标题写法规律（从已发布 27 篇里总结）

- 结构固定为「公司名 + 员工：+ 员工原声原句 +（附Agent面试题）」，正文标题去掉括号部分也成立。
- 员工原声保留口语，不做书面化改写，长度控制在 40 到 55 字之间。
- 原声题材集中在四类：绩效与考核、薪资与跳槽、组织与业务对比、招聘与扩招。
- 同一家公司再写时换题材，不换公司名写法，例如腾讯两篇分别写 offer 含金量和职业天花板。
