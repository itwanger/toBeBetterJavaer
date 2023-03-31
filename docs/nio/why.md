---
title: Java 的 NIO 是什么？
shortTitle: Java NIO是什么
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

# 12.1

我花了几天时间去了解**NIO 的核心知识**，期间看了《Java 编程思想》和《疯狂 Java 讲义》中的 NIO 模块。**但是**，看完之后还是很**迷**，不知道 NIO 是干嘛用的，网上的资料和书上的知识点没有很好地对应上。

- 网上的资料很多都以 IO 的五种模型为基础来讲解 NIO，而 IO 这五种模型其中又涉及到了很多概念：`同步/异步/阻塞/非阻塞/多路复用`，**而不同的人又有不同的理解方式**。
- 还有涉及到 Unix 的`select/epoll/poll/pselect`，`fd`这些关键字，没有相关基础的人看起来简直是天书

我在找资料的过程中也收藏了好多讲解 NIO 的资料，这篇内容就是**以初学的角度来理解 NIO**。也算是我这两天看 NIO 的一个总结吧。希望大家可以看了之后知道什么是 NIO，NIO 的核心知识点是什么，以及会使用 NIO~

那么接下来就开始吧，如果文章有错误的地方请大家多多包涵，不吝在评论区指正哦~

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

在我给出实际的结论之前：

- 对于较小的文件，NIO 和普通 IO 之间的性能差异可能不会非常明显，因为文件本身较小，复制过程较快。
- 对于较大的文件，使用 NIO 的性能可能会明显优于普通 IO。这是因为 NIO 使用了更高效的缓冲区和通道机制，可以在内存中进行更快的数据传输。

![](https://cdn.tobebetterjavaer.com/stutymore/why-20230331191748.png)


为什么要使用 NIO?

可以看到使用过 NIO 重新实现过的**传统 IO 根本不虚**，在大文件下效果还比 NIO 要好(当然了，个人几次的测试，或许不是很准)

- 而 NIO 要有一定的学习成本，也没有传统 IO 那么好理解。

那这意味着我们**可以不使用/学习 NIO 了吗**？

答案是**否定**的，IO 操作往往在**两个场景**下会用到：

- 文件 IO
- 网络 IO

NIO 的**魅力：在网络中使用 IO 就可以体现出来了**！

- 后面会说到网络中使用 NIO，不急哈~

> 参考链接：[https://www.zhihu.com/question/29005375/answer/667616386](https://www.zhihu.com/question/29005375/answer/667616386)，整理：沉默王二

---

最近整理了一份牛逼的学习资料，包括但不限于 Java 基础部分（JVM、Java 集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类 Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是 2022 年全网最全的学习和找工作的 PDF 资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
