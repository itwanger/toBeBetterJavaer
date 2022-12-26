---
title: Java Collections：专为集合框架而生的工具类
shortTitle: Collections工具类
category:
  - Java核心
tag:
  - 常用工具类
description: Java程序员进阶之路，小白的零基础Java教程，从入门到进阶，Java Collections：专为集合框架而生的工具类
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,java,Collections,集合框架
---


Collections 是 JDK 提供的一个工具类，位于 java.util 包下，提供了一系列的静态方法，方便我们对集合进行各种骚操作，算是集合框架的一个大管家。

还记得我们前面讲过的 [Arrays 工具类](https://mp.weixin.qq.com/s/9dYmKXEErZbyPJ_GxwWYug)吗？可以回去温习下。

Collections 的用法很简单，在 Intellij IDEA 中敲完 `Collections.` 之后就可以看到它提供的方法了，大致看一下方法名和参数就能知道这个方法是干嘛的。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/common-tool/collections-01.png)

为了节省大家的学习时间，我将这些方法做了一些分类，并列举了一些简单的例子。

## 01、排序操作

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

## 02、查找操作

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

## 03、同步控制

[HashMap 是线程不安全](https://mp.weixin.qq.com/s/qk_neCdzM3aB6pVWVTHhNw)的，这个我们前面讲到了。那其实 ArrayList 也是线程不安全的，没法在多线程环境下使用，那 Collections 工具类中提供了多个 synchronizedXxx 方法，这些方法会返回一个同步的对象，从而解决多线程中访问集合时的安全问题。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/common-tool/collections-02.png)

使用起来也非常的简单：

```java
SynchronizedList synchronizedList = Collections.synchronizedList(list);
```

看一眼 SynchronizedList 的源码就明白了，不过是在方法里面使用 synchronized 关键字加了一层锁而已。

```java
static class SynchronizedList<E>
    extends SynchronizedCollection<E>
    implements List<E> {
    private static final long serialVersionUID = -7754090372962971524L;

    final List<E> list;

    SynchronizedList(List<E> list) {
        super(list);
        this.list = list;
    }

    public E get(int index) {
        synchronized (mutex) {return list.get(index);}
    }
    
    public void add(int index, E element) {
        synchronized (mutex) {list.add(index, element);}
    }
    public E remove(int index) {
        synchronized (mutex) {return list.remove(index);}
    }
}
```

那这样的话，其实效率和那些直接在方法上加 synchronized 关键字的 Vector、Hashtable 差不多（JDK 1.0 时期就有了），而这些集合类基本上已经废弃了，几乎不怎么用。

```java
public class Vector<E>
    extends AbstractList<E>
    implements List<E>, RandomAccess, Cloneable, java.io.Serializable
{

    public synchronized E get(int index) {
        if (index >= elementCount)
            throw new ArrayIndexOutOfBoundsException(index);

        return elementData(index);
    }

    public synchronized E remove(int index) {
        modCount++;
        if (index >= elementCount)
            throw new ArrayIndexOutOfBoundsException(index);
        E oldValue = elementData(index);

        int numMoved = elementCount - index - 1;
        if (numMoved > 0)
            System.arraycopy(elementData, index+1, elementData, index,
                             numMoved);
        elementData[--elementCount] = null; // Let gc do its work

        return oldValue;
    }
}
```

正确的做法是使用并发包下的 CopyOnWriteArrayList、ConcurrentHashMap。这些我们放到并发编程时再讲。

## 04、不可变集合

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

这是从分析 add 方法源码得出的原因。除此之外，emptyList 方法是 final 的，返回的 EMPTY_LIST 也是 final 的，种种迹象表明 emptyList 返回的就是不可变对象，没法进行增伤改查。

```java
public static final <T> List<T> emptyList() {
    return (List<T>) EMPTY_LIST;
}

public static final List EMPTY_LIST = new EmptyList<>();
```

## 05、其他

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

整体上，Collections 工具类作为集合框架的大管家，提供了一些非常便利的方法供我们调用，也非常容易掌握，没什么难点，看看方法的注释就能大致明白干嘛的。

不过，工具就放在那里，用是一回事，为什么要这么用就是另外一回事了。能不能提高自己的编码水平，很大程度上取决于你到底有没有去钻一钻源码，看这些设计 JDK 的大师们是如何写代码的，学会一招半式，在工作当中还是能很快脱颖而出的。

恐怕 JDK 的设计者是这个世界上最好的老师了，文档写得不能再详细了，代码写得不能再优雅了，基本上都达到了性能上的极致。

可能有人会说，工具类没什么鸟用，不过是调用下方法而已，但这就大错特错了：如果要你来写，你能写出来 Collections 这样一个工具类吗？

这才是高手要思考的一个问题。


----

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)



