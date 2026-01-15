---
title: RAG 项目派聪明 Go 语言重构版，AI 时代你值得拥有！
shortTitle: Go版RAG知识库派聪明
category:
  - 知识星球
tag:
  - 实战项目
---


大家好，我是二哥呀。

[派聪明 Java 版](https://javabetter.cn/zhishixingqiu/paismart.html)上线两个月以来，帮助很多球友拿到了称心如意的 offer。看到大家在星球里付出过那么多，有这样的好成绩，我是打心眼里高兴，甚至有一些骄傲和得意 😎。

RAG 这个 AI 项目是从 2025 年 3 月份开始着手做的，默默肝了 5 个月，8 月份和大家见面后口碑爆棚，感觉这一切的付出，都值得！

给大家晒一些成绩吧。

![](https://cdn.paicoding.com/paicoding/03b3016a1c6dc9659fbc7791bca55ccd.png)

![](https://cdn.paicoding.com/paicoding/2ad94e8464c1be3cd3b8fee947c2775c.png)

![](https://cdn.paicoding.com/paicoding/b1b3a12367cfc625311bd175774d49fe.png)

![](https://cdn.paicoding.com/paicoding/22b4c5e7b760f3be89315885438b9c16.png)

![](https://cdn.paicoding.com/paicoding/c460dcb29244ec470106763f48c1d087.png)

但这还不够！

因为有不少同学来找二哥的时候，希望也能推出 Go 相关的项目，最好是和 AI 相关的，那大家有需求，就必须满足！

![](https://cdn.paicoding.com/paicoding/b05a60f8d2999d7cf5364baa643d5ad6.png)

于是 Java 版的派聪明上线后，我们就开始猛肝 Go 版本了，整整两个多月的时间，终于搞定！


![Go 版本源码](https://cdn.paicoding.com/paicoding/2cbbe36701a374fd0f024235308f4839.png)


![Go版本的聊天助手 RAG](https://cdn.paicoding.com/paicoding/754665f76be3ff5b0a65b684377a4d1e.png)

>派聪明写到简历上的案例：[https://paicoding.com/column/10/2](https://paicoding.com/column/10/2)


![](https://cdn.paicoding.com/stutymore/README-20251027094034.png)


来看一下 Java 版和 Go 版的技术栈对比，Web 框架由 Spring 切换到了 Gin，ORM 框架由 JPA 切换到了 GORM，文档解析由 Apache Tika 切换到了 Tika Server，中文分词从 HanLP 切换到了 gojieba。

Redis、MinIO、Kafka、ElasticSearch、WebSocket 仍然保持不变，因为 Go 和 Java 都是可以通用的。

| 功能模块   | 原 Java 技术栈            | 现 Go 技术栈                 | 选型理由                                               |
| :--------- | :------------------------ | :--------------------------- | :----------------------------------------------------- |
| Web 框架   | Spring Web                | **Gin**                      | Go Web 开发的事实标准                                  |
| 数据库 ORM | Spring Data JPA           | **GORM**                     | 接近 JPA 的开发体验                                    |
| 安全认证   | Spring Security           | **自定义中间件 + jwt-go**    | 通过 Gin 中间件实现 JWT 校验                           |
| 缓存       | Spring Data Redis         | **go-redis/redis**           | 官方推荐的 Go Redis 客户端                             |
| 消息队列   | Spring Kafka              | **segmentio/kafka-go**       | 这是一个纯 Go 实现的客户端                             |
| 实时通信   | Spring WebSocket          | **gorilla/websocket**        | Go 社区最流行、最稳定的 WebSocket 库                   |
| 对象存储   | MinIO Java SDK            | **minio-go**                 | MinIO 官方 Go SDK                                      |
| 搜索引擎   | Elasticsearch Java Client | **elastic/go-elasticsearch** | Elasticsearch 官方 Go 客户端                           |
| 文档解析   | Apache Tika (内嵌库)      | **Tika Server (独立服务)**   | 通过将 Tika 作为独立服务并通过 HTTP 调用，实现服务解耦 |
| 中文分词   | HanLP                     | **固定窗口重叠分块**         | 为引入`gojieba`预留了接口                              |
| 配置管理   | application.yml           | **Viper**                    | 支持 YAML 等多种格式                                   |
| 日志       | Logback / SLF4j           | **Zap**                      | Uber 出品的高性能结构化日志库                          |
| 依赖注入   | Spring DI                 | **手动依赖注入**             | 在 `main.go` 中手动组装所有依赖。                      |

这也再次印证一个观点，Java 岗转 Go 岗不会特别痛苦，只需要把语法层面搞定，后续的工程能力其实是丝滑切换的。

目前所有教程都已经完结，包括开篇词、工程篇、大厂篇、面试篇、进阶篇，以及 Go 语言版本的相关教程。

![](https://cdn.paicoding.com/paicoding/3e5c348de0bd168f824f4537bed07594.png)

在此基础上，我们还为大家加餐了 Go 面试题的预测、Go 的学习路线，以及面渣逆袭 Go 篇，消除大家在求职 Go 岗时的所有顾虑。

![](https://cdn.paicoding.com/paicoding/1deb6bd3e53478489b7befdb6ea8f215.png)

后面我们还会推出 gopai + mydb + redigo + gingo 四个 Go 版本的实战项目，一站式帮大家补齐 Go 项目的缺憾。

![](https://cdn.paicoding.com/paicoding/59b57b452328f0503b165b5dc86a60f1.png)

看到这，就想冲这个项目同学可以直接扫下面的优惠券（或者长按自动识别），[星球](https://javabetter.cn/zhishixingqiu/)目前定价 159 元/年，优惠完只需要 129 元，每天不到 0.35 元，绝对的超值。

![](https://cdn.paicoding.com/paicoding/97601d7a337d7d944b02bb4a79cd6430.png)

**星球目前已经 10100+ 人了，等这个项目发布后就要涨价到 169 元/年，想上车的同学，请趁早**。

星球只有 100 多的门票，但帮助球友们拿到了包括【腾讯、阿里、蚂蚁、淘天、字节跳动、小红书、快手、京东、美团、华为、荣耀、拼多多、vivo、oppo、小米、携程、得物、深信服、传音控股、美的】等等各大公司的 offer。

![](https://cdn.paicoding.com/paicoding/b4dd5bc95fc81b52c453193b987c3b42.png)

![](https://cdn.paicoding.com/paicoding/caa26c647f26e805c87ea783cf2d5fe7.png)

![](https://cdn.paicoding.com/paicoding/cdf9d8faee78890fe2f19f60fcf917fe.png)

还有非常多非常多。。。我就不一一晒了，能帮助到这么多同学，打心眼里觉得付出的这一切都值了。

阿基米德说过一句话，给我一个支点和杠杆，我能翘起整个地球。套用过来就是，100 多块钱买张星球的门票，我能帮你拿下该死的 offer，不管是互联网大厂，还是银行国企。

绝对物超所值，比你去培训班花几万块钱都值，真心话。

因为你远比你认知中的自己要更优秀，**你只是缺一个学习路线，缺一个学习氛围，缺一个实战项目，缺一个简历修改，缺一个面经八股，缺一个点燃你学习激情的人**。

而我和我的合伙人，完全能做到这一切。

![](https://cdn.paicoding.com/paicoding/412c661107e0f4c7c1c434ca320c2e2c.jpeg)

## 一、派聪明的技术架构

整个项目遵循 **Go 官方推荐的目录规范**，核心代码与业务模块分层清晰，公共组件、接口定义、工具函数都可以独立管理。

```plain
paismart-go/
├── cmd/server/main.go    # 应用主入口：负责启动、依赖注入和组装
├── configs/              # 配置文件 (config.yaml)
├── deployments/          # Dockerfile, docker-compose.yml 等
├── internal/             # 核心业务代码
│   ├── config/           # 配置加载模块 (Viper)
│   ├── handler/          # HTTP 处理器 (Gin Handlers)
│   ├── middleware/       # HTTP 中间件 (认证、日志)
│   ├── model/            # 数据模型 (GORM Models, DTOs)
│   ├── pipeline/         # RAG 异步处理管道
│   ├── repository/       # 数据访问层 (DB, Redis, ES)
│   └── service/          # 核心业务逻辑层
├── pkg/                  # 公共、可复用的基础库
│   ├── database/         # 数据库连接 (GORM, go-redis)
│   ├── embedding/        # Embedding API 客户端
│   ├── es/               # Elasticsearch 客户端封装
│   ├── hash/             # 密码加密 (bcrypt)
│   ├── kafka/            # Kafka 客户端封装
│   ├── llm/              # LLM API 客户端
│   ├── log/              # 日志库封装 (Zap)
│   ├── storage/          # 对象存储客户端封装 (MinIO)
│   ├── tasks/            # Kafka 任务结构定义
│   ├── tika/             # Tika Server 客户端封装
│   └── token/            # JWT 工具
└── go.mod                # Go 模块依赖文件
```

Go 版本的源码这次仍然采用了 gitcode 的邀请制，申请方式我放到了知识星球的这个帖子中，复制链接到浏览器即可打开。

>[https://t.zsxq.com/1ilWe](https://t.zsxq.com/1ilWe)


![](https://cdn.paicoding.com/paicoding/713c073667887bf5ffcd310482d7d8d7.png)


看到一张图，和派聪明 RAG 知识库是比较吻合的，我直接贴出来，方便大家一睹为快。

![](https://cdn.paicoding.com/paicoding/b693e6e8cdc26e06a3f6665adb77142e.png)

底层大模型我们用的是 DeepSeek。上层的业务是，当你把企业私有的 Word、PDF、txt 丢给派聪明，他就会自动进行向量化处理，支持大文件的断点续传和分片上传，分片状态使用 Redis 的 BitMap 进行保存，文件本身通过 MinIO 进行存储。

![](https://cdn.paicoding.com/paicoding/05f0977e49e8074c72b6ffa55cf70d4e.png)

具体来说，系统会使用 Tika 从文档中提取出纯文本信息，然后将长文档智能切分成多个语义完整的文本块。

![](https://cdn.paicoding.com/paicoding/8542ea753e1d6857599c1c46c1d24f0f.png)

接下来调用阿里的 Embedding 模型，将文本块转换成 2048 维的向量表示，这些向量能够捕捉文本的深层语义信息。然后，会将所有的向量数据和原始文本存入到 Elasticsearch 中，形成一个强大的知识库索引。

```java
// 4c. 索引到 Elasticsearch
if err := es.IndexDocument(ctx, p.esCfg.IndexName, esDoc); err != nil {
    log.Errorf("[Processor] 索引分块 %d 到Elasticsearch失败, Error: %v", docVector.ChunkID, err)
    return fmt.Errorf("索引块 %d 到 Elasticsearch 失败: %w", docVector.ChunkID, err)
}
```

当用户提出问题后，派聪明会通过 ElasticSearch 进行混合检索：先进行语义的向量搜索，再进行关键词的精排。同时，会根据用户的组织权限，自动过滤出用户有权访问的文档内容。

![](https://cdn.paicoding.com/paicoding/35b8ad4235edfe235153a785b1934997.png)

之后，系统会将这些信息作为上下文，连同用户的问题一起发送给 DeepSeek。DeepSeek 会基于我们封装好的 Prompt，生成准确、相关的回答。整个对话过程采用流式输出，用户可以实时看到 AI 的回答过程，体验非常流畅。

## 二、为什么要学习派聪明？

在大模型席卷全球的今天，掌握 AI 工程化能力已成为学生党和工作党在求职中脱颖而出的关键。

**在阿里实习的球友直言，现在没有 RAG 简历都过不去**，有关 AI 大模型的项目现在真的非常吃香。并且部门的 HR 也说了，要招聘懂点大模型的人。

包括社招也是，一位球友靠[派聪明 RAG 这个项目](https://javabetter.cn/zhishixingqiu/paismart.html)拿下京东、美团和蚂蚁，base 给的都很高。

![](https://cdn.paicoding.com/paicoding/69c67d36a06531b00372582d9789192f.png)

这位拿到三家大厂 offer 的球友也直言，派聪明是转 AI 开发必备的项目。

### 你将收获的核心能力

- 端到端 RAG 实战：Tika 抽取 → 固定窗口重叠分块 → Embedding（OpenAI 兼容接口）→ ES KNN + BM25 混合检索 → 上下文拼装 → 流式回答
- Go 工程化：Gin 分层（handler/service/repository）、Viper 配置、Zap 结构化日志、优雅停机
- 文件存储：分片上传（Redis 断点续传）、MinIO 单分片 Copy/多分片 Compose 合并、合并后后台清理
- 异步解耦：Kafka 任务派发/消费、失败次数阈值控制（Redis 计数）、处理器接口化（TaskProcessor）
- 多租户与权限：JWT+基于 `org_tag` 的向上聚合，检索阶段就做“最小可见性”过滤（本人/公开/组织标签）
- 实时交互：Gorilla WebSocket 流式输出与“停止指令”中断、错误统一回包与完成事件

我相信，Go 版派聪明这个项目一定能解决大家的燃眉之急；我也相信，大家会在接下来的求职当中大展拳脚（Java 版已经证实了这一点）。

![](https://cdn.paicoding.com/paicoding/48d290873522ac06a5fdc017c5751695.png)

星球已经有了前后端分离项目技术派（里面也有 AI 的聊天对话服务），还有微服务项目 PmHub，以及轮子项目 mydb、涉及到 Spring AI 和 Agent 的校招派（同时进行的另外一个项目）等，教程和源码的获取方式可以查看 👉 星球的第一个置顶帖球友必看。

>复制到浏览器打开：[https://t.zsxq.com/91hPx](https://t.zsxq.com/91hPx)

![](https://cdn.paicoding.com/paicoding/047197ef09311d1be141530cbb5ab502.png)

派聪明主打的技术栈和以上这些项目的技术栈也是完全不重叠的，尤其是 RAG 涉及到的一系列 AI 相关的内容，会让大家在 AI 时代吃进红利。

来看看每篇教程的字数吧，RAG 面试题 31 道，一共 10271 字，还有我亲自负责的手绘图；架构设计篇 25 道面试题，一共 11277 字，市面上能做到这种程度的教程，我敢拍着胸脯说，绝对对得起 100 多块钱的门票。

>[https://paicoding.com/column/10/19](https://paicoding.com/column/10/19)

![](https://cdn.paicoding.com/paicoding/8d169e23a5d349708c70ed5c17633e6c.jpg)

![](https://cdn.paicoding.com/paicoding/262b318558d90e9a3e5a0110db1b6a94.png)

看到这就想迫不及待地解锁派聪明源码和教程的同学，请扫下面的优惠券（或者长按自动识别）加入我们吧，[星球](https://javabetter.cn/zhishixingqiu/)目前定价 159 元/年（会马上涨价至 169 元），优惠完只需要 129 元，每天不到 0.35 元，绝对的超值。

![](https://cdn.paicoding.com/paicoding/97601d7a337d7d944b02bb4a79cd6430.png)

超超超低价给到大家，你去其他机构/社群对比一下，这种硬核的教程和源码最起码要价 1999 元，我们现在只要一百多，为的就是尽量减轻大家的钱包负担，我希望用自己最大的诚意，去俘获大家发自内心的口碑。

![](https://cdn.paicoding.com/paicoding/378ea370a2f7a378835c50988ba53014.png)

## 三、如何给面试官介绍派聪明？

答：

派聪明作为一个基于 RAG 架构的企业级 AI 知识库系统，其核心意义在于解决现代企业知识库管理的痛点，推动组织智能化转型。

![](https://cdn.paicoding.com/paicoding/6cc46aa009c03e9a4c04adbf79ad8772.png)

Go 版本派聪明通过集成 Tika 文档解析、阿里 Embedding 向量模型、Elasticsearch 混合检索技术和 DeepSeek API，构建了一套完整的智能知识处理流水线。

系统能够自动解析 Word、PDF、TXT 等文档，将非结构化信息转化为可检索的知识资产。更重要的是，基于语义理解的向量检索技术突破了传统关键词匹配的局限，用户通过自然语言描述就能够获得要检索的相关内容。

![](https://cdn.paicoding.com/paicoding/27295a1412addf313a9be871381a385b.png)

与依赖预训练的模型不同，RAG 能够实时检索最新的企业内部知识，避免模型幻觉，保持回答的准确性。除此之外，派聪明还实现了细粒度的多租户权限控制，确保不同部门和层级的用户只能访问授权范围内的知识。

## 四、派聪明提供了哪些大模型开发经验？

### 01、RAG

派聪明最核心的能力就是 RAG，下一个项目校招派（快完结）已经增加了 MCP 和 Agent 能力，可以说覆盖了整个大模型应用开发的落地经验，并且我们会围绕 RAG 把 AI 相关的一些高频面试题全部讲透。

>[https://paicoding.com/column/10/25](https://paicoding.com/column/10/25)


![](https://cdn.paicoding.com/paicoding/6d5a857ced065c1fd705f8cbf80f8a2c.png)


### 02、文档上传和解析

- 如何上传文档？包括断点续传和分片上传。
- 如何将用户上传的文档转化为可检索的语义向量？
- 如何通过 ElasticSearch 实现混合检索，包括关键词搜索与语义搜索？

都是 RAG 非常核心的内容模块。

传统的数据库内容查询主要依赖“关键字匹配”，比如说 MySQL 经常用到的 `like xxx%`，这种对查询的精确度要求很高，假如我们查询的是“如何提供编程技术”，那么数据库只有“Java、Python 等编程语言的教程”，那么就无法搜索到任何内容。

但向量数据库就可以有效解决这个问题，它会把各种知识都转成一组组 vector，这些 vector 可以代表知识的内容和特点，当我们在 RAG 知识库中输入要查找的信息时，系统能将输入信息也转成一组组数据，然后找出最相关的知识，从而实现“语义检索”。

![](https://cdn.paicoding.com/paicoding/8d53a234c2e8cf4be0d8189d49950ce2.png)

那基于向量知识库的语义检索，虽然解决了传统关键词匹配的局限性，但显然关键词搜索这种场景还是需要的，所以派聪明兼具了关键词检索和语义检索两种能力。

![](https://cdn.paicoding.com/paicoding/ab8396ec99cdd47ffb948325ee43e666.png)

### 03、集成 DeepSeek 和阿里 Embedding

集成大模型 API 的工程实践，比如说如何集成 DeepSeek，实现流式响应与多轮对话？

- 如何集成阿里 Embedding 进行文档分块的语义转化？
- 再比如说如何通过 WebSocket 实现实时通信，逐步推送生成内容？
- 如何通过 Redis 实现的多轮的对话记忆？

都是 AI 时代非常关键的技术能力。那除了调用 DeepSeek API，我们还支持本地私有的 DeepSeek R1 模型部署。

## 五、提供了哪些企业技术栈？

### 01、Go 1.23+Gin 框架+GORM

Go 语言作为后端开发的核心。main.go 文件作为应用的入口，负责初始化所有依赖项并启动 HTTP 服务器。

Gin 是一个用 Go 编写的高性能 HTTP Web 框架。在派聪明项目中，Gin 被用于构建 RESTful API，处理所有 HTTP 请求。internal/handler 目录下的各个处理器都基于 Gin 编写，负责接收请求、调用业务逻辑并返回响应。

GORM 是 Go 语言中最流行的 ORM 库。在派聪明中，GORM 被用于与 MySQL 数据库交互，执行 CRUD 操作。

![](https://cdn.paicoding.com/paicoding/43f0351b8f97db8fea766a9a9c820685.png)

### 02、Kafka+Redis+MinIO

Redis 的八股就不用多说了，有面渣逆袭 Redis 篇。

>复制到浏览器打开：[https://javabetter.cn/sidebar/sanfene/redis.html](https://javabetter.cn/sidebar/sanfene/redis.html)


![](https://cdn.paicoding.com/paicoding/2d11cceafbf82b67a12049963b23eb21.png)


技术派和 PmHub 中都没有用 Kafka，用的的 RabbitMQ 和 RocketMQ，这次把消息队列中的 Kafka 直接补齐，从此以后再也不用担心 MQ 没有落地经验了（齐活）。

![](https://cdn.paicoding.com/paicoding/6ae6bcc09105a73a8711fa61b2bfcc05.png)

MinIO 的话，在处理文件的时候也经常用到，[编程喵当时有讲到](https://www.yuque.com/itwanger/vn4p17/ta5vr1)，但技术派和 PmHub 中都没有应用，这次派聪明我们也一并补齐了。

### 03、ElasticSearch

集成 Elasticsearch，实现「关键词+语义」的双引擎搜索。目前已经通过 ES 的 bool should 查询实现了关键词+语义的搜索方式。

![](https://cdn.paicoding.com/paicoding/1f1015eb8801ad5edbb71ea6b13767b0.png)

### 04、Vue 3+TypeScript+Vite

派聪明全面采用了 Vue 3 的 Composition API，技术派当时用的是 React，等于说前端的三驾马车就只剩下了 Angular。

![](https://cdn.paicoding.com/paicoding/019d7cdded144f2169256e473ce0431d.png)

整个前端采用了 Monorepo 架构，在 frontend/packages 目录下组织了多个独立的功能包，包括 axios 封装、颜色工具、hooks 库、UI 组件、工具函数等。特别值得关注的是 index.ts 中的 HTTP 客户端封装，项目基于 axios 实现了企业级的请求库，支持请求/响应拦截、错误处理、请求取消、重试机制等高级功能。

![](https://cdn.paicoding.com/paicoding/5457a9a50ebcb68a7f81c40a396ac305.png)

### 05、JWT+RBAC

用户系统的架构采用分层设计，确保了各层之间的职责分离。后端服务通过 Gin 框架处理 HTTP 请求，使用 JWT 进行认证，bcrypt 进行密码加密存储。前端应用通过 API 与后端交互，实现了用户界面和功能。

![](https://cdn.paicoding.com/paicoding/6de5d6262cc733ad59359395fa282c57.png)

派聪明的多租户权限控制设计了三个层级，非常贴合企业的实际需求。第一层是私人空间权限，以“PRIVATE\_”前缀标识的组织标签，只有资源的创建者才能访问，保证用户个人数据的绝对安全。第二层是组织权限，同一个组织标签下的用户可以共享资源，满足团队协作的需求。第三层是公开权限，标记为公开的资源所有用户都能访问，适用于公司公告、共享文档等场景。

![](https://cdn.paicoding.com/paicoding/cda9a817ecda87a5a609986fd9008401.png)

### 06、Mockito+TDD

项目采用了 Mockito 注解驱动的测试模式，践行测试驱动开发（TDD）的理念，每个业务功能都有对应的测试用例，包括正常流程和异常流程。通过 `@Mock` 注解创建模拟对象，比如 UserRepository，这样就不需要真实的数据库连接，`@InjectMocks` 注解则自动将模拟对象注入到被测试的服务类当中，这种依赖注入的方式让测试变得非常干净和独立。

![](https://cdn.paicoding.com/paicoding/e2adadd787040c8dcbab4750ec75efe7.png)

### 07、汇总一下

- Go 1.23+、模块化目录：`cmd/` `internal/` `pkg/`；分层：`handler/service/repository`
- 配置/日志/关停：Viper、Zap（结构化日志）、Gin + Context 优雅停机
- Gin（路由分组/中间件）、Gorilla WebSocket（双向通信、增量写出、停止指令）
- JWT（access/refresh）、基于 `org_tag` 的层级聚合，检索期过滤（should + minimum_should_match）
- MySQL 8 + GORM（文件/分片/向量等元数据持久化）、Redis 7（分片进度与重试计数）
- MinIO：分片对象存储；单分片 Copy、多分片 Compose；合并后后台清理分片对象
- Kafka（segmentio/kafka-go）：生产/消费、失败阈值重试、手动提交 offset
- 任务解耦：`TaskProcessor` 接口承载解析/向量化/索引流水线
- Apache Tika（HTTP 服务）：PDF/DOCX/PPT/XLS 等文本抽取
- 分块策略：固定窗口 + 重叠切分（提升语义覆盖）
- Elasticsearch 8：KNN 语义召回 + BM25 rescore + 短语兜底 should；索引含 `userId/orgTag/isPublic`
- Embedding：OpenAI 兼容协议，已适配 DashScope（维度 2048 可配）
- LLM：DeepSeek Chat 流式；可按同协议切换本地 Ollama
- Docker 容器化：一键拉起 MySQL/Redis/ES/Kafka/MinIO/Tika
- 集中管理 LLM/Embedding/ES 等参数

## 六、解锁派聪明源码+教程

那这次为了避免盗版，这次的代码仓库采用的是邀请制，加入星球后，在星球第一个置顶帖【球友必看】中获取邀请链接，审核通过后即可查看。

>派聪明源码申请方式：[https://t.zsxq.com/1ilWe](https://t.zsxq.com/1ilWe)

![](https://cdn.paicoding.com/paicoding/0abd7b441b744b33d48277be776e58cc.png)

派聪明的教程，这次托管在技术派教程上，之前只要在技术派上绑定过星球的成员编号，均可以解锁查看。

> 派聪明教程地址：[https://paicoding.com/column/10/1](https://paicoding.com/column/10/1)

![](https://cdn.paicoding.com/paicoding/9d395b7d05c72cff23e5a45ce22009f5.png)

并且了照顾大家的阅读习惯，我们也会在星球里第一时间同步。

![](https://cdn.paicoding.com/paicoding/d2c867d82d57ef1560fed6267eb02590.png)

加入[「二哥的编程星球」](https://javabetter.cn/zhishixingqiu/)后，你还可以享受以下专属内容服务：

- 1、**付费文档:** [派聪明 RAG Java 版](https://javabetter.cn/zhishixingqiu/paismart.html)、[微服务 PmHub](https://javabetter.cn/zhishixingqiu/pmhub.html)、[前后端分离技术派](https://javabetter.cn/zhishixingqiu/paicoding.html)、轮子 MYDB、入门编程喵、AI+MCP 的校招派等项目配套的 60 万+ 字教程查看权限
- 2、**简历修改**: 提供价值超 600 元的[简历修改服务](https://javabetter.cn/zhishixingqiu/jianli.html)，附赠星球 5000+优质简历模板可供参考
- 3、**专属问答**: 向二哥和星球嘉宾发起 1v1 提问，内容不限于 offer 选择、学习路线、职业规划等
- 4、**面试指南**: 获取针对校招、社招的 40 万+字面试求职攻略《[Java 面试指南](https://javabetter.cn/zhishixingqiu/mianshi.html)》，以及二哥的 LeetCode 刷题笔记、一灰的职场进阶之路、华为 OD 题库
- 5、**学习环境:** 打造一个沉浸式的学习环境，有一种高考冲刺、大学考研的氛围

截止到 2025 年 10 月 27 日，已经有 10100+ 球友加入星球了，很多小伙伴在认真学习项目之后，都成功拿到了心仪的校招或者社招 offer，我就随便举两个例子。

![](https://cdn.paicoding.com/stutymore/readme-20250703180225.png)

![](https://cdn.paicoding.com/stutymore/readme-20250703180738.png)

目前，派聪明这个项目也收尾了，大家可以放心冲 😊。并且一次购买不需要额外付费，即可获取星球的所有付费资料，帮助你少走弯路，提高学习的效率。直接微信扫下面这个优惠券即可加入。

![](https://cdn.paicoding.com/paicoding/97601d7a337d7d944b02bb4a79cd6430.png)

> 步骤 ①：微信扫描上方二维码，点击「加入知识星球」按钮

> 步骤 ②：访问星球置顶帖球友必看：[https://t.zsxq.com/11rEo9Pdu](https://t.zsxq.com/11rEo9Pdu)，获取项目的源码和配套教程

加入星球需要多少钱呢？星球目前定价 159 元，限时优惠 30 元，目前只需要 129 元就可以加入。

0 人的时候优惠完 69 元，1000 人的时候 79 元，2000 人的时候 89 元，3000 人的时候 99 元，5000 人的时候是 119 元，后面肯定还会继续涨。

付费社群我加入了很多，但从未见过比这更低价格，提供更多服务的社群，光派聪明这个项目的就能让你值回票价。

多说一句，任何时候，技术都是我们程序员的安身立命之本，如果你能认认真真跟完派聪明的源码和教程，相信你的编程功底会提升一大截。

再给大家展示一下派聪明教程的部分目录吧，真的是满满的诚意和干货。

![](https://cdn.paicoding.com/paicoding/35ac73adcadd56af0a4979e2a179f9e8.png)

![](https://cdn.paicoding.com/paicoding/da618bae0c5b934a3f49c8461a2e8db2.png)

![](https://cdn.paicoding.com/paicoding/1e5e0055300a70a4cb83791f889bec20.png)

之前就有球友反馈说，“**二哥，你这套教程如果让培训机构来卖，1999 元都算少！**

讲真心话，这个价格也不会持续很久，星球已经 10000 人了，马上会迎来一波新的涨价（169 元），所以早买早享受，不要等，想好了就去冲，错过不能说后悔一辈子，但至少会有遗憾。

![](https://cdn.paicoding.com/stutymore/readme-20250106103555.png)

我们的代码，严格按照大厂的标准来，无论是整体的架构，还是具体的细节，都是无可挑剔的学习对象。

![](https://cdn.paicoding.com/paicoding/29714395fbc1a5420df271b77fd74fc5.png)

之前曾有球友问我：“二哥，你的星球怎么不定价 199、299、399 啊，我感觉星球提供的价值远超这个价格啊。”

答案很明确，我有自己的原则，**拒绝割韭菜，用心做内容，能帮一个是一个**。

![](https://cdn.paicoding.com/paicoding/e946bb63f1fe5279888bb7f1fcb649b0.png)

不为别的，为的就是给所有人提供一个可持续的学习环境。当然了，随着人数的增多，二哥付出的精力越来越多，星球也会涨价，今天这批 30 元的优惠券不仅 2025 年最大的优惠力度，也是 2026 年最大的优惠力度，现在入手就是最划算的，再犹豫就只能等着涨价了。

想想，QQ 音乐听歌连续包年需要 **88 元**，腾讯视频连续包年需要 **178 元**，腾讯体育包年 **233 元**。我相信，二哥编程星球回馈给你的，将是 10 倍甚至百倍的价值。

最后，希望同学们，能紧跟我们的步伐！不要掉队。今年，和二哥一起翻身、一起逆袭、一起晋升、一起拿高薪 offer！

那无论你是社招还是校招，我们都希望你通过派聪明这个项目，能提升自己的简历含金量，拿到更好的 offer，也能更加从容的应对面试中各种 AI 相关的考察。

冲。
