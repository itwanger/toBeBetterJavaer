---
title: Agent执行过程中，用户插话怎么处理？
blibli: Agent执行过程中，用户插话怎么处理（Agent面试题）？
xiaohongshu: 字节面试：Agent执行过程中，用户插话怎么处理
douyin: Agent执行过程中，用户插话怎么处理？
shipinhao: Agent执行过程中用户插话怎么办？
---

面试官问你：“Agent 执行过程中，用户插话怎么处理？”如果你回答“先把当前任务停掉，再把新消息发给模型”，恭喜你，出门右拐回家等通知吧。

![](https://cdn.paicoding.com/stutymore/agent-user-interjection-20261012104054.png)

为什么？

因为用户插话，大多数时候并不是想让 Agent 停下来。比如说，你让 Codex 重构一个模块，它已经改了一半的文件，你突然想起来，补了一句“顺便把单元测试也补上”。这时候把任务停掉，已经完成的进展就白费了。

正确的做法叫 Steering（引导），任务不停，只修正方向。

![](https://cdn.paicoding.com/stutymore/agent-user-interjection-01-20261012112450-e0bd9ba8.png)

恭喜看到这里的你，已经成功击败 30% 的学习者，给自己鼓个掌吧。**接下来我问你，插话的消息什么时候交给模型？**

A、立刻插进去；B、等当前这批工具调用全部执行完，下一次请求模型之前再注入；C、等整个任务结束。喜欢收藏的你可以把答案打在弹幕或者留言区。

我的答案是 B。

不选 A，是因为大模型的 API 要求每一个 tool_use 后面要紧跟着对应的 tool_result，中间不能夹杂着别的消息。Claude Code 源码里专门有一句注释提醒，在工具结果中间穿插普通的用户消息，API 会直接报错。

不选 C 也好理解。等整个任务结束，Agent 可能已经沿着错误的方向走完了。

Pi 在这件事上改过一次设计。早期 0.32.0 版本的 steer 会跳过当前这条回答里还没执行的工具调用；2026 年 3 月 16 日发布的 0.58.4 改成了等整批工具调用全部执行完再注入，一个都不跳过。

![](https://cdn.paicoding.com/stutymore/agent-user-interjection-20261012104818.png)

Codex 是这样处理的。如果模型这一轮已经打算结束了，但队列里还有用户插话的消息，Codex 会让这一轮继续跑下去。源码里就一行，needs_follow_up 等于“模型需要继续”或者“还有待处理的输入”。这样插话的消息就不会因为任务刚好结束而被吞掉。

一句话概括，插话不能抢工具的位置，只能在两次请求模型的间隙插进去。

![](https://cdn.paicoding.com/stutymore/agent-user-interjection-02-20261012112616-11f7cef1.png)

恭喜你，已经成功击败 50% 的学习者了。**接下来继续问你，消息注入以后，模型怎么知道这是用户中途插的话？**

A，原样作为一条普通的 user 消息；B，外面包一层提醒；C，写进 system prompt。喜欢点赞的你会选哪一个？

我的答案是 B。

Claude Code 会把插话包在一个叫 system-reminder 的标签里，原文是“The user sent a new message while you were working”，告诉模型工作的时候用户发来了一条新消息。后面再跟一句，完成当前任务之后，必须回应这条消息，不要忽略它。

这条消息也不是单独发送的，它和刚才的 tool_result 放在同一条 user 消息里，tool_result 排在前面，插话排在后面。

那聪明的你可能会问，中途注入的消息，并不全是用户发的，这时候怎么处理？比如说在 Claude Code 里，后台 Agent 完成任务的通知、外部服务推送进来的消息，和用户插话排在同一个队列里，也是在两次请求模型之间注入。

所以 Claude Code 会按消息的来源替换提示词模板。对于用户插话，附加的提示词是“The user sent a new message”；对于后台 Agent 的通知，附加的提示词是“A background agent completed a task”，意思是后台 Agent 完成了任务；外部服务推送的消息，会明确告诉模型，这不是用户发的，要当作不可信的内容处理，防止有人恶意借这条消息做提示词注入。

![](https://cdn.paicoding.com/stutymore/agent-user-interjection-03-20261012112751-e93ec83e.png)

恭喜看到这里的你，成功击败 70% 的学习者了。

**继续问你，Agent 正在执行一条很慢的命令，用户急着插话，怎么办？**

A，一直等命令执行完；B，立刻杀掉命令；C，看工具能不能被打断，能打断的就转到后台继续执行。喜欢点赞和分享的你会选哪一个？

我的答案是 C。

Claude Code 给每个工具设计了一个 interruptBehavior 字段，也就是工具被新消息打断时的行为，取值是 cancel 或者 block。cancel 表示可以打断，block 表示工具继续执行、新消息排队等着，工具没有声明的时候默认是 block。

shell 命令被打断的时候，Claude Code 不会杀掉进程，而是会转到后台，让模型还能看到命令已经输出的内容。

Codex 把选择权交给了用户，当你插入一条新的提示词，点击发送会进入排队。同时排队的消息上会出现一个【引导】按钮，意思是如果你点击了会立刻“提交，但不中断模型运行”，这条消息会等下一次工具调用结束后提交。

![](https://cdn.paicoding.com/stutymore/agent-user-interjection-20261012110412.png)

如果用户直接按下 Esc，Codex 会中断模型，把之前的任务插入到队列，等你继续。新的插入会排在后面。

![](https://cdn.paicoding.com/stutymore/agent-user-interjection-20261012110653.png)

Pi 的 Esc 更保守，会把排队的消息全部退回输入框，再中止执行，让用户自己决定重新发送什么。

换句话说，插话不一定要等，但打断是有代价的，这个代价由用户自己来选。

![](https://cdn.paicoding.com/stutymore/agent-user-interjection-04-20261012112908-c13395da.png)

恭喜看到这里的你，成功击败 90% 的学习者了。

面试官如果追问：“用户连着插了好几句，或者任务都结束了，队列里还有消息，怎么办？”

告诉他，先看一次注入了几条。Pi 的 steeringMode 默认是 one-at-a-time，每个注入点只注入最早的一条，剩下的留到下一个注入点；改成 all，才会一次全部注入。

任务结束了，队列里的消息也不会丢。Codex 会接着再跑一轮，Claude Code 会把剩下的消息自动作为下一轮提交。

还没发出去的消息，用户也可以反悔。Claude Code 里是按方向键上，可以把排队的消息拉回输入框修改，Pi 对应的快捷键是 Alt 加方向键上。Codex 里是可以直接删除，或者关闭排队。

![](https://cdn.paicoding.com/stutymore/agent-user-interjection-20261012111544.png)

恭喜你升到王者段位了，成功击败 99% 的学习者。

最后简单总结下。

取消是把任务停下来，插话是任务不停，只在两次请求模型之间修正方向。

另外，自己写 Agent 的时候，插话的注入点要放在工具结果写回之后、下一次调用模型之前，再给插话的消息包一层提醒，让模型知道这是用户中途补充的要求。

这个知识点你学会了吗？想解锁更多 Agent 硬核知识，点赞关注，我是二哥，咱们下期见！

<!-- video-covers:start -->

## 视频封面

![竖版封面](https://cdn.paicoding.com/stutymore/agent-user-interjection-cover-portrait-20261012112532-61633fc3.png)

![宽屏横版封面](https://cdn.paicoding.com/stutymore/agent-user-interjection-cover-wide-20261012112533-c94ef8d2.png)

![标准横版封面](https://cdn.paicoding.com/stutymore/agent-user-interjection-cover-standard-20261012112533-41da2fab.png)

<!-- video-covers:end -->
