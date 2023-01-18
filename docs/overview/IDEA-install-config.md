---
title: 安装集成开发环境Intellij IDEA
shortTitle: 安装集成开发环境IDEA
category:
  - Java核心
tag:
  - Java概述
description: Java程序员进阶之路，小白的零基础Java教程，Intellij IDEA的安装和配置
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,Intellij IDEA安装,IDEA安装,idea,Intellij IDEA
---

## 2.5 安装集成开发环境Intellij IDEA

IntelliJ IDEA 简称 IDEA，是业界公认为最好的 Java 集成开发工具，尤其是在代码自动提示、代码重构、代码版本管理、单元测试、代码分析等方面有着亮眼的发挥。

IDEA 产于捷克，开发人员以严谨著称的东欧程序员为主，分为社区版和付费版两个版本。如果只是学习 Java SE 社区版就足够用了。想要更多功能的话，比如说 Spring initializr 功能，需要下载付费版。

回想起我最初学 Java 的时候，老师要求我们在记事本上敲代码，在命令行中编译和执行 Java 代码，搞得全班三分之二的同学都做好了放弃学习 Java 的打算。

鉴于此，我强烈推荐大家使用集成开发工具，比如说 IntelliJ IDEA 来学习。

为了照顾到刚学 Java 的零基础的宝宝，我这里把 macOS 系统和 Windows 系统都介绍一下，真手摸手教你学 Java 系统。

（你应该知道自己的电脑是 Windows 还是 macOS 吧？什么？你是 Linux 系统，不好意思，你可以跳过这个章节了。）

### 一、Windows

#### 01、下载 IDEA

IntelliJ IDEA 的官方下载地址为：[https://www.jetbrains.com/idea/download/](https://www.jetbrains.com/idea/download)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-d7ac2335-4c65-442c-931e-994e00db4235.png)


UItimate 为付费版，可以免费试用，主要针对的是 Web 和企业开发用户；Community 为免费版，可以免费使用，主要针对的是 Java 初学者和安卓开发用户。

功能上的差别如下图所示。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-43e0ec45-acee-4c18-b0ff-ac7f4fc054f9.png)

本篇教程主要针对的是 Java 初学者，所以选择免费版为例，点击「Download」进行下载。

稍等一分钟时间，大概 580M。

#### 02、安装 IDEA

双击运行 IDEA 安装程序，一步步傻瓜式的下一步就行了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-8d0b11b3-99da-45c5-b9c3-a5d4e26077b5.png)


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-3747b308-9b27-4068-9c47-46bc7098f8d4.png)


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-5765a40b-e3c1-4021-b1de-73ae27774008.png)

为了方便启动 IDEA，可以勾选【64-bit launcher】复选框。为了关联 Java 源文件，可以勾选【.java】复选框。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-15b6f6f4-308d-41d8-869a-4eb625f65eb0.png)

点击【Install】后，需要静静地等待一会，大概一分钟的时间，趁机休息一下眼睛。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-2a80c17a-dbb6-4411-b88b-5bf1398db411.png)

安装完成后的界面如下图所示。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-2afe2860-e3ef-4370-a0a5-f0075487f159.png)

#### 03、启动 IDEA

回到桌面，双击运行 IDEA 的快捷方式，启动 IDEA。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-937da9b9-56e3-4970-ab50-e24f4b3549da.png)

假装阅读完条款后，勾选同意复选框，点击【Continue】

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-0426d0d2-26eb-4376-bcaa-cede00fc2622.png)

如果想要帮助 IDEA 收集改进信息，可以点击【Send Usage Statistics】；否则点击【Don't send】。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-b880a884-dbf5-4ce8-b0c1-345d60c72eff.png)


到此，Intellij IDEA 的安装就完成了，很简单。

### 二、macOS

#### 01、下载 IDEA

1.  打开 [https://www.jetbrains.com/idea/](https://www.jetbrains.com/idea/download/#section=mac)，点击Download按钮

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-38cc7637-ed3f-44c0-b244-aafafd3634b6.png)

2.  选择 Community 版本（也就是社区版、免费版了，旗舰版需要激活，你可以戳这里[激活](https://tobebetterjavaer.com/nice-article/itmind/)）。
  
确定后点击 Download 下载

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-b17d0ff0-d33c-4d19-86e0-cd491c0cc613.png)


如何查看 Mac 电脑是 Intel 还是 Apple Silicon 的 CPU？

在 Mac 上，单击菜单栏左上角的\[Apple\]图标，然后选择“关于本机”（About This Mac）选项。

- 如果在“芯片”部分中看到Apple M1（或更高版本），则意味着使用的是带有\[Apple Silicon CPU\]的Mac。
- 如果在“处理器”部分中看到英特尔处理器，则表示正在使用带有英特尔芯片的Mac。

瞧，我这里就是英特尔芯片的（Intel）。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-3977e9b4-9c26-4e00-bc88-1ac1f2f89d5e.png)


3.  打开如下页面，IntelliJ IDEA 便会开始自动下载。若未开始自动下载，可以点击如下红框内的 direct link。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-5b074f76-71c7-405e-871e-de1ee1d6376e.png)


中文页面如下所示：

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-f88924e5-6470-4d44-8f85-922875a3c565.png)

4.  IntelliJ IDEA下载完成，在下载文件夹内便会出现 ideaIC-2020.3.2.dmg 的文件。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-7aec8534-ea7b-41f5-bc68-e6d2fb20e6c1.png)

#### 02、安装 IDEA

1.  双击 ideaIC-2020.3.2.dmg 文件开始安装

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-23195fb7-3a1c-4466-bf17-4f681ef0be5e.png)

2.  把 IntelliJ IDEA CE.app 拖入 Applications 文件夹

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-7bd55d3b-54ce-4e4e-8e21-aa94f15d105a.png)

3.  在 Applications 中可以找到 IntelliJ IDEA CE.app，说明安装完成

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-96c1a054-8429-416a-ad5d-7fa3f360c19f.png)

#### 03、打开 IDEA

首次打开 IntelliJ IDEA 后展现的第一个页面如下所示。至此，IntelliJ IDEA下载、安装和打开就搞定了。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-7637a241-8524-4e0a-bb2a-a3bd1c575c9a.png)


-----

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)