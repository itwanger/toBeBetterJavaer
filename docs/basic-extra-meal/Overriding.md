---
title: Java重写（Overriding）时应当遵守的11条规则
shortTitle: 重写时应当遵守的11条规则
category:
  - Java核心
tag:
  - Java重要知识点
description: Java程序员进阶之路，小白的零基础Java教程，从入门到进阶，Java重写（Overriding）时应当遵守的11条规则
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java进阶之路,Java入门,教程,java,重写,Overriding
---


重写（Overriding）算是 Java 中一个非常重要的概念，理解重写到底是什么对每个 Java 程序员来说都至关重要，这篇文章就来给大家说说重写过程中应当遵守的 12 条规则。

## 01、什么是重写？

重写带来了一种非常重要的能力，可以让子类重新实现从超类那继承过来的方法。在下面这幅图中，Animal 是父类，Dog 是子类，Dog 重新实现了 `move()` 方法用来和父类进行区分，毕竟狗狗跑起来还是比较有特色的。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/basic-extra-meal/Overriding-1.png)

重写的方法和被重写的方法，不仅方法名相同，参数也相同，只不过，方法体有所不同。

## 02、哪些方法可以被重写？

### **规则一：只能重写继承过来的方法**。

因为重写是在子类重新实现从父类继承过来的方法时发生的，所以只能重写继承过来的方法，这很好理解。这就意味着，只能重写那些被 public、protected 或者 default 修饰的方法，private 修饰的方法无法被重写。

Animal 类有 `move()`、`eat()` 和 `sleep()` 三个方法：

```java
public class Animal {
    public void move() { }

    protected void eat() { }
    
    void sleep(){ }
}
```

Dog 类来重写这三个方法：

```java
public class Dog extends Animal {
    public void move() { }

    protected void eat() { }

    void sleep(){ }
}
```

 OK，完全没有问题。但如果父类中的方法是 private 的，就行不通了。

```java
public class Animal {
    private void move() { }
}
```

此时，Dog 类中的 `move()` 方法就不再是一个重写方法了，因为父类的 `move()` 方法是 private 的，对子类并不可见。

```java
public class Dog extends Animal {
    public void move() { }
}
```

## 03、哪些方法不能被重写？

### **规则二：final、static 的方法不能被重写**。

一个方法是 final 的就意味着它无法被子类继承到，所以就没办法重写。

```java
public class Animal {
    final void move() { }
}
```

由于父类 Animal 中的 `move()` 是 final 的，所以子类在尝试重写该方法的时候就出现编译错误了！

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/basic-extra-meal/Overriding-2.png)

同样的，如果一个方法是 static 的，也不允许重写，因为静态方法可用于父类以及子类的所有实例。

```java
public class Animal {
    final void move() { }
}
```

重写的目的在于根据对象的类型不同而表现出多态，而静态方法不需要创建对象就可以使用。没有了对象，重写所需要的“对象的类型”也就没有存在的意义了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/basic-extra-meal/Overriding-3.png)

## 04、重写方法的要求

### **规则三：重写的方法必须有相同的参数列表**。

```java
public class Animal {
    void eat(String food) { }
}
```

Dog 类中的 `eat()` 方法保持了父类方法 `eat()` 的同一个调调，都有一个参数——String 类型的 food。

```java
public class Dog extends Animal {
    public void eat(String food) { }
}
```

一旦子类没有按照这个规则来，比如说增加了一个参数：

```java
public class Dog extends Animal {
    public void eat(String food, int amount) { }
}
```

这就不再是重写的范畴了，当然也不是重载的范畴，因为重载考虑的是同一个类。

**规则四：重写的方法必须返回相同的类型**。

父类没有返回类型：

```java
public class Animal {
    void eat(String food) { }
}
```

子类尝试返回 String：

```java
public class Dog extends Animal {
    public String eat(String food) {
        return null;
    }
}
```

于是就编译出错了（返回类型不兼容）。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/basic-extra-meal/Overriding-4.png)

### **规则五：重写的方法不能使用限制等级更严格的权限修饰符**。

可以这样来理解：

- 如果被重写的方法是 default，那么重写的方法可以是 default、protected 或者 public。
- 如果被重写的方法是 protected，那么重写的方法只能是 protected 或者 public。
- 如果被重写的方法是 public， 那么重写的方法就只能是 public。

举个例子，父类中的方法是 protected：

```java
public class Animal {
    protected void eat() { }
}
```

子类中的方法可以是 public：

```java
public class Dog extends Animal {
    public void eat() { }
}
```

如果子类中的方法用了更严格的权限修饰符，编译器就报错了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/basic-extra-meal/Overriding-5.png)

### **规则六：重写后的方法不能抛出比父类中更高级别的异常**。

举例来说，如果父类中的方法抛出的是 IOException，那么子类中重写的方法不能抛出 Exception，可以是 IOException 的子类或者不抛出任何异常。这条规则只适用于可检查的异常。

可检查（checked）异常必须在源代码中显式地进行捕获处理，不检查（unchecked）异常就是所谓的运行时异常，比如说 NullPointerException、ArrayIndexOutOfBoundsException 之类的，不会在编译器强制要求。

父类抛出 IOException：

```java
public class Animal {
    protected void eat() throws IOException { }
}
```

子类抛出 FileNotFoundException 是可以满足重写的规则的，因为 FileNotFoundException 是 IOException 的子类。

```java
public class Dog extends Animal {
   public void eat() throws FileNotFoundException { }
}
```

如果子类抛出了一个新的异常，并且是一个 checked 异常：

```java
public class Dog extends Animal {
   public void eat() throws FileNotFoundException, InterruptedException { }
}
```

那编译器就会提示错误：

```
Error:(9, 16) java: com.itwanger.overriding.Dog中的eat()无法覆盖com.itwanger.overriding.Animal中的eat()
  被覆盖的方法未抛出java.lang.InterruptedException
```

但如果子类抛出的是一个 unchecked 异常，那就没有冲突：

```java
public class Dog extends Animal {
   public void eat() throws FileNotFoundException, IllegalArgumentException { }
}
```

如果子类抛出的是一个更高级别的异常：

```java
public class Dog extends Animal {
   public void eat() throws Exception { }
}
```

编译器同样会提示错误，因为 Exception 是 IOException 的父类。

```
Error:(9, 16) java: com.itwanger.overriding.Dog中的eat()无法覆盖com.itwanger.overriding.Animal中的eat()
  被覆盖的方法未抛出java.lang.Exception
```

## 05、如何调用被重写的方法？

### **规则七：可以在子类中通过 super 关键字来调用父类中被重写的方法**。

子类继承父类的方法而不是重新实现是很常见的一种做法，在这种情况下，可以按照下面的形式调用父类的方法：

```java
super.overriddenMethodName();
```

来看例子。

```java
public class Animal {
    protected void eat() { }
}
```

子类重写了 `eat()` 方法，然后在子类的 `eat()` 方法中，可以在方法体的第一行通过 `super.eat()` 调用父类的方法，然后再增加属于自己的代码。

```java
public class Dog extends Animal {
   public void eat() {
       super.eat();
       // Dog-eat
   }
}
```

## 06、重写和构造方法

### **规则八：构造方法不能被重写**。

因为构造方法很特殊，而且子类的构造方法不能和父类的构造方法同名（类名不同），所以构造方法和重写之间没有任何关系。

## 07、重写和抽象方法

### **规则九：如果一个类继承了抽象类，抽象类中的抽象方法必须在子类中被重写**。

先来看这样一个接口类：

```java
public interface Animal {
    void move();
}
```

接口中的方法默认都是抽象方法，通过反编译是可以看得到的：

```java
public interface Animal
{
    public abstract void move();
}
```

如果一个抽象类实现了 Animal 接口，`move()` 方法不是必须被重写的：

```java
public abstract class AbstractDog implements Animal {
    protected abstract void bark();
}
```

但如果一个类继承了抽象类 AbstractDog，那么 Animal 接口中的 `move()` 方法和抽象类 AbstractDog 中的抽象方法 `bark()` 都必须被重写：

```java
public class BullDog extends AbstractDog {
 
    public void move() {}
 
    protected void bark() {}
}
```

## 08、重写和 synchronized 方法

### **规则十：synchronized 关键字对重写规则没有任何影响**。

synchronized 关键字用于在多线程环境中获取和释放监听对象，因此它对重写规则没有任何影响，这就意味着 synchronized 方法可以去重写一个非同步方法。

## 09、重写和 strictfp 方法

### **规则十一：strictfp 关键字对重写规则没有任何影响**。

如果你想让浮点运算更加精确，而且不会因为硬件平台的不同导致执行的结果不一致的话，可以在方法上添加 strictfp 关键字。因此 strictfp 关键和重写规则无关。

----

GitHub 上标星 7600+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 7600+ 的 Java 教程](https://tobebetterjavaer.com/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
