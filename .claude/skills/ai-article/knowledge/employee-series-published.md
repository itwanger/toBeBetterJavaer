# 员工系列已发布清单

> 用途：写新的员工系列文章前先查这份清单，了解已经写过哪些公司、用过哪些员工原声。
>
> 出题原则：Agent 面试题不需要跨篇去重，题目重复没关系。筛选标准只有两条，一是和该公司的业务相关，二是和 AI Agent 相关，能给读者提供帮助。系列规划几百篇，去重不现实，也没必要。下面记录每篇的面试题主题，是为了方便查阅同类公司写过什么角度，不是为了回避。
>
> 系列定义：标题为「某公司员工：+ 一句员工原声」，正文由员工原声切入公司业务，再落到该公司相关的 Agent 面试题，标题末尾带「（附Agent面试题）」。
>
> 文件位置：`docs/src/sidebar/itwanger/ai/`
>
> 维护提醒：每发一篇，在本文件补一行并打勾。日期为文件 frontmatter 中的 date 字段。

## 一、已发布（17 篇）

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

- [x] **2026-07-31 字节跳动**｜`agent-mianshi-zijie.md`
  字节员工：羡慕隔壁组豆包，有了飞书，AI 办公场景又可以和钉钉+千问，WorkBuddy+企微大战一场了，绩效不会低（附Agent面试题）
  面试题角度：Claude Code 架构、短期记忆实现、多轮对话优化与总结累加、长期记忆检索时机、工具过多的 Token 消耗、RAG 实现、向量相似度、多模型编排、幻觉控制、召回块观测

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

- [x] **2026-08-12 宇树科技**｜`agent-mianshi-yushu.md`
  宇树科技员工：入职五年了，薪资一共涨了 58%，主要是入职时的基数太低了，不过现在已经很知足了（附Agent面试题）
  面试题角度：软件Agent与具身Agent区别、VLM/VLA/LLM+工具调用架构对比、大脑与小脑分工、世界模型训练、Skill封装与Tool Calling、模糊指令拆解、VLA训练数据、OTA灰度发布与回滚、具身Agent Memory设计、仿真+合成+真实数据混合训练、收拾桌子Agent系统设计

- [x] **2026-08-13 DeepSeek**｜`deepseek-v4-pro-agent-mianshi.md`
  DeepSeek 员工：DeepSeek V4 Pro 正式发布，Harness 也进入最后一个内测版本（附Agent面试题）
  面试题角度：Pro vs Flash 激活参数与 Agent 能力、模型路由设计、成本延迟并发权衡、前缀缓存与上下文布局、Preview vs 正式版工程差异、后训练提升 Agent 能力、版本管理与灰度切换、Harness 概念与分层、Harness 工程设施差异、上下文压缩机制、Responses API vs Chat Completions、DeepSeek Harness vs Better Harness

- [x] **2026-08-26 阿里**｜`agent-mianshi-ali-qwen.md`
  阿里员工：在 Qwen 事业部一个月，周末来公司健身灯都是关的，基本没人加班。最爽的是正式员工每月 200 刀 AI 额度，能感受到踩中 AI 红利的轻松氛围了（附Agent面试题）
  面试题角度：自我介绍与项目串联、Agent项目架构设计、单Agent/多Agent/Workflow选型、ReAct执行流程与Observation注回、Tool Message设计与tool_call_id绑定、短期长期记忆实现、上下文窗口溢出两层压缩、多模态视觉编码器融合、SFT/RL/Agentic CFT与Observation Mask、Redis会话缓存/语义缓存/分布式锁/速率限制

- [x] **2026-08-27 腾讯**｜`agent-mianshi-tengxun-4.md`
  腾讯员工：羡慕隔壁组做 WorkBuddy 的，月活1000万+，已经成为AI办公的王牌，感觉晋升和年终奖肯定少不了（附Agent面试题）
  面试题角度：三级容错恢复（重试/状态持久化/快照回滚）、LangGraph条件边与断点续执行、ReAct同步异步工具调用、多模态RAG两条技术路线、LLM生成描述的信息瓶颈、Recall@K计算与测试集构建、LoRA低秩分解与DPO偏好优化、IVF倒排索引与nprobe调参、游戏NPC Agent三层架构、AI Coding国产替代与Harness方案

- [x] **2026-08-31 美团**｜`agent-mianshi-meituan.md`
  美团员工：羡慕隔壁 LongCat 团队的兄弟，作为公司 AI 战略的王牌，已经成为 C 端小团小美和 B 端 NoCode 等产品基座（附Agent面试题）
  面试题角度：智能运维Agent动机与架构、RAG vs 大上下文窗口、RAG vs Agent grep、切块粒度与混合检索权重、无标题Markdown切分、短query与长chunk嵌入差异、HyDE查询扩展、长query处理、LLM-as-Judge错误检测与引用核验、Agent与Harness区别与职责、两层上下文压缩、Prompt Cache前缀命中、Vibe Coding与Spec Coding

- [x] **2026-09-01 中国银行**｜`agent-mianshi-zhonghang.md`
  中行总部员工：211硕士毕业刚满一年，在软件中心做研发，转正之后第一个完整年拿了22万左右，很满意（附Agent面试题）
  面试题角度：RAG瓶颈定位（Embedding rate limit/KNN扫描/LLM串行）、架构优化（查询改写/语义缓存/动态权重）、Badcase归因打标与Golden Set回归、海量异步任务耗时统计（滑动窗口/T-Digest）、Vibe Coding设计分布式限流（令牌桶/Redis Lua）、分布式限流一致性与降级、全自动流水线可靠性、订单分页（OFFSET vs Keyset）、支付回执时间切面、token传递防串号、对账超时归并优化、状态机防回退、Vibe Coding工程实践

## 二、已覆盖公司统计

| 公司 | 篇数 | 已发布日期 |
|---|---|---|
| 腾讯 | 3 | 07-22、08-05、08-27 |
| 阿里巴巴 | 3 | 07-30、08-07、08-26 |
| 小米 | 1 | 07-24 |
| 中兴通讯 | 1 | 07-28 |
| 比亚迪 | 1 | 07-29 |
| 字节跳动 | 1 | 07-31 |
| 海康威视 | 1 | 08-03 |
| 长鑫存储 | 1 | 08-04 |
| DeepSeek | 2 | 08-06、08-13 |
| 赛力斯 | 1 | 08-10 |
| 宇树科技 | 1 | 08-12 |
| 美团 | 1 | 08-31 |
| 中国银行 | 1 | 09-01 |

## 三、公司池里尚未写过的（候选）

对照 `china-ai-company-checklist.md`，以下公司还没出过员工系列，可优先选题。

### 第一梯队大厂

- [ ] 百度
- [ ] 华为
- [x] 美团
- [ ] 京东
- [ ] 网易
- [ ] 快手
- [ ] 滴滴
- [ ] 拼多多
- [ ] 蚂蚁集团

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

- [x] 赛力斯
- [ ] 小鹏汽车
- [ ] 理想汽车
- [ ] 蔚来
- [ ] 吉利 / 极氪
- [ ] 零跑汽车
- [ ] Momenta
- [ ] 小马智行
- [ ] 文远知行
- [x] 宇树科技
- [ ] 智元机器人
- [ ] 优必选

## 四、相邻系列（面试官体）

这些不属于员工系列，但同样带 Agent 面试题，写作时可以参考它们的出题角度。

- [x] 2026-04-17 `agent-mianshi.md`｜阿里一面，我霸气反问：你说你们在做Agent项目，说说langchain、muti-agent、a2a这些你们都是怎么做的？面试官一直在擦汗。。
- [x] 2026-07-20 `agent-mianshi-kangya.md`｜面试官皱眉：“就一个Agent项目也敢来面试？”我气笑了：“简历下半页还有一个你倒是看看啊。”面试官：“挺能抗压啊你。”
- [x] 2026-07-21 `agent-mianshi-tengxun.md`｜腾讯面试官：“你说你做了一个终端Agent，那说说 LLM 和 Agent的区别，ReAct、MCP、Tool、Memory、Skills？”我信誓旦旦开始背了起来～
- [x] 2026-07-23 `agent-mianshi-shengchanji.md`｜面试官皱眉：“让你负责一个生产级 Agent，你会怎么设计？”，我上来就开始背 ReAct、Function Calling、Skills。面试官听完摇头。
- [x] 2026-07-27 `agent-mianshi-xiecheng.md`｜面试官：“看简历你在做终端 Agent，那你说说Prompt组装、上下文压缩、Tool与Skill区别、多Agent编排、Plan设计？”我心里暗喜，开背～

## 五、标题写法规律（从已发布 11 篇里总结）

- 结构固定为「公司名 + 员工：+ 员工原声原句 +（附Agent面试题）」，正文标题去掉括号部分也成立。
- 员工原声保留口语，不做书面化改写，长度控制在 40 到 55 字之间。
- 原声题材集中在四类：绩效与考核、薪资与跳槽、组织与业务对比、招聘与扩招。
- 同一家公司再写时换题材，不换公司名写法，例如腾讯两篇分别写 offer 含金量和职业天花板。
