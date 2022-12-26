---
title: Java Socket：飞鸽传书的网络套接字
shortTitle: Java Socket
category:
  - Java核心
tag:
  - Java网络编程
description: Java程序员进阶之路，小白的零基础Java教程，在 Java 中，网络套接字（Socket）扮演着“飞鸽传书”的角色。
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,JavaSocket,java网络编程,socket,网络编程
---

在古代，由于通信不便利，一些聪明的人就利用鸽子会飞且飞得比较快、会辨认方向的优点，对其进行了驯化，用来进行消息的传递——也就是所谓的“飞鸽传书”。而在 Java 中，网络套接字（Socket）扮演了同样的角色。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/socket/socket-a1a012de-33e5-424a-a4cf-bd929cd60200.jpg)

套接字（Socket）是一个抽象层，应用程序可以通过它发送或接收数据；就像操作文件那样可以打开、读写和关闭。套接字允许应用程序将 I/O 应用于网络中，并与其他应用程序进行通信。网络套接字是 IP 地址与端口的组合。

## 01、ping 与 telnet

“老王啊，能不能帮我看一下这个问题呢，明明本地可以进行网络通信，可等我部署到服务器上时就通信不了了，搞了半天也不知道什么原因，我看代码是没有问题的。”小二的语气中充满了沮丧。

“ping 过吗？或者 telnet 了吗？”老王头都没回，冷冰冰地扔出去了这句话。

“哦，我去试试。”小二心头掠过一丝愧疚。

ping 与 telnet 这两个命令，对调试网络程序有着非常大的帮助。

ping，一种计算机网络工具，用来测试数据包能否透过 IP 协议到达特定主机。ping 会向目标主机发出一个 ICMP 的请求回显数据包，并等待接收回显响应数据包。

例如，我们 ping 一下博客园。截图如下。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/socket/socket-ce54bbbe-3627-4af4-9f9c-4c041a7ef2a7.jpg)


telnet，Internet 远程登录服务的标准协议和主要方式，可以让我们坐在家里的计算机面前，登录到另一台远在天涯海角的远程计算机上。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/socket/socket-f94e1fa5-16d0-4414-9a53-a2aa43b2a512.jpg)

在 Windows 系统中，telnet 一般是默认安装的，但未激活（可以在控制面板中激活它）。

例如，我们 telnet 一下火（shui）土（mu）社区。截图如下。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/socket/socket-9d7051d9-e7de-48a8-9b28-b482d84f56c9.jpg)

使用 telnet 登录远程计算机时，需要远程计算机上运行一个服务，它一直不停地等待那些希望和它进行连接的网络请求；当接收到一个客户端的网络连接时，它便唤醒正在监听网络连接请求的服务器进程，并为两者建立连接。连接会一直保持，直到某一方中止。

不过，需要注意的是，telnet 在格外重视安全的现代网络技术中并不受到重用。因为 telnet 是一个明文传输协议，用户的所有内容（包括用户名和密码）都没有经过加密，安全隐患非常大。

## 02、Socket 实例

不知道你有没有体验一下 telnet 火土社区的那条命令，结果非常有趣。我们也可以通过 Java 的客户端套接字（Socket）实现，代码示例如下。

```java
try (Socket socket = new Socket("bbs.newsmth.net", 23);) {
    InputStream is = socket.getInputStream();
    Scanner scanner = new Scanner(is, "gbk");

    while (scanner.hasNextLine()) {
        String line = scanner.nextLine();
        System.out.println(line);
    }

} catch (UnknownHostException e) {
    e.printStackTrace();
} catch (IOException e) {
    e.printStackTrace();
}
```

1）建立套接字连接非常简单，只需要一行代码：

```java
Socket socket = new Socket(host, port)
```

host 为主机名，port 为端口号（23 为默认的 telnet 端口号）。如果无法确定主机的 IP 地址，则抛出 `UnknownHostException` 异常；如果在创建套接字时发生 IO 错误，则抛出 `IOException` 异常。

需要注意的是，套接字在建立的时候，如果远程主机不可访问，这段代码就会阻塞很长时间，直到底层操作系统的限制而抛出异常。所以一般会在套接字建立后设置一个超时时间。

```java
Socket socket = new Socket(...);
socket.setSoTimeout(10000); // 单位为毫秒
```

2）套接字连接成功后，可以通过 `java.net.Socket` 类的 `getInputStream()` 方法获取输入流。有了 `InputStream` 对象后，可以借助文本扫描器类（Scanner）将其中的内容打印出来。

```java
InputStream is = socket.getInputStream();
Scanner scanner = new Scanner(is, "gbk");

while (scanner.hasNextLine()) {
    String line = scanner.nextLine();
    System.out.println(line);
}
```

部分结果（完整结果自己亲手实践一下哦）如下图所示：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/socket/socket-6b60e4b2-14d0-4d95-bb5c-146bc6a06147.jpg)


## 03、ServerSocket 实例

接下来，我们模拟一个远程服务，通过 `java.net.ServerSocket` 实现。代码示例如下。

```java
try (ServerSocket server = new ServerSocket(8888);
        Socket socket = server.accept();
        InputStream is = socket.getInputStream();
        OutputStream os = socket.getOutputStream();

        Scanner scanner = new Scanner(is)) {
    PrintWriter pw = new PrintWriter(new OutputStreamWriter(os, "gbk"), true);
    pw.println("你好啊，欢迎关注「沉默王二」 公众号，回复关键字「2048」 领取程序员进阶必读资料包");

    boolean done = false;
    while (!done && scanner.hasNextLine()) {
        String line = scanner.nextLine();
        System.out.println(line);

        if ("2048".equals(line)) {
            done = true;
        }
    }
} catch (UnknownHostException e) {
    e.printStackTrace();
} catch (IOException e) {
    e.printStackTrace();
}
```

1）建立服务器端的套接字也比较简单，只需要指定一个能够独占的端口号就可以了（0~1023 这些端口都已经被系统预留了）。

```java
ServerSocket server = new ServerSocket(8888);
```

2）调用 ServerSocket 对象的 `accept()` 等待客户端套接字的连接请求。一旦监听到客户端的套接字请求，就会返回一个表示连接已建立的 Socket 对象，可以从中获取到输入流和输出流。

```java
Socket socket = server.accept();
InputStream is = socket.getInputStream();
OutputStream os = socket.getOutputStream();
```

客户端套接字发送的所有信息都会包裹在服务器端套接字的输入流中；而服务器端套接字发送的所有信息都会包裹在客户端套接字的输出流中。

3）服务器端可以通过以下代码向客户端发送消息。

```java
PrintWriter pw = new PrintWriter(new OutputStreamWriter(os, "gbk"), true);
pw.println("你好啊，欢迎关注「沉默王二」 公众号，回复关键字「2048」 领取程序员进阶必读资料包");
```

4）服务器端可以通过以下代码读取客户端发送过来的消息。

```java
Scanner scanner = new Scanner(is);
boolean done = false;
while (!done && scanner.hasNextLine()) {
    String line = scanner.nextLine();
    System.out.println(line);

    if ("2048".equals(line)) {
        done = true;
    }
}
```


运行该服务后，可以通过 `telnet localhost 8888` 命令连接该远程服务，不出所料，你将会看到以下信息。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/socket/socket-fac025fa-8cbf-448d-8a6d-cd8993ba87f4.jpg)

PS：可以在当前命令窗口中输入 2048，服务端收到该消息后会中断该套接字连接（当前窗口会显示“遗失对主机的连接”）。

## 04、为多个客户端服务

非常遗憾的是，上面的例子中，服务器端只能为一个客户端服务——这不符合服务器端一对多的要求。

优化方案也非常简单（你应该也能想得到）：服务器端接收到客户端的套接字请求时，可以启动一个线程来处理，而主程序继续等待下一个连接。代码示例如下。

```java
try (ServerSocket server = new ServerSocket(8888)) {

    while (true) {
        Socket socket = server.accept();
        Thread thread = new Thread(new Runnable() {

            @Override
            public void run() {
              // 套接字处理程序
            }
        });
        thread.start();

    }
} catch (IOException e) {
    e.printStackTrace();
}
```

线程内部（`run(){}` 方法里）用来处理套接字，代码示例如下：

```java
try {
    InputStream is = socket.getInputStream();
    OutputStream os = socket.getOutputStream();
    Scanner scanner = new Scanner(is);

   // 其他代码省略
   // 向客户端发送消息
   // 读取客户端发送过来的消息
} catch (IOException e) {
    e.printStackTrace();
} finally {
    try {
        socket.close();
    } catch (IOException e) {
        e.printStackTrace();
    }
}
```

服务器端代码优化后重新运行，你就可以通过 telnet 命令测试了。打开一个命令行窗口输入 `telnet localhost 8888`，再打开一个新的命令行窗口输入 `telnet localhost 8888`，多个窗口都可以和服务器端进行通信，除非服务器端代码中断运行。

## 05、最后

如今大多数基于网络的软件，如浏览器、即时通讯工具甚至是 P2P 下载都是基于 Socket 实现的，所以掌握 Java Socket 编程还是蛮有必要的。Socket 编程也比较有趣，很多初学者都会编写一两个基于“客户端-服务器端”的小程序来提高自己的编程水平，建议你也试一试。

---------

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
