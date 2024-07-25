---
star: true
title: 2024年最新超详细Java学习路线一条龙版（建议收藏🔥）
shortTitle: Java学习路线一条龙
category:
  - 学习路线
tag:
  - 学习路线
description: 2023最新超详细Java学习路线一条龙版，如果想从事Java开发工作，可以参考本文
head:
  - - meta
    - name: keywords
      content: Java,学习路线,Java教程,Java开发,Java入门
---


虽然我是科班出身，但说实话，十多年走过来，无论是 Java 语言本身，还是它配套的工具和框架都发生了巨大的变化。我自己也是一路学习新的知识，一路丢掉废旧的知识。

现在回头来看，发现自己也走了不少弯路，浪费了不少时间，真的是既遗憾又叹息！

关注我的读者当中应该有很大一部分是 Java 初学者，因为是初学，所以面临着巨大的压力，不能付出太高的试错成本。而应该寻找一条更高效的学习路线和一套行之有效的学习方法，否则一不小心，很可能会前功尽弃。

但好在 Java 的学习资料非常丰富，只要我们稍微用心去整理下，就能找出一条高效的学习路径。过去这两年里，我不断地整理自己的思路，分享了不少关于 Java 方面的文章，但都过于分散，借这个机会，我打算重新梳理一遍，希望能对大家的学习有所帮助。

## 学习Java之前可以先学一下C语言

对于科班的同学来说，我建议在学习 Java 这门编程语言之前，学一下 C 语言。我上大学那会，教材用的是《Java 编程思想》，但说真的，这本书对初学者并不友好。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/java/yitiaolong-d5e5b52c-1744-468c-ab9c-f77c24415394.jpg)

编程语言都是相通的，C语言作为 Java 语言的母胎，**还是非常值得科班去学习一下打打基础的**。其实对于我们程序员来说，学的是计算机科学，而不是编程语言，语言只是工具，没有优劣。像我，就学过 Java、C 语言、Ruby、JavaScript 等等这些编程语言，他们之间确实有很多相似之处。如果学过 JavaScript，能很容易搞懂 Java 的 Lambda 表达式。

C 语言的特殊性就在于它可能是唯一一门最适合来学习一系列计算机基础的媒介，比如 Linux 操作系统，就是用 C 语言重构的；比如计算机网络，里面有很多网络协议，有不同的 header 定义，这些字段用 C 语言的 union 和 struct 来操作非常便捷。Java 中虽然剔除了指针这种烦人的东西，但说白了，引用其实和指针差不多，理解了 C 语言中的指针，就能很好的理解 Java 中的引用。

当然了，由于 C 语言的抽象程度更高，学起来也需要花费一番功夫。对于科班的初学者来说，我推荐翁恺教授的 C 语言程序设计。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/java/yitiaolong-82aefde9-8a3f-4f28-aad5-02e39a6b9d4b.png)

>B 站地址：[https://www.bilibili.com/video/BV19W411B7w1](https://www.bilibili.com/video/BV19W411B7w1)

喜欢看书的同学我只推荐一本，《**阮一峰老师的 C语言入门教程**》，我第一时间就拜读了一遍，受益匪浅！可以说目前我见到的最好的 C语言入门教程了，没有之一！


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/java/yitiaolong-3507eb06-8424-4b8e-b20d-046268508c9d.png)

我第一时间就整理了一份 PDF 版的，需要的小伙伴可以长按识别/扫描下方二维码，关注后回复 「**阮一峰**」 下载这份 PDF 吧：

![扫码关注后回复「阮一峰」关键字](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

在学习的过程中切记一点，就是一定要多练多练多练，这一点不仅适合学习 C语言，也适合学习 Java 语言。有句话说得好呀，**看懂了+上万行代码=学会了**。无论是看视频学习，还是看书学习，最怕的就是眼高手低，以为自己看懂了，实际上呢，离学会了还差上万行代码。

对于非科班的同学来说，如果时间比较紧迫的话，可以直接上手 Java，我觉得只要学习资料选的好，也是完全没有问题的。

## 学习Java之前要安装的软件

工欲善其事必先利其器，战斗之前我们要先配备好武器。

JDK 是 Java Development ToolKit 的简称，也就是 Java 开发工具包。JDK 是整个 Java 的核心，包括 Java 运行环境（Java Runtime Envirnment，简称 JRE），Java 工具（比如 javac、java、javap 等等），以及 Java 基础类库（比如 rt.jar），学习 Java 之前必须要安装。

已经 2022 年了，真没必要在记事本上敲代码了。反正我遇到过太多的课程，包括我上大学时候的老师，都一而再再而三的强调，一定要用记事本敲出来第一个程序，并且在命令行里成功运行起来。

这么多年下来，我觉得这个建议真的是糟糕极了。记事本和命令行，怎么能让初学者上手呢？最起码也得是个老江湖才行啊！当年我就差点被记事本和命令行劝退。

Intellij IDEA，不用说，是编写 Java 程序的最佳 IDE，初学者选择社区版就完全够用了。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/java/yitiaolong-3fb56f9d-942a-4439-8bab-0f19bd59ef58.png)


初次使用的话，建议阅读一下《IntelliJ IDEA 简体中文专题教程》，GitHub 上已开源。

>地址：[https://github.com/judasn/IntelliJ-IDEA-Tutorial](https://github.com/judasn/IntelliJ-IDEA-Tutorial)

Maven 是一个项目管理和自动化构建工具，基于项目对象模型（POM）的概念，可以管理项目的构建、报告以及文档。作为 Apache 组织中的一个颇为成功的开源项目，Maven 主要服务于基于 Java 的项目构建、依赖管理和项目信息管理。有了 Maven 以后，第三方类库管理起来就舒服多了。

安装和配置教程直接看我写过的这篇文章[10分钟，掌握项目构建神器Maven](https://mp.weixin.qq.com/s/3umZOaI4l0EIZ5RgtEDchw)就好了。

另外，我推荐大家使用 GitHub/码云来作为私有的代码仓库，特别方便，免费还可以云同步。还不太熟悉[Git 命令](https://javabetter.cn/git/git-qiyuan.html)的话，可以下载[GitHub 桌面版](https://desktop.github.com/)来傻瓜式地操作。

这一套软件安装完成后，基本上开发 Java 的必备工具就齐活了。接下来，就可以放心大胆的进入 Java 的世界了。

## Java 学习的重点是什么

“冰冻三尺非一日之寒”，要想把 Java 学好，还是需要花费一番功夫的。Java 语言的知识点非常多，而我们又时间紧迫，意味着只能挑重点、挑实用，不能面面俱到，**一些不常用的知识点可以直接 pass 掉**。

我这里给大家贴一张《二哥的Java进阶之路》的导航地图，大类分为 Java 核心、Java 企业级开发、数据库、计算机基础、求职面试、学习资源等，基本上你要的 Java 学习资源，这里都有，没有的，后面我也会补充上。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/java/yitiaolong-c80191bf-ab08-4a28-898f-ea7ffff3f966.png)

Java 是一门面向对象的编程语言，所以三大特性：封装、继承、多态是必须要掌握的，然后是异常处理、IO、集合、并发编程和 Java 虚拟机。只要这些内容掌握了，可以说 Java 语言本身的核心知识就全部掌握了。

这些知识该怎么学呢？当然是直接上二哥的 二哥的Java进阶之路了，内容非常的全面和硬核，截图给大家鉴赏一下。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/java/yitiaolong-a5436c4a-6464-4065-ae0d-50755c4184df.png)

记住我们的网址：

>[https://javabetter.cn/](https://javabetter.cn/home.html#java核心)


这其中的难点是并发编程和 JVM，显然这两部分的内容学起来并不容易，但却最能考验一名 Java 后端工程师的功底了。


![Java 并发编程核心知识点](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/java/yitiaolong-dac18663-f729-41d6-8253-2473b2174b9e.png)


![JVM 核心知识点](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/java/yitiaolong-35df7e61-99c1-4efc-8f9f-702cc0f08904.png)

因为是自学，所以强烈建议大家把教程上的代码都敲一遍，尤其是在初学阶段。由于不像工作后，有大量的项目可以实践，所以不能得到及时的反馈，记笔记就显得特别的重要。另外，一定要分门别类保存好自己的 demo，以便以后可以快速得找得到，尤其是一些小套路，会很有用，积累得多了，可能就变成了自己的工具库。

一定要善待自己写过的那些小 demo，尤其是那些已经调通的，千万不要扔，没准哪一天能帮上大忙。以我的经验，在学习的过程中，尽管某些知识点在当时理解的多么透彻，但只要时间一长，或者换个开发环境，可能就完蛋，明明感觉代码是一样的，但就是运行不起来。如果手头恰好有这么一个 demo，打开参考一下，甚至拷贝过来试一下，问题就会迎刃而解。

大部分 Java 程序员都要从事 JavaWeb 的相关开发工作，要开发 JavaWeb，自然就离不开 Spring 的系列框架（之前是 SSM，现在是 Spring Boot）。 但不管怎么演变，Spring 的核心概念仍然是 IOC 和 AOP，也就是控制反转和面向切面编程。

关于 Spring Boot 的实战内容，二哥也在紧锣密鼓的准备[编程喵](https://github.com/itwanger/coding-more)这个实战项目，可以先给大家展示一下后端用到的技术栈，都是非常主流的技术。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/zhishixingqiu/readme-8.png)


如果说你已经掌握了 Spring、SpringMVC、MyBatis、Spring Boot 等内容，就有能力进行一些真正有用的应用项目开发了，比如说学生管理系统、商城系统、博客系统、秒杀系统等等。

当然了，要做完整的 Java Web 项目，前端的一些知识肯定是少不了的，但不能放太多心思，界面丑点无所谓，重点在 Java 后端上面。

学习编程就是一个由混沌到有序的过程，如果碰到了理解不了的知识，不要怀疑自己适不适合编程，跳过就行了，这是再正常不过的事了——必须抱有一颗越挫越勇的心。

## 哪些Java知识不需要再学了

张无忌在学太极拳的时候，太师父张三丰就对他喊，一定要把之前所学习的武功全部忘掉，**忘得越多就会学得越快**。同样的，自学 Java 的时候一定要先知道哪些 Java 知识不需要再学了，毕竟技术的更新迭代就好像火箭一样快，Java 的一些知识点早已经过时了。如果不懂得断舍离，那学起来就不免太痛苦了。

### 1）AWT 和 Swing

已经 2022 年了，谁还会用 AWT 和 Swing 去开发桌面应用呢？学好后端开发即可，现在是移动互联网时代，基本上都是手机APP、小程序、Web 网页来做前端了，可以把学习的重心放到 Spring Boot、Spring Cloud、Netty、Dubbo、Zookeeper、Mysql上。


### 2）Applet

作为网页插件技术，Applet 压根就没流行起来。

### 3）XML

XML 还没有被淘汰，应用的地方还有不少，比如说 Maven 的 pom.xml 文件里就还在用。但是作为一种数据传输格式，它正在被 JSON 替代。至于复杂的 XML 操作 API（例如 XPath）就完全没必要学习了，如果真的用到了，再去补也不迟。

### 4）JDBC

我个人不建议再学习偏底层的 JDBC 了，尤其是对于时间宝贵的自学程序员来说。与其花这点时间，不如把精力投入到 MyBatis 的学习上。当然了，如果真的有时间，真的想打基础，研究一下也无可厚非。

### 5）Struts

Struts 是早年一个优秀的 MVC 框架，单从技术的角度来看，还是蛮不错的。但是自从有了 SpringMVC 后，Struts 就被拍死在沙滩上了。

### 6）Hibernate

在我刚参加工作那会（2010 年的时候），持久层框架用的正是 Hibernate。但时过境迁，Hibernate 太重量级了，学习成本太高，取而代之的是轻量级的 MyBatis。现在有一种说法就是这种对象关系映射太过死板了，不如直接写 SQL 来得灵活，像我很喜欢的一个轻量级框架 JFinal 就更偏重于在 Java 代码中写 SQL，而不像 MyBatis 和 Hibernate 在 xml 文件中写。

### 7）JSP

JSP 在实际开发中，主要是作为 MVC 模型中的V（View）层出现的。它本来是为 Java 后端程序员开发前端界面而生的，但随着技术的发展，前后端分离的流行，JSP 的生命周期已经到头了。

### 8）Servlet

虽然 SpringMVC 的底层是以 Servlet 为基础的，是 JavaWeb 容器的基石，但 Servlet 的确已经过时了。如果后面有空余时间的话，想钻的话可以钻一下，对服务器端接收请求数据和向前端发送响应数据时会有一些帮助。

我这样的说法可能不够可观，不够顾及底层知识，但自学的时间成本还是要适当控制一下。**总之，我们应该省下更多的时间去学习前面小节提到的重点知识**！

## 学习Java还需要补充哪些知识

### **1）数据结构与算法**

毫无疑问，数据结构对一名程序员来说非常重要，还是那句话`程序=数据结构+算法`，这种说法无论放在什么时候都是成立的。

大部分的**数据结构**课程，关注的重点都在如何从数学上实现一个数据结构，但在实际开发中，大部分主流语言都已经内置了常见的数据结构，比如说 Java。也就是说，对于大部分程序员来说，实际开发中，很难有需求要从零开始实现一个数据结构。因此我们只需要做到下面几点。

1、熟悉常见数据结构的概念，比如说数组、堆栈、链表、哈希表等。

2、了解常用数据结构之间的差异，比如说 [ArrayList 和 LinkedList](https://javabetter.cn/collection/list-war-2.html)。

3、关注常用数据结构的外围算法，比如说如何对 List 和 Map 进行查找。

4、关注数据结构使用中容易出错的地方，比如说线程是否安全等。

B 站上浙江大学的一个数据结构课非常不错，很系统很经典。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/java/yitiaolong-e2812c94-5945-41ad-adcd-4dbb02fae8d5.png)


>视频地址：[https://www.bilibili.com/video/BV1JW411i731](https://www.bilibili.com/video/BV1JW411i731)

以我接触的领域来说，大部分普通的业务系统都不会涉及到太复杂的**算法**，因此我没有在算法上投入过多时间。但如果你将来要从事一些特殊的领域，如果算法跟不上，可以说是“寸步难行”，比如说图形处理领域，无论是图像的变化还是增强，无一例外都要用到矩阵变换，因此就必然涉及到线性代数的内容，再往深处学的话，必然会牵扯出更多的知识。

所以学习算法要视情况而定，如果想走算法岗，那么《算法第4版》、《算法导论》、《数学之美》、《编程珠玑》、《剑指offer》这些书都要耐着性子啃一啃。


### **2）设计模式**

我认为**设计模式**是初中级程序员迈向高级程序员的必经之路。有不少程序员，前期冲劲十足，但后继乏力，都是吃了设计模式的亏。在工作的前几年，大部分程序员都处于熟悉编程语言的阶段，也就是处于“技”的阶段，随后就要进入“术”的阶段了。在编程领域，“术”的典型代表就是“设计模式”。

学习设计模式的话，推荐好朋友小傅哥的《重学 Java 设计模式》。我之前推荐的 Refactoring Guru 网站，也非常的 nice。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/java/yitiaolong-3b9ab6b9-67f2-4810-bb39-9e1f48ffe3da.png)


>在线阅读地址：[https://refactoring.guru](https://refactoring.guru)

需要离线版的小伙伴请长按识别/扫描下方的二维码关注作者的原创公众号「**沉默王二**」回复关键字「**设计模式**」就可以拉取到了。

![扫码关注后回复「设计模式」关键字](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

 

### **3）JDK源码**

面试的时候，面试官都特别喜欢问一些源码方面的知识，比如说 HashMap 的一些经典问题：

- 加载因子为什么是 0.75？
- 为什么链表改为红黑树的阈值是 8?
- HashMap的底层数据结构是什么？
- 解决hash冲突的办法有哪些？
- HashMap数组的长度为什么是 2 的幂次方？
- HashMap 的扩容方式？

这些问题只有通过源码才能得出比较准确的回答，对吧？

有个同学说过一句话，给我的印象特别深刻，就是“有啥解决不了的？只要你肯阅读源码。”羊哥出过一个视频，详细地介绍了如何阅读 JDK 源码，推荐给大家。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/java/yitiaolong-130bcb8a-38bb-448f-8dc1-4e2af22153d2.png)


>视频地址：[https://www.bilibili.com/video/BV1V7411U78L](https://www.bilibili.com/video/BV1V7411U78L)

### **4）操作系统、计算机组成原理和计算机网络**

这三门课的重要性就不用我多说了，如果有时间有精力，推荐按照下面的路线去学习。

推荐哈工大的《操作系统》实验课，包括操作系统基础篇、操作系统之进程与线程、操作系统之内存管理、操作系统之外设与文件系统

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/java/yitiaolong-f5e91f0d-4b30-4693-beab-b879bac237b4.png)

>视频地址：[https://www.bilibili.com/video/BV1js411b7vg](https://www.bilibili.com/video/BV1js411b7vg)

如果想深入学习计算机组成原理的话，推荐北京大学的《计算机组成》公开课，整体评价非常高。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/java/yitiaolong-6cc5a0d4-7a06-4aca-a9b0-2e8b270d36ba.png)


>视频地址：[https://www.coursera.org/learn/jisuanji-zucheng](https://www.coursera.org/learn/jisuanji-zucheng)


计算机网络方面的视频我推荐湖科大教书匠的《计算机网络微课堂》，制作得非常用心，是一部不可多得的佳作。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/java/yitiaolong-0686fbbf-723e-4a0b-8082-3b3577050758.png)


>视频地址：[https://www.bilibili.com/video/BV1c4411d7jb](https://www.bilibili.com/video/BV1c4411d7jb)


### 5）项目管理与架构

实现一个软件系统的过程，不仅只有编码，还涉及到项目安排，团队协调等一系列非技术因素，如果想从一名程序员走向管理岗，成为 team leader 或者开发经理，软件工程方面的知识就必须得跟得上。

推荐三本书：《构建之法》、《人月神话》和《人件》，虽然有了岁月的痕迹，但依然值得深读。当然，关于软件工程，最好的学习方法是观察，观察你所在的团队是如何处理工程问题的，然后思考，最终形成自己的方法观。


要想写出一个好而美的程序，需要经过三个阶段。

第一阶段，**有扎实的基本功**，简单点说，就是要做到语法熟练、框架熟练，成为一名能够完成开发任务的“码农”。

第二阶段，从“码农”到“工程师”，在局部上，不仅要能够实现功能，还能关注功能之外的维度，比如健壮性、低耦合、可扩展等指标。

第三阶段，从“工程师”到“架构师”，不仅在局部上追求一个模块的好坏，而且还要从整个系统层面去掌控，合理安排资源的优先级，保证整个系统不会出现腐败等等。

要想成为一名优秀的架构师，除了自身的努力，也需要一点点运气，但靠读书可能不够，但这些经典书籍还是要阅读的，能给日常的工作带来巨大的帮助。

- 《代码大全》
- 《重构：改善既有代码的设计》
- 《设计原本》
- 《大型网站技术架构核心原理与案例分析》

## 最后

学习的过程，就好像登山一样，大概有 80% 的人在这个过程中会掉队。那么请相信我，只要目标明确，努力加上坚持，再加上一点点好运气，你就能登顶！

最后说一句哈，大家学习 Java，是为了什么，我想大多数不是为了兴趣，是吧？是为了找工作，那么终极的一步，我们需要在找工作之前刷一波面试题，然后找工作的机会也会提升很多。二哥的Java进阶之路上也为大家精心准备了面渣逆袭篇。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/java/yitiaolong-314e94ce-aa9d-4f09-831b-d1395c4fc07a.png)


通过上面这幅图就能感受得到，非常全面，非常精彩。

>学习地址：[面渣逆袭](https://javabetter.cn/sidebar/sanfene/nixi.html)

衷心的希望，大家都能在学习 Java 的这条路上快乐一些，纯粹一些，少听少看一些那些焦虑文，什么 35 岁，什么学历歧视，沉下心来，多学习一点知识，让自己变强一点，比什么都好！

另外，需要 Java 学习资料的话，可以直接戳我整理的这个 GitHub/码云仓库——📚Java程序员必读书单整理，附下载地址，助力每一个Java程序员构建属于自己的知识体系。包括但不限于Java、设计模式、计算机网络、操作系统、数据库、数据结构与算法、大数据、架构、面试等等。

- GitHub 地址：[https://github.com/itwanger/JavaBooks](https://github.com/itwanger/JavaBooks)
- 码云地址：[https://gitee.com/itwanger/JavaBooks](https://gitee.com/itwanger/JavaBooks)

给大家截图展示一下里面都有哪些优质的 PDF：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/java/java-books.jpg)

一家之言，必然有不尽善尽美的地方，但只要能对大家的学习有些许帮助，我也就很满足了！

**这么硬核，别忘记点赞鼓励下哟，如果你身边也有学习 Java 的小伙伴，可以把这篇文章分享给他**~

---------

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
