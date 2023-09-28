---
title: 深入理解Java并发读写锁ReentrantReadWriteLock
shortTitle: ReentrantReadWriteLock
description: ReentrantReadWriteLock 是 Java 的一种读写锁，它允许多个读线程同时访问，但只允许一个写线程访问，或者阻塞所有的读写线程。这种锁的设计可以提高性能，特别是在读操作的数量远远超过写操作的情况下。
category:
  - Java核心
tag:
  - Java并发编程
head:
  - - meta
    - name: keywords
      content: Java,并发编程,多线程,Thread,读写锁,ReentrantReadWriteLock
---

# 第十六节：读写锁 ReentrantReadWriteLock

ReentrantReadWriteLock 是 Java 的一种读写锁，它允许多个读线程同时访问，但只允许一个写线程访问（会阻塞所有的读写线程）。这种锁的设计可以提高性能，特别是在读操作的数量远远超过写操作的情况下。

在并发场景中，为了解决线程安全问题，我们通常会使用关键字 [synchronized](https://javabetter.cn/thread/synchronized-1.html) 或者 JUC 包中实现了 Lock 接口的 [ReentrantLock](https://javabetter.cn/thread/reentrantLock.html)。但它们都是独占式获取锁，也就是在同一时刻只有一个线程能够获取锁。

而在一些业务场景中，大部分只是读数据，写数据很少，如果仅仅是读数据的话并不会影响数据正确性，而如果在这种业务场景下，依然使用独占锁的话，很显然会出现性能瓶颈。针对这种读多写少的情况，Java 提供了另外一个实现 Lock 接口的 ReentrantReadWriteLock——读写锁。

我们在[前面讲 Lock 接口](https://javabetter.cn/thread/lock.html)的时候，提到过读写锁，不知道大家是否还有印象。

**读写锁允许同一时刻被多个读线程访问，但是在写线程访问时，所有的读线程和其他的写线程都会被阻塞**。

在分析 WirteLock 和 ReadLock 的互斥性时，我们可以按照 WriteLock 与 WriteLock，WriteLock 与 ReadLock 以及 ReadLock 与 ReadLock 进行对比分析。

这里总结一下读写锁的特性：

1）**公平性选择**：支持非公平性（默认）和公平的锁获取方式，非公平的吞吐量优于公平；

在计算机科学和性能评估中，吞吐量（Throughput）是一个衡量系统处理能力的指标。它描述了单位时间内系统能够处理的事务或操作数量。吞吐量可以用来评估系统的效率和性能，例如，每秒钟完成多少次请求或操作。

非公平锁不保证等待获取锁的线程的顺序。当锁被释放时，哪个线程能够获取该锁并不遵循任何特定的顺序。这种方式通常效率较高，因为线程不需要按照队列顺序等待，从而可以减少上下文切换和调度开销，提高吞吐量。

公平锁则确保等待获取锁的线程将按照它们请求锁的顺序来获取锁。第一个请求锁的线程将是第一个获得锁的线程，以此类推。虽然公平锁的行为更容易预测，但由于需要维护一个明确的队列顺序，可能会增加额外的开销，从而降低吞吐量。

我们在讲[重入锁ReentrantLock](https://javabetter.cn/thread/reentrantLock.html)提到过这一点。

2）**重入性**：支持重入，读锁获取后能再次获取，写锁获取之后能够再次获取写锁，同时也能够获取读锁；

我们前面在讲 [Lock](https://javabetter.cn/thread/lock.html) 的时候也细致地讲过这一点。

3）**锁降级**：写锁降级是一种允许写锁转换为读锁的过程。通常的顺序是：

- 获取写锁：线程首先获取写锁，确保在修改数据时排它访问。
- 获取读锁：在写锁保持的同时，线程可以再次获取读锁。
- 释放写锁：线程保持读锁的同时释放写锁。
- 释放读锁：最后线程释放读锁。

这样，写锁就降级为读锁，允许其他线程进行并发读取，但仍然排除其他线程的写操作。下面的代码展示了如何使用 ReentrantReadWriteLock 来降级写锁：

```java
ReentrantReadWriteLock lock = new ReentrantReadWriteLock();
ReentrantReadWriteLock.WriteLock writeLock = lock.writeLock();
ReentrantReadWriteLock.ReadLock readLock = lock.readLock();

writeLock.lock(); // 获取写锁
try {
    // 执行写操作
    readLock.lock(); // 获取读锁
} finally {
    writeLock.unlock(); // 释放写锁
}

try {
    // 执行读操作
} finally {
    readLock.unlock(); // 释放读锁
}
```

写锁降级为读锁的过程有助于保持数据的一致性，而不影响并发读取的性能。通过这种方式，线程可以继续保持对数据的独占访问权限，直到它准备允许其他线程共享读取访问。这样可以确保在写操作和随后的读操作之间的数据一致性，并且允许其他读取线程并发访问。

要想彻底理解读写锁必须能够理解这几个问题：

- 1. 读写锁是怎样实现分别记录读写状态的？
- 2. 写锁是怎样获取和释放的？
- 3. 读锁是怎样获取和释放的？

我们带着这样的三个问题，再去了解下读写锁。

## 写锁详解

### 写锁的获取

同一时刻，ReentrantReadWriteLock 的写锁是不能被多个线程获取的，很显然 ReentrantReadWriteLock 的写锁是独占式锁，而实现写锁的同步语义是通过重写 [AQS](https://javabetter.cn/thread/aqs.html) 中的 tryAcquire 方法实现的。源码为:

```java
protected final boolean tryAcquire(int acquires) {
    /*
     * Walkthrough:
     * 1. If read count nonzero or write count nonzero
     *    and owner is a different thread, fail.
     * 2. If count would saturate, fail. (This can only
     *    happen if count is already nonzero.)
     * 3. Otherwise, this thread is eligible for lock if
     *    it is either a reentrant acquire or
     *    queue policy allows it. If so, update state
     *    and set owner.
     */
    Thread current = Thread.currentThread();
	// 1. 获取写锁当前的同步状态
    int c = getState();
	// 2. 获取写锁获取的次数
    int w = exclusiveCount(c);
    if (c != 0) {
        // (Note: if c != 0 and w == 0 then shared count != 0)
		// 3.1 当读锁已被读线程获取或者当前线程不是已经获取写锁的线程的话
		// 当前线程获取写锁失败
        if (w == 0 || current != getExclusiveOwnerThread())
            return false;
        if (w + exclusiveCount(acquires) > MAX_COUNT)
            throw new Error("Maximum lock count exceeded");
        // Reentrant acquire
		// 3.2 当前线程获取写锁，支持可重复加锁
        setState(c + acquires);
        return true;
    }
	// 3.3 写锁未被任何线程获取，当前线程可获取写锁
    if (writerShouldBlock() ||
        !compareAndSetState(c, c + acquires))
        return false;
    setExclusiveOwnerThread(current);
    return true;
}
```

这段代码的逻辑请看注释，这里有一个地方需要重点关注，`exclusiveCount(c)`方法，该方法源码为：

```java
static int exclusiveCount(int c)    { 
    return c & EXCLUSIVE_MASK; 
}
```

其中**EXCLUSIVE_MASK**为: 

```java
static final int EXCLUSIVE_MASK = (1 << SHARED_SHIFT) - 1;
``` 

EXCLUSIVE_MASK 为 1 左移 16 位然后减 1，即为 0x0000FFFF。而 exclusiveCount 方法是将同步状态（state 为 int 类型）与 0x0000FFFF 相与，即取同步状态的低 16 位。

那么低 16 位代表什么呢？根据 exclusiveCount 方法的注释为独占式获取的次数即写锁被获取的次数，现在就可以得出来一个结论**同步状态的低 16 位用来表示写锁的获取次数**。

同时还有一个方法值得我们注意：

```java
static int sharedCount(int c)    {
    return c >>> SHARED_SHIFT; 
}
```

该方法是获取读锁被获取的次数，是将同步状态（int c）右移 16 次，即取同步状态的高 16 位，现在我们可以得出另外一个结论**同步状态的高 16 位用来表示读锁被获取的次数**。

还记得这个问题“读写锁是怎样实现分别记录读写状态的”吗？其示意图如下图所示：

![读写锁的读写状态设计](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/ReentrantReadWriteLock-f714bdd6-917a-4d25-ac11-7e85b0ec1b14.png)

好，现在我们回过头来看写锁获取方法 tryAcquire，其主要逻辑为：**当读锁已经被读线程获取或者写锁已经被其他写线程获取，则写锁获取失败；否则，获取成功并支持重入，增加写状态。**

### 写锁的释放

写锁释放通过重写 [AQS](https://javabetter.cn/thread/aqs.html) 的 tryRelease 方法，源码为：

```java
protected final boolean tryRelease(int releases) {
    if (!isHeldExclusively())
        throw new IllegalMonitorStateException();
	//1. 同步状态减去写状态
    int nextc = getState() - releases;
	//2. 当前写状态是否为0，为0则释放写锁
    boolean free = exclusiveCount(nextc) == 0;
    if (free)
        setExclusiveOwnerThread(null);
	//3. 不为0则更新同步状态
    setState(nextc);
    return free;
}
```

源码的实现逻辑请看注释，不难理解，与 ReentrantLock 基本一致，这里需要注意的是，减少写状态 `int nextc = getState() - releases;` 只需要用**当前同步状态直接减去写状态，原因正是我们刚才所说的写状态是由同步状态的低 16 位表示的**。

## 读锁详解

### 读锁的获取

看完了写锁，再来看看读锁，读锁不是独占式锁，即同一时刻该锁可以被多个读线程获取，也就是一种共享式锁。按照之前对 [AQS](https://javabetter.cn/thread/aqs.html) 的介绍，实现共享式同步组件的同步语义需要通过重写 AQS 的 tryAcquireShared 方法和 tryReleaseShared 方法。读锁的获取实现方法为：

```java
protected final int tryAcquireShared(int unused) {
    /*
     * Walkthrough:
     * 1. If write lock held by another thread, fail.
     * 2. Otherwise, this thread is eligible for
     *    lock wrt state, so ask if it should block
     *    because of queue policy. If not, try
     *    to grant by CASing state and updating count.
     *    Note that step does not check for reentrant
     *    acquires, which is postponed to full version
     *    to avoid having to check hold count in
     *    the more typical non-reentrant case.
     * 3. If step 2 fails either because thread
     *    apparently not eligible or CAS fails or count
     *    saturated, chain to version with full retry loop.
     */
    Thread current = Thread.currentThread();
    int c = getState();
	//1. 如果写锁已经被获取并且获取写锁的线程不是当前线程的话，当前
	// 线程获取读锁失败返回-1
    if (exclusiveCount(c) != 0 &&
        getExclusiveOwnerThread() != current)
        return -1;
    int r = sharedCount(c);
    if (!readerShouldBlock() &&
        r < MAX_COUNT &&
		//2. 当前线程获取读锁
        compareAndSetState(c, c + SHARED_UNIT)) {
		//3. 下面的代码主要是新增的一些功能，比如getReadHoldCount()方法
		//返回当前获取读锁的次数
        if (r == 0) {
            firstReader = current;
            firstReaderHoldCount = 1;
        } else if (firstReader == current) {
            firstReaderHoldCount++;
        } else {
            HoldCounter rh = cachedHoldCounter;
            if (rh == null || rh.tid != getThreadId(current))
                cachedHoldCounter = rh = readHolds.get();
            else if (rh.count == 0)
                readHolds.set(rh);
            rh.count++;
        }
        return 1;
    }
	//4. 处理在第二步中CAS操作失败的自旋已经实现重入性
    return fullTryAcquireShared(current);
}
```

代码的逻辑请看注释，需要注意的是 **当写锁被其他线程获取后，读锁获取失败**，否则获取成功，会利用 CAS 更新同步状态。

另外，当前同步状态需要加上 SHARED_UNIT（`(1 << SHARED_SHIFT)`，即 0x00010000）的原因，我们在上面也说过了，同步状态的高 16 位用来表示读锁被获取的次数。

如果 CAS 失败或者已经获取读锁的线程再次获取读锁时，是靠 fullTryAcquireShared 方法实现的，这段代码就不展开说了，有兴趣可以看看。

### 读锁的释放

读锁释放的实现主要通过方法 tryReleaseShared，源码如下，主要逻辑请看注释：

```java
protected final boolean tryReleaseShared(int unused) {
    Thread current = Thread.currentThread();
	// 前面还是为了实现getReadHoldCount等新功能
    if (firstReader == current) {
        // assert firstReaderHoldCount > 0;
        if (firstReaderHoldCount == 1)
            firstReader = null;
        else
            firstReaderHoldCount--;
    } else {
        HoldCounter rh = cachedHoldCounter;
        if (rh == null || rh.tid != getThreadId(current))
            rh = readHolds.get();
        int count = rh.count;
        if (count <= 1) {
            readHolds.remove();
            if (count <= 0)
                throw unmatchedUnlockException();
        }
        --rh.count;
    }
    for (;;) {
        int c = getState();
		// 读锁释放 将同步状态减去读状态即可
        int nextc = c - SHARED_UNIT;
        if (compareAndSetState(c, nextc))
            // Releasing the read lock has no effect on readers,
            // but it may allow waiting writers to proceed if
            // both read and write locks are now free.
            return nextc == 0;
    }
}
```

## 锁降级

读写锁支持锁降级，**遵循按照获取写锁，获取读锁再释放写锁的次序，写锁能够降级成为读锁**，不支持锁升级，关于锁降级，下面的示例代码摘自 ReentrantWriteReadLock 源码：

```java
void processCachedData() {
    rwl.readLock().lock();
    if (!cacheValid) {
        // Must release read lock before acquiring write lock
        rwl.readLock().unlock();
        rwl.writeLock().lock();
        try {
            // Recheck state because another thread might have
            // acquired write lock and changed state before we did.
            if (!cacheValid) {
                data = ...
        cacheValid = true;
      }
      // Downgrade by acquiring read lock before releasing write lock
      rwl.readLock().lock();
    } finally {
      rwl.writeLock().unlock(); // Unlock write, still hold read
    }
  }

  try {
    use(data);
  } finally {
    rwl.readLock().unlock();
  }
}
```

这里的流程可以解释如下：

- 获取读锁：首先尝试获取读锁来检查某个缓存是否有效。
- 检查缓存：如果缓存无效，则需要释放读锁，因为在获取写锁之前必须释放读锁。
- 获取写锁：获取写锁以便更新缓存。此时，可能还需要重新检查缓存状态，因为在释放读锁和获取写锁之间可能有其他线程修改了状态。
- 更新缓存：如果确认缓存无效，更新缓存并将其标记为有效。
- 写锁降级为读锁：在释放写锁之前，获取读锁，从而实现写锁到读锁的降级。这样，在释放写锁后，其他线程可以并发读取，但不能写入。
- 使用数据：现在可以安全地使用缓存数据了。
- 释放读锁：完成操作后释放读锁。

这个流程结合了读锁和写锁的优点，确保了数据的一致性和可用性，同时允许在可能的情况下进行并发读取。使用读写锁的代码可能看起来比使用简单的互斥锁更复杂，但它提供了更精细的并发控制，可能会提高多线程应用程序的性能。

## 使用读写锁

ReentrantReadWriteLock 的使用非常简单，下面的代码展示了如何使用 ReentrantReadWriteLock 来实现一个线程安全的计数器：

```java
public class Counter {
    private final ReentrantReadWriteLock rwl = new ReentrantReadWriteLock();
    private final Lock r = rwl.readLock();
    private final Lock w = rwl.writeLock();
    private int count = 0;

    public int getCount() {
        r.lock();
        try {
            return count;
        } finally {
            r.unlock();
        }
    }

    public void inc() {
        w.lock();
        try {
            count++;
        } finally {
            w.unlock();
        }
    }
}
```

我们再来模拟一个稍微复杂一点的例子，如何使用读写锁来实现安全地读取和更新共享数据。

```java
public class CachedData {
    private final ReentrantReadWriteLock rwl = new ReentrantReadWriteLock();
    private Object data;
    private boolean cacheValid;

    public void processCachedData() {
        // Acquire read lock
        rwl.readLock().lock();
        if (!cacheValid) {
            // Must release read lock before acquiring write lock
            rwl.readLock().unlock();
            rwl.writeLock().lock();
            try {
                // Recheck state because another thread might have
                // acquired write lock and changed state before we did
                if (!cacheValid) {
                    data = fetchDataFromDatabase();
                    cacheValid = true;
                }
                // Downgrade by acquiring read lock before releasing write lock
                rwl.readLock().lock();
            } finally {
                rwl.writeLock().unlock(); // Unlock write, still hold read
            }
        }

        try {
            use(data);
        } finally {
            rwl.readLock().unlock();
        }
    }

    private Object fetchDataFromDatabase() {
        // Simulate fetching data from a database
        return new Object();
    }

    private void use(Object data) {
        // Simulate using the data
        System.out.println("使用数据: " + data);
    }

    public static void main(String[] args) {
        CachedData cachedData = new CachedData();
        cachedData.processCachedData();
    }
}
```

当缓存无效时，会先释放读锁，然后获取写锁来更新缓存。一旦缓存被更新，就会进行写锁到读锁的降级，允许其他线程并发读取，但仍然排除写入。

这样的结构允许在确保数据一致性的同时，实现并发读取的优势，从而提高多线程环境下的性能。

## 小结

ReentrantReadWriteLock 是 Java 的一种读写锁，它允许多个读线程同时访问，但只允许一个写线程访问，或者阻塞所有的读写线程。这种锁的设计可以提高性能，特别是在数据结构中，读操作的数量远远超过写操作的情况下。

读写锁的实现主要是通过重写 [AQS](https://javabetter.cn/thread/aqs.html) 的 tryAcquire 方法和 tryRelease 方法实现的，读锁和写锁的获取和释放都是通过这两个方法实现的。

读写锁支持锁降级，遵循按照获取写锁，获取读锁再释放写锁的次序，写锁能够降级成为读锁，不支持锁升级。


>编辑：沉默王二，编辑前的内容主要来自于 CL0610的 GitHub 仓库[https://github.com/CL0610/Java-concurrency](https://github.com/CL0610/Java-concurrency/blob/master/11.深入理解读写锁ReentrantReadWriteLock/深入理解读写锁ReentrantReadWriteLock.md)

---

GitHub 上标星 9300+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第二份 PDF 《[并发编程小册](https://javabetter.cn/thread/)》终于来了！包括线程的基本概念和使用方法、Java的内存模型、sychronized、volatile、CAS、AQS、ReentrantLock、线程池、并发容器、ThreadLocal、生产者消费者模型等面试和开发必须掌握的内容，共计 15 万余字，200+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，二哥的并发编程进阶之路.pdf](https://javabetter.cn/thread/)

[加入二哥的编程星球](https://javabetter.cn/thread/)，在星球的第二个置顶帖「[知识图谱](https://javabetter.cn/thread/)」里就可以获取 PDF 版本。

![](https://cdn.tobebetterjavaer.com/stutymore/wangzhe-thread-20230904125125.png)
