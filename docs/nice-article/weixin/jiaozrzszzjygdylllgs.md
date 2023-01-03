---
title: 校招入职深圳字节一个多月了，聊聊感受
shortTitle: 校招入职深圳字节一个多月了，聊聊感受
description: 研发校招应届生入职深圳字节一个多月了，聊聊感受
author: wasabi
category:
  - 微信公众号
---

> [二哥的编程星球](https://mp.weixin.qq.com/s/CljCSezUgoBXb-T9wbIGww)已经有 **1300 多名** 球友加入了，如果你也需要一个良好的学习氛围，[戳链接](https://mp.weixin.qq.com/s/CljCSezUgoBXb-T9wbIGww)加入我们吧！这是一个编程学习指南+ Java项目实战+LeetCode 刷题的私密圈子，你可以阅读星球专栏、向二哥提问、帮你制定学习计划、和球友一起打卡成长，冲冲冲。

大家好，我是二哥呀。

假期马上就结束了，明天是 2023 年上班的第一天，竟然莫名其妙有点小期待。元旦回了一趟老家，结果“二”了，没带笔记本的充电头，以至于昨天跑去小米之家“偷”了会电（😂）。

今天给大家分享一个[二哥编程星球](https://mp.weixin.qq.com/s/CljCSezUgoBXb-T9wbIGww)里的故事：他校招的时候看网上对字节的评价很差，于是签了腾讯保底，结果在和字节的 HR 沟通后又**果断毁约腾讯加入了字节**，这位读者也是我的老乡，说来真的是有缘分。

![](https://files.mdnice.com/user/3903/6cb05ea2-2ee9-405f-98f1-f427308aae9b.png)

他所在的部门是字节国际化电商，base 深圳，这篇除了会分享一些他的工作和生活，也会分享一些他对校招的看法，希望他的故事能给参加今年春招和秋招的小伙伴一些启发和帮助🤔。

![](https://mmbiz.qpic.cn/mmbiz_jpg/98Zy5yRhqQQ5relQSQuJL5dSGFsRqVWgeCsgib7B78vq0hxzS5iaAof2Ok0xiaSFpF6rSsgYUxxXrGX0z39tcGtlQ/640?wx_fmt=jpeg)


## 工作相关

首先肯定是工作相关，也是占据了我的绝大多数时间，不打卡，活动日和周五早走一点。

工作节奏大概是早上9—10.30到，12-14吃饭+休息，15每天不一样的下午茶（甜点水果随机，人均20-），19开饭，活动日18点开饭。

![](https://mmbiz.qpic.cn/mmbiz_jpg/98Zy5yRhqQQ5relQSQuJL5dSGFsRqVWgibncic9aibXNquzlEs8FocxaINYMsibCZ13O4Cr6TX3fibpqEqn3qHibQ2Tw/640?wx_fmt=jpeg)

这一个月多的工作可以大致分为三个节奏：熟悉基础环境、了解业务，最后接几个小需求。

### 前期熟悉

我们这边目前业务需求不着急，主要是因为 QA、产品人力不太够，新人入职有很多时间去学习 Git，Go 或者 RPC 之类的基础理论知识，如果之前接触过，就会相对轻松一点。

前期除了安装工具之外要接触公司的办公流程，包括内网权限相关，研发基建、流程，这部分就是为以后的工作做铺垫。

这部分还是十分有必要的，虽然技术大差不差，但是不同公司、组各有侧重，比如字节国际化电商这边很重视流程，研发红线很多。

举个例子，正常需求上线，想免测基本是不可能的，需要各种拉齐会，自测+提测，联调，最后在固定时间统一发版。而且如果提测被打回会影响绩效，有双月 bug 数指标。

重流程这一点大公司都差不多，可即使是这样隔几天依然能收到数条到十几条的公司事故通报。

![](https://mmbiz.qpic.cn/mmbiz_jpg/98Zy5yRhqQQ5relQSQuJL5dSGFsRqVWge7uBg2eY49cJic9stGWQ3sYGfxJib3yFictaQa5v0jRsTqIOibtE2W8BVQ/640?wx_fmt=jpeg)

### 了解业务

在熟悉了公司的各种环境之后，就开始看内部文档熟悉组内业务，了解发展状况之类的，这时候基本看不太懂。

尤其是电商业务，黑话特别多，各种缩写、奇怪的简称，加上经过十多年的发展，不管是技术还是业务都已经发展地十分成熟，对于新人来说如果第一次接触还是需要时间学习，尤其是像我这种平时不常网购，连橱窗和店铺都不知道的人来说更是难上加难。

这部分时间需要慢慢了解目前组内负责在做什么事情，做成了什么，未来还需要做什么。刚入职，没办法，慢慢来嘛，像很多大佬切换起来可能就很容易。

目前的话我们组在负责国际化电商的商家业务的服务端支持，也就是 Tiktok 里的内容电商相关，包括商家后台和店铺，跟国内抖音小店什么的很像，总之就是内容电商，展示商品，卖东西的。

![](https://mmbiz.qpic.cn/mmbiz_jpg/98Zy5yRhqQQ5relQSQuJL5dSGFsRqVWg0q5oQOMp30DrDMUqtMvWl0bc6tW4J1ejnJNa9QrmechU8Fp7Syx2tQ/640?wx_fmt=jpeg)



### 接需求

前期负责了几个改动字段的需求，了解部署上线流程，这部分要经过「开会跟产品弄清楚需求-设计-技术评审-写代码-测试环境下自测提测联调-线上预览下测试联调-上线」这么一个完整流程，涉及 C 端的部分，为了防止出问题，哪怕是小需求也可能经过半个月以上。

这部分给新人的压力看组，我们这边还好。

## 生活

在公司除了工作，其他三餐+下午茶+咖啡机零食之类的都是自助，不能说多好吃，按照公司的说法人均 150/d 算上各种免费的应该有了。

还有3折饮料，

![](https://mmbiz.qpic.cn/mmbiz_jpg/98Zy5yRhqQQ5relQSQuJL5dSGFsRqVWgl2GygTdRM5g0PBP6CrVI7Myib37nB5I77vN3DSFTJpPjKoB1nxSq4XQ/640?wx_fmt=jpeg)

不过这些都是虚的，毕竟实打实的 base 才有用，而且字节在 base 上也不虚，给的应该比国内大部分公司高，很多人的字节 offer 都能给的比腾讯高了 10k 左右。

![](https://mmbiz.qpic.cn/mmbiz_jpg/98Zy5yRhqQQ5relQSQuJL5dSGFsRqVWg0mLAtCXYPM6jDibqWa1azh6v7NCniabPYEG6vMXabNiah3P2AptF3ZhGw/640?wx_fmt=jpeg)



![](https://mmbiz.qpic.cn/mmbiz_jpg/98Zy5yRhqQQ5relQSQuJL5dSGFsRqVWgwB1hJy7g8Yj8FlYpT6w6RpIbopWL3wK2RCmh8FH6R2J48ReIccpXOg/640?wx_fmt=jpeg)

### 组内氛围

字节的员工年龄是真的很低，基本很难看到强者的发型:D，大家「看起来」都很茂盛，

**不要盲目相信网上舆论。**

在入职之前，我做了大量的关于国际化电商这边工作的调查搜索，得到的结果几乎都是 “快跑” “卷死” 之类的描述，以至于让我当时几乎没有考虑字节，直接签了鹅厂。在后续与 hr、组内前辈和部门 +2 轮流沟通后才勉强相信没有那么累的描述，违约 tx 加入字节，事实也确实如此。

所以不要乱相信某脉、某乎，看多了就没工作可以去了。

我们现在的 **最长** 工作时间大致是10-10，也就是早上最早来的和晚上最晚走的是10，基本不会超过这个范围，这跟当时与组内前辈沟通的结果几乎一模一样，其余具体几点就是根据你的工作剩余量来定，遇到活动日、周五、七夕之类的没什么事很多人到饭点就走了。

总体来说还不错，网上的情况可能是其他某部门。

![](https://mmbiz.qpic.cn/mmbiz_jpg/98Zy5yRhqQQ5relQSQuJL5dSGFsRqVWgd6TQnd13AiaMcCUQdibib3Fribbyh2Vj5vB6HeLXzblc1uJQDaiaERmibibYA/640?wx_fmt=jpeg)

总结来说，不要盲目听从某些网站/app/论坛上的舆论，非要听的话，很有可能只有家里蹲才能满足他们的要求了。如果找不到靠谱消息，就建议提前去实习感受一下。

我不得不说字节的坦诚清晰、不讲title是我认为最适合我的，大家聊天都是直呼名字简称，例如某人叫王小二，就直接叫小二，如果是两个字就直接叫全名。

**我之所以很在乎这一点，是我个人很烦官场话术和作风。客套话、恭维话，让一句话里都是语气词，废话连篇，以至于时刻迎合领导，甚至敬酒，只是想想我就想呕吐，可能是因为我年轻，可能这也是吸引很多年轻人来到字节的一大原因。**

但是实话实说，下午茶零食之类的对我没有吸引力，因为平时也不常吃，也喝不惯咖啡机的卡布奇诺。倒是觉得免费三餐不错，对我这种不挑食，吃饱就行的人来说完全足够。

![](https://mmbiz.qpic.cn/mmbiz_jpg/98Zy5yRhqQQ5relQSQuJL5dSGFsRqVWgl1otvAtlZAiaMMVlr8rJYGRvSRt3PNFVQpQJibm09fxjdmichicMn6mPAA/640?wx_fmt=jpeg)

还有一点，在字节大家是看不到彼此的职级的，也不会出现 “你就是个1-2，你凭啥质疑我一个2-1/2-2的？”等等情况。

基本都是二三十岁的，开个会大家聊天也没什么障碍，上班也不打卡，在工区十分欢乐，有一天晚上吃完饭，听说楼下有一个密接，整层楼的人直接全跑了hh。上个电梯/吃个饭一眼望过去几乎没有年龄特别大的。

### 其他环境

简单说说办公配置吧，这个其实都差不多。研发校招新入职统一发新的m1/512g/32g/10c电脑，其余的（实习/社招）研发都是随机配置（m1/i7、新/二手、16inch/其他）的mac，研发/设计序列可以申请1台4k显示器，外加一台可以人手一个1080p，还有鼠标键盘是自己拿，不能说很好用，凑合吧。

我的情况比较特殊，是i7，也都差不多，兼容性好一点，没有m1那么多麻烦事，也还不错。

![](https://mmbiz.qpic.cn/mmbiz_png/98Zy5yRhqQQ5relQSQuJL5dSGFsRqVWg8NoCVClOqK2ArB6GI04m6NnM29v9FcbE1fBibI3bUSINQ7qY088k9qw/640?wx_fmt=png)

## 今年校招

最后再聊聊今年的校招情况吧。

可以预见的是，以后的互联网没有那么吃香，不是那个可以无脑 all in 的情况了。

当然机会还是有，工资还是可以开那个价，那要看跟什么比，如果跟传统行业机械甚至土木之类的，那总体来看还是略好的，我还是建议不要盲目选，否则不管是在学校学习还是找工作可能会十分痛苦，只是不像之前临时背点东西就能随便拿 offer 了。

之前随便写点crud，水两个奖+背背八股就能轻松进大厂是过去式了。

![](https://mmbiz.qpic.cn/mmbiz_jpg/98Zy5yRhqQQ5relQSQuJL5dSGFsRqVWg7NdA5Ndct3PFR1unqyIuK0mHf4ibWgwh7hvqqF5PbdkiayfBTTia7xxDw/640?wx_fmt=jpeg)

说回来，除了技术实力之外，一份展现能力的简历更重要了。候选人变多，岗位变少，如果你不突出就会落选，这是残酷的事实，可以说竞争的第一步就是简历。

近期我也看了很多粉丝发我的简历，说实话，各种情况都有，**有人写的优秀的离谱，实习+项目+奖项，内容充足，详略得当**。有人就连拼写都写不对，列举了一堆熟悉的技术，分布式、高并发，结果在项目详情里写「实现了分布式登录」。

如果实在不确定可以找业内的人（比如说我一直很钦佩的博主二哥）帮忙改改简历，指导一下学习路线，不要出现业余或者「学偏了」的情况，那就比较头疼，这部分时间很宝贵，如果耽误了校招，在社招难度就再升一级。

2022年的校招真的是地狱级难度，但我相信 2023 年是个不错的机会，大家一定要把握住，去年秋招没准备好，今天春招可以再冲刺一把；参加今年秋招的小伙伴也不要再停留在去年的悲伤中，勇敢一点，我也非常期待能在字节见到你，一起做同事（😁）

* * *

最后，把二哥的座右铭送给大家：**没有什么使我停留——除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟**。共勉 💪。

- ✌️：[2023，按这个价要](https://mp.weixin.qq.com/s/06g2wX97oZradMcKs_QaUQ)
- ✌️：[这个行业好起来了](https://mp.weixin.qq.com/s/HlbP9yjuNuVDbpEZDspkcA)
- ✌️：[刚入职，就想跑路了？](https://mp.weixin.qq.com/s/yns_tld3RTvtvwAYqsZ9zQ)
- ✌️：[字节跳动二进宫](https://mp.weixin.qq.com/s/k9R0B8pkU-Wahk4Vf1cgHQ)
- ✌️：[圆梦，被华为录用了](https://mp.weixin.qq.com/s/iET5LMUZ0Nlhrj7gwq6YQQ)
- ✌️：[进了外包，是不是就废了？](https://mp.weixin.qq.com/s/6eMGze7h7kI0GhG-dbxF7Q)
- ✌️：[离开杭州到郑州 6 个月后](https://mp.weixin.qq.com/s/xIBUMbbVAcXYrLF7aIm1MA)
- ✌️：[为什么我建议你考研冲一把？](https://mp.weixin.qq.com/s/zL5KE4phgSGb5p5k5Vp9UA)
- ✌️：[白菜价 35 万，挺满意](https://mp.weixin.qq.com/s/H8GJQKLTu6_ZUS8-61P8gg)
- ✌️：[奉劝那些想学好编程的人](https://mp.weixin.qq.com/s/d_f-xtiieb3L5nDjySRO3w)
- ✌️：[目前这情况，，跳槽外企](https://mp.weixin.qq.com/s/DJMuTOH0qlr0ZTS80KD14A)
- ✌️：[工作四年，被动醒悟](https://mp.weixin.qq.com/s/q-o4SBZQ3SH62T0c52aBUw)
- ✌️：[秋招 13 家 offer，手到擒来](https://mp.weixin.qq.com/s/LKkvcSdhMyXAGgtqEak0Zw)
- ✌️：[简历上写了这俩项目，超级加分！](https://mp.weixin.qq.com/s/yYWD0VPZ_NoGPOmhoa-OlQ)

![](https://files.mdnice.com/user/3903/b7e50cf4-6fca-4511-9bfd-aa1ed9eb587b.png)
