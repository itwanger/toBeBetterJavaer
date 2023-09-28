---
title: Java 字节流：Java IO 的基石
shortTitle: 字节流
category:
  - Java核心
tag:
  - Java IO
description: 本文详细介绍了字节流在 Java IO 操作中的核心作用，阐述了字节流在处理各种输入输出任务时的重要性。同时，文章还提供了字节流的实际应用示例和常用方法。阅读本文，将帮助您更深入地了解字节流及其在 Java 编程中的关键地位，提高 IO 操作效率。
head:
  - - meta
    - name: keywords
      content: Java,IO,java io,OutputStream,InputStream,字节流,java 字节流, 输入输出
---

# 7.3 字节流

我们必须得明确一点，一切文件（文本、视频、图片）的数据都是以二进制的形式存储的，传输时也是。所以，字节流可以传输任意类型的文件数据。

### 字节输出流（OutputStream）

`java.io.OutputStream` 是**字节输出流**的**超类**（父类），我们来看一下它定义的一些共性方法：

1、 `close()` ：关闭此输出流并释放与此流相关联的系统资源。

2、 `flush()` ：刷新此输出流并强制缓冲区的字节被写入到目的地。

3、 `write(byte[] b)`：将 b.length 个字节从指定的字节数组写入此输出流。

4、 `write(byte[] b, int off, int len)` ：从指定的字节数组写入 len 字节到此输出流，从偏移量 off开始。 **也就是说从off个字节数开始一直到len个字节结束**

### FileOutputStream类

`OutputStream` 有很多子类，我们从最简单的一个子类 FileOutputStream 开始。看名字就知道是文件输出流，用于将数据写入到文件。

#### **1）FileOutputStrea 的构造方法**

1、使用文件名创建 FileOutputStream 对象。

```java
String fileName = "example.txt";
FileOutputStream fos = new FileOutputStream(fileName);
```

以上代码使用文件名 "example.txt" 创建一个 FileOutputStream 对象，将数据写入到该文件中。**如果文件不存在，则创建一个新文件；如果文件已经存在，则覆盖原有文件**。

2、使用文件对象创建 FileOutputStream 对象。

```java
File file = new File("example.txt");
FileOutputStream fos = new FileOutputStream(file);
```

FileOutputStream 的使用示例：

```java
FileOutputStream fos = null;
try {
  fos = new FileOutputStream("example.txt");
  fos.write("沉默王二".getBytes());
} catch (IOException e) {
  e.printStackTrace();
} finally {
  if (fos != null) {
    try {
      fos.close();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
```

以上代码创建了一个 FileOutputStream 对象，将字符串 "沉默王二" 写入到 example.txt 文件中，并在最后关闭了输出流。
 

#### **2）FileOutputStream 写入字节数据**

使用 FileOutputStream 写入字节数据主要通过 `write` 方法：

```java
write(int b)
write(byte[] b)
write(byte[] b,int off,int len)  //从`off`索引开始，`len`个字节
```
 

①、**写入字节**：`write(int b)` 方法，每次可以写入一个字节，代码如下：

```java
// 使用文件名称创建流对象
FileOutputStream fos = new FileOutputStream("fos.txt");     
// 写出数据
fos.write(97); // 第1个字节
fos.write(98); // 第2个字节
fos.write(99); // 第3个字节
// 关闭资源
fos.close();
```

字符 a 的 [ASCII 值](https://javabetter.cn/basic-extra-meal/java-unicode.html)为 97，字符 b 的ASCII 值为 98，字符 b 的ASCII 值为 99。也就是说，以上代码可以写成：

```java
// 使用文件名称创建流对象
FileOutputStream fos = new FileOutputStream("fos.txt");     
// 写出数据
fos.write('a'); // 第1个字节
fos.write('b'); // 第2个字节
fos.write('c'); // 第3个字节
// 关闭资源
fos.close();
```

当使用 `write(int b)` 方法写出一个字节时，参数 b 表示要写出的字节的整数值。由于一个字节只有8位，因此参数 b 的取值范围应该在 0 到 255 之间，超出这个范围的值将会被截断。例如，如果参数 b 的值为 -1，那么它会被截断为 255，如果参数 b 的值为 256，那么它会被截断为 0。

在将参数 b 写入输出流中时，write(int b) 方法只会将参数 b 的低8位写入，而忽略高24位。这是因为在 Java 中，整型类型（包括 byte、short、int、long）在内存中以二进制补码形式表示。当将一个整型值传递给 write(int b) 方法时，方法会将该值转换为 byte 类型，只保留二进制补码的低8位，而忽略高24位。

例如，如果要写出的整数为 0x12345678，它的二进制补码表示为 0001 0010 0011 0100 0101 0110 0111 1000。当使用 write(int b) 方法写出该整数时，只会将二进制补码的低8位 0111 1000 写出，而忽略高24位 0001 0010 0011 0100 0101 0110。这就是参数 b 的高24位被忽略的原因。

0111 1000 是一个8位的二进制数，它对应的十进制数是 120，对应的 ASCII 码字符是小写字母 "x"。在 ASCII 码表中，小写字母 "x" 的十进制 ASCII 码值为 120。因此，如果使用 write(int b) 方法写出一个字节值为 0x78（十进制为 120），那么写出的结果就是小写字母 "x"。

我们来验证一下：

```java
FileOutputStream fos = null;
try {
    fos = new FileOutputStream("example.txt");

    fos.write(120);
    fos.write('x');
    fos.write(0x12345678);
} catch (IOException e) {
    e.printStackTrace();
} finally {
    if (fos != null) {
        try {
            fos.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

来看一下结果：

![](https://cdn.tobebetterjavaer.com/studymore/stream-20230318105229.png)

果然是 3 个 x。

②、**写入字节数组**：`write(byte[] b)`，代码示例：

```java
// 使用文件名称创建流对象
FileOutputStream fos = new FileOutputStream("fos.txt");     
// 字符串转换为字节数组
byte[] b = "沉默王二有点帅".getBytes();
// 写入字节数组数据
fos.write(b);
// 关闭资源
fos.close();
```
 

③、**写入指定长度字节数组**：`write(byte[] b, int off, int len)`，代码示例：

```java
// 使用文件名称创建流对象
FileOutputStream fos = new FileOutputStream("fos.txt");     
// 字符串转换为字节数组
byte[] b = "abcde".getBytes();
// 从索引2开始，2个字节。索引2是c，两个字节，也就是cd。
fos.write(b,2,2);
// 关闭资源
fos.close();
```
 

#### **3）FileOutputStream实现数据追加、换行**

在上面的代码示例中，每次运行程序都会创建新的输出流对象，于是文件中的数据也会被清空。如果想保留目标文件中的数据，还能继续**追加新数据**，该怎么办呢？以及如何实现**换行**呢？

其实很简单。

我们来学习`FileOutputStream`的另外两个构造方法，如下：

1、使用文件名和追加标志创建 FileOutputStream 对象

```java
String fileName = "example.txt";
boolean append = true;
FileOutputStream fos = new FileOutputStream(fileName, append);
```

以上代码使用文件名 "example.txt" 和追加标志创建一个 FileOutputStream 对象，将数据追加到该文件的末尾。如果文件不存在，则创建一个新文件；如果文件已经存在，则在文件末尾追加数据。

2、使用文件对象和追加标志创建 FileOutputStream 对象

```java
File file = new File("example.txt");
boolean append = true;
FileOutputStream fos = new FileOutputStream(file, append);
```

以上代码使用文件对象和追加标志创建一个 FileOutputStream 对象，将数据追加到该文件的末尾。

这两个构造方法，第二个参数中都需要传入一个boolean类型的值，`true` 表示追加数据，`false` 表示不追加也就是清空原有数据。

实现数据追加代码如下：

```java
// 使用文件名称创建流对象
FileOutputStream fos = new FileOutputStream("fos.txt",true);     
// 字符串转换为字节数组
byte[] b = "abcde".getBytes();
// 写出从索引2开始，2个字节。索引2是c，两个字节，也就是cd。
fos.write(b);
// 关闭资源
fos.close();
```

多次运行代码，你会发现数据在不断地追加。

在 Windows 系统中，换行符号是`\r\n`，具体代码如下：

```java
String filename = "example.txt";
FileOutputStream fos = new FileOutputStream(filename, true);  // 追加模式
String content = "沉默王二\r\n";  // 使用回车符和换行符的组合
fos.write(content.getBytes());
fos.close();
```

在 macOS 系统中，换行符是 `\n`，具体代码如下：

```java
String filename = "example.txt";
FileOutputStream fos = new FileOutputStream(filename, true);  // 追加模式
String content = "沉默王二\n";  // 只使用换行符
fos.write(content.getBytes());
fos.close();
```

这里再唠一唠回车符和换行符。
 
回车符（`\r`）和换行符（`\n`）是计算机中常见的控制字符，用于表示一行的结束或者换行的操作。它们在不同的操作系统和编程语言中的使用方式可能有所不同。

在 Windows 系统中，通常使用回车符和换行符的组合（`\r\n`）来表示一行的结束。在文本文件中，每行的末尾都会以一个回车符和一个换行符的组合结束。这是由于早期的打印机和终端设备需要回车符和换行符的组合来完成一行的结束和换行操作。在 Windows 中，文本编辑器和命令行终端等工具都支持使用回车符和换行符的组合来表示一行的结束。

而在 macOS 和 Linux 系统中，通常只使用换行符（`\n`）来表示一行的结束。在文本文件中，每行的末尾只有一个换行符。这是由于早期 Unix 系统中的终端设备只需要换行符来完成一行的结束和跨行操作。在 macOS 和 Linux 中，文本编辑器和终端等工具都支持使用换行符来表示一行的结束。

在编程语言中，通常也会使用回车符和换行符来进行字符串的操作。例如，在 Java 中，字符串中的回车符可以用 "`\r`" 来表示，换行符可以用 "`\n`" 来表示。在通过输入输出流进行文件读写时，也需要注意回车符和换行符的使用方式和操作系统的差异。

### 字节输入流（InputStream）

`java.io.InputStream` 是**字节输入流**的**超类**（父类），我们来看一下它的一些共性方法：

1、`close()` ：关闭此输入流并释放与此流相关的系统资源。

2、`int read()`： 从输入流读取数据的下一个字节。

3、`read(byte[] b)`： 该方法返回的 int 值代表的是读取了多少个字节，读到几个返回几个，读取不到返回-1

### FileInputStream类

InputStream 有很多子类，我们从最简单的一个子类 FileInputStream 开始。看名字就知道是文件输入流，用于将数据从文件中读取数据。

#### 1）FileInputStream的构造方法

1、`FileInputStream(String name)`：创建一个 FileInputStream 对象，并打开指定名称的文件进行读取。文件名由 name 参数指定。如果文件不存在，将会抛出 FileNotFoundException 异常。

2、`FileInputStream(File file)`：创建一个 FileInputStream 对象，并打开指定的 File 对象表示的文件进行读取。

代码示例如下：
 
```java
// 创建一个 FileInputStream 对象
FileInputStream fis = new FileInputStream("test.txt");

// 读取文件内容
int data;
while ((data = fis.read()) != -1) {
    System.out.print((char) data);
}

// 关闭输入流
fis.close();
```

#### 2）FileInputStream读取字节数据

①、**读取字节**：`read()`方法会读取一个字节并返回其整数表示。如果已经到达文件的末尾，则返回 -1。如果在读取时发生错误，则会抛出 IOException 异常。

代码示例如下：

```java
// 创建一个 FileInputStream 对象
FileInputStream fis = new FileInputStream("test.txt");

// 读取文件内容
int data;
while ((data = fis.read()) != -1) {
    System.out.print((char) data);
}

// 关闭输入流
fis.close();
```
 

②、**使用字节数组读取**：`read(byte[] b)` 方法会从输入流中最多读取 b.length 个字节，并将它们存储到缓冲区数组 b 中。

代码示例如下：

```java
// 创建一个 FileInputStream 对象
FileInputStream fis = new FileInputStream("test.txt");

// 读取文件内容到缓冲区
byte[] buffer = new byte[1024];
int count;
while ((count = fis.read(buffer)) != -1) {
    System.out.println(new String(buffer, 0, count));
}

// 关闭输入流
fis.close();
```

#### 3）字节流FileInputstream复制图片

原理很简单，就是把图片信息读入到字节输入流中，再通过字节输出流写入到文件中。

代码示例如下所示：

```java
// 创建一个 FileInputStream 对象以读取原始图片文件
FileInputStream fis = new FileInputStream("original.jpg");

// 创建一个 FileOutputStream 对象以写入复制后的图片文件
FileOutputStream fos = new FileOutputStream("copy.jpg");

// 创建一个缓冲区数组以存储读取的数据
byte[] buffer = new byte[1024];
int count;

// 读取原始图片文件并将数据写入复制后的图片文件
while ((count = fis.read(buffer)) != -1) {
    fos.write(buffer, 0, count);
}

// 关闭输入流和输出流
fis.close();
fos.close();
```
 
上面的代码创建了一个 FileInputStream 对象以读取原始图片文件，并创建了一个 FileOutputStream 对象以写入复制后的图片文件。然后，使用 while 循环逐个读取原始图片文件中的字节，并将其写入复制后的图片文件中。最后，关闭输入流和输出流释放资源。

### 小结

InputStream 是字节输入流的抽象类，它定义了读取字节数据的方法，如 `read()`、`read(byte[] b)`、`read(byte[] b, int off, int len)` 等。OutputStream 是字节输出流的抽象类，它定义了写入字节数据的方法，如 `write(int b)`、`write(byte[] b)`、`write(byte[] b, int off, int len)` 等。这两个抽象类是字节流的基础。

FileInputStream 是从文件中读取字节数据的流，它继承自 InputStream。FileOutputStream 是将字节数据写入文件的流，它继承自 OutputStream。这两个类是字节流最常用的实现类之一。

---------

GitHub 上标星 9300+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 9300+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)