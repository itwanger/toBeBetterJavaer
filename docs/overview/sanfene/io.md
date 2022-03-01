### 42.Java 中 IO 流分为几种?

流按照不同的特点，有很多种划分方式。

- 按照流的流向分，可以分为**输入流**和**输出流**；
- 按照操作单元划分，可以划分为**字节流**和**字符流**；
- 按照流的角色划分为**节点流**和**处理流**

Java Io 流共涉及 40 多个类，看上去杂乱，其实都存在一定的关联， Java I0 流的 40 多个类都是从如下 4 个抽象类基类中派生出来的。

- **InputStream**/**Reader**: 所有的输入流的基类，前者是字节输入流，后者是字符输入流。
- **OutputStream**/**Writer**: 所有输出流的基类，前者是字节输出流，后者是字符输出流。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/sanfene/io-1.jpeg)

> IO 流用到了什么设计模式？

其实，Java 的 IO 流体系还用到了一个设计模式——**装饰器模式**。

InputStream 相关的部分类图如下，篇幅有限，装饰器模式就不展开说了。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/sanfene/io-2.png)

### 43.既然有了字节流,为什么还要有字符流?

其实字符流是由 Java 虚拟机将字节转换得到的，问题就出在这个过程还比较耗时，并且，如果我们不知道编码类型就很容易出现乱码问题。

所以， I/O 流就干脆提供了一个直接操作字符的接口，方便我们平时对字符进行流操作。如果音频文件、图片等媒体文件用字节流比较好，如果涉及到字符的话使用字符流比较好。

### 44.BIO、NIO、AIO？

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/sanfene/io-3.png)

**BIO**(blocking I/O) ： 就是传统的 IO，同步阻塞，服务器实现模式为一个连接一个线程，即**客户端有连接请求时服务器端就需要启动一个线程进行处理**，如果这个连接不做任何事情会造成不必要的线程开销，可以通过连接池机制改善(实现多个客户连接服务器)。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/sanfene/io-4.png)

BIO 方式适用于连接数目比较小且固定的架构，这种方式对服务器资源要求比较高，并发局限于应用中，JDK1.4 以前的唯一选择，程序简单易理解。

**NIO** ：全称 java non-blocking IO，是指 JDK 提供的新 API。从 JDK1.4 开始，Java 提供了一系列改进的输入/输出的新特性，被统称为 NIO(即 New IO)。

NIO 是**同步非阻塞**的，服务器端用一个线程处理多个连接，客户端发送的连接请求会注册到多路复用器上，多路复用器轮询到连接有 IO 请求就进行处理：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/sanfene/io-5.png)

NIO 的数据是面向**缓冲区 Buffer**的，必须从 Buffer 中读取或写入。

所以完整的 NIO 示意图：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/sanfene/io-6.png)

可以看出，NIO 的运行机制：

- 每个 Channel 对应一个 Buffer。
- Selector 对应一个线程，一个线程对应多个 Channel。
- Selector 会根据不同的事件，在各个通道上切换。
- Buffer 是内存块，底层是数据。

**AIO**：JDK 7 引入了 Asynchronous I/O，是**异步不阻塞**的 IO。在进行 I/O 编程中，常用到两种模式：Reactor 和 Proactor。Java 的 NIO 就是 Reactor，当有事件触发时，服务器端得到通知，进行相应的处理，完成后才通知服务端程序启动线程去处理，一般适用于连接数较多且连接时间较长的应用。
