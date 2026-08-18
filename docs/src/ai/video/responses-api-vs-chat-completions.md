# DeepSeek V4 Pro 正式版支持 Responses API 了，它和 Chat Completions API 到底有什么区别？

如果你调用过 DeepSeek 的 API，你一定用过 Chat Completions 协议。发一个 messages 数组，拿回一段文本，简单粗暴。

![](https://cdn.paicoding.com/stutymore/responses-api-vs-chat-completions-20260813232150.png)

但聪明的你应该已经注意到了，Codex 已经不用 Chat Completions 协议了，就连 DeepSeek V4 Pro 和 Flash 也原生支持 Responses API 协议了。

为什么要换协议呢？

我翻了 Codex 的架构博客、DeepSeek 的 API 文档，可以自信地、大方地、光明磊落地帮你搞清楚这三件事：

- Responses API 到底改变了什么？
- 为什么 Agent 时代需要一个新的 API？
- DeepSeek V4 Pro 支持它意味着什么？

![](https://cdn.paicoding.com/stutymore/responses-api-vs-chat-completions-20260814081348.png)

哈喽大家好，我是二哥呀。今天用 3 分钟，给你讲清楚 Responses API 和 Chat Completions API 到底有什么区别。

系好安全带，我们粗粗粗出发了～

先说第一个区别，输入输出的格式变了。

Chat Completions 协议里，所有的东西都是 message。你输入的是 user message，模型回复的是 assistant message，工具返回的结果是 tool message。不管什么类型的内容，都塞在同一种 message 数组里。

怎么区分？

靠 role 字段区分。

Responses API 不一样。它把每种输出拆成了独立的类型——文本回复是 message，推理过程是 reasoning，工具调用是 function_call，生成图片是 image_generation_call。各管各的，互不干扰。

打个比方。Chat Completions 像是在一个群聊里，不管你是汇报工作、发通知还是分享文件，都只能打字发消息。

（当然了，我只是举个不恰当的例子）

Responses API 像飞书工作台，文档、审批、日程、视频会议，每种操作都有自己的入口。

![](https://cdn.paicoding.com/stutymore/responses-api-vs-chat-completions-20260814081405.png)

那聪明的你肯定想到了：光改个格式，就值得专门出一套新 API 吗？

当然不止这些。还有更关键的——状态管理和内置工具。

Chat Completions 是无状态的。每次调用，你都要把完整的聊天记录塞进 messages 数组重新发一遍，第 11 轮聊天你需要把前 10 轮的所有内容全部重发。

Responses API 给了一个新的选项：previous_response_id。你只需要告诉服务端"上一轮的响应 ID 是什么"，服务端通过 id 去它自己记录的上下文信息里去找，不用你重发。

再看内置工具。Chat Completions 只支持你自己定义的函数，联网搜索、代码执行，都得你自己接第三方服务。Responses API 直接内置了——联网搜索、代码执行、文件检索，你只需要写一行 `tools: [{type: "web_search"}]`，剩下的 API 帮你搞定。

一句话总结这个区别：Chat Completions 是为聊天时代设计的，Responses API 是为 Agent 设计的。

![](https://cdn.paicoding.com/stutymore/responses-api-vs-chat-completions-20260814081422.png)

那聪明的你肯定又要问了：DeepSeek V4 Pro 支持 Responses API，有什么实际意义？

最直接的好处——你可以把 DeepSeek V4 Pro 直接接入到 Codex 里用。

因为 Codex 用的就是 Responses API，所以兼容性会更好。

以前你想在 Codex 里用国产模型，中间得加一层代理进行格式转换。现在 DeepSeek V4 Pro 原生支持了，改一下 base_url 就能直接用，不用再做任何适配。

更伟大的是，Responses API 不再是 OpenAI 的专属格式。DeepSeek V4 正式版支持了，其他模型厂商迟早也会跟上。它正在成为 Agent 时代的行业标准——就像当年 Chat Completions 的 messages 格式成为聊天 API 的行业标准一样。

最后简单总结下。

Chat Completions 为聊天而生，Responses API 为 Agent 而生。核心区别有三个：类型化输出、服务端状态管理、内置工具。另外，如果你在做 Agent 开发，建议现在就切到 Responses API。

这个知识点你学废了吗？想解锁更多 AI 硬核知识，点赞关注，我是二哥，咱们下期见！

![](https://cdn.paicoding.com/stutymore/responses-api-vs-chat-completions-20260814081105.png)

![](https://cdn.paicoding.com/stutymore/responses-api-vs-chat-completions-20260814081123.png)

![](https://cdn.paicoding.com/stutymore/responses-api-vs-chat-completions-20260814081137.png)