---
title: Java Arrays：专为数组而生的工具类
shortTitle: Arrays工具类
category:
  - Java核心
tag:
  - 常用工具类
description: 本文详细介绍了Java中的Arrays工具类，阐述了它在数组操作中的实际应用和优势。通过具体的代码示例，展示了如何使用Arrays类处理数组排序、查找、转换等常见问题。学习Arrays工具类的技巧，让您在Java编程中轻松应对各种数组操作，提高开发效率。
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,二哥的Java进阶之路,Java进阶之路,Java入门,教程,java,Arrays,数组,java arrays,java 数组
---

# 9.2 Arrays工具类

“哥，数组专用工具类是专门用来操作[数组](https://javabetter.cn/array/array.html)的吗？比如说创建数组、数组排序、数组检索等等。”三妹的提问其实已经把答案说了出来。

“是滴，这里说的数组专用工具类指的是 `java.util.Arrays` 类，基本上常见的数组操作，这个类都提供了静态方法可供直接调用。毕竟数组本身想完成这些操作还是挺麻烦的，有了这层封装，就方便多了。”在回答三妹的同时，我打开 Intellij IDEA，找到了 Arrays 类的源码。

```java
package java.util;
/**
 * @author Josh Bloch
 * @author Neal Gafter
 * @author John Rose
 * @since  1.2
 */
public class Arrays {}
```

“具体来说，数组操作可分为以下 9 种。”

- 创建数组
- 比较数组
- 数组排序
- 数组检索
- 数组转流
- 打印数组
- 数组转 List
- setAll（没想好中文名）
- parallelPrefix（没想好中文名）

“我们来一个一个学习。”

### 01、创建数组

使用 Arrays 类创建数组可以通过以下三个方法：

- copyOf，复制指定的数组，截取或用 null 填充
- copyOfRange，复制指定范围内的数组到一个新的数组
- fill，对数组进行填充

#### 1）copyOf

直接来看例子：

```java
String[] intro = new String[] { "沉", "默", "王", "二" };
String[] revised = Arrays.copyOf(intro, 3);
String[] expanded = Arrays.copyOf(intro, 5);
System.out.println(Arrays.toString(revised));
System.out.println(Arrays.toString(expanded));
```

revised 和 expanded 是复制后的新数组，长度分别是 3 和 5，指定的数组长度是 4。来看一下输出结果：

```
[沉, 默, 王]
[沉, 默, 王, 二, null]
```

看到没？revised 截取了最后一位，因为长度是 3 嘛；expanded 用 null 填充了一位，因为长度是 5。

ArrayList（内部的数据结构用的就是数组）源码中的 `grow()` 方法就调用了 `copyOf()` 方法：当 ArrayList 初始大小不满足元素的增长时就会扩容。

```java
private Object[] grow(int minCapacity) {
    return elementData = Arrays.copyOf(elementData,
            newCapacity(minCapacity));
}
```

#### 2）copyOfRange

直接来看例子：

```java
String[] intro = new String[] { "沉", "默", "王", "二" };
String[] abridgement = Arrays.copyOfRange(intro, 0, 3);
System.out.println(Arrays.toString(abridgement));
```

`copyOfRange()` 方法需要三个参数，第一个是指定的数组，第二个是起始位置（包含），第三个是截止位置（不包含）。来看一下输出结果：

```java
[沉, 默, 王]
```

0 的位置是“沉”，3 的位置是“二”，也就是说截取了从 0 位（包含）到 3 位（不包含）的数组元素。那假如说下标超出了数组的长度，会发生什么呢？

```java
String[] abridgementExpanded = Arrays.copyOfRange(intro, 0, 6);
System.out.println(Arrays.toString(abridgementExpanded));
```

结束位置此时为 6，超出了指定数组的长度 4，来看一下输出结果：

```
[沉, 默, 王, 二, null, null]
```

仍然使用了 null 进行填充。

“为什么要这么做呢？”经过这段时间的学习，三妹的眼光越来越毒辣了，问的问题都恰到好处。

“嗯，我想是 Arrays 的设计者考虑到了数组越界的问题，不然每次调用 Arrays 类就要先判断很多次长度，很麻烦。”稍作思考后，我给出了这样一个回答。

#### 3）fill

直接来看例子：

```java
String[] stutter = new String[4];
Arrays.fill(stutter, "沉默王二");
System.out.println(Arrays.toString(stutter));
```

使用 new 关键字创建了一个长度为 4 的数组，然后使用 `fill()` 方法将 4 个位置填充为“沉默王二”，来看一下输出结果：

```
[沉默王二, 沉默王二, 沉默王二, 沉默王二]
```

如果想要一个元素完全相同的数组时， `fill()` 方法就派上用场了。

### 02、比较数组

Arrays 类的 `equals()` 方法用来判断两个数组是否相等，来看下面这个例子：

```java
String[] intro = new String[] { "沉", "默", "王", "二" };
boolean result = Arrays.equals(new String[] { "沉", "默", "王", "二" }, intro);
System.out.println(result);
boolean result1 = Arrays.equals(new String[] { "沉", "默", "王", "三" }, intro);
System.out.println(result1);
```

输出结果如下所示：

```
true
false
```

指定的数组为沉默王二四个字，比较的数组一个是沉默王二，一个是沉默王三，所以 result 为 true，result1 为 false。

简单看一下 `equals()` 方法的源码：

```java
public static boolean equals(Object[] a, Object[] a2) {
    if (a==a2)
        return true;
    if (a==null || a2==null)
        return false;

    int length = a.length;
    if (a2.length != length)
        return false;

    for (int i=0; i<length; i++) {
        if (!Objects.equals(a[i], a2[i]))
            return false;
    }

    return true;
}
```

因为数组是一个对象，所以先使用“==”操作符进行判断，如果不相等，再判断是否为 null，其中一个为 null，返回 false；紧接着判断 length，不等的话，返回 false；否则的话，依次调用 `Objects.equals()` 比较相同位置上的元素是否相等。

“这段代码还是非常严谨的，对吧？三妹，这也就是我们学习源码的意义，欣赏的同时，可以学习源码作者清晰的编码思路。”我语重心长地给三妹讲。

除了 `equals()` 方法，还有另外一个诀窍可以判断两个数组是否相等，尽管可能会出现误差。那就是 `Arrays.hashCode()` 方法，先来看一下该方法的源码：

```java
public static int hashCode(Object a[]) {
    if (a == null)
        return 0;

    int result = 1;

    for (Object element : a)
        result = 31 * result + (element == null ? 0 : element.hashCode());

    return result;
}
``` 

哈希算法本身是非常严谨的，所以如果两个数组的哈希值相等，那几乎可以判断两个数组是相等的。

```java
String[] intro = new String[] { "沉", "默", "王", "二" };

System.out.println(Arrays.hashCode(intro));
System.out.println(Arrays.hashCode(new String[] { "沉", "默", "王", "二" }));
```

来看一下输出结果：

```
868681617
868681617
```

两个数组的哈希值相等，毕竟元素是一样的。但这样确实不够严谨，优先使用 `Objects.equals()` 方法，当我们想快速确认两个数组是否相等时，可以通过比较 hashCode 来确认——算是投机取巧吧，高收益高风险，哈哈。

### 03、数组排序

Arrays 类的 `sort()` 方法用来对数组进行排序，来看下面这个例子：

```java
String[] intro1 = new String[] { "chen", "mo", "wang", "er" };
String[] sorted = Arrays.copyOf(intro1, 4);
Arrays.sort(sorted);
System.out.println(Arrays.toString(sorted));
```

由于排序会改变原有的数组，所以我们使用了 `copyOf()` 方法重新复制了一份。来看一下输出结果：

```
[chen, er, mo, wang]
```

可以看得出，按照的是首字母的升序进行排列的。基本数据类型是按照双轴快速排序的，引用数据类型是按照 TimSort 排序的，使用了 Peter McIlroy 的“乐观排序和信息理论复杂性”中的技术。

“哥，你说的这些排序算法我都不太懂啊！”三妹眨巴眨巴眼睛说。

“不要紧的，后面学了数据结构与算法后，就明白了，现在了解这个东西即可。”我赶紧甩出了安抚大法。

### 04、数组检索

数组排序后就可以使用 Arrays 类的 `binarySearch()` 方法进行二分查找了。否则的话，只能线性检索，效率就会低很多。

```java
String[] intro1 = new String[] { "chen", "mo", "wang", "er" };
String[] sorted = Arrays.copyOf(intro1, 4);
Arrays.sort(sorted);
int exact = Arrays.binarySearch(sorted, "wang");
System.out.println(exact);
int caseInsensitive = Arrays.binarySearch(sorted, "Wang", String::compareToIgnoreCase);
System.out.println(caseInsensitive);
```

 `binarySearch()` 方法既可以精确检索，也可以模糊检索，比如说忽略大小写。来看一下输出结果：

```
3
3
```

排序后的结果是 `[chen, er, mo, wang]`，所以检索出来的下标是 3。

“三妹，记住了，以后如果要从数组或者集合中查找元素的话，尽量先排序，然后使用二分查找法，这样能提高检索的效率。”

三妹若有所思的点了点头。

### 05、数组转流

“流是什么呀？”三妹好奇的问。

“流的英文单词是 Stream，它可以极大提高 Java 程序员的生产力，让程序员写出高效、干净、简洁的代码。 这种风格将要处理的集合看作是一种流，想象一下水流在管道中流过的样子，我们可以在管道中对流进行处理，比如筛选、排序等等。[Stream 具体怎么使用](https://javabetter.cn/java8/stream.html)，我们留到后面再详细地讲，这里你先有一个大致的印象就可以了。”我回答到。


Arrays 类的 `stream()` 方法可以将数组转换成流：

```java
String[] intro = new String[] { "沉", "默", "王", "二" };
System.out.println(Arrays.stream(intro).count());
```

还可以为 `stream()` 方法指定起始下标和结束下标：

```java
System.out.println(Arrays.stream(intro, 1, 2).count());
```

如果下标的范围有误的时候，比如说从 2 到 1 结束，则程序会抛出 ArrayIndexOutOfBoundsException 异常：

```
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: origin(2) > fence(1)
	at java.base/java.util.Spliterators.checkFromToBounds(Spliterators.java:387)
```

### 06、打印数组

因为数组是一个对象，直接 `System.out.println` 的话，结果是这样的：

```
[Ljava.lang.String;@3d075dc0
```

[最优雅的打印方式](https://javabetter.cn/array/print.html)，是使用 `Arrays.toString()`，其实前面讲过。来看一下该方法的源码：

```java
public static String toString(Object[] a) {
    if (a == null)
        return "null";

    int iMax = a.length - 1;
    if (iMax == -1)
        return "[]";

    StringBuilder b = new StringBuilder();
    b.append('[');
    for (int i = 0; ; i++) {
        b.append(String.valueOf(a[i]));
        if (i == iMax)
            return b.append(']').toString();
        b.append(", ");
    }
}
```

- 先判断 null，是的话，直接返回“null”字符串；
- 获取数组的长度，如果数组的长度为 0（ 等价于 length - 1 为 -1），返回中括号“[]”，表示数组为空的；
- 如果数组既不是 null，长度也不为 0，就声明 StringBuilder 对象，然后添加一个数组的开始标记“[”，之后再遍历数组，把每个元素添加进去；其中一个小技巧就是，当遇到末尾元素的时候（i == iMax），不再添加逗号和空格“, ”，而是添加数组的闭合标记“]”。

“哥，我能不能问一个问题呀？”

“你问啊。”

“就是为什么判断数组长度为 0 的时候判断的是减 1 后比较 -1 呢？为什么不直接比较 0 呢？”

“呀，你这个问题问的很妙啊！”我想到三妹说一句“respect”，很强！“其实是和遍历数组的时候判断 `i == iMax` 有关了，否则这里就要用 `i == iMax -1` 来判断是否到达数组的最后一个元素了。”

“哦----------”三妹似乎明白了什么。

### 07、数组转 List

尽管数组非常强大，但它自身可以操作的工具方法很少，比如说判断数组中是否包含某个值。如果能转成 List 的话，就简便多了，因为 Java 的[集合框架 List](https://javabetter.cn/collection/gailan.html) 中封装了很多常用的方法。

```java
String[] intro = new String[] { "沉", "默", "王", "二" };
List<String> rets = Arrays.asList(intro);
System.out.println(rets.contains("二"));
```

不过需要注意的是，`Arrays.asList()` 返回的是 `java.util.Arrays.ArrayList`，并不是  [`java.util.ArrayList`](https://javabetter.cn/collection/arraylist.html)，它的长度是固定的，无法进行元素的删除或者添加。

```java
rets.add("三");
rets.remove("二");
```

这个在编码的时候一定要注意，否则在执行这两个方法的时候，会抛出异常：

```
Exception in thread "main" java.lang.UnsupportedOperationException
	at java.base/java.util.AbstractList.add(AbstractList.java:153)
	at java.base/java.util.AbstractList.add(AbstractList.java:111)
```

要想操作元素的话，需要多一步转化，转成真正的 `java.util.ArrayList`：

```java
List<String> rets1 = new ArrayList<>(Arrays.asList(intro));
rets1.add("三");
rets1.remove("二");
```

### 08、setAll

Java 8 新增了 `setAll()` 方法，它提供了一个[函数式编程](https://javabetter.cn/java8/Lambda.html)的入口，可以对数组的元素进行填充：

```java
int[] array = new int[10];
Arrays.setAll(array, i -> i * 10);
System.out.println(Arrays.toString(array));
```

“这段代码什么意思呢？”三妹问。

i 就相当于是数组的下标，值从 0 开始，到 9 结束，那么 `i * 10` 就意味着值从 0 * 10 开始，到 9 * 10 结束，来看一下输出结果：

```
[0, 10, 20, 30, 40, 50, 60, 70, 80, 90]
``` 

可以用来为新数组填充基于原来数组的新元素。

### 09、parallelPrefix

`parallelPrefix()` 方法和 `setAll()` 方法一样，也是 Java 8 之后提供的，提供了一个函数式编程的入口，通过遍历数组中的元素，将当前下标位置上的元素与它之前下标的元素进行操作，然后将操作后的结果覆盖当前下标位置上的元素。

```java
int[] arr = new int[] { 1, 2, 3, 4};
Arrays.parallelPrefix(arr, (left, right) -> left + right);
System.out.println(Arrays.toString(arr));
```

上面代码中有一个 Lambda 表达式（`(left, right) -> left + right`），是什么意思呢？上面这段代码等同于：

```java
int[] arr = new int[]{1, 2, 3, 4};
Arrays.parallelPrefix(arr, (left, right) -> {
    System.out.println(left + "，" + right);
    return left + right;
});
System.out.println(Arrays.toString(arr));
```

来看一下输出结果就明白了：

```
1，2
3，3
6，4
[1, 3, 6, 10]
```

也就是说， Lambda 表达式执行了三次：

- 第一次是 1 和 2 相加，结果是 3，替换下标为 1 的位置
- 第二次是 3 和 3 相加，结果是 6，也就是第一次的结果和下标为 2 的元素相加的结果
- 第三次是 6 和 4 相加，结果是 10，也就是第二次的结果和下标为 3 的元素相加的结果


### 10、总结

“好了，三妹，就先学到这吧。如果你以后翻 Java 源码的时候，只要是用到数组的，尤其是 ArrayList 类，就可以看到 Arrays 类的很多影子。”

“嗯嗯，我先复习一下这节的内容。哥，你去休息吧。”

我来到客厅，坐到沙发上，捧起黄永玉先生的《无愁河上的浪荡汉子·八年卷 1》看了起来，津津有味。。。。。。

----

GitHub 上标星 9300+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 9300+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)