---
title: 阿里员工：在 Qwen 事业部一个月，周末来公司健身灯都是关的，基本没人加班。最爽的是正式员工每月 200 刀 AI 额度，能感受到踩中 AI 红利的轻松氛围了（附Agent面试题）
shortTitle: 阿里Qwen事业部Agent面试10问
description: 阿里 Qwen 事业部员工分享工作氛围与 AI 红利，附 10 道 Agent 面试题全解：ReAct 执行流程、Tool Message 设计、记忆系统、上下文压缩、多模态融合、Agent 训练、Redis 工程化。
keywords: Agent 面试题, ReAct, Tool Message, 上下文压缩, Redis Agent
tag:
  - 面试
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-08-26
---

如题，看到有同学在阿里 Qwen 事业部实习了一个月，分享了一些和华子文化、工作强度、氛围的差异。

我简单帮大家总结一下（省流）。

华子周末双倍工资但基本要加班，阿里周末来公司健身灯都是关的，基本没人加班。平常九点半大家就走了，七点新员工就溜得差不多了。最爽的是正式员工每月 200 刀 AI 额度，虽然实习生没有，但能感受到踩中 AI 红利的轻松氛围了。

![](https://cdn.paicoding.com/stutymore/sucai-20260826103042.png)

评论区还有一些同学提供的信息。

同学A：阿里的假期是最好的福利，p7员工，一年20天-25天假，入职10天年假起+7天陪伴假+3天路途假（这真的爽啊，我上周去三亚就整整 10 天，感觉挣钱的动力又足了，哈哈）。

同学B：阿里实习生有qoder，上周以前也是随便用的，有实习生用了30w的额度（约一万元，现在额度用太高需要财务审批了，我个人是用Qoder作为Claude的备胎）

借此机会，我再给大家梳理一下阿里的 AI 护城河业务哈。

![](https://cdn.paicoding.com/stutymore/sucai-20260826105649.png)

总结一句就是。千问模型决定阿里 AI 的能力上限，阿里云提供算力和商业化能力，百炼、Qoder、千问办公负责把模型包装成可以工作的 Agent，淘宝天猫、淘宝闪购、高德、菜鸟等业务，则提供真实的应用场景。

整体还是非常稳的，所以我个人是非常看好阿里的。

如果你是一位愿意相信努力、相信过程、相信一步一个脚印、相信自己能在 AI 时代分一杯羹的人，那接下来的硬核内容，希望你能认真读一读。

![](https://cdn.paicoding.com/stutymore/agent-mianshi-ali-qwen-20260826141119.png)

（全文比较肝，保证大家能学到很多很多，系好安全带，我们粗粗发～）

## content

### 01、自我介绍一下，重点说 Agent 相关的项目经验

我做过三个和 Agent 相关的项目。

![](https://cdn.paicoding.com/stutymore/agent-mianshi-ali-qwen-20260826120904-660d850e.png)

第一个是 PaiCLI，一个终端 AI Agent，对标 Claude Code。可以在终端里用自然语言和 Agent 交互，完成代码编写、调试、搜索、文件操作等任务。支持 ReAct、Plan-and-Execute、Multi-Agent Team 三种执行模式。

同时我还做了Go、TypeScript、Python版本。`https://github.com/itwanger/PaiCLI-Python`

![](https://cdn.paicoding.com/stutymore/agent-mianshi-ali-qwen-20260826141507.png)

第二个是 PaiAgent，一个 AI 工作流编排平台，在GitHub上快1000 star了。通过可视化界面拖拽节点来编排 Agent 工作流，底层有两个引擎可以切换——自研的 DAG 引擎做拓扑排序执行，LangGraph4j 做更复杂的条件分支和状态管理。

第三个是派聪明，一个基于 ES 混合检索的 RAG 知识库。检索用的是千问的 text-embedding-v4 做向量化，KNN 召回加 BM25 重排序，支持三级权限隔离。Agent 对话模块用 DeepSeek 跑 ReAct 循环，工具包括知识检索、主题摘要、用户反馈收集等。

### 02、介绍一个你比较熟悉的 Agent 项目

那我重点说说 PaiCLI。

市面上的AI编程工具确实很多也很好用，我自己日常开发也在用Claude Code和Codex。但我在使用这些工具的过程中产生了一个疑问——这些工具底层到底是怎么工作的？它是怎么理解我的指令的、怎么决定该读哪个文件的、怎么判断该调用什么工具的、多轮对话的上下文它是怎么管理的。

我发现如果我只会用这些工具但不理解它们的底层设计，遇到工具表现不好的时候（比如Agent选错了工具、上下文丢失了关键信息、生成的代码跟项目风格不一致）我只能试着换个说法重新问，而不能从原理层面判断问题出在哪里。

所以我决定自己从零实现一个Agent CLI，把ReAct推理循环、Tool Calling、Memory管理、MCP协议这些核心模块都自己写一遍。

![](https://cdn.paicoding.com/stutymore/agent-mianshi-ali-qwen-20260826120905-ac106fbc.png)

印象最深的有两个，一个是多模式，比如Auto 模式下的ReAct，以及Plan-and-Execute和Multi-Agent。

还有一个是上下文压缩，短期记忆用 Map-Reduce 做摘要，对话历史在接近窗口上限时整体压缩，保留最近 3 轮完整交互。

### 03、项目中采用了单 Agent、多 Agent 还是 Workflow？

默认走单 Agent，也就是 ReAct 模式。大部分用户的输入是短任务——“帮我联网搜一下沉默王二是谁”，走单 Agent 就能搞定。

![](https://cdn.paicoding.com/stutymore/agent-mianshi-ali-qwen-20260826120906-1e48b8c8.png)

复杂任务会切到 Plan-and-Execute。用户说“帮我重构这个模块的所有测试用例”，涉及多文件多步骤，规划器先生成一个带依赖关系的 JSON 计划，按拓扑排序分批执行，每批执行完后可以重新规划。

协作任务可以切到 Team 模式。规划器只负责拆解任务，Worker 并行干活，审查器检查质量——不合格打回重做。规划器和审查器都不碰工具，只做判断，工具执行权集中在 Worker 手里。

![](https://cdn.paicoding.com/stutymore/agent-mianshi-ali-qwen-20260826120906-e59440e7.png)

类似 Claude Code 的 Workflow 编排 Agent 暂时还没有实现。

### 04、ReAct Agent 的核心执行流程是什么？

Thought、Action、Observation。

Thought 是模型的思考过程——当前任务是什么、已经收集到哪些信息、下一步应该做什么。这个环节不产生可见的动作，但它决定了后续调用哪个工具、传什么参数。

Action 是模型做出的决策，两种结果：调用工具（tool_call），或者给出最终答案（final_answer）。

Observation 是工具返回的结果。搜索工具返回匹配的代码片段，文件读取工具返回文件内容，命令执行工具返回终端输出。这些结果注回上下文，模型基于新信息重新进入 Thought 环节。

![](https://cdn.paicoding.com/stutymore/agent-mianshi-ali-qwen-20260826120907-3e09b049.png)

#### Observation 为什么要注回上下文？

工具返回的信息是模型做下一步决策的依据。

![](https://cdn.paicoding.com/stutymore/agent-mianshi-ali-qwen-20260826120907-734d6f85.png)

比如 Agent 需要修改一个 bug，第一步调了搜索工具找到了报错所在的文件。如果搜索结果不注回上下文，模型根本不知道报错在哪个文件、第几行、什么内容。注回之后，模型的下一轮 Thought 能看到完整的搜索结果，做出有依据的决策。

### 05、Agent 调用工具后，Tool Message 怎么设计？

LLM 对话协议里有三种消息角色：user（用户输入）、assistant（模型输出）、tool（工具返回）。

![](https://cdn.paicoding.com/stutymore/agent-mianshi-ali-qwen-20260826120908-57ba1f85.png)

如果把工具结果塞进 user 消息，模型会以为是用户在输入，可能会把它当作新任务来处理。塞进 assistant 消息，模型会以为这是自己之前说过的话，后续推理可能在这个基础上产生幻觉。独立的 tool 角色让模型明确知道：这是外部工具返回的客观结果。

一次 LLM 响应可以同时调用多个工具（并行工具调用），每个调用都有一个唯一 ID。工具执行完后，通过 ID 把结果和对应的调用请求一一绑定。

```json
{
  "role": "tool",
  "tool_call_id": "call_abc123",
  "name": "search_code",
  "content": "找到 3 个匹配文件：UserService.java、AuthController.java、LoginTest.java"
}
```

工具执行失败时，错误信息也按同样的格式返回。模型看到错误后可以决定重试、换一个工具、或者直接告诉用户哪里出了问题。

### 06、短期记忆和长期记忆分别怎么实现？

短期记忆就是当前会话的对话历史和工具调用的过程。

PaiCLI 保留了最近 N 轮对话不做压缩，超出的部分用 LLM 做一次摘要。
![](https://cdn.paicoding.com/stutymore/agent-mianshi-ali-qwen-20260826120910-9ee77a47.png)

长期记忆是跨会话持久化保存的信息，需要配合检索机制。

PaiCLI 的长期记忆存在 JSON 文件里，每轮 LLM 调用前，记忆检索模块根据用户输入查询相关记忆，注入到 system prompt 中。项目级的记忆存在 PAI.md 文件里，按文件优先级叠加加载。

#### 哪些信息适合长期保存？

用户偏好（代码风格、语言习惯、审批策略）、历史反馈、项目上下文（技术栈、目录结构、团队约定）、高频使用的提示词模板——这些是跨会话都用得上的信息。

![](https://cdn.paicoding.com/stutymore/agent-mianshi-ali-qwen-20260826120911-65495f53.png)

不适合长期保存的：临时的调试中间结果、一次性的工具调用输出、已经完成的任务指令。判断标准就一个——这条信息在下一次会话中还用得上吗？用不上就别存。

### 07、对话内容超过上下文窗口限制时怎么处理？

两种主流方案。

滑动窗口是最简单的做法：截断最早的对话，只保留最近 N 轮。但缺点明显——早期对话里可能有关键上下文，比如用户在第一轮说了项目背景，截断后模型直接“失忆”。

![](https://cdn.paicoding.com/stutymore/agent-mianshi-ali-qwen-20260826120911-5e973a42.png)

摘要是用 LLM 把历史对话压缩成一段摘要，替换原始消息。保留了重点信息，上下文利用率高。但摘要也可能会丢掉一些看起来不重要但后续会用到的细节。

PaiCLI 用到了两种压缩方案。

第一种。短期记忆条目的 token 数超过预算时，用 Map-Reduce 策略做 LLM 摘要——先把记忆分批压缩，再合并成一段总摘要。保留最近 N 轮不压缩，确保当前上下文的连贯性。

![](https://cdn.paicoding.com/stutymore/agent-mianshi-ali-qwen-20260826120912-8657599a.png)

第二种。压缩对话历史。每轮 LLM 调用前检查当前 token 数是否超过阈值。超过了就启动压缩：找到所有 user 消息的位置，保留最近 3 轮完整交互（包含 tool_call 和 tool_result 的配对，不能切断），历史部分用 LLM 摘要替换。

摘要保留四类信息：关键诉求、已完成操作、达成共识、待办事项。分割点必须在 user 消息边界，不能切断工具调用和结果的配对。

### 08、多模态 Agent 中视觉编码器怎么和语言模型融合？

分三步。

第一步是视觉编码。图像先被切成固定大小的 patch（比如 14×14 像素），每个 patch 经过视觉编码器（通常是 ViT，也就是 Vision Transformer）提取特征，输出一组视觉特征向量。一张 224×224 的图片会被切成 256 个 patch，每个 patch 生成一个特征向量。

![](https://cdn.paicoding.com/stutymore/agent-mianshi-ali-qwen-20260826120912-9de2041e.png)

第二步是投影层做维度转换。视觉特征向量的维度和文本 token 的 Embedding 维度通常不一样，需要一个投影层把两者映射到同一个向量空间。简单的做法是一个线性投影矩阵，一次矩阵乘法就完成维度转换。效果更好的是用 MLP（两层全连接加激活函数），多一层非线性变换，投影后的视觉向量和文本 Embedding 匹配得更好。

第三步是拼接送入 LLM。投影后的视觉 token 和文本 token 拼成一个统一的序列，送入 LLM。模型通过自注意力机制同时关注图像信息和文字信息——某个文本 token 在计算注意力时可以“看到”所有的视觉 token，把图像内容融入到文字推理中。

对 Agent 来说，多模态能力意味着工具的输入输出不再局限于文字。截图工具返回的图片、摄像头采集的画面，模型都可以直接“看懂”，然后基于视觉信息决定下一步操作。

### 09、SFT、强化学习和 Agentic CFT 分别解决什么问题？

SFT（Supervised Fine-Tuning，监督微调）解决的是“会不会”的问题。给模型一批正确的 Agent 调用轨迹——输入什么 prompt，调了什么工具，传了什么参数，最终输出什么。模型通过模仿学习掌握基本的工具调用格式和流程。SFT 之后，模型至少能生成格式正确的 tool_call，知道什么时候该调工具、什么时候该直接回答。

![](https://cdn.paicoding.com/stutymore/agent-mianshi-ali-qwen-20260826120913-f229806f.png)

强化学习（RL）解决的是“好不好”的问题。SFT 教会了基本动作，但模型不一定知道哪种调用策略更优。RL 用奖励模型对不同的调用轨迹打分，引导模型学习更高效的决策路径。比如同一个任务，一条轨迹用了 3 步完成、另一条用了 8 步，奖励模型给前者打更高分。GRPO（Group Relative Policy Optimization，组相对策略优化）比 PPO 更适合 LLM 场景。直接在一组候选轨迹中用相对排名计算奖励，不需要额外训练一个 Critic 网络。

Agentic CFT（Completion Fine-Tuning）解决的是“真实环境里行不行”的问题。SFT 和 RL 都是在离线数据上训练的，模型的决策不会真的改变环境状态。Agentic CFT 让模型在真实的 Agent 环境里跑任务——调用真实的工具、拿到真实的返回结果、根据最终任务完成度给奖励。模型的每一步决策直接影响后续的环境状态，训练的是完整的多步决策过程。

#### 为什么要对 Observation Token 做 Mask？

Observation 是环境返回的内容，搜索结果、API 响应、文件内容，不是模型自己生成的。

训练时如果对 Observation Token 计算损失，模型会尝试“预测环境会返回什么”。这个任务既不合理（环境输出取决于外部系统，模型没法控制），也会干扰梯度信号——本来应该引导模型学习决策能力的梯度，被“预测环境输出”这个噪声稀释了。

![](https://cdn.paicoding.com/stutymore/agent-mianshi-ali-qwen-20260826120913-8993b4be.png)

Mask 之后，损失只在 Thought Token 和 Action Token 上计算。模型的学习目标变得纯粹——怎么思考当前情况、怎么决定下一步行动。Observation 只作为上下文输入提供信息，不参与梯度更新。

### 10、Redis 在 Agent 系统中可以承担哪些作用？

四个典型场景。

第一个是会话状态缓存。用户的对话历史是热数据，每轮请求都要读。放在数据库里每次查延迟高。派聪明的做法是 Redis 存热对话。

![](https://cdn.paicoding.com/stutymore/agent-mianshi-ali-qwen-20260826120914-82642273.png)

第二个是语义缓存。用户问过的问题，语义相近的再来一遍时不需要重新调 LLM。做法是把用户查询做 Embedding，在 Redis 里检索余弦相似度超过阈值的历史问答对。命中了直接返回缓存结果，省掉一次 LLM 调用。对高频重复问题（比如“怎么部署”“怎么登录”），效果很明显。

第三个是分布式锁。Agent 调用外部工具时，有些操作不能并发执行——比如同一个用户的文件写入操作，或者有副作用的 API 调用。Redis 的 SET NX 加过期时间可以做轻量级分布式锁，防止同一个用户并发触发同一个工具产生冲突。

第四个是速率限制。Agent 系统的 LLM 调用和 Embedding 调用都有配额上限。Redis 的 INCR 加 EXPIRE 做滑动窗口限流，比如每分钟 30 次聊天请求、每天 2000 次 Embedding 批量请求。派聪明的速率限制就是这么实现的。

过期策略要按场景分开设计：

- 会话状态：7 天过期，从最后一次交互开始计算，活跃会话持续续期，冷会话自动清理
- 语义缓存：热门问题长保留，命中次数越多过期时间越长；冷门问题短过期，比如 1 小时
- 分布式锁：秒级短过期，比如 30 秒，防止锁持有者异常退出导致死锁
- 速率限制：记得设一个过期时间和窗口周期一致，分钟级限流就 60 秒过期

## ending

AI时代，信息获取的速度快，信息的过期速度也快。

就像OpenClaw，现在几乎已经没有人提了。

所以，也没必要说过于压榨自己，实在学不动了就休息，你不学，就等于可以不用学。😄

但是如果你当前很需要，那就不要用这个潜台词来麻痹自己。

人活着，充实很重要。

而学习，就能让你充实。
