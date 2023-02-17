---
title: 阅读源码的18条心法
shortTitle: 阅读源码的18条心法
author: 三友
category:
  - 微信公众号
---

昨天在星球里说阅读源码的事情：https://t.zsxq.com/0bKbRq1t4，有球友问我到底该如何阅读源码，今天我们就来细致地聊聊：如何去阅读开源项目的源码？

在聊如何去阅读源码之前，先来简单说一下为什么要去阅读源码，大致可分为以下几点原因：

*   最直接的原因，就是面试需要，面试喜欢问源码，读完源码才可以跟面试官battle
*   提升自己的编程水平，学习编程思想和和代码技巧
*   熟悉技术实现细节，提高设计能力
*   ...

那么到底该如何去阅读源码呢？这里我总结了18条心法，助你修炼神功

![](https://mmbiz.qpic.cn/mmbiz_png/B279WL06QYxTQb59dFSI5hksndWXFxdgS2nadb5d9PdOnCtfIl55nBplHkHNkHbgT9IDLX9mO3qoPGutcszpZg/640?wx_fmt=png)

## 学好JDK

身为一个Javaer，不论要不要阅读开源项目源码，都要学好JDK相关的技术。

所有的Java类开源项目，本质上其实就是利用JDK已有的类库和关键字实现一种业务功能，所以学会了JDK相关的类库是看其它的源码基础。

如果你不懂JDK，你去阅读源码会发现有太多看不懂的地方，会影响读源码的心情和信心。

学习JDK主要包括使用和原理两部分。内容大致包括以下几部分:

*   集合相关，比如常见的Map，List，Queue的实现，包括线程安全与不安全
*   并发相关，比如synchronized、volatile、CAS、AQS、锁、线程池、原子类等等
*   io相关，包括bio和nio等等
*   反射相关
*   网络编程相关
*   ...

## 了解设计模式

在一个优秀的开源项目中，设计模式处处存在，所以在你开始阅读源码之前最好先了解一下常见的一些设计模式。当你了解了一些设计模式以后，在源码中遇到了相关的设计模式，你就可以快速明白代码结构的设计，从而以整体的视角去阅读相关代码。

同时，学习设计模式不仅可以帮助我们阅读源码，在日常开发中也可以帮助我们设计出更易于扩展的程序。

学习设计模式的话可以看看《**大话设计模式**》这本书，如果不想看书也可以找一些视频或者专栏。

## 先从官网入手

官网是介绍开源项目的地方，同时也是学习一个开源项目最开始的地方，通过官网我们可以快速的了解项目，比如：

*   项目的定位
*   一些核心概念
*   功能
*   使用教程
*   整体的架构和设计
*   常见的问题及解答
*   ...

![](https://mmbiz.qpic.cn/mmbiz_png/B279WL06QYxTQb59dFSI5hksndWXFxdg5nG71MwEicHQ0Ey41eQa3gjWm9g33UHyxfeG5xfsDyUEhBEJ4koqfVw/640?wx_fmt=png)


当你了解了项目的一些概念、功能等信息之后，如果你在读源码一旦发现了代码是实现这些概念或者功能的足迹，那么能够帮助你更好的理解代码。

## 熟悉源码模块结构

当你对项目有大致的了解之后，就可以从Github上把代码clone下来，官网有项目源码的Github地址。

当成功拉下来代码之后，就可以对项目源码模块进行简单的分析，熟悉模块结构，分析模块功能，混个眼熟。

![](https://mmbiz.qpic.cn/mmbiz_png/B279WL06QYxTQb59dFSI5hksndWXFxdgUa6xBdicsqibUf9936ugPlcWV7iayDBWV1eLxZUxAV3Ow7iax1QHeibUvxQ/640?wx_fmt=png)

如上是RocketMQ源码，如果前面阅读过官网相关的一些概念介绍，就大致可以知道这些模块有什么功能。

![](https://mmbiz.qpic.cn/mmbiz_png/B279WL06QYxTQb59dFSI5hksndWXFxdgsiady9oJka30FExvAGvPnELLOYSsme8EauiazPicdINVBiaia9YL0xF0pxg/640?wx_fmt=png)


比如说，源码中的broker模块，官网说broker主要是负责消息存储，那么broker模块代码块肯定就主要实现了消息存储的功能。

还有些模块可以根据单词的意思进行判断，比如common模块，一看就是存储一些公共类的模块，example模块，就是RocketMQ使用代码示例的模块等等。

## 顺着demo开始读

有的小伙伴在读源码的时候不知道从哪里开始读比较合适，最后随便从源码中的某个模块就开始读，读读越来越发现读不下去。

读源码正确的姿势应该是从demo开始读。

比如说，现在我想要阅读一下RocketMQ生产者是如何发送消息的，整个过程是什么样的，那么我首先至少得写个发送消息的demo，看看代码是如何写的。

demo一般可以从官网中查看，RocketMQ官网发送消息代码示例：

![](https://mmbiz.qpic.cn/mmbiz_png/B279WL06QYxTQb59dFSI5hksndWXFxdgMbnMQDS3L5oWibGmONKfCBNbzrooOiaxqPlib65wd5VdsMeLxfz36iayWw/640?wx_fmt=png)



除了官网，一般开源项目在源码中也会有相应的demo，代码放在示例模块，就比如上面提到的RocketMQ的example模块。

最后还可以通过谷歌搜索一下demo。

```
DefaultMQProducer producer = new DefaultMQProducer("sanyouProducer");
//指定NameServer的地址
producer.setNamesrvAddr("localhost:9876");
//启动生产者
producer.start();
//省略代码。。
Message msg = new Message("sanyouTopic", "TagA", "三友的java日记".getBytes(RemotingHelper.DEFAULT_CHARSET));
// 发送消息并得到消息的发送结果，然后打印
SendResult sendResult = producer.send(msg);
```

如上是RocketMQ生产者发送消息的一个demo，消息发送源码阅读就从这块代码开始入手，一步一步进入源码中，这就算开始阅读源码了。

## 带着目的去读

带着目的去读其实很好理解，就拿上面生产者发送消息流程源码来说，读源码的第一个目的其实就是弄懂生产者发送消息的流程。

除了弄懂生产者发送消息，你还可以带着其它目的去读。

比如说，消息发送的核心逻辑是send方法实现的，那么除了消息发送，是不是可以去弄懂生产者在启动的过程做了哪些事，也就是start方法的作用。

再比如生产者发送消息肯定涉及到网络通信相关的内容，那么了解RocketMQ底层网络通信模型是不是也可以算一个目的。

当你带着这些目的，你读源码就有很强的目的性，读完印象会很深刻。当然如果你最开始想不到这些目的，也没有什么关系，你可以先往下读，在读的过程中再去尝试发现一些其它的目的。

## 先抓主线，再抓分支

有的小伙伴在读源码的时候，每个方法都使劲一直往下点，最后都不知道代码进入到哪了，这其实是非常不可取的。

正确的方法应该是先抓住主线流程，分支流程先大致看看，知道大概是什么作用，等读完主线之后，再回过头仔细读一下分支代码。

举个例子来说，在Spring中，ApplicationContext在使用之前需要调用一下refresh方法，而refresh方法就定义了整个容器刷新的执行流程代码。

![](https://mmbiz.qpic.cn/mmbiz_png/B279WL06QYxTQb59dFSI5hksndWXFxdgDOKEoByJM82cJ9nNR61Fc1Iiav5oiaDw47OSiaCMLK9LKCCiam1DueTdBg/640?wx_fmt=png)


当在读这段代码，你可以先读一读refresh中各个方法大致都做了什么，等读完之后，你可以具体的去读每个代码的具体实现，比如说prepareRefresh干了什么，obtainFreshBeanFactory是如何获取到BeanFactory的，prepareBeanFactory又在对BeanFactory做了什么事等等。

## 不要过度抠实现细节

有的小伙伴在阅读的时候特别喜欢深究，想要弄清每行代码是如何实现的，这不仅非常难而且也是不可取的。

就比如说，我们都知道，在Spring Bean的生命周期中，当存在基于xml的方式来声明Bean的方式，Spring会去解析xml，生成BeanDefinition。当你想要了解Bean的生命周期过程的时候，其实是没有太大的必要去过度扣Spring是如何解析xml生成BeanDefinition的细节，这对你整体了解Bean的生命周期没有太大的意义，只需要知道最终会转换成BeanDefinition就可以了。

那什么时候去扣实现细节呢？

*   当你需要使用到的时候，比如说你遇到了一个bug或者是需要扩展
*   阻碍你理解功能实现的时候

## 大胆猜

读源码的时候也需要我们发挥一点想象力，去猜一猜功能是如何实现的。猜不是瞎猜，而是基于目前了解的一些知识、技术或者是思想合理地去猜。

就比如说，当你已经知道了OpenFeign最终会对每一个FeignClient接口生成动态代理对象，之后注入的对象都是代理对象，代理对象中实现了RPC的请求之后，那么当你在学习dubbo的时候，是不是就可以去猜测注入的dubbo接口最终也是一个动态代理对象，并且这个代理对象也实现了RPC的请求？

之后你在读代码的时候就需要着重注意发现是否有动态代理生成的代码，这就算是一个目的，一旦发现了动态代理相关的代码，那么这块代码很可能就是dubbo RPC实现的核心。

## 学会看类名

不要小看类名，优秀的代码命名都是见名知意的，所以从类名也可能窥探出这个类的一些蛛丝马迹。

如下列举了几个比较常用的命名习惯

*   以Registry结尾的一般都是存储功能，比如Spring中的SingletonBeanRegistry就是用来保存单例Bean的；Mybatis中的MapperRegistry就是用来保存Mapper接口的
*   以Support、Helper、s、Util(s)结尾的一般都是工具类
*   以Filter，Interceptor结尾的一般都是拦截作用，一般会配合责任链模式（Chain）使用
*   以Event、Listener结尾的一般都是基于观察者模式实现的事件发布订阅模型
*   ...

除了一些比较通用的命名习惯，也有一些项目独有的一些命名习惯。

比如说Spring中常见的以PostProcessor结尾的都是扩展接口，实现这些接口可以拿到某个比较核心的组件，从而实现对Spring的扩展。

其实很多开源项目的命名都比较偏向Spring的命名风格，当你遇到了跟Spring的命名比较像的时候，那么可以大胆猜测类的作用。

## 学会看类结构

类结构也非常重要，他也能够帮助我们窥探类的大致功能。

![](https://mmbiz.qpic.cn/mmbiz_png/B279WL06QYxTQb59dFSI5hksndWXFxdgFv9mqn7wO1LTxLiazPoSbvjiad9La5pdWBYIdKYhx0wrHUgEqTvOsQ3w/640?wx_fmt=png)


如上图，是Spring中ApplicationContext的继承体系，当你需要了解ApplicationContext的时候，可以先去熟悉一下它的父接口的作用，当你大致弄明白了每个接口的作用，那么ApplicationContext有啥作用就大致就清楚了。

除了可以看类继承体系，还可以浏览一下类大致提供了哪些方法，了解对外提供的功能。

类方法通过快捷键 ctrl+F12（mac：fn+command+F12）查看，并且还支持模糊搜索方法名，我本人就非常喜欢这个快捷键

![](https://mmbiz.qpic.cn/mmbiz_png/B279WL06QYxTQb59dFSI5hksndWXFxdgSw3T1ONPAj7VWA7btHJmQscUKnrBJBxQ401GceEjvJGclmVOLPlUicA/640?wx_fmt=png)


## 总结类的职责

当我们在读完一个类的代码的时候，一定要总结这个类的职责，明白这个类存在的意义。一般情况下一个类核心职责只有一个，遵循单一职责的设计原则。

举个例子，在RocketMQ中有一个类MQClientAPIImpl

![](https://mmbiz.qpic.cn/mmbiz_png/B279WL06QYxTQb59dFSI5hksndWXFxdg2O39o3Fn4JibZJIibNecNYPklPpYZgOWOk2MCTIIsXQU8j6ErPoZgicJw/640?wx_fmt=png)


其实从名字大概看不出这个类主要是有什么功能，但是当我读代码的时候发现每个方法最终都调用RemotingClient方法，而RemotingClient只有一个实现NettyRemotingClient，所以从这个实现和类名可以猜出来RemotingClient是发送网络请求的客户端，所以当读完MQClientAPIImpl源码之后，我就知道了MQClientAPIImpl这个类的职责大致是封装参数，然后通过RemotingClient向MQ发送消息的。

当知道这个类的职责的时候，那么其它地方在调用这个类的方法的时候，就知道大概在做什么事了。

## 习惯阅读注释

当你在读源码的时候，如果有注释，最好能先读一下注释，这样能帮助你厘清类或者方法的功能，先知道功能，再去读源码就容易多了。

注释一般都是英文，如果看不懂，可以装个插件

![](https://mmbiz.qpic.cn/mmbiz_png/B279WL06QYxTQb59dFSI5hksndWXFxdgkiaM0OxyPhFFVIamSHyeUf3RuSq6XTsBlTicByVzQRA1eTPzDWOLW9Mw/640?wx_fmt=png)

## 写好注释

俗话说的好记性不如烂笔头，写好注释也是阅读源码中很重要的一个环节，好的注释可以帮助快速回忆起实现细节和功能。

注释并不需要对每行代码都注释，当然如果你愿意也没多大问题，但是注释应包括以下几点内容：

*   核心类和方法实现的核心功能
*   核心功能大致的实现逻辑
*   核心的成员变量的作用
*   方法中不易读懂的代码实现细节

![](https://mmbiz.qpic.cn/mmbiz_png/B279WL06QYxTQb59dFSI5hksndWXFxdgtcWL2FAIqicSibkQH8HRVJA5BG6icQlWc5KPPLtHJXr8KmAPGPrfiaIbAw/640?wx_fmt=png)


如图，是我读RocketMQ中对于DefaultMessageStore类阅读的注释，这个类是RocketMQ中一个非常核心的类，从名字可以看出来跟消息的存储有关。这个类的功能非常多，所以我写了很多注释，列举了这个类主要有哪些功能和这些功能实现的一些细节。

## 总结思想，及时输出

当你读完某个功能模块的时候，就可以尝试对这块功能实现逻辑或者思想进行总结。

比如说，当你了解了CAS思想的时候，你会发现，原来保证线程安全不仅仅可以通过加锁的方式，还可以基于乐观锁的方式来实现。

在总结之后可以输出成一个文档，又或者是流程图。我个人比较喜欢画图，这里推荐两个在线画图工具：

*   processon
*   draw.io

processon我平时就在用，功能多，但是需要收费；draw.io的话免费，图标和颜色感觉比processon好看，平时文章中的贴图就是用draw.io画的。

这里多说一句，总结思想还是非常重要的，在我阅读了很多源码之后，我发现很多技术或者功能的实现原理最终都是殊途同归。

## 提前了解依赖的技术

一般一个开源项目不是所有的技术都是自己实现的，它也会依赖一些其它的框架或者是思想，提前了解这些框架或者是思想，可以帮助你更好地阅读和理清代码。

比如说，RocketMQ底层是基于Netty框架实现网络通信的，当你对Netty有所了解，知道Netty在启动的时候需要注册一堆ChannelHandler用来处理网络请求，那么在读RocketMQ底层网络通信功能的时候你就可以去找一下Netty启动的代码，看看都注册了哪些ChannelHandler，然后就知道RocketMQ是如何处理和发送请求的。

## 查阅相关资料

当在阅读源码的时候，对某一块代码功能实现不太清楚的时候，可以通过查阅相关资料来辅助阅读，包括但不限于以下几种通道：

*   官网
*   书籍
*   Github
*   文章
*   视频

## 坚持

最后一点也是最核心的一点就是坚持。只有你长期坚持读源码，不停地思考，总结，不断提升自身技术的广度和深度，找到适合自己的阅读方式，阅读源码才会是越来越容易的一件事。


>参考链接：[https://mp.weixin.qq.com/s?__biz=MzkwNjMwMTgzMQ==&mid=2247501068&idx=2&sn=c59db416ca081d837be2015109f0ae52&chksm=c0e81de4f79f94f23c25f7fb71b794eb77449dbd0fdb1eeb64dc3c3d1b73f328304ab59342a3#rd](https://mp.weixin.qq.com/s?__biz=MzkwNjMwMTgzMQ==&mid=2247501068&idx=2&sn=c59db416ca081d837be2015109f0ae52&chksm=c0e81de4f79f94f23c25f7fb71b794eb77449dbd0fdb1eeb64dc3c3d1b73f328304ab59342a3#rd)
