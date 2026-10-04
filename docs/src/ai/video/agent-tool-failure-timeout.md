---
title: Agent 调用工具失败或者超时了怎么办？
---

面试官问你：“Agent 调用工具失败或者超时了怎么办？”如果你回答“加个 try-catch，失败了就重试三次”，恭喜你，出门右拐回家等通知吧。

为什么？

因为失败分好几种。网络抖动，重试一次可能就好了；参数写错，重试一百次也没用；扣款工具超时且幂等没有做好，重试一次，用户可能就会被扣两次钱。

![](https://cdn.paicoding.com/stutymore/agent-tool-failure-timeout-types-20261003093004-4853a697.png)

恭喜看到这里的你，已经成功击败 30% 的学习者，给自己鼓个掌吧。**接下来我问你，工具执行报错了，Harness 应该怎么处理？**

A，直接抛异常，终止任务；B，Harness 自己重试；C，把错误信息作为工具结果，回传给模型。聪明的你可以把答案打在弹幕或者留言区。

说一下我的答案。Agent 等于 Model 加 Harness，Harness 就是模型之外的一整套负责工具执行、上下文管理的程序。

拿 Claude Code 来说，模型每发起一次工具调用，就会产生一个 tool_use，Harness 执行完，必须紧跟着返回一个对应的 tool_result，少一个，API 就直接报 400 错误。工具出错了也一样，只是多了一个把 is_error 字段设为 true 的动作，同时把错误原因也写进上下文。

当然了，这个错误信息是写给模型看的，要写清楚出了什么错，Anthropic 官方文档里有这样一个示例，“Rate limit exceeded. Retry after 60 seconds.”。意思是参数缺失或者无效时，Claude Code 会自己修正，然后重试 2 到 3 次，如果还不行就反馈给用户。

Claude Code 的源码里有这样一行注释，大意是“没想到模型生成合法参数的能力这么差”。所以它每次执行工具之前，都会用 Zod 校验参数，校验失败就明确告诉模型哪个参数有问题。

MCP 协议也是这么规定的。未知工具、请求格式错误这类协议错误，走 JSON-RPC 的错误响应；接口失败、业务校验失败这类执行错误，放进工具结果里，标记为 `isError: true`，交给模型自己纠正。

![](https://cdn.paicoding.com/stutymore/agent-tool-failure-timeout-error-result-20261003093212-ad4b31ac.png)

恭喜看到这里的你，已经成功击败 50% 的学习者了。**接下来继续问你，哪些错误应该重试？**

A，所有错误都重试；B，网络抖动和限流；C，参数错误。聪明的你会选哪一个？

我的答案是先分类，再处理。

网络断开、429 限流、5xx 服务端错误，这类瞬时错误过一会儿可能就好了，适合重试。不管是工具请求外部接口，还是 Harness 请求模型 API，道理都一样。另外，重试要用指数退避加随机抖动，等待时间每次翻倍，再随机加一点，避免大量客户端在同一时刻一起重试。服务端如果返回了 retry-after 头，就按它给的时间等。

Claude Code 请求模型 API 失败时，最多会重试 10 次，等待时间从 500 毫秒上限到 32 秒，再加上 25% 的随机抖动。连续 3 次遇到 529 过载错误时，如果配置了备用模型，就自动切换过去。

至于额度用完、上下文超限、参数错误，这类叫确定性错误，重试多少次结果都一样。Codex 的源码里有一张可重试错误的白名单，额度超限、上下文窗口超限这类就不在里面。

![](https://cdn.paicoding.com/stutymore/agent-tool-failure-timeout-retry-20261003094842-0a7caff5.png)

恭喜看到这里的你，成功击败 70% 的学习者了。

**继续问你，工具超时了怎么办？**

A，丢掉返回值继续下一步；B，杀掉进程；C，把命令转到后台继续执行。聪明的你会选哪一个？

我的答案是看场景选，但 A 肯定是错的。

Codex 的默认超时为 10 秒，超时后会用 killpg 给整个进程组发 SIGKILL 信号，连子进程一起结束，退出码统一改成 124，告诉模型“command timed out after 10000 milliseconds”。

Claude Code 的 Bash 工具默认超时时间为 2 分钟，最长可以设置成 10 分钟。超时后默认不杀死进程，而是把命令转成后台任务，把任务 ID 和输出文件的路径交给模型，模型过一会儿可以再次去读取结果。跑测试、跑构建这种耗时长的命令，就适合这么处理。

丢掉返回值继续下一步的问题是进程还在执行，会继续占着端口和内存，甚至还在修改文件。而且没有回 tool_result，下一轮请求 API 就会报错。

![](https://cdn.paicoding.com/stutymore/agent-tool-failure-timeout-process-20261003095145-bd47cc8e.png)

恭喜看到这里的你，成功击败 90% 的学习者了。

面试官如果追问：“扣款这种工具超时了，能直接重试吗？”

告诉他，不能。超时不代表没有执行，可能钱已经扣了，只是响应没回来。这种有副作用的工具，必须先做幂等。

通常的做法是每个请求带上一个 Idempotency-Key，服务端把第一次请求的状态码和响应体存起来，同一个 key 再来请求，直接返回第一次的结果，key 至少保留 24 小时。放到 Agent 里，就是调用工具之前先生成一个请求 ID，重试时复用同一个 ID。同一步连续失败几次之后，就停下来交给用户处理。

![](https://cdn.paicoding.com/stutymore/agent-tool-failure-timeout-idempotency-20261003095416-411c59a7.png)

恭喜你升到王者段位了，成功击败 99% 的学习者。

最后简单总结下。

瞬时错误就退避重试，确定性错误回传给模型修改参数，超时要结束或者接管进程，有副作用的工具先做幂等再重试。

另外，自己写工具的时候，错误信息别只写一个 failed，要写清楚错在哪、下一步该怎么做，让模型根据你的信息进行调整。

这个知识点你学会了吗？想解锁更多 Agent 硬核知识，点赞关注，我是二哥，咱们下期见！

<!-- video-covers:start -->
## 视频封面

![Agent 工具失败与超时视频封面，横版 16:9](https://cdn.paicoding.com/stutymore/agent-tool-failure-timeout-cover-horizontal-16x9-20261003093938-9d842fd9.png)

![Agent 工具失败与超时视频封面，横版 4:3](https://cdn.paicoding.com/stutymore/agent-tool-failure-timeout-cover-horizontal-4x3-20261003093941-ed5da54e.png)

![Agent 工具失败与超时视频封面，竖版 3:4](https://cdn.paicoding.com/stutymore/agent-tool-failure-timeout-cover-vertical-3x4-20261003093947-74644da2.png)
<!-- video-covers:end -->
