---
title: 深入理解Java并发重入锁ReentrantLock
shortTitle: 重入锁ReentrantLock
description: 重入锁（ReentrantLock）是 Java 并发编程中的一个重要概念。它是一种同步机制，提供了与 synchronized 关键字相同的基本行为，但更灵活，功能也更丰富。
category:
  - Java核心
tag:
  - Java并发编程
head:
  - - meta
    - name: keywords
      content: Java,并发编程,多线程,Thread,锁,ReentrantLock
---

# 第十五节：重入锁 ReentrantLock

ReentrantLock 重入锁，是实现[Lock 接口](https://javabetter.cn/thread/suo.html)的一个类，也是在实际编程中使用频率很高的一个锁，**支持重入性，表示能够对共享资源重复加锁，即当前线程获取该锁后再次获取不会被阻塞**。

要想支持重入性，就要解决两个问题：

1. 在线程获取锁的时候，如果已经获取锁的线程是当前线程的话则直接再次获取成功；
2. 由于锁会被获取 n 次，那么只有锁在被释放同样的 n 次之后，该锁才算是完全释放成功。

我们知道，同步组件主要是通过重写 [AQS](https://javabetter.cn/thread/aqs.html) 的几个 protected 方法来表达自己的同步语义。

## ReentrantLock 的源码分析

针对第一个问题，我们来看看 ReentrantLock 是怎样实现的，以非公平锁为例，判断当前线程能否获得锁为例，核心方法为内部类 Sync 的 nonfairTryAcquire 方法：

```java
final boolean nonfairTryAcquire(int acquires) {
    final Thread current = Thread.currentThread();
    int c = getState();
    //1. 如果该锁未被任何线程占有，该锁能被当前线程获取
	if (c == 0) {
        if (compareAndSetState(0, acquires)) {
            setExclusiveOwnerThread(current);
            return true;
        }
    }
	//2.若被占有，检查占有线程是否是当前线程
    else if (current == getExclusiveOwnerThread()) {
		// 3. 再次获取，计数加一
        int nextc = c + acquires;
        if (nextc < 0) // overflow
            throw new Error("Maximum lock count exceeded");
        setState(nextc);
        return true;
    }
    return false;
}
```

这段代码的逻辑很简单，具体请看注释。为了支持重入性，在第二步增加了处理逻辑，如果该锁已经被线程占有了，会继续检查占有线程是否为当前线程，如果是的话，同步状态加 1 返回 true，表示可以再次获取成功。每次重新获取都会对同步状态进行加一的操作，那么释放的时候处理思路是怎样的呢？（依然还是以非公平锁为例）核心方法为 tryRelease：

```java
protected final boolean tryRelease(int releases) {
	//1. 同步状态减1
    int c = getState() - releases;
    if (Thread.currentThread() != getExclusiveOwnerThread())
        throw new IllegalMonitorStateException();
    boolean free = false;
    if (c == 0) {
		//2. 只有当同步状态为0时，锁成功被释放，返回true
        free = true;
        setExclusiveOwnerThread(null);
    }
	// 3. 锁未被完全释放，返回false
    setState(c);
    return free;
}
```

代码的逻辑请看注释，需要注意的是，重入锁的释放必须得等到同步状态为 0 时锁才算成功释放，否则锁仍未释放。如果锁被获取了 n 次，释放了 n-1 次，该锁未完全释放返回 false，只有被释放 n 次才算成功释放，返回 true。到现在我们可以理清 ReentrantLock 重入性的实现了，也就是理解了同步语义的第一条。

ReentrantLock 支持两种锁：**公平锁**和**非公平锁**。**何谓公平性，是针对获取锁而言的，如果一个锁是公平的，那么锁的获取顺序就应该符合请求上的绝对时间顺序，满足 FIFO**。ReentrantLock 的构造方法无参时是构造非公平锁，源码为：

```java
public ReentrantLock() {
    sync = new NonfairSync();
}
```

另外还提供了一种方式，可传入一个 boolean 值，true 时为公平锁，false 时为非公平锁，源码为：

```java
public ReentrantLock(boolean fair) {
    sync = fair ? new FairSync() : new NonfairSync();
}
```

在非公平锁获取时（nonfairTryAcquire 方法），只是简单的获取了一下当前状态然后做了一些逻辑处理，并没有考虑到当前同步队列中线程等待的情况。

我们来看看公平锁的处理逻辑是怎样的，核心方法为：

```java
protected final boolean tryAcquire(int acquires) {
    final Thread current = Thread.currentThread();
    int c = getState();
    if (c == 0) {
        if (!hasQueuedPredecessors() &&
            compareAndSetState(0, acquires)) {
            setExclusiveOwnerThread(current);
            return true;
        }
    }
    else if (current == getExclusiveOwnerThread()) {
        int nextc = c + acquires;
        if (nextc < 0)
            throw new Error("Maximum lock count exceeded");
        setState(nextc);
        return true;
    }
    return false;
}
```

这段代码的逻辑与 nonfairTryAcquire 基本上一致，唯一的不同在于增加了 hasQueuedPredecessors 的逻辑判断，从方法名就可以知道该方法用来判断当前节点在同步队列中是否有前驱节点的，如果有前驱节点，说明有线程比当前线程更早的请求资源，根据公平性，当前线程请求资源失败。如果当前节点没有前驱节点，才有做后面逻辑判断的必要性。

**公平锁每次都是从同步队列中的第一个节点获取到锁，而非公平性锁则不一定，有可能刚释放锁的线程能再次获取到锁**。

## ReentrantLock 的使用

ReentrantLock 的使用方式与 [synchronized](https://javabetter.cn/thread/synchronized-1.html) 关键字类似，都是通过加锁和释放锁来实现同步的。我们来看看 ReentrantLock 的使用方式，以非公平锁为例：

```java
public class ReentrantLockTest {
    private static final ReentrantLock lock = new ReentrantLock();
    private static int count = 0;

    public static void main(String[] args) throws InterruptedException {
        Thread thread1 = new Thread(() -> {
            for (int i = 0; i < 10000; i++) {
                lock.lock();
                try {
                    count++;
                } finally {
                    lock.unlock();
                }
            }
        });
        Thread thread2 = new Thread(() -> {
            for (int i = 0; i < 10000; i++) {
                lock.lock();
                try {
                    count++;
                } finally {
                    lock.unlock();
                }
            }
        });
        thread1.start();
        thread2.start();
        thread1.join();
        thread2.join();
        System.out.println(count);
    }
}
```

代码很简单，两个线程分别对 count 变量进行 10000 次累加操作，最后输出 count 的值。我们来看看运行结果：

```
20000
```

可以看到，两个线程对 count 变量进行了 20000 次累加操作，说明 ReentrantLock 是支持重入性的。我们再来看看公平锁的使用方式，只需要将 ReentrantLock 的构造方法改为公平锁即可：

```java
private static final ReentrantLock lock = new ReentrantLock(true);
```

运行结果为：

```
20000
```

可以看到，公平锁的运行结果与非公平锁的运行结果一致，这是因为公平锁的实现方式与非公平锁的实现方式基本一致，只是在获取锁时增加了判断当前节点是否有前驱节点的逻辑判断。

- 公平锁: 按照线程请求锁的顺序获取锁，即先到先得。
- 非公平锁: 线程获取锁的顺序可能与请求锁的顺序不同，可能导致某些线程获取锁的速度较快。

需要注意的是，使用 ReentrantLock 时，锁必须在 try 代码块开始之前获取，并且加锁之前不能有异常抛出，否则在 finally 块中就无法释放锁（ReentrantLock 的锁必须在 finally 中手动释放）。

错误❎示例：

```java
Lock lock = new XxxLock();
// ...
try {
    // 如果在此抛出异常，会直接执行 finally 块的代码
    doSomething();
    // 不管锁是否成功，finally 块都会执行
    lock.lock();
    doOthers();

} finally {
    lock.unlock();
} 
```

正确✅示例：

```java
Lock lock = new XxxLock();
// ...
lock.lock();
try {
    doSomething();
    doOthers();
} finally {
    lock.unlock();
}
```


## ReentrantLock 与 synchronized

ReentrantLock 与 synchronized 关键字都是用来实现同步的，那么它们之间有什么区别呢？我们来看看它们的对比：

- **ReentrantLock 是一个类，而 synchronized 是 Java 中的关键字**；
- **ReentrantLock 可以实现多路选择通知（可以绑定多个 [Condition](https://javabetter.cn/thread/condition.html)（后面会细讲，戳链接直达）），而 synchronized 只能通过 wait 和 notify/notifyAll 方法唤醒一个线程或者唤醒全部线程（单路通知）**；
- ReentrantLock 必须手动释放锁。通常需要在 finally 块中调用 unlock 方法以确保锁被正确释放。synchronized 会自动释放锁，当同步块执行完毕时，由 JVM 自动释放，不需要手动操作。
- ReentrantLock: 通常提供更好的性能，特别是在高竞争环境下。synchronized: 在某些情况下，性能可能稍差一些，但随着 JDK 版本的升级，性能差距已经不大了。

以下是一个简单的性能比较demo：

```java
import java.util.concurrent.locks.ReentrantLock;

public class PerformanceTest {
    private static final int NUM_THREADS = 10;
    private static final int NUM_INCREMENTS = 1_000_000;

    private int count1 = 0;
    private int count2 = 0;

    private final ReentrantLock lock = new ReentrantLock();
    private final Object syncLock = new Object();

    public void increment1() {
        lock.lock();
        try {
            count1++;
        } finally {
            lock.unlock();
        }
    }

    public void increment2() {
        synchronized (syncLock) {
            count2++;
        }
    }

    public static void main(String[] args) throws InterruptedException {
        PerformanceTest test = new PerformanceTest();
        
        // Test ReentrantLock
        long startTime = System.nanoTime();
        Thread[] threads = new Thread[NUM_THREADS];
        for (int i = 0; i < NUM_THREADS; i++) {
            threads[i] = new Thread(() -> {
                for (int j = 0; j < NUM_INCREMENTS; j++) {
                    test.increment1();
                }
            });
            threads[i].start();
        }
        for (Thread thread : threads) {
            thread.join();
        }
        long endTime = System.nanoTime();
        System.out.println("ReentrantLock time: " + (endTime - startTime) + " ns");

        // Test synchronized
        startTime = System.nanoTime();
        for (int i = 0; i < NUM_THREADS; i++) {
            threads[i] = new Thread(() -> {
                for (int j = 0; j < NUM_INCREMENTS; j++) {
                    test.increment2();
                }
            });
            threads[i].start();
        }
        for (Thread thread : threads) {
            thread.join();
        }
        endTime = System.nanoTime();
        System.out.println("synchronized time: " + (endTime - startTime) + " ns");
    }
}
```

来看输出结果：

```
ReentrantLock time: 269913857 ns
synchronized  time: 350595013 ns
```

这个测试在两种锁机制下尝试执行多次增量操作，然后测量所需的时间。

## 小结

本篇主要介绍了 ReentrantLock 的实现原理，以及与 synchronized 关键字的比较。

>编辑：沉默王二，编辑前的内容主要来自于CL0610的 GitHub 仓库[https://github.com/CL0610/Java-concurrency](https://github.com/CL0610/Java-concurrency/blob/master/10.彻底理解ReentrantLock/彻底理解ReentrantLock.md)

---

GitHub 上标星 9300+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第二份 PDF 《[并发编程小册](https://javabetter.cn/thread/)》终于来了！包括线程的基本概念和使用方法、Java的内存模型、sychronized、volatile、CAS、AQS、ReentrantLock、线程池、并发容器、ThreadLocal、生产者消费者模型等面试和开发必须掌握的内容，共计 15 万余字，200+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，二哥的并发编程进阶之路.pdf](https://javabetter.cn/thread/)

[加入二哥的编程星球](https://javabetter.cn/thread/)，在星球的第二个置顶帖「[知识图谱](https://javabetter.cn/thread/)」里就可以获取 PDF 版本。

![](https://cdn.tobebetterjavaer.com/stutymore/wangzhe-thread-20230904125125.png)
