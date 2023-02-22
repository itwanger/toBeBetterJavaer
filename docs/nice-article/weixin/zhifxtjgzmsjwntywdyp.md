---
title: 支付系统就该这么设计（万能通用），稳的一批！
shortTitle: 支付系统就该这么设计（万能通用），稳的一批！
description: 支付系统到底长什么样，又是怎么运行交互的呢？
category:
  - 微信公众号
---

> 作者：PetterLiu
> 
> 来源：www.cnblogs.com/wintersun/

支付永远是一个公司的核心领域，因为这是一个有交易属性公司的命脉。那么，支付系统到底长什么样，又是怎么运行交互的呢?抛开带有支付牌照的金融公司的支付架构，下述链路和系统组成基本上符合绝大多数支付场景。其实整体可以看成是交易核心+支付核心 两个大系统。交易系统关联了业务场景和底层支付，而支付系统完成了调用支付工具到对账清算等一系列相关操作。下面我们就来一起看下各个系统的核心组成和交互。

## 1\. 支付系统总览

### 核心系统交互

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhifxtjgzmsjwntywdyp-ee5890cb-8ef3-4908-8335-18df948a216d.jpg)

### 业务图谱

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhifxtjgzmsjwntywdyp-aa67689b-2f16-4bde-ab04-6ebef087ed9c.jpg)

## 2\. 核心系统解析

### 交易核心

交易核心把公司的业务系统和底层支付关联起来，让业务系统专注于业务，不比关心底层支付。

#### 交易核心

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhifxtjgzmsjwntywdyp-868070e2-8c52-4c0c-bc18-8f0a46cc6749.jpg)

#### 基础交易类型抽象

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhifxtjgzmsjwntywdyp-4be62336-4cb7-4d00-801d-b507a3f1585f.jpg)

#### 多表聚合 & 订单关联

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhifxtjgzmsjwntywdyp-37966263-2e1d-4e2e-9ca1-137d69a21022.jpg)

### 支付核心

支付核心主要负责将多种支付类型进行抽象，变成 `充值`、`提现`、`退款`、`转账`四种支付形态。同时，还要负责集成多种支付工具，对支付指令进行编排等等。

#### 支付核心总览

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhifxtjgzmsjwntywdyp-b501d78a-f4a0-459b-863b-9bd2147d90a3.jpg)

#### 支付行为编排

其目的，是实现 `插件式开发`、`支付规则可配置`的 灵活开发方式。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhifxtjgzmsjwntywdyp-7f43da1d-56e0-4785-9a97-3b235f2e5e2d.jpg)

#### 异常处理

异常处理包括了 重复支付、部分支付、金额不一致、其他异常等异常场景。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhifxtjgzmsjwntywdyp-0ada08fb-abd5-44d2-a350-47ad2ffe8742.jpg)

### 渠道网关

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhifxtjgzmsjwntywdyp-cbecfc3f-48b7-4882-a6e4-2293a3e51fbc.jpg)

### 资金核算

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhifxtjgzmsjwntywdyp-cb51b886-9dd4-42b1-a3ef-5802f02ed6db.jpg)

## 3\. 服务治理

### 平台统一上下文

通过确定系统边界、业务建模拆分之后，整个支付平台被拆分几十个服务，而如何保障在服务间流转业务信息不被丢失，是我们需要考虑的问题。平台统一上下文的要素信息（唯一业务标识码），在整个支付平台链路中全程传递，被用来解决这个问题。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhifxtjgzmsjwntywdyp-105cfdd6-6a14-4081-bca4-2e7c9f106a90.jpg)

### 数据一致性治理

大型的支付公司，内部都有非常严格和完备的数据一致性方案，比如采用业务侵入性非常大的分布式事务等，以牺牲开发效率来提升数据的稳定，是非常有必要的。而业务公司，如果不采用分布式事务又有哪些应对策略呢？

#### CAS校验

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhifxtjgzmsjwntywdyp-5571b5a7-4658-4a5b-8b9a-f4159ead6fc5.jpg)

#### 幂等 & 异常补偿

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhifxtjgzmsjwntywdyp-1af94494-0dd1-43a9-a9f7-5893f36bbeff.jpg)

#### 对账

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhifxtjgzmsjwntywdyp-18f1b974-88ab-4aca-a267-566316c436bc.jpg)

#### 准实时对账

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhifxtjgzmsjwntywdyp-ade34d95-a5b9-496d-a090-2b2119ca3fad.jpg)

### DB拆分

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhifxtjgzmsjwntywdyp-092ebea5-131c-462f-9fa5-0d36f58586ab.jpg)

### 异步化

支付是整个交易链路的核心环节，那么，怎么兼顾支付系统的稳定性和执行效率呢？是异步化。

#### 消息异步化

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhifxtjgzmsjwntywdyp-1fc9773c-1fbe-4b01-b0a3-3fdbae27bab6.jpg)

#### 外部支付调用异步化

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhifxtjgzmsjwntywdyp-79f239cf-a6dd-4b8b-b907-ab3a88890a79.jpg)

在外部支付中，经常需要服务方与第三方支付交互，获取预支付凭证，如上图所示。

这种同步调用的情况下，由于需要跨外部网络，响应的 RT 会非常长，可能会出现跨秒的情况。由于是同步调用，会阻塞整个支付链路。一旦 RT 很长且 QPS 比较大的情况下，服务会整体 hold 住，甚至会出现拒绝服务的情况。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhifxtjgzmsjwntywdyp-be756b9f-3037-4c84-8c49-2e7d673bc0fa.jpg)

因此，可以拆分获取凭证的操作，通过独立网关渠道前置服务，将获取的方式异步化，从前置网关获取内部凭证，然后由前置网关去异步调用第三方。

#### 异步并行化

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhifxtjgzmsjwntywdyp-a7251c7a-8842-4ae4-8462-bd218cc4337a.jpg)

#### 资金核算异步化

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhifxtjgzmsjwntywdyp-8409e2ae-fb04-49a6-97a3-3d354a34cf0a.jpg)

#### 热点账户账务单独处理

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhifxtjgzmsjwntywdyp-5864d7ce-ccb2-4dc5-843f-f073ed05be25.jpg)

#### 记账事务切分

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhifxtjgzmsjwntywdyp-8ebe2a2b-5f8b-4050-863c-31b3cc36f69c.jpg)

## 4\. 生产实践

### 性能压测

构建压测模型，模拟现实真实场景；压测数据进影子库，正常业务无侵入；单机性能和集权链路都不能忽视；识别系统稳定性和容量配比。。。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhifxtjgzmsjwntywdyp-9ff20432-4769-46da-8447-4decb37686e6.jpg)

### 稳定性治理

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhifxtjgzmsjwntywdyp-9d113566-a0c1-448a-8e8c-c071052dd000.jpg)

### 核心链路分离

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhifxtjgzmsjwntywdyp-ebc24f88-90a1-44c9-a065-ff0528fcd86e.jpg)

### 服务依赖降级

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhifxtjgzmsjwntywdyp-1ce53126-64de-4008-aa9c-e81613bdf5f3.jpg)


  

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhifxtjgzmsjwntywdyp-d60598b6-341b-4757-9ea8-f43f25cc7c57.jpg)

>参考链接：[https://mp.weixin.qq.com/s/e2pWaVaABEEet4k_cplBhw](https://mp.weixin.qq.com/s/e2pWaVaABEEet4k_cplBhw)，出处：我是程序汪，整理：沉默王二
