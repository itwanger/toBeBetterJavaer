---
title: Java问题诊断和排查工具（查看JVM参数、内存使用情况及分析）
shortTitle: Java问题诊断和排查工具
category:
  - Java核心
tag:
  - Java虚拟机
description: Java程序员进阶之路，小白的零基础Java教程，从入门到进阶，Java问题诊断和排查工具（查看JVM参数、内存使用情况及分析）
head:
  - - meta
    - name: keywords
      content: Java,JavaSE,教程,Java程序员进阶之路,jvm,Java虚拟机
---

# Java问题诊断和排查工具（查看JVM参数、内存使用情况及分析）


## JDK自带的工具

在JDK的bin目录下有很多命令行工具：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/problem-tools-547b1b2c-9fb4-4d1d-9c72-013ec210f6a5.jpg)

　　我们可以看到各个工具的大小基本上都稳定在27kb左右，这个不是JDK开发团队刻意为之的，而是因为这些工具大多数是 `jdk\lib\tools.jar` 类库的一层薄包装而已，他们的主要功能代码是在tools类库中实现的。

命令行工具的好处是：当应用程序部署到生产环境后，无论是直接接触物理服务器还是远程telnet到服务器上都会受到限制。而借助tools.jar类库里面的接口，我们可以直接在应用程序中实现功能强大的监控分析功能。

### 常用命令：

这里主要介绍如下几个工具：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/problem-tools-01.png)

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

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/problem-tools-2017daf6-832a-4673-b776-ad3380e47402.png)

执行jps命令，会列出所有正在运行的java进程，其中jps命令也是一个java程序。前面的数字就是进程的id，这个id的作用非常大，后面会有相关介绍。

**jps -help：**

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/problem-tools-031be661-e47e-44f0-9e33-34368b187662.png)

**jps -l** 输出应用程序main.class的完整package名或者应用程序jar文件完整路径名

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/problem-tools-0ccc96dc-8053-4222-9824-b116f02776a4.png)

**jps -v** 输出传递给JVM的参数

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/problem-tools-059a3285-4a01-4f7a-a6ed-1cc5dcbf3f18.png)

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

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/problem-tools-e80d0925-2dcf-4204-b46d-47312df2a673.png)

**3、jmap**

主要用于打印指定java进程的共享对象内存映射或堆内存细节。

**堆Dump是反映堆使用情况的内存镜像，其中主要包括系统信息、虚拟机属性、完整的线程Dump、所有类和对象的状态等。一般在内存不足，GC异常等情况下，我们会去怀疑内存泄漏，这个时候就会去打印堆Dump。**

jmap的用法摘要：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/problem-tools-96a70bab-5cee-4068-8ccb-1d35124abeea.png)

**1、`jmap pid`**

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/problem-tools-38d5c9da-e433-43d2-b1bc-3f3634e05497.png)

打印的信息分别为：共享对象的起始地址、映射大小、共享对象路径的全程。

**2、`jmap -heap pid`:查看堆使用情况**

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/problem-tools-75acf4c8-393d-43d1-b208-04de1f0ba6bd.png)

**3、`jmap -histo pid`：查看堆中对象数量和大小**

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/problem-tools-5e42fe47-e1e6-4649-acb5-e17bd277a771.png)

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

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/problem-tools-3f71397d-3ff6-430d-adf4-ff5ab9f111d5.png)

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

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/problem-tools-c2a84c1d-e853-482a-88a5-27ef39da66a0.png)

s0:年轻代中第一个survivor已使用的占当前容量百分比

s1:年轻代中第二个survivor已使用的占当前容量百分比

E:年轻代中Eden已使用的占当前容量百分比

O:老年代中已使用的占当前容量百分比

P:永久代中已使用的占当前容量百分比

## 5、jhat

主要用来解析java堆dump并启动一个web服务器，然后就可以在浏览器中查看堆的dump文件了。

生成dump文件的方法前面已经介绍了，这边主要介绍如何解析java堆转储文件，并启动一个web server

**jhat heapdump**

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/problem-tools-fd76ac30-53a5-4549-8206-18283f330758.png)

这个命令将heapdump文件转换成html格式，并且启动一个http服务，默认端口为7000。

如果端口冲突，可以使用以下命令指定端口：**jhat -port 4000 heapdump**

下面我们来访问下：ip：port

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/problem-tools-059e61f1-8263-4ee0-b36b-f117ecaf0a07.png)

## 6、jinfo

jinfo可以用来查看正在运行的java运用程序的扩展参数，甚至支持在运行时动态地更改部分参数。

基本使用语法如下： `jinfo -< option > < pid > `，其中option可以为以下信息：

`-flag< name >`: 打印指定java虚拟机的参数值

`-flag [+|-]< name >`：设置或取消指定java虚拟机参数的布尔值

`-flag < name >=< value >`：设置指定java虚拟机的参数的值

使用示例

下面的命令显示了新生代对象晋升到老年代对象的最大年龄。在运行程序运行时并没有指定这个参数，但是通过jinfo，可以查看这个参数的当前的值。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/problem-tools-f37517b7-20b4-4243-ae03-d41126ae43e5.png)

下面的命令显示是否打印gc详细信息：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/problem-tools-86c5ace2-7377-4d5a-a780-0a194e14c9a0.png)

下面的命令在运用程序运行时动态打开打印详细gc信息开关：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/problem-tools-d258d260-65eb-48f9-8585-6bed74de5a47.png)

注意事项：jinfo虽然可以在java程序运行时动态地修改虚拟机参数，但并不是所有的参数都支持动态修改。

## 7、jcmd

在JDK 1.7之后，新增了一个命令行工具jcmd。它是一个多功能工具，可以用来导出堆，查看java进程，导出线程信息，执行GC等。jcmd拥有jmap的大部分功能，Oracle官方建议使用jcmd代替jmap。

使用 jcmd -l 命令列出当前运行的所有虚拟机，示例：
![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/problem-tools-4fa6915b-d39c-4d6d-a6e7-edc989cac76f.png)

针对每一个虚拟机，可以使用help命令列出该虚拟机支持的所有命令，示例：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/problem-tools-219b7cac-c9a9-4d47-8ecf-93a4a04fc1db.png)

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

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/problem-tools-b0742677-4ad0-4fd3-b985-054238af8865.png)

## 8、可视化监控工具（JConsole、JVisualVM）

### 简介

在 JDK 安装目录的 `bin` 文件夹下，除了提供有命令行监控工具外，还提供了几种可视化的监控工具，以方便用户直观地了解虚拟机的运行状态。常用的可视化监控工具如下：

### JConsole

#### 简介

JConsole（Java Monitoring and Management Console）是一款基于 JMX（Java Manage-ment Extensions）的可视化监视工具。它的主要功能是通过 JMX 的 MBean（Managed Bean）对系统信息进行收集和动态调整系统参数。JMX（Java Management Extensions）是一个为应用程序、设备、系统等植入管理功能的框架，通常用于监控系统的运行状态或管理系统的部分功能。

#### 使用

打开位于 bin 目录下的 `jconsole` 程序后，它会自动扫描当前主机上的所有 JVM 进程：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/problem-tools-6b614bd9-5e75-48e0-b51e-50cbd33669a5.png)


选中需要监控的进程后，点击连接，即可进入监控界面。监控界面包含了 *概览*、*内存*、*线程*、*类*、*VM 概要*、*MBean* 六个选项卡。其中概览界面显示的是 *内存*、*线程*、*类* 等三个选项卡界面的概览信息，如下所示：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/problem-tools-10f3df05-e209-4bca-a8dc-99668a2d8e07.png)




而内存界面主要用于显示堆和非堆上各个区域的使用量：



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/problem-tools-ddabe66e-18ac-4cb6-9e9e-f446645a4501.png)




线程界面内主要显示各个线程的堆栈信息，最下角有一个 **检测死锁** 按钮，点击后如果检测到死锁存在，则在下部的线程选项卡旁边会出现死锁选项卡：



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/problem-tools-a97902be-6084-4009-81b2-cbe08d60a617.png)




点击死锁选项卡则可以看到造成死锁的线程：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/problem-tools-a76f6714-0efd-4208-a203-9264bc9963d9.png)




最后的 **类** 选项卡主要用于显示当前已加载和已卸载的类的数量。而 **VM 概要** 选项卡则主要用于显示虚拟机的相关参数，如下所示：



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/problem-tools-519acfd8-943e-4005-b1af-9de1e4187971.png)




### VisualVM

#### 简介

VisualVM（All-in-One Java Troubleshooting Tool）是 Oracle 提供的功能最强大的运行监视和故障处理程序之一， 它除了支持常规的运行监视、故障处理等功能外，还能用于性能分析（Profiling）。同时因为 VisualVM 是基于 NetBeans 平台的开发工具，所以它还支持通过插件来进行功能的拓展。VisualVM 的主要功能如下：

- 显示虚拟机进程及其配置信息、环境信息（与 jps、jinfo 功能类似）；
- 监视应用程序的处理器、垃圾收集、堆、方法区以及线程的信息（与 jstat、jstack 功能类似）；
- dump以及分析堆转储快照（与 jmap、jhat 功能类似）；
- 方法级的程序运行性能分析，找出被调用最多、运行时间最长的方法；
- 离线程序快照：可以收集程序的运行时配置、线程 dump、内存 dump 等信息来建立快照。

#### 使用

打开位于 bin 目录下的 `jvisualvm` 程序， 它会自动扫描当前主机上的所有 JVM 进程：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/problem-tools-221c1e6e-bcfd-4bf3-be85-6172a3f72962.png)




点击需要监控的进程后，右侧即会显示相关的监控信息：



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/problem-tools-0e0a833a-d13c-4b70-b7ee-c58651a58185.png)




**1. 堆 Dump**

在监控界面点击按钮可以 **执行垃圾回收** 或者 **堆 Dump** 。进行堆 Dump 后，还会显示其分析结果：



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/problem-tools-afaf433c-6ae7-4c4b-b686-48504cd4c3e9.png)




**2. 线程 Dump**

在线程界面可以查看所有线程的状态，如果出现死锁，该界面还会进行提示：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/problem-tools-9dbc6b53-c9e6-4051-845f-ef2d848b5d60.png)




此时可以进行 **线程 Dump** 来获取具体的线程信息，效果和 jstack 命令类似：



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/problem-tools-74941c88-d009-4d7f-8264-efc7d94c94ee.png)




**3. 性能分析**

在 Profiler 界面，可以进行 CPU 和 内存的性能分析。要开始性能分析，需要先选择 **CPU** 或 **内存** 按钮中的一个，VisualVM 将会开始记录应用程序执行过的所有方法：如果是进行的是 CPU 执行时间分析，将会统计每个方法的执行次数、执行耗时；如果是内存分析，则会统计每个方法关联的对象数以及这些对象所占的空间。想要结束性能分析，点击停止按钮即可：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/problem-tools-946d7f3e-9519-4a0b-8905-0bf2c1d83fcb.png)




**4.  Visual GC**

Visual GC 面板默认是不显示的，需要通过插件进行扩展。它会实时监控虚拟机的状态，在功能上类似于 jstat 命令：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/problem-tools-b6f23234-8b1d-44df-8b12-e723dc0d1903.png)




#### 安装插件

在主界面，点击 **工具 => 插件** ，可以打开插件面板。右击插件选项或者点击安装按钮即可完成对应插件的安装：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/problem-tools-4518bc2f-ef1f-4ed6-8da9-47a0fdc03338.png)




需要注意的是，安装插件前需要按照自己 JVM 的版本来配置插件中心，否则会抛出 ”无法连接到插件中心“ 的异常。每个版本对应的插件中心可以在该网址上查看：https://visualvm.github.io/pluginscenters.html，界面如下：



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/problem-tools-146f715c-a902-4725-9101-07d608a04770.png)




之后需要将正确的插件中心的地址配置到程序中：



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/problem-tools-55919d48-88f4-4ee5-842f-3ed20b9f7cd6.png)




### 连接远程进程

以上演示 JConsole 和 VisualVM 时，我们都是用的本地进程，但在实际开发中，我们更多需要监控的是服务器上的远程进程。想要监控远程主机上的进程，需要进行 JMX 的相关配置，根据连接时是否需要用户名和密码，可以分为以下两种配置方式：

#### 不使用安全凭证

启动服务器上的 Java 进程时增加以下参数：

```shell
 java -Dcom.sun.management.jmxremote.port=12345  #jmx远程连接的端口号
 -Dcom.sun.management.jmxremote.ssl=false 
 -Dcom.sun.management.jmxremote.authenticate=false  
 -jar springboot.jar 
```

此时只需要知道主机地址和端口号就可以连接，不需要使用用户名和密码，所以安全性比较低。

#### 使用安全凭证

启动服务器上的 Java 进程时增加以下参数：

```shell
java -Dcom.sun.management.jmxremote.port=12345 
-Dcom.sun.management.jmxremote.ssl=false 
-Dcom.sun.management.jmxremote.authenticate=true 
-Dcom.sun.management.jmxremote.access.file=/usr/local/jmxremote.access 
-Dcom.sun.management.jmxremote.password.file=/usr/local/jmxremote.password 
-jar springboot.jar 
```

其中 `jmxremote.access ` 的内容如下，其中 admin 为用户名，readwrite 表示可读可写，也可以设置为 readonly（只读）：

```shell
admin readwrite  
```

 `jmxremote.password` 的内容如下，其中 admin 为用户名，123456 为密码：

```shell
admin 123456
```

两个文件创建好后，还需要赋予其执行权限：

```shell
chmod 600 /usr/local/jmxremote.access
chmod 600 /usr/local/jmxremote.password
chown root:root /usr/local/jmxremote.access
chown root:root /usr/local/jmxremote.password
```

之后在使用 VisualVM 进行远程连接时，配置如下：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/problem-tools-f84f1b0a-3ff7-444f-8285-709a234ce670.png)


需要注意的是这里的端口号是配置的 `Dcom.sun.management.jmxremote.port` 的值，而不是 Java 程序的端口号。连接完成后，即可查看到对应进程的监控状态。


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

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/problem-tools-6d57b323-9665-4453-9fee-ea3111ad8629.png)

## 上问题排查思路（八股）

硬盘使用情况：du 命令

内存使用且情况：free 命令

CPU使用情况：top 命令

网络使用情况：netstat 命令

Java程序问题分析：jmap 分析堆内存、jstack 分析线程栈等，见前文。

- 参考链接 1：[https://www.cnblogs.com/z-sm/p/6745375.html](https://www.cnblogs.com/z-sm/p/6745375.html)
- 参考链接：[https://github.com/heibaiying/Full-Stack-Notes/blob/master/notes/JVM_性能监控之可视化工具.md](https://github.com/heibaiying/Full-Stack-Notes/blob/master/notes/JVM_性能监控之可视化工具.md)

----

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
