---
title: Redis 的安装，macOS、Windows 和 Linux
shortTitle: Redis 安装
category:
  - Redis
tag:
  - Redis
description: Redis 的安装。
head:
  - - meta
    - name: keywords
      content: Java,ArrayDeque,堆,队列,java 双端队列,java ArrayDeque,源码分析, 实现原理
---

## 01、Redis 是什么

Redis 是互联网技术领域中使用最广泛的存储中间件，它是 **Re**mote **Di**ctionary **S**ervice 三个单词中加粗字母的组合。你别说，组合起来后念着挺自然的（😁）。

Redis 以超高的性能、完美的文档、简洁的源码著称，国内外很多大型互联网公司都在用，比如说阿里、腾讯、GitHub、Stack Overflow 等等。它的版本更新非常的快，功能也越来越强大，最初只是用来作为缓存数据库，现在已经可以用它来实现消息队列（对对对，RocketMQ 你别怕）了。

可以这么说吧，掌握 Redis 已经变成了一项后端工程师必须具备的基础技能。也被二哥归到了 Java 后端四大件之中，不管是校招还是社招，都是面试必问的技术栈。

Redis 的作者是一名意大利小伙，网名 Antirez，长相还是挺帅气的，感兴趣的小伙伴可以搜一下他的履历，搞了很多开源好玩的小玩具，比如说我曾给[球友们](https://javabetter.cn/zhishixingqiu/)推荐的 [smallchat](https://github.com/antirez/smallchat)，一个 200 多行代码的聊天室，经典得很。

![](https://cdn.tobebetterjavaer.com/stutymore/install-20231211171943.png)

## 02、安装 Redis

Redis 针对不同的操作系统有不同的安装方式，我们每个方式都会讲到，大家稍安勿躁。

### Windows

下载地址如下：

[https://github.com/MicrosoftArchive/redis/releases](https://github.com/MicrosoftArchive/redis/releases)

我第一次写这份内容的时候，Windows 最新的版本是 3.2.100。从下图中可以看得出，Redis 的体积非常的轻量级，还不到 6 M。体积越小，让我感觉 Redis 越牛逼，相信你肯定也有这种感觉。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/rumen-a6709cca-d3a3-4381-b110-0ff37d384f27.jpg)

有两种安装方式，第一种是 MSI（ Microsoft Installer，一种用于安装、维护和删除 Windows 操作系统上的软件的文件格式）的方式，双击运行后安装；第二种是免安装，绿色版，只需要把 zip 包解压就可以了。

我们这里选择第二种，MSI 的方式 [MySQL](https://javabetter.cn/mysql/install.html) 的时候讲过了，我们换一种口味。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/rumen-f3fc9852-7505-45ed-8ce2-d16f1d888251.jpg)

注意压缩包里面有一份英文版的文档——Windows Service Documentation.docx，是用来教我们如何安装 Redis 服务、如何启动、如何关闭，以及如何使用自定义端口启动服务的，可以简单扫一遍。

当然了，不扫也没关系，这篇内容替你扫，给大家节省学习的时间成本。

打开命令行，进入到当前解压后的目录，输入启动命令：

```
redis-server redis.windows.conf
```

然后你就会看到 Redis 启动后的欢迎画面，左边这个盒子感觉好有艺术感啊！有小伙伴知道是怎么生成的吗？

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/rumen-69b11133-7aac-4f8a-aa1e-9e8af576ad32.jpg)

还有一些其他的提示信息：

- Redis 当前的版本号为 3.2.100
- 端口是 6379
- 进程 ID，也就是 PID 为 12636
- Redis 官方地址为：http://redis.io

嗯哼，**知道为什么 Redis 的默认端口是 6379 吗**？

据说是手机键盘上“MERZ”的位置决定的，小伙伴们可以打开自己手机上九宫格键盘感受一下。“MERZ”是什么意思呢？据说是“愚蠢”的意思。这？是不是感觉程序员的生活中还是有蛮多神秘色彩的？

Windows 上如何停止 Redis 服务呢？可以直接按下 `Ctrl+C` 组合键——粗暴、壁咚（当然可以直接点右上角的叉号）。

### macOS

macOS 可以直接通过 [Homebrew](https://javabetter.cn/gongju/brew.html)（戳链接了解）来安装 Redis，非常方便。

如果有 [warp 终端](https://javabetter.cn/gongju/warp.html)（戳链接了解）的话，会更加智能，直接问它“如何安装 Redis”它就会告诉你安装步骤。

![](https://cdn.tobebetterjavaer.com/stutymore/install-20231211194317.png)

安装完 Redis 后，也可以通过 `redis-server` 命令来启动服务。

![](https://cdn.tobebetterjavaer.com/stutymore/install-20231211194526.png)

和 `brew services start redis` 不同，这样启动的服务是没有持久化的，也就是说，当你关闭终端后，Redis 服务也就停止了。

我平常更喜欢用这种方式，因为 Redis 服务在本地并不需要一直运行。比如说，我在开发[技术派](https://paicoding.com/) 的时候，因为需要 Redis 作为缓存我就会把 Redis 启动起来，开发完后直接关掉终端也不用操心 Redis 服务没有关闭的事情。

更轻量级。

如果使用 `brew services start redis` 来启动 Redis 的话，可以通过 `brew services info redis` 来查看 Redis 服务的状态，没启动的时候状态是这样的。

![](https://cdn.tobebetterjavaer.com/stutymore/install-20231211201931.png)

想要停止的话，可以使用 `brew services stop redis` 命令。

### Linux

和 MySQL 一样，Linux 上安装 Redis 同样需要确认是 CentOS 还是 Ubuntu，如何区分参照 MySQL 的帖子。

[如何区分 CentOS 还是 Ubuntu？](https://javabetter.cn/mysql/install.html)

#### CentOS

CentOS 默认的仓库中可能不包含 Redis，因此需要启用 EPEL（Extra Packages for Enterprise Linux）仓库。

```
sudo yum install epel-release
```

安装 Redis：

```
sudo yum install redis
```

启动 Redis 服务：

```
sudo systemctl start redis
```

设置开机启动：

```
sudo systemctl enable redis
```

查看 Redis 服务状态：

```
service redis status
```

或者 `redis-cli ping`，如果返回 PONG，则表示 Redis 正在运行。

![](https://cdn.tobebetterjavaer.com/stutymore/install-20231211200025.png)

#### Ubuntu

添加 GPG 密钥：

```
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
```

这个命令从 Redis 的官方网站下载 GPG 密钥，并添加到系统的密钥环中，确保下载的软件包是官方认证的。

添加 Redis 仓库：

```
echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
```

这个命令创建一个新的源列表文件 redis.list，里面包含了 Redis 的官方仓库。

更新包列表：

```
sudo apt-get update
```

安装 Redis：

```
sudo apt-get install redis
```

启动 Redis 服务：

```
sudo systemctl start redis
```

设置开机启动：

```
sudo systemctl enable redis
```

查看 Redis 服务状态：

```
redis-cli ping
```

同样，如果返回 PONG，则表示 Redis 正在运行。

## 03、连接 Redis

Redis 本身就自带了一个命令行客户端，可以直接通过 `redis-cli` 命令来连接 Redis 服务。

然后键入 `keys *` 命令，就可以看到 Redis 中的所有键值对。

![](https://cdn.tobebetterjavaer.com/stutymore/install-20231211203619.png)

但是可能很多小伙伴想要一款图形化的客户端，这样更加直观，更加方便。

我本机装的是 AnotherRedisDesktopManager，目前在 GitHub 上已经有 27k+ 的 star 了，非常受欢迎。

>[https://github.com/qishibo/AnotherRedisDesktopManager](https://github.com/qishibo/AnotherRedisDesktopManager)

Windows、macOS 都支持，GitHub 首页也有对应的安装教程，支持 Windows 的 [chocolatey](https://javabetter.cn/gongju/choco.html)，也支持 exe 文件。

macOS 支持 [Homebrew](https://javabetter.cn/gongju/brew.html) 安装，也支持 dmg 文件。

>如果报错不受信任或者移到垃圾箱，执行这个命令后再启动即可:
`sudo xattr -rd com.apple.quarantine /Applications/Another\ Redis\ Desktop\ Manager.app`

运行界面如下所示。

![](https://cdn.tobebetterjavaer.com/stutymore/install-20231211203817.png)

## 04、小结

好，关于 Redis 的安装，我们就先讲到这里，如果想通过 Java 对 Redis 进行操作的话，我们随后的[章节](https://javabetter.cn/redis/rumen.html)会讲到。

这篇也算是给后面 Redis 的教程做好了铺垫，所谓车马未动，粮草先行，正是这个道理。


----

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)