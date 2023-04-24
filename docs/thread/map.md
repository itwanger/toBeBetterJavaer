---
title: 简单聊聊Java的并发集合容器
shortTitle: 简单聊聊Java的并发集合容器
description: 简单聊聊Java的并发集合容器
category:
  - Java核心
tag:
  - Java并发编程
head:
  - - meta
    - name: keywords
      content: Java,并发编程,多线程,Thread,并发集合容器
---

# 简单聊聊Java的并发集合容器

## 同步容器与并发容器

我们知道在java.util包下提供了一些容器类，而Vector和Hashtable是线程安全的容器类，但是这些容器实现同步的方式是通过对方法加锁(sychronized)方式实现的，这样读写均需要锁操作，导致性能低下。

而即使是Vector这样线程安全的类，在面对多线程下的复合操作的时候也是需要通过客户端加锁的方式保证原子性。如下面例子说明:

```java
public class TestVector {
	private Vector<String> vector;

	//方法一
	public  Object getLast(Vector vector) {
	    int lastIndex = vector.size() - 1;
	    return vector.get(lastIndex);
	}
	
	//方法二
	public  void deleteLast(Vector vector) {
	    int lastIndex = vector.size() - 1;
	    vector.remove(lastIndex);
	}
	
	//方法三
	public  Object getLastSysnchronized(Vector vector) {
		synchronized(vector){
			int lastIndex = vector.size() - 1;
			return vector.get(lastIndex);
		}
	}

	//方法四
	public  void deleteLastSysnchronized(Vector vector) {
		synchronized (vector){
			int lastIndex = vector.size() - 1;
			vector.remove(lastIndex);
		}
	}
	
}
```
如果方法一和方法二为一个组合的话。那么当方法一获取到了`vector`的size之后，方法二已经执行完毕，这样就导致程序的错误。

如果方法三与方法四组合的话。通过锁机制保证了在`vector`上的操作的原子性。

并发容器是Java 5 提供的在多线程编程下用于代替同步容器，针对不同的应用场景进行设计，提高容器的并发访问性，同时定义了线程安全的复合操作。

## 并发容器类介绍

整体架构(列举常用的容器类)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/map-a6a020a3-4573-4cf8-b5ae-1541ae45801c.png)


下面分别介绍一些常用的并发容器类和接口，因篇幅原因，这里只介绍这些类的用途和基本的原理，不做过多的源码解析。

## 并发Map

### ConcurrentMap接口

ConcurrentMap接口继承了Map接口，在Map接口的基础上又定义了四个方法：

```java
public interface ConcurrentMap<K, V> extends Map<K, V> {

    //插入元素
    V putIfAbsent(K key, V value);

    //移除元素
    boolean remove(Object key, Object value);

    //替换元素
    boolean replace(K key, V oldValue, V newValue);

    //替换元素
    V replace(K key, V value);
    
}
```

**putIfAbsent：** 与原有put方法不同的是，putIfAbsent方法中如果插入的key相同，则不替换原有的value值；

**remove：** 与原有remove方法不同的是，新remove方法中增加了对value的判断，如果要删除的key-value不能与Map中原有的key-value对应上，则不会删除该元素;

**replace(K,V,V)：** 增加了对value值的判断，如果key-oldValue能与Map中原有的key-value对应上，才进行替换操作；

**replace(K,V)：** 与上面的replace不同的是，此replace不会对Map中原有的key-value进行比较，如果key存在则直接替换；

#### ConcurrentHashMap类

ConcurrentHashMap同HashMap一样也是基于散列表的map，但是它提供了一种与Hashtable完全不同的加锁策略，提供更高效的并发性和伸缩性。

ConcurrentHashMap在JDK 1.7 和JDK 1.8中有一些区别。这里我们分开介绍一下。

**JDK 1.7**

ConcurrentHashMap在JDK 1.7中，提供了一种粒度更细的加锁机制来实现在多线程下更高的性能，这种机制叫分段锁(Lock Striping)。

提供的优点是：在并发环境下将实现更高的吞吐量，而在单线程环境下只损失非常小的性能。

可以这样理解分段锁，就是**将数据分段，对每一段数据分配一把锁**。当一个线程占用锁访问其中一个段数据的时候，其他段的数据也能被其他线程访问。

有些方法需要跨段，比如size()、isEmpty()、containsValue()，它们可能需要锁定整个表而不仅仅是某个段，这需要按顺序锁定所有段，操作完毕后，又按顺序释放所有段的锁。如下图：

![分段锁机制](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/map-3d991ca1-5d58-465c-b097-ffaf6c31f3bc.png)

ConcurrentHashMap是由Segment数组结构和HashEntry数组结构组成。Segment是一种可重入锁ReentrantLock，HashEntry则用于存储键值对数据。

一个ConcurrentHashMap里包含一个Segment数组，Segment的结构和HashMap类似，是一种数组和链表结构， 一个Segment里包含一个HashEntry数组，每个HashEntry是一个链表结构的元素， 每个Segment守护着一个HashEntry数组里的元素，当对HashEntry数组的数据进行修改时，必须首先获得它对应的Segment锁。

**JDK 1.8**

而在JDK 1.8中，ConcurrentHashMap主要做了两个优化：

- 同HashMap一样，链表也会在长度达到8的时候转化为红黑树，这样可以提升大量冲突时候的查询效率；
- 以某个位置的头结点（链表的头结点或红黑树的root结点）为锁，配合自旋+CAS避免不必要的锁开销，进一步提升并发性能。

### ConcurrentNavigableMap接口与ConcurrentSkipListMap类

ConcurrentNavigableMap接口继承了NavigableMap接口，这个接口提供了针对给定搜索目标返回最接近匹配项的导航方法。

ConcurrentNavigableMap接口的主要实现类是ConcurrentSkipListMap类。从名字上来看，它的底层使用的是跳表（SkipList）的数据结构。关于跳表的数据结构这里不做太多介绍，它是一种”空间换时间“的数据结构，可以使用CAS来保证并发安全性。

## 并发Queue

JDK并没有提供线程安全的List类，因为对List来说，**很难去开发一个通用并且没有并发瓶颈的线程安全的List**。因为即使简单的读操作，拿contains() 这样一个操作来说，很难想到搜索的时候如何避免锁住整个list。

所以退一步，JDK提供了对队列和双端队列的线程安全的类：ConcurrentLinkedQueue和ConcurrentLinkedDeque。因为队列相对于List来说，有更多的限制。这两个类是使用CAS来实现线程安全的。

## 并发Set

JDK提供了ConcurrentSkipListSet，是线程安全的有序的集合。底层是使用ConcurrentSkipListMap实现。

谷歌的guava框架实现了一个线程安全的ConcurrentHashSet：

```java
Set<String> s = Sets.newConcurrentHashSet();
```

## 阻塞队列

### 阻塞队列的由来 

我们假设一种场景，生产者一直生产资源，消费者一直消费资源，资源存储在一个缓冲池中，生产者将生产的资源存进缓冲池中，消费者从缓冲池中拿到资源进行消费，这就是大名鼎鼎的**生产者-消费者模式**。

该模式能够简化开发过程，一方面消除了生产者类与消费者类之间的代码依赖性，另一方面将生产数据的过程与使用数据的过程解耦简化负载。

我们自己coding实现这个模式的时候，因为需要让**多个线程操作共享变量**（即资源），所以很容易引发**线程安全问题**，造成**重复消费**和**死锁**，尤其是生产者和消费者存在多个的情况。另外，当缓冲池空了，我们需要阻塞消费者，唤醒生产者；当缓冲池满了，我们需要阻塞生产者，唤醒消费者，这些个**等待-唤醒**逻辑都需要自己实现。（这块不明白的同学，可以看最下方结语部分的链接）

这么容易出错的事情，JDK当然帮我们做啦，这就是阻塞队列(BlockingQueue)，**你只管往里面存、取就行，而不用担心多线程环境下存、取共享变量的线程安全问题。**

> BlockingQueue是Java util.concurrent包下重要的数据结构，区别于普通的队列，BlockingQueue提供了**线程安全的队列访问方式**，并发包下很多高级同步类的实现都是基于BlockingQueue实现的。

BlockingQueue一般用于生产者-消费者模式，生产者是往队列里添加元素的线程，消费者是从队列里拿元素的线程。**BlockingQueue就是存放元素的容器**。


### BlockingQueue的操作方法

阻塞队列提供了四组不同的方法用于插入、移除、检查元素：

| 方法\处理方式 | 抛出异常  | 返回特殊值 |  一直阻塞  |      超时退出      |
| :-----------: | :-------: | :--------: | :--------: | :----------------: |
|   插入方法    |  add(e)   |  offer(e)  | **put(e)** | offer(e,time,unit) |
|   移除方法    | remove()  |   poll()   | **take()** |  poll(time,unit)   |
|   检查方法    | element() |   peek()   |     -      |         -          |

- 抛出异常：如果试图的操作无法立即执行，抛异常。当阻塞队列满时候，再往队列里插入元素，会抛出IllegalStateException(“Queue full”)异常。当队列为空时，从队列里获取元素时会抛出NoSuchElementException异常 。
- 返回特殊值：如果试图的操作无法立即执行，返回一个特殊值，通常是true / false。
- 一直阻塞：如果试图的操作无法立即执行，则一直阻塞或者响应中断。
- 超时退出：如果试图的操作无法立即执行，该方法调用将会发生阻塞，直到能够执行，但等待时间不会超过给定值。返回一个特定值以告知该操作是否成功，通常是 true / false。 

**注意之处**

* 不能往阻塞队列中插入null,会抛出空指针异常。
* 可以访问阻塞队列中的任意元素，调用remove(o)可以将队列之中的特定对象移除，但并不高效，尽量避免使用。

### BlockingQueue的实现类

**ArrayBlockingQueue**

   由**数组**结构组成的**有界**阻塞队列。内部结构是数组，故具有数组的特性。

   ```java
public ArrayBlockingQueue(int capacity, boolean fair){
    //..省略代码
}
   ```

   可以初始化队列大小， 且一旦初始化不能改变。构造方法中的fair表示控制对象的内部锁是否采用公平锁，默认是**非公平锁**。

**LinkedBlockingQueue**

   由**链表**结构组成的**有界**阻塞队列。内部结构是链表，具有链表的特性。默认队列的大小是```Integer.MAX_VALUE```，也可以指定大小。此队列按照**先进先出**的原则对元素进行排序。

**DelayQueue**

    该队列中的元素只有当其指定的延迟时间到了，才能够从队列中获取到该元素 。注入其中的元素必须实现 java.util.concurrent.Delayed 接口。 
    
    DelayQueue是一个没有大小限制的队列，因此往队列中插入数据的操作（生产者）永远不会被阻塞，而只有获取数据的操作（消费者）才会被阻塞。 

**PriorityBlockingQueue** 

    基于优先级的无界阻塞队列（优先级的判断通过构造函数传入的Compator对象来决定），内部控制线程同步的锁采用的是非公平锁。

> 网上大部分博客上**PriorityBlockingQueue**为公平锁，其实是不对的，查阅源码（感谢github:**ambition0802**同学的指出）：

 ```java
public PriorityBlockingQueue(int initialCapacity,
                                  Comparator<? super E> comparator) {
         this.lock = new ReentrantLock(); //默认构造方法-非公平锁
         ...//其余代码略
     }
```

**SynchronousQueue**

   这个队列比较特殊，**没有任何内部容量**，甚至连一个队列的容量都没有。并且每个 put 必须等待一个 take，反之亦然。

   需要区别容量为1的ArrayBlockingQueue、LinkedBlockingQueue。

   以下方法的返回值，可以帮助理解这个队列：

   - iterator() 永远返回空，因为里面没有东西
   - peek() 永远返回null
   - put() 往queue放进去一个element以后就一直wait直到有其他thread进来把这个element取走。
   - offer() 往queue里放一个element后立即返回，如果碰巧这个element被另一个thread取走了，offer方法返回true，认为offer成功；否则返回false。
   - take() 取出并且remove掉queue里的element，取不到东西他会一直等。
   - poll() 取出并且remove掉queue里的element，只有到碰巧另外一个线程正在往queue里offer数据或者put数据的时候，该方法才会取到东西。否则立即返回null。
   - isEmpty() 永远返回true
   - remove()&removeAll() 永远返回false

**注意**

**PriorityBlockingQueue**不会阻塞数据生产者（因为队列是无界的），而只会在没有可消费的数据时，阻塞数据的消费者。因此使用的时候要特别注意，**生产者生产数据的速度绝对不能快于消费者消费数据的速度，否则时间一长，会最终耗尽所有的可用堆内存空间。**对于使用默认大小的**LinkedBlockingQueue**也是一样的。 

### 阻塞队列的原理

阻塞队列的原理很简单，利用了Lock锁的多条件（Condition）阻塞控制。接下来我们分析ArrayBlockingQueue JDK 1.8 的源码。

首先是构造器，除了初始化队列的大小和是否是公平锁之外，还对同一个锁（lock）初始化了两个监视器，分别是notEmpty和notFull。这两个监视器的作用目前可以简单理解为标记分组，当该线程是put操作时，给他加上监视器notFull,标记这个线程是一个生产者；当线程是take操作时，给他加上监视器notEmpty，标记这个线程是消费者。

```java
//数据元素数组
final Object[] items;
//下一个待取出元素索引
int takeIndex;
//下一个待添加元素索引
int putIndex;
//元素个数
int count;
//内部锁
final ReentrantLock lock;
//消费者监视器
private final Condition notEmpty;
//生产者监视器
private final Condition notFull;  

public ArrayBlockingQueue(int capacity, boolean fair) {
    //..省略其他代码
    lock = new ReentrantLock(fair);
    notEmpty = lock.newCondition();
    notFull =  lock.newCondition();
}
```

**put操作的源码**

```java
public void put(E e) throws InterruptedException {
    checkNotNull(e);
    final ReentrantLock lock = this.lock;
    // 1.自旋拿锁
    lock.lockInterruptibly();
    try {
        // 2.判断队列是否满了
        while (count == items.length)
            // 2.1如果满了，阻塞该线程，并标记为notFull线程，
            // 等待notFull的唤醒，唤醒之后继续执行while循环。
            notFull.await();
        // 3.如果没有满，则进入队列
        enqueue(e);
    } finally {
        lock.unlock();
    }
}
private void enqueue(E x) {
    // assert lock.getHoldCount() == 1;
    // assert items[putIndex] == null;
    final Object[] items = this.items;
    items[putIndex] = x;
    if (++putIndex == items.length)
        putIndex = 0;
    count++;
    // 4 唤醒一个等待的线程
    notEmpty.signal();
}

```

总结put的流程：

1. 所有执行put操作的线程竞争lock锁，拿到了lock锁的线程进入下一步，没有拿到lock锁的线程自旋竞争锁。
2. 判断阻塞队列是否满了，如果满了，则调用await方法阻塞这个线程，并标记为notFull（生产者）线程，同时释放lock锁,等待被消费者线程唤醒。
3. 如果没有满，则调用enqueue方法将元素put进阻塞队列。注意这一步的线程还有一种情况是第二步中阻塞的线程被唤醒且又拿到了lock锁的线程。
4. 唤醒一个标记为notEmpty（消费者）的线程。

**take操作的源码**

```java
public E take() throws InterruptedException {
    final ReentrantLock lock = this.lock;
    lock.lockInterruptibly();
    try {
        while (count == 0)
            notEmpty.await();
        return dequeue();
    } finally {
        lock.unlock();
    }
}
private E dequeue() {
    // assert lock.getHoldCount() == 1;
    // assert items[takeIndex] != null;
    final Object[] items = this.items;
    @SuppressWarnings("unchecked")
    E x = (E) items[takeIndex];
    items[takeIndex] = null;
    if (++takeIndex == items.length)
        takeIndex = 0;
    count--;
    if (itrs != null)
        itrs.elementDequeued();
    notFull.signal();
    return x;
}
```

take操作和put操作的流程是类似的，总结一下take操作的流程：

1. 所有执行take操作的线程竞争lock锁，拿到了lock锁的线程进入下一步，没有拿到lock锁的线程自旋竞争锁。
2. 判断阻塞队列是否为空，如果是空，则调用await方法阻塞这个线程，并标记为notEmpty（消费者）线程，同时释放lock锁,等待被生产者线程唤醒。
3. 如果没有空，则调用dequeue方法。注意这一步的线程还有一种情况是第二步中阻塞的线程被唤醒且又拿到了lock锁的线程。
4. 唤醒一个标记为notFull（生产者）的线程。

**注意**

1. put和take操作都需要**先获取锁**，没有获取到锁的线程会被挡在第一道大门之外自旋拿锁，直到获取到锁。
2. 就算拿到锁了之后，也**不一定**会顺利进行put/take操作，需要判断**队列是否可用**（是否满/空），如果不可用，则会被阻塞，**并释放锁**。
3. 在第2点被阻塞的线程会被唤醒，但是在唤醒之后，**依然需要拿到锁**才能继续往下执行，否则，自旋拿锁，拿到锁了再while判断队列是否可用（这也是为什么不用if判断，而使用while判断的原因）。

### 示例和使用场景

#### 生产者-消费者模型

```java
public class Test {
    private int queueSize = 10;
    private ArrayBlockingQueue<Integer> queue = new ArrayBlockingQueue<Integer>(queueSize);
     
    public static void main(String[] args)  {
        Test test = new Test();
        Producer producer = test.new Producer();
        Consumer consumer = test.new Consumer();
         
        producer.start();
        consumer.start();
    }
     
    class Consumer extends Thread{
         
        @Override
        public void run() {
            consume();
        }
         
        private void consume() {
            while(true){
                try {
                    queue.take();
                    System.out.println("从队列取走一个元素，队列剩余"+queue.size()+"个元素");
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }
     
    class Producer extends Thread{
         
        @Override
        public void run() {
            produce();
        }
         
        private void produce() {
            while(true){
                try {
                    queue.put(1);
                    System.out.println("向队列取中插入一个元素，队列剩余空间："+(queueSize-queue.size()));
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
```

下面是这个例子的输出片段：

```
从队列取走一个元素，队列剩余0个元素
从队列取走一个元素，队列剩余0个元素
向队列取中插入一个元素，队列剩余空间：9
向队列取中插入一个元素，队列剩余空间：9
向队列取中插入一个元素，队列剩余空间：9
向队列取中插入一个元素，队列剩余空间：8
向队列取中插入一个元素，队列剩余空间：7
向队列取中插入一个元素，队列剩余空间：6
向队列取中插入一个元素，队列剩余空间：5
向队列取中插入一个元素，队列剩余空间：4
向队列取中插入一个元素，队列剩余空间：3
向队列取中插入一个元素，队列剩余空间：2
向队列取中插入一个元素，队列剩余空间：1
向队列取中插入一个元素，队列剩余空间：0
从队列取走一个元素，队列剩余1个元素
从队列取走一个元素，队列剩余9个元素
```

注意，这个例子中的输出结果看起来可能有问题，比如有几行在插入一个元素之后，队列的剩余空间不变。这是由于**System.out.println语句没有锁**。考虑到这样的情况：线程1在执行完put/take操作后立即失去CPU时间片，然后切换到线程2执行put/take操作，执行完毕后回到线程1的System.out.println语句并输出，发现这个时候阻塞队列的size已经被线程2改变了，所以这个时候输出的size并不是当时线程1执行完put/take操作之后阻塞队列的size，但可以确保的是size不会超过10个。实际上使用阻塞队列是没有问题的。

#### 线程池中使用阻塞队列

```java
 public ThreadPoolExecutor(int corePoolSize,
                           int maximumPoolSize,
                           long keepAliveTime,
                           TimeUnit unit,
                           BlockingQueue<Runnable> workQueue) {
        this(corePoolSize, maximumPoolSize, keepAliveTime, unit, workQueue,
             Executors.defaultThreadFactory(), defaultHandler);
}
```

Java中的线程池就是使用阻塞队列实现的，我们在了解阻塞队列之后，无论是使用Executors类中已经提供的线程池，还是自己通过ThreadPoolExecutor实现线程池，都会更加得心应手。

>  注：上面提到了生产者-消费者模式，大家可以参考[生产者-消费者模型](http://note.youdao.com/noteshare?id=b4babef5d090f87cea8a97632f380c00)，可以更好的理解阻塞队列。

## CopyOnWrite容器

### 什么是CopyOnWrite容器
在说到CopyOnWrite容器之前我们先来谈谈什么是CopyOnWrite机制，CopyOnWrite是计算机设计领域中的一种优化策略，也是一种在并发场景下常用的设计思想——写入时复制思想。

那什么是写入时复制思想呢？就是当有多个调用者同时去请求一个资源数据的时候，有一个调用者出于某些原因需要对当前的数据源进行修改，这个时候系统将会复制一个当前数据源的副本给调用者修改。	

CopyOnWrite容器即**写时复制的容器**,当我们往一个容器中添加元素的时候，不直接往容器中添加，而是将当前容器进行copy，复制出来一个新的容器，然后向新容器中添加我们需要的元素，最后将原容器的引用指向新容器。

这样做的好处在于，我们可以在并发的场景下对容器进行"读操作"而不需要"加锁"，从而达到读写分离的目的。从JDK 1.5 开始Java并发包里提供了两个使用CopyOnWrite机制实现的并发容器 ，分别是CopyOnWriteArrayList和CopyOnWriteArraySet 。我们着重给大家介绍一下CopyOnWriteArrayList。

### CopyOnWriteArrayList
**优点**：
CopyOnWriteArrayList经常被用于“读多写少”的并发场景，是因为CopyOnWriteArrayList无需任何同步措施，大大增强了读的性能。在Java中遍历线程非安全的List(如：ArrayList和 LinkedList)的时候，若中途有别的线程对List容器进行修改，那么会抛出ConcurrentModificationException异常。CopyOnWriteArrayList由于其"读写分离"，遍历和修改操作分别作用在不同的List容器，所以在使用迭代器遍历的时候，则不会抛出异常。

**缺点**：
第一个缺点是CopyOnWriteArrayList每次执行写操作都会将原容器进行拷贝一份，数据量大的时候，内存会存在较大的压力，可能会引起频繁Full GC（ZGC因为没有使用Full GC）。比如这些对象占用的内存200M左右，那么再写入100M数据进去，内存就会多占用300M。

第二个缺点是CopyOnWriteArrayList由于实现的原因，写和读分别作用在不同新老容器上，在写操作执行过程中，读不会阻塞，但读取到的却是老容器的数据。

现在我们来看一下CopyOnWriteArrayList的add操作源码，它的逻辑很清晰，就是先把原容器进行copy，然后在新的副本上进行“写操作”，最后再切换引用，在此过程中是加了锁的。

~~~java
public boolean add(E e) {
   
    // ReentrantLock加锁，保证线程安全
    final ReentrantLock lock = this.lock;
    lock.lock();
    try {
        Object[] elements = getArray();
        int len = elements.length;
        // 拷贝原容器，长度为原容器长度加一
        Object[] newElements = Arrays.copyOf(elements, len + 1);
        // 在新副本上执行添加操作
        newElements[len] = e;
        // 将原容器引用指向新副本
        setArray(newElements);
        return true;
    } finally {
        // 解锁
        lock.unlock();
    }
}
~~~
我们再来看一下remove操作的源码，remove的逻辑是将要remove元素之外的其他元素拷贝到新的副本中，然后再将原容器的引用指向新的副本中，因为remove操作也是“写操作”所以也是要加锁的。 
~~~java
public E remove(int index) {
        
        // 加锁
        final ReentrantLock lock = this.lock;
        lock.lock();
        try {
            Object[] elements = getArray();
            int len = elements.length;
            E oldValue = get(elements, index);
            int numMoved = len - index - 1;
            if (numMoved == 0)
                // 如果要删除的是列表末端数据，拷贝前len-1个数据到新副本上，再切换引用
                setArray(Arrays.copyOf(elements, len - 1));
            else {
                // 否则，将要删除元素之外的其他元素拷贝到新副本中，并切换引用
                Object[] newElements = new Object[len - 1];
                System.arraycopy(elements, 0, newElements, 0, index);
                System.arraycopy(elements, index + 1, newElements, index,
                                 numMoved);
                setArray(newElements);
            }
            return oldValue;
        } finally {
            // 解锁
            lock.unlock();
        }
    }
~~~
我们再来看看CopyOnWriteArrayList效率最高的读操作的源码
~~~java
public E get(int index) {
    return get(getArray(), index);
}
~~~
~~~java
 private E get(Object[] a, int index) {
     return (E) a[index];
 }
~~~
由上可见“读操作”是没有加锁，直接读取。

### CopyOnWrite的业务中实现


接下来，我们结合具体业务场景来实现一个CopyOnWriteMap的并发容器并且使用它。

~~~java
import java.util.Collection;
import java.util.Map;
import java.util.Set;

public class CopyOnWriteMap<K, V> implements Map<K, V>, Cloneable {
    private volatile Map<K, V> internalMap;

    public CopyOnWriteMap() {
        internalMap = new HashMap<K, V>();
    }

    public V put(K key, V value) {
        synchronized (this) {
            Map<K, V> newMap = new HashMap<K, V>(internalMap);
            V val = newMap.put(key, value);
            internalMap = newMap;
            return val;
        }
    }

    public V get(Object key) {
        return internalMap.get(key);
    }

    public void putAll(Map<? extends K, ? extends V> newData) {
        synchronized (this) {
            Map<K, V> newMap = new HashMap<K, V>(internalMap);
            newMap.putAll(newData);
            internalMap = newMap;
        }
    }
}
~~~
上面就是参考CopyOnWriteArrayList实现的CopyOnWriteMap，我们可以用这个容器来做什么呢？结合我们之前说的CopyOnWrite的复制思想，它最适用于“读多写少”的并发场景。

**场景：** 假如我们有一个搜索的网站需要屏蔽一些“关键字”，“黑名单”每晚定时更新，每当用户搜索的时候，“黑名单”中的关键字不会出现在搜索结果当中，并且提示用户敏感字。

~~~java
// 黑名单服务
public class BlackListServiceImpl {
    //　减少扩容开销。根据实际需要，初始化CopyOnWriteMap的大小，避免写时CopyOnWriteMap扩容的开销。
    private static CopyOnWriteMap<String, Boolean> blackListMap = 
        new CopyOnWriteMap<String, Boolean>(1000);

    public static boolean isBlackList(String id) {
        return blackListMap.get(id) == null ? false : true;
    }

    public static void addBlackList(String id) {
        blackListMap.put(id, Boolean.TRUE);
    }

    /**
     * 批量添加黑名单
     * (使用批量添加。因为每次添加，容器每次都会进行复制，所以减少添加次数，可以减少容器的复制次数。
     * 如使用上面代码里的addBlackList方法)
     * @param ids
     */
    public static void addBlackList(Map<String,Boolean> ids) {
        blackListMap.putAll(ids);
    }

}
~~~
这里需要各位小伙伴特别特别注意一个问题，此处的场景是每晚凌晨“黑名单”定时更新，原因是CopyOnWrite容器有**数据一致性**的问题，它只能保证**最终数据一致性**。

所以如果我们希望写入的数据马上能准确地读取，请不要使用CopyOnWrite容器。

---

>编辑：沉默王二，内容大部分来源以下三个开源仓库：
>- [深入浅出 Java 多线程](http://concurrent.redspider.group/)
>- [并发编程知识总结](https://github.com/CL0610/Java-concurrency)
>- [Java八股文](https://github.com/CoderLeixiaoshuai/java-eight-part)

----

GitHub 上标星 7600+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 7600+ 的 Java 教程](https://tobebetterjavaer.com/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
