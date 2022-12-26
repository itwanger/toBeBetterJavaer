---
title: 深入理解Java中的不可变对象
shortTitle: 深入理解Java中的不可变对象
category:
  - Java核心
tag:
  - Java重要知识点
description: Java程序员进阶之路，小白的零基础Java教程，从入门到进阶，深入理解Java中的不可变对象
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,java,不可变对象,immutable
---

# 深入理解Java中的不可变对象

>二哥，你能给我说说为什么 String 是 immutable 类（不可变对象）吗？我想研究它，想知道为什么它就不可变了，这种强烈的愿望就像想研究浩瀚的星空一样。但无奈自身功力有限，始终觉得雾里看花终隔一层。二哥你的文章总是充满趣味性，我想一定能够说明白，我也一定能够看明白，能在接下来写一写吗？

收到读者小 R 的私信后，我就总感觉自己有一种义不容辞的责任，非要把 immutable 类说明白不可！


## 01、什么是不可变类

一个类的对象在通过构造方法创建后如果状态不会再被改变，那么它就是一个不可变（immutable）类。它的所有成员变量的赋值仅在构造方法中完成，不会提供任何 setter 方法供外部类去修改。

还记得《神雕侠侣》中小龙女的古墓吗？随着那一声巨响，仅有的通道就被无情地关闭了。别较真那个密道，我这么说只是为了打开你的想象力，让你对不可变类有一个更直观的印象。

自从有了多线程，生产力就被无限地放大了，所有的程序员都爱它，因为强大的硬件能力被充分地利用了。但与此同时，所有的程序员都对它心生忌惮，因为一不小心，多线程就会把对象的状态变得混乱不堪。

为了保护状态的原子性、可见性、有序性，我们程序员可以说是竭尽所能。其中，synchronized（同步）关键字是最简单最入门的一种解决方案。

假如说类是不可变的，那么对象的状态就也是不可变的。这样的话，每次修改对象的状态，就会产生一个新的对象供不同的线程使用，我们程序员就不必再担心并发问题了。

## 02、常见的不可变类

提到不可变类，几乎所有的程序员第一个想到的，就是 String 类。那为什么 String 类要被设计成不可变的呢？

1）常量池的需要

字符串常量池是 Java 堆内存中一个特殊的存储区域，当创建一个 String 对象时，假如此字符串在常量池中不存在，那么就创建一个；假如已经存，就不会再创建了，而是直接引用已经存在的对象。这样做能够减少 JVM 的内存开销，提高效率。

2）hashCode 的需要

因为字符串是不可变的，所以在它创建的时候，其 hashCode 就被缓存了，因此非常适合作为哈希值（比如说作为 HashMap 的键），多次调用只返回同一个值，来提高效率。

3）线程安全

就像之前说的那样，如果对象的状态是可变的，那么在多线程环境下，就很容易造成不可预期的结果。而 String 是不可变的，就可以在多个线程之间共享，不需要同步处理。

因此，当我们调用 String 类的任何方法（比如说 `trim()`、`substring()`、`toLowerCase()`）时，总会返回一个新的对象，而不影响之前的值。

```java
String cmower = "沉默王二，一枚有趣的程序员";
cmower.substring(0,4);
System.out.println(cmower);// 沉默王二，一枚有趣的程序员
```

虽然调用 `substring()` 方法对 cmower 进行了截取，但 cmower 的值没有改变。

除了 String 类，包装器类 Integer、Long 等也是不可变类。

## 03、手撸不可变类

看懂一个不可变类也许容易，但要创建一个自定义的不可变类恐怕就有点难了。但知难而进是我们作为一名优秀的程序员不可或缺的品质，正因为不容易，我们才能真正地掌握它。

接下来，就请和我一起，来自定义一个不可变类吧。一个不可变类，必须要满足以下 4 个条件：

1）确保类是 final 的，不允许被其他类继承。

2）确保所有的成员变量（字段）是 final 的，这样的话，它们就只能在构造方法中初始化值，并且不会在随后被修改。

3）不要提供任何 setter 方法。

4）如果要修改类的状态，必须返回一个新的对象。

按照以上条件，我们来自定义一个简单的不可变类 Writer。

```java
public final class Writer {
    private final String name;
    private final int age;

    public Writer(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public int getAge() {
        return age;
    }

    public String getName() {
        return name;
    }
}
```

Writer 类是 final 的，name 和 age 也是 final 的，没有 setter 方法。

OK，据说这个作者分享了很多博客，广受读者的喜爱，因此某某出版社找他写了一本书（Book）。Book 类是这样定义的：

```java
public class Book {
    private String name;
    private int price;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Book{" +
                "name='" + name + '\'' +
                ", price=" + price +
                '}';
    }
}
```

2 个字段，分别是 name 和 price，以及 getter 和 setter，重写后的 `toString()` 方法。然后，在 Writer 类中追加一个可变对象字段 book。

```java
public final class Writer {
    private final String name;
    private final int age;
    private final Book book;

    public Writer(String name, int age, Book book) {
        this.name = name;
        this.age = age;
        this.book = book;
    }

    public int getAge() {
        return age;
    }

    public String getName() {
        return name;
    }

    public Book getBook() {
        return book;
    }
}
```

并在构造方法中追加了 Book 参数，以及 Book 的 getter 方法。

完成以上工作后，我们来新建一个测试类，看看 Writer 类的状态是否真的不可变。

```java
public class WriterDemo {
    public static void main(String[] args) {
        Book book = new Book();
        book.setName("Web全栈开发进阶之路");
        book.setPrice(79);

        Writer writer = new Writer("沉默王二",18, book);
        System.out.println("定价：" + writer.getBook());
        writer.getBook().setPrice(59);
        System.out.println("促销价：" + writer.getBook());
    }
}
```

程序输出的结果如下所示：

```java
定价：Book{name='Web全栈开发进阶之路', price=79}
促销价：Book{name='Web全栈开发进阶之路', price=59}
```

糟糕，Writer 类的不可变性被破坏了，价格发生了变化。为了解决这个问题，我们需要为不可变类的定义规则追加一条内容：

如果一个不可变类中包含了可变类的对象，那么就需要确保返回的是可变对象的副本。也就是说，Writer 类中的 `getBook()` 方法应该修改为：

```java
public Book getBook() {
    Book clone = new Book();
    clone.setPrice(this.book.getPrice());
    clone.setName(this.book.getName());
    return clone;
}
```

这样的话，构造方法初始化后的 Book 对象就不会再被修改了。此时，运行 WriterDemo，就会发现价格不再发生变化了。

```
定价：Book{name='Web全栈开发进阶之路', price=79}
促销价：Book{name='Web全栈开发进阶之路', price=79}
```

## 04、总结

不可变类有很多优点，就像之前提到的 String 类那样，尤其是在多线程环境下，它非常的安全。尽管每次修改都会创建一个新的对象，增加了内存的消耗，但这个缺点相比它带来的优点，显然是微不足道的——无非就是捡了西瓜，丢了芝麻。

----

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)