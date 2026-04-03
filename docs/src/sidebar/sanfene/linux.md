---
title: Linux面试题，1道Linux八股文（1万字2张手绘图），面渣逆袭必看👍
shortTitle: 面渣逆袭-Linux
description: 下载次数超 1 万次，1 万字 2 张手绘图，详解 2 道 Linux 面试高频题（让天下没有难背的八股），面渣背会这些 Linux 八股文，这次吊打面试官，我觉得稳了（手动 dog）。
author: 沉默王二
date: 2024-12-01
category:
  - 面渣逆袭
tag:
  - 面渣逆袭
head:
  - - meta
    - name: keywords
      content: Linux面试题,Linux,linux,面试题,八股文
---

## 1. Linux 常用命令

推荐阅读：[常用高频 Linux 速查备忘手册](https://javabetter.cn/pdf/linux.html)

我自己常用的 Linux 命令有：

- top 用来查看系统资源
- `ps -ef | grep java` 查看 Java 进程
- `netstat` 查看网络连接
- ping 测试网络连通性
- find 查找文件
- chmod 修改文件权限
- kill 终止进程
- df 查看磁盘空间
- mkdir 创建目录、rm 删除文件、cp 复制文件、mv 移动文件
- zip 压缩文件、unzip 解压文件等等这些。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的作业帮面经同学 1 Java 后端一面面试原题：常用linux命令
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的虾皮面经同学 13 一面面试原题：常见的linux命令
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的阿里云面经同学 22 面经：linux常用命令

### 文件操作的命令有哪些？

- `ls`：列出目录内容。`ls -l`显示详细信息，`ls -a`显示隐藏文件。
- `cd`：更改当前目录。`cd ..`回到上级目录，`cd ~`回到用户的主目录。
- `pwd`：显示当前工作目录的完整路径。
- `cp`：复制文件或目录。`cp source_file target_file`复制文件，`cp -r source_directory target_directory`复制目录。
- `mv`：移动或重命名文件或目录。
- `rm`：删除文件或目录。`rm -r`递归删除目录及其内容。
- `mkdir`：创建新目录。
- `cat`：查看文件内容。`cat file1 file2`合并文件内容显示。

#### Windows下如何创建空文件

Windows 下我还是比较习惯使用右键菜单新建一个文件，然后重命名。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的同学 30 腾讯音乐面试原题：如果是Windows，如何去创建一个空文件的？

#### 如何查看系统的日志文件？

在 Linux 中，可以通过 cat、more、less、tail、head 等命令查看系统日志文件。

也可以直接通过 vim 打开日志文件，然后按照关键字去搜查对应的日志信息。

常见的系统日志文件包括：

- `/var/log/syslog`：包含系统范围内的消息和错误日志，包括启动日志、内核日志等，是排查系统问题的首选日志文件之一。
- `/var/log/messages`：类似于 syslog，但通常更多关注系统级别的消息和错误。

> 1. [二哥编程星球](https://javabetter.cn/zhishixingqiu/)球友[枕云眠美团 AI 面试原题](https://t.zsxq.com/BaHOh)：如何查看系统日志文件，常见的系统日志文件有哪些


### 系统管理的命令有哪些？

- `ps`：显示当前运行的进程。`ps aux`显示所有进程。
- `top`：实时显示进程动态。
- `kill`：终止进程。`kill -9 PID`强制终止。
- `df`：显示磁盘空间使用情况。`df -h`以易读格式显示。
- `du`：显示目录或文件的磁盘使用情况。
- `free`：显示内存和交换空间的使用情况。
- `chmod`：更改文件或目录的权限。
- `chown`：更改文件或目录的所有者和所属组。

#### 如何查看Linux进程或CPU使用情况？

top 命令可以实时查看所有进程的 CPU 和内存使用情况。

![二哥的 Java 进阶之路：top面板](https://cdn.paicoding.com/stutymore/linux-20241225092615.png)

`ps aux --sort=-%cpu | head -5`可以查看 CPU 使用率最高的 5 个进程。

![二哥的 Java 进阶之路：ps 命令](https://cdn.paicoding.com/stutymore/linux-20241223162812.png)

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的同学 30 腾讯音乐面试原题：怎么查看一个进程的Cpu 使用率呢？

#### 如何查看Linux内存使用情况？

可以使用 watch 配合 free 命令实时监控内存使用情况。如 `watch -n 1 free -m`每秒刷新一次内存使用情况。

![二哥的 Java 进阶之路：free](https://cdn.paicoding.com/stutymore/linux-20241223163021.png)

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 29 Java 后端一面原题：如何看Linux进程或CPU使用情况？Linux查看内存情况？


#### 如何查看系统负载？

top 命令是实时查看系统性能的常用工具，系统负载信息通常显示在 top 命令输出的顶部。它还显示了系统运行的进程、内存使用情况等。

![二哥的 Java 进阶之路：TOP 命令](https://cdn.paicoding.com/stutymore/linux-20240813114745.png)

> 1. [二哥编程星球](https://javabetter.cn/zhishixingqiu/)球友[枕云眠美团 AI 面试原题](https://t.zsxq.com/BaHOh)：如何查看系统负载，系统中的 load average 含义是什么

#### Load Average 是什么？

load average 是一个反映系统负载的指标，表示在一段时间内系统正在处理的平均进程数量。通常，它包含三个数值，分别对应过去 1 分钟、5 分钟和 15 分钟的平均负载。

比如说上图中出现的 `load average: 1.80, 1.74, 1.83` 表示：

- 1.80：表示过去 1 分钟内，系统平均有 1.80 个进程在等待处理（包括 CPU 正在处理和等待被调度的进程）。
- 1.74：表示过去 5 分钟内的平均负载。
- 1.83：表示过去 15 分钟内的平均负载。

load average 的数值可以看作是系统的工作队列长度（等待处理的任务数量）。如果这个数值接近或等于 CPU 核心数，说明系统的负载是合理的。

如果 load average 大于 CPU 核心数，表示系统的进程比 CPU 能处理的多，系统可能处于过载状态。

在单核系统中，load average 数值超过 1 通常意味着系统繁忙（有任务在等待 CPU）。

在多核系统中，假设有 N 个 CPU 核心，load average 接近 N 时表示系统正处于高负载状态，但还在可接受范围内。如果 load average 超过 N，则意味着系统可能过载。

macOS 上可以通过 `sysctl -a | grep machdep.cpu.core_count` 查看 CPU 核心数，我本机目前是 16 核。

![二哥的 Java 进阶之路：macOS 的 CPU 核心数](https://cdn.paicoding.com/stutymore/linux-20240813115642.png)

> 1. [二哥编程星球](https://javabetter.cn/zhishixingqiu/)球友[枕云眠美团 AI 面试原题](https://t.zsxq.com/BaHOh)：如何查看系统负载，系统中的 load average 含义是什么

#### chmod 的参数讲一下？

chmod 命令在 Linux 中用来改变文件或目录的访问权限。这个命令的使用可以基于符号表示法（也称为文本方法）或者八进制数表示法。

像 `chmod 777 file` 赋予文件所有权限，就属于八进制数表示法。`7=4+2+1`，分别代表读、写、执行权限。

Linux 中的权限可以应用于三种类别的用户：

- 文件所有者（u）
- 与文件所有者同组的用户（g）
- 其他用户（o）

![图片来源于网络](https://cdn.paicoding.com/stutymore/linux-vip-20240214205642.png)

①、符号模式

符号模式使用字母来表示权限，如下：

- 读（r）
- 写（w）
- 执行（x）
- 所有（a）

例如：

- `chmod u+w file`：给文件所有者添加写权限。
- `chmod g-r file`：移除组用户的读权限。
- `chmod o+x file`：给其他用户添加执行权限。
- `chmod u=rwx,g=rx,o=r file`：设置文件所有者具有读写执行权限，组用户具有读执行权限，其他用户具有读权限。

②、数字模式

数字模式使用三位八进制数来表示权限，每位数字代表不同的用户类别（所有者、组、其他用户），数字是其各自权限值的总和：

- 读（r）= 4
- 写（w）= 2
- 执行（x）= 1

![图片来源于网络](https://cdn.paicoding.com/stutymore/linux-vip-20240214205700.png)

因此，权限模式可以是从 0（无权限）到 7（读写执行权限）的任何值。

- chmod 755 file：使得文件所有者有读写执行（7）权限，组用户和其他用户有读和执行（5）权限。
- chmod 644 file：使得文件所有者有读写（6）权限，而组用户和其他用户只有读（4）权限。

#### `kill -9` 中的 9 是什么意思？

`kill -9 PID` 是一种强制终止进程的方式，其中的 9 表示信号编号，代表 SIGKILL 信号。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的阿里云面经同学 22 面经：kill -9 9的意义是什么

### 网络管理的命令有哪些？

- `ping`：检查与远程服务器的连接。
- `wget`：从网络上下载文件。
- `ifconfig`：显示网络接口的配置信息。
- `netstat`：显示网络连接、路由表和网络接口信息。

#### 如何查看8080端口的连接数？

可以通过 netstat 命令查看，如`netstat -an | grep ':8080' | grep 'tcp' | wc -l`。

![二哥的 Java 进阶之路：netstat 命令查看 8080 端口](https://cdn.paicoding.com/stutymore/linux-20241223161926.png)

- `-a`：显示所有网络连接和监听端口。
- `-n`：以数字形式显示地址和端口。
- `grep ':8080'`：过滤出 8080 端口的连接。
- `grep 'tcp'`：仅显示 TCP 连接。
- `wc -l`：统计匹配到的行数，即连接数。

也可以使用 `ss` 命令，它是 netstat 的替代工具；还可以使用 `lsof` 命令，它可以列出当前系统打开的文件和套接字。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 29 Java 后端一面原题：Linux系统的8080端口有多少个TCP连接，怎么看？

### 压缩和解压的命令有哪些？

- `tar`：打包或解包`.tar`文件。`tar cvf archive.tar files`打包，`tar xvf archive.tar`解包。
- `gzip` / `gunzip`：压缩或解压`.gz`文件。
- `zip` / `unzip`：压缩或解压`.zip`文件。

### 查找文件的命令有哪些？

- `find`：在目录树中查找文件。`find /directory/ -name filename`。

#### Liunx 下查找一个文件怎么做？

在 Linux 环境下查找文件，有多种命令和方法可以使用。find 命令是最常用的文件查找工具之一，它可以在指定目录下递归查找符合条件的文件和目录。

例如：在当前目录及其子目录中查找名为 "example.txt" 的文件

```shell
find . -name "example.txt"
```

例如：查找 `/home` 目录中所有 `.txt` 结尾的文件：

```shell
find /home -name "*.txt"
```

例如：查找 `/var/log` 目录中修改时间在 7 天以前的 `.log` 文件

```shell
find /var/log -name "*.log" -mtime +7
```

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的用友金融一面原题：Linux 的常用命令
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的华为 OD 面经同学 1 一面面试原题：Linux 使用过哪些命令
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小公司面经同学 5 Java 后端面试原题：Liunx 下查找一个文件怎么做
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的华为 OD 面经同学 1 一面面试原题：chmod 的参数讲一下?

## 2. Linux 系统管理

### 用户和用户组有什么区别？

在 Linux 中，用户和用户组是系统权限管理的核心概念。

每个用户在 Linux 中都有一个独立的账户，用于标识该用户并控制其对系统资源的访问。用户包括普通用户和超级用户（root）。普通用户的权限有限，只能访问和修改自己拥有的文件和目录，而超级用户拥有系统的最高权限，能够执行任何操作。

每个用户在系统中都有一个唯一的用户 ID（UID），以及一个关联的用户名（login name）。

用户组是用户的集合，用于简化权限管理。每个用户可以属于一个或多个用户组，而每个用户组都有一个唯一的组 ID（GID）。通过将用户分配到不同的组，系统可以更方便地管理对文件和目录的访问权限。

一个文件或目录可以由一个用户和一个用户组拥有，系统根据文件或目录的所有者和所属组来确定其他用户对它的访问权限。

可以使用 groupadd 命令来创建新的用户组。例如：

```shell
sudo groupadd developers
```

可以使用 useradd 命令来创建新的用户。创建用户时可以指定该用户的默认用户组、主目录等。例如，创建一个名为 johndoe 的用户，并将其添加到 developers 组：

```shell
sudo useradd -m -g developers johndoe
```

- `-m`：表示创建用户的同时创建用户的主目录（通常在`/home/username`）。
- `-g`：指定用户的初始用户组。

> 1. [二哥编程星球](https://javabetter.cn/zhishixingqiu/)球友[枕云眠美团 AI 面试原题](https://t.zsxq.com/BaHOh)：解释linux中的用户和用户组概念，如何创建新用户和用户组

### 如何用linux命令去查找某个qps?

如果服务通过网络提供访问，可以使用 netstat 或 ss 命令统计特定端口的连接数，并结合 watch 命令来监控实时的连接速率。

例如，统计 HTTPS 服务（通常运行在端口 443）每秒的请求数：

```shell
watch -n 1 "netstat -an | grep ':443 ' | grep ESTABLISHED | wc -l"
```

解释一下：

- `netstat -an`：显示所有连接和监听端口。
- `grep ':443 '`：过滤出端口 443 的连接。
- `grep ESTABLISHED`：过滤出已经建立的连接。
- `wc -l`：统计连接数。
- `watch -n 1`：每秒刷新一次命令的输出。

观察连接数的变化，可以大致估算出每秒的请求数。

![二哥的 Java 进阶之路：技术派的 443 请求数](https://cdn.paicoding.com/stutymore/linux-20240902112732.png)

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的作业帮面经同学 1 Java 后端一面面试原题：用linux命令去查找某个qps

## 3. Git 常用命令

### Git 常用命令有哪些？

- `git clone <repository-url>`：克隆远程仓库。
- `git status`：查看工作区和暂存区的状态。
- `git add <file>`：将文件添加到暂存区。
- `git commit -m "message"`：提交暂存区的文件到本地仓库。
- `git log`：查看提交历史。
- `git merge <branch-name>`：合并指定分支到当前分支。
- `git checkout <branch-name>`：切换分支。
- `git pull`：拉取远程仓库的更新。

---

_没有什么使我停留——除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟_。

**系列内容**：

- [面渣逆袭 Java SE 篇 👍](https://javabetter.cn/sidebar/sanfene/javase.html)
- [面渣逆袭 Java 集合框架篇 👍](https://javabetter.cn/sidebar/sanfene/javathread.html)
- [面渣逆袭 Java 并发编程篇 👍](https://javabetter.cn/sidebar/sanfene/collection.html)
- [面渣逆袭 JVM 篇 👍](https://javabetter.cn/sidebar/sanfene/jvm.html)
- [面渣逆袭 Spring 篇 👍](https://javabetter.cn/sidebar/sanfene/spring.html)
- [面渣逆袭 Redis 篇 👍](https://javabetter.cn/sidebar/sanfene/redis.html)
- [面渣逆袭 MyBatis 篇 👍](https://javabetter.cn/sidebar/sanfene/mybatis.html)
- [面渣逆袭 MySQL 篇 👍](https://javabetter.cn/sidebar/sanfene/mysql.html)
- [面渣逆袭操作系统篇 👍](https://javabetter.cn/sidebar/sanfene/os.html)
- [面渣逆袭计算机网络篇 👍](https://javabetter.cn/sidebar/sanfene/network.html)
- [面渣逆袭 RocketMQ 篇 👍](https://javabetter.cn/sidebar/sanfene/rocketmq.html)
- [面渣逆袭分布式篇 👍](https://javabetter.cn/sidebar/sanfene/fenbushi.html)
- [面渣逆袭微服务篇 👍](https://javabetter.cn/sidebar/sanfene/weifuwu.html)
- [面渣逆袭设计模式篇 👍](https://javabetter.cn/sidebar/sanfene/shejimoshi.html)
- [面渣逆袭 Linux 篇 👍](https://javabetter.cn/sidebar/sanfene/linux.html)
- [面渣逆袭OpenClaw篇 👍](https://javabetter.cn/sidebar/sanfene/openclaw.html)
- [面渣逆袭Skills篇 👍](https://javabetter.cn/sidebar/sanfene/skills.html)

---

GitHub 上标星 16000+ 的开源知识库《[面渣逆袭](https://github.com/itwanger/toBeBetterJavaer)》第二版 PDF 终于来了！包括 Java基础、Java 集合框架、Java 并发编程、JVM、Spring、Redis、MyBatis、MySQL、操作系统、计算机网络、RocketMQ、分布式、微服务、设计模式、Linux、OpenClaw 等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[面渣逆袭 2.0 版 PDF 发布，Java后端程序员必背，可能是 2026 年最好的八股文](https://paicoding.com/article/detail/2529100000262147)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.paicoding.com/tobebetterjavaer/images/gongzhonghao.png)
