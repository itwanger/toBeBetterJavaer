---
title: Java Scanner：扫描控制台输入的工具类
shortTitle: Scanner工具类
category:
  - Java核心
tag:
  - 常用工具类
description: 本文深入剖析了Java中的Scanner类，详细介绍了其用法、功能以及如何在实际应用中扫描控制台输入。通过具体代码示例，让您更好地理解Scanner的工作原理，使得控制台输入处理变得简单高效。掌握Scanner类，让Java编程更加得心应手。
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,二哥的Java进阶之路,Java进阶之路,Java入门,教程,java,Scanner,输入,java Scanner,java 扫描
---

# 9.1 Scanner工具类

Java 的 Scanner 类是一个方便在控制台扫描用户输入的工具类，虽然它也可以扫描文件内容，但我们通常更喜欢它扮演前面的角色，因为扫描文件可以通过[文件流](https://javabetter.cn/io/file-path.html)来完成。

接下来，我们通过几个简单的示例讲一下 Scanner 类。

### 01、扫描控制台输入

通常，我们会使用 Scanner 类来扫描控制台输入，尤其是对于初学 Java 的人来说，这样会非常的酷，因为终于可以拿到我们自己想要输入的数据了。

来看下面的示例：

```java
Scanner scanner = new Scanner(System.in); // 创建 Scanner 对象，从标准输入流中读取数据
System.out.print("请输入一个整数：");
int num = scanner.nextInt(); // 获取用户输入的整数
System.out.println("您输入的整数是：" + num);
scanner.nextLine(); // 读取换行符，避免影响下一次读取
System.out.print("请输入一个字符串：");
String str = scanner.nextLine(); // 获取用户输入的字符串
System.out.println("您输入的字符串是：" + str);
scanner.close(); // 关闭 Scanner 对象
```

运行后就可以在控制台交互了，对于新手来说，估计会觉得比较有趣。

![](https://cdn.tobebetterjavaer.com/stutymore/scanner-20230329150001.png)

其中 System.in 返回的是一个[字节输入流](https://javabetter.cn/io/stream.html) InputStream，和 System.out 刚好对应。

![](https://cdn.tobebetterjavaer.com/stutymore/scanner-20230329151635.png)

#### 1）nextLine

`nextLine()` 方法会扫描输入流中的字符，直到遇到行末尾的换行符 `\n`，然后将该行的内容作为字符串返回，同时，`nextLine()` 会将 Scanner 对象的位置移动到下一行的开头，以便下一次读取数据时从下一行的开头开始读取。

```java
Scanner scanner = new Scanner(System.in); // 创建 Scanner 对象，从标准输入流中读取数据
System.out.println("请输入多行文本，以空行结束：");
StringBuilder sb = new StringBuilder(); // 创建 StringBuilder 对象，用于保存读取的文本
String line = scanner.nextLine(); // 读取输入流中的第一行
while (!line.isEmpty()) { // 如果读取的行不为空，则继续读取下一行
    sb.append(line).append("\n"); // 将当前行的内容添加到 StringBuilder 对象中，并换行
    line = scanner.nextLine(); // 读取下一行
}
System.out.println("您输入的文本是：\n" + sb.toString()); // 打印读取的文本
scanner.close(); // 关闭 Scanner 对象
```

#### 2）nextInt

`nextInt()` 用于从输入流中读取下一个整数并返回，如果输入流中没有整数，或者不是整数，将抛出 InputMismatchException 异常。

![](https://cdn.tobebetterjavaer.com/stutymore/scanner-20230329153155.png)

#### 3）其他方法

除了以上两个常用的方法，Scanner 类中还有一些其他的方法：

- `boolean hasNext()`：检查输入流是否还有下一个标记。
- `boolean hasNextLine()`：检查输入流是否还有下一行。
- `String next()`：读取输入流中的下一个标记（使用默认的分隔符，通常是空格或换行符）。
- `double nextDouble()`：读取输入流中的下一个双精度浮点数。

来个 demo 吧。

```java
Scanner scanner = new Scanner(System.in); // 创建 Scanner 对象，从标准输入流中读取数据
System.out.print("请输入一个整数：");
if (scanner.hasNextInt()) { // 判断输入流中是否有下一个整数
    int num = scanner.nextInt(); // 读取输入流中的下一个整数
    System.out.println("您输入的整数是：" + num);
} else {
    System.out.println("输入的不是整数！");
}
scanner.nextLine(); // 读取输入流中的换行符

System.out.print("请输入多个单词，以空格分隔：");
while (scanner.hasNext()) { // 判断输入流中是否还有下一个标记
    String word = scanner.next(); // 读取输入流中的下一个单词
    System.out.println("您输入的单词是：" + word);
}
scanner.nextLine(); // 读取输入流中的换行符

System.out.print("请输入一个实数：");
if (scanner.hasNextDouble()) { // 判断输入流中是否有下一个实数
    double num = scanner.nextDouble(); // 读取输入流中的下一个实数
    System.out.println("您输入的实数是：" + num);
} else {
    System.out.println("输入的不是实数！");
}
scanner.nextLine(); // 读取输入流中的换行符

System.out.print("请输入一个字符串：");
if (scanner.hasNextLine()) { // 判断输入流中是否有下一行
    String line = scanner.nextLine(); // 读取输入流中的下一行
    System.out.println("您输入的字符串是：" + line);
} else {
    System.out.println("输入的不是字符串！");
}
scanner.close(); // 关闭 Scanner 对象
```

### 02、扫描文件

当然了，Scanner 也是可以用来扫描文件的，方式也非常的简单，以下是代码示例：

```java
try {
    // 创建 File 对象，表示要扫描的文件
    File file = new File("docs/安装环境.md");
    Scanner scanner = new Scanner(file); // 创建 Scanner 对象，从文件中读取数据
    while (scanner.hasNextLine()) { // 判断文件中是否有下一行
        String line = scanner.nextLine(); // 读取文件中的下一行
        System.out.println(line); // 打印读取的行
    }
    scanner.close(); // 关闭 Scanner 对象
} catch (FileNotFoundException e) {
    System.out.println("文件不存在！");
}
```

在上面的示例中，我们首先创建了一个 File 对象，表示要扫描的文件。然后，我们使用 Scanner 类的构造方法来创建 Scanner 对象，将文件作为参数传递给构造方法。在 while 循环中，我们使用 `hasNextLine()` 方法来判断文件中是否有下一行，如果有，则使用 `nextLine()` 方法读取该行字符串，并使用 `println()` 方法将其打印出来。最后，我们在程序结束前使用 `close()` 方法关闭 Scanner 对象。

除了使用循环+nextLine，我们还可以使用 useDelimiter 方法设置文件结束符 `\Z` 来读取整个文件。

```java
// 创建 File 对象，表示要扫描的文件
Scanner scanner = new Scanner(new File("docs/安装环境.md")); // 创建 Scanner 对象，从文件中读取数据
scanner.useDelimiter("\\Z"); // 设置分隔符为文件结尾
if (scanner.hasNext()) { // 判断文件中是否有下一行
    String content = scanner.next(); // 读取文件中的下一行
    System.out.println(content); // 打印读取的行
}
scanner.close(); // 关闭 Scanner 对象
```

正则表达式中的 `\Z` 表示输入的结尾，也就是文件结束符。在 Scanner 类中，我们可以使用 `\Z` 作为分隔符，以便读取整个文件内容。

### 03、查找匹配项

除了上面提到的扫描控制台输入流、文件，Scanner 还提供了另外四个以 find 开头的查找匹配项的方法：

![](https://cdn.tobebetterjavaer.com/stutymore/scanner-20230329162213.png)

来看示例：

```java
String input = "good good study, day day up.";
Scanner scanner = new Scanner(input);
String result;

// 使用 findInLine() 方法查找字符串中的单词
result = scanner.findInLine("study");
System.out.println("findInLine(): " + result); // 输出 "study"

// 使用 findWithinHorizon() 方法查找字符串中的单词
scanner = new Scanner(input);
result = scanner.findWithinHorizon("study", 20);
System.out.println("findWithinHorizon(): " + result); // 输出 "study"

scanner.close(); // 关闭 Scanner 对象
```

在上面的示例中，我们首先创建了一个字符串 input，表示要查找的文本。然后，我们使用 Scanner 类的构造方法创建 Scanner 对象，并将 input 作为输入流传递给该对象。接着，我们使用 `findInLine()` 方法和 `findWithinHorizon()` 方法分别查找字符串中的单词 "study"。其中，`findInLine()` 方法在当前行中查找匹配项，而 `findWithinHorizon()` 方法在指定的限制范围内查找匹配项。在本例中，我们将查找的范围限制为前 20 个字符。

需要注意的是，`findInLine()` 方法和 `findWithinHorizon()` 方法都返回找到的匹配项。如果没有找到匹配项，则返回 null。此外，`findInLine()` 方法和 `findWithinHorizon()` 方法都会忽略默认的分隔符，因此需要使用正则表达式来指定查找的模式。在本例中，我们使用了字符串 "study" 作为查找的模式。

当然我们也可以使用正则表达式，比如说我们要在下面的文件中查找 openjdk 这个关键字。

![](https://cdn.tobebetterjavaer.com/stutymore/scanner-20230329163743.png)

代码就可以这样写：

```java
// 创建 File 对象，表示要扫描的文件
Scanner scanner = new Scanner(new File("docs/安装环境.md")); // 创建 Scanner 对象，从文件中读取数据
Pattern pattern = Pattern.compile("op..jdk");
String result;
while ((result = scanner.findWithinHorizon(pattern, 0)) != null) {
    System.out.println("findWithinHorizon(): " + result);
}
```

我们用正则表达式 pattern 来表示 `openjdk` 这个关键字，`op..jdk` 中的 `.` 表示任意字符，可以通过查找正则表达式去了解。

然后我们使用 while 循环来查找文件中所有的 `openjdk`，其中 findWithinHorizon 方法的第二个参数如果为 0 则表示忽略边界，如果没找到，会返回 null。

![](https://cdn.tobebetterjavaer.com/stutymore/scanner-20230329165146.png)

由于文件中有两个 openjdk 关键字，所以输出结果如下所示：

![](https://cdn.tobebetterjavaer.com/stutymore/scanner-20230329165213.png)

### 04、小结

总之，Scanner 类是一个功能强大的输入处理工具类，不仅可以扫描控制台的输入流，还可以扫描文件，并且提供了多种方法来读取不同类型的数据，比如 `next()`, `nextInt()`, `nextLine()`, `nextDouble()` 等。

除此之外，还可以通过 `useDelimiter()` 方法设置分隔符，通过 `findInLine()`, `findWithinHorizon()` 查找匹配项等。

----

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)