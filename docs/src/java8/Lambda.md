---
title: 深入浅出Java 8 Lambda表达式
shortTitle: 深入浅出Lambda表达式
category:
  - Java核心
tag:
  - Java新特性
description: 本文详细介绍了Java 8引入的Lambda表达式，阐述了Lambda表达式的设计目的和用法。通过实际的代码示例，展示了如何使用Lambda表达式来简化代码，提高编程效率。学习本文，让您快速掌握Java 8 Lambda表达式的使用技巧，享受函数式编程带来的编程乐趣。
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,二哥的Java进阶之路,Java进阶之路,Java入门,教程,java8,lambda,java lambda,Lambda表达式, 函数式编程
---


今天分享的主题是《Lambda 表达式入门》，这也是之前一些读者留言强烈要求我写一写的，不好意思，让你们久等了，现在来满足你们，为时不晚吧？

![](https://cdn.paicoding.com/tobebetterjavaer/images/java8/Lambda-1.jpg)

### 01、初识 Lambda

Lambda 表达式描述了一个代码块（或者叫匿名方法），可以将其作为参数传递给构造方法或者普通方法以便后续执行。考虑下面这段代码：

```java
() -> System.out.println("沉默王二")
```

来从左到右解释一下，`()` 为 Lambda 表达式的参数列表（本例中没有参数），`->` 标识这串代码为 Lambda 表达式（也就是说，看到 `->` 就知道这是 Lambda），`System.out.println("沉默王二")` 为要执行的代码，即将“沉默王二”打印到标准输出流。

有点 Java 基础的同学应该不会对 Runnable 接口感到陌生，这是多线程的一个基础接口，它的定义如下：

```java
@FunctionalInterface
public interface Runnable
{
   public abstract void run();
}
```

Runnable 接口非常简单，仅有一个抽象方法 `run()`；细心的同学会发现一个陌生的注解 `@FunctionalInterface`，这个注解是什么意思呢？

我看了它的源码，里面有这样一段注释：

>Note that instances of functional interfaces can be created with lambda expressions, method references, or constructor references.

大致的意思就是说，通过 `@FunctionalInterface` 标记的接口可以通过 Lambda 表达式创建实例。具体怎么表现呢？

原来我们创建一个线程并启动它是这样的：

```java
public class LamadaTest {
    public static void main(String[] args) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("沉默王二");
            }
        }).start();
    }
}
```

通过 Lambda 表达式呢？只需要下面这样：

```java
public class LamadaTest {
    public static void main(String[] args) {
        new Thread(() -> System.out.println("沉默王二")).start();
    }
}
```

是不是很妙！比起匿名内部类，Lambda 表达式不仅易于理解，更大大简化了必须编写的代码数量。

![](https://cdn.paicoding.com/tobebetterjavaer/images/java8/Lambda-2.jpg)

### 02、Lambda 语法

每个 Lambda 表达式都遵循以下法则：

```
( parameter-list ) -> { expression-or-statements }
```

`()` 中的 `parameter-list` 是以逗号分隔的参数。你可以指定参数的类型，也可以不指定（编译器会根据上下文进行推断）。Java 11 后，还可以使用 `var` 关键字作为参数类型，有点 JavaScript 的味道。

`->` 相当于 Lambda 的标识符，就好像见到圣旨就见到了皇上。

`{}` 中的 `expression-or-statements` 为 Lambda 的主体，可以是一行语句，也可以多行。

可以通过 Lambda 表达式干很多事情，比如说

1）为变量赋值，示例如下：

```java
Runnable r = () -> { System.out.println("沉默王二"); };
r.run();
```

2）作为 return 结果，示例如下：

```java
static FileFilter getFilter(String ext)
{
    return (pathname) -> pathname.toString().endsWith(ext);
}
```

3）作为数组元素，示例如下：

```java
final PathMatcher matchers[] =
{
        (path) -> path.toString().endsWith("txt"),
        (path) -> path.toString().endsWith("java")
};
```

4）作为普通方法或者构造方法的参数，示例如下：

```java
new Thread(() -> System.out.println("沉默王二")).start();
```

需要注意 Lambda 表达式的作用域范围。

```java
public static void main(String[] args) {

    int limit = 10;
    Runnable r = () -> {
        int limit = 5;
        for (int i = 0; i < limit; i++)
            System.out.println(i);
    };
}
```

上面这段代码在编译的时候会提示错误：变量 limit 已经定义过了。

和匿名内部类一样，不要在 Lambda 表达式主体内对方法内的局部变量进行修改，否则编译也不会通过：Lambda 表达式中使用的变量必须是 final 的。

![](https://cdn.paicoding.com/tobebetterjavaer/images/java8/Lambda-3.jpg)

这个问题发生的原因是因为 Java 规范中是这样规定的：

>Any local variable, formal parameter, or exception parameter used but not declared in a lambda expression
must either be declared final or be effectively final [(§4.12.4)](http://docs.oracle.com/javase/specs/jls/se8/html/jls-4.html#jls-4.12.4),
or a compile-time error occurs where the use is attempted.

大致的意思就是说，Lambda 表达式中要用到的，但又未在 Lambda 表达式中声明的变量，必须声明为 final 或者是 effectively final，否则就会出现编译错误。

关于 final 和 effectively final 的区别，可能有些小伙伴不太清楚，这里多说两句。

```java
final int a;
a = 1;
// a = 2;
// 由于 a 是 final 的，所以不能被重新赋值

int b;
b = 1;
// b 此后再未更改
// b 就是 effectively final

int c;
c = 1;
// c 先被赋值为 1，随后又被重新赋值为 2
c = 2;
// c 就不是 effectively final
```

明白了 final 和 effectively final 的区别后，我们了解到，如果把 limit 定义为 final，那就无法在 Lambda 表达式中修改变量的值。那有什么好的解决办法呢？既能让编译器不发出警告，又能修改变量的值。

思前想后，试来试去，我终于找到了 3 个可行的解决方案：

1）把 limit 变量声明为 static。

2）把 limit 变量声明为 AtomicInteger。

3）使用数组。

下面我们来详细地一一介绍下。

#### 01）把 limit 变量声明为 static

要想把 limit 变量声明为 static，就必须将 limit 变量放在 `main()` 方法外部，因为 `main()` 方法本身是 static 的。完整的代码示例如下所示。

```java
public class ModifyVariable2StaticInsideLambda {
    static int limit = 10;
    public static void main(String[] args) {
        Runnable r = () -> {
            limit = 5;
            for (int i = 0; i < limit; i++) {
                System.out.println(i);
            }
        };
        new Thread(r).start();
    }
}
```

来看一下程序输出的结果：

```
0
1
2
3
4
```

OK，该方案是可行的。

#### 02）把 limit 变量声明为 AtomicInteger

AtomicInteger 可以确保 int 值的修改是原子性的，可以使用 `set()` 方法设置一个新的 int 值，`get()` 方法获取当前的 int 值。

```java
public class ModifyVariable2AtomicInsideLambda {
    public static void main(String[] args) {
        final AtomicInteger limit = new AtomicInteger(10);
        Runnable r = () -> {
            limit.set(5);
            for (int i = 0; i < limit.get(); i++) {
                System.out.println(i);
            }
        };
        new Thread(r).start();
    }
}
```

来看一下程序输出的结果：

```
0
1
2
3
4
```

OK，该方案也是可行的。

#### 03）使用数组

使用数组的方式略带一些欺骗的性质，在声明数组的时候设置为 final，但更改 int 的值时却修改的是数组的一个元素。

```java
public class ModifyVariable2ArrayInsideLambda {
    public static void main(String[] args) {
        final int [] limits = {10};
        Runnable r = () -> {
            limits[0] = 5;
            for (int i = 0; i < limits[0]; i++) {
                System.out.println(i);
            }
        };
        new Thread(r).start();
    }
}
```

来看一下程序输出的结果：

```
0
1
2
3
4
```

OK，该方案也是可行的。

### 03、Lambda 和 this 关键字

Lambda 表达式并不会引入新的作用域，这一点和匿名内部类是不同的。也就是说，Lambda 表达式主体内使用的 this 关键字和其所在的类实例相同。

来看下面这个示例。

```java
public class LamadaTest {
    public static void main(String[] args) {
        new LamadaTest().work();
    }

    public void work() {
        System.out.printf("this = %s%n", this);

        Runnable r = new Runnable()
        {
            @Override
            public void run()
            {
                System.out.printf("this = %s%n", this);
            }
        };
        new Thread(r).start();
        new Thread(() -> System.out.printf("this = %s%n", this)).start();
    }
}
```

Tips：`%s` 代表当前位置输出字符串，`%n` 代表换行符，也可以使用 `\n` 代替，但 `%n` 是跨平台的。

`work()` 方法中的代码可以分为 3 个部分：

1）单独的 this 关键字

```java
System.out.printf("this = %s%n", this);
```

其中 this 为 `main()` 方法中通过 new 关键字创建的 LamadaTest 对象——`new LamadaTest()`。

2）匿名内部类中的 this 关键字

```java
Runnable r = new Runnable()
{
    @Override
    public void run()
    {
        System.out.printf("this = %s%n", this);
    }
};
```

其中 this 为 `work()` 方法中通过 new 关键字创建的 Runnable 对象——`new Runnable(){...}`。

3）Lambda 表达式中的 this 关键字

其中 this 关键字和 1）中的相同。

我们来看一下程序的输出结果：

```java
this = com.cmower.java_demo.journal.LamadaTest@3feba861
this = com.cmower.java_demo.journal.LamadaTest$1@64f033cb
this = com.cmower.java_demo.journal.LamadaTest@3feba861
```

符合我们分析的预期。

![](https://cdn.paicoding.com/tobebetterjavaer/images/java8/Lambda-4.jpg)

### 04、最后

尽管 Lambda 表达式在简化 Java 编程方面做了很多令人惊讶的努力，但在某些情况下，不当的使用仍然会导致不必要的混乱，大家伙慎用。

好了，我亲爱的读者朋友们，以上就是本文的全部内容了。能在疫情期间坚持看技术文，二哥必须要伸出大拇指为你点个赞👍。原创不易，如果觉得有点用的话，请不要吝啬你手中**点赞**的权力——因为这将是我写作的最强动力。

----

GitHub 上标星 17000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 17000+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.paicoding.com/tobebetterjavaer/images/gongzhonghao.png)