---
title: 如何通过线程组管理线程，以及如何设置线程的优先级
shortTitle: 线程组和线程优先级
description: Java 提供了 ThreadGroup 类来创建一组相关的线程，使线程组管理更方便。每个 Java 线程都有一个优先级，这个优先级会影响到操作系统为这个线程分配处理器时间的顺序。
category:
  - Java核心
tag:
  - Java并发编程
head:
  - - meta
    - name: keywords
      content: Java,并发编程,多线程,Thread,线程组,线程优先级
---

# 第四节：线程组和线程优先级

Java 提供了 ThreadGroup 类来创建一组相关的线程，使线程组管理更方便。每个 Java 线程都有一个优先级，这个优先级会影响到操作系统为这个线程分配处理器时间的顺序。

这篇内容将分别来介绍一下线程组和线程优先级。

## 线程组(ThreadGroup)

Java 用 ThreadGroup 来表示线程组，我们可以通过线程组对线程进行批量控制。

ThreadGroup 和 Thread 的关系就如同他们的字面意思一样简单粗暴，每个 Thread 必然存在于一个 ThreadGroup 中，Thread 不能独立于 ThreadGroup 存在。执行`main()`方法的线程名字是 main，如果在 new Thread 时没有显式指定，那么默认将父线程（当前执行 new Thread 的线程）线程组设置为自己的线程组。

示例代码：

```java
Thread testThread = new Thread(() -> {
    System.out.println("testThread当前线程组名字：" +
            Thread.currentThread().getThreadGroup().getName());
    System.out.println("testThread线程名字：" +
            Thread.currentThread().getName());
});

testThread.start();
System.out.println("执行main所在线程的线程组名字： " + Thread.currentThread().getThreadGroup().getName());
System.out.println("执行main方法线程名字：" + Thread.currentThread().getName());
```

输出结果：

```java
执行main所在线程的线程组名字： main
testThread当前线程组名字：main
testThread线程名字：Thread-0
执行main方法线程名字：main
```

ThreadGroup 是一个标准的**向下引用**的树状结构，这样设计可以**防止"上级"线程被"下级"线程引用而无法有效地被 GC 回收**。

### 线程组的常用方法及数据结构

#### 获取当前线程的线程组名字

```java
Thread.currentThread().getThreadGroup().getName()
```

#### 复制线程组

```java
// 获取当前的线程组
ThreadGroup threadGroup = Thread.currentThread().getThreadGroup();
// 复制一个线程组到一个线程数组（获取Thread信息）
Thread[] threads = new Thread[threadGroup.activeCount()];
threadGroup.enumerate(threads);
```

#### 线程组统一异常处理

```java
// 创建一个线程组，并重新定义异常
ThreadGroup group = new ThreadGroup("testGroup") {
    @Override
    public void uncaughtException(Thread t, Throwable e) {
        System.out.println(t.getName() + ": " + e.getMessage());
    }
};

// 测试异常
Thread thread = new Thread(group, () -> {
    // 抛出 unchecked 异常
    throw new RuntimeException("测试异常");
});

// 启动线程
thread.start();
```

#### 线程组的数据结构

线程组还可以包含其他的线程组，不仅仅是线程。首先看看 `ThreadGroup`源码中的成员变量。

```java
public class ThreadGroup implements Thread.UncaughtExceptionHandler {
    private final ThreadGroup parent; // 父亲ThreadGroup
    String name; // ThreadGroup 的名称
    int maxPriority; // 最大优先级
    boolean destroyed; // 是否被销毁
    boolean daemon; // 是否守护线程
    boolean vmAllowSuspension; // 是否可以中断

    int nUnstartedThreads = 0; // 还未启动的线程
    int nthreads; // ThreadGroup中线程数目
    Thread threads[]; // ThreadGroup中的线程

    int ngroups; // 线程组数目
    ThreadGroup groups[]; // 线程组数组
}
```

然后看看构造方法：

```java
// 私有构造方法
private ThreadGroup() {
    this.name = "system";
    this.maxPriority = Thread.MAX_PRIORITY;
    this.parent = null;
}

// 默认是以当前ThreadGroup作为parent ThreadGroup，新线程组的父线程组是目前正在运行线程的线程组。
public ThreadGroup(String name) {
    this(Thread.currentThread().getThreadGroup(), name);
}

// 构造方法
public ThreadGroup(ThreadGroup parent, String name) {
    this(checkParentAccess(parent), parent, name);
}

// 私有构造方法，主要的构造函数
private ThreadGroup(Void unused, ThreadGroup parent, String name) {
    this.name = name;
    this.maxPriority = parent.maxPriority;
    this.daemon = parent.daemon;
    this.vmAllowSuspension = parent.vmAllowSuspension;
    this.parent = parent;
    parent.add(this);
}
```

第三个构造方法里调用了`checkParentAccess`方法，来看看这个方法的源码：

```java
// 检查parent ThreadGroup
private static Void checkParentAccess(ThreadGroup parent) {
    parent.checkAccess();
    return null;
}

// 判断当前运行的线程是否具有修改线程组的权限
public final void checkAccess() {
    SecurityManager security = System.getSecurityManager();
    if (security != null) {
        security.checkAccess(this);
    }
}
```

这里涉及到`SecurityManager`这个类，它是 Java 的安全管理器，它允许应用程序在执行一个可能不安全或敏感的操作前确定该操作是什么，以及是否允许在执行该操作的上下文中执行它。

比如引入了第三方类库，但是并不能保证它的安全性。

其实 Thread 类也有一个 checkAccess 方法，不过是用来当前运行的线程是否有权限修改被调用的这个线程实例。（Determines if the currently running thread has permission to modify this thread.）

总结一下，线程组是一个树状的结构，每个线程组下面可以有多个线程或者线程组。线程组可以起到统一控制线程的优先级和检查线程权限的作用。

## 线程的优先级

线程优先级可以指定，范围是 1~10。但并不是所有的操作系统都支持 10 级优先级的划分（比如有些操作系统只支持 3 级划分：低、中、高），Java 只是给操作系统一个优先级的**参考值**，线程最终**在操作系统中的优先级**还是由操作系统决定。

Java 默认的线程优先级为 5，线程的执行顺序由调度程序来决定，线程的优先级会在线程被调用之前设定。

通常情况下，高优先级的线程将会比低优先级的线程有**更高的概率**得到执行。`Thread`类的`setPriority()`方法可以用来设定线程的优先级。

```java
Thread a = new Thread();
System.out.println("我是默认线程优先级："+a.getPriority());
Thread b = new Thread();
b.setPriority(10);
System.out.println("我是设置过的线程优先级："+b.getPriority());
```

输出结果：

```java
我是默认线程优先级：5
我是设置过的线程优先级：10
```

既然有 10 个级别来设定线程的优先级，那是不是可以在业务实现的时候，采用这种方法来指定线程执行的先后顺序呢？

对于这个问题，答案是：No!

Java 中的优先级不是特别的可靠，**Java 程序中对线程所设置的优先级只是给操作系统一个建议，操作系统不一定会采纳。而真正的调用顺序，是由操作系统的线程调度算法来决定的**。

我们通过代码来验证一下：

```java
static class MyThread extends Thread {
    @Override
    public void run() {
        // 输出当前线程的名字和优先级
        System.out.println("MyThread当前线程：" + Thread.currentThread().getName()
                + ",优先级：" + Thread.currentThread().getPriority());
    }
}

public static void main(String[] args) {
    // 创建 10 个线程，从 1-10 运行，优先级从 1-10
    for (int i = 1; i <= 10; i++) {
        Thread thread = new MyThread();
        thread.setName("线程" + i);
        thread.setPriority(i);
        thread.start();
    }
}
```

运行该程序，有时候可以按照优先级执行，有时却不行，这是某次输出：

```java
MyThread当前线程：线程2,优先级：2
MyThread当前线程：线程4,优先级：4
MyThread当前线程：线程3,优先级：3
MyThread当前线程：线程5,优先级：5
MyThread当前线程：线程1,优先级：1
MyThread当前线程：线程6,优先级：6
MyThread当前线程：线程7,优先级：7
MyThread当前线程：线程8,优先级：8
MyThread当前线程：线程9,优先级：9
MyThread当前线程：线程10,优先级：10
```

Java 提供了一个**线程调度器**来监视和控制处于**RUNNABLE 状态**的线程。

- 线程的调度策略采用**抢占式**的方式，优先级高的线程会比优先级低的线程有更大的几率优先执行。
- 在优先级相同的情况下，会按照“先到先得”的原则执行。
- 每个 Java 程序都有一个默认的主线程，就是通过 JVM 启动的第一个线程——main 线程。

还有一种特殊的线程，叫做**守护线程（Daemon）**，守护线程默认的优先级比较低。

- 如果某线程是守护线程，那如果所有的非守护线程都结束了，这个守护线程也会自动结束。
- 当所有的非守护线程结束时，守护线程会自动关闭，这就免去了还要继续关闭子线程的麻烦。
- 线程默认是非守护线程，可以通过 Thread 类的 setDaemon 方法来设置为守护线程。

## 线程组和线程优先级之间的关系

之前我们谈到一个线程必然存在于一个线程组中，那么当线程和线程组的优先级不一致的时候会怎样呢？我们来验证一下：

```java
 // 创建一个线程组
ThreadGroup group = new ThreadGroup("testGroup");
// 将线程组的优先级指定为 7
group.setMaxPriority(7);
// 创建一个线程，将该线程加入到 group 中
Thread thread = new Thread(group, "test-thread");
// 企图将线程的优先级设定为 10
thread.setPriority(10);
// 输出线程组的优先级和线程的优先级
System.out.println("线程组的优先级是：" + group.getMaxPriority());
System.out.println("线程的优先级是：" + thread.getPriority());
```

输出：

```
线程组的优先级是：7
线程的优先级是：7
```

所以，如果某个线程的优先级大于线程所在**线程组的最大优先级**，那么该线程的优先级将会失效，取而代之的是线程组的最大优先级。

## 小结

Java 提供了 ThreadGroup 类来创建一组相关的线程，使线程组管理更方便；每个 Java 线程都有一个优先级，这个优先级会影响到操作系统为这个线程分配处理器时间的顺序。

>编辑：沉默王二，原文内容来源于朋友小七萤火虫开源的这个仓库：[深入浅出 Java 多线程](http://concurrent.redspider.group/)，强烈推荐。

---

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第二份 PDF 《[并发编程小册](https://javabetter.cn/thread/)》终于来了！包括线程的基本概念和使用方法、Java的内存模型、sychronized、volatile、CAS、AQS、ReentrantLock、线程池、并发容器、ThreadLocal、生产者消费者模型等面试和开发必须掌握的内容，共计 15 万余字，200+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，二哥的并发编程进阶之路.pdf](https://javabetter.cn/thread/)

[加入二哥的编程星球](https://javabetter.cn/thread/)，在星球的第二个置顶帖「[知识图谱](https://javabetter.cn/thread/)」里就可以获取 PDF 版本。

![](https://cdn.tobebetterjavaer.com/stutymore/wangzhe-thread-20230904125125.png)
