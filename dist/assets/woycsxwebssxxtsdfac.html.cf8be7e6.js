import{_ as t}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as a,c,a as e,d as i,b as s,e as d,r as l}from"./app.99eb8281.js";const r={},o=d(`<p>大家好，我是二哥呀。</p><p>我们公司做了一个小破站，现在要实现一个站内信 web 消息推送的功能，对，就是下图这个小红点，一个很常用的功能。老板限时三天内完成。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-woycsxwebssxxtsdfac-7dad1821-bd37-4e47-80fc-b09db54c1a71.jpg" alt="" loading="lazy"></p><p>我整理了几种方案，并简单做了实现，等三天后让老板过目，大家伙先看看这几个方案如何。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-woycsxwebssxxtsdfac-6509c4d3-7c5f-4b6e-95e9-4e9482133d21.jpg" alt="" loading="lazy"></p><h2 id="什么是消息推送-push" tabindex="-1"><a class="header-anchor" href="#什么是消息推送-push" aria-hidden="true">#</a> 什么是消息推送（push）</h2><p>推送的场景比较多，比如有人关注我的公众号，这时我就会收到一条推送消息，以此来吸引我点击打开应用。</p><p>消息推送(<code>push</code>)通常是指网站的运营工作等人员，通过某种工具对用户当前网页或移动设备 APP 进行的主动消息推送。</p><p>消息推送一般又分为<code>web端消息推送</code>和<code>移动端消息推送</code>。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-woycsxwebssxxtsdfac-45d8c9ae-666f-468b-b8c5-2a04a1762a4e.jpg" alt="" loading="lazy"></p><p>上边的这种属于移动端消息推送，web 端消息推送常见的诸如站内信、未读邮件数量、监控报警数量等，应用的也非常广泛。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-woycsxwebssxxtsdfac-f6ca6bd4-63d8-4081-9348-ca48a68aaf09.jpg" alt="" loading="lazy"></p><p>在具体实现之前，咱们再来分析一下前边的需求，其实功能很简单，只要触发某个事件（主动分享了资源或者后台主动推送消息），web 页面的通知小红点就会实时的<code>+1</code>就可以了。</p><p>通常在服务端会有若干张消息推送表，用来记录用户触发不同事件所推送不同类型的消息，前端主动查询（拉）或者被动接收（推）用户所有未读的消息数。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-woycsxwebssxxtsdfac-d73b5ed2-78e4-48f4-a5b0-edc2a078be8f.jpg" alt="" loading="lazy"></p><p>消息推送无非是推（<code>push</code>）和拉（<code>pull</code>）两种形式，下边我们逐个了解下。</p><h2 id="短轮询" tabindex="-1"><a class="header-anchor" href="#短轮询" aria-hidden="true">#</a> 短轮询</h2><p>轮询(<code>polling</code>)应该是实现消息推送方案中最简单的一种，这里我们暂且将轮询分为<code>短轮询</code>和<code>长轮询</code>。</p><p>短轮询很好理解，指定的时间间隔，由浏览器向服务器发出<code>HTTP</code>请求，服务器实时返回未读消息数据给客户端，浏览器再做渲染显示。</p><p>一个简单的 JS 定时器就可以搞定，每秒钟请求一次未读消息数接口，返回的数据展示即可。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>setInterval(() =&gt; {
  // 方法请求
  messageCount().then((res) =&gt; {
      if (res.code === 200) {
          this.messageCount = res.data
      }
  })
}, 1000);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>效果还是可以的，短轮询实现固然简单，缺点也是显而易见，由于推送数据并不会频繁变更，无论后端此时是否有新的消息产生，客户端都会进行请求，势必会对服务端造成很大压力，浪费带宽和服务器资源。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-woycsxwebssxxtsdfac-c78a59e3-cb09-47be-a50d-d8125c7b6f7a.jpg" alt="" loading="lazy"></p><h2 id="长轮询" tabindex="-1"><a class="header-anchor" href="#长轮询" aria-hidden="true">#</a> 长轮询</h2><p>长轮询是对上边短轮询的一种改进版本，在尽可能减少对服务器资源浪费的同时，保证消息的相对实时性。长轮询在中间件中应用的很广泛，比如<code>Nacos</code>和<code>apollo</code>配置中心，消息队列<code>kafka</code>、<code>RocketMQ</code>中都有用到长轮询。</p>`,25),v={href:"https://mp.weixin.qq.com/s?__biz=MzAxNTM4NzAyNg==&mid=2247494748&idx=1&sn=2cccdbc6269ea01e75012340af1496ef&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},u=e("code",null,"Nacos",-1),b=d(`<p>这次我使用<code>apollo</code>配置中心实现长轮询的方式，应用了一个类<code>DeferredResult</code>，它是在<code>servelet3.0</code>后经过 Spring 封装提供的一种异步请求机制，直意就是延迟结果。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-woycsxwebssxxtsdfac-6fe55cf8-0929-4360-9ebc-baa2fa203a32.jpg" alt="" loading="lazy"></p><p><code>DeferredResult</code>可以允许容器线程快速释放占用的资源，不阻塞请求线程，以此接受更多的请求提升系统的吞吐量，然后启动异步工作线程处理真正的业务逻辑，处理完成调用<code>DeferredResult.setResult(200)</code>提交响应结果。</p><p>下边我们用长轮询来实现消息推送。</p><p>因为一个 ID 可能会被多个长轮询请求监听，所以我采用了<code>guava</code>包提供的<code>Multimap</code>结构存放长轮询，一个 key 可以对应多个 value。一旦监听到 key 发生变化，对应的所有长轮询都会响应。前端得到非请求超时的状态码，知晓数据变更，主动查询未读消息数接口，更新页面数据。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Controller
@RequestMapping(&quot;/polling&quot;)
public class PollingController {

    // 存放监听某个Id的长轮询集合
    // 线程同步结构
    public static Multimap&lt;String, DeferredResult&lt;String&gt;&gt; watchRequests = Multimaps.synchronizedMultimap(HashMultimap.create());

    /**
     * 设置监听
     */
    @GetMapping(path = &quot;watch/{id}&quot;)
    @ResponseBody
    public DeferredResult&lt;String&gt; watch(@PathVariable String id) {
        // 延迟对象设置超时时间
        DeferredResult&lt;String&gt; deferredResult = new DeferredResult&lt;&gt;(TIME_OUT);
        // 异步请求完成时移除 key，防止内存溢出
        deferredResult.onCompletion(() -&gt; {
            watchRequests.remove(id, deferredResult);
        });
        // 注册长轮询请求
        watchRequests.put(id, deferredResult);
        return deferredResult;
    }

    /**
     * 公众号：程序员小富
     * 变更数据
     */
    @GetMapping(path = &quot;publish/{id}&quot;)
    @ResponseBody
    public String publish(@PathVariable String id) {
        // 数据变更 取出监听ID的所有长轮询请求，并一一响应处理
        if (watchRequests.containsKey(id)) {
            Collection&lt;DeferredResult&lt;String&gt;&gt; deferredResults = watchRequests.get(id);
            for (DeferredResult&lt;String&gt; deferredResult : deferredResults) {
                deferredResult.setResult(&quot;我更新了&quot; + new Date());
            }
        }
        return &quot;success&quot;;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当请求超过设置的超时时间，会抛出<code>AsyncRequestTimeoutException</code>异常，这里直接用<code>@ControllerAdvice</code>全局捕获统一返回即可，前端获取约定好的状态码后再次发起长轮询请求，如此往复调用。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@ControllerAdvice
public class AsyncRequestTimeoutHandler {

    @ResponseStatus(HttpStatus.NOT_MODIFIED)
    @ResponseBody
    @ExceptionHandler(AsyncRequestTimeoutException.class)
    public String asyncRequestTimeoutHandler(AsyncRequestTimeoutException e) {
        System.out.println(&quot;异步请求超时&quot;);
        return &quot;304&quot;;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们来测试一下，首先页面发起长轮询请求<code>/polling/watch/10086</code>监听消息更变，请求被挂起，不变更数据直至超时，再次发起了长轮询请求；紧接着手动变更数据<code>/polling/publish/10086</code>，长轮询得到响应，前端处理业务逻辑完成后再次发起请求，如此循环往复。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-woycsxwebssxxtsdfac-bbcdfce6-7032-4ad2-a04c-f90d7c4dbf2c.jpg" alt="" loading="lazy"></p><p>长轮询相比于短轮询在性能上提升了很多，但依然会产生较多的请求，这是它的一点不完美的地方。</p><h2 id="iframe-流" tabindex="-1"><a class="header-anchor" href="#iframe-流" aria-hidden="true">#</a> iframe 流</h2><p>iframe 流就是在页面中插入一个隐藏的<code>&lt;iframe&gt;</code>标签，通过在<code>src</code>中请求消息数量 API 接口，由此在服务端和客户端之间创建一条长连接，服务端持续向<code>iframe</code>传输数据。</p><blockquote><p>传输的数据通常是<code>HTML</code>、或是内嵌的<code>javascript</code>脚本，来达到实时更新页面的效果。</p></blockquote><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-woycsxwebssxxtsdfac-360e8778-af64-407c-8dcf-72308d6d1c43.jpg" alt="" loading="lazy"></p><p>这种方式实现简单，前端只要一个<code>&lt;iframe&gt;</code>标签搞定了</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;iframe src=&quot;/iframe/message&quot; style=&quot;display:none&quot;&gt;&lt;/iframe&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>服务端直接组装 html、js 脚本数据向<code>response</code>写入就行了</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Controller
@RequestMapping(&quot;/iframe&quot;)
public class IframeController {
    @GetMapping(path = &quot;message&quot;)
    public void message(HttpServletResponse response) throws IOException, InterruptedException {
        while (true) {
            response.setHeader(&quot;Pragma&quot;, &quot;no-cache&quot;);
            response.setDateHeader(&quot;Expires&quot;, 0);
            response.setHeader(&quot;Cache-Control&quot;, &quot;no-cache,no-store&quot;);
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().print(&quot; &lt;script type=\\&quot;text/javascript\\&quot;&gt;\\n&quot; +
                    &quot;parent.document.getElementById(&#39;clock&#39;).innerHTML = \\&quot;&quot; + count.get() + &quot;\\&quot;;&quot; +
                    &quot;parent.document.getElementById(&#39;count&#39;).innerHTML = \\&quot;&quot; + count.get() + &quot;\\&quot;;&quot; +
                    &quot;&lt;/script&gt;&quot;);
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但我个人不推荐，因为它在浏览器上会显示请求未加载完，图标会不停旋转，简直是强迫症杀手。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-woycsxwebssxxtsdfac-b66b0eee-189a-49f0-aae6-31b549543c20.jpg" alt="" loading="lazy"></p><h2 id="sse-我的方式" tabindex="-1"><a class="header-anchor" href="#sse-我的方式" aria-hidden="true">#</a> SSE (我的方式)</h2><p>很多人可能不知道，服务端向客户端推送消息，其实除了可以用<code>WebSocket</code>这种耳熟能详的机制外，还有一种服务器发送事件(<code>Server-sent events</code>)，简称<code>SSE</code>。</p><p><code>SSE</code>它是基于<code>HTTP</code>协议的，我们知道一般意义上的 HTTP 协议是无法做到服务端主动向客户端推送消息的，但 SSE 是个例外，它变换了一种思路。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-woycsxwebssxxtsdfac-1668dd05-2600-431d-ac93-20e0ac4022b7.jpg" alt="" loading="lazy"></p><p>SSE 在服务器和客户端之间打开一个单向通道，服务端响应的不再是一次性的数据包而是<code>text/event-stream</code>类型的数据流信息，在有数据变更时从服务器流式传输到客户端。</p><p>整体的实现思路有点类似于在线视频播放，视频流会连续不断的推送到浏览器，你也可以理解成，客户端在完成一次用时很长（网络不畅）的下载。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-woycsxwebssxxtsdfac-c18f4919-8877-4afa-b20f-700141cae211.jpg" alt="" loading="lazy"></p><p><code>SSE</code>与<code>WebSocket</code>作用相似，都可以建立服务端与浏览器之间的通信，实现服务端向客户端推送消息，但还是有些许不同：</p><ul><li>SSE 是基于 HTTP 协议的，它们不需要特殊的协议或服务器实现即可工作；<code>WebSocket</code>需单独服务器来处理协议。</li><li>SSE 单向通信，只能由服务端向客户端单向通信；webSocket 全双工通信，即通信的双方可以同时发送和接受信息。</li><li>SSE 实现简单开发成本低，无需引入其他组件；WebSocket 传输数据需做二次解析，开发门槛高一些。</li><li>SSE 默认支持断线重连；WebSocket 则需要自己实现。</li><li>SSE 只能传送文本消息，二进制数据需要经过编码后传送；WebSocket 默认支持传送二进制数据。</li></ul><p><strong>SSE 与 WebSocket 该如何选择？</strong></p><blockquote><p>技术并没有好坏之分，只有哪个更合适</p></blockquote><p>SSE 好像一直不被大家所熟知，一部分原因是出现了 WebSockets，这个提供了更丰富的协议来执行双向、全双工通信。对于游戏、即时通信以及需要双向近乎实时更新的场景，拥有双向通道更具吸引力。</p><p>但是，在某些情况下，不需要从客户端发送数据。而你只需要一些服务器操作的更新。比如：站内信、未读消息数、状态更新、股票行情、监控数量等场景，<code>SEE</code>不管是从实现的难易和成本上都更加有优势。此外，SSE 具有<code>WebSockets</code>在设计上缺乏的多种功能，例如：<code>自动重新连接</code>、<code>事件ID</code>和<code>发送任意事件</code>的能力。</p><p>前端只需进行一次 HTTP 请求，带上唯一 ID，打开事件流，监听服务端推送的事件就可以了</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;script&gt;
    let source = null;
    let userId = 7777
    if (window.EventSource) {
        // 建立连接
        source = new EventSource(&#39;http://localhost:7777/sse/sub/&#39;+userId);
        setMessageInnerHTML(&quot;连接用户=&quot; + userId);
        /**
         * 连接一旦建立，就会触发open事件
         * 另一种写法：source.onopen = function (event) {}
         */
        source.addEventListener(&#39;open&#39;, function (e) {
            setMessageInnerHTML(&quot;建立连接。。。&quot;);
        }, false);
        /**
         * 客户端收到服务器发来的数据
         * 另一种写法：source.onmessage = function (event) {}
         */
        source.addEventListener(&#39;message&#39;, function (e) {
            setMessageInnerHTML(e.data);
        });
    } else {
        setMessageInnerHTML(&quot;你的浏览器不支持SSE&quot;);
    }
&lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>服务端的实现更简单，创建一个<code>SseEmitter</code>对象放入<code>sseEmitterMap</code>进行管理</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>private static Map&lt;String, SseEmitter&gt; sseEmitterMap = new ConcurrentHashMap&lt;&gt;();

/**
 * 创建连接
 *
 * @date: 2022/7/12 14:51
 * @auther: 公众号：程序员小富
 */
public static SseEmitter connect(String userId) {
    try {
        // 设置超时时间，0表示不过期。默认30秒
        SseEmitter sseEmitter = new SseEmitter(0L);
        // 注册回调
        sseEmitter.onCompletion(completionCallBack(userId));
        sseEmitter.onError(errorCallBack(userId));
        sseEmitter.onTimeout(timeoutCallBack(userId));
        sseEmitterMap.put(userId, sseEmitter);
        count.getAndIncrement();
        return sseEmitter;
    } catch (Exception e) {
        log.info(&quot;创建新的sse连接异常，当前用户：{}&quot;, userId);
    }
    return null;
}

/**
 * 给指定用户发送消息
 *
 * @date: 2022/7/12 14:51
 * @auther: 公众号：程序员小富
 */
public static void sendMessage(String userId, String message) {

    if (sseEmitterMap.containsKey(userId)) {
        try {
            sseEmitterMap.get(userId).send(message);
        } catch (IOException e) {
            log.error(&quot;用户[{}]推送异常:{}&quot;, userId, e.getMessage());
            removeUser(userId);
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们模拟服务端推送消息，看下客户端收到了消息，和我们预期的效果一致。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-woycsxwebssxxtsdfac-78c18502-2b42-46fe-9414-74ab9017c5d5.jpg" alt="" loading="lazy"></p><p><strong>注意：</strong> SSE 不支持<code>IE</code>浏览器，对其他主流浏览器兼容性做的还不错。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-woycsxwebssxxtsdfac-0a5ab7ce-1921-414b-8ad1-d7ea4d0b2d55.jpg" alt="" loading="lazy"></p><h2 id="mqtt" tabindex="-1"><a class="header-anchor" href="#mqtt" aria-hidden="true">#</a> MQTT</h2><p>什么是 MQTT 协议？</p><p><code>MQTT</code> 全称(Message Queue Telemetry Transport)：一种基于发布/订阅（<code>publish</code>/<code>subscribe</code>）模式的<code>轻量级</code>通讯协议，通过订阅相应的主题来获取消息，是物联网（<code>Internet of Thing</code>）中的一个标准传输协议。</p><p>该协议将消息的发布者（<code>publisher</code>）与订阅者（<code>subscriber</code>）进行分离，因此可以在不可靠的网络环境中，为远程连接的设备提供可靠的消息服务，使用方式与传统的 MQ 有点类似。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-woycsxwebssxxtsdfac-5524743a-1f9f-4cde-9f0a-e30312f368b8.jpg" alt="" loading="lazy"></p><p><code>TCP</code>协议位于传输层，<code>MQTT</code> 协议位于应用层，<code>MQTT</code> 协议构建于<code>TCP/IP</code>协议上，也就是说只要支持<code>TCP/IP</code>协议栈的地方，都可以使用<code>MQTT</code>协议。</p><p>为什么要用 MQTT 协议？</p><p><code>MQTT</code>协议为什么在物联网（IOT）中如此受偏爱？而不是其它协议，比如我们更为熟悉的 <code>HTTP</code>协议呢？</p><ul><li>首先<code>HTTP</code>协议它是一种同步协议，客户端请求后需要等待服务器的响应。而在物联网（IOT）环境中，设备会很受制于环境的影响，比如带宽低、网络延迟高、网络通信不稳定等，显然异步消息协议更为适合<code>IOT</code>应用程序。</li><li><code>HTTP</code>是单向的，如果要获取消息客户端必须发起连接，而在物联网（IOT）应用程序中，设备或传感器往往都是客户端，这意味着它们无法被动地接收来自网络的命令。</li><li>通常需要将一条命令或者消息，发送到网络上的所有设备上。<code>HTTP</code>要实现这样的功能不但很困难，而且成本极高。</li></ul><p>具体的 MQTT 协议介绍和实践，这里我就不再赘述了，大家可以参考我之前的两篇文章，里边写的也都很详细了。</p><p>MQTT 协议的介绍</p>`,53),m={href:"https://mp.weixin.qq.com/s?__biz=MzAxNTM4NzAyNg==&mid=2247486353&idx=1&sn=02371acc8048cb15f29285f0505c4958&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},p=e("p",null,"MQTT 实现消息推送",-1),g={href:"https://mp.weixin.qq.com/s?__biz=MzAxNTM4NzAyNg==&mid=2247487818&idx=1&sn=19393de4304e1ddd3179d0e45ec16cd7&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},h=d(`<h2 id="websocket" tabindex="-1"><a class="header-anchor" href="#websocket" aria-hidden="true">#</a> Websocket</h2><p><code>websocket</code>应该是大家都比较熟悉的一种实现消息推送的方式，上边我们在讲 SSE 的时候也和 websocket 进行过比较。</p><p>WebSocket 是一种在<code>TCP</code>连接上进行全双工通信的协议，建立客户端和服务器之间的通信渠道。浏览器和服务器仅需一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-woycsxwebssxxtsdfac-5c924827-2ada-4e25-bc89-a67b746b2ae8.jpg" alt="" loading="lazy"></p><p>springboot 整合 websocket，先引入<code>websocket</code>相关的工具包，和 SSE 相比额外的开发成本。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;!-- 引入websocket --&gt;
&lt;dependency&gt;
    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
    &lt;artifactId&gt;spring-boot-starter-websocket&lt;/artifactId&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>服务端使用<code>@ServerEndpoint</code>注解标注当前类为一个 websocket 服务器，客户端可以通过<code>ws://localhost:7777/webSocket/10086</code>来连接到 WebSocket 服务器端。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Component
@Slf4j
@ServerEndpoint(&quot;/websocket/{userId}&quot;)
public class WebSocketServer {
    //与某个客户端的连接会话，需要通过它来给客户端发送数据
    private Session session;
    private static final CopyOnWriteArraySet&lt;WebSocketServer&gt; webSockets = new CopyOnWriteArraySet&lt;&gt;();
    // 用来存在线连接数
    private static final Map&lt;String, Session&gt; sessionPool = new HashMap&lt;String, Session&gt;();
    /**
     * 公众号：程序员小富
     * 链接成功调用的方法
     */
    @OnOpen
    public void onOpen(Session session, @PathParam(value = &quot;userId&quot;) String userId) {
        try {
            this.session = session;
            webSockets.add(this);
            sessionPool.put(userId, session);
            log.info(&quot;websocket消息: 有新的连接，总数为:&quot; + webSockets.size());
        } catch (Exception e) {
        }
    }
    /**
     * 收到客户端消息后调用的方法
     */
    @OnMessage
    public void onMessage(String message) {
        log.info(&quot;websocket消息: 收到客户端消息:&quot; + message);
    }
    /**
     * 此为单点消息
     */
    public void sendOneMessage(String userId, String message) {
        Session session = sessionPool.get(userId);
        if (session != null &amp;&amp; session.isOpen()) {
            try {
                log.info(&quot;websocket消: 单点消息:&quot; + message);
                session.getAsyncRemote().sendText(message);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>前端初始化打开 WebSocket 连接，并监听连接状态，接收服务端数据或向服务端发送数据。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;script&gt;
    var ws = new WebSocket(&#39;ws://localhost:7777/webSocket/10086&#39;);
    // 获取连接状态
    console.log(&#39;ws连接状态：&#39; + ws.readyState);
    //监听是否连接成功
    ws.onopen = function () {
        console.log(&#39;ws连接状态：&#39; + ws.readyState);
        //连接成功则发送一个数据
        ws.send(&#39;test1&#39;);
    }
    // 接听服务器发回的信息并处理展示
    ws.onmessage = function (data) {
        console.log(&#39;接收到来自服务器的消息：&#39;);
        console.log(data);
        //完成通信后关闭WebSocket连接
        ws.close();
    }
    // 监听连接关闭事件
    ws.onclose = function () {
        // 监听整个过程中websocket的状态
        console.log(&#39;ws连接状态：&#39; + ws.readyState);
    }
    // 监听并处理error事件
    ws.onerror = function (error) {
        console.log(error);
    }
    function sendMessage() {
        var content = $(&quot;#message&quot;).val();
        $.ajax({
            url: &#39;/socket/publish?userId=10086&amp;message=&#39; + content,
            type: &#39;GET&#39;,
            data: { &quot;id&quot;: &quot;7777&quot;, &quot;content&quot;: content },
            success: function (data) {
                console.log(data)
            }
        })
    }
&lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>页面初始化建立 websocket 连接，之后就可以进行双向通信了，效果还不错</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-woycsxwebssxxtsdfac-7cdef2ca-add8-4ef1-be3c-3acab7e45f72.jpg" alt="" loading="lazy"></p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-woycsxwebssxxtsdfac-9a99bdb6-6329-4372-8eb9-59bc8d4be64f.jpg" alt="" loading="lazy"></p><h2 id="自定义推送" tabindex="-1"><a class="header-anchor" href="#自定义推送" aria-hidden="true">#</a> 自定义推送</h2><p>上边我们给我出了 6 种方案的原理和代码实现，但在实际业务开发过程中，不能盲目的直接拿过来用，还是要结合自身系统业务的特点和实际场景来选择合适的方案。</p><p>推送最直接的方式就是使用第三推送平台，毕竟<strong>钱能解决的需求都不是问题</strong>，无需复杂的开发运维，直接可以使用，省时、省力、省心，像 goEasy、极光推送都是很不错的三方服务商。</p><p>一般大型公司都有自研的消息推送平台，像我们本次实现的 web 站内信只是平台上的一个触点而已，短信、邮件、微信公众号、小程序凡是可以触达到用户的渠道都可以接入进来。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-woycsxwebssxxtsdfac-b4a464a7-b308-498e-81f9-3418f33c396a.jpg" alt="" loading="lazy"></p><p>消息推送系统内部是相当复杂的，诸如消息内容的维护审核、圈定推送人群、触达过滤拦截（推送的规则频次、时段、数量、黑白名单、关键词等等）、推送失败补偿非常多的模块，技术上涉及到大数据量、高并发的场景也很多。所以我们今天的实现方式在这个庞大的系统面前只是小打小闹。</p><h3 id="github-地址" tabindex="-1"><a class="header-anchor" href="#github-地址" aria-hidden="true">#</a> Github 地址</h3><p>文中所提到的案例我都一一的做了实现，整理放在了<code>Github</code>上，觉得有用就 <strong>Star</strong> 一下吧！</p>`,21),x={href:"https://github.com/chengxy-nds/Springboot-Notebook/tree/master/springboot-realtime-data",target:"_blank",rel:"noopener noreferrer"},f={href:"https://mp.weixin.qq.com/s/xQV81HiD8hkzx2wMc3ZT7A",target:"_blank",rel:"noopener noreferrer"};function w(S,q){const n=l("ExternalLinkIcon");return a(),c("div",null,[o,e("p",null,[e("a",v,[i("Nacos 配置中心交互模型是 push 还是 pull？"),s(n)]),i("一文中我详细介绍过"),u,i("长轮询的实现原理，感兴趣的小伙伴可以瞅瞅。")]),b,e("p",null,[e("a",m,[i("我也没想到 springboot + rabbitmq 做智能家居，会这么简单"),s(n)])]),p,e("p",null,[e("a",g,[i("未读消息（小红点），前端 与 RabbitMQ 实时消息推送实践，贼简单~"),s(n)])]),h,e("blockquote",null,[e("p",null,[i("传送门："),e("a",x,[i("https://github.com/chengxy-nds/Springboot-Notebook/tree/master/springboot-realtime-data"),s(n)])])]),e("blockquote",null,[e("p",null,[i("转载链接："),e("a",f,[i("https://mp.weixin.qq.com/s/xQV81HiD8hkzx2wMc3ZT7A"),s(n)]),i("，出处：程序员小富，整理：沉默王二")])])])}const k=t(r,[["render",w],["__file","woycsxwebssxxtsdfac.html.vue"]]);export{k as default};
