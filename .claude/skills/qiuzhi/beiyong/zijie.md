# 字节期权+项目面试题转发很高

大家好，我是二哥呀。

根据 2026 年 1 月的最新动态，字节近期大幅上调了期权价格，并对激励机制进行了优化。

①、将薪酬总包场景中的期权价格由去年 8 月份的 200.41 刀上调至 226.07 刀，涨幅超 13%。

②、年终奖激励月数超过 3 个月的部分，由 100% 期权改为 25% 现金 + 75% 期权。

③、绩效达标（E 及以上）的员工，激励基数由月薪调整为月总包（月薪 + 月期权）。

我只能说，羡慕的话我已经说累了。😄

我只能说，拿到字节offer的同学，过来交个朋友啊，我想紧紧抱住你的大腿，绝不放手。

我只能说，[26届拿下字节的球友](https://mp.weixin.qq.com/s/Vo1ggbhIir3L41hOykHDGA)真不少，我上一点点证据，这还只是从2025年12月07日开始统计到飞书多维表格的数据。

![](https://files.mdnice.com/user/3903/814b712e-03b7-494f-9edf-85bff212765b.png)

有一说一，字节确实无愧宇宙厂，不仅产品线多，每个还特别能打，我自己经常用的AI产品是TRAE和豆包。

再加上字节确实舍得在人才方面投入，所以拿到多个offer的球友都会倾向于去字节，有时候劝都劝不住，真的。

另外就是，字节不管是在筛简历，还是面试，都相对友好。如果拿到了字节的面试，我建议去面，千万别担心面评的事。

不要把机会拱手让人。

**人的成功，离不开实力，但对于绝大多数普通人，更离不开运气，错过的代价远高于实力不济**。

要相信自己，多给自己鼓励，年轻人，就是要有无畏的精神头，然后利用有限的时间去背八股、刷算法，做项目，复盘场景题，求职远没有想象中的那么难。

看看这位球友的喜报：感谢二哥，字节发offer了，跟着二哥两个月找到实习了。二哥的[派聪明RAG](https://mp.weixin.qq.com/s/Vo1ggbhIir3L41hOykHDGA)和面渣太香了！

![](https://files.mdnice.com/user/3903/cd78800c-0591-4d98-b4b7-d4c8eb73377b.png)

根据之前统计到的球友真实面经，就连字节的客户端二面都在问AI，你敢信？

>原贴地址：https://paicoding.com/column/10/25

![](https://files.mdnice.com/user/3903/14f2719d-9365-443f-b96b-1801132b0f4a.jpg)

## 派聪明真实面经

### 10.介绍一下派聪明

完整版的介绍复制这个链接到浏览器地址栏：`https://t.zsxq.com/yYgeK`

答：面试官你好，派聪明是一个企业级的 RAG 问答知识库。可以把它想象成一个私有化部署的、专门针对企业内部文档的 ChatGPT。员工可以上传公司的各种资料，比如产品手册、技术文档、规章制度、会议纪要等，然后通过自然语言对话的方式，快速准确地从这些海量资料中获取信息。

![](https://cdn.paicoding.com/paicoding/2550c873a349d8bee29d46400f12ce76.png)

后端主要采用 Spring Boot 3 全家桶，配合 Java 17。前端是 Vue 3 结合 Vite。数据和中间件层面，我用了 MySQL 做业务数据存储，Redis 做缓存，Kafka 作为消息队列，Elasticsearch 作为向量数据库和全文检索引擎，以及 MinIO 作为对象存储服务。


### 11.混合检索的准确率怎么算，有没有考虑过从业务上去优化准确率。

面试官您好，对于混合检索的准确率，我会通过构建评测集和自动化计算命中率、MRR 等技术指标，对系统的检索质量进行量化。

第一步，人工标注这样一个数据集：

- question：用户可能会问的典型问题。
- ground_truth_context：对于每个问题，哪些文档片段被认为是必须召回的“标准答案”。一个问题可能对应多个“标准答案”文档。

第二步，对于一个问题，只要检索结果中至少包含一个 ground_truth_context 里的文档，就算“命中”。这是最基础的指标，经过多次测试，派聪明的命中率能保持在 95% 以上。

![](https://cdn.paicoding.com/paicoding/2540c079d754110c409857f7e92cc2f8.png)

另一方面，对于一个问题，找到检索结果中第一个 ground_truth_context 文档所在的排名 rank，然后计算 1/rank。MRR 就是所有问题 1/rank 的平均值。如果标准答案总是排在第一位，MRR 就趋近于 1。

#### 引入意图识别

完整版答案可以访问这个链接`https://t.zsxq.com/OicS1`

用户的问题千差万别，有的想查知识，有的想分析数据，有的只是闲聊。

为了提高准确率，可以在检索前，先用一个模块判断用户的意图。如果用户问“高血压的症状”，我们就去“医学百科”知识库里检索。

这种基于业务意图的“查询路由”，相当于为每个查询都匹配了最优的“信息源”和“处理路径”。

第二，在答案旁边设置一个“赞/踩”按钮。当用户点“赞”时，系统可以记录下这次成功的 question 和 retrieved_context，将它们作为高质量的样本，加入到微调 Embedding 模型的“正样本”数据集中。

当用户点“踩”时，可以触发一个反馈流程，让用户选择“答案不相关”、“答案不准确”等原因。


### 12.意图识别有没有兜底策略

假如意图识别模块由于某些原因（比如模型服务宕机、网络超时）没有返回一个明确的意图标签，我的策略是：降级处理。

```java
String intent = intentRecognitionService.getIntent(userQuery);

switch (intent) {
    case "疾病知识问答":
        // ... 执行疾病问答的逻辑 ...
        break;
    case "药物信息查询":
        // ... 执行药物查询的逻辑 ...
        break;
    // ... 其他意图分支 ...
    default: // 这就是兜底策略
        // 记录一条警告日志，说明意图识别失败
        log.warn("意图识别失败，用户查询: '{}'。降级到通用检索策略。", userQuery);
        // 执行通用检索
        executeGenericSearch(userQuery);
        break;
}
```

降级到通用检索策略，它会在所有核心的、公开的知识库索引中进行混合搜索。例如，同时在 medical_encyclopedia_idx 和 medication_manual_idx 这两个最常用的索引中进行检索，然后将两路结果用 RRF 算法融合后，再交给 LLM。

### 13.为什么 websocket，怎么使用的

WebSocket 是一种有状态、全双工的协议，一旦连接建立，前后端就可以随时互相发送消息。在派聪明中，前端发起 WebSocket 请求建立连接后，后端就会一直监听前端的请求并保持连接。用户一旦发送请求，派聪明就会实时将 DeepSeek 返回的是流式数据通过 WebSocket 传回给前端。

![](https://cdn.paicoding.com/paicoding/3c082ded4af8f05d883f248e78f2d092.png)

用户如果发现自己提出的问题有问题，还可以点击中止按钮，服务端接收到这个请求后会停下来，等待下一轮的请求。

![](https://cdn.paicoding.com/paicoding/177ee93a75343f9add20f24d12f695cd.png)

#### 消息处理

第一步，建立连接：当一个前端用户连接上来时，我会生成一个唯一的会话 ID ，并将这个会话对象存入 ConcurrentHashMap 中。

第二步，当用户通过 WebSocket 发送一个问题时，会触发 handleTextMessage。每当从数据流中收到一小块（可能是一个字或一个词）由 LLM 生成的内容时，我就会立刻通过与该用户关联的 WebSocketSession 对象，将这块内容发送回前端。

```java
// 伪代码
public void handleTextMessage(WebSocketSession session, TextMessage message) {
    String userQuery = message.getPayload();
    
    // 1. 调用 RAG 核心服务，获取 LLM 的响应流
    Flux<String> responseStream = ragService.streamQuery(userQuery);
    
    // 2. 订阅流，并实时推送给前端
    responseStream.subscribe(
        token -> { // 每收到一个 token (一小块文本)
            try {
                session.sendMessage(new TextMessage(token));
            } catch (IOException e) {
                // 处理异常
            }
        },
        error -> { /* 处理错误 */ },
        () -> { /* 流结束时的处理，比如发送一个结束标记 */ }
    );
}
```

前端会监听 WebSocket 的 onmessage 事件，接收并响应事件。

```javascript
const currentAnswer = ref(''); // 用一个响应式变量来存储当前正在生成的答案

socket.onmessage = (event) => {
  const token = event.data;
  // 将收到的新内容追加到已有答案的末尾
  currentAnswer.value += token;
};
```

老实讲，[派聪明RAG这个项目](https://mp.weixin.qq.com/s/Vo1ggbhIir3L41hOykHDGA)和市面上绝大多数的AI项目有着本质区别，就是我们把简历写法、面试套路都给大家总结出来了，不只是RAG，还有方方面面的技术细节。

这才是为什么派聪明这个项目能帮助这么多球友拿到字节、阿里、腾讯等一线互联网大厂offer真正原因。

你只需要做一件事，就是听劝去学。

就一定没问题。


## ending

一个人可以走得很快，但一群人才能走得更远。[二哥的编程星球](https://mp.weixin.qq.com/s/0mIN1eiXshzLhSPsLzqYTw)已经有 11500 多名球友加入了，如果你也需要一个优质的学习环境，[戳链接 🔗](https://mp.weixin.qq.com/s/t1cjjeMVFVSOzvQQwmaxuA) 加入我们吧。这是一个 [简历精修](https://mp.weixin.qq.com/s/n_J69JKJJlZwb5Cu_KO3vQ) + 编程项目实战（[RAG 派聪明 Java 版](https://mp.weixin.qq.com/s/Vo1ggbhIir3L41hOykHDGA)/[Go 版本](https://mp.weixin.qq.com/s/_lwdTcbyBqGuKBqvIl_USw)、[技术派](https://mp.weixin.qq.com/s/No9F6sKhFnEeQ8H-GyzSCA)、[微服务 PmHub](https://mp.weixin.qq.com/s/2H1CgbXlHApOFZcyobVVEg)）+ [Java 面试指南](https://mp.weixin.qq.com/s/BT5GEsiLvagL5bumwF04YA)的私密圈子，你可以阅读星球专栏、向二哥提问、帮你制定学习计划、和球友一起打卡成长。

最后，把二哥的座右铭送给大家：**没有什么使我停留——除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟**。共勉 💪。
