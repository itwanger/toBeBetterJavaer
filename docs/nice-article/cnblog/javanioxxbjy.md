---
title: Java NIO 学习笔记（一）
shortTitle: Java NIO 学习笔记（一）
author: 概述，Channel/Buffer
category:
  - 博客园
---

**目录：**

[Java NIO 学习笔记（一）----概述，Channel/Buffer](https://www.cnblogs.com/czwbig/p/10035631.html)

[Java NIO 学习笔记（二）----聚集和分散，通道到通道](https://www.cnblogs.com/czwbig/p/10040349.html)

[Java NIO 学习笔记（三）----Selector](https://www.cnblogs.com/czwbig/p/10043421.html)

[Java NIO 学习笔记（四）----文件通道和网络通道](https://www.cnblogs.com/czwbig/p/10046987.html)

[Java NIO 学习笔记（五）----路径、文件和管道 Path/Files/Pipe](https://www.cnblogs.com/czwbig/p/10056126.html)

[Java NIO 学习笔记（六）----异步文件通道 AsynchronousFileChannel](https://www.cnblogs.com/czwbig/p/10056131.html)

[Java NIO 学习笔记（七）----NIO/IO 的对比和总结](https://www.cnblogs.com/czwbig/p/10056804.html)

Java NIO （来自 Java 1.4）可以替代标准 IO 和 Java Networking API ，NIO 提供了与标准 IO 不同的使用方式。学习 NIO 之前建议先掌握标准 IO 和 Java 网络编程，推荐教程：

*   [系统学习 Java IO----目录，概览](https://www.cnblogs.com/czwbig/p/10007201.html)
*   [初步接触 Java Net 网络编程](https://www.cnblogs.com/czwbig/p/10018118.html)

**本文目的：** 掌握了标准 IO 之后继续学习 NIO 知识。主要参考 JavaDoc 和 Jakob Jenkov 的英文教程 [Java NIO Tutorial](http://tutorials.jenkov.com/java-nio/index.html)

# Java NIO 概览

NIO 由以下核心组件组成：

1.  通道和缓冲区

在标准 IO API 中，使用字节流和字符流。 在 NIO 中使用通道和缓冲区。 数据总是从通道读入缓冲区，或从缓冲区写入通道。
2.  非阻塞IO

NIO 可以执行非阻塞 IO 。 例如，当通道将数据读入缓冲区时，线程可以执行其他操作。 并且一旦数据被读入缓冲区，线程就可以继续处理它。 将数据写入通道也是如此。
3.  选择器

NIO 包含“选择器”的概念。 选择器是一个可以监视多个事件通道的对象（例如：连接打开，数据到达等）。 因此，单个线程可以监视多个通道的数据。

NIO 有比这些更多的类和组件，但在我看来，Channel，Buffer 和 Selector 构成了 API 的核心。 其余的组件，如 Pipe 和 FileLock ，只是与三个核心组件一起使用的实用程序类。

### Channels/Buffers 通道和缓冲区

通常，NIO 中的所有 IO 都以 Channel 开头，频道有点像流。 数据可以从 Channel 读入 Buffer，也可以从 Buffer 写入 Channel ：

![通道将数据读入缓冲区，缓冲区将数据写入通道](//upload-images.jianshu.io/upload_images/14923529-b3432ef114d32991.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

有几种 Channel 和 Buffer ，以下是 NIO 中主要 Channel 实现类的列表，这些通道包括 UDP + TCP 网络 IO 和文件 IO：

*   FileChannel ：文件通道
*   DatagramChannel ：数据报通道
*   SocketChannel ：套接字通道
*   ServerSocketChannel ：服务器套接字通道

这些类也有一些有趣的接口，但为了简单起见，这里暂时不提，后续会进行学习的。

以下是 NIO 中的核心 Buffer 实现，其实就是 7 种基本类型：

*   ByteBuffer
*   CharBuffer
*   ShortBuffer
*   IntBuffer
*   LongBuffer
*   FloatBuffer
*   DoubleBuffer

NIO 还有一个 MappedByteBuffer，它与内存映射文件一起使用，同样这个后续再讲。

### Selectors 选择器

选择器允许单个线程处理多个通道。 如果程序打开了许多连接（通道），但每个连接只有较低的流量，使用选择器就很方便。 例如，在聊天服务器中， 以下是使用 Selector 处理 3 个 Channel 的线程图示：

![1个线程使用选择器处理3个通道](//upload-images.jianshu.io/upload_images/14923529-6c435a8b1a6f1593.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

要使用选择器，需要使用它注册通道。 然后你调用它的 select() 方法。 此方法将阻塞，直到有一个已注册通道的事件准备就绪。 一旦该方法返回，该线程就可以处理这些事件。 事件可以是传入连接，接收数据等。

# Channel （通道）

NIO 通道类似于流，但有一些区别：

*   通道可以读取和写入。 流通常是单向的（读或写）。
*   通道可以异步读取和写入。
*   通道始终读取或写入缓冲区，即它只面向缓冲区。

如上所述，NIO 中总是将数据从通道读取到缓冲区，或将数据从缓冲区写入通道。 这是一个例子：

```java
// 文件内容是 123456789
RandomAccessFile accessFile = new RandomAccessFile("D:\\test\\1.txt", "rw");
FileChannel fileChannel = accessFile.getChannel();

ByteBuffer buffer = ByteBuffer.allocate(48);

int data = fileChannel.read(buffer); // 将 Channel 的数据读入缓冲区，返回读入到缓冲区的字节数
```
 

# Buffer（缓冲区）

使用 Buffer 与 Channel 交互，数据从通道读入缓冲区，或从缓冲区写入通道。

缓冲区本质上是一个可以写入数据的内存块，之后可以读取数据。 Buffer 对象包装了此内存块，提供了一组方法，可以更轻松地使用内存块。

### Buffer 的基本用法

使用 Buffer 读取和写入数据通常遵循以下四个步骤：

1.  将数据写入缓冲区
2.  调用 buffer.flip() 反转读写模式
3.  从缓冲区读取数据
4.  调用 buffer.clear() 或 buffer.compact() 清除缓冲区内容

将数据写入Buffer 时，Buffer 会跟踪写入的数据量。 当需要读取数据时，就使用 flip() 方法将缓冲区从写入模式切换到读取模式。 在读取模式下，缓冲区允许读取写入缓冲区的所有数据。

读完所有数据之后，就需要清除缓冲区，以便再次写入。 可以通过两种方式执行此操作：通过调用 clear() 或调用 compact() 。区别在于 clear() 是方法清除整个缓冲区，而 compact() 方法仅清除已读取的数据，未读数据都会移动到缓冲区的开头，新数据将在未读数据之后写入缓冲区。

这是一个简单的缓冲区用法示例：

```java
public class ChannelExample {
    public static void main(String[] args) throws IOException {
	// 文件内容是 123456789
        RandomAccessFile accessFile = new RandomAccessFile("D:\\test\\1.txt", "rw");
        FileChannel fileChannel = accessFile.getChannel();

        ByteBuffer buffer = ByteBuffer.allocate(48); //创建容量为48字节的缓冲区

        int data = fileChannel.read(buffer); // 将 Channel 的数据读入缓冲区，返回读入到缓冲区的字节数
        while (data != -1) {
            System.out.println("Read " + data); // Read 9
            buffer.flip(); // 将 buffer 从写入模式切换为读取模式
            while (buffer.hasRemaining()) {
                System.out.print((char) buffer.get()); // 每次读取1byte，循环输出 123456789
            }
            buffer.clear(); // 清除当前缓冲区
            data = fileChannel.read(buffer); // 将 Channel 的数据读入缓冲区
        }
        accessFile.close();
    }
}
```
 

##### Buffer 的 capacity，position 和 limit

缓冲区有 3 个需要熟悉的属性，以便了解缓冲区的工作原理。 这些是：

1.  capacity : 容量缓冲区的容量，是它所包含的元素的数量。不能为负并且不能更改。
2.  position ：缓冲区的位置 是下一个要读取或写入的元素的索引。不能为负，并且不能大于 limit
3.  limit : 缓冲区的限制，缓冲区的限制不能为负，并且不能大于 capacity

另外还有标记 mark ，

标记、位置、限制和容量值遵守以下不变式：

0 <= mark<= position <= limit<= capacity

position 和 limit 的含义取决于 Buffer 是处于读取还是写入模式。 无论缓冲模式如何，capacity 总是一样的表示容量。

以下是写入和读取模式下的容量，位置和限制的说明：

![](//upload-images.jianshu.io/upload_images/14923529-02664119749dc674.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### capacity

作为存储器块，缓冲区具有一定的固定大小，也称为“容量”。 只能将 capacity 多的 byte，long，char 等写入缓冲区。 缓冲区已满后，需要清空它（读取数据或清除它），然后才能将更多数据写入。

##### position

将数据写入缓冲区时，可以在某个位置执行操作。 position 初始值为 0 ，当一个 byte，long，char 等已写入缓冲区时，position 被移动，指向缓冲区中的下一个单元以插入数据。 position 最大值为 capacity -1

从缓冲区读取数据时，也可以从给定位置开始读取数据。 当缓冲区从写入模式切换到读取模式时，position 将重置为 0 。当从缓冲区读取数据时，将从 position 位置开始读取数据，读取后会将 position 移动到下一个要读取的位置。

##### limit

在写入模式下，Buffer 的 limit 是可以写入缓冲区的数据量的限制，此时 limit=capacity。

将缓冲区切换为读取模式时，limit 表示最多能读到多少数据。 因此，当将 Buffer 切换到读取模式时，limit被设置为之前写入模式的写入位置（position ），换句话说，你能读到之前写入的所有数据（例如之前写写入了 6 个字节，此时 position=6 ，然后切换到读取模式，limit 代表最多能读取的字节数，因此 limit 也等于 6）。

##### 分配缓冲区

要获取 Buffer 对象，必须先分配它。 每个 Buffer 类都有一个 allocate() 方法来执行此操作。 下面是一个显示ByteBuffer分配的示例，容量为48字节：

```java
ByteBuffer buffer = ByteBuffer.allocate(48); //创建容量为48字节的缓冲区
```
 

##### 将数据写入缓冲区

可以通过两种方式将数据写入 Buffer：

1.  将数据从通道写入缓冲区
2.  通过缓冲区的 put() 方法,自己将数据写入缓冲区。

这是一个示例，显示了 Channel 如何将数据写入 Buffer：

```java
int data = fileChannel.read(buffer); // 将 Channel 的数据读入缓冲区，返回读入到缓冲区的字节数
buffer.put(127); // 此处的 127 是 byte 类型
```
 

put() 方法有许多其他版本，允许以多种不同方式将数据写入 Buffer 。 例如，在特定位置写入，或将一个字节数组写入缓冲区。

##### flip() 切换缓冲区的读写模式

flip() 方法将 Buffer 从写入模式切换到读取模式。 调用 flip() 会将 position 设置回 0，并将 limit 的值设置为切换之前的 position 值。换句话说，limit 表示之前写进了多少个 byte、char 等 —— 现在能读取多少个 byte、char 等。

##### 从缓冲区读取数据

有两种方法可以从 Buffer 中读取数据：

1.  将数据从缓冲区读入通道。
2.  使用 get() 方法之一，自己从缓冲区读取数据。

以下是将缓冲区中的数据读入通道的示例：

```java
int bytesWritten = fileChannel.write(buffer);
byte aByte = buffer.get();
```
 

和 put() 方法一样，get() 方法也有许多其他版本，允许以多种不同方式从 Buffer 中读取数据。有关更多详细信息，请参阅JavaDoc以获取具体的缓冲区实现。

以下列出 ByteBuffer 类的部分方法：

方法|描述|
---|---|
byte\[\] array()|返回实现此缓冲区的 byte 数组，此缓冲区的内容修改将导致返回的数组内容修改，反之亦然。|
CharBuffer asCharBuffer()|创建此字节缓冲区作为新的独立的char 缓冲区。新缓冲区的内容将从此缓冲区的当前位置开始|
XxxBuffer asXxxBuffer()|同上，创建对应的 Xxx 缓冲区，Xxx 可为 Short/Int/Long/Float/Double|
byte get()|相对 get 方法。读取此缓冲区当前位置的字节，然后该 position 递增。|
ByteBuffer get(byte\[\] dst, int offset, int length)|相对批量 get 方法，后2个参数可省略|
byte get(int index)|绝对 get 方法。读取指定索引处的字节。|
char getChar()|用于读取 char 值的相对 get 方法。|
char getChar(int index)|用于读取 char 值的绝对 get 方法。|
xxx getXxx(int index)|用于读取 xxx 值的绝对 get 方法。index 可以选，指定位置。|
众多 put() 方法|参考以上 get() 方法|
static ByteBuffer wrap(byte\[\] array)|将 byte 数组包装到缓冲区中。|

##### rewind() 倒带

Buffer对象的 rewind() 方法将 position 设置回 0，因此可以重读缓冲区中的所有数据， limit 则保持不变。

##### clear() 和 compact()

如果调用 clear() ,则将 position 设置回 0 ，并将 limit 被设置成 capacity 的值。换句话说，Buffer 被清空了。 但是 Buffer 中的实际存放的数据并未清除。

如果在调用 clear() 时缓冲区中有任何未读数据，数据将被“遗忘”，这意味着不再有任何标记告诉读取了哪些数据，还没有读取哪些数据。

如果缓冲区中仍有未读数据，并且想稍后读取它，但需要先写入一些数据，这时候应该调用 compact() ，它会将所有未读数据复制到 Buffer 的开头，然后它将 position 设置在最后一个未读元素之后。 limit 属性仍设置为 capacity ，就像 clear() 一样。 现在缓冲区已准备好写入，并且不会覆盖未读数据。

##### mark() 和 reset()

以通过调用 Buffer 对象的 mark() 方法在 Buffer 中标记给定位置。 然后，可以通过调用 Buffer.reset() 方法将位置重置回标记位置，就像在标准 IO 中一样。

```java
buffer.mark();
// 调用 buffer.get() 等方法读取数据...

buffer.reset();  // 设置 position 回到 mark 位置。
```
 

##### equals() 和 compareTo()

可以使用 equals() 和 compareTo() 比较两个缓冲区。

equals() 成立的条件：

1.  它们的类型相同（byte，char，int等）
2.  它们在缓冲区中具有相同数量的剩余字节，字符等。
3.  所有剩余的字节，字符等都相等。

如上，equals 仅比较缓冲区的一部分，而不是它内部的每个元素。 实际上，它只是比较缓冲区中的其余元素。

compareTo() 方法比较两个缓冲区的剩余元素（字节，字符等）， 在下列情况下，一个 Buffer 被视为“小于”另一个 Buffer：

1.  第一个不相等的元素小于另一个 Buffer 中对应的元素 。
2.  所有元素都相等，但第一个 Buffer 在第二个 Buffer 之前耗尽了元素（第一个 Buffer 元素较少）。

>参考链接：[https://www.cnblogs.com/czwbig/p/10035631.html](https://www.cnblogs.com/czwbig/p/10035631.html)，整理：沉默王二
