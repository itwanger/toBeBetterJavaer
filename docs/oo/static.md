---
title: 详解 Java static 关键字的作用：静态变量、静态方法、静态代码块、静态内部类
shortTitle: Java static关键字
description: 本文详细讲解了Java中的static关键字，包括其作用、用法、使用场景以及注意事项。文章通过实例解析，帮助读者深入理解static关键字在Java编程中的重要性，提高编程水平和技巧。
category:
  - Java 核心
tag:
  - 面向对象编程
head:
  - - meta
    - name: keywords
      content: Java,static,静态变量,静态方法,静态代码块,静态内部类,java static,static关键字
---

# 5.15 Java static关键字

“哥，你牙龈肿痛轻点没？周一的《教妹学 Java》（二哥的Java进阶之路前身）你都没有更新，偷懒了呀！”三妹关心地问我。

“今天周四了，吃了三天的药，疼痛已经减轻不少，咱妈还给我打了电话，让我买点牛黄解毒片下下火。”我面带着微笑对三妹说，“学习可不能落下，今天我们来学 Java 中 `static` 关键字吧。”

“static 是 Java 中比较难以理解的一个关键字，也是各大公司的面试官最喜欢问到的一个知识点之一。”我喝了一口咖啡继续说道。

“既然是面试重点，那我可得好好学习下。”三妹连忙说。

“static 关键字的作用可以用一句话来描述：‘**方便在没有创建对象的情况下进行调用**，包括变量和方法’。也就是说，只要类被加载了，就可以通过类名进行访问。”我扶了扶沉重眼镜，继续说到，“static 可以用来修饰类的成员变量，以及成员方法。我们一个个来看。”

### 01、静态变量

“如果在声明变量的时候使用了 static 关键字，那么这个变量就被称为静态变量。静态变量只在类加载的时候获取一次内存空间，这使得静态变量很节省内存空间。”家里的暖气有点足，我跑去开了一点窗户后继续说道。

“来考虑这样一个 Student 类。”话音刚落，我就在键盘上噼里啪啦一阵敲。

```java
public class Student {
    String name;
    int age;
    String school = "郑州大学";
}
```

这段代码敲完后，我对三妹说：“假设郑州大学录取了一万名新生，那么在创建一万个 Student 对象的时候，所有的字段（name、age 和 school）都会获取到一块内存。学生的姓名和年纪不尽相同，但都属于郑州大学，如果每创建一个对象，school 这个字段都要占用一块内存的话，就很浪费，对吧？三妹。”

“因此，最好将 school 这个字段设置为 static，这样就只会占用一块内存，而不是一万块。”

安静的房子里又响起了一阵噼里啪啦的键盘声。

```java
public class Student {
    String name;
    int age;
    static String school = "郑州大学";

    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public static void main(String[] args) {
        Student s1 = new Student("沉默王二", 18);
        Student s2 = new Student("沉默王三", 16);
    }
}
```

“瞧，三妹。s1 和 s2 这两个引用变量存放在栈区（stack），沉默王二+18 这个对象和沉默王三+16 这个对象存放在堆区（heap），school 这个静态变量存放在静态区。”

“等等，哥，栈、堆、静态区？”三妹的脸上塞满了疑惑。

“哦哦，别担心，三妹，画幅图你就全明白了。”说完我就打开 draw.io 这个网址，认真地画起了图。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/keywords/19-01.png)

“现在，是不是一下子就明白了？”看着这幅漂亮的手绘图，我心里有点小开心。

“哇，哥，惊艳了呀！”三妹也不忘拍马屁，给我了一个大大的赞。

“好了，三妹，我们来看下面这串代码。”

```java
public class Counter {
    int count = 0;

    Counter() {
        count++;
        System.out.println(count);
    }

    public static void main(String args[]) {
        Counter c1 = new Counter();
        Counter c2 = new Counter();
        Counter c3 = new Counter();
    }
}
```

“我们创建一个成员变量 count，并且在构造函数中让它自增。因为成员变量会在创建对象的时候获取内存，因此每一个对象都会有一个 count 的副本， count 的值并不会随着对象的增多而递增。”

我在侃侃而谈，而三妹似乎有些不太明白。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/keywords/19-02.png)


“没关系，三妹，你先盲猜一下，这段代码输出的结果是什么？”

“按照你的逻辑，应该输出三个 1？是这样吗？”三妹眨眨眼，有点不太自信地回答。

“哎呀，不错哟。”

我在 IDEA 中点了一下运行按钮，程序跑了起来。

```
1
1
1
```

“每创建一个 Counter 对象，count 的值就从 0 自增到 1。三妹，想一下，如果 count 是静态的呢？”

“我不知道啊。”

“嗯，来看下面这段代码。”

```java
public class StaticCounter {
    static int count = 0;

    StaticCounter() {
        count++;
        System.out.println(count);
    }

    public static void main(String args[]) {
        StaticCounter c1 = new StaticCounter();
        StaticCounter c2 = new StaticCounter();
        StaticCounter c3 = new StaticCounter();
    }
}
```

“来看一下输出结果。”

```
1
2
3
```

“简单解释一下哈，由于静态变量只会获取一次内存空间，所以任何对象对它的修改都会得到保留，所以每创建一个对象，count 的值就会加 1，所以最终的结果是 3，明白了吧？三妹。这就是静态变量和成员变量之间的差别。”

“另外，需要注意的是，由于静态变量属于一个类，所以不要通过对象引用来访问，而应该直接通过类名来访问，否则编译器会发出警告。”

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/keywords/19-03.png)


### 02、静态方法

“说完静态变量，我们来说静态方法。”说完，我准备点一支华子来抽，三妹阻止了我，她指一指烟盒上的「吸烟有害身体健康」，我笑了。

“好吧。”我只好喝了一口咖啡继续说，“如果方法上加了 static 关键字，那么它就是一个静态方法。”

“静态方法有以下这些特征。”

- 静态方法属于这个类而不是这个类的对象；
- 调用静态方法的时候不需要创建这个类的对象；
- 静态方法可以访问静态变量。

“来，继续上代码”

```java
public class StaticMethodStudent {
    String name;
    int age;
    static String school = "郑州大学";

    public StaticMethodStudent(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    static void change() {
        school = "河南大学";
    }
    
    void out() {
        System.out.println(name + " " + age + " " + school);
    }

    public static void main(String[] args) {
        StaticMethodStudent.change();
        
        StaticMethodStudent s1 = new StaticMethodStudent("沉默王二", 18);
        StaticMethodStudent s2 = new StaticMethodStudent("沉默王三", 16);
        
        s1.out();
        s2.out();
    }
}
```

“仔细听，三妹。`change()` 方法就是一个静态方法，所以它可以直接访问静态变量 school，把它的值更改为河南大学；并且，可以通过类名直接调用 `change()` 方法，就像 ` StaticMethodStudent.change()` 这样。”

“来看一下程序的输出结果吧。”

```
沉默王二 18 河南大学
沉默王三 16 河南大学
```

“需要注意的是，静态方法不能访问非静态变量和调用非静态方法。你看，三妹，我稍微改动一下代码，编译器就会报错。”

“先是在静态方法中访问非静态变量，编译器不允许。”

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/keywords/19-04.png)

“然后在静态方法中访问非静态方法，编译器同样不允许。”

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/keywords/19-05.png)

“关于静态方法的使用，这下清楚了吧，三妹？”

看着三妹点点头，我欣慰地笑了。

“哥，我想到了一个问题，为什么 main 方法是静态的啊？”没想到，三妹串联知识点的功力还是不错的。

“如果 main 方法不是静态的，就意味着 Java 虚拟机在执行的时候需要先创建一个对象才能调用 main 方法，而 main 方法作为程序的入口，创建一个额外的对象显得非常多余。”我不假思索的回答令三妹感到非常的钦佩。

“java.lang.Math 类的几乎所有方法都是静态的，可以直接通过类名来调用，不需要创建类的对象。”

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/keywords/19-06.png)

### 03、静态代码块

“三妹，站起来活动一下，我的脖子都有点僵硬了。”

我们一起走到窗户边，映入眼帘的是从天而降的雪花。三妹和我都高兴坏了，迫不及待地打开窗口，伸出手去触摸雪花的温度，那种稍纵即逝的冰凉，真的舒服极了。

“北国风光，千里冰封，万里雪飘。望长城内外，惟余莽莽；大河上下，顿失滔滔。山舞银蛇，原驰蜡象，欲与天公试比高。须晴日，看红装素裹，分外妖娆。。。。。。”三妹竟然情不自禁地朗诵起了《沁园春·雪》。

确实令人欣喜，这是 2020 年洛阳的第一场雪，的确令人感到开心。

片刻之后。

“除了静态变量和静态方法，static 关键字还有一个重要的作用。”我心情愉悦地对三妹说，“用一个 static 关键字，外加一个大括号括起来的代码被称为静态代码块。”

“就像下面这串代码。”

```java
public class StaticBlock {
    static {
        System.out.println("静态代码块");
    }

    public static void main(String[] args) {
        System.out.println("main 方法");
    }
}
```

“静态代码块通常用来初始化一些静态变量，它会优先于 `main()` 方法执行。”


“来看一下程序的输出结果吧。”

```
静态代码块
main 方法
```

“二哥，既然静态代码块先于 `main()` 方法执行，那没有 `main()` 方法的 Java 类能执行成功吗？”三妹的脑回路越来越令我敬佩了。

“Java 1.6 是可以的，但 Java 7 开始就无法执行了。”我胸有成竹地回答到。

```java
public class StaticBlockNoMain {
    static {
        System.out.println("静态代码块，没有 main");
    }
}
```

“在命令行中执行 `java StaticBlockNoMain` 的时候，会抛出 NoClassDefFoundError 的错误。”

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/keywords/19-07.png)

“三妹，来看下面这个例子。”

```java
public class StaticBlockDemo {
    public static List<String> writes = new ArrayList<>();

    static {
        writes.add("沉默王二");
        writes.add("沉默王三");
        writes.add("沉默王四");

        System.out.println("第一块");
    }

    static {
        writes.add("沉默王五");
        writes.add("沉默王六");

        System.out.println("第二块");
    }
}
```

“writes 是一个静态的 ArrayList，所以不太可能在声明的时候完成初始化，因此需要在静态代码块中完成初始化。”

“静态代码块在初始集合的时候，真的非常有用。在实际的项目开发中，通常使用静态代码块来加载配置文件到内存当中。”

### 04、静态内部类

“三妹啊，除了以上只写，static 还有一个不太常用的功能——静态内部类。”

“Java 允许我们在一个类中声明一个内部类，它提供了一种令人信服的方式，允许我们只在一个地方使用一些变量，使代码更具有条理性和可读性。”

“常见的内部类有四种，成员内部类、局部内部类、匿名内部类和静态内部类，限于篇幅原因，前三种不在我们本次的讨论范围之内，以后有机会再细说。”

“来看下面这个例子。”三妹有点走神，我敲了敲她的脑袋后继续说。

```java
public class Singleton {
    private Singleton() {}

    private static class SingletonHolder {
        public static final Singleton instance = new Singleton();
    }

    public static Singleton getInstance() {
        return SingletonHolder.instance;
    }
}
```

“三妹，打起精神，马上就结束了。”

“哦哦，这段代码看起来很别致啊，哥。”

“是的，三妹，这段代码在以后创建单例的时候还会见到。”

“第一次加载 Singleton 类时并不会初始化 instance，只有第一次调用 `getInstance()` 方法时 Java 虚拟机才开始加载 SingletonHolder 并初始化 instance，这样不仅能确保线程安全，也能保证 Singleton 类的唯一性。不过，创建单例更优雅的一种方式是使用枚举，以后再讲给你听。”

“需要注意的是。第一，静态内部类不能访问外部类的所有成员变量；第二，静态内部类可以访问外部类的所有静态变量，包括私有静态变量。第三，外部类不能声明为 static。”

“三妹，你看，在 Singleton 类上加 static 后，编译器就提示错误了。”

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/keywords/19-08.png)

三妹点了点头，所有所思。

----

GitHub 上标星 7600+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 7600+ 的 Java 教程](https://tobebetterjavaer.com/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)