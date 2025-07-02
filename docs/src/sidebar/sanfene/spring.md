---
title: Spring面试题，41道Spring八股文（1.3万字63张手绘图），面渣逆袭必看👍
shortTitle: 面渣逆袭-Spring
description: 下载次数超 1 万次，1.3 万字 63 张手绘图，详解 41 道 Spring 面试高频题（让天下没有难背的八股），面渣背会这些 Spring 八股文，这次吊打面试官，我觉得稳了（手动 dog）。
author: 三分恶
date: 2024-11-05
category:
  - 面渣逆袭
tag:
  - 面渣逆袭
head:
  - - meta
    - name: keywords
      content: Spring面试题,Spring,面试题,八股文,java,spring全家桶
---

![面渣逆袭 Spring 篇封面图](https://cdn.tobebetterjavaer.com/stutymore/spring-mianzhanixi-spring1.jpg)

## 前言

1.3 万字 63 张手绘图，详解 41 道 Spring 面试高频题（让天下没有难背的八股），面渣背会这些 Spring 八股文，这次吊打面试官，我觉得稳了（手动 dog）。整理：沉默王二，戳[转载链接](https://mp.weixin.qq.com/s/EQge6DmgIqYITM3mAxkatg)，作者：三分恶，戳[原文链接](https://mp.weixin.qq.com/s/Y17S85ntHm_MLTZMJdtjQQ)。

亮白版本更适合拿出来打印，这也是很多学生党喜欢的方式，打印出来背诵的效率会更高。

![面渣逆袭Redis篇.pdf第二版](https://cdn.tobebetterjavaer.com/stutymore/redis-20250614154255.png)

2025 年 06 月 15 日开始着手第二版更新。

- 对于高频题，会标注在《[Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)》中出现的位置，哪家公司，原题是什么，并且会加🌟，目录一目了然；如果你想节省时间的话，可以优先背诵这些题目，尽快做到知彼知己，百战不殆。
- 区分八股精华回答版本和原理底层解释，让大家知其然知其所以然，同时又能做到面试时的高效回答。
- 结合项目（[技术派](https://javabetter.cn/zhishixingqiu/paicoding.html)、[pmhub](https://javabetter.cn/zhishixingqiu/pmhub.html)）来组织语言，让面试官最大程度感受到你的诚意，而不是机械化的背诵。
- 修复第一版中出现的问题，包括球友们的私信反馈，网站留言区的评论，以及 [GitHub 仓库](https://github.com/itwanger/toBeBetterJavaer/issues)中的 issue，让这份面试指南更加完善。
- 增加[二哥编程星球](https://javabetter.cn/zhishixingqiu/)的球友们拿到的一些 offer，对面渣逆袭的感谢，以及对简历修改的一些认可，以此来激励大家，给大家更多信心。
- 优化排版，增加手绘图，重新组织答案，使其更加口语化，从而更贴近面试官的预期。

![面渣逆袭已经提交 1478 次 GitHub 记录](https://cdn.tobebetterjavaer.com/stutymore/redis-20250614154416.png)

由于 PDF 没办法自我更新，所以需要最新版的小伙伴，可以微信搜【**沉默王二**】，或者扫描/长按识别下面的二维码，关注二哥的公众号，回复【**222**】即可拉取最新版本。

<div style="text-align: center; margin: 20px 0;">
    <img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png" alt="微信扫码或者长按识别，或者微信搜索“沉默王二”" style="max-width: 100%; height: auto;  border-radius: 10px;" />
</div>

当然了，请允许我的一点点私心，那就是星球的 PDF 版本会比公众号早一个月时间，毕竟星球用户都付费过了，我有必要让他们先享受到一点点福利。相信大家也都能理解，毕竟在线版是免费的，CDN、服务器、域名、OSS 等等都是需要成本的。

更别说我付出的时间和精力了，大家觉得有帮助还请给个口碑，让你身边的同事、同学都能受益到。

![回复 222](https://cdn.tobebetterjavaer.com/stutymore/collection-20250512160410.png)

我把二哥的 Java 进阶之路、JVM 进阶之路、并发编程进阶之路，以及所有面渣逆袭的版本都放进来了，涵盖 Java基础、Java集合、Java并发、JVM、Spring、MyBatis、计算机网络、操作系统、MySQL、Redis、RocketMQ、分布式、微服务、设计模式、Linux 等 16 个大的主题，共有 40 多万字，2000+张手绘图，可以说是诚意满满。

展示一下暗黑版本的 PDF 吧，排版清晰，字体优雅，更加适合夜服，晚上看会更舒服一点。

![面渣逆袭RSpring篇.pdf暗黑版](https://cdn.tobebetterjavaer.com/stutymore/redis-20250614154601.png)

## 基础

### 1.Spring是什么？

Spring 是一个 Java 后端开发框架，其最核心的作用是帮我们管理 Java 对象。

![Spring Logo](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-165c27b4-2ea0-409a-8fa5-389c105db0fa.png)

其最重要的特性就是 IoC，也就是控制反转。以前我们要使用一个对象时，都要自己先 new 出来。但有了 Spring 之后，我们只需要告诉 Spring 我们需要什么对象，它就会自动帮我们创建好并注入到 Spring 容器当中。

比如我在一个 Service 类里需要用到 Dao 对象，只需要加个 `@Autowired` 注解，Spring 就会自动把 Dao 对象注入到 Spring 容器当中，这样就不需要我们手动去管理这些对象之间的依赖关系了。

![二哥的 Java 进阶之路：技术派@Autowired源码](https://cdn.tobebetterjavaer.com/stutymore/spring-20250615105532.png)

另外，Spring 还提供了 AOP，也就是面向切面编程，在我们需要做一些通用功能的时候特别有用，比如说日志记录、权限校验、事务管理这些，我们不用在每个方法里都写重复的代码，直接用 AOP 就能统一处理。

![技术派：AOP 事务源码](https://cdn.tobebetterjavaer.com/stutymore/spring-20250615105726.png)

Spring 的生态也特别丰富，像 Spring Boot 能让我们快速搭建项目，Spring MVC 能帮我们处理 web 请求，Spring Data 能帮我们简化数据库操作，Spring Cloud 能帮我们做微服务架构等等。

#### Spring有哪些特性？

Spring 的特性还是挺多的，我按照在实际工作/学习中用得最多的几个来说吧。

![三分恶面渣逆袭：Spring特性](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-a0f0ef9d-3289-41ea-94c2-34b7e37ef854.png)

首先最核心的就是 IoC 控制反转和 DI 依赖注入。这个我前面也提到了，就是 Spring 能帮我们管理对象的创建和依赖关系。

比如我写一个 UserService，需要用到 UserDao，以前得自己 new 一个 UserDao 出来，现在只要在 UserService 上加个 `@Service` 注解，在 UserDao 字段上加个 `@Autowired`，Spring 就会自动帮我们处理好这些依赖关系。

这样代码的耦合度就大大降低了，测试的时候也更容易 mock。

第二个就是 AOP 面向切面编程。这个在我们处理一些横切关注点的时候特别有用，比如说我们要给某些 Controller 方法都加上权限控制，如果没有 AOP 的话，每个方法都要写一遍加权代码，维护起来很麻烦。

![技术派源码：@Permission注解加权限验证](https://cdn.tobebetterjavaer.com/stutymore/spring-20250615110533.png)

用了 AOP 之后，我们只需要写一个切面类，定义好切点和通知，就能统一处理了。事务管理也是同样的道理，加个 `@Transactional` 注解就搞定了。

还有就是 Spring 对各种企业级功能的集成支持也特别好。比如数据库访问，不管我们用 JDBC、MyBatis-Plus 还是 Hibernate，Spring 都能很好地集成。消息队列、缓存、安全认证这些， Spring 都有对应的模块来支持。

![技术派源码：Spring Boot 的约定大于配置](https://cdn.tobebetterjavaer.com/stutymore/spring-20250615111039.png)

另外 Spring 的配置也很灵活，既支持 XML 配置，也支持注解配置，现在我们基本都用注解了，写起来更简洁。Spring Boot 出来之后就更方便了，约定大于配置，很多东西都是开箱即用的。

#### 简单说一下什么是AOP和IoC？

AOP 面向切面编程，简单点说就是把一些通用的功能从业务代码里抽取出来，统一处理。比如说[技术派](https://javabetter.cn/zhishixingqiu/paicoding.html)中的 `@MdcDot` 注解的作用是配合 AOP 在日志中加入 MDC 信息，方便进行日志追踪。

![技术派源码：@MdcDot注解配合 AOP 完成日志追踪](https://cdn.tobebetterjavaer.com/stutymore/spring-20250615111917.png)

IoC 控制反转是一种设计思想，它的主要作用是将对象的创建和对象之间的调用过程交给 Spring 容器来管理。比如说在[技术派](https://javabetter.cn/zhishixingqiu/paicoding.html)项目当中，`@PostConstruct` 注解表明这个方法由 Spring 容器在 Bean 初始化完成后自动调用，我们不需要手动调用 init 方法。

![技术派源码：@PostConstruct应用](https://cdn.tobebetterjavaer.com/stutymore/spring-20250615113219.png)

#### Spring源码看过吗？

看过一些，主要是带着问题去看的，比如遇到一些技术难点或者想深入理解某个功能的时候。

我重点看过的是 IoC 容器的初始化过程，特别是 ApplicationContext 的启动流程。从 `refresh()` 方法开始，包括 Bean 的定义和加载、Bean 工厂的准备、Bean 的实例化和初始化这些关键步骤。

![星球嘉宾楼仔：Spring 源码解析](https://cdn.tobebetterjavaer.com/stutymore/spring-20241207102105.png)

看源码的时候发现 Spring 用了很多设计模式，比如工厂模式、单例模式、模板方法模式等等，这对我平时写代码也很有启发。

还有就是 Spring 的 Bean 生命周期，从 BeanDefinition 的创建到 Bean 的实例化、属性注入、初始化回调，再到最后的销毁，整个过程还是挺复杂的。看了源码之后对 `@PostConstruct`、`@PreDestroy` 这些注解的执行时机就更清楚了。

不过说实话，Spring 的源码确实比较难啃，涉及的概念和技术点太多了。我一般是结合一些技术博客和 Claude 一起看，这样理解起来会相对容易一些。

PS：关于这份小册的 PDF 版本，目前只有[星球](https://javabetter.cn/zhishixingqiu/)的用户可以获取，后续会考虑开放给大家。

![楼仔的 Spring 源码解析手册](https://cdn.tobebetterjavaer.com/stutymore/spring-20241207101910.png)

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的京东面经同学 5 Java 后端技术一面面试原题：IOC与AOP

memo：2025 年 6 月 15 日修改至此，今天在帮[球友们修改简历](https://javabetter.cn/zhishixingqiu/jianli.html)的时候，碰到一个中山大学本硕的球友，校园荣誉基本上拉满了，非常优秀，那我也希望能够帮助到更多的球友们，帮他们拿到更好的 offer。

![中山大学的球友](https://cdn.tobebetterjavaer.com/stutymore/spring-20250615120504.png)

### 2.Spring有哪些模块呢？

我按照平时工作/学习中接触的频率来说一下。

首先是 Spring Core 模块，这是整个 Spring 框架的基础，包含了 IoC 容器和依赖注入等核心功能。还有 Spring Beans 模块，负责 Bean 的配置和管理。这两个模块基本上是其他所有模块的基础，不管用 Spring 的哪个功能都会用到。

![Spring官网：模块划分](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-bb7c13ea-3174-4b32-84b8-821849ddc377.png)

然后是 Spring Context 上下文模块，它在 Core 的基础上提供了更多企业级的功能，比如国际化、事件传播、资源加载这些。ApplicationContext 就是在这个模块里面的。

```java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        // Spring Boot会自动创建ApplicationContext
        ApplicationContext context = SpringApplication.run(Application.class, args);
    }
}
```

Spring AOP 模块提供了面向切面编程的支持，我们用的 `@Transactional`、自定义切面这些都是基于这个模块。

Web 开发方面，Spring Web 模块提供了基础的 Web 功能，Spring WebMVC 就是我们常用的 MVC 框架，用来处理 HTTP 请求和响应。现在还有 Spring WebFlux，支持响应式编程。

比如说[技术派](https://javabetter.cn/zhishixingqiu/paicoding.html)项目中，`GlobalExceptionHandler` 类就使用了 `@RestControllerAdvice` 来实现统一的异常处理。

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(value = ForumAdviceException.class)
    public ResVo<String> handleForumAdviceException(ForumAdviceException e) {
        return ResVo.fail(e.getStatus());
    }
}
```

数据访问方面，Spring JDBC 简化了 JDBC 的使用，在[技术派](https://javabetter.cn/zhishixingqiu/paicoding.html)项目中，我们就 `JdbcTemplate` 来检查表是否存在、执行数据库初始化脚本。

![技术派源码：JdbcTemplate](https://cdn.tobebetterjavaer.com/stutymore/spring-20250616105042.png)

Spring ORM 提供了对 MyBatis-Plus 等 ORM 框架的集成支持。在[技术派](https://javabetter.cn/zhishixingqiu/paicoding.html)项目中，我们就用了 `@TableName`、`@TableField` 等注解进行对象关系映射，通过继承 BaseMapper 来获取通用的 CRUD 能力。

![技术派源码：BaseMapper](https://cdn.tobebetterjavaer.com/stutymore/spring-20250616105224.png)

Spring Test 模块提供了测试支持，可以很方便地进行单元测试和集成测试。我们写测试用例的时候经常用 `@SpringBootTest` 这些注解。比如说在[技术派](https://javabetter.cn/zhishixingqiu/paicoding.html)项目中，我们就用 `@SpringBootTest` 注解来加载 Spring 上下文，进行集成测试。

```java
@Slf4j
@SpringBootTest(classes = QuickForumApplication.class)
@RunWith(SpringJUnit4ClassRunner.class)
public class BasicTest {
}
```

还有一些其他的模块，比如 Spring Security 负责安全认证，Spring Batch 处理批处理任务等等。

现在我们基本都是用 Spring Boot 来开发，它把这些模块都整合好了，用起来更方便。

![技术派：技术选型](https://cdn.tobebetterjavaer.com/stutymore/spring-20250616105807.png)

memo：2025 年 6 月 16 日修改至此，今天在帮[球友们修改简历](https://javabetter.cn/zhishixingqiu/jianli.html)的时候，碰到一个大连海事大学硕河南理工大学本的球友，他荣誉奖项里提到的优秀研究生、奖学金、英语四六级，我希望看到的同学也都能争取一下，不要把这些荣誉拱手让人，或者压根就不知道，或者不屑于去参加，到时候你简历上这一栏就会比较苍白。

![大连海事大学硕河南理工大学本的球友](https://cdn.tobebetterjavaer.com/stutymore/spring-20250616110317.png)

### 3.Spring有哪些常用注解呢？

Spring 的注解挺多的，我按照不同的功能分类来说一下平时用得最多的那些。

首先是 Bean 管理相关的注解。`@Component` 是最基础的，用来标识一个类是 Spring 组件。像 `@Service`、`@Repository`、`@Controller` 这些都是 `@Component` 的特化版本，分别用在服务层、数据访问层和控制器层。

![三分恶面渣逆袭：Spring常用注解](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-8d0a1518-a425-4887-9735-45321095d927.png)

依赖注入方面，`@Autowired` 是用得最多的，可以标注在字段、setter 方法或者构造方法上。`@Qualifier` 在有多个同类型 Bean 的时候用来指定具体注入哪一个。`@Resource` 和 `@Autowired` 功能差不多，不过它是按名称注入的。

![技术派源码：@Resource和@Autowired](https://cdn.tobebetterjavaer.com/stutymore/spring-20250617110609.png)


配置相关的注解也很常用。`@Configuration` 标识配置类，`@Bean` 用来定义 Bean，`@Value` 用来注入配置文件中的属性值。我们项目里的数据库连接信息、Redis 配置这些都是用 `@Value` 来注入的。`@PropertySource` 用来指定配置文件的位置。

![技术派源码：@Value](https://cdn.tobebetterjavaer.com/stutymore/spring-20250617110755.png)

Web 开发的注解就更多了。`@RestController` 相当于 `@Controller` 加 `@ResponseBody`，用来做 RESTful 接口。

![技术派源码：web 开发的注解](https://cdn.tobebetterjavaer.com/stutymore/spring-20250617110859.png)

`@RequestMapping` 及其变体`@GetMapping`、`@PostMapping`、`@PutMapping`、`@DeleteMapping` 用来映射 HTTP 请求。`@PathVariable` 获取路径参数，`@RequestParam` 获取请求参数，`@RequestBody` 接收 JSON 数据。

AOP 相关的注解，`@Aspect` 定义切面，`@Pointcut` 定义切点，`@Before`、`@After`、`@Around` 这些定义通知类型。

![技术派源码：AOP 相关注解](https://cdn.tobebetterjavaer.com/stutymore/spring-20250617111100.png)

不过我们用得最多的还是`@Transactional`，基本上 Service 层需要保证事务原子性的方法都会加上这个注解。

生命周期相关的，`@PostConstruct` 在 Bean 初始化后执行，`@PreDestroy` 在 Bean 销毁前执行。测试的时候 `@SpringBootTest` 也经常用到。

![技术派源码：@PostConstruct](https://cdn.tobebetterjavaer.com/stutymore/spring-20250617111256.png)

还有一些 Spring Boot 特有的注解，比如 `@SpringBootApplication` 这个启动类注解，`@ConditionalOnProperty` 做条件装配，`@EnableAutoConfiguration` 开启自动配置等等。

![技术派源码：@ConditionalOnProperty](https://cdn.tobebetterjavaer.com/stutymore/spring-20250617111359.png)

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的微众银行同学 1 Java 后端一面的原题：说说 Spring 常见的注解？

memo：2025 年 6 月 17 日修改至此，今天在帮[球友们修改简历](https://javabetter.cn/zhishixingqiu/jianli.html)的时候，碰到一个学院本的球友，他的荣誉奖项还是 OK的，态度也非常好，之前有学院本球友拿到滴滴 SP offer 的，希望这位球友也能够成为星球里新的榜样。

![闽江学院的球友](https://cdn.tobebetterjavaer.com/stutymore/spring-20250617111727.png)

### 4.🌟Spring用了哪些设计模式？

Spring 框架里面确实用了很多设计模式，我从平时工作中能观察到的几个来说说。

首先是工厂模式，这个在 Spring 里用得非常多。BeanFactory 就是一个典型的工厂，它负责创建和管理所有的 Bean 对象。我们平时用的 ApplicationContext 其实也是 BeanFactory 的一个实现。当我们通过 `@Autowired` 获取一个 Bean 的时候，底层就是通过工厂模式来创建和获取对象的。

![三分恶面渣逆袭：Spring中用到的设计模式](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-ee1c5cee-8462-4bae-93ea-ec936cc77640.png)

单例模式也是 Spring 的默认行为。默认情况下，Spring 容器中的 Bean 都是单例的，整个应用中只会有一个实例。这样可以节省内存，提高性能。当然我们也可以通过 `@Scope` 注解来改变 Bean 的作用域，比如设置为 prototype 就是每次获取都创建新实例。

![二哥的 Java 进阶之路：@Scope注解](https://cdn.tobebetterjavaer.com/stutymore/spring-20250618113356.png)

代理模式在 AOP 中用得特别多。Spring AOP 的底层实现就是基于动态代理的，对于实现了接口的类用 JDK 动态代理，没有实现接口的类用 CGLIB 代理。比如我们用 `@Transactional` 注解的时候，Spring 会为我们的类创建一个代理对象，在方法执行前后添加事务处理逻辑。

模板方法模式在 Spring 里也很常见，比如 JdbcTemplate。它定义了数据库操作的基本流程：获取连接、执行 SQL、处理结果、关闭连接，但是具体的 SQL 语句和结果处理逻辑由我们来实现。

![技术派源码：JdbcTemplate](https://cdn.tobebetterjavaer.com/stutymore/spring-20250618114035.png)

观察者模式在 Spring 的事件机制中有所体现。我们可以通过 ApplicationEvent 和 ApplicationListener 来实现事件的发布和监听。比如用户注册成功后，我们可以发布一个用户注册事件，然后有多个监听器来处理后续的业务逻辑，比如发送邮件、记录日志等。

![技术派源码：ApplicationListener](https://cdn.tobebetterjavaer.com/stutymore/spring-20250618114211.png)

这些设计模式的应用让 Spring 框架既灵活又强大，也让我在实际的开发中学到很多经典的设计思想。

#### Spring如何实现单例模式？

传统的单例模式是在类的内部控制只能创建一个实例，比如用 private 构造方法加 `static getInstance()` 这种方式。但是 Spring 的单例是容器级别的，同一个 Bean 在整个 Spring 容器中只会有一个实例。

具体的实现机制是这样的：Spring 在启动的时候会把所有的 Bean 定义信息加载进来，然后在 DefaultSingletonBeanRegistry 这个类里面维护了一个叫 singletonObjects 的 ConcurrentHashMap，这个 Map 就是用来存储单例 Bean 的。key 是 Bean 的名称，value 就是 Bean 的实例对象。

![二哥的 Java 进阶之路：DefaultSingletonBeanRegistry](https://cdn.tobebetterjavaer.com/stutymore/spring-20250618115033.png)

当我们第一次获取某个 Bean 的时候，Spring 会先检查 singletonObjects 这个 Map 里面有没有这个 Bean，如果没有就会创建一个新的实例，然后放到 Map 里面。后面再获取同一个 Bean 的时候，直接从 Map 里面取就行了，这样就保证了单例。

![二哥的 Java 进阶之路：registerSingleton](https://cdn.tobebetterjavaer.com/stutymore/spring-20250618115153.png)

还有一个细节就是 Spring 为了解决循环依赖的问题，还用了三级缓存。除了 singletonObjects 这个一级缓存，还有 earlySingletonObjects 二级缓存和 singletonFactories 三级缓存。这样即使有循环依赖，Spring 也能正确处理。

而且 Spring 的单例是线程安全的，因为用的是 ConcurrentHashMap，多线程访问不会有问题。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的携程面经同学 10 Java 暑期实习一面面试原题：Spring IoC 的设计模式，AOP 的设计模式
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小公司面经合集同学 1 Java 后端面试原题：Spring 框架使用到的设计模式？
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的同学 1 贝壳找房后端技术一面面试原题：Spring用了什么设计模式？
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的快手同学 4 一面原题：Spring中使用了哪些设计模式，以其中一种模式举例说明？Spring如何实现单例模式？

memo：2025 年 6 月 20 日修改至此，今天[帮球友修改简历](https://javabetter.cn/zhishixingqiu/jianli.html)的时候，有碰到重庆邮电大学本，电子科技大学硕的球友，期间还有过清华大学科研项目的经历，基本上也是把学历这块拉的满中满了，那希望星球能帮助到更多院校的同学，不管是工作党还是学生党，都希望大家都拿到更好的 offer。

![重邮本，电子科技大学硕的球友](https://cdn.tobebetterjavaer.com/stutymore/spring-20250621062819.png)

### 5.Spring容器和Web容器之间的区别知道吗？（补充）

>2024 年 7 月 11 日增补

首先从概念上来说，Spring 容器是一个 IoC 容器，主要负责管理 Java 对象的生命周期和依赖关系。而 Web 容器，比如 Tomcat、Jetty 这些，是用来运行 Web 应用的容器，负责处理 HTTP 请求和响应，管理 Servlet 的生命周期。

```java
/**
 * SpringUtil.java
 * 用于获取 Spring 容器中的 Bean，技术派源码：https://github.com/itwanger/paicoding
 */
@Component
public class SpringUtil implements ApplicationContextAware {
    private volatile static ApplicationContext context;
    
    @Override
    public void setApplicationContext(ApplicationContext applicationContext) {
        SpringUtil.context = applicationContext;
    }
    
    public static <T> T getBean(Class<T> bean) {
        return context.getBean(bean);
    }
}
```

从功能上看，Spring 容器专注于业务逻辑层面的对象管理，比如我们的 Service、Dao、Controller 这些 Bean 都是由 Spring 容器来创建和管理的。而 Web 容器主要处理网络通信，比如接收 HTTP 请求、解析请求参数、调用相应的 Servlet，然后把响应返回给客户端。

![博客园 hiy1995：web 容器](https://cdn.tobebetterjavaer.com/stutymore/spring-20250621063345.png)

在实际项目中，这两个容器是相辅相成的。我们的 Web 项目部署在 Tomcat 上的时候，Tomcat 会负责接收 HTTP 请求，然后把请求交给 DispatcherServlet 处理，而 DispatcherServlet 又会去 Spring 容器中查找相应的 Controller 来处理业务逻辑。

```java
/**
 * GlobalViewInterceptor.java
 * 用于全局拦截器，技术派源码：https://github.com/itwanger/paicoding
 */
@Component
public class GlobalViewInterceptor implements HandlerInterceptor {
    @Autowired
    private GlobalInitService globalInitService;
    
    @Override
    public boolean preHandle(HttpServletRequest request, 
                           HttpServletResponse response, 
                           Object handler) {
        // Web 容器的 HTTP 请求 + Spring 容器的业务服务
    }
}
```

还有一个重要的区别是生命周期。Web 容器的生命周期跟 Web 应用程序的部署和卸载相关，而 Spring 容器的生命周期是在 Web 应用启动的时候初始化，应用关闭的时候销毁。

现在我们都用 Spring Boot 了，Spring Boot 内置了 Tomcat，把 Web 容器和 Spring 容器都整合在一起了，我们只需要运行一个 jar 包就可以了。

```java
@SpringBootApplication
public class QuickForumApplication {
    public static void main(String[] args) {
        SpringApplication.run(QuickForumApplication.class, args);
    }
}
```

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的去哪儿同学 1 技术二面原题：spring的容器、web容器、springmvc的容器之间的区别

<MZNXQRcodeBanner />

memo：2024 年 7 月 11 日修改至此，今天在帮[球友们修改简历](https://javabetter.cn/zhishixingqiu/jianli.html)的时候，碰到北京交通大学本，北京航空航天大学硕的球友，她的简历上有很多校园荣誉奖项，像优秀学生、奖学金、英语四六级等，这些都是非常好的加分项。

![北京交通大学本，北京航空航天大学硕的球友](https://cdn.tobebetterjavaer.com/stutymore/spring-20250621064205.png)

## IoC

### 6.🌟说一说什么是IoC？

推荐阅读：[IoC 扫盲](https://javabetter.cn/springboot/ioc.html)

IoC 的全称是 Inversion of Control，也就是控制反转。这里的“控制”指的是对象创建和依赖关系管理的控制权。

![图片来源于网络：IoC](https://cdn.tobebetterjavaer.com/stutymore/spring-20240310191630.png)

以前我们写代码的时候，如果 A 类需要用到 B 类，我们就在 A 类里面直接 new 一个 B 对象出来，这样 A 类就控制了 B 类对象的创建。

```java
// 传统方式：对象主动创建依赖
public class UserService {
    private UserDao userDao;
    
    public UserService() {
        // 主动创建依赖对象
        this.userDao = new UserDaoImpl();
    }
}
```

有了 IoC 之后，这个控制权就“反转”了，不再由 A 类来控制 B 对象的创建，而是交给外部的容器来管理。

```java
/** 
 * 使用 Spring IoC 容器来管理 UserDao 的创建和注入
 * 技术派源码：https://github.com/itwanger/paicoding
 */
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;
    
    // 不需要主动创建 UserDao，由 Spring 容器注入
    public BaseUserInfoDTO getAndUpdateUserIpInfoBySessionId(String session, String clientIp) {
        // 直接使用注入的 userDao
        return userDao.getBySessionId(session);
    }
}
```

----这部分面试中可以不背 start----

没有 IoC 之前：

>我需要一个女朋友，刚好大街上突然看到了一个小姐姐，人很好看，于是我就自己主动上去搭讪，要她的微信号，找机会聊天关心她，然后约她出来吃饭，打听她的爱好，三观。。。


有了 IoC 之后：

>我需要一个女朋友，于是我就去找婚介所，告诉婚介所，我需要一个长的像赵露思的，会打 Dota2 的，于是婚介所在它的人才库里开始找，找不到它就直接说没有，找到它就直接介绍给我。

婚介所就相当于一个 IoC 容器，我就是一个对象，我需要的女朋友就是另一个对象，我不用关心女朋友是怎么来的，我只需要告诉婚介所我需要什么样的女朋友，婚介所就帮我去找。

![三分恶面渣逆袭：引入IoC之前和引入IoC之后](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-619da277-c15e-4dd7-9f2b-dbd809a9aaa0.png)

----这部分面试中可以不背 end----

#### DI和IoC的区别了解吗？

IoC 的思想是把对象创建和依赖关系的控制权由业务代码转移给 Spring 容器。这是一个比较抽象的概念，告诉我们应该怎么去设计系统架构。

![Martin Fowler’s Definition](https://cdn.tobebetterjavaer.com/stutymore/spring-20241117132929.png)

而 DI，也就是依赖注入，它是实现 IoC 这种思想的具体技术手段。在 Spring 里，我们用 `@Autowired` 注解就是在使用 DI 的字段注入方式。

```java
@Service
public class ArticleReadServiceImpl implements ArticleReadService {
    @Autowired
    private ArticleDao articleDao;  // 字段注入
    
    @Autowired
    private UserDao userDao;
}
```

从实现角度来看，DI 除了字段注入，还有构造方法注入和 Setter 方法注入等方式。在做[技术派](https://javabetter.cn/zhishixingqiu/paicoding.html)项目的时候，我就尝试过构造方法注入的方式。

![技术派源码：构造方法的注入方式](https://cdn.tobebetterjavaer.com/stutymore/spring-20250622091928.png)

当然了，DI 并不是实现 IoC 的唯一方式，还有 Service Locator 模式，可以通过实现 ApplicationContextAware 接口来获取 Spring 容器中的 Bean。

![技术派源码：IoC 的Service Locator 模式](https://cdn.tobebetterjavaer.com/stutymore/spring-20250622093007.png)

之所以 ID 后成为 IoC 的首选实现方式，是因为代码更清晰、可读性更高。

```
IoC（控制反转）
├── DI（依赖注入）          ← 主要实现方式
│   ├── 构造器注入
│   ├── 字段注入
│   └── Setter注入
├── 服务定位器模式
├── 工厂模式
└── 其他实现方式
```

#### 为什么要使用 IoC 呢？

在日常开发中，如果我们需要实现某一个功能，可能至少需要两个以上的对象来协助完成，在没有 Spring 之前，每个对象在需要它的合作对象时，需要自己 new 一个，比如说 A 要使用 B，A 就对 B 产生了依赖，也就是 A 和 B 之间存在了一种耦合关系。

```java
// 传统方式：对象自己创建依赖
public class UserService {
    private UserDao userDao = new UserDaoImpl(); // 硬编码依赖
    
    public User getUser(Long id) {
        return userDao.findById(id);
    }
}
```

有了 Spring 之后，创建 B 的工作交给了 Spring 来完成，Spring 创建好了 B 对象后就放到容器中，A 告诉 Spring 我需要 B，Spring 就从容器中取出 B 交给 A 来使用。

```java
// IoC 方式：依赖由外部注入
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao; // 依赖注入，不关心具体实现
    
    public User getUser(Long id) {
        return userDao.findById(id);
    }
}
```

至于 B 是怎么来的，A 就不再关心了，Spring 容器想通过 newnew 创建 B 还是 new 创建 B，无所谓。

这就是 IoC 的好处，它降低了对象之间的耦合度，让每个对象只关注自己的业务实现，不关心其他对象是怎么创建的。

推荐阅读：[孤傲苍狼：谈谈对 Spring IOC 的理解](https://www.cnblogs.com/xdp-gacl/p/4249939.html)

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小米 25 届日常实习一面原题：说说你对 AOP 和 IoC 的理解。
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小公司面经合集同学 1 Java 后端面试原题：介绍 Spring IoC 和 AOP?
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的招商银行面经同学 6 招银网络科技面试原题：SpringBoot框架的AOP、IOC/DI？
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的京东面经同学 8 面试原题：IOC，AOP
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的快手同学 4 一面原题：解释下什么是IOC和AOP？分别解决了什么问题？IOC和DI的区别？

memo：2025 年 6 月 22 日修改至此，今天[有球友发喜报说拿到了两个 offer](https://javabetter.cn/zhishixingqiu/)，一个是做 B 端电商的，另一个是外企，主要做 Power BI 的低代码开发，我的建议是去外企，因为实习最重要的是混个 title，有更多的时间，可以去学习星球里的项目，其实会更实在。

![球友拿到了外企和电商的 offer](https://cdn.tobebetterjavaer.com/stutymore/spring-二哥，目前拿到了两个offer。第一个是做b端电.png)

### 7.能说一下IoC的实现机制吗？

好的，Spring IoC 的实现机制还是比较复杂的，我尽量用比较通俗的方式来解释一下整个流程。

![面渣逆袭：mini版本Spring IoC](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-1d55c63d-2d12-43b1-9f43-428f5f4a1413.png)


第一步是加载 Bean 的定义信息。Spring 会扫描我们配置的包路径，找到所有标注了 `@Component`、`@Service`、`@Repository` 这些注解的类，然后把这些类的元信息封装成 BeanDefinition 对象。

```java
// Bean定义信息
public class BeanDefinition {
    private String beanClassName;     // 类名
    private String scope;            // 作用域
    private boolean lazyInit;        // 是否懒加载
    private String[] dependsOn;      // 依赖的Bean
    private ConstructorArgumentValues constructorArgumentValues; // 构造参数
    private MutablePropertyValues propertyValues; // 属性值
}
```

第二步是 Bean 工厂的准备。Spring 会创建一个 DefaultListableBeanFactory 作为 Bean 工厂来负责 Bean 的创建和管理。

![技术派源码：DefaultListableBeanFactory](https://cdn.tobebetterjavaer.com/stutymore/spring-20250623094742.png)

第三步是 Bean 的实例化和初始化。这个过程比较复杂，Spring 会根据 BeanDefinition 来创建 Bean 实例。

![IoC的实现机制](https://cdn.tobebetterjavaer.com/stutymore/spring-20250623101221.png)

对于单例 Bean，Spring 会先检查缓存中是否已经存在，如果不存在就创建新实例。创建实例的时候会通过反射调用构造方法，然后进行属性注入，最后执行初始化回调方法。

```java
// 简化的Bean创建流程
public class AbstractBeanFactory {
    
    protected Object createBean(String beanName, BeanDefinition bd) {
        // 1. 实例化前处理
        Object bean = resolveBeforeInstantiation(beanName, bd);
        if (bean != null) {
            return bean;
        }
        
        // 2. 实际创建Bean
        return doCreateBean(beanName, bd);
    }
    
    protected Object doCreateBean(String beanName, BeanDefinition bd) {
        // 2.1 实例化
        Object bean = createBeanInstance(beanName, bd);
        
        // 2.2 属性填充（依赖注入）
        populateBean(beanName, bd, bean);
        
        // 2.3 初始化
        Object exposedObject = initializeBean(beanName, bean, bd);
        
        return exposedObject;
    }
}
```

依赖注入的实现主要是通过反射来完成的。比如我们用 `@Autowired` 标注了一个字段，Spring 在创建 Bean 的时候会扫描这个字段，然后从容器中找到对应类型的 Bean，通过反射的方式设置到这个字段上。

![贰师兄的屠宰场：各个注解的注入流程](https://cdn.tobebetterjavaer.com/stutymore/spring-20250628110426.png)

#### 你是怎么理解 Spring IoC 的？

IoC 本质上一个超级工厂，这个工厂的产品就是各种 Bean 对象。

![三分恶面渣逆袭：工厂运行](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-7678c40f-a48d-4bd5-80f8-e902ad688e11.png)

我们通过 `@Component`、`@Service` 这些注解告诉工厂：“我要生产什么样的产品，这个产品有什么特性，需要什么原材料”。

然后工厂里各种生产线，在 Spring 中就是各种 BeanPostProcessor。比如 `AutowiredAnnotationBeanPostProcessor` 专门负责处理 `@Autowired` 注解。

工厂里还有各种缓存机制用来存放产品，比如说 singletonObjects 是成品仓库，存放完工的单例 Bean；earlySingletonObjects 是半成品仓库，用来解决循环依赖问题。

```java
// Spring单例Bean注册表
public class DefaultSingletonBeanRegistry {
    // 一级缓存：完成初始化的单例Bean
    private final Map<String, Object> singletonObjects = new ConcurrentHashMap<>(256);
    
    // 二级缓存：早期暴露的单例Bean（解决循环依赖）
    private final Map<String, Object> earlySingletonObjects = new HashMap<>(16);
    
    // 三级缓存：单例Bean工厂
    private final Map<String, ObjectFactory<?>> singletonFactories = new HashMap<>(16);
    
    public Object getSingleton(String beanName) {
        Object singletonObject = this.singletonObjects.get(beanName);
        if (singletonObject == null) {
            singletonObject = this.earlySingletonObjects.get(beanName);
            if (singletonObject == null) {
                ObjectFactory<?> singletonFactory = this.singletonFactories.get(beanName);
                if (singletonFactory != null) {
                    singletonObject = singletonFactory.getObject();
                    this.earlySingletonObjects.put(beanName, singletonObject);
                    this.singletonFactories.remove(beanName);
                }
            }
        }
        return singletonObject;
    }
}
```

最有意思的是，这个工厂还很智能，它知道产品之间的依赖关系。它会根据依赖关系来决定 Bean 的创建顺序。如果发现循环依赖，它还会用三级缓存机制来巧妙地解决。

#### 能手写一个简单的 IoC 容器吗？

1、首先定义基础的注解，比如说 `@Component`、`@Autowired` 等。

```java
// 组件注解
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface Component {
}

// 自动注入注解
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Autowired {
}
```

2、核心的 IoC 容器类，负责扫描包路径，创建 Bean 实例，并处理依赖注入。

```java
public class SimpleIoC {
    // Bean容器
    private Map<Class<?>, Object> beans = new HashMap<>();
    
    /**
     * 注册Bean
     */
    public void registerBean(Class<?> clazz) {
        try {
            // 创建实例
            Object instance = clazz.getDeclaredConstructor().newInstance();
            beans.put(clazz, instance);
        } catch (Exception e) {
            throw new RuntimeException("创建Bean失败: " + clazz.getName(), e);
        }
    }
    
    /**
     * 获取Bean
     */
    @SuppressWarnings("unchecked")
    public <T> T getBean(Class<T> clazz) {
        return (T) beans.get(clazz);
    }
    
    /**
     * 依赖注入
     */
    public void inject() {
        for (Object bean : beans.values()) {
            injectFields(bean);
        }
    }
    
    /**
     * 字段注入
     */
    private void injectFields(Object bean) {
        Field[] fields = bean.getClass().getDeclaredFields();
        for (Field field : fields) {
            if (field.isAnnotationPresent(Autowired.class)) {
                try {
                    field.setAccessible(true);
                    Object dependency = getBean(field.getType());
                    field.set(bean, dependency);
                } catch (Exception e) {
                    throw new RuntimeException("注入失败: " + field.getName(), e);
                }
            }
        }
    }
}
```

3、使用示例，定义一些 Bean 类，并注册到 IoC 容器中。

```java
// DAO层
@Component
class UserDao {
    public void save(String user) {
        System.out.println("保存用户: " + user);
    }
}

// Service层
@Component
class UserService {
    @Autowired
    private UserDao userDao;
    
    public void createUser(String name) {
        userDao.save(name);
        System.out.println("用户创建完成");
    }
}

// 测试
public class Test {
    public static void main(String[] args) {
        SimpleIoC ioc = new SimpleIoC();
        
        // 注册Bean
        ioc.registerBean(UserDao.class);
        ioc.registerBean(UserService.class);
        
        // 依赖注入
        ioc.inject();
        
        // 使用
        UserService userService = ioc.getBean(UserService.class);
        userService.createUser("王二");
    }
}
```

4、可以加上组件扫描。

```java
import java.lang.reflect.Field;
import java.util.*;

public class SimpleIoC {
    private Map<Class<?>, Object> beans = new HashMap<>();
    
    /**
     * 扫描并注册组件
     */
    public void scan(String packageName) {
        // 简化版：手动添加需要扫描的类
        List<Class<?>> classes = getClassesInPackage(packageName);
        
        for (Class<?> clazz : classes) {
            if (clazz.isAnnotationPresent(Component.class)) {
                registerBean(clazz);
            }
        }
        
        // 依赖注入
        inject();
    }
    
    /**
     * 获取包下的类（简化实现）
     */
    private List<Class<?>> getClassesInPackage(String packageName) {
        // 面试时可以说："实际实现需要扫描classpath，这里简化处理"
        return Arrays.asList(UserDao.class, UserService.class);
    }
    
    private void registerBean(Class<?> clazz) {
        try {
            Object instance = clazz.getDeclaredConstructor().newInstance();
            beans.put(clazz, instance);
        } catch (Exception e) {
            throw new RuntimeException("创建Bean失败", e);
        }
    }
    
    @SuppressWarnings("unchecked")
    public <T> T getBean(Class<T> clazz) {
        return (T) beans.get(clazz);
    }
    
    private void inject() {
        for (Object bean : beans.values()) {
            Field[] fields = bean.getClass().getDeclaredFields();
            for (Field field : fields) {
                if (field.isAnnotationPresent(Autowired.class)) {
                    try {
                        field.setAccessible(true);
                        Object dependency = getBean(field.getType());
                        field.set(bean, dependency);
                    } catch (Exception e) {
                        throw new RuntimeException("注入失败", e);
                    }
                }
            }
        }
    }
}
```

IoC 容器的核心是管理对象和依赖注入，首先定义注解，然后实现容器的三个核心方法：注册Bean、获取Bean、依赖注入；关键是用反射创建对象和注入依赖。

memo：2025 年 6 月 23 日修改至此，今天[有球友发喜报说拿到了京东的社招 offer](https://javabetter.cn/zhishixingqiu/)，这真的要恭喜他，也希望所有看到这里的小伙伴都能有一个好的结果。

![球友拿到京东社招 offer](https://cdn.tobebetterjavaer.com/stutymore/spring-20250623105438.png)

### 8.说说BeanFactory和ApplicantContext的区别?

BeanFactory 算是 Spring 的“心脏”，而 ApplicantContext 可以说是 Spring 的完整“身躯”。

![三分恶面渣逆袭：BeanFactory和ApplicantContext](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-66328446-f89f-4b7a-8d9f-0e1145dd9b2f.png)

BeanFactory 提供了最基本的 IoC 能力。它就像是一个 Bean 工厂，负责 Bean 的创建和管理。他采用的是懒加载的方式，也就是说只有当我们真正去获取某个 Bean 的时候，它才会去创建这个 Bean。

![三分恶面渣逆袭：Spring5 BeanFactory继承体系](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-6e6d4b69-f36c-41e6-b8ba-9277be147c9b.png)

它最主要的方法就是 `getBean()`，负责从容器中返回特定名称或者类型的 Bean 实例。

```java
public class BeanFactoryExample {
    public static void main(String[] args) {
        // 创建 BeanFactory
        DefaultListableBeanFactory beanFactory = new DefaultListableBeanFactory();
        
        // 手动注册 Bean 定义
        BeanDefinition beanDefinition = new RootBeanDefinition(UserService.class);
        beanFactory.registerBeanDefinition("userService", beanDefinition);
        
        // 懒加载：此时才创建 Bean 实例
        UserService userService = beanFactory.getBean("userService", UserService.class);
    }
}
```

ApplicationContext 是 BeanFactory 的子接口，在 BeanFactory 的基础上扩展了很多企业级的功能。它不仅包含了 BeanFactory 的所有功能，还提供了国际化支持、事件发布机制、AOP、JDBC、ORM 框架集成等等。

![三分恶面渣逆袭：Spring5 ApplicationContext部分体系类图](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-e201c9a3-f23c-4768-b844-ac7e0ba4bcec.png)

ApplicationContext 采用的是饿加载的方式，容器启动的时候就会把所有的单例 Bean 都创建好，虽然这样会导致启动时间长一点，但运行时性能更好。

```java
@Configuration
public class AppConfig {
    @Bean
    public UserService userService() {
        return new UserService();
    }
}

public class ApplicationContextExample {
    public static void main(String[] args) {
        // 创建 ApplicationContext，启动时就创建所有 Bean
        ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
        
        // 获取 Bean
        UserService userService = context.getBean(UserService.class);
        
        // 发布事件
        context.publishEvent(new CustomEvent("Hello World"));
    }
}
```

从使用场景来说，实际开发中用得最多的是 ApplicationContext。像 AnnotationConfigApplicationContext、WebApplicationContext 这些都是 ApplicationContext 的实现类。

另外一个重要的区别是生命周期管理。ApplicationContext 会自动调用 Bean 的初始化和销毁方法，而 BeanFactory 需要我们手动管理。

在 Spring Boot 项目中，我们可以通过 `@Autowired` 注入 ApplicationContext，或者通过实现 ApplicationContextAware 接口来获取 ApplicationContext。

![技术派源码：获取ApplicationContext](https://cdn.tobebetterjavaer.com/stutymore/spring-20250625111259.png)

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团同学 2 优选物流调度技术 2 面面试原题：BeanFactory和ApplicationContext

memo：2025 年 6 月 25 日修改至此，今天给一个华科本硕研 0 的[球友修改简历](https://javabetter.cn/zhishixingqiu/jianli.html)后，发来这样的感慨，要是早点知道你的[网站](https://javabetter.cn/home.html)和[星球](https://javabetter.cn/zhishixingqiu/)就好了，[技术派](https://javabetter.cn/zhishixingqiu/paicoding.html)不比外卖强多了？再次感谢二哥。

![球友对星球相见恨晚](https://cdn.tobebetterjavaer.com/stutymore/spring-20250625111617.png)

### 9.🌟项目启动时Spring的IoC会做什么？

第一件事是扫描和注册 Bean。IoC 容器会根据我们的配置，比如 `@ComponentScan` 指定的包路径，去扫描所有标注了 `@Component`、`@Service`、`@Controller` 这些注解的类。然后把这些类的元信息包装成 BeanDefinition 对象，注册到容器的 BeanDefinitionRegistry 中。这个阶段只是收集信息，还没有真正创建对象。

![pdai.tech：IoC](https://cdn.tobebetterjavaer.com/stutymore/spring-20250627101759.png)

第二件事是 Bean 的实例化和注入。这是最核心的过程，IoC 容器会按照依赖关系的顺序开始创建 Bean 实例。对于单例 Bean，容器会通过反射调用构造方法创建实例，然后进行属性注入，最后执行初始化回调方法。

![Tom弹架构：Bean 的实例化和注入](https://cdn.tobebetterjavaer.com/stutymore/spring-20250627102651.png)

在依赖注入时，容器会根据 `@Autowired`、`@Resource` 这些注解，把相应的依赖对象注入到目标 Bean 中。比如 UserService 需要 UserDao，容器就会把 UserDao 的实例注入到 UserService 中。

#### 说说Spring的Bean实例化方式？

Spring 提供了 4 种方式来实例化 Bean，以满足不同场景下的需求。

第一种是通过构造方法实例化，这是最常用的方式。当我们用 `@Component`、`@Service` 这些注解标注类的时候，Spring 默认通过无参构造器来创建实例的。如果类只有一个有参构造方法，Spring 会自动进行构造方法注入。

```java
@Service
public class UserService {
    private UserDao userDao;
    
    public UserService(UserDao userDao) {  // 构造方法注入
        this.userDao = userDao;
    }
}
```

第二种是通过静态工厂方法实例化。有时候对象的创建比较复杂，我们会写一个静态工厂方法来创建，然后用 `@Bean` 注解来标注这个方法。Spring 会调用这个静态方法来获取 Bean 实例。

```java
@Configuration
public class AppConfig {
    @Bean
    public static DataSource createDataSource() {
        // 复杂的DataSource创建逻辑
        return new HikariDataSource();
    }
}
```

第三种是通过实例工厂方法实例化。这种方式是先创建工厂对象，然后通过工厂对象的方法来创建Bean：

```java
@Configuration
public class AppConfig {
    @Bean
    public ConnectionFactory connectionFactory() {
        return new ConnectionFactory();
    }
    
    @Bean
    public Connection createConnection(ConnectionFactory factory) {
        return factory.createConnection();
    }
}
```

第四种是通过 FactoryBean 接口实例化。这是 Spring 提供的一个特殊接口，当我们需要创建复杂对象的时候特别有用：

```java
@Component
public class MyFactoryBean implements FactoryBean<MyObject> {
    @Override
    public MyObject getObject() throws Exception {
        // 复杂的对象创建逻辑
        return new MyObject();
    }
    
    @Override
    public Class<?> getObjectType() {
        return MyObject.class;
    }
}
```

在实际工作中，用得最多的还是构造方法实例化，因为简单直接。工厂方法一般用在需要复杂初始化逻辑的场景，比如数据库连接池、消息队列连接这些。FactoryBean 主要是在框架开发或者需要动态创建对象的时候使用。

Spring 在实例化的时候会根据 Bean 的定义自动选择合适的方式，我们作为开发者主要是通过注解和配置来告诉 Spring 应该怎么创建对象。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的华为面经同学 8 技术二面面试原题：说说 Spring 的 Bean 实例化方式
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团同学 2 优选物流调度技术 2 面面试原题：bean加工有哪些方法？

memo：2025 年 6 月 27 日修改至此，今天看到[有球友发的 offer 选择提问贴](https://javabetter.cn/zhishixingqiu/)，其中一个是杭州六小龙群核科技，我个人认为还是非常值得去的，毕竟是杭州的独角兽公司，薪资待遇都不错。

![球友拿到了杭州群核科技的 offer](https://cdn.tobebetterjavaer.com/stutymore/spring-20250627103801.png)

### 10.你是怎么理解Bean的？

在我看来，Bean 本质上就是由 Spring 容器管理的 Java 对象，但它和普通的 Java 对象有很大区别。普通的 Java 对象我们是通过 new 关键字创建的。而 Bean 是交给 Spring 容器来管理的，从创建到销毁都由容器负责。

![stack overflow：bean 的初始化过程](https://cdn.tobebetterjavaer.com/stutymore/spring-20250628110931.png)

从实际使用的角度来说，我们项目里的 Service、Dao、Controller 这些都是 Bean。比如 UserService 被标注了 `@Service` 注解，它就成了一个 Bean，Spring 会自动创建它的实例，管理它的依赖关系，当其他地方需要用到 UserService 的时候，Spring 就会把这个实例注入进去。

![技术派源码：UserService](https://cdn.tobebetterjavaer.com/stutymore/spring-20250628111222.png)

这种依赖注入的方式让对象之间的关系变得松耦合。

Spring 提供了多种 Bean 的配置方式，基于注解的方式是最常用的。

![二哥的 Java 进阶之路：Bean 的声明方式](https://cdn.tobebetterjavaer.com/stutymore/spring-20241224163146.png)

基于 XML 配置的方式在 Spring Boot 项目中已经不怎么用了。Java 配置类的方式则可以用来解决一些比较复杂的场景，比如说主从数据源，我们可以用 `@Primary` 注解标注主数据源，用 `@Qualifier` 来指定备用数据源。

```java
@Configuration
public class AppConfig {
    
    @Bean
    @Primary  // 主要候选者
    public DataSource primaryDataSource() {
        return new HikariDataSource();
    }
    
    @Bean
    @Qualifier("secondary")
    public DataSource secondaryDataSource() {
        return new BasicDataSource();
    }
}
```

那在使用的时候，当我们直接用 `@Autowired` 注解注入 DataSource 时，Spring 默认会使用 HikariDataSource；当加上 `@Qualifier("secondary")` 注解时，Spring 则会注入 BasicDataSource。

```java
@Autowired
private DataSource dataSource; // 会注入 primaryDataSource（因为有 @Primary）

@Autowired
@Qualifier("secondary")
private DataSource secondaryDataSource;
```

#### @Component 和 @Bean 有什么区别？

首先从使用上来说，`@Component` 是标注在类上的，而 `@Bean` 是标注在方法上的。`@Component` 告诉 Spring 这个类是一个组件，请把它注册为 Bean，而 `@Bean` 则告诉 Spring 请将这个方法返回的对象注册为 Bean。

```java
@Component  // Spring自动创建UserService实例
public class UserService {
    @Autowired
    private UserDao userDao;
}

@Configuration
public class AppConfig {
    @Bean  // 我们手动创建DataSource实例
    public DataSource dataSource() {
        HikariDataSource ds = new HikariDataSource();
        ds.setJdbcUrl("jdbc:mysql://localhost:3306/test");
        ds.setUsername("root");
        ds.setPassword("123456");
        return ds;  // 返回给Spring管理
    }
}
```

从控制权的角度来说，`@Component` 是由 Spring 自动创建和管理的。

![技术派源码：@Component](https://cdn.tobebetterjavaer.com/stutymore/spring-20250628114006.png)

而 `@Bean` 则是由我们手动创建的，然后再交给 Spring 管理，我们对对象的创建过程有完全的控制权。

![技术派源码：@Bean](https://cdn.tobebetterjavaer.com/stutymore/spring-20250628114149.png)

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的京东面经同学 9 面试原题：怎么理解spring的bean，@Component 和 @Bean 的区别

memo：2025 年 6 月 28 日修改至此，今天在帮球友[修改简历](https://javabetter.cn/zhishixingqiu/)的时候，又碰到一个杭电本硕的球友。我这里想说的一点是，杭电的计算机专业非常强，虽然他只是一所双非，如果能把项目经历、专业技能好好写的话，拿个大厂的顶级 offer 是完全没问题的。

![杭州电子科技大学本硕的球友](https://cdn.tobebetterjavaer.com/stutymore/spring-计算机科学与技术.png)

### 11.🌟能说一下Bean的生命周期吗？

推荐阅读：[三分恶：Spring Bean 生命周期，好像人的一生](https://mp.weixin.qq.com/s/zb6eA3Se0gQoqL8PylCPLw)

好的。

Bean 的生命周期可以分为 5 个主要阶段，我按照实际的执行顺序来说一下。

![三分恶面渣逆袭：Bean生命周期五个阶段](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-595fce5b-36cb-4dcb-b08c-8205a1e98d8a.png)

第一个阶段是实例化。Spring 容器会根据 BeanDefinition，通过反射调用 Bean 的构造方法创建对象实例。如果有多个构造方法，Spring 会根据依赖注入的规则选择合适的构造方法。

![三分恶面渣逆袭：Spring Bean生命周期](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-942a927a-86e4-4a01-8f52-9addd89642ff.png)

第二阶段是属性赋值。这个阶段 Spring 会给 Bean 的属性赋值，包括通过 `@Autowired`、`@Resource` 这些注解注入的依赖对象，以及通过 `@Value` 注入的配置值。

![二哥的 Java 进阶之路：doCreateBean 方法源码](https://cdn.tobebetterjavaer.com/stutymore/spring-20240311101430.png)

第三阶段是初始化。这个阶段会依次执行：

- `@PostConstruct` 标注的方法
- InitializingBean 接口的 afterPropertiesSet 方法
- 通过 `@Bean` 的 initMethod 指定的初始化方法

![三分恶面渣逆袭：Bean生命周期源码追踪](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-d2da20a3-08d0-4648-b9a3-2fff8512b159.png)

我在项目中经常用 `@PostConstruct` 来做一些初始化工作，比如缓存预加载、DB 配置等等。

```java
// CategoryServiceImpl中的缓存初始化
@PostConstruct
public void init() {
    categoryCaches = CacheBuilder.newBuilder().maximumSize(300).build(new CacheLoader<Long, CategoryDTO>() {
        @Override
        public CategoryDTO load(@NotNull Long categoryId) throws Exception {
            CategoryDO category = categoryDao.getById(categoryId);
            // ...
        }
    });
}

// DynamicConfigContainer中的配置初始化
@PostConstruct
public void init() {
    cache = Maps.newHashMap();
    bindBeansFromLocalCache("dbConfig", cache);
}
```

初始化后，Spring 还会调用所有注册的 BeanPostProcessor 后置处理方法。这个阶段经常用来创建代理对象，比如 AOP 代理。

第五阶段是使用 Bean。比如我们的 Controller 调用 Service，Service 调用 DAO。

```java
// UserController中的使用示例
@Autowired
private UserService userService;
@GetMapping("/users/{id}")
public UserDTO getUser(@PathVariable Long id) {
    return userService.getUserById(id);
}
// UserService中的使用示例
@Autowired
private UserDao userDao;
public UserDTO getUserById(Long id) {
    return userDao.getById(id);
}
// UserDao中的使用示例
@Autowired
private JdbcTemplate jdbcTemplate;
public UserDTO getById(Long id) {
    String sql = "SELECT * FROM users WHERE id = ?";
    return jdbcTemplate.queryForObject(sql, new Object[]{id}, new UserRowMapper());
}
```

最后是销毁阶段。当容器关闭或者 Bean 被移除的时候，会依次执行：

- `@PreDestroy` 标注的方法
- DisposableBean 接口的 destroy 方法
- 通过 `@Bean` 的 destroyMethod 指定的销毁方法

![二哥的 Java 进阶之路：close 源码](https://cdn.tobebetterjavaer.com/stutymore/spring-20240311101658.png)

#### Aware 类型的接口有什么作用？

Aware 接口在 Spring 中是一个很有意思的设计，它们的作用是让 Bean 能够感知到 Spring 容器的一些内部组件。

从设计理念来说，Aware 接口实现了一种“回调”机制。正常情况下，Bean 不应该直接依赖 Spring 容器，这样可以保持代码的独立性。但有些时候，Bean 确实需要获取容器的一些信息或者组件，Aware 接口就提供了这样一个能力。

我最常用的 Aware 接口是 ApplicationContextAware，它可以让 Bean 获取到 ApplicationContext 容器本身。

![技术派源码：ApplicationContextAware](https://cdn.tobebetterjavaer.com/stutymore/spring-20250630100429.png)

在[技术派项目](https://javabetter.cn/zhishixingqiu/paicoding.html)中，我就通过实现 ApplicationContextAware 和 EnvironmentAware 接口封装了一个 SpringUtil 工具类，通过 getBean 和 getProperty 方法来获取 Bean 和配置属性。

```java
// 静态方法获取Bean，方便在非Spring管理的类中使用
public static <T> T getBean(Class<T> clazz) {
    return context.getBean(clazz);
}

// 获取配置属性
public static String getProperty(String key) {
    return environment.getProperty(key);
}
```

#### 如果配置了 init-method 和 destroy-method，Spring 会在什么时候调用其配置的方法？

init-method 指定的初始化方法会在 Bean 的初始化阶段被调用，具体的执行顺序是：

- 先执行 `@PostConstruct` 标注的方法
- 然后执行 InitializingBean 接口的 `afterPropertiesSet()` 方法
- 最后再执行 init-method 指定的方法

也就是说，init-method 是在所有其他初始化方法之后执行的。

```java
@Component
public class MyService {
    @Autowired
    private UserDao userDao;
    
    @PostConstruct
    public void postConstruct() {
        System.out.println("1. @PostConstruct执行");
    }
    
    public void customInit() {  // 通过@Bean的initMethod指定
        System.out.println("3. init-method执行");
    }
}

@Configuration
public class AppConfig {
    @Bean(initMethod = "customInit")
    public MyService myService() {
        return new MyService();
    }
}
```

destroy-method 会在 Bean 销毁阶段被调用。

```java
@Component
public class MyService {
    @PreDestroy
    public void preDestroy() {
        System.out.println("1. @PreDestroy执行");
    }
    
    public void customDestroy() {  // 通过@Bean的destroyMethod指定
        System.out.println("3. destroy-method执行");
    }
}
```

不过在实际开发中，通常用 `@PostConstruct` 和 `@PreDestroy` 就够了，它们更简洁。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小米 25 届日常实习一面原题：说说 Bean 的生命周期
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的百度面经同学 1 文心一言 25 实习 Java 后端面试原题：Spring中bean生命周期
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的8 后端开发秋招一面面试原题：讲一下Spring Bean的生命周期
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的同学 1 贝壳找房后端技术一面面试原题：bean生命周期
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的快手同学 4 一面原题：介绍下Bean的生命周期？Aware类型接口的作用？如果配置了init-method和destroy-method，Spring会在什么时候调用其配置的方法？

memo：2025 年 6 月 30 日修改至此。昨天有[读者发消息说有三个 offer 要选择](https://javabetter.cn/zhishixingqiu/)，中科大读博、中海油、商飞北研，问我该怎么选择？说实话，这三个都是非常优质的选择，我个人的建议是优先考虑中科大读博，毕竟是国内顶尖学府，博士毕业后可以选择在高校任教，会更符合他的家庭条件，当然了，我深知，读博的产出压力非常大。

![读者拿到中科大读博、中海油、商飞北研](https://cdn.tobebetterjavaer.com/stutymore/spring-20250630101647.png)

### 12.为什么IDEA不推荐使用@Autowired注解注入Bean？

前情提要：当使用 `@Autowired` 注解注入 Bean 时，IDEA 会提示“Field injection is not recommended”。

![二哥的 Java 进阶之路：@Autowired](https://cdn.tobebetterjavaer.com/stutymore/spring-20241224164722.png)

面试回答：

主要有几个原因。

第一个是字段注入不利于单元测试。字段注入需要使用反射或 Spring 容器才能注入依赖，测试更复杂；而构造方法注入可以直接通过构造方法传入 Mock 对象，测试起来更简单。

```java
// 字段注入的测试困难
@Test
public void testUserService() {
    UserService userService = new UserService();
    // 无法直接设置userRepository，需要反射或Spring容器
    // userService.userRepository = Mockito.mock(UserRepository.class);
    // 需要手动设置依赖，测试不方便
    ReflectionTestUtils.setField(userService, "userRepository", Mockito.mock(UserRepository.class));
    userService.doSomething();
    // ...
}

// 构造方法注入的测试简单
@Test
public void testUserService() {
    UserRepository mockRepository = Mockito.mock(UserRepository.class);
    UserService userService = new UserService(mockRepository); // 直接注入
}
```

第二个是字段注入会隐藏循环依赖问题，而构造方法注入会在项目启动时就去检查依赖关系，能更早发现问题。

第三个是构造方法注入可以使用 final 字段确保依赖在对象创建时就被初始化，避免了后续修改的风险。

在[技术派项目](https://javabetter.cn/zhishixingqiu/paicoding.html)中，我们已经在使用构造方法注入的方式来管理依赖关系。

![技术派：构造方法注入](https://cdn.tobebetterjavaer.com/stutymore/spring-20241224165628.png)

不过话说回来，`@Autowired` 的字段注入方式在一些简单的场景下还是可以用的，主要看团队的编码规范吧。

#### @Autowired 和 @Resource 注解的区别？

首先从来源上说，`@Autowired` 是 Spring 框架提供的注解，而 `@Resource` 是 Java EE 标准提供的注解。换句话说，`@Resource` 是 JDK 自带的，而 `@Autowired` 是 Spring 特有的。

虽然 IDEA 不推荐使用 `@Autowired`，但对 `@Resource` 注解却没有任何提示。

![技术派：@Resource](https://cdn.tobebetterjavaer.com/stutymore/spring-20241224170055.png)

从注入方式上说，`@Autowired` 默认按照类型，也就是 byType 进行注入，而 `@Resource` 默认按照名称，也就是 byName 进行注入。

当容器中存在多个相同类型的 Bean， 比如说有两个 UserRepository 的实现类，直接用 `@Autowired` 注入 UserRepository 时就会报错，因为 Spring 容器不知道该注入哪个实现类。

```java
@Component
public class UserRepository21 implements UserRepository2 {}

@Component
public class UserRepository22 implements UserRepository2 {}

@Component
public class UserService2 {
    @Autowired
    private UserRepository2 userRepository; // 冲突
}
```

这时候，有两种解决方案，第一种是使用 `@Autowired` + `@Qualifier` 指定具体的 Bean 名称来解决冲突。

```java
@Component("userRepository21")
public class UserRepository21 implements UserRepository2 {
}
@Component("userRepository22")
public class UserRepository22 implements UserRepository2 {
}
@Autowired
@Qualifier("userRepository22")
private UserRepository2 userRepository22;
```

第二种是使用 `@Resource` 注解按名称进行注入。

```java
@Resource(name = "userRepository21")
private UserRepository2 userRepository21;
```

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的京东面经同学 9 面试原题：依赖注入的时候，直接Autowired比较直接，为什么推荐构造方法注入呢

memo：2025 年 7 月 1 日修改至此，今天在[帮球友修改简历](https://javabetter.cn/zhishixingqiu/)的时候，碰到一个郑州大学本硕的球友，这也是我们河南省最好的大学了，但也仅仅是一所 211，所以希望所有河南的同学都能加把劲，证明自己的实力，去拿到更好的 offer，为校争光。

![郑州大学本硕的球友](https://cdn.tobebetterjavaer.com/stutymore/spring-20250701154344.png)

### 13.什么是自动装配？

自动装配的本质就是让 Spring 容器自动帮我们完成 Bean 之间的依赖关系注入，而不需要我们手动去指定每个依赖。简单来说，就是“我们不用告诉 Spring 具体怎么注入，Spring 自己会想办法找到合适的 Bean 注入进来”。

自动装配的工作原理简单来说就是，Spring 容器在启动时自动扫描 `@ComponentScan` 指定包路径下的所有类，然后根据类上的注解，比如 `@Autowired`、`@Resource` 等，来判断哪些 Bean 需要被自动装配。

```java
@Configuration
@ComponentScan("com.github.paicoding.forum.service")
@MapperScan(basePackages = {
    "com.github.paicoding.forum.service.article.repository.mapper",
    "com.github.paicoding.forum.service.user.repository.mapper"
    // ... 更多包路径
})
public class ServiceAutoConfig {
    // Spring自动扫描指定包下的所有组件并注册为Bean
}
```

之后分析每个 Bean 的依赖关系，在创建 Bean 的时候，根据装配规则自动找到合适的依赖 Bean，最后根据反射将这些依赖注入到目标 Bean 中。

#### Spring提供了哪几种自动装配类型？

Spring 的自动装配方式有好几种，在 XML 配置时代，主要有 byName、byType、constructor 和 autodetect 四种方式。

![三分恶面渣逆袭：Spring四种自动装配类型](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-034120d9-88c7-490b-af07-7d48f3b6b7bc.png)

到了注解驱动时代，用得最多的是 `@Autowired` 注解，默认按照类型装配。

```java
@Service
public class UserService {
    @Autowired  // 按类型自动装配
    private UserRepository userRepository;
}
```

其次还有 `@Resource` 注解，它默认按照名称装配，如果找不到对应名称的 Bean，就会按类型装配。

Spring Boot 的自动装配还有一套更高级的机制，通过 `@EnableAutoConfiguration` 和各种 `@Conditional` 注解来实现，这个是框架级别的自动装配，会根据 classpath 中的类和配置来自动配置 Bean。

![ShawnBlog：Spring Boot 的自动装配](https://cdn.tobebetterjavaer.com/stutymore/spring-20250702101032.png)

memo：2025 年 7 月 2 日修改至此，今天在[帮球友修改简历](https://javabetter.cn/zhishixingqiu/)的时候，碰到一个北京航空航天大学的球友，他在邮件中说到：在星球里学到了好多东西，目前正在准备[技术派](https://javabetter.cn/zhishixingqiu/paicoding.html)和 MYDB，打算好好冲秋招，能帮助到大家我真的很欣慰。

![北航球友对星球的认可](https://cdn.tobebetterjavaer.com/stutymore/spring-20250702101812.png)

### 14.Bean 的作用域有哪些?

在 Spring 中，Bean 默认是单例的，即在整个 Spring 容器中，每个 Bean 只有一个实例。

可以通过在配置中指定 scope 属性，将 Bean 改为多例（Prototype）模式，这样每次获取的都是新的实例。

```java
@Bean
@Scope("prototype")  // 每次获取都是新的实例
public MyBean myBean() {
    return new MyBean();
}
```

除了单例和多例，Spring 还支持其他作用域，如请求作用域（Request）、会话作用域（Session）等，适合 Web 应用中特定的使用场景。

![三分恶面渣逆袭：Spring Bean支持作用域](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-08a9cb31-5a4f-4224-94cd-0c0f643a57ea.png)

- **request**：每一次 HTTP 请求都会产生一个新的 Bean，该 Bean 仅在当前 HTTP Request 内有效。
- **session**：同一个 Session 共享一个 Bean，不同的 Session 使用不同的 Bean。
- **globalSession**：同一个全局 Session 共享一个 Bean，只用于基于 Protlet 的 Web 应用，Spring5 中已经移除。


> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的同学 1 贝壳找房后端技术一面面试原题：bean是单例还是多例的，具体怎么修改

### 14.Spring 中的单例 Bean 会存在线程安全问题吗？

Spring Bean 的默认作用域是单例（Singleton），这意味着 Spring 容器中只会存在一个 Bean 实例，并且该实例会被多个线程共享。

如果单例 Bean 是无状态的，也就是没有成员变量，那么这个单例 Bean 是线程安全的。比如 Spring MVC 中的 Controller、Service、Dao 等，基本上都是无状态的。

但如果 Bean 的内部状态是可变的，且没有进行适当的同步处理，就可能出现线程安全问题。

![三分恶面渣逆袭：Spring单例Bean线程安全问题](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-35dacef4-1a9e-45e1-b3f2-5a91227eb244.png)

#### 单例 Bean 线程安全问题怎么解决呢？

第一，使用局部变量。局部变量是线程安全的，因为每个线程都有自己的局部变量副本。尽量使用局部变量而不是共享的成员变量。

```java
public class MyService {
    public void process() {
        int localVar = 0;
        // 使用局部变量进行操作
    }
}
```

第二，尽量使用无状态的 Bean，即不在 Bean 中保存任何可变的状态信息。

```java
public class MyStatelessService {
    public void process() {
        // 无状态处理
    }
}
```

第三，同步访问。如果 Bean 中确实需要保存可变状态，可以通过 [synchronized 关键字](https://javabetter.cn/thread/synchronized-1.html)或者 [Lock 接口](https://javabetter.cn/thread/reentrantLock.html)来保证线程安全。

```java
public class MyService {
    private int sharedVar;

    public synchronized void increment() {
        sharedVar++;
    }
}
```

或者将 Bean 中的成员变量保存到 ThreadLocal 中，[ThreadLocal](https://javabetter.cn/thread/ThreadLocal.html) 可以保证多线程环境下变量的隔离。

```java
public class MyService {
    private ThreadLocal<Integer> localVar = ThreadLocal.withInitial(() -> 0);

    public void process() {
        localVar.set(localVar.get() + 1);
    }
}
```

再或者使用线程安全的工具类，比如说 [AtomicInteger](https://javabetter.cn/thread/atomic.html)、[ConcurrentHashMap](https://javabetter.cn/thread/ConcurrentHashMap.html)、[CopyOnWriteArrayList](https://javabetter.cn/thread/CopyOnWriteArrayList.html) 等。

```java
public class MyService {
    private ConcurrentHashMap<String, String> map = new ConcurrentHashMap<>();

    public void putValue(String key, String value) {
        map.put(key, value);
    }
}
```

第四，将 Bean 定义为原型作用域（Prototype）。原型作用域的 Bean 每次请求都会创建一个新的实例，因此不存在线程安全问题。

```java
@Component
@Scope("prototype")
public class MyService {
    // 实例变量
}
```


> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的阿里面经同学 1 闲鱼后端一面的原题：spring的bean的并发安全问题


### 15.说说循环依赖?

A 依赖 B，B 依赖 A，或者 C 依赖 C，就成了循环依赖。

![三分恶面渣逆袭：Spring循环依赖](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-f8fea53f-56fa-4cca-9199-ec7f648da625.png)

>循环依赖只发生在 Singleton 作用域的 Bean 之间，因为如果是 Prototype 作用域的 Bean，Spring 会直接抛出异常。

原因很简单，AB 循环依赖，A 实例化的时候，发现依赖 B，创建 B 实例，创建 B 的时候发现需要 A，创建 A1 实例……无限套娃。。。。

我们来看一个实例，先是 PrototypeBeanA：

```java
@Component
@Scope("prototype")
public class PrototypeBeanA {
    private final PrototypeBeanB prototypeBeanB;

    @Autowired
    public PrototypeBeanA(PrototypeBeanB prototypeBeanB) {
        this.prototypeBeanB = prototypeBeanB;
    }
}
```

然后是 PrototypeBeanB：

```java
@Component
@Scope("prototype")
public class PrototypeBeanB {
    private final PrototypeBeanA prototypeBeanA;

    @Autowired
    public PrototypeBeanB(PrototypeBeanA prototypeBeanA) {
        this.prototypeBeanA = prototypeBeanA;
    }
}
```

再然后是测试：

```java
@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(ApplicationContext ctx) {
        return args -> {
            // 尝试获取PrototypeBeanA的实例
            PrototypeBeanA beanA = ctx.getBean(PrototypeBeanA.class);
        };
    }
}
```

运行结果：

![二哥的 Java 进阶之路：循环依赖](https://cdn.tobebetterjavaer.com/stutymore/spring-20240310202703.png)

在这个示例中，当 Spring 应用启动并尝试获取 PrototypeBeanA 或 PrototypeBeanB 的实例时，将会遇到问题。因为它们互相依赖，而 Spring 无法解决 Prototype 作用域 bean 的循环依赖问题。

#### Spring 可以解决哪些情况的循环依赖？

看看这几种情形（AB 循环依赖）：

![三分恶面渣逆袭：循环依赖的几种情形](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-37bb576d-b4af-42ed-91f4-d846ceb012b6.png)

也就是说：

- AB 均采用构造器注入，不支持
- AB 均采用 setter 注入，支持
- AB 均采用属性自动注入，支持
- A 中注入的 B 为 setter 注入，B 中注入的 A 为构造器注入，支持
- B 中注入的 A 为 setter 注入，A 中注入的 B 为构造器注入，不支持

第四种可以，第五种不可以的原因是 Spring 在创建 Bean 时默认会根据自然排序进行创建，所以 A 会先于 B 进行创建。

简单总结下，当循环依赖的实例都采用 setter 方法注入时，Spring 支持，都采用构造器注入的时候，不支持；构造器注入和 setter 注入同时存在的时候，看天（😂）。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小米 25 届日常实习一面原题：如何解决循环依赖？


### 16.Spring 怎么解决循环依赖呢？

Spring 通过三级缓存机制来解决循环依赖：

1. 一级缓存：存放完全初始化好的单例 Bean。
2. 二级缓存：存放正在创建但未完全初始化的 Bean 实例。
3. 三级缓存：存放 Bean 工厂对象，用于提前暴露 Bean。

![三分恶面渣逆袭：三级缓存](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-01d92863-a2cb-4f61-8d8d-30ecf0279b28.png)


#### 三级缓存解决循环依赖的过程是什么样的？

1. 实例化 Bean 时，将其早期引用放入三级缓存。
2. 其他依赖该 Bean 的对象，可以从缓存中获取其引用。
3. 初始化完成后，将 Bean 移入一级缓存。

假如 A、B 两个类发生循环依赖：

![三分恶面渣逆袭：循环依赖](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-cfc09f84-f8e1-4702-80b6-d115843e81fe.png)

A 实例的初始化过程：

①、创建 A 实例，实例化的时候把 A 的对象⼯⼚放⼊三级缓存，表示 A 开始实例化了，虽然这个对象还不完整，但是先曝光出来让大家知道。

![三分恶面渣逆袭：A 对象工厂](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-1a8bdc29-ff43-4ff4-9b61-3eedd9da59b3.png)

②、A 注⼊属性时，发现依赖 B，此时 B 还没有被创建出来，所以去实例化 B。

③、同样，B 注⼊属性时发现依赖 A，它就从缓存里找 A 对象。依次从⼀级到三级缓存查询 A。

发现可以从三级缓存中通过对象⼯⼚拿到 A，虽然 A 不太完善，但是存在，就把 A 放⼊⼆级缓存，同时删除三级缓存中的 A，此时，B 已经实例化并且初始化完成了，把 B 放入⼀级缓存。

![三分恶面渣逆袭：放入一级缓存](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-bf2507bf-96aa-4b88-a58b-7ec41d11bc70.png)

④、接着 A 继续属性赋值，顺利从⼀级缓存拿到实例化且初始化完成的 B 对象，A 对象创建也完成，删除⼆级缓存中的 A，同时把 A 放⼊⼀级缓存

⑤、最后，⼀级缓存中保存着实例化、初始化都完成的 A、B 对象。

![三分恶面渣逆袭：AB 都好了](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-022f7cb9-2c83-4fe9-b252-b02bd0fb2435.png)

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小米 25 届日常实习一面原题：如何解决循环依赖？
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的百度面经同学 1 文心一言 25 实习 Java 后端面试原题：Spring如何解决循环依赖？
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的得物面经同学 9 面试题目原题：Spring源码看过吗？Spring的三级缓存知道吗？
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的阿里云面经同学 22 面经：spring三级缓存解决循环依赖问题

### 17.为什么要三级缓存？⼆级不⾏吗？

不行，主要是为了 **⽣成代理对象**。如果是没有代理的情况下，使用二级缓存解决循环依赖也是 OK 的。但是如果存在代理，三级没有问题，二级就不行了。

因为三级缓存中放的是⽣成具体对象的匿名内部类，获取 Object 的时候，它可以⽣成代理对象，也可以返回普通对象。使⽤三级缓存主要是为了保证不管什么时候使⽤的都是⼀个对象。

假设只有⼆级缓存的情况，往⼆级缓存中放的显示⼀个普通的 Bean 对象，Bean 初始化过程中，通过 BeanPostProcessor 去⽣成代理对象之后，覆盖掉⼆级缓存中的普通 Bean 对象，那么可能就导致取到的 Bean 对象不一致了。

![三分恶面渣逆袭：二级缓存不行的原因](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-6ece8a46-25b1-459b-8cfa-19fc696dd7d6.png)

#### 如果缺少第二级缓存会有什么问题？

如果没有二级缓存，Spring 无法在未完成初始化的情况下暴露 Bean。会导致代理 Bean 的循环依赖问题，因为某些代理逻辑无法在三级缓存中提前暴露。最终可能抛出 BeanCurrentlyInCreationException。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的快手同学 4 一面原题：循环依赖有了解过吗？出现循环依赖的原因？三大缓存存储内容的区别？如何解决循环依赖？如果缺少第二级缓存会有什么问题？

### 18.@Autowired 的实现原理？

实现@Autowired 的关键是：**AutowiredAnnotationBeanPostProcessor**

在 Bean 的初始化阶段，会通过 Bean 后置处理器来进行一些前置和后置的处理。

实现@Autowired 的功能，也是通过后置处理器来完成的。这个后置处理器就是 AutowiredAnnotationBeanPostProcessor。

- Spring 在创建 bean 的过程中，最终会调用到 doCreateBean()方法，在 doCreateBean()方法中会调用 populateBean()方法，来为 bean 进行属性填充，完成自动装配等工作。

- 在 populateBean()方法中一共调用了两次后置处理器，第一次是为了判断是否需要属性填充，如果不需要进行属性填充，那么就会直接进行 return，如果需要进行属性填充，那么方法就会继续向下执行，后面会进行第二次后置处理器的调用，这个时候，就会调用到 AutowiredAnnotationBeanPostProcessor 的 postProcessPropertyValues()方法，在该方法中就会进行@Autowired 注解的解析，然后实现自动装配。

```java
/**
* 属性赋值
**/
protected void populateBean(String beanName, RootBeanDefinition mbd, @Nullable BeanWrapper bw) {
          //…………
          if (hasInstAwareBpps) {
              if (pvs == null) {
                  pvs = mbd.getPropertyValues();
              }

              PropertyValues pvsToUse;
              for(Iterator var9 = this.getBeanPostProcessorCache().instantiationAware.iterator(); var9.hasNext(); pvs = pvsToUse) {
                  InstantiationAwareBeanPostProcessor bp = (InstantiationAwareBeanPostProcessor)var9.next();
                  pvsToUse = bp.postProcessProperties((PropertyValues)pvs, bw.getWrappedInstance(), beanName);
                  if (pvsToUse == null) {
                      if (filteredPds == null) {
                          filteredPds = this.filterPropertyDescriptorsForDependencyCheck(bw, mbd.allowCaching);
                      }
                      //执行后处理器，填充属性，完成自动装配
                      //调用InstantiationAwareBeanPostProcessor的postProcessPropertyValues()方法
                      pvsToUse = bp.postProcessPropertyValues((PropertyValues)pvs, filteredPds, bw.getWrappedInstance(), beanName);
                      if (pvsToUse == null) {
                          return;
                      }
                  }
              }
          }
         //…………
  }
```

- postProcessorPropertyValues()方法的源码如下，在该方法中，会先调用 findAutowiringMetadata()方法解析出 bean 中带有@Autowired 注解、@Inject 和@Value 注解的属性和方法。然后调用 metadata.inject()方法，进行属性填充。

```java
  public PropertyValues postProcessProperties(PropertyValues pvs, Object bean, String beanName) {
      //@Autowired注解、@Inject和@Value注解的属性和方法
      InjectionMetadata metadata = this.findAutowiringMetadata(beanName, bean.getClass(), pvs);

      try {
          //属性填充
          metadata.inject(bean, beanName, pvs);
          return pvs;
      } catch (BeanCreationException var6) {
          throw var6;
      } catch (Throwable var7) {
          throw new BeanCreationException(beanName, "Injection of autowired dependencies failed", var7);
      }
  }
```

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括 Java 基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM 等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

## AOP

### 19.说说什么是 AOP？

AOP，也就是面向切面编程，简单点说，AOP 就是把一些业务逻辑中的相同代码抽取到一个独立的模块中，让业务逻辑更加清爽。

![三分恶面渣逆袭：横向抽取](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-09dbcda4-7c1b-42d6-8520-1a5fc84abbde.png)

举个例子，假如我们现在需要在业务代码开始前进行参数校验，在结束后打印日志，该怎么办呢？

我们可以把`日志记录`和`数据校验`这两个功能抽取出来，形成一个切面，然后在业务代码中引入这个切面，这样就可以实现业务逻辑和通用逻辑的分离。

![三分恶面渣逆袭：AOP应用示例](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-4754b4c0-0356-4077-a2f9-55e246cf8ba0.png)

业务代码不再关心这些通用逻辑，只需要关心自己的业务实现，这样就实现了业务逻辑和通用逻辑的分离。

#### AOP 有哪些核心概念？

- **切面**（Aspect）：类是对物体特征的抽象，切面就是对横切关注点的抽象
- **连接点**（Join Point）：被拦截到的点，因为 Spring 只支持方法类型的连接点，所以在 Spring 中，连接点指的是被拦截到的方法，实际上连接点还可以是字段或者构造方法
- **切点**（Pointcut）：对连接点进行拦截的定位
- **通知**（Advice）：指拦截到连接点之后要执行的代码，也可以称作**增强**
- **目标对象** （Target）：代理的目标对象
- **引介**（introduction）：一种特殊的增强，可以动态地为类添加一些属性和方法
- **织入**（Weabing）：织入是将增强添加到目标类的具体连接点上的过程。

#### 织入有哪几种方式？

①、编译期织入：切面在目标类编译时被织入。

②、类加载期织入：切面在目标类加载到 JVM 时被织入。需要特殊的类加载器，它可以在目标类被引入应用之前增强该目标类的字节码。

③、运行期织入：切面在应用运行的某个时刻被织入。一般情况下，在织入切面时，AOP 容器会为目标对象动态地创建一个代理对象。

Spring AOP 采用运行期织入，而 AspectJ 可以在编译期织入和类加载时织入。

#### AspectJ 是什么？

AspectJ 是一个 AOP 框架，它可以做很多 Spring AOP 干不了的事情，比如说支持编译时、编译后和类加载时织入切面。并且提供更复杂的切点表达式和通知类型。

![AspectJ 官网](https://cdn.tobebetterjavaer.com/stutymore/spring-20240806100537.png)

下面是一个简单的 AspectJ 示例：

```java
// 定义一个切面
@Aspect
public class LoggingAspect {

    // 定义一个切点，匹配 com.example 包下的所有方法
    @Pointcut("execution(* com.example..*(..))")
    private void selectAll() {}

    // 定义一个前置通知，在匹配的方法执行之前执行
    @Before("selectAll()")
    public void beforeAdvice() {
        System.out.println("A method is about to be executed.");
    }
}
```


#### AOP 有哪些环绕方式？

AOP 一般有 **5 种**环绕方式：

- 前置通知 (@Before)
- 返回通知 (@AfterReturning)
- 异常通知 (@AfterThrowing)
- 后置通知 (@After)
- 环绕通知 (@Around)

![三分恶面渣逆袭：环绕方式](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-320fa34f-6620-419c-b17a-4f516a83caeb.png)

多个切面的情况下，可以通过 `@Order` 指定先后顺序，数字越小，优先级越高。代码示例如下：

```java
@Aspect
@Component
public class WebLogAspect {

    private final static Logger logger = LoggerFactory.getLogger(WebLogAspect.class);

    @Pointcut("@annotation(cn.fighter3.spring.aop_demo.WebLog)")
    public void webLog() {}

    @Before("webLog()")
    public void doBefore(JoinPoint joinPoint) throws Throwable {
        // 开始打印请求日志
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        // 打印请求相关参数
        logger.info("========================================== Start ==========================================");
        // 打印请求 url
        logger.info("URL            : {}", request.getRequestURL().toString());
        // 打印 Http method
        logger.info("HTTP Method    : {}", request.getMethod());
        // 打印调用 controller 的全路径以及执行方法
        logger.info("Class Method   : {}.{}", joinPoint.getSignature().getDeclaringTypeName(), joinPoint.getSignature().getName());
        // 打印请求的 IP
        logger.info("IP             : {}", request.getRemoteAddr());
        // 打印请求入参
        logger.info("Request Args   : {}",new ObjectMapper().writeValueAsString(joinPoint.getArgs()));
    }

    @After("webLog()")
    public void doAfter() throws Throwable {
        // 结束后打个分隔线，方便查看
        logger.info("=========================================== End ===========================================");
    }

    @Around("webLog()")
    public Object doAround(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        //开始时间
        long startTime = System.currentTimeMillis();
        Object result = proceedingJoinPoint.proceed();
        // 打印出参
        logger.info("Response Args  : {}", new ObjectMapper().writeValueAsString(result));
        // 执行耗时
        logger.info("Time-Consuming : {} ms", System.currentTimeMillis() - startTime);
        return result;
    }
}
```

#### Spring AOP 发生在什么时候？

Spring AOP 基于运行时代理机制，这意味着 Spring AOP 是在运行时通过动态代理生成的，而不是在编译时或类加载时生成的。

在 Spring 容器初始化 Bean 的过程中，Spring AOP 会检查 Bean 是否需要应用切面。如果需要，Spring 会为该 Bean 创建一个代理对象，并在代理对象中织入切面逻辑。这一过程发生在 Spring 容器的后处理器（BeanPostProcessor）阶段。

![二哥的 Java 进阶之路：BeanPostProcessor](https://cdn.tobebetterjavaer.com/stutymore/spring-20240806102547.png)

#### 简单总结一下 AOP

AOP，也就是面向切面编程，是一种编程范式，旨在提高代码的模块化。比如说可以将日志记录、事务管理等分离出来，来提高代码的可重用性。

AOP 的核心概念包括切面（Aspect）、连接点（Join Point）、通知（Advice）、切点（Pointcut）和织入（Weaving）等。

① 像日志打印、事务管理等都可以抽离为切面，可以声明在类的方法上。像 `@Transactional` 注解，就是一个典型的 AOP 应用，它就是通过 AOP 来实现事务管理的。我们只需要在方法上添加 `@Transactional` 注解，Spring 就会在方法执行前后添加事务管理的逻辑。

② Spring AOP 是基于代理的，它默认使用 JDK 动态代理和 CGLIB 代理来实现 AOP。

③ Spring AOP 的织入方式是运行时织入，而 AspectJ 支持编译时织入、类加载时织入。

#### AOP和 OOP 的关系？

AOP 和 OOP 是互补的编程思想：

1. OOP 通过类和对象封装数据和行为，专注于核心业务逻辑。
2. AOP 提供了解决横切关注点（如日志、权限、事务等）的机制，将这些逻辑集中管理。


> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯 Java 后端实习一面原题：说说 AOP 的原理。
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小米 25 届日常实习一面原题：说说你对 AOP 和 IoC 的理解。
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的快手面经同学 7 Java 后端技术一面面试原题：说一下 Spring AOP 的实现原理
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小公司面经合集同学 1 Java 后端面试原题：介绍 Spring IoC 和 AOP?
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的招商银行面经同学 6 招银网络科技面试原题：SpringBoot框架的AOP、IOC/DI？
> 6. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团面经同学 4 一面面试原题：Spring AOP发生在什么时候
> 7. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的理想汽车面经同学 2 一面面试原题：Spring AOP的概念了解吗？AOP和 OOP 的关系？

### 20.AOP的使用场景有哪些？

AOP 的使用场景有很多，比如说日志记录、事务管理、权限控制、性能监控等。

我们在[技术派实战项目](https://javabetter.cn/zhishixingqiu/paicoding.html)中主要利用 AOP 来打印接口的入参和出参日志、执行时间，方便后期 bug 溯源和性能调优。

![沉默王二：技术派教程](https://cdn.tobebetterjavaer.com/stutymore/spring-20240310180334.png)

第一步，自定义注解作为切点

```java
@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface MdcDot {
    String bizCode() default "";
}
```

第二步，配置 AOP 切面：

- `@Aspect`：标识切面
- `@Pointcut`：设置切点，这里以自定义注解为切点
- `@Around`：环绕切点，打印方法签名和执行时间

![技术派项目：配置 AOP 切面](https://cdn.tobebetterjavaer.com/stutymore/spring-20240310180741.png)

第三步，在使用的地方加上自定义注解

![技术派项目：使用注解](https://cdn.tobebetterjavaer.com/stutymore/spring-20240310181233.png)

第四步，当接口被调用时，就可以看到对应的执行日志。

```
2023-06-16 11:06:13,008 [http-nio-8080-exec-3] INFO |00000000.1686884772947.468581113|101|c.g.p.forum.core.mdc.MdcAspect.handle(MdcAspect.java:47) - 方法执行耗时: com.github.paicoding.forum.web.front.article.rest.ArticleRestController#recommend = 47
```

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的京东面经同学 5 Java 后端技术一面面试原题：AOP应用场景
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的理想汽车面经同学 2 一面面试原题：AOP的使用场景有哪些？
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的京东面经同学 9 面试原题：项目中的AOP是怎么用到的

### 21.说说 JDK 动态代理和 CGLIB 代理？

AOP 是通过[动态代理](https://mp.weixin.qq.com/s/aZtfwik0weJN5JzYc-JxYg)实现的，代理方式有两种：JDK 动态代理和 CGLIB 代理。

①、JDK 动态代理是基于接口的代理，只能代理实现了接口的类。

使用 JDK 动态代理时，Spring AOP 会创建一个代理对象，该代理对象实现了目标对象所实现的接口，并在方法调用前后插入横切逻辑。

优点：只需依赖 JDK 自带的 `java.lang.reflect.Proxy` 类，不需要额外的库；缺点：只能代理接口，不能代理类本身。

示例代码：

```java
public interface Service {
    void perform();
}

public class ServiceImpl implements Service {
    public void perform() {
        System.out.println("Performing service...");
    }
}

public class ServiceInvocationHandler implements InvocationHandler {
    private Object target;

    public ServiceInvocationHandler(Object target) {
        this.target = target;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("Before method");
        Object result = method.invoke(target, args);
        System.out.println("After method");
        return result;
    }
}

public class Main {
    public static void main(String[] args) {
        Service service = new ServiceImpl();
        Service proxy = (Service) Proxy.newProxyInstance(
            service.getClass().getClassLoader(),
            service.getClass().getInterfaces(),
            new ServiceInvocationHandler(service)
        );
        proxy.perform();
    }
}
```

②、CGLIB 动态代理是基于继承的代理，可以代理没有实现接口的类。

使用 CGLIB 动态代理时，Spring AOP 会生成目标类的子类，并在方法调用前后插入横切逻辑。

![图片来源于网络](https://cdn.tobebetterjavaer.com/stutymore/spring-20240321105653.png)

优点：可以代理没有实现接口的类，灵活性更高；缺点：需要依赖 CGLIB 库，创建代理对象的开销相对较大。

示例代码：

```java
public class Service {
    public void perform() {
        System.out.println("Performing service...");
    }
}

public class ServiceInterceptor implements MethodInterceptor {
    @Override
    public Object intercept(Object obj, Method method, Object[] args, MethodProxy proxy) throws Throwable {
        System.out.println("Before method");
        Object result = proxy.invokeSuper(obj, args);
        System.out.println("After method");
        return result;
    }
}

public class Main {
    public static void main(String[] args) {
        Enhancer enhancer = new Enhancer();
        enhancer.setSuperclass(Service.class);
        enhancer.setCallback(new ServiceInterceptor());

        Service proxy = (Service) enhancer.create();
        proxy.perform();
    }
}
```

#### 选择 CGLIB 还是 JDK 动态代理？

- 如果目标对象没有实现任何接口，则只能使用 CGLIB 代理。如果目标对象实现了接口，通常首选 JDK 动态代理。
- 虽然 CGLIB 在代理类的生成过程中可能消耗更多资源，但在运行时具有较高的性能。对于性能敏感且代理对象创建频率不高的场景，可以考虑使用 CGLIB。
- JDK 动态代理是 Java 原生支持的，不需要额外引入库。而 CGLIB 需要将 CGLIB 库作为依赖加入项目中。

#### 你会用 JDK 动态代理和 CGLIB 吗？

假设我们有这样一个小场景，客服中转，解决用户问题：

![三分恶面渣逆袭：用户向客服提问题](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-c5c4b247-62dd-43a2-a043-da51c58f77c8.png)

①、JDK 动态代理实现：

![三分恶面渣逆袭：JDK动态代理类图](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-65b14a3f-2653-463e-af77-a8875d3d635c.png)

第一步，创建接口

```java
public interface ISolver {
    void solve();
}
```

第二步，实现对应接口

```java
public class Solver implements ISolver {
    @Override
    public void solve() {
        System.out.println("疯狂掉头发解决问题……");
    }
}
```

第三步，动态代理工厂:ProxyFactory，直接用反射方式生成一个目标对象的代理，这里用了一个匿名内部类方式重写 InvocationHandler 方法。

```java
public class ProxyFactory {

    // 维护一个目标对象
    private Object target;

    public ProxyFactory(Object target) {
        this.target = target;
    }

    // 为目标对象生成代理对象
    public Object getProxyInstance() {
        return Proxy.newProxyInstance(target.getClass().getClassLoader(), target.getClass().getInterfaces(),
                new InvocationHandler() {
                    @Override
                    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                        System.out.println("请问有什么可以帮到您？");

                        // 调用目标对象方法
                        Object returnValue = method.invoke(target, args);

                        System.out.println("问题已经解决啦！");
                        return null;
                    }
                });
    }
}
```

第五步，客户端：Client，生成一个代理对象实例，通过代理对象调用目标对象方法

```java
public class Client {
    public static void main(String[] args) {
        //目标对象:程序员
        ISolver developer = new Solver();
        //代理：客服小姐姐
        ISolver csProxy = (ISolver) new ProxyFactory(developer).getProxyInstance();
        //目标方法：解决问题
        csProxy.solve();
    }
}
```

②、CGLIB 动态代理实现：

![三分恶面渣逆袭：CGLIB动态代理类图](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-74da87af-20d1-4a5b-a212-3837a15f0bab.png)

第一步：定义目标类（Solver），目标类 Solver 定义了一个 solve 方法，模拟了解决问题的行为。目标类不需要实现任何接口，这与 JDK 动态代理的要求不同。

```java
public class Solver {

    public void solve() {
        System.out.println("疯狂掉头发解决问题……");
    }
}
```

第二步：动态代理工厂（ProxyFactory），ProxyFactory 类实现了 MethodInterceptor 接口，这是 CGLIB 提供的一个方法拦截接口，用于定义方法的拦截逻辑。

```java
public class ProxyFactory implements MethodInterceptor {

    //维护一个目标对象
    private Object target;

    public ProxyFactory(Object target) {
        this.target = target;
    }

    //为目标对象生成代理对象
    public Object getProxyInstance() {
        //工具类
        Enhancer en = new Enhancer();
        //设置父类
        en.setSuperclass(target.getClass());
        //设置回调函数
        en.setCallback(this);
        //创建子类对象代理
        return en.create();
    }

    @Override
    public Object intercept(Object obj, Method method, Object[] args, MethodProxy proxy) throws Throwable {
        System.out.println("请问有什么可以帮到您？");
        // 执行目标对象的方法
        Object returnValue = method.invoke(target, args);
        System.out.println("问题已经解决啦！");
        return null;
    }

}
```

- ProxyFactory 接收一个 Object 类型的 target，即目标对象的实例。
- 使用 CGLIB 的 Enhancer 类来生成目标类的子类（代理对象）。通过 setSuperclass 设置代理对象的父类为目标对象的类，setCallback 设置方法拦截器为当前对象（this），最后调用 create 方法生成并返回代理对象。
- 重写 MethodInterceptor 接口的 intercept 方法以提供方法拦截逻辑。在目标方法执行前后添加自定义逻辑，然后通过 method.invoke 调用目标对象的方法。

第三步：客户端使用代理，首先创建目标对象（Solver 的实例），然后使用 ProxyFactory 创建该目标对象的代理。通过代理对象调用 solve 方法时，会先执行 intercept 方法中定义的逻辑，然后执行目标方法，最后再执行 intercept 方法中的后续逻辑。

```java
public class Client {
    public static void main(String[] args) {
        //目标对象:程序员
        Solver developer = new Solver();
        //代理：客服小姐姐
        Solver csProxy = (Solver) new ProxyFactory(developer).getProxyInstance();
        //目标方法：解决问题
        csProxy.solve();
    }
}
```

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的帆软同学 3 Java 后端一面的原题：cglib 的原理
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 22 暑期实习一面面试原题：Spring AOP 实现原理
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小米面经同学 F 面试原题：两种动态代理的区别
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 8 Java 后端实习一面面试原题：spring的aop是如何实现的
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯云智面经同学 20 二面面试原题：spring aop的底层原理是什么？
> 6. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团面经同学 3 Java 后端技术一面面试原题：java的反射机制，反射的应用场景AOP的实现原理是什么，与动态代理和反射有什么区别
> 7. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的比亚迪面经同学 12 Java 技术面试原题：代理介绍一下，jdk和cglib的区别
> 8. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的快手同学 4 一面原题：Spring AOP的实现原理？JDK动态代理和CGLib动态代理的各自实现及其区别？现在需要统计方法的具体执行时间，说下如何使用AOP来实现？
> 9. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的理想汽车面经同学 2 一面面试原题：了解AOP底层是怎么做的吗？

### 22.说说 Spring AOP 和 AspectJ AOP 区别?

Spring AOP 属于`运行时增强`，主要具有如下特点：

1.  基于动态代理来实现，默认如果使用接口的，用 JDK 提供的动态代理实现，如果是方法则使用 CGLIB 实现

2.  Spring AOP 需要依赖 IoC 容器来管理，并且只能作用于 Spring 容器，使用纯 Java 代码实现

3.  在性能上，由于 Spring AOP 是基于**动态代理**来实现的，在容器启动时需要生成代理实例，在方法调用上也会增加栈的深度，使得 Spring AOP 的性能不如 AspectJ 的那么好。

4.  Spring AOP 致力于解决企业级开发中最普遍的 AOP(方法织入)。

AspectJ 是一个易用的功能强大的 AOP 框架，属于`编译时增强`， 可以单独使用，也可以整合到其它框架中，是 AOP 编程的完全解决方案。AspectJ 需要用到单独的编译器 ajc。

AspectJ 属于**静态织入**，通过修改代码来实现，在实际运行之前就完成了织入，所以说它生成的类是没有额外运行时开销的，一般有如下几个织入的时机：

1.  编译期织入（Compile-time weaving）：如类 A 使用 AspectJ 添加了一个属性，类 B 引用了它，这个场景就需要编译期的时候就进行织入，否则没法编译类 B。

2.  编译后织入（Post-compile weaving）：也就是已经生成了 .class 文件，或已经打成 jar 包了，这种情况我们需要增强处理的话，就要用到编译后织入。

3.  类加载后织入（Load-time weaving）：指的是在加载类的时候进行织入，要实现这个时期的织入，有几种常见的方法

整体对比如下：

![Spring AOP和AspectJ对比](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-d1dbe9d9-c55f-4293-8622-d9759064d613.png)

### 40.说说 AOP 和反射的区别？（补充）

>2024 年 7 月 27 日增补。

1. 反射：用于检查和操作类的方法和字段，动态调用方法或访问字段。反射是 Java 提供的内置机制，直接操作类对象。
2. 动态代理：通过生成代理类来拦截方法调用，通常用于 AOP 实现。动态代理使用反射来调用被代理的方法。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的得物面经同学 9 面试题目原题：抛开Spring，讲讲反射和动态代理？那三种代理模式怎么实现的？

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括 Java 基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM 等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

## 事务

Spring 事务的本质其实就是数据库对事务的支持，没有数据库的事务支持，Spring 是无法提供事务功能的。Spring 只提供统一事务管理接口，具体实现都是由各数据库自己实现，数据库事务的提交和回滚是通过数据库自己的事务机制实现。

### 23.Spring 事务的种类？

在 Spring 中，事务管理可以分为两大类：声明式事务管理和编程式事务管理。

![三分恶面渣逆袭：Spring事务分类](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-d3ee77fa-926d-4c39-91f8-a8b1544a9134.png)

#### 介绍一下编程式事务管理？

编程式事务可以使用 TransactionTemplate 和 PlatformTransactionManager 来实现，需要显式执行事务。允许我们在代码中直接控制事务的边界，通过编程方式明确指定事务的开始、提交和回滚。

```java
public class AccountService {
    private TransactionTemplate transactionTemplate;

    public void setTransactionTemplate(TransactionTemplate transactionTemplate) {
        this.transactionTemplate = transactionTemplate;
    }

    public void transfer(final String out, final String in, final Double money) {
        transactionTemplate.execute(new TransactionCallbackWithoutResult() {
            @Override
            protected void doInTransactionWithoutResult(TransactionStatus status) {
                // 转出
                accountDao.outMoney(out, money);
                // 转入
                accountDao.inMoney(in, money);
            }
        });
    }
}
```

在上面的代码中，我们使用了 TransactionTemplate 来实现编程式事务，通过 execute 方法来执行事务，这样就可以在方法内部实现事务的控制。

#### 介绍一下声明式事务管理？

声明式事务是建立在 AOP 之上的。其本质是通过 AOP 功能，对方法前后进行拦截，将事务处理的功能编织到拦截的方法中，也就是在目标方法开始之前启动一个事务，在目标方法执行完之后根据执行情况提交或者回滚事务。

相比较编程式事务，优点是不需要在业务逻辑代码中掺杂事务管理的代码，Spring 推荐通过 @Transactional 注解的方式来实现声明式事务管理，也是日常开发中最常用的。

不足的地方是，声明式事务管理最细粒度只能作用到方法级别，无法像编程式事务那样可以作用到代码块级别。

```java
@Service
public class AccountService {
    @Autowired
    private AccountDao accountDao;

    @Transactional
    public void transfer(String out, String in, Double money) {
        // 转出
        accountDao.outMoney(out, money);
        // 转入
        accountDao.inMoney(in, money);
    }
}
```

#### 说说两者的区别？

- **编程式事务管理**：需要在代码中显式调用事务管理的 API 来控制事务的边界，比较灵活，但是代码侵入性较强，不够优雅。
- **声明式事务管理**：这种方式使用 Spring 的 AOP 来声明事务，将事务管理代码从业务代码中分离出来。优点是代码简洁，易于维护。但缺点是不够灵活，只能在预定义的方法上使用事务。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的京东同学 10 后端实习一面的原题：Spring 事务怎么实现的
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的农业银行面经同学 7 Java 后端面试原题：Spring 如何保证事务
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的比亚迪面经同学 12 Java 技术面试原题：Spring的事务用过吗，在项目里面怎么使用的
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的虾皮面经同学 13 一面面试原题：spring事务
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的阿里云面经同学 22 面经：如何使用spring实现事务

### 24.说说 Spring 的事务隔离级别？

好，事务的隔离级别定义了一个事务可能受其他并发事务影响的程度。SQL 标准定义了四个隔离级别，Spring 都支持，并且提供了对应的机制来配置它们，定义在 TransactionDefinition 接口中。

![二哥的 Java 进阶之路](https://cdn.tobebetterjavaer.com/stutymore/spring-20240326082116.png)

①、ISOLATION_DEFAULT：使用数据库默认的隔离级别（你们爱咋咋滴 😁），MySQL 默认的是可重复读，Oracle 默认的读已提交。

②、ISOLATION_READ_UNCOMMITTED：读未提交，允许事务读取未被其他事务提交的更改。这是隔离级别最低的设置，可能会导致“脏读”问题。

③、ISOLATION_READ_COMMITTED：读已提交，确保事务只能读取已经被其他事务提交的更改。这可以防止“脏读”，但仍然可能发生“不可重复读”和“幻读”问题。

④、ISOLATION_REPEATABLE_READ：可重复读，确保事务可以多次从一个字段中读取相同的值，即在这个事务内，其他事务无法更改这个字段，从而避免了“不可重复读”，但仍可能发生“幻读”问题。

⑤、ISOLATION_SERIALIZABLE：串行化，这是最高的隔离级别，它完全隔离了事务，确保事务序列化执行，以此来避免“脏读”、“不可重复读”和“幻读”问题，但性能影响也最大。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的华为面经同学 8 技术二面面试原题：Spring 中的事务的隔离级别，事务的传播行为？
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小米面经同学 E 第二个部门 Java 后端技术一面面试原题：spring 的隔离机制，默认是哪一种

### 25.Spring 的事务传播机制？

事务的传播机制定义了方法在被另一个事务方法调用时的事务行为，这些行为定义了事务的边界和事务上下文如何在方法调用链中传播。

![三分恶面渣逆袭：6种事务传播机制](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-a6e2a8dc-9771-4d8b-9d91-76ddee98af1a.png)

Spring 的默认传播行为是 PROPAGATION_REQUIRED，即如果当前存在事务，则加入该事务；如果当前没有事务，则创建一个新的事务。

事务传播机制是使用 [ThreadLocal](https://javabetter.cn/thread/ThreadLocal.html) 实现的，所以，如果调用的方法是在新线程中，事务传播会失效。

```java
@Transactional
public void parentMethod() {
    new Thread(() -> childMethod()).start();
}

public void childMethod() {
    // 这里的操作将不会在 parentMethod 的事务范围内执行
}
```

Spring 默认的事务传播行为是 PROPAFATION_REQUIRED，即如果多个 `ServiceX#methodX()` 都工作在事务环境下，且程序中存在这样的调用链 `Service1#method1()->Service2#method2()->Service3#method3()`，那么这 3 个服务类的 3 个方法都通过 Spring 的事务传播机制工作在同一个事务中。

#### protected 和 private 加事务会生效吗

在 Spring 中，**只有通过 Spring 容器的 AOP 代理调用的公开方法（public method）上的`@Transactional`注解才会生效**。

如果在 protected、private 方法上使用`@Transactional`，这些事务注解将不会生效，原因：Spring 默认使用基于 JDK 的动态代理（当接口存在时）或基于 CGLIB 的代理（当只有类时）来实现事务。这两种代理机制都只能代理公开的方法。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的京东同学 10 后端实习一面的原题：事务的传播机制
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小米春招同学 K 一面面试原题：事务传播，protected 和 private 加事务会生效吗,还有那些不生效的情况
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的华为面经同学 8 技术二面面试原题：Spring 中的事务的隔离级别，事务的传播行为？
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的oppo 面经同学 8 后端开发秋招一面面试原题：讲一下Spring事务传播机制
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的阿里云面经同学 22 面经：介绍事务传播模型

### 26.声明式事务实现原理了解吗？

Spring 的声明式事务管理是通过 AOP（面向切面编程）和代理机制实现的。

第一步，**在 Bean 初始化阶段创建代理对象**：

Spring 容器在初始化单例 Bean 的时候，会遍历所有的 BeanPostProcessor 实现类，并执行其 postProcessAfterInitialization 方法。

在执行 postProcessAfterInitialization 方法时会遍历容器中所有的切面，查找与当前 Bean 匹配的切面，这里会获取事务的属性切面，也就是 `@Transactional` 注解及其属性值。

然后根据得到的切面创建一个代理对象，默认使用 JDK 动态代理创建代理，如果目标类是接口，则使用 JDK 动态代理，否则使用 Cglib。

第二步，**在执行目标方法时进行事务增强操作**：

当通过代理对象调用 Bean 方法的时候，会触发对应的 AOP 增强拦截器，声明式事务是一种环绕增强，对应接口为`MethodInterceptor`，事务增强对该接口的实现为`TransactionInterceptor`，类图如下：

![图片来源网易技术专栏](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-97493c7f-c596-4e98-a6a8-dab254d6d1ab.png)

事务拦截器`TransactionInterceptor`在`invoke`方法中，通过调用父类`TransactionAspectSupport`的`invokeWithinTransaction`方法进行事务处理，包括开启事务、事务提交、异常回滚等。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的京东同学 10 后端实习一面的原题：Spring 事务怎么实现的

### 27.声明式事务在哪些情况下会失效？

![三分恶面渣逆袭：声明式事务的几种失效的情况](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-381e4ec9-a235-4cfa-9b4d-518095a7502a.png)

#### 1、@Transactional 应用在非 public 修饰的方法上

如果 Transactional 注解应用在非 public 修饰的方法上，Transactional 将会失效。

是因为在 Spring AOP 代理时，TransactionInterceptor （事务拦截器）在目标方法执行前后进行拦截，DynamicAdvisedInterceptor（CglibAopProxy 的内部类）的 intercept 方法或 JdkDynamicAopProxy 的 invoke 方法会间接调用 AbstractFallbackTransactionAttributeSource 的 **computeTransactionAttribute**方法，获取 Transactional 注解的事务配置信息。

```java
protected TransactionAttribute computeTransactionAttribute(Method method,
    Class<?> targetClass) {
        // Don't allow no-public methods as required.
        if (allowPublicMethodsOnly() && !Modifier.isPublic(method.getModifiers())) {
        return null;
    }
}
```

此方法会检查目标方法的修饰符是否为 public，不是 public 则不会获取 @Transactional 的属性配置信息。

#### 2、@Transactional 注解属性 propagation 设置错误

- TransactionDefinition.PROPAGATION_SUPPORTS：如果当前存在事务，则加入该事务；如果当前没有事务，则以非事务方式执行；错误使用场景：在业务逻辑必须运行在事务环境下以确保数据一致性的情况下使用 SUPPORTS。
- TransactionDefinition.PROPAGATION_NOT_SUPPORTED：总是以非事务方式执行，如果当前存在事务，则挂起该事务。错误使用场景：在需要事务支持的操作中使用 NOT_SUPPORTED。
- TransactionDefinition.PROPAGATION_NEVER：总是以非事务方式执行，如果当前存在事务，则抛出异常。错误使用场景：在应该在事务环境下执行的操作中使用 NEVER。

#### 3、@Transactional 注解属性 rollbackFor 设置错误

rollbackFor 用来指定能够触发事务回滚的异常类型。Spring 默认抛出未检查 unchecked 异常（继承自 RuntimeException 的异常）或者 Error 才回滚事务，其他异常不会触发回滚事务。

![三分恶面渣逆袭：Spring默认支持的异常回滚](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-04053b02-3264-4d7f-b868-560a0333f08d.png)

```java
// 希望自定义的异常可以进行回滚
@Transactional(propagation= Propagation.REQUIRED,rollbackFor= MyException.class)
```

若在目标方法中抛出的异常是 rollbackFor 指定的异常的子类，事务同样会回滚。

#### 4、同一个类中方法调用，导致@Transactional 失效

开发中避免不了会对同一个类里面的方法调用，比如有一个类 Test，它的一个方法 A，A 调用本类的方法 B（不论方法 B 是用 public 还是 private 修饰），但方法 A 没有声明注解事务，而 B 方法有。

则外部调用方法 A 之后，方法 B 的事务是不会起作用的。这也是经常犯错误的一个地方。

那为啥会出现这种情况呢？其实还是由 Spring AOP 代理造成的，因为只有事务方法被当前类以外的代码调用时，才会由 Spring 生成的代理对象来管理。

```java
 //@Transactional
@GetMapping("/test")
private Integer A() throws Exception {
    CityInfoDict cityInfoDict = new CityInfoDict();
    cityInfoDict.setCityName("2");
    /**
     * B 插入字段为 3的数据
     */
    this.insertB();
    /**
     * A 插入字段为 2的数据
     */
    int insert = cityInfoDictMapper.insert(cityInfoDict);
    return insert;
}

@Transactional()
public Integer insertB() throws Exception {
    CityInfoDict cityInfoDict = new CityInfoDict();
    cityInfoDict.setCityName("3");
    cityInfoDict.setParentCityId(3);

    return cityInfoDictMapper.insert(cityInfoDict);
}
```

这种情况是最常见的一种@Transactional 注解失效场景。

```java
@Transactional
private Integer A() throws Exception {
    int insert = 0;
    try {
        CityInfoDict cityInfoDict = new CityInfoDict();
        cityInfoDict.setCityName("2");
        cityInfoDict.setParentCityId(2);
        /**
         * A 插入字段为 2的数据
         */
        insert = cityInfoDictMapper.insert(cityInfoDict);
        /**
         * B 插入字段为 3的数据
        */
        b.insertB();
    } catch (Exception e) {
        e.printStackTrace();
    }
}
```

如果 B 方法内部抛了异常，而 A 方法此时 try catch 了 B 方法的异常，那这个事务就不能正常回滚了，会抛出异常：

```java
org.springframework.transaction.UnexpectedRollbackException: Transaction rolled back because it has been marked as rollback-only
```

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小米春招同学 K 一面面试原题：事务传播，protected 和 private 加事务会生效吗,还有那些不生效的情况

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括 Java 基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM 等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

## MVC

### 28.Spring MVC 的核心组件？

1.  **DispatcherServlet**：前置控制器，是整个流程控制的**核心**，控制其他组件的执行，进行统一调度，降低组件之间的耦合性，相当于总指挥。
2.  **Handler**：处理器，完成具体的业务逻辑，相当于 Servlet 或 Action。
3.  **HandlerMapping**：DispatcherServlet 接收到请求之后，通过 HandlerMapping 将不同的请求映射到不同的 Handler。
4.  **HandlerInterceptor**：处理器拦截器，是一个接口，如果需要完成一些拦截处理，可以实现该接口。
5.  **HandlerExecutionChain**：处理器执行链，包括两部分内容：Handler 和 HandlerInterceptor（系统会有一个默认的 HandlerInterceptor，如果需要额外设置拦截，可以添加拦截器）。
6.  **HandlerAdapter**：处理器适配器，Handler 执行业务方法之前，需要进行一系列的操作，包括表单数据的验证、数据类型的转换、将表单数据封装到 JavaBean 等，这些操作都是由 HandlerApater 来完成，开发者只需将注意力集中业务逻辑的处理上，DispatcherServlet 通过 HandlerAdapter 执行不同的 Handler。
7.  **ModelAndView**：装载了模型数据和视图信息，作为 Handler 的处理结果，返回给 DispatcherServlet。
8.  **ViewResolver**：视图解析器，DispatcheServlet 通过它将逻辑视图解析为物理视图，最终将渲染结果响应给客户端。

### 29.Spring MVC 的工作流程？

首先，客户端发送请求，DispatcherServlet 拦截并通过 HandlerMapping 找到对应的控制器。

DispatcherServlet 使用 HandlerAdapter 调用控制器方法，执行具体的业务逻辑，返回一个 ModelAndView 对象。

然后 DispatcherServlet 通过 ViewResolver 解析视图。

最后，DispatcherServlet 渲染视图并将响应返回给客户端。

![三分恶面渣逆袭：Spring MVC的工作流程](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-e29a122b-db07-48b8-8289-7251032e87a1.png)

![图片来源于网络：SpringMVC工作流程图](https://cdn.tobebetterjavaer.com/stutymore/spring-20240506102456.png)

![_未来可期：SpringMVC工作流程图](https://cdn.tobebetterjavaer.com/stutymore/spring-20240506103022.png)

①、**发起请求**：客户端通过 HTTP 协议向服务器发起请求。

②、**前端控制器**：这个请求会先到前端控制器 DispatcherServlet，它是整个流程的入口点，负责接收请求并将其分发给相应的处理器。

③、**处理器映射**：DispatcherServlet 调用 HandlerMapping 来确定哪个 Controller 应该处理这个请求。通常会根据请求的 URL 来确定。

④、**处理器适配器**：一旦找到目标 Controller，DispatcherServlet 会使用 HandlerAdapter 来调用 Controller 的处理方法。

⑤、**执行处理器**：Controller 处理请求，处理完后返回一个 ModelAndView 对象，其中包含模型数据和逻辑视图名。

⑥、**视图解析器**：DispatcherServlet 接收到 ModelAndView 后，会使用 ViewResolver 来解析视图名称，找到具体的视图页面。

⑦、**渲染视图**：视图使用模型数据渲染页面，生成最终的页面内容。

⑧、**响应结果**：DispatcherServlet 将视图结果返回给客户端。

**Spring MVC** 虽然整体流程复杂，但是实际开发中很简单，大部分的组件不需要我们开发人员创建和管理，真正需要处理的只有 **Controller** 、**View** 、**Model**。

在前后端分离的情况下，步骤 ⑥、⑦、⑧ 会略有不同，后端通常只需要处理数据，并将 JSON 格式的数据返回给前端就可以了，而不是返回完整的视图页面。

#### 这个 Handler 是什么东西啊？为什么还需要 HandlerAdapter

Handler 一般就是指 Controller，Controller 是 Spring MVC 的核心组件，负责处理请求，返回响应。

Spring MVC 允许使用多种类型的处理器。不仅仅是标准的`@Controller`注解的类，还可以是实现了特定接口的其他类（如 HttpRequestHandler 或 SimpleControllerHandlerAdapter 等）。这些处理器可能有不同的方法签名和交互方式。

HandlerAdapter 的主要职责就是调用 Handler 的方法来处理请求，并且适配不同类型的处理器。HandlerAdapter 确保 DispatcherServlet 可以以统一的方式调用不同类型的处理器，无需关心具体的执行细节。

> 1.  [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯 Java 后端实习一面原题：说说前端发起请求到 SpringMVC 的整个处理流程。
> 2.  [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的国企面试原题：说说 SpringMVC 的流程吧
> 3.  [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小公司面经同学 5 Java 后端面试原题：springMVC 工作流程 我大概就是按面渣逆袭里答的，答到一半打断我：然后会有个 Handler，这个 Handler 是什么东西啊。前面 Handler 不是已经知道 controller 了吗，我直接执行不就行了，为什么还要 Adapter 呢。
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的京东面经同学 8 面试原题：SpringMVC框架 
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动同学 17 后端技术面试原题：springmvc执行流程

### 30.SpringMVC Restful 风格的接口的流程是什么样的呢？

PS:这是一道全新的八股，毕竟 ModelAndView 这种方式应该没人用了吧？现在都是前后端分离接口，八股也该更新换代了。

我们都知道 Restful 接口，响应格式是 json，这就用到了一个常用注解：**@ResponseBody**

```java
    @GetMapping("/user")
    @ResponseBody
    public User user(){
        return new User(1,"张三");
    }
```

加入了这个注解后，整体的流程上和使用 ModelAndView 大体上相同，但是细节上有一些不同：

![Spring MVC Restful请求响应示意图](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-2da963a0-5da9-4b3a-aafd-fd8dbc7e1807.png)

1. 客户端向服务端发送一次请求，这个请求会先到前端控制器 DispatcherServlet

2. DispatcherServlet 接收到请求后会调用 HandlerMapping 处理器映射器。由此得知，该请求该由哪个 Controller 来处理

3. DispatcherServlet 调用 HandlerAdapter 处理器适配器，告诉处理器适配器应该要去执行哪个 Controller

4. Controller 被封装成了 ServletInvocableHandlerMethod，HandlerAdapter 处理器适配器去执行 invokeAndHandle 方法，完成对 Controller 的请求处理

5. HandlerAdapter 执行完对 Controller 的请求，会调用 HandlerMethodReturnValueHandler 去处理返回值，主要的过程：

   5.1. 调用 RequestResponseBodyMethodProcessor，创建 ServletServerHttpResponse（Spring 对原生 ServerHttpResponse 的封装）实例

   5.2.使用 HttpMessageConverter 的 write 方法，将返回值写入 ServletServerHttpResponse 的 OutputStream 输出流中

   5.3.在写入的过程中，会使用 JsonGenerator（默认使用 Jackson 框架）对返回值进行 Json 序列化

6. 执行完请求后，返回的 ModealAndView 为 null，ServletServerHttpResponse 里也已经写入了响应，所以不用关心 View 的处理

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括 Java 基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM 等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

## Spring Boot

### 31.介绍一下 SpringBoot，有哪些优点？

Spring Boot 提供了一套默认配置，它通过约定大于配置的理念，来帮助我们快速搭建 Spring 项目骨架。

![SpringBoot图标](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-d9164ee6-5c86-4313-8fd9-efb9acfa5f0b.png)

以前的 Spring 开发需要配置大量的 xml 文件，并且需要引入大量的第三方 jar 包，还需要手动放到 classpath 下。现在只需要引入一个 Starter，或者一个注解，就可以轻松搞定。

Spring Boot 的优点非常多，比如说：

1. Spring Boot 内嵌了 Tomcat、Jetty、Undertow 等容器，直接运行 jar 包就可以启动项目。
2. Spring Boot 内置了 Starter 和自动装配，避免繁琐的手动配置。例如，如果项目中添加了 spring-boot-starter-web，Spring Boot 会自动配置 Tomcat 和 Spring MVC。
3. Spring Boot 内置了 Actuator 和 DevTools，便于调试和监控。

#### Spring Boot常用注解有哪些？

1. **@SpringBootApplication**：Spring Boot 应用的入口，用在启动类上。
2. 还有一些 Spring 框架本身的注解，比如 **@Component**、**@RestController**、**@Service**、**@ConfigurationProperties**、**@Transactional** 等。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的华为 OD 面经中出现过该题：讲讲 Spring Boot 的特性。
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的百度面经同学 1 文心一言 25 实习 Java 后端面试原题：SpringBoot基本原理
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的国企零碎面经同学 9 面试原题：Springboot基于Spring的配置有哪几种
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的阿里云面经同学 22 面经：springboot常用注解


### 32.SpringBoot 自动配置原理了解吗？

在 Spring 中，自动装配是指容器利用反射技术，根据 Bean 的类型、名称等自动注入所需的依赖。

![三分恶面渣逆袭：SpringBoot自动配置原理](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-df77ee15-2ff0-4ec7-8e65-e4ebb8ba88f1.png)

在 Spring Boot 中，开启自动装配的注解是`@EnableAutoConfiguration`。

![二哥的 Java 进阶之路：@EnableAutoConfiguration 源码](https://cdn.tobebetterjavaer.com/stutymore/spring-20240316121711.png)

Spring Boot 为了进一步简化，直接通过 `@SpringBootApplication` 注解一步搞定，该注解包含了 `@EnableAutoConfiguration` 注解。

main 类启动的时候，Spring Boot 会通过底层的`AutoConfigurationImportSelector` 类加载自动装配类。

```java
@AutoConfigurationPackage //将main同级的包下的所有组件注册到容器中
@Import({AutoConfigurationImportSelector.class}) //加载自动装配类 xxxAutoconfiguration
public @interface EnableAutoConfiguration {
    String ENABLED_OVERRIDE_PROPERTY = "spring.boot.enableautoconfiguration";

    Class<?>[] exclude() default {};

    String[] excludeName() default {};
}
```

`AutoConfigurationImportSelector`实现了`ImportSelector`接口，该接口的作用是收集需要导入的配置类，配合 `@Import()` 将相应的类导入到 Spring 容器中。

![二哥的 Java 进阶之路：AutoConfigurationImportSelector源码](https://cdn.tobebetterjavaer.com/stutymore/spring-20240316122134.png)

获取注入类的方法是 `selectImports()`，它实际调用的是`getAutoConfigurationEntry()`，这个方法是获取自动装配类的关键。

```java
protected AutoConfigurationEntry getAutoConfigurationEntry(AnnotationMetadata annotationMetadata) {
    // 检查自动配置是否启用。如果@ConditionalOnClass等条件注解使得自动配置不适用于当前环境，则返回一个空的配置条目。
    if (!isEnabled(annotationMetadata)) {
        return EMPTY_ENTRY;
    }

    // 获取启动类上的@EnableAutoConfiguration注解的属性，这可能包括对特定自动配置类的排除。
    AnnotationAttributes attributes = getAttributes(annotationMetadata);

    // 从spring.factories中获取所有候选的自动配置类。这是通过加载META-INF/spring.factories文件中对应的条目来实现的。
    List<String> configurations = getCandidateConfigurations(annotationMetadata, attributes);

    // 移除配置列表中的重复项，确保每个自动配置类只被考虑一次。
    configurations = removeDuplicates(configurations);

    // 根据注解属性解析出需要排除的自动配置类。
    Set<String> exclusions = getExclusions(annotationMetadata, attributes);

    // 检查排除的类是否存在于候选配置中，如果存在，则抛出异常。
    checkExcludedClasses(configurations, exclusions);

    // 从候选配置中移除排除的类。
    configurations.removeAll(exclusions);

    // 应用过滤器进一步筛选自动配置类。过滤器可能基于条件注解如@ConditionalOnBean等来排除特定的配置类。
    configurations = getConfigurationClassFilter().filter(configurations);

    // 触发自动配置导入事件，允许监听器对自动配置过程进行干预。
    fireAutoConfigurationImportEvents(configurations, exclusions);

    // 创建并返回一个包含最终确定的自动配置类和排除的配置类的AutoConfigurationEntry对象。
    return new AutoConfigurationEntry(configurations, exclusions);
}
```

总结：Spring Boot 的自动装配原理依赖于 Spring 框架的依赖注入和条件注册，通过这种方式，Spring Boot 能够智能地配置 bean，并且只有当这些 bean 实际需要时才会被创建和配置。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的滴滴同学 2 技术二面的原题：SpringBoot 启动时为什么能够自动装配
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 22 暑期实习一面面试原题：Spring Boot 如何做到启动的时候注入一些 bean
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的比亚迪面经同学 3 Java 技术一面面试原题：说一下 Spring Boot 的自动装配原理
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的农业银行同学 1 面试原题：spring boot 的自动装配
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的百度面经同学 1 文心一言 25 实习 Java 后端面试原题：SpringBoot如何实现自动装配
> 6. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的 OPPO 面经同学 1 面试原题：自动配置怎么实现的？

### 33.如何自定义一个 SpringBoot Srarter?

创建一个自定义的 Spring Boot Starter，需要这几步：

第一步，创建一个新的 Maven 项目，例如命名为 my-spring-boot-starter。在 pom.xml 文件中添加必要的依赖和配置：

```xml
<properties>
    <spring.boot.version>2.3.1.RELEASE</spring.boot.version>
</properties>

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-autoconfigure</artifactId>
        <version>${spring.boot.version}</version>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter</artifactId>
        <version>${spring.boot.version}</version>
    </dependency>
</dependencies>
```

第二步，在 `src/main/java` 下创建一个自动配置类，比如 MyServiceAutoConfiguration.java：（通常是 autoconfigure 包下）。

```java
@Configuration
@EnableConfigurationProperties(MyStarterProperties.class)
public class MyServiceAutoConfiguration {

    @Bean
    @ConditionalOnMissingBean
    public MyService myService(MyStarterProperties properties) {
        return new MyService(properties.getMessage());
    }
}
```

第三步，创建一个配置属性类 MyStarterProperties.java：

```java
@ConfigurationProperties(prefix = "mystarter")
public class MyStarterProperties {
    private String message = "二哥的 Java 进阶之路不错啊!";

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
```

第四步，创建一个简单的服务类 MyService.java：

```java
public class MyService {
    private final String message;

    public MyService(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
```

第五步，配置 spring.factories，在 `src/main/resources/META-INF` 目录下创建 spring.factories 文件，并添加：

```
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
com.itwanger.mystarter.autoconfigure.MyServiceAutoConfiguration
```

第六步，使用 Maven 打包这个项目：

```shell
mvn clean install
```

第七步，在其他的 Spring Boot 项目中，通过 Maven 来添加这个自定义的 Starter 依赖，并通过 application.properties 配置欢迎消息：

```xml
mystarter.message=javabetter.cn
```

然后就可以在 Spring Boot 项目中注入 MyStarterProperties 来使用它。

![](https://cdn.tobebetterjavaer.com/stutymore/spring-20240409114642.png)

启动项目，然后在浏览器中输入 `localhost:8081/hello`，就可以看到欢迎消息了。

![二哥的 Java 进阶之路](https://cdn.tobebetterjavaer.com/stutymore/spring-20240409114610.png)

#### Spring Boot Starter 的原理了解吗？

Spring Boot Starter 主要通过起步依赖和自动配置机制来简化项目的构建和配置过程。

起步依赖是 Spring Boot 提供的一组预定义依赖项，它们将一组相关的库和模块打包在一起。比如 `spring-boot-starter-web` 就包含了 Spring MVC、Tomcat 和 Jackson 等依赖。

自动配置机制是 Spring Boot 的核心特性，通过自动扫描类路径下的类、资源文件和配置文件，自动创建和配置应用程序所需的 Bean 和组件。

比如有了 `spring-boot-starter-web`，我们开发者就不需要再手动配置 Tomcat、Spring MVC 等，Spring Boot 会自动帮我们完成这些工作。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 1 Java 后端技术一面面试原题：你封装过 springboot starter 吗？
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯云智面经同学 20 二面面试原题：Spring Boot Starter 的原理了解吗？
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的快手同学 4 一面原题：为什么使用SpringBoot？SpringBoot自动装配的原理及流程？@Import的作用？如果想让SpringBoot对自定义的jar包进行自动配置的话，需要怎么做？

### 34.Spring Boot 启动原理了解吗？

Spring Boot 的启动由 SpringApplication 类负责：

- 第一步，创建 SpringApplication 实例，负责应用的启动和初始化；
- 第二步，从 application.yml 中加载配置文件和环境变量；
- 第三步，创建上下文环境 ApplicationContext，并加载 Bean，完成依赖注入；
- 第四步，启动内嵌的 Web 容器。
- 第五步，发布启动完成事件 ApplicationReadyEvent，并调用 ApplicationRunner 的 run 方法完成启动后的逻辑。

关键的代码逻辑如下：

```java
public ConfigurableApplicationContext run(String... args) {
    // 1. 创建启动时的监听器并触发启动事件
    SpringApplicationRunListeners listeners = getRunListeners(args);
    listeners.starting();

    // 2. 准备运行环境
    ConfigurableEnvironment environment = prepareEnvironment(listeners);
    configureIgnoreBeanInfo(environment);

    // 3. 创建上下文
    ConfigurableApplicationContext context = createApplicationContext();

    try {
        // 4. 准备上下文
        prepareContext(context, environment, listeners, args);

        // 5. 刷新上下文，完成 Bean 初始化和装配
        refreshContext(context);

        // 6. 调用运行器
        afterRefresh(context, args);

        // 7. 触发启动完成事件
        listeners.started(context);
    } catch (Exception ex) {
        handleRunFailure(context, ex, listeners);
    }

    return context;
}
```

![SpringBoot 启动大致流程-图片来源网络](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-68744556-a1ba-4e1f-a092-1582875f0da6.png)

以[技术派实战项目](https://javabetter.cn/zhishixingqiu/paicoding.html)为例。在启动类 QuickForumApplication 中，main 方法会调用 `SpringApplication.run()` 启动项目。

![技术派实战项目源码：启动类](https://cdn.tobebetterjavaer.com/stutymore/spring-20240422090338.png)

该方法负责 Spring 应用的上下文环境（ApplicationContext）准备，包括：

- 扫描配置文件，添加依赖项
- 初始化和加载 Bean 定义
- 启动内嵌的 Web 容器等
- 发布启动完成事件

#### 了解@SpringBootApplication 注解吗？

`@SpringBootApplication`是 Spring Boot 的核心注解，经常用于主类上，作为项目启动入口的标识。它是一个组合注解：

- `@SpringBootConfiguration`：继承自 `@Configuration`，标注该类是一个配置类，相当于一个 Spring 配置文件。
- `@EnableAutoConfiguration`：告诉 Spring Boot 根据 pom.xml 中添加的依赖自动配置项目。例如，如果 spring-boot-starter-web 依赖被添加到项目中，Spring Boot 会自动配置 Tomcat 和 Spring MVC。
- `@ComponentScan`：扫描当前包及其子包下被`@Component`、`@Service`、`@Controller`、`@Repository` 注解标记的类，并注册为 Spring Bean。

```java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

#### 为什么 Spring Boot 在启动的时候能够找到 main 方法上的@SpringBootApplication 注解？

Spring Boot 在启动时能够找到主类上的`@SpringBootApplication`注解，是因为它利用了 Java 的反射机制和类加载机制，结合 Spring 框架内部的一系列处理流程。

当运行一个 Spring Boot 程序时，通常会调用主类中的`main`方法，这个方法会执行`SpringApplication.run()`，比如：

```java
@SpringBootApplication
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```

`SpringApplication.run(Class<?> primarySource, String... args)`方法接收两个参数：第一个是主应用类（即包含`main`方法的类），第二个是命令行参数。`primarySource`参数提供了一个起点，Spring Boot 通过它来加载应用上下文。

Spring Boot 利用 Java 反射机制来读取传递给`run`方法的类（`MyApplication.class`）。它会检查这个类上的注解，包括`@SpringBootApplication`。

#### Spring Boot 默认的包扫描路径是什么？

Spring Boot 的默认包扫描路径是以启动类 `@SpringBootApplication` 注解所在的包为根目录的，即默认情况下，Spring Boot 会扫描启动类所在包及其子包下的所有组件。

比如说在[技术派实战项目](https://javabetter.cn/zhishixingqiu/paicoding.html)中，启动类`QuickForumApplication`所在的包是`com.github.paicoding.forum.web`，那么 Spring Boot 默认会扫描`com.github.paicoding.forum.web`包及其子包下的所有组件。

![沉默王二：技术派项目截图](https://cdn.tobebetterjavaer.com/stutymore/spring-20240327105552.png)

`@SpringBootApplication` 是一个组合注解，它里面的`@ComponentScan`注解可以指定要扫描的包路径，默认扫描启动类所在包及其子包下的所有组件。

```java
@ComponentScan(excludeFilters = { @Filter(type = FilterType.CUSTOM, classes = TypeExcludeFilter.class),
		@Filter(type = FilterType.CUSTOM, classes = AutoConfigurationExcludeFilter.class) })
public @interface SpringBootApplication {
}
```

比如说带有 `@Component`、`@Service`、`@Controller`、`@Repository` 等注解的类都会被 Spring Boot 扫描到，并注册到 Spring 容器中。

如果需要自定义包扫描路径，可以在`@SpringBootApplication`注解上添加`@ComponentScan`注解，指定要扫描的包路径。

```java
@SpringBootApplication
@ComponentScan(basePackages = {"com.github.paicoding.forum"})
public class QuickForumApplication {
    public static void main(String[] args) {
        SpringApplication.run(QuickForumApplication.class, args);
    }
}
```

这种方式会覆盖默认的包扫描路径，只扫描`com.github.paicoding.forum`包及其子包下的所有组件。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的滴滴同学 2 技术二面的原题：为什么 Spring Boot 启动时能找到 Main 类上面的注解
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 22 暑期实习一面面试原题：Spring Boot 默认的包扫描路径？
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的微众银行同学 1 Java 后端一面的原题：@SpringBootApplication 注解了解吗？
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的国企零碎面经同学 9 面试原题：Springboot的工作原理？
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的京东面经同学 5 Java 后端技术一面面试原题：SpringBoot启动流程（忘了）
> 6. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的哔哩哔哩同学 1 二面面试原题：springBoot启动机制，启动之后做了哪些步骤

### 36.SpringBoot 和 SpringMVC 的区别？（补充）

> 2024 年 04 月 04 日增补

Spring MVC 是基于 Spring 框架的一个模块，提供了一种 Model-View-Controller（模型-视图-控制器）的开发模式。

Spring Boot 旨在简化 Spring 应用的配置和部署过程，提供了大量的自动配置选项，以及运行时环境的内嵌 Web 服务器，这样就可以更快速地开发一个 SpringMVC 的 Web 项目。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的滴滴同学 2 技术二面的原题：SpringBoot 和 SpringMVC 的区别
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的京东面经同学 5 Java 后端技术一面面试原题：SpringBoot与SpringMVC区别（不会）

### 38.Spring Boot 和 Spring 有什么区别？（补充）

> 2024 年 07 月 09 日新增

Spring Boot 是 Spring Framework 的一个扩展，提供了一套快速配置和开发的机制，可以帮助我们快速搭建 Spring 项目的骨架，提高生产效率。

| 特性   | Spring Framework | Spring Boot  |
|--------- |------------ |------------ |
| **目的**  | 提供企业级的开发工具和库 | 简化 Spring 应用的开发、配置和部署    |
| **配置方式** | 主要通过 XML 和注解等手动配置  | 提供开箱即用的自动配置   |
| **启动和运行**  | 需要打成 war 包到 Tomcat 等容器下运行 | 已嵌入 Tomcat 等容器，打包成 JAR 文件直接运行 |
| **依赖管理**   | 手动添加和管理依赖  | 使用 `spring-boot-starter` 简化依赖管理  |

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小米同学 F 面试原题：Spring Boot 和 Spring 的区别
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的 OPPO 面经同学 1 面试原题：说一下Spring和Springboot之间有什么差异？


## Spring Cloud

### 35.对 SpringCloud 了解多少？

Spring Cloud 是一个基于 Spring Boot，提供构建分布式系统和微服务架构的工具集。用于解决分布式系统中的一些常见问题，如配置管理、服务发现、负载均衡等等。

![三分恶面渣逆袭：Spring Cloud Netfilx核心组件](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-92ab53d5-f303-4fc5-bd26-e62cefe374b3.png)

#### 什么是微服务？

1.  2014 年 **Martin Fowler** 提出的一种新的架构形式。微服务架构是一种**架构模式**，提倡将单一应用程序划分成一组小的服务，服务之间相互协调，互相配合，为用户提供最终价值。每个服务运行在其独立的进程中，服务与服务之间采用轻量级的通信机制(如 HTTP 或 Dubbo)互相协作，每个服务都围绕着具体的业务进行构建，并且能够被独立的部署到生产环境中，另外，应尽量避免统一的，集中式的服务管理机制，对具体的一个服务而言，应根据业务上下文，选择合适的语言、工具(如 Maven)对其进行构建。
2.  微服务化的核心就是将传统的一站式应用，根据业务拆分成一个一个的服务，彻底地去耦合，每一个微服务提供单个业务功能的服务，一个服务做一件事情，从技术角度看就是一种小而独立的处理过程，类似进程的概念，能够自行单独启动或销毁，拥有自己独立的数据库。

#### 微服务架构主要要解决哪些问题？

1.  服务很多，客户端怎么访问，如何提供对外网关?
2.  这么多服务，服务之间如何通信? HTTP 还是 RPC?
3.  这么多服务，如何治理? 服务的注册和发现。
4.  服务挂了怎么办？熔断机制。

#### 有哪些主流微服务框架？

1.  Spring Cloud Netflix
2.  Spring Cloud Alibaba
3.  SpringBoot + Dubbo + ZooKeeper

#### SpringCloud 有哪些核心组件？

![SpringCloud](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-2b988a72-0739-4fed-b271-eaf12589444f.png)

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的比亚迪同学 1 面试原题：SpringCloud 了解多少？

## 补充

### 37.SpringTask 了解吗？

SpringTask 是 Spring 框架提供的一个轻量级的任务调度框架，它允许我们开发者通过简单的注解来配置和管理定时任务。

①、`@Scheduled`：最常用的注解，用于标记方法为计划任务的执行点。[技术派实战项目](https://javabetter.cn/zhishixingqiu/paicoding.html)中，就使用该注解来定时刷新 sitemap.xml：

```java
@Scheduled(cron = "0 15 5 * * ?")
public void autoRefreshCache() {
    log.info("开始刷新sitemap.xml的url地址，避免出现数据不一致问题!");
    refreshSitemap();
    log.info("刷新完成！");
}
```

`@Scheduled` 注解支持多种调度选项，如 fixedRate、fixedDelay 和 cron 表达式。

②、`@EnableScheduling`：用于开启定时任务的支持。

![技术派的启动类就有该注解的影子](https://cdn.tobebetterjavaer.com/stutymore/spring-20240422094511.png)

#### 用SpringTask资源占用太高，有什么其他的方式解决？（补充）

>2024年05月27日新增

**第一，使用消息队列**，如 RabbitMQ、Kafka、RocketMQ 等，将任务放到消息队列中，然后由消费者异步处理这些任务。

①、在订单创建时，将订单超时检查任务放入消息队列，并设置延迟时间（即订单超时时间）。

```java
@Service
public class OrderService {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void createOrder(Order order) {
        // 创建订单逻辑
        // ...
        
        // 发送延迟消息
        rabbitTemplate.convertAndSend("orderExchange", "orderTimeoutQueue", order, message -> {
            message.getMessageProperties().setExpiration("600000"); // 设置延迟时间（10分钟）
            return message;
        });
    }
}
```

②、使用消费者从队列中消费消息，当消费到超时任务时，执行订单超时处理逻辑。

```java
@Service
public class OrderTimeoutConsumer {

    @RabbitListener(queues = "orderTimeoutQueue")
    public void handleOrderTimeout(Order order) {
        // 处理订单超时逻辑
        // ...
    }
}
```

**第二，使用数据库调度器（如 Quartz）**。

①、创建一个 Quartz 任务类，处理订单超时逻辑。

```java
public class OrderTimeoutJob implements Job {
    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        // 获取订单信息
        Order order = (Order) context.getJobDetail().getJobDataMap().get("order");

        // 处理订单超时逻辑
        // ...
    }
}
```

②、在订单创建时，调度一个 Quartz 任务，设置任务的触发时间为订单超时时间。

```java
@Service
public class OrderService {
    @Autowired
    private Scheduler scheduler;

    public void createOrder(Order order) {
        // 创建订单逻辑
        // ...

        // 调度 Quartz 任务
        JobDetail jobDetail = JobBuilder.newJob(OrderTimeoutJob.class)
                .usingJobData("order", order)
                .build();

        Trigger trigger = TriggerBuilder.newTrigger()
                .startAt(new Date(System.currentTimeMillis() + 600000)) // 设置触发时间（10分钟后）
                .build();

        try {
            scheduler.scheduleJob(jobDetail, trigger);
        } catch (SchedulerException e) {
            e.printStackTrace();
        }
    }
}
```

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的微众银行同学 1 Java 后端一面的原题：SpringTask 了解吗？
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的阿里面经同学 1 闲鱼后端一面的原题：订单超时，用springtask资源占用太高，有什么其他的方式解决?

### 41.Spring Cache 了解吗？

Spring Cache 是 Spring 框架提供的一个缓存抽象，它通过统一的接口来支持多种缓存实现（如 Redis、Caffeine 等）。

它通过注解（如 `@Cacheable`、`@CachePut`、`@CacheEvict`）来实现缓存管理，极大简化了代码实现。

- @Cacheable：缓存方法的返回值。
- @CachePut：用于更新缓存，每次调用方法都会将结果重新写入缓存。
- @CacheEvict：用于删除缓存。

使用示例：

![二哥的Java 进阶之路：Spring Cache](https://cdn.tobebetterjavaer.com/stutymore/spring-20241031111306.png)

#### Spring Cache 和 Redis 有什么区别？

1. **Spring Cache** 是 Spring 框架提供的一个缓存抽象，它通过注解来实现缓存管理，支持多种缓存实现（如 Redis、Caffeine 等）。
2. **Redis** 是一个分布式的缓存中间件，支持多种数据类型（如 String、Hash、List、Set、ZSet），还支持持久化、集群、主从复制等。

Spring Cache 适合用于单机、轻量级和短时缓存场景，能够通过注解轻松控制缓存管理。

Redis 是一种分布式缓存解决方案，支持多种数据结构和高并发访问，适合分布式系统和高并发场景，可以提供数据持久化和多种淘汰策略。

在实际开发中，Spring Cache 和 Redis 可以结合使用，Spring Cache 提供管理缓存的注解，而 Redis 则作为分布式缓存的实现，提供共享缓存支持。

#### 有了 Redis 为什么还需要 Spring Cache？

虽然 Redis 非常强大，但 Spring Cache 提供了一层缓存抽象，简化了缓存的管理。我们可以直接在方法上通过注解来实现缓存逻辑，减少了手动操作 Redis 的代码量。

Spring Cache 还能灵活切换底层缓存实现。此外，Spring Cache 支持事务性缓存和条件缓存，便于在复杂场景中确保数据一致性。

#### 说说Spring Cache 的底层原理？

Spring Cache 是基于 AOP 和缓存抽象层实现的。它通过 AOP 拦截被 @Cacheable、@CachePut 和 @CacheEvict 注解的方法，在方法调用前后自动执行缓存逻辑。

![铿然架构：Spring Cache 架构](https://cdn.tobebetterjavaer.com/stutymore/spring-20241031113743.png)

其提供的 CacheManager 和 Cache 等接口，不依赖具体的缓存实现，因此可以灵活地集成 Redis、Caffeine 等多种缓存。

- ConcurrentMapCacheManager：基于 Java ConcurrentMap 的本地缓存实现。
- RedisCacheManager：基于 Redis 的分布式缓存实现。
- CaffeineCacheManager：基于 Caffeine 的缓存实现。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团同学 9 一面面试原题：介绍一下springcache 和redis？Spring cache和redis之间的各应用在什么场景？有了redis为什么还要用springcahe？springcache 底层原理，基于什么实现的？

---

图文详解 41 道 Spring 面试高频题，这次吊打面试官，我觉得稳了（手动 dog）。整理：沉默王二，戳[转载链接](https://mp.weixin.qq.com/s/EQge6DmgIqYITM3mAxkatg)，作者：三分恶，戳[原文链接](https://mp.weixin.qq.com/s/Y17S85ntHm_MLTZMJdtjQQ)。

_没有什么使我停留——除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟_。

**系列内容**：

- [面渣逆袭 Java SE 篇 👍](https://javabetter.cn/sidebar/sanfene/javase.html)
- [面渣逆袭 Java 集合框架篇 👍](https://javabetter.cn/sidebar/sanfene/javathread.html)
- [面渣逆袭 Java 并发编程篇 👍](https://javabetter.cn/sidebar/sanfene/collection.html)
- [面渣逆袭 JVM 篇 👍](https://javabetter.cn/sidebar/sanfene/jvm.html)
- [面渣逆袭 Spring 篇 👍](https://javabetter.cn/sidebar/sanfene/spring.html)
- [面渣逆袭 Redis 篇 👍](https://javabetter.cn/sidebar/sanfene/redis.html)
- [面渣逆袭 MyBatis 篇 👍](https://javabetter.cn/sidebar/sanfene/mybatis.html)
- [面渣逆袭 MySQL 篇 👍](https://javabetter.cn/sidebar/sanfene/mysql.html)
- [面渣逆袭操作系统篇 👍](https://javabetter.cn/sidebar/sanfene/os.html)
- [面渣逆袭计算机网络篇 👍](https://javabetter.cn/sidebar/sanfene/network.html)
- [面渣逆袭 RocketMQ 篇 👍](https://javabetter.cn/sidebar/sanfene/rocketmq.html)
- [面渣逆袭分布式篇 👍](https://javabetter.cn/sidebar/sanfene/fenbushi.html)
- [面渣逆袭微服务篇 👍](https://javabetter.cn/sidebar/sanfene/weifuwu.html)
- [面渣逆袭设计模式篇 👍](https://javabetter.cn/sidebar/sanfene/shejimoshi.html)
- [面渣逆袭 Linux 篇 👍](https://javabetter.cn/sidebar/sanfene/linux.html)

---

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括 Java 基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM 等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
