---
title: 吊打Java并发面试官之ConcurrentHashMap（线程安全的哈希表）
shortTitle: ConcurrentHashMap
description: ConcurrentHashMap 是 Java 并发包 (java.util.concurrent) 中的一种线程安全的哈希表实现。它通过分段锁技术或更先进的并发控制技术，使得多个线程可以同时读写映射，从而提高了性能
category:
  - Java核心
tag:
  - Java并发编程
head:
  - - meta
    - name: keywords
      content: Java,并发编程,多线程,Thread,ConcurrentHashMap
---

# 第二十节：并发容器 ConcurrentHashMap

ConcurrentHashMap 是 Java 并发包 (java.util.concurrent) 中的一种线程安全的哈希表实现。

[HashMap](https://javabetter.cn/collection/hashmap.html) 在多线程环境下扩容会出现 CPU 接近 100% 的情况，因为 HashMap 并不是线程安全的，我们可以通过 Collections 的`Map<K,V> synchronizedMap(Map<K,V> m)`将 HashMap 包装成一个线程安全的 map。

比如 SynchronzedMap 的 put 方法源码就是加锁过的：

```java
public V put(K key, V value) {
    synchronized (mutex) {return m.put(key, value);}
}
```

[synchronized 同步代码块](https://javabetter.cn/thread/synchronized-1.html)的方式我们前面也讲过了，大家应该都还有印象。

不过，这并不是最优雅的方式。Doug Lea 大师不遗余力的为我们创造了一些线程安全的并发容器，让每一个 Java 开发人员都倍感幸福。相对于 HashMap，ConcurrentHashMap 就是线程安全的 map，其中**利用了锁分段的思想大大提高了并发的效率**。

在介绍[并发容器](https://javabetter.cn/thread/map.html)的时候，我们也曾提到过 ConcurrentHashMap，它从 JDK 1.8 开始有了较大的变化，光是代码量就足足增加了很多。

1.8 版本舍弃了 segment，并且使用了大量的 [synchronized](https://javabetter.cn/thread/synchronized.html)，以及 [CAS 无锁操作](https://javabetter.cn/thread/cas.html)以保证 ConcurrentHashMap 的线程安全性。

为什么不用 [ReentrantLock](https://javabetter.cn/thread/reentrantLock.html) 而是 synchronzied 呢？

实际上，synchronzied 做了很多的优化，[这个我们前面也讲过了](https://javabetter.cn/thread/synchronized.html)，包括偏向锁、轻量级锁、重量级锁，可以依次向上升级锁状态，因此，synchronized 相较于 ReentrantLock 的性能其实差不多，甚至在某些情况更优。

## ConcurrentHashMap 的变化

ConcurrentHashMap 在 JDK 1.7 和 JDK 1.8 中有一些区别。这里我们分开介绍一下。

### JDK 1.7

ConcurrentHashMap 在 JDK 1.7 中，提供了一种粒度更细的加锁机制，这种机制叫分段锁「Lock Striping」。整个哈希表被分为多个段，每个段都独立锁定。读取操作不需要锁，写入操作仅锁定相关的段。这减小了锁冲突的几率，从而提高了并发性能。

这种机制的优点：在并发环境下将实现更高的吞吐量，而在单线程环境下只损失非常小的性能。

可以这样理解分段锁，就是**将数据分段，对每一段数据分配一把锁**。当一个线程占用锁访问其中一个段数据的时候，其他段的数据也能被其他线程访问。

有些方法需要跨段，比如 `size()`、`isEmpty()`、`containsValue()`，它们可能需要锁定整个表而不仅仅是某个段，这需要按顺序锁定所有段，操作完后，再按顺序释放所有段的锁。如下图：

![](https://cdn.tobebetterjavaer.com/stutymore/map-20230816155810.png)

ConcurrentHashMap 是由 Segment 数组结构和 HashEntry 数组构成的。Segment 是一种可重入的锁 [ReentrantLock](https://javabetter.cn/thread/reentrantLock.html)，HashEntry 则用于存储键值对数据。

一个 ConcurrentHashMap 里包含一个 Segment 数组，Segment 的结构和 HashMap 类似，是一种数组和链表结构，一个 Segment 里包含一个 HashEntry 数组，每个 HashEntry 是一个链表结构的元素，每个 Segment 守护着一个 HashEntry 数组里的元素，当对 HashEntry 数组的数据进行修改时，必须首先获得它对应的 Segment 锁。

单一的 Segment 结构如下：

![](https://cdn.tobebetterjavaer.com/stutymore/map-20230816160155.png)

像这样的 Segment 对象，在 ConcurrentHashMap 集合中有多少个呢？有 2 的 N 次方个，共同保存在一个名为 segments 的数组当中。 因此整个 ConcurrentHashMap 的结构如下：

![](https://cdn.tobebetterjavaer.com/stutymore/map-20230816160223.png)

可以说，ConcurrentHashMap 是一个二级哈希表。在一个总的哈希表下面，有若干个子哈希表。

Case1：不同 Segment 的并发写入（可以并发执行）

![](https://cdn.tobebetterjavaer.com/stutymore/map-20230816160301.png)

Case2：同一 Segment 的一写一读（可以并发执行）

![](https://cdn.tobebetterjavaer.com/stutymore/map-20230816160316.png)

Case3：同一 Segment 的并发写入

![](https://cdn.tobebetterjavaer.com/stutymore/map-20230816160331.png)

Segment 的写入是需要上锁的，因此对同一 Segment 的并发写入会被阻塞。

由此可见，ConcurrentHashMap 中每个 Segment 各自持有一把锁。在保证线程安全的同时降低了锁的粒度，让并发操作效率更高。

ConcurrentHashMap 读写过程如下：

get 方法

- 为输入的 Key 做 Hash 运算，得到 hash 值。
- 通过 hash 值，定位到对应的 Segment 对象
- 再次通过 hash 值，定位到 Segment 当中数组的具体位置。

put 方法

- 为输入的 Key 做 Hash 运算，得到 hash 值。
- 通过 hash 值，定位到对应的 Segment 对象
- 获取可重入锁
- 再次通过 hash 值，定位到 Segment 当中数组的具体位置。
- 插入或覆盖 HashEntry 对象。
- 释放锁。

### JDK 1.8

而在 JDK 1.8 中，ConcurrentHashMap 主要做了两个优化：

- 同 [HashMap](https://javabetter.cn/collection/hashmap.html) 一样，链表也会在长度达到 8 的时候转化为红黑树，这样可以提升大量冲突时候的查询效率；
- 以某个位置的头结点（链表的头结点或红黑树的 root 结点）为锁，配合自旋+ [CAS](https://javabetter.cn/thread/cas.html) 避免不必要的锁开销，进一步提升并发性能。

![](https://cdn.tobebetterjavaer.com/stutymore/map-20230816155924.png)

相比 JDK1.7 中的 ConcurrentHashMap，JDK1.8 中的 ConcurrentHashMap 取消了 Segment 分段锁，采用 CAS + synchronized 来保证并发安全性，整个容器只分为一个 Segment，即 table 数组。

JDK1.8 中的 ConcurrentHashMap 对节点 Node 类中的共享变量，和 JDK1.7 一样，使用 volatile 关键字，保证多线程操作时，变量的可见性！

```java
static class Node<K,V> implements Map.Entry<K,V> {
    final int hash;
    final K key;
    volatile V val;
    volatile Node<K,V> next;

    Node(int hash, K key, V val, Node<K,V> next) {
        this.hash = hash;
        this.key = key;
        this.val = val;
        this.next = next;
    }
......
}
```

## ConcurrentHashMap 的字段

1、**table**，`volatile Node<K,V>[] table`:

装载 Node 的数组，作为 ConcurrentHashMap 的底层容器，采用懒加载的方式，直到第一次插入数据的时候才会进行初始化操作，[数组的大小总是为 2 的幂次方](https://javabetter.cn/collection/hashmap.html)，讲 HashMap 的时候讲过。

2、**nextTable**，`volatile Node<K,V>[] nextTable`

扩容时使用，平时为 null，只有在扩容的时候才为非 null

3、**sizeCtl**，`volatile int sizeCtl`

该属性用来控制 table 数组的大小，根据是否初始化和是否正在扩容有几种情况：

- **当值为负数时：** 如果为-1 表示正在初始化，如果为 -N 则表示当前正有 N-1 个线程进行扩容操作；
- **当值为正数时：** 如果当前数组为 null 的话表示 table 在初始化过程中，sizeCtl 表示为需要新建数组的长度；若已经初始化了，表示当前数据容器（table 数组）可用容量，也可以理解成临界值（插入节点数超过了该临界值就需要扩容），具体指为数组的长度 n 乘以 加载因子 loadFactor；
- 当值为 0 时，即数组长度为默认初始值。

4、`sun.misc.Unsafe U`

在 ConcurrentHashMap 的实现中，可以看到用了大量的 `U.compareAndSwapXXXX` 方法去修改 ConcurrentHashMap 的一些属性。

这些方法实际上是利用了 [CAS 算法](https://javabetter.cn/thread/cas.html)用于保证线程安全性，这是一种乐观策略：假设每一次操作都不会产生冲突，当且仅当冲突发生的时候再去尝试。

[我们前面也讲过了](https://javabetter.cn/thread/cas.html)，CAS 操作依赖于现代处理器指令集，通过底层的**CMPXCHG**指令实现。`CAS(V,O,N)`核心思想为：**若当前变量实际值 V 与期望的旧值 O 相同，则表明该变量没被其他线程进行修改，因此可以安全的将新值 N 赋值给变量；若当前变量实际值 V 与期望的旧值 O 不相同，则表明该变量已经被其他线程做了处理，此时将新值 N 赋给变量操作就是不安全的，在进行重试**。

在并发容器中，CAS 是通过`sun.misc.Unsafe`类实现的，该类提供了一些可以直接操控内存和线程的底层操作，可以理解为 Java 中的“指针”。该成员变量的获取是在[静态代码块](https://javabetter.cn/oo/static.html)中：

```java
static {
    try {
        U = sun.misc.Unsafe.getUnsafe();
		.......
    } catch (Exception e) {
        throw new Error(e);
    }
}
```

## ConcurrentHashMap 的内部类

### 1、Node

Node 类实现了 Map.Entry 接口，主要存放 key-value 对，并且具有 next 域

```java
static class Node<K,V> implements Map.Entry<K,V> {
    final int hash;
    final K key;
    volatile V val;
    volatile Node<K,V> next;
    ......
}
```

另外可以看出很多属性都是用 [volatile 关键字](https://javabetter.cn/thread/volatile.html)修饰的，也是为了保证内存可见性。

### 2、TreeNode

树节点，继承于承载数据的 Node 类。红黑树的操作是针对 TreeBin 类的，从该类的注释也可以看出，TreeBin 是对 TreeNode 的再一次封装，下面会提到。

```java
**
 * Nodes for use in TreeBins
 */
static final class TreeNode<K,V> extends Node<K,V> {
        TreeNode<K,V> parent;  // red-black tree links
        TreeNode<K,V> left;
        TreeNode<K,V> right;
        TreeNode<K,V> prev;    // needed to unlink next upon deletion
        boolean red;
		......
}
```

### 3、TreeBin

这个类并不负责用户的 key、value 信息，而是封装了很多 TreeNode 节点。实际的 ConcurrentHashMap “数组”中，存放的都是 TreeBin 对象，而不是 TreeNode 对象。

```java
static final class TreeBin<K,V> extends Node<K,V> {
        TreeNode<K,V> root;
        volatile TreeNode<K,V> first;
        volatile Thread waiter;
        volatile int lockState;
        // values for lockState
        static final int WRITER = 1; // set while holding write lock
        static final int WAITER = 2; // set when waiting for write lock
        static final int READER = 4; // increment value for setting read lock
		......
}
```

### 4、ForwardingNode

在扩容时会出现的特殊节点，其 key、value、hash 全部为 null。并拥有 nextTable 引用的新 table 数组。

```java
static final class ForwardingNode<K,V> extends Node<K,V> {
    final Node<K,V>[] nextTable;
    ForwardingNode(Node<K,V>[] tab) {
        super(MOVED, null, null, null);
        this.nextTable = tab;
    }
   .....
}
```

## ConcurrentHashMap 的 CAS

ConcurrentHashMap 会大量使用 CAS 来修改它的属性和进行一些操作。因此，在理解 ConcurrentHashMap 的方法前，我们需要了解几个常用的利用 CAS 算法来保障线程安全的操作。

### 1、tabAt

```java
static final <K,V> Node<K,V> tabAt(Node<K,V>[] tab, int i) {
    return (Node<K,V>)U.getObjectVolatile(tab, ((long)i << ASHIFT) + ABASE);
}
```

该方法用来获取 table 数组中索引为 i 的 Node 元素。

### 2、casTabAt

```java
static final <K,V> boolean casTabAt(Node<K,V>[] tab, int i,
                                    Node<K,V> c, Node<K,V> v) {
    return U.compareAndSwapObject(tab, ((long)i << ASHIFT) + ABASE, c, v);
}
```

利用 CAS 操作设置 table 数组中索引为 i 的元素

### 3、setTabAt

```java
static final <K,V> void setTabAt(Node<K,V>[] tab, int i, Node<K,V> v) {
    U.putObjectVolatile(tab, ((long)i << ASHIFT) + ABASE, v);
}
```

该方法用来设置 table 数组中索引为 i 的元素

## ConcurrentHashMap 的方法

### 构造方法

ConcurrentHashMap 一共提供了以下 5 个构造方法：

```java
// 1. 构造一个空的map，即table数组还未初始化，初始化放在第一次插入数据时，默认大小为16
ConcurrentHashMap()
// 2. 给定map的大小
ConcurrentHashMap(int initialCapacity)
// 3. 给定一个map
ConcurrentHashMap(Map<? extends K, ? extends V> m)
// 4. 给定map的大小以及加载因子
ConcurrentHashMap(int initialCapacity, float loadFactor)
// 5. 给定map大小，加载因子以及并发度（预计同时操作数据的线程）
ConcurrentHashMap(int initialCapacity,float loadFactor, int concurrencyLevel)
```

差别请看注释，我们来看看第 2 种构造方法，源码如下：

```java
public ConcurrentHashMap(int initialCapacity) {
	//1. 小于0直接抛异常
    if (initialCapacity < 0)
        throw new IllegalArgumentException();
	//2. 判断是否超过了允许的最大值，超过了话则取最大值，否则再对该值进一步处理
    int cap = ((initialCapacity >= (MAXIMUM_CAPACITY >>> 1)) ?
               MAXIMUM_CAPACITY :
               tableSizeFor(initialCapacity + (initialCapacity >>> 1) + 1));
	//3. 赋值给sizeCtl
    this.sizeCtl = cap;
}
```

这段代码的逻辑请看注释，很容易理解，如果小于 0 就直接抛异常，如果指定值大于所允许的最大值就取最大值，否则再对指定值做进一步处理。最后将 cap 赋值给 sizeCtl。

**当调用构造方法之后，sizeCtl 的大小就代表了 ConcurrentHashMap 的大小，即 table 数组的长度**。

tableSizeFor 做了哪些事情呢？源码如下：

```java
/**
 * Returns a power of two table size for the given desired capacity.
 * See Hackers Delight, sec 3.2
 */
private static final int tableSizeFor(int c) {
    int n = c - 1;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    return (n < 0) ? 1 : (n >= MAXIMUM_CAPACITY) ? MAXIMUM_CAPACITY : n + 1;
}
```

注释写的很清楚，该方法会将构造方法指定的大小转换成一个 2 的幂次方数，也就是说 ConcurrentHashMap 的大小一定是 2 的幂次方，比如，当指定大小为 18 时，为了满足 2 的幂次方特性，实际上 ConcurrentHashMap 的大小为 2 的 5 次方（32）。

另外，需要注意的是，**调用构造方法时并初始化 table 数组，而只算出了 table 数组的长度，当第一次向 ConcurrentHashMap 插入数据时才会真正的完成初始化，并创建 table 数组**。

### initTable 方法

直接上源码：

```java
private final Node<K,V>[] initTable() {
    Node<K,V>[] tab; int sc;
    while ((tab = table) == null || tab.length == 0) {
        if ((sc = sizeCtl) < 0)
			// 1. 保证只有一个线程正在进行初始化操作
            Thread.yield(); // lost initialization race; just spin
        else if (U.compareAndSwapInt(this, SIZECTL, sc, -1)) {
            try {
                if ((tab = table) == null || tab.length == 0) {
					// 2. 得出数组的大小
                    int n = (sc > 0) ? sc : DEFAULT_CAPACITY;
                    @SuppressWarnings("unchecked")
					// 3. 这里才真正的初始化数组
                    Node<K,V>[] nt = (Node<K,V>[])new Node<?,?>[n];
                    table = tab = nt;
					// 4. 计算数组中可用的大小：实际大小n*0.75（加载因子）
                    sc = n - (n >>> 2);
                }
            } finally {
                sizeCtl = sc;
            }
            break;
        }
    }
    return tab;
}
```

代码的逻辑请见注释。

可能存在这样一种情况，多个线程同时进入到这个方法，为了保证能够正确地初始化，第 1 步会先通过 if 进行判断，如果当前已经有一个线程正在初始化，这时候其他线程会调用 `Thread.yield()` 让出 CPU 时间片。

正在进行初始化的线程会调用 `U.compareAndSwapInt` 方法将 sizeCtl 改为 -1，即正在初始化的状态。

另外还需要注意，在第四步中会进一步计算数组中可用的大小，即数组的实际大小 n 乘以加载因子 0.75，0.75 就是四分之三，这里`n - (n >>> 2)`刚好是`n-(1/4)n=(3/4)n`，挺有意思的吧？

如果选择是无参的构造方法，这里在 new Node 数组的时候会使用默认大小`DEFAULT_CAPACITY`（16），然后乘以加载因子 0.75，结果为 12，也就是说数组当前的可用大小为 12。

### put 方法

调用 put 方法时会调用 putVal 方法，源码如下：

```java
/** Implementation for put and putIfAbsent */
final V putVal(K key, V value, boolean onlyIfAbsent) {
    if (key == null || value == null) throw new NullPointerException();
	//1. 计算key的hash值
    int hash = spread(key.hashCode());
    int binCount = 0;
    for (Node<K,V>[] tab = table;;) {
        Node<K,V> f; int n, i, fh;
		//2. 如果当前table还没有初始化先调用initTable方法将tab进行初始化
        if (tab == null || (n = tab.length) == 0)
            tab = initTable();
		//3. tab中索引为i的位置的元素为null，则直接使用CAS将值插入即可
        else if ((f = tabAt(tab, i = (n - 1) & hash)) == null) {
            if (casTabAt(tab, i, null,
                         new Node<K,V>(hash, key, value, null)))
                break;                   // no lock when adding to empty bin
        }
		//4. 当前正在扩容
        else if ((fh = f.hash) == MOVED)
            tab = helpTransfer(tab, f);
        else {
            V oldVal = null;
            synchronized (f) {
                if (tabAt(tab, i) == f) {
					//5. 当前为链表，在链表中插入新的键值对
                    if (fh >= 0) {
                        binCount = 1;
                        for (Node<K,V> e = f;; ++binCount) {
                            K ek;
                            if (e.hash == hash &&
                                ((ek = e.key) == key ||
                                 (ek != null && key.equals(ek)))) {
                                oldVal = e.val;
                                if (!onlyIfAbsent)
                                    e.val = value;
                                break;
                            }
                            Node<K,V> pred = e;
                            if ((e = e.next) == null) {
                                pred.next = new Node<K,V>(hash, key,
                                                          value, null);
                                break;
                            }
                        }
                    }
					// 6.当前为红黑树，将新的键值对插入到红黑树中
                    else if (f instanceof TreeBin) {
                        Node<K,V> p;
                        binCount = 2;
                        if ((p = ((TreeBin<K,V>)f).putTreeVal(hash, key,
                                                       value)) != null) {
                            oldVal = p.val;
                            if (!onlyIfAbsent)
                                p.val = value;
                        }
                    }
                }
            }
			// 7.插入完键值对后再根据实际大小看是否需要转换成红黑树
            if (binCount != 0) {
                if (binCount >= TREEIFY_THRESHOLD)
                    treeifyBin(tab, i);
                if (oldVal != null)
                    return oldVal;
                break;
            }
        }
    }
	//8.对当前容量大小进行检查，如果超过了临界值（实际大小*加载因子）就需要扩容
    addCount(1L, binCount);
    return null;
}
```

ConcurrentHashMap 是一个哈希桶数组，如果不出现哈希冲突的时候，每个元素均匀的分布在哈希桶数组中。当出现哈希冲突的时候，采用**拉链法的解决方案**，将 hash 值相同的节点转换成链表的形式，另外，在 JDK 1.8 版本中，为了防止拉链过长，当链表的长度大于 8 的时候会将链表转换成红黑树。

确定好数组的索引 i 后，可以调用 `tabAt()` 方法获取该位置上的元素，如果当前 Node 为 null 的话，可以直接用 casTabAt 方法将新值插入。

拉链法、确定索引 i 的知识在学习 [HashMap](https://javabetter.cn/collection/hashmap.html) 的时候就讲过，相信大家都还没有忘。

如果当前节点不为 null，且该节点为特殊节点（forwardingNode），就说明当前 concurrentHashMap 正在进行扩容操作。怎么确定当前这个 Node 是特殊节点呢？

通过判断该节点的 hash 值是不是等于 -1（MOVED）：

```java
static final int MOVED     = -1; // hash for forwarding nodes
```

当 `table[i]` 不为 null 并且不是 forwardingNode 时，以及当前 Node 的 hash 值大于`0（fh >= 0）`时，说明当前节点为链表的头节点，那么向 ConcurrentHashMap 插入新值就是向这个链表插入新值。通过 `synchronized (f)` 的方式进行加锁以实现线程安全。

往链表中插入节点的部分代码如下：

```java
if (fh >= 0) {
    binCount = 1;
    for (Node<K,V> e = f;; ++binCount) {
        K ek;
		// 找到hash值相同的key,覆盖旧值即可
        if (e.hash == hash &&
            ((ek = e.key) == key ||
             (ek != null && key.equals(ek)))) {
            oldVal = e.val;
            if (!onlyIfAbsent)
                e.val = value;
            break;
        }
        Node<K,V> pred = e;
        if ((e = e.next) == null) {
			//如果到链表末尾仍未找到，则直接将新值插入到链表末尾即可
            pred.next = new Node<K,V>(hash, key,
                                      value, null);
            break;
        }
    }
}
```

这部分代码很好理解，就两种情况：

1. 如果在链表中找到了与待插入的 key 相同的节点，就直接覆盖；
2. 如果找到链表的末尾都还没找到的话，直接将待插入的键值对追加到链表的末尾。

当链表长度超过 8（默认值）时，链表就转换为红黑树，利用红黑树快速增删改查的特点可以提高 ConcurrentHashMap 的性能：

```java
if (f instanceof TreeBin) {
    Node<K,V> p;
    binCount = 2;
    if ((p = ((TreeBin<K,V>)f).putTreeVal(hash, key,
                                   value)) != null) {
        oldVal = p.val;
        if (!onlyIfAbsent)
            p.val = value;
    }
}
```

这段代码很简单，调用 putTreeVal 方法向红黑树插入新节点，同样的逻辑，**如果在红黑树中存在 Key 相同（hash 值相等并且 equals 方法判断为 true）的节点，就覆盖旧值，否则向红黑树追加新节点**。

当完成数据新节点插入后，会进一步对当前链表大小进行调整：

```java
if (binCount != 0) {
    if (binCount >= TREEIFY_THRESHOLD)
        treeifyBin(tab, i);
    if (oldVal != null)
        return oldVal;
    break;
}
```

至此，put 方法就分析完了，我们来做个总结：

1. 对每一个放入的值，先用 spread 方法对 key 的 hashcode 进行 hash 计算，由此来确定这个值在 table 中的位置；
2. 如果当前 table 数组还未初始化，进行初始化操作；
3. 如果这个位置是 null，那么使用 CAS 操作直接放入；
4. 如果这个位置存在节点，说明发生了 hash 碰撞，先判断这个节点的类型，如果该节点 `==MOVED` 的话，说明正在进行扩容；
5. 如果是链表节点（`fh>0`），先获取头节点，再依次向后遍历确定这个新加入节点的位置。如果遇到 key 相同的节点，直接覆盖。否则在链表尾插入；
6. 如果这个节点的类型是 TreeBin，直接调用红黑树的插入方法插入新的节点；
7. 插入完节点之后再次检查链表的长度，如果长度大于 8，就把这个链表转换成红黑树；
8. 对当前容量大小进行检查，如果超过了临界值（实际大小\*加载因子）就需要扩容。

### get 方法

get 方法的源码如下：

```java
public V get(Object key) {
    Node<K,V>[] tab; Node<K,V> e, p; int n, eh; K ek;
	// 1. 重hash
    int h = spread(key.hashCode());
    if ((tab = table) != null && (n = tab.length) > 0 &&
        (e = tabAt(tab, (n - 1) & h)) != null) {
        // 2. table[i]桶节点的key与查找的key相同，则直接返回
		if ((eh = e.hash) == h) {
            if ((ek = e.key) == key || (ek != null && key.equals(ek)))
                return e.val;
        }
		// 3. 当前节点hash小于0说明为树节点，在红黑树中查找即可
        else if (eh < 0)
            return (p = e.find(h, key)) != null ? p.val : null;
        while ((e = e.next) != null) {
		//4. 从链表中查找，查找到则返回该节点的value，否则就返回null即可
            if (e.hash == h &&
                ((ek = e.key) == key || (ek != null && key.equals(ek))))
                return e.val;
        }
    }
    return null;
}
```

- 哈希: 对传入的键的哈希值进行散列，这有助于减少哈希冲突的可能性。使用 spread 方法可以保证不同的键更均匀地分布在桶数组中。
- 直接查找: 查找的第一步是检查键的哈希值是否位于表的正确位置。如果在该桶的第一个元素中找到了键，则直接返回该元素的值。这里使用了 == 操作符和 equals 方法来比较键，这有助于处理可能的 null 值和确保正确的相等性比较。
- 红黑树查找: 如果第一个节点的哈希值小于 0，那么这个桶的数据结构是红黑树（Java 8 引入了树化结构来改进链表在哈希冲突时的性能）。在这种情况下，使用 find 方法在红黑树中查找键。
- 链表查找: 如果前两个条件都不满足，那么代码将遍历该桶中的链表。如果在链表中找到了具有相同哈希值和键的元素，则返回其值。如果遍历完整个链表都未找到，则返回 null。

### transfer 方法

当 ConcurrentHashMap 容量不足的时候，需要对 table 进行扩容。这个方法的基本思想跟 HashMap 很像，但由于支持并发扩容，所以要复杂一些。transfer 方法源码如下：

```java
private final void transfer(Node<K,V>[] tab, Node<K,V>[] nextTab) {
    int n = tab.length, stride;
    if ((stride = (NCPU > 1) ? (n >>> 3) / NCPU : n) < MIN_TRANSFER_STRIDE)
        stride = MIN_TRANSFER_STRIDE; // subdivide range
	//1. 新建Node数组，容量为之前的两倍
    if (nextTab == null) {            // initiating
        try {
            @SuppressWarnings("unchecked")
            Node<K,V>[] nt = (Node<K,V>[])new Node<?,?>[n << 1];
            nextTab = nt;
        } catch (Throwable ex) {      // try to cope with OOME
            sizeCtl = Integer.MAX_VALUE;
            return;
        }
        nextTable = nextTab;
        transferIndex = n;
    }
    int nextn = nextTab.length;
	//2. 新建forwardingNode引用，在之后会用到
    ForwardingNode<K,V> fwd = new ForwardingNode<K,V>(nextTab);
    boolean advance = true;
    boolean finishing = false; // to ensure sweep before committing nextTab
    for (int i = 0, bound = 0;;) {
        Node<K,V> f; int fh;
        // 3. 确定遍历中的索引i
		while (advance) {
            int nextIndex, nextBound;
            if (--i >= bound || finishing)
                advance = false;
            else if ((nextIndex = transferIndex) <= 0) {
                i = -1;
                advance = false;
            }
            else if (U.compareAndSwapInt
                     (this, TRANSFERINDEX, nextIndex,
                      nextBound = (nextIndex > stride ?
                                   nextIndex - stride : 0))) {
                bound = nextBound;
                i = nextIndex - 1;
                advance = false;
            }
        }
		//4.将原数组中的元素复制到新数组中去
		//4.5 for循环退出，扩容结束修改sizeCtl属性
        if (i < 0 || i >= n || i + n >= nextn) {
            int sc;
            if (finishing) {
                nextTable = null;
                table = nextTab;
                sizeCtl = (n << 1) - (n >>> 1);
                return;
            }
            if (U.compareAndSwapInt(this, SIZECTL, sc = sizeCtl, sc - 1)) {
                if ((sc - 2) != resizeStamp(n) << RESIZE_STAMP_SHIFT)
                    return;
                finishing = advance = true;
                i = n; // recheck before commit
            }
        }
		//4.1 当前数组中第i个元素为null，用CAS设置成特殊节点forwardingNode(可以理解成占位符)
        else if ((f = tabAt(tab, i)) == null)
            advance = casTabAt(tab, i, null, fwd);
		//4.2 如果遍历到ForwardingNode节点  说明这个点已经被处理过了 直接跳过  这里是控制并发扩容的核心
        else if ((fh = f.hash) == MOVED)
            advance = true; // already processed
        else {
            synchronized (f) {
                if (tabAt(tab, i) == f) {
                    Node<K,V> ln, hn;
                    if (fh >= 0) {
						//4.3 处理当前节点为链表的头结点的情况，根据最高位为1还是为0(最高位指数组长度位)，将原链表拆分为两个链表，分别放到新数组的i位置和i+n位置。这里还通过巧妙的处理措施，使得原链表中的一部分能直接平移到新链表(即lastRun及其后面跟着的一串节点)，剩下部分才需要通过new方式克隆移动到新链表中（采用头插法）。
                        int runBit = fh & n;
                        Node<K,V> lastRun = f;
                        for (Node<K,V> p = f.next; p != null; p = p.next) {
                            int b = p.hash & n;
                            if (b != runBit) {
                                runBit = b;
                                lastRun = p;
                            }
                        }
                        if (runBit == 0) {
                            ln = lastRun;
                            hn = null;
                        }
                        else {
                            hn = lastRun;
                            ln = null;
                        }
                        for (Node<K,V> p = f; p != lastRun; p = p.next) {
                            int ph = p.hash; K pk = p.key; V pv = p.val;
                            if ((ph & n) == 0)
                                ln = new Node<K,V>(ph, pk, pv, ln); //可以看到是逆序插入新节点的（头插）
                            else
                                hn = new Node<K,V>(ph, pk, pv, hn);
                        }
                       //在nextTable的i位置上插入一个链表
                         setTabAt(nextTab, i, ln);
                         //在nextTable的i+n的位置上插入另一个链表
                         setTabAt(nextTab, i + n, hn);
                         //在table的i位置上插入forwardNode节点  表示已经处理过该节点
                         setTabAt(tab, i, fwd);
                         //设置advance为true 返回到上面的while循环中 就可以执行i--操作
                         advance = true;
                    }
					//4.4 处理当前节点是TreeBin时的情况，操作和上面的类似
                    else if (f instanceof TreeBin) {
                        TreeBin<K,V> t = (TreeBin<K,V>)f;
                        TreeNode<K,V> lo = null, loTail = null;
                        TreeNode<K,V> hi = null, hiTail = null;
                        int lc = 0, hc = 0;
                        for (Node<K,V> e = t.first; e != null; e = e.next) {
                            int h = e.hash;
                            TreeNode<K,V> p = new TreeNode<K,V>
                                (h, e.key, e.val, null, null);
                            if ((h & n) == 0) {
                                if ((p.prev = loTail) == null)
                                    lo = p;
                                else
                                    loTail.next = p;
                                loTail = p;
                                ++lc;
                            }
                            else {
                                if ((p.prev = hiTail) == null)
                                    hi = p;
                                else
                                    hiTail.next = p;
                                hiTail = p;
                                ++hc;
                            }
                        }
                        ln = (lc <= UNTREEIFY_THRESHOLD) ? untreeify(lo) :
                            (hc != 0) ? new TreeBin<K,V>(lo) : t;
                        hn = (hc <= UNTREEIFY_THRESHOLD) ? untreeify(hi) :
                            (lc != 0) ? new TreeBin<K,V>(hi) : t;
                        setTabAt(nextTab, i, ln);
                        setTabAt(nextTab, i + n, hn);
                        setTabAt(tab, i, fwd);
                        advance = true;
                    }
                }
            }
        }
    }
}
```

代码逻辑请看注释，整个扩容操作分为**两个部分**：

**第一部分**是构建一个 nextTable，它的容量是原来的两倍，这个操作是单线程完成的。

**第二个部分**是将原来 table 中的元素复制到 nextTable 中，主要是遍历复制的过程。
得到当前遍历的数组位置 i，然后利用 tabAt 方法获得 i 位置的元素：

1. 如果这个位置为空，就在原 table 中的 i 位置放入 forwardNode 节点，这个也是触发并发扩容的关键；
2. 如果这个位置是 Node 节点（`fh>=0`），并且是链表的头节点，就把这个链表分裂成两个链表，把它们分别放在 nextTable 的 i 和 i+n 的位置上；
3. 如果这个位置是 TreeBin 节点（`fh<0`），也做一个反序处理，并且判断是否需要 untreefi，把处理的结果分别放在 nextTable 的 i 和 i+n 的位置上；
4. 遍历所有的节点，就完成复制工作，这时让 nextTable 作为新的 table，并且更新 sizeCtl 为新容量的 0.75 倍 ，完成扩容。

![ConcurrentHashMap扩容示意图](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/ConcurrentHashMap-02.png)

### size 相关的方法

对于 ConcurrentHashMap 来说，这个 table 里到底装了多少东西是不确定的，因为**不可能在调用 `size()` 方法的时候“stop the world”让其他线程都停下来去统计**，对于这个不确定的 size，ConcurrentHashMap 仍然花费了大量的力气。

为了统计元素的个数，ConcurrentHashMap 定义了一些变量和一个内部类。

```java
/**
 * A padded cell for distributing counts.  Adapted from LongAdder
 * and Striped64.  See their internal docs for explanation.
 */
@sun.misc.Contended static final class CounterCell {
    volatile long value;
    CounterCell(long x) { value = x; }
}

/******************************************/

/**
 * 实际上保存的是HashMap中的元素个数  利用CAS锁进行更新
 但它并不用返回当前HashMap的元素个数

 */
private transient volatile long baseCount;
/**
 * Spinlock (locked via CAS) used when resizing and/or creating CounterCells.
 */
private transient volatile int cellsBusy;

/**
 * Table of counter cells. When non-null, size is a power of 2.
 */
private transient volatile CounterCell[] counterCells;
```

再来看如何统计的源码：

```java
public int size() {
    long n = sumCount();
    return ((n < 0L) ? 0 :
            (n > (long)Integer.MAX_VALUE) ? Integer.MAX_VALUE :
            (int)n);
}
 /**
 * Returns the number of mappings. This method should be used
 * instead of {@link #size} because a ConcurrentHashMap may
 * contain more mappings than can be represented as an int. The
 * value returned is an estimate; the actual count may differ if
 * there are concurrent insertions or removals.
 *
 * @return the number of mappings
 * @since 1.8
 */
public long mappingCount() {
    long n = sumCount();
    return (n < 0L) ? 0L : n; // ignore transient negative values
}

 final long sumCount() {
    CounterCell[] as = counterCells; CounterCell a;
    long sum = baseCount;
    if (as != null) {
        for (int i = 0; i < as.length; ++i) {
            if ((a = as[i]) != null)
                sum += a.value;//所有counter的值求和
        }
    }
    return sum;
}
```

size 方法返回 Map 中的元素数量，但结果被限制在 Integer.MAX_VALUE 内。如果计算的大小超过这个值，则返回 Integer.MAX_VALUE。如果计算的大小小于 0，则返回 0。

mappingCount 方法也返回 Map 中的元素数量，但允许返回一个 long 值，因此可以表示大于 Integer.MAX_VALUE 的数量。与 `size()` 方法类似，该方法也会忽略负值，返回 0。

sumCount 方法计算 Map 的实际大小。ConcurrentHashMap 使用一个基础计数 baseCount 和一个 CounterCell 数组 counterCells 来跟踪大小。这种结构有助于减少多线程环境中的争用，因为不同的线程可能会更新不同的 CounterCell。

在计算总和时，`sumCount()` 方法将 baseCount 与 counterCells 数组中的所有非空单元的值相加。

在 put 方法结尾处调用了 addCount 方法，把当前 ConcurrentHashMap 的元素个数 +1，这个方法一共做了两件事，更新 baseCount 的值，检测是否进行扩容。

```java
private final void addCount(long x, int check) {
    CounterCell[] as; long b, s;
    //利用CAS方法更新baseCount的值
    if ((as = counterCells) != null ||
        !U.compareAndSwapLong(this, BASECOUNT, b = baseCount, s = b + x)) {
        CounterCell a; long v; int m;
        boolean uncontended = true;
        if (as == null || (m = as.length - 1) < 0 ||
            (a = as[ThreadLocalRandom.getProbe() & m]) == null ||
            !(uncontended =
              U.compareAndSwapLong(a, CELLVALUE, v = a.value, v + x))) {
            fullAddCount(x, uncontended);
            return;
        }
        if (check <= 1)
            return;
        s = sumCount();
    }
    //如果check值大于等于0 则需要检验是否需要进行扩容操作
    if (check >= 0) {
        Node<K,V>[] tab, nt; int n, sc;
        while (s >= (long)(sc = sizeCtl) && (tab = table) != null &&
               (n = tab.length) < MAXIMUM_CAPACITY) {
            int rs = resizeStamp(n);
            //
            if (sc < 0) {
                if ((sc >>> RESIZE_STAMP_SHIFT) != rs || sc == rs + 1 ||
                    sc == rs + MAX_RESIZERS || (nt = nextTable) == null ||
                    transferIndex <= 0)
                    break;
                 //如果已经有其他线程在执行扩容操作
                if (U.compareAndSwapInt(this, SIZECTL, sc, sc + 1))
                    transfer(tab, nt);
            }
            //当前线程是唯一的或是第一个发起扩容的线程  此时nextTable=null
            else if (U.compareAndSwapInt(this, SIZECTL, sc,
                                         (rs << RESIZE_STAMP_SHIFT) + 2))
                transfer(tab, null);
            s = sumCount();
        }
    }
}
```

## ConcurrentHashMap 示例

假设我们想要构建一个线程安全的高并发统计用户访问次数的功能。在这里，ConcurrentHashMap 是一个很好的选择，因为它提供了高并发性能。

```java
import java.util.concurrent.ConcurrentHashMap;

public class UserVisitCounter {

    private final ConcurrentHashMap<String, Integer> visitCountMap;

    public UserVisitCounter() {
        this.visitCountMap = new ConcurrentHashMap<>();
    }

    // 用户访问时调用的方法
    public void userVisited(String userId) {
        visitCountMap.compute(userId, (key, value) -> value == null ? 1 : value + 1);
    }

    // 获取用户的访问次数
    public int getVisitCount(String userId) {
        return visitCountMap.getOrDefault(userId, 0);
    }

    public static void main(String[] args) {
        UserVisitCounter counter = new UserVisitCounter();

        // 模拟用户访问
        counter.userVisited("user1");
        counter.userVisited("user1");
        counter.userVisited("user2");

        System.out.println("User1 visit count: " + counter.getVisitCount("user1")); // 输出: User1 visit count: 2
        System.out.println("User2 visit count: " + counter.getVisitCount("user2")); // 输出: User2 visit count: 1
    }
}
```

在上述示例中：

- 我们使用了 ConcurrentHashMap 来存储用户的访问次数。
- 当用户访问时，我们通过 userVisited 方法更新访问次数。
- 使用 ConcurrentHashMap 的 compute 方法可以确保原子地更新用户的访问次数。
- 可以通过 getVisitCount 方法检索任何用户的访问次数。

ConcurrentHashMap 使我们能够无需担心并发问题就能构建这样一个高效的统计系统。

## 小结

ConcurrentHashMap 是线程安全的，支持完全并发的读取，并且有很多线程可以同时执行写入。在早期版本（例如 JDK 1.7）中，ConcurrentHashMap 使用分段锁技术。整个哈希表被分成一些段（Segment），每个段独立加锁。这样，在不同段上的操作可以并发进行。从 JDK 1.8 开始，ConcurrentHashMap 的内部实现有了很大的变化。它放弃了分段锁技术，转而采用了更先进的并发控制策略，如 CAS 操作和红黑树等，进一步提高了并发性能。

由于并发性质，ConcurrentHashMap 的大小计算可能不是精确的，但通常足够接近真实值。

> 编辑：沉默王二，部分内容来自于 CL0610 的 GitHub 仓库[https://github.com/CL0610/Java-concurrency](<https://github.com/CL0610/Java-concurrency/blob/master/14.%E5%B9%B6%E5%8F%91%E5%AE%B9%E5%99%A8%E4%B9%8BConcurrentHashMap(JDK%201.8%E7%89%88%E6%9C%AC)/%E5%B9%B6%E5%8F%91%E5%AE%B9%E5%99%A8%E4%B9%8BConcurrentHashMap(JDK%201.8%E7%89%88%E6%9C%AC).md>)，部分内容来自于这篇[初念初恋-ConcurrentHashMap](https://juejin.cn/post/7064061605185028110)，图片画的特别漂亮。

---

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第二份 PDF 《[并发编程小册](https://javabetter.cn/thread/)》终于来了！包括线程的基本概念和使用方法、Java 的内存模型、sychronized、volatile、CAS、AQS、ReentrantLock、线程池、并发容器、ThreadLocal、生产者消费者模型等面试和开发必须掌握的内容，共计 15 万余字，200+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，二哥的并发编程进阶之路.pdf](https://javabetter.cn/thread/)

[加入二哥的编程星球](https://javabetter.cn/thread/)，在星球的第二个置顶帖「[知识图谱](https://javabetter.cn/thread/)」里就可以获取 PDF 版本。

![](https://cdn.tobebetterjavaer.com/stutymore/wangzhe-thread-20230904125125.png)
