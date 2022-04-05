# Java企业级开发

> [!TIP]
>  - **到底能不能成为一名合格的 Java 程序员，从理论走向实战？Java 企业级开发这部分内容就是一个分水岭**！
>  - Java 企业级开发这部分可以分为工具篇、框架篇、安全篇、分布式、高性能、高可用和实战篇等等。
>  - 纸上得来终觉浅，须知此事要躬行。


## 基建篇

### Maven

> [!ATTENTION]
>  Maven 是一个项目管理工具，可以对 Java 项目进行构建、依赖管理。

- [手把手教你安装、配置、使用 Maven](docs/maven/maven.md)
- [守护版 Maven 来了！！！性能提升 300%](docs/maven/mvnd.md)


### Git

> [!ATTENTION]
>  Git 是 Linus Torvalds 为了帮助管理 Linux 内核而开发的一个开源的版本控制软件，绝大多数项目源码和文档都会采用 Git 来进行版本控制。

- [可能是 Git 历史上最伟大的一次代码提交](docs/git/git-qiyuan.md)
- [终于有人把 Git 的数据模型讲清楚了](docs/git/shujujiegou.md)
- [昨晚看完 Linus 第一次提交的 Git 代码后，我失眠了！](docs/git/neibushixian.md)
- [要熟练使用 Git，恐怕要记住这60个命令](docs/git/mingling.md)
- [崩溃！实习生把小组的代码仓库搞得一团糟。。。](docs/git/jibenshiyong.md)
- [信不信，7 张图就能让你把 Git 分支管理拿捏的死死的。。](docs/git/fenzhi.md)
- [一条 Git 命令减少了一半存储空间，我的服务器在偷着笑](docs/git/sparse-checkout.md)
- [摸清 Git 的门路，就靠这 22 张图](https://mp.weixin.qq.com/s/lY79hI7URuFh3gD9DJKInQ)
- [保姆级Git入门教程](https://mp.weixin.qq.com/s/Z766Egape2QicYndsQjZ4g)

### Nginx

> [!ATTENTION]
>  Nginx是一款轻量级的 Web 服务器/反向代理服务器，占有内存少，并发能力强。

- [Nginx 入门教程，敲简单，10 分钟搞定](docs/nginx/nginx.md)

### 日志服务

> [!ATTENTION]
>  日志是生产环境不可缺少的产物，能够为线上服务提供快速记录、定位、排查问题的来源。

- [Logback这样配置，性能提升10倍！](https://mp.weixin.qq.com/s/dO1dYAHwyB-81L1z3D_sdg)
- [高性能日志记录工具 Log4j 2](https://mp.weixin.qq.com/s/CHoA-WF-ONo9nVJb9dzJWw)
- [老板下了死命令，要把日志系统切换到Logback](https://mp.weixin.qq.com/s/mm0OYM-raVBi2KwK_QK21g)
- [为什么阿里巴巴开发手册强制使用SLF4J作为门面担当？](https://mp.weixin.qq.com/s/EhKf1rHWL-QII0f6eo0uVA)
- [打印日志竟然只晓得 Log4j？](https://mp.weixin.qq.com/s/AXgNnJe8djD901EmhFkWUg)

## 工具篇

### Intellij IDEA

> [!ATTENTION]
>  业界公认的最好的 Java 基础开发环境。

- [阅读源码必备的4个 IDEA 高级调试技巧](https://mp.weixin.qq.com/s/KG0yzb_9XhhTSzjHr4DkIQ)


### 辅助工具

> [!ATTENTION]
>  一些可以提高工作效率的工具，甚至可以替代付费工具。

- [再见Postman！推荐一款更适合国人的接口管理工具ApiPost！](https://mp.weixin.qq.com/s/ZgkNQsve_vq6Xq0_gnWHCw)
- [再见了VMware，推荐一款更轻量级的虚拟机Multipass！](https://mp.weixin.qq.com/s/gy6dVHvNy495bqov6JOAdA)
- [再见了Swagger，推荐七款可以替代的在线文档生成神器](https://mp.weixin.qq.com/s/tEwVadscpaUI5uR6aiTZkQ)
- [干掉visio，这款在线的画图神器 drwa.io 真的绝了！！！](https://mp.weixin.qq.com/s/EaGCe4GRG2C-0zuVxWxl5A)
- [干掉 Xshell？Tabby这款开源的终端工具逼格更高！](docs/gongju/tabby.md)
- [干掉PowerDesigner，这款开源数据库设计神器chiner真的绝了](docs/gongju/chiner.md)
- [再见收费的Navicat！操作所有数据库就靠它了！](docs/gongju/DBeaver.md)
- [JUnit：别再用 main 方法测试了，好吗？](https://mp.weixin.qq.com/s/rgOPzpOYUEXHQhUNcOH98w)
- [fastjson：差点被几个漏洞毁了一世英名](https://mp.weixin.qq.com/s/TsIHRTOyF2_4oNb1APfZ6Q)
- [Gson：我爸是 Google](https://mp.weixin.qq.com/s/pc72TlPUmXCrvQkcH7yAdQ)
- [Jackson，最牛掰的 Java JSON 解析器](https://mp.weixin.qq.com/s/e94E2FquEzjmXSlHRA8Qzw)


## 框架篇

### SpringBoot

> [!ATTENTION]
>  SpringBoot 不仅继承了Spring框架原有的优秀特性，而且还通过简化配置来进一步简化了Spring应用的整个搭建和开发过程。另外SpringBoot通过集成大量的框架使得依赖包的版本冲突，以及引用的不稳定性等问题得到了很好的解决。

- [一分钟快速搭建 Spring Boot 项目](docs/springboot/initializr.md)
- [基于SpringBoot 的CMS系统，拿去开发企业官网真香](https://mp.weixin.qq.com/s/HWTVu7E62VkaH2anQc1J_g)
- [Spring Boot为什么不需要额外安装Tomcat？](docs/springboot/tomcat.md)
- [Spring Boot 3.0 M1 发布，正式弃用 Java 8](https://mp.weixin.qq.com/s/FmRyF6RcCodb8vUBem8dAA)
- [Spring Boot AOP 扫盲，实现接口访问的统一日志记录](docs/springboot/aop-log.md)
- [前后端分离项目，如何解决跨域问题？](docs/springboot/cors.md)
- [没想到，Session竟然被一个叫JWT的家伙干掉了！](docs/springboot/jwt.md)
- [在 Spring Boot 中使用 HikariCP 连接池](https://mp.weixin.qq.com/s/9R3U4-Uzg3eaXJS20izS9A)


### Spring

- [Spring事务失效的12个场景我全碰到过，太巧了！](https://mp.weixin.qq.com/s/qoWlR4ohVMfZf8IlhdSQDQ)
- [一分钟带你玩转 Spring IoC](https://mp.weixin.qq.com/s/CcL3cEcQRi-KhwTwmf5A0w)


## 安全篇

## 分布式

### Elasticsearch

- [Elasticsearch入门](https://mp.weixin.qq.com/s/ZjsZxle7m_dfmVwVkq2ayg)

### ZooKeeper

> [!ATTENTION]
>  ZooKeeper曾是Hadoop 的一个子项目，但现在是一个独立的顶级项目，为大型分布式计算提供开源的分布式配置服务、同步服务和命名注册。

- [基本介绍](docs/zookeeper/jibenjieshao.md)
- [数据模型](docs/zookeeper/shujumoxing.md)
- [数据存储](docs/zookeeper/shujucunchu.md)
- [Watch机制](docs/zookeeper/watch.md)
- [会话机制](docs/zookeeper/huihuajizhi.md)
- [ACL权限](docs/zookeeper/acl.md)
- [序列化方式](docs/zookeeper/xuliehua.md)
- [集群](docs/zookeeper/jiqun.md)
- [ZAB协议](docs/zookeeper/zab.md)
- [日志清理](docs/zookeeper/rizhiqingli.md)
- [实现分布式锁](docs/zookeeper/fenbushisuo.md)
- [实现分布式ID](docs/zookeeper/fenbushiid.md)
- [实现负载均衡](docs/zookeeper/fuzaijunheng.md)
- [开源框架使用案例](docs/zookeeper/shiyonganli.md)

## 高性能

### 消息队列

> [!ATTENTION]
>  消息队列是一种异步的服务间通信方式，适用于无服务器和微服务架构，用于分离重量级处理、缓冲或批处理工作以及缓解高峰期工作负载。

- [怎么确保消息 100% 不丢失？](docs/mq/100-budiushi.md)
- [RabbitMQ入门](https://mp.weixin.qq.com/s/CoK1PoGQ-ulQuj1Rejgccg)

## 高可用

## 实战篇

### 开源项目

> [!ATTENTION]
>  GitHub 上、码云上一些高 star 的优质项目推荐，优质的轮子极大地提高了开发效率。

- [EasyPoi实现Excel导入导出，好用到爆，POI可以扔掉了！](https://mp.weixin.qq.com/s/H2Bwc-7ghcjyaEnKUTQ5Dg)
- [SpringBoot 实现 Excel 导入导出，性能爆表，用起来够优雅！](https://mp.weixin.qq.com/s/Knb7b-uYLWsKZfgvGgN_ug)
- [再见丑陋的SwaggerUI，这款开源的API文档生成神器 knife4j 界面更炫酷，逼格更高！](docs/gongju/knife4j.md)
- [取代 Mybatis Generator，这款代码生成神器配置更简单，开发效率更高！](docs/kaiyuan/auto-generator.md)
- [HTTP 客户端框架 Forest](https://mp.weixin.qq.com/s/vw-Yaugb4McJA9w-RjWPpQ)

### 问题解析

> [!ATTENTION]
>  开发过程中遇到的一些典型问题，该如何解决？

- [Log4j2突发重大漏洞](docs/shigu/log4j2.md)
- [重现了一波 Log4j2 核弹级漏洞，同事的电脑沦为炮灰](https://mp.weixin.qq.com/s/zXzJVxRxMUnoyJs6_NojMQ)
- [生成订单30分钟未支付，则自动取消，该怎么实现？](https://mp.weixin.qq.com/s/J6jb_Dt3C49CIjYBTrN4gQ)
- [两天两夜，1M图片优化到100kb！](docs/shigu/image-yasuo.md)
- [内部群炸了锅，隔壁同事真删库了啊。。](https://mp.weixin.qq.com/s/lvyoN1gHCWhcPqudcjcRgQ)
- [B 站崩了](https://mp.weixin.qq.com/s/PfJe5rXednkXTq8EKT0xpw)
- [因为一个低级错误，生产数据库崩溃了将近半个小时](https://mp.weixin.qq.com/s/ec6u8WsPt7zJ0eul8sPEhg)
- [防止重复提交最简单的方案是什么？](https://mp.weixin.qq.com/s/n9AFMwQB9V_fq_sED1EWvg)

### 代码优化

- [49 个代码优化小技巧](https://mp.weixin.qq.com/s/ikfgfHunmlwR-43rd8LknQ)
- [不要用“ ! = null ”做判空了！](https://mp.weixin.qq.com/s/9EOTzZ2Qx3u8oTyghkVUEg)

### 性能调优

- [性能调优标准](https://mp.weixin.qq.com/s/vEt_ypvByKS-oCsuRmpgUw)