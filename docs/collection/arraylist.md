---
title: 深入探讨 Java ArrayList：从源码分析到实践应用
shortTitle: ArrayList详解（附源码）
category:
  - Java核心
tag:
  - 集合框架（容器）
description: 本文详细解析了 Java ArrayList 的实现原理、功能特点以及源码，为您提供了 ArrayList 的实际应用示例和性能优化建议。阅读本文，将帮助您更深入地理解 ArrayList，从而在实际编程中充分发挥其优势。
head:
  - - meta
    - name: keywords
      content: Java,ArrayList,ArrayList源码,源码分析, java arraylist
---

# 6.3 ArrayList详解（附源码）

“二哥，听说今天我们开讲 ArrayList 了？好期待哦！”三妹明知故问，这个托配合得依然天衣无缝。

“是的呀，三妹。”我肯定地点了点头，继续说道，“ArrayList 可以称得上是集合框架方面最常用的类了，可以和 HashMap 一较高下。”

从名字就可以看得出来，ArrayList 实现了 List 接口，并且是基于数组实现的。

数组的大小是固定的，一旦创建的时候指定了大小，就不能再调整了。也就是说，如果数组满了，就不能再添加任何元素了。ArrayList 在数组的基础上实现了自动扩容，并且提供了比数组更丰富的预定义方法（各种增删改查），非常灵活。

Java 这门编程语言和别的编程语言，比如说 C语言的不同之处就在这里，如果是 C语言的话，你就必须得动手实现自己的 ArrayList，原生的库函数里面是没有的。

### 01、创建 ArrayList

“二哥，**如何创建一个 ArrayList 啊**？”三妹问。

```java
ArrayList<String> alist = new ArrayList<String>();
```

可以通过上面的语句来创建一个字符串类型的 ArrayList（通过尖括号来限定 ArrayList 中元素的类型，如果尝试添加其他类型的元素，将会产生编译错误），更简化的写法如下：

```java
List<String> alist = new ArrayList<>();
```

由于 ArrayList 实现了 List 接口，所以 alist 变量的类型可以是 List 类型；new 关键字声明后的尖括号中可以不再指定元素的类型，因为编译器可以通过前面尖括号中的类型进行智能推断。

此时会调用无参构造方法（见下面的代码）创建一个空的数组，常量DEFAULTCAPACITY_EMPTY_ELEMENTDATA的值为 `{}`。

```java
public ArrayList() {
    this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;
}
```

如果非常确定 ArrayList 中元素的个数，在创建的时候还可以指定初始大小。

```java
List<String> alist = new ArrayList<>(20);
```

这样做的好处是，可以有效地避免在添加新的元素时进行不必要的扩容。

### 02、向 ArrayList 中添加元素

“二哥，**那怎么向 ArrayList 中添加一个元素呢**？”三妹继续问。

可以通过 `add()` 方法向 ArrayList 中添加一个元素。

```java
alist.add("沉默王二");
```

我们来跟一下源码，看看 add 方法到底执行了哪些操作。跟的过程中，我们也可以偷师到 Java 源码的作者（大师级程序员）是如何优雅地写代码的。

我先给个结论，全当抛砖引玉。

```
堆栈过程图示：
add(element)
└── if (size == elementData.length) // 判断是否需要扩容
    ├── grow(minCapacity) // 扩容
    │   └── newCapacity = oldCapacity + (oldCapacity >> 1) // 计算新的数组容量
    │   └── Arrays.copyOf(elementData, newCapacity) // 创建新的数组
    ├── elementData[size++] = element; // 添加新元素
    └── return true; // 添加成功
```

来具体看一下，先是 `add()` 方法的源码（已添加好详细地注释）

```java
/**
 * 将指定元素添加到 ArrayList 的末尾
 * @param e 要添加的元素
 * @return 添加成功返回 true
 */
public boolean add(E e) {
    ensureCapacityInternal(size + 1);  // 确保 ArrayList 能够容纳新的元素
    elementData[size++] = e; // 在 ArrayList 的末尾添加指定元素
    return true;
}
```

参数 e 为要添加的元素，此时的值为“沉默王二”，size 为 ArrayList 的长度，此时为 0。

继续跟下去，来看看 `ensureCapacityInternal()`方法：

```java
/**
 * 确保 ArrayList 能够容纳指定容量的元素
 * @param minCapacity 指定容量的最小值
 */
private void ensureCapacityInternal(int minCapacity) {
    if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA) { // 如果 elementData 还是默认的空数组
        minCapacity = Math.max(DEFAULT_CAPACITY, minCapacity); // 使用 DEFAULT_CAPACITY 和指定容量的最小值中的较大值
    }

    ensureExplicitCapacity(minCapacity); // 确保容量能够容纳指定容量的元素
}
```

此时：

- 参数 minCapacity 为 1（size+1 传过来的）
- elementData 为存放 ArrayList 元素的底层数组，前面声明 ArrayList 的时候讲过了，此时为空 `{}`
- DEFAULTCAPACITY_EMPTY_ELEMENTDATA 前面也讲过了，为 `{}`

所以，if 条件此时为 true，if 语句`minCapacity = Math.max(DEFAULT_CAPACITY, minCapacity)`要执行。

DEFAULT_CAPACITY 为 10（见下面的代码），所以执行完这行代码后，minCapacity 为 10，`Math.max()` 方法的作用是取两个当中最大的那个。

```java
private static final int DEFAULT_CAPACITY = 10;
```

接下来执行 `ensureExplicitCapacity()` 方法，来看一下源码：

```java
/**
 * 检查并确保集合容量足够，如果需要则增加集合容量。
 *
 * @param minCapacity 所需最小容量
 */
private void ensureExplicitCapacity(int minCapacity) {
    // 检查是否超出了数组范围，确保不会溢出
    if (minCapacity - elementData.length > 0)
        // 如果需要增加容量，则调用 grow 方法
        grow(minCapacity);
}
```

此时：

- 参数 minCapacity 为 10
- elementData.length 为 0（数组为空）

所以 10-0>0，if 条件为 true，进入 if 语句执行 `grow()` 方法，来看源码：

```java
/**
 * 扩容 ArrayList 的方法，确保能够容纳指定容量的元素
 * @param minCapacity 指定容量的最小值
 */
private void grow(int minCapacity) {
    // 检查是否会导致溢出，oldCapacity 为当前数组长度
    int oldCapacity = elementData.length;
    int newCapacity = oldCapacity + (oldCapacity >> 1); // 扩容至原来的1.5倍
    if (newCapacity - minCapacity < 0) // 如果还是小于指定容量的最小值
        newCapacity = minCapacity; // 直接扩容至指定容量的最小值
    if (newCapacity - MAX_ARRAY_SIZE > 0) // 如果超出了数组的最大长度
        newCapacity = hugeCapacity(minCapacity); // 扩容至数组的最大长度
    // 将当前数组复制到一个新数组中，长度为 newCapacity
    elementData = Arrays.copyOf(elementData, newCapacity);
}
```

此时：

- 参数 minCapacity 为 10
- 变量 oldCapacity 为 0

所以 newCapacity 也为 0，于是 `newCapacity - minCapacity` 等于 -10 小于 0，于是第一个 if 条件为 true，执行第一个 if 语句 `newCapacity = minCapacity`，然后 newCapacity 为 10。

紧接着执行 `elementData = Arrays.copyOf(elementData, newCapacity);`，也就是进行数组的第一次扩容，长度为 10。

回到 `add()` 方法：

```java
public boolean add(E e) {
    ensureCapacityInternal(size + 1);
    elementData[size++] = e;
    return true;
}
```

执行 `elementData[size++] = e`。

此时：

- size 为 0
- e 为 “沉默王二”

所以数组的第一个元素（下标为 0） 被赋值为“沉默王二”，接着返回 true，第一次 add 方法执行完毕。

PS：add 过程中会遇到一个令新手感到困惑的右移操作符 `>>`，借这个机会来解释一下。

ArrayList 在第一次执行 add 后会扩容为 10，那 ArrayList 第二次扩容发生在什么时候呢？

答案是添加第 11 个元素时，大家可以尝试分析一下这个过程。

### 03、右移操作符

“oldCapacity 等于 10，`oldCapacity >> 1` 这个表达式等于多少呢？三妹你知道吗？”我问三妹。

“不知道啊，`>>` 是什么意思呢？”三妹很疑惑。

“`>>` 是右移运算符，`oldCapacity >> 1` 相当于 oldCapacity 除以 2。”我给三妹解释道，“在计算机内部，都是按照二进制存储的，10 的二进制就是 1010，也就是 `0*2^0 + 1*2^1 + 0*2^2 + 1*2^3`=0+2+0+8=10 。。。。。。”

还没等我解释完，三妹就打断了我，“二哥，能再详细解释一下到底为什么吗？”

“当然可以啊。”我拍着胸脯对三妹说。

先从位权的含义说起吧。

平常我们使用的是十进制数，比如说 39，并不是简单的 3 和 9，3 表示的是 `3*10 = 30`，9 表示的是 `9*1 = 9`，和 3 相乘的 10，和 9 相乘的 1，就是**位权**。位数不同，位权就不同，第 1 位是 10 的 0 次方（也就是 `10^0=1`），第 2 位是 10 的 1 次方（`10^1=10`），第 3 位是 10 的 2 次方（`10^2=100`），最右边的是第一位，依次类推。

位权这个概念同样适用于二进制，第 1 位是 2 的 0 次方（也就是 `2^0=1`），第 2 位是 2 的 1 次方（`2^1=2`），第 3 位是 2 的 2 次方（`2^2=4`），第 4 位是 2 的 3 次方（`2^3=8`）。

十进制的情况下，10 是基数，二进制的情况下，2 是基数。

10 在十进制的表示法是 `0*10^0+1*10^1`=0+10=10。

10 的二进制数是 1010，也就是 `0*2^0 + 1*2^1 + 0*2^2 + 1*2^3`=0+2+0+8=10。

然后是**移位运算**，移位分为左移和右移，在 Java 中，左移的运算符是 `<<`，右移的运算符 `>>`。

拿 `oldCapacity >> 1` 来说吧，`>>` 左边的是被移位的值，此时是 10，也就是二进制 `1010`；`>>` 右边的是要移位的位数，此时是 1。

1010 向右移一位就是 101，空出来的最高位此时要补 0，也就是 0101。

“那为什么不补 1 呢？”三妹这个问题很尖锐。

“因为是算术右移，并且是正数，所以最高位补 0；如果表示的是负数，就需要补 1。”我慢吞吞地回答道，“0101 的十进制就刚好是 `1*2^0 + 0*2^1 + 1*2^2 + 0*2^3`=1+0+4+0=5，如果多移几个数来找规律的话，就会发现，右移 1 位是原来的 1/2，右移 2 位是原来的 1/4，诸如此类。”

也就是说，ArrayList 的大小会扩容为原来的大小+原来大小/2，也就是 1.5 倍。

这下明白了吧？

你可以通过在 ArrayList 中添加第 11 个元素来 debug 验证一下。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection//arraylist-d01f248c-114f-47e3-af18-7135feac2a5e.png)

### 04、向 ArrayList 的指定位置添加元素

除了 `add(E e)` 方法，还可以通过 `add(int index, E element)` 方法把元素添加到 ArrayList 的指定位置：

```java
alist.add(0, "沉默王三");
```

`add(int index, E element)` 方法的源码如下：

```java
/**
 * 在指定位置插入一个元素。
 *
 * @param index   要插入元素的位置
 * @param element 要插入的元素
 * @throws IndexOutOfBoundsException 如果索引超出范围，则抛出此异常
 */
public void add(int index, E element) {
    rangeCheckForAdd(index); // 检查索引是否越界

    ensureCapacityInternal(size + 1);  // 确保容量足够，如果需要扩容就扩容
    System.arraycopy(elementData, index, elementData, index + 1,
            size - index); // 将 index 及其后面的元素向后移动一位
    elementData[index] = element; // 将元素插入到指定位置
    size++; // 元素个数加一
}
```

`add(int index, E element)`方法会调用到一个非常重要的[本地方法](https://javabetter.cn/oo/native-method.html) `System.arraycopy()`，它会对数组进行复制（要插入位置上的元素往后复制）。

来细品一下。

这是 arraycopy() 的语法：

```java
System.arraycopy(Object src, int srcPos, Object dest, int destPos, int length);
```

在 `ArrayList.add(int index, E element)` 方法中，具体用法如下：

```java
System.arraycopy(elementData, index, elementData, index + 1, size - index);
```

- elementData：表示要复制的源数组，即 ArrayList 中的元素数组。
- index：表示源数组中要复制的起始位置，即需要将 index 及其后面的元素向后移动一位。
- elementData：表示要复制到的目标数组，即 ArrayList 中的元素数组。
- index + 1：表示目标数组中复制的起始位置，即将 index 及其后面的元素向后移动一位后，应该插入到的位置。
- size - index：表示要复制的元素个数，即需要将 index 及其后面的元素向后移动一位，需要移动的元素个数为 size - index。


“三妹，注意看，我画幅图来表示下。”我认真地做起了图。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/arraylist-01.png)

### 05、更新 ArrayList 中的元素

“二哥，那怎么**更新 ArrayList 中的元素**呢？”三妹继续问。

可以使用 `set()` 方法来更改 ArrayList 中的元素，需要提供下标和新元素。

```java
alist.set(0, "沉默王四");
```

假设原来 0 位置上的元素为“沉默王三”，现在可以将其更新为“沉默王四”。

来看一下 `set()` 方法的源码：

```java
/**
 * 用指定元素替换指定位置的元素。
 *
 * @param index   要替换的元素的索引
 * @param element 要存储在指定位置的元素
 * @return 先前在指定位置的元素
 * @throws IndexOutOfBoundsException 如果索引超出范围，则抛出此异常
 */
public E set(int index, E element) {
    rangeCheck(index); // 检查索引是否越界

    E oldValue = elementData(index); // 获取原来在指定位置上的元素
    elementData[index] = element; // 将新元素替换到指定位置上
    return oldValue; // 返回原来在指定位置上的元素
}
```

该方法会先对指定的下标进行检查，看是否越界，然后替换新值并返回旧值。

### 06、删除 ArrayList 中的元素

“二哥，那怎么**删除 ArrayList 中的元素**呢？”三妹继续问。

`remove(int index)` 方法用于删除指定下标位置上的元素，`remove(Object o)` 方法用于删除指定值的元素。

```java
alist.remove(1);
alist.remove("沉默王四");
```

先来看 `remove(int index)` 方法的源码：

```java
/**
 * 删除指定位置的元素。
 *
 * @param index 要删除的元素的索引
 * @return 先前在指定位置的元素
 * @throws IndexOutOfBoundsException 如果索引超出范围，则抛出此异常
 */
public E remove(int index) {
    rangeCheck(index); // 检查索引是否越界

    E oldValue = elementData(index); // 获取要删除的元素

    int numMoved = size - index - 1; // 计算需要移动的元素个数
    if (numMoved > 0) // 如果需要移动元素，就用 System.arraycopy 方法实现
        System.arraycopy(elementData, index+1, elementData, index,
                numMoved);
    elementData[--size] = null; // 将数组末尾的元素置为 null，让 GC 回收该元素占用的空间

    return oldValue; // 返回被删除的元素
}
```

需要注意的是，在 ArrayList 中，删除元素时，需要将删除位置后面的元素向前移动一位，以填补删除位置留下的空缺。如果需要移动元素，则需要使用 System.arraycopy 方法将删除位置后面的元素向前移动一位。最后，将数组末尾的元素置为 null，以便让垃圾回收机制回收该元素占用的空间。

再来看 `remove(Object o)` 方法的源码：

```java
/**
 * 删除列表中第一次出现的指定元素（如果存在）。
 *
 * @param o 要删除的元素
 * @return 如果列表包含指定元素，则返回 true；否则返回 false
 */
public boolean remove(Object o) {
    if (o == null) { // 如果要删除的元素是 null
        for (int index = 0; index < size; index++) // 遍历列表
            if (elementData[index] == null) { // 如果找到了 null 元素
                fastRemove(index); // 调用 fastRemove 方法快速删除元素
                return true; // 返回 true，表示成功删除元素
            }
    } else { // 如果要删除的元素不是 null
        for (int index = 0; index < size; index++) // 遍历列表
            if (o.equals(elementData[index])) { // 如果找到了要删除的元素
                fastRemove(index); // 调用 fastRemove 方法快速删除元素
                return true; // 返回 true，表示成功删除元素
            }
    }
    return false; // 如果找不到要删除的元素，则返回 false
}
```

该方法通过遍历的方式找到要删除的元素，null 的时候使用 == 操作符判断，非 null 的时候使用 `equals()` 方法，然后调用 `fastRemove()` 方法。

注意：

- 有相同元素时，只会删除第一个。
- 判断两个元素是否相等，可以参考[Java如何判断两个字符串是否相等](https://javabetter.cn/string/equals.html)

继续往后面跟，来看一下 `fastRemove()` 方法：

```java
/**
 * 快速删除指定位置的元素。
 *
 * @param index 要删除的元素的索引
 */
private void fastRemove(int index) {
    int numMoved = size - index - 1; // 计算需要移动的元素个数
    if (numMoved > 0) // 如果需要移动元素，就用 System.arraycopy 方法实现
        System.arraycopy(elementData, index+1, elementData, index,
                numMoved);
    elementData[--size] = null; // 将数组末尾的元素置为 null，让 GC 回收该元素占用的空间
}
```

同样是调用 `System.arraycopy()` 方法对数组进行复制和移动。

“三妹，注意看，我画幅图来表示下。”我认真地做起了图。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/arraylist-02.png)

### 07、查找 ArrayList 中的元素

“二哥，那怎么**查找 ArrayList 中的元素**呢？”三妹继续问。

如果要正序查找一个元素，可以使用 `indexOf()` 方法；如果要倒序查找一个元素，可以使用 `lastIndexOf()` 方法。

```java
alist.indexOf("沉默王二");
alist.lastIndexOf("沉默王二");
```

来看一下 `indexOf()` 方法的源码：

```java
/**
 * 返回指定元素在列表中第一次出现的位置。
 * 如果列表不包含该元素，则返回 -1。
 *
 * @param o 要查找的元素
 * @return 指定元素在列表中第一次出现的位置；如果列表不包含该元素，则返回 -1
 */
public int indexOf(Object o) {
    if (o == null) { // 如果要查找的元素是 null
        for (int i = 0; i < size; i++) // 遍历列表
            if (elementData[i]==null) // 如果找到了 null 元素
                return i; // 返回元素的索引
    } else { // 如果要查找的元素不是 null
        for (int i = 0; i < size; i++) // 遍历列表
            if (o.equals(elementData[i])) // 如果找到了要查找的元素
                return i; // 返回元素的索引
    }
    return -1; // 如果找不到要查找的元素，则返回 -1
}
```

如果元素为 null 的时候使用“==”操作符，否则使用 `equals()` 方法。

`lastIndexOf()` 方法和 `indexOf()` 方法类似，不过遍历的时候从最后开始。

```java
/**
 * 返回指定元素在列表中最后一次出现的位置。
 * 如果列表不包含该元素，则返回 -1。
 *
 * @param o 要查找的元素
 * @return 指定元素在列表中最后一次出现的位置；如果列表不包含该元素，则返回 -1
 */
public int lastIndexOf(Object o) {
    if (o == null) { // 如果要查找的元素是 null
        for (int i = size-1; i >= 0; i--) // 从后往前遍历列表
            if (elementData[i]==null) // 如果找到了 null 元素
                return i; // 返回元素的索引
    } else { // 如果要查找的元素不是 null
        for (int i = size-1; i >= 0; i--) // 从后往前遍历列表
            if (o.equals(elementData[i])) // 如果找到了要查找的元素
                return i; // 返回元素的索引
    }
    return -1; // 如果找不到要查找的元素，则返回 -1
}
```

`contains()` 方法可以判断 ArrayList 中是否包含某个元素，其内部就是通过 `indexOf()` 方法实现的：

```java
public boolean contains(Object o) {
    return indexOf(o) >= 0;
}
```

### 08、二分查找法

如果 ArrayList 中的元素是经过排序的，就可以使用二分查找法，效率更快。

[`Collections`](https://javabetter.cn/common-tool/collections.html) 类的 `sort()` 方法可以对 ArrayList 进行排序，该方法会按照字母顺序对 String 类型的列表进行排序。如果是自定义类型的列表，还可以指定 Comparator 进行排序。

这里先简单地了解一下，后面会详细地讲。

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

### 09、ArrayList增删改查时的时间复杂度

“最后，三妹，我们来简单总结一下 ArrayList 的时间复杂度吧，方便后面学习 LinkedList 时对比。”我喝了一口水后补充道。

#### 1）查询

时间复杂度为 O(1)，因为 ArrayList 内部使用数组来存储元素，所以可以直接根据索引来访问元素。

```java
/**
 * 返回列表中指定位置的元素。
 *
 * @param index 要返回的元素的索引
 * @return 列表中指定位置的元素
 * @throws IndexOutOfBoundsException 如果索引超出范围（index < 0 || index >= size()）
 */
public E get(int index) {
    rangeCheck(index); // 检查索引是否合法
    return elementData(index); // 调用 elementData 方法获取元素
}

/**
 * 返回列表中指定位置的元素。
 * 此方法不进行边界检查，因此只应由内部方法和迭代器调用。
 *
 * @param index 要返回的元素的索引
 * @return 列表中指定位置的元素
 */
E elementData(int index) {
    return (E) elementData[index]; // 返回指定索引位置上的元素
}
```

#### 2）插入

添加一个元素（调用 `add()` 方法时）的时间复杂度最好情况为 O(1)，最坏情况为 O(n)。

- 如果在列表末尾添加元素，时间复杂度为 O(1)。
- 如果要在列表的中间或开头插入元素，则需要将插入位置之后的元素全部向后移动一位，时间复杂度为 O(n)。

#### 3）删除

删除一个元素（调用 `remove(Object)` 方法时）的时间复杂度最好情况 O(1)，最坏情况 O(n)。

- 如果要删除列表末尾的元素，时间复杂度为 O(1)。
- 如果要删除列表中间或开头的元素，则需要将删除位置之后的元素全部向前移动一位，时间复杂度为 O(n)。


#### 4）修改

修改一个元素（调用 `set()`方法时）与查询操作类似，可以直接根据索引来访问元素，时间复杂度为 O(1)。

```java
/**
 * 用指定元素替换列表中指定位置的元素。
 *
 * @param index 要替换元素的索引
 * @param element 要放入列表中的元素
 * @return 原来在指定位置上的元素
 * @throws IndexOutOfBoundsException 如果索引超出范围（index < 0 || index >= size()）
 */
public E set(int index, E element) {
    rangeCheck(index); // 检查索引是否合法

    E oldValue = elementData(index); // 获取原来在指定位置上的元素
    elementData[index] = element; // 将指定位置上的元素替换为新元素
    return oldValue; // 返回原来在指定位置上的元素
}
```

### 10、总结

ArrayList，如果有个中文名的话，应该叫动态数组，也就是可增长的数组，可调整大小的数组。动态数组克服了静态数组的限制，静态数组的容量是固定的，只能在首次创建的时候指定。而动态数组会随着元素的增加自动调整大小，更符合实际的开发需求。

学习集合框架，ArrayList 是第一课，也是新手进阶的重要一课。要想完全掌握 ArrayList，扩容这个机制是必须得掌握，也是面试中经常考察的一个点。

要想掌握扩容机制，就必须得读源码，也就肯定会遇到 `oldCapacity >> 1`，有些初学者会选择跳过，虽然不影响整体上的学习，但也错过了一个精进的机会。

计算机内部是如何表示十进制数的，右移时又发生了什么，静下心来去研究一下，你就会发现，哦，原来这么有趣呢？

“好了，三妹，这一节我们就学到这里，收工！”

----

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
