---
title: Linux面试题，1道Linux八股文（1万字1张手绘图），面渣逆袭必看👍
shortTitle: 面渣逆袭-Linux
description: 下载次数超 1 万次，1 万字 1 张手绘图，详解 1 道 Linux 面试高频题（让天下没有难背的八股），面渣背会这些 Linux 八股文，这次吊打面试官，我觉得稳了（手动 dog）。
author: 沉默王二
category:
  - 面渣逆袭
tag:
  - 面渣逆袭
head:
  - - meta
    - name: keywords
      content: Linux面试题,Linux,linux,面试题,八股文
---


> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的用友金融一面原题：Linux 的常用命令

## 1. Linux 常用命令

推荐阅读：[常用高频 Linux 速查备忘手册](https://javabetter.cn/pdf/linux.html)

我自己常用的 Linux 命令有 top 查看系统资源、ps 查看进程、netstat 查看网络连接、ping 测试网络连通性、find 查找文件、chmod 修改文件权限、kill 终止进程、df 查看磁盘空间、free 查看内存使用、service 启动服务、mkdir 创建目录、rm 删除文件、rmdir 删除目录、cp 复制文件、mv 移动文件、zip 压缩文件、unzip 解压文件等等这些。

>下面这些列表供大家作为参考，可以根据自己的实际情况进行选择。

### 文件操作

- `ls`：列出目录内容。`ls -l`显示详细信息，`ls -a`显示隐藏文件。
- `cd`：更改当前目录。`cd ..`回到上级目录，`cd ~`回到用户的主目录。
- `pwd`：显示当前工作目录的完整路径。
- `cp`：复制文件或目录。`cp source_file target_file`复制文件，`cp -r source_directory target_directory`复制目录。
- `mv`：移动或重命名文件或目录。
- `rm`：删除文件或目录。`rm -r`递归删除目录及其内容。
- `mkdir`：创建新目录。
- `cat`：查看文件内容。`cat file1 file2`合并文件内容显示。

### 系统管理

- `ps`：显示当前运行的进程。`ps aux`显示所有进程。
- `top`：实时显示进程动态。
- `kill`：终止进程。`kill -9 PID`强制终止。
- `df`：显示磁盘空间使用情况。`df -h`以易读格式显示。
- `du`：显示目录或文件的磁盘使用情况。
- `free`：显示内存和交换空间的使用情况。
- `chmod`：更改文件或目录的权限。
- `chown`：更改文件或目录的所有者和所属组。

### 网络管理

- `ping`：检查与远程服务器的连接。
- `wget`：从网络上下载文件。

### 压缩和解压

- `tar`：打包或解包`.tar`文件。`tar cvf archive.tar files`打包，`tar xvf archive.tar`解包。
- `gzip` / `gunzip`：压缩或解压`.gz`文件。
- `zip` / `unzip`：压缩或解压`.zip`文件。

### 查找文件

- `find`：在目录树中查找文件。`find /directory/ -name filename`。

