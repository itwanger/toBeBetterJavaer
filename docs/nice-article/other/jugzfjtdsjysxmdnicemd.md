---
title: 聚合支付系统的设计与实现 - mdnice 墨滴
shortTitle: 聚合支付系统的设计与实现 - mdnice 墨滴
description: 支付中心存在的目的支付中心系统对内为各个业务线提供统一的支付、退款等服务，对外对接三方支付或银行服务实现资金的流转。如下图：大部分公司基本都是这样的架构，主要有以下几方面的优点：形成统一支付服务，降低
tags:
  - 优质文章
category:
  - 其他网站
head:
  - - meta
    - name: keywords
      content: 后端,Java
---

> [二哥的编程星球](https://mp.weixin.qq.com/s/CljCSezUgoBXb-T9wbIGww)已经有 **1300 多名** 球友加入了，如果你也需要一个良好的学习氛围，[戳链接](https://mp.weixin.qq.com/s/CljCSezUgoBXb-T9wbIGww)加入我们吧！这是一个编程学习指南+ Java项目实战+ LeetCode刷题的私密圈子，你可以阅读星球专栏、向二哥提问、帮你制定学习计划、和球友一起打卡成长，冲冲冲。


## 支付中心存在的目的

支付中心系统对内为各个业务线提供统一的支付、退款等服务，对外对接三方支付或银行服务实现资金的流转。如下图：

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/other-jugzfjtdsjysxmdnicemd-9c32842a-41fd-4f1a-a123-a92404293f60.jpg)

大部分公司基本都是这样的架构，主要有以下几方面的优点：

1.  形成统一支付服务，降低业务线接入成本及重复研发成本。
2.  更好更快的支持创新业务，为公司业务快速发展提供条件。
3.  更利于构建安全，稳定，可扩展的支付系统。
4.  利于核心支付数据的沉淀和统一利用。

>参考链接：[https://www.mdnice.com/writing/81727aec77394ee2a9c99f029cc212e6](https://www.mdnice.com/writing/81727aec77394ee2a9c99f029cc212e6)，整理：沉默王二

## 支付流程

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/other-jugzfjtdsjysxmdnicemd-e71f752f-0e51-41e4-8cc5-b451c7ba2b92.jpg)

上图展示了用户支付的主要流程，分为三个步骤：

1.  用户在业务订单确认页，唤起收银台页面。
2.  用户在收银台页面选择支付方式，确认支付，显示第三方支付页面，输入密码，进行真实支付行为。
3.  系统处理用户支付结果，并通知给用户及各个相关系统。

下面详细说下这三个步骤：

### 1\. 唤起商户收银台

1.  用户在订单确认页点击“去支付“按钮，调用收银台支付下单接口。
2.  收银台将订单信息缓存并入库，然后将订单标识拼装到收银台URL上返回给订单系统。
3.  订单系统接收到收银台地址跳转到收银台页面。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/other-jugzfjtdsjysxmdnicemd-3f1f54cf-6599-41ee-8785-bef138dec976.png)

 

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/other-jugzfjtdsjysxmdnicemd-7a9d4ac8-605f-4d4c-983e-a995f35a6d12.png)

上图展示了两个业务线（景区业务线，酒店业务线）唤起的收银台页面，大概可以分为三个区域：

页面上部分显示的是支付剩余时间和应付金额；

中间部分是订单信息，根据收银台定义的数据格式，业务线动态传递过来的；

剩余部分展示的是支付渠道，支付渠道也是业务线根据自己的需求在支付后台管理系统配置的，想要哪些支付方式以及它们的顺序都可以自定义。

### 2\. 用户确认支付

1.  用户在收银台页面选择支付方式（支付宝支付，微信支付，银行卡支付等），点击立即支付按钮，
2.  调用支付中心创单接口，支付中心调用三方支付创单接口，同步返回支付信息，支付中心对返回参数进行处理，返回给收银台，
3.  收银台携带支付中心返回的参数，调用三方接口，唤起三方收银台，
4.  用户输入密码，立即支付。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/other-jugzfjtdsjysxmdnicemd-a6680af0-0545-4201-a891-70a97d6f4ce0.png)

 

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/other-jugzfjtdsjysxmdnicemd-16e90ae5-35a4-4c62-8a4a-e00a4abb61a8.png)

### 3\. 支付结果处理

1.  三方系统进行扣款处理，返回收银台结果（目前微信支付返回支付中，支付宝返回支付终态（支付成功或支付失败）），

**以下几个步骤是异步执行的，不分先后。**

2.  收银台拿到三方返回的结果，确认用户已经支付，则分配定时任务轮询查询（注意超时时间）后台支付结果，拿到终态之后跳转到相应页面，
3.  三方系统支付成功后会通知支付中心结果，支付中心做好自身逻辑处理，异步通知订单系统，然后返回三方系统通知结果，
4.  如果长时间未收到三方支付结果的通知，为了防止掉单，支付中心会发起主动查询来获取支付最终结果，以保证支付结果的及时更新。
5.  当然业务线订单系统为了防止支付系统出现异步通知问题，也可以定时轮询支付中心的支付状态，防止掉单。（图中未画）

## 支付中心系统一些问题及解决方案

### 1\. 支付订单超时关闭问题

如果用户长时间没有支付，一般都会有一个超时时间（如上图商户收银台的支付剩余时间），到达这个超时时间支付单会自动关闭。实现此需求有很多方式，比如：

#### 1\. 轮询 DB

定时轮询DB，取出达到超时时间且在支付中的数据，然后执行关闭逻辑。

缺点：1. 存在延迟，取决于定时任务的频率。2. 影响数据库性能。

#### 2\. JDK 延时队列（DelayQueue）和时间轮算法

这两种的算法的实现方式自行搜索。

共同的缺点是 1. 数据易丢失，由于数据存储在内存中，服务重启后数据全部消失。2. 有内存限制，如果数据量过大，会出现OOM异常。

#### 3\. RocketMQ 延时队列

RocketMQ 支持消息延时发送，社区版不支持任意等级的延迟，目前默认支持18个延时等级：

```hljs
1s 5s 10s 30s 1m 2m 3m 4m 5m 6m 7m 8m 9m 10m 20m 30m 1h 2h 
```

比如支付单30分钟过期，在支付单创建成功后发送延迟消息（延时等级为 16），消费者在30分钟后会拉取到该消息然后执行关闭逻辑。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/other-jugzfjtdsjysxmdnicemd-838b1274-4706-49bd-8563-5dac7a871068.jpg)

RocketMQ 延时队列，无论在数据安全性和及时性都有明显的优势，但是目前社区版没有支持任意级别的延迟。

目前我们使用的是 RocketMQ 延时队列实现的订单关闭。

### 2\. 保证支付结果实时性

三方支付系统支付成功后99.9%的情况下都会回调通知我们，但也难免有意外，比如三方延迟回调或者三方系统宕机，为了保证支付结果的实时性，三方支付也要求我们不能完全依赖于回调接口，所以我们需要定时的调用主动查询接口来查询三方的支付结果。这里我们也是使用的 RocketMQ 延时队列实现的：

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/other-jugzfjtdsjysxmdnicemd-427e4d4f-f1ba-4034-9cfe-232578d12820.jpg)

1.  调用三方支付创单成功后，发送<支付主动查询>延时MQ消息。
2.  消费消息，判断支付状态是否到达终态，如果到达终态，则返回处理成功，否则调用三方支付查询接口，如果支付成功则处理成功业务，返回处理成功。
3.  如果客户未支付则判断是否达到最大的重试次数，如果达到最大重试次数则停止<支付主动查询>的重试，否则解析重试规则，发送下一轮的延时消息。

有三个重要参数，这些参数可以放到配置中心或者配置库中，

```java
// 初始延迟级别，对应RocketMQ延时等级，比如3对应的延时时间就是10s
private Integer queryInitLevel = 3;

// 重试次数
private Integer queryCount = 6;

// 重试级别，对应RocketMQ延时等级，5s,10s,30s,1m,10m,20m
private String queryDelayLevels = 2,3,4,5,14,15;
```

支付创单成功后发送延时消息：

```java
public void payQueryTask(String orderNo) {
        PayQueryMessage payQueryMessage = new PayQueryMessage();
        payQueryMessage.setOrderNo(orderNo);

        RetryMessage<PayQueryMessage> retryMessage = new RetryMessage<>();
        retryMessage.setTotalCount(queryCount);
        retryMessage.setDelayLevels(queryDelayLevels);
        retryMessage.setTopic(TopicConst.PAY_QUERY_TOPIC);
        retryMessage.setEventType(RetryEventTypeEnum.PAY_QUERY);
        retryMessage.setEventDesc(RetryEventTypeEnum.PAY_QUERY.getDesc());
        retryMessage.setData(payQueryMessage);

        log.info("{} - 发送消息, retryMessage: {}", LOG_DESC, retryMessage);
        rocketMqProducer.asyncSend(retryMessage.getTopic(), JsonUtil.toJson(retryMessage),
                CodeEnum.codeOf(RocketMQDelayLevelEnum.class, queryInitLevel).orElse(RocketMQDelayLevelEnum.FiveSeconds), LOG_DESC);
}
```

判断的是否继续执行任务：

```java
public void sendDelayRetry(RetryMessage<?> retryMessage) {
        int currentCount;
        retryMessage.setCurrentCount(currentCount = retryMessage.getCurrentCount() + 1);
        // 重试达到最大次数
        if (currentCount > retryMessage.getTotalCount()) {
            log.warn("{} - 达到最大次数-{}, 停止重试! retryMessage: {}", retryMessage.getEventDesc(), retryMessage.getTotalCount(), JsonUtil.toJson(retryMessage));
            return;
        }
        log.info("{} - 发送重试消息-{}/{}, retryMessage: {}", retryMessage.getEventDesc(), retryMessage.getCurrentCount(), retryMessage.getTotalCount(), JsonUtil.toJson(retryMessage));
        int delayLevel = Integer.parseInt(retryMessage.getDelayLevels().split(",")[retryMessage.getCurrentCount() - 1]);
        rocketMqProducer.asyncSend(retryMessage.getTopic(), retryMessage,
                CodeEnum.codeOf(RocketMQDelayLevelEnum.class, delayLevel).orElse(RocketMQDelayLevelEnum.FiveSeconds), retryMessage.getEventDesc()+", 发送重试消息");
    }
```

### 3\. 支付结果通知上游容错

在回调通知上游系统支付结果时，可能会回调失败，比如网络异常或上游系统发生短时故障，如果发生这种情况我们单靠简单的重试是无法完全解决问题的。为了尽可能的通知成功，我们需要针对没有通知成功的数据，每隔一段时间通知一次，那这个需求和我们上一个问题差不多，所以可以复用我们的延时重试框架。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/other-jugzfjtdsjysxmdnicemd-2b24479e-6e4f-411a-9bd2-5041489fa2e5.jpg)

流程和`保证支付结果实时`的差不多，不再赘述。

## 支付中心系统中设计模式的应用

### 模板方法

模板方法模式思想：`定义一个操作中的算法的骨架，而将一些步骤延迟到子类中。`模板方法使得子类可以不改变一个算法的结构即可重定义该算法的某些特定步骤。

简单的理解就是定义一个模版方法，然后子类实现模版方法中的抽象方法实现个性化的需求。

就支付而言，无论何种支付产品，都是走的同一个支付流程，那我们就可以定义一个支付流程的模板，然后每种支付产品实现这个模板中特定步骤来实现自己的特定需求。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/other-jugzfjtdsjysxmdnicemd-20806632-6fb5-4428-9b73-6d4df9110c93.jpg)

### 策略

策略模式主要思想：`定义一系列的算法，把它们一个个封装起来，并且使它们可相互替换。`

在支付系统中，支付结果主动查询需要查询不同的渠道，比如支付宝，微信，银联等，每个渠道查询的方式和参数不尽相同，可以将每种渠道查询封装成不同的策略类，然后根据查询条件来调用不同的策略类。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/other-jugzfjtdsjysxmdnicemd-43eda189-64ab-48dd-a5ff-16680c2849ba.jpg)

查询策略有两个策略接口，`callChannel`功能是组装查询参数和查询三方，`execute` 是处理三方返回的结果统一为支付中心状态。（因`callChannel`有其他地方共用所以分开了两个方法）。

Spring 下使用策略模式，在项目启动时，将所有的策略类加载到Map中，然后使用时直接在Map中获取。

```java
@Component
public class PayQueryStrategyContext {

    private final Map<String, PayQueryStrategy> payQueryStrategyMap = Maps.newConcurrentMap();

    public PayQueryStrategyContext(Map<String, PayQueryStrategy> payQueryStrategyMap) {
        this.payQueryStrategyMap.clear();
        payQueryStrategyMap.forEach(this.payQueryStrategyMap::put);
    }

    public PayQueryStrategy getPayQuery(@NotNull String channelCode) {
        return this.payQueryStrategyMap.get(OperationTypeConst.Pay_Query + channelCode);
    }
}
```

---

**没有什么使我停留——除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟**。共勉 💪。

- ✌️：[春节后跳槽，我该如何准备？](https://mp.weixin.qq.com/s/pIuBh2EH5wrsQ3nLg4-H2Q)
- ✌️：[培训班出身，该如何自救？](https://mp.weixin.qq.com/s/xB4SCTae_Tc-BvxpwwD5Dg)
- ✌️：[偷偷盘点一下23届秋招薪资](https://mp.weixin.qq.com/s/QCbt3RemlvJoAWEvtsaleA)
- ✌️：[赔偿还是给足了的](https://mp.weixin.qq.com/s/MLsBUzoR7fjZIWQQzqQuWg)
- ✌️：[2023，按这个价要](https://mp.weixin.qq.com/s/06g2wX97oZradMcKs_QaUQ)
- ✌️：[这个行业好起来了](https://mp.weixin.qq.com/s/HlbP9yjuNuVDbpEZDspkcA)
- ✌️：[刚入职，就想跑路了？](https://mp.weixin.qq.com/s/yns_tld3RTvtvwAYqsZ9zQ)
- ✌️：[字节跳动二进宫](https://mp.weixin.qq.com/s/k9R0B8pkU-Wahk4Vf1cgHQ)
- ✌️：[进了外包，是不是就废了？](https://mp.weixin.qq.com/s/6eMGze7h7kI0GhG-dbxF7Q)
- ✌️：[为什么我建议你考研冲一把？](https://mp.weixin.qq.com/s/zL5KE4phgSGb5p5k5Vp9UA)
- ✌️：[奉劝那些想学好编程的人](https://mp.weixin.qq.com/s/d_f-xtiieb3L5nDjySRO3w)
- ✌️：[目前这情况，，跳槽外企](https://mp.weixin.qq.com/s/DJMuTOH0qlr0ZTS80KD14A)
- ✌️：[工作四年，被动醒悟](https://mp.weixin.qq.com/s/q-o4SBZQ3SH62T0c52aBUw)
- ✌️：[秋招 13 家 offer，手到擒来](https://mp.weixin.qq.com/s/LKkvcSdhMyXAGgtqEak0Zw)


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/other-jugzfjtdsjysxmdnicemd-dd1174d4-d141-4056-94cb-c1b523a69078.png)


>参考链接：[https://www.mdnice.com/writing/81727aec77394ee2a9c99f029cc212e6](https://www.mdnice.com/writing/81727aec77394ee2a9c99f029cc212e6)，整理：沉默王二
