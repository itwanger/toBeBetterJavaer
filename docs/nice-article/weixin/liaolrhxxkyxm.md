---
title: 聊聊如何学习开源项目
shortTitle: 聊聊如何学习开源项目
author: 勇哥
category:
  - 微信公众号
---

工作几年的程序员同学，有了一定的项目经验，对于编程也有了自己的理解，但他们偶尔也会感到困惑，不知道接下来该如何提升自己。

在笔者看来："这个阶段的程序员最需要的是提升自身编程能力和视野高度，而学习开源项目是最有效的方法之一"。

这篇文章，笔者聊聊自己的学习开源项目的心得，希望对你有所帮助。

# 1 学会使用

首先，我们需要学习**如何使用开源项目**。

Github 是全球最大的在线软件源代码托管服务平台，很多开源项目都托管在他上面。

在 GIthub 下载源码后，需要重点关注类似 **Quick Start，Getting started ，Example** 之类的文档，这些文档告诉初学者如何使用项目。

假如项目需要部署，参考项目文档，在独立的环境中，尝试从零开始，动手部署该项目。

某些项目也会提供完善的 example 工程·，里面有现成的例子，可以尝试按照文档介绍运行入门例子。

如果入门例子运行顺利 ，对于项目初学者来讲是一个很好的开始。若运行中出现异常，也不必慌张，寻找项目中 FAQ 文档，或者搜索出现问题的关键字（比如异常信息），查询相关的解决方案。

成功运行了项目中第一个基础例子之后，可以尝试运行更复杂的功能例子。

笔者建议**单独创建一个工程，一个一个功能例子完善整个项目。当这个项目越来越充盈，也就证明你掌握得越多**。在学习过程中，将学习的心得记录在笔记中，便于后续回溯。

# 2 阅读源码

**阅读源码是深入理解开源项目最重要的一步**。

阅读源码之前，尝试从源码构建该项目。通常开源项目都会提供一份构建指南，指导你如何搭建一个用于开发、调试和构建的环境。构建成功后，尝试运行该项目。

查看该项目的架构设计文档，梳理出整个项目的骨架，可以画流程图或者 UML 图，加深对项目的理解。

当我们了解到整个项目的骨架后，可以挑选感兴趣的模块来阅读，比如你对网络通讯感兴趣，就阅读网络层的代码，深入到实现细节，如它用了什么库，采用了什么设计模式，为什么这样做等。如果可以，DEBUG 细节代码。

阅读源码的时候，重视单元测试，尝试去运行单元测试，基本上一个好的单元测试会将该代码的功能和边界描述清楚。

笔者体系化的阅读源码是在2014年。彼时，RocketMQ 3.0 刚开源不久，笔者对消息队列极其感兴趣，同时也迫切想了解网络编程框架 Netty 到底是如何使用的。

于是，先从 RocketMQ 网络通讯模块 remoting 开始学习，因为源码中有完善的测试用例，先运行单元测试，学习网络编码模型。

在学习网络编程的过程中，笔者有两点思维突破：

**▍一、客户端的编程模型**

RocketMQ 客户端网络通讯有如下三种方式：

*   oneway : 单向发送
*   sync ：同步调用
*   callback ：异步回调

很多技术的思想是相通的，下图是蚂蚁开源的通讯组件 sofa-bolt 支持的调用类型。

![](https://mmbiz.qpic.cn/mmbiz_png/V71JNV78n28Y8MicStwz8LpZ58sNEy5RuR03NuIZuzKYiabSwdrgkQUCRoymNsubXOlkFP7MCicunObuu4frs94Rg/640?wx_fmt=png)

蚂蚁通讯框架Bolt调用类型

**▍二、服务端处理器模式**

RocketMQ 服务端通讯使用经典的 Reactor 模式 ，服务端注册不同的业务处理器，而各个业务处理器可以绑定不同的线程池。

```
void registerProcessor(

      final int requestCode, 

      final NettyRequestProcessor processor,

      final ExecutorService executor);
```

![](https://mmbiz.qpic.cn/mmbiz_png/V71JNV78n28Y8MicStwz8LpZ58sNEy5Ruk6t4pMGiaEI7rpq2qfzouy4aJiawrfAicoVl3CssJJVLrcgBCdDhv5cSg/640?wx_fmt=png)

* * *

学完网络框架 Remoting 之后，然后结合 Broker 模块，学习 RocketMQ 存储模型，通过这种方式就可以对 RocketMQ 有了一个相对清晰的认识。

# 3 知行合一

笔者大学刚毕业的时候，读李开复老师的书，书中有一句话，我印象深刻：“**I Hear and I Forget, I See and I Remember, I Do and I Understand** ” 。

中国古代哲学家荀子也说过："**不闻不若闻之，闻之不若见之，见之不若知之，知之不若行之；学至于行之而止矣**"。

学习源码的过程中，将知识点夯实的关键要诀是**动手实践**，并保证实践之后有**输出产物**，也就是**知行合一**。

笔者总结了两点经验，供大家参考。

**▍一、源码中的知识点应用到项目中**

开源项目中有非常多的**优秀实践** ，可以将代码中的编码技巧，设计思想，优秀源码引进到业务项目里。

2014年，艺龙的优惠券计算服务遇到性能瓶颈，笔者负责重构这个系统。在阅读 RocketMQ 源码后，学习到了线程池使用精髓：**线程池隔离，各司其职** 。

于是，笔者先梳理出业务场景，根据任务类型，绑定不同的线程池，为了便于扩展同时对外暴露并发度的配置参数。在重构这个系统的过程中，还引入 RocketMQ 创建线程工具类代码 。

重构之后，不仅系统的性能提升了5倍，而且笔者的自信心也大大提升，对技术的理解也更加深刻。

**▍ 二、造轮子**

当我们学习了一个开源项目，我们可以参考开源源码仿写一个。仿写的过程就是查漏补缺的过程，也能完善自己的知识体系。

2016年，sharding-jdbc 开源了，下图是当时 sharding-jdbc 的架构设计图：

![](https://mmbiz.qpic.cn/mmbiz_png/V71JNV78n28Y8MicStwz8LpZ58sNEy5RuSqHFDEbve3ibpS9LCQ8ABpmszKzZvQCOv4gGKPFE2cXbEsl7UvVlmsQ/640?wx_fmt=png)

笔者当时对分库分表着迷，同时脑海里有很多疑问，比如如何封装 jdbc 的接口，如何实现 SQL 解析 ，如何将多个分片的结果聚合等。

于是，笔者参考 sharding-jdbc 的源码，仿写了一个分库分表组件。

![](https://mmbiz.qpic.cn/mmbiz_png/V71JNV78n28Y8MicStwz8LpZ58sNEy5RuLBRfQbiaOoFHsVXECnhTyHaFDqWRTtMqOGOtP3Hz3J7o00ib094Jg70g/640?wx_fmt=png)

经过这次仿写，笔者深入实践了 client 模式分库分表的原理，并积累了自己的技术储备。

# 4 参与开源

> “开源理念之一就是非常鼓励不同的人一起合作”。——Linux 之父 `Linus Torvalds` 2016 年 2 月 TED 演讲《The mind behind Linux (opens new window)》

在《教授鼓励学生参与开源项目的 5 个理由》这篇文章里，提到了如下五点理由：

1.  无边界的学习
2.  专业的交流
3.  外在的机会
4.  更深入的理解计算机科学
5.  玩

那么程序员如何参与开源呢 ？参与开源有很多种方式，最常见的有如下几种：

1.  直接参与开源项目的开发
2.  参考开源项目的社区比赛
3.  修复开源项目中的 Bug
4.  开源项目文档编写
5.  参与开源项目的测试和 Demo 编写工作
6.  参与开源项目推广

参与一个开源项目，并与许许多多同样聪明的工程师协作，把脑海中的奇思妙想一一实现，那是多么美好的事情。

# 5 写到最后

亲爱的程序员朋友，当你不知道选择哪一个开源项目开始学习时，希望你**立足当下，**当前技术团队使用的开源组件，正是你学习的方向。

行动起来，相信你会成为更好的自己，加油。

![](https://mmbiz.qpic.cn/mmbiz_jpg/E44aHibktsKapR0VnBicTdJkajth5o8OQpKjuXr5a1TuW21dmiaB2enXIFONvu1C5utmic40xbaRKl2OLeW5ImvJibQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

![](https://mmbiz.qpic.cn/mmbiz_png/E44aHibktsKb9KpZvt9jfMS0rPmyMufl11zg41ExIr2bDlcrQbNgW78TXFA642PI0F50yn0YGHROcWFVeFJCQTg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

最近我开通了[**股东服务**](https://mp.weixin.qq.com/s?__biz=MzI4Njg5MDA5NA==&mid=2247505577&idx=1&sn=5114f8f583755899c2946fbea0b22e4b&chksm=ebd497a8dca31ebe8f98344483a00c860863dfc3586e51eed95b25988151427fee8101311f4f&token=319992632&lang=zh_CN&scene=21#wechat_redirect)，感兴趣的可戳：[**我开通了付费渠道**](http://mp.weixin.qq.com/s?__biz=MzU4NzA3MTc5Mg==&mid=2247487129&idx=1&sn=4b0d7f12315585738c33e655326805c7&chksm=fdf0e6c6ca876fd034adb19af56315a9221e0e8c71fe3d7924627872e1706789b04c44dc571d&scene=21#wechat_redirect)

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/2BGWl1qPxib14ibDza9cLmAHwzNX1iaicgMvEmWBP7yEOkGIQCyIjPELEvMkcM6Q34saoqtAl20kxMagrqyzMRAryA/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

关注公众号回复「**对线」**即可免费领取《对线面试官》系列电子书**。**

点击 阅读原文  跳转至Java开源消息推送平台项目仓库

>参考链接：[https://mp.weixin.qq.com/s/nWdzvy76YV4sKqmu6znfQg](https://mp.weixin.qq.com/s/nWdzvy76YV4sKqmu6znfQg)，出处：Java3y，整理：沉默王二
