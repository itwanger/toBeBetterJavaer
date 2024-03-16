---
title: Java面向对象编程基础：探讨类和对象的概念与实现
shortTitle: Java中的类和对象
category:
  - Java核心
tag:
  - 面向对象编程
description: Java中的类和对象是面向对象编程的核心元素。本文将详细介绍Java中类和对象的概念、创建方式以及如何使用和管理这些实例。通过深入理解类和对象的设计与实现，为学习更高级的Java编程技巧打下坚实的基础。
head:
  - - meta
    - name: keywords
      content: Java,类和对象, 面向对象编程
---

# 5.1 Java中的类和对象

“二哥，那天我在图书馆复习《Java进阶之路》的时候，刚好碰见一个学长，他问我有没有‘对象’，我说还没有啊。结果你猜他说什么，‘要不要我给你 new 一个啊？’我当时就懵了，new 是啥意思啊，二哥？”三妹满是疑惑的问我。

“哈哈，三妹，你学长还挺幽默啊。new 是 Java 中的一个关键字，用来把类变成对象。”我笑着对三妹说，“对象和类是 Java 中最基本的两个概念，可以说撑起了面向对象编程（OOP）的一片天。”

### 01、面向过程和面向对象

三妹是不是要问，什么是 OOP？

OOP 的英文全称是 Object Oriented Programming，要理解它的话，就要先理解面向对象，要想理解面向对象的话，就要先理解面向过程，因为一开始没有面向对象的编程语言，都是面向过程。

举个简单点的例子来区分一下面向过程和面向对象。

有一天，你想吃小碗汤了，怎么办呢？有两个选择：

1）自己买食材，豆腐皮啊、肉啊、蒜苔啊等等，自己动手做。

2）到饭店去，只需要对老板喊一声，“来份小碗汤。”

第一种就是面向过程，第二种就是面向对象。

面向过程有什么劣势呢？假如你买了小碗汤的食材，临了又想吃宫保鸡丁了，你是不是还得重新买食材？

面向对象有什么优势呢？假如你不想吃小碗汤了，你只需要对老板说，“我那个小碗汤如果没做的话，换成宫保鸡丁吧！”

面向过程是流程化的，一步一步，上一步做完了，再做下一步。

面向对象是模块化的，我做我的，你做你的，我需要你做的话，我就告诉你一声。我不需要知道你到底怎么做，只看功劳不看苦劳。

不过，如果追到底的话，面向对象的底层其实还是面向过程，只不过把面向过程进行了抽象化，封装成了类，方便我们的调用。

### 02、类

对象可以是现实中看得见的任何物体，比如说，一只特立独行的猪；也可以是想象中的任何虚拟物体，比如说能七十二变的孙悟空。

Java 通过类（class）来定义这些物体，这些物体有什么状态，通过字段来定义，比如说比如说猪的颜色是纯色还是花色；这些物体有什么行为，通过方法来定义，比如说猪会吃，会睡觉。

来，定义一个简单的类给你看看。

```java
/**
 * 微信搜索「沉默王二」，回复 Java
 *
 * @author 沉默王二
 * @date 2020/11/19
 */
public class Person {
    private String name;
    private int age;
    private int sex;

    private void eat() {
    }

    private void sleep() {
    }

    private void dadoudou() {
    }
}
```

一个类可以包含：

- 字段（Filed）
- 方法（Method）
- 构造方法（Constructor）

在 Person 类中，字段有 3 个，分别是 name、age 和 sex，它们也称为成员[变量](https://javabetter.cn/oo/var.html)——在类内部但在方法外部，方法内部的叫临时变量。

成员变量有时候也叫做实例变量，在编译时不占用内存空间，在运行时获取内存，也就是说，只有在对象实例化（`new Person()`）后，字段才会获取到内存，这也正是它被称作“实例”变量的原因。

[方法](https://javabetter.cn/oo/method.html)有 3 个，分别是 `eat()`、`sleep()` 和 `dadoudou()`，表示 Person 这个对象可以做什么，也就是吃饭睡觉打豆豆。

那三妹是不是要问，“怎么没有[构造方法](https://javabetter.cn/oo/construct.html)呢？”

的确在 Person 类的源码文件（.java）中没看到，但在反编译后的字节码文件（.class）中是可以看得到的。

```java
//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.itwanger.twentythree;

public class Person {
    private String name;
    private int age;
    private int sex;

    public Person() {
    }

    private void eat() {
    }

    private void sleep() {
    }

    private void dadoudou() {
    }
}
```

`public Person(){}` 就是默认的构造方法，因为是空的构造方法（方法体中没有内容），所以可以缺省。Java 聪明就聪明在这，有些很死板的代码不需要开发人员添加，它会偷偷地做了。

### 03、new 一个对象

创建 Java 对象时，需要用到 `new` 关键字。

```java
Person person = new Person();
```

这行代码就通过 Person 类创建了一个 Person 对象。所有**对象**在创建的时候都会在**堆内存中分配空间**。

创建对象的时候，需要一个 `main()` 方法作为入口， `main()` 方法可以在当前类中，也可以在另外一个类中。

第一种：`main()` 方法直接放在 Person 类中。

```java
public class Person {
    private String name;
    private int age;
    private int sex;

    private void eat() {}
    private void sleep() {}
    private void dadoudou() {}

    public static void main(String[] args) {
        Person person = new Person();
        System.out.println(person.name);
        System.out.println(person.age);
        System.out.println(person.sex);
    }
}
```

输出结果如下所示：

```
null
0
0
```

第二种：`main()` 方法不在 Person 类中，而在另外一个类中。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/object-class/16-01.png)

实际开发中，我们通常不在当前类中直接创建对象并使用它，而是放在使用对象的类中，比如说上图中的 PersonTest 类。

可以把 PersonTest 类和 Person 类放在两个文件中，也可以放在一个文件（命名为 PersonTest.java）中，就像下面这样。

```java
/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class PersonTest {
    public static void main(String[] args) {
        Person person = new Person();
    }
}

class Person {
    private String name;
    private int age;
    private int sex;

    private void eat() {}
    private void sleep() {}
    private void dadoudou() {}
}
```

### 04、初始化对象

在之前的例子中，程序输出结果为：

```
null
0
0
```

为什么会有这样的输出结果呢？因为 Person 对象没有初始化，因此输出了 String 的默认值 null，int 的默认值 0。

那怎么初始化 Person 对象（对字段赋值）呢？

#### 第一种：通过对象的引用变量。

```java
public class Person {
    private String name;
    private int age;
    private int sex;

    public static void main(String[] args) {
        Person person = new Person();
        person.name = "沉默王二";
        person.age = 18;
        person.sex = 1;
        
        System.out.println(person.name);
        System.out.println(person.age);
        System.out.println(person.sex);
    }
}
```

person 被称为对象 Person 的引用变量，见下图：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/object-class/16-02.png)

通过对象的引用变量，可以直接对字段进行初始化（`person.name = "沉默王二"`），所以以上代码输出结果如下所示：

```
沉默王二
18
1
```

#### 第二种：通过方法初始化。

```java
/**
 * @author 沉默王二，一枚有趣的程序员
 */
public class Person {
    private String name;
    private int age;
    private int sex;

    public void initialize(String n, int a, int s) {
        name = n;
        age = a;
        sex = s;
    }

    public static void main(String[] args) {
        Person person = new Person();
        person.initialize("沉默王二",18,1);

        System.out.println(person.name);
        System.out.println(person.age);
        System.out.println(person.sex);
    }
}
```

在 Person 类中新增方法 `initialize()`，然后在新建对象后传参进行初始化（`person.initialize("沉默王二", 18, 1)`）。

#### 第三种：通过构造方法初始化。

```java
/**
 * @author 沉默王二，一枚有趣的程序员
 */
public class Person {
    private String name;
    private int age;
    private int sex;

    public Person(String name, int age, int sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    }

    public static void main(String[] args) {
        Person person = new Person("沉默王二", 18, 1);

        System.out.println(person.name);
        System.out.println(person.age);
        System.out.println(person.sex);
    }
}
```

这也是最标准的一种做法，直接在 new 的时候把参数传递过去。

补充一点知识，匿名对象。匿名对象意味着没有引用变量，它只能在创建的时候被使用一次。

```java
new Person();
```

可以直接通过匿名对象调用方法：

```java
new Person().initialize("沉默王二", 18, 1);
```

### 05、关于 Object 类

在 Java 中，经常提到一个词“万物皆对象”，其中的“万物”指的是 Java 中的所有类，而这些类都是 Object 类的子类。

Object 主要提供了 11 个方法，大致可以分为六类：

![三分恶面渣逆袭：Object类的方法](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/javase-21.png)

#### 对象比较：

①、`public native int hashCode()` ：[native 方法](https://javabetter.cn/oo/native-method.html)，用于返回对象的哈希码。

```java
public native int hashCode();
```

按照约定，相等的对象必须具有相等的哈希码。如果重写了 equals 方法，就应该重写 hashCode 方法。可以使用 [Objects.hash()](https://javabetter.cn/common-tool/Objects.html#%E8%8E%B7%E5%8F%96%E5%AF%B9%E8%B1%A1%E7%9A%84hashcode) 方法来生成哈希码。

```java
public int hashCode() {
    return Objects.hash(name, age);
}
```

②、`public boolean equals(Object obj)`：用于比较 2 个对象的内存地址是否相等。

```java
public boolean equals(Object obj) {
    return (this == obj);
}
```

如果比较的是两个对象的值是否相等，就要重写该方法，比如 [String 类](https://javabetter.cn/string/string-source.html)、Integer 类等都重写了该方法。举个例子，假如有一个 Person 类，我们认为只要年龄和名字相同，就是同一个人，那么就可以这样重写 equals 方法：

```java
class Person1 {
    private String name;
    private int age;

    // 省略 gettter 和 setter 方法

    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj instanceof Person1) {
            Person1 p = (Person1) obj;
            return this.name.equals(p.getName()) && this.age == p.getAge();
        }
        return false;
    }
}
```

#### 对象拷贝：

`protected native Object clone() throws CloneNotSupportedException`：naitive 方法，返回此对象的一个副本。默认实现只做[浅拷贝](https://javabetter.cn/basic-extra-meal/deep-copy.html)，且类必须实现 Cloneable 接口。

Object 本身没有实现 Cloneable 接口，所以在不重写 clone 方法的情况下直接直接调用该方法会发生 CloneNotSupportedException 异常。

#### 对象转字符串：

`public String toString()`：返回对象的字符串表示。默认实现返回类名@哈希码的十六进制表示，但通常会被重写以返回更有意义的信息。

```java
public String toString() {
    return getClass().getName() + "@" + Integer.toHexString(hashCode());
}
```

比如说一个 Person 类，我们可以重写 toString 方法，返回一个有意义的字符串：

```java
public String toString() {
    return "Person{" +
            "name='" + name + '\'' +
            ", age=" + age +
            '}';
}
```

当然了，这项工作也可以直接交给 IDE，比如 IntelliJ IDEA，直接右键选择 Generate，然后选择 toString 方法，就会自动生成一个 toString 方法。

也可以交给 [Lombok](https://javabetter.cn/springboot/lombok.html)，使用 @Data 注解，它会自动生成 toString 方法。

数组也是一个对象，所以通常我们打印数组的时候，会看到诸如 `[I@1b6d3586` 这样的字符串，这个就是 int 数组的哈希码。

#### 多线程调度：

每个对象都可以调用 Object 的 wait/notify 方法来实现等待/通知机制。我们来写一个例子：

```java
public class WaitNotifyDemo {
    public static void main(String[] args) {
        Object lock = new Object();
        new Thread(() -> {
            synchronized (lock) {
                System.out.println("线程1：我要等待");
                try {
                    lock.wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println("线程1：我被唤醒了");
            }
        }).start();
        new Thread(() -> {
            synchronized (lock) {
                System.out.println("线程2：我要唤醒");
                lock.notify();
                System.out.println("线程2：我已经唤醒了");
            }
        }).start();
    }
}
```

解释一下：

- 线程 1 先执行，它调用了 `lock.wait()` 方法，然后进入了等待状态。
- 线程 2 后执行，它调用了 `lock.notify()` 方法，然后线程 1 被唤醒了。

①、`public final void wait() throws InterruptedException`：调用该方法会导致当前线程等待，直到另一个线程调用此对象的`notify()`方法或`notifyAll()`方法。

②、`public final native void notify()`：唤醒在此对象监视器上等待的单个线程。如果有多个线程等待，选择一个线程被唤醒。

③、`public final native void notifyAll()`：唤醒在此对象监视器上等待的所有线程。

④、`public final native void wait(long timeout) throws InterruptedException`：等待 timeout 毫秒，如果在 timeout 毫秒内没有被唤醒，会自动唤醒。

⑥、`public final void wait(long timeout, int nanos) throws InterruptedException`：更加精确了，等待 timeout 毫秒和 nanos 纳秒，如果在 timeout 毫秒和 nanos 纳秒内没有被唤醒，会自动唤醒。

#### 反射：

推荐阅读：[二哥的 Java 进阶之路：掌握 Java 反射](https://javabetter.cn/basic-extra-meal/fanshe.html)

`public final native Class<?> getClass()`：用于获取对象的类信息，如类名。比如说：

```java
public class GetClassDemo {
    public static void main(String[] args) {
        Person p = new Person();
        Class<? extends Person> aClass = p.getClass();
        System.out.println(aClass.getName());
    }
}
```

输出结果：

```
com.itwanger.Person
```

#### 垃圾回收：

`protected void finalize() throws Throwable`：当垃圾回收器决定回收对象占用的内存时调用此方法。用于清理资源，但 Java 不推荐使用，因为它不可预测且容易导致问题，Java 9 开始已被弃用。

![](https://cdn.tobebetterjavaer.com/stutymore/javase-20240313085055.png)

### 06、关于对象一些小知识

#### 1）抽象的历程

所有编程语言都是一种抽象，甚至可以说，我们能够解决的问题的复杂程度取决于抽象的类型和质量。

Smalltalk 是历史上第一门获得成功的面向对象语言，也为 Java 提供了灵感。它有 5 个基本特征：

- 万物皆对象。
- 一段程序实际上就是多个对象通过发送消息的方式来告诉彼此该做什么。
- 通过组合的方式，可以将多个对象封装成其他更为基础的对象。
- 对象是通过类实例化的。
- 同一类型的对象可以接收相同的消息。

总结一句话就是：

>状态+行为+标识=对象，每个对象在内存中都会有一个唯一的地址。

#### 2）对象具有接口

所有的对象，都可以被归为一类，并且同一类对象拥有一些共同的行为和特征。在 Java 中，class 关键字用来定义一个类型。

创建抽象数据类型是面向对象编程的一个基本概念。你可以创建某种类型的变量，Java 中称之为对象或者实例，然后你就可以操作这些变量，Java 中称之为发送消息或者发送请求，最后对象决定自己该怎么做。

类描述了一系列具有相同特征和行为的对象，从宽泛的概念上来说，类其实就是一种自定义的数据类型。

一旦创建了一个类，就可以用它创建任意多个对象。面向对象编程语言遇到的最大一个挑战就是，如何把现实/虚拟的元素抽象为 Java 中的对象。

对象能够接收什么样的请求是由它的[接口](https://javabetter.cn/oo/interface.html)定义的。具体是怎么做到的，就由它的实现方法来实现。

#### 3）访问权限修饰符

类的创建者有时候也被称为 API 提供者，对应的，类的使用者就被称为 API 调用者。

JDK 就给我们提供了 Java 的基础实现，JDK 的作者也就是基础 API 的提供者（Java 多线程部分的作者 Doug Lea 是被 Java 程序员敬佩的一个大佬），我们这些 Java 语言的使用者，说白了就是 JDK 的调用者。

![](https://cdn.tobebetterjavaer.com/stutymore/object-class-20230410094307.png)

当然了，假如我们也提供了新的类给其他调用者，我们也就成为了新的创建者。

API 创建者在创建新的类的时候，只暴露必要的接口，而隐藏其他所有不必要的信息，之所以要这么做，是因为如果这些信息对调用者是不可见的，那么创建者就可以随意修改隐藏的信息，而不用担心对调用者的影响。
 
这里就必须要讲到 [Java 的权限修饰符](https://javabetter.cn/oo/access-control.html)。

访问权限修饰符的第一个作用是，防止类的调用者接触到他们不该接触的内部实现；第二个作用是，让类的创建者可以轻松修改内部机制而不用担心影响到调用者的使用。

- public
- private
- protected

还有一种“默认”的权限修饰符，是缺省的，它修饰的类可以访问同一个包下面的其他类。

#### 4）组合

我们可以把一个创建好的类作为另外一个类的成员变量来使用，利用已有的类组成成一个新的类，被称为“复用”，组合代表的关系是 has-a 的关系。

#### 5）继承

[继承](https://javabetter.cn/oo/extends-bigsai.html)是 Java 中非常重要的一个概念，子类继承父类，也就拥有了父类中 protected 和 public 修饰的方法和字段，同时，子类还可以扩展一些自己的方法和字段，也可以重写继承过来方法。

常见的例子，就是形状可以有子类圆形、方形、三角形，它们的基础接口是相同的，比如说都有一个 `draw()` 的方法，子类可以继承这个方法实现自己的绘制方法。

如果子类只是重写了父类的方法，那么它们之间的关系就是 is-a 的关系，但如果子类增加了新的方法，那么它们之间的关系就变成了 is-like-a 的关系。

#### 6）多态

比如说有一个父类Shape

```java
public class Shape {
    public void draw() {
        System.out.println("形状");
    }
}
```

子类Circle

```java
public class Circle extends Shape{
    @Override
    public void draw() {
        System.out.println("圆形");
    }
}
```

子类Line

```java
public class Line extends Shape {
    @Override
    public void draw() {
        System.out.println("线");
    }
}
```

测试类

```java
public class Test {
    public static void main(String[] args) {
        Shape shape1 = new Line();
        shape1.draw();
        Shape shape2 = new Circle();
        shape2.draw();
    }
}
```

运行结果：

```
线
圆形
```

在测试类中，shape1 的类型为 Shape，shape2 的类型也为 Shape，但调用 `draw()` 方法后，却能自动调用子类 Line 和 Circle 的 `draw()` 方法，这是为什么呢？

其实就是 Java 中的[多态](https://javabetter.cn/oo/polymorphism.html)。

### 07、小结

“怎么样，三妹，是不是对 Java 有了更深入更清晰的理解？”终于讲完了，我深呼了一口气，好舒畅啊！

“是的，哥，感觉 Java 也就那么回事嘛。”哎呀，三妹有点狂了起来，“万物皆对象，除了基本数据类型。”

“哇，三妹，你可以啊，都会自己梳理总结了。”我倍感欣慰，觉得果然是劳有所获，你讲的认真，听众就能理解和 get，满足了。

----


GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)