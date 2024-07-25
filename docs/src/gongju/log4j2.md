---
title: Log4j 2：Apache维护的一款高性能日志记录工具
category:
  - Java企业级开发
tag:
  - 辅助工具/轮子
---

Log4j 2，顾名思义，它就是 Log4j 的升级版，就好像手机里面的 Pro 版。我作为一个写文章方面的工具人，或者叫打工人，怎么能不写完这最后一篇。

Log4j、SLF4J、Logback 是一个爹——Ceki Gulcu，但 Log4j 2 却是例外，它是 Apache 基金会的产品。

SLF4J 和 Logback 作为 Log4j 的替代品，在很多方面都做了必要的改进，那为什么还需要 Log4j 2 呢？我只能说 Apache 基金会的开发人员很闲，不，很拼，要不是他们这种精益求精的精神，这个编程的世界该有多枯燥，毕竟少了很多可以用“拿来就用”的轮子啊。

上一篇也说了，老板下死命令要我把日志系统切换到 Logback，我顺利交差了，老板很开心，夸我这个打工人很敬业。为了表达对老板的这份感谢，我决定偷偷摸摸地试水一下 Log4j 2，尽管它还不是个成品，可能会会项目带来一定的隐患。但谁让咱是一个敬岗爱业的打工人呢。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/log4j2-a9461265-7652-4512-9219-6b3e82392415.png)


### 01、Log4j 2 强在哪

1）在多线程场景下，Log4j 2 的吞吐量比 Logback 高出了 10 倍，延迟降低了几个数量级。这话听起来像吹牛，反正是 Log4j 2 官方自己吹的。

Log4j 2 的异步 Logger 使用的是无锁数据结构，而 Logback 和 Log4j 的异步 Logger 使用的是 ArrayBlockingQueue。对于阻塞队列，多线程应用程序在尝试使日志事件入队时通常会遇到锁争用。

下图说明了多线程方案中无锁数据结构对吞吐量的影响。 Log4j 2 随着线程数量的扩展而更好地扩展：具有更多线程的应用程序可以记录更多的日志。其他日志记录库由于存在锁竞争的关系，在记录更多线程时，总吞吐量保持恒定或下降。这意味着使用其他日志记录库，每个单独的线程将能够减少日志记录。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/log4j2-43f0b03d-5c4a-4af3-9e4c-177956246740.png)

性能方面是 Log4j 2 的最大亮点，至于其他方面的一些优势，比如说下面这些，可以忽略不计，文字有多短就代表它有多不重要。

2）Log4j 2 可以减少垃圾收集器的压力。

3）支持 Lambda 表达式。

4）支持自动重载配置。

### 02、Log4j 2 使用示例

废话不多说，直接实操开干。理论知识有用，但不如上手实操一把，这也是我多年养成的一个“不那么良好”的编程习惯：在实操中发现问题，解决问题，寻找理论基础。

**第一步**，在 pom.xml 文件中添加 Log4j 2 的依赖：

```xml
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-api</artifactId>
    <version>2.5</version>
</dependency>
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-core</artifactId>
    <version>2.5</version>
</dependency>
```

（这个 artifactId 还是 log4j，没有体现出来 2，而在 version 中体现，多少叫人误以为是 log4j）

**第二步**，来个最简单的测试用例：

```java
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class Demo {
    private static final Logger logger = LogManager.getLogger(Demo.class);
    public static void main(String[] args) {
        logger.debug("log4j2");
    }
}
```

运行 Demo 类，可以在控制台看到以下信息：

```
ERROR StatusLogger No log4j2 configuration file found. Using default configuration: logging only errors to the console.
```

Log4j 2 竟然没有在控制台打印“ log4j2”，还抱怨我们没有为它指定配置文件。在这一点上，我就觉得它没有 Logback 好，毕竟人家会输出。

这对于新手来说，很不友好，因为新手在遇到这种情况的时候，往往不知所措。日志里面虽然体现了 ERROR，但代码并没有编译出错或者运行出错，凭什么你不输出？

那作为编程老鸟来说，我得告诉你，这时候最好探究一下为什么。怎么做呢？

我们可以复制一下日志信息中的关键字，比如说：“No log4j2 configuration file found”，然后在 Intellij IDEA 中搜一下，如果你下载了源码和文档的话，不除意外，你会在 ConfigurationFactory 类中搜到这段话。

可以在方法中打个断点，然后 debug 一下，你就会看到下图中的内容。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/log4j2-4ba440d9-c0b6-4ad2-b538-9d303cc99d90.png)

通过源码，你可以看得到，Log4j 2 会去寻找 4 种类型的配置文件，后缀分别是 properties、yaml、json 和 xml。前缀是 log4j2-test 或者 log4j2。

得到这个提示后，就可以进行第三步了。

**第三步，**在 resource 目录下增加 log4j2-test.xml 文件（方便和 Logback 做对比），内容如下所示：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration>
    <Appenders>
        <Console name="Console" target="SYSTEM_OUT">
            <PatternLayout pattern="%d{HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n"/>
        </Console>
    </Appenders>
    <Loggers>
        <Root level="DEBUG">
            <AppenderRef ref="Console"/>
        </Root>
    </Loggers>
</Configuration>
```

Log4j 2 的配置文件格式和 Logback 有点相似，基本的结构为 `< Configuration>` 元素，包含 0 或多个 `< Appenders>` 元素，其后跟 0 或多个 `< Loggers>` 元素，里面再跟最多只能存在一个的 `< Root>` 元素。

**1）配置 appender**，也就是配置日志的输出目的地。

有 Console，典型的控制台配置信息上面你也看到了，我来简单解释一下里面 pattern 的格式：

- `%d{HH:mm:ss.SSS}` 表示输出到毫秒的时间

- `%t` 输出当前线程名称

- `%-5level` 输出日志级别，-5 表示左对齐并且固定输出 5 个字符，如果不足在右边补空格

- `%logger` 输出 logger 名称，最多 36 个字符

- `%msg` 日志文本

- `%n` 换行

顺带补充一下其他常用的占位符：

- `%F` 输出所在的类文件名，如 Demo.java

- `%L` 输出行号

- `%M` 输出所在方法名

- `%l`  输出语句所在的行数, 包括类名、方法名、文件名、行数

- `%p` 输出日志级别

- `%c` 输出包名，如果后面跟有 `{length.}` 参数，比如说 `%c{1.}`，它将输出报名的第一个字符，如 `com.itwanger` 的实际报名将只输出 `c.i`

再次运行 Demo 类，就可以在控制台看到打印的日志信息了：

```
10:14:04.657 [main] DEBUG com.itwanger.Demo - log4j2
```

**2）配置 Loggers**，指定 Root 的日志级别，并且指定具体启用哪一个 Appenders。

**3）自动重载配置**。

Logback 支持自动重载配置，Log4j 2 也支持，那想要启用这个功能也非常简单，只需要在 Configuration 元素上添加 `monitorInterval` 属性即可。

```
<Configuration monitorInterval="30">
...
</Configuration>
```

注意值要设置成非零，上例中的意思是至少 30 秒后检查配置文件中的更改。最小间隔为 5 秒。

### 03、Async 示例

除了 Console，还有 Async，可以配合文件的方式来异步写入，典型的配置信息如下所示：

```
<Configuration>
  <Appenders>
    <File name="DebugFile" fileName="debug.log">
      <PatternLayout>
        <Pattern>%d %p %c [%t] %m%n</Pattern>
      </PatternLayout>
    </File>
    <Async name="Async">
      <AppenderRef ref="DebugFile"/>
    </Async>
  </Appenders>
  <Loggers>
    <Root level="debug">
      <AppenderRef ref="Async"/>
    </Root>
  </Loggers>
</Configuration>
```

对比 Logback 的配置文件来看，Log4j 2 真的复杂了一些，不太好用，就这么直白地说吧！但自己约的，含着泪也得打完啊。把这个 Async 加入到 Appenders：

```
<Configuration>
    <Appenders>
        <Console name="Console" target="SYSTEM_OUT">
            <PatternLayout pattern="%d{HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n"/>
        </Console>
        <File name="DebugFile" fileName="debug.log">
            <PatternLayout>
                <Pattern>%d %p %c [%t] %m%n</Pattern>
            </PatternLayout>
        </File>
        <Async name="Async">
            <AppenderRef ref="DebugFile"/>
        </Async>
    </Appenders>
    <Loggers>
        <Root level="DEBUG">
            <AppenderRef ref="Console"/>
            <AppenderRef ref="Async"/>
        </Root>
    </Loggers>
</Configuration>
```

再次运行 Demo 类，可以在项目根路径下看到一个 debug.log 文件，内容如下所示：

```
2020-10-30 09:35:49,705 DEBUG com.itwanger.Demo [main] log4j2
```

### 04、RollingFile 示例

当然了，Log4j 和 Logback 我们都配置了 RollingFile，Log4j 2 也少不了。RollingFile 会根据 Triggering（触发）策略和 Rollover（过渡）策略来进行日志文件滚动。如果没有配置 Rollover，则使用 DefaultRolloverStrategy 来作为 RollingFile 的默认配置。

触发策略包含有，基于 cron 表达式（源于希腊语，时间的意思，用来配置定期执行任务的时间格式）的 CronTriggeringPolicy；基于文件大小的 SizeBasedTriggeringPolicy；基于时间的 TimeBasedTriggeringPolicy。

过渡策略包含有，默认的过渡策略 DefaultRolloverStrategy，直接写入的 DirectWriteRolloverStrategy。一般情况下，采用默认的过渡策略即可，它已经足够强大。

来看第一个基于 SizeBasedTriggeringPolicy 和 TimeBasedTriggeringPolicy 策略，以及缺省 DefaultRolloverStrategy 策略的配置示例：

```
<Configuration>
  <Appenders>
    <RollingFile name="RollingFile" fileName="rolling.log"
                 filePattern="rolling-%d{yyyy-MM-dd}-%i.log">
      <PatternLayout>
        <Pattern>%d %p %c{1.} [%t] %m%n</Pattern>
      </PatternLayout>
      <Policies>
        <SizeBasedTriggeringPolicy size="1 KB"/>
      </Policies>
    </RollingFile>
  </Appenders>
  <Loggers>
    <Root level="debug">
      <AppenderRef ref="RollingFile"/>
    </Root>
  </Loggers>
</Configuration>
```

为了验证文件的滚动策略，我们调整一下 Demo 类，让它多打印点日志：

```
for (int i = 1;i < 20; i++) {
    logger.debug("微信搜索「{}」，回复关键字「{}」，有惊喜哦","沉默王二", "java");
}
```

再次运行 Demo 类，可以看到根目录下多了 3 个日志文件：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/log4j2-07af98ca-cf94-427e-adb6-bd935e32a8d0.png)


结合日志文件名，再来看 RollingFile 的配置，就很容易理解了。

1）fileName 用来指定文件名。

2）filePattern 用来指定文件名的模式，它取决于过渡策略。

由于配置文件中没有显式指定过渡策略，因此 RollingFile 会启用默认的 DefaultRolloverStrategy。

先来看一下 DefaultRolloverStrategy 的属性：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/log4j2-32b853ce-8beb-496b-b66f-31b650c257ab.png)

再来看 filePattern 的值 `rolling-%d{yyyy-MM-dd}-%i.log`，其中 `%d{yyyy-MM-dd}` 很好理解，就是年月日；其中 `%i` 是什么意思呢？

第一个日志文件名为 rolling.log（最近的日志放在这个里面），第二个文件名除去日期为 rolling-1.log，第二个文件名除去日期为 rolling-2.log，根据这些信息，你能猜到其中的规律吗？

其实和 DefaultRolloverStrategy 中的 max 属性有关，目前使用的默认值，也就是 7，那就当 rolling-8.log 要生成的时候，删除 rolling-1.log。可以调整 Demo 中的日志输出量来进行验证。



3）SizeBasedTriggeringPolicy，基于日志文件大小的时间策略，大小以字节为单位，后缀可以是 KB，MB 或 GB，例如 20 MB。

再来看一个日志文件压缩的示例，来看配置：

```
<RollingFile name="RollingFileGZ" fileName="gz/rolling.log"
             filePattern="gz/%d{yyyy-MM-dd-HH}-%i.rolling.gz">
    <PatternLayout>
        <Pattern>%d %p %c{1.} [%t] %m%n</Pattern>
    </PatternLayout>
    <Policies>
        <SizeBasedTriggeringPolicy size="1 KB"/>
    </Policies>
</RollingFile>
```

- fileName 的属性值中包含了一个目录 gz，也就是说日志文件都将放在这个目录下。

- filePattern 的属性值中增加了一个 gz 的后缀，这就表明日志文件要进行压缩了，还可以是 zip 格式。

运行 Demo 后，可以在 gz 目录下看到以下文件：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/log4j2-1b04167d-a11f-4447-9062-cb3cdd59aa73.png)

到此为止，Log4j 2 的基本使用示例就已经完成了。测试环境搞定，我去问一下老板，要不要在生产环境下使用 Log4j 2。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
