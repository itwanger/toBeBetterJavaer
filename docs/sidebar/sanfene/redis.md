---
title: Redis面试题，53道Redis八股文（1.9万字97张手绘图），面渣逆袭必看👍
shortTitle: 面渣逆袭-Redis
description: 下载次数超 1 万次，1.9 万字 97 张手绘图，详解 53 道 Redis 面试高频题（让天下没有难背的八股），面渣背会这些 Redis 八股文，这次吊打面试官，我觉得稳了（手动 dog）。
author: 三分恶
category:
  - 面渣逆袭
tag:
  - 面渣逆袭
head:
  - - meta
    - name: keywords
      content: Redis面试题,Redis,八股文,面试题
---

1.9 万字 97 张手绘图，详解 53 道 Redis 面试高频题（让天下没有难背的八股），面渣背会这些 Redis 八股文，这次吊打面试官，我觉得稳了（手动 dog）。整理：沉默王二，戳[转载链接](https://mp.weixin.qq.com/s/19u34NXALB1nOlBCE6Eg-Q)，作者：三分恶，戳[原文链接](https://mp.weixin.qq.com/s/iJtNJYgirRugNBnzxkbB4Q)。

## 基础

### 1.说说什么是 Redis?

![三分恶面渣逆袭：Redis图标](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-96e079f9-49a3-4c55-b0a4-47d043732b62.png)

[Redis](https://javabetter.cn/redis/rumen.html) 是 **Re**mote **Di**ctionary **S**ervice 三个单词中加粗字母的组合，是一种基于键值对（key-value）的 NoSQL 数据库。

但比一般的键值对，比如 [HashMap](https://javabetter.cn/collection/hashmap.html) 强大的多，Redis 中的 value 支持 string（字符串）、hash（哈希）、 list（列表）、set（集合）、zset（有序集合）、Bitmaps（位图）、 [HyperLogLog](https://www.cnblogs.com/54chensongxia/p/13803465.html)（基数估算）、GEO（地理信息定位）等多种数据结构。

而且因为 Redis 的所有数据都存放在内存当中，所以它的读写性能非常出色。

不仅如此，Redis 还可以将内存数据持久化到硬盘上，这样在发生类似断电或者机器故障的时候，内存中的数据并不会“丢失”。

除此之外，Redis 还提供了键过期、发布订阅、事务、流水线、Lua 脚本等附加功能，是互联网技术领域中使用最广泛的缓存中间件。

**Redis 和 MySQL 的区别**

- Redis：数据存储在内存中的 NoSQL 数据库，读写性能非常好，是互联网技术领域中使用最广泛的缓存中间件。
- MySQL：数据存储在硬盘中的关系型数据库，适用于需要事务支持和复杂查询的场景。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的华为一面原题：说下 Redis 和 HashMap 的区别
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动商业化一面的原题：Redis 和 MySQL 的区别

### 2.Redis 可以用来干什么？

![Redis](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-b02e44b3-3299-450f-b767-4a862b5ac8ff.png)

1. 缓存

   这是 Redis 应用最广泛地方，基本所有的 Web 应用都会使用 Redis 作为缓存，来降低数据源压力，提高响应速度。
   ![Redis缓存](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-d44c2397-5994-452f-8b7b-eb85d2b87685.png)

2. 计数器
   Redis 天然支持计数功能，而且计数性能非常好，可以用来记录浏览量、点赞量等等。

3. 排行榜
   Redis 提供了列表和有序集合数据结构，合理地使用这些数据结构可以很方便地构建各种排行榜系统。

4. 社交网络
   赞/踩、粉丝、共同好友/喜好、推送、下拉刷新。

5. 消息队列
   Redis 提供了发布订阅功能和阻塞队列的功能，可以满足一般消息队列功能。

6. 分布式锁
   分布式环境下，利用 Redis 实现分布式锁，也是 Redis 常见的应用。

Redis 的应用一般会结合项目去问，以一个电商项目的用户服务为例：

- Token 存储：用户登录成功之后，使用 Redis 存储 Token
- 登录失败次数计数：使用 Redis 计数，登录失败超过一定次数，锁定账号
- 地址缓存：对省市区数据的缓存
- 分布式锁：分布式环境下登录、注册等操作加分布式锁
- ……

### 3.Redis 有哪些数据结构？

Redis 有五种基本数据结构，这五种数据结构分别是：string（字符串）、hash（哈希）、list（列表）、set（集合）、sorted set（有序集合，也叫 zset）。

![三分恶面渣逆袭：Redis基本数据结构](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-10434dc7-c7a3-4c1a-b484-de3fb37669ee.png)

#### 简单介绍下 string

字符串是最基础的数据结构，key 是一个字符串，不用多说，value 可以是：

- 字符串（简单的字符串、复杂的字符串（例如 JSON、XML））
- 数字 （整数、浮点数）
- 甚至是二进制（图片、音频、视频），但最大不能超过 512MB。

字符串主要有以下几个典型的使用场景：

- 缓存功能
- 计数
- 共享 Session
- 限速

#### 简单介绍下 hash

键值对集合，key 是字符串，value 是一个 Map 集合，比如说 `value = {name: '沉默王二', age: 18}`，name 和 age 属于字段 field，沉默王二 和 18 属于值 value。

哈希主要有以下两个典型应用场景：

- 缓存用户信息
- 缓存对象

来感受一下，用户字符串类型存储用户信息和用哈希类型存储用户信息的区别：

![](https://cdn.tobebetterjavaer.com/stutymore/redis-20240315115713.png)

#### 简单介绍下 list

list 是一个简单的字符串列表，按照插入顺序排序。可以添加一个元素到列表的头部（左边）或者尾部（右边）。

列表主要有以下两个使用场景：

- 消息队列
- 文章列表

#### 简单介绍下 set

集合是字符串的无序集合，集合中的元素是唯一的，不允许重复。和 Java 集合框架中的 Set 有相似之处。

集合主要有以下两个使用场景：

- 标签（tag）
- 共同关注

#### 简单介绍下 sorted set

Zset，有序集合，比 set 多了一个排序属性 score（分值）。

![](https://cdn.tobebetterjavaer.com/stutymore/redis-20240315120652.png)

主要应用场景有：

- 用户点赞统计
- 用户排序

比如[技术派实战项目](https://javabetter.cn/zhishixingqiu/paicoding.html)中，我们就使用 Zset 来实现了用户月度活跃排行榜。

![](https://cdn.tobebetterjavaer.com/stutymore/redis-20240315120856.png)

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动商业化一面的原题：说说 Redis 的 zset，什么是跳表，插入一个节点要构建几层索引
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 9 飞书后端技术一面面试原题：Redis 的数据类型，ZSet 的实现
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小米暑期实习同学 E 一面面试原题：你对Redis了解多少，说说常见的数据结构和应用场景
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 23 QQ 后台技术一面面试原题：Redis 的数据类型
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的快手面经同学 7 Java 后端技术一面面试原题：说一下Redis常用的数据结构

### 4.Redis 为什么快呢？

Redis 的速度⾮常快，单机的 Redis 就可以⽀撑每秒十几万的并发，性能是 MySQL 的⼏⼗倍。速度快的原因主要有⼏点：

①、**基于内存的数据存储**，Redis 将数据存储在内存当中，使得数据的读写操作避开了磁盘 I/O。而内存的访问速度远超硬盘，这是 Redis 读写速度快的根本原因。

②、**单线程模型**，Redis 使用单线程模型来处理客户端的请求，这意味着在任何时刻只有一个命令在执行。这样就避免了线程切换和锁竞争带来的消耗。

③、**IO 多路复⽤**，基于 Linux 的 select/epoll 机制。该机制允许内核中同时存在多个监听套接字和已连接套接字，内核会一直监听这些套接字上的连接请求或者数据请求，一旦有请求到达，就会交给 Redis 处理，就实现了所谓的 Redis 单个线程处理多个 IO 读写的请求。

![Redis使用IO多路复用和自身事件模型](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-e05bca61-4600-495c-b92a-25ac822e034e.png)

④、**高效的数据结构**，Redis 提供了多种高效的数据结构，如字符串（String）、列表（List）、集合（Set）、有序集合（Sorted Set）等，这些数据结构经过了高度优化，能够支持快速的数据操作。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯 Java 后端实习一面原题：Redis 为什么读写性能高？
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小米春招同学 K 一面面试原题：为什么 redis 快，淘汰策略 持久化

### 5.能说一下 I/O 多路复用吗？

引用知乎上一个高赞的回答来解释什么是 I/O 多路复用。假设你是一个老师，让 30 个学生解答一道题目，然后检查学生做的是否正确，你有下面几个选择：

- 第一种选择：按顺序逐个检查，先检查 A，然后是 B，之后是 C、D。。。这中间如果有一个学生卡住，全班都会被耽误。这种模式就好比，你用循环挨个处理 socket，根本不具有并发能力。

- 第二种选择：你创建 30 个分身，每个分身检查一个学生的答案是否正确。 这种类似于为每一个用户创建一个进程或者- 线程处理连接。

- 第三种选择，你站在讲台上等，谁解答完谁举手。这时 C、D 举手，表示他们解答问题完毕，你下去依次检查 C、D 的答案，然后继续回到讲台上等。此时 E、A 又举手，然后去处理 E 和 A。

第一种就是阻塞 IO 模型，第三种就是 I/O 复用模型。

![多路复用模型](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-eb541432-d68a-4dd9-b427-96c4dd607d64.png)

Linux 系统有三种方式实现 IO 多路复用：select、poll 和 epoll。

例如 epoll 方式是将用户 socket 对应的 fd 注册进 epoll，然后 epoll 帮你监听哪些 socket 上有消息到达，这样就避免了大量的无用操作。此时的 socket 应该采用非阻塞模式。

这样，整个过程只在进行 select、poll、epoll 这些调用的时候才会阻塞，收发客户消息是不会阻塞的，整个进程或者线程就被充分利用起来，这就是事件驱动，所谓的 reactor 模式。

### 6. Redis 为什么早期选择单线程？

官方解释：https://redis.io/topics/faq

![官方单线程解释](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-344b8461-98d4-495b-a697-70275b0abad6.png)
官方 FAQ 表示，因为 Redis 是基于内存的操作，CPU 成为 Redis 的瓶颈的情况很少见，Redis 的瓶颈最有可能是内存的大小或者网络限制。

如果想要最大程度利用 CPU，可以在一台机器上启动多个 Redis 实例。

PS：网上有这样的回答，吐槽官方的解释有些敷衍，其实就是历史原因，开发者嫌多线程麻烦，后来这个 CPU 的利用问题就被抛给了使用者。

同时 FAQ 里还提到了， Redis 4.0 之后开始变成多线程，除了主线程外，它也有后台线程在处理一些较为缓慢的操作，例如清理脏数据、无用连接的释放、大 Key 的删除等等。

### 7.Redis6.0 使用多线程是怎么回事?

Redis 不是说用单线程的吗？怎么 6.0 成了多线程的？

Redis6.0 的多线程是用多线程来处理数据的**读写和协议解析**，但是 Redis**执行命令**还是单线程的。

![Redis6.0多线程](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-b7b24e25-d2dc-4457-994f-95bdb3674b8e.png)
这样做的⽬的是因为 Redis 的性能瓶颈在于⽹络 IO ⽽⾮ CPU，使⽤多线程能提升 IO 读写的效率，从⽽整体提⾼ Redis 的性能。

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括 Java 基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM 等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

## 持久化

### 8.Redis 持久化⽅式有哪些？有什么区别？

Redis 支持两种主要的持久化方式：RDB（Redis DataBase）持久化和 AOF（Append Only File）持久化。这两种方式可以单独使用，也可以同时使用。

![三分恶面渣逆袭：Redis持久化的两种方式](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-3bda4a46-adc3-4f0d-a135-b8ae5d4c0d5d.png)

#### 说一下RDB？

RDB 持久化通过创建数据集的快照（snapshot）来工作，在指定的时间间隔内将 Redis 在某一时刻的数据状态保存到磁盘的一个 RDB 文件中。

可通过 save 和 bgsave 命令两个命令来手动触发 RDB 持久化操作：

![三分恶面渣逆袭：save和bgsave](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-ffe56e32-34c5-453d-8859-c2febbe6a038.png)

**①、save 命令**：会同步地将 Redis 的所有数据保存到磁盘上的一个 RDB 文件中。这个操作会阻塞所有客户端请求直到 RDB 文件被完全写入磁盘。

当 Redis 数据集较大时，使用 SAVE 命令会导致 Redis 服务器停止响应客户端的请求。

不推荐在生产环境中使用，除非数据集非常小，或者可以接受服务暂时的不可用状态。

**②、bgsave 命令**：会在后台异步地创建 Redis 的数据快照，并将快照保存到磁盘上的 RDB 文件中。这个命令会立即返回，Redis 服务器可以继续处理客户端请求。

在 BGSAVE 命令执行期间，Redis 会继续响应客户端的请求，对服务的可用性影响较小。快照的创建过程是由一个子进程完成的，主进程不会被阻塞。是在生产环境中执行 RDB 持久化的推荐方式。

以下场景会自动触发 RDB 持久化：

①、在 Redis 配置文件（通常是 redis.conf）中，可以通过`save <seconds> <changes>`指令配置自动触发 RDB 持久化的条件。这个指令可以设置多次，每个设置定义了一个时间间隔（秒）和该时间内发生的变更次数阈值。

```
save 900 1
save 300 10
save 60 10000
```

这意味着：

- 如果至少有 1 个键被修改，900 秒后自动触发一次 RDB 持久化。
- 如果至少有 10 个键被修改，300 秒后自动触发一次 RDB 持久化。
- 如果至少有 10000 个键被修改，60 秒后自动触发一次 RDB 持久化。

满足以上任一条件，RDB 持久化就会被自动触发。

②、当 Redis 服务器通过 SHUTDOWN 命令正常关闭时，如果没有禁用 RDB 持久化，Redis 会自动执行一次 RDB 持久化，以确保数据在下次启动时能够恢复。

③、在 Redis 复制场景中，当一个 Redis 实例被配置为从节点并且与主节点建立连接时，它可能会根据配置接收主节点的 RDB 文件来初始化数据集。这个过程中，主节点会在后台自动触发 RDB 持久化，然后将生成的 RDB 文件发送给从节点。

#### 说一下AOF？

AOF 持久化通过记录每个写操作命令并将其追加到 AOF 文件中来工作，恢复时通过重新执行这些命令来重建数据集。

AOF 的主要作用是解决了数据持久化的实时性，目前已经是 Redis 持久化的主流方式。

AOF 的工作流程操作：命令写入 （append）、文件同步（sync）、文件重写（rewrite）、重启加载 （load）

![三分恶面渣逆袭：AOF工作流程](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-a9fb6202-b1a1-484d-a4fa-fef519090b44.png)

流程如下：

1）当 AOF 持久化功能被启用时，Redis 服务器会将接收到的所有写命令（比如 SET, LPUSH, SADD 等修改数据的命令）追加到 AOF 缓冲区（buffer）的末尾。

2）为了将缓冲区中的命令持久化到磁盘中的 AOF 文件，Redis 提供了几种不同的同步策略：

- always：每次写命令都会同步到 AOF 文件，这提供了最高的数据安全性，但可能因为磁盘 I/O 的延迟而影响性能。
- everysec（默认）：每秒同步一次，这是一种折衷方案，提供了较好的性能和数据安全性。
- no：不主动进行同步，交由操作系统决定何时将缓冲区数据写入磁盘，这种方式性能最好，但在系统崩溃时可能会丢失最近一秒的数据。

3）随着操作的不断执行，AOF 文件会不断增长，为了减小 AOF 文件大小，Redis 可以重写 AOF 文件：

- 重写过程不会解析原始的 AOF 文件，而是将当前内存中的数据库状态转换为一系列写命令，然后保存到一个新的 AOF 文件中。
- AOF 重写操作由 BGREWRITEAOF 命令触发，它会创建一个子进程来执行重写操作，因此不会阻塞主进程。
- 重写过程中，新的写命令会继续追加到旧的 AOF 文件中，同时也会被记录到一个缓冲区中。一旦重写完成，Redis 会将这个缓冲区中的命令追加到新的 AOF 文件中，然后切换到新的 AOF 文件上，以确保数据的完整性。

4）当 Redis 服务器启动时，如果配置为使用 AOF 持久化方式，它会读取 AOF 文件中的所有命令并重新执行它们，以恢复数据库的状态。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小米春招同学 K 一面面试原题：为什么 redis 快，淘汰策略 持久化
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的快手面经同学 7 Java 后端技术一面面试原题：说一下 Redis 的持久化方式

### 9.RDB 和 AOF 各自有什么优缺点？

**RDB | 优点**

1. 只有一个紧凑的二进制文件 `dump.rdb`，非常适合备份、全量复制的场景。
2. **容灾性好**，可以把 RDB 文件拷贝道远程机器或者文件系统张，用于容灾恢复。
3. **恢复速度快**，RDB 恢复数据的速度远远快于 AOF 的方式

**RDB | 缺点**

1. **实时性低**，RDB 是间隔一段时间进行持久化，没法做到实时持久化/秒级持久化。如果在这一间隔事件发生故障，数据会丢失。
2. **存在兼容问题**，Redis 演进过程存在多个格式的 RDB 版本，存在老版本 Redis 无法兼容新版本 RDB 的问题。

**AOF | 优点**

1. **实时性好**，aof 持久化可以配置 `appendfsync` 属性，有 `always`，每进行一次命令操作就记录到 aof 文件中一次。
2. 通过 append 模式写文件，即使中途服务器宕机，可以通过 redis-check-aof 工具解决数据一致性问题。

**AOF | 缺点**

1. AOF 文件比 RDB **文件大**，且 **恢复速度慢**。
2. **数据集大** 的时候，比 RDB **启动效率低**。

### 10.RDB 和 AOF 如何选择？

- 一般来说， 如果想达到足以媲美数据库的 **数据安全性**，应该 **同时使用两种持久化功能**。在这种情况下，当 Redis 重启的时候会优先载入 AOF 文件来恢复原始的数据，因为在通常情况下 AOF 文件保存的数据集要比 RDB 文件保存的数据集要完整。
- 如果 **可以接受数分钟以内的数据丢失**，那么可以 **只使用 RDB 持久化**。
- 有很多用户都只使用 AOF 持久化，但并不推荐这种方式，因为定时生成 RDB 快照（snapshot）非常便于进行数据备份， 并且 RDB 恢复数据集的速度也要比 AOF 恢复的速度要快，除此之外，使用 RDB 还可以避免 AOF 程序的 bug。
- 如果只需要数据在服务器运行的时候存在，也可以不使用任何持久化方式。

### 11.Redis 的数据恢复？

当 Redis 发生了故障，可以从 RDB 或者 AOF 中恢复数据。

恢复的过程也很简单，把 RDB 或者 AOF 文件拷贝到 Redis 的数据目录下，如果使用 AOF 恢复，配置文件开启 AOF，然后启动 redis-server 即可。
![Redis启动加载数据](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-f9aab5e9-a875-4316-9ec9-0c5650afe5c1.png)

**Redis** 启动时加载数据的流程：

1. AOF 持久化开启且存在 AOF 文件时，优先加载 AOF 文件。
2. AOF 关闭或者 AOF 文件不存在时，加载 RDB 文件。
3. 加载 AOF/RDB 文件成功后，Redis 启动成功。
4. AOF/RDB 文件存在错误时，Redis 启动失败并打印错误信息。

### 12.Redis 4.0 的混合持久化了解吗？

重启 Redis 时，我们很少使用 `RDB` 来恢复内存状态，因为会丢失大量数据。我们通常使用 AOF 日志重放，但是重放 AOF 日志性能相对 `RDB` 来说要慢很多，这样在 Redis 实例很大的情况下，启动需要花费很长的时间。

**Redis 4.0** 为了解决这个问题，带来了一个新的持久化选项——**混合持久化**。将 `rdb` 文件的内容和增量的 AOF 日志文件存在一起。这里的 AOF 日志不再是全量的日志，而是 **自持久化开始到持久化结束** 的这段时间发生的增量 AOF 日志，通常这部分 AOF 日志很小：
![混合持久化](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-19c531e5-da95-495a-a4c4-d63a0b8bba95.png)

于是在 Redis 重启的时候，可以先加载 `rdb` 的内容，然后再重放增量 AOF 日志就可以完全替代之前的 AOF 全量文件重放，重启效率因此大幅得到提升。

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括 Java 基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM 等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

## 高可用

Redis 保证高可用主要有三种方式：主从、哨兵、集群。

### 13.主从复制了解吗？

![Redis主从复制简图](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-60497f1e-8afb-44b3-bb7a-d4c29e5ac484.png)

**主从复制**，是指将一台 Redis 服务器的数据，复制到其他的 Redis 服务器。前者称为 **主节点(master)**，后者称为 **从节点(slave)**。且数据的复制是 **单向** 的，只能由主节点到从节点。Redis 主从复制支持 **主从同步** 和 **从从同步** 两种，后者是 Redis 后续版本新增的功能，以减轻主节点的同步负担。

> 主从复制主要的作用?

- **数据冗余：** 主从复制实现了数据的热备份，是持久化之外的一种数据冗余方式。
- **故障恢复：** 当主节点出现问题时，可以由从节点提供服务，实现快速的故障恢复 _(实际上是一种服务的冗余)_。
- **负载均衡：** 在主从复制的基础上，配合读写分离，可以由主节点提供写服务，由从节点提供读服务 _（即写 Redis 数据时应用连接主节点，读 Redis 数据时应用连接从节点）_，分担服务器负载。尤其是在写少读多的场景下，通过多个从节点分担读负载，可以大大提高 Redis 服务器的并发量。
- **高可用基石：** 除了上述作用以外，主从复制还是哨兵和集群能够实施的 **基础**，因此说主从复制是 Redis 高可用的基础。

### 14.Redis 主从有几种常见的拓扑结构？

Redis 的复制拓扑结构可以支持单层或多层复制关系，根据拓扑复杂性可以分为以下三种：一主一从、一主多从、树状主从结构。

1.一主一从结构

一主一从结构是最简单的复制拓扑结构，用于主节点出现宕机时从节点提供故障转移支持。
![一主一从结构](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-5d91a67c-dbff-4a8d-bf9d-1fe7602d5a27.png) 2.一主多从结构

一主多从结构（又称为星形拓扑结构）使得应用端可以利用多个从节点实现读写分离（见图 6-5）。对于读占比较大的场景，可以把读命令发送到从节点来分担主节点压力。
![一主多从结构](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-71074254-699a-480b-bbb0-c68f364a380b.png) 3.树状主从结构

树状主从结构（又称为树状拓扑结构）使得从节点不但可以复制主节点数据，同时可以作为其他从节点的主节点继续向下层复制。通过引入复制中间层，可以有效降低主节点负载和需要传送给从节点的数据量。
![树状主从结构](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-dff14203-5e01-4d1b-a775-10ee444ada54.png)

### 15.Redis 的主从复制原理了解吗？

Redis 主从复制的工作流程大概可以分为如下几步：
![Redis主从复制工作流程](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-21123b1e-68b4-436b-ac84-3365a49a81bd.png)

1.  保存主节点（master）信息
    这一步只是保存主节点信息，保存主节点的 ip 和 port。
2.  主从建立连接
    从节点（slave）发现新的主节点后，会尝试和主节点建立网络连接。
3.  发送 ping 命令
    连接建立成功后从节点发送 ping 请求进行首次通信，主要是检测主从之间网络套接字是否可用、主节点当前是否可接受处理命令。
4.  权限验证
    如果主节点要求密码验证，从节点必须正确的密码才能通过验证。
5.  同步数据集
    主从复制连接正常通信后，主节点会把持有的数据全部发送给从节点。
6.  命令持续复制
    接下来主节点会持续地把写命令发送给从节点，保证主从数据一致性。

### 16.说说主从数据同步的方式？

Redis 在 2.8 及以上版本使用 psync 命令完成主从数据同步，同步过程分为：全量复制和部分复制。

![主从数据同步方式](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-7518f715-6dee-4e70-b972-8aed9879e451.png)

**全量复制**
一般用于初次复制场景，Redis 早期支持的复制功能只有全量复制，它会把主节点全部数据一次性发送给从节点，当数据量较大时，会对主从节点和网络造成很大的开销。

全量复制的完整运行流程如下：
![全量复制](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-aa8d2960-b341-49cc-b04c-201241fd15de.png)

1. 发送 psync 命令进行数据同步，由于是第一次进行复制，从节点没有复制偏移量和主节点的运行 ID，所以发送 psync-1。
2. 主节点根据 psync-1 解析出当前为全量复制，回复+FULLRESYNC 响应。
3. 从节点接收主节点的响应数据保存运行 ID 和偏移量 offset
4. 主节点执行 bgsave 保存 RDB 文件到本地
5. 主节点发送 RDB 文件给从节点，从节点把接收的 RDB 文件保存在本地并直接作为从节点的数据文件
6. 对于从节点开始接收 RDB 快照到接收完成期间，主节点仍然响应读写命令，因此主节点会把这期间写命令数据保存在复制客户端缓冲区内，当从节点加载完 RDB 文件后，主节点再把缓冲区内的数据发送给从节点，保证主从之间数据一致性。
7. 从节点接收完主节点传送来的全部数据后会清空自身旧数据
8. 从节点清空数据后开始加载 RDB 文件
9. 从节点成功加载完 RDB 后，如果当前节点开启了 AOF 持久化功能， 它会立刻做 bgrewriteaof 操作，为了保证全量复制后 AOF 持久化文件立刻可用。

**部分复制**
部分复制主要是 Redis 针对全量复制的过高开销做出的一种优化措施， 使用 psync{runId}{offset}命令实现。当从节点（slave）正在复制主节点 （master）时，如果出现网络闪断或者命令丢失等异常情况时，从节点会向 主节点要求补发丢失的命令数据，如果主节点的复制积压缓冲区内存在这部分数据则直接发送给从节点，这样就可以保持主从节点复制的一致性。
![部分复制](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-87600c72-cc6a-4656-81b2-e71864c97f23.png)

1.  当主从节点之间网络出现中断时，如果超过 repl-timeout 时间，主节点会认为从节点故障并中断复制连接
2.  主从连接中断期间主节点依然响应命令，但因复制连接中断命令无法发送给从节点，不过主节点内部存在的复制积压缓冲区，依然可以保存最近一段时间的写命令数据，默认最大缓存 1MB。
3.  当主从节点网络恢复后，从节点会再次连上主节点
4.  当主从连接恢复后，由于从节点之前保存了自身已复制的偏移量和主节点的运行 ID。因此会把它们当作 psync 参数发送给主节点，要求进行部分复制操作。
5.  主节点接到 psync 命令后首先核对参数 runId 是否与自身一致，如果一 致，说明之前复制的是当前主节点；之后根据参数 offset 在自身复制积压缓冲区查找，如果偏移量之后的数据存在缓冲区中，则对从节点发送+CONTINUE 响应，表示可以进行部分复制。
6.  主节点根据偏移量把复制积压缓冲区里的数据发送给从节点，保证主从复制进入正常状态。

### 17.主从复制存在哪些问题呢？

主从复制虽好，但也存在一些问题：

- 一旦主节点出现故障，需要手动将一个从节点晋升为主节点，同时需要修改应用方的主节点地址，还需要命令其他从节点去复制新的主节点，整个过程都需要人工干预。
- 主节点的写能力受到单机的限制。
- 主节点的存储能力受到单机的限制。

第一个问题是 Redis 的高可用问题，第二、三个问题属于 Redis 的分布式问题。

### 18.Redis Sentinel（哨兵）了解吗？

主从复制存在一个问题，没法完成自动故障转移。所以我们需要一个方案来完成自动故障转移，它就是 Redis Sentinel（哨兵）。

![Redis Sentinel](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-8b1a055c-f077-49ff-9432-c194d4fc3639.png)

Redis Sentinel ，它由两部分组成，哨兵节点和数据节点：

- **哨兵节点：** 哨兵系统由一个或多个哨兵节点组成，哨兵节点是特殊的 Redis 节点，不存储数据，对数据节点进行监控。
- **数据节点：** 主节点和从节点都是数据节点；

在复制的基础上，哨兵实现了 **自动化的故障恢复** 功能，下面是官方对于哨兵功能的描述：

- **监控（Monitoring）：** 哨兵会不断地检查主节点和从节点是否运作正常。
- **自动故障转移（Automatic failover）：** 当 **主节点** 不能正常工作时，哨兵会开始 **自动故障转移操作**，它会将失效主节点的其中一个 **从节点升级为新的主节点**，并让其他从节点改为复制新的主节点。
- **配置提供者（Configuration provider）：** 客户端在初始化时，通过连接哨兵来获得当前 Redis 服务的主节点地址。
- **通知（Notification）：** 哨兵可以将故障转移的结果发送给客户端。

其中，监控和自动故障转移功能，使得哨兵可以及时发现主节点故障并完成转移。而配置提供者和通知功能，则需要在与客户端的交互中才能体现。

### 19.Redis Sentinel（哨兵）实现原理知道吗？

哨兵模式是通过哨兵节点完成对数据节点的监控、下线、故障转移。
![Redis Sentinel工作流程](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-4074d72a-886a-4892-8f55-80112005aad8.png)

- **定时监控**
  ![三个定时任务](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-e7708f8d-ef34-4255-b5d0-cb300c649716.png)Redis Sentinel 通过三个定时监控任务完成对各个节点发现和监控：
  1. 每隔 10 秒，每个 Sentinel 节点会向主节点和从节点发送 info 命令获取最新的拓扑结构
  2. 每隔 2 秒，每个 Sentinel 节点会向 Redis 数据节点的**sentinel**：hello 频道上发送该 Sentinel 节点对于主节点的判断以及当前 Sentinel 节点的信息
  3. 每隔 1 秒，每个 Sentinel 节点会向主节点、从节点、其余 Sentinel 节点发送一条 ping 命令做一次心跳检测，来确认这些节点当前是否可达
- **主观下线和客观下线**
  主观下线就是哨兵节点认为某个节点有问题，客观下线就是超过一定数量的哨兵节点认为主节点有问题。
  ![主观下线和客观下线](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-11839a24-9249-48a5-8c9d-888aa80d91dc.png)

1. 主观下线
   每个 Sentinel 节点会每隔 1 秒对主节点、从节点、其他 Sentinel 节点发送 ping 命令做心跳检测，当这些节点超过 down-after-milliseconds 没有进行有效回复，Sentinel 节点就会对该节点做失败判定，这个行为叫做主观下线。

2. 客观下线
   当 Sentinel 主观下线的节点是主节点时，该 Sentinel 节点会通过 sentinel is- master-down-by-addr 命令向其他 Sentinel 节点询问对主节点的判断，当超过 \<quorum>个数，Sentinel 节点认为主节点确实有问题，这时该 Sentinel 节点会做出客观下线的决定

- **领导者 Sentinel 节点选举**
  Sentinel 节点之间会做一个领导者选举的工作，选出一个 Sentinel 节点作为领导者进行故障转移的工作。Redis 使用了 Raft 算法实现领导者选举。

- **故障转移**

  领导者选举出的 Sentinel 节点负责故障转移，过程如下：
  ![故障转移](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-0618a5e2-e94f-40d7-888a-e78019ba8f93.png)

  1. 在从节点列表中选出一个节点作为新的主节点，这一步是相对复杂一些的一步
  2. Sentinel 领导者节点会对第一步选出来的从节点执行 slaveof no one 命令让其成为主节点
  3. Sentinel 领导者节点会向剩余的从节点发送命令，让它们成为新主节点的从节点
  4. Sentinel 节点集合会将原来的主节点更新为从节点，并保持着对其关注，当其恢复后命令它去复制新的主节点

### 20.领导者 Sentinel 节点选举了解吗？

Redis 使用了 Raft 算法实 现领导者选举，大致流程如下：
![领导者Sentinel节点选举](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-6586ae3c-6b33-4c9f-8137-f02fc0e6cfae.png)

1. 每个在线的 Sentinel 节点都有资格成为领导者，当它确认主节点主观 下线时候，会向其他 Sentinel 节点发送 sentinel is-master-down-by-addr 命令， 要求将自己设置为领导者。
2. 收到命令的 Sentinel 节点，如果没有同意过其他 Sentinel 节点的 sentinel is-master-down-by-addr 命令，将同意该请求，否则拒绝。
3. 如果该 Sentinel 节点发现自己的票数已经大于等于 max（quorum， num（sentinels）/2+1），那么它将成为领导者。
4. 如果此过程没有选举出领导者，将进入下一次选举。

### 21.新的主节点是怎样被挑选出来的？

选出新的主节点，大概分为这么几步：
![新的主节点](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-03976d35-20b6-4efe-aa9c-7d3759460d34.png)

1.  过滤：“不健康”（主观下线、断线）、5 秒内没有回复过 Sentinel 节 点 ping 响应、与主节点失联超过 down-after-milliseconds\*10 秒。
2.  选择 slave-priority（从节点优先级）最高的从节点列表，如果存在则返回，不存在则继续。
3.  选择复制偏移量最大的从节点（复制的最完整），如果存在则返 回，不存在则继续。
4.  选择 runid 最小的从节点。

### 22.Redis 集群了解吗？

前面说到了主从存在高可用和分布式的问题，哨兵解决了高可用的问题，而集群就是终极方案，一举解决高可用和分布式问题。
![Redis 集群示意图](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-5cbc6009-251e-4d5b-8f22-8d543938eccb.png)

1. **数据分区：** 数据分区 _(或称数据分片)_ 是集群最核心的功能。集群将数据分散到多个节点，一方面 突破了 Redis 单机内存大小的限制，**存储容量大大增加**；**另一方面** 每个主节点都可以对外提供读服务和写服务，**大大提高了集群的响应能力**。

2. **高可用：** 集群支持主从复制和主节点的 **自动故障转移** _（与哨兵类似）_，当任一节点发生故障时，集群仍然可以对外提供服务。

### 23.集群中数据如何分区？

在 Redis 集群中，数据分区是通过将数据分散到不同的节点来实现的，常见的数据分区规则有三种：节点取余分区、一致性哈希分区、虚拟槽分区。

![三分恶面渣逆袭：分布式数据分区](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-ceb49e41-dfd7-4d1e-91f9-c299437227d2.png)

#### 说说节点取余分区

节点取余分区是一种简单的分区策略，其中数据项通过对某个值（通常是键的哈希值）进行取余操作来分配到不同的节点。

类似 HashMap 中的取余操作，数据项的键经过哈希函数计算后，对节点数量取余，然后将数据项分配到余数对应的节点上。

缺点是扩缩容时，大多数数据需要重新分配，因为节点总数的改变会影响取余结果，这可能导致大量数据迁移。

![三分恶面渣逆袭：节点取余分区](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-8b1fcaec-37e6-420a-9ca2-03615232af17.png)

#### 说说一致性哈希分区

一致性哈希分区的原理是：将哈希值空间组织成一个环，数据项和节点都映射到这个环上。数据项由其哈希值直接映射到环上，然后顺时针分配到遇到的第一个节点。

从而来减少节点变动时数据迁移的量。

![三分恶面渣逆袭：一致性哈希分区](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-89bd1c1c-251c-4f53-bba3-fe945b2ae9e2.png)

Key 1 和 Key 2 会落入到 Node 1 中，Key 3、Key 4 会落入到 Node 2 中，Key 5 落入到 Node 3 中，Key 6 落入到 Node 4 中。

这种方式相比节点取余最大的好处在于加入和删除节点只影响哈希环中相邻的节点，对其他节点无影响。

但它还是存在问题：

- 节点在圆环上分布不平均，会造成部分缓存节点的压力较大
- 当某个节点故障时，这个节点所要承担的所有访问都会被顺移到另一个节点上，会对后面这个节点造成压力。

#### 说说虚拟槽分区

在虚拟槽分区中，存在固定数量的槽位（例如 Redis 的 16384 个槽），每个键通过哈希算法映射到这些槽中的一个。每个节点负责管理一定范围的槽。

可以灵活地将槽（以及槽中的数据）从一个节点迁移到另一个节点，从而实现平滑扩缩容。

数据分布更均匀，且当节点增减时，数据迁移更加高效。Redis Cluster 采用的正是这种分区方式。

在虚拟槽分区中，槽是数据管理和迁移的基本单位。槽解耦了数据和实际节点之间的关系，增加或删除节点对系统的影响很小。

![三分恶面渣逆袭：虚拟槽分配](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-e0ed9d62-3406-40db-8b01-c931f1020612.png)

系统中有 `4` 个实际节点，假设为其分配 `16` 个槽(0-15)；

- 槽 0-3 位于 node1；
- 4-7 位于 node2；
- 以此类推....

如果此时删除 `node2`，只需要将槽 4-7 重新分配即可，例如槽 4-5 分配给 `node1`，槽 6 分配给 `node3`，槽 7 分配给 `node4`，数据在其他节点的分布仍然较为均衡。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小米暑期实习同学 E 一面面试原题：你知道Redis的一致性hash吗

### 24.能说说 Redis 集群的原理吗？

Redis 集群通过数据分区来实现数据的分布式存储，通过自动故障转移实现高可用。

##### 集群创建

数据分区是在集群创建的时候完成的。
![集群创建](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-046a512c-baab-4e3a-9409-2af58088cceb.png)

**设置节点**
Redis 集群一般由多个节点组成，节点数量至少为 6 个才能保证组成完整高可用的集群。每个节点需要开启配置 cluster-enabled yes，让 Redis 运行在集群模式下。
![节点和握手](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-e6064ba6-fd6f-4270-92f9-68c0bb98fd4b.png)
**节点握手**
节点握手是指一批运行在集群模式下的节点通过 Gossip 协议彼此通信， 达到感知对方的过程。节点握手是集群彼此通信的第一步，由客户端发起命 令：cluster meet{ip}{port}。完成节点握手之后，一个个的 Redis 节点就组成了一个多节点的集群。

**分配槽（slot）**
Redis 集群把所有的数据映射到 16384 个槽中。每个节点对应若干个槽，只有当节点分配了槽，才能响应和这些槽关联的键命令。通过 cluster addslots 命令为节点分配槽。

![分配槽](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-15341792-e7a6-428c-a109-22827e02be5f.png)

##### 故障转移

Redis 集群的故障转移和哨兵的故障转移类似，但是 Redis 集群中所有的节点都要承担状态维护的任务。

**故障发现**
Redis 集群内节点通过 ping/pong 消息实现节点通信，集群中每个节点都会定期向其他节点发送 ping 消息，接收节点回复 pong 消息作为响应。如果在 cluster-node-timeout 时间内通信一直失败，则发送节 点会认为接收节点存在故障，把接收节点标记为主观下线（pfail）状态。
![主观下线](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-84a2a89e-f9ea-4681-b748-1a4f1dee172b.png)
当某个节点判断另一个节点主观下线后，相应的节点状态会跟随消息在集群内传播。通过 Gossip 消息传播，集群内节点不断收集到故障节点的下线报告。当 半数以上持有槽的主节点都标记某个节点是主观下线时。触发客观下线流程。
![主观下线和客观下线](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-b61a6109-7aea-45ab-a53c-267eebb9180a.png)

**故障恢复**

故障节点变为客观下线后，如果下线节点是持有槽的主节点则需要在它 的从节点中选出一个替换它，从而保证集群的高可用。

![故障恢复流程](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-0e5a49b3-cb5a-4aef-a81f-fce50a012a39.png)

1. 资格检查
   每个从节点都要检查最后与主节点断线时间，判断是否有资格替换故障 的主节点。
2. 准备选举时间
   当从节点符合故障转移资格后，更新触发故障选举的时间，只有到达该 时间后才能执行后续流程。
3. 发起选举
   当从节点定时任务检测到达故障选举时间（failover_auth_time）到达后，发起选举流程。
4. 选举投票
   持有槽的主节点处理故障选举消息。投票过程其实是一个领导者选举的过程，如集群内有 N 个持有槽的主节 点代表有 N 张选票。由于在每个配置纪元内持有槽的主节点只能投票给一个 从节点，因此只能有一个从节点获得 N/2+1 的选票，保证能够找出唯一的从节点。
   ![选举投票](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-d0e16ea3-6683-43f4-82a3-80478703ae06.png)
5. 替换主节点
   当从节点收集到足够的选票之后，触发替换主节点操作。

> **部署 Redis 集群至少需要几个物理节点？**

在投票选举的环节，故障主节点也算在投票数内，假设集群内节点规模是 3 主 3 从，其中有 2 个主节点部署在一台机器上，当这台机器宕机时，由于从节点无法收集到 3/2+1 个主节点选票将导致故障转移失败。这个问题也适用于故障发现环节。因此部署集群时所有主节点最少需要部署在 3 台物理机上才能避免单点问题。

### 25.说说集群的伸缩？

Redis 集群提供了灵活的节点扩容和收缩方案，可以在不影响集群对外服务的情况下，为集群添加节点进行扩容也可以下线部分节点进行缩容。
![集群的伸缩](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-dd3e9494-eddb-4861-85f7-2646018d93f6.png)其实，集群扩容和缩容的关键点，就在于槽和节点的对应关系，扩容和缩容就是将一部分`槽`和`数据`迁移给新节点。

例如下面一个集群，每个节点对应若干个槽，每个槽对应一定的数据，如果希望加入 1 个节点希望实现集群扩容时，需要通过相关命令把一部分槽和内容迁移给新节点。
![扩容实例](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-1d24bb63-2b05-4db9-bd6b-983f16a4830e.png)缩容也是类似，先把槽和数据迁移到其它节点，再把对应的节点下线。

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括 Java 基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM 等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

## 缓存设计

### 26.什么是缓存击穿、缓存穿透、缓存雪崩？

缓存穿透、缓存击穿和缓存雪崩是指在使用 Redis 做为缓存时可能遇到的三种问题。

#### 什么是缓存击穿？

缓存击穿是指某一个或少数几个数据被高频访问，当这些数据在缓存中过期的那一刻，大量请求就会直接到达数据库，导致数据库瞬间压力过大。

![三分恶面渣逆袭：缓存击穿](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-86579ee6-9dae-4274-a5cc-af6812f48da4.png)

解决⽅案：

①、加锁更新，⽐如请求查询 A，发现缓存中没有，对 A 这个 key 加锁，同时去数据库查询数据，写⼊缓存，再返回给⽤户，这样后⾯的请求就可以从缓存中拿到数据了。

![三分恶面渣逆袭：加锁更新](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-cf63911a-8501-493e-a375-8b47a9f33358.png)

②、将过期时间组合写在 value 中，通过异步的⽅式不断的刷新过期时间，防⽌此类现象。

#### 什么是缓存穿透？

缓存穿透是指查询不存在的数据，由于缓存没有命中（因为数据根本就不存在），请求每次都会穿过缓存去查询数据库。如果这种查询非常频繁，就会给数据库造成很大的压力。

![三分恶面渣逆袭：缓存穿透](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-029951e6-8b99-4364-a570-010853deb594.png)

缓存穿透意味着缓存失去了减轻数据压力的意义。

缓存穿透可能有两种原因：

1. 自身业务代码问题
2. 恶意攻击，爬虫造成空命中

它主要有两种解决办法：

①、**缓存空值/默认值**

一种方式是在数据库不命中之后，把一个空对象或者默认值保存到缓存，之后再访问这个数据，就会从缓存中获取，这样就保护了数据库。

![三分恶面渣逆袭：缓存空值/默认值](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-288af5a2-ae5a-427a-95e9-b4a658b01386.png)

缓存空值有两大问题：

1. 空值做了缓存，意味着缓存层中存了更多的键，需要更多的内存空间（如果是攻击，问题更严重），比较有效的方法是针对这类数据设置一个较短的过期时间，让其自动剔除。
2. 缓存层和存储层的数据会有一段时间窗口的不一致，可能会对业务有一定影响。

例如过期时间设置为 5 分钟，如果此时存储层添加了这个数据，那此段时间就会出现缓存层和存储层数据的不一致。

这时候可以利用消息队列或者其它异步方式清理缓存中的空对象。

②、**布隆过滤器**

除了缓存空对象，我们还可以在存储和缓存之前，加一个布隆过滤器，做一层过滤。

布隆过滤器里会保存数据是否存在，如果判断数据不不能再，就不会访问存储。

![布隆过滤器](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-0e18ea40-a2e5-4fa6-989e-e771f6e4b0fc.png)

两种解决方案的对比：

![缓存空对象核布隆过滤器方案对比](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-e8a382c9-4379-44ab-b1dc-fb598a228105.png)

#### 什么是缓存雪崩？

缓存雪崩是指在某一个时间点，由于大量的缓存数据同时过期或缓存服务器突然宕机了，导致所有的请求都落到了数据库上（比如 MySQL），从而对数据库造成巨大压力，甚至导致数据库崩溃的现象。

总之就是，崩了，崩的非常严重，就叫雪崩了（电影电视里应该看到过，非常夸张）。

![三分恶面渣逆袭：缓存雪崩](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-1464fe22-c463-4850-8989-b899510cb10e.png)

#### 如何解决缓存雪崩呢？

第一种：提高缓存可用性

**01、集群部署**：采用分布式缓存而不是单一缓存服务器，可以降低单点故障的风险。即使某个缓存节点发生故障，其他节点仍然可以提供服务，从而避免对数据库的大量直接访问。

可以利用 Redis Cluster。

![Rajat Pachauri：Redis Cluster](https://cdn.tobebetterjavaer.com/stutymore/redis-20240326220634.png)

或者第三方集群方案 Codis。

![极客时间：Codis](https://cdn.tobebetterjavaer.com/stutymore/redis-20240326220408.png)

**02、备份缓存**：对于关键数据，除了在主缓存中存储，还可以在备用缓存中保存一份。当主缓存不可用时，可以快速切换到备用缓存，确保系统的稳定性和可用性。

第二种：过期时间

对于缓存数据，设置不同的过期时间，避免大量缓存数据同时过期。可以通过在原有过期时间的基础上添加一个随机值来实现，这样可以分散缓存过期时间，减少同一时间对数据库的访问压力。

第三种：限流和降级

通过设置合理的系统限流策略，如令牌桶或漏斗算法，来控制访问流量，防止在缓存失效时数据库被打垮。

此外，系统可以实现降级策略，在缓存雪崩或系统压力过大时，暂时关闭一些非核心服务，确保核心服务的正常运行。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 22 暑期实习一面面试原题：缓存雪崩，如何解决
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的快手面经同学 7 Java 后端技术一面面试原题：说一下 Redis 的持久化方式

### 27.能说说布隆过滤器吗？

布隆过滤器，它是一个连续的数据结构，每个存储位存储都是一个`bit`，即`0`或者`1`, 来标识数据是否存在。

存储数据的时时候，使用 K 个不同的哈希函数将这个变量映射为 bit 列表的的 K 个点，把它们置为 1。

![布隆过滤器](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-d0b8d85c-85dc-4843-b4be-d5d48338a44e.png)我们判断缓存 key 是否存在，同样，K 个哈希函数，映射到 bit 列表上的 K 个点，判断是不是 1：

- 如果全不是 1，那么 key 不存在；
- 如果都是 1，也只是表示 key 可能存在。

布隆过滤器也有一些缺点：

1. 它在判断元素是否在集合中时是有一定错误几率，因为哈希算法有一定的碰撞的概率。
2. 不支持删除元素。

### 28.如何保证缓存和数据库的数据⼀致性？

在[技术派实战项目](https://javabetter.cn/zhishixingqiu/paicoding.html)中，我采用的是先写 MySQL，再删除 Redis 的方式来保证缓存和数据库的数据一致性。

![技术派教程](https://cdn.tobebetterjavaer.com/stutymore/redis-20240325221330.png)

对于第一次查询，请求 B 查询到的缓存数据是 10，但 MySQL 被请求 A 更新为了 11，此时数据库和缓存不一致。

但也只存在这一次不一致的情况，对于不是强一致性的业务，可以容忍。

当请求 B 第二次查询时，因为请求 A 更新完数据库把缓存删除了，所以请求 B 这次不会命中缓存，会重新查一次 MySQL，然后回写到 Redis。

缓存和数据库又一致了。

#### 那再来说说为什么要删除缓存而不是更新缓存

因为相对而言，删除缓存的速度比更新缓存的速度要快得多。举个例子：假设商品 product_123 的当前库存是 10，现在有一次购买操作，库存减 1，我们需要更新 Redis 中的库存信息。

```java
product_id = "product_123"
# 假设这是购买操作后的新库存值
new_stock = 9

# 更新Redis中的库存信息
redis.set(product_id, new_stock)
```

更新操作至少涉及到两个步骤：计算新的库存值和更新 Redis 中的库存值。

假如是直接删除操作，直接就一步到位了：

```java
product_id = "product_123"

# 删除Redis中的库存缓存
redis.del(product_id)
```

![三分恶面渣逆袭：删除缓存和更新缓存](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-ebad0a67-3012-4466-a4dc-e834104c48f8.png)

假如是更新缓存，那么可能请求 A 更新完 MySQL 后在更新 Redis 中，请求 B 已经读取到 Redis 中的旧值返回了，又一次导致了缓存和数据库不一致。

#### 那再说说为什么要先更新数据库，再删除缓存

因为更新数据库的速度比删除缓存的速度要慢得多。因为更新 MySQL 是磁盘 IO 操作，而 Redis 是内存操作。内存操作比磁盘 IO 快得多（这是硬件层面的天然差距）。

那假如是先删除缓存，再更新数据库，就会造成这样的情况：

缓存中不存在，数据库又没有完成更新，此时有请求进来读取数据，并写入到缓存，那么在更新完缓存后，缓存中这个 key 就成了一个脏数据。

![三分恶面渣逆袭：先更数据库还是先删缓存](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-5c929a9e-a723-43b3-8f3c-f22c83765f9d.png)

目前最流行的缓存读写策略 Cache Aside Pattern（[旁路缓存模式](https://coolshell.cn/articles/17416.html)）就是采用的先写数据库，再删缓存的方式。

- 失效：应用程序先从缓存读取数据，如果数据不存在，再从数据库中读取数据，成功后，放入缓存。
- 命中：应用程序从缓存读取数据，如果数据存在，直接返回。
- 更新：先把数据写入数据库，成功后，再让缓存失效。

![左耳朵耗子：Cache Aside Pattern](https://cdn.tobebetterjavaer.com/stutymore/redis-20240325224814.png)

#### 那假如对一致性要求很高，该怎么办呢？

我们先来分析一下，缓存和数据库数据不一致的原因，常见的有两种：

- 缓存删除失败
- 并发导致写入了脏数据

那通常有四种方案可以解决。

![](https://cdn.tobebetterjavaer.com/stutymore/redis-20240325225250.png)

**①、引入消息队列保证缓存被删除**

使用消息队列（如 Kafka、RabbitMQ）保证数据库更新和缓存更新之间的最终一致性。当数据库更新完成后，将更新事件发送到消息队列。有专门的服务监听这些事件并负责更新或删除缓存。

![三分恶面渣逆袭：消息队列保证key被删除](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-e4a61193-515a-409f-a436-2733abc3a86e.png)

这种方案很不错，缺点是对业务代码有一定的侵入，毕竟引入了消息队列嘛。

**②、数据库订阅+消息队列保证缓存被删除**

可以专门起一个服务（比如 [Canal](https://github.com/alibaba/canal)，阿里巴巴 MySQL binlog 增量订阅&消费组件）去监听 MySQL 的 binlog，获取需要操作的数据。

![技术派教程](https://cdn.tobebetterjavaer.com/stutymore/redis-20240325225809.png)

然后用一个公共的服务获取订阅程序传来的信息，进行缓存删除。

![三分恶面渣逆袭：数据库订阅+消息队列保证key被删除](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-37c07418-9cd8-43d9-90e7-0cb43b329025.png)

这种方式虽然降低了对业务的侵入，但增加了整个系统的复杂度，适合基建完善的大厂。

**③、延时双删防止脏数据**

简单说，就是在第一次删除缓存之后，过一段时间之后，再次删除缓存。

主要针对缓存不存在，但写入了脏数据的情况。在先删缓存，再写数据库的更新策略下发生的比较多。

![三分恶面渣逆袭：延时双删](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-fab24753-9c53-4432-9413-5feba07ae1e3.png)

这种方式的延时时间需要仔细考量和测试。

**④：设置缓存过期时间兜底**

这是一个朴素但有用的兜底策略，给缓存设置一个合理的过期时间，即使发生了缓存和数据库的数据不一致问题，也不会永远不一致下去，缓存过期后，自然就一致了。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的华为面经同学 8 技术二面面试原题：怎样保证数据的最终一致性？
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 23 QQ 后台技术一面面试原题：数据一致性问题

### 29.如何保证本地缓存和分布式缓存的一致？

PS:这道题面试很少问，但实际工作中很常见。

在日常的开发中，我们常常采用两级缓存：本地缓存+分布式缓存。

所谓本地缓存，就是对应服务器的内存缓存，比如 Caffeine，分布式缓存基本就是采用 Redis。

那么问题来了，本地缓存和分布式缓存怎么保持数据一致？
![延时双删](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-6d4ab7e6-8337-4576-bbf0-79202a1c3331.png)
Redis 缓存，数据库发生更新，直接删除缓存的 key 即可，因为对于应用系统而言，它是一种中心化的缓存。

但是本地缓存，它是非中心化的，散落在分布式服务的各个节点上，没法通过客户端的请求删除本地缓存的 key，所以得想办法通知集群所有节点，删除对应的本地缓存 key。
![本地缓存/分布式缓存保持一致](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-20c15f0d-fb3c-4922-94b1-edcd856658be.png)

可以采用消息队列的方式：

1. 采用 Redis 本身的 Pub/Sub 机制，分布式集群的所有节点订阅删除本地缓存频道，删除 Redis 缓存的节点，同事发布删除本地缓存消息，订阅者们订阅到消息后，删除对应的本地 key。
   但是 Redis 的发布订阅不是可靠的，不能保证一定删除成功。
2. 引入专业的消息队列，比如 RocketMQ，保证消息的可靠性，但是增加了系统的复杂度。
3. 设置适当的过期时间兜底，本地缓存可以设置相对短一些的过期时间。

### 30.怎么处理热 key？

**什么是热 Key？**

所谓的热 key，就是指在很短时间内被频繁访问的键。

比如，热门新闻或热门商品，这类 key 通常会有大流量的访问，对存储这类信息的 Redis 来说，是不小的压力。

> 某天某流量明星突然爆出一个大瓜，微博突然就崩了，这就是热 key 的压力。

再比如说 Redis 是集群部署，热 key 可能会造成整体流量的不均衡（网络带宽、CPU 和内存资源），个别节点出现 OPS 过大的情况，极端情况下热点 key 甚至会超过 Redis 本身能够承受的 OPS。

> OPS（Operations Per Second）是 Redis 的一个重要指标，表示 Redis 每秒钟能够处理的命令数。

通常以 Key 被请求的频率来判定，比如：

- **QPS 集中在特定的 Key**：总的 QPS（每秒查询率）为 10000，其中一个 Key 的 QPS 飙到了 8000。
- **带宽使用率集中在特定的 Key**：一个拥有上千成员且总大小为 1M 的哈希 Key，每秒发送大量的 HGETALL 请求。
- **CPU 使用率集中在特定的 Key**：一个拥有数万个成员的 ZSET Key，每秒发送大量的 ZRANGE 请求。

> - HGETALL 命令用于返回哈希表中，所有的字段和值。
> - ZRANGE 命令用于返回有序集中，指定区间内的成员。

**怎么处理热 key？**

![热key处理](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-6fa972ec-5531-48f2-a608-4465d79d4518.png)

对热 key 的处理，最关键的是对热 key 的监控:

①、客户端

客户端其实是距离 key“最近”的地方，因为 Redis 命令就是从客户端发出的，例如在客户端设置全局字典（key 和调用次数），每次调用 Redis 命令时，使用这个字典进行记录。

②、代理端

像 Twemproxy、Codis 这些基于代理的 Redis 分布式架构，所有客户端的请求都是通过代理端完成的，可以在代理端进行监控。

③、Redis 服务端

使用 monitor 命令统计热点 key 是很多开发和运维人员首先想到的方案，monitor 命令可以监控到 Redis 执行的所有命令。

> monitor 命令的使用：`redis-cli monitor`

![](https://cdn.tobebetterjavaer.com/stutymore/redis-20240309085135.png)

还可以通过 bigkeys 参数来分析热 Key。

> bigkeys 命令的使用：`redis-cli --bigkeys`

![](https://cdn.tobebetterjavaer.com/stutymore/redis-20240309090340.png)

只要监控到了热 key，对热 key 的处理就简单了：

①、把热 key 打散到不同的服务器，降低压⼒。

基本思路就是给热 Key 加上前缀或者后缀，见下例：

```java
// N 为 Redis 实例个数，M 为 N 的 2倍
const M = N * 2
//生成随机数
random = GenRandom(0, M)
//构造备份新 Key
bakHotKey = hotKey + "_" + random
data = redis.GET(bakHotKey)
if data == NULL {
    data = redis.GET(hotKey)
    if data == NULL {
        data = GetFromDB()
        // 可以利用原子锁来写入数据保证数据一致性
        redis.SET(hotKey, data, expireTime)
        redis.SET(bakHotKey, data, expireTime + GenRandom(0, 5))
    } else {
        redis.SET(bakHotKey, data, expireTime + GenRandom(0, 5))
    }
}
```

②、加⼊⼆级缓存，当出现热 Key 后，把热 Key 加载到 JVM 中，后续针对这些热 Key 的请求，直接从 JVM 中读取。

这些本地的缓存工具有很多，比如 Caffeine、Guava 等，或者直接使用 HashMap 作为本地缓存都是可以的。

> 如果对热 Key 进行本地缓存，需要防止本地缓存过大。

推荐阅读：

- [阿里：发现并处理 Redis 的大 Key 和热 Key](https://help.aliyun.com/zh/redis/user-guide/identify-and-handle-large-keys-and-hotkeys)
- [董宗磊：Redis 热 Key 发现以及解决办法](https://dongzl.github.io/2021/01/14/03-Redis-Hot-Key/index.html)

> 1. 华为 OD 的面试中出现过该题：讲一讲 Redis 的热 Key 和大 Key

### 31.缓存预热怎么做呢？

所谓缓存预热，就是提前把数据库里的数据刷到缓存里，通常有这些方法：

1、直接写个缓存刷新页面或者接口，上线时手动操作

2、数据量不大，可以在项目启动的时候自动进行加载

3、定时任务刷新缓存.

### 32.热点 key 重建？问题？解决？

开发的时候一般使用“缓存+过期时间”的策略，既可以加速数据读写，又保证数据的定期更新，这种模式基本能够满足绝大部分需求。

但是有两个问题如果同时出现，可能就会出现比较大的问题：

- 当前 key 是一个热点 key（例如一个热门的娱乐新闻），并发量非常大。

- 重建缓存不能在短时间完成，可能是一个复杂计算，例如复杂的 SQL、多次 IO、多个依赖等。 在缓存失效的瞬间，有大量线程来重建缓存，造成后端负载加大，甚至可能会让应用崩溃。

> **怎么处理呢？**

要解决这个问题也不是很复杂，解决问题的要点在于：

- 减少重建缓存的次数。
- 数据尽可能一致。
- 较少的潜在危险。

所以一般采用如下方式：

1.  互斥锁（mutex key）
    这种方法只允许一个线程重建缓存，其他线程等待重建缓存的线程执行完，重新从缓存获取数据即可。
2.  永远不过期
    “永远不过期”包含两层意思：

- 从缓存层面来看，确实没有设置过期时间，所以不会出现热点 key 过期后产生的问题，也就是“物理”不过期。
- 从功能层面来看，为每个 value 设置一个逻辑过期时间，当发现超过逻辑过期时间后，会使用单独的线程去构建缓存。

### 33.无底洞问题吗？如何解决？

> **什么是无底洞问题？**

2010 年，Facebook 的 Memcache 节点已经达到了 3000 个，承载着 TB 级别的缓存数据。但开发和运维人员发现了一个问题，为了满足业务要求添加了大量新 Memcache 节点，但是发现性能不但没有好转反而下降了，当时将这 种现象称为缓存的“**无底洞**”现象。

那么为什么会产生这种现象呢?

通常来说添加节点使得 Memcache 集群 性能应该更强了，但事实并非如此。键值数据库由于通常采用哈希函数将 key 映射到各个节点上，造成 key 的分布与业务无关，但是由于数据量和访问量的持续增长，造成需要添加大量节点做水平扩容，导致键值分布到更多的 节点上，所以无论是 Memcache 还是 Redis 的分布式，批量操作通常需要从不同节点上获取，相比于单机批量操作只涉及一次网络操作，分布式批量操作会涉及多次网络时间。

> **无底洞问题如何优化呢？**

先分析一下无底洞问题：

- 客户端一次批量操作会涉及多次网络操作，也就意味着批量操作会随着节点的增多，耗时会不断增大。

- 网络连接数变多，对节点的性能也有一定影响。

常见的优化思路如下：

- 命令本身的优化，例如优化操作语句等。

- 减少网络通信次数。

- 降低接入成本，例如客户端使用长连/连接池、NIO 等。

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括 Java 基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM 等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

## Redis 运维

### 34.Redis 报内存不足怎么处理？

Redis 内存不足有这么几种处理方式：

- 修改配置文件 redis.conf 的 maxmemory 参数，增加 Redis 可用内存
- 也可以通过命令 set maxmemory 动态设置内存上限
- 修改内存淘汰策略，及时释放内存空间
- 使用 Redis 集群模式，进行横向扩容。

### 35.Redis 的过期数据回收策略有哪些？

Redis 处理过期数据（即键值对）的回收策略主要有两种：惰性删除和定期删除。

![](https://cdn.tobebetterjavaer.com/stutymore/redis-20240326214119.png)

#### 惰性删除

当某个键被访问时，如果发现它已经过期，Redis 会立即删除该键。这意味着如果一个已过期的键从未被访问，它不会被自动删除，可能会占用额外的内存。

#### 定期删除

Redis 会定期随机测试一些键，并删除其中已过期的键。这个过程是 Redis 内部自动执行的，旨在减少过期键对内存的占用。

可以通过 `config get hz` 命令查看当前的 hz 值。

![](https://cdn.tobebetterjavaer.com/stutymore/redis-20240326214800.png)

结果显示 hz 的值为 "10"。这意味着 Redis 服务器每秒执行其内部定时任务（如过期键的清理）的频率是 10 次。

可以通过 `CONFIG SET hz 20` 进行调整，或者直接通过配置文件中的 hz 设置。

![二哥本地 Redis 的配置文件路径和 hz 的默认值](https://cdn.tobebetterjavaer.com/stutymore/redis-20240326215240.png)

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 22 暑期实习一面面试原题：Redis key 删除策略

### 36.Redis 有哪些内存溢出控制/内存淘汰策略？

当 Redis 所用内存达到 maxmemory 上限时，会触发相应的溢出控制策略。

![Redis六种内存溢出控制策略](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-5be7405c-ee11-4d2b-bea4-9598f10a1b17.png)

1. noeviction：默认策略，不进行任何淘汰，当内存不足以容纳更多数据时，对写操作返回错误。（但仍然允许删除操作）
2. volatile-lru：仅从设置了过期时间的键中使用 LRU 算法淘汰。
3. allkeys-lru：从所有的键中使用 LRU（Least Recently Used，最近最少使用）算法淘汰数据。
4. allkeys-random：从所有的键中随机淘汰数据。
5. volatile-random：仅从设置了过期时间的键中随机淘汰。
6. volatile-ttl：从设置了过期时间的键中选择 TTL（Time To Live，存活时间）最短的键淘汰。
7. allkeys-lfu:对所有的 key 使用 LFU 算法进行删除
8. volatile-lfu:对所有设置了过期时间的 key 使用 LFU 算法进行删除

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小米春招同学 K 一面面试原题：为什么 redis 快，淘汰策略 持久化

### 37.Redis 阻塞？怎么解决？

Redis 发生阻塞，可以从以下几个方面排查：
![Redis阻塞排查](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-e6a35258-7a78-4489-90b7-e47a4190802b.png)

- **API 或数据结构使用不合理**

  通常 Redis 执行命令速度非常快，但是不合理地使用命令，可能会导致执行速度很慢，导致阻塞，对于高并发的场景，应该尽量避免在大对象上执行算法复杂 度超过 O（n）的命令。

  对慢查询的处理分为两步：

  1. 发现慢查询： slowlog get{n}命令可以获取最近 的 n 条慢查询命令；
  2. 发现慢查询后，可以从两个方向去优化慢查询：
     1）修改为低算法复杂度的命令，如 hgetall 改为 hmget 等，禁用 keys、sort 等命 令
     2）调整大对象：缩减大对象数据或把大对象拆分为多个小对象，防止一次命令操作过多的数据。

- **CPU 饱和的问题**

  单线程的 Redis 处理命令时只能使用一个 CPU。而 CPU 饱和是指 Redis 单核 CPU 使用率跑到接近 100%。

  针对这种情况，处理步骤一般如下：

  1. 判断当前 Redis 并发量是否已经达到极限，可以使用统计命令 redis-cli-h{ip}-p{port}--stat 获取当前 Redis 使用情况
  2. 如果 Redis 的请求几万+，那么大概就是 Redis 的 OPS 已经到了极限，应该做集群化水品扩展来分摊 OPS 压力
  3. 如果只有几百几千，那么就得排查命令和内存的使用

- **持久化相关的阻塞**

  对于开启了持久化功能的 Redis 节点，需要排查是否是持久化导致的阻塞。

  1. fork 阻塞
     fork 操作发生在 RDB 和 AOF 重写时，Redis 主线程调用 fork 操作产生共享 内存的子进程，由子进程完成持久化文件重写工作。如果 fork 操作本身耗时过长，必然会导致主线程的阻塞。
  2. AOF 刷盘阻塞
     当我们开启 AOF 持久化功能时，文件刷盘的方式一般采用每秒一次，后台线程每秒对 AOF 文件做 fsync 操作。当硬盘压力过大时，fsync 操作需要等 待，直到写入完成。如果主线程发现距离上一次的 fsync 成功超过 2 秒，为了 数据安全性它会阻塞直到后台线程执行 fsync 操作完成。
  3. HugePage 写操作阻塞
     对于开启 Transparent HugePages 的 操作系统，每次写命令引起的复制内存页单位由 4K 变为 2MB，放大了 512 倍，会拖慢写操作的执行时间，导致大量写操作慢查询。

### 38.大 key 问题了解吗？

大 key 指的是存储了大量数据的键，比如：

- 单个简单的 key 存储的 value 很大，size 超过 10KB
- hash，set，zset，list 中存储过多的元素（以万为单位）

推荐阅读：[阿里：发现并处理 Redis 的大 Key 和热 Key](https://help.aliyun.com/zh/redis/user-guide/identify-and-handle-large-keys-and-hotkeys)

**大 key 会造成什么问题呢？**

- 客户端耗时增加，甚至超时
- 对大 key 进行 IO 操作时，会严重占用带宽和 CPU
- 造成 Redis 集群中数据倾斜
- 主动删除、被动删等，可能会导致阻塞

**如何找到大 key?**

①、bigkeys 参数：使用 bigkeys 命令以遍历的方式分析 Redis 实例中的所有 Key，并返回整体统计信息与每个数据类型中 Top1 的大 Key

> bigkeys 命令的使用：`redis-cli --bigkeys`

![](https://cdn.tobebetterjavaer.com/stutymore/redis-20240309091503.png)

②、redis-rdb-tools：redis-rdb-tools 是由 Python 语言编写的用来分析 Redis 中 rdb 快照文件的工具。

源码地址：[https://github.com/sripathikrishnan/redis-rdb-tools/](https://github.com/sripathikrishnan/redis-rdb-tools/)

> rdb，全称 Redis DataBase，是 Redis 在内存中的数据格式的一种持久化存储方式。

![](https://cdn.tobebetterjavaer.com/stutymore/redis-20240309092121.png)

推荐阅读：[RDB 详解](https://redisbook.readthedocs.io/en/latest/internal/rdb.html)

**如何处理大 key?**

![大key处理](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-e4aaafda-fce1-47f0-8b2b-7261d47b720b.png)

①、**删除大 key**

- 当 Redis 版本大于 4.0 时，可使用 UNLINK 命令安全地删除大 Key，该命令能够以非阻塞的方式，逐步地清理传入的大 Key。
- 当 Redis 版本小于 4.0 时，建议通过 SCAN 命令执行增量迭代扫描 key，然后判断进行删除。

②、**压缩和拆分 key**

- 当 vaule 是 string 时，比较难拆分，则使用序列化、压缩算法将 key 的大小控制在合理范围内，但是序列化和反序列化都会带来额外的性能消耗。
- 当 value 是 string，压缩之后仍然是大 key 时，则需要进行拆分，将一个大 key 分为不同的部分，记录每个部分的 key，使用 multiget 等操作实现事务读取。
- 当 value 是 list/set 等集合类型时，根据预估的数据规模来进行分片，不同的元素计算后分到不同的片。

> 1. 华为 OD 的面试中出现过该题：讲一讲 Redis 的热 Key 和大 Key

### 39.Redis 常见性能问题和解决方案？

1.  Master 最好不要做任何持久化工作，包括内存快照和 AOF 日志文件，特别是不要启用内存快照做持久化。
2.  如果数据比较关键，某个 Slave 开启 AOF 备份数据，策略为每秒同步一次。
3.  为了主从复制的速度和连接的稳定性，Slave 和 Master 最好在同一个局域网内。
4.  尽量避免在压力较大的主库上增加从库。
5.  Master 调用 BGREWRITEAOF 重写 AOF 文件，AOF 在重写的时候会占大量的 CPU 和内存资源，导致服务 load 过高，出现短暂服务暂停现象。
6.  为了 Master 的稳定性，主从复制不要用图状结构，用单向链表结构更稳定，即主从关为：Master<–Slave1<–Slave2<–Slave3…，这样的结构也方便解决单点故障问题，实现 Slave 对 Master 的替换，也即，如果 Master 挂了，可以立马启用 Slave1 做 Master，其他不变。

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括 Java 基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM 等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

## Redis 应用

### 40.使用 Redis 如何实现异步队列？

我们知道 redis 支持很多种结构的数据，那么如何使用 redis 作为异步队列使用呢？
一般有以下几种方式：

- **使用 list 作为队列，lpush 生产消息，rpop 消费消息**

这种方式，消费者死循环 rpop 从队列中消费消息。但是这样，即使队列里没有消息，也会进行 rpop，会导致 Redis CPU 的消耗。
![list作为队列](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-e4b192a1-3ba7-4f4e-98de-e93f437cff7c.png)
可以通过让消费者休眠的方式的方式来处理，但是这样又会又消息的延迟问题。

-**使用 list 作为队列，lpush 生产消息，brpop 消费消息**

brpop 是 rpop 的阻塞版本，list 为空的时候，它会一直阻塞，直到 list 中有值或者超时。
![list作为队列，brpop](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-e9581e51-ffc8-4326-9af4-07816743dc88.png)

这种方式只能实现一对一的消息队列。

- **使用 Redis 的 pub/sub 来进行消息的发布/订阅**

发布/订阅模式可以 1：N 的消息发布/订阅。发布者将消息发布到指定的频道频道（channel），订阅相应频道的客户端都能收到消息。

![pub/sub](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-bc6d05be-3701-4e23-b4ca-6330c949f020.png)
但是这种方式不是可靠的，它不保证订阅者一定能收到消息，也不进行消息的存储。

所以，一般的异步队列的实现还是交给专业的消息队列。

### 41.Redis 如何实现延时队列?

可以使用 Redis 的 zset（有序集合）来实现延时队列。

第一步，将任务添加到 zset 中，score 为任务的执行时间戳，value 为任务的内容。

```bash
ZADD delay_queue 1617024000 task1
```

第二步，定期（例如每秒）从 zset 中获取 score 小于当前时间戳的任务，然后执行任务。

```bash
ZREMRANGEBYSCORE delay_queue -inf 1617024000
```

第三步，任务执行后，从 zset 中删除任务。

```bash
ZREM delay_queue task1
```

![三分恶面渣逆袭：zset实现延时队列](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-54bbcc36-0b00-4142-a6eb-bf2ef48c2213.png)

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 23 QQ 后台技术一面面试原题：Redis 实现延迟队列

### 42.Redis 支持事务吗？

Redis 支持简单的事务，可以将多个命令打包，然后一次性的，按照顺序执行。

主要通过 multi、exec、discard、watch 等命令来实现：

- multi：标记一个事务块的开始
- exec：执行所有事务块内的命令
- discard：取消事务，放弃执行事务块内的所有命令
- watch：监视一个或多个 key，如果在事务执行之前这个 key 被其他命令所改动，那么事务将被打断

![](https://cdn.tobebetterjavaer.com/stutymore/redis-20240314101439.png)

这里简单说一下 Redis 事务的原理：

![三分恶面渣逆袭：Redis事务](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-2ed7ae21-16a6-4716-ac89-117a8c76d3db.png)

- 使用 MULTI 命令开始一个事务。从这个命令执行之后开始，所有的后续命令都不会立即执行，而是被放入一个队列中。在这个阶段，Redis 只是记录下了这些命令。
- 使用 EXEC 命令触发事务的执行。一旦执行了 EXEC，之前 MULTI 后队列中的所有命令会被原子地（atomic）执行。这里的“原子”意味着这些命令要么全部执行，要么（在出现错误时）全部不执行。
- 如果在执行 EXEC 之前决定不执行事务，可以使用 DISCARD 命令来取消事务。这会清空事务队列并退出事务状态。
- WATCH 命令用于实现乐观锁。WATCH 命令可以监视一个或多个键，如果在执行事务的过程中（即在执行 MULTI 之后，执行 EXEC 之前），被监视的键被其他命令改变了，那么当执行 EXEC 时，事务将被取消，并且返回一个错误。

**Redis 事务的注意点有哪些？**

Redis 事务是不支持回滚的，不像 MySQL 的事务一样，要么都执行要么都不执行；一旦 EXEC 命令被调用，所有命令都会被执行，即使有些命令可能执行失败。失败的命令不会影响到其他命令的执行。

**Redis 事务为什么不支持回滚？**

引入事务回滚机制会大大增加 Redis 的复杂性，因为需要跟踪事务中每个命令的状态，并在发生错误时逆向执行命令以恢复原始状态。

Redis 是一个基于内存的数据存储系统，其设计重点是实现高性能。事务回滚需要额外的资源和时间来管理和执行，这与 Redis 的设计目标相违背。因此，Redis 选择不支持事务回滚。

换句话说，**就是我 Redis 不想支持事务，也没有这个必要**。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的华为一面原题：说下 Redis 事务

### 43.Redis 和 Lua 脚本的使用了解吗？

Redis 的事务功能比较简单，平时的开发中，可以利用 Lua 脚本来增强 Redis 的命令。

Lua 脚本能给开发人员带来这些好处：

- Lua 脚本在 Redis 中是原子执行的，执行过程中间不会插入其他命令。
- Lua 脚本可以帮助开发和运维人员创造出自己定制的命令，并可以将这 些命令常驻在 Redis 内存中，实现复用的效果。
- Lua 脚本可以将多条命令一次性打包，有效地减少网络开销。

比如这一段很（烂）经（大）典（街）的秒杀系统利用 lua 扣减 Redis 库存的脚本：

```java
   -- 库存未预热
   if (redis.call('exists', KEYS[2]) == 1) then
        return -9;
    end;
    -- 秒杀商品库存存在
    if (redis.call('exists', KEYS[1]) == 1) then
        local stock = tonumber(redis.call('get', KEYS[1]));
        local num = tonumber(ARGV[1]);
        -- 剩余库存少于请求数量
        if (stock < num) then
            return -3
        end;
        -- 扣减库存
        if (stock >= num) then
            redis.call('incrby', KEYS[1], 0 - num);
            -- 扣减成功
            return 1
        end;
        return -2;
    end;
    -- 秒杀商品库存不存在
    return -1;
```

### 44.Redis 的管道了解吗？

Redis 提供三种将客户端多条命令打包发送给服务端执行的方式：

Pipelining(管道) 、 Transactions(事务) 和 Lua Scripts(Lua 脚本) 。

**Pipelining**（管道）

Redis 管道是三者之中最简单的，当客户端需要执行多条 redis 命令时，可以通过管道一次性将要执行的多条命令发送给服务端，其作用是为了降低 RTT(Round Trip Time) 对性能的影响，比如我们使用 nc 命令将两条指令发送给 redis 服务端。

Redis 服务端接收到管道发送过来的多条命令后，会一直执命令，并将命令的执行结果进行缓存，直到最后一条命令执行完成，再所有命令的执行结果一次性返回给客户端 。
![Pipelining示意图`](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-38aee4c1-efd2-495e-8a6d-164d21a129b1.png)

**Pipelining 的优势**

在性能方面， Pipelining 有下面两个优势：

- **节省了 RTT**：将多条命令打包一次性发送给服务端，减少了客户端与服务端之间的网络调用次数
- **减少了上下文切换**：当客户端/服务端需要从网络中读写数据时，都会产生一次系统调用，系统调用是非常耗时的操作，其中设计到程序由用户态切换到内核态，再从内核态切换回用户态的过程。当我们执行 10 条 redis 命令的时候，就会发生 10 次用户态到内核态的上下文切换，但如果我们使用 Pipeining 将多条命令打包成一条一次性发送给服务端，就只会产生一次上下文切换。

### 45.Redis 实现分布式锁了解吗？

Redis 实现分布式锁的本质，就是在 Redis 里面占一个“茅坑”，当别的进程也来占坑时，发现已经有进程蹲在那里了，就只好放弃或者稍后再试。

①、**V1：setnx 命令**

占坑一般使用 `setnx(set if not exists)` 指令，只允许被一个客户端占坑。先来先占， 用完了再调用 del 指令释放茅坑。

![setnx(set if not exists)](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-a5bddceb-66f6-4965-9f16-05d7179697fc.png)

```java
> setnx lock:fighter true
OK
... do something critical ...
> del lock:fighter
(integer) 1
```

但是有个问题，如果逻辑执行到中间出现异常了，可能会导致 del 指令没有被执行，这样就会出现死锁，锁永远得不到释放。

②、**V2:锁超时释放**

所以在拿到锁之后，可以给锁加上一个过期时间，比如 5s，这样即使中间出现异常也可以保证 5 秒之后锁会自动释放。

![锁超时释放](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-2d3de973-c910-4efe-93e9-cfd50f84c91a.png)

```java
> setnx lock:fighter true
OK
> expire lock:fighter 5
... do something critical ...
> del lock:fighter
(integer) 1
```

但是以上逻辑还有问题：如果在 setnx 和 expire 之间进程突然挂掉了，可能是因为机器断电或者被人为杀掉了，就会导致 expire 无法执行，也会造成死锁。

这种问题的根源就在于 setnx 和 expire 是两条指令，不是原子指令。如果这两条指令可以一起执行就不会出现问题了，对吧？

③、**V3:set 指令**

上面的问题在 Redis 2.8 版本中得到了解决，这个版本加入了 set 指令的扩展参数，使得 setnx 和 expire 指令可以一起执行。

![set原子指令](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-710cdd19-98ea-4e96-b579-ff1ebb0d5de9.png)

```
> set lock:fighter3 true ex 5 nx
OK ... do something critical ...
> del lock:fighter3
```

- `SET` 命令用于设置键值对。
- `lock:fighter3` 是锁的键名。
- `true` 是设置给键 `lock:fighter3` 的值。
- `EX 5` 设置这个键的过期时间为 5 秒。这意味着如果锁的持有者没有在 5 秒内释放锁（比如因为崩溃或其他原因），锁会自动被释放，以防止死锁。
- `NX` 保证只有当 `lock:fighter3` 不存在时，即锁未被其他客户端持有时，当前操作才会成功设置键，从而实现加锁。如果锁已经存在，则命令不会执行任何操作。

![](https://cdn.tobebetterjavaer.com/stutymore/redis-20240308174441.png)

> 图片来源于：[悟空聊架构 Redis 分布式锁](https://my.oschina.net/u/4499317/blog/5039486)

上面这段指令就是 setnx 和 expire 组合在一起的原子指令，算是比较完善的一个分布式锁了。

当然，实际的开发中，没人会去自己写分布式锁的命令，因为有专业的轮子——[Redisson](https://xie.infoq.cn/article/d8e897f768eb1a358a0fd6300)（悟空聊架构：分布式锁中的王者方案 - Redisson）。

![](https://cdn.tobebetterjavaer.com/stutymore/redis-20240308174708.png)

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯 Java 后端实习一面原题：分布式锁用了 Redis 的什么数据结构

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括 Java 基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM 等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

## 底层结构

这一部分就比较深了，如果不是简历上写了精通 Redis，应该不会怎么问。

### 46.说说 Redis 底层数据结构？

Redis 的底层数据结构有**动态字符串(sds)**、**链表(list)**、**字典(ht)**、**跳跃表(skiplist)**、**整数集合(intset)**、**压缩列表(ziplist)** 等。

![三分恶面渣逆袭：Redis Object对应的映射](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-a1b2d2f9-6895-4749-9bda-9314f08bca68.png)

比如说 string 是通过 SDS 实现的，list 是通过链表实现的，hash 是通过字典实现的，set 是通过字典实现的，zset 是通过跳跃表实现的。

![三分恶面渣逆袭：类型-编码-结构](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-7cf91aa9-8db5-4abe-803e-a9e8f3bcb9e4.png)

#### 简单介绍下 SDS

Redis 是通过 C 语言实现的，但 Redis 并没有直接使用 C 语言的字符串，而是自己实现了一种叫做动态字符串 SDS 的类型。

```c
struct sdshdr {
    int len; // buf 中已使用的长度
    int free; // buf 中未使用的长度
    char buf[]; // 数据空间
};
```

因为 C 语⾔的字符串不记录⾃身的⻓度信息，当需要获取字符串⻓度时，需要遍历整个字符串，时间复杂度为 O(N)。

⽽ SDS 保存了⻓度信息，这样就将获取字符串⻓度的时间由 O(N) 降低到了 O(1)。

![三分恶面渣逆袭：SDS](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-7c038f2c-b5ee-4229-9449-713fab3b1855.png)

#### 简单介绍下链表 linkedlist

Redis 的链表是⼀个双向⽆环链表结构，和 Java 中的 [LinkedList](https://javabetter.cn/collection/linkedlist.html) 类似。

链表的节点由⼀个叫做 listNode 的结构来表示，每个节点都有指向其前置节点和后置节点的指针，同时头节点的前置和尾节点的后置均指向 null。

![三分恶面渣逆袭：链表linkedlist](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-1adef9c0-8feb-4836-8997-84bda96e2498.png)

#### 简单介绍下字典 dict

⽤于保存键值对的抽象数据结构。Redis 使⽤ hash 表作为底层实现，一个哈希表里可以有多个哈希表节点，而每个哈希表节点就保存了字典里中的一个键值对。

每个字典带有两个 hash 表，供平时使⽤和 rehash 时使⽤，hash 表使⽤链地址法来解决键冲突，被分配到同⼀个索引位置的多个键值对会形成⼀个单向链表，在对 hash 表进⾏扩容或者缩容的时候，为了服务的可⽤性，rehash 的过程不是⼀次性完成的，⽽是渐进式的。

![三分恶面渣逆袭：字典](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-9934b4a2-c253-4d42-acf4-c6c940840779.png)

#### 简单介绍下跳跃表 skiplist

推荐阅读：[全网最详细的跳表文章](https://www.jianshu.com/p/9d8296562806)

跳跃表（也称跳表）是有序集合 Zset 的底层实现之⼀。在 Redis 7.0 之前，如果有序集合的元素个数小于 128 个，并且每个元素的值小于 64 字节时，Redis 会使用压缩列表作为 Zset 的底层实现，否则会使用跳表；在 Redis 7.0 之后，压缩列表已经废弃，交由 listpack 来替代。

![三分恶面渣逆袭：跳表](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-886ee2a8-fb02-4908-bbba-d4ad2a211094.png)

跳表由 zskiplist 和 zskiplistNode 组成，zskiplist ⽤于保存跳表的基本信息（表头、表尾、⻓度、层高等）。

```c
typedef struct zskiplist {
    struct zskiplistNode *header, *tail;
    unsigned long length;
    int level;
} zskiplist;
```

zskiplistNode ⽤于表示跳表节点，每个跳表节点的层⾼是不固定的，每个节点都有⼀个指向保存了当前节点的分值和成员对象的指针。

```c
typedef struct zskiplistNode {
    sds ele;
    double score;
    struct zskiplistNode *backward;
    struct zskiplistLevel {
        struct zskiplistNode *forward;
        unsigned int span;
    } level[];
} zskiplistNode;
```



#### 简单介绍下整数集合 intset

⽤于保存整数值的集合抽象数据结构，不会出现重复元素，底层实现为数组。

![整数集合intset](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-833dbfb2-7c79-4e7b-a143-8a4a2936cdd8.png)

#### 简单介绍下压缩列表 ziplist

压缩列表是为节约内存⽽开发的顺序性数据结构，它可以包含任意多个节点，每个节点可以保存⼀个字节数组或者整数值。

![压缩列表组成](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-99bcbe82-1d91-41bf-8900-a240856071f5.png)

#### 简单介绍下紧凑列表 listpack

listpack 是 Redis 用来替代压缩列表（ziplist）的一种内存更加紧凑的数据结构。

![极客时间：listpack](https://cdn.tobebetterjavaer.com/stutymore/redis-20240403105313.png)

为了避免 ziplist 引起的连锁更新问题，listpack 中的元素不再像 ziplist 那样，保存其前一个元素的长度，而是保存当前元素的编码类型、数据，以及编码类型和数据的长度。

![极客时间：listpack 的元素](https://cdn.tobebetterjavaer.com/stutymore/redis-20240403105754.png)

listpack 每个元素项不再保存上一个元素的长度，而是优化元素内字段的顺序，来保证既可以从前也可以向后遍历。

但因为 List/Hash/Set/ZSet 都严重依赖 ziplist，所以这个替换之路很漫长。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动商业化一面的原题：说说 Redis 的 zset，什么是跳表，插入一个节点要构建几层索引
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 9 飞书后端技术一面面试原题：Redis 的数据类型，ZSet 的实现
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小米暑期实习同学 E 一面面试原题：你知道Redis的zset底层实现吗
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 23 QQ 后台技术一面面试原题：zset 的底层原理
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的快手面经同学 7 Java 后端技术一面面试原题：说一下ZSet底层结构

### 47.Redis 的 SDS 和 C 中字符串相比有什么优势？

C 语言使用了一个长度为 `N+1` 的字符数组来表示长度为 `N` 的字符串，并且字符数组最后一个元素总是 `\0`，这种简单的字符串表示方式 不符合 Redis 对字符串在安全性、效率以及功能方面的要求。

![C语言的字符串](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-2541fd26-4e84-467d-8d8c-c731154a85d7.png)

**C 语言的字符串可能有什么问题？**

这样简单的数据结构可能会造成以下一些问题：

- **获取字符串长度复杂度高** ：因为 C 不保存数组的长度，每次都需要遍历一遍整个数组，时间复杂度为 O(n)；
- 不能杜绝 **缓冲区溢出/内存泄漏** 的问题 : C 字符串不记录自身长度带来的另外一个问题是容易造成缓存区溢出（buffer overflow），例如在字符串拼接的时候，新的
- C 字符串 **只能保存文本数据** → 因为 C 语言中的字符串必须符合某种编码（比如 ASCII），例如中间出现的 `'\0'` 可能会被判定为提前结束的字符串而识别不了；

**Redis 如何解决？优势？**

![Redis sds](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-fc26a4e7-1c8d-4e82-b7f8-1f6b43d16d38.png)

简单来说一下 Redis 如何解决的：

1. **多增加 len 表示当前字符串的长度**：这样就可以直接获取长度了，复杂度 O(1)；
2. **自动扩展空间**：当 SDS 需要对字符串进行修改时，首先借助于 `len` 和 `alloc` 检查空间是否满足修改所需的要求，如果空间不够的话，SDS 会自动扩展空间，避免了像 C 字符串操作中的溢出情况；
3. **有效降低内存分配次数**：C 字符串在涉及增加或者清除操作时会改变底层数组的大小造成重新分配，SDS 使用了 **空间预分配** 和 **惰性空间释放** 机制，简单理解就是每次在扩展时是成倍的多分配的，在缩容是也是先留着并不正式归还给 OS；
4. **二进制安全**：C 语言字符串只能保存 `ascii` 码，对于图片、音频等信息无法保存，SDS 是二进制安全的，写入什么读取就是什么，不做任何过滤和限制；

### 48.字典是如何实现的？Rehash 了解吗？

字典是 Redis 服务器中出现最为频繁的复合型数据结构。除了 **hash** 结构的数据会用到字典外，整个 Redis 数据库的所有 `key` 和 `value` 也组成了一个 **全局字典**，还有带过期时间的 `key` 也是一个字典。_(存储在 RedisDb 数据结构中)_

**字典结构是什么样的呢？**

**Redis** 中的字典相当于 Java 中的 **HashMap**，内部实现也差不多类似，采用哈希与运算计算下标位置；通过 **"数组 + 链表" **的**链地址法** 来解决哈希冲突，同时这样的结构也吸收了两种不同数据结构的优点。

![Redis字典结构](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-e08347a6-efd5-47c0-9adb-23baff82dbbd.png)

**字典是怎么扩容的？**

字典结构内部包含 **两个 hashtable**，通常情况下只有一个哈希表 ht[0] 有值，在扩容的时候，把 ht[0]里的值 rehash 到 ht[1]，然后进行 **渐进式 rehash** ——所谓渐进式 rehash，指的是这个 rehash 的动作并不是一次性、集中式地完成的，而是分多次、渐进式地完成的。

待搬迁结束后，h[1]就取代 h[0]存储字典的元素。

### 49.跳表是如何实现的？原理？

跳表（skiplist）是一种有序的数据结构，它通过在每个节点中维持多个指向其它节点的指针，从而达到快速访问节点的目的。

![三分恶面渣逆袭：跳表](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-08391728-5ba8-42a0-a287-9284451e0ee7.png)

#### 为什么使用跳表？

首先，因为 zset 要支持随机的插入和删除，所以它 **不宜使用数组来实现**，关于排序问题，我们也很容易就想到 **红黑树/ 平衡树** 这样的树形结构，为什么 Redis 不使用这样一些结构呢？

1. **性能考虑：** 在高并发的情况下，树形结构需要执行一些类似于 rebalance 这样的可能涉及整棵树的操作，相对来说跳跃表的变化只涉及局部；
2. **实现考虑：** 在复杂度与红黑树相同的情况下，跳跃表实现起来更简单，看起来也更加直观；

基于以上的一些考虑，Redis 基于 **William Pugh** 的论文做出一些改进后采用了 **跳跃表** 这样的结构。

本质是解决查找问题。

#### 跳跃表是怎么实现的？

跳跃表的节点里有这些元素：

①、**层**

跳跃表节点的 level 数组可以包含多个元素，每个元素都包含一个指向其它节点的指针，程序可以通过这些层来加快访问其它节点的速度，一般来说，层的数量月多，访问其它节点的速度就越快。

每次创建一个新的跳跃表节点的时候，程序都根据幂次定律，随机生成一个介于 1 和 32 之间的值作为 level 数组的大小，这个大小就是层的“高度”

②、**前进指针**

每个层都有一个指向表尾的前进指针（`level[i].forward` 属性），用于从表头向表尾方向访问节点。

我们看一下跳跃表从表头到表尾，遍历所有节点的路径：
  
![三分恶面渣逆袭：通过前进指针遍历](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-b153f782-e2e5-4f98-b251-04f06e16c073.png)

③、**跨度**

层的跨度用于记录两个节点之间的距离。跨度是用来计算排位（rank）的：在查找某个节点的过程中，将沿途访问过的所有层的跨度累计起来，得到的结果就是目标节点在跳跃表中的排位。

例如查找，分值为 3.0、成员对象为 o3 的节点时，沿途经历的层：查找的过程只经过了一个层，并且层的跨度为 3，所以目标节点在跳跃表中的排位为 3。

![三分恶面渣逆袭：计算节点的排位](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-d2395b7e-2f31-4ca8-b06d-2cb47afaeb74.png)

④、**分值和成员**

节点的分值（score 属性）是一个 double 类型的浮点数，跳跃表中所有的节点都按分值从小到大来排序。

节点的成员对象（obj 属性）是一个指针，它指向一个字符串对象，而字符串对象则保存这一个 SDS 值。

#### 为什么hash表范围查询效率比跳表低？

哈希表是一种基于键值对的数据结构，主要用于快速查找、插入和删除操作。

哈希表通过计算键的哈希值来确定值的存储位置，这使得它在单个元素的访问上非常高效，时间复杂度为 O(1)。

然而，哈希表内的元素是无序的。因此，对于范围查询（如查找所有在某个范围内的元素），哈希表无法直接支持，必须遍历整个表来检查哪些元素满足条件，这使得其在范围查询上的效率低下，时间复杂度为 O(n)。

跳表是一种有序的数据结构，能够保持元素的排序顺序。

它通过多层的链表结构实现快速的插入、删除和查找操作，其中每一层都是下一层的一个子集，并且元素在每一层都是有序的。

当进行范围查询时，跳表可以从最高层开始，快速定位到范围的起始点，然后沿着下一层继续直到找到范围的结束点。这种分层的结构使得跳表在进行范围查询时非常高效，时间复杂度为 O(log n) 加上范围内元素的数量。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小米暑期实习同学 E 一面面试原题：为什么hash表范围查询效率比跳表低
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 23 QQ 后台技术一面面试原题：zset 的底层原理

### 50.压缩列表了解吗？

压缩列表是 Redis **为了节约内存** 而使用的一种数据结构，是由一系列特殊编码的连续内存快组成的顺序型数据结构。

一个压缩列表可以包含任意多个节点（entry），每个节点可以保存一个字节数组或者一个整数值。

![压缩列表组成部分](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-6be492f7-9f92-4607-a4c4-81a612a3d7bd.png)压缩列表由这么几部分组成：

- **zlbyttes**:记录整个压缩列表占用的内存字节数
- **zltail**:记录压缩列表表尾节点距离压缩列表的起始地址有多少字节
- **zllen**:记录压缩列表包含的节点数量
- **entryX**:列表节点
- **zlend**:用于标记压缩列表的末端

![压缩列表示例](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-b5d224c2-53ee-40a3-9efc-2feb7dd3d7a8.png)

### 51.快速列表 quicklist 了解吗？

Redis 早期版本存储 list 列表数据结构使用的是压缩列表 ziplist 和普通的双向链表 linkedlist，也就是说当元素少时使用 ziplist，当元素多时用 linkedlist。

但考虑到链表的附加空间相对较高，`prev` 和 `next` 指针就要占去 `16` 个字节（64 位操作系统占用 `8` 个字节），另外每个节点的内存都是单独分配，会家具内存的碎片化，影响内存管理效率。

后来 Redis 新版本（3.2）对列表数据结构进行了改造，使用 `quicklist` 代替了 `ziplist` 和 `linkedlist`，quicklist 是综合考虑了时间效率与空间效率引入的新型数据结构。

quicklist 由 list 和 ziplist 结合而成，它是一个由 ziplist 充当节点的双向链表。
![quicklist](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-3b9785b0-6573-4c2d-8b7d-d5d1be799e26.png)

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括 Java 基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM 等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

## 其他问题

### 52.假如 Redis 里面有 1 亿个 key，其中有 10w 个 key 是以某个固定的已知的前缀开头的，如何将它们全部找出来？

使用 `keys` 指令可以扫出指定模式的 key 列表。但是要注意 keys 指令会导致线程阻塞一段时间，线上服务会停顿，直到指令执行完毕，服务才能恢复。这个时候可以使用 `scan` 指令，`scan` 指令可以无阻塞的提取出指定模式的 `key` 列表，但是会有一定的重复概率，在客户端做一次去重就可以了，但是整体所花费的时间会比直接用 `keys` 指令长。

> 图文详解 53 道 Redis 面试高频题，这次吊打面试官，我觉得稳了（手动 dog）。整理：沉默王二，戳[转载链接](https://mp.weixin.qq.com/s/19u34NXALB1nOlBCE6Eg-Q)，作者：三分恶，戳[原文链接](https://mp.weixin.qq.com/s/iJtNJYgirRugNBnzxkbB4Q)。

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

---

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括 Java 基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM 等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
