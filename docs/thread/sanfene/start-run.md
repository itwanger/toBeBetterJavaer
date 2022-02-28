JVM执行start方法，会先创建一条线程，由创建出来的新线程去执行thread的run方法，这才起到多线程的效果。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/start-run-1.png)



为什么我们不能直接调用run()方法？也很清楚， 如果直接调用Thread的run()方法，那么run方法还是运行在主线程中，相当于顺序执行，就起不到多线程的效果。

>作者：三分恶
>原文链接：https://mp.weixin.qq.com/s/1jhBZrAb7bnvkgN1TgAUpw
>整理：沉默王二
>转载链接：https://mp.weixin.qq.com/s/bImCIoYsH_JEzTkBx2lj4A
