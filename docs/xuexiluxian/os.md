---
star: true
title: 2023最新超详细的操作系统学习路线（建议收藏🔥）
shortTitle: 操作系统学习路线
category:
  - 学习路线
tag:
  - 学习路线
description: 操作系统是管理计算机硬件和软件资源的程序，是计算机的基石，这里整理一份 操作系统的超详细学习路线，附学习资源，可下载
head:
  - - meta
    - name: keywords
      content: 操作系统,学习路线
---

操作系统是管理计算机硬件和软件资源的程序，是计算机的基石。

举个例子来讲，像 Java 中的并发编程这块，如果连进程调度的相关原理、同步和互斥都搞不懂，那多半会有两种结果： 

- 写出来的多线程程序出现了各种奇奇怪怪的问题； 
- 不知道为什么出现这些问题。

喜欢视频版的话，可以到 B 站看二哥的操作系统学习路线版：

>[https://www.bilibili.com/video/BV1th411b7in](https://www.bilibili.com/video/BV1th411b7in)

**操作系统该怎么学呢？入门推荐两门视频课程**。

先看一门国内的，再看一门国外的，中西合璧，药效持久。

## 一、哈工大的《操作系统》实验课

国内的推荐哈工大的《操作系统》实验课，以下四部分最为重要。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/os-1.png)


1）操作系统基础篇

>[https://mooc.study.163.com/course/1000002004](https://mooc.study.163.com/course/1000002004)

2）操作系统之进程与线程

>[https://mooc.study.163.com/course/1000002008](https://mooc.study.163.com/course/1000002008)

3）操作系统之内存管理

>[https://mooc.study.163.com/course/1000003007](https://mooc.study.163.com/course/1000003007)

4）操作系统之外设与文件系统

>[https://mooc.study.163.com/course/1000002009](https://mooc.study.163.com/course/1000002009)


哈工大的操作系统课是该校 CS 课程中含金量最高的，尤其是实验课。八个实验涉及到了操作系统的核心部分，虽然 lab 不是在哈工大自创的 HITOS 上，但 linux-0.11 确实是一个非常好的选择。

Linux-0.11 这个版本能让学生更加专注于实验，而不是纠结于各种奇奇怪怪的问题，作为 OS 入门算是足够了。

Linux 发展到现在，内核源码与 0.11 相比，几乎是翻天覆地的变化，但这不代表研究 linux-0.11 就没有意义，毕竟内核这东西，你懂的。。。

多的不说，学完 linux-0.11 后，你至少能明白，原来一个最简单的完整的操作系统，是这个样子的：它是这样一步步从 BIOS 开始加载程序加载数据的，它是这样实现单 CPU 多任务多进程调度和切换的。

Linux 内核主要由 5 个模块构成，分别是：

- 进程调度模块，负责控制进程对 CPU 资源的使用。
- 内存管理模块，用于确保所有进程能够安全地共享主机内存，同时，内存管理模块还支持虚拟内存管理方式，使得进程所使用的内存比实际的内存更多。
- 文件系统模块，用于支持对外部设备的驱动和存储。linux-0.95 版本又逐步实现了虚拟文件系统，该模块通过向所有的外部存储设备提供一个通用的文件接口，隐藏了各种硬件设备的不同细节，从而兼容其他操作系统。
- 进程间通信模块，用于支持多种进程间的信息交换方式。
- 网络接口模块（linux-0.96 版本才有），提供对多种网络通信标准的访问并支持网络硬件。

它们之间的依赖关系见下图所示。其实连线代表它们之间的依赖关系，虚线代表 linux-0.11 中还未实现的部分。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/os-2.png)

由上图可以看得出，所有模块都与进程调度模块存在依赖关系，因为它们都需要进程调度程序来挂起或重新运行它们的进程。

linux-0.11 的学习推荐《Linux 内核完全注释》，该书对 linux-0.11 的全部代码文件进行了详细全面的注释和说明，能够让大家在尽量短的时间内对 Linux 的工作机制有一个全面而深刻的理解，为进一步学习 Linux 系统打下坚实的基础。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/os-3.jpg)


高清 PDF 版在 GitHub 上的一个开源仓库（JavaBooks）里可以找得到（附 linux-0.11 内核的源码）：

>[https://github.com/itwanger/JavaBooks#Linux%E5%86%85%E6%A0%B8](https://github.com/itwanger/JavaBooks#Linux%E5%86%85%E6%A0%B8)

我在逛 GitHub 的时候发现了这样一个仓库：

>[https://github.com/hoverwinter/HIT-OSLab](https://github.com/hoverwinter/HIT-OSLab)

作者大四，他的这门操作系统实验课满分，打算自己写一个 OS，就顺带把之前的代码给开源了出来，希望对学习操作系统，以及对哈工大这门实验课感兴趣的同学一些参考。

其中 lab1-lab7 给出了修改的部分，lab 8 给出了完整的修改后的 linux-0.11 的代码。虽然这个仓库已经有好多年没有更新了，但仍然有参考的价值。

作者的那句：“Just coding system，it’s fantastic！”我觉得也蛮给力的。

## 二、MIT 6.268 和 6.S081

国外的强烈推荐 MIT 6.268 这门课（主要研究生级别），是一门公认的硬核课程，一直以来都有很高的知名度，广受好评，是理论与实践相结合的经典。

>[https://pdos.csail.mit.edu/6.828/2018/schedule.html](https://pdos.csail.mit.edu/6.828/2018/schedule.html)

不过，在学习这门课之前，最好之前有过一些操作系统的基础，比如说上过本校的 OS 课，比如说阅读过《操作系统导论》这本书，比如说熟悉 C语言和汇编，对计算机组成原理也有一定的了解。

这门课有多牛逼呢？

>举个例子，以陈波老师为首的上海交通大学的 IPADS 实验室可以说是国内最强的操作系统相关实验室之一了，而陈波老师等人在读博阶段就完成了 6.828 课程的学习，并且在此基础上开发了 corey 操作系统，并发表了一篇被广泛引用的论文：Corey——An operating system for many cores。

如果觉得这门课的难度有点大，可以选择 MIT 的 6.S081（Introduction to Operating System，操作系统导论）这门课，主要针对本科生级别。

>[https://pdos.csail.mit.edu/6.S081/2020/schedule.html](https://pdos.csail.mit.edu/6.S081/2020/schedule.html)

6.S081 这门课是基于一个类似于 Unix，但比 Unix 简单得多的一个教学操作系统 XV6 来讲解的，虽然不是原汁原味的 Linux，但对于理解 Linux 的工作方式和结构是足够了。

这门课是全英文的形式，video 链接里甚至没有英文字幕，对于国内的同学来说，如果英文功底一般的话，很难较好的理解这门课程。

下图是课程表，里面有 PDF 和 video 链接🔗。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/os-4.png)


为了减轻大家的学习压力，我在哔哩哔哩上找到了这门课的克隆版，但中英文字幕的那种。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/os-5.png)


哇，有了中英文字幕，学起来就舒服多了。课程地址我贴一下：

>[https://www.bilibili.com/video/BV19k4y1C7kA](https://www.bilibili.com/video/BV19k4y1C7kA)

除了这个，我还找到了一份中文版的在线阅读文档，总共有 35 万字左右，据作者说，他大概花费了 200 个小时，辛苦劳作的结果是不仅作者自己的知识盲区补全了，也为后来者留下了一笔不可多得的学习资料。害，除了能蹦出“牛逼”两个字外，我想不到更惊艳的词汇了！

>[https://mit-public-courses-cn-translatio.gitbook.io/mit6-s081/](https://mit-public-courses-cn-translatio.gitbook.io/mit6-s081/)


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/os-6.png)


这门课的一部分会讲操作系统的基本概念，一部分是 lab，几乎每周都会有一些编程实验。

我们都知道，操作系统很重要，那操作系统的学习单靠看和听肯定是不行的，必须配合实战来。做实验的意义就在于能帮我们获得一些使用和实现操作系统的实际动手经验。

还有xiaofan 的学习笔记也是非常值得参考的： 

>[https://fanxiao.tech/posts/MIT-6S081-notes/#11-processes-and-memory](https://fanxiao.tech/posts/MIT-6S081-notes/#11-processes-and-memory)


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/os-7.png)


学习 6.S081 这门课的目的有三个：

- 理解操作系统的设计和实现
- 能动手扩展一个小型 OS
- 能动手实现系统应用

## 三、硬核 OS PDF

这里给大家推荐两门超级硬核的操作系统学习资料，我都已经整理成 PDF 了。

**第一份，给操作系统捋条线**，看图感受一下吧。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/os-8.png)

需要的小伙伴请长按识别/扫描下方的二维码关注作者的原创公众号「**沉默王二**」回复关键字「**os**」就可以拉取到了。

![扫码关注后回复「os」关键字](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)


**第二份，操作系统核心知识点**，同样看图感受一下吧。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/os-9.png)

需要的小伙伴同样可以通过上面的方式获取到。



有一说一，操作系统确实难刷，大家在刷的过程中一定要记得多喝水，因为这门课实在是太干了。说实话，光是整理这两门课的过程，我就又 get 到了不少新鲜的知识点。希望我推荐的这两门课算是抛砖引玉吧，大家一起冲！

记住一点，**动手很重要，动手做 lab 很重要**。

---------

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

