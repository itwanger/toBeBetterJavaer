---
title: Java线程的6种状态及切换(透彻讲解)
shortTitle: Java线程的6种状态
description: 本文详细解析了Java线程的6种状态 — 新建、运行、阻塞、等待、定时等待和终止，以及这些状态之间的切换过程。这些深入的洞见将帮助您更好地理解并管理Java多线程程序的行为。理解这些基础知识对于优化Java程序和避免并发问题至关重要。
category:
  - Java核心
tag:
  - Java并发编程
head:
  - - meta
    - name: keywords
      content: Java,并发编程,多线程,Thread,线程状态
---

# 第三节：Java 线程的 6 种状态

我们先来看看操作系统中的线程状态转换。在[操作系统](https://javabetter.cn/xuexiluxian/os.html)中，线程被视为轻量级的进程，所以**线程状态其实和进程状态是一致的**。

![系统进程/线程转换图](https://cdn.tobebetterjavaer.com/stutymore/thread-state-and-method-20230829142956.png)

操作系统的线程主要有以下三个状态：

- 就绪状态(ready)：线程正在等待使用 CPU，经调度程序调用之后进入 running 状态。
- 执行状态(running)：线程正在使用 CPU。
- 等待状态(waiting): 线程经过等待事件的调用或者正在等待其他资源（如 I/O）。

然后我们来看 Java 线程的 6 个状态：

```java
// Thread.State 源码
public enum State {
    NEW,
    RUNNABLE,
    BLOCKED,
    WAITING,
    TIMED_WAITING,
    TERMINATED;
}
```

## NEW

处于 NEW 状态的线程此时尚未启动。这里的尚未启动指的是还没调用 Thread 实例的`start()`方法。

```java
private void testStateNew() {
    Thread thread = new Thread(() -> {});
    System.out.println(thread.getState()); // 输出 NEW
}
```

从上面可以看出，只是创建了线程而并没有调用 start 方法，此时线程处于 NEW 状态。

### 关于 start 的两个引申问题

1. 反复调用同一个线程的 start 方法是否可行？
2. 假如一个线程执行完毕（此时处于 TERMINATED 状态），再次调用这个线程的 start 方法是否可行？

要分析这两个问题，我们先来看看`start()`的源码：

```java
// 使用synchronized关键字保证这个方法是线程安全的
public synchronized void start() {
    // threadStatus != 0 表示这个线程已经被启动过或已经结束了
    // 如果试图再次启动这个线程，就会抛出IllegalThreadStateException异常
    if (threadStatus != 0)
        throw new IllegalThreadStateException();

    // 将这个线程添加到当前线程的线程组中
    group.add(this);

    // 声明一个变量，用于记录线程是否启动成功
    boolean started = false;
    try {
        // 使用native方法启动这个线程
        start0();
        // 如果没有抛出异常，那么started被设为true，表示线程启动成功
        started = true;
    } finally {
        // 在finally语句块中，无论try语句块中的代码是否抛出异常，都会执行
        try {
            // 如果线程没有启动成功，就从线程组中移除这个线程
            if (!started) {
                group.threadStartFailed(this);
            }
        } catch (Throwable ignore) {
            // 如果在移除线程的过程中发生了异常，我们选择忽略这个异常
        }
    }
}
```

可以看到，在`start()`内部，有一个 threadStatus 变量。如果它不等于 0，调用`start()`会直接抛出异常。

接着往下看，有一个 [native](https://javabetter.cn/oo/native-method.html) 的 `start0()` 方法。这个方法并没有对**threadStatus**进行处理。到这里我们仿佛拿这个 threadStatus 没辙了，通过 debug 再看一下:

```java
@Test
public void testStartMethod() {
    Thread thread = new Thread(() -> {});
    thread.start(); // 第一次调用
    thread.start(); // 第二次调用
}
```

在 start 方法内部的最开始打断点：

- 第一次调用时 threadStatus 的值是 0。
- 第二次调用时 threadStatus 的值不为 0。

查看当前线程状态的源码：

```java
// Thread.getState方法源码：
public State getState() {
    // get current thread state
    return sun.misc.VM.toThreadState(threadStatus);
}

// sun.misc.VM 源码：
// 如果线程的状态值和4做位与操作结果不为0，线程处于RUNNABLE状态。
// 如果线程的状态值和1024做位与操作结果不为0，线程处于BLOCKED状态。
// 如果线程的状态值和16做位与操作结果不为0，线程处于WAITING状态。
// 如果线程的状态值和32做位与操作结果不为0，线程处于TIMED_WAITING状态。
// 如果线程的状态值和2做位与操作结果不为0，线程处于TERMINATED状态。
// 最后，如果线程的状态值和1做位与操作结果为0，线程处于NEW状态，否则线程处于RUNNABLE状态。
public static State toThreadState(int var0) {
    if ((var0 & 4) != 0) {
        return State.RUNNABLE;
    } else if ((var0 & 1024) != 0) {
        return State.BLOCKED;
    } else if ((var0 & 16) != 0) {
        return State.WAITING;
    } else if ((var0 & 32) != 0) {
        return State.TIMED_WAITING;
    } else if ((var0 & 2) != 0) {
        return State.TERMINATED;
    } else {
        return (var0 & 1) == 0 ? State.NEW : State.RUNNABLE;
    }
}
```

还记得我们引申的两个问题吗？

1. 反复调用同一个线程的 start 方法是否可行？
2. 假如一个线程执行完毕（此时处于 TERMINATED 状态），再次调用这个线程的 start 方法是否可行？

结合上面的源码可以得到的答案是：

1. 都不行，在调用 start 之后，threadStatus 的值会改变（`threadStatus !=0`），再次调用 start 方法会抛出 IllegalThreadStateException 异常。
2. threadStatus 为 2 代表当前线程状态为 TERMINATED（下面会讲）。

## RUNNABLE

表示当前线程正在运行中。处于 RUNNABLE 状态的线程在 Java 虚拟机中运行，也有可能在等待 CPU 分配资源。

我们来看看 Thread 源码里对 RUNNABLE 状态的定义：

```java
/**
 * Thread state for a runnable thread.  A thread in the runnable
 * state is executing in the Java virtual machine but it may
 * be waiting for other resources from the operating system
 * such as processor.
 */
```

意思大家应该都能看得懂，不懂翻译一下（其实前面已经翻译过了）。

也就是说，Java 线程的**RUNNABLE**状态其实包括了操作系统线程的**ready**和**running**两个状态。

## BLOCKED

阻塞状态。处于 BLOCKED 状态的线程正等待[锁](https://javabetter.cn/thread/lock.html)（锁会在后面细讲）的释放以进入同步区。

我们用 BLOCKED 状态举个生活中的例子：

假如今天你下班后准备去食堂吃饭。你来到食堂仅有的一个窗口，发现前面已经有个人在窗口前了，此时你必须得等前面的人从窗口离开才行。 

假设你是线程 t2，你前面的那个人是线程 t1。此时 t1 占有了锁（食堂唯一的窗口），t2 正在等待锁的释放，所以此时 t2 就处于 BLOCKED 状态。

## WAITING

等待状态。处于等待状态的线程变成 RUNNABLE 状态需要其他线程唤醒。

调用下面这 3 个方法会使线程进入等待状态：

- `Object.wait()`：使当前线程处于等待状态直到另一个线程唤醒它；
- `Thread.join()`：等待线程执行完毕，底层调用的是 Object 的 wait 方法；
- `LockSupport.park()`：除非获得调用许可，否则禁用当前线程进行线程调度。[LockSupport](https://javabetter.cn/thread/LockSupport.html) 我们在后面会细讲。

我们延续上面的例子继续解释一下 WAITING 状态：

你等了好几分钟，终于轮到你了，突然你们有一个“不懂事”的经理来了。你看到他你就有一种不祥的预感，果然，他是来找你的。

他把你拉到一旁叫你待会儿再吃饭，说他下午要去作报告，赶紧来找你了解一下项目的情况。你心里虽然有一万个不愿意但是你还是从食堂窗口走开了。

此时，假设你还是线程 t2，你的经理是线程 t1。虽然你此时都占有锁（窗口）了，“不速之客”来了你还是得释放掉锁。此时你 t2 的状态就是 WAITING。然后经理 t1 获得锁，进入 RUNNABLE 状态。

要是经理 t1 不主动唤醒你 t2（notify、notifyAll..），可以说你 t2 只能一直等待了。

## TIMED_WAITING

超时等待状态。线程等待一个具体的时间，时间到后会被自动唤醒。

调用如下方法会使线程进入超时等待状态：

- `Thread.sleep(long millis)`：使当前线程睡眠指定时间；
- `Object.wait(long timeout)`：线程休眠指定时间，等待期间可以通过`notify()`/`notifyAll()`唤醒；
- `Thread.join(long millis)`：等待当前线程最多执行 millis 毫秒，如果 millis 为 0，则会一直执行；
- `LockSupport.parkNanos(long nanos)`： 除非获得调用许可，否则禁用当前线程进行线程调度指定时间；[LockSupport](https://javabetter.cn/thread/LockSupport.html) 我们在后面会细讲；
- `LockSupport.parkUntil(long deadline)`：同上，也是禁止线程进行调度指定时间；

我们继续延续上面的例子来解释一下 TIMED_WAITING 状态：

到了第二天中午，又到了饭点，你还是到了窗口前。

突然间想起你的同事叫你等他一起，他说让你等他十分钟他改个 bug。

好吧，那就等等吧，你就离开了窗口。很快十分钟过去了，你见他还没来，你想都等了这么久了还不来，那你还是先去吃饭好了。

这时你还是线程 t1，你改 bug 的同事是线程 t2。t2 让 t1 等待了指定时间，此时 t1 等待期间就属于 TIMED_WATING 状态。

t1 等待 10 分钟后，就自动唤醒，拥有了去争夺锁的资格。

## TERMINATED

终止状态。此时线程已执行完毕。

## 线程状态的转换

根据上面关于线程状态的介绍我们可以得到下面的**线程状态转换图**：

![](https://cdn.tobebetterjavaer.com/stutymore/thread-state-and-method-20230829143200.png)

### BLOCKED 与 RUNNABLE 状态的转换

我们在上面说过：处于 BLOCKED 状态的线程在等待锁的释放。假如这里有两个线程 a 和 b，a 线程提前获得了锁并暂未释放锁，此时 b 就处于 BLOCKED 状态。我们来看一个例子：

```java
@Test
public void blockedTest() {
    Thread a = new Thread(new Runnable() {
        @Override
        public void run() {
            testMethod();
        }
    }, "a");

    Thread b = new Thread(new Runnable() {
        @Override
        public void run() {
            testMethod();
        }
    }, "b");

    a.start();
    b.start();

    System.out.println(a.getName() + ":" + a.getState()); // 输出？
    System.out.println(b.getName() + ":" + b.getState()); // 输出？
}

// 同步方法争夺锁
private synchronized void testMethod() {
    try {
        Thread.sleep(2000L);
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
}
```

初看之下，大家可能会觉得线程 a 会先调用同步方法，同步方法内又调用了`Thread.sleep()`方法，必然会输出 TIMED_WAITING，而线程 b 因为等待线程 a 释放锁所以必然会输出 BLOCKED。

其实不然，有两点需要值得大家注意：

- 一是**在测试方法`blockedTest()`内还有一个 main 线程**
- 二是**启动线程后执行 run 方法还是需要消耗一定时间的**。

测试方法的 main 线程只保证了 a，b 两个线程调用 start 方法（转化为 RUNNABLE 状态），如果 CPU 执行效率高一点，还没等两个线程真正开始争夺锁，就已经打印此时两个线程的状态（RUNNABLE）了。

当然，如果 CPU 执行效率低一点，其中某个线程也是可能打印出 BLOCKED 状态的（此时两个线程已经开始争夺锁了）。

下面是我执行了几次的结果对比：

![](https://cdn.tobebetterjavaer.com/stutymore/thread-state-and-method-20230707215909.png)

这时你可能又会问了，要是我想要打印出 BLOCKED 状态我该怎么处理呢？

BLOCKED 状态的产生需要两个线程争夺锁才行。那我们处理下测试方法里的 main 线程就可以了，让它“休息一会儿”，调用一下`Thread.sleep()`方法。

这里需要注意的是 main 线程休息的时间，要保证在线程争夺锁的时间内，不要等到前一个线程锁都释放了你再去争夺锁，此时还是得不到 BLOCKED 状态的。

我们把上面的测试方法 blockedTest 改动一下：

```java
public void blockedTest() throws InterruptedException {
    ······
    a.start();
    Thread.sleep(1000L); // 需要注意这里main线程休眠了1000毫秒，而testMethod()里休眠了2000毫秒
    b.start();
    System.out.println(a.getName() + ":" + a.getState()); // 输出？
    System.out.println(b.getName() + ":" + b.getState()); // 输出？
}
```

运行结果如下所示：

![](https://cdn.tobebetterjavaer.com/stutymore/thread-state-and-method-20230707220120.png)

在这个例子中两个线程的状态转换如下

- a 的状态转换过程：RUNNABLE（`a.start()`） -> TIMED_WATING（`Thread.sleep()`）->RUNABLE（`sleep()`时间到）->_BLOCKED(未抢到锁)_ -> TERMINATED
- b 的状态转换过程：RUNNABLE（`b.start()`) -> _BLOCKED(未抢到锁)_ ->TERMINATED

斜体表示可能出现的状态， 大家可以在自己的电脑上多试几次看看输出。同样，这里的输出也可能有多钟结果。

### WAITING 状态与 RUNNABLE 状态的转换

根据转换图我们知道有 3 个方法可以使线程从 RUNNABLE 状态转为 WAITING 状态。我们主要介绍下**Object.wait()**和**Thread.join()**。

#### Object.wait()

调用`wait()`方法前线程必须持有对象的锁。

线程调用`wait()`方法时，会释放当前的锁，直到有其他线程调用`notify()`/`notifyAll()`方法唤醒等待锁的线程。

需要注意的是，其他线程调用`notify()`方法只会唤醒单个等待锁的线程，如有有多个线程都在等待这个锁的话不一定会唤醒到之前调用`wait()`方法的线程。

同样，调用`notifyAll()`方法唤醒所有等待锁的线程之后，也不一定会马上把时间片分给刚才放弃锁的那个线程，具体要看系统的调度。

#### Thread.join()

调用`join()`方法，会一直等待这个线程执行完毕（转换为 TERMINATED 状态）。

我们再把上面的例子线程启动那里改变一下：

```java
public void blockedTest() {
    ······
    a.start();
    a.join();
    b.start();
    System.out.println(a.getName() + ":" + a.getState()); // 输出 TERMINATED
    System.out.println(b.getName() + ":" + b.getState());
}
```

要是没有调用 join 方法，main 线程不管 a 线程是否执行完毕都会继续往下走。

a 线程启动之后马上调用了 join 方法，这里 main 线程就会等到 a 线程执行完毕，所以这里 a 线程打印的状态固定是**TERMINATED**。

至于 b 线程的状态，有可能打印 RUNNABLE（尚未进入同步方法），也有可能打印 TIMED_WAITING（进入了同步方法）。

### TIMED_WAITING 与 RUNNABLE 状态转换

TIMED_WAITING 与 WAITING 状态类似，只是 TIMED_WAITING 状态等待的时间是指定的。

#### Thread.sleep(long)

使当前线程睡眠指定时间。需要注意这里的“睡眠”只是暂时使线程停止执行，并不会释放锁。时间到后，线程会重新进入 RUNNABLE 状态。

#### Object.wait(long)

`wait(long)`方法使线程进入 TIMED_WAITING 状态。这里的`wait(long)`方法与无参方法 wait()相同的地方是，都可以通过其他线程调用`notify()`或`notifyAll()`方法来唤醒。

不同的地方是，有参方法`wait(long)`就算其他线程不来唤醒它，经过指定时间 long 之后它会自动唤醒，拥有去争夺锁的资格。

#### Thread.join(long)

`join(long)`使当前线程执行指定时间，并且使线程进入 TIMED_WAITING 状态。

我们再来改一改刚才的示例:

```java
public void blockedTest() {
    ······
    a.start();
    a.join(1000L);
    b.start();
    System.out.println(a.getName() + ":" + a.getState()); // 输出 TIEMD_WAITING
    System.out.println(b.getName() + ":" + b.getState());
}
```

这里调用`a.join(1000L)`，因为是指定了具体 a 线程执行的时间的，并且执行时间是小于 a 线程 sleep 的时间，所以 a 线程状态输出 TIMED_WAITING。

b 线程状态仍然不固定（RUNNABLE 或 BLOCKED）。

### 线程中断

在某些情况下，我们在线程启动后发现并不需要它继续执行下去时，需要中断线程。目前在 Java 里还没有安全方法来直接停止线程，但是 Java 提供了线程中断机制来处理需要中断线程的情况。

线程中断机制是一种协作机制。需要注意，通过中断操作并不能直接终止一个线程，而是通知需要被中断的线程自行处理。

简单介绍下 Thread 类里提供的关于线程中断的几个方法：

- `Thread.interrupt()`：中断线程。这里的中断线程并不会立即停止线程，而是设置线程的中断状态为 true（默认是 flase）；
- `Thread.currentThread().isInterrupted()`：测试当前线程是否被中断。线程的中断状态会受这个方法的影响，调用一次可以使线程中断状态变为 true，调用两次会使这个线程的中断状态重新转为 false；
- `Thread.isInterrupted()`：测试当前线程是否被中断。与上面方法不同的是调用这个方法并不会影响线程的中断状态。

在线程中断机制里，当其他线程通知需要被中断的线程后，线程中断的状态被设置为 true，但是具体被要求中断的线程要怎么处理，完全由被中断线程自己决定，可以在合适的时机中断请求，也可以完全不处理继续执行下去。

## 小结

本文详细解析了 Java 线程的 6 种状态 — 新建、运行、阻塞、等待、定时等待和终止，以及这些状态之间的切换过程。

>编辑：沉默王二，原文内容来源于朋友小七萤火虫开源的这个仓库：[深入浅出 Java 多线程](http://concurrent.redspider.group/)，强烈推荐。

---

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第二份 PDF 《[并发编程小册](https://javabetter.cn/thread/)》终于来了！包括线程的基本概念和使用方法、Java的内存模型、sychronized、volatile、CAS、AQS、ReentrantLock、线程池、并发容器、ThreadLocal、生产者消费者模型等面试和开发必须掌握的内容，共计 15 万余字，200+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，二哥的并发编程进阶之路.pdf](https://javabetter.cn/thread/)

[加入二哥的编程星球](https://javabetter.cn/thread/)，在星球的第二个置顶帖「[知识图谱](https://javabetter.cn/thread/)」里就可以获取 PDF 版本。

![](https://cdn.tobebetterjavaer.com/stutymore/wangzhe-thread-20230904125125.png)
