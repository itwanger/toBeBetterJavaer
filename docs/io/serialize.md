---
title: Java 序列流：Java 对象的序列化和反序列化
shortTitle: 序列流(序列化和反序列化)
category:
  - Java核心
tag:
  - Java IO
description: 本文详细介绍了 Java 序列流在对象序列化和反序列化中的重要作用，阐述了其如何有效地将 Java 对象持久化存储和恢复。同时，文章还提供了序列流的实际应用示例和常用方法。阅读本文，将帮助您更深入地了解 Java 序列流以及其在 Java 编程中的关键地位，提高数据持久化和恢复的效率。
head:
  - - meta
    - name: keywords
      content: Java,Java IO,序列化流,java序列化,java反序列化,ObjectOutputStream,ObjectInputStream,java 序列流
---

# 7.8 序列流(序列化和反序列化)

Java 的序列流（ObjectInputStream 和 ObjectOutputStream）是一种可以将 Java 对象序列化和反序列化的流。

序列化是指将一个对象转换为一个字节序列（包含`对象的数据`、`对象的类型`和`对象中存储的属性`等信息），以便在网络上传输或保存到文件中，或者在程序之间传递。在 Java 中，序列化通过实现 java.io.Serializable 接口来实现，只有实现了 [Serializable 接口](https://tobebetterjavaer.com/io/Serializbale.html)的对象才能被序列化。

反序列化是指将一个字节序列转换为一个对象，以便在程序中使用。

![](https://cdn.tobebetterjavaer.com/stutymore/serialize-20230323105551.png)

### 01、ObjectOutputStream

`java.io.ObjectOutputStream` 继承自 OutputStream 类，因此可以将序列化后的字节序列写入到文件、网络等输出流中。

来看 ObjectOutputStream 的构造方法：
`ObjectOutputStream(OutputStream out)`

该构造方法接收一个 OutputStream 对象作为参数，用于将序列化后的字节序列输出到指定的输出流中。例如：

```java
FileOutputStream fos = new FileOutputStream("file.txt");
ObjectOutputStream oos = new ObjectOutputStream(fos);
```

一个对象要想序列化，必须满足两个条件:

- 该类必须实现[`java.io.Serializable` 接口](https://tobebetterjavaer.com/io/Serializbale.html)，否则会抛出`NotSerializableException` 。
- 该类的所有字段都必须是可序列化的。如果一个字段不需要序列化，则需要使用[`transient` 关键字](https://tobebetterjavaer.com/io/transient.html)进行修饰。

使用示例如下：

```java
public class Employee implements Serializable {
    public String name;
    public String address;
    public transient int age; // transient瞬态修饰成员,不会被序列化
}
```

接下来，来聊聊 `writeObject (Object obj)` 方法，该方法是 ObjectOutputStream 类中用于将对象序列化成字节序列并输出到输出流中的方法，可以处理对象之间的引用关系、继承关系、静态字段和 transient 字段。

```java
public class ObjectOutputStreamDemo {
    public static void main(String[] args) {
        Person person = new Person("沉默王二", 20);
        try {
            FileOutputStream fos = new FileOutputStream("logs/person.dat");
            ObjectOutputStream oos = new ObjectOutputStream(fos);
            oos.writeObject(person);
            oos.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
class Person implements Serializable {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }
}
```

上面的代码中，首先创建了一个 Person 对象，然后使用 FileOutputStream 和 ObjectOutputStream 将 Person 对象序列化并输出到 person.dat 文件中。在 Person 类中，实现了 Serializable 接口，表示该类可以进行对象序列化。

### 02、ObjectInputStream

ObjectInputStream 可以读取 ObjectOutputStream 写入的字节流，并将其反序列化为相应的对象（包含`对象的数据`、`对象的类型`和`对象中存储的属性`等信息）。

说简单点就是，序列化之前是什么样子，反序列化后就是什么样子。

来看一下构造方法：`ObjectInputStream(InputStream in)` ： 创建一个指定 InputStream 的 ObjectInputStream。

其中，ObjectInputStream 的 readObject 方法用来读取指定文件中的对象，示例如下：

```java
String filename = "logs/person.dat"; // 待反序列化的文件名
try (FileInputStream fileIn = new FileInputStream(filename);
     ObjectInputStream in = new ObjectInputStream(fileIn)) {
     // 从指定的文件输入流中读取对象并反序列化
     Object obj = in.readObject();
     // 将反序列化后的对象强制转换为指定类型
     Person p = (Person) obj;
     // 打印反序列化后的对象信息
     System.out.println("Deserialized Object: " + p);
} catch (IOException | ClassNotFoundException e) {
     e.printStackTrace();
}
```

我们首先指定了待反序列化的文件名（前面通过 ObjectOutputStream 序列化后的文件），然后创建了一个 FileInputStream 对象和一个 ObjectInputStream 对象。接着我们调用 ObjectInputStream 的 readObject 方法来读取指定文件中的对象，并将其强制转换为 Person 类型。最后我们打印了反序列化后的对象信息。

### 03、Kryo

实际开发中，很少使用 JDK 自带的序列化和反序列化，这是因为：

- 可移植性差：Java 特有的，无法跨语言进行序列化和反序列化。
- 性能差：序列化后的字节体积大，增加了传输/保存成本。
- 安全问题：攻击者可以通过构造恶意数据来实现远程代码执行，从而对系统造成严重的安全威胁。相关阅读：[Java 反序列化漏洞之殇](https://cryin.github.io/blog/secure-development-java-deserialization-vulnerability/) 。

Kryo 是一个优秀的 Java 序列化和反序列化库，具有高性能、高效率和易于使用和扩展等特点，有效地解决了 JDK 自带的序列化机制的痛点。

>GitHub 地址：[https://github.com/EsotericSoftware/kryo](https://github.com/EsotericSoftware/kryo)

使用示例：

第一步，在 pom.xml 中引入依赖。

```
<!-- 引入 Kryo 序列化工具 -->
<dependency>
     <groupId>com.esotericsoftware</groupId>
     <artifactId>kryo</artifactId>
     <version>5.4.0</version>
</dependency>
```

第二步，创建一个 Kryo 对象，并使用 `register()` 方法将对象进行注册。然后，使用 `writeObject()` 方法将 Java 对象序列化为二进制流，再使用 `readObject()` 方法将二进制流反序列化为 Java 对象。最后，输出反序列化后的 Java 对象。

```java
public class KryoDemo {
    public static void main(String[] args) throws FileNotFoundException {
        Kryo kryo = new Kryo();
        kryo.register(KryoParam.class);

        KryoParam object = new KryoParam("沉默王二", 123);

        Output output = new Output(new FileOutputStream("logs/kryo.bin"));
        kryo.writeObject(output, object);
        output.close();

        Input input = new Input(new FileInputStream("logs/kryo.bin"));
        KryoParam object2 = kryo.readObject(input, KryoParam.class);
        System.out.println(object2);
        input.close();
    }
}

class KryoParam {
    private String name;
    private int age;

    public KryoParam() {
    }

    public KryoParam(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "KryoParam{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
```

### 04、小结

本节我们介绍了 Java 的序列化机制，并推荐了一款高性能的 Java 类库 Kryo 来取代 JDK 自带的序列化机制，已经在 Twitter、Groupon、Yahoo 以及多个著名开源项目（如 Hive、Storm）中广泛使用。

以上，希望能帮助到大家。

---------

GitHub 上标星 7600+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 7600+ 的 Java 教程](https://tobebetterjavaer.com/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)