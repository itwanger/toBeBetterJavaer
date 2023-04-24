---
title: 并发编程带来了哪些问题？
shortTitle: 并发编程带来了哪些问题？
description: 并发编程带来了哪些问题？
category:
  - Java核心
tag:
  - Java并发编程
head:
  - - meta
    - name: keywords
      content: Java,并发编程,多线程,Thread
---

# 并发编程带来了哪些问题？

多线程技术有这么多的好处，难道就没有一点缺点么，就在任何场景下就一定适用么？很显然不是。

在实际工作中，错误使用多线程非但不能提高效率还可能使程序崩溃。以在路上开车为例：

在一个单向行驶的道路上，每辆汽车都遵守交通规则，这时候整体通行是正常的。『单向车道』意味着『一个线程』，『多辆车』意味着『多个job任务』。

![单线程顺利同行](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/thread-bring-some-problem-c0a03b79-36d8-4120-888e-0597aa66ca5b.png)

如果需要提升车辆的同行效率，一般的做法就是扩展车道，对应程序来说就是『加线程池』，增加线程数。这样在同一时间内，通行的车辆数远远大于单车道。

![多线程顺利同行](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/thread-bring-some-problem-a65346bc-7b8b-4883-9d85-d07859df2e69.png)

然而成年人的世界没有那么完美，车道一旦多起来『加塞』的场景就会越来越多，出现碰撞后也会影响整条马路的通行效率。这么一对比下来『多车道』确实可能比『单车道』要慢。

![多线程故障](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/thread-bring-some-problem-532930da-03fe-4a59-aee8-0b97b5f1a966.png)

防止汽车频繁变道加塞可以采取在车道间增加『护栏』，那在程序的世界该怎么做呢？

程序世界中多线程遇到的问题归纳起来就是三类：`『线程安全问题』`、`『活跃性问题』`、`『性能问题』`，接下来会讲解这些问题，以及问题对应的解决手段。 

## 线程安全问题

有时候我们会发现，明明在单线程环境中正常运行的代码，在多线程环境中可能会出现意料之外的结果，其实这就是大家常说的『线程不安全』。那到底什么是线程不安全呢？往下看。

**原子性**

举一个银行转账的例子，比如从账户A向账户B转1000元，那么必然包括2个操作：从账户A减去1000元，往账户B加上1000元，两个操作都成功才意味着一次转账最终成功。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/thread-bring-some-problem-eba43c92-e42d-4318-a40c-b9365c32d922.png)

试想一下，如果这两个操作不具备原子性，从A的账户扣减了1000元之后，操作突然终止了，账户B没有增加1000元，那问题就大了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/thread-bring-some-problem-c22ae9be-bd80-4613-9c7e-3feb83c6c83f.png)

银行转账这个例子有两个步骤，出现了意外后导致转账失败，说明没有原子性。

> 原子性：即一个操作或者多个操作 要么全部执行并且执行的过程不会被任何因素打断，要么就都不执行。
>
> 原子操作：即不会被线程调度机制打断的操作，没有上下文切换。

在并发编程中很多操作都不是原子操作，出个小题目：

```java
i = 0; // 操作1
i++;   // 操作2
i = j; // 操作3
i = i + 1; // 操作4
```

上面这四个操作中有哪些是原子操作，哪些不是的？不熟悉的人可能认为这些都是原子操作，其实只有操作1是原子操作。

- 操作1：对基本数据类型变量的赋值是原子操作；
- 操作2：包含三个操作，读取i的值，将i加1，将值赋给i；
- 操作3：读取j的值，将j的值赋给i；
- 操作4：包含三个操作，读取i的值，将i加1，将值赋给i；

在单线程环境下上述四个操作都不会出现问题，但是在多线程环境下，如果不通过加锁操作，往往可能得到意料之外的值。

在Java语言中通过可以使用synchronize或者lock来保证原子性。

**可见性**

talk is cheap，先show一段代码：

```java
/**
* Author: leixiaoshuai
*/
class Test {
  int i = 50;
  int j = 0;
  
  public void update() {
    // 线程1执行
    i = 100;
  }
  
  public int get() {
    // 线程2执行
    j = i;
    return j;
  }
}
```

线程1执行update方法将 i 赋值为100，一般情况下线程1会在自己的工作内存中完成赋值操作，却没有及时将新值刷新到主内存中。

这个时候线程2执行get方法，首先会从主内存中读取i的值，然后加载到自己的工作内存中，这个时候读取到i的值是50，再将50赋值给j，最后返回j的值就是50了。原本期望返回100，结果返回50，这就是可见性问题，线程1对变量i进行了修改，线程2没有立即看到i的新值。

> 可见性：指当多个线程访问同一个变量时，一个线程修改了这个变量的值，其他线程能够立即看得到修改的值。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/thread-bring-some-problem-d91ca0c2-4f39-4e98-90e2-8acb793eb983.png)

如上图每个线程都有属于自己的工作内存，工作内存和主内存间需要通过store和load等进行交互。

为了解决多线程可见性问题，Java语言提供了`volatile`这个关键字。当一个共享变量被volatile修饰时，它会保证修改的值会立即被更新到主存，当有其他线程需要读取时，它会去内存中读取新值。而普通共享变量不能保证可见性，因为变量被修改后什么时候刷回到主存是不确定的，另外一个线程读的可能就是旧值。

当然Java的锁机制如synchronize和lock也是可以保证可见性的，加锁可以保证在同一时刻只有一个线程在执行同步代码块，释放锁之前会将变量刷回至主存，这样也就保证了可见性。

关于线程不安全的表现还有『有序性』，这个问题会在后面的文章中深入讲解。

## 活跃性问题

上面讲到为了解决`可见性`问题，我们可以采取加锁方式解决，但是如果加锁使用不当也容易引入其他问题，比如『死锁』。

在说『死锁』前我们先引入另外一个概念：`活跃性问题`。

> 活跃性是指某件正确的事情最终会发生，当某个操作无法继续下去的时候，就会发生活跃性问题。

概念是不是有点拗口，如果看不懂也没关系，你可以记住活跃性问题一般有这样几类：`死锁`，`活锁`，`饥饿问题`。

**（1）死锁**

死锁是指多个线程因为环形的等待锁的关系而永远的阻塞下去。一图胜千语，不多解释。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/thread-bring-some-problem-d4e65d5f-3de1-4a1c-8ae1-02cb3bfb528c.png)

**（2）活锁**

死锁是两个线程都在等待对方释放锁导致阻塞。而`活锁`的意思是线程没有阻塞，还活着呢。

当多个线程都在运行并且修改各自的状态，而其他线程彼此依赖这个状态，导致任何一个线程都无法继续执行，只能重复着自身的动作和修改自身的状态，这种场景就是发生了活锁。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/thread-bring-some-problem-d1f9e916-0985-46fe-bf87-63fccfd27bae.png)

如果大家还有疑惑，那我再举一个生活中的例子，大家平时在走路的时候，迎面走来一个人，两个人互相让路，但是又同时走到了一个方向，如果一直这样重复着避让，这俩人就是发生了活锁，学到了吧，嘿嘿。

**（3）饥饿**

如果一个线程无其他异常却迟迟不能继续运行，那基本是处于饥饿状态了。

常见有几种场景:

- 高优先级的线程一直在运行消耗CPU，所有的低优先级线程一直处于等待；
- 一些线程被永久堵塞在一个等待进入同步块的状态，而其他线程总是能在它之前持续地对该同步块进行访问；

有一个非常经典的饥饿问题就是`哲学家用餐问题`，如下图所示，有五个哲学家在用餐，每个人必须要同时拿两把叉子才可以开始就餐，如果哲学家1和哲学家3同时开始就餐，那哲学家2、4、5就得饿肚子等待了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/thread-bring-some-problem-314a47df-c953-4b7d-831c-007173981819.png)



## 性能问题

前面讲到了线程安全和死锁、活锁这些问题会影响多线程执行过程，如果这些都没有发生，多线程并发一定比单线程串行执行快吗，答案是不一定，因为多线程有`创建线程`和`线程上下文切换`的开销。

创建线程是直接向系统申请资源的，对操作系统来说创建一个线程的代价是十分昂贵的，需要给它分配内存、列入调度等。

线程创建完之后，还会遇到线程`上下文切换`。 

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/thread-bring-some-problem-d125d0b9-3b60-46cd-a79f-a26dd5210b44.png)

CPU是很宝贵的资源速度也非常快，为了保证雨露均沾，通常为给不同的线程分配`时间片`，当CPU从执行一个线程切换到执行另一个线程时，CPU 需要保存当前线程的本地数据，程序指针等状态，并加载下一个要执行的线程的本地数据，程序指针等，这个开关被称为『上下文切换』。

一般减少上下文切换的方法有：

- 无锁并发编程：可以参照concurrentHashMap锁分段的思想，不同的线程处理不同段的数据，这样在多线程竞争的条件下，可以减少上下文切换的时间。
- CAS算法，利用Atomic下使用CAS算法来更新数据，使用了乐观锁，可以有效的减少一部分不必要的锁竞争带来的上下文切换
- 使用最少线程：避免创建不需要的线程，比如任务很少，但是创建了很多的线程，这样会造成大量的线程都处于等待状态
- 协程：在单线程里实现多任务的调度，并在单线程里维持多个任务间的切换

## 有态度的总结

多线程用好了可以让程序的效率成倍提升，用不好可能比单线程还要慢。

用一张图总结一下上面讲的：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/thread-bring-some-problem-119223c9-83a9-42e1-9a0c-f9c706a1e793.png)

---

>编辑：沉默王二，内容大部分来源以下三个开源仓库：
>- [深入浅出 Java 多线程](http://concurrent.redspider.group/)
>- [并发编程知识总结](https://github.com/CL0610/Java-concurrency)
>- [Java八股文](https://github.com/CoderLeixiaoshuai/java-eight-part)

----

GitHub 上标星 7600+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 7600+ 的 Java 教程](https://tobebetterjavaer.com/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)