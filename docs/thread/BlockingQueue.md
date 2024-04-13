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

# 第二十二节：阻塞队列 BlockingQueue

BlockingQueue 是 Java 中的一个接口，它代表了一个线程安全的队列，不仅可以由多个线程并发访问，还添加了等待/通知机制，以便在队列为空时阻塞获取元素的线程，直到队列变得可用，或者在队列满时阻塞插入元素的线程，直到队列变得可用。

最常见的"[生产者-消费者](https://javabetter.cn/thread/shengchanzhe-xiaofeizhe.html)"问题中，队列通常被视作线程间的数据容器，生产者将“生产”出来的数据放入数据容器，消费者从“数据容器”中获取数据，这样，生产者线程和消费者线程就解耦了，各自只需要专注自己的业务即可。

阻塞队列（BlockingQueue）被广泛用于“生产者-消费者”问题中，其原因是 BlockingQueue 提供了可阻塞的插入和移除方法。**当队列容器已满，生产者线程会被阻塞，直到队列未满；当队列容器为空时，消费者线程会被阻塞，直至队列非空时为止**。

## 基本操作

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



## ArrayBlockingQueue

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

### 1）put 方法详解

`put(E e)`方法源码如下：

```java
public void put(E e) throws InterruptedException {
    // 确保传入的元素不为null
    checkNotNull(e);
    final ReentrantLock lock = this.lock;

    // 请求锁，如果线程被中断则抛出异常
    lock.lockInterruptibly();
    try {
        // 循环检查队列是否已满，如果满了则在notFull条件上等待
        while (count == items.length) {
            notFull.await();
        }
        // 队列未满，将元素加入队列
        enqueue(e);
    } finally {
        // 在try块后释放锁，确保锁最终被释放
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

### 2）take 方法详解

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

### 3）使用示例

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


## LinkedBlockingQueue

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
- takeLock 和 putLock: 这是 LinkedBlockingQueue 中的两把 [ReentrantLock 锁](https://javabetter.cn/thread/reentrantLock.html)。takeLock 用于控制取操作，putLock 用于控制放入操作。这样的设计使得放入和取出操作能够在一定程度上并行执行，从而提高队列的吞吐量。
- notEmpty 和 notFull: 这是两个 [Condition](https://javabetter.cn/thread/condition.html) 变量，分别与 takeLock 和 putLock 相关联。当队列为空时，尝试从队列中取出元素的线程将会在 notEmpty 上等待。当新元素被放入队列时，这些等待的线程将会被唤醒。同样地，当队列已满时，尝试向队列中放入元素的线程将会在 notFull 上等待，等待队列有可用空间时被唤醒。

链表的 Node 节点的定义如下：

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

01）item: 这个字段用于存储节点包含的元素。

02）next: 这个字段表示节点在队列中的后继节点。这个字段有三个可能的值：
- 后继节点的实际引用。
- 此节点自身的引用，意味着后继节点是头节点的下一个节点。
- null，表示没有后继节点，也就是说此节点是队列的最后一个节点。

03）`Node(E x)`: 这是节点类的构造方法，它接受一个元素 x 并将其赋值给 item 字段。

### 1）put 方法详解

put 方法源码如下:

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

put 方法的逻辑基本上和 ArrayBlockingQueue 的一样。

01）参数检查：如果传入的元素为 null，则抛出 NullPointerException。LinkedBlockingQueue 不允许插入 null 元素。

02）局部变量初始化：

- `int c = -1;` 用于存储操作前的队列元素数量，预设为 -1 表示失败，除非稍后设置。
- `Node<E> node = new Node<E>(e);` 创建一个新的节点包含要插入的元素 e。
- `final ReentrantLock putLock = this.putLock;` 和 `final AtomicInteger count = this.count;` 获取队列的锁和计数器对象。

03）获取锁：`putLock.lockInterruptibly();` 尝试获取用于插入操作的锁，如果线程被中断，则抛出 InterruptedException。

04）等待队列非满：如果队列已满（`count.get() == capacity）`，当前线程将被阻塞，并等待 notFull 条件被满足。一旦有空间可用，线程将被唤醒继续执行。

05）入队操作：调用 `enqueue(node);` 将新节点插入队列的尾部。

06）更新计数：通过 `c = count.getAndIncrement();` 获取并递增队列的元素计数。

07）检查并可能的唤醒其他生产者线程：如果队列没有满（`c + 1 < capacity`），使用 `notFull.signal();` 唤醒可能正在等待插入空间的其他生产者线程。

08）释放锁：finally 块确保锁在操作完成后被释放。

09）可能的唤醒消费者线程：如果插入操作将队列从空变为非空（`c == 0`），则调用 `signalNotEmpty();` 唤醒可能正在等待非空队列的消费者线程。

### 2）take 方法详解

take 方法的源码如下：

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

01）局部变量初始化：

- `E x;` 用于存储被取出的元素。
- `int c = -1;` 用于存储操作前的队列元素数量，预设为 -1 表示失败，除非稍后设置。
- `final AtomicInteger count = this.count;` 和 `final ReentrantLock takeLock = this.takeLock;` 获取队列的计数器和锁对象。

02）获取锁：`takeLock.lockInterruptibly();` 尝试获取用于取出操作的锁，如果线程被中断，则抛出 InterruptedException。

03）等待队列非空：如果队列为空（`count.get() == 0`），当前线程将被阻塞，并等待 notEmpty 条件被满足。一旦队列非空，线程将被唤醒继续执行。

04）出队操作：调用 `x = dequeue();` 从队列的头部移除元素，并将其赋值给 x。

05）更新计数：通过 `c = count.getAndDecrement();` 获取并递减队列的元素计数。

06）检查并可能的唤醒其他消费者线程：如果队列仍有其他元素（`c > 1`），使用 `notEmpty.signal();` 唤醒可能正在等待非空队列的其他消费者线程。

07）释放锁：finally 块确保锁在操作完成后被释放。

08）可能的唤醒生产者线程：如果取出操作将队列从满变为未满（`c == capacity`），则调用 `signalNotFull();` 唤醒可能正在等待插入空间的生产者线程。

09）返回取出的元素：最后返回被取出的元素 x。

### 3）使用示例

```java
public class LinkedBlockingQueueTest {
    private static LinkedBlockingQueue<Integer> blockingQueue = new LinkedBlockingQueue<Integer>(10);

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

![](https://cdn.tobebetterjavaer.com/stutymore/BlockingQueue-20230818212205.png)

## ArrayBlockingQueue 与 LinkedBlockingQueue 的比较

**相同点**：ArrayBlockingQueue 和 LinkedBlockingQueue 都是通过 [Condition](https://javabetter.cn/thread/condition.html) 通知机制来实现可阻塞的插入和删除。

**不同点**：

1. ArrayBlockingQueue 基于数组实现，而 LinkedBlockingQueue 基于链表实现；
2. ArrayBlockingQueue 使用一个单独的 ReentrantLock 来控制对队列的访问，而 LinkedBlockingQueue 使用两个锁（putLock 和 takeLock），一个用于放入操作，另一个用于取出操作。这可以提供更细粒度的控制，并可能减少线程之间的竞争。

## PriorityBlockingQueue

PriorityBlockingQueue 是一个具有优先级排序特性的无界阻塞队列。元素在队列中的排序遵循自然排序或者通过提供的比较器进行定制排序。你可以通过实现 [Comparable](https://javabetter.cn/basic-extra-meal/comparable-omparator.html) 接口来定义自然排序。

当需要根据优先级来执行任务时，PriorityBlockingQueue 会非常有用。下面的代码演示了如何使用 PriorityBlockingQueue 来管理具有不同优先级的任务。

```java
class Task implements Comparable<Task> {
    private int priority;
    private String name;

    public Task(int priority, String name) {
        this.priority = priority;
        this.name = name;
    }

    public int compareTo(Task other) {
        return Integer.compare(other.priority, this.priority); // higher values have higher priority
    }

    public String getName() {
        return name;
    }
}

public class PriorityBlockingQueueDemo {
    public static void main(String[] args) throws InterruptedException {
        PriorityBlockingQueue<Task> queue = new PriorityBlockingQueue<>();
        queue.put(new Task(1, "Low priority task"));
        queue.put(new Task(50, "High priority task"));
        queue.put(new Task(10, "Medium priority task"));

        while (!queue.isEmpty()) {
            System.out.println(queue.take().getName());
        }
    }
}
```

上例创建了一个优先级阻塞队列，并添加了三个具有不同优先级的任务。它们会按优先级从高到低的顺序被取出并打印。运行结果如下：

```
High priority task
Medium priority task
Low priority task
```

## SynchronousQueue

SynchronousQueue 是一个非常特殊的阻塞队列，它不存储任何元素。每一个插入操作必须等待另一个线程的移除操作，反之亦然。因此，SynchronousQueue 的内部实际上是空的，但它允许一个线程向另一个线程逐个传输元素。

SynchronousQueue 允许线程直接将元素交付给另一个线程。因此，如果一个线程尝试插入一个元素，并且有另一个线程尝试移除一个元素，则插入和移除操作将同时成功。

如果想让一个线程将确切的信息直接发送给另一个线程的情况下，可以使用 SynchronousQueue。下面的代码展示了如何使用 SynchronousQueue 进行线程间的通信：

```java
public class SynchronousQueueDemo {
    public static void main(String[] args) {
        SynchronousQueue<String> queue = new SynchronousQueue<>();

        // Producer Thread
        new Thread(() -> {
            try {
                String event = "SYNCHRONOUS_EVENT";
                System.out.println("Putting: " + event);
                queue.put(event);
                System.out.println("Put successfully: " + event);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }).start();

        // Consumer Thread
        new Thread(() -> {
            try {
                String event = queue.take();
                System.out.println("Taken: " + event);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }).start();
    }
}
```

上例创建了一个 SynchronousQueue，并在一个线程中插入了一个元素，另一个线程中移除了这个元素。运行结果如下：

```
Putting: SYNCHRONOUS_EVENT
Put successfully: SYNCHRONOUS_EVENT
Taken: SYNCHRONOUS_EVENT
```

## LinkedTransferQueue

LinkedTransferQueue 是一个基于链表结构的无界传输队列，实现了 TransferQueue 接口，它提供了一种强大的线程间交流机制。它的功能与其他阻塞队列类似，但还包括“转移”语义：允许一个元素直接从生产者传输给消费者，如果消费者已经在等待。如果没有等待的消费者，元素将入队。

常用方法有两个：

- `transfer(E e)`，将元素转移到等待的消费者，如果不存在等待的消费者，则元素会入队并阻塞直到该元素被消费。
- `tryTransfer(E e)`，尝试立即转移元素，如果有消费者正在等待，则传输成功；否则，返回 false。

如果想要更紧密地控制生产者和消费者之间的交互，可以使用 LinkedTransferQueue。

```java
public class LinkedTransferQueueDemo {
    public static void main(String[] args) throws InterruptedException {
        LinkedTransferQueue<String> queue = new LinkedTransferQueue<>();

        // Consumer Thread
        new Thread(() -> {
            try {
                System.out.println("消费者正在等待获取元素...");
                String element = queue.take();
                System.out.println("消费者收到: " + element);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }).start();

        // Let consumer thread start first
        TimeUnit.SECONDS.sleep(1);

        // Producer Thread
        System.out.println("生产者正在传输元素");
        queue.transfer("Hello, World!");

        System.out.println("生产者已转移元素");
    }
}
```

消费者线程首先启动并等待接收元素。生产者线程调用 transfer 方法将元素直接传输给消费者。

运行结果如下：

```
消费者正在等待获取元素...
生产者正在传输元素
生产者已转移元素
消费者收到: Hello, World!
```

## LinkedBlockingDeque

LinkedBlockingDeque 是一个基于链表结构的双端阻塞队列。它同时支持从队列头部插入和移除元素，也支持从队列尾部插入和移除元素。因此，LinkedBlockingDeque 可以作为 FIFO 队列或 LIFO 队列来使用。

常用方法有：

- `addFirst(E e)`, `addLast(E e)`: 在队列的开头/结尾添加元素。
- `takeFirst()`, `takeLast()`: 从队列的开头/结尾移除和返回元素，如果队列为空，则等待。
- `putFirst(E e)`, `putLast(E e)`: 在队列的开头/结尾插入元素，如果队列已满，则等待。
- `pollFirst(long timeout, TimeUnit unit)`, `pollLast(long timeout, TimeUnit unit)`: 在队列的开头/结尾移除和返回元素，如果队列为空，则等待指定的超时时间。

使用示例：

```java
public class LinkedBlockingDequeDemo {
    public static void main(String[] args) throws InterruptedException {
        LinkedBlockingDeque<String> deque = new LinkedBlockingDeque<>(10);

        // Adding elements at the end of the deque
        deque.putLast("Item1");
        deque.putLast("Item2");

        // Adding elements at the beginning of the deque
        deque.putFirst("Item3");

        // Removing elements from the beginning
        System.out.println(deque.takeFirst()); // Output: Item3

        // Removing elements from the end
        System.out.println(deque.takeLast()); // Output: Item2
    }
}
```

运行结果如下：

```
Item3
Item2
```

## DelayQueue

DelayQueue 是一个无界阻塞队列，用于存放实现了 Delayed 接口的元素，这些元素只能在其到期时才能从队列中取走。这使得 DelayQueue 成为实现时间基于优先级的调度服务的理想选择。

下面的示例展示了如何使用 DelayQueue。

```java
public class DelayQueueDemo {
    public static void main(String[] args) {
        DelayQueue<DelayedElement> queue = new DelayQueue<>();

        // 将带有5秒延迟的元素放入队列
        queue.put(new DelayedElement(5000, "这是一个 5 秒延迟的元素"));

        try {
            System.out.println("取一个元素...");
            // take() 将阻塞，直到延迟到期
            DelayedElement element = queue.take();
            System.out.println(element.getMessage());
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    static class DelayedElement implements Delayed {
        private final long delayUntil;
        private final String message;

        public DelayedElement(long delayInMillis, String message) {
            this.delayUntil = System.currentTimeMillis() + delayInMillis;
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        @Override
        public long getDelay(TimeUnit unit) {
            return unit.convert(delayUntil - System.currentTimeMillis(), TimeUnit.MILLISECONDS);
        }

        @Override
        public int compareTo(Delayed o) {
            return Long.compare(this.delayUntil, ((DelayedElement) o).delayUntil);
        }
    }
}
```

上例创建了一个 DelayQueue，并将一个带有 5 秒延迟的元素放入队列。然后，它调用 `take()` 方法从队列中取出元素。由于元素的延迟时间为 5 秒，因此 `take()` 方法将阻塞 5 秒，直到元素到期。运行结果如下：

```
取一个元素...
这是一个 5 秒延迟的元素
```

## 小结

本文介绍了 Java 中的阻塞队列，包括 ArrayBlockingQueue、LinkedBlockingQueue、PriorityBlockingQueue、SynchronousQueue、LinkedTransferQueue、LinkedBlockingDeque 和 DelayQueue。它们都是线程安全的，可以在多线程环境下使用。

阻塞队列是一个非常有用的工具，可以用于实现生产者-消费者模式，或者在多线程环境下进行线程间通信。它们还可以用于实现线程池和其他数据结构，如优先级队列、延迟队列等。

阻塞队列的实现原理是使用 [Condition](https://javabetter.cn/thread/condition.html) 通知机制，当队列为空时，消费者线程将被阻塞，直到队列中有数据可供消费。当队列已满时，生产者线程将被阻塞，直到队列有可用空间。

阻塞队列是 Java 并发编程中的一个重要概念，它在多线程编程中有着广泛的应用。因此，我们应该熟悉它们的使用方法和实现原理。

> 编辑：沉默王二，部分内容来自于CL0610的 GitHub 仓库[https://github.com/CL0610/Java-concurrency](https://github.com/CL0610/Java-concurrency/blob/master/19.%E5%B9%B6%E5%8F%91%E5%AE%B9%E5%99%A8%E4%B9%8BBlockingQueue/%E5%B9%B6%E5%8F%91%E5%AE%B9%E5%99%A8%E4%B9%8BBlockingQueue.md)。

---

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第二份 PDF 《[并发编程小册](https://javabetter.cn/thread/)》终于来了！包括线程的基本概念和使用方法、Java的内存模型、sychronized、volatile、CAS、AQS、ReentrantLock、线程池、并发容器、ThreadLocal、生产者消费者模型等面试和开发必须掌握的内容，共计 15 万余字，200+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，二哥的并发编程进阶之路.pdf](https://javabetter.cn/thread/)

[加入二哥的编程星球](https://javabetter.cn/thread/)，在星球的第二个置顶帖「[知识图谱](https://javabetter.cn/thread/)」里就可以获取 PDF 版本。

![](https://cdn.tobebetterjavaer.com/stutymore/wangzhe-thread-20230904125125.png)
