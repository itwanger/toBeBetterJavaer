---
title: Java 创建的对象到底放在哪？
shortTitle: Java创建的对象到底放在哪？
category:
  - Java核心
tag:
  - Java虚拟机
description: Java程序员进阶之路，小白的零基础Java教程，从入门到进阶，Java 创建的对象到底放在哪？
head:
  - - meta
    - name: keywords
      content: Java,JavaSE,教程,Java程序员进阶之路,jvm,Java虚拟机
---

# Java 创建的对象到底放在哪？


大家好，我是二哥呀。创建对象的时候，对象是在堆内存中创建的。但堆内存又分为新生代和老年代，新生代又细分为 Eden 空间、From Survivor 空间、To Survivor 空间。**那我们创建的对象到底在哪里**？


### 一、对象优先在 Eden 分配
堆内存分为新生代和老年代，新生代是用于存放使用后准备被回收的对象，老年代是用于存放生命周期比较长的对象。

大部分我们创建的对象，都属于生命周期比较短的，所以会存放在新生代。新生代又细分 Eden 空间、From Survivor 空间、To Survivor 空间，我们创建的对象优先在 Eden 分配。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/whereis-the-object-1.png)

随着对象的创建，Eden 剩余内存空间越来越少，就会触发 Minor GC，于是 Eden 的存活对象会放入 From Survivor 空间。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/whereis-the-object-2.png)

Minor GC 后，新对象依然会往 Eden 分配。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/whereis-the-object-3.png)

Eden 剩余内存空间越来越少，又会触发 Minor GC，于是 Eden 和 From Survivor 的存活对象会放入 To Survivor 空间。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/whereis-the-object-4.png)

### 二、大对象直接进入老年代
在上面的流程中，如果一个对象很大，一直在 Survivor 空间复制来复制去，那很费性能，所以这些大对象直接进入老年代。

可以用 `XX:PretenureSizeThreshold` 来设置这些大对象的阈值。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/whereis-the-object-5.png)


### 三、长期存活的对象将进入老年代
在上面的流程中，如果一个对象 Hello_A，已经经历了 15 次 Minor GC 还存活在 Survivor 空间中，那他即将转移到老年代。这个 15 可以通过 `-XX:MaxTenuringThreshold` 来设置的，默认是 15。

虚拟机为了给对象计算他到底经历了几次 Minor GC，会给每个对象定义了一个对象年龄计数器。如果对象在 Eden 中经过第一次 Minor GC 后仍然存活，移动到 Survivor 空间年龄加 1，在 Survivor 区中每经历过 Minor GC 后仍然存活年龄再加 1。年龄到了 15，就到了老年代。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/whereis-the-object-6.png)



### 四、动态年龄判断
除了年龄达到 MaxTenuringThreshold 的值，还有另外一个方式进入老年代，那就是动态年龄判断：在 Survivor 空间中相同年龄所有对象大小的总和大于 Survivor 空间的一半，年龄大于或等于该年龄的对象就可以直接进入老年代。

比如 Survivor 是 100M，Hello1 和 Hello2 都是 3 岁，且总和超过了 50M，Hello3 是 4 岁，这个时候，这三个对象都将到老年代。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/whereis-the-object-7.png)

### 五、空间分配担保
上面的流程提过，存活的对象都会放入另外一个 Survivor 空间，如果这些存活的对象比 Survivor 空间还大呢？整个流程如下：

- Minor GC 之前，虚拟机会先检查老年代最大可用的连续空间是否大于新生代所有对象总空间，如果大于，则发起 Minor GC。
- 如果小于，则看 HandlePromotionFailure 有没有设置，如果没有设置，就发起 full gc。
- 如果设置了 HandlePromotionFailure，则看老年代最大可用的连续空间是否大于历次晋升到老年代对象的平均大小，如果小于，就发起 full gc。
- 如果大于，发起 Minor GC。Minor GC 后，看 Survivor 空间是否足够存放存活对象，如果不够，就放入老年代，如果够放，就直接存放 Survivor 空间。如果老年代都不够放存活对象，担保失败（Handle Promotion Failure），发起 full gc。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/whereis-the-object-8.png)

好了，今天就分享到这儿吧，我是二哥呀，我们下期见~~

---

> 原文链接：[juejin.cn/post/7052894117105238053](juejin.cn/post/7052894117105238053)

----

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)