---
title: 一文彻底搞清楚Java实现CAS的原理
shortTitle: 乐观锁CAS
description: CAS（Compare-and-Swap）是一种被广泛应用在并发控制中的算法，它是一种乐观锁的实现方式。CAS全称为“比较并交换”，是一种无锁的原子操作。
category:
  - Java核心
tag:
  - Java并发编程
head:
  - - meta
    - name: keywords
      content: Java,并发编程,多线程,Thread,cas
---

# 第十二节：乐观锁 CAS

CAS（Compare-and-Swap）是一种乐观锁的实现方式，全称为“比较并交换”，是一种无锁的原子操作。

在并发编程中，我们都知道`i++`操作是非线程安全的，这是因为 `i++`操作不是原子操作，我们之前在讲[多线程带来了什么问题](https://javabetter.cn/thread/thread-bring-some-problem.html)中有讲到，大家应该还记得吧？

如何保证原子性呢？

常见的做法就是加锁。

在 Java 中，我们可以使用 [synchronized](https://javabetter.cn/thread/synchronized-1.html)关键字 和 `CAS`（Compare-and-Swap）来实现加锁效果。

`synchronized` 是悲观锁，尽管随着 JDK 版本的升级，synchronized 关键字已经“轻量级”了很多（[前面有细讲，戳链接回顾](https://javabetter.cn/thread/synchronized.html)），但依然是悲观锁，线程开始执行第一步就要获取锁，一旦获得锁，其他的线程进入后就会阻塞并等待锁。

如果不好理解，我们来举个生活中的例子：一个人进入厕所后首先把门锁上（获取锁），然后开始上厕所，这个时候有其他人来了就只能在外面等（阻塞），就算再急也没用。上完厕所完事后把门打开（解锁），其他人就可以进入了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/cas-973e8804-c713-43f6-9a63-4b9f2be54f10.png)

`CAS` 是乐观锁，线程执行的时候不会加锁，它会假设此时没有冲突，然后完成某项操作；如果因为冲突失败了就重试，直到成功为止。

## 乐观锁与悲观锁

锁可以从不同的角度来分类。比如我们在前面讲 [synchronized 四种锁状态](https://javabetter.cn/thread/synchronized.html)的时候，提到过偏向锁、轻量级锁、重量级锁，对吧？乐观锁和悲观锁也是一种分类方式。

### 悲观锁

对于悲观锁来说，它总是认为每次访问共享资源时会发生冲突，所以必须对每次数据操作加上锁，以保证临界区的程序同一时间只能有一个线程在执行。

### 乐观锁

乐观锁，顾名思义，它是乐观派。乐观锁总是假设对共享资源的访问没有冲突，线程可以不停地执行，无需加锁也无需等待。一旦多个线程发生冲突，乐观锁通常使用一种称为 CAS 的技术来保证线程执行的安全性。

由于乐观锁假想操作中没有锁的存在，因此不太可能出现死锁的情况，换句话说，**乐观锁天生免疫死锁**。

- 乐观锁多用于“读多写少“的环境，避免频繁加锁影响性能；
- 悲观锁多用于”写多读少“的环境，避免频繁失败和重试影响性能。

## 什么是 CAS

在 CAS 中，有这样三个值：

- V：要更新的变量(var)
- E：预期值(expected)
- N：新值(new)

比较并交换的过程如下：

判断 V 是否等于 E，如果等于，将 V 的值设置为 N；如果不等，说明已经有其它线程更新了 V，于是当前线程放弃更新，什么都不做。

这里的**预期值 E 本质上指的是“旧值”**。

我们以一个简单的例子来解释这个过程：

1. 如果有一个多个线程共享的变量`i`原本等于 5，我现在在线程 A 中，想把它设置为新的值 6;
2. 我们使用 CAS 来做这个事情；
3. 首先我们用 i 去与 5 对比，发现它等于 5，说明没有被其它线程改过，那我就把它设置为新的值 6，此次 CAS 成功，`i`的值被设置成了 6；
4. 如果不等于 5，说明`i`被其它线程改过了（比如现在`i`的值为 2），那么我就什么也不做，此次 CAS 失败，`i`的值仍然为 2。

在这个例子中，`i`就是 V，5 就是 E，6 就是 N。

那有没有可能我在判断了`i`为 5 之后，正准备更新它的新值的时候，被其它线程更改了`i`的值呢？

不会的。因为 CAS 是一种原子操作，它是一种系统原语，是一条 CPU 的原子指令，从 CPU 层面已经保证它的原子性。

**当多个线程同时使用 CAS 操作一个变量时，只有一个会胜出，并成功更新，其余均会失败，但失败的线程并不会被挂起，仅是被告知失败，并且允许再次尝试，当然也允许失败的线程放弃操作。**

## CAS 的原理

前面提到，CAS 是一种原子操作。那么 Java 是怎样来使用 CAS 的呢？我们知道，在 Java 中，如果一个[方法是 native 的](https://javabetter.cn/oo/native-method.html)，那 Java 就不负责具体实现它，而是交给底层的 JVM 使用 C 语言 或者 C++ 去实现。

在 Java 中，有一个`Unsafe`类（[后面会细讲，戳链接直达](https://javabetter.cn/thread/Unsafe.html)），它在`sun.misc`包中。它里面都是一些`native`方法，其中就有几个是关于 CAS 的：

```java
boolean compareAndSwapObject(Object o, long offset,Object expected, Object x);
boolean compareAndSwapInt(Object o, long offset,int expected,int x);
boolean compareAndSwapLong(Object o, long offset,long expected,long x);
```

Unsafe 对 CAS 的实现是通过 C++ 实现的，它的具体实现和操作系统、CPU 都有关系。

Linux 的 X86 下主要是通过`cmpxchgl`这个指令在 CPU 上完成 CAS 操作的，但在多处理器情况下，必须使用`lock`指令加锁来完成。当然，不同的操作系统和处理器在实现方式上肯定会有所不同。

>CMPXCHG是“Compare and Exchange”的缩写，它是一种原子指令，用于在多核/多线程环境中安全地修改共享数据。CMPXCHG在很多现代微处理器体系结构中都有，例如Intel x86/x64体系。对于32位操作数，这个指令通常写作CMPXCHG，而在64位操作数中，它被称为CMPXCHG8B或CMPXCHG16B。

除了上面提到的方法，Unsafe 里面还有其它的方法。比如支持线程挂起和恢复的`park`和`unpark` 方法， [LockSupport 类（后面会讲）](https://javabetter.cn/thread/LockSupport.html)底层就调用了这两个方法。还有支持[反射](https://javabetter.cn/basic-extra-meal/fanshe.html)操作的`allocateInstance()`方法。

## CAS 如何实现原子操作？

上面介绍了 Unsafe 类的几个支持 CAS 的方法。那 Java 具体是如何通过这几个方法来实现原子操作的呢？

JDK 提供了一些用于原子操作的类，在`java.util.concurrent.atomic`包下面。在 JDK 8 中，有以下这些类：

![](https://cdn.tobebetterjavaer.com/stutymore/cas-20230731195315.png)

从名字就可以看出来这些类大概的用途（[原子类后面会细讲，戳链接直达](https://javabetter.cn/thread/atomic.html)）：

- 原子更新基本类型
- 原子更新数组
- 原子更新引用
- 原子更新字段（属性）

这里我们以`AtomicInteger`类的`getAndAdd(int delta)`方法为例，来看看 Java 是如何实现原子操作的。

先来看 getAndAdd 方法的源码：

```java
public final int getAndAdd(int delta) {
    return unsafe.getAndAddInt(this, valueOffset, delta);
}
```

这里的 unsafe 其实就是一个`Unsafe`对象：

```java
// setup to use Unsafe.compareAndSwapInt for updates
private static final Unsafe unsafe = Unsafe.getUnsafe();
```

所以，`AtomicInteger`类的`getAndAdd()`方法是通过调用`Unsafe`类的方法实现的：

```java
public final int getAndAddInt(Object var1, long var2, int var4) {
    int var5;
    do {
        var5 = this.getIntVolatile(var1, var2);
    } while(!this.compareAndSwapInt(var1, var2, var5, var5 + var4));

    return var5;
}
```

让我们详细分析下这段代码，先看参数：

- Object var1，这个参数代表你想要进行操作的对象。
- long var2，这个参数是你想要操作的 var1 对象中的某个字段的偏移量。这个偏移量可以通过 Unsafe 类的 objectFieldOffset 方法获得。
- int var4，这个参数是你想要增加的值。

再来看方法执行的过程：

- 首先，在 do while 循环开始，通过`this.getIntVolatile(var1, var2)`获取当前对象指定字段的值，将其存入临时变量 var5 中。这里的 getIntVolatile 方法能保证读操作的可见性，即读取的结果是最新的写入结果，不会因为 JVM 的优化策略（如[指令重排序](https://javabetter.cn/thread/jmm.html)）或者 CPU 的缓存导致读取到过期的数据。
- 然后，执行`compareAndSwapInt(var1, var2, var5, var5 + var4)`进行 CAS 操作。如果对象 var1 在内存地址 var2 处的值等于预期值 var5，则将该位置的值更新为 var5 + var4，并返回 true；否则，不做任何操作并返回 false。
- 如果 CAS 操作成功，说明我们成功地将 var1 对象的 var2 偏移量处的字段的值更新为 var5 + var4，并且这个更新操作是原子性的，因此我们跳出循环并返回原来的值 var5。
- 如果 CAS 操作失败，说明在我们尝试更新值的时候，有其他线程修改了该字段的值，所以我们继续循环，重新获取该字段的值，然后再次尝试进行 CAS 操作。

这里使用的是**do-while 循环**。这种循环不多见，它的目的是**保证循环体内的语句至少会被执行一遍**。这样才能保证 return 的值是我们期望的值。

JDK 9 及其以后版本中，getAndAddInt 方法和 JDK 8 中的实现有所不同，我们就拿 JDK 11 的源码来做一个对比吧：

```java
@HotSpotIntrinsicCandidate
public final int getAndAddInt(Object o, long offset, int delta) {
    int v;
    do {
        v = getIntVolatile(o, offset);
    } while (!weakCompareAndSetInt(o, offset, v, v + delta));
    return v;
}
```

这个方法上面增加了 `@HotSpotIntrinsicCandidate` 注解。这个注解允许 HotSpot VM 自己来写汇编或 IR 编译器来实现该方法以提供更加的性能。

> IR（Intermediate Representation）是一种用于帮助优化编译器的中间代码表示方法。编译器通常将源代码首先转化为 IR，然后对 IR 进行各种优化，最后将优化后的 IR 转化为目标代码。在 JVM（Java Virtual Machine）中，JIT（Just-In-Time）编译器将 Java 字节码（即.class 文件的内容）转化为 IR，然后对 IR 进行优化，最后将 IR 编译为机器码。这个过程在 Java 程序运行时进行，因此被称为“即时编译”。JVM 中的 C1 和 C2 编译器就是 IR 编译器。C1 编译器在编译时进行一些简单的优化，然后快速地将 IR 编译为机器码。C2 编译器在编译时进行更深入的优化，以获得更高的执行效率，但编译的时间也相对更长。

也就是说，虽然表面上看到的是 weakCompareAndSet 和 compareAndSet，但是不排除 HotSpot VM 会手动来实现 weakCompareAndSet 真正功能的可能性。

简单来说，`weakCompareAndSet` 操作仅保留了`volatile` 自身变量的特性，而除去了 happens-before 规则带来的内存语义。换句话说，`weakCompareAndSet`**无法保证处理操作目标的 volatile 变量外的其他变量的执行顺序（编译器和处理器为了优化程序性能而对指令序列进行重新排序），同时也无法保证这些变量的可见性。** 但这在一定程度上可以提高性能。

再回到循环条件上来，可以看到它是在不断尝试去用 CAS 更新。如果更新失败，就继续重试。

为什么要把获取“旧值”v 的操作放到循环体内呢？

这也好理解。前面我们说了，CAS 如果旧值 V 不等于预期值 E，就会更新失败。说明旧的值发生了变化。那我们当然需要返回的是被其他线程改变之后的旧值了，因此放在了 do 循环体内。

## CAS 的三大问题

尽管 CAS 提供了一种有效的同步手段，但也存在一些问题，主要有以下三个：ABA 问题、长时间自旋、多个共享变量的原子操作。

### ABA 问题

所谓的 ABA 问题，就是一个值原来是 A，变成了 B，又变回了 A。这个时候使用 CAS 是检查不出变化的，但实际上却被更新了两次。

ABA 问题的解决思路是在变量前面追加上**版本号或者时间戳**。从 JDK 1.5 开始，JDK 的 atomic 包里提供了一个类`AtomicStampedReference`类来解决 ABA 问题。

这个类的`compareAndSet`方法的作用是首先检查当前引用是否等于预期引用，并且检查当前标志是否等于预期标志，如果二者都相等，才使用 CAS 设置为新的值和标志。

```java
public boolean compareAndSet(V   expectedReference,
                              V   newReference,
                              int expectedStamp,
                              int newStamp) {
    Pair<V> current = pair;
    return
        expectedReference == current.reference &&
        expectedStamp == current.stamp &&
        ((newReference == current.reference &&
          newStamp == current.stamp) ||
          casPair(current, Pair.of(newReference, newStamp)));
}
```

先来看参数：

- expectedReference：预期引用，也就是你认为原本应该在那个位置的引用。
- newReference：新引用，如果预期引用正确，将被设置到该位置的新引用。
- expectedStamp：预期标记，这是你认为原本应该在那个位置的标记。
- newStamp：新标记，如果预期标记正确，将被设置到该位置的新标记。

执行流程：

①、`Pair<V> current = pair;` 这行代码获取当前的 pair 对象，其中包含了引用和标记。

②、接下来的 return 语句做了几个检查：

- `expectedReference == current.reference && expectedStamp == current.stamp`：首先检查当前的引用和标记是否和预期的引用和标记相同。如果二者中有任何一个不同，这个方法就会返回 false。
- 如果上述检查通过，也就是说当前的引用和标记与预期的相同，那么接下来就会检查新的引用和标记是否也与当前的相同。如果相同，那么实际上没有必要做任何改变，这个方法就会返回 true。
- 如果新的引用或者标记与当前的不同，那么就会调用 casPair 方法来尝试更新 pair 对象。casPair 方法会尝试用 newReference 和 newStamp 创建的新的 Pair 对象替换当前的 pair 对象。如果替换成功，casPair 方法会返回 true；如果替换失败（也就是说在尝试替换的过程中，pair 对象已经被其他线程改变了），casPair 方法会返回 false。

### 长时间自旋

CAS 多与自旋结合。如果自旋 CAS 长时间不成功，会占用大量的 CPU 资源。

解决思路是让 JVM 支持处理器提供的**pause 指令**。

pause 指令能让自旋失败时 cpu 睡眠一小段时间再继续自旋，从而使得读操作的频率降低很多，为解决内存顺序冲突而导致的 CPU 流水线重排的代价也会小很多。

### 多个共享变量的原子操作

当对一个共享变量执行操作时，CAS 能够保证该变量的原子性。但是对于多个共享变量，CAS 就无法保证操作的原子性，这时通常有两种做法：

1. 使用`AtomicReference`类保证对象之间的原子性，把多个变量放到一个对象里面进行 CAS 操作；
2. 使用锁。锁内的临界区代码可以保证只有当前线程能操作。

## 小结

CAS（Compare-and-Swap）是一种被广泛应用在并发控制中的算法，它是一种乐观锁的实现方式。CAS 全称为“比较并交换”，是一种无锁的原子操作。

CAS 的全称是：比较并交换（Compare And Swap）。在 CAS 中，有这样三个值：

- V：要更新的变量(var)
- E：预期值(expected)
- N：新值(new)

比较并交换的过程如下：

判断 V 是否等于 E，如果等于，将 V 的值设置为 N；如果不等，说明已经有其它线程更新了 V，于是当前线程放弃更新，什么都不做。

这里的**预期值 E 本质上指的是“旧值”**。

CAS 虽好，但也有一些问题，比如说 ABA 问题、循环时间长开销大、只能保证一个共享变量的原子操作等。在开发中，我们要根据实际情况来选择使用 CAS 还是使用锁。

> 编辑：沉默王二，编辑前的内容来源于朋友开源的这个仓库：[深入浅出 Java 多线程](http://concurrent.redspider.group/)，强烈推荐。

---

GitHub 上标星 9300+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第二份 PDF 《[并发编程小册](https://javabetter.cn/thread/)》终于来了！包括线程的基本概念和使用方法、Java的内存模型、sychronized、volatile、CAS、AQS、ReentrantLock、线程池、并发容器、ThreadLocal、生产者消费者模型等面试和开发必须掌握的内容，共计 15 万余字，200+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，二哥的并发编程进阶之路.pdf](https://javabetter.cn/thread/)

[加入二哥的编程星球](https://javabetter.cn/thread/)，在星球的第二个置顶帖「[知识图谱](https://javabetter.cn/thread/)」里就可以获取 PDF 版本。

![](https://cdn.tobebetterjavaer.com/stutymore/wangzhe-thread-20230904125125.png)
