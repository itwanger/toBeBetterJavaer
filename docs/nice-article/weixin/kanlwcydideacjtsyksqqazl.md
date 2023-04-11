---
title: 看了我常用的IDEA插件，同事也开始悄悄安装了...
shortTitle: 看了我常用的IDEA插件，同事也开始悄悄安装了...
description: 装上这些IDEA插件，基本上就是一站式开发了！
author: 梦想de星空
category:
  - 微信公众号
---

> IDEA是程序员用的最多的开发工具，很多程序员想把它打造成一站式开发工具，于是安装了各种各样的插件。通过插件在IDEA中完成各种操作，无需安装其他软件，确实很方便！今天给大家分享下我平时常用的IDEA插件，个个是精品！

## Key Promoter X

> Key Promoter X 是一款帮助你快速学习IDEA快捷键的插件，当你在IDEA中用鼠标点击某些功能时，它会自动提示你使用该功能的快捷键。它能让你更轻松地摆脱使用鼠标功能，从而只使用键盘来开发，这大概是刚开始使用IDEA的程序员最需要的插件了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-8b1ac9fc-7f02-40b1-82cb-9b978904550c.jpg)

当我们使用鼠标完成某些工作时，Key Promoter X会提示对应的快捷键，方便我们更快地掌握IDEA的快捷键。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-2559d11a-dab7-47c9-a21c-b63542c5ac3c.jpg)

## Lombok

> Lombok目前已经是开发Java应用的标配了，不仅SpringBoot默认支持它，连IDEA也内置了Lombok插件，无需安装即可使用。Lombok是一款Java代码功能增强库，通过Lombok的注解，你可以不用再写getter、setter、equals等方法，Lombok将在编译时为你自动生成。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-9d66c731-02e8-4edf-a7c5-f6c70baef2b4.jpg)

举个例子，当我们给一个类添加@Getter和@Setter注解后；

```
/**

 * 修改订单费用信息参数

 * Created by macro on 2018/10/29.

 */
@Getter
@Setter
public class OmsMoneyInfoParam {
    @ApiModelProperty("订单ID")
    private Long orderId;
    @ApiModelProperty("运费金额")
    private BigDecimal freightAmount;
    @ApiModelProperty("管理员后台调整订单所使用的折扣金额")
    private BigDecimal discountAmount;
    @ApiModelProperty("订单状态：0->待付款；1->待发货；2->已发货；3->已完成；4->已关闭；5->无效订单")
    private Integer status;
}
```

Lombok就会为我们自动生成所有属性的Getter和Setter方法，无需我们再手写，具体使用可以参考[Lombok的使用](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247488419&idx=1&sn=8fcd89fe0727a5b3fc4179db3aaf9891&scene=21#wechat_redirect) 。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-2bc5335b-8fc6-40ec-8a59-3dc7b04810eb.jpg)

## MyBatisX

> MybatisX是一款基于IDEA的快速开发插件，由MyBatis-Plus团队开发维护，提示很全功能也很强大。支持xml和Mapper接口之间的跳转，自带图形化的代码生成器，可以通过类似JPA的方式，直接根据方法名称生成SQL实现。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-fbc950d4-9ebe-4717-875c-a6529a28ca9a.jpg)

我们点击Mapper接口方法左侧的图标可以直接跳转到xml中对应的SQL实现，在xml点击左侧图标也可以直接跳转到Mapper接口中对应的方法。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-37e6ad45-119f-46d3-b779-9e4f5fb34a7e.jpg)

当我们创建符合JPA规范的方法时，能直接生成SQL实现无需手写，MyBatisX的功能很强大，详细使用可以参考[MybatisX插件的使用](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247502551&idx=1&sn=5017e6bf5b9aaabebcad8fb9f3fc7d89&scene=21#wechat_redirect) 。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-25131db6-9cb4-4679-b346-9eeeb51a623e.jpg)

## RestfulFastRequest

> RestfulFastRequest号称是IDEA版本的Postman，它是一个功能强大的Restful API工具包插件，可以根据已有的方法快速生成接口调试用例。它有一个漂亮的界面来完成请求、检查服务器响应、存储你的API请求和导出API请求，该插件能帮助你在IDEA内更快更高效地调试API！

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-9e9de39c-73d0-4b58-bed8-eeac8c8ee863.jpg)

下面是使用RestfulFastRequest调试API接口的一张效果图，用起来还是非常方便的，具体使用可以参考[RestfulFastRequest插件的使用](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247499671&idx=1&sn=58d81623c3177b7ba95497c8e1cb2dce&scene=21#wechat_redirect) 。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-6cebb0cd-8959-4f4b-be79-7ac7f3c4d2c8.jpg)

## PlantUML

> PlantUML是一款开源的UML图绘制工具，支持通过文本来生成图形，使用起来非常高效。可以支持时序图、类图、对象图、活动图、思维导图等图形的绘制。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-08a4be24-d19b-4824-aed8-265e6f218550.jpg)

下面使用PlantUML来绘制一张流程图，可以实时预览，速度也很快，具体使用可以参考[PlantUML插件的使用](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247494438&idx=1&sn=d077f02bbe50276c9939d0c652809f4b&scene=21#wechat_redirect) 。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-b9888ed3-52d8-47d3-9d68-ee32b303a001.jpg)

## SequenceDiagram

> SequenceDiagram是一款能根据代码生成时序图的插件，还支持在时序图上直接导航到对应代码以及导出为图片或PlantUML文件。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-a54664e1-1058-4a4a-b5a0-e28be3054b34.jpg)

下面是一张使用SequenceDiagram制作的时序图，还是非常不错的，具体使用可以参考[SequenceDiagram插件的使用](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247502397&idx=1&sn=f741bdcb205cc3304ae754fe9403ae7e&scene=21#wechat_redirect) 。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-cb407005-f7ce-4c24-8ee6-01dd86151ba8.jpg)

## GsonFormatPlus

> 一款能根据JSON字符串自动生成实体类的插件，支持Lombok。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-bdd910d7-0535-4f80-9ffd-94e69fa89c2a.jpg)

选择类名，右键生成，输入JSON字符串即可快速生成对应实体类。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-c77312cf-0172-43b8-a0b2-fa024efb1882.jpg)

## Json Parser

> 一款简单小巧的JSON格式化插件，还在使用在线工具格式化JSON？试试这款IDEA插件吧！

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-166a3b90-b1d4-4924-8421-5a4b5cd6970a.jpg)

直接打开右侧面板，输入JSON字符串即可快速格式化，支持折叠显示。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-2f5da189-4175-4363-a31c-9385a85af1a9.jpg)

## String Manipulation

> 一款专业处理字符串的插件，支持各种格式代码命名方式的切换、支持各种语言的转义和反转义、支持字符加密、支持多个字符的排序、对齐、过滤等。总之功能很强大，有需要字符串操作时，可以试试它。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-91ed09a0-7148-4e15-95ff-3680be0e2ee7.jpg)

选中需要处理的字符串，右键打开菜单即可开始使用。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-55237b57-08ad-4e12-9d76-65bc49f326e3.jpg)

## MapStruct support

> MapStruct是一款基于Java注解的对象属性映射工具，使用的时候我们只要在接口中定义好对象属性映射规则，它就能自动生成映射实现类，不使用反射，性能优秀。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-0d9e8e2b-b5ac-4ac5-bbec-b1fde5a7c67d.jpg)

当我们使用它的IDEA插件时，他能自动提示映射对象所包含的属性，并且在点击属性时能跳转到对应属性，具体使用可以参考[MapStruct的使用](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247494988&idx=1&sn=d5c1f888ce670ff5197c6a00cd63f966&scene=21#wechat_redirect) 。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-49311721-e0a8-4ebd-9868-4400a5ea1298.jpg)

## Alibaba Java Coding Guidelines

> 阿里巴巴《Java 开发手册》配套插件，可以实时检测代码中不符合手册规约的地方，助你码出高效，码出质量。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-cc34f4ff-c307-47a3-910f-bfd8c4919fc2.jpg)

比如说手册里有这么一条：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-20146973-d2e4-47e6-92de-dc1ec434dca8.jpg)

当我们违反手册规约时，该插件会自动检测并进行提示。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-895f6075-63c4-471e-b36a-a036d7cb8270.jpg)

同时提供了一键检测所有代码规约情况和切换语言的功能。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-80907652-536a-4668-ba66-e10295cfbd85.jpg)

如果你想修改某条规约的检测规则的话，可以通过设置的`Editor->Inspections`进行修改。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-7fca4eca-ef6a-4fc6-aad5-7e0ae743648e.jpg)

## Alibaba Cloud Toolkit

> CloudToolkit是阿里出品的一款IDEA插件，通过它我们可以更方便地实现自动化部署，其内置的终端工具和文件上传功能，即使用来管理服务器也非常方便！这款IDEA插件不仅功能强大，而且完全免费！

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-f125a783-13d6-46b7-a49a-4bc0b1901c26.jpg)

配置好服务器后，通过它可以一件打包上传到服务器，然后自动执行指定的脚本。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-3a3bc955-09b1-4459-bdd9-782f5260e356.jpg)

其内置了一个终端工具，提示还挺全的，如果你想在IDEA里管理Linux服务器，不妨可以试试，具体使用可以参考[CloudToolkit插件的使用](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247600+584&idx=1&sn=14ab8fa74ed8391a5cb91449f699123a&scene=21#wechat_redirect) 。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-1fdbe59d-f2a3-4c49-ba08-2da45166b01b.jpg)

## arthas idea

> 基于IDEA开发的Arthas命令生成插件，支持Arthas官方常用的命令，比如 watch、trace、ognl static、ognl bean method、field、monitor、stack 、tt等命令。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-6f92e92d-ca39-49ff-baf2-807a8fd0fdd2.jpg)

直接打开右键菜单，选择Arthas命令即可快速生成命令，具体使用可以参考[Arthas使用教程](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247499910&idx=1&sn=05c3177e74009bcaf309d5abd27ec4d5&scene=21#wechat_redirect) 。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-1a54711d-84ca-46dc-9fa9-b3845ad8ecee.jpg)

## Docker

> IDEA官方提供的Docker插件，已内置，支持远程Docker环境的镜像和容器管理，同时支持使用Docker Compose实现批量部署。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-718d5959-84f3-464c-a6d8-017d31372ff0.jpg)

通过它能自动打包应用的镜像，jar包会直接上传到远程服务器并打包成镜像，具体使用可以参考[IDEA官方Docker插件的使用](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247600+482&idx=1&sn=713a30c88cea125f4768e6a0df939600&scene=21#wechat_redirect) 。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-1736f431-5fb8-46da-a31e-af78bbf89aa8.jpg)

## Maven Helper

> 解决Maven依赖冲突的好帮手，可以快速查找项目中的依赖冲突，并予以解决！

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-6d4a3d50-8b8a-4753-bcce-cbc7394c82e0.jpg)

我们可以通过`pom.xml`文件底部的`依赖分析`标签页查看当前项目中的所有依赖。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-e1b0c015-8b33-4f9d-9a51-5e213163586f.jpg)

通过`冲突`按钮我们可以筛选出所有冲突的依赖，当前项目`guava`依赖有冲突，目前使用的是`18.0`版本。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-3160f04c-a173-46ca-afee-f0bca06f8b0d.jpg)

选中有冲突的依赖，点击`Exclude`按钮可以直接排除该依赖。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-fca14b07-826b-4831-ab68-a32eb59f3540.jpg)

同时`pom.xml`中也会对该依赖添加`<exclusion>`标签，是不是很方便啊！

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-f8b2b6bb-d4df-4557-beba-cc09672a7765.jpg)

## Grep Console

> 一款帮你分析控制台日志的插件，可以对不同级别的日志进行不同颜色的高亮显示，还可以用来按关键字搜索日志内容。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-d81fa4ad-18c1-4ae7-8e23-4bf1ae00d8c5.jpg)

当项目打印日志的时候，可以发现不同日志级别的日志会以不同颜色来显示。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-32a28dde-ad69-4d4c-a33f-684f89f0a7ea.jpg)

如果你需要修改配色方案的话，可以通过`Tools`打开该插件的配置菜单。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-1bae4f42-6bdc-4458-8806-d7cfb82e1878.jpg)

然后通过配置菜单修改配色方案。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-0abaa58b-1d51-47e2-8c48-402dc6e8bba4.jpg)

可以通过在控制台右键并使用`Grep`按钮来调出日志分析的窗口。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-c43b8cd9-4aef-4baf-b432-ec58fd3f7104.jpg)

然后直接通过关键字来搜索即可。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-84e820ef-d8d2-4b6e-a795-43a537b7abff.jpg)

## Markdown

> IDEA官方出品的一款Markdown插件，支持编辑Markdown文件并进行预览，对于习惯了使用IDEA的小伙伴还是非常方便的。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-3e5b150d-0a00-48b9-9592-130985d68cee.jpg)

使用它来编辑Markdown文件最方便的地方在于，可以直接使用IDEA提供的各种快捷键，无需适应一套新的快捷键。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-4e863de5-9007-4d96-8b56-0f65356ff7b6.jpg)

## Translation

> 一款翻译插件，支持Google、有道、阿里、百度翻译，对我们看源码时翻译注释很有帮助！

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-2ffe4195-0290-4a4e-8ac3-5f1fd46b01b2.jpg)

直接选中需要翻译的内容，点击右键即可找到翻译按钮；

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-9fbbbc70-e68f-45bb-8f2c-12aa0ffe5a11.jpg)

直接使用`翻译文档`可以将整个文档都进行翻译；

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-468e0f49-9906-4674-9f8f-f76d6771badf.jpg)

还可以通过右上角的翻译按钮直接翻译指定内容。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-a9d2a34e-2e97-4d84-b491-5a098acdc47a.jpg)

## Statistic

> 一款代码统计工具，可以用来统计当前项目中代码的行数和大小。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-f760cc20-3c24-49fb-93a3-03e236ceb795.jpg)

我们可以通过顶部菜单中的`View->Tool Windows->Statistic`按钮开启该功能。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-29f71e38-f9ed-4c67-8dff-2ef6a6bfe2f4.jpg)

此时就可以看到我们项目代码的统计情况了，比如我的开源项目`mall`中`java`代码大小为`2818kB`，行数为`85645`。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-254b9bd9-6cb4-4a13-8e69-12524c93a4a0.jpg)

## Vue.js

> Vue.js支持插件，写过前端的朋友肯定用过，可以根据模板创建`.vue`文件，也可以对Vue相关代码进行智能提示。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-bc6bc752-a6a1-439d-95a2-d20861139232.jpg)

启用该插件后，可以根据模板新建`.vue`文件。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-e4b3926d-718d-418d-abd8-00878a7826c9.jpg)

当我们在标签中写入以`v-`开头的代码时，会提示Vue中的相关指令。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-ae2b3b0c-45f1-43fb-8d70-8a8a3b2759bc.jpg)

## 总结

以上是我常用的20款IDEA插件，涵盖了大部分应用场景，平时开发的时候基本上也够用了。不过IDEA插件虽然能增强它的功能，给我们提供一站式的开发体验，但是也不要安装过多，太多了容易卡！

* * *

**微信8.0将好友放开到了一万，小伙伴可以加我大号了，先到先得，再满就真没了**

**扫描下方二维码即可加我微信啦，`2022，抱团取暖，一起牛逼。`**

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-c42dc7ad-1dc6-49da-9c00-6329c88a62dc.jpg)

## 推荐阅读

*   [技术总监亲自上阵，手撸了个电商可视化面板，产品经理惊呆了。。。](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247502786&idx=1&sn=331e34d3a03e94306c8637c65e86aae0&scene=21#wechat_redirect)
*   [换掉Typora！这款支持云端同步的开源笔记应用，太炫酷了！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247502723&idx=1&sn=82a1ee739178f5abe69deed34e758951&scene=21#wechat_redirect)
*   [盘点12个yyds的低代码开源项目，一天开发一个系统不是梦！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247502722&idx=1&sn=f3f457da3b0e07fb21627b2f2a67bf5a&scene=21#wechat_redirect)
*   [新同事把工作流引擎运用的炉火纯青，直接干掉几千行if else！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247502595&idx=1&sn=104533503b704a1cbeb02a4b3080b58f&scene=21#wechat_redirect)
*   [还在手写SQL实现？试试MyBatis-Plus同款IDEA插件吧！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247502551&idx=1&sn=5017e6bf5b9aaabebcad8fb9f3fc7d89&scene=21#wechat_redirect)
*   [推荐几款开源的数据库管理工具，界面炫酷，功能也很强！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247502443&idx=1&sn=cc881653e105e20622faaa67e16d36a7&scene=21#wechat_redirect)
*   [重磅更新！Mall实战教程全面升级，瞬间高大上了！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247499376&idx=1&sn=3ed28795cdd35fbaa3506e74a56703b0&scene=21#wechat_redirect)
*   [40K+Star！Mall电商实战项目开源回忆录！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247486684&idx=1&sn=807fd808adac8019eb2095ba088efe54&scene=21#wechat_redirect)



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kanlwcydideacjtsyksqqazl-4b623ba8-12e9-47e2-a370-790dd8e615f8.jpg)

>参考链接：[https://mp.weixin.qq.com/s/KiXWyhteyAiHo6FkYr2wXg](https://mp.weixin.qq.com/s/KiXWyhteyAiHo6FkYr2wXg)，出处：macrozheng，整理：沉默王二
