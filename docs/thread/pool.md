---
title: 24张图带你彻底弄懂 Java 线程池
shortTitle: 线程池
description: Java线程池是Java多线程编程的一个重要部分，特别是在并发编程和后台任务处理方面。线程池帮助我们优化线程的使用，特别是在面对大量的并发请求时。
category:
  - Java核心
tag:
  - Java并发编程
head:
  - - meta
    - name: keywords
      content: Java,并发编程,多线程,Thread,线程池,ThreadPoolExecutor,Executors
---

# 14.25 线程池

好，终于到 Java 的线程池了，这是 Java 并发编程中非常重要的一块内容，今天我们就通过图文的方式来彻底弄懂线程池的工作原理，以及在实际项目中该如何自定义适合业务的线程池。

### 一、什么是线程池

线程池其实是一种池化的技术实现，池化技术的核心思想就是实现资源的复用，避免资源的重复创建和销毁带来的性能开销。线程池可以管理一堆线程，让线程执行完任务之后不进行销毁，而是继续去处理其它线程已经提交的任务。

使用线程池的好处

- 降低资源消耗。通过重复利用已创建的线程降低线程创建和销毁造成的消耗。
- 提高响应速度。当任务到达时，任务可以不需要等到线程创建就能立即执行。
- 提高线程的可管理性。线程是稀缺资源，如果无限制的创建，不仅会消耗系统资源，还会降低系统的稳定性，使用线程池可以进行统一的分配，调优和监控。

### 二、线程池的构造

Java 主要是通过构建 ThreadPoolExecutor 来创建线程池的。接下来我们看一下线程池是如何构造出来的

ThreadPoolExecutor 的构造方法：

![](https://cdn.tobebetterjavaer.com/paicoding/67c2476daef1b7af8d02ef2e62df0bbe.png)

- corePoolSize：线程池中用来工作的核心线程数量。
- maximumPoolSize：最大线程数，线程池允许创建的最大线程数。
- keepAliveTime：超出 corePoolSize 后创建的线程存活时间或者是所有线程最大存活时间，取决于配置。
- unit：keepAliveTime 的时间单位。
- workQueue：任务队列，是一个阻塞队列，当线程数达到核心线程数后，会将任务存储在阻塞队列中。
- threadFactory ：线程池内部创建线程所用的工厂。
- handler：拒绝策略；当队列已满并且线程数量达到最大线程数量时，会调用该方法处理任务。

线程池的构造其实很简单，就是传入一堆参数，然后进行简单的赋值操作。

### 三、线程池的运行原理

说完线程池的核心构造参数，接下来来讲解这些参数在线程池中是如何工作的。

线程池刚创建出来是什么样子呢，如下图：

![](https://cdn.tobebetterjavaer.com/paicoding/e9584b3016c511901bb0c8cf8031c34f.png)

没错，刚创建出来的线程池中只有一个构造时传入的阻塞队列，里面并没有线程，如果想要在执行之前创建好核心线程数，可以调用 prestartAllCoreThreads 方法来实现，默认是没有线程的。


![](https://cdn.tobebetterjavaer.com/paicoding/e0c4439a8b212116ed3de762f8a945ae.png)


当有线程通过 execute 方法提交了一个任务，会发生什么呢？

首先会去判断当前线程池的线程数是否小于核心线程数，也就是线程池构造时传入的参数 corePoolSize。

如果小于，那么就直接通过 ThreadFactory 创建一个线程来执行这个任务，如图

![](https://cdn.tobebetterjavaer.com/paicoding/42addd79845c52d724b53a09ab795e36.png)

当任务执行完之后，线程不会退出，而是会去阻塞队列中获取任务，如下图

![](https://cdn.tobebetterjavaer.com/paicoding/eb88bbf1a27c1ea4a007fb57f3e30c7d.png)

接下来如果又提交了一个任务，也会按照上述的步骤去判断是否小于核心线程数，如果小于，还是会创建线程来执行任务，执行完之后也会从阻塞队列中获取任务。

这里有个细节，就是提交任务的时候，就算有线程池里的线程从阻塞队列中获取不到任务，如果线程池里的线程数还是小于核心线程数，那么依然会继续创建线程，而不是复用已有的线程。

如果线程池里的线程数不再小于核心线程数呢？那么此时就会尝试将任务放入阻塞队列中，入队成功之后，如图

![](https://cdn.tobebetterjavaer.com/paicoding/431710628001a446dae2581518460d11.png)

这样，阻塞的线程就可以获取到任务了。

但是，随着任务越来越多，队列已经满了，任务放入失败，怎么办呢？

此时会判断当前线程池里的线程数是否小于最大线程数，也就是入参时的 maximumPoolSize 参数

如果小于最大线程数，那么也会创建非核心线程来执行提交的任务，如图

![](https://cdn.tobebetterjavaer.com/paicoding/69ada97f32215011463ee23b8fc6d5c7.png)

所以，就算队列中有任务，新创建的线程还是会优先处理这个提交的任务，而不是从队列中获取已有的任务执行，**从这可以看出，先提交的任务不一定先执行**。

假如线程数已经达到最大线程数量，怎么办呢？

此时就会执行拒绝策略，也就是构造线程池的时候，传入的 RejectedExecutionHandler 对象，来处理这个任务。

![](https://cdn.tobebetterjavaer.com/paicoding/c94f1b6f42ebd3a33ca5b7404eb02dc5.jpg)

JDK 自带的 RejectedExecutionHandler 实现有 4 种

- AbortPolicy：丢弃任务，抛出运行时异常
- CallerRunsPolicy：由提交任务的线程来执行任务
- DiscardPolicy：丢弃这个任务，但是不抛异常
- DiscardOldestPolicy：从队列中剔除最先进入队列的任务，然后再次提交任务

线程池创建的时候，如果不指定拒绝策略就默认是 AbortPolicy 策略。

当然，你也可以自己实现 RejectedExecutionHandler 接口，比如将任务存在数据库或者缓存中，这样就可以从数据库或者缓存中获取被拒绝掉的任务了。

到这里，我们发现，线程池构造的几个参数 corePoolSize、maximumPoolSize、workQueue、threadFactory、handler 我们都在上述的执行过程中讲到了，那么还差两个参数 keepAliveTime 和 unit（unit 是 keepAliveTime 的时间单位）没讲到，所以 keepAliveTime 是如何起作用的呢，这个问题留到后面分析。

说完整个执行的流程，接下来看看 execute 方法的代码是如何实现的。

![](https://cdn.tobebetterjavaer.com/paicoding/50b5a0f076f8edcd22fe77ac8fd5299c.png)

- workerCountOf(c)<corePoolSize:这行代码就是判断是否小于核心线程数，是的话就通过 addWorker 方法，addWorker 就是添加线程来执行任务。
- workQueue.offer(command)：这行代码就表示尝试往阻塞队列中添加任务
- 添加失败之后就会再次调用 addWorker 方法尝试添加非核心线程来执行任务
- 如果还是添加非核心线程失败了，那么就会调用 reject(command)来拒绝这个任务。

最后再来另画一张图总结 execute 执行流程

![](https://cdn.tobebetterjavaer.com/paicoding/02ede02b26c85d797a995abf520e08b5.png)

**四、线程池中线程实现复用的原理**

线程池的核心功能就是实现了线程的重复利用，那么线程池是如何实现线程的复用呢？

线程在线程池内部其实是被封装成一个 Worker 对象

![](https://cdn.tobebetterjavaer.com/paicoding/64eca0f0c92bb74b6f428f7a87ccf1cd.png)

Worker 继承了 AQS，也就是有一定锁的特性。

创建线程来执行任务的方法上面提到是通过 addWorker 方法创建的。在创建 Worker 对象的时候，会把线程和任务一起封装到 Worker 内部，然后调用 runWorker 方法来让线程执行任务，接下来我们就来看一下 runWorker 方法。

![](https://cdn.tobebetterjavaer.com/paicoding/8e4493b74a47dfe6e32db47f389b3891.jpg)

从这张图可以看出线程执行完任务不会退出的原因，runWorker 内部使用了 while 死循环，当第一个任务执行完之后，会不断地通过 getTask 方法获取任务，只要能获取到任务，就会调用 run 方法，继续执行任务，这就是线程能够复用的主要原因。

但是如果从 getTask 获取不到方法的时候，最后就会调用 finally 中的 processWorkerExit 方法，来将线程退出。

这里有个一个细节就是，因为 Worker 继承了 AQS，每次在执行任务之前都会调用 Worker 的 lock 方法，执行完任务之后，会调用 unlock 方法，这样做的目的就可以通过 Woker 的加锁状态就能判断出当前线程是否正在运行任务。如果想知道线程是否正在运行任务，只需要调用 Woker 的 tryLock 方法，根据是否加锁成功就能判断，加锁成功说明当前线程没有加锁，也就没有执行任务了，在调用 shutdown 方法关闭线程池的时候，就用这种方式来判断线程有没有在执行任务，如果没有的话，来尝试打断没有执行任务的线程。

**五、线程是如何获取任务的以及如何实现超时的**

上一节我们说到，线程在执行完任务之后，会继续从 getTask 方法中获取任务，获取不到就会退出。接下来我们就来看一看 getTask 方法的实现。

![](https://cdn.tobebetterjavaer.com/paicoding/70eb81a74480bfbee78c37dbc15e7d70.jpg)

getTask 方法，前面就是线程池的一些状态的判断，这里有一行代码

```
boolean timed = allowCoreThreadTimeOut || wc > corePoolSize;
```

这行代码是判断，当前过来获取任务的线程是否可以超时退出。如果 allowCoreThreadTimeOut 设置为 true 或者线程池当前的线程数大于核心线程数，也就是 corePoolSize，那么该获取任务的线程就可以超时退出。

那是怎么做到超时退出呢，就是这行核心代码

```
Runnable r = timed ?
```

```
workQueue.poll(keepAliveTime, TimeUnit.NANOSECONDS) :
```

```
workQueue.take();
```

会根据是否允许超时来选择调用阻塞队列 workQueue 的 poll 方法或者 take 方法。如果允许超时，则会调用 poll 方法，传入 keepAliveTime，也就是构造线程池时传入的空闲时间，这个方法的意思就是从队列中阻塞 keepAliveTime 时间来获取任务，获取不到就会返回 null；如果不允许超时，就会调用 take 方法，这个方法会一直阻塞获取任务，直到从队列中获取到任务位置。从这里可以看到 keepAliveTime 是如何使用的了。

所以到这里应该就知道线程池中的线程为什么可以做到空闲一定时间就退出了吧。其实最主要的是利用了阻塞队列的 poll 方法的实现，这个方法可以指定超时时间，一旦线程达到了 keepAliveTime 还没有获取到任务，那么就会返回 null，上一小节提到，getTask 方法返回 null，线程就会退出。

这里也有一个细节，就是判断当前获取任务的线程是否可以超时退出的时候，如果将 allowCoreThreadTimeOut 设置为 true，那么所有线程走到这个 timed 都是 true，那么所有的线程，包括核心线程都可以做到超时退出。如果你的线程池需要将核心线程超时退出，那么可以通过 allowCoreThreadTimeOut 方法将 allowCoreThreadTimeOut 变量设置为 true。

整个 getTask 方法以及线程超时退出的机制如图所示

![](https://cdn.tobebetterjavaer.com/paicoding/14e547adfd9dfea589e2e0141ff52718.png)

**六、线程池的 5 种状态**

线程池内部有 5 个常量来代表线程池的五种状态

![](https://cdn.tobebetterjavaer.com/paicoding/6464d7afc81784eafa8e290b5f479f26.png)

- RUNNING：线程池创建时就是这个状态，能够接收新任务，以及对已添加的任务进行处理。
- SHUTDOWN：调用 shutdown 方法线程池就会转换成 SHUTDOWN 状态，此时线程池不再接收新任务，但能继续处理已添加的任务到队列中任务。
- STOP：调用 shutdownNow 方法线程池就会转换成 STOP 状态，不接收新任务，也不能继续处理已添加的任务到队列中任务，并且会尝试中断正在处理的任务的线程。
- TIDYING：

SHUTDOWN 状态下，任务数为 0， 其他所有任务已终止，线程池会变为 TIDYING 状态。

线程池在 SHUTDOWN 状态，任务队列为空且执行中任务为空，线程池会变为 TIDYING 状态。

线程池在 STOP 状态，线程池中执行中任务为空时，线程池会变为 TIDYING 状态。

- TERMINATED：线程池彻底终止。线程池在 TIDYING 状态执行完 terminated() 方法就会转变为 TERMINATED 状态。

线程池状态具体是存在 ctl 成员变量中，ctl 中不仅存储了线程池的状态还存储了当前线程池中线程数的大小

```
private final AtomicInteger ctl = new AtomicInteger(ctlOf(RUNNING, 0));
```

最后画个图来总结一下这 5 种状态的流转

![](https://cdn.tobebetterjavaer.com/paicoding/131e1c88a515e066c2e08bd5c6e61ce4.png)

其实，在线程池运行过程中，绝大多数操作执行前都得判断当前线程池处于哪种状态，再来决定是否继续执行该操作。

**七、线程池的关闭**

线程池提供了 shutdown 和 shutdownNow 两个方法来关闭线程池。

shutdown 方法

![](https://cdn.tobebetterjavaer.com/paicoding/10b9eaf793a4a9a72f976ce76ebcb801.png)

就是将线程池的状态修改为 SHUTDOWN，然后尝试打断空闲的线程（如何判断空闲，上面在说 Worker 继承 AQS 的时候说过），也就是在阻塞等待任务的线程。

shutdownNow 方法

![](https://cdn.tobebetterjavaer.com/paicoding/374ff7da0f552ece18a9fa32d36d8e6e.png)

就是将线程池的状态修改为 STOP，然后尝试打断所有的线程，从阻塞队列中移除剩余的任务，这也是为什么 shutdownNow 不能执行剩余任务的原因。

所以也可以看出 shutdown 方法和 shutdownNow 方法的主要区别就是，shutdown 之后还能处理在队列中的任务，shutdownNow 直接就将任务从队列中移除，线程池里的线程就不再处理了。

**八、线程池的监控**

在项目中使用线程池的时候，一般需要对线程池进行监控，方便出问题的时候进行查看。线程池本身提供了一些方法来获取线程池的运行状态。

- getCompletedTaskCount：已经执行完成的任务数量
- getLargestPoolSize：线程池里曾经创建过的最大的线程数量。这个主要是用来判断线程是否满过。
- getActiveCount：获取正在执行任务的线程数据
- getPoolSize：获取当前线程池中线程数量的大小

除了线程池提供的上述已经实现的方法，同时线程池也预留了很对扩展方法。比如在 runWorker 方法里面，在执行任务之前会回调 beforeExecute 方法，执行任务之后会回调 afterExecute 方法，而这些方法默认都是空实现，你可以自己继承 ThreadPoolExecutor 来扩展重写这些方法，来实现自己想要的功能。

**九、Executors 构建线程池以及问题分析**

JDK 内部提供了 Executors 这个工具类，来快速的创建线程池。

1）固定线程数量的线程池：核心线程数与最大线程数相等

![](https://cdn.tobebetterjavaer.com/paicoding/760346a9a25ac1a11e0a4a333f9cdba1.png)

‍

2）单个线程数量的线程池

![](https://cdn.tobebetterjavaer.com/paicoding/07a60e56b98848af5c3fbe9eac71bc3c.png)

‍

3）接近无限大线程数量的线程池

![](https://cdn.tobebetterjavaer.com/paicoding/6f55b5aae4deb1f576270d55eae9bb7e.png)

‍

4）带定时调度功能的线程池

![](https://cdn.tobebetterjavaer.com/paicoding/574aace2b4288a50402b9b9d25b0d93c.png)

‍

虽然 JDK 提供了快速创建线程池的方法，但是其实不推荐使用 Executors 来创建线程池，因为从上面构造线程池可以看出，newFixedThreadPool 线程池，由于使用了 LinkedBlockingQueue，队列的容量默认是无限大，实际使用中出现任务过多时会导致内存溢出；newCachedThreadPool 线程池由于核心线程数无限大，当任务过多的时候，会导致创建大量的线程，可能机器负载过高，可能会导致服务宕机。

**十、线程池的使用场景**

在 java 程序中，其实经常需要用到多线程来处理一些业务，但是不建议单纯使用继承 Thread 或者实现 Runnable 接口的方式来创建线程，那样就会导致频繁创建及销毁线程，同时创建过多的线程也可能引发资源耗尽的风险。所以在这种情况下，使用线程池是一种更合理的选择，方便管理任务，实现了线程的重复利用。所以线程池一般适合那种需要异步或者多线程处理任务的场景。

**十一、实际项目中如何合理的自定义线程池**

通过上面分析提到，通过 Executors 这个工具类来创建的线程池其实都无法满足实际的使用场景，那么在实际的项目中，到底该如何构造线程池呢，该如何合理的设置参数？

1）线程数

线程数的设置主要取决于业务是 IO 密集型还是 CPU 密集型。

CPU 密集型指的是任务主要使用来进行大量的计算，没有什么导致线程阻塞。一般这种场景的线程数设置为 CPU 核心数+1。

IO 密集型：当执行任务需要大量的 io，比如磁盘 io，网络 io，可能会存在大量的阻塞，所以在 IO 密集型任务中使用多线程可以大大地加速任务的处理。一般线程数设置为 2\*CPU 核心数

java 中用来获取 CPU 核心数的方法是：Runtime.getRuntime().availableProcessors();

2）线程工厂

一般建议自定义线程工厂，构建线程的时候设置线程的名称，这样就在查日志的时候就方便知道是哪个线程执行的代码。

3）有界队列

一般需要设置有界队列的大小，比如 LinkedBlockingQueue 在构造的时候就可以传入参数，来限制队列中任务数据的大小，这样就不会因为无限往队列中扔任务导致系统的 oom。


----

GitHub 上标星 9000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 9000+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)