---
title: Java HashMap详解（附源码分析）
shortTitle: HashMap详解
category:
  - Java核心
tag:
  - 集合框架（容器）
description: Java程序员进阶之路，小白的零基础Java教程，Java HashMap详解
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,HashMap
---

这篇文章将通过源码的方式，详细透彻地讲清楚 Java 的 HashMap，包括HashMap hash 方法的原理、HashMap 的扩容机制、HashMap的加载因子为什么是 0.75 而不是 0.6、0.8，以及 HashMap 为什么是线程不安全的，所有 HashMap 的常见面试题，都会在这一篇文章里讲明白。


## 一、hash 方法的原理

来看一下 hash 方法的源码（JDK 8 中的 HashMap）：

```java
static final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}
```

这段代码究竟是用来干嘛的呢？

我们都知道，`key.hashCode()` 是用来获取键位的哈希值的，理论上，哈希值是一个 int 类型，范围从-2147483648 到 2147483648。前后加起来大概 40 亿的映射空间，只要哈希值映射得比较均匀松散，一般是不会出现哈希碰撞的。

>PS：读者建议范围加上 左闭右开。因为 int 类型为 4字节，也就是 32位，取值范围为 `[-2^31,2^31-1]`。也就是 -2147483648 到 2147483647

但问题是一个 40 亿长度的数组，内存是放不下的。HashMap 扩容之前的数组初始大小只有 16，所以这个哈希值是不能直接拿来用的，用之前要和数组的长度做取模运算，用得到的余数来访问数组下标才行。

取模运算有两处。

> 取模运算（“Modulo Operation”）和取余运算（“Remainder Operation ”）两个概念有重叠的部分但又不完全一致。主要的区别在于对负整数进行除法运算时操作不同。取模主要是用于计算机术语中，取余则更多是数学概念。

一处是往 HashMap 中 put 的时候（`putVal` 方法中）：

```java
final V putVal(int hash, K key, V value, boolean onlyIfAbsent, boolean evict) {
     HashMap.Node<K,V>[] tab; HashMap.Node<K,V> p; int n, i;
     if ((tab = table) == null || (n = tab.length) == 0)
         n = (tab = resize()).length;
     if ((p = tab[i = (n - 1) & hash]) == null)
         tab[i] = newNode(hash, key, value, null);
}
```

一处是从 HashMap 中 get 的时候（`getNode` 方法中）：

```java
final Node<K,V> getNode(int hash, Object key) {
     Node<K,V>[] tab; Node<K,V> first, e; int n; K k;
     if ((tab = table) != null && (n = tab.length) > 0 &&
            (first = tab[(n - 1) & hash]) != null) {}
}
```

其中的 `(n - 1) & hash` 正是取模运算，就是把哈希值和（数组长度-1）做了一个“与”运算。

可能大家在疑惑：**取模运算难道不该用 `%` 吗？为什么要用 `&` 呢**？

这是因为 `&` 运算比 `%` 更加高效，并且当 b 为 2 的 n 次方时，存在下面这样一个公式。

> a % b = a & (b-1)

用 $2^n$ 替换下 b 就是：

>a % $2^n$ = a & ($2^n$-1)

我们来验证一下，假如 a = 14，b = 8，也就是 $2^3$，n=3。

14%8，14 的二进制为 1110，8 的二进制 1000，8-1 = 7 的二进制为 0111，1110&0111=0110，也就是 0`*`$2^0$+1`*`$2^1$+1`*`$2^2$+0`*`$2^3$=0+2+4+0=6，14%8 刚好也等于 6。

这也正好解释了为什么 HashMap 的数组长度要取 2 的整次方。

因为（数组长度-1）正好相当于一个“低位掩码”——这个掩码的低位最好全是 1，这样 & 操作才有意义，否则结果就肯定是 0，那么 & 操作就没有意义了。

> a&b 操作的结果是：a、b 中对应位同时为 1，则对应结果位为 1，否则为 0

2 的整次幂刚好是偶数，偶数-1 是奇数，奇数的二进制最后一位是 1，保证了 hash &(length-1) 的最后一位可能为 0，也可能为 1（这取决于 h 的值），即 & 运算后的结果可能为偶数，也可能为奇数，这样便可以保证哈希值的均匀性。

& 操作的结果就是将哈希值的高位全部归零，只保留低位值，用来做数组下标访问。

假设某哈希值为 `10100101 11000100 00100101`，用它来做取模运算，我们来看一下结果。HashMap 的初始长度为 16（内部是数组），16-1=15，二进制是 `00000000 00000000 00001111`（高位用 0 来补齐）：

```
	 10100101 11000100 00100101
&	00000000 00000000 00001111
----------------------------------
	 00000000 00000000 00000101
```

因为 15 的高位全部是 0，所以 & 运算后的高位结果肯定是 0，只剩下 4 个低位 `0101`，也就是十进制的 5，也就是将哈希值为 `10100101 11000100 00100101` 的键放在数组的第 5 位。

明白了取模运算后，我们再来看 put 方法的源码：

```java
public V put(K key, V value) {
    return putVal(hash(key), key, value, false, true);
}
```

以及 get 方法的源码：

```java
public V get(Object key) {
    HashMap.Node<K,V> e;
    return (e = getNode(hash(key), key)) == null ? null : e.value;
}
```

它们在调用 putVal 和 getNode 之前，都会先调用 hash 方法：

```java
static final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}
```

那为什么取模运算之前要调用 hash 方法呢？

看下面这个图。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/hash-01.png)

某哈希值为 `11111111 11111111 11110000 1110 1010`，将它右移 16 位（h >>> 16），刚好是 `00000000 00000000 11111111 11111111`，再进行异或操作（h ^ (h >>> 16)），结果是 `11111111 11111111 00001111 00010101`

> 异或（`^`）运算是基于二进制的位运算，采用符号 XOR 或者`^`来表示，运算规则是：如果是同值取 0、异值取 1

由于混合了原来哈希值的高位和低位，所以低位的随机性加大了（掺杂了部分高位的特征，高位的信息也得到了保留）。

结果再与数组长度-1（`00000000 00000000 00000000 00001111`）做取模运算，得到的下标就是 `00000000 00000000 00000000 00000101`，也就是 5。

还记得之前我们假设的某哈希值 `10100101 11000100 00100101` 吗？在没有调用 hash 方法之前，与 15 做取模运算后的结果也是 5，我们不妨来看看调用 hash 之后的取模运算结果是多少。

某哈希值 `00000000 10100101 11000100 00100101`（补齐 32 位），将它右移 16 位（h >>> 16），刚好是 `00000000 00000000 00000000 10100101`，再进行异或操作（h ^ (h >>> 16)），结果是 `00000000 10100101 00111011 10000000`

结果再与数组长度-1（`00000000 00000000 00000000 00001111`）做取模运算，得到的下标就是 `00000000 00000000 00000000 00000000`，也就是 0。

综上所述，hash 方法是用来做哈希值优化的，把哈希值右移 16 位，也就正好是自己长度的一半，之后与原哈希值做异或运算，这样就混合了原哈希值中的高位和低位，增大了随机性。

说白了，**hash 方法就是为了增加随机性，让数据元素更加均衡的分布，减少碰撞**。

## 二、扩容机制

大家都知道，数组一旦初始化后大小就无法改变了，所以就有了 [ArrayList](https://tobebetterjavaer.com/collection/arraylist.html)这种“动态数组”，可以自动扩容。

HashMap 的底层用的也是数组。向 HashMap 里不停地添加元素，当数组无法装载更多元素时，就需要对数组进行扩容，以便装入更多的元素。

当然了，数组是无法自动扩容的，所以如果要扩容的话，就需要新建一个大的数组，然后把小数组的元素复制过去。

HashMap 的扩容是通过 resize 方法来实现的，JDK 8 中融入了红黑树，比较复杂，为了便于理解，就还使用 JDK 7 的源码，搞清楚了 JDK 7 的，我们后面再详细说明 JDK 8 和 JDK 7 之间的区别。

resize 方法的源码：

```java
// newCapacity为新的容量
void resize(int newCapacity) {
    // 小数组，临时过度下
    Entry[] oldTable = table;
    // 扩容前的容量
    int oldCapacity = oldTable.length;
    // MAXIMUM_CAPACITY 为最大容量，2 的 30 次方 = 1<<30
    if (oldCapacity == MAXIMUM_CAPACITY) {
        // 容量调整为 Integer 的最大值 0x7fffffff（十六进制）=2 的 31 次方-1
        threshold = Integer.MAX_VALUE;
        return;
    }

    // 初始化一个新的数组（大容量）
    Entry[] newTable = new Entry[newCapacity];
    // 把小数组的元素转移到大数组中
    transfer(newTable, initHashSeedAsNeeded(newCapacity));
    // 引用新的大数组
    table = newTable;
    // 重新计算阈值
    threshold = (int)Math.min(newCapacity * loadFactor, MAXIMUM_CAPACITY + 1);
}
```

代码注释里出现了左移（`<<`），这里简单介绍一下：

```
a=39
b = a << 2
```

十进制 39 用 8 位的二进制来表示，就是 00100111，左移两位后是 10011100（低位用 0 补上），再转成十进制数就是 156。

移位运算通常可以用来代替乘法运算和除法运算。例如，将 0010011（39）左移两位就是 10011100（156），刚好变成了原来的 4 倍。

实际上呢，二进制数左移后会变成原来的 2 倍、4 倍、8 倍。

transfer 方法用来转移，将小数组的元素拷贝到新的数组中。

```java
void transfer(Entry[] newTable, boolean rehash) {
    // 新的容量
    int newCapacity = newTable.length;
    // 遍历小数组
    for (Entry<K,V> e : table) {
        while(null != e) {
            // 拉链法，相同 key 上的不同值
            Entry<K,V> next = e.next;
            // 是否需要重新计算 hash
            if (rehash) {
                e.hash = null == e.key ? 0 : hash(e.key);
            }
            // 根据大数组的容量，和键的 hash 计算元素在数组中的下标
            int i = indexFor(e.hash, newCapacity);

            // 同一位置上的新元素被放在链表的头部
            e.next = newTable[i];

            // 放在新的数组上
            newTable[i] = e;

            // 链表上的下一个元素
            e = next;
        }
    }
}
```

`e.next = newTable[i]`，也就是使用了单链表的头插入方式，同一位置上新元素总会被放在链表的头部位置；这样先放在一个索引上的元素终会被放到链表的尾部（如果发生了hash冲突的话），这一点和 JDK 8 有区别。

**在旧数组中同一个链表上的元素，通过重新计算索引位置后，有可能被放到了新数组的不同位置上**（仔细看下面的内容，会解释清楚这一点）。

假设 hash 算法就是简单的用键的哈希值（一个 int 值）和数组大小取模（也就是 hashCode % table.length）。

继续假设：

- 数组 table 的长度为 2
- 键的哈希值为 3、7、5

取模运算后，哈希冲突都到 table[1] 上了，因为余数为 1。那么扩容前的样子如下图所示。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/hashmap-resize-01.png)

小数组的容量为 2， key 3、7、5 都在 table[1] 的链表上。

假设负载因子 loadFactor 为 1，也就是当元素的实际大小大于 table 的实际大小时进行扩容。

扩容后的大数组的容量为 4。

- key 3 取模（3%4）后是 3，放在 table[3] 上。
- key 7 取模（7%4）后是 3，放在 table[3] 上的链表头部。
- key 5 取模（5%4）后是 1，放在 table[1] 上。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/hashmap-resize-02.png)

按照我们的预期，扩容后的 7 仍然应该在 3 这条链表的后面，但实际上呢？ 7 跑到 3 这条链表的头部了。针对 JDK 7 中的这个情况，JDK 8 做了哪些优化呢？

看下面这张图。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/hashmap-resize-03.png)

n 为 table 的长度，默认值为 16。

- n-1 也就是二进制的 0000 1111（1X$2^0$+1X$2^1$+1X$2^2$+1X$2^3$=1+2+4+8=15）；
- key1 哈希值的最后 8 位为 0000 0101
- key2 哈希值的最后 8 位为 0001 0101（和 key1 不同）
- 做与运算后发生了哈希冲突，索引都在（0000 0101）上。

扩容后为 32。

- n-1 也就是二进制的 0001 1111（1X$2^0$+1X$2^1$+1X$2^2$+1X$2^3$+1X$2^4$=1+2+4+8+16=31），扩容前是 0000 1111。
- key1 哈希值的低位为 0000 0101
- key2 哈希值的低位为 0001 0101（和 key1 不同）
- key1 做与运算后，索引为 0000 0101。
- key2 做与运算后，索引为 0001 0101。

新的索引就会发生这样的变化：

- 原来的索引是 5（*0* 0101）
- 原来的容量是 16
- 扩容后的容量是 32
- 扩容后的索引是 21（*1* 0101），也就是 5+16，也就是原来的索引+原来的容量

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/hashmap-resize-04.png)


也就是说，JDK 8 不需要像 JDK 7 那样重新计算 hash，只需要看原来的hash值新增的那个bit是1还是0就好了，是0的话就表示索引没变，是1的话，索引就变成了“原索引+原来的容量”。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/hashmap-resize-05.png)

JDK 8 的这个设计非常巧妙，既省去了重新计算hash的时间，同时，由于新增的1 bit是0还是1是随机的，因此扩容的过程，可以均匀地把之前的节点分散到新的位置上。

 woc，只能说 HashMap 的作者 Doug Lea、Josh Bloch、Arthur van Hoff、Neal Gafter 真的强——的一笔。

JDK 8 扩容的源代码：

```java
final Node<K,V>[] resize() {
    Node<K,V>[] oldTab = table;
    int oldCap = (oldTab == null) ? 0 : oldTab.length;
    int oldThr = threshold;
    int newCap, newThr = 0;
    if (oldCap > 0) {
        // 超过最大值就不再扩充了，就只好随你碰撞去吧
        if (oldCap >= MAXIMUM_CAPACITY) {
            threshold = Integer.MAX_VALUE;
            return oldTab;
        }
        // 没超过最大值，就扩充为原来的2倍
        else if ((newCap = oldCap << 1) < MAXIMUM_CAPACITY &&
                 oldCap >= DEFAULT_INITIAL_CAPACITY)
            newThr = oldThr << 1; // double threshold
    }
    else if (oldThr > 0) // initial capacity was placed in threshold
        newCap = oldThr;
    else {               // zero initial threshold signifies using defaults
        newCap = DEFAULT_INITIAL_CAPACITY;
        newThr = (int)(DEFAULT_LOAD_FACTOR * DEFAULT_INITIAL_CAPACITY);
    }
    // 计算新的resize上限
    if (newThr == 0) {
        float ft = (float)newCap * loadFactor;
        newThr = (newCap < MAXIMUM_CAPACITY && ft < (float)MAXIMUM_CAPACITY ?
                  (int)ft : Integer.MAX_VALUE);
    }
    threshold = newThr;
    @SuppressWarnings({"rawtypes","unchecked"})
        Node<K,V>[] newTab = (Node<K,V>[])new Node[newCap];
    table = newTab;
    if (oldTab != null) {
        // 小数组复制到大数组
        for (int j = 0; j < oldCap; ++j) {
            Node<K,V> e;
            if ((e = oldTab[j]) != null) {
                oldTab[j] = null;
                if (e.next == null)
                    newTab[e.hash & (newCap - 1)] = e;
                else if (e instanceof TreeNode)
                    ((TreeNode<K,V>)e).split(this, newTab, j, oldCap);
                else { // preserve order
                    // 链表优化重 hash 的代码块
                    Node<K,V> loHead = null, loTail = null;
                    Node<K,V> hiHead = null, hiTail = null;
                    Node<K,V> next;
                    do {
                        next = e.next;
                        if ((e.hash & oldCap) == 0) {
                            if (loTail == null)
                                loHead = e;
                            else
                                loTail.next = e;
                            loTail = e;
                        }
                        else {
                            if (hiTail == null)
                                hiHead = e;
                            else
                                hiTail.next = e;
                            hiTail = e;
                        }
                    } while ((e = next) != null);
                    // 原来的索引
                    if (loTail != null) {
                        loTail.next = null;
                        newTab[j] = loHead;
                    }
                    // 索引+原来的容量
                    if (hiTail != null) {
                        hiTail.next = null;
                        newTab[j + oldCap] = hiHead;
                    }
                }
            }
        }
    }
    return newTab;
}
```

## 三、加载因子为什么是0.75

JDK 8 中的 HashMap 是用数组+链表+红黑树实现的，我们要想往 HashMap 中放数据或者取数据，就需要确定数据在数组中的下标。

先把数据的键进行一次 hash：

```java
static final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}
```

再做一次取模运算确定下标：

```
i = (n - 1) & hash
```

哈希表这样的数据结构容易产生两个问题：

- 数组的容量过小，经过哈希计算后的下标，容易出现冲突；
- 数组的容量过大，导致空间利用率不高。

加载因子是用来表示 HashMap 中数据的填满程度：

>加载因子 = 填入哈希表中的数据个数 / 哈希表的长度

这就意味着：

- 加载因子越小，填满的数据就越少，哈希冲突的几率就减少了，但浪费了空间，而且还会提高扩容的触发几率；
- 加载因子越大，填满的数据就越多，空间利用率就高，但哈希冲突的几率就变大了。

好难！！！！

这就必须在“**哈希冲突**”与“**空间利用率**”两者之间有所取舍，尽量保持平衡，谁也不碍着谁。

我们知道，HashMap 是通过拉链法来解决哈希冲突的。

为了减少哈希冲突发生的概率，当 HashMap 的数组长度达到一个**临界值**的时候，就会触发扩容，扩容后会将之前小数组中的元素转移到大数组中，这是一个相当耗时的操作。

这个临界值由什么来确定呢？

>临界值 = 初始容量 * 加载因子

一开始，HashMap 的容量是 16：

```java
static final int DEFAULT_INITIAL_CAPACITY = 1 << 4; // aka 16
```

加载因子是 0.75：

```java
static final float DEFAULT_LOAD_FACTOR = 0.75f;
```

也就是说，当 16*0.75=12 时，会触发扩容机制。

为什么加载因子会选择 0.75 呢？为什么不是0.8、0.6呢？

这跟统计学里的一个很重要的原理——泊松分布有关。

是时候上维基百科了：

>泊松分布，是一种统计与概率学里常见到的离散概率分布，由法国数学家西莫恩·德尼·泊松在1838年时提出。它会对随机事件的发生次数进行建模，适用于涉及计算在给定的时间段、距离、面积等范围内发生随机事件的次数的应用情形。

阮一峰老师曾在一篇博文中详细的介绍了泊松分布和指数分布，大家可以去看一下。

>链接：[https://www.ruanyifeng.com/blog/2015/06/poisson-distribution.html](https://www.ruanyifeng.com/blog/2015/06/poisson-distribution.html)

具体是用这么一个公式来表示的。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/hashmap-loadfactor-01.png)

等号的左边，P 表示概率，N表示某种函数关系，t 表示时间，n 表示数量。

在 HashMap 的 doc 文档里，曾有这么一段描述：

```
Because TreeNodes are about twice the size of regular nodes, we
use them only when bins contain enough nodes to warrant use
(see TREEIFY_THRESHOLD). And when they become too small (due to
removal or resizing) they are converted back to plain bins.  In
usages with well-distributed user hashCodes, tree bins are
rarely used.  Ideally, under random hashCodes, the frequency of
nodes in bins follows a Poisson distribution
(http://en.wikipedia.org/wiki/Poisson_distribution) with a
parameter of about 0.5 on average for the default resizing
threshold of 0.75, although with a large variance because of
resizing granularity. Ignoring variance, the expected
occurrences of list size k are (exp(-0.5) * pow(0.5, k) /
factorial(k)). The first values are:
0:    0.60653066
1:    0.30326533
2:    0.07581633
3:    0.01263606
4:    0.00157952
5:    0.00015795
6:    0.00001316
7:    0.00000094
8:    0.00000006
more: less than 1 in ten million
```

大致的意思就是：

因为 TreeNode（红黑树）的大小约为链表节点的两倍，所以我们只有在一个拉链已经拉了足够节点的时候才会转为tree（参考TREEIFY_THRESHOLD）。并且，当这个hash桶的节点因为移除或者扩容后resize数量变小的时候，我们会将树再转为拉链。如果一个用户的数据的hashcode值分布得很均匀的话，就会很少使用到红黑树。

理想情况下，我们使用随机的hashcode值，加载因子为0.75情况，尽管由于粒度调整会产生较大的方差，节点的分布频率仍然会服从参数为0.5的泊松分布。链表的长度为 8 发生的概率仅有 0.00000006。

虽然这段话的本意更多的是表示 jdk 8中为什么拉链长度超过8的时候进行了红黑树转换，但提到了 0.75 这个加载因子——但这并不是为什么加载因子是 0.75 的答案。

为了搞清楚到底为什么，我看到了这篇文章：

>参考链接：[https://segmentfault.com/a/1190000023308658](https://segmentfault.com/a/1190000023308658)

里面提到了一个概念：**二项分布**（二哥概率论没学好，只能简单说一说）。

在做一件事情的时候，其结果的概率只有2种情况，和抛硬币一样，不是正面就是反面。

为此，我们做了 N 次实验，那么在每次试验中只有两种可能的结果，并且每次实验是独立的，不同实验之间互不影响，每次实验成功的概率都是一样的。

以此理论为基础，我们来做这样的实验：我们往哈希表中扔数据，如果发生哈希冲突就为失败，否则为成功。

我们可以设想，实验的hash值是随机的，并且经过hash运算的键都会映射到hash表的地址空间上，那么这个结果也是随机的。所以，每次put的时候就相当于我们在扔一个16面（我们先假设默认长度为16）的骰子，扔骰子实验那肯定是相互独立的。碰撞发生即扔了n次有出现重复数字。

然后，我们的目的是啥呢？

就是掷了k次骰子，没有一次是相同的概率，需要尽可能的大些，一般意义上我们肯定要大于0.5（这个数是个理想数，但是我是能接受的）。

于是，n次事件里面，碰撞为0的概率，由上面公式得：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/hashmap-loadfactor-02.png)

这个概率值需要大于0.5，我们认为这样的hashmap可以提供很低的碰撞率。所以：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/hashmap-loadfactor-03png)

这时候，我们对于该公式其实最想求的时候长度s的时候，n为多少次就应该进行扩容了？而负载因子则是$n/s$的值。所以推导如下：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/hashmap-loadfactor-04.png)

所以可以得到

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/hashmap-loadfactor-05.png)

其中

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/hashmap-loadfactor-06.png)

这就是一个求 `∞⋅0`函数极限问题，这里我们先令$s = m+1（m \to \infty）$则转化为

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/hashmap-loadfactor-07.png)

我们再令 $x = \frac{1}{m} （x \to 0）$ 则有，

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/hashmap-loadfactor-08.png)

所以，

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/hashmap-loadfactor-09.png)


考虑到 HashMap的容量有一个要求：它必须是2的n 次幂。当加载因子选择了0.75就可以保证它与容量的乘积为整数。

```
16*0.75=12
32*0.75=24
```

除了 0.75，0.5~1 之间还有 0.625（5/8）、0.875（7/8）可选，从中位数的角度，挑 0.75 比较完美。另外，维基百科上说，拉链法（解决哈希冲突的一种）的加载因子最好限制在 0.7-0.8以下，超过0.8，查表时的CPU缓存不命中（cache missing）会按照指数曲线上升。

综上，0.75 是个比较完美的选择。

## 四、线程不安全

三方面原因：多线程下扩容会死循环、多线程下 put 会导致元素丢失、put 和 get 并发时会导致 get 到 null，我们来一一分析。

### 01、多线程下扩容会死循环

众所周知，HashMap 是通过拉链法来解决哈希冲突的，也就是当哈希冲突时，会将相同哈希值的键值对通过链表的形式存放起来。

JDK 7 时，采用的是头部插入的方式来存放链表的，也就是下一个冲突的键值对会放在上一个键值对的前面（同一位置上的新元素被放在链表的头部）。扩容的时候就有可能导致出现环形链表，造成死循环。

resize 方法的源码：

```java
// newCapacity为新的容量
void resize(int newCapacity) {
    // 小数组，临时过度下
    Entry[] oldTable = table;
    // 扩容前的容量
    int oldCapacity = oldTable.length;
    // MAXIMUM_CAPACITY 为最大容量，2 的 30 次方 = 1<<30
    if (oldCapacity == MAXIMUM_CAPACITY) {
        // 容量调整为 Integer 的最大值 0x7fffffff（十六进制）=2 的 31 次方-1
        threshold = Integer.MAX_VALUE;
        return;
    }

    // 初始化一个新的数组（大容量）
    Entry[] newTable = new Entry[newCapacity];
    // 把小数组的元素转移到大数组中
    transfer(newTable, initHashSeedAsNeeded(newCapacity));
    // 引用新的大数组
    table = newTable;
    // 重新计算阈值
    threshold = (int)Math.min(newCapacity * loadFactor, MAXIMUM_CAPACITY + 1);
}
```

transfer 方法用来转移，将小数组的元素拷贝到新的数组中。

```java
void transfer(Entry[] newTable, boolean rehash) {
    // 新的容量
    int newCapacity = newTable.length;
    // 遍历小数组
    for (Entry<K,V> e : table) {
        while(null != e) {
            // 拉链法，相同 key 上的不同值
            Entry<K,V> next = e.next;
            // 是否需要重新计算 hash
            if (rehash) {
                e.hash = null == e.key ? 0 : hash(e.key);
            }
            // 根据大数组的容量，和键的 hash 计算元素在数组中的下标
            int i = indexFor(e.hash, newCapacity);

            // 同一位置上的新元素被放在链表的头部
            e.next = newTable[i];

            // 放在新的数组上
            newTable[i] = e;

            // 链表上的下一个元素
            e = next;
        }
    }
}
```

注意 `e.next = newTable[i]` 和 `newTable[i] = e` 这两行代码，就会将同一位置上的新元素被放在链表的头部。

扩容前的样子假如是下面这样子。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/hashmap-thread-nosafe-01.png)

那么正常扩容后就是下面这样子。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/hashmap-thread-nosafe-02.png)

假设现在有两个线程同时进行扩容，线程 A 在执行到 `newTable[i] = e;` 被挂起，此时线程 A 中：e=3、next=7、e.next=null

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/hashmap-thread-nosafe-03.png)


线程 B 开始执行，并且完成了数据转移。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/hashmap-thread-nosafe-04.png)


此时，7 的 next 为 3，3 的 next 为 null。

随后线程A获得CPU时间片继续执行 `newTable[i] = e`，将3放入新数组对应的位置，执行完此轮循环后线程A的情况如下：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/hashmap-thread-nosafe-05.png)

执行下一轮循环，此时 e=7，原本线程 A 中 7 的 next 为 5，但由于 table 是线程 A 和线程 B 共享的，而线程 B 顺利执行完后，7 的 next 变成了 3，那么此时线程 A 中，7 的 next 也为 3 了。

采用头部插入的方式，变成了下面这样子：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/hashmap-thread-nosafe-06.png)

好像也没什么问题，此时 next = 3，e = 3。

进行下一轮循环，但此时，由于线程 B 将 3 的 next 变为了 null，所以此轮循环应该是最后一轮了。

接下来当执行完 `e.next=newTable[i]` 即 3.next=7 后，3 和 7 之间就相互链接了，执行完 `newTable[i]=e` 后，3 被头插法重新插入到链表中，执行结果如下图所示：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/hashmap-thread-nosafe-07.png)

套娃开始，元素 5 也就成了弃婴，惨~~~

不过，JDK 8 时已经修复了这个问题，扩容时会保持链表原来的顺序。

### 02、多线程下 put 会导致元素丢失

正常情况下，当发生哈希冲突时，HashMap 是这样的：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/hashmap-thread-nosafe-08.png)

但多线程同时执行 put 操作时，如果计算出来的索引位置是相同的，那会造成前一个 key 被后一个 key 覆盖，从而导致元素的丢失。

put 的源码：

```java
final V putVal(int hash, K key, V value, boolean onlyIfAbsent,
               boolean evict) {
    Node<K,V>[] tab; Node<K,V> p; int n, i;

    // 步骤①：tab为空则创建
    if ((tab = table) == null || (n = tab.length) == 0)
        n = (tab = resize()).length;

    // 步骤②：计算index，并对null做处理 
    if ((p = tab[i = (n - 1) & hash]) == null)
        tab[i] = newNode(hash, key, value, null);
    else {
        Node<K,V> e; K k;

        // 步骤③：节点key存在，直接覆盖value
        if (p.hash == hash &&
            ((k = p.key) == key || (key != null && key.equals(k))))
            e = p;

        // 步骤④：判断该链为红黑树
        else if (p instanceof TreeNode)
            e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);

        // 步骤⑤：该链为链表
        else {
            for (int binCount = 0; ; ++binCount) {
                if ((e = p.next) == null) {
                    p.next = newNode(hash, key, value, null);

                    //链表长度大于8转换为红黑树进行处理
                    if (binCount >= TREEIFY_THRESHOLD - 1) // -1 for 1st
                        treeifyBin(tab, hash);
                    break;
                }

                // key已经存在直接覆盖value
                if (e.hash == hash &&
                    ((k = e.key) == key || (key != null && key.equals(k))))
                    break;
                p = e;
            }
        }

        // 步骤⑥、直接覆盖
        if (e != null) { // existing mapping for key
            V oldValue = e.value;
            if (!onlyIfAbsent || oldValue == null)
                e.value = value;
            afterNodeAccess(e);
            return oldValue;
        }
    }
    ++modCount;

    // 步骤⑦：超过最大容量 就扩容
    if (++size > threshold)
        resize();
    afterNodeInsertion(evict);
    return null;
}
```

问题发生在步骤 ② 这里：

```java
if ((p = tab[i = (n - 1) & hash]) == null)
    tab[i] = newNode(hash, key, value, null);
```

两个线程都执行了 if 语句，假设线程 A 先执行了 ` tab[i] = newNode(hash, key, value, null)`，那 table 是这样的：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/hashmap-thread-nosafe-09.png)

接着，线程 B 执行了 ` tab[i] = newNode(hash, key, value, null)`，那 table 是这样的：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/hashmap-thread-nosafe-10.png)

3 被干掉了。

### 03、put 和 get 并发时会导致 get 到 null

线程 A 执行put时，因为元素个数超出阈值而出现扩容，线程B 此时执行get，有可能导致这个问题。

注意来看 resize 源码：

```java
final Node<K,V>[] resize() {
    Node<K,V>[] oldTab = table;
    int oldCap = (oldTab == null) ? 0 : oldTab.length;
    int oldThr = threshold;
    int newCap, newThr = 0;
    if (oldCap > 0) {
        // 超过最大值就不再扩充了，就只好随你碰撞去吧
        if (oldCap >= MAXIMUM_CAPACITY) {
            threshold = Integer.MAX_VALUE;
            return oldTab;
        }
        // 没超过最大值，就扩充为原来的2倍
        else if ((newCap = oldCap << 1) < MAXIMUM_CAPACITY &&
                 oldCap >= DEFAULT_INITIAL_CAPACITY)
            newThr = oldThr << 1; // double threshold
    }
    else if (oldThr > 0) // initial capacity was placed in threshold
        newCap = oldThr;
    else {               // zero initial threshold signifies using defaults
        newCap = DEFAULT_INITIAL_CAPACITY;
        newThr = (int)(DEFAULT_LOAD_FACTOR * DEFAULT_INITIAL_CAPACITY);
    }
    // 计算新的resize上限
    if (newThr == 0) {
        float ft = (float)newCap * loadFactor;
        newThr = (newCap < MAXIMUM_CAPACITY && ft < (float)MAXIMUM_CAPACITY ?
                  (int)ft : Integer.MAX_VALUE);
    }
    threshold = newThr;
    @SuppressWarnings({"rawtypes","unchecked"})
        Node<K,V>[] newTab = (Node<K,V>[])new Node[newCap];
    table = newTab;
}
```

线程 A 执行完 `table = newTab` 之后，线程 B 中的 table 此时也发生了变化，此时去 get 的时候当然会 get 到 null 了，因为元素还没有转移。

参考链接：

> - [https://blog.csdn.net/lonyw/article/details/80519652](https://blog.csdn.net/lonyw/article/details/80519652)
> - [https://zhuanlan.zhihu.com/p/91636401](https://zhuanlan.zhihu.com/p/91636401)
> - [https://www.zhihu.com/question/20733617](https://www.zhihu.com/question/20733617)
> - [https://zhuanlan.zhihu.com/p/21673805](https://zhuanlan.zhihu.com/p/21673805)

----

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)