---
title: Claude、ChatGPT、Grok 全崩，你的中转为什么还能用？真的本地部署了 GPT？
---

9月3日晚，你是不是也经历了？正用着 Claude Code 跑任务，突然断连。打开 ChatGPT，404。打开 Grok，也挂了。

![](https://cdn.paicoding.com/stutymore/why-relay-still-works-180a9db07b0cf060ff10061737f9259e.jpg)

三家全崩，也算见证历史了。

但神奇的是，有老哥吹嘘他们的中转还在正常跑，并且本地部署了 GPT，一瞬间我是真没绷住好吧。GPT 是 OpenAI 的闭源模型，权重从来没有公开过，你拿什么部署？能本地跑的只有 Llama、Qwen、DeepSeek 这些开源模型，那跑的就不是 GPT。

官网都打不开了，中转凭什么还能用？

![](https://cdn.paicoding.com/stutymore/why-relay-still-works-a6a368c95e219d60e61ed7916ec9190c.jpg)

我去翻了三家的 status page、中转的技术架构，还有圈子里老哥们的实测反馈，可以自信地、大方地、光明磊落地帮你搞清楚这三件事。

- 这次到底是什么崩了，为什么官网和 API 会一起挂？
- 中转换了模型，你为什么压根分不出来？
- 怎么用技术手段验证你的中转到底在调谁？

哈喽大家好，我是二哥呀。今天用 3 分钟，给你讲清楚为什么 AI 官网全崩了，中转还能继续跑。

系好安全带，我们粗粗粗出发了～

**先说第一件事，这次到底挂了什么**。

可能有小伙伴觉得，官网崩了不代表 API 崩了，它们是两套系统。

不是的。

你调 api.openai.com 也好，打开 chatgpt.com 也好，请求首先要经过 Cloudflare。Cloudflare 负责 DNS 解析和 TLS 握手，你的请求到不了 OpenAI 的源站服务器之前，必须先过 Cloudflare 这一关。Claude 和 Grok 也一样，都依赖 Cloudflare 这个入口。

![](https://cdn.paicoding.com/stutymore/why-relay-still-works-20260904112847-034fa805.png)

这次 Cloudflare 路由层出了问题，再加上 Azure 宕机，等于入口大门直接关了。不管你是从浏览器访问还是从代码里调 API，请求压根到不了后端，连 Google Gemini 的部分开发者都受到了波及。

官方 API 都挂了，**中转还能正常返回结果，这说明什么？**

说明它压根没在调官方 API。

那聪明的你肯定想到了，中转换了模型，为什么完全没感觉？

先说技术层面。OpenAI 的 Chat Completions 协议已经成了整个行业的事实标准，DeepSeek、通义千问、Kimi，几乎所有大模型厂商都兼容这套接口。中转只要改一个 base_url，请求照样能跑通，结果照样能返回。

![](https://cdn.paicoding.com/stutymore/why-relay-still-works-20260904113020-ad3556cf.png)

但「技术上能换」不等于「换了你分不出来」。关键问题是，为什么替代模型的回答看起来跟 GPT-5.6 差不多？

因为模型之间的差距，已经越来越小了。

Stanford 2026 AI Index 报告（今年 4 月发布）里有一组数据。MMLU 基准测试中，中美头部模型的差距从 2023 年的 17.5 个百分点缩到了 0.3 个百分点。到了 2026 年 9 月，Arena 排行榜上前十名模型的 Elo 分差只剩 22 分，统计上已经没有显著区别。

![](https://cdn.paicoding.com/stutymore/why-relay-still-works-20260904113259-a7683efd.png)

这不是巧合。所有大模型都在用 RLHF 做偏好对齐，训练目标高度重叠，都在往「有用、无害、诚实」的方向调。结果就是不管底层架构多不同，输出的语气、格式、措辞风格越来越像。你让 GPT-5.6 写一段代码和让 DeepSeek V4 Pro 写，日常任务几乎分不出区别。

再加上中转会原封不动地转发你的 system prompt 和 temperature 参数。你自己设定的输出风格，替代模型也照做。本来就不大的差异，进一步被抹平了。

所以真相不是中转伪装得多高明，是模型之间本来就越来越像。中转只是利用了这个事实。有些中转价格能做到官方的十分之一，靠的就是这个。

更隐蔽的做法是混合渠道。平时确实走官方 API，一旦检测到官方返回 5xx 错误，自动切到替代模型。官方恢复了再悄悄切回来，你可能永远都不知道中间那段时间用的是谁。

那聪明的你肯定又要问了，**怎么判断自己用的中转到底靠不靠谱？**

三个方法。

第一，看响应体里的 model 字段。正规中转返回的 JSON 里，model 字段是上游真实返回的模型名。注水的中转会篡改这个字段，把它改成你请求的那个模型名。你可以对比官方直接返回的 model 字段格式，看看有没有出入。

第二，测模型的知识边界。每个模型的训练数据截止日期不同，问一个只有最新版模型训练数据里才有的事件。

![](https://cdn.paicoding.com/stutymore/why-relay-still-works-20260904113424-41bfd1fa.png)

第三，看首 Token 延迟。不同模型的推理速度差异很大，Fable 5 和 GPT-5.6 的首 Token 响应时间（TTFT）有明显区别。如果你请求的是 GPT-5.6，但 TTFT 快得不像话，大概率后面跑的不是它。

最后简单总结下。

官网和 API 共用 Cloudflare 做流量入口，Cloudflare 挂了就全挂了。中转还能跑，不是因为技术更强，是因为 OpenAI 兼容协议让换模型零成本，而模型之间的能力和风格又趋同到你分不出来。这次三家全崩，反而成了一面照妖镜。

这个知识点你学废了吗？想解锁更多 AI 硬核知识，点赞关注，我是二哥，咱们下期见！

![](https://cdn.paicoding.com/stutymore/why-relay-still-works-20260904114253.png)

![](https://cdn.paicoding.com/stutymore/why-relay-still-works-20260904114303.png)

![](https://cdn.paicoding.com/stutymore/why-relay-still-works-20260904114309.png)