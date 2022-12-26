---
title: 面试官：如何实现扫码登录功能？
shortTitle: 面试官：如何实现扫码登录功能？
description: 真实面试场景：扫码功能的设计。
author: 三分恶
category:
  - 微信公众号
---

真实面试小场景：

经过八股和算法的交锋，小二松了口气，都hold住了。只见面试官老王微微一笑，“其实，我真正想问的是……你觉得扫码登录应该怎么实现。”

小二：“啊……这个，哦……那个，这个就这么，然后……额……嗯……”

面试官老王：“了解了，回去等通知吧。”

完……

* * *

好了，铺垫结束，进入我们今天的主题，**扫码登录功能该如何实现**？

## 扫码登录场景

扫码登录场景想必我们都不陌生——很多PC端的网站都提供了扫码登录的功能，无需在网页上输入任何账号和密码，只需要通过手机上的APP，如微信、淘宝、QQ等等，使用扫描功能，扫描网页上的二维码，确认登录，就可以完成网页端登录。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-miansgrhsxsmdlgn-86315129-1521-4f67-b097-9d3f8ecace2f.jpg)


## 扫码登录分析

我们来分析一下，扫码登录，其实涉及到`三种角色`，需要解决`两个问题`。

### 三种角色

很明显，扫码登录当中涉及到的三种角色：`PC端`、`手机端`、`服务端`。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-miansgrhsxsmdlgn-fe5c2e6f-3afd-4614-b52a-3b4ff6800f02.jpg)


相关的设计都要围绕这`三端`来展开，具体的设计其实就是每一端应该完成什么功能？应该怎么实现？端和端应该如何交互？

### 两个问题

扫码登录本质上是一种特殊的登录认证方式，我们面对的是两个问题

*   `手机端`如何完成认证
*   `PC端`如何完成登录

如果用普通的账号密码方式登录认证，PC端通过账号密码完成认证，然后服务端给PC端同步返回token key之类的标识，PC端再次请求服务端，需要携带token key，用于标识和证明自己登录的状态。

服务端响应的时候，需要对token key进行校验，通过则正常响应；校验不通过，认证失败；或者token过期，PC端需要再次登录认证，获取新的token key。

![账号/密码登录过程](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-miansgrhsxsmdlgn-67e71850-ab1c-4265-ba3d-d535d0854c93.jpg)



现在换成了扫码登录：

*   认证不是通过账号密码了，而是由手机端扫码来完成
*   PC端没法同步获取认证成功之后的凭据，必须用某种方式来让PC端获取认证的凭据。

## 扫码登录实现

### 手机端如何完成认证

#### 二维码怎么生成

二维码和超市里的条形码类似，超市的条形码实际是一串数字，上面存储了商品的序列号。

二维码的内容就比较自由，里面不止可以存数字，还可以存任何的字符串。我们可以认为，它就是字符的另外一种表现形式。

下面我通过一个网站把文字转成了二维码：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-miansgrhsxsmdlgn-3fd81eb5-5c0e-454a-a96a-b6f78612ed9c.jpg)


所以，我们手机扫码这个过程，其实是对二维码的解码，获取二维码中包含的数据。

**那么二维码怎么生成呢？**

首先，二维码是展示在我们的PC端，所以生成这个操作应该由PC端去请求服务端，获取相应的数据，再由PC端生成这个二维码。

**二维码包含什么呢？**

二维码在我们这个场景里面是一个重要的媒介，服务端必须给这个数据生成惟一的标识作为二维码ID，同时还应该设置过期的时间。PC端根据二维码ID等数据生成二维码。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-miansgrhsxsmdlgn-38073c93-678a-4f19-9db2-cf89acb4295e.jpg)


同时，服务端也应该保存二维码的一些状态：`未扫描`、`已成功`、`已失效`。

#### APP认证机制

我们还得认识一下基于APP的移动互联网认证机制。

首先，手机端一般是不会存储登录密码的，我们我们发现，只有装载APP，第一次登录的时候，才需要进行基于账号密码的登录，之后即使这个清理掉这个应用进程，甚至手机重启，都是不需要再次输入账号密码的，它可以自动登录。

这背后有一套基于token的认证机制，和PC有些类似，但又有一些不同。

![APP端登录认证](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-miansgrhsxsmdlgn-aabd9efb-073a-40ca-bf89-9f04add94dbc.jpg)



*   APP登录认证的时候除了账号密码，还有设备信息
*   账号密码校验通过，服务端会把账号与设备进行一个绑定，进行持久化的保存，包含了账号ID，设备ID，设备类型等等
*   APP每次请求除了携带token key，还需要携带设备信息。

因为移动端的设备具备唯一性，可以为每个客户端生成专属token，这个token也不用过期，所以这就是我们可以一次登录，长久使用的原理。

#### 手机扫码干了什么

那这下就清楚了，我们手机扫码干了两件事：

*   `扫描二维码`：识别PC端展示的二维码，获取二维码ID

![扫描](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-miansgrhsxsmdlgn-2b1e6388-651c-455a-8b53-48d21d01f328.jpg)



*   `确认登录`：手机端通过带认证信息(token key、设备信息)、二维码信息（二维码ID）请求服务端，完成认证过程，确认PC端的登录。

![确认登录](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-miansgrhsxsmdlgn-64710a20-1dab-4070-b276-62b237b53d29.jpg)



> ps: 关于手机扫码和确认，不是重点，所以这里进行了简化，一种说法是扫码时同时向服务端申请一次性临时token，确认登录的时候携带这个临时token来访问服务端。

### PC端如何完成登录

接下来到我们的重头戏了，手机端完成了它的工作，我们服务端的登录怎么进入登录状态呢？

我们前面讲了，PC端通过token来标识登录状态。那么手机端扫码确认之后，我们的服务端就应该给PC生成相应的token。

那么，这个PC端又如何获取它所需的token key，来完成登录呢？

![如何获取PC token](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-miansgrhsxsmdlgn-ec79824f-70fe-41f2-a68d-69253f6d3f02.jpg)



PC端可以通过获取二维码的状态来进行相应的响应：

*   二维码`未扫描`：无操作
*   二维码`已失效`：提示刷新二维码
*   二维码`已成功`：从服务端获取PC token

获取二维码状态，主要有三种方式：

#### 轮询

轮询方式是指客户端会每隔一段时间就主动给服务端发送一次二维码状态的查询请求。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-miansgrhsxsmdlgn-577a805c-f8f0-435c-bce2-1ddd7fc37a17.jpg)

#### 长轮询

长轮询是指客户端主动给服务端发送二维码状态的查询请求，服务端会按情况对请求进行阻塞，直至二维码信息更新或超时。当客户端接收到返回结果后，若二维码仍未被扫描，则会继续发送查询请求，直至状态变化（已失效或已成功）。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-miansgrhsxsmdlgn-7b93c013-3f28-4ef1-81e0-a7260257d7e5.jpg)


#### Websocket

Websocket是指前端在生成二维码后，会与后端建立连接，一旦后端发现二维码状态变化，可直接通过建立的连接主动推送信息给前端。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-miansgrhsxsmdlgn-0aec0448-7820-4082-a2a4-7ea0524a3154.jpg)

## 总结

通过前面的分析，我们已经知道了二维码扫码登录的一些关键点，现在我们把这些点串起来，来看一看二维码扫码登录的整体的实现流程。

以常用的轮询方式获取二维码状态为例：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-miansgrhsxsmdlgn-c14345f7-c073-46a0-9d53-0408c01a742f.jpg)


1.  访问PC端二维码生成页面，PC端请求服务端获取`二维码ID`
2.  服务端生成相应的`二维码ID`，设置二维码的过期时间，状态等。
3.  PC获取`二维码ID`，生成相应的二维码。
4.  手机端扫描二维码，获取`二维码ID`。
5.  手机端将`手机端token`和`二维码ID`发送给服务端，确认登录。
6.  服务端校验`手机端token`，根据`手机端token`和`二维码ID`生成`PC端token`
7.  PC端通过轮询方式请求服务端，通过`二维码ID`获取二维码状态，如果已成功，返回`PC token`，登录成功。

好了，这样我们一个扫描登录的功能就设计完成了。

>参考链接：[https://mp.weixin.qq.com/s/nVWIPEzlpRdZjLTEFDdMxA](https://mp.weixin.qq.com/s/nVWIPEzlpRdZjLTEFDdMxA)，出处：三分恶，整理：沉默王二
