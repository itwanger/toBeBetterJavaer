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

# 14.15 重入锁 ReentrantLock

ReentrantLock 重入锁，是实现[Lock 接口](https://javabetter.cn/thread/suo.html)的一个类，也是在实际编程中使用频率很高的一个锁，**支持重入性，表示能够对共享资源重复加锁，即当前线程获取该锁后再次获取不会被阻塞**。

要想支持重入性，就要解决两个问题：

1. 在线程获取锁的时候，如果已经获取锁的线程是当前线程的话则直接再次获取成功；
2. 由于锁会被获取 n 次，那么只有锁在被释放同样的 n 次之后，该锁才算是完全释放成功。

我们知道，同步组件主要是通过重写 [AQS](https://javabetter.cn/thread/aqs.html) 的几个 protected 方法来表达自己的同步语义。

### ReentrantLock 的源码分析

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

在非公平锁获取时（nonfairTryAcquire 方法），只是简单的获取了一下当前状态然后做了一些逻辑处理，并没有考虑到当前同步队列中线程等待的情况。我们来看看公平锁的处理逻辑是怎样的，核心方法为：

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

### ReentrantLock 的使用

ReentrantLock 的使用方式与 synchronized 关键字类似，都是通过加锁和释放锁来实现同步的。我们来看看 ReentrantLock 的使用方式，以非公平锁为例：

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

需要注意的是，使用 ReentrantLock 时，必须在 finally 块中手动释放锁。

### Condition 接口

[Condition 接口](https://javabetter.cn/thread/condition.html)是与 Lock 绑定的，可以理解为一个 Lock 对象可以绑定多个 Condition 对象，Condition 接口提供了类似于 Object 的 wait、notify、notifyAll 等方法，与 Lock 一起使用可以实现等待/通知模式，比如实现一个阻塞队列：

```java
public class BlockingQueue<T> {
    private final Lock lock = new ReentrantLock();
    private final Condition notFull = lock.newCondition();
    private final Condition notEmpty = lock.newCondition();
    private final Object[] items = new Object[100];
    private int putptr, takeptr, count;

    public void put(T t) throws InterruptedException {
        lock.lock();
        try {
            while (count == items.length) {
                notFull.await();
            }
            items[putptr] = t;
            if (++putptr == items.length) {
                putptr = 0;
            }
            ++count;
            notEmpty.signal();
        } finally {
            lock.unlock();
        }
    }

    public T take() throws InterruptedException {
        lock.lock();
        try {
            while (count == 0) {
                notEmpty.await();
            }
            Object x = items[takeptr];
            if (++takeptr == items.length) {
                takeptr = 0;
            }
            --count;
            notFull.signal();
            return (T) x;
        } finally {
            lock.unlock();
        }
    }
}
```

代码很简单，就是一个阻塞队列的实现，put 方法用来向队列中添加元素，take 方法用来从队列中获取元素。我们来看看 put 方法的实现，首先获取锁，然后判断队列是否已满，如果已满则调用 `notFull.await()` 方法阻塞当前线程，直到队列不满，然后将元素添加到队列中，最后调用 `notEmpty.signal()` 方法唤醒一个等待的线程。take 方法的实现与 put 方法类似，不再赘述。

### 与 synchronized 关键字的比较

ReentrantLock 与 synchronized 关键字都是用来实现同步的，那么它们之间有什么区别呢？我们来看看它们的对比：

- **ReentrantLock 是一个类，而 synchronized 是 Java 中的关键字，synchronized 是内置的语言实现**；
- **ReentrantLock 可以实现选择性通知（锁可以绑定多个 Condition），而 synchronized 只能唤醒一个线程或者唤醒全部线程**；
- **ReentrantLock 是可重入锁，而 synchronized 不是**；
- ReentrantLock 必须手动释放锁。通常需要在 finally 块中调用 unlock 方法以确保锁被正确释放。synchronized: 自动释放锁。当同步块执行完毕时，JVM 会自动释放锁，不需要手动操作。
- ReentrantLock: 通常提供更好的性能，特别是在高竞争环境下。ynchronized: 在某些情况下，性能可能稍差一些，但在现代 JVM 实现中，性能差距通常不大。


>编辑：沉默王二，编辑前的内容主要来自于CL0610的 GitHub 仓库[https://github.com/CL0610/Java-concurrency](https://github.com/CL0610/Java-concurrency/blob/master/10.彻底理解ReentrantLock/彻底理解ReentrantLock.md)

---

GitHub 上标星 8700+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括 Java 基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM 等等，共计 32 万余字，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 8700+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
