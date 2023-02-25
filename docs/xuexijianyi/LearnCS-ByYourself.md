---
title: 计算机专业该如何自学编程，看哪些书哪些视频哪些教程？
shortTitle: 计算机专业该如何自学编程？
description: CS 自学指南（Java编程语言、数据库、数据结构与算法、计算机组成原理、操作系统、计算机网络、英语、简历、面试）
tag:
  - 学习建议
category:
  - 学习建议
head:
  - - meta
    - name: keywords
      content: 编程,计算机专业,视频,书籍
---

## [](#前言)前言

回想起我的大学之路，难免觉得有些遗憾，因为学校的整体教学水平有限，而自己又缺乏主动去学习的意愿，就导致蹉跎了不少光阴。

幸好，工作中感受到生存的压力后幡然醒悟，因为我有这样一种紧迫感——再不抓紧点时间去学习，可能就像某某某同事一样被公司无情地辞退了。

于是，我便真正走上了一条自学计算机的“不归路”。说“不归路”的原因在于，计算机科学是一个非常庞大的知识体系，我花了好多年的时间，仍然感觉到这条路上还有很多的未知等待我去探索。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexijianyi/LearnCS-ByYourself-70e25595-b36b-408c-a8e4-3a67261826da.png)



但正因为有太多的未知需要我去探索，所以我每天都能感受到自己在进步，我完全不需要花费数年的光阴去攻读一个学位证书，仅仅依靠我自己，就能获得世界上一流水平的教育。

互联网上到处都是可以学习的资源，然而精华与糟粕并存。我们需要的，不是“100G”的免费视频教程，或者“500本”的免费电子书，而是：

*   我们应当学习哪些科目，为什么？
*   对于这些科目，最好的书籍或者视频课程是什么？

如果你要学习物理，我推荐你顺着物理的发展史学习，先学习牛顿的经典物理，再学习热力学、电磁学，然后学习相对论、量子力学这些彻底推翻经典物理的，最后学习电动力学这种硬核的。

整个学习过程，是**自底向上**的。但是学计算机，这样行不通。

先学习电路，然后学习冯诺依曼结构，造一台计算机？接着再学习如何用汇编写个 mini os？接着学习如何写一个简易版的编译器？最后再学习高级编程语言，比如说 Java、Python？

显然这样是行不通的！计算机的学习最好是**自顶向下**。

一开始，应该先学一门高级的编程语言，比如说 Java。之后，当你了解到 Java 的性能问题时，你才会发现，啊，原来 Java 是一门解释型的编程语言，而 C 语言是一门编译型的编程语言，所以 Unix/Linux 这种操作系统要用 C 语言来实现，因为要最大限度的利用硬件。

当你学习到 Java 并发编程中的“原子性”、“同步”、“异步”、“进程”、“内存分配”这些概念的时候，你自然而然会产生很多疑问，然后就会去学习操作系统，学习计算机组成原理，然后你的一系列问题就会逐渐被解决。

当你发现，用 Java 实现某个业务需求时，人家的算法实现比你快得多，你自然会好奇，为什么会这样？然后你发现人家用的数据结构和你的不同，然后你就会去学习数据结构，接着了解一些高效的算法，比如动态规划等。

**跟着需求去学习，才能真正学好计算机**。没有编程基础就去啃《深入理解计算机系统》这类黑皮书，你很快就会被劝退的。

## [](#编程语言)编程语言

编程语言有很多种，Java、Python、C/C++、Go、JavaScript 等等，新手往往会非常纠结，因为害怕失去，即便是还没有一丁点收获之前。

选择 Java 吧，常听人说“人生苦短，我用 Python”；选择 Python 吧，常听人说“Go 是 Google 的亲儿子，发展势头正劲”；选择 Go 吧，常听人说“前端（JavaScript 必学）更容易学习一些”；选择 JavaScript 吧，常听人说“C/C++ 具备现代程序设计的基础要求，是很多编程语言的基础。”

然后就麻了！怎么选呢？

我是从大一就开始学习的 Java，当时没有选择，因为不知道还有其他编程语言（嘘），学校让学 Java 就学了 Java。只能说非常的幸运，选对了。

你可以去编程语言排行榜（TIOBE，非常权威）看一下——关于近 10 年编程语言的变化。Java 长期霸占着这份榜单，并且还会持续更久，一门编程语言能有这么顽强的生命力，它一定有别的语言所没有的优点，它与生俱来的竞争力是别的语言无法取代的。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexijianyi/LearnCS-ByYourself-322598db-68da-4003-ad38-430fed540d77.png)


### [](#java-基础)Java 基础


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexijianyi/LearnCS-ByYourself-ad65b6e6-7880-4c6d-9af2-24597046a77d.png)


可以直接看二哥的 [Java程序员进阶之路](https://tobebetterjavaer.com/)，这是一份通俗易懂、风趣幽默的Java学习指南，内容涵盖Java基础、Java并发编程、Java虚拟机、Java企业级开发、Java面试等核心知识点。学Java，就认准Java程序员进阶之路😄

有了 Java程序员进阶之路，你甚至不用去看《Java核心技术卷一》。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexijianyi/LearnCS-ByYourself-52514452-0643-4c42-8e61-616ff04ed56c.png)



尽管《[Java核心技术卷一](https://book.douban.com/subject/34898994/)》号称是一本非常适合拿来作为学习 Java 的入门书。

*   第三章中的数据类型、变量与常量、运算符、字符串、输入与输出、控制流程、数组；
*   第四章中的对象与类、构造方法、final、static、方法参数、方法重载、包、注释；
*   第五章的继承、多态、抽象类、方法重写、枚举、反射；
*   第六章的接口、Lambda 表达式、内部类、代理；
*   第七章的异常、try-with-resource、日志；
*   第八章的泛型；
*   第九章的集合、链表、队列、Map、栈、算法；
*   第十二章的并发编程、线程、同步、synchronized、volatile、原子性、死锁、阻塞队列、CurrentHashMap、CopyOnWriteArrayList、线程池、Callable与Future、fork-join框架、进程；

因为这本书里囊括的 Java 基础知识，《Java程序员进阶之路》网站上都囊括了！再推荐两套学习 Java 的视频，戳链接可直达。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexijianyi/LearnCS-ByYourself-4f7920ff-0dd4-4070-af9d-9f19796efb6c.png)


[一套是动力节点的，B 站上有超过一千万的播放量](https://www.bilibili.com/video/BV1Rx411876f)


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexijianyi/LearnCS-ByYourself-c28c2bc4-7c46-4504-bcf2-da1c8a813153.png)


[一套是尚硅谷的，宋红康老师讲解的](https://www.bilibili.com/video/BV1Kb411W75N)

### [](#并发编程)并发编程

并发编程的部分比较难一些，需要花时间和精力更专注地学一下。



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexijianyi/LearnCS-ByYourself-1f0a8b9d-43f4-42c1-9114-12103db32e80.png)


可以看一下这份《[深入浅出 Java 多线程](https://tobebetterjavaer.com/pdf/java-concurrent.html)》，几位在大厂工作过的技术大佬开源的，为了写好这份小册子，他们阅读了大量的 Java 并发编程方面的书籍和技术博客，加上他们在工作中积累的一线开发经验，汇聚而成。

我把并发编程中经常被问到的面试题列举一下，你可以拿来自测：

*   并行和并发有什么区别?
*   线程和进程的区别?
*   守护线程是什么?
*   创建线程有哪几种方式?
*   说一下 runnable 和 callable 有什么区别?
*   线程有哪些状态?
*   sleep() 和 wait() 有什么区别?
*   notify()和 notifyAll()有什么区别?
*   线程的 run()和 start()有什么区别?
*   创建线程池有哪几种方式?
*   线程池都有哪些状态?
*   线程池中 submit()和 execute()方法有什么区别?
*   在 java 程序中怎么保证多线程的运行安全?
*   多线程中 synchronized 锁升级的原理是什么?
*   什么是死锁?
*   怎么防止死锁?
*   ThreadLocal 是什么?有哪些使用场景?
*   说一下 synchronized 底层实现原理?
*   synchronized 和 volatile 的区别是什么?
*   synchronized 和 Lock 有什么区别?
*   synchronized 和 ReentrantLock 区别是什么?
*   说一下 atomic 的原理?
*   Java 内存模型（JMM）、重排序与 happens-before 原则了解吗？
*   AQS了解么？原理？AQS 常用组件：Semaphore (信号量)、CountDownLatch （倒计时器） CyclicBarrier(循环栅栏)
*   ReentrantLock 、 ReentrantReadWriteLock
*   CAS 了解么？原理？
*   并发容器：ConcurrentHashMap 、 CopyOnWriteArrayList 、 ConcurrentLinkedQueueBlockingQueue 、ConcurrentSkipListMap
*   Future 和 CompletableFuture

### [](#jvm)JVM
![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexijianyi/LearnCS-ByYourself-824cf838-00ac-4ebe-b887-3e1e212e5b54.png)



周志明老师的《[深入理解 Java 虚拟机](https://book.douban.com/subject/34907497/)》绝对是学习 Java 虚拟机的首选。自 2011 年上市以来，前两版累计销量超过 30 万册，第 3 版在第 2 版的基础上做了重大修订，内容更丰富、实战性更强。

*   第二部分（2-5章），主要涉及到内存管理、垃圾收集、性能监控等；
*   第三部分（6-9章），主要涉及到类文件结构、类加载机制、字节码执行引擎等；

第二部分和第三部分是学习的重点。我把 JVM 中经常被问到的面试题列举一下，你可以拿来自测：

*   说一下 JVM 的主要组成部分?及其作用?
*   说一下 JVM 运行时数据区?
*   什么是双亲委派模型?
*   说一下类装载的执行过程?
*   怎么判断对象是否可以被回收?
*   说一下 JVM 有哪些垃圾回收算法?
*   说一下 JVM 有哪些垃圾回收器?
*   详细介绍一下 CMS 垃圾回收器?
*   新生代垃圾回收器和老生代垃圾回收器都有哪些?有什么区别?
*   简述分代垃圾回收器是怎么工作的?
*   说一下 JVM 调优的工具?
*   常用的 JVM 调优的参数都有哪些?

其实学习 Java 虚拟机不只是为了面试，还能帮我们更深入地理解 Java 这门语言，也能为线上排查问题打下基础。

### [](#spring)Spring

网上总一些人，会很偏激，认为学 Spring 全家桶没什么用，他的理由是技术迭代太快，框架迟早是会被淘汰的，等你学会了，没准框架就过时了。还有一些人会杠，怎么 Java 程序员变成了 Spring 程序员呢？

怎么说呢？对于 Java Web 开发来说，Spring 已经成为和 Java 核心库一样的基础设施，如果你想成为一名合格的 Java 程序员，Spring 是必经之路。

另外，一个很重要的点，就是，自学的过程中，你是没有时间或者没有能力徒手撸一个像 Spring 这样强大的框架的。有了 Spring，就有 AOP 和 IoC，意味着你可以做一些企业级的开发了。再说，Spring 是建立在 Java 之上的一个框架，核心就是 AOP 和 IoC，如果 Java 基础不牢的话，也学不会 Spring。

你可以先学习 SSM（Spring+Spring MVC+MyBatis），再学习 Spring Boot。Spring Boot 的出现，并不意味着 Spring 和 SpringMVC 已经过时了，从设计目的上来说，Spring Boot 只是实现了 Spring 的自动装配，降低了项目搭建的难度。

推荐两个视频：

*   [江南一点雨的 SSM 实战 100 集](https://www.bilibili.com/video/BV1NX4y1G7wx)
*   [狂神说的 SpringBoot 视频课](https://www.bilibili.com/video/BV1PE411i7CV)

#### [](#副本)副本

前面是主线，接下来是副本，有时间有精力就可以刷一波。刷副本的作用就是积累声望和经验，让你变得更强壮，好在下一关有更突出的表现。

书籍：

*   《[Head First Java](https://book.douban.com/subject/2000732/)》
*   《[Java 编程思想](https://book.douban.com/subject/2130190/)》
*   《[Java 并发编程实战](https://book.douban.com/subject/10484692/)》
*   《[Effective Java](https://book.douban.com/subject/30412517/)》
*   《[阿里巴巴 Java 开发手册](https://mp.weixin.qq.com/s/6jDHa8UgN0Ceqn3nyQ7dUQ)》
*   《[代码整洁之道](https://book.douban.com/subject/4199741/)》

视频：

*   [尚硅谷的 Intellij IDEA 视频课](https://www.bilibili.com/video/BV1DJ411B7cG)
*   [尚硅谷的 Maven 视频课](https://www.bilibili.com/video/BV1TW411g7hP)
*   [狂神说的 Git 视频课](https://www.bilibili.com/video/BV1FE411P7B3)
*   [尚硅谷的 JVM 视频课](https://www.bilibili.com/video/av83622425)

开源&官方文档：

*   [MyBatis 官方文档](https://mybatis.org/mybatis-3/zh/java-api.html)
*   [Intellij IDEA 中文教程](https://dancon.gitbooks.io/intellij-idea/content/)

付费课程：

*   [Java并发编程实战](http://gk.link/a/10sUq)
*   [深入拆解Java虚拟机](http://gk.link/a/10sUp)
*   [Netty 入门与实战：仿写微信 IM 即时通讯系统](https://juejin.cn/book/6844733738119593991)

### one more thing：

关于编程语言这块，我希望你能再学习一门编程语言，也就是 C 语言，不管是放在一开始学，还是放在学习 Java 语言之后再补，都是有必要的。

因为我们学的是计算机科学（CS），C 语言是一门古老而常青的编程语言，具备现代程序设计的基础要求，它的语法是很多编程语言的基础，比如说 Java。

给你推荐一门课，浙江大学翁恺教授的《[程序设计入门——C语言](https://www.icourse163.org/course/ZJU-199001?from=searchPage#/info)》，国家级精品课，很适合初学者。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexijianyi/LearnCS-ByYourself-2535b639-2213-4dcf-9d73-42595a5fcbc8.png)



翁恺老师在推荐这门课的时候说过，“这门课就是关于计算机的那些程序是如何被写出来的，写出来的这些人就是普通的人，那么我们当然也能学会怎么把程序写出来。学习编程最基础的那些东西，无非就是如何表达数据，如何计算，如何在计算的时候使用判断啊、循环啊这些手段。”



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexijianyi/LearnCS-ByYourself-7c60d140-e4d5-449d-9026-67867b9fa008.png)



再推荐一本书，《[C 程序设计语言](https://book.douban.com/subject/1139336/)》，我们熟知的“hello World”入门小程序其实就是由这本书首次引入的。对于学习计算机专业的同学来说，《C 程序设计语言》是一本必读的经典书。

## [](#数据库)数据库

学习一门编程语言，如果不去操作下数据，就感觉这门编程语言空有皮囊却没有灵魂。

### [](#sql)SQL


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexijianyi/LearnCS-ByYourself-d0f18a18-a76a-413b-91b9-3dd7d99a2c76.png)



《[SQL 必知必会](https://book.douban.com/subject/35167240/)》是麻省理工学院、伊利诺伊大学等众多大学的参考教材，这本书直接从 SQL 的 SELECT 开始，讲述了实际工作环境中最常用和最必需的 SQL 知识，实用性极强。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexijianyi/LearnCS-ByYourself-e8761c04-2585-4bbc-b84b-fb5fd5c9ceaf.png)



CodeWithMosh 是目前市面上能找到的逻辑最清晰，最简单易懂的 SQL 视频教程。尤其对初学者而言，直接入手这个版本能塑造良好的 SQL 编写思维和逻辑能力。

[「中字」SQL进阶教程 | 史上最易懂SQL教程！10小时零基础成长SQL大师！！](https://www.bilibili.com/video/BV1UE41147KC)

### [](#mysql)MySQL



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexijianyi/LearnCS-ByYourself-eb7ddcc0-4592-497a-abe4-356211e53577.png)


《[高性能 MySQL](https://book.douban.com/subject/23008813/)》，业界公认的一本经典的 MySQL 读物，书中没有各种提升性能的秘籍，而是深入问题的核心，详细的解释了每种提升性能的原理，从而可以使你四两拨千斤。



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexijianyi/LearnCS-ByYourself-235a7d96-699d-4c8c-8f90-114f2aef22fc.png)



尚硅谷的这个视频课讲得真的挺不错的，[MySQL\_基础+高级篇](https://www.bilibili.com/video/BV12b411K7Zu)。

### [](#redis)Redis



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexijianyi/LearnCS-ByYourself-f7d8b6a5-8764-41a9-8bb5-7a8a8f16a7f8.png)



《[Redis 深入历险核心原理与应用实战](https://book.douban.com/subject/30386804/)》分为基础和应用篇、原理篇、集群篇、拓展篇、源码篇共 5 大块内容。基础和应用篇讲解对读者来说最有价值的内容，可以直接应用到实际工作中；原理篇、集群篇让开发者透过简单的技术表面看到精致的底层世界；拓展篇帮助读者拓展技术视野和夯实基础，便于进阶学习；源码篇让高阶的读者能够读懂源码，掌握核心技术实力。

在线网站：

*   [MySQL Tutorial](https://www.mysqltutorial.org/)

其他书籍：

*   [MySQL必知必会](https://book.douban.com/subject/3354490/)
*   [MySQL技术内幕-InnoDB存储引擎](https://book.douban.com/subject/24708143/)

极客时间付费课程：

*   [SQL必知必会-从入门到数据实战](http://gk.link/a/10sUK)
*   [MySQL必知必会-在真实项目中玩转 MySQL](http://gk.link/a/10sUL)
*   [MySQL实战45讲-从原理到实战，丁奇带你搞懂MySQL](http://gk.link/a/10sUM)
*   [Redis核心技术与实战-从原理到实战，彻底吃透 Redis](http://gk.link/a/10sFU)

## [](#数据结构与算法)数据结构与算法

计算机科学所赋予人们的最大能量在于对常见算法和数据结构的熟悉。此外，这也可以训练一个人对于各种问题的解决能力，有助于其他领域的学习。



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexijianyi/LearnCS-ByYourself-120c9bac-6cfd-4e5d-9a26-124f6af4121e.png)



虽然名为《[算法](https://book.douban.com/subject/19952400/)》，但算法是基于数据结构的，数组、队列、栈、堆、二叉树、哈希表等等，这些数据结构这本书都讲到了。



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexijianyi/LearnCS-ByYourself-019086f2-aa35-4e88-8fd5-a47b9363a89e.png)



如果你更喜欢视频课程，我推荐[浙江大学的一个的视频课](https://www.bilibili.com/video/BV1JW411i731)，很系统很经典，适合小白入门。

至于练习，我推荐你到 LeetCode 上刷题，Leetcode 上的问题往往有趣且带有良好的解法和讨论。此外，在竞争日益激烈的软件行业，这些问题可以帮助你评估自己应对技术面试中常见问题的能力。我建议你至少刷 300 道题，作为学习的一部分。



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexijianyi/LearnCS-ByYourself-bdca293f-0448-46db-b1b9-6e39949b7d8d.png)



我整理的这份 [LeetCode 刷题笔记](https://tobebetterjavaer.com/pdf/java-leetcode.html)足足 300 道，对算法薄弱和需要提高算法的同学很有帮助。

我的心得就是简单粗暴：从易到难，一遍一遍地刷，尽量使用自己熟悉的编程语言，比如说 Java 程序员尽量用 Java 来解题，这样刷题的幸福感也会提升很大一截。

如果不是天赋异禀，不要怕，一开始就是抄题，先把别人的解题思路照着敲出来。刷的题多了，尽量控制一下刷题的时间，掐个点，不能让自己一直想、一直写下去，如果半个小时没有解出来，就果断放弃，去背别人的答案，不要觉得不好意思，等到真的熟了，再去想自己的解题思路。

可以按照下面这个类型来刷就可以了。

数组-> 链表-> 哈希表->字符串->栈->队列->树->回溯->贪心->动态规划->图

其他书籍：

*   [算法设计手册](https://book.douban.com/subject/4048566/)
*   [编程珠玑](https://book.douban.com/subject/26302533/)
*   [剑指Offer：名企面试官精讲典型编程题](https://book.douban.com/subject/27008702/)

极客时间付费课程：

*   [数据结构与算法之美-为工程师量身打造的数据结构与算法私教课](http://gk.link/a/10sUU)

## [](#计算机组成原理)计算机组成原理

计算机组成原理，也叫“计算机系统结构”，是了解软件底层的重要视角，但却很容易被忽略。



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexijianyi/LearnCS-ByYourself-05f90cc6-44bd-42eb-9d2c-23e47bb43db3.png)



《[深入理解计算机系统](https://book.douban.com/subject/5333562/)》这本书站在程序员的视角，非常的使用。虽然计算机的系统结构比这本书涉及到的内容多得多，但却是一个很好的起点。

其他书籍：

*   [计算机系统要素-从零开始构建现代计算机](https://book.douban.com/subject/1998341/)
*   [计算机是怎样跑起来的](https://book.douban.com/subject/26397183/)
*   [计算机组成原理](https://book.douban.com/subject/27051076/)
*   [计算机组成与设计-硬件/软件接口](https://book.douban.com/subject/26604008/)
*   [《编码-印尼在计算机软硬件背后的语言》](https://book.douban.com/subject/4822685/)

视频课程：



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexijianyi/LearnCS-ByYourself-0472d100-5b28-4ec9-a94c-217ad661a157.png)



弄明白了计算机的组成原理，也就对整个软件开发有了一个系统的认知，不论是计算机的硬件原理，还是软件架构，都能很好的驾驭，随之而来的，我们的职业发展机会也就更多了。如果想深入学习计算机组成原理的话，我推荐哈工大的这门视频课，整体评价非常高。

[哈尔滨工业大学-计算机组成原理（唐朔飞）](https://www.bilibili.com/video/BV1WW411Q7PF)

付费课程：

九阳真经是金庸小说《倚天屠龙记》中一本绝顶内功秘笈，程序员的「九阳真经」，我觉得就是计算机组成原理了，因为这里藏着 CPU 运行代码的秘密，藏着虚拟地址转换的秘密，藏着浮点数的秘密……

[深入浅出计算机组成原理-带你掌握计算机体系全貌](http://gk.link/a/10sUT)

## [](#操作系统)操作系统

为什么要学习操作系统呢？第一，面试要考；第二，无论学习哪门子编程语言，比如说 Java、C/C++，都需要和操作系统打交道，像 Java 中的多线程技术，其实是由操作系统来负责进程和线程管理的；第三，学习操作系统，还能学到内存分配方面的知识。



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexijianyi/LearnCS-ByYourself-e7f73611-9a4b-47a1-8703-73456cce988c.png)



《[操作系统概念](https://book.douban.com/subject/30297919/)》 （“龙书”）和 《[现代操作系统](https://book.douban.com/subject/27096665/)》 是操作系统领域的经典书籍。只不过，这两本书对学生来说，不是特别友好，所以遭到了很多批评。

操作系统是计算机系统中负责管理各种软硬件资源的核心系统软件，为应用软件运行提供良好的环境。[清华大学操作系统课-学堂在线](https://www.xuetangx.com/course/THU08091000267/5883104?channel=learn_title)这门课程以主流操作系统为实例，以教学操作系统 ucore 为实验环境，讲授操作系统的概念、基本原理和实现技术，是一门非常值得推荐的视频课。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexijianyi/LearnCS-ByYourself-f43b517a-78c9-4064-836a-6eb275712f88.png)



副本-[计算机科学速成课](https://www.bilibili.com/video/av21376839)：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexijianyi/LearnCS-ByYourself-bbcd0afb-a240-4b56-b3ba-ea8923878ddf.png)



非常值得每个程序员去刷一刷的，全部都是计算机专业需要掌握的知识点，至少是应该了解的知识点。英文中字版的，观看起来毫无压力。

极客时间付费课程：

*   [操作系统实战45讲-从0到1，实现自己的操作系统](http://gk.link/a/10sUV)
*   [趣谈Linux操作系统-像故事一样的操作系统入门课](http://gk.link/a/10sUW)

### [](#计算机网络)计算机网络

鉴于那么多的关于网络服务端和客户端的软件工程，计算机网络是计算机科学中价值最为“立竿见影”的领域之一。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexijianyi/LearnCS-ByYourself-1a95df68-4aab-4e2a-8f72-e14d629819fe.png)



[计算机网络-自顶向下方法](https://book.douban.com/subject/30280001/)是一本我比较钟爱的书籍，书中的小项目和习题非常值得练习，尤其是 [Wireshark labs](https://gaia.cs.umass.edu/kurose_ross/wireshark.htm) 部分。



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexijianyi/LearnCS-ByYourself-dae8a174-e854-487a-badc-bb93ba6f4bbb.png)


B 站上的这个[计算机网络微课堂](https://www.bilibili.com/video/BV1c4411d7jb)视频课非常不错，强烈推荐。

其他书籍：

*   [网络是怎样连接的](https://book.douban.com/subject/26941639/)
*   [图解 HTTP](https://book.douban.com/subject/25863515/)
*   [图解TCP/IP](https://book.douban.com/subject/24737674/)
*   [TCP/IP详解 卷1：协议](https://book.douban.com/subject/1088054/)

### [](#前端全栈)前端&全栈

// TODO

### [](#分布式系统)分布式系统

// TODO

### [](#英语能力)英语能力

对于我们程序员来说，英语就好像空气一样重要，一呼一吸之间都离不开她。如果空气质量不那么好的话，你是不是就有点缺氧的感觉，同样的，如果英语功底差点意思的话，编程也会感到很吃力。

英语用得好，你可以轻松地阅读和查看国外最新的技术文档。

英语用得好，你可以徜徉在源码的海洋里，肆无忌惮地汲取精华。

英语用得好，你可以惬意地聆听斯坦福等名校在网上的公开课，跟随真正的大牛，学到最原汁原味的技术。

英语用得好，退一万步讲，你在敲代码的时候再也不用担心方法、变量和类的命名不够优雅了。



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexijianyi/LearnCS-ByYourself-0eee1a08-7b44-4311-9b00-ef01a0bc0909.png)



前新东方英语老师李笑来在 GitHub 上开源的这份英语学习教程还不错，英文名字叫《[everyone can use english](https://github.com/xiaolai/everyone-can-use-english)》，中文名译作《[人人都能用英语](https://mp.weixin.qq.com/s/yjBldT9YShWd6cnDIg6RuQ)》，已有 5.4k 的 star。

### [](#简历)简历

简历要怎么样写，才能打造一个独一无二的你呢？才能让招聘方知道你做过什么？能做什么呢？我来简单的列举一下。

1）个人信息

*   姓名
*   年龄
*   手机
*   邮箱（推荐使用 Gmail，因为可以无形“高大上”，给招聘方一种专业的 feel）

2）教育经历

只写最高学历就行了；博士就写博士，没必要再写什么时候考的研；本科就写本科，没必要再写什么时候专升本。如果学历不好，也不要担心，可以在项目经验中多突出一些。

3）工作经历

可以根据招聘方的要求，适当地做一些调整，比如说，应聘的岗位是开发，就没有必要写之前做运维，做测试的工作经历。

如果工作经验比较丰富的话，尽量按照时间倒序来写，因为越后面的项目，肯定难度更大，技术含量更高，对吧，不要一步一个台阶往下迈。

懂得适可而止，不要事无巨细，把所有项目的细节都罗列上。只需要交代三个重要的项目就行了。项目的背景是什么，你在其中的职责，项目用到的技术栈（最好是招聘信息上要求的那些），最好突出你做出了哪些特殊的贡献（证明你确实有能力）。

4）加分项

*   有一个访问量很不错的博客。
*   有一个星标很高的开源作品。
*   出过一些技术图书。
*   在行业大会上做过分享。
*   参加过一些出名的竞赛，获得过优异的成绩。
*   记住一点，简历并不是单纯意义上的自我介绍，比如说我是沉默王二，今年 18 岁，来自洛阳，毕业于某某学校。这样的简历太苍白了。

简历就好像电梯广告的单页一样，它富有鲜活的生命力，它在呐喊，它不需要过多的润色，只需要铿锵有力、赤裸裸的“炫耀”。

比如说我是沉默王二， 2019 年参与了 XXX 项目的开发。作为项目团队的核心 开发人员，我不仅能够提前完成自己的开发任务，还设计了一个高效的缓存中间件，大大提高了系统的性能。

该中间件上线后，Web 前端性能从 10 QPS 提升到 120 QPS，服务器由 10 台缩减为 5 台。

鉴于之前的良好表现，我在 2020 年升任项目的主要负责人，虽然小组成员只有 15 个，但硬生生地肩负起了每天超过 2000 万的 PV。

看，这样的简历是不是让人耳目一新，证明自己价值的同时，没有过多的粉饰，让招聘方觉得你很靠谱，迫切地想要把你这个人才“抢”到手，免费被别的公司挖走了。

简历上的内容不要太多，尽量不要超过一页，因为招聘方没有那么多时间去翻看你的简历。我是挺相信第一印象的，好的简历看一眼就会过目不忘，真的。

[入职阿里后，才知道原来简历这么写](https://tobebetterjavaer.com/pdf/jianli.html)

## [](#面经面试题)面经&面试题

你可以把我整理的这份题库过一下，题库分为十九个模块，分别是：Java 基础、容器、多线程、反射、对象拷贝、Java Web 模块、异常、网络、设计模式、Spring/Spring MVC、Spring Boot/Spring Cloud、Hibernate、Mybatis、RabbitMQ、Kafka、Zookeeper、MySql、Redis、JVM，足足 208 道：



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexijianyi/LearnCS-ByYourself-37cbc58f-2ced-4334-abc5-d74263008d80.png)



[可能是2021年最全最硬核的Java面试 “备战” 资料](https://tobebetterjavaer.com/pdf/programmer-111.html)



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexijianyi/LearnCS-ByYourself-57502a19-c872-4a02-8347-3a4231cffd7e.png)



[不好意思！GitHub 星标 100k+的这份面试攻略让我膨胀了](https://mp.weixin.qq.com/s/s0_XzGjHcgk2RwbCRzmgHg)

## [](#全部汇总)全部汇总


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexijianyi/LearnCS-ByYourself-8614a576-2644-4f7a-a0b3-b133c6b35f45.png)



我把所有的电子书都放在另外一个仓库了：

- GitHub：[https://github.com/itwanger/JavaBooks](https://github.com/itwanger/JavaBooks)
- 码云：[https://gitee.com/itwanger/JavaBooks](https://gitee.com/itwanger/JavaBooks)

## [](#常见问题解答)常见问题解答

### [](#这份自学指南的目标受众是)这份自学指南的目标受众是？

*   自学软件的工程师
*   培训班的学生
*   “早熟的”高中生
*   想要变得牛逼的大学生
*   想要进阶的初级工程师

### [](#一定要严格遵守推荐的学习次序吗)一定要严格遵守推荐的学习次序吗？

我推荐的次序主要是为了帮助你起步，如果你出于某种强烈的意愿而倾向以不同的顺序学习，也没有关系，勇敢开始吧！

一个重要的“先决条件”是：

*   你最好先从一门编程语言开始，然后不断纵向和横向扩展；
*   你最好先学计算机组成原理再学操作系统；
*   你最好先学计算机网络和操作系统再学分布式系统；

### [](#xx编程语言怎么样)XX编程语言怎么样?

学习一门特定的编程语言和学习计算机科学的一个领域完全不在一个维度——相比之下，学习编程语言更容易一些；如果你已经熟悉一门编程语言，比如说 Java 或者 C 语言，再学习另外一门编程语言也会非常轻松。

### [](#xx流行技术怎么样)XX流行技术怎么样?

没有任何一种技术的重要程度可以和学习计算机科学的核心部分相媲美，不过，你对学习一门流行的技术充满热情是一件很值得褒奖的事情。

### [](#这份指南是谁写的)这份指南是谁写的？

主笔为**沉默王二**，可以微信搜索“沉默王二”关注我的微信公众号。只要有足够的时间和动力，我非常有信心，你可以自学完以上所有课程。

**所涉及到的电子书，可以通过下面这个仓库下载**：

- GitHub：[https://github.com/itwanger/JavaBooks](https://github.com/itwanger/JavaBooks)
- 码云：[https://gitee.com/itwanger/JavaBooks](https://gitee.com/itwanger/JavaBooks)


