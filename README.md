# :rainbow: To Be Better Javaer，Java 程序员进阶之路 - 通俗易懂、风趣幽默

> **作者：** 沉默王二，Java Developer，[:pencil2: 个人博客](https://itwanger.com)，[:books: 计算机经典书单(download)](https://mp.weixin.qq.com/s/qwUtTbfDB36VSwnjMRakqA)

> Java 程序员进阶之路，本专栏旨在为 Java 初学者提供一个清晰详细的学习教程，侧重点为 Java 语法基础、Java 集合框架、Java IO、Java 并发编程、Java 虚拟机等。如果本仓库能为你提供帮助，请给予支持(关注、点赞、分享)！


# ⛳目录

- 仓库同步：[Github](https://github.com/itwanger/toBeBetterJavaer) | [码云](https://gitee.com/itwanger/toBeBetterJavaer) | [CodeChina](https://codechina.csdn.net/qing_gee/toBeBetterJavaer)
- [学习说明](https://github.com/itwanger/toBeBetterJavaer#bookmark-学习说明)
- [章节目录](https://github.com/itwanger/toBeBetterJavaer#pencil-章节目录)
- [联系作者](https://github.com/itwanger/toBeBetterJavaer#paw_prints-联系作者)
- [参与贡献](https://github.com/itwanger/toBeBetterJavaer#muscle-参与贡献)

# :bookmark: 学习说明

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

# :pencil: 章节目录

## Java 入门

### **Java 概述**

- [什么是 Java](docs/overview/what-is-java.md)
- [Java 发展简史](docs/overview/java-history.md)
- [Java 的优势](docs/overview/java-advantage.md)
- [JDK 和 JRE 有什么区别](docs/overview/jdk-jre.md)
- [安装集成开发环境 Intellij IDEA](docs/overview/idea.md)
- [第一个 Java 程序：Hello World](docs/overview/hello-world.md)


### **Java 基础语法**

- [基本数据类型](docs/basic-grammar/basic-data-type.md)
- [流程控制](docs/basic-grammar/flow-control.md)
- [运算符](docs/basic-grammar/operator.md)
- [注释：代码的最强辅助](docs/basic-grammar/javadoc.md)

### **面向对象**

- [什么是对象？什么是类](docs/oo/object-class.md)
- [变量](docs/oo/var.md)
- [方法](docs/oo/method.md)
- [构造方法](docs/oo/construct.md)
- [代码初始化块](docs/oo/code-init.md)
- [抽象类](docs/oo/java-abstract.md)
- [接口](docs/oo/interface.md)
- [static 关键字](docs/oo/static.md)
- [this 和 super 关键字](docs/oo/this-super.md)
- [final 关键字](docs/oo/final.md)
- [instanceof 关键字](docs/oo/instanceof.md)


### **字符串**

- [String 为什么是不可变的](docs/string/immutable.md)
- [字符串常量池](docs/string/constant-pool.md)
- [深入浅出 String.intern](docs/string/intern.md)
- [如何比较两个字符串是否相等](docs/string/equals.md)
- [如何拼接字符串](docs/string/join.md)
- [如何拆分字符串](docs/string/split.md)

### **数组**

- [数组](docs/array/array.md)
- [打印数组](docs/array/print.md)

### **集合框架**

- [初识集合框架](docs/collection/gailan.md)
- [时间复杂度](docs/collection/big-o.md)
- [ArrayList](docs/collection/arraylist.md)
- [LinkedList](docs/collection/linkedlist.md)
- [ArrayList 重拳出击，把 LinkedList 干翻在地](docs/collection/list-war-1.md)
- [被 ArrayList 锤了一拳后，LinkedList 很不服气](docs/collection/list-war-2.md)
- [海康威视一面：Iterator与Iterable有什么区别？](docs/collection/iterator-iterable.md)
- [为什么阿里巴巴强制不要在 foreach 里执行删除操作](docs/collection/fail-fast.md)
- [HashMap 的 hash 原理](docs/collection/hash.md)
- [HashMap 的扩容机制](docs/collection/hashmap-resize.md)
- [HashMap 的加载因子为什么是 0.75](docs/collection/hashmap-loadfactor.md)
- [为什么 HashMap 是线程不安全的？](docs/collection/hashmap-thread-nosafe.md)
- [HashMap 精选面试题（背诵版）](docs/collection/hashmap-interview.md)


### **异常处理**

- [异常处理机制](docs/exception/gailan.md)
- [try-catch-finally](docs/exception/try-catch-finally.md)
- [throw 和 throws](docs/exception/throw-throws.md)
- [try-with-resouces](docs/exception/try-with-resouces.md)
- [异常最佳实践](docs/exception/shijian.md)

### **常用工具类**

- [数组工具类：Arrays](docs/common-tool/arrays.md)
- [集合工具类：Collections](docs/common-tool/collections.md)

### **加餐**

- [Java 中常用的 48 个关键字](docs/basic-extra-meal/48-keywords.md)
- [Java 命名约定](docs/basic-extra-meal/java-naming.md)
- [Java 默认的编码方式 Unicode](docs/basic-extra-meal/java-unicode.md)
- [new Integer(18) 与 Integer.valueOf(18) 有什么区别](docs/basic-extra-meal/int-cache.md)
- [自动拆箱与自动装箱](docs/basic-extra-meal/box.md)
- [方法重载和方法重写](docs/basic-extra-meal/override-overload.md)
- [Java 到底是值传递还是引用传递](docs/basic-extra-meal/pass-by-value.md)
- [浅拷贝与深拷贝](docs/basic-extra-meal/deep-copy.md)
- [为什么重写 equals 时必须重写 hashCode 方法](docs/basic-extra-meal/equals-hashcode.md)
- [注解](docs/basic-extra-meal/annotation.md)
- [枚举](docs/basic-extra-meal/enum.md)
- [深入理解 Java 中的反射](docs/basic-extra-meal/fanshe.md)
- [泛型](docs/basic-extra-meal/generic.md)
- [Java 不能实现真正泛型的原因是什么？](docs/basic-extra-meal/true-generic.md)
- [Java程序在编译期发生了什么](docs/basic-extra-meal/what-happen-when-javac.md)
- [马蜂窝一面：Comparable和Comparator有什么区别？](docs/basic-extra-meal/comparable-omparator.md)
- [手撸了一个Java的不可变对象，很哇塞！](docs/basic-extra-meal/immutable.md)
- [从原理上搞懂可变参数，就靠它了](docs/basic-extra-meal/varables.md)

## Java 进阶

### **Java IO**

- [IO 流的分类和概述](docs/io/shangtou.md)

### **Java 虚拟机**

- [JVM 是什么？](docs/jvm/what-is-jvm.md)

# :paw_prints: 联系作者

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
2021-10-26|*鱼|28 元
2021-10-11|*人|28 元
2021-09-01|S*n|6.6 元
2021-08-02|*秒|1 元
2021-06-13|*7| 28 元
2021-04-29|pebble|2 元
