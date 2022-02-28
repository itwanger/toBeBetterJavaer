⭐这道题在阿里的面试中出现频率比较高

线程池实现原理可以查看 [要是以前有人这么讲线程池，我早就该明白了！](https://mp.weixin.qq.com/s?__biz=MzkwODE5ODM0Ng==&mid=2247488521&idx=1&sn=66b0ae23ef24ba47f4487aa8a3646886&scene=21#wechat_redirect)  ，当然，我们自己实现， 只需要抓住线程池的核心流程-参考[6]：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/thread-pool-sheji-1.png)



我们自己的实现就是完成这个核心流程：

*   线程池中有N个工作线程
*   把任务提交给线程池运行
*   如果线程池已满，把任务放入队列
*   最后当有空闲时，获取队列中任务来执行

实现代码：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/thread-pool-sheji-2.png)



这样，一个实现了线程池主要流程的类就完成了。
