---
title: 5分钟带你深入浅出搞懂 Nginx
shortTitle: Nginx 入门
category:
  - Java企业级开发
tag:
  - Nginx
description: 本文是一篇通俗易懂、风趣幽默的 Nginx 入门教程，内容涵盖 Nginx 是什么、Nginx 的作用、Nginx 的安装、Nginx 的常用命令、Nginx 的配置、Nginx 的学习资料等知识点。学 Nginx，就认准二哥的 Java 进阶之路😄。
head:
  - - meta
    - name: keywords
      content: nginx,nginx入门,nginx教程,nginx配置,nginx反向代理,nginx负载均衡,nginx动静分离
---

大家好，我是二哥呀。最近在搭建[技术派](https://paicoding.com/)网站，就不可避免地要用到 Nginx，索性就出一期 Nginx 的入门教程，希望也可以帮助到大家~😁

作为开发者，相信大家都知道 Nginx 的重要性。Nginx 是一个高性能的 HTTP 和反向代理 Web 服务器，由俄罗斯的伊戈尔·赛索耶夫开发，第一个版本发布于 2004 年 10 月 4 日。

![](https://cdn.paicoding.com/tobebetterjavaer/images/nginx/nginx-01.png)


Nginx 的特点是：

- 内存占用少
- 并发能力强（可支持大约 50000 个并发连接）
- 配置超简洁
- bug 非常少
- 安装超简单
- 服务特别稳（几个月也不需要重启）

基于这些特点，越来越多的网站开始使用 Nginx。于是，掌握 Nginx 就变成了开发者的一项必不可少的技能。

## 一、Nginx 的作用

**反向代理**是 Nginx 作为 Web 服务器最常用的功能之一。什么是反向代理呢？很多初学者在第一次遇到这个名词的时候总免不了出现很多问号。

![](https://cdn.paicoding.com/tobebetterjavaer/images/nginx/nginx-02.png)

那要想搞明白什么是反向代理，就必须得搞明白什么是正向代理。

举个例子，小二的浏览器是无法直接访问谷哥的，但香港的代理服务器是可以访问谷哥的，于是小二访问了香港的代理服务器，也就间接地访问了谷哥。那这台代理服务器也就是**正向代理**。

![](https://cdn.paicoding.com/tobebetterjavaer/images/nginx/nginx-03.png)

总结一句就是，**正向代理是代理客户端的**，让你能正常访问目的服务器。

与之相反，**反向代理是代理服务器的**，让大量的请求均衡地访问到某一台服务器上。

举个例子，10 万个小二同时在访问 [itwanger.com](https://www.itwanger.com/)， 如果只有一台服务器的话，很容易就瘫痪了，于是高并发的情况下会有很多台服务器（假如 10 台吧）来接这个活，那怎么让 10 万个小二访问到这 10 台服务器呢？

这就需要一个反向代理服务器了，反向代理服务器让 1 万个小二访问服务器 A，1 万个小二访问服务器 B，1 个小二访问服务器 C，这样的话，每台服务器的压力就相应减小了，是不是很 nice？

![](https://cdn.paicoding.com/tobebetterjavaer/images/nginx/nginx-04.png)

那问题来了。每台服务器的能力可能不同，比如说服务器 A 的内存比较大一点，有 100 个 G；服务器 B 的内存小一点，有 10 个 G；服务器 C 的内存更小一点，只有 1 个 G。怎么才能让没台服务器承担起它能力范围内的访问呢？

**Nginx 内置了轮询和加权轮询来达到负载均衡的目的**。服务器 A 牛逼就把它的权重加大一点，让 5 万个小二访问它；服务器 B 弱一点，权重就再小一点，让 2 万个小二访问它；服务器 C 更弱，权重就最小，让 1 万个小二访问它。

除此之外，Nginx 还有一个很牛逼的功能是**动静分离**。

在我们的软件开发中，有些请求是需要后台处理的；有些请求是不需要后台处理的，比如说 css、js 这些文件请求，这些不需要经过后台处理的文件就叫静态文件。

我们可以根据一些规则，把动态资源和静态资源分开，然后通过 Nginx 把请求分开，静态资源的请求就不需要经过 Web 服务器处理了，从而提高整体上的资源的响应速度。

![](https://cdn.paicoding.com/tobebetterjavaer/images/nginx/nginx-05.png)

## 二、Nginx 的安装

针对不同的操作系统，Nginx 的安装各不相同。

### Windows

Windows 可以直接到官网下载 zip 绿色安装包，解压后就可以了。

>[http://nginx.org/en/download.html](http://nginx.org/en/download.html)

### macOS

macOS 可以通过 Homebrew 来安装，之前没有安装的话可以戳[这个链接](https://javabetter.cn/gongju/brew.html)，终端的话，建议大家使用 [wrap](https://javabetter.cn/gongju/warp.html)，有 AI 提示，非常方便。

安装命令如下：

```
brew install nginx
```

大体的过程就是，你问一下 wrap，我怎么安装 Nginx 啊，它就会告诉你完整的安装和启动步骤，并且会告诉你 Nginx 的配置文件在哪里。

![](https://cdn.paicoding.com/stutymore/nginx-20231209205522.png)

如果端口不是 80 的话，可以在配置文件里进行修改，比如说我改成了 8088。

那安装成功后就可以通过 `http://localhost:8088` 来访问了。

![](https://cdn.paicoding.com/stutymore/nginx-20231209205810.png)

### Linux

Linux 的安装方式有很多种，每一家的服务器厂商都会有 doc 文档。比如说[腾讯云](https://curl.qcloud.com/gIsvte7E)的你搜一下 Nginx 关键字就可以看到了。

![](https://cdn.paicoding.com/stutymore/nginx-20231209210202.png)

我这里以 macOS 环境为例，来演示一下。

第一步，通过 `brew info nginx` 命令查看 Nginx 是否安装。

![](https://cdn.paicoding.com/tobebetterjavaer/images/nginx/nginx-07.png)

第二步，通过 `brew install nginx` 命令安装 Nginx。

![](https://cdn.paicoding.com/tobebetterjavaer/images/nginx/nginx-08.png)

从以上信息可以得出：

- 根目录是 `/usr/local/var/www`
- 配置文件是 `/usr/local/etc/nginx/nginx.conf`
- 默认端口是 8080

第三步，通过 `nginx` 命令启动 Nginx。

![](https://cdn.paicoding.com/tobebetterjavaer/images/nginx/nginx-09.png)

第四步，在浏览器地址栏通过 `localhost:8080` 访问，可以看到以下欢迎页面。

![](https://cdn.paicoding.com/tobebetterjavaer/images/nginx/nginx-10.png)

## 三、Nginx 常用命令

通常来说，Nginx 一旦启动后，我们是很少让它退出的，使用最多的就是 reload 命令。当我们修改了配置文件，是需要执行一次 reload 命令让 Nginx 生效的。

```
nginx  启动
nginx -s stop  停止
nginx -s quit  安全退出
nginx -s reload  重新加载配置文件
nginx -t  检查配置文件是否正确
ps aux|grep nginx  查看nginx进程
```

重点强调一下 `nginx -t` 命令，这个命令可以检查配置文件是否正确，如果正确的话，会输出以下信息。

```
nginx: the configuration file /usr/local/etc/nginx/nginx.conf syntax is ok
nginx: configuration file /usr/local/etc/nginx/nginx.conf test is successful
```

假如你忘记配置文件的位置，那这个命令就实在是太有用了。

另外，Nginx 的 reload 对用户是无感的，这一点我觉得很牛逼，你重启了 Nginx，但用户就仿佛没有感觉，还在继续访问网站，这就是 Nginx 的优势。

## 四、Nginx 的配置

我们先来看一下 Nginx 的配置结构图：

```
main        # 全局配置
├── events  # 配置网络连接
├── http    # 配置代理、缓存、日志等
│   ├── upstream # 配置负载均衡
│   ├── server   # 配置虚拟主机，可以有多个 server
│   ├── server
│   │   ├── location  # 用于匹配 URI（URL 是 URI 的一种），可以有多个 location
│   │   ├── location
│   │   └── ...
│   └── ...
└── ...
```

再把 Nginx 的默认配置拉出来看一下，我把注释加了进去，这样大家很容易就明白这行配置是用来干嘛的了。

```
worker_processes  1; # Nginx 进程数，一般设置为和 CPU 核数一样

events {
    worker_connections  1024; # 每个进程允许最大并发数
}

http {
    include       mime.types; # 文件扩展名与类型映射表
    default_type  application/octet-stream;

    sendfile        on; # 开启高效传输模式
    keepalive_timeout  65; # 保持连接的时间，也叫超时时间，单位秒

    server {
        listen       8080; # 配置监听的端口
        server_name  localhost; # 配置的域名

        location / {
            root   html; # 网站根目录
            index  index.html index.htm; # 默认首页文件
        }

        error_page   500 502 503 504  /50x.html; # 默认50x对应的访问页面
        location = /50x.html {
            root   html;
        }
    }

    include servers/*; # 加载子配置项
}
```

接下来，我们以生产环境 Linux 为例。

由于我的服务器上 80 端口是默认打开的，所以我将监听端口配置成了 80，如果你配置成其他端口的话，记得云服务的安全组里把端口打开。

root 我指定了 `/home/www` 目录，首页文件为 index.html。这个文件是我自定义的，来看一下内容。

```
<!DOCTYPE html>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>沉默王二</title>
  <body>
    <img src="niubi.jpeg" />
  </body>
</html>
```

很言简意赅，总之就是二哥，牛逼~

好，保存配置文件，并且 reload Nginx，我们在本地的浏览器中输入服务器的 IP 地址就可以看到效果了。

![](https://cdn.paicoding.com/tobebetterjavaer/images/nginx/nginx-12.png)

## 五、Nginx 的学习资料

关于 Nginx 的负载均衡，还有动静分离，我们以后有机会再讲。Nginx 的入门非常简单，但有一说一，如果想要在工作中用好 Nginx，还是需要花费一番功夫的。

我这里再给大家推荐一些不错的学习资料吧。

**1）狂神说的视频入门教程**，我个人觉得，狂神的入门教程还是非常舒适的，语速和内容都刚刚好。

![](https://cdn.paicoding.com/tobebetterjavaer/images/nginx/nginx-13.png)

>https://www.bilibili.com/video/BV1F5411J7vK

**2）黑马程序员Nginx教程**，总共 159 讲，基本上算是非常全面的 Nginx 的视频教程了。

![](https://cdn.paicoding.com/tobebetterjavaer/images/nginx/nginx-14.png)

>https://www.bilibili.com/video/BV1ov41187bq

**3）极客时间上的 Nginx100 讲**，讲的比较深一点，涉及到不少原理层面的东西。钱包比较鼓的话，可以去付费下：[http://gk.link/a/12eru](http://gk.link/a/12eru)

**4）Nginx 从入门到实践，万字详解**，图文版的，可以到掘金上看看这篇文章，内容基本上面面俱到了（可以看一下下面的目录），配合前面的视频课，拿下 Nginx 基本上是稳了。

![](https://cdn.paicoding.com/tobebetterjavaer/images/nginx/nginx-15.png)

>https://juejin.cn/post/6844904144235413512

这些资料如果能全部过一遍的话，我要喊你 Nginx 小王子了，估计公司遇到 Nginx 问题的话，你肯定是解决问题的那一个。

----

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.paicoding.com/tobebetterjavaer/images/gongzhonghao.png)

