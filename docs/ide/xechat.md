---
title: 在 IDEA 里下个五子棋不过分吧？
shortTitle: 在IDEA里下五子棋
category:
  - Java企业级开发
tag:
  - Intellij IDEA
  - IDEA
  - Intellij IDEA 插件
  - IDEA 插件
description: 在 IDEA 里下个五子棋不过分吧？
head:
  - - meta
    - name: keywords
      content: Intellij IDEA,IDEA,Intellij IDEA 插件,IDEA 插件
    - name: description
      content: 在 IDEA 里下个五子棋不过分吧？
---


大家好，我是二哥呀！

今天给大家分享一个基于Netty的IDEA即时聊天插件，可以实现即时聊天、游戏对战（下棋）。

>GitHub 地址：[https://github.com/anlingyi/xechat-idea](https://github.com/anlingyi/xechat-idea)


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/xechat-b39a3088-d4aa-47b0-984d-875eb34cd82d.png)

## 安装体验

打开 Intellij IDEA，依次 `Preference > Plugins > 设置按钮 > Manage Plugin Repositories...` 添加 XEChat-Idea 插件库。

>地址：[http://plugins.xeblog.cn](http://plugins.xeblog.cn)


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/xechat-a6259f78-ded1-4aa9-aa35-3b7bc3ad823b.png)

之后搜索关键字「xechat」安装插件。


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/xechat-4169833e-5ed6-47f5-8e8c-03ea92400bc9.png)

重启 Intellij IDEA 后在右下角找到 xechat 面板。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/xechat-a03023a2-0a7b-42d5-8fd6-67c494ef83b3.png)

## 功能介绍

第一次打开后，会提示对应命令。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/xechat-0de879be-2a64-4c85-b9ee-e92500a0a907.png)

输入 `#login 沉默王二` 就可以登录了。 之后就可以把天聊起来了。


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/xechat-020bfafc-8874-4fda-a9a0-b9ac9d628234.png)

使用复制粘贴还可以发送图片，虽然体验比较迟钝，延迟比较高，但真的是**又不是不能用**。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/xechat-5570fa5f-88d3-4f4f-882b-89a30bb9ef19.png)

## 开始游戏

输入 `#showGame` 可以查看支持的游戏，目前支持五子棋、斗地主两种游戏。

输入 `#play 0` 开启五子棋启动面板。


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/xechat-aff1ec60-b56e-4ab2-8e2f-237160eeb68c.png)

卧槽，第一局竟然输了！

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/xechat-bca643f7-8615-4c12-ab05-f65600fbcfde.png)

我太菜了，要怪只能怪作者设置的这个棋盘设置得太小了，竟然布局不能调整，哼。

呵呵呵，果不其然，放大以后再来一盘，稳稳赢了。


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/xechat-529c038d-d4a2-43fa-90f9-827648ebf6f7.png)

嘿嘿，果然爽。

## 部署服务端

直接在 Intellij IDEA 中运行 xechat 插件的话，是共享的 xechat 的服务器，这不，竟然遇到了作者，竟然还是二哥的读者。


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/xechat-45ff0d90-c777-47b9-8b18-b26c44e4c3f1.png)

想要自己在本地把服务跑起来也很简单，从 GitHub 仓库把源代码拉到本地。

先进入 xechat-commons 包执行 `mvn install`，公共模块需优先打包。


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/xechat-490a3ed3-628a-47a9-b262-c0bff8259f89.png)

再进入 xechat-server 包执行 `mvn package` 打包。


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/xechat-f6611304-1293-4ad2-97a5-9a685fc64575.png)

之后执行 `java -jar target/xechat-server-xxx.jar -p 1024` 运行服务端。


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/xechat-8f2524b0-dfaf-43ff-be3b-b71763ffcdcf.png)

再次进入 Intellij IDEA 的 xechat 面板，输入 `#login -h 127.0.0.1 -p 1024` 就可以连上本地服务了。


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/xechat-0df4b0c3-dfae-4b15-9f0b-ff0b9326e0bc.png)

OK，搞定。

## 学习源码

之前有小伙伴问我 JavaSE 部分的源码有没有推荐的，那这个 xechat 就是非常不错的选择。

我 down 到本地看了一下，代码整体来说还是非常优秀的，尤其是 Netty 部分，是非常值得参考和借鉴的。


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/xechat-1d8e2c9f-14d9-486d-939f-75643d896a59.png)

可以直接从 main 方法开始，一路 debug 下去看一看，我觉得是一个挺不错的选择。


## ending

一个人可以走得很快，但一群人才能走得更远。欢迎加入[二哥的编程星球](https://mp.weixin.qq.com/s/3RVsFZ17F0JzoHCLKbQgGw)，里面的每个球友都非常的友善，除了鼓励你，还会给你提出合理的建议。



![基本上所有问题球友都能给出答案](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/xechat-a97b7195-7644-436b-872c-8855932aa0e6.png)



星球提供的三份专属专栏《Java 面试指南》、《编程喵🐱（Spring Boot+Vue 前后端分离）实战项目笔记》、《Java 版 LeetCode 刷题笔记》，干货满满，价值连城。


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/xechat-1b66f9ac-b530-4f66-8edf-39359ef02340.png)


已经有 **420 多名** 小伙伴加入[二哥的编程星球](https://mp.weixin.qq.com/s/3RVsFZ17F0JzoHCLKbQgGw)了，如果你也需要一个良好的学习氛围，[戳链接](https://mp.weixin.qq.com/s/3RVsFZ17F0JzoHCLKbQgGw)加入我们的大家庭吧！这是一个 Java 学习指南 + 编程实战 + LeetCode 刷题的私密圈子，你可以向二哥提问、帮你制定学习计划、跟着二哥一起做实战项目，冲冲冲。


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/xechat-aebece5e-86a1-4950-a2b4-bd6c20dbc030.png)



---

*没有什么使我停留——除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟*。


**本文已收录到 GitHub 上星标 2.9k+ 的开源专栏《Java 程序员进阶之路》，据说每一个优秀的 Java 程序员都喜欢她，风趣幽默、通俗易懂。内容包括 Java 基础、Java 并发编程、Java 虚拟机、Java 企业级开发（Git、Nginx、Maven、Intellij IDEA、Spring、Spring Boot、Redis、MySql 等等）、Java 面试等核心知识点。学 Java，就认准 Java 程序员进阶之路**😄。

[https://github.com/itwanger/toBeBetterJavaer](https://github.com/itwanger/toBeBetterJavaer)

star 了这个仓库就等于你拥有了成为了一名优秀 Java 工程师的潜力。


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png)
