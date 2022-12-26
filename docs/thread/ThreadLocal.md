---
title: 吊打Java并发面试官之ThreadLocal
shortTitle: ThreadLocal
description: 吊打Java并发面试官之ThreadLocal
category:
  - Java核心
tag:
  - Java并发编程
head:
  - - meta
    - name: keywords
      content: Java,并发编程,多线程,Thread,ThreadLocal
---

## ThreadLocal 的简介

在多线程编程中通常解决线程安全的问题时，我们会利用 synchronzed 或者 lock 控制线程对临界区资源的同步顺序，但是这种加锁的方式会让未获取到锁的线程进行阻塞等待，很显然这种方式的时间效率并不是特别好。

**线程安全问题的核心在于多个线程会对同一个临界区共享资源进行操作**，那么，如果每个线程都使用自己的“共享资源”，各自使用各自的，互相不影响到彼此，即多个线程间达到隔离的状态，这样就不会出现线程安全的问题。

事实上，这就是一种“**空间换时间**”的方案，每个线程都拥有自己的“共享资源”无疑会让内存占用大很多，但是由于不需要同步也就减少了线程可能存在的阻塞等待，从而提高时间效率。

虽然 ThreadLocal 并不在 java.util.concurrent 包中而在 java.lang 包中，但我更倾向于把它当作是一种并发容器（虽然真正存放数据的是 ThreadLocalMap）进行归类。

顾名思义，**ThreadLocal 表示线程的“本地变量”，即每个线程都拥有该变量副本，达到人手一份的效果，各用各的，这样就可以避免共享资源的竞争**。

## ThreadLocal 的实现原理

要想学习 ThreadLocal 的实现原理，就必须了解它的几个核心方法，包括怎样存怎样取等等，下面我们一个个来看。

### set() 方法

**set 方法设置当前线程中 ThreadLocal 变量的值**，该方法的源码为：

```java
public void set(T value) {
	  //1. 获取当前线程实例对象
    Thread t = Thread.currentThread();

	  //2. 通过当前线程实例获取到ThreadLocalMap对象
    ThreadLocalMap map = getMap(t);

    if (map != null)
			//3. 如果Map不为null,则以当前ThreadLocal实例为key,值为value进行存入
    	map.set(this, value);
    else
			//4.map为null,则新建ThreadLocalMap并存入value
      createMap(t, value);
}
```

方法的逻辑很清晰，具体请看上面的注释。通过源码我们知道 value 是存放在 ThreadLocalMap 里的，当前先把它理解为一个普普通通的 map 即可，也就是说，**数据 value 是存放在 ThreadLocalMap 这个容器中的，并且是以当前 ThreadLocal 实例为 key 的**。

简单看下 ThreadLocalMap 是什么，有个简单的认识就好，后面会具体说的。

**首先 ThreadLocalMap 是怎样来的**？源码很清楚，是通过`getMap(t)`进行获取：

```java
ThreadLocalMap getMap(Thread t) {
    return t.ThreadLocals;
}
```

该方法直接返回当前线程对象 t 的一个成员变量 ThreadLocals：

```java
/* ThreadLocal values pertaining to this thread. This map is maintained
 * by the ThreadLocal class. */
ThreadLocal.ThreadLocalMap ThreadLocals = null;
```

也就是说**ThreadLocalMap 的引用是作为 Thread 的一个成员变量的，被 Thread 进行维护的**。回过头再来看 set 方法，当 map 为 Null 的时候会通过`createMap(t，value)`方法 new 出来一个：

```java
void createMap(Thread t, T firstValue) {
    t.ThreadLocals = new ThreadLocalMap(this, firstValue);
}
```

该方法就是new 一个 ThreadLocalMap 实例对象，然后同样以当前 ThreadLocal 实例作为 key，值为 value 存放到 ThreadLocalMap 中的，然后将当前线程对象的 ThreadLocals 赋值为 ThreadLocalMap 对象。

现在来对 set 方法进行总结一下：

通过当前线程对象 thread 获取该 thread 所维护的 ThreadLocalMap，如果 ThreadLocalMap 不为 null，则以 ThreadLocal 实例为 key，值为 value 的键值对存入 ThreadLocalMap，若 ThreadLocalMap 为 null 的话，就新建 ThreadLocalMap，然后再以 ThreadLocal 为键，值为 value 的键值对存入即可。

### get() 方法


**get 方法是获取当前线程中 ThreadLocal 变量的值**，同样的还是来看看源码：

```java
public T get() {
	//1. 获取当前线程的实例对象
  Thread t = Thread.currentThread();

	//2. 获取当前线程的ThreadLocalMap
  ThreadLocalMap map = getMap(t);
  if (map != null) {
		//3. 获取map中当前ThreadLocal实例为key的值的entry
    ThreadLocalMap.Entry e = map.getEntry(this);

    if (e != null) {
      @SuppressWarnings("unchecked")
			//4. 当前entitiy不为null的话，就返回相应的值value
      T result = (T)e.value;
      return result;
    }
  }
	//5. 若map为null或者entry为null的话通过该方法初始化，并返回该方法返回的value
  return setInitialValue();
}
```

弄懂了 set 方法的逻辑，看 get 方法只需要带着逆向思维去看就好，如果是那样存的，反过来去拿就好。代码逻辑请看注释，另外，看下 setInitialValue 主要做了些什么事情？

```java
private T setInitialValue() {
    T value = initialValue();
    Thread t = Thread.currentThread();
    ThreadLocalMap map = getMap(t);
    if (map != null)
        map.set(this, value);
    else
        createMap(t, value);
    return value;
}
```

这段方法的逻辑和 set 方法几乎一致，另外值得关注的是 initialValue 方法:

```java
protected T initialValue() {
    return null;
}
```

这个**方法是 protected 修饰的，也就是说继承 ThreadLocal 的子类可重写该方法，实现赋值为其他的初始值**。关于 get 方法来总结一下：

通过当前线程 thread 实例获取到它所维护的 ThreadLocalMap，然后以当前 ThreadLocal 实例为 key 获取该 map 中的键值对（Entry），如果 Entry 不为 null 则返回 Entry 的 value。如果获取 ThreadLocalMap 为 null 或者 Entry 为 null 的话，就以当前 ThreadLocal 为 Key，value 为 null 存入 map 后，并返回 null。

### remove() 方法

```java
public void remove() {
	//1. 获取当前线程的ThreadLocalMap
	ThreadLocalMap m = getMap(Thread.currentThread());
 	if (m != null)
		//2. 从map中删除以当前ThreadLocal实例为key的键值对
		m.remove(this);
}
```

get、set 方法实现了存数据和读数据的操作，remove 方法实现了如何删数据的操作。删除数据当然是从 map 中删除数据，先获取与当前线程相关联的 ThreadLocalMap，然后从 map 中删除该 ThreadLocal 实例为 key 的键值对即可。

## ThreadLocalMap 详解

从上面的分析我们已经知道，数据其实都放在了 ThreadLocalMap 中，ThreadLocal 的 get、set 和 remove 方法实际上都是通过 ThreadLocalMap 的 getEntry、set 和 remove 方法实现的。如果想真正全方位的弄懂 ThreadLocal，势必得再对 ThreadLocalMap 做一番理解。

### Entry 数据结构

ThreadLocalMap 是 ThreadLocal 一个静态内部类，和大多数容器一样，内部维护了一个数组（Entry 类型的 table 数组）。

```java
/**
 * The table, resized as necessary.
 * table.length MUST always be a power of two.
 */
private Entry[] table;
```

通过注释可以看出，table 数组的长度为 2 的幂次方。接下来看下 Entry 是什么：

```java
static class Entry extends WeakReference<ThreadLocal<?>> {
    /** The value associated with this ThreadLocal. */
    Object value;

    Entry(ThreadLocal<?> k, Object v) {
        super(k);
        value = v;
    }
}
```

Entry 是一个以 ThreadLocal 为 key，Object 为 value 的键值对，另外需要注意的是这里的**ThreadLocal 是弱引用，因为 Entry 继承了 WeakReference，在 Entry 的构造方法中，调用了 super(k)方法，会将 ThreadLocal 实例包装成一个 WeakReferenece。**

到这里我们可以用一个图来理解下 Thread、ThreadLocal、ThreadLocalMap、Entry 之间的关系：

![ThreadLocal各引用间的关系](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/ThreadLocal-01.png)

注意上图中的实线表示强引用，虚线表示弱引用。如图所示，每个线程实例中都可以通过 ThreadLocals 获取到 ThreadLocalMap，而 ThreadLocalMap 实际上就是一个以 ThreadLocal 实例为 key，任意对象为 value 的 Entry 数组。

当我们为 ThreadLocal 变量赋值时，实际上就是以当前 ThreadLocal 实例为 key，值为 value 的 Entry 往这个 ThreadLocalMap 中存放。

需要注意的是，Entry 中的 key 是弱引用，当 ThreadLocal 外部强引用被置为 null(`ThreadLocalInstance=null`)时，那么系统 GC 的时候，根据可达性分析，这个 ThreadLocal 实例就没有任何一条链路能够引用到它，此时 ThreadLocal 势必会被回收，这样一来，ThreadLocalMap 中就会出现 key 为 null 的 Entry，就没有办法访问这些 key 为 null 的 Entry 的 value，如果当前线程再迟迟不结束的话，这些 key 为 null 的 Entry 的 value 就会一直存在一条强引用链：Thread Ref -> Thread -> ThreaLocalMap -> Entry -> value 永远无法回收，造成内存泄漏。

当然，如果当前 thread 运行结束，ThreadLocal、ThreadLocalMap、Entry 没有引用链可达，在垃圾回收的时候都会被系统回收。在实际开发中，会使用线程池去维护线程的创建和复用，比如固定大小的线程池，线程为了复用是不会主动结束的。

ThreadLocal 的内存泄漏问题，值得我们思考和注意，关于这个问题可以看这篇文章:

> ----[详解 ThreadLocal 内存泄漏问题](http://www.jianshu.com/p/dde92ec37bd1)

### set 方法

与 ConcurrentHashMap、HashMap 等容器一样，ThreadLocalMap 也是采用散列表进行实现的。在了解 set 方法前，我们先来回顾下关于散列表相关的知识。

#### 散列表

理想状态下，散列表就是一个包含关键字的固定大小的数组，通过使用散列函数，将关键字映射到数组的不同位置。下面是

![理想散列表的一个示意图](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/ThreadLocal-02.png)

在理想状态下，哈希函数可以将关键字均匀的分散到数组的不同位置，不会出现两个关键字散列值相同（假设关键字数量小于数组的大小）的情况。

但是在实际使用中，经常会出现多个关键字散列值相同的情况（被映射到数组的同一个位置），我们将这种情况称为散列冲突。

为了解决散列冲突，主要采用下面两种方式： **分离链表法**（separate chaining）和**开放地址法**（open addressing）

##### 分离链表法

分离链表法使用链表解决冲突，将散列值相同的元素都保存到一个链表中。当查询的时候，首先找到元素所在的链表，然后遍历链表查找对应的元素，典型实现为 HashMap、ConcurrentHashMap 的拉链法。下面是一个示意图：

![分离链表法示意图](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/ThreadLocal-02.gif)

##### 开放地址法

开放地址法不会创建链表，当关键字散列到的数组单元已经被另外一个关键字占用的时候，就会尝试在数组中寻找其他的单元，直到找到一个空的单元。

探测数组空单元的方式有很多，这里介绍一种最简单的 -- 线性探测法。线性探测法就是从冲突的数组单元开始，依次往后搜索空单元，如果到数组尾部，再从头开始搜索（环形查找）。如下图所示：

![开放定址法示意图](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/ThreadLocal-03.jpg)

关于两种方式的比较，可以参考 [这篇文章](http://www.nowamagic.net/academy/detail/3008060)。

**ThreadLocalMap 中使用开放地址法来处理散列冲突**，而 HashMap 中使用的分离链表法。之所以采用不同的方式主要是因为：

> 在 ThreadLocalMap 中的散列值分散的十分均匀，很少会出现冲突。并且 ThreadLocalMap 经常需要清除无用的对象，使用纯数组更加方便。

在了解这些相关知识后我们再回过头来看一下 set 方法。set 方法的源码为：

```java
private void set(ThreadLocal<?> key, Object value) {

    // We don't use a fast path as with get() because it is at
    // least as common to use set() to create new entries as
    // it is to replace existing ones, in which case, a fast
    // path would fail more often than not.

    Entry[] tab = table;
    int len = tab.length;
	//根据ThreadLocal的hashCode确定Entry应该存放的位置
    int i = key.ThreadLocalHashCode & (len-1);

	//采用开放地址法，hash冲突的时候使用线性探测
    for (Entry e = tab[i];
         e != null;
         e = tab[i = nextIndex(i, len)]) {
        ThreadLocal<?> k = e.get();
		//覆盖旧Entry
        if (k == key) {
            e.value = value;
            return;
        }
		//当key为null时，说明ThreadLocal强引用已经被释放掉，那么就无法
		//再通过这个key获取ThreadLocalMap中对应的entry，这里就存在内存泄漏的可能性
        if (k == null) {
			//用当前插入的值替换掉这个key为null的“脏”entry
            replaceStaleEntry(key, value, i);
            return;
        }
    }
	//新建entry并插入table中i处
    tab[i] = new Entry(key, value);
    int sz = ++size;
	//插入后再次清除一些key为null的“脏”entry,如果大于阈值就需要扩容
    if (!cleanSomeSlots(i, sz) && sz >= threshold)
        rehash();
}
```

set 方法的关键部分**请看上面的注释**，主要有这样几点需要注意：

#### ThreadLocal 的 hashcode

```java
private final int ThreadLocalHashCode = nextHashCode();
private static final int HASH_INCREMENT = 0x61c88647;
private static AtomicInteger nextHashCode =new AtomicInteger();
  /**
   * Returns the next hash code.
   */
  private static int nextHashCode() {
      return nextHashCode.getAndAdd(HASH_INCREMENT);
  }
```

从源码中我们可以清楚的看到 ThreadLocal 实例的 hashCode 是通过 nextHashCode() 方法实现的，该方法实际上是用一个 AtomicInteger 加上 0x61c88647 来实现的。

0x61c88647 这个数是有特殊意义的，它能够保证 hash 表的每个散列桶能够均匀的分布，这是`Fibonacci Hashing`，关于更多介绍可以看[这篇文章的 ThreadLocal 散列值部分](https://www.cnblogs.com/zhangjk1993/archive/2017/03/29/6641745.html)。

也正是能够均匀分布，所以 ThreadLocal 选择使用开放地址法来解决 hash 冲突的问题。

#### 怎样确定新值插入到哈希表中的位置？

该操作源码为：`key.ThreadLocalHashCode & (len-1)`，同 HashMap 和 ConcurrentHashMap 等容器的方式一样，利用当前 key(即 ThreadLocal 实例)的 hashcode 与哈希表大小相与，因为哈希表大小总是为 2 的幂次方，所以相与等同于一个取模的过程，这样就可以通过 Key 分配到具体的哈希桶中去。至于为什么取模要通过位与运算的原因，很简单，位运算的执行效率远远高于取模运算。

#### 怎样解决 hash 冲突？

源码中通过`nextIndex(i, len)`方法解决 hash 冲突的问题，该方法中的`((i + 1 < len) ? i + 1 : 0);`，也就是不断往后线性探测，当到哈希表末尾的时候再从 0 开始，成环形。

#### 怎样解决“脏”Entry？

在分析 ThreadLocal、ThreadLocalMap 以及 Entry 的关系的时候，我们已经知道使用 ThreadLocal 有可能存在内存泄漏（对象创建出来后，在之后一直没有使用该对象，但是垃圾回收器无法回收这个部分的内存），在源码中针对这种 key 为 null 的 Entry 称之为“stale entry”，直译为不新鲜的 entry，我把它理解为“脏 entry”，自然而然，Josh Bloch 和 Doug Lea 大师考虑到了这种情况，在 set 方法的 for 循环中寻找和当前 Key 相同的可覆盖 entry 的过程中通过**replaceStaleEntry**方法解决脏 entry 的问题。

如果当前`table[i]`为 null 的话，直接插入新 entry 后也会通过**cleanSomeSlots**来解决脏 entry 的问题，关于 cleanSomeSlots 和 replaceStaleEntry 方法，会在详解 ThreadLocal 内存泄漏中讲到，具体可看[这篇文章](http://www.jianshu.com/p/dde92ec37bd1)。

#### 如何进行扩容？

> threshold 的确定

也几乎和大多数容器一样，ThreadLocalMap 会有扩容机制，那么它的 threshold 又是怎样确定的呢？

```java
private int threshold; // Default to 0
/**
 * The initial capacity -- MUST be a power of two.
 */
private static final int INITIAL_CAPACITY = 16;

ThreadLocalMap(ThreadLocal<?> firstKey, Object firstValue) {
    table = new Entry[INITIAL_CAPACITY];
    int i = firstKey.ThreadLocalHashCode & (INITIAL_CAPACITY - 1);
    table[i] = new Entry(firstKey, firstValue);
    size = 1;
    setThreshold(INITIAL_CAPACITY);
}

/**
 * Set the resize threshold to maintain at worst a 2/3 load factor.
 */
private void setThreshold(int len) {
    threshold = len * 2 / 3;
}
```

根据源码可知，在第一次为 ThreadLocal 进行赋值的时候会创建初始大小为 16 的 ThreadLocalMap，并且通过 setThreshold 方法设置 threshold，其值为当前哈希数组长度乘以（2/3），也就是说加载因子为 2/3。

(加载因子是衡量哈希表密集程度的一个参数，如果加载因子越大的话，说明哈希表被装载的越多，出现 hash 冲突的可能性越大，反之，则被装载的越少，出现 hash 冲突的可能性越小。同时如果过小，很显然内存使用率不高，该值的取值应该考虑到内存使用率和 hash 冲突概率的一个平衡，如 HashMap、ConcurrentHashMap 的加载因子都为 0.75)。

这里**ThreadLocalMap 初始大小为 16**，**加载因子为 2/3**，所以哈希表可用大小为：16\*2/3=10，即哈希表可用容量为 10。

> 扩容 resize

从 set 方法中可以看出当 hash 表的 size 大于 threshold 的时候，会通过 resize 方法进行扩容。

```java
/**
 * Double the capacity of the table.
 */
private void resize() {
    Entry[] oldTab = table;
    int oldLen = oldTab.length;
	//新数组为原数组的2倍
    int newLen = oldLen * 2;
    Entry[] newTab = new Entry[newLen];
    int count = 0;

    for (int j = 0; j < oldLen; ++j) {
        Entry e = oldTab[j];
        if (e != null) {
            ThreadLocal<?> k = e.get();
			//遍历过程中如果遇到脏entry的话直接另value为null,有助于value能够被回收
            if (k == null) {
                e.value = null; // Help the GC
            } else {
				//重新确定entry在新数组的位置，然后进行插入
                int h = k.ThreadLocalHashCode & (newLen - 1);
                while (newTab[h] != null)
                    h = nextIndex(h, newLen);
                newTab[h] = e;
                count++;
            }
        }
    }
	//设置新哈希表的threshHold和size属性
    setThreshold(newLen);
    size = count;
    table = newTab;
}
```

方法逻辑**请看注释**，新建一个大小为原来数组长度的两倍的数组，然后遍历旧数组中的 entry 并将其插入到新的 hash 数组中，需要注意的是，**在扩容的过程中针对脏 entry 的话会把 value 设为 null，以便能够被垃圾回收器回收，解决隐藏的内存泄漏的问题**。

### getEntry 方法

getEntry 方法源码为：

```java
private Entry getEntry(ThreadLocal<?> key) {
	//1. 确定在散列数组中的位置
    int i = key.ThreadLocalHashCode & (table.length - 1);
	//2. 根据索引i获取entry
    Entry e = table[i];
	//3. 满足条件则返回该entry
    if (e != null && e.get() == key)
        return e;
    else
		//4. 未查找到满足条件的entry，额外在做的处理
        return getEntryAfterMiss(key, i, e);
}
```

方法逻辑很简单，如果当前定位的 entry 的 key 和查找的 key 相同的话就直接返回这个 entry，否则的话就是在 set 的时候判断是否存在 hash 冲突，需要通过 getEntryAfterMiss 做进一步处理。getEntryAfterMiss 方法为：

```java
private Entry getEntryAfterMiss(ThreadLocal<?> key, int i, Entry e) {
    Entry[] tab = table;
    int len = tab.length;

    while (e != null) {
        ThreadLocal<?> k = e.get();
        if (k == key)
			//找到和查询的key相同的entry则返回
            return e;
        if (k == null)
			//解决脏entry的问题
            expungeStaleEntry(i);
        else
			//继续向后环形查找
            i = nextIndex(i, len);
        e = tab[i];
    }
    return null;
}
```

这个方法同样很好理解，通过 nextIndex 往后环形查找，如果找到和查询的 key 相同的 entry 的话就直接返回，如果在查找过程中遇到脏 entry 的话就使用 expungeStaleEntry 方法进行处理。到目前为止，为了解决潜在的内存泄漏的问题，在 set、resize、getEntry 这些地方都会对这些脏 entry 进行处理，可见为了尽可能解决这个问题几乎无时无刻都在做出努力。

### remove 方法

```java
/**
 * Remove the entry for key.
 */
private void remove(ThreadLocal<?> key) {
    Entry[] tab = table;
    int len = tab.length;
    int i = key.ThreadLocalHashCode & (len-1);
    for (Entry e = tab[i];
         e != null;
         e = tab[i = nextIndex(i, len)]) {
        if (e.get() == key) {
			//将entry的key置为null
            e.clear();
			//将该entry的value也置为null
            expungeStaleEntry(i);
            return;
        }
    }
}
```

该方法逻辑很简单，通过往后环形查找到与指定 key 相同的 entry 后，先通过 clear 方法将 key 置为 null 后，使其转换为一个脏 entry，然后调用 expungeStaleEntry 方法将其 value 置为 null，以便垃圾回收时能够清理，同时将 table[i]置为 null。

## ThreadLocal 的使用场景

**ThreadLocal 不是用来解决共享对象的多线程访问问题的**，数据实质上是放在每个 thread 实例引用的 ThreadLocalMap中的,也就是说**每个不同的线程都拥有专属于自己的数据容器（ThreadLocalMap），彼此不影响**。

因此 ThreadLocal 只适用于 **共享对象会造成线程安全** 的业务场景。比如**Hibernate 中通过 ThreadLocal 管理 Session**就是一个典型的案例，不同的请求线程（用户）拥有自己的 session，若将 session 共享出去被多线程访问，必然会带来线程安全问题。

下面，我们自己来写一个例子，SimpleDateFormat.parse 方法会有线程安全的问题，我们可以尝试使用 ThreadLocal 包装 SimpleDateFormat，只要该实例不被多线程共享即可。

```java
public class ThreadLocalDemo {
    private static ThreadLocal<SimpleDateFormat> sdf = new ThreadLocal<>();

    public static void main(String[] args) {
        ExecutorService executorService = Executors.newFixedThreadPool(10);
        for (int i = 0; i < 100; i++) {
            executorService.submit(new DateUtil("2019-11-25 09:00:" + i % 60));
        }
    }

    static class DateUtil implements Runnable {
        private String date;

        public DateUtil(String date) {
            this.date = date;
        }

        @Override
        public void run() {
            if (sdf.get() == null) {
                sdf.set(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
            } else {
                try {
                    Date date = sdf.get().parse(this.date);
                    System.out.println(date);
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
```

1. 如果当前线程不持有 SimpleDateformat 对象实例，那么就新建一个并把它设置到当前线程中，如果已经持有，就直接使用。另外，**从`if (sdf.get() == null){....}else{.....}`可以看出为每一个线程分配一个 SimpleDateformat 对象实例是从应用层面（业务代码逻辑）去保证的。**
2. 上面我们说过 ThreadLocal 有可能存在内存泄漏，在使用完之后，最好使用 remove 方法将这个变量移除，就像在使用数据库连接一样，及时关闭连接。

---

> 编辑：沉默王二，更多关于并发编程的源码分析，可以参考[并发编程知识总结](https://github.com/CL0610/Java-concurrency)这个开源知识库。

---

最近整理了一份牛逼的学习资料，包括但不限于 Java 基础部分（JVM、Java 集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类 Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是 2022 年全网最全的学习和找工作的 PDF 资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
