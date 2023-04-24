---
title: Java LinkedHashMap详解：从源码分析到实践应用
shortTitle: LinkedHashMap详解（附源码）
category:
  - Java核心
tag:
  - 集合框架（容器）
description: 本文详细解析了 Java LinkedHashMap 的实现原理、功能特点以及源码，为您提供了 LinkedHashMap 的实际应用示例和性能优化建议。阅读本文，将帮助您更深入地理解 LinkedHashMap，从而在实际编程中充分发挥其优势。
head:
  - - meta
    - name: keywords
      content: Java,LinkedHashMap,java LinkedHashMap, 源码分析, 实现原理
---

# 6.10 LinkedHashMap详解（附源码）

>这篇继续换个文风来写，给大家一点新鲜的空气。

俗话说了，“金无足赤人无完人”，HashMap 也不例外，有一种需求它就满足不了，假如我们需要一个按照插入顺序来排列的键值对集合，那 HashMap 就无能为力了。那该怎么办呢？必须得上今天这篇文章的主角：LinkedHashMap。

同学们好啊，还记得 [HashMap](https://tobebetterjavaer.com/collection/hashmap.html) 那篇吗？我自己感觉写得非常棒啊，既通俗易懂，又深入源码，真的是分析得透透彻彻、清清楚楚、明明白白的。（一不小心又甩了三个成语，有文化吧？）HashMap 哪哪都好，真的，只要你想用键值对，第一时间就应该想到它。

为了提高查找效率，HashMap 在插入的时候对键做了一次哈希算法，这就导致插入的元素是无序的。

对这一点还不太明白的同学，可以再回到 [HashMap](https://tobebetterjavaer.com/collection/hashmap.html) 那一篇，看看 hash 方法，再看看我对 `put()` 方法的讲解，就能明白了，我们这里再来回顾一下。

```java
final V putVal(int hash, K key, V value, boolean onlyIfAbsent,

               boolean evict) {
    HashMap.Node<K,V>[] tab; HashMap.Node<K,V> p; int n, i;
    // ①、数组 table 为 null 时，调用 resize 方法创建默认大小的数组
    if ((tab = table) == null || (n = tab.length) == 0)
        n = (tab = resize()).length;
    // ②、计算下标，如果该位置上没有值，则填充
    if ((p = tab[i = (n - 1) & hash]) == null)
        tab[i] = newNode(hash, key, value, null);
}
```

其中这个公式 `i = (n - 1) & hash` 计算后的值就是键位在数组（桶）中的索引（下标/位置），但这它并不是按照 0、1、2、3、4、5 这样有序的下标将键值对插入到数组当中的，而是有一定的随机性。

比如说默认大小为 16 的 HashMap，如果 put 了 4 个键值对，可能下标是 0、4、9、11，那这样的话，在遍历 HashMap 的时候，就不一定能按照插入顺序来了。

看下面的例子。

```java
// 创建 HashMap 对象，键类型为 String，值类型为 String
Map<String, String> map = new HashMap<>();

// 使用 put() 方法向 HashMap 中添加数据
map.put("chenmo", "沉默");
map.put("wanger", "王二");
map.put("chenqingyang", "陈清扬");

// 遍历 HashMap，输出所有键值对
for (Map.Entry<String, String> entry : map.entrySet()) {
    String key = entry.getKey();
    String value = entry.getValue();
    System.out.println("Key: " + key + ", Value: " + value);
}
```

来看输出结果

```
Key: chenmo, Value: 沉默
Key: chenqingyang, Value: 陈清扬
Key: wanger, Value: 王二
```

对比一下输出结果就可以看得出来，put 的时候是 沉默、王二、陈清扬的顺序，但遍历的时候就没有按照这个顺序来：沉默、陈清扬、王二，因为 HashMap 是无序的。

那怎么保证键值对的插入顺序呢？

LinkedHashMap 就是为这个需求应运而生的。LinkedHashMap 继承了 HashMap，所以 HashMap 有的关于键值对的功能，它也有了。

```java
public class LinkedHashMap<K,V>

    extends HashMap<K,V>

    implements Map<K,V>{}
```

在此基础上，LinkedHashMap 内部追加了双向链表，来维护元素的插入顺序。注意下面代码中的 before 和 after，它俩就是用来维护当前元素的前一个元素和后一个元素的顺序的。

```java
static class Entry<K,V> extends HashMap.Node<K,V> {
    Entry<K,V> before, after;
    Entry(int hash, K key, V value, Node<K,V> next) {
        super(hash, key, value, next);
    }
}
```

关于双向链表，同学们可以回头看一遍我写的 [LinkedList](https://tobebetterjavaer.com/collection/linkedlist.html) 那篇文章，会对理解本篇的 LinkedHashMap 有很大的帮助。

用 LinkedHashMap 替换 HashMap，再来对比一下输出结果。

```java
// 创建 LinkedHashMap 对象，键类型为 String，值类型为 String
Map<String, String> map = new LinkedHashMap<>();

// 使用 put() 方法向 LinkedHashMap 中添加数据
map.put("chenmo", "沉默");
map.put("wanger", "王二");
map.put("chenqingyang", "陈清扬");

// 遍历 LinkedHashMap，输出所有键值对
for (Map.Entry<String, String> entry : map.entrySet()) {
    String key = entry.getKey();
    String value = entry.getValue();
    System.out.println("Key: " + key + ", Value: " + value);
}
```

来看输出结果：

```
Key: chenmo, Value: 沉默
Key: wanger, Value: 王二
Key: chenqingyang, Value: 陈清扬
```

看，LinkedHashMap 是不是保持了插入顺序？这就对了。

### 01、插入顺序

在 [HashMap](https://tobebetterjavaer.com/collection/hashmap.html) 那篇文章里，我有讲解到一点，不知道同学们记不记得，就是 null 会插入到 HashMap 的第一位。

```java
Map<String, String> hashMap = new HashMap<>();
hashMap.put("沉", "沉默王二");
hashMap.put("默", "沉默王二");
hashMap.put("王", "沉默王二");
hashMap.put("二", "沉默王二");
hashMap.put(null, null);

for (String key : hashMap.keySet()) {
    System.out.println(key + " : " + hashMap.get(key));
}
```

输出的结果是：

```
null : null
默 : 沉默王二
沉 : 沉默王二
王 : 沉默王二
二 : 沉默王二
```

虽然 null 最后一位 put 进去的，但在遍历输出的时候，跑到了第一位。

那再来对比看一下 LinkedHashMap。

```java
Map<String, String> linkedHashMap = new LinkedHashMap<>();
linkedHashMap.put("沉", "沉默王二");
linkedHashMap.put("默", "沉默王二");
linkedHashMap.put("王", "沉默王二");
linkedHashMap.put("二", "沉默王二");
linkedHashMap.put(null, null);

for (String key : linkedHashMap.keySet()) {
    System.out.println(key + " : " + linkedHashMap.get(key));
}
```

输出结果是：

```
沉 : 沉默王二
默 : 沉默王二
王 : 沉默王二
二 : 沉默王二
null : null
```

null 在最后一位插入，在最后一位输出。

输出结果可以再次证明，**HashMap 是无序的，LinkedHashMap 是可以维持插入顺序的**。

那 LinkedHashMap 是如何做到这一点呢？我相信同学们和我一样，非常希望知道原因。

要想搞清楚，就需要深入研究一下 LinkedHashMap 的源码。LinkedHashMap 并未重写 HashMap 的 `put()` 方法，而是重写了 `put()` 方法需要调用的内部方法 `newNode()`。

这是 HashMap 的。

```java
Node<K,V> newNode(int hash, K key, V value, Node<K,V> next) {
    return new Node<>(hash, key, value, next);
}
```

这是 LinkedHashMap 的。

```java
HashMap.Node<K,V> newNode(int hash, K key, V value, HashMap.Node<K,V> e) {
    LinkedHashMap.Entry<K,V> p =
            new LinkedHashMap.Entry<>(hash, key, value, e);
    linkNodeLast(p);
    return p;
}
```

前面曾提到 LinkedHashMap.Entry 继承了 HashMap.Node，并且追加了两个字段 before 和 after，用来维持键值对的关系。

```java
static class Entry<K,V> extends HashMap.Node<K,V> {
    Entry<K,V> before, after;
    Entry(int hash, K key, V value, Node<K,V> next) {
        super(hash, key, value, next);
    }
}
```

在 LinkedHashMap 中，链表中的节点顺序是按照插入顺序维护的。当使用 put() 方法向 LinkedHashMap 中添加键值对时，会将新节点插入到链表的尾部，并更新 before 和 after 属性，以保证链表的顺序关系——由 `linkNodeLast()` 方法来完成：

```java
/**
 * 将指定节点插入到链表的尾部
 *
 * @param p 要插入的节点
 */
private void linkNodeLast(LinkedHashMap.Entry<K,V> p) {
    LinkedHashMap.Entry<K,V> last = tail; // 获取链表的尾节点
    tail = p; // 将 p 设为尾节点
    if (last == null)
        head = p; // 如果链表为空，则将 p 设为头节点
    else {
        p.before = last; // 将 p 的前驱节点设为链表的尾节点
        last.after = p; // 将链表的尾节点的后继节点设为 p
    }
}
```

看到了吧，LinkedHashMap 在添加第一个元素的时候，会把 head 赋值为第一个元素，等到第二个元素添加进来的时候，会把第二个元素的 before 赋值为第一个元素，第一个元素的 afer 赋值为第二个元素。

这就保证了键值对是按照插入顺序排列的，明白了吧？

### 02、访问顺序

LinkedHashMap 不仅能够维持插入顺序，还能够维持访问顺序。访问包括调用 `get()` 方法、`remove()` 方法和 `put()` 方法。

要维护访问顺序，需要我们在声明 LinkedHashMap 的时候指定三个参数。

```java
LinkedHashMap<String, String> map = new LinkedHashMap<>(16, .75f, true);
```

第一个参数和第二个参数，看过 [HashMap](https://tobebetterjavaer.com/collection/hashmap.html) 的同学们应该很熟悉了，指的是初始容量和负载因子。

第三个参数如果为 true 的话，就表示 LinkedHashMap 要维护访问顺序；否则，维护插入顺序。默认是 false。

```java
Map<String, String> linkedHashMap = new LinkedHashMap<>(16, .75f, true);
linkedHashMap.put("沉", "沉默王二");
linkedHashMap.put("默", "沉默王二");
linkedHashMap.put("王", "沉默王二");
linkedHashMap.put("二", "沉默王二");

System.out.println(linkedHashMap);

linkedHashMap.get("默");
System.out.println(linkedHashMap);

linkedHashMap.get("王");
System.out.println(linkedHashMap);
```

输出的结果如下所示：

```
{沉=沉默王二, 默=沉默王二, 王=沉默王二, 二=沉默王二}
{沉=沉默王二, 王=沉默王二, 二=沉默王二, 默=沉默王二}
{沉=沉默王二, 二=沉默王二, 默=沉默王二, 王=沉默王二}
```

当我们使用 `get()` 方法访问键位“默”的元素后，输出结果中，`默=沉默王二` 在最后；当我们访问键位“王”的元素后，输出结果中，`王=沉默王二` 在最后，`默=沉默王二` 在倒数第二位。

也就是说，最不经常访问的放在头部，这就有意思了。有意思在哪呢？

我们可以使用 LinkedHashMap 来实现 LRU 缓存，LRU 是 Least Recently Used 的缩写，即最近最少使用，是一种常用的页面置换算法，选择最近最久未使用的页面予以淘汰。

```java
/**
 * 自定义的 MyLinkedHashMap 类，继承了 Java 中内置的 LinkedHashMap<K, V> 类。
 * 用于实现一个具有固定大小的缓存，当缓存达到最大容量时，会自动移除最早加入的元素，以腾出空间给新的元素。
 *
 * @param <K> 键的类型
 * @param <V> 值的类型
 */
public class MyLinkedHashMap<K, V> extends LinkedHashMap<K, V> {

    private static final int MAX_ENTRIES = 5; // 表示 MyLinkedHashMap 中最多存储的键值对数量

    /**
     * 构造方法，使用 super() 调用了父类的构造函数，并传递了三个参数：initialCapacity、loadFactor 和 accessOrder。
     *
     * @param initialCapacity 初始容量
     * @param loadFactor      负载因子
     * @param accessOrder     访问顺序
     */
    public MyLinkedHashMap(int initialCapacity, float loadFactor, boolean accessOrder) {
        super(initialCapacity, loadFactor, accessOrder);
    }

    /**
     * 重写父类的 removeEldestEntry() 方法，用于指示是否应该移除最早加入的元素。
     * 如果返回 true，那么将删除最早加入的元素。
     *
     * @param eldest 最早加入的元素
     * @return 如果当前 MyLinkedHashMap 中元素的数量大于 MAX_ENTRIES，返回 true，否则返回 false。
     */
    @Override
    protected boolean removeEldestEntry(Map.Entry eldest) {
        return size() > MAX_ENTRIES;
    }

}
```

MyLinkedHashMap 是一个自定义类，它继承了 LinkedHashMap，并且重写了 `removeEldestEntry()` 方法——使 Map 最多可容纳 5 个元素，超出后就淘汰。

我们来测试一下。

```java
MyLinkedHashMap<String,String> map = new MyLinkedHashMap<>(16,0.75f,true);
map.put("沉", "沉默王二");
map.put("默", "沉默王二");
map.put("王", "沉默王二");
map.put("二", "沉默王二");
map.put("一枚有趣的程序员", "一枚有趣的程序员");

System.out.println(map);

map.put("一枚有颜值的程序员", "一枚有颜值的程序员");
System.out.println(map);

map.put("一枚有才华的程序员","一枚有才华的程序员");
System.out.println(map);
```

输出结果如下所示：

```
{沉=沉默王二, 默=沉默王二, 王=沉默王二, 二=沉默王二, 一枚有趣的程序员=一枚有趣的程序员}
{默=沉默王二, 王=沉默王二, 二=沉默王二, 一枚有趣的程序员=一枚有趣的程序员, 一枚有颜值的程序员=一枚有颜值的程序员}
{王=沉默王二, 二=沉默王二, 一枚有趣的程序员=一枚有趣的程序员, 一枚有颜值的程序员=一枚有颜值的程序员, 一枚有才华的程序员=一枚有才华的程序员}
```

`沉=沉默王二` 和 `默=沉默王二` 依次被淘汰出局。

假如在 put “一枚有才华的程序员”之前 get 了键位为“默”的元素：

```java
MyLinkedHashMap<String,String> map = new MyLinkedHashMap<>(16,0.75f,true);
map.put("沉", "沉默王二");
map.put("默", "沉默王二");
map.put("王", "沉默王二");
map.put("二", "沉默王二");
map.put("一枚有趣的程序员", "一枚有趣的程序员");

System.out.println(map);

map.put("一枚有颜值的程序员", "一枚有颜值的程序员");
System.out.println(map);

map.get("默");
map.put("一枚有才华的程序员","一枚有才华的程序员");
System.out.println(map);
```

那输出结果就变了，对吧？

```
{沉=沉默王二, 默=沉默王二, 王=沉默王二, 二=沉默王二, 一枚有趣的程序员=一枚有趣的程序员}
{默=沉默王二, 王=沉默王二, 二=沉默王二, 一枚有趣的程序员=一枚有趣的程序员, 一枚有颜值的程序员=一枚有颜值的程序员}
{二=沉默王二, 一枚有趣的程序员=一枚有趣的程序员, 一枚有颜值的程序员=一枚有颜值的程序员, 默=沉默王二, 一枚有才华的程序员=一枚有才华的程序员}
```

`沉=沉默王二` 和 `王=沉默王二` 被淘汰出局了。

那 LinkedHashMap 是如何来维持访问顺序呢？同学们感兴趣的话，可以研究一下下面这三个方法。

```java
void afterNodeAccess(Node<K,V> p) { }
void afterNodeInsertion(boolean evict) { }
void afterNodeRemoval(Node<K,V> p) { }
```

`afterNodeAccess()` 会在调用 `get()` 方法的时候被调用，`afterNodeInsertion()` 会在调用 `put()` 方法的时候被调用，`afterNodeRemoval()` 会在调用 `remove()` 方法的时候被调用。

我来以 `afterNodeAccess()` 为例来讲解一下。

```java
/**
 * 在访问节点后，将节点移动到链表的尾部
 *
 * @param e 要移动的节点
 */
void afterNodeAccess(HashMap.Node<K,V> e) { // move node to last
    LinkedHashMap.Entry<K,V> last;
    if (accessOrder && (last = tail) != e) { // 如果按访问顺序排序，并且访问的节点不是尾节点
        LinkedHashMap.Entry<K,V> p = (LinkedHashMap.Entry<K,V>)e, b = p.before, a = p.after;
        p.after = null; // 将要移动的节点的后继节点设为 null
        if (b == null)
            head = a; // 如果要移动的节点没有前驱节点，则将要移动的节点设为头节点
        else
            b.after = a; // 将要移动的节点的前驱节点的后继节点设为要移动的节点的后继节点
        if (a != null)
            a.before = b; // 如果要移动的节点有后继节点，则将要移动的节点的后继节点的前驱节点设为要移动的节点的前驱节点
        else
            last = b; // 如果要移动的节点没有后继节点，则将要移动的节点的前驱节点设为尾节点
        if (last == null)
            head = p; // 如果尾节点为空，则将要移动的节点设为头节点
        else {
            p.before = last; // 将要移动的节点的前驱节点设为尾节点
            last.after = p; // 将尾节点的后继节点设为要移动的节点
        }
        tail = p; // 将要移动的节点设为尾节点
        ++modCount; // 修改计数器
    }
}
```

哪个元素被 get 就把哪个元素放在最后。了解了吧？

那同学们可能还想知道，为什么 LinkedHashMap 能实现 LRU 缓存，把最不经常访问的那个元素淘汰？

在插入元素的时候，需要调用 `put()` 方法，该方法最后会调用 `afterNodeInsertion()` 方法，这个方法被 LinkedHashMap 重写了。

```java
/**
 * 在插入节点后，如果需要，可能会删除最早加入的元素
 *
 * @param evict 是否需要删除最早加入的元素
 */
void afterNodeInsertion(boolean evict) { // possibly remove eldest
    LinkedHashMap.Entry<K,V> first;
    if (evict && (first = head) != null && removeEldestEntry(first)) { // 如果需要删除最早加入的元素
        K key = first.key; // 获取要删除元素的键
        removeNode(hash(key), key, null, false, true); // 调用 removeNode() 方法删除元素
    }
}
```

`removeEldestEntry()` 方法会判断第一个元素是否超出了可容纳的最大范围，如果超出，那就会调用 `removeNode()` 方法对最不经常访问的那个元素进行删除。

### 03、小结

由于 LinkedHashMap 要维护双向链表，所以 LinkedHashMap 在插入、删除操作的时候，花费的时间要比 HashMap 多一些。

这也是没办法的事，对吧，欲戴皇冠必承其重嘛。既然想要维护元素的顺序，总要付出点代价才行。

简单总结一下吧。

首先，我们知道 HashMap 是一种常用的哈希表数据结构，它可以快速地进行键值对的查找和插入操作。但是，HashMap 本身并不保证键值对的顺序，如果我们需要按照插入顺序或访问顺序来遍历键值对，就需要使用 LinkedHashMap 了。

LinkedHashMap 继承自 HashMap，它在 HashMap 的基础上，增加了一个双向链表来维护键值对的顺序。这个链表可以按照插入顺序或访问顺序排序，它的头节点表示最早插入或访问的元素，尾节点表示最晚插入或访问的元素。这个链表的作用就是让 LinkedHashMap 可以保持键值对的顺序，并且可以按照顺序遍历键值对。

LinkedHashMap 还提供了两个构造方法来指定排序方式，分别是按照插入顺序排序和按照访问顺序排序。在按照访问顺序排序的情况下，每次访问一个键值对，都会将该键值对移到链表的尾部，以保证最近访问的元素在最后面。如果需要删除最早加入的元素，可以通过重写 removeEldestEntry() 方法来实现。

总之，LinkedHashMap 通过维护一个双向链表来保持键值对的顺序，可以按照插入顺序或访问顺序来遍历键值对。如果你需要按照顺序来遍历键值对，那么 LinkedHashMap 就是你的不二选择了！

----

GitHub 上标星 7600+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 7600+ 的 Java 教程](https://tobebetterjavaer.com/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)