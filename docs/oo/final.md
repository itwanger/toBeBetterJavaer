---
title: 一文彻底搞懂 Java final 关键字
shortTitle: Java final关键字
description: 本文详细讲解了Java中的final关键字，包括其作用、用法、使用场景以及注意事项。文章通过实例解析，帮助读者深入理解final关键字在Java编程中的重要性，提高编程水平和技巧。
category:
  - Java 核心
tag:
  - 面向对象编程
head:
  - - meta
    - name: keywords
      content: Java,final,final关键字
---

# 5.16 Java final关键字

“哥，今天学什么呢？”

“今天学一个重要的关键字——final。 ”我面带着朴实无华的微笑回答着她，“对了，三妹，你打算考研吗？”

“还没想过，我今年才大一呢，到时候再说吧，你决定。”

“好吧。”我摊摊手，表示很无辜，真的是所有的决定都交给我这个哥哥了，如果决定错了，锅得背上。

### 01、final 变量

“好了，我们先来看 final 修饰的变量吧！”

“被 final 修饰的变量无法重新赋值。换句话说，final 变量一旦初始化，就无法更改。”

“来看这行代码。”

```java
final int age = 18;
```

“当尝试将 age 的值修改为 30 的时候，编译器就生气了。”

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/keywords/23-01.png)

“再来看这段代码。”

```java
public class Pig {
   private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

“这是一个很普通的 Java 类，它有一个字段 name。”

“然后，我们创建一个测试类，并声明一个 final 修饰的 Pig 对象。”

```java
final Pig pig = new Pig();
```

“如果尝试将 pig 重新赋值的话，编译器同样会生气。”

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/keywords/23-02.png)

“但我们仍然可以去修改 pig 对象的 name。”

```java
final Pig pig = new Pig();
pig.setName("特立独行");
System.out.println(pig.getName()); // 特立独行
```

“另外，final 修饰的成员变量必须有一个默认值，否则编译器将会提醒没有初始化。”

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/keywords/23-03.png)

“final 和 static 一起修饰的成员变量叫做常量，常量名必须全部大写。”

```java
public class Pig {
   private final int age = 1;
   public static final double PRICE = 36.5;
}
```

“有时候，我们还会用 final 关键字来修饰参数，它意味着参数在方法体内不能被再修改。”

“来看下面这段代码。”

```java
public class ArgFinalTest {
    public void arg(final int age) {
    }

    public void arg1(final String name) {
    }
}
```

“如果尝试去修改它的话，编译器会提示以下错误。”

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/keywords/23-04.png)

### 02、final 方法

“被 final 修饰的方法不能被重写。如果我们在设计一个类的时候，认为某些方法不应该被重写，就应该把它设计成 final 的。”

“Thread 类就是一个例子，它本身不是 final 的，这意味着我们可以扩展它，但它的 `isAlive()` 方法是 final 的。”

```java
public class Thread implements Runnable {
    public final native boolean isAlive();
}
```
“需要注意的是，该方法是一个本地（native）方法，用于确认线程是否处于活跃状态。而本地方法是由操作系统决定的，因此重写该方法并不容易实现。”

“来看这段代码。”

```java
public class Actor {
    public final void show() {

    }
}
```

“当我们想要重写该方法的话，就会出现编译错误。”

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/keywords/23-05.png)


“三妹，来问你一个问题吧。”正想趁三妹回答问题的时候喝口水。

“你说吧，哥。”

“一个类是 final 的，和一个类不是 final，但它所有的方法都是 final 的，考虑一下，它们之间有什么区别？”

“我能想到的一点，就是前者不能被[继承](https://javabetter.cn/oo/extends-bigsai.html)，也就是说方法无法被重写；后者呢，可以被继承，然后追加一些非 final 的方法。”还没等我把水咽下去，三妹就回答好了，着实惊呆了我。

“嗯嗯嗯，没毛病没毛病，进步很大啊！”

“那必须啊，谁叫我是你妹呢。”

### 03、final 类

“如果一个类使用了 final 关键字修饰，那么它就无法被继承.....”

“等等，哥，我知道，String 类就是一个 final 类。”还没等我说完，三妹就抢着说到。

“说得没毛病。”

```java
public final class String
    implements java.io.Serializable, Comparable<String>, CharSequence,
               Constable, ConstantDesc {}
```

“那三妹你知道为什么 String 类要设计成 final 吗？”

“这个还真不知道。”三妹的表情透露出这种无奈。

“原因大致有 3 个。”

- 为了实现字符串常量池
- 为了线程安全
- 为了 HashCode 的不可变性

“想了解更详细的原因，可以一会看看我之前写的这篇文章。”

[为什么 Java 字符串是不可变的？](https://javabetter.cn/string/immutable.html)

“任何尝试从 final 类继承的行为将会引发编译错误。来看这段代码。”

```java
public final class Writer {
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

“尝试去继承它，编译器会提示以下错误，Writer 类是 final 的，无法继承。”

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/keywords/23-06.png)

“不过，类是 final 的，并不意味着该类的对象是不可变的。”

“来看这段代码。”

```java
Writer writer = new Writer();
writer.setName("沉默王二");
System.out.println(writer.getName()); // 沉默王二
```

“Writer 的 name 字段的默认值是 null，但可以通过 settter 方法将其更改为沉默王二。也就是说，如果一个类只是 final 的，那么它并不是不可变的全部条件。”

“关于不可变类，我们留到后面来细讲。”

[不可变类](https://javabetter.cn/basic-extra-meal/immutable.html)

“把一个类设计成 final 的，有其安全方面的考虑，但不应该故意为之，因为把一个类定义成 final 的，意味着它没办法继承，假如这个类的一些方法存在一些问题的话，我们就无法通过重写的方式去修复它。”

“三妹，final 关键字我们就学到这里吧，你一会再学习一下 Java 字符串为什么是不可变的和不可变类。”我揉一揉犯困的双眼，疲惫地给三妹说，“学完这两个知识点，你会对 final 的认知更清晰一些。”

“好的，二哥，我这就去学习去。你去休息会。”

我起身站到阳台上，看着窗外的车水马龙，不一会儿，就发起来呆。

“好想去再看一场周杰伦的演唱会，不知道 2021 有没有这个机会。”

我心里这样想着，天渐渐地暗了下来。

----

GitHub 上标星 9300+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 9300+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
