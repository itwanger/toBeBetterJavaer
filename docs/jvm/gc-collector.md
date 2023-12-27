---
title: Java中9种常见的CMS GC问题分析与解决
shortTitle: 9种常见的CMS GC问题分析与解决
category:
  - Java核心
tag:
  - Java虚拟机
description: 二哥的Java进阶之路，小白的零基础Java教程，从入门到进阶，Java中9种常见的CMS GC问题分析与解决
head:
  - - meta
    - name: keywords
      content: Java,JavaSE,教程,二哥的Java进阶之路,jvm,Java虚拟机,cms
---
 
# 垃圾收集器

就目前来说，JVM 的垃圾收集器主要分为两大类：**分代收集器**和**分区收集器**，分代收集器的代表是 CMS，分区收集器的代表是 G1 和 ZGC，下面我们来看看这两大类的垃圾收集器。

![](https://cdn.tobebetterjavaer.com/stutymore/gc-collector-20231227143820.png)

## 分代收集器

### ParNew

一款多线程的收集器，采用复制算法，主要工作在 Young 区，可以通过 `-XX:ParallelGCThreads` 参数来控制收集的线程数，整个过程都是 STW 的，常与 CMS 组合使用。

>Young 区也就是[上一节](https://javabetter.cn/jvm/gc.html)讲过的新生代；STW 也就是[上一节](https://javabetter.cn/jvm/gc.html)讲过的 Stop The World。

### CMS

以获取最短回收停顿时间为目标，采用“标记-清除”算法，分 4 大步进行垃圾收集，其中初始标记和重新标记会 STW ，多数应用于互联网站或者 B/S 系统的服务器端上，JDK9 被标记弃用，JDK14 被删除，详情可见 [JEP 363](https://openjdk.java.net/jeps/363)。

>标记-清除算法我们[上一节](https://javabetter.cn/jvm/gc.html)也讲过了，忘记的[球友](https://javabetter.cn/zhishixingqiu/)可以回顾一下。

## 分区收集器

### G1

一种服务器端的垃圾收集器，应用在多处理器和大容量内存环境中，在实现高吞吐量的同时，尽可能地满足垃圾收集暂停时间的要求。

### ZGC

JDK11 中推出的一款低延迟垃圾回收器，适用于大内存低延迟服务的内存管理和回收，SPEC jbb 2015 基准测试，在 128G 的大堆下，最大停顿时间才 1.68 ms，停顿时间远胜于 G1 和 CMS。


----

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)