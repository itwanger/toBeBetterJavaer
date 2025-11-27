---
title: 消息队列面试题之RocketMQ篇，23道RocketMQ八股文（1.1万字45张手绘图），面渣逆袭必看👍
shortTitle: 面渣逆袭-RocketMQ
description: 下载次数超 1 万次，1.1 万字 45 张手绘图，详解 23 道 RocketMQ 面试高频题（让天下没有难背的八股），面渣背会这些 RocketMQ 八股文，这次吊打面试官，我觉得稳了（手动 dog）。
author: 三分恶
date: 2025-09-24
category:
  - 面渣逆袭
tag:
  - 面渣逆袭
head:
  - - meta
    - name: keywords
      content: RocketMQ面试题,RocketMQ,面试题,八股文
---

![面渣逆袭RocketMQ篇封面图](https://cdn.tobebetterjavaer.com/stutymore/rocketmq-mianzhanixi-rocketmq1.jpg)

## 前言

1.1 万字 45 张手绘图，详解 23 道 RocketMQ 面试高频题（让天下没有难背的八股），面渣背会这些 RocketMQ 八股文，这次吊打面试官，我觉得稳了（手动 dog）。整理：沉默王二，戳[转载链接](https://mp.weixin.qq.com/s/N6wq52pBGh8xkS-5uRcO2g)，作者：三分恶，戳[原文链接](https://mp.weixin.qq.com/s/IvBt3tB_IWZgPjKv5WGS4A)。

亮白版本更适合拿出来打印，这也是很多学生党喜欢的方式，打印出来背诵的效率会更高。

![面渣逆袭RocketMQ篇.pdf第二版](https://cdn.tobebetterjavaer.com/stutymore/rocketmq-20250427104843.png)

2025 年 11 月 02 日开始着手第二版更新。

- 对于高频题，会标注在《[Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)》中出现的位置，哪家公司，原题是什么，并且会加🌟，目录一目了然；如果你想节省时间的话，可以优先背诵这些题目，尽快做到知彼知己，百战不殆。
- 区分八股精华回答版本和原理底层解释，让大家知其然知其所以然，同时又能做到面试时的高效回答。
- 结合项目（[Spring Boot+React 前后端分离 web 项目技术派](https://javabetter.cn/zhishixingqiu/paicoding.html)、[微服务pmhub](https://javabetter.cn/zhishixingqiu/pmhub.html)、[RAG 项目派聪明AI 知识库](https://javabetter.cn/zhishixingqiu/paismart.html)）来组织语言，让面试官最大程度感受到你的诚意，而不是机械化的背诵。
- 修复第一版中出现的问题，包括球友们的私信反馈，网站留言区的评论，以及 [GitHub 仓库](https://github.com/itwanger/toBeBetterJavaer/issues)中的 issue，让这份面试指南更加完善。
- 增加[二哥编程星球](https://javabetter.cn/zhishixingqiu/)的球友们拿到的一些 offer，对面渣逆袭的感谢，以及对简历修改的一些认可，以此来激励大家，给大家更多信心。
- 优化排版，增加手绘图，重新组织答案，使其更加口语化，从而更贴近面试官的预期。

![面渣逆袭已经提交 1457 次 GitHub 记录](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250427100320.png)

由于 PDF 没办法自我更新，所以需要最新版的小伙伴，可以微信搜【**沉默王二**】，或者扫描/长按识别下面的二维码，关注二哥的公众号，回复【**222**】即可拉取最新版本。

<div style="text-align: center; margin: 20px 0;">
    <img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png" alt="微信扫码或者长按识别，或者微信搜索“沉默王二”" style="max-width: 100%; height: auto;  border-radius: 10px;" />
</div>

当然了，请允许我的一点点私心，那就是星球的 PDF 版本会比公众号早一个月时间，毕竟星球用户都付费过了，我有必要让他们先享受到一点点福利。相信大家也都能理解，毕竟在线版是免费的，CDN、服务器、域名、OSS 等等都是需要成本的。

更别说我付出的时间和精力了，大家觉得有帮助还请给个口碑，让你身边的同事、同学都能受益到。

![回复 222](https://cdn.tobebetterjavaer.com/stutymore/collection-20250512160410.png)

我把二哥的 Java 进阶之路、JVM 进阶之路、并发编程进阶之路，以及所有面渣逆袭的版本都放进来了，涵盖 Java基础、Java集合、Java并发、JVM、Spring、MyBatis、计算机网络、操作系统、MySQL、Redis、RocketMQ、分布式、微服务、设计模式、Linux 等 16 个大的主题，共有 40 多万字，2000+张手绘图，可以说是诚意满满。

展示一下暗黑版本的 PDF 吧，排版清晰，字体优雅，更加适合夜服，晚上看会更舒服一点。

![面渣逆袭MySQL篇.pdf暗黑版](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250427105032.png)



## 基础

### 1.为什么要使用消息队列呢？

我认为消息队列的核心价值主要体现在四个方面。首先是解耦，这是最重要的。

![三分恶面渣逆袭：消息队列解耦](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-dd332b3f-d5e5-41bc-813a-9f612e582255.jpg)

比如在[派聪明 RAG 项目](https://javabetter.cn/zhishixingqiu/paismart.html)中，文件上传完成之后，会有很多后续的任务，比如提取元数据、生成全文索引、做 AI 向量化处理。

这些处理不仅数据量大，而且任务本身也比较消耗资源，没有消息队列的话，文件上传服务就得等这些任务都处理完才能返回结果给用户，体验会很差。

![派聪明：消息队列配置](https://cdn.tobebetterjavaer.com/paicoding/3e546d9fd7c4e11f7c88aaf1f4a4dce7.png)

于是我们引入了 Kafka 来做消息队列，文件上传服务只需要把文件处理任务发送到消息队列里就可以结束了。其他服务各自去消费这条消息，独立处理自己的业务逻辑。这样即使某个服务宕机了，也不会影响文件上传的核心流程，系统的容错能力就大大提升了。

再比如书在 [PmHub](https://javabetter.cn/zhishixingqiu/pmhub.html) 中，任务审批就用了 RocketMQ 来做解耦。

![PmHub 的面试系列教程](https://cdn.tobebetterjavaer.com/stutymore/rocketmq-20240808102425.png)

其次是异步处理，系统可以将那些耗时的任务放在消息队列中异步处理，从而快速响应用户的请求。比如说，用户下单后，系统可以先返回一个下单成功的消息，然后将订单信息放入消息队列中，后台系统再去处理订单信息。

![三分恶面渣逆袭：消息队列异步](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-40d8f782-08cf-48c4-98b2-cb125d287e93.jpg)

再有就是削峰填谷，这一点在高并发场景下特别重要。比如秒杀活动，瞬间可能来了几十万个请求。如果直接打到数据库，系统肯定会崩溃。但通过消息队列，所有请求先进队列，后端消费者按照自己的处理能力逐个消费，即使暂时处理不过来，消息也能安全地存储在队列里。这样系统就不会被突发流量打倒。

![三分恶面渣逆袭：消息队列削峰](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-f028cb0c-b1a3-47ef-b290-f7d6f46512fb.jpg)

除此之外，消息队列还支持持久化存储，支持消息重试和事务机制。这样即使消费者在处理消息时出现异常，消息也不会丢失，可以重新投递处理，最终保证业务逻辑一定会被正确执行。

#### 如何用RocketMQ做削峰填谷的？

我的理解是：用户的所有请求不直接打到后端服务，而是先发送到 RocketMQ 的消息队列里。RocketMQ 作为一个高吞吐量的中间件，能够快速接收这些请求。然后消费者端根据自己的处理能力，按照一定的速度从队列里拉取消息进行处理。这样就形成了一个缓冲区，能够吸收掉突发的流量。

就拿秒杀场景来举例吧。首先，用户的秒杀请求不是直接去扣减库存，而是先发一条消息到 RocketMQ。这个操作很快，因为只是把消息丢到队列里，不涉及任何业务逻辑处理。然后在消费端，我们启动一个消费者线程，这些消费者以一个相对稳定的速度去消费消息，一条一条地处理秒杀逻辑，比如检查库存、扣库存、生成订单等。

```java
// 生产者端 - 接收秒杀请求
@PostMapping("/seckill")
public Result seckill(Long productId, Long userId) {
    // 直接发送消息到 RocketMQ，快速返回
    Message message = new Message("seckill_topic", 
        JSON.toJSONString(new SeckillRequest(productId, userId)).getBytes());
    
    try {
        SendResult sendResult = rocketMQTemplate.syncSend("seckill_topic", message);
        return Result.success("秒杀请求已提交，请稍候");
    } catch (Exception e) {
        return Result.fail("系统繁忙，请稍后重试");
    }
}

// 消费者端 - 按照自己的能力消费消息
@RocketMQMessageListener(topic = "seckill_topic", 
                         consumerGroup = "seckill_consumer_group")
public class SeckillConsumer implements RocketMQListener<SeckillRequest> {
    
    @Override
    public void onMessage(SeckillRequest request) {
        // 这里按照相对稳定的速度处理秒杀逻辑
        // 消费者能处理多快就处理多快，不会被突发流量冲击
        seckillService.processSeckill(request.getProductId(), request.getUserId());
    }
}
```

这里有一个需要注意的地方，就是消息堆积的问题，如果消费者一直跟不上生产速度，消息会无限堆积，可能最终会导致磁盘满或者消息过期被删除。所以在实际项目中，我们需要监控队列的堆积情况，必要时通过增加消费者或优化消费逻辑来加快处理速度。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动同学 7 Java 后端实习一面的原题：有了解过 MQ 吗？
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 24 面试原题：如何用消息队列做削峰填谷的？
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团面经同学 4 一面面试原题：项目里用 RocketMQ 做削峰，还有什么场景适合消息队列
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动同学 20 测开一面的原题：RocketMQ有什么用，你一般拿来做什么

memo：2025 年 11 月 03 日修改至此，今天有[球友反馈说深信服开奖了](https://javabetter.cn/zhishixingqiu/)，AI 软开能到 30k+，真的已经非常高了，赶超互联网大厂的 SSP。AI 软开岗位，未来几年会非常吃香，大家可以重点关注一下，球友用的就是 [PmHub](https://javabetter.cn/zhishixingqiu/pmhub.html)+RAG 项目。

![球友深信服开奖，AI 软开](https://cdn.tobebetterjavaer.com/stutymore/rocketmq-20251104110022.png)

### 2.为什么要选择 RocketMQ?

首先，在事务支持方面，RocketMQ 做得特别好。比如说在转账场景下，我们要保证"扣款"的本地事务和"发送转账消息"这两个操作要么都成功，要么都失败，不能出现只扣款但没发消息的情况。RocketMQ 的事务消息机制就能很好地解决这个问题。

```java
// RocketMQ 事务消息示例
TransactionSendResult sendResult = rocketMQTemplate.executeAndReplyTransaction(
    "transfer_topic",
    new Message("transfer_topic", 
        JSON.toJSONString(new TransferRequest(fromId, toId, amount)).getBytes()),
    new RocketMQLocalTransactionListener() {
        @Override
        public RocketMQLocalTransactionState executeLocalTransaction(Message msg, Object arg) {
            try {
                // 执行本地事务 - 扣款
                accountService.deductAccount(fromId, amount);
                return RocketMQLocalTransactionState.COMMIT;
            } catch (Exception e) {
                return RocketMQLocalTransactionState.ROLLBACK;
            }
        }
        
        @Override
        public RocketMQLocalTransactionState checkLocalTransaction(Message msg) {
            // 事务回查逻辑
            return accountService.isDeducted(fromId, amount) ? 
                RocketMQLocalTransactionState.COMMIT : 
                RocketMQLocalTransactionState.ROLLBACK;
        }
    }
);
```

其次是对顺序消息的支持。在很多场景下，消息的顺序很重要。比如订单的生命周期，应该是：下单 → 支付 → 发货 → 确认收货。如果消息乱序了，就会出现还没付款就发货的逻辑混乱。

RocketMQ 的顺序消息能够保证同一个 OrderId 的消息，它们能够被发送到同一个队列，然后被同一个消费者按顺序消费。

[PmHub](https://javabetter.cn/zhishixingqiu/pmhub.html) 中的任务审批流程，就是用的 RocketMQ 来保证审批步骤的正确顺序。

![pmhub 用的是 RocketMQ](https://cdn.tobebetterjavaer.com/stutymore/rocketmq-20251104112142.png)

再有就是 RocketMQ 支持 Master-Slave 模式的高可用部署。当 Master 节点宕机时，Slave 可以自动转换为 Master，从而提供更好的容错能力。

![三分恶面渣逆袭：四大消息队列对比](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-c3493e70-67c7-4f0d-bb99-f0fe8074c807.jpg)

如果是日志收集和流式处理场景，Kafka 更合适，因为它天生为大数据场景设计。[派聪明 RAG 项目](https://javabetter.cn/zhishixingqiu/paismart.html)中的文件上传后的向量化、索引构建任务，就是用的 Kafka 来做消息队列。

![派聪明用的 Kafka](https://cdn.tobebetterjavaer.com/stutymore/rocketmq-20251104111840.png)


如果是需要轻量级的消息传递，RabbitMQ 更好，因为它实现了 AMQP 协议，支持丰富的路由和交换机类型。

[技术派项目](https://javabetter.cn/zhishixingqiu/paicoding.html)中的点赞、收藏、评论等功能的异步处理，就是用的 RabbitMQ 来做消息队列。

![技术派用的是 RabbitMQ](https://cdn.tobebetterjavaer.com/stutymore/rocketmq-20251104112016.png)

### 3.RocketMQ 有什么优缺点？

首先是支持事务消息，这是 RocketMQ 最大的亮点。我的理解是，RocketMQ 通过两阶段提交的方式，保证了消息发送和本地事务的原子性。这对于需要保证数据一致性的场景特别重要。比如库存扣减和订单创建，要么两个都成功，要么都回滚，不能出现不一致的状态。

其次是支持顺序消息。对于同一个业务主体（比如同一个订单），RocketMQ 能保证消息的有序性。这个设计特别巧妙，通过 ShardingKey 将消息路由到同一个队列，然后再由同一个消费者线程顺序消费。这解决了很多实际业务的需求。

再有就是高吞吐量和低延迟。RocketMQ 的单机吞吐能达到几十万 TPS。

缺点方面，由于 RocketMQ 的消息去重不是自动的，所以需要消费者端自己实现幂等，否则容易出现重复消费的问题。

```java
// 需要在消费端自己实现幂等
@RocketMQMessageListener(topic = "order_topic", 
                         consumerGroup = "order_consumer_group")
public class OrderConsumer implements RocketMQListener<OrderMessage> {
    
    @Override
    public void onMessage(OrderMessage message) {
        // 需要根据消息的唯一标识检查是否已经处理过
        if (orderService.isProcessed(message.getOrderId())) {
            // 已经处理过，直接返回
            return;
        }
        
        // 处理订单逻辑
        orderService.processOrder(message);
    }
}
```

#### 说说你对 RocketMQ 的理解？

![牧小农：RocketMQ 的作用](https://cdn.tobebetterjavaer.com/stutymore/rocketmq-20240726162210.png)

RocketMQ 是阿里巴巴开源的一款分布式消息中间件，具有高吞吐量、低延迟和高可用性。其主要组件包括生产者、消费者、Broker、Topic 和队列。消息由生产者发送到 Broker，再根据路由规则存储到队列中，消费者从队列中拉取消息进行处理。适用于异步解耦和流量削峰等场景。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的京东同学 4 云实习面试原题：说说你对RocketMQ的理解

memo：2025 年 11 月 4 日修改至此，今天有球友刚好面到了星球嘉宾的公司，三个项目，mydb+[技术派](https://javabetter.cn/zhishixingqiu/paicoding.html)+[派聪明](https://javabetter.cn/zhishixingqiu/paismart.html)，这下也是稳稳拿下了。

![](https://cdn.tobebetterjavaer.com/stutymore/rocketmq-这个要们是二哥的星球成员吧.png)

### 4.消息队列有哪些消息模型？

我认为消息队列的消息模型可以分为两大类：点对点模型和发布-订阅模型。

点对点模型的特点是一条消息只能被一个消费者消费。生产者把消息发送到一个队列里，消费者从这个队列里拉取消息进行处理。一旦消息被某个消费者消费了，这条消息就被删除了，其他消费者是看不到这条消息的。

![三分恶面渣逆袭：点对点模型](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-d94a9bf9-3fed-40a6-8aef-0d0395b6e409.jpg)

发布-订阅模型的特点是一条消息可以被多个订阅者消费。生产者发布消息到一个主题（Topic），所有订阅了这个主题的消费者都会收到这条消息。

![三分恶面渣逆袭：发布-订阅模型](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-692ec6a0-8499-4de2-be17-a577996bdaef.jpg)

这个模型特别适合用来做事件通知。比如说在[技术派项目](https://javabetter.cn/zhishixingqiu/paicoding.html)中，作者发布了一篇内容，可以同时通知所有关注了这个作者的用户，让他们收到更新提醒。系统级的消息通知也是类似的道理。

![技术派：消息通知](https://cdn.tobebetterjavaer.com/stutymore/rocketmq-20251118090719.png)

### 5.那 RocketMQ 的消息模型呢？

RocketMQ 采用的是一个统一的、基于 Topic 和 Group 的消息模型。同一个消费者组内可以算是点对点，不同消费者组之间算是发布-订阅。

![三分恶面渣逆袭：RocketMQ消息的组成](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-4ab7f942-23d7-4462-8e36-e305cc0a045f.jpg)

在 RocketMQ 中，主题（Topic）是消息的逻辑分类。生产者把消息发送到某个 Topic，消费者从某个 Topic 拉取消息。一个 Topic 可以有多个生产者向它发送消息，也可以有多个消费者从它消费消息。

一个 Topic 在物理上被分成了多个队列（Queue）。生产者发送消息时，消息会根据某个 key 被路由到不同的 Queue 中。这个设计的巧妙之处在于，它既保证了单个 Queue 内的消息顺序，又能通过多个 Queue 实现并行处理。

![三分恶面渣逆袭：RocketMQ 的 Topic 和 Queue 关系](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-e470b972-f4ac-4b76-bcde-0df5d4765ca7.jpg)

消费者端，消费者归属于某一个消费者组（Consumer Group）。一个 消费者组内的多个消费者会协同消费同一个主题的消息。RocketMQ 会把主题下的多个队列分配给这个消费者组内的消费者进行消费。

```
场景 1：一个消费者，一个 Topic 有 4 个 Queue

ConsumerGroup: order_consumer_group
    └─ Consumer 1
        ├─ Queue 0
        ├─ Queue 1
        ├─ Queue 2
        └─ Queue 3

一个消费者消费所有 4 个队列。
```

```
场景 2：两个消费者，一个 Topic 有 4 个 Queue

ConsumerGroup: order_consumer_group
    ├─ Consumer 1
    │   ├─ Queue 0
    │   └─ Queue 2
    │
    └─ Consumer 2
        ├─ Queue 1
        └─ Queue 3

两个消费者各消费 2 个队列，实现了负载均衡。
```

```
场景 3：四个消费者，一个 Topic 有 4 个 Queue

ConsumerGroup: order_consumer_group
    ├─ Consumer 1 → Queue 0
    ├─ Consumer 2 → Queue 1
    ├─ Consumer 3 → Queue 2
    └─ Consumer 4 → Queue 3

四个消费者各消费 1 个队列，充分并行。
```

memo：2025 年 11 月 15 日修改至此，今天有球友发喜报说携程开了 SP，非常满意，感谢星球里的项目，他用的是[派聪明RAG](https://javabetter.cn/zhishixingqiu/paismart.html)+mydb 轮子。

![携程狠狠拿下，本科和研究生还有两年 gap](https://cdn.tobebetterjavaer.com/stutymore/2025nian11yue15ri2008-image5708.png)

### 6.消息的消费模式了解吗？

我认为消费模式可以从两个维度来分类：一个是消费的方向，一个是消费的范围。

从消费方向来分的话，有两种模式，一种是 pull 模式，一种是 push 模式。

![二哥的 Java 进阶之路：pull 和 push 的消费模式](https://cdn.tobebetterjavaer.com/stutymore/rocketmq-20251125101659.png)

pull 模式需要消费者主动去消息队列中拉取消息，消费者可以控制拉取的速度、数量，但需要不断地轮询，比较浪费资源。

push 模式则是消息队列主动把消息推送给消费者，消费者只需要注册一个监听器，消息一到达就触发回调进行处理，响应速度快，但可能会出现消息堆积的情况。

从消费范围来分的话，也有两种模式，一种是集群消费，一种是广播消费。

![三分恶面渣逆袭：集群消费和广播消费](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-2c574635-1eaa-4bdd-8aa8-1bdc3f10b274.jpg)

集群消费是指，同一个消费者组中的多个消费者共同消费一个主题中的消息。消息被分散分配给这个消费者组中的各个消费者，每条消息只被这个消费者组中的一个消费者消费。

换句话说，RocketMQ 会把主题下的所有队列均匀地分配给消费者组内的消费者，实现负载均衡。这样也能保证同一条消息只会被消费者组内的一个消费者消费，避免重复消费。

```
Topic: order_topic
    ├─ Queue 0 → [消息1] [消息3] [消息5]
    ├─ Queue 1 → [消息2] [消息4] [消息6]
    ├─ Queue 2 → [消息7] [消息9] [消息11]
    └─ Queue 3 → [消息8] [消息10] [消息12]

ConsumerGroup: order_consumer_group
    ├─ Consumer 1 消费 Queue 0, 1
    ├─ Consumer 2 消费 Queue 2, 3
    
同一条消息只被 Consumer 1 或 Consumer 2 之一消费，不会重复消费。
```

广播消费是指，同一个主题的每条消息都会被消费者组内的每个消费者消费一次。也就是说，消费者组内的每个消费者都会收到主题下的所有消息，从而实现消息的广播效果。

```
Topic: config_update_topic
    └─ [配置更新消息1] [配置更新消息2] [配置更新消息3]

ConsumerGroup: config_consumer_group
    ├─ Consumer 1（服务器1上的应用）
    │   └─ 收到：消息1, 消息2, 消息3（完整的）
    │
    ├─ Consumer 2（服务器2上的应用）
    │   └─ 收到：消息1, 消息2, 消息3（完整的）
    │
    └─ Consumer 3（服务器3上的应用）
        └─ 收到：消息1, 消息2, 消息3（完整的）

三个消费者都收到了所有的消息，各自独立处理。
```

### 7.RocketMQ 的基本架构了解吗？

RocketMQ 的架构由四个核心部分组成：NameServer、Broker、生产者和消费者。

![三分恶面渣逆袭：RocketMQ架构](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-d4c0e036-0f0e-466f-bd4b-7e6ee10daca4.jpg)

我的理解是，NameServer 就是 RocketMQ 的路由中心，负责维护 Topic 和 Broker 之间的路由信息。生产者在发送消息前，消费者在消费消息前，都会先从 NameServer 获取最新的路由信息。

- 每个 Broker 会向 NameServer 注册自己的信息，包括 Broker 的地址、端口、存储的 Topic 和 Queue 等。
- NameServer 会根据 Topic 名称告诉生产者和消费者对应的 Broker 地址。
- Broker 会定期向 NameServer 发送心跳，报告自己的状态。

![帅旋：RocketMQ运行原理](https://cdn.tobebetterjavaer.com/stutymore/rocketmq-20251125103932.png)

Broker 是消息存储中心，它的职责包括：

- 所有生产者发送的消息都会被存储在 Broker 上，以文件的形式持久化到磁盘。
- 消费者从 Broker 拉取消息时，Broker 需要根据消费者的 Offset 找到对应的消息，返回给消费者。
- 如果配置了高可用，Broker Master 会把消息同步到 Broker Slave，实现主从备份。

生产者在发送消息时，会先从 NameServer 获取 Topic 的路由信息，然后根据路由信息把消息发送到对应的 Broker 上。

消费者在消费消息时，也会先从 NameServer 获取 Topic 的路由信息，然后根据路由信息从对应的 Broker 上拉取消息进行处理。

memo：2025 年 11 月 25 日修改至此，今天有[球友反馈说](https://javabetter.cn/zhishixingqiu/)拿到了科大讯飞和华为的 offer，都开奖了，秋招算是告一段落。她特意感谢了[技术派](https://javabetter.cn/zhishixingqiu/paicoding.html)让她找到暑期实习，秋招靠[派聪明 RAG](https://javabetter.cn/zhishixingqiu/paismart.html)和星球的实习搭子稳稳拿下。还有[我改的简历给她的招聘](https://javabetter.cn/zhishixingqiu/jianli.html)加了不少分，线下被夸了无数次。

![球友对星球的认可](https://cdn.tobebetterjavaer.com/stutymore/rocketmq-20251127153851.png)

### 8.能详细介绍一下RocketMQ的NameServer吗？

NameServer 是一个路由中心和服务发现中心。他的第一个职责是存储和维护路由信息。当 Broker 启动时，会向 NameServer 注册自己的信息。

![极客时间：RocketMQ 的整体架构](https://cdn.tobebetterjavaer.com/stutymore/rocketmq-20251127110113.png)

NameServer 把这些信息存储在内存里，形成一个路由表。

![极客时间：broker 注册](https://cdn.tobebetterjavaer.com/stutymore/rocketmq-20251127110749.png)

它的第二个职责是提供路由查询服务。当生产者或消费者需要知道某个主题在哪个 Broker 上时，就向 NameServer 查询。NameServer 会根据主题名称返回对应的 Broker 地址和队列信息。

第三个职责是监控 Broker 的状态。Broker 会定期向 NameServer 发送心跳，报告自己的状态。如果某个 Broker 长时间没有发送心跳，NameServer 会将其标记为不可用，并从路由表中移除。

#### 请说说Broker的作用？

Broker 是一个消息存储服务器，它负责接收生产者的消息，并将其存储起来，然后在消费者拉取时返回给它们。

![RocketMQ 的 broker 存储](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-789379a9-4a0c-4992-9de1-e49283d089a4.jpg)

#### 请说说生产者？

生产者的核心职责是把应用程序的数据转化为消息，发送到 Broker。

![极客时间：生产者](https://cdn.tobebetterjavaer.com/stutymore/rocketmq-20251127112024.png)

RocketMQ 提供了三种方式发送消息：同步、异步和单向。

- **同步发送**：生产者发送消息后会阻塞等待 Broker 的响应。只有收到 Broker 确认消息已存储的响应后，才会返回给应用程序。
- **异步发送**：生产者发送消息后立即返回，不阻塞。Broker 的响应会通过回调函数返回给应用程序。
- **单向发送**：生产者发送消息后直接返回，不等待响应，也不需要回调。这个模式用于一些不关心发送结果的场景。

#### 请说说消费者？

消费者是消息的接收方，它的核心职责就是从 Broker 拉取消息，进行业务处理，然后提交消费位移。

![消费者](https://cdn.tobebetterjavaer.com/stutymore/rocketmq-20251127113326.png)

RocketMQ 同时支持 Pull、Push、Pop 三种消费模型。

Pull 模型是最基础的消费方式。消费者主动向 Broker 发起请求，拉取消息。Push 模型在使用上看起来像是服务端在推送消息，但实际上底层仍然是 Pull 模型。

当消费者很多的时候，消费重平衡会消耗很长的时间，于是 RocketMQ 提供了 Pop 模型。Pop 模型把消费重平衡完全移到了服务端，以减轻消费者的负担。

<MZNXQRcodeBanner />

memo：2025 年 11 月 27 日修改至此，今天有球友反馈说拿到了字节的 offer，SSP offer，还有 8 万签字费，特意感谢了[星球的项目](https://javabetter.cn/zhishixingqiu/)和[面渣逆袭八股](https://javabetter.cn/sidebar/sanfene/nixi.html)。

![球友拿到的字节 offer 非常夸张，恭喜](https://cdn.tobebetterjavaer.com/stutymore/2025nian11yue25ri9826-image3689.png)

## 进阶

### 9.如何保证消息的可用性/可靠性/不丢失呢？

消息可能在哪些阶段丢失呢？可能会在这三个阶段发生丢失：生产阶段、存储阶段、消费阶段。

所以要从这三个阶段考虑：

![消息传递三阶段](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-692a920d-621f-4b36-87f8-edb53e7f5cd9.jpg)

##### 生产

在生产阶段，主要**通过请求确认机制，来保证消息的可靠传递**。

- 1、同步发送的时候，要注意处理响应结果和异常。如果返回响应 OK，表示消息成功发送到了 Broker，如果响应失败，或者发生其它异常，都应该重试。
- 2、异步发送的时候，应该在回调方法里检查，如果发送失败或者异常，都应该进行重试。
- 3、如果发生超时的情况，也可以通过查询日志的 API，来检查是否在 Broker 存储成功。

##### 存储

存储阶段，可以通过**配置可靠性优先的 Broker 参数来避免因为宕机丢消息**，简单说就是可靠性优先的场景都应该使用同步。

- 1、消息只要持久化到 CommitLog（日志文件）中，即使 Broker 宕机，未消费的消息也能重新恢复再消费。
- 2、Broker 的刷盘机制：同步刷盘和异步刷盘，不管哪种刷盘都可以保证消息一定存储在 pagecache 中（内存中），但是同步刷盘更可靠，它是 Producer 发送消息后等数据持久化到磁盘之后再返回响应给 Producer。

![同步刷盘和异步刷盘-图片来源官网](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-61a3b092-1329-4738-bef9-6eb7ae429c26.jpg)

- 3、Broker 通过主从模式来保证高可用，Broker 支持 Master 和 Slave 同步复制、Master 和 Slave 异步复制模式，生产者的消息都是发送给 Master，但是消费既可以从 Master 消费，也可以从 Slave 消费。同步复制模式可以保证即使 Master 宕机，消息肯定在 Slave 中有备份，保证了消息不会丢失。

##### 消费

从 Consumer 角度分析，如何保证消息被成功消费？

- Consumer 保证消息成功消费的关键在于确认的时机，不要在收到消息后就立即发送消费确认，而是应该在执行完所有消费业务逻辑之后，再发送消费确认。因为消息队列维护了消费的位置，逻辑执行失败了，没有确认，再去队列拉取消息，就还是之前的一条。

### 10.如何处理消息重复的问题呢？

RocketMQ 可以保证消息一定投递，且不丢失，但无法保证消息不重复消费。

因此，需要在业务端做好消息的幂等性处理，或者做消息去重。

![三分恶面渣逆袭：幂等和去重](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-05c0538b-abfa-4bb0-973f-6b92555a6e5b.jpg)

幂等性是指一个操作可以执行多次而不会产生副作用，即无论执行多少次，结果都是相同的。可以在业务逻辑中加入检查逻辑，确保同一消息多次消费不会产生副作用。

例如，在支付场景下，消费者消费扣款的消息，对一笔订单执行扣款操作，金额为100元。

如果因网络不稳定等原因导致扣款消息重复投递，消费者重复消费了该扣款消息，但最终的业务结果要保证只扣款一次，金额为100元。如果扣款操作是符合要求的，那么就可以认为整个消费过程实现了消息幂等。

消息去重，是指在消费者消费消息之前，先检查一下是否已经消费过这条消息，如果消费过了，就不再消费。

业务端可以通过一个专门的表来记录已经消费过的消息 ID，每次消费消息之前，先查询一下这个表，如果已经存在，就不再消费。

```java
public void processMessage(String messageId, String message) {
    if (!isMessageProcessed(messageId)) {
        // 处理消息
        markMessageAsProcessed(messageId);
    }
}

private boolean isMessageProcessed(String messageId) {
    // 查询去重表，检查消息ID是否存在
}

private void markMessageAsProcessed(String messageId) {
    // 将消息ID插入去重表
}
```

#### 如何保证消息的幂等性？

![勇哥：消费幂等](https://cdn.tobebetterjavaer.com/stutymore/rocketmq-20240726172003.png)

首先，消息必须携带业务唯一标识，可以通过雪花算法生成全局唯一 ID。

```java
Message msg = new Message(TOPIC /* Topic */,
             TAG /* Tag */,
               ("Hello RocketMQ " + i).getBytes(RemotingHelper.DEFAULT_CHARSET) /* Message body */
             );
message.setKey("ORDERID_100"); // 订单编号
SendResult sendResult = producer.send(message);      
```

其次，在消费者接收到消息后，判断 Redis 中是否存在该业务主键的标志位，若存在标志位，则认为消费成功，否则执行业务逻辑，执行完成后，在缓存中添加标志位。

```java
public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
    try {
        for (MessageExt messageExt : msgs) {
           String bizKey = messageExt.getKeys(); // 唯一业务主键
           //1. 判断是否存在标志
           if(redisTemplate.hasKey(RedisKeyConstants.WAITING_SEND_LOCK + bizKey)) {
         			continue;
       		 }
         	 //2. 执行业务逻辑
           //TODO do business
           //3. 设置标志位
           redisTemplate.opsForValue().set(RedisKeyConstants.WAITING_SEND_LOCK + bizKey, "1", 72, TimeUnit.HOURS);
        }
        return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
    } catch (Exception e) {
        logger.error("consumeMessage error: ", e);
        return ConsumeConcurrentlyStatus.RECONSUME_LATER;
    }
}
```

然后，利用数据库的唯一索引来防止业务的重复插入。

```sql
CREATE TABLE `t_order` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `order_id` varchar(64) NOT NULL COMMENT '订单编号',
  `order_name` varchar(64) NOT NULL COMMENT '订单名称',
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_id` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='订单表';
```

最后，在数据库表中使用版本号，通过乐观锁机制来保证幂等性。每次更新操作时检查版本号是否一致，只有一致时才执行更新并递增版本号。如果版本号不一致，则说明操作已被执行过，拒绝重复操作。

```java
public void updateRecordWithOptimisticLock(int id, String newValue, int expectedVersion) {
    int updatedRows = jdbcTemplate.update(
        "UPDATE records SET value = ?, version = version + 1 WHERE id = ? AND version = ?",
        newValue, id, expectedVersion
    );
    if (updatedRows == 0) {
        throw new OptimisticLockingFailureException("Record has been modified by another transaction");
    }
}
```

或者悲观锁机制，通过数据库的锁机制来保证幂等性。

```java
public void updateRecordWithPessimisticLock(int id) {
    jdbcTemplate.queryForObject("SELECT * FROM records WHERE id = ? FOR UPDATE", id);
    jdbcTemplate.update("UPDATE records SET value = ? WHERE id = ?", "newValue", id);
}
```

#### 雪花算法了解吗？

雪花算法是由 Twitter 开发的一种分布式唯一 ID 生成算法。

![技术派教程：雪花算法](https://cdn.tobebetterjavaer.com/stutymore/rocketmq-20240726174236.png)

雪花算法以 64 bit 来存储组成 ID 的4 个部分：

1. 最高位占1 bit，始终为 0，表示正数。
2. 中位占 41 bit，值为毫秒级时间戳；
3. 中下位占 10 bit，机器 ID（包括数据中心 ID 和机器 ID），可以支持 1024 个节点。
4. 末位占 12 bit，值为当前毫秒内生成的不同的自增序列，值的上限为 4096；

目前雪花算法的实现比较多，可以直接使用 Hutool 工具类库中的 `IdUtil.getSnowflake()` 方法来获取雪花 ID。

```java
long id = IdUtil.getSnowflakeNextId();
```

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的京东同学 4 云实习面试原题：如何处理消息重复消费的问题？如何保证幂等性？雪花算法了解吗？

### 11.怎么处理消息积压？

发生了消息积压，这时候就得想办法赶紧把积压的消息消费完，就得考虑提高消费能力，一般有两种办法：

![消息积压处理](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-5d1ea064-1a37-4746-ad26-a18a1c8c344e.jpg)

- **消费者扩容**：如果当前 Topic 的 Message Queue 的数量大于消费者数量，就可以对消费者进行扩容，增加消费者，来提高消费能力，尽快把积压的消息消费玩。
- **消息迁移 Queue 扩容**：如果当前 Topic 的 Message Queue 的数量小于或者等于消费者数量，这种情况，再扩容消费者就没什么用，就得考虑扩容 Message Queue。可以新建一个临时的 Topic，临时的 Topic 多设置一些 Message Queue，然后先用一些消费者把消费的数据丢到临时的 Topic，因为不用业务处理，只是转发一下消息，还是很快的。接下来用扩容的消费者去消费新的 Topic 里的数据，消费完了之后，恢复原状。

![消息迁移扩容消费](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-69aa8004-45e9-4e41-b628-1d7ed6d94c92.jpg)

### 12.顺序消息如何实现？

RocketMQ 提供了两种级别的顺序消息：全局顺序和局部顺序。

![三分恶面渣逆袭：顺序消息](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-e3de6bb5-b5db-47af-8ae3-73aedd269f32.jpg)

全局顺序是指整个 Topic 的所有消息都严格按照发送顺序消费，这种方式性能比较低，实际项目中用得不多。

![三分恶面渣逆袭：全局顺序消息](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-8e98ac61-ad47-4ed4-aac6-223201f9aae2.jpg)

局部顺序是指特定分区内的消息保证顺序，这是我们常用的方式。

![三分恶面渣逆袭：部分顺序消息](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-14ab3700-8538-473e-bb66-8acfdd6a77a2.jpg)

要保证顺序，关键是要把需要保证顺序的消息发送到同一个 MessageQueue 中。

```java
// 根据订单ID选择队列，保证同一订单的消息在同一队列
producer.send(message, new MessageQueueSelector() {
    @Override
    public MessageQueue select(List<MessageQueue> mqs, Message msg, Object arg) {
        String orderId = (String) arg;
        int index = orderId.hashCode() % mqs.size();
        return mqs.get(index);
    }
}, orderId);
```

每个 MessageQueue 在 Broker 中对应一个 ConsumeQueue，消息按照到达 Broker 的顺序依次写入。

当消费者开始消费某个 MessageQueue 时，会在 Broker 端对该队列加锁，其他消费者就无法同时消费这个队列。这样确保了同一时间只有一个消费者在处理某个队列的消息，从而保证了消费顺序。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的京东面经同学 2  后端面试原题：说说mq原理，怎么保证消息接受顺序？
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的收钱吧面经同学 1 Java 后端一面面试原题：RocketMQ的顺序消息？
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的中小厂面经同学6 广州中厂面试原题：RocketMQ怎么保证消息顺序？

memo：2025 年 8 月 15 日修改至此，今天在[帮球友修改简历时](https://javabetter.cn/zhishixingqiu/jianli.html)，收到这样一个反馈：目前正在高德暑期实习，3 月底找二哥修改过简历，觉得改的非常好。

![高德实习的球友](https://cdn.tobebetterjavaer.com/stutymore/rocketmq-20250924165532.png)

### 13.如何实现消息过滤？

有两种方案：

- 一种是在 Broker 端按照 Consumer 的去重逻辑进行过滤，这样做的好处是避免了无用的消息传输到 Consumer 端，缺点是加重了 Broker 的负担，实现起来相对复杂。
- 另一种是在 Consumer 端过滤，比如按照消息设置的 tag 去重，这样的好处是实现起来简单，缺点是有大量无用的消息到达了 Consumer 端只能丢弃不处理。

一般采用 Cosumer 端过滤，如果希望提高吞吐量，可以采用 Broker 过滤。

对消息的过滤有三种方式：

![消息过滤](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-f2c8bf50-dc51-44c8-9d71-b8a22af199c4.jpg)

- 根据 Tag 过滤：这是最常见的一种，用起来高效简单

```
DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("CID_EXAMPLE");
consumer.subscribe("TOPIC", "TAGA || TAGB || TAGC");
```

- SQL 表达式过滤：SQL 表达式过滤更加灵活

```
DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("please_rename_unique_group_name_4");
// 只有订阅的消息有这个属性a, a >=0 and a <= 3
consumer.subscribe("TopicTest", MessageSelector.bySql("a between 0 and 3");
consumer.registerMessageListener(new MessageListenerConcurrently() {
   @Override
   public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
       return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
   }
});
consumer.start();

```

- Filter Server 方式：最灵活，也是最复杂的一种方式，允许用户自定义函数进行过滤

### 14.延时消息了解吗？

电商的订单超时自动取消，就是一个典型的利用延时消息的例子，用户提交了一个订单，就可以发送一个延时消息，1h 后去检查这个订单的状态，如果还是未付款就取消订单释放库存。

RocketMQ 是支持延时消息的，只需要在生产消息的时候设置消息的延时级别：

```
// 实例化一个生产者来产生延时消息
DefaultMQProducer producer = new DefaultMQProducer("ExampleProducerGroup");
// 启动生产者
producer.start();
int totalMessagesToSend = 100;
for (int i = 0; i < totalMessagesToSend; i++) {
    Message message = new Message("TestTopic", ("Hello scheduled message " + i).getBytes());
    // 设置延时等级3,这个消息将在10s之后发送(现在只支持固定的几个时间,详看delayTimeLevel)
    message.setDelayTimeLevel(3);
    // 发送消息
    producer.send(message);
}
```

但是目前 RocketMQ 支持的延时级别是有限的：

```
private String messageDelayLevel = "1s 5s 10s 30s 1m 2m 3m 4m 5m 6m 7m 8m 9m 10m 20m 30m 1h 2h";
```

#### RocketMQ 怎么实现延时消息的？

简单，八个字：`临时存储`+`定时任务`。

Broker 收到延时消息了，会先发送到主题（SCHEDULE_TOPIC_XXXX）的相应时间段的 Message Queue 中，然后通过一个定时任务轮询这些队列，到期后，把消息投递到目标 Topic 的队列中，然后消费者就可以正常消费这些消息。

![延迟消息处理流程-图片来源见水印](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-e3b68480-8006-4cd6-892a-1c72f8b0fbcb.jpg)

### 15.怎么实现分布式消息事务的？半消息？

半消息：是指暂时还不能被 Consumer 消费的消息，Producer 成功发送到 Broker 端的消息，但是此消息被标记为 “暂不可投递” 状态，只有等 Producer 端执行完本地事务后经过二次确认了之后，Consumer 才能消费此条消息。

依赖半消息，可以实现分布式消息事务，其中的关键在于二次确认以及消息回查：

![RocketMQ实现消息事务](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-76df2fb9-0f3f-496d-88a8-aac79ad1102c.jpg)

- 1、Producer 向 broker 发送半消息
- 2、Producer 端收到响应，消息发送成功，此时消息是半消息，标记为 “不可投递” 状态，Consumer 消费不了。
- 3、Producer 端执行本地事务。
- 4、正常情况本地事务执行完成，Producer 向 Broker 发送 Commit/Rollback，如果是 Commit，Broker 端将半消息标记为正常消息，Consumer 可以消费，如果是 Rollback，Broker 丢弃此消息。
- 5、异常情况，Broker 端迟迟等不到二次确认。在一定时间后，会查询所有的半消息，然后到 Producer 端查询半消息的执行情况。
- 6、Producer 端查询本地事务的状态
- 7、根据事务的状态提交 commit/rollback 到 broker 端。（5，6，7 是消息回查）
- 8、消费者段消费到消息之后，执行本地事务。

### 16.死信队列知道吗？

死信队列用于存储那些无法被正常处理的消息，这些消息被称为死信（Dead Letter）。

![阿里云官方文档：死信队列](https://cdn.tobebetterjavaer.com/stutymore/rocketmq-20240726163831.png)

产生死信的原因是，消费者在处理消息时发生异常，且达到了最大重试次数。当消费失败的原因排查并解决后，可以重发这些死信消息，让消费者重新消费；如果暂时无法处理，为避免到期后死信消息被删除，可以先将死信消息导出并进行保存。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的京东同学 4 云实习面试原题：说说 RocketMQ 的死信队列

### 17.如何保证 RocketMQ 的高可用？

NameServer 因为是无状态，且不相互通信的，所以只要集群部署就可以保证高可用。

![NameServer集群](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-0ce789f4-7a47-4c24-ac08-76f0490298f7.jpg)

RocketMQ 的高可用主要是在体现在 Broker 的读和写的高可用，Broker 的高可用是通过`集群`和`主从`实现的。

![Broker集群、主从示意图](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-76c5eb61-9605-4620-84fb-dc960f01de85.jpg)

Broker 可以配置两种角色：Master 和 Slave，Master 角色的 Broker 支持读和写，Slave 角色的 Broker 只支持读，Master 会向 Slave 同步消息。

也就是说 Producer 只能向 Master 角色的 Broker 写入消息，Cosumer 可以从 Master 和 Slave 角色的 Broker 读取消息。

Consumer 的配置文件中，并不需要设置是从 Master 读还是从 Slave 读，当 Master 不可用或者繁忙的时候， Consumer 的读请求会被自动切换到从 Slave。有了自动切换 Consumer 这种机制，当一个 Master 角色的机器出现故障后，Consumer 仍然可以从 Slave 读取消息，不影响 Consumer 读取消息，这就实现了读的高可用。

如何达到发送端写的高可用性呢？在创建 Topic 的时候，把 Topic 的多个 Message Queue 创建在多个 Broker 组上（相同 Broker 名称，不同 brokerId 机器组成 Broker 组），这样当 Broker 组的 Master 不可用后，其他组 Master 仍然可用， Producer 仍然可以发送消息 RocketMQ 目前还不支持把 Slave 自动转成 Master ，如果机器资源不足，需要把 Slave 转成 Master ，则要手动停止 Slave 色的 Broker ，更改配置文件，用新的配置文件启动 Broker。

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括 Java 基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM 等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

## 原理

### 18.说一下 RocketMQ 的整体工作流程？

简单来说，RocketMQ 是一个分布式消息队列，也就是`消息队列`+`分布式系统`。

作为消息队列，它是`发`\-`存`\-`收`的一个模型，对应的就是 Producer、Broker、Cosumer；作为分布式系统，它要有服务端、客户端、注册中心，对应的就是 Broker、Producer/Consumer、NameServer

所以我们看一下它主要的工作流程：RocketMQ 由 NameServer 注册中心集群、Producer 生产者集群、Consumer 消费者集群和若干 Broker（RocketMQ 进程）组成：

1.  Broker 在启动的时候去向所有的 NameServer 注册，并保持长连接，每 30s 发送一次心跳
2.  Producer 在发送消息的时候从 NameServer 获取 Broker 服务器地址，根据负载均衡算法选择一台服务器来发送消息
3.  Conusmer 消费消息的时候同样从 NameServer 获取 Broker 地址，然后主动拉取消息来消费

![RocketMQ整体工作流程](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-ec571bd4-fa24-4ada-87ab-f761a7dfdf3f.jpg)

### 19.为什么 RocketMQ 不使用 Zookeeper 作为注册中心呢？

Kafka 我们都知道采用 Zookeeper 作为注册中心——当然也开始逐渐去 Zookeeper，RocketMQ 不使用 Zookeeper 其实主要可能从这几方面来考虑：

1.  基于可用性的考虑，根据 CAP 理论，同时最多只能满足两个点，而 Zookeeper 满足的是 CP，也就是说 Zookeeper 并不能保证服务的可用性，Zookeeper 在进行选举的时候，整个选举的时间太长，期间整个集群都处于不可用的状态，而这对于一个注册中心来说肯定是不能接受的，作为服务发现来说就应该是为可用性而设计。
2.  基于性能的考虑，NameServer 本身的实现非常轻量，而且可以通过增加机器的方式水平扩展，增加集群的抗压能力，而 Zookeeper 的写是不可扩展的，Zookeeper 要解决这个问题只能通过划分领域，划分多个 Zookeeper 集群来解决，首先操作起来太复杂，其次这样还是又违反了 CAP 中的 A 的设计，导致服务之间是不连通的。
3.  持久化的机制来带的问题，ZooKeeper 的 ZAB 协议对每一个写请求，会在每个 ZooKeeper 节点上保持写一个事务日志，同时再加上定期的将内存数据镜像（Snapshot）到磁盘来保证数据的一致性和持久性，而对于一个简单的服务发现的场景来说，这其实没有太大的必要，这个实现方案太重了。而且本身存储的数据应该是高度定制化的。
4.  消息发送应该弱依赖注册中心，而 RocketMQ 的设计理念也正是基于此，生产者在第一次发送消息的时候从 NameServer 获取到 Broker 地址后缓存到本地，如果 NameServer 整个集群不可用，短时间内对于生产者和消费者并不会产生太大影响。

### 20.Broker 是怎么保存数据的呢？

RocketMQ 主要的存储文件包括 CommitLog 文件、ConsumeQueue 文件、Indexfile 文件。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-b6d13d4d-c417-43b4-bfe1-12724777888c.jpg)

消息存储的整体的设计：

![消息存储整体设计-来源官网](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-ddbf8773-1d71-4d1a-a186-46f6985b621e.jpg)

- **CommitLog**：消息主体以及元数据的存储主体，存储 Producer 端写入的消息主体内容,消息内容不是定长的。单个文件大小默认 1G, 文件名长度为 20 位，左边补零，剩余为起始偏移量，比如 00000000000000000000 代表了第一个文件，起始偏移量为 0，文件大小为 1G=1073741824；当第一个文件写满了，第二个文件为 00000000001073741824，起始偏移量为 1073741824，以此类推。消息主要是顺序写入日志文件，当文件满了，写入下一个文件。

CommitLog 文件保存于${Rocket_Home}/store/commitlog 目录中，从图中我们可以明显看出来文件名的偏移量，每个文件默认 1G，写满后自动生成一个新的文件。

![CommitLog](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-a76f7365-8a8c-4b91-9505-9d427cf3bde4.jpg)

- **ConsumeQueue**：消息消费队列，引入的目的主要是提高消息消费的性能，由于 RocketMQ 是基于主题 topic 的订阅模式，消息消费是针对主题进行的，如果要遍历 commitlog 文件中根据 topic 检索消息是非常低效的。

Consumer 即可根据 ConsumeQueue 来查找待消费的消息。其中，ConsumeQueue（逻辑消费队列）作为消费消息的索引，保存了指定 Topic 下的队列消息在 CommitLog 中的起始物理偏移量 offset，消息大小 size 和消息 Tag 的 HashCode 值。

ConsumeQueue 文件可以看成是基于 Topic 的 CommitLog 索引文件，故 ConsumeQueue 文件夹的组织方式如下：topic/queue/file 三层组织结构，具体存储路径为：$HOME/store/consumequeue/{topic}/{queueId}/{fileName}。同样 ConsumeQueue 文件采取定长设计，每一个条目共 20 个字节，分别为 8 字节的 CommitLog 物理偏移量、4 字节的消息长度、8 字节 tag hashcode，单个文件由 30W 个条目组成，可以像数组一样随机访问每一个条目，每个 ConsumeQueue 文件大小约 5.72M；

![Comsumer Queue](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-c8b22760-35c2-436b-81ed-be49a107357b.jpg)

- **IndexFile**：IndexFile（索引文件）提供了一种可以通过 key 或时间区间来查询消息的方法。Index 文件的存储位置是： {fileName}，文件名 fileName 是以创建时的时间戳命名的，固定的单个 IndexFile 文件大小约为 400M，一个 IndexFile 可以保存 2000W 个索引，IndexFile 的底层存储设计为在文件系统中实现 HashMap 结构，故 RocketMQ 的索引文件其底层实现为 hash 索引。

![IndexFile文件示意图](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-f06f306b-fd87-48ff-b1cb-e39750d308e7.jpg)

总结一下：RocketMQ 采用的是混合型的存储结构，即为 Broker 单个实例下所有的队列共用一个日志数据文件（即为 CommitLog）来存储。

RocketMQ 的混合型存储结构(多个 Topic 的消息实体内容都存储于一个 CommitLog 中)针对 Producer 和 Consumer 分别采用了数据和索引部分相分离的存储结构，Producer 发送消息至 Broker 端，然后 Broker 端使用同步或者异步的方式对消息刷盘持久化，保存至 CommitLog 中。

只要消息被刷盘持久化至磁盘文件 CommitLog 中，那么 Producer 发送的消息就不会丢失。正因为如此，Consumer 也就肯定有机会去消费这条消息。当无法拉取到消息后，可以等下一次消息拉取，同时服务端也支持长轮询模式，如果一个消息拉取请求未拉取到消息，Broker 允许等待 30s 的时间，只要这段时间内有新消息到达，将直接返回给消费端。

这里，RocketMQ 的具体做法是，使用 Broker 端的后台服务线程—ReputMessageService 不停地分发请求并异步构建 ConsumeQueue（逻辑消费队列）和 IndexFile（索引文件）数据。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-80af9918-2d4b-4b43-b83a-d44bfc0f30bc.jpg)

### 21.说说 RocketMQ 怎么对文件进行读写的？

RocketMQ 对文件的读写巧妙地利用了操作系统的一些高效文件读写方式——`PageCache`、`顺序读写`、`零拷贝`。

- PageCache、顺序读取

在 RocketMQ 中，ConsumeQueue 逻辑消费队列存储的数据较少，并且是顺序读取，在 page cache 机制的预读取作用下，Consume Queue 文件的读性能几乎接近读内存，即使在有消息堆积情况下也不会影响性能。而对于 CommitLog 消息存储的日志数据文件来说，读取消息内容时候会产生较多的随机访问读取，严重影响性能。如果选择合适的系统 IO 调度算法，比如设置调度算法为“Deadline”（此时块存储采用 SSD 的话），随机读的性能也会有所提升。

页缓存（PageCache)是 OS 对文件的缓存，用于加速对文件的读写。一般来说，程序对文件进行顺序读写的速度几乎接近于内存的读写速度，主要原因就是由于 OS 使用 PageCache 机制对读写访问操作进行了性能优化，将一部分的内存用作 PageCache。对于数据的写入，OS 会先写入至 Cache 内，随后通过异步的方式由 pdflush 内核线程将 Cache 内的数据刷盘至物理磁盘上。对于数据的读取，如果一次读取文件时出现未命中 PageCache 的情况，OS 从物理磁盘上访问读取文件的同时，会顺序对其他相邻块的数据文件进行预读取。

- 零拷贝

另外，RocketMQ 主要通过 MappedByteBuffer 对文件进行读写操作。其中，利用了 NIO 中的 FileChannel 模型将磁盘上的物理文件直接映射到用户态的内存地址中（这种 Mmap 的方式减少了传统 IO，将磁盘文件数据在操作系统内核地址空间的缓冲区，和用户应用程序地址空间的缓冲区之间来回进行拷贝的性能开销），将对文件的操作转化为直接对内存地址进行操作，从而极大地提高了文件的读写效率（正因为需要使用内存映射机制，故 RocketMQ 的文件存储都使用定长结构来存储，方便一次将整个文件映射至内存）。

##### 说说什么是零拷贝?

在操作系统中，使用传统的方式，数据需要经历几次拷贝，还要经历用户态/内核态切换。

![传统文件传输示意图-来源《图解操作系统》](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-35fd884c-8d1b-4d04-8f09-23ed2f945b23.jpg)

1.  从磁盘复制数据到内核态内存；
2.  从内核态内存复制到用户态内存；
3.  然后从用户态内存复制到网络驱动的内核态内存；
4.  最后是从网络驱动的内核态内存复制到网卡中进行传输。

所以，可以通过零拷贝的方式，**减少用户态与内核态的上下文切换**和**内存拷贝的次数**，用来提升 I/O 的性能。零拷贝比较常见的实现方式是**mmap**，这种机制在 Java 中是通过 MappedByteBuffer 实现的。

![mmap示意图-来源《图解操作系统》](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-3ebab020-e411-4239-b91e-72147190c7b1.jpg)

### 22.消息刷盘怎么实现的呢？

RocketMQ 提供了两种刷盘策略：同步刷盘和异步刷盘

- 同步刷盘：在消息达到 Broker 的内存之后，必须刷到 commitLog 日志文件中才算成功，然后返回 Producer 数据已经发送成功。
- 异步刷盘：异步刷盘是指消息达到 Broker 内存后就返回 Producer 数据已经发送成功，会唤醒一个线程去将数据持久化到 CommitLog 日志文件中。

**Broker** 在消息的存取时直接操作的是内存（内存映射文件），这可以提供系统的吞吐量，但是无法避免机器掉电时数据丢失，所以需要持久化到磁盘中。

刷盘的最终实现都是使用**NIO**中的 MappedByteBuffer.force() 将映射区的数据写入到磁盘，如果是同步刷盘的话，在**Broker**把消息写到**CommitLog**映射区后，就会等待写入完成。

异步而言，只是唤醒对应的线程，不保证执行的时机，流程如图所示。

![异步刷盘](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-10a2361b-5e23-462f-86bf-1a9bce2342e5.jpg)

### 23.能说下 RocketMQ 的负载均衡是如何实现的？

RocketMQ 中的负载均衡都在 Client 端完成，具体来说的话，主要可以分为 Producer 端发送消息时候的负载均衡和 Consumer 端订阅消息的负载均衡。

##### Producer 的负载均衡

Producer 端在发送消息的时候，会先根据 Topic 找到指定的 TopicPublishInfo，在获取了 TopicPublishInfo 路由信息后，RocketMQ 的客户端在默认方式下 selectOneMessageQueue()方法会从 TopicPublishInfo 中的 messageQueueList 中选择一个队列（MessageQueue）进行发送消息。具这里有一个 sendLatencyFaultEnable 开关变量，如果开启，在随机递增取模的基础上，再过滤掉 not available 的 Broker 代理。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-5f254411-502b-4bd3-89b5-d3157964617b.jpg)

所谓的"latencyFaultTolerance"，是指对之前失败的，按一定的时间做退避。例如，如果上次请求的 latency 超过 550Lms，就退避 3000Lms；超过 1000L，就退避 60000L；如果关闭，采用随机递增取模的方式选择一个队列（MessageQueue）来发送消息，latencyFaultTolerance 机制是实现消息发送高可用的核心关键所在。

##### Consumer 的负载均衡

在 RocketMQ 中，Consumer 端的两种消费模式（Push/Pull）都是基于拉模式来获取消息的，而在 Push 模式只是对 pull 模式的一种封装，其本质实现为消息拉取线程在从服务器拉取到一批消息后，然后提交到消息消费线程池后，又“马不停蹄”的继续向服务器再次尝试拉取消息。如果未拉取到消息，则延迟一下又继续拉取。在两种基于拉模式的消费方式（Push/Pull）中，均需要 Consumer 端知道从 Broker 端的哪一个消息队列中去获取消息。因此，有必要在 Consumer 端来做负载均衡，即 Broker 端中多个 MessageQueue 分配给同一个 ConsumerGroup 中的哪些 Consumer 消费。

1.  Consumer 端的心跳包发送

在 Consumer 启动后，它就会通过定时任务不断地向 RocketMQ 集群中的所有 Broker 实例发送心跳包（其中包含了，消息消费分组名称、订阅关系集合、消息通信模式和客户端 id 的值等信息）。Broker 端在收到 Consumer 的心跳消息后，会将它维护在 ConsumerManager 的本地缓存变量—consumerTable，同时并将封装后的客户端网络通道信息保存在本地缓存变量—channelInfoTable 中，为之后做 Consumer 端的负载均衡提供可以依据的元数据信息。

2.  Consumer 端实现负载均衡的核心类—RebalanceImpl

在 Consumer 实例的启动流程中的启动 MQClientInstance 实例部分，会完成负载均衡服务线程—RebalanceService 的启动（每隔 20s 执行一次）。

通过查看源码可以发现，RebalanceService 线程的 run()方法最终调用的是 RebalanceImpl 类的 rebalanceByTopic()方法，这个方法是实现 Consumer 端负载均衡的核心。

rebalanceByTopic()方法会根据消费者通信类型为“广播模式”还是“集群模式”做不同的逻辑处理。这里主要来看下集群模式下的主要处理流程：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-7cbfd097-5186-47ba-9641-687bc9381d0b.jpg)

(1) 从 rebalanceImpl 实例的本地缓存变量—topicSubscribeInfoTable 中，获取该 Topic 主题下的消息消费队列集合（mqSet）；

(2) 根据 topic 和 consumerGroup 为参数调用 mQClientFactory.findConsumerIdList()方法向 Broker 端发送通信请求，获取该消费组下消费者 Id 列表；

(3) 先对 Topic 下的消息消费队列、消费者 Id 排序，然后用消息队列分配策略算法（默认为：消息队列的平均分配算法），计算出待拉取的消息队列。这里的平均分配算法，类似于分页的算法，将所有 MessageQueue 排好序类似于记录，将所有消费端 Consumer 排好序类似页数，并求出每一页需要包含的平均 size 和每个页面记录的范围 range，最后遍历整个 range 而计算出当前 Consumer 端应该分配到的的 MessageQueue。

![Cosumer分配](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-6d1c69e7-5245-495f-8f8d-b5e48162df6f.jpg)

(4) 然后，调用 updateProcessQueueTableInRebalance()方法，具体的做法是，先将分配到的消息队列集合（mqSet）与 processQueueTable 做一个过滤比对。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-c84236ed-77a6-45e9-b086-4927d72ce21a.jpg)

- 上图中 processQueueTable 标注的红色部分，表示与分配到的消息队列集合 mqSet 互不包含。将这些队列设置 Dropped 属性为 true，然后查看这些队列是否可以移除出 processQueueTable 缓存变量，这里具体执行 removeUnnecessaryMessageQueue()方法，即每隔 1s 查看是否可以获取当前消费处理队列的锁，拿到的话返回 true。如果等待 1s 后，仍然拿不到当前消费处理队列的锁则返回 false。如果返回 true，则从 processQueueTable 缓存变量中移除对应的 Entry；
- 上图中 processQueueTable 的绿色部分，表示与分配到的消息队列集合 mqSet 的交集。判断该 ProcessQueue 是否已经过期了，在 Pull 模式的不用管，如果是 Push 模式的，设置 Dropped 属性为 true，并且调用 removeUnnecessaryMessageQueue()方法，像上面一样尝试移除 Entry；
- 最后，为过滤后的消息队列集合（mqSet）中的每个 MessageQueue 创建一个 ProcessQueue 对象并存入 RebalanceImpl 的 processQueueTable 队列中（其中调用 RebalanceImpl 实例的 computePullFromWhere(MessageQueue mq)方法获取该 MessageQueue 对象的下一个进度消费值 offset，随后填充至接下来要创建的 pullRequest 对象属性中），并创建拉取请求对象—pullRequest 添加到拉取列表—pullRequestList 中，最后执行 dispatchPullRequest()方法，将 Pull 消息的请求对象 PullRequest 依次放入 PullMessageService 服务线程的阻塞队列 pullRequestQueue 中，待该服务线程取出后向 Broker 端发起 Pull 消息的请求。其中，可以重点对比下，RebalancePushImpl 和 RebalancePullImpl 两个实现类的 dispatchPullRequest()方法不同，RebalancePullImpl 类里面的该方法为空。

消息消费队列在同一消费组不同消费者之间的负载均衡，其核心设计理念是在一个消息消费队列在同一时间只允许被同一消费组内的一个消费者消费，一个消息消费者能同时消费多个消息队列。

### 24.RocketMQ 消息长轮询了解吗？

所谓的长轮询，就是 Consumer 拉取消息，如果对应的 Queue 如果没有数据，Broker 不会立即返回，而是把 PullReuqest hold 起来，等待 queue 有了消息后，或者长轮询阻塞时间到了，再重新处理该 queue 上的所有 PullRequest。

![长轮询简单示意图](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mianznxrocketmqessw-5a715dea-8e18-471e-9a74-e97299901658.jpg)

- PullMessageProcessor#processRequest

```
//如果没有拉到数据
case ResponseCode.PULL_NOT_FOUND:
// broker 和 consumer 都允许 suspend，默认开启
if (brokerAllowSuspend && hasSuspendFlag) {
    long pollingTimeMills = suspendTimeoutMillisLong;
    if (!this.brokerController.getBrokerConfig().isLongPollingEnable()) {
        pollingTimeMills = this.brokerController.getBrokerConfig().getShortPollingTimeMills();
    }

    String topic = requestHeader.getTopic();
    long offset = requestHeader.getQueueOffset();
    int queueId = requestHeader.getQueueId();
    //封装一个PullRequest
    PullRequest pullRequest = new PullRequest(request, channel, pollingTimeMills,
            this.brokerController.getMessageStore().now(), offset, subscriptionData, messageFilter);
    //把PullRequest挂起来
    this.brokerController.getPullRequestHoldService().suspendPullRequest(topic, queueId, pullRequest);
    response = null;
    break;
}
```

挂起的请求，有一个服务线程会不停地检查，看 queue 中是否有数据，或者超时。

- PullRequestHoldService#run()

```
@Override
public void run() {
    log.info("{} service started", this.getServiceName());
    while (!this.isStopped()) {
        try {
            if (this.brokerController.getBrokerConfig().isLongPollingEnable()) {
                this.waitForRunning(5 * 1000);
            } else {
                this.waitForRunning(this.brokerController.getBrokerConfig().getShortPollingTimeMills());
            }

            long beginLockTimestamp = this.systemClock.now();
            //检查hold住的请求
            this.checkHoldRequest();
            long costTime = this.systemClock.now() - beginLockTimestamp;
            if (costTime > 5 * 1000) {
                log.info("[NOTIFYME] check hold request cost {} ms.", costTime);
            }
        } catch (Throwable e) {
            log.warn(this.getServiceName() + " service has exception. ", e);
        }
    }

    log.info("{} service end", this.getServiceName());
}
```

> 图文详解 RocketMQ 面试高频题，这次吊打面试官，我觉得稳了（手动 dog）。整理：沉默王二，戳[转载链接](https://mp.weixin.qq.com/s/N6wq52pBGh8xkS-5uRcO2g)，作者：三分恶，戳[原文链接](https://mp.weixin.qq.com/s/IvBt3tB_IWZgPjKv5WGS4A)。

---

_没有什么使我停留——除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟_。

**系列内容**：

- [面渣逆袭 Java SE 篇 👍](https://javabetter.cn/sidebar/sanfene/javase.html)
- [面渣逆袭 Java 集合框架篇 👍](https://javabetter.cn/sidebar/sanfene/javathread.html)
- [面渣逆袭 Java 并发编程篇 👍](https://javabetter.cn/sidebar/sanfene/collection.html)
- [面渣逆袭 JVM 篇 👍](https://javabetter.cn/sidebar/sanfene/jvm.html)
- [面渣逆袭 Spring 篇 👍](https://javabetter.cn/sidebar/sanfene/spring.html)
- [面渣逆袭 Redis 篇 👍](https://javabetter.cn/sidebar/sanfene/redis.html)
- [面渣逆袭 MyBatis 篇 👍](https://javabetter.cn/sidebar/sanfene/mybatis.html)
- [面渣逆袭 MySQL 篇 👍](https://javabetter.cn/sidebar/sanfene/mysql.html)
- [面渣逆袭操作系统篇 👍](https://javabetter.cn/sidebar/sanfene/os.html)
- [面渣逆袭计算机网络篇 👍](https://javabetter.cn/sidebar/sanfene/network.html)
- [面渣逆袭 RocketMQ 篇 👍](https://javabetter.cn/sidebar/sanfene/rocketmq.html)
- [面渣逆袭分布式篇 👍](https://javabetter.cn/sidebar/sanfene/fenbushi.html)
- [面渣逆袭微服务篇 👍](https://javabetter.cn/sidebar/sanfene/weifuwu.html)
- [面渣逆袭设计模式篇 👍](https://javabetter.cn/sidebar/sanfene/shejimoshi.html)
- [面渣逆袭 Linux 篇 👍](https://javabetter.cn/sidebar/sanfene/linux.html)

---

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括 Java 基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM 等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
