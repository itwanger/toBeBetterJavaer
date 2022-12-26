---
title: 新来个技术总监，把RabbitMQ讲的那叫一个透彻，佩服！
shortTitle: 入门RabbitMQ，这一篇绝对够！
description: 从原理到实践，从0到1带你入门RabbitMQ，需要学习RabbitMQ的同学，欢迎来戳~~
author: 楼仔
category:
  - 微信公众号
head:
  - - meta
    - name: description
      content: 从原理到实践，从0到1带你入门RabbitMQ，需要学习RabbitMQ的同学，欢迎来戳~~
---

> [二哥编程知识星球](https://mp.weixin.qq.com/s/3RVsFZ17F0JzoHCLKbQgGw) （戳链接加入）正式上线了，来和 **310 多名** 小伙伴一起打怪升级吧！这是一个 Java 学习指南 + 编程实战的私密圈子，你可以向二哥提问、帮你制定学习计划、跟着二哥一起做实战项目，冲冲冲。<br><br>
> Java程序员进阶之路网址：[https://tobebetterjavaer.com](https://tobebetterjavaer.com)


常见的消息队列很多，主要包括 RabbitMQ、Kafka、RocketMQ 和 ActiveMQ。这篇文章只讲 RabbitMQ，属于基础入门篇，但是肯定不 Low，太 Low 的文章我也不会写。

如果你是 RabbitMQ 大牛，这篇文章不适合你，如果你对 RabbitMQ 只停留在使用，或者初步了解，甚至完全不了解，这篇文章对你来说就非常适用。

文章非常长，如果你能一次性看完，“大神，请收下我的膝盖”，所以建议先收藏，啥时需要面试，或者工作中遇到了，可以再慢慢看，先来一副思维导图。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-rumrabbitmqzypjdg-34140dde-18f6-4875-a6a7-dcf2c61168e8.jpg)

# 消息队列

## 消息队列模式

消息队列目前主要 2 种模式，分别为“点对点模式”和“发布/订阅模式”。

### 点对点模式

一个具体的消息只能由一个消费者消费。多个生产者可以向同一个消息队列发送消息；但是，一个消息在被一个消息者处理的时候，这个消息在队列上会被锁住或者被移除并且其他消费者无法处理该消息。需要额外注意的是，如果消费者处理一个消息失败了，消息系统一般会把这个消息放回队列，这样其他消费者可以继续处理。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-rumrabbitmqzypjdg-20db3809-0b3f-4c5b-bc24-05f5b80d3dc9.jpg)

### 发布/订阅模式

单个消息可以被多个订阅者并发的获取和处理。一般来说，订阅有两种类型：

- 临时（ephemeral）订阅，这种订阅只有在消费者启动并且运行的时候才存在。一旦消费者退出，相应的订阅以及尚未处理的消息就会丢失。
- 持久（durable）订阅，这种订阅会一直存在，除非主动去删除。消费者退出后，消息系统会继续维护该订阅，并且后续消息可以被继续处理。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-rumrabbitmqzypjdg-637e6454-2017-407f-b94f-59cd4e5b7200.jpg)

## 衡量标准

对消息队列进行技术选型时，需要通过以下指标衡量你所选择的消息队列，是否可以满足你的需求：

- 消息顺序：发送到队列的消息，消费时是否可以保证消费的顺序，比如 A 先下单，B 后下单，应该是 A 先去扣库存，B 再去扣，顺序不能反。
- 消息路由：根据路由规则，只订阅匹配路由规则的消息，比如有 A/B 两者规则的消息，消费者可以只订阅 A 消息，B 消息不会消费。
- 消息可靠性：是否会存在丢消息的情况，比如有 A/B 两个消息，最后只有 B 消息能消费，A 消息丢失。
- 消息时序：主要包括“消息存活时间”和“延迟/预定的消息”，“消息存活时间”表示生产者可以对消息设置 TTL，如果超过该 TTL，消息会自动消失；“延迟/预定的消息”指的是可以延迟或者预订消费消息，比如延时 5 分钟，那么消息会 5 分钟后才能让消费者消费，时间未到的话，是不能消费的。
- 消息留存：消息消费成功后，是否还会继续保留在消息队列。
- 容错性：当一条消息消费失败后，是否有一些机制，保证这条消息是一种能成功，比如异步第三方退款消息，需要保证这条消息消费掉，才能确定给用户退款成功，所以必须保证这条消息消费成功的准确性。
- 伸缩：当消息队列性能有问题，比如消费太慢，是否可以快速支持库容；当消费队列过多，浪费系统资源，是否可以支持缩容。
- 吞吐量：支持的最高并发数。

# RabbitMQ 原理初探

RabbitMQ 2007 年发布，是使用 Erlang 语言开发的开源消息队列系统，基于 AMQP 协议来实现。

RocketMQ 是阿里开源的消息中间件，它是纯 Java 开发，具有高性能、高可靠、高实时、适合大规模分布式系统应用的特点。

## 基本概念

提到 RabbitMQ，就不得不提 AMQP 协议。AMQP 协议是具有现代特征的二进制协议。是一个提供统一消息服务的应用层标准高级消息队列协议，是应用层协议的一个开放标准，为面向消息的中间件设计。先了解一下 AMQP 协议中间的几个重要概念：

- Server：接收客户端的连接，实现 AMQP 实体服务。
- Connection：连接，应用程序与 Server 的网络连接，TCP 连接。
- Channel：信道，消息读写等操作在信道中进行。客户端可以建立多个信道，每个信道代表一个会话任务。
- Message：消息，应用程序和服务器之间传送的数据，消息可以非常简单，也可以很复杂。由 Properties 和 Body 组成。Properties 为外包装，可以对消息进行修饰，比如消息的优先级、延迟等高级特性；Body 就是消息体内容。
- Virtual Host：虚拟主机，用于逻辑隔离。一个虚拟主机里面可以有若干个 Exchange 和 Queue，同一个虚拟主机里面不能有相同名称的 Exchange 或 Queue。
- Exchange：交换器，接收消息，按照路由规则将消息路由到一个或者多个队列。如果路由不到，或者返回给生产者，或者直接丢弃。RabbitMQ 常用的交换器常用类型有 direct、topic、fanout、headers 四种，后面详细介绍。
- Binding：绑定，交换器和消息队列之间的虚拟连接，绑定中可以包含一个或者多个 RoutingKey。
- RoutingKey：路由键，生产者将消息发送给交换器的时候，会发送一个 RoutingKey，用来指定路由规则，这样交换器就知道把消息发送到哪个队列。路由键通常为一个“.”分割的字符串，例如“com.rabbitmq”。
- Queue：消息队列，用来保存消息，供消费者消费。

## 系统架构

AMQP 协议模型由三部分组成：生产者、消费者和服务端。生产者是投递消息的一方，首先连接到 Server，建立一个连接，开启一个信道；然后生产者声明交换器和队列，设置相关属性，并通过路由键将交换器和队列进行绑定。同理，消费者也需要进行建立连接，开启信道等操作，便于接收消息。接着生产者就可以发送消息，发送到服务端中的虚拟主机，虚拟主机中的交换器根据路由键选择路由规则，然后发送到不同的消息队列中，这样订阅了消息队列的消费者就可以获取到消息，进行消费。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-rumrabbitmqzypjdg-13f7bb94-3e73-4ea7-8206-4aa1f5281920.jpg)

> 总结一下整体过程：生产者投递消息 -> 和 Server 建立连接，开启信道 -> 声明交换器和队列，并通过路由键将交换机和队列绑定 -> 投递消息到虚拟主机 -> 消息发送到消息队列 -> 消费者建立连接 -> 消费消息 -> 关系信道和连接。

## 常用交换器

RabbitMQ 常用的交换器类型有 direct、topic、fanout、headers 四种：

- Direct Exchange：见文知意，直连交换机意思是此交换机需要绑定一个队列，要求该消息与一个特定的路由键完全匹配。简单点说就是一对一的，点对点的发送。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-rumrabbitmqzypjdg-caa74741-a5c1-430c-9f32-ee4db7a9ef9f.jpg)

- Fanout Exchange：这种类型的交换机需要将队列绑定到交换机上。一个发送到交换机的消息都会被转发到与该交换机绑定的所有队列上。很像子网广播，每台子网内的主机都获得了一份复制的消息。简单点说就是发布订阅。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-rumrabbitmqzypjdg-05cb2a20-96ba-4693-8265-71ae30bf3815.jpg)

- Topic Exchange：直接翻译的话叫做主题交换机，如果从用法上面翻译可能叫通配符交换机会更加贴切。这种交换机是使用通配符去匹配，路由到对应的队列。通配符有两种："\*" 、 "#"。需要注意的是通配符前面必须要加上"."符号。

- \*符号：有且只匹配一个词。比如 a.\*可以匹配到"a.b"、"a.c"，但是匹配不了"a.b.c"。
- #符号：匹配一个或多个词。比如"rabbit.#"既可以匹配到"rabbit.a.b"、"rabbit.a"，也可以匹配到"rabbit.a.b.c"。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-rumrabbitmqzypjdg-8ed77369-1acb-4495-a677-59f3fd51c4f3.jpg)

- Headers Exchange：这种交换机用的相对没这么多。它跟上面三种有点区别，它的路由不是用 routingKey 进行路由匹配，而是在匹配请求头中所带的键值进行路由。创建队列需要设置绑定的头部信息，有两种模式：全部匹配和部分匹配。如上图所示，交换机会根据生产者发送过来的头部信息携带的键值去匹配队列绑定的键值，路由到对应的队列。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-rumrabbitmqzypjdg-514cd8c6-b866-490a-b1c2-39be72b4c5f3.jpg)

## 消费原理

我们先看几个基本概念：

- broker：每个节点运行的服务程序，功能为维护该节点的队列的增删以及转发队列操作请求。
- master queue：每个队列都分为一个主队列和若干个镜像队列。
- mirror queue：镜像队列，作为 master queue 的备份。在 master queue 所在节点挂掉之后，系统把 mirror queue 提升为 master queue，负责处理客户端队列操作请求。注意，mirror queue 只做镜像，设计目的不是为了承担客户端读写压力。

集群中有两个节点，每个节点上有一个 broker，每个 broker 负责本机上队列的维护，并且 borker 之间可以互相通信。集群中有两个队列 A 和 B，每个队列都分为 master queue 和 mirror queue（备份）。那么队列上的生产消费怎么实现的呢？

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-rumrabbitmqzypjdg-0ee879db-f878-4994-9a69-532b54b92ab9.jpg)

对于消费队列，如下图有两个 consumer 消费队列 A，这两个 consumer 连在了集群的不同机器上。RabbitMQ 集群中的任何一个节点都拥有集群上所有队列的元信息，所以连接到集群中的任何一个节点都可以，主要区别在于有的 consumer 连在 master queue 所在节点，有的连在非 master queue 节点上。

因为 mirror queue 要和 master queue 保持一致，故需要同步机制，正因为一致性的限制，导致所有的读写操作都必须都操作在 master queue 上（想想，为啥读也要从 master queue 中读？和数据库读写分离是不一样的），然后由 master 节点同步操作到 mirror queue 所在的节点。即使 consumer 连接到了非 master queue 节点，该 consumer 的操作也会被路由到 master queue 所在的节点上，这样才能进行消费。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-rumrabbitmqzypjdg-e0494902-ef58-4fa1-b775-05caa5ba5d97.jpg)

对于生成队列，原理和消费一样，如果连接到非 master queue 节点，则路由过去。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-rumrabbitmqzypjdg-8863e133-8598-4cbb-ab9b-09b65c0f75fe.jpg)

> 所以，到这里小伙伴们就可以看到 RabbitMQ 的不足：由于 master queue 单节点，导致性能瓶颈，吞吐量受限。虽然为了提高性能，内部使用了 Erlang 这个语言实现，但是终究摆脱不了架构设计上的致命缺陷。

## 高级特性

### 过期时间

Time To Live，也就是生存时间，是一条消息在队列中的最大存活时间，单位是毫秒，下面看看 RabbitMQ 过期时间特性：

- RabbitMQ 可以对消息和队列设置 TTL。
- RabbitMQ 支持设置消息的过期时间，在消息发送的时候可以进行指定，每条消息的过期时间可以不同。
- RabbitMQ 支持设置队列的过期时间，从消息入队列开始计算，直到超过了队列的超时时间配置，那么消息会变成死信，自动清除。
- 如果两种方式一起使用，则过期时间以两者中较小的那个数值为准。
- 当然也可以不设置 TTL，不设置表示消息不会过期；如果设置为 0，则表示除非此时可以直接将消息投递到消费者，否则该消息将被立即丢弃。

### 消息确认

为了保证消息从队列可靠地到达消费者，RabbitMQ 提供了消息确认机制。消费者订阅队列的时候，可以指定 autoAck 参数，当 autoAck 为 true 的时候，RabbitMQ 采用自动确认模式，RabbitMQ 自动把发送出去的消息设置为确认，然后从内存或者硬盘中删除，而不管消费者是否真正消费到了这些消息。当 autoAck 为 false 的时候，RabbitMQ 会等待消费者回复的确认信号，收到确认信号之后才从内存或者磁盘中删除消息。

消息确认机制是 RabbitMQ 消息可靠性投递的基础，只要设置 autoAck 参数为 false，消费者就有足够的时间处理消息，不用担心处理消息的过程中消费者进程挂掉后消息丢失的问题。

### 持久化

消息的可靠性是 RabbitMQ 的一大特色，那么 RabbitMQ 是如何保证消息可靠性的呢？答案就是消息持久化。持久化可以防止在异常情况下丢失数据。RabbitMQ 的持久化分为三个部分：交换器持久化、队列持久化和消息的持久化。

交换器持久化可以通过在声明队列时将 durable 参数设置为 true。如果交换器不设置持久化，那么在 RabbitMQ 服务重启之后，相关的交换器元数据会丢失，不过消息不会丢失，只是不能将消息发送到这个交换器了。

队列的持久化能保证其本身的元数据不会因异常情况而丢失，但是不能保证内部所存储的消息不会丢失。要确保消息不会丢失，需要将其设置为持久化。队列的持久化可以通过在声明队列时将 durable 参数设置为 true。

设置了队列和消息的持久化，当 RabbitMQ 服务重启之后，消息依然存在。如果只设置队列持久化或者消息持久化，重启之后消息都会消失。

当然，也可以将所有的消息都设置为持久化，但是这样做会影响 RabbitMQ 的性能，因为磁盘的写入速度比内存的写入要慢得多。对于可靠性不是那么高的消息可以不采用持久化处理以提高整体的吞吐量。鱼和熊掌不可兼得，关键在于选择和取舍。在实际中，需要根据实际情况在可靠性和吞吐量之间做一个权衡。

### 死信队列

当消息在一个队列中变成死信之后，他能被重新发送到另一个交换器中，这个交换器成为死信交换器，与该交换器绑定的队列称为死信队列。消息变成死信有下面几种情况：

- 消息被拒绝。
- 消息过期
- 队列达到最大长度

DLX 也是一个正常的交换器，和一般的交换器没有区别，他能在任何的队列上面被指定，实际上就是设置某个队列的属性。当这个队列中有死信的时候，RabbitMQ 会自动将这个消息重新发送到设置的交换器上，进而被路由到另一个队列，我们可以监听这个队列中消息做相应的处理。

死信队列有什么用？当发生异常的时候，消息不能够被消费者正常消费，被加入到了死信队列中。后续的程序可以根据死信队列中的内容分析当时发生的异常，进而改善和优化系统。

### 延迟队列

一般的队列，消息一旦进入队列就会被消费者立即消费。延迟队列就是进入该队列的消息会被消费者延迟消费，延迟队列中存储的对象是的延迟消息，“延迟消息”是指当消息被发送以后，等待特定的时间后，消费者才能拿到这个消息进行消费。

延迟队列用于需要延迟工作的场景。最常见的使用场景：淘宝或者天猫我们都使用过，用户在下单之后通常有 30 分钟的时间进行支付，如果这 30 分钟之内没有支付成功，那么订单就会自动取消。除了延迟消费，延迟队列的典型应用场景还有延迟重试。比如消费者从队列里面消费消息失败了，可以延迟一段时间以后进行重试。

## 特性分析

这里才是内容的重点，不仅需要知道 Rabbit 的特性，还需要知道支持这些特性的原因：

- 消息路由（支持）：RabbitMQ 可以通过不同的交换器支持不同种类的消息路由；
- 消息有序（不支持）：当消费消息时，如果消费失败，消息会被放回队列，然后重新消费，这样会导致消息无序；
- 消息时序（非常好）：通过延时队列，可以指定消息的延时时间，过期时间 TTL 等；
- 容错处理（非常好）：通过交付重试和死信交换器（DLX）来处理消息处理故障；
- 伸缩（一般）：伸缩其实没有非常智能，因为即使伸缩了，master queue 还是只有一个，负载还是只有这一个 master queue 去抗，所以我理解 RabbitMQ 的伸缩很弱（个人理解）。
- 持久化（不太好）：没有消费的消息，可以支持持久化，这个是为了保证机器宕机时消息可以恢复，但是消费过的消息，就会被马上删除，因为 RabbitMQ 设计时，就不是为了去存储历史数据的。
- 消息回溯（不支持）：因为消息不支持永久保存，所以自然就不支持回溯。
- 高吞吐（中等）：因为所有的请求的执行，最后都是在 master queue，它的这个设计，导致单机性能达不到十万级的标准。

# RabbitMQ 环境搭建

因为我用的是 Mac，所以直接可以参考官网：

> https://www.rabbitmq.com/install-homebrew.html

需要注意的是，一定需要先执行：

```
brew update
```

然后再执行：

```
brew install rabbitmq
```

> 之前没有执行 brew update，直接执行 brew install rabbitmq 时，会报各种各样奇怪的错误，其中“403 Forbidde”居多。

但是在执行“brew install rabbitmq”，会自动安装其它的程序，如果你使用源码安装 Rabbitmq，因为启动该服务依赖 erlang 环境，所以你还需手动安装 erlang，但是目前官方已经一键给你搞定，会自动安装 Rabbitmq 依赖的所有程序，是不是很棒！

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-rumrabbitmqzypjdg-82eac98d-a9ef-4c3c-9f54-ad46d29bd938.jpg)

最后执行成功的输出如下：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-rumrabbitmqzypjdg-9ea37474-44c7-4174-8560-2dc45483dde4.jpg)

启动服务：

```
# 启动方式1：后台启动
brew services start rabbitmq
# 启动方式2：当前窗口启动
cd /usr/local/Cellar/rabbitmq/3.8.19
rabbitmq-server
```

在浏览器输入：

```
http://localhost:15672/
```

会出现 RabbitMQ 后台管理界面（用户名和密码都为 guest）：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-rumrabbitmqzypjdg-27810abb-d85f-4842-8300-dd4451823292.jpg)

通过 brew 安装，一行命令搞定，真香！

# RabbitMQ 测试

## 添加账号

首先得启动 mq

```
## 添加账号
./rabbitmqctl add_user admin admin
## 添加访问权限
./rabbitmqctl set_permissions -p "/" admin ".*" ".*" ".*"
## 设置超级权限
./rabbitmqctl set_user_tags admin administrator
```

## 编码实测

因为代码中引入了 java 8 的特性，pom 引入依赖：

```
<dependency>
    <groupId>com.rabbitmq</groupId>
    <artifactId>amqp-client</artifactId>
    <version>5.5.1</version>
</dependency>
<plugins>
    <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <configuration>
            <source>8</source>
            <target>8</target>
        </configuration>
    </plugin>
</plugins>
```

开始写代码：

```
public class RabbitMqTest {
    //消息队列名称
    private final static String QUEUE_NAME = "hello";
    @Test
    public void send() throws java.io.IOException, TimeoutException {
        //创建连接工程
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("127.0.0.1");
        factory.setPort(5672);
        factory.setUsername("admin");
        factory.setPassword("admin");
        //创建连接
        Connection connection = factory.newConnection();
        //创建消息通道
        Channel channel = connection.createChannel();
        //生成一个消息队列
        channel.queueDeclare(QUEUE_NAME, true, false, false, null);
        for (int i = 0; i < 10; i++) {
            String message = "Hello World RabbitMQ count: " + i;
            //发布消息，第一个参数表示路由（Exchange名称），为""则表示使用默认消息路由
            channel.basicPublish("", QUEUE_NAME, null, message.getBytes());
            System.out.println(" [x] Sent '" + message + "'");
        }
        //关闭消息通道和连接
        channel.close();
        connection.close();
    }
    @Test
    public void consumer() throws java.io.IOException, TimeoutException {
        //创建连接工厂
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("127.0.0.1");
        factory.setPort(5672);
        factory.setUsername("admin");
        factory.setPassword("admin");
        //创建连接
        Connection connection = factory.newConnection();
        //创建消息信道
        final Channel channel = connection.createChannel();
        //消息队列
        channel.queueDeclare(QUEUE_NAME, true, false, false, null);
        System.out.println("[*] Waiting for message. To exist press CTRL+C");
        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), "UTF-8");
            System.out.println(" [x] Received '" + message + "'");
        };
        channel.basicConsume(QUEUE_NAME, true, deliverCallback, consumerTag -> {});
    }
}
```

执行 send()后控制台输出：

```
[x] Sent 'Hello World RabbitMQ count: 0'
[x] Sent 'Hello World RabbitMQ count: 1'
[x] Sent 'Hello World RabbitMQ count: 2'
[x] Sent 'Hello World RabbitMQ count: 3'
[x] Sent 'Hello World RabbitMQ count: 4'
[x] Sent 'Hello World RabbitMQ count: 5'
[x] Sent 'Hello World RabbitMQ count: 6'
[x] Sent 'Hello World RabbitMQ count: 7'
[x] Sent 'Hello World RabbitMQ count: 8'
[x] Sent 'Hello World RabbitMQ count: 9'
```

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-rumrabbitmqzypjdg-cbbb924c-bd68-4dae-abcc-b8e7925556ee.jpg)

执行 consumer()后：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-rumrabbitmqzypjdg-60b9362d-a475-48b9-bcc6-86e61c02c637.jpg)

> 示例中的代码讲解，可以直接参考官网：https://www.rabbitmq.com/tutorials/tutorial-one-java.html

# 基本使用姿势

## 公共代码封装

封装工厂类：

```
public class RabbitUtil {
    public static ConnectionFactory getConnectionFactory() {
        //创建连接工程，下面给出的是默认的case
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("127.0.0.1");
        factory.setPort(5672);
        factory.setUsername("admin");
        factory.setPassword("admin");
        factory.setVirtualHost("/");
        return factory;
    }
}
```

封装生成者：

```
public class MsgProducer {
    public static void publishMsg(String exchange, BuiltinExchangeType exchangeType, String toutingKey, String message) throws IOException, TimeoutException {
        ConnectionFactory factory = RabbitUtil.getConnectionFactory();
        //创建连接
        Connection connection = factory.newConnection();
        //创建消息通道
        Channel channel = connection.createChannel();
        // 声明exchange中的消息为可持久化，不自动删除
        channel.exchangeDeclare(exchange, exchangeType, true, false, null);
        // 发布消息
        channel.basicPublish(exchange, toutingKey, null, message.getBytes());
        System.out.println("Sent '" + message + "'");
        channel.close();
        connection.close();
    }
}
```

封装消费者：

```
public class MsgConsumer {
    public static void consumerMsg(String exchange, String queue, String routingKey)
            throws IOException, TimeoutException {
        ConnectionFactory factory = RabbitUtil.getConnectionFactory();
        //创建连接
        Connection connection = factory.newConnection();
        //创建消息信道
        final Channel channel = connection.createChannel();
        //消息队列
        channel.queueDeclare(queue, true, false, false, null);
        //绑定队列到交换机
        channel.queueBind(queue, exchange, routingKey);
        System.out.println("[*] Waiting for message. To exist press CTRL+C");
        Consumer consumer = new DefaultConsumer(channel) {
            @Override
            public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties,
                                       byte[] body) throws IOException {
                String message = new String(body, "UTF-8");
                try {
                    System.out.println(" [x] Received '" + message);
                } finally {
                    System.out.println(" [x] Done");
                    channel.basicAck(envelope.getDeliveryTag(), false);
                }
            }
        };
        // 取消自动ack
        channel.basicConsume(queue, false, consumer);
    }
}
```

## Direct 方式

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-rumrabbitmqzypjdg-b9b5c7cf-c082-4610-9f8d-ef07ef2485de.jpg)

### Direct 示例

生产者：

```
public class DirectConsumer {
    private static final String exchangeName = "direct.exchange";
    public void msgConsumer(String queueName, String routingKey) {
        try {
            MsgConsumer.consumerMsg(exchangeName, queueName, routingKey);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (TimeoutException e) {
            e.printStackTrace();
        }
    }
    public static void main(String[] args) throws InterruptedException {
        DirectConsumer consumer = new DirectConsumer();
        String[] routingKey = new String[]{"aaa", "bbb", "ccc"};
        String[] queueNames = new String[]{"qa", "qb", "qc"};
        for (int i = 0; i < 3; i++) {
            consumer.msgConsumer(queueNames[i], routingKey[i]);
        }
        Thread.sleep(1000 * 60 * 100);
    }
}
```

执行生产者，往消息队列中放入 10 条消息，其中 key 分别为“aaa”、“bbb”和“ccc”，分别放入 qa、qb、qc 三个队列：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-rumrabbitmqzypjdg-d4b0bcca-700a-4e6c-9b11-771df0efa8bd.jpg)

下面是 qa 队列的信息：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-rumrabbitmqzypjdg-e73bc28d-cb62-4068-bb90-158297797ef4.jpg)

消费者：

```
public class DirectProducer {
    private static final String EXCHANGE_NAME = "direct.exchange";
    public void publishMsg(String routingKey, String msg) {
        try {
            MsgProducer.publishMsg(EXCHANGE_NAME, BuiltinExchangeType.DIRECT, routingKey, msg);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public static void main(String[] args) throws InterruptedException {
        DirectProducer directProducer = new DirectProducer();
        String[] routingKey = new String[]{"aaa", "bbb", "ccc"};
        String msg = "hello >>> ";
        for (int i = 0; i < 10; i++) {
            directProducer.publishMsg(routingKey[i % 3], msg + i);
        }
        System.out.println("----over-------");
        Thread.sleep(1000 * 60 * 100);
    }
}
```

执行后的输出：

```
[*] Waiting for message. To exist press CTRL+C
 [x] Received 'hello >>> 0
 [x] Done
 [x] Received 'hello >>> 3
 [x] Done
 [x] Received 'hello >>> 6
 [x] Done
 [x] Received 'hello >>> 9
 [x] Done
[*] Waiting for message. To exist press CTRL+C
 [x] Received 'hello >>> 1
 [x] Done
 [x] Received 'hello >>> 4
 [x] Done
 [x] Received 'hello >>> 7
 [x] Done
[*] Waiting for message. To exist press CTRL+C
 [x] Received 'hello >>> 2
 [x] Done
 [x] Received 'hello >>> 5
 [x] Done
 [x] Received 'hello >>> 8
 [x] Done
```

可以看到，分别从 qa、qb、qc 中将不同的 key 的数据消费掉。

### 问题探讨

> 有个疑问：这个队列的名称 qa、qb 和 qc 是 RabbitMQ 自动生成的么，我们可以指定队列名称么？

我做了个简单的实验，我把消费者代码修改了一下：

```
public static void main(String[] args) throws InterruptedException {
    DirectConsumer consumer = new DirectConsumer();
    String[] routingKey = new String[]{"aaa", "bbb", "ccc"};
    String[] queueNames = new String[]{"qa", "qb", "qc1"}; // 将qc修改为qc1
    for (int i = 0; i < 3; i++) {
        consumer.msgConsumer(queueNames[i], routingKey[i]);
    }
    Thread.sleep(1000 * 60 * 100);
}
```

执行后如下图所示：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-rumrabbitmqzypjdg-95945700-ce3b-4995-bd36-97501c4eddae.jpg)

我们可以发现，多了一个 qc1，所以可以判断这个界面中的 queues，是消费者执行时，会将消费者指定的队列名称和 direct.exchange 绑定，绑定的依据就是 key。

当我们把队列中的数据全部消费掉，然后重新执行生成者后，会发现 qc 和 qc1 中都有 3 条待消费的数据，因为绑定的 key 都是“ccc”，所以两者的数据是一样的：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-rumrabbitmqzypjdg-babce6a2-ffd3-4de1-aa09-8ba6f6330358.jpg)

绑定关系如下：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-rumrabbitmqzypjdg-2204540e-db4a-4c2b-8eb6-4dfd58885afc.jpg)

> 注意：当没有 Queue 绑定到 Exchange 时，往 Exchange 中写入的消息也不会重新分发到之后绑定的 queue 上。

> 思考：不执行消费者，看不到这个 Queres 中信息，我其实可以把这个界面理解为消费者信息界面。不过感觉还是怪怪的，这个 queues 如果是消费者信息，就不应该叫 queues，我理解 queues 应该是 RabbitMQ 中实际存放数据的 queues，难道是我理解错了？

## Fanout 方式（指定队列）

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-rumrabbitmqzypjdg-3615265c-b496-482d-a241-7166910a23ef.jpg)

生产者封装：

```
public class FanoutProducer {
    private static final String EXCHANGE_NAME = "fanout.exchange";
    public void publishMsg(String routingKey, String msg) {
        try {
            MsgProducer.publishMsg(EXCHANGE_NAME, BuiltinExchangeType.FANOUT, routingKey, msg);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public static void main(String[] args) {
        FanoutProducer directProducer = new FanoutProducer();
        String msg = "hello >>> ";
        for (int i = 0; i < 10; i++) {
            directProducer.publishMsg("", msg + i);
        }
    }
}
```

消费者：

```
public class FanoutConsumer {
    private static final String EXCHANGE_NAME = "fanout.exchange";
    public void msgConsumer(String queueName, String routingKey) {
        try {
            MsgConsumer.consumerMsg(EXCHANGE_NAME, queueName, routingKey);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (TimeoutException e) {
            e.printStackTrace();
        }
    }
    public static void main(String[] args) {
        FanoutConsumer consumer = new FanoutConsumer();
        String[] queueNames = new String[]{"qa-2", "qb-2", "qc-2"};
        for (int i = 0; i < 3; i++) {
            consumer.msgConsumer(queueNames[i], "");
        }
    }
}
```

执行生成者，结果如下：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-rumrabbitmqzypjdg-3d39c62b-b127-42b5-88ad-36081416c3eb.jpg)

我们发现，生产者生产的 10 条数据，在每个消费者中都可以消费，这个是和 Direct 不同的地方，但是使用 Fanout 方式时，有几个点需要注意一下：

- 生产者的 routkey 可以为空，因为生产者的所有数据，会下放到每一个队列，所以不会通过 routkey 去路由；
- 消费者需要指定 queues，因为消费者需要绑定到指定的 queues 才能消费。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-rumrabbitmqzypjdg-16f20f09-4e1c-4262-bc94-ec34b94cac30.jpg)

这幅图就画出了 Fanout 的精髓之处，exchange 会和所有的 queue 进行绑定，不区分路由，消费者需要绑定指定的 queue 才能发起消费。

> 注意：往队列塞数据时，可能通过界面看不到消息个数的增加，可能是你之前已经开启了消费进程，导致增加的消息马上被消费了。

## Fanout 方式（随机获取队列）

上面我们是指定了队列，这个方式其实很不友好，比如对于 Fanout，我其实根本无需关心队列的名字，如果还指定对应队列进行消费，感觉这个很冗余，所以我们这里就采用随机获取队列名字的方式，下面代码直接 Copy 官网。

生成者封装：

```
public static void publishMsgV2(String exchange, BuiltinExchangeType exchangeType, String message) throws IOException, TimeoutException {
    ConnectionFactory factory = RabbitUtil.getConnectionFactory();
    //创建连接
    Connection connection = factory.newConnection();
    //创建消息通道
    Channel channel = connection.createChannel();
    // 声明exchange中的消息
    channel.exchangeDeclare(exchange, exchangeType);
    // 发布消息
    channel.basicPublish(exchange, "", null, message.getBytes("UTF-8"));
    System.out.println("Sent '" + message + "'");
    channel.close();
    connection.close();
}
```

消费者封装：

```
public static void consumerMsgV2(String exchange) throws IOException, TimeoutException {
    ConnectionFactory factory = RabbitUtil.getConnectionFactory();
    Connection connection = factory.newConnection();
    final Channel channel = connection.createChannel();
    channel.exchangeDeclare(exchange, "fanout");
    String queueName = channel.queueDeclare().getQueue();
    channel.queueBind(queueName, exchange, "");
    System.out.println(" [*] Waiting for messages. To exit press CTRL+C");
    DeliverCallback deliverCallback = (consumerTag, delivery) -> {
        String message = new String(delivery.getBody(), "UTF-8");
        System.out.println(" [x] Received '" + message + "'");
    };
    channel.basicConsume(queueName, true, deliverCallback, consumerTag -> { });
}
```

生产者：

```
public class FanoutProducer {
    private static final String EXCHANGE_NAME = "fanout.exchange.v2";
    public void publishMsg(String msg) {
        try {
            MsgProducer.publishMsgV2(EXCHANGE_NAME, BuiltinExchangeType.FANOUT, msg);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public static void main(String[] args) {
        FanoutProducer directProducer = new FanoutProducer();
        String msg = "hello >>> ";
        for (int i = 0; i < 10000; i++) {
            directProducer.publishMsg(msg + i);
        }
    }
}
```

消费者：

```
public class FanoutConsumer {
    private static final String EXCHANGE_NAME = "fanout.exchange.v2";
    public void msgConsumer() {
        try {
            MsgConsumer.consumerMsgV2(EXCHANGE_NAME);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (TimeoutException e) {
            e.printStackTrace();
        }
    }
    public static void main(String[] args) {
        FanoutConsumer consumer = new FanoutConsumer();
        for (int i = 0; i < 3; i++) {
            consumer.msgConsumer();
        }
    }
}
```

执行后，管理界面如下：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-rumrabbitmqzypjdg-deaad8d4-b656-42ba-8e32-e890c33a4d57.jpg)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-rumrabbitmqzypjdg-d6e37865-06fa-41f6-b770-e6bc14ec676a.jpg)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-rumrabbitmqzypjdg-3f53f21f-c9cc-4e58-9b23-523dddf891db.jpg)

## Topic 方式

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-rumrabbitmqzypjdg-2f8ec9d1-afbb-454c-ac19-b03caf0f6c56.jpg)

代码详见官网：https://www.rabbitmq.com/tutorials/tutorial-five-java.html

> 更多方式，请直接查看官网：https://www.rabbitmq.com/getstarted.html

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-rumrabbitmqzypjdg-43ab470b-be1b-4497-a388-4dd6921159d8.jpg)

# RabbitMQ 进阶

> 参考文章：https://liuyueyi.github.io/hexblog/2018/05/29/RabbitMQ%E5%9F%BA%E7%A1%80%E6%95%99%E7%A8%8B%E4%B9%8B%E4%BD%BF%E7%94%A8%E8%BF%9B%E9%98%B6%E7%AF%87/

## durable 和 autoDeleted

在定义 Queue 时，可以指定这两个参数：

```
/**
 * Declare an exchange.
 * @see com.rabbitmq.client.AMQP.Exchange.Declare
 * @see com.rabbitmq.client.AMQP.Exchange.DeclareOk
 * @param exchange the name of the exchange
 * @param type the exchange type
 * @param durable true if we are declaring a durable exchange (the exchange will survive a server restart)
 * @param autoDelete true if the server should delete the exchange when it is no longer in use
 * @param arguments other properties (construction arguments) for the exchange
 * @return a declaration-confirm method to indicate the exchange was successfully declared
 * @throws java.io.IOException if an error is encountered
 */
Exchange.DeclareOk exchangeDeclare(String exchange, BuiltinExchangeType type, boolean durable, boolean autoDelete,
    Map<String, Object> arguments) throws IOException;
    
/**
* Declare a queue
* @see com.rabbitmq.client.AMQP.Queue.Declare
* @see com.rabbitmq.client.AMQP.Queue.DeclareOk
* @param queue the name of the queue
* @param durable true if we are declaring a durable queue (the queue will survive a server restart)
* @param exclusive true if we are declaring an exclusive queue (restricted to this connection)
* @param autoDelete true if we are declaring an autodelete queue (server will delete it when no longer in use)
* @param arguments other properties (construction arguments) for the queue
* @return a declaration-confirm method to indicate the queue was successfully declared
* @throws java.io.IOException if an error is encountered
*/
Queue.DeclareOk queueDeclare(String queue, boolean durable, boolean exclusive, boolean autoDelete,
    Map<String, Object> arguments) throws IOException;
```

### durable

持久化，保证 RabbitMQ 在退出或者 crash 等异常情况下数据没有丢失，需要将 queue，exchange 和 Message 都持久化。

若是将 queue 的持久化标识 durable 设置为 true，则代表是一个持久的队列，那么在服务重启之后，会重新读取之前被持久化的 queue。

虽然队列可以被持久化，但是里面的消息是否为持久化，还要看消息的持久化设置。即重启 queue，但是 queue 里面还没有发出去的消息，那队列里面还存在该消息么？这个取决于该消息的设置。

### autoDeleted

自动删除，如果该队列没有任何订阅的消费者的话，该队列会被自动删除。这种队列适用于临时队列。

当一个 Queue 被设置为自动删除时，当消费者断掉之后，queue 会被删除，这个主要针对的是一些不是特别重要的数据，不希望出现消息积累的情况。

### 小节

- 当一个 Queue 已经声明好了之后，不能更新 durable 或者 autoDelted 值；当需要修改时，需要先删除再重新声明
- 消费的 Queue 声明应该和投递的 Queue 声明的 durable,autoDelted 属性一致，否则会报错
- 对于重要的数据，一般设置 durable=true, autoDeleted=false
- 对于设置 autoDeleted=true 的队列，当没有消费者之后，队列会自动被删除

## ACK

执行一个任务可能需要花费几秒钟，你可能会担心如果一个消费者在执行任务过程中挂掉了。一旦 RabbitMQ 将消息分发给了消费者，就会从内存中删除。在这种情况下，如果正在执行任务的消费者宕机，会丢失正在处理的消息和分发给这个消费者但尚未处理的消息。

但是，我们不想丢失任何任务，如果有一个消费者挂掉了，那么我们应该将分发给它的任务交付给另一个消费者去处理。

为了确保消息不会丢失，RabbitMQ 支持消息应答。消费者发送一个消息应答，告诉 RabbitMQ 这个消息已经接收并且处理完毕了。RabbitMQ 就可以删除它了。

因此手动 ACK 的常见手段：

```
// 接收消息之后，主动ack/nak
Consumer consumer = new DefaultConsumer(channel) {
    @Override
    public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties,
            byte[] body) throws IOException {
        String message = new String(body, "UTF-8");
        try {
            System.out.println(" [ " + queue + " ] Received '" + message);
            channel.basicAck(envelope.getDeliveryTag(), false);
        } catch (Exception e) {
            channel.basicNack(envelope.getDeliveryTag(), false, true);
        }
    }
};
// 取消自动ack
channel.basicConsume(queue, false, consumer);
```

> 尽信书则不如无书，因个人能力有限，难免有疏漏和错误之处，如发现 bug 或者有更好的建议，欢迎批评指正，不吝感激


---

*没有什么使我停留——除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟*。




**推荐阅读**：

- [星球第二次招募](https://mp.weixin.qq.com/s/mRyRgQx9Szh0MgS1K2DRlw)
- [计算机专业如何细分？](https://mp.weixin.qq.com/s/_v0jnxDPjfU7LnKmHJJDWQ)
- [推荐一款macOS 软件包管理神器](https://mp.weixin.qq.com/s/gVo46a-0AAnGzpntTm4NAA)
- [专科生，去培训还是直接找工作？](https://mp.weixin.qq.com/s/3hgA2j_FpMxneyskZkGy4w)





![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-rumrabbitmqzypjdg-53717e59-63c9-44bd-99d3-dd2c26fe68bb.png)

> 转载链接：[https://mp.weixin.qq.com/s?\_\_biz=Mzg3OTU5NzQ1Mw==&mid=2247485842&idx=1&sn=554dc28cfce0042572b8d8ae3ee94277&scene=21#wechat_redirect](https://mp.weixin.qq.com/s?__biz=Mzg3OTU5NzQ1Mw==&mid=2247485842&idx=1&sn=554dc28cfce0042572b8d8ae3ee94277&scene=21#wechat_redirect)，出处：楼仔，整理：沉默王二
