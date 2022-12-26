---
title: Java LinkedHashMap详解（附源码分析）
shortTitle: LinkedHashMap详解
category:
  - Java核心
tag:
  - 集合框架（容器）
description: Java程序员进阶之路，小白的零基础Java教程，Java LinkedHashMap详解
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,LinkedHashMap
---

俗话说了，“金无足赤人无完人”，HashMap 也不例外，有一种需求它就满足不了，假如我们需要一个按照插入顺序来排列的键值对集合，那 HashMap 就无能为力了。那该怎么办呢？必须得上今天这篇文章的主角：LinkedHashMap。

同学们好啊，还记得 [HashMap](https://tobebetterjavaer.com/collection/hashmap.html) 那篇吗？我自己感觉写得非常棒啊，既通俗易懂，又深入源码，真的是分析得透透彻彻、清清楚楚、明明白白的。（一不小心又甩了三个成语，有文化吧？）HashMap 哪哪都好，真的，只要你想用键值对，第一时间就应该想到它。

为了提高查找效率，HashMap 在插入的时候对键做了一次哈希算法，这就导致插入的元素是无序的。

对这一点还不太明白的同学，可以再回到 [HashMap](https://tobebetterjavaer.com/collection/hashmap.html) 那一篇，看看我对 `put()` 方法的讲解。

```
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

这个公式 `i = (n - 1) & hash` 计算后的值并不是按照 0、1、2、3、4、5 这样有序的下标将键值对插入到数组当中的，而是有一定的随机性。

那 LinkedHashMap 就是为这个需求应运而生的。LinkedHashMap 继承了 HashMap，所以 HashMap 有的关于键值对的功能，它也有了。

```
public class LinkedHashMap<K,V>

    extends HashMap<K,V>

    implements Map<K,V>{}
```

此外，LinkedHashMap 内部又追加了双向链表，来维护元素的插入顺序。注意下面代码中的 before 和 after，它俩就是用来维护当前元素的前一个元素和后一个元素的顺序的。

```
static class Entry<K,V> extends HashMap.Node<K,V> {
    LinkedHashMap.Entry<K,V> before, after;
    Entry(int hash, K key, V value, HashMap.Node<K,V> next) {
        super(hash, key, value, next);
    }
}
```

关于双向链表，同学们可以回头看一遍我写的 [LinkedList](https://tobebetterjavaer.com/collection/linkedlist.html) 那篇文章，会对理解本篇的 LinkedHashMap 有很大的帮助。

## 01、插入顺序

在 [HashMap](https://tobebetterjavaer.com/collection/hashmap.html) 那篇文章里，我有讲解到一点，不知道同学们记不记得，就是 null 会插入到 HashMap 的第一位。

```
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

```
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

输出结果可以再次证明，HashMap 是无序的，LinkedHashMap 是可以维持插入顺序的。

那 LinkedHashMap 是如何做到这一点呢？我相信同学们和我一样，非常希望知道原因。

要想搞清楚，就需要深入研究一下 LinkedHashMap 的源码。LinkedHashMap 并未重写 HashMap 的 `put()` 方法，而是重写了 `put()` 方法需要调用的内部方法 `newNode()`。

```
HashMap.Node<K,V> newNode(int hash, K key, V value, HashMap.Node<K,V> e) {
    LinkedHashMap.Entry<K,V> p =
            new LinkedHashMap.Entry<>(hash, key, value, e);
    linkNodeLast(p);
    return p;
}
```

前面说了，LinkedHashMap.Entry 继承了 HashMap.Node，并且追加了两个字段 before 和 after。

那，紧接着来看看 `linkNodeLast()` 方法：

```
private void linkNodeLast(LinkedHashMap.Entry<K,V> p) {
    LinkedHashMap.Entry<K,V> last = tail;
    tail = p;
    if (last == null)
        head = p;
    else {
        p.before = last;
        last.after = p;
    }
}
```

看到了吧，LinkedHashMap 在添加第一个元素的时候，会把 head 赋值为第一个元素，等到第二个元素添加进来的时候，会把第二个元素的 before 赋值为第一个元素，第一个元素的 afer 赋值为第二个元素。

这就保证了键值对是按照插入顺序排列的，明白了吧？

*注：这篇文章当时用到的 JDK 版本为 14（当时的最新版，建议使用 Java8 或者 Java 13）*。

## 02、访问顺序

LinkedHashMap 不仅能够维持插入顺序，还能够维持访问顺序。访问包括调用 `get()` 方法、`remove()` 方法和 `put()` 方法。

要维护访问顺序，需要我们在声明 LinkedHashMap 的时候指定三个参数。

```
LinkedHashMap<String, String> map = new LinkedHashMap<>(16, .75f, true);
```

第一个参数和第二个参数，看过 [HashMap](https://tobebetterjavaer.com/collection/hashmap.html) 的同学们应该很熟悉了，指的是初始容量和负载因子。

第三个参数如果为 true 的话，就表示 LinkedHashMap 要维护访问顺序；否则，维护插入顺序。默认是 false。

```
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

```
public class MyLinkedHashMap<K, V> extends LinkedHashMap<K, V> {

    private static final int MAX_ENTRIES = 5;

    public MyLinkedHashMap(

            int initialCapacity, float loadFactor, boolean accessOrder) {
        super(initialCapacity, loadFactor, accessOrder);
    }

    @Override
    protected boolean removeEldestEntry(Map.Entry eldest) {
        return size() > MAX_ENTRIES;
    }

}
```

MyLinkedHashMap 是一个自定义类，它继承了 LinkedHashMap，并且重写了 `removeEldestEntry()` 方法——使 Map 最多可容纳 5 个元素，超出后就淘汰。

我们来测试一下。

```
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

```
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

```
void afterNodeAccess(Node<K,V> p) { }
void afterNodeInsertion(boolean evict) { }
void afterNodeRemoval(Node<K,V> p) { }
```

`afterNodeAccess()` 会在调用 `get()` 方法的时候被调用，`afterNodeInsertion()` 会在调用 `put()` 方法的时候被调用，`afterNodeRemoval()` 会在调用 `remove()` 方法的时候被调用。

我来以 `afterNodeAccess()` 为例来讲解一下。

```
void afterNodeAccess(HashMap.Node<K,V> e) { // move node to last
    LinkedHashMap.Entry<K,V> last;
    if (accessOrder && (last = tail) != e) {
        LinkedHashMap.Entry<K,V> p =
                (LinkedHashMap.Entry<K,V>)e, b = p.before, a = p.after;
        p.after = null;
        if (b == null)
            head = a;
        else
            b.after = a;
        if (a != null)
            a.before = b;
        else
            last = b;
        if (last == null)
            head = p;
        else {
            p.before = last;
            last.after = p;
        }
        tail = p;
        ++modCount;
    }
}
```

哪个元素被 get 就把哪个元素放在最后。了解了吧？

那同学们可能还想知道，为什么 LinkedHashMap 能实现 LRU 缓存，把最不经常访问的那个元素淘汰？

在插入元素的时候，需要调用 `put()` 方法，该方法最后会调用 `afterNodeInsertion()` 方法，这个方法被 LinkedHashMap 重写了。

```
void afterNodeInsertion(boolean evict) { // possibly remove eldest
    LinkedHashMap.Entry<K,V> first;
    if (evict && (first = head) != null && removeEldestEntry(first)) {
        K key = first.key;
        removeNode(hash(key), key, null, false, true);
    }
}
```

`removeEldestEntry()` 方法会判断第一个元素是否超出了可容纳的最大范围，如果超出，那就会调用 `removeNode()` 方法对最不经常访问的那个元素进行删除。

## 03、最后

由于 LinkedHashMap 要维护双向链表，所以 LinkedHashMap 在插入、删除操作的时候，花费的时间要比 HashMap 多一些。

这也是没办法的事，对吧，欲戴皇冠必承其重嘛。既然想要维护元素的顺序，总要付出点代价才行。



----

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)