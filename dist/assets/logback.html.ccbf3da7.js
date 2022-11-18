import{_ as l}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as i,c as o,a as n,d as e,b as t,e as s,r as c}from"./app.99eb8281.js";const r={},d=s(`<h2 id="关于-logback" tabindex="-1"><a class="header-anchor" href="#关于-logback" aria-hidden="true">#</a> 关于 Logback</h2><p>日志系统是一个线上项目必备的素质之一，代表性的日志框架 Log4j、SLF4J、Logback 这哥仨竟然是亲兄弟，他们有一个亲爹，那就是巨佬 Ceki Gulcu。</p><p>由于 Spring Boot 的默认日志框架选用的 Logback，再加上 Log4j2 之前爆过严重的漏洞，所以我们这次就只关注 Logback。</p><p>1）Logback 非常自然地实现了 SLF4J，不需要像 Log4j 和 JUL 那样加一个适配层。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/logback-67c983bf-101d-48cc-80da-3cb031d7407b.png" alt="" loading="lazy"></p><p>2）Spring Boot 的默认日志框架使用的是 Logback，启动编程喵项目的时候就可以看到 Logback 记录的日志了。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/logback-a2cacfa1-484a-4904-bea3-248d12097387.png" alt="" loading="lazy"></p><p>怎么看出来是 logback 呢？</p><p>说实话，看不出来，哈哈哈，不过可以从 Spring Boot 官网找到证据。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/logback-9ac58c2c-e7f9-4df7-aede-ba7d5c69741c.png" alt="" loading="lazy"></p><p>还有，通过源码也可以窥见一二。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/logback-7a10bd7b-598a-4c30-9c83-b80689671f41.png" alt="" loading="lazy"></p><p>3）logback 分为三个模块：</p><ul><li>logback-core，核心模块，提供了关键的通用机制；</li><li>logback-classic，可以看作是 log4j 的改进版，实现了简单的日志门面 SLF4J；</li><li>logback-access，主要用来和 Servlet 容器交互，比如说 Tomcat，提供了一些 HTTP 访问的功能。</li></ul><p>如果想研究 logback 源码的话，可以按照这三个模块去研究。</p><h2 id="直接上手" tabindex="-1"><a class="header-anchor" href="#直接上手" aria-hidden="true">#</a> 直接上手</h2><p>不废话，直接新建一个空的 Spring Boot 项目，在测试类中加上两行代码。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span>
<span class="token keyword">class</span> <span class="token class-name">CodingmoreLogbackApplicationTests</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> <span class="token class-name">Logger</span> logger <span class="token operator">=</span> <span class="token class-name">LoggerFactory</span><span class="token punctuation">.</span><span class="token function">getLogger</span><span class="token punctuation">(</span><span class="token class-name">CodingmoreLogbackApplicationTests</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token annotation punctuation">@Test</span>
  <span class="token keyword">void</span> <span class="token function">contextLoads</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    logger<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;logback testing&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Logger 和 LoggerFactory 都来自 SLF4J，所以如果项目是从 Log4j + SLF4J 切换到 Logback 的话，此时的代码是零改动的。</p><p>其他什么也不用做，运行后就可以看到 logback 已经正常工作了。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/logback-07c6b600-3667-4113-bbd5-5ec25990e9dc.png" alt="" loading="lazy"></p><p>在没有配置文件的情况下，一切都是默认的，Logback 的日志信息会输出到控制台。可以通过 StatusPrinter 来打印 Logback 的内部信息：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">LoggerContext</span> lc <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">LoggerContext</span><span class="token punctuation">)</span><span class="token class-name">LoggerFactory</span><span class="token punctuation">.</span><span class="token function">getILoggerFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">StatusPrinter</span><span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>lc<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>再次运行测试类，可以在控制台看到以下信息：</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/logback-05b134ab-b6e6-4a10-a00c-41b829938618.png" alt="" loading="lazy"></p><p>也就是说，Logback 会在 classpath 路径下先寻找 logback-test.xml 文件，没有找到的话，寻找 logback.xml 文件，都找不到的话，就输出到控制台。</p><p>并且，Logger 的默认日志级别是 INFO 级别的，这就意味着如果尝试下面的代码：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>logger<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">&quot;沉默王二是傻 X&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>控制台是看不到这行日志输出的。Logback 的日志级别是这样的：</p><blockquote><p>TRACE &lt; DEBUG &lt; INFO &lt; WARN &lt; ERROR</p></blockquote><p>也就是说小于 INFO 级别的日志都不会记录，只有大于等于 INFO 级别的日志才会被记录。</p><h2 id="编程喵实战项目的日志案例分析" tabindex="-1"><a class="header-anchor" href="#编程喵实战项目的日志案例分析" aria-hidden="true">#</a> 编程喵实战项目的日志案例分析</h2><p>尽管默认配置很有用，但它很可能不能满足我们的实际开发需求，于是我们需要找到一种更优雅的解决方案。</p><p>当 <code>src/main/resources</code> 目录下有以下名称之一的配置文件时，Spring Boot 将自动加载它来作为 Logback 的配置项：</p><ul><li>logback-spring.xml</li><li>logback.xml</li><li>logback-spring.groovy</li><li>logback.groovy</li></ul><p>Spring Boot 建议我们使用 <code>-spring</code> 结尾的配置文件，这样可以使用 Spring Boot 的 Proﬁle 功能（针对不同的环境（开发环境、测试环境、正式环境）提供不同的配置项）。</p><p>编程喵用的是 logback-spring.xml（在 codingmore-admin 项目下可以找得到）：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;!--
configuration 有三个属性：
scan：当此属性设置为true时，配置文件如果发生改变，将会被重新加载，默认值为true。
scanPeriod：设置监测配置文件是否有修改的时间间隔，如果没有给出时间单位，默认单位是毫秒当scan为true时，此属性生效。默认的时间间隔为1分钟。
debug：当此属性设置为true时，将打印出logback内部日志信息，实时查看logback运行状态。默认值为false。
--&gt;
&lt;configuration&gt;
    &lt;include resource=&quot;org/springframework/boot/logging/logback/defaults.xml&quot; /&gt;
    &lt;!-- 定义日志文件名称 --&gt;
    &lt;property name=&quot;APP_NAME&quot; value=&quot;codingmore-admin&quot; /&gt;
    &lt;!-- 定义日志文件的路径 --&gt;
    &lt;property name=&quot;LOG_PATH&quot; value=&quot;\${user.home}/\${APP_NAME}/logs&quot; /&gt;
    &lt;!-- 定义日志的文件名 --&gt;
    &lt;property name=&quot;LOG_FILE&quot; value=&quot;\${LOG_PATH}/codingmore-admin.log&quot; /&gt;

    &lt;!-- 滚动记录日志，先将日志记录到指定文件，当符合某个条件时，将日志记录到其他文件 --&gt;
    &lt;appender name=&quot;APPLICATION&quot;
        class=&quot;ch.qos.logback.core.rolling.RollingFileAppender&quot;&gt;
        &lt;!-- 指定日志文件的名称 --&gt;
        &lt;file&gt;\${LOG_FILE}&lt;/file&gt;
        &lt;!--
          当发生滚动时，决定 RollingFileAppender 的行为，涉及文件移动和重命名
          TimeBasedRollingPolicy： 最常用的滚动策略，它根据时间来制定滚动策略，既负责滚动也负责触发滚动。
          --&gt;
        &lt;rollingPolicy class=&quot;ch.qos.logback.core.rolling.TimeBasedRollingPolicy&quot;&gt;
            &lt;!--
           滚动时产生的文件的存放位置及文件名称
           %d{yyyy-MM-dd}：按天进行日志滚动
           %i：当文件大小超过maxFileSize时，按照i进行文件滚动
           --&gt;
            &lt;fileNamePattern&gt;\${LOG_FILE}.%d{yyyy-MM-dd}.%i.log&lt;/fileNamePattern&gt;
            &lt;!--
           可选节点，控制保留的归档文件的最大数量，超出数量就删除旧文件。假设设置每天滚动，
           且maxHistory是7，则只保存最近7天的文件，删除之前的旧文件。
           注意，删除旧文件时，那些为了归档而创建的目录也会被删除。
           --&gt;
            &lt;maxHistory&gt;7&lt;/maxHistory&gt;
            &lt;!--
           当日志文件超过maxFileSize指定的大小时，根据上面提到的%i进行日志文件滚动
           注意此处配置SizeBasedTriggeringPolicy是无法实现按文件大小进行滚动的，
           必须配置timeBasedFileNamingAndTriggeringPolicy
           --&gt;
            &lt;timeBasedFileNamingAndTriggeringPolicy class=&quot;ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP&quot;&gt;
                &lt;maxFileSize&gt;50MB&lt;/maxFileSize&gt;
            &lt;/timeBasedFileNamingAndTriggeringPolicy&gt;
        &lt;/rollingPolicy&gt;
        &lt;!-- 日志输出格式： --&gt;
        &lt;layout class=&quot;ch.qos.logback.classic.PatternLayout&quot;&gt;
            &lt;pattern&gt;%d{yyyy-MM-dd HH:mm:ss.SSS} [ %thread ] - [ %-5level ] [ %logger{50} : %line ] - %msg%n&lt;/pattern&gt;
        &lt;/layout&gt;
    &lt;/appender&gt;
    &lt;!-- ch.qos.logback.core.ConsoleAppender 表示控制台输出 --&gt;
    &lt;appender name=&quot;CONSOLE&quot; class=&quot;ch.qos.logback.core.ConsoleAppender&quot;&gt;
        &lt;!--
       日志输出格式：
           %d表示日期时间，%green 绿色
           %thread表示线程名，%magenta 洋红色
           %-5level：级别从左显示5个字符宽度 %highlight 高亮色
           %logger{36} 表示logger名字最长36个字符，否则按照句点分割 %yellow 黄色
           %msg：日志消息
           %n是换行符
       --&gt;
        &lt;layout class=&quot;ch.qos.logback.classic.PatternLayout&quot;&gt;
            &lt;pattern&gt;%green(%d{yyyy-MM-dd HH:mm:ss.SSS}) [%magenta(%thread)] %highlight(%-5level) %yellow(%logger{36}): %msg%n&lt;/pattern&gt;
        &lt;/layout&gt;
    &lt;/appender&gt;

    &lt;!--
   root与logger是父子关系，没有特别定义则默认为root，任何一个类只会和一个logger对应，
   要么是定义的logger，要么是root，判断的关键在于找到这个logger，然后判断这个logger的appender和level。
   --&gt;
    &lt;root level=&quot;info&quot;&gt;
        &lt;appender-ref ref=&quot;CONSOLE&quot; /&gt;
        &lt;appender-ref ref=&quot;APPLICATION&quot; /&gt;
    &lt;/root&gt;
&lt;/configuration&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>具体含义都写在了注释里，大家可以细致看一下，了解即可。基本上生产环境下的 Logback 配置就是这样的，可微调。</p><p>也可以使用下面这份 logback-spring.xml。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;configuration &gt;
    &lt;include resource=&quot;org/springframework/boot/logging/logback/defaults.xml&quot; /&gt;

    &lt;property name=&quot;APP_NAME&quot; value=&quot;codingmore-admin&quot; /&gt;
    &lt;property name=&quot;LOG_PATH&quot; value=&quot;\${user.home}/\${APP_NAME}/logs&quot; /&gt;
    &lt;property name=&quot;LOG_FILE&quot; value=&quot;\${LOG_PATH}/codingmore-admin.log&quot; /&gt;

    &lt;appender name=&quot;APPLICATION&quot;
        class=&quot;ch.qos.logback.core.rolling.RollingFileAppender&quot;&gt;
        &lt;file&gt;\${LOG_FILE}&lt;/file&gt;
        &lt;encoder&gt;
            &lt;pattern&gt;\${FILE_LOG_PATTERN}&lt;/pattern&gt;
        &lt;/encoder&gt;
        &lt;rollingPolicy class=&quot;ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy&quot;&gt;
            &lt;fileNamePattern&gt;\${LOG_FILE}.%d{yyyy-MM-dd}.%i.log&lt;/fileNamePattern&gt;
            &lt;maxHistory&gt;7&lt;/maxHistory&gt;
            &lt;maxFileSize&gt;50MB&lt;/maxFileSize&gt;
            &lt;totalSizeCap&gt;2GB&lt;/totalSizeCap&gt;
        &lt;/rollingPolicy&gt;
    &lt;/appender&gt;

    &lt;appender name=&quot;CONSOLE&quot; class=&quot;ch.qos.logback.core.ConsoleAppender&quot;&gt;
        &lt;encoder&gt;
            &lt;pattern&gt;\${CONSOLE_LOG_PATTERN}&lt;/pattern&gt;
            &lt;charset&gt;utf8&lt;/charset&gt;
        &lt;/encoder&gt;
    &lt;/appender&gt;

    &lt;root level=&quot;info&quot;&gt;
        &lt;appender-ref ref=&quot;CONSOLE&quot; /&gt;
        &lt;appender-ref ref=&quot;APPLICATION&quot; /&gt;
    &lt;/root&gt;
&lt;/configuration&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>只说几个不同的点。</p><p><code>FILE_LOG_PATTERN</code> 和 <code>CONSOLE_LOG_PATTERN</code> 是在 Spring Boot 中默认定义的。</p>`,43),g={href:"https://github.com/spring-projects/spring-boot/blob/main/spring-boot-project/spring-boot/src/main/java/org/springframework/boot/logging/logback/DefaultLogbackConfiguration.java",target:"_blank",rel:"noopener noreferrer"},p=s(`<p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/logback-87217069-b756-4c0c-945e-06ecc5785b81.png" alt="" loading="lazy"></p><p>SizeAndTimeBasedRollingPolicy 比 TimeBasedRollingPolicy 多了一个日志文件大小设定的属性：maxFileSize，其他完全一样。</p><p>totalSizeCap，所有日志文件的大小（可选项）。超出这个大小时，旧的日志文件将会被异步删除。需要配合 maxHistory 属性一起使用，并且是第二条件。</p><p>在Intellij IDEA 中启动项目，我们来查看一下配置后的日志效果（控制台中）。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/logback-1a849206-617e-45d5-b199-50787c12e9bc.png" alt="" loading="lazy"></p><p>由于我们加了颜色配置，所以控制台日志看起来对眼睛更友好了一些。</p><p>那配置的日志文件在哪里呢？在 <code>user.home</code> 下，如果不确定具体值是什么的话，可以通过 <code>System.getProperty(&quot;user.home&quot;)</code> 获取到。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/logback-bdb8558e-2fd0-488e-9a0a-7c78234eae7a.png" alt="" loading="lazy"></p><p>顺着这个路径就可以找到生成的日志文件了，并且日志的生成策略也是符合我们的预期的。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/logback-3e5c5534-470b-4ec4-b5fa-cb2a6fbbaee4.png" alt="" loading="lazy"></p><h2 id="使用-lombok-进行日志记录" tabindex="-1"><a class="header-anchor" href="#使用-lombok-进行日志记录" aria-hidden="true">#</a> 使用 lombok 进行日志记录</h2><p>在上面的例子中，我们必须在类中声明一个静态的 Logger 对象才能在需要记录日志的地方使用它。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token class-name">Logger</span> logger <span class="token operator">=</span> <span class="token class-name">LoggerFactory</span><span class="token punctuation">.</span><span class="token function">getLogger</span><span class="token punctuation">(</span><span class="token class-name">CodingmoreLogbackApplicationTests</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这样的样板代码令人生厌！</p><p>我们可以通过 lombok 的方式来解决这个问题，在 pom.xml 文件中加入依赖。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;dependency&gt;
  &lt;groupId&gt;org.projectlombok&lt;/groupId&gt;
  &lt;artifactId&gt;lombok&lt;/artifactId&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后在类上加上 <code>@Slf4j</code> 注解，之后就可以直接使用 log（添加<code>@Slf4j</code> 注解后会自动添加一个 log 字段）来记录日志了。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@SpringBootTest
@Slf4j
class CodingmoreLogbackApplicationTests {

  @Test
  void testSlf4j() {
    log.info(&quot;沉默王二是个大煞笔&quot;);
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>`,19),u={href:"https://tobebetterjavaer.com/zhishixingqiu/",target:"_blank",rel:"noopener noreferrer"},v=n("strong",null,"编程喵",-1),b=n("hr",null,null,-1),m=n("p",null,[n("img",{src:"http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/logback-cd491159-e48e-4c74-a67f-7962a45e847f.png",alt:"",loading:"lazy"})],-1),k=n("h2",{id:"源码路径",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#源码路径","aria-hidden":"true"},"#"),e(" 源码路径")],-1),h={href:"https://github.com/itwanger/coding-more",target:"_blank",rel:"noopener noreferrer"},q={href:"https://github.com/itwanger/codingmore-learning/tree/main/codingmore-logback",target:"_blank",rel:"noopener noreferrer"},y=n("p",null,[n("img",{src:"http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png",alt:"",loading:"lazy"})],-1);function L(f,_){const a=c("ExternalLinkIcon");return i(),o("div",null,[d,n("blockquote",null,[n("p",null,[n("a",g,[e("https://github.com/spring-projects/spring-boot/blob/main/spring-boot-project/spring-boot/src/main/java/org/springframework/boot/logging/logback/DefaultLogbackConfiguration.java"),t(a)])])]),p,n("p",null,[e("更多内容，只针对《Java 程序员进阶之路》星球用户开放，需要的小伙伴可以"),n("a",u,[e("戳链接🔗"),t(a)]),e("加入我们的星球，一起学习，一起卷。。"),v,e("🐱是一个 Spring Boot+Vue 的前后端分离项目，融合了市面上绝大多数流行的技术要点。通过学习实战项目，你可以将所学的知识通过实践进行检验、你可以拓宽自己的技术边界，你可以掌握一个真正的实战项目是如何从 0 到 1 的。")]),b,m,k,n("blockquote",null,[n("ul",null,[n("li",null,[e("编程喵："),n("a",h,[e("https://github.com/itwanger/coding-more"),t(a)])]),n("li",null,[e("Logback 详细配置专用："),n("a",q,[e("https://github.com/itwanger/coding-more"),t(a)])])])]),y])}const S=l(r,[["render",L],["__file","logback.html.vue"]]);export{S as default};
