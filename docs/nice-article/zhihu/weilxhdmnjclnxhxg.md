---
title: 如何快速提升你的编码能力？
shortTitle: 如何快速提升你的编码能力？
description: 4年了，我一直坚持“抄袭”别人的代码，有时“抄”同事的，有时“抄”框架的，偶尔也“抄”网友的。为什…
tag:
  - 优质文章
author: 知乎用户
category:
  - 知乎
head:
  - - meta
    - name: keywords
      content: 前端开发,程序员,Python,SQL,Java
---

开门见山地说吧！

十多年了，我一直坚持“抄”别人的代码，有时“抄”同事的，有时“抄”框架的，偶尔也“抄”网友的，这种“抄”的习惯让我的编码能力有了质的飞跃。

## 为什么要抄？

“抄”这个词可能听起来没那么高雅，换个高级点的：造轮子。

不是已经有 Spring 了吗？不是有 hutool 工具包了吗？直接搬过来用不香吗？

**但我仍然鼓励大家在自己可控范围内尝试造轮子，因为造轮子对你的成长是巨大的。**

造轮子并不简单，它往往会用到很多高级的知识点和技巧。以 Java 为例，如果你要造一个 Mini-MyBatis-Plus，你起码要懂得：

- JDBC
- 反射
- 泛型
- 注解
- 动态代理
- 函数式编程
- 策略模式
- 模板方法模式
- ....

这样一来，为了造出这样一个稍微像样点的轮子，你必须强迫自己搞懂这些高级知识点，并且结合自己的需求灵活运用。

最后，轮子造完跑起来以后，一定会遇到各种问题，解决问题的过程中你又得到了成长。

提高编码能力的方法，说穿了就一个字：抄、抄，还是 TMD 的 抄！其实绝大多数程序员在绝大多时候都是在抄别人的代码，只不过潜意识觉得自己在原创罢了。

## 怎么抄？

那么，怎么“抄”才是有效的呢？**必须结合自己的实际需求，做好“本土化”。来造一个 RetryUtil 吧！**

### 发现问题

有一天，我发现项目中有一个接口很不稳定，时不时就会调用失败。经过排查，发现它调用了一个第三方 SDK，但由于第三方接口不是很稳定，偶尔会出现网络错误。我想，这很简单，直接 for 循环多调用几次就行了：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/zhihu-weilxhdmnjclnxhxg-70173f4d-6904-4bb3-84c7-0722825c0160.jpg)

正当我准备改代码时，职业习惯促使我 ctrl+shift+f 全局搜了一下，发现已经有好几处类似的代码了。于是，我认为应该做一下方法抽取。

### 整理需求

但是把好几处类似的代码摆在一起对比后，我犯愁了：

- 有些方法**有返回值**、有些方法**没有返回值**
- 有些方法抛异常时重试
- 有些方法内部捕获了异常，通过判断 Result.isSuccess()判断是否重试

于是，我觉得还是算了，看看有没有现成的工具吧。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/zhihu-weilxhdmnjclnxhxg-25fdbf74-e133-4bd6-92fe-94324f759dce.jpg)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/zhihu-weilxhdmnjclnxhxg-1ba20865-0653-4c6b-a44e-7acf27753bae.jpg)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/zhihu-weilxhdmnjclnxhxg-f5cd1f28-dbf4-4ff0-b89a-a2f30286b862.jpg)

卧槽，这什么玩意啊，这么复杂。我的需求其实很简单，不需要这么复杂的 API，我还是努力一下自己封装一个好了。

### 先做一个粗糙的轮子

首先，我确定了要用函数式接口+泛型。使用泛型是看重它的代码模板能力，比如重试的代码中都有个 for 循环，就可以**抽取为模板**。函数式接口可以很方便地**把代码中变化的部分和稳定的部分剥离开**，比如需要重试的方法都是不同的，可以通过函数式接口剥离出去。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/zhihu-weilxhdmnjclnxhxg-21501f9f-9222-442a-a9bb-64cf21d59d75.jpg)

嗯，看起来还不赖嘛，有点大家风范。哦，忘了兼容没有返回值的方法了，加一个：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/zhihu-weilxhdmnjclnxhxg-e13e425b-2b22-4b84-b64a-44d1d74a0887.jpg)

目前 RetryUtil 还存在比较多的问题。

### 加入重试次数、时间间隔

比如，它的重试并没有时间间隔，**一旦失败立即重试，很大概率还是失败，**甚至给下游造成更大负担。看看别人怎么处理的，比如 Guava：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/zhihu-weilxhdmnjclnxhxg-872744dc-d29f-41be-90f5-85f9c8ffde05.jpg)

很好，“抄”过来：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/zhihu-weilxhdmnjclnxhxg-640a45e5-f68a-40ca-9490-a419a82e12ce.jpg)

### 加入异常处理

又比如，最后一次重试仍旧失败时，我们如果还想捕获异常呢？由于目前工具里直接写死了 throw e，我们只能在外部捕获：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/zhihu-weilxhdmnjclnxhxg-c3e327e3-dab9-4078-8439-de67aab4f503.jpg)

我想要优雅一点，风格统一些：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/zhihu-weilxhdmnjclnxhxg-39f55c2d-fac6-4f26-bede-5ddfd9e3e931.jpg)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/zhihu-weilxhdmnjclnxhxg-58f90b6f-d277-49a8-a40b-76cbd1dfd3eb.jpg)

在里面顺便处理异常。

### 允许结果重试

最后一个问题，现在代码里很多重试的地方并不会抛异常，而我们上面的重试都是依赖于抛异常，只有抛异常才会重试！如果不抛异常，怎么指定重试规则呢？

学一下 Guava 的：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/zhihu-weilxhdmnjclnxhxg-70fb43d2-276d-4386-b2f1-11341435492a.jpg)

好， 继续“抄”（结果重试只针对有返回值的，上面演示的都是没返回值的方法）：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/zhihu-weilxhdmnjclnxhxg-16bb1fd8-d124-4119-874c-190e9e1eeb30.jpg)

### 引入 Builder，简化使用

最后，都抄到这了，不如把人家 Builder 模式也抄过来吧。倒不是说 Builder 模式好，毕竟本身一个 Util 能做的，原则上不需要 Builder 额外创建对象浪费内存。但我们上面这个方法，参数太多了！在实际项目中用起来可能会比较臃肿：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/zhihu-weilxhdmnjclnxhxg-f9b0fcda-fe3f-4538-8b58-226c96d7d96e.jpg)

改造成 Builder：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/zhihu-weilxhdmnjclnxhxg-799f8cb1-cac7-4dde-88fd-ddee95682ddb.jpg)

## 最后

好，写到这我突然发现，一开始百度时看到的是 Spring-Retry，太复杂了，但 Guava 的其实蛮好用的，那就直接用 Guava 的吧。

虽然最终没用上自己的 RetryUtil，但我已经具备造出 Guava-Retry 的能力了。生活中很多时候是这样的，群里一个 BUG 跑出来，虽然你也努力了很久，甚至你也发现问题所在，但同事已经解决了。但不必沮丧，你已经收获了很多。

祝大家周末遇快~

> 参考链接：[https://www.zhihu.com/question/535244045/answer/2563968996](https://www.zhihu.com/question/535244045/answer/2563968996)，整理：沉默王二
