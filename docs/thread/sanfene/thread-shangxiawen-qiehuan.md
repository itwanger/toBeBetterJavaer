使用多线程的目的是为了充分利用CPU，但是我们知道，并发其实是一个CPU来应付多个线程。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/thread-shangxiawen-qiehuan-1.png)

为了让用户感觉多个线程是在同时执行的， CPU 资源的分配采用了时间片轮转也就是给每个线程分配一个时间片，线程在时间片内占用 CPU 执行任务。当线程使用完时间片后，就会处于就绪状态并让出 CPU 让其他线程占用，这就是上下文切换。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/thread-shangxiawen-qiehuan-2.png)

> [!ATTENTION]
>  图文详解 60 道Java并发面试高频题，这次面试，一定吊打面试官，整理：沉默王二，戳[转载链接](https://mp.weixin.qq.com/s/bImCIoYsH_JEzTkBx2lj4A)，作者：三分恶，戳[原文链接](https://mp.weixin.qq.com/s/1jhBZrAb7bnvkgN1TgAUpw)。