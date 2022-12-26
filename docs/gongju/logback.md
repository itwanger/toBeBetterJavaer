---
title: Logback：Spring Boot内置的日志处理框架
category:
  - Java企业级开发
tag:
  - 辅助工具/轮子
---

就在昨天，老板听我说完 Logback 有多牛逼之后，彻底动心了，对我下了死命令，“这么好的日志系统，你还不赶紧点，把它切换到咱的项目当中！”

我们项目之前用的 Log4j，在我看来，已经足够用了，毕竟是小公司，性能上的要求没那么苛刻。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/logback-320329e9-a754-427f-8a19-2e4f809b6a6f.png)

[Log4j](https://mp.weixin.qq.com/s/AXgNnJe8djD901EmhFkWUg) 介绍过了，[SLF4J](https://mp.weixin.qq.com/s/EhKf1rHWL-QII0f6eo0uVA) 也介绍过了，那接下来，你懂的，Logback 就要隆重地登场了，毕竟它哥仨有一个爹，那就是巨佬 Ceki Gulcu。

### 01、Logback 强在哪

1）非常自然地实现了 SLF4J，不需要像 Log4j 和 JUL 那样加一个适配层。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/logback-6ba1b465-5533-49dd-b875-48a10ba29f8e.png)

2）Spring Boot 的默认日志框架使用的是 Logback。一旦某款工具库成为了默认选项，那就说明这款工具已经超过了其他竞品。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/logback-2696cd8b-7e8c-4476-9a06-272fd22fa4b6.png)

注意看下图（证据找到了，来自 [Spring Boot 官网](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-logging)）：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/logback-82d78a15-8ae0-4377-a7af-aebd5cda4fda.png)

也可以通过源码的形式看得到：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/logback-2df2d06e-1b01-428b-8444-d765056e25bb.png)


3）支持自动重新加载配置文件，不需要另外创建扫描线程来监视。

4）既然是巨佬的新作，那必然在性能上有了很大的提升，不然呢？

### 02、Logback 使用示例

**第一步**，在 pom.xml 文件中添加 Logback 的依赖：

```xml
<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-classic</artifactId>
    <version>1.2.3</version>
</dependency>
```

Maven 会自动导入另外两个依赖：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/logback-1f7d8e00-4be6-4863-940c-037862ad2c41.png)

logback-core 是 Logback 的核心，logback-classic 是 SLF4J 的实现。

**第二步**，来个最简单的测试用例：

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class Test {
    static Logger logger = LoggerFactory.getLogger(Test.class);
    public static void main(String[] args) {
        logger.debug("logback");
    }
}
```

Logger 和 LoggerFactory 都来自 SLF4J，所以如果项目是从 Log4j + SLF4J 切换到 Logback 的话，此时的代码是零改动的。

运行 Test 类，可以在控制台看到以下信息：

```
12:04:20.149 [main] DEBUG com.itwanger.Test - logback
```

在没有配置文件的情况下，一切都是默认的，Logback 的日志信息会输出到控制台。可以通过 StatusPrinter 来打印 Logback 的内部信息：

```java
LoggerContext lc = (LoggerContext)LoggerFactory.getILoggerFactory();
StatusPrinter.print(lc);
```

在 main 方法中添加以上代码后，再次运行 Test 类，可以在控制台看到以下信息：

```
12:59:22.314 [main] DEBUG com.itwanger.Test - logback
12:59:22,261 |-INFO in ch.qos.logback.classic.LoggerContext[default] - Could NOT find resource [logback-test.xml]
12:59:22,262 |-INFO in ch.qos.logback.classic.LoggerContext[default] - Could NOT find resource [logback.groovy]
12:59:22,262 |-INFO in ch.qos.logback.classic.LoggerContext[default] - Could NOT find resource [logback.xml]
12:59:22,268 |-INFO in ch.qos.logback.classic.BasicConfigurator@5e853265 - Setting up default configuration.
```

也就是说，Logback 会在 classpath 路径下先寻找 logback-test.xml 文件，没有找到的话，寻找 logback.groovy 文件，还没有的话，寻找 logback.xml 文件，都找不到的话，就输出到控制台。

一般来说，我们会在本地环境中配置 logback-test.xml，在生产环境下配置 logback.xml。

**第三步**，在 resource 目录下增加 logback-test.xml 文件，内容如下所示：

```xml
<configuration debug="true">
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{HH:mm:ss.SSS} %relative [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>

    <root level="debug">
        <appender-ref ref="STDOUT" />
    </root>
</configuration>
```

Logback 的配置文件非常灵活，最基本的结构为 `<configuration>` 元素，包含 0 或多个 `<appender>` 元素，其后跟 0 或多个 `<logger>` 元素，其后再跟最多只能存在一个的 `<root>` 元素。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/logback-b81ab795-2a2c-44c3-a4b8-b96ef78dcd88.png)


**1）配置 appender**，也就是配置日志的输出目的地，通过 name 属性指定名字，通过 class 属性指定目的地：

- ch.qos.logback.core.ConsoleAppender：输出到控制台。
- ch.qos.logback.core.FileAppender：输出到文件。
- ch.qos.logback.core.rolling.RollingFileAppender：文件大小超过阈值时产生一个新文件。

除了输出到本地，还可以通过 SocketAppender 和 SSLSocketAppender 输出到远程设备，通过 SMTPAppender 输出到邮件。甚至可以通过 DBAppender 输出到数据库中。

encoder 负责把日志信息转换成字节数组，并且把字节数组写到输出流。

pattern 用来指定日志的输出格式：

- `%d`：输出的时间格式。
- `%thread`：日志的线程名。
- `%-5level`：日志的输出级别，填充到 5 个字符。比如说 info 只有 4 个字符，就填充一个空格，这样日志信息就对齐了。

反例（没有指定 -5 的情况）：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/logback-b30bc0ca-5c78-4853-922b-36bb0c7d8628.png)


- `%logger{length}`：logger 的名称，length 用来缩短名称。没有指定表示完整输出；0 表示只输出 logger 最右边点号之后的字符串；其他数字表示输出小数点最后边点号之前的字符数量。
- `%msg`：日志的具体信息。
- `%n`：换行符。
- `%relative`：输出从程序启动到创建日志记录的时间，单位为毫秒。

**2）配置 root**，它只支持一个属性——level，值可以为：TRACE、DEBUG、INFO、WARN、ERROR、ALL、OFF。

appender-ref 用来指定具体的 appender。

**3）查看内部状态信息**。

可以在代码中通过 StatusPrinter 来打印 Logback 内部状态信息，也可以通过在 configuration 上开启 debug 来打印内部状态信息。

重新运行 Test 类，可以在控制台看到以下信息：

```
13:54:54,718 |-INFO in ch.qos.logback.classic.LoggerContext[default] - Found resource [logback-test.xml] at [file:/Users/maweiqing/Documents/GitHub/JavaPointNew/codes/logbackDemo/target/classes/logback-test.xml]
13:54:54,826 |-INFO in ch.qos.logback.core.joran.action.AppenderAction - About to instantiate appender of type [ch.qos.logback.core.ConsoleAppender]
13:54:54,828 |-INFO in ch.qos.logback.core.joran.action.AppenderAction - Naming appender as [STDOUT]
13:54:54,833 |-INFO in ch.qos.logback.core.joran.action.NestedComplexPropertyIA - Assuming default type [ch.qos.logback.classic.encoder.PatternLayoutEncoder] for [encoder] property
13:54:54,850 |-INFO in ch.qos.logback.classic.joran.action.RootLoggerAction - Setting level of ROOT logger to DEBUG
13:54:54,850 |-INFO in ch.qos.logback.core.joran.action.AppenderRefAction - Attaching appender named [STDOUT] to Logger[ROOT]
13:54:54,850 |-INFO in ch.qos.logback.classic.joran.action.ConfigurationAction - End of configuration.
13:54:54,851 |-INFO in ch.qos.logback.classic.joran.JoranConfigurator@f8c1ddd - Registering current configuration as safe fallback point
13:54:54.853 [main] DEBUG com.itwanger.Test - logback
```

**4）自动重载配置**。

之前提到 Logback 很强的一个功能就是支持自动重载配置，那想要启用这个功能也非常简单，只需要在 configuration 元素上添加 `scan=true` 即可。

```
<configuration scan="true">
    ...
</configuration>
```

默认情况下，扫描的时间间隔是一分钟一次。如果想要调整时间间隔，可以通过 scanPeriod 属性进行调整，单位可以是毫秒（milliseconds）、秒（seconds）、分钟（minutes）或者小时（hours）。

下面这个示例指定的时间间隔是 30 秒：

```
<configuration scan="true" scanPeriod="30 seconds"
   ...
</configuration>
```

注意：如果指定了时间间隔，没有指定时间单位，默认的时间单位为毫秒。

当设置 `scan=true` 后，Logback 会起一个 ReconfigureOnChangeTask 的任务来监视配置文件的变化。

### 03、把 log4j.properties 转成 logback-test.xml

如果你的项目以前用的 Log4j，那么可以通过下面这个网址把 log4j.properties 转成 logback-test.xml：

>[http://logback.qos.ch/translator/](http://logback.qos.ch/translator/)

把之前 log4j.properties 的内容拷贝一份：

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

粘贴到该网址的文本域：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/logback-6c934584-3624-4f40-8108-13bfffc0c40b.png)

点击「Translate」，可以得到以下内容：

```
<?xml version="1.0" encoding="UTF-8"?>

<!-- For assistance related to logback-translator or configuration  -->
<!-- files in general, please contact the logback user mailing list -->
<!-- at http://www.qos.ch/mailman/listinfo/logback-user             -->
<!--                                                                -->
<!-- For professional support please see                            -->
<!--    http://www.qos.ch/shop/products/professionalSupport         -->
<!--                                                                -->
<configuration>
  <appender name="stdout" class="ch.qos.logback.core.ConsoleAppender">
    <Target>System.out</Target>
    <encoder>
      <pattern>[%-5p] %d{yyyy-MM-dd HH:mm:ss,SSS} method:%l%n%m%n</pattern>
    </encoder>
  </appender>
  <appender name="D" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <!--See http://logback.qos.ch/manual/appenders.html#RollingFileAppender-->
    <!--and http://logback.qos.ch/manual/appenders.html#TimeBasedRollingPolicy-->
    <!--for further documentation-->
    <Append>true</Append>
    <File>debug.log</File>
    <encoder>
      <pattern>%d{yyyy-MM-dd HH:mm:ss} [ %t:%r ] - [ %p ] %m%n</pattern>
    </encoder>
    <filter class="ch.qos.logback.classic.filter.ThresholdFilter">
      <level>DEBUG</level>
    </filter>
  </appender>
  <appender name="E" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <!--See http://logback.qos.ch/manual/appenders.html#RollingFileAppender-->
    <!--and http://logback.qos.ch/manual/appenders.html#TimeBasedRollingPolicy-->
    <!--for further documentation-->
    <File>error.log</File>
    <Append>true</Append>
    <encoder>
      <pattern>%d{yyyy-MM-dd HH:mm:ss} [ %t:%r ] - [ %p ] %m%n</pattern>
    </encoder>
    <filter class="ch.qos.logback.classic.filter.ThresholdFilter">
      <level>ERROR</level>
    </filter>
  </appender>
  <root level="debug">
    <appender-ref ref="stdout"/>
    <appender-ref ref="D"/>
    <appender-ref ref="E"/>
  </root>
</configuration>
```

可以确认一下内容，发现三个 appender 都在。 

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/logback-7a0edcdf-8706-4a83-9c09-413fc07967ad.png)

但是呢，转换后的文件并不能直接使用，需要稍微做一些调整，因为：

第一，日志的格式化有细微的不同，Logback 中没有 `%l`。

第二，RollingFileAppender 需要指定 RollingPolicy 和 TriggeringPolicy，前者负责日志的滚动功能，后者负责日志滚动的时机。如果 RollingPolicy 也实现了 TriggeringPolicy 接口，那么只需要设置 RollingPolicy 就好了。

TimeBasedRollingPolicy 和 SizeAndTimeBasedRollingPolicy 是两种最常用的滚动策略。

TimeBasedRollingPolicy 同时实现了 RollingPolicy 与 TriggeringPolicy 接口，因此使用 TimeBasedRollingPolicy 的时候就可以不指定 TriggeringPolicy。

TimeBasedRollingPolicy 可以指定以下属性：

- fileNamePattern，用来定义文件的名字（必选项）。它的值应该由文件名加上一个 `%d` 的占位符。`%d` 应该包含 `java.text.SimpleDateFormat` 中规定的日期格式，缺省是 `yyyy-MM-dd`。滚动周期是通过 fileNamePattern 推断出来的。

- maxHistory，最多保留多少数量的日志文件（可选项），将会通过异步的方式删除旧的文件。比如，你指定按月滚动，指定 `maxHistory = 6`，那么 6 个月内的日志文件将会保留，超过 6 个月的将会被删除。

- totalSizeCap，所有日志文件的大小（可选项）。超出这个大小时，旧的日志文件将会被异步删除。需要配合 maxHistory 属性一起使用，并且是第二条件。

来看下面这个 RollingFileAppender 配置：

```
<appender name="D" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <file>debug.log</file>
    <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
        <!--            按天滚动 -->
        <fileNamePattern>debug.%d{yyyy-MM-dd}.log</fileNamePattern>
        <!--            保存 30 天的历史记录，最大大小为 30GB -->
        <maxHistory>30</maxHistory>
        <totalSizeCap>3GB</totalSizeCap>
    </rollingPolicy>
    <encoder>
        <pattern>%relative [%thread] %level %logger{35} - %msg%n</pattern>
    </encoder>
</appender>
```

基于按天滚动的文件策略，最多保留 30 天，最大大小为 30G。

SizeAndTimeBasedRollingPolicy 比 TimeBasedRollingPolicy 多了一个日志文件大小设定的属性：maxFileSize，其他完全一样。

基于我们对 RollingPolicy 的了解，可以把 logback-test.xml 的内容调整为以下内容：

```
<configuration>
    <appender name="stdout" class="ch.qos.logback.core.ConsoleAppender">
        <Target>System.out</Target>
        <encoder>
            <pattern>%d{HH:mm:ss.SSS} [%thread] %level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>
<appender name="D" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <Append>true</Append>
    <File>debug.log</File>
    <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
        <!--            按天轮转 -->
        <fileNamePattern>debug.%d{yyyy-MM-dd}.log</fileNamePattern>
        <!--            保存 30 天的历史记录，最大大小为 30GB -->
        <maxHistory>30</maxHistory>
        <totalSizeCap>3GB</totalSizeCap>
    </rollingPolicy>
    <encoder>
        <pattern>%relative [%thread] %-5level %logger{35} - %msg%n</pattern>
    </encoder>
</appender>
    <appender name="E" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <File>error.log</File>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!--            按天轮转 -->
            <fileNamePattern>error.%d{yyyy-MM-dd}.log</fileNamePattern>
            <!--            保存 30 天的历史记录，最大大小为 30GB -->
            <maxHistory>30</maxHistory>
            <totalSizeCap>3GB</totalSizeCap>
        </rollingPolicy>
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss} [ %t:%r ] - [ %p ] %m%n</pattern>
        </encoder>
        <filter class="ch.qos.logback.classic.filter.ThresholdFilter">
            <level>ERROR</level>
        </filter>
    </appender>
    <root level="debug">
        <appender-ref ref="stdout"/>
        <appender-ref ref="D"/>
        <appender-ref ref="E"/>
    </root>
</configuration>
```

修改 Test 类的内容：

```java
public class Test {
    static Logger logger = LoggerFactory.getLogger(Test.class);
    public static void main(String[] args) {
        logger.debug("logback");
        logger.error("logback");
    }
}
```

运行后，可以在 target 目录下看到两个文件：debug.log 和 errror.log。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/logback-536aa50e-b195-403e-8409-85e4f6966522.png)

到此为止，项目已经从 Log4j 切换到 Logback 了，过程非常的丝滑顺畅，嘿嘿。

### 04、Logback 手册

Logback 的官网上是有一份手册的，非常详细，足足 200 多页，只不过是英文版的。小伙伴们可以看完我这篇文章入门实操的 Logback 教程后，到下面的地址看官方手册。

>[http://logback.qos.ch/manual/index.html](http://logback.qos.ch/manual/index.html)

如果英文阅读能力有限的话，可以到 GitHub 上查看雷锋翻译的中文版：

>[https://github.com/itwanger/logback-chinese-manual](https://github.com/itwanger/logback-chinese-manual)

当然了，还有一部分小伙伴喜欢看离线版的 PDF，我已经整理好了：

>链接:[https://pan.baidu.com/s/16FrbwycYUUIfKknlLhRKYA](https://pan.baidu.com/s/16FrbwycYUUIfKknlLhRKYA)  密码:bptl


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
