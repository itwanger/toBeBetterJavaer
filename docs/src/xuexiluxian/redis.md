---
star: true
title: 2026年最值得收藏的Redis学习路线（建议收藏🔥）
shortTitle: Redis学习路线
category:
  - 学习路线
tag:
  - 学习路线
description: Redis学习资料 | 学习路线 | 注意事项，Redis需要学什么
date: 2026-01-01
head:
  - - meta
    - name: keywords
      content: Redis,学习路线,redis教程,redis面试
---


Redis 不管是在社招/校招面试中，被问到的频率都非常高；在日常开发中，Redis 的使用频率也非常高，几乎是 Java 后端开发必须掌握的技术栈，所以 Redis 也被二哥归纳到了**Java 后端四大件**中。

Redis是一种基于键值对（key-value）的NoSQL数据库。它的数据都存放在内存中，所以读写性能非常出色，同时，它会利用快照和日志的形式将内存的数据持久化到硬盘上，防止数据丢失。由于 Redis 的出色性能，它被应用于企业级开发的多个场景当中，比如说缓存、计数器、排行榜、社交网络、消息队列、分布式锁等等，因此，Redis 的企业开发中占据了重要的位置。

## 第一阶段：入门

入门阶段主要记住 Redis 的命令，熟练使用 Redis 的 5 大数据结构就可以了。


![Redis 的 5 大数据类型](https://cdn.paicoding.com/stutymore/redis-20231211213719.png)

思维导图较大，高清原图可以访问这个帖子查看：

>[https://t.zsxq.com/15KhmDSq4](https://t.zsxq.com/15KhmDSq4)


如果没有 Redis 环境，可以直接访问这个网址[https://try.redis.io/](https://try.redis.io/)，它会给你模拟一个在线的环境可供你尽情使用！

![try.redis.io](http://cdn.paicoding.com/tobebetterjavaer/images/xuexiluxian/redis-5489d827-06c7-4083-8a31-c097919a0a6e.png)

### 视频

**黑马程序员 Redis 入门到实战教程**里包含了比较多实战的内容，比如说优惠券秒杀、分布式锁、消息队列等等内容，有同学说这是 B 站上质量最高的 Redis 课程（dog dog dog），有同学把课件也无私的那个了出来，可戳下面的获取。

> - 视频地址：[https://www.bilibili.com/video/BV1cr4y1671t](https://www.bilibili.com/video/BV1cr4y1671t)
> - 课件网盘地址获取：[https://t.zsxq.com/08rEo9Pdu](https://t.zsxq.com/08rEo9Pdu)

![黑马程序员 Redis 入门到实战教程](http://cdn.paicoding.com/tobebetterjavaer/images/xuexiluxian/redis-42250de0-ee45-4a18-800b-db8a56ae7e9e.png)

### 文档

任何时候，[官方的文档](https://www.redis.net.cn/tutorial/3501.html)都是非常值得去参考和学习的。

![Redis 官方文档](http://cdn.paicoding.com/tobebetterjavaer/images/xuexiluxian/redis-6e42ffac-d6aa-4d4a-8a9b-30997f2ec21c.png)

### 书籍

可以考虑使用《[Redis 入门指南（第 2 版）](https://book.douban.com/subject/26419240/)》作为教程， 并辅以《[Redis 使用手册](https://book.douban.com/subject/34836750/)》作为参考。

![Redis 入门指南](http://cdn.paicoding.com/tobebetterjavaer/images/xuexiluxian/redis-f5b806d5-eb1f-4f0f-a84b-936510bb1378.png)

![Redis 使用手册](http://cdn.paicoding.com/tobebetterjavaer/images/xuexiluxian/redis-8ff0deed-c95f-43e2-80cd-38c3758a5076.png)

## 第二阶段：进阶实战

下面列举一些 Redis 的使用场景：

- 缓存 - 将热点数据放到内存中，设置内存的最大使用量以及过期淘汰策略来保证缓存的命中率。这也是绝大多数小伙伴会写到简历上的一条。
- 计数器 - Redis 这种内存数据库能支持计数器频繁的读写操作。
- 应用限流 - 限制一个网站访问流量。
- 消息队列 - 使用 List 数据类型，它是双向链表。
- 查找表 - 使用 HASH 数据类型。
- 交集运算 - 使用 SET 类型，例如求两个用户的共同好友。
- 排行榜 - 使用 ZSET 数据类型，[技术派](https://paicoding.com/)的首页就有作者排行榜，用的就是该数据类型。
- 分布式 Session - 多个应用服务器的 Session 都存储到 Redis 中来保证 Session 的一致性，这也是简历上常写一个知识点。
- 分布式锁 - 除了可以使用 SETNX 实现分布式锁之外，还可以使用官方提供的 RedLock 分布式锁实现。

### 视频

知识星球的百度网盘里，有球友推荐了一套成熟的 Redis 视频课，包括实战篇。

> 戳这个链接可以查看网盘地址：[https://t.zsxq.com/0brEo9Pdu](https://t.zsxq.com/0brEo9Pdu)

![Redis 视频课](http://cdn.paicoding.com/tobebetterjavaer/images/xuexiluxian/redis-1f55aa01-00af-4237-a7b6-0ce57d0d4ba4.png)

【尚硅谷】Redis 6 入门到精通视频课，一共 47 集，内容涵盖：Redis 常用数据类型和底层结构、Redis 和 Spring Boot 整合、Redis 事务和锁、Redis 持久化、Redis 主从复制和集群等等内容，有网友说这套课程基本上是按照《Redis 开发与运维》这本书来讲的，可以把这本书拿来作为参考资料。这门课由《尚医通》的王泽老师授课，后面在 Java 企业级开发中也会提到。

> - 视频地址：[https://www.bilibili.com/video/BV1Rv41177Af](https://www.bilibili.com/video/BV1Rv41177Af)
> - Redis 开发与运维：[https://book.douban.com/subject/26971561/](https://book.douban.com/subject/26971561/)

可以从 20 讲开始往后看。

![【尚硅谷】Redis 6 入门到精通视频课](http://cdn.paicoding.com/tobebetterjavaer/images/xuexiluxian/redis-83e1614d-2ad0-470b-880a-30e7271b4693.png)

### 书籍

可以阅读《[Redis 实战](http://redisinaction.com/)》一书

![Redis 实战](http://cdn.paicoding.com/tobebetterjavaer/images/xuexiluxian/redis-8cf00119-6403-4353-adbd-657207eab76d.png)

《[Redis 开发与运维](https://book.douban.com/subject/26971561/)》，看标题，就知道，这本书不仅适合开发，还适合运维，涉及的内容有持久化、复制、高可用、内存、哨兵、集群、缓存等。

![Redis 开发与运维](http://cdn.paicoding.com/tobebetterjavaer/images/xuexiluxian/redis-38eda851-7b0e-48fa-a883-f6f6d6cda377.png)

## 第三阶段：理解原理

学习 Redis，有必要深入理解缓存的原理，以及 Redis 作为一种缓存方案在系统应用中的定位，[二哥的编程星球](https://javabetter.cn/zhishixingqiu/)里有高清的思维导图，戳下面的练级可以获取。

>[https://t.zsxq.com/15KhmDSq4](https://t.zsxq.com/15KhmDSq4)

Redis 持久化：

![Redis 持久化](https://cdn.paicoding.com/stutymore/redis-20231211213827.png)

Redis 复制：

![Redis 复制](https://cdn.paicoding.com/stutymore/redis-20231211213855.png)

Redis 哨兵：

![Redis 哨兵](https://cdn.paicoding.com/stutymore/redis-20231211213909.png)

### 书籍

书籍的话推荐[Redis 设计与实现](https://book.douban.com/subject/25900156/)，通过阅读本书，可以快速、有效地了解 Redis 的内部构造以及运作机制，从而学会如何更高效地使用 Redis。

![Redis 设计与实现](http://cdn.paicoding.com/tobebetterjavaer/images/xuexiluxian/redis-29c02c58-f2ee-43f3-82c8-6ebb54895296.png)

这本书讲解得非常透彻，尤其是在 Redis 底层数据结构、RDB 和 AOF 持久化机制，以及哨兵机制和切片集群的介绍上，非常容易理解。

### 付费课程

极客时间上的[Redis 源码剖析与实战](http://gk.link/a/11Xgq) 评分较高，从源码角度理解 Redis 系统设计思路，可以购买。

掘金上的[说透 Redis 7](https://s.juejin.cn/ds/BpVxYpF/)也卖的不错，内容包括核心原理剖析+源码解读+实践应用，全方位吃透 Redis 7。

### 文档

如果源码阅读能力不错的话，可以看看 GitHub 上这份 Redis 3.0 的源码（中文注释版）

>[https://github.com/huangz1990/redis-3.0-annotated](https://github.com/huangz1990/redis-3.0-annotated)

![GitHub Redis 3.0 的源码](http://cdn.paicoding.com/tobebetterjavaer/images/xuexiluxian/redis-4a356dc1-a32e-4dcb-b7f0-4137bc0a6c94.png)

## Redis 学习建议

在学习 Redis 时，最常见的需求有三个方面。

- 日常使用操作：比如常见命令和配置，集群搭建等；
- 关键技术原理：比如 IO 模型、AOF 和 RDB 机制等；
- 在实际使用时的经验教训，比如，Redis 响应变慢了怎么办？Redis 主从库数据不一致怎么办？等等。

一本好的工具书，可以帮助我们快速地了解或查询 Redis 的日常使用命令和操作方法，推荐这份在线版的[Redis 命令参考](http://redisdoc.com/)

面试前，强烈建议大家把「[面渣逆袭 Redis 篇](https://javabetter.cn/sidebar/sanfene/redis.html)」好好刷一遍。

![面渣逆袭 Redis 篇](https://cdn.paicoding.com/tobebetterjavaer/images/nice-article/weixin-tuxbgzdtdl-b98e0491-72f5-468a-a3a9-b55d8c205a14.jpg)

还有球友分享的这份《Redis最全的116道面试题.pdf》

>[https://t.zsxq.com/15ltzRylY](https://t.zsxq.com/15ltzRylY)


![Redis最全的116道面试题.pdf](https://cdn.paicoding.com/stutymore/redis-20231211214004.png)


那除了学习，最重要的，就是实操了，在实战中碰壁，在实战中总结经验教训，进阶打怪。

参考链接：[https://dunwu.github.io/db-tutorial/pages/fe3808/](https://dunwu.github.io/db-tutorial/pages/fe3808/)

----

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.paicoding.com/tobebetterjavaer/images/gongzhonghao.png)

