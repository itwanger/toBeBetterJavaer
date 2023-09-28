---
title: Java Collections：专为集合框架而生的工具类
shortTitle: Collections工具类
category:
  - Java核心
tag:
  - 常用工具类
description: 本文详细介绍了Java中的Collections工具类，阐述了它在集合操作中的实际应用和优势。通过具体的代码示例，展示了如何使用Collections类处理集合的排序、查找、反转等常见问题。掌握Collections工具类的技巧，让您在Java编程中轻松应对各种集合操作，提高开发效率。
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,二哥的Java进阶之路,Java进阶之路,Java入门,教程,java,Collections,集合框架,java Collections
---

# 9.5 Collections工具类

Collections 是 JDK 提供的一个工具类，位于 java.util 包下，提供了一系列的静态方法，方便我们对集合进行各种骚操作，算是集合框架的一个大管家。

还记得我们前面讲过的 [Arrays 工具类](https://javabetter.cn/common-tool/arrays.html)吗？可以回去温习下。

Collections 的用法很简单，在 Intellij IDEA 中敲完 `Collections.` 之后就可以看到它提供的方法了，大致看一下方法名和参数就能知道这个方法是干嘛的。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/common-tool/collections-01.png)

为了节省大家的学习时间，我将这些方法做了一些分类，并列举了一些简单的例子。

### 01、排序操作

- `reverse(List list)`：反转顺序
- `shuffle(List list)`：洗牌，将顺序打乱
- `sort(List list)`：自然升序
- `sort(List list, Comparator c)`：按照自定义的比较器排序
- `swap(List list, int i, int j)`：将 i 和 j 位置的元素交换位置

来看例子：

```java
List<String> list = new ArrayList<>();
list.add("沉默王二");
list.add("沉默王三");
list.add("沉默王四");
list.add("沉默王五");
list.add("沉默王六");

System.out.println("原始顺序：" + list);

// 反转
Collections.reverse(list);
System.out.println("反转后：" + list);

// 洗牌
Collections.shuffle(list);
System.out.println("洗牌后：" + list);

// 自然升序
Collections.sort(list);
System.out.println("自然升序后：" + list);

// 交换
Collections.swap(list, 2,4);
System.out.println("交换后：" + list);
```

输出后：

```
原始顺序：[沉默王二, 沉默王三, 沉默王四, 沉默王五, 沉默王六]
反转后：[沉默王六, 沉默王五, 沉默王四, 沉默王三, 沉默王二]
洗牌后：[沉默王五, 沉默王二, 沉默王六, 沉默王三, 沉默王四]
自然升序后：[沉默王三, 沉默王二, 沉默王五, 沉默王六, 沉默王四]
交换后：[沉默王三, 沉默王二, 沉默王四, 沉默王六, 沉默王五]
```

### 02、查找操作

- `binarySearch(List list, Object key)`：二分查找法，前提是 List 已经排序过了
- `max(Collection coll)`：返回最大元素
- `max(Collection coll, Comparator comp)`：根据自定义比较器，返回最大元素
- `min(Collection coll)`：返回最小元素
- `min(Collection coll, Comparator comp)`：根据自定义比较器，返回最小元素
- `fill(List list, Object obj)`：使用指定对象填充
- `frequency(Collection c, Object o)`：返回指定对象出现的次数

来看例子：

```java
System.out.println("最大元素：" + Collections.max(list));
System.out.println("最小元素：" + Collections.min(list));
System.out.println("出现的次数：" + Collections.frequency(list, "沉默王二"));

// 没有排序直接调用二分查找，结果是不确定的
System.out.println("排序前的二分查找结果：" + Collections.binarySearch(list, "沉默王二"));
Collections.sort(list);
// 排序后，查找结果和预期一致
System.out.println("排序后的二分查找结果：" + Collections.binarySearch(list, "沉默王二"));

Collections.fill(list, "沉默王八");
System.out.println("填充后的结果：" + list);
```

输出后：

```
原始顺序：[沉默王二, 沉默王三, 沉默王四, 沉默王五, 沉默王六]
最大元素：沉默王四
最小元素：沉默王三
出现的次数：1
排序前的二分查找结果：0
排序后的二分查找结果：1
填充后的结果：[沉默王八, 沉默王八, 沉默王八, 沉默王八, 沉默王八]
```

### 03、同步控制

[HashMap 是线程不安全](https://javabetter.cn/collection/hashmap.html#_04%E3%80%81%E7%BA%BF%E7%A8%8B%E4%B8%8D%E5%AE%89%E5%85%A8)的，这个我们前面讲到了。那其实 ArrayList 也是线程不安全的，没法在多线程环境下使用，那 Collections 工具类中提供了多个 synchronizedXxx 方法，这些方法会返回一个同步的对象，从而解决多线程中访问集合时的安全问题。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/common-tool/collections-02.png)

使用起来也非常的简单：

```java
SynchronizedList synchronizedList = Collections.synchronizedList(list);
```

看一眼 SynchronizedList 的源码就明白了，不过是在方法里面使用 [synchronized 关键字](https://javabetter.cn/thread/synchronized-1.html)加了一层锁而已。

```java
static class SynchronizedList<E>
    extends SynchronizedCollection<E>
    implements List<E> {
    private static final long serialVersionUID = -7754090372962971524L;

    final List<E> list;

    SynchronizedList(List<E> list) {
        super(list); // 调用父类 SynchronizedCollection 的构造方法，传入 list
        this.list = list; // 初始化成员变量 list
    }

    // 获取指定索引处的元素
    public E get(int index) {
        synchronized (mutex) {return list.get(index);} // 加锁，调用 list 的 get 方法获取元素
    }
    
    // 在指定索引处插入指定元素
    public void add(int index, E element) {
        synchronized (mutex) {list.add(index, element);} // 加锁，调用 list 的 add 方法插入元素
    }
    
    // 移除指定索引处的元素
    public E remove(int index) {
        synchronized (mutex) {return list.remove(index);} // 加锁，调用 list 的 remove 方法移除元素
    }
}
```

那这样的话，其实效率和那些直接在方法上加 synchronized 关键字的 [Vector、Hashtable](https://javabetter.cn/collection/gailan.html) 差不多（JDK 1.0 时期就有了），而这些集合类基本上已经废弃了，几乎不怎么用。

```java
public class Vector<E>
    extends AbstractList<E>
    implements List<E>, RandomAccess, Cloneable, java.io.Serializable
{

    // 获取指定索引处的元素
    public synchronized E get(int index) {
        if (index >= elementCount) // 如果索引超出了列表的大小，则抛出数组下标越界异常
            throw new ArrayIndexOutOfBoundsException(index);

        return elementData(index); // 返回指定索引处的元素
    }

    // 移除指定索引处的元素
    public synchronized E remove(int index) {
        modCount++; // 修改计数器，标识列表已被修改
        if (index >= elementCount) // 如果索引超出了列表的大小，则抛出数组下标越界异常
            throw new ArrayIndexOutOfBoundsException(index);
        E oldValue = elementData(index); // 获取指定索引处的元素

        int numMoved = elementCount - index - 1; // 计算需要移动的元素个数
        if (numMoved > 0) // 如果需要移动元素
            System.arraycopy(elementData, index+1, elementData, index,
                             numMoved); // 将数组中的元素向左移动一位
        elementData[--elementCount] = null; // 将最后一个元素设置为 null，等待垃圾回收

        return oldValue; // 返回被移除的元素
    }
}
```

正确的做法是使用并发包下的 [CopyOnWriteArrayList](https://javabetter.cn/thread/CopyOnWriteArrayList.html)、[ConcurrentHashMap](https://javabetter.cn/thread/ConcurrentHashMap.html)。这些我们放到并发编程时再讲。

### 04、不可变集合

- `emptyXxx()`：制造一个空的不可变集合
- `singletonXxx()`：制造一个只有一个元素的不可变集合
- `unmodifiableXxx()`：为指定集合制作一个不可变集合

举个例子：

```java
List emptyList = Collections.emptyList();
emptyList.add("非空");
System.out.println(emptyList);
```

这段代码在执行的时候就抛出错误了。

```
Exception in thread "main" java.lang.UnsupportedOperationException
	at java.util.AbstractList.add(AbstractList.java:148)
	at java.util.AbstractList.add(AbstractList.java:108)
	at com.itwanger.s64.Demo.main(Demo.java:61)
```

这是因为 `Collections.emptyList()` 会返回一个 Collections 的内部类 EmptyList，而 EmptyList 并没有重写父类 AbstractList 的 `add(int index, E element)` 方法，所以执行的时候就抛出了不支持该操作的 UnsupportedOperationException 了。

这是从分析 add 方法源码得出的原因。除此之外，emptyList 方法是 final 的，返回的 EMPTY_LIST 也是 final 的，种种迹象表明 emptyList 返回的就是不可变对象，没法进行增删改查。

```java
public static final <T> List<T> emptyList() {
    return (List<T>) EMPTY_LIST;
}

public static final List EMPTY_LIST = new EmptyList<>();
```

### 05、其他

还有两个方法比较常用：

- `addAll(Collection<? super T> c, T... elements)`，往集合中添加元素
- `disjoint(Collection<?> c1, Collection<?> c2)`，判断两个集合是否没有交集

举个例子：

```java
List<String> allList = new ArrayList<>();
Collections.addAll(allList, "沉默王九","沉默王十","沉默王二");
System.out.println("addAll 后：" + allList);

System.out.println("是否没有交集：" + (Collections.disjoint(list, allList) ? "是" : "否"));
```

输出后：

```
原始顺序：[沉默王二, 沉默王三, 沉默王四, 沉默王五, 沉默王六]
addAll 后：[沉默王九, 沉默王十, 沉默王二]
是否没有交集：否
```

### 06、CollectionUtils：Spring 和 Apache 都有提供的集合工具类

对集合操作，除了前面说的 JDK 原生 `Collections` 工具类，`CollectionUtils`工具类也很常用。

目前比较主流的是`Spring`的`org.springframework.util`包下的 CollectionUtils 工具类。

![](https://cdn.tobebetterjavaer.com/stutymore/utils-20230330101919.png)

和`Apache`的`org.apache.commons.collections`包下的 CollectionUtils 工具类。

![](https://cdn.tobebetterjavaer.com/stutymore/utils-20230330103825.png)

Maven 坐标如下：

```
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-collections4</artifactId>
    <version>4.4</version>
</dependency>
```

Apache 的方法比 Spring 的更多一些，我们就以 Apache 的为例，来介绍一下常用的方法。

#### 集合判空

通过 CollectionUtils 工具类的`isEmpty`方法可以轻松判断集合是否为空，`isNotEmpty`方法判断集合不为空。

```java
List<Integer> list = new ArrayList<>();
list.add(2);
list.add(1);
list.add(3);

if (CollectionUtils.isEmpty(list)) {
    System.out.println("集合为空");
}

if (CollectionUtils.isNotEmpty(list)) {
    System.out.println("集合不为空");
}
```

#### 对两个集合进行操作

有时候我们需要对已有的两个集合进行操作，比如取交集或者并集等。

```java
List<Integer> list = new ArrayList<>();
list.add(2);
list.add(1);
list.add(3);

List<Integer> list2 = new ArrayList<>();
list2.add(2);
list2.add(4);

//获取并集
Collection<Integer> unionList = CollectionUtils.union(list, list2);
System.out.println(unionList);

//获取交集
Collection<Integer> intersectionList = CollectionUtils.intersection(list, list2);
System.out.println(intersectionList);

//获取交集的补集
Collection<Integer> disjunctionList = CollectionUtils.disjunction(list, list2);
System.out.println(disjunctionList);

//获取差集
Collection<Integer> subtractList = CollectionUtils.subtract(list, list2);
System.out.println(subtractList);
```

执行结果：

```java
[1, 2, 3, 4]
[2]
[1, 3, 4]
[1, 3]
```

说句实话，对两个集合的操作，在实际工作中用得挺多的，特别是很多批量的场景中。以前我们需要写一堆代码，但没想到有现成的轮子。

### 07、小结

整体上，Collections 工具类作为集合框架的大管家，提供了一些非常便利的方法供我们调用，也非常容易掌握，没什么难点，看看方法的注释就能大致明白干嘛的。

不过，工具就放在那里，用是一回事，为什么要这么用就是另外一回事了。能不能提高自己的编码水平，很大程度上取决于你到底有没有去钻一钻源码，看这些设计 JDK 的大师们是如何写代码的，学会一招半式，在工作当中还是能很快脱颖而出的。

恐怕 JDK 的设计者是这个世界上最好的老师了，文档写得不能再详细了，代码写得不能再优雅了，基本上都达到了性能上的极致。

可能有人会说，工具类没什么鸟用，不过是调用下方法而已，但这就大错特错了：如果要你来写，你能写出来 Collections 这样一个工具类吗？

这才是高手要思考的一个问题。

----

GitHub 上标星 9300+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 9300+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)



