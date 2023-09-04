---
title: Java volatile关键字解析
shortTitle: volatile关键字
description: 在 Java 中，volatile 是一种特殊的修饰符，主要用于处理多线程编程中的可见性和有序性问题。
category:
  - Java核心
tag:
  - Java并发编程
head:
  - - meta
    - name: keywords
      content: Java,并发编程,多线程,Thread,volatile
---

# 第八节：volatile 关键字

“三妹啊，这节我们来学习 Java 中的 volatile 关键字吧，以及容易遇到的坑。”看着三妹好学的样子，我倍感欣慰。

“好呀，哥。”三妹愉快的答应了。

> 这是我们在《[二哥的 Java 进阶之路基础篇](https://javabetter.cn/overview/)》中常见的对话模式，老读者应该对这种模式不陌生。

在讲[并发编程带来了哪些问题的时候](https://javabetter.cn/thread/thread-bring-some-problem.html)，我们提到了可见性和原子性，那我现在可以直接告诉大家了：volatile 可以保证可见性，但不保证原子性：

- 当写一个 volatile 变量时，[JMM](https://javabetter.cn/thread/jmm.html) 会把该线程在本地内存中的变量强制刷新到主内存中去；
- 这个写操作会导致其他线程中的 volatile 变量缓存无效。

## volatile 会禁止指令重排

在讲 [JMM](https://javabetter.cn/thread/jmm.html) 的时候，我们提到了指令重排，相信大家都还有印象，我们来回顾一下重排序需要遵守的规则：

- 重排序不会对存在数据依赖关系的操作进行重排序。比如：`a=1;b=a;` 这个指令序列，因为第二个操作依赖于第一个操作，所以在编译时和处理器运行时这两个操作不会被重排序。
- 重排序是为了优化性能，但是不管怎么重排序，单线程下程序的执行结果不能被改变。比如：`a=1;b=2;c=a+b` 这三个操作，第一步 (a=1) 和第二步 (b=2) 由于不存在数据依赖关系，所以可能会发生重排序，但是 c=a+b 这个操作是不会被重排序的，因为需要保证最终的结果一定是 c=a+b=3。

使用 volatile 关键字修饰共享变量可以禁止这种重排序。怎么做到的呢？

当我们使用 volatile 关键字来修饰一个变量时，Java 内存模型会插入内存屏障（一个处理器指令，可以对 CPU 或编译器重排序做出约束）来确保以下两点：

- 写屏障（Write Barrier）：当一个 volatile 变量被写入时，写屏障确保在该屏障之前的所有变量的写入操作都提交到主内存。
- 读屏障（Read Barrier）：当读取一个 volatile 变量时，读屏障确保在该屏障之后的所有读操作都从主内存中读取。

换句话说：

- 当程序执行到 volatile 变量的读操作或者写操作时，在其前面操作的更改肯定已经全部进行，且结果对后面的操作可见；在其后面的操作肯定还没有进行；
- 在进行指令优化时，不能将 volatile 变量的语句放在其后面执行，也不能把 volatile 变量后面的语句放到其前面执行。

“也就是说，执行到 volatile 变量时，其前面的所有语句都必须执行完，后面所有得语句都未执行。且前面语句的结果对 volatile 变量及其后面语句可见。”我瞅了了三妹一眼继续说。

先看下面未使用 volatile 的代码：

```java
class ReorderExample {
  int a = 0;
  boolean flag = false;
  public void writer() {
      a = 1;                   //1
      flag = true;             //2
  }
  Public void reader() {
      if (flag) {                //3
          int i =  a * a;        //4
          System.out.println(i);
      }
  }
}
```

因为重排序影响，所以最终的输出可能是 0，重排序请参考[上一篇 JMM 的介绍](https://javabetter.cn/thread/jmm.html)，如果引入 volatile，我们再看一下代码：

```java
class ReorderExample {
  int a = 0;
  boolean volatile flag = false;
  public void writer() {
      a = 1;                   //1
      flag = true;             //2
  }
  Public void reader() {
      if (flag) {                //3
          int i =  a * a;        //4
          System.out.println(i);
      }
  }
}
```

这时候，volatile 会禁止指令重排序，这个过程建立在 happens before 关系（[上一篇介绍过了](https://javabetter.cn/thread/jmm.html)）的基础上：

1.  根据程序次序规则，1 happens before 2; 3 happens before 4。
2.  根据 volatile 规则，2 happens before 3。
3.  根据 happens before 的传递性规则，1 happens before 4。

上述 happens before 关系的图形化表现形式如下：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/volatile-f4de7989-672e-43d6-906b-feffe4fb0a9c.jpg)

在上图中，每一个箭头链接的两个节点，代表了一个 happens before 关系:

- 黑色箭头表示程序顺序规则；
- 橙色箭头表示 volatile 规则；
- 蓝色箭头表示组合这些规则后提供的 happens before 保证。

这里 A 线程写一个 volatile 变量后，B 线程读同一个 volatile 变量。A 线程在写 volatile 变量之前所有可见的共享变量，在 B 线程读同一个 volatile 变量后，将立即变得对 B 线程可见。

## volatile 不适用的场景

下面是变量自加的示例：

```java
public class volatileTest {
    public volatile int inc = 0;
    public void increase() {
        inc++;
    }
    public static void main(String[] args) {
        final volatileTest test = new volatileTest();
        for(int i=0;i<10;i++){
            new Thread(){
                public void run() {
                    for(int j=0;j<1000;j++)
                        test.increase();
                };
            }.start();
        }
        while(Thread.activeCount()>1)  //保证前面的线程都执行完
            Thread.yield();
        System.out.println("inc output:" + test.inc);
    }
}
```

测试输出：

```
inc output:8182
```

“为什么呀？二哥？” 看到这个结果，三妹疑惑地问。

“因为 inc++不是一个原子性操作（[前面讲过](https://javabetter.cn/thread/thread-bring-some-problem.html)），由读取、加、赋值 3 步组成，所以结果并不能达到 10000。”我耐心地回答。

“哦，你这样说我就理解了。”三妹点点头。

怎么解决呢？

01、采用 [synchronized](https://javabetter.cn/thread/synchronized-1.html)（下一篇会讲，戳链接直达），把 `inc++` 拎出来单独加 synchronized 关键字：

```java
public class volatileTest1 {
    public int inc = 0;
    public synchronized void increase() {
        inc++;
    }
    public static void main(String[] args) {
        final volatileTest1 test = new volatileTest1();
        for(int i=0;i<10;i++){
            new Thread(){
                public void run() {
                    for(int j=0;j<1000;j++)
                        test.increase();
                };
            }.start();
        }
        while(Thread.activeCount()>1)  //保证前面的线程都执行完
            Thread.yield();
        System.out.println("add synchronized, inc output:" + test.inc);
    }
}
```

02、采用 [Lock](https://javabetter.cn/thread/suo.html)，通过重入锁 [ReentrantLock](https://javabetter.cn/thread/reentrantLock.html) 对 `inc++` 加锁（后面都会细讲，戳链接直达）：

```java
public class volatileTest2 {
    public int inc = 0;
    Lock lock = new ReentrantLock();
    public void increase() {
        lock.lock();
        inc++;
        lock.unlock();
    }
    public static void main(String[] args) {
        final volatileTest2 test = new volatileTest2();
        for(int i=0;i<10;i++){
            new Thread(){
                public void run() {
                    for(int j=0;j<1000;j++)
                        test.increase();
                };
            }.start();
        }
        while(Thread.activeCount()>1)  //保证前面的线程都执行完
            Thread.yield();
        System.out.println("add lock, inc output:" + test.inc);
    }
}
```

03、采用原子类 [AtomicInteger](https://javabetter.cn/thread/atomic.html)（后面也会细讲，戳链接直达）来实现：

```java
public class volatileTest3 {
    public AtomicInteger inc = new AtomicInteger();
    public void increase() {
        inc.getAndIncrement();
    }
    public static void main(String[] args) {
        final volatileTest3 test = new volatileTest3();
        for(int i=0;i<10;i++){
            new Thread(){
                public void run() {
                    for(int j=0;j<100;j++)
                        test.increase();
                };
            }.start();
        }
        while(Thread.activeCount()>1)  //保证前面的线程都执行完
            Thread.yield();
        System.out.println("add AtomicInteger, inc output:" + test.inc);
    }
}
```

三者输出都是 1000，如下：

```
add synchronized, inc output:1000
add lock, inc output:1000
add AtomicInteger, inc output:1000
```

## volatile 实现单例模式的双重锁

这是一个使用"双重检查锁定"（double-checked locking）实现的单例模式（Singleton Pattern）的例子。

```java
public class penguin {
    private static volatile penguin m_penguin = null;
    // 避免通过new初始化对象
    private void penguin() {}
    public void beating() {
        System.out.println("打豆豆");
    };
    public static penguin getInstance() {      //1
        if (null == m_penguin) {               //2
            synchronized(penguin.class) {      //3
                if (null == m_penguin) {       //4
                    m_penguin = new penguin(); //5
                }
            }
        }
        return m_penguin;                      //6
    }
}
```

在这个例子中，penguin 类只能被实例化一次。

首先看代码解释：

- 声明了一个类型为 penguin 的 volatile 变量 m_penguin，它是类的静态变量，用来存储 penguin 类的唯一实例。
- `penguin()` 构造方法被声明为 private，这样就阻止了外部代码使用 new 来创建 penguin 实例，保证了只能通过 `getInstance()` 方法获取实例。
- `getInstance()` 方法是获取 penguin 类唯一实例的公共静态方法。
- `if (null == m_penguin)` 检查是否已经存在实例。如果不存在，才进入同步代码块。
- `synchronized(penguin.class)` 对类的 Class 对象加锁，这是确保在多线程环境下，同时只能有一个线程进入同步代码块。在同步代码块中，再次检查实例是否已经存在，如果不存在，则创建新的实例。这就是所谓的"双重检查锁定"。
- 最后返回 m_penguin，也就是 penguin 的唯一实例。

其中，使用 volatile 关键字是为了防止 `m_penguin = new penguin()` 这一步被指令重排序。实际上，`new penguin()` 这一步分为三个子步骤：

- 分配对象的内存空间。
- 初始化对象。
- 将 m_penguin 指向分配的内存空间。

如果不使用 volatile 关键字，JVM 可能会对这三个子步骤进行指令重排序，如果步骤 2 和步骤 3 被重排序，那么线程 A 可能在对象还没有被初始化完成时，线程 B 已经开始使用这个对象，从而导致问题。而使用 volatile 关键字可以防止这种指令重排序。

伪代码代码如下：

```java
a. memory = allocate() //分配内存
b. ctorInstanc(memory) //初始化对象
c. instance = memory   //设置instance指向刚分配的地址
```

上面的代码在编译运行时，可能会出现重排序从 a-b-c 排序为 a-c-b。在多线程的情况下会出现以下问题。

当线程 A 在执行第 5 行代码时，B 线程进来执行到第 2 行代码。假设此时 A 执行的过程中发生了指令重排序，即先执行了 a 和 c，没有执行 b。那么由于 A 线程执行了 c 导致 instance 指向了一段地址，所以 B 线程判断 instance 不为 null，会直接跳到第 6 行并返回一个未初始化的对象。

## 小结

“好了，三妹，我们来总结一下。”我舒了一口气说。

volatile 可以保证线程可见性且提供了一定的有序性，但是无法保证原子性。在 JVM 底层 volatile 是采用“内存屏障”来实现的。

观察加入 volatile 关键字和没有加入 volatile 关键字时所生成的汇编代码就能发现，加入 volatile 关键字时，会多出一个 lock 前缀指令，lock 前缀指令实际上相当于一个内存屏障（也称内存栅栏），内存屏障会提供 3 个功能：

- 它确保指令重排序时不会把其后面的指令排到内存屏障之前的位置，也不会把前面的指令排到内存屏障的后面；即在执行到内存屏障这句指令时，在它前面的操作已经全部完成；
- 它会强制将对缓存的修改操作立即写入主存；
- 如果是写操作，它会导致其他 CPU 中对应的缓存行无效。

最后，我们学习了 volatile 不适用的场景，以及解决的方法，并解释了双重检查锁定实现的单例模式为何需要使用 volatile。

> 编辑：沉默王二，编辑前的内容主要来自于二哥的[技术派](https://paicoding.com/)团队成员楼仔，原文链接戳：[volatile](https://paicoding.com/column/4/2)。

---

GitHub 上标星 9300+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第二份 PDF 《[并发编程小册](https://javabetter.cn/thread/)》终于来了！包括线程的基本概念和使用方法、Java的内存模型、sychronized、volatile、CAS、AQS、ReentrantLock、线程池、并发容器、ThreadLocal、生产者消费者模型等面试和开发必须掌握的内容，共计 15 万余字，200+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，二哥的并发编程进阶之路.pdf](https://javabetter.cn/thread/)

[加入二哥的编程星球](https://javabetter.cn/thread/)，在星球的第二个置顶帖「[知识图谱](https://javabetter.cn/thread/)」里就可以获取 PDF 版本。

![](https://cdn.tobebetterjavaer.com/stutymore/wangzhe-thread-20230904125125.png)
