---
title: Pi Agent 里有哪些反复出现的设计模式？
---

Agent 不就是一个 while 循环，然后反复调用大模型、执行工具吗？哪来的设计模式？

拿 Pi Agent 来说。它默认只给模型开放 4 个工具，可 GoF 的 23 种设计模式，能严格对上号的就有 9 种。

![](https://cdn.paicoding.com/stutymore/pi-agent-design-patterns-20260928152558-8098ba15.png)

面试官也特别喜欢拿这道题来压轴：“Pi 有哪些反复出现的设计模式？”

如果你回答“工厂模式和单例模式吧”，恭喜你，出门右拐回家等通知吧。

为什么？

因为 Pi 的 SessionManager、SettingsManager 这些核心服务都可以直接创建新实例，没有做成单例；它的工厂也只是 SessionManager.create() 这种静态工厂方法，算不上严格意义上的工厂模式。真正在源码里反复出现的，是策略模式、适配器模式和责任链模式。

在这把往期的 60 期 Agent 视频 原稿整理到飞书文档了，需要的可以评论区来个飞书。

我翻了 Pi 截至 2026 年 9 月 28 日的源码，可以自信地、大方地、光明磊落地帮你搞清楚这三件事。

- 同一个 read 工具，凭什么既能读本地文件，又能读远程服务器上的文件？
- 市面上几十家模型厂商，Pi 是怎么用一套代码全部接进来的？
- Pi 默认不弹权限确认框，危险命令靠什么拦截下来？

哈喽大家好，我是二哥呀。今天用 3 分钟，带你从 Pi 的源码里把这三个设计模式挖出来。

**先说第一个，策略模式。**

策略模式的意思是，把“怎么做”抽象成一个接口，运行时传进来哪个实现，就按哪种方式去做。Java 里最熟悉的例子是 Comparator，排序算法不变，比较规则由你决定。

Pi 的 7 个内置工具，read、write、edit、bash、grep、find、ls，每一个都配了一个 Operations 接口。拿 read 来说，ReadOperations 只定义了读取文件、检查文件能否访问这几个动作。创建工具时你传递了实现就用你的，没传就用本地文件系统的默认实现。

截断超长内容、识别图片这些工具逻辑只写一次，真正读写文件的动作可以整体替换。官方的 SSH 示例就是这么做的，启动时加上 --ssh 参数，read、write、edit、bash 全部换成远程实现。模型调用的还是同一个 read 工具，读到的却是服务器上的文件。

![Pi 通过 SSH 本机回环测试执行 bash 和 read 的终端实录](https://cdn.paicoding.com/stutymore/pi-agent-design-patterns-20260928154215-e79609d7.png)

**那聪明的你肯定想到了：工具能换执行环境，那模型能不能随便换？**

能，靠的是适配器模式。

适配器模式解决的是接口对不上的问题。JDBC 就是典型，你的代码只认 Connection 和 ResultSet，MySQL 和 Oracle 的差异由各自的驱动去消化。

Pi 的 Agent Loop 只认一种消息格式，可 Anthropic、OpenAI，每家的请求格式和流式事件都不一样。Pi 的做法是按协议写适配器，一共 10 种，全部实现同一个 StreamFunction 接口。

以 Anthropic 为例，请求发出去之前，convertMessages 和 convertTools 把 Pi 的消息和工具定义转换成 Anthropic 的格式；流式结果回来之后，再把 Anthropic 的 content_block_delta 事件转换成 Pi 统一的 text_delta 事件。

![](https://cdn.paicoding.com/stutymore/pi-agent-design-patterns-20260928152749-d6ec3759.png)

这样做的好处是，会话进行到一半，你用 /model 从 DeepSeek 切换到 Seed2.1 Pro，前面的对话、工具调用和工具结果都还在，因为它们存的是 Pi 自己的统一格式。

![Pi 同一会话从 DeepSeek 切换到 Seed2.1 Pro 后准确复述问题的终端实录](https://cdn.paicoding.com/stutymore/pi-agent-design-patterns-20260928155146-22175128.png)

**那聪明的你肯定又要问了：Pi 默认不弹权限确认框，危险命令谁来拦截？**

责任链模式。

一个请求沿着一串处理器往下传，每个处理器可以放行、修改，或者直接终止。写过 Java Web 的都知道，Servlet 的 FilterChain 就是这样，Spring 拦截器的 preHandle 返回 false，后面的逻辑就不再执行了。

Pi 的责任链建立在观察者模式之上。通过 pi.on 可以订阅 40 种事件，大部分是广播通知，但 tool_call 不一样。模型每次要调用工具，Pi 会把这次调用依次交给所有订阅了 tool_call 的扩展，只要有一个返回 block，后面的处理器就不再执行，这次工具调用也会被取消。

官方的 permission-gate 用三条正则匹配 rm -rf、sudo 和 chmod 777，命中就弹出选择框。你选了 No，它就返回 “Blocked by user”。作为工具结果交给模型，模型看到后就知道这一步被拒绝了。

![Pi permission-gate 选择 No 后拦截 sudo 命令的终端实录拼图](https://cdn.paicoding.com/stutymore/pi-agent-design-patterns-20260928154509-63ae204b.png)

最后简单总结下。

策略模式决定工具在哪里执行，适配器模式决定调用哪家模型，责任链模式决定这一步能不能执行。

另外给你一条实用建议。你自己写 Agent 的时候，在工具执行之前留个钩子，哪怕现在只用来打印一行日志，以后要加权限控制、要做审计，都不用改动核心的 loop 逻辑。

这个知识点你学会了吗？想解锁更多 Agent 硬核知识，点赞关注，我是二哥，咱们下期见！

<!-- video-covers:start -->
## 视频封面

![Pi Agent 设计模式 16:9 封面](https://cdn.paicoding.com/stutymore/pi-agent-design-patterns-cover-horizontal-16x9-20260928152844-c815c108.png)

![Pi Agent 设计模式 4:3 封面](https://cdn.paicoding.com/stutymore/pi-agent-design-patterns-cover-horizontal-4x3-20260928152844-1c59a229.png)

![Pi Agent 设计模式 3:4 封面](https://cdn.paicoding.com/stutymore/pi-agent-design-patterns-cover-vertical-3x4-20260928152844-d3e97b22.png)
<!-- video-covers:end -->
