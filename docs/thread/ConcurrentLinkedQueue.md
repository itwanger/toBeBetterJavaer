---
title: 吊打Java并发面试官之线程安全的队列实现ConcurrentLinkedQueue
shortTitle: ConcurrentLinkedQueue
description: ConcurrentLinkedQueue 是 Java 的 java.util.concurrent 包中的一种线程安全的队列实现。它使用非阻塞算法来确保多线程环境下的高并发性能。
category:
  - Java核心
tag:
  - Java并发编程
head:
  - - meta
    - name: keywords
      content: Java,并发编程,多线程,Thread,ConcurrentLinkedQueue
---

# 第二十一节：非阻塞队列ConcurrentLinkedQueue

ConcurrentLinkedQueue 是 `java.util.concurrent`（JUC） 包下的一个线程安全的队列实现。基于非阻塞算法（Michael-Scott 非阻塞算法的一种变体），这意味着 ConcurrentLinkedQueue 不再使用传统的锁机制来保护数据安全，而是依靠底层原子的操作（如 [CAS](https://javabetter.cn/thread/cas.html)）来实现。

Michael-Scott 由 Maged M. Michael 和 Michael L. Scott 在 1996 年提出，在这种算法中，一个线程的失败或挂起不会导致其他线程也失败或挂起。

好，接下来一起来看一下 ConcurrentLinkedQueue 的源码实现。

## 节点类Node

先从它的节点类 Node 看起，好明白 ConcurrentLinkedQueue 的底层数据结构。Node 类的源码如下：

```java
private static class Node<E> {
        volatile E item;
        volatile Node<E> next;
		.......
}
```

Node 节点包含了两个字段：

- 一个是数据域 item
- 另一个是 next 指针，用于指向下一个节点从而构成链式队列。

两个字段都是用 [volatile](https://javabetter.cn/thread/volatile.html) 修饰的，以保证内存的可见性。

另外，ConcurrentLinkedQueue 还有这样两个成员变量：

```java
private transient volatile Node<E> head;
private transient volatile Node<E> tail;
```

![](https://cdn.tobebetterjavaer.com/stutymore/ConcurrentLinkedQueue-20230817191905.png)

说明 ConcurrentLinkedQueue 通过持有头尾两个引用来进行队列管理。当我们调用无参构造方法时，其源码如下：

```java
public ConcurrentLinkedQueue() {
    head = tail = new Node<E>(null);
}
```

head 和 tail 会指向同一个节点，此时 ConcurrentLinkedQueue 的状态如下图所示：

![ConcurrentLinkedQueue初始化状态](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/ConcurrentLinkedQueue-01.png)

head 和 tail 指向同一个节点 Node0，该节点的 item 字段为 null，next 字段也为 null。

在队列进行出队入队的时候，免不了要对节点进行操作，在多线程环境下就很容易出现线程安全问题。ConcurrentLinkedQueue 选择使用 [CAS](https://javabetter.cn/thread/cas.html) 来保证线程安全：

```java
//更改Node中的数据域item
boolean casItem(E cmp, E val) {
    return UNSAFE.compareAndSwapObject(this, itemOffset, cmp, val);
}
//更改Node中的指针域next
void lazySetNext(Node<E> val) {
    UNSAFE.putOrderedObject(this, nextOffset, val);
}
//更改Node中的指针域next
boolean casNext(Node<E> cmp, Node<E> val) {
    return UNSAFE.compareAndSwapObject(this, nextOffset, cmp, val);
}
```

可以看出，这些方法实际上调用的是 UNSAFE 的方法：

![](https://cdn.tobebetterjavaer.com/stutymore/ConcurrentLinkedQueue-20230817160523.png)

`sun.misc.Unsafe` 是 Java 内部的一个类，它提供了一组可以直接访问底层资源和操作内存的方法。这个类的功能非常强大，因为它允许程序绕过 Java 的访问控制和安全检查，直接执行底层操作。

Unsafe 允许分配、释放和访问本机内存，就像使用 C 语言中的 malloc 和 free 一样。我们在讲 [CAS](https://javabetter.cn/thread/cas.html) 的时候有详细讲过，相信大家都还有印象。

## offer方法

ConcurrentLinkedQueue 是一种先进先出（FIFO，First-In-First-Out）的队列，offer 方法用于在队列尾部插入一个元素。如果成功添加元素，则返回 true。下面是这个方法的一般定义：

```java
public boolean offer(E e)
```

来看这么一段代码：

```java
ConcurrentLinkedQueue<Integer> queue = new ConcurrentLinkedQueue<>();
queue.offer(1);
queue.offer(2);
```

我们创建一个 ConcurrentLinkedQueue 对象 queue，先 offer 1，再 offer 2。其中 offer 的源码如下：

```java
public boolean offer(E e) {
    checkNotNull(e);
    final Node<E> newNode = new Node<E>(e);

    for (Node<E> t = tail, p = t;;) {
        Node<E> q = p.next;
        if (q == null) {
            // p is last node
            if (p.casNext(null, newNode)) {
                // Successful CAS is the linearization point
                // for e to become an element of this queue,
                // and for newNode to become "live".
                if (p != t) // hop two nodes at a time
                    casTail(t, newNode);  // Failure is OK.
                return true;
            }
            // Lost CAS race to another thread; re-read next
        }
        else if (p == q)
            // We have fallen off list.  If tail is unchanged, it
            // will also be off-list, in which case we need to
            // jump to head, from which all live nodes are always
            // reachable.  Else the new tail is a better bet.
            p = (t != (t = tail)) ? t : head;
        else
            // Check for tail updates after two hops.
            p = (p != t && t != (t = tail)) ? t : q;
    }
}
```

1、参数检查：`checkNotNull(e)` 确保传递的元素不是 null。

2、新节点创建：`final Node<E> newNode = new Node<E>(e)` 创建一个新的节点来保存要添加的元素。

3、尾部节点循环：该循环用于找到队列的尾部节点，并将新节点安全地链接到尾部。

- a. 读取下一个节点：`Node<E> q = p.next` 读取当前节点的下一个节点。
- b. 尾部节点检查：如果 q 是 null，这意味着当前节点 p 是尾部节点。
- c. CAS操作添加新节点：`p.casNext(null, newNode)` 使用 CAS 操作将新节点链接到当前的尾部节点。如果成功，则更新尾部引用，并返回 true。
- d. 双跳尾部更新：`casTail(t, newNode)` 有时尝试更新尾部引用，使其指向新的尾部节点。这有助于其他线程更快地找到尾部。
- e. 掉出列表检查：如果 p == q，这意味着当前线程从列表上掉了下来。此时，代码尝试跳转到头部或新的尾部。
- f. 进一步检查：否则，代码进行进一步的检查并更新 p 的值，可能是当前的尾部或下一个节点。

我把代码注释去掉，并标上行号。

```java
public boolean offer(E e) {
1.    checkNotNull(e);
2.    final Node<E> newNode = new Node<E>(e);
3.    for (Node<E> t = tail, p = t;;) {
4.        Node<E> q = p.next;
5.        if (q == null) {
6.            // p is last node
7.            if (p.casNext(null, newNode)) {
8.                if (p != t)
9.                    casTail(t, newNode);
10.                return true;
            }
        }
11.        else if (p == q)
12.            p = (t != (t = tail)) ? t : head;
           else
13.            p = (p != t && t != (t = tail)) ? t : q;
    }
}
```

### 单线程执行角度分析

我们再从**单线程的角度**分析 offer 1 的过程。

第 1 行代码检查元素 e 是否为 null，为 null 就直接抛出空指针异常。

第 2 行代码将 e 包装成一个 Node 对象。

第 3 行为 for 循环，只有初始化条件没有循环结束条件，这很符合 [CAS](https://javabetter.cn/thread/cas.html) 的“套路”，在循环体内，如果 CAS 操作成功会直接 return 返回，如果 CAS 操作失败就在 for 循环中不断重试直至成功。这里实例变量 t 被初始化为 tail，p 被初始化为 t 即 tail。

**p 被认为是队列真正的尾节点，tail 不一定是真正的尾节点，因为在 ConcurrentLinkedQueue 中 tail 延迟更新的**。

代码走到第 3 行的时候，t 和 p 分别指向初始化时创建的 item（null），next 字段也为 null，即 Node0。

第 4 行变量 q 被赋值为 null。

第 5 行 if 判断结果为 true。

第 7 行使用 casNext 将插入的 Node 设置为当前队列尾节点 p 的 next 节点，如果 CAS 操作失败，此次循环结束，下次循环进行重试。

CAS 操作成功走到第 8 行，此时 p==t，if 判断为 false，直接 return true 返回。如果成功插入 1 的话，此时 ConcurrentLinkedQueue 的状态如下图所示：

![offer 1后队列的状态](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/ConcurrentLinkedQueue-02.png)

此时队列的尾节点应该是 Node1，而 tail 指向的节点依然是 Node0，因此可以说明 tail 是延迟更新的。

那么我们继续看 offer 2，很显然此时第 4 行 q 指向的节点不为 null 了，而是指向 Node1，第 5 行 if 判断为 false，第 11 行 if 判断为 false，代码会走到第 13 行。

好了，**再插入节点的时候我们来问自己这样一个问题：tail 并不是真正的尾节点，那么在插入节点的时候，我们是不是应该先找到当前的尾节点才能插入？**

第 13 行代码就是**找出队列真正的尾节点**。

```java
p = (p != t && t != (t = tail)) ? t : q;
```

这段代码在**单线程环境**执行时，由于 p==t，此时 p 会被赋值为 q，而 q 等于`Node<E> q = p.next`，即 Node1。

在第一次循环中，p 指向了队列真正的尾节点 Node1，那么在下一次循环中，第 4 行 q 指向的节点为 null，那么第 5 行 if 判断则为 true，第 7 行依然通过 casNext 设置 p 节点的 next 为当前新增的 Node，接下来走到第 8 行，这个时候 p!=t，第 8 行 if 判断为 true，会通过`casTail(t, newNode)`将当前节点 Node 设置为队列的尾节点，此时的队列的状态示意图如下图所示：

![队列offer 2后的状态](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/ConcurrentLinkedQueue-03.png)

**tail 指向的节点由 Node0 变为 Node2**，这里的 casTail 是不需要重试的，原因是，offer 主要是通过 p 的 next 节点 q（`Node<E> q = p.next`）决定后面的逻辑走向，casTail 失败时状态示意图如下：

![队列进行入队操作后casTail失败后的状态图](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/ConcurrentLinkedQueue-04.png)

**如果 casTail 更新 tail 失败，即 tail 还是指向 Node0 节点，无非就是多循环几次，通过第 13 行代码定位到尾节点**。

通过单线程执行角度的分析，我们可以了解到 offer 的执行逻辑为：

1. **如果 tail 节点的下一个节点（next 字段）为 null 的话，说明 tail 节点即为队列真正的尾节点，因此可以通过 casNext 插入当前待插入的节点，但此时 tail 并未变化**

2. **如果 tail 节点的下一个节点（next 字段）不为 null 的话，说明 tail 节点不是队列的真正尾节点。通过`q（Node<E> q = p.next）`往前找到尾节点，然后通过 casNext 插入当前待插入的节点，并通过 casTail 方式更新 tail**。

在单线程环境下，`p = (p != t && t != (t = tail)) ? t : q;`这行代码永远不会将 p 赋值为 t，我们试着在**多线程**的环境下继续分析。

### 多线程执行角度分析

在**多线程环境**下，`p = (p != t && t != (t = tail)) ? t : q;` 这行代码就有意思了。 

由于 `t != (t = tail)` 这个操作**并非一个原子操作**，所以就有这样一种情况：

![线程A和线程B有可能的执行时序](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/ConcurrentLinkedQueue-05.png)

假设线程 A 此时读取了变量 t，线程 B 刚好在这个时候 offer 一个 Node，此时会修改 tail，那么线程 A 再次执行 t=tail 时，t 会指向另外一个节点，很显然线程 A 前后两次读取的变量 t 指向的节点不同，即`t != (t = tail)`为 true，并且由于 t 节点的变化，`p != t`也为 true，此时该行代码的执行结果是：p 和 t 都指向了同一个节点，并且 t 也是队列真正的尾节点。也就是说，现在已经定位到队列真正的尾节点，可以执行 offer 操作了。

到此为止，还剩下第 11 行的代码没有分析，大家应该可以猜到这种情况：**一部分线程 offer，一部分线程 poll**（下面会讲，用于检索并删除队列的头部元素，和 offer 是相对的）。

当`if (p == q)`为 true 时，说明 p 节点的 next 也指向它自己，这种节点称之为**哨兵节点**，**这种节点在队列中存在的价值不大，一般表示要删除的节点或者空节点**。为了能够更好地理解这种情况，我们先看看 poll 方法的执行过程，再回过头来看，总之这是一个很有意思的事情。

## poll方法

poll 方法的源码如下：

```java
public E poll() {
    restartFromHead:
    for (;;) {
        for (Node<E> h = head, p = h, q;;) {
            E item = p.item;

            if (item != null && p.casItem(item, null)) {
                // Successful CAS is the linearization point
                // for item to be removed from this queue.
                if (p != h) // hop two nodes at a time
                    updateHead(h, ((q = p.next) != null) ? q : p);
                return item;
            }
            else if ((q = p.next) == null) {
                updateHead(h, p);
                return null;
            }
            else if (p == q)
                continue restartFromHead;
            else
                p = q;
        }
    }
}
```

1、无限循环：外部的无限循环是为了确保在高并发环境中能够正确地从队列的头部移除元素。

2、初始化引用：对于当前头节点h和节点p（开始时与头节点相同）的初始化。

3、读取当前节点的项：`E item = p.item` 读取当前节点的元素。

4、检查当前项是否不为null：

- 如果是，并且CAS操作成功将该项设置为null（即`p.casItem(item, null)`），则表示元素已成功移除。
- 如果当前节点不是头节点（p != h），则更新头引用以"跳过"两个节点。
- 返回被移除的元素。

5、检查是否到达队尾：

- 如果q = p.next是null，则表示已到达队列的尾部。更新头引用，并返回null表示队列为空。
- 如果p == q，则表示可能有并发修改造成的异常情况，通过continue restartFromHead跳回外部循环的开始，重新尝试。

6、移动到下一个节点：将p设置为q，即下一个节点，并继续循环。

### 单线程执行角度分析

为了便于分析，我把代码注释删掉了，并标上行号。

```java
public E poll() {
    restartFromHead:
    1. for (;;) {
    2.    for (Node<E> h = head, p = h, q;;) {
    3.        E item = p.item;
    4.        if (item != null && p.casItem(item, null)) {
    5.            if (p != h) // hop two nodes at a time
    6.                updateHead(h, ((q = p.next) != null) ? q : p);
    7.            return item;
            }
    8.        else if ((q = p.next) == null) {
    9.            updateHead(h, p);
    10.            return null;
            }
    11.        else if (p == q)
    12.            continue restartFromHead;
            else
    13.            p = q;
        }
    }
}
```

假设 ConcurrentLinkedQueue 初始状态如下图所示：

![队列初始状态](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/ConcurrentLinkedQueue-06.png)

参数 offer 时的定义，我们将**变量 p 作为要删除的头节点，h（head）并不一定是队列的头节点**。

先来看 poll 出 Node1 时的情况，由于`p=h=head`，很显然此时 p 指向的 Node1 的数据不为 null，第 4 行代码`item!=null` 的判断为 true，接下来通过`casItem`将 Node1 的数据设置为 null。

如果 CAS 失败则此次循环结束，等待下一次循环进行重试。

若第 4 行执行成功进入到第 5 行代码，此时 p 和 h 都指向 Node1，第 5 行 if 判断为 false，然后直接到第 7 行 return 回 Node1 的数据域 1，方法结束，此时的队列状态如下图所示。

![队列出队操作后的状态](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/ConcurrentLinkedQueue-07.png)

继续从队列中 poll，很显然当前 h 和 p 指向的 Node1 的数据为 null，那么第一件事就是要**定位准备删除的头节点（找到数据不为 null 的节点）**。

继续看，第三行代码 item 为 null，第 4 行代码 if 判断为 false，走到第 8 行代码（`q = p.next`），if 也为 false，由于 q 指向了 Node2，第 11 行的 if 判断也为 false，因此代码走到了第 13 行，这个时候 p 和 q 共同指向了 Node2，也就找到了要删除的真正的头节点。

定位待删除的头节点的过程为：**如果当前节点的数据为 null，很显然该节点不是待删除的节点，就用当前节点的下一个节点去试探**。经过第一次循环后，此时状态图为下图所示：

![经过一次循环后的状态](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/ConcurrentLinkedQueue-08.png)

进行下一次循环，第 4 行的操作同上所述，假设第 4 行中 casItem 设置成功，由于 p 已经指向了 Node2，而 h 依旧指向 Node1，此时第 5 行的 if 判断为 true，然后执行`updateHead(h, ((q = p.next) != null) ? q : p)`，此时 q 指向 Node3，updateHead 方法的源码如下：

```java
final void updateHead(Node<E> h, Node<E> p) {
    if (h != p && casHead(h, p))
        h.lazySetNext(h);
}
```

该方法主要通过`casHead`将队列的 head 指向 Node3，并且通过 `h.lazySetNext`将 Node1 的 next 指向它自己。最后在第 7 行代码返回 Node2 的值。此时队列的状态如下图所示：

![Node2从队列中出队后的状态](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/ConcurrentLinkedQueue-09.png)

Node1 的 next 指向它自己，head 指向了 Node3。

如果队列为空的话，就会执行到第 8 行`(q = p.next) == null`，if 判断为 true，因此在第 10 行中直接返回 null。

来做个总结：

1. **如果当前 head、h 和 p 指向的节点 Item 不为 null，说明该节点为真正的头节点（待删除节点），只需要通过 casItem 方法将 item 设置为 null，然后将原来的 item 返回即可。**

2. **如果当前 head、h 和 p 指向的节点 item 为 null 的话，说明该节点不是真正待删除的节点，那么应该继续寻找 item 不为 null 的节点。通过让 q 指向 p 的下一个节点（q = p.next）进行试探，若找到则通过 updateHead 方法更新 head 节点以及构造哨兵节点（`通过updateHead方法的h.lazySetNext(h)`）**。


### 多线程执行情况分析

现在回过头来看 poll 方法的源码，有这样一部分：

```java
else if (p == q)
    continue restartFromHead;
```

这部分就是用来处理多个线程 poll 的，`q = p.next`，也就是说 q 永远指向的是 p 的下一个节点，那什么情况下 p 和 q 会指向同一个节点呢？

根据前面的分析，只有 p 指向的节点在 poll 的时候变成了**哨兵节点**（通过 updateHead 方法中的 h.lazySetNext）。

当线程 A 在判断`p==q`时，线程 B 已经执行完 poll 方法，将 p 节点转换为**哨兵节点**，并且 head 节点已经发生了改变，所以就需要从 restartFromHead 处执行，保证用到的是最新的 head。

试想，还有这样一种情况。如果当前队列为空队列，线程 A 进行 poll 操作，同时线程 B 执行 offer，然后线程 A 再执行 poll，那么此时线程 A 返回的是 null 还是线程 B 刚插入的那个节点呢？我们来写一段 demo：

```java
public static void main(String[] args) {
    Thread thread1 = new Thread(() -> {
        Integer value = queue.poll();
        System.out.println(Thread.currentThread().getName() + " poll 的值为：" + value);
        System.out.println("queue当前是否为空队列：" + queue.isEmpty());
    });
    thread1.start();
    Thread thread2 = new Thread(() -> {
        queue.offer(1);
    });
    thread2.start();
}
```

输出结果为：

```
Thread-0 poll 的值为：null
queue当前是否为空队列：false
```

thread1 先执行到第 8 行代码`if ((q = p.next) == null)`，由于队列为空 if 判断为 true，进入 if 块，此时让 thread1 暂停，然后 thread2 进行 offer 插入值为 1 节点，thread2 执行结束。再让 thread1 执行，这时**thread1 并没有进行重试**，而是继续往下走，返回 null，尽管此时队列由于 thread2 已经插入了值为 1 的新节点。

输出结果为 `thread0 poll 的为 null`，并且队列不为空。

因此，**在判断队列是否为空的时候，不能通过 poll 返回 null 进行判断，要通过 isEmpty 进行判断**。

## 部分线程 offer 部分线程 poll

在分析 offer 方法的时候我们留了一个问题，即对 offer 方法中第 11 行代码的理解。

> **offer->poll->offer**

前面我们提到，offer 方法的第 11 行代码 `if (p == q)`，能够让 if 条件为 true 的情况只有 p 节点为**哨兵节点**，什么时候会有哨兵节点呢？

在 poll 方法的分析中，我们找到了答案，即**当 head 节点的 item 字段为 null 时会寻找真正的头节点，等到待插入的节点插入之后，会更新 head，并且将原 head 节点设置为哨兵节点。** 假设队列初始状态如下图所示：

![offer和poll相互影响分析时队列初始状态.png](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/ConcurrentLinkedQueue-10.png)

因此在线程 A 执行 offer 时，线程 B 执行 poll 会存在如下一种情况：

![线程A和线程B可能存在的执行时序](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/ConcurrentLinkedQueue-11.png)

线程 A 的 tail 节点存在 next 节点 Node1，因此会通过 q 往前寻找队列真正的尾节点，当执行到 `if (p == q)` 时，线程 B 执行 poll 操作，对线程 B 来说，head 和 p 指向 Node0，由于 Node0 的 item 字段为 null，同样会往前找队列的真正头节点 Node1，在线程 B 执行完 poll 后，Node0 就会转换为**哨兵节点**，也就意味着队列的 head 发生了改变，此时队列状态为下图所示。

![线程B进行poll后队列的状态图](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/ConcurrentLinkedQueue-12.png)

线程 A 执行判断 `if (p == q)` 为 true，继续执行 `p = (t != (t = tail)) ? t : head;`，由于 tail 没有发生改变，所以 p 被赋值为 head，重新从 head 开始完成插入操作。

## 延迟更新策略

通过上面对 offer 和 poll 方法的分析，我们发现 tail 和 head 是延迟更新的，两者更新的触发时机为：

**tail 更新的触发时机**：当 tail 节点的下一个节点不为 null 的时候，会执行定位队列真正尾节点的操作，找到尾节点后完成插入，之后才会通过 casTail 进行 tail 更新；当 tail 节点的下一个节点为 null 的时候，只插入节点不更新 tail。

**head 更新的触发时机**：当 head 节点的 item 为 null 的时候，会执行定位队列真正头节点的操作，找到头节点后完成删除，之后才会通过 updateHead 进行 head 更新；当 head 节点的 item 不为 null 的时候，只删除节点不更新 head。

注意，源码中有这样一段注释：**hop two nodes at a time**。

所以这种延迟更新的策略叫做 HOPS，大概原因是这个（猜的），从上面更新时的状态图可以看出，head 和 tail 的更新是“跳着的”，即中间总是隔了一个。这样设计的意图是什么呢？

如果让 tail 永远作为尾节点，实现的代码量会更少，而且逻辑更易懂。

但是，这样做有一个缺点，**如果有大量的入队操作，每次都要执行 CAS 进行 tail 的更新，汇总起来对性能也是非常大的损耗。如果能减少 CAS 更新操作，就可以大大提升入队的操作效率，所以 doug lea 大师每间隔 1 次（tail 和队尾节点的距离为 1）才利用 CAS 更新 tail。**

对 head 的更新也是同样的道理，虽然这样设计会多出在循环中定位尾节点的操作，但总体来说，读的操作效率要远远高于写的效率，因此，多出来的定位尾节点的性能损耗相对就很小了。

## 使用示例

```java
public class ConcurrentLinkedQueueTest {
    public static void main(String[] args) {
        ConcurrentLinkedQueue<Integer> queue = new ConcurrentLinkedQueue<>();
        queue.offer(1);
        queue.offer(2);
        queue.offer(3);
        queue.offer(4);
        queue.offer(5);
        System.out.println("queue当前是否为空队列：" + queue.isEmpty());
        System.out.poll();
        System.out.println("queue当前是否为空队列：" + queue.isEmpty());
        System.out.println("queue当前的大小为：" + queue.size());
    }
}
```

输出结果为：

```
queue当前是否为空队列：false
queue当前是否为空队列：false
queue当前的大小为：4
```



## 小结

ConcurrentLinkedQueue 是一种先进先出（FIFO，First-In-First-Out）的队列，它是一个基于链接节点的无界线程安全队列。该队列的元素遵循先进先出的原则。头是最先加入的，尾是最近加入的。该队列不允许 null 元素。

ConcurrentLinkedQueue 采用了 HOPS 的设计，即 head 和 tail 是延迟更新的，这种设计的主要目的是减小多线程环境下的争用，并提高性能。

ConcurrentLinkedQueue 的 offer 方法用于在队列尾部插入一个元素。如果成功添加元素，则返回 true。

ConcurrentLinkedQueue 的 poll 方法用于检索并删除队列的头部元素。如果队列为空，则返回 null。

ConcurrentLinkedQueue 的 isEmpty 方法用于检索队列是否为空。

ConcurrentLinkedQueue 的 size 方法用于返回队列的大小。


> 编辑：沉默王二，部分内容来自于CL0610的 GitHub 仓库[https://github.com/CL0610/Java-concurrency](https://github.com/CL0610/Java-concurrency/blob/master/15.%E5%B9%B6%E5%8F%91%E5%AE%B9%E5%99%A8%E4%B9%8BConcurrentLinkedQueue/%E5%B9%B6%E5%8F%91%E5%AE%B9%E5%99%A8%E4%B9%8BConcurrentLinkedQueue.md)。

---

GitHub 上标星 9300+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第二份 PDF 《[并发编程小册](https://javabetter.cn/thread/)》终于来了！包括线程的基本概念和使用方法、Java的内存模型、sychronized、volatile、CAS、AQS、ReentrantLock、线程池、并发容器、ThreadLocal、生产者消费者模型等面试和开发必须掌握的内容，共计 15 万余字，200+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，二哥的并发编程进阶之路.pdf](https://javabetter.cn/thread/)

[加入二哥的编程星球](https://javabetter.cn/thread/)，在星球的第二个置顶帖「[知识图谱](https://javabetter.cn/thread/)」里就可以获取 PDF 版本。

![](https://cdn.tobebetterjavaer.com/stutymore/wangzhe-thread-20230904125125.png)
