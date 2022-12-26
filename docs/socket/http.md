---
title: 牛逼，用Java Socket手撸了一个HTTP服务器
shortTitle: 用Socket撸一个HTTP服务器
description: 作为一个java后端，提供http服务可以说是基本技能之一了，但是你真的了解http协议么？你知道知道如何手撸一个http服务器么？tomcat的底层是怎么支持http服务的呢？大名鼎鼎的Servlet又是什么东西呢，该怎么使用呢？ 在初学java时，socket编程是逃不掉的一章；虽然在实际业务项目中，使用这个的可能性基本为0，本篇博文将主要介绍如何使用socket来实现一个简单的http服务器
category:
  - Java核心
tag:
  - Java网络编程
head:
  - - meta
    - name: keywords
      content: Http,Java,Socket,服务器,Servlet
---


作为一个java后端，提供http服务可以说是基本技能之一了，但是你真的了解http协议么？你知道知道如何手撸一个http服务器么？tomcat的底层是怎么支持http服务的呢？大名鼎鼎的Servlet又是什么东西呢，该怎么使用呢？

在初学java时，socket编程是逃不掉的一章；虽然在实际业务项目中，使用这个的可能性基本为0，本篇博文将主要介绍如何使用socket来实现一个简单的http服务器功能，提供常见的get/post请求支持，并再此过程中了解下http协议

## I. Http服务器从0到1

既然我们的目标是借助socket来搭建http服务器，那么我们首先需要确认两点，一是如何使用socket；另一个则是http协议如何，怎么解析数据；下面分别进行说明

### 1\. socket编程基础

我们这里主要是利用ServerSocket来绑定端口，提供tcp服务，基本使用姿势也比较简单，一般套路如下

*   创建ServerSocket对象，绑定监听端口
*   通过accept()方法监听客户端请求
*   连接建立后，通过输入流读取客户端发送的请求信息
*   通过输出流向客户端发送乡音信息
*   关闭相关资源

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

### 2\. http协议

我们上面的ServerSocket走的是TCP协议，HTTP协议本身是在TCP协议之上的一层，对于我们创建http服务器而言，最需要关注的无非两点

*   请求的数据怎么按照http的协议解析出来
*   如何按照http协议，返回数据

所以我们需要知道数据格式的规范了

**请求消息**

![request headers](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/socket/http-22e0f678-b83a-4514-b2ae-44980ad845d0.jpg)

**响应消息**

![respones headers](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/socket/http-8213eb7a-14d9-4db9-b843-d9d816a1fdec.jpg)

上面两张图，先有个直观映象，接下来开始抓重点

不管是请求消息还是相应消息，都可以划分为三部分，这就为我们后面的处理简化了很多

*   第一行：状态行
*   第二行到第一个空行：header（请求头/相应头)
*   剩下所有：正文

### 3\. http服务器设计

接下来开始进入正题，基于socket创建一个http服务器，使用socket基本没啥太大的问题，我们需要额外关注以下几点

*   对请求数据进行解析
*   封装返回结果

#### a. 请求数据解析

我们从socket中拿到所有的数据，然后解析为对应的http请求，我们先定义个Request对象，内部保存一些基本的HTTP信息，接下来重点就是将socket中的所有数据都捞出来，封装为request对象

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
     * http版本
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

根据前面的http协议介绍，解析过程如下，我们先看请求行的解析过程

**请求行**，包含三个基本要素：请求方法 + URI + http版本，用空格进行分割，所以解析代码如下

```java
/**
 * 根据标准的http协议，解析请求行
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

**请求头的解析**，从第二行，到第一个空白行之间的所有数据，都是请求头；请求头的格式也比较清晰， 形如 `key:value`, 具体实现如下

```java
/**
 * 根据标准http协议，解析请求头
 *
 * @param reader
 * @param request
 * @throws IOException
 */
private static void decodeRequestHeader(BufferedReader reader, Request request) throws IOException {
    Map<String, String> headers = new HashMap<>(16);
    String line = reader.readLine();
    String[] kv;
    while (!"".equals(line)) {
        kv = StringUtils.split(line, ":");
        assert kv.length == 2;
        headers.put(kv[0].trim(), kv[1].trim());
        line = reader.readLine();
    }

    request.setHeaders(headers);
}
```

**最后就是正文的解析了**，这一块需要注意一点，正文可能为空，也可能有数据；有数据时，我们要如何把所有的数据都取出来呢？

先看具体实现如下

```java
/**
 * 根据标注http协议，解析正文
 *
 * @param reader
 * @param request
 * @throws IOException
 */
private static void decodeRequestMessage(BufferedReader reader, Request request) throws IOException {
    int contentLen = Integer.parseInt(request.getHeaders().getOrDefault("Content-Length", "0"));
    if (contentLen == 0) {
        // 表示没有message，直接返回
        // 如get/options请求就没有message
        return;
    }

    char[] message = new char[contentLen];
    reader.read(message);
    request.setMessage(new String(message));
}
```

注意下上面我的使用姿势，首先是根据请求头中的`Content-Type`的值，来获得正文的数据大小，因此我们获取的方式是创建一个这么大的`char[]`来读取流中所有数据，如果我们的数组比实际的小，则读不完；如果大，则数组中会有一些空的数据；

**最后将上面的几个解析封装一下**，完成request解析

```java
/**
 * http的请求可以分为三部分
 *
 * 第一行为请求行: 即 方法 + URI + 版本
 * 第二部分到一个空行为止，表示请求头
 * 空行
 * 第三部分为接下来所有的，表示发送的内容,message-body；其长度由请求头中的 Content-Length 决定
 *
 * 几个实例如下
 *
 * @param reqStream
 * @return
 */
public static Request parse2request(InputStream reqStream) throws IOException {
    BufferedReader httpReader = new BufferedReader(new InputStreamReader(reqStream, "UTF-8"));
    Request httpRequest = new Request();
    decodeRequestLine(httpReader, httpRequest);
    decodeRequestHeader(httpReader, httpRequest);
    decodeRequestMessage(httpReader, httpRequest);
    return httpRequest;
}
```

#### b. 请求任务HttpTask

每个请求，单独分配一个任务来干这个事情，就是为了支持并发，对于ServerSocket而言，接收到了一个请求，那就创建一个HttpTask任务来实现http通信

那么这个httptask干啥呢？

*   从请求中捞数据
*   响应请求
*   封装结果并返回

```java
public class HttpTask implements Runnable {
    private Socket socket;

    public HttpTask(Socket socket) {
        this.socket = socket;
    }

    @Override
    public void run() {
        if (socket == null) {
            throw new IllegalArgumentException("socket can't be null.");
        }

        try {
            OutputStream outputStream = socket.getOutputStream();
            PrintWriter out = new PrintWriter(outputStream);

            HttpMessageParser.Request httpRequest = HttpMessageParser.parse2request(socket.getInputStream());
            try {
                // 根据请求结果进行响应，省略返回
                String result = ...;
                String httpRes = HttpMessageParser.buildResponse(httpRequest, result);
                out.print(httpRes);
            } catch (Exception e) {
                String httpRes = HttpMessageParser.buildResponse(httpRequest, e.toString());
                out.print(httpRes);
            }
            out.flush();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                socket.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```

对于请求结果的封装，给一个简单的进行演示

```java
@Data
public static class Response {
    private String version;
    private int code;
    private String status;

    private Map<String, String> headers;

    private String message;
}

public static String buildResponse(Request request, String response) {
    Response httpResponse = new Response();
    httpResponse.setCode(200);
    httpResponse.setStatus("ok");
    httpResponse.setVersion(request.getVersion());

    Map<String, String> headers = new HashMap<>();
    headers.put("Content-Type", "application/json");
    headers.put("Content-Length", String.valueOf(response.getBytes().length));
    httpResponse.setHeaders(headers);

    httpResponse.setMessage(response);

    StringBuilder builder = new StringBuilder();
    buildResponseLine(httpResponse, builder);
    buildResponseHeaders(httpResponse, builder);
    buildResponseMessage(httpResponse, builder);
    return builder.toString();
}


private static void buildResponseLine(Response response, StringBuilder stringBuilder) {
    stringBuilder.append(response.getVersion()).append(" ").append(response.getCode()).append(" ")
            .append(response.getStatus()).append("\n");
}

private static void buildResponseHeaders(Response response, StringBuilder stringBuilder) {
    for (Map.Entry<String, String> entry : response.getHeaders().entrySet()) {
        stringBuilder.append(entry.getKey()).append(":").append(entry.getValue()).append("\n");
    }
    stringBuilder.append("\n");
}

private static void buildResponseMessage(Response response, StringBuilder stringBuilder) {
    stringBuilder.append(response.getMessage());
}
```

#### c. http服务搭建

前面的基本上把该干的事情都干了，剩下的就简单了，创建`ServerSocket`，绑定端口接收请求，我们在线程池中跑这个http服务

```java
public class BasicHttpServer {
    private static ExecutorService bootstrapExecutor = Executors.newSingleThreadExecutor();
    private static ExecutorService taskExecutor;
    private static int PORT = 8999;

    static void startHttpServer() {
        int nThreads = Runtime.getRuntime().availableProcessors();
        taskExecutor =
                new ThreadPoolExecutor(nThreads, nThreads, 0L, TimeUnit.MILLISECONDS, new LinkedBlockingQueue<>(100),
                        new ThreadPoolExecutor.DiscardPolicy());

        while (true) {
            try {
                ServerSocket serverSocket = new ServerSocket(PORT);
                bootstrapExecutor.submit(new ServerThread(serverSocket));
                break;
            } catch (Exception e) {
                try {
                    //重试
                    TimeUnit.SECONDS.sleep(10);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                }
            }
        }

        bootstrapExecutor.shutdown();
    }

    private static class ServerThread implements Runnable {

        private ServerSocket serverSocket;

        public ServerThread(ServerSocket s) throws IOException {
            this.serverSocket = s;
        }

        @Override
        public void run() {
            while (true) {
                try {
                    Socket socket = this.serverSocket.accept();
                    HttpTask eventTask = new HttpTask(socket);
                    taskExecutor.submit(eventTask);
                } catch (Exception e) {
                    e.printStackTrace();
                    try {
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

到这里，一个基于socket实现的http服务器基本上就搭建完了，接下来就可以进行测试了

### 4\. 测试

做这个服务器，主要是基于项目 [quick-fix](https://github.com/liuyueyi/quick-fix) 产生的，这个项目主要是为了解决应用内部服务访问与数据订正，我们在这个项目的基础上进行测试

一个完成的post请求如下

![2.gif](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/socket/http-f314ade3-9006-4caa-b905-5726121826c4.gif)

接下来我们看下打印出返回头的情况

![2.gif](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/socket/http-59db6211-792a-494f-b01a-9d5848eceed1.gif)

## II. 其他

### 0\. 项目源码

*   [quick-fix](https://github.com/liuyueyi/quick-fix)
*   相关代码:
*   com.git.hui.fix.core.endpoint.BasicHttpServer
*   com.git.hui.fix.core.endpoint.HttpMessageParser
*   com.git.hui.fix.core.endpoint.HttpTask



>参考链接：[https://liuyueyi.github.io/hexblog/2018/12/30/181230-%E4%BD%BF%E7%94%A8Java-Socket%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AAhttp%E6%9C%8D%E5%8A%A1%E5%99%A8/](https://liuyueyi.github.io/hexblog/2018/12/30/181230-%E4%BD%BF%E7%94%A8Java-Socket%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AAhttp%E6%9C%8D%E5%8A%A1%E5%99%A8/)，整理：沉默王二

---------

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)