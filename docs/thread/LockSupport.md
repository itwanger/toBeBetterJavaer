---
title: 深入理解Java并发线程阻塞唤醒类LockSupport
shortTitle: 线程阻塞唤醒类LockSupport
description: 深入理解Java并发线程阻塞唤醒类LockSupport
category:
  - Java核心
tag:
  - Java并发编程
head:
  - - meta
    - name: keywords
      content: Java,并发编程,多线程,Thread,LockSupport
---

# 深入理解Java并发线程阻塞唤醒类LockSupport


LockSupport位于java.util.concurrent.locks包下，有兴趣的可以直接去看源码，该类的方法并不是很多。LockSupprot是线程的阻塞原语，用来阻塞线程和唤醒线程。每个使用LockSupport的线程都会与一个许可关联，如果该许可可用，并且可在线程中使用，则调用park()将会立即返回，否则可能阻塞。如果许可尚不可用，则可以调用 unpark 使其可用。但是注意许可**不可重入**，也就是说只能调用一次park()方法，否则会一直阻塞。



LockSupport中的方法不多，这里将这些方法做一个总结：

## **阻塞线程**

1. `void park()`：阻塞当前线程，如果调用unpark方法或者当前线程被中断，从能从park()方法中返回
2. `void park(Object blocker)`：功能同方法1，入参增加一个Object对象，用来记录导致线程阻塞的阻塞对象，方便进行问题排查；
3. `void parkNanos(long nanos)`：阻塞当前线程，最长不超过nanos纳秒，增加了超时返回的特性；
4. `void parkNanos(Object blocker, long nanos)`：功能同方法3，入参增加一个Object对象，用来记录导致线程阻塞的阻塞对象，方便进行问题排查；
5. `void parkUntil(long deadline)`：阻塞当前线程，知道deadline；
6. `void parkUntil(Object blocker, long deadline)`：功能同方法5，入参增加一个Object对象，用来记录导致线程阻塞的阻塞对象，方便进行问题排查；

## **唤醒线程**

`void unpark(Thread thread)`:唤醒处于阻塞状态的指定线程

实际上LockSupport阻塞和唤醒线程的功能是依赖于sun.misc.Unsafe，这是一个很底层的类，有兴趣的可以去查阅资料，比如park()方法的功能实现则是靠unsafe.park()方法。

另外在阻塞线程这一系列方法中还有一个很有意思的现象就是，每个方法都会新增一个带有Object的阻塞对象的重载方法。那么增加了一个Object对象的入参会有什么不同的地方了？示例代码很简单就不说了，直接看dump线程的信息。

**调用park()方法dump线程**：

```java
"main" #1 prio=5 os_prio=0 tid=0x02cdcc00 nid=0x2b48 waiting on condition [0x00d6f000]
   java.lang.Thread.State: WAITING (parking)
        at sun.misc.Unsafe.park(Native Method)
        at java.util.concurrent.locks.LockSupport.park(LockSupport.java:304)
        at learn.LockSupportDemo.main(LockSupportDemo.java:7)
```

**调用park(Object blocker)方法dump线程**

```
"main" #1 prio=5 os_prio=0 tid=0x0069cc00 nid=0x6c0 waiting on condition [0x00dcf000]
   java.lang.Thread.State: WAITING (parking)
        at sun.misc.Unsafe.park(Native Method)
        - parking to wait for  <0x048c2d18> (a java.lang.String)
        at java.util.concurrent.locks.LockSupport.park(LockSupport.java:175)
        at learn.LockSupportDemo.main(LockSupportDemo.java:7)
```

通过分别调用这两个方法然后dump线程信息可以看出，带Object的park方法相较于无参的park方法会增加 `parking to wait for  <0x048c2d18> (a java.lang.String）`的信息，这种信息就类似于记录“案发现场”，有助于工程人员能够迅速发现问题解决问题。

有个有意思的事情是，我们都知道如果使用synchronzed阻塞了线程dump线程时都会有阻塞对象的描述，在java 5推出LockSupport时遗漏了这一点，在java 6时进行了补充。

还有一点需要需要的是：**synchronzed致使线程阻塞，线程会进入到BLOCKED状态，而调用LockSupprt方法阻塞线程会致使线程进入到WAITING状态。**

用一个很简单的例子说说这些方法怎么用。

```java
public class LockSupportDemo {
    public static void main(String[] args) {
        Thread thread = new Thread(() -> {
            LockSupport.park();
            System.out.println(Thread.currentThread().getName() + "被唤醒");
        });
        thread.start();
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        LockSupport.unpark(thread);
    }
}
```
thread线程调用LockSupport.park()致使thread阻塞，当mian线程睡眠3秒结束后通过LockSupport.unpark(thread)方法唤醒thread线程,thread线程被唤醒执行后续操作。另外，还有一点值得关注的是，**`LockSupport.unpark(thread)`可以指定线程对象唤醒指定的线程**。


---

>编辑：沉默王二，内容大部分来源以下三个开源仓库：
>- [深入浅出 Java 多线程](http://concurrent.redspider.group/)
>- [并发编程知识总结](https://github.com/CL0610/Java-concurrency)
>- [Java八股文](https://github.com/CoderLeixiaoshuai/java-eight-part)

----

GitHub 上标星 7600+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 7600+ 的 Java 教程](https://tobebetterjavaer.com/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
