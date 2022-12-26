---
title: 我在代码里面故意留个漏洞，违法吗？
shortTitle: 我在代码里面故意留个漏洞，违法吗？
description: 对程序员好一点吧
author: 知乎大神
category:
  - 微信公众号
head:
  - - meta
    - name: description
      content: 对程序员好一点吧
---

昨天我在逛知乎的时候，看到了这么一个问题：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-wozdmlmgylgldwfm-e0fea145-13d1-412d-81d3-a4618972f20a.jpg)

我看到了三个非常有意思的回答，分享给大家一看。

首先是这个为了防止项目交付后收不到尾款埋下后门的回答：

> *   答主：特立独行的猪
> *   链接：https://www.zhihu.com/question/531724027/answer/2487270093
> 
> 早年给某台企做外包项目，定制一个Android系统的ROM。开发费用16万，一年期维护费用2万。
> 
> 开发费用分三期打款，订金4万，生产环境ROM交付8万，验收并交付源码后打尾款4万。
> 
> 生产环境ROM交付前留了一手，加了时间戳校验，混杂在驱动程序里，6个月后不能开机。
> 
> 果不其然，过了4个月对方也没把尾款打过来，显然是用着没什么毛病，源码不打算要了，维护费用也一起省了。每次催款都用各种理由搪塞。
> 
> 又过了2个月，埋的雷爆了，他们的下游客户开始各种投诉。这才把剩余款项收回来。
> 
> 懒得说这家公司的名字，挺有名的公司，估计很多人用过他们的产品。
> 
> 如果不留这一手，估计就要吃哑巴亏了，毕竟台湾省的官司打起来费劲儿。在这种情况下，这叫自我保护，不违法。

这个回答让我想起了多年前我接私活的时候，给别人开发的软件交付后就玩消失的经历，那时候年轻，不知道做个时间限制啥的···不说了，说多了都是泪。

话说回来，真像这位答主这样弄个后门，违不违法，答主说了不算，还得具体问题具体分析，法院说了才算，不过这种做法还是比较危险，慎重。

那到底法律如何界定这种问题呢，来看一下网络安全界的大佬TK教主的回答：

> *   答主：tombkeeper
> *   链接：https://www.zhihu.com/question/531724027/answer/2539891264
> 
> 我国没有仅针对后门本身进行处罚的法律。主要原因是“后门”难以客观界定。
> 
> 比如，自动更新机制是不是后门？热补丁机制是不是后门？远程维护机制是不是后门？家里宽带有问题，你打运营商客服电话，运营商那边就能远程调整你的光猫——这是不是后门？
> 
> 所以现在法律在处理后门相关问题时，是根据利用行为定罪的。你留了后门，一辈子不用，没事。用来干坏事了，那就根据你具体干了什么坏事定罪量刑。

代码里面藏后门属于初级玩家，来看一下高级的后门长啥样：

> *   答主：沧海
> *   链接：https://www.zhihu.com/question/531724027/answer/2487130220
> 
> Ken Thompson在贝尔实验室的时候，他总是能在一台装了Unix的服务器上黑进他人的账户，不管他人怎么修改账户密码都没有用，当时贝尔实验室里面聚集的都是智商爆表、专业知识过硬的科学家，Ken的行为无疑让他们非常不爽。
> 
> 有个人分析了Unix的代码之后，找到了后门，重新编译部署了Uinx，但是让他们崩溃的事情再次发生，Ken还是能黑进他们的账户，这个事情让他们百思不得其解。
> 
> 一直到1983年，Ken获得图灵奖，在大会上解开了这个秘密，原来这个密码后门是通过他写的一个C编译器植入的，而当时那台Unix的机器必须通过这个C编译器编译之后才能运行，所以不管unix怎么修改都没有用，毕竟是要编译的。
> 
> 前几年发生的Xcode Ghost事件，就是用类似的方式操作的，所以真正的大神留的黑洞，一般人根本防不住，除非遇到同样的大神，而且人家告诉你在哪里了，才有可能破解。这就是为啥有的单位，人家不连外网，因为根本不知道装的系统有没有别人留下的漏洞。
> 
> 低级的代码层次
> 
> 中级的在工具链上
> 
> 高级的在编译器层次
> 
> 终极的在机器内部，这个根本防不胜防。
> 
> 所以对程序员好一点。

这让我想起了不久前发生的一件事：有黑客组织在IDA里面投毒。IDA是安全人员逆向分析的重要软件，给这里面投毒，属于定向攻击搞安全的人了，真是防不胜防啊。

各位铁汁们，你们有过在代码里藏后门的经验吗，评论区说说看呢？

往期推荐
----

*   [核弹级漏洞！我把log4j扒给你看！](https://mp.weixin.qq.com/s?__biz=MzIyNjMxOTY0NA==&mid=2247493241&idx=1&sn=25a4f5e770dabb10a8abe96f692d7391&scene=21#wechat_redirect)
*   [可怕！CPU暗藏了这些未公开的指令！](https://mp.weixin.qq.com/s?__biz=MzIyNjMxOTY0NA==&mid=2247495061&idx=1&sn=692ba561fed0f7ae6865f2b8da8fbffd&scene=21#wechat_redirect)
*   [我是Redis，MySQL大哥被我害惨了！](https://mp.weixin.qq.com/s?__biz=MzIyNjMxOTY0NA==&mid=2247486528&idx=1&sn=3f7b09eb21969fdb16f5b0805ff69fed&scene=21#wechat_redirect)
*   [CPU被挖矿，Redis竟是内鬼！](https://mp.weixin.qq.com/s?__biz=MzIyNjMxOTY0NA==&mid=2247493024&idx=1&sn=8b055fdaffb7455ffea23a9915adfca8&scene=21#wechat_redirect)
*   [主板上来了一个新邻居，CPU慌了！](https://mp.weixin.qq.com/s?__biz=MzIyNjMxOTY0NA==&mid=2247487726&idx=1&sn=f603721ed8603a671626a48ab97c7e61&scene=21#wechat_redirect)

>转载链接：[https://mp.weixin.qq.com/s?__biz=MzIyNjMxOTY0NA==&mid=2247495770&idx=1&sn=1b60bb6cb4eae6c4c221e1b081971ce3&chksm=e870fc29df07753ff4f6d5799dac312b666ce29be37f978672dd95d4d5c39639da6110bfcd7b#rd](https://mp.weixin.qq.com/s?__biz=MzIyNjMxOTY0NA==&mid=2247495770&idx=1&sn=1b60bb6cb4eae6c4c221e1b081971ce3&chksm=e870fc29df07753ff4f6d5799dac312b666ce29be37f978672dd95d4d5c39639da6110bfcd7b#rd)，出处：编程技术宇宙，整理：沉默王二
