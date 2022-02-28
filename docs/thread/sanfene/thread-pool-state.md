线程池有这几个状态：RUNNING,SHUTDOWN,STOP,TIDYING,TERMINATED。

```
   //线程池状态
   private static final int RUNNING    = -1 << COUNT_BITS;
   private static final int SHUTDOWN   =  0 << COUNT_BITS;
   private static final int STOP       =  1 << COUNT_BITS;
   private static final int TIDYING    =  2 << COUNT_BITS;
   private static final int TERMINATED =  3 << COUNT_BITS;
```

线程池各个状态切换图：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/thread-pool-state-1.png)



**RUNNING**

*   该状态的线程池会接收新任务，并处理阻塞队列中的任务;
*   调用线程池的shutdown()方法，可以切换到SHUTDOWN状态;
*   调用线程池的shutdownNow()方法，可以切换到STOP状态;

**SHUTDOWN**

*   该状态的线程池不会接收新任务，但会处理阻塞队列中的任务；
*   队列为空，并且线程池中执行的任务也为空,进入TIDYING状态;

**STOP**

*   该状态的线程不会接收新任务，也不会处理阻塞队列中的任务，而且会中断正在运行的任务；
*   线程池中执行的任务为空,进入TIDYING状态;

**TIDYING**

*   该状态表明所有的任务已经运行终止，记录的任务数量为0。
*   terminated()执行完毕，进入TERMINATED状态

**TERMINATED**

*   该状态表示线程池彻底终止
