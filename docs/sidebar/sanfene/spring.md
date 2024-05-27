---
title: Spring面试题，37道Spring八股文（1.3万字63张手绘图），面渣逆袭必看👍
shortTitle: 面渣逆袭-Spring
description: 下载次数超 1 万次，1.3 万字 63 张手绘图，详解 37 道 Spring 面试高频题（让天下没有难背的八股），面渣背会这些 Spring 八股文，这次吊打面试官，我觉得稳了（手动 dog）。
author: 三分恶
category:
  - 面渣逆袭
tag:
  - 面渣逆袭
head:
  - - meta
    - name: keywords
      content: Spring面试题,Spring,面试题,八股文,java,spring全家桶
---

1.3 万字 63 张手绘图，详解 37 道 Spring 面试高频题（让天下没有难背的八股），面渣背会这些 Spring 八股文，这次吊打面试官，我觉得稳了（手动 dog）。整理：沉默王二，戳[转载链接](https://mp.weixin.qq.com/s/EQge6DmgIqYITM3mAxkatg)，作者：三分恶，戳[原文链接](https://mp.weixin.qq.com/s/Y17S85ntHm_MLTZMJdtjQQ)。

## 基础

### 1.Spring 是什么？特性？有哪些模块？

![Spring Logo](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-165c27b4-2ea0-409a-8fa5-389c105db0fa.png)

一句话概括：**Spring 是一个轻量级、非入侵式的控制反转 (IoC) 和面向切面 (AOP) 的框架。**

2003 年，一个音乐家 Rod Johnson 决定发展一个轻量级的 Java 开发框架，`Spring`作为 Java 战场的龙骑兵渐渐崛起，并淘汰了`EJB`这个传统的重装骑兵。

![Spring重要版本](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-5d9efb93-03a5-400c-8429-3be7c5eeddfb.png)

到了现在，企业级开发的标配基本就是 **Spring5** + **Spring Boot 2** + **JDK 8**

> Spring 有哪些特性呢？

Spring 有很多优点：

![Spring特性](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-a0f0ef9d-3289-41ea-94c2-34b7e37ef854.png)

1.  **IoC** 和 **DI** 的支持

Spring 的核心就是一个大的工厂容器，可以维护所有对象的创建和依赖关系，Spring 工厂用于生成 Bean，并且管理 Bean 的生命周期，实现**高内聚低耦合**的设计理念。

2.  AOP 编程的支持

Spring 提供了**面向切面编程**，可以方便的实现对程序进行权限拦截、运行监控等切面功能。

3.  声明式事务的支持

支持通过配置就来完成对事务的管理，而不需要通过硬编码的方式，以前重复的一些事务提交、回滚的 JDBC 代码，都可以不用自己写了。

4.  快捷测试的支持

Spring 对 Junit 提供支持，可以通过**注解**快捷地测试 Spring 程序。

5.  快速集成功能

方便集成各种优秀框架，Spring 不排斥各种优秀的开源框架，其内部提供了对各种优秀框架（如：Struts、Hibernate、MyBatis、Quartz 等）的直接支持。

6.  复杂 API 模板封装

Spring 对 JavaEE 开发中非常难用的一些 API（JDBC、JavaMail、远程调用等）都提供了模板化的封装，这些封装 API 的提供使得应用难度大大降低。

### 2.Spring 有哪些模块呢？

Spring 框架是分模块存在，除了最核心的`Spring Core Container`是必要模块之外，其他模块都是`可选`，大约有 20 多个模块。

![Spring模块划分](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-bb7c13ea-3174-4b32-84b8-821849ddc377.png)

最主要的七大模块：

1.  **Spring Core**：Spring 核心，它是框架最基础的部分，提供 IoC 和依赖注入 DI 特性。
2.  **Spring Context**：Spring 上下文容器，它是 BeanFactory 功能加强的一个子接口。
3.  **Spring Web**：它提供 Web 应用开发的支持。
4.  **Spring MVC**：它针对 Web 应用中 MVC 思想的实现。
5.  **Spring DAO**：提供对 JDBC 抽象层，简化了 JDBC 编码，同时，编码更具有健壮性。
6.  **Spring ORM**：它支持用于流行的 ORM 框架的整合，比如：Spring + Hibernate、Spring + iBatis、Spring + JDO 的整合等。
7.  **Spring AOP**：即面向切面编程，它提供了与 AOP 联盟兼容的编程实现。

### 3.Spring 有哪些常用注解呢？

Spring 提供了大量的注解来简化 Java 应用的开发和配置，主要用于 Web 开发、往容器注入 Bean、AOP、事务控制等。

![三分恶面渣逆袭：Spring常用注解](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-8d0a1518-a425-4887-9735-45321095d927.png)

#### Web 开发方面有哪些注解呢？

①、`@Controller`：用于标注控制层组件。

②、`@RestController`：是`@Controller` 和 `@ResponseBody` 的结合体，返回 JSON 数据时使用。

③、`@RequestMapping`：用于映射请求 URL 到具体的方法上，还可以细分为：

- `@GetMapping`：只能用于处理 GET 请求
- `@PostMapping`：只能用于处理 POST 请求
- `@DeleteMapping`：只能用于处理 DELETE 请求

④、`@ResponseBody`：直接将返回的数据放入 HTTP 响应正文中，一般用于返回 JSON 数据。

⑤、`@RequestBody`：表示一个方法参数应该绑定到 Web 请求体。

⑥、`@PathVariable`：用于接收路径参数，比如 `@RequestMapping(“/hello/{name}”)`，这里的 name 就是路径参数。

⑦、`@RequestParam`：用于接收请求参数。比如 `@RequestParam(name = "key") String key`，这里的 key 就是请求参数。

#### 容器类注解有哪些呢？

- `@Component`：标识一个类为 Spring 组件，使其能够被 Spring 容器自动扫描和管理。
- `@Service`：标识一个业务逻辑组件（服务层）。比如 `@Service("userService")`，这里的 userService 就是 Bean 的名称。
- `@Repository`：标识一个数据访问组件（持久层）。
- `@Autowired`：按类型自动注入依赖。
- `@Configuration`：用于定义配置类，可替换 XML 配置文件。
- `@Value`：用于将 Spring Boot 中 application.properties 配置的属性值赋值给变量。

#### AOP 方面有哪些注解呢？

`@Aspect` 用于声明一个切面，可以配合其他注解一起使用，比如：

- `@After`：在方法执行之后执行。
- `@Before`：在方法执行之前执行。
- `@Around`：方法前后均执行。
- `@PointCut`：定义切点，指定需要拦截的方法。

#### 事务注解有哪些？

主要就是 `@Transactional`，用于声明一个方法需要事务支持。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的微众银行同学 1 Java 后端一面的原题：说说 Spring 常见的注解？

### 4.Spring 中应用了哪些设计模式呢？

![三分恶面渣逆袭：Spring中用到的设计模式](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-ee1c5cee-8462-4bae-93ea-ec936cc77640.png)

Spring 框架中用了蛮多设计模式的：

①、**工厂模式**：IoC 容器本身可以看作是一个巨大的工厂，负责创建和管理 Bean 的生命周期和依赖关系。

像 BeanFactory 和 ApplicationContext 接口都提供了工厂模式的实现，负责实例化、配置和组装 Bean。

②、**代理模式**：AOP 的实现就是基于代理模式的，如果配置了事务管理，Spring 会使用代理模式创建一个连接数据库的代理对象，来进行事务管理。

③、**单例模式**：Spring 容器中的 Bean 默认都是单例的，这样可以保证 Bean 的唯一性，减少系统开销。

④、**模板模式**：Spring 中的 JdbcTemplate，HibernateTemplate 等以 Template 结尾的类，都使用了模板方法模式。

比如，我们使用 JdbcTemplate，只需要提供 SQL 语句和需要的参数就可以了，至于如何创建连接、执行 SQL、处理结果集等都由 JdbcTemplate 这个模板方法来完成。

④、**观察者模式**：Spring 事件驱动模型就是观察者模式很经典的一个应用，Spring 中的 ApplicationListener 就是观察者，当有事件（ApplicationEvent）被发布，ApplicationListener 就能接收到信息。

⑤、**适配器模式**：Spring MVC 中的 HandlerAdapter 就用了适配器模式。它允许 DispatcherServlet 通过统一的适配器接口与多种类型的请求处理器进行交互。

⑥、**策略模式**：Spring 中有一个 Resource 接口，它的不同实现类，会根据不同的策略去访问资源。

```java
public interface ResourceLoader {

    String CLASSPATH_URL_PREFIX = ResourceUtils.CLASSPATH_URL_PREFIX;

    Resource getResource(String location);

    ClassLoader getClassLoader();
}
```

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的携程面经同学 10 Java 暑期实习一面面试原题：Spring IoC 的设计模式，AOP 的设计模式
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小公司面经合集同学 1 Java 后端面试原题：Spring 框架使用到的设计模式？

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括 Java 基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM 等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

## IoC

### 5.说一说什么是 IoC？什么是 DI？

推荐阅读：[IoC 扫盲](https://javabetter.cn/springboot/ioc.html)

所谓的**IoC**（控制反转，Inversion of Control），就是由容器来控制对象的生命周期和对象之间的关系。以前是我们想要什么就自己创建什么，现在是我们需要什么容器就帮我们送来什么。

![引入IoC之前和引入IoC之后](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-619da277-c15e-4dd7-9f2b-dbd809a9aaa0.png)

也就是说，控制对象生命周期的不再是引用它的对象，而是容器，这就叫**控制反转**。

![三分恶面渣逆袭：控制反转示意图](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-440f5d0e-f4db-462c-97fb-d54407a354d5.png)

没有 IoC 之前：

```java
我需要一个女朋友，刚好大街上突然看到了一个小姐姐，人很好看，于是我就自己主动上去搭讪，要她的微信号，找机会聊天关心她，然后约她出来吃饭，打听她的爱好，三观。。。
```

有了 IoC 之后：

```java
我需要一个女朋友，于是我就去找婚介所，告诉婚介所，我需要一个长的像赵露思的，会打 Dota2 的，于是婚介所在它的人才库里开始找，找不到它就直接说没有，找到它就直接介绍给我。
```

婚介所就相当于一个 IoC 容器，我就是一个对象，我需要的女朋友就是另一个对象，我不用关心女朋友是怎么来的，我只需要告诉婚介所我需要什么样的女朋友，婚介所就帮我去找。

Spring 倡导的开发方式就是这样，所有的类创建都通过 Spring 容器来，不再是开发者去 new，去 = null 销毁，这些创建和销毁的工作都交给 Spring 容器来。

于是，对于某个对象来说，以前是它控制它依赖的对象，现在是所有对象都被 Spring 控制，这就是**控制反转**。

![图片来源于网络](https://cdn.tobebetterjavaer.com/stutymore/spring-20240310191630.png)

#### 说说什么是 DI？

**DI（依赖注入，Dependency Injection）**：有人说 IoC 和 DI 是一回事，有人说 IoC 是思想，DI 是 IoC 的实现。2004 年，Martin Fowler 在他的文章《控制反转容器&依赖注入模式》首次提出了依赖注入这个名词。

> 控制反转这个词太宽泛，并不能很好地解释这个框架的具体实现，于是就想到了一个新名词：依赖注入。

打个比方，你现在想吃韭菜馅的饺子，这时候就有人用针管往你吃的饺子里注入韭菜鸡蛋馅。就好像 A 类需要 B 类，以前是 A 类自己 new 一个 B 类，现在是有人把 B 类注入到 A 类里。

#### 为什么要使用 IoC 呢？

在平时的 Java 开发中，如果我们要实现某一个功能，可能至少需要两个以上的对象来协助完成，在没有 Spring 之前，每个对象在需要它的合作对象时，需要自己 new 一个，比如说 A 要使用 B，A 就对 B 产生了依赖，也就是 A 和 B 之间存在了一种耦合关系。

有了 Spring 之后，就不一样了，创建 B 的工作交给了 Spring 来完成，Spring 创建好了 B 对象后就放到容器中，A 告诉 Spring 我需要 B，Spring 就从容器中取出 B 交给 A 来使用。

至于 B 是怎么来的，A 就不再关心了，Spring 容器想通过 newnew 创建 B 还是 new 创建 B，无所谓。

这就是 IoC 的好处，它降低了对象之间的耦合度，使得程序更加灵活，更加易于维护。

推荐阅读：[孤傲苍狼：谈谈对 Spring IOC 的理解](https://www.cnblogs.com/xdp-gacl/p/4249939.html)

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小米 25 届日常实习一面原题：说说你对 AOP 和 IoC 的理解。
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小公司面经合集同学 1 Java 后端面试原题：介绍 Spring IoC 和 AOP?
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的招商银行面经同学 6 招银网络科技面试原题：SpringBoot框架的AOP、IOC/DI？

### 6.能简单说一下 Spring IoC 的实现机制吗？

PS:这道题老三在面试中被问到过，问法是“**你有自己实现过简单的 Spring 吗？**”

Spring 的 IoC 本质就是一个大工厂，我们想想一个工厂是怎么运行的呢？

![工厂运行](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-7678c40f-a48d-4bd5-80f8-e902ad688e11.png)

- **生产产品**：一个工厂最核心的功能就是生产产品。在 Spring 里，不用 Bean 自己来实例化，而是交给 Spring，应该怎么实现呢？——答案毫无疑问，**反射**。

  那么这个厂子的生产管理是怎么做的？你应该也知道——**工厂模式**。

- **库存产品**：工厂一般都是有库房的，用来库存产品，毕竟生产的产品不能立马就拉走。Spring 我们都知道是一个容器，这个容器里存的就是对象，不能每次来取对象，都得现场来反射创建对象，得把创建出的对象存起来。

- **订单处理**：还有最重要的一点，工厂根据什么来提供产品呢？订单。这些订单可能五花八门，有线上签签的、有到工厂签的、还有工厂销售上门签的……最后经过处理，指导工厂的出货。

  在 Spring 里，也有这样的订单，它就是我们 bean 的定义和依赖关系，可以是 xml 形式，也可以是我们最熟悉的注解形式。

我们简单地实现一个 mini 版的 Spring IoC：

![mini版本Spring IoC](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-1d55c63d-2d12-43b1-9f43-428f5f4a1413.png)

**Bean 定义：**

Bean 通过一个配置文件定义，把它解析成一个类型。

- beans.properties

  偷懒，这里直接用了最方便解析的 properties，这里直接用一个`<key,value>`类型的配置来代表 Bean 的定义，其中 key 是 beanName，value 是 class

  ```java
  userDao:cn.fighter3.bean.UserDao
  ```

- BeanDefinition.java

  bean 定义类，配置文件中 bean 定义对应的实体

  ```java
  public class BeanDefinition {

      private String beanName;

      private Class beanClass;
       //省略getter、setter
   }
  ```

- ResourceLoader.java

  资源加载器，用来完成配置文件中配置的加载

  ```java
  public class ResourceLoader {

      public static Map<String, BeanDefinition> getResource() {
          Map<String, BeanDefinition> beanDefinitionMap = new HashMap<>(16);
          Properties properties = new Properties();
          try {
              InputStream inputStream = ResourceLoader.class.getResourceAsStream("/beans.properties");
              properties.load(inputStream);
              Iterator<String> it = properties.stringPropertyNames().iterator();
              while (it.hasNext()) {
                  String key = it.next();
                  String className = properties.getProperty(key);
                  BeanDefinition beanDefinition = new BeanDefinition();
                  beanDefinition.setBeanName(key);
                  Class clazz = Class.forName(className);
                  beanDefinition.setBeanClass(clazz);
                  beanDefinitionMap.put(key, beanDefinition);
              }
              inputStream.close();
          } catch (IOException | ClassNotFoundException e) {
              e.printStackTrace();
          }
          return beanDefinitionMap;
      }

  }
  ```

- BeanRegister.java

  对象注册器，这里用于单例 bean 的缓存，我们大幅简化，默认所有 bean 都是单例的。可以看到所谓单例注册，也很简单，不过是往 HashMap 里存对象。

  ```java
  public class BeanRegister {

      //单例Bean缓存
      private Map<String, Object> singletonMap = new HashMap<>(32);

      /**
       * 获取单例Bean
       *
       * @param beanName bean名称
       * @return
       */
      public Object getSingletonBean(String beanName) {
          return singletonMap.get(beanName);
      }

      /**
       * 注册单例bean
       *
       * @param beanName
       * @param bean
       */
      public void registerSingletonBean(String beanName, Object bean) {
          if (singletonMap.containsKey(beanName)) {
              return;
          }
          singletonMap.put(beanName, bean);
      }

  }
  ```

- **BeanFactory.java**

![BeanFactory](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-c6b3b707-cf53-4c7c-a6f9-8560950806fc.png)

- 对象工厂，我们最**核心**的一个类，在它初始化的时候，创建了 bean 注册器，完成了资源的加载。

- 获取 bean 的时候，先从单例缓存中取，如果没有取到，就创建并注册一个 bean

  ```java
  public class BeanFactory {

      private Map<String, BeanDefinition> beanDefinitionMap = new HashMap<>();

      private BeanRegister beanRegister;

      public BeanFactory() {
          //创建bean注册器
          beanRegister = new BeanRegister();
          //加载资源
          this.beanDefinitionMap = new ResourceLoader().getResource();
      }

      /**
       * 获取bean
       *
       * @param beanName bean名称
       * @return
       */
      public Object getBean(String beanName) {
          //从bean缓存中取
          Object bean = beanRegister.getSingletonBean(beanName);
          if (bean != null) {
              return bean;
          }
          //根据bean定义，创建bean
          return createBean(beanDefinitionMap.get(beanName));
      }

      /**
       * 创建Bean
       *
       * @param beanDefinition bean定义
       * @return
       */
      private Object createBean(BeanDefinition beanDefinition) {
          try {
              Object bean = beanDefinition.getBeanClass().newInstance();
              //缓存bean
              beanRegister.registerSingletonBean(beanDefinition.getBeanName(), bean);
              return bean;
          } catch (InstantiationException | IllegalAccessException e) {
              e.printStackTrace();
          }
          return null;
      }
  }
  ```

- 测试

  - UserDao.java

    我们的 Bean 类，很简单

    ```java
    public class UserDao {

        public void queryUserInfo(){
            System.out.println("A good man.");
        }
    }
    ```

  - 单元测试

    ```java
    public class ApiTest {
        @Test
        public void test_BeanFactory() {
            //1.创建bean工厂(同时完成了加载资源、创建注册单例bean注册器的操作)
            BeanFactory beanFactory = new BeanFactory();

            //2.第一次获取bean（通过反射创建bean，缓存bean）
            UserDao userDao1 = (UserDao) beanFactory.getBean("userDao");
            userDao1.queryUserInfo();

            //3.第二次获取bean（从缓存中获取bean）
            UserDao userDao2 = (UserDao) beanFactory.getBean("userDao");
            userDao2.queryUserInfo();
        }
    }
    ```

  - 运行结果

    ```java
    A good man.
    A good man.
    ```

至此，我们一个乞丐+破船版的 Spring 就完成了，代码也比较完整，有条件的可以跑一下。

PS:因为时间+篇幅的限制，这个 demo 比较简陋，没有面向接口、没有解耦、边界检查、异常处理……健壮性、扩展性都有很大的不足，感兴趣可以学习参考[15]。

### 7.说说 BeanFactory 和 ApplicantContext?

可以这么比喻，BeanFactory 是 Spring 的“心脏”，而 ApplicantContext 是 Spring 的完整“身躯”。

- BeanFactory 主要负责配置、创建和管理 bean，为 Spring 提供了基本的依赖注入（DI）支持。
- ApplicationContext 是 BeanFactory 的子接口，在 BeanFactory 的基础上添加了企业级的功能支持。

![三分恶面渣逆袭：BeanFactory和ApplicantContext](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-66328446-f89f-4b7a-8d9f-0e1145dd9b2f.png)

#### 详细说说 BeanFactory

BeanFactory 位于整个 Spring IoC 容器的顶端，ApplicationContext 算是 BeanFactory 的子接口。

![三分恶面渣逆袭：Spring5 BeanFactory继承体系](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-6e6d4b69-f36c-41e6-b8ba-9277be147c9b.png)

它最主要的方法就是 `getBean()`，这个方法负责从容器中返回特定名称或者类型的 Bean 实例。

来看一个 XMLBeanFactory（已过时） 获取 bean 的例子：

```java
class HelloWorldApp{
   public static void main(String[] args) {
      BeanFactory factory = new XmlBeanFactory (new ClassPathResource("beans.xml"));
      HelloWorld obj = (HelloWorld) factory.getBean("itwanger");
      obj.getMessage();
   }
}
```

#### 请详细说说 ApplicationContext

ApplicationContext 继承了 HierachicalBeanFactory 和 ListableBeanFactory 接口，算是 BeanFactory 的自动挡版本，是 Spring 应用的默认方式。

![三分恶面渣逆袭：Spring5 ApplicationContext部分体系类图](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-e201c9a3-f23c-4768-b844-ac7e0ba4bcec.png)

ApplicationContext 会在启动时预先创建和配置所有的单例 bean，并支持如 JDBC、ORM 框架的集成，内置面向切面编程（AOP）的支持，可以配置声明式事务管理等。

这是 ApplicationContext 的使用例子：

```java
class MainApp {
    public static void main(String[] args) {
        // 使用 AppConfig 配置类初始化 ApplicationContext
        ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);

        // 从 ApplicationContext 获取 messageService 的 bean
        MessageService service = context.getBean(MessageService.class);

        // 使用 bean
        service.printMessage();
    }
}
```

通过 AnnotationConfigApplicationContext 类，我们可以使用 Java 配置类来初始化 ApplicationContext，这样就可以使用 Java 代码来配置 Spring 容器。

```java
@Configuration
@ComponentScan(basePackages = "com.github.paicoding.forum.test.javabetter.spring1") // 替换为你的包名
public class AppConfig {
}
```

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团同学 2 优选物流调度技术 2 面面试原题：BeanFactory和ApplicationContext

### 8.你知道 Spring 容器启动阶段会干什么吗？

Spring 的 IoC 容器工作的过程，其实可以划分为两个阶段：**容器启动阶段**和**Bean 实例化阶段**。

其中容器启动阶段主要做的工作是加载和解析配置文件，保存到对应的 Bean 定义中。

![容器启动和Bean实例化阶段](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-8f8103f7-2a51-4858-856e-96a4ac400d76.png)

容器启动开始，首先会通过某种途径加载 Congiguration MetaData，在大部分情况下，容器需要依赖某些工具类（BeanDefinitionReader）对加载的 Congiguration MetaData 进行解析和分析，并将分析后的信息组为相应的 BeanDefinition。

![xml配置信息映射注册过程](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-dfb3d8c4-ba8d-4a2c-aef2-4ad425f7180c.png)

最后把这些保存了 Bean 定义必要信息的 BeanDefinition，注册到相应的 BeanDefinitionRegistry，这样容器启动就完成了。

#### 说说 Spring 的 Bean 实例化方式

Spring 提供了 4 种不同的方式来实例化 Bean，以满足不同场景下的需求。

#### 说说构造方法的方式

在类上使用@Component（或@Service、@Repository 等特定于场景的注解）标注类，然后通过构造方法注入依赖。

```java
@Component
public class ExampleBean {
    private DependencyBean dependency;

    @Autowired
    public ExampleBean(DependencyBean dependency) {
        this.dependency = dependency;
    }
}
```

#### 说说静态工厂的方式

在这种方式中，Bean 是由一个静态方法创建的，而不是直接通过构造方法。

```java
public class ClientService {
    private static ClientService clientService = new ClientService();

    private ClientService() {}

    public static ClientService createInstance() {
        return clientService;
    }
}
```

#### 说说实例工厂方法实例化的方式

与静态工厂方法相比，实例工厂方法依赖于某个类的实例来创建 Bean。这通常用在需要通过工厂对象的非静态方法来创建 Bean 的场景。

```java
public class ServiceLocator {
    public ClientService createClientServiceInstance() {
        return new ClientService();
    }
}
```

#### 说说 FactoryBean 接口实例化方式

FactoryBean 是一个特殊的 Bean 类型，可以在 Spring 容器中返回其他对象的实例。通过实现 FactoryBean 接口，可以自定义实例化逻辑，这对于构建复杂的初始化逻辑非常有用。

```java
public class ToolFactoryBean implements FactoryBean<Tool> {
    private int factoryId;
    private int toolId;

    @Override
    public Tool getObject() throws Exception {
        return new Tool(toolId);
    }

    @Override
    public Class<?> getObjectType() {
        return Tool.class;
    }

    @Override
    public boolean isSingleton() {
        return true;
    }

    // setter and getter methods for factoryId and toolId
}
```

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的华为面经同学 8 技术二面面试原题：说说 Spring 的 Bean 实例化方式
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团同学 2 优选物流调度技术 2 面面试原题：bean加工有哪些方法？

### 9.能说一下 Spring Bean 生命周期吗？

推荐阅读：[三分恶：Spring Bean 生命周期，好像人的一生](https://mp.weixin.qq.com/s/zb6eA3Se0gQoqL8PylCPLw)

在 Spring 中，基本容器 BeanFactory 和扩展容器 ApplicationContext 的实例化时机不太一样，BeanFactory 采用的是延迟初始化的方式，也就是说，只有在第一次 `getBean()` 获取 Bean 的时候，才会实例化 Bean。

而 ApplicationContext 会在启动时预先创建并初始化所有的 Bean，并且包含了 BeanFactory 的所有功能，还增加了国际化支持、事件传播等功能。在 Spring Boot 项目中，一般使用的是 ApplicationContext。

![三分恶：BeanFactory 和 ApplicationContext 的不同](https://cdn.tobebetterjavaer.com/stutymore/spring-20240311095813.png)

Spring 中 Bean 的生命周期大致分为四个阶段：**实例化**（Instantiation）、**属性赋值**（Populate）、**初始化**（Initialization）、**销毁**（Destruction）。

![三分恶面渣逆袭：Bean生命周期四个阶段](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-595fce5b-36cb-4dcb-b08c-8205a1e98d8a.png)

对应的完整步骤如下图所示：

![三分恶面渣逆袭：Spring Bean生命周期](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-942a927a-86e4-4a01-8f52-9addd89642ff.png)

- **实例化**：Spring 容器根据 Bean 的定义创建 Bean 的实例，相当于执行构造方法，也就是 new 一个对象。
- **属性赋值**：相当于执行 setter 方法为字段赋值。
- **初始化**：初始化阶段允许执行自定义的逻辑，比如设置某些必要的属性值、开启资源、执行预加载操作等，以确保 Bean 在使用之前是完全配置好的。
- **销毁**：相当于执行 `= null`，释放资源。

可以在源码 `AbstractAutowireCapableBeanFactory` 中的 `doCreateBean` 方法中，看到 Bean 的前三个生命周期：

```java
protected Object doCreateBean(String beanName, RootBeanDefinition mbd, @Nullable Object[] args) throws BeanCreationException {
    BeanWrapper instanceWrapper = null;
    if (mbd.isSingleton()) {
        instanceWrapper = (BeanWrapper)this.factoryBeanInstanceCache.remove(beanName);
    }

    if (instanceWrapper == null) {
        // 实例化阶段
        instanceWrapper = this.createBeanInstance(beanName, mbd, args);
    }

    ...

    Object exposedObject = bean;

    try {
        // 属性赋值阶段
        this.populateBean(beanName, mbd, instanceWrapper);
        // 初始化阶段
        exposedObject = this.initializeBean(beanName, exposedObject, mbd);
    } catch (Throwable var18) {
        ...
    }

    ...
}
```

![三分恶面渣逆袭：Bean生命周期源码追踪](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-d2da20a3-08d0-4648-b9a3-2fff8512b159.png)

源码位置，见下图：

![](https://cdn.tobebetterjavaer.com/stutymore/spring-20240311101430.png)

至于销毁，是在容器关闭的时候调用的，详见 `ConfigurableApplicationContext` 的 `close` 方法。

![](https://cdn.tobebetterjavaer.com/stutymore/spring-20240311101658.png)

**请在一个已有的 Spring Boot 项目中通过单元测试的形式来展示 Spring Bean 的生命周期**。

第一步，创建一个 LifecycleDemoBean 类：

```java
public class LifecycleDemoBean implements InitializingBean, DisposableBean {

    // 使用@Value注解注入属性值，这里演示了如何从配置文件中读取值
    // 如果配置文件中没有定义lifecycle.demo.bean.name，则使用默认值"default name"
    @Value("${lifecycle.demo.bean.name:default name}")
    private String name;

    // 构造方法：在Bean实例化时调用
    public LifecycleDemoBean() {
        System.out.println("LifecycleDemoBean: 实例化");
    }

    // 属性赋值：Spring通过反射调用setter方法为Bean的属性注入值
    public void setName(String name) {
        System.out.println("LifecycleDemoBean: 属性赋值");
        this.name = name;
    }

    // 使用@PostConstruct注解的方法：在Bean的属性赋值完成后调用，用于执行初始化逻辑
    @PostConstruct
    public void postConstruct() {
        System.out.println("LifecycleDemoBean: @PostConstruct（初始化）");
    }

    // 实现InitializingBean接口：afterPropertiesSet方法在@PostConstruct注解的方法之后调用
    // 用于执行更多的初始化逻辑
    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("LifecycleDemoBean: afterPropertiesSet（InitializingBean）");
    }

    // 自定义初始化方法：在XML配置或Java配置中指定，执行特定的初始化逻辑
    public void customInit() {
        System.out.println("LifecycleDemoBean: customInit（自定义初始化方法）");
    }

    // 使用@PreDestroy注解的方法：在容器销毁Bean之前调用，用于执行清理工作
    @PreDestroy
    public void preDestroy() {
        System.out.println("LifecycleDemoBean: @PreDestroy（销毁前）");
    }

    // 实现DisposableBean接口：destroy方法在@PreDestroy注解的方法之后调用
    // 用于执行清理资源等销毁逻辑
    @Override
    public void destroy() throws Exception {
        System.out.println("LifecycleDemoBean: destroy（DisposableBean）");
    }

    // 自定义销毁方法：在XML配置或Java配置中指定，执行特定的清理逻辑
    public void customDestroy() {
        System.out.println("LifecycleDemoBean: customDestroy（自定义销毁方法）");
    }
}
```

#### ①、实例化

实例化是创建 Bean 实例的过程，即在内存中为 Bean 对象分配空间。这一步是通过调用 Bean 的构造方法完成的。

```java
public LifecycleDemoBean() {
    System.out.println("LifecycleDemoBean: 实例化");
}
```

在这里，当 Spring 创建 LifecycleDemoBean 的实例时，会调用其无参数的构造方法，这个过程就是实例化。

#### ②、属性赋值

在实例化之后，Spring 将根据 Bean 定义中的配置信息，通过反射机制为 Bean 的属性赋值。

```java
@Value("${lifecycle.demo.bean.name:default name}")
private String name;

public void setName(String name) {
    System.out.println("LifecycleDemoBean: 属性赋值");
    this.name = name;
}
```

`@Value`注解和 setter 方法体现了属性赋值的过程。`@Value`注解让 Spring 注入配置值（或默认值），setter 方法则是属性赋值的具体操作。

#### ③、初始化

初始化阶段允许执行自定义的初始化逻辑，比如检查必要的属性是否已经设置、开启资源等。Spring 提供了多种方式来配置初始化逻辑。

1、使用 `@PostConstruct` 注解的方法

```java
@PostConstruct
public void postConstruct() {
    System.out.println("LifecycleDemoBean: @PostConstruct（初始化）");
}
```

`@PostConstruct`注解的方法在 Bean 的所有属性都被赋值后，且用户自定义的初始化方法之前调用。

2、实现 `InitializingBean` 接口的 `afterPropertiesSet` 方法

```java
@Override
public void afterPropertiesSet() throws Exception {
    System.out.println("LifecycleDemoBean: afterPropertiesSet（InitializingBean）");
}
```

afterPropertiesSet 方法提供了另一种初始化 Bean 的方式，也是在所有属性赋值后调用。

3、自定义初始化方法

```java
public void customInit() {
    System.out.println("LifecycleDemoBean: customInit（自定义初始化方法）");
}
```

需要在配置类中指定初始化方法：

```java
@Bean(initMethod = "customInit")
public LifecycleDemoBean lifecycleDemoBean() {
    return new LifecycleDemoBean();
}
```

#### ④、销毁

销毁阶段允许执行自定义的销毁逻辑，比如释放资源。类似于初始化阶段，Spring 也提供了多种方式来配置销毁逻辑。

1、使用 `@PreDestroy` 注解的方法

```java
@PreDestroy
public void preDestroy() {
    System.out.println("LifecycleDemoBean: @PreDestroy（销毁前）");
}
```

`@PreDestroy`注解的方法在 Bean 被销毁前调用。

2、实现 `DisposableBean` 接口的 `destroy` 方法

```java
@Override
public void destroy() throws Exception {
    System.out.println("LifecycleDemoBean: destroy（DisposableBean）");
}
```

destroy 方法提供了另一种销毁 Bean 的方式，也是在 Bean 被销毁前调用。

3、自定义销毁方法

```java
public void customDestroy() {
    System.out.println("LifecycleDemoBean: customDestroy（自定义销毁方法）");
}
```

需要在配置类中指定销毁方法：

```java
@Bean(destroyMethod = "customDestroy")
public LifecycleDemoBean lifecycleDemoBean() {
    return new LifecycleDemoBean();
}
```

第二步，注册 Bean 并指定自定义初始化方法和销毁方法：

```java
@Configuration
public class LifecycleDemoConfig {

    @Bean(initMethod = "customInit", destroyMethod = "customDestroy")
    public LifecycleDemoBean lifecycleDemoBean() {
        return new LifecycleDemoBean();
    }
}
```

第三步，编写单元测试：

```java
@SpringBootTest
public class LifecycleDemoTest {

    @Autowired
    private ApplicationContext context;

    @Test
    public void testBeanLifecycle() {
        System.out.println("获取LifecycleDemoBean实例...");
        LifecycleDemoBean bean = context.getBean(LifecycleDemoBean.class);
    }
}
```

运行单元测试，查看控制台输出：

```java
LifecycleDemoBean: 实例化
LifecycleDemoBean: @PostConstruct（初始化）
LifecycleDemoBean: afterPropertiesSet（InitializingBean）
LifecycleDemoBean: customInit（自定义初始化方法）
获取LifecycleDemoBean实例...
LifecycleDemoBean: @PreDestroy（销毁前）
LifecycleDemoBean: destroy（DisposableBean）
LifecycleDemoBean: customDestroy（自定义销毁方法）
```

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小米 25 届日常实习一面原题：说说 Bean 的生命周期
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的百度面经同学 1 文心一言 25 实习 Java 后端面试原题：Spring中bean生命周期

### 10.Bean 定义和依赖定义有哪些方式？

有三种方式：**直接编码方式**、**配置文件方式**、**注解方式**。

![Bean依赖配置方式](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-89f0f50d-a9e4-4dec-b267-cb1a526cb340.png)

- 直接编码方式：我们一般接触不到直接编码的方式，但其实其它的方式最终都要通过直接编码来实现。
- 配置文件方式：通过 xml、propreties 类型的配置文件，配置相应的依赖关系，Spring 读取配置文件，完成依赖关系的注入。
- 注解方式：注解方式应该是我们用的最多的一种方式了，在相应的地方使用注解修饰，Spring 会扫描注解，完成依赖关系的注入。

### 11.有哪些依赖注入的方法？

Spring 支持**构造方法注入**、**属性注入**、**工厂方法注入**,其中工厂方法注入，又可以分为**静态工厂方法注入**和**非静态工厂方法注入**。

![Spring依赖注入方法](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-491f8444-54ba-4628-b8eb-8418a2197096.png)

- **构造方法注入**

  通过调用类的构造方法，将接口实现类通过构造方法变量传入

  ```java
   public CatDaoImpl(String message){
     this. message = message;
   }
  ```

  ```java
  <bean id="CatDaoImpl" class="com.CatDaoImpl">
    <constructor-arg value=" message "></constructor-arg>
  </bean>
  ```

- **属性注入**

  通过 Setter 方法完成调用类所需依赖的注入

  ```java
   public class Id {
      private int id;

      public int getId() { return id; }

      public void setId(int id) { this.id = id; }
  }
  ```

  ```java
  <bean id="id" class="com.id ">
    <property name="id" value="123"></property>
  </bean>
  ```

- **工厂方法注入**

  - **静态工厂注入**

    静态工厂顾名思义，就是通过调用静态工厂的方法来获取自己需要的对象，为了让 Spring 管理所有对象，我们不能直接通过"工程类.静态方法()"来获取对象，而是依然通过 Spring 注入的形式获取：

    ```java
    public class DaoFactory { //静态工厂

       public static final FactoryDao getStaticFactoryDaoImpl(){
          return new StaticFacotryDaoImpl();
       }
    }

    public class SpringAction {

     //注入对象
     private FactoryDao staticFactoryDao;

     //注入对象的 set 方法
     public void setStaticFactoryDao(FactoryDao staticFactoryDao) {
         this.staticFactoryDao = staticFactoryDao;
     }

    }
    ```

    ```java
    //factory-method="getStaticFactoryDaoImpl"指定调用哪个工厂方法
     <bean name="springAction" class=" SpringAction" >
       <!--使用静态工厂的方法注入对象,对应下面的配置文件-->
       <property name="staticFactoryDao" ref="staticFactoryDao"></property>
     </bean>

     <!--此处获取对象的方式是从工厂类中获取静态方法-->
    <bean name="staticFactoryDao" class="DaoFactory"
      factory-method="getStaticFactoryDaoImpl"></bean>
    ```

  - **非静态工厂注入**

    非静态工厂，也叫实例工厂，意思是工厂方法不是静态的，所以我们需要首先 new 一个工厂实例，再调用普通的实例方法。

    ```java
    //非静态工厂
    public class DaoFactory {
       public FactoryDao getFactoryDaoImpl(){
         return new FactoryDaoImpl();
       }
     }

    public class SpringAction {
      //注入对象
      private FactoryDao factoryDao;

      public void setFactoryDao(FactoryDao factoryDao) {
        this.factoryDao = factoryDao;
      }
    }
    ```

    ```java
     <bean name="springAction" class="SpringAction">
       <!--使用非静态工厂的方法注入对象,对应下面的配置文件-->
       <property name="factoryDao" ref="factoryDao"></property>
     </bean>

     <!--此处获取对象的方式是从工厂类中获取实例方法-->
     <bean name="daoFactory" class="com.DaoFactory"></bean>

    <bean name="factoryDao" factory-bean="daoFactory" factory-method="getFactoryDaoImpl"></bean>
    ```

### 12.Spring 有哪些自动装配的方式？

> **什么是自动装配？**

Spring IoC 容器知道所有 Bean 的配置信息，此外，通过 Java 反射机制还可以获知实现类的结构信息，如构造方法的结构、属性等信息。掌握所有 Bean 的这些信息后，Spring IoC 容器就可以按照某种规则对容器中的 Bean 进行自动装配，而无须通过显式的方式进行依赖配置。

Spring 提供的这种方式，可以按照某些规则进行 Bean 的自动装配，`<bean>`元素提供了一个指定自动装配类型的属性：`autowire="<自动装配类型>"`

> **Spring 提供了哪几种自动装配类型？**

Spring 提供了 4 种自动装配类型：

![Spring四种自动装配类型](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-034120d9-88c7-490b-af07-7d48f3b6b7bc.png)

- **byName**：根据名称进行自动匹配，假设 Boss 又一个名为 car 的属性，如果容器中刚好有一个名为 car 的 bean，Spring 就会自动将其装配给 Boss 的 car 属性
- **byType**：根据类型进行自动匹配，假设 Boss 有一个 Car 类型的属性，如果容器中刚好有一个 Car 类型的 Bean，Spring 就会自动将其装配给 Boss 这个属性
- **constructor**：与 byType 类似， 只不过它是针对构造函数注入而言的。如果 Boss 有一个构造函数，构造函数包含一个 Car 类型的入参，如果容器中有一个 Car 类型的 Bean，则 Spring 将自动把这个 Bean 作为 Boss 构造函数的入参；如果容器中没有找到和构造函数入参匹配类型的 Bean，则 Spring 将抛出异常。
- **autodetect**：根据 Bean 的自省机制决定采用 byType 还是 constructor 进行自动装配，如果 Bean 提供了默认的构造函数，则采用 byType，否则采用 constructor。

### 13.Spring 中的 Bean 的作用域有哪些?

Spring 的 Bean 主要支持五种作用域：

![Spring Bean支持作用域](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-08a9cb31-5a4f-4224-94cd-0c0f643a57ea.png)

- **singleton** : 在 Spring 容器仅存在一个 Bean 实例，Bean 以单实例的方式存在，是 Bean 默认的作用域。
- **prototype** : 每次从容器重调用 Bean 时，都会返回一个新的实例。

以下三个作用域于只在 Web 应用中适用：

- **request** : 每一次 HTTP 请求都会产生一个新的 Bean，该 Bean 仅在当前 HTTP Request 内有效。
- **session** : 同一个 HTTP Session 共享一个 Bean，不同的 HTTP Session 使用不同的 Bean。
- **globalSession**：同一个全局 Session 共享一个 Bean，只用于基于 Protlet 的 Web 应用，Spring5 中已经不存在了。

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

当然了，循环依赖只发生在 Singleton 作用域的 Bean 之间，因为如果是 Prototype 作用域的 Bean，Spring 会直接抛出异常。

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

### 16.那 Spring 怎么解决循环依赖的呢？

> 开发人员做好设计，别让 Bean 循环依赖，但面试官既然这么傻逼地问了这个问题，肯定不想听这个最正确的答案（😂）。只能硬着头皮作答了。

我们知道，Singleton 的 Bean 要初始化完成，需要经历这三步：

![三分恶面渣逆袭：Bean初始化步骤](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-867066f1-49d1-4e57-94f9-4c66a3a8797e.png)

注入发生在第二步，**属性赋值**，Spring 可以在这一步通过**三级缓存**来解决了循环依赖：

1. 一级缓存 : `Map<String,Object>` **singletonObjects**，单例池，用于保存实例化、属性赋值（注入）、初始化完成的 bean 实例
2. 二级缓存 : `Map<String,Object>` **earlySingletonObjects**，早期曝光对象，用于保存实例化完成的 bean 实例
3. 三级缓存 : `Map<String,ObjectFactory<?>>` **singletonFactories**，早期曝光对象工厂，用于保存 bean 创建工厂，以便后面有机会创建代理对象。

![三分恶面渣逆袭：三级缓存](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-01d92863-a2cb-4f61-8d8d-30ecf0279b28.png)

我们来看一下三级缓存解决循环依赖的过程：

当 A、B 两个类发生循环依赖时：

![三分恶面渣逆袭：循环依赖](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-cfc09f84-f8e1-4702-80b6-d115843e81fe.png)

A 实例的初始化过程：

①、创建 A 实例，实例化的时候把 A 的对象⼯⼚放⼊三级缓存，表示 A 开始实例化了，虽然我这个对象还不完整，但是先曝光出来让大家知道。

![三分恶面渣逆袭：A 对象工厂](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-1a8bdc29-ff43-4ff4-9b61-3eedd9da59b3.png)

②、A 注⼊属性时，发现依赖 B，此时 B 还没有被创建出来，所以去实例化 B

③、同样，B 注⼊属性时发现依赖 A，它就从缓存里找 A 对象。依次从⼀级到三级缓存查询 A。

发现可以从三级缓存中通过对象⼯⼚拿到 A，虽然 A 不太完善，但是存在，就把 A 放⼊⼆级缓存，同时删除三级缓存中的 A，此时，B 已经实例化并且初始化完成了，把 B 放入⼀级缓存。

![三分恶面渣逆袭：放入一级缓存](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-bf2507bf-96aa-4b88-a58b-7ec41d11bc70.png)

④、接着 A 继续属性赋值，顺利从⼀级缓存拿到实例化且初始化完成的 B 对象，A 对象创建也完成，删除⼆级缓存中的 A，同时把 A 放⼊⼀级缓存

⑤、最后，⼀级缓存中保存着实例化、初始化都完成的 A、B 对象

![三分恶面渣逆袭：AB 都好了](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-022f7cb9-2c83-4fe9-b252-b02bd0fb2435.png)

到此，我们就知道为什么 Spring 能解决 setter 注入的循环依赖了，因为实例化和属性赋值是分开的，里面有操作的空间。

如果都是构造器注入的话，那么都得在实例化这一步完成注入，没有可操作的空间。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小米 25 届日常实习一面原题：如何解决循环依赖？
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的百度面经同学 1 文心一言 25 实习 Java 后端面试原题：Spring如何解决循环依赖？

### 17.为什么要三级缓存？⼆级不⾏吗？

不行，主要是为了**⽣成代理对象**。如果是没有代理的情况下，使用二级缓存解决循环依赖也是 OK 的。但是如果存在代理，三级没有问题，二级就不行了。

因为三级缓存中放的是⽣成具体对象的匿名内部类，获取 Object 的时候，它可以⽣成代理对象，也可以返回普通对象。使⽤三级缓存主要是为了保证不管什么时候使⽤的都是⼀个对象。

假设只有⼆级缓存的情况，往⼆级缓存中放的显示⼀个普通的 Bean 对象，Bean 初始化过程中，通过 BeanPostProcessor 去⽣成代理对象之后，覆盖掉⼆级缓存中的普通 Bean 对象，那么可能就导致取到的 Bean 对象不一致了。

![二级缓存不行的原因](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-6ece8a46-25b1-459b-8cfa-19fc696dd7d6.png)

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

AOP，也就是 Aspect-oriented Programming，译为面向切面编程。

简单点说，就是把一些业务逻辑中的相同代码抽取到一个独立的模块中，让业务逻辑更加清爽。

![三分恶面渣逆袭：横向抽取](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-09dbcda4-7c1b-42d6-8520-1a5fc84abbde.png)

举个例子，假如我们现在需要在业务代码开始前进行参数校验，在结束后打印日志，该怎么办呢？

我们可以把`日志记录`和`数据校验`这两个功能抽取出来，形成一个切面，然后在业务代码中引入这个切面，这样就可以实现业务逻辑和通用逻辑的分离。

![三分恶面渣逆袭：AOP应用示例](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-4754b4c0-0356-4077-a2f9-55e246cf8ba0.png)

业务代码不再关心这些通用逻辑，只需要关心自己的业务实现，这样就实现了业务逻辑和通用逻辑的分离。

我们来回顾一下 Java 语言的执行过程：

![三分恶面渣逆袭：Java 执行过程](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-2b9859e5-019c-4e87-a449-990d3deae135.png)

AOP 的核心是**动态代理**，可以使用 JDK 动态代理来实现，也可以使用 CGLIB 来实现。

#### AOP 有哪些核心概念？

- **切面**（Aspect）：类是对物体特征的抽象，切面就是对横切关注点的抽象
- **连接点**（Join Point）：被拦截到的点，因为 Spring 只支持方法类型的连接点，所以在 Spring 中，连接点指的是被拦截到的方法，实际上连接点还可以是字段或者构造方法
- **切点**（Pointcut）：对连接点进行拦截的定位
- **通知**（Advice）：指拦截到连接点之后要执行的代码，也可以称作**增强**
- **目标对象** （Target）：代理的目标对象
- **引介**（introduction）：一种特殊的增强，可以动态地为类添加一些属性和方法
- **织入**（Weabing）：织入是将增强添加到目标类的具体连接点上的过程。可以分为 3 种类型的织入：

①、编译期织入：切面在目标类编译时被织入。

②、类加载期织入：切面在目标类加载到 JVM 时被织入。需要特殊的类加载器，它可以在目标类被引入应用之前增强该目标类的字节码。

③、运行期织入：切面在应用运行的某个时刻被织入。一般情况下，在织入切面时，AOP 容器会为目标对象动态地创建一个代理对象。Spring AOP 就是以这种方式织入切面。

Spring 采用运行期织入，而 AspectJ 采用编译期织入和类加载器织入。

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

总结一下：

AOP，也就是面向切面编程，是一种编程范式，旨在提高代码的模块化。比如说可以将日志记录、事务管理等分离出来，来提高代码的可重用性。

AOP 的核心概念包括切面（Aspect）、连接点（Join Point）、通知（Advice）、切点（Pointcut）和织入（Weaving）等。

① 像日志打印、事务管理等都可以抽离为切面，可以声明在类的方法上。

② 在 Spring AOP 中，连接点总是表示方法的执行。

③ Spring AOP 支持五种类型的通知：前置通知、后置通知、环绕通知、异常通知、最终通知等。

④ 在 AOP 中，切点用于指定我们想要在哪些连接点上执行通知的规则。

⑤ 织入是指将切面应用到目标对象并创建新的代理对象的过程。Spring AOP 默认在运行时通过动态代理方式实现织入。

像 `@Transactional` 注解，就是一个典型的 AOP 应用，它就是通过 AOP 来实现事务管理的。我们只需要在方法上添加 `@Transactional` 注解，Spring 就会在方法执行前后添加事务管理的逻辑。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯 Java 后端实习一面原题：说说 AOP 的原理。
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小米 25 届日常实习一面原题：说说你对 AOP 和 IoC 的理解。
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的快手面经同学 7 Java 后端技术一面面试原题：说一下 Spring AOP 的实现原理
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小公司面经合集同学 1 Java 后端面试原题：介绍 Spring IoC 和 AOP?
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的招商银行面经同学 6 招银网络科技面试原题：SpringBoot框架的AOP、IOC/DI？

### 20.你平时有用到 AOP 吗？

有，我在[技术派实战项目](https://javabetter.cn/zhishixingqiu/paicoding.html)中就有使用，我利用 AOP 打印了接口的入参和出参日志，以及执行时间。

![沉默王二：技术派教程](https://cdn.tobebetterjavaer.com/stutymore/spring-20240310180334.png)

我是这样使用的。

第一步，自定义一个注解作为切点

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

### 21.说说 JDK 动态代理和 CGLIB 代理？

Spring 的 AOP 是通过[动态代理](https://mp.weixin.qq.com/s/aZtfwik0weJN5JzYc-JxYg)来实现的，动态代理主要有两种方式：JDK 动态代理和 CGLIB 代理。

①、JDK 动态代理是基于接口的代理方式，它使用 Java 原生的 `java.lang.reflect.Proxy` 类和 `java.lang.reflect.InvocationHandler` 接口来创建和管理代理对象。

1. **基于 Interface**：JDK 动态代理要求目标对象必须实现一个或多个接口。代理对象不是直接继承自目标对象，而是实现了与目标对象相同的接口。
2. **使用 InvocationHandler**：在调用代理对象的任何方法时，调用都会被转发到一个 InvocationHandler 实例的 invoke 方法。可以在这个 invoke 方法中定义拦截逻辑，比如方法调用前后执行的操作。
3. **基于 Proxy**：Proxy 利用 InvocationHandler 动态创建一个符合目标类实现的接口实例，生成目标类的代理对象。

②、CGLIB（Code Generation Library）是一个第三方代码生成库，它通过继承方式实现代理，不需要接口，被广泛应用于 Spring AOP 中，用于提供方法拦截操作。

![图片来源于网络](https://cdn.tobebetterjavaer.com/stutymore/spring-20240321105653.png)

1. **基于继承**，CGLIB 通过在运行时生成目标对象的子类来创建代理对象，并在子类中覆盖非 final 的方法。因此，它不要求目标对象必须实现接口。
2. **基于 ASM**，ASM 是一个 Java 字节码操作和分析框架，CGLIB 可以通过 ASM 读取目标类的字节码，然后修改字节码生成新的类。它在运行时动态生成一个被代理类的子类，并在子类中覆盖父类的方法，通过方法拦截技术插入增强代码。

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

### 22.说说 Spring AOP 和 AspectJ AOP 区别?

**Spring AOP**

Spring AOP 属于`运行时增强`，主要具有如下特点：

1.  基于动态代理来实现，默认如果使用接口的，用 JDK 提供的动态代理实现，如果是方法则使用 CGLIB 实现

2.  Spring AOP 需要依赖 IoC 容器来管理，并且只能作用于 Spring 容器，使用纯 Java 代码实现

3.  在性能上，由于 Spring AOP 是基于**动态代理**来实现的，在容器启动时需要生成代理实例，在方法调用上也会增加栈的深度，使得 Spring AOP 的性能不如 AspectJ 的那么好。

4.  Spring AOP 致力于解决企业级开发中最普遍的 AOP(方法织入)。

**AspectJ**

AspectJ 是一个易用的功能强大的 AOP 框架，属于`编译时增强`， 可以单独使用，也可以整合到其它框架中，是 AOP 编程的完全解决方案。AspectJ 需要用到单独的编译器 ajc。

AspectJ 属于**静态织入**，通过修改代码来实现，在实际运行之前就完成了织入，所以说它生成的类是没有额外运行时开销的，一般有如下几个织入的时机：

1.  编译期织入（Compile-time weaving）：如类 A 使用 AspectJ 添加了一个属性，类 B 引用了它，这个场景就需要编译期的时候就进行织入，否则没法编译类 B。

2.  编译后织入（Post-compile weaving）：也就是已经生成了 .class 文件，或已经打成 jar 包了，这种情况我们需要增强处理的话，就要用到编译后织入。

3.  类加载后织入（Load-time weaving）：指的是在加载类的时候进行织入，要实现这个时期的织入，有几种常见的方法

整体对比如下：

![Spring AOP和AspectJ对比](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-d1dbe9d9-c55f-4293-8622-d9759064d613.png)

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

相比较编程式事务，优点是不需要在业务逻辑代码中掺杂事务管理的代码， Spring 推荐通过 @Transactional 注解的方式来实现声明式事务管理，也是日常开发中最常用的。

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

事务的传播机制定义了在方法被另一个事务方法调用时，这个方法的事务行为应该如何。

Spring 提供了一系列事务传播行为，这些传播行为定义了事务的边界和事务上下文如何在方法调用链中传播。

![三分恶面渣逆袭：6种事务传播机制](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-a6e2a8dc-9771-4d8b-9d91-76ddee98af1a.png)

- REQUIRED：如果当前存在事务，则加入该事务；如果当前没有事务，则创建一个新的事务。Spring 的默认传播行为。
- SUPPORTS：如果当前存在事务，则加入该事务；如果当前没有事务，则以非事务方式执行。
- MANDATORY：如果当前存在事务，则加入该事务；如果当前没有事务，则抛出异常。
- REQUIRES_NEW：总是启动一个新的事务，如果当前存在事务，则将当前事务挂起。
- NOT_SUPPORTED：总是以非事务方式执行，如果当前存在事务，则将当前事务挂起。
- NESTED：如果当前存在事务，则在嵌套事务内执行。如果当前事务不存在，则行为与 REQUIRED 一样。嵌套事务是一个子事务，它依赖于父事务。父事务失败时，会回滚子事务所做的所有操作。但子事务异常不一定会导致父事务的回滚。

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

Spring MVC 是基于模型-视图-控制器的 Web 框架，它的工作流程也主要是围绕着 Model、View、Controller 这三个组件展开的。

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

Spring Boot 是一个开源的、用于简化 Spring 应用初始化和开发过程的框架。提供了一套默认配置，约定优于配置，来帮助我们快速搭建 Spring 项目骨架，极大地提高了我们的生产效率，再也不用为 Spring 的繁琐配置而烦恼了。

以前的 Spring 开发需要配置大量的 xml 文件，并且需要引入大量的第三方 jar 包，还需要手动放到 classpath 下。

![SpringBoot图标](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-d9164ee6-5c86-4313-8fd9-efb9acfa5f0b.png)

Spring Boot 的优点非常多，比如说：

1. 通过 Intellij IDEA 或者官方的 Spring Initializr 就可以快速创建新项目，只需要选择需要的依赖就可以五分钟内搭建一个项目骨架。
2. Spring Boot 内嵌了 Tomcat、Jetty、Undertow 等容器，不需要在服务器上部署 WAR 包了，直接运行 jar 包就可以启动项目，超级方便。
3. Spring Boot 无需再像以前一样在 web.xml、applicationContext.xml 等配置文件里配置大量的内容，大部分初始工作 Spring Boot 都帮我们做好了。例如，如果项目中添加了 spring-boot-starter-web，Spring Boot 会自动配置 Tomcat 和 Spring MVC。
4. Spring Boot 允许我们通过 yaml 来管理应用的配置，比传统的 properties 文件更加简洁。
5. Spring Boot 提供了一系列的 Starter，可以快速集成常用的框架，例如 Spring Data JPA、Spring Security、MyBatis 等。
6. Spring Boot 提供了一系列的 Actuator，可以帮助我们监控和管理应用，比如健康检查、审计、统计等。
7. 配合 Spring Cloud 可以快速构建微服务架构。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的华为 OD 面经中出现过该题：讲讲 Spring Boot 的特性。
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的百度面经同学 1 文心一言 25 实习 Java 后端面试原题：SpringBoot基本原理
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的国企零碎面经同学 9 面试原题：Springboot基于Spring的配置有哪几种



### 32.SpringBoot 自动配置原理了解吗？

在 Spring 中，自动装配是指容器利用反射技术，根据 Bean 的类型、名称等自动注入所需的依赖。

在 Spring Boot 中，开启自动装配的注解是`@EnableAutoConfiguration`。

![二哥的 Java 进阶之路](https://cdn.tobebetterjavaer.com/stutymore/spring-20240316121711.png)

Spring Boot 为了进一步简化，直接通过 `@SpringBootApplication` 注解一步搞定，这个注解包含了 `@EnableAutoConfiguration` 注解。

![二哥的 Java 进阶之路](https://cdn.tobebetterjavaer.com/stutymore/spring-20240316121651.png)

①、`@EnableAutoConfiguration` 只是一个简单的注解，但是它的背后却是一个非常复杂的自动装配机制，核心是`AutoConfigurationImportSelector` 类。

```java
@AutoConfigurationPackage //将main同级的包下的所有组件注册到容器中
@Import({AutoConfigurationImportSelector.class}) //加载自动装配类 xxxAutoconfiguration
public @interface EnableAutoConfiguration {
    String ENABLED_OVERRIDE_PROPERTY = "spring.boot.enableautoconfiguration";

    Class<?>[] exclude() default {};

    String[] excludeName() default {};
}
```

②、`AutoConfigurationImportSelector`实现了`ImportSelector`接口，这个接口的作用就是收集需要导入的配置类，配合`@Import()`就将相应的类导入到 Spring 容器中。

![二哥的 Java 进阶之路](https://cdn.tobebetterjavaer.com/stutymore/spring-20240316122134.png)

③、获取注入类的方法是 `selectImports()`，它实际调用的是`getAutoConfigurationEntry()`，这个方法是获取自动装配类的关键。

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

Spring Boot 的自动装配原理依赖于 Spring 框架的依赖注入和条件注册，通过这种方式，Spring Boot 能够智能地配置 bean，并且只有当这些 bean 实际需要时才会被创建和配置。

![三分恶面渣逆袭：SpringBoot自动配置原理](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-df77ee15-2ff0-4ec7-8e65-e4ebb8ba88f1.png)

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的滴滴同学 2 技术二面的原题：SpringBoot 启动时为什么能够自动装配
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 22 暑期实习一面面试原题：Spring Boot 如何做到启动的时候注入一些 bean
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的比亚迪面经同学 3 Java 技术一面面试原题：说一下 Spring Boot 的自动装配原理
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的农业银行同学 1 面试原题：spring boot 的自动装配
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的百度面经同学 1 文心一言 25 实习 Java 后端面试原题：SpringBoot如何实现自动装配

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

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 1 Java 后端技术一面面试原题：你封装过 springboot starter 吗

### 34.Spring Boot 启动原理了解吗？

SpringBoot 项目启动的大致流程如下：

![SpringBoot 启动大致流程-图片来源网络](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-68744556-a1ba-4e1f-a092-1582875f0da6.png)

Spring Boot 应用通常有一个带有 main 方法的主类，这个类上标注了 `@SpringBootApplication` 注解，它是整个应用启动的入口。这个注解组合了 `@SpringBootConfiguration`、`@EnableAutoConfiguration` 和 `@ComponentScan`，这些注解共同支持配置和类路径扫描。

当执行 main 方法时，首先创建一个 SpringApplication 的实例。这个实例负责管理 Spring 应用的启动和初始化。

![技术派实战项目](https://cdn.tobebetterjavaer.com/stutymore/spring-20240422090338.png)

`SpringApplication.run()` 方法负责准备和启动 Spring 应用上下文（ApplicationContext）环境，包括：

- 扫描配置文件，添加依赖项
- 初始化和加载 Bean 定义
- 启动内嵌的 Web 服务器

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

### 36.SpringBoot 和 SpringMVC 的区别？（补充）

> 2024 年 04 月 04 日增补

Spring MVC 是基于 Spring 框架的一个模块，提供了一种 Model-View-Controller（模型-视图-控制器）的开发模式。

Spring Boot 旨在简化 Spring 应用的配置和部署过程，提供了大量的自动配置选项，以及运行时环境的内嵌 Web 服务器，这样就可以更快速地开发一个 SpringMVC 的 Web 项目。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的滴滴同学 2 技术二面的原题：SpringBoot 和 SpringMVC 的区别

## Spring Cloud

### 35.对 SpringCloud 了解多少？

SpringCloud 是 Spring 官方推出的微服务治理框架。

![Spring Cloud Netfilx核心组件-来源参考[2]](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-92ab53d5-f303-4fc5-bd26-e62cefe374b3.png)

> **什么是微服务？**

1.  2014 年 **Martin Fowler** 提出的一种新的架构形式。微服务架构是一种**架构模式**，提倡将单一应用程序划分成一组小的服务，服务之间相互协调，互相配合，为用户提供最终价值。每个服务运行在其独立的进程中，服务与服务之间采用轻量级的通信机制(如 HTTP 或 Dubbo)互相协作，每个服务都围绕着具体的业务进行构建，并且能够被独立的部署到生产环境中，另外，应尽量避免统一的，集中式的服务管理机制，对具体的一个服务而言，应根据业务上下文，选择合适的语言、工具(如 Maven)对其进行构建。
2.  微服务化的核心就是将传统的一站式应用，根据业务拆分成一个一个的服务，彻底地去耦合，每一个微服务提供单个业务功能的服务，一个服务做一件事情，从技术角度看就是一种小而独立的处理过程，类似进程的概念，能够自行单独启动或销毁，拥有自己独立的数据库。

> **微服务架构主要要解决哪些问题？**

1.  服务很多，客户端怎么访问，如何提供对外网关?
2.  这么多服务，服务之间如何通信? HTTP 还是 RPC?
3.  这么多服务，如何治理? 服务的注册和发现。
4.  服务挂了怎么办？熔断机制。

> **有哪些主流微服务框架？**

1.  Spring Cloud Netflix
2.  Spring Cloud Alibaba
3.  SpringBoot + Dubbo + ZooKeeper

> **SpringCloud 有哪些核心组件？**

![SpringCloud](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/spring-2b988a72-0739-4fed-b271-eaf12589444f.png)

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

---

图文详解 37 道 Spring 面试高频题，这次吊打面试官，我觉得稳了（手动 dog）。整理：沉默王二，戳[转载链接](https://mp.weixin.qq.com/s/EQge6DmgIqYITM3mAxkatg)，作者：三分恶，戳[原文链接](https://mp.weixin.qq.com/s/Y17S85ntHm_MLTZMJdtjQQ)。

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
