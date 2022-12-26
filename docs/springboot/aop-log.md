---
category:
  - Java企业级开发
tag:
  - Spring
---

# Spring AOP 扫盲

AOP 是 Spring 体系中非常重要的两个概念之一（另外一个是 IoC），今天这篇文章就来带大家通过实战的方式，在编程猫 SpringBoot 项目中使用 AOP 技术为 controller 层添加一个切面来实现接口访问的统一日志记录。

### 一、关于 AOP

AOP，也就是 Aspect-oriented Programming，译为面向切面编程，是计算机科学中的一个设计思想，旨在通过切面技术为业务主体增加额外的通知（Advice），从而对声明为“切点”（Pointcut）的代码块进行统一管理和装饰。

这种思想非常适用于，将那些与核心业务不那么密切关联的功能添加到程序中，就好比我们今天的主题——日志功能，就是一个典型的案例。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/aop-log-1.png)

AOP 是对面向对象编程（Object-oriented Programming，俗称 OOP）的一种补充，OOP 的核心单元是类（class），而 AOP 的核心单元是切面（Aspect）。利用 AOP 可以对业务逻辑的各个部分进行隔离，从而降低耦合度，提高程序的可重用性，同时也提高了开发效率。

我们可以简单的把 AOP 理解为贯穿于方法之中，在方法执行前、执行时、执行后、返回值后、异常后要执行的操作。

### 二、AOP 的相关术语

来看下面这幅图，这是一个 AOP 的模型图，就是在某些方法执行前后执行一些通用的操作，并且这些操作不会影响程序本身的运行。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/aop-log-2.png)
我们了解下 AOP 涉及到的 5 个关键术语：

**1）横切关注点**，从每个方法中抽取出来的同一类非核心业务

**2）切面（Aspect）**，对横切关注点进行封装的类，每个关注点体现为一个通知方法；通常使用 @Aspect 注解来定义切面。

**3）通知（Advice）**，切面必须要完成的各个具体工作，比如我们的日志切面需要记录接口调用前后的时长，就需要在调用接口前后记录时间，再取差值。通知的方式有五种：

- @Before：通知方法会在目标方法调用之前执行
- @After：通知方法会在目标方法调用后执行
- @AfterReturning：通知方法会在目标方法返回后执行
- @AfterThrowing：通知方法会在目标方法抛出异常后执行
- @Around：把整个目标方法包裹起来，在被调用前和调用之后分别执行通知方法

**4）连接点（JoinPoint）**，通知应用的时机，比如接口方法被调用时就是日志切面的连接点。

**5）切点（Pointcut）**，通知功能被应用的范围，比如本篇日志切面的应用范围是所有 controller 的接口。通常使用 @Pointcut 注解来定义切点表达式。

切入点表达式的语法格式规范如下所示：

```
execution(modifiers-pattern? ret-type-pattern declaring-type-pattern?
				name-pattern(param-pattern)
                throws-pattern?)
```

- `modifiers-pattern?` 为访问权限修饰符
- `ret-type-pattern` 为返回类型，通常用 `*` 来表示任意返回类型
- `declaring-type-pattern?` 为包名
- `name-pattern` 为方法名，可以使用 `*` 来表示所有，或者 `set*` 来表示所有以 set 开头的类名
- `param-pattern)` 为参数类型，多个参数可以用 `,` 隔开，各个参与也可以使用 `*` 来表示所有类型的参数，还可以使用 `(..)` 表示零个或者任意参数
- `throws-pattern?` 为异常类型
- `?` 表示前面的为可选项

举个例子：

```java
@Pointcut("execution(public * com.codingmore.controller.*.*(..))")
```

 表示 `com.codingmore.controller` 包下的所有 public 方法都要应用切面的通知。



### 三、实操 AOP 记录接口访问日志

第一步，在 Spring Boot 项目的 pom.xml 文件中添加 spring-boot-starter-aop 依赖。

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```


第二步，添加日志信息封装类 WebLog，用于记录什么样的操作、操作的人是谁、开始时间、花费的时间、操作的路径、操作的方法名、操作主机的 IP、请求参数、返回结果等。

```java
/**
 * Controller层的日志封装类
 * Created by macro on 2018/4/26.
 */
public class WebLog {
    private String description;
    private String username;
    private Long startTime;
    private Integer spendTime;
    private String basePath;
    private String uri;
    private String url;
    private String method;
    private String ip;
    private Object parameter;
    private Object result;
    //省略了getter,setter方法
}
```

第三步，添加统一日志处理切面 WebLogAspect。

```java
/**
 * 统一日志处理切面
 * Created by 石磊
 */
@Aspect
@Component
@Order(1)
public class WebLogAspect {
    private static final Logger LOGGER = LoggerFactory.getLogger(WebLogAspect.class);

    @Pointcut("execution(public * com.codingmore.controller.*.*(..))")
    public void webLog() {
    }

    @Before("webLog()")
    public void doBefore(JoinPoint joinPoint) throws Throwable {
    }

    @AfterReturning(value = "webLog()", returning = "ret")
    public void doAfterReturning(Object ret) throws Throwable {
    }

    @Around("webLog()")
    public Object doAround(ProceedingJoinPoint joinPoint) throws Throwable {
        long startTime = System.currentTimeMillis();
        //获取当前请求对象
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        //记录请求信息(通过Logstash传入Elasticsearch)
        WebLog webLog = new WebLog();
        Object result = joinPoint.proceed();
        Signature signature = joinPoint.getSignature();
        MethodSignature methodSignature = (MethodSignature) signature;
        Method method = methodSignature.getMethod();
        if (method.isAnnotationPresent(ApiOperation.class)) {
            ApiOperation log = method.getAnnotation(ApiOperation.class);
            webLog.setDescription(log.value());
        }
        long endTime = System.currentTimeMillis();
        String urlStr = request.getRequestURL().toString();
        webLog.setBasePath(StrUtil.removeSuffix(urlStr, URLUtil.url(urlStr).getPath()));
        webLog.setIp(request.getRemoteUser());
        Map<String,Object> logMap = new HashMap<>();
        logMap.put("spendTime",webLog.getSpendTime());
        logMap.put("description",webLog.getDescription());
        LOGGER.info("{}", JSONUtil.parse(webLog));
        return result;
    }
}
```

第四步，运行项目，并对 controller 下的某个控制器进行测试。

>Swagger knife4j 访问地址：http://localhost:9022/doc.html

执行登录用户查询操作：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/aop-log-3.png)

可以在控制台可以看到以下日志信息：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/aop-log-4.png)
源码地址：

>[https://github.com/itwanger/coding-more](https://github.com/itwanger/coding-more)

参考链接：

>作者 cxuan：https://www.cnblogs.com/cxuanBlog/p/13060510.html<br>
>灰小猿：https://bbs.huaweicloud.com/blogs/289045<br>
>山高我为峰：https://www.cnblogs.com/liaojie970/p/7883687.html<br>
>macrozheng：https://github.com/macrozheng/mall


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)