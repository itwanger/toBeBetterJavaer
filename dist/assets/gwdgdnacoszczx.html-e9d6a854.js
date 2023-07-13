import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{r as a,o as r,c as l,a as e,d as i,b as d,e as c}from"./app-1c5b5ce3.js";const v={},t=c(`<p>Nacos 可以作为配置中心和注册中心，这篇文章从原理到源码，给大家讲解 Nacos 注册中心的 4 个维度。from 星球嘉宾楼仔。</p><p>不 BB，上文章目录：</p><figure><img src="https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLGXCBY0C0H2KlVHNcu22D5ibycQB0rNJicKhTjcHZrtzptshUnMEVUztwg06Trrw5Z9ibCLgibqEaHVXw/640?wx_fmt=png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h1 id="_01-什么是动态服务发现" tabindex="-1"><a class="header-anchor" href="#_01-什么是动态服务发现" aria-hidden="true">#</a> 01 什么是动态服务发现？</h1><p>服务发现是指使用一个注册中心来记录分布式系统中的全部服务的信息，以便其他服务能够快速的找到这些已注册的服务。</p><p>在单体应用中，DNS+Nginx 可以满足服务发现的要求，此时服务的IP列表配置在 nginx 上。在微服务架构中，由于服务粒度变的更细，服务的上下线更加频繁，我们需要一款注册中心来动态感知服务的上下线，并且推送IP列表变化给服务消费者，架构如下图。</p><figure><img src="https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLGXCBY0C0H2KlVHNcu22D5ibu6FkuveLnMacpYC9zf6ZrBvia1G7LefyQF3iauHXibZ3lo3EbsoK9GjZg/640?wx_fmt=png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h1 id="_02-nacos-实现动态服务发现的原理" tabindex="-1"><a class="header-anchor" href="#_02-nacos-实现动态服务发现的原理" aria-hidden="true">#</a> 02 Nacos 实现动态服务发现的原理</h1><p>Nacos实现动态服务发现的核心原理如下图，我们接下来的内容将围绕这个图来进行。</p><figure><img src="https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLGXCBY0C0H2KlVHNcu22D5ibNByiczK81eutq6JfpJAjFFPslVE47tskcXfdYib5t7VS1gECehr4uA1Q/640?wx_fmt=png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_2-1-通讯协议" tabindex="-1"><a class="header-anchor" href="#_2-1-通讯协议" aria-hidden="true">#</a> 2.1 通讯协议</h2><p>整个服务注册与发现过程，都离不开通讯协议，在1.x的 Nacos 版本中服务端只支持 http 协议，后来为了提升性能在2.x版本引入了谷歌的 grpc，grpc 是一款长连接协议，极大的减少了 http 请求频繁的连接创建和销毁过程，能大幅度提升性能，节约资源。</p><p>据官方测试，Nacos服务端 grpc 版本，相比 http 版本的性能提升了9倍以上。</p><h2 id="_2-2-nacos-服务注册" tabindex="-1"><a class="header-anchor" href="#_2-2-nacos-服务注册" aria-hidden="true">#</a> 2.2 Nacos 服务注册</h2><p>简单来讲，服务注册的目的就是客户端将自己的ip端口等信息上报给 Nacos 服务端，过程如下：</p><ul><li>创建长连接：Nacos SDK 通过Nacos服务端域名解析出服务端ip列表，选择其中一个ip创建 grpc 连接，并定时检查连接状态，当连接断开，则自动选择服务端ip列表中的下一个ip进行重连。</li><li>健康检查请求：在正式发起注册之前，Nacos SDK 向服务端发送一个空请求，服务端回应一个空请求，若Nacos SDK 未收到服务端回应，则认为服务端不健康，并进行一定次数重试，如果都未收到回应，则注册失败。</li><li>发起注册：当你查看Nacos java SDK的注册方法时，你会发现没有返回值，这是因为Nacos SDK做了补偿机制，在真实给服务端上报数据之前，会先往缓存中插入一条记录表示开始注册，注册成功之后再从缓存中标记这条记录为注册成功，当注册失败时，缓存中这条记录是未注册成功的状态，Nacos SDK开启了一个定时任务，定时查询异常的缓存数据，重新发起注册。</li></ul><p>Nacos SDK注册失败时的自动补偿机制时序图。</p><figure><img src="https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLGXCBY0C0H2KlVHNcu22D5ibWgmsdX8HGiboWGHeOchRA0RgotjuBDoydmFpGoPOBibOz6LatlcruF7A/640?wx_fmt=png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>相关源码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Override
public void registerService(String serviceName, String groupName, Instance instance) throws NacosException {
    NAMING_LOGGER.info(&quot;[REGISTER-SERVICE] {} registering service {} with instance {}&quot;, namespaceId, serviceName,
            instance);
        //添加redo日志
    redoService.cacheInstanceForRedo(serviceName, groupName, instance);

    doRegisterService(serviceName, groupName, instance);
}
public void doRegisterService(String serviceName, String groupName, Instance instance) throws NacosException {
   //向服务端发起注册
    InstanceRequest request = new InstanceRequest(namespaceId, serviceName, groupName,
            NamingRemoteConstants.REGISTER_INSTANCE, instance);
    requestToServer(request, Response.class);
    //标记注册成功
    redoService.instanceRegistered(serviceName, groupName);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行补偿定时任务RedoScheduledTask。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Override
public void run() {
    if (!redoService.isConnected()) {
        LogUtils.NAMING_LOGGER.warn(&quot;Grpc Connection is disconnect, skip current redo task&quot;);
        return;
    }
    try {
        redoForInstances();
        redoForSubscribes();
    } catch (Exception e) {
        LogUtils.NAMING_LOGGER.warn(&quot;Redo task run with unexpected exception: &quot;, e);
    }
}
  private void redoForInstances() {
    for (InstanceRedoData each : redoService.findInstanceRedoData()) {
        try {
            redoForInstance(each);
        } catch (NacosException e) {
            LogUtils.NAMING_LOGGER.error(&quot;Redo instance operation {} for {}@@{} failed. &quot;, each.getRedoType(),
                    each.getGroupName(), each.getServiceName(), e);
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>服务端数据同步(Distro协议)：Nacos SDK只会与服务端某个节点建立长连接，当服务端接受到客户端注册的实例数据后，还需要将实例数据同步给其他节点。Nacos自己实现了一个一致性协议名为Distro，服务注册的时候会触发Distro一次同步，每个Nacos节点之间会定时互相发送Distro数据，以此保证数据最终一致。</li><li>服务实例上线推送：Nacos服务端收到服务实例数据后会将服务的最新实例列表通过grpc推送给该服务的所有订阅者。</li><li>服务注册过程源码时序图：整理了一下服务注册过程整体时序图，对源码实现感兴趣的可以按照根据这个时序图view一下源码。</li></ul><figure><img src="https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLGXCBY0C0H2KlVHNcu22D5ibrlibzQ3ibkxcN5UEicjKox3ibEypJAkiacpK3sH11MkET7EAKqlsCNEQiclw/640?wx_fmt=png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_2-3-nacos-心跳机制" tabindex="-1"><a class="header-anchor" href="#_2-3-nacos-心跳机制" aria-hidden="true">#</a> 2.3 Nacos 心跳机制</h2><p>目前主流的注册中心，比如Consul、Eureka、Zk包括我们公司自研的Gsched，都是通过心跳机制来感知服务的下线。Nacos也是通过心跳机制来实现的。</p><p>Nacos目前SDK维护了两个分支的版本（1.x、2.x），这两个版本心跳机制的实现不一样。其中1.x版本的SDK通过http协议来定时向服务端发送心跳维持自己的健康状态，2.x版本的SDK则通过grpc自身的心跳机制来保活，当Nacos服务端接受不到服务实例的心跳，会认为实例下线。如下图：</p><figure><img src="https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLGXCBY0C0H2KlVHNcu22D5ibIsg4d7vKnmBKN6yvibtqvH7LI2kMXLJeAo0HueANlvvtcxacoTLHJYQ/640?wx_fmt=png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>grpc监测到连接断开事件，发送ClientDisconnectEvent。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class ConnectionBasedClientManager extends ClientConnectionEventListener implements ClientManager {
  //连接断开，发送连接断开事件
public boolean clientDisconnected(String clientId) {
    Loggers.SRV_LOG.info(&quot;Client connection {} disconnect, remove instances and subscribers&quot;, clientId);
    ConnectionBasedClient client = clients.remove(clientId);
    if (null == client) {
        return true;
    }
    client.release();
    NotifyCenter.publishEvent(new ClientEvent.ClientDisconnectEvent(client));
    return true;
}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>移除客户端注册的服务实例</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class ClientServiceIndexesManager extends SmartSubscriber {

  @Override
    public void onEvent(Event event) {
    //接收失去连接事件
        if (event instanceof ClientEvent.ClientDisconnectEvent) {
            handleClientDisconnect((ClientEvent.ClientDisconnectEvent) event);
        } else if (event instanceof ClientOperationEvent) {
            handleClientOperation((ClientOperationEvent) event);
        }
    }
    private void handleClientDisconnect(ClientEvent.ClientDisconnectEvent event) {
        Client client = event.getClient();
        for (Service each : client.getAllSubscribeService()) {
            removeSubscriberIndexes(each, client.getClientId());
        }
        //移除客户端注册的服务实例
        for (Service each : client.getAllPublishedService()) {
            removePublisherIndexes(each, client.getClientId());
        }
    }
    
    //移除客户端注册的服务实例
    private void removePublisherIndexes(Service service, String clientId) {
        if (!publisherIndexes.containsKey(service)) {
            return;
        }
        publisherIndexes.get(service).remove(clientId);
        NotifyCenter.publishEvent(new ServiceEvent.ServiceChangedEvent(service, true));
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-4-nacos-服务订阅" tabindex="-1"><a class="header-anchor" href="#_2-4-nacos-服务订阅" aria-hidden="true">#</a> 2.4 Nacos 服务订阅</h2><p>当一个服务发生上下线，Nacos如何知道要推送给哪些客户端？</p><p>Nacos SDK 提供了订阅和取消订阅方法，当客户端向服务端发起订阅请求，服务端会记录发起调用的客户端为该服务的订阅者，同时将服务的最新实例列表返回。当客户端发起了取消订阅，服务端就会从该服务的订阅者列表中把当前客户端移除。</p><p>当客户端发起订阅时，服务端除了会同步返回最新的服务实例列表，还会异步的通过grpc推送给该订阅者最新的服务实例列表，这样做的目的是为了异步更新客户端本地缓存的服务数据。</p><p>当客户端订阅的服务上下线，该服务所有的订阅者会立刻收到最新的服务列表并且将服务最新的实例数据更新到内存。</p><figure><img src="https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLGXCBY0C0H2KlVHNcu22D5ibkTKNoVnyLMmAibAqDlYcbfe0wer9eYnuro0Y0sPqwLF2HTr1I0uyiaYQ/640?wx_fmt=png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>我们也看一下相关源码，服务端接收到订阅数据，首先保存到内存中。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Override
public void subscribeService(Service service, Subscriber subscriber, String clientId) {
    Service singleton = ServiceManager.getInstance().getSingletonIfExist(service).orElse(service);
    Client client = clientManager.getClient(clientId);
    //校验长连接是否正常
    if (!clientIsLegal(client, clientId)) {
        return;
    }
    //保存订阅数据
    client.addServiceSubscriber(singleton, subscriber);
    client.setLastUpdatedTime();
    //发送订阅事件
    NotifyCenter.publishEvent(new ClientOperationEvent.ClientSubscribeServiceEvent(singleton, clientId));
}

    private void handleClientOperation(ClientOperationEvent event) {
    Service service = event.getService();
    String clientId = event.getClientId();
    if (event instanceof ClientOperationEvent.ClientRegisterServiceEvent) {
        addPublisherIndexes(service, clientId);
    } else if (event instanceof ClientOperationEvent.ClientDeregisterServiceEvent) {
        removePublisherIndexes(service, clientId);
    } else if (event instanceof ClientOperationEvent.ClientSubscribeServiceEvent) {
    //处理订阅操作
        addSubscriberIndexes(service, clientId);
    } else if (event instanceof ClientOperationEvent.ClientUnsubscribeServiceEvent) {
        removeSubscriberIndexes(service, clientId);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后发布订阅事件。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>private void addSubscriberIndexes(Service service, String clientId) {
    //保存订阅数据
    subscriberIndexes.computeIfAbsent(service, (key) -&gt; new ConcurrentHashSet&lt;&gt;());
    // Fix #5404, Only first time add need notify event.
    if (subscriberIndexes.get(service).add(clientId)) {
    //发布订阅事件
        NotifyCenter.publishEvent(new ServiceEvent.ServiceSubscribedEvent(service, clientId));
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>服务端自己消费订阅事件，并且推送给订阅的客户端最新的服务实例数据。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Override
public void onEvent(Event event) {
    if (!upgradeJudgement.isUseGrpcFeatures()) {
        return;
    }
    if (event instanceof ServiceEvent.ServiceChangedEvent) {
        // If service changed, push to all subscribers.
        ServiceEvent.ServiceChangedEvent serviceChangedEvent = (ServiceEvent.ServiceChangedEvent) event;
        Service service = serviceChangedEvent.getService();
        delayTaskEngine.addTask(service, new PushDelayTask(service, PushConfig.getInstance().getPushTaskDelay()));
    } else if (event instanceof ServiceEvent.ServiceSubscribedEvent) {
        // If service is subscribed by one client, only push this client.
        ServiceEvent.ServiceSubscribedEvent subscribedEvent = (ServiceEvent.ServiceSubscribedEvent) event;
        Service service = subscribedEvent.getService();
        delayTaskEngine.addTask(service, new PushDelayTask(service, PushConfig.getInstance().getPushTaskDelay(),
                subscribedEvent.getClientId()));
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-5-nacos-推送" tabindex="-1"><a class="header-anchor" href="#_2-5-nacos-推送" aria-hidden="true">#</a> 2.5 Nacos 推送</h2><h3 id="推送方式" tabindex="-1"><a class="header-anchor" href="#推送方式" aria-hidden="true">#</a> 推送方式</h3><p>前面说了服务的注册和订阅都会发生推送（服务端-&gt;客户端），那推送到底是如何实现的呢？</p><p>在早期的Nacos版本，当服务实例变化，服务端会通过udp协议将最新的数据发送给客户端，后来发现udp推送有一定的丢包率，于是新版本的Nacos支持了grpc推送。Nacos服务端会自动判断客户端的版本来选择哪种方式来进行推送，如果你使用1.4.2以前的SDK进行注册，那Nacos服务端会使用udp协议来进行推送，反之则使用grpc。</p><h3 id="推送失败重试" tabindex="-1"><a class="header-anchor" href="#推送失败重试" aria-hidden="true">#</a> 推送失败重试</h3><p>当发送推送时，客户端可能正在重启，或者连接不稳定导致推送失败，这个时候Nacos会进行重试。Nacos将每个推送都封装成一个任务对象，放入到队列中，再开启一个线程不停的从队列取出任务执行，执行之前会先删除该任务，如果执行失败则将任务重新添加到队列，该线程会记录任务执行的时间，如果超过1秒，则会记录到日志。</p><h3 id="推送部分源码" tabindex="-1"><a class="header-anchor" href="#推送部分源码" aria-hidden="true">#</a> 推送部分源码</h3><p>添加推送任务到执行队列中。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>private static class PushDelayTaskProcessor implements NacosTaskProcessor {

    private final PushDelayTaskExecuteEngine executeEngine;

    public PushDelayTaskProcessor(PushDelayTaskExecuteEngine executeEngine) {
        this.executeEngine = executeEngine;
    }

    @Override
    public boolean process(NacosTask task) {
        PushDelayTask pushDelayTask = (PushDelayTask) task;
        Service service = pushDelayTask.getService();
        NamingExecuteTaskDispatcher.getInstance()
                .dispatchAndExecuteTask(service, new PushExecuteTask(service, executeEngine, pushDelayTask));
        return true;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>推送任务PushExecuteTask 的执行。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class PushExecuteTask extends AbstractExecuteTask {

//..省略

@Override
public void run() {
    try {
        //封装要推送的服务实例数据
        PushDataWrapper wrapper = generatePushData();
        ClientManager clientManager = delayTaskEngine.getClientManager();
        //如果是服务上下线导致的推送，获取所有订阅者
        //如果是订阅导致的推送，获取订阅者
        for (String each : getTargetClientIds()) {
            Client client = clientManager.getClient(each);
            if (null == client) {
                // means this client has disconnect
                continue;
            }
            Subscriber subscriber = clientManager.getClient(each).getSubscriber(service);
            //推送给订阅者
            delayTaskEngine.getPushExecutor().doPushWithCallback(each, subscriber, wrapper,
                    new NamingPushCallback(each, subscriber, wrapper.getOriginalData(), delayTask.isPushToAll()));
        }
    } catch (Exception e) {
        Loggers.PUSH.error(&quot;Push task for service&quot; + service.getGroupedServiceName() + &quot; execute failed &quot;, e);
        //当推送发生异常，重新将推送任务放入执行队列
        delayTaskEngine.addTask(service, new PushDelayTask(service, 1000L));
    }
}

  //如果是服务上下线导致的推送，获取所有订阅者
        //如果是订阅导致的推送，获取订阅者
    private Collection&lt;String&gt; getTargetClientIds() {
    return delayTask.isPushToAll() ? delayTaskEngine.getIndexesManager().getAllClientsSubscribeService(service)
            : delayTask.getTargetClients();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行推送任务线程InnerWorker 的执行。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**

 * Inner execute worker.

 */
private class InnerWorker extends Thread {

    InnerWorker(String name) {
        setDaemon(false);
        setName(name);
    }

    @Override
    public void run() {
        while (!closed.get()) {
            try {
            //从队列中取出任务PushExecuteTask 
                Runnable task = queue.take();
                long begin = System.currentTimeMillis();
                //执行PushExecuteTask 
                task.run();
                long duration = System.currentTimeMillis() - begin;
                if (duration &gt; 1000L) {
                    log.warn(&quot;task {} takes {}ms&quot;, task, duration);
                }
            } catch (Throwable e) {
                log.error(&quot;[TASK-FAILED] &quot; + e.toString(), e);
            }
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-6-nacos-sdk-查询服务实例" tabindex="-1"><a class="header-anchor" href="#_2-6-nacos-sdk-查询服务实例" aria-hidden="true">#</a> 2.6 Nacos SDK 查询服务实例</h2><p>服务消费者首先需要调用Nacos SDK的接口来获取最新的服务实例，然后才能从获取到的实例列表中以加权轮询的方式选择出一个实例（包含ip，port等信息），最后再发起调用。</p><p>前面已经提到Nacos服务发生上下线、订阅的时候都会推送最新的服务实例列表到当客户端，客户端再更新本地内存中的缓冲数据，所以调用Nacos SDK提供的查询实例列表的接口时，不会直接请求服务端获取数据，而是会优先使用内存中的服务数据，只有内存中查不到的情况下才会发起订阅请求服务端数据。</p><p>Nacos SDK内存中的数据除了接受来自服务端的推送更新之外，自己本地也会有一个定时任务定时去获取服务端数据来进行兜底。Nacos SDK在查询的时候也了容灾机制，即从磁盘获取服务数据，而这个磁盘的数据其实也是来自于内存，有一个定时任务定时从内存缓存中获取然后加载到磁盘。Nacos SDK的容灾机制默认关闭，可通过设置环境变量failover-mode=true来开启。</p><h3 id="架构图" tabindex="-1"><a class="header-anchor" href="#架构图" aria-hidden="true">#</a> 架构图</h3><figure><img src="https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLGXCBY0C0H2KlVHNcu22D5ibLhjotxfywg9rN9yKdWdficKGdUm9p1iaMrfYXGe7DppNBsUGdZ2gFFzw/640?wx_fmt=png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="用户查询流程" tabindex="-1"><a class="header-anchor" href="#用户查询流程" aria-hidden="true">#</a> 用户查询流程</h3><figure><img src="https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLGXCBY0C0H2KlVHNcu22D5ibj7MhyxOXHpQ4O9p8kFjM7JNEANWQN69bpUia7IQXtz83ibJ37ict3u7jQ/640?wx_fmt=png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="查询服务实例部分源码" tabindex="-1"><a class="header-anchor" href="#查询服务实例部分源码" aria-hidden="true">#</a> 查询服务实例部分源码</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>private final ConcurrentMap&lt;String, ServiceInfo&gt; serviceInfoMap;
 @Override
public List&lt;Instance&gt; getAllInstances(String serviceName, String groupName, List&lt;String&gt; clusters,

        boolean subscribe) throws NacosException {
    ServiceInfo serviceInfo;
    String clusterString = StringUtils.join(clusters, &quot;,&quot;);
    //这里默认传过来是true
    if (subscribe) {
    //从本地内存获取服务数据，如果获取不到则从磁盘获取
        serviceInfo = serviceInfoHolder.getServiceInfo(serviceName, groupName, clusterString);
        if (null == serviceInfo || !clientProxy.isSubscribed(serviceName, groupName, clusterString)) {
      //如果从本地获取不到数据，则调用订阅方法
            serviceInfo = clientProxy.subscribe(serviceName, groupName, clusterString);
        }
    } else {
     //适用于不走订阅，直接从服务端获取数据的情况
        serviceInfo = clientProxy.queryInstancesOfService(serviceName, groupName, clusterString, 0, false);
    }
    List&lt;Instance&gt; list;
    if (serviceInfo == null || CollectionUtils.isEmpty(list = serviceInfo.getHosts())) {
        return new ArrayList&lt;Instance&gt;();
    }
    return list;
}
}
  //从本地内存获取服务数据，如果开启了故障转移则直接从磁盘获取，因为当服务端挂了，本地启动时内存中也没有数据
public ServiceInfo getServiceInfo(final String serviceName, final String groupName, final String clusters) {
    NAMING_LOGGER.debug(&quot;failover-mode: {}&quot;, failoverReactor.isFailoverSwitch());
    String groupedServiceName = NamingUtils.getGroupedName(serviceName, groupName);
    String key = ServiceInfo.getKey(groupedServiceName, clusters);
    //故障转移则直接从磁盘获取
    if (failoverReactor.isFailoverSwitch()) {
        return failoverReactor.getService(key);
    }
    //返回内存中数据
    return serviceInfoMap.get(key);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_3-结语" tabindex="-1"><a class="header-anchor" href="#_3-结语" aria-hidden="true">#</a> 3. 结语</h1><p>本篇文章向大家介绍 Nacos 服务发现的基本概念和核心能力以及实现的原理，旨在让大家对 Nacos 的服务注册与发现功能有更多的了解，做到心中有数。</p><p>这篇文章原作者是我好友，小米大佬胡俊，如果对 Nacos 开源感兴趣的同学，也可以和我联系。</p>`,70),u={href:"https://mp.weixin.qq.com/s?__biz=Mzg3OTU5NzQ1Mw==&mid=2247493608&idx=1&sn=1006a75cdbe4f0537de1fe48c4111381&chksm=cf00a50af8772c1c4c1308df1f595347ccb1ed03244b5314d78c98748e079183304dfffe7ace#rd",target:"_blank",rel:"noopener noreferrer"};function b(o,m){const n=a("ExternalLinkIcon");return r(),l("div",null,[t,e("blockquote",null,[e("p",null,[i("参考链接："),e("a",u,[i("https://mp.weixin.qq.com/s?__biz=Mzg3OTU5NzQ1Mw==&mid=2247493608&idx=1&sn=1006a75cdbe4f0537de1fe48c4111381&chksm=cf00a50af8772c1c4c1308df1f595347ccb1ed03244b5314d78c98748e079183304dfffe7ace#rd"),d(n)]),i("，出处：楼仔，整理：沉默王二")])])])}const h=s(v,[["render",b],["__file","gwdgdnacoszczx.html.vue"]]);export{h as default};
