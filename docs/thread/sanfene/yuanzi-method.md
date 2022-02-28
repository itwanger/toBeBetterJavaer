
![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/yuanzi-method-1.png)


*   使用循环原子类，例如AtomicInteger，实现i++原子操作
*   使用juc包下的锁，如ReentrantLock ，对i++操作加锁lock.lock()来实现原子性
*   使用synchronized，对i++操作加锁
