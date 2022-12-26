---
title: 程序员如何优雅地解决线上问题？
shortTitle: 程序员如何优雅地解决线上问题？
author: fancy
category:
  - 微信公众号
---

身为一个程序员，遇到线上问题那都是家常便饭的事儿。

如果你在深夜看到一群同事围在一起，他们是在共同探讨什么哲学问题么？非也，他们一定是遇到了线上BUG。

线上问题只要影响到了核心业务流程那便是事故，所以一旦事故发生，无论你在约会，还是周末打游戏，甚至是在睡觉，只要接到了来自公司的电话，那只能赶紧连上公司网络加班了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-chengxyrhyydxjxswt-ff7a235c-b5dc-4cbe-a6f4-72b36414409f.jpg)



# BUG分类

线上问题是复杂多变的，我们一般将bug分为系统级别和业务级别bug。

## 系统级别bug

业务部署在整套系统上运行，一旦出现系统级别bug则业务会被严重拖垮。如CPU爆满、服务不可用、甚至服务器宕机等都属于系统级别的bug。

如果是CPU100%，那是由哪个线程，哪个类，甚至是哪个方法导致的？

若是业务流程正常但是部分服务性能拉跨，那么如何快速定位到问题在哪儿？

因为是线上发生的事儿，所以重点在于如何**迅速解决**。

以下分享我最常用的一些问题排查工具。

### linux定位工具

#### 1.CPU高负载，甚至100%？

**perf工具**

perf是linux的性能分析工具，核心作用之一就是用来查看热点函数的分布情况。

用它可以生成**火焰图**查看到函数的资源占用情况，函数的调用栈越深火焰就越高。所以对于异常的函数一眼就能看出。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-chengxyrhyydxjxswt-760d57bb-758f-45c2-bc93-479c0cb83ea9.jpg)



如上图通过调用栈你可以看出Monitor管程在反复调用enter和wait，这种情况下就可以判断出该程序已经发生死锁且存在性能问题。假设有大量线程请求这段代码，那么CPU资源将被迅速打满！

在著名的“713B站事故”里技术团队在事故发生时就用到了当前工具生成了火焰图，快速地分析出了事故的根因也就是导致CPU100%的lua热点函数。

#### 2.某一进程存在异常嫌疑，想快速知道它的状态？

**ps命令**

我们项目部署的服务器里在跑的进程老多了，java进程、nginx进程、redis、消息队列进程等等。

举个例子，假设在某一流量高峰期系统监控到整个服务性能下降5倍，业务被严重拖垮，在确定没有业务层面bug的情况下大概率就是因为服务性能达到瓶颈了。如何确定瓶颈在哪儿？

大部分情况下通过系统告警就可以知道大概问题所在。如发生消息堆积我们就该怀疑消息生产者和消费者的状态，这个时候就要具体去查看消息队列这一进程。

可以使用一些轻量级的linux命令，如**ps**：

```
[root@linuxfancy ~]# ps -ef | grep queuejob
 root       1303      1  0 Apr17 ?        00:00:00 /usr/sbin/queuejob
 root       3260   3087  0 Apr17 ?        00:00:00 /usr/bin/queuejob /bin/sh -c exec -l /bin/bash -c "env GNOME_SHELL_SESSION_MODE=classic gnome-session --session gnome-classic"
 root      24174  19508  0 11:39 pts/0    00:00:00 grep --color=auto ssh
 [root@linux265 ~]# ps -aux | grep queueA
 root       1303  0.0  0.0  82468  1204 ?        Ss   Apr17   0:00 /usr/sbin/queueA
 root       3260  0.0  0.0  52864   572 ?        Ss   Apr17   0:00 /usr/bin/queueA /bin/sh -c exec -l 
 root      24188  0.0  0.0 112652   956 pts/0    S+   11:39   0:00 grep --color=auto ssh
```

该命令还可以用于对进程的资源使用情况进行排序：

```
[root@linuxfancy ~]# ps aux | sort -nk 3
```

```
[root@linuxfancy ~]# ps aux | sort -rnk 4 
```

#### 3.我想知道内存&磁盘的使用情况？

**vmstat命令**

vmstat是Virtual Meomory Statistics（虚拟内存统计）的缩写。

它是一个用于监控内存和磁盘使用情况的工具，但是也可以用来查看CPU的一些指标，如中断次数等。使用它可以查看内存使用的详细信息和磁盘的读/写情况。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-chengxyrhyydxjxswt-f27a4be2-403b-41bb-9856-43076eef6ac5.jpg)



以上表头字段的说明如下：

```
Procs（进程）：

r: 运行队列中进程数量

b: 等待IO的进程数量

Memory（内存）：

swpd: 使用虚拟内存大小

free: 可用内存大小

buff: 用作缓冲的内存大小

cache: 用作缓存的内存大小

Swap(交换)：

si: 每秒从交换区写到内存的大小

so: 每秒写入交换区的内存大小IO：（现在的Linux版本块的大小为1024bytes）bi: 每秒读取的块数bo: 每秒写入的块数

System(系统)：

in: 每秒中断数，包括时钟中断

cs: 每秒上下文切换数

CPU（以百分比表示）

us: 用户进程执行时间(user time)

sy: 系统进程执行时间(system time)

id: 空闲时间(包括IO等待时间),中央处理器的空闲时间

wa: IO等待时间
```

从以上命令就可以很清晰地看出服务器的各方面性能情况。除此之外还有以下命令也可以在排查或者调优中使用：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-chengxyrhyydxjxswt-737f1be8-f8d7-4dcd-9807-5c2a7d14f8ff.jpg)



## 业务级别bug

### 如何定位到业务bug？

出现了业务bug那就纯纯的是开发或测试的锅了。

bug确定后第一步一定是**先看日志**，只要你写需求的时候日志打的全，一般出现了问题日志或者告警都会第一时间推送。

通过日志我们可以定位到bug对应代码的位置，但这仅仅是第一步，因为你只知道哪里出了问题，并不知道代码出了什么问题(除非一眼就能看出)。

所以下一步，**看数据**，数据是业务应用的核心。若通过日志和页面表现查看到你的主流程是没有问题的，那么下一步就是要确定表的数据是否有问题，数据存在bug的表现会是各方面的，可能是用户反馈，也可能是流程错误，这要取决于你表的设计。

切记！！线上数据是重中之重，当你决定要修复数据，在处理之前一定要做好备份，这样起码可以保证事情不会变的更糟。一般情况下修改线上数据这种活都需要你写好SQL，然后经过leader审批再交给DBA来操作，一定不要干出删库跑路这种事哟。

假设验证了你数据是OK的，那么问题就极大可能出现在了**代码层面**。

当代程序员最难过的瞬间无非就是有一个非常紧急的线上bug需要你来解决，但是摆在你面前的却是一堆屎山代码！！

修改业务bug最重要的是要将bug点修改掉并且保证其它业务还能正常运行，这是牵一发而动全身的事情，否则bug只会越改越多。

所以平时应该预知到这些风险，做好代码设计。总结一下定位业务bug的正确步骤：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-chengxyrhyydxjxswt-01788ebe-71c4-4af3-b411-0ad16410ee00.jpg)



# 方案设计

## 代码设计

一般公司都有自己的代码设计规范。比如由外到里包装代码，每一个方法都要有对应的职责，并且一个方法不要超过100行，一个类不要超过1000行代码等。清晰的结构可以让你和他人更好地review代码，避免看起来一头雾水。

写业务逻辑有两种方式，一种就是简洁明了的线性逻辑，另一种就是通过封装代码来减少代码耦合提高内聚性，也就是我们说的设计模式的使用。两种方式各有优缺点，但是工作多年了咱写的代码也不能直里直气的，多少得带点”艺术“对吧？推荐一下我经常使用但是也不会特别复杂的设计模式。

### 设计模式

**工厂模式**

这是最常使用的设计模式之一。

工厂模式分为简单工厂模式、工厂方法模式和抽象工厂模式。我们这里讲解简单工厂模式，因为后两个都是以其为基础做改进的。

其结构如下：

通过定义一个用以创建对象的接口, 让子类决定实例化哪个类。

所以其实质就是由一个**工厂类**根据传入的参数，动态决定应该创建哪一个**产品类**（这些产品类继承自一个父类或接口）的实例。

其包含以下角色：

*   工厂（Creator）角色：工厂类的创建产品类的方法可以被外界直接调用，创建所需的产品对象。
*   抽象产品（Product）角色：它负责描述所有实例所共有的公共接口。
*   具体产品（Concrete Product）角色：创建目标，所有创建的对象都是充当这个角色的某个具体类的实例。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-chengxyrhyydxjxswt-c005c540-07b6-4f5b-8048-aac45dca6481.jpg)



当遇到**需要根据某个前提条件创建不同的类实现**时, 可以使用工厂模式。

**装饰者模式**

它是在不必改变原类结构和继承体系的情况下，**动态地扩展一个对象的功能**。通过创建一个包装对象来实现对功能的扩展，动态的给一个对象添加一些额外的职责。

所以装饰者模式分为主体和装饰者。

其包含角色如下：

*   主体(Main)：业务主体逻辑、字段等。
*   主体具体实现类(MainComponent)：主体具体的实现类。
*   装饰者(Decorator)：要做的装饰扩展逻辑接口。
*   装饰者具体实现类(DecoratorComponent)：扩展逻辑的具体实现类。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-chengxyrhyydxjxswt-4931be26-47c8-4950-885e-70ee4f4940f7.jpg)



以上两种设计模式都有着”高扩展性“的特点，我们应该根据业务灵活设计接口，避免需求迭代导致的一坨坨又臭又长的代码。但是设计模式切勿用来炫技，一些较为冷门或者复杂的设计模式不推荐使用，否则当一套代码只有你能维护时，那将会是非常痛苦的。。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-chengxyrhyydxjxswt-621489ab-c9f3-4193-9288-f2ebf2f17b59.jpg)



当然了这也能够体现出你在公司的不可替代性！

## 架构设计

### 系统高性能 & 高可用

*   使用缓存：缓存的作用是为了系统的读能力。将用户经常访问的数据扔到缓存里面可以有效地提高访问速度并且减少数据库的压力。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-chengxyrhyydxjxswt-302e360e-964b-48a4-bf2a-5b5e7fd0c13c.jpg)



*   服务降级 & 限流：若短时间内流量激增影响到服务器性能，可考虑降级边缘业务以保证核心业务的可用性和性能。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-chengxyrhyydxjxswt-57a60456-b91c-4bcc-aebb-836b967b1bea.jpg)



分布式系统 & 服务拆分：将整个系统拆分成不同的业务模块再部署到对应的服务器中，服务之间通过中间件通信，可以有效地避免



和减少单一服务故障对整体系统的影响。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-chengxyrhyydxjxswt-7f8e4791-2fe1-46f4-9e50-58aa763a7015.jpg)



*   高可用架构：重要性不言而喻。同城多活、异地多活的架构部署可以保证单机房挂掉的情况下流量可以迅速切换到其他机房让核心业务不受影响。可谓是防止系统宕机必备良药啊！

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-chengxyrhyydxjxswt-7e9072a1-4843-4855-91c6-11043dfb5230.jpg)



# 做好事故复盘

都说小事故伤身，大事故提桶。。一般发生事故后写一张事故单是不可避免的。除了详细描述好事故发生的经过，背锅人，解决方案，后续的事故跟进也是一系列流程的事，多则需要数周去跟进。事故的发生对于团队的技术发展和成型往往起着积极推进作用，所以对于每一个团队来说事故一定是不可避免的。每次事故发生我们都要思考如何完善系统，打破技术壁垒。并且遇到事儿也不要慌，如果是大问题，那么首先背锅的一定是leader！

其实呢一般公司最喜欢的是能快速解决问题的员工，即便这些问题可能是由你创造的。

>转载链接：[https://mp.weixin.qq.com/s/D_kX_5chLMlUcwZKuiilIA](https://mp.weixin.qq.com/s/D_kX_5chLMlUcwZKuiilIA)，出处：fancyJava，整理：沉默王二
