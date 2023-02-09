---
title: WindTerm：新一代开源免费的终端工具，GitHub星标6.6k+，太酷了！
shortTitle: WindTerm：新一代终端工具
category:
  - Java企业级开发
tag:
  - 辅助工具
description: WindTerm：新一代开源免费的终端工具，GitHub星标6.6k+，太酷了！
head:
  - - meta
    - name: keywords
      content: 辅助工具,GitHub,终端,WindTerm,WindTerm 教程,WindTerm 终端,Java企业级开发
---

继 [Tabby](https://tobebetterjavaer.com/gongju/tabby.html)、[Warp](https://tobebetterjavaer.com/gongju/warp.html) 后，今天再来给大家推荐一款终端神器——WindTerm，完全开源，在 GitHub 上已经收获 6.6k 的 star。

>[https://github.com/kingToolbox/WindTerm](https://github.com/kingToolbox/WindTerm)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/windterm-5220349e-fb8b-41c8-94c7-9d37b0eeaa82.png)

作者还拿 WindTerm 和 Putty、xterm、Windows Terminal + ssh.exe、iterm2、rxvt、Gnome等等做了一个性能对比，结果其他终端均被吊打的不成样子，真正的**杀人诛心**

哈哈哈哈哈哈哈哈哈哈


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/windterm-d2958336-7d9b-46a5-9fd4-224b195dba03.png)

工具不嫌多，哪个顺手用哪个，对吧？没毛病吧😁


## 安装 WindTerm

WindTerm 不仅开源免费，还跨平台，支持 Windows、Linux 和 macOS。

直接到 release 页面选择适合自己操作系统的安装包。

>[https://github.com/kingToolbox/WindTerm/releases](https://github.com/kingToolbox/WindTerm/releases)

体积 30M 左右，相对于动辄 200M 左右的安装包，真的是良心。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/windterm-f7abe795-d43b-4f53-93a5-e59241d45930.png)

安装完成后，打开的界面和传统的终端不太一样，WindTerm 更像 IDE 的布局，左边是资源管理器+文件管理器，中间会默认打开一个 zsh 的终端窗口，右边是会话窗口+历史命令窗口，底部是发送窗口 + Shell 窗口。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/windterm-28d20f75-c5d0-47bf-96db-a2f470f03c42.png)

## 使用 WindTerm

### SSH

使用终端最重要的一个场景就是 SSH，连接远程服务器，我这里有一个 1G 内存的轻量级云服务器，我们来连接它体验一下。

点击新建会话按钮开始 SSH 连接。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/windterm-21565ed0-90d8-466f-b505-d1d2f58388be.png)

添加主机名，点击「连接」开始进行远程链接。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/windterm-fec8d31e-aa33-4d5e-b0c0-4c7f09ea208b.png)

紧接着输入用户名和密码，我们关掉一些没必要的窗口，让整个界面更加清爽一些。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/windterm-aae1b222-c6da-4285-8efe-e87e5cc66702.png)

如果感觉字体比较小的话，可以直接按住**「command+」**两个组合键放大字体。

WindTerm 给我一个非常直观的操作是，它提供了一个折叠的功能，点击-号折叠，点击+号展开。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/windterm-e3415e9c-d002-4492-af9d-83b02e87c7d8.png)

还有一个就是智能提示，非常到位，响应速度很快。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/windterm-a34d2157-3a5d-4afa-a5c4-2cc323244c4f.png)


### SFTP

除了 SSH，还有一个重要的场景就是上传文件，我们知道，Xshell 是直接将 FTP 分离了出去，我总觉得这个产品分割设计很脑残，放在一起挺好的。

WindTerm 是放在一起的，直接打开文件文件管理器，选择文件上传还是直接拖拽，都非常便利。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/windterm-e23d187e-9d67-4e6a-9b22-e9a3a0e459a5.png)

文件上传完成后会有一个进度条提示。

如果想直接在 SSH 窗口中上传文件的话，就需要安装lrzsz。如果没安装的话，会提示错误❎。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/windterm-3eb27b2e-ba98-44f2-8ec3-4ec86e9f62d1.png)

因为我的远程服务器是 CentOS，所以执行 `yum install lrzsz`就可以直接安装了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/windterm-c6f757b9-a6e0-4bd9-beef-9ce501cbdf41.png)

安装完成后就可以直接在 SSH 上传文件了，和其他终端不同的是，WindTerm 会有进度条提示。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/windterm-ee7b8acf-6e39-42d7-ab92-bf8e24243c38.png)

WindTerm 还提供了高速传输模式，上传下载速度更快。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/windterm-f2315d1b-d6c9-4eff-8470-2088cff6cd05.png)


搞定 SSH 和 SFTP，一个终端的基础功能就全具备了，这也是我们最常用的两个场景。WindTerm 在这两方面都做的不错。

### 自动补全

WindTerm 的自动补全功能还是非常强大的，只需要在行首键入 `!` 就可以调出历史命令，然后使用向下的箭头选择历史命令就 OK 了。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/windterm-838a4711-4e09-46d7-a0d5-99e302889d27.png)

WindTerm 能够自动补全的命令非常全面，支持：

- Linux Shell 命令。
- MacOS Shell 命令。
- Windows Cmd 命令。
- PowerShell 命令。
- 任何命令行程序的命令，例如 Git


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/windterm-62b525bf-c4c6-4e3a-b313-884c945809e3.png)



## 配置 WindTerm

### 如何重置锁屏密码

不过有点小尴尬😓的是，WindTerm有自动锁屏的功能，过段时间（默认 30 分钟）没有操作，就会自动锁屏。然而，我之前并没有设置过锁屏密码，这就好像我自己的门我自己锁了，却没有钥匙🔑。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/windterm-17017bd4-4da6-41f5-bf48-2b056dbfe258.png)

虽然提供了更改主密码的功能，但我就不知道初始密码是什么，就更尴尬了。

怎么办？

遇事不决问 issue：**如何重置锁屏密码**！



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/windterm-759ffc3b-0119-4a2b-bce5-68c7f8612b31.png)


果然已经有小伙伴提出了这个问题，我们顺藤摸瓜就可以搞定了，找到 user.config 文件。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/windterm-f4a8b033-5d77-4361-935e-66c210e67690.png)

干掉 application.fingerprint 和 application.masterPassword。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/windterm-4cd13932-07a3-4696-9752-265ed76c4463.png)

再找到 .wind/profiles/default.v10/terminal/user.sessions 文件删除 session.autoLogin 就可以将主密码设置为空字符串了，之后再来修改主密码，就 OK 了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/windterm-21423050-3de4-4afe-9e4a-0b073c4f6504.png)

### 更换主题

WindTerm 支持三种主题的切换，亮白模式、暗黑模式、黑白相间模式。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/windterm-6b123b12-903e-4040-86e6-95162df4aa09.png)

我们来切换到亮白模式体验一下，还不错。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/windterm-a18114a4-17d5-4f83-b96d-f9007d67e560.png)

### 自动复制

只需要在设置中，找到文本一栏，勾选「自动复制选定内容」就可以了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/windterm-fd333685-e76e-434c-832e-2f2b594dfd35.png)

选中内容，然后就直接复制了。

## 总结

总的来说，WindTerm 的体验不错，除了我上面提到的这些基础功能外，像分屏啊，转接端口啊，并且在 Windows 下的体验要比 macOS 操作系统下更酷一些。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/windterm-201419f5-0097-4fe2-b24f-3d35c25c18d0.png)


作者把两者的使用技巧全部分享到了下面这个网址上，小伙伴们可以去解锁一下。

>[https://kingtoolbox.github.io/](https://kingtoolbox.github.io/)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
