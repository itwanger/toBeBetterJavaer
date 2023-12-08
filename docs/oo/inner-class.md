---
title: 聊聊Java内部类：成员内部类、局部内部类、匿名内部类、静态内部类
shortTitle: Java内部类
description: 本文详细介绍了Java内部类的概念、分类及其在实际编程中的应用。文章将讨论非静态内部类、静态内部类、匿名内部类和局部内部类的特点，以及如何在实际项目中合理地使用内部类来简化代码、提高封装性和灵活性。
category:
  - Java 核心
tag:
  - 面向对象编程
head:
  - - meta
    - name: keywords
      content: Java,内部类,成员内部类,局部内部类,匿名内部类,静态内部类,java 内部类
---

# 5.12 Java内部类

“在 Java 中，可以将一个类定义在另外一个类里面或者一个方法里面，这样的类叫做内部类。”我放下手中的枸杞杯，对三妹说，“一般来说，内部类分为成员内部类、局部内部类、匿名内部类和静态内部类。”

### **1）成员内部类**
 
成员内部类是最常见的内部类，看下面的代码：
 
```java
class Wanger {
    int age = 18;
    
    class Wangxiaoer {
        int age = 81;
    }
}
```

看起来内部类 Wangxiaoer 就好像 Wanger 的一个成员，成员内部类可以无限制访问外部类的所有成员属性。

```java
public class Wanger {
    int age = 18;
    private String name = "沉默王二";
    static double money = 1;

    class Wangxiaoer {
        int age = 81;
        
        public void print() {
            System.out.println(name);
            System.out.println(money);
        }
    }
}
```

内部类可以随心所欲地访问外部类的成员，但外部类想要访问内部类的成员，就不那么容易了，必须先创建一个成员内部类的对象，再通过这个对象来访问：

```java
public class Wanger {
    int age = 18;
    private String name = "沉默王二";
    static double money = 1;

    public Wanger () {
        new Wangxiaoer().print();
    }

    class Wangxiaoer {
        int age = 81;

        public void print() {
            System.out.println(name);
            System.out.println(money);
        }
    }
}
```

这也就意味着，如果想要在静态方法中访问成员内部类的时候，就必须先得创建一个外部类的对象，因为内部类是依附于外部类的。

```java
public class Wanger {
    int age = 18;
    private String name = "沉默王二";
    static double money = 1;

    public Wanger () {
        new Wangxiaoer().print();
    }

    public static void main(String[] args) {
        Wanger wanger = new Wanger();
        Wangxiaoer xiaoer = wanger.new Wangxiaoer();
        xiaoer.print();
    }

    class Wangxiaoer {
        int age = 81;

        public void print() {
            System.out.println(name);
            System.out.println(money);
        }
    }
}
```

这种创建内部类的方式在实际开发中并不常用，因为内部类和外部类紧紧地绑定在一起，使用起来非常不便。

### **2）局部内部类**

局部内部类是定义在一个方法或者一个作用域里面的类，所以局部内部类的生命周期仅限于作用域内。

```java
public class Wangsan {
    public Wangsan print() {
        class Wangxiaosan extends Wangsan{
            private int age = 18;
        }
        return new Wangxiaosan();
    }
}
```

局部内部类就好像一个局部变量一样，它是不能被权限修饰符修饰的，比如说 public、protected、private 和 static 等。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/oo/inner-class-26fc0242-134a-4588-a52d-7da962fc3fb9.png)

### **3）匿名内部类**

匿名内部类是我们平常用得最多的，尤其是启动多线程的时候，会经常用到，并且 IDE 也会帮我们自动生成。

```java
public class ThreadDemo {
    public static void main(String[] args) {
        Thread t = new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println(Thread.currentThread().getName());
            }
        });
        t.start();
    }
}
```

匿名内部类就好像一个方法的参数一样，用完就没了，以至于我们都不需要为它专门写一个构造方法，它的名字也是由系统自动命名的。仔细观察编译后的字节码文件也可以发现，匿名内部类连名字都不配拥有，哈哈，直接借用的外部类，然后 `$1` 就搞定了。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/oo/inner-class-c0b9bdf5-cb12-45fc-b362-cb14d5d44fdc.png)


匿名内部类是唯一一种没有构造方法的类。就上面的写法来说，匿名内部类也不允许我们为其编写构造方法，因为它就像是直接通过 new 关键字创建出来的一个对象。

匿名内部类的作用主要是用来继承其他类或者实现接口，并不需要增加额外的方法，方便对继承的方法进行实现或者重写。

### **4）静态内部类**

静态内部类和成员内部类类似，只是多了一个 [static 关键字](https://javabetter.cn/oo/static.html)。

```java
public class Wangsi {
    static int age;
    double money;
    
    static class Wangxxiaosi {
        public Wangxxiaosi (){
            System.out.println(age);
        }
    }
}
```

由于 static 关键字的存在，静态内部类是不允许访问外部类中非 static 的变量和方法的，这一点也非常好理解：你一个静态的内部类访问我非静态的成员变量干嘛？


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/oo/inner-class-69523196-37fe-43c6-a52e-5a8c94fdd2d8.png)

“为什么要使用内部类呢？”三妹问。

三妹这个问题问的非常妙，是时候引经据典了。

在《Think in java》中有这样一句话：

>使用内部类最吸引人的原因是：每个内部类都能独立地继承一个（接口的）实现，所以无论外围类是否已经继承了某个（接口的）实现，对于内部类都没有影响。

在我们程序设计中有时候会存在一些使用接口很难解决的问题，这个时候我们可以利用内部类提供的、可以继承多个具体的或者抽象的类的能力来解决这些程序设计问题。可以这样说，接口只是解决了部分问题，而内部类使得多重继承的解决方案变得更加完整。
 
使用内部类还能够为我们带来如下特性：

- 1、内部类可以使用多个实例，每个实例都有自己的状态信息，并且与其他外围对象的信息相互独立。
- 2、在单个外部类中，可以让多个内部类以不同的方式实现同一个接口，或者继承同一个类。
- 3、创建内部类对象的时刻并不依赖于外部类对象的创建。
- 4、内部类并没有令人迷惑的“is-a”关系，他就是一个独立的实体。
- 5、内部类提供了更好的封装，除了该外围类，其他类都不能访问。

>参考链接：[https://www.cnblogs.com/dolphin0520/p/3811445.html](https://www.cnblogs.com/dolphin0520/p/3811445.html)，作者：Matrix海 子，编辑：沉默王二


----


GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
