---
title: 一次显著的MySQL大表分页查询优化，从2.35s到18ms！
shortTitle: 从2.35秒到18毫秒，这次显著的MySQL大表分页查询优化，深得leader称赞
description: 大表分页查询非常慢，怎么办？
author: 鸭血粉丝Tang
category:
  - 微信公众号
head:
---

>[二哥的编程星球](https://mp.weixin.qq.com/s/e5Q4aJCX9xccTzBBGepx4g)已经有 **910 多名** 球友加入了，如果你也需要一个良好的学习氛围，[戳链接](https://mp.weixin.qq.com/s/e5Q4aJCX9xccTzBBGepx4g)加入我们吧！这是一个Java学习指南+编程实战+LeetCode 刷题的私密圈子，你可以向二哥提问、帮你制定学习计划、和球友一起打卡成长，冲冲冲。

## 一、问题复现

在实际的软件系统开发过程中，随着使用的用户群体越来越多，表数据也会随着时间的推移，单表的数据量会越来越大。

以订单表为例，假如每天的订单量在 4 万左右，那么一个月的订单量就是 120 多万，一年就是 1400 多万，随着年数的增加和单日下单量的增加，订单表的数据量会越来越庞大，**订单数据的查询不会像最初那样简单快速，如果查询关键字段没有走索引，会直接影响到用户体验，甚至会影响到服务是否能正常运行**！

下面我以某个电商系统的**客户表**为例，**数据库是 Mysql，数据体量在 100 万以上，详细介绍分页查询下，不同阶段的查询效率情况**（订单表的情况也是类似的，只不过它的数据体量比客户表更大）。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-yicxzdmysqldbfyzxyhcsdms-6a0fd06b-595b-4a70-b79c-008ec25f3ebb.jpg)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-yicxzdmysqldbfyzxyhcsdms-4c405350-b5c2-4a98-b919-1b01f2d97045.jpg)

下面我们一起来测试一下，每次查询客户表时最多返回 100 条数据，不同的起始下，数据库查询性能的差异。

*   **当起点位置在 0 的时候，仅耗时：18 ms**

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-yicxzdmysqldbfyzxyhcsdms-23a24b41-14ca-4371-bdd6-b0ae7288d58d.jpg)

*   **当起点位置在 1000 的时候，仅耗时：23 ms**

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-yicxzdmysqldbfyzxyhcsdms-21f287ff-0c00-47ad-8625-db80b9f89839.jpg)

*   **当起点位置在 10000 的时候，仅耗时：54 ms**

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-yicxzdmysqldbfyzxyhcsdms-a2aae7d6-3def-4430-bd2a-23fcd2cbd02a.jpg)

*   **当起点位置在 100000 的时候，仅耗时：268 ms**

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-yicxzdmysqldbfyzxyhcsdms-743791f9-6133-4203-ad67-40f22ff60032.jpg)

*   **当起点位置在 500000 的时候，仅耗时：1.16 s**

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-yicxzdmysqldbfyzxyhcsdms-7dc4ce81-5052-4cfc-822e-cfb00fee9de7.jpg)

*   **当起点位置在 1000000 的时候，仅耗时：2.35 s**

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-yicxzdmysqldbfyzxyhcsdms-2d5c5c66-c30d-4a4a-b025-0ca4d9d4fb76.jpg)

可以非常清晰的看出，随着起点位置越大，分页查询效率成倍的下降，当起点位置在 1000000 以上的时候，对于百万级数据体量的单表，查询耗时基本上以秒为单位。

而事实上，**一般查询耗时超过 1 秒的 SQL 都被称为慢 SQL**，有的公司运维组要求的可能更加严格，比如小编我所在的公司，如果 SQL 的执行耗时超过 0.2s，也被称为慢 SQL，**必须在限定的时间内尽快优化，不然可能会影响服务的正常运行和用户体验**。

对于千万级的单表数据查询，小编我刚刚也使用了一下分页查询，**起点位置在 10000000，也截图给大家看看，查询耗时结果：39 秒**！

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-yicxzdmysqldbfyzxyhcsdms-4d690fe6-78b4-44a5-979e-1e483ad62ac4.jpg)

没有接触过这么大数据体量的同学，可能多少对这种查询结果会感到吃惊，事实上，这还只是数据库层面的耗时，还没有算后端服务的处理链路时间，以及返回给前端的数据渲染时间，以百万级的单表查询为例，如果数据库查询耗时 1 秒，再经过后端的数据封装处理，前端的数据渲染处理，以及网络传输时间，没有异常的情况下，差不多在 3～4 秒之间，可能有些同学对这个请求时长数值还不太敏感。

据互联网软件用户体验报告，当平均请求耗时在1秒之内，用户体验是最佳的，此时的软件也是用户留存度最高的；2 秒之内，还勉强过的去，用户能接受；当超过 3 秒，体验会稍差；超过 5 秒，基本上会卸载当前软件。

有的公司为了提升用户体验，会严格控制请求时长，当请求时长超过 3 秒，自动放弃请求，从而倒逼技术优化调整 SQL 语句查询逻辑，甚至调整后端整体架构，比如引入缓存中间件 redis，搜索引擎 elasticSearch 等等。

继续回到我们本文所需要探讨的问题，**当单表数据量到达百万级的时候，查询效率急剧下降，如何优化提升呢**？

## 二、解决方案

> 下面我们一起来看看具体的解决办法。

#### 2.1、方案一：查询的时候，只返回主键 ID

我们继续回到上文给大家介绍的客户表查询，将`select *`改成`select id`，简化返回的字段，我们再来观察一下查询耗时。

*   **当起点位置在 100000 的时候，仅耗时：73 ms**

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-yicxzdmysqldbfyzxyhcsdms-0db3dbe4-8333-41d3-860e-00d5a9bdcb26.jpg)

*   **当起点位置在 500000 的时候，仅耗时：274 ms**

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-yicxzdmysqldbfyzxyhcsdms-408e85b8-3ee6-4135-a470-baf01f7c41b0.jpg)

*   **当起点位置在 1000000 的时候，仅耗时：471 ms**

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-yicxzdmysqldbfyzxyhcsdms-88755ad9-ec59-44ae-8f4b-8dcfb06abb7c.jpg)

可以很清晰的看到，**通过简化返回的字段，可以很显著的成倍提升查询效率**。

实际的操作思路就是先通过分页查询满足条件的主键 ID，然后通过主键 ID 查询部分数据，可以显著提升查询效果。

```
-- 先分页查询满足条件的主键ID
select id from bizuser order by id limit 100000,10;

-- 再通过分页查询返回的ID，批量查询数据
select * from bizuser where id in (1,2,3,4,.....);
```

#### 2.2、方案二：查询的时候，通过主键 ID 过滤

这种方案有一个要求就是主键ID，**必须是数字类型，实践的思路就是取上一次查询结果的 ID 最大值，作为过滤条件，而且排序字段必须是主键 ID，不然分页排序顺序会错乱**。

*   **查询 100000～1000100 区间段的数据，仅耗时：18 ms**

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-yicxzdmysqldbfyzxyhcsdms-6442c1c1-65ac-4227-a68d-fb1f7e07210a.jpg)

*   **查询 500000～5000100 区间段的数据，仅耗时：18 ms**

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-yicxzdmysqldbfyzxyhcsdms-458734b4-95b9-4a42-bcf6-cb0d6cf8bdf7.jpg)

*   **查询 1000000～1000100 区间段的数据，仅耗时：18 ms**

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-yicxzdmysqldbfyzxyhcsdms-150548d9-a12d-4207-91bc-2855b76c2152.jpg)

可以很清晰的看到，带上主键 ID 作为过滤条件，查询性能非常的稳定，基本上在`20 ms`内可以返回。

**这种方案还是非常可行的，如果当前业务对排序要求不多，可以采用这种方案，性能也非常杠**！

**但是如果当前业务对排序有要求，比如通过客户最后修改时间、客户最后下单时间、客户最后下单金额等字段来排序，那么上面介绍的【方案一】，比【方案二】查询效率更高**！

#### 2.3、方案三：采用 elasticSearch 作为搜索引擎

当数据量越来越大的时候，尤其是出现分库分表的数据库，以上通过主键 ID 进行过滤查询，效果可能会不尽人意，例如订单数据的查询，**这个时候比较好的解决办法就是将订单数据存储到 elasticSearch 中**，通过 elasticSearch 实现快速分页和搜索，效果提升也是非常明显。

关于 elasticSearch 的玩法，以后有机会再给大家介绍。

## 三、小结

不知道大家有没有发现，**上文中介绍的表主键 ID 都是数值类型的，之所以采用数字类型作为主键，是因为数字类型的字段能很好的进行排序**。

但如果当前表的主键 ID 是字符串类型，比如 uuid 这种，就没办法实现这种排序特性，而且搜索性能也非常差，因此不建议大家采用 uuid 作为主键ID，具体的数值类型主键 ID 的生成方案有很多种，比如自增、雪花算法等等，都能很好的满足我们的需求。


* * *


没有什么使我停留——除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟。

- [先不管那么多，offer接了再说](https://mp.weixin.qq.com/s/9f_sOLiRwDS3pzC-mJ9jLQ)
- [假如我是核酸系统架构师](https://mp.weixin.qq.com/s/24rup4Jkch7ELdtI_l-yZg)
- [一套KTV管理系统，估价3万还是30万？](https://mp.weixin.qq.com/s/zYLEUmbfmiKeFk03e1TxbA)
- [撸一个多线程永动任务](https://mp.weixin.qq.com/s/6z06U97fmrkKB-J1umFTVQ)
- [本次秋招最差面试体验给到华为！](https://mp.weixin.qq.com/s/wfp8LBPPxHE_CM4d3wARQw)
- [给offer的公司不问技术细节？](https://mp.weixin.qq.com/s/QYFB2NHhyZSBfdgSUcZU5g)
- [入职一个月，就想跑路了？](https://mp.weixin.qq.com/s/SfEUk-4hE6ezUk2Lu6cd2g)
- [3 个令你耳目一新的练手项目](https://mp.weixin.qq.com/s/CdIin5I7VvfaSk4z9J0FwQ)










![](https://img-blog.csdnimg.cn/img_convert/61f1d83899ac533c2b892a3e39f09fdc.png)
