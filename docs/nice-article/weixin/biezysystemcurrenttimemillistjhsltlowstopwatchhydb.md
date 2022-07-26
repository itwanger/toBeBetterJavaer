---
title: 别再用 System.currentTimeMillis() 统计耗时了，太 Low，StopWatch 好用到爆！
shortTitle: 别再用 System.currentTimeMillis() 统计耗时了，太 Low，StopWatch 好用到爆！
description: 真香！！
author: 栈长
category:
  - 微信公众号
head:
  - - meta
    - name: description
      content: 真香！！
---

## 背景

你还在用 System.currentTimeMillis... 统计耗时？

比如下面这段代码：

```
/** * @author: 栈长 * @from: Java技术栈 */@Testpublic void jdkWasteTime() throws InterruptedException {    long start = System.currentTimeMillis();    Thread.sleep(3000);    System.out.printf("耗时：%dms.", System.currentTimeMillis() - start);}
```

System.currentTimeMillis...这种方式统计耗时确实是用的最多的，因为它不用引入其他的 JAR 包，JDK 就能搞定，但是它用起来有几个不方便的地方：

1）需要定义初始时间值，再用当前时间进行手工计算；

2）统计多个任务的耗时比较麻烦，如果 start 赋值搞错可能还会出现逻辑问题；

有没有其他的更好的替代方案呢？答案是肯定的：**StopWatch**！

## StopWatch

StopWatch 是一个统计耗时的工具类：

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-biezysystemcurrenttimemillistjhsltlowstopwatchhydb-71db7631-47a7-4349-9c1c-d6ce42390636.jpg)

常用的 StopWatch 工具类有以下两种：

*   commons-lang3（Apache 提供的通用工具包）
*   spring-core（Spring 核心包）

虽然两个工具类的名称是一样的，但是用法大不相同，本文栈长就给大家分别演示下。

### commons-lang3 提供的 StopWatch

#### 引入依赖

commons-lang3 是 Apache 开源的通用工具包，需要额外引入 Maven 依赖：

```
<dependency>    <groupId>org.apache.commons</groupId>    <artifactId>commons-lang3</artifactId>    <version>${commons-lang3.version}</version></dependency>
```

#### 简单示例

创建一个 StopWatch 实例有以下 3 种方法：

1） 使用 new 关键字

```
StopWatch sw = new StopWatch();
```

2）使用 create 工厂方法

```
StopWatch sw = StopWatch.create();
```

3）使用 createStarted 方法

```
StopWatch sw = StopWatch.createStarted();
```

这个方法不但会创建一个实例，同时还会启动计时。

**来看一个简单的例子：**

```
// 创建一个 StopWatch 实例并开始计时StopWatch sw = StopWatch.createStarted();// 休眠1秒Thread.sleep(1000);// 1002msSystem.out.printf("耗时：%dms.\n", sw.getTime()); 
```

#### 更多用法

接之前的示例继续演示。

**暂停计时：**

```
// 暂停计时sw.suspend();Thread.sleep(1000);// 1000msSystem.out.printf("暂停耗时：%dms.\n", sw.getTime()); 
```

因为暂停了，所以还是 1000ms，暂停后中间休眠的 1000 ms 不会被统计。

**恢复计时：**

```
// 恢复计时sw.resume();Thread.sleep(1000);// 2001msSystem.out.printf("恢复耗时：%dms.\n", sw.getTime()); 
```

因为恢复了，结果是 2001 ms，恢复后中间休眠的 1000 ms 被统计了。

**停止计时：**

```
Thread.sleep(1000);// 停止计时sw.stop();Thread.sleep(1000);// 3009msSystem.out.printf("总耗时：%dms.\n", sw.getTime()); 
```

停止计时前休眠了 1000ms，所以结果是 3009ms，停止计时后就不能再使用暂停、恢复功能了。

**重置计时：**

```
// 重置计时sw.reset();// 开始计时sw.start();Thread.sleep(1000);// 1000msSystem.out.printf("重置耗时：%dms.\n", sw.getTime()); 
```

因为重置计时了，所以重新开始计时后又变成了 1000ms。

### Spring 提供的 StopWatch

来看一个简单的例子：

```
// 创建一个 StopWatch 实例StopWatch sw = StopWatch("Java技术栈：测试耗时");// 开始计时sw.start("任务1");// 休眠1秒Thread.sleep(1000);// 停止计时sw.stop();// 1002msSystem.out.printf("任务1耗时：%d%s.\n", sw.getLastTaskTimeMillis(), "ms");
```

Spring 创建实例的方法就是 new，开始计时，以及获取时间需要手动 start、stop。

继续再新增 2 个任务：

```
Thread.sleep(1000);sw.start("任务2");Thread.sleep(1100);sw.stop();// 1100ms.System.out.printf("任务2耗时：%d%s.\n", sw.getLastTaskTimeMillis(), "ms");sw.start("任务3");Thread.sleep(1200);sw.stop();// 1203ms.System.out.printf("任务3耗时：%d%s.\n", sw.getLastTaskTimeMillis(), "ms");// 3.309373456s.System.out.printf("任务数量：%s，总耗时：%ss.\n", sw.getTaskCount(), sw.getTotalTimeSeconds());
```

Spring 一个重要的亮点是支持格式化打印结果：

```
System.out.println(sw.prettyPrint());
```

来看最后的输出结果：

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-biezysystemcurrenttimemillistjhsltlowstopwatchhydb-9584ef69-33ea-4ec4-bd4d-5c6b34c8039a.jpg)

## 实现原理

分别来看下 commons-lang3 和 Spring 的核心源码：

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-biezysystemcurrenttimemillistjhsltlowstopwatchhydb-048a7d6b-df2f-4d67-bd62-5ac20311a4f6.jpg)

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-biezysystemcurrenttimemillistjhsltlowstopwatchhydb-16378e71-7f8f-452a-851d-81e5efd1c355.jpg)

其实也都是利用了 JDK 中的 System 系统类去实现的，做了一系列封装而已。

## 总结

commons-lang3 工具包和 Spring 框架中的 StopWatch 都能轻松完成多个任务的计时以及总耗时，再也不要用手工计算耗时的方式了，手动计算如果 start 赋值错误可能还会出错。

当然，以上两个 StopWatch 的功能也远不止栈长介绍的，栈长介绍的这些已经够用了，更多的可以深入研究。

**总结一下这两种计时工具类优缺点：**

1）commons-lang3 中的 StopWatch 的用法比 Spring 中的要更简单一些；

2）commons-lang3 中的 StopWatch 功能比 Spring 中的要更灵活、更强大一些，支持暂停、恢复、重置等功能；

3）Spring 提供每个子任务名称，以及按格式化打印结果功能，针对多任务统计时更好一点；

综上所述，个人推荐使用 commons-lang3 工具包中的，更灵活、更强大，如果不想额外引入包，也可以考虑 Spring 中的，根据自己的系统需求定。

**所以，别再用 System.currentTimeMillis... 统计耗时了，太 low，赶紧分享转发下吧，规范起来！**

* * *

**微信8.0将好友放开到了一万，小伙伴可以加我大号了，先到先得，再满就真没了**

**扫描下方二维码即可加我微信啦，`2022，抱团取暖，一起牛逼。`**

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-biezysystemcurrenttimemillistjhsltlowstopwatchhydb-4343b516-4747-4e12-be7f-8719a372dfc7.jpg)

## 推荐阅读

*   [Grafana 9 正式发布，更易用，更酷炫了！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247500998&idx=1&sn=58d1222ef56fa3bef2abeb832c3a3c32&scene=21#wechat_redirect)
*   [如何优雅的写 Controller 层代码？](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247500925&idx=1&sn=0a937f3b4281987b3633666421bf275b&scene=21#wechat_redirect)
*   [Mall电商实战项目全面升级！支持最新版SpringBoot，干掉循环依赖...](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247500820&idx=1&sn=9895bd4c39b90d45eb2a10efedb236ac&scene=21#wechat_redirect)
*   [阿里出品！SpringBoot应用自动化部署神器，IDEA版Jenkins？](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247500584&idx=1&sn=14ab8fa74ed8391a5cb91449f699123a&scene=21#wechat_redirect)
*   [再见命令行！一键部署应用到远程服务器，IDEA官方Docker插件真香！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247500482&idx=1&sn=713a30c88cea125f4768e6a0df939600&scene=21#wechat_redirect)
*   [还在从零开始搭建项目？这款升级版快速开发脚手架值得一试！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247500084&idx=1&sn=5bd4e684af3cfede8f332c423a478abf&scene=21#wechat_redirect)
*   [重磅更新！Mall实战教程全面升级，瞬间高大上了！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247499376&idx=1&sn=3ed28795cdd35fbaa3506e74a56703b0&scene=21#wechat_redirect)
*   [40K+Star！Mall电商实战项目开源回忆录！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247486684&idx=1&sn=807fd808adac8019eb2095ba088efe54&scene=21#wechat_redirect)



![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-biezysystemcurrenttimemillistjhsltlowstopwatchhydb-eba82a19-3f81-4707-a327-8901d03a9c49.jpg)

>转载链接：[https://mp.weixin.qq.com/s/lo9vq-YToQF-u76b_fabvg](https://mp.weixin.qq.com/s/lo9vq-YToQF-u76b_fabvg)，出处：macrozheng，整理：沉默王二
