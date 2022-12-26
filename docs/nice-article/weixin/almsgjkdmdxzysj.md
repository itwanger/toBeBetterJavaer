---
title: 阿里面试官：接口的幂等性怎么设计？
shortTitle: 阿里面试官：接口的幂等性怎么设计？
description: 偏高级开发的面试题
author: 狂聊君
category:
  - 微信公众号
head:
---

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-almsgjkdmdxzysj-79c84d70-cae4-4400-8472-fcef61829f71.jpg)



球友们好，最近负责的几个接口，都涉及到了幂等性的操作，抽空总结了一下，这也是面试官比较爱问的问题。

## 一、什么是幂等？

看一下维基百科怎么说的：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-almsgjkdmdxzysj-cfaa3367-206d-44fb-97ac-a32b9c6f2242.jpg)

**幂等性：**多次调用方法或者接口不会改变业务状态，可以保证重复调用的结果和单次调用的结果一致。

## 二、使用幂等的场景

### 1、前端重复提交

用户注册，用户创建商品等操作，前端都会提交一些数据给后台服务，后台需要根据用户提交的数据在数据库中创建记录。如果用户不小心多点了几次，后端收到了好几次提交，这时就会在数据库中重复创建了多条记录。这就是接口没有幂等性带来的 bug。

### 2、接口超时重试

对于给第三方调用的接口，有可能会因为网络原因而调用失败，这时，一般在设计的时候会对接口调用加上失败重试的机制。如果第一次调用已经执行了一半时，发生了网络异常。这时再次调用时就会因为脏数据的存在而出现调用异常。

### 3、消息重复消费

在使用消息中间件来处理消息队列，且手动 ack 确认消息被正常消费时。如果消费者突然断开连接，那么已经执行了一半的消息会重新放回队列。

当消息被其他消费者重新消费时，如果没有幂等性，就会导致消息重复消费时结果异常，如数据库重复数据，数据库数据冲突，资源重复等。

## 三、解决方案

### 1、token 机制实现

通过token 机制实现接口的幂等性,这是一种比较通用性的实现方法。

示意图如下：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-almsgjkdmdxzysj-d8def2b4-1a77-4e7f-9b2e-5110c9ab5078.jpg)

具体流程步骤：

1.  客户端会先发送一个请求去获取 token，服务端会生成一个全局唯一的 ID 作为 token 保存在 redis 中，同时把这个 ID 返回给客户端
2.  客户端第二次调用业务请求的时候必须携带这个 token
3.  服务端会校验这个 token，如果校验成功，则执行业务，并删除 redis 中的 token
4.  如果校验失败，说明 redis 中已经没有对应的 token，则表示重复操作，直接返回指定的结果给客户端

注意：

1.  对 redis 中是否存在 token 以及删除的代码逻辑建议用 Lua 脚本实现，保证原子性
2.  全局唯一 ID 可以用百度的 uid-generator、美团的 Leaf 去生成

### 2、基于 mysql 实现

这种实现方式是利用 mysql 唯一索引的特性。

示意图如下：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-almsgjkdmdxzysj-208d134d-0a90-4b93-8ddc-a872ac41865d.jpg)

具体流程步骤：

1.  建立一张去重表，其中某个字段需要建立唯一索引
2.  客户端去请求服务端，服务端会将这次请求的一些信息插入这张去重表中
3.  因为表中某个字段带有唯一索引，如果插入成功，证明表中没有这次请求的信息，则执行后续的业务逻辑
4.  如果插入失败，则代表已经执行过当前请求，直接返回

### 3、基于 redis 实现

这种实现方式是基于 SETNX 命令实现的

SETNX key value：将 key 的值设为 value ，当且仅当 key 不存在。若给定的 key 已经存在，则 SETNX 不做任何动作。

该命令在设置成功时返回 1，设置失败时返回 0。

示意图如下：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-almsgjkdmdxzysj-96148d2e-33df-4466-b247-611a86d18d6f.jpg)

具体流程步骤：

1.  客户端先请求服务端，会拿到一个能代表这次请求业务的唯一字段
2.  将该字段以 SETNX 的方式存入 redis 中，并根据业务设置相应的超时时间
3.  如果设置成功，证明这是第一次请求，则执行后续的业务逻辑
4.  如果设置失败，则代表已经执行过当前请求，直接返回

## 总结

这几种实现幂等的方式其实都是大同小异的，类似的还有使用状态机、悲观锁、乐观锁的方式来实现，都是比较简单的。

总之，当你去设计一个接口的时候，幂等都是首要考虑的问题，特别是当你负责设计转账、支付这种涉及到 money 的接口，你要格外注意喽！



>参考链接：[https://mp.weixin.qq.com/s?__biz=MzAxNTM4NzAyNg==&mid=2247491859&idx=1&sn=09da5c3f7e28fe6b5958645d16637fed&chksm=9b8671eeacf1f8f8195b748d37c9a41c54b152edc24f71a750502bde0b7425c575975ca61baf&scene=27#wechat_redirect](https://mp.weixin.qq.com/s?__biz=MzAxNTM4NzAyNg==&mid=2247491859&idx=1&sn=09da5c3f7e28fe6b5958645d16637fed&chksm=9b8671eeacf1f8f8195b748d37c9a41c54b152edc24f71a750502bde0b7425c575975ca61baf&scene=27#wechat_redirect)，出处：程序员小富，整理：沉默王二

