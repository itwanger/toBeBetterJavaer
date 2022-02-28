线程池配置没有固定的公式，通常事前会对线程池进行一定评估，常见的评估方案如下：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/thread-pool-tiaoyou-1.png)



上线之前也要进行充分的测试，上线之后要建立完善的线程池监控机制。

事中结合监控告警机制，分析线程池的问题，或者可优化点，结合线程池动态参数配置机制来调整配置。

事后要注意仔细观察，随时调整。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/thread-pool-tiaoyou-2.png)



具体的调优案例可以查看参考[7]美团技术博客。
