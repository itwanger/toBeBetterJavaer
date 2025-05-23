---
title: 聊聊四种实时通信技术：短轮询、长轮询、WebSocket 和 SSE
shortTitle: 聊聊四种实时通信技术：短轮询、长轮询、WebSocket 和 SSE
author: 勇哥
category:
  - 微信公众号
---

这篇文章，我们聊聊 四种实时通信技术：短轮询、长轮询、WebSocket 和 SSE 。

# 1 短轮询

浏览器 **定时**（如每秒）向服务器发送 HTTP 请求，服务器立即返回当前数据（无论是否有更新）。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/V71JNV78n28WRbCSpJgdDcADjkGv7bVm4eUSzBymwEgYk4MK2wNREVm1ZKpcUib7RtRR0FgRl1CltGPUvQRtLfg/640?wx_fmt=png&from=appmsg)

*   **优点**：实现简单，兼容性极佳
*   **缺点**：高频请求浪费资源，实时性差（依赖轮询间隔）
*   **延迟**：高（取决于轮询频率）
*   **适用场景**：兼容性要求高，延迟不敏感的简单场景。

笔者职业生涯印象最深刻的短轮询应用场景是**比分直播**：

![](https://mmbiz.qpic.cn/sz_mmbiz_png/V71JNV78n28WRbCSpJgdDcADjkGv7bVmwoaY7ynDvCicfbOpibv46kmqgicWUxaOkmZxvUSFvgm5OmX6pXOhyOzTw/640?wx_fmt=png&from=appmsg)

如图所示，用户进入比分直播界面，浏览器定时查询赛事信息（比分变动、黄红牌等），假如数据有变化，则重新渲染页面。

这种方式实现起来非常简单可靠，但是频繁的调用后端接口，会对后端性能会有影响（主要是 CPU）。同时，因为依赖轮询间隔，页面数据变化有延迟，用户体验并不算太好。

# 2 长轮询

浏览器发送 HTTP 请求后，服务器 **挂起连接** 直到数据更新或超时，返回响应后浏览器立即发起新请求。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/V71JNV78n28WRbCSpJgdDcADjkGv7bVmibKzXlLjIpHzJHlfq2Gtnicb6ePlzh3z1GLtTm66wk2Rnsk3XMJibk5Sg/640?wx_fmt=png&from=appmsg)

*   **优点**：减少无效请求，比短轮询实时性更好
*   **缺点**：服务器需维护挂起连接，高并发时资源消耗大
*   **延迟**：中（取决于数据更新频率）
*   **适用场景**：需要较好实时性且无法用 WebSocket/SSE 的场景（如消息通知）

长轮询最常见的应用场景是：配置中心，我们耳熟能详的注册中心 Nacos 、阿波罗都是依赖长轮询机制。

![nacos长轮询](https://mmbiz.qpic.cn/sz_mmbiz_jpg/V71JNV78n28WRbCSpJgdDcADjkGv7bVmFsxrwOTNL9SxpD0licLnns4cmshZ6Nd3XzYOibzNbUIqHQ1XbnxZjUxw/640?wx_fmt=other&from=appmsg)

Nacos长轮询

> 客户端发起请求后，Nacos 服务端不会立即返回请求结果，而是将请求挂起等待一段时间，如果此段时间内服务端数据变更，立即响应客户端请求，若是一直无变化则等到指定的超时时间后响应请求，客户端重新发起长轮询。

# 3 WebSocket

基于 TCP 的全双工协议，通过 HTTP 升级握手（**Upgrade: websocket**）建立持久连接（**双向实时通信）。**

![image.png](https://mmbiz.qpic.cn/sz_mmbiz_png/V71JNV78n28WRbCSpJgdDcADjkGv7bVmwRWKdEsE29SOz5icqfRcpjAJmoHlEyZ5apjGMJYy9icGQFYG9iaPk5HWA/640?wx_fmt=png&from=appmsg)

*   **优点**：最低延迟，支持双向交互，节省带宽
*   **缺点**：实现复杂，需单独处理连接状态
*   **延迟**：极低
*   **适用场景**：聊天室、在线游戏、协同编辑等 **高实时双向交互** 需求

笔者曾经服务于北京一家电商公司，参与直播答题功能的研发。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/V71JNV78n28WRbCSpJgdDcADjkGv7bVmSPzs6DhPC3qMn0U6N85WRicUSQJmgK0SL1Zicng2ewvkZO63rFDqRTMQ/640?wx_fmt=png&from=appmsg)

  

直播答题整体架构见下图：

![](https://mmbiz.qpic.cn/sz_mmbiz_png/V71JNV78n28WRbCSpJgdDcADjkGv7bVmHEO5Yd9Sv28ibFQzR19icsiaAsjep13yf9gibZrBtM9F5cXE9xdlNl360A/640?wx_fmt=png&from=appmsg)

TCP 网关的技术选型是：Netty、ProtoBuf、WebSocket ，选择 WebSocket 是因为它支持双向实时通信，同时 Netty 内置了 WebSocket 实现类，工程实现起来相对简单。

# 4 Server Send Event(SSE)

基于 HTTP 协议，服务器可 **主动推送** 数据流（如`Content-Type: text/event-stream`），浏览器通过`EventSource` API 监听。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/V71JNV78n28WRbCSpJgdDcADjkGv7bVmSZHREpd2jZXHdHqf2sQuicxh0DkrPySREEzwzuLib3Byz2po9oK3TpLA/640?wx_fmt=png&from=appmsg)

*   **优点**：原生支持断线重连，轻量级（HTTP协议）
*   **缺点**：单向通信（服务端--》客户端），低版本 IE 浏览器不支持
*   **延迟**：低（服务器可即时推送）
*   **适用场景**：股票行情、实时日志等 **服务器单向推送** 需求。

SSE 最经典的应用场景是 ： DeepSeek web 聊天界面 ，如图所示：

![](https://mmbiz.qpic.cn/sz_mmbiz_png/V71JNV78n28WRbCSpJgdDcADjkGv7bVmKSnaLZ2AO44bCE91YdmPuvFnBSWrSib5N0QlZrFRQibBBZ9EHDy91FdA/640?wx_fmt=png&from=appmsg)

当在 DeepSeek 对话框发送消息后，浏览器会发送一个 HTTP 请求 ，服务端会通过 SSE 方式将数据返回到浏览器。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/V71JNV78n28WRbCSpJgdDcADjkGv7bVmty4iaiaWpRCeIv3dgZvbxDHw3E0ibA2xzKWpics1F1CRNlTcqeuCXFFX7g/640?wx_fmt=png&from=appmsg)

# 5 总结

**特性**|**短轮询**|**长轮询**|**SSE**|**WebSocket**|
---|---|---|---|---|
**协议**|HTTP
|HTTP
|HTTP
|WebSocket（基于TCP）
|
**实时性**|低
|中
|高
|极高
|
**资源消耗**|高（频繁请求）
|中（挂起连接）
|低
|低（长连接）
|

**选择建议**：

*   需要 **简单兼容性** → 短轮询
*   需要 **中等实时性** → 长轮询
*   只需 **服务器推送** → SSE
*   需要 **全双工实时交互** → WebSocket

* * *

往期推荐：

[这几个实战专栏，相当炸裂！](https://mp.weixin.qq.com/s?__biz=MzIyNTYzNDE5MQ==&mid=2247520060&idx=1&sn=c03b2b626e467243222d22591264222a&scene=21#wechat_redirect)

[短信服务 platform-sms 0.6.1 发布](https://mp.weixin.qq.com/s?__biz=MzIyNTYzNDE5MQ==&mid=2247519195&idx=1&sn=bfdc712051446c6abb1c9616978b5846&scene=21#wechat_redirect)

[看完这一篇，ShardingSphere-jdbc 实战再也不怕了](https://mp.weixin.qq.com/s?__biz=MzIyNTYzNDE5MQ==&mid=2247511645&idx=1&sn=b81aecc9ff727ef880c6bcf841169737&scene=21#wechat_redirect)

[我写了一个教学型的任务调度系统，很强！](https://mp.weixin.qq.com/s?__biz=MzIyNTYzNDE5MQ==&mid=2247520043&idx=1&sn=f06597b5a39236dbd5d34017d5a8d359&scene=21#wechat_redirect)

最后，欢迎加入我的知识星球，今年会有非常有趣的专栏，大家拭目以待。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/V71JNV78n29BJE4ZbEGbUCUQUhS7NC1IeZkOcYDEPePiawnRFJWbdYwrrrKg3TicgBauRPmEnqiaBoYjibTDZvT6ibQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

记得**添加我的微信（zhangyongtaozhe）**：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/V71JNV78n29BJE4ZbEGbUCUQUhS7NC1IecK5JPoyMv5grj1HJCpwb0QzNXcz8LyIsial6yYSaOzWzMY2OswSkwA/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

>参考链接：[https://mp.weixin.qq.com/s/NIACuNgHtSFgKHc7T1G3Wg](https://mp.weixin.qq.com/s/NIACuNgHtSFgKHc7T1G3Wg)，整理：沉默王二
