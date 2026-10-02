---
title: 多 Agent 之间怎么传递上下文？
---

面试官问你：“多 Agent 之间怎么传递上下文？”如果你回答“把主 Agent 的对话历史全部传给子 Agent，信息越全越好”，恭喜你，出门右拐回家等通知吧。

为什么？

先说清楚两个角色。负责拆分任务、把任务派发出去的，叫主 Agent；接到任务、负责完成其中一部分的，叫子 Agent。

主 Agent 的完整对话里，大部分内容是和子任务无关的工具返回结果，以及失败后的尝试。把这些全部传给子 Agent，主 Agent 之前做错的判断，也会被子 Agent 当成事实接着用。

![](https://cdn.paicoding.com/stutymore/multi-agent-context-passing-20260930114831-2c487ca9.png)

我翻了 Claude Code 2.1.88 版本的源码、Codex 开源仓库最新的源码，可以自信地、大方地、光明磊落地帮你把这三件事讲清楚。

**先说第一件，主 Agent 派发任务时，应该给子 Agent 传什么。**

默认只传一份任务简报。

![](https://cdn.paicoding.com/stutymore/multi-agent-context-passing-20260930113403.png)

拿 Claude Code 来说，它内置了一个工具，名字就叫 Agent。主 Agent 想派发子 Agent 时，就调用这个工具，把任务写在工具的 prompt 参数里。Anthropic 是这样描述这个工具的，“Brief the agent like a smart colleague who just walked into the room”。意思是，给子 Agent 布置任务时，要像给一个刚走进会议室的同事交代工作，他没听过前面的讨论，也不知道你已经尝试过什么。

所以任务简报里要写清楚四件事，要做什么、为什么做、已经排除了哪些方向、希望拿回什么格式的结果。使用说明里还有一句加粗的“Never delegate understanding”，意思是，弄清楚问题该怎么解决，是主 Agent 自己的事，不能踢皮球给子 Agent。像“根据你的调研结果修复这个 bug”这种任务就不要写，该怎么修，应该由主 Agent 先想清楚，再写进任务里。

Codex 默认也只传一份任务。Codex 派发子 Agent 用的工具叫 spawn_agent，它有一个参数叫 fork_context，表示要不要把主 Agent 的对话历史复制给子 Agent，默认值是 false，也就是不复制，子 Agent 启动时只拿到主 Agent 写的那一条任务。

![](https://cdn.paicoding.com/stutymore/multi-agent-context-passing-20260930115019-be597714.png)

**那聪明的你肯定想到了：只传任务简报，信息会不会不够？**

会，所以还有第二种方式，fork。fork 的意思是，把主 Agent 当前的对话复制一份，交给子 Agent 接着往下做。

在 Claude Code 里，调用 Agent 工具时不指定 subagent_type 参数，也就是不指定用哪一种子 Agent，就会 fork 出一个子 Agent，它会继承主 Agent 的完整对话。这个子 Agent 可以使用的工具列表和系统提示词，都和主 Agent 相同，所以发给模型的请求，开头部分和主 Agent 完全一样，服务端已经缓存过的内容可以直接复用，也就是我们之前一直提到的 Prompt Cache。提醒一句，不要给 fork 出来的子 Agent 换其他模型，换了模型，这份缓存就用不上了。

>“Forks are cheap because they share your prompt cache”

那好学的你可能会问，什么时候 fork？

判断标准是，做这件事的过程中产生的工具返回结果，主 Agent 之后还用不用得上。用不上，就 fork 出去交给子 Agent 做，这些结果只留在子 Agent 的上下文里，不占用主 Agent 的上下文。

Codex 新版的多 Agent 功能，代码里叫 multi_agent_v2，目前默认没有开启。它用 fork_turns 参数控制复制多少轮对话，默认值是 all，也就是全部复制。但它不是原样复制。源码里有一个 keep_forked_rollout_item 函数，只保留系统消息、用户消息和主 Agent 的最终回答，主 Agent 的推理过程、工具调用和工具返回结果全部丢掉。

![](https://cdn.paicoding.com/stutymore/multi-agent-context-passing-20260930115205-4e89c01e.png)

**那聪明的你肯定又要问了：子 Agent 完成任务后，传回什么？**

只传回子 Agent 的最后一条回复。

Claude Code 的源码里，子 Agent 执行完后，只把最后一条回复的文本返回给主 Agent，中间调用了哪些工具、拿到了什么结果，一概不回传。返回的内容超过 10 万个字符，就先存成文件，主 Agent 只拿开头一小段的内容和文件路径。Codex 也一样，子 Agent 完成时只回传最后一条回复，新版还会把它标记为 FINAL_ANSWER，作为一条新消息发给主 Agent。

如果是一份很长的调研报告，就不放进这条回复里。Anthropic 的做法是让子 Agent 把产出写进文件系统这类外部存储，只把文件路径这样的引用传回给主 Agent，避免内容经过一层层转述之后变样。

多个子 Agent 同时修改同一个项目，要事先分好谁改哪些文件。Codex 的所有 Agent 都在同一个目录下工作，所以负责写代码的 worker 角色，提示词里专门写了，你不是一个人在改代码，不要撤销别人的修改。

![](https://cdn.paicoding.com/stutymore/multi-agent-context-passing-20260930115347-d67a1b07.png)

面试官如果追问：“只传结论，后一个子 Agent 会不会不知道前一个子 Agent 自己做了哪些决定？”

告诉他，会。Cognition 在《Don't Build Multi-Agents》里举过一个例子，让两个子 Agent 分别做 Flappy Bird 游戏的背景和小鸟，结果一个子 Agent 做出了超级马里奥风格的背景，另一个子 Agent 画的鸟既不像游戏素材，动起来也完全不像《愤怒的小鸟》里的鸟。所以前后有依赖的步骤，要么留在同一个 Agent 里做，要么用 fork 让子 Agent 继承之前已经做过的决定。

![](https://cdn.paicoding.com/stutymore/multi-agent-context-passing-20260930115521-6e1266fe.png)

最后简单总结下。

派发任务时传任务简报，或者用 fork 复制过滤后的对话；返回结果时只传最终答案和文件路径。

这道题你学会了吗？想解锁更多 Agent 硬核知识，点赞关注，我是二哥，咱们下期见！

<!-- video-covers:start -->
## 视频封面

![Multi-Agent Context 16:9 封面](https://cdn.paicoding.com/stutymore/multi-agent-context-passing-cover-horizontal-16x9-20260930121632-a6022740.png)

![Multi-Agent Context 4:3 封面](https://cdn.paicoding.com/stutymore/multi-agent-context-passing-cover-horizontal-4x3-20260930121632-8c10cf0c.png)

![Multi-Agent Context 3:4 封面](https://cdn.paicoding.com/stutymore/multi-agent-context-passing-cover-vertical-3x4-20260930121632-5d0feec7.png)
<!-- video-covers:end -->
