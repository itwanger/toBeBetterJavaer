---
title: 详解Java NIO的Buffer缓冲区和Channel管道
shortTitle: Buffer和Channel
category:
  - Java核心
tag:
  - Java NIO
description: Java程序员进阶之路，小白的零基础Java教程，Java NIO 快速入门(buffer缓冲区、Channel管道、Selector选择器)
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java进阶之路,Java入门,教程,nio,buffer,channel,selector,java nio,java buffer,java channel
---

# 12.3 Buffer 和 Channel

首先我们来看看**IO 和 NIO 的区别**：

- 可简单认为：**IO 是面向流的处理，NIO 是面向块(缓冲区)的处理**
- 面向流的 I/O 系统**一次一个字节地处理数据**。
- 一个面向块(缓冲区)的 I/O 系统**以块的形式处理数据**。

NIO 主要有**三个核心部分组成**：

- **buffer 缓冲区**
- **Channel 管道**
- **Selector 选择器**

在 NIO 中，并不是以流的方式来处理数据的，而是以 buffer 缓冲区和 Channel 管道**配合使用**来处理数据的。

简单理解一下：

可以把 Channel 管道比作铁路，buffer 缓冲区比作成火车(运载着货物)

而我们的 NIO 就是**通过 Channel 管道运输着存储数据的 Buffer 缓冲区的来实现数据的处理**！

要时刻记住：Channel 不与数据打交道，它只负责运输数据。与数据打交道的是 Buffer 缓冲区

- **Channel-->运输**
- **Buffer-->数据**

相对于传统 IO 而言，**流是单向的**。对于 NIO 而言，有了 Channel 管道这个概念，我们的**读写都是双向**的(铁路上的火车能从广州去北京、自然就能从北京返还到广州)！

### buffer 缓冲区核心要点

我们来看看 Buffer 缓冲区有什么值得我们注意的地方。

Buffer 是缓冲区的抽象类：

![](https://cdn.tobebetterjavaer.com/stutymore/rumen-20230404151539.png)

其中 ByteBuffer 是**用得最多的实现类**(在管道中读写字节数据)。

![](https://cdn.tobebetterjavaer.com/stutymore/rumen-20230404152253.png)

拿到一个缓冲区我们往往会做什么？很简单，就是**读取缓冲区的数据/写数据到缓冲区中**。所以，缓冲区的核心方法就是 put 和 get：

![](https://cdn.tobebetterjavaer.com/stutymore/rumen-20230404152445.png)

Buffer 类维护了 4 个核心变量来提供**关于其所包含的数组信息**。它们是：

- 容量 Capacity **缓冲区能够容纳的数据元素的最大数量**。容量在缓冲区创建时被设定，并且永远不能被改变。(不能被改变的原因也很简单，底层是数组嘛)
- 上界 Limit **缓冲区里的数据的总数**，代表了当前缓冲区中一共有多少数据。
- 位置 Position **下一个要被读或写的元素的位置**。Position 会自动由相应的 `get()`和 `put()`函数更新。
- 标记 Mark 一个备忘位置。**用于记录上一次读写的位置**。

### buffer 代码演示

首先展示一下**是如何创建缓冲区的，核心变量的值是怎么变化的**。

```java
// 创建一个缓冲区
ByteBuffer byteBuffer = ByteBuffer.allocate(1024);

// 看一下初始时4个核心变量的值
System.out.println("初始时-->limit--->"+byteBuffer.limit());
System.out.println("初始时-->position--->"+byteBuffer.position());
System.out.println("初始时-->capacity--->"+byteBuffer.capacity());
System.out.println("初始时-->mark--->" + byteBuffer.mark());

System.out.println("--------------------------------------");

// 添加一些数据到缓冲区中
String s = "沉默王二";
byteBuffer.put(s.getBytes());

// 看一下初始时4个核心变量的值
System.out.println("put完之后-->limit--->"+byteBuffer.limit());
System.out.println("put完之后-->position--->"+byteBuffer.position());
System.out.println("put完之后-->capacity--->"+byteBuffer.capacity());
System.out.println("put完之后-->mark--->" + byteBuffer.mark());
```

运行结果：

```
初始时-->limit--->1024
初始时-->position--->0
初始时-->capacity--->1024
初始时-->mark--->java.nio.HeapByteBuffer[pos=0 lim=1024 cap=1024]
--------------------------------------
put完之后-->limit--->1024
put完之后-->position--->12
put完之后-->capacity--->1024
put完之后-->mark--->java.nio.HeapByteBuffer[pos=12 lim=1024 cap=1024]
```

现在**我想要从缓存区拿数据**，怎么拿呀？？NIO 给了我们一个`flip()`方法。这个方法可以**改动 position 和 limit 的位置**！

在之前代码的基础上，我们`flip()`一下。

```java
// flip()方法
byteBuffer.flip();
System.out.println("flip()方法之后-->limit--->"+byteBuffer.limit());
System.out.println("flip()方法之后-->position--->"+byteBuffer.position());
System.out.println("flip()方法之后-->capacity--->"+byteBuffer.capacity());
System.out.println("flip()方法之后-->mark--->" + byteBuffer.mark());
```

再看看 4 个核心属性的值会发生什么变化：

![](https://cdn.tobebetterjavaer.com/stutymore/rumen-20230404153844.png)

在调用 `flip()` 之后，limit 变为当前 position 的值（12），position 重置为 0。这意味着你可以从缓冲区的开始位置读取刚刚写入的数据，直到 limit 指定的位置。capacity 保持不变（1024）。

假设我们有一个初始容量为 1024 的 ByteBuffer。

**初始状态**:

```
position = 0
limit = 1024
capacity = 1024
```

**添加数据 "沉默王二" 后**:

由于 "沉默王二" 为 UTF-8 编码，一个汉字占 3 个字节，共有 4 个汉字，所以占用 12 个字节。

```
position = 12
limit = 1024
capacity = 1024
```

**调用 `flip()` 方法后**:

```
position = 0
limit = 12
capacity = 1024
```

用一幅图来表示就是。

![](https://cdn.tobebetterjavaer.com/stutymore/rumen-20230404155658.png)

当切换成读模式之后，我们就可以读取缓冲区的数据了：

```java
// 创建一个limit()大小的字节数组(因为就只有limit这么多个数据可读)
byte[] bytes = new byte[byteBuffer.limit()];
// 将读取的数据装进我们的字节数组中
byteBuffer.get(bytes);
// 输出数据
System.out.println(new String(bytes, 0, bytes.length));
```

输出后的结果：

```
沉默王二
```

随后输出一下核心变量的值看看：

![](https://cdn.tobebetterjavaer.com/stutymore/rumen-20230404160130.png)

**读完如何还想写数据到缓冲区**，那就使用`clear()` 方法，这个方法会“清空”缓冲区，数据没有真正被清空，只是被**遗忘**掉了

![](https://cdn.tobebetterjavaer.com/stutymore/rumen-20230404160412.png)

### FileChannel 通道核心要点

Channel 通道**只负责传输数据、不直接操作数据**。操作数据都是通过 Buffer 缓冲区来进行操作！

```java
FileChannel.open(Paths.get("docs/配套教程.md"), StandardOpenOption.WRITE);
```

这里我们用到了 [Paths](https://tobebetterjavaer.com/nio/paths-files.html)，这个后面也会讲到。

使用**FileChannel 配合缓冲区**实现文件复制的功能：

```java
try (FileChannel sourceChannel = FileChannel.open(Paths.get("logs/javabetter/itwanger.txt"), StandardOpenOption.READ);
    FileChannel destinationChannel = FileChannel.open(Paths.get("logs/javabetter/itwanger1.txt"), StandardOpenOption.WRITE, StandardOpenOption.CREATE)) {

  ByteBuffer buffer = ByteBuffer.allocate(1024);

  while (sourceChannel.read(buffer) != -1) {
      buffer.flip();
      destinationChannel.write(buffer);
      buffer.clear();
  }
}
```

我们创建一个容量为 1024 的 ByteBuffer 作为缓冲区。在循环中，我们从源文件的 FileChannel 读取数据到缓冲区。当 read() 方法返回 -1 时，表示已经到达文件末尾。读取数据后，我们调用 `flip()` 方法，以便在缓冲区中准备好要写入的数据。然后，我们将缓冲区的内容写入目标文件的 FileChannel。在写入完成后，我们调用 `clear()` 方法重置缓冲区，以便在下一次迭代中重用它。

使用**内存映射文件**的方式实现**文件复制**的功能(直接操作缓冲区)：

```java
try (FileChannel sourceChannel = FileChannel.open(Paths.get("logs/javabetter/itwanger.txt"), StandardOpenOption.READ);
      FileChannel destinationChannel = FileChannel.open(Paths.get("logs/javabetter/itwanger2.txt"), StandardOpenOption.WRITE, StandardOpenOption.CREATE, StandardOpenOption.READ)) {

    long fileSize = sourceChannel.size();
    MappedByteBuffer sourceMappedBuffer = sourceChannel.map(FileChannel.MapMode.READ_ONLY, 0, fileSize);
    MappedByteBuffer destinationMappedBuffer = destinationChannel.map(FileChannel.MapMode.READ_WRITE, 0, fileSize);

    for (int i = 0; i < fileSize; i++) {
        byte b = sourceMappedBuffer.get(i);
        destinationMappedBuffer.put(i, b);
    }
}
```

源文件的 MappedByteBuffer 设置为只读模式（READ_ONLY），而目标文件的 MappedByteBuffer 设置为读写模式（READ_WRITE）。在循环中，我们逐字节地从源文件的 MappedByteBuffer 读取数据并将其写入目标文件的 MappedByteBuffer。这样就实现了文件复制功能。利用内存映射文件实现的文件复制，可能会比使用 ByteBuffer 的方法更快。

通道之间通过`transfer()`实现数据的传输(直接操作缓冲区)：

```java
try (FileChannel sourceChannel = FileChannel.open(Paths.get("logs/javabetter/itwanger.txt"), StandardOpenOption.READ);
      FileChannel destinationChannel = FileChannel.open(Paths.get("logs/javabetter/itwanger3.txt"), StandardOpenOption.WRITE, StandardOpenOption.CREATE, StandardOpenOption.READ)) {
    sourceChannel.transferTo(0, sourceChannel.size(), destinationChannel);
} catch (IOException e) {
    throw new RuntimeException(e);
}
```

### 直接与非直接缓冲区

直接缓冲区和非直接缓冲区的差别主要在于它们在内存中的存储方式。这里给出了直接缓冲区和非直接缓冲区的简要概述和区别：

非直接缓冲区：

- 分配在 JVM 堆内存中
- 受到垃圾回收的管理
- 在读写操作时，需要将数据从堆内存复制到操作系统的本地内存，再进行 I/O 操作
- 创建： `ByteBuffer.allocate(int capacity)`

直接缓冲区：

- 分配在操作系统的本地内存中
- 不受垃圾回收的管理
- 在读写操作时，直接在本地内存中进行，避免了数据复制，提高了性能
- 创建： `ByteBuffer.allocateDirect(int capacity)`

除此之外，就是前面提到的 `FileChannel.map()` 方法。

### scatter 和 gather

Scatter 和 Gather 是 Java NIO 中两种高效的 I/O 操作，用于将数据分散到多个缓冲区或从多个缓冲区中收集数据。

Scatter（分散）：它将从 Channel 读取的数据分散（写入）到多个缓冲区。这种操作可以在读取数据时将其分散到不同的缓冲区，有助于处理结构化数据。例如，我们可以将消息头、消息体和消息尾分别写入不同的缓冲区。

Gather（聚集）：与 Scatter 相反，它将多个缓冲区中的数据聚集（读取）并写入到一个 Channel。这种操作允许我们在发送数据时从多个缓冲区中聚集数据。例如，我们可以将消息头、消息体和消息尾从不同的缓冲区中聚集到一起并写入到同一个 Channel。

来写一个完整的 demo，先看 Server。

```java
// 创建一个ServerSocketChannel
ServerSocketChannel serverSocketChannel = ServerSocketChannel.open();
serverSocketChannel.socket().bind(new InetSocketAddress(9000));

// 接受连接
SocketChannel socketChannel = serverSocketChannel.accept();

// Scatter：分散读取数据到多个缓冲区
ByteBuffer headerBuffer = ByteBuffer.allocate(128);
ByteBuffer bodyBuffer = ByteBuffer.allocate(1024);

ByteBuffer[] buffers = {headerBuffer, bodyBuffer};

long bytesRead = socketChannel.read(buffers);

// 输出缓冲区数据
headerBuffer.flip();
while (headerBuffer.hasRemaining()) {
    System.out.print((char) headerBuffer.get());
}

System.out.println();

bodyBuffer.flip();
while (bodyBuffer.hasRemaining()) {
    System.out.print((char) bodyBuffer.get());
}

// Gather：聚集数据从多个缓冲区写入到Channel
ByteBuffer headerResponse = ByteBuffer.wrap("Header Response".getBytes());
ByteBuffer bodyResponse = ByteBuffer.wrap("Body Response".getBytes());

ByteBuffer[] responseBuffers = {headerResponse, bodyResponse};

long bytesWritten = socketChannel.write(responseBuffers);

// 关闭连接
socketChannel.close();
serverSocketChannel.close();
```

再来看 Client：

```java
// 创建一个SocketChannel
SocketChannel socketChannel = SocketChannel.open();
socketChannel.connect(new InetSocketAddress("localhost", 9000));

// 发送数据到服务器
String header = "Header Content";
String body = "Body Content";

ByteBuffer headerBuffer = ByteBuffer.wrap(header.getBytes());
ByteBuffer bodyBuffer = ByteBuffer.wrap(body.getBytes());

ByteBuffer[] buffers = {headerBuffer, bodyBuffer};
socketChannel.write(buffers);

// 从服务器接收数据
ByteBuffer headerResponseBuffer = ByteBuffer.allocate(128);
ByteBuffer bodyResponseBuffer = ByteBuffer.allocate(1024);

ByteBuffer[] responseBuffers = {headerResponseBuffer, bodyResponseBuffer};

long bytesRead = socketChannel.read(responseBuffers);

// 输出接收到的数据
headerResponseBuffer.flip();
while (headerResponseBuffer.hasRemaining()) {
    System.out.print((char) headerResponseBuffer.get());
}

bodyResponseBuffer.flip();
while (bodyResponseBuffer.hasRemaining()) {
    System.out.print((char) bodyResponseBuffer.get());
}

// 关闭连接
socketChannel.close();
```

在这个示例中，我们使用了 Scattering 从 SocketChannel 分散读取数据到多个缓冲区，并使用 Gathering 将数据从多个缓冲区聚集写入到 SocketChannel。通过这种方式，我们可以方便地处理多个缓冲区中的数据。

### 小结

Java NIO 中的 Buffer 和 Channel 是 NIO 系统的核心组件。Buffer 负责存储数据，提供了对数据的读写操作。它有多种类型，如 ByteBuffer、CharBuffer、IntBuffer 等，以支持不同的数据类型。Channel 代表了与 I/O 设备（如文件或套接字）之间的连接。它提供了从源设备到 Buffer 的数据读取能力和从 Buffer 到目标设备的数据写入能力。Channel 可以是可读、可写或同时可读写的。NIO 使用这两个组件进行高效的数据传输，以提高 I/O 操作的性能。

> 参考链接：[https://www.zhihu.com/question/29005375/answer/667616386](https://www.zhihu.com/question/29005375/answer/667616386)，整理：沉默王二

---

最近整理了一份牛逼的学习资料，包括但不限于 Java 基础部分（JVM、Java 集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类 Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是 2022 年全网最全的学习和找工作的 PDF 资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
