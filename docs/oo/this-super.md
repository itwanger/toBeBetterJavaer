---
title: 详解Java this与super关键字的用法与区别
shortTitle: Java this和super关键字
description: 本文详细介绍了Java中的this和super关键字，包括它们的概念、作用以及如何在实际编程中使用。通过对比分析this和super关键字的区别，本文旨在帮助读者深入理解Java面向对象编程中的相关概念，提升编程技能。
category:
  - Java 核心
tag:
  - 面向对象编程
head:
  - - meta
    - name: keywords
      content: Java,this,super,java this super,java this,java super,this super,this关键字, super关键字
---

# 5.14 Java this和super关键字

“哥，被喊大舅子的感觉怎么样啊？”三妹不怀好意地对我说，她眼睛里充满着不屑。

“说实话，这种感觉还不错。”我有点难为情的回答她，“不过，有一点令我感到些许失落。大家的焦点似乎都是你的颜值，完全忽略了我的盛世美颜啊！”

“哥，你想啥呢，那是因为你文章写得好，不然谁认识我是谁啊！有你这样的哥哥，我还是挺自豪的。”三妹郑重其事地说，“话说今天咱学啥呢？”

“三妹啊，你这句话说得我喜欢。今天来学习一下 Java 中的 this 关键字吧。”喝了一口农夫山泉后，我对三妹说。

“this 关键字有很多种用法，其中最常用的一个是，它可以作为引用变量，指向当前对象。”我面带着朴实无华的微笑继续说，“除此之外， this 关键字还可以完成以下工作。”

- 调用当前类的方法；
- `this()` 可以调用当前类的构造方法；
- this 可以作为参数在方法中传递；
- this 可以作为参数在构造方法中传递；
- this 可以作为方法的返回值，返回当前类的对象。

### 01、 指向当前对象

“三妹，来看下面这段代码。”话音刚落，我就在键盘上噼里啪啦一阵敲。

```java
public class WithoutThisStudent {
    String name;
    int age;

    WithoutThisStudent(String name, int age) {
        name = name;
        age = age;
    }

    void out() {
        System.out.println(name+" " + age);
    }

    public static void main(String[] args) {
        WithoutThisStudent s1 = new WithoutThisStudent("沉默王二", 18);
        WithoutThisStudent s2 = new WithoutThisStudent("沉默王三", 16);

        s1.out();
        s2.out();
    }
}
```

“在上面的例子中，构造方法的参数名和实例变量名相同，由于没有使用 this 关键字，所以无法为实例变量赋值。”我抬起右手的食指，指着屏幕上的 name 和 age 对着三妹说。

“来看一下程序的输出结果。”

```
null 0
null 0
```

“从结果中可以看得出来，尽管创建对象的时候传递了参数，但实例变量并没有赋值。这是因为如果构造方法中没有使用 this 关键字的话，name 和 age 指向的并不是实例变量而是参数本身。”我把脖子扭向右侧，看着三妹说。

“那怎么解决这个问题呢？哥。”三妹着急地问。

“如果参数名和实例变量名产生了冲突.....”我正准备给出答案，三妹打断了我。

“难道用 this 吗？”三妹脱口而出。

“哇，越来越棒了呀，你。”我感觉三妹在学习 Java 这条道路上逐渐有了自己主动思考的意愿。

“是的，来看加上 this 关键字后的代码。”

安静的屋子里又响起了一阵噼里啪啦的键盘声。

```java
public class WithThisStudent {
    String name;
    int age;

    WithThisStudent(String name, int age) {
        this.name = name;
        this.age = age;
    }

    void out() {
        System.out.println(name+" " + age);
    }

    public static void main(String[] args) {
        WithThisStudent s1 = new WithThisStudent("沉默王二", 18);
        WithThisStudent s2 = new WithThisStudent("沉默王三", 16);

        s1.out();
        s2.out();
    }
}
```

“再来看一下程序的输出结果。”

```
沉默王二 18
沉默王三 16
```

“这次，实例变量有值了，在构造方法中，`this.xxx` 指向的就是实例变量，而不再是参数本身了。”我慢吞吞地说着，“当然了，如果参数名和实例变量名不同的话，就不必使用 this 关键字，但我建议使用 this 关键字，这样的代码更有意义。”

### 02、调用当前类的方法

“仔细听，三妹，看我敲键盘的速度是不是够快。”

```java
public class InvokeCurrentClassMethod {
    void method1() {}
    void method2() {
        method1();
    }

    public static void main(String[] args) {
        new InvokeCurrentClassMethod().method1();
    }
}
```

“仔细瞧，三妹，上面这段代码中没有见到 this 关键字吧？”我面带着神秘的微笑，准备给三妹变个魔术。

“确实没有，哥，我确认过了。”

“那接下来，神奇的事情就要发生了。”我突然感觉刘谦附身了。

我快速的在 classes 目录下找到 InvokeCurrentClassMethod.class 文件，然后双击打开（IDEA 默认会使用 FernFlower 打开字节码文件）。

```java
public class InvokeCurrentClassMethod {
    public InvokeCurrentClassMethod() {
    }

    void method1() {
    }

    void method2() {
        this.method1();
    }

    public static void main(String[] args) {
        (new InvokeCurrentClassMethod()).method1();
    }
}
```

“瞪大眼睛仔细瞧，三妹，`this` 关键字是不是出现了？”

“哇，真的呢，好神奇啊！”三妹为了配合我的演出，也是十二分的卖力。

“我们可以在一个类中使用 this 关键字来调用另外一个方法，如果没有使用的话，编译器会自动帮我们加上。”我对自己深厚的编程功底充满自信，“在源代码中，`method2()` 在调用 `method1()` 的时候并没有使用 this 关键字，但通过反编译后的字节码可以看得到。”

### 03、调用当前类的构造方法

“再来看下面这段代码。”

```java
public class InvokeConstrutor {
    InvokeConstrutor() {
        System.out.println("hello");
    }

    InvokeConstrutor(int count) {
        this();
        System.out.println(count);
    }

    public static void main(String[] args) {
        InvokeConstrutor invokeConstrutor = new InvokeConstrutor(10);
    }
}
```

“在有参构造方法 `InvokeConstrutor(int count)` 中，使用了 `this()` 来调用无参构造方法 `InvokeConstrutor()`。”这次，我换成了左手的食指，指着屏幕对三妹说，“`this()` 可用于调用当前类的构造方法——构造方法可以重用了。”

“来看一下输出结果。”

```
hello
10
```

“真的啊，无参构造方法也被调用了，所以程序输出了 hello。”三妹看到输出结果后不假思索地说。

“也可以在无参构造方法中使用 `this()` 并传递参数来调用有参构造方法。”话音没落，我就在键盘上敲了起来，“来看下面这段代码。”

```java
public class InvokeParamConstrutor {
    InvokeParamConstrutor() {
        this(10);
        System.out.println("hello");
    }

    InvokeParamConstrutor(int count) {
        System.out.println(count);
    }

    public static void main(String[] args) {
        InvokeParamConstrutor invokeConstrutor = new InvokeParamConstrutor();
    }
}
```

“再来看一下程序的输出结果。”

```
10
hello
```

“不过，需要注意的是，`this()` 必须放在构造方法的第一行，否则就报错了。”

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/keywords/20-01.png)

### 04、作为参数在方法中传递

“来看下面这段代码。”

```java
public class ThisAsParam {
    void method1(ThisAsParam p) {
        System.out.println(p);
    }

    void method2() {
        method1(this);
    }

    public static void main(String[] args) {
        ThisAsParam thisAsParam = new ThisAsParam();
        System.out.println(thisAsParam);
        thisAsParam.method2();
    }
}
```

“`this` 关键字可以作为参数在方法中传递，此时，它指向的是当前类的对象。”一不小心，半个小时过去了，我感到嗓子冒烟，于是赶紧又喝了一口水，润润嗓子后继续说道。

“来看一下输出结果，你就明白了，三妹。”

```
com.itwanger.twentyseven.ThisAsParam@77459877
com.itwanger.twentyseven.ThisAsParam@77459877
```

“`method2()` 调用了 `method1()`，并传递了参数 this，`method1()` 中打印了当前对象的字符串。 `main()` 方法中打印了 thisAsParam 对象的字符串。从输出结果中可以看得出来，两者是同一个对象。”

### 05、作为参数在构造方法中传递

“继续来看代码。”

```java
public class ThisAsConstrutorParam {
    int count = 10;

    ThisAsConstrutorParam() {
        Data data = new Data(this);
        data.out();
    }

    public static void main(String[] args) {
        new ThisAsConstrutorParam();
    }
}

class Data {
    ThisAsConstrutorParam param;
    Data(ThisAsConstrutorParam param) {
        this.param = param;
    }

    void out() {
        System.out.println(param.count);
    }
}
```

“在构造方法 `ThisAsConstrutorParam()` 中，我们使用 this 关键字作为参数传递给了 Data 对象，它其实指向的就是 `new ThisAsConstrutorParam()` 这个对象。”

“`this` 关键字也可以作为参数在构造方法中传递，它指向的是当前类的对象。当我们需要在多个类中使用一个对象的时候，这非常有用。”

“来看一下输出结果。”

```
10
```

### 06、作为方法的返回值

“需要休息会吗？三妹”

“没事的，哥，我的注意力还是很集中的，你继续讲吧。”

“好的，那来继续看代码。”

```java
public class ThisAsMethodResult {
    ThisAsMethodResult getThisAsMethodResult() {
        return this;
    }
    
    void out() {
        System.out.println("hello");
    }

    public static void main(String[] args) {
        new ThisAsMethodResult().getThisAsMethodResult().out();
    }
}
```

“`getThisAsMethodResult()` 方法返回了 this 关键字，指向的就是 `new ThisAsMethodResult()` 这个对象，所以可以紧接着调用 `out()` 方法——达到了链式调用的目的，这也是 this 关键字非常经典的一种用法。”

“链式调用的形式在 JavaScript 代码更加常见。”为了向三妹证实这一点，我打开了 jQuery 的源码。

“原来这么多链式调用啊！”三妹感叹到。

“是的。”我点点头，然后指着 `getThisAsMethodResult()` 方法的返回值对三妹说，“需要注意的是，`this` 关键字作为方法的返回值的时候，方法的返回类型为类的类型。”

“来看一下输出结果。”

```
hello
```

“那么，关于 this 关键字的介绍，就到此为止了。”我活动了一下僵硬的脖子后，对三妹说，“如果你学习劲头还可以的话，我们顺带把 super 关键字捎带着过一下，怎么样？”

“不用了吧，听说 super 关键字更简单，我自己看看就行了，不用你讲了！”

“不不不，三妹啊，你得假装听一下，不然我怎么向读者们交差。”

“噢噢噢噢。”三妹意味深长地笑了。

### 07、super 关键字

“super 关键字的用法主要有三种。”

- 指向父类对象；
- 调用父类的方法；
- `super()` 可以调用父类的构造方法。

“其实和 this 有些相似，只不过用意不大相同。”我端起水瓶，咕咚咕咚又喝了几大口，好渴。“每当创建一个子类对象的时候，也会隐式的创建父类对象，由 super 关键字引用。”

“如果父类和子类拥有同样名称的字段，super 关键字可以用来访问父类的同名字段。”

“来看下面这段代码。”

```java
public class ReferParentField {
    public static void main(String[] args) {
        new Dog().printColor();
    }
}

class Animal {
    String color = "白色";
}

class Dog extends Animal {
    String color = "黑色";

    void printColor() {
        System.out.println(color);
        System.out.println(super.color);
    }
}
```

“父类 Animal 中有一个名为 color 的字段，子类 Dog 中也有一个名为 color 的字段，子类的 `printColor()` 方法中，通过 super 关键字可以访问父类的 color。”

“来看一下输出结果。”

```
黑色
白色
```

“当子类和父类的方法名相同时，可以使用 super 关键字来调用父类的方法。换句话说，super 关键字可以用于方法重写时访问到父类的方法。”


```java
public class ReferParentMethod {
    public static void main(String[] args) {
        new Dog().work();
    }
}

class Animal {
    void eat() {
        System.out.println("吃...");
    }
}

class Dog extends Animal {
    @Override
    void eat() {
        System.out.println("吃...");
    }

    void bark() {
        System.out.println("汪汪汪...");
    }

    void work() {
        super.eat();
        bark();
    }
}  
```

“瞧，三妹。父类 Animal 和子类 Dog 中都有一个名为 `eat()` 的方法，通过 `super.eat()` 可以访问到父类的 `eat()` 方法。”

等三妹在自我消化的时候，我在键盘上又敲完了一串代码。

```java
public class ReferParentConstructor {
    public static void main(String[] args) {
        new Dog();
    }
}

class Animal {
    Animal(){
        System.out.println("动物来了");
    }
}

class Dog extends Animal {
    Dog() {
        super();
        System.out.println("狗狗来了");
    }
}
```

“子类 Dog 的构造方法中，第一行代码为 `super()`，它就是用来调用父类的构造方法的。”

“来看一下输出结果。”

```
动物来了
狗狗来了
```

“当然了，在默认情况下，`super()` 是可以省略的，编译器会主动去调用父类的构造方法。也就是说，子类即使不使用 `super()` 主动调用父类的构造方法，父类的构造方法仍然会先执行。”

```java
public class ReferParentConstructor {
    public static void main(String[] args) {
        new Dog();
    }
}

class Animal {
    Animal(){
        System.out.println("动物来了");
    }
}

class Dog extends Animal {
    Dog() {
        System.out.println("狗狗来了");
    }
}
```

“输出结果和之前一样。”

```
动物来了
狗狗来了
```

“`super()` 也可以用来调用父类的有参构造方法，这样可以提高代码的可重用性。”

```java
class Person {
    int id;
    String name;

    Person(int id, String name) {
        this.id = id;
        this.name = name;
    }
}

class Emp extends Person {
    float salary;

    Emp(int id, String name, float salary) {
        super(id, name);
        this.salary = salary;
    }

    void display() {
        System.out.println(id + " " + name + " " + salary);
    }
}

public class CallParentParamConstrutor {
    public static void main(String[] args) {
        new Emp(1, "沉默王二", 20000f).display();
    }
}
```

“Emp 类继承了 Person 类，也就继承了 id 和 name 字段，当在 Emp 中新增了 salary 字段后，构造方法中就可以使用 `super(id, name)` 来调用父类的有参构造方法。”

“来看一下输出结果。”

```
1 沉默王二 20000.0
```

三妹点了点头，所有所思。

----


GitHub 上标星 7600+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 7600+ 的 Java 教程](https://tobebetterjavaer.com/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)