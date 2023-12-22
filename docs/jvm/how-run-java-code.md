---
title: JVM到底是如何运行Java代码的？
shortTitle: JVM如何运行Java代码？
category:
  - Java核心
tag:
  - Java虚拟机
description: Java代码首先被编译器转换为字节码，然后在JVM上运行。在运行时，JVM通过解释执行或即时编译（JIT）将字节码转换为机器码。解释执行直接运行字节码，而JIT在运行时将热点代码编译优化为机器码以提升性能。
head:
  - - meta
    - name: keywords
      content: Java,JavaSE,教程,二哥的Java进阶之路,jvm,Java虚拟机
---

# 第二节：JVM 如何运行 Java 代码？

“二哥，看了 [Hello World](https://javabetter.cn/overview/hello-world.html) 的代码后，我很好奇，它是怎么在 Intellij IDEA 的 Run 面板里打印出‘三妹，少看手机少打游戏，好好学，美美哒’呢？”三妹咪了一口麦香可可奶茶后对我说。

“三妹，我们通常把 Java 代码执行的过程分为编译期和运行时，弄清楚这两个阶段就知道原因了。”我微笑着对三妹说，“对于一个 Java 程序员来说，写了那么久的代码，总要搞清楚自己写的 Java 代码到底是怎么运行起来的。这个问题在面试的时候也经常会被问到。”

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

点击 IDEA 工具栏中的锤子按钮（Build Project，编译整个项目，通常情况下，并不需要主动编译，IDEA 会自动帮我们编译），如下图所示。

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

IDEA 默认会用 [Fernflower](https://github.com/fesh0r/fernflower) 这个反编译工具将字节码文件（后缀为 .class 的文件，也就是 Java 源代码编译后的文件）反编译为我们可以看得懂的 Java 源代码。

但实际上，字节码文件并不是这样的，包含了 Java 虚拟机（JVM）执行的指令，还有类的元数据信息，如类名、方法和属性等。如果用 「show bytecode」打开字节码文件的话，它是下面这样子的：

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

bytecode 是不是就有点看不懂了？新手看到这个很容易头大，不过不要担心，后面我再和大家一块深入研究，这里就是让大家提前感受一下[bytecode](https://javabetter.cn/jvm/class-file-jiegou.html)的无穷魅力。

那这个 bytecode 是怎么看到的呢？

可以通过 IDEA 菜单栏中的「View」→「Show Bytecode」查看，如下图所示。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/five-04.png)

这个 bytecode 可以直译为字节码。

字节码并不是机器码，操作系统无法直接识别，需要在操作系统上安装不同版本的 [JVM](https://javabetter.cn/jvm/what-is-jvm.html) 来识别。通常情况下，我们只需要安装不同版本的 JDK（Java Development Kit，Java 开发工具包）就行了，它里面包含了 JRE（Java Runtime Environment，Java 运行时环境），而 JRE 又包含了 JVM。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/five-05.png)

Windows、Linux、MacOS 等操作系统都有相应的 JDK，只要安装好了 JDK 就有了 Java 语言的运行时环境，就可以把 Java 源代码编译为字节码，然后字节码又可以在不同的操作系统上运行了。

build once，run anywhere。

### jclasslib

查看字节码，相比 IDEA 自带的「Show Bytecode」，我更推荐 `jclasslib` 这款插件，可以在 Intellij IDEA 插件市场中安装。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/five-07.png)

安装完成之后，点击 View -> Show Bytecode With jclasslib 即可通过 jclasslib 查看字节码文件了（点击之前，光标要停留在对应的类文件上），如下图所示。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/five-08.png)

使用 jclasslib 不仅可以直观地查看类对应的字节码，还可以查看类的基本信息、常量池、接口、字段、方法等信息，如下图所示，[后面也会细讲](https://javabetter.cn/jvm/class-file-jiegou.html)。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/five-09.png)

也就是说，**在编译阶段，Java 会将 Java 源代码文件编译为字节码文件**。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/five-10.png)

字节码文件如果用十六进制编辑器（[下一节](https://javabetter.cn/jvm/class-load.html)会讲到）打开的话，内容如下所示。

![](https://cdn.tobebetterjavaer.com/stutymore/how-run-java-code-20231030185540.png)

在编译这个阶段，编译器会进行一些检查工作，比如说，某个关键字是不是写错了（private 写成 provate），语法上是不是符合预期，不能有很明显的错误，要提前检查出来，不能带到运行时。

## 运行时

当有了 .class 文件也就是[字节码文件](https://javabetter.cn/jvm/class-file-jiegou.html)之后，就需要启动一个 JVM 实例来进一步加载解析并运行 .class 文件中的字节码。

JVM 本质上是操作系统中的一个进程，因此要想通过 JVM 加载解析字节码文件，就必须先启动一个 JVM 进程。JVM 进程启动之后通过[类加载器（下一节会细讲）](https://javabetter.cn/jvm/class-load.html)加载字节码文件，然后将字节码加载到 JVM 对应的内存空间，再转化为机器码最终交给 CPU 执行。

![](https://cdn.tobebetterjavaer.com/stutymore/how-run-java-code-20231030194039.png)

Java 字节码是 JVM 执行的指令集，每个指令由一个操作码（opcode）和零个或多个操作数（operands）组成。

- 操作码：一个字节大小的指令，用于表示具体的操作（如加法、加载变量等）。
- 操作数：跟随操作码，用于提供额外信息（如变量索引、常量值等）。

下面使用 [javap](https://javabetter.cn/jvm/bytecode.html)（后面会细讲）来稍微看一下 HelloWorld 程序的字节码。

> javap 命令可以从编译后的 .class 文件中提取出源代码和元数据信息，并将其显示在命令行界面上。

```
0 getstatic #2 <java/lang/System.out>
3 ldc #3 <Hello World>
5 invokevirtual #4 <java/io/PrintStream.println>
8 return
```

这段字节码的意思是调用 System.out.println 方法打印"Hello World"字符串。下面是详细的解释：

1. `0: getstatic #2 <java/lang/System.out>`

   - 操作码：getstatic
   - 操作数：#2
   - 描述：这条指令的作用是获取静态字段，这里获取的是`java.lang.System`类的`out`静态字段，它是一个`PrintStream`类型的输出流。#2 是一个指向常量池的索引，常量池里存储了`java/lang/System.out`的引用信息。执行这条指令后，`System.out`的引用会被压入操作数栈顶。

2. `3: ldc #3 <Hello World>`

   - 操作码：ldc
   - 操作数：#3
   - 描述：这条指令的作用是从常量池中加载一个常量值（这里是字符串"Hello World"）到操作数栈顶。#3 是一个指向常量池的索引，常量池里存储了字符串"Hello World"的引用。执行这条指令后，字符串"Hello World"的引用会被压入操作数栈顶。

3. `5: invokevirtual #4 <java/io/PrintStream.println>`

   - 操作码：invokevirtual
   - 操作数：#4
   - 描述：这条指令的作用是调用实例方法。这里调用的是`PrintStream`类的`println`方法，用来打印字符串。#4 是一个指向常量池的索引，常量池里存储了`java/io/PrintStream.println`方法的引用信息。需要注意的是，调用实例方法前，需要将对象引用和方法参数压入操作数栈。在这个例子中，`System.out`的引用和字符串"Hello World"已经被压入栈中，所以可以直接调用`println`方法。

4. `8: return`
   - 操作码：return
   - 描述：这条指令的作用是从当前方法返回。因为这是一个`void`方法，所以不需要从操作数栈中弹出返回值。

上面的 getstatic、ldc、invokevirtual、return 等就是 [字节码指令](https://javabetter.cn/jvm/zijiema-zhiling.html)，后面会细讲，这里就先简单了解下。

大家可以使用 [hexdump](https://zh.wikipedia.org/wiki/%E5%8D%81%E5%85%AD%E8%BF%9B%E5%88%B6%E8%BD%AC%E5%82%A8)（一个在 Unix 和 Linux 系统中常用的工具，用于以十六进制的形式显示文件的内容）看一下字节码的二进制内容。与以上字节码对应的二进制，就是下面这几个数字：

```
b2 00 02 12 03 b6 00 04 b1
```

> 注意：这里是二进制文件的 16 进制表示，也就是 hex，一般分析二进制文件都是以 hex 进行分析。

我们可以看一下字节码指令和二进制之间的对应关系，以及对应的语义。

```
0xb2   getstatic       获取静态字段的值
0x12   ldc             常量池中的常量值入栈
0xb6   invokevirtual   运行时方法绑定调用方法
0xb1   return          void 方法返回
```

JVM 就是靠解析这些操作码和操作数来完成程序执行的。常见的执行方式有两种，一种解释执行，将操作码和操作数翻译成机器码执行；另外一种就是 [JIT（后面会细讲）](https://javabetter.cn/jvm/jit.html)，也就是我们常说的即时编译，它会在一定条件下将字节码编译成机器码之后再执行。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/how-run-java-code-91dac706-1c4e-4775-bc4e-b2104283aa04.png)

在解释执行模式下，JVM 直接解释执行字节码。这意味着每一条 Java 字节码指令都由解释器直接转换成对应的机器指令并立即执行。这个过程不涉及编译优化，因此执行速度相对较慢。

JIT 编译器会在运行时将热点代码编译成机器码，这样就可以在后面的执行过程中直接使用编译好的机器码，而不需要再次解释执行。这样就可以提高程序的执行效率。

注意，当[类加载器完成字节码数据加载](https://javabetter.cn/jvm/class-load.html)任务之后，JVM 划分了专门的内存区域承载这些字节码数据以及运行时中间数据。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/neicun-jiegou-e33179f3-275b-44c9-87f6-802198f8f360.png)

其中程序计数器、虚拟机栈以及本地方法栈属于线程私有的，堆以及元数据区属于共享数据区，不同的线程共享这两部分内存数据。

如果当前虚拟机中的线程执行的是 Java 的[普通方法](https://javabetter.cn/oo/method.html)，那么此时程序计数器中起初存储的是方法的第一条指令，当方法开始执行之后，PC 寄存器存储的是下一个字节码指令的地址。

但是如果当前虚拟机中的线程执行的是 [naive 方法](https://javabetter.cn/oo/native-method.html)，那么程序计数器中的值为 undefined。

当线程执行字节码指令时，程序计数器会进行自动加 1 指向下一条字节码指令地址。

如果遇到判断分支、循环以及异常等不同的控制转移语句，程序计数器会被置为目标字节码指令的地址。另外在多线程切换的时候，虚拟机会记录当前线程的程序计数器，当线程切换回来的时候会根据此前记录的值恢复到程序计数器中，来继续执行线程的后续的字节码指令。

除了程序计数器之外，字节码指令的执行流转还需要虚拟机栈的参与。我们先来看下虚拟机栈的大致结构，如下图所示。

![](https://cdn.tobebetterjavaer.com/stutymore/how-run-java-code-20231031142106.png)

栈大家肯定都知道，它是一个先入后出的数据结构，非常适合配合方法的执行过程。虚拟机栈操作的基本元素就是栈帧，栈帧的结构主要包含了局部变量、操作数栈、动态连接以及方法返回地址这几个部分。

知道了虚拟机栈的结构之后，我们来看下方法执行的流转过程是怎样的，我们以这段代码为例，一个 Test 类，main 方法里 new 了一个 Uesr 对象，会将 User 的 age 作为参数传递给静态方法 calculate 进行一个简单的加法操作并返回，最后打印到控制台。

```java
public class Test {
    public static void main(String[] args) {
        User user  = new User();
        Integer result = calculate(user.getAge());
        System.out.println(result);
    }

    private static Integer calculate(Integer age) {
        Integer data = age + 3;
        return data;
    }

}
```

1、JVM 启动完成 .class 文件加载之后，它会创建一个名为"main"的线程，并且该线程会自动调用定义在该类中的名为"main"的静态方法，这也是 Java 程序的入口点；

2、当 JVM 在主线程中调用当前方法的时候就会创建当前线程独享的程序计数器以及虚拟机栈，在 Test.class 类中，开始执行 mian 方法时，JVM 会在虚拟机栈中压入 main 方法对应的帧栈帧；

![](https://cdn.tobebetterjavaer.com/stutymore/how-run-java-code-20231031143842.png)

3、在栈帧的操作数栈中存储了操作的数据，JVM 执行字节码指令的时候从操作数栈中获取数据，执行计算操作之后再将结果压入操作数栈；

4、当进行 calculate 方法调用的时候，虚拟机栈继续压入 calculate 方法对应的栈帧，被调用方法的参数、局部变量和操作数栈等信息会存储在新创建的栈帧中。其中该栈帧中的方法返回地址中存放了 main 方法执行的地址信息，方便在调用方法执行完成后继续恢复调用前的代码执行；

![](https://cdn.tobebetterjavaer.com/stutymore/how-run-java-code-20231031144218.png)

5、对于 age + 3 这条加法指令，在执行该指令之前，JVM 会将操作数栈顶部的两个元素弹出，并将它们相加，然后将结果推入操作数栈中。在这个例子中，指令的操作码是“add”，它表示执行加法操作；操作数是 0，它表示从操作数栈的顶部获取第一个操作数；操作数是 1，它表示从操作数栈的次顶部获取第二个操作数；

6、程序计数器中存储了下一条需要执行操作的字节码指令的地址，因此 Java 线程执行业务逻辑的时候必须借助于程序计数器才能获得下一步命令的地址；

7、当 calculate 方法执行完成之后，对应的栈帧将从虚拟机栈中弹出，其中方法执行的结果会被压入 main 方法对应的栈帧中的操作数栈中，而方法返回地址被重置到 main 线程对应的程序计数器中，以便于后续字节码执行引擎从程序计数器中获取下一条命令的地址。如果方法没有返回值，JVM 仍然会将一个 null 值推送到调用该方法的栈帧的操作数栈中，作为占位符，以便恢复调用方的操作数栈状态。

8、字节码执行引擎中的解释器会从程序计数器中获取下一个字节码指令的地址，也就是从元空间中获取对应的字节码指令，在获取到指令之后，通过翻译器翻译为对应的汇编语言而再交给硬件解析为机器指令，最终由 CPU 进行执行，而后再将执行结果进行写回。

## 总结

Java 代码首先被编译器转换为字节码，然后在 JVM 上运行。在运行时，JVM 通过解释执行或即时编译（JIT）将字节码转换为机器码。解释执行直接运行字节码，而 JIT 在运行时将热点代码编译优化为机器码以提升性能。

其中字节码是非常关键的内容，涉及到[类的加载机制](https://javabetter.cn/jvm/class-load.html)、字节码文件的结构、字节码指令的执行流程等等，后面我们会细讲。

> 参考链接：[JVM 是如何运行 Java 程序的](https://mp.weixin.qq.com/s/pj3Y-O2eIRF5tQmHboGN3A)，作者梦尧技术，写的很不错。

---

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括 Java 基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM 等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
