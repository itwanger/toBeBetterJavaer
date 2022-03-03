之前我们有一个和第三方对接的需求，需要向第三方推送数据，引入了多线程来提升数据推送的效率，其中用到了线程池来管理线程。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/thread-pool-yingyong-1.png)


主要代码如下：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/thread-pool-yingyong-2.png)


>完整可运行代码地址：https://gitee.com/fighter3/thread-demo.git

线程池的参数如下：

*   corePoolSize：线程核心参数选择了CPU数×2

*   maximumPoolSize：最大线程数选择了和核心线程数相同

*   keepAliveTime：非核心闲置线程存活时间直接置为0

*   unit：非核心线程保持存活的时间选择了 TimeUnit.SECONDS 秒

*   workQueue：线程池等待队列，使用 LinkedBlockingQueue阻塞队列

同时还用了synchronized 来加锁，保证数据不会被重复推送：

```
  synchronized (PushProcessServiceImpl.class) {}
```

ps:这个例子只是简单地进行了数据推送，实际上还可以结合其他的业务，像什么数据清洗啊、数据统计啊，都可以套用。


> [!ATTENTION]
>  图文详解 60 道Java并发面试高频题，这次面试，一定吊打面试官，整理：沉默王二，戳[转载链接](https://mp.weixin.qq.com/s/bImCIoYsH_JEzTkBx2lj4A)，作者：三分恶，戳[原文链接](https://mp.weixin.qq.com/s/1jhBZrAb7bnvkgN1TgAUpw)。