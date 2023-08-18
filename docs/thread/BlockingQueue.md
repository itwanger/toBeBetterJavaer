---
title: 吊打Java并发面试官之阻塞队列BlockingQueue
shortTitle: BlockingQueue
description: BlockingQueue 是 Java 中一个接口，它代表了一个线程安全的队列，不仅可以由多个线程并发访问，还添加了等待/通知机制，以便在队列为空时阻塞获取元素的线程，直到队列变得可用，或者在队列满时阻塞插入元素的线程，直到队列变得可用。
category:
  - Java核心
tag:
  - Java并发编程
head:
  - - meta
    - name: keywords
      content: Java,并发编程,多线程,Thread,BlockingQueue
---

# 14.22 BlockingQueue

BlockingQueue 是 Java 中的一个接口，它代表了一个线程安全的队列，不仅可以由多个线程并发访问，还添加了等待/通知机制，以便在队列为空时阻塞获取元素的线程，直到队列变得可用，或者在队列满时阻塞插入元素的线程，直到队列变得可用。

最常用的"[生产者-消费者](https://javabetter.cn/thread/shengchanzhe-xiaofeizhe.html)"问题中，队列通常被视作线程间的数据容器，生产者将“生产”出来的数据放入数据容器，消费者从“数据容器”中获取数据，这样，生产者线程和消费者线程就解耦了，各自只需要专注自己的业务即可。

阻塞队列（BlockingQueue）被广泛用于“生产者-消费者”问题中，其原因是 BlockingQueue 提供了可阻塞的插入和移除方法。**当队列容器已满，生产者线程会被阻塞，直到队列未满；当队列容器为空时，消费者线程会被阻塞，直至队列非空时为止**。

### 基本操作

BlockingQueue 接口定义的方法如下所示：

![](https://cdn.tobebetterjavaer.com/stutymore/BlockingQueue-20230818143620.png)

由于 BlockingQueue 继承了 Queue 接口，因此，BlockingQueue 也具有 Queue 接口的基本操作，如下所示：

### 1）插入元素

1. `boolean add(E e)` ：将元素添加到队列尾部，如果队列满了，则抛出异常 IllegalStateException。
2. `boolean offer(E e)`：将元素添加到队列尾部，如果队列满了，则返回 false。

### 2）删除元素

1. `boolean remove(Object o)`：从队列中删除元素，成功返回`true`，失败返回`false`
2. `E poll()`：检索并删除此队列的头部，如果此队列为空，则返回null。

### 3）查找元素

1. `E element()`：检索但不删除此队列的头部，如果队列为空时则抛出 NoSuchElementException 异常；
2. `peek()`：检索但不删除此队列的头部，如果此队列为空，则返回 null.

除了从 Queue 接口 继承到一些方法，BlockingQueue 自身还定义了一些其他的方法，比如说插入操作：

1. `void put(E e)`：将元素添加到队列尾部，如果队列满了，则线程将阻塞直到有空间。
2. `offer(E e, long timeout, TimeUnit unit)`：将指定的元素插入此队列中，如果队列满了，则等待指定的时间，直到队列可用。

比如说删除操作：

1. `take()`：检索并删除此队列的头部，如有必要，则等待直到队列可用；
2. `poll(long timeout, TimeUnit unit)`：检索并删除此队列的头部，如果需要元素变得可用，则等待指定的等待时间。



### ArrayBlockingQueue

BlockingQueue 接口的实现类有 ArrayBlockingQueue、DelayQueue、LinkedBlockingDeque、LinkedBlockingQueue、LinkedTransferQueue、PriorityBlockingQueue、SynchronousQueue 等，我们先从 ArrayBlockingQueue 说起。

![](https://cdn.tobebetterjavaer.com/stutymore/BlockingQueue-20230818153420.png)

**ArrayBlockingQueue** 它是一个基于数组的有界阻塞队列：

- 有界：ArrayBlockingQueue 的大小是在构造时就确定了，并且在之后不能更改。这个界限提供了流量控制，有助于资源的合理使用。
- FIFO：队列操作符合先进先出的原则。
- 当队列容量满时，尝试将元素放入队列将导致阻塞；尝试从一个空的队列取出元素也会阻塞。

需要注意的是，ArrayBlockingQueue 并不能保证绝对的公平，所谓公平是指严格按照线程等待的绝对时间顺序，即最先等待的线程能够最先访问到 ArrayBlockingQueue。

这是因为还有其他系统级别的因素，如线程调度，可能会影响到实际的执行顺序。如果需要公平的 ArrayBlockingQueue，可在声明的时候设置公平标志为 true：

```java
private static ArrayBlockingQueue<Integer> blockingQueue = new ArrayBlockingQueue<Integer>(10, true);
```

ArrayBlockingQueue 的字段如下:

```java
/** The queued items */
final Object[] items;

/** items index for next take, poll, peek or remove */
int takeIndex;

/** items index for next put, offer, or add */
int putIndex;

/** Number of elements in the queue */
int count;

/*
 * Concurrency control uses the classic two-condition algorithm
 * found in any textbook.
 */

/** Main lock guarding all access */
final ReentrantLock lock;

/** Condition for waiting takes */
private final Condition notEmpty;

/** Condition for waiting puts */
private final Condition notFull;
```

- items: 这是一个用于存储队列元素的数组。队列的大小在构造时定义，并且在生命周期内不会改变。
- takeIndex: 这个索引用于下一个 take、poll、peek 或 remove 操作。它指向当前可被消费的元素位置。
- putIndex: 这个索引用于下一个 put、offer 或 add 操作。它指向新元素将被插入的位置。
- count: 这是队列中当前元素的数量。当达到数组大小时，进一步的 put 操作将被阻塞。
- lock: 这是用于保护队列访问的 [ReentrantLock](https://javabetter.cn/thread/reentrantLock.html) 对象。所有的访问和修改队列的操作都需要通过这个锁来同步。
- notEmpty: 这个条件 [Condition](https://javabetter.cn/thread/condition.html) 用于等待 take 操作。当队列为空时，尝试从队列中取元素的线程将等待这个条件。
- notFull: 这个条件 [Condition](https://javabetter.cn/thread/condition.html) 用于等待 put 操作。当队列已满时，尝试向队列中添加元素的线程将等待这个条件。

构造方法如下：

```java
public ArrayBlockingQueue(int capacity, boolean fair) {
    if (capacity <= 0)
        throw new IllegalArgumentException();
    this.items = new Object[capacity];
    lock = new ReentrantLock(fair);
    notEmpty = lock.newCondition();
    notFull =  lock.newCondition();
}
```

#### 1）put 方法详解

`put(E e)`方法源码如下：

```java
public void put(E e) throws InterruptedException {
    checkNotNull(e);
    final ReentrantLock lock = this.lock;
    lock.lockInterruptibly();
    try {
		//如果当前队列已满，将线程移入到notFull等待队列中
        while (count == items.length)
            notFull.await();
		//满足插入数据的要求，直接进行入队操作
        enqueue(e);
    } finally {
        lock.unlock();
    }
}
```

该方法的逻辑很简单，当队列已满时（`count == items.length`）将线程移入到 notFull 等待队列中，如果满足插入数据的条件，直接调用` enqueue(e)`插入元素。enqueue 方法源码如下：

```java
private void enqueue(E x) {
    // assert lock.getHoldCount() == 1;
    // assert items[putIndex] == null;
    final Object[] items = this.items;
	//插入数据
    items[putIndex] = x;
    if (++putIndex == items.length)
        putIndex = 0;
    count++;
	//通知消费者线程，当前队列中有数据可供消费
    notEmpty.signal();
}
```

enqueue 方法的逻辑同样很简单，先插入数据（`items[putIndex] = x`），然后通知被阻塞的消费者线程：当前队列中有数据可供消费（`notEmpty.signal()`）了。

#### 2）take 方法详解

take 方法的源码如下：

```java
public E take() throws InterruptedException {
    final ReentrantLock lock = this.lock;
    lock.lockInterruptibly();
    try {
		//如果队列为空，没有数据，将消费者线程移入等待队列中
        while (count == 0)
            notEmpty.await();
		//获取数据
        return dequeue();
    } finally {
        lock.unlock();
    }
}
```

1. 如果当前队列为空的话，则将获取数据的消费者线程移入到等待队列中；
2. 如果队列不为空则获取数据，即完成出队操作`dequeue`。dequeue 方法源码如下：

```java
private E dequeue() {
    // assert lock.getHoldCount() == 1;
    // assert items[takeIndex] != null;
    final Object[] items = this.items;
    @SuppressWarnings("unchecked")
	//获取数据
    E x = (E) items[takeIndex];
    items[takeIndex] = null;
    if (++takeIndex == items.length)
        takeIndex = 0;
    count--;
    if (itrs != null)
        itrs.elementDequeued();
    //通知被阻塞的生产者线程
	notFull.signal();
    return x;
}
```

dequeue 方法主要做了两件事情：

1. 获取队列中的数据（`(E) items[takeIndex]`）；
2. 通知可能正在等待插入元素的生产者线程队列现在有可用空间，通过调用notFull 条件变量的 signal 方法实现。

从以上分析可以看出，put 和 take 方法主要通过 [Condition](https://javabetter.cn/thread/condition.html) 的通知机制来完成阻塞式的数据生产和消费。

OK，我们再来看一个 ArrayBlockingQueue 的使用示例：

```java
public class ArrayBlockingQueueTest {
    private static ArrayBlockingQueue<Integer> blockingQueue = new ArrayBlockingQueue<Integer>(10, true);

    public static void main(String[] args) {
        new Thread(new Producer()).start();
        new Thread(new Consumer()).start();
    }

    static class Producer implements Runnable {
        @Override
        public void run() {
            for (int i = 0; i < 100; i++) {
                try {
                    blockingQueue.put(i);
                    System.out.println("生产者生产数据：" + i);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    static class Consumer implements Runnable {
        @Override
        public void run() {
            for (int i = 0; i < 100; i++) {
                try {
                    Integer data = blockingQueue.take();
                    System.out.println("消费者消费数据：" + data);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
```

运行的部分结果如下图所示：

![](https://cdn.tobebetterjavaer.com/stutymore/BlockingQueue-20230818155804.png)


### LinkedBlockingQueue

LinkedBlockingQueue 是一个基于链表的线程安全的阻塞队列：

- 可以在队列头部和尾部进行高效的插入和删除操作。
- 当队列为空时，取操作会被阻塞，直到队列中有新的元素可用。当队列已满时，插入操作会被阻塞，直到队列有可用空间。
- 可以在构造时指定最大容量。如果不指定，默认为 Integer.MAX_VALUE，这意味着队列的大小受限于可用内存。

LinkedBlockingQueue 的字段如下：

```java
/** Current number of elements */
private final AtomicInteger count = new AtomicInteger();

/**
 * Head of linked list.
 * Invariant: head.item == null
 */
transient Node<E> head;

/**
 * Tail of linked list.
 * Invariant: last.next == null
 */
private transient Node<E> last;

/** Lock held by take, poll, etc */
private final ReentrantLock takeLock = new ReentrantLock();

/** Wait queue for waiting takes */
private final Condition notEmpty = takeLock.newCondition();

/** Lock held by put, offer, etc */
private final ReentrantLock putLock = new ReentrantLock();

/** Wait queue for waiting puts */
private final Condition notFull = putLock.newCondition();
```

- count: 一个 [AtomicInteger](https://javabetter.cn/thread/atomic.html)，表示队列中当前元素的数量。通过原子操作保证其线程安全。
- head: 队列的头部节点。由于这是一个 FIFO 队列，所以元素总是从头部移除。头部节点的 item 字段始终为 null，它作为一个虚拟节点，用于帮助管理队列。
- last: 队列的尾部节点。新元素总是插入到尾部。
- takeLock 和 putLock: 这是 LinkedBlockingQueue 中的两把锁。takeLock 用于控制取操作，putLock 用于控制放入操作。这样的设计使得放入和取出操作能够在一定程度上并行执行，从而提高队列的吞吐量。
- notEmpty 和 notFull: 这是两个条件变量，分别与 takeLock 和 putLock 相关联。当队列为空时，尝试从队列中取出元素的线程将会在 notEmpty 上等待。当新元素被放入队列时，这些等待的线程将会被唤醒。同样地，当队列已满时，尝试向队列中放入元素的线程将会在 notFull 上等待，等待队列有可用空间时被唤醒。

并且，采用了链表的数据结构来实现队列，Node 结点的定义为：

```java
static class Node<E> {
    E item;

    /**
     * One of:
     * - the real successor Node
     * - this Node, meaning the successor is head.next
     * - null, meaning there is no successor (this is the last node)
     */
    Node<E> next;

    Node(E x) { item = x; }
}
```

接下来，我们也同样来看看 put 方法和 take 方法的实现。

#### 1）put 方法详解

put 方法源码为:

```java
public void put(E e) throws InterruptedException {
    if (e == null) throw new NullPointerException();
    // Note: convention in all put/take/etc is to preset local var
    // holding count negative to indicate failure unless set.
    int c = -1;
    Node<E> node = new Node<E>(e);
    final ReentrantLock putLock = this.putLock;
    final AtomicInteger count = this.count;
    putLock.lockInterruptibly();
    try {
        /*
         * Note that count is used in wait guard even though it is
         * not protected by lock. This works because count can
         * only decrease at this point (all other puts are shut
         * out by lock), and we (or some other waiting put) are
         * signalled if it ever changes from capacity. Similarly
         * for all other uses of count in other wait guards.
         */
		//如果队列已满，则阻塞当前线程，将其移入等待队列
        while (count.get() == capacity) {
            notFull.await();
        }
		//入队操作，插入数据
        enqueue(node);
        c = count.getAndIncrement();
		//若队列满足插入数据的条件，则通知被阻塞的生产者线程
        if (c + 1 < capacity)
            notFull.signal();
    } finally {
        putLock.unlock();
    }
    if (c == 0)
        signalNotEmpty();
}
```

put 方法的逻辑也同样很容易理解，可见注释。基本上和 ArrayBlockingQueue 的 put 方法一样。

#### 2）take 方法

源码如下：

```java
public E take() throws InterruptedException {
    E x;
    int c = -1;
    final AtomicInteger count = this.count;
    final ReentrantLock takeLock = this.takeLock;
    takeLock.lockInterruptibly();
    try {
		//当前队列为空，则阻塞当前线程，将其移入到等待队列中，直至满足条件
        while (count.get() == 0) {
            notEmpty.await();
        }
		//移除队头元素，获取数据
        x = dequeue();
        c = count.getAndDecrement();
        //如果当前满足移除元素的条件，则通知被阻塞的消费者线程
		if (c > 1)
            notEmpty.signal();
    } finally {
        takeLock.unlock();
    }
    if (c == capacity)
        signalNotFull();
    return x;
}
```

take 方法的主要逻辑请见于注释，也很容易理解。

** ArrayBlockingQueue 与 LinkedBlockingQueue 的比较**

**相同点**：ArrayBlockingQueue 和 LinkedBlockingQueue 都是通过 condition 通知机制来实现可阻塞式插入和删除元素，并满足线程安全的特性；

**不同点**：

1. ArrayBlockingQueue 底层是采用的数组进行实现，而 LinkedBlockingQueue 则是采用链表数据结构；
2. ArrayBlockingQueue 插入和删除数据，只采用了一个 lock，而 LinkedBlockingQueue 则是在插入和删除分别采用了`putLock`和`takeLock`，这样可以降低线程由于线程无法获取到 lock 而进入 WAITING 状态的可能性，从而提高了线程并发执行的效率。

### PriorityBlockingQueue

PriorityBlockingQueue 是一个支持优先级的无界阻塞队列。默认情况下元素采用自然顺序进行排序，也可以通过自定义类实现 compareTo()方法来指定元素排序规则，或者初始化时通过构造器参数 Comparator 来指定排序规则。

### SynchronousQueue

SynchronousQueue 每个插入操作必须等待另一个线程进行相应的删除操作，因此，SynchronousQueue 实际上没有存储任何数据元素，因为只有线程在删除数据时，其他线程才能插入数据，同样的，如果当前有线程在插入数据时，线程才能删除数据。SynchronousQueue 也可以通过构造器参数来为其指定公平性。

### LinkedTransferQueue

LinkedTransferQueue 是一个由链表数据结构构成的无界阻塞队列，由于该队列实现了 TransferQueue 接口，与其他阻塞队列相比主要有以下不同的方法：

**transfer(E e)**
如果当前有线程（消费者）正在调用 take()方法或者可延时的 poll()方法进行消费数据时，生产者线程可以调用 transfer 方法将数据传递给消费者线程。如果当前没有消费者线程的话，生产者线程就会将数据插入到队尾，直到有消费者能够进行消费才能退出；

**tryTransfer(E e)**
tryTransfer 方法如果当前有消费者线程（调用 take 方法或者具有超时特性的 poll 方法）正在消费数据的话，该方法可以将数据立即传送给消费者线程，如果当前没有消费者线程消费数据的话，就立即返回`false`。因此，与 transfer 方法相比，transfer 方法是必须等到有消费者线程消费数据时，生产者线程才能够返回。而 tryTransfer 方法能够立即返回结果退出。

`tryTransfer(E e,long timeout,imeUnit unit)`
与 transfer 基本功能一样，只是增加了超时特性，如果数据才规定的超时时间内没有消费者进行消费的话，就返回`false`。

### LinkedBlockingDeque

LinkedBlockingDeque 是基于链表数据结构的有界阻塞双端队列，如果在创建对象时为指定大小时，其默认大小为 Integer.MAX_VALUE。与 LinkedBlockingQueue 相比，主要的不同点在于，LinkedBlockingDeque 具有双端队列的特性。LinkedBlockingDeque 基本操作如下图所示（来源于 java 文档）

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/BlockingQueue-02.png)

如上图所示，LinkedBlockingDeque 的基本操作可以分为四种类型：

1. 特殊情况，抛出异常；
2. 特殊情况，返回特殊值如 null 或者 false；
3. 当线程不满足操作条件时，线程会被阻塞直至条件满足；
4. 操作具有超时特性。

另外，LinkedBlockingDeque 实现了 BlockingDueue 接口而 LinkedBlockingQueue 实现的是 BlockingQueue，这两个接口的主要区别如下图所示（来源于 java 文档）：

![BlockingQueue和BlockingDeque的区别](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/BlockingQueue-03.png)

从上图可以看出，两个接口的功能是可以等价使用的，比如 BlockingQueue 的 add 方法和 BlockingDeque 的 addLast 方法的功能是一样的。

### DelayQueue

DelayQueue 是一个存放实现 Delayed 接口的数据的无界阻塞队列，只有当数据对象的延时时间达到时才能插入到队列进行存储。如果当前所有的数据都还没有达到创建时所指定的延时期，则队列没有队头，并且线程通过 poll 等方法获取数据元素则返回 null。所谓数据延时期满时，则是通过 Delayed 接口的`getDelay(TimeUnit.NANOSECONDS)`来进行判定，如果该方法返回的是小于等于 0 则说明该数据元素的延时期已满。

---

> 编辑：沉默王二，内容大部分来源以下三个开源仓库：
>
> - [深入浅出 Java 多线程](http://concurrent.redspider.group/)
> - [并发编程知识总结](https://github.com/CL0610/Java-concurrency)
> - [Java 八股文](https://github.com/CoderLeixiaoshuai/java-eight-part)

---

GitHub 上标星 9000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括 Java 基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM 等等，共计 32 万余字，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 9000+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
