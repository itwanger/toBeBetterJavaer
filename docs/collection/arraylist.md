---
title: Java ArrayList详解（附源码分析）
shortTitle: ArrayList详解
category:
  - Java核心
tag:
  - 集合框架（容器）
description: Java程序员进阶之路，小白的零基础Java教程，Java ArrayList详解
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,ArrayList,ArrayList源码
---

“二哥，听说今天我们开讲 ArrayList 了？好期待哦！”三妹明知故问，这个托配合得依然天衣无缝。

“是的呀，三妹。”我肯定地点了点头，继续说道，“ArrayList 可以称得上是集合框架方面最常用的类了，可以和 HashMap 一较高下。”

从名字就可以看得出来，ArrayList 实现了 List 接口，并且是基于数组实现的。

数组的大小是固定的，一旦创建的时候指定了大小，就不能再调整了。也就是说，如果数组满了，就不能再添加任何元素了。ArrayList 在数组的基础上实现了自动扩容，并且提供了比数组更丰富的预定义方法（各种增删改查），非常灵活。

Java 这门编程语言和 C语言的不同之处就在这里，如果是 C语言的话，就必须动手实现自己的 ArrayList，原生的库函数里面是没有的。

## 创建 ArrayList

“二哥，**如何创建一个 ArrayList 啊**？”三妹问。

```java
ArrayList<String> alist = new ArrayList<String>();
```

可以通过上面的语句来创建一个字符串类型的 ArrayList（通过尖括号来限定 ArrayList 中元素的类型，如果尝试添加其他类型的元素，将会产生编译错误），更简化的写法如下：

```java
List<String> alist = new ArrayList<>();
```

由于 ArrayList 实现了 List 接口，所以 alist 变量的类型可以是 List 类型；new 关键字声明后的尖括号中可以不再指定元素的类型，因为编译器可以通过前面尖括号中的类型进行智能推断。

如果非常确定 ArrayList 中元素的个数，在创建的时候还可以指定初始大小。

```java
List<String> alist = new ArrayList<>(20);
```

这样做的好处是，可以有效地避免在添加新的元素时进行不必要的扩容。但通常情况下，我们很难确定  ArrayList 中元素的个数，因此一般不指定初始大小。

## 向 ArrayList 中添加元素

“二哥，**那怎么向 ArrayList 中添加一个元素呢**？”三妹继续问。

可以通过 `add()` 方法向 ArrayList 中添加一个元素，如果不指定下标的话，就默认添加在末尾。

```java
alist.add("沉默王二");
```

“三妹，你可以研究一下 `add()` 方法的源码（基于 JDK 8 会好一点），它在添加元素的时候会判断需不需要进行扩容，如果需要的话，会执行 `grow()` 方法进行扩容，这个也是面试官特别喜欢考察的一个重点。”我叮嘱道。

下面是 `add(E e)` 方法的源码：

```java
public boolean add(E e) {
    ensureCapacityInternal(size + 1);  // Increments modCount!!
    elementData[size++] = e;
    return true;
}
```

调用了私有的 `ensureCapacityInternal` 方法：

```java
private void ensureCapacityInternal(int minCapacity) {
    if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
        minCapacity = Math.max(DEFAULT_CAPACITY, minCapacity);
    }

    ensureExplicitCapacity(minCapacity);
}
```

假如一开始创建 ArrayList 的时候没有指定大小，elementData 就会被初始化成一个空的数组，也就是 DEFAULTCAPACITY_EMPTY_ELEMENTDATA。

进入到 if 分支后，minCapacity 的值就会等于 DEFAULT_CAPACITY，可以看一下 DEFAULT_CAPACITY 的初始值：

```java
private static final int DEFAULT_CAPACITY = 10;
```
也就是说，如果 ArrayList 在创建的时候没有指定大小，默认可以容纳 10 个元素。

接下来会进入 `ensureExplicitCapacity` 方法：

```java
private void ensureExplicitCapacity(int minCapacity) {
    modCount++;

    // overflow-conscious code
    if (minCapacity - elementData.length > 0)
        grow(minCapacity);
}
```

接着进入 `grow(int minCapacity)` 方法：

```java
private void grow(int minCapacity) {
    // overflow-conscious code
    int oldCapacity = elementData.length;
    int newCapacity = oldCapacity + (oldCapacity >> 1);
    if (newCapacity - minCapacity < 0)
        newCapacity = minCapacity;
    if (newCapacity - MAX_ARRAY_SIZE > 0)
        newCapacity = hugeCapacity(minCapacity);
    // minCapacity is usually close to size, so this is a win:
    elementData = Arrays.copyOf(elementData, newCapacity);
}
```

然后对数组进行第一次扩容 `Arrays.copyOf(elementData, newCapacity)`，由原来的 DEFAULTCAPACITY_EMPTY_ELEMENTDATA 扩容为容量为 10 的数组。

“那假如向 ArrayList 添加第 11 个元素呢？”三妹看到了问题的关键。

此时，minCapacity 等于 11，elementData.length 为 10，`ensureExplicitCapacity()` 方法中 if 条件分支就起效了：

```java
private void ensureExplicitCapacity(int minCapacity) {
    modCount++;

    // overflow-conscious code
    if (minCapacity - elementData.length > 0)
        grow(minCapacity);
}
```

会再次进入到 `grow()` 方法：

```java
private void grow(int minCapacity) {
    // overflow-conscious code
    int oldCapacity = elementData.length;
    int newCapacity = oldCapacity + (oldCapacity >> 1);
    if (newCapacity - minCapacity < 0)
        newCapacity = minCapacity;
    if (newCapacity - MAX_ARRAY_SIZE > 0)
        newCapacity = hugeCapacity(minCapacity);
    // minCapacity is usually close to size, so this is a win:
    elementData = Arrays.copyOf(elementData, newCapacity);
}
```

“oldCapacity 等于 10，`oldCapacity >> 1` 这个表达式等于多少呢？三妹你知道吗？”我问三妹。

“不知道啊，`>>` 是什么意思呢？”三妹很疑惑。

“`>>` 是右移运算符，`oldCapacity >> 1` 相当于 oldCapacity 除以 2。”我给三妹解释道，“在计算机内部，都是按照二进制存储的，10 的二进制就是 1010，也就是 `0*2^0 + 1*2^1 + 0*2^2 + 1*2^3`=0+2+0+8=10 。。。。。。”

还没等我解释完，三妹就打断了我，“二哥，能再详细解释一下到底为什么吗？”

“当然可以啊。”我拍着胸脯对三妹说。

先从位全的含义说起吧。

平常我们使用的是十进制数，比如说 39，并不是简单的 3 和 9，3 表示的是 `3*10 = 30`，9 表示的是 `9*1 = 9`，和 3 相乘的 10，和 9 相乘的 1，就是**位权**。位数不同，位权就不同，第 1 位是 10 的 0 次方（也就是 `10^0=1`），第 2 位是 10 的 1 次方（`10^1=10`），第 3 位是 10 的 2 次方（`10^2=100`），最右边的是第一位，依次类推。

位权这个概念同样适用于二进制，第 1 位是 2 的 0 次方（也就是 `2^0=1`），第 2 位是 2 的 1 次方（`2^1=2`），第 3 位是 2 的 2 次方（`2^2=4`），第 34 位是 2 的 3 次方（`2^3=8`）。

十进制的情况下，10 是基数，二进制的情况下，2 是基数。

10 在十进制的表示法是 `0*10^0+1*10^1`=0+10=10。

10 的二进制数是 1010，也就是 `0*2^0 + 1*2^1 + 0*2^2 + 1*2^3`=0+2+0+8=10。

然后是**移位运算**，移位分为左移和右移，在 Java 中，左移的运算符是 `<<`，右移的运算符 `>>`。

拿 `oldCapacity >> 1` 来说吧，`>>` 左边的是被移位的值，此时是 10，也就是二进制 `1010`；`>>` 右边的是要移位的位数，此时是 1。

1010 向右移一位就是 101，空出来的最高位此时要补 0，也就是 0101。

“那为什么不补 1 呢？”三妹这个问题很尖锐。

“因为是算术右移，并且是正数，所以最高位补 0；如果表示的是负数，就需要补 1。”我慢吞吞地回答道，“0101 的十进制就刚好是 `1*2^0 + 0*2^1 + 1*2^2 + 0*2^3`=1+0+4+0=5，如果多移几个数来找规律的话，就会发现，右移 1 位是原来的 1/2，右移 2 位是原来的 1/4，诸如此类。”

也就是说，ArrayList 的大小会扩容为原来的大小+原来大小/2，也就是差不多 1.5 倍。

除了 `add(E e)` 方法，还可以通过 `add(int index, E element)` 方法把元素添加到指定的位置：

```java
alist.add(0, "沉默王三");
```

 `add(int index, E element)` 方法的源码如下：

```java
public void add(int index, E element) {
    rangeCheckForAdd(index);

    ensureCapacityInternal(size + 1);  // Increments modCount!!
    System.arraycopy(elementData, index, elementData, index + 1,
            size - index);
    elementData[index] = element;
    size++;
}
```

该方法会调用到一个非常重要的本地方法 `System.arraycopy()`，它会对数组进行复制（要插入位置上的元素往后复制）。

“三妹，注意看，我画幅图来表示下。”我认真地做起了图。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/arraylist-01.png)

## 更新 ArrayList 中的元素


“二哥，那怎么**更新 ArrayList 中的元素**呢？”三妹继续问。

可以使用 `set()` 方法来更改 ArrayList 中的元素，需要提供下标和新元素。

```java
alist.set(0, "沉默王四");
```

假设原来 0 位置上的元素为“沉默王三”，现在可以将其更新为“沉默王四”。

来看一下 `set()` 方法的源码：

```java
public E set(int index, E element) {
    rangeCheck(index);

    E oldValue = elementData(index);
    elementData[index] = element;
    return oldValue;
}
```

该方法会先对指定的下标进行检查，看是否越界，然后替换新值并返回旧值。

## 删除 ArrayList 中的元素

“二哥，那怎么**删除 ArrayList 中的元素**呢？”三妹继续问。

`remove(int index)` 方法用于删除指定下标位置上的元素，`remove(Object o)` 方法用于删除指定值的元素。

```java
alist.remove(1);
alist.remove("沉默王四");
```

先来看 `remove(int index)` 方法的源码：

```java
public E remove(int index) {
    rangeCheck(index);

    modCount++;
    E oldValue = elementData(index);

    int numMoved = size - index - 1;
    if (numMoved > 0)
        System.arraycopy(elementData, index+1, elementData, index,
                numMoved);
    elementData[--size] = null; // clear to let GC do its work

    return oldValue;
}
```

该方法会调用 ` System.arraycopy()` 对数组进行复制移动，然后把要删除的元素位置清空 `elementData[--size] = null`。

再来看 `remove(Object o)` 方法的源码：

```java
public boolean remove(Object o) {
    if (o == null) {
        for (int index = 0; index < size; index++)
            if (elementData[index] == null) {
                fastRemove(index);
                return true;
            }
    } else {
        for (int index = 0; index < size; index++)
            if (o.equals(elementData[index])) {
                fastRemove(index);
                return true;
            }
    }
    return false;
}
```

该方法通过遍历的方式找到要删除的元素，null 的时候使用 == 操作符判断，非 null 的时候使用 `equals()` 方法，然后调用 `fastRemove()` 方法；有相同元素时，只会删除第一个。

既然都调用了 `fastRemove()` 方法，那就继续来跟踪一下源码：

```java
private void fastRemove(int index) {
    modCount++;
    int numMoved = size - index - 1;
    if (numMoved > 0)
        System.arraycopy(elementData, index+1, elementData, index,
                numMoved);
    elementData[--size] = null; // clear to let GC do its work
}
```

同样是调用 `System.arraycopy()` 方法对数组进行复制和移动。

“三妹，注意看，我画幅图来表示下。”我认真地做起了图。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/arraylist-02.png)

## 查找 ArrayList 中的元素

“二哥，那怎么**查找 ArrayList 中的元素**呢？”三妹继续问。

如果要正序查找一个元素，可以使用 `indexOf()` 方法；如果要倒序查找一个元素，可以使用 `lastIndexOf()` 方法。

```java
alist.indexOf("沉默王二");
alist.lastIndexOf("沉默王二");
```

来看一下 `indexOf()` 方法的源码：

```java
public int indexOf(Object o) {
    if (o == null) {
        for (int i = 0; i < size; i++)
            if (elementData[i]==null)
                return i;
    } else {
        for (int i = 0; i < size; i++)
            if (o.equals(elementData[i]))
                return i;
    }
    return -1;
}
```

如果元素为 null 的时候使用“==”操作符，否则使用 `equals()` 方法。

`lastIndexOf()` 方法和 `indexOf()` 方法类似，不过遍历的时候从最后开始。

`contains()` 方法可以判断 ArrayList 中是否包含某个元素，其内部调用了 `indexOf()` 方法：

```java
public boolean contains(Object o) {
    return indexOf(o) >= 0;
}
```

如果 ArrayList 中的元素是经过排序的，就可以使用二分查找法，效率更快。

`Collections` 类的 `sort()` 方法可以对 ArrayList 进行排序，该方法会按照字母顺序对 String 类型的列表进行排序。如果是自定义类型的列表，还可以指定 Comparator 进行排序。

```java
List<String> copy = new ArrayList<>(alist);
copy.add("a");
copy.add("c");
copy.add("b");
copy.add("d");

Collections.sort(copy);
System.out.println(copy);
```

输出结果如下所示：

```
[a, b, c, d]
```

排序后就可以使用二分查找法了：

```java
int index = Collections.binarySearch(copy, "b");
```

## ArrayList 增删改查的时间复杂度

“最后，三妹，我来简单总结一下 ArrayList 的时间复杂度吧，方便后面学习 LinkedList 时对比。”我喝了一口水后补充道。

1）通过下标（也就是 `get(int index)`）访问一个元素的时间复杂度为 O(1)，因为是直达的，无论数据增大多少倍，耗时都不变。

```java
public E get(int index) {
    rangeCheck(index);

    return elementData(index);
}
```

2）默认添加一个元素（调用 `add()` 方法时）的时间复杂度为 O(1)，因为是直接添加到数组末尾的，但需要考虑到数组扩容时消耗的时间。

3）删除一个元素（调用 `remove(Object)` 方法时）的时间复杂度为 O(n)，因为要遍历列表，数据量增大几倍，耗时也增大几倍；如果是通过下标删除元素时，要考虑到数组的移动和复制所消耗的时间。

4）查找一个未排序的列表时间复杂度为 O(n)（调用 `indexOf()` 或者 `lastIndexOf()` 方法时），因为要遍历列表；查找排序过的列表时间复杂度为 O(log n)，因为可以使用二分查找法，当数据增大 n 倍时，耗时增大 logn 倍（这里的 log 是以 2 为底的，每找一次排除一半的可能）。

## 总结

ArrayList，如果有个中文名的话，应该叫动态数组，也就是可增长的数组，可调整大小的数组。动态数组克服了静态数组的限制，静态数组的容量是固定的，只能在首次创建的时候指定。而动态数组会随着元素的增加自动调整大小，更符合实际的开发需求。

学习集合框架，ArrayList 是第一课，也是新手进阶的重要一课。要想完全掌握 ArrayList，扩容这个机制是必须得掌握，也是面试中经常考察的一个点。

要想掌握扩容机制，就必须得读源码，也就肯定会遇到 `oldCapacity >> 1`，有些初学者会选择跳过，虽然不影响整体上的学习，但也错过了一个精进的机会。

计算机内部是如何表示十进制数的，右移时又发生了什么，静下心来去研究一下，你就会发现，哦，原来这么有趣呢？

----

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)