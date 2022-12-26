---
title: 别再用 System.currentTimeMillis() 统计耗时了，太 Low，StopWatch 好用到爆！
shortTitle: 别再用 System.currentTimeMillis() 统计耗时了，太 Low，StopWatch 好用到爆！
description: 真香！！
author: 沉默王二
category:
  - 微信公众号
head:
  - - meta
    - name: description
      content: 真香！！
---


大家好，我是二哥呀！

昨天，[二哥的编程星球](https://mp.weixin.qq.com/s/3RVsFZ17F0JzoHCLKbQgGw)里的一位球友问我能不能给他解释一下 `@SpringBootApplication` 注解是什么意思，还有 Spring Boot 的运行原理，于是我就带着他扒拉了一下这个注解的源码，还有 `SpringApplication` 类的 `run()` 方法的源码，一下子他就明白了。

你别说，看源码的过程还真的是挺有趣，这不，我就发现了一个有意思的点。

```java
public ConfigurableApplicationContext run(String... args) {
	StopWatch stopWatch = new StopWatch();
	stopWatch.start();
	......
	stopWatch.stop();
}
```

Spring Boot 是用 StopWatch 来统计耗时的，而通常情况下，我们会用 `System.currentTimeMillis()` 来统计耗时，对吧？编程喵🐱开源项目里就有这样一段代码，在处理统一日志处理切面的时候。

```java
@Around("webLog()")
public Object doAround(ProceedingJoinPoint joinPoint) throws Throwable {
    long startTime = System.currentTimeMillis();
    long endTime = System.currentTimeMillis();
    webLog.setSpendTime((int) (endTime - startTime));
}
```

对比之下，我们就能发现，JDK 提供的 `System.currentTimeMillis()` 没有 Spring 提供的 StopWatch 简洁、清晰。

尤其是在多任务的情况下，StopWatch 简直好用到爆🤗！

```java
// 创建一个 StopWatch 实例
StopWatch sw = new StopWatch("沉默王二是傻 X");
// 开始计时
sw.start("任务1");

Thread.sleep(1000);

// 停止计时
sw.stop();
System.out.printf("任务1耗时：%d%s.\n", sw.getLastTaskTimeMillis(), "ms");

sw.start("任务2");
Thread.sleep(1100);
sw.stop();

System.out.printf("任务2耗时：%d%s.\n", sw.getLastTaskTimeMillis(), "ms");
System.out.printf("任务数量：%s，总耗时：%ss.\n", sw.getTaskCount(), sw.getTotalTimeSeconds());
```

看到没，是不是很简单？

- 先 new 一个 StopWatch 对象
- 再 start 开始计时
- 然后 stop 停止计时
- 最后通过 `sw.getLastTaskTimeMillis()` 得出时间差

如果换成 `System.currentTimeMillis()` 就要了老命，先得声明好几个 long 型的局部变量，然后要第二个减第一个，第三个减第二个，稍微粗心一点（尤其是 CV 大法）时，很容易搞错。

除了可以通过局部时间，还可以通过 `sw.getTotalTimeSeconds()` 获取总的耗时。

```
任务1耗时：1002ms.
任务2耗时：1105ms.
任务数量：2，总耗时：2.107820109s.
```

另外，StopWatch 还提供了一个 `sw.prettyPrint()` 方法供打印出漂亮的格式化结果：

```
StopWatch '沉默王二是傻 X': running time = 2108529351 ns
---------------------------------------------
ns         %     Task name
---------------------------------------------
1004338467  048%  任务1
1104190884  052%  任务2
```

有耗时，有占用百分比，还有任务名，非常清晰。

除了 Spring，hutool 工具库和 Apache common 工具包都提供了各自的 StopWatch。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-biezysystemcurrenttimemillistjhsltlowstopwatchhydb-b4ca30f2-9e26-478c-b37c-062f5e3e0076.png)

查看 hutool 工具库中的 StopWatch 源码可以得出，该类其实就来自 Spring 的 StopWatch.java，用法也完全一致。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-biezysystemcurrenttimemillistjhsltlowstopwatchhydb-cdc28804-8b8e-40fa-a2fe-88b9d2ec57c9.png)

这说明 hutool 的作者也认为 Spring 的 StopWatch 写得好，哈哈哈😁。

使用 Beyond compare 比较后也能得出，两者除了一个中文注释，一个英文注释，代码几乎一样。setKeepTaskList 方法有比较大的不同。



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-biezysystemcurrenttimemillistjhsltlowstopwatchhydb-529e5215-b41c-492f-8e7f-a223242a4120.png)


那也就是说，如果你的项目中没有使用 Spring 全家桶，只用了 hutool 工具包，那就可以使用 hutool 的 StopWatch 来代替 `System.currentTimeMillis()`。

通过分析 StopWatch 的 stop 方法源码：

```java 
public void stop() throws IllegalStateException {
	if (null == this.currentTaskName) {
		throw new IllegalStateException("Can't stop StopWatch: it's not running");
	}

	final long lastTime = System.nanoTime() - this.startTimeNanos;
	this.totalTimeNanos += lastTime;
	this.lastTaskInfo = new TaskInfo(this.currentTaskName, lastTime);
	if (null != this.taskList) {
		this.taskList.add(this.lastTaskInfo);
	}
	++this.taskCount;
	this.currentTaskName = null;
}
```

其实可以发现，StopWatch 的内部是通过 `System.nanoTime()` 来计时的，本质上和 `System.currentTimeMillis()` 差别并不大。

nanoTime 比 currentTimeMillis 的粒度更细，前者是以纳秒为单位，后者是以毫秒为单位。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-biezysystemcurrenttimemillistjhsltlowstopwatchhydb-a3823870-63a7-4154-9bb9-6994f09f0f39.png)


注意两者都是 native 方法，也就是说，值的粒度其实取决于底层的操作系统。

**看到这，大家可能会恍然大悟，StopWatch 不过是披着一层外衣的 `System.currentTimeMillis()` 嘛**？

但妙就妙在，这层外衣足够的漂亮，足够的优雅。StopWatch 可以记录每个子任务的名称，以及按格式化打印结果，尤其是针对多任务统计时更友好一点。

当然了，除了选择 Spring 和 hutool 的 StopWatch，Apache commons-lang3 的 StopWatch 也是一个不错的可选项，更加灵活多变。

```java
StopWatch sw = StopWatch.createStarted();
Thread.sleep(1000);
System.out.printf("耗时：%dms.\n", sw.getTime());
```

其他两个都是通过 new 来创建 StopWatch 对象，commons-lang3 还可以通过 createStarted（创建并立即启动）、create（创建）来完成。

还可以调用 suspend 方法暂停计时、resume 方法恢复计时、reset 重新计时。

```java
// 暂停计时
sw.suspend();
System.out.printf("暂停耗时：%dms.\n", sw.getTime());

// 恢复计时
sw.resume();
System.out.printf("恢复耗时：%dms.\n", sw.getTime());

// 停止计时
sw.stop();
System.out.printf("总耗时：%dms.\n", sw.getTime());

// 重置计时
sw.reset();

// 开始计时
sw.start();
System.out.printf("重置耗时：%dms.\n", sw.getTime());
```

## ending

文末给自己的编程星球打个广告。一个人可以走得很快，但一群人才能走得更远。欢迎加入[二哥的编程星球](https://mp.weixin.qq.com/s/3RVsFZ17F0JzoHCLKbQgGw)，里面的每个球友都非常的友善，除了鼓励你，还会给你提出合理的建议。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-biezysystemcurrenttimemillistjhsltlowstopwatchhydb-7fc972ae-c530-4c91-a1ac-ef7c38494734.png)


星球提供的三份专属专栏《Java 面试指南》、《编程喵 🐱（Spring Boot+Vue 前后端分离）实战项目笔记》、《Java 版 LeetCode 刷题笔记》，干货满满，价值连城。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-biezysystemcurrenttimemillistjhsltlowstopwatchhydb-e89d40c9-078b-4b2b-9367-2bd707a418fa.png)


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-biezysystemcurrenttimemillistjhsltlowstopwatchhydb-1af7a5f6-312c-4ae9-ab77-3c359389c4a6.png)



已经有 **480 多名** 小伙伴加入[二哥的编程星球](https://mp.weixin.qq.com/s/3RVsFZ17F0JzoHCLKbQgGw)了，如果你也需要一个良好的学习氛围，[戳链接](https://mp.weixin.qq.com/s/3RVsFZ17F0JzoHCLKbQgGw)加入我们的大家庭吧！这是一个 Java 学习指南 + 编程实战 + LeetCode 刷题的私密圈子，你可以向二哥提问、帮你制定学习计划、跟着二哥一起做实战项目，冲冲冲。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-biezysystemcurrenttimemillistjhsltlowstopwatchhydb-a60262ae-01dc-4e39-affb-b192ca2de1c4.png)


---

没有什么使我停留——除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟。

**推荐阅读**：

- [没必要为实习碰的头破血流](https://mp.weixin.qq.com/s/KxUMq2YmlIBMbAeRwUm8JA)
- [网站挣了 200 美刀后的感触](https://mp.weixin.qq.com/s/PxgZkuA_SnAgG7xfwlKLgw)
- [在 IDEA 里下五子棋不过分吧？](https://mp.weixin.qq.com/s/R13FkPipfEMKjqNaCL3UoA)
- [顺利入职了](https://mp.weixin.qq.com/s/oBLUSnHOmzoVpCP1sacNbA)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-ruhfzddcfzf-da664b36-ac4c-4d16-a345-fc710462b515.jpg)




