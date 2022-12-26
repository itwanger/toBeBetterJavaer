---
title: 海康威视一面：Java中Iterator和Iterable有什么区别？
shortTitle: Iterator和Iterable有什么区别？
category:
  - Java核心
tag:
  - 集合框架（容器）
description: Java程序员进阶之路，小白的零基础Java教程，Java中Iterator和Iterable有什么区别？
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,Iterable,Iterator
---


那天，小二去海康威视面试，面试官老王一上来就甩给了他一道面试题：请问 Iterator与Iterable有什么区别？

小二表示很开心，因为他3 天前刚好在《Java 程序员进阶之路》上读过这篇文章，所以回答得胸有成竹。

以下↓是文章的内容。

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

第一种我们略过，第二种用的是 Iterator，第三种看起来是 for-each，其实背后也是 Iterator，看一下反编译后的代码就明白了。

```java
Iterator var3 = list.iterator();

while(var3.hasNext()) {
    String str = (String)var3.next();
    System.out.print(str + "，");
}
```

for-each 只不过是个语法糖，让我们在遍历 List 的时候代码更简洁明了。

Iterator 是个接口，JDK 1.2 的时候就有了，用来改进 Enumeration：

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

JDK 1.8 时，Iterable 接口中新增了 forEach 方法：

```java
default void forEach(Consumer<? super T> action) {
    Objects.requireNonNull(action);
    for (T t : this) {
        action.accept(t);
    }
}
```

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
private class Itr implements Iterator<E> {

    public boolean hasNext() {
        return cursor != size;
    }

    @SuppressWarnings("unchecked")
    public E next() {
        Object[] elementData = ArrayList.this.elementData;
        cursor = i + 1;
        return (E) elementData[lastRet = i];
    }

    public void remove() {
        try {
            ArrayList.this.remove(lastRet);
            cursor = lastRet;
            lastRet = -1;
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
private class DescendingIterator implements Iterator<E> {
    private final ListItr itr = new ListItr(size());
    public boolean hasNext() {
        return itr.hasPrevious();
    }
    public E next() {
        return itr.previous();
    }
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
-----

好了，关于Iterator与Iterable我们就先聊这么多，总结两点：

- 学会深入思考，一点点抽丝剥茧，多想想为什么这样实现，很多问题没有自己想象中的那么复杂。
- 遇到疑惑不放弃，这是提升自己最好的机会，遇到某个疑难的点，解决的过程中会挖掘出很多相关的东西。


----

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)