---
title: 阿里开源的 Java 诊断神器 Arthas
shortTitle: JVM 性能监控之 Arthas 篇
category:
  - Java核心
tag:
  - Java虚拟机
description: 本文介绍了阿里开源的 Java 诊断神器 Arthas 的安装和使用。
head:
  - - meta
    - name: keywords
      content: Java,JavaSE,教程,二哥的Java进阶之路,jvm,Java虚拟机,arthas
---

# 第十六节：JVM 性能监控之 Arthas 篇

Arthas 是阿里开源的一款线上 Java 诊断神器，通过全局的视角可以查看应用程序的内存、GC、线程等状态信息，并且能够在不修改代码的情况下，对业务问题进行诊断，包括查看方法的参数调用、执行时间、异常堆栈等信息，大大提升了生产环境中问题排查的效率。

Arthas 的官方网站是 [https://arthas.aliyun.com/doc/](https://arthas.aliyun.com/doc/)，目前最新的版本是 3.7.2。

![](https://cdn.tobebetterjavaer.com/stutymore/arthas-20240109102105.png)

比我们前面介绍的[命令行工具](https://javabetter.cn/jvm/console-tools.html)和[可视化工具](https://javabetter.cn/jvm/view-tools.html)，都要强大得多，如果你再遇到下面这些问题，就可以迎刃而解了。

- 客户线上问题，应该如何复现，让客户再点一下吗？
- 异常被吃掉，手足无措，看是哪个家伙写的，竟然是自己！
- 排查别人线上的 bug，不仅代码还没看懂，还没一行日志，捏了一把汗！
- 预发 debug，稍微时间长点，群里就怨声载道！
- 加日志重新部署，半个小时就没了，问题还没有找到，头顶的灯却早已照亮了整层楼......
- 线上机器不能 debug，也不能开 debug 端口，重新部署会不会破坏现场呢?
- 怀疑入参有问题，怀疑合并代码有问题，怀疑没有部署成功，全是问号......
- 一个问题排查一天，被 Diss 排查问题慢......

星球里也有球友一直在呼唤 Arthas 的教程，那这篇内容我们就来详细地盘一盘。

## 安装 Arthas

### macOS 安装

我们先在本地试一下哈，由于我本机是 macOS，所以我这里就以 macOS 为例，Windows 用户可以参考[官方文档](https://arthas.aliyun.com/doc/download.html)，非常简单。

我本机已经启动了[技术派](https://paicoding.com/)项目，我们就以技术派为例，来看看 Arthas 的使用。

![](https://cdn.tobebetterjavaer.com/stutymore/arthas-20240109104013.png)

官方推荐的方式是通过 arthas-boot 来安装，那我们就按照这种来：

```
curl -O https://arthas.aliyun.com/arthas-boot.jar
java -jar arthas-boot.jar
```

执行完上述命令后，Arthas 会列出可以进行监控的 Java 进程，比如说下图中的第 2 个 `[2]: 79209 com.github.paicoding.forum.web.QuickForumApplication` 就是技术派的进程，直接输入 `2`，然后回车。Arthas 会连接到技术派的进程上，并输出带有 Arthas 的日志，进入 Arthas 的命令交互界面。

![](https://cdn.tobebetterjavaer.com/stutymore/arthas-20240109104757.png)

### Linux 安装

本地 OK 后，我们来试一下服务器上的项目，技术派是部署在腾讯云的香港服务器上，我们先登录到服务器上，然后执行下面的命令获取 arthas-boot.jar：

```
curl -O https://arthas.aliyun.com/arthas-boot.jar
```

然后执行 `java -jar arthas-boot.jar`，Arthas 会列出可以进行监控的 Java 进程，我们输入 `1`，然后回车，Arthas 就会连接到技术派的进程上，并输出带有 Arthas 的日志，进入 Arthas 的命令交互界面。

![](https://cdn.tobebetterjavaer.com/stutymore/arthas-20240109105744.png)

OK，非常简单，相信大家都能搞定。

### IDEA Arthas 插件

Arthas 也提供了 IDEA 插件，可以直接在 IDEA 中使用 Arthas，非常方便，我们来看看怎么安装。

![](https://cdn.tobebetterjavaer.com/stutymore/arthas-20240109110348.png)

官方文档：

>[https://www.yuque.com/arthas-idea-plugin/help](https://www.yuque.com/arthas-idea-plugin/help)

## Arthas 常用命令

Arthas 提供了非常多的命令供我们使用，比如说和 JVM 相关的：

- `dashboard`：查看 JVM 的实时数据，包括 CPU、内存、GC、线程等信息。
- `jvm`：查看 JVM 的信息，包括 JVM 参数、类加载器、类信息、线程信息等。
- `sysprop`：查看和修改 JVM 的系统属性。
- `vmoption`：查看和修改 JVM 的启动参数。
- `heapdump`：生成堆内存快照，类似于 [jmap](https://javabetter.cn/jvm/console-tools.html) 命令。

比如说和类加载相关的：

- `sc`：查看类的信息，包括类的结构、方法、字段等。
- `sm`：查看方法的信息，包括方法的参数、返回值、异常等。


比如说和方法调用相关的：

- `tt`：统计方法的调用次数和耗时。
- `trace`：跟踪方法的调用过程，包括方法的参数、返回值、异常等。
- `monitor`：监控方法的调用过程。

我来带大家体验一些比较常用的命令，其他的命令大家可以参考[官方文档](https://arthas.aliyun.com/doc/commands.html)。

### dashboard 命令

dashboard 命令可以查看 JVM 的实时数据，包括线程、内存、线程、运行时参数等。

![](https://cdn.tobebetterjavaer.com/stutymore/arthas-20240109112718.png)

### thread 命令

thread 命令可以查看线程的信息，包括线程的状态、线程的堆栈等。

![](https://cdn.tobebetterjavaer.com/stutymore/arthas-20240109113001.png)

thread 命令的参数如下：

```
# 打印当前最忙的3个线程的堆栈信息
thread -n 3
# 查看ID为1的线程堆栈信息
thread 1
# 找出当前阻塞其他线程的线程
thread -b
# 查看指定状态的线程
thread -state WAITING
```

### sysprop 命令

sysprop 命令可以查看和修改 JVM 的系统属性。

![](https://cdn.tobebetterjavaer.com/stutymore/arthas-20240109113252.png)

支持 TAB 键补全命令哈~

### logger 命令

logger 命令可以查看和修改日志的级别，这个命令非常有用。

比如说生产环境上一般是不会打印 DEBUG 级别的日志的，但是有时候我们需要打印 DEBUG 级别的日志来排查问题，这个时候就可以使用 logger 命令来修改日志的级别。

第一步，先用 logger 命令查看默认使用的日志级别：

![](https://cdn.tobebetterjavaer.com/stutymore/arthas-20240109113942.png)

第二步，使用这个命令`logger --name ROOT --level DEBUG`，将日志级别修改为 DEBUG，再次查看日志级别，发现已经修改成功了：

![](https://cdn.tobebetterjavaer.com/stutymore/arthas-20240109114316.png)

### sc 命令

sc 命令可以查看类的信息，包括类的结构、方法、字段等。

示例 1：通过 `sc com.github.paicoding.forum.web.front.*` 查看包下的所有类：

![](https://cdn.tobebetterjavaer.com/stutymore/arthas-20240109114902.png)

示例 2：通过 `sc -d com.github.paicoding.forum.web.front.home.IndexController` 查看类的详细信息：

![](https://cdn.tobebetterjavaer.com/stutymore/arthas-20240109115043.png)

示例 3：通过 `sc -d -f com.github.paicoding.forum.web.front.home.vo.IndexVo` 查看类的字段信息：

![](https://cdn.tobebetterjavaer.com/stutymore/arthas-20240109115332.png)

### jad 命令

jad 命令可以反编译类的字节码，如果觉得线上代码和预期的不一致，可以反编译看看。

示例 1：通过 `jad com.github.paicoding.forum.web.front.home.IndexController` 反编译类的字节码：

![](https://cdn.tobebetterjavaer.com/stutymore/arthas-20240109115544.png)

### monitor 命令

monitor 命令可以监控方法的执行信息，包括执行耗时等信息。

示例 1：通过 `monitor -c 3 com.github.paicoding.forum.web.front.home.IndexController index` 监控方法的执行信息，`-c` 参数表示监控的次数：

![](https://cdn.tobebetterjavaer.com/stutymore/arthas-20240109115828.png)

### watch 命令

watch 命令可以观察方法执行过程中的参数和返回值。

示例 1：通过 `watch com.github.paicoding.forum.web.front.home.IndexController index` 观察方法的执行过程中的参数和返回值：

![](https://cdn.tobebetterjavaer.com/stutymore/arthas-20240109124522.png)



## 小结

Arthas 非常强大，还有很多插件可以配合使用，比如我们前面提到的 Arthas IDEA 插件，支持的命令还有以下这些：

![](https://cdn.tobebetterjavaer.com/stutymore/arthas-20240109140000.png)

文档写得也非常完整，我就不再赘述了，这篇内容也权当一个抛砖引玉。

![](https://cdn.tobebetterjavaer.com/stutymore/arthas-20240109140405.png)

等后面遇到线上问题了，再用 Arthas 来实战一把，给大家讲一讲。

推荐阅读：

- [Arthas 的强大](https://juejin.cn/post/7291931708920512527)
- [Arthas 的热部署](https://juejin.cn/post/6844903999129419790)
- [IDEA Arthas 插件](https://www.yuque.com/arthas-idea-plugin/help)


----

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)