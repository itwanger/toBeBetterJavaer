---
title: Java迭代器Iterator和Iterable有什么区别？
shortTitle: Iterator和Iterable的区别
category:
  - Java核心
tag:
  - 集合框架（容器）
description: 本文详细解析了 Java 中的迭代器 Iterator 和 Iterable 接口，阐述了它们的原理、功能及使用方法。通过学习本文，您将更好地理解如何利用 Iterator 和 Iterable 遍历集合，提高编程效率与质量。
head:
  - - meta
    - name: keywords
      content: Java,Iterable,Iterator,java Iterable,java Iterator,Iterable Iterator,java Iterable Iterator,java迭代器
---

# 6.14 Iterator和Iterable的区别

>PS: 这篇同样来换一个风格，一起来欣赏。

那天，小二去海康威视面试，面试官老王一上来就甩给了他一道面试题：请问 Iterator与Iterable有什么区别？

小二表示很开心，因为他3 天前刚好在《[二哥的Java进阶之路](https://javabetter.cn/collection/iterator-iterable.html)》上读过这篇文章，所以回答得胸有成竹。

以下↓是小二当时读过的文章内容，他印象深刻。

----

在 Java 中，我们对 List 进行遍历的时候，主要有这么三种方式。

第一种：for 循环。

```java
for (int i = 0; i < list.size(); i++) {
    System.out.print(list.get(i) + "，");
}
```

第二种：迭代器。

```java
Iterator it = list.iterator();
while (it.hasNext()) {
    System.out.print(it.next() + "，");
}
```

第三种：for-each。

```java
for (String str : list) {
    System.out.print(str + "，");
}
```

第一种我们略过，第二种用的是 Iterator，第三种看起来是 for-each，其实背后也是 Iterator，看一下反编译后的代码（如下所示）就明白了。

```java
Iterator var3 = list.iterator();

while(var3.hasNext()) {
    String str = (String)var3.next();
    System.out.print(str + "，");
}
```

for-each 只不过是个语法糖，让我们开发者在遍历 List 的时候可以写更少的代码，更简洁明了。

Iterator 是个接口，JDK 1.2 的时候就有了，用来改进 Enumeration 接口：

- 允许删除元素（增加了 remove 方法）
- 优化了方法名（Enumeration 中是 hasMoreElements 和 nextElement，不简洁）

来看一下 Iterator 的源码：

```java
public interface Iterator<E> {
    // 判断集合中是否存在下一个对象
    boolean hasNext();
    // 返回集合中的下一个对象，并将访问指针移动一位
    E next();
    // 删除集合中调用next()方法返回的对象
    default void remove() {
        throw new UnsupportedOperationException("remove");
    }
}
```

JDK 1.8 时，Iterable 接口中新增了 forEach 方法。该方法接受一个 Consumer 对象作为参数，用于对集合中的每个元素执行指定的操作。该方法的实现方式是使用 for-each 循环遍历集合中的元素，对于每个元素，调用 Consumer 对象的 accept 方法执行指定的操作。

```java
default void forEach(Consumer<? super T> action) {
    Objects.requireNonNull(action);
    for (T t : this) {
        action.accept(t);
    }
}
```

该方法实现时首先会对 action 参数进行非空检查，如果为 null 则抛出 NullPointerException 异常。然后使用 for-each 循环遍历集合中的元素，并对每个元素调用 action.accept(t) 方法执行指定的操作。由于 Iterable 接口是 Java 集合框架中所有集合类型的基本接口，因此该方法可以被所有实现了 Iterable 接口的集合类型使用。

它对 Iterable 的每个元素执行给定操作，具体指定的操作需要自己写Consumer接口通过accept方法回调出来。

```java
List<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3));
list.forEach(integer -> System.out.println(integer));
```

写得更浅显易懂点，就是：

```java
List<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3));
list.forEach(new Consumer<Integer>() {
    @Override
    public void accept(Integer integer) {
        System.out.println(integer);
    }
});
```

如果我们仔细观察ArrayList 或者 LinkedList 的“户口本”就会发现，并没有直接找到 Iterator 的影子。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/iterator-iterable-01.png)

反而找到了 Iterable！

```java
public interface Iterable<T> {
    Iterator<T> iterator();
}
```

也就是说，List 的关系图谱中并没有直接使用 Iterator，而是使用 Iterable 做了过渡。

回头再来看一下第二种遍历 List 的方式。

```java
Iterator it = list.iterator();
while (it.hasNext()) {
}
```

发现刚好呼应上了。拿 ArrayList 来说吧，它重写了 Iterable 接口的 iterator 方法：

```java
public Iterator<E> iterator() {
    return new Itr();
}
```

返回的对象 Itr 是个内部类，实现了 Iterator 接口，并且按照自己的方式重写了 hasNext、next、remove 等方法。

```java
/**
 * ArrayList 迭代器的实现，内部类。
 */
private class Itr implements Iterator<E> {

    /**
     * 游标位置，即下一个元素的索引。
     */
    int cursor;

    /**
     * 上一个元素的索引。
     */
    int lastRet = -1;

    /**
     * 预期的结构性修改次数。
     */
    int expectedModCount = modCount;

    /**
     * 判断是否还有下一个元素。
     *
     * @return 如果还有下一个元素，则返回 true，否则返回 false。
     */
    public boolean hasNext() {
        return cursor != size;
    }

    /**
     * 获取下一个元素。
     *
     * @return 列表中的下一个元素。
     * @throws NoSuchElementException 如果没有下一个元素，则抛出 NoSuchElementException 异常。
     */
    @SuppressWarnings("unchecked")
    public E next() {
        // 获取 ArrayList 对象的内部数组
        Object[] elementData = ArrayList.this.elementData;
        // 记录当前迭代器的位置
        int i = cursor;
        if (i >= size) {
            throw new NoSuchElementException();
        }
        // 将游标位置加 1，为下一次迭代做准备
        cursor = i + 1;
        // 记录上一个元素的索引
        return (E) elementData[lastRet = i];
    }

    /**
     * 删除最后一个返回的元素。
     * 迭代器只能删除最后一次调用 next 方法返回的元素。
     *
     * @throws ConcurrentModificationException 如果在最后一次调用 next 方法之后列表结构被修改，则抛出 ConcurrentModificationException 异常。
     * @throws IllegalStateException         如果在调用 next 方法之前没有调用 remove 方法，或者在同一次迭代中多次调用 remove 方法，则抛出 IllegalStateException 异常。
     */
    public void remove() {
        // 检查在最后一次调用 next 方法之后是否进行了结构性修改
        if (expectedModCount != modCount) {
            throw new ConcurrentModificationException();
        }
        // 如果上一次调用 next 方法之前没有调用 remove 方法，则抛出 IllegalStateException 异常
        if (lastRet < 0) {
            throw new IllegalStateException();
        }
        try {
            // 调用 ArrayList 对象的 remove(int index) 方法删除上一个元素
            ArrayList.this.remove(lastRet);
            // 将游标位置设置为上一个元素的位置
            cursor = lastRet;
            // 将上一个元素的索引设置为 -1，表示没有上一个元素
            lastRet = -1;
            // 更新预期的结构性修改次数
            expectedModCount = modCount;
        } catch (IndexOutOfBoundsException ex) {
            throw new ConcurrentModificationException();
        }
    }
}
```

那可能有些小伙伴会问：为什么不直接将 Iterator 中的核心方法 hasNext、next 放到 Iterable 接口中呢？直接像下面这样使用不是更方便？

```java
Iterable it = list.iterator();
while (it.hasNext()) {
}
```

从英文单词的后缀语法上来看，（Iterable）able 表示这个 List 是支持迭代的，而 （Iterator）tor 表示这个 List 是如何迭代的。

支持迭代与具体怎么迭代显然不能混在一起，否则就乱的一笔。还是各司其职的好。

想一下，如果把 Iterator 和 Iterable 合并，for-each 这种遍历 List 的方式是不是就不好办了？

原则上，只要一个 List 实现了 Iterable 接口，那么它就可以使用 for-each 这种方式来遍历，那具体该怎么遍历，还是要看它自己是怎么实现 Iterator 接口的。

Map 就没办法直接使用 for-each，因为 Map 没有实现 Iterable 接口，只有通过 `map.entrySet()`、`map.keySet()`、`map.values()` 这种返回一个  Collection 的方式才能 使用 for-each。

如果我们仔细研究 LinkedList 的源码就会发现，LinkedList 并没有直接重写 Iterable 接口的 iterator 方法，而是由它的父类 AbstractSequentialList 来完成。

```java
public Iterator<E> iterator() {
    return listIterator();
}
```

LinkedList 重写了 listIterator 方法：

```java
public ListIterator<E> listIterator(int index) {
    checkPositionIndex(index);
    return new ListItr(index);
}
```

这里我们发现了一个新的迭代器 ListIterator，它继承了 Iterator 接口，在遍历List 时可以从任意下标开始遍历，而且支持双向遍历。

```java
public interface ListIterator<E> extends Iterator<E> {
    boolean hasNext();
    E next();
    boolean hasPrevious();
    E previous();
}
```

我们知道，集合（Collection）不仅有 List，还有 Set，那 Iterator 不仅支持 List，还支持 Set，但 ListIterator 就只支持 List。

那可能有些小伙伴会问：为什么不直接让 List 实现 Iterator 接口，而是要用内部类来实现呢？

这是因为有些 List 可能会有多种遍历方式，比如说 LinkedList，除了支持正序的遍历方式，还支持逆序的遍历方式——DescendingIterator：

```java
/**
 * ArrayList 逆向迭代器的实现，内部类。
 */
private class DescendingIterator implements Iterator<E> {

    /**
     * 使用 ListItr 对象进行逆向遍历。
     */
    private final ListItr itr = new ListItr(size());

    /**
     * 判断是否还有下一个元素。
     *
     * @return 如果还有下一个元素，则返回 true，否则返回 false。
     */
    public boolean hasNext() {
        return itr.hasPrevious();
    }

    /**
     * 获取下一个元素。
     *
     * @return 列表中的下一个元素。
     * @throws NoSuchElementException 如果没有下一个元素，则抛出 NoSuchElementException 异常。
     */
    public E next() {
        return itr.previous();
    }

    /**
     * 删除最后一个返回的元素。
     * 迭代器只能删除最后一次调用 next 方法返回的元素。
     *
     * @throws UnsupportedOperationException 如果列表不支持删除操作，则抛出 UnsupportedOperationException 异常。
     * @throws IllegalStateException         如果在调用 next 方法之前没有调用 remove 方法，或者在同一次迭代中多次调用 remove 方法，则抛出 IllegalStateException 异常。
     */
    public void remove() {
        itr.remove();
    }
}
```

可以看得到，DescendingIterator 刚好利用了 ListIterator 向前遍历的方式。可以通过以下的方式来使用：

```java
Iterator it = list.descendingIterator();
while (it.hasNext()) {
}
```

好了，关于Iterator与Iterable我们就先聊这么多，总结两点：

- 学会深入思考，一点点抽丝剥茧，多想想为什么这样实现，很多问题没有自己想象中的那么复杂。
- 遇到疑惑不放弃，这是提升自己最好的机会，遇到某个疑难的点，解决的过程中会挖掘出很多相关的东西。


----

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)