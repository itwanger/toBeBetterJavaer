volatile有两个作用，保证**可见性**和**有序性**。

> volatile怎么保证可见性的呢？

相比synchronized的加锁方式来解决共享变量的内存可见性问题，volatile就是更轻量的选择，它没有上下文切换的额外开销成本。

volatile可以确保对某个变量的更新对其他线程马上可见，一个变量被声明为volatile 时，线程在写入变量时不会把值缓存在寄存器或者其他地方，而是会把值刷新回主内存 当其它线程读取该共享变量 ，会从主内存重新获取最新值，而不是使用当前线程的本地内存中的值。

例如，我们声明一个 volatile 变量 volatile int x = 0，线程A修改x=1，修改完之后就会把新的值刷新回主内存，线程B读取x的时候，就会清空本地内存变量，然后再从主内存获取最新值。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/volatile-1.png)


> volatile怎么保证有序性的呢？

重排序可以分为编译器重排序和处理器重排序，valatile保证有序性，就是通过分别限制这两种类型的重排序。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/volatile-2.png)


为了实现volatile的内存语义，编译器在生成字节码时，会在指令序列中插入内存屏障来禁止特定类型的处理器重排序。

1.  在每个volatile写操作的前面插入一个`StoreStore`屏障
2.  在每个volatile写操作的后面插入一个`StoreLoad`屏障
3.  在每个volatile读操作的后面插入一个`LoadLoad`屏障
4.  在每个volatile读操作的后面插入一个`LoadStore`屏障

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/volatile-3.png)


![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/volatile-4.png)

> [!ATTENTION]
>  图文详解 60 道Java并发面试高频题，这次面试，一定吊打面试官，整理：沉默王二，戳[转载链接](https://mp.weixin.qq.com/s/bImCIoYsH_JEzTkBx2lj4A)，作者：三分恶，戳[原文链接](https://mp.weixin.qq.com/s/1jhBZrAb7bnvkgN1TgAUpw)。