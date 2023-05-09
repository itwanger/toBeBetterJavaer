---
title: 阿里Java开发规约：禁止在foreach里执行元素的删除操作
shortTitle: Java foreach 循环陷阱
category:
  - Java核心
tag:
  - 集合框架（容器）
description: 本文解释了为什么在 Java foreach 循环中执行删除操作会导致问题，以及在遍历过程中如何正确地进行元素删除。阅读本文，您将避免在使用 foreach 循环时遇到的常见错误，提高编程安全性与效率。还不是因为fail-fast
head:
  - - meta
    - name: keywords
      content: Java,fail-fast,java foreach 删除元素,foreach 循环, 删除操作, 并发修改异常
---

# 6.8 Java foreach 循环陷阱

>这篇文章同样采用小二去面试的形式，给大家换个胃口。

那天，小二去阿里面试，面试官老王一上来就甩给了他一道面试题：为什么阿里的 Java 开发手册里会强制不要在 foreach 里进行元素的删除操作？

![](https://cdn.tobebetterjavaer.com/stutymore/fail-fast-20230428073517.png)

小二听完这句话就乐了。为什么呢？因为一天前他刚在《[二哥的Java进阶之路](https://github.com/itwanger/toBeBetterJavaer)》上看到过这道题的答案。

以下是整篇文章的内容。

### 关于fail-fast

为了镇楼，先搬一段英文来解释一下 fail-fast。

>In systems design, a fail-fast system is one which immediately reports at its interface any condition that is likely to indicate a failure. Fail-fast systems are usually designed to stop normal operation rather than attempt to continue a possibly flawed process. Such designs often check the system's state at several points in an operation, so any failures can be detected early. The responsibility of a fail-fast module is detecting errors, then letting the next-highest level of the system handle them.

这段话的大致意思就是，fail-fast 是一种通用的系统设计思想，一旦检测到可能会发生错误，就立马抛出异常，程序将不再往下执行。

```java
public void test(Wanger wanger) {   
    if (wanger == null) {
        throw new RuntimeException("wanger 不能为空");
    }
    
    System.out.println(wanger.toString());
}
```

一旦检测到 wanger 为 null，就立马抛出异常，让调用者来决定这种情况下该怎么处理，下一步 `wanger.toString()` 就不会执行了——避免更严重的错误出现。

很多时候，我们会把 fail-fast 归类为 Java 集合框架的一种错误检测机制，但其实 fail-fast 并不是 Java 集合框架特有的机制。

### for-each 删除元素报错

之所以我们把 fail-fast 放在集合框架篇里介绍，是因为问题比较容易再现。

```java
List<String> list = new ArrayList<>();
list.add("沉默王二");
list.add("沉默王三");
list.add("一个文章真特么有趣的程序员");

for (String str : list) {
	if ("沉默王二".equals(str)) {
		list.remove(str);
	}
}

System.out.println(list);
```

这段代码看起来没有任何问题，但运行起来就报错了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/fail-fast-01.png)


根据错误的堆栈信息，我们可以定位到 ArrayList 的第 901 行代码。

```java
final void checkForComodification() {
    if (modCount != expectedModCount)
        throw new ConcurrentModificationException();
}
```

也就是说，remove 的时候触发执行了 `checkForComodification` 方法，该方法对 modCount 和 expectedModCount 进行了比较，发现两者不等，就抛出了 `ConcurrentModificationException` 异常。

为什么会执行 `checkForComodification` 方法呢？

是因为 for-each 本质上是个语法糖，底层是通过[迭代器 Iterator](https://tobebetterjavaer.com/collection/iterator-iterable.html) 配合 while 循环实现的，来看一下反编译后的字节码。

```java
List<String> list = new ArrayList();
list.add("沉默王二");
list.add("沉默王三");
list.add("一个文章真特么有趣的程序员");
Iterator var2 = list.iterator();

while(var2.hasNext()) {
    String str = (String)var2.next();
    if ("沉默王二".equals(str)) {
        list.remove(str);
    }
}

System.out.println(list);
```

来看一下 ArrayList 的 iterator 方法吧：

```java
public Iterator<E> iterator() {
    return new Itr();
}
```

内部类 Itr 实现了 Iterator 接口，这是 Itr 的源码。

```java
private class Itr implements Iterator<E> {
    int cursor;             // 下一个元素的索引
    int lastRet = -1;       // 上一个返回元素的索引；如果没有则为 -1
    int expectedModCount = modCount; // ArrayList 的修改次数

    Itr() { }  // 构造函数

    public boolean hasNext() { // 判断是否还有下一个元素
        return cursor != size;
    }

    @SuppressWarnings("unchecked")
    public E next() { // 返回下一个元素
        checkForComodification(); // 检查 ArrayList 是否被修改过
        int i = cursor; // 当前索引
        Object[] elementData = ArrayList.this.elementData; // ArrayList 中的元素数组
        if (i >= elementData.length) // 超出数组范围
            throw new ConcurrentModificationException(); // 抛出异常
        cursor = i + 1; // 更新下一个元素的索引
        return (E) elementData[lastRet = i]; // 返回下一个元素
    }
}
```

也就是说 `new Itr()` 的时候 expectedModCount 被赋值为 modCount，而 modCount 是 ArrayList 中的一个计数器，用于记录 ArrayList 对象被修改的次数。ArrayList 的修改操作包括添加、删除、设置元素值等。每次对 ArrayList 进行修改操作时，modCount 的值会自增 1。

在迭代 ArrayList 时，如果迭代过程中发现 modCount 的值与迭代器的 expectedModCount 不一致，则说明 ArrayList 已被修改过，此时会抛出 ConcurrentModificationException 异常。这种机制可以保证迭代器在遍历 ArrayList 时，不会遗漏或重复元素，同时也可以在多线程环境下检测到并发修改问题。

```java
protected transient int modCount = 0;
```

### 分析代码执行的逻辑

我们来继续定位之前报错的错误堆栈。这是之前的代码。

```java
List<String> list = new ArrayList<>();
list.add("沉默王二");
list.add("沉默王三");
list.add("一个文章真特么有趣的程序员");

for (String str : list) {
	if ("沉默王二".equals(str)) {
		list.remove(str);
	}
}

System.out.println(list);
```

由于 list 此前执行了 3 次 add 方法。

- add 方法调用 ensureCapacityInternal 方法
- ensureCapacityInternal 方法调用 ensureExplicitCapacity 方法
- ensureExplicitCapacity 方法中会执行 `modCount++`

```java
private void ensureExplicitCapacity(int minCapacity) {
    modCount++;
}
```

所以 modCount 的值在经过三次 add 后为 3，于是 `new Itr()` 后 expectedModCount 的值也为 3（回到前面去看一下 Itr 的源码）。

接着来执行 for-each 的循环遍历。

执行第一次循环时，发现“沉默王二”等于 str，于是执行 `list.remove(str)`。

- remove 方法调用 fastRemove 方法
- fastRemove 方法中会执行 `modCount++`

```java
private void fastRemove(int index) {
    modCount++;
}
```

modCount 的值变成了 4。

第二次遍历时，会执行 Itr 的 next 方法（`String str = (String) var3.next();`），next 方法就会调用 `checkForComodification` 方法。

```java
final void checkForComodification() {
    if (modCount != expectedModCount)
        throw new ConcurrentModificationException();
}
```

此时 expectedModCount 为 3，modCount 为 4，就只好抛出 ConcurrentModificationException 异常了。

那其实在阿里巴巴的 Java 开发手册里也提到了，不要在 for-each 循环里进行元素的 remove/add 操作。remove 元素请使用 Iterator 方式。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/fail-fast-02.png)

那原因其实就是我们上面分析的这些，出于 fail-fast 保护机制。

### 那该如何正确地删除元素呢？

#### **1）remove 后 break**

```java
List<String> list = new ArrayList<>();
list.add("沉默王二");
list.add("沉默王三");
list.add("一个文章真特么有趣的程序员");

for (String str : list) {
	if ("沉默王二".equals(str)) {
		list.remove(str);
		break;
	}
}
```

break 后循环就不再遍历了，意味着 Iterator 的 next 方法不再执行了，也就意味着 `checkForComodification` 方法不再执行了，所以异常也就不会抛出了。

但是呢，当 List 中有重复元素要删除的时候，break 就不合适了。


#### **2）for 循环**

```java
List<String> list = new ArrayList<>();
list.add("沉默王二");
list.add("沉默王三");
list.add("一个文章真特么有趣的程序员");
for (int i = 0; i < list.size(); i++) {
	String str = list.get(i);
	if ("沉默王二".equals(str)) {
		list.remove(str);
	}
}
```

for 循环虽然可以避开 fail-fast 保护机制，也就说 remove 元素后不再抛出异常；但是呢，这段程序在原则上是有问题的。为什么呢？

第一次循环的时候，i 为 0，`list.size()` 为 3，当执行完 remove 方法后，i 为 1，`list.size()` 却变成了 2，因为 list 的大小在 remove 后发生了变化，也就意味着“沉默王三”这个元素被跳过了。能明白吗？

remove 之前 `list.get(1)` 为“沉默王三”；但 remove 之后 `list.get(1)` 变成了“一个文章真特么有趣的程序员”，而 `list.get(0)` 变成了“沉默王三”。

#### **3）使用 Iterator**

```java
List<String> list = new ArrayList<>();
list.add("沉默王二");
list.add("沉默王三");
list.add("一个文章真特么有趣的程序员");

Iterator<String> itr = list.iterator();

while (itr.hasNext()) {
	String str = itr.next();
	if ("沉默王二".equals(str)) {
		itr.remove();
	}
}
```

为什么使用 Iterator 的 remove 方法就可以避开 fail-fast 保护机制呢？看一下 remove 的源码就明白了。

```java
public void remove() {
    if (lastRet < 0) // 如果没有上一个返回元素的索引，则抛出异常
        throw new IllegalStateException();
    checkForComodification(); // 检查 ArrayList 是否被修改过

    try {
        ArrayList.this.remove(lastRet); // 删除上一个返回元素
        cursor = lastRet; // 更新下一个元素的索引
        lastRet = -1; // 清空上一个返回元素的索引
        expectedModCount = modCount; // 更新 ArrayList 的修改次数
    } catch (IndexOutOfBoundsException ex) {
        throw new ConcurrentModificationException(); // 抛出异常
    }
}
```

删除完会执行 `expectedModCount = modCount`，保证了 expectedModCount 与 modCount 的同步。

### 小结

为什么不能在foreach里执行删除操作？

因为 foreach 循环是基于迭代器实现的，而迭代器在遍历集合时会维护一个 expectedModCount 属性来记录集合被修改的次数。如果在 foreach 循环中执行删除操作会导致 expectedModCount 属性值与实际的 modCount 属性值不一致，从而导致迭代器的 hasNext() 和 next() 方法抛出 ConcurrentModificationException 异常。

为了避免这种情况，应该使用迭代器的 remove() 方法来删除元素，该方法会在删除元素后更新迭代器状态，确保循环的正确性。如果需要在循环中删除元素，应该使用迭代器的 remove() 方法，而不是集合自身的 remove() 方法。

就像这样。

```java
List<String> list = new ArrayList<>();
list.add("沉默王二");
list.add("沉默王三");
list.add("一个文章真特么有趣的程序员");

Iterator<String> itr = list.iterator();

while (itr.hasNext()) {
	String str = itr.next();
	if ("沉默王二".equals(str)) {
		itr.remove();
	}
}
```

除此之外，我们还可以采用 [Stream 流](https://tobebetterjavaer.com/java8/stream.html)的filter() 方法来过滤集合中的元素，然后再通过 collect() 方法将过滤后的元素收集到一个新的集合中。

```java
List<String> list = new ArrayList<>(Arrays.asList("沉默", "王二", "陈清扬"));
list = list.stream().filter(s -> !s.equals("陈清扬")).collect(Collectors.toList());
```

好了，关于这个问题，就聊到这里吧，希望能帮助到你。

----

GitHub 上标星 7600+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 7600+ 的 Java 教程](https://tobebetterjavaer.com/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)