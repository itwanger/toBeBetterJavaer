---
title: 详解 Java 中的双端队列（ArrayDeque附源码分析）
shortTitle: 双端队列ArrayDeque详解
category:
  - Java核心
tag:
  - 集合框架（容器）
description: 本文详细解析了 Java 中的双端队列 ArrayDeque 的实现原理、功能特点以及源码，为您提供了 ArrayDeque 的实际应用示例和性能优化建议。阅读本文，将帮助您更深入地理解双端队列在 Java 编程中的应用，从而在实际编程中充分发挥其优势。
head:
  - - meta
    - name: keywords
      content: Java,ArrayDeque,堆,队列,java 双端队列,java ArrayDeque,源码分析, 实现原理
---

>好，我们这节继续有请王老师上台来给大家讲 ArrayDeque，鼓掌欢迎了👏🏻。

Java 里有一个叫做*Stack*的类，却没有叫做*Queue*的类（它只是个接口名字，和类还不一样）。

```java
public interface Queue<E> extends Collection<E> {}
```

当需要使用栈时，Java 已不推荐使用*Stack*，而是推荐使用更高效的*ArrayDeque*（双端队列），原因我们第一次讲[集合框架](https://javabetter.cn/collection/gailan.html)的时候，其实已经聊过了，Stack 是一个“原始”类，它的核心方法上都加了 `synchronized` 关键字以确保线程安全，当我们不需要线程安全（比如说单线程环境下）性能就会比较差。

![](http://cdn.paicoding.com/tobebetterjavaer/images/collection//arraydeque-51e3552c-af39-4d00-8494-1ff0a4913357.png)

也就是说，当需要使用栈时候，请首选*ArrayDeque*。

```java
// 声明一个双端队列
ArrayDeque<String> stack = new ArrayDeque<>();

// 增加元素
stack.push("沉默");
stack.push("王二");
stack.push("陈清扬");

// 获取栈顶元素
String top = stack.peek();
System.out.println("栈顶元素为：" + top); // 陈清扬

// 弹出栈顶元素
String pop = stack.pop();
System.out.println("弹出的元素为：" + pop); // 陈清扬

// 修改栈顶元素
stack.pop();
stack.push("小明");
System.out.println("修改后的栈为：" + stack); // [小明, 沉默]

// 遍历队列查找元素
Iterator<String> iterator = stack.iterator();
int index = -1;
String target = "王二";
while (iterator.hasNext()) {
    String element = iterator.next();
    index++;
    if (element.equals(target)) {
        break;
    }
}

if (index == -1) {
    System.out.println("元素 " + target + " 不存在于队列中");
} else {
    System.out.println("元素 " + target + " 在队列中的位置为：" + index);
}
```

在上面的示例中，我们先创建了一个 ArrayDeque 对象，然后使用 push 方法向栈中添加了三个元素。接着使用 peek 方法获取栈顶元素，使用 pop 方法弹出栈顶元素，使用 pop 和 push 方法修改栈顶元素，使用迭代器查找元素在栈中的位置。

ArrayDeque 又实现了 Deque 接口（Deque 又实现了 Queue 接口）：

```java
public class ArrayDeque<E> extends AbstractCollection<E>
                           implements Deque<E>, Cloneable, Serializable
{}
```

因此，当我们需要使用队列的时候，也可以选择 ArrayDeque。

```java
ArrayDeque<String> queue = new ArrayDeque<>();

// 增加元素
queue.offer("沉默");
queue.offer("王二");
queue.offer("陈清扬");

// 获取队首元素
String front = queue.peek();
System.out.println("队首元素为：" + front); // 沉默

// 弹出队首元素
String poll = queue.poll();
System.out.println("弹出的元素为：" + poll); // 沉默

// 修改队列中的元素
queue.poll();
queue.offer("小明");
System.out.println("修改后的队列为：" + queue); // [陈清扬, 小明]

// 查找元素
Iterator<String> iterator = queue.iterator();
int index = 0;
while (iterator.hasNext()) {
    String element = iterator.next();
    if (element.equals("王二")) {
        System.out.println("元素在队列中的位置为：" + index); // 0
        break;
    }
    index++;
}
```

在上面的示例中，我们先创建了一个 ArrayDeque 对象，然后使用 offer 方法向队列中添加了三个元素。接着使用 peek 方法获取队首元素，使用 poll 方法弹出队首元素，使用 poll 和 offer 方法修改队列中的元素，使用迭代器查找元素在队列中的位置。

[我们前面讲了](https://javabetter.cn/collection/gailan.html)，LinkedList不只是个 List，还是一个 Queue，它也实现了 Deque 接口。

```java
public class LinkedList<E>
    extends AbstractSequentialList<E>
    implements List<E>, Deque<E>, Cloneable, java.io.Serializable
{}
```

所以，当我们需要使用队列时，还可以选择[LinkedList](https://javabetter.cn/collection/linkedlist.html)。

```java
// 创建一个 LinkedList 对象
LinkedList<String> queue = new LinkedList<>();

// 添加元素
queue.offer("沉默");
queue.offer("王二");
queue.offer("陈清扬");
System.out.println(queue); // 输出 [沉默, 王二, 陈清扬]

// 删除元素
queue.poll();
System.out.println(queue); // 输出 [王二, 陈清扬]

// 修改元素：LinkedList 中的元素不支持直接修改，需要先删除再添加
String first = queue.poll();
queue.offer("王大二");
System.out.println(queue); // 输出 [陈清扬, 王大二]

// 查找元素：LinkedList 中的元素可以使用 get() 方法进行查找
System.out.println(queue.get(0)); // 输出 陈清扬
System.out.println(queue.contains("沉默")); // 输出 false

// 查找元素：使用迭代器的方式查找陈清扬
// 使用迭代器依次遍历元素并查找
Iterator<String> iterator = queue.iterator();
while (iterator.hasNext()) {
    String element = iterator.next();
    if (element.equals("陈清扬")) {
        System.out.println("找到了：" + element);
        break;
    }
}
```

在使用 LinkedList 作为队列时，可以使用 offer() 方法将元素添加到队列的末尾，使用 poll() 方法从队列的头部删除元素，使用迭代器或者 poll() 方法依次遍历元素。

### 栈和队列

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

*ArrayDeque*和*LinkedList*是*Deque*的两个通用实现，由于官方更推荐使用*ArrayDeque*用作栈和队列，加之上一篇已经讲解过[LinkedList](https://javabetter.cn/collection/linkedlist.html)，本文将着重讲解*ArrayDeque*的具体实现。

从名字可以看出*ArrayDeque*底层通过数组实现，为了满足可以同时在数组两端插入或删除元素的需求，该数组还必须是循环的，即**循环数组（circular array）**，也就是说数组的任何一点都可能被看作起点或者终点。

*ArrayDeque*是非线程安全的（not thread-safe），当多个线程同时使用的时候，需要手动同步；另外，该容器不允许放入`null`元素。

![](https://cdn.paicoding.com/tobebetterjavaer/images/collection/arraydeque-1e7086a3-3d31-4553-aa16-5eaf2193649e.png)


上图中我们看到，**`head`指向首端第一个有效元素，`tail`指向尾端第一个可以插入元素的空位**。因为是循环数组，所以`head`不一定总等于 0，`tail`也不一定总是比`head`大。

### 方法剖析

#### addFirst()

`addFirst(E e)`的作用是在*Deque*的首端插入元素，也就是在`head`的前面插入元素，在空间足够且下标没有越界的情况下，只需要将`elements[--head] = e`即可。


![](https://cdn.paicoding.com/tobebetterjavaer/images/collection/arraydeque-459afbba-2778-4241-97fb-f01a29b79458.png)

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

上述代码我们看到，**空间问题是在插入之后解决的**，因为`tail`总是指向下一个可插入的空位，也就意味着`elements`数组至少有一个空位，所以插入元素的时候不用考虑空间问题。

下标越界的处理解决起来非常简单，`head = (head - 1) & (elements.length - 1)`就可以了，**这段代码相当于取余，同时解决了`head`为负值的情况**。因为`elements.length`必需是`2`的指数倍，`elements - 1`就是二进制低位全`1`，跟`head - 1`相与之后就起到了取模的作用，如果`head - 1`为负数（其实只可能是-1），则相当于对其取相对于`elements.length`的补码。

下面再说说扩容函数`doubleCapacity()`，其逻辑是申请一个更大的数组（原数组的两倍），然后将原数组复制过去。过程如下图所示：

![](https://cdn.paicoding.com/tobebetterjavaer/images/collection/arraydeque-f1386b63-10be-4998-bb6d-bf6560cca7ee.png)

图中我们看到，复制分两次进行，第一次复制`head`右边的元素，第二次复制`head`左边的元素。

```java
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

该方法的实现中，首先检查 head 和 tail 是否相等，如果不相等则抛出异常。然后计算出 head 右边的元素个数 r，以及新的容量 newCapacity，如果 newCapacity 太大则抛出异常。

接下来创建一个新的 Object 数组 a，将原有 ArrayDeque 中 head 右边的元素复制到 a 的前面（即图中绿色部分），将 head 左边的元素复制到 a 的后面（即图中灰色部分）。最后将 elements 数组替换为 a，head 设置为 0，tail 设置为 n（即新容量的长度）。

需要注意的是，由于 elements 数组被替换为 a 数组，因此在方法调用结束后，原有的 elements 数组将不再被引用，会被垃圾回收器回收。

#### addLast()

`addLast(E e)`的作用是在*Deque*的尾端插入元素，也就是在`tail`的位置插入元素，由于`tail`总是指向下一个可以插入的空位，因此只需要`elements[tail] = e;`即可。插入完成后再检查空间，如果空间已经用光，则调用`doubleCapacity()`进行扩容。

![](https://cdn.paicoding.com/tobebetterjavaer/images/collection/arraydeque-832c796a-6c24-4546-9f91-22ed39884363.png)

```java
public void addLast(E e) {
    if (e == null)//不允许放入null
        throw new NullPointerException();
    elements[tail] = e;//赋值
    if ( (tail = (tail + 1) & (elements.length - 1)) == head)//下标越界处理
        doubleCapacity();//扩容
}
```

下标越界处理方式`addFirt()`中已经讲过，不再赘述。

#### pollFirst()

`pollFirst()`的作用是删除并返回*Deque*首端元素，也即是`head`位置处的元素。如果容器不空，只需要直接返回`elements[head]`即可，当然还需要处理下标的问题。由于`ArrayDeque`中不允许放入`null`，当`elements[head] == null`时，意味着容器为空。

```java
public E pollFirst() {
    E result = elements[head];
    if (result == null)//null值意味着deque为空
        return null;
    elements[h] = null;//let GC work
    head = (head + 1) & (elements.length - 1);//下标越界处理
    return result;
}
```

#### pollLast()

`pollLast()`的作用是删除并返回*Deque*尾端元素，也即是`tail`位置前面的那个元素。

```java
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

#### peekFirst()

`peekFirst()`的作用是返回但不删除*Deque*首端元素，也即是`head`位置处的元素，直接返回`elements[head]`即可。

```java
public E peekFirst() {
    return elements[head]; // elements[head] is null if deque empty
}
```

#### peekLast()

`peekLast()`的作用是返回但不删除*Deque*尾端元素，也即是`tail`位置前面的那个元素。

```java
public E peekLast() {
    return elements[(tail - 1) & (elements.length - 1)];
}
```

### 小结

当需要实现先进先出(FIFO)或者先进后出(LIFO)的数据结构时，可以考虑使用 ArrayDeque。以下是一些使用 ArrayDeque 的场景：

- 管理任务队列：如果需要实现一个任务队列，可以使用 ArrayDeque 来存储任务元素。在队列头部添加新任务元素，从队列尾部取出任务进行处理，可以保证任务按照先进先出的顺序执行。
- 实现栈：ArrayDeque 可以作为栈的实现方式，支持 push、pop、peek 等操作，可以用于需要后进先出的场景。
- 实现缓存：在需要缓存一定数量的数据时，可以使用 ArrayDeque。当缓存的数据量超过容量时，可以从队列头部删除最老的数据，从队列尾部添加新的数据。
- 实现事件处理器：ArrayDeque 可以作为事件处理器的实现方式，支持从队列头部获取事件进行处理，从队列尾部添加新的事件。

简单总结一下吧。

ArrayDeque 是 Java 标准库中的一种双端队列实现，底层基于数组实现。与 LinkedList 相比，ArrayDeque 的性能更优，因为它使用连续的内存空间存储元素，可以更好地利用 CPU 缓存，在大多数情况下也更快。

为什么这么说呢？

因为ArrayDeque 的底层实现是数组，而 LinkedList 的底层实现是链表。数组是一段连续的内存空间，而链表是由多个节点组成的，每个节点存储数据和指向下一个节点的指针。因此，在使用 LinkedList 时，需要频繁进行内存分配和释放，而 ArrayDeque 在创建时就一次性分配了连续的内存空间，不需要频繁进行内存分配和释放，这样可以更好地利用 CPU 缓存，提高访问效率。

现代计算机CPU对于数据的局部性有很强的依赖，如果需要访问的数据在内存中是连续存储的，那么就可以利用CPU的缓存机制，提高访问效率。而当数据存储在不同的内存块里时，每次访问都需要从内存中读取，效率会受到影响。

当然了，使用 ArrayDeque 时，数组复制操作也是需要考虑的性能消耗之一。

当 ArrayDeque 的元素数量超过了初始容量时，会触发扩容操作。扩容操作会创建一个新的数组，并将原有元素复制到新数组中。扩容操作的时间复杂度为 O(n)。

不过，ArrayDeque 的扩容策略（当 ArrayDeque 中的元素数量达到数组容量时，就需要进行扩容操作，扩容时会将数组容量扩大为原来的两倍）可以在一定程度上减少数组复制的次数和时间消耗，同时保证 ArrayDeque 的性能和空间利用率。

ArrayDeque 不仅支持常见的队列操作，如添加元素、删除元素、获取队列头部元素、获取队列尾部元素等。同时，它还支持栈操作，如 push、pop、peek 等。这使得 ArrayDeque 成为一种非常灵活的数据结构，可以用于各种场景的数据存储和处理。


>参考链接：[https://github.com/CarpenterLee/JCFInternals](https://github.com/CarpenterLee/JCFInternals)，作者：李豪，整理：沉默王二


----

GitHub 上标星 17000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 17000+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.paicoding.com/tobebetterjavaer/images/gongzhonghao.png)
