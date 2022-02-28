*   进程：进程是代码在数据集合上的一次运行活动，是系统进行资源分配和调度的基本单位。
*   线程：线程是进程的一个执行路径，一个进程中至少有一个线程，进程中的多个线程共享进程的资源。

操作系统在分配资源时是把资源分配给进程的， 但是 CPU 资源比较特殊，它是被分配到线程的，因为真正要占用CPU运行的是线程，所以也说线程是 CPU分配的基本单位。

比如在Java中，当我们启动 main 函数其实就启动了一个JVM进程，而 main 函数在的线程就是这个进程中的一个线程，也称主线程。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/jincheng-xiancheng-1.png)

一个进程中有多个线程，多个线程共用进程的堆和方法区资源，但是每个线程有自己的程序计数器和栈。


>作者：三分恶
>原文链接：https://mp.weixin.qq.com/s/1jhBZrAb7bnvkgN1TgAUpw
>整理：沉默王二
>转载链接：https://mp.weixin.qq.com/s/bImCIoYsH_JEzTkBx2lj4A
