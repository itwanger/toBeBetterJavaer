---
category:
  - 知识库搭建
tag:
  - 知识库搭建
title: 购买域名&域名解析
shortTitle: 购买域名&域名解析
---

购买域名可以通过多个服务商，比如说阿里云、百度云、腾讯云。

我这里以阿里云为例，购入一个 [tobebetterjavaer.com](https://tobebetterjavaer.com/) 的域名（寓意 Java程序员进阶之路）。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/szjy/tobebetterjavaer-yuming-jiexi-02.png)

在此之前呢，我已经购买了一台阿里云的服务器，2核4G内存的轻量级云服务器。就是[上次带大家白票的那波](https://tobebetterjavaer.com/szjy/buy-cloud-server.html)，我自己也购入了一台。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/szjy/tobebetterjavaer-yuming-jiexi-03.png)

这台服务器上目前已经安装了[宝塔面板](https://tobebetterjavaer.com/szjy/install-baota-mianban.html)、[Nginx](https://tobebetterjavaer.com/nginx/nginx.html)，并且可以通过 IP 地址成功访问 80 端口。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/szjy/tobebetterjavaer-yuming-jiexi-04.png)

我想做什么呢？

**我希望可以通过域名直接访问而不是 IP**！

直接在浏览器地址栏里输入域名访问肯定是不行的。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/szjy/tobebetterjavaer-yuming-jiexi-05.png)

那该怎么办呢？

进行**域名解析**。当我们购买了一台云服务器后，系统会默认给这台服务器分配一个已经绑定的 IP 地址。但由于 IP 地址是由数组组成的，不方便记忆，所以就使用域名来代替。

那**域名解析**就是把域名指向网站的 IP 地址，让用户通过域名就可以访问到网站的一种服务。

阿里云是通过云解析 DNS 提供域名解析服务的。DNS，全称 Domain Name System，也就是域名系统，是一个将域名和IP地址相互映射的分布式数据库，以便用户访问互联网。

云解析 DNS 支持 A、AAAA 、CNAME 等记录类型。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/szjy/tobebetterjavaer-yuming-jiexi-06.png)

进入域名控制台，选择要解析的域名，点击「解析」会跳转到解析设置页面。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/szjy/tobebetterjavaer-yuming-jiexi-07.png)

直接点击「新手指导」按钮，填写服务器的 IP 地址。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/szjy/tobebetterjavaer-yuming-jiexi-08.png)

该方法可以同时添加 www 和 @ 记录，成功后，可以通过带 www 和不带 www 的方式访问网站。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/szjy/tobebetterjavaer-yuming-jiexi-09.png)

- 主机记录 @ 表示可以直接通过不带 www 的域名访问，也就是 [tobebetterjavaer.com](https://tobebetterjavaer.com/)；
- 主机记录 www 表示可以带 www 的域名访问，也就是 [www.tobebetterjavaer.com](https://tobebetterjavaer.com/)

TTL 为缓存时间，数值越小，表示修改记录生效的时间越快，默认为10分钟。

记得对域名进行实名认证，认证通过后（否则域名会处于锁定状态 serverhold），再次刷新页面，就可以访问成功了！

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/szjy/tobebetterjavaer-yuming-jiexi-10.png)

nice！

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
