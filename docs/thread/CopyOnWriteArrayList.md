---
title: 吊打Java并发面试官之CopyOnWriteArrayList
shortTitle: CopyOnWriteArrayList
description: 吊打Java并发面试官之CopyOnWriteArrayList
category:
  - Java核心
tag:
  - Java并发编程
head:
  - - meta
    - name: keywords
      content: Java,并发编程,多线程,Thread,CopyOnWriteArrayList
---

## CopyOnWriteArrayList的简介

java学习者都清楚ArrayList并不是线程安全的，在读线程在读取ArrayList的时候如果有写线程在写数据的时候，基于fast-fail机制，会抛出**ConcurrentModificationException**异常，也就是说ArrayList并不是一个线程安全的容器，当然您可以用Vector,或者使用Collections的静态方法将ArrayList包装成一个线程安全的类，但是这些方式都是采用java关键字synchronzied对方法进行修饰，利用独占式锁来保证线程安全的。但是，由于独占式锁在同一时刻只有一个线程能够获取到对象监视器，很显然这种方式效率并不是太高。

回到业务场景中，有很多业务往往是读多写少的，比如系统配置的信息，除了在初始进行系统配置的时候需要写入数据，其他大部分时刻其他模块之后对系统信息只需要进行读取，又比如白名单，黑名单等配置，只需要读取名单配置然后检测当前用户是否在该配置范围以内。

类似的还有很多业务场景，它们都是属于**读多写少**的场景。如果在这种情况用到上述的方法，使用Vector,Collections转换的这些方式是不合理的，因为尽管多个读线程从同一个数据容器中读取数据，但是读线程对数据容器的数据并不会发生发生修改。

很自然而然的我们会联想到ReenTrantReadWriteLock，通过**读写分离**的思想，使得读读之间不会阻塞，无疑如果一个list能够做到被多个读线程读取的话，性能会大大提升不少。但是，如果仅仅是将list通过读写锁（ReentrantReadWriteLock）进行再一次封装的话，由于读写锁的特性，当写锁被写线程获取后，读写线程都会被阻塞。如果仅仅使用读写锁对list进行封装的话，这里仍然存在读线程在读数据的时候被阻塞的情况，如果想list的读效率更高的话，这里就是我们的突破口，如果我们保证读线程无论什么时候都不被阻塞，效率岂不是会更高？

Doug Lea大师就为我们提供CopyOnWriteArrayList容器可以保证线程安全，保证读读之间在任何时候都不会被阻塞，CopyOnWriteArrayList也被广泛应用于很多业务场景之中，CopyOnWriteArrayList值得被我们好好认识一番。

## COW的设计思想 

回到上面所说的，如果简单的使用读写锁的话，在写锁被获取之后，读写线程被阻塞，只有当写锁被释放后读线程才有机会获取到锁从而读到最新的数据，站在**读线程的角度来看，即读线程任何时候都是获取到最新的数据，满足数据实时性**。

既然我们说到要进行优化，必然有trade-off,我们就可以**牺牲数据实时性满足数据的最终一致性即可**。而CopyOnWriteArrayList就是通过Copy-On-Write(COW)，即写时复制的思想来通过延时更新的策略来实现数据的最终一致性，并且能够保证读线程间不阻塞。

COW通俗的理解是当我们往一个容器添加元素的时候，不直接往当前容器添加，而是先将当前容器进行Copy，复制出一个新的容器，然后新的容器里添加元素，添加完元素之后，再将原容器的引用指向新的容器。

对CopyOnWrite容器进行并发的读的时候，不需要加锁，因为当前容器不会添加任何元素。所以CopyOnWrite容器也是一种读写分离的思想，延时更新的策略是通过在写的时候针对的是不同的数据容器来实现的，放弃数据实时性达到数据的最终一致性。

## CopyOnWriteArrayList的实现原理 

现在我们来通过看源码的方式来理解CopyOnWriteArrayList，实际上CopyOnWriteArrayList内部维护的就是一个数组

```java
/** The array, accessed only via getArray/setArray. */
private transient volatile Object[] array;
```  
  
并且该数组引用是被volatile修饰，注意这里**仅仅是修饰的是数组引用**，其中另有玄机，稍后揭晓。关于volatile很重要的一条性质是它能够够保证可见性。对list来说，我们自然而然最关心的就是读写的时候，分别为get和add方法的实现。

### get方法实现原理 

get方法的源码为：

```java
public E get(int index) {
    return get(getArray(), index);
}
/**
 * Gets the array.  Non-private so as to also be accessible
 * from CopyOnWriteArraySet class.
 */
final Object[] getArray() {
    return array;
}
private E get(Object[] a, int index) {
    return (E) a[index];
}
```  

可以看出来get方法实现非常简单，几乎就是一个“单线程”程序，没有对多线程添加任何的线程安全控制，也没有加锁也没有CAS操作等等，原因是，所有的读线程只是会读取数据容器中的数据，并不会进行修改。

### add方法实现原理

再来看下如何进行添加数据的？add方法的源码为：

```java
public boolean add(E e) {
    final ReentrantLock lock = this.lock;
	  //1. 使用Lock,保证写线程在同一时刻只有一个
    lock.lock();

    try {
				//2. 获取旧数组引用
        Object[] elements = getArray();
        int len = elements.length;

				//3. 创建新的数组，并将旧数组的数据复制到新数组中
        Object[] newElements = Arrays.copyOf(elements, len + 1);

				//4. 往新数组中添加新的数据	        
				newElements[len] = e;

				//5. 将旧数组引用指向新的数组
        setArray(newElements);
        return true;
    } finally {
        lock.unlock();
    }
}
```

add方法的逻辑也比较容易理解，请看上面的注释。需要注意这么几点：

1. 采用ReentrantLock，保证同一时刻只有一个写线程正在进行数组的复制，否则的话内存中会有多份被复制的数据；
2. 前面说过数组引用是volatile修饰的，因此将旧的数组引用指向新的数组，根据volatile的happens-before规则，写线程对数组引用的修改对读线程是可见的。
3. 由于在写数据的时候，是在新的数组中插入数据的，从而保证读写实在两个不同的数据容器中进行操作。

## 总结

我们知道COW和读写锁都是通过读写分离的思想实现的，但两者还是有些不同，可以进行比较：

### **COW  vs 读写锁**

相同点：

1. 两者都是通过读写分离的思想实现；
2. 读线程间是互不阻塞的

不同点：

对读线程而言，为了实现数据实时性，在写锁被获取后，读线程会等待或者当读锁被获取后，写线程会等待，从而解决“脏读”等问题。也就是说如果使用读写锁依然会出现读线程阻塞等待的情况。

而COW则完全放开了牺牲数据实时性而保证数据最终一致性，即读线程对数据的更新是延时感知的，因此读线程不会存在等待的情况。

对这一点从文字上还是很难理解，我们来通过debug看一下，add方法核心代码为：

```java
1.Object[] elements = getArray();
2.int len = elements.length;
3.Object[] newElements = Arrays.copyOf(elements, len + 1);
4.newElements[len] = e;
5.setArray(newElements);
```

假设COW的变化如下图所示：

![最终一致性的分析](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/CopyOnWriteArrayList-01.png)

数组中已有数据1,2,3，现在写线程想往数组中添加数据4，我们在第5行处打上断点，让写线程暂停。读线程依然会“不受影响”的能从数组中读取数据，可是还是只能读到1,2,3。**如果读线程能够立即读到新添加的数据的话就叫做能保证数据实时性**。当对第5行的断点放开后，读线程才能感知到数据变化，读到完整的数据1,2,3,4，而保证**数据最终一致性**，尽管有可能中间间隔了好几秒才感知到。

这里还有这样一个问题： **为什么需要复制呢？ 如果将array 数组设定为volitile的， 对volatile变量写happens-before读，读线程不是能够感知到volatile变量的变化**。

原因是，这里volatile的修饰的**仅仅**只是**数组引用**，**数组中的元素的修改是不能保证可见性的**。因此COW采用的是新旧两个数据容器，通过第5行代码将数组引用指向新的数组。

### **COW的缺点**

CopyOnWrite容器有很多优点，但是同时也存在两个问题，即内存占用问题和数据一致性问题。所以在开发的时候需要注意一下。

1. **内存占用问题**：因为CopyOnWrite的写时复制机制，所以在进行写操作的时候，内存里会同时驻扎两个对	象的内存，旧的对象和新写入的对象（注意:在复制的时候只是复制容器里的引用，只是在写的时候会创建新对	象添加到新容器里，而旧容器的对象还在使用，所以有两份对象内存）。

如果这些对象占用的内存比较大，比	如说200M左右，那么再写入100M数据进去，内存就会占用300M，那么这个时候很有可能造成频繁的minor GC和major GC。

2. **数据一致性问题**：CopyOnWrite容器只能保证数据的最终一致性，不能保证数据的实时一致性。所以如果你希望写入的的数据，马上能读到，请不要使用CopyOnWrite容器。

---

>编辑：沉默王二，内容大部分来源以下三个开源仓库：
>- [深入浅出 Java 多线程](http://concurrent.redspider.group/)
>- [并发编程知识总结](https://github.com/CL0610/Java-concurrency)
>- [Java八股文](https://github.com/CoderLeixiaoshuai/java-eight-part)

----

GitHub 上标星 7600+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 7600+ 的 Java 教程](https://tobebetterjavaer.com/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
