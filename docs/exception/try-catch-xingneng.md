---
title: Java try-catch 捕获异常真的会影响性能吗？
shortTitle: try-catch会影响性能吗？
category:
  - Java核心
tag:
  - 异常处理
description: 本文详细探讨了try-catch捕获异常在Java编程中是否会影响性能。通过对比实验和性能测试，分析了异常处理与性能的关系，解答了关于try-catch对性能影响的常见疑问。阅读本文，将帮助您在编写代码时更加明智地使用异常处理机制，同时确保程序性能的稳定和优越。
head:
  - - meta
    - name: keywords
      content: Java,异常处理,java try-catch,捕获异常, 性能影响
---

# 8.5 try-catch会影响性能吗？

“二哥，你看着这鬼代码，竟然在 for 循环里面搞了个 `try-catch`，不知道`try-catch`有性能损耗吗？” 老王煞有其事地指着屏幕里的代码：

```java
 for (int i = 0; i < 5000; i++) {
     try {
         dosth
     } catch (Exception e) {
         e.printStackTrace();
     }
 }
```

我探过头去看了眼代码，“那 老王你觉得该怎么改？”

“当然是把 `try-catch` 提到外面啊！” 老王脑子都不转一下，脱口而出。

“你是不是傻？且不说性能，这代码的目的明显是让循环内部单次调用出错不影响循环的运行，你移到外面，业务逻辑不就变了吗！”

老王挠了挠他的地中海，“好像也是啊！”

“回过头来，catch 整个 for 循环和在循环内部 catch，在不出错的情况下，其实性能差不多。” 我喝一口咖啡不经意地提到，准备在 老王前面秀一下。

“啥意思？” 老王有点懵地看着我，“`try-catch`是有性能损耗的，我可是看过网上资料的！”

果然， 老王上钩了，我二话不说直接打开 idea，一顿操作敲了以下代码：

```java
public class TryCatchTest {
    // 用 @Benchmark 注解标记一个方法作为基准测试方法
    @Benchmark
    public void tryfor(Blackhole blackhole) {
        // 使用 try-catch 语句包装一个 for 循环
        try {
            for (int i = 0; i < 1000; i++) {
                // 在循环中调用 Blackhole.consume() 方法
                blackhole.consume(i);
            }
        } catch (Exception e) {
            // 捕获异常并打印堆栈跟踪信息
            e.printStackTrace();
        }
    }

    // 用 @Benchmark 注解标记另一个方法作为基准测试方法
    @Benchmark
    public void fortry(Blackhole blackhole) {
        // 使用 for 循环包装一个 try-catch 语句
        for (int i = 0; i < 1000; i++) {
            try {
                // 在 try 块中调用 Blackhole.consume() 方法
                blackhole.consume(i);
            } catch (Exception e) {
                // 捕获异常并打印堆栈跟踪信息
                e.printStackTrace();
            }
        }
    }
}
```

在这里，请允许我补充一些概念，以便大家能更好的理解这段代码。

>第一个：`@Benchmark` 是一个来自于 JMH（Java Microbenchmark Harness）库的注解，用来标记一个方法作为基准测试方法。JMH 是一个专门用于编写 [Java 微基准测试](https://hezhiqiang8909.gitbook.io/java/docs/javalib/jmh)的工具包，包含了一些用于测试 Java 代码性能和微调 JVM 的工具和库。使用 `@Benchmark` 注解标记的方法将被 JMH 自动识别为基准测试方法，并在运行时进行基准测试。在基准测试期间，JMH 会运行被标记的方法多次，并测量方法的执行时间、吞吐量、延迟等指标，并生成统计结果。

>第二个：在 JMH 进行基准测试时，为了避免 JIT 编译器优化掉测试代码中的某些操作，我们需要在测试代码中使用一些占位符，以便让编译器认为这些操作是有意义的，不应该被优化掉。`Blackhole.consume()` 方法就是这样的一个占位符。它用来占用一些 CPU 时间和内存空间，以确保测试结果的准确性和可靠性。

“BB 不如 show code，看到没， 老王，我把 `try-catch` 从 for 循环里面提出来跟在for循环里面做个对比跑一下，你猜猜两个差多少？”

“切，肯定 tryfor 性能好，想都不用想，不是的话我倒立洗头！” 老王信誓旦旦道。

我懒得跟他BB，直接开始了 benchmark，跑的结果如下：

![](https://cdn.tobebetterjavaer.com/studymore/try-catch-xingneng-20230326204136.png)

可以看到，两者的性能（数字越大越好）其实差不多：551063.024 VS 551525.861。

在这里，简单普及一下 JMH 的使用指南。

>第一步，在 pom.xml 文件中加入依赖。

```
<!-- 引入 JMH 工具包 -->
<dependency>
    <groupId>org.openjdk.jmh</groupId>
    <artifactId>jmh-core</artifactId>
    <version>1.35</version>
</dependency>

<dependency>
    <groupId>org.openjdk.jmh</groupId>
    <artifactId>jmh-generator-annprocess</artifactId>
    <version>1.35</version>
</dependency>
```

>第二步，Intellij IDEA 中安装 JMH 插件。

![](https://cdn.tobebetterjavaer.com/studymore/try-catch-xingneng-20230326200811.png)

>第三步，在代码编辑器中点击这个带有时间和运行的图标。然后静静等待结果就可以了，我本机（32G 内存 Intel i7 跑了 16 分钟，贼慢，因为 JMH 比较喜欢追求公平公正😂）

![](https://cdn.tobebetterjavaer.com/studymore/try-catch-xingneng-20230326200922.png)

老王一看傻了：“说好的性能影响呢？怎么没了？”

我直接一个javap，让 老王看看，其实两个实现在字节码层面没啥区别：

> tryfor 的字节码

异常表记录的是 0 - 20 行，如果这些行里面的代码出现问题，直接跳到 23 行处理。

![](https://cdn.tobebetterjavaer.com/studymore/try-catch-xingneng-20230326202911.png)

> fortry 的字节码

差别也就是异常表的范围小点，包的是 9-14 行，其它跟 tryfor 都差不多。

![](https://cdn.tobebetterjavaer.com/studymore/try-catch-xingneng-20230326203005.png)

所以从字节码层面来看，没抛错两者的执行效率其实没啥差别。

“那为什么网上流传着`try-catch`会有性能问题的说法啊？” 老王觉得非常奇怪。

这个说法确实有，在《Effective Java》这本书里就提到了 `try-catch` 性能问题：

![](https://cdn.tobebetterjavaer.com/studymore/try-catch-xingneng-20230326203449.png)

正所谓听话不能听一半，以前读书时候最怕的就是一知半解，因为完全理解选择题能选对，完全不懂蒙可能蒙对，一知半解必定选到错误的选项！

《Effective Java》书中说的其实是不要用 `try-catch` 来代替正常的代码，书中的举例了正常的 for 循环肯定这样实现：

```java
 for ( Mountain m : range )
    m.climb();
```

但有个卧龙偏偏不这样实现，要通过  `try-catch` 拐着弯来实现循环：

```java
 /* Horrible abuse of exceptions. Don't ever do this! */
try {
    int i = 0;
    while ( true )
        range[i++].climb();
} catch ( ArrayIndexOutOfBoundsException e ) {
}
```

这操作我只能说有点逆天，这两个实现的对比就有性能损耗了。

我们直接再跑下有`try-catch` 的代码和没 `try-catch`的 for 循环区别，代码如下：

```java
public class TryCatchTest1 {
    @Benchmark
    public void fornotry(Blackhole blackhole) {
        for (int i = 0; i < 1000; i++) {
            blackhole.consume(i);
        }
    }

    @Benchmark
    public void tryfor(Blackhole blackhole) {
        for (int i = 0; i < 1000; i++) {
            try {
                blackhole.consume(i);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
```

结果如下：

![](https://cdn.tobebetterjavaer.com/studymore/try-catch-xingneng-20230326210303.png)

+-差不多，直接看前面的分数对比，没有 `try-catch` 的性能确实好些，这也和书中说的 `try-catch` 会影响 JVM 一些特定的优化说法吻合，但是具体没有说影响哪些优化，我猜测可能是指令重排之类的。

好了，我再总结下有关 `try-catch` 性能问题说法：

1.  `try-catch` 相比较没 `try-catch`，确实有一定的性能影响，但是旨在不推荐我们用 `try-catch` 来代替正常能不用 `try-catch` 的实现，而不是不让用 `try-catch`。
2.  for循环内用  `try-catch` 和用 `try-catch` 包裹整个 for 循环性能差不多，但是其实两者本质上是业务处理方式的不同，跟性能扯不上关系，关键看你的业务流程处理。
3.  虽然知道`try-catch`会有性能影响，但是业务上不需要避讳其使用，业务实现优先（只要不是书中举例的那种逆天代码就行），非特殊情况下性能都是其次，有意识地避免大范围的`try-catch`，只 catch 需要的部分即可（没把握全 catch 也行，代码安全执行第一）。

“好了， 老王你懂了没？”

“行啊二哥，BB是一套一套的，走请你喝燕麦拿铁！”  老王一把拉起我，我直接一个挣脱，“少来，我刚喝过咖啡，你那个倒立洗头，赶紧的！”我立马意识到 老王想岔开话题。

“洗洗洗，我们先喝个咖啡，晚上回去给你洗！”

>转载链接：[https://mp.weixin.qq.com/s/H870jLz32oEI_HCMVt1m5Q](https://mp.weixin.qq.com/s/H870jLz32oEI_HCMVt1m5Q)，作者：yes，修订和优化：沉默王二

----

GitHub 上标星 7600+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 7600+ 的 Java 教程](https://tobebetterjavaer.com/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)