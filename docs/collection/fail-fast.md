---
title: 为什么阿里巴巴强制不要在foreach里执行删除操作？还不是因为fail-fast
shortTitle: 为什么不要在foreach里执行删除操作？
category:
  - Java核心
tag:
  - 集合框架（容器）
description: Java程序员进阶之路，小白的零基础Java教程，为什么阿里巴巴强制不要在foreach里执行删除操作？还不是因为fail-fast
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,fail-fast
---


那天，小二去阿里面试，面试官老王一上来就甩给了他一道面试题：为什么阿里的 Java 开发手册里会强制不要在 foreach 里进行元素的删除操作？

小二听完这句话就乐了。为什么呢？因为一天前他刚在《Java 程序员进阶之路》上看到过这道题的答案。

以下是整篇文章的内容。

-----

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

是因为 for-each 本质上是个语法糖，底层是通过[迭代器 Iterator](戳链接🔗，详细了解下) 配合 while 循环实现的，来看一下反编译后的字节码。

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

内部类 Itr 实现了 Iterator 接口。

```java
private class Itr implements Iterator<E> {
    int cursor;       // index of next element to return
    int lastRet = -1; // index of last element returned; -1 if no such
    int expectedModCount = modCount;

    Itr() {}

    public boolean hasNext() {
        return cursor != size;
    }

    @SuppressWarnings("unchecked")
    public E next() {
        checkForComodification();
        int i = cursor;
        Object[] elementData = ArrayList.this.elementData;
        if (i >= elementData.length)
            throw new ConcurrentModificationException();
        cursor = i + 1;
        return (E) elementData[lastRet = i];
    }
}
```

也就是说 `new Itr()` 的时候 expectedModCount 被赋值为 modCount，而 modCount 是 List 的一个成员变量，表示集合被修改的次数。由于 list 此前执行了 3 次 add 方法。

- add 方法调用 ensureCapacityInternal 方法
- ensureCapacityInternal 方法调用 ensureExplicitCapacity 方法
- ensureExplicitCapacity 方法中会执行 `modCount++`

所以 modCount 的值在经过三次 add 后为 3，于是 `new Itr()` 后 expectedModCount 的值也为 3。

执行第一次循环时，发现“沉默王二”等于 str，于是执行 `list.remove(str)`。

- remove 方法调用 fastRemove 方法
- fastRemove 方法中会执行 `modCount++`


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

modCount 的值变成了 4。

执行第二次循环时，会执行 Itr 的 next 方法（`String str = (String) var3.next();`），next 方法就会调用 `checkForComodification` 方法，此时 expectedModCount 为 3，modCount 为 4，就只好抛出 ConcurrentModificationException 异常了。

那其实在阿里巴巴的 Java 开发手册里也提到了，不要在 for-each 循环里进行元素的 remove/add 操作。remove 元素请使用 Iterator 方式。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/fail-fast-02.png)

那原因其实就是我们上面分析的这些，出于 fail-fast 保护机制。

## 那该如何正确地删除元素呢？

### **1）remove 后 break**

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


### **2）for 循环**

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

### **3）使用 Iterator**

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
    if (lastRet < 0)
        throw new IllegalStateException();
    checkForComodification();

    try {
        ArrayList.this.remove(lastRet);
        cursor = lastRet;
        lastRet = -1;
        expectedModCount = modCount;
    } catch (IndexOutOfBoundsException ex) {
        throw new ConcurrentModificationException();
    }
}
```

删除完会执行 `expectedModCount = modCount`，保证了 expectedModCount 与 modCount 的同步。

-----

简单地总结一下，fail-fast 是一种保护机制，可以通过 for-each 循环删除集合的元素的方式验证这种保护机制。

那也就是说，for-each 本质上是一种语法糖，遍历集合时很方面，但并不适合拿来操作集合中的元素（增删）。

----

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)