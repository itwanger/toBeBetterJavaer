---
title: 程序汪接的8万智慧取餐柜项目
shortTitle: 程序汪接的8万智慧取餐柜项目
author: 程序汪
category:
  - 优质文章
---

> 本文章来自程序汪背后的私活小团队，开发智慧取餐柜的项目，本项目非常类似快递柜项目，本项目的完整解决方案跟大家分享一下，希望给大家一些参考  

  

B站 我是程序汪 点最下方原文链接进入  

![](https://mmbiz.qpic.cn/mmbiz_png/obDoO79MTFHAz8cYz4nxib6fiaVyr4cEVgDJsm6p8rWf2WwKMejdDibU97WWSP2ibjMROehjQ7ZORHgLe4btWgSLCQ/640?wx_fmt=png)

这是取餐柜成品的样子，硬件厂家提供的不用程序汪去开发硬件哦，我们只开发的软件部分（小程序，PC端，APP）

![](https://mmbiz.qpic.cn/mmbiz_png/obDoO79MTFHibEAuDnfCldrtP18icV44r5n9ibibzplAZnDty7BFzez2nsadjRmJwuWyQDq2LhqcAxIdKnmAGnfQsQ/640?wx_fmt=png)

  

下面是厂家快递过来的测试机器4口，别问我为什么跟上面的不一样，上面的那个实在太大了啊，测试联调只要接口OK就行  

![](https://mmbiz.qpic.cn/mmbiz_png/obDoO79MTFFcWw27h9hPibsicUqAKd4LZbmqJNCVyaRFkuzeNlpVU5Ilibz0pLibBicOiaib5lqwMYsNtbvzwJGjWN4Jw/640?wx_fmt=png)

  

  

流程图先晒下，画的很简单

![](https://mmbiz.qpic.cn/mmbiz_png/obDoO79MTFEt0wOnP0Enbp9AJgodVaibBoDyqxQqicPzB41LU5tVdLf4a68W4pHdTUxGTCQ8IvNFHwiaclniaA16og/640?wx_fmt=png)

  

  

  

B站【我是程序汪】  

  

  

现在开发项目都喜欢前面加个智慧，程序汪的这个项目也是智慧XXX

说白了就是一个外卖项目的升级版本  

![](https://mmbiz.qpic.cn/mmbiz_png/obDoO79MTFGr3zqU7QvZk780ticsnSpDFak6cBDI1dPvJWMjOZoEPUIeFcXFV4bQtVicrhiczhOf14rNHshTILh5A/640?wx_fmt=png)

这图是用processon画的  

### 开发人员情况（1人）  

*   uniapp 前端 技术栈 vue 主要任务 小程序及PC端页面,APP (存取 餐)
*   后端   技术栈  springboot
*   开发周期40天（设计+开发）
*   开发人数 1人  
*   整体费用是8万(不含硬件部分)，这是一期的开发费用
*   付款模式 5:4:1 首付：验收：尾款  
*   走的正规公司合同
*   云服务器1台 4核8G，经费有限先就安排1台，不够后面升级
*   维护费用 项目总款项10%  

  

  
*   售后维护
|
域名
|
服务器
|
日常运维
|

  

技术选型
----

*   核心框架：Spring Boot
*   数据库连接池：Druid
*   缓存：redis
*   前端：Vue
*   APP 小程序 Uniapp  
*   数据库：mysql
*   服务器配置 4核8G  
*   硬件接口开发联调（云打印机 取餐柜）

  

### 项目背景  

大城市里公司上班族，经常交通通勤都1个多小时，购买早餐也经常需要排很长的队，很浪费时间，本系统就是为了解决上班族购买早餐难的痛点而诞生的。程序汪上海上班时，吃早餐就很头疼，办公大厦楼下早餐店排队很夸张的，浪费了我很多写代码的时间呀。

  

  

### 小程序

程序汪把核心页面截图出来

本小程序主要功能就这些  

*   用户下订单  
*   骑手存餐

  

  

下面是我们的测试体验版小程序，初始数据有点随意

![](https://mmbiz.qpic.cn/mmbiz_png/obDoO79MTFEt0wOnP0Enbp9AJgodVaibB2ibwBZgXfa6k9TwI37ia4E0SaWbXbvPutxrDzURXydvEOEKkWsAW58kw/640?wx_fmt=png)

  

  

  

跟普通下单外卖不同的地方就是可以选择取餐时间和机柜

![](https://mmbiz.qpic.cn/mmbiz_png/obDoO79MTFEt0wOnP0Enbp9AJgodVaibBMLDjM4lgYbDcNyEmMGyQHYqzOuyHc1K1XO8k0nEmNVakDvSn0JFbTA/640?wx_fmt=png)

  

骑手进入本页面点击【存餐】触发 取餐柜  

![](https://mmbiz.qpic.cn/mmbiz_png/obDoO79MTFHibEAuDnfCldrtP18icV44r5tE22SgKjh78qLaQP5efibuEvAnxu9DormqCCIxfDy0LAJMJQgrKduRQ/640?wx_fmt=png)

  

  

![](https://mmbiz.qpic.cn/mmbiz_png/obDoO79MTFEt0wOnP0Enbp9AJgodVaibBjoNWhyhxT76lF4R7BpY59jMYMEBUUC05LTeeTPibCFzMtWQ5OUibziafQ/640?wx_fmt=png)

  

  

  

  

下单成功会短信通知用户 取餐码

![](https://mmbiz.qpic.cn/mmbiz_png/obDoO79MTFEt0wOnP0Enbp9AJgodVaibBBMSWohkMMPL4sWMkkogZSOGVia3Gj9uYPgODym0RMj4f1PFOTWyicibOQ/640?wx_fmt=png)

  

  

  

### PC端

目前主要功能，说白了在外卖系统二开的，分系统管理员和商家角色

*    商品管理 -分系统和商家
*    订单管理   \-分系统和商家
*    店铺管理   \-分系统和商家
*    会员权限管理
*    售后管理
*   统计报表
*   订单物流
*   财务管理  
*   骑手管理  

*     

下面截图就是开源系统上面二开的，别问我为啥管理系统页面都长了差不多，前端是Vue

  

系统管理员角色  

![](https://mmbiz.qpic.cn/mmbiz_png/obDoO79MTFEt0wOnP0Enbp9AJgodVaibBcWRDlxnmCsF1Zl6AzPf4kIqicSxHh9z9zick9Ocz1kPDlm1wO09421Kw/640?wx_fmt=png)

  

  

![](https://mmbiz.qpic.cn/mmbiz_png/obDoO79MTFEt0wOnP0Enbp9AJgodVaibBRphhn1htCwzpfjrMNCwJregXequUibCMbgaHr0nvicuV5vj80qaQ8kwg/640?wx_fmt=png)

  

商家角色![](https://mmbiz.qpic.cn/mmbiz_png/obDoO79MTFEt0wOnP0Enbp9AJgodVaibB2lz1EHN1AxQVoVScgmAibBoMuwBp39XRFaZnWQruXrj5HsmoQ9TPjDQ/640?wx_fmt=png)

  

![](https://mmbiz.qpic.cn/mmbiz_png/obDoO79MTFEt0wOnP0Enbp9AJgodVaibBokgic1Lv6Z7xlabe8vice0PiaIhHd8xIcZcar3ADgvjibQqn67ydia7yVbA/640?wx_fmt=png)

  

![](https://mmbiz.qpic.cn/mmbiz_png/obDoO79MTFEt0wOnP0Enbp9AJgodVaibBOBRBKsyDXGL96F4qZUmQpaKR2f0aaTP6MeFEp6s8ibicRVZWC21wX4og/640?wx_fmt=png)

  

### 硬件部分（取餐柜）

主要硬件是取餐柜，这个是找的第三方现成的硬件厂家，对方会提供接口文档具体的SDK包，我们的工作量就是接口开发然后联调一波。

  

![](https://mmbiz.qpic.cn/mmbiz_png/obDoO79MTFFcWw27h9hPibsicUqAKd4LZbmqJNCVyaRFkuzeNlpVU5Ilibz0pLibBicOiaib5lqwMYsNtbvzwJGjWN4Jw/640?wx_fmt=png)

  

![](https://mmbiz.qpic.cn/mmbiz_png/obDoO79MTFEt0wOnP0Enbp9AJgodVaibBxZEJAQqOYUiaicXwc6BK6bgRg77abDZcibfRePicTyLnia38OJDNFgWPBKA/640?wx_fmt=png)

  

![](https://mmbiz.qpic.cn/mmbiz_png/obDoO79MTFEt0wOnP0Enbp9AJgodVaibBPh1EPibIGGgDSricr9O4qBObltaJr3T0Z71b5l9IlvAdE8cVr99gBWpQ/640?wx_fmt=png)

  

![](https://mmbiz.qpic.cn/mmbiz_png/obDoO79MTFEt0wOnP0Enbp9AJgodVaibBEqZMXAMMucCo9yNL3RhoPdT3oZW4ZYvjopEfqVNGOwcdYy4XDqRHNw/640?wx_fmt=png)

  

  

![](https://mmbiz.qpic.cn/mmbiz_png/obDoO79MTFEt0wOnP0Enbp9AJgodVaibBWaicZkZibibwGcBwNpKtJybNTBvzhFJJGj1C3WFkJuTLuuZHBicg9hKCaw/640?wx_fmt=png)

  

![](https://mmbiz.qpic.cn/mmbiz_png/obDoO79MTFEt0wOnP0Enbp9AJgodVaibBU9kBPeyw7ab59qqlHVsxLQZVPhoUVhoxJicDRycJfWjOIfibBEicLEBbQ/640?wx_fmt=png)

  

![](https://mmbiz.qpic.cn/mmbiz_png/obDoO79MTFEt0wOnP0Enbp9AJgodVaibBmbryv7W2USucwN1DBKbDAgO358AVaeqzTrAZ5EzOTfJNv2qz8UiaOhQ/640?wx_fmt=png)

  

### 取餐接口（取餐柜）

下面我把核心的存餐接口给大家列出来下  

  

创建存餐订单
------

  

**使用场景**  

创建存餐订单

**操作名称**  

createOrder

**请求字段**

  

```
{  

    "deviceId":"xxxxxxxxxxx",   // 必传，设备ID  

    "shopOrderId":"00000000000000",   // 必传，商户订单号，最多32位字符  

    "type":1,   //非必传，请求的格子类型，普通小格1、普通大格2，不传递默认为1  

    "isWarm":"1",    // 非必传，是否开始加热（1-加热【取餐时自动关闭加热】、不传递或传递0为不加热）  

    "isLight":"1",    // 非必传，是否开灯（1-开灯【取餐时自动关灯】、不传递或传递0为不开灯）  

    "isDisinfect":"1",    // 非必传，是否开始消毒（1-加热【取餐时自动关闭消毒】、不传递或传递0为不消毒）  

    "takeCode":"1234",// 非必传，支持自定义取餐码，不传递 则AUV会默认自动生成4位取餐码  

    "cellId":"12",// 非必传，支持自定义格口号，不传递 则AUV会随机分配格口  

}  

  

```

  

**返回数据**

存餐成功：

  

```
{  

    "deviceId":"xxxxxxxxxxx",   //设备ID  

    "shopOrderId":"00000000000000",   //商户订单号，最多32位字符  

    "orderId":"11111111",   //存取订单ID  

    "cellId":"22",  // 占用的格子号  

    "code":"1234",    // 系统生成的取餐码，可以通过该值请求 takeByCode 接口进行取餐操作  

    "cellAlias":"22", // 占用的格子号别名  

}  

  

  

```

  

存餐失败（外层code和msg返回错误信息）：

复制

```
{}```

  

  

### 订单打印机

小程序端下订单后，会同步通知 XX云打印机，这部分硬件市面上也是有现成的，购买就行然后给云打印机系统进行接口对接即可。

  

硬件设备如下，也不贵 300元左右  

![](https://mmbiz.qpic.cn/mmbiz_png/obDoO79MTFEt0wOnP0Enbp9AJgodVaibBicZwDn10ThZnViaMjcGM3Vdn2ibHY1fx8KQFBTpg9gJjib5ic3tCpKysf4Q/640?wx_fmt=png)

  

打印小票样例如下

![](https://mmbiz.qpic.cn/mmbiz_png/obDoO79MTFEt0wOnP0Enbp9AJgodVaibB3zt9mcQqE4wUVV9waJr0RiaYf8h0kV22kxicm6EdedP6hvIAiboBF8Psw/640?wx_fmt=png)

  

  

  

  

  

文本打印接口
------

请求地址:`https://open-api.XXX.net/print/index`  

请求方式:POST

### 所需参数

名 称|类 型|描 述|是否必传|
---|---|---|---|
client\_id|string|开发者的应用ID，在开放平台创建应用时获得|是|
access\_token|string|授权的token 必要参数|是|
machine\_code|string|X联云打印机终端号|是|
content|string|打印内容(需要urlencode)，排版指令详见打印机指令|是|
idempotence|int|为 **1** 时，**origin\_id** 进行幂等处理，请确定 **origin\_id** 的唯一性|否|
origin\_id|string|商户系统内部订单号，要求32个字符内，只能是数字、大小写字母 ，且在同一个client\_id下唯一。详见商户订单号|是|
sign|string|签名 详见API文档列表-接口签名|是|
id|string|UUID4 详见API文档列表-uuid4|是|
timestamp|int|当前服务器时间戳(10位)|是|

### 返回详情

```
{"error":"0","error_description":"success",  

"body":{"id":"订单号","origin_id":""}}  

{"error":"8","error_description":"打印机信息错误,参数有误"}  

{"error":"9","error_description":"连接打印机失败,参数有误"}  

{"error":"10","error_description":"权限不足"}  

{"error":"12","error_description":"缺少必要参数"}  

{"error":"13","error_description":"打印失败,参数有误"}  

{'error':'33', 'error_description':'Uuid不合法'  

}  

  

  

```

  

  

### 核心表

如订单表  

  

```
-- ----------------------------  

DROP TABLE IF EXISTS `tp_order`;  

CREATE TABLE `tp_order` (  

  `order_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT COMMENT '订单id',  

  `order_sn` varchar(20) NOT NULL DEFAULT '' COMMENT '订单编号',  

  `master_order_sn` varchar(20) DEFAULT '' COMMENT '主订单号',  

  `user_id` mediumint(8) unsigned NOT NULL DEFAULT '0' COMMENT '用户id',  

  `order_status` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '订单状态',  

  `shipping_status` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '发货状态',  

  `pay_status` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '支付状态',  

  `consignee` varchar(60) NOT NULL DEFAULT '' COMMENT '收货人',  

  `country` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '国家',  

  `province` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '省份',  

  `city` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '城市',  

  `district` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '县区',  

  `twon` int(11) DEFAULT '0' COMMENT '乡镇',  

  `address` varchar(255) NOT NULL DEFAULT '' COMMENT '地址',  

  `zipcode` varchar(60) NOT NULL DEFAULT '' COMMENT '邮政编码',  

  `mobile` varchar(60) NOT NULL DEFAULT '' COMMENT '手机',  

  `email` varchar(60) NOT NULL DEFAULT '' COMMENT '邮件',  

  `shipping_code` varchar(32) NOT NULL DEFAULT '0' COMMENT '物流code',  

  `shipping_name` varchar(120) NOT NULL DEFAULT '' COMMENT '物流名称',  

  `pay_code` varchar(32) NOT NULL DEFAULT '' COMMENT '支付code',  

  `pay_name` varchar(120) NOT NULL DEFAULT '' COMMENT '支付方式名称',  

  `invoice_title` varchar(256) DEFAULT '' COMMENT '发票抬头',  

  `goods_price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '商品总价',  

  `shipping_price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '邮费',  

  `user_money` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '使用余额',  

  `coupon_price` decimal(10,2) DEFAULT '0.00' COMMENT '优惠了多少',  

  `integral` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '使用积分',  

  `integral_money` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '使用积分抵多少钱',  

  `order_amount` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '应付款金额',  

  `total_amount` decimal(10,2) DEFAULT '0.00' COMMENT '订单总价',  

  `add_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '下单时间',  

  `confirm_time` int(10) DEFAULT '0' COMMENT '收货确认时间',  

  `pay_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '支付时间',  

  `shipping_time` int(11) DEFAULT '0' COMMENT '最新发货时间',  

  `order_prom_id` smallint(6) NOT NULL DEFAULT '0' COMMENT '订单活动id',  

  `order_prom_amount` decimal(8,2) NOT NULL DEFAULT '0.00' COMMENT '订单活动优惠金额',  

  `discount` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '价格调整',  

  `user_note` varchar(255) NOT NULL DEFAULT '' COMMENT '用户备注',  

  `admin_note` varchar(255) DEFAULT '' COMMENT '管理员备注',  

  `parent_sn` varchar(100) DEFAULT NULL COMMENT '父单单号',  

  `store_id` int(10) DEFAULT '0' COMMENT '店铺ID',  

  `is_comment` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否评价（0：未评价；1：已评价）',  

  `deleted` tinyint(1) unsigned zerofill NOT NULL,  

  `is_checkout` tinyint(1) DEFAULT '0' COMMENT '0未结算1已结算',  

  `qishouid` int(11) DEFAULT '0',  

  `jiedantime` varchar(255) DEFAULT NULL,  

  `youhuiid` int(11) DEFAULT NULL,  

  `qucantime` varchar(255) DEFAULT NULL,  

  `shebeiid` varchar(255) DEFAULT NULL,  

  `qucanshebeiid` int(11) DEFAULT NULL,  

  `baozhuangfei` varchar(255) DEFAULT NULL,  

  `qucancode` varchar(255) DEFAULT NULL,  

  PRIMARY KEY (`order_id`),  

  UNIQUE KEY `order_sn` (`order_sn`) USING BTREE,  

  KEY `user_id` (`user_id`) USING BTREE,  

  KEY `order_status` (`order_status`) USING BTREE,  

  KEY `shipping_status` (`shipping_status`) USING BTREE,  

  KEY `pay_status` (`pay_status`) USING BTREE,  

  KEY `shipping_id` (`shipping_code`) USING BTREE,  

  KEY `pay_id` (`pay_code`) USING BTREE  

) ENGINE=MyISAM AUTO_INCREMENT=485 DEFAULT CHARSET=utf8;  

  

  

```

  

  

### 总结

其实本系统技术难度不高，只要把整个解决方案确定出来了，后面的也就写业务代码而已，各种硬件接口开发联调比较费时间，程序汪可以预测这种项目以后估计会越来越多，会大大提高大家的工作生活效率。

  

  

[程序汪接的其他7个私活都在这里，经验整理](http://mp.weixin.qq.com/s?__biz=MzA4NzQ0Njc4Ng==&mid=2247501524&idx=1&sn=2cb28e7b64ab77c55bcc1a172b82a2ad&chksm=903bc2b9a74c4baf5737cd430560ee3c5a357bb37864257a05a72e3cccf41db5bd221ccc63d8&scene=21#wechat_redirect)

  

**获取外卖项目源码点击下方链接**

[Spring Boot vue完整的外卖系统，手机端和后台管理api 源码赠送](http://mp.weixin.qq.com/s?__biz=Mzg2ODU0NTA2Mw==&mid=2247484544&idx=1&sn=0e5c23912d6c77fcfc0658b386d5693d&chksm=ceabe3c8f9dc6ade74e58bab71f57208762784beb75e71e43139790a9f8f7caf3b5fddf3641c&scene=21#wechat_redirect)  

  

  

![](https://mmbiz.qpic.cn/mmbiz_png/obDoO79MTFHAz8cYz4nxib6fiaVyr4cEVgVyoial9GRHL81TvsXhPLYwTXJ4PrY57AIXBw81DwVSbUVxrthdBSN8Q/640?wx_fmt=png)

**另外需要取餐柜详细开发功能资料的，****直接扫描下方公众号回复关键字「****743****」，****即可获取！**

![](https://mmbiz.qpic.cn/mmbiz_png/obDoO79MTFFnLRaUica5aAJrR62cTCHuF0M5TZUb2RsetxQsoIvicYdDUY4pvhkqzGibzAzf6ZYgP7EMD4ghFcsXQ/640?wx_fmt=png)

**▲长按二维码进行关注▲**  

**▲**回复「****743****」**▲**

**点下方原文链接观看B站视频版本**