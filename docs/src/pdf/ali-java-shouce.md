---
title: 👏下载→阿里巴巴Java开发手册
shortTitle: 👏下载→阿里巴巴Java开发手册
category:
  - PDF
tag:
  - PDF
description: 最新阿里巴巴Java开发手册-黄山版
head:
  - - meta
    - name: keywords
      content: Java 开发手册,阿里巴巴 Java 开发手册黄山版,阿里开发手册,阿里 Java 开发手册,java 开发手册pdf
---

说起嵩山，我就想起乔峰，想起慕容复，以及他们两位老爹在少林寺大战的场景。当然了，最令我印象深刻的就是那位默默无闻，却一鸣惊人的扫地僧啊。这次，阿里出品的嵩山版 Java 开发手册的封面就有一个扫地僧，唉，这就厉害了呀！

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

嵩山少林寺位于河南省登封市，始建于北魏太和十九年，号称“天下第一名刹”。这意味着什么？阿里出品的嵩山版 Java 开发手册，是迄今为止最重量级的。

上个版本叫泰山版，更新于 2020 年 4 月 22 号，版本出来的第一时间，我就给大家分享了。我相信，看过的小伙伴一定大有所获。毕竟《阿里巴巴 Java 开发手册》这本小册子虽然只有几十页，但讲的主要是一些典型的开发规约、编程规范、以及最佳实践，已经成为业界普遍遵循的开发规范。

那新版主要更新了哪些内容呢？我来挑一些重点，和大家分享下。

## 01、新增前后端规约 14 条

前后端我都开发过，所以就挑一些我认为比较关键的规约来给大家推荐一下。好的规约能够让前后端工程师在开发的过程中减少很多不必要的麻烦，毕竟现在都追求前后端分离，接口对接的过程中就必须得有一定的规则遵守，不然扯起皮了就不妙了。

*   前后端交互的 API，需要明确协议、域名、路径、请求方式、请求内容、状态码、响应体。
*   前后端数据列表相关的接口，如果为空，就是没有数据的时候，应该返回空数组 \[\] 或者空集合 {}，这样可以省去判 null 的操作。
*   服务端发生错误时，返回给前端的响应信息必须包含 HTTP 状态码，errorCode、 errorMessage（方便追踪错误）、用户提示信息四个部分。
*   涉及到超大整数的场景，服务端应该使用 String 类型返回，避免使用 Long。
*   服务端返回的数据，尽量使用 JSON 而非 XML 格式。

## 02、新增禁止任何歧视性用语的约定

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-sulwgalcpdssbjavakfsc-8cc71cfc-e133-41bd-94b6-a2b27d6f3758.jpg)

虽然互联网越来越开放，但有些用语还是要注意一下（尽量和谐）。记得之前 MySQL 的一些关键字都被迫做了调整。

## 03、新增涉及敏感操作的情况下日志需要保存六个月的约定

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-sulwgalcpdssbjavakfsc-3209b64a-9b20-4f70-8028-d9b089164caa.jpg)

涉及到法律的地方还是在开发的时候注意一下。

## 04、修正 BigDecimal 类中关于 compareTo 和 equals 的等值比较

关于这一点，我之前在文章里详细地阐述了，浮点数之间的比较不能使用“==”操作符，而 BigDecimal 之间不能使用 `equals()` 比较。

[我去，脸皮厚啊，竟然使用==比较浮点数？](https://mp.weixin.qq.com/s?__biz=MzIxNzQwNjM3NA==&mid=2247488219&idx=1&sn=a847557dae132769797fe19181957c03&scene=21#wechat_redirect)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-sulwgalcpdssbjavakfsc-158bd290-5df1-4df8-ab59-ada0f57a7516.jpg)

## 05、修正 HashMap 关于 1024 个元素扩容的次数

泰山版说是扩容 7 次。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-sulwgalcpdssbjavakfsc-c2dbe80a-aee4-40e9-9448-0a243d35ea7d.jpg)

嵩山版修正为扩容 8 次。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-sulwgalcpdssbjavakfsc-1cf3c985-9748-4e83-9473-11356bb566df.jpg)

## 06、修正架构分层规范与相关说明

泰山版的应用分层如下图所示。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-sulwgalcpdssbjavakfsc-9a08658c-a8f7-4af6-a7b4-63f1bd0f9edd.jpg)

嵩山版的应用分层修改为如下图所示。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-sulwgalcpdssbjavakfsc-33efc94e-746c-4e7e-961c-2bf95b14a371.jpg)

## 07、最后

如果你想成为一名优秀的 Java 工程师，那么这份手册上的内容几乎是必须要掌握的。是不是已经迫不及待想要下载这份手册了？

微信搜索「**沉默王二**」回复「**手册**」就可以免费获取了，当然你也可以扫描下面的二维码后回复，赶紧赶紧。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

最后，我衷心地祝福你，希望你能学有所成，to be better，奥利给！


