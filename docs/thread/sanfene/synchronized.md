synchronized可以用来保证代码的原子性。

synchronized主要有三种用法：

*   **修饰实例方法:** 作用于当前对象实例加锁，进入同步代码前要获得 **当前对象实例的锁**

```
synchronized void method() {  
//业务代码
}
```

*   **修饰静态方法**：也就是给当前类加锁，会作⽤于类的所有对象实例 ，进⼊同步代码前要获得当前 class 的锁。因为静态成员不属于任何⼀个实例对象，是类成员（ static 表明这是该类的⼀个静态资源，不管 new 了多少个对象，只有⼀份）。

    如果⼀个线程 A 调⽤⼀个实例对象的⾮静态 synchronized ⽅法，⽽线程 B 需要调⽤这个实例对象所属类的静态 synchronized ⽅法，是允许的，不会发⽣互斥现象，因为访问静态 synchronized ⽅法占⽤的锁是当前类的锁，⽽访问⾮静态 synchronized ⽅法占⽤的锁是当前实例对象锁。

```
synchronized void staic method() { 
//业务代码
}
```

*   **修饰代码块** ：指定加锁对象，对给定对象/类加锁。synchronized(this|object) 表示进⼊同步代码库前要获得给定对象的锁。synchronized(类.class) 表示进⼊同步代码前要获得 当前 **class** 的锁

```
synchronized(this) {
 //业务代码
}
```

### synchronized的实现原理？

> synchronized是怎么加锁的呢？

我们使用synchronized的时候，发现不用自己去lock和unlock，是因为JVM帮我们把这个事情做了。

1.  synchronized修饰代码块时，JVM采用`monitorenter`、`monitorexit`两个指令来实现同步，`monitorenter` 指令指向同步代码块的开始位置， `monitorexit` 指令则指向同步代码块的结束位置。

    反编译一段synchronized修饰代码块代码，`javap -c -s -v -l SynchronizedDemo.class`，可以看到相应的字节码指令。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/synchronized-1.png)


2.  synchronized修饰同步方法时，JVM采用`ACC_SYNCHRONIZED`标记符来实现同步，这个标识指明了该方法是一个同步方法。

    同样可以写段代码反编译看一下。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/synchronized-2.png)


> synchronized锁住的是什么呢？

monitorenter、monitorexit或者ACC_SYNCHRONIZED都是**基于Monitor实现**的。

实例对象结构里有对象头，对象头里面有一块结构叫Mark Word，Mark Word指针指向了**monitor**。

所谓的Monitor其实是一种**同步工具**，也可以说是一种**同步机制**。在Java虚拟机（HotSpot）中，Monitor是由**ObjectMonitor实现**的，可以叫做内部锁，或者Monitor锁。

ObjectMonitor的工作原理：

*   ObjectMonitor有两个队列：_WaitSet、_EntryList，用来保存ObjectWaiter 对象列表。
*   _owner，获取 Monitor 对象的线程进入 _owner 区时， _count + 1。如果线程调用了 wait() 方法，此时会释放 Monitor 对象， _owner 恢复为空， _count - 1。同时该等待线程进入 _WaitSet 中，等待被唤醒。

```
ObjectMonitor() {
    _header       = NULL;
    _count        = 0; // 记录线程获取锁的次数
    _waiters      = 0,
    _recursions   = 0;  //锁的重入次数
    _object       = NULL;
    _owner        = NULL;  // 指向持有ObjectMonitor对象的线程
    _WaitSet      = NULL;  // 处于wait状态的线程，会被加入到_WaitSet
    _WaitSetLock  = 0 ;
    _Responsible  = NULL ;
    _succ         = NULL ;
    _cxq          = NULL ;
    FreeNext      = NULL ;
    _EntryList    = NULL ;  // 处于等待锁block状态的线程，会被加入到该列表
    _SpinFreq     = 0 ;
    _SpinClock    = 0 ;
    OwnerIsThread = 0 ;
  }
```

可以类比一个去医院就诊的例子[18]：

*   首先，患者在**门诊大厅**前台或自助挂号机**进行挂号**；

*   随后，挂号结束后患者找到对应的**诊室就诊**：

*   诊室每次只能有一个患者就诊；
*   如果此时诊室空闲，直接进入就诊；
*   如果此时诊室内有其它患者就诊，那么当前患者进入**候诊室**，等待叫号；

*   就诊结束后，**走出就诊室**，候诊室的**下一位候诊患者**进入就诊室。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/synchronized-3.png)


这个过程就和Monitor机制比较相似：

*   **门诊大厅**：所有待进入的线程都必须先在**入口Entry Set**挂号才有资格；
*   **就诊室**：就诊室**_Owner**里里只能有一个线程就诊，就诊完线程就自行离开
*   **候诊室**：就诊室繁忙时，进入**等待区（Wait Set）**，就诊室空闲的时候就从**等待区（Wait Set）**叫新的线程

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/synchronized-4.png)


所以我们就知道了，同步是锁住的什么东西：

*   monitorenter，在判断拥有同步标识 ACC_SYNCHRONIZED 抢先进入此方法的线程会优先拥有 Monitor 的 owner ，此时计数器 +1。
*   monitorexit，当执行完退出后，计数器 -1，归 0 后被其他进入的线程获得。

### 除了原子性，synchronized可见性，有序性，可重入性怎么实现？

> synchronized怎么保证可见性？

*   线程加锁前，将清空工作内存中共享变量的值，从而使用共享变量时需要从主内存中重新读取最新的值。
*   线程加锁后，其它线程无法获取主内存中的共享变量。
*   线程解锁前，必须把共享变量的最新值刷新到主内存中。

> synchronized怎么保证有序性？

synchronized同步的代码块，具有排他性，一次只能被一个线程拥有，所以synchronized保证同一时刻，代码是单线程执行的。

因为as-if-serial语义的存在，单线程的程序能保证最终结果是有序的，但是不保证不会指令重排。

所以synchronized保证的有序是执行结果的有序性，而不是防止指令重排的有序性。

> synchronized怎么实现可重入的呢？

synchronized 是可重入锁，也就是说，允许一个线程二次请求自己持有对象锁的临界资源，这种情况称为可重入锁。

synchronized 锁对象的时候有个计数器，他会记录下线程获取锁的次数，在执行完对应的代码块之后，计数器就会-1，直到计数器清零，就释放锁了。

之所以，是可重入的。是因为 synchronized 锁对象有个计数器，会随着线程获取锁后 +1 计数，当线程执行完毕后 -1，直到清零释放锁。

> [!ATTENTION]
>  图文详解 60 道Java并发面试高频题，这次面试，一定吊打面试官，整理：沉默王二，戳[转载链接](https://mp.weixin.qq.com/s/bImCIoYsH_JEzTkBx2lj4A)，作者：三分恶，戳[原文链接](https://mp.weixin.qq.com/s/1jhBZrAb7bnvkgN1TgAUpw)。
