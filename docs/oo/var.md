---
title: Java变量：了解局部变量、成员变量、静态变量和常量的特点与用途
shortTitle: Java中的变量
description: Java中的变量分为局部变量、成员变量、静态变量和常量。这篇文章将详细解析这些变量类型的特点、使用场景以及如何在实际编程中应用。通过掌握各类变量的使用，可以更好地编写高质量、易读的Java代码。
category:
  - Java 核心
tag:
  - 面向对象编程
head:
  - - meta
    - name: keywords
      content: Java,Java变量,局部变量,成员变量,静态变量,常量,变量
---

# 5.3 Java中的变量

“二哥，听说 Java 变量在以后的日子里经常用，能不能提前给我透露透露？”三妹咪了一口麦香可可奶茶后对我说。

“三妹啊，搬个凳子坐我旁边，听二哥来给你慢慢说啊。”

Java 变量就好像一个容器，可以保存程序在运行过程中的值，它在声明的时候会定义对应的[数据类型](https://javabetter.cn/basic-grammar/basic-data-type.html)（Java 分为两种数据类型：基本数据类型和引用数据类型）。变量按照作用域的范围又可分为三种类型：局部变量，成员变量和静态变量。

比如说，`int data = 88;`，其中 data 就是一个变量，它的值为 88，类型为整型（int）。


### 01、局部变量

在方法体内声明的变量被称为局部变量，该变量只能在该方法内使用，类中的其他方法并不知道该变量。来看下面这个示例：

```java
/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class LocalVariable {
    public static void main(String[] args) {
        int a = 10;
        int b = 10;
        int c = a + b;
        System.out.println(c);
    }
}
```

其中 a、b、c 就是局部变量，它们只能在当前这个 main 方法中使用。

声明局部变量时的注意事项：

- 局部变量声明在方法、构造方法或者语句块中。
- 局部变量在方法、构造方法、或者语句块被执行的时候创建，当它们执行完成后，将会被销毁。
- 访问修饰符不能用于局部变量。
- 局部变量只在声明它的方法、构造方法或者语句块中可见。
- 局部变量是在栈上分配的。
- 局部变量没有默认值，所以局部变量被声明后，必须经过初始化，才可以使用。

### 02、成员变量

在类内部但在方法体外声明的变量称为成员变量，或者实例变量，或者字段。之所以称为实例变量，是因为该变量只能通过类的实例（对象）来访问。来看下面这个示例：

```java
/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class InstanceVariable {
    int data = 88;
    public static void main(String[] args) {
        InstanceVariable iv = new InstanceVariable();
        System.out.println(iv.data); // 88
    }
}
```

其中 iv 是一个变量，它是一个引用类型的变量。`new` 关键字可以创建一个类的实例（也称为对象），通过“=”操作符赋值给 iv 这个变量，iv 就成了这个对象的引用，通过 `iv.data` 就可以访问成员变量了。

声明成员变量时的注意事项：

- 成员变量声明在一个类中，但在方法、构造方法和语句块之外。
- 当一个对象被实例化之后，每个成员变量的值就跟着确定。
- 成员变量在对象创建的时候创建，在对象被销毁的时候销毁。
- 成员变量的值应该至少被一个方法、构造方法或者语句块引用，使得外部能够通过这些方式获取实例变量信息。
- 成员变量可以声明在使用前或者使用后。
- 访问修饰符可以修饰成员变量。
- 成员变量对于类中的方法、构造方法或者语句块是可见的。一般情况下应该把成员变量设为私有。通过使用访问修饰符可以使成员变量对子类可见；成员变量具有默认值。数值型变量的默认值是 0，布尔型变量的默认值是 false，引用类型变量的默认值是 null。变量的值可以在声明时指定，也可以在构造方法中指定。

### 03、静态变量

通过 [static 关键字](https://javabetter.cn/oo/static.html)声明的变量被称为静态变量（类变量），它可以直接被类访问，来看下面这个示例：

```java
/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class StaticVariable {
    static int data = 99;
    public static void main(String[] args) {
        System.out.println(StaticVariable.data); // 99
    }
}
```

其中 data 就是静态变量，通过`类名.静态变量`就可以访问了，不需要创建类的实例。

声明静态变量时的注意事项：

- 静态变量在类中以 static 关键字声明，但必须在方法构造方法和语句块之外。
- 无论一个类创建了多少个对象，类只拥有静态变量的一份拷贝。
- 静态变量除了被声明为常量外很少使用。
- 静态变量储存在静态存储区。
- 静态变量在程序开始时创建，在程序结束时销毁。
- 与成员变量具有相似的可见性。但为了对类的使用者可见，大多数静态变量声明为 public 类型。
- 静态变量的默认值和实例变量相似。
- 静态变量还可以在静态语句块中初始化。

### 04、常量

在 Java 中，有些数据的值是不会发生改变的，这些数据被叫做常量——使用 [final 关键字](https://javabetter.cn/oo/final.html)修饰的成员变量。常量的值一旦给定就无法改变！

常量在程序运行过程中主要有 2 个作用：

- 代表常数，便于修改（例如：圆周率的值，`final double PI = 3.14`）
- 增强程序的可读性（例如：常量 UP、DOWN 用来代表上和下，`final int UP = 0`）

Java 要求常量名必须大写。来看下面这个示例：

```java
/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class FinalVariable {
    final String CHEN = "沉";
    static final String MO = "默";
    public static void main(String[] args) {
        FinalVariable fv = new FinalVariable();
        System.out.println(fv.CHEN);
        System.out.println(MO);
    }
}
```

“好了，三妹，关于 Java 变量就先说这么多吧，你是不是已经清楚了？”转动了一下僵硬的脖子后，我对三妹说。

“是啊，二哥，我想以后还会再见到它们吧？”

“那见的次数可就多了，就好像你每天眨眼的次数一样多。”


----


GitHub 上标星 9300+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 9300+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)