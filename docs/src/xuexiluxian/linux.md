---
star: true
title: 2026年最值得收藏的Linux学习路线（建议收藏🔥）
shortTitle: Linux学习路线
category:
  - 学习路线
tag:
  - 学习路线
description: Linux学习资料 | 学习路线 | 注意事项，Linux需要学什么
date: 2026-01-01
head:
  - - meta
    - name: keywords
      content: Linux,学习路线,linux,Linux教程,Linux面试,linux入门
---

## 为什么学 Linux

Linux 也称：GNU/Linux，其中 GNU 的全称是：Gnu’s Not Unix。换句话说，Linux 不是 Unix，但是借鉴了 Unix 的设计思想，所以业界把这种和 Unix 有关的系统统统归为：类 Unix 系统。

Linux 本质是指 Linux 内核，而 GNU/Linux 才是一个操作系统，但是确实有点不好记，所以还是叫 Linux 吧。

通常情况下，Linux 被打包成供服务器使用的 Linux 发行版，一些流行的 Linux 发布版，包括 Debian、Fedora 等。

根据用途可以再总结为：

- Fedora（典型代表 CentOS）系，在国内外作为企业服务器最多的系统，没有之一
- Debian 系（典型代表 Ubuntu），一般用于桌面、移动端、TV 这一类
- ArchLinux 系，轻量的 Linux，适合有一定 Linux 基础，并且爱折腾的人使用，用它做桌面或是服务器都行。

为什么要用 Linux 系统呢？

> Linux 是一个开源的、安全的、免费的操作系统

这说得比较虚，在我看来，Linux 之所以被推崇是因为它可以加快你的生产效率，提高产能，针对我们开发人员来说，不会 Linux，就意味着你从来没有接触过真正的生产环境，生产环境几乎都是 Linux 系统。

这就等于说，**如果你想成为主力开发或者资深开发，Linux 永远绕不开。从简单的语言开发，到后期的服务器部署、分布式、集群环境、数据库相关等，Linux 都在等着你**。

## 安装 Linux 及周边

学习 Linux 之前，必须先把 Linux 安装起来，因为我们本机开发的操作系统通常是 macOS 或者 Windows。

### 虚拟机安装

[Ubuntu 安装](https://github.com/judasn/Linux-Tutorial/blob/master/markdown-file/Ubuntu-Install.md)，Ubuntu 是一个以桌面应用为主的 Linux 操作系统，其名称来自非洲南部祖鲁语或豪萨语的“ubuntu"一词，意思是“人性”、“我的存在是因为大家的存在"，是非洲传统的一种价值观。

[CentOS 6 安装](https://github.com/judasn/Linux-Tutorial/blob/master/markdown-file/CentOS-Install.md)，CentOS 是免费的、开源的、可以重新分发的开源操作系统，CentOS（Community Enterprise Operating System，中文意思是社区企业操作系统）是 Linux 发行版之一。

[CentOS 7 安装](https://github.com/judasn/Linux-Tutorial/blob/master/markdown-file/CentOS-7-Install.md)，更主流的版本。

### 购买云服务器

直接购买云服务器（阿里云、腾讯云都有提供购买渠道），我这里给大家提供一些优惠链接：

①、[腾讯云](https://curl.qcloud.com/gIsvte7E)，新用户专享 350 元代金券

![腾讯云](https://cdn.paicoding.com/stutymore/linux-20240205064102.png)

②、[阿里云](https://www.aliyun.com/activity?userCode=dmhgamc2)，新用户专享 2000 元代金券

![阿里云](https://cdn.paicoding.com/stutymore/linux-20240205065049.png)

### 在线 Linux

或者直接通过在线 Linux来学习。

- [JS/UIX - Terminal](https://www.masswerk.at/jsuix/index.html)，直接进入，点击 open terminal。就可以开始把玩了！它提供非常简单的终端环境，并没有自带 gcc 等编译套件，适合用于练习基本命令和 shell 脚本。
- [copy.sh](https://copy.sh/v86/)，可以全屏体验，给你一种在真实Linux上玩耍的感觉。同时支持多个发行版本哦！
- [实验楼](https://www.lanqiao.cn/courses/1)，选择 Linux 课程，点击进入课程并打开默认在线环境，就可以开始使用一个完整的在线 Linux 环境，几乎和本地安装的 Linux 系统没差！
- [ShellCheck](https://www.shellcheck.net/)，如同它的名字，这是一个用来检查你的脚本是否存在问题的工具。

### Vim

[Vim 安装和配置、优化](https://github.com/judasn/Linux-Tutorial/blob/master/markdown-file/Vim-Install-And-Settings.md)，Vim 是从 vi 发展出来的一个文本编辑器。

其代码补完、编译及错误跳转等方便编程的功能特别丰富，在程序员中被广泛使用。和 Emacs 并列成为类 Unix 系统用户最喜欢的编辑器。 Vim 的第一个版本由布莱姆·米勒在 1991 年发布。

### Oh My Zsh

[oh-my-zsh 安装与配置](https://learnku.com/articles/32793)，Oh My Zsh 是基于 zsh 命令行的一个扩展工具集，提供了丰富的扩展功能。Zsh 是一款强大的虚拟终端，既是一个系统的虚拟终端，也可以作为一个脚本语言的交互解析器。


### SSH 连接工具

[Tabby](https://tobebetterjavaer.com/gongju/tabby.html)，Tabby 是一个高度可定制化的 跨平台的终端工具，支持 Windows、macOS 和 Linux，自带 SFTP 功能，能与 Linux 服务器轻松传输文件，支持多种主题，界面炫酷，插件丰富。

[XShell](https://tobebetterjavaer.com/nice-article/itmind/#xshell)，Xshell 是 Netsarang Computer 推出的的 Secure Shell、Telnet 和 Rlogin 虚拟终端。Xshell 可以为每个主机创建单独的会话，用户可以通过标签查看每个会话，方便同时操作和管理与主机的会话。

[Warp](https://tobebetterjavaer.com/gongju/warp.html)，一个超级牛叉的 terminal，号称是 21 世纪的终端，还未正式发布，就获得了两千三百万美元的融资。

[MobaXterm](https://mobaxterm.mobatek.net/)，分开源版和收费版，Windows 平台上比较强大的终端工具。

[FinalShell](https://www.hostbuf.com/t/988.html)，一款免费的国产的集 SSH 工具、服务器管理、远程桌面加速的良心软件,同时支持 Windows,macOS,Linux。

[Putty](https://www.putty.org/)，Windows 平台上的一个免费 SSH 客户端。

[iterm2](https://iterm2.com/)，macOS 原生终端 terminal 的替代品。

其他远程链接工具还有：secureCRT、Aechoterm、WindTerm、termius 等等。

## Linux 学习路线

这是我画的一幅 Linux 学习路线图，大家可以按此路线循序渐进地学习。

![Linux 学习路线](https://cdn.paicoding.com/stutymore/linux-20240205065806.png)

需要说明的是：第五项驱动开发和第六项嵌入式系统开发是并列的，也就是说，学习完内核之后，你可以选择从事不同的领域，当然嵌入式开发有时会包含驱动开发。

还有就是嵌入式开发包括硬件，软件和系统开发，假如只做硬件的话，你没有必要按照上述路线进行，系统级开发的话，前面的是必备。

详细地拆分一下：

### 熟悉文件系统，shell 脚本以及常用命令

早期的 Linux 使用 Ext2 文件系统格式，CentOS 5.x 默认使用 Ext3，CentOS 6.x 默认使用 Ext4，而目前最新的 CentOS 7.x 默认使用 xfs 格式。

[文件系统](http://c.biancheng.net/view/880.html)

shell 脚本（shell script），是一种为 shell 编写的脚本程序。

[Shell 脚本编程 30 分钟入门](https://github.com/qinjx/30min_guides/blob/master/shell.md)

[Linux 命令大全(手册)](https://www.linuxcool.com/)

列一些我自己用过的命令：

- cat /proc/cpuinfo 查看 CPU 信息
- top 查看系统使用情况
- df 查看磁盘使用情况
- free 显示系统内存情况
- sudo 以管理员身份执行
- ssh 远程连接
- cd 切换目录
- ls 查看目录列表
- tree 打印目录树
- mkdir 创建目录
- rm 删除目录
- touch 新建文件
- cp 复制文件
- mv 移动文件
- find 搜索文件
- whereis 查看可执行文件路径
- chmod 设置目录权限
- cat / more / less 查看文件
- zip / tar / gzip 压缩文件
- unzip / tar / gunzip 解压文件
- grep / sed / awk 文本处理
- crontab 计划任务
- nohup 后台运行程序
- ps 查看进程
- kill 杀死进程
- rpm / yum / apt / apt-get / dpkg 软件包管理
- service / systemctl 服务管理
- ifconfig 查看网络属性
- netstat 查看网络状态
- date 显示系统时间
- rpm 安装用 RPM 来打包的软件
- yum 基于 rpm 的软件包管理器，能够从指定的服务器自动下载 RPM 包并且安装

### 了解程序开发过程

学会使用文本编辑工具 Vim。

![Vim](https://cdn.paicoding.com/stutymore/linux-20240205065914.png)

学会使用编译工具 gcc, as, 连接工具 ld, 调试工具 gdb， make 工具，会写 makefile。

学会安装配置常用的软件，以及服务搭建，比如说 FTP、MySQL、Nginx、Redis、日志服务 等等。

### 尝试系统编程

试着在 Linux 上用 C 语言进行系统编程，其中需要调用 Linux 系统库函数 （API）。例如，实现一个需要进行网络通信、操作文件的多线程/进程程序。以此深入了解 Linux 系统运行机制。

![Linux 系统编程](https://cdn.paicoding.com/stutymore/linux-20240205065929.png)

推荐这份 Linux 系统编程（中文版），非常 nice。球友可以直接在[知识星球的置顶帖](https://t.zsxq.com/03N3NbmEe)里获取网盘下载地址/或者直接从知识星球里获取。

### 学习 Linux 内核

Linux® 内核是 Linux 操作系统（OS）的主要组件，也是计算机硬件与其进程之间的核心接口。它负责两者之间的通信，还要尽可能高效地管理资源。

之所以称为内核，是因为它在操作系统中就像果实硬壳中的种子一样，并且控制着硬件（无论是电话、笔记本电脑、服务器，还是任何其他类型的计算机）的所有主要功能。

内核有 4 项工作：

- 内存管理：追踪记录有多少内存存储了什么以及存储在哪里
- 进程管理：确定哪些进程可以使用中央处理器（CPU）、何时使用以及持续多长时间
- 设备驱动程序：充当硬件与进程之间的调解程序/解释程序
- 系统调用和安全防护：从流程接受服务请求

![Linux 内核](https://cdn.paicoding.com/stutymore/linux-20240205070003.png)

这一部分内容比较深，能把它学透的基本就是大牛了，写个 OS 就不在话下。

[linux 内核学习资料：200+经典内核文章，100+内核论文，50+内核项目，500+内核面试题，80+内核视频](https://github.com/0voice/linux_kernel_wiki)

### 驱动开发和嵌入式系统开发

驱动开发不是必学的。

[从 0 开始学 Linux 驱动开发](https://paper.seebug.org/779/)

嵌入式开发包括很多方向，有硬件、软件，以及系统级别。

硬件要学单片机，ARM、MIPS，DSP 等各种 MCU，Verilog， RTL， 具体就不多说了，跟 Linux 关系不太大。

软件的话，需要了解交叉编译，以及嵌入式环境下 C 语言的特殊用法，例如 volatile、 位操作、寄存器操作、大小端、程序跳转等。

系统级，要了解 Linux 内核裁剪、移植、编译、调试，还有 Bootloader 、设备驱动等。

[嵌入式 Linux 应用与开发实践中国大学 mooc 网](https://www.icourse163.org/course/JSIT-1001754045)

## Linux 学习建议

多动手实践，建议自己购买一台云服务器，并且在本地搭建 Linux 虚拟机环境。

一定要自己从 0 开始手敲命令安装软件、部署服务，熟悉整个项目的上线流程。

每个命令至少要跟着敲一遍，了解它们的作用，并通过自然地练习，熟悉常用的 Linux 命令。

记不住没关系，用文档查就行了。

先会用，再理解。

时间不多的话，可以通过面试题来了解一些 Linux 设计思想，而不是直接去深入学习内核，虽说学会了的确大有裨益，但性价比不高。

## Linux 学习资源

首先推荐韩顺平老师的一周学会 Linux：

> B 站地址：[https://www.bilibili.com/video/BV1Sv411r7vd](https://www.bilibili.com/video/BV1Sv411r7vd)

![韩顺平老师的一周学会 Linux](https://cdn.paicoding.com/stutymore/linux-20240205070044.png)

其次是狂神说的 Linux 教程：

> [https://www.bilibili.com/video/BV187411y7hF](https://www.bilibili.com/video/BV187411y7hF)

![狂神说的 Linux 教程](https://cdn.paicoding.com/stutymore/linux-20240205070054.png)

阿里云的这个 Linux 运维学习路线也不错：

> [https://edu.aliyun.com/roadmap/linux](https://edu.aliyun.com/roadmap/linux)

书籍的话：

- 《[鸟哥的 Linux 私房菜 —— 基础篇](https://book.douban.com/subject/4889838/)》
- [《深入理解 Linux 网络： 修炼底层内功，掌握高性能原理》](https://book.douban.com/subject/35922722/)
- [《深入理解 LINUX 内核(第三版)》](https://book.douban.com/subject/2287506/)
- [《Linux 是怎样工作的》](https://book.douban.com/subject/35768243/)
- [《Linux 内核完全剖析》](https://book.douban.com/subject/3229243/)

## 参考资料：

- [https://github.com/judasn/Linux-Tutorial](https://github.com/judasn/Linux-Tutorial)
- [https://zhuanlan.zhihu.com/p/26859197](https://zhuanlan.zhihu.com/p/26859197)
- [https://gitee.com/liyupi/code-roadmap](https://gitee.com/liyupi/code-roadmap)
- [https://www.redhat.com/zh/topics/linux/what-is-the-linux-kernel](https://www.redhat.com/zh/topics/linux/what-is-the-linux-kernel)

---

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括 Java 基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM 等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.paicoding.com/tobebetterjavaer/images/gongzhonghao.png)
