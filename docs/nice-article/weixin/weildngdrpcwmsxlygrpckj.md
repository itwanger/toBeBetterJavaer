---
title: 为了带你搞懂RPC，我们手写了一个RPC框架
shortTitle: 为了带你搞懂RPC，我们手写了一个RPC框架
description: 如今，分布式系统大行其道，RPC 有着举足轻重的地位。Dubbo、Thrift、gRpc 等框架各领风骚，学
author: PPHUANG
category:
  - 微信公众号
---

如今，分布式系统大行其道，RPC 有着举足轻重的地位。Dubbo、Thrift、gRpc 等框架各领风骚，学习RPC是新手也是老鸟的必修课。本文带你手撸一个rpc-spring-starter，深入学习和理解rpc相关技术，包括但不限于 RPC 原理、动态代理、Javassist 字节码增强、服务注册与发现、Netty 网络通讯、传输协议、序列化、包压缩、TCP 粘包、拆包、长连接复用、心跳检测、SpringBoot 自动装载、服务分组、接口版本、客户端连接池、负载均衡、异步调用等知识，**值得收藏。**

## RPC定义

远程服务调用（Remote procedure call）的概念历史已久，1981年就已经被提出，最初的目的就是为了**调用远程方法像调用本地方法一样简单**，经历了四十多年的更新与迭代，RPC 的大体思路已经趋于稳定，如今百家争鸣的 RPC 协议和框架，诸如 Dubbo （阿里）、Thrift（FaceBook）、gRpc（Google）、brpc （百度）等都在不同侧重点去解决最初的目的，有的想极致完美，有的追求极致性能，有的偏向极致简单。

## RPC基本原理

让我们回到 RPC 最初的目的，要想实现**调用远程方法想调用本地方法一样简单**，至少要解决如下问题：

1.  如何获取可用的远程服务器
2.  如何表示数据
3.  如何传递数据
4.  服务端如何确定并调用目标方法

上述四点问题，都能与现在分布式系统火热的术语一一对应，如何获取可用的远程服务器（服务注册与发现）、如何表示数据（序列化与反序列化）、如何传递数据（网络通讯）、服务端如何确定并调用目标方法（调用方法映射）。笔者将通过一个简单 RPC 项目来解决这些问题。

首先来看 RPC 的整体系统架构图：

![](https://mmbiz.qpic.cn/mmbiz_jpg/qm3R3LeH8rZzymcdNKqL6PJCicpr3xo5PTGwc3ibvg7vgLrLoj2Roia2u7QD2MK0SiaejsjnUOrlhKeG2EPxgPs9bQ/640?wx_fmt=jpeg)

图中服务端启动时将自己的服务节点信息注册到注册中心，客户端调用远程方法时会订阅注册中心中的可用服务节点信息，拿到可用服务节点之后远程调用方法，当注册中心中的可用服务节点发生变化时会通知客户端，避免客户端继续调用已经失效的节点。那客户端是如何调用远程方法的呢，来看一下远程调用示意图：

![](https://mmbiz.qpic.cn/mmbiz_jpg/qm3R3LeH8rZzymcdNKqL6PJCicpr3xo5PicEecuR5TkqVABia0mudMdXLWiasZpBia0EDPN1gNZPCwzTppjLAFjqIvw/640?wx_fmt=jpeg)

1.  客户端模块代理所有远程方法的调用
2.  将目标服务、目标方法、调用目标方法的参数等必要信息序列化
3.  序列化之后的数据包进一步压缩，压缩后的数据包通过网络通信传输到目标服务节点
4.  服务节点将接受到的数据包进行解压
5.  解压后的数据包反序列化成目标服务、目标方法、目标方法的调用参数
6.  通过服务端代理调用目标方法获取结果，结果同样需要序列化、压缩然后回传给客户端

通过以上描述，相信读者应该大体上了解了 RPC 是如何工作的，接下来看如何使用代码具体实现上述的流程。鉴于篇幅笔者会选择重要或者网络上介绍相对较少的模块来讲述。

## RPC实现细节

### 1\. 服务注册与发现

作为一个入门项目，我们的系统选用 Zookeeper 作为注册中心， ZooKeeper 将数据保存在内存中，性能很高。在`读`多`写`少的场景中尤其适用，因为`写`操作会导致所有的服务器间同步状态。服务注册与发现是典型的`读`多`写`少的协调服务场景。Zookeeper 是一个典型的CP系统，在服务选举或者集群半数机器宕机时是不可用状态，相对于服务发现中主流的AP系统来说，可用性稍低，但是用于理解RPC的实现，也是绰绰有余。

#### ZooKeeper节点介绍

*   持久节点( PERSISENT )：一旦创建，除非主动调用删除操作，否则一直持久化存储。
*   临时节点( EPHEMERAL )：与客户端会话绑定，客户端会话失效，这个客户端所创建的所有临时节点都会被删除除。
*   节点顺序( SEQUENTIAL )：创建子节点时，如果设置SEQUENTIAL属性，则会自动在节点名后追加一个整形数字，上限是整形的最大值；同一目录下共享顺序，例如（/a0000000001，/b0000000002，/c0000000003，/test0000000004）。

#### ZooKeeper服务注册

在 ZooKeeper 根节点下根据服务名创建持久节点 `/rpc/{serviceName}/service` ，将该服务的所有服务节点使用临时节点创建在 `/rpc/{serviceName}/service` 目录下，代码如下（为方便展示，后续展示代码都做了删减）：

```
public void exportService(Service serviceResource) {
  String name = serviceResource.getName();
  String uri = GSON.toJson(serviceResource);
  String servicePath = "rpc/" + name + "/service";
  zkClient.createPersistent(servicePath, true);
  String uriPath = servicePath + "/" + uri;
  //创建一个新的临时节点，当该节点宕机会话失效时，该临时节点会被清理
  zkClient.createEphemeral(uriPath);
}
```

注册效果如图，本地启动两个服务则 service 下有两个服务节点信息：

![](https://mmbiz.qpic.cn/mmbiz_jpg/qm3R3LeH8rZzymcdNKqL6PJCicpr3xo5PexcXqTibkRiaJXZgC8j28aKanaE4LicroFibeKia90v2yIeeh9mx8omfS5g/640?wx_fmt=jpeg)

![](https://mmbiz.qpic.cn/mmbiz_jpg/qm3R3LeH8rZzymcdNKqL6PJCicpr3xo5P4bb4wjmyE1JGpgkM1VB5XIibpG4RL4ZHqicjwcozuFpRb3G8HK0xmPNQ/640?wx_fmt=jpeg)

存储的节点信息包括服务名，服务 IP:PORT ，序列化协议，压缩协议等。

#### ZooKeeper服务发现

客户端启动后，不会立即从注册中心获取可用服务节点，而是在调用远程方法时获取节点信息（懒加载），并放入本地缓存 MAP 中，供后续调用，当注册中心通知目录变化时清空服务所有节点缓存，代码如下：

```java
public List<Service> getServices(String name) {
  Map<String, List<Service>> SERVER_MAP = new ConcurrentHashMap<>();
  String servicePath = "rpc/" + name + "/service";
  List<String> children = zkClient.getChildren(servicePath);
  List<Service> serviceList = Optional.ofNullable(children).orElse(new ArrayList<>()).stream().map(str -> {
    String deCh = URLDecoder.decode(str, StandardCharsets.UTF_8.toString());
    return gson.fromJson(deCh, Service.class);
  }).collect(Collectors.toList());
  SERVER_MAP.put(name, serviceList);
  return serviceList;
}
```

```java
public class ZkChildListenerImpl implements IZkChildListener {
    //监听子节点的删除和新增事件
    @Override
    public void handleChildChange(String parentPath, List<String> childList) throws Exception {
        //有变动就清空服务所有节点缓存
        String[] arr = parentPath.split("/");
        SERVER_MAP.remove(arr[2]);
    }
}
```

PS：美团分布式 ID 生成系统Leaf就使用 Zookeeper 的顺序节点来注册 WorkerID ，临时节点保存节点 IP:PORT 信息。

### 2\. 客户端实现

客户端调用本地方法一样调用远程方法的完美体验与 Java 动态代理的强大密不可分。

`DefaultRpcBaseProcessor` 抽象类实现了 `ApplicationListener` , `onApplicationEvent` 方法在 Spring 项目启动完毕会收到时间通知，获取 `ApplicationContext` 上下文之后开始注入服务 `injectService` （依赖其他服务）或者启动服务 `startServer` （自身服务实现）。

`injectService` 方法会遍历 `ApplicationContext` 上下文中的所有 `Bean` ， `Bean` 中是否有属性使用了 `InjectService` 注解。有的话生成代理类，注入到 `Bean` 的属性中。代码如下：

```java
public abstract class DefaultRpcBaseProcessor implements ApplicationListener<ContextRefreshedEvent> {
  @Override
  public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
    //Spring启动完毕会收到Event
    if (Objects.isNull(contextRefreshedEvent.getApplicationContext().getParent())) {
      ApplicationContext applicationContext = contextRefreshedEvent.getApplicationContext();
      //保存spring上下文 后续使用
      Container.setSpringContext(applicationContext);
      startServer(applicationContext);
      injectService(applicationContext);
    }
  }
  private void injectService(ApplicationContext context) {
    String[] names = context.getBeanDefinitionNames();
    for (String name : names) {
      Object bean = context.getBean(name);
      Class<?> clazz = bean.getClass();
      //clazz = clazz.getSuperclass(); aop增强的类生成cglib类，需要Superclass才能获取定义的字段
      Field[] declaredFields = clazz.getDeclaredFields();
      //设置InjectService的代理类
      for (Field field : declaredFields) {
        InjectService injectService = field.getAnnotation(InjectService.class);
        if (injectService == null) {continue;
        Class<?> fieldClass = field.getType();
        Object object = context.getBean(name);
        field.set(object, clientProxyFactory.getProxy(fieldClass, injectService.group(), injectService.version()));
        ServerDiscoveryCache.SERVER_CLASS_NAMES.add(fieldClass.getName());
      }
    }
  }
  protected abstract void startServer(ApplicationContext context);
}
```

调用 `ClientProxyFactory` 类的 `getProxy` ，根据服务接口、服务分组、服务版本、是否异步调用来创建该接口的代理类，对该接口的所有方法都会使用创建的代理类来调用。方法调用的实现细节都在 `ClientInvocationHandler` 中的 `invoke` 方法，主要内容是，获取服务节点信息，选择调用节点，构建 request 对象，最后调用网络模块发送请求。

```java
public class ClientProxyFactory {
    public <T> T getProxy(Class<T> clazz, String group, String version, boolean async) {
        return (T) objectCache.computeIfAbsent(clazz.getName() + group + version, clz -> Proxy.newProxyInstance(clazz.getClassLoader(), new Class[]{clazz}, new ClientInvocationHandler(clazz, group, version, async)));
    }
    private class ClientInvocationHandler implements InvocationHandler {
        public ClientInvocationHandler(Class<?> clazz, String group, String version, boolean async) {
        }
      
        @Override
        public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
            //1. 获得服务信息
            String serviceName = clazz.getName();
            List<Service> serviceList = getServiceList(serviceName);
            Service service = loadBalance.selectOne(serviceList);
            //2. 构建request对象
            RpcRequest rpcRequest = new RpcRequest();
            rpcRequest.setServiceName(service.getName());
            rpcRequest.setMethod(method.getName());
            rpcRequest.setGroup(group);
            rpcRequest.setVersion(version);
            rpcRequest.setParameters(args);
            rpcRequest.setParametersTypes(method.getParameterTypes());
            //3. 协议编组
            RpcProtocolEnum messageProtocol = RpcProtocolEnum.getProtocol(service.getProtocol());
            RpcCompressEnum compresser = RpcCompressEnum.getCompress(service.getCompress());
            RpcResponse response = netClient.sendRequest(rpcRequest, service, messageProtocol, compresser);
            return response.getReturnValue();
        }
    }
}
```

### 3\. 网络传输

客户端封装调用请求对象之后需要通过网络将调用信息发送到服务端，在发送请求对象之前还需要经历序列化、压缩两个阶段。

#### 序列化与反序列化

序列化与反序列化的核心作用就是对象的保存与重建，方便客户端与服务端通过字节流传递对象，快速对接交互。

*   序列化就是指把 Java 对象转换为字节序列的过程。
*   反序列化就是指把字节序列恢复为 Java 对象的过程。

Java序列化的方式有很多，诸如 JDK 自带的 `Serializable` 、 `Protobuf` 、 `kryo` 等，上述三种笔者自测性能最高的是 `Kryo` 、其次是 `Protobuf` 。`Json` 也不失为一种简单且高效的序列化方法，有很多大道至简的框架采用。序列化接口比较简单，读者可以自行查看实现代码。

```java
public interface MessageProtocol {
    byte[] marshallingRequest(RpcRequest request) throws Exception;

    RpcRequest unmarshallingRequest(byte[] data) throws Exception;

    byte[] marshallingResponse(RpcResponse response) throws Exception;

    RpcResponse unmarshallingResponse(byte[] data) throws Exception;
}
```

#### 压缩与解压

网络通信的成本很高，为了减小网络传输数据包的体积，将序列化之后的字节码压缩不失为一种很好的选择。Gzip 压缩算法比率在3到10倍左右，可以大大节省服务器的网络带宽，各种流行的 web 服务器也都支持 Gzip 压缩算法。Java 接入也比较容易，接入代码可以查看下方接口的实现。

```java
public interface Compresser {
    byte[] compress(byte[] bytes);

    byte[] decompress(byte[] bytes);
}
```

#### 网络通信

万事俱备只欠东风。将请求对象序列化成字节码，并且压缩体积之后，需要使用网络将字节码传输到服务器。常用网络传输协议有 HTTP 、 TCP 、 WebSocke t等。HTTP、WebSocket 是应用层协议，TCP 是传输层协议。有些追求简洁、易用的 RPC 框架也有选择 HTTP 协议的。TCP传输的高可靠性和极致性能是主流RPC框架选择的最主要原因。谈到 Java 生态的通信领域，`Netty` 的领衔地位短时间内无人能及。选用 Netty 作为网络通信模块， TCP 数据流的粘包、拆包不可避免。

**粘包、拆包问题**

TCP 传输协议是一种面向连接的、可靠的、基于字节流的传输层通信协议。为了最大化传输效率。发送方可能将单个较小数据包合并发送，这种情况就需要接收方来拆包处理数据了。

Netty 提供了3种类型的解码器来处理 TCP 粘包/拆包问题：

*   定长消息解码器：`FixedLengthFrameDecoder` 。发送方和接收方规定一个固定的消息长度，不够用空格等字符补全，这样接收方每次从接受到的字节流中读取固定长度的字节即可，长度不够就保留本次接受的数据，再在下一个字节流中获取剩下数量的字节数据。
*   分隔符解码器：`LineBasedFrameDecoder` 或 `DelimiterBasedFrameDecoder`。`LineBasedFrameDecoder` 是行分隔符解码器，分隔符为 `\n` 或 `\r\n` ；`DelimiterBasedFrameDecoder` 是自定义分隔符解码器，可以定义一个或多个分隔符。接收端在收到的字节流中查找分隔符，然后返回分隔符之前的数据，没找到就继续从下一个字节流中查找。
*   数据长度解码器：`LengthFieldBasedFrameDecoder`。将发送的消息分为 header 和 body，header 存储消息的长度（字节数），body 是发送的消息的内容。同时发送方和接收方要协商好这个 header 的字节数，因为 int 能表示长度，long 也能表示长度。接收方首先从字节流中读取前n（header的字节数）个字节（header），然后根据长度读取等量的字节，不够就从下一个数据流中查找。

不想使用内置的解码器也可自定义解码器，自定传输协议。

网络通信这部分内容比较复杂，说来话长，代码易读，读者可先自行阅读代码。后续有机会细说此节内容。

### 5\. 服务端实现

客户端通过网络传输将请求对象序列化、压缩之后的字节码传输到服务端之后，同样先通过解压、反序列化将字节码重建为请求对象。有了请求对象之后，就可以进行关键的方法调用环节了。

```java
public abstract class RequestBaseHandler {
    public RpcResponse handleRequest(RpcRequest request) throws Exception {
        //1. 查找目标服务代理对象
        ServiceObject serviceObject = serverRegister.getServiceObject(request.getServiceName() + request.getGroup() + request.getVersion());
        RpcResponse response = null;
        //2. 调用对应的方法
        response = invoke(serviceObject, request);
        //响应客户端
        return response;
    }
    //具体代理调用
    public abstract RpcResponse invoke(ServiceObject serviceObject, RpcRequest request) throws Exception;
}
```

上述抽象类 `RequestBaseHandler` 是调用服务方法的抽象实现 `handleRequest` 通过请求对象的服务名、服务分组、服务版本在 `serverRegister.getServiceObject` 获取代理对象。然后调用 `invoke` 抽象方法来真正通过代理对象调用方法获得结果。

1.  服务的代理对象怎么产生的？
2.  如何通过代理对象调用方法？

#### 生成服务代理对象

带着上述问题来看 `DefaultRpcBaseProcessor` 抽象类：

```java
public abstract class DefaultRpcBaseProcessor implements ApplicationListener<ContextRefreshedEvent> {
    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        //Spring启动完毕会收到Event
        if (Objects.isNull(contextRefreshedEvent.getApplicationContext().getParent())) {
            ApplicationContext applicationContext = contextRefreshedEvent.getApplicationContext();
            Container.setSpringContext(applicationContext);
            startServer(applicationContext);
            injectService(applicationContext);
        }
    }
    private void injectService(ApplicationContext context) {}

    protected abstract void startServer(ApplicationContext context);
}
```

`DefaultRpcBaseProcessor` 抽象类也有两个实现类 `DefaultRpcReflectProcessor` 和 `DefaultRpcJavassistProcessor`，**来实现关键的生成代理对象的 `startServer` 方法**。

##### 服务接口实现类的 `Bean` 作为代理对象

```java
public class DefaultRpcReflectProcessor extends DefaultRpcBaseProcessor {
    @Override
    protected void startServer(ApplicationContext context) {
        Map<String, Object> beans = context.getBeansWithAnnotation(RpcService.class);
        if (beans.size() > 0) {
            boolean startServerFlag = true;
            for (Object obj : beans.values()) {
              Class<?> clazz = obj.getClass();
              Class<?>[] interfaces = clazz.getInterfaces();
              /* 如果只实现了一个接口就用接口的className作为服务名

               * 如果该类实现了多个接口，则使用注解里的value作为服务名

               */
              RpcService service = clazz.getAnnotation(RpcService.class);
              if (interfaces.length != 1) {
                String value = service.value();
                ServiceObject so = new ServiceObject(value, Class.forName(value), obj, service.group(), service.version());
              } else {
                Class<?> supperClass = interfaces[0];
                ServiceObject so = new ServiceObject(supperClass.getName(), supperClass, obj, service.group(), service.version());
              }
              serverRegister.register(so);
            }
        }
    }
}
```

`DefaultRpcReflectProcessor` 中获取到所有有 `RpcService` 注解的服务接口实现类 `Bean`，然后将该 `Bean` 作为服务代理对象注册到 `serverRegister` 中供上述的反射调用中使用。

##### 使用 `Javassist` 生成新的代理对象

```java
public class DefaultRpcJavassistProcessor extends DefaultRpcBaseProcessor {
    @Override
    protected void startServer(ApplicationContext context) {
        Map<String, Object> beans = context.getBeansWithAnnotation(RpcService.class);
        if (beans.size() > 0) {
            boolean startServerFlag = true;
            for (Map.Entry<String, Object> entry : beans.entrySet()) {
              String beanName = entry.getKey();
              Object obj  = entry.getValue();
              Class<?> clazz = obj.getClass();
              Class<?>[] interfaces = clazz.getInterfaces();
              Method[] declaredMethods = clazz.getDeclaredMethods();
              /*

               * 如果只实现了一个接口就用接口的className作为服务名

               * 如果该类实现了多个接口，则使用注解里的value作为服务名

               */
              RpcService service = clazz.getAnnotation(RpcService.class);
              if (interfaces.length != 1) {
                String value = service.value();
                //bean实现多个接口时，javassist代理类中生成的方法只按照注解指定的服务类来生成
                declaredMethods = Class.forName(value).getDeclaredMethods();
                Object proxy = ProxyFactory.makeProxy(value, beanName, declaredMethods);
                ServiceObject so = new ServiceObject(value, Class.forName(value), proxy, service.group(), service.version());
              } else {
                Class<?> supperClass = interfaces[0];
                Object proxy = ProxyFactory.makeProxy(supperClass.getName(), beanName, declaredMethods);
                ServiceObject so = new ServiceObject(supperClass.getName(), supperClass, proxy, service.group(), service.version());
              }
              serverRegister.register(so);
            }
        }
    }
}
```

`DefaultRpcJavassistProcessor` 与 `DefaultRpcReflectProcessor` 的差异在于后者直接将服务实现类对象 `Bean` 作为服务代理对象，而前者通过 `ProxyFactory.makeProxy(value, beanName, declaredMethods)` 创建了新的代理对象，将新的代理对象注册到 `serverRegister` 中供后续调用调用中使用。该方法通过 `Javassist` 来生成代理类，代码冗长，建议阅读源码。我来通过下面的代码演示实现的代理类。

首先我们的服务接口是：

```java
public interface HelloService {
    String hello(String name);
}
```

服务的实现类是:

```java
@RpcService
public class HelloServiceImpl implements HelloService {
    @Override
    public String hello(String name) {
        return "a1";
    }
}
```

那最终新生成的代理类是这样的：

```java
public class HelloService$proxy1649315143476 {
    private static cn.ppphuang.rpcspringstarter.service.HelloService serviceProxy = 
 ((org.springframework.context.ApplicationContext)cn.ppphuang.rpcspringstarter.server.Container.getSpringContext()).getBean("helloServiceImpl");
  
    public cn.ppphuang.rpcspringstarter.common.model.RpcResponse hello(cn.ppphuang.rpcspringstarter.common.model.RpcRequest request) throws java.lang.Exception {
        java.lang.Object[] params = request.getParameters();
        if(params.length == 1
           && (params[0] == null||params[0].getClass().getSimpleName().equalsIgnoreCase("String"))){
            java.lang.String arg0 = null;
            arg0 = cn.ppphuang.rpcspringstarter.util.ConvertUtil.convertToString(params[0]);
            java.lang.String returnValue = serviceProxy.hello(arg0);
            return new cn.ppphuang.rpcspringstarter.common.model.RpcResponse(returnValue);
        }
    }
  
    public cn.ppphuang.rpcspringstarter.common.model.RpcResponse invoke(cn.ppphuang.rpcspringstarter.common.model.RpcRequest request) throws java.lang.Exception {
        String methodName = request.getMethod();
        if(methodName.equalsIgnoreCase("hello")){
            java.lang.Object returnValue = hello(request);
            return returnValue;
        }
    }
}
```

清理全限定类名后，代码如下：

```java
public class HelloService$proxy1649315143476 {
    private static HelloService serviceProxy = ((ApplicationContext)Container.getSpringContext()).getBean("helloServiceImpl");
  
    public RpcResponse hello(RpcRequest request) throws Exception {
        Object[] params = request.getParameters();
        if(params.length == 1
           && (params[0] == null|| params[0].getClass().getSimpleName().equalsIgnoreCase("String"))){
            String arg0 = ConvertUtil.convertToString(params[0]);
            String returnValue = serviceProxy.hello(arg0);
            return new RpcResponse(returnValue);
        }
    }

    public RpcResponse invoke(RpcRequest request) throws Exception {
        String methodName = request.getMethod();
        if(methodName.equalsIgnoreCase("hello")){
            Object returnValue = hello(request);
            return returnValue;
        }
    }
}
```

*   代理类 `HelloService$proxy1649315143476` 中有一个服务接口类型 `HelloService` 的静态属性 `serviceProxy`，值就是通过 `ApplicationContext` 上下文获取到的服务接口实现类 `HelloServiceImpl` 这个 `Bean`（`SpringContext` 已经被提前缓存到 `Container` 类中，读者可以自行查找代码了解）。
*   `public RpcResponse invoke(RpcRequest request) throws Exception` 该方法判断调用的方法名是 `hello` 来调用代理类中的`hello`方法。
*   `public RpcResponse hello(RpcRequest request) throws Exception` 该方法通过调用 `serviceProxy.hello()` 的方法获取结果。

```java
public interface InvokeProxy {
    /**

     * invoke调用服务接口

     */
    RpcResponse invoke(RpcRequest rpcRequest) throws Exception;
}
```

`HelloService$proxy1649315143476` 类实现 `InvokeProxy` 接口（`ProxyFactory.makeProxy` 代码中有体现）。`InvokeProxy` 接口只有一个 `invoke` 方法。到这里就能理解通过调用代理对象的 `invoke` 方法就能间接调用到服务接口实现类 `HelloServiceImpl` 的对应方法了。

#### 调用代理对象方法

理清代理对象的生成之后，开始调用代理对象的方法。

上文中写到的抽象类 `RequestBaseHandler` 有两个实现类 `RequestJavassistHandler` 和 `RequestReflectHandler`。

**Java 反射调用**

先看 `RequestReflectHandler`：

```java
public class RequestReflectHandler extends RequestBaseHandler {
    @Override
    public RpcResponse invoke(ServiceObject serviceObject, RpcRequest request) throws Exception {
        Method method = serviceObject.getClazz().getMethod(request.getMethod(), request.getParametersTypes());
        Object value = method.invoke(serviceObject.getObj(), request.getParameters());
        RpcResponse response = new RpcResponse(RpcStatusEnum.SUCCESS);
        response.setReturnValue(value);
        return response;
    }
}
```

Object value = method.invoke(serviceObject.getObj(), request.getParameters());

这行代码都很熟悉，用 Java 框架中最常见的反射来调用代理类中的方法，大部分 RPC 框架也都是这么来实现的。

**通过 Javassists 生成的代理对象 `invoke` 方法调用**

接着看 `RequestJavassistHandler`:

```java
public class RequestJavassistHandler extends RequestBaseHandler {
    @Override
    public RpcResponse invoke(ServiceObject serviceObject, RpcRequest request) throws Exception {
        InvokeProxy invokeProxy = (InvokeProxy) serviceObject.getObj();
        return invokeProxy.invoke(request);
    }
}
```

直接将代理对象转为 `InvokeProxy`，调用 `InvokeProxy.invoke()` 方法获得返回值，如果这里不能理解，回头再看一下使用 `Javassist` 生成新的代理对象这个小节吧。

调用代理对象的方法获取到结果，仍要通过序列化、压缩后，将字节流数据包通过网络传输到客户端，客户端拿到响应的结果再解压，反序列化得到结果对象。

#### Javassist介绍

`Javassist` 是一个开源的分析、编辑和创建Java字节码的类库。是由东京工业大学的数学和计算机科学系的  `Shigeru Chiba(千叶滋)`所创建的。简单来说就是用源码级别的 api 去修改字节码。`Duboo`、`MyBatis` 也都使用了 `Javassist`。Duboo 作者也选择`Javassist`作为 Duboo 的代理工具，可以点击这里查看 Duboo 作者也选择 `Javassist` 的原因。

`Javassist` 还能和谐（pojie）Java 编写的商业软件，例如抓包工具 `Charles`。代码在这里，供交流学习。

在使用 `Javassist` 有踩到如下坑，供大家参考：

1.  `Javassist` 是运行时，没有 `JDK` 静态编译过程，`JDK` 的很多语法糖都是在静态编译过程中处理的，所以需要自行编码处理，例如自动拆装箱。

```java
int i = 1;
Integer ii = i;               //javassist 错误 JDK会自动装箱，javassist需要自行编码处理 

int i = 1;
Integer ii = new Integer(i);  //javassist 正确
```
2.  自定义的类需要使用类的完全限定名，这也是为什么生成的代理类中类都是完全限定名。

#### 选择哪种代理方式

可以通过配置文件 `application.properties` 修改 `hp.rpc.server-proxy-type` 的值来选择代理模式。

性能测试，机器 Macbook Pro M1 8C 16G， 代码如下：

```java
@Autowired
ClientProxyFactory clientProxyFactory;
@Test
void contextLoads() {
  long l1 = System.currentTimeMillis();
  HelloService proxy = clientProxyFactory.getProxy(HelloService.class,"group3","version3");
  for (int i = 0; i < 1000000; i++) {
    String ppphuang = proxy.hello("ppphuang");
  }
  long l2 = System.currentTimeMillis();
  long l3 = l2 - l1;
  System.out.println(l3);
}
```

测试结果（ms）：

请求次数|反射调用1|反射调用2|反射调用3|Javassist1|Javassist2|Javassist3|
---|---|---|---|---|---|---|
10000|1303|1159|1164|1126|1235|1094|
100000|6110|6103|6065|6259|5854|6178|
1000000|54475|51890|52329|52560|52099|52794|

测试结果差异并不大，`Javassist` 模式下只是稍快了一点点，几乎可以忽略不记。与Duboo作者博客6楼评论的测试结果一致。所以想简单通用性强用反射模式，也可以通过使用 `Javassist` 模式来学习更多知识，因为 `Javassist` 需要自己兼容很多特殊的状况，反射调用 JDK 已经帮你兼容完了。

## 总结

写到这里我们了解了 RPC 的基本原理、服务注册与发现、客户端代理、网络传输、重点介绍了服务端的两种代理模式，学习 `Javassist` 如何实现代理。

还有很多东西没有重点讲述甚至没有提及，例如粘、拆包的处理、自定义数据包协议、`Javassist` 模式下如何实现方法重载、如何解决一个服务接口类有多个实现、如何解决一个实现类实现了多个服务接口、在 `SpringBoot` 中如何自动装载、如何开箱即用、怎么实现异步调用、怎么扩展序列化、压缩算法等等...有兴趣的球友可以在源码中寻找答案，或者寻找优化项，当然也可以寻找 bug 。如果球友能理解整个项目的实现，相信你一定会有所收获。

## 附录

项目地址：https://github.com/ppphuang/rpc-spring-starter

测试DEMO：https://github.com/ppphuang/rpc-spring-starter-demo

  

>参考链接：[https://mp.weixin.qq.com/s/C9LVfEmo-kQbUnKDt3KuGw](https://mp.weixin.qq.com/s/C9LVfEmo-kQbUnKDt3KuGw)，出处：黎杜，整理：沉默王二
