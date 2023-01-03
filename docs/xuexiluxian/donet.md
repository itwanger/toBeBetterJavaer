---
star: true
title: 2023最新超详细.NET学习路线（建议收藏🔥）
shortTitle: .NET学习路线
category:
  - 学习路线
tag:
  - 学习路线
description: 写这篇文章来给大家讲C语言的学习，当然是希望大家真正的学会、学懂.NET，并能够真正感觉到它的用处。
head:
  - - meta
    - name: keywords
      content: .NET,.NET学习路线,.NET入门教程
---

知识星球上有球友问 .net 那二哥就借这个机会来谈谈 .net 的行情、学习路线、学习资料（包括视频、书籍）之类，希望给小伙伴们提供一些参考。

## 关于 .net

.net 主要指的是 .NET Framework，由微软开发，一个致力于敏捷软件开发、快速应用开发的软件框架，主要服务于桌面开发。

我在《Java 面试指南》专栏的《学习路线篇》里写过一篇《Java 桌面开发能找到工作吗？》也谈过桌面开发目前的现状。

像早期的 QQ，还有一些前后台分离的应用就主要是用 .net 框架来做的，包括 winform、WPF。

我在 2014 年的时候，开发的《大宗期货交易平台》中的客户端，就是用 .net 开发的。

Java 平台和 .net 平台是主要的竞争对手。一个属于甲骨文，一个属于微软，微软在印度裔 CEO N纳德拉的带领下，感觉又恢复了往昔的帝国景象，所以我觉得 .net 平台虽然受到了 Java、Electron、QT 等等挑战，但在桌面应用领域，微软肯定是能应对这个挑战的。

尤其是在 .net 开源、.net core 问世之后。

图 1 是 .NET 平台截止 2020 年 12 月开发者数量大致的变化情况：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/donet-23438f52-d682-47c8-ae9a-566f4ec4b8fa.png)

.NET 是目前全球市场上唯一一个涵盖 Web、桌面客户端、手机应用、微服务、云原生、机器学习、游戏、物联网等跨平台的全能开发解决方案。

所以就目前来看，.net 还是值得投入感情的，像王者荣耀就是际遇 C# 的 unity 开发的。总之一句话，有微软这么牛逼的爹，.net 肯定是有用武之地的。

如果对自己能力有自信，或者说你愿意为其倾力学习的话，选择 .net 准没错，前踢 Java，左打 Python，右捶 cpp，绝对牛逼的不行🚫。



## 如何学习.net

### 学习路线

第一步，当然是学语法，把异步、泛型、Lambda 学扎实，对你没看错，Java 中也有这些东西。

第二步，学习 Docker，会拉去镜像，会部署数据库就够了，不用学太多，比如说你会用 Docker 拉取 SQLserver 数据库。

第三步，简单学一下 ADO.net （（ActiveX Data Objects）），能写 SQL helper 就够了，工作后可能用不到，但面试可能会考。

第四步，学习 EFCore（Entity Framework Core，微软提供的跨平台ORM框架），要学精。

第五步，学 MVC，之后就可以开发一些小项目了。

其中的一些重点：viewmodel、JSON 序列化、仓储模式、依赖注入、过滤器 等等。

可以顺带用一下 jQuery、bootstrap，这些属于前端的 JS 组件库和 CSS 库。

第六步，学 WebAPI，学会 automapper 的配置和使用。

第七步，学 JWT、单点登录，学了这些，就可以实现前后端分离了。到此为止，你就可以胜任市面上的绝大多数开发岗位了。

第八步，学习 Docker 的分布式部署。

第九步，学习 IdentityServer4，可实现接口统一验证。

第十步，学习 Consul，服务发现治理（类似于 Java 中的 nocas），Ocelot网关、Polly(熔断降级)，以及微服务架构思想。

### 学习资料

先推荐视频。

首先要有 C# 的语言基础，那么 B 站上有两套视频教程，点赞数还不少。

第一套是刘铁猛老师（拥有逾十年微软平台软件开发、测试经验）的《C#语言入门详解》全集。从评价上来看，刘老师这门课深受欢迎，旁征博引、谈笑风生、举例逻辑清晰，上课过程中有一种醍醐灌顶的感觉。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/donet-a36d4fec-a4dd-4744-9380-12b5e316695f.png)


>视频地址：https://www.bilibili.com/video/BV13b411b7Ht

之后是 .NET，我关注的一个 up 杨中科 分享过一个 .net 的教程。一共 195 集，杨科长还出过一本书《.net core 技术内幕与项目实战》，所以我觉得还是挺牛逼的，很接地气的一位大佬。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/donet-00c25b59-56d5-40b7-8b20-892f581ed783.png)


>视频地址：https://www.bilibili.com/video/BV1pK41137He

再推荐书籍。

如果想快速入门，推荐《[C#图解教程](https://book.douban.com/subject/24748698/)》。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/donet-32590c26-7f5e-4737-aae4-aa40e4b86ab1.png)


之后可以看一下《[C#高级编程](https://book.douban.com/subject/1919816/)》。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/donet-27e7c98a-e159-4aff-beea-63735cdae45f.png)


最后是教程，那自然直接看微软官方的就行了。

先看 C# 的。

>[https://learn.microsoft.com/zh-cn/dotnet/csharp/](https://learn.microsoft.com/zh-cn/dotnet/csharp/)

包含入门、基础知识、概念、操作、接口、委托、数组、字符串、泛型、文件系统等等。


在看 .net 的。


>[https://learn.microsoft.com/zh-cn/dotnet/standard/get-started](https://learn.microsoft.com/zh-cn/dotnet/standard/get-started)

包含 入门、概述、工具和诊断、执行模型、部署模型、devops、编码组件、运行时库、数据访问、并行处理、测试、安全等等。

最后，如果要面试的话，可以看一下这份 DotNetGuide 资料，1.6k star。

>[https://github.com/YSGStudyHards/DotNetGuide](https://github.com/YSGStudyHards/DotNetGuide)


最后，希望能帮助到你。

---------

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
