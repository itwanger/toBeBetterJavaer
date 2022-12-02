---
title: Java 后端有哪些淘汰掉的技术？劝退。。。
shortTitle: 一些已经淘汰的 Java 技术，别再学了！
description: 为什么说不要再学这些技术了
category:
  - 微信公众号
---

> [二哥的编程星球](https://mp.weixin.qq.com/s/CljCSezUgoBXb-T9wbIGww)已经有 **1100 多名** 球友加入了，如果你也需要一个良好的学习氛围，[戳链接](https://mp.weixin.qq.com/s/hXXBTPPkFj2VMg_GXqn4EA)加入我们吧！这是一个编程学习指南+ Java项目实战+LeetCode 刷题的私密圈子，你可以阅读星球专栏、向二哥提问、帮你制定学习计划、和球友一起打卡成长，冲冲冲。

大家好，我是二哥。经常碰到有些小伙伴说自己不知道该学什么，不该学什么，尤其是 Java 后端这么多要学的技术，不知道怎么抉择。

针对这个问题，我很佩服的一位大佬沈世钧老师给出了答案，回答非常专业，分享给大家作为参考。

> 原文链接：https://www.zhihu.com/question/305924723/answer/557800752



* * *



我判断哪些技术不用学习的依据主要有以下几点：

1.  实际开发能否用到？
2.  是否有助于加深对技术的理解？
3.  对面试是否有用？

## JSP

JSP在实际开发中，主要是作为MVC模型中的V（View）层出现的。当然，View层的渲染技术除了JSP，还有FreeMaker、Velocity等。

JSP作为页面模板，在后端通过MVC框架渲染成HMTL，然后再发送到客户端（例如浏览器）来呈现。这也就是我们常说的“前后端不分离”，“混合式”开发。

而当前，包括我所在的公司，以及大部分互联网公司。要么已经抛弃这种模式，要么正在抛弃的路上，而转向彻底地 “前后端分离”。

在“前后端分离”模式下，后端只负责提供服务接口（例如REST），而前端（例如HTML5）通过接口发送/获取，呈现数据（例如JSON格式）。

这样，在后端，原来的MVC框架，某种意义上已经演变为MC框架。因此，与V（View）相关的一切模板技术都失去了学习的必要，其中当然也包括JSP。所以，后来的Java学习者，我的建议是：

“*完全可以放弃对JSP的学习*。”

## Struts

在Java后端开发中，MVC模型还是主流。而Struts作为一个MVC框架，单从技术上来说，还是很优秀的。

但是，现在Spring实在是太强势了，越来越成为Java开发中的“一站式”工具包，其中的一个利器就是Spring MVC。

望名知意，Spring MVC也是一个MVC框架。而且因为它是Spring的亲儿子，自然和Spring契合得非常完美。

同时，在设计之初，Spring MVC就参照了其他MVC框架的优缺点（包括Struts），所以用起来非常爽。因此，在MVC框架领域，Spring MVC大有一统天下的趋势。

因此现在，很多公司，老的Struts项目还在维护。但新的项目开发，更多转向了Spring MVC。因此，如果你是Java新手，正在学习中，我的建议是:

“*不要再学习Struts了，从Spring MVC开始吧！*”

## Hibernate

Hibernate作为老牌的 ORM映射框架，功能非常强大，涵盖面非常广。但这既是它的优点，同时也成为它的“负担”，是开发人员“不能承受之重”。

Hibernate的设计初衷，是为了最大程度地解放程序员，完全隔离数据库，实现彻底的OR映射。程序员甚至可以不写一行SQL语句，单通过配置就能实现对数据库的操作。

当然，为了实现这个目标，Hibernate也设计地非常复杂、非常精巧。就不可避免的带来以下副作用：

1.  学习成本高
2.  配置复杂
3.  调优困难

前两点不难理解，单说“调优困难”。

因为Hibernate的设计目标是彻底的OR映射，彻底的隔离SQL语句。但必然会带来一定的性能损失。大部分情况下，应用如果对性能不敏感，Hibernate也没问题。但应用一旦对性能敏感，有SQL级别调优的需求，Hibernate的优点反而成为缺点。

虽然Hibernate也支持SQL级别的调优，但因为框架设计的过于复杂和精巧，这就需要开发人员对Hibernate理解的非常透彻，这就带来了更高的学习成本。

而现在最流行的MyBatis，作为一个“混合式”，轻量级OR映射框架，既继承了Hibernate的优点，同时也吸取了他的教训。在支持配置的同时，又能接触SQL，从而带来了更多灵活性（包括调试、优化）。

当前，在实际开发中，Hibernate使用得越来越少了。大家更偏爱MyBatis这种轻量级框架。所以，对后来学习者，我的建议是：

“*不需要再学习Hibernate了，学MyBatis就够了*。”

## Servlet（要精通）

当然，现在不会有任何公司，再用纯粹的Servlet来实现整个Web应用，而是转向一些更高级的技术（例如各种 MVC 框架）。因此，会给人一种错觉：Servlet已经过时，后来者就不需要再学习了。

在这里，我可以非常负责任地说：这种观点是极端错误，极端不负责任的。

Servlet不仅要学，而且要学深，学透。

当前，Servlet虽然不再是一个主流web开发技术，但依然是Java Web开发技术的基础，是Java Web容器的基石，是行业标准。而现在流行的各种MVC框架（包括SpringMVC），在最底层，还是以 Servlet为基础的。

为此，我画了一个简单的图（不准确，会意即可）：

![](https://mmbiz.qpic.cn/mmbiz/mngWTkJEOYKRz1K421ckD7yAOI5Xov453ZMAUO1VNwEXVLOmFJWbjicYtiaCDLLVc3QDCmProwoicBs1bxzDPXPvA/640?wx_fmt=other)

所以，如果你想要彻底掌握某个MVC框架，则必须彻底理解Servlet。

而且，Servlet作为一个基础设施。精通它，不仅有助于理解各种MVC框架。即使Servlet本身，也有很多实用价值。

如果你深刻理解了Servlet的生命周期，就可以在底层做很多事情。譬如在Request进来的时候，进行拦截，进行权限的判定。也可以在Response发出的时候，进行拦截，统一检查、统一附加。

所以，如果你正在学习Java，对Servlet，我的建议是：

“*Servlet不仅要学，而且要学深，学透*。”

## 其他

目前在国内，Java更多是作为web后端技术出现的。因此在实际学习中，很多技术就不符合“国情”，学习的现实意义不大。下面我就简单列举下。

1）Applet

作为页面插件技术，不用多说，连flash都快被淘汰了，更无论从未流行的applet。

2）Swing

作为桌面UI框架。且不说本身设计得咋样。现实开发中，我接触的桌面应用，要么用C++（例如MFC），要么用C#（Winform、WPF）。所以，Swing就没有学习的必要了。

3）JDBC

作为较低层的数据库基础设施，JDBC被很多框架（例如MyBatis）支持。但在实际开发中，程序员即使不了解也无大碍。因此，虽然我不能建议你放弃JDBC学习，但如果你时间有限，完全可以把它的优先级排低一点。

4）XML

XML现在还在广泛应用。但作为一个web数据传输格式，正在逐渐被JSON替代。所以，对Java后端学习来说，XML简单了解即可。至于庞杂的XML操作API（例如XPath），完全不必学习。将来真要用到，再查也不迟。


---

没有什么使我停留——除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟🤔。

- ✌️：[工作四年，被动醒悟](https://mp.weixin.qq.com/s/q-o4SBZQ3SH62T0c52aBUw)
- ✌️：[来网易四个月，真的不一样](https://mp.weixin.qq.com/s/4Zcd16hMazydelrN6CUXBA)
- ✌️：[秋招 13 家 offer，手到擒来](https://mp.weixin.qq.com/s/LKkvcSdhMyXAGgtqEak0Zw)
- ✌️：[考研失败，真的不甘心](https://mp.weixin.qq.com/s/mrSxrQYaWiUE82tBUu3XIw)
- ✌️：[想春招找个实习，我该如何准备？](https://mp.weixin.qq.com/s/eyCEQKclRkTnsJze01Bilg)
- ✌️：[逼签！冲字节还是苟同花顺？](https://mp.weixin.qq.com/s/Dv_kcwUT-KTZ6LAwn3o_Jg)
- ✌️：[简历上写了这俩项目，超级加分！](https://mp.weixin.qq.com/s/yYWD0VPZ_NoGPOmhoa-OlQ)
- ✌️：[双非很菜，拿到这俩offer挺不容易](https://mp.weixin.qq.com/s/OHXpEOKcLaKW8h0TS4Xqjg)
- ✌️：[今年嵌入式软件这块真挺香](https://mp.weixin.qq.com/s/6YuyA1Ja5RfDEQatfsQpjA)
- ✌️：[入职 15 天，就想跑路了？](https://mp.weixin.qq.com/s/EW95wdK4SM0CiBEJqUP7Mg)
- ✌️：[比亚迪，救了我秋招的命](https://mp.weixin.qq.com/s/PmVwFKsXkGeJjmNPiu5hrQ)

![](https://files.mdnice.com/user/3903/b7e50cf4-6fca-4511-9bfd-aa1ed9eb587b.png)
