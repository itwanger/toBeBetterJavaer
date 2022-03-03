用一个通俗的比喻：

有一个营业厅，总共有六个窗口，现在开放了三个窗口，现在有三个窗口坐着三个营业员小姐姐在营业。

老三去办业务，可能会遇到什么情况呢？

1.  老三发现有空间的在营业的窗口，直接去找小姐姐办理业务。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/thread-pool-gongzuoliu-1.png)


2.  老三发现没有空闲的窗口，就在排队区排队等。

[外链图片转存中...(img-BtNkSrUZ-1646030653393)]



3.  老三发现没有空闲的窗口，等待区也满了，蚌埠住了，经理一看，就让休息的小姐姐赶紧回来上班，等待区号靠前的赶紧去新窗口办，老三去排队区排队。小姐姐比较辛苦，假如一段时间发现他们可以不用接着营业，经理就让她们接着休息。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/thread-pool-gongzuoliu-2.png)



4.  老三一看，六个窗口都满了，等待区也没位置了。老三急了，要闹，经理赶紧出来了，经理该怎么办呢？

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/thread-pool-gongzuoliu-3.png)



> 1.  我们银行系统已经瘫痪
>     
>     
> 2.  谁叫你来办的你找谁去
>     
>     
> 3.  看你比较急，去队里加个塞
>     
>     
> 4.  今天没办法，不行你看改一天

上面的这个流程几乎就跟 JDK 线程池的大致流程类似，

> 1.  营业中的 3个窗口对应核心线程池数：corePoolSize
> 2.  总的营业窗口数6对应：maximumPoolSize
> 3.  打开的临时窗口在多少时间内无人办理则关闭对应：unit
> 4.  排队区就是等待队列：workQueue
> 5.  无法办理的时候银行给出的解决方法对应：RejectedExecutionHandler
> 6.  threadFactory 该参数在 JDK 中是 线程工厂，用来创建线程对象，一般不会动。

所以我们线程池的工作流程也比较好理解了：

1.  线程池刚创建时，里面没有一个线程。任务队列是作为参数传进来的。不过，就算队列里面有任务，线程池也不会马上执行它们。
2.  当调用 execute() 方法添加一个任务时，线程池会做如下判断：

*   如果正在运行的线程数量小于 corePoolSize，那么马上创建线程运行这个任务；
*   如果正在运行的线程数量大于或等于 corePoolSize，那么将这个任务放入队列；
*   如果这时候队列满了，而且正在运行的线程数量小于 maximumPoolSize，那么还是要创建非核心线程立刻运行这个任务；
*   如果队列满了，而且正在运行的线程数量大于或等于 maximumPoolSize，那么线程池会根据拒绝策略来对应处理。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/thread-pool-gongzuoliu-4.png)



3.  当一个线程完成任务时，它会从队列中取下一个任务来执行。

4.  当一个线程无事可做，超过一定的时间（keepAliveTime）时，线程池会判断，如果当前运行的线程数大于 corePoolSize，那么这个线程就被停掉。所以线程池的所有任务完成后，它最终会收缩到 corePoolSize 的大小。

> [!ATTENTION]
>  图文详解 60 道Java并发面试高频题，这次面试，一定吊打面试官，整理：沉默王二，戳[转载链接](https://mp.weixin.qq.com/s/bImCIoYsH_JEzTkBx2lj4A)，作者：三分恶，戳[原文链接](https://mp.weixin.qq.com/s/1jhBZrAb7bnvkgN1TgAUpw)。
