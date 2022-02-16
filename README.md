# To Be Better Javaer，Java 程序员进阶之路 - 通俗易懂、风趣幽默

<p align="center">
  <a href="https://tobebetterjavaer.com">
    <img src="https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/logo-01.png" width="260px" alt="Java 程序员进阶之路">
  </a>
</p>

<p align="center">
  <a href="https://github.com/itwanger/toBeBetterJavaer" target="_blank"><img src="https://img.shields.io/badge/Github-toBeBetterJavaer-red.svg"></a>
  <a href="https://gitee.com/itwanger/toBeBetterJavaer" target="_blank"><img src="https://img.shields.io/badge/Gitee-toBeBetterJavaer-blue.svg"></a>
  <a href="https://space.bilibili.com/513340480" target="_blank"><img src="https://img.shields.io/badge/bilibili-哔哩哔哩-critical"></a>
  <a href="https://mp.weixin.qq.com/s/ePhaYezFblgt0NgbvtWqww" target="_blank">
    <img src="https://img.shields.io/badge/计算机经典电子书-下载-green.svg" alt="无套路下载">
  </a>
</p>

>Java 程序员进阶之路，据说每一个优秀的 Java 程序员都喜欢她，风趣幽默、通俗易懂。内容包括 Java 基础、Java 并发编程、Java 虚拟机、Java 企业级开发、Java 面试等核心知识点。学 Java，就认准 Java 程序员进阶之路😄。

<a href="https://mp.weixin.qq.com/s/US5nTxbC2nYc1hWpn5Bozw" target="_blank">👉 我整理汇总了 10 本优质的 Java 面试相关的 PDF（质量很高！不要再看网上的那些东拼西凑的垃圾面试题了！），点击下载，希望对需要的小伙伴有帮助！</a>


# 为什么会有这个开源知识库

> [!TIP]
>  本站取名 **toBeBetterJavaer**，即 **To Be Better Javaer**，意为「成为一名更好的 Java 程序员」，是自学 Java 以来所有原创文章和学习资料的大聚合。
>  
>  旨在为学习 Java 的小伙伴提供一系列：
>  - **优质的原创 Java 教程**
>  - **全面清晰的 Java 学习路线**
>  - **免费但靠谱的 Java 学习资料**
>  - **精选的 Java 岗求职面试指南**
>  - **Java 企业级开发所需的高效工具**
>
> 赠人玫瑰手有余香。知识库会持续保持**更新**，欢迎收藏品鉴！


# 知识库地图

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/tobebetterjavaer-map.png)

# Java基础


> [!ATTENTION]
>  **Java 基础是非常重要的**！所谓基础不牢，地动山摇，很多初学者在初学阶段容易按捺不住，三天打鱼两天晒网，这就会导致后面的学习非常的吃力，所以我的建议是一定要肯花时间花精力把基础部分学扎实了，再开始学习后面的内容。<br><br>
>  Java 基础部分可以分为基础篇和进阶篇，基础篇包括基础语法、面向对象、集合框架、异常处理，以及字符串和数组等等重要知识点；进阶篇包括 Java IO、Java 并发编程、Java 虚拟机等等。<br><br>
>  入门阶段，一定要多 coding，不要眼高手低，很多看起来会的知识可能真正实操起来就会出现各种各样的问题，那么只有通过多记多练才能迎刃而解。


## 基础篇


> [!ATTENTION]
>  万丈高楼平地起，勿在浮沙筑高台！


### Java概述

- [什么是 Java？](docs/overview/what-is-java.md)
- [Java 的发展简史](docs/overview/java-history.md)
- [Java 的优势](docs/overview/java-advantage.md)
- [JDK 和 JRE 有什么区别？](docs/overview/jdk-jre.md)
- [手把手教你安装集成开发环境 Intellij IDEA](docs/overview/idea.md)
- [第一个 Java 程序：Hello World](docs/overview/hello-world.md)


### Java基础语法

- [基本数据类型](docs/basic-grammar/basic-data-type.md)
- [流程控制](docs/basic-grammar/flow-control.md)
- [运算符](docs/basic-grammar/operator.md)
- [注释](docs/basic-grammar/javadoc.md)

### 面向对象

- [什么是对象？什么是类](docs/oo/object-class.md)
- [变量](docs/oo/var.md)
- [方法](docs/oo/method.md)
- [构造方法](docs/oo/construct.md)
- [代码初始化块](docs/oo/code-init.md)
- [抽象类](docs/oo/abstract.md)
- [接口](docs/oo/interface.md)
- [static 关键字](docs/oo/static.md)
- [this 和 super 关键字](docs/oo/this-super.md)
- [final 关键字](docs/oo/final.md)
- [instanceof 关键字](docs/oo/instanceof.md)
- [不可变对象](docs/basic-extra-meal/immutable.md)
- [可变参数](docs/basic-extra-meal/varables.md)
- [泛型](docs/basic-extra-meal/generic.md)
- [注解](docs/basic-extra-meal/annotation.md)
- [枚举](docs/basic-extra-meal/enum.md)
- [反射](docs/basic-extra-meal/fanshe.md)

### 字符串String

- [String 为什么是不可变的？](docs/string/immutable.md)
- [字符串常量池](docs/string/constant-pool.md)
- [深入浅出 String.intern](docs/string/intern.md)
- [如何比较两个字符串是否相等？](docs/string/equals.md)
- [如何拼接字符串？](docs/string/join.md)
- [如何拆分字符串？](docs/string/split.md)

### 数组

- [什么是数组？](docs/array/array.md)
- [如何打印数组？](docs/array/print.md)

### 集合框架（容器）

- [Java 中的集合框架该如何分类？](docs/collection/gailan.md)
- [简单介绍下时间复杂度](docs/collection/big-o.md)
- [ArrayList](docs/collection/arraylist.md)
- [LinkedList](docs/collection/linkedlist.md)
- [ArrayList 和 LinkedList 之增删改查的时间复杂度](docs/collection/list-war-1.md)
- [ArrayList 和 LinkedList 的实现方式以及性能对比](docs/collection/list-war-2.md)
- [Iterator与Iterable有什么区别？](docs/collection/iterator-iterable.md)
- [为什么阿里巴巴强制不要在 foreach 里执行删除操作](docs/collection/fail-fast.md)
- [详细讲解 HashMap 的 hash 原理](docs/collection/hash.md)
- [详细讲解 HashMap 的扩容机制](docs/collection/hashmap-resize.md)
- [HashMap 的加载因子为什么是 0.75？](docs/collection/hashmap-loadfactor.md)
- [为什么 HashMap 是线程不安全的？](docs/collection/hashmap-thread-nosafe.md)


### 异常处理

- [聊聊异常处理机制](docs/exception/gailan.md)
- [关于 try-catch-finally](docs/exception/try-catch-finally.md)
- [关于 throw 和 throws](docs/exception/throw-throws.md)
- [关于 try-with-resouces](docs/exception/try-with-resouces.md)
- [异常处理机制到底该怎么用？](docs/exception/shijian.md)

### 常用工具类

- [数组工具类：Arrays](docs/common-tool/arrays.md)
- [集合工具类：Collections](docs/common-tool/collections.md)
- [简化每一行代码工具类：Hutool](docs/common-tool/hutool.md)
- [Guava，拯救垃圾代码，效率提升N倍](docs/common-tool/guava.md)

### 重要知识点

- [Java 中常用的 48 个关键字](docs/basic-extra-meal/48-keywords.md)
- [Java 命名的注意事项](docs/basic-extra-meal/java-naming.md)
- [详解 Java 的默认编码方式 Unicode](docs/basic-extra-meal/java-unicode.md)
- [new Integer(18)与Integer.valueOf(18)有什么区别？](docs/basic-extra-meal/int-cache.md)
- [聊聊自动拆箱与自动装箱](docs/basic-extra-meal/box.md)
- [浅拷贝与深拷贝究竟有什么不一样？](docs/basic-extra-meal/deep-copy.md)
- [为什么重写 equals 时必须重写 hashCode 方法？](docs/basic-extra-meal/equals-hashcode.md)
- [方法重载和方法重写有什么区别？](docs/basic-extra-meal/override-overload.md)
- [Java 到底是值传递还是引用传递？](docs/basic-extra-meal/pass-by-value.md)
- [Java 不能实现真正泛型的原因是什么？](docs/basic-extra-meal/true-generic.md)
- [Java 程序在编译期发生了什么？](docs/basic-extra-meal/what-happen-when-javac.md)
- [Comparable和Comparator有什么区别？](docs/basic-extra-meal/comparable-omparator.md)
- [Java IO 流详细划分](docs/io/shangtou.md)


## 进阶篇

> [!ATTENTION]
>  如果你想成为一名高质量的 Java 程序员，那么 Java 并发编程和 Java 虚拟机是必须要熟练掌握的！

### Java并发编程

- [室友打一把王者就学会了多线程](docs/thread/wangzhe-thread.md)
- [为什么阿里要禁用Executors创建线程池？](https://mp.weixin.qq.com/s/dd_IPt7lQQeIMH7YTdgLIw)
- [60张手绘图，一举拿下Java并发！](https://mp.weixin.qq.com/s/bImCIoYsH_JEzTkBx2lj4A)

### Java虚拟机

- [JVM 是什么？](docs/jvm/what-is-jvm.md)



# Java企业级开发

> [!ATTENTION]
>  **到底能不能成为一名合格的 Java 程序员，从理论走向实战？Java 企业级开发这部分内容就是一个分水岭**！<br><br>
>  Java 企业级开发这部分可以分为工具篇、框架篇、安全篇、分布式、高性能、高可用和实战篇等等。<br><br>
>  纸上得来终觉浅，须知此事要躬行。


## 基建篇

### Maven

> [!ATTENTION]
>  Maven 是一个项目管理工具，可以对 Java 项目进行构建、依赖管理。

- [手把手教你安装、配置、使用 Maven](docs/maven/maven.md)
- [守护版 Maven 来了！！！性能提升 300%](docs/maven/mvnd.md)


### Git

> [!ATTENTION]
>  Git 是 Linus Torvalds 为了帮助管理 Linux 内核而开发的一个开源的版本控制软件，绝大多数项目源码和文档都会采用 Git 来进行版本控制。

- [可能是 Git 历史上最伟大的一次代码提交](docs/git/git-qiyuan.md)
- [终于有人把 Git 的数据模型讲清楚了](docs/git/shujujiegou.md)
- [昨晚看完 Linus 第一次提交的 Git 代码后，我失眠了！](docs/git/neibushixian.md)
- [要熟练使用 Git，恐怕要记住这60个命令](docs/git/mingling.md)
- [崩溃！实习生把小组的代码仓库搞得一团糟。。。](docs/git/jibenshiyong.md)
- [信不信，7 张图就能让你把 Git 分支管理拿捏的死死的。。](docs/git/fenzhi.md)
- [豆瓣9.1分！我昨天在挂急诊时啃完了这本书！](docs/git/progit.md)
- [一条 Git 命令减少了一半存储空间，我的服务器在偷着笑](docs/git/sparse-checkout.md)

### Nginx

> [!ATTENTION]
>  Nginx是一款轻量级的 Web 服务器/反向代理服务器，占有内存少，并发能力强。

- [Nginx 入门教程，敲简单，10 分钟搞定](docs/nginx/nginx.md)

### Logback

> [!ATTENTION]
>  线上问题的追踪离不开日志框架，Logback 是 Spring Boot 默认的日志框架。

- [Logback这样配置，性能提升10倍！](https://mp.weixin.qq.com/s/dO1dYAHwyB-81L1z3D_sdg)


## 工具篇

### Intellij IDEA

> [!ATTENTION]
>  业界公认的最好的 Java 基础开发环境。

- [阅读源码必备的4个 IDEA 高级调试技巧](https://mp.weixin.qq.com/s/KG0yzb_9XhhTSzjHr4DkIQ)


### 辅助工具

> [!ATTENTION]
>  一些优质的开源工具，可替代付费工具。

- [再见Postman！推荐一款更适合国人的接口管理工具ApiPost！](https://mp.weixin.qq.com/s/ZgkNQsve_vq6Xq0_gnWHCw)
- [再见了VMware，推荐一款更轻量级的虚拟机Multipass！](https://mp.weixin.qq.com/s/gy6dVHvNy495bqov6JOAdA)
- [再见了Swagger，推荐七款可以替代的在线文档生成神器](https://mp.weixin.qq.com/s/tEwVadscpaUI5uR6aiTZkQ)
- [干掉visio，这款在线的画图神器 drwa.io 真的绝了！！！](https://mp.weixin.qq.com/s/EaGCe4GRG2C-0zuVxWxl5A)


## 框架篇

### SpringBoot

> [!ATTENTION]
>  SpringBoot 不仅继承了Spring框架原有的优秀特性，而且还通过简化配置来进一步简化了Spring应用的整个搭建和开发过程。另外SpringBoot通过集成大量的框架使得依赖包的版本冲突，以及引用的不稳定性等问题得到了很好的解决。

- [一分钟快速搭建 Spring Boot 项目](docs/springboot/initializr.md)
- [基于SpringBoot 的CMS系统，拿去开发企业官网真香](https://mp.weixin.qq.com/s/HWTVu7E62VkaH2anQc1J_g)
- [Spring Boot为什么不需要额外安装Tomcat？](docs/springboot/tomcat.md)
- [Spring Boot 3.0 M1 发布，正式弃用 Java 8](https://mp.weixin.qq.com/s/FmRyF6RcCodb8vUBem8dAA)



## 安全篇

## 分布式

## 高性能

### 消息队列

> [!ATTENTION]
>  消息队列是一种异步的服务间通信方式，适用于无服务器和微服务架构，用于分离重量级处理、缓冲或批处理工作以及缓解高峰期工作负载。

- [敢在简历上写精通消息队列，果然有一手！](https://mp.weixin.qq.com/s/UKWOyS90O6R_y1YEdF_JjQ)


## 高可用

## 实战篇

### 开源项目

> [!ATTENTION]
>  GitHub 上、码云上一些高 star 的优质项目推荐，优质的轮子极大地提高了开发效率。

- [EasyPoi实现Excel导入导出，好用到爆，POI可以扔掉了！](https://mp.weixin.qq.com/s/H2Bwc-7ghcjyaEnKUTQ5Dg)
- [SpringBoot 实现 Excel 导入导出，性能爆表，用起来够优雅！](https://mp.weixin.qq.com/s/Knb7b-uYLWsKZfgvGgN_ug)
- [推荐2 个 Java 练手项目（云E办、仿网易云音乐）](docs/kaiyuan/yuneban-wangyiyunyinyue.md)
- [干掉 Xshell？Tabby这款开源的终端工具逼格更高！](docs/gongju/tabby.md)
- [干掉PowerDesigner，这款开源数据库设计神器chiner真的绝了](docs/gongju/chiner.md)
- [再见丑陋的SwaggerUI，这款开源的API文档生成神器 knife4j 界面更炫酷，逼格更高！](docs/gongju/knife4j.md)
- [取代 Mybatis Generator，这款代码生成神器配置更简单，开发效率更高！](docs/kaiyuan/auto-generator.md)

### 问题解析

> [!ATTENTION]
>  开发过程中遇到的一些典型问题，该如何解决？

- [Log4j2突发重大漏洞](docs/shigu/log4j2.md)
- [重现了一波 Log4j2 核弹级漏洞，同事的电脑沦为炮灰](https://mp.weixin.qq.com/s/zXzJVxRxMUnoyJs6_NojMQ)
- [生成订单30分钟未支付，则自动取消，该怎么实现？](https://mp.weixin.qq.com/s/J6jb_Dt3C49CIjYBTrN4gQ)
- [西安一码通又崩了！难道又不小心回滚到上个版本？](https://mp.weixin.qq.com/s/TaFohrRetiCKEf7ZKESBaQ)
- [半月崩两次，从技术角度再来聊聊一码通](https://mp.weixin.qq.com/s/dKsneRKW7G9dvtr9NzefEA)
- [使用MQ的时候，怎么确保消息100%不丢失？](https://mp.weixin.qq.com/s/lJdYpH94qGm5Q0pkgfjHTQ)


# 数据库

## Redis

> [!ATTENTION]
>  Redis（Remote Dictionary Server )，即远程字典服务，是一个用 C语言编写的，支持网络、可基于内存和可持久化日志的键值对数据库。




# 计算机基础


# 求职面试

> [!ATTENTION]
>  **学习了那么多 Java 知识，耗费了无数的脑细胞，熬掉了无数根秀发，为的是什么？当然是谋取一份心仪的 offer 了**。<br><br>
>  那八股文、面试题、城市选择、优质面经又怎能少得了呢？<br><br>
>  千淘万漉虽辛苦，吹尽狂沙始到金。

## 八股文

- [Java 高频面试题 34 道](docs/baguwen/java-basic-34.md)
- [Java 基础八股文（背诵版）](docs/baguwen/java-basic.md)
- [HashMap 精选面试题](docs/collection/hashmap-interview.md)
- [Java 并发编程八股文（背诵版）](docs/baguwen/java-thread.md)
- [Java 虚拟机八股文（背诵版）](docs/baguwen/jvm.md)

## 面试经验

- [上岸杭州阿里云](docs/mianjing/shanganaliyun.md)
- [面试官：看你简历上写了Redis，请回答一下这 12 个问题](docs/mianjing/redis12question.md)

## 城市选择

- [北京都有哪些牛逼的互联网公司？](https://mp.weixin.qq.com/s/xlPZfpd89rDq6L-Me80wnw)
- [广州都有哪些牛逼的互联网公司？](https://mp.weixin.qq.com/s/uZQ8p0ytsQFXzt5ppzx6fA)
- [深圳有哪些牛批的互联网公司？](https://mp.weixin.qq.com/s/hBU-eEUq8aN5PWwdZFmC4g)
- [西安有哪些不错的互联网公司？](https://mp.weixin.qq.com/s/s0Ub1CHC9eEi0YrqPrnRog)
- [青岛有牛逼的互联网公司吗？](https://mp.weixin.qq.com/s/8QQvOrkG3Vdjj3GxP1zxBQ)
- [郑州有哪些不错的互联网公司？](https://mp.weixin.qq.com/s/SU9drg2xJKcheIwJ6OSSBQ)
- [苏州有哪些牛逼的互联网公司？](https://mp.weixin.qq.com/s/cnYsZLudFOwv5EKYMsMh0Q)
- [南京有哪些靠谱的互联网公司？](https://mp.weixin.qq.com/s/CfZ1CEmtPOP4TAwAs8Ocrw)
- [杭州有哪些顶级的互联网公司？](docs/cityselect/hangzhou.md)


# 学习资源

# 程序人生

> [!ATTENTION]
>  **程序员的人生不仅有代码，还有诗和远方**。br><br>
>  人间烟火味，最抚凡人心。

## 码农生活

- [中美程序员不完全对比](https://mp.weixin.qq.com/s/KByt42RiDtt2aWpN4klmKg)
- [降薪 45%，从互联网回到国企](https://mp.weixin.qq.com/s/qHGdIuA32X-zydbMTKDPuA)
- [学弟在微软的这六个月](https://mp.weixin.qq.com/s/08Ax1ArAjchemjUXih7zNw)
- [找个程序员做老公/男票有多爽？？？](https://mp.weixin.qq.com/s/mK0yaen1mhCoWZ6ZLC5vQg)

## 闲聊唠嗑

- [大学计算机系最努力的同学都是如何学习的？](docs/xianliaolaoke/daxue-nuli-jisuanji.md)

# 联系作者

## 关于作者

- 一名普通的 Java 后端开发者，热爱学习
- 目前在洛阳栖息，虽然处在一片互联网沙漠，却心存妄想，想要在这片土地上开垦出一片属于自己的田地
- 参加工作以后越来越理解交流和分享的重要性，在不停地汲取营养的同时，也希望自己的分享去帮助到小伙伴们
- Java 程序员进阶之路，不仅是我自学 Java 以来所有的原创文章和学习资料的大聚合，更是我向这个世界传播知识的一个窗口。

## 心路历程

- [Java 程序员进阶之路网站上线了，颜值贼高！](docs/szjy/tobebetterjavaer-wangzhan-shangxian.md)
- [273 块钱购入的域名，值了！](docs/szjy/tobebetterjavaer-yuming-jiexi.md)
- [3 年9.9元，HTTP升级到HTTPS，值了！](docs/szjy/tobebetterjavaer-https.md)
- [30天，终于搞定域名备案！](docs/szjy/tobebetterjavaer-beian.md)

## 联系方式

- **技术交流群**

    本群的宗旨是给大家提供一个良好的技术学习交流平台，所以杜绝一切广告！<br>由于微信群人满 100 之后无法加入，请先添加作者微信「qing_geee」（也可以扫描下方的二维码），备注：加群。
    
    <div align="left">
        <img src="https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/qing_geee.png" width="260px">
    </div>

- **原创公众号**

    本号的slogan：技术文通俗易懂，吹水文风趣幽默。<br>目前已有 10 万+读者关注，微信搜索「**沉默王二**」（也可以扫描下方的二维码）就可以关注作者了。
    
    <div align="left">
        <img src="https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/gongzhonghao.png" width="260px">
    </div>

    关注后，回复关键字「**00**」可以获取更多优质的 Java 学习资料。
    
    
- **star 趋势图**

[![Stargazers over time](https://starchart.cc/itwanger/toBeBetterJavaer.svg)](https://starchart.cc/itwanger/toBeBetterJavaer)

- **捐赠鼓励**

开源不易，如果《Java 程序员进阶之路》对你有些帮助，可以请作者喝杯咖啡，算是对开源做出的一点点鼓励吧！

<div align="left">
    <img src="https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/weixin-zhifu.png" width="260px">
</div>

:gift_heart: 感谢大家对我资金的赞赏，每隔一个月会统计一次。

时间|小伙伴|赞赏金额
---|---|---
2022-01-28|G*R|6.6元
2022-01-20|*光|50元
2022-01-14|*浩|1元
2022-01-01|马伟谊|6.6元
2022-01-01|刚刚好|3.6元
2021-12-20|t*1|5 元
2021-10-26|*鱼|28 元
2021-10-11|*人|28 元
2021-09-01|S*n|6.6 元
2021-08-02|*秒|1 元
2021-06-13|*7| 28 元
2021-04-29|pebble|2 元



- **参与贡献**

1. 如果你对本项目有任何建议或发现文中内容有误的，欢迎提交 issues 进行指正。
2. 对于文中我没有涉及到知识点，欢迎提交 PR。



