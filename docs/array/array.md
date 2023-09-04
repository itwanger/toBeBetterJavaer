---
title: 掌握Java数组：一个非常特殊的对象
shortTitle: 掌握Java数组
category:
  - Java核心
tag:
  - 数组&字符串
description: 本文详细介绍了Java数组，包括数组的基本概念、创建方法、初始化方法以及常用操作。学习本文内容，您将掌握Java数组的定义、如何创建和初始化数组，以及如何进行数组元素的添加、删除、查询等操作，为您的Java编程之旅打下坚实基础。
head:
  - - meta
    - name: keywords
      content: Java, 数组, 创建数组, 初始化数组, 数组操作
---

# 4.1 掌握Java数组

“二哥，我看你公众号的一篇文章里提到，[ArrayList](https://javabetter.cn/collection/arraylist.html) 的内部是用数组实现的，我就对数组非常感兴趣，想深入地了解一下，今天终于到这个环节了，好期待呀！”三妹的语气里显得很兴奋。

“的确是的，看 ArrayList 的源码就一清二楚了。”我一边说，一边打开 Intellij IDEA，并找到了 ArrayList 的源码。

```java
/**
 * The array buffer into which the elements of the ArrayList are stored.
 * The capacity of the ArrayList is the length of this array buffer. Any
 * empty ArrayList with elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA
 * will be expanded to DEFAULT_CAPACITY when the first element is added.
 */
transient Object[] elementData; // non-private to simplify nested class access

/**
 * The size of the ArrayList (the number of elements it contains).
 *
 * @serial
 */
private int size;
```

“瞧见没？`Object[] elementData` 就是数组。”我指着显示屏上这串代码继续说。

数组是一个对象，它包含了一组固定数量的元素，并且这些元素的类型是相同的。数组会按照索引的方式将元素放在指定的位置上，意味着我们可以通过索引来访问这些元素。在 Java 中，索引是从 0 开始的。

“哥，能说一下为什么索引从 0 开始吗？”三妹突然这个话题很感兴趣。

“哦，Java 是基于 C/C++ 语言实现的，而 C 语言的下标是从 0 开始的，所以 Java 就继承了这个良好的传统习惯。C语言有一个很重要概念，叫做指针，它实际上是一个偏移量，距离开始位置的偏移量，第一个元素就在开始的位置，它的偏移量就为 0，所以索引就为 0。”此刻，我很自信。

“此外，还有另外一种说法。早期的计算机资源比较匮乏，0 作为起始下标相比较于 1 作为起始下标，编译的效率更高。”

“哦。”三妹意味深长地点了点头。 

我们可以将数组理解为一个个整齐排列的单元格，每个单元格里面存放着一个元素。

数组元素的类型可以是基本数据类型（比如说 int、double），也可以是引用数据类型（比如说 String），包括自定义类型。

数组的声明方式分两种。

先来看第一种：

```java
int[] anArray;
```

再来看第二种：

```java
int anOtherArray[];
```

不同之处就在于中括号的位置，是跟在类型关键字的后面，还是跟在变量的名称的后面。前一种的使用频率更高一些，像 ArrayList 的源码中就用了第一种方式。

同样的，数组的初始化方式也有多种，最常见的是：

```java
int[] anArray = new int[10];
```

看到了没？上面这行代码中使用了 new 关键字，这就意味着数组的确是一个对象，只有对象的创建才会用到 new 关键字，[基本数据类型](https://javabetter.cn/basic-grammar/basic-data-type.html)是不用的。然后，我们需要在方括号中指定数组的长度。

这时候，数组中的每个元素都会被初始化为默认值，int 类型的就为 0，Object 类型的就为 null。 不同数据类型的默认值不同，可以参照[之前的文章](https://javabetter.cn/basic-grammar/basic-data-type.html)。

另外，还可以使用大括号的方式，直接初始化数组中的元素：

```java
int anOtherArray[] = new int[] {1, 2, 3, 4, 5};
```

这时候，数组的元素分别是 1、2、3、4、5，索引依次是 0、1、2、3、4，长度是 5。

“哥，怎么访问数组呢？”三妹及时地插话到。

前面提到过，可以通过索引来访问数组的元素，就像下面这样：

```java
anArray[0] = 10;
```

变量名，加上中括号，加上元素的索引，就可以访问到数组，通过“=”操作符可以对元素进行赋值。

如果索引的值超出了数组的界限，就会抛出 `ArrayIndexOutOfBoundException`。

既然数组的索引是从 0 开始，那就是到数组的 `length - 1` 结束，不要使用超出这个范围内的索引访问数组，就不会抛出数组越界的异常了。 

当数组的元素非常多的时候，逐个访问数组就太辛苦了，所以需要通过遍历的方式。

第一种，使用 for 循环：

```java
int anOtherArray[] = new int[] {1, 2, 3, 4, 5};
for (int i = 0; i < anOtherArray.length; i++) {
    System.out.println(anOtherArray[i]);
}
```

通过 length 属性获取到数组的长度，然后从 0 开始遍历，就得到了数组的所有元素。

第二种，使用 for-each 循环：

```java
for (int element : anOtherArray) {
    System.out.println(element);
}
```

如果不需要关心索引的话（意味着不需要修改数组的某个元素），使用 for-each 遍历更简洁一些。当然，也可以使用 while 和 do-while 循环。

在 Java 中，可变参数用于将任意数量的参数传递给方法，来看 `varargsMethod()` 方法：

```java
void varargsMethod(String... varargs) {}
```

该方法可以接收任意数量的字符串参数，可以是 0 个或者 N 个，本质上，可变参数就是通过数组实现的。为了证明这一点，我们可以看一下反编译一后的字节码：

```java
public class VarargsDemo
{

    public VarargsDemo()
    {
    }

    transient void varargsMethod(String as[])
    {
    }
}
```

所以，我们其实可以直接将数组作为参数传递给该方法：

```java
VarargsDemo demo = new VarargsDemo();
String[] anArray = new String[] {"沉默王二", "一枚有趣的程序员"};
demo.varargsMethod(anArray);
```

也可以直接传递多个字符串，通过逗号隔开的方式：

```java
demo.varargsMethod("沉默王二", "一枚有趣的程序员");
```

在 Java 中，数组与 List 关系非常密切。List 封装了很多常用的方法，方便我们对集合进行一些操作，而如果直接操作数组的话，有很多不便，因为数组本身没有提供这些封装好的操作，所以有时候我们需要把数组转成 List。

“怎么转呢？”三妹问到。

最原始的方式，就是通过遍历数组的方式，一个个将数组添加到 List 中。

```java
int[] anArray = new int[] {1, 2, 3, 4, 5};

List<Integer> aList = new ArrayList<>();
for (int element : anArray) {
    aList.add(element);
}
```

更优雅的方式是通过 Arrays 类的 `asList()` 方法：

```java
List<Integer> aList = Arrays.asList(anArray);
```

不过需要注意的是，Arrays.asList 的参数需要是 Integer 数组，而 anArray 目前是 int 类型，我们需要换另外一种方式。

```java
List<Integer> aList = Arrays.stream(anArray).boxed().collect(Collectors.toList());
```

这又涉及到了 Java [流](https://javabetter.cn/java8/stream.html)的知识，后面会讲到。

还有一个需要注意的是，Arrays.asList 方法返回的 ArrayList 并不是 `java.util.ArrayList`，它其实是  Arrays 类的一个内部类：

```java
private static class ArrayList<E> extends AbstractList<E>
        implements RandomAccess, java.io.Serializable{}
```

如果需要添加元素或者删除元素的话，需要把它转成 `java.util.ArrayList`。

```java
new ArrayList<>(Arrays.asList(anArray));
```

Java 8 新增了 Stream 流的概念，这就意味着我们也可以将数组转成 Stream 进行操作。

```java
String[] anArray = new String[] {"沉默王二", "一枚有趣的程序员", "好好珍重他"};
Stream<String> aStream = Arrays.stream(anArray);
```

如果想对数组进行排序的话，可以使用 Arrays 类提供的 `sort()` 方法。

- 基本数据类型按照升序排列
- 实现了 Comparable 接口的对象按照 `compareTo()` 的排序

来看第一个例子：

```java
int[] anArray = new int[] {5, 2, 1, 4, 8};
Arrays.sort(anArray);
```

排序后的结果如下所示：

```java
[1, 2, 4, 5, 8]
```

来看第二个例子：

```java
String[] yetAnotherArray = new String[] {"A", "E", "Z", "B", "C"};
Arrays.sort(yetAnotherArray, 1, 3,
                Comparator.comparing(String::toString).reversed());
```

只对 1-3 位置上的元素进行反序，所以结果如下所示：

```
[A, Z, E, B, C]
```

有时候，我们需要从数组中查找某个具体的元素，最直接的方式就是通过遍历的方式：

```java
int[] anArray = new int[] {5, 2, 1, 4, 8};
for (int i = 0; i < anArray.length; i++) {
    if (anArray[i] == 4) {
        System.out.println("找到了 " + i);
        break;
    }
}
```

上例中从数组中查询元素 4，找到后通过 break 关键字退出循环。

如果数组提前进行了排序，就可以使用二分查找法，这样效率就会更高一些。`Arrays.binarySearch()` 方法可供我们使用，它需要传递一个数组，和要查找的元素。

```java
int[] anArray = new int[] {1, 2, 3, 4, 5};
int index = Arrays.binarySearch(anArray, 4);
```

“除了一维数组，还有二维数组，三妹你可以去研究下，比如说用二维数组打印一下杨辉三角。”说完，我就去阳台上休息了，留三妹在那里学习，不能打扰她。

----

GitHub 上标星 9300+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 9300+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
