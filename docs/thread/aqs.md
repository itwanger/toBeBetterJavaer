---
title: 到底什么是AQS（抽象队列同步器）？
shortTitle: 抽象队列同步器AQS
description: AQS，即AbstractQueuedSynchronizer，是Java并发包java.util.concurrent的核心框架，全称为抽象队列同步器。这是一个用于构建锁和同步器的框架，很多同步类，例如ReentrantLock，Semaphore，CountDownLatch，FutureTask等都使用了AQS。
category:
  - Java核心
tag:
  - Java并发编程
head:
  - - meta
    - name: keywords
      content: Java,并发编程,多线程,Thread,AQS,抽象队列同步器
---

# 第十三节：抽象队列同步器 AQS

**AQS**是`AbstractQueuedSynchronizer`的简称，即`抽象队列同步器`，从字面上可以这样理解:

- 抽象：抽象类，只实现一些主要逻辑，有些方法由子类实现；
- 队列：使用先进先出（FIFO）的队列存储数据；
- 同步：实现了同步的功能。

那 AQS 有什么用呢？

AQS 是一个用来构建锁和同步器的框架，使用 AQS 能简单且高效地构造出应用广泛的同步器，比如我们后面会细讲的 [ReentrantLock](https://javabetter.cn/thread/reentrantLock.html)，Semaphore，[ReentrantReadWriteLock](https://javabetter.cn/thread/ReentrantReadWriteLock.html)，SynchronousQueue，[FutureTask](https://javabetter.cn/thread/callable-future-futuretask.html) 等等，都是基于 AQS 的。

当然了，我们也可以利用 AQS 轻松定制专属的同步器，只要实现它的几个`protected`方法就可以了。

## AQS 的数据结构

AQS 内部使用了一个 [volatile](https://javabetter.cn/thread/volatile.html) 的变量 state 来作为资源的标识。

```java
/**
 * The synchronization state.
 */
private volatile int state;
```

同时定义了几个获取和改变 state 的 protected 方法，子类可以覆盖这些方法来实现自己的逻辑：

```java
getState()
setState()
compareAndSetState()
```

这三种操作均是原子操作，其中 compareAndSetState 的实现依赖于 [Unsafe](https://javabetter.cn/thread/Unsafe.html) 的 `compareAndSwapInt()` 方法。

AQS 内部使用了一个先进先出（FIFO）的[双端队列](https://javabetter.cn/collection/arraydeque.html)，并使用了两个引用 head 和 tail 用于标识队列的头部和尾部。其数据结构如下图所示：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/aqs-c294b5e3-69ef-49bb-ac56-f825894746ab.png)

但它并不直接储存线程，而是储存拥有线程的 Node 节点。

![](https://cdn.tobebetterjavaer.com/stutymore/aqs-20230805211157.png)

## AQS 的 Node 节点

资源有两种共享模式，或者说两种同步方式：

- 独占模式（Exclusive）：资源是独占的，一次只能有一个线程获取。如 [ReentrantLock](https://javabetter.cn/thread/reentrantLock.html)（后面会细讲，戳链接直达）。
- 共享模式（Share）：同时可以被多个线程获取，具体的资源个数可以通过参数指定。如 [Semaphore/CountDownLatch](https://javabetter.cn/thread/CountDownLatch.html)（戳链接直达，后面会细讲）。

一般情况下，子类只需要根据需求实现其中一种模式就可以，当然也有同时实现两种模式的同步类，如 [ReadWriteLock](https://javabetter.cn/thread/ReentrantReadWriteLock.html)。

AQS 中关于这两种资源共享模式的定义源码均在内部类 Node 中。我们来看看 Node 的结构：

```java
static final class Node {
    // 标记一个结点（对应的线程）在共享模式下等待
    static final Node SHARED = new Node();
    // 标记一个结点（对应的线程）在独占模式下等待
    static final Node EXCLUSIVE = null;

    // waitStatus的值，表示该结点（对应的线程）已被取消
    static final int CANCELLED = 1;
    // waitStatus的值，表示后继结点（对应的线程）需要被唤醒
    static final int SIGNAL = -1;
    // waitStatus的值，表示该结点（对应的线程）在等待某一条件
    static final int CONDITION = -2;
    /*waitStatus的值，表示有资源可用，新head结点需要继续唤醒后继结点（共享模式下，多线程并发释放资源，而head唤醒其后继结点后，需要把多出来的资源留给后面的结点；设置新的head结点时，会继续唤醒其后继结点）*/
    static final int PROPAGATE = -3;

    // 等待状态，取值范围，-3，-2，-1，0，1
    volatile int waitStatus;
    volatile Node prev; // 前驱结点
    volatile Node next; // 后继结点
    volatile Thread thread; // 结点对应的线程
    Node nextWaiter; // 等待队列里下一个等待条件的结点


    // 判断共享模式的方法
    final boolean isShared() {
        return nextWaiter == SHARED;
    }

    Node(Thread thread, Node mode) {     // Used by addWaiter
        this.nextWaiter = mode;
        this.thread = thread;
    }

    // 其它方法忽略，可以参考具体的源码
}

// AQS里面的addWaiter私有方法
private Node addWaiter(Node mode) {
    // 使用了Node的这个构造函数
    Node node = new Node(Thread.currentThread(), mode);
    // 其它代码省略
}
```

这里面的 waitStatus 是用来标记当前节点的状态的，它有以下几种状态：

- CANCELLED：表示当前节点（对应的线程）已被取消。当等待超时或被中断，会触发进入为此状态，进入该状态后节点状态不再变化；
- SIGNAL：后面节点等待当前节点唤醒；
- CONDITION：[Condition](https://javabetter.cn/thread/condition.html)（后面会细讲，戳链接直达）中使用，当前线程阻塞在Condition，如果其他线程调用了Condition的signal方法，这个节点将从等待队列转移到同步队列队尾，等待获取同步锁；
- PROPAGATE：共享模式，前置节点唤醒后面节点后，唤醒操作无条件传播下去；
- 0：中间状态，当前节点后面的节点已经唤醒，但是当前节点线程还没有执行完成。



通过 Node 我们可以实现两种队列：

1）一是通过 prev 和 next 实现 CLH（Craig, Landin, and Hagersten）队列（线程同步队列、双向队列）。

在 CLH 锁中，每个等待的线程都会有一个关联的 Node，每个 Node 有一个 prev 和 next 指针。当一个线程尝试获取锁并失败时，它会将自己添加到队列的尾部并自旋，等待前一个节点的线程释放锁。类似下面这样。

```java
public class CLHLock {
    private volatile Node tail;
    private ThreadLocal<Node> myNode = ThreadLocal.withInitial(Node::new);
    private ThreadLocal<Node> myPred = new ThreadLocal<>();

    public void lock() {
        Node node = myNode.get();
        node.locked = true;
        // 把自己放到队尾，并取出前面的节点
        Node pred = tail;
        myPred.set(pred);
        while (pred.locked) {
            // 自旋等待
        }
    }

    public void unlock() {
        Node node = myNode.get();
        node.locked = false;
        myNode.set(myPred.get());
    }

    private static class Node {
        private volatile boolean locked;
    }
}
```

2）二是通过 nextWaiter 实现 [Condition](https://javabetter.cn/thread/condition.html)（后面会细讲，戳链接直达）上的等待线程队列（单向队列），这个 Condition 主要用在 [ReentrantLock](https://javabetter.cn/thread/reentrantLock.html) 类中。

## AQS 的源码解析

AQS 的设计是基于**模板方法模式**的，它有一些方法必须要子类去实现的，它们主要有：

- `isHeldExclusively()`：该线程是否正在独占资源。只有用到 condition 才需要去实现它。
- `tryAcquire(int)`：独占方式。尝试获取资源，成功则返回 true，失败则返回 false。
- `tryRelease(int)`：独占方式。尝试释放资源，成功则返回 true，失败则返回 false。
- `tryAcquireShared(int)`：共享方式。尝试获取资源。负数表示失败；0 表示成功，但没有剩余可用资源；正数表示成功，且有剩余资源。
- `tryReleaseShared(int)`：共享方式。尝试释放资源，如果释放后允许唤醒后续等待结点返回 true，否则返回 false。

这些方法虽然都是`protected`的，但是它们并没有在 AQS 具体实现，而是直接抛出异常：

```java
protected boolean tryAcquire(int arg) {
    throw new UnsupportedOperationException();
}
```

这里不使用抽象方法的目的是：避免强迫子类中把所有的抽象方法都实现一遍，减少无用功，这样子类只需要实现自己关心的抽象方法即可，比如 [信号 Semaphore](https://javabetter.cn/thread/CountDownLatch.html) 只需要实现 tryAcquire 方法而不用实现其余不需要用到的模版方法：

![](https://cdn.tobebetterjavaer.com/stutymore/aqs-20230805211732.png)

而 AQS 实现了一系列主要的逻辑。下面我们从源码来分析一下获取和释放资源的主要逻辑：

### 获取资源

获取资源的入口是 `acquire(int arg)`方法。arg 是要获取的资源个数，在独占模式下始终为 1。我们先来看看这个方法的逻辑：

```java
public final void accquire(int arg) {
    // tryAcquire 再次尝试获取锁资源，如果尝试成功，返回true，尝试失败返回false
    if (!tryAcquire(arg) &&
        // 走到这，代表获取锁资源失败，需要将当前线程封装成一个Node，追加到AQS的队列中
        acquireQueued(addWaiter(Node.EXCLUSIVE), arg))
        // 线程中断
        selfInterrupt();
}
```

首先调用 tryAcquire 尝试去获取资源。前面提到了这个方法是在子类中具体实现的，可以直接进入 [ReentrantLock](https://javabetter.cn/thread/reentrantLock.html) 中 查看。

如果获取资源失败，就通过 `addWaiter(Node.EXCLUSIVE)` 方法把这个线程插入到等待队列中。其中传入的参数代表要插入的 Node 是独占式的。这个方法的具体实现：

```java
private Node addWaiter(Node mode) {
 //创建 Node 类，并且设置 thread 为当前线程，设置为排它锁
 Node node = new Node(Thread.currentThread(), mode);
 // 获取 AQS 中队列的尾部节点
 Node pred = tail;
 // 如果 tail == null，说明是空队列，
 // 不为 null，说明现在队列中有数据，
 if (pred != null) {
  // 将当前节点的 prev 指向刚才的尾部节点，那么当前节点应该设置为尾部节点
  node.prev = pred;
  // CAS 将 tail 节点设置为当前节点
  if (compareAndSetTail(pred, node)) {
   // 将之前尾节点的 next 设置为当前节点
   pred.next = node;
   // 返回当前节点
   return node;
  }
 }
 enq(node);
 return node;
}

// 自旋CAS插入等待队列
private Node enq(final Node node) {
    for (;;) {
        Node t = tail;
        if (t == null) { // Must initialize
            if (compareAndSetHead(new Node()))
                tail = head;
        } else {
            node.prev = t;
            if (compareAndSetTail(t, node)) {
                t.next = node;
                return t;
            }
        }
    }
}
```

上面的两个方法比较好理解，就是在队列的尾部插入新的 Node 节点，但是需要注意的是由于 AQS 中会存在多个线程同时争夺资源的情况，因此肯定会出现多个线程同时插入节点的操作，在这里是通过 CAS 自旋的方式保证了操作的线程安全性。

OK，现在回到最开始的 aquire 方法。现在通过 addWaiter 方法，已经把一个 Node 放到等待队列尾部了。而处于等待队列的结点是从头结点一个一个去获取资源的。具体的实现我们来看看 acquireQueued 方法：

```java
final boolean acquireQueued(final Node node, int arg) {
    boolean failed = true;
    try {
        // interrupted用于记录线程是否被中断过
        boolean interrupted = false;
        for (;;) { // 自旋操作
            // 获取当前节点的前驱节点
            final Node p = node.predecessor();
            // 如果前驱节点是head节点，并且尝试获取同步状态成功
            if (p == head && tryAcquire(arg)) {
                // 设置当前节点为head节点
                setHead(node);
                // 前驱节点的next引用设为null，帮助垃圾回收器回收该节点
                p.next = null; 
                // 获取同步状态成功，将failed设为false
                failed = false;
                // 返回线程是否被中断过
                return interrupted;
            }
            // 如果应该让当前线程阻塞并且线程在阻塞时被中断，则将interrupted设为true
            if (shouldParkAfterFailedAcquire(p, node) && parkAndCheckInterrupt())
                interrupted = true;
        }
    } finally {
        // 如果获取同步状态失败，取消尝试获取同步状态
        if (failed)
            cancelAcquire(node);
    }
}
```

这里 parkAndCheckInterrupt 方法内部使用到了 `LockSupport.park(this)`，顺便简单介绍一下 park 方法。

LockSupport 类是 Java 6 引入的一个类，提供了基本的线程同步原语。LockSupport 实际上是调用了 Unsafe 类里的方法，归结到 Unsafe 里，只有两个：

- `park(boolean isAbsolute, long time)`：阻塞当前线程
- `unpark(Thread jthread)`：使给定的线程停止阻塞

所以**结点进入等待队列后，是调用 park 使它进入阻塞状态的。只有头结点的线程是处于活跃状态的**。

当然，获取资源的方法除了 acquire 外，还有以下三个：

- acquireInterruptibly：申请可中断的资源（独占模式）
- acquireShared：申请共享模式的资源
- acquireSharedInterruptibly：申请可中断的资源（共享模式）

可中断的意思是，在线程中断时可能会抛出`InterruptedException`

总结起来的一个流程图：

![acquire流程](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/aqs-a0689bb2-9b18-419d-9617-6d292fbd439d.jpg)

### 释放资源

释放资源相比于获取资源来说，会简单许多。在 AQS 中只有一小段实现。源码：

```java
public final boolean release(int arg) {
    if (tryRelease(arg)) {
        Node h = head;
        if (h != null && h.waitStatus != 0)
            unparkSuccessor(h);
        return true;
    }
    return false;
}

private void unparkSuccessor(Node node) {
    // 如果状态是负数，尝试把它设置为0
    int ws = node.waitStatus;
    if (ws < 0)
        compareAndSetWaitStatus(node, ws, 0);
    // 得到头结点的后继结点head.next
    Node s = node.next;
    // 如果这个后继结点为空或者状态大于0
    // 通过前面的定义我们知道，大于0只有一种可能，就是这个结点已被取消（只有 Node.CANCELLED(=1) 这一种状态大于0）
    if (s == null || s.waitStatus > 0) {
        s = null;
        // 从尾部开始倒着寻找第一个还未取消的节点（真正的后继者）
        for (Node t = tail; t != null && t != node; t = t.prev)
            if (t.waitStatus <= 0)
                s = t;
    }
    // 如果后继结点不为空，
    if (s != null)
        LockSupport.unpark(s.thread);
}
```

在`java.util.concurrent.locks.ReentrantLock`的实现中，`tryRelease(arg)`会减少持有锁的数量，如果持有锁的数量变为0，释放锁并返回true。

如果`tryRelease(arg)`成功释放了锁，那么接下来会检查队列的头结点。如果头结点存在并且waitStatus不为0（这意味着有线程在等待），那么会调用`unparkSuccessor(Node h)`方法来唤醒等待的线程。

## 小结

AQS 是一个用来构建锁和同步器的框架，使用 AQS 能简单且高效地构造出应用广泛的同步器，比如我们提到的 [ReentrantLock](https://javabetter.cn/thread/reentrantLock.html)，[Semaphore](https://javabetter.cn/thread/CountDownLatch.html)，[ReentrantReadWriteLock](https://javabetter.cn/thread/ReentrantReadWriteLock.html)，SynchronousQueue，[FutureTask](https://javabetter.cn/thread/callable-future-futuretask.html) 等等皆是基于 AQS 的。

当然了，我们也可以利用 AQS 轻松定制专属的同步器，只要实现它的几个`protected`方法就可以了。

来个互斥锁（同一时刻只允许一个线程持有锁）。

```java
import java.util.concurrent.locks.AbstractQueuedSynchronizer;

public class Mutex {

    private static class Sync extends AbstractQueuedSynchronizer {
        @Override
        protected boolean tryAcquire(int arg) {
            if (compareAndSetState(0, 1)) {
                setExclusiveOwnerThread(Thread.currentThread());
                return true;
            }
            return false;
        }

        @Override
        protected boolean tryRelease(int arg) {
            if (getState() == 0) {
                throw new IllegalMonitorStateException();
            }
            setExclusiveOwnerThread(null);
            setState(0);
            return true;
        }

        @Override
        protected boolean isHeldExclusively() {
            return getState() == 1;
        }
    }

    private final Sync sync = new Sync();

    public void lock() {
        sync.acquire(1);
    }

    public void unlock() {
        sync.release(1);
    }

    public boolean isLocked() {
        return sync.isHeldExclusively();
    }
}
```

上面的 Mutex 类是一个互斥锁。它内部使用了一个 Sync 类，该类继承自 AQS。

- tryAcquire：尝试获取资源。如果当前状态为0（未锁定），那么设置为1（锁定），并设置当前线程为独占资源的线程。
- tryRelease：尝试释放资源。设置状态为0并清除持有资源的线程。
- isHeldExclusively：判断当前资源是否被独占。

假设有一个线程不安全的资源，我们需要确保在任何时刻只有一个线程能访问它，那么就可以使用这个 Mutex 锁来确保线程安全。

```java
public class Resource {
    private Mutex mutex = new Mutex();

    public void use() {
        mutex.lock();
        try {
            // 对资源的操作
        } finally {
            mutex.unlock();
        }
    }
}
```

在上述场景中，我们为一个不安全的资源添加了一个互斥锁，确保同一时刻只有一个线程可以使用这个资源，从而确保线程安全。

> 编辑：沉默王二，编辑前的内容来源于朋友开源的这个仓库：[深入浅出 Java 多线程](http://concurrent.redspider.group/)，强烈推荐。值得参考文章：[君哥聊技术：2万字 + 40 张图带你精通 Java AQS](https://mp.weixin.qq.com/s/EWm7unc4lsXIv0iS3o12kg)，[阿 Q 说代码：20张图带你彻底了解加锁和解锁](https://mp.weixin.qq.com/s/3tqBo47GtG3ljdrig2b8AA)

---

GitHub 上标星 9300+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第二份 PDF 《[并发编程小册](https://javabetter.cn/thread/)》终于来了！包括线程的基本概念和使用方法、Java的内存模型、sychronized、volatile、CAS、AQS、ReentrantLock、线程池、并发容器、ThreadLocal、生产者消费者模型等面试和开发必须掌握的内容，共计 15 万余字，200+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，二哥的并发编程进阶之路.pdf](https://javabetter.cn/thread/)

[加入二哥的编程星球](https://javabetter.cn/thread/)，在星球的第二个置顶帖「[知识图谱](https://javabetter.cn/thread/)」里就可以获取 PDF 版本。

![](https://cdn.tobebetterjavaer.com/stutymore/wangzhe-thread-20230904125125.png)
