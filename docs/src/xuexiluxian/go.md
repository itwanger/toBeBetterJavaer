---
star: true
title: 2024年最新超详细的 Go 语言学习路线（建议收藏🔥）
shortTitle: Go 语言学习路线
category:
  - 学习路线
tag:
  - 学习路线
description: Go 语言越来越火了，这里整理一份 go 语言的超详细学习路线，附学习资源，可下载
head:
  - - meta
    - name: keywords
      content: Go,Go学习路线,golang,golang学习路线,学习路线
---

大家好，我是二哥呀！最近又有一个读者来咨询我的建议：**应届生，要求 Java 进去后转 Go，问我咋样？**

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/go-1.png)

据我自己的印象，前前后后有十个读者来问过我这个问题了。一方面 Java 就业岗位确实多，薪资也给力；另外一方面，Go 确实很有潜力。

尤其是国内的字节跳动，Go 在常用的编程语言中占比是最高的，大部分产品的后端都在使用 Go。

那作为贴心的二哥，必须得给大家梳理一波思路了，希望能给需要的读者一点点帮助和启发~

## 一、Go 的优势和劣势

Go 语言诞生于 2009 年，发展到现在，已经 12 岁了（应该没算错吧😭）。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/go-2.png)

很多明星级的开源产品，比如说 Kubernetes、Docker等，都是基于 Go 语言编写的。再加上近些年来微服务架构和云原生技术的普及，也大大的带火了 Go 这门编程语言，使其在 C/C++ 和 Java 中杀出了一条血路。

再加上从 2010 年 5 月起，Google 开始将 Go 语言投入到后端基础设施的实际开发中，很多我们能耳熟能详的应用都有使用 Go 语言，比如说谷歌地图、Google Cloud 等。

国内的字节跳动，就别提了。

Google 和字节两家大厂对 Go 的大力投入，在一定程度上又加速了 Go 这门编程语言的发展。

目前，使用 Go 语言的公司越来越多了，阿里、百度、腾讯、小米这些互联网大厂也在积极拥抱。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/go-3.png)

这使得 Go 工程师的薪资待遇也得到了很大程度上提高。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/go-4.png)

当然了，目前基本上除了大厂，很少有其他中小型公司用 Go，因为 Go 的生态还比不上 Java，没有 Java 那么丰富健全，中小公司的投入产出比比较低。大厂有人有钱，愿意在 Go 上投入成本。

另外，Go 也没有像外界吹捧的那么牛叉，就编程语言的排行榜上来看，Go 还是个滴滴（Python、C/C++、Java、C# 这些仍然是前排），有待发展。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/go-5.jpg)

## 二、为什么会要求 Java 转 Go 呢？

最直接的原因就是 Go 这边比较缺人，而 Java 这边基本上是招聘的多，竞聘的更多。

熟练掌握 Java 的一般都比较能打，转 Go 后作战能力肯定也是不容小觑。

对于我们国内的开发环境来说，Java 的确是顶流，我个人也是 Java 的重度使用者，但**我私底下也在学习其他的编程语言，因为只有这样，才能最大程度上保持自己的竞争力**。

每种编程语言只要能发挥出它最大的优势，就是值得我们去学习和使用的。

再者，编程语言这东西，你掌握了一个，再学另外一个也会很快的。

截止到目前，我学过 Python、C/C++、Go、JavaScript 等等，因为有 Java 语言的底子在，学这些编程语言的时候，阻力基本上就像在泳池里游泳一样，一开始会感觉有点困难，等熟练了之后，会感觉很舒服。

## 三、Go 语言该怎么学习呢？

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/go-6.png)

不管怎么说，Go 语言的确是值得去学习的。如果公司确实需要转 Go 岗，也完全没有必要抗拒。

这里给大家推荐一个 Go 语言的学习路线图，如果你想要成为一名Go语言的开发者的话，可以沿着这张图里面的路径去学习。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/go-7.jpg)

接下来给大家推荐一些 Go 语言的学习资料，全部免费开源，是我肝了两个大夜精挑细选出来的。

记住一点：**不管是学习哪一门编程语言，顺序基本上就是视频入门+教程/书籍巩固+项目练习**。

### **1）视频课**

**第一套视频：《Go 编程基础》**，主要面向 Go 语言新手级别的学习者。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/go-8.jpg)

>课程地址：[https://github.com/unknwon/go-fundamental-programming](https://github.com/unknwon/go-fundamental-programming)

**第二套视频：尚硅谷 Go 入门到实战教程**，采用真实案例，从理论到实践，一步一步将 Go 的核心编程技术、编程思想、底层实现融会贯通。

虽然尚硅谷是一家培训机构，但在 B 站上公开的一些课程还真的是挺香的，学 Java 的同学可能很大一部分都看过宋红康老师的课，YYDS！

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/go-9.jpg)

>视频地址：[https://www.bilibili.com/video/BV1ME411Y71o](https://www.bilibili.com/video/BV1ME411Y71o)

### **2）教程/书籍**

**第一套教程：Go 语言之旅**，这是一个对初学者极其友好的在线网站，并且每一步都可以直接运行代码并看到效果。初学阶段，最重要的就是能通过手敲代码感受到学习的成果。

点击右侧的菜单可以快速浏览教程的所有内容，非常方便。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/go-10.jpg)

>教程地址：[https://tour.go-zh.org/](https://tour.go-zh.org/)

**第二套教程：LeetCode-Go**，一本 LeetCode 的刷题笔记，代码是用 Go 语言实现的，收录了超过 500 道题的题解思路和代码，代码方案都是效率超高的“标准答案”：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/go-11.jpg)

>教程地址：[https://books.halfrost.com/leetcode/](https://books.halfrost.com/leetcode/)

**第三套教程：《Go 语言设计与实现》**，这份教程的内容可以分成四个部分：

- 编译原理
- 运行时
- 基础知识
- 进阶知识

几乎覆盖了 Go 语言从编译到运行的方方面面，读完后能对 Go 语言有更加整体和深刻的认识。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/go-12.jpg)

>在线地址：[https://draveness.me/golang/](https://draveness.me/golang/)

是开发者内功修炼号主飞哥给我推荐的，当时看完后就大为震撼。目前我看作者已经出版了纸质书。

**第四套教程：《玩转 GO》**，内容包括但不限于并发、网络编程、垃圾回收、组合、Go UNIX系统编程、基本数据类型（Array,Slice,Map）、Go源码、反射，接口，类型方法等高级概念。

不过遗憾的是，在线阅读地址挂了，我还提交了一个 issue：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/go-13.jpg)

不过幸好我备份了一份离线版 PDF，里面的内容还是非常完整的：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/go-14.jpg)

需要的小伙伴请长按识别/扫描下方的二维码关注作者的原创公众号「**沉默王二**」回复关键字「**go**」就可以拉取到了。

![扫码关注后回复「go」关键字](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

**第五套教程：Go标准库文档**，可以查询每个API的具体使用方式，这也是 Go 开发者的必备手册。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/go-15.jpg)

>在线地址：[https://studygolang.com/static/pkgdoc/main.html](https://studygolang.com/static/pkgdoc/main.html)

再推荐一些比较优质的纸质书籍吧。

**第一本：Go语言实战**，这本书关注于 Go 语言的规范和实现，涉及的内容包括语法、Go 的类型系统、并发、通道和测试等主题。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/go-16.jpg)

**第二本：《Go 语言学习笔记》**，上卷专注于语言规范相关细节，下卷专注于对运行时源码做出深度剖析，诸如内存分配、垃圾回收和并发调度等。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/go-17.jpg)

**第三本：《Go Web 编程》**，这本书以一个网络论坛作为例子，讲解了如何使用请求处理器、多路复用器、模板引擎、存储系统等核心组件去构建一个 Go 的 Web 应用。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/go-18.jpg)

下面是我根据一位拿到大厂 offer 的师弟菜饼提供的学习资料整理出来的书单，相信对你学习 go 语言会很有帮助的。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/go-4b3b67f3-ebe0-4311-8c7c-7e87f89ccdc7.jpg)

需要的小伙伴请长按识别/扫描下方的二维码关注作者的原创公众号「**沉默王二**」回复关键字「**go**」就可以拉取到了。

![扫码关注后回复「go」关键字](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

### **3）实战项目**

**第一个项目：seaweedfs**，GitHub 上星标 13k+，这是一个分布式文件系统，基于 Go 开发，部署方便，使用简单，功能强大。

>地址：[https://github.com/chrislusf/seaweedfs](https://github.com/chrislusf/seaweedfs)

**第二个项目：filebrowser**，GitHub 上星标 13k+，这是一个自带文件浏览器的网盘服务，支持文件浏览、生成分享链接、批量上传、创建文件夹等功能、用户系统。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/go-20.jpg)

>地址：[https://github.com/filebrowser/filebrowser](https://github.com/filebrowser/filebrowser)

**第三个项目：go-admin**，GitHub 上星标 5k+，基于 Go 语言的一个数据可视化与管理平台，使开发者能在极简短的时间里，用极简短的代码量搭建起一个后台管理。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/go-21.jpg)

>地址：[https://github.com/GoAdminGroup/go-admin](https://github.com/GoAdminGroup/go-admin)

**第四个项目：7天用Go从零实现分布式缓存GeeCache**，每天完成的部分都是可以独立运行和测试的，就像搭积木一样，最终组合在一起就是一个完整的分布式缓存系统。每天的代码在 100 行左右。。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/go-22.jpg)

>地址：[https://geektutu.com/post/geecache.html](https://geektutu.com/post/geecache.html)


更多 Go语言的学习资料，可以直接戳我整理的这个 GitHub/码云仓库——📚程序员必读书单整理，附下载地址，里面有大量的 Go语言学习资料。

- GitHub 地址：[https://github.com/itwanger/JavaBooks](https://github.com/itwanger/JavaBooks#go)
- 码云地址：[https://gitee.com/itwanger/JavaBooks](https://gitee.com/itwanger/JavaBooks#go)


## 四、Java 和 Go 如何做取舍？

Go 语言设计的晚一点，所以可以站在巨人的肩膀上，不像 Java，历史包袱很沉重。比如 Go 在并发编程方面，就比 Java 更轻量级，性能也更强劲，因为 Java 诞生的时候还没有为高并发这样的场景做好准备。

Go 的使用简单，如果有其他编程语言的基础，也容易切换，阻力小。国内的大厂，比如说字节、腾讯这些都是要经常对抗高并发的场景，所以对 Go 的人才需求量比较大。

Go 这边没有 Java 那么卷，岗位的薪资却也比较客观。如果能趁早建立优势的话，以后发展的路子也就更宽广了一些。

但与此同时，由于 Go 的整个生态还没有 Java 那么完善，所以中小厂直接上 Go 的寥寥无几。**稳妥起见，Java 为主，Go 为辅是比较合理的选择**。

但一定要记住，无论什么时候，编程语言都不是最重要的，反而计算机基础是最重要的，尤其是操作系统、计网、计组、数据结构与算法这一块。

万丈高楼平地起，勿在浮沙筑高台。

基础扎实了，切换编程语言的时候只需要熟悉一下语法和库就 OK 了。

一名优秀的程序员，只会一种编程语言肯定是不够的，应该深入掌握一门，然后再涉足 1-2 门，这样的话，你能横向对比出来哪一种编程语言在哪一些领域有着比较大的优势，体会不同编程语言之间的差异性也会让你变得更加的优秀。

从个人职场发展来看，多一条腿走路，也更稳。。

---------

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
