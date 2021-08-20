## JDK 与 JRE 之间的区别是什么？

“二哥，之前的文章里提到 JDK 与 JRE，说实在的，这两个概念把我搞得晕乎乎的，你能再给我普及一下吗？”三妹咪了一口麦香可可奶茶后对我说。

“三妹，不要担心，二哥这篇文章一定会让你把它们搞得一清二楚。确实有不少初学的小伙伴对这两个概念很困惑，我当年也困惑了很久。”说完最后这句话，我脸上忍不住泛起了一阵羞涩的红晕。

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

“好的，二哥，能把你的服务器账号密码给我一下吗，我想上去测试一把。”三妹似乎对未来充满了希望，这正是我想看到的。

“没问题，随便倒腾。”