---
title: 如何优雅地打印Java数组？
shortTitle: 打印Java数组
category:
  - Java核心
tag:
  - 数组&字符串
description: 本文将向您展示如何在Java中优雅地打印数组内容。我们将介绍不同的方法来输出数组，包括使用for循环、增强型for循环以及Java内置的Arrays.toString()和Arrays.deepToString()方法。通过本文，您将学会如何简便快捷地打印Java数组，提高编程效率和代码可读性。
head:
  - - meta
    - name: keywords
      content: Java, 数组打印, 输出数组, Arrays.toString, Arrays.deepToString
---

# 4.3 打印Java数组

“哥，[之前听你说，数组也是一个对象](https://javabetter.cn/array/array.html)，但 Java 中并未明确的定义这样一个类。”看来三妹有在用心地学习。

“是的，因此数组也就没有机会覆盖 `Object.toString()` 方法。如果尝试直接打印数组的话，输出的结果并不是我们预期的结果。”我接着三妹的话继续说。

“那怎么打印数组呢？”三妹心有灵犀地把今天的核心问题提了出来。

### 为什么不能直接打印数组

“首先，我们来看一下，为什么不能直接打印数组，直接打印的话，会出现什么问题。”

来看这样一个例子。

```
String [] cmowers = {"沉默","王二","一枚有趣的程序员"};
System.out.println(cmowers);
```

程序打印的结果是：

```
[Ljava.lang.String;@3d075dc0
```

`[Ljava.lang.String;` 表示字符串数组的 Class 名，@ 后面的是十六进制的 hashCode——这样的打印结果太“人性化”了，一般人表示看不懂！为什么会这样显示呢？查看一下 `java.lang.Object` 类的 `toString()` 方法就明白了。

```java
public String toString() {
    return getClass().getName() + "@" + Integer.toHexString(hashCode());
}
```

再次证明，数组虽然没有显式定义成一个类，但它的确是一个对象，继承了祖先类 Object 的所有方法。

“哥，那为什么数组不单独定义一个类来表示呢？就像字符串 String 类那样呢？”三妹这个问题让人头大，但也好解释。

“一个合理的说法是 Java 将其隐藏了。假如真的存在这么一个类，就叫 Array.java 吧，我们假想一下它真实的样子，必须得有一个容器来存放数组的每一个元素，就像 String 类那样。”一边回答三妹，我一边打开了 String 类的源码。

```java
public final class String
    implements java.io.Serializable, Comparable<String>, CharSequence {
    /** The value is used for character storage. */
    private final char value[];
}
```

“最终还是要用类似一种数组的形式来存放数组的元素，对吧？这就变得很没有必要了，不妨就把数组当做是一个没有形体的对象吧！”

“好了，不讨论这个了。”我怕话题扯远了，扯到我自己也答不出来就尴尬了，赶紧把三妹的思路拽了回来。

### stream 流打印 Java 数组

“我们来看第一种打印数组的方法，使用时髦一点的[Stream 流](https://javabetter.cn/java8/stream.html)。”

第一种形式：

```java
Arrays.asList(cmowers).stream().forEach(s -> System.out.println(s));
```

第二种形式：

```java
Stream.of(cmowers).forEach(System.out::println);
```

第三种形式：

```java
Arrays.stream(cmowers).forEach(System.out::println);
```

打印的结果如下所示。

```
沉默
王二
一枚有趣的程序员
```

没错，这三种方式都可以轻松胜任本职工作，并且显得有点高大上，毕竟用到了 Stream，以及 [lambda 表达式](https://javabetter.cn/java8/Lambda.html)。

### for 循环打印 Java 数组

“当然了，也可以使用传统的方式，for 循环。甚至 for-each 也行。”

```java
for(int i = 0; i < cmowers.length; i++){
    System.out.println(cmowers[i]);
}

for (String s : cmowers) {
    System.out.println(s);
}
```

### Arrays 工具类打印 Java 数组

“哥，你难道忘了[上一篇](https://javabetter.cn/common-tool/arrays.html)在讲 Arrays 工具类的时候，提到过另外一种方法 `Arrays.toString()` 吗？”三妹看我一直说不到点子上，有点着急了。

“当然没有了，我认为 `Arrays.toString()` 是打印数组的最佳方式，没有之一。”我的情绪有点激动。

`Arrays.toString()` 可以将任意类型的数组转成字符串，包括基本类型数组和引用类型数组。该方法有多种重载形式。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/array/print-01.png)

使用 `Arrays.toString()` 方法来打印数组再优雅不过了，就像，就像，就像蒙娜丽莎的微笑。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/array/print-02.png)

（三妹看到这么一副图的时候忍不住地笑了）

“三妹，你不要笑，来，怀揣着愉快的心情看一下代码示例。”

```java
String [] cmowers = {"沉默","王二","一枚有趣的程序员"};
System.out.println(Arrays.toString(cmowers));
```

程序打印结果：

```
[沉默, 王二, 一枚有趣的程序员]
```

哇，打印格式不要太完美，不多不少！完全是我们预期的结果：`[]` 表明是一个数组，`,` 点和空格用来分割元素。

### Arrays工具类打印二维数组

“哥，那如果我想打印二维数组呢？”

“可以使用 `Arrays.deepToString()` 方法。”

```java
String[][] deepArray = new String[][] {{"沉默", "王二"}, {"一枚有趣的程序员"}};
System.out.println(Arrays.deepToString(deepArray));
```

打印结果如下所示。

```
[[沉默, 王二], [一枚有趣的程序员]]
```

### POJO 的打印规约

“说到打印，三妹，哥给你提醒一点。阿里巴巴的 Java 开发手册上有这样一条规约，你看。”

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/array/print-03.png)

“什么是 POJO 呢，就是 Plain Ordinary Java Object 的缩写，一般在 Web 应用程序中建立一个数据库的映射对象时，我们称它为 POJO，这类对象不继承或不实现任何其它 Java 框架的类或接口。”

“对于这样的类，最好是重写一下它的 `toString()` 方法，方便查看这个对象到底包含了什么字段，好排查问题。”

“如果不重写的话，打印出来的 Java 对象就像直接打印数组的那样，一串谁也看不懂的字符序列。”

“可以借助 Intellij IDEA 生成重写的  `toString()` 方法，特别方便。”

“好的，哥，我记住了。以后遇到的话，我注意下。你去休息吧，我来敲一下你提到的这些代码，练一练。”

“OK，我走，我走。”


----

GitHub 上标星 9300+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 9300+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
