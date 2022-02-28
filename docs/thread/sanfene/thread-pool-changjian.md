面试常问，主要有四种，都是通过工具类Excutors创建出来的，需要注意，阿里巴巴《Java开发手册》里禁止使用这种方式来创建线程池。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/thread-pool-changjian-1.png)



*   newFixedThreadPool  (固定数目线程的线程池)

*   newCachedThreadPool (可缓存线程的线程池)

*   newSingleThreadExecutor (单线程的线程池)

*   newScheduledThreadPool (定时及周期执行的线程池)


前三种线程池的构造直接调用ThreadPoolExecutor的构造方法。

### newSingleThreadExecutor

```
  public static ExecutorService newSingleThreadExecutor(ThreadFactory threadFactory) {
        return new FinalizableDelegatedExecutorService
            (new ThreadPoolExecutor(1, 1,
                                    0L, TimeUnit.MILLISECONDS,
                                    new LinkedBlockingQueue<Runnable>(),
                                    threadFactory));
    }
```

**线程池特点**

*   核心线程数为1
*   最大线程数也为1
*   阻塞队列是无界队列LinkedBlockingQueue，可能会导致OOM
*   keepAliveTime为0

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/thread-pool-changjian-2.png)


工作流程：

*   提交任务
*   线程池是否有一条线程在，如果没有，新建线程执行任务
*   如果有，将任务加到阻塞队列
*   当前的唯一线程，从队列取任务，执行完一个，再继续取，一个线程执行任务。

**适用场景**

适用于串行执行任务的场景，一个任务一个任务地执行。

### newFixedThreadPool

```
  public static ExecutorService newFixedThreadPool(int nThreads, ThreadFactory threadFactory) {
        return new ThreadPoolExecutor(nThreads, nThreads,
                                      0L, TimeUnit.MILLISECONDS,
                                      new LinkedBlockingQueue<Runnable>(),
                                      threadFactory);
    }
```

**线程池特点：**

*   核心线程数和最大线程数大小一样
*   没有所谓的非空闲时间，即keepAliveTime为0
*   阻塞队列为无界队列LinkedBlockingQueue，可能会导致OOM

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/thread-pool-changjian-3.png)


工作流程：

*   提交任务
*   如果线程数少于核心线程，创建核心线程执行任务
*   如果线程数等于核心线程，把任务添加到LinkedBlockingQueue阻塞队列
*   如果线程执行完任务，去阻塞队列取任务，继续执行。

**使用场景**

FixedThreadPool 适用于处理CPU密集型的任务，确保CPU在长期被工作线程使用的情况下，尽可能的少的分配线程，即适用执行长期的任务。

### newCachedThreadPool

```
   public static ExecutorService newCachedThreadPool(ThreadFactory threadFactory) {
        return new ThreadPoolExecutor(0, Integer.MAX_VALUE,
                                      60L, TimeUnit.SECONDS,
                                      new SynchronousQueue<Runnable>(),
                                      threadFactory);
    }
```

**线程池特点：**

*   核心线程数为0
*   最大线程数为Integer.MAX_VALUE，即无限大，可能会因为无限创建线程，导致OOM
*   阻塞队列是SynchronousQueue
*   非核心线程空闲存活时间为60秒

当提交任务的速度大于处理任务的速度时，每次提交一个任务，就必然会创建一个线程。极端情况下会创建过多的线程，耗尽 CPU 和内存资源。由于空闲 60 秒的线程会被终止，长时间保持空闲的 CachedThreadPool 不会占用任何资源。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/thread-pool-changjian-4.png)


工作流程：

*   提交任务
*   因为没有核心线程，所以任务直接加到SynchronousQueue队列。
*   判断是否有空闲线程，如果有，就去取出任务执行。
*   如果没有空闲线程，就新建一个线程执行。
*   执行完任务的线程，还可以存活60秒，如果在这期间，接到任务，可以继续活下去；否则，被销毁。

**适用场景**

用于并发执行大量短期的小任务。

### newScheduledThreadPool

```
    public ScheduledThreadPoolExecutor(int corePoolSize) {
        super(corePoolSize, Integer.MAX_VALUE, 0, NANOSECONDS,
              new DelayedWorkQueue());
    }
```

**线程池特点**

*   最大线程数为Integer.MAX_VALUE，也有OOM的风险
*   阻塞队列是DelayedWorkQueue
*   keepAliveTime为0
*   scheduleAtFixedRate() ：按某种速率周期执行
*   scheduleWithFixedDelay()：在某个延迟后执行

![图片](https://img-blog.csdnimg.cn/img_convert/7d78e52bb90c5dd94a23bd35b88cba48.png)



**工作机制**

*   线程从DelayQueue中获取已到期的ScheduledFutureTask（DelayQueue.take()）。到期任务是指ScheduledFutureTask的time大于等于当前时间。
*   线程执行这个ScheduledFutureTask。
*   线程修改ScheduledFutureTask的time变量为下次将要被执行的时间。
*   线程把这个修改time之后的ScheduledFutureTask放回DelayQueue中（DelayQueue.add()）。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/thread-pool-changjian-5.png)



**使用场景**

周期性执行任务的场景，需要限制线程数量的场景

> 使用无界队列的线程池会导致什么问题吗？

例如newFixedThreadPool使用了无界的阻塞队列LinkedBlockingQueue，如果线程获取一个任务后，任务的执行时间比较长，会导致队列的任务越积越多，导致机器内存使用不停飙升，最终导致OOM。
