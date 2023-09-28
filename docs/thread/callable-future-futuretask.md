---
title: 获取 Java 线程执行结果：Callable、Future和FutureTask
shortTitle: 获取线程的执行结果
description: 本文深入解释了如何在Java中使用Callable、Future和FutureTask来获取多线程执行结果。无论你是Java新手还是经验丰富的开发者，你都能在这里找到有用的信息和技巧。点击了解更多。
category:
  - Java核心
tag:
  - Java并发编程
head:
  - - meta
    - name: keywords
      content: Java, 多线程, Callable, Future, FutureTask, 线程执行结果
---

# 第二节：获取线程的执行结果

[在第一节：初步掌握 Java 多线程中](https://javabetter.cn/thread/wangzhe-thread.html)，我们讲述了创建线程的 3 种方式，一种是直接继承 Thread，一种是实现 Runnable 接口，另外一种是实现 Callable 接口。

前 2 种方式都有一个缺陷：在执行完任务之后无法获取执行结果。

如果需要获取执行结果，就必须通过共享变量或者线程通信的方式来达到目的，这样使用起来就比较麻烦。

Java 1.5 提供了 Callable、Future、FutureTask，它们可以在任务执行完后得到执行结果，今天我们就来详细的了解一下。

## 无返回值的 Runnable

由于 `Runnable` 的 `run()` 方法的返回值为 void：

```java
public interface Runnable {
    public abstract void run();
}
```

所以在执行完任务之后无法返回任何结果。

## 有返回值的 Callable

Callable 位于 `java.util.concurrent` 包下，也是一个接口，它定义了一个 `call()` 方法：

```java
public interface Callable<V> {
    V call() throws Exception;
}
```

可以看到，`call()` 方法返回的类型是一个 V 类型的[泛型](https://javabetter.cn/basic-extra-meal/generic.html)。

那怎么使用 Callable 呢？

一般会配合 [ExecutorService](https://javabetter.cn/thread/pool.html)（后面在讲线程池的时候会细讲，这里记住就行）来使用。

ExecutorService 是一个接口，位于 `java.util.concurrent` 包下，它是 Java 线程池框架的核心接口，用来异步执行任务。它提供了一些关键方法用来进行线程管理。

![](https://cdn.tobebetterjavaer.com/stutymore/callable-future-futuretask-20230619105509.png)

下面的例子就用到了 [ExecutorService](https://javabetter.cn/thread/pool.html) 的 submit 方法。

```java
// 创建一个包含5个线程的线程池
ExecutorService executorService = Executors.newFixedThreadPool(5);

// 创建一个Callable任务
Callable<String> task = new Callable<String>() {
    public String call() {
        return "Hello from " + Thread.currentThread().getName();
    }
};

// 提交任务到ExecutorService执行，并获取Future对象
Future[] futures = new Future[10];
for (int i = 0; i < 10; i++) {
    futures[i] = executorService.submit(task);
}

// 通过Future对象获取任务的结果
for (int i = 0; i < 10; i++) {
    System.out.println(futures[i].get());
}

// 关闭ExecutorService，不再接受新的任务，等待所有已提交的任务完成
executorService.shutdown();
```

我们通过 [Executors 工具类](https://javabetter.cn/thread/pool.html)来创建一个 ExecutorService，然后向里面提交 Callable 任务，然后通过 Future 来获取执行结果。

为了做对比，我们再来看一下使用 Runnable 的方式：

```java
// 创建一个包含5个线程的线程池
ExecutorService executorService = Executors.newFixedThreadPool(5);

// 创建一个Runnable任务
Runnable task = new Runnable() {
    public void run() {
        System.out.println("Hello from " + Thread.currentThread().getName());
    }
};

// 提交任务到ExecutorService执行
for (int i = 0; i < 10; i++) {
    executorService.submit(task);
}

// 关闭ExecutorService，不再接受新的任务，等待所有已提交的任务完成
executorService.shutdown();
```

可以看到，使用 Runnable 的方式要比 Callable 的方式简单一些，但是 Callable 的方式可以获取执行结果，这是 Runnable 做不到的。

## 异步计算结果 Future 接口

在前面的例子中，我们通过 Future 来获取 Callable 任务的执行结果，那么 Future 是什么呢？

Future 位于 `java.util.concurrent` 包下，它是一个接口：

```java
public interface Future<V> {
    boolean cancel(boolean mayInterruptIfRunning);
    boolean isCancelled();
    boolean isDone();
    V get() throws InterruptedException, ExecutionException;
    V get(long timeout, TimeUnit unit)
        throws InterruptedException, ExecutionException, TimeoutException;
}
```

一共声明了 5 个方法：

- `cancel()` 方法用来取消任务，如果取消任务成功则返回 true，如果取消任务失败则返回 false。参数 mayInterruptIfRunning 表示是否允许取消正在执行却没有执行完毕的任务，如果设置 true，则表示可以取消正在执行过程中的任务。如果任务已经完成，则无论 mayInterruptIfRunning 为 true 还是 false，此方法肯定返回 false，即如果取消已经完成的任务会返回 false；如果任务正在执行，若 mayInterruptIfRunning 设置为 true，则返回 true，若 mayInterruptIfRunning 设置为 false，则返回 false；如果任务还没有执行，则无论 mayInterruptIfRunning 为 true 还是 false，肯定返回 true。
- `isCancelled()` 方法表示任务是否被取消成功，如果在任务正常完成前被取消成功，则返回 true。
- `isDone()` 方法表示任务是否已经完成，若任务完成，则返回 true；
- `get()`方法用来获取执行结果，这个方法会产生阻塞，会一直等到任务执行完毕才返回；
- `get(long timeout, TimeUnit unit)`用来获取执行结果，如果在指定时间内，还没获取到结果，就直接返回 null。

也就是说 Future 提供了三种功能：

- 1）判断任务是否完成；
- 2）能够中断任务；
- 3）能够获取任务执行结果。

由于 Future 只是一个接口，如果直接 new 的话，编译器是会有一个 ⚠️ 警告的，它会提醒我们最好使用 FutureTask。

![](https://cdn.tobebetterjavaer.com/stutymore/callable-future-futuretask-20230619111245.png)

实际上，FutureTask 是 Future 接口的一个唯一实现类，我们在前面的例子中 `executorService.submit()` 返回的就是 FutureTask，通过 debug 模式可以观察到。

![](https://cdn.tobebetterjavaer.com/stutymore/callable-future-futuretask-20230619111830.png)

## 异步计算结果 FutureTask 实现类

我们来看一下 FutureTask 的实现：

```java
public class FutureTask<V> implements RunnableFuture<V>
```

FutureTask 类实现了 RunnableFuture 接口，我们看一下 RunnableFuture 接口的实现：

```java
public interface RunnableFuture<V> extends Runnable, Future<V> {
    void run();
}
```

可以看出 RunnableFuture 继承了 Runnable 接口和 Future 接口，而 FutureTask 实现了 RunnableFuture 接口。所以它既可以作为 Runnable 被线程执行，又可以作为 Future 得到 Callable 的返回值。

FutureTask 提供了 2 个构造器：

```java
public FutureTask(Callable<V> callable) {
}
public FutureTask(Runnable runnable, V result) {
}
```

当需要异步执行一个计算并在稍后的某个时间点获取其结果时，就可以使用 FutureTask。来个例子

```java
// 创建一个固定大小的线程池
ExecutorService executorService = Executors.newFixedThreadPool(3);

// 创建一系列 Callable
Callable<Integer>[] tasks = new Callable[5];
for (int i = 0; i < tasks.length; i++) {
    final int index = i;
    tasks[i] = new Callable<Integer>() {
        @Override
        public Integer call() throws Exception {
            TimeUnit.SECONDS.sleep(index + 1);
            return (index + 1) * 100;
        }
    };
}

// 将 Callable 包装为 FutureTask，并提交到线程池
FutureTask<Integer>[] futureTasks = new FutureTask[tasks.length];
for (int i = 0; i < tasks.length; i++) {
    futureTasks[i] = new FutureTask<>(tasks[i]);
    executorService.submit(futureTasks[i]);
}

// 获取任务结果
for (int i = 0; i < futureTasks.length; i++) {
    System.out.println("Result of task" + (i + 1) + ": " + futureTasks[i].get());
}

// 关闭线程池
executorService.shutdown();
```

来看一下输出结果

```
Result of task1: 100
Result of task2: 200
Result of task3: 300
Result of task4: 400
Result of task5: 500
```

## 小结

本文深入解释了如何在 Java 中使用 Callable、Future 和 FutureTask 来获取多线程执行结果。

---

GitHub 上标星 9300+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第二份 PDF 《[并发编程小册](https://javabetter.cn/thread/)》终于来了！包括线程的基本概念和使用方法、Java的内存模型、sychronized、volatile、CAS、AQS、ReentrantLock、线程池、并发容器、ThreadLocal、生产者消费者模型等面试和开发必须掌握的内容，共计 15 万余字，200+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，二哥的并发编程进阶之路.pdf](https://javabetter.cn/thread/)

[加入二哥的编程星球](https://javabetter.cn/thread/)，在星球的第二个置顶帖「[知识图谱](https://javabetter.cn/thread/)」里就可以获取 PDF 版本。

![](https://cdn.tobebetterjavaer.com/stutymore/wangzhe-thread-20230904125125.png)
