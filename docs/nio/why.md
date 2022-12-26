---
title: 为什么我们要使用 Java NIO？
shortTitle: 为什么我们要使用Java NIO？
category:
  - Java核心
tag:
  - Java NIO
description: Java程序员进阶之路，小白的零基础Java教程，为什么我们要使用 Java NIO？
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,nio
---

我花了几天去了解**NIO的核心知识点**，期间看了《Java 编程思想》和《疯狂Java 讲义》的nio模块。**但是**，会发现看完了之后还是很**迷**，不知道NIO这是干嘛用的，而网上的资料与书上的知识点没有很好地对应。

*   网上的资料很多都以IO的五种模型为基础来讲解NIO，而IO这五种模型其中又涉及到了很多概念：`同步/异步/阻塞/非阻塞/多路复用`，**而不同的人又有不同的理解方式**。
*   还有涉及到了unix的`select/epoll/poll/pselect`，`fd`这些关键字，没有相关基础的人看起来简直是天书
*   这就导致了在初学时认为nio远不可及

我在找资料的过程中也收藏了好多讲解NIO的资料，这篇文章就是**以初学的角度来理解NIO**。也算是我这两天看NIO的一个总结吧。

*   希望大家可以看了之后知道什么是NIO，NIO的核心知识点是什么，会使用NIO~

那么接下来就开始吧，如果文章有错误的地方请大家多多包涵，不吝在评论区指正哦~

> 声明：本文使用JDK1.8

JDK 1.4中的`java.nio.*包`中引入新的Java I/O库，其目的是**提高速度**。实际上，“旧”的I/O包已经使用NIO**重新实现过，即使我们不显式的使用NIO编程，也能从中受益**。

*   nio翻译成 no-blocking io 或者 new io 都无所谓啦，都说得通~

在《Java编程思想》读到**“即使我们不显式的使用NIO编程，也能从中受益”**的时候，我是挺在意的，所以：我们**测试**一下使用NIO复制文件和传统IO复制文件的性能：

```java
import java.io.*;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;

public class SimpleFileTransferTest {

    private long transferFile(File source, File des) throws IOException {
        long startTime = System.currentTimeMillis();

        if (!des.exists())
            des.createNewFile();

        BufferedInputStream bis = new BufferedInputStream(new FileInputStream(source));
        BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(des));

        //将数据源读到的内容写入目的地--使用数组         
        byte[] bytes = new byte[1024 * 1024];
        int len;
        while ((len = bis.read(bytes)) != -1) {
            bos.write(bytes, 0, len);
        }

        long endTime = System.currentTimeMillis();
        return endTime - startTime;
    }

    private long transferFileWithNIO(File source, File des) throws IOException {
        long startTime = System.currentTimeMillis();

        if (!des.exists())
            des.createNewFile();

        RandomAccessFile read = new RandomAccessFile(source, "rw");
        RandomAccessFile write = new RandomAccessFile(des, "rw");

        FileChannel readChannel = read.getChannel();
        FileChannel writeChannel = write.getChannel();

        ByteBuffer byteBuffer = ByteBuffer.allocate(1024 * 1024);//1M缓冲区 
        while (readChannel.read(byteBuffer) > 0) {
            byteBuffer.flip();
            writeChannel.write(byteBuffer);
            byteBuffer.clear();
        }

        writeChannel.close();
        readChannel.close();
        long endTime = System.currentTimeMillis();
        return endTime - startTime;
    }

    public static void main(String[] args) throws IOException {
        SimpleFileTransferTest simpleFileTransferTest = new SimpleFileTransferTest();
        File sourse = new File("F:\\电影\\[电影天堂www.dygod.cn]猜火车-cd1.rmvb");
        File des = new File("X:\\Users\\ozc\\Desktop\\io.avi");
        File nio = new File("X:\\Users\\ozc\\Desktop\\nio.avi");

        long time = simpleFileTransferTest.transferFile(sourse, des);
        System.out.println(time + "：普通字节流时间");

        long timeNio = simpleFileTransferTest.transferFileWithNIO(sourse, nio);
        System.out.println(timeNio + "：NIO时间");

    }

}
```

我分别测试了文件大小为13M，40M，200M的：



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/why-d5118350-471f-4998-abb2-4e82c7a50344.jpg)





![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/why-ffcb8770-5f0a-41e9-8534-f92a6f931a49.jpg)





![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/why-0425087f-7878-466b-b02a-a802444e7405.jpg)



为什么要使用NIO?

可以看到使用过NIO重新实现过的**传统IO根本不虚**，在大文件下效果还比NIO要好(当然了，个人几次的测试，或许不是很准)

*   而NIO要有一定的学习成本，也没有传统IO那么好理解。

那这意味着我们**可以不使用/学习NIO了吗**？

答案是**否定**的，IO操作往往在**两个场景**下会用到：

*   文件IO
*   网络IO

NIO的**魅力：在网络中使用IO就可以体现出来了**！

*   后面会说到网络中使用NIO，不急哈~


>参考链接：[https://www.zhihu.com/question/29005375/answer/667616386](https://www.zhihu.com/question/29005375/answer/667616386)，整理：沉默王二

---------

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
