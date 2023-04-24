---
title: 深入探讨 Java LinkedList：从源码分析到实践应用
shortTitle: LinkedList详解（附源码）
category:
  - Java核心
tag:
  - 集合框架（容器）
description: 本文详细解析了 Java LinkedList 的实现原理、功能特点以及源码，为您提供了 LinkedList 的实际应用示例和性能优化建议。阅读本文，将帮助您更深入地理解 LinkedList，从而在实际编程中充分发挥其优势。
head:
  - - meta
    - name: keywords
      content: Java,LinkedList,LinkedList源码,java linkedlist,源码分析
---

# 6.4 LinkedList详解（附源码）

>这篇换个表达方式，一起来欣赏。

大家好，我是 LinkedList，和 ArrayList 是同门师兄弟，但我俩练的内功却完全不同。师兄练的是动态数组，我练的是链表。

问大家一个问题，知道我为什么要练链表这门内功吗？

举个例子来讲吧，假如你们手头要管理一推票据，可能有一张，也可能有一亿张。

该怎么办呢？

申请一个 10G 的大数组等着？那万一票据只有 100 张呢？

申请一个默认大小的数组，随着数据量的增大扩容？要知道扩容是需要重新复制数组的，很耗时间。

关键是，数组还有一个弊端就是，假如现在有 500 万张票据，现在要从中间删除一个票据，就需要把 250 万张票据往前移动一格。

遇到这种情况的时候，我师兄几乎情绪崩溃，难受的要命。师父不忍心看到师兄这样痛苦，于是打我进入师门那一天，就强迫我练链表这门内功，一开始我很不理解，害怕师父偏心，不把师门最厉害的内功教我。

直到有一天，我亲眼目睹师兄差点因为移动数据而走火入魔，我才明白师父的良苦用心。从此以后，我苦练“链表”这门内功，取得了显著的进步，师父和师兄都夸我有天赋。

链表这门内功大致分为三个层次：

- 第一层叫做“单向链表”，我只有一个后指针，指向下一个数据；
- 第二层叫做“双向链表”，我有两个指针，后指针指向下一个数据，前指针指向上一个数据。
- 第三层叫做“二叉树”，把后指针去掉，换成左右指针。

但我现在的功力还达不到第三层，不过师父说我有这个潜力，练成神功是早晚的事。

### 01、LinkedList的内功心法

好了，经过我这么样的一个剖白后，大家对我应该已经不陌生了。那么接下来，我给大家展示一下我的内功心法。

我的内功心法主要是一个私有的静态内部类，叫 Node，也就是节点。

```java
/**
 * 链表中的节点类。
 */
private static class Node<E> {
    E item; // 节点中存储的元素
    Node<E> next; // 指向下一个节点的指针
    Node<E> prev; // 指向上一个节点的指针

    /**
     * 构造一个新的节点。
     *
     * @param prev 前一个节点
     * @param element 节点中要存储的元素
     * @param next 后一个节点
     */
    Node(Node<E> prev, E element, Node<E> next) {
        this.item = element; // 存储元素
        this.next = next; // 设置下一个节点
        this.prev = prev; // 设置上一个节点
    }
}
```

它由三部分组成：

- 节点上的元素
- 下一个节点
- 上一个节点

我画幅图给你们展示下吧。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/linkedlist-01.png)

- 对于第一个节点来说，prev 为 null；
- 对于最后一个节点来说，next 为 null；
- 其余的节点呢，prev 指向前一个，next 指向后一个。

我的内功心法就这么简单，其实我早已经牢记在心了。但师父叮嘱我，每天早上醒来的时候，每天晚上睡觉的时候，一定要默默地背诵一遍。虽然我有些厌烦，但我对师父的教诲从来都是言听计从。

### 02、LinkedList的招式

和师兄 ArrayList 一样，我的招式也无外乎“增删改查”这 4 种。在此之前，我们都必须得初始化。

```java
LinkedList<String> list = new LinkedList();
```

师兄在初始化的时候可以指定大小，也可以不指定，等到添加第一个元素的时候进行第一次扩容。而我，没有大小，只要内存够大，我就可以无穷大。

#### **1）招式一：增**

可以调用 add 方法添加元素：

```java
list.add("沉默王二");
list.add("沉默王三");
list.add("沉默王四");
```

add 方法内部其实调用的是 linkLast 方法：

```java
/**
 * 将指定的元素添加到列表的尾部。
 *
 * @param e 要添加到列表的元素
 * @return 始终为 true（根据 Java 集合框架规范）
 */
public boolean add(E e) {
    linkLast(e); // 在列表的尾部添加元素
    return true; // 添加元素成功，返回 true
}
```

linkLast，顾名思义，就是在链表的尾部添加元素：

```java
/**
 * 在列表的尾部添加指定的元素。
 *
 * @param e 要添加到列表的元素
 */
void linkLast(E e) {
    final Node<E> l = last; // 获取链表的最后一个节点
    final Node<E> newNode = new Node<>(l, e, null); // 创建一个新的节点，并将其设置为链表的最后一个节点
    last = newNode; // 将新的节点设置为链表的最后一个节点
    if (l == null) // 如果链表为空，则将新节点设置为头节点
        first = newNode;
    else
        l.next = newNode; // 否则将新节点链接到链表的尾部
    size++; // 增加链表的元素个数
}
```

- 添加第一个元素的时候，first 和 last 都为 null。
- 然后新建一个节点 newNode，它的 prev 和 next 也为 null。
- 然后把 last 和 first 都赋值为 newNode。

此时还不能称之为链表，因为前后节点都是断裂的。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/linkedlist-02.png)

- 添加第二个元素的时候，first 和 last 都指向的是第一个节点。
- 然后新建一个节点 newNode，它的 prev 指向的是第一个节点，next 为 null。
- 然后把第一个节点的 next 赋值为 newNode。

此时的链表还不完整。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/linkedlist-03.png)

- 添加第三个元素的时候，first 指向的是第一个节点，last 指向的是最后一个节点。
- 然后新建一个节点 newNode，它的 prev 指向的是第二个节点，next 为 null。
- 然后把第二个节点的 next 赋值为 newNode。

此时的链表已经完整了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/linkedlist-04.png)

我这个增的招式，还可以演化成另外两个版本：

- `addFirst()` 方法将元素添加到第一位；
- `addLast()` 方法将元素添加到末尾。

addFirst 内部其实调用的是 linkFirst：

```java
/**
 * 在列表的开头添加指定的元素。
 *
 * @param e 要添加到列表的元素
 */
public void addFirst(E e) {
    linkFirst(e); // 在列表的开头添加元素
}
```

linkFirst 负责把新的节点设为 first，并将新的 first 的 next 更新为之前的 first。

```java
/**
 * 在列表的开头添加指定的元素。
 *
 * @param e 要添加到列表的元素
 */
private void linkFirst(E e) {
    final Node<E> f = first; // 获取链表的第一个节点
    final Node<E> newNode = new Node<>(null, e, f); // 创建一个新的节点，并将其设置为链表的第一个节点
    first = newNode; // 将新的节点设置为链表的第一个节点
    if (f == null) // 如果链表为空，则将新节点设置为尾节点
        last = newNode;
    else
        f.prev = newNode; // 否则将新节点链接到链表的头部
    size++; // 增加链表的元素个数
}
```

addLast 的内核其实和 addFirst 差不多，内部调用的是 linkLast 方法，前面分析过了。

```java
/**
 * 在列表的尾部添加指定的元素。
 *
 * @param e 要添加到列表的元素
 * @return 始终为 true（根据 Java 集合框架规范）
 */
public boolean addLast(E e) {
    linkLast(e); // 在列表的尾部添加元素
    return true; // 添加元素成功，返回 true
}
```


#### **2）招式二：删**

我这个删的招式还挺多的：

- `remove()`：删除第一个节点
- `remove(int)`：删除指定位置的节点
- `remove(Object)`：删除指定元素的节点
- `removeFirst()`：删除第一个节点
- `removeLast()`：删除最后一个节点

`remove()` 内部调用的是 `removeFirst()`，所以这两个招式的功效一样。

`remove(int)` 内部其实调用的是 unlink 方法。

```java
/**
 * 删除指定位置上的元素。
 *
 * @param index 要删除的元素的索引
 * @return 从列表中删除的元素
 * @throws IndexOutOfBoundsException 如果索引越界（index &lt; 0 || index &gt;= size()）
 */
public E remove(int index) {
    checkElementIndex(index); // 检查索引是否越界
    return unlink(node(index)); // 删除指定位置的节点，并返回节点的元素
}

```

unlink 方法其实很好理解，就是更新当前节点的 next 和 prev，然后把当前节点上的元素设为 null。

```java
/**
 * 从链表中删除指定节点。
 *
 * @param x 要删除的节点
 * @return 从链表中删除的节点的元素
 */
E unlink(Node<E> x) {
    final E element = x.item; // 获取要删除节点的元素
    final Node<E> next = x.next; // 获取要删除节点的下一个节点
    final Node<E> prev = x.prev; // 获取要删除节点的上一个节点

    if (prev == null) { // 如果要删除节点是第一个节点
        first = next; // 将链表的头节点设置为要删除节点的下一个节点
    } else {
        prev.next = next; // 将要删除节点的上一个节点指向要删除节点的下一个节点
        x.prev = null; // 将要删除节点的上一个节点设置为空
    }

    if (next == null) { // 如果要删除节点是最后一个节点
        last = prev; // 将链表的尾节点设置为要删除节点的上一个节点
    } else {
        next.prev = prev; // 将要删除节点的下一个节点指向要删除节点的上一个节点
        x.next = null; // 将要删除节点的下一个节点设置为空
    }

    x.item = null; // 将要删除节点的元素设置为空
    size--; // 减少链表的元素个数
    return element; // 返回被删除节点的元素
}
```

remove(Object) 内部也调用了 unlink 方法，只不过在此之前要先找到元素所在的节点：

```java
/**
 * 从链表中删除指定元素。
 *
 * @param o 要从链表中删除的元素
 * @return 如果链表包含指定元素，则返回 true；否则返回 false
 */
public boolean remove(Object o) {
    if (o == null) { // 如果要删除的元素为 null
        for (Node<E> x = first; x != null; x = x.next) { // 遍历链表
            if (x.item == null) { // 如果节点的元素为 null
                unlink(x); // 删除节点
                return true; // 返回 true 表示删除成功
            }
        }
    } else { // 如果要删除的元素不为 null
        for (Node<E> x = first; x != null; x = x.next) { // 遍历链表
            if (o.equals(x.item)) { // 如果节点的元素等于要删除的元素
                unlink(x); // 删除节点
                return true; // 返回 true 表示删除成功
            }
        }
    }
    return false; // 如果链表中不包含要删除的元素，则返回 false 表示删除失败
}
```

元素为 null 的时候，必须使用 == 来判断；元素为非 null 的时候，要使用 equals 来判断。

removeFirst 内部调用的是 unlinkFirst 方法：

```java
/**
 * 从链表中删除第一个元素并返回它。
 * 如果链表为空，则抛出 NoSuchElementException 异常。
 *
 * @return 从链表中删除的第一个元素
 * @throws NoSuchElementException 如果链表为空
 */
public E removeFirst() {
    final Node<E> f = first; // 获取链表的第一个节点
    if (f == null) // 如果链表为空
        throw new NoSuchElementException(); // 抛出 NoSuchElementException 异常
    return unlinkFirst(f); // 调用 unlinkFirst 方法删除第一个节点并返回它的元素
}
```

unlinkFirst 负责的就是把第一个节点毁尸灭迹，并且捎带把后一个节点的 prev 设为 null。

```java
/**
 * 删除链表中的第一个节点并返回它的元素。
 *
 * @param f 要删除的第一个节点
 * @return 被删除节点的元素
 */
private E unlinkFirst(Node<E> f) {
    final E element = f.item; // 获取要删除的节点的元素
    final Node<E> next = f.next; // 获取要删除的节点的下一个节点
    f.item = null; // 将要删除的节点的元素设置为 null
    f.next = null; // 将要删除的节点的下一个节点设置为 null
    first = next; // 将链表的头节点设置为要删除的节点的下一个节点
    if (next == null) // 如果链表只有一个节点
        last = null; // 将链表的尾节点设置为 null
    else
        next.prev = null; // 将要删除节点的下一个节点的前驱设置为 null
    size--; // 减少链表的大小
    return element; // 返回被删除节点的元素
}
```

#### **3）招式三：改**

可以调用 `set()` 方法来更新元素：

```java
list.set(0, "沉默王五");
```

来看一下 `set()` 方法：

```java
/**
 * 将链表中指定位置的元素替换为指定元素，并返回原来的元素。
 *
 * @param index 要替换元素的位置（从 0 开始）
 * @param element 要插入的元素
 * @return 替换前的元素
 * @throws IndexOutOfBoundsException 如果索引超出范围（index < 0 || index >= size()）
 */
public E set(int index, E element) {
    checkElementIndex(index); // 检查索引是否超出范围
    Node<E> x = node(index); // 获取要替换的节点
    E oldVal = x.item; // 获取要替换节点的元素
    x.item = element; // 将要替换的节点的元素设置为指定元素
    return oldVal; // 返回替换前的元素
}
```

来看一下node方法：

```java
/**
 * 获取链表中指定位置的节点。
 *
 * @param index 节点的位置（从 0 开始）
 * @return 指定位置的节点
 * @throws IndexOutOfBoundsException 如果索引超出范围（index < 0 || index >= size()）
 */
Node<E> node(int index) {
    if (index < (size >> 1)) { // 如果索引在链表的前半部分
        Node<E> x = first;
        for (int i = 0; i < index; i++) // 从头节点开始向后遍历链表，直到找到指定位置的节点
            x = x.next;
        return x; // 返回指定位置的节点
    } else { // 如果索引在链表的后半部分
        Node<E> x = last;
        for (int i = size - 1; i > index; i--) // 从尾节点开始向前遍历链表，直到找到指定位置的节点
            x = x.prev;
        return x; // 返回指定位置的节点
    }
}
```

`size >> 1`：也就是右移一位，相当于除以 2。对于计算机来说，移位比除法运算效率更高，因为数据在计算机内部都是以二进制存储的。

换句话说，node 方法会对下标进行一个初步判断，如果靠近前半截，就从下标 0 开始遍历；如果靠近后半截，就从末尾开始遍历，这样可以提高效率，最大能提高一半的效率。

找到指定下标的节点就简单了，直接把原有节点的元素替换成新的节点就 OK 了，prev 和 next 都不用改动。

#### **4）招式四：查**

我这个查的招式可以分为两种：

- indexOf(Object)：查找某个元素所在的位置
- get(int)：查找某个位置上的元素

来看一下 indexOf 方法的源码。

```java
/**
 * 返回链表中首次出现指定元素的位置，如果不存在该元素则返回 -1。
 *
 * @param o 要查找的元素
 * @return 首次出现指定元素的位置，如果不存在该元素则返回 -1
 */
public int indexOf(Object o) {
    int index = 0; // 初始化索引为 0
    if (o == null) { // 如果要查找的元素为 null
        for (Node<E> x = first; x != null; x = x.next) { // 从头节点开始向后遍历链表
            if (x.item == null) // 如果找到了要查找的元素
                return index; // 返回该元素的索引
            index++; // 索引加 1
        }
    } else { // 如果要查找的元素不为 null
        for (Node<E> x = first; x != null; x = x.next) { // 从头节点开始向后遍历链表
            if (o.equals(x.item)) // 如果找到了要查找的元素
                return index; // 返回该元素的索引
            index++; // 索引加 1
        }
    }
    return -1; // 如果没有找到要查找的元素，则返回 -1
}
```

get 方法的内核其实还是 node 方法，node 方法之前已经说明过了，这里略过。

```java
public E get(int index) {
    checkElementIndex(index);
    return node(index).item;
}
```

其实，查这个招式还可以演化为其他的一些，比如说：

- `getFirst()` 方法用于获取第一个元素；
- `getLast()` 方法用于获取最后一个元素；
- `poll()` 和 `pollFirst()` 方法用于删除并返回第一个元素（两个方法尽管名字不同，但方法体是完全相同的）；
- `pollLast()` 方法用于删除并返回最后一个元素；
- `peekFirst()` 方法用于返回但不删除第一个元素。

### 03、LinkedList 的挑战

说句实在话，我不是很喜欢和师兄 ArrayList 拿来比较，因为我们各自修炼的内功不同，没有孰高孰低。

虽然师兄经常喊我一声师弟，但我们之间其实挺和谐的。但我知道，在外人眼里，同门师兄弟，总要一较高下的。

比如说，我们俩在增删改查时候的时间复杂度。

也许这就是命运吧，从我进入师门的那天起，这种争论就一直没有停息过。

无论外人怎么看待我们，在我眼里，师兄永远都是一哥，我敬重他，他也愿意保护我。

[好戏在后头](https://tobebetterjavaer.com/collection/list-war-2.html)，等着瞧吧。

我这里先简单聊一下，权当抛砖引玉。

想象一下，你在玩一款游戏，游戏中有一个道具栏，你需要不断地往里面添加、删除道具。如果你使用的是我的师兄 ArrayList，那么每次添加、删除道具时都需要将后面的道具向后移动或向前移动，这样就会非常耗费时间。但是如果你使用的是我 LinkedList，那么只需要将新道具插入到链表中的指定位置，或者将要删除的道具从链表中删除即可，这样就可以快速地完成道具栏的更新。

除了游戏中的道具栏，我 LinkedList 还可以用于实现 LRU（Least Recently Used）缓存淘汰算法。LRU 缓存淘汰算法是一种常用的缓存淘汰策略，它的基本思想是，当缓存空间不够时，优先淘汰最近最少使用的缓存数据。在实现 LRU 缓存淘汰算法时，你可以使用我 LinkedList 来存储缓存数据，每次访问缓存数据时，将该数据从链表中删除并移动到链表的头部，这样链表的尾部就是最近最少使用的缓存数据，当缓存空间不够时，只需要将链表尾部的缓存数据淘汰即可。

总之，各有各的好，且行且珍惜。

----

GitHub 上标星 7600+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 7600+ 的 Java 教程](https://tobebetterjavaer.com/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)