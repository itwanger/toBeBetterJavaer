---
title: Java 打印流：PrintStream 和 PrintWriter
shortTitle: 打印流
category:
  - Java核心
tag:
  - Java IO
description: 本文详细介绍了 Java 打印流的核心组成，着重分析了 PrintStream 和 PrintWriter 的功能与用途。同时，文章还提供了打印流的实际应用示例和常用方法。阅读本文，将帮助您更深入地了解 Java 打印流以及 PrintStream 和 PrintWriter 在 Java 编程中的关键地位，提高输出操作的便捷性和效率。
head:
  - - meta
    - name: keywords
      content: Java,Java IO,打印流,PrintStream,PrintWriter,java 打印流,java PrintStream,java PrintWriter
---

# 7.7 打印流

在我的职业生涯中， `System.out.println()` 的使用频率恐怕不亚于 main 方法的使用频率。其中 `System.out` 返回的正是打印流 `PrintStream` 。

除此之外，还有它还有一个孪生兄弟，PrintWriter。PrintStream 是 OutputStream 的子类，PrintWriter 是 Writer 的子类，也就是说，一个[字节流](https://javabetter.cn/io/stream.html)，一个是[字符流](https://javabetter.cn/io/reader-writer.html)。

打印流具有以下几个特点：

* 可以自动进行数据类型转换：打印流可以将各种数据类型转换为字符串，并输出到指定的输出流中。
* 可以自动进行换行操作：打印流可以在输出字符串的末尾自动添加换行符，方便输出多个字符串时的格式控制。
* 可以输出到控制台或者文件中：打印流可以将数据输出到控制台或者文件中，方便调试和日志记录（尽管生产环境下更推荐使用 [Logback](https://javabetter.cn/gongju/logback.html)、ELK 等）。

PrintStream 类的常用方法包括：

- `print()`：输出一个对象的字符串表示形式。
- `println()`：输出一个对象的字符串表示形式，并在末尾添加一个换行符。
- `printf()`：使用指定的格式字符串和参数输出格式化的字符串。

来一个示例体验一下。

```java
PrintStream ps = System.out;
ps.println("沉默王二");
ps.print("沉 ");
ps.print("默 ");
ps.print("王 ");
ps.print("二 ");
ps.println();

ps.printf("姓名：%s，年龄：%d，成绩：%f", "沉默王二", 18, 99.9);
```

在这个示例中，我们创建了一个 PrintStream 对象 ps，它输出到控制台。我们使用 ps 的 print 和 println 方法输出了一些字符串。

使用 printf 方法输出了一个格式化字符串，其中 %s、%d 和 %.2f 分别表示字符串、整数和浮点数的格式化输出。我们使用逗号分隔的参数列表指定了要输出的值。

来详细说说 printf 方法哈。

```java
public PrintStream printf(String format, Object... args);
```

其中，format 参数是格式化字符串，args 参数是要输出的参数列表。格式化字符串包含了普通字符和转换说明符。普通字符是指除了转换说明符之外的字符，它们在输出时直接输出。转换说明符是由百分号（%）和一个或多个字符组成的，用于指定输出的格式和数据类型。

下面是 Java 的常用转换说明符及对应的输出格式：

- `%s`：输出一个字符串。
- `%d` 或 `%i`：输出一个十进制整数。
- `%x` 或 `%X`：输出一个十六进制整数，`%x` 输出小写字母，`%X` 输出大写字母。
- `%f` 或 `%F`：输出一个浮点数。
- `%e` 或 `%E`：输出一个科学计数法表示的浮点数，`%e` 输出小写字母 e，`%E` 输出大写字母 E。
- `%g` 或 `%G`：输出一个浮点数，自动选择 `%f` 或 `%e/%E` 格式输出。
- `%c`：输出一个字符。
- `%b`：输出一个布尔值。
- `%h`：输出一个哈希码（16进制）。
- `%n`：换行符。

除了转换说明符之外，Java 的 printf 方法还支持一些修饰符，用于指定输出的宽度、精度、对齐方式等。

- 宽度修饰符：用数字指定输出的最小宽度，如果输出的数据不足指定宽度，则在左侧或右侧填充空格或零。
- 精度修饰符：用点号（.）和数字指定浮点数或字符串的精度，对于浮点数，指定小数点后的位数，对于字符串，指定输出的字符数。
- 对齐修饰符：用减号（-）或零号（0）指定输出的对齐方式，减号表示左对齐，零号表示右对齐并填充零。

下面是一些示例：

```java
int num = 123;
System.out.printf("%5d\n", num); // 输出 "  123"
System.out.printf("%-5d\n", num); // 输出 "123  "
System.out.printf("%05d\n", num); // 输出 "00123"

double pi = Math.PI;
System.out.printf("%10.2f\n", pi); // 输出 "      3.14"
System.out.printf("%-10.4f\n", pi); // 输出 "3.1416    "

String name = "沉默王二";
System.out.printf("%10s\n", name); // 输出 "     沉默王二"
System.out.printf("%-10s\n", name); // 输出 "沉默王二     "
```

具体来说，

- 我们使用 `%5d` 来指定输出的整数占据 5 个字符的宽度，不足部分在左侧填充空格。
- 使用 `%-5d` 来指定输出的整数占据 5 个字符的宽度，不足部分在右侧填充空格。
- 使用 `%05d` 来指定输出的整数占据 5 个字符的宽度，不足部分在左侧填充 0。
- 使用 `%10.2f` 来指定输出的浮点数占据 10 个字符的宽度，保留 2 位小数，不足部分在左侧填充空格。
- 使用 `%-10.4f` 来指定输出的浮点数占据 10 个字符的宽度，保留 4 位小数，不足部分在右侧填充空格。
- 使用 `%10s` 来指定输出的字符串占据 10 个字符的宽度，不足部分在左侧填充空格。
- 使用 `%-10s` 来指定输出的字符串占据 10 个字符的宽度，不足部分在右侧填充空格。

接下来，我们给出一个 PrintWriter 的示例：

```java
PrintWriter writer = new PrintWriter(new FileWriter("output.txt"));
writer.println("沉默王二");
writer.printf("他的年纪为 %d.\n", 18);
writer.close();
```

首先，我们创建一个 PrintWriter 对象，它的构造函数接收一个 Writer 对象作为参数。在这里，我们使用 FileWriter 来创建一个输出文件流，并将其作为参数传递给 PrintWriter 的构造函数。然后，我们使用 PrintWriter 的 println 和 printf 方法来输出两行内容，其中 printf 方法可以接收格式化字符串。最后，我们调用 PrintWriter 的 close 方法来关闭输出流。

我们也可以不创建 FileWriter 对象，直接指定文件名。

```java
PrintWriter pw = new PrintWriter("output.txt");
pw.println("沉默王二");
pw.printf("他的年纪为 %d.\n", 18);
pw.close();
```

好，关于打印流我们就说这么多，比较简单。至于 printf 的一些规则，用到的时候可以再查使用说明或者看 API 文档就可以了，记不住没关系。

---------

GitHub 上标星 9300+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 9300+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
