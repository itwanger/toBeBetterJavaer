# 影石这薪资，着实令人咋舌。。。

大家好，我是二哥呀。

当一个 base 30k 以上的校招 offer 摆到大家面前，相信很多同学都会下意识地认为这肯定是一家很能卷的互联网大厂。

但这事发生在做全景相机的科技新贵影石（Insta360）身上。

这不，[有球友](https://mp.weixin.qq.com/s/Aw_nm6dfgO_YbF6-Et1uiw)拿到了影石的运维开发，base 直接比小鹏的后端开发高了 8k。

![](https://files.mdnice.com/user/3903/9e9800b3-2041-47da-9aad-eab43f91c78f.png)

对于应届生来说，起薪非常重要，多出来的 8k 足够你晋升一次到两次，或者跳槽涨薪一次到两次。

所以我也是斩钉截铁地劝他选择影石，关键是影石这几年的发展非常不错，在全景相机领域，影石的份额已连续 8 年位居全球第一，达到了惊人的 85% 以上。运动相机也是一路高歌猛进。

据资料显示，影石 2025 年第三季度营收同比增长高达  92.64%，正处在高速增长期。

这恐怕也是影石今年校招薪资令人咋舌的根本原因。我也从 show 哥那里统计了一波影石今年的薪资情况，放在了 [Java 面试指南](https://mp.weixin.qq.com/s/xk9yZ-dEEZWTsfc0Hma3Wg)中，有需要的同学可以参考下。

![](https://files.mdnice.com/user/3903/f8939c29-fd90-4615-8efa-538dcb343ef6.png)

- 硕士 985，嵌入式开发，开了 33k，真的非常香，base 地是深圳。
- 硕士 985，后端开发，开了 30k，很有诚意的 SP
- 硕士双非，软件开发，开了 32k，直接就签了。
- 硕士，测开，开了 18k，年包算下来到手可能在 25 万左右，不满意拒了。

这里也是温馨提醒大家一点，投简历的时候一定要放得开，像影石这种公司其实也有 Java 后端开发岗位的。

我去他们官网看了一下，Java 后端开发的 JD 要求如下（社招岗），非常传统，基本上就是我一直给大家强调的 Java 后端四大件（Java 基础、MySQL、Redis、Spring 全家桶），外加一些分布式和设计模式的经验。

![](https://cdn.tobebetterjavaer.com/stutymore/yingshizhexinzizhuoshilingrenzeshe7321-image5200.png)

后面我会详细分享微服务项目 PmHub 的学习路线，代码是在 GitHub 上开源的。

>GitHub 地址：https://github.com/laigeoffer/pmhub

![](https://cdn.tobebetterjavaer.com/stutymore/yingshizhexinzizhuoshilingrenzeshe6561-image2920.png)

对于打算年后跳槽的工作党来说，确实也可以尝试一下这种非传统 Java 后端开发的科技新贵。

对于 26 届的同学来说，一定要把握好接下来这段时间，除了等着捡漏，也要多去看看别的公司。

从我收集到的信息来看，秋招下半场才开始招聘的公司还是蛮多的。

![](https://cdn.tobebetterjavaer.com/stutymore/yingshizhexinzizhuoshilingrenzeshe-image.png)

一定要调整好心态，按照自己的节奏微步前进！

之前给大家分享了技术派和派聪明 RAG 项目的学习路线，很多同学都表示太受用了。

今天再给大家分享一下[微服务 PmHub ](https://mp.weixin.qq.com/s/NIoYQbvBWI73xKqzBnBR4w)的学习路线。你可以套用到任何一个开源的项目上去。

## 第一阶段，让项目跑起来

第一步别想太多，先让系统跑起来。你要做的就是让它能启动、能登录、能点几下不报错。

先准备好环境：JDK、Maven、Docker，一个都不能少。

![](https://cdn.tobebetterjavaer.com/stutymore/yingshizhexinzizhuoshilingrenzeshe1479-image3104.png)

macOS 用户可以看这部分教程。

![](https://cdn.tobebetterjavaer.com/stutymore/yingshizhexinzizhuoshilingrenzeshe2347-image4032.png)

你可以按照传统的方式，一个一个安装前置环境，最好版本保持一致，微服务的很多坑就版本上。

当然你也可以执行 docker-compose，把 Nacos、Redis、MySQL、Seata 一键拉起来。Windows 用户看这部分教程。

![](https://cdn.tobebetterjavaer.com/stutymore/yingshizhexinzizhuoshilingrenzeshe2478-image7592.png)

数据库表也别忘了建，sql 目录里有初始化脚本，顺序执行就行。

![](https://cdn.tobebetterjavaer.com/stutymore/yingshizhexinzizhuoshilingrenzeshe8980-image7271.png)


然后去 Nacos 看配置，确认数据库和 Redis 的连接没问题。启动顺序建议是 Auth → System → Gateway → Project → Workflow。

前端进 pmhub-ui 执行 npm install && npm run dev，再打开浏览器试登录。能进系统，说明你已经跨过第一道门。

![](https://cdn.tobebetterjavaer.com/stutymore/yingshizhexinzizhuoshilingrenzeshe7140-image2839.png)

## 第二阶段，理解项目骨架

这一步重点是“看懂它怎么前后端通信的”，别钻细节。

![](https://cdn.tobebetterjavaer.com/stutymore/yingshizhexinzizhuoshilingrenzeshe1148-image3886.png)

这个阶段，重点看开篇词部分。

![](https://cdn.tobebetterjavaer.com/stutymore/yingshizhexinzizhuoshilingrenzeshe1186-image7568.png)

从 pmhub-gateway 开始，它是流量入口，也是权限、限流、跨域的防线。

![](https://cdn.tobebetterjavaer.com/stutymore/yingshizhexinzizhuoshilingrenzeshe1108-image9598.png)

配合实战篇去看，看完后要明白：为什么需要网关？它除了路由还能做什么？（提示：统一认证、限流、跨域）

然后看认证中心（pmhub-auth），理解登录、Token 生成和网关校验的全流程。

搞清楚请求是如何被 pmhub-auth 处理的？它是如何生成 Token 的？Token 生成后，后续请求是如何携带 Token，网关又是如何校验 Token 的？

接着看看服务间调用怎么搞的（pmhub-api），Feign 是如何跨服务调用的，为什么需要 FeignRequestInterceptor 来解决 Token 丢失。

可以先从系统模块（pmhub-system）下手，比如用户管理。顺着 Controller → Service → Mapper 看一遍调用链，理解一条请求是怎么落到数据库的。

接着研究项目管理模块（pmhub-project），这是 PmHub 的灵魂。挑一个功能，比如“创建项目”，看看它牵扯了哪些表、走了哪些逻辑。

![](https://cdn.tobebetterjavaer.com/stutymore/yingshizhexinzizhuoshilingrenzeshe1712-image2653.png)

再去看工作流模块（pmhub-workflow），打开 Flowable 的流程定义 XML，对照前端的流程图，搞清楚“发起审批”和“任务审批”的背后是怎么跑的。

## 第三阶段，准备面试

大概搞清楚 PmHub 的业务和架构后，就可以着手去写简历了，可以参考这个例子。

![](https://cdn.tobebetterjavaer.com/stutymore/yingshizhexinzizhuoshilingrenzeshe2217-image6466.png)

完整版我放在了这个帖子里 `https://t.zsxq.com/C98g5` 可以挑自己感兴趣的写到简历上。

然后对照面试篇的内容去看，重点掌握 Gateway、TTL、Docker compose、Redis 分布式锁、SkyWalking、lua 脚本+AOP、Sentinel+OpenFeign、Seata 事务一致性、RocketMQ 消息队列、缓存和数据库一致性等微服务着重考察的点。

![](https://cdn.tobebetterjavaer.com/stutymore/yingshizhexinzizhuoshilingrenzeshe4516-image4768.png)

## 第四阶段，为期一个月冲刺

接下来，我再给大家制定一个为期一个月的冲刺计划，当然你可以根据自身的能力做调整，压缩到一周或者扩展到两个月。

### 第 1 周：环境搭建 & 架构认知（从 0 到跑起来）

**学习目标**：熟悉项目整体架构，完成本地启动，理解模块划分和技术栈选型。

| 模块 | 教程 | 学习重点 |
|------|------|-----------|
| 新人入门 | [✅小白如何学习 PmHub（🌟新人必看）](https://www.yuque.com/canghe-u0ocv/laigeoffer-pmhub/rgmpz6p0nk422wbw)<br>[✅PmHub 架构及功能概览](https://www.yuque.com/canghe-u0ocv/laigeoffer-pmhub/olwhnsmirmhzhhwx)<br>[✅PmHub 技术选型与设计](https://www.yuque.com/canghe-u0ocv/laigeoffer-pmhub/zxhphttl8xl2gip6)<br>[✅PmHub 架构方案设计](https://www.yuque.com/canghe-u0ocv/laigeoffer-pmhub/ah8kok7o5iuvbwn1) | 理解单体与微服务架构、模块职责、组件间关系 |
| 环境搭建 | [✅PmHub环境搭建和本地启动说明](https://www.yuque.com/canghe-u0ocv/laigeoffer-pmhub/ei61n5k3o9gcqfxq)<br>[PmHub搭建 MySQL 环境](https://www.yuque.com/canghe-u0ocv/laigeoffer-pmhub/cl8luh6bz5ql87nk)<br>[✅PmHub搭建Redis环境](https://www.yuque.com/canghe-u0ocv/laigeoffer-pmhub/wt31t5h51l9zhytx)<br>[✅PmHub 搭建 Nacos 环境](https://www.yuque.com/canghe-u0ocv/laigeoffer-pmhub/wbnm3ysyixv80dsc)<br>[✅PmHub搭建Sentinel环境](https://www.yuque.com/canghe-u0ocv/laigeoffer-pmhub/xkft36y6nqwm8f85) | 搭建数据库、Redis、Nacos、Sentinel 本地运行环境 |
| 编码规范 | [✅PmHub架构师必备编码规范](https://www.yuque.com/canghe-u0ocv/laigeoffer-pmhub/ys3ze4l21urawk6i) | 学习代码规范、统一风格和异常处理模式 |

**✅ 周目标产出**
- 本地启动成功，服务能正常注册到 Nacos  
- 理解核心模块关系与依赖（gateway、auth、biz、common 等）  
- 熟悉项目配置文件、日志输出与运行日志定位  

### 第 2 周：微服务核心机制（从会跑到能改）

**学习目标**：深入理解 Spring Cloud 体系，掌握服务注册、熔断、配置中心与接口调用。

| 模块 | 教程 | 学习重点 |
|------|------|-----------|
| 服务注册与发现 | [✅PmHub 搭建 Nacos 环境](https://www.yuque.com/canghe-u0ocv/laigeoffer-pmhub/wbnm3ysyixv80dsc) | 理解服务注册与动态配置刷新 |
| 熔断限流 | [✅PmHub搭建Sentinel环境](https://www.yuque.com/canghe-u0ocv/laigeoffer-pmhub/xkft36y6nqwm8f85) | 掌握流控规则、熔断策略与监控面板使用 |
| 消息驱动 | [✅PmHub搭建RocketMQ环境](https://www.yuque.com/canghe-u0ocv/laigeoffer-pmhub/kqmnatuixpoa4d8p) | 理解消息队列在异步与解耦中的作用 |
| 动态刷新配置 | [✅PmHub自定义配置注入&动态刷新](https://www.yuque.com/itwanger/az7yww/oobmcdkym1232f6k) | 实现 Nacos 配置热更新与灰度配置 |
| 日志与事件 | [✅PmHub日志链路追踪 & SkyWalking](https://www.yuque.com/canghe-u0ocv/laigeoffer-pmhub/bxpms6wo9qf07gt5) | 搭建 SkyWalking，实现链路追踪与性能分析 |

**✅ 周目标产出**
- 能在本地启动多个服务并通过 Nacos 注册发现  
- 实现接口限流与熔断保护  
- 能理解异步解耦在系统稳定性中的作用  
- 通过 SkyWalking 观察服务调用链  

### 第 3 周：部署运维与中间件（从能改到能上线）

**学习目标**：掌握容器化、部署流程、CI/CD 流程和监控预警。

| 模块 | 教程 | 学习重点 |
|------|------|-----------|
| Docker 容器化 | [✅PmHub搭建Docker环境](https://www.yuque.com/canghe-u0ocv/laigeoffer-pmhub/sxftnr6xqk09v07m) | 学习 Dockerfile 构建、Compose 启动 |
| 持续集成 | ✅PmHub CI/CD 流程配置（未完成）| 了解 GitHub Actions 或 Jenkins 自动化部署 |
| 应用监控 | [✅PmHub搭建SkyWalking环境](https://www.yuque.com/canghe-u0ocv/laigeoffer-pmhub/bxpms6wo9qf07gt5)<br>[✅整合 Prometheus & Grafana 实现应用监控](https://www.yuque.com/itwanger/az7yww/vayxxydapbpgdgg2) | 掌握链路追踪与监控指标配置 |
| 性能压测 | [✅PmHub JMeter 接口压测实操](https://www.yuque.com/itwanger/az7yww/gnku2zsr9eeexihs) | 使用 JMeter 模拟高并发，评估系统瓶颈 |
| 部署实战 | 结合 `docker-compose.yml` 模板部署全链路 | 在本地或云服务器模拟生产环境 |

**✅ 周目标产出**
- 完成 Docker 容器部署  
- 了解日志收集、性能监控、服务监控指标  
- 能执行一次完整的压测并分析结果  

### 第 4 周：实战开发与项目总结（从能跑到能复刻）

**学习目标**：掌握业务模块设计，能独立开发功能、优化架构并写入简历。

| 模块 | 教程 | 学习重点 |
|------|------|-----------|
| 架构扩展与实战 | [✅PmHub 架构方案设计](https://www.yuque.com/canghe-u0ocv/laigeoffer-pmhub/ah8kok7o5iuvbwn1)<br>[✅PmHub 技术选型与设计](https://www.yuque.com/canghe-u0ocv/laigeoffer-pmhub/zxhphttl8xl2gip6) | 分析架构优势、瓶颈与扩展方向 |
| 项目优化 | 实现缓存、限流、异步消息等增强功能 | 综合应用 Redis、Sentinel、MQ、线程池 |
| 简历优化 | [✅如何将 PmHub 写入简历（🌟新人必看）](https://www.yuque.com/canghe-u0ocv/laigeoffer-pmhub/lgalyd4oo1ekkgn6) | 学会提炼项目亮点与量化成果 |
| 常见问题 | [📚PmHub常见问题 Q&A](https://www.yuque.com/canghe-u0ocv/laigeoffer-pmhub/gnis2du7cehzz21x) | 熟悉常见坑点与调试技巧 |
| 项目复盘 | 结合架构、部署、业务逻辑进行总结 | 输出完整复盘文档（架构图 + 流程图 + 学习心得） |

**✅ 周目标产出**
- 能独立开发一个模块并上线运行  
- 输出一份《PmHub 项目技术总结文档》  
- 更新简历项目描述，准备面试讲解稿  


### 学习节奏建议

| 周次 | 时间投入 | 学习重点 | 实践建议 |
|------|-----------|-----------|-----------|
| 第 1 周 | 每天 2~3 小时 | 环境搭建、架构认知 | 本地运行、查看日志 |
| 第 2 周 | 每天 3 小时 | 微服务通信、限流熔断 | 多模块联调 |
| 第 3 周 | 每天 3~4 小时 | 部署运维、监控压测 | 容器部署实战 |
| 第 4 周 | 每天 4 小时 | 实战开发、总结汇报 | 输出文档与项目复盘 |


### 最终收获
- 能完整从零搭建并部署 PmHub 全链路系统  
- 掌握企业级 Spring Cloud 架构思想  
- 理解服务注册、熔断、配置、限流、追踪、监控等关键机制  
- 有可展示、可讲解的项目经验可写入简历  

贴个喜报鼓励一下大家吧，也希望更多的同学能来给二哥报喜，缘分一场，让二哥也沾沾大家的光，😄

![](https://cdn.tobebetterjavaer.com/stutymore/biaoti2025nian11yue9ri1313-image5917.png)

冲！

