---
title: JVM 性能监控工具之可视化篇
shortTitle: JVM 性能监控之可视化篇
category:
  - Java核心
tag:
  - Java虚拟机
description: 本篇我们介绍了一些可视化的性能监控工具，包括 JConsole、VisualVM、Java Mission Control 等，阿里的 Arthas 我们留到后面单独去讲。
head:
  - - meta
    - name: keywords
      content: Java,JavaSE,教程,二哥的Java进阶之路,jvm,Java虚拟机,性能监控,可视化工具,JConsole,VisualVM,Java Mission Control
---

# 第十五节：JVM 性能监控之可视化篇

前面我们已经讲了 [JVM 性能监控工具之命令行篇](https://javabetter.cn/jvm/console-tools.html)，本篇我们来介绍一些可视化的性能监控工具，包括 JConsole、VisualVM、Java Mission Control 等，阿里的 Arthas 我们留到后面单独去讲。

可视化工具比命令行工具强大的地方就在于这些工具提供了更直观、更易于理解的性能数据视图，肉眼看上去，脑子就能快速 get 到问题所在，那这篇就来带大家看看这些工具的强大之处。

## JConsole

JConsole（Java Monitoring and Management Console），是一款基于 JMX（Java Manage-ment Extensions）的可视化监视管理工具。

> JMX 的全称是 Java Management Extensions，翻译过来就是 Java 管理扩展，既是 Java 管理系统中的一个标准，一个规范，也是一个[接口](https://javabetter.cn/oo/interface.html)，一个框架。JConsole 就相当于是 JMX 的一个实现类。

JConsole 可以用来监视 Java 应用程序的运行状态，包括内存使用、线程状态、类加载、GC 等，还可以进行一些基本的性能分析。

### JConsole 连接 Java 程序

JConsole 程序位于%JAVA_HOME%bin 目录下，不过我当前的操作系统是 macOS，和 Windows 有一些不一样，我就不再刻意截 [Windows 的图](https://javabetter.cn/overview/jdk-install-config.html#_02%E3%80%81windows-%E5%AE%89%E8%A3%85-jdk)了，希望大家可以理解。

![](https://cdn.tobebetterjavaer.com/stutymore/view-tools-20240107121534.png)


直接启动 JConsole，会弹出一个窗口，显示本机正在运行的 Java 程序，选择一个程序（比如说[技术派](https://paicoding.com/)的 28966），点击`连接`即可。

![](https://cdn.tobebetterjavaer.com/stutymore/view-tools-20240107122523.png)

还可以进行远程链接，比如说对服务器上的 Java 程序进行监控，需要远程服务器上的 Java 程序在启动的时候加上以下这些参数：

```
-Dcom.sun.management.jmxremote
-Dcom.sun.management.jmxremote.port=<PORT>
-Dcom.sun.management.jmxremote.authenticate=false
-Dcom.sun.management.jmxremote.ssl=false
```

- `<PORT>` 是您想要 JMX 代理监听的端口号，例如 9999。
- authenticate=false 表示不需要身份验证来连接到 JMX（注意：这在生产环境中可能不安全）。
- ssl=false 表示不需要使用 SSL 加密连接（同样，这在生产环境中可能不安全）。

### Java 程序概况

使用 JConsole 连接了一个本地程序，在`概述`可以看到 Java 程序的运行时概况，包括`堆内存使用量`、`线程`、`类`、`CPU占用率`四项信息的曲线图。

![](https://cdn.tobebetterjavaer.com/stutymore/view-tools-20240107125054.png)


### 内存监控

`内存`的作用相当于可视化的 [jstat 命令](https://javabetter.cn/jvm/console-tools.html)（上一节讲过了），用于监视 Java 堆的使用情况，可以更细化到 [eden 区、suvivior 区、老年代](https://javabetter.cn/jvm/whereis-the-object.html)的使用情况。

![](https://cdn.tobebetterjavaer.com/stutymore/view-tools-20240107125358.png)

为了更加清晰地查看内存变化，可以运行下面这段，然后连接：

```java

/**
 * VM参数： -Xms100m -Xmx100m -XX:+UseSerialGC
 */
class JConcoleRAMMonitor {

    /***
     * 内存占位符对象，一个OOMObject大约占64KB
     */
    static class OOMObject {
        public byte[] placeholder = new byte[64 * 1024];
    }

    public static void fillHeap(int num) throws InterruptedException {
        List<OOMObject> list = new ArrayList<OOMObject>();
        for (int i = 0; i < num; i++) {
            // 稍作延时，令监视曲线的变化更加明显
            Thread.sleep(300);
            list.add(new OOMObject());
        }
        System.gc();
    }

    public static void main(String[] args) throws Exception {
        fillHeap(2000);
    }
}
```

这段代码的作用是以 64KB/50ms 的速度向 Java 堆中填充数据，一共填充 1000 次。

观察 Eden 区的运行趋势，发现呈折线趋势增长。

![](https://cdn.tobebetterjavaer.com/stutymore/view-tools-20240107125932.png)

点击「执行 GC」之后，会发现老年代的柱状图会达到峰值状态，是因为执行 GC 之后，Eden 区的对象被回收，存活的对象被移动到老年代。

![](https://cdn.tobebetterjavaer.com/stutymore/view-tools-20240107130243.png)


### 线程监控

JConcole 还可以监控线程，相当于可视化的 [jstack 命令](https://javabetter.cn/jvm/console-tools.html)（上一节讲过了）。

如下图，JConcole 显示了应用系统内的线程数量，左下方显示了程序中所有的线程。点击线程名称，就可以查看线程的栈信息。

![](https://cdn.tobebetterjavaer.com/stutymore/view-tools-20240107131040.png)

使用 JConsole 还可以快速定位死锁问题。上一篇我们曾写过一个[死锁的例子](https://javabetter.cn/jvm/console-tools.html)，这里我们再来看一下。

```java
class DeadLockDemo {
    private static final Object lock1 = new Object();
    private static final Object lock2 = new Object();

    public static void main(String[] args) {
        new Thread(() -> {
            synchronized (lock1) {
                System.out.println("线程1获取到了锁1");
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                synchronized (lock2) {
                    System.out.println("线程1获取到了锁2");
                }
            }
        }).start();

        new Thread(() -> {
            synchronized (lock2) {
                System.out.println("线程2获取到了锁2");
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                synchronized (lock1) {
                    System.out.println("线程2获取到了锁1");
                }
            }
        }).start();
    }
}
```

运行以上代码，点击 JConsole 线程面板下的 「`检测到死锁`」按钮，将会看到线程的死锁信息。

![](https://cdn.tobebetterjavaer.com/stutymore/view-tools-20240107131533.png)

### 类加载情况

如下图，「类」面板显示了已经装载的类数量。在详细信息栏中，还显示了已经卸载的类的数量。

![](https://cdn.tobebetterjavaer.com/stutymore/view-tools-20240107131709.png)

###  VM 概要

在`VM 概要` 面板，JConsole 显示了当前应用程序的运行时环境，包括虚拟机类型、版本、堆信息以及虚拟机参数等。

![](https://cdn.tobebetterjavaer.com/stutymore/view-tools-20240107131747.png)

## VisualVM

VisualVM（All-in-One Java Troubleshooting Tool）一款功能强大的运行监视和故障处理工具之一，在很长一段时间内，VisualVM 都是 Oracle 官方主推的故障处理工具。

集成了多个 JDK 命令行工具的功能，提供了一个友好的图形界面，非常适用于开发和生产环境。

### VisualVM 安装插件

VisualVM 的安装非常简单，下载地址：[https://visualvm.github.io](https://visualvm.github.io)

![](https://cdn.tobebetterjavaer.com/stutymore/view-tools-20240107132705.png)

安装完成后打开的界面如下所示：

![](https://cdn.tobebetterjavaer.com/stutymore/view-tools-20240107132947.png)

VisualVM 比 JConsole 强的不是一星半点，它不仅拥有更漂亮的身段，还支持插件功能。

点击`tools`\-> `plugins`，在`可用插件`里可以看到大量的插件，按需安装即可。

![](https://cdn.tobebetterjavaer.com/stutymore/view-tools-20240107133038.png)


VisualVM 中`概述`、`监视`、`线程`与 JConsole 差别不大，这里就不在赘述。

### 生成、浏览堆转储快照

在 VisualVM 中生成堆转储快照文件有两种方式，可以执行下列任一操作：

①、在`应用程序`面板中右键选择`堆Dump`（也就是 Heap Dump）。


![](https://cdn.tobebetterjavaer.com/stutymore/view-tools-20240107133459.png)

②、在`应用程序`面板中选择应用程序，在“监视”面板中单击`堆Dump`。

![](https://cdn.tobebetterjavaer.com/stutymore/view-tools-20240107133533.png)

如果需要把堆转储快照保存文件后分享出去，可以在 heapdump 节点上右键选择“另存为”菜单，否则当 VisualVM 关闭时，生成的堆转储快照文件会被当作临时文件自动清理掉。

![](https://cdn.tobebetterjavaer.com/stutymore/view-tools-20240107133756.png)


### 分析程序性能

如果想对应用程序的 CPU 和内存情况进行分析，可以在「分析 profiler」面板中点击「CPU」或者「Memory」，然后 VisualVM 会记录这段时间中应用程序执行过的所有方法。

比如说 CPU 将会统计每个方法的执行次数、执行耗时。比如说内存将会统计每个方法的内存分配情况。

![](https://cdn.tobebetterjavaer.com/stutymore/view-tools-20240107134238.png)

注意点击开始后，回到应用程序进行操作。等要分析的操作执行结束后，点击“停止”按钮结束监控过程。

## Java Mission Control

JMC 最初是 JRockit VM 中的诊断工具，但在 Oracle JDK7 Update 40 以后，就绑定到了 HotSpot VM 中。不过后来又被 Oracle 开源出来作为一个单独的产品。

>GitHub 地址：[https://github.com/openjdk/jmc](https://github.com/openjdk/jmc)

![](https://cdn.tobebetterjavaer.com/stutymore/view-tools-20240107154540.png)

Oracle 官方下载比较慢，可以通过 jdk.java.net 下载。

>[https://jdk.java.net/jmc/8/](https://jdk.java.net/jmc/8/)

解压后启动的界面如下所示：

![](https://cdn.tobebetterjavaer.com/stutymore/view-tools-20240107154959.png)

### MBean Server

点击本地进程的`MBean服务器`：

![](https://cdn.tobebetterjavaer.com/stutymore/view-tools-20240107155226.png)

>MBean 是管理 Java 应用程序的一种标准方式，它是 Java 管理扩展（JMX）的一部分。MBean 代表可管理的 Java 对象，它们的属性和操作可以通过 JMX 进行访问。

仪表盘显示了 Java 堆的使用率，CPU 使用率和 Live Set+Fragmentation（Live Set 是指存活对象的大小，Fragmentation 是指碎片的大小）。

### 飞行记录器（Flight Recorder）

飞行记录器（JFR）是 JMC 提供的另一功能，通过记录应用程序在一段时间内的运行情况，再进行分析和展示，可以更进一步对应用程序的性能进行分析和诊断。

要使用 JFR，程序启动需要带以下参数：

```
-XX:+UnlockCommercialFeatures  -XX:+FlightRecorder
```

连接加了相关参数启动的程序，启动飞行记录，进行一分钟的性能记录：

![](https://cdn.tobebetterjavaer.com/stutymore/view-tools-20240107160338.png)


记录结束后，JMC 会自动打开刚才的记录：

![](https://cdn.tobebetterjavaer.com/stutymore/view-tools-20240107160555.png)

JFR 提供的数据质量通常也要比其他工具通过代理形式采样获得的更高。

以垃圾搜集为例，HotSpot 的 MBean 中一般有各个分代大小、收集次数、时间、占用率等数据，这些都属于“结果”类的信息，而 JFR 中还可以看到内存中这段时间分配了哪些对象、哪些对象被回收了，这些都属于“过程”类的信息。

我这里提供一些可供测试的代码，大家可以在本地跑一下，看看 JFR 的效果。

第一个：CPU 使用过高：

```java
/**
 * 消耗CPU的线程
 * 不断循环进行浮点运算
 */
private static void cpuHigh() {
    Thread thread = new Thread(() -> {
        Thread.currentThread().setName("cpu_high_thread");
        while (true){
            double pi = 0;
            for (int i = 0; i < Integer.MAX_VALUE; i++) {
                pi += Math.pow(-1, i) / (2 * i + 1);
            }
            System.out.println("Pi: " + pi * 4);
        }
    });
    thread.start();
}
```

第二个：内存使用过高：

```java
/**
 * 不断新增 BigDecimal 信息到 list
 */
private static void allocate() {
    new Thread(()->{
        Thread.currentThread().setName("memory_allocate_thread");
        List<BigDecimal> list = new ArrayList<>();
        for (int i = 0; i < Integer.MAX_VALUE; i++) {
            try {
                Thread.sleep(1);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            list.add(new BigDecimal(i));
        }
    }).start();
}
```

完整示例可以参考这个 GitHub 仓库：

>[https://github.com/itwanger/paicoding/blob/main/paicoding-web/src/test/java/com/github/paicoding/forum/test/javabetter/jvm/HotCode.java](https://github.com/itwanger/paicoding/blob/main/paicoding-web/src/test/java/com/github/paicoding/forum/test/javabetter/jvm/HotCode.java)

比如说通过「内存面板」可以看出 BigDecimal 对象占用了最多的内存。

![](https://cdn.tobebetterjavaer.com/stutymore/view-tools-20240107162040.png)

如果想进一步分析内存占用来源，可以切到线程页面，勾选三个复选框，可以在 memory 这里看到内存情况。

![](https://cdn.tobebetterjavaer.com/stutymore/view-tools-20240107162307.png)

还可以看到这里的 `cpu_high_thread` 在不断地计算浮点数，所以占用了较多的 CPU。

![](https://cdn.tobebetterjavaer.com/stutymore/view-tools-20240107162511.png)

死锁的情况也可以在这里看得到。

![](https://cdn.tobebetterjavaer.com/stutymore/view-tools-20240107162559.png)

## 第三方工具

以上三个都属于 Oracle 官方提供的性能监控工具，除此之外还有一些第三方的性能监控工具。

- **「MAT」**

Java 堆内存分析工具。

- **「GChisto」**

GC 日志分析工具。

- **「GCViewer」**

`GC` 日志分析工具。

- **「JProfiler」**

商用的性能分析利器。

- **「arthas」**

阿里开源诊断工具。

- **「async-profiler」**

Java 应用性能分析工具，开源、火焰图、跨平台。


## 小结

本篇我们介绍了一些可视化的性能监控工具，包括 JConsole、VisualVM、Java Mission Control 等，阿里的 Arthas 我们留到后面单独去讲。

> 参考链接：星球嘉宾三分恶 [性能监控工具-可视化工具篇](https://mp.weixin.qq.com/s/iqZ0KZILAvzmFXpw6gH3mA)

----

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)