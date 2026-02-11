# 百度薪资+微服务学习路线

大家好，我是二哥呀。

百度今年的薪资仍然维持在第一梯队的水平，我已收录到《[Java 面试指南](https://mp.weixin.qq.com/s/xk9yZ-dEEZWTsfc0Hma3Wg)》专栏中，大家可以去做个参考（还有很多其他家）。

![信息来源于 offershow](https://cdn.tobebetterjavaer.com/stutymore/baidujinniandexinzi7022-image243.png)

- 产品经理岗，开了 22k，还有一些签字费
- 客户端岗，开了 25k，HR 说绝对不是白菜
- 开发岗，开了30k，算是SP 到 SSP 的水平了，没有加面
- 开发岗，开了 24k，双非本，电话通知不给 A
- 算法岗，开了 35k，硕士双一流，和开发岗没有拉开太大的差距

星球里有几个球友是上周开奖的，其中一个是 Java 后端开发岗，给到了 SP 的水平。

![](https://cdn.tobebetterjavaer.com/stutymore/baidujinniandexinzi5918-image863.png)

百度对应届生的整体培养体系在业界是有口皆碑的，很多互联网大厂在社招的时候，都会倾向于从百度挖人。

问了一位 25 届在百度的同学（叠甲，仅供参考），他给的反馈是，上班时间早上10开始，午饭11.30到1.30，晚饭5.30到7.30，下班基本是晚上67点。

早上 7.30-9.30 早餐免费，晚上8点到9.30夜宵免费。每天20餐补，月底统一发，非北京户籍非北京学校的每月有1600房补。

对于秋招结果不理想的同学，春招也是完全可以冲的，今年 5 月份，有球友拿到了百度 SRE 运维岗，薪资给的很不错。

![](https://cdn.tobebetterjavaer.com/stutymore/baidujinniandexinzi5301-image4388.png)

所以**只要你能坚持到最后一刻，就能跑赢很多竞争对手**。

千万不要因为一时的挫折，就被打击到，放弃自己。求职说到底，就这四件事：

- 写简历、投简历
- 算法过笔试和手撕
- 八股和项目过面试（包括一些场景题）
- 面试后的复盘，查漏补缺

简单帮大家分析一下。

①、如果你投了很多简历，挂的比较多，那就不要硬着头皮继续投，你可以付费找个师兄师姐帮你看看，把把脉。

②、算法的话，如果不打算去大厂，优先级可以放低一点，11 月和 12 月还在招的公司，基本上都不怎么考察这一项。

③、八股的话，如果你之前没有背过面渣逆袭，真的可以试试，有口皆碑。

![](https://cdn.tobebetterjavaer.com/stutymore/2025nian11yue13ri1802-image8884.png)

网址：`https://javabetter.cn/sidebar/sanfene/nixi.html`，微服务、设计模式和 Linux 也都有。

![](https://cdn.tobebetterjavaer.com/stutymore/baidujinniandexinzi1496-image1088.png)

④、项目的话，可以做一些 AI 方面的项目，比如说[派聪明 RAG](https://mp.weixin.qq.com/s/Yj8xbkGURJgSL34iMgfyyQ)，润到科研经历，或者实习公司里，都是很恰当的。

编码能力比较强的同学，或者准备社招的同学，微服务是一定要做的，[推荐 PmHub 这个项目](https://mp.weixin.qq.com/s/NIoYQbvBWI73xKqzBnBR4w)，代码开源在 GitHub 上，像 Sentinel、Nacos、Gateway、Seata 这些技术栈都有覆盖到，当时花了蛮多心思。

![](https://cdn.tobebetterjavaer.com/stutymore/baidujinniandexinzi8337-image7454.png)

## 微服务学习路线

微服务涉及到内容比较多，上手难度也比一般的单体项目大很多，我这里帮大家先梳理一下必要的知识点。

①、服务注册与发现，典型的代表就是 Nacos，服务注册的流程是什么、心跳机制怎么实现、服务下线怎么感知、健康检查怎么做。 CAP 理论在注册中心的体现，Nacos 的 CP 和 AP 模式是怎么切换的。 要理解Nacos 的设计思想，Nacos 的命名空间、分组、集群是怎么划分的，怎么实现多租户隔离。配置中心是怎么实现的，配置变更是怎么推送的。 

![](https://cdn.tobebetterjavaer.com/stutymore/baidujinniandexinzi4240-image3159.png)

②、负载均衡和服务调用，OpenFeign 是怎么把接口转成 HTTP 调用的，动态代理是怎么实现的，超时重试的机制。

```java
@Configuration
public class FeignConfig
{
    @Bean
    public Retryer myRetryer()
    {
        //return Retryer.NEVER_RETRY; //Feign默认配置是不走重试策略的

        //最大请求次数为3(1+2)，初始间隔时间为100ms，重试间最大间隔时间为1s
        return new Retryer.Default(100,1,3);
    }
}
```

③、API 网关，Gateway 的路由、过滤、限流、鉴权、熔断。路由是怎么配置的、是怎么匹配的。过滤器链是怎么执行的，全局过滤器和局部过滤器的区别。 

④、限流和熔断降级，Sentinel 的限流算法，令牌桶、漏桶、滑动窗口，各自的优缺点。Sentinel 的熔断降级策略，慢调用比例、异常比例、异常数。Sentinel 的规则配置和持久化。 

这部分学完的话，简历上就可以这样写。

>通过 OpenFeign+Sentinel 实现自定义的 fallback 服务降级，确保系统在服务异常情况下仍然能稳定运行；并通过 Gateway+Sentinel 进行网关限流，减少峰值流量对单点服务造成强烈冲击，从而保证服务的可用性达到 99.9%以上。

⑤、链路追踪，Skywalking 的 OAP 和 Agent 架构，数据是怎么采集、怎么传输、怎么存储、怎么查询的。 

![](https://cdn.tobebetterjavaer.com/stutymore/baidujinniandexinzi5834-image8895.png)

⑥、分布式事务，Seata 的 AT、TCC、Saga、XA 四种模式。AT 模式的自动补偿是怎么实现的，undo_log 是干什么的。TCC 模式的两阶段提交，怎么保证一致性。Seata 的全局事务 ID 是怎么传递的，事务协调器 TC 是怎么工作的。 

![](https://cdn.tobebetterjavaer.com/stutymore/baidujinniandexinzi7712-image3423.png)

⑦、链路追踪，包括Prometheus 的指标采集和存储，Grafana 的可视化。ELK（Elasticsearch、Logstash、Kibana）的日志收集和分析。 

⑧、容器和 K8s，非常非常多，是一个非常宏观，也是能够拉开差距的一套技术栈，这些基本上 PmHub 都覆盖到了。

对于微服务的学习，我觉得二开是一比较理想的选择，也是最现实、快速的路线，选择成熟的项目，理解，然后应用到已有的项目当中。 

等于站在巨人的肩膀上，学习曲线也会更加平缓。 完全自研的话，开发周期会比较长，可能至少一年以上才能做出相对完整的产品，技术难度也会比较大，踩坑也会比较多。 并且可能需要一个团队。 

大致可以分为三个阶段。

第一阶段（1-2 个月）：基于 Nacos 和 Sentinel 做统一封装，提供 Starter，让业务项目可以快速接入。做一个简单的管理界面，可以查看服务列表、配置限流规则。选 1-2 个业务项目试点接入，验证可行性。 

第二阶段（2-3 个月）：增加更多功能，比如链路追踪、API 网关、统一监控。完善管理界面，增加更多的配置和管理功能。

第三阶段（3-6 个月）：做一些高级功能，比如灰度发布、多环境隔离。

![](https://cdn.tobebetterjavaer.com/stutymore/baidujinniandexinzi3497-image4181.png)

心情不好了，就放肆一下。

身体倦怠了，就躺平一下。

等精神和身体都恢复元气那一刻，继续猛猛冲就对了。

## ending

一个人可以走得很快，但一群人才能走得更远。[二哥的编程星球](https://mp.weixin.qq.com/s/Aw_nm6dfgO_YbF6-Et1uiw)已经有 11500 多名球友加入了（马上涨价），如果你也需要一个优质的学习环境，[戳链接 🔗](https://mp.weixin.qq.com/s/Aw_nm6dfgO_YbF6-Et1uiw) 加入我们吧。这是一个 [简历精修](https://mp.weixin.qq.com/s/ohQaEAqP3eCv3HAvueyEug) + 编程项目实战（[RAG 派聪明 Java 版](https://mp.weixin.qq.com/s/Yj8xbkGURJgSL34iMgfyyQ)/[Go 版本](https://mp.weixin.qq.com/s/SBhWA-pKx7NBN7BIzq9okg)、[技术派](https://mp.weixin.qq.com/s/Qv4wlqGPHvLWoKTsy-jP7w)、[微服务 PmHub](https://mp.weixin.qq.com/s/NIoYQbvBWI73xKqzBnBR4w)）+ [Java 面试指南](https://mp.weixin.qq.com/s/xk9yZ-dEEZWTsfc0Hma3Wg)的私密圈子，你可以阅读星球专栏、向二哥提问、帮你制定学习计划、和球友一起打卡成长。

最后，把二哥的座右铭送给大家：**没有什么使我停留——除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟**。共勉 💪。