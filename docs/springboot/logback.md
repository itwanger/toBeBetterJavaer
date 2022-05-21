---
category:
  - Java企业级开发
tag:
  - Spring Boot
  - Redis
title: Spring Boot 整合 Logback 定制日志框架
---

### 关于 Logback

日志系统是一个线上项目必备的素质之一，代表性的日志框架 Log4j、SLF4J、Logback 这哥仨竟然是亲兄弟，他们有一个亲爹，那就是巨佬 Ceki Gulcu。

由于 Spring Boot 的默认日志框架选用的 Logback，再加上 Log4j2 之前爆过严重的漏洞，所以我们这次就只关注 Logback。

1）Logback 非常自然地实现了 SLF4J，不需要像 Log4j 和 JUL 那样加一个适配层。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/logback-67c983bf-101d-48cc-80da-3cb031d7407b.png)

2）Spring Boot 的默认日志框架使用的是 Logback，启动编程喵项目的时候就可以看到 Logback 记录的日志了。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/logback-a2cacfa1-484a-4904-bea3-248d12097387.png)

怎么看出来是 logback 呢？

说实话，看不出来，哈哈哈，不过可以从 Spring Boot 官网找到证据。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/logback-9ac58c2c-e7f9-4df7-aede-ba7d5c69741c.png)

还有，通过源码也可以窥见一二。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/logback-7a10bd7b-598a-4c30-9c83-b80689671f41.png)

3）logback 分为三个模块：

- logback-core，核心模块，提供了关键的通用机制；
- logback-classic，可以看作是 log4j 的改进版，实现了简单的日志门面 SLF4J；
- logback-access，主要用来和 Servlet 容器交互，比如说 Tomcat，提供了一些 HTTP 访问的功能。

如果想研究 logback 源码的话，可以按照这三个模块去研究。

### 直接上手

不废话，直接新建一个空的 Spring Boot 项目，在测试类中加上两行代码。

```java
@SpringBootTest
class CodingmoreLogbackApplicationTests {
  static Logger logger = LoggerFactory.getLogger(CodingmoreLogbackApplicationTests.class);
  @Test
  void contextLoads() {
    logger.info("logback testing");
  }
}
```

Logger 和 LoggerFactory 都来自 SLF4J，所以如果项目是从 Log4j + SLF4J 切换到 Logback 的话，此时的代码是零改动的。

其他什么也不用做，运行后就可以看到 logback 已经正常工作了。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/logback-07c6b600-3667-4113-bbd5-5ec25990e9dc.png)

在没有配置文件的情况下，一切都是默认的，Logback 的日志信息会输出到控制台。可以通过 StatusPrinter 来打印 Logback 的内部信息：

```java
LoggerContext lc = (LoggerContext)LoggerFactory.getILoggerFactory();
StatusPrinter.print(lc);
```

再次运行测试类，可以在控制台看到以下信息：

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/logback-05b134ab-b6e6-4a10-a00c-41b829938618.png)

也就是说，Logback 会在 classpath 路径下先寻找 logback-test.xml 文件，没有找到的话，寻找 logback.xml 文件，都找不到的话，就输出到控制台。

并且，Logger 的默认日志级别是 INFO 级别的，这就意味着如果尝试下面的代码：

```java
logger.debug("沉默王二是傻 X");
```

控制台是看不到这行日志输出的。Logback 的日志级别是这样的：

>TRACE < DEBUG < INFO <  WARN < ERROR

也就是说小于 INFO 级别的日志都不会记录，只有大于等于 INFO 级别的日志才会被记录。

### 编程喵实战项目的日志案例分析

尽管默认配置很有用，但它很可能不能满足我们的实际开发需求，于是我们需要找到一种更优雅的解决方案。

当 `src/main/resources` 目录下有以下名称之一的配置文件时，Spring Boot 将自动加载它来作为 Logback 的配置项：

- logback-spring.xml
- logback.xml
- logback-spring.groovy
- logback.groovy

Spring Boot 建议我们使用 `-spring` 结尾的配置文件，这样可以使用 Spring Boot 的 Proﬁle 功能（针对不同的环境（开发环境、测试环境、正式环境）提供不同的配置项）。

编程喵用的是 logback-spring.xml（在 codingmore-admin 项目下可以找得到）：

```
<!--
configuration 有三个属性：
scan：当此属性设置为true时，配置文件如果发生改变，将会被重新加载，默认值为true。
scanPeriod：设置监测配置文件是否有修改的时间间隔，如果没有给出时间单位，默认单位是毫秒当scan为true时，此属性生效。默认的时间间隔为1分钟。
debug：当此属性设置为true时，将打印出logback内部日志信息，实时查看logback运行状态。默认值为false。
-->
<configuration>
    <include resource="org/springframework/boot/logging/logback/defaults.xml" />
    <!-- 定义日志文件名称 -->
    <property name="APP_NAME" value="codingmore-admin" />
    <!-- 定义日志文件的路径 -->
    <property name="LOG_PATH" value="${user.home}/${APP_NAME}/logs" />
    <!-- 定义日志的文件名 -->
    <property name="LOG_FILE" value="${LOG_PATH}/codingmore-admin.log" />

    <!-- 滚动记录日志，先将日志记录到指定文件，当符合某个条件时，将日志记录到其他文件 -->
    <appender name="APPLICATION"
        class="ch.qos.logback.core.rolling.RollingFileAppender">
        <!-- 指定日志文件的名称 -->
        <file>${LOG_FILE}</file>
        <!--
          当发生滚动时，决定 RollingFileAppender 的行为，涉及文件移动和重命名
          TimeBasedRollingPolicy： 最常用的滚动策略，它根据时间来制定滚动策略，既负责滚动也负责触发滚动。
          -->
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!--
           滚动时产生的文件的存放位置及文件名称
           %d{yyyy-MM-dd}：按天进行日志滚动
           %i：当文件大小超过maxFileSize时，按照i进行文件滚动
           -->
            <fileNamePattern>${LOG_FILE}.%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <!--
           可选节点，控制保留的归档文件的最大数量，超出数量就删除旧文件。假设设置每天滚动，
           且maxHistory是7，则只保存最近7天的文件，删除之前的旧文件。
           注意，删除旧文件时，那些为了归档而创建的目录也会被删除。
           -->
            <maxHistory>7</maxHistory>
            <!--
           当日志文件超过maxFileSize指定的大小时，根据上面提到的%i进行日志文件滚动
           注意此处配置SizeBasedTriggeringPolicy是无法实现按文件大小进行滚动的，
           必须配置timeBasedFileNamingAndTriggeringPolicy
           -->
            <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>50MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
        </rollingPolicy>
        <!-- 日志输出格式： -->
        <layout class="ch.qos.logback.classic.PatternLayout">
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [ %thread ] - [ %-5level ] [ %logger{50} : %line ] - %msg%n</pattern>
        </layout>
    </appender>
    <!-- ch.qos.logback.core.ConsoleAppender 表示控制台输出 -->
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <!--
       日志输出格式：
           %d表示日期时间，%green 绿色
           %thread表示线程名，%magenta 洋红色
           %-5level：级别从左显示5个字符宽度 %highlight 高亮色
           %logger{36} 表示logger名字最长36个字符，否则按照句点分割 %yellow 黄色
           %msg：日志消息
           %n是换行符
       -->
        <layout class="ch.qos.logback.classic.PatternLayout">
            <pattern>%green(%d{yyyy-MM-dd HH:mm:ss.SSS}) [%magenta(%thread)] %highlight(%-5level) %yellow(%logger{36}): %msg%n</pattern>
        </layout>
    </appender>

    <!--
   root与logger是父子关系，没有特别定义则默认为root，任何一个类只会和一个logger对应，
   要么是定义的logger，要么是root，判断的关键在于找到这个logger，然后判断这个logger的appender和level。
   -->
    <root level="info">
        <appender-ref ref="CONSOLE" />
        <appender-ref ref="APPLICATION" />
    </root>
</configuration>
```

具体含义都写在了注释里，大家可以细致看一下，了解即可。基本上生产环境下的 Logback 配置就是这样的，可微调。

也可以使用下面这份 logback-spring.xml。

```
<?xml version="1.0" encoding="UTF-8"?>
<configuration >
    <include resource="org/springframework/boot/logging/logback/defaults.xml" />

    <property name="APP_NAME" value="codingmore-admin" />
    <property name="LOG_PATH" value="${user.home}/${APP_NAME}/logs" />
    <property name="LOG_FILE" value="${LOG_PATH}/codingmore-admin.log" />

    <appender name="APPLICATION"
        class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${LOG_FILE}</file>
        <encoder>
            <pattern>${FILE_LOG_PATTERN}</pattern>
        </encoder>
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <fileNamePattern>${LOG_FILE}.%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <maxHistory>7</maxHistory>
            <maxFileSize>50MB</maxFileSize>
            <totalSizeCap>2GB</totalSizeCap>
        </rollingPolicy>
    </appender>

    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>${CONSOLE_LOG_PATTERN}</pattern>
            <charset>utf8</charset>
        </encoder>
    </appender>

    <root level="info">
        <appender-ref ref="CONSOLE" />
        <appender-ref ref="APPLICATION" />
    </root>
</configuration>
```

只说几个不同的点。

`FILE_LOG_PATTERN` 和 `CONSOLE_LOG_PATTERN` 是在 Spring Boot 中默认定义的。


>[https://github.com/spring-projects/spring-boot/blob/main/spring-boot-project/spring-boot/src/main/java/org/springframework/boot/logging/logback/DefaultLogbackConfiguration.java](https://github.com/spring-projects/spring-boot/blob/main/spring-boot-project/spring-boot/src/main/java/org/springframework/boot/logging/logback/DefaultLogbackConfiguration.java)


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/logback-87217069-b756-4c0c-945e-06ecc5785b81.png)


SizeAndTimeBasedRollingPolicy 比 TimeBasedRollingPolicy 多了一个日志文件大小设定的属性：maxFileSize，其他完全一样。

totalSizeCap，所有日志文件的大小（可选项）。超出这个大小时，旧的日志文件将会被异步删除。需要配合 maxHistory 属性一起使用，并且是第二条件。

在Intellij IDEA 中启动项目，我们来查看一下配置后的日志效果（控制台中）。


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/logback-1a849206-617e-45d5-b199-50787c12e9bc.png)

由于我们加了颜色配置，所以控制台日志看起来对眼睛更友好了一些。

那配置的日志文件在哪里呢？在 `user.home` 下，如果不确定具体值是什么的话，可以通过 `System.getProperty("user.home")` 获取到。


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/logback-bdb8558e-2fd0-488e-9a0a-7c78234eae7a.png)


顺着这个路径就可以找到生成的日志文件了，并且日志的生成策略也是符合我们的预期的。


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/logback-3e5c5534-470b-4ec4-b5fa-cb2a6fbbaee4.png)

### 使用 lombok 进行日志记录

在上面的例子中，我们必须在类中声明一个静态的 Logger 对象才能在需要记录日志的地方使用它。

```java
static Logger logger = LoggerFactory.getLogger(CodingmoreLogbackApplicationTests.class);
```

这样的样板代码令人生厌！

我们可以通过 lombok 的方式来解决这个问题，在 pom.xml 文件中加入依赖。

```
<dependency>
  <groupId>org.projectlombok</groupId>
  <artifactId>lombok</artifactId>
</dependency>
```

然后在类上加上 `@Slf4j` 注解，之后就可以直接使用 log（添加`@Slf4j` 注解后会自动添加一个 log 字段）来记录日志了。

```
@SpringBootTest
@Slf4j
class CodingmoreLogbackApplicationTests {

  @Test
  void testSlf4j() {
    log.info("沉默王二是个大煞笔");
  }
}
```

运行该测试方法，可以在控制台看到如下日志：


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/logback-2456652a-63f5-4499-8133-ed9c8a68e0e7.png)

日志文件也有：

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/logback-f1baaaa3-e6c4-4abb-8cc7-9862e90f960a.png)

查看字节码反编译后的文件就明白了。lombok 在编译的时候会自动添加一行代码：

```java
private static final Logger log = LoggerFactory.getLogger(CodingmoreLogbackApplicationTests.class);
```

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/logback-e5eb93b2-906c-4fbf-8fe4-6e6a3c727625.png)

### logback 中文手册

GitHub 上有一份 Logback 的中文手册，总共有 150 多页，主要包含以下基本的和高级的特性：

- logback 的整体架构
- 讨论 logback 最好的实践以及反模式
- logback 的 xml 配置方式
- appender
- encoder
- layout
- filter
- 上下文诊断
- Joran - logback 的配置系统

>[https://github.com/YLongo/logback-chinese-manual](https://github.com/YLongo/logback-chinese-manual)


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/logback-cd491159-e48e-4c74-a67f-7962a45e847f.png)

### 源码路径

> - 编程喵：[https://github.com/itwanger/coding-more](https://github.com/itwanger/coding-more)
> - Logback 详细配置专用：[https://github.com/itwanger/coding-more](https://github.com/itwanger/codingmore-learning/tree/main/codingmore-logback)


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png)
