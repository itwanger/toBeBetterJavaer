---
title: 绝了，76张手绘图，彻底剖析清楚Spring AOP
shortTitle: 76 张手绘图，剖析 Spring AOP 源码
description: 第三篇 Sping 源码解读，肝了 2 个星期，抠图都扣麻了，深入浅出，绝对干货！
author: 楼仔
category:
  - 微信公众号
head:
---

下面我会简单介绍一下 AOP 的基础知识，以及使用方法，然后直接对源码进行拆解。不 BB，上文章目录。

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXB5DpIX5wdfCo7yOtuptf4soEyibRiadk2vNTE3osLicX8ASHlQ25Z1YYA/640?wx_fmt=png)

## 1\. 基础知识

### 1.1 什么是 AOP ？

AOP 的全称是 “Aspect Oriented Programming”，即**面向切面编程**。

在 AOP 的思想里面，周边功能（比如性能统计，日志，事务管理等）被定义为**切面**，核心功能和切面功能分别独立进行开发，然后**把核心功能和切面功能“编织”在一起，这就叫 AOP。**

AOP 能够将那些与业务无关，却为业务模块所共同调用的逻辑封装起来，便于减少系统的重复代码，降低模块间的耦合度，并有利于未来的可拓展性和可维护性。

### 1.2 AOP 基础概念

*   **连接点(Join point)** ：能够被拦截的地方，Spring AOP 是基于动态代理的，所以是方法拦截的，每个成员方法都可以称之为连接点；
*   **切点(Poincut)** ：每个方法都可以称之为连接点，我们具体定位到某一个方法就成为切点；
*   **增强/通知(Advice)** ：表示添加到切点的一段逻辑代码，并定位连接点的方位信息，简单来说就定义了是干什么的，具体是在哪干；
*   **织入(Weaving)** ：将增强/通知添加到目标类的具体连接点上的过程；
*   **引入/引介(Introduction)**
：允许我们向现有的类添加新方法或属性，是一种特殊的增强；
*   **切面(Aspect)** ：切面由切点和增强/通知组成，它既包括了横切逻辑的定义、也包括了连接点的定义。

上面的解释偏官方，下面用“方言”再给大家解释一遍。

*   切入点（Pointcut）：在哪些类，哪些方法上切入（**where**）；
*   通知（Advice）：在方法执行的什么时机（**when**：方法前/方法后/方法前后）做什么（**what**：增强的功能）；
*   切面（Aspect）：切面 = 切入点 + 通知，通俗点就是在什么时机，什么地方，做什么增强；
*   织入（Weaving）：把切面加入到对象，并创建出代理对象的过程，这个由 Spring 来完成。

5 种通知的分类：

*   **前置通知(Before Advice)** ：在目标方法被调用前调用通知功能；
*   **后置通知(After Advice)** ：在目标方法被调用之后调用通知功能；
*   **返回通知(After-returning)** ：在目标方法成功执行之后调用通知功能；
*   **异常通知(After-throwing)** ：在目标方法抛出异常之后调用通知功能；
*   **环绕通知(Around)** ：把整个目标方法包裹起来，在被调用前和调用之后分别调用通知功能。

### 1.3 AOP 简单示例

新建 Louzai 类：

```
@Data
@Service
public class Louzai {

    public void everyDay() {
        System.out.println("睡觉");
    }
}
```

添加 LouzaiAspect 切面：

```
@Aspect
@Component
public class LouzaiAspect {
    
    @Pointcut("execution(* com.java.Louzai.everyDay())")
    private void myPointCut() {
    }

    // 前置通知
    @Before("myPointCut()")
    public void myBefore() {
        System.out.println("吃饭");
    }

    // 后置通知
    @AfterReturning(value = "myPointCut()")
    public void myAfterReturning() {
        System.out.println("打豆豆。。。");
    }
}
```

applicationContext.xml 添加：

```
<!--启用@Autowired等注解-->
<context:annotation-config/>
<context:component-scan base-package="com" />
<aop:aspectj-autoproxy proxy-target-class="true"/>
```

程序入口：

```
public class MyTest {
    public static void main(String[] args) {
        ApplicationContext context =new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
        Louzai louzai = (Louzai) context.getBean("louzai");
        louzai.everyDay();
    }
}
```

输出：

```
吃饭
睡觉
打豆豆。。。
```

这个示例非常简单，“睡觉” 加了前置和后置通知，但是 Spring 在内部是如何工作的呢？

### 1.4 Spring AOP 工作流程

为了方便大家能更好看懂后面的源码，我先整体介绍一下源码的执行流程，让大家有一个整体的认识，否则容易被绕进去。

整个 Spring AOP 源码，其实分为 3 块，我们会结合上面的示例，给大家进行讲解。

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXMLw1cktM3ZpZ9zy1Jw5VrSVX5PKpt8audbKzrmun22v4FRdRRoEeCg/640?wx_fmt=png)

第一块就是**前置处理**，我们在创建 Louzai Bean 的前置处理中，会遍历程序所有的切面信息，然后**将切面信息保存在缓存中**，比如示例中 LouzaiAspect 的所有切面信息。

第二块就是**后置处理**，我们在创建 Louzai Bean 的后置处理器中，里面会做两件事情：

*   **获取 Louzai 的切面方法**：首先会从缓存中拿到所有的切面信息，和 Louzai 的所有方法进行匹配，然后找到 Louzai 所有需要进行 AOP 的方法。
*   **创建 AOP 代理对象**：结合 Louzai 需要进行 AOP 的方法，选择 Cglib 或 JDK，创建 AOP 代理对象。

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXZYMGUKSqUIK8nYQlE0Q1lUg4XBoO2ZZGO47mrYTBHeFWZBwbbbuYpg/640?wx_fmt=png)

第三块就是**执行切面**，通过“责任链 + 递归”，去执行切面。

## 2\. 源码解读

> 注意：Spring 的版本是 5.2.15.RELEASE，否则和我的代码不一样！！！

除了原理部分，上面的知识都不难，下面才是我们的重头戏，让你跟着楼仔，走一遍代码流程。

### 2.1 代码入口

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXLWvEvO4DDw5hpbeHpibibiaxQNM2K5gnQlZSKJP07icjzPzrzTFvr55qGA/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXg0UmpYyR0GCibSjuMNpTC7FyLkqIPWXibv9bNHevyNOFrJQ86tjJslZA/640?wx_fmt=png)

这里需要多跑几次，把前面的 beanName 跳过去，只看 louzai。

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXnWXQeIaR9QajdITQibKuYQmk020Rlth3XmMHvZY86iawibnEJBmtj6JIQ/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXAtS26F8ZSePx2De4aROVePWrrAOYRo4iaXb8pFGUNDSU1Fvh6vL8m7Q/640?wx_fmt=png)

进入 doGetBean()，进入创建 Bean 的逻辑。

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgX06ov3kiaLZYCB8tgbRUza9ZibiavQRwBylgKEkF52HC3NxAge4QWjmlsQ/640?wx_fmt=png)

### 2.2 前置处理

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXL2PD0YfIuXWEYiaqIicJibicJ41I6BHZNqJ8c3nlyxaS5Aibj8r1GRicXDdg/640?wx_fmt=png)

主要就是遍历切面，放入缓存。

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXTbYRFtnMpBianDgwico6jJG9BjfWKos5ctLmQPTFepmhbaeuLkVG9KlA/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXPQAM7x2Q7iavbMuAOsKtFRbXqGibGgdia6mpPbUY8xtcY9OiaLQDZIjcxg/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXAcmHlZib4QHs27ibsNh5I26R9zTgBwOtDIH5TGhwyhr5d40JH1U3iaHqA/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXtWhZOJHG1U4ODKEgN5Lj1ytfME9CK41SI6GsBFJFE5SwuXl2BFicTrQ/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXhCnibnyKkw6oqHQw1Zk2icLT4pfSs43eRV26ICUIt2e8VpFiaEUbmLgcw/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXLrlQudpfcVzVfficVL1iarSmeib4MubP8ibebpG6ibtghYBCDSAKS8Ymoxw/640?wx_fmt=png)

**这里是重点！敲黑板！！！**

1.  我们会先遍历所有的类；
2.  判断是否切面，只有切面才会进入后面逻辑；
3.  获取每个 Aspect 的切面列表；
4.  保存 Aspect 的切面列表到缓存 advisorsCache 中。

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXtfeRFaqM1VaSxH4UDSCI7wwOl1NAcMg6u9zxTXyAMicqL8LJMg1J58w/640?wx_fmt=png)

到这里，获取切面信息的流程就结束了，**因为后续对切面数据的获取，都是从缓存 advisorsCache 中拿到。**

下面就对上面的流程，再深入解读一下。

### 2.2.1 判断是否是切面

上图的第 2 步，逻辑如下：

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXEKetmAuX6Id6emNMU1nzBOAgssjQUVPhuXK2W9Op537SrzibIDaGpnw/640?wx_fmt=png)

### 2.2.2 获取切面列表

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgX0bxofHQAI1D0HfZptwaAbRYib3oa8o7Y4yPSdOLdrsOMmCweXodYFfg/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXAke9iaXXBEE7H2F1JPpLRD4nqHhOXyQSiboxGiaic07evLiaH7ASgxewGnw/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXCfPwrCyoGatkgfAEXY2mgrj45dSN45xk5tmSib0x5I6mg8jKPwLnoOg/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXEdtNy0ib7dkoXiabnkGb0vl87KElQnxQ3oaiczEfZgtmhusB4WqvfbwaA/640?wx_fmt=png)

进入到 getAdvice()，生成切面信息。

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXe2wBloKlC7KZ2IS52ql61q4G7iafluzcfFevkUO6DpjXsT2Z985Jjvg/640?wx_fmt=png)

### 2.3 后置处理

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXoN50ic2sd7IQUvtmQ7xAEYXdxZPUCPuZElUyzlic8oeBNtBjRY6ctDJw/640?wx_fmt=png)

主要就是从缓存拿切面，和 louzai 的方法匹配，并创建 AOP 代理对象。

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXqOn0gbza0BOEEZNuHia76DBHicXIX33lxyuNGCYlld2EeBJObicYjiaN3A/640?wx_fmt=png)

进入 doCreateBean()，走下面逻辑。

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXzAa6uXQpcA7HKr1zoopjjogMqqy6mDpicFXwnRAnTJzyIOBHUDN1OJQ/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXrfBemrVibHTPmibsTU6HjSWr7bBtDibb3Htt5ZAJtYztmbyvIGPzmGllA/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXX84QzReAlrENeR8605C9gvEL0FlJRTHryawI8LsLkm7QsnaxdUGibVA/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXxBpPqpPgBgAoVBLXYFFTzfehEt84A8FHG9437g70b72hpDLr75V7SA/640?wx_fmt=png)

**这里是重点！敲黑板！！！**

1.  先获取 louzai 类的所有切面列表；
2.  创建一个 AOP 的代理对象。

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgX7RBZleHVJNda7T3TJNSzAfx2ZDxOJiclb5Wqj4R9rZDfO1RMYAAmN4g/640?wx_fmt=png)

#### 2.3.1 获取切面

我们先进入第一步，看是如何获取 louzai 的切面列表。

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXRPRvz2gTdQkGuhsxxHlnQa287yUtrbgXpiboE6m7RrNLXJQPx9uNjLg/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXWpyNjcEblMQz77snp3z9vewRRArCjxxVYnXj1XIZia73b5GECzCYdkw/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXZss42L48ibuLvT7P7Ec3r183WT2aVcEKTE9eAtAP9XdhJZQ6pOcib0iag/640?wx_fmt=png)

进入 buildAspectJAdvisors()，这个方法应该有印象，就是前面将切面信息放入缓存 advisorsCache 中，现在这里就是要获取缓存。

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgX4bJ7cQDQH3ibqiaJCye7keOewzZUmkv9s4MYPGCBuGSEUswhslleqKUw/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXnpQfRYFc6sr4ldf3cqqVt4SKGMnpibVzq99HUAGSnlqj3ur5gq4bxPA/640?wx_fmt=png)

再回到 findEligibleAdvisors()，从缓存拿到所有的切面信息后，继续往后执行。

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXkUianicWAnd8wfe4ia8n3FCh6HicJn2T9Z38LsoY0CXLn9pTb7Uib461bqQ/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXWnoDfJLf3Udia568cLLdXGIPqbbEL970dABB7Yx15krucibBbjiaVN35w/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXuJxFeu1NicMrophoQIbXJa6ric2jVH9IJjVCBdcy9Y9nQ0vBzj7iaPFDQ/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXzD6BkO2NAoNjEibDwbs84xAMI2Lm0FMfv30l11UJOEnyrH5YyUoyKuQ/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXszRcBmQ4f9FEnRrgKPZMfI5PzeSFdodoJhuqNfI8vFHL2ibzgpMc8LA/640?wx_fmt=png)

#### 2.3.2 创建代理对象

有了 louzai 的切面列表，后面就可以开始去创建 AOP 代理对象。

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXHz46t9AR7Xj20NACWzgrGAt829NeNsdxtBATKgkxWI7jdFSo5Tvd4Q/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXTx2X6eHfcjY4UDXKwl4qgJZq8iblTgzcFOlbA6MicEH9fy8CYt7aWK9A/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXsAVALC1Xic0ibqD5oA1jYLUFvjIiaB4ZaRK0lvOg3M0YGN6fdjSfnoHfg/640?wx_fmt=png)

**这里是重点！敲黑板！！！**

这里有 2 种创建 AOP 代理对象的方式，我们是选用 Cglib 来创建。

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXD1R0UAR5CjbADYEBiaUpHkBD0IlvH0vX8XGAMOnm0kpo0VmBGlD749A/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXnGnVGJ135yMaMgicyCtzxiaiaNjwef2HzJ9ZnwDbxqKU35I2OIcQQVJNg/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXTNvnqKQgG7mrZrI4QWbMoIYia1DicmPZ0lkMCUibcmg8kryYicCe7ooG7Q/640?wx_fmt=png)

我们再回到创建代理对象的入口，看看创建的代理对象。

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXvTZG36YI6J77NcJJOzmNdmIsVmsKz9IDKNE5HXb17zDCibg4G5gkb1Q/640?wx_fmt=png)

### 2.4 切面执行

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXoa2fdcCEzA7E8UaoFvY5xzQsokAWM4hZq9AChp8qZ4AvatJ3se7Q3g/640?wx_fmt=png)

通过 “责任链 + 递归”，执行切面和方法。

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXlQa3Ik2ibN9p2HzJoD5uPnrqMfv39vXp8UibIPg8D4rF5fQlrgZI2uQg/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXGUaCZjSy03s4kTI7leJpvibtB2ILibKjiae3L2JUP8sicwmiaTia9PiaKDPmA/640?wx_fmt=png)

**前方高能！这块逻辑非常复杂！！！**

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgX8MGs3uHzSmptWm1VEgkwuSzMeCZvAGWFTjXrHm2LblxDOxh5dTSDrw/640?wx_fmt=png)

下面就是“执行切面”最核心的逻辑，简单说一下设计思路：

1.  **设计思路**：采用递归 + 责任链的模式；
2.  **递归**：反复执行 CglibMethodInvocation 的 proceed()；
3.  **退出递归条件**：interceptorsAndDynamicMethodMatchers 数组中的对象，全部执行完毕；
4.  **责任链**：示例中的责任链，是个长度为 3 的数组，每次取其中一个数组对象，然后去执行对象的 invoke（）。

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXPCcBzSWf43F20rOK1IicpFbN1JbwxPssiccuRFbIAicI7ibbORlRLjbjJw/640?wx_fmt=png)

因为我们数组里面只有 3 个对象，所以只会递归 3 次，下面就看这 3 次是如何递归，责任链是如何执行的，设计得很巧妙！

#### 2.4.1 第一次递归

数组的第一个对象是 ExposeInvocationInterceptor，执行 invoke（），**注意入参是 CglibMethodInvocation。**

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgX2IbVCpF30CrlKxicKiajeGUdvF7vCS1q60bpc57MIATWgqyomofiaBagA/640?wx_fmt=png)

里面啥都没干，继续执行 CglibMethodInvocation 的 process()。

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgX6QHIWdGHqfInlKOicc9r65xysIXs4bgd1GyP24J7boictGyWXyjibsgkQ/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXSOJmBdA7YkITJepHMoLibm2U1CkhuZNCa0A2dfxNwWcHWG5x2RQelZQ/640?wx_fmt=png)

#### 2.4.2 第二次递归

数组的第二个对象是 MethodBeforeAdviceInterceptor，执行 invoke（）。

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgX9GLD6g9jEEeGrZuDhqnHCsW6MMfLSDFILb6wB1wsegkKKGZbwleLMA/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXLdS4S0kkQy1eN9uS8cCcTdXUEa4aZia7Biaq08QT0BK4Khko8RoH2RSA/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXmjS6xsnV0PPR8jYpWVfTCFiaic1rW6wZ3XhyFTRgVCkorK41tJeOIl5Q/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXCJywozWpKyhsNq3iaMDcS8F5IYS7iaEIoKcvUdXdA7k9VlPNPlBHpOCw/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXebA3iapPwJIZNhYmu6xevdp3icMGVbbYVO1iaK3Q1icicNoA9pU9uibEsjDA/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXicogqOjgtK0RpO7gaZJicDTmhqibyRAN64Bjol5iaQakK7vSDsHFiaDVORA/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXkPz6zRAVFcfOP7tSgCCkSLwH3GZ5Xqu5owhKbjmkgvQoy9UzVGhYTg/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXXwHHGu6WI1yqarB0BlI3YSz9ibKYmicAwyHFcYMAjPe0pgfwuCZ9IpLw/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXbZMIMkUHXCPdqCb9AYTXvIc0cxLRS9dkCbbM5IW91sdHxULDvotQqg/640?wx_fmt=png)

#### 2.4.3 第三次递归

数组的第二个对象是 AfterReturningAdviceInterceptor，执行 invoke（）。

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXDibiaWWnaD0qiaR0W5xloBTag0sgnIVQQaRSibGe66Gq9tXsibVByoMkwRQ/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXc8n4VTq3KpXzbZemp6y859syJZaGLvLsjd3x1SSa2WLDvx9MbbkIiaw/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXUYYy4uZNvXwiajRzXWI5EFAQDm8ArvoBAVzzQxUhNu6cNWZvmg3jyiaA/640?wx_fmt=png)

执行完上面逻辑，就会退出递归，我们看看 invokeJoinpoint() 的执行逻辑，其实就是执行主方法。

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXQT5Tr1q2HO2KfRSvwD2cOpIRhBuib6gIwUfYj5WKsPgYFUBgA1pypVQ/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXHsShkQvMejnSUuqfFVpT3knC9ia7RFu6pzHhibNBB5JFKwBw8L7nR0vA/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXickQvloYQDr8xU3OTV1zibdylDgqdibUVRHmXTQV7M5qs3Lw4giaD6T9uA/640?wx_fmt=png)

再回到第三次递归的入口，继续执行后面的切面。

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXJuvXiahNtMxJUuXqFktOMbMFecq2icGwPH5RauGuNpK9fRfev5ibmUORw/640?wx_fmt=png)

切面执行逻辑，前面已经演示过，直接看执行方法。

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXAgHxG0CgE6vfNH9ibwNyarjYhzibMoLVJQdGQcic6BcjqZ7VFS0HicPoug/640?wx_fmt=png)

后面就依次退出递归，整个流程结束。

#### 2.4.4 设计思路

这块代码，我研究了大半天，因为这个不是纯粹的责任链模式。

纯粹的责任链模式，对象内部有一个自身的 next 对象，执行完当前对象的方法末尾，就会启动 next 对象的执行，直到最后一个 next 对象执行完毕，或者中途因为某些条件中断执行，责任链才会退出。

这里 CglibMethodInvocation 对象内部没有 next 对象，全程是通过 interceptorsAndDynamicMethodMatchers 长度为 3 的数组控制，依次去执行数组中的对象，直到最后一个对象执行完毕，责任链才会退出。

**这个也属于责任链，只是实现方式不一样，后面会详细剖析**，下面再讨论一下，这些类之间的关系。

我们的主对象是 CglibMethodInvocation，继承于 ReflectiveMethodInvocation，然后 process() 的核心逻辑，其实都在 ReflectiveMethodInvocation 中。

**ReflectiveMethodInvocation 中的 process() 控制整个责任链的执行。**

ReflectiveMethodInvocation 中的 process() 方法，里面有个长度为 3 的数组 interceptorsAndDynamicMethodMatchers，里面存储了 3 个对象，分别为 ExposeInvocationInterceptor、MethodBeforeAdviceInterceptor、AfterReturningAdviceInterceptor。

**注意！！！这 3 个对象，都是继承 MethodInterceptor 接口。**

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHXVoKO8o3pDpp4GTDPvAgXzwThDnpLUZnGIWelavPib0TyTTUkWeVYByxqWQMJsah3aGQ0AicxJHmw/640?wx_fmt=png)

然后每次执行 invoke() 时，里面都会去执行 CglibMethodInvocation 的 process()。

**是不是听得有些蒙圈？甭着急，我重新再帮你梳理一下。**

对象和方法的关系：

*   **接口继承**：数组中的 3 个对象，都是继承 MethodInterceptor 接口，实现里面的 invoke() 方法；
*   **类继承**：我们的主对象 CglibMethodInvocation，继承于 ReflectiveMethodInvocation，复用它的 process() 方法；
*   **两者结合（策略模式）**：invoke() 的入参，就是 CglibMethodInvocation，执行 invoke() 时，内部会执行 CglibMethodInvocation.process()，这个其实就是个策略模式。

> 可能有同学会说，invoke() 的入参是 MethodInvocation，没错！但是 CglibMethodInvocation 也继承了 MethodInvocation，不信自己可以去看。

执行逻辑：

*   **程序入口**：是 CglibMethodInvocation 的 process() 方法；
*   **链式执行（衍生的责任链模式）**：process() 中有个包含 3 个对象的数组，依次去执行每个对象的 invoke() 方法。
*   **递归（逻辑回退）**：invoke() 方法会执行切面逻辑，同时也会执行 CglibMethodInvocation 的 process() 方法，让逻辑再一次进入 process()。
*   **递归退出**：当数字中的 3 个对象全部执行完毕，流程结束。

所以这里设计巧妙的地方，是因为纯粹责任链模式，里面的 next 对象，需要保证里面的对象类型完全相同。

但是数组里面的 3 个对象，里面没有 next 成员对象，所以不能直接用责任链模式，那怎么办呢？就单独搞了一个 CglibMethodInvocation.process()，通过去无限递归 process()，来实现这个责任链的逻辑。

**这就是我们为什么要看源码，学习里面优秀的设计思路！**

## 3\. 总结

我们再小节一下，文章先介绍了什么是 AOP，以及 AOP 的原理和示例。之后再剖析了 AOP 的源码，分为 3 块：

*   将所有的切面都保存在缓存中；
*   取出缓存中的切面列表，和 louzai 对象的所有方法匹配，拿到属于 louzai 的切面列表；
*   创建 AOP 代理对象；
*   通过“责任链 + 递归”，去执行切面逻辑。


今天的源码解析就到这，Spring 相关的源码，还有哪些是大家想学习的呢，可以留言。

* * *

没有什么使我停留——除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟。

- [今年这情况，拿到这俩offer不错了](https://mp.weixin.qq.com/s/xxl1qOKQUrVoO-bRJorE6Q)
- [愤怒，竟然还有学校在教JSP](https://mp.weixin.qq.com/s/byM6khHVNMXOpG3oaBGsQg)
- [曝光秋招毁约公司](https://mp.weixin.qq.com/s/gOuoM27tl4l6GW7aqZu98Q)
- [垃圾外包，离职也罢](https://mp.weixin.qq.com/s/3Iry19JaEoN4pA3-JDtVhw)
- [非科班转码](https://mp.weixin.qq.com/s/CyJAVQza-9zmDdboStKe8w)
- [推荐 10 个神级 Intellij IDEA 插件](https://mp.weixin.qq.com/s/4qHRBcJn1AvP07U4H6JcOQ)
- [美团率先开奖 24k，不甘心？](https://mp.weixin.qq.com/s/MGqyie9KvD6kH8Tuv2mqOw)
- [Fleet，Java 轻量级 IDE 的未来？](https://mp.weixin.qq.com/s/Pu1cddsQOiMfCU4I96iygQ)
- [先不管那么多，offer 接了再说](https://mp.weixin.qq.com/s/9f_sOLiRwDS3pzC-mJ9jLQ)
- [一套 KTV 管理系统，估价 3 万还是 30 万？](https://mp.weixin.qq.com/s/zYLEUmbfmiKeFk03e1TxbA)



![](https://files.mdnice.com/user/3903/b7e50cf4-6fca-4511-9bfd-aa1ed9eb587b.png)