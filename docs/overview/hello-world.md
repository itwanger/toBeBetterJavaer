---
category:
  - Java核心
tag:
  - Java
date: 2019-01-01
---

# 第一个Java程序：Hello World

## 一、安装集成开发环境Intellij IDEA

IntelliJ IDEA 简称 IDEA，是业界公认为最好的 Java 集成开发工具，尤其是在代码自动提示、代码重构、代码版本管理、单元测试、代码分析等方面有着亮眼的发挥。

IDEA 产于捷克，开发人员以严谨著称的东欧程序员为主，分为社区版和付费版两个版本。我们在学习阶段，社区版就足够用了。

回想起我最初学 Java 的时候，老师要求我们在记事本上敲代码，在命令行中编译和执行 Java 代码，搞得全班三分之二的同学都做好了放弃学习 Java 的打算。

鉴于此，我强烈推荐大家使用集成开发工具，比如说 IntelliJ IDEA 来学习。

IDEA 分为社区版和付费版两个版本。

### 01、下载 IDEA

IntelliJ IDEA 的官方下载地址为：[https://www.jetbrains.com/idea/download/](https://www.jetbrains.com/idea/download)

![](https://cdn.jsdelivr.net/gh/itwanger/itwanger.github.io/assets/images/2019/11/java-idea-community-1.png)


UItimate 为付费版，可以免费试用，主要针对的是 Web 和企业开发用户；Community 为免费版，可以免费使用，主要针对的是 Java 初学者和安卓开发用户。

功能上的差别如下图所示。

![](https://cdn.jsdelivr.net/gh/itwanger/itwanger.github.io/assets/images/2019/11/java-idea-community-2.png)

本篇教程主要针对的是 Java 初学者，所以选择免费版为例，点击「Download」进行下载。

稍等一分钟时间，大概 580M。

### 02、安装 IDEA

双击运行 IDEA 安装程序，一步步傻瓜式的下一步就行了。

![](https://cdn.jsdelivr.net/gh/itwanger/itwanger.github.io/assets/images/2019/11/java-idea-community-3.png)


![](https://cdn.jsdelivr.net/gh/itwanger/itwanger.github.io/assets/images/2019/11/java-idea-community-4.png)


![](https://cdn.jsdelivr.net/gh/itwanger/itwanger.github.io/assets/images/2019/11/java-idea-community-5.png)

为了方便启动 IDEA，可以勾选【64-bit launcher】复选框。为了关联 Java 源文件，可以勾选【.java】复选框。

![](https://cdn.jsdelivr.net/gh/itwanger/itwanger.github.io/assets/images/2019/11/java-idea-community-6.png)

点击【Install】后，需要静静地等待一会，大概一分钟的时间，趁机休息一下眼睛。

![](https://cdn.jsdelivr.net/gh/itwanger/itwanger.github.io/assets/images/2019/11/java-idea-community-7.png)

安装完成后的界面如下图所示。

![](https://cdn.jsdelivr.net/gh/itwanger/itwanger.github.io/assets/images/2019/11/java-idea-community-8.png)

### 03、启动 IDEA

回到桌面，双击运行 IDEA 的快捷方式，启动 IDEA。

![](https://cdn.jsdelivr.net/gh/itwanger/itwanger.github.io/assets/images/2019/11/java-idea-community-9.png)

假装阅读完条款后，勾选同意复选框，点击【Continue】

![](https://cdn.jsdelivr.net/gh/itwanger/itwanger.github.io/assets/images/2019/11/java-idea-community-10.png)

如果想要帮助 IDEA 收集改进信息，可以点击【Send Usage Statistics】；否则点击【Don't send】。

![](https://cdn.jsdelivr.net/gh/itwanger/itwanger.github.io/assets/images/2019/11/java-idea-community-11.png)


到此，Intellij IDEA 的安装就完成了，很简单。

## 二、Hello World

第一个 Java 程序非常简单，代码如下：

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

IDEA 会自动保存，在代码编辑面板中右键，在弹出的菜单中选择「Run 'HelloWorld.main()'」，如下图所示：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/four-01.png)

等代码编译结束后，就可以在 Run 面板里看到下面的内容：

```
三妹，少看手机少打游戏，好好学，美美哒。
```

“二哥，上面这段代码的输出结果虽然令我非常开心，但是有好多生疏的关键字令我感到困惑，能给我解释一下吗？”

“当然没问题啊。”

- class 关键字：用于在 Java 中声明一个类。

- public 关键字：一个表示可见性的访问修饰符。

- static 关键字：我们可以用它来声明任何一个方法，被 static 修饰后的方法称之为静态方法。静态方法不需要为其创建对象就能调用。

- void 关键字：表示该方法不返回任何值。

- main 关键字：表示该方法为主方法，也就是程序运行的入口。`main()` 方法由 Java 虚拟机执行，配合上 static 关键字后，可以不用创建对象就可以调用，可以节省不少内存空间。

- `String [] args`：`main()` 方法的参数，类型为 String 数组，参数名为 args。

- `System.out.println()`：一个 Java 语句，一般情况下是将传递的参数打印到控制台。System 是 java.lang 包中的一个 final 类，该类提供的设施包括标准输入，标准输出和错误输出流等等。out 是 System 类的静态成员字段，类型为 PrintStream，它与主机的标准输出控制台进行映射。println 是 PrintStream 类的一个方法，通过调用 print 方法并添加一个换行符实现的。

## 三、JDK和JRE有什么区别？

### 01、JDK

JDK 是 Java Development Kit 的首字母缩写，是提供给 Java 程序员的开发工具包，换句话说，没有 JDK，Java 程序员就无法使用 Java 语言编写 Java 程序。也就是说，JDK 是用于开发 Java 程序的最小环境。

想要成为一名 Java 程序员，首先就需要在电脑上安装 JDK。当然了，新版的 Intellij IDEA（公认最好用的集成开发环境）已经支持直接下载 JDK 了。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/six-01.png)

并且支持下载不同版本的 JDK，除了 Oracle 的 OpenJDK，还有社区维护版 AdoptOpenJDK，里面包含了目前使用范围最广的 HotSpot 虚拟机。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/six-02.png)

如果下载比较慢的话，可以直接在 AdoptOpenJDK 官网上下载。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/six-03.png)

如果还是比较慢的话，通过 Oracle 官网下载吧！

>https://www.oracle.com/java/technologies/javase-jdk11-downloads.html


JDK 安装成功后，就可以编写 Java 代码了，小伙伴们可以参照上一篇文章《[Hello World](https://mp.weixin.qq.com/s/GYDFndO0Q1Nqzcc_Te61gw)》。

JDK 包含了 JRE，同时还包含了编译 Java 源码的编译器 javac，以及其他的一些重要工具：

- keytool：用于操作 keystore 密钥；
- javap：class 类文件的最基础的反编译器；
- jstack：用于打印 Java 线程栈踪迹的工具；
- jconsole：用于监视 Java 程序的工具；
- jhat：用于 Java 堆分析的工具
- jar：用于打包 Java 程序的工具；
- javadoc：用于生成 Java 文档的工具；

### 02、JRE

JRE 是 Java Runtime Environment 的首字母缩写，是提供给 Java 程序运行的最小环境，换句话说，没有 JRE，Java 程序就无法运行。

Java 程序运行的正式环境一般会选择 Linux 服务器，因为更安全、更高效、更稳定。我们只需要在 Linux 服务器上安装 JRE 就可以运行 Java 程序，而不必安装 JDK，因为我们不需要在服务器上编译和调试 Java 源代码。

刚好我有一台闲置的阿里云服务器，这里就给小伙伴们演示一下 JRE 的安装过程。

第一步：使用以下命令列出服务器上可以安装的 Java 环境：

>yum list java*

可以看到有这么一些（只列出 Java 11 的部分——最近一个 LTS 版本）：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/six-04.png)

其中 JRE 为 java-11-openjdk.x86_64，JDK 为 java-11-openjdk-devel.x86_64。

第二步，使用以下命令安装 JRE：

>yum install java-11-openjdk.x86_64

第三步，使用以下命令测试是否安装成功：

>java -version

如果出现以下结果，则表明安装成功：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/six-05.png)

由于 JRE 中不包含 javac，所以 `javac -version` 的结果如下所示：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/six-06.png)

那既然服务器上的 JRE 环境已经 OK 了，那我们就把之前的“Hello World”程序打成 jar 上传过去，让它跑起来。

第一步，Maven clean（对项目清理）：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/six-07.png)

第二步，Maven package（对项目打包）：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/six-08.png)

可以在 Run 面板中看到以下信息：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/six-09.png)

说明项目打包成功了。

第三步，使用 FileZilla 工具将 jar 包上传到服务器指定目录。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/six-10.png)

第四步，使用 iTerm2 工具连接服务器。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/six-11.png)

第五步，执行以下命令：

>java -cp TechSister-1.0-SNAPSHOT.jar com.itwanger.five.HelloWorld

可以看到以下结果：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/six-12.png)

“搞定了，三妹，今天我们就学到这吧。”转动了一下僵硬的脖子后，我对三妹说，“开发环境需要安装 JDK，因为既需要编写源代码，还需要打包和测试；生产环境只需要安装 JRE，因为只需要运行编译打包好的 jar 包即可。”

<img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png" width="700px">