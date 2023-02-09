---
title: Tabby：一款逼格更高的开源终端工具，GitHub 星标 21.4k
shortTitle: Tabby：开源终端工具
category:
  - Java企业级开发
tag:
  - 辅助工具
description: Tabby：一款逼格更高的开源终端工具，GitHub 星标 21.4k
head:
  - - meta
    - name: keywords
      content: 辅助工具,GitHub,终端,Tabby,tabby 终端,tabby 教程,Java企业级开发
---

作为一名 Java 后端开发，日常工作中免不了要和 Linux 服务器打交道，因为生产环境基本上都是部署在 Linux 环境下的。以前呢，我会选择 Xshell 来作为终端进行远程操作。

随着付费版本的出现，尤其是 Xshell 把 FTP 分离出去后，上传下载文件的话还需要单独装一下 Xftp，这显然没有之前集成在一起方便😖。

还有一点让我费解的是，Xshell 竟然一直没有推出 macOS 版。

不过，滴水之恩当涌泉相报，我还是要说，Xshell 真的是非常的 Nice，从实习到现在，Windows 环境下，我基本上一直在用，差不多有快 10 年的时间了，感情还是在的。

相信很多小伙伴也在问，有没有一款，**集成了 FTP 功能，并且跨平台的终端工具呢？如果能免费开源的话，就更好了**！

答案是有的，它就是 **Tabby**！

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/tabby-01.png)

GitHub 上已经有 21.4k 的 star 了，这说明 Tabby 非常的受欢迎：

>[https://github.com/eugeny/tabby](https://github.com/eugeny/tabby)

*Tabby：二哥，我谢谢你呀，能再吹两句吗？*

Tabby 是一个高度可定制化的 跨平台的终端工具，支持 Windows、macOS 和 Linux，自带 SFTP 功能，能与 Linux 服务器轻松传输文件，支持多种主题，界面炫酷，插件丰富。

## 一、安装 Tabby

直接到官网 [tabby.sh](https://tabby.sh/) 点击「download」按钮就可以跳转到下载页面，最新的 release 版本是 1.0.164。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/tabby-02.png)

Linux 和 Windows 的比较好选，macOS 分为两个版本，一个是 arm64，一个是 x86-64，什么意思呢？

这里简单普及下哈。

>ARM是英国ARM公司提供一种CPU架构的知识产权，目前主流的手机和平板电脑都采用ARM架构，但 ARM 不生产芯片，只是从各种嵌入式设备、智能手机、平板电脑、智能穿戴和物联网设备体内的上亿颗处理器中“抽成”。

Apple M1 是苹果公司的第一款基于ARM架构的自研处理器单片系统。

> X86_X64 源于英特尔几十年前出品的CPU型号8086，包括后续型号8088/80286/80386/80486/80586等等，8086以及8088被当时的IBM采用，制造出了名噪一时的IBM PC机，从此个人电脑风靡一时。

详情可参阅下面这篇：

>[https://www.cnblogs.com/zhaoqingqing/p/13145115.html](https://www.cnblogs.com/zhaoqingqing/p/13145115.html)

从这一点上可以证明，Tabby 的更新是非常勤快的，连 macOS 的最新芯片 M1 都支持了，厉害了呀，我的虎斑猫（Tabby）！

按照提示，一步步安装就 OK 了。完成后打开，这界面还是非常炫酷的。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/tabby-03.png)

## 二、SSH 连接

SSH，也就是 Secure Shell（安全外壳协议），是一种加密的网络传输协议，可在不安全的网络中为网络服务提供安全的传输环境，通过在网络中创建安全隧道来实现 SSH 客户端和服务器端之间的连接。

之前说要带大家玩转 Linux 服务器，我们先安装了[宝塔面板](https://mp.weixin.qq.com/s/ditN9J80rSWwnYRumwb4ww)这个神器。宝塔里面有自带的终端，但说实话，体验一般。

那不妨我们就使用 Tabby 来与服务器建立一个 SSH 连接吧。

点击「setting」→「profiles & connections」→「new profile」。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/tabby-04.png)

填写服务器的 IP 地址和密码，然后点击「save」。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/tabby-05.png)

之后点击「运行」按钮，就可以进入到终端页面了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/tabby-06.png)


好了，现在可以对服务器进行操作了，执行下 top 命令可以查看服务器上正在运行的进程信息。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/tabby-07.png)

## 三、SFTP 传输文件

Tabby 集成了 SFTP，所以上传下载文件就变得非常的简单。只需要点击一下「SFTP」图标就可以打开文件传输窗口。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/tabby-08.png)

上传的时候支持拖拽，完成后会弹出文件传输成功的提示消息。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/tabby-09.png)

下载的时候点击要下载的文件，然后会弹出存储对话框，选择对应的文件夹，以及修改对应的文件名点击「存储」就可以了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/tabby-10.png)

## 四、配置 Tabby

「Settings」 的面板下有一个「Appearance」的菜单，可以对 Tabby 的外观进行设置，比如说调整字体，比如说自定义样式。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/tabby-11.png)

「Appearance」的菜单可以对 Tabby 的配色方案进行修改，里面的主题非常多，不过我感觉默认的就挺不错，毕竟是官方推荐的。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/tabby-12.png)

 「Plugins」 菜单中还有不少插件可供扩展。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/tabby-13.png)

*   [clickable-links](https://github.com/Eugeny/tabby-clickable-links) - 使终端中的路径和 URL 可点击
*   [docker](https://github.com/Eugeny/tabby-docker) - 连接到 Docker 容器
*   [title-control](https://github.com/kbjr/terminus-title-control) - 允许通过提供要删除的前缀、后缀和/或字符串来修改终端选项卡的标题
*   [quick-cmds](https://github.com/Domain/terminus-quick-cmds) - 快速向一个或所有终端选项卡发送命令
*   [save-output](https://github.com/Eugeny/tabby-save-output) - 将终端输出记录到文件中

这里重点说一下「sync config」 这个插件，可以将配置同步到Github或者Gitee的插件。点击「Get」就可以安装，之后会提示你重启生效。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/tabby-14.png)

生效后点击「Sync Config」菜单，就可以看到配置项了，类型可以选择 GitHub、Gitee、GitLab。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/tabby-15.png)

这里以 Gitee 为例，进入个人 Gitee 主页，左侧菜单中选择「私人令牌」，然后点击「生成新令牌」。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/tabby-16.png)

提交后会生成 token，复制到 Tabby 的 Token 输入框中，然后点击「Upload config」，就可以看到配置信息同步成功了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/tabby-17.png)



 「Window」 菜单中可以对当前窗口进行设置，比如说改变窗口的主题为 Paper，改变 tab 的位置到底部等等。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/tabby-18.png)

## 五、总结

SSH 连接和 SFTP 传输恐怕是我们操作 Linux 服务器最常用的两个功能了，那 Tabby 对这两个功能的支持非常的友好，足够的轻量级。关键它是跨平台的，Windows、macOS 都可以用，再把配置信息同步到云上后，多平台下切换起来简直不要太舒服。

Windows 用户习惯用 Xshell，macOS 用户习惯用 iTerm2，但这两款工具都没办法跨平台，多平台操作的用户就可以选择 Tabby 来体验一下，真心不错。

Tabby 的学习资料还比较少，所以希望二哥的这篇文章能给有需要的小伙伴提供一点点的帮助和启发。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)



















