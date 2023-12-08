---
title: 分享 4 个阅读源码必备的 IDEA 调试技巧
shortTitle: 4个阅读源码必备的IDEA调试技巧
category:
  - 开发/构建工具
tag:
  - IDEA
description: 几个我日常工作以及阅读源码必备的 IntelliJ IDEA 高级调试技巧，分分钟要起飞的节奏。
head:
  - - meta
    - name: keywords
      content: Intellij IDEA,IDEA,Intellij IDEA 调试技巧,IDEA 调试技巧
---


大家好，我是二哥！今天给大家带来几个我日常工作以及阅读源码必备的 IntelliJ IDEA 高级调试技巧，分分钟要起飞的节奏。

## 断点处添加 log

很多程序员在调试代码时都喜欢 `print` 一些内容，这样看起来更直观，print 完之后又很容易忘记删除掉这些没用的内容，最终将代码提交到 `remote`，code review 时又不得不删减这些内容重新提交，不但增加不必要的工作量，还让 `log tree` 的一些节点没有任何价值

IntelliJ IDEA 提供 `Evaluate and Log at Breakpoints` 功能恰巧可以帮助我们解决这个问题, 来看下面代码：

```java
public static void main(String[] args) {
  ThreadLocalRandom random = ThreadLocalRandom.current();
  int count = 0;
  for (int i = 0; i < 5; i++) {
   if (isInterested(random.nextInt(10))) {
    count++;
   }
  }
  System.out.printf("Found %d interested values%n", count);
 }

 private static boolean isInterested(int i) {
  return i % 2 == 0;
 }
```

假如我们想在第 15 行查看每次调用，随即出来的 i 的值到底是多少，我们没必要在这个地方添加任何 log，在正常加断点的地方使用快捷键 `Shift + 鼠标左键`，就会弹出下面的内容

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/4-debug-skill-e69c965f-f7e5-4e91-a92d-a43a1d0aced4.jpg)

勾选上 `Evaluate and log`, 并自定义你想查看的 log/变量，比如这里的 `"interested" + i`, 这样以 Debug 模式运行程序（正常模式运行，不会打印这些 log）：

```
interested 7
interested 5
interested 1
interested 2
interested 0
Found 2 interested values
```

如果你在多处添加了这种断点，简单的看 log 可能偶尔还是不够直观，可以勾选上面图片绿色框线的 `"Breakpoint hit" message` :

```
Breakpoint reached at top.dayarch.TestDebug.isInterested(TestDebug.java:49)
interested 6
Breakpoint reached at top.dayarch.TestDebug.isInterested(TestDebug.java:49)
interested 0
Breakpoint reached at top.dayarch.TestDebug.isInterested(TestDebug.java:49)
interested 9
Breakpoint reached at top.dayarch.TestDebug.isInterested(TestDebug.java:49)
interested 8
Breakpoint reached at top.dayarch.TestDebug.isInterested(TestDebug.java:49)
interested 1
Found 3 interested values
Disconnected from the target VM, address: '127.0.0.1:0', transport: 'socket'

Process finished with exit code 
```

如果你想要更详细的信息，那就勾选上 `Stack trace` (大家自己查看运行结果吧)，有了这个功能，上面说的一些问题都不复存在了

## 字段断点

如果你阅读源码，你一定会有个困扰，类中的某个字段的值到底是在哪里改变的，你要一点点追踪调用栈，逐步排查，稍不留神，就可能有遗漏

> 我们可以在 IntelliJ IDEA 中为某个字段添加断点，当字段值有修改时，自动跳到相应方法位置

使用起来很简单：

1.  在字段定义处鼠标左键添加断点（会出现「眼睛」的图标）
2.  在「眼睛」图标上鼠标右键
3.  在弹框中勾选上`Field access` 和`Field modification` 两个选项

![image.gif](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/4-debug-skill-72c23537-3f66-4283-b939-a265b7628a1a.gif)

如果修改字段值的方法比较多，也可以在 `Condition` 的地方定义断点进入条件, 有了这个功能的加成，相信你阅读源码会顺畅许多

## 异常断点

除了阅读源码，一定是遇到了异常我们才开始调试代码，代码在抛出异常之后会自动停止，但是我们希望：

> 代码停在抛出异常之前，方便我们查看当时的变量信息

这时我们就用到了 `Exception Breakpoints`, 当抛出异常时，在 catch 的地方打上断点，可以通过下图的几个位置获取栈顶异常类型，比如这里的 `NumberFormatException`

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/4-debug-skill-c4c511af-b00d-458b-a4a1-97d1fe1e84b8.jpg)

知道异常类型后，就可以按照如下步骤添加异常断点了：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/4-debug-skill-4c35cab7-83d2-45b4-8a27-ebeceb41ce08.jpg)

然后在弹框中选择 NumberFormatException

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/4-debug-skill-a98e7885-1e84-4c38-8de1-ae04d3013176.gif)

重新以 Debug 模式运行程序：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/4-debug-skill-498ad99d-a15d-4a4e-a01b-b0c11cf8f72e.gif)

程序「一路绿灯式」定位到抛出异常的位置，同时指出当时的变量信息，三个字：稳，准，狠，还有谁？

## 方法断点

当阅读源码时，比如 Spring，一个接口的方法可能被多个子类实现，当运行时，需要查看调用栈逐步定位实现类，IDEA 同样支持在接口方法上添加断点（快捷键 `cmd+F8`/`ctrl+F8`）：

1.  鼠标左键在方法处点击断点（♦️形状）
2.  断点上鼠标右键

勾选上绿色框线上的内容，同样可以自定义跳转条件 Condition

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/4-debug-skill-b81dc459-5a9c-4e0e-b24e-350943299eda.jpg)

当以 Debug 模式运行程序的时候，会自动进入实现类的方法（注意断点形状）：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/4-debug-skill-edbc1de2-4dd6-49a3-9a6a-5948d19aabee.jpg)

看到这你应该想到常见的 Runnable 接口中的 run 方法了，同样是有作用的，大家可以自行去尝试了

## 总结

相信有以上四种调试技巧的加成，无论是工作debug 还是私下阅读源码，都可以轻松驾驭了。最后，来看看 IDEA 支持的各种断点调试类型，如果你只知道红色小圆点，那咱在留言区好好说说吧

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/ide/4-debug-skill-92ad72da-4bf1-4bc4-b21d-78c33114dc96.jpg)

-----

>作者：tan日拱一兵，转载链接：[https://mp.weixin.qq.com/s/KG0yzb_9XhhTSzjHr4DkIQ](https://mp.weixin.qq.com/s/KG0yzb_9XhhTSzjHr4DkIQ)

----

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

