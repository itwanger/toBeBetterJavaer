ZooKeeper 的客户端可以通过 Watch 机制来订阅当服务器上某一节点的数据或状态发生变化时收到相应的通知；

**「如何实现：」**

我们可以通过向 ZooKeeper 客户端的构造方法中传递 Watcher 参数的方式实现：

```
new ZooKeeper(String connectString, int sessionTimeout, Watcher watcher)
```

上面代码的意思是定义了一个了 ZooKeeper 客户端对象实例，并传入三个参数：

*   connectString 服务端地址

*   sessionTimeout：超时时间

*   Watcher：监控事件

这个 Watcher 将作为整个 ZooKeeper 会话期间的上下文 ，一直被保存在客户端 ZKWatchManager 的 defaultWatcher 中。

除此之外，ZooKeeper 客户端也可以通过 getData、exists 和 getChildren 三个接口来向 ZooKeeper 服务器注册 Watcher，从而方便地在不同的情况下添加 Watch 事件：


```
getData(String path, Watcher watcher, Stat stat)
```

触发通知的条件：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/zookeeper/watch-1.png)


上图中列出了客户端在不同会话状态下，相应的在服务器节点所能支持的事件类型。

*   例如在客户端连接服务端的时候，可以对数据节点的创建、删除、数据变更、子节点的更新等操作进行监控。

**「当服务端某一节点发生数据变更操作时，所有曾经设置了该节点监控事件的客户端都会收到服务器的通知吗？」**

答案是否定的，Watch 事件的触发机制取决于会话的连接状态和客户端注册事件的类型，所以当客户端会话状态或数据节点发生改变时，都会触发对应的 Watch 事件。

**「订阅发布场景实现」**

> ❝
> 
> 提到 ZooKeeper 的应用场景，你可能第一时间会想到最为典型的发布订阅功能。
> 
> ❞

发布订阅功能可以看作是一个一对多的关系，即一个服务或数据的发布者可以被多个不同的消费者调用。

一般一个发布订阅模式的数据交互可以分为消费者主动请求生产者信息的拉取模式，和生产者数据变更时主动推送给消费者的推送模式。

ZooKeeper 采用了两种模式结合的方式实现订阅发布功能。

> ❝
> 
> 下面我们来分析一个具体案例：
> 
> ❞

在系统开发的过程中会用到各种各样的配置信息，如数据库配置项、第三方接口、服务地址等，这些配置操作在我们开发过程中很容易完成，但是放到一个大规模的集群中配置起来就比较麻烦了。

通常这种集群中，我们可以用配置管理功能自动完成服务器配置信息的维护，利用ZooKeeper 的发布订阅功能就能解决这个问题。

我们可以把诸如数据库配置项这样的信息存储在 ZooKeeper 数据节点中。

如`/confs/data_item1`。

*   服务器集群客户端对该节点添加 Watch 事件监控，当集群中的服务启动时，会读取该节点数据获取数据配置信息。

*   而当该节点数据发生变化时，ZooKeeper 服务器会发送 Watch 事件给各个客户端，集群中的客户端在接收到该通知后，重新读取节点的数据库配置信息。

我们使用 Watch 机制实现了一个分布式环境下的配置管理功能，通过对 ZooKeeper 服务器节点添加数据变更事件，实现当数据库配置项信息变更后，集群中的各个客户端能接收到该变更事件的通知，并获取最新的配置信息。

> ❝
> 
> 要注意一点是，我们提到 Watch 具有一次性，所以当我们获得服务器通知后要再次添加 Watch 事件。
> 
> ❞


整理：沉默王二，戳[转载链接](https://mp.weixin.qq.com/s/-evZg0epRrOr1IwQ3GJ2Zg)，作者：月伴飞鱼，戳[原文链接](https://mp.weixin.qq.com/s/B2ngp0q5kdWsCNH8sw_5DA)。