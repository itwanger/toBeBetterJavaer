---
title: Java程序在编译期发生了什么？
shortTitle: Java程序在编译期发生了什么？
category:
  - Java核心
tag:
  - Java虚拟机
description: 二哥的Java进阶之路，小白的零基础Java教程，从入门到进阶，Java程序在编译期发生了什么？
head:
  - - meta
    - name: keywords
      content: Java,JavaSE,教程,二哥的Java进阶之路,jvm,Java虚拟机
---

# Java程序在编译期发生了什么？


“二哥，看了上一篇 [Hello World](https://mp.weixin.qq.com/s/191I_2CVOxVuyfLVtb4jhg) 的程序后，我很好奇，它是怎么在 Run 面板里打印出‘三妹，少看手机少打游戏，好好学，美美哒’呢？”三妹咪了一口麦香可可奶茶后对我说。

“三妹，我们通常把 Java 分为编译期和运行时，弄清楚这两个阶段就知道原因了。由于运行时涉及到的内容比较多，这篇文章我们先来说说编译期，随后我们再来分析运行时。”

贴一下 HelloWorld 这段代码：

```java
/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("三妹，少看手机少打游戏，好好学，美美哒。");
    }
}
```

点击 IDEA 工具栏中的锤子按钮（Build Project，编译整个项目），如下图所示。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/five-01.png)


这时候，就可以在 src 的同级目录 target 下找到一个名为 HelloWorld.class 的文件。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/five-02.png)


如果找不到的话，在目录上右键选择「Reload from Disk，从磁盘上重新加载」，如下图所示：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/five-03.png)


可以双击打开它。

```java
//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.itwanger.five;

public class HelloWorld {
    public HelloWorld() {
    }

    public static void main(String[] args) {
        System.out.println("三妹，少看手机少打游戏，好好学，美美哒。");
    }
}
```

IDEA 默认会用 Fernflower 反编译工具将字节码文件（后缀为 .class 的文件，也就是 Java 源代码编译后的文件）反编译为我们可以看得懂的 Java 源代码。但实际上，字节码文件并不是这样的，而是：

```
// class version 58.0 (58)
// access flags 0x21
public class com/itwanger/five/HelloWorld {

  // compiled from: HelloWorld.java

  // access flags 0x1
  public <init>()V
   L0
    LINENUMBER 6 L0
    ALOAD 0
    INVOKESPECIAL java/lang/Object.<init> ()V
    RETURN
   L1
    LOCALVARIABLE this Lcom/itwanger/five/HelloWorld; L0 L1 0
    MAXSTACK = 1
    MAXLOCALS = 1

  // access flags 0x9
  public static main([Ljava/lang/String;)V
   L0
    LINENUMBER 8 L0
    GETSTATIC java/lang/System.out : Ljava/io/PrintStream;
    LDC "\u4e09\u59b9\uff0c\u5c11\u770b\u624b\u673a\u5c11\u6253\u6e38\u620f\uff0c\u597d\u597d\u5b66\uff0c\u7f8e\u7f8e\u54d2\u3002"
    INVOKEVIRTUAL java/io/PrintStream.println (Ljava/lang/String;)V
   L1
    LINENUMBER 9 L1
    RETURN
   L2
    LOCALVARIABLE args [Ljava/lang/String; L0 L2 0
    MAXSTACK = 2
    MAXLOCALS = 1
}
```

是不是就有点懵逼了？新手看到这个很容易头大，不过不要担心，后面我再和大家一块深入研究一下，这里就是感受一下字节码的魅力。

那这个字节码文件是怎么看到的呢？可以通过 IDEA 菜单栏中的「View」→「Show Bytecode」查看，如下图所示。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/five-04.png)

PS：字节码并不是机器码，操作系统无法直接识别，需要在操作系统上安装不同版本的 Java 虚拟机（JVM）来识别。通常情况下，我们只需要安装不同版本的 JDK（Java Development Kit，Java 开发工具包）就行了，它里面包含了 JRE（Java Runtime Environment，Java 运行时环境），而 JRE 又包含了 JVM。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/five-05.png)

Windows、Linux、MacOS 等操作系统都有相应的 JDK，只要安装好了 JDK 就有了 Java 语言的运行时环境，就可以把一份字节码文件在不同的平台上运行了。可以在 [Oracle 官网](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)上下载不同版本的 JDK。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/five-06.png)

PPS：为什么要查看字节码呢？查看字节码文件更容易让我们搞懂 Java 代码背后的原理，比如搞懂 Java 中的各种语法糖的本质。

相比于 IDEA 自带的「Show Bytecode」功能，我更推荐 `jclasslib` 这款插件，可以在插件市场中安装（我已经安装过了）。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/five-07.png)

安装完成之后，点击 View -> Show Bytecode With jclasslib 即可通过 jclasslib 查看字节码文件了（点击之前，光标要停留在对应的类文件上），如下图所示。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/five-08.png)

使用 jclasslib 不仅可以直观地查看类对应的字节码文件，还可以查看类的基本信息、常量池、接口、字段、方法等信息，如下图所示。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/five-09.png)



也就是说，在编译阶段，Java 会将 Java 源代码文件编译为字节码文件。在这个阶段，编译器会进行一些检查工作，比如说，某个关键字是不是写错了，语法上是不是符合预期了，不能有很明显的错误，否则带到运行时再检查出来就会比较麻烦了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/five-10.png)

----

GitHub 上标星 9300+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 9300+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)