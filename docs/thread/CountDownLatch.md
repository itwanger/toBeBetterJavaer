---
title: Java并发编程通信工具类 Semaphore、Exchanger、CountDownLatch、CyclicBarrier、Phaser等一网打尽
shortTitle: 通信工具类
description: Java 并发编程工具提供了一系列用于线程同步和通信的类 Semaphore、Exchanger、CountDownLatch、CyclicBarrier、Phaser。这些类使得在并发环境中协调和管理线程变得更加容易。
category:
  - Java核心
tag:
  - Java并发编程
head:
  - - meta
    - name: keywords
      content: Java,并发编程,多线程,Thread,CountDownLatch,Semaphore,Exchanger,CyclicBarrier,Phaser
---

# 第二十九节：通信工具类

JDK 中提供了一些并发编程中常用的通信工具类以供我们开发者使用，比如说 CountDownLatch,Semaphore,Exchanger,CyclicBarrier,Phaser。

它们都在 JUC 包下。先总体概括一下都有哪些工具类，它们有什么作用，然后再分别介绍它们的主要使用方法和原理。

| 类             | 作用                                         |
| -------------- | -------------------------------------------- |
| Semaphore      | 限制线程的数量                               |
| Exchanger      | 两个线程交换数据                             |
| CountDownLatch | 线程等待直到计数器减为 0 时开始工作          |
| CyclicBarrier  | 作用跟 CountDownLatch 类似，但是可以重复使用 |
| Phaser         | 增强的 CyclicBarrier                         |

## Semaphore

Semaphore 翻译过来是信号的意思。顾名思义，这个工具类提供的功能就是多个线程彼此“传信号”。而这个“信号”是一个`int`类型的数据，也可以看成是一种“资源”。

可以在构造方法中传入初始资源总数，以及是否使用“公平”的同步器。默认情况下，是非公平的。

```java
// 默认情况下使用非公平
public Semaphore(int permits) {
    sync = new NonfairSync(permits);
}

public Semaphore(int permits, boolean fair) {
    sync = fair ? new FairSync(permits) : new NonfairSync(permits);
}
```

最主要的方法是 acquire 方法和 release 方法。`acquire()`方法会申请一个 permit，而 release 方法会释放一个 permit。当然，你也可以申请多个 `acquire(int permits)`或者释放多个 `release(int permits)`。

每次 acquire，permits 就会减少一个或者多个。如果减少到了 0，再有其他线程来 acquire，那就要阻塞这个线程直到有其它线程 release permit 为止。

### Semaphore 使用案例

Semaphore 往往用于资源有限的场景中，去限制线程的数量。举个例子，我想限制同时只能有 3 个线程在工作：

```java
public class SemaphoreDemo {
    static class MyThread implements Runnable {

        private int value;
        private Semaphore semaphore;

        public MyThread(int value, Semaphore semaphore) {
            this.value = value;
            this.semaphore = semaphore;
        }

        @Override
        public void run() {
            try {
                semaphore.acquire(); // 获取permit
                System.out.println(String.format("当前线程是%d, 还剩%d个资源，还有%d个线程在等待",
                        value, semaphore.availablePermits(), semaphore.getQueueLength()));
                // 睡眠随机时间，打乱释放顺序
                Random random =new Random();
                Thread.sleep(random.nextInt(1000));
                System.out.println(String.format("线程%d释放了资源", value));
            } catch (InterruptedException e) {
                e.printStackTrace();
            } finally{
                semaphore.release(); // 释放permit
            }
        }
    }

    public static void main(String[] args) {
        Semaphore semaphore = new Semaphore(3);
        for (int i = 0; i < 10; i++) {
            new Thread(new MyThread(i, semaphore)).start();
        }
    }
}
```

输出：

> 当前线程是 1, 还剩 2 个资源，还有 0 个线程在等待  
> 当前线程是 0, 还剩 1 个资源，还有 0 个线程在等待  
> 当前线程是 6, 还剩 0 个资源，还有 0 个线程在等待  
> 线程 6 释放了资源  
> 当前线程是 2, 还剩 0 个资源，还有 6 个线程在等待  
> 线程 2 释放了资源  
> 当前线程是 4, 还剩 0 个资源，还有 5 个线程在等待  
> 线程 0 释放了资源  
> 当前线程是 7, 还剩 0 个资源，还有 4 个线程在等待  
> 线程 1 释放了资源  
> 当前线程是 8, 还剩 0 个资源，还有 3 个线程在等待  
> 线程 7 释放了资源  
> 当前线程是 5, 还剩 0 个资源，还有 2 个线程在等待  
> 线程 4 释放了资源  
> 当前线程是 3, 还剩 0 个资源，还有 1 个线程在等待  
> 线程 8 释放了资源  
> 当前线程是 9, 还剩 0 个资源，还有 0 个线程在等待  
> 线程 9 释放了资源  
> 线程 5 释放了资源  
> 线程 3 释放了资源

可以看到，在这次运行中，最开始是 1, 0, 6 这三个线程获得了资源，而其它线程进入了等待队列。然后当某个线程释放资源后，就会有等待队列中的线程获得资源。

当然，Semaphore 默认的 acquire 方法是会让线程进入等待队列，且抛出异常中断。但它还有一些方法可以忽略中断或不进入阻塞队列：

```java
// 忽略中断
public void acquireUninterruptibly()
public void acquireUninterruptibly(int permits)

// 不进入等待队列，底层使用CAS
public boolean tryAcquire
public boolean tryAcquire(int permits)
public boolean tryAcquire(int permits, long timeout, TimeUnit unit)
        throws InterruptedException
public boolean tryAcquire(long timeout, TimeUnit unit)
```

### Semaphore 原理

Semaphore 内部有一个继承了 [AQS](https://javabetter.cn/thread/aqs.html) 的同步器 Sync，重写了`tryAcquireShared`方法。在这个方法里，会去尝试获取资源。

如果获取失败（想要的资源数量小于目前已有的资源数量），就会返回一个负数（代表尝试获取资源失败）。然后当前线程就会进入 AQS 的等待队列。

## Exchanger

Exchanger 类用于两个线程交换数据。它支持泛型，也就是说你可以在两个线程之间传送任何数据。先来一个案例看看如何使用，比如两个线程之间想要传送字符串：

```java
public class ExchangerDemo {
    public static void main(String[] args) throws InterruptedException {
        Exchanger<String> exchanger = new Exchanger<>();

        new Thread(() -> {
            try {
                System.out.println("这是线程A，得到了另一个线程的数据："
                        + exchanger.exchange("这是来自线程A的数据"));
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }).start();

        System.out.println("这个时候线程A是阻塞的，在等待线程B的数据");
        Thread.sleep(1000);

        new Thread(() -> {
            try {
                System.out.println("这是线程B，得到了另一个线程的数据："
                        + exchanger.exchange("这是来自线程B的数据"));
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }).start();
    }
}
```

输出：

> 这个时候线程 A 是阻塞的，在等待线程 B 的数据  
> 这是线程 B，得到了另一个线程的数据：这是来自线程 A 的数据  
> 这是线程 A，得到了另一个线程的数据：这是来自线程 B 的数据

可以看到，当一个线程调用 exchange 方法后，会处于阻塞状态，只有当另一个线程也调用了 exchange 方法，它才会继续执行。

看源码可以发现它是使用 park/unpark 来实现等待状态切换的，但是在使用 park/unpark 方法之前，使用了 [CAS](https://javabetter.cn/thread/cas.html) 检查，估计是为了提高性能。

因为 Exchanger 支持泛型，所以我们可以传输任何的数据，比如 IO 流或者 IO 缓存。根据 JDK 里面注释的说法，可以总结为一下特性：

- 此类提供对外的操作是同步的；
- 用于成对出现的线程之间交换数据；
- 可以视作双向的同步队列；
- 可应用于基因算法、流水线设计等场景。

Exchanger 类还有一个有超时参数的方法，如果在指定时间内没有另一个线程调用 exchange，就会抛出一个超时异常。

```java
public V exchange(V x, long timeout, TimeUnit unit)
```

那么问题来了，Exchanger 只能是两个线程交换数据吗？那三个调用同一个实例的 exchange 方法会发生什么呢？答案是只有前两个线程会交换数据，第三个线程会进入阻塞状态。

需要注意的是，exchange 是可以重复使用的。也就是说。两个线程可以使用 Exchanger 在内存中不断地再交换数据。

## CountDownLatch

先来解读一下 CountDownLatch 这个类名的意义。CountDown 代表计数递减，Latch 是“门闩”的意思。也有人把它称为“屏障”。而 CountDownLatch 这个类的作用也很贴合这个名字的意义，假设某个线程在执行任务之前，需要等待其它线程完成一些前置任务，必须等所有的前置任务都完成，才能开始执行本线程的任务。

CountDownLatch 的方法也很简单，如下：

```java
// 构造方法：
public CountDownLatch(int count)

public void await() // 等待
public boolean await(long timeout, TimeUnit unit) // 超时等待
public void countDown() // count - 1
public long getCount() // 获取当前还有多少count
```

### CountDownLatch 案例

我们知道，玩游戏的时候，在游戏真正开始之前，一般会等待一些前置任务完成，比如“加载地图数据”，“加载人物模型”，“加载背景音乐”等等。只有当所有的东西都加载完成后，玩家才能真正进入游戏。下面我们就来模拟一下这个 demo。

```java
public class CountDownLatchDemo {
    // 定义前置任务线程
    static class PreTaskThread implements Runnable {

        private String task;
        private CountDownLatch countDownLatch;

        public PreTaskThread(String task, CountDownLatch countDownLatch) {
            this.task = task;
            this.countDownLatch = countDownLatch;
        }

        @Override
        public void run() {
            try {
                Random random = new Random();
                Thread.sleep(random.nextInt(1000));
                System.out.println(task + " - 任务完成");
                countDownLatch.countDown();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    public static void main(String[] args) {
        // 假设有三个模块需要加载
        CountDownLatch countDownLatch = new CountDownLatch(3);

        // 主任务
        new Thread(() -> {
            try {
                System.out.println("等待数据加载...");
                System.out.println(String.format("还有%d个前置任务", countDownLatch.getCount()));
                countDownLatch.await();
                System.out.println("数据加载完成，正式开始游戏！");
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }).start();

        // 前置任务
        new Thread(new PreTaskThread("加载地图数据", countDownLatch)).start();
        new Thread(new PreTaskThread("加载人物模型", countDownLatch)).start();
        new Thread(new PreTaskThread("加载背景音乐", countDownLatch)).start();
    }
}
```

输出：

> 等待数据加载...  
> 还有 3 个前置任务  
> 加载人物模型 - 任务完成  
> 加载背景音乐 - 任务完成  
> 加载地图数据 - 任务完成  
> 数据加载完成，正式开始游戏！

### CountDownLatch 原理

其实 CountDownLatch 类的原理挺简单的，内部同样是一个继承了 [AQS](https://javabetter.cn/thread/aqs.html) 的实现类 Sync，且实现起来还很简单，可能是 JDK 里面 AQS 的子类中最简单的实现了，有兴趣的小伙伴可以去看看这个内部类的源码。

需要注意的是构造器中的**计数值（count）实际上就是闭锁需要等待的线程数量**。这个值只能被设置一次，而且 CountDownLatch**没有提供任何机制去重新设置这个计数值**。

## CyclicBarrier

CyclicBarrirer 从名字上来理解是“循环屏障”的意思。前面提到了 CountDownLatch 一旦计数值`count`被降为 0 后，就不能再重新设置了，它只能起一次“屏障”的作用。而 CyclicBarrier 拥有 CountDownLatch 的所有功能，还可以使用`reset()`方法重置屏障。

如果参与者（线程）在等待的过程中，Barrier 被破坏，就会抛出 BrokenBarrierException。可以用`isBroken()`方法检测 Barrier 是否被破坏。

1. 如果有线程已经处于等待状态，调用 reset 方法会导致已经在等待的线程出现 BrokenBarrierException 异常。并且由于出现了 BrokenBarrierException，将会导致始终无法等待。
2. 如果在等待的过程中，线程被中断，会抛出 InterruptedException 异常，并且这个异常会传播到其他所有的线程。
3. 如果在执行屏障操作过程中发生异常，则该异常将传播到当前线程中，其他线程会抛出 BrokenBarrierException，屏障被损坏。
4. 如果超出指定的等待时间，当前线程会抛出 TimeoutException 异常，其他线程会抛出 BrokenBarrierException 异常。

### CyclicBarrier 案例

我们同样用玩游戏的例子。如果玩一个游戏有多个“关卡”，那使用 CountDownLatch 显然不太合适，因为需要为每个关卡都创建一个实例。那我们可以使用 CyclicBarrier 来实现每个关卡的数据加载等待功能。

```java
public class CyclicBarrierDemo {
    static class PreTaskThread implements Runnable {

        private String task;
        private CyclicBarrier cyclicBarrier;

        public PreTaskThread(String task, CyclicBarrier cyclicBarrier) {
            this.task = task;
            this.cyclicBarrier = cyclicBarrier;
        }

        @Override
        public void run() {
            // 假设总共三个关卡
            for (int i = 1; i < 4; i++) {
                try {
                    Random random = new Random();
                    Thread.sleep(random.nextInt(1000));
                    System.out.println(String.format("关卡%d的任务%s完成", i, task));
                    cyclicBarrier.await();
                } catch (InterruptedException | BrokenBarrierException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public static void main(String[] args) {
        CyclicBarrier cyclicBarrier = new CyclicBarrier(3, () -> {
            System.out.println("本关卡所有前置任务完成，开始游戏...");
        });

        new Thread(new PreTaskThread("加载地图数据", cyclicBarrier)).start();
        new Thread(new PreTaskThread("加载人物模型", cyclicBarrier)).start();
        new Thread(new PreTaskThread("加载背景音乐", cyclicBarrier)).start();
    }
}
```

输出：

> 关卡 1 的任务加载地图数据完成  
> 关卡 1 的任务加载背景音乐完成  
> 关卡 1 的任务加载人物模型完成  
> 本关卡所有前置任务完成，开始游戏...  
> 关卡 2 的任务加载地图数据完成  
> 关卡 2 的任务加载背景音乐完成  
> 关卡 2 的任务加载人物模型完成  
> 本关卡所有前置任务完成，开始游戏...  
> 关卡 3 的任务加载人物模型完成  
> 关卡 3 的任务加载地图数据完成  
> 关卡 3 的任务加载背景音乐完成  
> 本关卡所有前置任务完成，开始游戏...

注意这里跟 CountDownLatch 的代码有一些不同。CyclicBarrier 没有分为`await()`和`countDown()`，而是只有单独的一个`await()`方法。

一旦调用 await 方法的线程数量等于构造方法中传入的任务总量（这里是 3），就代表达到屏障了。CyclicBarrier 允许我们在达到屏障的时候可以执行一个任务，可以在构造方法传入一个 Runnable 类型的对象。

上述案例就是在达到屏障时，输出“本关卡所有前置任务完成，开始游戏...”。

```java
// 构造方法
public CyclicBarrier(int parties) {
    this(parties, null);
}
public CyclicBarrier(int parties, Runnable barrierAction) {
    // 具体实现
}
```

### CyclicBarrier 原理

CyclicBarrier 虽说功能与 CountDownLatch 类似，但是实现原理却完全不同，CyclicBarrier 内部使用的是 [Lock](https://javabetter.cn/thread/lock.html) + [Condition](https://javabetter.cn/thread/condition.html) 实现的等待/通知模式。详情可以查看这个方法的源码：

```java
private int dowait(boolean timed, long nanos)
```

## Phaser

Phaser 是 Java 7 中引入的一个并发同步工具，它提供了对动态数量的线程的同步能力，这与 CyclicBarrier 和 CountDownLatch 不同，因为它们都需要预先知道等待的线程数量。Phaser 是多阶段的，意味着它可以同步不同阶段的多个操作。

前面我们介绍了 CyclicBarrier，可以发现它在构造方法里传入了“任务总量”`parties`之后，就不能修改这个值了，并且每次调用`await()`方法也只能消耗一个`parties`计数。但 Phaser 可以动态地调整任务总量！

Phaser 是阶段性的，所以它有一个内部的阶段计数器。每当我们到达一个阶段的结尾时，Phaser 会自动前进到下一个阶段。

名词解释：

- Party：Phaser 的上下文中，一个 party 可以是一个线程，也可以是一个任务。当我们在 Phaser 上注册一个 party 时，Phaser 会递增它的参与者数量。

- arrive：对应一个 party 的状态，初始时是 unarrived，当调用`arriveAndAwaitAdvance()`或者 `arriveAndDeregister()`进入 arrive 状态，可以通过`getUnarrivedParties()`获取当前未到达的数量。

- register：注册一个新的 party 到 Phaser。

- deRegister：减少一个 party。

- phase：阶段，当所有注册的 party 都 arrive 之后，将会调用 Phaser 的`onAdvance()`方法来判断是否要进入下一阶段。

Phaser 的终止有两种途径，Phaser 维护的线程执行完毕或者`onAdvance()`返回`true`。

### Phaser 案例

还是游戏的案例。假设我们游戏有三个关卡，但只有第一个关卡有新手教程，需要加载新手教程模块。但后面的第二个关卡和第三个关卡都不需要。我们可以用 Phaser 来做这个需求。

代码：

```java
public class PhaserDemo {
    static class PreTaskThread implements Runnable {

        private String task;
        private Phaser phaser;

        public PreTaskThread(String task, Phaser phaser) {
            this.task = task;
            this.phaser = phaser;
        }

        @Override
        public void run() {
            for (int i = 1; i < 4; i++) {
                try {
                    // 第二次关卡起不加载NPC，跳过
                    if (i >= 2 && "加载新手教程".equals(task)) {
                        continue;
                    }
                    Random random = new Random();
                    Thread.sleep(random.nextInt(1000));
                    System.out.println(String.format("关卡%d，需要加载%d个模块，当前模块【%s】",
                            i, phaser.getRegisteredParties(), task));

                    // 从第二个关卡起，不加载NPC
                    if (i == 1 && "加载新手教程".equals(task)) {
                        System.out.println("下次关卡移除加载【新手教程】模块");
                        phaser.arriveAndDeregister(); // 移除一个模块
                    } else {
                        phaser.arriveAndAwaitAdvance();
                    }
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public static void main(String[] args) {
        Phaser phaser = new Phaser(4) {
            @Override
            protected boolean onAdvance(int phase, int registeredParties) {
                System.out.println(String.format("第%d次关卡准备完成", phase + 1));
                return phase == 3 || registeredParties == 0;
            }
        };

        new Thread(new PreTaskThread("加载地图数据", phaser)).start();
        new Thread(new PreTaskThread("加载人物模型", phaser)).start();
        new Thread(new PreTaskThread("加载背景音乐", phaser)).start();
        new Thread(new PreTaskThread("加载新手教程", phaser)).start();
    }
}
```

输出：

> 关卡 1，需要加载 4 个模块，当前模块【加载背景音乐】  
> 关卡 1，需要加载 4 个模块，当前模块【加载新手教程】  
> 下次关卡移除加载【新手教程】模块  
> 关卡 1，需要加载 3 个模块，当前模块【加载地图数据】  
> 关卡 1，需要加载 3 个模块，当前模块【加载人物模型】  
> 第 1 次关卡准备完成  
> 关卡 2，需要加载 3 个模块，当前模块【加载地图数据】  
> 关卡 2，需要加载 3 个模块，当前模块【加载背景音乐】  
> 关卡 2，需要加载 3 个模块，当前模块【加载人物模型】  
> 第 2 次关卡准备完成  
> 关卡 3，需要加载 3 个模块，当前模块【加载人物模型】  
> 关卡 3，需要加载 3 个模块，当前模块【加载地图数据】  
> 关卡 3，需要加载 3 个模块，当前模块【加载背景音乐】  
> 第 3 次关卡准备完成

这里要注意关卡 1 的输出，在“加载新手教程”线程中调用了`arriveAndDeregister()`减少一个 party 之后，后面的线程使用`getRegisteredParties()`得到的是已经被修改后的 parties 了。但是当前这个阶段(phase)，仍然是需要 4 个 parties 都 arrive 才触发屏障的。从下一个阶段开始，才需要 3 个 parties 都 arrive 就触发屏障。

Phaser 类用来控制某个阶段的线程数量很有用，但它并不在意这个阶段具体有哪些线程 arrive，只要达到它当前阶段的 parties 值，就触发屏障。所以我这里的案例虽然制定了特定的线程（加载新手教程）来更直观地表述 Phaser 的功能，但其实 Phaser 是没有分辨具体是哪个线程的功能的，它在意的只是数量，这一点需要大家注意。

### Phaser 原理

Phaser 类的原理相比起来要复杂得多。它内部使用了两个基于 [Fork-Join 框架](https://javabetter.cn/thread/fork-join.html)的原子类辅助：

```java
private final AtomicReference<QNode> evenQ;
private final AtomicReference<QNode> oddQ;

static final class QNode implements ForkJoinPool.ManagedBlocker {
	// 实现代码
}
```

有兴趣的小伙伴可以去看看 JDK 源代码，这里不做过多叙述。

## 小结

总的来说，CountDownLatch，CyclicBarrier，Phaser 是一个比一个强大，但也一个比一个复杂，需要根据自己的业务需求合理选择。

>编辑：沉默王二，部分内容来源于朋友小七萤火虫开源的这个仓库：[深入浅出 Java 多线程](http://concurrent.redspider.group/)

---

GitHub 上标星 9300+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第二份 PDF 《[并发编程小册](https://javabetter.cn/thread/)》终于来了！包括线程的基本概念和使用方法、Java的内存模型、sychronized、volatile、CAS、AQS、ReentrantLock、线程池、并发容器、ThreadLocal、生产者消费者模型等面试和开发必须掌握的内容，共计 15 万余字，200+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，二哥的并发编程进阶之路.pdf](https://javabetter.cn/thread/)

[加入二哥的编程星球](https://javabetter.cn/thread/)，在星球的第二个置顶帖「[知识图谱](https://javabetter.cn/thread/)」里就可以获取 PDF 版本。

![](https://cdn.tobebetterjavaer.com/stutymore/wangzhe-thread-20230904125125.png)
