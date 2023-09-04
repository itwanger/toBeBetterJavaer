---
title: Java NIO 比传统 IO 强在哪里？
shortTitle: NIO比IO强在哪？
category:
  - Java核心
tag:
  - Java NIO
description: 本篇内容主要讲述了 NIO 和传统 IO 之间的差异。首先，传统 IO 采用阻塞模型，而 NIO 使用非阻塞模型，通过选择器监控多个通道上的 I/O 事件，从而提升性能与可伸缩性。其次，在文件操作方面，传统 IO 依赖字节流或字符流进行文件读写，而 NIO 则利用通道和缓冲区进行操作，性能优势相对较小。最后，在网络传输方面，传统 IO 使用 Socket 和 ServerSocket，而 NIO 提供了 SocketChannel 和 ServerSocketChannel，支持非阻塞网络传输，进一步增强并发处理能力。
author: 沉默王二
head:
  - - meta
    - name: keywords
      content: java,nio,io,Java NIO, 传统IO, 非阻塞模式, 缓冲区, 通道, 选择器
---

# 12.1 NIO比IO强在哪？

我花了几天时间去了解**NIO 的核心知识**，期间看了《Java 编程思想》和《疯狂 Java 讲义》中的 NIO 模块。**但是**，看完之后还是很**迷**，不知道 NIO 是干嘛用的，网上的资料和书上的知识点没有很好地对应上。

我这里先给大家展示一副传统 IO 和 NIO 的对比图，感受一下。

![](https://cdn.tobebetterjavaer.com/stutymore/nio-better-io-20230406180538.png)

[传统 IO](https://javabetter.cn/io/shangtou.html) 基于字节流或字符流（如 FileInputStream、BufferedReader 等）进行文件读写，以及使用 [Socket 和 ServerSocket](https://javabetter.cn/socket/socket.html) 进行网络传输。

NIO 使用[通道（Channel）和缓冲区（Buffer）](https://javabetter.cn/nio/buffer-channel.html)进行文件操作，以及使用 SocketChannel 和 ServerSocketChannel 进行网络传输。

传统 IO 采用阻塞式模型，对于每个连接，都需要创建一个独立的线程来处理读写操作。当一个线程在等待 I/O 操作时，无法执行其他任务。这会导致大量线程的创建和销毁，以及上下文切换，降低了系统性能。

NIO 使用非阻塞模型，允许线程在等待 I/O 时执行其他任务。这种模式通过使用选择器（Selector）来监控多个通道（Channel）上的 I/O 事件，实现了更高的性能和可伸缩性。

### 01、NIO 和传统 IO 在操作文件时的差异

JDK 1.4 中，`java.nio.*包`引入新的 Java I/O 库，其目的是**提高速度**。实际上，“旧”的 I/O 包已经使用 NIO**重新实现过，即使我们不显式的使用 NIO 编程，也能从中受益**。

- nio 翻译成 no-blocking io 或者 new io 都无所谓啦，都说得通~

在《Java 编程思想》读到“即使我们不显式的使用 NIO 编程，也能从中受益”的时候，我是挺在意的，所以：我们**测试**一下使用 NIO 复制文件和[传统 IO 复制文件](https://javabetter.cn/io/file-path.html) 的性能：

```java
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

先解释一下这段代码，里面出现的 [RandomAccessFile](https://javabetter.cn/io/file-path.html) 我们之前讲过，FileChannel 是 Java NIO（New I/O）库中的一个类，它提供了对文件的高效 I/O 操作，支持随机访问文件，允许在文件的任意位置进行读写操作。

与 RandomAccessFile 不同，FileChannel 使用了[缓冲区（ByteBuffer）](https://javabetter.cn/nio/buffer-channel.html)进行数据传输。

好，在我给出实际的结论之前，你是否会有这样的结论：

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

③、NIO 提供了 [ByteBuffer 类](https://javabetter.cn/nio/buffer-channel.html)，可以高效地管理缓冲区。这在网络传输中很重要，因为数据通常是以字节流的形式传输。操作文件的时候，虽然也有缓冲区，但优势仍然不够明显。

### 02、NIO 和传统 IO 在网络传输中的差异

来看服务器端代码的差别。

IO，用的[套接字](https://javabetter.cn/socket/socket.html)，代码比较简单，我就不加注释了，之前学过，应该都能看得懂，用 while 循环监听客户端 Socket：

```java
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

上面的代码创建了一个基于 Java NIO 的简单 TCP 服务器。它使用 [ServerSocketChannel 和 Selector（后面会讲）](https://javabetter.cn/nio/buffer-channel.html) 实现了非阻塞 I/O 和 I/O 多路复用。服务器循环监听事件，当有新的连接请求时，接受连接并将新的 SocketChannel 注册到 Selector，关注 OP_READ 事件。当有数据可读时，从 SocketChannel 中读取数据并写入 ByteBuffer，然后将数据从 ByteBuffer 写回到 SocketChannel。

这里简单说一下 [Socket 和 ServerSocket](https://javabetter.cn/socket/socket.html)，以及 ServerSocketChannel 和 SocketChannel。

Socket 和 ServerSocket 是传统的阻塞式 I/O 编程方式，用于建立和管理 TCP 连接。

- Socket：表示客户端套接字，负责与服务器端建立连接并进行数据的读写。
- ServerSocket：表示服务器端套接字，负责监听客户端连接请求。当有新的连接请求时，ServerSocket 会创建一个新的 Socket 实例，用于与客户端进行通信。

在传统阻塞式 I/O 编程中，每个连接都需要一个单独的线程进行处理，这导致了在高并发场景下的性能问题。在接下来的客户端测试用例中会看到。

为了解决传统阻塞式 I/O 的性能问题，Java NIO 引入了 [ServerSocketChannel 和 SocketChannel](https://javabetter.cn/nio/network-connect.html)。它们是非阻塞 I/O，可以在单个线程中处理多个连接。

- ServerSocketChannel：类似于 ServerSocket，表示服务器端套接字通道。它负责监听客户端连接请求，并可以设置为非阻塞模式，这意味着在等待客户端连接请求时不会阻塞线程。
- SocketChannel：类似于 Socket，表示客户端套接字通道。它负责与服务器端建立连接并进行数据的读写。SocketChannel 也可以设置为非阻塞模式，在读写数据时不会阻塞线程。

再来简单说一下 [Selector](https://javabetter.cn/nio/buffer-channel.html)，后面会再细讲。

Selector 是 Java NIO 中的一个关键组件，用于实现 [I/O 多路复用](https://javabetter.cn/nio/moxing.html)。它允许在单个线程中同时监控多个 ServerSocketChannel 和 SocketChannel，并通过 SelectionKey 标识关注的事件。当某个事件发生时，Selector 会将对应的 SelectionKey 添加到已选择的键集合中。通过使用 Selector，可以在单个线程中同时处理多个连接，从而有效地提高 I/O 操作的性能，特别是在高并发场景下。

客户端测试用例：

```java
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

### 03、小结

本篇内容主要讲了 NIO（New IO）和传统 IO 之间的差异，包括 IO 模型、操作文件、网络传输等方面。

- 传统 I/O 采用阻塞式模型，线程在 I/O 操作期间无法执行其他任务。NIO 使用非阻塞模型，允许线程在等待 I/O 时执行其他任务，通过选择器（Selector）监控多个通道（Channel）上的 I/O 事件，提高性能和可伸缩性。
- 传统 I/O 使用基于字节流或字符流的类（如 FileInputStream、BufferedReader 等）进行文件读写。NIO 使用通道（Channel）和缓冲区（Buffer）进行文件操作，NIO 在性能上的优势并不大。
- 传统 I/O 使用 Socket 和 ServerSocket 进行网络传输，存在阻塞问题。NIO 提供了 SocketChannel 和 ServerSocketChannel，支持非阻塞网络传输，提高了并发处理能力。

---

GitHub 上标星 9300+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 9300+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
