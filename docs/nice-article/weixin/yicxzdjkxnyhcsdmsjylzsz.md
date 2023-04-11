---
title: 一次显著的接口性能优化，从20s到500ms，就用了这三招！
shortTitle: 一次显著的接口性能优化，从20s到500ms，就用了这三招！
description: 接口性能问题，对于从事后端开发的同学来说，是一个绕不开的话题。
author: 苏三呀
category:
  - 微信公众号
head:
  - - meta
    - name: description
      content: 接口性能问题，对于从事后端开发的同学来说，是一个绕不开的话题。
---

## 前言

接口性能问题，对于从事后端开发的同学来说，是一个绕不开的话题。想要优化一个接口的性能，需要从多个方面着手。

其实，我之前也写过一篇接口性能优化相关的文章《[聊聊接口性能优化的11个小技巧](https://mp.weixin.qq.com/s?__biz=MzkwNjMwMTgzMQ==&mid=2247490731&idx=1&sn=29ed0295c7990157a3a56ba33cf7f8be&chksm=c0ebc443f79c4d55a2bac81744992c96f97737e5d0717ec99231f4d08f57a7f0220eafdac9c9&token=660773166&lang=zh_CN&scene=21#wechat_redirect)》，发表之后在全网广受好评，感兴趣的小伙们可以仔细看看。

本文将会接着接口性能优化这个话题，从实战的角度出发，聊聊我是如何优化一个慢查询接口的。

上周我优化了一下线上的批量评分查询接口，将接口性能从最初的`20s`，优化到目前的`500ms`以内。

总体来说，用三招就搞定了。

到底经历了什么？

## 1\. 案发现场

我们每天早上上班前，都会收到一封线上慢查询接口汇总邮件，邮件中会展示`接口地址`、`调用次数`、`最大耗时`、`平均耗时`和`traceId`等信息。

我看到其中有一个批量评分查询接口，最大耗时达到了`20s`，平均耗时也有`2s`。

用`skywalking`查看该接口的调用信息，发现绝大数情况下，该接口响应还是比较快的，大部分情况都是500ms左右就能返回，但也有少部分超过了20s的请求。

这个现象就非常奇怪了。

莫非跟数据有关？

比如：要查某一个组织的数据，是非常快的。但如果要查平台，即组织的根节点，这种情况下，需要查询的数据量非常大，接口响应就可能会非常慢。

但事实证明不是这个原因。

很快有个同事给出了答案。

他们在结算单列表页面中，批量请求了这个接口，但他传参的数据量非常大。

怎么回事呢？

当初说的需求是这个接口给分页的列表页面调用，每页大小有：10、20、30、50、100，用户可以选择。

换句话说，调用批量评价查询接口，一次性最多可以查询100条记录。

但实际情况是：结算单列表页面还包含了很多订单。基本上每一个结算单，都有多个订单。调用批量评价查询接口时，需要把结算单和订单的数据合并到一起。

这样导致的结果是：调用批量评价查询接口时，一次性传入的参数非常多，入参list中包含几百、甚至几千条数据都有可能。

## 2\. 现状

如果一次性传入几百或者几千个id，批量查询数据还好，可以走主键索引，查询效率也不至于太差。

但那个批量评分查询接口，逻辑不简单。

伪代码如下：

```
public List<ScoreEntity> query(List<SearchEntity> list) {
    //结果
    List<ScoreEntity> result = Lists.newArrayList();
    //获取组织id
    List<Long> orgIds = list.stream().map(SearchEntity::getOrgId).collect(Collectors.toList());
    //通过regin调用远程接口获取组织信息
    List<OrgEntity> orgList = feginClient.getOrgByIds(orgIds);
    
    for(SearchEntity entity : list) {
        //通过组织id找组织code
        String orgCode = findOrgCode(orgList, entity.getOrgId());
    
        //通过组合条件查询评价
        ScoreSearchEntity scoreSearchEntity = new ScoreSearchEntity();
        scoreSearchEntity.setOrgCode(orgCode);
        scoreSearchEntity.setCategoryId(entity.getCategoryId());
        scoreSearchEntity.setBusinessId(entity.getBusinessId());
        scoreSearchEntity.setBusinessType(entity.getBusinessType());
        List<ScoreEntity> resultList = scoreMapper.queryScore(scoreSearchEntity);
        
        if(CollectionUtils.isNotEmpty(resultList)) {
            ScoreEntity scoreEntity = resultList.get(0);
            result.add(scoreEntity);
        }
    }
    return result;
}
```

其实在真实场景中，代码比这个复杂很多，这里为了给大家演示，简化了一下。

最关键的地方有两点：

1.  在接口中远程调用了另外一个接口
2.  需要在for循环中查询数据

其中的第1点，即：在接口中远程调用了另外一个接口，这个代码是必须的。

因为如果在`评价表`中冗余一个组织code字段，万一哪天`组织表`中的组织code有修改，不得不通过某种机制，通知我们同步修改评价表的组织code，不然就会出现数据不一致的问题。

很显然，如果要这样调整的话，业务流程上要改了，代码改动有点大。

所以，还是先保持在接口中远程调用吧。

这样看来，可以优化的地方只能在：for循环中查询数据。

## 3\. 第一次优化

由于需要在for循环中，每条记录都要根据不同的条件，查询出想要的数据。

由于业务系统调用这个接口时，没有传`id`，不好在`where`条件中用`id in (...)`，这方式批量查询数据。

其实，有一种办法不用循环查询，一条sql就能搞定需求：使用`or`关键字拼接，例如：(org\_code='001' and category\_id=123 and business\_id=111 and business\_type=1) `or` (org\_code='002' and category\_id=123 and business\_id=112 and business\_type=2) `or` (org\_code='003' and category\_id=124 and business\_id=117 and business\_type=1)...

这种方式会导致sql语句会非常长，性能也会很差。

其实还有一种写法：

```
where (a,b) in ((1,2),(1,3)...)
```

不过这种sql，如果一次性查询的数据量太多的话，性能也不太好。

居然没法改成批量查询，就只能优化单条查询sql的执行效率了。

首先从`索引`入手，因为改造成本最低。

> 第一次优化是`优化索引`。

评价表之前建立一个business\_id字段的`普通索引`，但是从目前来看效率不太理想。

由于我果断加了`联合索引`：

```
alter table user_score add index  `un_org_category_business` (`org_code`,`category_id`,`business_id`,`business_type`) USING BTREE;
```

该联合索引由：`org_code`、`category_id`、`business_id`和`business_type`四个字段组成。

经过这次优化，效果立竿见影。

批量评价查询接口最大耗时，从最初的`20s`，缩短到了`5s`左右。

## 4\. 第二次优化

由于需要在for循环中，每条记录都要根据不同的条件，查询出想要的数据。

只在一个线程中查询数据，显然太慢。

那么，为何不能改成多线程调用？

> 第二次优化，查询数据库由`单线程`改成`多线程`。

但由于该接口是要将查询出的所有数据，都返回回去的，所以要获取查询结果。

使用多线程调用，并且要获取返回值，这种场景使用java8中的`CompleteFuture`非常合适。

代码调整为：

```
CompletableFuture[] futureArray = dataList.stream()
     .map(data -> CompletableFuture
          .supplyAsync(() -> query(data), asyncExecutor)
          .whenComplete((result, th) -> {
       })).toArray(CompletableFuture[]::new);
CompletableFuture.allOf(futureArray).join();
```

`CompleteFuture`的本质是创建`线程`执行，为了避免产生太多的线程，所以使用`线程池`是非常有必要的。

优先推荐使用`ThreadPoolExecutor`类，我们自定义线程池。

具体代码如下：

```
ExecutorService threadPool = new ThreadPoolExecutor(
    8, //corePoolSize线程池中核心线程数
    10, //maximumPoolSize 线程池中最大线程数
    60, //线程池中线程的最大空闲时间，超过这个时间空闲线程将被回收
    TimeUnit.SECONDS,//时间单位
    new ArrayBlockingQueue(500), //队列
    new ThreadPoolExecutor.CallerRunsPolicy()); //拒绝策略
```

也可以使用`ThreadPoolTaskExecutor`类创建线程池：

```
@Configuration
public class ThreadPoolConfig {

    /**
     * 核心线程数量，默认1
     */
    private int corePoolSize = 8;

    /**
     * 最大线程数量，默认Integer.MAX_VALUE;
     */
    private int maxPoolSize = 10;

    /**
     * 空闲线程存活时间
     */
    private int keepAliveSeconds = 60;

    /**
     * 线程阻塞队列容量,默认Integer.MAX_VALUE
     */
    private int queueCapacity = 1;

    /**
     * 是否允许核心线程超时
     */
    private boolean allowCoreThreadTimeOut = false;


    @Bean("asyncExecutor")
    public Executor asyncExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(corePoolSize);
        executor.setMaxPoolSize(maxPoolSize);
        executor.setQueueCapacity(queueCapacity);
        executor.setKeepAliveSeconds(keepAliveSeconds);
        executor.setAllowCoreThreadTimeOut(allowCoreThreadTimeOut);
        // 设置拒绝策略，直接在execute方法的调用线程中运行被拒绝的任务
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        // 执行初始化
        executor.initialize();
        return executor;
    }
}
```

经过这次优化，接口性能也提升了5倍。

从`5s`左右，缩短到`1s`左右。

但整体效果还不太理想。

## 5\. 第三次优化

经过前面的两次优化，批量查询评价接口性能有一些提升，但耗时还是大于1s。

出现这个问题的根本原因是：`一次性查询的数据太多`。

那么，我们为什么不限制一下，每次查询的记录条数呢？

> 第三次优化，限制一次性查询的记录条数。其实之前也做了限制，不过最大是2000条记录，从目前看效果不好。

限制该接口一次只能查`200`条记录，如果超过`200`条则会报错提示。

如果直接对该接口做限制，则可能会导致业务系统出现异常。

为了避免这种情况的发生，必须跟业务系统团队一起讨论一下优化方案。

主要有下面两个方案：

### 5.1 前端做分页

在结算单列表页中，每个结算单默认只展示1个订单，多余的分页查询。

这样的话，如果按照每页最大100条记录计算的话，结算单和订单最多一次只能查询200条记录。

这就需要业务系统的前端做`分页功能`，同时后端接口要调整支持`分页查询`。

但目前现状是前端没有多余开发资源。

由于人手不足的原因，这套方案目前只能暂时搁置。

### 5.2 分批调用接口

业务系统后端之前是`一次性`调用评价查询接口，现在改成`分批`调用。

比如：之前查询500条记录，业务系统只调用一次查询接口。

现在改成业务系统每次只查100条记录，分5批调用，总共也是查询500条记录。

这样不是变慢了吗？

答：如果那5批调用评价查询接口的操作，是在for循环中单线程顺序的，整体耗时当然可能会变慢。

但业务系统也可以改成`多线程`调用，只需最终汇总结果即可。

此时，有人可能会问题：在评价查询接口的服务器多线程调用，跟在其他业务系统中多线程调用不是一回事？

还不如把批量评价查询接口的服务器中，`线程池`的`最大线程数`调大一点？

显然你忽略了一件事：线上应用一般不会被部署成单点。绝大多数情况下，为了避免因为服务器挂了，造成单点故障，基本会部署至少2个节点。这样即使一个节点挂了，整个应用也能正常访问。

> 当然也可能会出现这种情况：假如挂了一个节点，另外一个节点可能因为访问的流量太大了，扛不住压力，也可能因此挂掉。

换句话说，通过业务系统中的多线程调用接口，可以将访问接口的流量负载均衡到不同的节点上。

他们也用8个线程，将数据分批，每批100条记录，最后将结果汇总。

经过这次优化，接口性能再次提升了1倍。

从`1s`左右，缩短到小于`500ms`。

温馨提醒一下，无论是在批量查询评价接口查询数据库，还是在业务系统中调用批量查询评价接口，使用多线程调用，都只是一个临时方案，并不完美。

这样做的原因主要是为了先快速解决问题，因为这种方案改动是最小的。

要从根本上解决问题，需要重新设计这一套功能，需要修改表结构，甚至可能需要修改业务流程。但由于牵涉到多条业务线，多个业务系统，只能排期慢慢做了。

* * *

**微信8.0将好友放开到了一万，小伙伴可以加我大号了，先到先得，再满就真没了**

**扫描下方二维码即可加我微信啦，`2022，抱团取暖，一起牛逼。`**

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-yicxzdjkxnyhcsdmsjylzsz-e5ad6bcd-46d8-4911-8390-f988d742ece7.jpg)

## 推荐阅读

*   [新来个技术总监，把 RabbitMQ 讲的那叫一个透彻，佩服！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247501313&idx=1&sn=4dc42f4e2662a5637ebbab646d699150&scene=21#wechat_redirect)
*   [支持Nacos 2.1.0！这套Spring Cloud Gateway+Oauth2终极权限解决方案升级了！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247501304&idx=1&sn=c9a17d313ad432081982132b2c1e79cc&scene=21#wechat_redirect)
*   [JetBrains正式宣布：产品涨价！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247501215&idx=1&sn=cd5e281cde81c8873b4bd19979d40191&scene=21#wechat_redirect)
*   [当开发同事辞职，接手到垃圾代码怎么办?](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247501139&idx=1&sn=21d24ce2dff862350eadfd876a3ea585&scene=21#wechat_redirect)
*   [还在用命令行看日志？快用Kibana吧，可视化日志分析YYDS！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247501074&idx=1&sn=629db39555b3d344f928b87abecbba69&scene=21#wechat_redirect)
*   [Mall电商实战项目全面升级！支持最新版SpringBoot，干掉循环依赖...](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247600+820&idx=1&sn=9895bd4c39b90d45eb2a10efedb236ac&scene=21#wechat_redirect)
*   [重磅更新！Mall实战教程全面升级，瞬间高大上了！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247499376&idx=1&sn=3ed28795cdd35fbaa3506e74a56703b0&scene=21#wechat_redirect)
*   [40K+Star！Mall电商实战项目开源回忆录！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247486684&idx=1&sn=807fd808adac8019eb2095ba088efe54&scene=21#wechat_redirect)



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-yicxzdjkxnyhcsdmsjylzsz-ffb0ad5d-a393-4a43-b594-74374c54f601.jpg)

>转载链接：[https://mp.weixin.qq.com/s/fPgFzGloyUTzSHkXa43M9w](https://mp.weixin.qq.com/s/fPgFzGloyUTzSHkXa43M9w)，出处：macrozheng，整理：沉默王二
