---
title: Kafka核心知识点大梳理
shortTitle: Kafka核心知识点
description: Apache Kafka是由LinkedIn采用Scala和Java开发的开源流处理软件平台，并捐赠给了Apache Software Foundation。该项目旨在提供统一的、高吞吐量、低延迟的平台来处理实时数据流。
author: 日常加油站
category:
  - 微信公众号
head:
---


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kafkahxzszj-03177674-8192-4e7e-a7e6-0d3593bd644e.jpg)

## 基本简介

Apache Kafka是由LinkedIn采用Scala和Java开发的开源流处理软件平台，并捐赠给了Apache Software Foundation。

该项目旨在提供统一的、高吞吐量、低延迟的平台来处理实时数据流。

Kafka可以通过Kafka Connect连接到外部系统，并提供了Kafka Streams。

**「Kafka的特性」**

Kafka是一种分布式的，基于发布/订阅的消息系统，主要特性如下：

| 特性   | 分布式 | **「高性能」** | **「持久性和扩展性」** |
| ------ | ------ | -------------- | ---------------------- |
| 描述   | 多分区 | 高吞吐量       | 数据可持久化           |
| 多副本 | 低延迟 | 容错性         |
|
多订阅者|高并发|支持水平在线扩展|
|
基于 ZooKeeper 调度|时间复杂度为 O(1)|消息自动平衡|
|

## 版本号

**「Kafka版本命名」**

我们在官网上下载Kafka时，会看到这样的版本：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kafkahxzszj-677e0f86-8d4f-4db6-95eb-8bbab6da937a.jpg)

前面的版本号是编译Kafka源代码的Scala编译器版本。

Kafka服务器端的代码完全由Scala语言编写，Scala同时支持面向对象编程和函数式编程，用Scala写成的源代码编译之后也是普通的`.class`文件，因此我们说Scala是JVM系的语言。

真正的Kafka版本号实际上是`2.1.1`。

> ❝
> 
> 那么这个2.1.1又表示什么呢？
> 
> ❞

前面的2表示大版本号，即Major Version；中间的1表示小版本号或次版本号，即Minor Version；最后的1表示修订版本号，也就是Patch号。

Kafka社区在发布1.0.0版本后写过一篇文章，宣布Kafka版本命名规则正式从4位演进到3位，比如0.11.0.0版本就是4位版本号。

有个建议，不论用的是哪个版本，都请尽量保持服务器端版本和客户端版本一致，否则你将损失很多Kafka为你提供的性能优化收益。

**「版本演进」**

0.7版本：只提供了最基础的消息队列功能。

0.8版本：引入了副本机制，至此kafka成为了一个整整意义上完备的分布式可靠消息队列解决方案

0.9.0.0版本：增加了基础的安全认证/权限功能；使用Java重新了新版本消费者API；引入了Kafka Connect组件。

0.11.0.0版本：提供了幂等性Producer API以及事务API；对Kafka消息格式做了重构。

1.0和2.0版本：主要还是Kafka Streams的各种改进

## 基本概念

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kafkahxzszj-0f6308dc-44db-49a2-9eec-50cf65958236.jpg)

**「主题」**

发布订阅的对象是主题（`Topic`），可以为每 个业务、每个应用甚至是每类数据都创建专属的主题

**「生产者和消费者」**

向主题发布消息的客户端应用程序称为生产者，生产者程序通常持续不断地 向一个或多个主题发送消息

订阅这些主题消息的客户端应用程序就被称为消费者，消费者也能够同时订阅多个主题的消息

**「Broker」**

集群由多个 Broker 组成，`Broker` 负责接收和处理客户端发送过来的请求，以及对消息进行持久化

虽然多个 Broker 进程能够运行在同一台机器上，但更常见的做法是将 不同的 `Broker` 分散运行在不同的机器上，这样如果集群中某一台机器宕机，即使在它上面 运行的所有 Broker 进程都挂掉了，其他机器上的 `Broker` 也依然能够对外提供服务

**「备份机制」**

备份的思想很简单，就是把相同的数据拷贝到多台机器上，而这些相同的数据拷贝被称为副本

定义了两类副本：领导者副本和追随者副本

前者对外提供服务，这里的对外指的是与 客户端程序进行交互；而后者只是被动地追随领导者副本而已，不能与外界进行交互

**「分区」**

分区机制指的是将每个主题划分成多个分区，每个分区是一组有序的消息日志

生产者生产的每条消息只会被发送到一个分区中，也就是说如果向一个双分区的主题发送一条消息，这条消息要么在分区 0 中，要么在分区 1 中

每个分区下可以配置若干个副本，其中只能有 1 个领 导者副本和 N-1 个追随者副本

生产者向分区写入消息，每条消息在分区中的位置信息叫位移

**「消费者组」**

多个消费者实例共同组成一个组来 消费一组主题

这组主题中的每个分区都只会被组内的一个消费者实例消费，其他消费者实例不能消费它

> ❝
> 
> 同时实现了传统消息引擎系统的两大模型：
> 
> ❞

如果所有实例都属于同一个 `Group`， 那么它实现的就是消息队列模型；

如果所有实例分别属于不 同的 `Group`，那么它实现的就是发布/订阅模型

**「Coordinator：协调者」**

所谓协调者，它专门为Consumer Group服务，负责为Group执行Rebalance以及提供位移管理和组成员管理等。

具体来讲，Consumer端应用程序在提交位移时，其实是向Coordinator所在的Broker提交位移，同样地，当Consumer应用启动时，也是向Coordinator所在的Broker发送各种请求，然后由Coordinator负责执行消费者组的注册、成员管理记录等元数据管理操作。

所有Broker在启动时，都会创建和开启相应的Coordinator组件。

也就是说，**「所有Broker都有各自的Coordinator组件」**。

那么，Consumer Group如何确定为它服务的Coordinator在哪台Broker上呢？

通过Kafka内部主题`__consumer_offsets`。

目前，Kafka为某个Consumer Group确定Coordinator所在的Broker的算法有2个步骤。

*   第1步：确定由`__consumer_offsets`主题的哪个分区来保存该Group数据：`partitionId=Math.abs(groupId.hashCode() % offsetsTopicPartitionCount)`。
*   第2步：找出该分区Leader副本所在的Broker，该Broker即为对应的Coordinator。

首先，Kafka会计算该Group的`group.id`参数的哈希值。

比如你有个Group的`group.id`设置成了`test-group`，那么它的hashCode值就应该是627841412。

其次，Kafka会计算`__consumer_offsets`的分区数，通常是50个分区，之后将刚才那个哈希值对分区数进行取模加求绝对值计算，即`abs(627841412 % 50) = 12`。

此时，我们就知道了`__consumer_offsets`主题的分区12负责保存这个Group的数据。

有了分区号，我们只需要找出`__consumer_offsets`主题分区12的Leader副本在哪个Broker上就可以了，这个Broker，就是我们要找的Coordinator。

**「消费者位移：Consumer Offset」**

消费者消费进度，每个消费者都有自己的消费者位移。

**「重平衡：Rebalance」**

消费者组内某个消费者实例挂掉后，其他消费者实例自动重新分配订阅主题分区的过程。

Rebalance是Kafka消费者端实现高可用的重要手段。

**「AR（Assigned Replicas）」**：分区中的所有副本统称为AR。

所有消息会先发送到leader副本，然后follower副本才能从leader中拉取消息进行同步。

但是在同步期间，follower对于leader而言会有一定程度的滞后，这个时候follower和leader并非完全同步状态

**「OSR（Out Sync Replicas）」**：follower副本与leader副本没有完全同步或滞后的副本集合

**「ISR（In Sync Replicas）：**「AR中的一个子集，ISR中的副本都」**是与leader保持完全同步的副本」**，如果某个在ISR中的follower副本落后于leader副本太多，则会被从ISR中移除，否则如果完全同步，会从OSR中移至ISR集合。

在默认情况下，当leader副本发生故障时，只有在ISR集合中的follower副本才有资格被选举为新leader，而OSR中的副本没有机会（可以通过`unclean.leader.election.enable`进行配置）

**「HW（High Watermark）」**：高水位，它标识了一个特定的消息偏移量（offset），消费者只能拉取到这个水位 offset 之前的消息

下图表示一个日志文件，这个日志文件中只有9条消息，第一条消息的offset（LogStartOffset）为0，最有一条消息的offset为8，offset为9的消息使用虚线表示的，代表下一条待写入的消息。

日志文件的 HW 为6，表示消费者只能拉取offset在 0 到 5 之间的消息，offset为6的消息对消费者而言是不可见的。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kafkahxzszj-f27928a8-9a91-4e39-a68d-c74d8a3291f1.jpg)

**「LEO（Log End Offset）」**：标识当前日志文件中下一条待写入的消息的offset

上图中offset为9的位置即为当前日志文件的 LEO，LEO 的大小相当于当前日志分区中最后一条消息的offset值加1

分区 ISR 集合中的每个副本都会维护自身的 LEO ，而 ISR 集合中最小的 LEO 即为分区的 HW，对消费者而言只能消费 HW 之前的消息。

## 系统架构

**「kafka设计思想」**

一个最基本的架构是生产者发布一个消息到Kafka的一个Topic ，该Topic的消息存放于的Broker中，消费者订阅这个Topic，然后从Broker中消费消息，下面这个图可以更直观的描述这个场景：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kafkahxzszj-19b8855c-e132-4dc8-b8a6-ad03465e8af9.jpg)

**「消息状态：」** 在Kafka中，消息是否被消费的状态保存在Consumer中，Broker不会关心消息是否被消费或被谁消费，Consumer会记录一个offset值（指向partition中下一条将要被消费的消息位置），如果offset被错误设置可能导致同一条消息被多次消费或者消息丢失。

**「消息持久化：」** Kafka会把消息持久化到本地文件系统中，并且具有极高的性能。

**「批量发送：」** Kafka支持以消息集合为单位进行批量发送，以提高效率。

**「Push-and-Pull：」** Kafka中的Producer和Consumer采用的是Push-and-Pull模式，即Producer向Broker Push消息，Consumer从Broker Pull消息。

**「分区机制（Partition）：」** Kafka的Broker端支持消息分区，Producer可以决定把消息发到哪个Partition，在一个Partition中消息的顺序就是Producer发送消息的顺序，一个Topic中的Partition数是可配置的，Partition是Kafka高吞吐量的重要保证。

**「系统架构」**

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kafkahxzszj-784020d0-cc87-446a-9627-77a88e158d3d.jpg)

通常情况下，一个kafka体系架构包括**「多个Producer」**、**「多个Consumer」**、**「多个broker」**以及**「一个Zookeeper集群」**。

**「Producer」**：生产者，负责将消息发送到kafka中。

**「Consumer」**：消费者，负责从kafka中拉取消息进行消费。

**「Broker」**：Kafka服务节点，一个或多个Broker组成了一个Kafka集群

**「Zookeeper集群」**：负责管理kafka集群元数据以及控制器选举等。

## 生产者分区

**「为什么分区？」**

Kafka的消息组织方式实际上是三级结构：主题-分区-消息。

主题下的每条消息只会保存在某一个分区中，而不会在多个分区中被保存多份。

其实分区的作用就是提供负载均衡的能力，或者说对数据进行分区的主要原因，就是为了实现系统的高伸缩性（Scalability）。

不同的分区能够被放置到不同节点的机器上，而数据的读写操作也都是针对分区这个粒度而进行的，这样每个节点的机器都能独立地执行各自分区的读写请求处理，并且，我们还可以通过添加新的节点机器来增加整体系统的吞吐量。

**「都有哪些分区策略？」**

**「所谓分区策略是决定生产者将消息发送到哪个分区的算法。」**

Kafka为我们提供了默认的分区策略，同时它也支持你自定义分区策略。

**「自定义分区策略」**

如果要自定义分区策略，你需要显式地配置生产者端的参数p`artitioner.class`。

在编写生产者程序时，你可以编写一个具体的类实现`org.apache.kafka.clients.producer.Partitioner`接口。

这个接口也很简单，只定义了两个方法：partition()和close()，通常你只需要实现最重要的partition方法。

我们来看看这个方法的方法签名：

```
int partition(String topic, Object key, byte[] keyBytes, Object value, byte[] valueBytes, Cluster cluster);
```

这里的topic、key、keyBytes、value和valueBytes都属于消息数据，cluster则是集群信息（比如当前Kafka集群共有多少主题、多少Broker等）。

Kafka给你这么多信息，就是希望让你能够充分地利用这些信息对消息进行分区，计算出它要被发送到哪个分区中。

只要你自己的实现类定义好了partition方法，同时设置`partitioner.class`参数为你自己实现类的Full Qualified Name，那么生产者程序就会按照你的代码逻辑对消息进行分区。

**「轮询策略」**

也称Round-robin策略，即顺序分配。

比如一个主题下有3个分区，那么第一条消息被发送到分区0，第二条被发送到分区1，第三条被发送到分区2，以此类推。当生产第4条消息时又会重新开始，即将其分配到分区0

这就是所谓的轮询策略。轮询策略是Kafka Java生产者API默认提供的分区策略。

**「轮询策略有非常优秀的负载均衡表现，它总是能保证消息最大限度地被平均分配到所有分区上，故默认情况下它是最合理的分区策略，也是我们最常用的分区策略之一。」**

**「随机策略」**

也称Randomness策略。所谓随机就是我们随意地将消息放置到任意一个分区上。

如果要实现随机策略版的partition方法，很简单，只需要两行代码即可：

```
List partitions = cluster.partitionsForTopic(topic);
return ThreadLocalRandom.current().nextInt(partitions.size());
```

先计算出该主题总的分区数，然后随机地返回一个小于它的正整数。

本质上看随机策略也是力求将数据均匀地打散到各个分区，但从实际表现来看，它要逊于轮询策略，所以**「如果追求数据的均匀分布，还是使用轮询策略比较好」**。事实上，随机策略是老版本生产者使用的分区策略，在新版本中已经改为轮询了。

**「按消息键保序策略」**

Kafka允许为每条消息定义消息键，简称为Key。

这个Key的作用非常大，它可以是一个有着明确业务含义的字符串，比如客户代码、部门编号或是业务ID等；也可以用来表征消息元数据。

特别是在Kafka不支持时间戳的年代，在一些场景中，工程师们都是直接将消息创建时间封装进Key里面的。

一旦消息被定义了Key，那么你就可以保证同一个Key的所有消息都进入到相同的分区里面，由于每个分区下的消息处理都是有顺序的，故这个策略被称为按消息键保序策略

实现这个策略的partition方法同样简单，只需要下面两行代码即可：

```
List partitions = cluster.partitionsForTopic(topic);
return Math.abs(key.hashCode()) % partitions.size();
```

前面提到的Kafka默认分区策略实际上同时实现了两种策略：如果指定了Key，那么默认实现按消息键保序策略；如果没有指定Key，则使用轮询策略。

**「其他分区策略」**

其实还有一种比较常见的，即所谓的基于地理位置的分区策略。

当然这种策略一般只针对那些大规模的Kafka集群，特别是跨城市、跨国家甚至是跨大洲的集群。

我们可以根据Broker所在的IP地址实现定制化的分区策略。比如下面这段代码：

```
List partitions = cluster.partitionsForTopic(topic);
return partitions.stream().filter(p -> isSouth(p.leader().host())).map(PartitionInfo::partition).findAny().get();
```

我们可以从所有分区中找出那些Leader副本在南方的所有分区，然后随机挑选一个进行消息发送。

## 生产者压缩算法

**「Kafka是如何压缩消息的呢？」**

目前Kafka共有两大类消息格式，社区分别称之为V1版本和V2版本。

V2版本是Kafka 0.11.0.0中正式引入的。

不论是哪个版本，Kafka的消息层次都分为两层：消息集合以及消息。

一个消息集合中包含若干条日志项，而日志项才是真正封装消息的地方。

Kafka底层的消息日志由一系列消息集合日志项组成。

Kafka通常不会直接操作具体的一条条消息，它总是在消息集合这个层面上进行写入操作。

**「那么社区引入V2版本的目的是什么呢？」**

V2版本主要是针对V1版本的一些弊端做了修正，比如把消息的公共部分抽取出来放到外层消息集合里面，这样就不用每条消息都保存这些信息了。

举个例子：原来在V1版本中，每条消息都需要执行CRC校验，但有些情况下消息的CRC值是会发生变化的。

比如在Broker端可能会对消息时间戳字段进行更新，那么重新计算之后的CRC值也会相应更新；再比如Broker端在执行消息格式转换时（主要是为了兼容老版本客户端程序），也会带来CRC值的变化。

鉴于这些情况，再对每条消息都执行CRC校验就有点没必要了，不仅浪费空间还耽误CPU时间，因此在V2版本中，消息的CRC校验工作就被移到了消息集合这一层。

V2版本还有一个和压缩息息相关的改进，就是保存压缩消息的方法发生了变化。

之前V1版本中保存压缩消息的方法是把多条消息进行压缩然后保存到外层消息的消息体字段中；而V2版本的做法是对整个消息集合进行压缩，显然后者应该比前者有更好的压缩效果。

**「何时压缩？」**

在Kafka中，压缩可能发生在两个地方：生产者端和Broker端。

生产者程序中配置`compression.type`参数即表示启用指定类型的压缩算法。

比如下面这段程序代码展示了如何构建一个开启GZIP的Producer对象：

```
Properties props = new Properties(); 
props.put("bootstrap.servers", "localhost:9092"); 
props.put("acks", "all"); 
props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer"); props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer"); // 开启GZIP压缩 
props.put("compression.type", "gzip"); 
Producer producer = new KafkaProducer<>(props);
```

这里比较关键的代码行是`props.put(“compression.type”, “gzip”)`，它表明该Producer的压缩算法使用的是GZIP。

这样Producer启动后生产的每个消息集合都是经GZIP压缩过的，故而能很好地节省网络传输带宽以及Kafka Broker端的磁盘占用。

有两种例外情况就可能让Broker重新压缩消息：

**「情况一：Broker端指定了和Producer端不同的压缩算法。」**

一旦你在Broker端设置了不同的`compression.type`值，就一定要小心了，因为可能会发生预料之外的压缩/解压缩操作，通常表现为Broker端CPU使用率飙升。

**「情况二：Broker端发生了消息格式转换。」**

所谓的消息格式转换主要是为了兼容老版本的消费者程序。

在一个生产环境中，Kafka集群中同时保存多种版本的消息格式非常常见。

为了兼容老版本的格式，Broker端会对新版本消息执行向老版本格式的转换。

这个过程中会涉及消息的解压缩和重新压缩。

一般情况下这种消息格式转换对性能是有很大影响的，除了这里的压缩之外，它还让Kafka丧失了Zero Copy特性。

**「何时解压缩？」**

有压缩必有解压缩！通常来说解压缩发生在消费者程序中，也就是说Producer发送压缩消息到Broker后，Broker照单全收并原样保存起来。当Consumer程序请求这部分消息时，Broker依然原样发送出去，当消息到达Consumer端后，由Consumer自行解压缩还原成之前的消息。

**「基本过程：Producer端压缩、Broker端保持、Consumer端解压缩。」**

注意：除了在Consumer端解压缩，Broker端也会进行解压缩。

每个压缩过的消息集合在Broker端写入时都要发生解压缩操作，目的就是为了对消息执行各种验证。

我们必须承认这种解压缩对Broker端性能是有一定影响的，特别是对CPU的使用率而言。

**「各种压缩算法对比」**

在Kafka 2.1.0版本之前，Kafka支持3种压缩算法：GZIP、Snappy和LZ4。

从2.1.0开始，Kafka正式支持Zstandard算法（简写为zstd）。

它是Facebook开源的一个压缩算法，能够提供超高的压缩比。

在实际使用中，GZIP、Snappy、LZ4和zstd的表现各有千秋。

但对于Kafka而言，在吞吐量方面：LZ4 > Snappy > zstd和GZIP；而在压缩比方面，zstd > LZ4 > GZIP > Snappy。

具体到物理资源，使用Snappy算法占用的网络带宽最多，zstd最少；

在CPU使用率方面，各个算法表现得差不多，只是在压缩时Snappy算法使用的CPU较多一些，而在解压缩时GZIP算法则可能使用更多的CPU。

**「最佳实践」**

> ❝
> 
> 何时启用压缩是比较合适的时机呢？
> 
> ❞

启用压缩的一个条件就是Producer程序运行机器上的CPU资源要很充足。

除了CPU资源充足这一条件，如果你的环境中带宽资源有限，那么建议你开启压缩。

## 消费者组

**「Consumer Group是Kafka提供的可扩展且具有容错性的消费者机制」**。

既然是一个组，那么组内必然可以有多个消费者或消费者实例，它们共享一个公共的ID，这个ID被称为Group ID。

组内的所有消费者协调在一起来消费订阅主题的所有分区。

> ❝
> 
> 每个分区只能由同一个消费者组内的一个Consumer实例来消费。
> 
> ❞

**「Consumer Group三个特性：」**

1.  Consumer Group下可以有一个或多个Consumer实例，这里的实例可以是一个单独的进程，也可以是同一进程下的线程。
2.  Group ID是一个字符串，在一个Kafka集群中，它标识唯一的一个Consumer Group。
3.  Consumer Group下所有实例订阅的主题的单个分区，只能分配给组内的某个Consumer实例消费，这个分区当然也可以被其他的Group消费。

当Consumer Group订阅了多个主题后，组内的每个实例不要求一定要订阅主题的所有分区，它只会消费部分分区中的消息。

Consumer Group之间彼此独立，互不影响，它们能够订阅相同的一组主题而互不干涉。

**「Kafka仅仅使用Consumer Group这一种机制，却同时实现了传统消息引擎系统的两大模型」**：

*   如果所有实例都属于同一个Group，那么它实现的就是消息队列模型；
*   如果所有实例分别属于不同的Group，那么它实现的就是发布/订阅模型。

**「一个Group下该有多少个Consumer实例呢？」**

**「理想情况下，Consumer实例的数量应该等于该Group订阅主题的分区总数。」**

假设一个Consumer Group订阅了3个主题，分别是A、B、C，它们的分区数依次是1、2、3，那么通常情况下，为该Group设置6个Consumer实例是比较理想的情形，因为它能最大限度地实现高伸缩性。

**「针对Consumer Group，Kafka是怎么管理位移的呢？」**

**「位移Offset」**

老版本的Consumer Group把位移保存在ZooKeeper中。

Apache ZooKeeper是一个分布式的协调服务框架，Kafka重度依赖它实现各种各样的协调管理。

将位移保存在ZooKeeper外部系统的做法，最显而易见的好处就是减少了Kafka Broker端的状态保存开销。

不过，慢慢地发现了一个问题，即ZooKeeper这类元框架其实并不适合进行频繁的写更新，而Consumer Group的位移更新却是一个非常频繁的操作。

这种大吞吐量的写操作会极大地拖慢ZooKeeper集群的性能。

于是，在新版本的Consumer Group中，Kafka社区重新设计了Consumer Group的位移管理方式，采用了将位移保存在Kafka内部主题的方法。

这个内部主题就是`__consumer_offsets`。

## 消费者策略

**「第一种是Round」**

默认，也叫轮循，说的是对于同一组消费者来说，使用轮训分配的方式，决定消费者消费的分区

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kafkahxzszj-1262b5a7-198e-47b7-ad81-a4f84e755901.jpg)

**「第二种叫做Range」**

对一个消费者组来说决定消费方式是以分区总数除以消费者总数来决定，一般如果不能整除，往往是从头开始将剩余的分区分配开

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kafkahxzszj-d6a295aa-85f7-439e-9984-e081f3d95238.jpg)

**「第三种叫Sticky」**

是在0.11.x，新增的，它和前面两个不是很一样，它是在Range上的一种升华，且前面两个当同组内有新的消费者加入或者旧的消费者退出的时候，会从新开始决定消费者消费方式，但是Sticky，在同组中有新的新的消费者加入或者旧的消费者退出时，不会直接开始新的Range分配，而是保留现有消费者原来的消费策略，将退出的消费者所消费的分区平均分配给现有消费者，新增消费者同理，同其他现存消费者的消费策略中分离

## 位移提交

假设一个分区中有10条消息，位移分别是0到9。

某个Consumer应用已消费了5条消息，这就说明该Consumer消费了位移为0到4的5条消息，此时Consumer的位移是5，指向了下一条消息的位移。

因为Consumer能够同时消费多个分区的数据，所以位移的提交实际上是在分区粒度上进行的，即**「Consumer需要为分配给它的每个分区提交各自的位移数据」**。

**「位移提交分为自动提交和手动提交；从Consumer端的角度来说，位移提交分为同步提交和异步提交」**。

开启自动提交位移的方法：Consumer端有个参数`enable.auto.commit`，把它设置为true或者压根不设置它就可以了。

因为它的默认值就是true，即Java Consumer默认就是自动提交位移的。

如果启用了自动提交，Consumer端还有个参数：`auto.commit.interval.ms`。

它的默认值是5秒，表明Kafka每5秒会为你自动提交一次位移。

```
Properties props = new Properties();
     props.put("bootstrap.servers", "localhost:9092");
     props.put("group.id", "test");
     props.put("enable.auto.commit", "true");
     props.put("auto.commit.interval.ms", "2000");
     props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
     props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
     KafkaConsumer consumer = new KafkaConsumer<>(props);
     consumer.subscribe(Arrays.asList("foo", "bar"));
     while (true) {
         ConsumerRecords records = consumer.poll(100);
         for (ConsumerRecord record : records)
             System.out.printf("offset = %d, key = %s, value = %s%n", record.offset(), record.key(), record.value());
     }
```

上面的第3、第4行代码，就是开启自动提交位移的方法。

开启手动提交位移的方法就是设置`enable.auto.commit为false`。

还需要调用相应的API手动提交位移。最简单的API就是**「KafkaConsumer#commitSync()」**。

该方法会提交`KafkaConsumer#poll()`返回的最新位移。

从名字上来看，它是一个同步操作，即该方法会一直等待，直到位移被成功提交才会返回。

如果提交过程中出现异常，该方法会将异常信息抛出。

下面这段代码展示了commitSync()的使用方法：

```
while (true) {
            ConsumerRecords records =
                        consumer.poll(Duration.ofSeconds(1));
            process(records); // 处理消息
            try {
                        consumer.commitSync();
            } catch (CommitFailedException e) {
                        handle(e); // 处理提交失败异常
            }
}
```

一旦设置了`enable.auto.commit`为true，Kafka会保证在开始调用poll方法时，提交上次poll返回的所有消息。

从顺序上来说，poll方法的逻辑是先提交上一批消息的位移，再处理下一批消息，因此它能保证不出现消费丢失的情况。

但自动提交位移的一个问题在于，**「它可能会出现重复消费」**。

而手动提交位移，它的好处就在于更加灵活，你完全能够把控位移提交的时机和频率。

但是，它也有一个缺陷，就是在调用commitSync()时，Consumer程序会处于阻塞状态，直到远端的Broker返回提交结果，这个状态才会结束。

鉴于这个问题，Kafka社区为手动提交位移提供了另一个API方法：**「KafkaConsumer#commitAsync()」**。

从名字上来看它就不是同步的，而是一个异步操作。

调用commitAsync()之后，它会立即返回，不会阻塞，因此不会影响Consumer应用的TPS。

由于它是异步的，Kafka提供了回调函数（callback），供你实现提交之后的逻辑，比如记录日志或处理异常等。

下面这段代码展示了调用commitAsync()的方法：

```
while (true) {
            ConsumerRecords records = 
 consumer.poll(Duration.ofSeconds(1));
            process(records); // 处理消息
            consumer.commitAsync((offsets, exception) -> {
 if (exception != null)
 handle(exception);
 });
}
```

commitAsync的问题在于，出现问题时它不会自动重试。

显然，如果是手动提交，我们需要将commitSync和commitAsync组合使用才能到达最理想的效果，原因有两个：

1.  我们可以利用commitSync的自动重试来规避那些瞬时错误，比如网络的瞬时抖动，Broker端GC等，因为这些问题都是短暂的，自动重试通常都会成功。
2.  我们不希望程序总处于阻塞状态，影响TPS。

我们来看一下下面这段代码，它展示的是如何将两个API方法结合使用进行手动提交。

```
   try {
           while(true) {
                        ConsumerRecords records = 
                                    consumer.poll(Duration.ofSeconds(1));
                        process(records); // 处理消息
                        commitAysnc(); // 使用异步提交规避阻塞
            }
} catch(Exception e) {
            handle(e); // 处理异常
} finally {
            try {
                        consumer.commitSync(); // 最后一次提交使用同步阻塞式提交
 } finally {
      consumer.close();
}
}
```

这样一个场景：你的poll方法返回的不是500条消息，而是5000条。

那么，你肯定不想把这5000条消息都处理完之后再提交位移，因为一旦中间出现差错，之前处理的全部都要重来一遍。

比如前面这个5000条消息的例子，你可能希望每处理完100条消息就提交一次位移，这样能够避免大批量的消息重新消费。

Kafka Consumer API为手动提交提供了这样的方法：commitSync(Map)和commitAsync(Map)。

它们的参数是一个Map对象，键就是TopicPartition，即消费的分区，而值是一个OffsetAndMetadata对象，保存的主要是位移数据。

> ❝
> 
> 如何每处理100条消息就提交一次位移呢？
> 
> ❞

在这里，我以commitAsync为例，展示一段代码，实际上，commitSync的调用方法和它是一模一样的。

```
private Map offsets = new HashMap<>();
int count = 0;
……
while (true) {
            ConsumerRecords records = 
 consumer.poll(Duration.ofSeconds(1));
            for (ConsumerRecord record: records) {
                        process(record);  // 处理消息
                        offsets.put(new TopicPartition(record.topic(), record.partition()),
                                   new OffsetAndMetadata(record.offset() + 1)；
                       if（count % 100 == 0）
                                    consumer.commitAsync(offsets, null); // 回调处理逻辑是null
                        count++;
 }
}
```

程序先是创建了一个Map对象，用于保存Consumer消费处理过程中要提交的分区位移，之后开始逐条处理消息，并构造要提交的位移值。

代码的最后部分是做位移的提交。设置了一个计数器，每累计100条消息就统一提交一次位移。

与调用无参的commitAsync不同，这里调用了带Map对象参数的commitAsync进行细粒度的位移提交。

这样，这段代码就能够实现每处理100条消息就提交一次位移，不用再受poll方法返回的消息总数的限制了。

## 重平衡

**「（重平衡）Rebalance本质上是一种协议，规定了一个Consumer Group下的所有Consumer如何达成一致，来分配订阅Topic的每个分区」**。

比如某个Group下有20个Consumer实例，它订阅了一个具有100个分区的Topic。

正常情况下，Kafka平均会为每个Consumer分配5个分区。这个分配的过程就叫Rebalance。

**「Rebalance的触发条件有3个。」**

1.  组成员数发生变更。比如有新的Consumer实例加入组或者离开组，或是有Consumer实例崩溃被踢出组。
2.  订阅主题数发生变更。Consumer Group可以使用正则表达式的方式订阅主题，比如`consumer.subscribe(Pattern.compile(“t.*c”))`就表明该Group订阅所有以字母t开头、字母c结尾的主题，在Consumer Group的运行过程中，你新创建了一个满足这样条件的主题，那么该Group就会发生Rebalance。
3.  订阅主题的分区数发生变更。Kafka当前只能允许增加一个主题的分区数，当分区数增加时，就会触发订阅该主题的所有Group开启Rebalance。

Rebalance发生时，Group下所有的Consumer实例都会协调在一起共同参与。

**「分配策略」**

当前Kafka默认提供了3种分配策略，每种策略都有一定的优势和劣势，社区会不断地完善这些策略，保证提供最公平的分配策略，即每个Consumer实例都能够得到较为平均的分区数。

比如一个Group内有10个Consumer实例，要消费100个分区，理想的分配策略自然是每个实例平均得到10个分区。

这就叫公平的分配策略。

举个简单的例子来说明一下Consumer Group发生Rebalance的过程。

假设目前某个Consumer Group下有两个Consumer，比如A和B，当第三个成员C加入时，Kafka会触发Rebalance，并根据默认的分配策略重新为A、B和C分配分区

Rebalance之后的分配依然是公平的，即每个Consumer实例都获得了2个分区的消费权。

在Rebalance过程中，所有Consumer实例都会停止消费，等待Rebalance完成，这是Rebalance为人诟病的一个方面。

目前Rebalance的设计是所有Consumer实例共同参与，全部重新分配所有分区。

**「Coordinator会在什么情况下认为某个Consumer实例已挂从而要退组呢？」**

当Consumer Group完成Rebalance之后，每个Consumer实例都会定期地向Coordinator发送心跳请求，表明它还存活着。

如果某个Consumer实例不能及时地发送这些心跳请求，Coordinator就会认为该Consumer已经死了，从而将其从Group中移除，然后开启新一轮Rebalance。

Consumer端有个参数，叫`session.timeout.ms`。

该参数的默认值是10秒，即如果Coordinator在10秒之内没有收到Group下某Consumer实例的心跳，它就会认为这个Consumer实例已经挂了。

除了这个参数，Consumer还提供了一个允许你控制发送心跳请求频率的参数，就是`heartbeat.interval.ms`。

这个值设置得越小，Consumer实例发送心跳请求的频率就越高。

频繁地发送心跳请求会额外消耗带宽资源，但好处是能够更加快速地知晓当前是否开启Rebalance，因为，目前Coordinator通知各个Consumer实例开启Rebalance的方法，就是将`REBALANCE_NEEDED`标志封装进心跳请求的响应体中。

除了以上两个参数，Consumer端还有一个参数，用于控制Consumer实际消费能力对Rebalance的影响，即`max.poll.interval.ms`参数。

它限定了Consumer端应用程序两次调用poll方法的最大时间间隔。

它的默认值是5分钟，表示你的Consumer程序如果在5分钟之内无法消费完poll方法返回的消息，那么Consumer会主动发起离开组的请求，Coordinator也会开启新一轮Rebalance。

**「可避免Rebalance的配置」**

第一类Rebalance是因为未能及时发送心跳，导致Consumer被踢出Group而引发的

因此可以设置**「session.timeout.ms和heartbeat.interval.ms」**的值。

*   设置`session.timeout.ms` = 6s。
*   设置`heartbeat.interval.ms` = 2s。
*   要保证Consumer实例在被判定为dead之前，能够发送至少3轮的心跳请求，即`session.timeout.ms >= 3 * heartbeat.interval.ms`。

将`session.timeout.ms`设置成6s主要是为了让Coordinator能够更快地定位已经挂掉的Consumer。

**「第二类Rebalance是Consumer消费时间过长导致的」**。

你要为你的业务处理逻辑留下充足的时间，这样Consumer就不会因为处理这些消息的时间太长而引发Rebalance了。

## ConsumerOffsets

**「Kafka将Consumer的位移数据作为一条条普通的Kafka消息，提交到\_\_consumer\_offsets中。」**

**「\_\_consumer\_offsets的主要作用是保存Kafka消费者的位移信息。」**

它要求这个提交过程不仅要实现高持久性，还要支持高频的写操作。

`__consumer_offsets`主题就是普通的Kafka主题。你可以手动地创建它、修改它，甚至是删除它。

虽说`__consumer_offsets`主题是一个普通的Kafka主题，但**「它的消息格式却是Kafka自己定义的」**，用户不能修改，也就是说你不能随意地向这个主题写消息，因为一旦你写入的消息不满足Kafka规定的格式，那么Kafka内部无法成功解析，就会造成Broker的崩溃。

Kafka Consumer有API帮你提交位移，也就是向`__consumer_offsets`主题写消息，千万不要自己写个Producer随意向该主题发送消息。

`__consumer_offsets`有3种消息格式：

1.  用于保存Consumer Group信息的消息。
2.  用于删除Group过期位移甚至是删除Group的消息。
3.  保存了位移值。

第2种格式它有个专属的名字：tombstone消息，即墓碑消息，也称delete mark，它的主要特点是它的消息体是null，即空消息体。

一旦某个Consumer Group下的所有Consumer实例都停止了，而且它们的位移数据都已被删除时，Kafka会向`__consumer_offsets`主题的对应分区写入tombstone消息，表明要彻底删除这个Group的信息。

`__consumer_offsets`是怎么被创建的？

通常来说，**「当Kafka集群中的第一个Consumer程序启动时，Kafka会自动创建位移主题」**。

**「默认该主题的分区数是50，副本数是3」**。

目前Kafka Consumer提交位移的方式有两种：**「自动提交位移和手动提交位移。」**

Consumer端有个参数叫`enable.auto.commit`，如果值是true，则Consumer在后台默默地为你定期提交位移，提交间隔由一个专属的参数`auto.commit.interval.ms`来控制。

自动提交位移有一个显著的优点，就是省事，你不用操心位移提交的事情，就能保证消息消费不会丢失。

但这一点同时也是缺点，丧失了很大的灵活性和可控性，你完全没法把控Consumer端的位移管理。

Kafka Consumer API为你提供了位移提交的方法，如`consumer.commitSync`等。

当调用这些方法时，Kafka会向`__consumer_offsets`主题写入相应的消息。

如果你选择的是自动提交位移，那么就可能存在一个问题：只要Consumer一直启动着，它就会无限期地向位移主题写入消息。

**「举个极端一点的例子。」**

假设Consumer当前消费到了某个主题的最新一条消息，位移是100，之后该主题没有任何新消息产生，故Consumer无消息可消费了，所以位移永远保持在100。

由于是自动提交位移，位移主题中会不停地写入位移=100的消息。

显然Kafka只需要保留这类消息中的最新一条就可以了，之前的消息都是可以删除的。

这就要求Kafka必须要有针对位移主题消息特点的消息删除策略，否则这种消息会越来越多，最终撑爆整个磁盘。

**「Compact策略」**

Kafka使用**「Compact策略」**来删除`__consumer_offsets`主题中的过期消息，避免该主题无限期膨胀。

比如对于同一个Key的两条消息M1和M2，如果M1的发送时间早于M2，那么M1就是过期消息。

Compact的过程就是扫描日志的所有消息，剔除那些过期的消息，然后把剩下的消息整理在一起。

我在这里贴一张来自官网的图片，来说明Compact过程。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kafkahxzszj-14efc721-5848-4931-80f3-b8a52c9a7816.jpg)

图中位移为0、2和3的消息的Key都是K1，Compact之后，分区只需要保存位移为3的消息，因为它是最新发送的。

**「Kafka提供了专门的后台线程定期地巡检待Compact的主题，看看是否存在满足条件的可删除数据」**。

这个后台线程叫Log Cleaner。

很多实际生产环境中都出现过位移主题无限膨胀占用过多磁盘空间的问题，如果你的环境中也有这个问题，建议你去检查一下Log Cleaner线程的状态，通常都是这个线程挂掉了导致的。

## 副本机制

根据Kafka副本机制的定义，同一个分区下的所有副本保存有相同的消息序列，这些副本分散保存在不同的Broker上，从而能够对抗部分Broker宕机带来的数据不可用。

下面展示的是一个有3台Broker的Kafka集群上的副本分布情况。

从这张图中，我们可以看到，主题1分区0的3个副本分散在3台Broker上，其他主题分区的副本也都散落在不同的Broker上，从而实现数据冗余。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kafkahxzszj-b2a22704-3d2e-4e1d-8f43-0dfa869ff8a4.jpg)

**「副本角色」**

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kafkahxzszj-804bdef2-6281-4dd6-bee7-ec3361cff781.jpg)

在Kafka中，副本分成两类：领导者副本（Leader Replica）和追随者副本（Follower Replica）。

每个分区在创建时都要选举一个副本，称为领导者副本，其余的副本自动称为追随者副本。

在Kafka中，追随者副本是不对外提供服务的。这就是说，任何一个追随者副本都不能响应消费者和生产者的读写请求。所有的请求都必须由领导者副本来处理，或者说，所有的读写请求都必须发往领导者副本所在的Broker，由该Broker负责处理。

追随者副本不处理客户端请求，它唯一的任务就是从领导者副本**「异步拉取」**消息，并写入到自己的提交日志中，从而实现与领导者副本的同步。

当领导者副本挂掉了，或者说领导者副本所在的Broker宕机时，Kafka依托于ZooKeeper提供的监控功能能够实时感知到，并立即开启新一轮的领导者选举，从追随者副本中选一个作为新的领导者。老Leader副本重启回来后，只能作为追随者副本加入到集群中。

对于客户端用户而言，Kafka的追随者副本没有任何作用，Kafka为什么要这样设计呢？

这种副本机制有两个方面的好处。

1.**「方便实现Read-your-writes」**。

所谓Read-your-writes，顾名思义就是，当你使用生产者API向Kafka成功写入消息后，马上使用消费者API去读取刚才生产的消息。

2.**「方便实现单调读（Monotonic Reads）」**。

假设当前有2个追随者副本F1和F2，它们异步地拉取领导者副本数据。倘若F1拉取了Leader的最新消息而F2还未及时拉取，那么，此时如果有一个消费者先从F1读取消息之后又从F2拉取消息，它可能会看到这样的现象：第一次消费时看到的最新消息在第二次消费时不见了，这就不是单调读一致性。

但是，如果所有的读请求都是由Leader来处理，那么Kafka就很容易实现单调读一致性。

### ISR机制

In-sync Replicas，也就是所谓的ISR副本集合。

ISR中的副本都是与Leader同步的副本，相反，不在ISR中的追随者副本就被认为是与Leader不同步的。

> ❝
> 
> 什么副本能够进入到ISR中呢？
> 
> ❞

Leader副本天然就在ISR中。也就是说，**「ISR不只是追随者副本集合，它必然包括Leader副本。甚至在某些情况下，ISR只有Leader这一个副本」**。

另外，能够进入到ISR的追随者副本要满足一定的条件。

**「通过Broker端参数replica.lag.time.max.ms参数值」**。

这个参数的含义是Follower副本能够落后Leader副本的最长时间间隔，当前默认值是10秒。

这就是说，只要一个Follower副本落后Leader副本的时间不连续超过10秒，那么Kafka就认为该Follower副本与Leader是同步的，即使此时Follower副本中保存的消息明显少于Leader副本中的消息。

Follower副本唯一的工作就是不断地从Leader副本拉取消息，然后写入到自己的提交日志中。

倘若该副本后面慢慢地追上了Leader的进度，那么它是能够重新被加回ISR的。

ISR是一个动态调整的集合，而非静态不变的。

### Unclean领导者选举

**「Kafka把所有不在ISR中的存活副本都称为非同步副本」**。

通常来说，非同步副本落后Leader太多，因此，如果选择这些副本作为新Leader，就可能出现数据的丢失。

毕竟，这些副本中保存的消息远远落后于老Leader中的消息。

在Kafka中，选举这种副本的过程称为Unclean领导者选举。

**「Broker端参数unclean.leader.election.enable控制是否允许Unclean领导者选举」**。

开启Unclean领导者选举可能会造成数据丢失，但好处是，它使得分区Leader副本一直存在，不至于停止对外提供服务，因此提升了高可用性。反之，禁止Unclean领导者选举的好处在于维护了数据的一致性，避免了消息丢失，但牺牲了高可用性。

### 副本选举

对于kafka集群中对于任意的topic的分区以及副本leader的设定，都需要考虑到集群整体的负载能力的平衡性，会尽量分配每一个partition的副本leader在不同的broker中，这样会避免多个leader在同一个broker，导致集群中的broker负载不平衡

kafka引入了优先副本的概念，优先副本的意思在AR（分区中的所有副本）集合列表中的第一个副本，在理想状态下该副本就是该分区的leader副本

例如kafka集群由3台broker组成，创建了一个名为`topic-partitions`的topic，设置partition为3，副本数为3，partition0中AR列表为 `[1,2,0]`，那么分区0的优先副本为1

kafka使用多副本机制提高可靠性，但是只有leader副本对外提供读写服务，follow副本只是做消息同步。

**「如果一个分区的leader副本不可用，就意味着整个分区不可用，此时需要从follower副本中选举出新的leader副本提供服务」**。

**「在创建主题的时候，该分区的主题和副本会尽可能的均匀发布到kafka的各个broker上」**。

比如我们在包含3个broker节点的kafka集群上创建一个分区数为3，副本因子为3的主题`topic-partitions`时，leader副本会均匀的分布在3台broker节点上。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kafkahxzszj-1dfdbca2-372c-4bcf-9f9c-d58a94f32477.jpg)

**「针对同一个分区，在同一个broker节点上不可能出现它的多个副本」**。

我们可以把leader副本所在的节点叫作分区的leader节点，把follower副本所在的节点叫作follower节点。

在上面的例子中，分区0的leader节点是broker1，分区1的leader节点是broker2，分区2的leader节点是broker0。

当分区leader节点发生故障时，其中的一个follower节点就会选举为新的leader节点。

当原来leader的节点恢复之后，它只能成为一个follower节点，此时就导致了集群负载不均衡。

比如分区1的leader节点broker2崩溃了，此时选举了在broker1上的分区1follower节点作为新的leader节点。

当broker2重新恢复时，此时的kafka集群状态如下：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kafkahxzszj-6630b85d-2c0d-44ea-add9-aa1ea1d66ac8.jpg)

可以看到，此时broker1上负载更大，而broker2上没有负载。

**「为了解决上述负载不均衡的情况，kafka支持了优先副本选举，优先副本指的是一个分区所在的AR集合的第一个副本」**。

比如上面的分区1，它的AR集合是`[2,0,1]`，表示分区1的优先副本就是在broker2上。

理想情况下，优先副本应该就是leader副本，kafka保证了优先副本的均衡分布，而这与broker节点宕机与否没有关系。

**「优先副本选举就是对分区leader副本进行选举的时候，尽可能让优先副本成为leader副本」**，针对上述的情况，只要再触发一次优先副本选举就能保证分区负载均衡。

kafka支持自动优先副本选举功能，默认每5分钟触发一次优先副本选举操作。

## 网络通信模型

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kafkahxzszj-8b040ee5-4ccc-4e81-b653-611c758c9899.jpg)

Broker 中有个`Acceptor(mainReactor)`监听新连接的到来，与新连接建连之后轮询选择一个`Processor(subReactor)`管理这个连接。

而`Processor`会监听其管理的连接，当事件到达之后，读取封装成`Request`，并将`Request`放入共享请求队列中。

然后IO线程池不断的从该队列中取出请求，执行真正的处理。处理完之后将响应发送到对应的`Processor`的响应队列中，然后由`Processor`将`Response`返还给客户端。

每个`listener`只有一个`Acceptor线程`，因为它只是作为新连接建连再分发，没有过多的逻辑，很轻量。

`Processor` 在Kafka中称之为网络线程，默认网络线程池有3个线程，对应的参数是`num.network.threads`，并且可以根据实际的业务动态增减。

还有个 IO 线程池，即`KafkaRequestHandlerPool`，执行真正的处理，对应的参数是`num.io.threads`，默认值是 8。

IO线程处理完之后会将`Response`放入对应的`Processor`中，由`Processor`将响应返还给客户端。

可以看到网络线程和IO线程之间利用的经典的生产者 - 消费者模式，不论是用于处理Request的共享请求队列，还是IO处理完返回的Response。

## 幂等性

**「幂等性Producer」**

在Kafka中，Producer默认不是幂等性的，但我们可以创建幂等性Producer。

它其实是0.11.0.0版本引入的新功能，在此之前，Kafka向分区发送数据时，可能会出现同一条消息被发送了多次，导致消息重复的情况。

在0.11之后，指定Producer幂等性的方法很简单，仅需要设置一个参数即可，即

```
props.put(“enable.idempotence”, ture)，
或props.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG， true)。
```

`enable.idempotence`被设置成true后，Producer自动升级成幂等性Producer，其他所有的代码逻辑都不需要改变。

Kafka自动帮你做消息的重复去重。

底层具体的原理很简单，就是经典的用空间去换时间的优化思路，即在Broker端多保存一些字段。

当Producer发送了具有相同字段值的消息后，Broker能够自动知晓这些消息已经重复了，于是可以在后台默默地把它们丢弃掉。

**「幂等性Producer的作用范围」**

首先，它只能保证单分区上的幂等性，即一个幂等性Producer能够保证某个主题的一个分区上不出现重复消息，它无法实现多个分区的幂等性。

其次，它只能实现单会话上的幂等性，不能实现跨会话的幂等性。

这里的会话，你可以理解为Producer进程的一次运行，当你重启了Producer进程之后，这种幂等性保证就丧失了。

## 事务

Kafka自0.11版本开始也提供了对事务的支持，目前主要是在read committed隔离级别上做事情。

它能保证多条消息原子性地写入到目标分区，同时也能保证Consumer只能看到事务成功提交的消息。

**「事务型Producer」**

事务型Producer能够保证将消息原子性地写入到多个分区中。

这批消息要么全部写入成功，要么全部失败，另外，事务型Producer也不惧进程的重启。

Producer重启回来后，Kafka依然保证它们发送消息的精确一次处理。

设置事务型Producer的方法也很简单，满足两个要求即可：

*   和幂等性Producer一样，开启`enable.idempotence = true`。
*   设置Producer端参数`transactional. id`，最好为其设置一个有意义的名字。

此外，你还需要在Producer代码中做一些调整，如这段代码所示：

```
producer.initTransactions();
try {
            producer.beginTransaction();
            producer.send(record1);
            producer.send(record2);
            producer.commitTransaction();
} catch (KafkaException e) {
            producer.abortTransaction();
}
```

和普通Producer代码相比，事务型Producer的显著特点是调用了一些事务API，如initTransaction、beginTransaction、commitTransaction和abortTransaction，它们分别对应事务的初始化、事务开始、事务提交以及事务终止。

这段代码能够保证Record1和Record2被当作一个事务统一提交到Kafka，要么它们全部提交成功，要么全部写入失败。

实际上即使写入失败，Kafka也会把它们写入到底层的日志中，也就是说Consumer还是会看到这些消息。

有一个`isolation.level`参数，这个参数有两个取值：

1.  `read_uncommitted`：这是默认值，表明Consumer能够读取到Kafka写入的任何消息，不论事务型Producer提交事务还是终止事务，其写入的消息都可以读取，如果你用了事务型Producer，那么对应的Consumer就不要使用这个值。
2.  `read_committed`：表明Consumer只会读取事务型Producer成功提交事务写入的消息，它也能看到非事务型Producer写入的所有消息。

## 拦截器

**「Kafka拦截器分为生产者拦截器和消费者拦截器」**。

生产者拦截器允许你在发送消息前以及消息提交成功后植入你的拦截器逻辑；

而消费者拦截器支持在消费消息前以及提交位移后编写特定逻辑。

可以将一组拦截器串连成一个大的拦截器，Kafka会按照添加顺序依次执行拦截器逻辑。

当前Kafka拦截器的设置方法是通过参数配置完成的，生产者和消费者两端有一个相同的参数`interceptor.classes`，它指定的是一组类的列表，每个类就是特定逻辑的拦截器实现类。

```
Properties props = new Properties(); 
List interceptors = new ArrayList<>(); 
interceptors.add("com.yourcompany.kafkaproject.interceptors.AddTimestampInterceptor"); // 拦截器1 
interceptors.add("com.yourcompany.kafkaproject.interceptors.UpdateCounterInterceptor"); // 拦截器2 
props.put(ProducerConfig.INTERCEPTOR_CLASSES_CONFIG, interceptors); 
…… 
```

> ❝
> 
> 怎么编写AddTimeStampInterceptor和UpdateCounterInterceptor类呢？
> 
> ❞

这两个类以及你自己编写的所有Producer端拦截器实现类都要继承`org.apache.kafka.clients.producer.ProducerInterceptor`接口。

该接口是Kafka提供的，里面有两个核心的方法。

1.  onSend：该方法会在消息发送之前被调用。
2.  onAcknowledgement：该方法会在消息成功提交或发送失败之后被调用。onAcknowledgement的调用要早于callback的调用。值得注意的是，这个方法和onSend不是在同一个线程中被调用的，因此如果你在这两个方法中调用了某个共享可变对象，一定要保证线程安全。

同理，指定消费者拦截器也是同样的方法，只是具体的实现类要实现`org.apache.kafka.clients.consumer.ConsumerInterceptor`接口，这里面也有两个核心方法。

1.  onConsume：该方法在消息返回给Consumer程序之前调用。
2.  onCommit：Consumer在提交位移之后调用该方法。通常你可以在该方法中做一些记账类的动作，比如打日志等。

一定要注意的是，**「指定拦截器类时要指定它们的全限定名」**。

通俗点说就是要把完整包名也加上，不要只有一个类名在那里，并且还要保证你的Producer程序能够正确加载你的拦截器类。

## 控制器

**「控制器组件（Controller），它的主要作用是在Apache ZooKeeper的帮助下管理和协调整个Kafka集群」**。

集群中任意一台Broker都能充当控制器的角色，但是，在运行过程中，只能有一个Broker成为控制器，行使其管理和协调的职责。

Kafka控制器大量使用ZooKeeper的Watch功能实现对集群的协调管理。

**「控制器是如何被选出来的」**

实际上，Broker在启动时，会尝试去ZooKeeper中创建`/controller`节点。

Kafka当前选举控制器的规则是：**「第一个成功创建/controller节点的Broker会被指定为控制器」**。

**「控制器是做什么的」**

控制器的职责大致可以分为5种：

1.**「主题管理（创建、删除、增加分区）」**

控制器帮助我们完成对Kafka主题的创建、删除以及分区增加的操作。

2.**「分区重分配」**

3.**「Preferred领导者选举」**

Preferred领导者选举主要是Kafka为了避免部分Broker负载过重而提供的一种换Leader的方案。

4.**「集群成员管理（新增Broker、Broker主动关闭、Broker宕机）」**

包括自动检测新增Broker、Broker主动关闭及被动宕机。

这种自动检测是依赖于Watch功能和ZooKeeper临时节点组合实现的。

比如，控制器组件会利用**「Watch机制」**检查ZooKeeper的`/brokers/ids`节点下的子节点数量变更。

目前，当有新Broker启动后，它会在`/brokers`下创建专属的znode节点。

一旦创建完毕，ZooKeeper会通过Watch机制将消息通知推送给控制器，这样，控制器就能自动地感知到这个变化，进而开启后续的新增Broker作业。

侦测Broker存活性则是依赖于刚刚提到的另一个机制：**「临时节点」**。

每个Broker启动后，会在`/brokers/ids`下创建一个临时znode。

当Broker宕机或主动关闭后，该Broker与ZooKeeper的会话结束，这个znode会被自动删除。

同理，ZooKeeper的Watch机制将这一变更推送给控制器，这样控制器就能知道有Broker关闭或宕机了，从而进行善后。

5.**「数据服务」**

控制器上保存了最全的集群元数据信息，其他所有Broker会定期接收控制器发来的元数据更新请求，从而更新其内存中的缓存数据。

**「控制器故障转移（Failover）」**

**「故障转移指的是，当运行中的控制器突然宕机或意外终止时，Kafka能够快速地感知到，并立即启用备用控制器来代替之前失败的控制器」**。这个过程就被称为Failover，该过程是自动完成的，无需你手动干预。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kafkahxzszj-d9a4e4d3-0045-4755-87a4-4da396c7ad9f.jpg)

最开始时，Broker 0是控制器。当Broker 0宕机后，ZooKeeper通过Watch机制感知到并删除了`/controller`临时节点。

之后，所有存活的Broker开始竞选新的控制器身份。

Broker 3最终赢得了选举，成功地在ZooKeeper上重建了`/controller`节点。

之后，Broker 3会从ZooKeeper中读取集群元数据信息，并初始化到自己的缓存中。

至此，控制器的Failover完成，可以行使正常的工作职责了。

## 日志存储

Kafka中的消息是以主题为基本单位进行归类的，每个主题在逻辑上相互独立。

每个主题又可以分为一个或多个分区，在不考虑副本的情况下，一个分区会对应一个日志。

但设计者考虑到随着时间推移，日志文件会不断扩大，因此为了防止Log过大，设计者引入了日志分段（LogSegment）的概念，将Log切分为多个LogSegment，便于后续的消息维护和清理工作。

下图描绘了主题、分区、副本、Log、LogSegment五者之间的关系。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kafkahxzszj-da2e2224-c452-40d2-b1e6-9719e5520954.jpg)

**「LogSegment」**

在Kafka中，每个Log对象又可以划分为多个LogSegment文件，每个LogSegment文件包括一个日志数据文件和两个索引文件（偏移量索引文件和消息时间戳索引文件）。

其中，每个LogSegment中的日志数据文件大小均相等（该日志数据文件的大小可以通过在Kafka Broker的`config/server.properties`配置文件的中的**「log.segment.bytes」**进行设置，默认为1G大小（1073741824字节），在顺序写入消息时如果超出该设定的阈值，将会创建一组新的日志数据和索引文件）。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kafkahxzszj-57d8c857-af51-4d68-9dcb-86c96ba3cb8e.jpg)

## 常用参数

**「broker端配置」**

*   broker.id

每个 kafka broker 都有一个唯一的标识来表示，这个唯一的标识符即是 `broker.id`，它的默认值是 0。

这个值在 kafka 集群中必须是唯一的，这个值可以任意设定，

*   port

如果使用配置样本来启动 kafka，它会监听 9092 端口，修改 port 配置参数可以把它设置成任意的端口。

要注意，如果使用 1024 以下的端口，需要使用 root 权限启动 kakfa。

*   zookeeper.connect

用于保存 broker 元数据的 Zookeeper 地址是通过 `zookeeper.connect` 来指定的。

比如可以这么指定 `localhost:2181` 表示这个 Zookeeper 是运行在本地 2181 端口上的。

我们也可以通过 比如我们可以通过 `zk1:2181,zk2:2181,zk3:2181` 来指定 `zookeeper.connect` 的多个参数值。

该配置参数是用冒号分割的一组 `hostname:port/path` 列表，其含义如下

*   hostname 是 Zookeeper 服务器的机器名或者 ip 地址。
*   port 是 Zookeeper 客户端的端口号
*   /path 是可选择的 Zookeeper 路径，Kafka 路径是使用了 `chroot` 环境，如果不指定默认使用跟路径。

> ❝
> 
> 如果你有两套 Kafka 集群，假设分别叫它们 kafka1 和 kafka2，那么两套集群的`zookeeper.connect`参数可以这样指定：`zk1:2181,zk2:2181,zk3:2181/kafka1`和`zk1:2181,zk2:2181,zk3:2181/kafka2`
> 
> ❞

*   log.dirs

Kafka 把所有的消息都保存到磁盘上，存放这些日志片段的目录是通过 `log.dirs` 来制定的，它是用一组逗号来分割的本地系统路径，`log.dirs` 是没有默认值的，**「你必须手动指定他的默认值」**。

其实还有一个参数是 `log.dir`，这个配置是没有 `s` 的，默认情况下只用配置 `log.dirs` 就好了，比如你可以通过 `/home/kafka1,/home/kafka2,/home/kafka3` 这样来配置这个参数的值。

*   auto.create.topics.enable

默认情况下，kafka 会自动创建主题

`auto.create.topics.enable`参数建议最好设置成 false，即不允许自动创建 Topic。

**「主题相关配置」**

*   num.partitions

num.partitions 参数指定了新创建的主题需要包含多少个分区，该参数的默认值是 1。

*   default.replication.factor

这个参数比较简单，它表示 kafka保存消息的副本数。

*   log.retention.ms

Kafka 通常根据时间来决定数据可以保留多久。

默认使用`log.retention.hours`参数来配置时间，默认是 168 个小时，也就是一周。

除此之外，还有两个参数`log.retention.minutes` 和`log.retentiion.ms` 。

这三个参数作用是一样的，都是决定消息多久以后被删除，推荐使用`log.retention.ms`。

*   message.max.bytes

broker 通过设置 `message.max.bytes` 参数来限制单个消息的大小，默认是 1000 000， 也就是 1MB，如果生产者尝试发送的消息超过这个大小，不仅消息不会被接收，还会收到 broker 返回的错误消息。

*   retention.ms

规定了该主题消息被保存的时常，默认是7天，即该主题只能保存7天的消息，一旦设置了这个值，它会覆盖掉 Broker 端的全局参数值。

## 消息丢失问题

**「生产者程序丢失数据」**

目前Kafka Producer是异步发送消息的，也就是说如果你调用的是`producer.send(msg)`这个API，那么它通常会立即返回，但此时你不能认为消息发送已成功完成。

如果用这个方式，可能会有哪些因素导致消息没有发送成功呢？

其实原因有很多，例如网络抖动，导致消息压根就没有发送到Broker端；或者消息本身不合格导致Broker拒绝接收（比如消息太大了，超过了Broker的承受能力）等。

实际上，解决此问题的方法非常简单：Producer永远要使用带有回调通知的发送API，也就是说不要使用`producer.send(msg)`，而要使用`producer.send(msg, callback)`。

它能准确地告诉你消息是否真的提交成功了。

一旦出现消息提交失败的情况，你就可以有针对性地进行处理。

**「消费者程序丢失数据」**

Consumer端丢失数据主要体现在Consumer端要消费的消息不见了。

下面这张图它清晰地展示了Consumer端的位移数据。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kafkahxzszj-f8302e6a-9a80-47d8-8946-ac29343bb2af.jpg)

比如对于Consumer A而言，它当前的位移值就是9；Consumer B的位移值是11。

Consumer程序从Kafka获取到消息后开启了多个线程异步处理消息，而Consumer程序自动地向前更新位移。

假如其中某个线程运行失败了，它负责的消息没有被成功处理，但位移已经被更新了，因此这条消息对于Consumer而言实际上是丢失了。

这里的关键在于Consumer自动提交位移。

这个问题的解决方案也很简单：

**「如果是多线程异步处理消费消息，Consumer程序不要开启自动提交位移，而是要应用程序手动提交位移」**。

### 最佳实践

总结Kafka无消息丢失的配置：

1.  不要使用`producer.send(msg)`，而要使用`producer.send(msg, callback)`，一定要使用带有回调通知的send方法。
2.  设置`acks = all`，acks是Producer的一个参数，代表了你对已提交消息的定义，如果设置成all，则表明所有副本Broker都要接收到消息，该消息才算是已提交。
3.  设置retries为一个较大的值。这里的retries同样是Producer的参数，对应前面提到的Producer自动重试，当出现网络的瞬时抖动时，消息发送可能会失败，此时配置了`retries > 0`的Producer能够自动重试消息发送，避免消息丢失。
4.  设置`unclean.leader.election.enable = false`，这是Broker端的参数，它控制的是哪些Broker有资格竞选分区的Leader，如果一个Broker落后原先的Leader太多，那么它一旦成为新的Leader，必然会造成消息的丢失，故一般都要将该参数设置成false，即不允许这种情况的发生。
5.  设置`replication.factor >= 3`，这也是Broker端的参数，将消息多保存几份，目前防止消息丢失的主要机制就是冗余。
6.  设置`min.insync.replicas > 1`，这依然是Broker端参数，控制的是消息至少要被写入到多少个副本才算是已提交，设置成大于1可以提升消息持久性，在实际环境中千万不要使用默认值1。
7.  确保`replication.factor > min.insync.replicas`，如果两者相等，那么只要有一个副本挂机，整个分区就无法正常工作了，我们不仅要改善消息的持久性，防止数据丢失，还要在不降低可用性的基础上完成，推荐设置成`replication.factor = min.insync.replicas + 1`。
8.  确保消息消费完成再提交，Consumer端有个参数`enable.auto.commit`，最好把它设置成false，并采用手动提交位移的方式。

## 重复消费问题

**「消费重复的场景」**

在`enable.auto.commit` 默认值true情况下，出现重复消费的场景有以下几种：

> ❝
> 
> consumer 在消费过程中，应用进程被强制kill掉或发生异常退出。
> 
> ❞

例如在一次poll 500条消息后，消费到200条时，进程被强制kill消费到offset未提交，或出现异常退出导致消费到offset未提交。

下次重启时，依然会重新拉取500消息，造成之前消费到200条消息重复消费了两次。

解决方案：在发生异常时正确处理未提交的offset

**「消费者消费时间过长」**

`max.poll.interval.ms`参数定义了两次poll的最大间隔，它的默认值是 5 分钟，表示你的 Consumer 程序如果在 5 分钟之内无法消费完 poll 方法返回的消息，那么 Consumer 会主动发起离开组的请求，Coordinator 也会开启新一轮 Rebalance。

举例：单次拉取11条消息，每条消息耗时30s，11条消息耗时5分钟30秒，由于`max.poll.interval.ms` 默认值5分钟，所以消费者无法在5分钟内消费完，consumer会离开组，导致rebalance。

在消费完11条消息后，consumer会重新连接broker，再次rebalance，因为上次消费的offset未提交，再次拉取的消息是之前消费过的消息，造成重复消费。

**「解决方案：」**

1、提高消费能力，提高单条消息的处理速度；根据实际场景可讲`max.poll.interval.ms`值设置大一点，避免不必要的rebalance；可适当减小`max.poll.records`的值，默认值是500，可根据实际消息速率适当调小。

2、生成消息时，可加入唯一标识符如消息id，在消费端，保存最近的1000条消息id存入到redis或mysql中，消费的消息时通过前置去重。

## 消息顺序问题

我们都知道`kafka`的`topic`是无序的，但是一个`topic`包含多个`partition`，每个`partition`内部是有序的

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kafkahxzszj-1d4b9445-6b7f-4cf5-a54c-3c52e371d9a7.jpg)

**「乱序场景1」**

因为一个topic可以有多个partition，kafka只能保证partition内部有序

**「解决方案」**

1、可以设置topic，有且只有一个partition

2、根据业务需要，需要顺序的 指定为同一个partition

3、根据业务需要，比如同一个订单，使用同一个key，可以保证分配到同一个partition上

**「乱序场景2」**

对于同一业务进入了同一个消费者组之后，用了多线程来处理消息，会导致消息的乱序

**「解决方案」**

消费者内部根据线程数量创建等量的内存队列，对于需要顺序的一系列业务数据，根据key或者业务数据，放到同一个内存队列中，然后线程从对应的内存队列中取出并操作

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-kafkahxzszj-7fb38f3c-b275-4f33-bbc6-c52f2cc29930.jpg)

**「通过设置相同key来保证消息有序性，会有一点缺陷：」**

例如消息发送设置了重试机制，并且异步发送，消息A和B设置相同的key，业务上A先发，B后发，由于网络或者其他原因A发送失败，B发送成功；A由于发送失败就会重试且重试成功，这时候消息顺序B在前A在后，与业务发送顺序不一致，如果需要解决这个问题，需要设置参数`max.in.flight.requests.per.connection=1`，其含义是限制客户端在单个连接上能够发送的未响应请求的个数，设置此值是1表示kafka broker在响应请求之前client不能再向同一个broker发送请求，这个参数默认值是5

> ❝
> 
> 官方文档说明，这个参数如果大于1，由于重试消息顺序可能重排
> 
> ❞

## 高性能原因

**「顺序读写」**

kafka的消息是不断追加到文件中的，这个特性使`kafka`可以充分利用磁盘的顺序读写性能

顺序读写不需要硬盘磁头的寻道时间，只需很少的扇区旋转时间，所以速度远快于随机读写

Kafka 可以配置异步刷盘，不开启同步刷盘，异步刷盘不需要等写入磁盘后返回消息投递的 ACK，所以它提高了消息发送的吞吐量，降低了请求的延时

**「零拷贝」**

传统的 IO 流程，需要先把数据拷贝到内核缓冲区，再从内核缓冲拷贝到用户空间，应用程序处理完成以后，再拷贝回内核缓冲区

这个过程中发生了多次数据拷贝

为了减少不必要的拷贝，`Kafka` 依赖 Linux 内核提供的 `Sendfile` 系统调用

在 Sendfile 方法中，数据在内核缓冲区完成输入和输出，不需要拷贝到用户空间处理，这也就避免了重复的数据拷贝

在具体的操作中，Kafka 把所有的消息都存放在单独的文件里，在消息投递时直接通过 `Sendfile` 方法发送文件，减少了上下文切换，因此大大提高了性能

**「MMAP技术」**

除了 `Sendfile` 之外，还有一种零拷贝的实现技术，即 Memory Mapped Files

Kafka 使用 `Memory Mapped Files` 完成内存映射，`Memory Mapped Files` 对文件的操作不是 `write/read`，而是直接对内存地址的操作，如果是调用文件的 `read` 操作，则把数据先读取到内核空间中，然后再复制到用户空间，但 `MMAP`可以将文件直接映射到用户态的内存空间，省去了用户空间到内核空间复制的开销

Producer生产的数据持久化到broker，采用mmap文件映射，实现顺序的快速写入

Customer从broker读取数据，采用sendfile，将磁盘文件读到OS内核缓冲区后，直接转到socket buffer进行网络发送。

**「批量发送读取」**

Kafka 的批量包括批量写入、批量发布等。它在消息投递时会将消息缓存起来，然后批量发送

同样，消费端在消费消息时，也不是一条一条处理的，而是批量进行拉取，提高了消息的处理速度

**「数据压缩」**

Kafka还支持对消息集合进行压缩，`Producer`可以通过`GZIP`或`Snappy`格式对消息集合进行压缩

压缩的好处就是减少传输的数据量，减轻对网络传输的压力

Producer压缩之后，在`Consumer`需进行解压，虽然增加了CPU的工作，但在对大数据处理上，瓶颈在网络上而不是CPU，所以这个成本很值得

**「分区机制」**

kafka中的topic中的内容可以被分为多partition存在，每个partition又分为多个段segment，所以每次操作都是针对一小部分做操作，很轻便，并且增加`并行操作`的能力

## 常见面试题

**「Kafka是Push还是Pull模式？」**

Kafka最初考虑的问题是，customer应该从brokes拉取消息还是brokers将消息推送到consumer。

在这方面，Kafka遵循了一种大部分消息系统共同的传统的设计：producer将消息推送到broker，consumer从broker拉取消息。

push模式由broker决定消息推送的速率，对于不同消费速率的consumer就不太好处理了。

消息系统都致力于让consumer以最大的速率最快速的消费消息，push模式下，当broker推送的速率远大于consumer消费的速率时，consumer恐怕就要崩溃了。

> ❝
> 
> Kafka中的Producer和Consumer采用的是Push-and-Pull模式，即Producer向Broker Push消息，Consumer从Broker Pull消息。
> 
> ❞

Pull模式的一个好处是consumer可以自主决定是否批量的从broker拉取数据。

Pull有个缺点是，如果broker没有可供消费的消息，将导致consumer不断在循环中轮询，直到新消息到达。

**「Kafka如何保证高可用?」**

[面试题：Kafka如何保证高可用？有图有真相](https://mp.weixin.qq.com/s?__biz=MzUyOTg1OTkyMA==&mid=2247484980&idx=1&sn=6e0c7112dd72d0edc284009e7503b2ac&scene=21#wechat_redirect)

**「Kafk的使用场景」**

业界Kafka实际应用场景

> ❝
> 
> 异步通信
> 
> ❞

消息中间件在异步通信中用的最多，很多业务流程中，如果所有步骤都同步进行可能会导致核心流程耗时非常长，更重要的是所有步骤都同步进行一旦非核心步骤失败会导致核心流程整体失败，因此在很多业务流程中Kafka就充当了异步通信角色。

> ❝
> 
> 日志同步
> 
> ❞

大规模分布式系统中的机器非常多而且分散在不同机房中，分布式系统带来的一个明显问题就是业务日志的查看、追踪和分析等行为变得十分困难，对于集群规模在百台以上的系统，查询线上日志很恐怖。

为了应对这种场景统一日志系统应运而生，日志数据都是海量数据，通常为了不给系统带来额外负担一般会采用异步上报，这里Kafka以其高吞吐量在日志处理中得到了很好的应用。

> ❝
> 
> 实时计算
> 
> ❞

随着据量的增加，离线的计算会越来越慢，难以满足用户在某些场景下的实时性要求，因此很多解决方案中引入了实时计算。

很多时候，即使是海量数据，我们也希望即时去查看一些数据指标，实时流计算应运而生。

实时流计算有两个特点，一个是实时，随时可以看数据；另一个是流。

>转载链接：[https://mp.weixin.qq.com/s?__biz=MzUyOTg1OTkyMA==&mid=2247487063&idx=1&sn=d7c65359630a67695a079d62fce989c0&chksm=fa5bda68cd2c537ed32003d5a98705e85c6b7a47afe0f837cebd27a5f33a8a11231d3eb9c1c5&scene=27#wechat_redirect](https://mp.weixin.qq.com/s?__biz=MzUyOTg1OTkyMA==&mid=2247487063&idx=1&sn=d7c65359630a67695a079d62fce989c0&chksm=fa5bda68cd2c537ed32003d5a98705e85c6b7a47afe0f837cebd27a5f33a8a11231d3eb9c1c5&scene=27#wechat_redirect)，出处：月伴飞鱼，整理：沉默王二
