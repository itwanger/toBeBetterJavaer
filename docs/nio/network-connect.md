---
title: Java NIO 网络编程实践：从入门到精通 - 沉默王二 - java进阶之路
shortTitle: NIO 网络编程实践
category:
  - Java核心
tag:
  - Java NIO
description: Java程序员进阶之路，小白的零基础Java教程，使用Java NIO完成网络通信
author: 沉默王二
head:
  - - meta
    - name: keywords
      content: java,nio,网络编程
---

# 12.5 NIO 网络编程实践

在此之前，我们曾利用 Java 的套接字 Socket 和 ServerSocket 完成[网络编程](https://tobebetterjavaer.com/socket/socket.html)，但 Socket 和 ServerSocket 是基于 Java IO 的，在网络编程方面，性能会比较差。[原因我们在之前也讲过](https://tobebetterjavaer.com/nio/nio-better-io.html)。

那 Java NIO 的 SocketChannel 和 ServerSocketChannel 性能怎么样呢？

### SocketChannel 和 ServerSocketChannel

在学习 NIO 的[第一讲里](https://tobebetterjavaer.com/nio/nio-better-io.html)，我们已经介绍过 SocketChannel 和 ServerSocketChannel了，这里再简单补充下。

ServerSocketChannel 用于创建服务器端套接字，而 SocketChannel 用于创建客户端套接字。它们都支持阻塞和非阻塞模式，通过设置其 blocking 属性来切换。阻塞模式下，读/写操作会一直阻塞直到完成，而非阻塞模式下，读/写操作会立即返回。

阻塞模式：

- 优点：编程简单，适合低并发场景。
- 缺点：性能较差，不适合高并发场景。

非阻塞模式：

- 优点：性能更好，适合高并发场景。
- 缺点：编程相对复杂。

我们来看一个简单的示例（阻塞模式下）：

先来看 Server 端的：

```java
public class BlockingServer {
    public static void main(String[] args) throws IOException {
        // 创建服务器套接字
        ServerSocketChannel serverSocketChannel = ServerSocketChannel.open();
        // 绑定端口
        serverSocketChannel.socket().bind(new InetSocketAddress(8080));
        // 设置为阻塞模式（默认为阻塞模式）
        serverSocketChannel.configureBlocking(true);

        while (true) {
            // 接收客户端连接
            SocketChannel socketChannel = serverSocketChannel.accept();
            // 分配缓冲区
            ByteBuffer buffer = ByteBuffer.allocate(1024);

            // 读取数据
            int bytesRead = socketChannel.read(buffer);
            while (bytesRead != -1) {
                buffer.flip();
                System.out.println(StandardCharsets.UTF_8.decode(buffer));
                buffer.clear();
                bytesRead = socketChannel.read(buffer);
            }
            // 关闭套接字
            socketChannel.close();
        }
    }
}
```

简单解释一下这段代码，也比较好理解。

首先创建服务器端套接字ServerSocketChannel，然后绑定 8080 端口，接着使用 while 循环监听客户端套接字。如果接收到客户端连接 SocketChannel，就从通道里读取数据到缓冲区 ByteBuffer，一直读到通道里没有数据，关闭当前通道。

其中 `serverSocketChannel.configureBlocking(true)` 用来设置通道为阻塞模式（可以缺省）。

再来看客户端的：

```java
public class BlockingClient {
    public static void main(String[] args) throws IOException {
        // 创建客户端套接字
        SocketChannel socketChannel = SocketChannel.open();
        // 连接服务器
        socketChannel.connect(new InetSocketAddress("localhost", 8080));
        // 分配缓冲区
        ByteBuffer buffer = ByteBuffer.allocate(1024);

        // 向服务器发送数据
        buffer.put("沉默王二，这是来自客户端的消息。".getBytes(StandardCharsets.UTF_8));
        buffer.flip();
        socketChannel.write(buffer);
        // 清空缓冲区
        buffer.clear();

        // 关闭套接字
        socketChannel.close();
    }
}
```

客户端代码就更简单了，建立通道 SocketChannel，连接服务器，然后在缓冲区里放一段数据，之后写入到通道中，关闭套接字。

先运行 BlockingServer，再运行 BlockingClient，可以在 Server 端的控制台收到以下信息。

![](https://cdn.tobebetterjavaer.com/stutymore/network-connect-20230407124624.png)

好，我们再来看非阻塞模式下的示例。

先来看 Server 端：

```java
public class NonBlockingServer {
    public static void main(String[] args) throws IOException {
        // 创建服务器套接字
        ServerSocketChannel serverSocketChannel = ServerSocketChannel.open();
        // 绑定端口
        serverSocketChannel.socket().bind(new InetSocketAddress(8080));
        // 设置为非阻塞模式
        serverSocketChannel.configureBlocking(false);

        // 创建选择器
        Selector selector = Selector.open();
        // 注册服务器套接字到选择器
        serverSocketChannel.register(selector, SelectionKey.OP_ACCEPT);

        while (true) {
            selector.select();
            Set<SelectionKey> selectedKeys = selector.selectedKeys();
            Iterator<SelectionKey> iterator = selectedKeys.iterator();

            while (iterator.hasNext()) {
                SelectionKey key = iterator.next();
                iterator.remove();

                if (key.isAcceptable()) {
                    // 接收客户端连接
                    SocketChannel socketChannel = serverSocketChannel.accept();
                    socketChannel.configureBlocking(false);
                    socketChannel.register(selector, SelectionKey.OP_READ);
                }

                if (key.isReadable()) {
                    // 读取数据
                    SocketChannel socketChannel = (SocketChannel) key.channel();
                    ByteBuffer buffer = ByteBuffer.allocate(1024);
                    int bytesRead = socketChannel.read(buffer);

                    if (bytesRead != -1) {
                        buffer.flip();
                        System.out.print(StandardCharsets.UTF_8.decode(buffer));
                        buffer.clear();
                    } else {
                        // 客户端已断开连接，取消选择键并关闭通道
                        key.cancel();
                        socketChannel.close();
                    }
                }
            }
        }
    }
}
```

与之前阻塞模式相同的，我们就不再赘述了，只说不同的。

①、首先，创建一个 ServerSocketChannel，并将其设置为非阻塞模式。

```java
ServerSocketChannel serverSocketChannel = ServerSocketChannel.open();
serverSocketChannel.configureBlocking(false);
```

②、创建一个 Selector 实例，用于处理多个通道的事件。

```java
Selector selector = Selector.open();
```

③、将 ServerSocketChannel 注册到 Selector 上，并设置感兴趣的事件为 OP_ACCEPT。这意味着当有新的客户端连接请求时，Selector 会通知我们。

```java
serverSocketChannel.register(selector, SelectionKey.OP_ACCEPT);
```

看一下 OP_ACCEPT 的注释：

![](https://cdn.tobebetterjavaer.com/stutymore/network-connect-20230407130621.png)


④、循环处理 Selector 中的事件。首先调用 `selector.select()` 方法来等待感兴趣的事件发生。这个方法会阻塞，直到至少有一个感兴趣的事件发生。

```java
while (true) {
    int readyChannels = selector.select();
    if (readyChannels == 0) {
        continue;
    }
    // ...
}
```

⑤、当 `selector.select()` 返回时，我们可以通过 `selector.selectedKeys()` 获取所有已就绪的事件，并对其进行迭代处理。在处理事件时，根据 SelectionKey 的类型来执行相应的操作。

```java
Set<SelectionKey> selectedKeys = selector.selectedKeys();
Iterator<SelectionKey> keyIterator = selectedKeys.iterator();
while (keyIterator.hasNext()) {
    SelectionKey key = keyIterator.next();
    // 处理事件
    // ...
    keyIterator.remove();
}
```

⑥、当 SelectionKey 的类型为 OP_ACCEPT 时，说明有新的客户端连接请求。此时，我们需要接受新的连接，并将新创建的 SocketChannel 设置为非阻塞模式。然后，将该 SocketChannel 注册到 Selector 上，并设置感兴趣的事件为 OP_READ。

```java
if (key.isAcceptable()) {
    ServerSocketChannel server = (ServerSocketChannel) key.channel();
    SocketChannel client = server.accept();
    client.configureBlocking(false);
    client.register(selector, SelectionKey.OP_READ);
}
```

⑦、当 SelectionKey 的类型为 OP_READ 时，说明有客户端发送了数据。我们需要从 SocketChannel 中读取数据，并进行相应的处理。

```java
if (key.isReadable()) {
    SocketChannel client = (SocketChannel) key.channel();
    ByteBuffer buffer = ByteBuffer.allocate(1024);
    int bytesRead = client.read(buffer);
    // 对读取到的数据进行处理
    // ...
}
```

⑧、（如果可以的话）当 SelectionKey 的类型为 OP_WRITE 时，说明可以向客户端发送数据。我们可以将要发送的数据写入 SocketChannel。

```java
if (key.isWritable()) {
    SocketChannel client = (SocketChannel) key.channel();
    ByteBuffer buffer = ByteBuffer.wrap("你好，客户端".getBytes());
   client.write(buffer);
}
```

不过，本例中并没有这一步。如果需要的话，可以按照这样的方式向客户端写入数据。

⑨、在服务器停止运行时，需要关闭 Selector 和 ServerSocketChannel，释放资源。

```java
key.cancel();
socketChannel.close();
```

好，接下来，我们来看客户端的。

```java
public class NonBlockingClient {
    public static void main(String[] args) throws IOException {
        // 创建客户端套接字
        SocketChannel socketChannel = SocketChannel.open();
        // 设置为非阻塞模式
        socketChannel.configureBlocking(false);
        // 连接服务器
        socketChannel.connect(new InetSocketAddress("localhost", 8080));

        while (!socketChannel.finishConnect()) {
            // 等待连接完成
        }

        // 分配缓冲区
        ByteBuffer buffer = ByteBuffer.allocate(1024);

        // 向服务器发送数据
        String message = "你好，沉默王二，这是来自客户端的消息。";
        buffer.put(message.getBytes(StandardCharsets.UTF_8));
        buffer.flip();
        socketChannel.write(buffer);
        // 清空缓冲区
        buffer.clear();

        // 关闭套接字
        socketChannel.close();
    }
}
```

客户端代码依然比较简单，我们直接略过，不再解释。然后运行 Server，再运行 Client。可以运行多次，结果如下：

![](https://cdn.tobebetterjavaer.com/stutymore/network-connect-20230407131553.png)

### Scatter 和 Gather

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

### 异步



### 简单的聊天室




---------

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)