---
title: 这10个工具类，让我的开发效率提升了50%
shortTitle: 10个提升开发效率的Java工具类
category:
  - Java核心
tag:
  - 常用工具类
description: Java程序员进阶之路，小白的零基础Java教程，从入门到进阶，这10个工具类，让我的开发效率提升了50%
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,java,工具类,轮子
---

## IpUtil：获取本机Ip的工具类

获取本机Ip算是比较常见的一个需求场景了，比如业务报警，可能就会带上出问题的机器IP，方便直接上去看日志定位问题，那么问题来了，如何获取机器IP呢？


### 1. 基本方法

如何获取机器Ip？如果了解InetAddress这个工具类，就很容易写出一个简单的工具类，如下

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

当然没问题，拿我本机和阿里服务器执行一下，并没有问题如实的输出了预期的IP

本机执行后截图如下：

![本机](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/common-tool/IpUtil-f35dc96f-b8ac-43d3-9393-0ff565e85fb9.jpg)


阿里云机器执行后截图如下：

![阿里云](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/common-tool/IpUtil-f50b0de2-cf0d-4e9b-8f10-838ea4b47fd8.jpg)


再问一句，那是否就真的没有问题了呢？

- 在某些情况下，可能返回的是 `127.0.0.1`


在虚拟机中执行时，就可能遇到这个问题，截图如下


![虚拟机](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/common-tool/IpUtil-7c14024b-57d1-4086-9f51-d7bf312b5fbf.jpg)

### 2. 进阶版

做一点简单的改动，获取IpV4的地址，源码如下

```java
/**
 * 直接根据第一个网卡地址作为其内网ipv4地址，避免返回 127.0.0.1
 *
 * @return
 */
public static String getLocalIpByNetcard() {
    try {
        for (Enumeration<NetworkInterface> e = NetworkInterface.getNetworkInterfaces(); e.hasMoreElements(); ) {
            NetworkInterface item = e.nextElement();
            for (InterfaceAddress address : item.getInterfaceAddresses()) {
                if (item.isLoopback() || !item.isUp()) {
                    continue;
                }
                if (address.getAddress() instanceof Inet4Address) {
                    Inet4Address inet4Address = (Inet4Address) address.getAddress();
                    return inet4Address.getHostAddress();
                }
            }
        }
        return InetAddress.getLocalHost().getHostAddress();
    } catch (SocketException | UnknownHostException e) {
        throw new RuntimeException(e);
    }
}
```

再次测试，输出如下


![虚拟机](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/common-tool/IpUtil-cd2f2acb-a6ea-4675-82a8-95a7e05c8498.jpg)


### 3. 完整工具类

```java
import java.net.*;
import java.util.Enumeration;

public class IpUtil {
    public static final String DEFAULT_IP = "127.0.0.1";

    /**
     * 直接根据第一个网卡地址作为其内网ipv4地址，避免返回 127.0.0.1
     *
     * @return
     */
    public static String getLocalIpByNetcard() {
        try {
            for (Enumeration<NetworkInterface> e = NetworkInterface.getNetworkInterfaces(); e.hasMoreElements(); ) {
                NetworkInterface item = e.nextElement();
                for (InterfaceAddress address : item.getInterfaceAddresses()) {
                    if (item.isLoopback() || !item.isUp()) {
                        continue;
                    }
                    if (address.getAddress() instanceof Inet4Address) {
                        Inet4Address inet4Address = (Inet4Address) address.getAddress();
                        return inet4Address.getHostAddress();
                    }
                }
            }
            return InetAddress.getLocalHost().getHostAddress();
        } catch (SocketException | UnknownHostException e) {
            throw new RuntimeException(e);
        }
    }

    public static String getLocalIP() {
        try {
            return InetAddress.getLocalHost().getHostAddress();
        } catch (UnknownHostException e) {
            throw new RuntimeException(e);
        }
    }
}
```

## CollectionUtils：Spring和Apache都有提供的集合工具类

对集合操作，除了前面说的`Collections`工具类之后，`CollectionUtils`工具类也非常常用。

目前比较主流的是`spring`的`org.springframework.util`包下的CollectionUtils工具类。
![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/common-tool/CollectionUtils-3433117c-4ab2-4ac4-bf5b-4b729d87fc9a.jpg)

和`apache`的`org.apache.commons.collections`包下的CollectionUtils工具类。
![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/common-tool/CollectionUtils-1bc7dfe9-f459-47bb-ae4b-2a25d4be96c1.jpg)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/common-tool/CollectionUtils-2b8630a3-141b-4f18-9f54-5a37fc818420.jpg)
> 我个人更推荐使用apache的包下的CollectionUtils工具类，因为它的工具更多更全面。

举个简单的例子，`spring`的CollectionUtils工具类没有判断集合不为空的方法。而`apache`的CollectionUtils工具类却有。

下面我们以`apache`的CollectionUtils工具类为例，介绍一下常用方法。

### 集合判空
通过CollectionUtils工具类的`isEmpty`方法可以轻松判断集合是否为空，`isNotEmpty`方法判断集合不为空。
```java
List<Integer> list = new ArrayList<>();
list.add(2);
list.add(1);
list.add(3);

if (CollectionUtils.isEmpty(list)) {
    System.out.println("集合为空");
}

if (CollectionUtils.isNotEmpty(list)) {
    System.out.println("集合不为空");
}
```
### 对两个集合进行操作
有时候我们需要对已有的两个集合进行操作，比如取交集或者并集等。
```java
List<Integer> list = new ArrayList<>();
list.add(2);
list.add(1);
list.add(3);

List<Integer> list2 = new ArrayList<>();
list2.add(2);
list2.add(4);

//获取并集
Collection<Integer> unionList = CollectionUtils.union(list, list2);
System.out.println(unionList);

//获取交集
Collection<Integer> intersectionList = CollectionUtils.intersection(list, list2);
System.out.println(intersectionList);

//获取交集的补集
Collection<Integer> disjunctionList = CollectionUtils.disjunction(list, list2);
System.out.println(disjunctionList);

//获取差集
Collection<Integer> subtractList = CollectionUtils.subtract(list, list2);
System.out.println(subtractList);
```
执行结果：
```java
[1, 2, 3, 4]
[2]
[1, 3, 4]
[1, 3]
```
说句实话，对两个集合的操作，在实际工作中用得挺多的，特别是很多批量的场景中。以前我们需要写一堆代码，但没想到有现成的轮子。

## StringUtils：专为 Java 字符串而生的工具类

`字符串`（String）在我们的日常工作中，用得非常非常非常多。

在我们的代码中经常需要对字符串判空，截取字符串、转换大小写、分隔字符串、比较字符串、去掉多余空格、拼接字符串、使用正则表达式等等。

如果只用String类提供的那些方法，我们需要手写大量的额外代码，不然容易出现各种异常。

现在有个好消息是：`org.apache.commons.lang3`包下的`StringUtils`工具类，给我们提供了非常丰富的选择。

### 字符串判空
其实空字符串，不只是null一种，还有""，" "，"null"等等，多种情况。

StringUtils给我们提供了多个判空的静态方法，例如：
```java
 String str1 = null;
String str2 = "";
String str3 = " ";
String str4 = "abc";
System.out.println(StringUtils.isEmpty(str1));
System.out.println(StringUtils.isEmpty(str2));
System.out.println(StringUtils.isEmpty(str3));
System.out.println(StringUtils.isEmpty(str4));
System.out.println("=====");
System.out.println(StringUtils.isNotEmpty(str1));
System.out.println(StringUtils.isNotEmpty(str2));
System.out.println(StringUtils.isNotEmpty(str3));
System.out.println(StringUtils.isNotEmpty(str4));
System.out.println("=====");
System.out.println(StringUtils.isBlank(str1));
System.out.println(StringUtils.isBlank(str2));
System.out.println(StringUtils.isBlank(str3));
System.out.println(StringUtils.isBlank(str4));
System.out.println("=====");
System.out.println(StringUtils.isNotBlank(str1));
System.out.println(StringUtils.isNotBlank(str2));
System.out.println(StringUtils.isNotBlank(str3));
System.out.println(StringUtils.isNotBlank(str4));
```
执行结果：
```java
true
true
false
false
=====
false
false
true
true
=====
true
true
true
false
=====
false
false
false
true
```
示例中的：`isEmpty`、`isNotEmpty`、`isBlank`和`isNotBlank`，这4个判空方法你们可以根据实际情况使用。

> 优先推荐使用`isBlank`和`isNotBlank`方法，因为它会把`" "`也考虑进去。

### 分隔字符串
分隔字符串是常见需求，如果直接使用String类的split方法，就可能会出现空指针异常。
```java
String str1 = null;
System.out.println(StringUtils.split(str1,","));
System.out.println(str1.split(","));
```
执行结果：
```java
null
Exception in thread "main" java.lang.NullPointerException
\tat com.sue.jump.service.test1.UtilTest.main(UtilTest.java:21)
```
使用StringUtils的split方法会返回null，而使用String的split方法会报指针异常。

### 判断是否纯数字
给定一个字符串，判断它是否为纯数字，可以使用`isNumeric`方法。例如：
```java
String str1 = "123";
String str2 = "123q";
String str3 = "0.33";
System.out.println(StringUtils.isNumeric(str1));
System.out.println(StringUtils.isNumeric(str2));
System.out.println(StringUtils.isNumeric(str3));
```
执行结果：
```java
true
false
false
```

### 将集合拼接成字符串
有时候，我们需要将某个集合的内容，拼接成一个字符串，然后输出，这时可以使用`join`方法。例如：
```java
List<String> list = Lists.newArrayList("a", "b", "c");
List<Integer> list2 = Lists.newArrayList(1, 2, 3);
System.out.println(StringUtils.join(list, ","));
System.out.println(StringUtils.join(list2, " "));
```
执行结果：
```java
a,b,c
1 2 3
```
当然还有很多实用的方法，我在这里就不一一介绍了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/common-tool/utils-68f94af9-d2ea-46c2-81b4-7d7e08891550.jpg)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/common-tool/utils-7314260e-4e85-4110-a50d-3bedcbbeb616.jpg)

## MDC：一个线程安全的参数传递工具类

`MDC`是`org.slf4j`包下的一个类，它的全称是Mapped Diagnostic Context，我们可以认为它是一个线程安全的存放诊断日志的容器。

MDC的底层是用了`ThreadLocal`来保存数据的。

我们可以用它传递参数。

例如现在有这样一种场景：我们使用`RestTemplate`调用远程接口时，有时需要在`header`中传递信息，比如：traceId，source等，便于在查询日志时能够串联一次完整的请求链路，快速定位问题。

这种业务场景就能通过`ClientHttpRequestInterceptor`接口实现，具体做法如下：

第一步，定义一个LogFilter拦截所有接口请求，在MDC中设置traceId：
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
第二步，实现`ClientHttpRequestInterceptor`接口，MDC中获取当前请求的traceId，然后设置到header中：
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
其中MdcUtil其实是利用MDC工具在ThreadLocal中存储和获取traceId
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
当然，这个例子中没有演示MdcUtil类的add方法具体调的地方，我们可以在filter中执行接口方法之前，生成traceId，调用MdcUtil类的add方法添加到MDC中，然后在同一个请求的其他地方就能通过MdcUtil类的get方法获取到该traceId。

能使用MDC保存traceId等参数的根本原因是，用户请求到应用服务器，Tomcat会从线程池中分配一个线程去处理该请求。

那么该请求的整个过程中，保存到MDC的ThreadLocal中的参数，也是该线程独享的，所以不会有线程安全问题。

## ClassUtils

spring的`org.springframework.util`包下的`ClassUtils`类，它里面有很多让我们惊喜的功能。

它里面包含了类和对象相关的很多非常实用的方法。

### 获取对象的所有接口
如果你想获取某个对象的所有接口，可以使用ClassUtils的`getAllInterfaces`方法。例如：
```java
Class<?>[] allInterfaces = ClassUtils.getAllInterfaces(new User());
```

### 获取某个类的包名
如果你想获取某个类的包名，可以使用ClassUtils的`getPackageName`方法。例如：
```java
String packageName = ClassUtils.getPackageName(User.class);
System.out.println(packageName);
```
### 判断某个类是否内部类
如果你想判断某个类是否内部类，可以使用ClassUtils的`isInnerClass`方法。例如：
```java
System.out.println(ClassUtils.isInnerClass(User.class));
```

### 判断对象是否代理对象
如果你想判断对象是否代理对象，可以使用ClassUtils的`isCglibProxy`方法。例如：
```java
System.out.println(ClassUtils.isCglibProxy(new User()));
```
ClassUtils还有很多有用的方法，等待着你去发掘。感兴趣的朋友，可以看看下面内容：
![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/common-tool/utils-c58920ac-cf04-4d95-ad29-90339a086569.jpg)

## BeanUtils
spring给我们提供了一个`JavaBean`的工具类，它在`org.springframework.beans`包下面，它的名字叫做：`BeanUtils`。

让我们一起看看这个工具可以带给我们哪些惊喜。

### 拷贝对象的属性
曾几何时，你有没有这样的需求：把某个对象中的所有属性，都拷贝到另外一个对象中。这时就能使用BeanUtils的`copyProperties`方法。例如：
```java
User user1 = new User();
user1.setId(1L);
user1.setName("苏三说技术");
user1.setAddress("成都");

User user2 = new User();
BeanUtils.copyProperties(user1, user2);
System.out.println(user2);
```

### 实例化某个类
如果你想通过反射实例化一个类的对象，可以使用BeanUtils的`instantiateClass`方法。例如：
```java
User user = BeanUtils.instantiateClass(User.class);
System.out.println(user);
```

### 获取指定类的指定方法
如果你想获取某个类的指定方法，可以使用BeanUtils的`findDeclaredMethod`方法。例如：
```java
Method declaredMethod = BeanUtils.findDeclaredMethod(User.class, "getId");
System.out.println(declaredMethod.getName());
```

### 获取指定方法的参数
如果你想获取某个方法的参数，可以使用BeanUtils的`findPropertyForMethod`方法。例如：
```java
Method declaredMethod = BeanUtils.findDeclaredMethod(User.class, "getId");
PropertyDescriptor propertyForMethod = BeanUtils.findPropertyForMethod(declaredMethod);
System.out.println(propertyForMethod.getName());
```

如果你对BeanUtils比较感兴趣，可以看看下面内容：
![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/common-tool/utils-629ecd75-259b-46aa-b1dd-82606cfc92ee.jpg)

## ReflectionUtils
有时候，我们需要在项目中使用`反射`功能，如果使用最原始的方法来开发，代码量会非常多，而且很麻烦，它需要处理一大堆异常以及访问权限等问题。

好消息是spring给我们提供了一个`ReflectionUtils`工具，它在`org.springframework.util`包下面。

### 获取方法
如果你想获取某个类的某个方法，可以使用ReflectionUtils类的`findMethod`方法。例如：
```java
Method method = ReflectionUtils.findMethod(User.class, "getId");
```

### 获取字段
如果你想获取某个类的某个字段，可以使用ReflectionUtils类的`findField`方法。例如：
```java
Field field = ReflectionUtils.findField(User.class, "id");
```

### 执行方法
如果你想通过反射调用某个方法，传递参数，可以使用ReflectionUtils类的`invokeMethod`方法。例如：
```java
 ReflectionUtils.invokeMethod(method, springContextsUtil.getBean(beanName), param);
```

### 判断字段是否常量
如果你想判断某个字段是否常量，可以使用ReflectionUtils类的`isPublicStaticFinal`方法。例如：
```java
Field field = ReflectionUtils.findField(User.class, "id");
System.out.println(ReflectionUtils.isPublicStaticFinal(field));
```

### 判断是否equals方法
如果你想判断某个方法是否equals方法，可以使用ReflectionUtils类的`isEqualsMethod`方法。例如：
```java
Method method = ReflectionUtils.findMethod(User.class, "getId");
System.out.println(ReflectionUtils.isEqualsMethod(method));
```        

当然这个类还有不少有趣的方法，感兴趣的朋友，可以看看下面内容：
![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/common-tool/utils-0a4ecb9c-b9d2-4090-a7b7-c626a0672b94.jpg)

----

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)