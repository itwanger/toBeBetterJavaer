---
category:
  - Java核心
  - JVM
tag:
  - Java
---

# Java问题诊断和排查工具（查看JVM参数、内存使用情况及分析）

## JDK自带的工具

在JDK的bin目录下有很多命令行工具：

![image](https://upload-images.jianshu.io/upload_images/1179389-6298ada851edf7c6.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240 "点击全屏显示")

　　我们可以看到各个工具的大小基本上都稳定在27kb左右，这个不是JDK开发团队刻意为之的，而是因为这些工具大多数是 `jdk\lib\tools.jar` 类库的一层薄包装而已，他们的主要功能代码是在tools类库中实现的。

命令行工具的好处是：当应用程序部署到生产环境后，无论是直接接触物理服务器还是远程telnet到服务器上都会受到限制。而借助tools.jar类库里面的接口，我们可以直接在应用程序中实现功能强大的监控分析功能。

### 常用命令：

这里主要介绍如下几个工具：

1、jps：查看本机java进程信息

2、jstack：打印线程的**栈**信息，制作 线程dump文件

3、jmap：打印内存映射信息，制作 堆dump文件

4、jstat：性能监控工具

5、jhat：内存分析工具，用于解析堆dump文件并以适合人阅读的方式展示出来

6、jconsole：简易的JVM可视化工具

7、jvisualvm：功能更强大的JVM可视化工具

8、javap：查看字节码

### JAVA Dump：

JAVA Dump就是虚拟机运行时的快照，将虚拟机运行时的状态和信息保存到文件中，包括：

线程dump：包含所有线程的运行状态，纯文本格式

堆dump：包含所有堆对象的状态，二进制格式

## 1、jps

显示当前所有java进程pid的命令，我们可以通过这个命令来查看到底启动了几个java进程（因为每一个java程序都会独占一个java虚拟机实例），不过jps有个缺点是只能显示当前用户的进程id，要显示其他用户的还只能用linux的ps命令。

![image](https://upload-images.jianshu.io/upload_images/1179389-2d5d658c8b8db0b9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240 "点击全屏显示")

执行jps命令，会列出所有正在运行的java进程，其中jps命令也是一个java程序。前面的数字就是进程的id，这个id的作用非常大，后面会有相关介绍。

**jps -help：**

![image](https://upload-images.jianshu.io/upload_images/1179389-99d21062099dd578.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240 "点击全屏显示")

**jps -l** 输出应用程序main.class的完整package名或者应用程序jar文件完整路径名

![image](https://upload-images.jianshu.io/upload_images/1179389-d9f3ff6819b15a66.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240 "点击全屏显示")

**jps -v** 输出传递给JVM的参数

![image](https://upload-images.jianshu.io/upload_images/1179389-3bcfc37630242cb0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240 "点击全屏显示")

**jps失效**

我们在定位问题过程会遇到这样一种情况，用jps查看不到进程id，用ps -ef | grep java却能看到启动的java进程。

要解释这种现象，先来了解下jps的实现机制：

java程序启动后，会在目录/tmp/hsperfdata_{userName}/下生成几个文件，文件名就是java进程的pid，因此jps列出进程id就是把这个目录下的文件名列一下而已，至于系统参数，则是读取文件中的内容。

我们来思考下：**如果由于磁盘满了，无法创建这些文件，或者用户对这些文件没有读的权限。又或者因为某种原因这些文件或者目录被清除，出现以上这些情况，就会导致jps命令失效。**

如果jps命令失效，而我们又要获取pid，还可以使用以下两种方法：

```
1、top | grep java
2、ps -ef |grep java
```

## 2、jstack

主要用于生成指定进程当前时刻的线程快照，线程快照是当前java虚拟机每一条线程正在执行的方法堆栈的集合，生成线程快照的主要目的是用于定位线程出现长时间停顿的原因，如线程间死锁、死循环、请求外部资源导致长时间等待。

![image](https://upload-images.jianshu.io/upload_images/1179389-5f09162f867d044e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240 "点击全屏显示")

**3、jmap**

主要用于打印指定java进程的共享对象内存映射或堆内存细节。

**堆Dump是反映堆使用情况的内存镜像，其中主要包括系统信息、虚拟机属性、完整的线程Dump、所有类和对象的状态等。一般在内存不足，GC异常等情况下，我们会去怀疑内存泄漏，这个时候就会去打印堆Dump。**

jmap的用法摘要：

![image](https://upload-images.jianshu.io/upload_images/1179389-ef4aa428f2519317.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240 "点击全屏显示") 

**1、`jmap pid`**

![image](https://upload-images.jianshu.io/upload_images/1179389-b98c8d50df75dff0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240 "点击全屏显示")

打印的信息分别为：共享对象的起始地址、映射大小、共享对象路径的全程。

**2、`jmap -heap pid`:查看堆使用情况**

 ![image](https://upload-images.jianshu.io/upload_images/1179389-e3294292dc504803.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240 "点击全屏显示")

**3、`jmap -histo pid`：查看堆中对象数量和大小**

**![image](https://upload-images.jianshu.io/upload_images/1179389-b5c31231270ec757.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240 "点击全屏显示")** 

打印的信息分别是：序列号、对象的数量、这些对象的内存占用大小、这些对象所属的类的全限定名

如果是内部类，类名的开头会加上*，如果加上live子参数的话，如jmap -histo：live pid，这个命名会触发一次FUll GC，只统计存活对象

**4、`jmap -dump:format=b,file=heapdump pid`：将内存使用的详细情况输出到文件**

然后使用jhat命令查看该文件：jhat -port 4000 文件名 ，在浏览器中访问http:localhost:4000/

总结：

该命令适用的场景是程序内存不足或者GC频繁，这时候很可能是内存泄漏。通过用以上命令查看堆使用情况、大量对象被持续引用等情况。

## **4、jstat**

主要是对java应用程序的资源和性能进行实时的命令行监控，包括了对heap size和垃圾回收状况的监控。

`jstat -<option> [-t] [-h<lines>] <vmid> [<interval> [<count>]]`

option：我们经常使用的选项有gc、gcutil

vmid：java进程id

interval：间隔时间，单位为毫秒

count：打印次数

**1、jstat -gc PID 5000 20**

![image](https://upload-images.jianshu.io/upload_images/1179389-d438cd37f68605c8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240 "点击全屏显示") 

S0C:年轻代第一个survivor的容量（字节）

S1C：年轻代第二个survivor的容量（字节）

S0U：年轻代第一个survivor已使用的容量（字节）

S1U：年轻代第二个survivor已使用的容量（字节）

EC：年轻代中Eden的空间（字节）

EU：年代代中Eden已使用的空间（字节）

OC：老年代的容量（字节）

OU:老年代中已使用的空间（字节）

PC：永久代的容量

PU：永久代已使用的容量

YGC：从应用程序启动到采样时年轻代中GC的次数

YGCT:从应用程序启动到采样时年轻代中GC所使用的时间（单位：S）

FGC：从应用程序启动到采样时老年代中GC（FULL GC）的次数

FGCT：从应用程序启动到采样时老年代中GC所使用的时间（单位：S）

**2、jstat -gcutil PID 5000 20**

![image](https://upload-images.jianshu.io/upload_images/1179389-a210f6badcc528ed.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240 "点击全屏显示")

s0:年轻代中第一个survivor已使用的占当前容量百分比

s1:年轻代中第二个survivor已使用的占当前容量百分比

E:年轻代中Eden已使用的占当前容量百分比

O:老年代中已使用的占当前容量百分比

P:永久代中已使用的占当前容量百分比

## 5、jhat

主要用来解析java堆dump并启动一个web服务器，然后就可以在浏览器中查看堆的dump文件了。

生成dump文件的方法前面已经介绍了，这边主要介绍如何解析java堆转储文件，并启动一个web server

**jhat heapdump**

![image](https://upload-images.jianshu.io/upload_images/1179389-83746a41d4bf74d1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240 "点击全屏显示")

这个命令将heapdump文件转换成html格式，并且启动一个http服务，默认端口为7000。

如果端口冲突，可以使用以下命令指定端口：**jhat -port 4000 heapdump**

下面我们来访问下：ip：port

![image](https://upload-images.jianshu.io/upload_images/1179389-cf3e93133f846884.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240 "点击全屏显示")

## 6、jinfo

jinfo可以用来查看正在运行的java运用程序的扩展参数，甚至支持在运行时动态地更改部分参数。

基本使用语法如下： `jinfo -< option > < pid > `，其中option可以为以下信息：

`-flag< name >`: 打印指定java虚拟机的参数值

`-flag [+|-]< name >`：设置或取消指定java虚拟机参数的布尔值

`-flag < name >=< value >`：设置指定java虚拟机的参数的值

使用示例

下面的命令显示了新生代对象晋升到老年代对象的最大年龄。在运行程序运行时并没有指定这个参数，但是通过jinfo，可以查看这个参数的当前的值。

![image](https://upload-images.jianshu.io/upload_images/1179389-31d29381b1ed517c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240 "点击全屏显示")

下面的命令显示是否打印gc详细信息：

![image](https://upload-images.jianshu.io/upload_images/1179389-4cbebf30779aa5ee.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240 "点击全屏显示")

下面的命令在运用程序运行时动态打开打印详细gc信息开关：

![image](https://upload-images.jianshu.io/upload_images/1179389-6d011dce3e04c0a0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240 "点击全屏显示")

注意事项：jinfo虽然可以在java程序运行时动态地修改虚拟机参数，但并不是所有的参数都支持动态修改。

## 7、jcmd

在JDK 1.7之后，新增了一个命令行工具jcmd。它是一个多功能工具，可以用来导出堆，查看java进程，导出线程信息，执行GC等。jcmd拥有jmap的大部分功能，Oracle官方建议使用jcmd代替jmap。

使用 jcmd -l 命令列出当前运行的所有虚拟机，示例：
![image](https://upload-images.jianshu.io/upload_images/1179389-428e5bb14754ca0c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240 "点击全屏显示")

针对每一个虚拟机，可以使用help命令列出该虚拟机支持的所有命令，示例：

![image](https://upload-images.jianshu.io/upload_images/1179389-52c559995e3fbb49.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240 "点击全屏显示")

子命令含义：

*   VM.native_memory
*   VM.commercial_features
*   GC.rotate_log
*   ManagementAgent.stop
*   ManagementAgent.start_local
*   ManagementAgent.start
*   Thread.print，                         打印线程栈信息
*   GC.class_histogram，              查看系统中类统计信息
*   GC.heap_dump，                    导出堆信息，与jmap -dump功能一样
*   GC.run_finalization，               触发finalize()
*   GC.run，                                触发gc()
*   VM.uptime，                           VM启动时间
*   VM.flags，                              获取JVM启动参数
*   VM.system_properties，          获取系统Properties
*   VM.command_line，                 启动时命令行指定的参数
*   VM.version
*   help

示例：

![image](https://upload-images.jianshu.io/upload_images/1179389-9225121e737ab406.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240 "点击全屏显示")

## 8、可视化监控工具（JConsole、JVisualVM）

集上面之大成，并提供了可视化的界面；还可以监控远程Java服务；支持监控JMX。

JVisualVM比JConsole更强大：支持对CPU、内存运行进行采样、配置。推荐用JVisualVM。

JConsole监控页面示例：

![image](https://upload-images.jianshu.io/upload_images/1179389-92e66778004bf548.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240 "点击全屏显示")

JVisualVM监控页面示例：

![image](https://upload-images.jianshu.io/upload_images/1179389-57562c975c5c0a24.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240 "点击全屏显示")


## 其他工具 

JOL（即Java Object Layout）：OpenJDK提供的库，用于查看Java对象的内存布局，这个很有用，可以借助它来跟踪锁升级等过程。只需要引入Maven即可使用，示例：

```
//引入依赖
        <dependency>
            <groupId>org.openjdk.jol</groupId>
            <artifactId>jol-core</artifactId>
            <version>0.16</version>
        </dependency>

//代码

class TTTT {
    public static void main(String[] args) {
        System.err.println(ClassLayout.parseInstance(new Person()).toPrintable());
        System.err.println(ClassLayout.parseClass(Person.class).toPrintable());
    }
}

class Person {
    private int age = 1;
    private String name = "zhangsan";
}

//代码执行结果
com.marchon.learning.Person object internals:
OFF  SZ               TYPE DESCRIPTION               VALUE
  0   8                    (object header: mark)     0x0000005e4c804101 (hash: 0x5e4c8041; age: 0)
  8   4                    (object header: class)    0xf8010dd9
 12   4                int Person.age                1
 16   4   java.lang.String Person.name               (object)
 20   4                    (object alignment gap)    
Instance size: 24 bytes
Space losses: 0 bytes internal + 4 bytes external = 4 bytes total
```

openJDK源码：查看 JDK native 方法的实现

strace：跟踪程序运行过程发起的系统调用

https://fastthread.io：线程栈分析的网站

![](https://upload-images.jianshu.io/upload_images/1179389-c82f746ad11b7f13.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 上问题排查思路（八股）

硬盘使用情况：du 命令

内存使用且情况：free 命令

CPU使用情况：top 命令

网络使用情况：netstat 命令

Java程序问题分析：jmap 分析堆内存、jstack 分析线程栈等，见前文。

原文链接：https://www.cnblogs.com/z-sm/p/6745375.html