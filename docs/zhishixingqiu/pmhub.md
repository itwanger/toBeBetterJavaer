---
title: 二哥的原创实战项目PmHub，一套基于 SpringCloud 的智能项目管理系统
shortTitle: 星球实战项目PmHub
category:
  - 知识星球
tag:
  - 实战项目
description: PmHub 拆分了用户、流程、项目管理、认证等 4 个微服务，整合了 Redis 缓存、RocketMQ 消息队列、Docker 容器、Jenkins 自动化部署、Spring Security 安全框架、Nacos 服务注册和发现、Spring Boot Actuator 服务监控、Skywalking 链路追踪、Sentinel 熔断降级、Seata 分布式事务、Vue 前端框架等互联网开发中需要用到的绝大多数主流技术栈。
head:
  - - meta
    - name: keywords
      content: PmHub,Spring  Cloud,微服务,AI,知识星球,沉默王二,二哥的Java进阶之路,二哥的编程星球,Java进阶之路,编程,Java,IT,计算机专业,付费专栏,实战项目,分布式
---

大家好，二哥呀。很高兴给大家宣布一个好消息，我们的新项目——**PmHub** 正式上线啦！

昨天预告的时候，有读者说，哎呀，这不也是一个 P 站嘛（🤣），还真不是啊，我们的 PM 是 projet manager 的意思，然后代码是完全开源的，放在 GitHub 上，也就取了 PmHub 这个名字。

好，下面由我隆重的给大家介绍一下我们的项目。

PmHub 是由前蚂蚁金服技术专家苍何主导的，一套基于 SpringCloud Alibaba & LLM 的智能项目管理系统，该项目旨在帮助小伙伴们快速掌握微服务/分布式项目的架构设计和开发流程。如果你想在校招或者社招中拿到一个满意的 offer，PmHub 将是一个非常 nice 的选择😄。

> - **欢迎蹂躏我们的项目**：[https://pmhub.laigeoffer.cn/](https://pmhub.laigeoffer.cn/)，记得轻点哦。
> - **欢迎 star 我们的项目**：[https://github.com/laigeoffer/pmhub](https://github.com/laigeoffer/pmhub)，记得狠一点哦。
> - **欢迎品鉴我们的教程**：[https://laigeoffer.cn/pmhub/about/](https://laigeoffer.cn/pmhub/about/)，记得认真点哦。
> - **欢迎加入我们的星球**：[https://laigeoffer.cn/zsxq/](https://laigeoffer.cn/zsxq/)，记得早一点哦。

如果你是正在准备秋招的 25 届应届生，PmHub 写到简历上绝对可以让你脱颖而出，本来拿白菜，结果硬是拿到 SSP；本来进不了大厂修不了福报，结果硬是 offer 拿到手软；本来去不了国企银行的，结果硬是微微一笑迷晕面试官。

如果你是正在准备社招的工作党，PmHub 写到简历绝对能让你的身价提高一大截，原本是扭扭捏捏的 CRUD Boy，结果成了微服务/分布式的技术专家。

![PmHub首页概览](https://cdn.tobebetterjavaer.com/stutymore/1719412227941-391d1ca0-e312-4e81-a958-2eff29dbecd7.png)

并且，我们会手把手拎着大家把单体版本一步步改造成微服务版本，并且的并且，我们会毫不保留地将单体应用微服务化的踩坑经验分享出来，让你彻底明白**架构的演进史**，掌握单体改造成微服务的“秋名山车之神技”。

好，接下来，就由我来吹一吹 PmHub 项目的亮点，哦不，实话实说而已😄。

- **热门技术**：采用时下企业最热门的技术框架，如 SpringCloud、Gateway、Nacos、Sentinel 等，主打一个硬核，与真实的企业项目接轨。
- **单体与微服务**：提供单体和微服务两个版本，完美照顾零基础和需要进阶的同学，带大家体验从单体到微服务架构的改造全过程，并深入理解两种架构的优缺点。
- **硬核面试题**：我们将结合付费球友的实际面试体验，为大家提供可以真正吊打面试官的真是面试场景和题目，并提供 1v1 的简历修改服务，主打一个投了就有、面了就拿 offer 的快乐体感。
- **代码质量**：由蚂蚁金服工作过的技术专家苍何亲自下场，严格遵循代码规范和最佳实践，帮大家养成优雅的代码编写习惯。
- **持续集成**：提供持续集成和持续部署的完整配置，带你从 0-1 用 Docker 上线 生产环境级别的真实项目。
- **产品设计**：[提供完整的产品设计文档](https://lanhuapp.com/link/#/invite?sid=qxZji4oa)，包括产品需求、产品架构、产品原型等，这是别的项目不曾给你的，但工作后又不可或缺的能力。
- **企业工作流**：提供企业级的工作流系统，代码完全开源，你可以在此基础上进行二开，为公司节省巨额的研发成本，从而升职加薪。

为了让大家“无痛”掌握 PmHub，我们耗费了巨大心血，从项目立项，到代码编写、测试、部署，再到教程撰写，前后足足经历了 5 个月的时间，并且我们还计划再用 3 个月的时间，为大家再更新 60 篇预计 25 万字的硬核教程。

![PmHub 教程：seata 分布式事务](https://cdn.tobebetterjavaer.com/stutymore/1719413041169-f278d2d3-d3a1-43c6-b789-e851ca3c7fe7.png)

就比如说这篇《Seata 分布式事务保证任务审批状态一致性》的内容，足足 6825 字，详细讲解了 Seata 分布式事务的原理、实现、以及如何保证任务审批状态一致性，让你从理论到实践，通通掌握明白。

![Seata 分布式事务保证任务审批状态一致性](https://cdn.tobebetterjavaer.com/stutymore/03.如何学习PmHub-20240702145210.png)

更关键的是，我们还提供了如何将 PmHub 写入到简历中的全套模板。

![如何把 PmHub 写到简历上](https://cdn.tobebetterjavaer.com/stutymore/readme-20240709151909.png)

后期会根据球友们的实际反馈继续调整和优化，保证大家看到的是最新、最全、最实用的内容。

为了方便大家循序渐进式地学习，我们贴心地准备了两个版本：

- SpringBoot 单体架构版：适合初学者，可直接运行 pmhub-boot 模块下的 pmhub-admin 目录下的 PmhubApplication 类即可。
- Spring Cloud 微服务架构版：适合有一定基础，想进阶微服务/分布式的小伙伴，可以分别启动网关、系统、流程、项目管理、认证等多个服务。

大家可以根据自己的实际情况选择对应的版本进行学习，我们将会倾其所有，在第一时间帮助大家解决所有学习过程遇到的问题，让大家的学习曲线变得非常丝滑。

![laigeoffer-pmhub-业务大图](https://cdn.tobebetterjavaer.com/stutymore/01.什么是PmHub-20240708113253.png)

下面这张系统架构图可以帮助大家快速了解 PmHub 的组织架构，从前端到网关、从系统应用到基础服务、从存储技术到运维部署，可以说一目了然。

![pmhub-系统架构图](https://cdn.tobebetterjavaer.com/stutymore/01.什么是PmHub-20240708113736.png)

下面是 PmHub 目前用到的一些主流技术栈（SpringCloud、Spring Boot、SpringCloud Alibaba、MyBatis-Plus、Redis、RocketMQ、Sentinel、Gateway、Docker、WebSocket、JWT、SpringSecurity 等等），可以说非常强大。

![主流技术栈](https://cdn.tobebetterjavaer.com/stutymore/1719413567243-978402fb-e4c3-471f-8ffa-77b6daf04cca.png)



## 01、PmHub 长什么样子？

PmHub 作为一套完整的企业级项目管理系统，功能比较多，这里只列出部分常用的页面，更多页面请直接访问 [PmHub 在线访问地址](https://pmhub.laigeoffer.cn/)。

1）首页数据统计

![PmHub首页首页数据统计](https://cdn.tobebetterjavaer.com/stutymore/1719456176650-8d8860ba-5faa-49b9-bada-793a45b26972.png)

2）项目管理页

![PmHub项目管理页](https://cdn.tobebetterjavaer.com/stutymore/1719456258643-f308e3a2-1e5d-4e28-9cdf-f2ae028e3a0a.png)

3）项目详情页

![PmHub项目详情页](https://cdn.tobebetterjavaer.com/stutymore/1719456312064-a86f8578-5744-42be-9374-2a13a07730b4.png)

4）任务管理及详情

![PmHub任务管理](https://cdn.tobebetterjavaer.com/stutymore/1719456340142-0caf091e-a9f1-4a93-ada3-2ad3e891785c.png)

![PmHub任务详情](https://cdn.tobebetterjavaer.com/stutymore/1719456510814-ffedc201-2380-4c73-955a-68f3ca40d12d.png)

5）表单设计页面

![PmHub表单设计](https://cdn.tobebetterjavaer.com/stutymore/1719456780250-d60beb66-7cd3-4dc5-95c1-893d364ab56a.png)

6）流程设计页面

![PmHub流程设计页面](https://cdn.tobebetterjavaer.com/stutymore/1719458145592-0d855810-b4ca-44c8-a8cc-04b1ac4baa2d.png)

## 02、PmHub 能让你学到什么？

对于 PmHub 这个项目，我们是有野心的：

①、BPM（Business Process Management，业务流程管理）历来都是非常复杂的，因为涉及到多人协同、审批流转、任务调度等等。

规模像点样子的企业往往都需要这样一套系统，直接开发吧，费时费力；付费购买吧，价格又居高不下。

那有了 PmHub 后，这个问题就迎刃而解了，我们的代码完全开源，企业完全可以在此基础上进行二开，既省时又省力。

②、找工作的时候，很多小伙伴面临着“无项目经历可写”的尴尬局面，写外卖、商城和秒杀吧，烂大街；写 GitHub 和码云上开源的项目吧，又没有系统的教程，不知道怎么下手。总不能直接下载到本地 run 一下 main 方法就算学习了吧？

有了 PmHub，这个问题也迎刃而解了，我们不仅在业务上更加贴近企业需求，还提供了详细的教程，从项目搭建到部署，从单体到微服务，从前端到后端，从数据库到缓存，从消息队列到分布式事务，从权限设计到代码规范，从代码质量到持续集成，从产品设计到企业工作流，从面试题到简历模板，一应俱全。

③、网上提供微服务项目的教程不多，**能提供从单体到微服务进化的项目更是凤毛麟角**，PmHub 在这一方面可以说做到了极致。来看看我们的一部分教程目录吧！

![pmhub 教程目录](https://cdn.tobebetterjavaer.com/stutymore/01.什么是PmHub-20240625154220.png)

总之一句话：**学微服务，就来 PmHub**😁。

## 03、如何将 PmHub 写进简历？

由于 PmHub 是一个真实的企业级项目，所以里面有足够多的业务和技术栈可以写到简历上，我简单画了一张思维导图供大家参考：

![PmHub 的业务思维导图](https://cdn.tobebetterjavaer.com/stutymore/03.如何学习PmHub-20240702161558.png)

并且 PmHub 刚刚上线，足够的新，所以能和你撞衫的就很少，我敢赌一万包辣条，写到简历上绝对能令面试官和 HR 耳目一新！

![如何把 PmHub 写到简历上](https://cdn.tobebetterjavaer.com/stutymore/02.为什么选择PmHub-20240702042544.png)

并且针对项目经历中的每一个条目，我们都会专门编写一份与之呼应的详细教程，帮助大家在最短的时间内掌握业务和对应的技术栈。

每篇教程约有 **5000-10000** 字，不是自吹，这是我见过最硬核的教程了。因为我自己也购买过很多付费教程，极客时间、掘金小册我都买了不下 40 个专栏，我们的硬核程度绝对可以和它们打个平手，甚至有些方面更胜一筹。

![掘金小册](https://cdn.tobebetterjavaer.com/stutymore/03.如何学习PmHub-20240702162147.png)

每一篇内容都会覆盖技术理论、项目实战，以及面试题，可以说是全方位无死角打通，超级体贴😁。我随便举 2 个例子：

![pmhub-分布式事务](https://cdn.tobebetterjavaer.com/stutymore/1719468609447-e895991a-530d-4dfc-88ae-4711f4b10db7.png)

![pmhub-并发编程](https://cdn.tobebetterjavaer.com/stutymore/1719468847272-f3172784-cca4-4ecf-a6f6-5263866e92fd.png)

![pmhub-面试题](https://cdn.tobebetterjavaer.com/stutymore/1719468961957-e14dd144-ce7f-4bf2-9a87-3fcab47094cf.png)

付出这么多心血，我们的目的只有一个，那就是帮助大家拿下那该死的 offer，狠狠地赚一笔！👊

如果非要再加一个目的，那就是口碑传播，相信大家在遇到好东西时，都会不自觉地分享给身边的朋友。我相信 PmHub 就是这样一个好项目，那我们付出的心血也会获得应有的回报，双赢，绝对的双赢。

星球里的很多球友就会这样做，每年续费不说，还会主动向身边的朋友推荐。

![瞧瞧二哥编程星球的这口碑](https://cdn.tobebetterjavaer.com/stutymore/03.如何学习PmHub-20240702163200.png)

看到这就想加入二哥编程星球的话，请扫下面的优惠券（或者长按自动识别）加入我们吧，[星球](https://laigeoffer.cn/zsxq/)目前定价 149 元/年，优惠完只需要 119 元，每天不到 0.33 元，绝对的超值。

![微信扫码或者长按识别](https://cdn.tobebetterjavaer.com/stutymore/readme-二哥的星球优惠券.png)

## 04、PmHub 的成长过程

PmHub 并不是我们一时兴起发起的，而是我和苍何在做完充分准备和调研后做出的决定。这里介绍一下 PmHub 的两位负责人吧：

- 沉默王二，原创公众号“沉默王二”累计 20 万+ 读者，GitHub 星标 12000+ 开源知识库《二哥的 Java 进阶之路》作者，内容帮助很多很多小伙伴成功拿到满意的 offer。
- 苍何：原创公众号“苍何”的作者，前大厂高级开发，如今是公司技术 leader，曾在支付宝、科大讯飞等大厂工作过，在微服务分布式方面有着丰富的经验。

PmHub 项目前期的需求调研、产品原型设计，开发中的项目管理、缺陷管理，上线后的教程撰写，我们都是一丝不苟，力求做到最好。

①、产品原型图及修订记录

![PmHub产品原型图框架](https://cdn.tobebetterjavaer.com/stutymore/1719469883930-f9ffa37c-fba1-4bdf-811d-a4fa9f7acdbb.png)

![PmHub产品原型修订记录](https://cdn.tobebetterjavaer.com/stutymore/1719469912048-a0b8a738-6bab-4c95-adaf-a5919cc4e30f.png)

②、库表设计

![PmHub微服务分库分表](https://cdn.tobebetterjavaer.com/stutymore/1719470124159-10e7e327-49d1-485a-bb42-8a074b246600.png)

```sql
-- ----------------------------
-- Table structure for 项目表
-- ----------------------------
CREATE TABLE `pmhub_project` (
  `id` varchar(64) NOT NULL COMMENT '主键id',
  `project_code` varchar(32) NOT NULL COMMENT '项目编码',
  `project_name` varchar(200) NOT NULL COMMENT '项目名称',
  `description` varchar(500) DEFAULT NULL COMMENT '描述',
  `close_begin_time` datetime DEFAULT NULL COMMENT '项目开始时间',
  `cover` varchar(255) DEFAULT NULL COMMENT '封面',
  `stage_code` int(11) NOT NULL DEFAULT '0' COMMENT '项目阶段 默认是0',
  `type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '项目类型 是否私有 0-公开 1-私有',
  `prefix` varchar(20) DEFAULT NULL COMMENT '项目编号前缀',
  `deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否删除 0-否 1-删除',
  `deleted_time` datetime DEFAULT NULL COMMENT '删除时间',
  `archived` tinyint(1) DEFAULT NULL COMMENT '是否归档 0-否 1-归档',
  `archived_time` datetime DEFAULT NULL COMMENT '归档时间',
  `published` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否发布 0-否 1-发布',
  `project_process` decimal(5,2) NOT NULL DEFAULT '0.00' COMMENT '项目进度',
  `created_by` varchar(100) DEFAULT NULL COMMENT '创建人',
  `created_time` datetime DEFAULT NULL COMMENT '创建时间',
  `user_id` bigint(20) DEFAULT NULL COMMENT '项目负责人',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '项目状态 默认0-未开始',
  `auto_update_process` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否自动更新进度 0-否 1-是',
  `msg_notify` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否开启消息提醒',
  `notify_day` int(11) NOT NULL DEFAULT '2' COMMENT '提醒的天数',
  `open_prefix` tinyint(1) DEFAULT '0' COMMENT '是否开启项目前缀',
  `project_stage_id` varchar(64) DEFAULT NULL COMMENT '阶段id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='项目表';
```

③、接口文档

![PmHub接口文档](https://cdn.tobebetterjavaer.com/stutymore/1719470376440-ac2e6b2d-758d-4987-b9fa-e858822b43ef.png)


④、进度排期

![PmHub进度排期](https://cdn.tobebetterjavaer.com/stutymore/1719470624825-02168330-b4ba-47a7-9a47-d53b08fcdd26.png)

⑤、bug/缺陷管理

![PmHub缺陷管理](https://cdn.tobebetterjavaer.com/stutymore/1719470727805-56dc04de-4d76-421c-9cb7-2ff82919f53c.png)

⑥、更新记录&计划

![PmHub更新记录&计划](https://cdn.tobebetterjavaer.com/stutymore/1719470771673-2b38e78c-0425-4cd1-97b2-d73e106d6958.jpeg)

⑦、项目周会

![PmHub项目周会](https://cdn.tobebetterjavaer.com/stutymore/1719470969467-71f187a9-75d6-44b3-ad0a-b135cb9c53c9.png)

⑧、源码提交记录

![PmHub源码提交记录](https://cdn.tobebetterjavaer.com/stutymore/1719471053795-7485136f-11bd-4be5-992f-611fcb78859f.png)

## 05、PmHub 的教程规划

项目上线后最重要的两件事，一个是持续迭代，修复线上问题；另外一个就是完成项目教程的编写，要知道，没有教程的开源项目并不适合拿来学习，因为上手的难度太大。

针对第一件事情，我们不仅会时刻关注项目仓库的 issue，还单独维护了一份《PmHub常见问题 Q&A
》文档，同时我们也会在技术交流群里第一时间处理大家提出来的问题。

针对第二件事情，我们精心策划了 60+ 篇内容，预计更新 30 万+字。

先是面试系列，目前列了 10 个，都是面试中的高频题目，比如说：

- 全局过滤器统计接口调用时间
- 整合 TTL 缓存用户数据
- 如何用 Docker 容器化部署项目
- 集成 Redis 分布式锁保障流程状态更新
- 使用 Skywalking 监控项目性能
- 使用 Redis+Lua 基于计数器实现限流
- 自定义注解+AOP 实现服务接口鉴权和内部认证
- 集成 OpenFeign+Sentinel实现服务降级和网关流量控制
- 通过分布式事务 Seata 保证任务审批状态一致性
- 使用 RocketMQ 实现审批消息推送
- 如何保证缓存和数据库一致性

后期还会根据球友们实际的面试情况不断增加题目，以此来保证大家可以疯狂拷打面试官，哦不，和面试官愉快地交流😄。

![PmHub面试系列](https://cdn.tobebetterjavaer.com/stutymore/1719471351638-10f40747-7dd7-4742-9876-0ddab95a31be.png)

每篇内容都超级硬核，图文并茂的形式也能够最大程度帮助大家消化吸收掉 PmHub 的精髓。然后是产品设计篇，涉及到如何培养产品思维、如何进行需求分析，以及如何进行产品原型设计等，是别的项目不曾给你的，但工作后又不可或缺的能力。

![PmHub产品设计篇](https://cdn.tobebetterjavaer.com/stutymore/1719474903507-218382ce-d936-4c32-a5c3-d2456ed401c1.png)

还有架构篇，特意区分了微服务版本和单体版本，帮助大家在学习的过程中无缝切换，哪里不会点哪里，妈妈再也不用担心我的工作了（👌）。涉及到 SpringCloud Gateway、Nacos、OpenFeign、SpringBoot Actuator、SkyWalking、Sentinel、Rocketmq、Seata 等关键技术栈。

![PmHub架构篇](https://cdn.tobebetterjavaer.com/stutymore/1719475335348-6193d702-788a-4153-b01a-5523fe57d190.png)

还有业务篇，涉及到 PmHub 的具体业务，包括项目管理、流程管理、以及表结构，帮助大家更好地理解项目的业务逻辑，以及如何将业务逻辑转化为实际的代码。

![PmHub业务篇](https://cdn.tobebetterjavaer.com/stutymore/1719475573381-3aa93f07-836b-4fd1-a514-e7b0edf63672.png)

这还没完，接下来是部署篇，无论你是 Windows，还是 macOS，还是云服务器，还是 Docker 容器化，还是 Jenkins 自动化 CI/CD，我们都兼顾到了，让你一次性掌握全平台的部署流程，不全是去中大厂、独角兽，还是小公司和外包，都能够游刃有余，轻松应对工作。

![PmHub部署文档](https://cdn.tobebetterjavaer.com/stutymore/1719475847289-db13723c-412d-420c-b5f5-7ea0d6475b44.png)

最后是单体改造微服务避坑指南和 AI 辅助编程实战，紧贴大家在学习和工作中的实际需求，让大家真正能够学以致用，不再是纸上谈兵。

![PmHub 微服务改造和 AI 辅助编程](https://cdn.tobebetterjavaer.com/stutymore/03.如何学习PmHub-20240705084512.png)

## 06、如何快速掌握 PmHub？

既然 PmHub 这么优秀，该怎么快速掌握呢？尤其是准备 25 届秋招和金九银十跳槽的小伙伴。

PmHub 的学习路线可以分为五大块：产品设计、技术架构、组件库开发、业务梳理和系统开发。

![PmHub 的学习路线](https://cdn.tobebetterjavaer.com/stutymore/03.如何学习PmHub-20240705085428.png)

①、授人以鱼不如授人以渔，我认为一个好的项目教程不应该一上来就讲某某技术栈，而应该先了解清楚这个项目的底层逻辑，理解产品的核心价值，才能更好地技术去实现业务。

![PmHub 产品设计](https://cdn.tobebetterjavaer.com/stutymore/03.如何学习PmHub-20240706105923.png)

为了让大家更好地理解和掌握项目业务，我们将会从 0-1 带你进行产品设计、需求分析、原型图绘制等。

![PmHub在线原型图](https://cdn.tobebetterjavaer.com/stutymore/20240530161308.png)

PmHub原型图在线查看地址：[https://lanhuapp.com/link/#/invite?sid=qxZji4oa](https://lanhuapp.com/link/#/invite?sid=qxZji4oa)

②、技术架构是项目的基础，只有把项目的基础打扎实了，才能更好的实现业务。我们将会从 0-1 带你进行技术架构的搭建，包括架构方案设计、技术选型等。

![PmHub技术架构导图](https://cdn.tobebetterjavaer.com/stutymore/03.如何学习PmHub-20240706110121.png)

③、组件库源于对公共功能的封装，避免相同的功能在不同项目之间重复出现。为了统一各个微服务可能使用到的公共内容，我们在这里规划了常用且通用的功能点，比如说消息通知、数据库连接、权限控制、敏感词等等。我们统一放在了 pmhub-base 模块下。

![pmhub-base模块](https://cdn.tobebetterjavaer.com/stutymore/03.如何学习PmHub-20240706110755.png)

组件库的开发宗旨是汇总资源，更高效地提供业务敏捷开发的能力，后续的迭代也将遵循这一原则。目前，这只是一个起点，是整体规划的一部分，还有许多可以提升的空间。

![PmHub 组件库](https://cdn.tobebetterjavaer.com/stutymore/03.如何学习PmHub-20240706111058.png)


④、PmHub 的基础业务包括系统、认证、项目、代码生成、流程及网关服务等。

![PmHub 的业务思维导图](https://cdn.tobebetterjavaer.com/stutymore/03.如何学习PmHub-20240702161558.png)

⑤、PmHub 囊括了时下互联网企业常用的技术栈，包括 SpringCloud、Spring Boot、SpringCloud Alibaba、MyBatis-Plus、Redis、RocketMQ、Sentinel、Gateway、Docker、WebSocket、JWT、SpringSecurity 等等。

|  | 技术 | 名称 | 版本 | 官网 |
| --- | --- | --- | --- | --- |
| 1 | Spring Boot | 基础框架 | 2.7.18 | [https://spring.io/projects/spring-boot](https://spring.io/projects/spring-boot) |
| 2 | SpringCloud | 微服务框架 | 2021.0.8 | [https://spring.io/projects/spring-cloud](https://spring.io/projects/spring-cloud) |
| 3 | SpringCloud Alibaba | 阿里微服务框架 | 2021.0.5.0 | [https://github.com/alibaba/spring-cloud-alibaba](https://github.com/alibaba/spring-cloud-alibaba) |
| 4 | SpringCloud Gateway | 服务网关 | 3.1.8 | [https://spring.io/projects/spring-cloud-gateway](https://spring.io/projects/spring-cloud-gateway) |
| 5 | MyBatis-Plus | 持久层框架 | 3.5.1 | [https://baomidou.com](https://baomidou.com) |
| 6 | Redis | 分布式缓存数据库 | Latest | [https://redis.io](https://redis.io) |
| 7 | RocketMQ | 消息队列 | 2.2.3 | [https://rocketmq.apache.org](https://rocketmq.apache.org) |
| 8 | HuTool | 小而全的工具集项目 | 5.8.11 | [https://hutool.cn](https://hutool.cn) |
| 9 | Maven | 项目构建管理 | 3.9.1 | [http://maven.apache.org](http://maven.apache.org) |
| 10 | Sentinel | 流控防护框架 | 1.8.6 | [https://github.com/alibaba/Sentinel](https://github.com/alibaba/Sentinel) |
| 11 | TTL | 增强版 ThreadLocal | 2.14.3 | [https://github.com/alibaba/transmittable-thread-local](https://github.com/alibaba/transmittable-thread-local) |
| 12 | FastJson2 | JSON 序列化工具 | 2.0.36 | [https://github.com/alibaba/fastjson2](https://github.com/alibaba/fastjson2) |
| 13 | Swagger3 | 项目 API 文档框架 | 3.x | [http://swagger.io](http://swagger.io) |
| 14 | Docker | 应用容器引擎 | 20.10.17 | [https://www.docker.com](https://www.docker.com) |
| 15 | Nginx | 反向代理服务器 | 1.18.0 | [https://nginx.org](https://nginx.org) |
| 16 | JWT | jwt登录 | 0.11.5 | [https://jwt.io](https://jwt.io) |
| 17 | Druid | 数据库连接池 | 1.2.20 | [https://druid.io](https://druid.io) |
| 18 | POI | 读写office文件 | 4.1.2 | [https://poi.apache.org/](https://poi.apache.org/) |
| 19 | Velocity | 模版引擎 | 2.3 | [https://velocity.apache.org//](https://velocity.apache.org/) |
| 20 | bcprov | 加密算法 | 1.7.5 | [https://www.bouncycastle.org/](https://www.bouncycastle.org/) |

## 07、PmHub 的未来

相信看到这里的小伙伴，已经开始摩拳擦掌，想现在立刻马上开搞 PmHub 了。那欢迎大家扫下面的优惠券（或者长按自动识别）加入我们吧，[星球](https://laigeoffer.cn/zsxq/)目前定价 149 元/年，优惠完只需要 119 元，每天不到 0.33 元，绝对的超值。

![微信扫码或者长按识别](https://cdn.tobebetterjavaer.com/stutymore/readme-二哥的星球优惠券.png)

星球也马上 6000 人了，新一轮涨价已经箭在弦上，毕竟人多了，我们付出的时间成本也会更多，相信大家也都能理解。

加入[「二哥的编程星球」](https://laigeoffer.cn/zsxq/)后，你还可以享受以下专属内容服务：

- 1、**付费文档:** PmHub、技术派、MYDB、编程喵等项目配套的 60万+ 字教程查看权限
- 2、**面试指南**: 校招、社招的 40 万+字面试求职攻略
- 3、**智能助手**: 无限期使用派聪明 AI 助手，已对接讯飞星火和 OpenAI双通道，不用花 1 分钱
- 4、**专属问答**: 向二哥和苍何发起 1v1 提问，内容不限于 offer 选择、学习路线、职业规划等
- 5、**简历修改**: 提供简历修改服务，附赠星球 500+优质简历模板可供参考
- 6、**学习环境:** 打造一个沉浸式的学习环境，有一种高考冲刺、大学考研的氛围

另外，大家在学习 PmHub 的过程中，遇到的任何提问，都可以向我和苍何提问，我们会在第一时间给大家解疑答惑。

学习的路上最缺的就是清晰的学习路线、优质的学习资料和良好的学习氛围，二哥的编程星球恰好就能给你提供这样的服务。来星球的球友几乎都斩获不错的成绩，有美团、华为等大厂，也有 16k 的双非本、甚至 23k 的大专社招，我随便发几个球友报喜的截图给大家展示下。

![度小满、专科生、国企](https://cdn.tobebetterjavaer.com/stutymore/readme-20231221211916.png)

![华为、小红书、美团](https://cdn.tobebetterjavaer.com/stutymore/readme-20231221213449.png)

一次购买不需要额外付费，即可获取二哥编程星球的所有付费资料，帮助你少走弯路，提高学习效率。

付费社群我加入了很多，但从未见过比这更低价格，提供更多服务的社群，光 PmHub 和技术派这两个项目的就能让你值回票价。

如果有提供这些服务，并且比二哥编程星球价格更低的，欢迎评论区留言。

多说一句，任何时候，技术都是我们程序员的安身立命之本，如果你能认认真真跟完 PmHub 的源码和教程，相信你的编程功底会提升一大截。

我们的代码，严格按照大厂的标准来，无论是整体的架构，还是具体的细节，都是无可挑剔的学习对象。

![PmHub 源码截图](https://cdn.tobebetterjavaer.com/stutymore/1719476460646-152d4d3d-0171-434b-800a-975d27464320.png)

之前曾有球友问我：“二哥，你的星球怎么不定价 299、399 啊，我感觉星球提供的价值远超这个价格啊。”
答案很明确，我有自己的原则，**拒绝割韭菜，用心做内容，能帮一个是一个**。

不为别的，为的就是给所有人提供一个可持续的学习环境。当然了，随着人数的增多，二哥付出的精力越来越多，星球也会涨价，今天这批 30 元的优惠券不仅 2024 年最大的优惠力度，也是 2025 年最大的优惠力度，现在入手就是最划算的，再犹豫就只能等着涨价了。

![微信扫码或者长按识别](https://cdn.tobebetterjavaer.com/stutymore/readme-二哥的星球优惠券.png)

毕竟 PmHub、技术派网站用到的域名、证书、服务器、CDN、OSS、OpenAI 的 API KEY、讯飞星火大模型的 token 都需要钱。

![服务器费用](https://cdn.tobebetterjavaer.com/stutymore/pmhub-20240709160406.png)

想想，QQ音乐听歌连续包年需要 **88元**，腾讯视频连续包年需要 **178元**，腾讯体育包年 **233元**。我相信，二哥编程星球回馈给你的，将是 10 倍甚至百倍的价值。

最后，希望小伙伴们，能紧跟我们的步伐！不要掉队。今年，和二哥一起翻身、一起逆袭、一起晋升、一起拿高薪 offer！