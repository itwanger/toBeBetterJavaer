---
title: 老板下了死命令，三天内实现 Web 实时消息推送
shortTitle: 7种实现web实时消息推送的方案
description: 我有一个朋友～做了一个小破站，现在要实现一个站内信web消息推送的功能
author: 程序员内点事
category:
  - 微信公众号
head:
  - - meta
    - name: description
      content: 我有一个朋友～做了一个小破站，现在要实现一个站内信web消息推送的功能
---

大家好，我是二哥呀。

我们公司做了一个小破站，现在要实现一个站内信 web 消息推送的功能，对，就是下图这个小红点，一个很常用的功能。老板限时三天内完成。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-woycsxwebssxxtsdfac-7dad1821-bd37-4e47-80fc-b09db54c1a71.jpg)

我整理了几种方案，并简单做了实现，等三天后让老板过目，大家伙先看看这几个方案如何。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-woycsxwebssxxtsdfac-6509c4d3-7c5f-4b6e-95e9-4e9482133d21.jpg)

## 什么是消息推送（push）

推送的场景比较多，比如有人关注我的公众号，这时我就会收到一条推送消息，以此来吸引我点击打开应用。

消息推送(`push`)通常是指网站的运营工作等人员，通过某种工具对用户当前网页或移动设备 APP 进行的主动消息推送。

消息推送一般又分为`web端消息推送`和`移动端消息推送`。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-woycsxwebssxxtsdfac-45d8c9ae-666f-468b-b8c5-2a04a1762a4e.jpg)

上边的这种属于移动端消息推送，web 端消息推送常见的诸如站内信、未读邮件数量、监控报警数量等，应用的也非常广泛。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-woycsxwebssxxtsdfac-f6ca6bd4-63d8-4081-9348-ca48a68aaf09.jpg)

在具体实现之前，咱们再来分析一下前边的需求，其实功能很简单，只要触发某个事件（主动分享了资源或者后台主动推送消息），web 页面的通知小红点就会实时的`+1`就可以了。

通常在服务端会有若干张消息推送表，用来记录用户触发不同事件所推送不同类型的消息，前端主动查询（拉）或者被动接收（推）用户所有未读的消息数。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-woycsxwebssxxtsdfac-d73b5ed2-78e4-48f4-a5b0-edc2a078be8f.jpg)

消息推送无非是推（`push`）和拉（`pull`）两种形式，下边我们逐个了解下。

## 短轮询

轮询(`polling`)应该是实现消息推送方案中最简单的一种，这里我们暂且将轮询分为`短轮询`和`长轮询`。

短轮询很好理解，指定的时间间隔，由浏览器向服务器发出`HTTP`请求，服务器实时返回未读消息数据给客户端，浏览器再做渲染显示。

一个简单的 JS 定时器就可以搞定，每秒钟请求一次未读消息数接口，返回的数据展示即可。

```
setInterval(() => {
  // 方法请求
  messageCount().then((res) => {
      if (res.code === 200) {
          this.messageCount = res.data
      }
  })
}, 1000);
```

效果还是可以的，短轮询实现固然简单，缺点也是显而易见，由于推送数据并不会频繁变更，无论后端此时是否有新的消息产生，客户端都会进行请求，势必会对服务端造成很大压力，浪费带宽和服务器资源。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-woycsxwebssxxtsdfac-c78a59e3-cb09-47be-a50d-d8125c7b6f7a.jpg)

## 长轮询

长轮询是对上边短轮询的一种改进版本，在尽可能减少对服务器资源浪费的同时，保证消息的相对实时性。长轮询在中间件中应用的很广泛，比如`Nacos`和`apollo`配置中心，消息队列`kafka`、`RocketMQ`中都有用到长轮询。

[Nacos 配置中心交互模型是 push 还是 pull？](https://mp.weixin.qq.com/s?__biz=MzAxNTM4NzAyNg==&mid=2247494748&idx=1&sn=2cccdbc6269ea01e75012340af1496ef&scene=21#wechat_redirect)一文中我详细介绍过`Nacos`长轮询的实现原理，感兴趣的小伙伴可以瞅瞅。

这次我使用`apollo`配置中心实现长轮询的方式，应用了一个类`DeferredResult`，它是在`servelet3.0`后经过 Spring 封装提供的一种异步请求机制，直意就是延迟结果。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-woycsxwebssxxtsdfac-6fe55cf8-0929-4360-9ebc-baa2fa203a32.jpg)

`DeferredResult`可以允许容器线程快速释放占用的资源，不阻塞请求线程，以此接受更多的请求提升系统的吞吐量，然后启动异步工作线程处理真正的业务逻辑，处理完成调用`DeferredResult.setResult(200)`提交响应结果。

下边我们用长轮询来实现消息推送。

因为一个 ID 可能会被多个长轮询请求监听，所以我采用了`guava`包提供的`Multimap`结构存放长轮询，一个 key 可以对应多个 value。一旦监听到 key 发生变化，对应的所有长轮询都会响应。前端得到非请求超时的状态码，知晓数据变更，主动查询未读消息数接口，更新页面数据。

```
@Controller
@RequestMapping("/polling")
public class PollingController {

    // 存放监听某个Id的长轮询集合
    // 线程同步结构
    public static Multimap<String, DeferredResult<String>> watchRequests = Multimaps.synchronizedMultimap(HashMultimap.create());

    /**
     * 设置监听
     */
    @GetMapping(path = "watch/{id}")
    @ResponseBody
    public DeferredResult<String> watch(@PathVariable String id) {
        // 延迟对象设置超时时间
        DeferredResult<String> deferredResult = new DeferredResult<>(TIME_OUT);
        // 异步请求完成时移除 key，防止内存溢出
        deferredResult.onCompletion(() -> {
            watchRequests.remove(id, deferredResult);
        });
        // 注册长轮询请求
        watchRequests.put(id, deferredResult);
        return deferredResult;
    }

    /**
     * 公众号：程序员小富
     * 变更数据
     */
    @GetMapping(path = "publish/{id}")
    @ResponseBody
    public String publish(@PathVariable String id) {
        // 数据变更 取出监听ID的所有长轮询请求，并一一响应处理
        if (watchRequests.containsKey(id)) {
            Collection<DeferredResult<String>> deferredResults = watchRequests.get(id);
            for (DeferredResult<String> deferredResult : deferredResults) {
                deferredResult.setResult("我更新了" + new Date());
            }
        }
        return "success";
    }
```

当请求超过设置的超时时间，会抛出`AsyncRequestTimeoutException`异常，这里直接用`@ControllerAdvice`全局捕获统一返回即可，前端获取约定好的状态码后再次发起长轮询请求，如此往复调用。

```
@ControllerAdvice
public class AsyncRequestTimeoutHandler {

    @ResponseStatus(HttpStatus.NOT_MODIFIED)
    @ResponseBody
    @ExceptionHandler(AsyncRequestTimeoutException.class)
    public String asyncRequestTimeoutHandler(AsyncRequestTimeoutException e) {
        System.out.println("异步请求超时");
        return "304";
    }
}
```

我们来测试一下，首先页面发起长轮询请求`/polling/watch/10086`监听消息更变，请求被挂起，不变更数据直至超时，再次发起了长轮询请求；紧接着手动变更数据`/polling/publish/10086`，长轮询得到响应，前端处理业务逻辑完成后再次发起请求，如此循环往复。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-woycsxwebssxxtsdfac-bbcdfce6-7032-4ad2-a04c-f90d7c4dbf2c.jpg)

长轮询相比于短轮询在性能上提升了很多，但依然会产生较多的请求，这是它的一点不完美的地方。

## iframe 流

iframe 流就是在页面中插入一个隐藏的`<iframe>`标签，通过在`src`中请求消息数量 API 接口，由此在服务端和客户端之间创建一条长连接，服务端持续向`iframe`传输数据。

> 传输的数据通常是`HTML`、或是内嵌的`javascript`脚本，来达到实时更新页面的效果。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-woycsxwebssxxtsdfac-360e8778-af64-407c-8dcf-72308d6d1c43.jpg)

这种方式实现简单，前端只要一个`<iframe>`标签搞定了

```
<iframe src="/iframe/message" style="display:none"></iframe>
```

服务端直接组装 html、js 脚本数据向`response`写入就行了

```
@Controller
@RequestMapping("/iframe")
public class IframeController {
    @GetMapping(path = "message")
    public void message(HttpServletResponse response) throws IOException, InterruptedException {
        while (true) {
            response.setHeader("Pragma", "no-cache");
            response.setDateHeader("Expires", 0);
            response.setHeader("Cache-Control", "no-cache,no-store");
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().print(" <script type=\"text/javascript\">\n" +
                    "parent.document.getElementById('clock').innerHTML = \"" + count.get() + "\";" +
                    "parent.document.getElementById('count').innerHTML = \"" + count.get() + "\";" +
                    "</script>");
        }
    }
}
```

但我个人不推荐，因为它在浏览器上会显示请求未加载完，图标会不停旋转，简直是强迫症杀手。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-woycsxwebssxxtsdfac-b66b0eee-189a-49f0-aae6-31b549543c20.jpg)

## SSE (我的方式)

很多人可能不知道，服务端向客户端推送消息，其实除了可以用`WebSocket`这种耳熟能详的机制外，还有一种服务器发送事件(`Server-sent events`)，简称`SSE`。

`SSE`它是基于`HTTP`协议的，我们知道一般意义上的 HTTP 协议是无法做到服务端主动向客户端推送消息的，但 SSE 是个例外，它变换了一种思路。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-woycsxwebssxxtsdfac-1668dd05-2600-431d-ac93-20e0ac4022b7.jpg)

SSE 在服务器和客户端之间打开一个单向通道，服务端响应的不再是一次性的数据包而是`text/event-stream`类型的数据流信息，在有数据变更时从服务器流式传输到客户端。

整体的实现思路有点类似于在线视频播放，视频流会连续不断的推送到浏览器，你也可以理解成，客户端在完成一次用时很长（网络不畅）的下载。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-woycsxwebssxxtsdfac-c18f4919-8877-4afa-b20f-700141cae211.jpg)

`SSE`与`WebSocket`作用相似，都可以建立服务端与浏览器之间的通信，实现服务端向客户端推送消息，但还是有些许不同：

- SSE 是基于 HTTP 协议的，它们不需要特殊的协议或服务器实现即可工作；`WebSocket`需单独服务器来处理协议。
- SSE 单向通信，只能由服务端向客户端单向通信；webSocket 全双工通信，即通信的双方可以同时发送和接受信息。
- SSE 实现简单开发成本低，无需引入其他组件；WebSocket 传输数据需做二次解析，开发门槛高一些。
- SSE 默认支持断线重连；WebSocket 则需要自己实现。
- SSE 只能传送文本消息，二进制数据需要经过编码后传送；WebSocket 默认支持传送二进制数据。

**SSE 与 WebSocket 该如何选择？**

> 技术并没有好坏之分，只有哪个更合适

SSE 好像一直不被大家所熟知，一部分原因是出现了 WebSockets，这个提供了更丰富的协议来执行双向、全双工通信。对于游戏、即时通信以及需要双向近乎实时更新的场景，拥有双向通道更具吸引力。

但是，在某些情况下，不需要从客户端发送数据。而你只需要一些服务器操作的更新。比如：站内信、未读消息数、状态更新、股票行情、监控数量等场景，`SEE`不管是从实现的难易和成本上都更加有优势。此外，SSE 具有`WebSockets`在设计上缺乏的多种功能，例如：`自动重新连接`、`事件ID`和`发送任意事件`的能力。

前端只需进行一次 HTTP 请求，带上唯一 ID，打开事件流，监听服务端推送的事件就可以了

```
<script>
    let source = null;
    let userId = 7777
    if (window.EventSource) {
        // 建立连接
        source = new EventSource('http://localhost:7777/sse/sub/'+userId);
        setMessageInnerHTML("连接用户=" + userId);
        /**
         * 连接一旦建立，就会触发open事件
         * 另一种写法：source.onopen = function (event) {}
         */
        source.addEventListener('open', function (e) {
            setMessageInnerHTML("建立连接。。。");
        }, false);
        /**
         * 客户端收到服务器发来的数据
         * 另一种写法：source.onmessage = function (event) {}
         */
        source.addEventListener('message', function (e) {
            setMessageInnerHTML(e.data);
        });
    } else {
        setMessageInnerHTML("你的浏览器不支持SSE");
    }
</script>
```

服务端的实现更简单，创建一个`SseEmitter`对象放入`sseEmitterMap`进行管理

```
private static Map<String, SseEmitter> sseEmitterMap = new ConcurrentHashMap<>();

/**
 * 创建连接
 *
 * @date: 2022/7/12 14:51
 * @auther: 公众号：程序员小富
 */
public static SseEmitter connect(String userId) {
    try {
        // 设置超时时间，0表示不过期。默认30秒
        SseEmitter sseEmitter = new SseEmitter(0L);
        // 注册回调
        sseEmitter.onCompletion(completionCallBack(userId));
        sseEmitter.onError(errorCallBack(userId));
        sseEmitter.onTimeout(timeoutCallBack(userId));
        sseEmitterMap.put(userId, sseEmitter);
        count.getAndIncrement();
        return sseEmitter;
    } catch (Exception e) {
        log.info("创建新的sse连接异常，当前用户：{}", userId);
    }
    return null;
}

/**
 * 给指定用户发送消息
 *
 * @date: 2022/7/12 14:51
 * @auther: 公众号：程序员小富
 */
public static void sendMessage(String userId, String message) {

    if (sseEmitterMap.containsKey(userId)) {
        try {
            sseEmitterMap.get(userId).send(message);
        } catch (IOException e) {
            log.error("用户[{}]推送异常:{}", userId, e.getMessage());
            removeUser(userId);
        }
    }
}
```

我们模拟服务端推送消息，看下客户端收到了消息，和我们预期的效果一致。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-woycsxwebssxxtsdfac-78c18502-2b42-46fe-9414-74ab9017c5d5.jpg)

**注意：** SSE 不支持`IE`浏览器，对其他主流浏览器兼容性做的还不错。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-woycsxwebssxxtsdfac-0a5ab7ce-1921-414b-8ad1-d7ea4d0b2d55.jpg)

## MQTT

什么是 MQTT 协议？

`MQTT` 全称(Message Queue Telemetry Transport)：一种基于发布/订阅（`publish`/`subscribe`）模式的`轻量级`通讯协议，通过订阅相应的主题来获取消息，是物联网（`Internet of Thing`）中的一个标准传输协议。

该协议将消息的发布者（`publisher`）与订阅者（`subscriber`）进行分离，因此可以在不可靠的网络环境中，为远程连接的设备提供可靠的消息服务，使用方式与传统的 MQ 有点类似。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-woycsxwebssxxtsdfac-5524743a-1f9f-4cde-9f0a-e30312f368b8.jpg)

`TCP`协议位于传输层，`MQTT` 协议位于应用层，`MQTT` 协议构建于`TCP/IP`协议上，也就是说只要支持`TCP/IP`协议栈的地方，都可以使用`MQTT`协议。

为什么要用 MQTT 协议？

`MQTT`协议为什么在物联网（IOT）中如此受偏爱？而不是其它协议，比如我们更为熟悉的 `HTTP`协议呢？

- 首先`HTTP`协议它是一种同步协议，客户端请求后需要等待服务器的响应。而在物联网（IOT）环境中，设备会很受制于环境的影响，比如带宽低、网络延迟高、网络通信不稳定等，显然异步消息协议更为适合`IOT`应用程序。
- `HTTP`是单向的，如果要获取消息客户端必须发起连接，而在物联网（IOT）应用程序中，设备或传感器往往都是客户端，这意味着它们无法被动地接收来自网络的命令。
- 通常需要将一条命令或者消息，发送到网络上的所有设备上。`HTTP`要实现这样的功能不但很困难，而且成本极高。

具体的 MQTT 协议介绍和实践，这里我就不再赘述了，大家可以参考我之前的两篇文章，里边写的也都很详细了。

MQTT 协议的介绍

[我也没想到 springboot + rabbitmq 做智能家居，会这么简单](https://mp.weixin.qq.com/s?__biz=MzAxNTM4NzAyNg==&mid=2247486353&idx=1&sn=02371acc8048cb15f29285f0505c4958&scene=21#wechat_redirect)

MQTT 实现消息推送

[未读消息（小红点），前端 与 RabbitMQ 实时消息推送实践，贼简单~](https://mp.weixin.qq.com/s?__biz=MzAxNTM4NzAyNg==&mid=2247487818&idx=1&sn=19393de4304e1ddd3179d0e45ec16cd7&scene=21#wechat_redirect)

## Websocket

`websocket`应该是大家都比较熟悉的一种实现消息推送的方式，上边我们在讲 SSE 的时候也和 websocket 进行过比较。

WebSocket 是一种在`TCP`连接上进行全双工通信的协议，建立客户端和服务器之间的通信渠道。浏览器和服务器仅需一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-woycsxwebssxxtsdfac-5c924827-2ada-4e25-bc89-a67b746b2ae8.jpg)


springboot 整合 websocket，先引入`websocket`相关的工具包，和 SSE 相比额外的开发成本。

```
<!-- 引入websocket -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-websocket</artifactId>
</dependency>
```

服务端使用`@ServerEndpoint`注解标注当前类为一个 websocket 服务器，客户端可以通过`ws://localhost:7777/webSocket/10086`来连接到 WebSocket 服务器端。

```
@Component
@Slf4j
@ServerEndpoint("/websocket/{userId}")
public class WebSocketServer {
    //与某个客户端的连接会话，需要通过它来给客户端发送数据
    private Session session;
    private static final CopyOnWriteArraySet<WebSocketServer> webSockets = new CopyOnWriteArraySet<>();
    // 用来存在线连接数
    private static final Map<String, Session> sessionPool = new HashMap<String, Session>();
    /**
     * 公众号：程序员小富
     * 链接成功调用的方法
     */
    @OnOpen
    public void onOpen(Session session, @PathParam(value = "userId") String userId) {
        try {
            this.session = session;
            webSockets.add(this);
            sessionPool.put(userId, session);
            log.info("websocket消息: 有新的连接，总数为:" + webSockets.size());
        } catch (Exception e) {
        }
    }
    /**
     * 收到客户端消息后调用的方法
     */
    @OnMessage
    public void onMessage(String message) {
        log.info("websocket消息: 收到客户端消息:" + message);
    }
    /**
     * 此为单点消息
     */
    public void sendOneMessage(String userId, String message) {
        Session session = sessionPool.get(userId);
        if (session != null && session.isOpen()) {
            try {
                log.info("websocket消: 单点消息:" + message);
                session.getAsyncRemote().sendText(message);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
```

前端初始化打开 WebSocket 连接，并监听连接状态，接收服务端数据或向服务端发送数据。

```
<script>
    var ws = new WebSocket('ws://localhost:7777/webSocket/10086');
    // 获取连接状态
    console.log('ws连接状态：' + ws.readyState);
    //监听是否连接成功
    ws.onopen = function () {
        console.log('ws连接状态：' + ws.readyState);
        //连接成功则发送一个数据
        ws.send('test1');
    }
    // 接听服务器发回的信息并处理展示
    ws.onmessage = function (data) {
        console.log('接收到来自服务器的消息：');
        console.log(data);
        //完成通信后关闭WebSocket连接
        ws.close();
    }
    // 监听连接关闭事件
    ws.onclose = function () {
        // 监听整个过程中websocket的状态
        console.log('ws连接状态：' + ws.readyState);
    }
    // 监听并处理error事件
    ws.onerror = function (error) {
        console.log(error);
    }
    function sendMessage() {
        var content = $("#message").val();
        $.ajax({
            url: '/socket/publish?userId=10086&message=' + content,
            type: 'GET',
            data: { "id": "7777", "content": content },
            success: function (data) {
                console.log(data)
            }
        })
    }
</script>
```

页面初始化建立 websocket 连接，之后就可以进行双向通信了，效果还不错

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-woycsxwebssxxtsdfac-7cdef2ca-add8-4ef1-be3c-3acab7e45f72.jpg)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-woycsxwebssxxtsdfac-9a99bdb6-6329-4372-8eb9-59bc8d4be64f.jpg)

## 自定义推送

上边我们给我出了 6 种方案的原理和代码实现，但在实际业务开发过程中，不能盲目的直接拿过来用，还是要结合自身系统业务的特点和实际场景来选择合适的方案。

推送最直接的方式就是使用第三推送平台，毕竟**钱能解决的需求都不是问题**，无需复杂的开发运维，直接可以使用，省时、省力、省心，像 goEasy、极光推送都是很不错的三方服务商。

一般大型公司都有自研的消息推送平台，像我们本次实现的 web 站内信只是平台上的一个触点而已，短信、邮件、微信公众号、小程序凡是可以触达到用户的渠道都可以接入进来。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-woycsxwebssxxtsdfac-b4a464a7-b308-498e-81f9-3418f33c396a.jpg)


消息推送系统内部是相当复杂的，诸如消息内容的维护审核、圈定推送人群、触达过滤拦截（推送的规则频次、时段、数量、黑白名单、关键词等等）、推送失败补偿非常多的模块，技术上涉及到大数据量、高并发的场景也很多。所以我们今天的实现方式在这个庞大的系统面前只是小打小闹。

### Github 地址

文中所提到的案例我都一一的做了实现，整理放在了`Github`上，觉得有用就 **Star** 一下吧！


> 传送门：https://github.com/chengxy-nds/Springboot-Notebook/tree/master/springboot-realtime-data



> 转载链接：[https://mp.weixin.qq.com/s/xQV81HiD8hkzx2wMc3ZT7A](https://mp.weixin.qq.com/s/xQV81HiD8hkzx2wMc3ZT7A)，出处：程序员小富，整理：沉默王二
