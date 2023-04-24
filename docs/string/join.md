---
title: 最优雅的Java字符串String拼接是哪种方式？
shortTitle: String拼接
category:
  - Java核心
tag:
  - 数组&字符串
description: Java字符串拼接是日常编程中的常见任务。本文详细介绍了Java中不同的字符串拼接方法，包括+号操作符、String.concat、StringBuilder
head:
  - - meta
    - name: keywords
      content: Java,字符串,String,字符串拼接,java字符串拼接,java string拼接
---

# 4.10 String拼接

“哥，你让我看的《[Java 开发手册](https://tobebetterjavaer.com/pdf/ali-java-shouce.html)》上有这么一段内容：循环体内，拼接字符串最好使用 StringBuilder 的 `append()` 方法，而不是 + 号操作符。这是为什么呀？”三妹疑惑地问。

“其实这个问题，我们之前已经[聊过](https://tobebetterjavaer.com/string/builder-buffer.html)。”我慢吞吞地回答道，“不过，三妹，哥今天来给你深入地讲讲。”

PS：三妹能在学习的过程中不断地发现问题，让我感到非常的开心。其实很多时候，我们不应该只是把知识点记在心里，还应该问一问自己，到底是为什么，只有迈出去这一步，才能真正的成长起来。

### javap 探究+号操作符拼接字符串的本质

“+ 号操作符其实被 Java 在编译的时候重新解释了，换一种说法就是，+ 号操作符是一种语法糖，让字符串的拼接变得更简便了。”一边给三妹解释，我一边在 Intellij IDEA 中敲出了下面这段代码。

```java
class Demo {
    public static void main(String[] args) {
        String chenmo = "沉默";
        String wanger = "王二";
        System.out.println(chenmo + wanger);
    }
}
```

在 Java 8 的环境下，使用 `javap -c Demo.class` 反编译字节码后，可以看到以下内容：

```
Compiled from "Demo.java"
class Demo {
  Demo();
    Code:
       0: aload_0
       1: invokespecial #1                  // Method java/lang/Object."<init>":()V
       4: return

  public static void main(java.lang.String[]);
    Code:
       0: ldc           #2                  // String 沉默
       2: astore_1
       3: ldc           #3                  // String 王二
       5: astore_2
       6: getstatic     #4                  // Field java/lang/System.out:Ljava/io/PrintStream;
       9: new           #5                  // class java/lang/StringBuilder
      12: dup
      13: invokespecial #6                  // Method java/lang/StringBuilder."<init>":()V
      16: aload_1
      17: invokevirtual #7                  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
      20: aload_2
      21: invokevirtual #7                  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
      24: invokevirtual #8                  // Method java/lang/StringBuilder.toString:()Ljava/lang/String;
      27: invokevirtual #9                  // Method java/io/PrintStream.println:(Ljava/lang/String;)V
      30: return
}
```

“你看，三妹，这里有一个 new 关键字，并且 class 类型为 `java/lang/StringBuilder`。”我指着标号为 9 的那行对三妹说，“这意味着新建了一个 StringBuilder 的对象。”

“然后看标号为 17 的这行，是一个 invokevirtual 指令，用于调用对象的方法，也就是 StringBuilder 对象的 `append()` 方法。”

“也就意味着把 chenmo（"沉默"）这个字符串添加到 StringBuilder 对象中了。”

“再往下看，标号为 21 的这行，又调用了一次 `append()` 方法，意味着把 wanger（"王二"）这个字符串添加到 StringBuilder 对象中了。”

换成 Java 代码来表示的话，大概是这个样子：

```java
class Demo {
    public static void main(String[] args) {
        String chenmo = "沉默";
        String wanger = "王二";
        System.out.println((new StringBuilder(chenmo)).append(wanger).toString());
    }
}
```

“哦，原来编译的时候把“+”号操作符替换成了 StringBuilder 的 `append()` 方法啊。”三妹恍然大悟。

“是的，不过到了 Java 9（不是长期支持版本，所以我会拿 Java 11 来演示），情况发生了一些改变，同样的代码，字节码指令完全不同了。”我说。

同样的代码，在 Java 11 的环境下，字节码指令是这样的：

```
Compiled from "Demo.java"
public class com.itwanger.thirtyseven.Demo {
  public com.itwanger.thirtyseven.Demo();
    Code:
       0: aload_0
       1: invokespecial #1                  // Method java/lang/Object."<init>":()V
       4: return

  public static void main(java.lang.String[]);
    Code:
       0: ldc           #2                  // String
       2: astore_1
       3: iconst_0
       4: istore_2
       5: iload_2
       6: bipush        10
       8: if_icmpge     41
      11: new           #3                  // class java/lang/String
      14: dup
      15: ldc           #4                  // String 沉默
      17: invokespecial #5                  // Method java/lang/String."<init>":(Ljava/lang/String;)V
      20: astore_3
      21: ldc           #6                  // String 王二
      23: astore        4
      25: aload_1
      26: aload_3
      27: aload         4
      29: invokedynamic #7,  0              // InvokeDynamic #0:makeConcatWithConstants:(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;
      34: astore_1
      35: iinc          2, 1
      38: goto          5
      41: return
}
```

看标号为 29 的这行，字节码指令为 `invokedynamic`，该指令允许由应用级的代码来决定方法解析，所谓的应用级的代码其实是一个方法——被称为引导方法（Bootstrap Method），简称 BSM，BSM 会返回一个 CallSite（调用点） 对象，这个对象就和 `invokedynamic` 指令链接在一起。以后再执行这条 `invokedynamic` 指令时就不会创建新的 CallSite 对象。CallSite 其实就是一个 MethodHandle（方法句柄）的 holder，指向一个调用点真正执行的方法——此时就是 `StringConcatFactory.makeConcatWithConstants()` 方法。

“哥，你别再说了，再说我就听不懂了。”三妹打断了我的话。

“好吧，总之就是 Java 9 以后，JDK 用了另外一种方法来动态解释 + 号操作符，具体的实现方式在字节码指令层面已经看不到了，所以我就以 Java 8 来继续讲解吧。”

### 为什么要编译为 StringBuilder.append

“再回到《Java 开发手册》上的那段内容：循环体内，拼接字符串最好使用 StringBuilder 的 `append()` 方法，而不是 + 号操作符。原因就在于循环体内如果用 + 号操作符的话，就会产生大量的 StringBuilder 对象，不仅占用了更多的内存空间，还会让 Java 虚拟机不停的进行垃圾回收，从而降低了程序的性能。”

更好的写法就是在循环的外部新建一个 StringBuilder 对象，然后使用 `append()` 方法将循环体内的字符串添加进来：

```java
class Demo {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder();
        for (int i = 1; i < 10; i++) {
            String chenmo = "沉默";
            String wanger = "王二";
            sb.append(chenmo);
            sb.append(wanger);
        }
        System.out.println(sb);
    }
}
```

来做个小测试。

第一个，for 循环中使用”+”号操作符。

```java
String result = "";
for (int i = 0; i < 100000; i++) {
    result += "六六六";
}
```

第二个，for 循环外部新建 StringBuilder，循环体内使用 `append()` 方法。

```java
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 100000; i++) {
    sb.append("六六六");
}
```

“这两个小测试分别会耗时多长时间呢？三妹你来运行下。”

“哇，第一个小测试的执行时间是 6212 毫秒，第二个只用了不到 1 毫秒，差距也太大了吧！”三妹说。

“是的，这下明白了原因吧？”我说。

“是的，哥，原来如此。”

### append方法源码解析

“好了，三妹，来看一下 StringBuilder 类的 `append()` 方法的源码吧！”

```java
public StringBuilder append(String str) {
    super.append(str);
    return this;
}
```

这 3 行代码其实没啥看的。我们来看父类 AbstractStringBuilder 的 `append()` 方法：

```java
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

1）判断拼接的字符串是不是 null，如果是，当做字符串“null”来处理。`appendNull()` 方法的源码如下：

```java
private AbstractStringBuilder appendNull() {
    int c = count;
    ensureCapacityInternal(c + 4);
    final char[] value = this.value;
    value[c++] = 'n';
    value[c++] = 'u';
    value[c++] = 'l';
    value[c++] = 'l';
    count = c;
    return this;
}
```

2）获取字符串的长度。

3）`ensureCapacityInternal()` 方法的源码如下：

```java
private void ensureCapacityInternal(int minimumCapacity) {
    // overflow-conscious code
    if (minimumCapacity - value.length > 0) {
        value = Arrays.copyOf(value,
                newCapacity(minimumCapacity));
    }
}
```

由于字符串内部是用数组实现的，所以需要先判断拼接后的字符数组长度是否超过当前数组的长度，如果超过，先对数组进行扩容，然后把原有的值复制到新的数组中。

 4）将拼接的字符串 str 复制到目标数组 value 中。

```java
str.getChars(0, len, value, count)
```

5）更新数组的长度 count。

### String.concat 拼接字符串

“除了可以使用 + 号操作符，StringBuilder 的 `append()` 方法，还有其他的字符串拼接方法吗？”三妹问。

“有啊，比如说 String 类的 `concat()` 方法，有点像 StringBuilder 类的 `append()` 方法。”

```java
String chenmo = "沉默";
String wanger = "王二";
System.out.println(chenmo.concat(wanger));
```

可以来看一下 `concat()` 方法的源码。

```java
public String concat(String str) {
    int otherLen = str.length();
    if (otherLen == 0) {
        return this;
    }
    int len = value.length;
    char buf[] = Arrays.copyOf(value, len + otherLen);
    str.getChars(buf, len);
    return new String(buf, true);
}
```

1）如果拼接的字符串的长度为 0，那么返回拼接前的字符串。

2）将原字符串的字符数组 value 复制到变量 buf 数组中。

3）把拼接的字符串 str 复制到字符数组 buf 中，并返回新的字符串对象。

我一行一行地给三妹解释着。

“和 `+` 号操作符相比，`concat()` 方法在遇到字符串为 null 的时候，会抛出 NullPointerException，而“+”号操作符会把 null 当做是“null”字符串来处理。”

如果拼接的字符串是一个空字符串（""），那么 concat 的效率要更高一点,毕竟不需要 `new StringBuilder` 对象。

如果拼接的字符串非常多，`concat()` 的效率就会下降，因为创建的字符串对象越来越多。

“还有吗？”三妹似乎对字符串拼接很感兴趣。

“有，当然有。”

### String.join 拼接字符串

String 类有一个静态方法 `join()`，可以这样来使用。

```java
String chenmo = "沉默";
String wanger = "王二";
String cmower = String.join("", chenmo, wanger);
System.out.println(cmower);
```

第一个参数为字符串连接符，比如说：

```java
String message = String.join("-", "王二", "太特么", "有趣了");
```

输出结果为：`王二-太特么-有趣了`。

来看一下 join 方法的源码：

```java
public static String join(CharSequence delimiter, CharSequence... elements) {
    Objects.requireNonNull(delimiter);
    Objects.requireNonNull(elements);
    // Number of elements not likely worth Arrays.stream overhead.
    StringJoiner joiner = new StringJoiner(delimiter);
    for (CharSequence cs: elements) {
        joiner.add(cs);
    }
    return joiner.toString();
}
```

里面新建了一个叫 StringJoiner 的对象，然后通过 for-each 循环把可变参数添加了进来，最后调用 `toString()` 方法返回 String。

### StringUtils.join 拼接字符串

“实际的工作中，`org.apache.commons.lang3.StringUtils` 的 `join()` 方法也经常用来进行字符串拼接。”

```java
String chenmo = "沉默";
String wanger = "王二";
StringUtils.join(chenmo, wanger);
```

该方法不用担心 NullPointerException。

```java
StringUtils.join(null)            = null
StringUtils.join([])              = ""
StringUtils.join([null])          = ""
StringUtils.join(["a", "b", "c"]) = "abc"
StringUtils.join([null, "", "a"]) = "a"
```

来看一下源码：

```java
public static String join(final Object[] array, String separator, final int startIndex, final int endIndex) {
    if (array == null) {
        return null;
    }
    if (separator == null) {
        separator = EMPTY;
    }

    final StringBuilder buf = new StringBuilder(noOfItems * 16);

    for (int i = startIndex; i < endIndex; i++) {
        if (i > startIndex) {
            buf.append(separator);
        }
        if (array[i] != null) {
            buf.append(array[i]);
        }
    }
    return buf.toString();
}
```

内部使用的仍然是 StringBuilder。

“好了，三妹，关于字符串拼接的知识点我们就讲到这吧。注意 Java 9 以后，对 + 号操作符的解释和之前发生了变化，字节码指令已经不同了，等后面你学了[字节码指令](https://tobebetterjavaer.com/jvm/zijiema-zhiling.html)后我们再详细地讲一次。”我说。

“嗯，哥，你休息吧，我把这些例子再重新跑一遍。”三妹说。

---

GitHub 上标星 7600+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 7600+ 的 Java 教程](https://tobebetterjavaer.com/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)