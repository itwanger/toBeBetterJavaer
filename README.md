# 教妹学 Java

> **作者：** 沉默王二，Java Developer，[:pencil2: 个人博客](http://www.itwanger.com/)，[:trophy: CSDN 博客专家](https://blog.csdn.net/qing_gee)，[:memo: 关于我](http://www.itwanger.com/about.html)


> 《教妹学Java》，听起来就很有趣吧，本专栏旨在为 Java 初学者提供一个清晰详细的学习教程，侧重点为 Java 基础语法、Java 集合框架、Java IO、Java 并发编程、Java 虚拟机等。如果本仓库能为您提供帮助，请给予支持(关注、点赞、分享)！

👍推荐 [在线阅读](https://itwanger.gitee.io/tech-sister-learn-java)  (Github 访问速度比较慢可能会导致部分图片无法刷新出来) 


<div align="center">
    <img src="https://cdn.jsdelivr.net/gh/itwanger/Tech-Sister-Learn-Java/images/logo.png" width="200px">
</div>

<div align="center">
    <a href="https://itwanger.gitee.io/tech-sister-learn-java"> <img src="https://badgen.net/badge/itwanger/%E5%9C%A8%E7%BA%BF%E9%98%85%E8%AF%BB?icon=sourcegraph&color=4ab8a1"></a>
    <a href="#公众号"><img src="https://badgen.net/badge/PDF/%E6%95%99%E5%A6%B9%E5%AD%A6Java?color=4ab8a1&icon=bitcoin-lightning&label=PDF" alt="PDF下载"></a>
    <a href="https://github.com/itwanger/Tech-Sister-Learn-Java"> <img src="https://badgen.net/github/stars/itwanger/Tech-Sister-Learn-Java?icon=github&color=4ab8a1"></a>
    <a href="https://github.com/itwanger/Tech-Sister-Learn-Java"> <img src="https://badgen.net/github/forks/itwanger/Tech-Sister-Learn-Java?icon=github&color=4ab8a1"></a>
</div>
<br>

<div align="center">
<a href="https://mp.weixin.qq.com/s/d7Z0QoChNuP9bTwAGh2QCw">Java 教程</a> •    
<a href="https://mp.weixin.qq.com/s/s0_XzGjHcgk2RwbCRzmgHg">Java 面经手册</a> • 
<a href="https://mp.weixin.qq.com/s/wvzB1p9_Yu7n7Ak83DrrdA">LeetCode 刷题笔记</a> • 
<a href="https://mp.weixin.qq.com/s/qwUtTbfDB36VSwnjMRakqA">计算机经典书单</a>
</div>


# 目录

## **基础知识**

- [什么是 Java](docs/basic/what-is-java.md)
- [Java 发展简史](docs/basic/java-history.md)
- [Java 为什么如此流行](docs/basic/why-java-popular.md)
- [第一个 Java 程序：Hello World](docs/basic/hello-world.md)
- [Java程序在编译期发生了什么](docs/basic/what-happen-when-javac.md)
- [JDK 和 JRE 有什么区别](docs/basic/jdk-jre.md)
- [JVM 是什么](docs/basic/jvm.md)
- [Java 变量类型有哪些](docs/basic/java-var.md)
- [Java 数据类型有哪些](docs/basic/java-data-type.md)
- [必知必会的 Unicode：躲开锟斤拷](docs/basic/unicode.md)
- [Java 运算符有哪些？](docs/basic/java-operator.md)
- [一网打尽 Java 的那些关键字](docs/basic/java-keywords.md)
- [流程控制语句有哪些？图解版](docs/basic/java-control.md)
- [Java 注释：程序的注解](docs/basic/javadoc.md)

## **对象和类**

- [技术大佬的必备素质：命名优雅](docs/object-class/java-naming.md)
- [对象和类的相爱相杀](docs/object-class/java-object-class.md)
- [方法：我负责程序的行为](docs/object-class/java-method.md)
- [构造方法：对象初始化的必经之路](docs/object-class/java-construct.md)
- [学妹必须学会的 static 关键字](docs/object-class/java-static.md)
- [学弟必须掌握的 this 和 super ](docs/object-class/java-this.md)
- [傻傻分不清：方法重载和方法重写](docs/object-class/override-overload.md)
- [代码初始化块：让我先走一步](docs/object-class/code-init.md)
- [再见了，我的 final 关键字](docs/object-class/java-final.md)
- [判断对象的类型：instanceof 关键字](docs/object-class/java-instanceof.md)
- [抽象类：子类复用的基石](docs/object-class/java-abstract.md)
- [接口：抽象的另外一种表现形式](docs/object-class/java-interface.md)
- [Java 表示：我只有值传递，没有引用传递](docs/object-class/pass-by-value.md)
- [面试经典题目：浅拷贝与深拷贝有什么区别](docs/object-class/deep-copy.md)
- [自动拆箱与自动装箱，好玩](docs/object-class/box.md)
- [深入理解 Java 的反射](docs/object-class/fanshe.md)
- [撸个注解有什么难的](docs/object-class/annotation.md)

## **数组**

- [最重要的数据结构之一](docs/array/gailan.md)
- [数组的专用工具类：java.util.Arrays](docs/array/arrays.md)
- [打印数组最优雅的方式：deepToString](docs/array/print.md)

## **字符串**

- [从源码的角度来看字符串的不可变性](docs/string/source.md)
- [学弟学妹都必须掌握的字符串常量池](docs/string/constant-pool.md)
- [深入浅出之美团技术团队解析过的 String.intern](docs/string/intern.md)
- [如何比较两个字符串是否相等](docs/string/equals.md)
- [如何拼接字符串](docs/string/join.md)
- [如何拆分字符串](docs/string/split.md)

## **异常处理**

- [异常处理机制](docs/exception/gailan.md)
- [try-catch-finally](docs/exception/try-catch-finally.md)
- [throw 和 throws](docs/exception/throw-throws.md)
- [try-with-resouces](docs/exception/try-with-resouces.md)

# 参与贡献

1. 如果您对本项目有任何建议或发现文中内容有误的，欢迎提交 issues 进行指正。
2. 对于文中我没有涉及到知识点，欢迎提交 PR。


# Donate

开源不易，如果《教妹学 Java》专栏对您有些帮助，可以请二哥喝杯咖啡，让他继续肝！


<div align="center">
    <img src="https://cdn.jsdelivr.net/gh/itwanger/Tech-Sister-Learn-Java/images/weixin.png" width="260px">
</div>
