---
title: 使用Java NIO完成网络通信
shortTitle: 使用Java NIO完成网络通信
category:
  - Java核心
tag:
  - Java NIO
description: Java程序员进阶之路，小白的零基础Java教程，使用Java NIO完成网络通信
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,nio,网络通信
---

## NIO基础继续讲解

回到我们最开始的图：



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/network-connect-bb1bd676-8aeb-4428-9498-230a05ee717d.jpg)



NIO被叫为 `no-blocking io`，其实是在**网络这个层次中理解的**，对于**FileChannel来说一样是阻塞**。

我们前面也仅仅讲解了FileChannel，对于我们网络通信是还有几个Channel的~



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/network-connect-ba836b5c-82d2-42b0-b1ae-83f8ee0b0101.jpg)



所以说：我们**通常**使用NIO是在网络中使用的，网上大部分讨论NIO都是在**网络通信的基础之上**的！说NIO是非阻塞的NIO也是**网络中体现**的！

从上面的图我们可以发现还有一个`Selector`选择器这么一个东东。从一开始我们就说过了，nio的**核心要素**有：

*   Buffer缓冲区
*   Channel通道
*   Selector选择器

我们在网络中使用NIO往往是I/O模型的**多路复用模型**！

*   Selector选择器就可以比喻成麦当劳的**广播**。
*   **一个线程能够管理多个Channel的状态**



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/network-connect-63f45193-8eb7-4cc5-a5a7-70713fac0d73.jpg)



## NIO阻塞形态

为了更好地理解，我们先来写一下NIO**在网络中是阻塞的状态代码**，随后看看非阻塞是怎么写的就更容易理解了。

*   **是阻塞的就没有Selector选择器了**，就直接使用Channel和Buffer就完事了。

客户端：

```java
public class BlockClient {

    public static void main(String[] args) throws IOException {

        // 1. 获取通道         
        SocketChannel socketChannel = SocketChannel.open(new InetSocketAddress("127.0.0.1", 6666));

        // 2. 发送一张图片给服务端吧         
        FileChannel fileChannel = FileChannel.open(Paths.get("X:\\Users\\ozc\\Desktop\\新建文件夹\\1.png"), StandardOpenOption.READ);

        // 3.要使用NIO，有了Channel，就必然要有Buffer，Buffer是与数据打交道的呢         
        ByteBuffer buffer = ByteBuffer.allocate(1024);

        // 4.读取本地文件(图片)，发送到服务器         
        while (fileChannel.read(buffer) != -1) {

            // 在读之前都要切换成读模式             
            buffer.flip();

            socketChannel.write(buffer);

            // 读完切换成写模式，能让管道继续读取文件的数据             
            buffer.clear();
        }

        // 5. 关闭流         
        fileChannel.close();
        socketChannel.close();
    }
}
```

服务端：

```java
public class BlockServer {

    public static void main(String[] args) throws IOException {

        // 1.获取通道         
        ServerSocketChannel server = ServerSocketChannel.open();

        // 2.得到文件通道，将客户端传递过来的图片写到本地项目下(写模式、没有则创建)         
        FileChannel outChannel = FileChannel.open(Paths.get("2.png"), StandardOpenOption.WRITE, StandardOpenOption.CREATE);

        // 3. 绑定链接         
        server.bind(new InetSocketAddress(6666));

        // 4. 获取客户端的连接(阻塞的)         
        SocketChannel client = server.accept();

        // 5. 要使用NIO，有了Channel，就必然要有Buffer，Buffer是与数据打交道的呢         
        ByteBuffer buffer = ByteBuffer.allocate(1024);

        // 6.将客户端传递过来的图片保存在本地中         
        while (client.read(buffer) != -1) {

            // 在读之前都要切换成读模式             
            buffer.flip();

            outChannel.write(buffer);

            // 读完切换成写模式，能让管道继续读取文件的数据             
            buffer.clear();

        }

        // 7.关闭通道         
        outChannel.close();
        client.close();
        server.close();
    }
}
```

结果就可以将客户端传递过来的图片保存在本地了：



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/network-connect-7545f4e4-dda9-4e62-8463-58f821cb51ed.jpg)



此时服务端保存完图片想要告诉客户端已经收到图片啦：



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/network-connect-c25d8b70-cd8f-4f4b-90eb-2e471deeb958.jpg)



客户端接收服务端带过来的数据：



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/network-connect-a7841446-4eed-4b7b-a815-0d8666b4dd44.jpg)



如果仅仅是上面的代码**是不行**的！这个程序会**阻塞**起来！

*   因为服务端**不知道客户端还有没有数据要发过来**(与刚开始不一样，客户端发完数据就将流关闭了，服务端可以知道客户端没数据发过来了)，导致服务端一直在读取客户端发过来的数据。
*   进而导致了阻塞！

于是客户端在写完数据给服务端时，**显式告诉服务端已经发完数据**了！



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/network-connect-97c88ca9-1b0c-4cd0-b410-60d059605ee2.jpg)



## NIO非阻塞形态

如果使用非阻塞模式的话，那么我们就可以不显式告诉服务器已经发完数据了。我们下面来看看怎么写：

**客户端**：

```java
public class NoBlockClient {

    public static void main(String[] args) throws IOException {

        // 1. 获取通道         
        SocketChannel socketChannel = SocketChannel.open(new InetSocketAddress("127.0.0.1", 6666));

        // 1.1切换成非阻塞模式         
        socketChannel.configureBlocking(false);

        // 2. 发送一张图片给服务端吧         
        FileChannel fileChannel = FileChannel.open(Paths.get("X:\\Users\\ozc\\Desktop\\新建文件夹\\1.png"), StandardOpenOption.READ);

        // 3.要使用NIO，有了Channel，就必然要有Buffer，Buffer是与数据打交道的呢         
        ByteBuffer buffer = ByteBuffer.allocate(1024);

        // 4.读取本地文件(图片)，发送到服务器         
        while (fileChannel.read(buffer) != -1) {

            // 在读之前都要切换成读模式             
            buffer.flip();

            socketChannel.write(buffer);

            // 读完切换成写模式，能让管道继续读取文件的数据             
            buffer.clear();
        }

        // 5. 关闭流         
        fileChannel.close();
        socketChannel.close();
    }
}
```

**服务端**：

```java
public class NoBlockServer {

    public static void main(String[] args) throws IOException {

        // 1.获取通道         
        ServerSocketChannel server = ServerSocketChannel.open();

        // 2.切换成非阻塞模式         
        server.configureBlocking(false);

        // 3. 绑定连接         
        server.bind(new InetSocketAddress(6666));

        // 4. 获取选择器         
        Selector selector = Selector.open();

        // 4.1将通道注册到选择器上，指定接收“监听通道”事件         
        server.register(selector, SelectionKey.OP_ACCEPT);

        // 5. 轮训地获取选择器上已“就绪”的事件--->只要select()>0，说明已就绪         
        while (selector.select() > 0) {
            // 6. 获取当前选择器所有注册的“选择键”(已就绪的监听事件)             
            Iterator<SelectionKey> iterator = selector.selectedKeys().iterator();

            // 7. 获取已“就绪”的事件，(不同的事件做不同的事)             
            while (iterator.hasNext()) {

                SelectionKey selectionKey = iterator.next();

                // 接收事件就绪                 
                if (selectionKey.isAcceptable()) {

                    // 8. 获取客户端的链接                     
                    SocketChannel client = server.accept();

                    // 8.1 切换成非阻塞状态                     
                    client.configureBlocking(false);

                    // 8.2 注册到选择器上-->拿到客户端的连接为了读取通道的数据(监听读就绪事件)                     
                    client.register(selector, SelectionKey.OP_READ);

                } else if (selectionKey.isReadable()) { // 读事件就绪 
                    // 9. 获取当前选择器读就绪状态的通道                     
                    SocketChannel client = (SocketChannel) selectionKey.channel();

                    // 9.1读取数据                     
                    ByteBuffer buffer = ByteBuffer.allocate(1024);

                    // 9.2得到文件通道，将客户端传递过来的图片写到本地项目下(写模式、没有则创建)                     
                    FileChannel outChannel = FileChannel.open(Paths.get("2.png"), StandardOpenOption.WRITE, StandardOpenOption.CREATE);

                    while (client.read(buffer) > 0) {
                        // 在读之前都要切换成读模式                         
                        buffer.flip();

                        outChannel.write(buffer);

                        // 读完切换成写模式，能让管道继续读取文件的数据                         
                        buffer.clear();
                    }
                }
                // 10. 取消选择键(已经处理过的事件，就应该取消掉了)                 
                iterator.remove();
            }
        }

    }
}
```

还是刚才的需求：**服务端保存了图片以后，告诉客户端已经收到图片了**。

在服务端上只要在后面写些数据给客户端就好了：



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/network-connect-5ea2f6d3-be10-4703-aa99-bf36e30fab77.jpg)



在客户端上要想获取得到服务端的数据，也需要注册在register上(监听读事件)！

```java
public class NoBlockClient2 {

    public static void main(String[] args) throws IOException {

        // 1. 获取通道         
        SocketChannel socketChannel = SocketChannel.open(new InetSocketAddress("127.0.0.1", 6666));

        // 1.1切换成非阻塞模式         
        socketChannel.configureBlocking(false);

        // 1.2获取选择器         
        Selector selector = Selector.open();

        // 1.3将通道注册到选择器中，获取服务端返回的数据         
        socketChannel.register(selector, SelectionKey.OP_READ);

        // 2. 发送一张图片给服务端吧         
        FileChannel fileChannel = FileChannel.open(Paths.get("X:\\Users\\ozc\\Desktop\\新建文件夹\\1.png"), StandardOpenOption.READ);

        // 3.要使用NIO，有了Channel，就必然要有Buffer，Buffer是与数据打交道的呢         
        ByteBuffer buffer = ByteBuffer.allocate(1024);

        // 4.读取本地文件(图片)，发送到服务器         
        while (fileChannel.read(buffer) != -1) {

            // 在读之前都要切换成读模式             
            buffer.flip();

            socketChannel.write(buffer);

            // 读完切换成写模式，能让管道继续读取文件的数据             
            buffer.clear();
        }

        // 5. 轮训地获取选择器上已“就绪”的事件--->只要select()>0，说明已就绪         
        while (selector.select() > 0) {
            // 6. 获取当前选择器所有注册的“选择键”(已就绪的监听事件)             
            Iterator<SelectionKey> iterator = selector.selectedKeys().iterator();

            // 7. 获取已“就绪”的事件，(不同的事件做不同的事)             
            while (iterator.hasNext()) {

                SelectionKey selectionKey = iterator.next();

                // 8. 读事件就绪                 
                if (selectionKey.isReadable()) {

                    // 8.1得到对应的通道                     
                    SocketChannel channel = (SocketChannel) selectionKey.channel();

                    ByteBuffer responseBuffer = ByteBuffer.allocate(1024);

                    // 9. 知道服务端要返回响应的数据给客户端，客户端在这里接收                     
                    int readBytes = channel.read(responseBuffer);

                    if (readBytes > 0) {
                        // 切换读模式                         
                        responseBuffer.flip();
                        System.out.println(new String(responseBuffer.array(), 0, readBytes));
                    }
                }

                // 10. 取消选择键(已经处理过的事件，就应该取消掉了)                 
                iterator.remove();
            }
        }
    }

}
```

测试结果：



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/network-connect-b69665b3-77f9-4f3d-9075-ffac1489637f.jpg)



下面就**简单总结一下**使用NIO时的要点：

*   将Socket通道注册到Selector中，监听感兴趣的事件
*   当感兴趣的时间就绪时，则会进去我们处理的方法进行处理
*   每处理完一次就绪事件，删除该选择键(因为我们已经处理完了)

## 4.4管道和DataGramChannel

这里我就不再讲述了，最难的TCP都讲了，UDP就很简单了。

UDP:



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/network-connect-7fc34dd6-bab4-4c4a-af8a-6ab898c4b6e9.jpg)





![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/network-connect-d1e531f8-9638-4fd5-9f3a-70db2c25d92e.jpg)



管道：



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/network-connect-86f3b103-0c1c-47fb-8364-e7ec3d91b8b1.jpg)





![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/network-connect-29d105c0-6525-4efc-912c-d85abd878e82.jpg)


>参考链接：[https://www.zhihu.com/question/29005375/answer/667616386](https://www.zhihu.com/question/29005375/answer/667616386)，整理：沉默王二

---------

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)