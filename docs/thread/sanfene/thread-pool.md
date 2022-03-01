**线程池：** 简单理解，它就是一个管理线程的池子。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/thread-pool-1.png)


*   **它帮我们管理线程，避免增加创建线程和销毁线程的资源损耗**。因为线程其实也是一个对象，创建一个对象，需要经过类加载过程，销毁一个对象，需要走GC垃圾回收流程，都是需要资源开销的。
*   **提高响应速度。** 如果任务到达了，相对于从线程池拿线程，重新去创建一条线程执行，速度肯定慢很多。
*   **重复利用。** 线程用完，再放回池子，可以达到重复利用的效果，节省资源。

其他线程池高频面试题：

- [工作中用过线程池吗？](docs/thread/sanfene/thread-pool-yingyong.md)
- [线程池的工作流程了解吗？](docs/thread/sanfene/thread-pool-gongzuoliu.md)
- [线程池主要参数有哪些？](docs/thread/sanfene/thread-pool-args.md)
- [线程池的拒绝策略有哪些？](docs/thread/sanfene/thread-pool-jujue-celue.md)
- [线程池有哪几种阻塞队列？](docs/thread/sanfene/thread-pool-queue.md)
- [线程池提交execute和submit有什么区别？](docs/thread/sanfene/thread-pool-execute-submit.md)
- [线程池怎么关闭？](docs/thread/sanfene/thread-pool-close.md)
- [线程池的线程数应该怎么配置？](docs/thread/sanfene/thread-pool-size.md)
- [有哪几种常见的线程池？](docs/thread/sanfene/thread-pool-changjian.md)
- [线程池异常怎么处理知道吗？](docs/thread/sanfene/thread-pool-exception.md)
- [线程池有几种状态？](docs/thread/sanfene/thread-pool-state.md)
- [线程池如何实现参数的动态修改？](docs/thread/sanfene/thread-pool-args-modify.md)
- [线程池调优了解吗？](docs/thread/sanfene/thread-pool-tiaoyou.md)
- [你能设计实现一个线程池吗？](docs/thread/sanfene/thread-pool-sheji.md)
- [单机线程池执行断电了应该怎么处理？](docs/thread/sanfene/thread-pool-shutdown.md)