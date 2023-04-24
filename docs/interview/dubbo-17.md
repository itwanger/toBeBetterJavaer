---
title: 17 道 Dubbo 精选面试题👍
shortTitle: 17 道 Dubbo 精选面试题👍
category:
  - 求职面试
tag:
  - 面试题&八股文
description: Java程序员进阶之路，小白的零基础Java教程，17 道 Dubbo 精选面试题👍
head:
  - - meta
    - name: keywords
      content: dubbo,面试题,八股文
---

# Dubbo：17道精选高频面试题必看:+1:

**目录**

- 1.Dubbo 是什么？RPC 又是什么？
- 2\. Dubbo 能做什么？
- 3.能说下 Dubbo 的总体的调用过程吗？
- 4.说说 Dubbo 支持哪些协议，每种协议的应用场景和优缺点
- 5.Dubbo 中都用到哪些设计模式？
- 6.如果 Dubbo 中 provider 提供的服务由多个版本怎么办？
- 7.服务暴露的流程是怎么样的？
- 8.服务引用的流程是怎么样的？
- 9.Dubbo 的注册中心有哪些？
- 10.聊聊 Dubbo SPI 机制？
- 11.Dubbo 的 SPi 和 JAVA 的 SPI 有什么区别？
- 12.有哪些负载均衡策略？
- 13.集群容错方式有哪些？
- 14.说说 Dubbo 的分层？
- 15.服务提供者能实现失效踢出是什么原理？
- 16.为什么要通过代理对象通信？？
- 17.怎么设计一个 RPC 框架？

---

## 1.Dubbo 是什么？RPC 又是什么？

**Dubbo 是一个分布式服务框架**，致力于提供高性能和透明化的 RPC 远程服务调用方案，以及 SOA 服务治理方案。

> **RPC（Remote Procedure Call）**—远程过程调用，它是一种通过网络从远程计算机程序上请求服务，而不需要了解底>层网络技术的协议。RPC 协议假定某些传输协议的存在，如 TCP 或 UDP，为通信程序之间携带信息数据。在 OSI 网络>通信模型中，RPC 跨越了传输层和应用层。RPC 使得开发包括网络分布式多程序在内的应用程序更加容易。RPC 采用客户机/服务器模式。请求程序就是一个客户机，而服务提供程序就是一个服务器。首先，客户机调用进程发>送一个有进程参数的调用信息到服务进程，然后等待应答信息。在服务器端，进程保持睡眠状态直到调用信息到达为>止。当一个调用信息到达，服务器获得进程参数，计算结果，发送答复信息，然后等待下一个调用信息，最后，客户>端调用进程接收答复信息，获得进程结果，然后调用执行继续进行。有多种 RPC 模式和执行。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-msbgwzdubboq-30098e26-c2c6-463b-bdb8-4cec95a9b6f8.jpg)

我们用一种通俗易懂的语言解释它，**远程调用就是本地机器调用远程机器的一个方法，远程机器返回结果的过程**。

**为什么要这么做？**

主要原因是由于单台服务的性能已经无法满足我们了，在这个流量剧增的时代，只有**多台服务器**才能支撑起来现有的用户体系，

而在这种体系下，服务越来越多，逐渐演化出了现在这种微服务化的 RPC 框架。

---

## 2\. Dubbo 能做什么？

Dubbo 的核心功能主要包含:

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-msbgwzdubboq-78d6db3f-70c7-4ebb-90cb-5b731e77019e.jpg)



1.  **远程通讯:dubbo-remoting**模块， 提供对多种基于长连接的 NIO 框架抽象封装，包括多种线程模型，序列化，以及“请求-响应”模式的信息交换方式。



2.  **集群容错**: 提供基于接口方法的透明远程过程调用，包括多协议支持，以及软负载均衡，失败容错，地址路由，动态配置等集群支持。



3.  **自动发现**: 基于注册中心目录服务，使服务消费方能动态的查找服务提供方，使地址透明，使服务提供方可以平滑增加或减少机器。


## 3.能说下 Dubbo 的总体的调用过程吗？

调用过程图：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-msbgwzdubboq-4814068d-19cc-42d9-b9bc-26c4c063c8c2.jpg)

- 1.Proxy 持有一个 Invoker 对象，**使用 Invoker 调用**
- 2.之后通过**Cluster 进行负载容错**，失败重试
- 3.调用 Directory**获取远程服务的 Invoker**列表
- 4.负载均衡
  - 用户**配置了路由规则**，则根据路由规则过滤获取到的 Invoker 列表
  - 用户没**有配置路由规则或配置路由后还有很多节点**，则使用 LoadBalance 方法做负载均衡，选用一个可以调用的 Invoker
- 5.**经过一个一个过滤器链**，通常是处理上下文、限流、计数等。
- 6.会**使用 Client 做数据传输**
- 7.**私有化协议的构造**(Codec)
- 8.进行**序列化**
- 9.服务端收到这个 Request 请求，将其**分配到 ThreadPool**中进行处理
- 10.**Server 来处理这些 Request**
- 11.根据**请求查找对应的 Exporter**
- 12.之后**经过**一个服务提供者端的**过滤器链**
- 13.然后找到接口实现并**真正的调用**，将请求结果返回


## 4.说说 Dubbo 支持哪些协议，每种协议的应用场景和优缺点

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-msbgwzdubboq-1f4771de-fad0-410c-a764-c173146dd6d7.jpg)

- **1.dubbo** 单一长连接和 NIO 异步通讯，适合大并发小数据量的服务调用，以及消费者远大于提供者。传输协议 TCP，异步，Hessian 序列化
- **2.rmi** 采用 JDK 标准的 rmi 协议实现，传输参数和返回参数对象需要实现 Serializable 接口，使用 java 标准序列化机制，使用阻塞式短连接，传输数据包大小混合，消费者和提供者个数差不多，可传文件，传输协议 TCP。多个短连接，TCP 协议传输，同步传输，适用常规的远程服务调用和 rmi 互 操作。在依赖低版本的 Common-Collections 包，java 序列化存在安全漏洞
- **3.webservice** 基于 WebService 的远程调用协议，集成 CXF 实现，提供和原生 WebService 的互操作。多个短连接，基于 HTTP 传输，同步传输，适用系统集成和跨语言调用；
- **4.http** 基于 Http 表单提交的远程调用协议，使用 Spring 的 HttpInvoke 实 现。多个短连接，传输协议 HTTP，传入参数大小混合，提供者个数多于消 费者，需要给应用程序和浏览器 JS 调用
- **5.hessian** 集成 Hessian 服务，基于 HTTP 通讯，采用 Servlet 暴露服务，Dubbo 内嵌 Jetty 作为服务器时默认实现，提供与 Hession 服务互操作。多个短连接，同步 HTTP 传输，Hessian 序列化，传入参数较大，提供者大于消费者，提供者压力较大，可传文件；
- **6.memcache** 基于 memcached 实现的 RPC 协议
- **7.redis** 基于 redis 实现的 RPC 协议


## 5.Dubbo 中都用到哪些设计模式？

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-msbgwzdubboq-c33e9fa1-e1da-4701-ac97-3fb9d32d87d1.jpg)

### **责任链模式**:

责任链模式在 Dubbo 中发挥的作用举足轻重，就像是 Dubbo 框架的骨架。Dubbo 的调用链组织是用责任链模式串连起来的。责任链中的每个节点实现 Filter 接口，然后由 ProtocolFilterWrapper，将所有 Filter 串连起来。Dubbo 的许多功能都是通过 Filter 扩展实现的，比如监控、日志、缓存、安全、telnet 以及 RPC 本身都是。

### **观察者模式**:

Dubbo 中使用观察者模式最典型的例子是 RegistryService。消费者在初始化的时候回调用 subscribe 方法，注册一个观察者，如果观察者引用的服务地址列表发生改变，就会通过 NotifyListener 通知消费者。此外，Dubbo 的 InvokerListener、ExporterListener 也实现了观察者模式，只要实现该接口，并注册，就可以接收到 consumer 端调用 refer 和 provider 端调用 export 的通知。

### **修饰器模式**:

Dubbo 中还大量用到了修饰器模式。比如 ProtocolFilterWrapper 类是对 Protocol 类的修饰。在 export 和 refer 方法中，配合责任链模式，把 Filter 组装成责任链，实现对 Protocol 功能的修饰。其他还有 ProtocolListenerWrapper、 ListenerInvokerWrapper、InvokerWrapper 等。

### **工厂方法模式**:

CacheFactory 的实现采用的是工厂方法模式。CacheFactory 接口定义 getCache 方法，然后定义一个 AbstractCacheFactory 抽象类实现 CacheFactory，并将实际创建 cache 的 createCache 方法分离出来，并设置为抽象方法。这样具体 cache 的创建工作就留给具体的子类去完成。

### **抽象工厂模式**:

ProxyFactory 及其子类是 Dubbo 中使用抽象工厂模式的典型例子。ProxyFactory 提供两个方法，分别用来生产 Proxy 和 Invoker（这两个方法签名看起来有些矛盾，因为 getProxy 方法需要传入一个 Invoker 对象，而 getInvoker 方法需要传入一个 Proxy 对象，看起来会形成循环依赖，但其实两个方式使用的场景不一样）。AbstractProxyFactory 实现了 ProxyFactory 接口，作为具体实现类的抽象父类。然后定义了 JdkProxyFactory 和 JavassistProxyFactory 两个具体类，分别用来生产基于 jdk 代理机制和基于 javassist 代理机制的 Proxy 和 Invoker。

### **适配器模式**:

为了让用户根据自己的需求选择日志组件，Dubbo 自定义了自己的 Logger 接口，并为常见的日志组件（包括 jcl, jdk, log4j, slf4j）提供相应的适配器。并且利用简单工厂模式提供一个 LoggerFactory，客户可以创建抽象的 Dubbo 自定义 Logger，而无需关心实际使用的日志组件类型。在 LoggerFactory 初始化时，客户通过设置系统变量的方式选择自己所用的日志组件，这样提供了很大的灵活性。

### **代理模式**:

Dubbo consumer 使用 Proxy 类创建远程服务的本地代理，本地代理实现和远程服务一样的接口，并且屏蔽了网络通信的细节，使得用户在使用本地代理的时候，感觉和使用本地服务一样。


## 6.如果 Dubbo 中 provider 提供的服务由多个版本怎么办？

可以直接通过 Dubbo 配置中的 version 版本来控制多个版本即可。

比如：

```
<dubbo:service interface="com.xxxx.rent.service.IDemoService" ref="iDemoServiceFirst" version="1.0.0"/>
<dubbo:service interface="com.xxxx.rent.service.IDemoService" ref="iDemoServiceSecond" version="1.0.1"/>
```

老版本 version=1.0.0, 新版本 version=1.0.1



## 7.服务暴露的流程是怎么样的？

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-msbgwzdubboq-8203dc1c-927f-45d0-83fd-6a94e3283121.jpg)

1.通过 ServiceConfig 解析标签，创建 dubbo 标签解析器来**解析 dubbo 的标签**，容器创建完成之后，**触发 ContextRefreshEvent 事件回调开始暴露服务**

2.通过 proxyFactory.getInvoker 方法，并利用**javassist 或 DdkProxyFactory 来进行动态代理**，将服务暴露接口**封装成 invoke**r 对象，里面包含了需要执行的方法的对象信息和具体的 URL 地址。

3.再通过 DubboProtocol 的实现把包装后的**invoker 转换成 exporter**，

4.然后**启动服务器 server**，监听端口

5.最后 RegistryProtocol 保存 URL 地址和 invoker 的映射关系，同时**注册到服务中心**

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-msbgwzdubboq-4fa2fafb-1087-4fd7-b963-4a094eb1f3a9.jpg)


## 8.服务引用的流程是怎么样的？

1.首先客户端根据 config 文件信息从注册中心**订阅服务**，首次会全量**缓存到本地**，后续的更新会监听动态更新到本地。

2.之后 DubboProtocol**根据 provider**的地址和接口信息**连接到服务端**server，**开启客户端 clien**t，然后创建 invoker

3.之后通过 invoker 为服务接口**生成代理对象**，这个代理对象用于远程调用 provider，至此完成了服务引用

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-msbgwzdubboq-f42fb83d-478d-4305-9191-1e6e871409ea.jpg)


## 9.Dubbo 的注册中心有哪些？

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-msbgwzdubboq-0d76630a-d90b-4ecc-8727-8769ad80fa4e.jpg)

Zookeeper、Redis、Multicast、Simple 等都可以作为 Dubbo 的注册中心



## 10.聊聊 Dubbo SPI 机制？

SPI(Service Provider Interface)，是一种**服务发现机制**，其实就是将结构的实现类写入配置当中，在服务加载的时候将配置文件独处，加载实现类，这样就可以在运行的时候，**动态的帮助接口替换实现类**。

Dubbo 的 SPI 其实是对 java 的 SPI 进行了一种增强,可以按需加载实现类之外，增加了 IOC 和 AOP 的特性，还有**自适应扩展**机制。

SPI 在 dubbo 应用很多，包括协议扩展、集群扩展、路由扩展、序列化扩展等等。

Dubbo 对于文件目录的配置分为了**三类**。

- 1.META-INF/services/ 目录：该目录下的 SPI 配置文件是为了用来兼容 Java SPI 。

- 2.META-INF/dubbo/ 目录：该目录存放用户自定义的 SPI 配置文件。

```
key=com.xxx.xxx
```

- 3.META-INF/dubbo/internal/ 目录：该目录存放 Dubbo 内部使用的 SPI 配置文件。


## 11.Dubbo 的 SPi 和 Java 的 SPI 有什么区别？

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-msbgwzdubboq-9944f8d5-5a58-4896-8604-06b873fc7e3c.jpg)

**Java Spi**

- Java SPI 在查找扩展实现类的时候遍历 SPI 的配置文件并且将实现类**全部实例化**

**Dubbo Spi**

- 1，对 Dubbo 进行扩展，不需要改动 Dubbo 的源码
- 2，延迟加载，可以一次**只加载自己想要加载的**扩展实现。
- 3，增加了对扩展点 IOC 和 AOP 的支持，一个扩展点可以直接 setter 注入其它扩展点。
- 4，Dubbo 的扩展机制能很好的支持第三方 IoC 容器，默认支持 Spring Bean。



## 12.有哪些负载均衡策略？

**1.加权随机**：比如我们有三台服务器\[A, B, C\]，给他们设置权重为\[4, 5, 6\]，然后讲这三个数平铺在水平线上,和为 15。

然后在 15 以内生成一个随机数，0 ～ 4 是服务器 A，4 ～ 9 是服务器 B，9 ～ 15 是服务器 C

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-msbgwzdubboq-bd11d3ec-5d87-417e-bca0-70241e1fc065.jpg)

**2.最小活跃数**：每个服务提供者对应一个活跃数 active，初始情况下，所有服务提供者活跃数均为 0。每收到一个请求，活跃数加 1，完成请求后则将活跃数减 1。在服务运行一段时间后，性能好的服务提供者处理请求的速度更快，因此活跃数下降的也越快，此时这样的服务提供者能够优先获取到新的服务请求。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-msbgwzdubboq-9eb04922-b0c8-4f49-8839-902fc97cc2ed.jpg)

**3.一致性 hash**：

- 首先求出 memcached 服务器（节点）的哈希值，并将其配置到 0 ～ 2 的 32 次方的圆（continuum）上。
- 然后采用同样的方法求出存储数据的键的哈希值，并映射到相同的圆上。
- 然后从数据映射到的位置开始顺时针查找，将数据保存到找到的第一个服务器上。如果超过 2 的 32 次方仍然找不到服务器，就会保存到第一台 memcached 服务器上。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-msbgwzdubboq-be1ef6ba-f24d-4fd6-adc6-8b7cc086f66b.jpg)

**4.加权轮询**：比如我们有三台服务器\[A, B, C\]，给他们设置权重为\[4, 5, 6\]，那么假如总共有 15 次请求，那么会有 4 次落在 A 服务器，5 次落在 B 服务器，6 次落在 C 服务器。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-msbgwzdubboq-e9d2dd09-4d2a-4c43-8920-eac89c6341bc.jpg)


## 13.集群容错方式有哪些？

1.**Failover Cluster 失败自动切换**：dubbo 的默认容错方案，当调用失败时自动切换到其他可用的节点，具体的重试次数和间隔时间可用通过引用服务的时候配置，默认重试次数为 1 是只调用一次。

2.**Failback Cluster 失败自动恢复**：在调用失败，记录日志和调用信息，然后返回空结果给 consumer，并且通过定时任务每隔 5 秒对失败的调用进行重试

3.**Failfast Cluster 快速失败**：只会调用一次，失败后立刻抛出异常

4.**Failsafe Cluster 失败安全**：调用出现异常，记录日志不抛出，返回空结果

5.**Forking Cluster 并行调用多个服务提供者**：通过线程池创建多个线程，并发调用多个 provider，结果保存到阻塞队列，只要有一个 provider 成功返回了结果，就会立刻返回结果

6.**Broadcast Cluster 广播模式**：逐个调用每个 provider，如果其中一台报错，在循环调用结束后，抛出异常。

## 14.说说 Dubbo 的分层？

分层图：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-msbgwzdubboq-0c120220-d8be-4180-8694-3787446e1daa.jpg)

从大的范围来说，dubbo 分为三层

- **business**业务逻辑层由我们自己来提供接口和实现还有一些配置信息
- **RPC**层就是真正的 RPC 调用的核心层，封装整个 RPC 的调用过程、负载均衡、集群容错、代理
- **remoting**则是对网络传输协议和数据转换的封装。

Service 和 Config 两层可以认为是**API**层，主要提供给**API 使用者**，使用者只需要配置和完成业务代码就可以了。

后面所有的层级是**SPI**层，主 要提供给扩展者使用主要是用来做**Dubbo 的二次开发**扩展功能。

再划分到更细的层面，就是图中的 10 层模式。


## 15.服务提供者能实现失效踢出是什么原理？

服务失效踢出基于**Zookeeper 的临时节点**原理。

Zookeeper 中节点是有生命周期的，具体的生命周期取决于节点的类型，节点主要分为**持久节点**(Persistent)和**临时节点**(Ephemeral) 。


## 16.为什么要通过代理对象通信？？

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-msbgwzdubboq-40dc629c-e166-476f-9e03-883238e8ba25.jpg)

其实主要就是为了将调用细节封装起来，将调用远程方法变得和调用本地方法一样简单，还可以做一些其他方面的增强，比如负载均衡，容错机制，过滤操作，调用数据的统计。


## 17.怎么设计一个 RPC 框架？

关于这个问题，其实核心考察点就是你**对于 RPC 框架的理解**，一个成熟的 RPC 框架**可以完成哪些功能**，其实当我们看过一两个 RPC 框架后，就可以对这个问题回答个七七八八了，我们来举个例子。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-msbgwzdubboq-23df00fb-11aa-41a4-8bbe-e53bb1b65358.jpg)

1.首先我们得需要一个**注册中心**，去管理消费者和提供者的节点信息，这样才会有消费者和提供才可以去订阅服务，注册服务。

2.当有了注册中心后，可能会有很多个 provider 节点，那么我们肯定会有一个**负载均衡**模块来负责节点的调用，至于用户指定路由规则可以使一个额外的优化点。

3.具体的调用肯定会需要牵扯到通信协议，所以需要一个模块来对**通信协议进行封装**，网络传输还要考虑序列化。

4.当调用失败后怎么去处理？所以我们还需要一个**容错模块**，来负责失败情况的处理。

5.其实做完这些一个基础的模型就已经搭建好了，我们还可以有更多的优化点，比如一些请求**数据的监控，配置信息的处理，日志信息的处理**等等。

这其实就是一个比较基本的 RPC 框架的大体思路，大家有没有 get 到？



> 参考链接：[https://mp.weixin.qq.com/s?\_\_biz=MzkwODE5ODM0Ng==&mid=2247491592&idx=1&sn=454ae3d6a661a1eb63ffbad767ccb479&chksm=c0cf08adf7b881bbfd7d2a2ad150e7621756ccc06a6ffacd52833e7f4b84d5d01e16e5a6770f&scene=27#wechat_redirect](https://mp.weixin.qq.com/s?__biz=MzkwODE5ODM0Ng==&mid=2247491592&idx=1&sn=454ae3d6a661a1eb63ffbad767ccb479&chksm=c0cf08adf7b881bbfd7d2a2ad150e7621756ccc06a6ffacd52833e7f4b84d5d01e16e5a6770f&scene=27#wechat_redirect)，作者：moon聊技术，整理：沉默王二

---------

GitHub 上标星 7600+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 7600+ 的 Java 教程](https://tobebetterjavaer.com/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)