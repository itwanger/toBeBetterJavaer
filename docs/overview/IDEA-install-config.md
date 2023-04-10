---
title: 提升Java开发效率：在macOS和Windows上轻松安装Intellij IDEA
shortTitle: 安装IDEA
category:
  - Java核心
tag:
  - Java概述
description: 本文将为您提供在macOS和Windows操作系统上安装Intellij IDEA的详细步骤。通过本教程，您将快速掌握如何在不同平台上安装和配置Intellij IDEA，为Java开发搭建高效的编程环境。
head:
  - - meta
    - name: keywords
      content: Java,Intellij IDEA, 安装教程, macOS, Windows, Java开发环境, 配置, 跨平台IDE
---

# 2.3 安装 IDEA

IntelliJ IDEA 简称 IDEA，是业界公认为最好的 Java 集成开发工具，尤其是在代码自动提示、代码重构、代码版本管理、单元测试、代码分析等方面有着亮眼的发挥。

IDEA 产于捷克，开发人员以严谨著称的东欧程序员为主，分为社区版和付费版两个版本。如果只是学习 Java SE 社区版就足够用了。想要更多功能的话，比如说 Spring initializr 功能，需要下载付费版。

回想起我最初学 Java 的时候，老师要求我们在记事本上敲代码，在命令行中编译和执行 Java 代码，搞得全班三分之二的同学都做好了放弃学习 Java 的打算。

鉴于此，我强烈推荐大家使用集成开发工具，比如说 IntelliJ IDEA 来学习。

为了照顾到刚学 Java 的零基础宝宝，我这里把 macOS 系统和 Windows 系统的安装方法都介绍一下，真手摸手教学。

### 01、Windows

#### 下载 IDEA

IntelliJ IDEA 的官方下载地址为：[https://www.jetbrains.com/idea/download/](https://www.jetbrains.com/idea/download)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-d7ac2335-4c65-442c-931e-994e00db4235.png)

UItimate 为付费版，主要针对的是企业级开发用户；Community 为免费版，主要针对的是个人用户。

> 需要激活的戳这里[激活](https://tobebetterjavaer.com/nice-article/itmind/)

功能上的差别如下图所示。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-43e0ec45-acee-4c18-b0ff-ac7f4fc054f9.png)

这里选择免费版为例，点击「Download」进行下载。稍等一分钟时间，大概 580M。

#### 安装 IDEA

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

#### 启动 IDEA

回到桌面，双击运行 IDEA 的快捷方式，启动 IDEA。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-937da9b9-56e3-4970-ab50-e24f4b3549da.png)

假装阅读完条款后，勾选同意复选框，点击【Continue】

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-0426d0d2-26eb-4376-bcaa-cede00fc2622.png)

如果想要帮助 IDEA 收集改进信息，可以点击【Send Usage Statistics】；否则点击【Don't send】。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-b880a884-dbf5-4ce8-b0c1-345d60c72eff.png)

到此，Intellij IDEA 的安装就完成了，很简单。

### 02、macOS

#### 下载 IDEA

1、打开 [https://www.jetbrains.com/idea/](https://www.jetbrains.com/idea/download/#section=mac)，点击 Download 按钮

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-38cc7637-ed3f-44c0-b244-aafafd3634b6.png)

2、选择 Community 版本，旗舰版需要激活，你可以戳这里[激活](https://tobebetterjavaer.com/nice-article/itmind/)）。

确定后点击 Download 下载

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-b17d0ff0-d33c-4d19-86e0-cd491c0cc613.png)

如何查看 Mac 电脑是 Intel 还是 Apple Silicon 的 CPU？

在 Mac 上，单击菜单栏左上角的 Apple 图标，然后选择“关于本机”（About This Mac）选项。

- 如果在“芯片”部分中看到 Apple M1（或更高版本），则意味着使用的是带有 Apple Silicon CPU 的 Mac。
- 如果在“处理器”部分中看到英特尔处理器，则表示正在使用带有英特尔芯片的 Mac。

瞧，我的就是英特尔芯片的（Intel）。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-3977e9b4-9c26-4e00-bc88-1ac1f2f89d5e.png)

3、打开如下页面，IntelliJ IDEA 便会开始自动下载。若未开始自动下载，可以点击如下红框内的 direct link。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-5b074f76-71c7-405e-871e-de1ee1d6376e.png)

中文页面如下所示：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-f88924e5-6470-4d44-8f85-922875a3c565.png)

4、IntelliJ IDEA 下载完成，在下载文件夹内便会出现 ideaIC-2020.3.2.dmg 的文件（你应该是更新的版本）。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-7aec8534-ea7b-41f5-bc68-e6d2fb20e6c1.png)

#### 安装 IDEA

1、双击 ideaIC-2020.3.2.dmg 文件开始安装

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-23195fb7-3a1c-4466-bf17-4f681ef0be5e.png)

2、把 IntelliJ IDEA CE.app 拖入 Applications 文件夹

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-7bd55d3b-54ce-4e4e-8e21-aa94f15d105a.png)

3、在 Applications 中可以找到 IntelliJ IDEA CE.app，说明安装完成

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-96c1a054-8429-416a-ad5d-7fa3f360c19f.png)

#### 打开 IDEA

首次打开 IntelliJ IDEA 后展现的第一个页面如下所示。至此，IntelliJ IDEA 下载、安装和打开就搞定了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-7637a241-8524-4e0a-bb2a-a3bd1c575c9a.png)

### 03、小结

本文详细地介绍了如何在macOS和Windows操作系统上安装Intellij IDEA。你可以根据自己的操作系统选择不同的安装包，然后为自己搭建一个高效的编程环境。

---

最近整理了一份牛逼的学习资料，包括但不限于 Java 基础部分（JVM、Java 集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类 Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是 2022 年全网最全的学习和找工作的 PDF 资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
