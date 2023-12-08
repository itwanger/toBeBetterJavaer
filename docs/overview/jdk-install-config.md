---
title: Windows和macOS下安装JDK教程：原生安装与包管理器（高级）
shortTitle: 安装JDK
category:
  - Java核心
tag:
  - Java概述
description: 本文详细介绍了在Windows和macOS平台上安装JDK的两种方法：使用原始安装包手动配置环境变量和通过包管理器（如Chocolatey和Homebrew）一键式安装。我们将对比这两种方法的优缺点，帮助您选择最适合自己的JDK安装方式。
head:
  - - meta
    - name: keywords
      content: JDK安装, Windows, macOS, Chocolatey, Homebrew, 环境变量, Java开发环境, 包管理器
---

# 2.2 安装 JDK

因为 Java 程序必须运行在 JVM 之上，所以我们 Java 程序员在学习 Java 之前，要做的第一件事情就是安装 JDK。

什么？

又是 JVM 又是 JDK 的，能不能讲清楚一点。

要扯清楚这两者之间的关系，就必须得再扯出另外一个名词 JRE，哈哈哈。

它们之间的关系可以用这幅图来表示。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/jdk-install-config-6f6fdb4a-7a44-4e76-b4ea-71c070a5b220.png)

真的是人生无常，大肠包小肠啊。

### 01、JVM、JRE、JDK 有什么关系

JDK（Java Development Kit）是用于开发 Java 应用程序的软件环境。里面包含运行时环境（JRE）和其他 Java 开发所需的工具，比如说解释器（java）、编译器（javac）、文档生成器（javadoc）等等。

JRE（Java Runtime Environment）是用于运行 Java 应用程序的软件环境。也就是说，如果只想运行 Java 程序而不需要开发 Java 程序的话，只需要安装 JRE 就可以了。

JVM (Java Virtual Machine) ，也就是 Java 虚拟机，由一套字节码指令集、一组寄存器、一个栈、一个垃圾回收堆和一个存储方法域等组成，屏蔽了不同操作系统（macOS、Windows、Linux）的差异性，使得 Java 能够“一次编译，到处运行”。

比如说我用 macOS 生成了一个 jar 包（里面是打包好的字节码——可以在 Java 虚拟机上运行的目标代码），可以丢给 Windows 用户直接运行，也可以直接上传到 Linux 服务器运行。

这是 Oracle 官方给出的 JDK、JRE、JVM 关系图。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/jdk-install-config-cbc87f87-6351-4356-936b-77850cc682d5.png)

那针对不同的操作系统，官方也提供了不同的 JDK 安装包。

如果你用百度去搜，嗯。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/jdk-install-config-31e739ff-b69f-47b6-9db4-8843cd8a716a.png)

总之，是把官方给吃了。

如果你用[谷歌](https://javabetter.cn/nice-article/itmind/)去搜“JDK”关键字，能搜到官方的下载链接。

> [https://www.oracle.com/java/technologies/downloads/](https://www.oracle.com/java/technologies/downloads/)

好，如果你想安装 JDK ，到官方下载。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/jdk-install-config-e5b91a70-2a23-4ebd-896a-5ff19f0075b1.png)

最新版是 JDK 18（短期版本），上一个长期支持版本是 JDK 17，推荐安装 JDK 8，哈哈哈哈，它升任它升，我用 Java 8。往下翻就能找到了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/jdk-install-config-a32db267-febe-4852-b528-deaacb43247d.png)


根据你的操作系统下载对应的安装包，分 Windows（exe 后缀）和 macOS（dmg 后缀）。

![](https://cdn.tobebetterjavaer.com/stutymore/jdk-install-config-20230408164612.png)

下载后双击安装，然后配置环境变量就 OK 了。

### 02、Windows 安装 JDK

安装步骤就省略了，傻瓜式下一步就好。这里只说一下环境变量的配置，在电脑桌面右键点击 “此电脑”的“属性”选项。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/jdk-install-config-a0a78e05-886f-425a-8ba9-d27314f7a21c.png)

选择“高级系统设置”选项

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/jdk-install-config-fdc94ada-ae44-4a93-ba0d-92860119ad9c.png)

点击下面的“环境变量”选项

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/jdk-install-config-919eb8f0-9869-450c-a6cb-50318dd3e2e5.png)

点击“系统变量”下面的”新建“选项

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/jdk-install-config-a4c05c3e-f305-4d6a-96d2-fe345e980c3b.png)

在”变量名“处填上”Java_Home“，”变量值“为 JDK 安装路径，比如说”`D:\Program Files\Java\jdk1.8.0_91`“

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/jdk-install-config-26be5706-036d-4fae-99fa-d5f14b7380d4.png)

参考链接：https://www.cnblogs.com/cnwutianhao/p/5487758.html

再说一种高级点的安装方法。

Windows 用户建议先安装 [Chocolatey](https://javabetter.cn/gongju/choco.html)，这是一个 Windows 下的命令行软件管理器，可以方便开发者像在 Linux 下使用 yum 命令来安装软件，或者像在 macOS 下使用 brew 命令来安装软件，非常酷炫。

安装完成后，直接执行 `choco install jdk8` 就可以安装 JDK 8 了，并且会自动将 Java 加入到环境变量中，不用再去「我的电脑」「环境变量」中新建 JAVA_HOME 并复制 JDK 安装路径配置 PATH 变量了

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/choco-80a6ced8-c25d-4371-8096-b95be48af768)

### 03、macOS 安装 JDK

macOS 用户建议先安装 [Homebrew](https://javabetter.cn/gongju/brew.html)，这是一个 macOS 下的命令行软件管理器，可以通过一行命令安装 Apple（或 Linux 系统）没有预装但你需要的软件。

安装完成后，直接执行 `brew install openjdk@8` 就可以安装 JDK 8 了。

如果需要在 macOS 安装多个版本的 JDK ，比如说 JDK 17，多个版本的 JDK 怎么管理呢？可以安装一下 [jEnv](https://www.jenv.be/)，一个帮助我们管理 JAVA_HOME 的命令行工具，在 GitHub 上已经收获 4.3k 的 star。

安装：

```
brew install jenv
```

在 zsh 中配置 jenv：

```
export PATH="$HOME/.jenv/bin:$PATH"
eval "$(jenv init -)"
```

通过 `vim ~/.zshrc` 把以上内容添加到配置文件中并保存（source 下可以立即生效）

![](https://cdn.tobebetterjavaer.com/stutymore/jdk-install-config-20230408165518.png)

之后通过以下方式添加 JDK 到 jenv 中：

```
jenv add /usr/local/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home/
```

JDK 的安装路径可以通过两种方法 get 到。

一般情况下，JDK 的默认安装路径为 `/Library/Java/JavaVirtualMachines/`，进入该目录就可以看到。

![](https://cdn.tobebetterjavaer.com/stutymore/jdk-install-config-20230408173945.png)

还可以通过以下命令获取当前安装的 JDK 路径。

```
/usr/libexec/java_home
```

![](https://cdn.tobebetterjavaer.com/stutymore/jdk-install-config-20230408174048.png)

添加 JDK 的路径后可以通过 `jenv versions` 查看所有添加到 jenv 进行管理的 JDK 版本。

![](https://cdn.tobebetterjavaer.com/stutymore/jdk-install-config-20230408174158.png)

带 `*` 的表示当前默认的 JDK 版本。

可以通过 `jenv global xxx` 切换全局的 JDK 版本。

```
jenv global 17
```

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/brew-cc01fad8-53e9-4474-8923-08e97ac7090a.png)

是不是贼方便？再也不用整这 `echo 'export PATH="/usr/local/opt/openjdk@17/bin:$PATH"' >> ~/.zshrc` 玩意添加 JDK 到 PATH 环境变量了！

想用哪个 JDK 版本可以随时切换。

爽，实在是爽！

---

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
