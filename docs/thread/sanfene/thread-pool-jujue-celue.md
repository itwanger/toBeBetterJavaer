类比前面的例子，无法办理业务时的处理方式，帮助记忆：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/thread-pool-args-2.png)



*   AbortPolicy ：直接抛出异常，默认使用此策略
*   CallerRunsPolicy：用调用者所在的线程来执行任务
*   DiscardOldestPolicy：丢弃阻塞队列里最老的任务，也就是队列里靠前的任务
*   DiscardPolicy ：当前任务直接丢弃

想实现自己的拒绝策略，实现RejectedExecutionHandler接口即可。

> [!ATTENTION]
>  图文详解 60 道Java并发面试高频题，这次面试，一定吊打面试官，整理：沉默王二，戳[转载链接](https://mp.weixin.qq.com/s/bImCIoYsH_JEzTkBx2lj4A)，作者：三分恶，戳[原文链接](https://mp.weixin.qq.com/s/1jhBZrAb7bnvkgN1TgAUpw)。