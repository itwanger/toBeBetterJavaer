面试官问你：“如果让你来设计一套 Harness，Multi-Agent 意见冲突了怎么办？”

如果你下意识回答“少数服从多数，举手投票”，或者“搞一个裁判 Agent 来仲裁”，恭喜你，面试官一听就知道你没碰过真正的生产级 Agent。

先说为什么。同一个模型，同源思维极容易导致集体盲从，三个 Agent 投出来的多数并不比单个 Agent 更可靠；而让大模型给大模型当裁判，更会陷入主观扯皮不能自拔。

真实的冲突主要发生在三个层面：主 Agent 与 Sub-agent 的主从分歧、执行 Worker 与审查 Reviewer 的质检对抗，以及多个并发 Worker 之间的写冲突。

![](https://cdn.paicoding.com/stutymore/multi-agent-conflict-resolution-01-overview-20260915133950-b6ec09bf.png)

哈喽大家好，我是二哥呀。今天用 3 分钟，以架构师的视角，把这三个层面的冲突给你讲清楚。

**先说主 Agent 和 Sub-agent 意见冲突怎么办。**

主 Agent 负责全局规划，Sub-agent 负责局部调研。如果主 Agent 想重构鉴权模块，派 Sub-agent 去摸排代码，Sub-agent 回来汇报说代码已经屎山了、建议别碰，两人意见相反，到底听谁的？

合理的做法是，主 Agent 拥有最终裁决权，但必须把 Sub-agent 的反对意见当成事实输入重新评估，而不是直接无视。一旦超出编排的权限，交给用户来决定。

Claude Code 源码里有个函数叫 createSubagentContext，每个 Sub-agent 启动时会克隆一份独立的文件缓存和 AbortController，看不到主对话的历史消息。

调研型的 Explore Agent 在工具过滤层被剥夺了 Edit 和 Write 权限，只能读文件、跑命令，跑完把摘要交回主Agent，由主 Agent 拍板。

DeepSeek Harness 的任务是有角色分层的，只有 lead 角色能改派任务和创建新队友，普通队员只能操作自己认领的任务。内核 Cordis 把 Sub-agent 的注册动作做成了可逆的，启动失败或被卸载时，登记过的服务和事件整体撤销，不会污染主流程。

![](https://cdn.paicoding.com/stutymore/multi-agent-conflict-resolution-02-boundaries-20260915134138-5ec52dd0.png)

**那聪明的你肯定会继续追问，如果多个 Sub-agent 打架，比如 Worker 和 Reviewer 谁也不服谁怎么办？**

这就是经典的生成与质检对抗。Worker 想尽快交付，Reviewer 拼命挑刺。Worker 改完一版，Reviewer 又查出新的问题，甚至虚构出一个不存在的 bug，两个人不断打回、不断重试，陷入死循环。

Claude Code 源码里有个专门的验证 Agent，这个 Agent 不能改代码，只能读和跑命令。系统提示词里列了两种已知的偷懒模式，第一种是只读代码直接通过。第二种是 UI 能用、单测能过就放行。为了防偷懒，审查 Agent 必须做对抗性探测，比如并发请求、边界值、幂等，每个检查都要附上实际执行的命令和终端输出。最终报告必须给出明确判定，通过、不通过、或者环境受限只能部分验证。

而在 DeepSeek Harness 里，任务状态机只允许已完成的任务被打回到待认领，打回时自动清除负责人，防止同一个 Worker 反复认领自己的任务。同时，任务之间是有依赖关系的，前置任务没完成，后续任务根本领不了，从流程上就不会出现审查和编码同时跑的情况。

![](https://cdn.paicoding.com/stutymore/multi-agent-conflict-resolution-03-review-20260915134308-db6864c6.png)

**那聪明的你肯定要问了：如果是两个并发的 Worker，方案产生了冲突该怎么办？**

顶尖的 Harness 架构师，绝不允许两个 Worker 同时去执行写操作，同一批文件尽量只给一个 Worker。

就比如说 Claude Code，同一个 Agent 内部，只读工具可以并行跑，编辑、写入这类改状态的工具严格串行。第二，跨 Sub-agent 并行改代码用 git 的 worktree 隔离，每个 Sub-agent 在独立的仓库副本里改，冲突推迟到合并阶段。第三，Team 模式下协调者的系统提示词里明确写了，只读任务随意并行，写任务同一批文件一次只能给一个 Worker。

DeepSeek Harness 在团队协作上更严格。任务底层采用了 CAS 乐观锁，Worker 提交变更时必须携带版本号，版本过时直接抛出异常拒绝；两个 Worker 抢同一个任务直接抛认领冲突。同时配合路径重叠检测算法，只要两个任务触及重叠目录就会立刻发出冲突警告。

![](https://cdn.paicoding.com/stutymore/multi-agent-conflict-resolution-04-concurrency-20260915134456-2f3486ce.png)

最后简单总结下。面试官问你 Harness 如何解决 Multi-Agent 冲突，这样回答他：主从分歧靠主 Agent 全局裁决；质检对抗靠单测物证与 DAG 依赖；并发分歧靠串行或者 CAS 乐观锁。

这个知识点你学会了吗？想解锁更多 Agent 硬核知识，点赞关注，我是二哥，咱们下期见！

![](https://cdn.paicoding.com/stutymore/multi-agent-conflict-resolution-cover-16x9-20260915134626-6a9f6b47.png)

![](https://cdn.paicoding.com/stutymore/multi-agent-conflict-resolution-cover-4x3-20260915134626-65456128.png)

![](https://cdn.paicoding.com/stutymore/multi-agent-conflict-resolution-cover-3x4-20260915134627-e64a55f0.png)
