---
title: 看完这篇，Java IO 不再混乱！
shortTitle: 看完这篇，Java IO不再混乱
category:
  - Java核心
tag:
  - Java IO
description: Java程序员进阶之路，小白的零基础Java教程，Java IO 体系看起来类很多，感觉很复杂，但其实是 IO 涉及的因素太多了。在设计 IO 相关的类时，编写者也不是从同一个方面考虑的，所以会给人一种很乱的感觉，并且还有设计模式的使用，更加难以使用这些 IO 类，所以特地对 Java 的 IO 做一个总结。
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,Java IO,io,输入输出流
---


“老王，Java IO 也太上头了吧？”新兵蛋子小二向头顶很凉快的老王抱怨道，“你瞧，我就按照传输方式对 IO 进行了一个简单的分类，就能搞出来这么多的玩意！”

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/shangtou-01.png)

好久没搞过 IO 了，老王看到这幅思维导图也是吃了一惊。想想也是，他当初学习 Java IO 的时候头也大，乌央乌央的一片，全是类，估计是所有 Java 包里面类最多的，一会是 Input 一会是 Output，一会是 Reader 一会是 Writer，真不知道 Java 的设计者是怎么想的。

看着肺都快要气炸的小二，老王深深地吸了一口气，耐心地对小二说：“主要是 Java 的设计者考虑得比较多吧，所以 IO 给人一种很乱的感觉，我来给你梳理一下。”

## 00、初识 Java IO

IO，即in和out，也就是输入和输出，指应用程序和外部设备之间的数据传递，常见的外部设备包括文件、管道、网络连接。

Java 中是通过流处理IO 的，那么什么是流？

流（Stream），是一个抽象的概念，是指一连串的数据（字符或字节），是以先进先出的方式发送信息的通道。

当程序需要读取数据的时候，就会开启一个通向数据源的流，这个数据源可以是文件，内存，或是网络连接。类似的，当程序需要写入数据的时候，就会开启一个通向目的地的流。这时候你就可以想象数据好像在这其中“流”动一样。

一般来说关于流的特性有下面几点：

- 先进先出：最先写入输出流的数据最先被输入流读取到。
- 顺序存取：可以一个接一个地往流中写入一串字节，读出时也将按写入顺序读取一串字节，不能随机访问中间的数据。（RandomAccessFile除外）
- 只读或只写：每个流只能是输入流或输出流的一种，不能同时具备两个功能，输入流只能进行读操作，对输出流只能进行写操作。在一个数据传输通道中，如果既要写入数据，又要读取数据，则要分别提供两个流。

## 01、传输方式划分

就按照你的那副思维导图来说吧。

传输方式有两种，字节和字符，那首先得搞明白字节和字符有什么区别，对吧？

字节（byte）是计算机中用来表示存储容量的一个计量单位，通常情况下，一个字节有 8 位（bit）。

字符（char）可以是计算机中使用的字母、数字、和符号，比如说 A 1 $ 这些。

通常来说，一个字母或者一个字符占用一个字节，一个汉字占用两个字节。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/shangtou-02.png)

具体还要看字符编码，比如说在 UTF-8 编码下，一个英文字母（不分大小写）为一个字节，一个中文汉字为三个字节；在 Unicode 编码中，一个英文字母为一个字节，一个中文汉字为两个字节。

 PS：关于字符编码，可以看前面的章节：[锟斤拷](https://tobebetterjavaer.com/basic-extra-meal/java-unicode.html)

明白了字节与字符的区别，再来看字节流和字符流就会轻松多了。

字节流用来处理二进制文件，比如说图片啊、MP3 啊、视频啊。

字符流用来处理文本文件，文本文件可以看作是一种特殊的二进制文件，只不过经过了编码，便于人们阅读。

换句话说就是，字节流可以处理一切文件，而字符流只能处理文本。

虽然 IO 类很多，但核心的就是 4 个抽象类：InputStream、OutputStream、Reader、Writer。

（**抽象大法真好**）

虽然 IO 类的方法也很多，但核心的也就 2 个：read 和 write。

**InputStream 类**

- `int read()`：读取数据
- `int read(byte b[], int off, int len)`：从第 off 位置开始读，读取 len 长度的字节，然后放入数组 b 中
- `long skip(long n)`：跳过指定个数的字节
- `int available()`：返回可读的字节数
- `void close()`：关闭流，释放资源

**OutputStream 类**

- `void write(int b)`： 写入一个字节，虽然参数是一个 int 类型，但只有低 8 位才会写入，高 24 位会舍弃（这块后面再讲）
- `void write(byte b[], int off, int len)`： 将数组 b 中的从 off 位置开始，长度为 len 的字节写入
- `void flush()`： 强制刷新，将缓冲区的数据写入
- `void close()`：关闭流

**Reader 类**

- `int read()`：读取单个字符
- `int read(char cbuf[], int off, int len)`：从第 off 位置开始读，读取 len 长度的字符，然后放入数组 b 中
- `long skip(long n)`：跳过指定个数的字符
- `int ready()`：是否可以读了
- `void close()`：关闭流，释放资源

**Writer 类**

- `void write(int c)`： 写入一个字符
- `void write( char cbuf[], int off, int len)`： 将数组 cbuf 中的从 off 位置开始，长度为 len 的字符写入
- `void flush()`： 强制刷新，将缓冲区的数据写入
- `void close()`：关闭流

理解了上面这些方法，基本上 IO 的灵魂也就全部掌握了。

字节流和字符流的区别：

- 字节流一般用来处理图像、视频、音频、PPT、Word等类型的文件。字符流一般用于处理纯文本类型的文件，如TXT文件等，但不能处理图像视频等非文本文件。用一句话说就是：字节流可以处理一切文件，而字符流只能处理纯文本文件。
- 字节流本身没有缓冲区，缓冲字节流相对于字节流，效率提升非常高。而字符流本身就带有缓冲区，缓冲字符流相对于字符流效率提升就不是那么大了。

以写文件为例，我们查看字符流的源码，发现确实有利用到缓冲区：

```java
private char[] writeBuffer;

/**
 * Size of writeBuffer, must be >= 1
 */
private static final int WRITE_BUFFER_SIZE = 1024;

public void write(String str, int off, int len) throws IOException {
    synchronized (lock) {
        char cbuf[];
        if (len <= WRITE_BUFFER_SIZE) {
            if (writeBuffer == null) {
                writeBuffer = new char[WRITE_BUFFER_SIZE];
            }
            cbuf = writeBuffer;
        } else {    // Don't permanently allocate very large buffers.
            cbuf = new char[len];
        }
        str.getChars(off, (off + len), cbuf, 0);
        write(cbuf, 0, len);
    }
}
```

## 02、操作对象划分

小二，你细想一下，IO IO，不就是输入输出（Input/Output）嘛：

- Input：将外部的数据读入内存，比如说把文件从硬盘读取到内存，从网络读取数据到内存等等
- Output：将内存中的数据写入到外部，比如说把数据从内存写入到文件，把数据从内存输出到网络等等。

所有的程序，在执行的时候，都是在内存上进行的，一旦关机，内存中的数据就没了，那如果想要持久化，就需要把内存中的数据输出到外部，比如说文件。

文件操作算是 IO 中最典型的操作了，也是最频繁的操作。那其实你可以换个角度来思考，比如说按照 IO 的操作对象来思考，IO 就可以分类为：文件、数组、管道、基本数据类型、缓冲、打印、对象序列化/反序列化，以及转换等。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/shangtou-03.png)


### **1）文件**

文件流也就是直接操作文件的流，可以细分为字节流（FileInputStream 和 FileOuputStream）和字符流（FileReader 和 FileWriter）。

FileInputStream 的例子：

```java
int b;
FileInputStream fis1 = new FileInputStream("fis.txt");
// 循环读取
while ((b = fis1.read())!=-1) {
    System.out.println((char)b);
}
// 关闭资源
fis1.close();
```

FileOutputStream 的例子：

```java
FileOutputStream fos = new FileOutputStream("fos.txt");
fos.write("沉默王二".getBytes());
fos.close();
```

FileReader 的例子：

```java
int b = 0;
FileReader fileReader = new FileReader("read.txt");
// 循环读取
while ((b = fileReader.read())!=-1) {
    // 自动提升类型提升为 int 类型，所以用 char 强转
    System.out.println((char)b);
}
// 关闭流
fileReader.close();
```

FileWriter 的例子：

```java
FileWriter fileWriter = new FileWriter("fw.txt");
char[] chars = "沉默王二".toCharArray();
fileWriter.write(chars, 0, chars.length);
fileWriter.close();
```

当掌握了文件的输入输出，其他的自然也就掌握了，都大差不差。

### **2）数组**

通常来说，针对文件的读写操作，使用文件流配合缓冲流就够用了，但为了提升效率，频繁地读写文件并不是太好，那么就出现了数组流，有时候也称为内存流。

ByteArrayInputStream 的例子：

```java
InputStream is =new BufferedInputStream(
        new ByteArrayInputStream(
                "沉默王二".getBytes(StandardCharsets.UTF_8)));
//操作
byte[] flush =new byte[1024];
int len =0;
while(-1!=(len=is.read(flush))){
    System.out.println(new String(flush,0,len));
}
//释放资源
is.close();
```

ByteArrayOutputStream 的例子：

```java
ByteArrayOutputStream bos =new ByteArrayOutputStream();
byte[] info ="沉默王二".getBytes();
bos.write(info, 0, info.length);
//获取数据
byte[] dest =bos.toByteArray();
//释放资源
bos.close();
```

### **3）管道**

Java 中的管道和 Unix/Linux 中的管道不同，在 Unix/Linux 中，不同的进程之间可以通过管道来通信，但 Java 中，通信的双方必须在同一个进程中，也就是在同一个 JVM 中，管道为线程之间的通信提供了通信能力。

一个线程通过 PipedOutputStream 写入的数据可以被另外一个线程通过相关联的 PipedInputStream 读取出来。

```java
final PipedOutputStream pipedOutputStream = new PipedOutputStream();
final PipedInputStream pipedInputStream = new PipedInputStream(pipedOutputStream);

Thread thread1 = new Thread(new Runnable() {
    @Override
    public void run() {
        try {
            pipedOutputStream.write("沉默王二".getBytes(StandardCharsets.UTF_8));
            pipedOutputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
});

Thread thread2 = new Thread(new Runnable() {
    @Override
    public void run() {
        try {
            byte[] flush =new byte[1024];
            int len =0;
            while(-1!=(len=pipedInputStream.read(flush))){
                System.out.println(new String(flush,0,len));
            }

            pipedInputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
});
thread1.start();
thread2.start();
```

### **4）基本数据类型**

基本数据类型输入输出流是一个字节流，该流不仅可以读写字节和字符，还可以读写基本数据类型。

DataInputStream 提供了一系列可以读基本数据类型的方法：

```java
DataInputStream dis = new DataInputStream(new FileInputStream(“das.txt”)) ;
byte b = dis.readByte() ;
short s = dis.readShort() ;
int i = dis.readInt();
long l = dis.readLong() ;
float f = dis.readFloat() ;
double d = dis.readDouble() ;
boolean bb = dis.readBoolean() ;
char ch = dis.readChar() ;
```

DataOutputStream 提供了一系列可以写基本数据类型的方法：

```java
DataOutputStream das = new DataOutputStream(new FileOutputStream(“das.txt”));
das.writeByte(10);
das.writeShort(100);
das.writeInt(1000);
das.writeLong(10000L);
das.writeFloat(12.34F);
das.writeDouble(12.56);
das.writeBoolean(true);
das.writeChar('A');
```

### **5）缓冲**

CPU 很快，它比内存快 100 倍，比磁盘快百万倍。那也就意味着，程序和内存交互会很快，和硬盘交互相对就很慢，这样就会导致性能问题。

为了减少程序和硬盘的交互，提升程序的效率，就引入了缓冲流，也就是类名前缀带有 Buffer 的那些，比如说 BufferedInputStream、BufferedOutputStream、BufferedReader、BufferedWriter。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/shangtou-04.png)


缓冲流在内存中设置了一个缓冲区，只有缓冲区存储了足够多的带操作的数据后，才会和内存或者硬盘进行交互。简单来说，就是一次多读/写点，少读/写几次，这样程序的性能就会提高。

### **6）打印**

恐怕 Java 程序员一生当中最常用的就是打印流了：`System.out` 其实返回的就是一个 PrintStream 对象，可以用来打印各式各样的对象。

```java
System.out.println("沉默王二是真的二！");
```

PrintStream 最终输出的是字节数据，而 PrintWriter 则是扩展了 Writer 接口，所以它的 `print()/println()` 方法最终输出的是字符数据。使用上几乎和 PrintStream 一模一样。

```java
StringWriter buffer = new StringWriter();
try (PrintWriter pw = new PrintWriter(buffer)) {
    pw.println("沉默王二");
}
System.out.println(buffer.toString());
```

### **7）对象序列化/反序列化**

序列化本质上是将一个 Java 对象转成字节数组，然后可以将其保存到文件中，或者通过网络传输到远程。

```java
ByteArrayOutputStream buffer = new ByteArrayOutputStream();
try (ObjectOutputStream output = new ObjectOutputStream(buffer)) {
    output.writeUTF("沉默王二");
}
System.out.println(Arrays.toString(buffer.toByteArray()));
```

与其对应的，有序列化，就有反序列化，也就是再将字节数组转成 Java 对象的过程。

```java
try (ObjectInputStream input = new ObjectInputStream(new FileInputStream(
        new File("Person.txt")))) {
    String s = input.readUTF();
}
```


### **8）转换**

InputStreamReader 是从字节流到字符流的桥连接，它使用指定的字符集读取字节并将它们解码为字符。

```java
InputStreamReader isr = new InputStreamReader(
        new FileInputStream("demo.txt"));
char []cha = new char[1024];
int len = isr.read(cha);
System.out.println(new String(cha,0,len));
isr.close();
```

OutputStreamWriter 将一个字符流的输出对象变为字节流的输出对象，是字符流通向字节流的桥梁。

```java
File f = new File("test.txt") ;
Writer out = new OutputStreamWriter(new FileOutputStream(f)) ; // 字节流变为字符流  
out.write("hello world!!") ;    // 使用字符流输出  
out.close() ;
```

“小二啊，你看，经过我的梳理，是不是感觉 IO 也没多少东西！针对不同的场景、不同的业务，选择对应的 IO 流就可以了，用法上就是读和写。”老王一口气讲完这些，长长的舒了一口气。

此时此刻的小二，还沉浸在老王的滔滔不绝中。不仅感觉老王的肺活量是真的大，还感慨老王不愧是工作了十多年的“老油条”，一下子就把自己感觉头大的 IO 给梳理得很清晰了。

---------

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)










