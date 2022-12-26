---
title: 没有几十年功力，写不出这一行“看似无用”的代码！！
shortTitle: 没有几十年功力，写不出这一行“看似无用”的代码！！
description: 要从一个奇怪的注释说起！
author: why技术
category:
  - 微信公众号
---

>[二哥的编程星球](https://mp.weixin.qq.com/s/e5Q4aJCX9xccTzBBGepx4g)已经有 **750 多名** 球友加入了，如果你也需要一个良好的学习氛围，[戳链接](https://mp.weixin.qq.com/s/e5Q4aJCX9xccTzBBGepx4g)加入我们吧！这是一个Java学习指南+编程实战+LeetCode 刷题的私密圈子，你可以向二哥提问、帮你制定学习计划、和球友一起打卡成长，冲冲冲。

这篇文章要从一个奇怪的注释说起，就是下面这张图：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-moyjsnglxbczyxkswyddm-1f69f0ce-8122-470e-a98a-1003bff384b0.jpg)

我们可以不用管具体的代码逻辑，只是单单看这个 for 循环。

在循环里面，专门有个变量 j，来记录当前循环次数。

第一次循环以及往后每 1000 次循环之后，进入一个 if 逻辑。

在这个 if 逻辑之上，标注了一个注释：prevent gc.

prevent，这个单词如果不认识的同学记一下，考试肯定要考的：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-moyjsnglxbczyxkswyddm-b2e1de33-114d-4675-a4ec-151a4e72c310.jpg)

这个注释翻译一下就是：防止 GC 线程进行垃圾回收。

具体的实现逻辑是这样的：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-moyjsnglxbczyxkswyddm-8c765043-a67d-456a-9e60-58ee961ca5eb.jpg)

核心逻辑其实就是这样一行代码：

> Thread.sleep(0);

这样就能实现 prevent gc 了？

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-moyjsnglxbczyxkswyddm-a03a6ac5-420e-4ea2-bda9-ff3252f0fd5b.jpg)

图片

懵逼吗？

懵逼就对了，懵逼就说明值得把玩把玩。

这个代码片段，其实是出自 RocketMQ 的源码：

> org.apache.rocketmq.store.logfile.DefaultMappedFile#warmMappedFile

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-moyjsnglxbczyxkswyddm-146a842c-e4f4-40bd-a3b6-b63753f5d0f5.jpg)

事先需要说明的是，我并没有找到写这个代码的人问他的意图是什么，所以我只有基于自己的理解去推测他的意图。如果推测的不对，还请多多指教。

虽然这是 RocketMQ 的源码，但是基于我的理解，这个小技巧和 RocketMQ 框架没有任何关系，完全可以脱离于框架存在。

我给出的修改意见是这样的：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-moyjsnglxbczyxkswyddm-89e3f8fb-c4d8-4a43-b7d5-1fa152e38126.jpg)

把 int 修改为 long，然后就可以直接把 for 循环里面的 if 逻辑删除掉了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-moyjsnglxbczyxkswyddm-07f96325-2a98-4ca9-afd8-2c1f0a450cbf.jpg)

这样一看是不是更加懵逼了？

不要慌，接下来，我给你抽丝剥个茧。

另外，在“剥茧”之前，我先说一下结论：

*   提出这个修改方案的理论立足点是 Java 的安全点相关的知识，也就是 safepoint。
*   官方最后没有采纳这个修改方案。
*   官方采没采纳不重要，重要的是我高低得给你“剥个茧”。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-moyjsnglxbczyxkswyddm-1bce37d6-a2e6-4926-a213-56352d1e6cac.jpg)

## **探索**

当我知道这个代码片段是属于 RocketMQ 的时候，我想到的第一个点就是从代码提交记录中寻找答案。

看提交者是否在提交代码的时候说明了自己的意图。

于是我把代码拉了下来，一看提交记录是这样的：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-moyjsnglxbczyxkswyddm-a2ccf1d2-3501-4876-ad15-28a34f5153da.jpg)

我就知道这里不会有答案了。

因为这个类第一次提交的时候就已经包含了这个逻辑，而且对应这次提交的代码也非常多，并没有特别说明对应的功能。

从提交记录上没有获得什么有用的信息。

于是我把目光转向了 github 的 issue，拿着关键词 prevent gc 搜索了一番。

除了第一个链接之外，没有找到什么有用的信息：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-moyjsnglxbczyxkswyddm-3d1ec5f2-e409-4305-967e-3fd1b9326d49.jpg)

而第一个链接对应的 issues 是这个：

> https://github.com/apache/rocketmq/issues/4902

这个 issues 其实就是我们在讨论这个问题的过程中提出来的，也就是前面出现的修改方案：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-moyjsnglxbczyxkswyddm-0ecc61c5-1e29-498c-b069-f960279f239c.jpg)

也就是说，我想通过源码或者 github 找到这个问题权威的回答，是找不到了。

于是我又去了这个神奇的网站，在里面找到了这个 2018 年提出的问题：

> https://stackoverflow.com/questions/53284031/why-thread-sleep0-can-prevent-gc-in-rocketmq

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-moyjsnglxbczyxkswyddm-d475da21-31f9-461b-9ff3-224024d7021d.jpg)

问题和我们的问题一模一样，但是这个问题下面就这一个回答：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-moyjsnglxbczyxkswyddm-2e92107e-777e-437a-93af-9247be7638c8.jpg)

这个回答并不好，因为我觉得没答到点上，但是没关系，我刚好可以把这个回答作为抓手，把差的这一点拉通对齐一下，给它赋能。

先看这个回答的第一句话：It does not（它没有）。

问题就来了：“它”是谁？“没有”什么？

“它”，指的就是我们前面出现的代码。

“没有”，是说没有防止 GC 线程进行垃圾回收。

这个的回答说：通过调用 Thread.sleep(0) 的目的是为了让 GC 线程有机会被操作系统选中，从而进行垃圾清理的工作。它的副作用是，可能会更频繁地运行 GC，毕竟你每 1000 次迭代就有一次运行 GC 的机会，但是好处是可以防止长时间的垃圾收集。

换句话说，这个代码是想要“触发”GC，而不是“避免”GC，或者说是“避免”时间很长的 GC。从这个角度来说，程序里面的注释其实是在撒谎或者没写完整。

不是 prevent gc，而是对 gc 采取了“打散运行，削峰填谷”的思想，从而 prevent long time gc。

但是你想想，我们自己编程的时候，正常情况下从来也没冒出过“这个地方应该触发一下 GC”这样想法吧？

因为我们知道，Java 程序员来说，虚拟机有自己的 GC 机制，我们不需要像写 C 或者 C++ 那样得自己管理内存，只要关注于业务代码即可，并没有特别注意 GC 机制。

那么本文中最关键的一个问题就来了：**为什么这里要在代码里面特别注意 GC，想要尝试“触发”GC 呢？**

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-moyjsnglxbczyxkswyddm-6b749e84-c316-4435-94c8-fe4bc3a57c5a.jpg)

先说答案：safepoint，安全点。

关于安全点的描述，我们可以看看《深入理解 JVM 虚拟机(第三版)》的 3.4.2 小节：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-moyjsnglxbczyxkswyddm-bf69bc21-2d42-4c69-85ce-43676ce8d7cd.jpg)

注意书里面的描述：

> 有了安全点的设定，也就决定了用户程序执行时并非在代码指令流的任意位置都能够停顿下来开始垃圾收集，而是强制要求必须执行到达安全点后才能够暂停。

换言之：没有到安全点，是不能 STW，从而进行 GC 的。

如果在你的认知里面 GC 线程是随时都可以运行的。那么就需要刷新一下认知了。

接着，让我们把目光放到书的 5.2.8 小节：由安全点导致长时间停顿。

里面有这样一段话：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-moyjsnglxbczyxkswyddm-5835322a-ffcd-4dfa-977c-6bc4ade41353.jpg)

我把划线的部分单独拿出来，你仔细读一遍：

> 是 HotSpot 虚拟机为了避免安全点过多带来过重的负担，对循环还有一项优化措施，认为循环次数较少的话，执行时间应该也不会太长，所以使用 int 类型或范围更小的数据类型作为索引值的循环默认是不会被放置安全点的。这种循环被称为可数循环（Counted Loop），相对应地，使用 long 或者范围更大的数据类型作为索引值的循环就被称为不可数循环（Uncounted Loop），将会被放置安全点。

意思就是在可数循环（Counted Loop）的情况下，HotSpot 虚拟机搞了一个优化，就是等循环结束之后，线程才会进入安全点。

反过来说就是：循环如果没有结束，线程不会进入安全点，GC 线程就得等着当前的线程循环结束，进入安全点，才能开始工作。

什么是可数循环（Counted Loop）？

书里面的这个案例来自于这个链接：

> https://juejin.cn/post/6844903878765314061 HBase 实战：记一次 Safepoint 导致长时间 STW 的踩坑之旅

如果你有时间，我建议你把这个案例完整的看一下，我只截取问题解决的部分：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-moyjsnglxbczyxkswyddm-8406a4d2-c6dc-4926-b28d-566459b75b9e.jpg)

截图中的 while(i < end) 就是一个可数循环，由于执行这个循环的线程需要在循环结束后才进入 Safepoint，所以先进入 Safepoint 的线程需要等待它。从而影响到 GC 线程的运行。

所以，修改方案就是把 int 修改为 long。

原理就是让其变为不可数循环（Uncounted Loop），从而不用等循环结束，在循环期间就能进入 Safepoint。

接着我们再把目光拉回到这里：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-moyjsnglxbczyxkswyddm-ea048839-1b93-4eef-a915-5ab757c039c0.jpg)

这个循环也是一个可数循环。

Thread.sleep(0) 这个代码看起来莫名其妙，但是我是不是可以大胆的猜测一下：故意写这个代码的人，是不是为了在这里放置一个 Safepoint 呢，以达到避免 GC 线程长时间等待，从而加长 stop the world 的时间的目的？

所以，我接下来只需要找到 sleep 会进入 Safepoint 的证据，就能证明我的猜想。

你猜怎么着？

本来是想去看一下源码，结果啪的一下，在源码的注释里面，直接找到了：

> https://hg.openjdk.java.net/jdk8u/jdk8u/hotspot/file/tip/src/share/vm/runtime/safepoint.cpp

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-moyjsnglxbczyxkswyddm-1468e19e-d613-45bb-bf17-29cb32391f50.jpg)

注释里面说，在程序进入 Safepoint 的时候， Java 线程可能正处于框起来的五种不同的状态，针对不同的状态有不同的处理方案。

本来我想一个个的翻译的，但是信息量太大，我消化起来有点费劲儿，所以就不乱说了。

主要聚焦于和本文相关的第二点：Running in native code。

> When returning from the native code, a Java thread must check the safepoint \_state to see if we must block.

第一句话，就是答案，意思就是一个线程在运行 native 方法后，返回到 Java 线程后，必须进行一次 safepoint 的检测。

同时我在知乎看到了 R 大的这个回答，里面有这样一句，也印证了这个点：

> https://www.zhihu.com/question/29268019/answer/43762165

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-moyjsnglxbczyxkswyddm-c6585830-3b04-4691-bcf4-46657591423e.jpg)

那么接下来，就是见证奇迹的时刻了：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-moyjsnglxbczyxkswyddm-66727b54-f6a2-4209-9d79-851e6cb663a2.jpg)

根据 R 大的说法：正在执行 native 函数的线程看作“已经进入了 safepoint”，或者把这种情况叫做“在 safe-region 里”。

sleep 方法就是一个 native 方法，你说巧不巧？

所以，到这里我们可以确定的是：调用 sleep 方法的线程会进入 Safepoint。

另外，我还找到了一个 2013 年的 R 大关于类似问题讨论的帖子：

> https://hllvm-group.iteye.com/group/topic/38232?page=2

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-moyjsnglxbczyxkswyddm-1e9abecb-c865-4ac2-ab56-1de12e99ac14.jpg)

这里就直接点名道姓的指出了：Thread.sleep(0).

这让我想起以前有个面试题问：Thread.sleep(0) 有什么用。

当时我就想：这题真难（S）啊（B）。现在发现原来是我道行不够，小丑竟是我自己。

还真的是有用。

## **实践**

前面其实说的都是理论。

这一部分我们来拿代码实践跑上一把，就拿我之前分享过的[《真是绝了！这段被 JVM 动了手脚的代码！》](https://mp.weixin.qq.com/s?__biz=Mzg3NjU3NTkwMQ==&mid=2247509056&idx=1&sn=1d8383e50127b6b45186d243b92f5037&scene=21#wechat_redirect)文章里面的案例。

```
public class MainTest {

    public static AtomicInteger num = new AtomicInteger(0);

    public static void main(String[] args) throws InterruptedException {
        Runnable runnable=()->{
            for (int i = 0; i < 1000000000; i++) {
                num.getAndAdd(1);
            }
            System.out.println(Thread.currentThread().getName()+"执行结束!");
        };

        Thread t1 = new Thread(runnable);
        Thread t2 = new Thread(runnable);
        t1.start();
        t2.start();
        Thread.sleep(1000);
        System.out.println("num = " + num);
    }
}
```

这个代码，你直接粘到你的 IDEA 里面去就能跑。

按照代码来看，主线程休眠 1000ms 后就会输出结果，但是实际情况却是主线程一直在等待 t1,t2 执行结束才继续执行。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-moyjsnglxbczyxkswyddm-b1ac91e0-1430-4d4f-a1ee-7e9257208151.jpg)

图片

这个循环就属于前面说的可数循环（Counted Loop）。

这个程序发生了什么事情呢？

*   1.启动了两个长的、不间断的循环（内部没有安全点检查）。
*   2.主线程进入睡眠状态 1 秒钟。
*   3.在 1000 ms 之后，JVM 尝试在 Safepoint 停止，以便 Java 线程进行定期清理，但是直到可数循环完成后才能执行此操作。
*   4.主线程的 Thread.sleep 方法从 native 返回，发现安全点操作正在进行中，于是把自己挂起，直到操作结束。

所以，当我们把 int 修改为 long 后，程序就表现正常了：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-moyjsnglxbczyxkswyddm-c44b9901-a75e-490a-9e84-121b8f1b7ca6.jpg)

受到 RocketMQ 源码的启示，我们还可以直接把它的代码拿过来：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-moyjsnglxbczyxkswyddm-bf1cfd2e-024a-45c1-94b0-43f4653f41a5.jpg)

这样，即使 for 循环的对象是 int 类型，也可以按照预期执行。因为我们相当于在循环体中插入了 Safepoint。

另外，我通过**不严谨的方式**测试了一下两个方案的耗时：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-moyjsnglxbczyxkswyddm-d764519c-05d1-43a2-9fd9-97e1a5f0da31.jpg)

在我的机器上运行了几次，时间上都差距不大。

但是要论逼格的话，还得是右边的 prevent gc 的写法。没有二十年功力，写不出这一行“看似无用”的代码！

## **额外提一句**

再说一个也是由前面的 RocketMQ 的源码引起的一个思考：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-moyjsnglxbczyxkswyddm-d4d985fa-e45a-46e4-875a-695e08924da9.jpg)

这个方法是在干啥？

预热文件，按照 4K 的大小往 byteBuffer 放 0，对文件进行预热。

> byteBuffer.put(i, (byte) 0);

为什么我会对这个 4k 的预热比较敏感呢？

去年的天池大赛有这样的一个赛道：

> https://tianchi.aliyun.com/competition/entrance/531922/information

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-moyjsnglxbczyxkswyddm-48431bc4-4ed9-4b47-85f3-0afad04122d6.jpg)

其中有两个参赛选大佬都提到了“文件预热”的思路。

我把链接放在下面了，有兴趣的可以去细读一下：

> https://tianchi.aliyun.com/forum/postDetail?spm=5176.12586969.0.0.13714154spKjib&postId=300892

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-moyjsnglxbczyxkswyddm-aaa07604-9075-44ca-b9c3-5fc6d050bc39.jpg)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-moyjsnglxbczyxkswyddm-34ee7d10-2279-40cf-8da0-38882fd96806.jpg)

> https://tianchi.aliyun.com/forum/postDetail?spm=5176.21852664.0.0.4c353a5a06PzVZ&postId=313716

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-moyjsnglxbczyxkswyddm-f89f8ade-dc10-42e2-8380-fd11f7127a5e.jpg)

好了，本文的技术部分就到这里啦。

你要不喜欢，退出之前记得文末点个“在看”哦。


----

没有什么使我停留——除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟。

- [2.7万学费的培训机构，体验如何？](https://mp.weixin.qq.com/s/DI3XLQ2VOLK-FZBK792ZYQ)
- [MyBatis批量插入10w条数据仅用2秒](https://mp.weixin.qq.com/s/FPnhVgdgpjwVFgGGUoQCVw)
- [不到 20 人的公司能去吗？](https://mp.weixin.qq.com/s/c5h_IOBYfVTmkrM9S1q1tw)
- [钱付了订单还是未支付，怎么解决？](https://mp.weixin.qq.com/s/nzR9eKFgEbpPFIkMF40vYw)
- [涨薪40%，从国企跳到一家小公司！](https://mp.weixin.qq.com/s/NT4fVbI8hDdN7MQkG2RNdQ)
- [暑假在富士康打工50天，感受如何？](https://mp.weixin.qq.com/s/luKyE0O1eGBhUyBuoAONqA)
- [35 岁危机怎么破？](https://mp.weixin.qq.com/s/duEzl6qiM59cHVdFhWB2FA)
- [面试通过，背调凉了！](https://mp.weixin.qq.com/s/R8IonWhFfNk0H1vUgjEadg)







![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-rumrabbitmqzypjdg-53717e59-63c9-44bd-99d3-dd2c26fe68bb.png)