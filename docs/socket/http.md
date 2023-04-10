---
title: 牛逼，用Java Socket手撸了一个HTTP服务器
shortTitle: 用Socket实现一个HTTP服务器
description: 本文详细讲解了如何使用Java Socket编程技术手动构建一个HTTP服务器。从服务器的基本概念开始，逐步深入到具体的实现方法，以及服务器与客户端的交互过程。通过本文，您将学会使用Java Socket编程技巧，手撸一个简易的HTTP服务器，并掌握网络编程的核心技术。
category:
  - Java核心
tag:
  - Java网络编程
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java进阶之路,Java入门,教程,JavaSocket,java网络编程,网络编程,http,socket http,http 服务器,java 服务器,HTTP服务器
---

# 11.3 用Socket实现一个HTTP服务器

作为一个 Java 后端，提供 HTTP 服务可以说是基本技能之一了，但是你真的了解 HTTP 协议么？你知道知道如何手撸一个 HTTP 服务器么？Tomcat 的底层是怎么支持 HTTP 服务的呢？大名鼎鼎的 Servlet 又是什么东西呢，该怎么使用呢？

在初学 Java 时，Socket 编程是逃不掉的一章；虽然在实际业务项目中，使用这个的可能性基本为 0， 但并不意味着不用学。本篇将主要介绍如何使用 Socket 来实现一个简单的 HTTP 服务器，提供常见的 get/post 请求支持，并在此过程中了解下 HTTP 协议。

### I. HTTP 服务器从 0 到 1

既然我们的目标是借助 Socket 来搭建 HTTP 服务器，那么我们首先需要确认两点，一是如何使用 Socket；另一个则是 HTTP 协议如何解析数据；下面分别进行说明。

#### 1\. Socket 编程基础

我们这里主要是利用 [ServerSocket](https://tobebetterjavaer.com/socket/socket.html) 来绑定端口，提供 TCP 服务，基本使用姿势也比较简单，一般套路如下

- 创建 ServerSocket 对象，绑定监听端口
- 通过 `accept()` 方法监听客户端请求
- 连接建立后，通过输入流读取客户端发送的请求信息
- 通过输出流向客户端发送响应信息
- 关闭相关资源

对应的伪代码如下:

```java
ServerSocket serverSocket = new ServerSocket(port, ip)
serverSocket.accept();
// 接收请求数据
socket.getInputStream();

// 返回数据给请求方
out = socket.getOutputStream()
out.print(xxx)
out.flush();;

// 关闭连接
socket.close()
```

具体的代码，我们前面的章节详细地讲过了，第一次来的小伙伴可以[戳链接](https://tobebetterjavaer.com/socket/socket.html)去学习一下。

#### 2\. HTTP 协议

ServerSocket 走的是 [TCP 协议](https://tobebetterjavaer.com/socket/network-base.html)，HTTP 协议本身是在 TCP 协议之上的一层。

TCP 是一种面向连接的、可靠的、基于字节流的传输层协议。TCP 在两个网络节点之间提供了一条可靠的通信信道，确保数据在传输过程中不会丢失、重复或乱序。TCP 使用握手过程建立连接，通过确认和重传机制确保数据可靠传输，并使用流量控制和拥塞控制算法来优化网络性能。

HTTP 是一个用于在 Web 浏览器和 Web 服务器之间传输超文本、图像、视频和其他媒体资源的应用层协议。HTTP 使用请求-响应模型，即客户端（通常是 Web 浏览器）发送请求给服务器，服务器处理请求并返回响应。HTTP 协议定义了一组方法（如 GET、POST、PUT、DELETE 等），用于指定请求的类型和目的。此外，HTTP 协议还定义了一组状态代码（如 200、404、500 等），用于表示响应的结果。

HTTP 协议依赖于 TCP 协议来传输数据。当 Web 浏览器向 Web 服务器发送 HTTP 请求时，它首先使用 TCP 协议与服务器建立连接。一旦连接建立，HTTP 请求消息会被封装在 TCP 数据包中，然后通过 TCP 信道发送给服务器。服务器收到 TCP 数据包后，解包提取 HTTP 请求消息，处理请求并生成 HTTP 响应消息。最后，HTTP 响应消息被封装在 TCP 数据包中，并通过相同的 TCP 信道发送回客户端。客户端收到 TCP 数据包后，解包提取 HTTP 响应消息并显示给用户。

![](https://cdn.tobebetterjavaer.com/stutymore/http-20230331112928.png)

这幅图展示了客户端（Web 浏览器）与服务器（Web 服务器）之间的 HTTP 请求和响应，它们通过可靠的、面向连接的 TCP 连接进行数据传输。

好，再说回 HTTP 服务器这件事，最需要关注的无非两点：

- 请求的数据怎么按照 HTTP 协议解析出来
- 如何按照 HTTP 协议，返回数据

所以我们需要知道数据格式的规范。

**请求消息**

HTTP 请求消息由请求行（Request Line）、请求头（Request Headers）、空行（Empty Line）、请求体（Request Body，可选）几个部分组成。

①、请求行又包含三个部分，HTTP 方法（例如 GET, POST, PUT, DELETE 等）、请求的目标 URL（通常是相对 URL，但也可以是绝对 URL）、HTTP 版本（例如 HTTP/1.1 或 HTTP/2），这些部分用空格分隔，例如：

```
GET /index.html HTTP/1.1
```

②、请求头是一系列以键值对表示的元数据，用于描述请求的附加信息。每个请求头占一行，键和值之间用冒号（:）分隔。请求头包含诸如 Host、User-Agent、Content-Type、Content-Length、Accept 等信息。例如：

```
Host: www.tobebetterjavaer.com
User-Agent: Mozilla/5.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
```

③、请求头和请求体之间有一个空行，表示请求头的结束。

④、对于某些 HTTP 方法（例如 POST、PUT 等），还可以在请求消息中包含请求体。请求体用于传输要发送给服务器的数据。请求体的格式和内容取决于 Content-Type 请求头的值。

例如，当提交 HTML 表单时，请求体可能如下所示：

```
username=沉默王二&password=123456
```

将这些部分放在一起，就构成了一个完整的 HTTP 请求消息：

```
POST /login HTTP/1.1
Host: Host: www.tobebetterjavaer.com
User-Agent: Mozilla/5.0
Content-Type: application/x-www-form-urlencoded
Content-Length: 29
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8

username=沉默王二&password=123456
```

我用一张思维导图来表示下：

![](https://cdn.tobebetterjavaer.com/stutymore/http-20230331114404.png)

**响应消息**

一个典型的 HTTP 响应消息由三部分组成：状态行（Status Line）、响应头（Response Headers）、响应体（Response Body）。

![](https://cdn.tobebetterjavaer.com/stutymore/http-20230331120336.png)

上面两张图，可以让你对 HTTP 请求和响应有个直观映象，接下来开始抓重点。

不管是请求消息还是响应消息，都可以划分为三部分，这就为我们后面的处理简化了很多工作。

- 第一行：状态行
- 第二行到第一个空行：header（请求头/相应头）
- 剩下所有：正文

#### 3\. HTTP 服务器设计

接下来进入正题，基于 Socket 创建一个 HTTP 服务器，使用 Socket 基本没啥太大的问题，我们需要额外关注以下两点：

- 对请求数据进行解析
- 封装返回结果

##### a. 请求数据解析

我们从 Socket 中拿到所有的数据，然后解析为对应的 HTTP 请求，我们先定义个 Request 对象，内部保存一些基本的 HTTP 信息，接下来重点就是将 Socket 中的所有数据都捞出来，封装为 request 对象。

>注意📢，这些代码放在 HttpMessageParser 类中，随后会给出完整的代码。

```java
@Data
public static class Request {
    /**
     * 请求方法 GET/POST/PUT/DELETE/OPTION...
     */
    private String method;
    /**
     * 请求的uri
     */
    private String uri;
    /**
     * HTTP版本
     */
    private String version;

    /**
     * 请求头
     */
    private Map<String, String> headers;

    /**
     * 请求参数相关
     */
    private String message;
}
```

根据前面的 HTTP 协议介绍，解析过程如下，我们先看请求行的解析过程。

**请求行**，包含三个基本要素：请求方法 + URI + HTTP 版本，用空格进行分割，所以解析代码如下

```java
/**
 * 根据标准的HTTP协议，解析请求行
 *
 * @param reader
 * @param request
 */
private static void decodeRequestLine(BufferedReader reader, Request request) throws IOException {
    String[] strs = StringUtils.split(reader.readLine(), " ");
    assert strs.length == 3;
    request.setMethod(strs[0]);
    request.setUri(strs[1]);
    request.setVersion(strs[2]);
}
```

**请求头的解析**，从第二行，到第一个空白行之间的所有数据，都是请求头；请求头的格式也比较清晰，形如 `key:value`, 具体实现如下：

```java
/**
    * 根据标准 HTTP 协议，解析请求头
    *
    * @param reader  读取请求头的 BufferedReader 对象
    * @param request 存储请求信息的 Request 对象
    * @throws IOException 当读取请求头信息时发生 I/O 异常时，将抛出该异常
    */
private static void decodeRequestHeader(BufferedReader reader, Request request) throws IOException {
    // 创建一个 Map 对象，用于存储请求头信息
    Map<String, String> headers = new HashMap<>(16);
    // 读取请求头信息，每行都是一个键值对，以空行结束
    String line = reader.readLine();
    String[] kv;
    while (!"".equals(line)) {
        // 将每行请求头信息按冒号分隔，分别作为键和值存入 Map 中
        kv = StringUtils.split(line, ":");
        assert kv.length == 2;
        headers.put(kv[0].trim(), kv[1].trim());
        line = reader.readLine();
    }
    // 将解析出来的请求头信息存入 Request 对象中
    request.setHeaders(headers);
}
```

**最后就是正文的解析了**，这一块需要注意一点，正文可能为空，也可能有数据；有数据时，我们要如何把所有的数据都取出来呢？

先看具体实现如下：

```java
/**
 * 根据标注HTTP协议，解析正文
 *
 * @param reader    输入流读取器，用于读取请求中的数据
 * @param request   Request 对象，表示 HTTP 请求
 * @throws IOException 当发生 I/O 错误时抛出
 */
private static void decodeRequestMessage(BufferedReader reader, Request request) throws IOException {
    // 从请求头中获取 Content-Length，如果没有，则默认为 0
    int contentLen = Integer.parseInt(request.getHeaders().getOrDefault("Content-Length", "0"));

    // 如果 Content-Length 为 0，表示没有请求正文，直接返回。
    // 例如 GET 和 OPTIONS 请求通常不包含请求正文
    if (contentLen == 0) {
        return;
    }

    // 根据 Content-Length 创建一个字符数组来存储请求正文
    char[] message = new char[contentLen];

    // 使用 BufferedReader 读取请求正文
    reader.read(message);

    // 将字符数组转换为字符串，并将其设置为 Request 对象的 message
    request.setMessage(new String(message));
}
```

注意上面我的使用姿势，首先是根据请求头中的`Content-Type`的值，来获得正文的数据大小，因此我们获取的方式是创建一个这么大的`char[]` 数组来读取流中所有数据，如果我们的数组比实际的小，则读不完；如果大，则数组中会有一些空的数据；

**最后将上面的几个解析封装一下**，完成 request 解析：

```java
/**
 * HTTP 请求可以分为三部分：
 * 1. 请求行：包括请求方法、URI 和 HTTP 协议版本
 * 2. 请求头：从第二行开始，直到一个空行为止
 * 3. 消息正文：紧跟在空行后的所有内容，长度由请求头中的 Content-Length 决定
 *
 * 本方法将 InputStream 中的 HTTP 请求数据解析为一个 Request 对象
 *
 * @param reqStream  包含 HTTP 请求数据的输入流
 * @return           一个表示 HTTP 请求的 Request 对象
 * @throws IOException 当发生 I/O 错误时抛出
 */
public static Request parse2request(InputStream reqStream) throws IOException {
    // 使用 BufferedReader 和 InputStreamReader 读取输入流中的数据
    BufferedReader httpReader = new BufferedReader(new InputStreamReader(reqStream, "UTF-8"));

    // 创建一个新的 Request 对象
    Request httpRequest = new Request();

    // 解析请求行并设置到 Request 对象中
    decodeRequestLine(httpReader, httpRequest);

    // 解析请求头并设置到 Request 对象中
    decodeRequestHeader(httpReader, httpRequest);

    // 解析消息正文并设置到 Request 对象中
    decodeRequestMessage(httpReader, httpRequest);

    // 返回解析后的 Request 对象
    return httpRequest;
}
```

接下来，是请求结果的封装，给一个简单的进行演示：

```java
/**
    * Response 类表示一个 HTTP 响应，包括版本、状态码、状态信息、响应头和响应正文。
    */
@Data
public static class Response {
    private String version;
    private int code;
    private String status;
    private Map<String, String> headers;
    private String message;
}

/**
    * 根据给定的 Request 对象和响应字符串构建一个 HTTP 响应。
    *
    * @param request   用于构建响应的 Request 对象
    * @param response  响应字符串
    * @return          一个表示 HTTP 响应的字符串
    */
public static String buildResponse(Request request, String response) {
    // 创建一个新的 Response 对象，并设置版本、状态码和状态信息
    Response httpResponse = new Response();
    httpResponse.setCode(200);
    httpResponse.setStatus("ok");
    httpResponse.setVersion(request.getVersion());

    // 设置响应头
    Map<String, String> headers = new HashMap<>();
    headers.put("Content-Type", "application/json");
    headers.put("Content-Length", String.valueOf(response.getBytes().length));
    httpResponse.setHeaders(headers);

    // 设置响应正文
    httpResponse.setMessage(response);

    // 构建响应字符串
    StringBuilder builder = new StringBuilder();
    buildResponseLine(httpResponse, builder);
    buildResponseHeaders(httpResponse, builder);
    buildResponseMessage(httpResponse, builder);
    return builder.toString();
}

/**
    * 构建响应行，包括版本、状态码和状态信息。
    *
    * @param response      用于构建响应行的 Response 对象
    * @param stringBuilder 用于拼接响应字符串的 StringBuilder 对象
    */
private static void buildResponseLine(Response response, StringBuilder stringBuilder) {
    stringBuilder.append(response.getVersion()).append(" ").append(response.getCode()).append(" ")
            .append(response.getStatus()).append("\n");
}

/**
    * 构建响应头。
    *
    * @param response      用于构建响应头的 Response 对象
    * @param stringBuilder 用于拼接响应字符串的 StringBuilder 对象
    */
private static void buildResponseHeaders(Response response, StringBuilder stringBuilder) {
    for (Map.Entry<String, String> entry : response.getHeaders().entrySet()) {
        stringBuilder.append(entry.getKey()).append(":").append(entry.getValue()).append("\n");
    }
    stringBuilder.append("\n");
}

/**
    * 构建响应正文。
    *
    * @param response      用于构建响应正文的 Response 对象
    * @param stringBuilder 用于拼接响应字符串的 StringBuilder 对象
    */
private static void buildResponseMessage(Response response, StringBuilder stringBuilder) {
    stringBuilder.append(response.getMessage());
}
```

##### b. 请求任务 HttpTask

每个请求，单独分配一个任务来干这个事情，就是为了支持并发，对于 ServerSocket 而言，接收到了一个请求，那就创建一个 HttpTask 任务来实现 HTTP 通信。

那么这个 httptask 干啥呢？

- 从请求中捞数据
- 响应请求
- 封装结果并返回

```java
/**
 * HttpTask 类实现了 Runnable 接口，用于处理一个 HTTP 请求。
 * 当在一个线程中执行时，该任务将处理一个 Socket 连接上的 HTTP 请求，
 * 并发送响应消息。
 */
public class HttpTask implements Runnable {
    // 用于处理 HTTP 请求的 Socket
    private Socket socket;

    /**
     * 构造一个新的 HttpTask，用于处理指定的 Socket 连接。
     *
     * @param socket  用于处理 HTTP 请求的 Socket
     */
    public HttpTask(Socket socket) {
        this.socket = socket;
    }

    /**
     * 实现 Runnable 接口的 run 方法，用于处理 HTTP 请求并发送响应消息。
     */
    @Override
    public void run() {
        // 检查 socket 是否为 null，如果为 null 则抛出异常
        if (socket == null) {
            throw new IllegalArgumentException("socket can't be null.");
        }

        try {
            // 获取 Socket 的输出流，并创建一个 PrintWriter 对象
            OutputStream outputStream = socket.getOutputStream();
            PrintWriter out = new PrintWriter(outputStream);

            // 从 Socket 的输入流中解析 HTTP 请求
            HttpMessageParser.Request httpRequest = HttpMessageParser.parse2request(socket.getInputStream());

            try {
                // 根据请求结果进行响应，省略返回
                String result = null;
                
                // 根据请求和结果构建 HTTP 响应
                String httpRes = HttpMessageParser.buildResponse(httpRequest, result);

                // 将 HTTP 响应发送到客户端
                out.print(httpRes);
            } catch (Exception e) {
                // 如果发生异常，构建一个包含异常信息的 HTTP 响应
                String httpRes = HttpMessageParser.buildResponse(httpRequest, e.toString());
                out.print(httpRes);
            }

            // 刷新输出流，确保响应消息被发送
            out.flush();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // 关闭 Socket 连接
            try {
                socket.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```

##### c. HTTP 服务搭建

前面的基本上把该干的事情都干了，剩下的就简单了，创建`ServerSocket`，绑定端口接收请求，我们在线程池中跑这个 HTTP 服务

```java
public class BasicHttpServer {
    // 创建一个单线程执行器，用于启动 HTTP 服务器
    private static ExecutorService bootstrapExecutor = Executors.newSingleThreadExecutor();
    // 创建一个线程池，用于处理来自客户端的 HTTP 请求
    private static ExecutorService taskExecutor;
    // 设置服务器监听的端口号
    private static int PORT = 8999;

    // 启动 HTTP 服务器的方法
    static void startHttpServer() {
        // 获取处理器可用核心数，用于设置线程池大小
        int nThreads = Runtime.getRuntime().availableProcessors();
        // 初始化线程池，设置线程池大小，队列大小和丢弃策略
        taskExecutor =
                new ThreadPoolExecutor(nThreads, nThreads, 0L, TimeUnit.MILLISECONDS, new LinkedBlockingQueue<>(100),
                        new ThreadPoolExecutor.DiscardPolicy());

        // 循环尝试启动服务器，如果启动失败，则等待10秒后重试
        while (true) {
            try {
                ServerSocket serverSocket = new ServerSocket(PORT);
                bootstrapExecutor.submit(new ServerThread(serverSocket));
                break;
            } catch (Exception e) {
                try {
                    // 重试，等待 10 秒
                    TimeUnit.SECONDS.sleep(10);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                }
            }
        }

        // 关闭启动执行器
        bootstrapExecutor.shutdown();
    }

    // HTTP 服务器主要任务类
    private static class ServerThread implements Runnable {
        // 保存传递给构造函数的 ServerSocket 实例
        private ServerSocket serverSocket;

        // 构造函数
        public ServerThread(ServerSocket s) throws IOException {
            this.serverSocket = s;
        }

        // 任务主体方法
        @Override
        public void run() {
            while (true) {
                try {
                    // 等待客户端连接
                    Socket socket = this.serverSocket.accept();
                    // 创建一个 HttpTask 实例，将 Socket 实例作为参数传递
                    HttpTask eventTask = new HttpTask(socket);
                    // 将 HttpTask 提交给 taskExecutor 执行
                    taskExecutor.submit(eventTask);
                } catch (Exception e) {
                    e.printStackTrace();
                    try {
                        // 如果发生异常，等待 1 秒后继续尝试
                        TimeUnit.SECONDS.sleep(1);
                    } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt();
                    }
                }
            }
        }
    }
}
```

这段代码是一个简单的 HTTP 服务器实现。以下是关于这个 HTTP 服务器的主要组件和功能的详细解释：

1、bootstrapExecutor：一个单线程的 ExecutorService，用于执行 HTTP 服务器的启动任务。

2、taskExecutor：一个线程池，用于处理来自客户端的 HTTP 请求。线程池的大小等于处理器可用核心数，队列大小为100，使用 DiscardPolicy 丢弃策略。

3、PORT：服务器侦听的端口号，默认为 8999。

4、startHttpServer() 方法：

    - a.创建一个线程池 taskExecutor 用于处理 HTTP 请求。
    - b.在一个循环中，尝试创建一个 ServerSocket 实例并绑定到指定端口。如果失败，则等待 10 秒后重试。
    - c.当成功创建 ServerSocket 实例后，将其作为参数提交给 bootstrapExecutor 执行 ServerThread 任务。
    - d.关闭 bootstrapExecutor。

5、ServerThread 类实现了 Runnable 接口，它是 HTTP 服务器的主要任务：
    - a.serverSocket 成员变量：保存传递给构造函数的 ServerSocket 实例。
    - b.run() 方法：
        - 在一个无限循环中，调用 serverSocket.accept() 方法等待客户端的连接。
        - 当接受到一个新的客户端连接时，创建一个 HttpTask 实例，将 Socket 实例作为参数传递。
        - 将 HttpTask 提交给 taskExecutor 执行。

这个 HTTP 服务器的主要逻辑是：使用一个线程来监听客户端连接，当有新的客户端连接时，创建一个 HttpTask 来处理客户端的 HTTP 请求，并将这个任务提交给线程池 taskExecutor 执行。这样可以实现多个客户端请求的并发处理。

到这里，一个基于 Socket 实现的 HTTP 服务器基本上就搭建完了，接下来就可以进行测试了

#### 4\. 测试

做这个服务器，主要是基于项目 [quick-fix](https://github.com/liuyueyi/quick-fix) 产生的，这个项目主要是为了解决应用内部服务访问与数据订正，我们在这个项目的基础上进行测试。

一个完整的 post 请求如下

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/socket/http-f314ade3-9006-4caa-b905-5726121826c4.gif)

接下来我们看下打印出返回头的情况

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/socket/http-59db6211-792a-494f-b01a-9d5848eceed1.gif)

### II. 其他

#### 0\. 项目源码

- [quick-fix](https://github.com/liuyueyi/quick-fix)
- 相关代码:
- com.git.hui.fix.core.endpoint.BasicHttpServer
- com.git.hui.fix.core.endpoint.HttpMessageParser
- com.git.hui.fix.core.endpoint.HttpTask

>作者：一灰，整理：沉默王二，团队，技术派

---

最近整理了一份牛逼的学习资料，包括但不限于 Java 基础部分（JVM、Java 集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类 Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是 2022 年全网最全的学习和找工作的 PDF 资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
