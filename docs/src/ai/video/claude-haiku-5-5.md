---
title: Claude Haiku 5.5发布！最便宜、最快且能力最强的小尺寸模型。
---

10 月 8 日，Anthropic 发布了 Claude Haiku 5.5，官方给它的定位是“迄今最便宜、最快、能力最强的小尺寸模型”。

![](https://cdn.paicoding.com/stutymore/claude-haiku-5-5-20261008082911.png)

同样的任务，Haiku 5.5 的运行成本比上一代 Haiku 4.5 低了 75 个百分点，非常夸张的一个数据。

能力反而涨了一大截。在考察终端操作能力的 Terminal-Bench 4.0 上，Haiku 5.5 做到了 39.2 分。在考察电脑操作能力的 OSWorld 上，成绩从 Haiku 4.5 的 15.7 分涨到了 72.4 分。

我翻了 Anthropic 的官方公告、144 页的 System Card，可以自信地、大方地、光明磊落地帮你搞清楚这三件事。

- Haiku 5.5 价格降了这么多，能力为什么更强了？
- 首款能调节 effort 的 Haiku，怎么在成本和智能之间做选择？
- Haiku 在 Agent 里应该负责干什么？

哈喽大家好，我是二哥呀。今天用 3 分钟，给你讲清楚 Claude Haiku 5.5。

**先说第一件事，Haiku 5.5 的能力到底强在哪？**

先看定价。提示词在 10 万 token 以内，输入每百万 token 0.1 刀，输出每百万 token 0.5 刀。Haiku 4.5 是 1 刀和 5 刀，Haiku 5.5 直接降到了十分之一的价格。

![](https://cdn.paicoding.com/stutymore/claude-haiku-5-5-20261008084710.png)

那聪明的你看到这里肯定会问，明明便宜了 90%，官方为什么说只便宜了 75%？

原因有两个。第一，Haiku 5.5 换了新的分词器，同样一段文字，切出来的 token 比 Haiku 4.5 多 30% 左右。第二，提示词超过 10 万 token 的话，价格会涨到输入 0.5 刀、输出 2.5 刀。

还有一个细节。10 万 token 以内，Haiku 5.5 的输入、输出、缓存读取、缓存写入，和 GPT-6 Luna 完全一样。

上下文窗口上，Haiku 4.5 是 20 万 token，Haiku 5.5 是 100 万 token，最大输出也从 6.4 万 token 扩容到了 12.8 万 token。

![](https://cdn.paicoding.com/stutymore/claude-haiku-5-5-benchmarks-20261008094256-ecb7ce00.png)

System Card 里还藏着一个数字。长上下文编程测试 ProgramBench 上，Haiku 5.5 拿到了 82.0 分，比 Sonnet 5.5 的 79.7 分还要高。

**那聪明的你肯定会继续问，能调节 effort 的 Haiku，怎么在成本和智能之间做选择？**

effort，也就是推理档位，或者叫思考强度，再或者可以叫努力程度，Claude 一共五档，low、medium、high、xhigh、max，默认是 medium。

![](https://cdn.paicoding.com/stutymore/claude-haiku-5-5-20261008090002.png)

很多人以为 effort 只影响模型思考的强度。其实不是的。effort 还会影响所有的输出，包括思考的过程、正文内容，以及工具调用。档位低的时候，模型会把几个操作合并成更少的工具调用，直接动手；档位高，模型会先讲清楚计划，调用更多的工具，最后给出详细的总结。

![](https://cdn.paicoding.com/stutymore/claude-haiku-5-5-effort-20261008094350-4e9667d3.png)

这里有一个很容易踩的坑，effort 档位低并不代表着 token 消耗一定会变少。

effort 只是告诉模型，这次少花点力气，具体花多少，由模型根据题目难度自己判断。同样开 low 档，一个简单的分类问题，模型可能跳过思考，直接给出答案；一个复杂的数学问题，模型照样会花很多 token 去思考。

再多讲一点。max_tokens 规定一次回复最多能输出多少 token，思考和正文要一起算，Haiku 5.5 最高可以设置为 12.8 万 Token，意味着输出达到这个数量时，模型会立刻停下。

Haiku 4.5 除了要设置 max_tokens，还要设置 budget_tokens 参数，规定思考最多能用多少 token。比如 max_tokens 设成 1.6 万，budget_tokens 设成 1 万，意思是思考最多占用 1 万，剩下的留给正文。

Haiku 5.5 把 budget_tokens 取消了，思考用多少 token，由你选的 effort 档位，再加上 adaptive thinking（自适应思考）让模型自己决定。

而且我注意到一点，Haiku 5.5 开到 high 档的话，跑分已经超过 Sonnet 5.5 的最低档，成本却只有 Sonnet 的四分之一。

![](https://cdn.paicoding.com/stutymore/claude-haiku-5-5-20261008090502.png)

官方给的建议是，聊天、简短的工具任务、大批量的简单请求，开 low 档；大多数任务，包括 Agent 编程，保持默认的 medium 就行；对于知识型工作和较长的 Agent 任务，开 high；至于 xhigh 和 max，high 搞不定的时候再开。

注意一点，effort 的值会被写进提示词，请求之间切换档位的话，前缀缓存会失效，所以任务一旦跑起来，档位就别来回改了。

**那聪明的你肯定又要问了，对于一个 Agent 来说，Haiku 5.5 应该用来干嘛？**

官方的原话是，Haiku 5.5 专为高频、对成本敏感的任务设计。点名的任务有摘要、上下文压缩、分类、路由，还有给 Opus 5.5 当 Sub-agent。至于复杂的 Agent 编程任务，官方仍然推荐 Opus 5.5。

官方公告里提到，Cognition 团队让 Opus 5.5 当主力、Haiku 5.5 当助手，组合出来的 Devin Fusion 在编程评测 FrontierCode 上拿到了 66.2 分。

![](https://cdn.paicoding.com/stutymore/claude-haiku-5-5-subagent-20261008094523-fe78d6e6.png)

落到 Claude Code 上，有三件事值得马上去做，尤其是 20 刀的订阅用户。

第一，Claude Code 从 v2.1.293 开始，haiku 这个别名在 Anthropic API 上已经指向 Haiku 5.5。

第二，自定义 Sub-agent 的时候，在配置文件里写上 model: haiku，再加一行 effort: low，把读文件、搜代码这类任务交给它。

第三，内置的 Explore Sub-agent 默认沿用主对话的模型，不会自动切换到 Haiku。如果你想更快更省钱，就自己定义一个 Explore，把模型指定成 haiku。

这个知识点你学会了吗？想解锁更多 Agent 硬核知识，点赞关注，我是二哥，咱们下期见！

<!-- video-covers:start -->
## 视频封面

![Claude Haiku 5.5 视频封面，横版 16:9](https://cdn.paicoding.com/stutymore/claude-haiku-5-5-cover-horizontal-16x9-20261008095518-2d78e955.png)

![Claude Haiku 5.5 视频封面，横版 4:3](https://cdn.paicoding.com/stutymore/claude-haiku-5-5-cover-horizontal-4x3-20261008095519-84a3cccf.png)

![Claude Haiku 5.5 视频封面，竖版 3:4](https://cdn.paicoding.com/stutymore/claude-haiku-5-5-cover-vertical-3x4-20261008095520-4d5ed7de.png)
<!-- video-covers:end -->
