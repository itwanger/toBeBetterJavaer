---
title: 深入理解Java并发线程阻塞唤醒类LockSupport
shortTitle: 线程阻塞唤醒类LockSupport
description: LockSupport 是 Java 并发包中的一个用于线程阻塞和唤醒的工具类。与 wait/notify 或 Condition 不同，LockSupport 不需要在同步块或使用特定的锁对象中工作。它提供了更底层、更灵活的线程调度机制。
category:
  - Java核心
tag:
  - Java并发编程
head:
  - - meta
    - name: keywords
      content: Java,并发编程,多线程,Thread,LockSupport
---

# 第十八节：线程阻塞唤醒类 LockSupport

LockSupport 位于`java.util.concurrent.locks`包下，我们只讲在[讲 Lock 包的时候也讲过](https://javabetter.cn/thread/lock.html)，大家还有印象没？

LockSupprot 是线程的阻塞原语，用来阻塞线程和唤醒线程。每个使用 LockSupport 的线程都会与一个许可关联，如果该许可可用，并且可在线程中使用，则调用 `park()` 会立即返回，否则可能阻塞。如果许可尚不可用，则可以调用 unpark 使其可用。但是注意许可**不可重入**，也就是说只能调用一次 `park()` 方法，否则会一直阻塞。

LockSupport 中的方法不多，这里将这些方法做一个总结：

## **阻塞线程**

1. `void park()`：阻塞当前线程，如果调用 unpark 方法或线程被中断，则该线程将变得可运行。请注意，park 不会抛出 InterruptedException，因此线程必须单独检查其中断状态。
2. `void park(Object blocker)`：功能同方法 1，入参增加一个 Object 对象，用来记录导致线程阻塞的对象，方便问题排查。
3. `void parkNanos(long nanos)`：阻塞当前线程一定的纳秒时间，或直到被 unpark 调用，或线程被中断。
4. `void parkNanos(Object blocker, long nanos)`：功能同方法 3，入参增加一个 Object 对象，用来记录导致线程阻塞的对象，方便问题排查。
5. `void parkUntil(long deadline)`：阻塞当前线程直到某个指定的截止时间（以毫秒为单位），或直到被 unpark 调用，或线程被中断。
6. `void parkUntil(Object blocker, long deadline)`：功能同方法 5，入参增加一个 Object 对象，用来记录导致线程阻塞的对象，方便问题排查。

## **唤醒线程**

`void unpark(Thread thread)`：唤醒一个由 park 方法阻塞的线程。如果该线程未被阻塞，那么下一次调用 park 时将立即返回。这允许“先发制人”式的唤醒机制。

实际上，LockSupport 阻塞和唤醒线程的功能依赖于 `sun.misc.Unsafe`，这是一个很底层的类，感兴趣的小伙伴可以看看美团技术出品的[这篇文章](https://tech.meituan.com/2019/02/14/talk-about-java-magic-class-unsafe.html)，比如 park 方法是通过 `unsafe.park()` 方法实现的。

另外在阻塞线程这块，有一个很有意思的现象，每个方法都会新增一个带有 Object 的阻塞对象的重载方法，直接看 dump 线程的信息。

"Dump 线程"通常是指获取线程的当前状态和调用堆栈的详细快照。这可以提供关于线程正在执行什么操作以及线程在代码的哪个部分的重要信息。

下面是线程转储中可能包括的一些信息：

- 线程ID和名称：线程的唯一标识符和可读名称。
- 线程状态：线程的当前状态，例如运行（RUNNABLE）、等待（WAITING）、睡眠（TIMED_WAITING）或阻塞（BLOCKED）。
- 调用堆栈：线程的调用堆栈跟踪，显示线程从当前执行点回溯到初始调用的完整方法调用序列。
- 锁信息：如果线程正在等待或持有锁，线程转储通常还包括有关这些锁的信息。

线程转储可以通过各种方式获得，例如使用 Java 的 jstack 工具，或从 Java VisualVM、Java Mission Control 等工具获取。

下面是一个简单的例子，通过 LockSupport 阻塞线程，然后通过 Intellij IDEA 查看 dump 线程信息。

```java
public class LockSupportDemo {
    public static void main(String[] args) {
        LockSupport.park();
    }
}
```

运行，然后再 Run 面板中点击「attach debugger」。

![](https://cdn.tobebetterjavaer.com/stutymore/LockSupport-20230816130537.png)

然后在 debugger 面板中右键选择「export thread」。

![](https://cdn.tobebetterjavaer.com/stutymore/LockSupport-20230816130629.png)

就可以看了 Dump 线程信息了。

![](https://cdn.tobebetterjavaer.com/stutymore/LockSupport-20230816130730.png)

**调用 park()方法 dump 线程**：

```
"main" #1 prio=5 os_prio=0 tid=0x02cdcc00 nid=0x2b48 waiting on condition [0x00d6f000]
   java.lang.Thread.State: WAITING (parking)
        at sun.misc.Unsafe.park(Native Method)
        at java.util.concurrent.locks.LockSupport.park(LockSupport.java:304)
        at learn.LockSupportDemo.main(LockSupportDemo.java:7)
```

**调用 park(Object blocker)方法 dump 线程**

```
"main" #1 prio=5 os_prio=0 tid=0x0069cc00 nid=0x6c0 waiting on condition [0x00dcf000]
   java.lang.Thread.State: WAITING (parking)
        at sun.misc.Unsafe.park(Native Method)
        - parking to wait for  <0x048c2d18> (a java.lang.String)
        at java.util.concurrent.locks.LockSupport.park(LockSupport.java:175)
        at learn.LockSupportDemo.main(LockSupportDemo.java:7)
```

分别调用无参和有参的 park 方法，然后通过 dump 线程信息可以看出，带 Object 的 park 方法相较于无参的 park 方法会增加 `parking to wait for  <0x048c2d18> (a java.lang.String）`的信息，这种信息类似于记录“案发现场”，有助于我们开发者迅速发现问题并解决问题。

有意思的事情是，Java 1.5 推出 LockSupport 时遗漏了阻塞信息的描述，于是在 Java 1.6 的时候进行了补充。

还有一点需要注意的是：**[synchronzed](https://javabetter.cn/thread/synchronized-1.html) 会使线程阻塞，线程会进入 BLOCKED 状态，而调用 LockSupprt 方法阻塞线程会使线程进入到 WAITING 状态。**

来一个简单的例子演示一下该怎么用。

```java
public class LockSupportExample {
    public static void main(String[] args) {
        Thread thread = new Thread(() -> {
            System.out.println("Thread is parked now");
            LockSupport.park();
            System.out.println("Thread is unparked now");
        });

        thread.start();

        try {
            Thread.sleep(3000); // 主线程等待3秒
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        LockSupport.unpark(thread); // 主线程唤醒阻塞的线程
    }
}
```

thread 线程调用 `LockSupport.park()` 使 thread 阻塞，当 mian 线程睡眠 3 秒结束后通过 `LockSupport.unpark(thread)` 方法唤醒 thread 线程，thread 线程被唤醒后会执行后续的操作。另外，**`LockSupport.unpark(thread)`可以指定线程对象唤醒指定的线程**。

运行结果：

```
Thread is parked now
Thread is unparked now
```

## 总结

LockSupport 提供了一种更底层和灵活的线程调度方式。它不依赖于同步块或特定的锁对象。可以用于构建更复杂的同步结构，例如自定义锁或并发容器。LockSupport.park 与 LockSupport.unpark 的组合使得线程之间的精确控制变得更容易，而不需要复杂的同步逻辑和对象监视。



>编辑：沉默王二，编辑前的内容主要来自于CL0610的 GitHub 仓库[https://github.com/CL0610/Java-concurrency](https://github.com/CL0610/Java-concurrency/blob/master/13.LockSupport%E5%B7%A5%E5%85%B7/LockSupport%E5%B7%A5%E5%85%B7.md)

---

GitHub 上标星 9000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括 Java 基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM 等等，共计 32 万余字，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 9000+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
