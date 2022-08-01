---
category:
  - Java企业级开发
tag:
  - 辅助工具
  - GitHub
  - Windows
  - chocolatey
  - 命令行
  - Shell 工具
  - 软件管理
  - choco
title: chocolatey：一款 GitHub 星标 8.2k+ 的 Windows 命令行软件管理神器
shortTitle: Win软件管理神器choco
description: chocolatey：一款 GitHub 星标 8.2k+ 的 Windows 命令行软件管理神器
head:
  - - meta
    - name: description
      content: chocolatey：一款 GitHub 星标 8.2k+ 的 Windows 命令行软件管理神器
  - - meta
    - name: keywords
      content: 辅助工具,GitHub,Windows,chocolatey,命令行,Shell 工具,软件管理,choco
---

小二是公司新来的实习生，之前面试的过程中对答如流，所以我非常看好他。第一天，我给他了一台新电脑，要他先在本地搭建个 Java 开发环境。

二话不说，他就开始马不停蹄地行动了。**真没想到，他竟然是通过命令行的方式安装的 JDK，一行命令就搞定了！连环境变量都不用配置，这远远超出了我对他的预期**。

我以为，他会傻乎乎地下一步下一步来安装 JDK，就像这样。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/choco-9050933d-61f2-4d79-bad7-982803fc174a)

然后这样配置环境变量。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/choco-4adb249c-a662-42af-9c7e-08deeb11c835)

结果他是这样的，就一行命令，环境变量也不用配置！

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/choco-5c996f2a-6d14-4f9d-acd4-ff1cf959b55f)

卧槽！牛逼高大上啊！

看着他熟练地在命令行里安装 JDK 的样子，我的嘴角开始微微上扬，真不错！这次总算招到了一个靠谱的。

于是我就安排他做一个记录，打算发表在我的小破站《Java 程序员进阶之路》上。从他嘴里了解到，他用的命令行软件管理器叫 chocolatey，这是一个Windows下的命令行软件管理器，在 GitHub 上已经收获 8.2k+的星标，可以方便开发者像在Linux下使用yum命令来安装软件，或者像在macOS下使用brew 命令来安装软件，非常酷炫。


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/choco-c598af06-7a85-47ca-ade4-e07c60463990)


以下是他的记录，一起来欣赏下。

### 先来了解 shell

对于一名 Java 后端程序员来说，初学阶段，你可以选择在 IDE 中直接编译运行 Java 代码，但有时候也需要在 Shell 下编译和运行 Java 代码。

>Windows 下自带的 Shell 叫命令提示符，或者 cmd 或者 powershell，macOS 下叫终端 terminal。

但当你需要在生产环境下部署 Java项目或者查看日志的话，就必然会用到 Shell，这个阶段，Shell 的使用频率高到可以用一个成语来形容——朝夕相伴。

一些第三方软件会在原生的 Shell 基础上提供更强大的功能，常见的有 tabby、Warp、xhsell、FinalShell、MobaXterm、Aechoterm、WindTerm、termius、iterm2 等等，有些只能在 Windows 上使用，有些只能在 macOS 上使用，有些支持全平台。还有 ohmyzsh 这种超神的 Shell 美化工具。

这里，我们列举一些 Shell 的基本操作命令（Windows 和 macOS/Linux 有些许差异）：

- 切换目录，可以使用 cd 命令切换目录，`cd ..` 返回上级目录。


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/choco-b329cba9-4982-44ec-9935-3c9eb5b92eab)

- 目录列表，macos/linux 下可以使用 ls 命令列出目录下所有的文件和子目录（Windows 下使用 dir 命令），使用通配符 `*` 对展示的内容进行过滤，比如 `ls *.java` 列出所有 `.java`后缀的文件，如果想更进一步的话，可以使用 `ls H*.java` 列出所有以 H 开头 `.java` 后缀的文件。
- 新建目录，macOS/Linux 下可以使用 mkdir 命令新建一个目录（比如 `mkdir hello` 可以新建一个 hello 的目录），Windows 下可以使用 md 命令。
- 删除文件，macOS/Linux 下可以使用 `rm` 命令删除文件（比如 `rm hello.java` 删除 hello.java 文件），Windows 下可以使用 del 命令。
- 删除目录，macOS/Linux 下可以使用 `rm -r` 命令删除目录以及它所包含的所有文件（比如说 `rm -r hello` 删除 hello 目录）。Windows 下可以使用 rmdir 命令。
- 重复命令，macOS/Linux/Windows 下都可以使用上下箭头来选择以往执行过的命令。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/choco-bdd0a107-512d-4906-9555-38fe06d24d5a)

- 命令历史，macOS/Linux 下可以使用 `history` 命令查看所有使用过的命令。Windows 可以按下 F7 键。


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/choco-d6425fe6-1501-412e-9642-990864e6f810)

- 解压文件，后缀名为“.zip”的文件是一个包含了其他文件的压缩包，macOS/Linux 系统自身已经提供了用于解压的 unzip 命令， Windows 的话需要手动安装。

### 再来了解chocolatey

先安装 chocolatey。这是一个Windows下的命令行软件管理器，可以方便开发者像在Linux下使用yum命令来安装软件，或者像在macOS下使用brew 命令来安装软件，非常酷炫。

>The biggest challenge is reducing duplication of effort, so users turn to Chocolatey for simplicity

传统的安装方式要么非常耗时，要么非常低效，在命令行安装软件除了简单高效，还能自动帮我们配置环境变量。

>- 官方地址：[https://chocolatey.org/](https://chocolatey.org/)
>- 安装文档：[https://chocolatey.org/install#individual](https://chocolatey.org/install#individual)

第一步，以管理员的身份打开 cmd 命令行。


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/choco-f01fb23b-9ca5-4997-acc3-26ebd7da060f)

第二步，执行以下命令：

```
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

稍等片刻，就完成安装了。

安装完成后如下图所示：

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/choco-e9696a71-ceb5-4c62-b39f-876f742b6435)

如果不确定是否安装成功的话，可以通过键入 `choco` 命令来确认。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/choco-211a2335-d3e1-49b5-8735-feabacf8087e)

这里推荐几个非常高效的操作命令：

- choco search xxx，查找 xxx 安装包
- choco info xxx，查看 xxx 安装包信息
- choco install xxx，安装 xxx 软件
- choco upgrade xxx，升级 xxx 软件
- choco uninstall xxx， 卸载 xxx 软件

如何知道 chocolatey 仓库中都有哪些安装包可用呢？

可以通过上面提到的命令行的方式，也可以访问官方仓库进行筛选。

>[https://community.chocolatey.org/packages](https://community.chocolatey.org/packages)

比如说我们来查找 Java。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/choco-a4bdc885-22a9-4307-b4b6-cd1ad1f0ba8b)

好，现在可以直接在shell中键入 `choco install jdk8` 来安装 JDK8 了，并且会自动将Java加入到环境变量中，不用再去「我的电脑」「环境变量」中新建 JAVA_HOME 并复制 JDK 安装路径配置 PATH 变量了，是不是非常 nice？

稍等片刻，键入 `java -version` 就可以确认Java是否安装成功了。


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/choco-80a6ced8-c25d-4371-8096-b95be48af768)

不得不承认！非常nice！

再比如说安装 Redis，只需要找到 Redis 的安装命令在 Choco 下执行一下就 OK 了。


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/choco-488b71e7-8082-45b7-b454-3187938bf101)

安装 Git：

```
choco install git.install 
```

安装 node.js

```
choco install nodejs.install 
```

安装 7zip

```
choco install 7zip
```

安装 **Filezilla**

```
choco install filezilla
```

Choco 上的软件包也非常的多，基本上软件开发中常见的安装包都有。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/choco-3a59dfe8-6c2d-4c5b-9187-bf2812a59041)


### 小结

通过小二的实战笔记，我们可以了解到。

对比下载安装包，通过图形化界面的方式安装 JDK，然后下一步，下一步是不是感觉在 Shell 下安装 JDK 更炫酷一些？

关键是还省去了环境变量的配置。

记得还没有走出新手村的时候，就经常被环境变量配置烦不胜烦。那下载这种命令行的方式，要比手动在环境变量中配置要省事一百倍，也更不容易出错。

通过 Choco 可以集中安装、管理、更新各种各样的软件。特别适合管理一些轻量级的开源软件，一条命令搞定，升级的时候也方便，不用再重新去下载新的安装包，可以有效治愈更新强迫症患者的症状。

如果不想特殊设置的话，Chocolatey 整体的操作与使用还是比较亲民的。就连刚接触软件开发的小白也可以直接使用，而且路人看着会觉得你特别厉害。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png)


