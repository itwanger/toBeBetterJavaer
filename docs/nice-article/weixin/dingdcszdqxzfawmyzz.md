---
title: 订单超时自动取消3种方案——我们用这种！
shortTitle: 订单超时自动取消3种方案——我们用这种！
author: 老三
category:
  - 微信公众号
---

崭新的办公室，崭新的会议室，窗明几净，地毯一尘不染，这样舒适的工作环境，小二不由得期待了起来，要是这次面试能通过，我一定要好好干！

小二敲敲门，蹑手蹑脚进入了办公室，态度虔诚，弯腰鞠躬，面露微笑，寒暄过后，一切就绪，面试官老王问了这么一个问题。

“看你简历上写对电商购物比较熟悉，那在下单之后，通常会有一个倒计时，如果超过支付时间，订单就会被自动取消。”

![](https://mmbiz.qpic.cn/mmbiz_png/PMZOEonJxWet6dkExtrdrG1hWr2LicsD4Ny38KlJpVr1x1Jiaia3VewGGAO7XN4Rl8lhw0eDL0bZRlq9JYTadicybQ/640?wx_fmt=png)

“你就来说说，你们项目中，订单超时未支付自动取消都用了哪几种方案？”

听完老王这句话，小二心里狂喜，前几天才在二哥公众号看到这道面试题，这就碰上了！但小二依然表现出非常淡定的态度，娓娓道来。。。。。

>以下是小二之前看到的解决方案，他可以说是倒背如流。

## 1.定时任务

这是最容易想到的办法，定时任务去轮询数据库，取消即将超时的订单。

![](https://mmbiz.qpic.cn/mmbiz_png/PMZOEonJxWet6dkExtrdrG1hWr2LicsD4HnLvHicEQLt8XmsiaJ6FcD9M75QCTANDsr7HfKqYkRCVY8tHNbhwMcuw/640?wx_fmt=png)

定时任务实现方式有很多种，大概可以分为两类：`本地定时任务`和`分布式定时任务`。

![](https://mmbiz.qpic.cn/mmbiz_png/PMZOEonJxWet6dkExtrdrG1hWr2LicsD4SicS56Z5N58TQYqamMy2nKubtMSvDOHxmL0rYBkF5rABgE60P6D6v0Q/640?wx_fmt=png)


本地定时任务，适用于单机版的业务系统，实现方式非常多样：

*   永动机线程：开启一个线程，通过sleep去完成定时，一些开源中间件的某些定时任务是通过这种方式实现的。
*   JDK Timer：JDK提供了Timer API，也提供了很多周期性的方法。
*   延迟线程池：JDK还提供了延迟线程池ScheduledExecutorService，API和Timer类似。
*   Spring Task：Sprig框架也提供了一些定时任务的实现，使用起来更加简单。
*   Quartz：Quartz框架更进一步，提供了可以动态配置的线程池。

分布式定时任务：适用于分布式的业务系统，主要的实现框架有两种：

*   xxl-job：大众点评的许雪里开源的，一款基于MySQL的轻量级分布式定时任务框架。
*   elastic-job：当当开发的弹性分布式任务调度系统，功能很强大，相对重一些。

定时任务实现的优点是开发起来比较简单，但是它也有一些缺点：

*   对数据库的压力很大，定时任务造成人为的波峰，执行的时刻数据库的压力会陡增
*   计时不准，定时任务做不到非常精确的时间控制，比如半小时订单过期，但是定时任务很难卡准这个点

## 2.被动取消

在文章开头的那个倒计时器，大家觉得是怎么做的呢？一般是客户端计时+服务端检查。

什么意思呢？就是这个倒计时由客户端去做，但是客户端定时去服务端检查，修正倒计时的时间。

那么，这个订单超时自动取消，也可以由客户端去做：

*   用户留在收银台的时候，客户端倒计时+主动查询订单状态，服务端每次都去检查一下订单是否超时、剩余时间
*   用户每次进入订单相关的页面，查询订单的时候，服务端也检查一下订单是否超时

![](https://mmbiz.qpic.cn/mmbiz_png/PMZOEonJxWet6dkExtrdrG1hWr2LicsD4PMZdwqQIA2VA8QJwbkOv3IAL3GGnKuh8jkBG96zG26QyO5cXfnTic5g/640?wx_fmt=png)


这种方式实现起来也比较简单，但是它也有缺点：

*   依赖客户端，如果客户端不发起请求，订单可能永远没法过期，一直占用库存

当然，也可以`被动取消`+`定时任务`，通过定时任务去做兜底的操作。

## 3.延时消息

第三种方案，就是利用延时消息了，可以使用RocketMQ、RabbitMQ、Kafka的延时消息，消息发送后，有一定延时才会投递。

![](https://mmbiz.qpic.cn/mmbiz_png/PMZOEonJxWet6dkExtrdrG1hWr2LicsD4psG3CspMFIjcX7ShEG6SvNiaqI4LJ9LV7ElrFsWE9sWfZXZrjnBE6OA/640?wx_fmt=png)


我们用的就是这种，消息队列采用的是RocketMQ，其实RocketMQ延时也是利用定时任务实现的。

使用延时消息的优点是比较高效、好扩展，缺点是引入了新的技术组件，增加了复杂度。

## 4.其他方案

除了上面的三种，其实还有一些其它的方式，例如本地延迟队列、时间轮算法、Redis过期监听……

但是我觉得，应该不会有人真考虑过在生产上使用这些方法。

后记：

>时光飞逝，转眼就来到了 2023年03月09 日，这已经是小二入职新公司的第二个年头，公司熬过了去年的寒冬后，就像如今的天气一下，春暖花开，一切重回正轨，蒸蒸日上了起来。小二的学习劲头也更足了些：“今年，我一定要更上一层楼才好呢！”

## ending

一个人可以走得很快，但一群人才能走得更远。[二哥的编程星球](https://mp.weixin.qq.com/s/hXXBTPPkFj2VMg_GXqn4EA)已经有 **1900 多名** 球友加入了，如果你也需要一个良好的学习环境，[戳链接 🔗](https://mp.weixin.qq.com/s/hXXBTPPkFj2VMg_GXqn4EA)加入我们吧。这是一个**编程学习指南 + Java项目实战 + LeetCode刷题的私密圈子**，你可以阅读星球专栏、向二哥提问、帮你制定学习计划、和球友一起打卡成长。

[星球的知识图谱](https://mp.weixin.qq.com/s/CljCSezUgoBXb-T9wbIGww)里已经沉淀了非常多优质的内容，**相信能帮助你走的更快、更稳、更远**。

![](https://files.mdnice.com/user/3903/0e8c9227-6986-4499-8243-e7e082aa811d.png)

下面 👇🏻 是二哥近期分享的一些原创内容，有在校学生党的，也有在职工作党的，多看看这些掏心掏肺的经验心得，应该会对你以后的校招&求职或者工作学习有很大的帮助 🤔。

- ✌️：[去B站实习了](https://mp.weixin.qq.com/s/_LHMpHlbSGXQfWfR_JtgMA)
- ✌️：[今天正式邮件 offer 下来了！](https://mp.weixin.qq.com/s/GtqMTkNKAWRUweVahK_lEg)
- ✌️：[还是决定去华为了](https://mp.weixin.qq.com/s/hOokRylxOXFb76_cF_RBOQ)
- ✌️：[现在醒悟，还能抢救](https://mp.weixin.qq.com/s/XPuckTbjGbzIaU8BWTqmFQ)
- ✌️：[冲大厂秋招的一些良心建议](https://mp.weixin.qq.com/s/NZFD1DqKWe9aowcjSuBnCQ)
- ✌️：[华为 OD 29 万，心动！](https://mp.weixin.qq.com/s/v-ID6zBaghSGYsvJgU7Dww)
- ✌️：[入职第一天，就想跑路了？](https://mp.weixin.qq.com/s/J1O21WNFFoqX5el5nJMV4g)
- ✌️：[官宣：技术派上线了哈～](https://mp.weixin.qq.com/s/ywJ0v_BG32HeJ3NpkTvk2w)
- ✌️：[国企这情况，，辞职去北京](https://mp.weixin.qq.com/s/p9UPga_d1-YsQ9zGlwq2MA)
- ✌️：[想去外企，该如何准备？](https://mp.weixin.qq.com/s/LCvq8ml6EdmQrRBU9ekkwg)
- ✌️：[教练，我想学编程！](https://mp.weixin.qq.com/s/BfFhAPvbPpDTRvRTHxa68Q)
- ✌️：[抓紧时间准备春招了！](https://mp.weixin.qq.com/s/fktSieMDJUq2rTsEil60sg)
- ✌️：[双非大二，冲 Google](https://mp.weixin.qq.com/s/MHvjhlQ2PvKaa8SZCGeoag)
- ✌️：[想跳槽，我该如何准备？](https://mp.weixin.qq.com/s/pIuBh2EH5wrsQ3nLg4-H2Q)

最后，把二哥的座右铭送给大家：**没有什么使我停留——除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟**。共勉 💪。

![](https://files.mdnice.com/user/3903/b7e50cf4-6fca-4511-9bfd-aa1ed9eb587b.png)

欢迎点击左下角**阅读原文**了解二哥的编程星球详情，这可能是你学习求职路上最有含金量的一次点击。


