---
title: Java NIO 快速入门(buffer缓冲区、Channel管道、Selector选择器)
shortTitle: Java NIO快速入门
category:
  - Java核心
tag:
  - Java NIO
description: Java程序员进阶之路，小白的零基础Java教程，Java NIO 快速入门(buffer缓冲区、Channel管道、Selector选择器)
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,nio,buffer,channel,selector
---

首先我们来看看**IO和NIO的区别**：



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/rumen-90c84f53-f82d-43dd-87c5-4477e540fa57.jpg)



*   可简单认为：**IO是面向流的处理，NIO是面向块(缓冲区)的处理**

*   面向流的I/O 系统**一次一个字节地处理数据**。
*   一个面向块(缓冲区)的I/O系统**以块的形式处理数据**。



NIO主要有**三个核心部分组成**：

*   **buffer缓冲区**
*   **Channel管道**
*   **Selector选择器**

## buffer缓冲区和Channel管道

在NIO中并不是以流的方式来处理数据的，而是以buffer缓冲区和Channel管道**配合使用**来处理数据。

简单理解一下：

*   Channel管道比作成铁路，buffer缓冲区比作成火车(运载着货物)

而我们的NIO就是**通过Channel管道运输着存储数据的Buffer缓冲区的来实现数据的处理**！

*   要时刻记住：Channel不与数据打交道，它只负责运输数据。与数据打交道的是Buffer缓冲区

*   **Channel-->运输**
*   **Buffer-->数据**



相对于传统IO而言，**流是单向的**。对于NIO而言，有了Channel管道这个概念，我们的**读写都是双向**的(铁路上的火车能从广州去北京、自然就能从北京返还到广州)！

### buffer缓冲区核心要点

我们来看看Buffer缓冲区有什么值得我们注意的地方。

Buffer是缓冲区的抽象类：



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/rumen-436aa175-3586-4457-b93c-70b21ff122dc.jpg)



其中ByteBuffer是**用得最多的实现类**(在管道中读写字节数据)。



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/rumen-4bf73cdc-b5e2-4866-ac68-cc57602be5e8.jpg)



拿到一个缓冲区我们往往会做什么？很简单，就是**读取缓冲区的数据/写数据到缓冲区中**。所以，缓冲区的核心方法就是:

*   put()
*   get()



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/rumen-7229ef4c-a27d-4f90-97d0-8abbfda810a0.jpg)





![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/rumen-df9f0bdf-3afe-42dc-9e7e-459484d7cb8e.jpg)



Buffer类维护了4个核心变量属性来提供**关于其所包含的数组的信息**。它们是：

*   容量Capacity

*   **缓冲区能够容纳的数据元素的最大数量**。容量在缓冲区创建时被设定，并且永远不能被改变。(不能被改变的原因也很简单，底层是数组嘛)

*   上界Limit

*   **缓冲区里的数据的总数**，代表了当前缓冲区中一共有多少数据。

*   位置Position

*   **下一个要被读或写的元素的位置**。Position会自动由相应的 `get( )`和 `put( )`函数更新。

*   标记Mark

*   一个备忘位置。**用于记录上一次读写的位置**。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/rumen-85991ca3-99bd-4e56-a84e-e58af4d8aac9.jpg)



### buffer代码演示

首先展示一下**是如何创建缓冲区的，核心变量的值是怎么变化的**。

```java
public static void main(String[] args) {

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
    }
```

运行结果：



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/rumen-cbf8b617-f71c-47f7-bc20-72d46306349f.jpg)



现在**我想要从缓存区拿数据**，怎么拿呀？？NIO给了我们一个`flip()`方法。这个方法可以**改动position和limit的位置**！

还是上面的代码，我们`flip()`一下后，再看看4个核心属性的值会发生什么变化：



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/rumen-571a843f-1334-4fcb-bbae-90dbbe31ac8c.jpg)



很明显的是：

*   **limit变成了position的位置了**
*   **而position变成了0**

看到这里的同学可能就会想到了：当调用完`filp()`时：**limit是限制读到哪里，而position是从哪里读**

一般我们称`filp()`为**“切换成读模式”**

*   每当要从缓存区的时候读取数据时，就调用`filp()`**“切换成读模式”**。



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/rumen-b7d1a7d4-f2a7-4635-b5a8-9d10733df5f3.jpg)



切换成读模式之后，我们就可以读取缓冲区的数据了：

```java
// 创建一个limit()大小的字节数组(因为就只有limit这么多个数据可读)  
byte[] bytes = new byte[byteBuffer.limit()];

// 将读取的数据装进我们的字节数组中         
byteBuffer.get(bytes);

// 输出数据         
System.out.println(new String(bytes, 0, bytes.length));
```



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/rumen-40d60cff-e87b-4180-a350-7dc5a5207156.jpg)



随后输出一下核心变量的值看看：



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/rumen-c0fc49ea-bc74-43e8-8f16-d26b93e731bf.jpg)



**读完我们还想写数据到缓冲区**，那就使用`clear()`函数，这个函数会“清空”缓冲区：

*   数据没有真正被清空，只是被**遗忘**掉了



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/rumen-6567241c-8ca6-492d-a4d1-45e6b275e75e.jpg)



### FileChannel通道核心要点



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/rumen-275c9588-216a-416f-934e-f3fbe54fda43.jpg)



Channel通道**只负责传输数据、不直接操作数据的**。操作数据都是通过Buffer缓冲区来进行操作！

```java
// 1. 通过本地IO的方式来获取通道         
FileInputStream fileInputStream = new FileInputStream("F:\\3yBlog\\JavaEE常用框架\\Elasticsearch就是这么简单.md");

// 得到文件的输入通道         
FileChannel inchannel = fileInputStream.getChannel();

// 2. jdk1.7后通过静态方法.open()获取通道         
FileChannel.open(Paths.get("F:\\3yBlog\\JavaEE常用框架\\Elasticsearch就是这么简单2.md"), StandardOpenOption.WRITE);
```

使用**FileChannel配合缓冲区**实现文件复制的功能：



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/rumen-741d14cb-4ea6-43cb-aacc-4fa3297cedba.jpg)



使用**内存映射文件**的方式实现**文件复制**的功能(直接操作缓冲区)：



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/rumen-c8020177-39b4-405b-abc0-c908ab7cf73d.jpg)



通道之间通过`transfer()`实现数据的传输(直接操作缓冲区)：



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/rumen-2ce868f7-691e-419e-a443-e25131b2785a.jpg)



### 直接与非直接缓冲区

*   非直接缓冲区是**需要**经过一个：copy的阶段的(从内核空间copy到用户空间)
*   直接缓冲区**不需要**经过copy阶段，也可以理解成--->**内存映射文件**，(上面的图片也有过例子)。



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/rumen-c51af71c-759c-40de-9d92-92fffa2d075d.jpg)





![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/rumen-c6181e11-8960-46f3-a4b5-8233d013499c.jpg)



使用直接缓冲区有两种方式：

*   缓冲区创建的时候分配的是直接缓冲区
*   在FileChannel上调用`map()`方法，将文件直接映射到内存中创建



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/rumen-16943811-2190-4fc9-82f9-df34c06c22d2.jpg)



### scatter和gather、字符集

这个知识点我感觉用得挺少的，不过很多教程都有说这个知识点，我也拿过来说说吧：

*   分散读取(scatter)：将一个通道中的数据分散读取到多个缓冲区中
*   聚集写入(gather)：将多个缓冲区中的数据集中写入到一个通道中



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/rumen-d2b8a337-3c1b-4bce-ae8d-ed107a3676a2.jpg)





![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/rumen-e0916f2c-2ce9-4be6-b071-754301a09642.jpg)



分散读取



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/rumen-886e1838-3404-4bfb-84c9-36cffa19aa19.jpg)



聚集写入



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/rumen-aba6d233-f294-4d1f-b389-dd174e76d1b0.jpg)



字符集(只要编码格式和解码格式一致，就没问题了)



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/rumen-dba55dfc-48df-4111-884d-d67227b7723a.jpg)

>参考链接：[https://www.zhihu.com/question/29005375/answer/667616386](https://www.zhihu.com/question/29005375/answer/667616386)，整理：沉默王二

---------

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
