---
category:
  - 学习路线
tag:
  - Java
---

# Java并发学习路线

众所周知，Java 并发是 Java 程序员必须懂但又很难懂的一块知识点。一般来说，很少有人敢说自己精通 Java 并发的，一是容易被面试官吊打，二是并发编程涉及到操作系统、内存、CPU 等计算机专业比较核心的内容，比较考验一个程序员的内功。

今天这篇文章就来给大家盘点一下 Java 并发到底该如何从入门到精通，请及时用鸡毛掸子把收藏夹里的灰清理一下。在阅读过程中，如果有所帮助，麻烦点赞/收藏和转发，算是对我码字的这份坚持的亿点点鼓励。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/xuexiluxian/java-thread-1.gif)


### 一、为什么要学 Java 并发？

有句话不知道当讲不当讲，先讲了再说，就是“如果你只想 CURD，那么 Java 并发不学也罢！”但其实呢，大家都已经被教育的很有涵养了，工作中拧不拧螺丝不重要，重要的是面试一定要会造火箭，不然面试的机会都很难捞得到。

那作为 Java 体系中非常重要的一环，Java 并发自然是必须要掌握的，最起码也得会起个多线程吧？哈哈哈。高级点的，像平常开发中用到的 Tomcat 服务器、消息中间件、RPC 框架等等，它们的底层都涉及到了并发编程。

当然了，Java 并发涉及到东西实在是不少，包括操作系统的知识，Java 虚拟机的一些知识，Java 线程模型的知识，多线程相关的关键字，比如说 synchronized、volatile 等，还有锁的知识、JDK 提供的工具类等等，学起来还是非常容易令人头大的。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/xuexiluxian/java-thread-2.png)

因此，我们需要一些高效的学习路线图，以及一些优质的学习资源，从而减少我们学习Java 并发编程所投入的时间和精力。

### 二、Java 并发学习路线图

给大家看一张 pdai.tech 学习网站上总结的一张关于 Java 并发编程的思维导图，非常清晰，一目了然，包含了理论基础、线程基础、synchronized、volatile、final关键字，以及JUC框架等核心内容。

>网站地址：https://pdai.tech/

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/xuexiluxian/java-concurrent-overview-1.png)

如果想总览 Java 并发编程的关键知识点的话，这张思维导图还是非常值得参考的。

### 三、硬核 Java 并发学习资料

**1）视频**

懂的都懂，看视频到 B 站。黑马的《Java并发编程》评价还不错，300 多个小节，我觉得讲的比较好的有三部分：synchronized优化原理、AQS和线程池。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/xuexiluxian/java-thread-4.png)

>视频地址：https://www.bilibili.com/video/BV16J411h7Rd

**2）书籍**

纸质书只推荐一本《[Java 并发编程实战](https://book.douban.com/subject/10484692/)》，豆瓣评分 9.0。不过这本书确实有点老了，基本上是按照 Java 6 来讲解的，希望出版社能早点出 2.0 版。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/xuexiluxian/java-thread-5.png)

《Java 并发编程实战》这本书从总体上来看，分两条主线：

- 介绍 Java 并发包的重要组件和原理
- 如何利用这些组件来保证线程安全

到底该如何获得线程安全呢？背会并理解下面这段话：

>Writing thread-safe code is, at its core, about managing access to state, and in particular to shared, mutable state.

如果发现不是很好懂，想从国内作者下手的话，可以尝试一下《[Java并发编程的艺术](https://book.douban.com/subject/26591326/)》和《[图解Java并发编程](https://book.douban.com/subject/35634953/)》这两本书，虽然豆瓣上评分一般，但对于构建 Java 并发的知识体系还是有很大帮助的。

之后，再去啃《Java 并发编程实战》就会发现没有以前那么费劲了，这本书之所以被誉为 Java 并发编程的圣经，确实可以看得出作者在并发编程方面有着丰富的经验。



**3）开源电子书**

推荐 RedSpider社区的[深入浅出 Java 多线程](http://concurrent.redspider.group/RedSpider.html)，比Java 并发编程实战更通俗易懂一些，因为里面穿插了很多精美的手绘图。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/xuexiluxian/java-thread-6.png)

>GitHub地址：https://github.com/RedSpider1/concurrent

考虑到有些小伙伴可能需要 [PDF 版本](https://mp.weixin.qq.com/s/pxKrjw_5NTdZfHOKCkwn8w)，我花了一周的时间整理了一份，需要的小伙伴请扫描下方的二维码关注作者的原创公众号「**沉默王二**」回复关键字「**并发**」就可以拉取到了。

![扫码关注后回复「并发」关键字](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

再推荐一份 GitHub 上星标 3.6k+ 的 Java 并发知识点总结：

>https://github.com/CL0610/Java-concurrency

仓库里有一句话我非常喜欢，也分享给各位小伙伴：

>努力的意义，就是，在以后的日子里，放眼望去全是自己喜欢的人和事！

顺带再推荐一份完整的Java 并发学习笔记：

>http://www.blogjava.net/xylz/archive/2010/07/08/325587.html



**4）付费专栏**

王宝令老师在极客时间上开了一门《Java 并发编程实战》的付费专栏，质量还是挺高的，喜欢的小伙伴可以戳[链接](http://gk.link/a/11cBH)去购买。


### 四、优质八股文

这里给大家推荐两份 Java 并发编程方面的八股文，一份来自[三分恶](https://mp.weixin.qq.com/s/1jhBZrAb7bnvkgN1TgAUpw)，一份来自小牛，先截图给大家看一下 Java 并发方面都有哪些高频的面试题。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/xuexiluxian/java-thread-7.png)

为了方便大家的阅读和背诵，我已经将其整理到了二哥的小破站《Java 程序员进阶之路》上。路径一：Java核心→Java并发编程→面渣逆袭

>https://mp.weixin.qq.com/s/bImCIoYsH_JEzTkBx2lj4A

路径二：求职面试→八股文→Java并发编程八股文（背诵版）

>https://mp.weixin.qq.com/s/HEzi-UKs-hpWhTh_HPWaMQ

这两份八股文的质量都非常高，来看一下「[AQS了解多少](https://tobebetterjavaer.com/#/docs/thread/sanfene/aqs)」小节下的内容，图文并茂，非常容易消化和吸收。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/xuexiluxian/java-thread-8.png)

诚实点说，如果能把这两份八股文背会的话，简历上就真的敢写“精通”Java 并发了。

### 五、Java 并发学习心得

Java 提供的并发组件，大致可以分为两类：

- 从预防阶段下手，防止错误发生，比如说 synchronized 关键字
- 一旦发生错误能及时重试，比如说 CAS

对于线程数量比较多的并发场景，采用预防的措施会比较合理，这样大部分线程就不会因为小概率时间的 CAS 重试浪费掉大量的 CPU 周期；在线程数量小的时候，CAS 的意义就比较大，因为预防措施带来的线程切换要比 CAS 等待的开销更大。

想要学好 Java 并发编程，就必须得对下图中提到的基础概念进行充分的理解。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/xuexiluxian/java-thread-9.jpg)

在我看来，并发编程主要是用来解决这两个痛点的：

- 多个线程对同一变量造成的不一致问题；
- 为提高性能，计算机的很多执行单元都配备了缓存，那势必会影响并发编程的数据一致性。

需要提醒一点的是，多线程并发虽然是用来解决性能问题的，但并不意味着所有情况下都需要开启多线程，有时候反而会适得其反，那如果不是特别要求，尽量不要过早开启多线程。

并发编程是 Java 体系当中相对难掌握的一块知识点，比较考验一名程序员的内功，其实并发编程最早的应用领域就是操作系统的实现。

如果你已经有一定的编程经验，建议先学一下《计算机组成原理》，对操作系统、内存、CPU 先进行一些大致的了解，然后再来学习 Java 并发编程，可能就会感觉舒服多了！

结合我多年的工作经验来看，并发编程可以抽象成**三个核心问题：分工、同步和互斥**。

1）分工

分工指的是如何高效地拆解任务并分配给线程，像并发编程领域的一些设计模式，比如说生产者与消费者就是用来进行分工的。

2）同步

同步指的是线程之间如何协作，一个线程执行完了一个任务，要通知另外一个线程开工。还拿生产者-消费者模型来说吧，当队列满的时候，生产者线程等待，当队列不满的时候，生产者线程需要被唤醒重新执行；当队列空的时候，消费者线程开始等待，不空的时候，消费者线程被重新唤醒。

3）互斥

互斥指的是保证同一时刻只有一个线程访问共享资源，是解决线程安全问题的杀手锏。

当多个线程同时访问一个共享变量的时候，很容易出现“线程安全”问题，因为结果可能是不确定的——导致出现这个问题的根源就是可见性、有序性和原子性——为了解决它们，Java 引入了内存模型的概念，可以在一定程度上缓解“线程安全”的问题，但要想完全解决“线程安全”问题，还得靠互斥。

互斥的核心技术就是锁，比如说 synchronized，还有各种 Lock。

锁可以解决线程安全的问题，但同时也就意味着程序的性能要受到影响。

因此，Java 提供了针对不同场景下的锁，比如说读写锁 ReadWriteLock，可以解决多线程同时读，但只有一个线程能写的问题；但 ReadWriteLock 也有自己的问题，就是如果有线程正在读，写线程需要等待度线程释放锁后才能获得写锁，也就是读的过程中不允许写，属于一种悲观的读锁。

为了进一步提升并发执行的效率，Java 8 引入了一个新的读写锁 StampedLock，与ReadWriteLock 相比，StampedLock的优势在于读的过程中也允许获取写锁后写入，但带来的问题就是可能读的数据不一致，需要一点额外的代码来判断读的过程中是否有写入，本质上是一种乐观的锁。

乐观锁的意思就是估计读的过程中大概率不会有写入，而悲观锁则是读的过程中拒绝有写入，两者的区别就在于性能上会有差异，乐观锁需要针对小概率事件进行多一步的检测，但性能也会有所提升；悲观锁更能保证“线程安全性”。

听我这么一说，是不是一下子就清晰多了！

**Java 并发编程虽然难学，会涉及到操作系统、CPU、内存等偏基础方面的内容，但如果你能坚持学下去，内功自然而然就提升了一大截**。

参考资料：

>小熊的技术之路：https://zhuanlan.zhihu.com/p/25577863
