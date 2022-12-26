---
title: Log4j：Java日志框架的鼻祖
category:
  - Java企业级开发
tag:
  - 辅助工具/轮子
---



空了的时候，我都会在群里偷偷摸摸地潜水，对小伙伴们的一举一动、一言一行筛查诊断。一副班主任的即时感，让我感到非常的快乐，**略微夹带一丝丝的枯燥**。

这不，我在战国时代读者群里发现了这么一串聊天记录：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/log4j-cacd9e88-4a4d-4127-a18b-f99b2e2296a3.png)

竟然有小伙伴不知道“打日志”是什么意思，不知道该怎么学习，还有小伙伴回答说，只知道 Log4j！

有那么一刻，我遭受到了一万点暴击，内心莫名的伤感，犹如一匹垂头丧气的狗。因为网络上总有一些不怀好意的人不停地攻击我，说我写的文章入门，毫无深度——他们就是我命中注定的黑子，不信你到脉脉上搜“沉默王二”，就能看到他们毫无新意的抨击。

我就想问一下，怎么了，入门的文章有入门的群体需要，而我恰好帮助了这么一大批初学者，我应该受到褒奖好不好？

（说好的不在乎，怎么在乎起来了呢？手动狗头）

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/log4j-58282c4d-8178-45bd-8ba3-26740f6dd4a3.png)


管他呢，**我行我素**吧，保持初心不改就对了！这篇文章就来说说 Log4j，这个打印日志的鼻祖。Java 中的日志打印其实是个艺术活，我保证，这句话绝不是忽悠。

事实证明，打印日志绝逼会影响到程序的性能，这是不可否认的，毕竟多做了一项工作。尤其是在交易非常频繁的程序里，涌现大量的日志确实会比较低效。

基于性能上的考量，小伙伴们很有必要认认真真地学习一下如何优雅地打印 Java 日志。毕竟，[性能](https://mp.weixin.qq.com/s/vEt_ypvByKS-oCsuRmpgUw)是一个程序员优不优秀的重要考量。

### 01、为什么需要在 Java 中打印日志

`System.out.println()` 恐怕是我们在学习 Java 的时候，最常用的一种打印日志的方式了，几乎每个 Java 初学者都这样干过，甚至一些老鸟。

之所以这样打印日志，是因为很方便，上手难度很低，尤其是在 IDEA 的帮助下，只需在键盘上按下 `so` 两个字母就可以调出 `System.out.println()`。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/log4j-64dbb12b-8f6b-4ee3-ab5a-60519dd9112f.png)

在本地环境下，使用 `System.out.println()` 打印日志是没问题的，可以在控制台看到信息。但如果是在生产环境下的话，`System.out.println()` 就变得毫无用处了。

控制台打印出的信息并没有保存到日志文件中，只能即时查看，在一屏日志的情况下还可以接受。如果日志量非常大，控制台根本就装不下。所以就需要更高级的日志记录 API（比如 Log4j 和 java.util.logging）。

它们可以把大量的日志信息保存到文件中，并且控制每个文件的大小，如果满了，就存储到下一个，方便查找。

### 02、选择不同日志级别的重要性

使用 Java 日志的时候，一定要注意日志的级别，比如常见的 DEBUG、INFO、WARN 和 ERROR。

DEBUG 的级别最低，当需要打印调试信息的话，就用这个级别，不建议在生产环境下使用。

INFO 的级别高一些，当一些重要的信息需要打印的时候，就用这个。

WARN，用来记录一些警告类的信息，比如说客户端和服务端的连接断开了，数据库连接丢失了。

ERROR 比 WARN 的级别更高，用来记录错误或者异常的信息。

FATAL，当程序出现致命错误的时候使用，这意味着程序可能非正常中止了。

OFF，最高级别，意味着所有消息都不会输出了。

这个级别是基于 Log4j 的，和 java.util.logging 有所不同，后者提供了更多的日志级别，比如说 SEVERE、FINER、FINEST。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/log4j-4919cd20-e524-43a2-8b41-9eab6ac0c1e4.png)


### 03、错误的日志记录方式是如何影响性能的

为什么说错误的日志记录方式会影响程序的性能呢？因为日志记录的次数越多，意味着执行文件 IO 操作的次数就越多，这也就意味着会影响到程序的性能，能 get 吧？

虽然说普通硬盘升级到固态硬盘后，读写速度快了很多，但磁盘相对于内存和 CPU 来说，还是太慢了！就像马车和奔驰之间的速度差距。

这也就是为什么要选择日志级别的重要性。对于程序来说，记录日志是必选项，所以能控制的就是日志的级别，以及在这个级别上打印的日志。

对于 DEBUG 级别的日志来说，一定要使用下面的方式来记录：

```java
if(logger.isDebugEnabled()){ 
    logger.debug("DEBUG 是开启的"); 
} 
```

当 DEBUG 级别是开启的时候再打印日志，这种方式在你看很多源码的时候就可以发现，很常见。

切记，在生产环境下，一定不要开启 DEBUG 级别的日志，否则程序在大量记录日志的时候会变很慢，还有可能在你不注意的情况下，悄悄地把磁盘空间撑爆。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/log4j-fd2149c5-2d0c-4c15-897d-d5fa06cce71f.png)


### 04、为什么选择 Log4j 而不是 java.util.logging

java.util.logging 属于原生的日志 API，Log4j 属于第三方类库，但我建议使用 Log4j，因为 Log4j 更好用。java.util.logging 的日志级别比 Log4j 更多，但用不着，就变成了多余。

Log4j 的另外一个好处就是，不需要重新启动 Java 程序就可以调整日志的记录级别，非常灵活。可以通过 log4j.properties 文件来配置 Log4j 的日志级别、输出环境、日志文件的记录方式。

Log4j 还是线程安全的，可以在多线程的环境下放心使用。

先来看一下 java.util.logging 的使用方式：

```java
package com.itwanger;

import java.io.IOException;
import java.util.logging.FileHandler;
import java.util.logging.Logger;
import java.util.logging.SimpleFormatter;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class JavaUtilLoggingDemo {
    public static void main(String[] args) throws IOException {
        Logger logger = Logger.getLogger("test");
        FileHandler fileHandler = new FileHandler("javautillog.txt");
        fileHandler.setFormatter(new SimpleFormatter());
        logger.addHandler(fileHandler);
        logger.info("细小的信息");
    }
}
```

程序运行后会在 target 目录下生成一个名叫 javautillog.txt 的文件，内容如下所示：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/log4j-222181d4-04ba-4487-8386-69b8737d2d5c.png)

再来看一下 Log4j 的使用方式。

第一步，在 pom.xml 文件中引入 Log4j 包：

```xml
<dependency>
    <groupId>log4j</groupId>
    <artifactId>log4j</artifactId>
    <version>1.2.17</version>
</dependency>
```

第二步，在 resources 目录下创建 log4j.properties 文件，内容如下所示：

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

**1）配置根 Logger**，语法如下所示：

```
log4j.rootLogger = [ level ] , appenderName, appenderName, …
```

level 就是日志的优先级，从高到低依次是 ERROR、WARN、INFO、DEBUG。如果这里定义的是 INFO，那么低级别的 DEBUG 日志信息将不会打印出来。

appenderName 就是指把日志信息输出到什么地方，可以指定多个地方，当前的配置文件中有 3 个地方，分别是 stdout、D、E。

**2）配置日志输出的目的地**，语法如下所示：

```
log4j.appender.appenderName = fully.qualified.name.of.appender.class  
log4j.appender.appenderName.option1 = value1  
…  
log4j.appender.appenderName.option = valueN
```

Log4j 提供的目的地有下面 5 种：

- org.apache.log4j.ConsoleAppender：控制台
- org.apache.log4j.FileAppender：文件
- org.apache.log4j.DailyRollingFileAppender：每天产生一个文件
- org.apache.log4j.RollingFileAppender：文件大小超过阈值时产生一个新文件
- org.apache.log4j.WriterAppender：将日志信息以流格式发送到任意指定的地方

**3）配置日志信息的格式**，语法如下所示：

```
log4j.appender.appenderName.layout = fully.qualified.name.of.layout.class  
log4j.appender.appenderName.layout.option1 = value1  
…  
log4j.appender.appenderName.layout.option = valueN
```

Log4j 提供的格式有下面 4 种：

- org.apache.log4j.HTMLLayout：HTML 表格
- org.apache.log4j.PatternLayout：自定义
- org.apache.log4j.SimpleLayout：包含日志信息的级别和信息字符串
- org.apache.log4j.TTCCLayout：包含日志产生的时间、线程、类别等等信息

自定义格式的参数如下所示：

- %m：输出代码中指定的消息
- %p：输出优先级
- %r：输出应用启动到输出该日志信息时花费的毫秒数
- %c：输出所在类的全名
- %t：输出该日志所在的线程名
- %n：输出一个回车换行符
- %d：输出日志的时间点
- %l：输出日志的发生位置，包括类名、线程名、方法名、代码行数，比如：`method:com.itwanger.Log4jDemo.main(Log4jDemo.java:14)`


第三步，写个使用 Demo：

```java
package com.itwanger;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class Log4jDemo {
    private static final Logger logger = LogManager.getLogger(Log4jDemo.class);

    public static void main(String[] args) {
        // 记录debug级别的信息
        logger.debug("debug.");

        // 记录info级别的信息
        logger.info("info.");

        // 记录error级别的信息
        logger.error("error.");
    }
}
```

**1）获取 Logger 对象**

要使用 Log4j 的话，需要先获取到 Logger 对象，它用来负责日志信息的打印。通常的格式如下所示：

```java
private static final Logger logger = LogManager.getLogger(Log4jDemo.class);
```

**2）打印日志**

有了 Logger 对象后，就可以按照不同的优先级打印日志了。常见的有以下 4 种：

```java
Logger.debug() ;  
Logger.info() ;  
Logger.warn() ;  
Logger.error() ;
```

程序运行后会在 target 目录下生成两个文件，一个名叫 debug.log，内容如下所示：

```
2020-10-20 20:53:27  [ main:0 ] - [ DEBUG ]  debug.
2020-10-20 20:53:27  [ main:3 ] - [ INFO ]  info.
2020-10-20 20:53:27  [ main:3 ] - [ ERROR ]  error.
```

另外一个名叫 error.log，内容如下所示：

```
2020-10-20 20:53:27  [ main:3 ] - [ ERROR ]  error.
```

### 05、打印日志的 8 个小技巧

1）在打印 DEBUG 级别的日志时，切记要使用 `isDebugEnabled()`！那小伙伴们肯定非常好奇，为什么要这样做呢？

先来看一下 `isDebugEnabled()` 方法的源码：

```java
  public
  boolean isDebugEnabled() {
    if(repository.isDisabled( Level.DEBUG_INT))
      return false;
    return Level.DEBUG.isGreaterOrEqual(this.getEffectiveLevel());
  }
```

内部使用了 `isDisabled()` 方法进行了日志级别的判断，如果 DEBUG 是禁用的话，就 return false 了。

再来看一下 `debug()` 方法的源码：

```java
  public
  void debug(Object message) {
    if(repository.isDisabled(Level.DEBUG_INT))
      return;
    if(Level.DEBUG.isGreaterOrEqual(this.getEffectiveLevel())) {
      forcedLog(FQCN, Level.DEBUG, message, null);
    }
  }
```

咦，不是也用 `isDisabled()` 方法判断吗？难道使用 `isDebugEnabled()`不是画蛇添足吗？直接用 `logger.debug()` 不香吗？我来给小伙伴们解释下。

如果我们在打印日志信息的时候需要附带一个方法去获取参数值，就像下面这样：

```java
logger.debug("用户名是：" + getName());
```

假如 `getName()` 方法需要耗费的时间长达 6 秒，那完了！尽管配置文件里的日志级别定义的是 INFO，`getName()` 方法仍然会倔强地执行 6 秒，完事后再 `debug()`，这就很崩了！

明明 INFO 的时候 `debug()` 是不执行的，意味着 `getName()` 也不需要执行的，偏偏就执行了 6 秒，是不是很傻？

```java
if(logger.isDebugEnabled()) {
    logger.debug("用户名是：" + getName());
}
```

换成上面这种方式，那确定此时 `getName()` 是不执行的，对吧？

为了程序性能上的考量，`isDebugEnabled()` 就变得很有必要了！假如说 `debug()` 的时候没有传参，确实是不需要判断 DEBUG 是否启用的。

2）慎重选择日志信息的打印级别，因为这太重要了！如果只能通过日志查看程序发生了什么问题，那必要的信息是必须要打印的，但打印得太多，又会影响到程序的性能。

所以，该 INFO 的 `info()`，该 DEBUG 的 `debug()`，不要随便用。

3）使用 Log4j 而不是 `System.out`、`System.err` 或者 `e.printStackTrace()` 来打印日志，原因之前讲过了，就不再赘述了。

4）使用 log4j.properties 文件来配置日志，尽管它不是必须项，使用该文件会让程序变得更灵活，有一种我的地盘我做主的味道。

5）不要忘记在打印日志的时候带上类的全名和线程名，在多线程环境下，这点尤为重要，否则定位问题的时候就太难了。

6）打印日志信息的时候尽量要完整，不要太过于缺省，尤其是在遇到异常或者错误的时候（信息要保留两类：案发现场信息和异常堆栈信息，如果不做处理，通过 throws 关键字往上抛），免得在找问题的时候都是一些无用的日志信息。

7）要对日志信息加以区分，把某一类的日志信息在输出的时候加上前缀，比如说所有数据库级别的日志里添加 `DB_LOG`，这样的日志非常大的时候可以通过 `grep` 这样的 Linux 命令快速定位。

8）不要在日志文件中打印密码、银行账号等敏感信息。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/log4j-42d3a052-daeb-450a-a775-a32f983dd688.png)


### 06、 总结

打印日志真的是一种艺术活，搞不好会严重影响服务器的性能。最可怕的是，记录了日志，但最后发现屁用没有，那简直是苍了个天啊！尤其是在生产环境下，问题没有记录下来，但重现有一定的随机性，到那时候，真的是叫天天不应，叫地地不灵啊！

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
