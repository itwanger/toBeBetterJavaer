---
title: 方法重写 Override 和方法重载 Overload 有什么区别？
shortTitle: Java方法重写和方法重载
description: 本文深入剖析了Java编程中的方法重写Override和方法重载Overload，探讨了它们的概念、区别以及在实际应用中的用途。通过详细的示例和解释，帮助读者更好地理解和掌握Java面向对象编程中的方法重载与重写技巧。
category:
  - Java 核心
tag:
  - 面向对象编程
head:
  - - meta
    - name: keywords
      content: Java,方法重写,方法重载,Override,Overload,java 方法重载 方法重写,java Override Overload,java 方法重载,java 方法重写
---

# 5.19 Java方法重写和方法重载

入冬的夜，总是来得特别的早。我静静地站在阳台，目光所及之处，不过是若隐若现的钢筋混凝土，还有那毫无情调的灯光。

“哥，别站在那发呆了。今天学啥啊，七点半我就要回学校了，留给你的时间不多了，你要抓紧哦。”三妹傲娇的声音一下子把我从游离的状态拉回到了现实。

“今天要学习 Java 中的方法重载与方法重写。”我迅速地走到电脑前面，打开一份 Excel 文档，看了一下《教妹学 Java（二哥的 Java 进阶之路前身）》的进度，然后对三妹说。

“如果一个类有多个名字相同但参数个数不同的方法，我们通常称这些方法为方法重载。 ”我面带着朴实无华的微笑继续说，“如果方法的功能是一样的，但参数不同，使用相同的名字可以提高程序的可读性。”

“如果子类具有和父类一样的方法（参数相同、返回类型相同、方法名相同，但方法体可能不同），我们称之为方法重写。 方法重写用于提供父类已经声明的方法的特殊实现，是实现多态的基础条件。”

“只不过，方法重载与方法重写在名字上很相似，就像是兄弟俩，导致初学者经常把它们俩搞混。”

“方法重载的英文名叫 Overloading，方法重写的英文名叫 Overriding，因此，不仅中文名很相近，英文名之间也很相近，这就更容易让初学者搞混了。”

“但两者其实是完全不同的！通过下面这张图，你就能看得一清二楚。”

话音刚落，我就在 IDEA 中噼里啪啦地敲了起来。两段代码，分别是方法重写和方法重载。然后，把这两段代码截图到 draw.io（一个很漂亮的在线画图网站）上，加了一些文字说明。最后，打开 Photoscape X，把两张图片合并到了一起。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/core-points/21-01.png)

### 01、方法重载

“三妹，你仔细听哦。”我缓了一口气后继续说道。

“在 Java 中，有两种方式可以达到方法重载的目的。”

“第一，改变参数的数目。来看下面这段代码。”

```java
public class OverloadingByParamNum {
    public static void main(String[] args) {
        System.out.println(Adder.add(10, 19));
        System.out.println(Adder.add(10, 19, 20));
    }
}

class Adder {
    static int add(int a, int b) {
        return a + b;
    }

    static int add(int a, int b, int c) {
        return a + b + c;
    }
}  
```

“Adder 类有两个方法，第一个 `add()` 方法有两个参数，在调用的时候可以传递两个参数；第二个 `add()` 方法有三个参数，在调用的时候可以传递三个参数。”

“二哥，这样的代码不会显得啰嗦吗？如果有四个参数的时候就再追加一个方法？”三妹突然提了一个很尖锐的问题。

“那倒是，这个例子只是为了说明方法重载的一种类型。如果参数类型相同的话，Java 提供了可变参数的方式，就像下面这样。”

```java
static int add(int ... args) {
    int sum = 0;
    for ( int a: args) {
        sum += a;
    }
    return sum;
}
```

“第二，通过改变参数类型，也可以达到方法重载的目的。来看下面这段代码。”

```java
public class OverloadingByParamType {
    public static void main(String[] args) {
        System.out.println(Adder.add(10, 19));
        System.out.println(Adder.add(10.1, 19.2));
    }
}

class Adder {
    static int add(int a, int b) {
        return a + b;
    }

    static double add(double a, double b) {
        return a + b;
    }
}
```

“Adder 类有两个方法，第一个 `add()` 方法的参数类型为 int，第二个 `add()` 方法的参数类型为 double。”

“二哥，改变参数的数目和类型都可以实现方法重载，为什么改变方法的返回值类型就不可以呢？”三妹很能抓住问题的重点嘛。

“因为仅仅改变返回值类型的话，会把编译器搞懵逼的。”我略带调皮的口吻回答她。

“编译时报错优于运行时报错，所以当两个方法的名字相同，参数个数和类型也相同的时候，虽然返回值类型不同，但依然会提示方法已经被定义的错误。”

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/core-points/21-02.png)

“你想啊，三妹。我们在调用一个方法的时候，可以指定返回值类型，也可以不指定。当不指定的时候，直接指定 `add(1, 2)` 的时候，编译器就不知道该调用返回 int 的 `add()` 方法还是返回 double 的 `add()` 方法，产生了歧义。”

“方法的返回值只是作为方法运行后的一个状态，它是保持方法的调用者和被调用者进行通信的一个纽带，但并不能作为某个方法的‘标识’。”

“二哥，我想到了一个点，`main()` 方法可以重载吗？”

“三妹，这是个好问题啊！答案是肯定的，毕竟 `main()` 方法也是个方法，只不过，Java 虚拟机在运行的时候只会调用带有 String 数组的那个 `main()` 方法。”

```java
public class OverloadingMain {
    public static void main(String[] args) {
        System.out.println("String[] args");
    }

    public static void main(String args) {
        System.out.println("String args");
    }

    public static void main() {
        System.out.println("无参");
    }
}
```

“第一个 `main()` 方法的参数形式为 `String[] args`，是最标准的写法；第二个 `main()` 方法的参数形式为 `String args`，少了中括号；第三个 `main()` 方法没有参数。”

“来看一下程序的输出结果。”

```
String[] args
```

“从结果中，我们可以看得出，尽管 `main()` 方法可以重载，但程序只认标准写法。”

“由于可以通过改变参数类型的方式实现方法重载，那么当传递的参数没有找到匹配的方法时，就会发生隐式的类型转换。”

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/basic-extra-meal/override-overload-0d30f41f-1f53-4988-b506-731d79ed16d1.png)

“如上图所示，byte 可以向上转换为 short、int、long、float 和 double，short 可以向上转换为 int、long、float 和 double，char 可以向上转换为 int、long、float 和 double，依次类推。”

“三妹，来看下面这个示例。”

```java
public class OverloadingTypePromotion {
    void sum(int a, long b) {
        System.out.println(a + b);
    }

    void sum(int a, int b, int c) {
        System.out.println(a + b + c);
    }

    public static void main(String args[]) {
        OverloadingTypePromotion obj = new OverloadingTypePromotion();
        obj.sum(20, 20);
        obj.sum(20, 20, 20);
    }
}
```

“执行 `obj.sum(20, 20)` 的时候，发现没有 `sum(int a, int b)` 的方法，所以此时第二个 20 向上转型为 long，所以调用的是 `sum(int a, long b)` 的方法。”

“再来看一个示例。”

```java
public class OverloadingTypePromotion1 {
    void sum(int a, int b) {
        System.out.println("int");
    }

    void sum(long a, long b) {
        System.out.println("long");
    }

    public static void main(String args[]) {
        OverloadingTypePromotion1 obj = new OverloadingTypePromotion1();
        obj.sum(20, 20);
    }
}
```

“执行 `obj.sum(20, 20)` 的时候，发现有 `sum(int a, int b)` 的方法，所以就不会向上转型为 long，调用 `sum(long a, long b)`。”

“来看一下程序的输出结果。”

```
int
```

“继续来看示例。”

```java
public class OverloadingTypePromotion2 {
    void sum(long a, int b) {
        System.out.println("long int");
    }

    void sum(int a, long b) {
        System.out.println("int long");
    }

    public static void main(String args[]) {
        OverloadingTypePromotion2 obj = new OverloadingTypePromotion2();
        obj.sum(20, 20);
    }
}
```

“二哥，我又想到一个问题。当有两个方法 `sum(long a, int b)` 和 `sum(int a, long b)`，参数个数相同，参数类型相同，只不过位置不同的时候，会发生什么呢？”

“当通过 `obj.sum(20, 20)` 来调用 sum 方法的时候，编译器会提示错误。”
![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/core-points/21-04.png)

“不明确，编译器会很为难，究竟是把第一个 20 从 int 转成 long 呢，还是把第二个 20 从 int 转成 long，智障了！所以，不能写这样让编译器左右为难的代码。”

### 02、方法重写

“三妹，累吗？我们稍微休息一下吧。”我把眼镜摘下来，放到桌子上，闭上了眼睛，开始胡思乱想起来。

2000 年，周杰伦横空出世，让青黄不接的唱片行业为之一振，由此开启了新一代天王争霸的黄金时代。2020 年，杰伦胖了，也贪玩了，一年出一张单曲都变得可遇不可求。

20 年前，程序员很稀有；20 年后，程序员内卷了。时间永远不会停下脚步，明年会不会好起来呢？

“哥，醒醒，你就说休息一会，没说睡着啊。赶紧，我还有半个小时就要走了。”

我戴上眼镜，对三妹继续说道：“在 Java 中，方法重写需要满足以下三个规则。”

- 重写的方法必须和父类中的方法有着相同的名字；
- 重写的方法必须和父类中的方法有着相同的参数；
- 必须是 is-a 的关系（继承关系）。

“来看下面这段代码。”

```java
public class Bike extends Vehicle {
    public static void main(String[] args) {
        Bike bike = new Bike();
        bike.run();
    }
}

class Vehicle {
    void run() {
        System.out.println("车辆在跑");
    }
}
```

“来看一下程序的输出结果。”

```
车辆在跑
```

“Bike is-a Vehicle，自行车是一种车，没错。Vehicle 类有一个 `run()` 的方法，也就是说车辆可以跑，Bike 继承了 Vehicle，也可以跑。但如果 Bike 没有重写 `run()` 方法的话，自行车就只能是‘车辆在跑’，而不是‘自行车在跑’，对吧？”

“如果有了方法重写，一切就好办了。”

```java
public class Bike extends Vehicle {
    @Override
    void run() {
        System.out.println("自行车在跑");
    }

    public static void main(String[] args) {
        Bike bike = new Bike();
        bike.run();
    }
}

class Vehicle {
    void run() {
        System.out.println("车辆在跑");
    }
}
```

我把鼠标移动到 Bike 类的 `run()` 方法，对三妹说：“你看，在方法重写的时候，IDEA 会建议使用 `@Override` 注解，显式的表示这是一个重写后的方法，尽管可以缺省。”

“来看一下程序的输出结果。”

```
自行车在跑
```

“Bike 重写了 `run()` 方法，也就意味着，Bike 可以跑出自己的风格。”

好，接下来说一下重写时应当遵守的 12 条规则，应当谨记哦。

#### **规则一：只能重写继承过来的方法**。

因为重写是在子类重新实现从父类[继承](https://tobebetterjavaer.com/oo/extends-bigsai.html)过来的方法时发生的，所以只能重写继承过来的方法，这很好理解。这就意味着，只能重写那些被 public、protected 或者 default 修饰的方法，private 修饰的方法无法被重写。

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

#### **规则二：final、static 的方法不能被重写**。

一个方法是 [final](https://tobebetterjavaer.com/oo/final.html) 的就意味着它无法被子类继承到，所以就没办法重写。

```java
public class Animal {
    final void move() { }
}
```

由于父类 Animal 中的 `move()` 是 final 的，所以子类在尝试重写该方法的时候就出现编译错误了！

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/basic-extra-meal/Overriding-2.png)

同样的，如果一个方法是 [static](https://tobebetterjavaer.com/oo/static.html) 的，也不允许重写，因为静态方法可用于父类以及子类的所有实例。

```java
public class Animal {
    final void move() { }
}
```

重写的目的在于根据对象的类型不同而表现出多态，而静态方法不需要创建对象就可以使用。没有了对象，重写所需要的“对象的类型”也就没有存在的意义了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/basic-extra-meal/Overriding-3.png)

#### **规则三：重写的方法必须有相同的参数列表**。

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

#### **规则五：重写的方法不能使用限制等级更严格的权限修饰符**。

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

#### **规则六：重写后的方法不能抛出比父类中更高级别的异常**。

举例来说，如果父类中的方法抛出的是 IOException，那么子类中重写的方法不能抛出 Exception，可以是 IOException 的子类或者不抛出任何[异常](https://tobebetterjavaer.com/exception/gailan.html)。这条规则只适用于可检查的异常。

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

#### **规则七：可以在子类中通过 super 关键字来调用父类中被重写的方法**。

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

#### **规则八：构造方法不能被重写**。

因为[构造方法](https://tobebetterjavaer.com/oo/construct.html)很特殊，而且子类的构造方法不能和父类的构造方法同名（类名不同），所以构造方法和重写之间没有任何关系。

#### **规则九：如果一个类继承了抽象类，抽象类中的抽象方法必须在子类中被重写**。

先来看这样一个接口：

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

#### **规则十：synchronized 关键字对重写规则没有任何影响**。

[synchronized 关键字](https://tobebetterjavaer.com/thread/synchronized-1.html)用于在多线程环境中获取和释放监听对象，因此它对重写规则没有任何影响，这就意味着 synchronized 方法可以去重写一个非同步方法。

#### **规则十一：strictfp 关键字对重写规则没有任何影响**。

如果你想让浮点运算更加精确，而且不会因为硬件平台的不同导致执行的结果不一致的话，可以在方法上添加 [strictfp 关键字，之前讲过](https://tobebetterjavaer.com/basic-extra-meal/48-keywords.html)。因此 strictfp 关键字和重写规则无关。

### 03、总结

“好了，三妹，我来简单做个总结。”我瞥了一眼电脑右上角的时钟，离三妹离开的时间不到 10 分钟了。

“首先来说一下方法重载时的注意事项，‘两同一不同’。”

“‘两同’：在同一个类，方法名相同。”

“‘一不同’：参数不同。”

“再来说一下方法重写时的注意事项，‘两同一小一大’。”

“‘两同’：方法名相同，参数相同。”

“‘一小’：子类方法声明的异常类型要比父类小一些或者相等。”

“‘一大’：子类方法的访问权限应该比父类的更大或者相等。”

“记住了吧？三妹。带上口罩，拿好手机，咱准备出门吧。”今天限号，没法开车送三妹去学校了。


----

GitHub 上标星 7600+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 7600+ 的 Java 教程](https://tobebetterjavaer.com/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)