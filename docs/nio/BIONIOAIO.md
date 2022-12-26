---
title: 如何给女朋友解释清楚BIO、NIO和AIO？
shortTitle: BIO、NIO和AIO之间的区别
category:
  - Java核心
tag:
  - Java NIO
description: Java程序员进阶之路，小白的零基础Java教程，BIO、NIO和AIO之间的区别
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,IO,BIO,NIO,AIO
---


周末午后，在家里面进行电话面试，我问了面试者几个关于 IO 的问题，其中包括什么是 BIO、NIO 和 AIO？三者有什么区别？具体如何使用等问题，但是面试者回答的并不是很满意。于是我在面试评价中写道："对 Java 的 IO 提醒理解不够深入"。恰好被女朋友看到了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/BIONIOAIO-1.jpg)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/BIONIOAIO-2.jpg)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/BIONIOAIO-3.gif)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/BIONIOAIO-4.jpg)

Java IO

IO，常协作 I/O，是 Input/Output 的简称，即输入/输出。通常指数据在内部存储器（内存）和外部存储器（硬盘、优盘等）或其他周边设备之间的输入和输出。

输入/输出是信息处理系统（例如计算机）与外部世界（可能是人类或另一信息处理系统）之间的通信。

输入是系统接收的信号或数据，输出则是从其发送的信号或数据。

在 Java 中，提供了一系列 API，可以供开发者来读写外部数据或文件。我们称这些 API 为 Java IO。

IO 是 Java 中比较重要，且比较难的知识点，主要是因为随着 Java 的发展，目前有三种 IO 共存。分别是 BIO、NIO 和 AIO。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/BIONIOAIO-5.jpg)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/BIONIOAIO-6.gif)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/BIONIOAIO-7.gif)

Java BIO

BIO 全称Block-IO 是一种**同步且阻塞**的通信模式。是一个比较传统的通信方式，模式简单，使用方便。但并发处理能力低，通信耗时，依赖网速。

Java NIO

Java NIO，全程 Non-Block IO ，是 Java SE 1.4 版以后，针对网络传输效能优化的新功能。是一种**非阻塞同步**的通信模式。

NIO 与原来的 I/O 有同样的作用和目的, 他们之间最重要的区别是数据打包和传输的方式。原来的 I/O 以流的方式处理数据，而 NIO 以块的方式处理数据。

面向流的 I/O 系统一次一个字节地处理数据。一个输入流产生一个字节的数据，一个输出流消费一个字节的数据。

面向块的 I/O 系统以块的形式处理数据。每一个操作都在一步中产生或者消费一个数据块。按块处理数据比按(流式的)字节处理数据要快得多。但是面向块的 I/O 缺少一些面向流的 I/O 所具有的优雅性和简单性。

Java AIO

Java AIO，全程 Asynchronous IO，是**异步非阻塞**的 IO。是一种非阻塞异步的通信模式。

在 NIO 的基础上引入了新的异步通道的概念，并提供了异步文件通道和异步套接字通道的实现。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/BIONIOAIO-8.jpg)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/BIONIOAIO-9.jpg)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/BIONIOAIO-10.jpg)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/BIONIOAIO-11.gif)

三种 IO 的区别

首先，我们站在宏观的角度，重新画一下重点：

**BIO （Blocking I/O）：同步阻塞 I/O 模式。**

**NIO （New I/O）：同步非阻塞模式。**

**AIO （Asynchronous I/O）：异步非阻塞 I/O 模型。**

同步阻塞模式：这种模式下，我们的工作模式是先来到厨房，开始烧水，并坐在水壶面前一直等着水烧开。

同步非阻塞模式：这种模式下，我们的工作模式是先来到厨房，开始烧水，但是我们不一直坐在水壶前面等，而是回到客厅看电视，然后每隔几分钟到厨房看一下水有没有烧开。

异步非阻塞 I/O 模型：这种模式下，我们的工作模式是先来到厨房，开始烧水，我们不一直坐在水壶前面等，也不隔一段时间去看一下，而是在客厅看电视，水壶上面有个开关，水烧开之后他会通知我。

阻塞 VS 非阻塞：人是否坐在水壶前面一直等。

同步 VS 异步：水壶是不是在水烧开之后主动通知人。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/BIONIOAIO-12.gif)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/BIONIOAIO-13.jpg)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/BIONIOAIO-14.jpg)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/BIONIOAIO-15.jpg)

适用场景

BIO 方式适用于连接数目比较小且固定的架构，这种方式对服务器资源要求比较高，并发局限于应用中，JDK1.4 以前的唯一选择，但程序直观简单易理解。

NIO 方式适用于连接数目多且连接比较短（轻操作）的架构，比如聊天服务器，并发局限于应用中，编程比较复杂，JDK1.4 开始支持。

AIO 方式适用于连接数目多且连接比较长（重操作）的架构，比如相册服务器，充分调用 OS 参与并发操作，编程比较复杂，JDK7 开始支持。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/BIONIOAIO-16.gif)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/BIONIOAIO-17.gif)

使用方式

使用 BIO 实现文件的读取和写入。

```java
//Initializes The Object
User1 user = new User1();
user.setName("wanger");
user.setAge(23);
System.out.println(user);

//Write Obj to File
ObjectOutputStream oos = null;
try {
    oos = new ObjectOutputStream(new FileOutputStream("tempFile"));
    oos.writeObject(user);
} catch (IOException e) {
    e.printStackTrace();
} finally {
    IOUtils.closeQuietly(oos);
}

//Read Obj from File
File file = new File("tempFile");
ObjectInputStream ois = null;
try {
    ois = new ObjectInputStream(new FileInputStream(file));
    User1 newUser = (User1) ois.readObject();
    System.out.println(newUser);
} catch (IOException e) {
    e.printStackTrace();
} catch (ClassNotFoundException e) {
    e.printStackTrace();
} finally {
    IOUtils.closeQuietly(ois);
    try {
        FileUtils.forceDelete(file);
    } catch (IOException e) {
        e.printStackTrace();
    }
}
```

使用 NIO 实现文件的读取和写入。

```java
static void readNIO() {
    String pathname = "C:\\Users\\adew\\Desktop\\jd-gui.cfg";
    FileInputStream fin = null;
    try {
        fin = new FileInputStream(new File(pathname));
        FileChannel channel = fin.getChannel();

        int capacity = 100;// 字节
        ByteBuffer bf = ByteBuffer.allocate(capacity);
        int length = -1;

        while ((length = channel.read(bf)) != -1) {

            bf.clear();
            byte[] bytes = bf.array();
            System.out.write(bytes, 0, length);
            System.out.println();
        }

        channel.close();

    } catch (FileNotFoundException e) {
        e.printStackTrace();
    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        if (fin != null) {
            try {
                fin.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}

static void writeNIO() {
    String filename = "out.txt";
    FileOutputStream fos = null;
    try {

        fos = new FileOutputStream(new File(filename));
        FileChannel channel = fos.getChannel();
        ByteBuffer src = Charset.forName("utf8").encode("你好你好你好你好你好");
        int length = 0;

        while ((length = channel.write(src)) != 0) {
            System.out.println("写入长度:" + length);
        }

    } catch (FileNotFoundException e) {
        e.printStackTrace();
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
}
```

使用AIO实现文件的读取和写入

```java
public class ReadFromFile {
  public static void main(String[] args) throws Exception {
    Path file = Paths.get("/usr/a.txt");
    AsynchronousFileChannel channel = AsynchronousFileChannel.open(file);

    ByteBuffer buffer = ByteBuffer.allocate(100_000);
    Future<Integer> result = channel.read(buffer, 0);

    while (!result.isDone()) {
      ProfitCalculator.calculateTax();
    }
    Integer bytesRead = result.get();
    System.out.println("Bytes read [" + bytesRead + "]");
  }
}
class ProfitCalculator {
  public ProfitCalculator() {
  }
  public static void calculateTax() {
  }
}

public class WriteToFile {

  public static void main(String[] args) throws Exception {
    AsynchronousFileChannel fileChannel = AsynchronousFileChannel.open(
        Paths.get("/asynchronous.txt"), StandardOpenOption.READ,
        StandardOpenOption.WRITE, StandardOpenOption.CREATE);
    CompletionHandler<Integer, Object> handler = new CompletionHandler<Integer, Object>() {

      @Override
      public void completed(Integer result, Object attachment) {
        System.out.println("Attachment: " + attachment + " " + result
            + " bytes written");
        System.out.println("CompletionHandler Thread ID: "
            + Thread.currentThread().getId());
      }

      @Override
      public void failed(Throwable e, Object attachment) {
        System.err.println("Attachment: " + attachment + " failed with:");
        e.printStackTrace();
      }
    };

    System.out.println("Main Thread ID: " + Thread.currentThread().getId());
    fileChannel.write(ByteBuffer.wrap("Sample".getBytes()), 0, "First Write",
        handler);
    fileChannel.write(ByteBuffer.wrap("Box".getBytes()), 0, "Second Write",
        handler);

  }
}
```

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/BIONIOAIO-18.gif)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/BIONIOAIO-19.gif)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/BIONIOAIO-20.gif)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/BIONIOAIO-21.jpg)

滴滴滴，水开了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/BIONIOAIO-22.jpg)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/BIONIOAIO-23.jpg)





>参考链接：[https://mp.weixin.qq.com/s/QQxrr5yP8X9YdFqIwXDoQQ](https://mp.weixin.qq.com/s/QQxrr5yP8X9YdFqIwXDoQQ)

---------

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
