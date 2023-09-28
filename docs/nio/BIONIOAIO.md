---
title: 一文彻底解释清楚Java 中的NIO、BIO和AIO
shortTitle: NIO和BIO、AIO的区别
category:
  - Java核心
tag:
  - Java NIO
description: BIO采用阻塞式 I/O 模型，线程在执行 I/O 操作时被阻塞，无法处理其他任务，适用于连接数较少且稳定的场景。NIO使用非阻塞 I/O 模型，线程在等待 I/O 时可执行其他任务，通过 Selector 监控多个 Channel 上的事件，提高性能和可伸缩性，适用于高并发场景。AIO采用异步 I/O 模型，线程发起 I/O 请求后立即返回，当 I/O 操作完成时通过回调函数通知线程，进一步提高了并发处理能力，适用于高吞吐量场景。
author: 沉默王二
head:
  - - meta
    - name: keywords
      content: java,nio,bio,aio
---

# 12.2 BIO、NIO 和 AIO 的区别

> 上篇，我们了解了 [NIO 和传统 IO 的区别](https://javabetter.cn/nio/nio-better-io.html)，那这篇我们来了解 BIO、NIO 和 AIO 的区别，新手也很容易混淆，我们换一个方式来讲，讲给女朋友听👂。

周末午后，在家里面进行电话面试，我问了面试者几个关于 IO 的问题，其中包括什么是 BIO、NIO 和 AIO？三者有什么区别？具体如何使用等问题，但是面试者回答的并不是很满意。于是我在面试评价中写道："对 Java 的 IO 提醒理解不够深入"。恰好被女朋友看到了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/BIONIOAIO-1.jpg)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/BIONIOAIO-2.jpg)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/BIONIOAIO-4.jpg)

### Java IO 与 BIO、NIO

IO，常写作 I/O，是 Input/Output 的简称，即输入/输出。通常指数据在内部存储器（内存）和外部存储器（硬盘、优盘等）或其他周边设备之间的输入和输出。

输入/输出是信息处理系统（例如计算机）与外部世界（可能是人类或另一信息处理系统）之间的通信。

输入是系统接收的信号或数据，输出则是从其发送的信号或数据。

在 Java 中，提供了一系列 API，可以供开发者来读写外部数据或文件。我们称这些 API 为 [Java IO](https://javabetter.cn/io/shangtou.html)。

IO 是 Java 中比较重要，且比较难的知识点，主要是因为随着 Java 的发展，目前有三种 IO 共存。分别是 BIO、NIO 和 AIO。

BIO 全称 Block-IO 是一种**同步且阻塞**的通信模式。是一个比较传统的通信方式，模式简单，使用方便。但并发处理能力低，通信耗时，依赖网速。

[Java NIO](https://javabetter.cn/nio/nio-better-io.html)，全程 Non-Block IO ，是 Java SE 1.4 版以后，针对网络传输效能优化的新功能。是一种**非阻塞同步**的通信模式。

NIO 与原来的 I/O 有同样的作用和目的, 他们之间最重要的区别是数据打包和传输的方式。原来的 I/O 以流的方式处理数据，而 NIO 以块的方式处理数据。

面向流的 I/O 系统一次一个字节地处理数据。一个输入流产生一个字节的数据，一个输出流消费一个字节的数据。

面向块的 I/O 系统以块的形式处理数据。每一个操作都在一步中产生或者消费一个数据块。按块处理数据比按(流式的)字节处理数据要快得多。但是面向块的 I/O 缺少一些面向流的 I/O 所具有的优雅性和简单性。

Java AIO，全称 Asynchronous IO，是**异步非阻塞**的 IO。是一种非阻塞异步的通信模式。

在 NIO 的基础上引入了新的异步通道的概念，并提供了异步文件通道和异步套接字通道的实现。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/BIONIOAIO-8.jpg)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/BIONIOAIO-9.jpg)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/BIONIOAIO-10.jpg)

### 三种 IO 的区别

首先，我们站在宏观的角度，重新画一下重点：

**BIO （Blocking I/O）：同步阻塞 I/O 模式。**

**NIO （New I/O）：同步非阻塞模式。**

**AIO （Asynchronous I/O）：异步非阻塞 I/O 模型。**

同步阻塞模式：这种模式下，我们的工作模式是先来到厨房，开始烧水，并坐在水壶面前一直等着水烧开。

同步非阻塞模式：这种模式下，我们的工作模式是先来到厨房，开始烧水，但是我们不一直坐在水壶前面等，而是回到客厅看电视，然后每隔几分钟到厨房看一下水有没有烧开。

异步非阻塞 I/O 模型：这种模式下，我们的工作模式是先来到厨房，开始烧水，我们不一直坐在水壶前面等，也不隔一段时间去看一下，而是在客厅看电视，水壶上面有个开关，水烧开之后他会通知我。

阻塞 VS 非阻塞：人是否坐在水壶前面一直等。

同步 VS 异步：水壶是不是在水烧开之后主动通知人。

#### 适用场景

BIO 方式适用于连接数目比较小且固定的架构，这种方式对服务器资源要求比较高，并发局限于应用中，JDK1.4 以前的唯一选择，但程序直观简单易理解。

NIO 方式适用于连接数目多且连接比较短（轻操作）的架构，比如聊天服务器，并发局限于应用中，编程比较复杂，JDK1.4 开始支持。

AIO 方式适用于连接数目多且连接比较长（重操作）的架构，比如相册服务器，充分调用 OS 参与并发操作，编程比较复杂，JDK7 开始支持。

#### 使用方式

使用 BIO 实现文件的读取和写入。

```java
public class BioFileDemo {
    public static void main(String[] args) {
        BioFileDemo demo = new BioFileDemo();
        demo.writeFile();
        demo.readFile();
    }

    // 使用 BIO 写入文件
    public void writeFile() {
        String filename = "logs/itwanger/paicoding.txt";
        try {
            FileWriter fileWriter = new FileWriter(filename);
            BufferedWriter bufferedWriter = new BufferedWriter(fileWriter);

            bufferedWriter.write("学编程就上技术派");
            bufferedWriter.newLine();

            System.out.println("写入完成");
            bufferedWriter.close();
            fileWriter.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // 使用 BIO 读取文件
    public void readFile() {
        String filename = "logs/itwanger/paicoding.txt";
        try {
            FileReader fileReader = new FileReader(filename);
            BufferedReader bufferedReader = new BufferedReader(fileReader);

            String line;
            while ((line = bufferedReader.readLine()) != null) {
                System.out.println("读取的内容: " + line);
            }

            bufferedReader.close();
            fileReader.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

这个示例展示了如何使用 Java 中的传统阻塞 I/O（BIO）对文件进行读写操作。在 `writeFile()` 方法中，我们首先创建一个 FileWriter 对象，并使用 BufferedWriter 进行缓冲写入。接着，使用 `bufferedWriter.write()` 方法将字符串写入文件，然后调用 `bufferedWriter.newLine()` 方法添加换行符。最后，关闭 BufferedWriter 和 FileWriter。在 `readFile()` 方法中，我们创建一个 FileReader 对象，并使用 BufferedReader 进行缓冲读取。然后通过调用 `bufferedReader.readLine()` 方法循环读取文件内容，直到返回 null 表示读取完毕。最后，关闭 BufferedReader 和 FileReader。

接下来是 NIO 的。

```java
public class NioFileDemo {
    public static void main(String[] args) {
        NioFileDemo demo = new NioFileDemo();
        demo.writeFile();
        demo.readFile();
    }

    // 使用 NIO 写入文件
    public void writeFile() {
        Path path = Paths.get("logs/itwanger/paicoding.txt");
        try {
            FileChannel fileChannel = FileChannel.open(path, EnumSet.of(StandardOpenOption.CREATE, StandardOpenOption.WRITE));

            ByteBuffer buffer = StandardCharsets.UTF_8.encode("学编程就上技术派");
            fileChannel.write(buffer);

            System.out.println("写入完成");
            fileChannel.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // 使用 NIO 读取文件
    public void readFile() {
        Path path = Paths.get("logs/itwanger/paicoding.txt");
        try {
            FileChannel fileChannel = FileChannel.open(path, StandardOpenOption.READ);
            ByteBuffer buffer = ByteBuffer.allocate(1024);

            int bytesRead = fileChannel.read(buffer);
            while (bytesRead != -1) {
                buffer.flip();
                System.out.println("读取的内容: " + StandardCharsets.UTF_8.decode(buffer));
                buffer.clear();
                bytesRead = fileChannel.read(buffer);
            }

            fileChannel.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

这个示例演示了如何使用 NIO 的 [FileChannel](https://javabetter.cn/nio/buffer-channel.html) 对文件进行读写操作。在 `writeFile()` 方法中，我们首先打开文件通道并指定创建和写入选项。接着，将要写入的字符串转换为 ByteBuffer，然后使用 `fileChannel.write()` 方法将其写入文件。在 `readFile()` 方法中，我们打开文件通道并指定读取选项，然后创建一个 ByteBuffer 用于存储读取到的数据。使用 `fileChannel.read()` 方法循环读取文件内容，直到返回 -1 表示读取完毕。在循环中，我们翻转缓冲区，将其解码为字符串并打印，然后清空缓冲区以进行下一次读取。最后，关闭文件通道。

使用 AIO 实现文件的读取和写入

```java
public class AioDemo {

    public static void main(String[] args) {
        AioDemo demo = new AioDemo();
        demo.writeFile();
        demo.readFile();
    }

    // 使用 AsynchronousFileChannel 写入文件
    public void writeFile() {
        // 使用 Paths.get() 获取文件路径
        Path path = Paths.get("logs/itwanger/paicoding.txt");
        try {
            // 用 AsynchronousFileChannel.open() 打开文件通道，指定写入和创建文件的选项。
            AsynchronousFileChannel fileChannel = AsynchronousFileChannel.open(path, StandardOpenOption.WRITE, StandardOpenOption.CREATE);

            // 将要写入的字符串（"学编程就上技术派"）转换为 ByteBuffer。
            ByteBuffer buffer = StandardCharsets.UTF_8.encode("学编程就上技术派");
            // 调用 fileChannel.write() 方法将 ByteBuffer 中的内容写入文件。这是一个异步操作，因此需要使用 Future 对象等待写入操作完成。
            Future<Integer> result = fileChannel.write(buffer, 0);
            // 等待写操作完成
            result.get();

            System.out.println("写入完成");
            fileChannel.close();
        } catch (IOException | InterruptedException | java.util.concurrent.ExecutionException e) {
            e.printStackTrace();
        }
    }

    // 使用 AsynchronousFileChannel 读取文件
    public void readFile() {
        Path path = Paths.get("logs/itwanger/paicoding.txt");
        try {
            // 指定读取文件的选项。
            AsynchronousFileChannel fileChannel = AsynchronousFileChannel.open(path, StandardOpenOption.READ);
            // 创建一个 ByteBuffer，用于存储从文件中读取的数据。
            ByteBuffer buffer = ByteBuffer.allocate(1024);

            // 调用 fileChannel.read() 方法从文件中异步读取数据。该方法接受一个 CompletionHandler 对象，用于处理异步操作完成后的回调。
            fileChannel.read(buffer, 0, buffer, new CompletionHandler<Integer, ByteBuffer>() {
                @Override
                public void completed(Integer result, ByteBuffer attachment) {
                    // 在 CompletionHandler 的 completed() 方法中，翻转 ByteBuffer（attachment.flip()），然后使用 Charset.forName("UTF-8").decode() 将其解码为字符串并打印。最后，清空缓冲区并关闭文件通道。
                    attachment.flip();
                    System.out.println("读取的内容: " + StandardCharsets.UTF_8.decode(attachment));
                    attachment.clear();
                    try {
                        fileChannel.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }

                @Override
                public void failed(Throwable exc, ByteBuffer attachment) {
                    // 如果异步读取操作失败，CompletionHandler 的 failed() 方法将被调用，打印错误信息。
                    System.out.println("读取失败");
                    exc.printStackTrace();
                }
            });

            // 等待异步操作完成
            Thread.sleep(1000);

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

这段代码展示了一个名为 AioDemo 的类，包含两个方法：`writeFile()` 和 `readFile()`。这两个方法分别使用 AsynchronousFileChannel 对文件进行异步写入和读取操作。代码的具体含义我都加到注释当中了，注意查看。

滴滴滴，水开了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/BIONIOAIO-22.jpg)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/BIONIOAIO-23.jpg)

### 小结

BIO（Blocking I/O）：采用阻塞式 I/O 模型，线程在执行 I/O 操作时被阻塞，无法处理其他任务，适用于连接数较少且稳定的场景。

NIO（New I/O 或 Non-blocking I/O）：使用非阻塞 I/O 模型，线程在等待 I/O 时可执行其他任务，通过 Selector 监控多个 Channel 上的事件，提高性能和可伸缩性，适用于高并发场景。

AIO（Asynchronous I/O）：采用异步 I/O 模型，线程发起 I/O 请求后立即返回，当 I/O 操作完成时通过回调函数通知线程，进一步提高了并发处理能力，适用于高吞吐量场景。

> 参考链接：[https://mp.weixin.qq.com/s/QQxrr5yP8X9YdFqIwXDoQQ](https://mp.weixin.qq.com/s/QQxrr5yP8X9YdFqIwXDoQQ)

---

GitHub 上标星 9300+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 9300+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
