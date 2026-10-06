---
title: 用户中途取消，Agent 任务怎么停下来？
---

面试官问你：“用户中途取消，Agent 任务怎么停下来？”如果你回答“加个停止按钮，点了就把请求断开”，恭喜你，出门右拐回家等通知吧。

![](https://cdn.paicoding.com/stutymore/agent-task-cancellation-20261005094256.png)

为什么？

因为断开请求，只停掉了你能看到的那部分输出。Agent 已经启动的 Bash 命令可能还在执行，执行到一半的工具可能已经修改了文件，下一轮请求还会因为缺少 tool_result 被 API 直接拒绝。而且按照 Anthropic 的计费规则，客户端中途断开的请求，照样收费。

![](https://cdn.paicoding.com/stutymore/agent-task-cancellation-three-areas-20261004224358-0e055c56.png)

恭喜看到这里的你，已经成功击败 30% 的学习者，给自己鼓个掌吧。**接下来我问你，取消信号怎么传递下去？**

A，设一个全局变量 isCancelled；B，用一个取消信号层层往下传递；C，直接杀掉 Agent 进程。喜欢收藏的你可以把答案打在弹幕或者留言区。

我的答案是全局变量没法主动打断一个正在等待的网络请求，多个 Sub-agent 同时运行的时候，也分不清该停哪一个。直接杀掉 Agent 进程，用户的会话也会跟着没了。

Claude Code 用的是 AbortController，用户按下 Esc，同一个取消信号会传给模型的流式请求，也会传给每一个工具。每个工具拿到的是一个子信号，父信号取消了，子信号跟着取消；子信号取消了，不影响父信号。Codex 是用 Rust 写的，换成了 CancellationToken，思路一样，也是一层层派生出子 token。

光传递下去还不够，Agent Loop，也就是“调用模型、执行工具、再调用模型”的那个 ReAct，还得主动检查。Claude Code 在流式输出的过程中、每个工具执行之前、重试等待的间隙，都会检查信号有没有被取消，取消了就不再发起新的一步。

Java 也是这个道理。Future.cancel(true) 只是给执行任务的线程打一个中断标记，任务自己不检查这个标记，线程就停不下来。

![](https://cdn.paicoding.com/stutymore/agent-task-cancellation-signals-20261004225600-25d1e0c8.png)

恭喜看到这里的你，已经成功击败 50% 的学习者了。**接下来继续问你，正在执行的工具怎么停止？**

A，等它执行完；B，杀掉 shell 进程；C，杀掉整个进程组。喜欢点赞的你会选哪一个？

我的答案是 C。

只杀掉 shell 进程是不够的。比如 Agent 执行了 npm run dev，这条命令会启动 Node 子进程，只杀掉父进程，子进程还活着，端口照样被占用。进程组就是父进程和它派生出来的子进程组成的一组进程，要停就整组一起停。

停的信号有两种。SIGTERM 是请求程序退出，程序可以捕获它，先做清理再退出；SIGKILL 是强制结束，程序没法拦截。Codex 对一次性执行的命令比较温和，先给整个进程组发 SIGTERM，等 50 毫秒，再发 SIGKILL。Claude Code 更直接，用 SIGKILL 一次杀掉整棵进程树。

Sub-agent 也要跟着停。在 Claude Code 里，前台运行的 Sub-agent 和主任务共用同一个取消信号，按一下 Esc 一起停；后台运行的 Sub-agent 用的是独立的信号，按 Esc 不会停，需要单独结束。

![](https://cdn.paicoding.com/stutymore/agent-task-cancellation-process-group-20261004225932-e4256229.png)

恭喜看到这里的你，成功击败 70% 的学习者了。

**继续问你，停下来之后，会话历史怎么处理？**

A，什么都不做；B，删掉被打断的那一轮回答；C，给每个没有结果的工具调用补一个结果。喜欢点赞和分享的你会选哪一个呢？

我的答案是 B 和 C 组合起来用，A 一定会出问题。

大模型的 API 要求每一个 tool_use 后面都必须紧跟一个 tool_result，什么都不做，下一轮请求就会直接报错。

Claude Code 会给被打断的工具补一条结果，告诉模型用户拒绝了这次操作，如果是修改文件，新内容不会写进去，同时停下来等待用户新的指令。

Codex 下一轮还会额外提醒模型“aborted by user”，告诉模型用户是主动打断的，后台进程可能还在运行，被中断的命令可能已经执行了一半。模型知道命令可能执行了一半，就会先检查一遍，而不是假装什么都没发生。

Pi 的做法是把被打断的半截回答整条跳过，不再发给模型，让模型从最后一个完整的状态重新开始；没有结果的工具调用，统一补一条“No result provided”。

![](https://cdn.paicoding.com/stutymore/agent-task-cancellation-history-20261004230845-52135dc5.png)

恭喜看到这里的你，成功击败 90% 的学习者了。

面试官如果追问：“如果用户不是想取消，只是想补充一句要求呢？”

告诉他，用 Steering，也就是在 Agent 执行的过程中主动插话，帮助模型调整方向。具体的做法是先把新消息放进队列，等当前这批工具执行完、下一次调用模型之前再注入。之所以不立刻马上插进去，是因为 tool_use 和 tool_result 之间不能夹着别的消息。

Pi Agent 有两条队列，steer 在当前这一轮工具执行完之后注入，followUp 等 Agent 正常停下的时候才执行，适合“做完这个再做那个”。

Claude Code 在执行的过程中，如果你补充了新的输入，消息会排队，等这批工具调用结束后，在同一轮里提交给模型。按 Ctrl+Enter 则是立即发送，正在执行的 shell 命令会转到后台继续执行，模型还能看到已经产生的输出。

![](https://cdn.paicoding.com/stutymore/agent-task-cancellation-steering-20261004231001-42d29026.png)

恭喜你升到王者段位了，成功击败 99% 的学习者。

最后简单总结下。

取消靠信号层层往下传递，工具要杀掉整个进程组，会话历史要补齐结果；只是补充要求的话，就排队注入。

这个知识点你学会了吗？想解锁更多 Agent 硬核知识，点赞关注，我是二哥，咱们下期见！

<!-- video-covers:start -->

## 视频封面

![竖版封面](https://cdn.paicoding.com/stutymore/agent-task-cancellation-cover-portrait-20261005105523-b71bd562.png)

![宽屏横版封面](https://cdn.paicoding.com/stutymore/agent-task-cancellation-cover-wide-20261005105527-8bf8f1c1.png)

![标准横版封面](https://cdn.paicoding.com/stutymore/agent-task-cancellation-cover-standard-20261005105528-2352f8b4.png)

<!-- video-covers:end -->
