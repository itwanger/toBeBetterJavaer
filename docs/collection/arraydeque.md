---
title: 详解 Java 中的堆和队列（ArrayDeque附源码分析）
shortTitle: 详解ArrayDeque
category:
  - Java核心
tag:
  - 集合框架（容器）
description: Java程序员进阶之路，小白的零基础Java教程，详解 Java 中的堆和队列（Stack and Queue 附源码分析）
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,ArrayDeque,堆,队列
---

Java 里有一个叫做*Stack*的类，却没有叫做*Queue*的类（它是个接口名字）。当需要使用栈时，Java 已不推荐使用*Stack*，而是推荐使用更高效的*ArrayDeque*；既然*Queue*只是一个接口，当需要使用队列时也就首选*ArrayDeque*了（次选是[LinkedList](https://tobebetterjavaer.com/collection/linkedlist.html)）。

## 总体介绍

要讲栈和队列，首先要讲*Deque*接口。*Deque*的含义是“double ended queue”，即双端队列，它既可以当作栈使用，也可以当作队列使用。下表列出了*Deque*与*Queue*相对应的接口：

| Queue Method | Equivalent Deque Method | 说明                                   |
| ------------ | ----------------------- | -------------------------------------- |
| add(e)       | addLast(e)              | 向队尾插入元素，失败则抛出异常         |
| offer(e)     | offerLast(e)            | 向队尾插入元素，失败则返回`false`      |
| remove()     | removeFirst()           | 获取并删除队首元素，失败则抛出异常     |
| poll()       | pollFirst()             | 获取并删除队首元素，失败则返回`null`   |
| element()    | getFirst()              | 获取但不删除队首元素，失败则抛出异常   |
| peek()       | peekFirst()             | 获取但不删除队首元素，失败则返回`null` |

下表列出了*Deque*与*Stack*对应的接口：

| Stack Method | Equivalent Deque Method | 说明                                   |
| ------------ | ----------------------- | -------------------------------------- |
| push(e)      | addFirst(e)             | 向栈顶插入元素，失败则抛出异常         |
| 无           | offerFirst(e)           | 向栈顶插入元素，失败则返回`false`      |
| pop()        | removeFirst()           | 获取并删除栈顶元素，失败则抛出异常     |
| 无           | pollFirst()             | 获取并删除栈顶元素，失败则返回`null`   |
| peek()       | getFirst()             | 获取但不删除栈顶元素，失败则抛出异常   |
| 无           | peekFirst()             | 获取但不删除栈顶元素，失败则返回`null` |

上面两个表共定义了*Deque*的 12 个接口。

添加，删除，取值都有两套接口，它们功能相同，区别是对失败情况的处理不同。

**一套接口遇到失败就会抛出异常，另一套遇到失败会返回特殊值（`false`或`null`）**。除非某种实现对容量有限制，大多数情况下，添加操作是不会失败的。

**虽然*Deque*的接口有 12 个之多，但无非就是对容器的两端进行操作，或添加，或删除，或查看**。明白了这一点讲解起来就会非常简单。

*ArrayDeque*和*LinkedList*是*Deque*的两个通用实现，由于官方更推荐使用*ArrayDeque*用作栈和队列，加之上一篇已经讲解过[LinkedList](https://tobebetterjavaer.com/collection/linkedlist.html)，本文将着重讲解*ArrayDeque*的具体实现。

从名字可以看出*ArrayDeque*底层通过数组实现，为了满足可以同时在数组两端插入或删除元素的需求，该数组还必须是循环的，即**循环数组（circular array）**，也就是说数组的任何一点都可能被看作起点或者终点。

*ArrayDeque*是非线程安全的（not thread-safe），当多个线程同时使用的时候，需要手动同步；另外，该容器不允许放入`null`元素。

![ArrayDeque_base.png](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/arraydeque-1e7086a3-3d31-4553-aa16-5eaf2193649e.png)


上图中我们看到，**`head`指向首端第一个有效元素，`tail`指向尾端第一个可以插入元素的空位**。因为是循环数组，所以`head`不一定总等于 0，`tail`也不一定总是比`head`大。

## 方法剖析

### addFirst()

`addFirst(E e)`的作用是在*Deque*的首端插入元素，也就是在`head`的前面插入元素，在空间足够且下标没有越界的情况下，只需要将`elements[--head] = e`即可。


![ArrayDeque_addFirst.png](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/arraydeque-459afbba-2778-4241-97fb-f01a29b79458.png)

实际需要考虑：

1. 空间是否够用，以及 
2. 下标是否越界的问题。

上图中，如果`head`为`0`之后接着调用`addFirst()`，虽然空余空间还够用，但`head`为`-1`，下标越界了。下列代码很好的解决了这两个问题。


```java
//addFirst(E e)
public void addFirst(E e) {
    if (e == null)//不允许放入null
        throw new NullPointerException();
    elements[head = (head - 1) & (elements.length - 1)] = e;//2.下标是否越界
    if (head == tail)//1.空间是否够用
        doubleCapacity();//扩容
}
```

```
//addFirst(E e)
public void addFirst(E e) {
    if (e == null)//不允许放入null
        throw new NullPointerException();
    elements[head = (head - 1) & (elements.length - 1)] = e;//2.下标是否越界
    if (head == tail)//1.空间是否够用
        doubleCapacity();//扩容
}
```

上述代码我们看到，**空间问题是在插入之后解决的**，因为`tail`总是指向下一个可插入的空位，也就意味着`elements`数组至少有一个空位，所以插入元素的时候不用考虑空间问题。

下标越界的处理解决起来非常简单，`head = (head - 1) & (elements.length - 1)`就可以了，**这段代码相当于取余，同时解决了`head`为负值的情况**。因为`elements.length`必需是`2`的指数倍，`elements - 1`就是二进制低位全`1`，跟`head - 1`相与之后就起到了取模的作用，如果`head - 1`为负数（其实只可能是-1），则相当于对其取相对于`elements.length`的补码。

下面再说说扩容函数`doubleCapacity()`，其逻辑是申请一个更大的数组（原数组的两倍），然后将原数组复制过去。过程如下图所示：

![ArrayDeque_doubleCapacity.png](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/arraydeque-f1386b63-10be-4998-bb6d-bf6560cca7ee.png)

图中我们看到，复制分两次进行，第一次复制`head`右边的元素，第二次复制`head`左边的元素。

```
//doubleCapacity()
private void doubleCapacity() {
    assert head == tail;
    int p = head;
    int n = elements.length;
    int r = n - p; // head右边元素的个数
    int newCapacity = n << 1;//原空间的2倍
    if (newCapacity < 0)
        throw new IllegalStateException("Sorry, deque too big");
    Object[] a = new Object[newCapacity];
    System.arraycopy(elements, p, a, 0, r);//复制右半部分，对应上图中绿色部分
    System.arraycopy(elements, 0, a, r, p);//复制左半部分，对应上图中灰色部分
    elements = (E[])a;
    head = 0;
    tail = n;
}
```

### addLast()

`addLast(E e)`的作用是在*Deque*的尾端插入元素，也就是在`tail`的位置插入元素，由于`tail`总是指向下一个可以插入的空位，因此只需要`elements[tail] = e;`即可。插入完成后再检查空间，如果空间已经用光，则调用`doubleCapacity()`进行扩容。

![ArrayDeque_addLast.png](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/arraydeque-832c796a-6c24-4546-9f91-22ed39884363.png)

```
public void addLast(E e) {
    if (e == null)//不允许放入null
        throw new NullPointerException();
    elements[tail] = e;//赋值
    if ( (tail = (tail + 1) & (elements.length - 1)) == head)//下标越界处理
        doubleCapacity();//扩容
}
```

下标越界处理方式`addFirt()`中已经讲过，不再赘述。

### pollFirst()

`pollFirst()`的作用是删除并返回*Deque*首端元素，也即是`head`位置处的元素。如果容器不空，只需要直接返回`elements[head]`即可，当然还需要处理下标的问题。由于`ArrayDeque`中不允许放入`null`，当`elements[head] == null`时，意味着容器为空。

```
public E pollFirst() {
    E result = elements[head];
    if (result == null)//null值意味着deque为空
        return null;
    elements[h] = null;//let GC work
    head = (head + 1) & (elements.length - 1);//下标越界处理
    return result;
}
```

### pollLast()

`pollLast()`的作用是删除并返回*Deque*尾端元素，也即是`tail`位置前面的那个元素。

```
public E pollLast() {
    int t = (tail - 1) & (elements.length - 1);//tail的上一个位置是最后一个元素
    E result = elements[t];
    if (result == null)//null值意味着deque为空
        return null;
    elements[t] = null;//let GC work
    tail = t;
    return result;
}
```

### peekFirst()

`peekFirst()`的作用是返回但不删除*Deque*首端元素，也即是`head`位置处的元素，直接返回`elements[head]`即可。

```
public E peekFirst() {
    return elements[head]; // elements[head] is null if deque empty
}
```

### peekLast()

`peekLast()`的作用是返回但不删除*Deque*尾端元素，也即是`tail`位置前面的那个元素。

```
public E peekLast() {
    return elements[(tail - 1) & (elements.length - 1)];
}
```

>参考链接：[https://github.com/CarpenterLee/JCFInternals](https://github.com/CarpenterLee/JCFInternals)，作者：李豪，整理：沉默王二


----

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
