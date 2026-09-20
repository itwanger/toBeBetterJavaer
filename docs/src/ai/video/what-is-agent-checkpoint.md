面试官问你：“了解 Agent 的 Checkpoint 机制吗？”如果你回答“就是把聊天记录存下来呗”，恭喜你，出门右拐回家等通知吧。

为什么？

因为 Checkpoint 要存的不只是对话历史。Agent 执行的每一步，都会在真实环境里留下痕迹，改了什么文件、装了什么依赖、跑了什么命令，这些都要记录下来。如果只存对话，回滚之后 Agent 会认为“没改过”。

![](https://cdn.paicoding.com/stutymore/what-is-agent-checkpoint-state-20260920154057-33d4965e.png)

我翻了 Claude Code 的文件快照系统、Codex 的 Rust 源码、还有 Devin 开源的 blockdiff 项目，可以自信地、大方地、光明磊落地帮你搞清楚这三件事。

- Checkpoint 到底是什么？为什么只存对话历史远远不够？
- Claude Code、Codex、Devin 的实现有哪些值得借鉴的地方？
- 有些操作根本回滚不了，Agent 怎么办？

哈喽大家好，我是二哥呀。今天用 3 分钟，给你讲透 Agent 的 Checkpoint 机制。

**先说第一件事，Checkpoint 到底是什么。**

Checkpoint，中文叫检查点，是计算机系统中一种将运行时的内存状态捕获并持久化保存的机制，是系统运行过程中的“自动存档点”。

当系统发生崩溃、需要暂停或者需要回滚时，程序可以直接从最近一次的 Checkpoint 恢复状态继续运行，而不需要从零重新开始。

我认为一个合格的 Checkpoint 至少要覆盖五个状态。第一个，任务规划，Agent 当前在执行哪个任务，哪些步骤已完成，哪些还在排队，要记录下来。第二个，对话历史，完整的消息序列，包括每次工具调用的输入和输出。第三个，文件系统，Agent 改了哪些文件，改了什么内容。第四个，进程状态，正在运行的服务器、数据库连接、后台任务等。第五个，环境配置，模型的版本、系统提示词、环境变量等。

告诉面试官，存有序的工具调用日志，比存最终的状态快照更有价值。因为恢复的时候，Agent 不仅需要知道“现在是什么样子”，还需要知道“怎么一步步走到这里的”。存快照相当于存照片，存日志相当于存录像。录像能让 Agent 理解前后的因果关系，接着往下走。

对话历史只是 Checkpoint 的一部分，文件系统和进程状态也非常重要。

**那聪明的你肯定想到了，既然要存这么多东西，各家 Agent 具体怎么实现的？**

![](https://cdn.paicoding.com/stutymore/what-is-agent-checkpoint-routes-20260920154350-844fde77.png)

先说 Claude Code。它的策略是“每轮自动存档”。每次你发送一条消息，Claude Code 在执行之前，先把当前所有相关文件的内容做一次快照，存到本地的 file-history 目录下。检测变更用三层验证，先看文件的时间戳和大小有没有改变，有变化才读取文件内容做字节级别的比较，确认改了才创建新的版本。需要回滚的时候，输入 `/rewind` 命令，可以选择只恢复代码、只恢复对话，或者两个一起恢复。做并行任务的时候，还能用 git worktree 开一个隔离的工作目录，出问题了整个 worktree 扔掉就行，主分支毫发无损。

![](https://cdn.paicoding.com/stutymore/what-is-agent-checkpoint-20260920151238.png)

再说 Codex。Codex 的恢复机制分为会话和文件两个。会话层把对话、工具调用及结果持久化，重新打开任务时根据这些重建上下文；文件通过修改差异和 Git 操作撤销代码变更，桌面端支持按文件或代码片段回退。早期版本曾用 Git 创建 Ghost Snapshot，保存工作区快照并提供 `/undo` 恢复，但这套实现已经移除。

最后说 Devin，Devin 是直接在虚拟机做快照。每个 Devin 会话跑在一个叫 otterlink 的微型虚拟机里，不是 Docker 容器，是真正的 VM。快照用的是他们自研且开源的 blockdiff 格式，原理是利用 XFS 文件系统的 Copy-on-Write 特性，只存被修改的数据块，不扫描整个磁盘。给 20GB 的磁盘拍一次快照，只需要 200 毫秒，非常快。要知道，传统的 EC2 磁盘快照要 30 分钟以上。

![](https://cdn.paicoding.com/stutymore/what-is-agent-checkpoint-blockdiff-20260920154601-7a931d92.png)

**那聪明的你肯定又要问了，Checkpoint 什么情况下回滚不了？**

告诉面试官，文件系统操作是完全可逆的。改了什么代码、删了什么文件，只要有快照就能恢复。但外部系统的操作是不可逆的。发出去的邮件一般无法撤回，还有支付，调用第三方 API 等。

![](https://cdn.paicoding.com/stutymore/what-is-agent-checkpoint-reversibility-20260920154759-35882d09.png)

2026 年发表的 Crab 论文做了一个有意思的统计，在真实的 Agent 任务中，87% 的对话轮次根本不需要 Checkpoint，只有 5% 的需要文件系统快照，8% 的需要完整的环境级 Checkpoint。

如果你想给自己的 Agent 追加 Checkpoint 功能，告诉你一个最简单的做法。文件用影子目录，每次执行工具之前，把相关文件复制一份到类似 `.agent/checkpoints/step-001/` 的目录下，回滚就从影子目录覆盖回来，和 Git 历史完全隔离，不会污染你的提交记录。状态用 Redis 或者 SQLite，把每次工具调用的名称、输入、输出按顺序存下来。影子目录还原文件，日志重建上下文。

如果你还想深入学习，推荐三个开源项目。

LangGraph，LangChain 团队的 Agent 框架，内置了 Checkpoint 机制，支持 SQLite、PostgreSQL、Redis 三种存储。创建 Agent 时传一个 checkpointer 参数就行，上手最快。

CognitionAI/blockdiff 是 Devin 开源的快照格式，想搞懂 Copy-on-Write 快照的底层原理，看这个项目就够了。

CRIU 是 Linux 基金会的项目，做的是进程级 Checkpoint，能把运行中的进程连同内存、网络连接一起冻结保存。Docker 容器迁移的底层用的就是它。

这个知识点你学会了吗？想解锁更多 Agent 硬核知识，点赞关注，我是二哥，咱们下期见！

![Agent Checkpoint 16:9 封面](https://cdn.paicoding.com/stutymore/what-is-agent-checkpoint-cover-horizontal-16x9-20260920155115-c286f59b.png)

![Agent Checkpoint 4:3 封面](https://cdn.paicoding.com/stutymore/what-is-agent-checkpoint-cover-horizontal-4x3-20260920155122-059bc5fa.png)

![Agent Checkpoint 3:4 封面](https://cdn.paicoding.com/stutymore/what-is-agent-checkpoint-cover-vertical-3x4-20260920155136-fbe67c6f.png)
