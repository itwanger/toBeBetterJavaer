---
title: Java构造方法：打开Java对象创建之门的钥匙
shortTitle: Java构造方法
description: Java构造方法在对象创建过程中起着至关重要的作用。本文将深入探讨构造方法的原理和用法，帮助您更好地理解Java对象创建过程中的关键环节。学习本文后，您将能够掌握Java构造方法的编写技巧，为编程实践打下坚实的基础。
category:
  - Java 核心
tag:
  - 面向对象编程
---

# 5.7 Java构造方法

“三妹，[上一节](https://javabetter.cn/oo/method.html)学了 Java 中的方法，接着学构造方法的话，难度就小很多了。”刚吃完中午饭，虽然有些困意，但趁机学个 10 分钟也是不错的，睡眠会更心满意足一些，于是我面露微笑地对三妹说。

“在 Java 中，构造方法是一种特殊的方法，当一个类被实例化的时候，就会调用构造方法。只有在构造方法被调用的时候，对象才会被分配内存空间。每次使用 `new` 关键字创建对象的时候，构造方法至少会被调用一次。”

“如果你在一个类中没有看见构造方法，并不是因为构造方法不存在，而是被缺省了，编译器会给这个类提供一个默认的构造方法。就是说，Java 有两种类型的构造方法：**无参构造方法和有参构造方法**。”

“注意，之所以叫它构造方法，是因为对象在创建的时候，需要通过构造方法初始化值——描写对象有哪些初始化状态。”

“哥，你缓缓，一口气说这么多，也真有你的。”三妹听得聚精会神，但也知道关心她这个既当哥又当老师的二哥了。

### 01、创建构造方法的规则

构造方法必须符合以下规则：

- 构造方法的名字必须和类名一样；
- 构造方法没有返回类型，包括 void；
- 构造方法不能是抽象的（abstract）、静态的（static）、最终的（final）、同步的（synchronized）。

简单解析一下最后一条规则。

- 由于构造方法不能被子类继承，所以用 final 和 abstract 关键字修饰没有意义；
- 构造方法用于初始化一个对象，所以用 static 关键字修饰没有意义；
- 多个线程不会同时创建内存地址相同的同一个对象，所以用 synchronized 关键字修饰没有必要。

构造方法的语法格式如下：

```java
class class_name {
    public class_name(){}    // 默认无参构造方法
    public ciass_name([paramList]){}    // 定义有参数列表的构造方法
    …
    // 类主体
}
```

值得注意的是，如果用 void 声明构造方法的话，编译时不会报错，但 Java 会把这个所谓的“构造方法”当成普通方法来处理。

```java
/**
 * 微信搜索「沉默王二」，回复 Java
 *
 * @author 沉默王二
 * @date 2020/11/26
 */
public class Demo {
    void Demo(){ }
}
```

`void Demo(){}` 看起来很符合构造方法的写法（与类名相同），但其实只是一个不符合规范的普通方法，方法名的首字母使用了大写，方法体为空，它并不是默认的无参构造方法，可以通过反编译后的字节码验证。

```java
public class Demo {
    public Demo() {
    }

    void Demo() {
    }
}
```

`public Demo() {}` 才是真正的无参构造方法。

不过，可以使用[访问权限修饰符](https://javabetter.cn/oo/access-control.html)（private、protected、public、default）来修饰构造方法，访问权限修饰符决定了构造方法的创建方式。


### 02、默认构造方法

如果一个构造方法中没有任何参数，那么它就是一个默认构造方法，也称为无参构造方法。

```java
/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class Bike {
    Bike(){
        System.out.println("一辆自行车被创建");
    }

    public static void main(String[] args) {
        Bike bike = new Bike();
    }
}
```

在上面这个例子中，我们为 Bike 类中创建了一个无参的构造方法，它在我们创建对象的时候被调用。

程序输出结果如下所示：

```
一辆自行车被创建
```

通常情况下，无参构造方法是可以缺省的，我们开发者并不需要显式的声明无参构造方法，把这项工作交给编译器就可以了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/object-class/18-01.png)

“二哥，默认构造方法的目的是什么？它为什么是一个空的啊？”三妹疑惑地看着我，提出了这个尖锐的问题。

“三妹啊，默认构造方法的目的主要是为对象的字段提供默认值，看下面这个例子你就明白了。”我胸有成竹地回答道。

```java
/**
 * @author 沉默王二，一枚有趣的程序员
 */
public class Person {
    private String name;
    private int age;

    public static void main(String[] args) {
        Person p = new Person();
        System.out.println("姓名 " + p.name + " 年龄 " + p.age);
    }
}
```

输出结果如下所示：

```
姓名 null 年龄 0
```

在上面的例子中，默认构造方法初始化了 name 和 age 的值，name 是 String 类型，所以默认值为 null，age 是 int 类型，所以默认值为 0。如果没有默认构造方法的话，这项工作就无法完成了。


### 03、有参构造方法

有参数的构造方法被称为有参构造方法，参数可以有一个或多个。有参构造方法可以为不同的对象提供不同的值。当然，也可以提供相同的值。

```java
/**
 * @author 沉默王二，一枚有趣的程序员
 */
public class ParamConstructorPerson {
    private String name;
    private int age;

    public ParamConstructorPerson(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void out() {
        System.out.println("姓名 " + name + " 年龄 " + age);
    }

    public static void main(String[] args) {
        ParamConstructorPerson p1 = new ParamConstructorPerson("沉默王二",18);
        p1.out();

        ParamConstructorPerson p2 = new ParamConstructorPerson("沉默王三",16);
        p2.out();
    }
}
```

在上面的例子中，构造方法有两个参数（name 和 age），这样的话，我们在创建对象的时候就可以直接为 name 和 age 赋值了。

```java
new ParamConstructorPerson("沉默王二",18);
new ParamConstructorPerson("沉默王三",16);
```

如果没有有参构造方法的话，就需要通过 setter 方法给字段赋值了。


### 04、重载构造方法

在 Java 中，构造方法和方法类似，只不过没有返回类型。它也可以像方法一样被[重载](https://javabetter.cn/basic-extra-meal/override-overload.html)。构造方法的重载也很简单，只需要提供不同的参数列表即可。编译器会通过参数的数量来决定应该调用哪一个构造方法。

```java
/**
 * @author 沉默王二，一枚有趣的程序员
 */
public class OverloadingConstrutorPerson {
    private String name;
    private int age;
    private int sex;

    public OverloadingConstrutorPerson(String name, int age, int sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    }

    public OverloadingConstrutorPerson(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void out() {
        System.out.println("姓名 " + name + " 年龄 " + age + " 性别 " + sex);
    }

    public static void main(String[] args) {
        OverloadingConstrutorPerson p1 = new OverloadingConstrutorPerson("沉默王二",18, 1);
        p1.out();

        OverloadingConstrutorPerson p2 = new OverloadingConstrutorPerson("沉默王三",16);
        p2.out();
    }
}
```

创建对象的时候，如果传递的是三个参数，那么就会调用 `OverloadingConstrutorPerson(String name, int age, int sex)` 这个构造方法；如果传递的是两个参数，那么就会调用 `OverloadingConstrutorPerson(String name, int age)` 这个构造方法。


### 05、构造方法和方法的区别

构造方法和方法之间的区别还是蛮多的，比如说下面这些：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/object-class/18-02.png)



### 06、复制对象

复制一个对象可以通过下面三种方式完成：

- 通过构造方法
- 通过对象的值
- 通过 Object 类的 `clone()` 方法

#### 1）通过构造方法

```java
/**
 * @author 沉默王二，一枚有趣的程序员
 */
public class CopyConstrutorPerson {
    private String name;
    private int age;

    public CopyConstrutorPerson(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public CopyConstrutorPerson(CopyConstrutorPerson person) {
        this.name = person.name;
        this.age = person.age;
    }

    public void out() {
        System.out.println("姓名 " + name + " 年龄 " + age);
    }

    public static void main(String[] args) {
        CopyConstrutorPerson p1 = new CopyConstrutorPerson("沉默王二",18);
        p1.out();

        CopyConstrutorPerson p2 = new CopyConstrutorPerson(p1);
        p2.out();
    }
}
```

在上面的例子中，有一个参数为 CopyConstrutorPerson 的构造方法，可以把该参数的字段直接复制到新的对象中，这样的话，就可以在 new 关键字创建新对象的时候把之前的 p1 对象传递过去。

#### 2）通过对象的值

```java
/**
 * @author 沉默王二，一枚有趣的程序员
 */
public class CopyValuePerson {
    private String name;
    private int age;

    public CopyValuePerson(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public CopyValuePerson() {
    }

    public void out() {
        System.out.println("姓名 " + name + " 年龄 " + age);
    }

    public static void main(String[] args) {
        CopyValuePerson p1 = new CopyValuePerson("沉默王二",18);
        p1.out();

        CopyValuePerson p2 = new CopyValuePerson();
        p2.name = p1.name;
        p2.age = p1.age;
        
        p2.out();
    }
}
```

这种方式比较粗暴，直接拿 p1 的字段值复制给 p2 对象（`p2.name = p1.name`）。

#### 3）通过 Object 类的 `clone()` 方法

```java
/**
 * @author 沉默王二，一枚有趣的程序员
 */
public class ClonePerson implements Cloneable {
    private String name;
    private int age;

    public ClonePerson(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }

    public void out() {
        System.out.println("姓名 " + name + " 年龄 " + age);
    }

    public static void main(String[] args) throws CloneNotSupportedException {
        ClonePerson p1 = new ClonePerson("沉默王二",18);
        p1.out();

        ClonePerson p2 = (ClonePerson) p1.clone();
        p2.out();
    }
}
```

通过 `clone()` 方法复制对象的时候，ClonePerson 必须先实现 Cloneable 接口的 `clone()` 方法，然后再调用 `clone()` 方法（`ClonePerson p2 = (ClonePerson) p1.clone()`）。

>拓展阅读：[浅拷贝与深拷贝](https://javabetter.cn/basic-extra-meal/deep-copy.html)

### 07、ending

“二哥，我能问一些问题吗？”三妹精神焕发，没有丝毫的疲惫。

“当然可以啊，你问。”我很欣赏三妹孜孜不倦的态度。

“构造方法真的不返回任何值吗？”

“构造方法虽然没有返回值，但返回的是类的对象。”

“构造方法只能完成字段初始化的工作吗？”

“初始化字段只是构造方法的一种工作，它还可以做更多，比如启动线程，调用其他方法等。”

“好的，二哥，我的问题问完了，今天的学习可以结束了！”三妹一脸得意的样子。

“那你记得复习下一节的内容哦。”感受到三妹已经学到了知识，我也很欣慰。

----


GitHub 上标星 9300+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 9300+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)