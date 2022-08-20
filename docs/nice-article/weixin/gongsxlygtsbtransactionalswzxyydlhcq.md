---
title: 公司新来一个同事，把 @Transactional 事务注解运用得炉火纯青...
shortTitle: 公司新来一个同事，把 @Transactional 事务注解运用得炉火纯青...
description: 谈谈 @Transactional 的原理和坑。
author: 楼仔
category:
  - 微信公众号
head:
---

Java 后端面试的时候，面试官经常会问到 @Transactional 的原理，以及容易踩的坑，之前一面百度，就遇到过，今天就带大家把这几块知识吃透。

这篇文章，**会先讲述 @Transactional 的 4 种不生效的 Case，然后再通过源码解读，分析 @Transactional 的执行原理，以及部分 Case 不生效的真正原因。**

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLEVXv0Hy3YPBibWjlhRHrgopd8GibpH0Mf2MflkrxCOeuibLafv4Gd9tYChNFtFguFu44NwXP0pD1rBg/640?wx_fmt=png)

## 项目准备

下面是 DB 数据和 DB 操作接口：

uid|uname|usex|
---|---|---|
1|张三|女|
2|陈恒|男|
3|楼仔|男|

```
// 提供的接口
public interface UserDao {
    // select * from user_test where uid = "#{uid}"
    public MyUser selectUserById(Integer uid);
    // update user_test set uname =#{uname},usex = #{usex} where uid = #{uid}
    public int updateUser(MyUser user);
}
```

基础测试代码，testSuccess() 是事务生效的情况：

```
@Service
public class UserController {
    @Autowired
    private UserDao userDao;

    public void update(Integer id) {
        MyUser user = new MyUser();
        user.setUid(id);
        user.setUname("张三-testing");
        user.setUsex("女");
        userDao.updateUser(user);
    }

    public MyUser query(Integer id) {
        MyUser user = userDao.selectUserById(id);
        return user;
    }

    // 正常情况
    @Transactional(rollbackFor = Exception.class)

    public void testSuccess() throws Exception {
        Integer id = 1;
        MyUser user = query(id);
        System.out.println("原记录:" + user);
        update(id);
        throw new Exception("事务生效");
    }
}
```

## 事务不生效的几种 Case

主要讲解 4 种事务不生效的 Case：

*   **类内部访问**：A 类的 a1 方法没有标注 @Transactional，a2 方法标注 @Transactional，在 a1 里面调用 a2；
*   **私有方法**：将 @Transactional 注解标注在非 public 方法上；
*   **异常不匹配**：@Transactional 未设置 rollbackFor 属性，方法返回 Exception 等异常；
*   **多线程**：主线程和子线程的调用，线程抛出异常。

### Case 1: 类内部访问

我们在类 UserController 中新增一个方法 testInteralCall()：

```
public void testInteralCall() throws Exception {
    testSuccess();
    throw new Exception("事务不生效：类内部访问");
}
```

这里 testInteralCall() 没有标注 @Transactional，我们再看一下测试用例：

```
public static void main(String[] args) throws Exception {
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
    UserController uc = (UserController) applicationContext.getBean("userController");
    try {
        uc.testSuccess();
    } finally {
        MyUser user =  uc.query(1);
        System.out.println("修改后的记录:" + user);
    }
}
// 输出：
// 原记录:MyUser(uid=1, uname=张三, usex=女)
// 修改后的记录:MyUser(uid=1, uname=张三-testing, usex=女)
```

从上面的输出可以看到，事务并没有回滚，这个是什么原因呢？

因为 @Transactional 的工作机制是基于 AOP 实现，AOP 是使用动态代理实现的，如果通过代理直接调用 testSuccess()，通过 AOP 会前后进行增强，增强的逻辑其实就是在 testSuccess() 的前后分别加上开启、提交事务的逻辑，后面的源码会进行剖析。

现在是通过 testInteralCall() 去调用 testSuccess()，testSuccess() 前后不会进行任何增强操作，也就是**类内部调用，不会通过代理方式访问。**

> 如果还是不太清楚，推荐再看看这篇文章，里面有完整示例，非常完美诠释“类内部访问”不能前后增强的原因：https://blog.csdn.net/Ahuuua/article/details/123877835

### Case 2: 私有方法

在私有方法上，添加 @Transactional 注解也不会生效：

```
@Transactional(rollbackFor = Exception.class)

private void testPirvateMethod() throws Exception {
    Integer id = 1;
    MyUser user = query(id);
    System.out.println("原记录:" + user);
    update(id);
    throw new Exception("测试事务生效");
}
```

直接使用时，下面这种场景不太容易出现，因为 IDEA 会有提醒，文案为: Methods annotated with '@Transactional' must be overridable，**至于深层次的原理，源码部分会给你解读。**

### Case 3: 异常不匹配

这里的 @Transactional 没有设置 rollbackFor = Exception.class 属性：

```
@Transactional
public void testExceptionNotMatch() throws Exception {
    Integer id = 1;
    MyUser user = query(id);
    System.out.println("原记录:" + user);
    update(id);
    throw new Exception("事务不生效：异常不匹配");
}
```

```
测试方法：同 Case1

// 输出：
// 原记录:User[uid=1,uname=张三,usex=女]
// 修改后的记录:User[uid=1,uname=张三-test,usex=女]
```

@Transactional 注解默认处理运行时异常，即只有抛出运行时异常时，才会触发事务回滚，否则并不会回滚，**至于深层次的原理，源码部分会给你解读。**

### Case 4: 多线程

下面给出两个不同的姿势，一个是子线程抛异常，主线程 ok；一个是子线程 ok，主线程抛异常。

#### 父线程抛出异常

父线程抛出异常，子线程不抛出异常：

```
public void testSuccess() throws Exception {
    Integer id = 1;
    MyUser user = query(id);
    System.out.println("原记录:" + user);
    update(id);
}
@Transactional(rollbackFor = Exception.class)

public void testMultThread() throws Exception {
    new Thread(new Runnable() {
        @SneakyThrows
        @Override
        public void run() {
            testSuccess();
        }
    }).start();
    throw new Exception("测试事务不生效");
}
```

父线程抛出线程，事务回滚，因为子线程是独立存在，和父线程不在同一个事务中，所以子线程的修改并不会被回滚，

#### 子线程抛出异常

父线程不抛出异常，子线程抛出异常：

```
public void testSuccess() throws Exception {
    Integer id = 1;
    MyUser user = query(id);
    System.out.println("原记录:" + user);
    update(id);
    throw new Exception("测试事务不生效");
}
@Transactional(rollbackFor = Exception.class)

public void testMultThread() throws Exception {
    new Thread(new Runnable() {
        @SneakyThrows
        @Override
        public void run() {
            testSuccess();
        }
    }).start();
}
```

由于子线程的异常不会被外部的线程捕获，所以父线程不抛异常，事务回滚没有生效。

## 源码解读

**下面我们从源码的角度，对 @Transactional 的执行机制和事务不生效的原因进行解读。**

### @Transactional 执行机制

我们只看最核心的逻辑，代码中的 interceptorOrInterceptionAdvice 就是 TransactionInterceptor 的实例，入参是 this 对象。

> 红色方框有一段注释，大致翻译为 “它是一个拦截器，所以我们只需调用即可：在构造此对象之前，将静态地计算切入点。”

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLEVXv0Hy3YPBibWjlhRHrgopbs04cKPPJFDP7VecYRXQELIFwiaScflkna0v0Gia07G2vJ8cBgXUE9ug/640?wx_fmt=png)

this 是 ReflectiveMethodInvocation 对象，成员对象包含 UserController 类、testSuccess() 方法、入参和代理对象等。

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLEVXv0Hy3YPBibWjlhRHrgopVqnRtRiaOYgRgt8EuTcvpTa4w8qF1mXYRMsEuoyyj5WjUv9UegATqpw/640?wx_fmt=png)

进入 invoke() 方法后：

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLEVXv0Hy3YPBibWjlhRHrgopM497ibd1wRP8Gws4NricpFj8RFp19XpU5Qcxk7bu3T5ehglVUkibSXqdQ/640?wx_fmt=png)

**前方高能！！！这里就是事务的核心逻辑，包括判断事务是否开启、目标方法执行、事务回滚、事务提交。**

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLEVXv0Hy3YPBibWjlhRHrgopM8OJcL69clRRX9d1KOWIGmBYROA8Rdl4m6Iu81ic8lZE03Zc8TDOPng/640?wx_fmt=png)

### private 导致事务不生效原因

在上面这幅图中，第一个红框区域调用了方法 getTransactionAttribute()，主要是为了获取 txAttr 变量，它是用于读取 @Transactional 的配置，如果这个 txAttr = null，后面就不会走事务逻辑，我们看一下这个变量的含义：

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLEVXv0Hy3YPBibWjlhRHrgopJggk7HaG9qCLvs30bab352r5KmDvXMfkF2riaXRXS2jVoaZ2Qg8X3Iw/640?wx_fmt=png)

我们直接进入 getTransactionAttribute()，重点关注获取事务配置的方法。

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLEVXv0Hy3YPBibWjlhRHrgopY7BlcjB0kLMHu6jo8G5icLBOIbDttx9lu10iadOW3R2Dg9g6P2BGtq0w/640?wx_fmt=png)

**前方高能！！！这里就是 private 导致事务不生效的原因所在**，allowPublicMethodsOnly() 一直返回 false，所以重点只关注 isPublic() 方法。

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLEVXv0Hy3YPBibWjlhRHrgopFkjibxDQiauLE9X8t7EWGkVUMoZmaqHILat6tmCuibVptQmdNAOQmKuLg/640?wx_fmt=png)

下面通过位与计算，判断是否为 Public，对应的几类修饰符如下：

*   PUBLIC: 1
*   PRIVATE: 2
*   PROTECTED: 4

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLEVXv0Hy3YPBibWjlhRHrgop7ibzbiaBHUBRvETKc6crCEKDk766uLXxzvKLkYxicqg7p7az6sibhXz9Bw/640?wx_fmt=png)

看到这里，是不是豁然开朗了，有没有觉得很有意思呢~~

### 异常不匹配原因

我们继续回到事务的核心逻辑，因为主方法抛出 Exception() 异常，进入事务回滚的逻辑：

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLEVXv0Hy3YPBibWjlhRHrgopHpoxhBiaWGeeZ95eo9FEVbIOqTwc9jYzfRYZQ45arQr2Q11Ms8ZQ5xQ/640?wx_fmt=png)

进入 rollbackOn() 方法，判断该异常是否能进行回滚，这个需要判断主方法抛出的 Exception() 异常，是否在 @Transactional 的配置中：

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLEVXv0Hy3YPBibWjlhRHrgopyJMlEsvfdOAt3dpSQkenABSVgDBSAYyibibiatb7wBCNHmeMJt5DLbo7Q/640?wx_fmt=png)

我们进入 getDepth() 看一下异常规则匹配逻辑，因为我们对 @Transactional 配置了 rollbackFor = Exception.class，所以能匹配成功：

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLEVXv0Hy3YPBibWjlhRHrgopsoFDrWJqhk8D18wTiah3JrKEj6TZ9yHo1YqticIKtPCySRGrhbLHjMqA/640?wx_fmt=png)

示例中的 winner 不为 null，所以会跳过下面的环节。但是当 winner = null 时，也就是没有设置 rollbackFor 属性时，会走默认的异常捕获方式。

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLEVXv0Hy3YPBibWjlhRHrgopAV842D3iaJkPtq3oLq3GIeC8ElHSiaqxlhxnSwSTiauCZw2TSiaGpcaNrg/640?wx_fmt=png)

**前方高能！！！这里就是异常不匹配原因的原因所在**，我们看一下默认的异常捕获方式：

![](https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLEVXv0Hy3YPBibWjlhRHrgopwIWT3Vwo03zOTrLrUeTSvUlPmJxxHeJqWe3b8TkWdPWJw5rrvwKU5g/640?wx_fmt=png)

是不是豁然开朗，**当没有设置 rollbackFor 属性时，默认只对 RuntimeException 和 Error 的异常执行回滚。**

* * *


一个人可以走得很快，但一群人才能走得更远。欢迎加入[二哥的编程星球](https://mp.weixin.qq.com/s/e5Q4aJCX9xccTzBBGepx4g)，里面的每个球友都非常的友善，除了鼓励你，还会给你提出合理的建议。星球提供的三份专属专栏《Java 面试指南》、《编程喵 🐱（Spring Boot+Vue 前后端分离）实战项目笔记》、《Java 版 LeetCode 刷题笔记》，干货满满，价值连城。

![](https://files.mdnice.com/user/3903/0c9e5f37-f702-4799-9a56-0ad87173e875.png)

![](https://files.mdnice.com/user/3903/93ef3f1d-10f1-433a-932e-d5ba45cd61ee.png)

![](https://files.mdnice.com/user/3903/16199e4c-5e44-4924-abcb-46a6e1e1bc0f.png)

已经有 **670 多名** 小伙伴加入[二哥的编程星球](https://mp.weixin.qq.com/s/e5Q4aJCX9xccTzBBGepx4g)了，如果你也需要一个良好的学习氛围，[戳链接](https://mp.weixin.qq.com/s/e5Q4aJCX9xccTzBBGepx4g)加入我们的大家庭吧！这是一个 Java 学习指南 + 编程实战 + LeetCode 刷题的私密圈子，你可以向二哥提问、帮你制定学习计划、跟着二哥一起做实战项目，冲冲冲。


![](https://files.mdnice.com/user/3903/7df1a7b2-320e-410a-96fa-9000550419b9.png)


![](https://files.mdnice.com/user/3903/aca75f2f-6ade-40b2-93ce-668c41db5d2e.png)


* * *

没有什么使我停留——除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟。

**推荐阅读**：

- [今年这情况，真有点想读研了](https://mp.weixin.qq.com/s/ja_fEGFBBWM3TLhdT0aeMw)
- [专升本上岸的秘诀](https://mp.weixin.qq.com/s/yH42DxmRBSjrr0SW9N3MFg)
- [愤怒，一个破培训班要价 28 万](https://mp.weixin.qq.com/s/miOagyv4x3HrqVaU38uh4w)
- [公司不卡学历，却担心自己实力不够](https://mp.weixin.qq.com/s/s7KwW0cw2ZPR60SPFc6K0Q)
- [今年面试有点小难，还是要冲](https://mp.weixin.qq.com/s/iETW0dCfxxTTiRt1-WmeNw)
- [人生当中挣到的第一个 1 万元](https://mp.weixin.qq.com/s/9Naa2r7Xkf9D4d9tqEdgVQ)
- [新一代开源免费的终端工具，太酷了](https://mp.weixin.qq.com/s/2IUe50xBhuEWKDzARVd51A)
- [Java 后端四件套学习资料](https://mp.weixin.qq.com/s/3lqp4x1B5LI1hNjWAi6v1g)

>参考链接：[https://mp.weixin.qq.com/s/APhxZ7ddmU8d9SEOr4w-iQ](https://mp.weixin.qq.com/s/APhxZ7ddmU8d9SEOr4w-iQ)，出处：macrozheng，整理：沉默王二
