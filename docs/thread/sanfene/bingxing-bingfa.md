## 并行跟并发有什么区别？

从操作系统的角度来看，线程是CPU分配的最小单位。

*   并行就是同一时刻，两个线程都在执行。这就要求有两个CPU去分别执行两个线程。
*   并发就是同一时刻，只有一个执行，但是一个时间段内，两个线程都执行了。并发的实现依赖于CPU切换线程，因为切换的时间特别短，所以基本对于用户是无感知的。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/bingxing-bingfa-1.png)



就好像我们去食堂打饭，并行就是我们在多个窗口排队，几个阿姨同时打菜；并发就是我们挤在一个窗口，阿姨给这个打一勺，又手忙脚乱地给那个打一勺。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/bingxing-bingfa-2.png)

> [!ATTENTION]
>  图文详解 60 道Java并发面试高频题，这次面试，一定吊打面试官，整理：沉默王二，戳[转载链接](https://mp.weixin.qq.com/s/bImCIoYsH_JEzTkBx2lj4A)，作者：三分恶，戳[原文链接](https://mp.weixin.qq.com/s/1jhBZrAb7bnvkgN1TgAUpw)。
