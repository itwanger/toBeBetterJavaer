---
title: 深入理解Java浅拷贝与深拷贝：实战案例与技巧
shortTitle: 深入理解Java浅拷贝与深拷贝
category:
  - Java核心
tag:
  - Java重要知识点
description: 本文详细讨论了Java中的浅拷贝和深拷贝概念，解析了它们如何在实际编程中应用。文章通过实例演示了如何实现浅拷贝与深拷贝，以帮助读者更好地理解这两种拷贝方式在Java编程中的作用与应用场景。
author: 沉默王二
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,二哥的Java进阶之路,Java进阶之路,Java入门,教程,java,深拷贝,浅拷贝
---

# 13.4 深入理解Java浅拷贝与深拷贝

“哥，听说浅拷贝和深拷贝是 Java 面试中经常会被问到的一个问题，是这样吗？”

“还真的是，而且了解浅拷贝和深拷贝的原理，对 [Java 是值传递还是引用传递](https://javabetter.cn/basic-extra-meal/pass-by-value.html)也会有更深的理解。”我肯定地回答。

“不管是浅拷贝还是深拷贝，都可以通过调用 Object 类的 `clone()` 方法来完成。”我一边说，一边打开 Intellij IDEA，并找到了 `clone()` 方法的源码。

```java
protected native Object clone() throws CloneNotSupportedException;
```

需要注意的是，`clone()` 方法同时是一个本地（`native`）方法，它的具体实现会交给 HotSpot 虚拟机，那就意味着虚拟机在运行该方法的时候，会将其替换为更高效的 C/C++ 代码，进而调用操作系统去完成对象的克隆工作。

>Java 9 后，该方法会被标注 `@HotSpotIntrinsicCandidate` 注解，被该注解标注的方法，在 HotSpot 虚拟机中会有一套高效的实现。

“哥，那你就先说浅拷贝吧！”

“好的呀。直接上实战代码。”

```java
class Writer implements Cloneable{
    private int age;
    private String name;

    // getter/setter 和构造方法都已省略

    @Override
    public String toString() {
        return super.toString().substring(26) + "{" +
                "age=" + age +
                ", name='" + name + '\'' +
                '}';
    }
}
```

Writer 类有两个字段，分别是 int 类型的 age，和 String 类型的 name。然后重写了 `toString()` 方法，方便打印对象的具体信息。

“为什么要实现 Cloneable 接口呢？”三妹开启了十万个为什么的模式。

Cloneable 接口是一个标记接口，它肚子里面是空的：

```java
public interface Cloneable {
}
```

只是，如果一个类没有实现 Cloneable 接口，即便它重写了 `clone()` 方法，依然是无法调用该方法进行对象克隆的，程序在执行 `clone()` 方法的时候会抛出 CloneNotSupportedException 异常。

```java
Exception in thread "main" java.lang.CloneNotSupportedException
```

标记接口的作用其实很简单，用来表示某个功能在执行的时候是合法的。

“哦，我悟了！”三妹看来是彻底明白了我说的内容。

“接着，来测试类。”

```java
class TestClone {
    public static void main(String[] args) throws CloneNotSupportedException {
        Writer writer1 = new Writer(18,"二哥");
        Writer writer2 = (Writer) writer1.clone();

        System.out.println("浅拷贝后：");
        System.out.println("writer1：" + writer1);
        System.out.println("writer2：" + writer2);

        writer2.setName("三妹");

        System.out.println("调整了 writer2 的 name 后：");
        System.out.println("writer1：" + writer1);
        System.out.println("writer2：" + writer2);
    }
}
```

- 通过 new 关键字声明了一个 Writer 对象（18 岁的二哥），将其赋值给 writer1。
- 通过调用 `clone()` 方法进行对象拷贝，并将其赋值给 writer2。
- 之后打印 writer1 和 writer2。
- 将 writer2 的 name 字段调整为“三妹”。
- 再次打印。

来看一下输出结果。

```
浅拷贝后：
writer1：Writer@68837a77{age=18, name='二哥'}
writer2：Writer@b97c004{age=18, name='二哥'}
调整了 writer2 的 name 后：
writer1：Writer@68837a77{age=18, name='二哥'}
writer2：Writer@b97c004{age=18, name='三妹'}
```

可以看得出，浅拷贝后，writer1 和 writer2 引用了不同的对象，但值是相同的，说明拷贝成功。之后，修改了 writer2 的 name 字段，直接上图就明白了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/core-points/deep-copy-01.png)

 之前的例子中，Writer 类只有两个字段，没有引用类型字段。那么，我们再来看另外一个例子，为 Writer 类增加一个自定义的引用类型字段 Book，先来看 Book 的定义。

```java
class Book {
    private String bookName;
    private int price;

    // getter/setter 和构造方法都已省略

    @Override
    public String toString() {
        return super.toString().substring(26) +
                " bookName='" + bookName + '\'' +
                ", price=" + price +
                '}';
    }
}
```

有两个字段，分别是 String 类型的 bookName 和 int 类型的 price。

然后来看 Writer 类的定义。

```java
class Writer implements Cloneable{
    private int age;
    private String name;
    private Book book;

    // getter/setter 和构造方法都已省略

    @Override
    public String toString() {
        return super.toString().substring(26) +
                " age=" + age +
                ", name='" + name + '\'' +
                ", book=" + book +
                '}';
    }

    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}
```

比之前的例子多了一个自定义类型的字段 book，`clone()` 方法并没有任何改变。

再来看测试类。

```java
class TestClone {
    public static void main(String[] args) throws CloneNotSupportedException {
        Writer writer1 = new Writer(18,"二哥");
        Book book1 = new Book("编译原理",100);
        writer1.setBook(book1);

        Writer writer2 = (Writer) writer1.clone();
        System.out.println("浅拷贝后：");

        System.out.println("writer1：" + writer1);
        System.out.println("writer2：" + writer2);

        Book book2 = writer2.getBook();
        book2.setBookName("永恒的图灵");
        book2.setPrice(70);
        System.out.println("writer2.book 变更后：");

        System.out.println("writer1：" + writer1);
        System.out.println("writer2：" + writer2);
    }
}
```

- 通过 new 关键字声明了一个 Writer 对象（18 岁的二哥），将其赋值给 writer1。
- 通过 new 关键字声明了一个 Book 对象（100 块的编译原理），将其赋值给 book1。
- 将 writer1 的 book 字段设置为 book1。
- 通过调用 `clone()` 方法进行对象拷贝，并将其赋值给 writer2。
- 之后打印 writer1 和 writer2。
- 获取 writer2 的 book 字段，并将其赋值给 book2。
- 将 book2 的 bookName 字段调整为“永恒的图灵”，price 字段调整为 70。
- 再次打印。

来看一下输出结果。

```
浅拷贝后：
writer1：Writer@68837a77 age=18, name='二哥', book=Book@32e6e9c3 bookName='编译原理', price=100}}
writer2：Writer@6d00a15d age=18, name='二哥', book=Book@32e6e9c3 bookName='编译原理', price=100}}
writer2.book 变更后：
writer1：Writer@68837a77 age=18, name='二哥', book=Book@32e6e9c3 bookName='永恒的图灵', price=70}}
writer2：Writer@36d4b5c age=18, name='二哥', book=Book@32e6e9c3 bookName='永恒的图灵', price=70}}
```

与之前例子不同的是，writer2.book 变更后，writer1.book 也发生了改变。这是因为字符串 String 是不可变对象，一个新的值必须在字符串常量池中开辟一段新的内存空间，而自定义对象的内存地址并没有发生改变，只是对应的字段值发生了改变，见下图。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/core-points/deep-copy-02.png)

“哇，哥，果真一图胜千言，我明白了。”三妹似乎对我画的图很感兴趣呢，“那你继续说深拷贝吧！”

“嗯，三妹，你有没有注意到，浅拷贝克隆的对象中，引用类型的字段指向的是同一个，当改变任何一个对象，另外一个对象也会随之改变，除去字符串的特殊性外。”

“深拷贝和浅拷贝不同的，深拷贝中的引用类型字段也会克隆一份，当改变任何一个对象，另外一个对象不会随之改变。”

“明白了这一点后，我们再来看例子。”

```java
class Book implements Cloneable{
    private String bookName;
    private int price;

    // getter/setter 和构造方法都已省略

    @Override
    public String toString() {
        return super.toString().substring(26) +
                " bookName='" + bookName + '\'' +
                ", price=" + price +
                '}';
    }

    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}
```

注意，此时的 Book 类和浅拷贝时不同，重写了 `clone()` 方法，并实现了 Cloneable 接口。为的就是深拷贝的时候也能够克隆该字段。

```java
class Writer implements Cloneable{
    private int age;
    private String name;
    private Book book;

    // getter/setter 和构造方法都已省略

    @Override
    public String toString() {
        return super.toString().substring(26) +
                " age=" + age +
                ", name='" + name + '\'' +
                ", book=" + book +
                '}';
    }

    @Override
    protected Object clone() throws CloneNotSupportedException {
        Writer writer = (Writer) super.clone();
        writer.setBook((Book) writer.getBook().clone());
        return writer;
    }
}
```

注意，此时 Writer 类也与之前的不同，`clone()` 方法当中，不再只调用 Object 的 `clone()` 方法对 Writer 进行克隆了，还对 Book 也进行了克隆。

来看测试类。

```java
class TestClone {
    public static void main(String[] args) throws CloneNotSupportedException {
        Writer writer1 = new Writer(18,"二哥");
        Book book1 = new Book("编译原理",100);
        writer1.setBook(book1);

        Writer writer2 = (Writer) writer1.clone();
        System.out.println("深拷贝后：");

        System.out.println("writer1：" + writer1);
        System.out.println("writer2：" + writer2);

        Book book2 = writer2.getBook();
        book2.setBookName("永恒的图灵");
        book2.setPrice(70);
        System.out.println("writer2.book 变更后：");

        System.out.println("writer1：" + writer1);
        System.out.println("writer2：" + writer2);
    }
}
```

这个测试类和之前的浅拷贝的测试类就完全一样了，但运行结果是不同的。

```
深拷贝后：
writer1：Writer@6be46e8f age=18, name='二哥', book=Book@5056dfcb bookName='编译原理', price=100}}
writer2：Writer@6d00a15d age=18, name='二哥', book=Book@51efea79 bookName='编译原理', price=100}}
writer2.book 变更后：
writer1：Writer@6be46e8f age=18, name='二哥', book=Book@5056dfcb bookName='编译原理', price=100}}
writer2：Writer@6d00a15d age=18, name='二哥', book=Book@51efea79 bookName='永恒的图灵', price=70}}
```

不只是 writer1 和 writer2 是不同的对象，它们中的 book 也是不同的对象。所以，改变了 writer2 中的 book 并不会影响到 writer1。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/core-points/deep-copy-03.png)

不过，通过 `clone()` 方法实现的深拷贝比较笨重，因为要将所有的引用类型都重写 `clone()` 方法，当嵌套的对象比较多的时候，就废了！

“那有没有好的办法呢？”三妹急切的问。

“当然有了，利用[序列化](https://javabetter.cn/io/serialize.html)。”我胸有成竹的回答，“序列化是将对象写到流中便于传输，而反序列化则是将对象从流中读取出来。”

“写入流中的对象就是对原始对象的拷贝。需要注意的是，每个要序列化的类都要实现 [Serializable 接口](https://javabetter.cn/io/Serializbale.html)，该接口和 Cloneable 接口类似，都是标记型接口。”

来看例子。

```java
class Book implements Serializable {
    private String bookName;
    private int price;

    // getter/setter 和构造方法都已省略

    @Override
    public String toString() {
        return super.toString().substring(26) +
                " bookName='" + bookName + '\'' +
                ", price=" + price +
                '}';
    }
}
```

Book 需要实现 Serializable 接口。

```java
class Writer implements Serializable {
    private int age;
    private String name;
    private Book book;

    // getter/setter 和构造方法都已省略

    @Override
    public String toString() {
        return super.toString().substring(26) +
                " age=" + age +
                ", name='" + name + '\'' +
                ", book=" + book +
                '}';
    }

    //深度拷贝
    public Object deepClone() throws IOException, ClassNotFoundException {
        // 序列化
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        ObjectOutputStream oos = new ObjectOutputStream(bos);

        oos.writeObject(this);

        // 反序列化
        ByteArrayInputStream bis = new ByteArrayInputStream(bos.toByteArray());
        ObjectInputStream ois = new ObjectInputStream(bis);

        return ois.readObject();
    }
}
```

Writer 类也需要实现 Serializable 接口，并且在该类中，增加了一个 `deepClone()` 的方法，利用 OutputStream 进行序列化，InputStream 进行反序列化，这样就实现了深拷贝。

来看示例。

```java
class TestClone {
    public static void main(String[] args) throws IOException, ClassNotFoundException {
        Writer writer1 = new Writer(18,"二哥");
        Book book1 = new Book("编译原理",100);
        writer1.setBook(book1);

        Writer writer2 = (Writer) writer1.deepClone();
        System.out.println("深拷贝后：");

        System.out.println("writer1：" + writer1);
        System.out.println("writer2：" + writer2);

        Book book2 = writer2.getBook();
        book2.setBookName("永恒的图灵");
        book2.setPrice(70);
        System.out.println("writer2.book 变更后：");

        System.out.println("writer1：" + writer1);
        System.out.println("writer2：" + writer2);
    }
}
```

与之前测试类不同的是，调用了 `deepClone()` 方法。

```
深拷贝后：
writer1：Writer@9629756 age=18, name='二哥', book=Book@735b5592 bookName='编译原理', price=100}}
writer2：Writer@544fe44c age=18, name='二哥', book=Book@31610302 bookName='编译原理', price=100}}
writer2.book 变更后：
writer1：Writer@9629756 age=18, name='二哥', book=Book@735b5592 bookName='编译原理', price=100}}
writer2：Writer@544fe44c age=18, name='二哥', book=Book@31610302 bookName='永恒的图灵', price=70}}
```

测试结果和之前用 `clone()` 方法实现的深拷贝类似。

“不过，三妹，需要注意，由于是序列化涉及到输入流和输出流的读写，在性能上要比 HotSpot 虚拟机实现的 `clone()` 方法差很多。”我语重心长地说。

“好的，二哥，你先去休息吧，让我来琢磨一会，总结一下浅拷贝和深拷贝之间的差异。”

“嗯嗯。”


----

GitHub 上标星 9300+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 9300+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
