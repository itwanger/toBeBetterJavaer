---
title: 吊打Java并发面试官之CopyOnWriteArrayList
shortTitle: CopyOnWriteArrayList
description: CopyOnWriteArrayList 是一个线程安全的变体，它是 Java 的 ArrayList 类的并发版本。这个类的线程安全是通过一个简单但强大的想法实现的：每当列表修改时，就创建列表的一个新副本。
category:
  - Java核心
tag:
  - Java并发编程
head:
  - - meta
    - name: keywords
      content: Java,并发编程,多线程,Thread,CopyOnWriteArrayList
---

# 第二十三节：并发容器 CopyOnWriteArrayList

学过 [ArrayList](https://javabetter.cn/collection/arraylist.html) 的小伙伴应该记得，ArrayList 是一个线程不安全的容器，如果在多线程环境下使用，需要手动加锁，或者使用 `Collections.synchronizedList()` 方法将其转换为线程安全的容器。

否则，将会出现 [ConcurrentModificationException](https://javabetter.cn/collection/fail-fast.html) 异常。

于是，Doug Lea 大师为我们提供了一个并发版本的 ArrayList——CopyOnWriteArrayList。

CopyOnWriteArrayList 是线程安全的，可以在多线程环境下使用。CopyOnWriteArrayList 遵循写时复制的原则，每当对列表进行修改（例如添加、删除或更改元素）时，都会创建列表的一个新副本，这个新副本会替换旧的列表，而对旧列表的所有读取操作仍然可以继续。

由于在修改时创建了新的副本，所以读取操作不需要锁定。这使得在多读取者和少写入者的情况下读取操作非常高效。当然，由于每次写操作都会创建一个新的数组副本，所以会增加存储和时间的开销。如果写操作非常频繁，性能会受到影响。

## 什么是 CopyOnWrite

大家应该还记得读写锁 [ReentrantReadWriteLock](https://javabetter.cn/thread/ReentrantReadWriteLock.html) 吧？读写锁是通过读写分离的思想来实现的，即读写锁将读写操作分别加锁，从而实现读写操作的并发执行。

但是，读写锁也存在一些问题，比如说在写锁执行后，读线程会被阻塞，直到写锁被释放后读线程才有机会获取到锁从而读到最新的数据，站在**读线程的角度来看，读线程在任何时候都能获取到最新的数据，满足数据实时性**。

而 CopyOnWriteArrayList 是通过 Copy-On-Write(COW)，即写时复制的思想来通过延时更新的策略实现数据的最终一致性，并且能够保证读线程间不阻塞。当然，**这要牺牲数据的实时性**。

通俗的讲，CopyOnWrite 就是当我们往一个容器添加元素的时候，不直接往容器中添加，而是先复制出一个新的容器，然后在新的容器里添加元素，添加完之后，再将原容器的引用指向新的容器。多个线程在读的时候，不需要加锁，因为当前容器不会添加任何元素。

我们在介绍[并发容器](https://javabetter.cn/thread/map.html)的时候，也曾提到过，相信大家都还有印象。

## CopyOnWriteArrayList原理

OK，接下来我们来看一下 CopyOnWriteArrayList 的源码。顾名思义，实际上 CopyOnWriteArrayList 内部维护的就是一个数组：

```java
/** The array, accessed only via getArray/setArray. */
private transient volatile Object[] array;
```

该数组被 [volatile](https://javabetter.cn/thread/volatile.html) 修饰，能够保证数据的内存可见性。

### get 方法

get 方法的源码如下：

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

get 方法的实现非常简单，几乎就是一个“单线程”，没有添加任何的线程安全控制，没有[加锁](https://javabetter.cn/thread/lock.html)也没有 [CAS](https://javabetter.cn/thread/cas.html) 操作，原因就是所有的读线程只会读取容器中的数据，并不会进行修改。

### add 方法

add 方法的源码如下：

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

add 方法的逻辑也比较容易理解，需要注意这么几点：

01、采用 [ReentrantLock](https://javabetter.cn/thread/reentrantLock.html) 保证同一时刻只有一个写线程正在进行数组的复制；

02、通过调用 `getArray()` 方法获取旧的数组。

```java
final Object[] getArray() {
    return array;
}
```


03、然后创建一个新的数组，把旧的数组复制过来，然后在新的数组中添加数据，再将新的数组赋值给旧的数组引用。

```java
final void setArray(Object[] a) {
    array = a;
}
```

根据 volatile 的 happens-before 规则，所以这个更改对所有线程是立即可见的。

04、最后，在 finally 块中释放锁，以便其他线程可以访问和修改列表。

## CopyOnWriteArrayList 的使用

CopyOnWriteArrayList 的使用非常简单，和 ArrayList 的使用几乎一样，只是在创建对象的时候需要使用 CopyOnWriteArrayList 的构造方法，如下所示：

```java
CopyOnWriteArrayList<String> list = new CopyOnWriteArrayList<>();
list.add("element1");
list.add("element2");

for (String element : list) {
    System.out.println(element);
}
```

## CopyOnWriteArrayList 的缺点

CopyOnWrite 容器有很多优点，但是同时也存在两个问题，即内存占用问题和数据一致性问题。所以在开发的时候需要特别注意。

1. **内存占用问题**：因为 CopyOnWrite 的写时复制机制，在进行写操作的时候，内存里会同时有两个对象，旧的对象和新写入的对象，分析 add 方法的时候大家都看到了。

如果这些对象占用的内存比较大，比如说 200M 左右，那么再写入 100M 数据进去，内存就会占用 600M，那么这时候就会造成频繁的 minor GC 和 major GC。

1. **数据一致性问题**：CopyOnWrite 容器只能保证数据的最终一致性，不能保证数据的实时一致性。所以如果你希望写入的的数据，马上能读到，请不要使用 CopyOnWrite 容器，最好通过 [ReentrantReadWriteLock](https://javabetter.cn/thread/ReentrantReadWriteLock.html) 自定义一个的列表。

我们来比较一下 CopyOnWrite 和读写锁。

相同点：

1. 两者都是通过读写分离的思想来实现的；
2. 读线程间是互不阻塞的

不同点：

为了实现数据实时性，在写锁被获取后，读线程会阻塞；或者当读锁被获取后，写线程会阻塞，从而解决“脏读”的问题。而 CopyOnWrite 对数据的更新是写时复制的，因此读线程是延时感知的，单不会存在阻塞的情况。

对这一点从文字上可能比较难理解，我们通过 debug 来看一下，add 方法核心代码为：

```java
1.Object[] elements = getArray();
2.int len = elements.length;
3.Object[] newElements = Arrays.copyOf(elements, len + 1);
4.newElements[len] = e;
5.setArray(newElements);
```

假设 COW 的变化如下图所示：

![最终一致性的分析](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/CopyOnWriteArrayList-01.png)

数组中已有数据 1,2,3，现在写线程想往数组中添加数据 4，我们在第 5 行处打上断点，让写线程暂停。

此时，读线程依然会“不受影响”的从数组中读取数据，可是还是只能读到 1,2,3。

**如果读线程能够立即读到新添加的数据就叫数据实时性**。当对第 5 行的断点放开后，读线程感知到了数据的变化，所以读到了完整的数据 1,2,3,4，这叫**数据最终一致性**，尽管有可能中间间隔了好几秒才感知到。

## 小结

CopyOnWriteArrayList 是一个线程安全的变体，它是 Java 的 ArrayList 类的并发版本。这个类的线程安全是通过一个简单但强大的想法实现的：每当列表修改时，就创建列表的一个新副本。

CopyOnWriteArrayList 适用于读操作远远大于写操作的场景，比如说缓存。因为 CopyOnWriteArrayList 采用写时复制的思想，所以写操作的性能较低，因此不适合写操作频繁的场景。

CopyOnWriteArrayList 也存在一些缺点，比如说内存占用问题和数据一致性问题，所以在开发的时候需要特别注意。


> 编辑：沉默王二，部分内容来自于CL0610的 GitHub 仓库[https://github.com/CL0610/Java-concurrency](https://github.com/CL0610/Java-concurrency/blob/master/20.%E5%B9%B6%E5%8F%91%E5%AE%B9%E5%99%A8%E4%B9%8BArrayBlockingQueue%E5%92%8CLinkedBlockingQueue%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86%E8%AF%A6%E8%A7%A3/%E5%B9%B6%E5%8F%91%E5%AE%B9%E5%99%A8%E4%B9%8BArrayBlockingQueue%E5%92%8CLinkedBlockingQueue%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86%E8%AF%A6%E8%A7%A3.md)。

---

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第二份 PDF 《[并发编程小册](https://javabetter.cn/thread/)》终于来了！包括线程的基本概念和使用方法、Java的内存模型、sychronized、volatile、CAS、AQS、ReentrantLock、线程池、并发容器、ThreadLocal、生产者消费者模型等面试和开发必须掌握的内容，共计 15 万余字，200+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，二哥的并发编程进阶之路.pdf](https://javabetter.cn/thread/)

[加入二哥的编程星球](https://javabetter.cn/thread/)，在星球的第二个置顶帖「[知识图谱](https://javabetter.cn/thread/)」里就可以获取 PDF 版本。

![](https://cdn.tobebetterjavaer.com/stutymore/wangzhe-thread-20230904125125.png)
