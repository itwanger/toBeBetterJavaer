---
title: Java 方法重写 Override 和方法重载 Overload 的区别，一下子就明白了
shortTitle: Java 方法重写和方法重载的区别
description: Java程序员进阶之路，小白的零基础Java教程，Java 中方法重写 Override 和方法重载 Overload 的区别
category:
  - Java 核心
tag:
  - 面向对象编程
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,方法重写,方法重载,Override,Overload
---

## 01、开篇

入冬的夜，总是来得特别的早。我静静地站在阳台，目光所及之处，不过是若隐若现的钢筋混凝土，还有那毫无情调的灯光。

“哥，别站在那发呆了。今天学啥啊，七点半我就要回学校了，留给你的时间不多了，你要抓紧哦。”三妹傲娇的声音一下子把我从游离的状态拉回到了现实。

“今天要学习 Java 中的方法重载与方法重写。”我迅速地走到电脑前面，打开一份 Excel 文档，看了一下《教妹学 Java》的进度，然后对三妹说。

“如果一个类有多个名字相同但参数个数不同的方法，我们通常称这些方法为方法重载。 ”我面带着朴实无华的微笑继续说，“如果方法的功能是一样的，但参数不同，使用相同的名字可以提高程序的可读性。”

“如果子类具有和父类一样的方法（参数相同、返回类型相同、方法名相同，但方法体可能不同），我们称之为方法重写。 方法重写用于提供父类已经声明的方法的特殊实现，是实现多态的基础条件。”

“只不过，方法重载与方法重写在名字上很相似，就像是兄弟俩，导致初学者经常把它们俩搞混。”

“方法重载的英文名叫 Overloading，方法重写的英文名叫 Overriding，因此，不仅中文名很相近，英文名之间也很相近，这就更容易让初学者搞混了。”

“但两者其实是完全不同的！通过下面这张图，你就能看得一清二楚。”

话音刚落，我就在 IDEA 中噼里啪啦地敲了起来。两段代码，分别是方法重写和方法重载。然后，把这两段代码截图到 draw.io（一个很漂亮的在线画图网站）上，加了一些文字说明。最后，打开 Photoscape X，把两张图片合并到了一起。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/core-points/21-01.png)

## 02、方法重载

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

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/core-points/21-03.png)

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

## 03、方法重写

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

## 04、总结

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

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)