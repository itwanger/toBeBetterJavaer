---
title: 锁分类以及 JUC 包下的锁介绍，一网打尽
shortTitle: 锁分类和 JUC
description: Java的并发包（java.util.concurrent，简称JUC）提供了许多并发工具类，包括一些用于并发编程的锁。
category:
  - Java核心
tag:
  - Java并发编程
head:
  - - meta
    - name: keywords
      content: Java,并发编程,多线程,Thread,锁,JUC,ReentrantLock,StampedLock,ReadWriteLock,Condition,锁分类
---

# 第十四节：锁分类和 JUC

前面我们介绍了基于对象的原生锁——[synchronized](https://javabetter.cn/thread/synchronized-1.html)，实际上，Java 在`java.util.concurrent`（JUC）包下，还为我们提供了更多的锁类和锁接口（尤其是子包 locks 下），它们有更强大的功能或更牛逼的性能。

来看看`synchronized`的不足之处吧。

- 如果临界区是只读操作，其实可以多线程一起执行，但使用 synchronized 的话，**同一时间只能有一个线程执行**。
- synchronized 无法知道线程有没有成功获取到锁。
- 使用 synchronized，如果临界区因为 IO 或者 sleep 方法等原因阻塞了，而当前线程又没有释放锁，就会导致**所有线程等待**。

>临界区（Critical Section）是多线程中一个 非常重要的概念，指的是在代码中访问共享资源的那部分，且同一时刻只能有一个线程能访问的代码。多个线程同时访问临界区的资源如果没有任何同步（加锁）操作，会导致资源的状态不可预测和不一致，从而产生所谓的“竞态条件”(Race Condition)。在许多并发控制策略中，例如互斥锁 synchronized，目标就是确保任何时候只有一个线程进入临界区。

不过，synchronized 的这些不足之处都可以通过 JUC 包下的其他锁来弥补，下面先来看一下锁的分类吧。

## 锁的几种分类

Java 提供了种类丰富的锁，每种锁因其特性的不同，在适当的场景下能够展现出非常高的效率。我们可以通过特性将锁进行分组归类。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/other-bukfsdjavassmtjstd-b2ded433-defd-4535-b767-fd2e5be0b5b9.png)

### 乐观锁 VS 悲观锁

乐观锁与悲观锁是一种广义上的概念，体现了看待线程同步的不同角度。

先说概念。对于同一个数据的并发操作，悲观锁认为自己在使用数据的时候一定有别的线程来修改数据，因此在获取数据的时候会先加锁，确保数据不会被别的线程修改。Java 中，[synchronized 关键字](https://javabetter.cn/thread/synchronized-1.html) 是最典型的悲观锁。

而乐观锁认为自己在使用数据时不会有别的线程修改数据，所以不会加锁，只是在更新数据的时候会去判断之前有没有别的线程更新了这个数据。如果这个数据没有被更新，当前线程将自己修改的数据写入。如果数据已经被其他线程更新，则根据不同的实现方式执行不同的操作（例如报错或者自动重试）。

乐观锁在 Java 中是通过无锁编程来实现的，最常采用的是[CAS 算法](https://javabetter.cn/thread/cas.html)，[Java 原子类](https://javabetter.cn/thread/atomic.html)的递增操作就通过 CAS 自旋实现的。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/other-bukfsdjavassmtjstd-840de182-83e2-4639-868a-bd5cc984575f.png)

根据上面的概念描述我们可以发现：

- 悲观锁适合写操作多的场景，先加锁可以保证写操作时数据正确。
- 乐观锁适合读操作多的场景，不加锁的特点能够使其读操作的性能大幅提升。

光说概念有些抽象，我们来看下乐观锁和悲观锁的调用方式：

```Java
// --------- 悲观锁的调用方式 -------------------------
// synchronized
public synchronized void testMethod() {
	// 操作同步资源
}
// ReentrantLock
private ReentrantLock lock = new ReentrantLock(); 
// 需要保证多个线程使用的是同一个锁
public void modifyPublicResources() {
	lock.lock();
	// 操作同步资源
	lock.unlock();
}

// --------- 乐观锁的调用方式 -------------------------
private AtomicInteger atomicInteger = new AtomicInteger();  
// 需要保证多个线程使用的是同一个AtomicInteger
atomicInteger.incrementAndGet(); //执行自增1
```

通过调用方式的举例，我们发现悲观锁基本都是在显式的锁定之后再操作同步资源，而乐观锁则直接去操作同步资源。那么，为何乐观锁能够做到不锁定同步资源也可以正确的实现线程同步呢？我们这里再次来温习一下 [“CAS” 的技术原理](https://javabetter.cn/thread/cas.html)，之前也讲过，就当是复习了。

CAS 是一种无锁算法，可以在不使用锁（没有线程被阻塞）的情况下实现多线程之间的变量同步。JUC 包中的[原子类](https://javabetter.cn/thread/atomic.html)（后面会细讲，戳链接直达）就是通过 CAS 实现的乐观锁。

CAS 算法涉及到三个操作数：

- 需要读写的内存值 V。
- 进行比较的值 A。
- 要写入的新值 B。

当且仅当 V 的值等于 A 时，CAS 通过原子方式用新值 B 来更新 V 的值（“比较+更新”整体是一个原子操作），否则不会执行任何操作。一般情况下，“更新”是一个不断重试的操作。

之前提到 JUC 包中的原子类，就是通过 CAS 实现的乐观锁，那么我们进入原子类 AtomicInteger 的源码（后面也会细讲，既然讲到了，这里就过一下吧），来看一下 AtomicInteger 的定义：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/other-bukfsdjavassmtjstd-86e17b45-2993-48df-b7cd-ee86bb15c922.png)

根据定义我们可以看出各属性的作用：

- unsafe： 获取并操作内存的数据。
- valueOffset： 存储 value 在 AtomicInteger 中的偏移量。
- value： 存储 AtomicInteger 的 int 值，该属性需要借助 volatile 关键字保证其在线程间是可见的。

接下来，我们查看 AtomicInteger 的自增方法`incrementAndGet()`，发现自增方法底层调用的是`unsafe.getAndAddInt()`。但是由于 JDK 本身只有 Unsafe.class，通过 class 文件中的参数名，并不能很好地了解方法的作用，所以我们通过 OpenJDK 8 来查看 [Unsafe](https://javabetter.cn/thread/Unsafe.html)（后面也会讲，戳链接直达） 的源码：

```Java
// ------------------------- JDK 8 -------------------------
// AtomicInteger 自增方法
public final int incrementAndGet() {
  return unsafe.getAndAddInt(this, valueOffset, 1) + 1;
}

// Unsafe.class
public final int getAndAddInt(Object var1, long var2, int var4) {
  int var5;
  do {
      var5 = this.getIntVolatile(var1, var2);
  } while(!this.compareAndSwapInt(var1, var2, var5, var5 + var4));
  return var5;
}

// ------------------------- OpenJDK 8 -------------------------
// Unsafe.java
public final int getAndAddInt(Object o, long offset, int delta) {
   int v;
   do {
       v = getIntVolatile(o, offset);
   } while (!compareAndSwapInt(o, offset, v, v + delta));
   return v;
}
```

根据源码我们可以看出，`getAndAddInt()`循环获取给定对象 o 中偏移量处的值 v，然后判断内存值是否等于 v。如果相等则将内存值设置为 v + delta，否则返回 false，继续循环进行重试，直到设置成功才能退出循环，并且将旧值返回。

整个“比较+更新”操作都封装在`compareAndSwapInt()`中，在 JNI 里是借助于一个 CPU 指令完成的，属于原子操作，可以保证多个线程都能够看到同一个变量的修改值。

>Java Native Interface（JNI）是Java与本地代码（如C、C++）之间的 桥梁。它允许Java代码与原生应用程序的接口（API）和本地库进行交互，并获得一些Java不能轻松完成任务的能力。

后续 JDK 通过 CPU 的 cmpxchg 指令去比较寄存器中的 A 和 内存中的值 V。如果相等，就把要写入的新值 B 存入内存中。如果不相等，就将内存值 V 赋值给寄存器中的值 A。然后通过 Java 代码中的 while 循环再次调用 cmpxchg 指令进行重试，直到设置成功为止。

>CMPXCHG是“Compare and Exchange”的缩写，它是一种原子指令，用于在多核/多线程环境中安全地修改共享数据。CMPXCHG在很多现代微处理器体系结构中都有，例如Intel x86/x64体系。对于32位操作数，这个指令通常写作CMPXCHG，而在64位操作数中，它被称为CMPXCHG8B或CMPXCHG16B。

CAS 虽然高效，但也存在三大问题，[我们前面也讲过](https://javabetter.cn/thread/cas.html)，不知道大家还记得不，如果不记得，可以戳链接去回顾一波（dogdogdog）。

### 自旋锁 VS 适应性自旋锁

阻塞或唤醒一个 Java 线程需要操作系统切换 CPU 状态来完成，这种状态转换需要耗费处理器时间。如果同步代码块中的内容过于简单，状态转换消耗的时间有可能比用户代码执行的时间还要长。

在许多场景中，同步资源的锁定时间很短，为了这一小段时间去切换线程，线程挂起和恢复线程花费的时间可能会让系统得不偿失。如果物理机器有多个处理器，能够让两个或以上的线程同时并行执行，我们就可以让后面那个请求锁的线程不放弃 CPU 的执行时间，看看持有锁的线程是否会很快释放锁。

为了让当前线程“稍等一下”，我们需要让当前线程进行自旋，如果在自旋完成后前面锁定同步资源的线程已经释放了锁，那么当前线程就可以不用阻塞而是直接获取同步资源，从而避免切换线程的开销。这就是自旋锁。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/other-bukfsdjavassmtjstd-be0964a8-856a-45c9-ab75-ce9505c2e237.png)

自旋锁本身是有缺点的，它不能代替阻塞。自旋等待虽然避免了线程切换的开销，但它要占用处理器时间。如果锁被占用的时间很短，自旋等待的效果就会非常好。反之，如果锁被占用的时间很长，那么自旋的线程只会白白浪费处理器资源。所以，自旋等待的时间必须要有一定的限度，如果自旋超过了限定次数（默认是 10 次，可以使用`-XX:PreBlockSpin` 来更改）没有成功获得锁，就应当挂起线程。

自旋锁的实现原理同样也是 CAS，AtomicInteger 中调用 unsafe 进行自增操作的源码中的 do-while 循环就是一个自旋操作，如果修改数值失败则通过循环来执行自旋，直至修改成功。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/other-bukfsdjavassmtjstd-0756521c-becf-4657-ab42-1973d74e9c73.png)

自旋锁在 JDK1.4.2 中引入，使用`-XX:+UseSpinning`来开启。JDK 6 中变为默认开启，并且引入了自适应的自旋锁（适应性自旋锁）。

自适应意味着自旋的时间（次数）不再固定，而是由前一次在同一个锁上的自旋时间及锁的拥有者的状态来决定。如果在同一个锁对象上，自旋刚刚成功获得过锁，并且持有锁的线程正在运行中，那么虚拟机就会认为这次自旋也是很有可能再次成功的，进而它将允许自旋等待更长的时间。如果对于某个锁，自旋很少成功获得过，那在以后尝试获取这个锁时将可能省略掉自旋过程，直接阻塞线程，避免浪费处理器资源。

### 无锁偏向锁轻量级锁重量级锁

这四种锁是专门针对 synchronized 的，我们在[synchronized 锁的到底是什么](https://javabetter.cn/thread/synchronized.html)一文中已经详细地介绍过，这里就不再赘述了。

### 可重入锁和非可重入锁

可重入锁又名递归锁，是指同一个线程在外层方法获取锁的时候，再进入该线程的内层方法会自动获取锁（前提：锁的是同一个对象或者 class），不会因为之前已经获取过还没释放而阻塞。Java 中[ReentrantLock](https://javabetter.cn/thread/reentrantLock.html)（后面会细讲，戳链接直达）和[synchronized](https://javabetter.cn/thread/synchronized-1.html)都是可重入锁，可重入锁的一个优点就是可以一定程度避免死锁。下面用示例代码来进行分析：

```Java
public class Widget {
    public synchronized void doSomething() {
        System.out.println("方法1执行...");
        doOthers();
    }

    public synchronized void doOthers() {
        System.out.println("方法2执行...");
    }
}
```

在上面的代码中，类中的两个方法都是被内置锁 synchronized 修饰的，`doSomething()`方法中调用了`doOthers()`方法。因为内置锁是可重入的，所以同一个线程在调用`doOthers()`时可以直接获得当前对象的锁，进入`doOthers()`进行操作。

如果是一个不可重入锁，那么当前线程在调用`doOthers()`之前，需要将执行`doSomething()`时获取当前对象的锁释放掉，实际上该对象锁已经被当前线程所持有，且无法释放。所以此时会出现死锁。

那为什么可重入锁就可以在嵌套调用时自动获得锁呢？

还是打水的例子，有多个人在排队打水，此时管理员允许锁和同一个人的多个水桶绑定。这个人用多个水桶打水时，第一个水桶和锁绑定并打完水之后，第二个水桶也可以直接和锁绑定并开始打水，所有的水桶都打完水之后打水人才会将锁还给管理员。这个人的所有打水流程都能够成功执行，后续等待的人也能够打到水。这就是可重入锁。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/other-bukfsdjavassmtjstd-35dc49bf-87c9-4133-b68f-269fb0508f75.png)

但如果是非可重入锁的话，此时管理员只允许锁和同一个人的一个水桶绑定。第一个水桶和锁绑定打完水之后并不会释放锁，导致第二个水桶不能和锁绑定也无法打水。当前线程出现死锁，整个等待队列中的所有线程都无法被唤醒。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/other-bukfsdjavassmtjstd-08479ca1-5d43-475c-8592-9f183e52cc26.png)

之前我们说过 ReentrantLock 和 synchronized 都是重入锁，那么我们通过重入锁 ReentrantLock 以及非可重入锁 NonReentrantLock 的源码来对比分析一下为什么非可重入锁在重复调用同步资源时会出现死锁。

首先[ReentrantLock](https://javabetter.cn/thread/reentrantLock.html)和 NonReentrantLock 都继承了父类[AQS](https://javabetter.cn/thread/aqs.html)，其父类 AQS 中维护了一个同步状态 status 来计数重入次数，status 初始值为 0。

当线程尝试获取锁时，可重入锁先尝试获取并更新 status 值，如果`status == 0`表示没有其他线程在执行同步代码，则把 status 置为 1，当前线程开始执行。如果`status != 0`，则判断当前线程是否获取到了这个锁，如果是的话执行`status+1`，且当前线程可以再次获取锁。

而非可重入锁是直接获取并尝试更新当前 status 的值，如果`status != 0`的话会导致其获取锁失败，当前线程阻塞。

释放锁时，可重入锁同样会先获取当前 status 的值，在当前线程是持有锁的线程的前提下。如果`status-1 == 0`，则表示当前线程所有重复获取锁的操作都已经执行完毕，然后该线程才会真正释放锁。而非可重入锁则是在确定当前线程是持有锁的线程之后，直接将 status 置为 0，将锁释放。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/other-bukfsdjavassmtjstd-d6e12a34-c889-45e1-83bf-a4d7e36eedde.png)

### 公平锁与非公平锁

这里的“公平”，其实通俗意义来说就是“先来后到”，也就是 FIFO。如果对一个锁来说，先对锁获取请求的线程一定会先被满足，后对锁获取请求的线程后被满足，那这个锁就是公平的。反之，那就是不公平的。

一般情况下，**非公平锁能提升一定的效率。但是非公平锁可能会发生线程饥饿（有一些线程长时间得不到锁）的情况**。所以要根据实际的需求来选择非公平锁和公平锁。

[ReentrantLock](https://javabetter.cn/thread/reentrantLock.html) 支持非公平锁和公平锁两种。

### 读写锁和排它锁

我们前面讲到的 [synchronized](https://javabetter.cn/thread/synchronized.html) 和后面要讲的 [ReentrantLock](https://javabetter.cn/thread/reentrantLock.html)，其实都是“排它锁”。也就是说，这些锁在同一时刻只允许一个线程进行访问。

而读写锁可以在同一时刻允许多个读线程访问。Java 提供了 [ReentrantReadWriteLock](https://javabetter.cn/thread/ReentrantReadWriteLock.html)（后面会细讲，戳链接直达）类作为读写锁的默认实现，内部维护了两个锁：一个读锁，一个写锁。通过分离读锁和写锁，使得在“读多写少”的环境下，大大地提高了性能。

> 注意，即使用读写锁，在写线程访问时，所有的读线程和其它写线程均被阻塞。

排它锁也叫独享锁，如果线程 T 对数据 A 加上排它锁后，则其他线程不能再对 A 加任何类型的锁。获得排它锁的线程既能读数据又能修改数据。

与之对应的，就是共享锁，指该锁可被多个线程所持有。如果线程 T 对数据 A 加上共享锁后，则其他线程只能对 A 再加共享锁，不能加排它锁。获得共享锁的线程只能读数据，不能修改数据。

独享锁与共享锁也是通过[AQS](https://javabetter.cn/thread/aqs.html)来实现的，通过实现不同的方法，来实现独享或者共享。

下图为 ReentrantReadWriteLock 的部分源码：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/other-bukfsdjavassmtjstd-baa93e76-ac90-4955-8955-50dabc6efbdd.png)

我们看到[ReentrantReadWriteLock](https://javabetter.cn/thread/ReentrantReadWriteLock.html)有两把锁：ReadLock 和 WriteLock，由词知意，一个读锁一个写锁，合称“读写锁”。再进一步观察可以发现 ReadLock 和 WriteLock 是靠内部类 Sync 实现的锁。Sync 是 AQS 的一个子类，这种结构在[CountDownLatch、Semaphore](https://javabetter.cn/thread/CountDownLatch.html)（后面会细讲，戳链接直达）、[ReentrantLock](https://javabetter.cn/thread/reentrantLock.html)（接下来会讲，戳链接直达）里面也都存在。

在 ReentrantReadWriteLock 里面，读锁和写锁的锁主体都是 Sync，但读锁和写锁的加锁方式不一样。读锁是共享锁，写锁是独享锁。读锁的共享锁可保证并发读非常高效，而读写、写读、写写的过程互斥，因为读锁和写锁是分离的。所以 ReentrantReadWriteLock 的并发性相比一般的互斥锁有了很大提升。

那读锁和写锁的具体加锁方式有什么区别呢？

在了解源码之前我们需要回顾一下其他知识。 在最开始提及 [AQS](https://javabetter.cn/thread/aqs.html) 的时候我们也提到了 state 字段（int 类型，32 位），该字段用来描述有多少线程持有锁。

在独享锁中，这个值通常是 0 或者 1（如果是重入锁的话 state 值就是重入的次数），在共享锁中 state 就是持有锁的数量。但是在 ReentrantReadWriteLock 中有读、写两把锁，所以需要在一个整型变量 state 上分别描述读锁和写锁的数量（或者也可以叫状态）。

于是将 state 变量“按位切割”切分成了两个部分，高 16 位表示读锁状态（读锁个数），低 16 位表示写锁状态（写锁个数）。如下图所示：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/other-bukfsdjavassmtjstd-62e2bf55-452e-4353-9635-0ea368e355dd.png)

了解了概念之后我们再来看代码，先看写锁的加锁源码：

```Java
protected final boolean tryAcquire(int acquires) {
	Thread current = Thread.currentThread();
	int c = getState(); // 取到当前锁的个数
	int w = exclusiveCount(c); // 取写锁的个数w
	if (c != 0) { // 如果已经有线程持有了锁(c!=0)
    // (Note: if c != 0 and w == 0 then shared count != 0)
		if (w == 0 || current != getExclusiveOwnerThread()) // 如果写线程数（w）为0（换言之存在读锁） 或者持有锁的线程不是当前线程就返回失败
			return false;
		if (w + exclusiveCount(acquires) > MAX_COUNT)    // 如果写入锁的数量大于最大数（65535，2的16次方-1）就抛出一个Error。
      throw new Error("Maximum lock count exceeded");
		// Reentrant acquire
    setState(c + acquires);
    return true;
  }
  if (writerShouldBlock() || !compareAndSetState(c, c + acquires)) // 如果当且写线程数为0，并且当前线程需要阻塞那么就返回失败；或者如果通过CAS增加写线程数失败也返回失败。
		return false;
	setExclusiveOwnerThread(current); // 如果c=0，w=0或者c>0，w>0（重入），则设置当前线程或锁的拥有者
	return true;
}
```

- 这段代码首先取到当前锁的个数 c，然后再通过 c 来获取写锁的个数 w。因为写锁是低 16 位，所以取低 16 位的最大值与当前的 c 做与运算（ `int w = exclusiveCount©;` ），高 16 位和 0 与运算后是 0，剩下的就是低位运算的值，同时也是持有写锁的线程数目。
- 在取到写锁线程的数目后，首先判断是否已经有线程持有了锁。如果已经有线程持有了锁(c!=0)，则查看当前写锁线程的数目，如果写线程数为 0（即此时存在读锁）或者持有锁的线程不是当前线程就返回失败（涉及到公平锁和非公平锁的实现）。
- 如果写入锁的数量大于最大数（65535，2 的 16 次方-1）就抛出一个 Error。
- 如果当前写线程数为 0（那么读线程也应该为 0，因为上面已经处理`c!=0`的情况），并且当前线程需要阻塞那么就返回失败；如果通过 CAS 增加写线程数失败也返回失败。
- 如果 c=0,w=0 或者 c>0,w>0（重入），则设置当前线程或锁的拥有者，返回成功！

`tryAcquire()`除了重入条件（当前线程为获取写锁的线程）之外，增加了一个读锁是否存在的判断。如果存在读锁，则写锁不能被获取，原因在于：必须确保写锁的操作对读锁可见，如果允许读锁在已被获取的情况下对写锁的获取，那么正在运行的其他读线程就无法感知到当前写线程的操作。

因此，只有等待其他读线程都释放了读锁，写锁才能被当前线程获取，而写锁一旦被获取，则其他读写线程的后续访问均被阻塞。写锁的释放与 ReentrantLock 的释放过程基本类似，每次释放均减少写状态，当写状态为 0 时表示写锁已被释放，然后等待的读写线程才能够继续访问读写锁，同时前次写线程的修改对后续的读写线程可见。

接着是读锁的代码：

```Java
protected final int tryAcquireShared(int unused) {
    Thread current = Thread.currentThread();
    int c = getState();
    if (exclusiveCount(c) != 0 &&
        getExclusiveOwnerThread() != current)
        return -1;                                   // 如果其他线程已经获取了写锁，则当前线程获取读锁失败，进入等待状态
    int r = sharedCount(c);
    if (!readerShouldBlock() &&
        r < MAX_COUNT &&
        compareAndSetState(c, c + SHARED_UNIT)) {
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
    return fullTryAcquireShared(current);
}
```

可以看到在`tryAcquireShared(int unused)`方法中，如果其他线程已经获取了写锁，则当前线程获取读锁失败，进入等待状态。如果当前线程获取了写锁或者写锁未被获取，则当前线程（线程安全，依靠 CAS 保证）增加读状态，成功获取读锁。读锁的每次释放（线程安全的，可能有多个读线程同时释放读锁）均减少读状态，减少的值是“`1<<16`”。所以读写锁才能实现读读的过程共享，而读写、写读、写写的过程互斥。

此时，我们再回头看一下互斥锁 ReentrantLock 中公平锁和非公平锁的加锁源码：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/other-bukfsdjavassmtjstd-7fa4ea6b-02ef-4fd4-992d-9ed08e5d4c76.png)

我们发现在 ReentrantLock 虽然有公平锁和非公平锁两种，但是它们添加的都是独享锁。根据源码所示，当某一个线程调用 lock 方法获取锁时，如果同步资源没有被其他线程锁住，那么当前线程在使用 CAS 更新 state 成功后就会成功抢占该资源。而如果公共资源被占用且不是被当前线程占用，那么就会加锁失败。所以可以确定 ReentrantLock 无论读操作还是写操作，添加的锁都是都是独享锁。

**综上，只有 synchronized 是远远不能满足多样化业务对锁的要求的**。接下来我们介绍一下 JDK 中有关锁的一些接口和类。

## JUC 包下的锁

众所周知，JDK 中关于并发的类大多都在 JUC 包下。

![](https://cdn.tobebetterjavaer.com/stutymore/lock-20230806103310.png)

看名字就知道，locks 包是提供一些并发锁的工具类的。前面我们介绍的 [AQS（AbstractQueuedSynchronizer）](https://javabetter.cn/thread/aqs.html)就是在这个包下。

### 抽象类 AQS/AQLS/AOS

这三个抽象类有一定的关系，所以这里放到一起讲。

首先我们来看**AQS**（AbstractQueuedSynchronizer），它是在 JDK 1.5 发布的，提供了一个“队列同步器”的基本功能实现。

AQS 里面的“资源”是用一个`int`类型的数据来表示的，有时候业务需求的资源数超出了`int`的范围，所以在 JDK 1.6 中，多了一个**AQLS**（AbstractQueuedLongSynchronizer）。它的代码跟 AQS 几乎一样，只是把资源的类型变成了`long`类型。

![](https://cdn.tobebetterjavaer.com/stutymore/lock-20230805213746.png)

AQS 和 AQLS 都继承了一个类叫**AOS**（AbstractOwnableSynchronizer）。这个类也是在 JDK 1.6 中出现的。

![](https://cdn.tobebetterjavaer.com/stutymore/lock-20230805213842.png)

这个类只有几行简单的代码。从源码类上的注释可以知道，它是用于表示锁与持有者之间的关系（独占模式）。可以看一下它的主要方法：

```java
// 独占模式，锁的持有者
private transient Thread exclusiveOwnerThread;

// 设置锁持有者
protected final void setExclusiveOwnerThread(Thread t) {
    exclusiveOwnerThread = t;
}

// 获取锁的持有线程
protected final Thread getExclusiveOwnerThread() {
    return exclusiveOwnerThread;
}
```

### 接口 Condition/Lock/ReadWriteLock

locks 包下共有三个接口：`Condition`、`Lock`、`ReadWriteLock`。

其中，Lock 和 ReadWriteLock 从名字就可以看得出来，分别是锁和读写锁的意思。Lock 接口里面有一些获取锁和释放锁的方法声明，而 ReadWriteLock 里面只有两个方法，分别返回“读锁”和“写锁”：

```java
public interface ReadWriteLock {
    Lock readLock();
    Lock writeLock();
}
```

Lock 接口中有一个方法可以获得一个[Condition](https://javabetter.cn/thread/condition.html)（后面会细讲，戳链接直达）:

```java
Condition newCondition();
```

之前我们提到过每个对象都可以用`Object`的**wait/notify**方法来实现**等待/通知机制**。而 Condition 接口也提供了类似 Object 的方法，可以配合**Lock**来实现等待/通知模式。

既然有 Object 的监视器方法了，为什么还要用 Condition 呢？这里有一个简单的对比：

| 对比项                                         | Object 监视器                    | Condition                                                         |
| ---------------------------------------------- | -------------------------------- | ----------------------------------------------------------------- |
| 前置条件                                       | 获取对象的锁                     | 调用 Lock.lock 获取锁，调用 Lock.newCondition 获取 Condition 对象 |
| 调用方式                                       | 直接调用，比如 `object.notify()` | 直接调用，比如 `condition.await()`                                |
| 等待队列的个数                                 | 一个                             | 多个                                                              |
| 当前线程释放锁进入等待状态                     | 支持                             | 支持                                                              |
| 当前线程释放锁进入等待状态，在等待状态中不中断 | 不支持                           | 支持                                                              |
| 当前线程释放锁并进入超时等待状态               | 支持                             | 支持                                                              |
| 当前线程释放锁并进入等待状态直到将来的某个时间 | 不支持                           | 支持                                                              |
| 唤醒等待队列中的一个线程                       | 支持                             | 支持                                                              |
| 唤醒等待队列中的全部线程                       | 支持                             | 支持                                                              |

Condition 和 Object 的 wait/notify 基本相似。其中，Condition 的 await 方法对应的是 Object 的 wait 方法，而 Condition 的**signal/signalAll**方法则对应 Object 的 notify/`notifyAll()`。但 Condition 类似于 Object 的等待/通知机制的加强版。我们来看看主要的方法：

| 方法名称                 | 描述                                                                                                                                                                                                                                     |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `await()`                | 当前线程进入等待状态直到被通知（signal）或者中断；当前线程进入运行状态并从 `await()`方法返回的场景包括：（1）其他线程调用相同 Condition 对象的 signal/signalAll 方法，并且当前线程被唤醒；（2）其他线程调用 interrupt 方法中断当前线程； |
| `awaitUninterruptibly()` | 当前线程进入等待状态直到被通知，在此过程中对中断信号不敏感，不支持中断当前线程                                                                                                                                                           |
| awaitNanos(long)         | 当前线程进入等待状态，直到被通知、中断或者超时。如果返回值小于等于 0，可以认定就是超时了                                                                                                                                                 |
| awaitUntil(Date)         | 当前线程进入等待状态，直到被通知、中断或者超时。如果没到指定时间被通知，则返回 true，否则返回 false                                                                                                                                      |
| signal()                 | 唤醒一个等待在 Condition 上的线程，被唤醒的线程在方法返回前必须获得与 Condition 对象关联的锁                                                                                                                                             |
| signalAll()              | 唤醒所有等待在 Condition 上的线程，能够从 await()等方法返回的线程必须先获得与 Condition 对象关联的锁                                                                                                                                     |

### 可重入锁ReentrantLock

[ReentrantLock](https://javabetter.cn/thread/reentrantLock.html)（接下来细讲，戳链接直达）是 Lock 接口的默认实现，实现了锁的基本功能。

从名字上看，它是一个“可重入”锁，从源码上看，它内部有一个抽象类`Sync`，继承了 [AQS](https://javabetter.cn/thread/aqs.html)，自己实现了一个同步器。

同时，ReentrantLock 内部有两个非抽象类`NonfairSync`和`FairSync`，它们都继承了 Sync。从名字上可以看得出，分别是”非公平同步器“和”公平同步器“的意思。这意味着 ReentrantLock 可以支持”公平锁“和”非公平锁“。

通过看这两个同步器的源码可以发现，它们的实现都是”独占“的。都调用了 AOS 的`setExclusiveOwnerThread`方法，所以 ReentrantLock 的锁是”独占“的，也就是说，它的锁都是”排他锁“，不能共享。

在 ReentrantLock 的构造方法里，可以传入一个`boolean`类型的参数，来指定它是否是一个公平锁，默认情况下是非公平的。这个参数一旦实例化后就不能修改，只能通过`isFair()`方法来查看。

来看一个 ReentrantLock 的简单示例：

```java
public class Counter {
    private final ReentrantLock lock = new ReentrantLock();
    private int count = 0;

    public void increment() {
        lock.lock(); // 获取锁
        try {
            count++;
            System.out.println("增量 " + Thread.currentThread().getName() + ": " + count);
        } finally {
            lock.unlock(); // 释放锁
        }
    }

    public static void main(String[] args) {
        Counter counter = new Counter();

        Runnable task = () -> {
            for (int i = 0; i < 1000; i++) {
                counter.increment();
            }
        };

        Thread thread1 = new Thread(task);
        Thread thread2 = new Thread(task);

        thread1.start();
        thread2.start();

        try {
            thread1.join();
            thread2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("最终结果: " + counter.count);
    }
}
```

在这个示例中，Counter 类使用了一个 ReentrantLock 来保护 count 变量的访问。increment 方法首先获取锁，然后增加计数，并在 finally 块中释放锁。这确保了即使方法中抛出异常，锁也会被正确释放。

在 main 方法中，我们创建了两个线程来并发执行 increment 操作。由于使用了锁，因此对 count 变量的访问是串行化的，结果是正确的。

这个示例展示了 ReentrantLock 的基本用法。与 synchronized 关键字相比，ReentrantLock 提供了更高的灵活性，例如可中断的锁获取、公平锁选项、锁的定时获取等。

来看一下最终输出结果：

![](https://cdn.tobebetterjavaer.com/stutymore/lock-20230806103823.png)

### 读写锁ReentrantReadWriteLock

[ReentrantReadWriteLock](https://javabetter.cn/thread/ReentrantReadWriteLock.html)（后面会细讲，戳链接直达） 是 ReadWriteLock 接口的默认实现。它与 ReentrantLock 的功能类似，同样是可重入的，支持非公平锁和公平锁。不同的是，它还支持”读写锁“。

ReentrantReadWriteLock 内部的结构大概是这样：

```java
// 内部结构
private final ReentrantReadWriteLock.ReadLock readerLock;
private final ReentrantReadWriteLock.WriteLock writerLock;
final Sync sync;
abstract static class Sync extends AbstractQueuedSynchronizer {
    // 具体实现
}
static final class NonfairSync extends Sync {
    // 具体实现
}
static final class FairSync extends Sync {
    // 具体实现
}
public static class ReadLock implements Lock, java.io.Serializable {
    private final Sync sync;
    protected ReadLock(ReentrantReadWriteLock lock) {
            sync = lock.sync;
    }
    // 具体实现
}
public static class WriteLock implements Lock, java.io.Serializable {
    private final Sync sync;
    protected WriteLock(ReentrantReadWriteLock lock) {
            sync = lock.sync;
    }
    // 具体实现
}

// 构造方法，初始化两个锁
public ReentrantReadWriteLock(boolean fair) {
    sync = fair ? new FairSync() : new NonfairSync();
    readerLock = new ReadLock(this);
    writerLock = new WriteLock(this);
}

// 获取读锁和写锁的方法
public ReentrantReadWriteLock.WriteLock writeLock() { return writerLock; }
public ReentrantReadWriteLock.ReadLock  readLock()  { return readerLock; }
```

可以看到，它同样是内部维护了两个同步器。且维护了两个 Lock 的实现类 ReadLock 和 WriteLock。从源码可以发现，这两个内部类用的是外部类的同步器。

来看一下 ReentrantReadWriteLock 的使用示例：

```java
public class SharedResource {
    private final ReentrantReadWriteLock lock = new ReentrantReadWriteLock();
    private int data = 0;

    public void write(int value) {
        lock.writeLock().lock(); // 获取写锁
        try {
            data = value;
            System.out.println("写 " + Thread.currentThread().getName() + ": " + data);
        } finally {
            lock.writeLock().unlock(); // 释放写锁
        }
    }

    public void read() {
        lock.readLock().lock(); // 获取读锁
        try {
            System.out.println("读 " + Thread.currentThread().getName() + ": " + data);
        } finally {
            lock.readLock().unlock(); // 释放读锁
        }
    }

    public static void main(String[] args) {
        SharedResource sharedResource = new SharedResource();

        // 创建读线程
        Thread readThread1 = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                sharedResource.read();
            }
        });

        Thread readThread2 = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                sharedResource.read();
            }
        });

        // 创建写线程
        Thread writeThread = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                sharedResource.write(i);
            }
        });

        readThread1.start();
        readThread2.start();
        writeThread.start();

        try {
            readThread1.join();
            readThread2.join();
            writeThread.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

在上述代码中，我们定义了一个 SharedResource 类，该类使用 ReentrantReadWriteLock 来保护其内部数据。write 方法获取写锁，并更新共享数据。read 方法获取读锁，并读取共享数据。

在 main 方法中，我们创建了两个读线程和一个写线程。由于 ReentrantReadWriteLock 允许多个读取操作同时进行，因此读线程可以同时运行。然而，写入操作会被串行化，并且在写入操作进行时，读取操作将被阻塞。

来看一下输出结果：

```
读 Thread-0: 0
读 Thread-1: 0
写 Thread-2: 0
写 Thread-2: 1
写 Thread-2: 2
写 Thread-2: 3
写 Thread-2: 4
读 Thread-0: 4
读 Thread-1: 4
读 Thread-0: 4
读 Thread-1: 4
读 Thread-0: 4
读 Thread-1: 4
读 Thread-0: 4
读 Thread-1: 4
```

ReentrantReadWriteLock 实现了读写锁，但它有一个小弊端，就是在“写”操作的时候，其它线程不能写也不能读。我们称这种现象为“写饥饿”，将在下文的 StampedLock 类继续讨论这个问题。

### 锁王StampedLock

`StampedLock` 类是 Java 8 才发布的，也是 Doug Lea 大神所写，有人称它为锁的性能之王。

StampedLock 没有实现 Lock 接口和 ReadWriteLock 接口，但它实现了“读写锁”的功能，并且性能比 ReentrantReadWriteLock 更高。StampedLock 还把读锁分为了“乐观读锁”和“悲观读锁”两种。

前面提到了 ReentrantReadWriteLock 会发生“写饥饿”的现象，但 StampedLock 不会。它是怎么做到的呢？

它的核心思想在于，**在读的时候如果发生了写，应该通过重试的方式来获取新的值，而不应该阻塞写操作。这种模式也就是典型的无锁编程思想，和 [CAS](https://javabetter.cn/thread/cas.html) 自旋的思想一样**。这种操作方式决定了 StampedLock 在读线程非常多而写线程非常少的场景下非常适用，同时还避免了写饥饿情况的发生。

我们来分析一下官方提供的用法（在 JDK 源码类声明的上方或 Javadoc 里可以找到）。

![](https://cdn.tobebetterjavaer.com/stutymore/lock-20230806101251.png)

来看一下。

```java
class Point {
   private double x, y;
   private final StampedLock sl = new StampedLock();

   // 写锁的使用
   void move(double deltaX, double deltaY) {
     long stamp = sl.writeLock(); // 获取写锁
     try {
       x += deltaX;
       y += deltaY;
     } finally {
       sl.unlockWrite(stamp); // 释放写锁
     }
   }

   // 乐观读锁的使用
   double distanceFromOrigin() {
     long stamp = sl.tryOptimisticRead(); // 获取乐观读锁
     double currentX = x, currentY = y;
     if (!sl.validate(stamp)) { // //检查乐观读锁后是否有其他写锁发生，有则返回false
        stamp = sl.readLock(); // 获取一个悲观读锁
        try {
          currentX = x;
          currentY = y;
        } finally {
           sl.unlockRead(stamp); // 释放悲观读锁
        }
     }
     return Math.sqrt(currentX * currentX + currentY * currentY);
   }

   // 悲观读锁以及读锁升级写锁的使用
   void moveIfAtOrigin(double newX, double newY) {
     long stamp = sl.readLock(); // 悲观读锁
     try {
       while (x == 0.0 && y == 0.0) {
         // 读锁尝试转换为写锁：转换成功后相当于获取了写锁，转换失败相当于有写锁被占用
         long ws = sl.tryConvertToWriteLock(stamp);

         if (ws != 0L) { // 如果转换成功
           stamp = ws; // 读锁的票据更新为写锁的
           x = newX;
           y = newY;
           break;
         }
         else { // 如果转换失败
           sl.unlockRead(stamp); // 释放读锁
           stamp = sl.writeLock(); // 强制获取写锁
         }
       }
     } finally {
       sl.unlock(stamp); // 释放所有锁
     }
   }
}
```

乐观读锁的意思就是先假定在这个锁获取期间，共享变量不会被改变，既然假定不会被改变，那就不需要上锁。

在获取乐观读锁之后进行了一些操作，然后又调用了 validate 方法，这个方法就是用来验证 tryOptimisticRead 之后，是否有写操作执行过，如果有，则获取一个悲观读锁，这里的悲观读锁和 ReentrantReadWriteLock 中的读锁类似，也是个共享锁。

可以看到，StampedLock 获取锁会返回一个`long`类型的变量，释放锁的时候再把这个变量传进去。简单看看源码：

```java
// 用于操作state后获取stamp的值
private static final int LG_READERS = 7;
private static final long RUNIT = 1L;               //0000 0000 0001
private static final long WBIT  = 1L << LG_READERS; //0000 1000 0000
private static final long RBITS = WBIT - 1L;        //0000 0111 1111
private static final long RFULL = RBITS - 1L;       //0000 0111 1110
private static final long ABITS = RBITS | WBIT;     //0000 1111 1111
private static final long SBITS = ~RBITS;           //1111 1000 0000

// 初始化时state的值
private static final long ORIGIN = WBIT << 1;       //0001 0000 0000

// 锁共享变量state
private transient volatile long state;
// 读锁溢出时用来存储多出的读锁
private transient int readerOverflow;
```

StampedLock 用这个 long 类型的变量的前 7 位（LG_READERS）来表示读锁，每获取一个悲观读锁，就加 1（RUNIT），每释放一个悲观读锁，就减 1。而悲观读锁最多只能装 128 个（7 位限制），很容易溢出，所以用一个 int 类型的变量来存储溢出的悲观读锁。

写锁用 state 变量剩下的位来表示，每次获取一个写锁，就加 0000 1000 0000（WBIT）。需要注意的是，**写锁在释放的时候，并不是减 WBIT，而是再加 WBIT**。这是为了**让每次写锁都留下痕迹**，解决 CAS 中的 ABA 问题，也为**乐观锁检查变化**validate 方法提供基础。

乐观读锁就比较简单了，并没有真正改变 state 的值，而是在获取锁的时候记录 state 的写状态，在操作完成后去检查 state 的写状态部分是否发生变化，上文提到了，每次写锁都会留下痕迹，也是为了这里乐观锁检查变化提供方便。

总的来说，StampedLock 的性能是非常优异的，基本上可以取代 ReentrantReadWriteLock。我们来一个 StampedLock 和 ReentrantReadWriteLock 的对比使用示例。

ReentrantReadWriteLock：

```java
public class SharedResourceWithReentrantReadWriteLock {
    private final ReentrantReadWriteLock lock = new ReentrantReadWriteLock();
    private int data = 0;

    public void write(int value) {
        lock.writeLock().lock();
        try {
            data = value;
        } finally {
            lock.writeLock().unlock();
        }
    }

    public int read() {
        lock.readLock().lock();
        try {
            return data;
        } finally {
            lock.readLock().unlock();
        }
    }

    public static void main(String[] args) {
        SharedResourceWithReentrantReadWriteLock sharedResource = new SharedResourceWithReentrantReadWriteLock();

        Thread writer = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                sharedResource.write(i);
                System.out.println("Write: " + i);
            }
        });

        Thread reader = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                int value = sharedResource.read();
                System.out.println("Read: " + value);
            }
        });

        writer.start();
        reader.start();
    }
}
```

StampedLock：

```java
public class SharedResourceWithStampedLock {
    private final StampedLock sl = new StampedLock();
    private int data = 0;

    public void write(int value) {
        long stamp = sl.writeLock();
        try {
            data = value;
        } finally {
            sl.unlockWrite(stamp);
        }
    }

    public int read() {
        long stamp = sl.tryOptimisticRead();
        int currentData = data;
        if (!sl.validate(stamp)) {
            stamp = sl.readLock();
            try {
                currentData = data;
            } finally {
                sl.unlockRead(stamp);
            }
        }
        return currentData;
    }

    public static void main(String[] args) {
        SharedResourceWithStampedLock sharedResource = new SharedResourceWithStampedLock();

        Thread writer = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                sharedResource.write(i);
                System.out.println("Write: " + i);
            }
        });

        Thread reader = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                int value = sharedResource.read();
                System.out.println("Read: " + value);
            }
        });

        writer.start();
        reader.start();
    }
}
```

来看一下输出结果的对比。

![](https://cdn.tobebetterjavaer.com/stutymore/lock-20230806105654.png)

1、可重入性：ReentrantReadWriteLock 支持可重入，即在一个线程中可以多次获取读锁或写锁。StampedLock 则不支持可重入。

2、乐观读锁：StampedLock 提供了乐观读锁机制，允许一个线程在没有任何写入操作发生的情况下读取数据，从而提高了性能。而 ReentrantReadWriteLock 没有提供这样的机制。

3、锁降级：StampedLock 提供了从写锁到读锁的降级功能，这在某些场景下可以提供额外的灵活性。ReentrantReadWriteLock 不直接提供这样的功能。

4、API 复杂性：由于提供了乐观读锁和锁降级功能，StampedLock 的 API 相对复杂一些，需要更小心地使用以避免死锁和其他问题。ReentrantReadWriteLock 的 API 相对更直观和容易使用。

综上所述，StampedLock 提供了更高的性能和灵活性，但也带来了更复杂的使用方式。ReentrantReadWriteLock 则相对简单和直观，特别适用于没有高并发读的场景。

## JUC 包下的其他工具类

locks 包下的锁接口和锁类介绍完了，我们这里再讲一些 JUC 包下的其他工具类，比如 Semaphore、CountDownLatch、CyclicBarrier、Exchanger、Phaser 等（这些在[通信工具类](https://javabetter.cn/thread/CountDownLatch.html)中也会细讲）。

### Semaphore

Semaphore 是一个计数信号量，它的作用是限制可以访问某些资源（物理或逻辑的）的线程数目。Semaphore 的构造方法可以指定信号量的数目，也可以指定是否是公平的。

![](https://cdn.tobebetterjavaer.com/stutymore/lock-20230806102650.png)

Semaphore 有两个主要的方法：`acquire()`和`release()`。`acquire()`方法会尝试获取一个信号量，如果获取不到，就会阻塞当前线程，直到有线程释放信号量。`release()`方法会释放一个信号量，释放之后，会唤醒一个等待的线程。

Semaphore 还有一个`tryAcquire()`方法，它会尝试获取一个信号量，如果获取不到，就会返回 false，不会阻塞当前线程。

Semaphore 用来控制同时访问某个特定资源的操作数量，它并不保证线程安全，所以要保证线程安全，还需要加上同步锁。

来看一个 Semaphore 的使用示例：

```java
public class ResourcePool {
    private final Semaphore semaphore;

    public ResourcePool(int limit) {
        this.semaphore = new Semaphore(limit);
    }

    public void useResource() {
        try {
            semaphore.acquire();
            // 使用资源
            System.out.println("资源开始使用了 " + Thread.currentThread().getName());
            Thread.sleep(1000); // 模拟资源使用时间
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            semaphore.release();
            System.out.println("资源释放了 " + Thread.currentThread().getName());
        }
    }

    public static void main(String[] args) {
        ResourcePool pool = new ResourcePool(3); // 限制3个线程同时访问资源

        for (int i = 0; i < 10; i++) {
            new Thread(pool::useResource).start();
        }
    }
}
```

来看一下输出结果：

```
资源开始使用了 Thread-0
资源开始使用了 Thread-2
资源开始使用了 Thread-1
资源释放了 Thread-0
资源释放了 Thread-2
资源开始使用了 Thread-4
资源开始使用了 Thread-3
资源开始使用了 Thread-5
资源释放了 Thread-1
资源开始使用了 Thread-6
资源开始使用了 Thread-8
资源开始使用了 Thread-7
资源释放了 Thread-4
资源释放了 Thread-3
资源释放了 Thread-5
资源释放了 Thread-8
资源释放了 Thread-6
资源开始使用了 Thread-9
资源释放了 Thread-7
资源释放了 Thread-9
```

### CountDownLatch

CountDownLatch 是一个同步工具类，它允许一个或多个线程一直等待，直到其他线程的操作执行完后再执行。

CountDownLatch 有一个计数器，可以通过`countDown()`方法对计数器的数目进行减一操作，也可以通过`await()`方法来阻塞当前线程，直到计数器的值为 0。

CountDownLatch 一般用来控制线程等待，它可以让某个线程一直等待直到倒计时结束，再开始执行。

来看一个 CountDownLatch 的使用示例：

```java
public class InitializationDemo {

    public static void main(String[] args) throws InterruptedException {
        // 创建一个倒计数为 3 的 CountDownLatch
        CountDownLatch latch = new CountDownLatch(3);

        Thread service1 = new Thread(new Service("服务 1", 2000, latch));
        Thread service2 = new Thread(new Service("服务 2", 3000, latch));
        Thread service3 = new Thread(new Service("服务 3", 4000, latch));

        service1.start();
        service2.start();
        service3.start();

        // 等待所有服务初始化完成
        latch.await();
        System.out.println("所有服务都准备好了");
    }

    static class Service implements Runnable {
        private final String name;
        private final int timeToStart;
        private final CountDownLatch latch;

        public Service(String name, int timeToStart, CountDownLatch latch) {
            this.name = name;
            this.timeToStart = timeToStart;
            this.latch = latch;
        }

        @Override
        public void run() {
            try {
                Thread.sleep(timeToStart);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println(name + " 准备好了");
            latch.countDown(); // 减少倒计数
        }
    }
}
```

在这个示例中，我们有三个服务，每个服务都在一个单独的线程中启动，并需要一些时间来初始化。主线程使用 CountDownLatch 等待这三个服务全部启动完成后，再继续执行。每个服务启动完毕后都会调用 `countDown()` 方法。主线程通过调用 `await()` 方法等待，直到倒计数变为零，然后继续执行。

来看运行结果：

```
服务 1 准备好了
服务 2 准备好了
服务 3 准备好了
所有服务都准备好了
```

### CyclicBarrier

CyclicBarrier 是一个同步工具类，它允许一组线程互相等待，直到到达某个公共屏障点（common barrier point）。

CyclicBarrier 可以用于多线程计算数据，最后合并计算结果的应用场景。比如我们用一个 Excel 保存了用户所有银行流水，每个 sheet 保存一个账户近一年的每笔银行流水，现在需要统计用户的日均银行流水，先用多线程处理每个 sheet 里的银行流水，都执行完之后，得到每个 sheet 的日均银行流水，最后，再用 barrierAction 用这些线程的计算结果，计算出整个 Excel 的日均银行流水。

CyclicBarrier 的计数器可以通过`reset()`方法重置，所以它能处理循环使用的场景。比如，我们将一个大任务分成 10 个小任务，用 10 个线程分别执行这 10 个小任务，当 10 个小任务都执行完之后，再合并这 10 个小任务的结果，这个时候就可以用 CyclicBarrier 来实现。

CyclicBarrier 还有一个有参构造方法，可以指定一个 Runnable，这个 Runnable 会在 CyclicBarrier 的计数器为 0 的时候执行，用来完成更复杂的任务。

来看一下使用示例用：

```java
public class CyclicBarrierDemo {

    public static void main(String[] args) {
        int numberOfThreads = 3; // 线程数量
        CyclicBarrier barrier = new CyclicBarrier(numberOfThreads, () -> {
            // 当所有线程都到达障碍点时执行的操作
            System.out.println("所有线程都已到达屏障，进入下一阶段");
        });

        for (int i = 0; i < numberOfThreads; i++) {
            new Thread(new Task(barrier), "Thread " + (i + 1)).start();
        }
    }

    static class Task implements Runnable {
        private final CyclicBarrier barrier;

        public Task(CyclicBarrier barrier) {
            this.barrier = barrier;
        }

        @Override
        public void run() {
            try {
                System.out.println(Thread.currentThread().getName() + " 正在屏障处等待");
                barrier.await(); // 等待所有线程到达障碍点
                System.out.println(Thread.currentThread().getName() + " 已越过屏障.");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
```

输出结果如下所示：

```
Thread 1 正在屏障处等待
Thread 3 正在屏障处等待
Thread 2 正在屏障处等待
所有线程都已到达屏障，进入下一阶段
Thread 2 已越过屏障.
Thread 1 已越过屏障.
Thread 3 已越过屏障.
```

### Exchanger

Exchanger 是一个用于线程间协作的工具类。Exchanger 用于进行线程间的数据交换。它提供一个同步点，在这个同步点，两个线程可以交换彼此的数据。这两个线程通过 exchange 方法交换数据，如果第一个线程先执行 exchange 方法，它会一直等待第二个线程也执行 exchange 方法，当两个线程都到达同步点时，这两个线程就可以交换数据，将本线程生产出来的数据传递给对方。

Exchanger 可以用于遗传算法、校对工作和数据同步等场景。

来看一个使用示例：

```java
public class ExchangerDemo {

    public static void main(String[] args) {
        Exchanger<String> exchanger = new Exchanger<>();

        new Thread(() -> {
            try {
                String data1 = "data1";
                System.out.println(Thread.currentThread().getName() + " 正在把 " + data1 + " 交换出去");
                Thread.sleep(1000); // 模拟线程处理耗时
                String data2 = exchanger.exchange(data1);
                System.out.println(Thread.currentThread().getName() + " 交换到了 " + data2);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }, "Thread 1").start();

        new Thread(() -> {
            try {
                String data1 = "data2";
                System.out.println(Thread.currentThread().getName() + " 正在把 " + data1 + " 交换出去");
                Thread.sleep(2000); // 模拟线程处理耗时
                String data2 = exchanger.exchange(data1);
                System.out.println(Thread.currentThread().getName() + " 交换到了 " + data2);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }, "Thread 2").start();
    }
}
```

输出结果如下所示：

```
Thread 1 正在把 data1 交换出去
Thread 2 正在把 data2 交换出去
Thread 2 交换到了 data1
Thread 1 交换到了 data2
```

### Phaser

Phaser 是一个同步工具类，它可以让多个线程在某个时刻一起完成任务。

Phaser 可以理解为一个线程的计数器，它可以将这个计数器加一或减一。当这个计数器的值为 0 的时候，所有调用`await()`方法而在等待的线程就会继续执行。

Phaser 的计数器可以被动态地更新，也可以被动态地增加或减少。Phaser 还提供了一些方法来帮助我们更好地控制线程的到达。

来看一个使用示例：

```java
public class PhaserDemo {

    public static void main(String[] args) {
        Phaser phaser = new Phaser(3); // 3 个线程共同完成任务

        new Thread(new Task(phaser), "Thread 1").start();
        new Thread(new Task(phaser), "Thread 2").start();
        new Thread(new Task(phaser), "Thread 3").start();
    }

    static class Task implements Runnable {
        private final Phaser phaser;

        public Task(Phaser phaser) {
            this.phaser = phaser;
        }

        @Override
        public void run() {
            System.out.println(Thread.currentThread().getName() + " 完成了第一步操作");
            phaser.arriveAndAwaitAdvance(); // 等待其他线程完成第一步操作
            System.out.println(Thread.currentThread().getName() + " 完成了第二步操作");
            phaser.arriveAndAwaitAdvance(); // 等待其他线程完成第二步操作
            System.out.println(Thread.currentThread().getName() + " 完成了第三步操作");
            phaser.arriveAndAwaitAdvance(); // 等待其他线程完成第三步操作
        }
    }
}
```

输出结果如下所示：

```
Thread 1 完成了第一步操作
Thread 2 完成了第一步操作
Thread 3 完成了第一步操作
Thread 3 完成了第二步操作
Thread 1 完成了第二步操作
Thread 2 完成了第二步操作
Thread 1 完成了第三步操作
Thread 3 完成了第三步操作
Thread 2 完成了第三步操作
```

## 小结

本文介绍了 JUC 包下的锁接口和锁类，包括 Lock、ReadWriteLock、Condition、ReentrantLock、ReentrantReadWriteLock、StampedLock 等。还介绍了 JUC 包下的其他工具类，包括 Semaphore、CountDownLatch、CyclicBarrier、Exchanger、Phaser 等。

JUC 包下的锁接口和锁类，可以说是 Java 并发编程的核心，也是面试中经常会问到的知识点。所以，一定要掌握好。

> 编辑：沉默王二，编辑前的内容来源于朋友小七萤火虫开源的这个仓库：[深入浅出 Java 多线程](http://concurrent.redspider.group/)，强烈推荐；还有一部分内容来源于[美团点评后端工程师家琪的这篇文章](https://tech.meituan.com/2018/11/15/java-lock.html)，强烈推荐。

---

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第二份 PDF 《[并发编程小册](https://javabetter.cn/thread/)》终于来了！包括线程的基本概念和使用方法、Java的内存模型、sychronized、volatile、CAS、AQS、ReentrantLock、线程池、并发容器、ThreadLocal、生产者消费者模型等面试和开发必须掌握的内容，共计 15 万余字，200+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，二哥的并发编程进阶之路.pdf](https://javabetter.cn/thread/)

[加入二哥的编程星球](https://javabetter.cn/thread/)，在星球的第二个置顶帖「[知识图谱](https://javabetter.cn/thread/)」里就可以获取 PDF 版本。

![](https://cdn.tobebetterjavaer.com/stutymore/wangzhe-thread-20230904125125.png)
