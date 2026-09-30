---
title: 多 Agent 之间怎么传递上下文？
description: 去程传简报或者过滤过的历史，回程只传结论和文件路径。
---

面试官问你：“多 Agent 之间怎么传递上下文？”如果你回答“把主 Agent 的对话历史全部传给子 Agent，信息越全越好”，恭喜你，出门右拐回家等通知吧。

为什么？

因为完整对话里，大部分是和子任务无关的工具输出和失败尝试。全部灌给下游，上下文越传越长，上游犯过的错误判断，也会被下游当成事实继承下来。成本同样扛不住，Anthropic 在 2025 年 6 月公开过他们的多 Agent 研究系统，多 Agent 消耗的 Token 大约是普通聊天的 15 倍。

【截图：全量传递上下文的三个问题；风格：checklist-card；截图目标：三张卡片分别是“无关的工具输出和失败尝试灌给下游”“上游的错误判断被当成事实继承”“Token 消耗约为普通聊天的 15 倍（Anthropic，2025 年 6 月）”；关键词：多 Agent、上下文传递、Token 成本】

我翻了 Claude Code 2.1.88 版本的源码、Codex 最新的源码，还有 Anthropic 多 Agent 研究系统的博客，可以自信地、大方地、光明磊落地帮你把这道题讲清楚。

哈喽大家好，我是二哥呀。今天用 3 分钟，带你搞清楚多 Agent 之间的上下文到底怎么传。

**先说去程，主 Agent 给子 Agent 传什么。**

默认只传一份任务简报。

Claude Code 派发 Sub-agent 用的是 Agent 工具，它的提示词里有一句很形象的话，“Brief the agent like a smart colleague who just walked into the room”。给子 Agent 布置任务，要像给一个刚走进会议室的聪明同事交代工作，他没听过前面的讨论，也不知道你试过什么。

所以简报里要写清楚几件事，要做什么、为什么做、已经排除了哪些方向、希望拿回什么格式的结果。提示词里还有一句加粗的“Never delegate understanding”，不要把理解问题这件事甩给子 Agent。像“根据你的调研结果修复这个 bug”这种话就不要写，该怎么修，应该由主 Agent 先想清楚。

Codex 也是一样。它的 spawn_agent 工具有一个参数叫 fork_context，默认是 false，子 Agent 启动时只拿到一条初始任务。

简报写不清楚会怎样？Anthropic 踩过坑。任务只写了“研究一下半导体短缺”，结果一个子 Agent 去查 2021 年的汽车芯片危机，另外两个重复查了 2025 年的供应链。

【截图：一份合格的任务简报；风格：skill-card；截图目标：四张卡片分别是“目标和原因”“已经排除的方向”“工具和信息来源”“期望的输出格式”，底部标注 Claude Code 提示词原话 Brief the agent like a smart colleague who just walked into the room；关键词：任务简报、Sub-agent、Never delegate understanding】

子 Agent 是刚进门的同事，没看过你们的聊天记录。

**那聪明的你肯定想到了：只传简报，信息会不会不够？**

会，所以还有第二条路，fork。

在 Claude Code 里，调用 Agent 工具时不指定 subagent_type，就会 fork 出一个子 Agent，它继承主 Agent 的完整对话。关键在于，fork 出来的子 Agent，工具数组和系统提示词都和主 Agent 逐字节相同，所以能直接复用主 Agent 的 Prompt Cache。源码里写得很直白，“Forks are cheap because they share your prompt cache”，还特意提醒不要给 fork 换模型，换了模型就用不上这份缓存。

什么时候该 fork？源码给的判断标准是，这些中间输出以后还用不用得上。用不上，就 fork 出去做，别让它们占着主 Agent 的上下文。

Codex 的新版多 Agent 走得更远，fork_turns 参数默认就是 all，把完整历史都 fork 过去。但它不是原样复制。源码里有一个 keep_forked_rollout_item 函数，只保留系统消息、用户消息和主 Agent 的最终回答，推理过程、工具调用和工具结果全部丢掉。

【截图：两种派发方式对比；风格：whiteboard；截图目标：左边是 fresh，子 Agent 只拿到一份任务简报；右边是 fork，子 Agent 继承对话并共享 Prompt Cache，下方标注 Codex 的过滤规则“保留用户消息和最终回答，丢掉推理和工具调用”；关键词：fresh、fork、keep_forked_rollout_item】

fork 传的是结论和约定，不传草稿纸。

**那聪明的你肯定又要问了：子 Agent 干完活，传回什么？**

只传最后一条消息。

Claude Code 的源码里，子 Agent 跑完之后，只把最后一条回复的文本返回给主 Agent，中间调用了哪些工具、拿到了什么结果，一概不回传。返回内容超过 10 万个字符，就存成文件，主 Agent 只拿到一段预览和文件路径。Codex 也一样，子 Agent 完成时只回传最后一条消息，新版还会把它包装成一条 FINAL_ANSWER 类型的消息，投递到主 Agent 的邮箱里。

大块数据不走消息。Anthropic 的做法是让子 Agent 把产出写进外部存储，只把一个轻量的引用传回给主 Agent，避免一层层转述时信息走样，就像传话游戏一样。

多个 Agent 共用文件，就要约定好边界。Codex 的所有 Agent 共享同一个目录，所以 worker 角色的提示词里专门写了，你不是一个人在改代码，不要回滚别人的修改。

【截图：回程只交最后一条消息；风格：swimlane；截图目标：子 Agent 泳道里有多次工具调用和中间结果，只有最后一条消息箭头回到主 Agent，大块产出写进文件系统，只把文件路径传回；关键词：最后一条消息、文件路径、FINAL_ANSWER】

回程只交作业，不交草稿。

面试官如果追问：“只传摘要，下游会不会误解上游没说出口的决定？”

告诉他，会。Cognition 在 2025 年 6 月的《Don't Build Multi-Agents》里举过一个例子，让两个子 Agent 分别做 Flappy Bird 的背景和小鸟，结果一个做出了超级马里奥风格的背景，另一个画的鸟既不像游戏素材，动起来也完全不像 Flappy Bird。每个动作背后都藏着决定。所以前后有依赖的步骤，要么留在同一个 Agent 里做，要么用 fork 让子 Agent 继承已经做过的决定。

【截图：Flappy Bird 的反例；风格：whiteboard；截图目标：左边子 Agent 做出超级马里奥风格的背景，右边子 Agent 画出不像游戏素材的鸟，中间拼在一起风格冲突；关键词：Cognition、隐含决策、Flappy Bird】

最后简单总结下。

去程传简报或者过滤过的历史，回程只传结论和文件路径。

另外给你一条实用建议。给子 Agent 写任务之前，先检查一遍，一个刚进门的同事，看完这段话能不能直接开工。

这道题你学会了吗？想解锁更多 Agent 硬核知识，点赞关注，我是二哥，咱们下期见！
