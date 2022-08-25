---
title: 一文彻底理解 Java NIO 核心组件
shortTitle: 一文彻底理解NIO核心组件
category:
  - Java核心
tag:
  - Java IO
description: Java程序员进阶之路，小白的零基础Java教程，一文彻底理解 Java NIO 核心组件
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java 基础,Java 教程,Java 程序员进阶之路,Java 入门,Java IO,java NIO
---

**同步、异步、阻塞、非阻塞**

首先，这几个概念非常容易搞混淆，但NIO中又有涉及，所以总结一下。

*   同步：API调用返回时调用者就知道操作的结果如何了（实际读取/写入了多少字节）。
*   异步：相对于同步，API调用返回时调用者不知道操作的结果，后面才会回调通知结果。
*   阻塞：当无数据可读，或者不能写入所有数据时，挂起当前线程等待。
*   非阻塞：读取时，可以读多少数据就读多少然后返回，写入时，可以写入多少数据就写入多少然后返回。

对于I/O操作，根据Oracle官网的文档，同步异步的划分标准是“调用者是否需要等待I/O操作完成”，这个“等待I/O操作完成”的意思不是指一定要读取到数据或者说写入所有数据，而是指真正进行I/O操作时，比如数据在TCP/IP协议栈缓冲区和JVM缓冲区之间传输的这段时间，调用者是否要等待。

所以，我们常用的 read() 和 write() 方法都是同步I/O，同步I/O又分为阻塞和非阻塞两种模式，如果是非阻塞模式，检测到无数据可读时，直接就返回了，并没有真正执行I/O操作。

总结就是，Java中实际上只有 同步阻塞I/O、同步非阻塞I/O 与 异步I/O 三种机制，我们下文所说的是前两种，JDK 1.7才开始引入异步 I/O，那称之为NIO.2。

## 传统IO

我们知道，一个新技术的出现总是伴随着改进和提升，Java NIO的出现亦如此。

传统 I/O 是阻塞式I/O，主要问题是系统资源的浪费。比如我们为了读取一个TCP连接的数据，调用 InputStream 的 read() 方法，这会使当前线程被挂起，直到有数据到达才被唤醒，那该线程在数据到达这段时间内，占用着内存资源（存储线程栈）却无所作为，也就是俗话说的占着茅坑不拉屎，为了读取其他连接的数据，我们不得不启动另外的线程。在并发连接数量不多的时候，这可能没什么问题，然而当连接数量达到一定规模，内存资源会被大量线程消耗殆尽。另一方面，线程切换需要更改处理器的状态，比如程序计数器、寄存器的值，因此非常频繁的在大量线程之间切换，同样是一种资源浪费。

随着技术的发展，现代操作系统提供了新的I/O机制，可以避免这种资源浪费。基于此，诞生了Java NIO，NIO的代表性特征就是非阻塞I/O。紧接着我们发现，简单的使用非阻塞I/O并不能解决问题，因为在非阻塞模式下，read()方法在没有读取到数据时就会立即返回，不知道数据何时到达的我们，只能不停的调用read()方法进行重试，这显然太浪费CPU资源了，从下文可以知道，Selector组件正是为解决此问题而生。

## Java NIO 核心组件

### 1.Channel

#### 概念

Java NIO中的所有I/O操作都基于Channel对象，就像流操作都要基于Stream对象一样，因此很有必要先了解Channel是什么。以下内容摘自JDK 1.8的文档

> A channel represents an open connection to an entity such as a
> 
> hardware device, a file, a network socket, or a program component that
> 
> is capable of performing one or more distinct I/O operations, for
> 
> example reading or writing.

从上述内容可知，一个Channel（通道）代表和某一实体的连接，这个实体可以是文件、网络套接字等。也就是说，通道是Java NIO提供的一座桥梁，用于我们的程序和操作系统底层I/O服务进行交互。

通道是一种很基本很抽象的描述，和不同的I/O服务交互，执行不同的I/O操作，实现不一样，因此具体的有FileChannel、SocketChannel等。

通道使用起来跟Stream比较像，可以读取数据到Buffer中，也可以把Buffer中的数据写入通道。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/segmentfault-yiwrncdlxjavaniohxzjsegmentfaultsp-393f5b9a-8268-4177-ad19-f207b5064466.png)

当然，也有区别，主要体现在如下两点：

*   一个通道，既可以读又可以写，而一个Stream是单向的（所以分 InputStream 和 OutputStream）
*   通道有非阻塞I/O模式

#### 实现

Java NIO中最常用的通道实现是如下几个，可以看出跟传统的 I/O 操作类是一一对应的。

*   FileChannel：读写文件
*   DatagramChannel: UDP协议网络通信
*   SocketChannel：TCP协议网络通信
*   ServerSocketChannel：监听TCP连接

### 2.Buffer

NIO中所使用的缓冲区不是一个简单的byte数组，而是封装过的Buffer类，通过它提供的API，我们可以灵活的操纵数据，下面细细道来。

与Java基本类型相对应，NIO提供了多种 Buffer 类型，如ByteBuffer、CharBuffer、IntBuffer等，区别就是读写缓冲区时的单位长度不一样（以对应类型的变量为单位进行读写）。

Buffer中有3个很重要的变量，它们是理解Buffer工作机制的关键，分别是

*   capacity （总容量）
*   position （指针当前位置）
*   limit （读/写边界位置）

Buffer的工作方式跟C语言里的字符数组非常的像，类比一下，capacity就是数组的总长度，position就是我们读/写字符的下标变量，limit就是结束符的位置。Buffer初始时3个变量的情况如下图

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/segmentfault-yiwrncdlxjavaniohxzjsegmentfaultsp-5f1a7222-15cf-41e0-a6c6-729aec5e0a97.png)

在对Buffer进行读/写的过程中，position会往后移动，而 limit 就是 position 移动的边界。由此不难想象，在对Buffer进行写入操作时，limit应当设置为capacity的大小，而对Buffer进行读取操作时，limit应当设置为数据的实际结束位置。（注意：将Buffer数据 写入 通道是Buffer 读取 操作，从通道 读取 数据到Buffer是Buffer 写入 操作）

在对Buffer进行读/写操作前，我们可以调用Buffer类提供的一些辅助方法来正确设置 position 和 limit 的值，主要有如下几个

*   flip(): 设置 limit 为 position 的值，然后 position 置为0。对Buffer进行读取操作前调用。
*   rewind(): 仅仅将 position

置0。一般是在重新读取Buffer数据前调用，比如要读取同一个Buffer的数据写入多个通道时会用到。
*   clear(): 回到初始状态，即 limit 等于 capacity，position 置0。重新对Buffer进行写入操作前调用。
*   compact(): 将未读取完的数据（position 与 limit 之间的数据）移动到缓冲区开头，并将 position

设置为这段数据末尾的下一个位置。其实就等价于重新向缓冲区中写入了这么一段数据。

然后，看一个实例，使用 FileChannel 读写文本文件，通过这个例子验证通道可读可写的特性以及Buffer的基本用法（注意 FileChannel 不能设置为非阻塞模式）。

```java
FileChannel channel = new RandomAccessFile("test.txt", "rw").getChannel();
channel.position(channel.size());  // 移动文件指针到末尾（追加写入）

ByteBuffer byteBuffer = ByteBuffer.allocate(20);

// 数据写入Buffer
byteBuffer.put("你好，世界！\n".getBytes(StandardCharsets.UTF_8));

// Buffer -> Channel
byteBuffer.flip();
while (byteBuffer.hasRemaining()) {
    channel.write(byteBuffer);
}

channel.position(0); // 移动文件指针到开头（从头读取）
CharBuffer charBuffer = CharBuffer.allocate(10);
CharsetDecoder decoder = StandardCharsets.UTF_8.newDecoder();

// 读出所有数据
byteBuffer.clear();
while (channel.read(byteBuffer) != -1 || byteBuffer.position() > 0) {
    byteBuffer.flip();

    // 使用UTF-8解码器解码
    charBuffer.clear();
    decoder.decode(byteBuffer, charBuffer, false);
    System.out.print(charBuffer.flip().toString());

    byteBuffer.compact(); // 数据可能有剩余
}

channel.close();
```

这个例子中使用了两个Buffer，其中 byteBuffer 作为通道读写的数据缓冲区，charBuffer 用于存储解码后的字符。clear() 和 flip() 的用法正如上文所述，需要注意的是最后那个 compact() 方法，即使 charBuffer 的大小完全足以容纳 byteBuffer 解码后的数据，这个 compact() 也必不可少，这是因为常用中文字符的UTF-8编码占3个字节，因此有很大概率出现在中间截断的情况，请看下图：

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/segmentfault-yiwrncdlxjavaniohxzjsegmentfaultsp-3e69926a-d4aa-4e1a-ac3d-b699b5a9abe9.png)

当 Decoder 读取到缓冲区末尾的 0xe4 时，无法将其映射到一个 Unicode，decode()方法第三个参数 false 的作用就是让 Decoder 把无法映射的字节及其后面的数据都视作附加数据，因此 decode() 方法会在此处停止，并且 position 会回退到 0xe4 的位置。如此一来， 缓冲区中就遗留了“中”字编码的第一个字节，必须将其 compact 到前面，以正确的和后序数据拼接起来。

BTW，例子中的 CharsetDecoder 也是 Java NIO 的一个新特性，所以大家应该发现了一点哈，NIO的操作是面向缓冲区的（传统I/O是面向流的）。

至此，我们了解了 Channel 与 Buffer 的基本用法。接下来要说的是让一个线程管理多个Channel的重要组件。

### 3.Selector

#### Selector 是什么

Selector（选择器）是一个特殊的组件，用于采集各个通道的状态（或者说事件）。我们先将通道注册到选择器，并设置好关心的事件，然后就可以通过调用select()方法，静静地等待事件发生。

通道有如下4个事件可供我们监听：

*   Accept：有可以接受的连接
*   Connect：连接成功
*   Read：有数据可读
*   Write：可以写入数据了

#### 为什么要用Selector

前文说了，如果用阻塞I/O，需要多线程（浪费内存），如果用非阻塞I/O，需要不断重试（耗费CPU）。Selector的出现解决了这尴尬的问题，非阻塞模式下，通过Selector，我们的线程只为已就绪的通道工作，不用盲目的重试了。比如，当所有通道都没有数据到达时，也就没有Read事件发生，我们的线程会在select()方法处被挂起，从而让出了CPU资源。

#### 使用方法

如下所示，创建一个Selector，并注册一个Channel。

注意：要将 Channel 注册到 Selector，首先需要将 Channel 设置为非阻塞模式，否则会抛异常。

```java
Selector selector = Selector.open();
channel.configureBlocking(false);
SelectionKey key = channel.register(selector, SelectionKey.OP_READ);
```

register()方法的第二个参数名叫“interest set”，也就是你所关心的事件集合。如果你关心多个事件，用一个“按位或运算符”分隔，比如

```java
SelectionKey.OP_READ | SelectionKey.OP_WRITE复制代码
```

这种写法一点都不陌生，支持位运算的编程语言里都这么玩，用一个整型变量可以标识多种状态，它是怎么做到的呢，其实很简单，举个例子，首先预定义一些常量，它们的值（二进制）如下

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/segmentfault-yiwrncdlxjavaniohxzjsegmentfaultsp-7a1acc85-7b5b-45d3-996d-79f39b61523d.png)

可以发现，它们值为1的位都是错开的，因此对它们进行按位或运算之后得出的值就没有二义性，可以反推出是由哪些变量运算而来。怎么判断呢，没错，就是“按位与”运算。比如，现在有一个状态集合变量值为 0011，我们只需要判断 “0011 & OP\_READ” 的值是 1 还是 0 就能确定集合是否包含 OP\_READ 状态。

然后，注意 register() 方法返回了一个SelectionKey的对象，这个对象包含了本次注册的信息，我们也可以通过它修改注册信息。从下面完整的例子中可以看到，select()之后，我们也是通过获取一个 SelectionKey 的集合来获取到那些状态就绪了的通道。

## 一个完整实例

概念和理论的东西阐述完了（其实写到这里，我发现没写出多少东西，好尴尬(⊙ˍ⊙)），看一个完整的例子吧。

这个例子使用Java NIO实现了一个单线程的服务端，功能很简单，监听客户端连接，当连接建立后，读取客户端的消息，并向客户端响应一条消息。

需要注意的是，我用字符 ‘0′（一个值为0的字节） 来标识消息结束。

### 单线程Server

```java
public class NioServer {

public static void main(String[] args) throws IOException {
    // 创建一个selector
    Selector selector = Selector.open();

    // 初始化TCP连接监听通道
    ServerSocketChannel listenChannel = ServerSocketChannel.open();
    listenChannel.bind(new InetSocketAddress(9999));
    listenChannel.configureBlocking(false);
    // 注册到selector（监听其ACCEPT事件）
    listenChannel.register(selector, SelectionKey.OP_ACCEPT);

    // 创建一个缓冲区
    ByteBuffer buffer = ByteBuffer.allocate(100);

    while (true) {
        selector.select(); //阻塞，直到有监听的事件发生
        Iterator<SelectionKey> keyIter = selector.selectedKeys().iterator();

        // 通过迭代器依次访问select出来的Channel事件
        while (keyIter.hasNext()) {
            SelectionKey key = keyIter.next();

            if (key.isAcceptable()) { // 有连接可以接受
                SocketChannel channel = ((ServerSocketChannel) key.channel()).accept();
                channel.configureBlocking(false);
                channel.register(selector, SelectionKey.OP_READ);

                System.out.println("与【" + channel.getRemoteAddress() + "】建立了连接！");

            } else if (key.isReadable()) { // 有数据可以读取
                buffer.clear();

                // 读取到流末尾说明TCP连接已断开，
                // 因此需要关闭通道或者取消监听READ事件
                // 否则会无限循环
                if (((SocketChannel) key.channel()).read(buffer) == -1) {
                    key.channel().close();
                    continue;
                } 

                // 按字节遍历数据
                buffer.flip();
                while (buffer.hasRemaining()) {
                    byte b = buffer.get();

                    if (b == 0) { // 客户端消息末尾的\0
                        System.out.println();

                        // 响应客户端
                        buffer.clear();
                        buffer.put("Hello, Client!\0".getBytes());
                        buffer.flip();
                        while (buffer.hasRemaining()) {
                            ((SocketChannel) key.channel()).write(buffer);
                        }
                    } else {
                        System.out.print((char) b);
                    }
                }
            }

            // 已经处理的事件一定要手动移除
            keyIter.remove();
        }
    }
}
}
```

### Client

这个客户端纯粹测试用，为了看起来不那么费劲，就用传统的写法了，代码很简短。

要严谨一点测试的话，应该并发运行大量Client，统计服务端的响应时间，而且连接建立后不要立刻发送数据，这样才能发挥出服务端非阻塞I/O的优势。

```java
public class Client {

public static void main(String[] args) throws Exception {
    Socket socket = new Socket("localhost", 9999);
    InputStream is = socket.getInputStream();
    OutputStream os = socket.getOutputStream();

    // 先向服务端发送数据
    os.write("Hello, Server!\0".getBytes());

    // 读取服务端发来的数据
    int b;
    while ((b = is.read()) != 0) {
        System.out.print((char) b);
    }
    System.out.println();

    socket.close();
}
}
```

### NIO vs IO

学习了NIO之后我们都会有这样一个疑问：到底什么时候该用NIO，什么时候该用传统的I/O呢？

其实了解他们的特性后，答案还是比较明确的，NIO擅长1个线程管理多条连接，节约系统资源，但是如果每条连接要传输的数据量很大的话，因为是同步I/O，会导致整体的响应速度很慢；而传统I/O为每一条连接创建一个线程，能充分利用处理器并行处理的能力，但是如果连接数量太多，内存资源会很紧张。

总结就是：连接数多数据量小用NIO，连接数少用I/O（写起来也简单- -）。

## Next

经过NIO核心组件的学习，了解了非阻塞服务端实现的基本方法。然而，细心的你们肯定也发现了，上面那个完整的例子，实际上就隐藏了很多问题。比如，例子中只是简单的将读取到的每个字节输出，实际环境中肯定是要读取到完整的消息后才能进行下一步处理，由于NIO的非阻塞特性，一次可能只读取到消息的一部分，这已经很糟糕了，如果同一条连接会连续发来多条消息，那不仅要对消息进行拼接，还需要切割，同理，例子中给客户端响应的时候，用了个while()循环，保证数据全部write完成再做其它工作，实际应用中为了性能，肯定不会这么写。另外，为了充分利用现代处理器多核心并行处理的能力，应该用一个线程组来管理这些连接的事件。

要解决这些问题，需要一个严谨而繁琐的设计，不过幸运的是，我们有开源的框架可用，那就是优雅而强大的Netty，Netty基于Java NIO，提供异步调用接口，开发高性能服务器的一个很好的选择，之前在项目中使用过，但没有深入学习，打算下一步好好学学它，到时候再写一篇笔记。

Java NIO设计的目标是为程序员提供API以享受现代操作系统最新的I/O机制，所以覆盖面较广，除了文中所涉及的组件与特性，还有很多其它的，比如 Pipe（管道）、Path（路径）、Files（文件） 等，有的是用于提升I/O性能的新组件，有的是简化I/O操作的工具，具体用法可以参看最后 References 里的链接。



>参考链接：[https://segmentfault.com/a/1190000017040893](https://segmentfault.com/a/1190000017040893)，整理：沉默王二

---------

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

关注二哥的原创公众号 **沉默王二**，回复**111** 即可免费领取。


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png)