---
title: 学会 Arthas，让你 3 年经验掌握 5 年功力！
shortTitle: 学会 Arthas，让你 3 年经验掌握 5 年功力！
description: 有了这款神器，既可以线上调试，又可以实现热修复，推荐给大家！
author: 梦想de星空
category:
  - 微信公众号
---

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwnWxQwZTsUTr44QOG4offoofMt02gUqw6HxR9PyOoAlPutQEBKmxlSdGW0sfJmwdMjHffuVzw59pw/640?wx_fmt=png)

mall学习教程官网：**macrozheng.com**

> 线上项目遇到问题无法调试，线下又无法重现，难道只能加日志再重新发布么？有了这款神器，既可以线上调试，又可以实现热修复，推荐给大家！

## Arthas 简介

Arthas是Alibaba开源的Java诊断工具，深受开发者喜爱。它采用命令行交互模式，同时提供丰富的 Tab 自动补全功能，进一步方便进行问题的定位和诊断。

## 安装

> 为了还原一个真实的线上环境，我们将通过Arthas来对Docker容器中的Java程序进行诊断。

*   使用`arthas-boot`，下载对应jar包，下载地址：https://alibaba.github.io/arthas/arthas-boot.jar
*   将我们的Spring Boot应用`mall-tiny-arthas`使用Docker容器的方式启动起来，打包和运行脚本在项目的`src\main\docker`目录下；
*   将`arthas-boot.jar`拷贝到我们应用容器的`\`目录下；

```
docker container cp arthas-boot.jar mall-tiny-arthas:/
```
 

> **这或许是一个对你有用的开源项目**，mall项目是一套基于 SpringBoot + Vue + uni-app 实现的电商系统（**Github标星60K**），采用Docker容器化部署。包括前台商城项目和后台管理系统，能支持完整的订单流程！涵盖商品、订单、购物车、权限、优惠券、会员、支付等功能，功能很强大！
> 
> *   项目地址：**https://github.com/macrozheng/mall**
> *   视频教程：**https://www.macrozheng.com/video/**
> 
> 后台管理系统演示：
> 
> ![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwnWxQwZTsUTr44QOG4offooZibx2EYRWyJrY7NmXbXfcB4CwIqjEGqc8RT6pgLWOBOc23rbXiaoPJAA/640?wx_fmt=png)
> 
> 前台商城项目演示：
> 
> ![](https://mmbiz.qpic.cn/mmbiz_jpg/CKvMdchsUwnWxQwZTsUTr44QOG4offooPpBKzKdNcKKkF1dV99uu44cz6ib9aPHRiaXAsBst5bdGNMd1rHdlZD5g/640?wx_fmt=jpeg)

*   进入容器并启动`arthas-boot`，直接当做jar包启动即可；

```
docker exec -it mall-tiny-arthas /bin/bash  java -jar arthas-boot.jar
```
 

*   启动成功后，选择当前需要诊断的Java程序的序列号，这里是`1`，就可以开始诊断了；

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwnWxQwZTsUTr44QOG4offoodlticV45SDUapV9gIDxtrhx83th0hia20GhPtc6QxycPibopwDMn7GquA/640?wx_fmt=png)

*   期间会下载一些所需的文件，完成后控制台打印信息如下，至此Arthas就安装启动完成了。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwnWxQwZTsUTr44QOG4offoocXDvsI6BWMZK7hG1N5jib5ibd1bdB60LUcy5jl5UEjtEt2RgMjicZV8cA/640?wx_fmt=png)

## 常用命令

> 我们先来介绍一些Arthas的常用命令，会结合实际应用来讲解，带大家了解下Arthas的使用。

### dashboard

使用`dashboard`命令可以显示当前系统的实时数据面板，包括线程信息、JVM内存信息及JVM运行时参数。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwnWxQwZTsUTr44QOG4offooIicNVhmyRYWwByva2RhExpYJicXr3bPSRibiaAZTwOvT4WDT79IzqHicPIQ/640?wx_fmt=png)

### thread

查看当前线程信息，查看线程的堆栈，可以找出当前最占CPU的线程。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwnWxQwZTsUTr44QOG4offooDH3CPZp4K60fpwyJYWhlQMBp8lDyopQyn7NAml4iae2mguSyZPne8CA/640?wx_fmt=png)

常用命令：

```
# 打印当前最忙的3个线程的堆栈信息  thread -n 3  # 查看ID为1都线程的堆栈信息  thread 1  # 找出当前阻塞其他线程的线程  thread -b  # 查看指定状态的线程  thread -state WAITING
```
 

### sysprop

查看当前JVM的系统属性，比如当容器时区与宿主机不一致时，可以使用如下命令查看时区信息。

```
sysprop |grep timezone
```
 

```
user.timezone                  Asia/Shanghai
```
 

### sysenv

查看JVM的环境属性，比如查看下我们当前启用的是什么环境的Spring Boot配置。

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwnWxQwZTsUTr44QOG4offooKb7Rr97RrbzSmqibRpgUa2JzfsZskf3TK1kz6MFTgJkSMNNxjAktMlw/640?wx_fmt=png)

### logger

使用`logger`命令可以查看日志信息，并改变日志级别，这个命令非常有用。

比如我们在生产环境上一般是不会打印`DEBUG`级别的日志的，当我们在线上排查问题时可以临时开启`DEBUG`级别的日志，帮助我们排查问题，下面介绍下如何操作。

*   我们的应用默认使用的是`INFO`级别的日志，使用`logger`命令可以查看；

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwnWxQwZTsUTr44QOG4offooXUAbr8SPnOc4W9mE5ejyDRK9yymIKiamWlE2vYcIgd9fuvF81wakiaRw/640?wx_fmt=png)

*   使用如下命令改变日志级别为`DEBUG`，需要使用`-c`参数指定类加载器的HASH值；

```
logger -c 21b8d17c --name ROOT --level debug
```
 

*   再使用`logger`命令查看，发现`ROOT`级别日志已经更改；

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwnWxQwZTsUTr44QOG4offoosBgHiapOrFOGyLHSSHPOH0zyLzNIYiaBvgtA4HJB3Vicc3bN8MrfTkaiaw/640?wx_fmt=png)

*   使用`docker logs -f mall-tiny-arthas`命令查看容器日志，发现已经打印了DEBUG级别的日志；

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwnWxQwZTsUTr44QOG4offoo0YHtD9DclMt90INRSdVQHAWs82DMpT6fV1yjZ4mEglS0bficdmtTBWQ/640?wx_fmt=png)

*   查看完日志以后记得要把日志级别再调回`INFO`级别。

```
logger -c 21b8d17c --name ROOT --level info
```
 

### sc

查看JVM已加载的类信息，`Search-Class`的简写，搜索出所有已经加载到 JVM 中的类信息。

*   搜索`com.macro.mall`包下所有的类；

```
sc com.macro.mall.*
```
 

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwnWxQwZTsUTr44QOG4offooBo8pERuJ8c8eevSXfapmn16VZXNzbS6VLYCyADYbWu32ybReNP7tIw/640?wx_fmt=png)

*   打印类的详细信息，加入`-d`参数并指定全限定类名；

```
sc -d com.macro.mall.tiny.common.api.CommonResult
```
 

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwnWxQwZTsUTr44QOG4offooSFPAnJtTibI7RPoEPuT8zyQjOkO3yyKzRgyN1tIkvEmF5sTmlW74YMQ/640?wx_fmt=png)

*   打印出类的Field信息，使用`-f`参数。

```
sc -d -f com.macro.mall.tiny.common.api.CommonResult
```
 

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwnWxQwZTsUTr44QOG4offooFXOjdJg7TODqrU5FtVEJf0PtV7kwIib0iaic8xONTAgrYzUAEuXxrwV1A/640?wx_fmt=png)

### sm

查看已加载类的方法信息，`Search-Method`的简写，搜索出所有已经加载的类的方法信息。

*   查看类中的所有方法；

```
sm com.macro.mall.tiny.common.api.CommonResult
```
 

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwnWxQwZTsUTr44QOG4offoovlAibEeEEYD2WD835BmsVoAf8x0xUOlP0QqeeVAeziaq3rbK7TQ5a2IQ/640?wx_fmt=png)

*   查看指定方法信息，使用`-d`参数并指定方法名称；

```
sm -d com.macro.mall.tiny.common.api.CommonResult getCode
```
 

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwnWxQwZTsUTr44QOG4offooowicx8SWibaVqbOwacV05flX7oTqJ2vIPk6WgRloarBy89SFKlcTDlhw/640?wx_fmt=png)

### jad

反编译已加载类的源码，觉得线上代码和预期不一致，可以反编译看看。

*   查看启动类的相关信息，默认会带有`ClassLoader`信息；

```
jad com.macro.mall.tiny.MallTinyApplication
```
 

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwnWxQwZTsUTr44QOG4offooicbEiaoNLj7C23FuiaibMHoyDC2Tt0Dn4jRjN9sQuoWoJxfPsqN5eo1kvQ/640?wx_fmt=png)

*   使用`--source-only`参数可以只打印类信息。

```
jad --source-only com.macro.mall.tiny.MallTinyApplication
```
 

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwnWxQwZTsUTr44QOG4offoolnYGO2CwyicLDUB5AjvqjmrrIcibDoxwNOmWiagaXMwlYrjItcwJpibm1w/640?wx_fmt=png)

### mc

内存编译器，`Memory Compiler`的缩写，编译`.java`文件生成`.class`。

### redefine

加载外部的`.class`文件，覆盖掉 JVM中已经加载的类。

### monitor

实时监控方法执行信息，可以查看方法执行成功此时、失败次数、平均耗时等信息。

```
monitor -c 5 com.macro.mall.tiny.controller.PmsBrandController listBrand
```
 

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwnWxQwZTsUTr44QOG4offoowFU0DcoGteTJeQEicCIuYl32ehAwVUkO20xaeyjPZoqBKAAnibavo5dQ/640?wx_fmt=png)

### watch

方法执行数据观测，可以观察方法执行过程中的参数和返回值。

使用如下命令观察方法执行参数和返回值，`-x`表示结果属性遍历深度。

```
watch com.macro.mall.tiny.service.impl.PmsBrandServiceImpl listBrand "{params,returnObj}" -x 2
```
 

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwnWxQwZTsUTr44QOG4offooH0ZkFFiaQQxA1Gef1VlsPwUoIq0XMHtGMEzSRVEJiaz2ZwRkiasn2K4zQ/640?wx_fmt=png)

## 热更新

> 尽管在线上环境热更代码并不是一个很好的行为，但有的时候我们真的很需要热更代码。下面介绍下如何使用`jad/mc/redefine`来热更新代码。

*   首先我们有一个商品详情的接口，当我们传入`id<=0`时，会抛出`IllegalArgumentException`；

```
/** 

  * 品牌管理Controller 

  * Created by macro on 2019/4/19. 

  */  @Api(tags = "PmsBrandController", description = "商品品牌管理")  @Controller  @RequestMapping("/brand")  public class PmsBrandController {      @Autowired      private PmsBrandService brandService;        private static final Logger LOGGER = LoggerFactory.getLogger(PmsBrandController.class);        @ApiOperation("获取指定id的品牌详情")      @RequestMapping(value = "/{id}", method = RequestMethod.GET)      @ResponseBody      public CommonResult<PmsBrand> brand(@PathVariable("id") Long id) {          if(id<=0){              throw new IllegalArgumentException("id not excepted id:"+id);          }          return CommonResult.success(brandService.getBrand(id));      }  }
```
 

*   调用接口会返回如下信息，调用地址：http://192.168.5.94:8088/brand/0

```
{    "timestamp": "2020-06-12T06:20:20.951+0000",    "status": 500,    "error": "Internal Server Error",    "message": "id not excepted id:0",    "path": "/brand/0"  }
```
 

*   我们想对该问题进行修复，如果传入`id<=0`时，直接返回空数据的`CommonResult`，代码修改内容如下；

```
/** 

  * 品牌管理Controller 

  * Created by macro on 2019/4/19. 

  */  @Api(tags = "PmsBrandController", description = "商品品牌管理")  @Controller  @RequestMapping("/brand")  public class PmsBrandController {      @Autowired      private PmsBrandService brandService;        private static final Logger LOGGER = LoggerFactory.getLogger(PmsBrandController.class);            @ApiOperation("获取指定id的品牌详情")      @RequestMapping(value = "/{id}", method = RequestMethod.GET)      @ResponseBody      public CommonResult<PmsBrand> brand(@PathVariable("id") Long id) {          if(id<=0){  //            throw new IllegalArgumentException("id not excepted id:"+id);              return CommonResult.success(null);          }          return CommonResult.success(brandService.getBrand(id));      }  }
```
 

*   首先我们需要对`PmsBrandController`类代码进行修改，接着上传到服务器，然后使用如下命令将`java`文件拷贝到容器的`/tmp`目录下；

```
docker container cp /tmp/PmsBrandController.java mall-tiny-arthas:/tmp/
```
 

*   之后我们需要查看该类的类加载器的Hash值；

```
sc -d *PmsBrandController | grep classLoaderHash
```
 

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwnWxQwZTsUTr44QOG4offooJw21r7sBKlJPTeCJ4TBKxo9vriafUlTXQaybz2bofb9Z6kXJqRbRTyQ/640?wx_fmt=png)

*   之后使用内存编译器把改`.java`文件编译成`.class`文件，注意需要使用`-c`指定类加载器；

```
mc -c 21b8d17c /tmp/PmsBrandController.java -d /tmp
```
 

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwnWxQwZTsUTr44QOG4offooy84dOz2jhhREibicRlU1hTBvfPWjbb9b7jlK4YibjJLXbxltKhnibbdF9Q/640?wx_fmt=png)

*   最后使用`redefine`命令加载`.class`文件，将原来加载的类覆盖掉；

```
redefine -c 21b8d17c /tmp/com/macro/mall/tiny/controller/PmsBrandController.class
```
 

![](https://mmbiz.qpic.cn/mmbiz_png/CKvMdchsUwnWxQwZTsUTr44QOG4offoozVmP1r8ba1vn15GWzcT8D7RpkhibbqV5N4SjU8ynMVPfw1FIAyMp8zw/640?wx_fmt=png)

*   我们再次调用接口进行测试，发现已经返回了预期的结果，调用地址：http://192.168.3.101:8088/brand/0

```
{    "code": 200,    "message": "操作成功",    "data": null  }
```
 

## 参考资料

官方文档：**https://alibaba.github.io/arthas/**

## 项目源码地址

**https://github.com/macrozheng/mall-learning/tree/master/mall-tiny-arthas**

* * *

Github上`标星60K`的电商实战项目mall，全套 [视频教程（2023最新版）](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247510592&idx=1&sn=ca49cdaf727c5d9cb94ae774fe0d7643&scene=21#wechat_redirect) 已更新完毕！全套教程`约40小时，共105期`，通过这套教程你可以拥有一个`涵盖主流Java技术栈的完整项目经验`，同时提高自己`独立开发一个项目的能力`，下面是项目的整体架构图，感兴趣的小伙伴可以点击链接 [mall视频教程](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247510592&idx=1&sn=ca49cdaf727c5d9cb94ae774fe0d7643&scene=21#wechat_redirect) 加入学习。

![](https://mmbiz.qpic.cn/mmbiz_jpg/CKvMdchsUwnWxQwZTsUTr44QOG4offoohblMMPEDjSDDnlWX9a7GK39zvSZVuhTt6RUkJbLUwEaa9M4Vd6vlibg/640?wx_fmt=jpeg)

整套 [视频教程](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247510592&idx=1&sn=ca49cdaf727c5d9cb94ae774fe0d7643&scene=21#wechat_redirect) 的内容还是非常完善的，涵盖了mall项目最佳学习路线、整体框架搭建、业务与技术实现全方位解析、线上Docker环境部署等内容，具体大纲可以参考下图，你也可以点击链接 [mall视频教程](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247510592&idx=1&sn=ca49cdaf727c5d9cb94ae774fe0d7643&scene=21#wechat_redirect) 了解更多内容。

![](https://mmbiz.qpic.cn/mmbiz_jpg/CKvMdchsUwnWxQwZTsUTr44QOG4offooem9LbH5qd3ia3bKEPmaGcyBiamhHpv7NLh5FDiak4bokBVsCEGsBnHMaw/640?wx_fmt=jpeg)

## 推荐阅读

*   [69K Star！这是我见过最强的开源电商系统 ！！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247512035&idx=1&sn=711bb886c3b51d4c69e3a0aee8219be8&scene=21#wechat_redirect)
*   [Github标星60K！一套完整的项目实战教程来了，主流Java技术一网打尽！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247510592&idx=1&sn=ca49cdaf727c5d9cb94ae774fe0d7643&scene=21#wechat_redirect)
*   [看了我项目中购物车、订单、支付一整套设计，同事也开始悄悄模仿了...](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247513826&idx=1&sn=0f582ade89a5d300a3a2dbd1247a54f1&scene=21#wechat_redirect)
*   [订单系统就该这么设计，稳的一批！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247509371&idx=1&sn=388ee12b3a6557f8c0f54ab7ea1236fb&scene=21#wechat_redirect)
*   [支付系统就该这么设计，稳的一批！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247513093&idx=1&sn=03fb22d469f50f03793030e9a0c30551&scene=21#wechat_redirect)
*   [权限系统就该这么设计，稳的一批！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247508732&idx=1&sn=3d10d005c554c43e7ce601aec4a94fda&scene=21#wechat_redirect)

 

 

![](https://mmbiz.qpic.cn/mmbiz_gif/CKvMdchsUwlkU1ysoMgG69dVYbCQcI6Byneb8ibzZWPfUCr3T8CuBicCSGyFE6SpAtxpxtDCp6VlZ4F1hEL1BNyg/640?wx_fmt=gif)

>参考链接：[https://mp.weixin.qq.com/s/iX8x5Rqln4pX4Qv3PuPy9Q](https://mp.weixin.qq.com/s/iX8x5Rqln4pX4Qv3PuPy9Q)，整理：沉默王二
