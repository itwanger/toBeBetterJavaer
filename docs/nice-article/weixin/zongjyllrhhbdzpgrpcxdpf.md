---
title: 新来个技术总监，把 RPC讲的那叫一个透彻，佩服！
shortTitle: 搞懂 RPC 和gRPC
description: 马上到了面试季，一文 gRPC，带大家搞定这块知识点！
author: 楼仔
category:
  - 微信公众号
head:
  - - meta
    - name: description
      content: 马上到了面试季，一文 gRPC，带大家搞定这块知识点！
---

RPC、gRPC、Thrift、HTTP，大家知道它们之间的联系和区别么？这些都是面试常考的问题，今天给大家分享一篇二哥三剑客团队之一楼仔的一篇硬核文章，带大家彻底搞懂 RPC 和 gRPC。

不 BB，直接上文章目录：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zongjyllrhhbdzpgrpcxdpf-d8f41176-9369-4a6d-a885-14c6fd912e8c.jpg)

## 1\. RPC

### 1.1 什么是 RPC ？

RPC（Remote Procedure Call Protocol）远程过程调用协议，目标就是让远程服务调用更加简单、透明。

RPC 框架负责屏蔽底层的传输方式（TCP 或者 UDP）、序列化方式（XML/Json/ 二进制）和通信细节，服务调用者可以像调用本地接口一样调用远程的服务提供者，而不需要关心底层通信细节和调用过程。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zongjyllrhhbdzpgrpcxdpf-44b31841-6fa1-4c49-bd8d-d46f07f31a56.jpg)

### 1.2 为什么要用 RPC ？

当我们的业务越来越多、应用也越来越多时，自然的，我们会发现有些功能已经不能简单划分开来或者划分不出来。

此时可以将公共业务逻辑抽离出来，将之组成独立的服务 Service 应用，而原有的、新增的应用都可以与那些独立的 Service 应用 交互，以此来完成完整的业务功能。

所以我们急需一种高效的应用程序之间的通讯手段来完成这种需求，RPC 大显身手的时候来了！

### 1.3 常用的 RPC 框架

*   **gRPC**：一开始由 google 开发，是一款语言中立、平台中立、开源的远程过程调用(RPC)系统。
*   **Thrift**：thrift 是一个软件框架，用来进行可扩展且跨语言的服务的开发。它结合了功能强大的软件堆栈和代码生成引擎，以构建在 C++, Java, Python, PHP, Ruby, Erlang, Perl, Haskell, C#, Cocoa, JavaScript, Node.js, Smalltalk, and OCaml 这些编程语言间无缝结合的、高效的服务。
*   **Dubbo**：Dubbo 是一个分布式服务框架，以及 SOA 治理方案，Dubbo自2011年开源后，已被许多非阿里系公司使用。
*   **Spring Cloud**：Spring Cloud 由众多子项目组成，如 Spring Cloud Config、Spring Cloud Netflix、Spring Cloud Consul 等，提供了搭建分布式系统及微服务常用的工具。

### 1.4 RPC 的调用流程

要让网络通信细节对使用者透明，我们需要对通信细节进行封装，我们先看下一个 RPC 调用的流程涉及到哪些通信细节：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zongjyllrhhbdzpgrpcxdpf-10aab0c7-8cb6-43d6-89c8-1d46ba0c9034.jpg)

1.  服务消费方（client）调用以本地调用方式调用服务；
2.  client stub接收到调用后负责将方法、参数等组装成能够进行网络传输的消息体；
3.  client stub找到服务地址，并将消息发送到服务端；
4.  server stub收到消息后进行解码；
5.  server stub根据解码结果调用本地的服务；
6.  本地服务执行并将结果返回给 server stub；
7.  server stub将返回结果打包成消息并发送至消费方；
8.  client stub接收到消息，并进行解码；
9.  服务消费方得到最终结果。

RPC 的目标就是要 2~8 这些步骤都封装起来，让用户对这些细节透明，下面是网上的另外一幅图，感觉一目了然：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zongjyllrhhbdzpgrpcxdpf-3122cede-0ac2-431e-b783-be71a23e49f1.jpg)

## 2\. gRPC

### 2.1 什么是 gRPC ？

gRPC 是一个高性能、通用的开源 RPC 框架，其由 Google 2015 年主要面向移动应用开发并基于 HTTP/2 协议标准而设计，基于 ProtoBuf 序列化协议开发，且支持众多开发语言。

由于是开源框架，通信的双方可以进行二次开发，所以客户端和服务器端之间的通信会更加专注于业务层面的内容，减少了对由 gRPC 框架实现的底层通信的关注。

如下图，DATA 部分即业务层面内容，下面所有的信息都由 gRPC 进行封装。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zongjyllrhhbdzpgrpcxdpf-ef34af4a-eeb2-4cd9-a230-d6ee52b781cc.jpg)

### 2.2 gRPC 的特点

*   跨语言使用，支持 C++、Java、Go、Python、Ruby、C#、Node.js、Android Java、Objective-C、PHP 等编程语言；
*   基于 IDL 文件定义服务，通过 proto3 工具生成指定语言的数据结构、服务端接口以及客户端 Stub；
*   通信协议基于标准的 HTTP/2 设计，支持双向流、消息头压缩、单 TCP 的多路复用、服务端推送等特性，这些特性使得 gRPC 在移动端设备上更加省电和节省网络流量；
*   序列化支持 PB（Protocol Buffer）和 JSON，PB 是一种语言无关的高性能序列化框架，基于 HTTP/2 + PB, 保障了 RPC 调用的高性能；
*   安装简单，扩展方便（用该框架每秒可达到百万个RPC）。

### 2.3 gRPC 交互过程

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zongjyllrhhbdzpgrpcxdpf-b238b8d1-5c4b-4f8e-8224-cd181ec505aa.jpg)

*   交换机在开启 gRPC 功能后充当 gRPC 客户端的角色，采集服务器充当 gRPC 服务器角色；
*   交换机会根据订阅的事件构建对应数据的格式（GPB/JSON），通过 Protocol Buffers 进行编写 proto 文件，交换机与服务器建立 gRPC 通道，通过 gRPC 协议向服务器发送请求消息；
*   服务器收到请求消息后，服务器会通过 Protocol Buffers 解译 proto 文件，还原出最先定义好格式的数据结构，进行业务处理；
*   数据处理完后，服务器需要使用 Protocol Buffers 重编译应答数据，通过 gRPC 协议向交换机发送应答消息；
*   交换机收到应答消息后，结束本次的 gRPC 交互。

> 简单地说，gRPC 就是在客户端和服务器端开启 gRPC 功能后建立连接，将设备上配置的订阅数据推送给服务器端。
> 
> 我们可以看到整个过程是需要用到 Protocol Buffers 将所需要处理数据的结构化数据在 proto 文件中进行定义。

### 2.4 Protocol Buffers

你可以理解 **ProtoBuf 是一种更加灵活、高效的数据格式**，与 XML、JSON 类似，在一些高性能且对响应速度有要求的数据传输场景非常适用。

ProtoBuf 在 gRPC 的框架中主要有三个作用：定义数据结构、定义服务接口，通过序列化和反序列化方式提升传输效率。

为什么 ProtoBuf 会**提高传输效率**呢？

我们知道使用 XML、JSON 进行数据编译时，数据文本格式更容易阅读，但进行数据交换时，设备就需要耗费大量的 CPU 在 I/O 动作上，自然会影响整个传输速率。

Protocol Buffers 不像前者，它会将字符串进行序列化后再进行传输，即**二进制数据**。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zongjyllrhhbdzpgrpcxdpf-848f4e52-5818-4fb9-8272-bc4962a6a6ac.jpg)

可以看到其实两者内容相差不大，并且内容非常直观，但是 Protocol Buffers 编码的内容只是提供给操作者阅读的，实际上传输的并不会以这种文本形式，而是序列化后的二进制数据，字节数会比 JSON、XML 的字节数少很多，速率更快。

gPRC 如何**支撑跨平台，多语言**呢 ？

Protocol Buffers 自带一个编译器也是一个优势点，前面提到的 proto 文件就是通过编译器进行编译的，proto 文件需要编译生成一个类似库文件，基于库文件才能真正开发数据应用。

具体用什么编程语言编译生成这个库文件呢？由于现网中负责网络设备和服务器设备的运维人员往往不是同一组人，运维人员可能会习惯使用不同的编程语言进行运维开发，那么 Protocol Buffers 其中一个优势就能发挥出来——跨语言。

从上面的介绍，我们得出在编码方面 Protocol Buffers 对比 JSON、XML 的优点：

*   标准的 IDL 和 IDL 编译器，这使得其对工程师非常友好；
*   序列化数据非常简洁，紧凑，与 XML 相比，其序**列化之后的数据量约为 1/3 到 1/10；**
*   解析速度非常快，**比对应的 XML 快约 20-100 倍；**
*   提供了非常友好的动态库，使用非常简单，反序列化只需要一行代码。

Protobuf 也有其局限性：

*   由于 Protobuf 产生于 Google，所以目前其**仅支持 Java、C++、Python 三种语言**；
*   Protobuf 支持的数据类型相对较少，不支持常量类型；
*   由于其设计的理念是纯粹的展现层协议（Presentation Layer），目前并没有一个专门支持 Protobuf 的 RPC 框架。

Protobuf 适用场景：

*   Protobuf 具有广泛的用户基础，空间开销小以及高解析性能是其亮点，**非常适合于公司内部的对性能要求高的 RPC 调用**；
*   由于 Protobuf 提供了标准的 IDL 以及对应的编译器，其 IDL 文件是参与各方的非常强的业务约束；
*   Protobuf 与传输层无关，采用 HTTP 具有良好的跨防火墙的访问属性，所以 Protobuf 也适用于公司间对性能要求比较高的场景；
*   由于其解析性能高，序列化后数据量相对少，**非常适合应用层对象的持久化场景；**
*   主要问题在于其所**支持的语言相对较少**，另外由于没有绑定的标准底层传输层协议，**在公司间进行传输层协议的调试工作相对麻烦。**

### 2.5 基于 HTTP 2.0 标准设计

除了 Protocol Buffers 之外，从交互图中和分层框架可以看到， gRPC 还有另外一个优势——它是基于 HTTP 2.0 协议的。

由于 gRPC 基于 HTTP 2.0 标准设计，带来了更多强大功能，**如多路复用、二进制帧、头部压缩、推送机制。**

这些功能给设备带来重大益处，如节省带宽、降低 TCP 连接次数、节省 CPU 使用等，gRPC 既能够在客户端应用，也能够在服务器端应用，从而以透明的方式实现两端的通信和简化通信系统的构建。

HTTP 1.X 定义了四种与服务器交互的方式，分别为 GET、POST、PUT、DELETE，这些在 HTTP 2.0 中均保留，我们看看 HTTP 2.0 的**新特性**：双向流、多路复用、二进制帧、头部压缩。

### 2.6 性能对比

与采用文本格式的 JSON 相比，采用二进制格式的 protobuf 在速度上可以达到前者的 5 倍！

Auth0 网站所做的性能测试结果显示，protobuf 和 JSON 的优势差异在 Java、Python 等环境中尤为明显，下图是 Auth0 在两个 Spring Boot 应用程序间所做的对比测试结果。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zongjyllrhhbdzpgrpcxdpf-12e3ca24-ca97-4f8c-a3c6-bc3f86545a2f.jpg)

结果显示，**protobuf 所需的请求时间最多只有 JSON 的 20% 左右，即速度是其 5 倍!**

下面看一下性能和空间开销对比。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zongjyllrhhbdzpgrpcxdpf-b525c88e-4120-4356-8d9d-79de50833439.jpg)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zongjyllrhhbdzpgrpcxdpf-45a3c518-4ee6-424a-988a-85670d99f643.jpg)

从上图可得出如下结论：

*   XML序列化（Xstream）无论在性能和简洁性上比较差。
*   Thrift 与 Protobuf 相比在时空开销方面都有一定的劣势。
*   Protobuf 和 Avro 在两方面表现都非常优越。

## 3\. gRPC 实战

### 3.1 项目结构

我们先看一下项目结构：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zongjyllrhhbdzpgrpcxdpf-dbf556c2-1bc3-4614-bf17-587a8cb53cd2.jpg)

### 3.2 生成 protobuf 文件

文件 helloworld.proto：

```
syntax = "proto3";

option java_multiple_files = true;
option java_package = "io.grpc.examples.helloworld";
option java_outer_classname = "HelloWorldProto";
option objc_class_prefix = "HLW";

package helloworld;

// The greeting service definition.
service Greeter {
  // Sends a greeting
  rpc SayHello (HelloRequest) returns (HelloReply) {}
}

// The request message containing the user's name.
message HelloRequest {
  string name = 1;
}

// The response message containing the greetings
message HelloReply {
  string message = 1;
}
```

这里提供了一个 SayHello() 方法，然后入参为 HelloRequest，返回值为 HelloReply，可以看到 proto 文件只定义了入参和返回值的格式，以及调用的接口，至于接口内部的实现，该文件完全不用关心。

文件 pom.xml：

```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>rpc-study</artifactId>
        <groupId>org.example</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>grpc-demo</artifactId>

    <dependencies>
        <dependency>
            <groupId>io.grpc</groupId>
            <artifactId>grpc-netty-shaded</artifactId>
            <version>1.14.0</version>
        </dependency>
        <dependency>
            <groupId>io.grpc</groupId>
            <artifactId>grpc-protobuf</artifactId>
            <version>1.14.0</version>
        </dependency>
        <dependency>
            <groupId>io.grpc</groupId>
            <artifactId>grpc-stub</artifactId>
            <version>1.14.0</version>
        </dependency>
    </dependencies>

    <build>
        <extensions>
            <extension>
                <groupId>kr.motd.maven</groupId>
                <artifactId>os-maven-plugin</artifactId>
                <version>1.5.0.Final</version>
            </extension>
        </extensions>
        <plugins>
            <plugin>
                <groupId>org.xolstice.maven.plugins</groupId>
                <artifactId>protobuf-maven-plugin</artifactId>
                <version>0.5.1</version>
                <configuration>
                    <protocArtifact>com.google.protobuf:protoc:3.5.1-1:exe:${os.detected.classifier}</protocArtifact>
                    <pluginId>grpc-java</pluginId>
                    <pluginArtifact>io.grpc:protoc-gen-grpc-java:1.14.0:exe:${os.detected.classifier}</pluginArtifact>
                </configuration>
                <executions>
                    <execution>
                        <goals>
                            <goal>compile</goal>
                            <goal>compile-custom</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <configuration>
                    <source>6</source>
                    <target>6</target>
                </configuration>
            </plugin>

        </plugins>
    </build>
</project>
```

这里面的 build 其实是为了安装 protobuf 插件，里面其实有 2 个插件我们需要用到，分别为 protobuf:compile 和 protobuf:compile-javanano，当我们直接执行时，会生成左侧文件，其中 GreeterGrpc 提供调用接口，Hello 开头的文件功能主要是对数据进行序列化，然后处理入参和返回值。

> 可能有同学会问，你把文件生成到 target 中，我想放到 main.src 中，你可以把这些文件 copy 出来，或者也可以通过工具生成：
> 
> *   下载 protoc.exe 工具 ，下载地址：https://github.com/protocolbuffers/protobuf/releases
> *   下载 protoc-gen-grpc 插件, 下载地址: http://jcenter.bintray.com/io/grpc/protoc-gen-grpc-java/

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zongjyllrhhbdzpgrpcxdpf-a99b4636-fd35-4a9e-860c-22d2cc892fe4.jpg)

### 3.3 服务端和客户端

文件 HelloWorldClient.java：

```
public class HelloWorldClient {
    private final ManagedChannel channel;
    private final GreeterGrpc.GreeterBlockingStub blockingStub;
    private static final Logger logger = Logger.getLogger(HelloWorldClient.class.getName());

    public HelloWorldClient(String host,int port){
        channel = ManagedChannelBuilder.forAddress(host,port)
                .usePlaintext(true)
                .build();

        blockingStub = GreeterGrpc.newBlockingStub(channel);
    }


    public void shutdown() throws InterruptedException {
        channel.shutdown().awaitTermination(5, TimeUnit.SECONDS);
    }

    public  void greet(String name){
        HelloRequest request = HelloRequest.newBuilder().setName(name).build();
        HelloReply response;
        try{
            response = blockingStub.sayHello(request);
        } catch (StatusRuntimeException e)
        {
            logger.log(Level.WARNING, "RPC failed: {0}", e.getStatus());
            return;
        }
        logger.info("Message from gRPC-Server: "+response.getMessage());
    }

    public static void main(String[] args) throws InterruptedException {
        HelloWorldClient client = new HelloWorldClient("127.0.0.1",50051);
        try{
            String user = "world";
            if (args.length > 0){
                user = args[0];
            }
            client.greet(user);
        }finally {
            client.shutdown();
        }
    }
}
```

这个太简单了，就是连接服务端口，调用 sayHello() 方法。

文件 HelloWorldServer.java：

```
public class HelloWorldServer {
    private static final Logger logger = Logger.getLogger(HelloWorldServer.class.getName());

    private int port = 50051;
    private Server server;

    private void start() throws IOException {
        server = ServerBuilder.forPort(port)
                .addService(new GreeterImpl())
                .build()
                .start();
        logger.info("Server started, listening on " + port);

        Runtime.getRuntime().addShutdownHook(new Thread() {

            @Override
            public void run() {

                System.err.println("*** shutting down gRPC server since JVM is shutting down");
                HelloWorldServer.this.stop();
                System.err.println("*** server shut down");
            }
        });
    }

    private void stop() {
        if (server != null) {
            server.shutdown();
        }
    }

    // block 一直到退出程序
    private void blockUntilShutdown() throws InterruptedException {
        if (server != null) {
            server.awaitTermination();
        }
    }

    public static void main(String[] args) throws IOException, InterruptedException {
        final HelloWorldServer server = new HelloWorldServer();
        server.start();
        server.blockUntilShutdown();
    }

    // 实现 定义一个实现服务接口的类
    private class GreeterImpl extends GreeterGrpc.GreeterImplBase {
        @Override
        public void sayHello(HelloRequest req, StreamObserver<HelloReply> responseObserver) {
            HelloReply reply = HelloReply.newBuilder().setMessage(("Hello " + req.getName())).build();
            responseObserver.onNext(reply);
            responseObserver.onCompleted();
            System.out.println("Message from gRPC-Client:" + req.getName());
            System.out.println("Message Response:" + reply.getMessage());
        }
    }
}
```

主要是实现 sayHello() 方法，里面对数据进行了简单处理，入参为 “W orld”，返回的是 “Hello World”。

### 3.4 启动服务

先启动 Server，返回如下：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zongjyllrhhbdzpgrpcxdpf-6a003725-6235-4214-9087-5d31995403d3.jpg)

再启动 Client，返回如下：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zongjyllrhhbdzpgrpcxdpf-d0a56a0c-5813-47d5-8235-fb97fc3455a8.jpg)

同时 Server返回如下：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zongjyllrhhbdzpgrpcxdpf-d6301f6b-b766-4c3d-8555-51db5d343d86.jpg)

### 3.5 项目代码

Git 地址：https://github.com/lml200701158/rpc-study

## 4\. 写在最后

这篇文章其实是我去年写的，这次是重新整理，**文章详细讲解了 RPC 和 gRPC，以及 gRPC 的应用示例**，非常全面，后面会再把 Thrift 整理出来。

这个 Demo 看起来很简单，我 TM 居然搞了大半天，一开始是因为不知道需要执行 2 个不同的插件来生成 protobuf，以为只需要点击 protobuf:compile 就可以，结果发现 protobuf:compile-javanano 也需要点一下。

还有就是我自己喜欢作，感觉通过插件生成 protobuf 不完美，我想通过自己下载的插件，手动生成 protobuf 文件，结果手动生成的没有搞定，自动生成的方式也不可用，搞了半天才发现是缓存的问题，最后直接执行 “Invalidate Caches / Restart” 才搞定。

应征了一句话“no zuo no die”，不过这个过程还是需要经历的。

* * *

## ending

一个人可以走得很快，但一群人才能走得更远。欢迎加入[二哥的编程星球](https://mp.weixin.qq.com/s/fpQZq4vOA-bH5XCZETcXLA)，里面的每个球友都非常的友善，除了鼓励你，还会给你提出合理的建议。星球提供的三份专属专栏《Java 面试指南》、《编程喵 🐱（Spring Boot+Vue 前后端分离）实战项目笔记》、《Java 版 LeetCode 刷题笔记》，干货满满，价值连城。

![](https://files.mdnice.com/user/3903/0c9e5f37-f702-4799-9a56-0ad87173e875.png)

![](https://files.mdnice.com/user/3903/93ef3f1d-10f1-433a-932e-d5ba45cd61ee.png)

![](https://files.mdnice.com/user/3903/16199e4c-5e44-4924-abcb-46a6e1e1bc0f.png)


已经有 **610 多名** 小伙伴加入[二哥的编程星球](https://mp.weixin.qq.com/s/fpQZq4vOA-bH5XCZETcXLA)了，如果你也需要一个良好的学习氛围，[戳链接](https://mp.weixin.qq.com/s/fpQZq4vOA-bH5XCZETcXLA)加入我们的大家庭吧！这是一个 Java 学习指南 + 编程实战 + LeetCode 刷题的私密圈子，你可以向二哥提问、帮你制定学习计划、跟着二哥一起做实战项目，冲冲冲。


---

没有什么使我停留——除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟。

**推荐阅读**：

- [今年面试有点小难，还还是要冲](https://mp.weixin.qq.com/s/iETW0dCfxxTTiRt1-WmeNw)
- [人生当中挣到的第一个 1 万元](https://mp.weixin.qq.com/s/9Naa2r7Xkf9D4d9tqEdgVQ)
- [新一代开源免费的终端工具，太酷了](https://mp.weixin.qq.com/s/2IUe50xBhuEWKDzARVd51A)
- [Java 后端四件套学习资料](https://mp.weixin.qq.com/s/3lqp4x1B5LI1hNjWAi6v1g)
- [银行开发太安逸，奋发图强要跳槽](https://mp.weixin.qq.com/s/ZeA-mEyMkEeSHRtd8Pob9A)
- [这个大专生，强的离谱！](https://mp.weixin.qq.com/s/fNMhpER0tp5RO5TGcgALMQ)
- [没必要为实习碰的头破血流](https://mp.weixin.qq.com/s/KxUMq2YmlIBMbAeRwUm8JA)
- [网站挣了 200 美刀后的感触](https://mp.weixin.qq.com/s/PxgZkuA_SnAgG7xfwlKLgw)


>转载链接：[https://mp.weixin.qq.com/s/4Sxal7N-uZ8gvphC8XWo8A](https://mp.weixin.qq.com/s/4Sxal7N-uZ8gvphC8XWo8A)，出处：楼仔，整理：沉默王二
