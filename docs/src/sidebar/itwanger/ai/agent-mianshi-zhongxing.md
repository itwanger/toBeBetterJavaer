---
title: 中兴员工：从华子跳到中兴，以前无法理解，直到认识一位14级来养老的，才知道中兴AI发展这么好了（附Agent面试题）
shortTitle: 中兴Agent面试12问
description: 中兴员工爆料从华为跳槽到中兴，12道Agent工程面试题全解：提示词模板组装、单Agent vs 多Agent、分支覆盖率统计原理、代码插桩、Mock自动生成、Skills设计原理、LLM底层输入、Self-Attention计算，附场景题。
keywords: Agent面试题, 提示词模板, 分支覆盖率, Mock机制, Self-Attention
tag:
  - 面试
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-07-28
---

如题，以前我也无法理解，觉得华子才是通信领域的扛把子啊。

直到我在 WAIC 看到中兴展示的全球首款 AI 智能体手机，用户只要说一句话就能让 AI 跨应用执行复杂任务。

跨 APP 查信息、订酒店、订机票、发消息、做对比，不需要一个个 APP 点开操作。

不只是在语音助手里嵌入一个大模型，而是涉及到比如多模态融合意图理解 + GUI 感知 + 多步任务规划 + 跨应用执行 + 安全边界。

一个完整的智能体工程啊。

换句话说，想进入 AI 赛道不需要只盯着头部AI的公司（智谱、Kimi、阿里、腾讯），中兴这种在AI时代转型的传统行业大厂也是一个不错的选择。

![截图来自牛客的下雨不愁](https://cdn.paicoding.com/stutymore/sucai-20260728083251.png)

别的我就不多说了，免得你觉得我是中兴的小吹子，其实我只是希望你多一个视角去看待这些传统老牌大厂而已（顺带分享一些 AI Agent 的面试题，纯公益事业）。

当然，你也不需要只盯着模型和算法。

后端的智能体服务、任务编排、工具调用、模型部署，客户端的 OS 交互、跨应用执行，安全方向的权限、隐私、风险控制，测试方向的长程任务稳定性等，都是非常值得冲的方向。

**AI 时代，改变的太多了，无论是个人还是公司**。

但有一点没变，你我都需要，让自己在这个时代分一杯羹吃，别让别人都吃了，就可以😄。

如果你是一位愿意相信努力、相信过程、相信一步一个脚印、相信自己能在 AI 时代分一杯羹的人，那接下来这份硬核的面经，希望你能认真读一读。

![](https://cdn.paicoding.com/stutymore/agent-mianshi-zhongxing-20260728104758-627e530f.png)

（全文比较肝，保证大家能学到很多很多，系好安全带，我们粗粗粗粗发～）

## content

PS：PaiCLI 是一个类 Claude Code 的终端 Agent，已开源。如果想拥有一个 Agent 项目经验，可以参考。

![](https://cdn.paicoding.com/stutymore/agent-mianshi-zhongxing-20260728131849.png)

> GitHub: https://github.com/itwanger/PaiCLI-Python

### 01、提示词模板是怎么搭的？

老王拿起桌上那份简历扫了一眼，看完把简历翻过来扣在桌上，从厚厚的镜片中心看着我：

“你之前做的 Agent 项目，提示词模板是怎么搭的？一次性拼完还是分层组装？”

“按照固定顺序拼接。”

![](https://cdn.paicoding.com/stutymore/agent-mianshi-zhongxing-20260728100523.png)

“前四层是静态的——身份定义、人格风格、执行模式指令集、审批策略，整个会话期间不变。后五层是动态的——运行时上下文、项目记忆、Skills 索引、压缩策略、收尾指令，每轮更新。”

“核心就一条：静态内容排最前面。Prompt Caching 按最长公共前缀命中，前缀越稳定缓存命中率越高，token 成本差不多能省一个数量级。”

### 02、单Agent还是多Agent？子Agent具体怎么分工？

“默认单 Agent。”

“ReAct 循环能解决大部分任务——LLM 决策、工具调用、观察结果、再决策。复杂任务有两条升级路径。”

![](https://cdn.paicoding.com/stutymore/agent-mianshi-zhongxing-20260728101301.png)

“Plan-and-Execute 是先规划再执行。规划器输出带依赖关系的任务图，按拓扑排序分批跑，中途失败触发重新规划。”

“Team 模式是三角色协作。规划器只输出计划不碰工具，Worker 拿着完整工具集干活，审查器检查产出，不合格打回重做，最多两次。”

“关键是角色隔离——规划器和审查器都不碰工具，工具执行权集中在 Worker 手里。审查器自己改代码自己审。”

### 03、分支覆盖率的统计原理是什么？

我说完架构，老王低头看了一眼手表——不像是在看时间，更像是展示他那光彩炫目的劳力士。

“换个方向。分支覆盖率的统计原理是什么？”

“原理是代码插桩。在每个分支节点——if/else、switch/case、try/catch、三元表达式——插入一个计数器。测试跑完之后统计哪些分支被执行过、哪些没有。覆盖率就是已执行分支数除以总分支数。”

![](https://cdn.paicoding.com/stutymore/agent-mianshi-zhongxing-20260728103751-a8752118.png)

#### 代码插桩怎么实现的？

“两条路线。”

“源码级插桩是 AST 改写——编译前把探针代码插到源码里。Istanbul 走的就是这条路，JavaScript 和 TypeScript 的覆盖率工具基本都基于它。”

“字节码级插桩是编译后改字节码。JaCoCo 用 Java Agent 在类加载时动态织入探针，不动源码，对开发者完全透明。”

![](https://cdn.paicoding.com/stutymore/agent-mianshi-zhongxing-20260728101934-fff8202c.png)

“源码级跨语言通用，字节码级不侵入源码。”

### 04、有没有做过代码前置分析？怎么判断代码有效性？

“做了。代码喂给模型之前先跑一遍前置分析。”

“第一步 AST 解析，确认语法完整——解析失败的文件直接跳过，不浪费 token。第二步依赖分析，从 AST 里提取所有外部调用——数据库操作、HTTP 请求、文件读写——后面生成 Mock 要用。第三步接口签名提取——方法名、参数类型、返回值类型、异常声明，这些是模型生成测试代码的核心输入。”

![](https://cdn.paicoding.com/stutymore/agent-mianshi-zhongxing-20260728102113-2bea47f4.png)

“有效性判断有三条：语法可解析、关键依赖可达、方法签名完整。三条都过了才进生成队列。”

#### 优化指标怎么设计？

“分层。”

- 第一层编译通过率——生成的测试代码能不能编译。
- 第二层运行通过率——编译过了跑起来有没有报错。
- 第三层覆盖率增量——跑完之后分支覆盖率比之前提高了多少。
- 第四层断言质量——断言要真的在验证业务逻辑，不是 assertNotNull 凑数。

![](https://cdn.paicoding.com/stutymore/agent-mianshi-zhongxing-20260728102247-a7259f37.png)

### 05、哪些代码会让单测生成的准确度变低？

“几类特别难。”

“高耦合——一个方法里调了五六个外部服务，Mock 链条太长，生成的测试代码大概率编译都过不了。”

“全局状态依赖。static 变量、单例模式、ThreadLocal，状态在测试之间互相污染。”

![](https://cdn.paicoding.com/stutymore/agent-mianshi-zhongxing-20260728102414-d39a99ac.png)

“反射和动态代理。AST 只能看到静态调用关系，运行时通过反射调的方法，依赖分析根本发现不了。”

“异步回调也是重灾区。”

#### AST和LSP搞不定的怎么过滤？

“打分制。给每个方法算一个可测试性分数。”

“输入维度：外部依赖数量、嵌套深度、有没有用反射、有没有异步调用、方法圈复杂度。加权求和，低于阈值的方法标记为'不建议自动生成'，跳过。”

![](https://cdn.paicoding.com/stutymore/agent-mianshi-zhongxing-20260728102556-0f64ee98.png)

“阈值不是随意定的。跑一段时间后用实际结果校准——分数高但生成失败的，分析原因，调权重。”

### 06、模型因为压缩过度效果不理想，怎么发现、怎么处理？

老王把简历重新翻过来，扫了一眼上面的项目经历，像是在核对我刚才说的和简历上写的对不对得上。

“怎么发现的。每批生成任务跑完后自动比对这一批的输出质量。最直接的指标是编译通过率——如果比历史均值低了 15% 以上，大概率是输入压缩过头了，模型拿到的代码信息不够。”

![](https://cdn.paicoding.com/stutymore/agent-mianshi-zhongxing-20260728102739-ed836e9a.png)

“处理分两步。第一步标记不可压缩区域——方法签名、核心业务逻辑、关键依赖声明，压缩了就完蛋。能压的是 import 列表、注释、getter/setter 这类模板代码。”

“第二步动态调整压缩比。目标 token 数设成一个范围，不是固定值。这一批质量下降了，下一批自动放宽 token 预算，牺牲一点成本换回质量。”

### 07、Mock机制是怎么实现的？

“Mock 机制是怎么实现的？”老王端起茶杯吹了吹热气，问得很随意。

“分三步。”

“第一步依赖识别。AST 解析提取方法体里所有外部调用——数据库操作看 JPA Repository 或 MyBatis Mapper 的注解，HTTP 请求看 RestTemplate 或 WebClient，文件操作看 java.io 和 java.nio 的引用。”

![](https://cdn.paicoding.com/stutymore/agent-mianshi-zhongxing-20260728122844-07ce49fb.png)

“第二步策略选择。数据库调用用 @MockBean 配合 when/thenReturn，HTTP 调用用 WireMock 起本地服务，文件操作用 @TempDir。每种依赖类型一套模板。”

“第三步注入。Mock 声明和 setup 代码拼到 @BeforeEach 里，模型只管写断言逻辑。”

“最容易踩坑的是粒度。Mock 太粗，测试覆盖不到真实的业务逻辑；Mock 太细，维护成本爆炸。原则是只 Mock 跨进程的调用——数据库、网络、文件系统。进程内的依赖尽量用真实对象。”

### 08、Skills的底层是怎么实现的？

“渐进式披露，分三层加载。”

“索引层只放 Skill 名称和一句描述，控制在 4KB 以内。模型看到索引，判断当前任务需要哪个 Skill，调 load_skill 工具把完整指令加载进来。”

![](https://cdn.paicoding.com/stutymore/agent-mianshi-zhongxing-20260728123337-32cdb8c9.png)

“加载后推入 LRU 缓冲区，最多同时持有 3 个 Skill，超出的按最久未使用淘汰。缓冲区在下一轮 LLM 调用前一次性注入用户消息，注入完清空。”

#### 为什么不一次全量加载？

system prompt 越长，Prompt Caching 命中率越低。大多数对话只用到一两个 Skill，全量加载等于让用户为用不到的 Skill 浪费 token 成本。

### 09、喂给模型的输入到底是什么？

老王突然把眼镜摘下来，捏着镜腿，继续问。
“LLM 底层你了解多少？喂给模型的输入到底是什么，能说清楚吗？”

“文本进来先过 Tokenizer。Tokenizer 不是按字或按词切的，是按子词（Subword）切——BPE 算法根据训练语料统计频率，高频词保留完整，低频词拆成更小的片段。切完之后每个片段对应一个 Token ID。”

![](https://cdn.paicoding.com/stutymore/agent-mianshi-zhongxing-20260728123701-e7d4cc8b.png)

“Token ID 去查 Embedding 表，每个 ID 映射成一个高维向量。”

“然后加位置编码。Embedding 本身不带位置信息，模型不知道一个词出现在句首还是句尾。RoPE 把位置信息编进向量里。”

“最后这一串高维向量送进 Transformer 的多层 Self-Attention 和 FFN。模型看到的不是'你好'两个字，是两个高维向量。”

### 10、QKV为什么要这么分？怎么算的？

“每个 token 的 Embedding 向量分别乘以三个权重矩阵 W_Q、W_K、W_V，生成 Query、Key、Value 三个向量。”

![](https://cdn.paicoding.com/stutymore/agent-mianshi-zhongxing-20260728123912-b151170a.png)

“Q 和所有位置的 K 做点积，得到注意力分数。除以 √d_k 缩放——防止点积值太大导致 softmax 输出接近 one-hot，梯度消失。softmax 归一化之后，用这个概率分布对所有 V 加权求和，得到当前 token 的输出。”

“Q 是'我在找什么信息'，K 是'我能匹配什么查询'，V 是'匹配上了实际传递什么内容'。一个向量同时干三件事，只能算自相似度，表达能力有限。三个独立的权重矩阵，3 倍的可学习参数。”

#### 同一个token在不同位置的向量是一样的吗？

“不一样。RoPE 会根据 token 位置对 Q 和 K 做旋转变换，旋转角度和位置成正比。同一个'的'字出现在第 5 个位置和第 50 个位置，向量方向不同。”

![](https://cdn.paicoding.com/stutymore/agent-mianshi-zhongxing-20260728124154-ed433eb0.png)

## 场景题

### 11、为什么要搞并行化意图识别？具体怎么实现的？

老王把眼镜重新戴上。我以为快结束了，开始在心里盘自己答得怎么样。他端起茶杯喝了一口，不急不慢。

“再来两道场景题。”他把茶杯放回桌角，“并行化意图识别了解吗？为什么要做并行？”

“传统意图识别是串行——先分类意图，再抽取实体，再判断领域，再评估紧急程度。下一步要等上一步完成。”

![](https://cdn.paicoding.com/stutymore/agent-mianshi-zhongxing-20260728124431-33d5d7c6.png)

“但如果几个维度之间没有依赖关系。意图分类不需要等实体抽取的结果，领域判断也不依赖紧急程度。独立成并行任务跑就对了。”

“实现上，每个维度定义成一个独立的分类器，用 CompletableFuture 并发执行，全部返回后在路由层合并结果。”

### 12、有没有做过To-Do List机制？

“做过。To-Do List 是给模型做结构化的任务追踪。”

“LLM 在长对话里容易出两个问题：忘了前面做过什么，重复操作；漏掉某个步骤，直接跳到最后。To-Do List 把'已完成'和'待完成'的步骤显式列出来，每一轮注入上下文，模型看到当前进度，自然知道下一步做什么。”

![](https://cdn.paicoding.com/stutymore/agent-mianshi-zhongxing-20260728124657-e0c61493.png)

#### 为什么能让模型更聚焦？

“模型的注意力机制是对整个上下文做加权。对话越长，早期信息被稀释得越厉害。To-Do List 每轮都在上下文最新位置出现，天然占据注意力权重的高位。”

![](https://cdn.paicoding.com/stutymore/agent-mianshi-zhongxing-20260728125110-3251d8d9.png)

“落地方式是把 To-Do List 作为特殊的系统消息，每轮 LLM 调用前更新。模型完成一个步骤后调用 update_todo 标记为完成，新步骤也可以动态追加。”

## ending

以前面试拼八股文，背并发、背中间件、背设计模式。现在的面试官问提示词怎么组装、分支覆盖率怎么统计、Mock 怎么自动生成、QKV 为什么分三个。

【**技术栈在换代，但底层能力没变——把东西做出来、做稳定、做到生产可用，这种能力什么时候都稀缺。**】

AI 正在重新划分工程师的能力版图，这个过程才刚开始。

加油吧，兄弟姐妹们。

下期见。
