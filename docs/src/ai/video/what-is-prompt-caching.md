---
title: DeepSeek 为什么能让 Prompt Caching 自动成本爆降 90%，而 Claude 还需要 cache_control 字段手动控制？
---

你是不是每天都在调用 DeepSeek 的 API？

![](https://cdn.paicoding.com/stutymore/what-is-prompt-caching-20260908090314.png)

在 DeepSeek 的官方定价表上，缓存命中的输入每百万 Token 只要一毛五，未命中却要四块五，整整差了三十倍！只要前缀成功命中缓存，输入成本直接暴降 96.6%！

![](https://cdn.paicoding.com/stutymore/what-is-prompt-caching-20260908090522.png)

我花了一个小时深扒了 DeepSeek 的底层架构论文和接口账单，可以自信地、大方地、光明磊落地帮你搞清楚这三件事：

- DeepSeek 的提示词缓存到底牛在哪里？
- 面对海量并发，DeepSeek 的服务器显存如何扛得住？
- 开发 Agent 时，怎样才能让提示词缓存起效？帮用户剩下账单？

![](https://cdn.paicoding.com/stutymore/what-is-prompt-caching-disk-20260908094648-db9378c9.png)

在这梳理了一份 AI Agent 开发学习路线和 288 道配套八股，需要的可以来个222。

哈喽大家好，我是二哥呀。今天用 3 分钟，给你讲清楚 DeepSeek 的提示词缓存到底有多牛。

先说第一件事，DeepSeek 的缓存到底颠覆在哪里。

用过 Claude 的小伙伴肯定有体会，Anthropic 搞提示词缓存，非逼你在代码里手动写配置（靠 cache_control 字段控制），写错了还要加收一点二五倍的费用。

![](https://cdn.paicoding.com/stutymore/what-is-prompt-caching-20260908090934.png)

DeepSeek 是全球首家推出全自动、零门槛提示词缓存的主流大模型。你不需要改任何代码，后台会自动识别并缓存重复前缀。

![](https://cdn.paicoding.com/stutymore/what-is-prompt-caching-20260908091204.png)

那聪明的你肯定想到了，只要前缀匹配上就自动缓存，那面对每天天文数字的请求量，DeepSeek 的服务器显存是怎么扛住的？

这正是 DeepSeek 绝的地方：**上下文硬盘缓存**。

![](https://cdn.paicoding.com/stutymore/what-is-prompt-caching-persistence-20260908094909-2969aba8.png)

传统大模型做缓存，全靠昂贵的 GPU 显存放 KV 缓存。显存多金贵啊，并发稍微一高显存直接就被挤爆了。

DeepSeek 另辟蹊径，把计算好的 KV 缓存转移出来，落盘存进超大容量的分布式固态硬盘阵列中。

虽然从硬盘读取比显存稍慢，但它换来了海量的缓存容量和极致的低成本，通过算法优化，最终不仅大幅降本，还降低了整体的服务延迟。

那存进硬盘后怎么命中呢？核心在于**缓存前缀单元**。后续请求只要完整匹配某个前缀单元，就会直接从硬盘秒级加载，避免掉重复计算。

而且后台有三种非常聪明的落盘时机：

一是**请求结束落盘**：每次请求在输入结束和输出结束时，各打包一个单元写入硬盘。在多轮对话里，第二轮请求就能完整复用第一轮落盘的单元，精准命中。

二是**公共前缀落盘**：哪怕两次请求问的问题完全不同，只要共享了长文档或系统提示词，后台就会自动把公共前缀提炼成独立单元存进硬盘。下一次提问直接命中这份公共缓存。

三是**固定 Token 间隔落盘**：面对超长上下文，系统会按固定步长切片落盘。

DeepSeek 在模型设计中引入了 MLA（Multi-head Latent Attention，多头潜在注意力机制），它能够对 KV Cache 进行“大幅度压缩”，使得原本极占内存的上下文状态变得非常小。

当后续请求的前缀内容完全一致（必须从第 0 个 Token 开始严格匹配）时，系统就会直接从分布式磁盘阵列中拉取计算好的 KV Cache，免去重复 Prefill（预填）的算力开销。

那聪明的你肯定又要问了：既然缓存这么香，实际写代码时，怎样才能最大程度让 DeepSeek 命中缓存？

核心只有一条：前缀逐字匹配。开头只要变了一个标点符号，后面的缓存全盘报废。

![](https://cdn.paicoding.com/stutymore/what-is-prompt-caching-layout-20260908095107-e8c0dcda.png)

在编排提示词时，守住这两点。

第一，把永远不变的系统提示词和工具定义，放在最前面。千万别在中间动态增删工具，工具列表变了，前缀就断了，缓存瞬间失效。

![](https://cdn.paicoding.com/stutymore/what-is-prompt-caching-20260908093413.png)

第二，把动态变化的提问内容、时间戳或者随机变量，老老实实挪到提示词的最末端。每次调完接口看一眼 response 中的 prompt_cache_hit_tokens 字段，数字噌噌往上涨，就说明你稳稳吃到缓存命中了。

最后简单总结下。

DeepSeek 靠上下文硬盘缓存技术，把提示词缓存做到了全自动、超大容量和 96.6% 的断崖式降本。

这个知识点你学废了吗？想解锁更多 AI 硬核知识，点赞关注，我是二哥，咱们下期见！

![](https://cdn.paicoding.com/stutymore/what-is-prompt-caching-20260908111651.png)

![](https://cdn.paicoding.com/stutymore/what-is-prompt-caching-20260908111658.png)

![](https://cdn.paicoding.com/stutymore/what-is-prompt-caching-20260908111704.png)

这个公众号历史发布过很多有趣的 Agent 知识点，如果你懒得翻文章一个个找，你直接关注微信公众号：二哥狗腿子 ，后台对话聊天就行了：

![](https://cdn.paicoding.com/stutymore/what-is-kv-cache-20260905210106.png)