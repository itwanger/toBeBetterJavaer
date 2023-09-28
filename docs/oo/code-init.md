---
title: Java代码初始化块：了解实例初始化和静态初始化的过程
shortTitle: Java代码初始化块
description: 在Java中，代码初始化块是一个特殊的代码片段，用于在对象创建时进行一些初始化操作。主要分为实例初始化块和静态初始化块。本文详细介绍了这两种初始化块的作用、使用场景和注意事项，帮助您编写更加健壮和高效的Java代码。
category:
  - Java 核心
tag:
  - 面向对象编程
head:
  - - meta
    - name: keywords
      content: Java,代码初始化块, 实例初始化, 静态初始化
---

# 5.9 Java代码初始化块

“哥，今天我们要学习的内容是‘代码初始化块’，对吧？”看来三妹已经提前预习了我上次留给她的作业。

“是的，三妹。代码初始化块用于初始化一些[成员变量](https://javabetter.cn/oo/var.html)。 ”我面带着朴实无华的微笑回答着她，“对象在创建的时候会执行代码初始化块，又称实例初始化块，主要和静态初始化块做区分。”

“可以直接通过‘=’操作符对成员变量进行初始化，但通过代码初始化块可以做更多的事情，比如说打印出成员变量初始化后的值。”

“三妹，来看下面的代码，我们可以直接通过 `=` 操作符对成员变量进行初始化。”

```java
class Bike{  
    int speed=100;  
}  
```

“哥，那为什么还需要代码初始化块呢？”三妹眨了眨眼睛，不解地问。

“我们可以通过代码初始化块执行一个更复杂的操作，比如为集合填充值。来看下面这段代码。”

```java
public class Bike {
    List<String> list;

    {
        list = new ArrayList<>();
        list.add("沉默王二");
        list.add("沉默王三");
    }

    public static void main(String[] args) {
        System.out.println(new Bike().list);
    }
}
```

“如果只使用‘=’操作符的话，是没办法完成集合初始化的，对吧？‘=’ 后面只能 new 出集合，却没办法填充值，代码初始化就可以完成这项工作。”

“[构造方法](https://javabetter.cn/oo/construct.html)执行得早还是代码初始化块啊，哥？”三妹这个问题问的还是挺有水平的。

“不要着急，三妹，先来看下面这个例子。”

```java
public class Car {
    Car() {
        System.out.println("构造方法");
    }

    {
        System.out.println("代码初始化块");
    }

    public static void main(String[] args) {
        new Car();
    }
}
```

“我们来看一下程序的输出结果就一下子明白了。”

```
代码初始化块
构造方法
```

“从输出结果看上去，仿佛代码初始化块执行得更早，对吧？事实上是这样子吗？”我露出神秘的微笑，问三妹。

“难道我看到的是假象吗？”三妹睁大了眼睛。

“不是的，对象在初始化的时候会先调用构造方法，这是毫无疑问的，只不过，构造方法在执行的时候会把代码初始化块放在构造方法中其他代码之前，所以，先看到了‘代码初始化块’，后看到了‘’构造方法’。”

说完这句话，我打开 draw.io，使上了吃奶的劲，画出了下面这幅图。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/object-class/22-01.png)

“哦，原来如此啊！”三妹仿佛发现了新大陆，意味深长地说，“编译器把代码初始化块放到了构造方法中，怪不得。”

等三妹明白彻底搞明白后，我对她继续说道：“对于代码初始化来说，它有三个规则。”

- 类实例化的时候执行代码初始化块；
- 实际上，代码初始化块是放在构造方法中执行的，只不过比较靠前；
- 代码初始化块里的执行顺序是从前到后的。

“这些规则不用死记硬背，大致了解一下就行了。我们继续来看下面这段代码。”话音刚落，我就在新版的 IDEA 中噼里啪啦地敲了起来，新版真香。

```java
class A {
    A () {
        System.out.println("父类构造方法");
    }
}
public class B extends A{
    B() {
        System.out.println("子类构造方法");
    }

    {
        System.out.println("代码初始化块");
    }

    public static void main(String[] args) {
        new B();
    }
}
```

“来看一下输出结果。”

```
父类构造方法
代码初始化块
子类构造方法
```

“在默认情况下，子类的构造方法在执行的时候会主动去调用父类的构造方法。也就是说，其实是构造方法先执行的，再执行的代码初始化块。”

“这个例子再次印证了之前的第二条规则：代码初始化块是放在构造方法中执行的，只不过比较靠前。”

除了这种实例化代码初始化块，还有静态初始化，不过我们会放到 [static 关键字](https://javabetter.cn/oo/static.html)中去讲，这里先大致了解一下。

下面是一个 Java 示例代码，演示实例初始化块和静态初始化块的用法：

```java
public class Example {
    // 静态变量
    public static int staticVar = 1;
    // 实例变量
    public int instanceVar = 2;

    // 静态初始化块
    static {
        System.out.println("执行静态初始化块");
        staticVar = 3;
    }

    // 实例初始化块
    {
        System.out.println("执行实例初始化块");
        instanceVar = 4;
    }

    // 构造方法
    public Example() {
        System.out.println("执行构造方法");
    }

    public static void main(String[] args) {
        System.out.println("执行main方法");

        Example e1 = new Example();
        Example e2 = new Example();

        System.out.println("e1的静态变量：" + e1.staticVar);
        System.out.println("e1的实例变量：" + e1.instanceVar);
        System.out.println("e2的静态变量：" + e2.staticVar);
        System.out.println("e2的实例变量：" + e2.instanceVar);
    }
}
```

在这个示例代码中，有一个静态变量 staticVar 和一个实例变量 instanceVar，以及一个静态初始化块和一个实例初始化块。在静态初始化块中，我们打印了一条消息并修改了静态变量的值；在实例初始化块中，我们也打印了一条消息并修改了实例变量的值。

来看一下执行结果：

```
执行静态初始化块
执行main方法
执行实例初始化块
执行构造方法
执行实例初始化块
执行构造方法
e1的静态变量：3
e1的实例变量：4
e2的静态变量：3
e2的实例变量：4
```

从输出结果可以看出，静态初始化块在类加载时执行，只会执行一次，并且优先于实例初始化块和构造方法的执行；实例初始化块在每次创建对象时执行，在构造方法之前执行。

“好了，今天就先讲到这吧，中午休息一下，下午的精神会更足。”刚对三妹说完这句话，我的哈欠就上来了，好困。

----

GitHub 上标星 9300+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 9300+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)