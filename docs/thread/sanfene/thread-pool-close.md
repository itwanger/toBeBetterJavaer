可以通过调用线程池的shutdown或shutdownNow方法来关闭线程池。它们的原理是遍历线程池中的工作线程，然后逐个调用线程的interrupt方法来中断线程，所以无法响应中断的任务可能永远无法终止。

shutdown() 将线程池状态置为shutdown,并不会立即停止：

- 停止接收外部submit的任务
- 内部正在跑的任务和队列里等待的任务，会执行完
- 等到第二步完成后，才真正停止

shutdownNow() 将线程池状态置为stop。一般会立即停止，事实上不一定：

- 和shutdown()一样，先停止接收外部提交的任务
- 忽略队列里等待的任务
- 尝试将正在跑的任务interrupt中断
- 返回未执行的任务列表

shutdown 和shutdownnow简单来说区别如下：

- shutdownNow()能立即停止线程池，正在跑的和正在等待的任务都停下了。这样做立即生效，但是风险也比较大。
- shutdown()只是关闭了提交通道，用submit()是无效的；而内部的任务该怎么跑还是怎么跑，跑完再彻底停止线程池。

> [!ATTENTION]
>  图文详解 60 道Java并发面试高频题，这次面试，一定吊打面试官，整理：沉默王二，戳[转载链接](https://mp.weixin.qq.com/s/bImCIoYsH_JEzTkBx2lj4A)，作者：三分恶，戳[原文链接](https://mp.weixin.qq.com/s/1jhBZrAb7bnvkgN1TgAUpw)。