### 1.什么是 JVM?

JVM——Java 虚拟机，它是 Java 实现平台无关性的基石。

Java 程序运行的时候，编译器将 Java 文件编译成平台无关的 Java 字节码文件（.class）,接下来对应平台 JVM 对字节码文件进行解释，翻译成对应平台匹配的机器指令并运行。

![Java语言编译运行](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/jvm/sanfene/what-is-jvm-1.png)

同时 JVM 也是一个跨语言的平台，和语言无关，只和 class 的文件格式关联，任何语言，只要能翻译成符合规范的字节码文件，都能被 JVM 运行。

![JVM跨语言](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/jvm/sanfene/what-is-jvm-2.png)


> [!ATTENTION]
>  图文详解 50 道Java虚拟机高频面试题，这次面试，一定吊打面试官，整理：沉默王二，戳[转载链接](https://mp.weixin.qq.com/s/bHhqhl8mH3OAPt3EkaVc8Q)，作者：三分恶，戳[原文链接](https://mp.weixin.qq.com/s/XYsEJyIo46jXhHE1sOR_0Q)。