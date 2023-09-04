---
title: 聊聊 Java String、StringBuilder、StringBuffer 三兄弟
shortTitle: StringBuilder和StringBuffer
category:
  - Java核心
tag:
  - 数组&字符串
description: 在本文中，我们将详细探讨 Java 中 String、StringBuilder 和 StringBuffer 的差异和使用场景。学习如何根据实际需求选择正确的字符串处理类，了解它们在性能、线程安全和内存开销方面的优缺点。本文还将解析它们的内部实现，帮助你更好地理解 Java 字符串处理的原理和最佳实践。
head:
  - - meta
    - name: keywords
      content: Java,String,StringBuilder,StringBuffer
---

# 4.8 String、StringBuilder、StringBuffer

“哥，[上一篇深入理解 String.intern()](https://javabetter.cn/string/intern.html) 讲到了 StringBuilder，这一节我们就来聊聊吧！”三妹很期待。

“好啊，它们之间的关系还真的是挺和谐的。”看着三妹好奇的样子，我感到学技术就应该是这个样子才对。

由于字符串是不可变的，所以当遇到[字符串拼接](https://javabetter.cn/string/join.html)（尤其是使用`+`号操作符）的时候，就需要考量性能的问题，你不能毫无顾虑地生产太多 String 对象，对珍贵的内存造成不必要的压力。

于是 Java 就设计了一个专门用来解决此问题的 StringBuffer 类。

```java
public final class StringBuffer extends AbstractStringBuilder implements Serializable, CharSequence {

    public StringBuffer() {
        super(16);
    }
    
    public synchronized StringBuffer append(String str) {
        super.append(str);
        return this;
    }

    public synchronized String toString() {
        return new String(value, 0, count);
    }

    // 其他方法
}
```

不过，由于 StringBuffer 操作字符串的方法加了 [`synchronized` 关键字](https://javabetter.cn/thread/synchronized-1.html)进行了同步，主要是考虑到多线程环境下的安全问题，所以执行效率会比较低。

于是 Java 就给 StringBuffer “生了个兄弟”，名叫 StringBuilder，说，“孩子，你别管线程安全了，你就在单线程环境下使用，这样效率会高得多，如果要在多线程环境下修改字符串，你到时候可以使用 [`ThreadLocal`](https://javabetter.cn/thread/ThreadLocal.html) 来避免多线程冲突。”

```java
public final class StringBuilder extends AbstractStringBuilder
    implements java.io.Serializable, CharSequence
{
    // ...

    public StringBuilder append(String str) {
        super.append(str);
        return this;
    }

    public String toString() {
        // Create a copy, don't share the array
        return new String(value, 0, count);
    }

    // ...
}
```

除了类名不同，方法没有加 synchronized，基本上完全一样。

实际开发中，StringBuilder 的使用频率也是远高于 StringBuffer，甚至可以这么说，StringBuilder 完全取代了 StringBuffer。

[之前我们也曾聊过](https://javabetter.cn/overview/what-is-java.html)，Java 是一门解释型的编程语言，所以当编译器遇到 `+` 号这个操作符的时候，会将 `new String("二哥") + new String("三妹")` 这行代码编译为以下代码：

```java
new StringBuilder().append("二哥").append("三妹").toString();
```

这个过程是我们看不见的，但这正是 Java 的“智能”之处，它可以在编译的时候偷偷地帮我们做很多优化，这样既可以提高我们的开发效率（`+` 号写起来比创建 StringBuilder 对象便捷得多），也不会影响 JVM 的执行效率。

当然了，如果我们使用 [javap](https://javabetter.cn/jvm/bytecode.html) 反编译 `new String("二哥") + new String("三妹")` 的字节码的时候，也是能看出 StringBuilder 的影子的。

```
0: new           #2                  // class java/lang/StringBuilder
3: dup
4: invokespecial #3                  // Method java/lang/StringBuilder."<init>":()V
7: new           #4                  // class java/lang/String
10: dup
11: ldc           #5                  // String 二哥
13: invokespecial #6                  // Method java/lang/String."<init>":(Ljava/lang/String;)V
16: invokevirtual #7                  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
19: new           #4                  // class java/lang/String
22: dup
23: ldc           #8                  // String 三妹
25: invokespecial #6                  // Method java/lang/String."<init>":(Ljava/lang/String;)V
28: invokevirtual #7                  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
31: invokevirtual #9                  // Method java/lang/StringBuilder.toString:()Ljava/lang/String;
34: areturn
```

可以看到 Java 编译器将字符串拼接操作（`+`）转换为了 StringBuilder 对象的 append 方法，然后再调用 StringBuilder 对象的 toString 方法返回拼接后的字符串。

来看一下 StringBuilder 的 toString 方法：

```java
public String toString() {
    return new String(value, 0, count);
}
```

value 是一个 char 类型的数组：

```java
/**
 * The value is used for character storage.
 */
char[] value;
```

在 StringBuilder 对象创建时，会为 value 分配一定的内存空间（初始容量 16），用于存储字符串。

```java
/**
 * Constructs a string builder with no characters in it and an
 * initial capacity of 16 characters.
 */
public StringBuilder() {
    super(16);
}
```

随着字符串的拼接，value 数组的长度会不断增加，因此在 StringBuilder 对象的实现中，value 数组的长度是可以[动态扩展的，就像ArrayList那样](https://javabetter.cn/collection/arraylist.html)。

继续来看 StringBuilder 的 toString 方法：

```java
public String toString() {
    return new String(value, 0, count);
}
```

value 用于存储 StringBuilder 对象中包含的字符序列。count 是一个 int 类型的变量，表示字符序列的长度。toString() 方法会调用 `new String(value, 0, count)`，使用 value 数组中从 0 开始的前 count 个元素创建一个新的字符串对象，并将其返回。

再来看一下 append 方法：

```java
public StringBuilder append(String str) {
    super.append(str);
    return this;
}
```

实际上是调用了 AbstractStringBuilder 中的 append(String str) 方法。在 AbstractStringBuilder 中，append(String str) 方法会检查当前字符序列中的字符是否够用，如果不够用则会进行扩容，并将指定字符串追加到字符序列的末尾。

```java
/**
 * Appends the specified string to this character sequence.
 * <p>
 * The characters of the {@code String} argument are appended, in order,
 * increasing the length of this sequence by the length of the argument.
 * If {@code str} is {@code null}, then the four characters {@code "null"}
 * are appended.
 * <p>
 * Let <i>n</i> be the length of this character sequence just prior to
 * execution of the {@code append} method. Then the character at index
 * <i>k</i> in this character sequence is equal to the character at index
 * <i>k</i> in the argument {@code str}, if <i>k</i> is less than
 * <i>n</i>; otherwise, it is equal to the character at index
 * <i>k-n</i> in the argument {@code str}.
 *
 * @param   str   a string.
 * @return  a reference to this object.
 */
public AbstractStringBuilder append(String str) {
    if (str == null)
        return appendNull();
    int len = str.length();
    ensureCapacityInternal(count + len);
    str.getChars(0, len, value, count);
    count += len;
    return this;
}
```

`append(String str)` 方法将指定字符串追加到当前字符序列中。如果指定字符串为 null，则追加字符串 "null"；否则会检查指定字符串的长度，然后根据当前字符序列中的字符数和指定字符串的长度来判断是否需要扩容。

如果需要扩容，则会调用 `ensureCapacityInternal(int minimumCapacity) `方法进行扩容。扩容之后，将指定字符串的字符拷贝到字符序列中。

来看一下 ensureCapacityInternal 方法：

```java
private void ensureCapacityInternal(int minimumCapacity) {
    // overflow-conscious code
    if (minimumCapacity - value.length > 0)
        expandCapacity(minimumCapacity);
}

void expandCapacity(int minimumCapacity) {
    int newCapacity = value.length * 2 + 2;
    if (newCapacity - minimumCapacity < 0)
        newCapacity = minimumCapacity;
    if (newCapacity < 0) {
        if (minimumCapacity < 0) // overflow
            throw new OutOfMemoryError();
        newCapacity = Integer.MAX_VALUE;
    }
    value = Arrays.copyOf(value, newCapacity);
}
```

`ensureCapacityInternal(int minimumCapacity)` 方法用于确保当前字符序列的容量至少等于指定的最小容量 minimumCapacity。如果当前容量小于指定的容量，就会为字符序列分配一个新的内部数组。新容量的计算方式如下：

- 如果指定的最小容量大于当前容量，则新容量为两倍的旧容量加上 2；
- 如果指定的最小容量小于等于当前容量，则不会进行扩容，直接返回当前对象。

在进行扩容之前，`ensureCapacityInternal(int minimumCapacity)` 方法会先检查当前字符序列的容量是否足够，如果不足就会调用 `expandCapacity(int minimumCapacity)` 方法进行扩容。`expandCapacity(int minimumCapacity)` 方法首先计算出新容量，然后使用 `Arrays.copyOf(char[] original, int newLength)` 方法将原字符数组扩容到新容量的大小。

关于扩容，后面在讲[ArrayList](https://javabetter.cn/collection/arraylist.html)的时候会再次说明，今天就先聊到这吧。

“我想，关于 String、StringBuilder、StringBuilder 之间的差别，你都搞清楚了吧？”我问。

“哥，你真棒！区别我是搞清楚了，你后面讲的源码扩容还没消化，我一会去加个餐，再细看一下。”三妹说。

“可以的，实际上，你现在只需要知道 StringBuilder 的用法就可以了。”喝了一口右手边的可口可乐（无糖）后，我感觉好爽快啊。

---

GitHub 上标星 9300+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 9300+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)