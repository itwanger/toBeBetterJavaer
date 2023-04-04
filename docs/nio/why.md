---
title: Java 中的 NIO 比传统 IO 强在哪里？
shortTitle: NIO和IO的区别
category:
  - Java核心
tag:
  - Java NIO
description: Java程序员进阶之路，小白的零基础Java教程，为什么我们要使用 Java NIO？
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java进阶之路,Java入门,教程,nio,java nio
---

# 12.1 NIO和IO的区别

我花了几天时间去了解**NIO 的核心知识**，期间看了《Java 编程思想》和《疯狂 Java 讲义》中的 NIO 模块。**但是**，看完之后还是很**迷**，不知道 NIO 是干嘛用的，网上的资料和书上的知识点没有很好地对应上。

### 01、IO的五种模型

网上的资料很多都以 IO 的五种模型为基础来讲解 NIO，而 IO 这五种模型其中又涉及到了很多概念：`同步/异步/阻塞/非阻塞/多路复用`，**而不同的人又有不同的理解方式**。

I/O 的五种模型如下：

- 阻塞 I/O（Blocking I/O）：在这种模型中，I/O 操作是阻塞的，即执行 I/O 操作时，线程会被阻塞，直到操作完成。在阻塞 I/O 模型中，每个连接都需要一个线程来处理。因此，对于大量并发连接的场景，阻塞 I/O 模型的性能较差。
- 非阻塞 I/O（Non-blocking I/O）：在这种模型中，I/O 操作不会阻塞线程。当数据尚未准备好时，I/O 调用会立即返回。线程可以继续执行其他任务，然后在适当的时候再次尝试执行 I/O 操作。非阻塞 I/O 模型允许单个线程同时处理多个连接，但可能需要在应用程序级别进行复杂的调度和管理。
- I/O 多路复用（I/O Multiplexing）：这种模型使用操作系统提供的多路复用功能（如 select、poll、epoll 等），使得单个线程可以同时处理多个 I/O 事件。当某个连接上的数据准备好时，操作系统会通知应用程序。这样，应用程序可以在一个线程中处理多个并发连接，而不需要为每个连接创建一个线程。
- 信号驱动 I/O（Signal-driven I/O）：在这种模型中，应用程序可以向操作系统注册一个信号处理函数，当某个 I/O 事件发生时，操作系统会发送一个信号通知应用程序。应用程序在收到信号后处理相应的 I/O 事件。这种模型与非阻塞 I/O 类似，也需要在应用程序级别进行事件管理和调度。
- 异步 I/O（Asynchronous I/O）：异步 I/O 模型与同步 I/O 模型的主要区别在于，异步 I/O 操作会在后台运行，当操作完成时，操作系统会通知应用程序。应用程序不需要等待 I/O 操作的完成，可以继续执行其他任务。这种模型适用于处理大量并发连接，且可以简化应用程序的设计和开发。

下面解释一下同步/异步概念。

- 同步：在执行 I/O 操作时，应用程序需要等待操作的完成。同步操作会导致线程阻塞，直到操作完成。同步 I/O 包括阻塞 I/O、非阻塞 I/O 和 I/O 多路复用。
- 异步：在执行 I/O 操作时，应用程序不需要等待操作的完成。异步操作允许应用程序在 I/O 操作进行时继续执行其他任务。异步 I/O 模型包括信号驱动 I/O 和异步 I/O。

再来看阻塞/非阻塞的概念。

- 阻塞：在阻塞 I/O 操作中，线程必须等待 I/O 操作完成才能继续执行。在此期间，线程无法执行其他任务。
- 非阻塞：在非阻塞 I/O 操作中，线程无需等待 I/O 操作完成，即使数据尚未准备好。线程可以在等待数据时执行其他任务。

然后是多路复用的概念。

多路复用：多路复用是一种处理多个 I/O 事件的技术。它允许一个线程同时监视多个文件描述符或通道。当某个 I/O 事件准备好时，多路复用机制会通知应用程序，从而实现在单个线程中处理多个并发连接。

假设你现在是个大厨（炖个老母鸡汤，切点土豆丝/姜丝/葱丝）：

- 同步/阻塞：你站在锅边，一直等到汤炖好，期间不能做其他事情，直到汤炖好才去处理其他任务。
- 同步/非阻塞：你不断地查看锅里的汤，看是否炖好。在检查的间隙，你可以处理其他任务，如切菜。但你需要不断地切换任务，确保汤炖好了就可以处理。
- 异步/信号驱动：你给锅安装一个传感器，当汤炖好时，传感器会发出信号提醒你。在此期间，你可以处理其他任务，而不用担心错过汤炖好的时机。
- 异步 I/O：你请了一个助手，让他负责炖汤。当汤炖好时，助手会通知你。你可以专心处理其他任务，而无需关心炖汤的过程。

这下清楚了吧？

### 02、select/epoll/poll/pselect/fd

还有涉及到 Unix 的`select/epoll/poll/pselect/fd`这些关键字，没有相关基础的人看起来简直是天书，这里补充一下。

- select 是 Unix 系统中最早的 I/O 多路复用技术。它允许一个线程同时监视多个文件描述符（如[套接字](https://tobebetterjavaer.com/socket/socket.html)），并等待某个文件描述符上的 I/O 事件（如可读、可写或异常）。select 的主要问题是性能受限，特别是在处理大量文件描述符时。这是因为它使用一个位掩码来表示文件描述符集，每次调用都需要传递这个掩码，并在内核和用户空间之间进行复制。

- poll 是对 select 的改进。它使用一个文件描述符数组而不是位掩码来表示文件描述符集。这样可以避免 select 中的性能问题。然而，poll 仍然需要遍历整个文件描述符数组，以检查每个文件描述符的状态。因此，在处理大量文件描述符时，性能仍然受限。

- epoll 是 Linux 中的一种高性能 I/O 多路复用技术。它通过在内核中维护一个事件表来避免遍历文件描述符数组的性能问题。当某个文件描述符上的 I/O 事件发生时，内核会将该事件添加到事件表中。应用程序可以使用 epoll_wait 函数来获取已准备好的 I/O 事件，而无需遍历整个文件描述符集。这种方法大大提高了在大量并发连接下的性能。

- pselect 是 select 的一个变体，它支持更精确的超时控制和原子性信号处理。pselect 允许应用程序在等待 I/O 事件时阻塞信号，从而避免竞争条件。然而，与 select 相比，pselect 在性能方面没有太大改进。

- fd：这个关键字指的是 "file descriptor"（文件描述符），它是 Unix 系统中用于表示打开的文件、套接字和其他 I/O 对象的整数标识符。文件描述符在 I/O 多路复用中起着关键作用，因为它们允许应用程序同时监视多个 I/O 对象。

### 03、NIO

我在找资料的过程中也收藏了好多讲解 NIO 的资料，这篇内容就是**以初学的角度来理解 NIO**。也算是我这两天看 NIO 的一个总结吧。希望大家可以看了之后知道什么是 NIO，NIO 的核心知识点是什么，以及会使用 NIO~

> 声明：本文使用 JDK1.8

JDK 1.4 中，`java.nio.*包`引入新的 Java I/O 库，其目的是**提高速度**。实际上，“旧”的 I/O 包已经使用 NIO**重新实现过，即使我们不显式的使用 NIO 编程，也能从中受益**。

- nio 翻译成 no-blocking io 或者 new io 都无所谓啦，都说得通~

在《Java 编程思想》读到“即使我们不显式的使用 NIO 编程，也能从中受益”的时候，我是挺在意的，所以：我们**测试**一下使用 NIO 复制文件和[传统 IO](https://tobebetterjavaer.com/io/file-path.html) 复制文件的性能：

```java
import java.io.*;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;

public class SimpleFileTransferTest {

    // 使用传统的 I/O 方法传输文件
    private long transferFile(File source, File des) throws IOException {
        long startTime = System.currentTimeMillis();

        if (!des.exists())
            des.createNewFile();

        // 创建输入输出流
        BufferedInputStream bis = new BufferedInputStream(new FileInputStream(source));
        BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(des));

        // 使用数组传输数据
        byte[] bytes = new byte[1024 * 1024];
        int len;
        while ((len = bis.read(bytes)) != -1) {
            bos.write(bytes, 0, len);
        }

        long endTime = System.currentTimeMillis();
        return endTime - startTime;
    }

    // 使用 NIO 方法传输文件
    private long transferFileWithNIO(File source, File des) throws IOException {
        long startTime = System.currentTimeMillis();

        if (!des.exists())
            des.createNewFile();

        // 创建随机存取文件对象
        RandomAccessFile read = new RandomAccessFile(source, "rw");
        RandomAccessFile write = new RandomAccessFile(des, "rw");

        // 获取文件通道
        FileChannel readChannel = read.getChannel();
        FileChannel writeChannel = write.getChannel();

        // 创建并使用 ByteBuffer 传输数据
        ByteBuffer byteBuffer = ByteBuffer.allocate(1024 * 1024);
        while (readChannel.read(byteBuffer) > 0) {
            byteBuffer.flip();
            writeChannel.write(byteBuffer);
            byteBuffer.clear();
        }

        // 关闭文件通道
        writeChannel.close();
        readChannel.close();
        long endTime = System.currentTimeMillis();
        return endTime - startTime;
    }

    public static void main(String[] args) throws IOException {
        SimpleFileTransferTest simpleFileTransferTest = new SimpleFileTransferTest();
        File sourse = new File("[电影天堂www.dygod.cn]猜火车-cd1.rmvb");
        File des = new File("io.avi");
        File nio = new File("nio.avi");

        // 比较传统的 I/O 和 NIO 传输文件的时间
        long time = simpleFileTransferTest.transferFile(sourse, des);
        System.out.println(time + "：普通字节流时间");

        long timeNio = simpleFileTransferTest.transferFileWithNIO(sourse, nio);
        System.out.println(timeNio + "：NIO时间");
    }
}
```

在我给出实际的结论之前，你是否会有这样的结论：

- 对于较小的文件，NIO 和普通 IO 之间的性能差异可能不会非常明显，因为文件本身较小，复制过程较快。
- 对于较大的文件，使用 NIO 的性能可能会明显优于普通 IO。因为 NIO 使用了更高效的缓冲区和通道机制，可以在内存中进行更快的数据传输。

然而实际的结果，却会令你大跌眼镜：

![](https://cdn.tobebetterjavaer.com/stutymore/why-20230331191748.png)

文件越大的情况下，竟然普通字节流（传统 IO）的速度更快(当然了，个人测试，或许不是很准)，那还要 NIO 做什么呢？况且 NIO 的学习成本也比传统 IO 要高一些。

那这意味着我们**可以不使用/学习 NIO 了吗**？

答案是**否定**的，IO 操作往往在**两个场景**下会用到：

- 文件 IO
- 网络 IO

而 NIO 的**魅力主要体现在网络中**！

NIO（New I/O）的设计目标是解决传统 I/O（BIO，Blocking I/O）在处理大量并发连接时的性能瓶颈。传统 I/O 在网络通信中主要使用阻塞式 I/O，为每个连接分配一个线程。当连接数量增加时，系统性能将受到严重影响，线程资源成为关键瓶颈。而 NIO 提供了非阻塞 I/O 和 I/O 多路复用，可以在单个线程中处理多个并发连接，从而在网络传输中显著提高性能。

以下是 NIO 在网络传输中优于传统 I/O 的原因：

①、NIO 支持非阻塞 I/O，这意味着在执行 I/O 操作时，线程不会被阻塞。这使得在网络传输中可以有效地管理大量并发连接（数千甚至数百万）。而在操作文件时，这个优势没有那么明显，因为文件读写通常不涉及大量并发操作。

②、NIO 支持 I/O 多路复用，这意味着一个线程可以同时监视多个通道（如套接字），并在 I/O 事件（如可读、可写）准备好时处理它们。这大大提高了网络传输中的性能，因为单个线程可以高效地管理多个并发连接。操作文件时这个优势也无法提现出来。

③、NIO 提供了 ByteBuffer 类，可以高效地管理缓冲区。这在网络传输中很重要，因为数据通常是以字节流的形式传输。操作文件的时候，虽然也有缓冲区，但优势仍然不够明显。

### 04、传统 IO 和 NIO 实际的性能测试

来看服务器端代码的差别。

IO，用的[套接字](https://tobebetterjavaer.com/socket/socket.html)，代码比较简单，我就不加注释了，之前学过，应该都能看得懂，用 while 循环监听客户端 Socket：

```java
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;

public class IOServer {
    public static void main(String[] args) {
        try {
            ServerSocket serverSocket = new ServerSocket(8080);

            while (true) {
                Socket client = serverSocket.accept();
                InputStream in = client.getInputStream();
                OutputStream out = client.getOutputStream();

                byte[] buffer = new byte[1024];
                int bytesRead = in.read(buffer);
                out.write(buffer, 0, bytesRead);

                in.close();
                out.close();
                client.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

NIO，这部分我加上注释，主要用到的是 ServerSocketChannel 和 Selector：

```java
import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.SocketChannel;
import java.util.Iterator;

public class NIOServer {
    public static void main(String[] args) {
        try {
            // 创建 ServerSocketChannel
            ServerSocketChannel serverSocketChannel = ServerSocketChannel.open();
            // 绑定端口
            serverSocketChannel.bind(new InetSocketAddress(8081));
            // 设置为非阻塞模式
            serverSocketChannel.configureBlocking(false);

            // 创建 Selector
            Selector selector = Selector.open();
            // 将 ServerSocketChannel 注册到 Selector，关注 OP_ACCEPT 事件
            serverSocketChannel.register(selector, SelectionKey.OP_ACCEPT);

            // 无限循环，处理事件
            while (true) {
                // 阻塞直到有事件发生
                selector.select();
                // 获取发生事件的 SelectionKey
                Iterator<SelectionKey> iterator = selector.selectedKeys().iterator();
                while (iterator.hasNext()) {
                    SelectionKey key = iterator.next();
                    // 处理完后，从 selectedKeys 集合中移除
                    iterator.remove();

                    // 判断事件类型
                    if (key.isAcceptable()) {
                        // 有新的连接请求
                        ServerSocketChannel server = (ServerSocketChannel) key.channel();
                        // 接受连接
                        SocketChannel client = server.accept();
                        // 设置为非阻塞模式
                        client.configureBlocking(false);
                        // 将新的 SocketChannel 注册到 Selector，关注 OP_READ 事件
                        client.register(selector, SelectionKey.OP_READ);
                    } else if (key.isReadable()) {
                        // 有数据可读
                        SocketChannel client = (SocketChannel) key.channel();
                        // 创建 ByteBuffer 缓冲区
                        ByteBuffer buffer = ByteBuffer.allocate(1024);
                        // 从 SocketChannel 中读取数据并写入 ByteBuffer
                        client.read(buffer);
                        // 翻转 ByteBuffer，准备读取
                        buffer.flip();
                        // 将数据从 ByteBuffer 写回到 SocketChannel
                        client.write(buffer);
                        // 关闭连接
                        client.close();
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

上面的代码创建了一个基于 Java NIO 的简单 TCP 服务器。它使用 ServerSocketChannel 和 Selector 实现了非阻塞 I/O 和 I/O 多路复用。服务器循环监听事件，当有新的连接请求时，接受连接并将新的 SocketChannel 注册到 Selector，关注 OP_READ 事件。当有数据可读时，从 SocketChannel 中读取数据并写入 ByteBuffer，然后将数据从 ByteBuffer 写回到 SocketChannel。

这里简单说一下 [Socket 和 ServerSocket](https://tobebetterjavaer.com/socket/socket.html)，以及 ServerSocketChannel 和 SocketChannel。

Socket 和 ServerSocket 是传统的阻塞式 I/O 编程方式，用于建立和管理 TCP 连接。

- Socket：表示客户端套接字，负责与服务器端建立连接并进行数据的读写。
- ServerSocket：表示服务器端套接字，负责监听客户端连接请求。当有新的连接请求时，ServerSocket 会创建一个新的 Socket 实例，用于与客户端进行通信。

在传统阻塞式 I/O 编程中，每个连接都需要一个单独的线程进行处理，这导致了在高并发场景下的性能问题。在接下来的客户端测试用例中会看到。

为了解决传统阻塞式 I/O 的性能问题，Java NIO 引入了 ServerSocketChannel 和 SocketChannel。它们是非阻塞 I/O，可以在单个线程中处理多个连接。

- ServerSocketChannel：类似于 ServerSocket，表示服务器端套接字通道。它负责监听客户端连接请求，并可以设置为非阻塞模式，这意味着在等待客户端连接请求时不会阻塞线程。
- SocketChannel：类似于 Socket，表示客户端套接字通道。它负责与服务器端建立连接并进行数据的读写。SocketChannel 也可以设置为非阻塞模式，在读写数据时不会阻塞线程。

再来说一下 Selector。

Selector 是 Java NIO 中的一个关键组件，用于实现 I/O 多路复用。它允许在单个线程中同时监控多个 ServerSocketChannel 和 SocketChannel，并通过 SelectionKey 标识关注的事件。当某个事件发生时，Selector 会将对应的 SelectionKey 添加到已选择的键集合中。通过使用 Selector，可以在单个线程中同时处理多个连接，从而有效地提高 I/O 操作的性能，特别是在高并发场景下。

客户端测试用例：

```java
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.nio.ByteBuffer;
import java.nio.channels.SocketChannel;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class TestClient {
    public static void main(String[] args) throws InterruptedException {
        int clientCount = 10000;
        ExecutorService executorServiceIO = Executors.newFixedThreadPool(10);
        ExecutorService executorServiceNIO = Executors.newFixedThreadPool(10);

        // 使用传统 IO 的客户端
        Runnable ioClient = () -> {
            try {
                Socket socket = new Socket("localhost", 8080);
                OutputStream out = socket.getOutputStream();
                InputStream in = socket.getInputStream();
                out.write("Hello, 沉默王二 IO!".getBytes());
                byte[] buffer = new byte[1024];
                in.read(buffer);
                in.close();
                out.close();
                socket.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        };

        // 使用 NIO 的客户端
        Runnable nioClient = () -> {
            try {
                SocketChannel socketChannel = SocketChannel.open();
                socketChannel.connect(new InetSocketAddress("localhost", 8081));
                ByteBuffer buffer = ByteBuffer.wrap("Hello, 沉默王二 NIO!".getBytes());
                socketChannel.write(buffer);
                buffer.clear();
                socketChannel.read(buffer);
                socketChannel.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        };

        // 分别测试 NIO 和传统 IO 的服务器性能
        long startTime, endTime;

        startTime = System.currentTimeMillis();
        for (int i = 0; i < clientCount; i++) {
            executorServiceIO.execute(ioClient);
        }
        executorServiceIO.shutdown();
        executorServiceIO.awaitTermination(1, TimeUnit.MINUTES);
        endTime = System.currentTimeMillis();
        System.out.println("传统 IO 服务器处理 " + clientCount + " 个客户端耗时: " + (endTime - startTime) + "ms");

        startTime = System.currentTimeMillis();
        for (int i = 0; i < clientCount; i++) {
            executorServiceNIO.execute(nioClient);
        }
        executorServiceNIO.shutdown();
        executorServiceNIO.awaitTermination(1, TimeUnit.MINUTES);
        endTime = System.currentTimeMillis();
        System.out.println("NIO 服务器处理 " + clientCount + " 个客户端耗时: " + (endTime - startTime) + "ms");
    }
}
```

在这个简单的性能测试中，我们使用固定线程池（10个线程）来模拟客户端并发请求。分别测试 NIO 和传统 IO 服务器处理 10000 个客户端请求所需的时间。来看一下结果。

![](https://cdn.tobebetterjavaer.com/stutymore/why-20230404141335.png)

可以看得出，NIO 比 传统 IO 差不多快一倍的时间。当然了，这是放在我本地测试的，如果服务端放在生产环境下，这个结果会有所不同，但我在本地跑了几次，结果差不多是这样的结果。

这说明 NIO 在网络传输中的性能确实要优于传统 IO 的。

---

最近整理了一份牛逼的学习资料，包括但不限于 Java 基础部分（JVM、Java 集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类 Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是 2022 年全网最全的学习和找工作的 PDF 资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
