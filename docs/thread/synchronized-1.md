---
title: 面了一个25岁的学妹，把synchronized关键字讲的那叫一个透彻
shortTitle: synchronized关键字
description: 在 Java 中，synchronized 是一个关键字，用于控制多线程环境下的同步访问，它可以防止多个线程同时访问同一代码块或同一对象，从而保证数据的完整性和一致性。
category:
  - Java核心
tag:
  - Java并发编程
head:
  - - meta
    - name: keywords
      content: Java,并发编程,多线程,Thread,synchronized
---

# 第九节：synchronized关键字

“三妹，今天我们来学习 synchronized 关键字吧。”我瞅了一眼坐在沙发上的三妹说，她正在王者荣耀呢。

三妹（颜值在线，气质也在线）喝了一口冰可乐接着说：“好的，二哥。马上，打完这把，看我三杀。”

在 Java 中，关键字 synchronized 可以保证在同一个时刻，只有一个线程可以执行某个方法或者某个代码块(主要是对方法或者代码块中存在共享数据的操作)，同时我们还应该注意到 synchronized 的另外一个重要的作用，synchronized 可保证一个线程的变化(主要是共享数据的变化)被其他线程所看到（保证可见性，完全可以替代 [volatile](https://javabetter.cn/thread/volatile.html) 功能）。

synchronized 关键字最主要有以下 3 种应用方式：

- 同步方法，为当前对象（[this](https://javabetter.cn/oo/this-super.html)）加锁，进入同步代码前要获得当前对象的锁；
- 同步静态方法，为当前类加锁（锁的是 [Class 对象](https://javabetter.cn/basic-extra-meal/fanshe.html)），进入同步代码前要获得当前类的锁；
- 同步代码块，指定加锁对象，对给定对象加锁，进入同步代码库前要获得给定对象的锁。

## synchronized同步方法

通过在方法声明中加入 synchronized 关键字，可以保证在任意时刻，只有一个线程能执行该方法。

来看代码：

```java
public class AccountingSync implements Runnable {
    //共享资源(临界资源)
    static int i = 0;
    // synchronized 同步方法
    public synchronized void increase() {
        i ++;
    }
    @Override
    public void run() {
        for(int j=0;j<1000000;j++){
            increase();
        }
    }
    public static void main(String args[]) throws InterruptedException {
        AccountingSync instance = new AccountingSync();
        Thread t1 = new Thread(instance);
        Thread t2 = new Thread(instance);
        t1.start();
        t2.start();
        t1.join();
        t2.join();
        System.out.println("static, i output:" + i);
    }
}
```

输出结果：

```
/**
 * 输出结果:
 * static, i output:2000000
 */
```

如果在方法 `increase()` 前不加 synchronized，因为 i++ 不具备原子性，所以最终结果会小于 2000000，具体分析可以参考《[volatile](https://javabetter.cn/thread/volatile.html)》的内容。

>注意：一个对象只有一把锁，当一个线程获取了该对象的锁之后，其他线程无法获取该对象的锁，所以无法访问该对象的其他 synchronized 方法，但是其他线程还是可以访问该对象的其他非 synchronized 方法。

但是，如果一个线程 A 需要访问对象 obj1 的 synchronized 方法 f1(当前对象锁是 obj1)，另一个线程 B 需要访问对象 obj2 的 synchronized 方法 f2(当前对象锁是 obj2)，这样是允许的：

```java
public class AccountingSyncBad implements Runnable {
    //共享资源(临界资源)
    static int i = 0;
    // synchronized 同步方法
    public synchronized void increase() {
        i ++;
    }

    @Override
    public void run() {
        for(int j=0;j<1000000;j++){
            increase();
        }
    }

    public static void main(String args[]) throws InterruptedException {
        // new 两个AccountingSync新实例
        Thread t1 = new Thread(new AccountingSyncBad());
        Thread t2 = new Thread(new AccountingSyncBad());
        t1.start();
        t2.start();
        t1.join();
        t2.join();
        System.out.println("static, i output:" + i);
    }
}
```

输出结果：

```
/**
 * 输出结果:
 * static, i output:1224617
 */
```

上述代码与前面不同的是，我们创建了两个对象 AccountingSyncBad，然后启动两个不同的线程对共享变量 i 进行操作，但很遗憾，操作结果是 1224617 而不是期望的结果 2000000。

因为上述代码犯了严重的错误，虽然使用了 synchronized 同步 increase 方法，但却 new 了两个不同的对象，这也就意味着存在着两个不同的对象锁，因此 t1 和 t2 都会进入各自的对象锁，也就是说 t1 和 t2 线程使用的是不同的锁，因此线程安全是无法保证的。

> 每个对象都有一个对象锁，不同的对象，他们的锁不会互相影响。

解决这种问题的的方式是将 synchronized 作用于静态的 increase 方法，这样的话，对象锁就锁的是当前的类，由于无论创建多少个对象，类永远只有一个，所有在这样的情况下对象锁就是唯一的。

参考：[对象和类](https://javabetter.cn/oo/object-class.html)

## synchronized同步静态方法

当 synchronized 同步[静态方法](https://javabetter.cn/oo/static.html)时，锁的是当前类的 Class 对象，不属于某个对象。当前类的 Class 对象锁被获取，不影响实例对象锁的获取，两者互不影响，本质上是 this 和 Class 的不同。

由于静态成员变量不专属于任何一个对象，因此通过 Class 锁可以控制静态成员变量的并发操作。

需要注意的是如果线程 A 调用了一个对象的非静态 synchronized 方法，线程 B 需要调用这个对象所属类的静态 synchronized 方法，是不会发生互斥的，因为访问静态 synchronized 方法占用的锁是当前类的 [Class 对象](https://javabetter.cn/basic-extra-meal/fanshe.html)，而访问非静态 synchronized 方法占用的锁是当前对象（this）的锁，看如下代码：

```java
public class AccountingSyncClass implements Runnable {
    static int i = 0;
    /**
     * 同步静态方法,锁是当前class对象，也就是
     * AccountingSyncClass类对应的class对象
     */
    public static synchronized void increase() {
        i++;
    }
    // 非静态,访问时锁不一样不会发生互斥
    public synchronized void increase4Obj() {
        i++;
    }
    @Override
    public void run() {
        for(int j=0;j<1000000;j++){
            increase();
        }
    }
    public static void main(String[] args) throws InterruptedException {
        //new新实例
        Thread t1=new Thread(new AccountingSyncClass());
        //new新实例
        Thread t2=new Thread(new AccountingSyncClass());
        //启动线程
        t1.start();t2.start();
        t1.join();t2.join();
        System.out.println(i);
    }
}
/**
 * 输出结果:
 * 2000000
 */
```

由于 synchronized 关键字同步的是静态的 increase 方法，与同步实例方法不同的是，其锁对象是当前类的 Class 对象。

注意代码中的 increase4Obj 方法是实例方法，其对象锁是当前实例对象（this），如果别的线程调用该方法，将不会产生互斥现象，毕竟锁的对象不同，这种情况下可能会发生[线程安全问题](https://javabetter.cn/thread/thread-bring-some-problem.html)(操作了共享静态变量 i)。

## synchronized同步代码块

某些情况下，我们编写的方法代码量比较多，存在一些比较耗时的操作，而需要同步的代码块只有一小部分，如果直接对整个方法进行同步，可能会得不偿失，此时我们可以使用同步代码块的方式对需要同步的代码进行包裹。

示例如下：

```java
public class AccountingSync2 implements Runnable {
    static AccountingSync2 instance = new AccountingSync2(); // 饿汉单例模式

    static int i=0;

    @Override
    public void run() {
        //省略其他耗时操作....
        //使用同步代码块对变量i进行同步操作,锁对象为instance
        synchronized(instance){
            for(int j=0;j<1000000;j++){
                i++;
            }
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Thread t1=new Thread(instance);
        Thread t2=new Thread(instance);
        t1.start();t2.start();
        t1.join();t2.join();
        System.out.println(i);
    }
}
```

输出结果：

```
/**
 * 输出结果:
 * 2000000
 */
```

我们将 synchronized 作用于一个给定的实例对象 instance，即当前实例对象就是锁的对象，当线程进入 synchronized 包裹的代码块时就会要求当前线程持有 instance 实例对象的锁，如果当前有其他线程正持有该对象锁，那么新的线程就必须等待，这样就保证了每次只有一个线程执行 `i++` 操作。

当然除了用 instance 作为对象外，我们还可以使用 this 对象(代表当前实例)或者当前类的 Class 对象作为锁，如下代码：

```java
//this,当前实例对象锁
synchronized(this){
    for(int j=0;j<1000000;j++){
        i++;
    }
}
//Class对象锁
synchronized(AccountingSync.class){
    for(int j=0;j<1000000;j++){
        i++;
    }
}
```

## synchronized禁止指令重排

指令重排我们前面讲 [JMM](https://javabetter.cn/thread/jmm.html) 的时候讲过， 这里我们再结合 synchronized 关键字来讲一下。

看下面这段代码：

```java
class MonitorExample {
    int a = 0;
    public synchronized void writer() {  //1
        a++;                             //2
    }                                    //3
    public synchronized void reader() {  //4
        int i = a;                       //5
        //……
    }                                    //6
}
```

假设线程 A 执行 `writer()` 方法，随后线程 B 执行 `reader()` 方法。根据 happens before 规则，这个过程包含的 happens before 关系可以分为：

- 根据程序次序规则，1 happens before 2, 2 happens before 3; 4 happens before 5, 5 happens before 6。
- 根据监视器锁规则，3 happens before 4。
- 根据 happens before 的传递性，2 happens before 5。

>在 Java 内存模型中，监视器锁规则是一种 happens-before 规则，它规定了对一个监视器锁（monitor lock）或者叫做互斥锁的解锁操作 happens-before 于随后对这个锁的加锁操作。简单来说，这意味着在一个线程释放某个锁之后，另一个线程获得同一把锁的时候，前一个线程在释放锁时所做的所有修改对后一个线程都是可见的。

上述 happens before 关系的图形化表现形式如下：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/synchronized-1-f4430c27-5a0e-49c1-bac5-fe8562b0cdc5.jpg)

在上图中，每一个箭头链接的两个节点，代表了一个 happens before 关系。黑色箭头表示程序顺序规则；橙色箭头表示监视器锁规则；蓝色箭头表示组合这些规则后提供的 happens before 保证。

上图表示在线程 A 释放了锁之后，随后线程 B 获取同一个锁。在上图中，2 happens before 5。因此，线程 A 在释放锁之前所有可见的共享变量，在线程 B 获取同一个锁之后，将立刻变得对 B 线程可见。

## synchronized属于可重入锁

从互斥锁的设计上来说，当一个线程试图操作一个由其他线程持有的对象锁的临界资源时，将会处于阻塞状态，但当一个线程再次请求自己持有对象锁的临界资源时，这种情况属于重入锁，请求将会成功。

synchronized 就是可重入锁，因此一个线程调用 synchronized 方法的同时，在其方法体内部调用该对象另一个 synchronized 方法是允许的，如下：

```java
public class AccountingSync implements Runnable{
    static AccountingSync instance=new AccountingSync();
    static int i=0;
    static int j=0;

    @Override
    public void run() {
        for(int j=0;j<1000000;j++){
            //this,当前实例对象锁
            synchronized(this){
                i++;
                increase();//synchronized的可重入性
            }
        }
    }

    public synchronized void increase(){
        j++;
    }

    public static void main(String[] args) throws InterruptedException {
        Thread t1=new Thread(instance);
        Thread t2=new Thread(instance);
        t1.start();t2.start();
        t1.join();t2.join();
        System.out.println(i);
    }
}
```

1、AccountingSync 类中定义了一个静态的 AccountingSync 实例 instance 和两个静态的整数 i 和 j，静态变量被所有的对象所共享。

2、在 run 方法中，使用了 `synchronized(this)` 来加锁。这里的锁对象是 this，即当前的 AccountingSync 实例。在锁定的代码块中，对静态变量 i 进行增加，并调用了 increase 方法。

3、increase 方法是一个同步方法，它会对 j 进行增加。由于 increase 方法也是同步的，所以它能在已经获取到锁的情况下被 run 方法调用，这就是 synchronized 关键字的可重入性。

4、在 main 方法中，创建了两个线程 t1 和 t2，它们共享同一个 Runnable 对象，也就是共享同一个 AccountingSync 实例。然后启动这两个线程，并使用 join 方法等待它们都执行完成后，打印 i 的值。

此程序中的 `synchronized(this)` 和 synchronized 方法都使用了同一个锁对象（当前的 AccountingSync 实例），并且对静态变量 i 和 j 进行了增加操作，因此，在多线程环境下，也能保证 i 和 j 的操作是线程安全的。

## 小节

“好了，三妹，今天就学到这吧。”好不容易讲完了，我长吁一口气，扶了扶眼镜对三妹说。

记住 synchronized 的三种应用方式，指令重排情况分析，以及 synchronized 的可重入性，通过今天的学习，你基本可以掌握 synchronized 的使用姿势了。

同步会带来一定的性能开销，因此需要合理使用。不应将整个方法或者更大范围的代码块做同步，而应尽可能地缩小同步范围。

在 JVM 的早期版本中，synchronized 是重量级的，因为线程阻塞和唤醒需要操作系统的介入。但在 JVM 的后续版本中，对 synchronized 进行了大量优化，如偏向锁、轻量级锁和适应性自旋等，所以现在的 synchronized 并不一定是重量级的，其性能在许多情况下都很好，可以大胆地用。

>编辑：沉默王二，编辑前的内容主要来自于二哥的[技术派](https://paicoding.com/)团队成员楼仔，原文链接戳：[volatile](https://paicoding.com/column/4/3)。

----

GitHub 上标星 9300+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 9300+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
