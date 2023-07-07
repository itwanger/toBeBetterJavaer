---
title: 从华为跳槽到银行科技岗，好难!
shortTitle: 从华为跳槽到银行科技岗，好难!
author: 朱晋君
category:
  - 微信公众号
---

![](https://mmbiz.qpic.cn/mmbiz_png/J0g14CUwaZclQSAM41A1ZnFukibKNKGiapfQQZJOKziaehj1pZzNHTicFkDKBMhTBzjZjys2GHM2nWd3LWt5SA7y0A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

图解学习网站：xiaolincoding.com

  

大家好，我是小林。

  

今天分享一位面试官朋友在面试候选人时候的感触，可以从面试官的角度学一下，面试官问问题的时候， 实际上是想考察哪些能力。

  

下面是这位面试官朋友的分享。

  

* * *

最近面试了很多候选人，感触很多，给大家分享一下。

今年我们团队在西安的招聘名额比较多，我作为团队的招聘组长，筛选了一波又一波的候选人。

西安是一个有实力的城市，名校云集，985/211 院校很多，包括西安交大、长安大学、西北工业大学、西安电子科技大学、西北大学、西北农林科技大学。多数候选人也是出自这些名校。

但是跟北京、上海、杭州这些互联网氛围浓厚的城市相比，西安的互联网氛围还是逊色一些。从我收到的简历看，候选人目前的岗位主要有下面四类：

1.  银行科技公司的员工或者外包；
2.  华为西安研究所、腾讯云等大厂，岗位集中在云计算、大数据、devops 等，很多人有管理经验；
3.  互联网公司的外包岗位；
4.  其他不太知名的公司。

最近华为某个部门要撤离西安，整个团队面临迁移到别的城市的处境，这对于已经成家的员工来说，几乎不太可能。他们只能选择离职，我收到了不少相关候选人的简历。

下面的我摘出的一部分简历内容：

> 使用技术：Spark、Hadoop、Clickhose、K8s 等。工作职责：
> 
> 1.  主导大数据架构设计和技术选型；
> 2.  为数据流处理提供优化方案；
> 3.  新方案设计的推动落地实施；
> 4.  团队管理。
> 
> 擅长技能：
> 
> 1.  熟悉 C++、Java、Linux 相关技术栈；
> 2.  熟悉 Spring、SpringBoot、SpringCloud 等框架；
> 3.  熟悉大数据相关技术，如 Kafka、flink、Spark 等；
> 4.  熟悉代码管理工具，如 maven、git 等；
> 5.  具体团队管理能力和经验。
> 
> 自我评价：编程能力强，热爱钻研技术，待人真诚，具有很强的抗压能力，良好的团队管理能力。

就从简历来看，候选人是很优秀的，学历背景优秀、大厂工作经历、带过团队、项目经验丰富。

我满怀期望跟候选人进行了沟通，但整个过程并不顺畅。

**我**：先简单介绍一下自己的情况。

**候选人**：我是在 xx 年毕业，毕业后经历了几家公司，...，从 xx 年开始我在 xx 研究所做云计算和大数据相关的工作。主要参与过 xx 项目。

**我**：详细介绍一个自己主导或者参与比较多的项目，包括项目中有哪些服务，用到了哪些技术栈，这些服务在业务流程中的作用，服务间怎么调用的。

**候选人**：xx 服务主要包括了 4 个服务，服务间通过 HttpClient 来进行通信 ...

**先是自我介绍，然后深入介绍一个项目，这一般是我面试的开场套路。因为没有接触过候选人介绍的类似项目，我听得马马虎虎，假装听懂了。**

**我**：你们微服务是怎么划分的，都有哪些服务？服务之间是怎么通信的？

**候选人**：我们服务是部署在云上，...

**我又是似懂非懂的，当面试官好难。要不纯问一些技术吧。**

**我**：问你几个技术问题吧。给定一个长度为 n 包含 \[0, n\] 中 n 个数的数组 nums，**数组是有序的无重复的**，找出 \[0, n\] 这个范围内没有出现在数组中的那个数。（leetcode268 改编，改得更简单了）。

![](https://mmbiz.qpic.cn/mmbiz_png/a1gicTYmvicdicjMcRQtNeqVDJZfuOOnKHBUaPhvyAarZTWZFZrc12ox5m6YcJibke2xr76vTjtFLYMU3nBk6hqibAw/640?wx_fmt=png)

**候选人**：新建一个长度为 n+1 的数组保存 \[0, n+1\] ，对原来的数组做循环依次查找每个元素是否在新建的数组中。

**我追问**：这个时间复杂度太高了，o(n^2)，而且还需要额外空间，有更好的方法吗？

**候选人**：我想想，（大概过了一分钟），不依赖外部数组，对原数组进行遍历，用数组下标加 1 和数组在当前下标的元素值进行比较，不相等就结束循环，最坏时间复杂度是o(n)。

**我追问**：还有更好的方法吗？

**候选人**：我再想想，（大概过了 30 秒）想不出了。

**我又失望了一次，其实我想听到的答案是二分查找，用递归实现。**

**我**：Java 中的 TreeMap 和 LinkedHashMap 有什么区别？

**候选人**：TreeMap 是有序的，LinkedHashMap 记不清了。

**这里我想考察候选人的写代码情况，长期不写代码的人很容易记不清。**

**我**：Java 中有哪些锁，可以讲一下吗？

**候选人**：我们常用的是 synchronized。

**我**：Java AQS 中的锁使用过吗？候选人：好像有一个 reentrant 什么，记不清了。

**到这里，我感觉候选人应该主要做管理，已经很少做开发了。**

**我**：使用 Spring 做依赖注入的时候，@Resource 和 @Autowired 有什么区别？**候选人**：@Autowired 是用类型来注入，@Resource 是用名字来注入。

**我追问**：这两个一般用在什么场景呢？

**候选人**：我们一般使用 @Autowired 比较多，@Resource 用的很少。

**我**：（考虑到候选人是云计算岗）K8s 中的 deployment 和 statefulset 有什么区别呢？（**这个问题其实是为了缓解尴尬**）

**候选人**：statefulset 用在有状态的应用，...

**我**：（最后了）请问你离职的原因是什么？

**候选人**：跟银行相比，华为还是不太稳定。为了节约成本，我们部门要撤掉，整体迁移到 xx 和 yy 两个城市，我家在西安，不太想去。

这个候选人我没给通过，原因有几点：

1.  我招聘的这个岗位对于资深的候选人，入职后肯定要带团队；
2.  带团队不是只做管理，而是技术经理，需要能冲在一线，需要有不错的技术能力，有行业背景那就更好了；
3.  团队对每个人都是有代码考核的，不允许不写代码的同事存在；
4.  我要招一个人跟我做同事，当然希望基础好一些，这样可以对团队有一个很好的指导。

最后，分享几点自己的见解：

1.  可以丢掉技术，但得有几个前提：

*   要保证现在的工作足够稳定，不会被淘汰；
*   即使被淘汰了，也不担心，因为有丰富的人脉资源，可以帮助自己很快找到下一家管理岗；
*   不用担心经济问题，因为自己已经实现财富自由或者可以选择创业。

2.  面试中如果只是泛泛而谈，那不如直接说我不会，或者记不清了；
3.  社会对大龄程序员要求很高，技术、业务，高 P 的职位多数也要求懂管理；
4.  如果不是迫不得已，不要轻易换赛道，除非是 AI，ChatGPT 等很火的赛道。换了赛道，意味着之前的积累基本都会丢掉；
5.  今年的情况机会很难得，准备好了再去面试，不打没有准备的仗。

 

 

**历史好文：**

[这个月，太多惊喜了！！！](http://mp.weixin.qq.com/s?__biz=MzUxODAzNDg4NQ==&mid=2247526533&idx=1&sn=c9aebdfa04b84bbac4791b49cfaf713d&chksm=f98d2c2fcefaa53963857be8e03c83b0008669d30136f7ad6e17f3fd40ecabc5818ae3be0d34&scene=21#wechat_redirect) **[](http://mp.weixin.qq.com/s?__biz=MzUxODAzNDg4NQ==&mid=2247526533&idx=1&sn=c9aebdfa04b84bbac4791b49cfaf713d&chksm=f98d2c2fcefaa53963857be8e03c83b0008669d30136f7ad6e17f3fd40ecabc5818ae3be0d34&scene=21#wechat_redirect)** 

[外面在鞭炮，而我还在写代码](http://mp.weixin.qq.com/s?__biz=MzUxODAzNDg4NQ==&mid=2247526545&idx=1&sn=c8d4e0f2a4755f187b28439111bcc762&chksm=f98d2c3bcefaa52dbafb00932792d00874b38311b97d5a831685949631bc82be9af7cbc53ee4&scene=21#wechat_redirect)

[百度不问我项目，全程基础拷打，真扎心！](http://mp.weixin.qq.com/s?__biz=MzUxODAzNDg4NQ==&mid=2247526579&idx=1&sn=e5d3c69f2c6d3ae4d77ce0b5676bc766&chksm=f98d2c19cefaa50fd8d719190baab62bf2ee25216425b4f9f6ee03b5ea058f4bc8a34930c668&scene=21#wechat_redirect) 

 

[感觉被榨干了，被美团拷打一小时！](http://mp.weixin.qq.com/s?__biz=MzUxODAzNDg4NQ==&mid=2247526588&idx=1&sn=39d2bca8f21538399bba5906d72af250&chksm=f98d2c16cefaa5006917397742c85875f646cc863f520bfa6511fe24bce2791ec1e1475e4932&scene=21#wechat_redirect) 

 

[腾讯二面顶住了！评价反馈不错](http://mp.weixin.qq.com/s?__biz=MzUxODAzNDg4NQ==&mid=2247526456&idx=1&sn=91c449f268e0b132d97f33032bf81409&chksm=f98d2c92cefaa58489621f901108b7cfba44f2f7059111e39d5922c7c3589ed06acfb4c08e17&scene=21#wechat_redirect)

>参考链接：[https://mp.weixin.qq.com/s?__biz=MzUxODAzNDg4NQ==&mid=2247526594&idx=1&sn=ac0d0453b137bf7f8e92c0beacded108&chksm=f98d2c68cefaa57e092455cb7da7aee4902bb43efe0fc16bc125dea3a7b7d79cc03b81ba94a5#rd](https://mp.weixin.qq.com/s?__biz=MzUxODAzNDg4NQ==&mid=2247526594&idx=1&sn=ac0d0453b137bf7f8e92c0beacded108&chksm=f98d2c68cefaa57e092455cb7da7aee4902bb43efe0fc16bc125dea3a7b7d79cc03b81ba94a5#rd)，出处：小林coding，整理：沉默王二
