---
title: 详解Java中可变参数的使用
shortTitle: 详解Java中可变参数的使用
category:
  - Java核心
tag:
  - Java重要知识点
description: Java程序员进阶之路，小白的零基础Java教程，从入门到进阶，详解Java中可变参数的使用
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,java,可变参数
---

# 详解Java中可变参数的使用

为了让铁粉们能白票到阿里云的服务器，老王当了整整两天的客服，真正体验到了什么叫做“为人民群众谋福利”的不易和辛酸。正在他眼睛红肿打算要休息之际，小二跑过来问他：“Java 的可变参数究竟是怎么一回事？”老王一下子又清醒了，他爱 Java，他爱传道解惑，他爱这群尊敬他的读者。

可变参数是 Java 1.5 的时候引入的功能，它允许方法使用任意多个、类型相同（`is-a`）的值作为参数。就像下面这样。

```java
public static void main(String[] args) {
    print("沉");
    print("沉", "默");
    print("沉", "默", "王");
    print("沉", "默", "王", "二");
}

public static void print(String... strs) {
    for (String s : strs)
        System.out.print(s);
    System.out.println();
}
```

静态方法 `print()` 就使用了可变参数，所以 `print("沉")` 可以，`print("沉", "默")` 也可以，甚至 3 个、 4 个或者更多个字符串都可以作为参数传递给 `print()` 方法。

说到可变参数，我想起来阿里巴巴开发手册上有这样一条规约。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/basic-extra-meal/varables-01.png)

意思就是尽量不要使用可变参数，如果要用的话，可变参数必须要在参数列表的最后一位。既然坑位有限，只能在最后，那么可变参数就只能有一个（悠着点，悠着点）。如果可变参数不在最后一位，IDE 就会提示对应的错误，如下图所示。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/basic-extra-meal/varables-02.png)




可变参数看起来就像是个语法糖，它背后究竟隐藏了什么呢？老王想要一探究竟，它在追求真理这条路上一直很执着。

其实也很简单。**当使用可变参数的时候，实际上是先创建了一个数组，该数组的大小就是可变参数的个数，然后将参数放入数组当中，再将数组传递给被调用的方法**。

这就是为什么可以使用数组作为参数来调用带有可变参数的方法的根本原因。代码如下所示。

```java
public static void main(String[] args) {
    print(new String[]{"沉"});
    print(new String[]{"沉", "默"});
    print(new String[]{"沉", "默", "王"});
    print(new String[]{"沉", "默", "王", "二"});
}

public static void print(String... strs) {
    for (String s : strs)
        System.out.print(s);
    System.out.println();
}
```

那如果方法的参数是一个数组，然后像使用可变参数那样去调用方法的时候，能行得通吗？

*留个思考题，大家也可以去试一试*



那一般什么时候使用可变参数呢？

可变参数，可变参数，顾名思义，当一个方法需要处理任意多个相同类型的对象时，就可以定义可变参数。Java 中有一个很好的例子，就是 String 类的 `format()` 方法，就像下面这样。

```java
System.out.println(String.format("年纪是: %d", 18));
System.out.println(String.format("年纪是: %d 名字是: %s", 18, "沉默王二"));
```

`%d` 表示将整数格式化为 10 进制整数，`%s` 表示输出字符串。

如果不使用可变参数，那需要格式化的参数就必须使用“+”号操作符拼接起来了。麻烦也就惹上身了。

在实际的项目代码中，开源包 slf4j.jar 的日志输出就经常要用到可变参数（log4j 就没法使用可变参数，日志中需要记录多个参数时就痛苦不堪了）。就像下面这样。

```java
protected Logger logger = LoggerFactory.getLogger(getClass());
logger.debug("名字是{}", mem.getName());
logger.debug("名字是{}，年纪是{}", mem.getName(), mem.getAge());
```

查看源码就可以发现，`debug()` 方法使用了可变参数。

```java
public void debug(String format, Object... arguments);
```

那在使用可变参数的时候有什么注意事项吗？

有的。我们要避免重载带有可变参数的方法——这样很容易让编译器陷入自我怀疑中。

```java
public static void main(String[] args) {
    print(null);
}

public static void print(String... strs) {
    for (String a : strs)
        System.out.print(a);
    System.out.println();
}

public static void print(Integer... ints) {
    for (Integer i : ints)
        System.out.print(i);
    System.out.println();
}
```

这时候，编译器完全不知道该调用哪个 `print()` 方法，`print(String... strs)` 还是 `print(Integer... ints)`，傻傻分不清。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/basic-extra-meal/varables-03.png)


假如真的需要重载带有可变参数的方法，就必须在调用方法的时候给出明确的指示，不要让编译器去猜。

```java
public static void main(String[] args) {
    String [] strs = null;
    print(strs);

    Integer [] ints = null;
    print(ints);
}

public static void print(String... strs) {
}

public static void print(Integer... ints) {
}
```

上面这段代码是可以编译通过的。因为编译器知道参数是 String 类型还是 Integer 类型，只不过为了运行时不抛出 `NullPointerException`，两个 `print()` 方法的内部要做好判空操作。

---


最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)