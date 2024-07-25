---
title: SLF4J：阿里巴巴强制使用的日志门面担当
category:
  - Java企业级开发
tag:
  - 辅助工具/轮子
---

我在读嵩山版的阿里巴巴开发手册（没有的小伙伴，记着找我要）的时候，就发现了一条「**强制**」性质的日志规约：

>应用中不可以直接使用日志系统（Log4j、Logback）中的 API，而应该使用日志框架中的 API，比如说 SLF4J，使用门面模式的日志框架，有利于维护和统一各个类的日志处理方式。

（为什么我把这段文字手敲了下来呢，因为我发现阿里巴巴开发手册上的有语病，瞧下面红色标出的部分）

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/slf4j-94ba034a-c6e6-46e0-bff3-b658bf35945f.png)

（维护和统一，把统一放在最后面读起来真的是别扭，和的有点牵强，请问手册的小编是数学老师教的语文吧？）

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/slf4j-a7a6e0ae-cbee-428e-8a45-2f5a33243625.png)

那看到这条强制性的规约，我就忍不住想要问：“为什么阿里巴巴开发手册会强制使用 SLF4J 作为 Log4J 的门面担当呢？”究竟这背后藏了什么“不可告人”的秘密？

（请小伙伴们自行配上 CCTV 12 台的那种 BGM）

PS：顺带给小伙伴们普及一点小知识，阿里巴巴开发手册上出现的 Jakarta 其实是 Apache 软件基金会下的一个开源项目。其实 Commons 是以前隶属于 Jakarta，现在是作为 Apache 下的一个单独项目，阿里巴巴开发手册上的描述已经不太恰当了，换成是 Apache Commons Logging 会更合适一点。

（忍不住又给阿里巴巴开发手册挑了一个毛病，请原谅我“一丝不苟”的做事态度）

### 01、SLF4J 是什么

SLF4J 是 Simple Logging Facade for Java 的缩写（for≈4），也就是简易的日志门面，以外观模式（Facade pattern，一种设计模式，为子系统中的一组接口提供一个统一的高层接口，使得子系统更容易使用）实现，支持 java.util.logging、Log4J 和 Logback。

SLF4J 的作者就是 Log4J 和 Logback 的作者，他的 GitHub 主页长下面这样：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/slf4j-c72cd63d-b15b-401c-8399-ad0355f1f802.png)

一股秋风瑟瑟的清冷感扑面而来，有没有？可能巨佬不屑于维护他的 GitHub 主页吧？我的 GitHub 主页够凄惨了，没想到巨佬比我还惨，终于可以吹牛逼地说，“我，沉默王二，GitHub 主页比 SLF4J、Log4J 和 Logback 的作者 Ceki Gulcu 绿多了。。。。。。”

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/slf4j-cdc9e0fb-71ab-42e7-8024-7e9cfd9b30c3.png)

1996 年初，欧洲安全电子市场项目决定编写自己的跟踪 API，最后该 API 演变成了 Log4j，已经推出就备受宠爱。

2002 年 2 月，Sun 推出了自己的日志包 java.util.logging（可称 JUL），据说实现思想借鉴了 Log4j，毕竟此时的 Log4j 已经很成熟了。

2002 年 8 月，Apache 就推出了自己的日志包，也就是阿里巴巴开发手册上提到的 JCL（Jakarta Commons Logging）。JCL 的野心很大，它在 JUL 和 Log4j 的基础上提供了一个抽象层的接口，方便使用者在 JUL 和 Log4j 之间切换。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/slf4j-5b40fac4-0ab1-467d-9dc1-85c43ed879e7.png)

但 JCL 好像并不怎么招人喜欢，有人是这样抱怨的：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/slf4j-795d5543-7bd1-450a-8a35-a151be106b3b.png)

Ceki Gulcu 也觉得 JCL 不好，要不然他也不会在 2005 年自己撸一个名叫 SLF4J 的新项目，对吧？但出来混总是要付出代价的，SLF4J 只有接口，没有实现，总不能强逼着 Java 和 Apache 去实现 SLF4J 接口吧？这太难了，不现实。

但巨佬之所以称之为巨佬，是因为他拥有超出普通人的惊人之处，他在 SLF4J 和 JUL、Log4j、JCL 之间搭了三座桥：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/slf4j-3044b416-ff14-408f-b933-71993b7ddeee.png)

巨佬动手，丰衣足食，有没有？狠起来连自己的 Log4j 都搭个桥。

面对巨佬的霸气，我只想弱弱地说一句，“ SLF4J 这个门面担当，你以为好当的啊？”

### 02、SLF4J 解决了什么痛点

春秋战国的时候，每个国家都有自己的货币，用别国的货币也不合适，对吧？那在发生贸易的时候就比较麻烦了，货币不统一，就没法直接交易，因为货币可能不等价。

那秦始皇统一六国后，就推出了新的货币政策，全国都用一种货币，那之前的问题就解决掉了。

你看，同样的道理，日志系统有 JUL、JCL，Ceki Gulcu 自己又写了 2 种，Log4j 和 Logback，各有各的优缺点，再加上使用者千千万，萝卜白菜各有所爱，这就导致不同的应用可能会用不同的日志系统。

假设我们正在开发一套系统，打算用 SLF4J 作为门面，Log4j 作为日志系统，我们在项目中使用了 A 框架，而 A 框架的门面是 JCL，日志系统是 JUL，那就相等于要维护两套日志系统，对吧？

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/slf4j-e66a78a6-1ef6-42c1-86fa-a4c57b3ef160.png)

这就难受了！

Ceki Gulcu 想到了这个问题，并且帮我们解决了！来看 SLF4J 官网给出的解决方案。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/slf4j-5e1021d6-6a81-492b-b8d3-f9438014b53b.png)

- 使用 jcl-over-slf4j.jar 替换 commons-logging.jar
- 引入 jul-to-slf4j.jar

为了模拟这个过程，我们来建一个使用 JCL 的项目。

第一步，在 pom.xml 文件中引入 commons-logging.jar：

```xml
<dependency>
    <groupId>commons-logging</groupId>
    <artifactId>commons-logging</artifactId>
    <version>1.2</version>
</dependency>
```

第二步，新建测试类：

```java
package com.itwanger;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class Demo {
    private static Log logger = LogFactory.getLog(Demo.class);
    public static void main(String[] args) {
        logger.info("jcl");
    }
}
```

该类会通过 LogFactory 获取一个 Log 对象，并且使用 `info()` 方法打印一行日志。

调试这段代码的过程中你会发现，Log 的实现有四种：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/slf4j-a1db024d-1b29-47b2-a1f8-70b899d5b7c0.png)

如果没有绑定 Log4j 的话，就会默认选择 Jdk14Logger——它返回的 Logger 对象，正是 java.util.logging.Logger，也就是 JUL。

因此，就可以在控制台看到以下信息：

```
10月 21, 2020 3:13:30 下午 com.itwanger.Demo main
信息: jcl
```

怎么把使用 JCL 的项目改造成使用 SLF4J 的呢？

第三步，使用 jcl-over-slf4j.jar 替换 commons-logging.jar，并加入 jul-to-slf4j.jar、slf4j-log4j12.jar（会自动引入 slf4j-api.jar 和 log4j.jar）：

```xml
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>jcl-over-slf4j</artifactId>
    <version>1.7.25</version>
</dependency>

<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>jul-to-slf4j</artifactId>
    <version>1.7.29</version>
</dependency>

<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-log4j12</artifactId>
    <version>1.7.25</version>
</dependency>
```

第四步，在 resources 目录下创建 log4j.properties 文件，内容如下所示：

```
### 设置###
log4j.rootLogger = debug,stdout,D

### 输出信息到控制台 ###
log4j.appender.stdout = org.apache.log4j.ConsoleAppender
log4j.appender.stdout.Target = System.out
log4j.appender.stdout.layout = org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern = [%-5p] %d{yyyy-MM-dd HH:mm:ss,SSS} method:%l%n%m%n

### 输出DEBUG 级别以上的日志到=debug.log ###
log4j.appender.D = org.apache.log4j.DailyRollingFileAppender
log4j.appender.D.File = debug.log
log4j.appender.D.Append = true
log4j.appender.D.Threshold = DEBUG 
log4j.appender.D.layout = org.apache.log4j.PatternLayout
log4j.appender.D.layout.ConversionPattern = %d{yyyy-MM-dd HH:mm:ss}  [ %t:%r ] - [ %p ]  %m%n
```

再次运行 Demo 类，你会发现 target 目录下会生成一个名叫 debug.log 的文件，内容如下所示：

```
2020-10-21 15:32:06  [ main:0 ] - [ INFO ]  jcl
```

并且可以在控制台看到以下信息：

```
[INFO ] 2020-10-21 15:32:06,192 method:com.itwanger.Demo.main(Demo.java:12)
jcl
```

仔细对比一下，你就会发现，这次输出的格式和之前不一样，这就是因为 Log4j 和 JUL 的日志格式不同导致的。

另外，你有没有发现？我们并没有改动测试类 Demo，它里面使用的仍然是 JCL 获取 Log 的方式：

```java
private static Log logger = LogFactory.getLog(Demo.class);
```

但输出的格式已经切换到 Log4j 了！

SLF4J 除了提供这种解决方案，绑定 Log4j 替换 JUL 和 JCL；还提供了绑定 Logback 替换 JUL、JCL、Log4j 的方案：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/slf4j-d3162919-47e1-4760-beba-7b77cdf42e71.png)

还有绑定 JUL 替换 JCL 和 Log4j 的方案：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/slf4j-a7d80721-ec0f-4b99-a59b-15f8344c3819.png)

太强了，有木有？有的话请在留言区敲出 666。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/slf4j-e9233a42-d13e-4d7d-9d9e-b049d08303aa.png)

###  03、SLF4J 比 Log4J 强在哪

SLF4J 除了解决掉以上的痛点，帮助我们的应用程序独立于任何特定的日志系统，还有一个非常牛逼的功能，那就是 SLF4J 在打印日志的时候使用了占位符 `{}`，它有点类似于 String 类的 `format()` 方法（使用 `%s` 等填充参数），但更加便捷，这在很大程度上提高了程序的性能。

众所周知，字符串是不可变的，字符串拼接会创建很多不必要的字符串对象，极大的消耗了内存空间。但 Log4J 在打印带参数的日志时，只能使用字符串拼接的方式：

```java
String name = "沉默王二";
int age = 18;
logger.debug(name + "，年纪：" + age + "，是个非常不要脸的程序员");
```

非常笨重，但加入了 SLF4J 后，这个问题迎刃而解。我们来看一下在 Log4j 项目中加入 SLF4J 的详细的步骤。

第一步，把 log4j 的依赖替换为 slf4j-log4j12（Maven 会自动引入 slf4j-api.jar 和 log4j.jar）：

```java
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-log4j12</artifactId>
    <version>1.7.25</version>
</dependency>
```

第二步，在 resources 目录下创建 log4j.properties 文件，内容和 [Log4j 那一篇](https://mp.weixin.qq.com/s/AXgNnJe8djD901EmhFkWUg)完全相同：

```
### 设置###
log4j.rootLogger = debug,stdout,D,E

### 输出信息到控制台 ###
log4j.appender.stdout = org.apache.log4j.ConsoleAppender
log4j.appender.stdout.Target = System.out
log4j.appender.stdout.layout = org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern = [%-5p] %d{yyyy-MM-dd HH:mm:ss,SSS} method:%l%n%m%n

### 输出DEBUG 级别以上的日志到=debug.log ###
log4j.appender.D = org.apache.log4j.DailyRollingFileAppender
log4j.appender.D.File = debug.log
log4j.appender.D.Append = true
log4j.appender.D.Threshold = DEBUG 
log4j.appender.D.layout = org.apache.log4j.PatternLayout
log4j.appender.D.layout.ConversionPattern = %d{yyyy-MM-dd HH:mm:ss}  [ %t:%r ] - [ %p ]  %m%n

### 输出ERROR 级别以上的日志到=error.log ###
log4j.appender.E = org.apache.log4j.DailyRollingFileAppender
log4j.appender.E.File =error.log 
log4j.appender.E.Append = true
log4j.appender.E.Threshold = ERROR 
log4j.appender.E.layout = org.apache.log4j.PatternLayout
log4j.appender.E.layout.ConversionPattern = %d{yyyy-MM-dd HH:mm:ss}  [ %t:%r ] - [ %p ]  %m%n
```

第三步，新建测试类：

```java
package com.itwanger;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class Log4jSLF4JDemo {
    private static final Logger logger = LoggerFactory.getLogger(Log4jSLF4JDemo.class);

    public static void main(String[] args) {
        logger.debug("{}，是个非常不要脸的程序员","沉默王二");
    }
}
```

看到了吧，使用占位符要比“+”操作符方便的多。并且此时不再需要 `isDebugEnabled()` 先进行判断，`debug()` 方法会在字符串拼接之前执行。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/slf4j-5e831353-b2a3-4a39-80e3-47a044009d95.png)


如果只是 Log4J 的话，会先进行字符串拼接，再执行 `debug()` 方法，来看示例代码：

```java
String name = "沉默王二";
int age = 18;
logger.debug(name + "，年纪：" + age + "，是个非常不要脸的程序员");
```

在调试这段代码的时候，你会发现的，如下图所示：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/slf4j-4ae3eda7-cd0d-4094-9331-d6070a39c8ea.png)

这也就意味着，如果日志系统的级别不是 DEBUG，就会多执行了字符串拼接的操作，白白浪费了性能。

注意，阿里巴巴开发手册上还有一条「**强制**」级别的规约：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/slf4j-51004734-620a-4c1a-8aa7-6d7f3e1781d6.png)

这是因为如果参数是基本数据类型的话，会先进行自动装箱（`Integer.valueOf()`）。测试代码如下所示：

```java
logger.debug("沉默王二，{}岁", 18);
```

通过反编译工具就可以看得到：

```java
logger.debug("\u6C89\u9ED8\u738B\u4E8C\uFF0C{}\u5C81", Integer.valueOf(18));
```

如果参数需要调用其他方法的话，`debug()` 方法会随后调用。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/slf4j-aec16f40-7849-4a1d-9507-9119707e6c79.png)

也就是说，如果不 `isDebugEnabled()` 的话，在不是 DEBUG 级别的情况下，会多执行自动装箱和调用其他方法的操作——程序的性能就下降了！

测试类运行的结果和之前 Log4J 的一样，小伙伴们可以点击链接跳转到 [Log4j 那篇](https://mp.weixin.qq.com/s/AXgNnJe8djD901EmhFkWUg)对比下。

### 04、总结

简单总结一下这篇文章哈。

1）在使用日志系统的时候，一定要使用 SLF4J 作为门面担当。

2）SLF4J 可以统一日志系统，作为上层的抽象接口，不需要关注底层的日志实现，可以是 Log4j，也可以是 Logback，或者 JUL、JCL。

3）SLF4J 在打印日志的时候可以使用占位符，既提高了程序性能（临时字符串少了，垃圾回收的工作量就小），又让代码变得美观统一。

4）小伙伴们如果知道更多秘密的话，建议在留言区贴出来哦。



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)