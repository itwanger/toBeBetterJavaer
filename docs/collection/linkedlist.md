---
title: Java LinkedList详解（附源码分析）
shortTitle: LinkedList详解
category:
  - Java核心
tag:
  - 集合框架（容器）
description: Java程序员进阶之路，小白的零基础Java教程，Java LinkedList详解
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,LinkedList,LinkedList源码
---


## 一、LinkedList 的剖白

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

## 二、LinkedList 的内功心法

好了，经过我这么样的一个剖白后，大家对我应该已经不陌生了。那么接下来，我给大家展示一下我的内功心法。

我的内功心法主要是一个私有的静态内部类，叫 Node，也就是节点。

```java
private static class Node<E> {
    E item;
    Node<E> next;
    Node<E> prev;

    Node(Node<E> prev, E element, Node<E> next) {
        this.item = element;
        this.next = next;
        this.prev = prev;
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

## 03、LinkedList 的招式

和师兄 ArrayList 一样，我的招式也无外乎“增删改查”这 4 种。在此之前，我们都必须得初始化。

```java
LinkedList<String> list = new LinkedList();
```

师兄在初始化的时候，默认大小为 10，也可以指定大小，依据要存储的元素数量来。我就不需要。

### **1）招式一：增**

可以调用 add 方法添加元素：

```java
list.add("沉默王二");
list.add("沉默王三");
list.add("沉默王四");
```

add 方法内部其实调用的是 linkLast 方法：

```java
public boolean add(E e) {
    linkLast(e);
    return true;
}
```

linkLast，顾名思义，就是在链表的尾部链接：

```java
void linkLast(E e) {
    final Node<E> l = last;
    final Node<E> newNode = new Node<>(l, e, null);
    last = newNode;
    if (l == null)
        first = newNode;
    else
        l.next = newNode;
    size++;
    modCount++;
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

我这个增的招式，还可以演化成另外两个：

-  `addFirst()` 方法将元素添加到第一位；
- `addLast()` 方法将元素添加到末尾。

addFirst 内部其实调用的是 linkFirst：

```java
public void addFirst(E e) {
    linkFirst(e);
}
```

linkFirst 负责把新的节点设为 first，并将新的 first 的 next 更新为之前的 first。

```java
private void linkFirst(E e) {
    final Node<E> f = first;
    final Node<E> newNode = new Node<>(null, e, f);
    first = newNode;
    if (f == null)
        last = newNode;
    else
        f.prev = newNode;
    size++;
    modCount++;
}
```

addLast 的内核其实和 addFirst 差不多，就交给大家自行理解了。


### **2）招式二：删**

我这个删的招式还挺多的：

- `remove()`：删除第一个节点
- `remove(int)`：删除指定位置的节点
- `remove(Object)`：删除指定元素的节点
- `removeFirst()`：删除第一个节点
- `removeLast()`：删除最后一个节点

remove 内部调用的是 removeFirst，所以这两个招式的功效一样。

`remove(int)` 内部其实调用的是 unlink 方法。

```java
public E remove(int index) {
    checkElementIndex(index);
    return unlink(node(index));
}
```

unlink 方法其实很好理解，就是更新当前节点的 next 和 prev，然后把当前节点上的元素设为 null。

```java
E unlink(Node<E> x) {
    // assert x != null;
    final E element = x.item;
    final Node<E> next = x.next;
    final Node<E> prev = x.prev;

    if (prev == null) {
        first = next;
    } else {
        prev.next = next;
        x.prev = null;
    }

    if (next == null) {
        last = prev;
    } else {
        next.prev = prev;
        x.next = null;
    }

    x.item = null;
    size--;
    modCount++;
    return element;
}
```

remove(Object) 内部也调用了 unlink 方法，只不过在此之前要先找到元素所在的节点：

```java
public boolean remove(Object o) {
    if (o == null) {
        for (Node<E> x = first; x != null; x = x.next) {
            if (x.item == null) {
                unlink(x);
                return true;
            }
        }
    } else {
        for (Node<E> x = first; x != null; x = x.next) {
            if (o.equals(x.item)) {
                unlink(x);
                return true;
            }
        }
    }
    return false;
}
```

这内部就分为两种，一种是元素为 null 的时候，必须使用 == 来判断；一种是元素为非 null 的时候，要使用 equals 来判断。equals 是不能用来判 null 的，会抛出 NPE 错误。

removeFirst 内部调用的是 unlinkFirst 方法：

```java
public E removeFirst() {
    final Node<E> f = first;
    if (f == null)
        throw new NoSuchElementException();
    return unlinkFirst(f);
}
```

unlinkFirst 负责的就是把第一个节点毁尸灭迹，并且捎带把后一个节点的 prev 设为 null。

```java
private E unlinkFirst(Node<E> f) {
    // assert f == first && f != null;
    final E element = f.item;
    final Node<E> next = f.next;
    f.item = null;
    f.next = null; // help GC
    first = next;
    if (next == null)
        last = null;
    else
        next.prev = null;
    size--;
    modCount++;
    return element;
}
```

### **3）招式三：改**

可以调用 `set()` 方法来更新元素：

```java
list.set(0, "沉默王五");
```

来看一下 `set()` 方法：

```java
public E set(int index, E element) {
    checkElementIndex(index);
    Node<E> x = node(index);
    E oldVal = x.item;
    x.item = element;
    return oldVal;
}
```

首先对指定的下标进行检查，看是否越界；然后根据下标查找原有的节点：

```java
Node<E> node(int index) {
    // assert isElementIndex(index);

    if (index < (size >> 1)) {
        Node<E> x = first;
        for (int i = 0; i < index; i++)
            x = x.next;
        return x;
    } else {
        Node<E> x = last;
        for (int i = size - 1; i > index; i--)
            x = x.prev;
        return x;
    }
}
```

`size >> 1`：也就是右移一位，相当于除以 2。对于计算机来说，移位比除法运算效率更高，因为数据在计算机内部都是二进制存储的。

换句话说，node 方法会对下标进行一个初步判断，如果靠近前半截，就从下标 0 开始遍历；如果靠近后半截，就从末尾开始遍历。

找到指定下标的节点就简单了，直接把原有节点的元素替换成新的节点就 OK 了，prev 和 next 都不用改动。

### **4）招式四：查**

我这个查的招式可以分为两种：

- indexOf(Object)：查找某个元素所在的位置
- get(int)：查找某个位置上的元素

indexOf 的内部分为两种，一种是元素为 null 的时候，必须使用 == 来判断；一种是元素为非 null 的时候，要使用 equals 来判断。因为 equals 是不能用来判 null 的，会抛出 NPE 错误。

```java
public int indexOf(Object o) {
    int index = 0;
    if (o == null) {
        for (Node<E> x = first; x != null; x = x.next) {
            if (x.item == null)
                return index;
            index++;
        }
    } else {
        for (Node<E> x = first; x != null; x = x.next) {
            if (o.equals(x.item))
                return index;
            index++;
        }
    }
    return -1;
}
```

get 方法的内核其实还是 node 方法，这个之前已经说明过了，这里略过。

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

## 四、LinkedList 的挑战

说句实在话，我不是很喜欢和师兄 ArrayList 拿来比较，因为我们各自修炼的内功不同，没有孰高孰低。

虽然师兄经常喊我一声师弟，但我们之间其实挺和谐的。但我知道，在外人眼里，同门师兄弟，总要一较高下的。

比如说，我们俩在增删改查时候的时间复杂度。

也许这就是命运吧，从我进入师门的那天起，这种争论就一直没有停息过。

无论外人怎么看待我们，在我眼里，师兄永远都是一哥，我敬重他，他也愿意保护我。

----

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)