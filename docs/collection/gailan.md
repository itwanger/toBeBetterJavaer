---
category:
  - Java核心
tag:
  - Java
---

# Java集合框架


眼瞅着三妹的王者荣耀杀得正嗨，我趁机喊到：“别打了，三妹，我们来一起学习 Java 的集合框架吧。”

“才不要呢，等我打完这一局啊。”三妹倔强地说。

“好吧。”我只好摊摊手地说，“那我先画张集合框架的结构图等着你。”

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/images/collection/gailan-01.png)


“完了没？三妹。”

“完了好一会儿了，二哥，你图画得真慢，让我瞧瞧怎么样？”

“害，图要画得清晰明了，不容易的。三妹，你瞧，不错吧。”

Java 集合框架可以分为两条大的支线：

- Collection，主要由 List、Set、Queue 组成，List 代表有序、可重复的集合，典型代表就是封装了动态数组的 ArrayList 和封装了链表的 LinkedList；Set 代表无序、不可重复的集合，典型代表就是 HashSet 和 TreeSet；Queue 代表队列，典型代表就是双端队列 ArrayDeque，以及优先级队列 PriorityQue。
- Map，代表键值对的集合，典型代表就是 HashMap。

“接下来，我们再来过一遍。”

### 01、List

>List 的特点是存取有序，可以存放重复的元素，可以用下标对元素进行操作

**1）ArrayList**

- ArrayList 是由数组实现的，支持随机存取，也就是可以通过下标直接存取元素；
- 从尾部插入和删除元素会比较快捷，从中间插入和删除元素会比较低效，因为涉及到数组元素的复制和移动；
- 如果内部数组的容量不足时会自动扩容，因此当元素非常庞大的时候，效率会比较低。

**2）LinkedList**

- LinkedList 是由双向链表实现的，不支持随机存取，只能从一端开始遍历，直到找到需要的元素后返回；
- 任意位置插入和删除元素都很方便，因为只需要改变前一个节点和后一个节点的引用即可，不像 ArrayList 那样需要复制和移动数组元素；
- 因为每个元素都存储了前一个和后一个节点的引用，所以相对来说，占用的内存空间会比 ArrayList 多一些。

**3）Vector 和 Stack**

List 的实现类还有一个 Vector，是一个元老级的类，比 ArrayList 出现得更早。ArrayList 和 Vector 非常相似，只不过 Vector 是线程安全的，像 get、set、add 这些方法都加了 `synchronized` 关键字，就导致执行执行效率会比较低，所以现在已经很少用了。

更好的选择是并发包下的 CopyOnWriteArrayList。

Stack 是 Vector 的一个子类，本质上也是由动态数组实现的，只不过还实现了先进后出的功能（在 get、set、add 方法的基础上追加了 pop、peek 等方法），所以叫栈。

不过，由于 Stack 执行效率比较低（方法上同样加了 synchronized 关键字），就被双端队列 ArrayDeque 取代了。

### 02、Set

> Set 的特点是存取无序，不可以存放重复的元素，不可以用下标对元素进行操作，和 List 有很多不同

**1）HashSet**

HashSet 其实是由 HashMap 实现的，只不过值由一个固定的 Object 对象填充，而键用于操作。

```java
public class HashSet<E>
    extends AbstractSet<E>
    implements Set<E>, Cloneable, java.io.Serializable
{
    private transient HashMap<E,Object> map;

    // Dummy value to associate with an Object in the backing Map
    private static final Object PRESENT = new Object();

    public HashSet() {
        map = new HashMap<>();
    }

    public boolean add(E e) {
        return map.put(e, PRESENT)==null;
    }

    public boolean remove(Object o) {
        return map.remove(o)==PRESENT;
    }
}
```

**2）LinkedHashSet**

LinkedHashSet 继承自 HashSet，其实是由 LinkedHashMap 实现的，LinkedHashSet 的构造方法调用了 HashSet 的一个特殊的构造方法：

```java
HashSet(int initialCapacity, float loadFactor, boolean dummy) {
   map = new LinkedHashMap<>(initialCapacity, loadFactor);
}
```

**3）TreeSet**

“二哥，不用你讲了，我能猜到，TreeSet 是由 TreeMap 实现的，只不过同样操作的键位，值由一个固定的 Object 对象填充。”

哇，三妹都学会了推理。

“是的，总体上来说，Set 集合不是关注的重点，因为底层都是由 Map 实现的，为什么要用 Map 实现呢？三妹你能猜到原因吗？”

“让我想想。”

“嗯？难道是因为 Map 的键不允许重复、无序吗？”

老天，竟然被三妹猜到了。

“是的，你这水平长进了呀，三妹。”

### 03、Queue

> Queue，也就是队列，通常遵循先进先出（FIFO）的原则，新元素插入到队列的尾部，访问元素返回队列的头部。

**1）ArrayDeque**

从名字上可以看得出，ArrayDeque 是一个基于数组实现的双端队列，为了满足可以同时在数组两端插入或删除元素的需求，数组必须是循环的，也就是说数组的任何一点都可以被看作是起点或者终点。

这是一个包含了 4 个元素的双端队列，和一个包含了 5 个元素的双端队列。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/images/collection/gailan-02.png)

head 指向队首的第一个有效的元素，tail 指向队尾第一个可以插入元素的空位，因为是循环数组，所以 head 不一定从是从 0 开始，tail 也不一定总是比 head 大。

**2）LinkedList**

LinkedList 一般都归在 List 下，只不过，它也实现了 Deque 接口，可以作为队列来使用。等于说，LinkedList 同时实现了 Stack、Queue、PriorityQueue 的所有功能。

**3）PriorityQueue**

PriorityQueue 是一种优先级队列，它的出队顺序与元素的优先级有关，执行 remove 或者 poll 方法，返回的总是优先级最高的元素。

要想有优先级，元素就需要实现 Comparable 接口或者 Comparator 接口。

### 04、Map

> Map 保存的是键值对，键要求保持唯一性，值可以重复。

**1）HashMap**

HashMap 实现了 Map 接口，根据键的 HashCode 值来存储数据，具有很快的访问速度，最多允许一个 null 键。

HashMap 不论是在学习还是工作当中，使用频率都是相当高的。随着 JDK 版本的不断更新，HashMap 的底层也优化了很多次，JDK 8 的时候引入了红黑树。

```java
final V putVal(int hash, K key, V value, boolean onlyIfAbsent,
               boolean evict) {
    HashMap.Node<K,V>[] tab; HashMap.Node<K,V> p; int n, i;
    if ((tab = table) == null || (n = tab.length) == 0)
        n = (tab = resize()).length;
    if ((p = tab[i = (n - 1) & hash]) == null)
        tab[i] = newNode(hash, key, value, null);
    else {
        HashMap.Node<K,V> e; K k;
        if (p.hash == hash &&
                ((k = p.key) == key || (key != null && key.equals(k))))
            e = p;
        else if (p instanceof HashMap.TreeNode)
            e = ((HashMap.TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
        else {
            for (int binCount = 0; ; ++binCount) {
                if ((e = p.next) == null) {
                    p.next = newNode(hash, key, value, null);
                    if (binCount >= TREEIFY_THRESHOLD - 1) // -1 for 1st
                        treeifyBin(tab, hash);
                    break;
                }
                if (e.hash == hash &&
                        ((k = e.key) == key || (key != null && key.equals(k))))
                    break;
                p = e;
            }
        }
    return null;
}
```

一旦 HashMap 发生哈希冲突，就把相同键位的地方改成链表，如果链表的长度超过 8，就该用红黑树。

**2）LinkedHashMap**

大多数情况下，只要不涉及线程安全问题，Map基本都可以使用HashMap，不过HashMap有一个问题，就是迭代HashMap的顺序并不是HashMap放置的顺序，也就是无序。HashMap的这一缺点往往会带来困扰，因为有些场景，我们期待一个有序的Map。

大多数情况下，只要不涉及到线程安全的问题，有需要键值对的时候就会使用 HashMap，但 HashMap 有一个问题，就是 HashMap 是无序的。在某些场景下，我们需要一个有序的 Map。

于是 LinkedHashMap 就闪亮登场了。LinkedHashMap 是 HashMap 的子类，内部使用链表来记录插入/访问元素的顺序。

LinkedHashMap 可以看作是 HashMap + LinkedList 的合体，它使用了 哈希表来存储数据，又用了双向链表来维持顺序。

**3）TreeMap**

HashMap 是无序的，所以遍历的时候元素的顺序也是不可测的。TreeMap 是有序的，它在内部会对键进行排序，所以遍历的时候就可以得到预期的顺序。

为了保证顺序，TreeMap 的键必须要实现 Comparable 接口或者 Comparator 接口。

### 05、时间复杂度

“二哥，为什么要讲时间复杂度呀？”三妹问。

“因为接下来要用到啊。后面我们学习 ArrayList、LinkedList 的时候，会比较两者在增删改查时的执行效率，而时间复杂度是衡量执行效率的一个重要标准。”我说。

“到时候跑一下代码，统计一下前后的时间差不更准确吗？”三妹反问道。

“实际上，你说的是另外一种评估方法，这种评估方法可以得出非常准确的数值，但也有很大的局限性。”我不急不慢地说。

第一，测试结果会受到测试环境的影响。你比如说，同样的代码，在我这台 iMac 上跑出来的时间和在你那台华为的 MacBook 上抛出的时间可能就差别很大。

第二，测试结果会受到测试数据的影响。你比如说，一个排序后的数组和一个没有排序后的数组，调用了同一个查询方法，得出来的结果可能会差别特别大。

“因此，我们需要这种不依赖于具体测试环境和测试数据就能粗略地估算出执行效率的方法，时间复杂度就是其中的一种，还有一种是空间复杂度。”我继续补充道。

来看下面这段代码：

```java
public static int sum(int n) {
    int sum = 0; // 第 1 行
    for (int i=0;i<n;i++) { // 第 2 行
        sum = sum + 1; // 第 3 行
    } // 第 4 行
    return sum; // 第 5 行
}
```

这段代码非常简单，方法体里总共 5 行代码，包括“}”那一行。每段代码的执行时间可能都不大一样，但假设我们认为每行代码的执行时间是一样的，比如说 unit_time，那么这段代码总的执行时间为多少呢？

“这个我知道呀！”三妹喊道，“第 1、5 行需要 2 个 unit_time，第 2、3 行需要 2*n*unit_time，总的时间就是 2(n+1)*unit_time。”

“对，一段代码的执行时间 T(n) 和总的执行次数成正比，也就是说，代码执行的次数越多，花费的时间就越多。”我总结道，“这个规律可以用一个公式来表达：”

> T(n) = O(f(n))

f(n) 表示代码总的执行次数，大写 O 表示代码的执行时间 T(n) 和 f(n) 成正比。

这也就是大 O 表示法，它不关心代码具体的执行时间是多少，它关心的是代码执行时间的变化趋势，这也就是时间复杂度这个概念的由来。

对于上面那段代码 `sum()` 来说，影响时间复杂度的主要是第 2 行代码，其余的，像系数 2、常数 2 都是可以忽略不计的，我们只关心影响最大的那个，所以时间复杂度就表示为 `O(n)`。

常见的时间复杂度有这么 3 个：

1）`O(1)`

代码的执行时间，和数据规模 n 没有多大关系。

括号中的 1 可以是 3，可以是 5，可以 100，我们习惯用 1 来表示，表示这段代码的执行时间是一个常数级别。比如说下面这段代码：

```java
int i = 0;
int j = 0;
int k = i + j;
```

实际上执行了 3 次，但我们也认为这段代码的时间复杂度为 `O(1)`。

2）`O(n)`

时间复杂度和数据规模 n 是线性关系。换句话说，数据规模增大 K 倍，代码执行的时间就大致增加 K 倍。

3）`O(logn)`

时间复杂度和数据规模 n 是对数关系。换句话说，数据规模大幅增加时，代码执行的时间只有少量增加。

来看一下代码示例，

```java
public static void logn(int n) { 
    int i = 1;
    while (i < n) {
        i *= 2;
    }
}
```

换句话说，当数据量 n 从 2 增加到 2^64 时，代码执行的时间只增加 64 倍。

```
遍历次数 |   i
----------+-------
    0     |   i
    1     |  i*2
    2     |  i*4
   ...    |  ...
   ...    |  ...
    k     |  i*2^k 
```

“好了，三妹，这节就讲到这吧，理解了上面 3 个时间复杂度，后面我们学习 ArrayList、LinkedList 的时候，两者在增删改查时的执行效率就很容易对比清楚了。”我伸了个懒腰后对三妹说，“整体上，集合框架就这么多东西了，随后我们会一一展开来讲，比如说 ArrayList、LinkedList、HashMap 等。”。

“好的，二哥。”三妹重新回答沙发上，一盘王者荣耀即将开始。

<img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png" width="700px">