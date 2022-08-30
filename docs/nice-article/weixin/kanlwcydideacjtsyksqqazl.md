---
title: 看了我常用的IDEA插件，同事也开始悄悄安装了...
shortTitle: 看了我常用的IDEA插件，同事也开始悄悄安装了...
description: 装上这些IDEA插件，基本上就是一站式开发了！
author: 梦想de星空
category:
  - 微信公众号
head:
---

> IDEA是程序员用的最多的开发工具，很多程序员想把它打造成一站式开发工具，于是安装了各种各样的插件。通过插件在IDEA中完成各种操作，无需安装其他软件，确实很方便！今天给大家分享下我平时常用的IDEA插件，个个是精品！

## Key Promoter X

> Key Promoter X 是一款帮助你快速学习IDEA快捷键的插件，当你在IDEA中用鼠标点击某些功能时，它会自动提示你使用该功能的快捷键。它能让你更轻松地摆脱使用鼠标功能，从而只使用键盘来开发，这大概是刚开始使用IDEA的程序员最需要的插件了。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlpOY8zgIsFZcaA1Qlsl25BWsS1Vv4LDic5CNTRicSgAEAwIO4ZLz2wY8Q/640?wx_fmt=png)

当我们使用鼠标完成某些工作时，Key Promoter X会提示对应的快捷键，方便我们更快地掌握IDEA的快捷键。

![](https://mmbiz.qpic.cn/mmbiz_gif/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlzXDPGVraPr6dgicpo9DsF06rOa4BTl8uia9ohu9WCpVbdFN5IUBGjvug/640?wx_fmt=gif)

## Lombok

> Lombok目前已经是开发Java应用的标配了，不仅SpringBoot默认支持它，连IDEA也内置了Lombok插件，无需安装即可使用。Lombok是一款Java代码功能增强库，通过Lombok的注解，你可以不用再写getter、setter、equals等方法，Lombok将在编译时为你自动生成。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlrcOxS75lZy3qbCro7BaYb4IpTf8vj5Pwykvx3aqfibluHHRD103JL8A/640?wx_fmt=png)

举个例子，当我们给一个类添加@Getter和@Setter注解后；

```
/**

 * 修改订单费用信息参数

 * Created by macro on 2018/10/29.

 */@Getter@Setterpublic class OmsMoneyInfoParam {    @ApiModelProperty("订单ID")    private Long orderId;    @ApiModelProperty("运费金额")    private BigDecimal freightAmount;    @ApiModelProperty("管理员后台调整订单所使用的折扣金额")    private BigDecimal discountAmount;    @ApiModelProperty("订单状态：0->待付款；1->待发货；2->已发货；3->已完成；4->已关闭；5->无效订单")    private Integer status;}
```

Lombok就会为我们自动生成所有属性的Getter和Setter方法，无需我们再手写，具体使用可以参考[Lombok的使用](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247488419&idx=1&sn=8fcd89fe0727a5b3fc4179db3aaf9891&scene=21#wechat_redirect) 。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlu9zcNf5QqSmx0cXHmLuZ1k1m55fU5vfmh6mqLibHslwibysxqts4q87w/640?wx_fmt=png)

## MyBatisX

> MybatisX是一款基于IDEA的快速开发插件，由MyBatis-Plus团队开发维护，提示很全功能也很强大。支持xml和Mapper接口之间的跳转，自带图形化的代码生成器，可以通过类似JPA的方式，直接根据方法名称生成SQL实现。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlRSnbvRnJ6vrsrmNfKxvqEG0aaiaVtNenOE1Yt2iboZeetpebEAQolpqQ/640?wx_fmt=png)

我们点击Mapper接口方法左侧的图标可以直接跳转到xml中对应的SQL实现，在xml点击左侧图标也可以直接跳转到Mapper接口中对应的方法。

![](https://mmbiz.qpic.cn/mmbiz_gif/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBllgAxqJeaiaFwqiagnreeFlMom4rnBoK4wiatKRR9LZ5KYxMZPP2mKhiaXQ/640?wx_fmt=gif)

当我们创建符合JPA规范的方法时，能直接生成SQL实现无需手写，MyBatisX的功能很强大，详细使用可以参考[MybatisX插件的使用](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247502551&idx=1&sn=5017e6bf5b9aaabebcad8fb9f3fc7d89&scene=21#wechat_redirect) 。

![](https://mmbiz.qpic.cn/mmbiz_gif/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlNAWUBhNuZicAku4pRLa2mC9CQfOq7R9deJV7QcpBXko0eQoGPbeEjvQ/640?wx_fmt=gif)

## RestfulFastRequest

> RestfulFastRequest号称是IDEA版本的Postman，它是一个功能强大的Restful API工具包插件，可以根据已有的方法快速生成接口调试用例。它有一个漂亮的界面来完成请求、检查服务器响应、存储你的API请求和导出API请求，该插件能帮助你在IDEA内更快更高效地调试API！

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlhlovriaS7HTHwe47wicD87tFCsFZWBOh7eDpm1pkuqktIUuJr6UsLxFw/640?wx_fmt=png)

下面是使用RestfulFastRequest调试API接口的一张效果图，用起来还是非常方便的，具体使用可以参考[RestfulFastRequest插件的使用](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247499671&idx=1&sn=58d81623c3177b7ba95497c8e1cb2dce&scene=21#wechat_redirect) 。

![](https://mmbiz.qpic.cn/mmbiz_gif/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlcYfwTA6vHMprJdicIe9u4l3IKyusMjZJO6ibCPMhzotRsc6OQDHophXg/640?wx_fmt=gif)

## PlantUML

> PlantUML是一款开源的UML图绘制工具，支持通过文本来生成图形，使用起来非常高效。可以支持时序图、类图、对象图、活动图、思维导图等图形的绘制。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBl8YWWqnficZhibKnhibA95dQox91Aa4Mc7TiauVEHmnBaZ0J0xFhuaqKFDg/640?wx_fmt=png)

下面使用PlantUML来绘制一张流程图，可以实时预览，速度也很快，具体使用可以参考[PlantUML插件的使用](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247494438&idx=1&sn=d077f02bbe50276c9939d0c652809f4b&scene=21#wechat_redirect) 。

![](https://mmbiz.qpic.cn/mmbiz_gif/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlnhEAwVicVJJ5kqpnrHQW7khyKQVicdbFvVuPlXwQCZXYfksLq5nbtibJA/640?wx_fmt=gif)

## SequenceDiagram

> SequenceDiagram是一款能根据代码生成时序图的插件，还支持在时序图上直接导航到对应代码以及导出为图片或PlantUML文件。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBladZ7ajl62kD6cCQmjNYOJrBdwicickyeudiafhqY08Wiaeicwz9FlhH0ltw/640?wx_fmt=png)

下面是一张使用SequenceDiagram制作的时序图，还是非常不错的，具体使用可以参考[SequenceDiagram插件的使用](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247502397&idx=1&sn=f741bdcb205cc3304ae754fe9403ae7e&scene=21#wechat_redirect) 。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlwzNy7WJtHzr7ibwQeJcwV2fnnicuqrUwlKUJrVJfqWRXq1rUyjRY4oLQ/640?wx_fmt=png)

## GsonFormatPlus

> 一款能根据JSON字符串自动生成实体类的插件，支持Lombok。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlyFrlxYYTnPjlZTy9uMHTuiakKPHhybwkHWIJmMj4LxmPb6icbSzhf5nw/640?wx_fmt=png)

选择类名，右键生成，输入JSON字符串即可快速生成对应实体类。

![](https://mmbiz.qpic.cn/mmbiz_gif/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlGTiazT8iaKybqw4yibPDsS4UAZDicMQQt8icib2IVoibrj6208qA8aAkXuNQQ/640?wx_fmt=gif)

## Json Parser

> 一款简单小巧的JSON格式化插件，还在使用在线工具格式化JSON？试试这款IDEA插件吧！

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlOeIu0XmvzSrCcmJpZA8qOu8euHkTcY5WZ8FoxK2cVicfhRBicPa9jMSg/640?wx_fmt=png)

直接打开右侧面板，输入JSON字符串即可快速格式化，支持折叠显示。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlvjMBen7kuNjiaDDfYYkOlL84tqTcHtkWcy9bGMhCY0F70NUeQTnXgiaw/640?wx_fmt=png)

## String Manipulation

> 一款专业处理字符串的插件，支持各种格式代码命名方式的切换、支持各种语言的转义和反转义、支持字符加密、支持多个字符的排序、对齐、过滤等。总之功能很强大，有需要字符串操作时，可以试试它。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlbCFZOHwa6DRa7C42whehr3zL7uME9xqYqVzlr0fepgNLZicyu1Lia8UA/640?wx_fmt=png)

选中需要处理的字符串，右键打开菜单即可开始使用。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlmRibnCScXqtJ3agAMfpHkfE208yttMbkNib373iaZMjllc4yhIcib3adhg/640?wx_fmt=png)

## MapStruct support

> MapStruct是一款基于Java注解的对象属性映射工具，使用的时候我们只要在接口中定义好对象属性映射规则，它就能自动生成映射实现类，不使用反射，性能优秀。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlprQib0Hd2mQCIdyULh1LqNgv4Kibv5SlIM8gp3GOMFbfKibp4wELic7aow/640?wx_fmt=png)

当我们使用它的IDEA插件时，他能自动提示映射对象所包含的属性，并且在点击属性时能跳转到对应属性，具体使用可以参考[MapStruct的使用](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247494988&idx=1&sn=d5c1f888ce670ff5197c6a00cd63f966&scene=21#wechat_redirect) 。

![](https://mmbiz.qpic.cn/mmbiz_gif/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlcWfhI0ficFe4bia9aqSxzqpTOMEhyV06FsLOXbOtueC00icsmUibt9ziaqA/640?wx_fmt=gif)

## Alibaba Java Coding Guidelines

> 阿里巴巴《Java 开发手册》配套插件，可以实时检测代码中不符合手册规约的地方，助你码出高效，码出质量。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBld5kozGfOoCicctXeFRUgmYKV0jgrKjQ7mvnmgVfRoam2xiaIz4HzCcDg/640?wx_fmt=png)

比如说手册里有这么一条：

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlqVBYvwgmrMXM7G112DQ4qZeDTFMfmwF2Q51u20N9x6nBktYu3VWKBA/640?wx_fmt=png)

当我们违反手册规约时，该插件会自动检测并进行提示。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBllPEFROzcu5qrSDa9LuxjAxwKj8qu12NtrfAH0Nth9kZN1ex5Rvjkmw/640?wx_fmt=png)

同时提供了一键检测所有代码规约情况和切换语言的功能。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlaVTeCAiafKbZnOlIDicwWicDyORsHtCRZCy0b1YNz5SB33aSwCMOBw48g/640?wx_fmt=png)

如果你想修改某条规约的检测规则的话，可以通过设置的`Editor->Inspections`进行修改。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBl6fGJSkhDapyHsKEiakicsphgxIPpAI7VnzOnTlicVM2BIic6MraPx5nLqA/640?wx_fmt=png)

## Alibaba Cloud Toolkit

> CloudToolkit是阿里出品的一款IDEA插件，通过它我们可以更方便地实现自动化部署，其内置的终端工具和文件上传功能，即使用来管理服务器也非常方便！这款IDEA插件不仅功能强大，而且完全免费！

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlJdjdaFicmuCOC1obIhs6WEQj8NEcUMCFMdx9Fe9T36gwElkx7gNDAJg/640?wx_fmt=png)

配置好服务器后，通过它可以一件打包上传到服务器，然后自动执行指定的脚本。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlTKaYjA7bMp7A1803UVlS1aLsnuKNrCiakiaBAEOpPAOUyA434cRaVddw/640?wx_fmt=png)

其内置了一个终端工具，提示还挺全的，如果你想在IDEA里管理Linux服务器，不妨可以试试，具体使用可以参考[CloudToolkit插件的使用](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247500584&idx=1&sn=14ab8fa74ed8391a5cb91449f699123a&scene=21#wechat_redirect) 。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBl6gYB5jLiaTPTeF00S6B1C3EUYvuWEsgk2jgRVyGCkk7qyOzSAkRfBWA/640?wx_fmt=png)

## arthas idea

> 基于IDEA开发的Arthas命令生成插件，支持Arthas官方常用的命令，比如 watch、trace、ognl static、ognl bean method、field、monitor、stack 、tt等命令。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlK1eMSZF4jRDqly6Vjzvjj3Rib39u4pRUHibwzjehnkfODv4QEdrezjww/640?wx_fmt=png)

直接打开右键菜单，选择Arthas命令即可快速生成命令，具体使用可以参考[Arthas使用教程](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247499910&idx=1&sn=05c3177e74009bcaf309d5abd27ec4d5&scene=21#wechat_redirect) 。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlS8LoIBZp0BTGIVLpgbclrWbu1CNDIMqN17hmCyUOwibbhaCbengEv4A/640?wx_fmt=png)

## Docker

> IDEA官方提供的Docker插件，已内置，支持远程Docker环境的镜像和容器管理，同时支持使用Docker Compose实现批量部署。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlGsFWzOoTAfEJSGNTbmBD1iam9cqiaxMibSicMrNcJhh5ibT10KQ5g9wE1Vg/640?wx_fmt=png)

通过它能自动打包应用的镜像，jar包会直接上传到远程服务器并打包成镜像，具体使用可以参考[IDEA官方Docker插件的使用](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247500482&idx=1&sn=713a30c88cea125f4768e6a0df939600&scene=21#wechat_redirect) 。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlQ4Bs1SeuDFrU7PueOWRt5BibNHyiaiaDb22l642micNsGexLFkyxDhiccRw/640?wx_fmt=png)

## Maven Helper

> 解决Maven依赖冲突的好帮手，可以快速查找项目中的依赖冲突，并予以解决！

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlicYefCSEsyYMK2j5FcTKMYnt836CeqL1yRutGAevRicFG2kHU6MTgicLg/640?wx_fmt=png)

我们可以通过`pom.xml`文件底部的`依赖分析`标签页查看当前项目中的所有依赖。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlTUBhgpny25IqvT02IHsHQ5c6X50o1RB81ysQLgJ1K7y6TzSPVMyriaw/640?wx_fmt=png)

通过`冲突`按钮我们可以筛选出所有冲突的依赖，当前项目`guava`依赖有冲突，目前使用的是`18.0`版本。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlfYu50cEeNUKxjleOPI8DxAPzq7lcbjdmuubQXBohEuPwVBz2hcRqHw/640?wx_fmt=png)

选中有冲突的依赖，点击`Exclude`按钮可以直接排除该依赖。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlenONwRZyEOoeAfSRv8R0uVjwlwDBq50RFMtejelURpQNdy66EtA6Iw/640?wx_fmt=png)

同时`pom.xml`中也会对该依赖添加`<exclusion>`标签，是不是很方便啊！

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBll30iaJ9EORvU6DXHg4m7gngqzMX0Gia1F9uR23YgDs4tbNZkbT9jwFIA/640?wx_fmt=png)

## Grep Console

> 一款帮你分析控制台日志的插件，可以对不同级别的日志进行不同颜色的高亮显示，还可以用来按关键字搜索日志内容。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlt0UicM6HsmSsObXe13S3ricyKEXbcMyzHJxeku8BekvyfSt9nZK4gSMQ/640?wx_fmt=png)

当项目打印日志的时候，可以发现不同日志级别的日志会以不同颜色来显示。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlFTy1JsmSmRQfEDx1W6G7udfuru0vwKHqsQJDvhJxb17gG735c2QEicg/640?wx_fmt=png)

如果你需要修改配色方案的话，可以通过`Tools`打开该插件的配置菜单。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlHF3ySBBPTHzgpibUK9Bqy6YdRVgeBJdeI8wwbmdoOZQz96MPWKuibxMA/640?wx_fmt=png)

然后通过配置菜单修改配色方案。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlAuoD6sn3qKExl6YtHt1YLl3yq6lx6HPTeb2jicUS6CpYuuibCric3Mtyw/640?wx_fmt=png)

可以通过在控制台右键并使用`Grep`按钮来调出日志分析的窗口。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBl2ibwGChBBeMbj8DYVRibqmpako8e6hfibXiaKy5Lkadl1ceEvVlV4ISbwg/640?wx_fmt=png)

然后直接通过关键字来搜索即可。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlsI0e9IXPgicLrvAoFhLkWXkkzzEFOsNhwLGoVPEibs0iaaFcN7JCb9qMg/640?wx_fmt=png)

## Markdown

> IDEA官方出品的一款Markdown插件，支持编辑Markdown文件并进行预览，对于习惯了使用IDEA的小伙伴还是非常方便的。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlhSYrEwpia8l7mZfw4brKD5mANypYGu2SWCBRSwYaIjGu9HXvKic8IREw/640?wx_fmt=png)

使用它来编辑Markdown文件最方便的地方在于，可以直接使用IDEA提供的各种快捷键，无需适应一套新的快捷键。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBljic6qwhPNoSTGCjxNianhia6ic39u35HghCWwtibOzeRicPQb0iaxcdxFwpqg/640?wx_fmt=png)

## Translation

> 一款翻译插件，支持Google、有道、阿里、百度翻译，对我们看源码时翻译注释很有帮助！

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBl75MxQUOlTRGavHib3uLqYfibZyWvQlyDhhCgx6fT012wRugibdoEyfnOg/640?wx_fmt=png)

直接选中需要翻译的内容，点击右键即可找到翻译按钮；

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlq2aN2vDS0pfvbqcVAmXf7NZ2iamFHtNzAz08Tt5I2ml8Srqbe5dVoSg/640?wx_fmt=png)

直接使用`翻译文档`可以将整个文档都进行翻译；

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlLLicw4W72yROMhib9IGPsKq9wCUibVWOjaoNu58AliboLxtWy0nMaR7nmg/640?wx_fmt=png)

还可以通过右上角的翻译按钮直接翻译指定内容。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBls1D1eiauqM0GjYe8hqz6mN8MnECiaVdwgdV90QvR2DkS3BzUxHMgNECA/640?wx_fmt=png)

## Statistic

> 一款代码统计工具，可以用来统计当前项目中代码的行数和大小。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlwHFE4P9gAgD1wNzXwlAB02mKLxNlLQEJyB8HUkfibYyDicJhApBHYFng/640?wx_fmt=png)

我们可以通过顶部菜单中的`View->Tool Windows->Statistic`按钮开启该功能。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlOqm7weHhqbutOMFRXwSdyvgJcyRXvbOib5cgeHG11FhneEcxibb6d8NA/640?wx_fmt=png)

此时就可以看到我们项目代码的统计情况了，比如我的开源项目`mall`中`java`代码大小为`2818kB`，行数为`85645`。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlkJmGxwVE7bibQaYeG1pychk8MKn9yWiaq1Uka8ciaB50MGmN8lGMwg4SQ/640?wx_fmt=png)

## Vue.js

> Vue.js支持插件，写过前端的朋友肯定用过，可以根据模板创建`.vue`文件，也可以对Vue相关代码进行智能提示。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBl9iaNaTfDQUCDcR43h5aribBztOzDualgIpYdGntTiaRUfM1EoSxL0gwxw/640?wx_fmt=png)

启用该插件后，可以根据模板新建`.vue`文件。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlFsXkSxp67XWSgABUWUIcAibH8IUdrJZx9BxESLUu5WZP7GXfaTlNZFw/640?wx_fmt=png)

当我们在标签中写入以`v-`开头的代码时，会提示Vue中的相关指令。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBlEAj01VUxdujpticur0qiaA3x3AVBiceZH1ftKyfgPgiaeqBLhDyFAvq29Q/640?wx_fmt=png)

## 总结

以上是我常用的20款IDEA插件，涵盖了大部分应用场景，平时开发的时候基本上也够用了。不过IDEA插件虽然能增强它的功能，给我们提供一站式的开发体验，但是也不要安装过多，太多了容易卡！

* * *

**微信8.0将好友放开到了一万，小伙伴可以加我大号了，先到先得，再满就真没了**

**扫描下方二维码即可加我微信啦，`2022，抱团取暖，一起牛逼。`**

![](https://mmbiz.qpic.cn/mmbiz_jpg/CKvMdchsUwlqIArsbJQpdicibHTX0MZuBldpbo0uIa2665Ulkx603y2OxOy4HKAYs2WquLkPk1xu7ELnPOzZpficA/640?wx_fmt=jpeg)

## 推荐阅读

*   [技术总监亲自上阵，手撸了个电商可视化面板，产品经理惊呆了。。。](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247502786&idx=1&sn=331e34d3a03e94306c8637c65e86aae0&scene=21#wechat_redirect)
*   [换掉Typora！这款支持云端同步的开源笔记应用，太炫酷了！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247502723&idx=1&sn=82a1ee739178f5abe69deed34e758951&scene=21#wechat_redirect)
*   [盘点12个yyds的低代码开源项目，一天开发一个系统不是梦！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247502722&idx=1&sn=f3f457da3b0e07fb21627b2f2a67bf5a&scene=21#wechat_redirect)
*   [新同事把工作流引擎运用的炉火纯青，直接干掉几千行if else！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247502595&idx=1&sn=104533503b704a1cbeb02a4b3080b58f&scene=21#wechat_redirect)
*   [还在手写SQL实现？试试MyBatis-Plus同款IDEA插件吧！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247502551&idx=1&sn=5017e6bf5b9aaabebcad8fb9f3fc7d89&scene=21#wechat_redirect)
*   [推荐几款开源的数据库管理工具，界面炫酷，功能也很强！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247502443&idx=1&sn=cc881653e105e20622faaa67e16d36a7&scene=21#wechat_redirect)
*   [重磅更新！Mall实战教程全面升级，瞬间高大上了！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247499376&idx=1&sn=3ed28795cdd35fbaa3506e74a56703b0&scene=21#wechat_redirect)
*   [40K+Star！Mall电商实战项目开源回忆录！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247486684&idx=1&sn=807fd808adac8019eb2095ba088efe54&scene=21#wechat_redirect)



![](https://mmbiz.qpic.cn/mmbiz_gif/CKvMdchsUwlkU1ysoMgG69dVYbCQcI6Byneb8ibzZWPfUCr3T8CuBicCSGyFE6SpAtxpxtDCp6VlZ4F1hEL1BNyg/640?wx_fmt=gif)

>参考链接：[https://mp.weixin.qq.com/s/KiXWyhteyAiHo6FkYr2wXg](https://mp.weixin.qq.com/s/KiXWyhteyAiHo6FkYr2wXg)，出处：macrozheng，整理：沉默王二
