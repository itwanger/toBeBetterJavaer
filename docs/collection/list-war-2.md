---
title: ArrayList和LinkedList的区别：如何选择？
shortTitle: ArrayList和LinkedList的区别
category:
  - Java核心
tag:
  - 集合框架（容器）
description: 本文详细比较了 ArrayList 和 LinkedList 的特性、性能差异以及适用场景。阅读本文，您将更好地理解两者的优劣，从而在实际编程中做出更明智的集合类选择，提高程序性能。
head:
  - - meta
    - name: keywords
      content: Java,LinkedList,ArrayList,java arraylist linkedlist, arraylist linkedlist
---

# 6.5 ArrayList和LinkedList的区别

“终于，二哥，我们要聊 [LinkedList](https://javabetter.cn/collection/linkedlist.html) 和 [ArrayList](https://javabetter.cn/collection/arraylist.html) 之间的差别了，我期待了很久。”三妹嘟囔着说。

“其实经过前面两节的分析，差别已经很清晰了。”我喃喃道。

“哥，你再说点吧，深挖一下，OK？”

“好吧，那就让我们出发吧！”

>PS：为了和前面两节的源码做适当的区分，这里采用的是 Java 11 的源码，请务必注意。但整体上差别很小。

### 01、ArrayList 是如何实现的？

ArrayList 实现了 List 接口，继承了 AbstractList 抽象类。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/list-war-2-01.png)

底层是基于数组实现的，并且实现了动态扩容（当需要添加新元素时，如果 elementData 数组已满，则会自动扩容，新的容量将是原来的 1.5 倍），来看一下 ArrayList 的部分源码。

```java
public class ArrayList<E> extends AbstractList<E>
        implements List<E>, RandomAccess, Cloneable, java.io.Serializable
{
    private static final int DEFAULT_CAPACITY = 10; // 默认容量为 10
    transient Object[] elementData; // 存储元素的数组，数组类型为 Object
    private int size; // 列表的大小，即列表中元素的个数
}
```

ArrayList 还实现了 RandomAccess 接口，这是一个标记接口：

```java
public interface RandomAccess {
}
```

内部是空的，标记“实现了这个接口的类支持快速（通常是固定时间）随机访问”。快速随机访问是什么意思呢？就是说不需要遍历，就可以通过下标（索引）直接访问到内存地址。而 LinkedList 没有实现该接口，表示它不支持高效的随机访问，需要通过遍历来访问元素。

```java
/**
 * 返回列表中指定位置的元素。
 *
 * @param index 要返回的元素的索引
 * @return 列表中指定位置的元素
 * @throws IndexOutOfBoundsException 如果索引越界（index < 0 || index >= size()）
 */
public E get(int index) {
    Objects.checkIndex(index, size); // 检查索引是否越界
    return elementData(index); // 调用 elementData 方法获取元素
}

/**
 * 返回列表中指定位置的元素。
 * 注意：该方法并没有检查索引是否越界，调用该方法前需要先检查索引是否越界。
 *
 * @param index 要返回的元素的索引
 * @return 列表中指定位置的元素
 */
E elementData(int index) {
    return (E) elementData[index]; // 强制类型转换，将 Object 类型转换为 E 类型
}
```

ArrayList 还实现了 Cloneable 接口，这表明 ArrayList 是支持[拷贝](https://javabetter.cn/basic-extra-meal/deep-copy.html)的。ArrayList 内部的确也重写了 Object 类的 `clone()` 方法。

```java
/**
 * 返回该列表的浅表副本。
 * （元素本身不会被复制。）
 *
 * @return 该列表的副本
 */
public Object clone() {
    try {
        ArrayList<?> v = (ArrayList<?>) super.clone(); // 调用 Object 类的 clone 方法，得到一个浅表副本
        v.elementData = Arrays.copyOf(elementData, size); // 复制 elementData 数组，创建一个新数组作为副本
        v.modCount = 0; // 将 modCount 置为 0
        return v; // 返回副本
    } catch (CloneNotSupportedException e) {
        // this shouldn't happen, since we are Cloneable
        throw new InternalError(e);
    }
}
```

ArrayList 还实现了 [Serializable](https://javabetter.cn/io/Serializbale.html) 接口，同样是一个标记接口：

```java
public interface Serializable {
}
```

内部也是空的，标记“实现了这个接口的类支持序列化”。序列化是什么意思呢？Java 的序列化是指，将对象转换成以字节序列的形式来表示，这些字节序中包含了对象的字段和方法。序列化后的对象可以被写到数据库、写到文件，也可用于网络传输。

眼睛雪亮的小伙伴可能会注意到，ArrayList 中的关键字段 elementData 使用了 [transient 关键字](https://javabetter.cn/io/transient.html)修饰，这个关键字的作用是，让它修饰的字段不被序列化。

这不前后矛盾吗？一个类既然实现了 Serilizable 接口，肯定是想要被序列化的，对吧？那为什么保存关键数据的 elementData 又不想被序列化呢?

这还得从 “ArrayList 是基于数组实现的”开始说起。大家都知道，数组是定长的，就是说，数组一旦声明了，长度（容量）就是固定的，不能像某些东西一样伸缩自如。这就很麻烦，数组一旦装满了，就不能添加新的元素进来了。

ArrayList 不想像数组这样活着，它想能屈能伸，所以它实现了动态扩容。一旦在添加元素的时候，发现容量用满了 `s == elementData.length`，就按照原来数组的 1.5 倍（`oldCapacity >> 1`）进行扩容。扩容之后，再将原有的数组复制到新分配的内存地址上 `Arrays.copyOf(elementData, newCapacity)`。

这部分源码我们在之前讲 [ArrayList](https://javabetter.cn/collection/arraylist.html) 的时候就已经讲的很清楚了，这里就一笔带过。

动态扩容意味着什么？

意味着数组的实际大小可能永远无法被填满的，总有多余出来空置的内存空间。

比如说，默认的数组大小是 10，当添加第 11 个元素的时候，数组的长度扩容了 1.5 倍，也就是 15，意味着还有 4 个内存空间是闲置的，对吧？

序列化的时候，如果把整个数组都序列化的话，是不是就多序列化了 4 个内存空间。当存储的元素数量非常非常多的时候，闲置的空间就非常非常大，序列化耗费的时间就会非常非常多。

于是，ArrayList 做了一个愉快而又聪明的决定，内部提供了两个私有方法 writeObject 和 readObject 来完成序列化和反序列化。

```java
/**
 * 将此列表实例的状态序列写入指定的 ObjectOutputStream。
 * （即，保存这个列表实例到一个流中。）
 *
 * @param s 要写入的流
 * @throws java.io.IOException 如果写入流时发生异常
 */
private void writeObject(java.io.ObjectOutputStream s)
        throws java.io.IOException {
    s.defaultWriteObject(); // 写出对象的默认字段

    // Write out size as capacity for behavioral compatibility with clone()
    s.writeInt(size); // 写出 size

    // Write out all elements in the proper order.
    for (int i=0; i<size; i++) {
        s.writeObject(elementData[i]); // 依次写出 elementData 数组中的元素
    }
}
```

从 writeObject 方法的源码中可以看得出，它使用了 ArrayList 的实际大小 size 而不是数组的长度（`elementData.length`）来作为元素的上限进行序列化。

此处应该有掌声啊！不是为我，为 Java 源码的作者们，他们真的是太厉害了，可以用两个词来形容他们——殚精竭虑、精益求精。

666

这是readObject方法的源码：

```java
/**
 * 从指定的 ObjectInputStream 中读取此列表实例的状态序列。
 * （即，从流中恢复这个列表实例。）
 *
 * @param s 从中读取此列表实例的状态序列的流
 * @throws java.io.IOException 如果读取流时发生异常
 * @throws ClassNotFoundException 如果在读取流时找不到类
 */
private void readObject(java.io.ObjectInputStream s)
        throws java.io.IOException, ClassNotFoundException {
    elementData = EMPTY_ELEMENTDATA; // 初始化 elementData 数组为空数组

    // 读取默认字段
    s.defaultReadObject();

    // 读取容量，这个值被忽略，因为在 ArrayList 中，容量和长度是两个不同的概念
    s.readInt();

    if (size > 0) {
        // 分配一个新的 elementData 数组，大小为 size
        ensureCapacityInternal(size);

        Object[] a = elementData;
        // 依次从输入流中读取元素，并将其存储在数组中
        for (int i=0; i<size; i++) {
            a[i] = s.readObject(); // 读取对象并存储在 elementData 数组中
        }
    }
}
```

### 02、LinkedList 是如何实现的？

LinkedList 是一个继承自 AbstractSequentialList 的双向链表，因此它也可以被当作堆栈、队列或双端队列进行操作。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/list-war-2-02.png)


来看一下部分源码：

```java
public class LinkedList<E>
    extends AbstractSequentialList<E>
    implements List<E>, Deque<E>, Cloneable, java.io.Serializable
{
    transient int size = 0; // 非序列化字段，表示链表中的节点个数
    transient Node<E> first; // 非序列化字段，指向链表中的第一个节点
    transient Node<E> last; // 非序列化字段，指向链表中的最后一个节点

    // ...
}
```

 LinkedList 内部定义了一个 Node 节点，它包含 3 个部分：元素内容 item，前引用 prev 和后引用 next。这个在讲 [LinkedList](https://javabetter.cn/collection/linkedlist.html) 的时候也讲过了，这里略过。

LinkedList 还实现了 Cloneable 接口，这表明 LinkedList 是支持拷贝的。

LinkedList 还实现了 Serializable 接口，这表明 LinkedList 是支持序列化的。眼睛雪亮的小伙伴可能又注意到了，LinkedList 中的关键字段 size、first、last 都使用了 transient 关键字修饰，这不又矛盾了吗？到底是想序列化还是不想序列化？

答案是 LinkedList 想按照自己的方式序列化，来看它自己实现的 `writeObject()` 方法：

```java
private void writeObject(java.io.ObjectOutputStream s)
        throws java.io.IOException {
    // 写入默认的序列化标记
    s.defaultWriteObject();

    // 写入链表的节点个数
    s.writeInt(size);

    // 按正确的顺序写入所有元素
    for (LinkedList.Node<E> x = first; x != null; x = x.next)
        s.writeObject(x.item);
}
```

发现没？LinkedList 在序列化的时候只保留了元素的内容 item，并没有保留元素的前后引用。这样就节省了不少内存空间，对吧？

那有些小伙伴可能就疑惑了，只保留元素内容，不保留前后引用，那反序列化的时候怎么办？

```java
private void readObject(java.io.ObjectInputStream s)
        throws java.io.IOException, ClassNotFoundException {
    // 读取默认的序列化标记
    s.defaultReadObject();

    // 读取链表的节点个数
    int size = s.readInt();

    // 按正确的顺序读取所有元素
    for (int i = 0; i < size; i++)
        linkLast((E)s.readObject()); // 读取元素并将其添加到链表末尾
}

void linkLast(E e) {
    final LinkedList.Node<E> l = last;
    final LinkedList.Node<E> newNode = new LinkedList.Node<>(l, e, null);
    last = newNode; // 将新节点作为链表尾节点
    if (l == null)
        first = newNode; // 如果链表为空，将新节点作为链表头节点
    else
        l.next = newNode; // 否则将新节点链接到链表尾部
    size++; // 增加节点个数
}
```

注意 for 循环中的 `linkLast()` 方法，它可以把链表重新链接起来，这样就恢复了链表序列化之前的顺序。很妙，对吧？

和 ArrayList 相比，LinkedList 没有实现 RandomAccess 接口，这是因为 LinkedList 存储数据的内存地址是不连续的，所以不支持随机访问。

### 03、新增元素时究竟谁快？

前面我们已经从多个维度了解了 ArrayList 和 LinkedList 的实现原理和各自的特点。那接下来，我们就来聊聊 ArrayList 和 LinkedList 在新增元素时究竟谁快？

#### **1）ArrayList**

ArrayList 新增元素有两种情况，一种是直接将元素添加到数组末尾，一种是将元素插入到指定位置。

添加到数组末尾的源码（这部分前面讲 [ArrayList](https://javabetter.cn/collection/arraylist.html) 的时候讲过了，这里再温故一下）：

```java
public boolean add(E e) {
    add(e, elementData, size);
    return true;
}

private void add(E e, Object[] elementData, int s) {
    if (s == elementData.length)
        elementData = grow(); // 扩容数组
    elementData[s] = e; // 将元素添加到数组末尾
    size = s + 1; // 增加元素个数
}
```

很简单，先判断是否需要扩容，然后直接通过索引将元素添加到末尾。

插入到指定位置的源码：

```java
public void add(int index, E element) {
    rangeCheckForAdd(index); // 检查插入位置是否越界
    final int s; // 当前元素个数
    Object[] elementData; // 元素数组
    if ((s = size) == (elementData = this.elementData).length) // 如果数组已满，则扩容
        elementData = grow();
    System.arraycopy(elementData, index,
            elementData, index + 1,
            s - index); // 将插入位置后的元素向右移动一位
    elementData[index] = element; // 将新元素插入到指定位置
    size = s + 1; // 增加元素个数
}
```

先检查插入的位置是否在合理的范围之内，然后判断是否需要扩容，再把该位置以后的元素复制到新添加元素的位置之后，最后通过索引将元素添加到指定的位置。

#### **2）LinkedList**

LinkedList 新增元素也有两种情况，一种是直接将元素添加到队尾，一种是将元素插入到指定位置。

添加到队尾的源码：

```java
public boolean add(E e) {
    linkLast(e); // 将元素添加到链表末尾
    return true;
}

void linkLast(E e) {
    final LinkedList.Node<E> l = last; // 获取链表的尾节点
    final LinkedList.Node<E> newNode = new LinkedList.Node<>(l, e, null); // 创建新节点
    last = newNode; // 将新节点作为链表的尾节点
    if (l == null)
        first = newNode; // 如果链表为空，则将新节点作为链表的头节点
    else
        l.next = newNode; // 否则将新节点链接到链表的尾部
    size++; // 增加节点个数
}
```

先将队尾的节点 last 存放到临时变量 l 中，然后生成新的 Node 节点，并赋给 last，如果 l  为 null，说明是第一次添加，所以 first 为新的节点；否则将新的节点赋给之前 last 的 next。

插入到指定位置的源码：

```java
public void add(int index, E element) {
    checkPositionIndex(index); // 检查插入位置是否越界

    if (index == size)
        linkLast(element); // 如果插入位置为链表末尾，则将元素添加到链表末尾
    else
        linkBefore(element, node(index)); // 否则将元素插入到指定位置的前面的节点后面
}

LinkedList.Node<E> node(int index) {
    if (index < (size >> 1)) { // 如果插入位置在链表前半部分，则从头节点开始查找
        LinkedList.Node<E> x = first;
        for (int i = 0; i < index; i++)
            x = x.next;
        return x;
    } else { // 否则从尾节点开始查找
        LinkedList.Node<E> x = last;
        for (int i = size - 1; i > index; i--)
            x = x.prev;
        return x;
    }
}

void linkBefore(E e, LinkedList.Node<E> succ) {
    final LinkedList.Node<E> pred = succ.prev; // 获取插入位置的前驱节点
    final LinkedList.Node<E> newNode = new LinkedList.Node<>(pred, e, succ); // 创建新节点
    succ.prev = newNode; // 将新节点链接到后继节点
    if (pred == null)
        first = newNode; // 如果前驱节点为空，则将新节点作为头节点
    else
        pred.next = newNode; // 否则将新节点链接到前驱节点
    size++; // 增加节点个数
}
```

先检查插入的位置是否在合理的范围之内，然后判断插入的位置是否是队尾，如果是，添加到队尾；否则执行 `linkBefore()` 方法。

在执行 `linkBefore()` 方法之前，会调用 `node()` 方法查找指定位置上的元素，这一步是需要遍历 LinkedList 的。如果插入的位置靠前前半段，就从队头开始往后找；否则从队尾往前找。也就是说，如果插入的位置越靠近 LinkedList 的中间位置，遍历所花费的时间就越多。

找到指定位置上的元素（参数succ）之后，就开始执行 `linkBefore()` 方法，先将 succ 的前一个节点（prev）存放到临时变量 pred 中，然后生成新的 Node 节点（newNode），并将 succ 的前一个节点变更为 newNode，如果 pred 为 null，说明插入的是队头，所以 first 为新节点；否则将 pred 的后一个节点变更为 newNode。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/list-war-2-03.png)

经过源码分析以后，你是不是在想：“好像 ArrayList 在新增元素的时候效率并不一定比 LinkedList 低啊！”

当两者的起始长度是一样的情况下：

- 如果是从集合的头部新增元素，ArrayList 花费的时间应该比 LinkedList 多，因为需要对头部以后的元素进行复制。

我们来测试一下：

```java
public class ArrayListTest {
    public static void addFromHeaderTest(int num) {
        ArrayList<String> list = new ArrayList<String>(num);
        int i = 0;

        long timeStart = System.currentTimeMillis();

        while (i < num) {
            list.add(0, i + "沉默王二");
            i++;
        }
        long timeEnd = System.currentTimeMillis();

        System.out.println("ArrayList从集合头部位置新增元素花费的时间" + (timeEnd - timeStart));
    }
}

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class LinkedListTest {
    public static void addFromHeaderTest(int num) {
        LinkedList<String> list = new LinkedList<String>();
        int i = 0;
        long timeStart = System.currentTimeMillis();
        while (i < num) {
            list.addFirst(i + "沉默王二");
            i++;
        }
        long timeEnd = System.currentTimeMillis();

        System.out.println("LinkedList从集合头部位置新增元素花费的时间" + (timeEnd - timeStart));
    }
}
```

num 为 10000，代码实测后的时间如下所示：

```
ArrayList从集合头部位置新增元素花费的时间595
LinkedList从集合头部位置新增元素花费的时间15
```

此时，ArrayList 花费的时间比 LinkedList 要多很多。

- 如果是从集合的中间位置新增元素，ArrayList 花费的时间搞不好要比 LinkedList 少，因为 LinkedList 需要遍历。

来看测试代码。

```java
public class ArrayListTest {
    public static void addFromMidTest(int num) {
        ArrayList<String> list = new ArrayList<String>(num);
        int i = 0;

        long timeStart = System.currentTimeMillis();
        while (i < num) {
            int temp = list.size();
            list.add(temp / 2, i + "沉默王二");
            i++;
        }
        long timeEnd = System.currentTimeMillis();

        System.out.println("ArrayList从集合中间位置新增元素花费的时间" + (timeEnd - timeStart));
    }
}

public class LinkedListTest {
    public static void addFromMidTest(int num) {
        LinkedList<String> list = new LinkedList<String>();
        int i = 0;
        long timeStart = System.currentTimeMillis();
        while (i < num) {
            int temp = list.size();
            list.add(temp / 2, i + "沉默王二");
            i++;
        }
        long timeEnd = System.currentTimeMillis();

        System.out.println("LinkedList从集合中间位置新增元素花费的时间" + (timeEnd - timeStart));
    }
}
```

num 为 10000，代码实测后的时间如下所示：

```
ArrayList从集合中间位置新增元素花费的时间16
LinkedList从集合中间位置新增元素花费的时间114
```

ArrayList 花费的时间比 LinkedList 要少很多很多。

- 如果是从集合的尾部新增元素，ArrayList 花费的时间应该比 LinkedList 少，因为数组是一段连续的内存空间，也不需要复制数组；而链表需要创建新的对象，前后引用也要重新排列。

来看测试代码：

```java
public class ArrayListTest {
    public static void addFromTailTest(int num) {
        ArrayList<String> list = new ArrayList<String>(num);
        int i = 0;

        long timeStart = System.currentTimeMillis();

        while (i < num) {
            list.add(i + "沉默王二");
            i++;
        }

        long timeEnd = System.currentTimeMillis();

        System.out.println("ArrayList从集合尾部位置新增元素花费的时间" + (timeEnd - timeStart));
    }
}

public class LinkedListTest {
    public static void addFromTailTest(int num) {
        LinkedList<String> list = new LinkedList<String>();
        int i = 0;
        long timeStart = System.currentTimeMillis();
        while (i < num) {
            list.add(i + "沉默王二");
            i++;
        }
        long timeEnd = System.currentTimeMillis();

        System.out.println("LinkedList从集合尾部位置新增元素花费的时间" + (timeEnd - timeStart));
    }
}
```

num 为 10000，代码实测后的时间如下所示：

```
ArrayList从集合尾部位置新增元素花费的时间69
LinkedList从集合尾部位置新增元素花费的时间193
```

ArrayList 花费的时间比 LinkedList 要少一些。

这样的结论和预期的是不是不太相符？ArrayList 在添加元素的时候如果不涉及到扩容，性能在两种情况下（中间位置新增元素、尾部新增元素）比 LinkedList 好很多，只有头部新增元素的时候比 LinkedList 差，因为数组复制的原因。

当然了，如果涉及到数组扩容的话，ArrayList 的性能就没那么可观了，因为扩容的时候也要复制数组。

### 04、删除元素时究竟谁快？

#### **1）ArrayList**

ArrayList 删除元素的时候，有两种方式，一种是直接删除元素（`remove(Object)`），需要直先遍历数组，找到元素对应的索引；一种是按照索引删除元素（`remove(int)`）。

来看一下源码（其实前面也讲过了，这里温习一下）：

```java
public boolean remove(Object o) {
    final Object[] es = elementData; // 获取数组元素
    final int size = this.size; // 获取数组大小
    int i = 0;
    found: {
        if (o == null) {
            for (; i < size; i++)
                if (es[i] == null)
                    break found;
        } else {
            for (; i < size; i++)
                if (o.equals(es[i]))
                    break found;
        }
        return false;
    }
    fastRemove(es, i); // 调用 fastRemove 方法快速移除元素
    return true;
}

public E remove(int index) {
    Objects.checkIndex(index, size); // 检查索引是否越界
    final Object[] es = elementData; // 获取数组元素

    oldValue = (E) es[index]; // 获取要删除的元素
    fastRemove(es, index); // 调用 fastRemove 方法快速移除元素

    return oldValue; // 返回被删除的元素
}
```

本质上讲，两个方法是一样的，它们最后调用的都是 `fastRemove(Object, int)` 方法。

```java
private void fastRemove(Object[] es, int i) {
    final int newSize;
    if ((newSize = size - 1) > i) // 如果要删除的不是最后一个元素
        System.arraycopy(es, i + 1, es, i, newSize - i); // 将要删除元素后面的元素向前移动一位
    es[size = newSize] = null; // 将最后一个元素置为 null，帮助垃圾回收
}
```

从源码可以看得出，只要删除的不是最后一个元素，都需要重新移动数组。删除的元素位置越靠前，代价就越大。

#### **2）LinkedList**

LinkedList 删除元素的时候，有四种常用的方式：

- `remove(int)`，删除指定位置上的元素

```java
public E remove(int index) {
    checkElementIndex(index);
    return unlink(node(index));
}
```

先检查索引，再调用 `node(int)` 方法（ 前后半段遍历，和新增元素操作一样）找到节点 Node，然后调用 `unlink(Node)` 解除节点的前后引用，同时更新前节点的后引用和后节点的前引用：

```java
E unlink(Node<E> x) {
    final E element = x.item; // 获取要删除的节点的元素
    final Node<E> next = x.next; // 获取要删除的节点的后继节点
    final Node<E> prev = x.prev; // 获取要删除的节点的前驱节点

    if (prev == null) { // 如果要删除的节点是第一个节点
        first = next; // 将头节点更新为要删除的节点的后继节点
    } else {
        prev.next = next; // 将要删除的节点的前驱节点的后继节点指向要删除的节点的后继节点
        x.prev = null; // 将要删除的节点的前驱节点置为 null，帮助垃圾回收
    }

    if (next == null) { // 如果要删除的节点是最后一个节点
        last = prev; // 将尾节点更新为要删除的节点的前驱节点
    } else {
        next.prev = prev; // 将要删除的节点的后继节点的前驱节点指向要删除的节点的前驱节点
        x.next = null; // 将要删除的节点的后继节点置为 null，帮助垃圾回收
    }

    x.item = null; // 将要删除的节点的元素置为 null，帮助垃圾回收
    size--; // 将链表的长度减一
    return element; // 返回被删除的元素
}
```

- `remove(Object)`，直接删除元素

```java
public boolean remove(Object o) {
    if (o == null) { // 如果要删除的元素为 null
        for (LinkedList.Node<E> x = first; x != null; x = x.next) {
            if (x.item == null) { // 如果找到了要删除的节点
                unlink(x); // 调用 unlink 方法删除指定节点
                return true; // 返回删除成功
            }
        }
    } else {
        for (LinkedList.Node<E> x = first; x != null; x = x.next) {
            if (o.equals(x.item)) { // 如果找到了要删除的节点
                unlink(x); // 调用 unlink 方法删除指定节点
                return true; // 返回删除成功
            }
        }
    }
    return false; // 没有找到要删除的节点，返回删除失败
}
```

也是先前后半段遍历，找到要删除的元素后调用 `unlink(Node)`。

- `removeFirst()`，删除第一个节点

```java
public E removeFirst() {
    final LinkedList.Node<E> f = first;
    if (f == null)
        throw new NoSuchElementException();
    return unlinkFirst(f);
}

private E unlinkFirst(LinkedList.Node<E> f) {
    final E element = f.item; // 获取要删除的节点的元素
    final LinkedList.Node<E> next = f.next; // 获取要删除的节点的后继节点
    f.item = null; // 将要删除的节点的元素置为 null，帮助垃圾回收
    f.next = null; // 将要删除的节点的后继节点置为 null，帮助垃圾回收
    first = next; // 将头节点更新为要删除的节点的后继节点
    if (next == null) // 如果链表已经为空
        last = null; // 将尾节点置为 null
    else
        next.prev = null; // 将要删除的节点的后继节点的前驱节点置为 null，帮助垃圾回收
    size--; // 将链表的长度减一
    return element; // 返回被删除的元素
}
```

删除第一个节点就不需要遍历了，只需要把第二个节点更新为第一个节点即可。

- `removeLast()`，删除最后一个节点

删除最后一个节点和删除第一个节点类似，只需要把倒数第二个节点更新为最后一个节点即可。

可以看得出，LinkedList 在删除比较靠前和比较靠后的元素时，非常高效，但如果删除的是中间位置的元素，效率就比较低了。

这里就不再做代码测试了，感兴趣的话可以自己试试，结果和新增元素保持一致：

- 从集合头部删除元素时，ArrayList 花费的时间比 LinkedList 多很多；
- 从集合中间位置删除元素时，ArrayList 花费的时间比 LinkedList 少很多；
- 从集合尾部删除元素时，ArrayList 花费的时间比 LinkedList 少一点。

我本地的统计结果如下所示，可以作为参考：

```
ArrayList从集合头部位置删除元素花费的时间380
LinkedList从集合头部位置删除元素花费的时间4
ArrayList从集合中间位置删除元素花费的时间381
LinkedList从集合中间位置删除元素花费的时间5922
ArrayList从集合尾部位置删除元素花费的时间8
LinkedList从集合尾部位置删除元素花费的时间12
```

### 05、遍历元素时究竟谁快？

#### **1）ArrayList**

遍历 ArrayList 找到某个元素的话，通常有两种形式：

- `get(int)`，根据索引找元素

```java
public E get(int index) {
    Objects.checkIndex(index, size);
    return elementData(index);
}
```

由于 ArrayList 是由数组实现的，所以根据索引找元素非常的快，一步到位。

- `indexOf(Object)`，根据元素找索引

```java
public int indexOf(Object o) {
    return indexOfRange(o, 0, size);
}

int indexOfRange(Object o, int start, int end) {
    Object[] es = elementData; // 获取 ArrayList 中的元素数组
    if (o == null) { // 如果要查找的元素为 null
        for (int i = start; i < end; i++) {
            if (es[i] == null) { // 如果找到了要查找的元素
                return i; // 返回元素在 ArrayList 中的索引
            }
        }
    } else {
        for (int i = start; i < end; i++) {
            if (o.equals(es[i])) { // 如果找到了要查找的元素
                return i; // 返回元素在 ArrayList 中的索引
            }
        }
    }
    return -1; // 没有找到要查找的元素，返回 -1
}
```

根据元素找索引的话，就需要遍历整个数组了，从头到尾依次找。


#### **2）LinkedList**

遍历 LinkedList 找到某个元素的话，通常也有两种形式：

- `get(int)`，找指定位置上的元素

```java
public E get(int index) {
    checkElementIndex(index);
    return node(index).item;
}
```

既然需要调用 `node(int)` 方法，就意味着需要前后半段遍历了。

- `indexOf(Object)`，找元素所在的位置

```java
public int indexOf(Object o) {
    int index = 0; // 初始化索引为 0
    if (o == null) { // 如果要查找的元素为 null
        for (LinkedList.Node<E> x = first; x != null; x = x.next) { // 从头节点开始遍历链表
            if (x.item == null) // 如果找到了要查找的元素
                return index; // 返回元素在 LinkedList 中的索引
            index++; // 索引加一
        }
    } else {
        for (LinkedList.Node<E> x = first; x != null; x = x.next) { // 从头节点开始遍历链表
            if (o.equals(x.item)) // 如果找到了要查找的元素
                return index; // 返回元素在 LinkedList 中的索引
            index++; // 索引加一
        }
    }
    return -1; // 没有找到要查找的元素，返回 -1
}
```

需要遍历整个链表，和 ArrayList 的 `indexOf()` 类似。

那在我们对集合遍历的时候，通常有两种做法，一种是使用 for 循环，一种是使用[迭代器（Iterator）](https://javabetter.cn/collection/iterator-iterable.html)。

如果使用的是 for 循环，可想而知 LinkedList 在 get 的时候性能会非常差，因为每一次外层的 for 循环，都要执行一次 `node(int)` 方法进行前后半段的遍历。

```java
LinkedList.Node<E> node(int index) {
    // assert isElementIndex(index);

    if (index < (size >> 1)) { // 如果要查找的元素在链表的前半部分
        LinkedList.Node<E> x = first; // 从头节点开始遍历链表
        for (int i = 0; i < index; i++) // 循环查找元素
            x = x.next;
        return x; // 返回要查找的元素节点
    } else { // 如果要查找的元素在链表的后半部分
        LinkedList.Node<E> x = last; // 从尾节点开始遍历链表
        for (int i = size - 1; i > index; i--) // 循环查找元素
            x = x.prev;
        return x; // 返回要查找的元素节点
    }
}
```

那如果使用的是迭代器呢？

```java
LinkedList<String> list = new LinkedList<String>();
for (Iterator<String> it = list.iterator(); it.hasNext();) {
    it.next();
}
```

迭代器只会调用一次 `node(int)` 方法，在执行 `list.iterator()` 的时候：先调用 AbstractSequentialList 类的 `iterator()` 方法，再调用 AbstractList 类的 `listIterator()` 方法，再调用 LinkedList 类的 `listIterator(int)` 方法，如下图所示。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/list-war-2-04.png)

最后返回的是 LinkedList 类的内部私有类 ListItr 对象：

```java
public ListIterator<E> listIterator(int index) {
    checkPositionIndex(index); // 检查索引是否在有效范围内
    return new LinkedList.ListItr(index); // 创建一个新的 ListItr 对象并返回
}

private class ListItr implements ListIterator<E> {
    private LinkedList.Node<E> lastReturned; // 上一个已返回的节点
    private LinkedList.Node<E> next; // 下一个节点
    private int nextIndex; // 下一个节点的索引
    private int expectedModCount = modCount; // 链表被修改的次数

    ListItr(int index) {
        // assert isPositionIndex(index);
        next = (index == size) ? null : node(index); // 如果 index 等于 size，next 为 null，否则返回 node(index)
        nextIndex = index; // 设置 nextIndex 为 index
    }

    public boolean hasNext() {
        return nextIndex < size; // 如果下一个节点的索引小于链表的长度，返回 true，否则返回 false
    }

    public E next() {
        checkForComodification(); // 检查链表是否已经被修改
        if (!hasNext()) // 如果没有下一个节点，抛出 NoSuchElementException 异常
            throw new NoSuchElementException();

        lastReturned = next; // 将下一个节点设置为上一个已返回节点
        next = next.next; // 将下一个节点设置为当前节点的下一个节点
        nextIndex++; // 将下一个节点的索引增加 1
        return lastReturned.item; // 返回上一个已返回节点的元素
    }
}
```

执行 ListItr 的构造方法时调用了一次 `node(int)` 方法，返回第一个节点。在此之后，迭代器就执行 `hasNext()` 判断有没有下一个，执行 `next()` 方法下一个节点。

由此，可以得出这样的结论：**遍历 LinkedList 的时候，千万不要使用 for 循环，要使用迭代器。**

也就是说，for 循环遍历的时候，ArrayList 花费的时间远小于 LinkedList；迭代器遍历的时候，两者性能差不多。

### 06、两者的使用场景

当需要频繁随机访问元素的时候，例如读取大量数据并进行处理或者需要对数据进行排序或查找的场景，可以使用 ArrayList。例如一个学生管理系统，需要对学生列表进行排序或查找操作，可以使用 ArrayList 存储学生信息，以便快速访问和处理。

当需要频繁插入和删除元素的时候，例如实现队列或栈，或者需要在中间插入或删除元素的场景，可以使用 LinkedList。例如一个实时聊天系统，需要实现一个消息队列，可以使用 LinkedList 存储消息，以便快速插入和删除消息。

在一些特殊场景下，可能需要同时支持随机访问和插入/删除操作。例如一个在线游戏系统，需要实现一个玩家列表，需要支持快速查找和遍历玩家，同时也需要支持玩家的加入和离开。在这种情况下，可以使用 LinkedList 和 ArrayList 的组合，例如使用 LinkedList 存储玩家，以便快速插入和删除玩家，同时使用 ArrayList 存储玩家列表，以便快速查找和遍历玩家。

“好了，三妹，关于 LinkedList 和 ArrayList 的差别，我们就先聊到这，你也不用太去扣细节，直到其中的差别就好了。”

“好的，二哥。”

----

GitHub 上标星 9300+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 9300+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
