线程在Java中属于稀缺资源，线程池不是越大越好也不是越小越好。任务分为计算密集型、IO密集型、混合型。

1.  计算密集型：大部分都在用CPU跟内存，加密，逻辑操作业务处理等。
2.  IO密集型：数据库链接，网络通讯传输等。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/thread-pool-size-1.png)



一般的经验，不同类型线程池的参数配置：

1.  计算密集型一般推荐线程池不要过大，一般是CPU数 + 1，+1是因为可能存在**页缺失**(就是可能存在有些数据在硬盘中需要多来一个线程将数据读入内存)。如果线程池数太大，可能会频繁的 进行线程上下文切换跟任务调度。获得当前CPU核心数代码如下：

```
Runtime.getRuntime().availableProcessors();
```

2.  IO密集型：线程数适当大一点，机器的Cpu核心数*2。
3.  混合型：可以考虑根绝情况将它拆分成CPU密集型和IO密集型任务，如果执行时间相差不大，拆分可以提升吞吐量，反之没有必要。

当然，实际应用中没有固定的公式，需要结合测试和监控来进行调整。

> [!ATTENTION]
>  图文详解 60 道Java并发面试高频题，这次面试，一定吊打面试官，整理：沉默王二，戳[转载链接](https://mp.weixin.qq.com/s/bImCIoYsH_JEzTkBx2lj4A)，作者：三分恶，戳[原文链接](https://mp.weixin.qq.com/s/1jhBZrAb7bnvkgN1TgAUpw)。