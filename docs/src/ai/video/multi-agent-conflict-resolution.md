面试官问你：“如果让你来设计一套 Harness，Multi-Agent 意见冲突了怎么办？”

如果你下意识回答“少数服从多数，举手投票”，或者“搞一个裁判 Agent 来仲裁”，恭喜你，面试官一听就知道你没碰过真正的生产级 Agent。

先说为什么。同一个模型，同源思维极容易导致集体盲从，三个 Agent 投出来的多数并不比单个 Agent 更可靠；而让大模型给大模型当裁判，更会陷入主观扯皮不能自拔。

真实的冲突主要发生在三个层面：主 Agent 与 Sub-agent 的主从分歧、执行 Worker 与审查 Reviewer 的质检对抗，以及多个并发 Worker 之间的写冲突。

![](https://cdn.paicoding.com/stutymore/multi-agent-conflict-resolution-01-overview-20260915133950-b6ec09bf.png)

哈喽大家好，我是二哥呀。今天用 3 分钟，以架构师的视角，把这三个层面的冲突给你讲清楚。

**先说主 Agent 和 Sub-agent 意见冲突怎么办。**

主 Agent 负责全局规划，Sub-agent 负责局部调研。如果主 Agent 想重构鉴权模块，派 Sub-agent 去摸排代码，Sub-agent 回来汇报说代码已经屎山了、建议别碰，两人意见相反，到底听谁的？

合理的做法是：主 Agent 拥有编排权——派谁干、采不采纳、要不要改方案，由它定，但必须把 Sub-agent 的反对意见当成事实输入重新评估，而不是直接无视；一旦超出编排的权限，交给用户来决定。

以 DeepSeek Harness 为例，子 Agent 默认继承父 Agent 的工作目录和沙箱模式，它是有写文件权限的，只不过审批策略被固定为 never。Claude Code 的做法类似，子 Agent 拿到的是独立的上下文窗口，但工作区是和主 Agent 共享的。

![](https://cdn.paicoding.com/stutymore/multi-agent-conflict-resolution-02-boundaries-20260915134138-5ec52dd0.png)

**那聪明的你肯定会继续追问，如果多个 Sub-agent 打架，比如 Worker 和 Reviewer 谁也不服谁怎么办？**

这就是经典的生成与质检对抗。Worker 想尽快交付，Reviewer 拼命挑刺。Worker 改完一版，Reviewer 又查出新的问题，甚至虚构出一个不存在的 bug，两个人不断打回、不断重试，陷入死循环。

Claude Code 的做法是这样的，Reviewer 说有 bug，必须复现 bug 并给出报错日志当物证；否则 Reviewer 提的意见一律驳回。Worker 也一样，改完代码必须跑通全套单测和类型检查，全绿才放行。

而在 DeepSeek Harness 里，质检任务是有前置依赖锁的，Worker 没提交代码前，Reviewer 连任务都领不了。审查时，必须针对具体的代码变动（Diff）就事论事；否则就由主 Agent 主动介入，把分歧告知用户。

![](https://cdn.paicoding.com/stutymore/multi-agent-conflict-resolution-03-review-20260915134308-db6864c6.png)

**那聪明的你肯定要问了：如果是两个并发的 Worker，方案产生了冲突该怎么办？**

顶尖的 Harness 架构师，绝不允许两个 Worker 同时去执行写操作，同一批文件尽量只给一个 Worker。

就比如说 Claude Code，原则上只读的调研任务可以随意并行，但只要涉及写文件，同一批文件永远是严格的串行，在调度层杜绝并发冲突。

DeepSeek Harness 在团队协作上更严格。任务底层采用了 CAS 乐观锁，Worker 提交变更时必须携带版本号，版本过时直接抛出异常拒绝；两个 Worker 抢同一个任务直接抛认领冲突。同时配合路径重叠检测算法，只要两个任务触及重叠目录就会立刻发出冲突警告。

![](https://cdn.paicoding.com/stutymore/multi-agent-conflict-resolution-04-concurrency-20260915134456-2f3486ce.png)

最后简单总结下。面试官问你 Harness 如何解决 Multi-Agent 冲突，这样回答他：主从分歧靠主 Agent 全局裁决；质检对抗靠单测物证与 DAG 依赖；并发分歧靠串行或者 CAS 乐观锁。

这个知识点你学会了吗？想解锁更多 Agent 硬核知识，点赞关注，我是二哥，咱们下期见！

![](https://cdn.paicoding.com/stutymore/multi-agent-conflict-resolution-cover-16x9-20260915134626-6a9f6b47.png)

![](https://cdn.paicoding.com/stutymore/multi-agent-conflict-resolution-cover-4x3-20260915134626-65456128.png)

![](https://cdn.paicoding.com/stutymore/multi-agent-conflict-resolution-cover-3x4-20260915134627-e64a55f0.png)
