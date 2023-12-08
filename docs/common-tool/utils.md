---
title: 其他常用Java工具类：IPUtil、CollectionUtils、MDC、ClassUtils、BeanUtils、ReflectionUtils
shortTitle: 其他常用工具类
category:
  - Java核心
tag:
  - 常用工具类
description: 描述：本文详细介绍了Java编程中常用的一些工具类，如IpUtil、MDC、ClassUtils、BeanUtils、ReflectionUtils等。通过具体的代码示例，阐述了这些工具类在实际应用中的优势和使用方法。掌握这些实用的Java工具类，让您在Java编程中轻松应对各种开发任务，提高开发效率。
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,二哥的Java进阶之路,Java进阶之路,Java入门,教程,java,工具类,轮子,java 工具类,java IPUtil,java CollectionUtils
---

# 9.8 其他常用工具类

除了我们前面提到的 Java 原生工具类，比如说 [Arrays](https://javabetter.cn/common-tool/arrays.html)、[Objects](https://javabetter.cn/common-tool/Objects.html)、[Collections](https://javabetter.cn/common-tool/collections.html)、[Scanner](https://javabetter.cn/common-tool/scanner.html) 等，还有一些第三方的工具类，比如说 [Hutool](https://javabetter.cn/common-tool/hutool.html)、[Guava](https://javabetter.cn/common-tool/guava.html) 等，以及我们今天介绍的 IpUtil、CollectionUtils、StringUtils、MDC、ClassUtils、BeanUtils、ReflectionUtils 等等，在很大程度上能够提高我们的生产效率。

当然了，如果能好好看一下它们的源码，对技术功底的提升，也是有很大帮助的。

### IpUtil：获取本机 Ip

获取本机 IP 算是比较常见的一个需求场景了，比如业务报警，可能就会带上出问题的机器 IP，方便直接上去看日志定位问题，那么问题来了，如何获取机器 IP 呢？

#### 1. 基本方法

如何获取机器 IP？如果了解 InetAddress 这个工具类，就很容易写出一个简单的工具类，如下

```java
public static String getLocalIP() {
    try {
        return InetAddress.getLocalHost().getHostAddress();
    } catch (UnknownHostException e) {
        throw new RuntimeException(e);
    }
}
```

上面的实现有问题么？

当然没问题，拿我本机和阿里服务器执行一下，并没有问题如实的输出了预期的 IP

本机执行后截图如下：

![](https://cdn.tobebetterjavaer.com/stutymore/utils-20230330093633.png)

阿里云机器执行后截图如下：

![](https://cdn.tobebetterjavaer.com/stutymore/utils-20230330095801.png)

#### 2. 进阶版

做一点简单的改动，获取 IPV4 的地址，源码如下

```java
public static String getLocalIpByNetcard() {
    try {
        // 枚举所有的网络接口
        for (Enumeration<NetworkInterface> e = NetworkInterface.getNetworkInterfaces(); e.hasMoreElements(); ) {
            // 获取当前网络接口
            NetworkInterface item = e.nextElement();

            // 遍历当前网络接口的所有地址
            for (InterfaceAddress address : item.getInterfaceAddresses()) {
                // 忽略回环地址和未启用的网络接口
                if (item.isLoopback() || !item.isUp()) {
                    continue;
                }

                // 如果当前地址是 IPv4 地址，则返回其字符串表示
                if (address.getAddress() instanceof Inet4Address) {
                    Inet4Address inet4Address = (Inet4Address) address.getAddress();
                    return inet4Address.getHostAddress();
                }
            }
        }

        // 如果没有找到任何 IPv4 地址，则返回本地主机地址
        return InetAddress.getLocalHost().getHostAddress();
    } catch (SocketException | UnknownHostException e) {
        // 抛出运行时异常
        throw new RuntimeException(e);
    }
}
```

需要注意的是，这段代码只返回本机的 IPv4 地址，并且只返回第一个符合条件的地址。如果本机有多个网络接口或者每个接口有多个地址，则可能无法返回预期的地址。此外，如果找不到任何 IPv4 地址，则会返回本地主机地址。

再次测试，输出如下

![](https://cdn.tobebetterjavaer.com/stutymore/utils-20230330100334.png)

#### 3. 完整工具类

```java
import java.net.*;
import java.util.Enumeration;

public class IPUtil {
    public static final String DEFAULT_IP = "127.0.0.1";

    /**
     * 直接根据第一个网卡地址作为其内网ipv4地址，避免返回 127.0.0.1
     *
     * @return 第一个符合条件的内网 IPv4 地址
     */
    public static String getLocalIpByNetcard() {
        try {
            // 枚举所有的网络接口
            for (Enumeration<NetworkInterface> e = NetworkInterface.getNetworkInterfaces(); e.hasMoreElements(); ) {
                // 获取当前网络接口
                NetworkInterface item = e.nextElement();
                // 遍历当前网络接口的所有地址
                for (InterfaceAddress address : item.getInterfaceAddresses()) {
                    // 忽略回环地址和未启用的网络接口
                    if (item.isLoopback() || !item.isUp()) {
                        continue;
                    }
                    // 如果当前地址是 IPv4 地址，则返回其字符串表示
                    if (address.getAddress() instanceof Inet4Address) {
                        Inet4Address inet4Address = (Inet4Address) address.getAddress();
                        return inet4Address.getHostAddress();
                    }
                }
            }
            // 如果没有找到符合条件的地址，则返回本地主机地址
            return InetAddress.getLocalHost().getHostAddress();
        } catch (SocketException | UnknownHostException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 获取本地主机地址
     *
     * @return 本地主机地址
     */
    public static String getLocalIP() {
        try {
            return InetAddress.getLocalHost().getHostAddress();
        } catch (UnknownHostException e) {
            throw new RuntimeException(e);
        }
    }
}
```

IPUtil 类中定义了两个方法，分别是 `getLocalIpByNetcard()` 和 `getLocalIP()`。前者是获取本机的内网 IPv4 地址，避免了返回 127.0.0.1 的问题。后者是获取本地主机地址，如果本机有多个 IP 地址，则可能返回其中的任意一个。

### MDC：一个线程安全的参数传递工具类

`MDC` 是 [`org.slf4j`](https://javabetter.cn/gongju/slf4j.html) 包下的一个类，它的全称是 Mapped Diagnostic Context，我们可以认为它是一个线程安全的存放诊断日志的容器。

MDC 的底层是用了 [`ThreadLocal`](https://javabetter.cn/thread/ThreadLocal.html) 来保存数据的。

我们可以用它传递参数。

例如现在有这样一种场景：我们使用`RestTemplate`调用远程接口时，有时需要在`header`中传递信息，比如：traceId，source 等，便于在查询日志时能够串联一次完整的请求链路，快速定位问题。

这种业务场景就能通过`ClientHttpRequestInterceptor`接口实现，具体做法如下：

第一步，定义一个 LogFilter 拦截所有接口请求，在 MDC 中设置 traceId：

```java
public class LogFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        MdcUtil.add(UUID.randomUUID().toString());
        System.out.println("记录请求日志");
        chain.doFilter(request, response);
        System.out.println("记录响应日志");
    }

    @Override
    public void destroy() {
    }
}
```

第二步，实现`ClientHttpRequestInterceptor`接口，MDC 中获取当前请求的 traceId，然后设置到 header 中：

```java
public class RestTemplateInterceptor implements ClientHttpRequestInterceptor {

    @Override
    public ClientHttpResponse intercept(HttpRequest request, byte[] body, ClientHttpRequestExecution execution) throws IOException {
        request.getHeaders().set("traceId", MdcUtil.get());
        return execution.execute(request, body);
    }
}
```

第三步，定义配置类，配置上面定义的`RestTemplateInterceptor`类：

```java
@Configuration
public class RestTemplateConfiguration {

    @Bean
    public RestTemplate restTemplate() {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setInterceptors(Collections.singletonList(restTemplateInterceptor()));
        return restTemplate;
    }

    @Bean
    public RestTemplateInterceptor restTemplateInterceptor() {
        return new RestTemplateInterceptor();
    }
}
```

其中 MdcUtil 其实是利用 MDC 工具在 ThreadLocal 中存储和获取 traceId

```java
public class MdcUtil {

    private static final String TRACE_ID = "TRACE_ID";

    public static String get() {
        return MDC.get(TRACE_ID);
    }

    public static void add(String value) {
        MDC.put(TRACE_ID, value);
    }
}
```

当然，这个例子中没有演示 MdcUtil 类的 add 方法具体调的地方，我们可以在 filter 中执行接口方法之前，生成 traceId，调用 MdcUtil 类的 add 方法添加到 MDC 中，然后在同一个请求的其他地方就能通过 MdcUtil 类的 get 方法获取到该 traceId。

能使用 MDC 保存 traceId 等参数的根本原因是，用户请求到应用服务器，Tomcat 会从线程池中分配一个线程去处理该请求。

那么该请求的整个过程中，保存到 MDC 的 ThreadLocal 中的参数，也是该线程独享的，所以不会有线程安全问题。

### ClassUtils

spring 的`org.springframework.util`包下的`ClassUtils`类，它里面有很多让我们惊喜的功能。

它里面包含了类和对象相关的很多非常实用的方法。

#### 获取对象的所有接口

如果你想获取某个对象的所有接口，可以使用 ClassUtils 的`getAllInterfaces`方法。例如：

```java
Class<?>[] allInterfaces = ClassUtils.getAllInterfaces(new User());
```

#### 获取某个类的包名

如果你想获取某个类的包名，可以使用 ClassUtils 的`getPackageName`方法。例如：

```java
String packageName = ClassUtils.getPackageName(User.class);
System.out.println(packageName);
```

#### 判断某个类是否内部类

如果你想判断某个类是否内部类，可以使用 ClassUtils 的`isInnerClass`方法。例如：

```java
System.out.println(ClassUtils.isInnerClass(User.class));
```

#### 判断对象是否代理对象

如果你想判断对象是否代理对象，可以使用 ClassUtils 的`isCglibProxy`方法。例如：

```java
System.out.println(ClassUtils.isCglibProxy(new User()));
```

ClassUtils 还有很多有用的方法，等待着你去发掘。感兴趣的小伙伴，可以看看下面的内容：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/common-tool/utils-c58920ac-cf04-4d95-ad29-90339a086569.jpg)

### BeanUtils

Spring 给我们提供了一个`JavaBean`的工具类，它在`org.springframework.beans`包下面，它的名字叫做：`BeanUtils`。

让我们一起看看这个工具可以带给我们哪些惊喜。

#### 拷贝对象的属性

曾几何时，你有没有这样的需求：把某个对象中的所有属性，都拷贝到另外一个对象中。这时就能使用 BeanUtils 的`copyProperties`方法。例如：

```java
User user1 = new User();
user1.setId(1L);
user1.setName("沉默王二");
user1.setAddress("中国");

User user2 = new User();
BeanUtils.copyProperties(user1, user2);
System.out.println(user2);
```

#### 实例化某个类

如果你想通过反射实例化一个类的对象，可以使用 BeanUtils 的`instantiateClass`方法。例如：

```java
User user = BeanUtils.instantiateClass(User.class);
System.out.println(user);
```

#### 获取指定类的指定方法

如果你想获取某个类的指定方法，可以使用 BeanUtils 的`findDeclaredMethod`方法。例如：

```java
Method declaredMethod = BeanUtils.findDeclaredMethod(User.class, "getId");
System.out.println(declaredMethod.getName());
```

#### 获取指定方法的参数

如果你想获取某个方法的参数，可以使用 BeanUtils 的`findPropertyForMethod`方法。例如：

```java
Method declaredMethod = BeanUtils.findDeclaredMethod(User.class, "getId");
PropertyDescriptor propertyForMethod = BeanUtils.findPropertyForMethod(declaredMethod);
System.out.println(propertyForMethod.getName());
```

如果你对 BeanUtils 比较感兴趣，可以看看下面内容：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/common-tool/utils-629ecd75-259b-46aa-b1dd-82606cfc92ee.jpg)

### ReflectionUtils

有时候，我们需要在项目中使用`反射`功能，如果使用最原始的方法来开发，代码量会非常多，而且很麻烦，它需要处理一大堆异常以及访问权限等问题。

好消息是 Spring 给我们提供了一个`ReflectionUtils`工具，它在`org.springframework.util`包下面。

#### 获取方法

如果你想获取某个类的某个方法，可以使用 ReflectionUtils 类的`findMethod`方法。例如：

```java
Method method = ReflectionUtils.findMethod(User.class, "getId");
```

#### 获取字段

如果你想获取某个类的某个字段，可以使用 ReflectionUtils 类的`findField`方法。例如：

```java
Field field = ReflectionUtils.findField(User.class, "id");
```

#### 执行方法

如果你想通过反射调用某个方法，传递参数，可以使用 ReflectionUtils 类的`invokeMethod`方法。例如：

```java
 ReflectionUtils.invokeMethod(method, springContextsUtil.getBean(beanName), param);
```

#### 判断字段是否常量

如果你想判断某个字段是否常量，可以使用 ReflectionUtils 类的`isPublicStaticFinal`方法。例如：

```java
Field field = ReflectionUtils.findField(User.class, "id");
System.out.println(ReflectionUtils.isPublicStaticFinal(field));
```

#### 判断是否 equals 方法

如果你想判断某个方法是否 equals 方法，可以使用 ReflectionUtils 类的`isEqualsMethod`方法。例如：

```java
Method method = ReflectionUtils.findMethod(User.class, "getId");
System.out.println(ReflectionUtils.isEqualsMethod(method));
```

当然这个类还有不少有趣的方法，感兴趣的朋友，可以看看下面内容：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/common-tool/utils-0a4ecb9c-b9d2-4090-a7b7-c626a0672b94.jpg)

>参考链接：[https://juejin.cn/post/7102418518599008286](https://juejin.cn/post/7102418518599008286) 作者：苏三，编辑：沉默王二

---

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
