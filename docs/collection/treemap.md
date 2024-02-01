---
title: Java TreeMap详解：从源码分析到实践应用
shortTitle: TreeMap详解（附源码）
category:
  - Java核心
tag:
  - 集合框架（容器）
description: 本文详细解析了 Java TreeMap 的实现原理、功能特点以及源码，为您提供了 TreeMap 的实际应用示例和性能优化建议。阅读本文，将帮助您更深入地理解 TreeMap，从而在实际编程中充分发挥其优势。
head:
  - - meta
    - name: keywords
      content: Java,TreeMap,java treemap, 源码分析, 实现原理
---

# 6.7 TreeMap详解（附源码）

>下面有请王老师上台，来给大家讲一讲 TreeMap，鼓掌了！

之前 [LinkedHashMap](https://javabetter.cn/collection/linkedhashmap.html) 那篇文章里提到过了，HashMap 是无序的，所以有了 LinkedHashMap，加上了双向链表后，就可以保持元素的插入顺序和访问顺序，那 TreeMap 呢？

TreeMap 由红黑树实现，可以保持元素的自然顺序，或者实现了 Comparator 接口的自定义顺序。

可能有些同学不了解红黑树，我这里来普及一下：

> 红黑树（英语：Red–black tree）是一种自平衡的二叉查找树（Binary Search Tree），结构复杂，但却有着良好的性能，完成查找、插入和删除的[时间复杂度](https://javabetter.cn/collection/time-complexity.html)均为 log(n)。

二叉查找树是一种常见的树形结构，它的每个节点都包含一个键值对。每个节点的左子树节点的键值小于该节点的键值，右子树节点的键值大于该节点的键值，这个特性使得二叉查找树非常适合进行数据的查找和排序操作。

下面是一个简单的手绘图，展示了一个二叉查找树的结构：

```
        8
      /   \
     3     10
    / \      \
   1   6     14
      / \    /
     4   7  13
```  

在上面这个二叉查找树中，根节点是 8，左子树节点包括 3、1、6、4 和 7，右子树节点包括 10、14 和 13。

- 3<8<10
- 1<3<6
- 4<6<7
- 10<14
- 13<14

这是一颗典型的二叉查找树：

- 1）左子树上所有节点的值均小于或等于它的根结点的值。
- 2）右子树上所有节点的值均大于或等于它的根结点的值。
- 3）左、右子树也分别为二叉查找树。






二叉查找树用来查找非常方面，从根节点开始遍历，如果当前节点的键值等于要查找的键值，则查找成功；如果要查找的键值小于当前节点的键值，则继续遍历左子树；如果要查找的键值大于当前节点的键值，则继续遍历右子树。如果遍历到叶子节点仍然没有找到，则查找失败。

插入操作也非常简单，从根节点开始遍历，如果要插入的键值小于当前节点的键值，则将其插入到左子树中；如果要插入的键值大于当前节点的键值，则将其插入到右子树中。如果要插入的键值已经存在于树中，则更新该节点的值。

删除操作稍微复杂一些，需要考虑多种情况，包括要删除的节点是叶子节点、要删除的节点只有一个子节点、要删除的节点有两个子节点等等。

总之，二叉查找树是一种非常常用的数据结构，它可以帮助我们实现数据的查找、排序和删除等操作。

理解二叉查找树了吧？

不过，二叉查找树有一个明显的不足，就是容易变成瘸子，就是一侧多，一侧少，比如说这样：

```
        6
      /   \
     4     8
    /     / \
   3     7   9
  /
 1
```

在上面这个不平衡的二叉查找树中，左子树比右子树高。根节点是 6，左子树节点包括 4、3 和 1，右子树节点包括 8、7 和 9。

由于左子树比右子树高，这个不平衡的二叉查找树可能会导致查找、插入和删除操作的效率下降。

来一个更极端的情况。

```
    1
     \
      2
       \
        3
         \
          4
           \
            5
             \
              6
```

在上面这个极度不平衡的二叉查找树中，所有节点都只有一个右子节点，根节点是 1，右子树节点包括 2、3、4、5 和 6。

这种极度不平衡的二叉查找树会导致查找、插入和删除操作的效率急剧下降，因为每次操作都只能在右子树中进行，而左子树几乎没有被利用到。

查找的效率就要从 log(n) 变成 o(n) 了（戳[这里](https://javabetter.cn/collection/time-complexity.html)了解时间复杂度），对吧？

必须要平衡一下，对吧？于是就有了平衡二叉树，左右两个子树的高度差的绝对值不超过 1，就像下图这样：

```
        8
      /   \
     4     12
    / \    / \
   2   6  10  14
      / \    / \
     5   7  13  15
```

根节点是 8，左子树节点包括 4、2、6、5 和 7，右子树节点包括 12、10、14、13 和 15。左子树和右子树的高度差不超过1，因此它是一个平衡二叉查找树。

平衡二叉树就像是一棵树形秤，它的左右两边的重量要尽可能的平衡。当我们往平衡二叉树中插入一个节点时，平衡二叉树会自动调整节点的位置，以保证树的左右两边的高度差不超过1。类似地，当我们删除一个节点时，平衡二叉树也会自动调整节点的位置，以保证树的左右两边的高度差不超过1。

常见的平衡二叉树包括AVL树、红黑树等等，它们都是通过旋转操作来调整树的平衡，使得左子树和右子树的高度尽可能接近。

AVL树的示意图：

```
           8
         /   \
        4     12
       / \   /  \
      2   6 10  14
         / \
        5   7
```

AVL树是一种高度平衡的二叉查找树，它要求左子树和右子树的高度差不超过1。由于AVL树的平衡度比较高，因此在进行插入和删除操作时需要进行更多的旋转操作来保持平衡，但是在查找操作时效率较高。AVL树适用于读操作比较多的场景。

例如，对于一个需要频繁进行查找操作的场景，如字典树、哈希表等数据结构，可以使用AVL树来进行优化。另外，AVL树也适用于需要保证数据有序性的场景，如数据库中的索引。

AVL树最初由两位苏联的计算机科学家，Adelson-Velskii和Landis，于1962年提出。因此，AVL树就以他们两人名字的首字母缩写命名了。

AVL树的发明对计算机科学的发展有着重要的影响，不仅为后来的平衡二叉树提供了基础，而且为其他领域的数据结构和算法提供了启示。

红黑树的示意图（R 即 Red「红」、B 即 Black「黑」）：

```
           8B
         /   \
        4R    12R
       / \   /  \
      2B 6B 10B 14B
         / \
        5R 7R
```

红黑树，顾名思义，就是节点是红色或者黑色的平衡二叉树，它通过颜色的约束来维持二叉树的平衡，它要求任意一条路径上的黑色节点数目相同，同时还需要满足一些其他特定的条件，如红色节点的父节点必须为黑色节点等。

- 1）每个节点都只能是红色或者黑色
- 2）根节点是黑色
- 3）每个叶节点（NIL 节点，空节点）是黑色的。
- 4）如果一个节点是红色的，则它两个子节点都是黑色的。也就是说在一条路径上不能出现相邻的两个红色节点。
- 5）从任一节点到其每个叶子的所有路径都包含相同数目的黑色节点。

由于红黑树的平衡度比AVL树稍低，因此在进行插入和删除操作时需要进行的旋转操作较少，但是在查找操作时效率仍然较高。红黑树适用于读写操作比较均衡的场景。

那，关于红黑树，同学们就先了解到这，脑子里有个大概的印象，知道 TreeMap 是个什么玩意。

### 01、自然顺序

默认情况下，TreeMap 是根据 key 的自然顺序排列的。比如说整数，就是升序，1、2、3、4、5。

```java
TreeMap<Integer,String> mapInt = new TreeMap<>();
mapInt.put(3, "沉默王二");
mapInt.put(2, "沉默王二");
mapInt.put(1, "沉默王二");
mapInt.put(5, "沉默王二");
mapInt.put(4, "沉默王二");

System.out.println(mapInt);
```

输出结果如下所示：

```
{1=沉默王二, 2=沉默王二, 3=沉默王二, 4=沉默王二, 5=沉默王二}
```

TreeMap 是怎么做到的呢？想一探究竟，就得上源码了，来看 TreeMap 的 `put()` 方法：

```java
public V put(K key, V value) {
    Entry<K,V> t = root; // 将根节点赋值给变量t
    if (t == null) { // 如果根节点为null，说明TreeMap为空
        compare(key, key); // type (and possibly null) check，检查key的类型是否合法
        root = new Entry<>(key, value, null); // 创建一个新节点作为根节点
        size = 1; // size设置为1
        return null; // 返回null，表示插入成功
    }
    int cmp;
    Entry<K,V> parent;
    // split comparator and comparable paths，根据使用的比较方法进行查找
    Comparator<? super K> cpr = comparator; // 获取比较器
    if (cpr != null) { // 如果使用了Comparator
        do {
            parent = t; // 将当前节点赋值给parent
            cmp = cpr.compare(key, t.key); // 使用Comparator比较key和t的键的大小
            if (cmp < 0) // 如果key小于t的键
                t = t.left; // 在t的左子树中查找
            else if (cmp > 0) // 如果key大于t的键
                t = t.right; // 在t的右子树中查找
            else // 如果key等于t的键
                return t.setValue(value); // 直接更新t的值
        } while (t != null);
    }
    else { // 如果没有使用Comparator
        if (key == null) // 如果key为null
            throw new NullPointerException(); // 抛出NullPointerException异常
            Comparable<? super K> k = (Comparable<? super K>) key; // 将key强制转换为Comparable类型
        do {
            parent = t; // 将当前节点赋值给parent
            cmp = k.compareTo(t.key); // 使用Comparable比较key和t的键的大小
            if (cmp < 0) // 如果key小于t的键
                t = t.left; // 在t的左子树中查找
            else if (cmp > 0) // 如果key大于t的键
                t = t.right; // 在t的右子树中查找
            else // 如果key等于t的键
                return t.setValue(value); // 直接更新t的值
        } while (t != null);
    }
    // 如果没有找到相同的键，需要创建一个新节点插入到TreeMap中
    Entry<K,V> e = new Entry<>(key, value, parent); // 创建一个新节点
    if (cmp < 0) // 如果key小于parent的键
        parent.left = e; // 将e作为parent的左子节点
    else
        parent.right = e; // 将e作为parent的右子节点
    fixAfterInsertion(e); // 插入节点后需要进行平衡操作
    size++; // size加1
    return null; // 返回null，表示插入成功
}
```

- 首先定义一个Entry类型的变量t，用于表示当前的根节点；
- 如果t为null，说明TreeMap为空，直接创建一个新的节点作为根节点，并将size设置为1；
- 如果t不为null，说明需要在TreeMap中查找键所对应的节点。因为TreeMap中的元素是有序的，所以可以使用二分查找的方式来查找节点；
- 如果TreeMap中使用了Comparator来进行排序，则使用Comparator进行比较，否则使用Comparable进行比较。如果查找到了相同的键，则直接更新键所对应的值；
- 如果没有查找到相同的键，则创建一个新的节点，并将其插入到TreeMap中。然后使用fixAfterInsertion()方法来修正插入节点后的平衡状态；
- 最后将TreeMap的size加1，然后返回null。如果更新了键所对应的值，则返回原先的值。

注意 `cmp = k.compareTo(t.key)` 这行代码，就是用来进行 key 比较的，由于此时 key 是 String，所以就会调用 String 类的 `compareTo()` 方法进行比较。

```java
public int compareTo(String anotherString) {
    // 获取当前字符串和另一个字符串的长度
    int len1 = value.length;
    int len2 = anotherString.value.length;
    // 取两个字符串长度的较短者作为比较的上限
    int lim = Math.min(len1, len2);
    // 获取当前字符串和另一个字符串的字符数组
    char v1[] = value;
    char v2[] = anotherString.value;

    int k = 0;
    // 对两个字符串的每个字符进行比较
    while (k < lim) {
        char c1 = v1[k];
        char c2 = v2[k];
        // 如果两个字符不相等，返回它们的差值
        if (c1 != c2) {
            return c1 - c2;
        }
        k++;
    }
    // 如果两个字符串前面的字符都相等，返回它们长度的差值
    return len1 - len2;
}
```

来看下面的示例。

```java
TreeMap<String,String> mapString = new TreeMap<>();
mapString.put("c", "沉默王二");
mapString.put("b", "沉默王二");
mapString.put("a", "沉默王二");
mapString.put("e", "沉默王二");
mapString.put("d", "沉默王二");

System.out.println(mapString);
```

输出结果如下所示：

```
{a=沉默王二, b=沉默王二, c=沉默王二, d=沉默王二, e=沉默王二}
```

从结果可以看得出，是按照字母的升序进行排序的。

### 02、自定义排序

如果自然顺序不满足，那就可以在声明 TreeMap 对象的时候指定排序规则。

```java
TreeMap<Integer,String> mapIntReverse = new TreeMap<>(Comparator.reverseOrder());
mapIntReverse.put(3, "沉默王二");
mapIntReverse.put(2, "沉默王二");
mapIntReverse.put(1, "沉默王二");
mapIntReverse.put(5, "沉默王二");
mapIntReverse.put(4, "沉默王二");

System.out.println(mapIntReverse);
```

TreeMap 提供了可以指定排序规则的构造方法：

```java
public TreeMap(Comparator<? super K> comparator) {
    this.comparator = comparator;
}
```

`Comparator.reverseOrder()` 返回的是 Collections.ReverseComparator 对象，就是用来反转顺序的，非常方便。

```java
private static class ReverseComparator
        implements Comparator<Comparable<Object>>, Serializable {
    // 单例模式，用于表示逆序比较器
    static final ReverseComparator REVERSE_ORDER
            = new ReverseComparator();

    // 实现比较方法，对两个实现了Comparable接口的对象进行逆序比较
    public int compare(Comparable<Object> c1, Comparable<Object> c2) {
        return c2.compareTo(c1); // 调用c2的compareTo()方法，以c1为参数，实现逆序比较
    }

    // 反序列化时，返回Collections.reverseOrder()，保证单例模式
    private Object readResolve() {
        return Collections.reverseOrder();
    }

    // 返回正序比较器
    @Override
    public Comparator<Comparable<Object>> reversed() {
        return Comparator.naturalOrder();
    }
}
```

所以，输出结果如下所示：

```
{5=沉默王二, 4=沉默王二, 3=沉默王二, 2=沉默王二, 1=沉默王二}
```

HashMap 是无序的，插入的顺序随着元素的增加会不停地变动。但 TreeMap 能够至始至终按照指定的顺序排列，这对于需要自定义排序的场景，实在是太有用了！

### 03、排序的好处

既然 TreeMap 的元素是经过排序的，那找出最大的那个，最小的那个，或者找出所有大于或者小于某个值的键来说，就方便多了。

```java
Integer highestKey = mapInt.lastKey();
Integer lowestKey = mapInt.firstKey();
Set<Integer> keysLessThan3 = mapInt.headMap(3).keySet();
Set<Integer> keysGreaterThanEqTo3 = mapInt.tailMap(3).keySet();

System.out.println(highestKey);
System.out.println(lowestKey);

System.out.println(keysLessThan3);
System.out.println(keysGreaterThanEqTo3);
```

TreeMap 考虑得很周全，恰好就提供了 `lastKey()`、`firstKey()` 这样获取最后一个 key 和第一个 key 的方法。

`headMap()` 获取的是到指定 key 之前的 key；`tailMap()` 获取的是指定 key 之后的 key（包括指定 key）。

来看一下输出结果：

```
5
1
[1, 2]
[3, 4, 5]
```

再来看一下例子：

```java
TreeMap<Integer, String> treeMap = new TreeMap<>();
treeMap.put(1, "value1");
treeMap.put(2, "value2");
treeMap.put(3, "value3");
treeMap.put(4, "value4");
treeMap.put(5, "value5");

// headMap示例，获取小于3的键值对
Map<Integer, String> headMap = treeMap.headMap(3);
System.out.println(headMap); // 输出 {1=value1, 2=value2}

// tailMap示例，获取大于等于4的键值对
Map<Integer, String> tailMap = treeMap.tailMap(4);
System.out.println(tailMap); // 输出 {4=value4, 5=value5}

// subMap示例，获取大于等于2且小于4的键值对
Map<Integer, String> subMap = treeMap.subMap(2, 4);
System.out.println(subMap); // 输出 {2=value2, 3=value3}
```

headMap、tailMap、subMap方法分别获取了小于3、大于等于4、大于等于2且小于4的键值对。


### 04、如何选择 Map

在学习 TreeMap 之前，我们已经学习了 [HashMap](https://javabetter.cn/collection/hashmap.html) 和 [LinkedHashMap](https://javabetter.cn/collection/linkedhashmap.html) ，那如何从它们三个中间选择呢？

需要考虑以下因素：

- 是否需要按照键的自然顺序或者自定义顺序进行排序。如果需要按照键排序，则可以使用 TreeMap；如果不需要排序，则可以使用 HashMap 或 LinkedHashMap。
- 是否需要保持插入顺序。如果需要保持插入顺序，则可以使用 LinkedHashMap；如果不需要保持插入顺序，则可以使用 TreeMap 或 HashMap。
- 是否需要高效的查找。如果需要高效的查找，则可以使用 LinkedHashMap 或 HashMap，因为它们的查找操作的时间复杂度为 O(1)，而是 TreeMap 是 O(log n)。

>LinkedHashMap 内部使用哈希表来存储键值对，并使用一个双向链表来维护插入顺序，但查找操作只需要在哈希表中进行，与链表无关，所以时间复杂度为 O(1)

来个表格吧，一目了然。

特性|	TreeMap|	HashMap|	LinkedHashMap
---|---|---|---|
排序|	支持|	不支持|	不支持
插入顺序|	不保证|	不保证|	保证
查找效率|	O(log n)|	O(1)|	O(1)
空间占用|	通常较大|	通常较小|	通常较大
适用场景|	需要排序的场景|	无需排序的场景|	需要保持插入顺序

好了，下课，关于 TreeMap 我们就讲到这里吧，希望同学们都能对 TreeMap 有一个清晰的认识。我们下节课见~

----

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

