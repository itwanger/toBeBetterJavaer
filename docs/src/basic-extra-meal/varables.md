---
title: Java可变参数详解，5分钟教会我妹
shortTitle: Java可变参数
category:
  - Java核心
tag:
  - Java重要知识点
description: Java中的可变参数允许您在方法中传入不确定数量的参数，使得方法调用更加灵活。本文将详细介绍可变参数的使用方式、原理以及在实际编程中的应用示例。掌握可变参数的使用，将有助于提高您的Java编程技巧。
head:
  - - meta
    - name: keywords
      content: java,可变参数
---


为了让铁粉们能白票到阿里云的服务器，我当了整整两天的客服，真正体验到了什么叫做“为人民群众谋福利”的不易和辛酸。正在我眼睛红肿打算要休息之际，三妹跑过来问：“Java 的可变参数究竟是怎么一回事？”我一下子又清醒了，我爱 Java，我爱传道解惑，也享受三妹的赞许（😂）。

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

说到可变参数，我想起来[阿里巴巴开发手册](https://javabetter.cn/pdf/ali-java-shouce.html)上有这样一条规约。

![](https://cdn.paicoding.com/tobebetterjavaer/images/basic-extra-meal/varables-01.png)

意思就是尽量不要使用可变参数，如果要用的话，可变参数必须要在参数列表的最后一位。既然坑位有限，只能在最后，那么可变参数就只能有一个（悠着点，悠着点）。如果可变参数不在最后一位，IDE 就会提示对应的错误，如下图所示。

![](https://cdn.paicoding.com/tobebetterjavaer/images/basic-extra-meal/varables-02.png)

可变参数看起来就像是个语法糖，它背后究竟隐藏了什么呢？让我们来一探究竟，在追求真理这条路上我们要执着。

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

“三妹，给你留个思考题：一般什么时候使用可变参数呢？”

可变参数，可变参数，顾名思义，当一个方法需要处理任意多个相同类型的对象时，就可以定义可变参数。Java 中有一个很好的例子，就是 String 类的 `format()` 方法，就像下面这样。

```java
System.out.println(String.format("年纪是: %d", 18));
System.out.println(String.format("年纪是: %d 名字是: %s", 18, "沉默王二"));
```

`%d` 表示将整数格式化为 10 进制整数，`%s` 表示输出字符串。

如果不使用可变参数，那需要格式化的参数就必须使用“+”号操作符拼接起来了。麻烦也就惹上身了。

在实际的项目代码中，[slf4j](https://javabetter.cn/gongju/slf4j.html) 的日志输出就经常要用到可变参数（[log4j](https://javabetter.cn/gongju/log4j.html) 就没法使用可变参数，日志中需要记录多个参数时就痛苦不堪了）。就像下面这样。

```java
protected Logger logger = LoggerFactory.getLogger(getClass());
logger.debug("名字是{}", mem.getName());
logger.debug("名字是{}，年纪是{}", mem.getName(), mem.getAge());
```

查看源码就可以发现，`debug()` 方法使用了可变参数。

```java
public void debug(String format, Object... arguments);
```

“那在使用可变参数的时候有什么注意事项吗？”三妹问。

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

![](https://cdn.paicoding.com/tobebetterjavaer/images/basic-extra-meal/varables-03.png)

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

“好了，关于可变参数，我们就先讲到这里吧。三妹，你都理解了吧？”

“嗯嗯，不难，我理解了，哥。”三妹最近的学习状态真不错，能看得出来，她有在认真地做笔记📒。

---


GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.paicoding.com/tobebetterjavaer/images/gongzhonghao.png)