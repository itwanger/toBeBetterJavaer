---
title: JVM到底是如何运行Java代码的？
shortTitle: JVM是如何运行Java代码的？
category:
  - Java核心
tag:
  - Java虚拟机
description: JVM 运行 Java 代码包含的过程有：加载、执行、优化、本地接口调用、垃圾回收等。
head:
  - - meta
    - name: keywords
      content: Java,JavaSE,教程,二哥的Java进阶之路,jvm,Java虚拟机
---

# JVM 如何运行 Java 代码？

“二哥，看了 [Hello World](https://javabetter.cn/overview/hello-world.html) 的代码后，我很好奇，它是怎么在 Run 面板里打印出‘三妹，少看手机少打游戏，好好学，美美哒’呢？”三妹咪了一口麦香可可奶茶后对我说。

“三妹，我们通常把 Java 分为编译期和运行时，弄清楚这两个阶段就知道原因了。”我微笑着对三妹说，“对于一个 Java 程序员来说，写了那么久的代码，总要搞清楚自己写的 Java 代码到底是怎么运行起来的。这个问题在面试的时候也经常会被问到。”

## 编译期

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

点击 IDEA 工具栏中的锤子按钮（Build Project，编译整个项目，IDEA 默认会自动编译），如下图所示。

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

## 字节码

IDEA 默认会用 Fernflower 这个反编译工具将字节码文件（后缀为 .class 的文件，也就是 Java 源代码编译后的文件）反编译为我们可以看得懂的 Java 源代码。但实际上，字节码文件并不是这样的，而是：

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

是不是就有点看不懂了？新手看到这个很容易头大，不过不要担心，后面我再和大家一块深入研究，这里就是让大家感受一下[字节码](https://javabetter.cn/jvm/class-file-jiegou.html)的魅力（😂）。

那这个字节码文件是怎么看到的呢？

可以通过 IDEA 菜单栏中的「View」→「Show Bytecode」查看，如下图所示。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/five-04.png)

字节码并不是机器码，操作系统无法直接识别，需要在操作系统上安装不同版本的 Java 虚拟机（[JVM](https://javabetter.cn/jvm/what-is-jvm.html)）来识别。通常情况下，我们只需要安装不同版本的 JDK（Java Development Kit，Java 开发工具包）就行了，它里面包含了 JRE（Java Runtime Environment，Java 运行时环境），而 JRE 又包含了 JVM。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/five-05.png)

Windows、Linux、MacOS 等操作系统都有相应的 JDK，只要安装好了 JDK 就有了 Java 语言的运行时环境，就可以把一份字节码文件在不同的平台上运行了。这个我们前面已经讲过了。

为什么要查看字节码呢？

查看字节码文件更容易让我们搞懂 Java 代码背后的原理，比如搞懂 Java 中的各种语法糖的本质，后面我们会讲到：[从 javap 的角度轻松看懂字节码](https://javabetter.cn/jvm/bytecode.html)。

相比于 IDEA 自带的「Show Bytecode」功能，我更推荐 `jclasslib` 这款插件，可以在插件市场中安装（我已经安装过了）。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/five-07.png)

安装完成之后，点击 View -> Show Bytecode With jclasslib 即可通过 jclasslib 查看字节码文件了（点击之前，光标要停留在对应的类文件上），如下图所示。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/five-08.png)

使用 jclasslib 不仅可以直观地查看类对应的字节码文件，还可以查看类的基本信息、常量池、接口、字段、方法等信息，如下图所示，[后面也会细讲](https://javabetter.cn/jvm/class-file-jiegou.html)。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/five-09.png)

也就是说，**在编译阶段，Java 会将 Java 源代码文件编译为字节码文件**。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/five-10.png)

字节码文件由一组如下图这样的 16 进制数组成。

![](https://cdn.tobebetterjavaer.com/stutymore/how-run-java-code-20231030185540.png)

在这个阶段，编译器会进行一些检查工作，比如说，某个关键字是不是写错了，语法上是不是符合预期了，不能有很明显的错误，否则带到运行时再检查出来就会比较麻烦了。

## 运行时

当我们有了.class 文件也就是[字节码文件](https://javabetter.cn/jvm/class-file-jiegou.html)之后，就需要启动一个 JVM 实例来进一步加载解析.class 字节码。

JVM 本质上是操作系统中的一个进程，因此要想通过 JVM 加载解析.class 文件，必须先启动一个 JVM 进程。JVM 进程启动之后通过[类加载器](https://javabetter.cn/jvm/class-load.html)加载 .class 文件，将字节码加载到 JVM 对应的内存空间，JVM 将字节码文件转化为汇编语言后再由硬件解析为机器语言最终最终交给 CPU 执行。

![](https://cdn.tobebetterjavaer.com/stutymore/how-run-java-code-20231030194039.png)

Java 字节码是沟通 JVM 与 Java 代码的桥梁，下面使用 [javap](https://javabetter.cn/jvm/bytecode.html)（从编译过的.class 文件中提取出源代码和元数据信息，并将其显示在命令行界面上，后面还会细讲） 来稍微看一下字节码。

```
0 getstatic #2 <java/lang/System.out>
3 ldc #3 <Hello World>
5 invokevirtual #4 <java/io/PrintStream.println>
8 return
```

Java 虚拟机采用基于栈的架构，其指令由操作码和操作数组成。这些[字节码指令](https://javabetter.cn/jvm/zijiema-zhiling.html)（后面会细讲），就叫作 opcode。其中，getstatic、ldc、invokevirtual、return 等，就是 opcode，可以看到是比较容易理解的。

我们继续使用 [hexdump](https://zh.wikipedia.org/wiki/%E5%8D%81%E5%85%AD%E8%BF%9B%E5%88%B6%E8%BD%AC%E5%82%A8)（一个在 Unix 和 Linux 系统中常用的工具，用于以十六进制的形式显示文件的内容）看一下字节码的二进制内容。与以上字节码对应的二进制，就是下面这几个数字：

```
b2 00 02 12 03 b6 00 04 b1
```

> 注意：这里是二进制文件的 16 进制表示，也就是 hex，一般分析二进制文件都是以 hex 进行分析。

我们可以看一下它们的对应关系。

```
0xb2   getstatic       获取静态字段的值
0x12   ldc             常量池中的常量值入栈
0xb6   invokevirtual   运行时方法绑定调用方法
0xb1   return          void 函数返回
```

opcode 有一个字节的长度(0~255)，意味着指令集的操作码个数不能操作 256 条。而紧跟在 opcode 后面的是被操作数。比如 b2 00 02，就代表了 `getstatic #2 <java/lang/System.out>`。

JVM 就是靠解析这些 opcode 和操作数来完成程序的执行的。当我们使用 Java 命令运行 .class 文件的时候，实际上就相当于启动了一个 JVM 进程。

然后 JVM 会翻译这些字节码，它有两种执行方式。常见的就是解释执行，将 opcode + 操作数翻译成机器代码；另外一种执行方式就是 [JIT（后面会细讲）](https://javabetter.cn/jvm/jit.html)，也就是我们常说的即时编译，它会在一定条件下将字节码编译成机器码之后再执行。

这些 .class 文件会被加载、存放到 metaspace 中，等待被调用，这里会有一个[类加载器（后面会细讲）](https://javabetter.cn/jvm/class-load.html)的概念。

而 JVM 的程序运行，都是在栈上完成的，这和其他普通程序的执行是类似的，同样分为堆和栈。比如我们现在运行到了 main 方法，就会给它分配一个栈帧。当退出方法体时，会弹出相应的栈帧。你会发现，大多数字节码指令，就是不断的对栈帧进行操作。

而其他大块数据，是存放在堆上的。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/how-run-java-code-91dac706-1c4e-4775-bc4e-b2104283aa04.png)

---

GitHub 上标星 9300+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括 Java 基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM 等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 9300+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
