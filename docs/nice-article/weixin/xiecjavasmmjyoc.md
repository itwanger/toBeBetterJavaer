---
title: 携程Java三面面经，已OC！！
shortTitle: 携程Java三面面经，已OC！！
description: 携程的面试难度一般，效率比较高，面试体验还是不错的。
author: Guide
category:
  - 微信公众号
head:
---

你好，我是 Guide。今天来分享一位读者携程校招 Java 岗位的面经。

下面是正文。

个人背景：双非本，机械专业转码。

携程在正式面试之前，会有一个性格测试（40分钟）。性格测试之后，大概过一周进行笔试。笔试之后，会邮件通知是否通过并预约第一轮面试时间。

普通 offer 一般只有两面，如果是 sp 或者 ssp 的话，技术面貌似是三面。

携程的面试难度一般，效率比较高，面试体验还是不错的。

## 一面（45min）

主要是问八股，难度较低。

1.  自我介绍；
2.  进程和线程的区别；
3.  并行和并发的区别；
4.  `synchronized` 的作用；
5.  `synchronized` 和 `ReentrantLock` 的区别，如何选择；
6.  `ThreadLocal` 使用过程中可能存在的问题（内存泄露）；
7.  `ThreadLocal` 内存泄露问题是怎么导致的；
8.  项目中是如何创建线程池的，什么不用`Executors` 去创建线程池；
9.  知道的本地缓存，选择 Caffeine 的原因；
10.  Redis 这类缓存和 Caffeine 的区别；
11.  Redis 中常见的数据结构，应用场景；
12.  缓存穿透和缓存雪崩的区别，解决办法；
13.  MySQL 和 Redis 怎么保持数据一致；
14.  一个 SQL 笔试题，join 多表查询（共享屏幕）。

答案：

*   Java 并发常见面试题总结（上）\[1\]、Java 并发常见面试题总结（中）\[2\]、Java 并发常见面试题总结（下）\[3\]
*   Java高性能缓存库- Caffeine - 风之筝\[4\]
*   缓存基础常见面试题总结(付费)\[5\]
*   Redis常见面试题总结(上)\[6\]、Redis常见面试题总结(下)\[7\]
*   SQL常见面试题总结\[8\]

## 二面（50min）

二面主要还是八股。

1.  自我介绍；
2.  使用多线程可能存在的问题；
3.  线程池原理；
4.  聊聊`ThreadLocal` （概念+一些应用举例+常见的内存泄漏问题）；
5.  JVM 内存模型和垃圾回收；
6.  用到过内存分析工具吗；
7.  使用索引能带来什么好处，你项目中是怎么使用的；
8.  索引底层常见的数据结构，MyISAM 引擎和 InnoDB 引擎用的是哪种；
9.  聚簇索引和非聚簇索引；
10.  最左前缀匹配原则；
11.  造成索引失效的常见原因你知道那些，项目中遇到过索引失效问题吗；
12.  如果有一条 SQL 语句执行的很慢，如何进行优化；
13.  项目中是如何使用 ES的；
14.  ES 检索比较快的原因，为什么 MySQL 不行；
15.  讲一下倒排索引；
16.  手写一个生产者消费者队列；
17.  反问。

答案：

*   Java 并发常见面试题总结（上）\[9\]
*   Java 并发常见面试题总结（下）\[10\]
*   Java 内存区域详解\[11\]、JVM 垃圾回收详解\[12\]
*   Java内存分析相关工具\[13\]
*   MySQL索引详解\[14\]
*   MySQL执行计划分析\[15\]
*   Elasticsearch常见面试题总结(付费)\[16\]

## HR面

*   个人的基本信息；
*   对携程的了解；
*   三个词形容自己；
*   手里还有哪些 offer；
*   平时的兴趣爱好；
*   选择工作的理由排序（薪资、加班情况之类的）。

## 英语测评

HR 面之后，还会有一个英语测评，题目比较多，对英语不好的同学不太友好。题型大概是阅读、演讲、听力这些。

不过，也不用担心，应该不太会因为英语测评的表现刷掉你，但英语测评还是可能会对你的面试评价造成影响，能做好还是要尽量做到最好。

### 参考资料

\[1\]

Java 并发常见面试题总结（上）: *https://javaguide.cn/java/concurrent/java-concurrent-questions-01.html*

\[2\]

Java 并发常见面试题总结（中）: *https://javaguide.cn/java/concurrent/java-concurrent-questions-02.html*

\[3\]

Java 并发常见面试题总结（下）: *https://javaguide.cn/java/concurrent/java-concurrent-questions-02.html*

\[4\]

Java高性能缓存库- Caffeine - 风之筝: *https://ghh3809.github.io/2021/05/31/caffeine/*

\[5\]

缓存基础常见面试题总结(付费): *https://javaguide.cn/database/redis/cache-basics.html*

\[6\]

Redis常见面试题总结(上): *https://javaguide.cn/database/redis/redis-questions-01.html*

\[7\]

Redis常见面试题总结(下): *https://javaguide.cn/database/redis/redis-questions-02.html*

\[8\]

SQL常见面试题总结: *https://javaguide.cn/database/sql/sql-questions-01.html*

\[9\]

Java 并发常见面试题总结（上）: *https://javaguide.cn/java/concurrent/java-concurrent-questions-01.html*

\[10\]

Java 并发常见面试题总结（下）: *https://javaguide.cn/java/concurrent/java-concurrent-questions-03.html*

\[11\]

Java 内存区域详解: *https://javaguide.cn/java/jvm/memory-area.html*

\[12\]

JVM 垃圾回收详解: *https://javaguide.cn/java/jvm/jvm-garbage-collection.html*

\[13\]

Java内存分析相关工具: *https://www.cnblogs.com/wenxuehai/p/16600216.html*

\[14\]

MySQL索引详解: *https://javaguide.cn/database/mysql/mysql-index.html*

\[15\]

MySQL执行计划分析: *https://javaguide.cn/database/mysql/mysql-query-execution-plan.html*

\[16\]

Elasticsearch常见面试题总结(付费): *https://javaguide.cn/database/elasticsearch/elasticsearch-questions-01.html*

********··············****  END  ********··············************

👉 欢迎准备 Java 面试以及学习 Java 的同学加入我的[**知识星球**](https://mp.weixin.qq.com/s?__biz=Mzg2OTA0Njk0OA==&mid=2247533364&idx=1&sn=d1164e06e8cdf848f2105f7fb37ee0eb&chksm=cea10cfff9d685e9b32397c8704a2cc7d408e9a0ec3f590ca459e027f6c336011ff6580cafcf&token=766741944&lang=zh_CN&scene=21#wechat_redirect)，干货很多！收费虽然是白菜价，但星球里的内容或许比你参加上万的培训班质量还要高。

👉 [**《Java 面试指北》**](https://mp.weixin.qq.com/s?__biz=Mzg2OTA0Njk0OA==&mid=2247533385&idx=1&sn=105fdab847e4cf93d2603e57461658be&chksm=cea10c82f9d685944dc09010e5354566f8a8a40adce7cdcd3049444f7f83d4d084c0ef072542&token=766741944&lang=zh_CN&scene=21#wechat_redirect)来啦！这是一份教你如何更高效地准备面试的小册，涵盖常见八股文（系统设计、常见框架、分布式、高并发 ......）、优质面经等内容。

**近期文章精选** ：

*   [《JavaGuide 面试突击版》 5.0 最新版下载](https://mp.weixin.qq.com/s?__biz=Mzg2OTA0Njk0OA==&mid=2247529453&idx=1&sn=f1b3245f023aa2b9890071bb9a9c318c&scene=21#wechat_redirect)
*   [写了个工具，CRUD 开发效率直接提升100倍！](https://mp.weixin.qq.com/s?__biz=Mzg2OTA0Njk0OA==&mid=2247533735&idx=1&sn=37aa2e8d74b25cb350e997ecdbd1103b&scene=21#wechat_redirect)
*   [四年经验社招Java后端面试心得！](https://mp.weixin.qq.com/s?__biz=Mzg2OTA0Njk0OA==&mid=2247533660&idx=1&sn=594f1cc1658e82a3b5dd1cb580151625&scene=21#wechat_redirect)
*   [8 个线程池最佳实践和坑！](https://mp.weixin.qq.com/s?__biz=Mzg2OTA0Njk0OA==&mid=2247533504&idx=1&sn=62ccac1126890c101c26bb6f6acff563&scene=21#wechat_redirect)
*   [14.3k star，这是我见过最强的第三方登录工具库！！](https://mp.weixin.qq.com/s?__biz=Mzg2OTA0Njk0OA==&mid=2247533402&idx=1&sn=77c679c1bcc90815c30845297cb55cfb&scene=21#wechat_redirect)
*   [IDEA 版 API 接口神器来了，一键生成文档，贼香！](https://mp.weixin.qq.com/s?__biz=Mzg2OTA0Njk0OA==&mid=2247533588&idx=1&sn=1f9301dde259a687d862f19a638c3dc3&scene=21#wechat_redirect)
*   [美团面试：这个 SQL 语句加了哪些锁？](https://mp.weixin.qq.com/s?__biz=Mzg2OTA0Njk0OA==&mid=2247533410&idx=1&sn=be3d22f9e0962cd5d9dc610afad6417f&scene=21#wechat_redirect)
*   [万字详解，吃透 MongoDB！](https://mp.weixin.qq.com/s?__biz=Mzg2OTA0Njk0OA==&mid=2247533310&idx=1&sn=70c8f333d9e4350e0ad6d8ff9ea4ce3a&scene=21#wechat_redirect)

👉如果本文对你有帮助的话，欢迎 **点赞&在看&分享** ，这对我继续分享&创作优质文章非常重要。非常感谢！

>参考链接：[https://mp.weixin.qq.com/s/ZPBHlB0pSQFKXAM8xpzwbg](https://mp.weixin.qq.com/s/ZPBHlB0pSQFKXAM8xpzwbg)，出处：JavaGuide，整理：沉默王二
