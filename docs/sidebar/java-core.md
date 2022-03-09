# Java核心

> [!TIP]
>  - **Java核心是非常重要的**！所谓基础不牢，地动山摇，很多初学者在初学阶段容易按捺不住，三天打鱼两天晒网，这就会导致后面的学习非常的吃力，所以我的建议是一定要肯花时间花精力把基础部分学扎实了，再开始学习后面的内容。
>  - Java 基础部分可以分为基础篇和进阶篇，基础篇包括基础语法、面向对象、集合框架、异常处理，以及字符串和数组等等重要知识点；进阶篇包括 Java IO、Java 并发编程、Java 虚拟机等等。
>  - 入门阶段，一定要多 coding，不要眼高手低，很多看起来会的知识可能真正实操起来就会出现各种各样的问题，那么只有通过多记多练才能迎刃而解。


## 基础篇

### 面渣逆袭Java基础

> [!ATTENTION]
> 图文详解 53 道Java基础面试高频题，这次吊打面试官，我觉得稳了（手动 dog）。整理：沉默王二，戳[转载链接](https://mp.weixin.qq.com/s/t7EYyF0VGEg1rAZut9dwSw)，作者：三分恶，戳[原文链接](https://mp.weixin.qq.com/s/M-6RSRcRd3X93cR7VXpanw)。

- [Java概述](docs/overview/sanfene/java-gaishu.md)
- [基础语法](docs/overview/sanfene/basic-yufa.md)
- [面向对象](docs/overview/sanfene/object.md)
- [常用类](docs/overview/sanfene/useful-class.md)
- [异常处理](docs/overview/sanfene/exception.md)
- [IO](docs/overview/sanfene/io.md)
- [序列化](docs/overview/sanfene/serializable.md)
- [泛型](docs/overview/sanfene/generics.md)
- [注解](docs/overview/sanfene/zhujie.md)
- [反射](docs/overview/sanfene/fanshe.md)
- [Java新特性](docs/overview/sanfene/news.md)


### Java概述

- [什么是 Java？](docs/overview/what-is-java.md)
- [Java 的发展简史](docs/overview/java-history.md)
- [Java 的优势](docs/overview/java-advantage.md)
- [JDK 和 JRE 有什么区别？](docs/overview/jdk-jre.md)
- [手把手教你安装集成开发环境 Intellij IDEA](docs/overview/idea.md)
- [第一个 Java 程序：Hello World](docs/overview/hello-world.md)


### Java基础语法

- [基本数据类型](docs/basic-grammar/basic-data-type.md)
- [流程控制](docs/basic-grammar/flow-control.md)
- [运算符](docs/basic-grammar/operator.md)
- [注释](docs/basic-grammar/javadoc.md)

### 面向对象

- [什么是对象？什么是类](docs/oo/object-class.md)
- [变量](docs/oo/var.md)
- [方法](docs/oo/method.md)
- [构造方法](docs/oo/construct.md)
- [代码初始化块](docs/oo/code-init.md)
- [抽象类](docs/oo/abstract.md)
- [接口](docs/oo/interface.md)
- [static 关键字](docs/oo/static.md)
- [this 和 super 关键字](docs/oo/this-super.md)
- [final 关键字](docs/oo/final.md)
- [instanceof 关键字](docs/oo/instanceof.md)
- [不可变对象](docs/basic-extra-meal/immutable.md)
- [可变参数](docs/basic-extra-meal/varables.md)
- [泛型](docs/basic-extra-meal/generic.md)
- [注解](docs/basic-extra-meal/annotation.md)
- [枚举](docs/basic-extra-meal/enum.md)
- [反射](docs/basic-extra-meal/fanshe.md)

### 字符串String

- [String 为什么是不可变的？](docs/string/immutable.md)
- [字符串常量池](docs/string/constant-pool.md)
- [深入浅出 String.intern](docs/string/intern.md)
- [如何比较两个字符串是否相等？](docs/string/equals.md)
- [如何拼接字符串？](docs/string/join.md)
- [如何拆分字符串？](docs/string/split.md)

### 数组

- [什么是数组？](docs/array/array.md)
- [如何打印数组？](docs/array/print.md)

### 集合框架（容器）

- [Java 中的集合框架该如何分类？](docs/collection/gailan.md)
- [简单介绍下时间复杂度](docs/collection/big-o.md)
- [ArrayList](docs/collection/arraylist.md)
- [LinkedList](docs/collection/linkedlist.md)
- [ArrayList 和 LinkedList 之增删改查的时间复杂度](docs/collection/list-war-1.md)
- [ArrayList 和 LinkedList 的实现方式以及性能对比](docs/collection/list-war-2.md)
- [Iterator与Iterable有什么区别？](docs/collection/iterator-iterable.md)
- [为什么阿里巴巴强制不要在 foreach 里执行删除操作](docs/collection/fail-fast.md)
- [详细讲解 HashMap 的 hash 原理](docs/collection/hash.md)
- [详细讲解 HashMap 的扩容机制](docs/collection/hashmap-resize.md)
- [HashMap 的加载因子为什么是 0.75？](docs/collection/hashmap-loadfactor.md)
- [为什么 HashMap 是线程不安全的？](docs/collection/hashmap-thread-nosafe.md)


### 异常处理

- [聊聊异常处理机制](docs/exception/gailan.md)
- [关于 try-catch-finally](docs/exception/try-catch-finally.md)
- [关于 throw 和 throws](docs/exception/throw-throws.md)
- [关于 try-with-resouces](docs/exception/try-with-resouces.md)
- [异常处理机制到底该怎么用？](docs/exception/shijian.md)

### 常用工具类

- [数组工具类：Arrays](docs/common-tool/arrays.md)
- [集合工具类：Collections](docs/common-tool/collections.md)
- [简化每一行代码工具类：Hutool](docs/common-tool/hutool.md)
- [Guava，拯救垃圾代码，效率提升N倍](docs/common-tool/guava.md)

### Java8新特性

- [入门Java Stream流](https://mp.weixin.qq.com/s/7hNUjjmqKcHDtymsfG_Gtw)
- [Java 8 Optional 最佳指南](https://mp.weixin.qq.com/s/PqK0KNVHyoEtZDtp5odocA)
- [Lambda 表达式入门](https://mp.weixin.qq.com/s/ozr0jYHIc12WSTmmd_vEjw)

### 重要知识点

- [Java 中常用的 48 个关键字](docs/basic-extra-meal/48-keywords.md)
- [Java 命名的注意事项](docs/basic-extra-meal/java-naming.md)
- [详解 Java 的默认编码方式 Unicode](docs/basic-extra-meal/java-unicode.md)
- [new Integer(18)与Integer.valueOf(18)有什么区别？](docs/basic-extra-meal/int-cache.md)
- [聊聊自动拆箱与自动装箱](docs/basic-extra-meal/box.md)
- [浅拷贝与深拷贝究竟有什么不一样？](docs/basic-extra-meal/deep-copy.md)
- [为什么重写 equals 时必须重写 hashCode 方法？](docs/basic-extra-meal/equals-hashcode.md)
- [方法重载和方法重写有什么区别？](docs/basic-extra-meal/override-overload.md)
- [Java 到底是值传递还是引用传递？](docs/basic-extra-meal/pass-by-value.md)
- [Java 不能实现真正泛型的原因是什么？](docs/basic-extra-meal/true-generic.md)
- [Java 程序在编译期发生了什么？](docs/basic-extra-meal/what-happen-when-javac.md)
- [Comparable和Comparator有什么区别？](docs/basic-extra-meal/comparable-omparator.md)
- [Java IO 流详细划分](docs/io/shangtou.md)
- [如何给女朋友解释什么是 BIO、NIO 和 AIO？](https://mp.weixin.qq.com/s/QQxrr5yP8X9YdFqIwXDoQQ)
- [为什么 Object 类需要一个 hashCode() 方法呢？](https://mp.weixin.qq.com/s/PcbMQ5VGnPXlcgIsK8AW4w)
- [重写的 11 条规则](https://mp.weixin.qq.com/s/tmaK5DSjQhA0IvTrSvKkQQ)
- [空指针的传说](https://mp.weixin.qq.com/s/PDfd8HRtDZafXl47BCxyGg)


## 进阶篇

> [!ATTENTION]
>  如果你想成为一名高质量的 Java 程序员，那么 Java 并发编程和 Java 虚拟机是必须要熟练掌握的！

### Java并发编程

- [室友打一把王者就学会了多线程](docs/thread/wangzhe-thread.md)
- [为什么阿里巴巴要禁用Executors创建线程池？](docs/thread/ali-executors.md)
- [10 张图告诉你多线程那些破事](https://mp.weixin.qq.com/s/047_V8QVNewxsYVykNqwAQ)
- [我是一个线程池（细节修订版）](https://mp.weixin.qq.com/s/gHUyuljaT8ESOjeMfV1fnQ)
- [我是一个线程池（续）](https://mp.weixin.qq.com/s/e61PCzlIUe0YJcQsCG9FYw)
- [我是一个线程(全新修订版)](https://mp.weixin.qq.com/s/zxlLWxNsyIJMh4NDeGZBAg)
- [为什么 Java 线程没有 Running 状态？](https://mp.weixin.qq.com/s/eo-IKT_d6IT-8b2CXCidPw)

#### 面渣逆袭Java并发

> [!ATTENTION]
>  图文详解 60 道Java并发面试高频题，这次面试，一定吊打面试官，整理：沉默王二，戳[转载链接](https://mp.weixin.qq.com/s/bImCIoYsH_JEzTkBx2lj4A)，作者：三分恶，戳[原文链接](https://mp.weixin.qq.com/s/1jhBZrAb7bnvkgN1TgAUpw)。

- [并行跟并发有什么区别？](docs/thread/sanfene/bingxing-bingfa.md)
- [什么是进程和线程？](docs/thread/sanfene/jincheng-xiancheng.md)
- [线程有几种创建方式？](docs/thread/sanfene/create-thread-way.md)
- [为什么调用start方法时不直接调用run方法?](docs/thread/sanfene/start-run.md)
- [线程有哪些常用的调度方法？](docs/thread/sanfene/thread-diaodu.md)
- [线程有几种状态？](docs/thread/sanfene/thread-zhaungtai.md)
- [什么是线程上下文切换？](docs/thread/sanfene/thread-shangxiawen-qiehuan.md)
- [什么是守护线程？](docs/thread/sanfene/daemon-thread.md)
- [线程间有哪些通信方式？](docs/thread/sanfene/tongxin-way.md)
- [ThreadLocal是什么？](docs/thread/sanfene/threadlocal.md)
- [ThreadLocalMap了解吗？](docs/thread/sanfene/threadlocal-map.md)
- [父子线程怎么共享数据？](docs/thread/sanfene/fuzi-thread-share-data.md)
- [Java内存模型（JMM）了解吗？](docs/thread/sanfene/jmm.md)
- [原子性、可见性、有序性了解吗？](docs/thread/sanfene/yuanzi-kejian-youxu.md)
- [什么是指令重排？](docs/thread/sanfene/zhiling-chongpai.md)
- [happens-before了解吗？](docs/thread/sanfene/happens-before.md)
- [as-if-serial了解吗？](docs/thread/sanfene/as-if-serial.md)
- [volatile实现原理了解吗？](docs/thread/sanfene/volatile.md)
- [掌握synchronized吗？](docs/thread/sanfene/synchronized.md)
- [synchronized优化了解吗？](docs/thread/sanfene/synchronized-youhua.md)
- [说说synchronized和ReentrantLock的区别？](docs/thread/sanfene/synchronized-reentrantlock.md)
- [ReentrantLock的实现原理了解吗？](docs/thread/sanfene/reentrantlock-yuanli.md)
- [ReentrantLock怎么实现公平锁的？](docs/thread/sanfene/reentrantlock-gongpingsuo.md)
- [AQS了解多少？](docs/thread/sanfene/aqs.md)
- [CAS了解多少？](docs/thread/sanfene/cas.md)
- [Java有哪些保证原子性的方法？](docs/thread/sanfene/yuanzi-method.md)
- [原子操作类Atomic了解多少？](docs/thread/sanfene/atomic.md)
- [AtomicInteger的原理了解吗？](docs/thread/sanfene/atomicInteger.md)
- [线程死锁了解吗？](docs/thread/sanfene/sisuo.md)
- [CountDownLatch（倒计数器）了解吗？](docs/thread/sanfene/CountDownLatch.md)
- [CyclicBarrier（同步屏障）了解吗？](docs/thread/sanfene/cyclicBarrier.md)
- [CyclicBarrier和CountDownLatch有什么区别？](docs/thread/sanfene/countDownLatch-cyclicBarrier.md)
- [Semaphore（信号量）了解吗？](docs/thread/sanfene/semaphore.md)
- [Exchanger 了解吗？](docs/thread/sanfene/exchanger.md)
- [什么是线程池？](docs/thread/sanfene/thread-pool.md)
- [Fork/Join框架了解吗？](docs/thread/sanfene/fork-join.md)


### Java虚拟机

- [JVM 是什么？](docs/jvm/what-is-jvm.md)
- [Java 创建的对象到底放在哪？](docs/jvm/whereis-the-object.md)
- [图解 Java 垃圾回收机制](https://mp.weixin.qq.com/s/RQGImK3-SrvJfs8eYCiv4A)
- [Java 字节码指令](https://mp.weixin.qq.com/s/GKe9F-IZZnw-f-_fRd_sZQ)
- [轻松看懂 Java 字节码](https://mp.weixin.qq.com/s/DRMBsE4iZjJt4xF-AS4w-g)
- [Java 虚拟机栈](https://mp.weixin.qq.com/s/xaIEqngM-J0DouWYa8Ms7g)
- [JVM 内存区域划分](https://mp.weixin.qq.com/s/NaCFDOGuoHkfQZZjvY66Jg)
- [解剖一下 Java 的 class 文件](https://mp.weixin.qq.com/s/uMEZ2Xwctx4n-_8zvtDp5A)

#### 面渣逆袭Java虚拟机

> [!ATTENTION]
>  图文详解 50 道Java虚拟机高频面试题，这次面试，一定吊打面试官，整理：沉默王二，戳[转载链接](https://mp.weixin.qq.com/s/bHhqhl8mH3OAPt3EkaVc8Q)，作者：三分恶，戳[原文链接](https://mp.weixin.qq.com/s/XYsEJyIo46jXhHE1sOR_0Q)。

- [开胃菜 1 题](docs/jvm/sanfene/what-is-jvm.md)
- [内存管理篇 30 题](docs/jvm/sanfene/neicunguanli.md)
- [JVM 调优 10 题](docs/jvm/sanfene/jvm-tiaoyou.md)
- [虚拟机执行 9 题](docs/jvm/sanfene/jvm-run.md)