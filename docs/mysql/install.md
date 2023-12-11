---
title: MySQL 的安装
shortTitle: MySQL 安装
description: MySQL 的安装，主要有 Windows 平台和 macOS 平台，服务器上的一般就是 Linux。
category:
  - MySQL
tag:
  - MySQL
head:
  - - meta
    - name: keywords
      content: mysql,MySQL,MySQL安装
---

## MySQL 是什么

MySQL 是一个关系型数据库，也是我们国内使用频率最高的一种数据库（没有之一），不管是校招还是社招，都是必考内容，并且考察项目会非常多，属于二哥一直强调的 Java 后端四大件之一。

MySQL 的学习路线戳：[MySQL 的学习四阶段](https://javabetter.cn/xuexiluxian/mysql.html)

对于学生党来说，我推荐大家至少在大一下半学期完成 MySQL 的学习，因为在后面做项目的时候，必然会用到 MySQL 进行 CRUD。不然就不是一名称职的 CRUD 工程师（😂）。

好，要想学好 MySQL，就必然需要在本地先安装 MySQL，主要分为 Windows 平台和 macOS 平台，服务器（生产环境）上的一般就是 Linux。

我们接下来都会给大家讲到，稍安勿躁。

## MySQL 的安装

从 MySQL 的应用领域来说，MySQL 一共可以分为四个版本：

- MySQL Community Server（社区版），我们一般都用这个版本（免费，可白嫖 😁）。
- MySQL Enterprise Edition（企业版），需要付费，一般大型企业才会用。
- MySQL Cluster（集群版），用于架设 MySQL 集群，一般也是大型企业才会用到，小公司一个单体的 MySQL 就够用了。
- MySQL Cluster CGE (Carrier Grade Edition)，MySQL Cluster 的高级版本，提供了额外的稳定性和性能。不在我们的讨论范围内。

从 MySQL 的发展历史来说，目前主流的版本是 MySQL 8.0，[技术派](https://paicoding.com)项目用的就是 MySQL 8.0，不支持 MySQL 5.7（以前的主流版本，于 2023 年 10 月 31 日 终结生命周期）。

MySQL 8.0 引入了很多重大更新，包括：

- 默认 utf8mb4 字符集，支持 emoji 表情符号。
- InnoDB 增强，比如说自增列支持自动填充（auto_increment），消除以往重启实例自增列不连续的问题。
- 性能增强，8.0 相比 5.7 在高并发时性能提升近 1 倍。
- 更多新特性参照[这篇](https://www.cnblogs.com/YangJiaXin/p/13800134.html)。

接下来的安装，我们都以 MySQL 8.0 为例。

### Windows 平台

直接进入 MySQL 官网进行下载。

[https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)

或者直接在搜素引擎上搜“MySQL 下载”关键字，直接跳转到官网。

![](https://cdn.tobebetterjavaer.com/stutymore/install-20231210224715.png)

网站会根据你的操作系统自动帮你匹配对应的版本，如下图所示。新手直接下载 MSI 安装包即可。

![](https://cdn.tobebetterjavaer.com/stutymore/install-20231210224749.png)

> Microsoft Installer，一种用于安装、维护和删除 Windows 操作系统上的软件的文件格式。

当出现以下界面时，直接选择「no thanks，just start my download」即可。

![](https://cdn.tobebetterjavaer.com/stutymore/install-20231210225343.png)

下载完成后，直接双击安装（我这里只说关键步骤）。

当出现下面这一步时，选择默认的开发者模式就好（会安装 MySQL 服务器「必须」、MySQL Shell「命令行操作」、MySQL 连接器「支持编程语言和 MySQL 之间的通信」等）。

![](https://cdn.tobebetterjavaer.com/stutymore/install-20231210230230.png)

其他的选项我就不解释了，能看懂的话就自己选择，看不懂的话默认就好（😂）。

在「高可用」界面上选择「Standalone MySql Server / Classic MySQL Replication」，意思就是我们打算让 MySQL 作为单机服务器来运行。

![](https://cdn.tobebetterjavaer.com/stutymore/install-20231211095400.png)

在「Type and Networking」界面上，选择「Development Computer」，开发计算机，占用最小资源。

![](https://cdn.tobebetterjavaer.com/stutymore/install-20231211095628.png)

「Connectivity」中如果 3306 端口被占用的情况下可以修改，但不建议，保持默认就好。

![](https://cdn.tobebetterjavaer.com/stutymore/install-20231211095809.png)

MySQL 8.0 版本可以使用强密码，本地开发随便选就好。

![](https://cdn.tobebetterjavaer.com/stutymore/install-20231211100133.png)

安装过程中会提示你输入 root 用户的密码，这个密码一定要记住，后面会用到。

![](https://cdn.tobebetterjavaer.com/stutymore/install-20231211100308.png)

在「Windows Service」界面上，可以勾选复选框让 MySQL 作为 Windows 服务运行，然后指定服务名（当开机时启动 MySQL），并作为标准系统账号。

![](https://cdn.tobebetterjavaer.com/stutymore/install-20231211100333.png)

就这样一直到 finish 就行，其他的配置不明白的话，可以参考这篇：[在 Windows 上安装 MySQL](https://www.sjkjc.com/mysql/install-on-windows/)

### macOS 平台

可以使用 [Homebrew](https://javabetter.cn/gongju/brew.html) 来安装 MySQL，但这里为了和 Windows 安装匹配，我们这里依然使用官网下载安装包的方式。

[https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)

根据自己的 macOS 是 Intel 还是 M1 芯片，选择对应的版本。

![](https://cdn.tobebetterjavaer.com/stutymore/install-20231211101108.png)

我 目前的机器是 Intel 版本，所以选择 [x86 架构](https://zh.wikipedia.org/zh-sg/X86)的 64 位版本，苹果最新的芯片采用的是 [ARM 架构](https://zh.wikipedia.org/zh-cn/ARM)，高级精简指令集，不懂的小伙伴可以去查一下维基百科

你也可以直接运行 `uname -m` 命令来查看自己的 macOS 是基于哪种架构。

![](https://cdn.tobebetterjavaer.com/stutymore/install-20231211104408.png)

安装方式几乎和 Windows 完全一样，我这里就不再赘述了。

安装完成后，会在系统偏好设置里出现一个 MySQL 的服务图标，如下图所示。

![](https://cdn.tobebetterjavaer.com/stutymore/install-20231211101657.png)

如果使用 Homebrew 安装的话，可以问一下 [wrap](https://javabetter.cn/gongju/warp.html) AI。

![](https://cdn.tobebetterjavaer.com/stutymore/install-20231211101804.png)

### Linux 平台

Linux 平台通常又分为 CentOS 和 Ubuntu 两种：

- CentOS（Community ENTerprise Operating System）是 Red Hat Enterprise Linux（RHEL）的一个免费克隆版本；使用 YUM（Yellowdog Updater Modified）作为其包管理工具。
- Ubuntu 是基于 Debian 的 Linux 发行版；使用 APT（Advanced Packaging Tool）作为包管理工具。

可以通过 `cat /etc/os-release` 命令来查看自己的 Linux 版本。二哥目前有两台服务器，一台腾讯云的，一台阿里云的，TencentOS 是完全兼容 CentOS 的；阿里云的是 Ubuntu。

![](https://cdn.tobebetterjavaer.com/stutymore/install-20231211104952.png)

#### CentOS

CentOS 可以使用 yum 命令来安装 MySQL。

```
# 安装命令
yum install mysql mysql-server mysql-libs

# 初始密码查找

grep "temporary password" /var/log/mysqld.log

## 输出如下
# A temporary password is generated for root@localhost: xxxx
```

#### Ubuntu

Ubuntu 可以使用 apt-get 命令来安装 MySQL。

```
# 安装命令
sudo apt-get install mysql-server mysql-client -y

# 注意安装过程中的初始化密码设置（若没有，则可以通过下面的方法找到初始化密码）

grep "temporary password" /var/log/mysqld.log

## 输出如下
# A temporary password is generated for root@localhost: xxxx
```

安装完成后，可以通过 `set password` 或者 `update user` 命令来修改 MySQL 的登录密码。

比如说，我想把 root 用户的密码修改为 123，可以通过以下命令来修改。

```
set password for root@localhost = password('123');
```

或者

```
use mysql;

update user set password=password('123') where user='root' and host='localhost';

flush privileges;
```

## MySQL 的启动和停止

Windows 和 macOS 平台的 MySQL 安装完成后，启动或者停止服务可以直接到系统服务/偏好设置里面进行操作。

比如说：

![](https://cdn.tobebetterjavaer.com/stutymore/install-20231211105739.png)

Linux 的话就主要通过命令来完成，比如说。

```
# 启动
sudo service mysql start
# 或 sudo service mysqld start

# 关闭
sudo service mysql stop

# 重启
sudo service mysql restart
```

> sudo（superuser do的缩写）是 Linux 下的一个命令，用于以 root 权限执行命令。

## MySQL 的连接

MySQL 的连接方式主要有两种：

- 命令行连接，MySQL 自带的
- 图形化连接，比如说 Workbench、Navicat（[Windows 版](https://paicoding.com/article/detail/411)、[macOS 版](https://paicoding.com/article/detail/410)）、DataGrip 等

### 命令行连接

如果 MySQL 已经安装到系统环境变量中，那么可以直接在命令行中输入 `mysql -u root -p` 来连接 MySQL。

![](https://cdn.tobebetterjavaer.com/stutymore/install-20231211110505.png)

如果没有安装到系统环境变量中，Windows 平台可以在 MySQL 的安装目录下的 bin 目录中找到 mysql.exe 文件，macOS 平台可以在 `/usr/local/mysql/bin` 目录下找到 mysql 文件。

这里以 Windows 为例，打开 cmd 命令行窗口，导航到 bin 目录。

```
cd C:\Program Files\MySQL\MySQL Server 8.0\bin
```

然后输入 `mysql -u root -p` 命令来连接 MySQL。随后输入密码就可以访问 MySQL 服务了。

### 图形化连接

我个人使用的是 [Navicat](https://paicoding.com/article/detail/411)，大家可以通过链接找到安装包，安装完成后新建连接。

![](https://cdn.tobebetterjavaer.com/stutymore/install-20231211111109.png)

然后就可以查看对应的数据库和表了。

![](https://cdn.tobebetterjavaer.com/stutymore/install-20231211111211.png)

## 小结

这篇内容详细地介绍了 Windows、macOS 和 Linux 平台下 MySQL 的安装和连接，算是为后面的《二哥的 MySQL 进阶之路》做好了铺垫，冲。