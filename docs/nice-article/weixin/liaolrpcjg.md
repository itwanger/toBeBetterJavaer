---
title: 聊聊 RPC 架构
shortTitle: 聊聊 RPC 架构
category:
  - 微信公众号
---

大家好，我是二哥呀~

当你在构建一个分布式系统时，势必需要考虑的一个问题是：如何实现服务与服务之间的调用？当然，你可以使用 Dubbo 或 Spring Cloud 等分布式服务框架来封装技术实现的复杂性，以此完成这个目标。不过，假如现在没有这些框架，需要你自己来实现远程调用，你会怎么做呢？

很多人会选择实现一套 RPC 框架来调用远程服务。

那么你了解 RPC 架构的基本结构吗？如果你想要自己实现 RPC 框架来完成远程调用，又该构建怎么样的技术体系呢？接下来，我就给你具体介绍一下。

## RPC 架构的基本结构

想要构建一套完整的 RPC 架构，就需要明确该架构所具备的基本结构，而 RPC 架构的基本结构中又存在很多组件。因此接下来，我就通过 RPC 基本结构演进的过程，来给你一一讲解下。

首先，我们通常把发生调用关系的两个服务分别称为服务的提供者（Provider）和消费者（Consumer）。所以，简单来说，RPC 就是服务的消费者向提供者发起远程调用并获取结果的过程，这是 RPC 最简单的一种表现形式。

![](https://mmbiz.qpic.cn/mmbiz_png/8KKrHK5ic6XDtrfTl0sKfxgbTqUKX8hkxhibFXsEES5MopHFV4UHNDhia1DG0vcqw4DOu8v25scKBSLiauSZicLOFuA/640?wx_fmt=png)

如果想要实现服务提供者和消费者之间的有效交互，那么两者之间就需要确立与网络通信相关的网络协议以及通信通道。同时，服务的提供者需要把自己的服务调用入口暴露出来，并时刻准备接收来自消费者的请求。

这里，我们把通信通道和网络协议分别命名为 RpcChannel 和 RpcProtocol，而把服务提供者接收请求的组件称为 RpcAcceptor，把消费者发起请求的组件称为 RpcConnector。这样，RPC 架构就演变成了这个样子：

![](https://mmbiz.qpic.cn/mmbiz_png/8KKrHK5ic6XDtrfTl0sKfxgbTqUKX8hkx6a1eJ665BZ0vko7pHiaxgLniaJqZCjFrvIBhicc1ib9hzvZayZ7aw4RbSQ/640?wx_fmt=png)

然后，对于服务提供者和消费者而言，为了双方能够正常识别所发送的请求和所接收到的响应结果，需要定义统一的契约。我们把这种契约称为远程 API（Remote API），以便与本地 API 加以区别。如此一来，基于同一套远程 API 的定义，RPC 架构就具备了根据业务来定义通信契约的能力。

![](https://mmbiz.qpic.cn/mmbiz_png/8KKrHK5ic6XDtrfTl0sKfxgbTqUKX8hkxiataO0G9eLntNMMoCvUl8CWYHZYhkJkYI1U5px0V0f8wgeM4NWcGarw/640?wx_fmt=png)

类似地，为了更好地区分 RPC 架构中的角色，我们把真正提供业务服务的组件称为 RpcServer，而把发起真实客户端请求的组件称为 RpcClient。这样，RpcServer 负责实现远程 API，而 RpcClient 负责调用远程 API。

![](https://mmbiz.qpic.cn/mmbiz_png/8KKrHK5ic6XDtrfTl0sKfxgbTqUKX8hkxoibDgYT2J72K4Yl0HAfvP0Jl1ExcicTD4g1W6U4BWjxRGjlVic7vduUpA/640?wx_fmt=png)

当然，对于远程 API 而言，服务提供者和消费者的处理方式显然是不一样的。提供者需要根据消费者的请求来调用 RpcServer 的具体实现并返回结果，这部分的工作由 RpcInvoker 来执行，而消费者通过 RpcCaller 组件对请求进行编码之后，发送给服务方并等待结果。

![](https://mmbiz.qpic.cn/mmbiz_png/8KKrHK5ic6XDtrfTl0sKfxgbTqUKX8hkxhERPlOqzEO1sp15fD8XRGE6DFhyChcpZm4m0QgibnQpqT8LwOOaTxHw/640?wx_fmt=png)

最后，为了降低开发人员的开发难度，让远程调用的执行过程看上去就像在执行本地方法一样，在主流的 RPC 实现机制中，通常都会在客户端添加代理机制，以此提供远程服务本地化访问的入口，我们把这个代理组件称为 RpcProxy。

另外，在服务器端，为了更好地控制业务方法执行过程，通常也会引入具备线程管理、超时控制等机制的 RpcProcessor 组件。

![](https://mmbiz.qpic.cn/mmbiz_png/8KKrHK5ic6XDtrfTl0sKfxgbTqUKX8hkxF7iaOiaes5uHS57wrwbJfOib9a9hjYExPz8kHMcbJOcGbibMISgGI6Y7zw/640?wx_fmt=png)

以上就是整个 RPC 架构的演进过程了。从中你可以发现，RPC 架构中的客户端组件和服务器端组件形成了一种对称结构，它们各司其职，但又共同构成一个整体。为了帮你加深理解，这里我再总结下前面提到的各个组件。

客户端组件与职责包括：

*   RpcClient，负责调用远程 API，这个过程会依赖于 RpcProxy 提供的代理实现
*   RpcProxy，远程 API 的代理实现，提供远程服务本地化访问的入口
*   RpcCaller，负责编码和发送调用请求到服务方并等待结果
*   RpcConnector，负责与服务端建立通信通道并发送请求到服务端

服务端组件与职责包括：

*   RpcServer，负责实现远程 API
*   RpcInvoker，负责调用服务端的具体实现并返回结果
*   RpcProcessor，负责对请求进行处理，高效控制调用过程
*   RpcAcceptor，负责接收客户方请求并返回请求结果

而客户端和服务器端所共有的组件包括：

*   RpcProtocol，负责网络传输协议的编码和解码
*   RpcChannel，负责建立和维护网络数据传输通道

这样，我们对一个典型 RPC 架构中的基本结构和组件就有了完整的了解。那么，如果我们想要实现这个架构，需要构建怎样的技术体系呢？

## RPC 架构的技术体系

我们都知道，架构是一种设计上的思想和方法，明白了它的基本结构和组成部分之后，我们就可以进一步梳理想要实现 RPC 架构的技术体系，包括网络通信、序列化、传输协议和远程调用。

#### 网络通信

我们先来看网络通信。网络通信的涉及面很广，对于 RPC 架构而言，一方面我们会重点关注性能，所以势必要考虑基于 TCP 等特定协议的网络连接方式和 IO 模型；另一方面，我们也需要考虑可靠性，因为这样才能确保远程调用过程的稳定。

好，下面我们就具体来看看。

首先是性能问题。一般来说，基于 TCP 协议的网络连接有两种基本方式：长连接和短连接。长连接和短连接的本质区别是连接的创建和关闭策略，长连接可以复用现有连接，而短连接则能够更快地释放资源。这两者本身各有利弊，而在 RPC 框架的实现过程中，考虑到性能和服务治理等因素，我们通常是使用长连接进行通信，典型的实现框架就是 Dubbo。

而对于 IO 模型，最简单、最基础的网络 IO 模型就是阻塞式 IO，即 BIO（Blocking IO）。BIO 要求客户端请求数与服务端线程数一一对应，但是显然，由于线程的创建需要消耗系统资源，在分布式系统中，服务端可以创建的线程数将会成为系统的瓶颈。

因此，在 RPC 架构中，我们通常都会使用非阻塞 IO，即 NIO（Non-blocking IO）技术来提供性能。基于 NIO 模式下的多路复用机制，创建少数的线程就能对大量请求进行高效的响应。

然后是针对可靠性问题，由于存在网络闪断、超时等与网络状态相关的不稳定性因素，以及业务系统本身的故障，网络之间的通信就必须在发生上述问题时能够快速感知并修复。常见的网络通信保障手段，包括链路有效性检测及断线之后的重连处理等。这些机制都比较常见，也不是我们讨论的重点，这里就不做具体展开了。

#### 序列化

而如果我们想要在网络上传输数据，就需要用到数据序列化技术了。

目前业界成熟的序列化工具已经有很多，常见的 XML 和 JSON 就是文本类序列化方式的代表，它们可以让数据以开发人员可读的方式进行传输。还有一种基于二进制实现的方案，包括 Google 的 Protocol Buffer 和 Facebook 的 Thrift。

那么，我们在选择序列化工具时，应该考虑什么呢？一个关键指标就是性能。

性能指标主要包括空间复杂度、时间复杂度以及 CPU/ 内存资源占用等。我在下表列举了目前主流的一些序列化技术，供你参考：

![](https://mmbiz.qpic.cn/mmbiz_png/8KKrHK5ic6XDtrfTl0sKfxgbTqUKX8hkxYNl7vAHVbsXUMvS7aiafich1U6veuZI2ZA7cric8NzfggmUk5Ium3ycSg/640?wx_fmt=png)

可以看到，在时间维度上，Alibaba 的 fastjson 具有一定优势；而从空间维度上看，相较其他技术，你可以优先选择 Protocol Buffer。

#### 传输协议

我们知道，但凡涉及通过网络来传输数据，就一定要采用某种传输协议。在 ISO/OSI 的 7 层网络模型中，RPC 架构的设计和实现通常会涉及传输层及以上各个层次的相关协议，我们所熟悉的 TCP 协议就属于传输层，而 HTTP 协议则位于应用层。

无论是采用 7 层网络模型中的哪一层，在网络请求过程中，数据都是以消息的形式进行传递。而消息的组成是有一定结构的，消息头和消息体构成了所传输消息的主体，其中消息体表示需要传输的业务数据，而消息头用于进行传输控制。

![](https://mmbiz.qpic.cn/mmbiz_png/8KKrHK5ic6XDtrfTl0sKfxgbTqUKX8hkx4ib0Hh9PQvibvulb495z1W5q7hRpiaLp4vKIuNDjpm3Ej68Hntc7aBsXg/640?wx_fmt=png)

可以看到，每个层次都从上层取得数据，加上消息头信息形成新的消息体，并将新的消息传递给下一层次。通过对消息头和消息体进行扩展，我们就可以实现私有化的传输协议。

这也是大部分 RPC 框架内部所采用的实现方式，这样做的主要目的是对公有协议进行精简，从而提升性能。另外，出于扩展性的考虑，具备高度定制化的私有协议也比公共协议更加容易实现扩展。这方面的典型示例还是 Dubbo 框架，它提供了完全自定义的 Dubbo 协议。

#### 远程调用

明确了网络通信的基本方式、序列化手段以及所采用的传输协议之后，我们就可以发起真正的远程调用了。RPC 本质也是一种服务调用，而服务调用存在两种基本方式，即单向（One Way）模式和请求应答（Request-Response）模式，前者体现为异步操作，后者一般执行同步操作。

首先我们要知道，同步调用会造成业务线程阻塞，但开发和管理会相对简单。这是为什么呢？我们先来看一下同步调用的时序图：

![](https://mmbiz.qpic.cn/mmbiz_png/8KKrHK5ic6XDtrfTl0sKfxgbTqUKX8hkxvSEVzibDUZbhTTExSBJzOx5iaMQqRAAHW3cJUiaicoaEI7iaT5ibonpaAnpg/640?wx_fmt=png)

从中可以看到，服务线程发送请求到 IO 线程之后，就一直处于等待阶段，直到 IO 线程完成与网络的读写操作之后，才会被主动唤醒。

而使用异步调用的目的就在于获取高性能。在实现异步调用过程中，我们通常都会使用到 Java 中所提供的 Future 机制。Future 调用可以进一步细分成两种模式，Future-Get 模式和 Future-Listener 模式。Future-Get 模式参考下图：

![](https://mmbiz.qpic.cn/mmbiz_png/8KKrHK5ic6XDtrfTl0sKfxgbTqUKX8hkxutRjpicp6XUkwG3N0FNKDOZCyz0awhC3rJxzicEwEyNfFdr80OnoDBVQ/640?wx_fmt=png)

可以看到在这种模式下，服务线程通过主动 get 结果的方式获取 Future 结果，而这个 get 过程是串行的，会造成执行 get 方法的线程形成阻塞。

Future-Listener 模式则不同，在 Future-Listener 模式中需要创建 Listener，当 Future 结果生成时会唤醒注册到该 Future 上的 Listener 对象，从而形成异步回调机制。

除了同步和异步调用之外，还存在并行（Parallel）调用和泛化（Generic）调用等调用方法，虽然也有其特定的应用场景，但对于 RPC 架构而言并不是主流的调用方式，这里就不具体展开了。

## 总结

可以说，RPC 是分布式系统中一项基础设施类的技术体系，但凡涉及服务与服务之间的交互就需要使用到 RPC 架构。当你在使用一个分布式框架时，可以尝试用今天介绍的 RPC 架构的基本结构和技术体系进行分析，从而加深对这项技术体系的理解。


