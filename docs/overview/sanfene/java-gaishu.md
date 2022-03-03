### 1.什么是 Java？

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/sanfene/java-gaishu-1.png)

PS：碎怂 Java，有啥好介绍的。哦，面试啊。

Java 是一门面向对象的编程语言，不仅吸收了 C++语言的各种优点，还摒弃了 C++里难以理解的多继承、指针等概念，因此 Java 语言具有功能强大和简单易用两个特征。Java 语言作为静态面向对象编程语言的优秀代表，极好地实现了面向对象理论，允许程序员以优雅的思维方式进行复杂的编程 。

### 2.Java 语言有哪些特点？

Java 语言有很多优秀（可吹）的特点，以下几个是比较突出的：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/sanfene/java-gaishu-2.png)

- 面向对象（封装，继承，多态）；
- 平台无关性，平台无关性的具体表现在于，Java 是“一次编写，到处运行（Write Once，Run any Where）”的语言，因此采用 Java 语言编写的程序具有很好的可移植性，而保证这一点的正是 Java 的虚拟机机制。在引入虚拟机之后，Java 语言在不同的平台上运行不需要重新编译。
- 支持多线程。C++ 语言没有内置的多线程机制，因此必须调用操作系统的多线程功能来进行多线程程序设计，而 Java 语言却提供了多线程支持；
- 编译与解释并存；

### 3.JVM、JDK 和 JRE 有什么区别？

**JVM**：Java Virtual Machine，Java 虚拟机，Java 程序运行在 Java 虚拟机上。针对不同系统的实现（Windows，Linux，macOS）不同的 JVM，因此 Java 语言可以实现跨平台。

**JRE**： Java 运⾏时环境。它是运⾏已编译 Java 程序所需的所有内容的集合，包括 Java 虚拟机（JVM），Java 类库，Java 命令和其他的⼀些基础构件。但是，它不能⽤于创建新程序。

**JDK**: Java Development Kit，它是功能⻬全的 Java SDK。它拥有 JRE 所拥有的⼀切，还有编译器（javac）和⼯具（如 javadoc 和 jdb）。它能够创建和编译程序。

简单来说，JDK 包含 JRE，JRE 包含 JVM。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/sanfene/java-gaishu-3.png)

### 4.说说什么是跨平台性？原理是什么

所谓跨平台性，是指 Java 语言编写的程序，一次编译后，可以在多个系统平台上运行。

实现原理：Java 程序是通过 Java 虚拟机在系统平台上运行的，只要该系统可以安装相应的 Java 虚拟机，该系统就可以运行 java 程序。

### 5.什么是字节码？采用字节码的好处是什么?

所谓的字节码，就是 Java 程序经过编译之类产生的.class 文件，字节码能够被虚拟机识别，从而实现 Java 程序的跨平台性。

**Java** 程序从源代码到运行主要有三步：

- **编译**：将我们的代码（.java）编译成虚拟机可以识别理解的字节码(.class)
- **解释**：虚拟机执行 Java 字节码，将字节码翻译成机器能识别的机器码
- **执行**：对应的机器执行二进制机器码

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/sanfene/java-gaishu-4.png)

只需要把 Java 程序编译成 Java 虚拟机能识别的 Java 字节码，不同的平台安装对应的 Java 虚拟机，这样就可以可以实现 Java 语言的平台无关性。

### 6.为什么说 Java 语言“编译与解释并存”？

高级编程语言按照程序的执行方式分为**编译型**和**解释型**两种。

简单来说，编译型语言是指编译器针对特定的操作系统将源代码一次性翻译成可被该平台执行的机器码；解释型语言是指解释器对源程序逐行解释成特定平台的机器码并立即执行。

比如，你想读一本外国的小说，你可以找一个翻译人员帮助你翻译，有两种选择方式，你可以先等翻译人员将全本的小说（也就是源码）都翻译成汉语，再去阅读，也可以让翻译人员翻译一段，你在旁边阅读一段，慢慢把书读完。

Java 语言既具有编译型语言的特征，也具有解释型语言的特征，因为 Java 程序要经过先编译，后解释两个步骤，由 Java 编写的程序需要先经过编译步骤，生成字节码（`\*.class` 文件），这种字节码必须再经过 JVM，解释成操作系统能识别的机器码，在由操作系统执行。因此，我们可以认为 Java 语言**编译**与**解释**并存。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/sanfene/java-gaishu-5.png)

> 图文详解 53 道Java基础面试高频题，整理：沉默王二，戳[转载链接](https://mp.weixin.qq.com/s/t7EYyF0VGEg1rAZut9dwSw)，作者：三分恶，戳[原文链接](https://mp.weixin.qq.com/s/M-6RSRcRd3X93cR7VXpanw)。
