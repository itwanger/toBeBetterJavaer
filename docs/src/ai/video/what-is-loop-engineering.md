面试官问你：“什么是 Loop Engineering？”如果你回答“不就是 ReAct 循环换了个说法吗？”面试官就只能两手一摊，无语了。

为什么？

因为 ReAct 是 Agent 的内部循环机制。Loop Engineering 管的是定时任务，对，没错，定时任务，让 Agent 能在无人值守的情况下持续工作。就像 Linux 中的 crontab 一样，Loop Engineering 就是 Agent 的调度器。

哈喽大家好，我是二哥呀。今天用 3 分钟，带你搞懂 Loop Engineering。

## 面试官想考察什么

面试官问这道题，考察三个层面：第一，它和 Prompt Engineering、Context Engineering、Harness Engineering 有什么关系；第二，ReAct 和 Loop 有什么区别；第三，/goal 和 /loop 有什么区别。

## 满分回答

好，接下来给你满分回答，照着背就完事了。

Prompt Engineering管“怎么说”，Context Engineering管“知道什么”，Harness Engineering 管“能做什么不能做什么”，Loop Engineering 管“定时调度”。

2026 年 6 月，Claude Code 的负责人 Boris Cherny 说了这样一句话——“我不再亲自给 Claude 写提示词了。我用了很多 /loop 命令，它们负责给 Claude 下指令。我的工作是写 loop。”同一周，Google Chrome 的工程总监 Addy Osmani 发文正式命名了 Loop Engineering。

内循环是 ReAct——推理、行动、观察、重复。这是单次 Agent 运行里的循环，Harness 已经帮我们搞定了。

外循环是 Loop Engineering——设计一个调度系统，让 Agent 按预设的节奏持续工作。全程不需要我们坐在那里逐句输入提示词。

## /goal 和 /loop 的区别

Claude Code 里有两种实现：/goal 和 /loop。

/goal 是有终点的冲刺。设定一个完成条件，比如“让所有测试通过”，Agent 持续工作直到条件达成。关键机制：用一个独立的评估器在每轮结束时检查目标是否满足，满足就停下来。适合一次性任务，修复一个 bug、完成一个 PR、跑完一轮测试。

但说实话，这个命令不该有，这不就是Agent自己应该干的事吗，为什么要多出来一个命令？

/loop 是没有终点的巡检。设定一个时间间隔，比如每 10 分钟执行一次，Agent 按这个节奏重复工作。适合持续性任务——定时检查新 PR 并审查、定时扫描日志找异常、周期性跑测试。它不会自动停，除非你主动取消。

钱包就要小心了，因为这个指令真的很烧 Token。

一句话区分：/goal 知道什么时候该停，/loop 一直跑。

## 面试官追问：Loop 和 Harness 怎么区分

面试官如果继续追问：“Loop Engineering 和 Harness Engineering 到底怎么区分？”

拿 Claude Code 来说。Harness 确保你输入一条指令后，Agent 能安全地读文件、改代码、跑测试。Loop 确保你睡觉以后，Agent 还能按预设的节奏持续工作——每完成一个任务自动捡起下一个，卡住了自动重启，跑完了自动停。

两者配合，Agent 才能真正实现无人值守的连续工作。

## 一句话总结

最后一句口诀——提示词管嘴巴，上下文管大脑，Harness 管手脚，Loop 管心跳——四件齐活，Agent 自己跑。

这道题你学废了吗？想解锁更多 Agent 面试题的源码级拆解，点赞关注，我是二哥，下期见！

![](https://cdn.paicoding.com/stutymore/what-is-loop-engineering-20260710095516.png)