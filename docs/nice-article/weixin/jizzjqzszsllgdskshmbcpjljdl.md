---
title: 技术总监亲自上阵，手撸了个电商可视化面板，产品经理惊呆了。。。
shortTitle: 技术总监亲自上阵，手撸了个电商可视化面板，产品经理惊呆了。。。
description: 今天我们以电商项目为例，来聊聊电商项目的可视化面板需要包含哪些数据指标！
author: 老三
category:
  - 微信公众号
---

在我们平时做项目的时候，经常会遇到做可视化面板的需求，今天我们就以电商项目为例子，来聊聊电商项目的可视化面板需要包含哪些数据指标！

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-jizzjqzszsllgdskshmbcpjljdl-a826109e-3371-4630-9466-b6d5834d6127.jpg)



不知道你的日常是否经历过这样的场景——

*   产品：我们这期要上线巴拉巴拉……
*   开发：为什么要做这个需求呢？
*   产品：因为这个需求，能给我们带来\*\*收益……总之，好处大大地有！
*   开发：……

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-jizzjqzszsllgdskshmbcpjljdl-6d27b9bf-0661-4d25-a68d-3d91224e5dac.jpg)

放心，有你好果子吃

对于我们开发而言，很多时候想的的是写很吊的代码，收益也似乎很好衡量：

*   接口平均响应时间降低了30%
*   QPS提升了10%
*   节约了15%的机器
*   界面渲染时间降低20%
*   系统可用性提升一个9

……

但是更多时候，写的都是业务需求，一阵CRUD之后，只余深深的空虚……

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-jizzjqzszsllgdskshmbcpjljdl-ac753160-e356-48cb-b261-dac757c7f2ee.jpg)

秃然懵比

这节我们就来看看，电商的数据指标，了解我们肝的业务，收益在哪。

## 电商数据概览

> 事情是这样的，你是一个平平无奇的靓仔，某天窝在沙发上，刷着某音，突然一个漂亮的小姐姐映入眼帘，你忍不住点了进去，小姐姐的一顿操作让你头晕目眩，突然，视频的最后：“想要同款XX吗？点击评论区置顶链接！”
> 
> 恰饭啊，你还是忍不住点开了链接，点击进去，原来是一家新的电商网站，模特还不错，刷刷看。
> 
> 你浏览了首页的商品列表，没有找到想要的，你又在检索框，搜索“\*\*”，嘿嘿，这个好，你又忍不住点进详情页看了一下，刷了一下评论，你又发现有新人优惠券，买了！哦，还没注册，先注册，再购买，下单，付款，一气呵成，等着宝贝到了。
> 
> 没什么其它事情，你又刷了一会，发现有些东西有点想买，但又不是特别想买，嗯，先加购物车吧。
> 
> 过两天，你想起来，看看你的宝贝到哪了，哎，快到了，物流挺给力。看看购物车，你发现有些东西挺想要，选中购物车里的商品，下单、付款、躺平，你又接着刷小姐姐去了，嗯，这个小姐姐也有个链接，点进去看看……

看到上面这个，大家应该都知道对于电商而言，一个新用户购物的完整流程了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-jizzjqzszsllgdskshmbcpjljdl-f7b782d2-6a97-49f4-80fa-03793a45e154.jpg)

电商新用户购物

那么从数据指标的角度来看这一套业务的流程，它又是什么样子呢？

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-jizzjqzszsllgdskshmbcpjljdl-b29d77a7-1ca6-450f-bf19-1cbd4fc143d7.jpg)

电商业务流程数据看点

1.  **拉新**

拉新，最主要的方式就是广告，通过在各个渠道投放广告，像搜索引擎、抖音红人、公众号、微博等等。

通常需要关注每个渠道的拉新数量，和获客成本，比如CPA（单个注册成本）。

当然，拉新数据，更多的是市场部门在关注，产品关注更多的是人拉到网站后的数据。
2.  **流量**

用户来了之后，就会浏览各个页面，比如从渠道进来的落地页，商城的首页，商品分类的列表页，搜索的结果页，商品的详情页。

这里需要关注，每个页面的UV、PV、浏览时长、点击率等等。
3.  **转化**

用户光看看没啥用，挣不到钱，得看看用户是不是掏钱买，掏钱买的情况。

购买的几个关键点是：加购、下单、支付。

需要关注每个环节的人数，和从上一级下来的转化率，加购人数、加购率、下单人数、下单金额、支付单量、支付金额、客单价等等。

对于流量和转化，其实是呈一个漏斗形的，也就是所谓的`流量漏斗转化模型`：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-jizzjqzszsllgdskshmbcpjljdl-1d7104ba-5f2a-4917-8d43-ae79ee29805a.jpg)

流量漏斗转化模型

可以看到，每一级往下，都会过滤掉一些流量，所以也可以注意看一下，各个电商平台都在想法设法地缩减用户的购买流程，甚至抖音电商可以做到“一键购买”。
4.  **复购**

好不容易，拉来一个新用户，当然是希望用户多复购，不能做一锤子买卖。这时候，就要关注用户活跃度、复购率这些指标。

除了这个主线上的流程，我们还得关注一些其它的指标，例如营销活动的触达率，风险订单的拦截率，用户的满意度等等，接下来我们来详细看看电商的数据指标。

## 电商数据详览

### 用户指标

用户是电商的核心，有人来了，把人留住，电商才能生存和发展。

我们来看看，有哪些需要关注的用户指标：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-jizzjqzszsllgdskshmbcpjljdl-0f8d11c3-83dd-4d34-9486-736f6dc4c6c0.jpg)

主要用户指标

*   **注册用户数**：注册电商平台用户数
*   **日增新用户**：每天注册用户的数量
*   **活跃用户数**：登录了电商平台的用户，可以分为`日活跃用户`（日活：DAU）、`周活跃用户数`（周活：WAU）、月活跃用户（月活：MAU）
*   **活跃率**：活跃用户/总用户数。
*   **新用户数**：历史成交订单数为0的用户数
*   **老用户数**：历史成交订单数大于0的用户数
*   **复购用户数**：历史成交订单数大于1的用户数
*   **沉默用户数**：距离上次登录平台大于30天，小于90天的用户数
*   **流失用户数**：距离上次登录平台大于等于90天的用户数
*   **留存率**：（第1天新增的用户中，第N天还在登录浏览的用户数）/第1天新增用户数

根据时间，留存率又分为次日留存率、第7日留存率、第30日留存率。

根据不同用户的区分，可以对用户进行分层精细化运营，比如新用户可以通过新人优惠券和push，促使其尽快完成首单，沉默用户可以通过邮件、优惠等等尝试召回。

留存率可以评估电商产品功能对用户的黏性，如果留存率过低，那就说明用户对电商产品的粘性低，就得想办法提高留存了。

### 流量指标

流量规模指标，就是看看用户浏览了什么，多少用户浏览了。

关于流量，首先要知道两个指标的定义：

*   **PV**：访问次数，Page View，页面浏览次数，用户每打开一个网页可以看作一个PV，用户看了十个网页，那么PV为10。
*   **UV**：独立访客数，Unique Visitor，值得的是不重复访问电商平台的人数，一个用户一天之内看了十个界面，也之算一个UV。

电商平台分为多级页面，包括首页、活动页、列表页、搜索页、商详页等等，需要关注这些页面的流量，来观测各个页面对用户的吸引度、流量漏斗中哪一环流失比较多等等。

*   首页

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-jizzjqzszsllgdskshmbcpjljdl-b5f84f7b-dc6e-4583-8af6-c9139fa355d8.jpg)

首页

*   活动页

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-jizzjqzszsllgdskshmbcpjljdl-45ec832f-92a1-4dad-b0a7-e1a17b461fc2.jpg)

活动页

*   搜索页

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-jizzjqzszsllgdskshmbcpjljdl-9e6109e9-ec6e-4c5b-a0e9-aa27a9058a67.jpg)

搜索页

*   商详页

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-jizzjqzszsllgdskshmbcpjljdl-858232e5-c52c-4170-ac92-1721e9d4cada.jpg)

商品详情页

*   下单页

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-jizzjqzszsllgdskshmbcpjljdl-052645bb-d5bf-4cb5-b925-d8457d143694.jpg)

下单页

*   支付页

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-jizzjqzszsllgdskshmbcpjljdl-a168dc42-2620-4524-85fd-1d2df8f0c234.jpg)

支付页

通常需要关注各个界面的曝光UV、点击UV、页面点击PV、页面UV点击率、页面PV点击率。

所以大家可以看到，电商的产品经理在提需求的时候，除了UI、业务等等之外，通常都会附加一些埋点的需求，通过埋点上报，来分析流量数据。

### 转化/销售指标

用户来了，还得看用户买不买，这时候，就需要关注电商主要业务历程：`浏览`\>`加车`\>`下单`\>`支付` 各个节点的转化率，也就是所谓的`加车率`、`下单转化率`、`支付转化率`。

#### 购物车类指标

包括一定周期（日、周、月）`加入购物车次数`、`加入购物车用户数`、`加入购物车商品数`，也得关注流失的情况，`放弃购物车用户数`。

转化率包括`加购下单率`、`加购支付率`等等。

#### 订单类指标

订单是电商的核心模块。

包括基础指标的统计：`下单数量`、`下单用户数`、`下单金额`。

下单之后，还得关注最终的成交情况：`成交数量`、`成交用户数`、`成交金额`、`成交件单价=成交金额/成交数量`、`成交客单价=成交金额/成交人数`、`成交人数转化率=成交人数/下单人数`、`成交订单转化率=成交数量/下单数量`。

也得关注下单过程中的流失情况：`关单数量`、`关单人数`、`关单金额`、`自动关单数量`、`手动关单数量`。

手动关单通常会做一些问卷调查的功能，需要关注用户去掉订单的原因，商品质量、无法支付、价格过高……相当于用户调研，来根据用户的反馈不断迭代。

自动关单，通常会去做一些挽回，短信、邮件提醒用户支付，这时候也要关注弃单的挽回率。

#### 支付类指标

支付是电商业务的最后一环，做好这一环，整个交易才能平稳落地。

*   **支付方式覆盖度**

国内电商基本不用考虑太多的支付方式，支付宝、微信基本可以涵盖大部分用户的支付需求。跨境电商就不太一样了，支付方式复杂很多，包括信用卡支付、钱包支付、线下转账、本地支付等等，需要定期和竞品对比主要支付方式的覆盖度，来确定还有哪些支付方式要接入。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-jizzjqzszsllgdskshmbcpjljdl-27688977-852f-45fa-a0dc-c1a4df901b2c.jpg)

Lazada部分支付方式
*   **支付成功率**

支付是强依赖第三方的业务，不同支付公司提供的支付产品质量不同，需要关注不同渠道支付成功率，然后刨除正常的业务异常，观察系统级的异常，来判断不同渠道的支付产品质量。

支付的也涉及到和第三方的交互，例如钱包支付，需要拉起对应的钱包，所以也需要分客户端（APP、PC、WAP）去观测成功率，分析交互是否还有优化的空间。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-jizzjqzszsllgdskshmbcpjljdl-9614e30f-fdcb-45a6-9027-1c324d4dc6ad.jpg)

支付成功率
*   **收款成本**

还需要关注各个支付渠道的收款成本：包括收款费率和现金成本。现金成本包括账扣成本和平台服务费，账扣成本即信用卡等支付方式的拒付损失，账扣损失的原因可能包括欺诈、3DS（无卡支付）、产品问题、未收货、未退款等，可以通过统计账扣额度、原因占比和趋势，尽量减少损失。通过对比各渠道的收款成本优先选择性价比最高的支付渠道。另外可以对欺诈、拒付等风险指标进行监控，制定金额、占比、笔数等数据标准，如果出现超标则进行告警。

#### 总体指标

整个链路下来，我们还得看看整体的数据指标。

*   **总订单数**：用户完成下单的订单数之和。
*   **访问到下单转化率**：下单次数/访问次数
*   **总成交额（GMV）**：总的成交金额，也可以说“流水”，用户下单，就可以算在GMV里，包括下单未支付的金额。
*   **销售金额**：销售金额就是商品出售的金额综合，销售金额一般只指实际成交金额，所以GMV数字一般比销售金额大。
*   **客单价**：订单金额/订单数量。

### 复购指标

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-jizzjqzszsllgdskshmbcpjljdl-a4ed64ec-ca13-40f6-b84b-aaf6314a4431.jpg)

有调查数据显示，一个满意的用户会带来8笔潜在生意，不满意的用户可能会影响25个人的购买意愿，可见回头客多么重要。

复购率可以分为“用户复购率”和“订单复购率”，此外，“用户回购率”意义与复购率相似，也在此范围内。

*   **用户复购率**：单位时间内，购买两次及以上的用户数/有购买行为的总用户数
*   **订单复购率**：单位时间内，第二次及以上购买的订单个数/总订单数
*   **用户回购率**：单位时间内，有购买行为的老用户数/有购买行为的总用户数

分析复购是非常重要的：

*   可以分析用户黏性，辅助发现复购率问题，制定运营策略。
*   横向维度(商品、用户、渠道)对比分析，细化复购率，辅助问题定位。

## 电商指标总结

电商平台，主线业务的指标，差不多就是这些了，其实还有很多其它维度的指标，比如商品、物流、营销、风控、会员、满意度等等，以后有机会再讨论吧。

数据很重要，但不能迷信数据，比如海外的一些电商平台，数据很好看，市场占有率很高，但是用过之后，真心觉得不好用。这里就小声比比一下，做跨境电商的产品和运营，你们能不能不要盯着竞品抄？做的都不怎么样，去抄淘宝、京东啊！

我的读者应该基本都是开发，为什么我还会写这一篇数据的文章呢？因为说真的，我们的KPI、月报、季报、年报，没有数据支撑，只写一个工作列表，真的不好看，一定要想办法写点收益。

> 完成xx国际化功能，带来显著流量和转化率提升，xx国家首页PV提升60%，首页UV提升45%…… 访问下单转化率提升50%，累计提升订单量13000单，按客单价50计算，提升GMV$65000……

当然，老三不是专业的产品经理，或者数据分析工程师，文中难免有一些错漏，欢迎指出。

最最……后，再比比一句👇

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-jizzjqzszsllgdskshmbcpjljdl-4e6179a7-6e0e-442a-9bda-2b6e6f5cf981.jpg)

不开心

## 参考

*   [【长文干货】一文详解电商数据指标体系](https://mp.weixin.qq.com/s?__biz=Mzg5NzczMzg3OA==&mid=2247483773&idx=1&sn=d40f7185258ed09e35c31a80faa58bfc&scene=21#wechat_redirect)
*   数据分析逻辑：流量转化漏斗模型详解：https://www.woshipm.com/data-analysis/571256.html
*   电商数据分析的基本指标体系：https://www.cnblogs.com/HondaHsu/p/14356320.html
*   电商产品经理需要关注哪些数据指标？:https://new.qq.com/omn/20201107/20201107A0EFDG00.html
*   【数据分析】电商数据分析基础指标体系：https://cloud.tencent.com/developer/article/1045377
*   电商业务常用指标：https://zhuanlan.zhihu.com/p/82816765

* * *

**微信8.0将好友放开到了一万，小伙伴可以加我大号了，先到先得，再满就真没了**

**扫描下方二维码即可加我微信啦，`2022，抱团取暖，一起牛逼。`**

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-jizzjqzszsllgdskshmbcpjljdl-31b23af9-8010-4fd6-992b-a7185bc52016.jpg)

## 推荐阅读

*   [换掉Typora！这款支持云端同步的开源笔记应用，太炫酷了！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247502723&idx=1&sn=82a1ee739178f5abe69deed34e758951&scene=21#wechat_redirect)
*   [盘点12个yyds的低代码开源项目，一天开发一个系统不是梦！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247502722&idx=1&sn=f3f457da3b0e07fb21627b2f2a67bf5a&scene=21#wechat_redirect)
*   [新同事把工作流引擎运用的炉火纯青，直接干掉几千行if else！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247502595&idx=1&sn=104533503b704a1cbeb02a4b3080b58f&scene=21#wechat_redirect)
*   [还在手写SQL实现？试试MyBatis-Plus同款IDEA插件吧！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247502551&idx=1&sn=5017e6bf5b9aaabebcad8fb9f3fc7d89&scene=21#wechat_redirect)
*   [推荐几款开源的数据库管理工具，界面炫酷，功能也很强！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247502443&idx=1&sn=cc881653e105e20622faaa67e16d36a7&scene=21#wechat_redirect)
*   [开箱即用的后台管理系统模版，用来撸项目正合适！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247502434&idx=1&sn=5d98d82d3772d1a49547b1abaa2ab918&scene=21#wechat_redirect)
*   [重磅更新！Mall实战教程全面升级，瞬间高大上了！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247499376&idx=1&sn=3ed28795cdd35fbaa3506e74a56703b0&scene=21#wechat_redirect)
*   [40K+Star！Mall电商实战项目开源回忆录！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247486684&idx=1&sn=807fd808adac8019eb2095ba088efe54&scene=21#wechat_redirect)



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-jizzjqzszsllgdskshmbcpjljdl-1a01b369-da63-4603-8e87-3886aab664c6.jpg)

>参考链接：[https://mp.weixin.qq.com/s/1nrbGJ5fxNSZ9WqRODcB-A](https://mp.weixin.qq.com/s/1nrbGJ5fxNSZ9WqRODcB-A)，出处：macrozheng，整理：沉默王二
