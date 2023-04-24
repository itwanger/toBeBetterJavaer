---
star: true
title: 2023年最值得收藏的Java虚拟机（JVM）学习路线（🔥）
shortTitle: Java虚拟机学习路线
category:
  - 学习路线
tag:
  - 学习路线
description: JVM 更是面试中不可或缺的一部分，所以我花了几天的时间整理了一条 JVM 的学习路线，希望能帮助到大家
head:
  - - meta
    - name: keywords
      content: Java,JVM,Java虚拟机,Java虚拟机学习路线,Java学习路线,Java教程,Java开发,Java入门
---

# JVM学习路线

2020 年的时候，通读了一遍周志明老师的《深入理解 Java 虚拟机：JVM 高级特性与最佳实践》第三版，读完之后受益匪浅，这让我对 Java 虚拟机有了一个更完整的认识。毫无疑问，《深入理解 Java 虚拟机》是 JVM 书籍中最好的一本书了，国产技术书的天花板。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/java/jvm-7036a048-4034-4965-92a6-e35d0211ba71.png)

如果觉得这本书太厚了，可以阅读我公众号上的这篇文章，对 JVM 会有一个系统的梳理。

[JVM 核心知识点总结](https://mp.weixin.qq.com/s/zOdiefZpkpa2dxpcBLlc6A)

在金三银四/金九银十的跳槽季中，很多小伙伴都会忍不住蠢蠢欲动，其中 JVM 更是面试中不可或缺的一部分，所以我花了几天的时间整理了一条 JVM 的学习路线，希望能帮助到大家。

## 一、为什么要学习 JVM？

曾经我对 JVM 也是感到非常的头痛，完全搞不懂该怎么入门，只是听说《深入理解 Java 虚拟机》这本书很吊，但真读起来，却需要极大的耐心和定力，否则很快就会在读完第一章 JVM 的简史后放弃。

那首先，我们就要搞清楚，为什么要学习 JVM ？

第一，当然是面试要考，这一点毫无疑问，尤其是对于要参加校招的应届生来说，JVM 是绕不过去的，必须得学。

第二，如果你想成为公司不可或缺的顶梁柱，那 JVM 你得学，因为一般情况下，遇到的问题基本上 Google 下就能解决了，可一旦遇到 JVM 性能调优，就必须得有能查 OOM 的原因、能看懂字节码的老鸟出马了。

应用程序一旦上线，出问题是板上钉钉的事，除了数据库、网络、代码逻辑上的问题，剩下的就有内存溢出啊，频繁 GC 导致的性能瓶颈啊等棘手问题。

遇到这种问题，你就必须得能看懂 GC 日志，明白什么是老年代、永久代、元数据区等，这些都是 Java 虚拟机方面的知识。

明白了学习 JVM 的重要性，那我们就开搞吧！

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/java/jvm-4cbbdc72-3bdd-4b14-9d8d-ecd7764afb11.png)


## 二、JVM 学习路线图

这是我最近整理的一张关于 JVM 的思维导图，大的方向可以分为三个部分：字节码与类的加载、内存与垃圾回收、性能监控和调优。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/java/jvm-b4ec034b-9f20-40b9-a2a3-e77afffd2abf.png)

字节码与类的加载包括：

- 类的加载机制（类的加载过程、类加载器、双亲委派模型）
- 字节码（类文件结构、字节码指令、字节码执行引擎、实战字节码）

内存与垃圾回收包括：

- JVM 内存结构
- 垃圾回收算法
- 垃圾回收机制
- 垃圾收集器

性能监控和调优包括：

- 调优指标
- 调优对象
- 调优工具
- JIT 优化

有理论知识，有动手实战，基本上可以把 JVM 这块学的非常扎实了。


## 三、硬核 JVM 学习资料

### **1）Java进阶之路**

学 Java，怎么能少得了《二哥的Java进阶之路》，网址我贴下面了哈：

>[https://tobebetterjavaer.com/home.html](https://tobebetterjavaer.com/home.html)

进去直接找「Java 核心」里面的 Java 虚拟机就对了。我按照前面的思维导图整理了 19 篇文章，全部都是硬核级别的，跟着学就对了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/java/jvm-cc84fead-278b-46aa-a8ab-a3b07acefc12.png)

### **2）视频**

懂的都懂，看视频到 B 站。先推荐宋红康老师的 JVM 全套教程，200多万的播放量，还是非常受欢迎的。全套课程分为：

- 内存与垃圾回收篇
- 字节码与类的加载篇
- 性能监控和调优篇

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/java/jvm-59c829ce-7fe3-45a5-b074-35dacb08941e.png)

>视频地址：[https://www.bilibili.com/video/BV1PJ411n7xZ](https://www.bilibili.com/video/BV1PJ411n7xZ)

友情提示，对于找工作面试的小伙伴，看 p01-p203、p266-301 就够了！

还有黑马的这份 JVM 视频教程，1 万+的点赞量，确实很牛逼了。

- 1. JVM 内存结构的组成、各部分功能作用，学会利用内存诊断工具排查内存相关问题；
- 2. JVM 的招牌功能-垃圾回收机制是如何工作的，如何进行垃圾回收调优；
- 3. Java 程序从编译为字节码到加载到运行的全流程，各个阶段的优化处理；
- 4. 了解 Java 内存模型相关知识，见识多线程并发读写共享数据时的问题和 Java 的解决方案。

![](https://cdn.tobebetterjavaer.com/stutymore/jvm-20230410211836.png)

>视频地址：[https://www.bilibili.com/video/BV1yE411Z7AP](https://www.bilibili.com/video/BV1yE411Z7AP)

再推荐一个狂神说的，40多万的播放量，算是一个面向 JVM 面试的突击版。像一些常见的 JVM 面试题，视频里都有讲到，比如说：

- 什么是 JVM？
- 说一说类加载器？
- 栈和堆的区别是什么？
- JDK 8 和之前发生了什么变化？
- 新生代和老年代是干嘛的？
- From区和 To区什么区别？
- 如何排查 OOM？
- 说说垃圾回收算法
- 说说  JVM 内存结构 

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/java/jvm-be0910d8-7669-46cb-b8b9-2399162e723d.png)

>视频地址：[https://www.bilibili.com/video/BV1iJ411d7jS](https://www.bilibili.com/video/BV1iJ411d7jS)

### **3）书籍**

纸质书只推荐一本周志明老师的神书《[深入理解 Java 虚拟机](https://book.douban.com/subject/34907497/)》，基本上学习 JVM 的小伙伴人手一本。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/java/jvm-3f6065c5-2fbf-4107-804e-393b32a4f9ab.png)

这是一部从工作原理和工程实践两个维度深入剖析JVM的著作，是计算机领域公认的经典。

全书分为五个部分，第一部分为走近 Java，主要是对 JVM 的发展历史进行了介绍，其中第二部分自动内存管理和第三部分虚拟机执行子系统需要重点掌握，这两部分的内容也是最多的。

第四部分程序编译与代码优化中需要重点掌握的是 JIT 部分，第五部分高效并发最好和[Java 并发编程](https://tobebetterjavaer.com/xuexiluxian/java/thread.html)（我前面也做了学习路线的总结）这块内容结合起来学习。

可以配合 GitHub 上这个开源的阅读笔记学习：

>[https://github.com/TangBean/understanding-the-jvm](https://github.com/TangBean/understanding-the-jvm)

### **4）开源电子书**

推荐 doocs 社区的 [JVM 底层原理最全知识总结](https://doocs.github.io/jvm/)，算是《深入理解 Java 虚拟机》这本书的一个精简知识点梳理。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/java/jvm-f2e2e5c4-c193-4af5-b1bc-fea8df2006af.png)


>GitHub 地址：[https://github.com/doocs/jvm](https://github.com/doocs/jvm)

考虑到有些小伙伴可能需要 PDF 版本，我都整理好了，需要的小伙伴请扫描下方的二维码关注作者的原创公众号「**沉默王二**」回复关键字「**java**」就可以拉取到了。

![扫码关注后回复「java」关键字](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

再推荐一份 GitHub 上开源的 Java 虚拟机知识点总结：

>[https://github.com/heibaiying/Full-Stack-Notes/blob/master/notes/Java_虚拟机.md](https://github.com/heibaiying/Full-Stack-Notes/blob/master/notes/Java_虚拟机.md)

为了方便大家的学习，我也将其整理成了 PDF，内容包含了 Java 内存区域、垃圾收集算法、经典垃圾收集器、虚拟机类加载机制、程序编译和代码优化，手绘图也非常的漂亮。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/java/jvm-2beabbe4-2ddd-4180-8690-1bc3224e6b41.png)

需要的小伙伴可以微信搜索「**沉默王二**」回复关键字「**java**」就可以拉取到了。

### **5）付费专栏**

二哥的技术派团队成员楼仔出品的《JVM 手册》，暂时只对《[技术派星球（戳链接有优惠券）](https://paicoding.com/article/detail/169)》用户开放，如果你需要这份 PDF 并且想享受更多服务的话，可以扫码加入。

![](https://cdn.tobebetterjavaer.com/stutymore/jvm-20230410212958.png)

介绍一下技术派星球提供的服务内容，技术派项目学习教程，后续会采用连载的方式，让你从 0 到 1 也能搭建一套自己的网站；技术派项目答疑解惑，让你快速上手该项目，小白也能懂；向楼仔、二哥和大厂嘉宾 1 对 1 交流提问，告别迷茫；个人成长路线、职业规划和建议，帮助你有计划学习；简历指导，让你的简历也能脱颖而出，收获更多面试机会；需求方案、技术架构设计提供参考建议，对标大厂。

这是 PDF 的大致内容，想要加入星球的用户，可以提前感受一下。

![](https://cdn.tobebetterjavaer.com/stutymore/jvm-20230410213258.png)

郑雨迪老师在极客时间上开了一门《深入拆解Java虚拟机》的付费专栏，质量还是挺高的，喜欢的小伙伴可以戳[链接](http://gk.link/a/11htX)去购买，反正我自己感觉质量还不错。

<a href="http://gk.link/a/11htX" target="_blank">
<img src="https://cdn.tobebetterjavaer.com/stutymore/jvm-20230410212606.png" />
</a>

## 四、JVM 八股文

这里给大家推荐两份 Java 虚拟机方面的八股文，一份来自读者[三分恶](https://tobebetterjavaer.com/sidebar/sanfene/jvm.html)，一份来自读者小牛，先截图给大家看一下 Java 虚拟机的理解版八股文，图文并茂，非常容易消化和吸收。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/java/jvm-a11893df-e518-4bdc-a166-884b168a8cf0.png)


为了方便大家的阅读和背诵，我已经将其整理到了《二哥的Java进阶之路》上，面渣逆袭 Java 虚拟机篇：

>[https://tobebetterjavaer.com/sidebar/sanfene/jvm.html](https://tobebetterjavaer.com/sidebar/sanfene/jvm.html)

Java 虚拟机八股文（背诵版）：

>[https://tobebetterjavaer.com/baguwen/jvm.html](https://tobebetterjavaer.com/baguwen/jvm.html)

诚实点说，如果能把这两份八股文背会/理解的话，简历上就真的敢写“精通”Java 虚拟机了。

## 五、学习 JVM 的一点小心得

和 C++ 相比，Java 的内存管理机制可以说是一大特色，Java 开发不再需要自己去写代码手动释放内存，甚至你想自己干，JVM 都不给你这个机会，虚拟机完全掌握了 Java 内存的控制权。

这看起来挺美好的，但并不意味着Java 开发就可以随意写代码，随意使用内存，从我多年的使用体验来看，内存溢出和内存泄露还是会时不时发生的，尤其是初学阶段，尤其在开启多线程的情况下。

一旦出现内存溢出或者内存泄露，排查问题还是挺困难的，所以知道逊尼基到底是怎么管理内存的就变得十分重要了。

[JVM 的垃圾回收](https://tobebetterjavaer.com/jvm/gc.html)，其实就是收拾那些不再使用的 Java 对象，把他们曾经占用的内存重新释放出来。所以我们要搞清楚：

- [对象是如何创建的](https://tobebetterjavaer.com/jvm/whereis-the-object.html)？对象是如何被访问的？到底哪些对象是废弃的？于是我们就需要搞清楚对象的生和死。
- 这些废弃了的对象到底放在哪？于是就需要了解[JVM 的内存结构](https://tobebetterjavaer.com/jvm/neicun-jiegou.html)：方法区、堆、程序计数器、虚拟机栈和本地方法栈。
- 这些废弃了的对象会不会造成内存泄露（OOM，OutOfMemoryError）？于是我们就需要了解每个分区的 OOM。
- 这些废弃了对象什么时候被回收？于是我们就需要了解垃圾回收算法，比如说清除算法、复制算法、标记整理算法和分代收集算法。

知道了一个对象在内存中的生和死，我们还需要知道类是如何在内存中变成对象的？对象的方法是如何执行的？

于是我们开始学习 Java 虚拟机的执行过程，学习[字节码文件](https://tobebetterjavaer.com/jvm/class-file-jiegou.html)（ .class 文件），学习[类的加载机制](https://tobebetterjavaer.com/jvm/class-load.html)，学习[虚拟机栈的栈帧结构](https://tobebetterjavaer.com/jvm/how-jvm-run-zijiema-zhiling.html)，学习方法的调用过程，学习[字节码指令](https://tobebetterjavaer.com/jvm/zijiema-zhiling.html)等等。

为了监控虚拟机和故障排查，我们需要学习[常用的 JDK 命令行工具](https://tobebetterjavaer.com/jvm/problem-tools.html)，掌握必要的线上问题排查方法；此外，还需要了解 JIT (Just In Time)并不是简单的将热点代码编译成机器码就收工的，它还会对代码的执行进行优化（[方法内联和逃逸分析](https://tobebetterjavaer.com/jvm/jit.html)）。

JVM 相关的知识已经成为面试必考的科目了，但老实讲，JVM 相关的知识还真的不太好用在项目中，或者说不太好在项目中体现出来。

那这里给大家推荐一个实战项目，基于 Spring Boot 的在线 Java IDE，可以远程执行 Java 代码并将程序的运行结果反馈出来。涉及了 Java 类文件的结构、Java 类加载器和 Java 类的热替换等 JVM 相关的技术。

>[https://github.com/TangBean/OnlineExecutor](https://github.com/TangBean/OnlineExecutor)

听我这么一说，是不是一下子就清晰多了！

**Java 虚拟机虽然难学，但如果你能坚持学下去，内功自然而然就提升了一大截**。

另外，需要 Java 学习资料的话，可以直接戳我整理的这个 GitHub/码云仓库——📚Java程序员必读书单整理，附下载地址，助力每一个Java程序员构建属于自己的知识体系。包括但不限于Java、设计模式、计算机网络、操作系统、数据库、数据结构与算法、大数据、架构、面试等等。

- GitHub 地址：[https://github.com/itwanger/JavaBooks](https://github.com/itwanger/JavaBooks)
- 码云地址：[https://gitee.com/itwanger/JavaBooks](https://gitee.com/itwanger/JavaBooks)

给大家截图展示一下里面都有哪些优质的 PDF：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/java/java-books.jpg)

---------

GitHub 上标星 7600+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 7600+ 的 Java 教程](https://tobebetterjavaer.com/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
