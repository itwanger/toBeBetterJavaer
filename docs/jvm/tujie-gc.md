---
title: 图解Java的垃圾回收机制
shortTitle: 图解Java的垃圾回收机制
category:
  - Java核心
tag:
  - Java虚拟机
description: 二哥的Java进阶之路，小白的零基础Java教程，从入门到进阶，图解Java的垃圾回收机制
head:
  - - meta
    - name: keywords
      content: Java,JavaSE,教程,二哥的Java进阶之路,jvm,Java虚拟机,垃圾回收机制
---

# 图解Java的垃圾回收机制


垃圾回收是一种在堆内存中找出哪些对象在被使用，还有哪些对象没被使用，并且将后者回收掉的机制。

所谓使用中的对象，指的是程序中还有引用的对象；而未使用中的对象，指的是程序中已经没有引用的对象，该对象占用的内存也可以被回收掉。

Java 语言出来之前，大家都在拼命的写 C 或者 C++ 的程序，此时存在一个很大的矛盾，C++ 等语言创建对象需要不断的去开辟空间，不用的时候又需要不断的去释放空间，既要写构造函数，又要写析构函数，很多时候都在重复的 allocated，然后不停的析构。而 Java 不一样，它有垃圾回收器，释放内存由回收器负责。

垃圾回收的第一步是标记。垃圾回收器此时会找出内存哪些在使用中，哪些不是。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/tujie-gc-9858785a-c6aa-4d6d-a6cd-640d24dd27d0.png)


上图中，蓝色表示已引用对象，橙色表示未引用对象。垃圾回收器要检查完所有的对象，才能知道哪些有被引用，哪些没。如果系统里所有的对象都要检查，那这一步可能会相当耗时间。

垃圾回收的第二步是清除，这一步会删掉标记出的未引用对象。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/tujie-gc-768f5a2c-6c81-4f76-b847-a41cc8413228.png)


内存分配器会保留指向可用内存中的引用，以分配给新的对象。

垃圾回收的第三步是压缩，为了提升性能，删除了未引用对象后，还可以将剩下的已引用对象放在一起（压缩），这样就能更简单快捷地分配新对象了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/tujie-gc-989889b6-adb4-4277-8c67-73d76658f744.png)

之前提到过，逐一标记和压缩  Java 虚拟机中的所有对象非常低效：分配的对象越多，垃圾回收需要的时间就越久。不过，根据统计，大部分的对象，其实用没多久就不用了。

来看个例子吧。下图中，竖轴代表已分配的字节，而横轴代表程序的运行时间。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/tujie-gc-24b154be-4ad0-4cc7-87e9-a3035bc9e3c5.png)


可见，存活（没被释放）的对象随着运行时间越来越少。图中左侧的峰值，也表明了大部分对象其实都挺短命的。

到这，这篇内容就分为两部分了，一部分是国外大神的讲解，一部分是阿里大神的讲解。先来看国外大神的。

----

根据之前的规律，就可以用来提升 JVM 的效率了。方法是，把堆分成几个部分（就是所谓的分代），分别是新生代、老年代，以及永生代。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/tujie-gc-590c5011-48c4-4543-bd26-6f14c2b8614b.png)

新对象会被分配在新生代内存。一旦新生代内存满了，就会开始对死掉的对象，进行所谓的小型垃圾回收（Minor GC）过程。一片新生代内存里，死掉的越多，回收过程就越快；至于那些还活着的对象，此时就会老化，并最终老到进入老年代内存。

Stop the World 事件 —— 小型垃圾回收属于一种叫 "Stop the World" 的事件。在这种事件发生时，所有的程序线程都要暂停，直到事件完成（比如这里就是完成了所有回收工作）为止。

老年代用来保存长时间存活的对象。通常，设置一个阈值，当达到该年龄时，年轻代对象会被移动到老年代。最终老年代也会被回收。这个事件为 Major GC。

Major GC 也会触发STW（Stop the World）。通常，Major GC会慢很多，因为它涉及到所有存活对象。所以，对于响应性的应用程序，应该尽量避免Major GC。还要注意，Major GC的STW的时长受年老代垃圾回收器类型的影响。

永久代包含JVM用于描述应用程序中类和方法的元数据。永久代是由JVM在运行时根据应用程序使用的类来填充的。此外，Java SE类库和方法也存储在这里。

如果JVM发现某些类不再需要，并且其他类可能需要空间，则这些类可能会被回收。

首先，将任何新对象分配给 eden 空间。 两个 survivor 空间都是空的。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/tujie-gc-efe9657b-c7a6-48a8-9037-0e709b1d236c.jpg)

当 eden 空间填满时，会触发轻微的垃圾收集。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/tujie-gc-2497947b-92b5-4a7c-9399-1909a3153660.jpg)

引用的对象被移动到第一个 survivor 空间。 清除 eden 空间时，将删除未引用的对象。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/tujie-gc-2b431315-26fa-4ea0-843a-c63ca568f960.jpg)

在下一次Minor GC中，Eden区也会做同样的操作。删除未被引用的对象，并将被引用的对象移动到Survivor区。然而，这里，他们被移动到了第二个Survivor区（S1）。

此外，第一个Survivor区（S0）中，在上一次Minor GC幸存的对象，会增加年龄，并被移动到S1中。待所有幸存对象都被移动到S1后，S0和Eden区都会被清空。注意，Survivor区中有了不同年龄的对象。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/tujie-gc-e2560f59-9b24-4d16-88db-b6ac4d0b6ffe.jpg)

在下一次Minor GC中，会重复同样的操作。不过，这一次Survivor区会交换。被引用的对象移动到S0,。幸存的对象增加年龄。Eden区和S1被清空。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/tujie-gc-aa9f883a-12db-4c8b-8391-3c289b53d804.jpg)

 此幻灯片演示了 promotion。 在较小的GC之后，当老化的物体达到一定的年龄阈值（在该示例中为8）时，它们从年轻一代晋升到老一代。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/tujie-gc-dec96816-2912-4127-aaaa-a4d987123f52.jpg)

随着较小的GC持续发生，物体将继续被推广到老一代空间。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/tujie-gc-6cb31f8a-2eac-489c-88bd-fc643996ab49.jpg)

所以这几乎涵盖了年轻一代的整个过程。 最终，将主要对老一代进行GC，清理并最终压缩该空间。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/tujie-gc-df98a004-e233-4fb5-a31a-f422033ecfa7.jpg)

--------

接下来，看阿里大神的版本。

Java 堆（Java Heap）是 JVM 所管理的内存中最大的一块，堆又是垃圾收集器管理的主要区域，这里我们主要分析一下 Java 堆的结构。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/tujie-gc-294701a5-1c50-4112-94a1-96a8bab80e34.png)


Java 堆主要分为 2 个区域-年轻代与老年代，其中年轻代又分 Eden 区和 Survivor 区，其中 Survivor 区又分 From 和 To 2 个区。可能这时候大家会有疑问，为什么需要 Survivor 区，为什么 Survivor 还要分 2 个区。

大多数情况下，对象会在新生代 Eden 区中进行分配。当 Eden 区没有足够空间进行分配时，虚拟机会发起一次 Minor GC，Minor GC 相比 Major GC 更频繁，回收速度也更快。

通过 Minor GC 之后，Eden 会被清空，Eden 区中绝大部分对象会被回收，而那些无需回收的存活对象，将会进到 Survivor 的 From 区（若 From 区不够，则直接进入 Old 区）。

Survivor 区相当于是 Eden 区和 Old 区的一个缓冲，类似于我们交通灯中的黄灯。Survivor 又分为 2 个区，一个是 From 区，一个是 To 区。每次执行 Minor GC，会将 Eden 区和 From 存活的对象放到 Survivor 的 To 区（如果 To 区不够，则直接进入 Old 区）。

之所以有 Survivor 区是因为如果没有 Survivor 区，Eden 区每进行一次 Minor GC，存活的对象就会被送到老年代，老年代很快就会被填满。而有很多对象虽然一次 Minor GC 没有消灭，但其实也并不会蹦跶多久，或许第二次，第三次就需要被清除。这时候移入老年区，很明显不是一个明智的决定。

所以，Survivor 的存在意义就是减少被送到老年代的对象，进而减少 Major GC 的发生。Survivor 的预筛选保证，只有经历 16 次 Minor GC 还能在新生代中存活的对象，才会被送到老年代。

设置两个 Survivor 区最大的好处就是解决内存碎片化。

我们先假设一下，Survivor 如果只有一个区域会怎样。Minor GC 执行后，Eden 区被清空了，存活的对象放到了 Survivor 区，而之前 Survivor 区中的对象，可能也有一些是需要被清除的。问题来了，这时候我们怎么清除它们？在这种场景下，我们只能标记清除，而我们知道标记清除最大的问题就是内存碎片，在新生代这种经常会消亡的区域，采用标记清除必然会让内存产生严重的碎片化。因为 Survivor 有 2 个区域，所以每次 Minor GC，会将之前 Eden 区和 From 区中的存活对象复制到 To 区域。第二次 Minor GC 时，From 与 To 职责互换，这时候会将 Eden 区和 To 区中的存活对象再复制到 From 区域，以此反复。

这种机制最大的好处就是，整个过程中，永远有一个 Survivor space 是空的，另一个非空的 Survivor space 是无碎片的。那么，Survivor 为什么不分更多块呢？比方说分成三个、四个、五个?显然，如果 Survivor 区再细分下去，每一块的空间就会比较小，容易导致 Survivor 区满，两块 Survivor 区可能是经过权衡之后的最佳方案。

老年代占据着 2/3 的堆内存空间，只有在 Major GC 的时候才会进行清理，每次 GC 都会触发“Stop-The-World”。内存越大，STW 的时间也越长，所以内存也不仅仅是越大就越好。在内存担保机制下，无法安置的对象会直接进到老年代，以下几种情况也会进入老年代。

1）**大对象**，指需要大量连续内存空间的对象，这部分对象不管是不是“朝生夕死”，都会直接进到老年代。这样做主要是为了避免在 Eden 区及 2 个 Survivor 区之间发生大量的内存复制。

2）**长期存活对象**，虚拟机给每个对象定义了一个对象年龄（Age）计数器。正常情况下对象会不断的在 Survivor 的 From 区与 To 区之间移动，对象在 Survivor 区中每经历一次 Minor GC，年龄就增加 1 岁。当年龄增加到 15 岁时，这时候就会被转移到老年代。当然，这里的 15，JVM 也支持进行特殊设置。

3）**动态对象年龄**，虚拟机并不重视要求对象年龄必须到 15 岁，才会放入老年区，如果 Survivor 空间中相同年龄所有对象大小的总合大于 Survivor 空间的一半，年龄大于等于该年龄的对象就可以直接进去老年区，无需等你“成年”。

这其实有点类似于负载均衡，轮询是负载均衡的一种，保证每台机器都分得同样的请求。看似很均衡，但每台机的硬件不通，健康状况不同，我们还可以基于每台机接受的请求数，或每台机的响应时间等，来调整我们的负载均衡算法。

----

参考链接：[https://mp.weixin.qq.com/s/RQGImK3-SrvJfs8eYCiv4A](https://mp.weixin.qq.com/s/RQGImK3-SrvJfs8eYCiv4A)

----

GitHub 上标星 9300+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 9300+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
