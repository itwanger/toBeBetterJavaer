
![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/thread-pool-args-1.png)



线程池有七大参数，需要重点关注`corePoolSize`、`maximumPoolSize`、`workQueue`、`handler`这四个。

1.  corePoolSize

此值是用来初始化线程池中核心线程数，当线程池中线程池数< `corePoolSize`时，系统默认是添加一个任务才创建一个线程池。当线程数 = corePoolSize时，新任务会追加到workQueue中。

2.  maximumPoolSize

`maximumPoolSize`表示允许的最大线程数 = (非核心线程数+核心线程数)，当`BlockingQueue`也满了，但线程池中总线程数 < `maximumPoolSize`时候就会再次创建新的线程。

3.  keepAliveTime

非核心线程 =(maximumPoolSize - corePoolSize ) ,非核心线程闲置下来不干活最多存活时间。

4.  unit

线程池中非核心线程保持存活的时间的单位

*   TimeUnit.DAYS; 天
*   TimeUnit.HOURS; 小时
*   TimeUnit.MINUTES; 分钟
*   TimeUnit.SECONDS; 秒
*   TimeUnit.MILLISECONDS;  毫秒
*   TimeUnit.MICROSECONDS;  微秒
*   TimeUnit.NANOSECONDS;  纳秒

5.  workQueue

线程池等待队列，维护着等待执行的`Runnable`对象。当运行当线程数= corePoolSize时，新的任务会被添加到`workQueue`中，如果`workQueue`也满了则尝试用非核心线程执行任务，等待队列应该尽量用有界的。

6.  threadFactory

创建一个新线程时使用的工厂，可以用来设定线程名、是否为daemon线程等等。

7.  handler

`corePoolSize`、`workQueue`、`maximumPoolSize`都不可用的时候执行的饱和策略。

## 48.线程池的拒绝策略有哪些？


