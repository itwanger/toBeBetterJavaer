**「Dubbo与ZooKeeper」**

Dubbo 是阿里巴巴开发的一套开源的技术框架，是一款高性能、轻量级的开源 Java RPC 框架。

**「用ZooKeeper做注册中心」**

在整个 Dubbo 框架的实现过程中，注册中心是其中最为关键的一点，它保证了整个 PRC 过程中服务对外的透明性。

而 Dubbo 的注册中心也是通过 ZooKeeper 来实现的。

如下图所示，在整个 Dubbo 服务的启动过程中，服务提供者会在启动时向 `/dubbo/com.foo.BarService/providers`目录写入自己的 URL 地址，这个操作可以看作是一个 ZooKeeper 客户端在 ZooKeeper 服务器的数据模型上创建一个数据节点。

服务消费者在启动时订阅 `/dubbo/com.foo.BarService/providers` 目录下的提供者 URL 地址，并向 `/dubbo/com.foo.BarService/consumers` 目录写入自己的 URL 地址。

该操作是通过 ZooKeeper 服务器在 /consumers 节点路径下创建一个子数据节点，然后再在请求会话中发起对 /providers 节点的 watch 监控

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/zookeeper/shiyonganli-1.png)


**「Kafka与ZooKeeper」**

**「Zookeeper的作用」**

由于 Broker 服务器采用分布式集群的方式工作，那么在服务的运行过程中，难免出现某台机器因异常而关闭的状况。

为了保证整个 Kafka 集群的可用性，需要在系统中监控整个机器的运行情况。而 Kafka 可以通过 ZooKeeper 中的数据节点，将网络中机器的运行统计存储在数据模型中的 brokers 节点下。

在 Kafka 的 Topic 信息注册中也需要使用到 ZooKeeper ，在 Kafka 中同一个Topic 消息容器可以分成多个不同片，而这些分区既可以存在于一台 Broker 服务器中，也可以存在于不同的 Broker 服务器中。

而在 Kafka 集群中，每台 Broker 服务器又相对独立。

为了能够读取这些以分布式方式存储的分区信息，Kafka 会将这些分区信息在 Broker 服务器中的对应关系存储在 ZooKeeper 数据模型的 topic 节点上，每一个 topic 在 ZooKeeper 数据节点上都会以 `/brokers/topics/[topic]` 的形式存在。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/zookeeper/shiyonganli-2.png)



整理：沉默王二，戳[转载链接](https://mp.weixin.qq.com/s/-evZg0epRrOr1IwQ3GJ2Zg)，作者：月伴飞鱼，戳[原文链接](https://mp.weixin.qq.com/s/B2ngp0q5kdWsCNH8sw_5DA)。