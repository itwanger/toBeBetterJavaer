---
title: 只会用 xxl-job？更强大的新一代分布式任务调度框架来了！
shortTitle: 只会用 xxl-job？更强大的新一代分布式任务调度框架来了！
description: 只会用 xxl-job？更强大的新一代分布式任务调度框架来了！
category:
  - 微信公众号
---

> [二哥的编程星球](https://mp.weixin.qq.com/s/CljCSezUgoBXb-T9wbIGww)已经有 **1300 多名** 球友加入了，如果你也需要一个良好的学习氛围，[戳链接](https://mp.weixin.qq.com/s/CljCSezUgoBXb-T9wbIGww)加入我们吧！这是一个编程学习指南+ Java项目实战+LeetCode 刷题的私密圈子，你可以阅读星球专栏、向二哥提问、帮你制定学习计划、和球友一起打卡成长，冲冲冲。

这几天和朋友聊天时，聊到了他们公司在统一更换分布式调度服务的事情。之前使用的是基于 LTS 魔改的分布式调度系统，但是因为这个开源项目太久没有更新，且现在遇到了一些问题，因此公司在推动替换为 PowerJob。

这倒是勾起了我的好奇心，因为前段时间用 **xxl-job 替换掉了同样不太好用的 QuartZ**，那时候还没有调研 PowerJob。于是这次研究了一番，**发现 PowerJob 确实是个很棒的框架**，在这里推荐给大家。

## 为什么选择PowerJob？

PowerJob是新一代分布式任务调度与计算框架，支持CRON、API、固定频率、固定延迟等调度策略，提供工作流来编排任务解决依赖关系，能让您轻松完成作业的调度与繁杂任务的分布式计算。

当前市面上流行的作业调度框架有老牌的Quartz、基于Quartz的elastic-job和原先基于Quartz后面移除依赖的xxl-job，这里分别谈一些这些框架现存的缺点。

Quartz可以视为第一代任务调度框架，基本上是现有所有分布式调度框架的“祖宗”。由于历史原因，它不提供Web界面，只能通过API完成任务的配置，使用起来不够方便和灵活，同时它仅支持单机执行，无法有效利用整个集群的计算能力。

xxl-job可以视为第二代任务调度框架，在一定程度上解决了Quartz的不足，在过去几年中是个非常优秀的调度框架，不过放到今天来看，还是存在着一些不足的，具体如下：

*   **数据库支持单一：** 仅支持MySQL，使用其他DB需要自己魔改代码
*   **有限的分布式计算能力：** 仅支持静态分片，无法很好的完成复杂任务的计算
*   **不支持工作流：** 无法配置各个任务之间的依赖关系，不适用于有DAG需求的场景

正所谓长江后浪推前浪，在如今这个数据量日益增长、业务越来越复杂的年代，急需一款更为强大的任务调度框架来解决上诉问题，而PowerJob因此应运而生。

PowerJob可以被认为是第三代任务调度框架，在任务调度的基础上，还额外提供了分布式计算和工作流功能，其主要特性如下：

*   **使用简单：** 提供前端Web界面，允许开发者可视化地完成调度任务的管理（增、删、改、查）、任务运行状态监控和运行日志查看等功能。
*   **定时策略完善：** 支持CRON表达式、固定频率、固定延迟和API四种定时调度策略。
*   **执行模式丰富：** 支持单机、广播、Map、MapReduce四种执行模式，其中Map/MapReduce处理器能使开发者寥寥数行代码便获得集群分布式计算的能力。
*   **DAG工作流支持：** 支持在线配置任务依赖关系，可视化得对任务进行编排，同时还支持上下游任务间的数据传递
*   **执行器支持广泛：** 支持Spring Bean、内置/外置Java类、Shell、Python等处理器，应用范围广。
*   **运维便捷：** 支持在线日志功能，执行器产生的日志可以在前端控制台页面实时显示，降低debug成本，极大地提高开发效率。
*   **依赖精简：** 最小仅依赖关系型数据库（MySQL/PostgreSQL/Oracle/MS SQLServer…），同时支持所有Spring Data JPA所支持的关系型数据库。
*   **高可用&高性能：** 调度服务器经过精心设计，一改其他调度框架基于数据库锁的策略，实现了无锁化调度。部署多个调度服务器可以同时实现高可用和性能的提升（支持无限的水平扩展）。
*   **故障转移与恢复：** 任务执行失败后，可根据配置的重试策略完成重试，只要执行器集群有足够的计算节点，任务就能顺利完成。

## 同类产品对比

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhikyxxljobgqddxydfbsrwddkjll-8277a9a2-c8b9-41c4-b436-a3ba21867ec7.jpg)

## 适用场景

有定时执行需求的业务场景：如每天凌晨全量同步数据、生成业务报表等。

有需要全部机器一同执行的业务场景：如使用广播执行模式清理集群日志。

有需要分布式处理的业务场景：比如需要更新一大批数据，单机执行耗时非常长，可以使用Map/MapReduce处理器完成任务的分发，调动整个集群加速计算。

## 整体架构

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhikyxxljobgqddxydfbsrwddkjll-ac9cb85b-6956-4053-90a9-e3d5080753dc.jpg)

## 快速开始

PowerJob由调度服务器（powerjob-server）和执行器(powerjob-worker)两部分组成，powerjob-server负责提供Web服务和完成任务的调度，powerjob-worker则负责执行用户所编写的任务代码，同时提供分布式计算能力。

## 初始化项目

```
git clone https://github.com/KFCFans/PowerJob.git
```

导入 IDE，源码结构如下，我们需要启动调度服务器（powerjob-server），同时在samples工程中编写自己的处理器代码

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhikyxxljobgqddxydfbsrwddkjll-64202e6a-a1bb-4b4b-bff2-acac46bd5be8.jpg)

## 启动调度服务器

创建数据库 powerjob-daily

修改配置文件，配置文件的说明官方文档写的非常详细，此处不再赘述。需要修改的地方为数据库配置`spring.datasource.core.jdbc-url`、`spring.datasource.core.username`和`spring.datasource.core.password`，当然，有mongoDB的同学也可以修改`spring.data.mongodb.uri`以获取完全版体验。

```
oms.env=DAILY
logging.config=classpath:logback-dev.xml

####### 数据库配置 #######
spring.datasource.core.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.core.jdbc-url=jdbc:mysql://remotehost:3306/powerjob-daily?useUnicode=true&characterEncoding=UTF-8
spring.datasource.core.username=root
spring.datasource.core.password=No1Bug2Please3!
spring.datasource.core.hikari.maximum-pool-size=20
spring.datasource.core.hikari.minimum-idle=5

####### mongoDB配置，非核心依赖，可移除 #######
spring.data.mongodb.uri=mongodb://remotehost:27017/powerjob-daily

####### 邮件配置（启用邮件报警则需要） #######
spring.mail.host=smtp.163.com
spring.mail.username=zqq
spring.mail.password=qqz
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.properties.mail.smtp.starttls.required=true

####### 资源清理配置 #######
oms.log.retention.local=1
oms.log.retention.remote=1
oms.container.retention.local=1
oms.container.retention.remote=-1
oms.instanceinfo.retention=1

####### 缓存配置 #######
oms.instance.metadata.cache.size=1024
```

完成配置文件的修改后，可以直接通过启动类`com.github.kfcfans.powerjob.server.OhMyApplication`启动调度服务器，观察启动日志，查看是否启动成功～启动成功后，访问 `http://127.0.0.1:7700/` ，如果能顺利出现Web界面，则说明调度服务器启动成功！

注册应用：点击主页应用注册按钮，填入 oms-test和控制台密码（用于进入控制台），注册示例应用（当然你也可以注册其他的appName，只是别忘记在示例程序中同步修改～）

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhikyxxljobgqddxydfbsrwddkjll-895acdb6-a020-4055-977a-a92c6e95c81a.jpg)

## 编写示例代码

进入示例工程（powerjob-worker-samples），修改配置文件连接powerjob-server并编写自己的处理器代码。

修改powerjob-worker-samples的启动配置类`com.github.kfcfans.powerjob.samples.OhMySchedulerConfig`，将AppName修改为刚刚在控制台注册的名称。

```
@Configuration
public class OhMySchedulerConfig {
    @Bean
    public OhMyWorker initOMS() throws Exception {

        // 服务器HTTP地址（端口号为 server.port，而不是 ActorSystem port）
        List<String> serverAddress = Lists.newArrayList("127.0.0.1:7700");

        // 1. 创建配置文件
        OhMyConfig config = new OhMyConfig();
        config.setPort(27777);
        config.setAppName("oms-test");
        config.setServerAddress(serverAddress);
        // 如果没有大型 Map/MapReduce 的需求，建议使用内存来加速计算
        config.setStoreStrategy(StoreStrategy.MEMORY);

        // 2. 创建 Worker 对象，设置配置文件
        OhMyWorker ohMyWorker = new OhMyWorker();
        ohMyWorker.setConfig(config);
        return ohMyWorker;
    }
}
```

编写自己的处理器：随便找个地方新建类，继承你想要使用的处理器（各个处理器的介绍可见官方文档，文档非常详细），这里为了简单演示，选择使用单机处理器BasicProcessor，以下是代码示例。

```
@Slf4j
@Component
public class StandaloneProcessorDemo implements BasicProcessor {

    @Override
    public ProcessResult process(TaskContext context) throws Exception {

        OmsLogger omsLogger = context.getOmsLogger();
        omsLogger.info("StandaloneProcessorDemo start process,context is {}.", context);
        System.out.println("jobParams is " + context.getJobParams());
        
        return new ProcessResult(true, "process successfully~");
    }
}
```

启动示例程序，即直接运行主类`com.github.kfcfans.powerjob.samples.SampleApplication`，观察控制台输出信息，判断是否启动成功。推荐：[Java面试题](https://mp.weixin.qq.com/s?__biz=MzIyNDU2ODA4OQ==&mid=2247494231&idx=1&sn=287fd16b4657a32ad91e8108bbcbbe44&scene=21#wechat_redirect)

## 任务的配置与运行

调度服务器与示例工程都启动完毕后，再次前往Web页面（ `http://127.0.0.1:7700/` ），进行任务的配置与运行。

在首页输入框输入配置的应用名称，成功操作后会正式进入前端管理界面。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhikyxxljobgqddxydfbsrwddkjll-4621ad34-757c-45b6-94e5-0af5df2a5df0.jpg)

点击任务管理 -> 新建任务（右上角），开始创建任务。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhikyxxljobgqddxydfbsrwddkjll-0224b9f9-9656-41de-b702-8c754e1cfc9d.jpg)

完成任务创建后，即可在控制台看到刚才创建的任务，如果觉得等待调度太过于漫长，可以直接点击运行按钮，立即运行本任务。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhikyxxljobgqddxydfbsrwddkjll-766e7fcc-a0a8-4bd3-8c2a-1a3c6719ed50.jpg)

前往任务示例边栏，查看任务的运行状态和在线日志

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhikyxxljobgqddxydfbsrwddkjll-71757cad-61c3-4461-8bc9-19e0c13f5489.jpg)

基础的教程到这里也就结束了～更多功能示例可见官方文档，工作流、MapReduce、容器等高级特性等你来探索！

## 相关链接

>- 项目地址：https://github.com/KFCFans/PowerJob
>- 官方文档：https://www.yuque.com/powerjob/guidence/ztn4i5
>- 在线试用：https://www.yuque.com/powerjob/guidence/hnbskn
>- 原文链接：blog.csdn.net/LY\_624/article/details/106987036，编辑：沉默王二

---

最后，把二哥的座右铭送给大家：**没有什么使我停留——除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟**。共勉 💪。

- ✌️：[赔偿还是给足了的](https://mp.weixin.qq.com/s/MLsBUzoR7fjZIWQQzqQuWg)
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



>参考链接：[https://mp.weixin.qq.com/s/mA3SgTMVhI-aO1LDPA60sQ](https://mp.weixin.qq.com/s/mA3SgTMVhI-aO1LDPA60sQ)，出处：捡田螺的小男孩，整理：沉默王二
