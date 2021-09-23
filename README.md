# :rainbow: To Be Better Javaer，Java 程序员进阶之路 - 通俗易懂、风趣幽默

> **作者：** 沉默王二，Java Developer，[:pencil2: 个人博客](https://itwanger.com)，[:trophy: CSDN 博客专家（总榜前 7）](https://blog.csdn.net/qing_gee)，[:books: 计算机经典书单(download)](https://mp.weixin.qq.com/s/qwUtTbfDB36VSwnjMRakqA)

> Java 程序员进阶之路，本专栏旨在为 Java 初学者提供一个清晰详细的学习教程，侧重点为 Java 语法基础、Java 集合框架、Java IO、Java 并发编程、Java 虚拟机等。如果本仓库能为你提供帮助，请给予支持(关注、点赞、分享)！


## ⛳目录

- 仓库同步：[Github](https://github.com/itwanger/toBeBetterJavaer) | [码云](https://gitee.com/itwanger/toBeBetterJavaer) | [CodeChina](https://codechina.csdn.net/qing_gee/toBeBetterJavaer)
- [学习说明](https://github.com/itwanger/toBeBetterJavaer#bookmark-学习说明)
- [章节目录](https://github.com/itwanger/toBeBetterJavaer#pencil-章节目录)
- [联系作者](https://github.com/itwanger/toBeBetterJavaer#paw_prints-联系作者)
- [参与贡献](https://github.com/itwanger/toBeBetterJavaer#muscle-参与贡献)

## :bookmark: 学习说明

《Java 程序员进阶之路》专栏主要针对零基础学 Java 编程的同学，从 Java 核心语法开始，循序渐进，再到 Java 集合框架、Java IO、Java 并发编程、Java 虚拟机，只讲重点。

一开始，不要求快，毕竟知识是需要时间来沉淀的。一定要从头到尾阅读这个专栏，因为基础真的很重要，“根基不牢，地动山摇”。

**编程是听不会，也看不会的，只有经过大量的实践才能学会，所以一定要动手，专栏中所有的例子都不要放过，一个一个来，直到自己能在没有任何帮助的情况下，独立完成代码的编写**。

记住：编程是门手艺活，唯手熟尔！

----

1. 本专栏面向的是 Java 初学者，完全零基础的小伙伴，所以你完全不用担心学不会的问题，所有内容都是经过我精心打磨的！

2. 本专栏的所有配套源码已经在 GitHub 上开源（在本仓库的 code 目录下，直接导入到 Intellij IDEA 就可以运行），你在练手的时候可以作为参考。

3. 如果你在学习的过程中遇到了什么问题，包括：不能运行、优化意见、文字错误等任何问题都可以提交 issue，也可以联系我，微信：`qing_geee`

4. 本专栏不仅会教你如何学习 Java，还会把我十多年的编程经验倾囊相授，这比学习 Java 可能更重要。

5. 送大家一句我的座右铭吧：**没有什么使我停留——除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟**。

## :pencil: 章节目录

### **概述**

- [什么是 Java](docs/overview/what-is-java.md)
- [Java 发展简史](docs/overview/java-history.md)
- [Java 为什么如此流行](docs/overview/why-java-popular.md)
- [第一个 Java 程序：Hello World](docs/overview/hello-world.md)
- [Java程序在编译期发生了什么](docs/overview/what-happen-when-javac.md)
- [JDK 和 JRE 有什么区别](docs/overview/jdk-jre.md)
- [JVM 是什么](docs/overview/jvm.md)
- [Java 注释：程序的注解](docs/overview/javadoc.md)

### **核心语法**

- [一网打尽 Java 的那些关键字](docs/core-grammar/java-keywords.md)
- [Java 运算符有哪些？](docs/core-grammar/java-operator.md)
- [Java 变量类型有哪些](docs/core-grammar/java-var.md)
- [Java 数据类型有哪些](docs/core-grammar/java-data-type.md)
- [技术大佬的必备素质：命名优雅](docs/core-grammar/java-naming.md)

### **分支、循环**

- [流程控制语句有哪些？图解版](docs/control/java-control.md)

### **字符串**

- [从源码的角度来看字符串的不可变性](docs/string/source.md)
- [学弟学妹都必须掌握的字符串常量池](docs/string/constant-pool.md)
- [深入浅出之美团技术团队解析过的 String.intern](docs/string/intern.md)
- [如何比较两个字符串是否相等](docs/string/equals.md)
- [如何拼接字符串](docs/string/join.md)
- [如何拆分字符串](docs/string/split.md)

### **数组**

- [最重要的数据结构之一](docs/array/gailan.md)
- [数组的专用工具类：java.util.Arrays](docs/array/arrays.md)
- [打印数组最优雅的方式：deepToString](docs/array/print.md)

### **面向对象**

- [对象和类的相爱相杀](docs/object-class/java-object-class.md)
- [方法：我负责程序的行为](docs/object-class/java-method.md)
- [构造方法：对象初始化的必经之路](docs/object-class/java-construct.md)
- [代码初始化块：让我先走一步](docs/object-class/code-init.md)
- [抽象类：子类复用的基石](docs/object-class/java-abstract.md)
- [接口：抽象的另外一种表现形式](docs/object-class/java-interface.md)

### **关键字详解**

- [学妹必须学会的 static 关键字](docs/keywords/java-static.md)
- [学弟必须掌握的 this 和 super ](docs/keywords/java-this.md)
- [再见了，我的 final 关键字](docs/keywords/java-final.md)
- [判断对象的类型：instanceof 关键字](docs/keywords/java-instanceof.md)

### **关键知识点**

- [必知必会的 Unicode：躲开锟斤拷](docs/core-points/unicode.md)
- [面试会考，Java 数据类型缓存池](docs/core-points/int-cache.md)
- [傻傻分不清：方法重载和方法重写](docs/core-points/override-overload.md)
- [Java 表示：我只有值传递，没有引用传递](docs/core-points/pass-by-value.md)
- [面试经典题目：浅拷贝与深拷贝有什么区别](docs/core-points/deep-copy.md)
- [自动拆箱与自动装箱，好玩](docs/core-points/box.md)
- [为什么重写 equals 时必须重写 hashCode 方法](docs/core-points/equals-hashcode.md)

### **反射**

- [深入理解 Java 的反射](docs/fanshe/fanshe.md)

### **异常**

- [异常处理机制](docs/exception/gailan.md)
- [try-catch-finally](docs/exception/try-catch-finally.md)
- [throw 和 throws](docs/exception/throw-throws.md)
- [try-with-resouces](docs/exception/try-with-resouces.md)
- [异常最佳实践](docs/exception/shijian.md)

### **泛型**

- [晦涩难懂的泛型](docs/generic/generic.md)
- [Java 不能实现真正泛型的原因是什么？](docs/generic/true-generic.md)

### **注解**

- [撸个注解有什么难的](docs/annotation/annotation.md)

### **枚举**

- [单例的最佳实现方式——枚举](docs/enum/enum.md)


### **集合框架**

- [初探集合框架](docs/collection/gailan.md)
- [时间复杂度](docs/collection/big-o.md)
- [面试官：换人！他连 ArrayList 都没吃透](docs/collection/arraylist.md)
- [某团技术拷问：LinkedList 源码看过吗](docs/collection/linkedlist.md)
- [蔚来一面：HashMap 的 hash 方法原理是什么？](docs/collection/hash.md)
- [HashMap 的扩容机制](docs/collection/hashmap-resize.md)
- [HashMap 的加载因子为什么是 0.75](docs/collection/hashmap-loadfactor.md)



## :paw_prints: 联系作者

- **技术交流群**

    本群的宗旨是给大家提供一个良好的技术学习交流平台，所以杜绝一切广告！<br>由于微信群人满 100 之后无法加入，请先添加作者微信「qing_geee」（也可以扫描下方的二维码），备注：加群。
    
    <div align="left">
        <img src="https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/qing_geee.png" width="260px">
    </div>

- **原创公众号**

    本号的slogan：技术文通俗易懂，吹水文风趣幽默。<br>目前已有近 10 万读者关注，微信搜索「**沉默王二**」（也可以扫描下方的二维码）就可以关注我了。
    
    <div align="left">
        <img src="https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/gongzhonghao.png" width="260px">
    </div>

    回复关键字「**03**」可以下载《Java 程序员进阶之路》专栏的离线 PDF 版本（暗黑版和亮白版）。

## :muscle: 参与贡献

1. 如果你对本项目有任何建议或发现文中内容有误的，欢迎提交 issues 进行指正。
2. 对于文中我没有涉及到知识点，欢迎提交 PR。


## :gift: Donate

开源不易，如果《Java 程序员进阶之路》专栏对你有些帮助，可以请二哥喝杯咖啡，算是对开源做出的一点点鼓励吧！

<div align="left">
    <img src="https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/zhifu.png" width="260px">
</div>

:gift_heart: 感谢大家对我资金的赞赏

时间|小伙伴|赞赏金额
---|---|---
2012-09-01|S*n|6.6 元
2012-08-02|*秒|1 元
2021-06-13|*7| 28 元
2021-04-29|pebble|2 元
