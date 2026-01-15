---
title: 教妹学Java：第一个Java程序Hello World
shortTitle: 第一个Java程序
category:
  - Java核心
tag:
  - Java概述
description: 本文将带您了解如何使用Intellij IDEA编写和运行第一个Java程序：Hello World。通过简单的步骤和详细的截图，您将快速掌握Intellij IDEA的基本使用方法，顺利迈出Java编程的第一步。
head:
  - - meta
    - name: keywords
      content: Java,Intellij IDEA, Java程序, Hello World, 编写, 运行, Java新手, 入门教程
---


“三妹，今天，我们来编写第一个 Java 程序，Hello World 期待吗？”

三妹点了点头，表示认同（😂）。

“好的，那我们直接开始。”

打开 [Intellij IDEA](https://javabetter.cn/overview/IDEA-install-config.html)，新建一个学习 Java 的项目，点击 File → New → Project。

![](https://cdn.paicoding.com/tobebetterjavaer/images/overview/hello-world-3810664d-49fb-4bed-ad32-3cb962ab5201.png)

选择 JDK 版本，比如之前我们[安装的 JDK 8](https://javabetter.cn/overview/jdk-install-config.html)。

![](https://cdn.paicoding.com/tobebetterjavaer/images/overview/hello-world-3773144f-ba5a-4639-8747-70eb815f1ccd.png)

你也可以选择 JDK 11 或者最新的 JDK 17 或者添加新的 JDK 版本，但（不建议）。

![](https://cdn.paicoding.com/tobebetterjavaer/images/overview/hello-world-85e3860b-3207-45c1-85d6-09c7cfd83c77.png)

然后点击「next」，直到填写项目名字，比如说 tobebetterjavaerdemo。

![](https://cdn.paicoding.com/tobebetterjavaer/images/overview/hello-world-aad8ff0b-61e4-4dc1-9f5b-70f64f34a49b.png)

然后点击 finish，之后就可以看到我们新建的项目界面了。

![](https://cdn.paicoding.com/tobebetterjavaer/images/overview/hello-world-5ef6024a-86e4-4fb7-860c-526ed867ab4a.png)

如果你的 Intellij IDEA 主题和二哥不一样，没关系，当然了，如果你也是个有颜值追求的家伙，可以安装 Vuesion Theme 插件，安装方法[戳这里](https://javabetter.cn/ide/shenji-chajian-10.html)。

“OK，到这里，我们已经把学习 Java 的环境准备好了，接下来就可以写第一个 Hello World 程序了。”我自信地对三妹说。

一般我们会把源代码放在 src 目录下（source 的前缀，所以学编程，英语中常用的单词必须得会，不会就去学）。

右键 src 目录，在菜单中依次选择 New → Java Class。

![](https://cdn.paicoding.com/tobebetterjavaer/images/overview/hello-world-3dcc212c-bc06-49b0-989a-d3d129586064.png)

填写 Class 名，也就是类名（不知道类名是啥，后面会讲），注意大小写敏感，然后按下 enter 键。

![](https://cdn.paicoding.com/tobebetterjavaer/images/overview/hello-world-c4e95c3f-1832-4fc5-bfe7-ce5def0129e2.png)

就会出现这样的代码。

![](https://cdn.paicoding.com/tobebetterjavaer/images/overview/hello-world-380bd820-3b92-4195-86cc-1af30836ce38.png)

注释是二哥配置好的，你如果没配置可能没有，`public class HelloWorld {}` 是 Intellij IDEA 帮我们自动生成的。

之后在大括号里面键入 `main` 等 Intellij IDEA 给出提示后键入 enter 键。

Intellij IDEA 就会帮我们自动生成 main 方法，也就是这段代码。

![](https://cdn.paicoding.com/tobebetterjavaer/images/overview/hello-world-e0acad2b-1735-42d9-b843-5d65d48c0946.png)

然后在 main 方法中键入 `so` 等出现提示后键入 enter 键。

![](https://cdn.paicoding.com/tobebetterjavaer/images/overview/hello-world-9733e9ba-9e38-41d6-8a58-e73062ee9ed2.png)

Intellij IDEA 就会帮我们自动添加 `System.out.println()`，这是一个向控制台输出的方法（小白先不管它是什么意思，后面会讲）。

![](https://cdn.paicoding.com/tobebetterjavaer/images/overview/hello-world-8eb1a438-88d8-4ea2-8861-af96862518fc.png)

接着在 `println()` 的小括号中键入 `"Hello World"`，注意是英文的双引号，中文的会报错哦，三妹。

![](https://cdn.paicoding.com/tobebetterjavaer/images/overview/hello-world-f5aa5fd1-4498-4022-b6e6-cc50f23dacb7.png)

然后在 HelloWorld.java 的代码编辑器，也就是光标所在的位置右键，选择「Run 'HelloWorld.main()'」。

![](https://cdn.paicoding.com/tobebetterjavaer/images/overview/hello-world-98e26e22-4811-4546-a88f-59a67d2d93ca.png)

等 Intellij IDEA 编译&运行后就可以在控制台看到这样的输出内容。

![](https://cdn.paicoding.com/tobebetterjavaer/images/overview/hello-world-39d0d413-a2c6-4238-bead-f29183d271c7.png)

这就表明我们的第一个 Java 代码完成了，恭喜自己一下吧，三妹！

“二哥，你太棒了，好激动哦！！！！！！！”

下面，我们来简单解释一下这段代码。

第一个 Java 程序非常简单，我们来改一下输出内容，把 Hello World 替换掉：

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("三妹，少看手机少打游戏，好好学，美美哒。");
    }
}
```

- class 关键字：用于在 Java 中声明一个[类](https://javabetter.cn/oo/object-class.html)。
- public 关键字：一个表示可见性的[访问修饰符](https://javabetter.cn/oo/access-control.html)。
- [static 关键字](https://javabetter.cn/oo/static.html)：我们可以用它来声明任何一个方法，被 static 修饰后的方法称之为静态方法。静态方法不需要为其创建对象就能调用。
- void 关键字：表示该方法不返回任何值。
- main 关键字：表示该方法为主方法，也就是程序运行的入口。`main()` 方法由 Java 虚拟机执行，配合上 static 关键字后，可以不用创建对象就可以调用，可以节省不少内存空间。
- `String [] args`：`main()` 方法的参数，类型为 [String](https://javabetter.cn/string/immutable.html) [数组](https://javabetter.cn/array/array.html)，参数名为 args。
- `System.out.println()`：一个 Java 语句，一般情况下是将传递的参数打印到控制台。System 是 java.lang 包中的一个 final 类，该类提供的设施包括标准输入，标准输出和错误输出流等等。out 是 System 类的静态成员字段，类型为 [PrintStream](https://javabetter.cn/io/print.html)，它与主机的标准输出控制台进行映射。println 是 PrintStream 类的一个方法，通过调用 print 方法并添加一个换行符实现的。

“实在记不住也没关系，我们后面还会讲哦（可以跳转的地方都会展开细讲）。”我的话令三妹感到非常开心。

好，接下来再告诉你一点额外的知识点（如果觉得比较难可跳过），三妹。

在 Intellij IDEA 的 terminal 面板中，可以看到对应的 java 源代码文件和编译后的 .class 文件。

可以在对应的文件上右键选择 open in terminal 打开。

![](https://cdn.paicoding.com/stutymore/hello-world-20230408184558.png)

可以通过 pwd 命令查看当前包路径，通过 ls 命令查看包路径下面有哪些文件。

![](https://cdn.paicoding.com/stutymore/hello-world-20230408184256.png)

class 文件在 target 目录下，classes 为 src/main 目录下的 class 文件；test-classes 为 src/test 目录下的 class 文件。

![](https://cdn.paicoding.com/stutymore/hello-world-20230408184835.png)

“二哥，.class 文件和 .java 源代码，它们之间的关系是什么样的呢？”三妹还是挺喜欢学习的嘛，发现的问题都很关键。

“不错不错，都能挖掘到这个点了。”

.java 是源代码，也就是我们开发人员可以看懂的，可以编写的；.class 是字节码文件，是经过 javac 编译后的文件，是交给 [JVM](https://javabetter.cn/jvm/what-is-jvm.html) 执行的文件。

“三妹，这里再顺带给你讲一下，Java 是编译型语言还是解释型语言。”

“好啊，我正要问这个‘编译’到底是怎么回事呢？”

Java 的第一道工序是通过 javac 命令把 Java 源码编译成字节码。

比如说我们可以主动执行 `javac Hello.java` 命令将源代码文件编译为 Hello.class 文件（用 Intellij IDEA 的话，并不需要我们主动去编译「javac」，直接运行就可以自动生成 .class 文件）。

![](https://cdn.paicoding.com/stutymore/hello-world-20230408185202.png)

之后，我们可以通过 java 命令运行字节码（比如说 `java Hello`），此时就有 2 种处理方式了。

- 1、字节码由 JVM 逐条解释执行。
- 2、部分字节码可能由 [JIT（即时编译，戳链接了解](https://javabetter.cn/jvm/jit.html)）编译为机器指令直接执行。

①、逐条解释执行：

逐条解释执行是 Java 虚拟机的基本执行模式。在这种模式下，Java 虚拟机会逐条读取字节码文件中的指令，并将其解释为对应的底层操作。解释执行的优点是实现简单，启动速度较快，但由于每次执行都需要对字节码进行解释，因此执行效率相对较低。

总结一下逐条解释执行的特点：

- 实现简单
- 启动速度较快
- 执行效率较低

②、JIT 即时编译：

为了提高 Java 程序的执行效率，Java 虚拟机引入了即时编译（[JIT，Just-In-Time Compilation](https://javabetter.cn/jvm/jit.html)）技术。在 JIT 模式下，Java 虚拟机会在运行时将频繁执行的字节码编译为本地机器码，这样就可以直接在硬件上运行，而不需要再次解释。这样做的结果是显著提高了程序的执行速度。需要注意的是，JIT 编译器并不会编译所有的字节码，而是根据一定的策略，仅编译被频繁调用的代码段（热点代码）。

总结一下 JIT 即时编译的特点：

- 提高执行效率
- 编译热点代码
- 动态优化

实际上，现代 Java 虚拟机（如 HotSpot）通常会结合这两种执行方式，即解释执行和 JIT 即时编译。在程序运行初期，Java 虚拟机会采用解释执行，以减少启动时间。随着程序的运行，Java 虚拟机会识别出热点代码并使用 JIT 编译器将其编译为本地机器码，从而提高程序的执行效率。这种结合策略称为混合模式。


也就是说，为了跨平台，Java 源代码首先会编译成字节码，字节码不是机器语言，需要 JVM 来解释。

![](https://cdn.paicoding.com/stutymore/hello-world-20230408190024.png)

有了 JVM 这个中间层，Java 的运行效率就没有直接把源代码编译为机器码来得效率更高，这个应该能理解吗，多了中间商嘛。所以为了提高效率，JVM 引入了 JIT 编译器，把一些经常执行的字节码直接搞成机器码。

所以，Java 是解释和编译并存。但通常来说，我们会说“Java 是编译型语言”，尽管这样并不准确，主要是 JIT 是后面才出现的，“先入为主嘛”。

“好的，二哥，我了解了。”

---

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.paicoding.com/tobebetterjavaer/images/gongzhonghao.png)