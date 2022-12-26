---
title: Java到底是值传递还是引用传递？
shortTitle: Java到底是值传递还是引用传递？
category:
  - Java核心
tag:
  - Java重要知识点
description: Java程序员进阶之路，小白的零基础Java教程，从入门到进阶，Java到底是值传递还是引用传递？
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,java,值传递,引用传递
---


“哥，说说 Java 到底是值传递还是引用传递吧？”三妹一脸的困惑，看得出来她被这个问题折磨得不轻。

“说实在的，我在一开始学 Java 的时候也被这个问题折磨得够呛，总以为基本数据类型在传参的时候是值传递，而引用类型是引用传递。”我对三妹袒露了心声，为的就是让她不再那么焦虑，她哥当年也是这么过来的。

 C 语言是很多编程语言的母胎，包括 Java，那么对于 C 语言来说，所有的方法参数都是“通过值”传递的，也就是说，传递给被调用方法的参数值存放在临时变量中，而不是存放在原来的变量中。这就意味着，被调用的方法不能修改调用方法中变量的值，而只能修改其私有变量的临时副本的值。

Java 继承了 C 语言这一特性，因此 Java 是按照值来传递的。

接下来，我们必须得搞清楚，到底什么是值传递（pass by value），什么是引用传递（pass by reference），否则，讨论 Java 到底是值传递还是引用传递就显得毫无意义。

当一个参数按照值的方式在两个方法之间传递时，调用者和被调用者其实是用的两个不同的变量——被调用者中的变量（原始值）是调用者中变量的一份拷贝，对它们当中的任何一个变量修改都不会影响到另外一个变量，据说 Fortran 语言是通过引用传递的。

“Fortran 语言？”三妹睁大了双眼，似乎听见了什么新的名词。

“是的，Fortran 语言，1957 年由 IBM 公司开发，是世界上第一个被正式采用并流传至今的高级编程语言。”

当一个参数按照引用传递的方式在两个方法之间传递时，调用者和被调用者其实用的是同一个变量，当该变量被修改时，双方都是可见的。

“我们之所以容易搞不清楚 Java 到底是值传递还是引用传递，主要是因为 Java 中的两类数据类型的叫法容易引发误会，比如说 int 是基本类型，说它是值传递的，我们就很容易理解；但对于引用类型，比如说 String，说它也是值传递的时候，我们就容易弄不明白。”

我们来看看基本数据类型和引用数据类型之间的差别。

```java
int age = 18;
String name = "二哥";
```

age 是基本类型，值就保存在变量中，而 name 是引用类型，变量中保存的是对象的地址。一般称这种变量为对象的引用，引用存放在栈中，而对象存放在堆中。

这里说的栈和堆，是指内存中的一块区域，和数据结构中的栈和堆不一样。栈是由编译器自动分配释放的，所以适合存放编译期就确定生命周期的数据；而堆中存放的数据，编译器是不需要知道生命周期的，创建后的回收工作由垃圾收集器来完成。

“画幅图。”

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/core-points/pass-by-value-01.png)

当用 = 赋值运算符改变 age 和 name 的值时。

```java
age = 16;
name = "三妹";
```

对于基本类型 age，赋值运算符会直接改变变量的值，原来的值被覆盖。

对于引用类型 name，赋值运算符会改变对象引用中保存的地址，原来的地址被覆盖，但原来的对象不会被覆盖。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/core-points/pass-by-value-02.png)

“三妹，注意听，接下来，我们来说说基本数据类型的参数传递。”

Java 有 8 种基本数据类型，分别是 int、long、byte、short、float、double 、char 和 boolean，就拿 int 类型来举例吧。

```java
class PrimitiveTypeDemo {
    public static void main(String[] args) {
        int age = 18;
        modify(age);
        System.out.println(age);
    }

    private static void modify(int age1) {
        age1 = 30;
    }
}
```

1）`main()` 方法中的 age 为基本类型，所以它的值 18 直接存储在变量中。

2）调用 `modify()` 方法的时候，将会把 age 的值 18 复制给形参 age1。

3）`modify()` 方法中，对 age1  做出了修改。

4）回到 `main()` 方法中，age 的值仍然为 18，并没有发生改变。

如果我们想让 age 的值发生改变，就需要这样做。

```java
class PrimitiveTypeDemo1 {
    public static void main(String[] args) {
        int age = 18;
        age = modify(age);
        System.out.println(age);
    }

    private static int modify(int age1) {
        age1 = 30;
        return age1;
    }
}
```

第一，让 `modify()` 方法有返回值；

第二，使用赋值运算符重新对 age 进行赋值。

“好了，再来说说引用类型的参数传递。”

就以 String 为例吧。

```java
class ReferenceTypeDemo {
    public static void main(String[] args) {
        String name = "二哥";
        modify(name);
        System.out.println(name);
    }

    private static void modify(String name1) {
        name1 = "三妹";
    }
}
```

在调用 `modify()` 方法的时候，形参 name1 复制了 name 的地址，指向的是堆中“二哥”的位置。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/core-points/pass-by-value-03.png)

当 `modify()` 方法调用结束后，改变了形参 name1 的地址，但 `main()` 方法中 name 并没有发生改变。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/core-points/pass-by-value-04.png)

总结：

- Java 中的参数传递是按值传递的。
- 如果参数是基本类型，传递的是基本类型的字面量值的拷贝。
- 如果参数是引用类型，传递的是引用的对象在堆中地址的拷贝。

“好了，三妹，今天的学习就到这吧。”

----

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

