---
title: 新来个技术总监，给公司项目引入了全新的业务架构，堪称最佳实践！
shortTitle: 如何从业务架构层面减缓代码腐烂的进度呢？
description: 一个可落地的业务代码结构规范，让你的代码腐烂的尽可能慢一些，让团队的开发效率尽可能快一些。
author: 蛮三刀把刀
category:
  - 微信公众号
---

问大家一个问题，你觉得一份业务代码，尤其是互联网业务代码，都有哪些特点？

我能想到的有这几点：

- 互联网业务**迭代快**，工期紧，导致**代码结构混乱，几乎没有代码注释和文档**。
- 互联网**人员变动频繁**，很容易接手别人的老项目，**新人根本没时间吃透代码结构**，紧迫的工期又只能让屎山越堆越大。
- 多人一起开发，**每个人的编码习惯不同**，工具类代码各用个的，业务命名也经常冲突，影响效率。
- 大部分团队几乎**没有时间做代码重构**，任由代码腐烂。

每当我们新启动一个代码仓库，都是信心满满，结构整洁。但是时间越往后，代码就变得腐败不堪，技术债务越来越庞大。

这种情况有解决方案吗？也是有的：

1.  小组内定期做代码重构，解决技术债务。
2.  组内设计完善的应用架构，让代码的腐烂来得慢一些。**（当然很难做到完全不腐烂）**
3.  设计尽量简单，**让不同层级的开发都能快速看懂并上手开发**，而不是在一堆复杂的没人看懂的代码上堆更多的屎山。

而 COLA，我们今天的主角，就是为了提供**一个可落地的业务代码结构规范**，让你的代码腐烂的尽可能慢一些，让团队的开发效率尽可能快一些。

**希望工作党的球友们能够花一个小时好好消化一下这篇内容，尽可能在架构层面去思考如何应用 COLA 实战，从而提升自己在团队中的影响力，更快地晋升**。

## COLA 是什么

COLA 是由阿里大佬张建飞所提出的一种**业务代码架构的最佳实践**，并且已经在阿里云脚手架代码生成器中作为一个可选项，可见其已经拥有了一定影响力。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-xinlgjzzjggsxmyrlqxdywjgkczjsj-3197a4cf-23b1-482e-97f9-95edebbeca22.jpg)

**COLA 是 Clean Object-Oriented and Layered Architecture 的缩写，代表“整洁面向对象分层架构”。**

在 COLA 4.0，也就是目前最新的版本中，作者将 COLA 拆分为 COLA 架构（Archetype）和 COLA 组件（Components）两个部分：

- COLA 架构：COLA 应用的代码模板。
- COLA 组件：提供一些非常有用的通用组件，这些组件可以帮助我们提升研发效率。

**两者互不干扰，可以独立使用。**

## COLA 整体架构

首先主要谈谈 COLA 架构，COLA 的官方博文中是这么介绍的：

> 在平时我们的业务开发中，大部分的系统都需要：
>
> - 接收 request，响应 response；
> - 做业务逻辑处理，像校验参数，状态流转，业务计算等等；
> - 和外部系统有联动，像数据库，微服务，搜索引擎等；

> 正是有这样的共性存在，才会有很多普适的架构思想出现，比如分层架构、六边形架构、洋葱圈架构、整洁架构（Clean Architecture）、DDD 架构等等。
>
> 这些应用架构思想虽然很好，但我们很多同学还是“不讲 Co 德，明白了很多道理，可还是过不好这一生”。问题就在于缺乏实践和指导。COLA 的意义就在于，他不仅是思想，还提供了可落地的实践。应该是为数不多的应用架构层面的开源软件。

**COLA 提供了一整套代码架构，拿来即用。** 其中包含了很多架构设计思想，包括讨论度很高的领域驱动设计 DDD 等。

注意：每个人对于架构设计都有着自己的理解。所以对于 COLA 的架构，**本篇文章也仅仅只是我自己对于 COLA 的粗浅理解，大家可以批判看待。**

## COLA 分层架构

先来看两张官方介绍图

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-xinlgjzzjggsxmyrlqxdywjgkczjsj-c593a058-36f3-4dd4-ad60-2f6f871c7673.jpg)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-xinlgjzzjggsxmyrlqxdywjgkczjsj-1b8335ad-af07-4530-ba6b-98fba15e9c96.jpg)

其次，还有一个官方的表格，介绍了 COLA 中每个层的命名和含义：

| 层次       | 包名        | 功能                                | 必选 |
| ---------- | ----------- | ----------------------------------- | ---- |
| Adapter 层 | web         | 处理页面请求的 Controller           | 否   |
| Adapter 层 | wireless    | 处理无线端的适配                    | 否   |
| Adapter 层 | wap         | 处理 wap 端的适配                   | 否   |
| App 层     | executor    | 处理 request，包括 command 和 query | 是   |
| App 层     | consumer    | 处理外部 message                    | 否   |
| App 层     | scheduler   | 处理定时任务                        | 否   |
| Domain 层  | model       | 领域模型                            | 否   |
| Domain 层  | ability     | 领域能力，包括 DomainService        | 否   |
| Domain 层  | gateway     | 领域网关，解耦利器                  | 是   |
| Infra 层   | gatewayimpl | 网关实现                            | 是   |
| Infra 层   | mapper      | ibatis 数据库映射                   | 否   |
| Infra 层   | config      | 配置信息                            | 否   |
| Client SDK | api         | 服务对外透出的 API                  | 是   |
| Client SDK | dto         | 服务对外的 DTO                      | 是   |

这两张图和一个表格已经把整个 COLA 架构的绝大部分内容展现给了大家，但是一下子这么多信息量可能很难消化。

既然整个示例架构项目是一个 Maven 父子结构，那我们就从父模块一个个好好过一遍。

首先父模块的 pom.xml 包含了如下子模块：

```
<modules>
  <module>demo-web-client</module>
  <module>demo-web-adapter</module>
  <module>demo-web-app</module>
  <module>demo-web-domain</module>
  <module>demo-web-infrastructure</module>
  <module>start</module>
</modules>
```

### start 层

该模块作为整个应用的启动模块（通常是一个 SpringBoot 应用），只承担启动项目和全局相关配置项的存放职责。代码目录如下：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-xinlgjzzjggsxmyrlqxdywjgkczjsj-1049297d-cf2e-4e78-8a09-5e2c36f875a9.jpg)

将启动独立出来，好处是清晰简洁，也能让新人一眼就看出如何运行项目，以及项目的一些基础依赖。

### adapter 层

接下来我们按照之前架构图从上到下的顺序，一个个看。

首先是 demo-web-adapter 模块，这名字是不是很新鲜？但其实，可以理解为平时我们用的 controller 层（对于 Web 应用来说），换汤不换药。

在 COLA 官方博客中，也能找到如下的描述：

> Controller 这个名字主要是来自于 MVC，因为是 MVC，所以自带了 Web 应用的烙印。然而，随着 mobile 的兴起，现在很少有应用仅仅只支持 Web 端，通常的标配是 Web，Mobile，WAP 三端都要支持。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-xinlgjzzjggsxmyrlqxdywjgkczjsj-9dc734c3-79d7-4df3-9f93-eb5359314bea.jpg)

### cilent 层

有了我们说的“controller”层，接下来有的小伙伴肯定就会想，是不是 service 层啦。

**是，也不是。**

传统的 Web 应用中，完全可以只有一个 service 层给 controller 层调用，但是作为一个业务应用，除非你真的只是个前端页面的无情吐数据机器，否则很大可能性你的应用会有很多其他上下游调用方，并且你需要提供接口给他们。

这时候你给他们的不应该是一个 Web 接口，应该是 RPC 调用的服务层接口，至于原因不是本文的重点，具体就不展开了。

所以在 COLA 中，你的 adapter 层，调用了 client 层，client 层中就是你服务接口的定义。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-xinlgjzzjggsxmyrlqxdywjgkczjsj-dbe3f5e0-3e46-4481-81f9-1b436e03bf3b.jpg)

从上图中可以看到，client 包里有：

- api 文件夹：存放服务接口定义
- dto 文件夹：存放传输实体

注意，这里只是服务接口定义，而不是服务层的具体实现，所以在 adapter 层中，调用的其实是 client 层的接口：

```
@RestController
public class CustomerController {

    @Autowired
    private CustomerServiceI customerService;

    @GetMapping(value = "/customer")
    public MultiResponse<CustomerDTO> listCustomerByName(@RequestParam(required = false) String name){
        CustomerListByNameQry customerListByNameQry = new CustomerListByNameQry();
        customerListByNameQry.setName(name);
        return customerService.listByName(customerListByNameQry);
    }

}
```

而最终接口的具体实现逻辑放到了 app 层。

```
@Service
@CatchAndLog
public class CustomerServiceImpl implements CustomerServiceI {

    @Resource
    private CustomerListByNameQryExe customerListByNameQryExe;

    @Override
    public MultiResponse<CustomerDTO> listByName(CustomerListByNameQry customerListByNameQry) {
        return customerListByNameQryExe.execute(customerListByNameQry);
    }
}
```

### app 层

接着上面说的，我们的 app 模块作为服务的实现，存放了各个业务的实现类，**并且严格按照业务分包**，这里划重点，**是先按照业务分包，再按照功能分包的**，为何要这么做，文章后面还会多说两句，先看图：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-xinlgjzzjggsxmyrlqxdywjgkczjsj-659865e3-5248-4920-bcc2-ae7cdfcf8a5e.jpg)

customer 和 order 分别对应了消费着和订单两个业务子领域。里面是 COLA 定义 app 层下面三种功能：

| App 层     | executor      | 处理 request，包括 command 和 query | 是     |
| ---------- | ------------- | ----------------------------------- | ------ |
| **App 层** | **consumer**  | **处理外部 message**                | **否** |
| **App 层** | **scheduler** | **处理定时任务**                    | **否** |

可以看到，消息队列的消费者和定时任务，这类平时我们业务开发经常会遇到的场景，也放在 app 层。

### domain 层

接下来便是 domain，也就是领域层，先看一下领域层整体结构：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-xinlgjzzjggsxmyrlqxdywjgkczjsj-130bad2c-36ed-47d0-9997-7e4b923dc27b.jpg)

可以看到，首先是按照不同的领域（customer 和 order）分包，里面则是三种主要的文件类型：

1.  领域实体：实体模型可以是充血模型（请自行了解），例如官方示例里的 Customer.java 如下：

```
@Data
@Entity
public class Customer{

    private String customerId;
    private String memberId;
    private String globalId;
    private long registeredCapital;
    private String companyName;
    private SourceType sourceType;
    private CompanyType companyType;

    public Customer() {
    }

    public boolean isBigCompany() {
        return registeredCapital > 10000000; //注册资金大于1000万的是大企业
    }

    public boolean isSME() {
        return registeredCapital > 10000 && registeredCapital < 1000000; //注册资金大于10万小于100万的为中小企业
    }

    public void checkConfilict(){
        //Per different biz, the check policy could be different, if so, use ExtensionPoint
        if("ConflictCompanyName".equals(this.companyName)){
            throw new BizException(this.companyName+" has already existed, you can not add it");
        }

    }
}
```

1.  领域能力：domainservice 文件夹下，是领域对外暴露的服务能力，如上图中的 CreditChecker
2.  领域网关：gateway 文件夹下的接口定义，这里的接口你可以粗略的理解成一种 SPI，也就是交给 infrastructure 层去实现的接口。

例如 CustomerGateway 里定义了接口 getByById，要求 infrastructure 的实现类必须定义如何通过消费者 Id 获取消费者实体信息，而 infrastructure 层可以实现任何数据源逻辑，比如，从 MySQL 获取，从 Redis 获取，还是从外部 API 获取等等。

```
public interface CustomerGateway {
    public Customer getByById(String customerId);
}
```

在示例代码的 CustomerGatewayImpl（位于 infrastructure 层）中，CustomerDO（数据库实体）经过 MyBatis 的查询，转换为了 Customer 领域实体，进行返回。完成了依赖倒置。

```
@Component
public class CustomerGatewayImpl implements CustomerGateway {
    @Autowired
    private CustomerMapper customerMapper;

    public Customer getByById(String customerId){
      CustomerDO customerDO = customerMapper.getById(customerId);
      //Convert to Customer
      return null;
    }
}
```

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-xinlgjzzjggsxmyrlqxdywjgkczjsj-dc098f05-fd49-47c7-8281-eaee07f78626.jpg)

### infrastructure 层

最后是我们的 infrastructure 也就是基础设施层，这层有我们刚才提到的 gatewayimpl 网关实现，也有 MyBatis 的 mapper 等数据源的映射和 config 配置文件。

| Infra 层     | gatewayimpl | 网关实现              | 是     |
| ------------ | ----------- | --------------------- | ------ |
| **Infra 层** | **mapper**  | **ibatis 数据库映射** | **否** |
| **Infra 层** | **config**  | **配置信息**          | **否** |

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-xinlgjzzjggsxmyrlqxdywjgkczjsj-77259bda-b1c4-4ac5-914c-cc020452750d.jpg)

所有层讲完了，COLA4.0 很简单明了，**最后，在引用一段官方介绍博客原文来总结 COLA 的层级：**

> 1）适配层（Adapter Layer）：负责对前端展示（web，wireless，wap）的路由和适配，对于传统 B/S 系统而言，adapter 就相当于 MVC 中的 controller；
>
> 2）应用层（Application Layer）：主要负责获取输入，组装上下文，参数校验，调用领域层做业务处理，如果需要的话，发送消息通知等。层次是开放的，应用层也可以绕过领域层，直接访问基础实施层；
>
> 3）领域层（Domain Layer）：主要是封装了核心业务逻辑，并通过领域服务（Domain Service）和领域对象（Domain Entity）的方法对 App 层提供业务实体和业务逻辑计算。领域是应用的核心，不依赖任何其他层次；
>
> 4）基础实施层（Infrastructure Layer）：主要负责技术细节问题的处理，比如数据库的 CRUD、搜索引擎、文件系统、分布式服务的 RPC 等。此外，领域防腐的重任也落在这里，外部依赖需要通过 gateway 的转义处理，才能被上面的 App 层和 Domain 层使用。

## COLA 架构的特色

说完了分层架构，我们再来回顾下上面提到的 COLA 架构的几个特色的设计

### 领域与功能的分包策略

也就是下面这张图的意思，先按照领域分包，再按照功能分包，这样做的其中一点好处是能将腐烂控制在该业务域内。

比如消费者 customer 和订单 order 两个领域是两个后端开发并行开发，两个人对于 dto，util 这些文件夹的命名习惯都不同，那么只会腐烂在各自的业务包下面，而不会将 dto,util,config 等文件夹放在一起，极容易引发文件冲突。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-xinlgjzzjggsxmyrlqxdywjgkczjsj-e594e754-b536-4aea-90db-013549c47fc9.jpg)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-xinlgjzzjggsxmyrlqxdywjgkczjsj-4a8d2c2f-cb82-4f07-8e3b-9a8ca717b378.jpg)

> 前面的包定义，都是功能维度的定义。为了兼顾领域维度的内聚性，我们有必要对包结构进行一下微调，即顶层包结构应该是按照领域划分，让领域内聚。

### 业务域和外部依赖解耦

前面提到的 domain 和 infrastructure 层的依赖倒置，是一个非常有用的设计，进一步解耦了取数逻辑的实现。

例如下图中，你的领域实体是商品 item，通过 gateway 接口，你的商品的数据源可以是数据库，也可以是外部的服务 API。

如果是外部的商品服务，你经过 API 调用后，商品域吐出的是一个大而全的 DTO（可能包含几十个字段），而在下单这个阶段，订单所需要的可能只是其中几个字段而已。你拿到了外部领域 DTO，转为自己领域的 Item，只留下标题价格库存等必要的数据字段。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-xinlgjzzjggsxmyrlqxdywjgkczjsj-f0232dda-b392-4c68-8eb4-7c323adddee0.jpg)

## COLA 并不完美

诚然，COLA 已经做的足够清晰简洁了，但是它仍然有不完美的地方，比如每个接口的出入参都会根据业务名做定义，导致了很多结构极为相似的 DTO，DTO 的爆炸增长是个问题。参考：ISSUE-271

但是总的来说，COLA 只是给你提供了一种架构设计的思想，并不深入到强制你使用某种规范的层面，所以对于 COLA 中你觉得复杂，或者不理解的地方，很多时候需要你自己来做权衡，作取舍。**取其精华，去其糟粕**的运用到你的项目中。

## 总结

COLA 架构并不复杂，COLA 已经从 1.0 版本经过逐次精简，发展到了如今的形态。在阿里云代码脚手架生成器中作为一个可选项，足见其已经趋于成熟。

> 参考链接：[https://mp.weixin.qq.com/s?\_\_biz=MzU1Nzg4NjgyMw==&mid=2247502256&idx=1&sn=110ea6c0bc379cee7a68f11d9678eb60&chksm=fc2c75b8cb5bfcaeaa7d52b3132f57b6104ee8e69d5ac321aee07ec08d81fda42dc1fc1df086#rd](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247502256&idx=1&sn=110ea6c0bc379cee7a68f11d9678eb60&chksm=fc2c75b8cb5bfcaeaa7d52b3132f57b6104ee8e69d5ac321aee07ec08d81fda42dc1fc1df086#rd)
