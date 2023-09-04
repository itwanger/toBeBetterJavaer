---
title: 深入探讨 Java transient 关键字：掌控序列化时的字段选择权
shortTitle: transient关键字
category:
  - Java核心
tag:
  - Java IO
description: 本文详细介绍了 Java 中 transient 关键字的作用与用法，阐述了其如何在对象序列化过程中控制特定字段的序列化与反序列化。同时，文章还提供了 transient 关键字的实际应用示例和注意事项。阅读本文，将帮助您更深入地了解 Java 中的 transient 关键字，有效地控制对象序列化过程中的字段选择。
head:
  - - meta
    - name: keywords
      content: Java,transient,java transient,transient关键字
---

# 7.10 transient关键字

害，小二最熟的是 Java，但很多 Java 基础知识都不知道，比如 transient 关键字以前就没用到过，所以不知道它的作用是什么，今天去招银面试的时候，面试官问到了这个：说说 Java 的 transient 关键字吧，结果小二直接懵逼了。

下面是他自己面试凉了以后回去做的总结，分享出来，大家一起涨下姿势~~~好了，废话不多说，下面开始：

### 01、transient 的作用及使用方法

我们知道，一个对象只要实现了 [Serilizable 接口](https://javabetter.cn/io/Serializbale.html)，它就可以被[序列化](https://javabetter.cn/io/serialize.html)。

在实际开发过程中，我们常常会遇到这样的问题，一个类的有些字段需要序列化，有些字段不需要，比如说用户的一些敏感信息（如密码、银行卡号等），为了安全起见，不希望在网络操作中传输或者持久化到磁盘文件中，那这些字段就可以加上 `transient` 关键字。

需要注意的是，被 transient 关键字修饰的成员变量在反序列化时会被自动初始化为默认值，例如基本数据类型为 0，引用类型为 null。

来看示例：

```java
public class TransientTest {
    public static void main(String[] args) {
        
        User user = new User();
        user.setUsername("沉默王二");
        user.setPasswd("123456");
        
        System.out.println("read before Serializable: ");
        System.out.println("username: " + user.getUsername());
        System.err.println("password: " + user.getPasswd());
        
        try {
            ObjectOutputStream os = new ObjectOutputStream(
                    new FileOutputStream("user.txt"));
            os.writeObject(user); // 将User对象写进文件
            os.flush();
            os.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            ObjectInputStream is = new ObjectInputStream(new FileInputStream(
                    "user.txt"));
            user = (User) is.readObject(); // 从流中读取User的数据
            is.close();
            
            System.out.println("\nread after Serializable: ");
            System.out.println("username: " + user.getUsername());
            System.err.println("password: " + user.getPasswd());
            
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}

class User implements Serializable {
    private static final long serialVersionUID = 8294180014912103005L;  
    
    private String username;
    private transient String passwd;
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getPasswd() {
        return passwd;
    }
    
    public void setPasswd(String passwd) {
        this.passwd = passwd;
    }

}
```

输出为：

```
read before Serializable:
username: 沉默王二
password: 123456 
read after Serializable:
username: 沉默王二
password: null
```

密码字段为 null，说明反序列化时根本没有从文件中获取到信息。

### 02、transient 使用小结

1）一旦字段被 transient 修饰，成员变量将不再是对象持久化的一部分，该变量的值在序列化后无法访问。

2）transient 关键字只能修饰字段，而不能修饰方法和类。

3）被 transient 关键字修饰的字段不能被序列化，一个静态变量（[static关键字](https://javabetter.cn/oo/static.html)修饰）不管是否被 transient 修饰，均不能被序列化，[前面讲到过](https://javabetter.cn/io/Serializbale.html)。

来看示例：

```java
public class TransientTest {
    public static void main(String[] args) {
        
        User user = new User();
        user.setUsername("沉默王二");
        user.setPasswd("123456");
        
        System.out.println("read before Serializable: ");
        System.out.println("username: " + user.getUsername());
        System.err.println("password: " + user.getPasswd());
        
        try {
            ObjectOutputStream os = new ObjectOutputStream(
                    new FileOutputStream("user.txt"));
            os.writeObject(user); // 将User对象写进文件
            os.flush();
            os.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            // 在反序列化之前改变username的值
            User.username = "沉默王三";
            
            ObjectInputStream is = new ObjectInputStream(new FileInputStream(
                    "user.txt"));
            user = (User) is.readObject(); // 从流中读取User的数据
            is.close();
            
            System.out.println("\nread after Serializable: ");
            System.out.println("username: " + user.getUsername());
            System.err.println("password: " + user.getPasswd());
            
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}

class User implements Serializable {
    private static final long serialVersionUID = 8294180014912103005L;  
    
    public static String username;
    private transient String passwd;
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getPasswd() {
        return passwd;
    }
    
    public void setPasswd(String passwd) {
        this.passwd = passwd;
    }
}
```

运行结果为：

```
read before Serializable:
username: 沉默王二
password: 123456 
read after Serializable:
username: 沉默王三
password: null
```

序列化前，static 修饰的 username 为 沉默王二，然后我们在反序列化前将其修改为 沉默王三 了，如果说 static 修饰的字段能保持状态的话，反序列化后应该是 沉默王二，对吧？

但结果是 沉默王三，这就证明了我们之前的结论：**static 修饰的字段不能被序列化**。

### 03、transient 修饰的字段真的不能被序列化？

思考下面的例子：

```java
public class ExternalizableTest implements Externalizable {
    private transient String content = "是的，我将会被序列化，不管我是否被transient关键字修饰";

    @Override
    public void writeExternal(ObjectOutput out) throws IOException {
        out.writeObject(content);
    }

    @Override
    public void readExternal(ObjectInput in) throws IOException,
            ClassNotFoundException {
        content = (String) in.readObject();
    }

    public static void main(String[] args) throws Exception {
        
        ExternalizableTest et = new ExternalizableTest();
        ObjectOutput out = new ObjectOutputStream(new FileOutputStream(
                new File("test")));
        out.writeObject(et);

        ObjectInput in = new ObjectInputStream(new FileInputStream(new File(
                "test")));
        et = (ExternalizableTest) in.readObject();
        System.out.println(et.content);

        out.close();
        in.close();
    }
}
```

来看下输出结果：

```
是的，我将会被序列化，不管我是否被transient关键字修饰
```

这是为什么呢？不是说 transient 关键字修饰的字段不能序列化吗？

我先说结论，这是因为我们使用了 Externalizable 接口而不是 Serializable接口，这个[知识点我们前面其实也讲到过](https://javabetter.cn/io/Serializbale.html)。

在 Java 中，对象的序列化可以通过实现两种接口来实现，如果实现的是 Serializable 接口，则所有的序列化将会自动进行，如果实现的是 Externalizable 接口，则需要在 writeExternal 方法中指定要序列化的字段，与 transient 关键字修饰无关。

因此例子输出的是变量 content 的内容，而不是 null。

### 04、小结

transient 关键字用于修饰类的成员变量，在序列化对象时，被修饰的成员变量不会被序列化和保存到文件中。其作用是告诉 JVM 在序列化对象时不需要将该变量的值持久化，这样可以避免一些安全或者性能问题。但是，transient 修饰的成员变量在反序列化时会被初始化为其默认值（如 int 类型会被初始化为 0，引用类型会被初始化为 null），因此需要在程序中进行适当的处理。

transient 关键字和 static 关键字都可以用来修饰类的成员变量。其中，transient 关键字表示该成员变量不参与序列化和反序列化，而 static 关键字表示该成员变量是属于类的，不属于对象的，因此不需要序列化和反序列化。

在 Serializable 和 Externalizable 接口中，transient 关键字的表现也不同，在 Serializable 中表示该成员变量不参与序列化和反序列化，在 Externalizable 中不起作用，因为 Externalizable 接口需要实现 readExternal 和 writeExternal 方法，需要手动完成序列化和反序列化的过程。

---------

GitHub 上标星 9300+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 9300+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)