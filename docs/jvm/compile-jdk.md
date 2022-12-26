---
title: 自己编译JDK
shortTitle: 自己编译JDK
category:
  - Java核心
tag:
  - Java虚拟机
description: Java程序员进阶之路，小白的零基础Java教程，从入门到进阶，自己编译JDK
head:
  - - meta
    - name: keywords
      content: Java,JavaSE,教程,Java程序员进阶之路,jvm,Java虚拟机,JDK
---

# 自己编译JDK


很多小伙伴们做`Java`开发，天天写`Java`代码，肯定离不开`Java`基础环境：`JDK`，毕竟我们写好的`Java`代码也是跑在`JVM`虚拟机上。

一般来说，我们学`Java`之前，第一步就是安装`JDK`环境。这个简单啊，我们一般直接把`JDK`从官网下载下来，安装完成，配个环境变量就可以愉快地使用了。

不过话说回来，对于这个天天使用的东西，我们难道不好奇这玩意儿它到底是怎么由源码编译出来的吗？

带着这个原始的疑问，今天准备大干一场，自己动动呆萌的小手，来编译一个属于自己的`JDK`吧！

## 环境准备

> 首选说在前面的是，编译前的软件版本关系极其重要，自己在踩坑时，所出现的各种奇奇怪怪的问题几乎都和这个有关，后来版本匹配之后，就非常顺利了。

我们来**盘点和梳理**一下编译一个JDK需要哪些环境和工具：

### **1、boot JDK**

我们要想编译`JDK`，首先自己本机必须提前已经安装有一个`JDK`，官方称之为`bootstrap JDK`（或者称为`boot JDK`）。

比如想编译`JDK 8`，那本机必须最起码得有一个`JDK 7`或者更新一点的版本；你想编译`JDK 11`，那就要求本机必须装有`JDK 10`或者`11`。

> 所以鸡生蛋、蛋生鸡又来了...

### **2、Unix环境**

编译`JDK`需要`Unix`环境的支持！

这一点在`Linux`操作系统和`macOS`操作系统上已经天然的保证了，而对于`Windows`兄弟来说稍微麻烦一点，需要通过使用`Cygwin`或者`MinGW/MSYS`这种软件来模拟。

就像官方所说：在`Linux`平台编译`JDK`一般问题最少，容易成功；`macOS`次之；`Windows`上则需要稍微多花点精力，问题可能也多一些。

究其本质原因，还是因为`Windows`毕竟不是一个`Unix-Like`内核的系统，毕竟很多软件的原始编译都离不开`Unix Toolkit`，所以相对肯定要麻烦一些。

### **3、编译器/编译工具链**

`JDK`底层源码（尤其`JVM`虚拟机部分）很多都是`C++/C`写的，所以相关编译器也跑不掉。

一图胜千言，各平台上的编译器支持如下表所示，按平台选择即可：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/compile-jdk-3b66d5b6-272f-47bd-88f7-47146a06ef06.png)


### **4、其他工具**

典型的比如：

*   `Autoconf`：软件源码包的自动配置工具
*   `Make`：编译构建工具
*   `freetype`：一个免费的渲染库，`JDK`图形化部分的代码可能会用它

好，环境盘点就到这里，接下来具体列一下我在编译`JDK 8`和`JDK 11`时分别用到的软件详细版本信息：

**编译JDK 8时：**

*   `操作系统`：macOS 10.11.6
*   `boot JDK`：JDK 1.8.0 (build 1.8.0_201-b09)
*   `Xcode版本`：8.2
*   `编译器`：Version 8.0.0 (at /usr/bin/clang)

**编译JDK 11时：**

*   `操作系统`：macOS 10.15.4
*   `boot JDK`：JDK 11.0.7 (build 11.0.7+8-LTS)
*   `Xcode版本`：11.5
*   `编译器`：Version 11.0.3 (at /usr/bin/clang)

大家在编译时如果过程中有很多问题，大概率少软件没装，或者软件版本不匹配，不要轻易放弃，需要耐心自查一下。

* * *

## 下载JDK源码

下载`JDK`源码其实有两种方式。

### **方式一：通过Mercurial工具下载**

`Mercurial`可以理解为和`Git`一样，是另外一种代码管理工具，安装好之后就有一个`hg`命令可用。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/compile-jdk-cd8a19ba-e9f5-4a4a-a23c-17688f0f459d.png)


而`OpenJDK`的源码已经提前托管到`http://hg.openjdk.java.net/`。

因此，比如下载`JDK 8`，可直接`hg clone`一下就行，和`git clone`一样：

`hg clone [http://hg.openjdk.java.net/jd...](https://link.segmentfault.com/?enc=Snt8gNbYV7nkV3etTe%2FGJw%3D%3D.7IrUNCuc0HOEyvjCiCBOPMEBJ09bjLifieJi0I7iwtuuIeYUdSfCkC9c4D7z9wdq)
`

同理，下载`JDK 11`：

`hg clone [http://hg.openjdk.java.net/jd...](https://link.segmentfault.com/?enc=BnHqAYXzfRcVfPgGgo1yOw%3D%3D.011np6%2FiCLuojl%2FBtvROkTVXr0PSdMYcYpAg2WUIE045BEFIrbCNAD42vWwIUb3d)
`

但是这种方式下载速度不是很快。

### **方式二：直接下载打包好的源码包**

下载地址：`https://jdk.java.net/`

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/compile-jdk-1bbbb1f8-da01-46e1-a793-487a25193c68.png)


选择你想要的版本下载即可。

* * *

### 编译前的自动配置

源码包下载好，放到本地某个目录（建议路径纯英文，避免不必要的麻烦），解压之，然后进入源码根目录，执行：

`sh configure
`

> 当然这里运行的是默认配置项。

这一步会进行一系列的自动配置工作，时间一般很快，最终如果能出现一下提示，那么很幸运，编译前的配置工作就完成了！

这里我给出我自己分别在配置`JDK 11`和`JDK 8`时候完成时的样子：

**配置JDK 8完成：**

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/compile-jdk-27593edc-03e2-4a42-baf3-ed5e5096b3cb.png)


**配置JDK 11完成：**

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/compile-jdk-8526d944-a36e-4d37-93a0-9ad4ad53f927.png)


**注：** 如果这一步出错，大概率是某个软件环境未装，或者即使装了，但版本不匹配，控制台打印日志里一般是会提醒的。

比如我在配置`JDK 8`的时候，就遇到了一个`errof：GCC compiler is required`的问题：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/compile-jdk-2957399f-6451-46dc-a003-76e5159265e9.png)


明明系统里已经有编译器，但还是报这个错误。通过后来修改 `jdk源码根目录/common/autoconf/generated-configure.sh`文件，将相关的两行代码注释后就配置通过了

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/compile-jdk-ffa10d36-3a77-48aa-ae0c-d3daf67f9a19.png)


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/compile-jdk-a6f6e416-639e-4706-8b40-6152eb3cf85d.png)


配置完成，接下来开始执行真正的编译动作了！

* * *

## 真正的编译动作

我们这里进行的是全量编译，直接在我们下载的`JDK`源码根目录下执行如下命令即可：

`make all
`

这一步编译需要一点时间，耐心等待一下即可。编译过程如果有错误，会终止编译，如果能看到如下两个画面，那么则恭喜你，自己编译`JDK`源码就已经通过了，可以搞一杯咖啡庆祝一下了。

**JDK 8编译完成：**

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/compile-jdk-89020f5a-0909-4c57-8c88-f655293a42a4.png)


**JDK 11编译完成：**

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/compile-jdk-993fac94-2473-4f3b-9737-959510d2fe98.png)


从两张图的对比可以看出，编译`JDK 8`和`JDK 11`完成时在输出上还是有区别的。时间上的区别很大程度上来源于`JDK 11`的编译机配置要高不少。

* * *

## 验证成果

`JDK`源码编译完成之后肯定会产生和输出很多产物，这也是我们所迫不及待想看到的。

由于`JDK 8`和`JDK 11`的源码包组织结构并不一样，所以输出东西的内容和位置也有区别。我们一一来盘点一下。

### **1、JDK 8的编译输出**

编译完成，`build`目录下会生成一个`macosx-x86_64-normal-server-release`目录，所有的编译成果均位于其中。

首先，编译出来的`Java`可执行程序可以在如下目录里找到：

`jdk源码根目录/build/macosx-x86_64-normal-server-release/jdk/bin`

进入该目录后，可以输入`./java -version`命令验证：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/compile-jdk-f02dff40-f27e-476c-998b-bd6cdb5d3559.png)


其次，编译生成的成品`JDK`套装，可以在目录

`jdk源码根目录/build/macosx-x86_64-normal-server-release/images
`

下找到，如图所示：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/compile-jdk-1c781d34-776e-4acc-8d2b-b34bc59fda61.png)


其中：

*   `j2sdk-image`：编译生成的JDK
*   `j2re-image`：编译生成的JRE

进入`j2sdk-image`目录会发现，里面的内容和我们平时从网络上下载的成品`JDK`内容一致。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/compile-jdk-7b7f147e-58c9-4eb5-b407-b8984cd72e1d.png)


### **2、JDK 11的编译输出**

> JDK 11的源码目录组织方式和JDK 8本身就有区别，编译生成的产物和上面编译JDK 8的输出有一定区别，但也不大。

`JDK 11`编译完成，同样在`build`目录下会生成一个`macosx-x86_64-normal-server-release`目录，所有的编译成果均位于其中。

同样编译出来的Java可执行程序可以在目录

`JDK源码根目录/build/macosx-x86_64-normal-server-release/jdk/bin`

下看到，进入该目录后，也可以输入`./java -version`命令验证：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/compile-jdk-f9b55425-f308-44e8-8812-ac59b2707c81.png)


其次，编译生成的成品`JDK 11`套装，可以在目录

`JDK源码根目录/build/macosx-x86_64-normal-server-release/images
`

下找到，如图所示：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/compile-jdk-4e96858f-f681-4498-b1c4-282d317a6a32.png)


其中`jdk`目录就是编译生成的成品`JDK 11`套装。

* * *

## 使用自己编译的JDK

既然我们已经动手编译出了`JDK`成品，接下来我们得用上哇。

新建一个最最基本的`Java`工程，比如命名为`JdkTest`，目的是把我们自己编译出的`JDK`给用上。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/compile-jdk-2cf54b29-9b7e-46b2-8cde-4c36960aa09b.png)


我们点开`Project Structure`，选到`SDKs`选项，新添加上自己刚刚编译生成的JDK，并选为项目的JDK，看看是否能正常工作

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/compile-jdk-ad8023d0-fbb7-48b1-856e-a8818677a0a5.png)


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/compile-jdk-b8d87f09-6178-44c7-9572-a2852e81318d.png)


点击确定之后，我们运行之：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/compile-jdk-3164cf31-8078-46d7-bee0-22e05b0c08de.png)


可以看到我们自己编译出的JDK已经用上了。

* * *

## 关联JDK源码并修改

我们继续在上一步`JdkTest`项目的`Project Structure` → `SDKs`里将`JDK`源码关联到自行下载的JDK源码路径上：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/compile-jdk-129ede68-c368-461e-92d6-38a8e5dee344.png)


这样方便我们对自己下载的`JDK源码`进行**阅读**、**调试**、**修改**、以及在源码里随意**做笔记**和**加注释**。

举个最简单的例子，比如我们打开`System.out.println()`这个函数的底层源码：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/compile-jdk-c406b2a2-208a-4a54-a869-b3f526e93ccd.png)


我们随便给它修改一下，加两行简单的标记，像这样：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/compile-jdk-2a46b215-04e5-458a-b475-4dc31d7fe326.png)


为了使我们新加的代码行生效，我们必须要重新去JDK源码的根目录中再次执行 `make images`重新编译生成JDK方可生效：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/compile-jdk-fd3cf88d-007e-4615-99b5-a3499c35ef40.png)


因为之前已经全量编译过了，所以再次`make`的时候增量编译一般很快。

重新编译之后，我们再次运行`JdkTest`项目，就可以看到改动的效果了：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/compile-jdk-33dc0de6-2690-4ba2-9fe7-0e450c44c07b.png)


* * *

## 多行注释的问题

记得之前搭建[《JDK源码阅读环境》](https://link.segmentfault.com/?enc=JrtwTM%2BhTi%2B7DiRtBYeZSQ%3D%3D.T2U2BwPhK3iqeNk%2B%2BMuGttrqlD2zy9v1C%2BqYPvIYEvcvkTe1xyPrnnb%2FdaTGkBqY)时，大家可能发现了一个问题：阅读源码嘛，给源代码做点注释或笔记很常见！但那时候有个问题就是做注释时**不可改变代码的行结构**（只能行尾注释，不能跨行注释），否则debug调试时会出现**行号错位**的问题。

原因很简单，因为我们虽然做了源代码目录的映射，但是实际支撑运行的`JDK`还是预先安装好的那个JDK环境，并不是根据我们修改后的源码来重新编译构建的，所以看到这里，解决这个问题就很简单，就像上面一样自行编译一下`JDK`即可。

实际在实验时，还有一个很典型的问题是，当添加了多行的中文注释后，再编译居然会报错！

比如，还是以上面例子中最简单的`System.out.println()`源码为例，我们添加几行中文注释：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/compile-jdk-d6a44833-b908-4824-8862-1679bfdddfa3.png)


这时候我们去JDK源码目录下编译会发现满屏类似这样的报错：

> 错误: 编码 ascii 的不可映射字符

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/compile-jdk-ad0ca5a3-36c7-477d-bd58-d6731a87d762.png)


顿时有点懵，毕竟仅仅是加了几行注释。对于我们来说，源码里写点多行的中文注释基本是**刚需**，然而编译竟会报错，这还能不能让人愉快的玩耍了... 当时后背有点发凉。

实不相瞒，就这个问题排查了一段时间，熬到了很晚。最终折腾了一番，通过如下这种方式解决了，顺便分享给小伙伴们，大家如果遇到了这个问题，可以参考着解决一下。

因为从控制台的报错可以很明显的看出，肯定是字符编码相关的问题导致的，而且都指向了`ascii`这种编码方式。

于是将JDK的源码从根目录导入了Vs Code，然后全目录查找`encoding ascii`相关的内容，看看有没有什么端倪，结果发现

`jdk源码根目录/make/common/SetupJavaCompilers.gmk`文件中有两处指定了`ascii`相关的编码方式：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/compile-jdk-a86933af-f6d5-4d45-b4ca-33069a212c52.png)


于是尝试将这两处`-encoding ascii`的均替换成`-encoding utf-8`：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/compile-jdk-c8117faf-d027-48d3-869b-32d0e98e8372.png)


然后再次执行`make images`编译，编译顺利通过！


至此大功告成！

这样后面不管是**阅读**、**调试**还是**定制**`JDK`源码都非常方便了。

---

引用链接：[https://segmentfault.com/a/1190000023251649](https://segmentfault.com/a/1190000023251649)

----

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

