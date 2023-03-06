---
title: 手把手将你用 C语言实现 Java native 方法
shortTitle: 用C语言实现本地方法
description: Java程序员进阶之路，小白的零基础Java教程，手把手将你用 C语言实现 Java native 方法
category:
  - Java 核心
tag:
  - 面向对象编程
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,java native,java本地方法,java native method
---

# 5.5 Java中的本地方法

“三妹，之前我们学习了 Java 中的基本方法，其实 Java 还有一种方法，本地方法，或者叫 native 方法，它与之前的方法有很大的不同。”我放下手中的手机，扭过脸来对三妹说。

“听起来挺有意思的。”三妹很期待。

“我会教你用 C语言实现一个 native 方法。”我继续说到，“C语言是另外一种编程语言，你可以点这个[链接](https://tobebetterjavaer.com/xuexiluxian/c.html)去了解和学习。让我们开始吧”

类似 Thread 类中的 `private native start0()` 方法；

又或者 Object.class 类中的 getClass() 方法、hashCode()方法、clone() 方法，其中方法签名如下：

```java
public final native Class<?> getClass();
public native int hashCode();
protected native Object clone() throws CloneNotSupportedException;
```

也就是用【native】关键词修饰的方法，多数情况下不需要用 Java 语言实现。

“二哥，为什么要用 native 来修饰方法呢，这样做有什么用？”三妹很乖，但这个问题也问的很掷地有声。

“好的，三妹，我们一步步来扒拉”。

### **1、JNI：Java Native Interface**

在介绍 native 之前，我们先了解什么是 JNI。

一般情况下，我们完全可以使用 Java 语言编写程序，但某些情况下，Java 可能满足不了需求，或者不能更好的满足需求，比如：

- ①、标准的 Java 类库不支持。
- ②、我们已经用另一种语言，比如说 C/C++ 编写了一个类库，如何用 Java 代码调用呢？
- ③、某些运行次数特别多的方法，为了加快性能，需要用更接近硬件的语言（比如汇编）编写。

上面这三种需求，说到底就是如何用 Java 代码调用不同语言编写的代码。那么 JNI 应运而生了。

从 Java 1.1 开始，Java Native Interface (JNI)标准就成为 Java 平台的一部分，它允许 Java 代码和其他语言编写的代码进行交互。

JNI 一开始是为了本地已编译语言，尤其是 C 和 C++而设计的，但是它并不妨碍你使用其他语言，只要调用约定受支持就可以了。使用 Java 与本地已编译的代码交互，通常会丧失平台可移植性，但是，有些情况下这样做是可以接受的，甚至是必须的，比如，使用一些旧的库，与硬件、操作系统进行交互，或者为了提高程序的性能。JNI 标准至少保证本地代码能工作能在任何 Java 虚拟机实现下。

![](https://files.mdnice.com/user/3903/2673e6dd-5c85-4d17-b8a1-b6429706cde0.png)

通过 JNI，我们就可以通过 Java 程序（代码）调用到操作系统相关的技术实现的库函数，从而与其他技术和系统交互；同时其他技术和系统也可以通过 JNI 提供的相应原生接口调用 Java 应用系统内部实现的功能。

“二哥，等一下，Java 不是跨平台的吗？如果用 JNI，那么程序不就失去了跨平台的优点？”不得不说，三妹这个问题起到好处。

“确实是这样的。”我掐灭了中指和无名指之间的烟头，继续娓娓道来。

JNI 的缺点：

- ①、程序不再跨平台。要想跨平台，必须在不同的系统环境下重新编译本地语言部分。
- ②、程序不再是绝对安全的，本地代码的不当使用可能导致整个程序崩溃。一个通用规则是，你应该让本地方法集中在少数几个类当中。这样就降低了 Java 和 C/C++ 之间的耦合性。

目前来讲使用 JNI 的缺点相对于优点还是可以接受的，可能后面随着 Java 的技术发展，我们不在需要 JNI，但是目前 JDK 还是一直提供了对 JNI 标准的支持。

### **2、用 C 语言编写程序本地方法**

“上面讲解了什么是 JNI，接下来我们来写个例子：如何用 Java 代码调用本地的 C 程序。”我扭头对三妹说，“你注意📢看。”

>官方文档如下：[https://docs.oracle.com/javase/8/docs/technotes/guides/jni/spec/jniTOC.html](https://docs.oracle.com/javase/8/docs/technotes/guides/jni/spec/jniTOC.html)

步骤如下： 　　 

①、编写带有 native 方法的 Java 类，生成.java 文件；

②、使用 javac 命令编译所编写的 Java 类，生成.class 文件；

③、使用 javah -jni java 类名 生成扩展名为 h 的头文件，也即生成 .h 文件；

④、使用 C/C++（或者其他编程想语言）实现本地方法，创建 .h 文件的实现，也就是创建 .cpp 文件实现.h 文件中的方法；

⑤、将 C/C++ 编写的文件生成动态连接库，生成 dll 文件；

下面我们通过一个 HelloWorld 程序的调用来完成这几个步骤。

#### 01）编写带有 native 方法的 Java 类 HelloJNI.java

在 `/Users/itwanger/Documents/Github/javabetter/testjni` 目录下创建 HelloJNI.java 文件，内容如下所示。

```java
public class HelloJNI {
    static {
        System.loadLibrary("hello"); // 加载名为 libhello.dylib 的动态链接库
    }

    // 定义本地方法
    private native void helloJNI();

    public static void main(String[] args) {
        new HelloJNI().helloJNI(); // 调用本地方法
    }
}
```

**PS：后面执行的命令都将在 testjni 的目录下**。

解释一下这段代码：

`private native void helloJNI()`：用 native 声明的方法告知 JVM 调用该方法在外部定义，也就是我们会用 C 语言去实现。

`System.loadLibrary("hello")`：加载动态库，参数 hello 是动态库的名字。我们可以这样理解：程序中的方法 helloJNI() 在程序中没有实现，但是我们下面要调用这个方法，怎么办呢？

我们就需要对这个方法进行初始化，所以用了 [static 代码块进行初始化](https://tobebetterjavaer.com/oo/static.html)，后面会讲到。

#### 2）编译 HelloJNI.java

在命令行通过 `javac HelloJNI.java` 来编译源代码。

![](https://files.mdnice.com/user/3903/693f96cb-132a-4958-b155-1e3685723621.png)

#### 03）使用 `javah -jni HelloJNI` 生成扩展名为 h 的头文件

![](https://files.mdnice.com/user/3903/0d99c05e-4bf6-44e8-916a-96471d743f4b.png)

>PS：Java 9 以后，javah 被弃用，取而代之的是使用 -h 选项来生成头文件，例如 `javac -h . ClassName.java`。

执行完毕后，会在 HelloJNI.java 所在目录下生成一个名为 HelloJNI.h 的头文件。打开 HelloJNI.h 文件，可以看到如下代码。　　

![](https://files.mdnice.com/user/3903/4dafe442-71d1-41df-b04c-e96d892f39ad.png)

看不懂没关系，无所谓，直到它是自动生成的就好。

#### 04）使用 C 语言实现本地方法 

创建一个 C 文件 HelloJNI.c，实现本地方法 sayHello。

```c
#include <stdio.h>
#include <jni.h>
#include "HelloJNI.h"

JNIEXPORT void JNICALL Java_HelloJNI_helloJNI(JNIEnv *env, jobject obj) {
    printf("Hello, JNI!\n");
    return;
}
```

注意，这里需要引入 JNI 头文件，并且实现的方法名称需要与在 Java 中声明的名称一致（`HelloJNI_helloJNI` HelloJNI 类的 helloJNI 方法）。

#### 05）编写编译脚本 compile.sh

```sh
#!/bin/bash

# 编译 HelloJNI.c 文件
gcc -I"$JAVA_HOME/include" -I"$JAVA_HOME/include/darwin" -shared -o libhello.dylib HelloJNI.c

# 把生成的 libhello.dylib 文件拷贝到当前目录
cp libhello.dylib .
```

注意事项：

- `$JAVA_HOME` 是 JDK 的安装路径，需要根据实际情况修改。
- 在 macOS 上，动态链接库（hello）的后缀是 .dylib，而不是 Linux 上的 .so。


这里的 -I 选项是为了告诉编译器头文件的位置，`$JAVA_HOME` 是 Java 安装目录的路径。


#### 06）执行编译脚本

```
sh compile.sh
```

执行完毕后，会在当前目录下生成一个名为 libhello.dylib 的动态链接库。

![](https://files.mdnice.com/user/3903/ccf86ab7-6dae-4ea2-9649-6dfb1bd977d9.png)

#### 07）运行 HelloJNI

执行`java HelloJNI`命令运行 HelloJNI，如果一切正常，就会在终端上输出 Hello, JNI!。

![](https://files.mdnice.com/user/3903/b10c0b70-6105-492d-819a-6e66c69021dd.png)

### **3、JNI 调用 C 的流程图**

![](https://files.mdnice.com/user/3903/124a3a78-dc5f-445f-94cb-31194c498ec2.png)


### **4、native 关键字**

“三妹，现在应该知道什么是 native 了吧？”我问三妹。

“嗯嗯，我来简述一下，二哥你看看我说的是否正确。”

native 用来修饰方法，用 native 声明的方法表示该方法的实现在外部定义，可以用任何语言去实现它，比如说 C/C++。 简单地讲，一个 native Method 就是一个 Java 调用非 Java 代码的接口。

native 语法：

- ①、修饰方法的位置必须在返回类型之前，和其余的方法控制符前后关系不受限制。
- ②、不能用 abstract 修饰，也没有方法体，也没有左右大括号。
- ③、返回值可以是任意类型

“三妹，你学的不错嘛。”我对三妹的学习能力感到非常的欣慰，“**我们在日常编程中看到 native 修饰的方法，只需要知道这个方法的作用是什么，至于别的就不用管了，操作系统会给我们实现，初学的时候也不需要太过深入**。”

>- Windows 下安装 gcc 教程：[http://blog.csdn.net/altland/article/details/63252757](https://blog.csdn.net/altland/article/details/63252757)
>- native 参考链接：[https://www.zhihu.com/question/28001771/answer/2049534464](https://www.zhihu.com/question/28001771/answer/2049534464)

---

最近整理了一份牛逼的学习资料，包括但不限于 Java 基础部分（JVM、Java 集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类 Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是 2022 年全网最全的学习和找工作的 PDF 资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
