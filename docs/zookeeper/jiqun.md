「ZooKeeper集群模式的特点」

在 ZooKeeper 集群中将服务器分成 「Leader 、Follow 、Observer 三」种角色服务器，在集群运行期间这三种服务器所负责的工作各不相同：

Leader 角色服务器负责管理集群中其他的服务器，是集群中工作的分配和调度者，既可以为客户端提供写服务又能提供读服务。

Follow 服务器的主要工作是选举出 Leader 服务器，在发生 Leader 服务器选举的时候，系统会从 Follow 服务器之间根据多数投票原则，选举出一个 Follow 服务器作为新的 Leader 服务器，只能提供读服务。

Observer 服务器则主要负责处理来自客户端的获取数据等请求，并不参与 Leader 服务器的选举操作，也不会作为候选者被选举为 Leader 服务器，只能提供读服务。

在 ZooKeeper 集群接收到来自客户端的会话请求操作后，首先会判断该条请求是否是事务性的会话请求。

❝
对于事务性的会话请求，ZooKeeper 集群服务端会将该请求统一转发给 Leader 服务器进行操作。
所谓事务性请求，是指 ZooKeeper 服务器执行完该条会话请求后，是否会导致执行该条会话请求的服务器的数据或状态发生改变，进而导致与其他集群中的服务器出现数据不一致的情况。
❞
Leader 服务器内部执行该条事务性的会话请求后，再将数据同步给其他角色服务器，从而保证事务性会话请求的执行顺序，进而保证整个 ZooKeeper 集群的数据一致性。

❝
在 ZooKeeper 集群的内部实现中，是通过什么方法保证所有 ZooKeeper 集群接收到的事务性会话请求都能交给 Leader 服务器进行处理的呢？
❞
在 ZooKeeper 集群内部，集群中除 Leader 服务器外的其他角色服务器接收到来自客户端的事务性会话请求后，必须将该条会话请求转发给 Leader 服务器进行处理。

ZooKeeper 集群中的 Follow 和 Observer 服务器，都会检查当前接收到的会话请求是否是事务性的请求，如果是事务性的请求，那么就将该请求以 REQUEST 消息类型转发给 Leader 服务器。

在 ZooKeeper集群中的服务器接收到该条消息后，会对该条消息进行解析。

分析出该条消息所包含的原始客户端会话请求。

之后将该条消息提交到自己的 Leader 服务器请求处理链中，开始进行事务性的会话请求操作。

如果不是事务性请求，ZooKeeper 集群则交由 Follow 和 Observer 角色服务器处理该条会话请求，如查询数据节点信息。

当一个业务场景在查询操作多而创建删除等事务性操作少的情况下，ZooKeeper 集群的性能表现的就会很好。

❝
如果是在极端情况下，ZooKeeper 集群只有事务性的会话请求而没有查询操作，那么 Follow 和 Observer 服务器就只能充当一个请求转发服务器的角色， 所有的会话的处理压力都在 Leader 服务器。
❞
在处理性能上整个集群服务器的瓶颈取决于 Leader 服务器的性能。

❝
ZooKeeper 集群的作用只能保证在 Leader 节点崩溃的时候，重新选举出 Leader 服务器保证系统的稳定性。
❞
这也是 ZooKeeper 设计的一个缺点。

「Leader选举」

Leader 服务器的选举操作主要发生在两种情况下。

第一种就是 ZooKeeper 集群服务启动的时候，第二种就是在 ZooKeeper 集群中旧的 Leader 服务器失效时，这时 ZooKeeper 集群需要选举出新的 Leader 服务器。

❝
ZooKeeper 集群重新选举 Leader 的过程只有 Follow 服务器参与工作。
❞
❝
服务器状态
❞
服务器具有四种状态，分别是LOOKING、FOLLOWING、LEADING、OBSERVING。

「LOOKING」：寻找Leader状态。当服务器处于该状态时，它会认为当前集群中没有Leader，因此需要进入Leader选举状态。

「FOLLOWING」：跟随者状态。表明当前服务器角色是Follower。

「LEADING」：领导者状态。表明当前服务器角色是Leader。

「OBSERVING」：观察者状态。表明当前服务器角色是Observer。

「事务ID（zxid）」

Zookeeper的状态变化，都会由一个Zookeeper事务ID（ZXID）标识。

❝
写入Zookeeper，会导致状态变化，每次写入都会导致ZXID发生变化。
❞
ZXID由Leader统一分配，全局唯一，长度64位，递增。

ZXID展示了所有的Zookeeper转台变更顺序，每次变更都有一个唯一ZXID，如果zxid1小于zxid2，则说明zxid1的事务在zxid2的事务之前发生。

「选举过程」

在 ZooKeeper 集群重新选举 Leader 节点的过程中，主要可以分为 Leader 失效发现、重新选举 Leader 、Follow 服务器角色变更、集群同步这几个步骤。

❝
Leader 失效发现
❞
在 ZooKeeper 集群中，当 Leader 服务器失效时，ZooKeeper 集群会重新选举出新的 Leader 服务器。

在 ZooKeeper 集群中，探测 Leader 服务器是否存活的方式与保持客户端活跃性的方法非常相似。
首先，Follow 服务器会定期向 Leader 服务器发送 网络请求，在接收到请求后，Leader 服务器会返回响应数据包给 Follow 服务器，而在 Follow 服务器接收到 Leader 服务器的响应后，如果判断 Leader 服务器运行正常，则继续进行数据同步和服务转发等工作，反之，则进行 Leader 服务器的重新选举操作。

❝
Leader重新选举
❞
当 Follow 服务器向 Leader 服务器发送状态请求包后，如果没有得到 Leader 服务器的返回信息，这时，如果是集群中个别的 Follow 服务器发现返回错误，并不会导致 ZooKeeper 集群立刻重新选举 Leader 服务器，而是将该 Follow 服务器的状态变更为 LOOKING 状态，并向网络中发起投票，当 ZooKeeper 集群中有更多的机器发起投票，最后当投票结果满足多数原则的情况下。

ZooKeeper 会重新选举出 Leader 服务器。

❝
Follow 角色变更
❞
在 ZooKeeper 集群中，Follow 服务器作为 Leader 服务器的候选者，当被选举为 Leader 服务器之后，其在 ZooKeeper 集群中的 Follow 角色，也随之发生改变。也就是要转变为 Leader 服务器，并作为 ZooKeeper 集群中的 Leader 角色服务器对外提供服务。

❝
集群同步数据
❞
在 ZooKeeper 集群成功选举 Leader 服务器，并且候选 Follow 服务器的角色变更后。

为避免在这期间导致的数据不一致问题，ZooKeeper 集群在对外提供服务之前，会通过 Leader 角色服务器管理同步其他角色服务器。

「底层实现」

首先，ZooKeeper 集群会先判断 Leader 服务器是否失效，而判断的方式就是 Follow 服务器向 Leader 服务器发送请求包，之后 Follow 服务器接收到响应数据后，进行解析，Follow 服务器会根据返回的数据，判断 Leader 服务器的运行状态，如果返回的是 LOOKING 关键字，表明与集群中 Leader 服务器无法正常通信。

之后，在 ZooKeeper 集群选举 Leader 服务器时，是通过 「FastLeaderElection」 类实现的。
该类实现了 TCP 方式的通信连接，用于在 ZooKeeper 集群中与其他 Follow 服务器进行协调沟通。

FastLeaderElection 类继承了 Election 接口，定义其是用来进行选举的实现类。

而在其内部，又定义了选举通信相关的一些配置参数，比如 finalizeWait 最终等待时间、最大通知间隔时间 maxNotificationInterval 等。
在选举的过程中，首先调用 ToSend 函数向 ZooKeeper 集群中的其他角色服务器发送本机的投票信息，其他服务器在接收投票信息后，会对投票信息进行有效性验证等操作，之后 ZooKeeper 集群统计投票信息，如果过半数的机器投票信息一致，则集群就重新选出新的 Leader 服务器。

❝
这里我们要注意一个问题，那就是在重新选举 Leader 服务器的过程中，ZooKeeper 集群理论上是无法进行事务性的请求处理的。
❞
因此，发送到 ZooKeeper 集群中的事务性会话会被挂起，暂时不执行，等到选举出新的 Leader 服务器后再进行操作。

「Observer」

在 ZooKeeper 集群服务运行的过程中，Observer 服务器与 Follow 服务器具有一个相同的功能，那就是负责处理来自客户端的诸如查询数据节点等非事务性的会话请求操作。

但与 Follow 服务器不同的是，Observer 不参与 Leader 服务器的选举工作，也不会被选举为 Leader 服务器。
在早期的 ZooKeeper 集群服务运行过程中，只有 Leader 服务器和 Follow 服务器。

不过随着 ZooKeeper 在分布式环境下的广泛应用，早期模式的设计缺点也随之产生，主要带来的问题有如下几点：

随着集群规模的变大，集群处理写入的性能反而下降。

ZooKeeper 集群无法做到跨域部署。

其中最主要的问题在于，当 ZooKeeper 集群的规模变大，集群中 Follow 服务器数量逐渐增多的时候，ZooKeeper 处理创建数据节点等事务性请求操作的性能就会逐渐下降。

这是因为 ZooKeeper 集群在处理事务性请求操作时，要在 ZooKeeper 集群中对该事务性的请求发起投票，只有超过半数的 Follow 服务器投票一致，才会执行该条写入操作。

正因如此，随着集群中 Follow 服务器的数量越来越多，一次写入等相关操作的投票也就变得越来越复杂，并且 Follow 服务器之间彼此的网络通信也变得越来越耗时，导致随着 Follow 服务器数量的逐步增加，事务性的处理性能反而变得越来越低。

为了解决这一问题，在 ZooKeeper 3.6 版本后，ZooKeeper 集群中创建了一种新的服务器角色，即 Observer——观察者角色服务器。
Observer 可以处理 ZooKeeper 集群中的非事务性请求，并且不参与 Leader 节点等投票相关的操作。

这样既保证了 ZooKeeper 集群性能的扩展性，又避免了因为过多的服务器参与投票相关的操作而影响 ZooKeeper 集群处理事务性会话请求的能力。

在实际部署的时候，因为 Observer 不参与 Leader 节点等操作，并不会像 Follow 服务器那样频繁的与 Leader 服务器进行通信。
因此，可以将 Observer 服务器部署在不同的网络区间中，这样也不会影响整个 ZooKeeper 集群的性能，也就是所谓的跨域部署。

「在我们日常使用 ZooKeeper 集群服务器的时候，集群中的机器个数应该选择奇数个？」

两个原因：

❝
在容错能力相同的情况下，奇数台更节省资源
❞
Zookeeper中 Leader 选举算法采用了Zab协议。

Zab核心思想是当多数 Server 写成功，则写成功。

举两个例子：

假如zookeeper集群1 ，有3个节点，3/2=1.5 ,  即zookeeper想要正常对外提供服务（即leader选举成功），至少需要2个节点是正常的。换句话说，3个节点的zookeeper集群，允许有一个节点宕机。

假如zookeeper集群2，有4个节点，4/2=2 , 即zookeeper想要正常对外提供服务（即leader选举成功），至少需要3个节点是正常的。换句话说，4个节点的zookeeper集群，也允许有一个节点宕机。

集群1与集群2都有 允许1个节点宕机 的容错能力，但是集群2比集群1多了1个节点。在相同容错能力的情况下，本着节约资源的原则，zookeeper集群的节点数维持奇数个更好一些。

❝
防止由脑裂造成的集群不可用。
❞
集群的脑裂通常是发生在节点之间通信不可达的情况下，集群会分裂成不同的小集群，小集群各自选出自己的master节点，导致原有的集群出现多个master节点的情况，这就是脑裂。

下面举例说一下为什么采用奇数台节点，就可以防止由于脑裂造成的服务不可用：

假如zookeeper集群有 5 个节点，发生了脑裂，脑裂成了A、B两个小集群：

A ：1个节点 ，B ：4个节点

A ：2个节点， B ：3个节点

可以看出，上面这两种情况下，A、B中总会有一个小集群满足 可用节点数量 > 总节点数量/2 。

所以zookeeper集群仍然能够选举出leader ， 仍然能对外提供服务，只不过是有一部分节点失效了而已。

假如zookeeper集群有4个节点，同样发生脑裂，脑裂成了A、B两个小集群：

A：1个节点 ，  B：3个节点

A：2个节点 ， B：2个节点

因为A和B都是2个节点，都不满足 可用节点数量 > 总节点数量/2 的选举条件， 所以此时zookeeper就彻底不能提供服务了。

整理：沉默王二，戳[转载链接](https://mp.weixin.qq.com/s/-evZg0epRrOr1IwQ3GJ2Zg)，作者：月伴飞鱼，戳[原文链接](https://mp.weixin.qq.com/s/B2ngp0q5kdWsCNH8sw_5DA)。