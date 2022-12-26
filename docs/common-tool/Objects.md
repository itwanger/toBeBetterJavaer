---
title: Objects：专为操作 Java 对象而生的工具类
shortTitle: Objects对象工具类
category:
  - Java核心
tag:
  - 常用工具类
description: Java程序员进阶之路，小白的零基础Java教程，从入门到进阶，Objects：专为操作 Java 对象而生的工具类
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,java,Objects
---

在`jdk7`之后，提供了`Objects`工具类，我们可以通过它操作对象。

## 对象判空
在java中万事万物皆对象，对象的判空可以说无处不在。Objects的`isNull`方法判断对象是否为空，而`nonNull`方法判断对象是否不为空。例如：
```java
Integer integer = new Integer(1);

if (Objects.isNull(integer)) {
    System.out.println("对象为空");
}

if (Objects.nonNull(integer)) {
    System.out.println("对象不为空");
}
```

## 对象为空抛异常
如果我们想在对象为空时，抛出空指针异常，可以使用Objects的`requireNonNull`方法。例如：
```java
Integer integer1 = new Integer(128);

Objects.requireNonNull(integer1);
Objects.requireNonNull(integer1, "参数不能为空");
Objects.requireNonNull(integer1, () -> "参数不能为空");
```

## 判断两个对象是否相等
我们经常需要判断两个对象是否相等，Objects给我们提供了`equals`方法，能非常方便的实现：
```java
Integer integer1 = new Integer(1);
Integer integer2 = new Integer(1);

System.out.println(Objects.equals(integer1, integer2));
```
执行结果：
```java
true
```
但使用这个方法有坑，比如例子改成：
```java
Integer integer1 = new Integer(1);
Long integer2 = new Long(1);

System.out.println(Objects.equals(integer1, integer2));
```
执行结果：
```java
false
```
具体原因不细说了，有兴趣的小伙们可以看看我的另一篇文章《[Objects.equals有坑](https://mp.weixin.qq.com/s?__biz=MzkwNjMwMTgzMQ==&mid=2247493176&idx=1&sn=c445625478a7f8122a6715b64fe6770c&chksm=c0e83ed0f79fb7c6cf2992d24e98f60fd78ca89525b5a3cc07f79dc801dd8e381b1fce03bf5c&token=1124974571&lang=zh_CN#rd)》，里面有非常详细的讲解。

## 获取对象的hashCode
如果你想获取某个对象的hashCode，可以使用Objects的`hashCode`方法。例如：
```java
String str = new String("abc");
System.out.println(Objects.hashCode(str));
```
执行结果：
```java
96354
```

Objects的内容先介绍到这里，有兴趣的小伙们，可以看看下面更多的方法：
![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/common-tool/Objects-83489814-9784-4274-841a-27ee75c046ac.jpg)

----

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)