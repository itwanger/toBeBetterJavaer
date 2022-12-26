---
title: Java不能实现真正泛型的原因是什么？
shortTitle: Java不能实现真正泛型的原因是什么？
category:
  - Java核心
tag:
  - Java重要知识点
description: Java程序员进阶之路，小白的零基础Java教程，从入门到进阶，Java不能实现真正泛型的原因是什么？
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,java,泛型
---


“二哥，为啥 Java 不能实现真正泛型啊？”三妹开门见山地问。

简单来回顾一下类型擦除，看下面这段代码。

```java
public class Cmower {
    public static void method(ArrayList<String> list) {
        System.out.println("Arraylist<String> list");
    }

    public static void method(ArrayList<Date> list) {
        System.out.println("Arraylist<Date> list");
    }
}
```

“三妹，你是不是认为 `ArrayList<String> list` 和 `ArrayList<Date> list` 是两种不同的类型，因为 String 和 Date 是不同的类。”我问。

“嗯。”三妹点点头。

但由于类型擦除的原因，以上代码是不会编译通过的——编译器会提示一个错误：

```
>'method(ArrayList<String>)' clashes with 'method(ArrayList<Date>)'; both methods have same erasure
```

也就是说，两个 `method()` 方法经过类型擦除后的方法签名是完全相同的，Java 是不允许这样做的。

也就是说，按照我们的假设：如果 Java 能够实现真正意义上的泛型，两个 `method()` 方法是可以同时存在的，就好像方法重载一样。

```java
public class Cmower {
    public static void method(String list) {
    }

    public static void method(Date list) {
    }
}
```

“为什么 Java 不能实现真正意义上的泛型呢？背后的原因是什么？快告诉我呀！”三妹着急了。

“保持耐心，好不好？”我安慰道。


第一，兼容性

Java 在 2004 年已经积累了较为丰富的生态，如果把现有的类修改为泛型类，需要让所有的用户重新修改源代码并且编译，这就会导致 Java 1.4 之前打下的江山可能会完全覆灭。

想象一下，你的代码原来运行的好好的，就因为 JDK 的升级，导致所有的源代码都无法编译通过并且无法运行，是不是会非常痛苦？

类型擦除就完美实现了兼容性，Java 1.5 之后的类可以使用泛型，而 Java 1.4 之前没有使用泛型的类也可以保留，并且不用做任何修改就能在新版本的 Java 虚拟机上运行。

老用户不受影响，新用户可以自由地选择使用泛型，可谓一举两得。

第二，不是“实现不了”。Pizza，1996 年的实验语言，在 Java 的基础上扩展了泛型。

>Pizza 教程地址：[http://pizzacompiler.sourceforge.net/doc/tutorial.html](http://pizzacompiler.sourceforge.net/doc/tutorial.html)

“1996 年？”三妹表示很吃惊。

“嗯，你那会还没出生。”我说，“插一下 Java 的版本历史吧，你好有一个时间线上的观念。”

- 1995年5月23日，Java语言诞生
- 1996年1月，JDK1.0 诞生
- 1997年2月18日，JDK1.1发布
- 1998年2月，JDK1.1被下载超过2,000,000次
- 2000年5月8日，JDK1.3发布
- 2000年5月29日，JDK1.4发布
- 2004年9月30日18:00 PM，J2SE1.5 发布

也就是说，Pizza 在 JDK 1.0 的版本上就实现了“真正意义上的”泛型，我引过来两段例子，你一看就明白了。

首先是 StoreSomething，一个泛型类，标识符是大写字母 A 而不是我们熟悉的大写字母 T。

```java
class StoreSomething<A> {
     A something;

     StoreSomething(A something) {
         this.something = something;
     }

     void set(A something) {
         this.something = something;
     }

     A get() {
         return something;
     }
}
```

这个 A 呢，可以是任何合法的 Java 类型：

```java
StoreSomething<String> a = new StoreSomething("I'm a string!");
StoreSomething<int> b = new StoreSomething(17+4);

b.set(9);

int i = b.get();
String s = a.get();
```

对吧？这就是我们想要的“真正意义上的泛型”，A 不仅仅可以是引用类型 String，还可以是基本数据类型。要知道，Java 的泛型不允许是基本数据类型，只能是包装器类型。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/generic/true-generic-01.png)

除此之外，Pizza 的泛型还可以直接使用 `new` 关键字进行声明，并且 Pizza 编译器会从构造方法的参数上推断出具体的对象类型，究竟是 String 还是 int。要知道，Java 的泛型因为类型擦除的原因，程序员是无法知道一个 ArrayList 究竟是 `ArrayList<String>` 还是 `ArrayList<Integer>` 的。

```java
ArrayList<Integer> ints = new ArrayList<Integer>();
ArrayList<String> strs = new ArrayList<String>();

System.out.println(ints.getClass());
System.out.println(strs.getClass());
```

输出结果：

```
class java.util.ArrayList
class java.util.ArrayList
```

都是 ArrayList 而已。

“那 Pizza 这种“真正意义上的泛型”为什么没有被 Java 采纳呢？”三妹很关心这个问题。

事实上，Java 的核心开发组对 Pizza 的泛型设计非常感兴趣，并且与 Pizza 的设计者 Martin 和 Phil 取得了联系，新合作了一个项目 Generic Java，争取在 Java 中添加泛型支持，但不引入 Pizza 的其他功能，比如说函数式编程。

*这里再补充一点维基百科上的资料，Martin Odersky 是一名德国计算机科学家，他和其他人一起设计了 Scala 编程语言，以及 Generic Java（还有之前的 Pizza），他实现的 Generic Java 编译器成为了 Java 编译器 javac 的基础。*

站在马后炮的思维来看，Pizza 的泛型设计和函数式编程非常具有历史前瞻性。然而 Java 的核心开发组在当时似乎并不想把函数式编程引入到 Java 中。

以至于 Java 在 1.4 之前仍然是不支持泛型的。

“为什么 Java 1.5 的时候又突然支持泛型了呢？”三妹问。

“当然是到了不支持不行的时候了。”我说。

没有泛型之前，我们可以这样写代码：

```java
ArrayList list = new ArrayList();
list.add("沉默王二");
list.add(new Date());
```

不管是 String 类型，还是 Date 类型，都可以一股脑塞进 ArrayList 当中，这看起来似乎很方便，但取的时候就悲剧了。

```java
String s = list.get(1);
```

这样取行吗？不行。还得加上强制转换。

```java
String s = (String) list.get(1);
```

但我们知道，这行代码在运行的时候必然会出错：

```
Exception in thread "main" java.lang.ClassCastException: java.util.Date cannot be cast to java.lang.String
```

这就又回到“兼容性”的问题了。

Java 语言和其他编程语言不一样，有着沉重的历史包袱，1.5 之前已经有大量的程序部署在生产环境下了，这时候如果一刀切，原来没有使用泛型的代码直接扼杀了，后果不堪想象。

Java 一直以来都强调兼容性，我认为这也是 Java 之所以能被广泛使用的主要原因之一，开发者不必担心 Java 版本升级的问题，一个在 JDK 1.4 上可以跑的代码，放在 JDK 1.5 上仍然可以跑。

*这里必须得说明一点，J2SE1.5 的发布，是 Java 语言发展史上的重要里程碑，为了表示该版本的重要性，J2SE1.5 也正式更名为 Java SE 5.0，往后去就是 Java SE 6.0，Java SE 7.0。。。。*

但 Java 并不支持高版本 JDK 编译生成的字节码文件在低版本的 JRE（Java 运行时环境）上跑。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/generic/true-generic-02.png)


针对泛型，兼容性具体表现在什么地方呢？来看下面这段代码。

```java
ArrayList<Integer> ints = new ArrayList<Integer>();
ArrayList<String> strs = new ArrayList<String>();
ArrayList list;
list = ints;
list = strs;
```

“兼容性表现在上面这段代码必须得能够编译运行。怎么办呢？”我扭头看了一下旁边的三妹，继续说。

“只能搞类型擦除了！”我妹肯定地回答。

“是滴。”

编译前进行泛型检测，`ArrayList<Integer>` 只能放 Integer，`ArrayList<String>` 只能放 String，取的时候就不用担心类型强转出错了。

但编译后的字节码文件里，是没有泛型的，放的都是 Object。

Java 神奇就神奇在这，表面上万物皆对象，但为了性能上的考量，又存在 int、double 这种原始类型，但原始类型又没办法和 Object 兼容，于是我们就只能写 `ArrayList<Integer>` 这样很占用内存空间的代码。

这恐怕也是 Java 泛型被吐槽的原因之一了。

一个好消息是 Valhalla 项目正在努力解决这些因为泛型擦除带来的历史遗留问题。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/generic/true-generic-03.png)


Project Valhalla：正在进行当中的 OpenJDK 项目，计划给未来的 Java 添加改进的泛型支持。

>源码地址：[http://openjdk.java.net/projects/valhalla/](http://openjdk.java.net/projects/valhalla/)

让我们拭目以待吧！

“怎么样？三妹，这下全部都明白了吧！”我问。

“嗯嗯。二哥，你讲得可真棒👍”三妹夸奖得我有点小开心，嘿嘿。

---

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)