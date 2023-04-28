---
title: 为什么有了HTTP还要有RPC？
shortTitle: 为什么有了HTTP还要有RPC？
description: 大家好，我是黎杜，今天我们就来聊一聊为什么在我们的分布式和微服务系统中，有HTTP还要有RCP呢？这两者又有
author: 非科班的科班
category:
  - 微信公众号
---

大家好，我是二哥，今天我们就来聊一聊为什么在分布式和微服务系统中，有 HTTP 还要有 RCP，这两者又有什么区别？在面试中也会经常问到，而且会结合着项目来问。比如说，问你项目中用的是哪种通信技术方案？

在计算机科学领域，HTTP 和 RPC 都是常用的协议。HTTP 协议是一种基于请求和响应模式的协议，用于在 Web 上进行数据传输。而 RPC 协议则是远程过程调用协议，它允许一个程序在另一个计算机上执行函数。

虽然 HTTP 和 RPC 都可以实现跨进程通信，但它们各自的特点使它们适用于不同的场景。本文将探讨为什么在一些场景下需要使用 RPC，即使 HTTP 也可以实现同样的功能。

### HTTP 的优点和适用场景

HTTP 是一种简单、灵活、可扩展的协议，用于在 Web 上进行数据传输。它的主要优点如下：

1.  易于使用和实现：HTTP 是一种轻量级协议，易于使用和实现。它只需要传输文本数据，不需要复杂的数据序列化和反序列化过程。
2.  可扩展性：HTTP 的头部信息可以自由添加，使得它具有很高的可扩展性。通过在请求头部添加自定义的头部信息，可以实现很多功能，如身份验证、缓存控制等。
3.  适用于 Web 应用程序：HTTP 是 Web 应用程序的基础协议，它可以用于在客户端和服务器之间传输 HTML、CSS、JavaScript 等资源文件，也可以用于传输 JSON、XML 等数据格式。
4.  跨平台支持：HTTP 可以在不同的操作系统、编程语言和硬件平台之间进行通信，实现跨平台支持。

### HTTP 的适用场景主要包括：

1.  Web 应用程序：HTTP 是 Web 应用程序的基础协议，用于在客户端和服务器之间传输数据。
2.  静态资源传输：HTTP 可以用于传输静态资源文件，如 HTML、CSS、JavaScript 等。
3.  RESTful API：HTTP 可以用于实现 RESTful API，通过 GET、POST、PUT、DELETE 等 HTTP 方法对资源进行增删改查操作。

上面我们聊了 HTTP 的优点和缺点以及使用场景，那么在 Java 中实现 HTTP 调用的方式有哪些呢？

### 在 Java 中以及微服务中实现 HTTP 的方式

在 Java 中实现 HTTP 的方式有很多种，包括使用 Java 内置的 API、第三方库、框架等。下面是一些常见的方式：

#### Java 内置 API

Java 内置了一些用于实现 HTTP 的 API，包括**URLConnection、HttpURLConnection、HttpClient**等。其中最常用的是**HttpURLConnection**，可以通过该类来创建一个 HTTP 连接并发送 HTTP 请求，示例代码如下：

```
URL url = new URL("https://paicoding.com");
HttpURLConnection conn = (HttpURLConnection) url.openConnection();
conn.setRequestMethod("GET");
conn.setRequestProperty("User-Agent", "Java/1.8");
int responseCode = conn.getResponseCode();
```

上述代码中，首先创建了一个 URL 对象，然后使用该对象打开一个 HTTP 连接。接着设置请求方法为 GET，并设置一些请求头信息，最后通过 getResponseCode 方法获取响应码。

#### Apache HttpClient

Apache HttpClient 是一个非常流行的第三方 HTTP 客户端库，可以用来发送 HTTP 请求、接收响应、处理 Cookie 等。使用 HttpClient 发送 HTTP 请求的示例代码如下：

```
CloseableHttpClient httpClient = HttpClients.createDefault();
HttpGet httpGet = new HttpGet("https://paicoding.com");
HttpResponse response = httpClient.execute(httpGet);
int statusCode = response.getStatusLine().getStatusCode();
```

上述代码中，首先创建了一个 HttpClient 对象，然后创建一个 HttpGet 对象并设置请求 URL，最后使用 execute 方法发送请求并获取响应。可以通过 response 对象获取响应内容、响应头信息、状态码等。

#### Spring Framework

Spring Framework 也包含了一些用于实现 HTTP 的 API，包括 RestTemplate、WebClient 等。使用 RestTemplate 发送 HTTP 请求的示例代码如下：

```
RestTemplate restTemplate = new RestTemplate();
ResponseEntity<String> response = restTemplate.getForEntity("https://paicoding.com", String.class);
int statusCode = response.getStatusCodeValue();
```

上述代码中，首先创建了一个 RestTemplate 对象，然后使用 getForEntity 方法发送 GET 请求并获取响应。可以通过 response 对象获取响应内容、响应头信息、状态码等。

这些都是 Java 中实现 HTTP 的调用方式，那么在微服务框架中实现 HTTP 通信的方式有哪些呢？在微服务架构中，服务之间需要进行通信，而 HTTP 是其中最常用的一种通信协议。实现微服务中的 HTTP 调用有以下几种方式：

#### 使用 HTTP 客户端库

微服务架构中，一般会有多个服务相互调用。调用方可以使用 HTTP 客户端库，如**Apache HttpClient、OkHttp、Spring RestTemplate**等，来发送 HTTP 请求到被调用方。这种方式需要调用方自己实现 HTTP 请求的构造和解析，同时需要考虑一些高可用、负载均衡、重试等问题。一些 HTTP 客户端库提供了这些功能的支持，如 Ribbon、Feign 等。

Ribbon 和 Feign 是两种常见的用于实现 HTTP 调用的组件。它们都是 Netflix 开源的组件，提供了负载均衡、服务发现、HTTP 客户端等功能，可以方便地实现微服务之间的通信。下面分别介绍一下它们的原理：

- **Ribbon**

Ribbon 是一个基于 HTTP 和 TCP 的客户端负载均衡器，可以将请求分发到多个服务实例中。Ribbon 工作的原理如下：

1.  客户端向服务发现组件（如 Eureka）查询服务实例列表。
2.  Ribbon 从服务实例列表中选择一个实例作为目标，可以使用一些负载均衡算法来选择目标实例。
3.  客户端向目标实例发送 HTTP 请求。

Ribbon 提供了多种负载均衡算法，如轮询、随机、加权轮询等。可以通过配置文件来指定使用哪种算法。此外，Ribbon 还提供了一些重试和超时机制，可以增强系统的健壮性。使用 Ribbon 实现 HTTP 调用。

```
// 引入依赖
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-ribbon</artifactId>
</dependency>
```

```java
// 创建RestTemplate Bean
@Bean
@LoadBalanced
public RestTemplate restTemplate() {
    return new RestTemplate();
}

// 使用RestTemplate发送HTTP请求
@Autowired
private RestTemplate restTemplate;

public void callService() {
    String url = "http://service-provider/hello";
    String result = restTemplate.getForObject(url, String.class);
    System.out.println(result);
}
```

在上面的示例中，我们使用了 Spring Cloud Ribbon 提供的负载均衡 RestTemplate 来发送 HTTP 请求。通过@LoadBalanced 注解，我们可以让 RestTemplate 具备负载均衡的能力。在调用服务时，我们通过服务名（service-provider）来访问服务，而不是直接使用 IP 地址和端口。



- **Feign**

Feign 是一个声明式的 HTTP 客户端，可以通过接口定义来实现 HTTP 调用。Feign 的工作原理如下：

1.  客户端定义一个接口，并使用注解来描述接口的 HTTP 请求参数、路径、请求方法等信息。
2.  Feign 根据接口定义生成代理对象。
3.  客户端调用代理对象的方法，Feign 根据注解的信息构造 HTTP 请求，发送请求到服务提供方。
4.  服务提供方返回响应，Feign 将响应解析成指定类型的对象，返回给客户端。

Feign 提供了很多注解来描述 HTTP 请求，如 **@FeignClient、@GetMapping、@PostMapping** 等。通过这些注解，客户端可以方便地定义 HTTP 请求，无需手动构造 HTTP 请求。此外，Feign 还提供了一些高级功能，如 Hystrix 断路器、请求压缩等，可以提高系统的可靠性和性能。使用 Feign 实现 HTTP 调用。

```
// 引入依赖
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```

```java
// 创建Feign客户端
@FeignClient(name = "service-provider")
public interface HelloClient {
    @GetMapping("/hello")
    String hello();
}

// 调用Feign客户端
@Autowired
private HelloClient helloClient;

public void callService() {
    String result = helloClient.hello();
    System.out.println(result);
}
```

在上面的示例中，我们使用了 Spring Cloud OpenFeign 提供的声明式 HTTP 客户端。通过@FeignClient 注解，我们可以定义一个 HTTP 客户端接口，并指定服务名（service-provider）。Feign 会根据接口定义自动生成 HTTP 请求，我们只需要调用接口方法即可。

#### 使用服务网关

服务网关是微服务架构中的一种常见组件，它位于服务调用方和服务提供方之间，用于转发请求、实现负载均衡、安全认证、流量控制等功能。服务网关可以处理多种协议，如 HTTP、WebSocket 等。通过服务网关，调用方可以将请求发送到服务网关，由服务网关来转发请求到被调用方。一些常见的服务网关包括 Zuul、Spring Cloud Gateway 等。

#### 使用服务发现

服务发现是微服务架构中的一种重要组件，用于实现服务的注册和发现。服务提供方将自己的服务注册到服务发现组件中，调用方可以通过服务发现组件来获取服务提供方的地址，从而发起 HTTP 请求。一些常见的服务发现组件包括 Eureka、Consul 等。服务发现组件可以与服务网关配合使用，从而实现更好的负载均衡和高可用性。

### RPC 的优点和适用场景

RPC 是一种远程过程调用协议，它允许一个程序在另一个计算机上执行函数。与 HTTP 相比，RPC 具有以下优点：

1.  更高的性能：RPC 协议通常使用二进制协议进行数据传输，相对于 HTTP 的文本协议，具有更高的性能。此外，RPC 协议通常使用连接池等技术来减少连接建立和断开的开销，提高性能。
2.  更严格的类型检查：RPC 协议通常使用 IDL（Interface Definition Language）来定义接口，可以进行更严格的类型检查。这有助于提高代码的可靠性和可维护性。
3.  更好的语义：RPC 协议通常使用方法调用的语义，更符合面向对象编程的思想。相对于 HTTP 的请求和响应模式，更易于理解和使用。
4.  更安全的传输：RPC 协议通常使用 TLS 等加密协议来保证数据传输的安全性。

### RPC 的适用场景主要包括：

1.  微服务架构：RPC 协议可以用于微服务架构中的服务间通信，通过 RPC 调用其他服务的接口实现功能。
2.  分布式系统：RPC 协议可以用于分布式系统中，通过 RPC 调用其他节点上的函数实现分布式计算。
3.  高并发场景：RPC 协议通常使用连接池等技术来提高性能，适用于高并发场景。
4.  多语言环境：RPC 协议可以用于不同编程语言之间的通信，实现跨语言调用。

那么实现 RPC 的方式又有哪些呢？实现 RPC 的方式有以下几种：

1.  **基于 Socket 实现 RPC**：Socket 是一种基于 TCP/IP 协议的网络通信方式，可以实现两个节点之间的双向通信。基于 Socket 实现 RPC 需要定义一套自己的协议，包括请求格式、响应格式、序列化方式、错误处理方式等。这种方式需要手动编写网络通信代码，实现起来比较复杂，但是可以掌握 RPC 底层的实现细节，可以更好地理解 RPC 协议的原理。
2.  **使用 HTTP 实现 RPC**：HTTP 是一种基于 TCP/IP 协议的应用层协议，可以实现客户端和服务器之间的通信。使用 HTTP 实现 RPC 需要定义一套标准的 RPC 协议，如 XML-RPC、JSON-RPC、SOAP 等。这种方式相对于基于 Socket 实现 RPC，更容易使用，因为 HTTP 是一个广泛使用的标准协议，支持各种编程语言和平台。
3.  **使用框架实现 RPC**：为了方便用户使用 RPC，一些框架提供了 RPC 的实现，如 Apache Thrift、gRPC、Dubbo 等。这些框架通常提供了丰富的功能，如服务注册与发现、负载均衡、容错机制、序列化协议等。使用框架实现 RPC 可以快速搭建分布式系统，减少开发成本和维护成本。
4.  **使用消息队列实现 RPC**：消息队列是一种异步的通信方式，可以在不同节点之间传递消息。使用消息队列实现 RPC 需要定义一套标准的消息格式，并指定消息队列作为传输通道。这种方式相对于其他方式来说，更加灵活，可以支持异步调用和消息传递。

Apache Thrift 也是我们实现内部通信的一种方式，还有 Protobuf，不知道大家听说过这两种协议没有。下面我们来聊一聊 Apache Thrift 和 Protobuf

Apache Thrift 是一种高性能、跨语言的 RPC 框架，由 Facebook 开源。它支持多种编程语言，包括 C++、Java、Python、PHP、Ruby 等，可以实现不同语言之间的通信。下面是 Apache Thrift 的详细介绍：

**优点**：

1.  跨语言支持：Apache Thrift 支持多种编程语言，可以实现不同语言之间的通信。这对于分布式系统来说非常重要，因为不同节点之间可能运行着不同的编程语言。
2.  高性能：Apache Thrift 采用二进制协议和高效的序列化算法，可以实现高效的数据传输。同时，它支持异步 IO 和连接池等特性，可以提高系统的并发性能。
3.  灵活性：Apache Thrift 提供了丰富的配置选项，可以灵活地配置协议、传输方式、序列化方式等。这使得它可以适应不同的业务需求和网络环境。
4.  可扩展性：Apache Thrift 支持服务接口的版本管理和升级，可以方便地进行系统的升级和扩展。

**缺点**：

1.  学习成本高：Apache Thrift 的学习成本相对较高，需要掌握 IDL 语言、代码生成等技术。
2.  部署和维护成本高：由于 Apache Thrift 支持多种编程语言，因此在部署和维护时需要考虑多种语言的环境和依赖。
3.  不支持动态扩容：Apache Thrift 不支持动态扩容，需要手动配置和部署新的节点。

**性能**：

Apache Thrift 的性能非常高，可以实现每秒数十万次甚至数百万次的调用。这主要得益于它采用的二进制协议和高效的序列化算法，同时支持异步 IO 和连接池等特性，可以提高系统的并发性能。

总体来说，Apache Thrift 是一种高性能、跨语言的 RPC 框架，适用于分布式系统中不同节点之间的通信。它的优点包括跨语言支持、高性能、灵活性和可扩展性，但也存在学习成本高、部署和维护成本高等缺点。

Apache Thrift 代码实现 demo 入门：以下是使用 Apache Thrift 实现 RPC 的代码实现示例。 

（1）**编写 Thrift 定义文件**

首先需要编写 Thrift 定义文件，定义服务接口和数据类型。例如，我们可以定义一个 HelloWorld 服务，包括一个接口和一个数据类型：

```
namespace java com.example
namespace py example

struct HelloMessage {
    1: required string name
}

service HelloWorldService {
    string sayHello(1: HelloMessage message)
}
```

（2）**生成代码文件**

使用 Thrift 提供的命令行工具生成代码文件。例如，使用以下命令生成 Java 代码文件：

```
thrift -gen java HelloWorld.thrift
```

这将生成 Java 代码文件，包括 Java 接口文件和数据类型文件。

（3）**编写服务端代码**

在服务端代码中，我们需要实现服务接口，并启动 Thrift 服务器，等待客户端的请求。例如，我们可以实现一个 HelloWorldServiceImpl 类，实现 sayHello 方法：

```java
public class HelloWorldServiceImpl implements HelloWorldService.Iface {
    @Override
    public String sayHello(HelloMessage message) throws TException {
        return "Hello, " + message.getName() + "!";
    }
}

public class HelloWorldServer {
    public static void main(String[] args) throws Exception {
        TServerTransport transport = new TServerSocket(9090);
        TProcessor processor = new HelloWorldService.Processor<>(new HelloWorldServiceImpl());
        TServer server = new TThreadPoolServer(new TThreadPoolServer.Args(transport).processor(processor));
        server.serve();
    }
}
```

在这个示例中，我们使用 TThreadPoolServer 作为 Thrift 服务器，并将其绑定到 9090 端口。

（4）**编写客户端代码**

在客户端代码中，我们需要建立与 Thrift 服务器的连接，并调用服务接口。例如，我们可以实现一个 HelloWorldClient 类，调用 sayHello 方法：

```java
public class HelloWorldClient {
    public static void main(String[] args) throws Exception {
        TTransport transport = new TSocket("localhost", 9090);
        transport.open();
        TProtocol protocol = new TBinaryProtocol(transport);
        HelloWorldService.Client client = new HelloWorldService.Client(protocol);
        HelloMessage message = new HelloMessage("world");
        String result = client.sayHello(message);
        System.out.println(result);
        transport.close();
    }
}
```

在这个示例中，我们使用 TSocket 建立与 Thrift 服务器的连接，并使用 TBinaryProtocol 作为传输协议和序列化协议。

Protobuf 的方式和 Thrift 有点类似，它也是一种轻量级的、高效的数据序列化协议，由 Google 开发并开源。它可以用于数据存储、通信协议、RPC 等方面，支持多种编程语言，包括 C++、Java、Python、Go 等。

protobuf 使用二进制格式进行数据序列化，相比于 XML 和 JSON 等文本格式，它具有更小的数据体积和更快的编解码速度。同时，protobuf 也支持多版本兼容和数据格式升级，可以方便地进行系统升级和扩展。protobuf 的定义文件使用类似于 IDL 的语言进行定义，可以定义数据类型和消息格式。

（1） **数据类型**

protobuf 支持以下几种基本数据类型：

- 数值类型：包括 int32、int64、uint32、uint64、sint32、sint64、fixed32、fixed64、sfixed32、sfixed64、float 和 double。
- 布尔类型：bool 类型。
- 字符串类型：string 类型。
- 字节类型：bytes 类型。
- 枚举类型：enum 类型。
- 子消息类型：message 类型，可以嵌套定义。

（2） **消息格式**

在 protobuf 中，消息由多个字段组成，可以定义不同类型的字段，包括基本数据类型、枚举类型和子消息类型等。每个字段可以指定一个唯一的标识符，用于在消息进行编码和解码时进行识别。消息格式示例如下：

```
syntax = "proto3";

message Person {
  string name = 1;
  int32 age = 2;
  repeated string email = 3;
}
```

在这个示例中，定义了一个 Person 消息，包含 name、age 和 email 三个字段。其中 name 和 age 为基本数据类型，email 为字符串类型，并使用 repeated 关键字表示可以出现多次。

（3）**定义文件**

protobuf 使用定义文件来定义数据类型和消息格式。定义文件使用.proto 文件扩展名，并使用 protobuf 语言进行定义。protobuf 语言类似于 IDL（接口定义语言），可以定义数据类型和消息格式，并支持注释、包含等功能。

定义文件示例如下：

```
syntax = "proto3";

package tutorial;

message Person {
  string name = 1;
  int32 age = 2;
  repeated string email = 3;
}
```

在这个示例中，定义了一个名为 tutorial 的包，其中包含一个 Person 消息。

（4）**编码和解码**

protobuf 使用二进制格式进行数据序列化和反序列化。在编码时，protobuf 按照定义文件中指定的消息格式对消息进行编码，生成二进制数据。在解码时，protobuf 按照定义文件中指定的消息格式对二进制数据进行解码，生成消息对象。

- **编码**：

protobuf 的编码过程包括以下几个步骤：

- 定义消息结构：使用 protobuf 语言定义消息结构，包括消息名称、字段名称、字段类型、字段标识符等信息。
- 创建消息对象：根据消息结构创建消息对象，使用消息结构中定义的字段名称和字段类型创建对应的字段对象。
- 序列化消息对象：将消息对象序列化为二进制格式，按照字段标识符的顺序将字段值写入二进制流中。对于可选字段和默认值，只有在字段有值的情况下才会写入二进制流中。
- 发送消息：将序列化后的二进制数据发送给接收方。

在编码过程中，关键是将消息对象序列化为二进制格式，这是通过将每个字段的标识符和值按照一定的规则打包为二进制数据实现的。具体来说，protobuf 使用了一种“变长编码”的方法对字段值进行编码，可以有效地节省数据空间。

- **解码**

protobuf 的解码过程包括以下几个步骤：

- 接收消息：从网络中接收到二进制数据。
- 反序列化消息对象：将二进制数据反序列化为消息对象。首先读取消息的标识符，根据标识符查找消息结构中对应的字段类型和名称，并根据字段类型读取对应的值。对于可选字段和默认值，如果在二进制流中没有读取到对应的值，则使用默认值。
- 处理消息：根据消息对象的值进行后续处理。

在解码过程中，关键是将二进制数据反序列化为消息对象，这是通过按照一定的规则从二进制数据中读取字段标识符和值实现的。具体来说，protobuf 使用了“变长编码”的方法对字段值进行解码，可以有效地提高解码速度和节省数据空间。

protobuf 的编码和解码实现方式都是基于二进制数据的序列化和反序列化实现的，其中编码使用了“变长编码”的方法对数据进行压缩，解码使用了按照规则读取二进制数据的方法对数据进行解析。这种实现方式可以有效地提高性能和节省数据空间。

protobuf 提供了多种编程语言的 API，可以方便地进行编码和解码操作。在 C++中，可以使用 protobuf 提供的编解码函数，如 SerializeToString()和 ParseFromString()等。在 Java 中，可以使用 protobuf 提供的 MessageLite 接口进行编解码操作。

（5）**protobuf 的主要特点包括**：

1.  **高效性**：protobuf 采用二进制格式进行数据序列化，数据体积小，编解码速度快。
2.  **可扩展性**：protobuf 支持多版本兼容和数据格式升级，可以方便地进行系统升级和扩展。
3.  **跨语言支持**：protobuf 支持多种编程语言，可以实现不同语言之间的通信。
4.  **可读性差**：protobuf 采用二进制格式，不如 XML 和 JSON 等文本格式具有可读性，特别是生成的代码，感觉不是给人读的，一大坨，看着贼恶心，其实生成的代码，也不用看，只要看它定义的结构文件即可。

### 为什么在一些场景下需要使用 RPC

在一些场景下，虽然 HTTP 已经可以实现同样的功能，但是 RPC 仍然更加适合。以下是一些场景的解释。

- **微服务架构**

在微服务架构中，每个服务都是一个独立的进程，服务之间需要通过网络进行通信。由于微服务架构中服务数量较多，服务之间的通信量也会很大。如果使用 HTTP 协议，每次请求都需要建立和断开连接，这会造成很大的性能开销。而 RPC 协议可以使用连接池等技术来减少连接建立和断开的开销，提高性能。此外，RPC 协议通常使用二进制协议进行数据传输，相对于 HTTP 的文本协议，具有更高的性能。

- **分布式系统**

在分布式系统中，节点之间需要进行函数调用来实现分布式计算。如果使用 HTTP 协议，每次请求都需要建立和断开连接，这会造成很大的性能开销。而 RPC 协议可以使用连接池等技术来减少连接建立和断开的开销，提高性能。此外，RPC 协议通常使用方法调用的语义，更符合面向对象编程的思想。

- **高并发场景**

在高并发场景中，每秒钟可能有成千上万的请求需要处理。如果使用 HTTP 协议，每次请求都需要建立和断开连接，这会造成很大的性能开销。而 RPC 协议可以使用连接池等技术来提高性能，适用于高并发场景。

- **多语言环境**

在多语言环境中，不同的编程语言需要进行通信。如果使用 HTTP 协议，需要使用通用的数据格式，如 JSON、XML 等，这会造成很大的性能开销。而 RPC 协议可以使用自定义的 IDL 来定义接口，实现更严格的类型检查和更好的语义。

在 HTTP 和 RPC 发展的过程中 HTTP 也在不断的完善和加强性能，比如从之前的 HTTP0.9 到现在的 HTTP3：

1.  HTTP/0.9：HTTP/0.9 是最早的版本，于 1991 年问世。它只支持一种请求方法 GET，且没有请求头和响应头，只有一个简单的消息体，用于传输 HTML 文本。由于它的限制较多，因此在现代网络应用中已经很少使用。
2.  HTTP/1.0：HTTP/1.0 于 1996 年发布，是 HTTP 的第一个正式版本。它支持多种请求方法，包括 GET、POST、HEAD 等，同时引入了请求头和响应头，可以传输多种类型的数据，包括文本、图片、音频、视频等。HTTP/1.0 的主要缺点是每次请求都需要建立一次 TCP 连接，会导致网络延迟和资源浪费。
3.  HTTP/1.1：HTTP/1.1 于 1999 年发布，是 HTTP 的主流版本。它引入了持久连接、管线化、分块传输编码等多种优化技术，可以提高网络传输效率和性能。此外，HTTP/1.1 还引入了缓存机制、虚拟主机等多种功能，可以更好地满足现代网络应用的需求。
4.  HTTP/2：HTTP/2 于 2015 年发布，是 HTTP 的重大更新版本。它采用二进制协议格式，支持多路复用、头部压缩、流控制等多种优化技术，可以更快地传输数据，并且减少资源浪费和网络延迟。HTTP/2 还支持服务器推送、流优先级等功能，可以更好地满足现代网络应用的需求。
5.  HTTP/3：HTTP/3 是最新的版本，于 2020 年发布。它基于 QUIC 协议，采用了 UDP 作为传输协议，支持零 RTT 连接、实时数据传输、可靠性传输等多种优化技术，可以更快地传输数据，并且减少网络延迟和资源浪费。HTTP/3 还支持多路复用、头部压缩、服务器推送等功能，是 HTTP 的一个重要进化。

HTTP 经历了多个版本的发展，从 HTTP/0.9 到 HTTP/3，不断引入新的优化技术和功能，以适应不断变化的网络应用需求。开发者应根据具体的业务需求和场景选择合适的 HTTP 版本。

本文探讨了 HTTP 和 RPC 的优点和适用场景，并分析了在一些场景下为什么需要使用 RPC。虽然 HTTP 已经可以实现同样的功能，但是在微服务架构、分布式系统、高并发场景和多语言环境等场景下，RPC 更加适合。因此，在选择通信协议时，应该根据实际场景和需求选择合适的协议。

> 参考链接：[https://mp.weixin.qq.com/s/vDYePLV4P2bsJJVMR1na9g](https://mp.weixin.qq.com/s/vDYePLV4P2bsJJVMR1na9g)，出处：黎杜，整理：沉默王二
