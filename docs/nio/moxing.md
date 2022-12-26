---
title: 一文彻底理解Java IO模型(阻塞IO非阻塞IO/IO多路复用)
shortTitle: 一文彻底理解Java IO模型
category:
  - Java核心
tag:
  - Java NIO
description: Java程序员进阶之路，小白的零基础Java教程，一文彻底理解 Java IO 模型(非阻塞 IO/IO多路复用/异步IO)
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,nio,多路复用,阻塞IO
---


**文件的IO就告一段落了**，我们来学习网络中的IO~~~为了更好地理解NIO，**我们先来学习一下IO的模型**~

根据UNIX网络编程对I/O模型的分类，**在UNIX可以归纳成5种I/O模型**：

*   **阻塞I/O**
*   **非阻塞I/O**
*   **I/O多路复用**
*   信号驱动I/O
*   异步I/O

## 学习I/O模型需要的基础

### 文件描述符

Linux 的内核将所有外部设备**都看做一个文件来操作**，对一个文件的读写操作会**调用内核提供的系统命令(api)**，返回一个`file descriptor`（fd，文件描述符）。而对一个socket的读写也会有响应的描述符，称为`socket fd`（socket文件描述符），描述符就是一个数字，**指向内核中的一个结构体**（文件路径，数据区等一些属性）。

*   所以说：在Linux下对文件的操作是**利用文件描述符(file descriptor)来实现的**。

### 用户空间和内核空间

为了保证用户进程不能直接操作内核（kernel），**保证内核的安全**，操心系统将虚拟空间划分为两部分

*   **一部分为内核空间**。
*   **一部分为用户空间**。

### I/O运行过程

我们来看看IO在系统中的运行是怎么样的(我们**以read为例**)



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/moxing-54ee4738-b689-4026-863f-13e456b374de.jpg)



可以发现的是：当应用程序调用read方法时，是需要**等待**的--->从内核空间中找数据，再将内核空间的数据拷贝到用户空间的。

*   **这个等待是必要的过程**！

下面只讲解用得最多的3个I/0模型：

*   **阻塞I/O**
*   **非阻塞I/O**
*   **I/O多路复用**

## 阻塞I/O模型

在进程(用户)空间中调用`recvfrom`，其系统调用直到数据包到达且**被复制到应用进程的缓冲区中或者发生错误时才返回**，在此期间**一直等待**。



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/moxing-8a1cb207-6c56-4bd8-8489-c21d5a76e1ca.jpg)



## 非阻塞I/O模型

`recvfrom`从应用层到内核的时候，如果没有数据就**直接返回**一个EWOULDBLOCK错误，一般都对非阻塞I/O模型**进行轮询检查这个状态**，看内核是不是有数据到来。



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/moxing-6590a3de-0e7c-4ce2-aa1c-815625095e62.jpg)



## I/O复用模型

前面也已经说了：在Linux下对文件的操作是**利用文件描述符(file descriptor)来实现的**。

在Linux下它是这样子实现I/O复用模型的：

*   调用`select/poll/epoll/pselect`其中一个函数，**传入多个文件描述符**，如果有一个文件描述符**就绪，则返回**，否则阻塞直到超时。

比如`poll()`函数是这样子的：`int poll(struct pollfd *fds,nfds_t nfds, int timeout);`

其中 `pollfd` 结构定义如下：

```c
struct pollfd {
    int fd;         /* 文件描述符 */
    short events;         /* 等待的事件 */
    short revents;       /* 实际发生了的事件 */
};
```



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/moxing-aec90e84-33c5-4f5b-997e-8db54d6bce88.jpg)





![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nio/moxing-62def8ad-3ca3-467b-81f6-5d0a31dd7fdc.jpg)



*   （1）当用户进程调用了select，那么整个进程会被block；
*   （2）而同时，kernel会“监视”所有select负责的socket；
*   （3）当任何一个socket中的数据准备好了，select就会返回；
*   （4）这个时候用户进程再调用read操作，将数据从kernel拷贝到用户进程(空间)。
*   所以，I/O 多路复用的特点是**通过一种机制一个进程能同时等待多个文件描述符**，而这些文件描述符**其中的任意一个进入读就绪状态**，select()函数**就可以返回**。

select/epoll的优势并不是对于单个连接能处理得更快，而是**在于能处理更多的连接**。

## I/O模型总结

正经的描述都在上面给出了，不知道大家理解了没有。下面我举几个例子总结一下这三种模型：

**阻塞I/O：**

*   Java3y跟女朋友去买喜茶，排了很久的队终于可以点饮料了。我要绿研，谢谢。可是喜茶不是点了单就能立即拿，于是我**在喜茶门口等了一小时才拿到**绿研。

*   在门口干等一小时



**非阻塞I/O：**

*   Java3y跟女朋友去买一点点，排了很久的队终于可以点饮料了。我要波霸奶茶，谢谢。可是一点点不是点了单就能立即拿，**同时**服务员告诉我：你大概要等半小时哦。你们先去逛逛吧~于是Java3y跟女朋友去玩了几把斗地主，感觉时间差不多了。于是**又去一点点问**：请问到我了吗？我的单号是xxx。服务员告诉Java3y：还没到呢，现在的单号是XXX，你还要等一会，可以去附近耍耍。问了好几次后，终于拿到我的波霸奶茶了。

*   去逛了下街、斗了下地主，时不时问问到我了没有



**I/O复用模型：**

*   Java3y跟女朋友去麦当劳吃汉堡包，现在就厉害了可以使用微信小程序点餐了。于是跟女朋友找了个地方坐下就用小程序点餐了。点餐了之后玩玩斗地主、聊聊天什么的。**时不时听到广播在复述XXX请取餐**，反正我的单号还没到，就继续玩呗。~~**等听到广播的时候再取餐就是了**。时间过得挺快的，此时传来：Java3y请过来取餐。于是我就能拿到我的麦辣鸡翅汉堡了。

*   听广播取餐，**广播不是为我一个人服务**。广播喊到我了，我过去取就Ok了。

>参考链接：[https://www.zhihu.com/question/29005375/answer/667616386](https://www.zhihu.com/question/29005375/answer/667616386)，整理：沉默王二

---------

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)