
![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/yuanzi-method-1.png)


*   使用循环原子类，例如AtomicInteger，实现i++原子操作
*   使用juc包下的锁，如ReentrantLock ，对i++操作加锁lock.lock()来实现原子性
*   使用synchronized，对i++操作加锁

> [!ATTENTION]
>  图文详解 60 道Java并发面试高频题，这次面试，一定吊打面试官，整理：沉默王二，戳[转载链接](https://mp.weixin.qq.com/s/bImCIoYsH_JEzTkBx2lj4A)，作者：三分恶，戳[原文链接](https://mp.weixin.qq.com/s/1jhBZrAb7bnvkgN1TgAUpw)。