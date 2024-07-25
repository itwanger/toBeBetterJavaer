---
title: 分享 1 个可以在 IDEA 里下五子棋的插件
shortTitle: 1个可以在IDEA里下五子棋的插件
category:
  - 开发/构建工具
tag:
  - IDEA
description: 在 IDEA 里下个五子棋不过分吧？
head:
  - - meta
    - name: keywords
      content: Intellij IDEA,IDEA,IDEA插件
---


大家好，我是二哥呀！今天给大家分享一个基于Netty的IDEA即时聊天插件，可以实现即时聊天、游戏对战（下棋）。

>GitHub 地址：[https://github.com/anlingyi/xechat-idea](https://github.com/anlingyi/xechat-idea)


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/xechat-b39a3088-d4aa-47b0-984d-875eb34cd82d.png)

## 安装体验

打开 Intellij IDEA，依次 `Preference > Plugins > 设置按钮 > Manage Plugin Repositories...` 添加 XEChat-Idea 插件库。

>地址：[http://plugins.xeblog.cn](http://plugins.xeblog.cn)


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/xechat-a6259f78-ded1-4aa9-aa35-3b7bc3ad823b.png)

之后搜索关键字「xechat」安装插件。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/xechat-4169833e-5ed6-47f5-8e8c-03ea92400bc9.png)

重启 Intellij IDEA 后在右下角找到 xechat 面板。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/xechat-a03023a2-0a7b-42d5-8fd6-67c494ef83b3.png)

## 功能介绍

第一次打开后，会提示对应命令。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/xechat-0de879be-2a64-4c85-b9ee-e92500a0a907.png)

输入 `#login 沉默王二` 就可以登录了。 之后就可以把天聊起来了。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/xechat-020bfafc-8874-4fda-a9a0-b9ac9d628234.png)

使用复制粘贴还可以发送图片，虽然体验比较迟钝，延迟比较高，但真的是**又不是不能用**。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/xechat-5570fa5f-88d3-4f4f-882b-89a30bb9ef19.png)

## 开始游戏

输入 `#showGame` 可以查看支持的游戏，目前支持五子棋、斗地主两种游戏。

输入 `#play 0` 开启五子棋启动面板。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/xechat-aff1ec60-b56e-4ab2-8e2f-237160eeb68c.png)

卧槽，第一局竟然输了！

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/xechat-bca643f7-8615-4c12-ab05-f65600fbcfde.png)

我太菜了，要怪只能怪作者设置的这个棋盘设置得太小了，竟然布局不能调整，哼。

呵呵呵，果不其然，放大以后再来一盘，稳稳赢了。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/xechat-529c038d-d4a2-43fa-90f9-827648ebf6f7.png)

嘿嘿，果然爽。

## 部署服务端

直接在 Intellij IDEA 中运行 xechat 插件的话，是共享的 xechat 的服务器，这不，竟然遇到了作者，竟然还是二哥的读者。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/xechat-45ff0d90-c777-47b9-8b18-b26c44e4c3f1.png)

想要自己在本地把服务跑起来也很简单，从 GitHub 仓库把源代码拉到本地。

先进入 xechat-commons 包执行 `mvn install`，公共模块需优先打包。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/xechat-490a3ed3-628a-47a9-b262-c0bff8259f89.png)

再进入 xechat-server 包执行 `mvn package` 打包。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/xechat-f6611304-1293-4ad2-97a5-9a685fc64575.png)

之后执行 `java -jar target/xechat-server-xxx.jar -p 1024` 运行服务端。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/xechat-8f2524b0-dfaf-43ff-be3b-b71763ffcdcf.png)

再次进入 Intellij IDEA 的 xechat 面板，输入 `#login -h 127.0.0.1 -p 1024` 就可以连上本地服务了。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/xechat-0df4b0c3-dfae-4b15-9f0b-ff0b9326e0bc.png)

OK，搞定。

## 学习源码

之前有小伙伴问我 JavaSE 部分的源码有没有推荐的，那这个 xechat 就是非常不错的选择。

我 down 到本地看了一下，代码整体来说还是非常优秀的，尤其是 Netty 部分，是非常值得参考和借鉴的。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/xechat-1d8e2c9f-14d9-486d-939f-75643d896a59.png)

可以直接从 main 方法开始，一路 debug 下去看一看，我觉得是一个挺不错的选择。


----

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

