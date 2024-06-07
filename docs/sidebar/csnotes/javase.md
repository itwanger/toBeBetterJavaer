# 《30天速通Java》之Java基础篇

大家好，我是二哥呀。

GitHub 上有一个很知名的开源知识库《[CS-Notes](https://github.com/CyC2018/CS-Notes)》，目前已有 173k 的 star 数，其中收录了不少我认为蛮不错的内容，比如说大家现在看到的《30天速通Java》——我起了一个噱头十足的名字😁。

一共五个章节，基础篇、IO 篇、容器篇、并发篇和虚拟机篇，我结合《[二哥的 Java 进阶之路](https://javabetter.cn/)》对内容做一些补充和优化，并导出了亮白版和暗黑版的 PDF 和 epub 版本，好方便大家在 30 天内真的速通 Java。

- 由于时间仓促和个人能力有限，手册难免存在错误和疏漏，还请大家批评指正。微信 itwanger
- 该手册会持续更新，再次感谢原作者 CS-Notes，原文档地址：[https://github.com/CyC2018/CS-Notes/](https://github.com/CyC2018/CS-Notes/blob/master/notes/Java%20%E5%9F%BA%E7%A1%80.md)
- 推荐：[二哥的 Java 进阶之路：Java 最新学习路线](https://javabetter.cn/xuexiluxian/java/yitiaolong.html)

## 最新 PDF 获取

讲个笑话，PDF 内容没办法自动更新（😂），所以只能通过下面的方式，别怪我：

> 微信搜索《**沉默王二**》或者微信扫下面的二维码，关注后回复《**java**》即可获取最新的 PDF 版本。

![手机端可以长按识别](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

获取方式见下图（我用的 PC 端微信截图，手机端差不多）：

![无任何套路](https://cdn.tobebetterjavaer.com/stutymore/javase-20240605194117.png)

附其他干货笔记下载地址：

- [二哥的 Linux 速查备忘手册 PDF 下载](https://javabetter.cn/pdf/linux.html)
- [阮一峰 C 语言入门教程 PDF 下载](https://javabetter.cn/pdf/yuanyifeng-c-language.html)
- [Java 核心知识点整理 PDF 下载](https://javabetter.cn/pdf/github-java-jiaocheng-115-star.html)
- [深入浅出 Java 多线程 PDF 下载](https://javabetter.cn/pdf/java-concurrent.html)
- [Pro Git 中文版 PDF 下载](https://javabetter.cn/pdf/progit.html)
- [给操作系统捋条线 PDF 下载](https://javabetter.cn/pdf/os.html)

## 一、数据类型

### 基本类型

![二哥的 Java 进阶之路：数据类型](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/core-grammar/nine-01.png)

Java 基本数据类型的默认值和占用大小：

| 数据类型 | 默认值   | 大小   |
| -------- | -------- | ------ |
| boolean  | false    | 不确定 |
| char     | '\u0000' | 2 字节 |
| byte     | 0        | 1 字节 |
| short    | 0        | 2 字节 |
| int      | 0        | 4 字节 |
| long     | 0L       | 8 字节 |
| float    | 0.0f     | 4 字节 |
| double   | 0.0      | 8 字节 |

推荐阅读：[二哥的 Java 进阶之路：Java 基本数据类型](https://javabetter.cn/basic-grammar/basic-data-type.html)

### 包装类型

基本类型都有对应的包装类型，基本类型与其对应的包装类型之间的赋值使用自动装箱与拆箱完成。

```java
Integer x = 2; // 装箱 调用了 Integer.valueOf(2)
int y = x; // 拆箱 调用了 X.intValue()
```

推荐阅读：[二哥的 Java 进阶之路：拆箱和装箱](https://javabetter.cn/basic-extra-meal/box.html)

### 缓存池

`new Integer(123)` 与 `Integer.valueOf(123)` 的区别在于：

- `new Integer(123)` 每次都会新建一个对象；
- `Integer.valueOf(123)` 会使用缓存池中初始化好的对象。

```java
Integer x = new Integer(123);
Integer y = new Integer(123);
System.out.println(x == y); // false
Integer z = Integer.valueOf(123);
Integer k = Integer.valueOf(123);
System.out.println(z == k); // true
```

`valueOf()` 方法的实现比较简单，先判断值是否在缓存池中，如果在的话就直接返回缓存池的对象。

```java
public static Integer valueOf(int i) {
    if (i >= IntegerCache.low && i <= IntegerCache.high)
        return IntegerCache.cache[i + (-IntegerCache.low)];
    return new Integer(i);
}
```

在 Java 8 中，Integer 缓存池的大小默认为 -128\~127。

```java
static final int low = -128;
static final int high;
static final Integer cache[];

static {
    // high value may be configured by property
    int h = 127;
    String integerCacheHighPropValue =
        sun.misc.VM.getSavedProperty("java.lang.Integer.IntegerCache.high");
    if (integerCacheHighPropValue != null) {
        try {
            int i = parseInt(integerCacheHighPropValue);
            i = Math.max(i, 127);
            // Maximum array size is Integer.MAX_VALUE
            h = Math.min(i, Integer.MAX_VALUE - (-low) -1);
        } catch( NumberFormatException nfe) {
            // If the property cannot be parsed into an int, ignore it.
        }
    }
    high = h;

    cache = new Integer[(high - low) + 1];
    int j = low;
    for(int k = 0; k < cache.length; k++)
        cache[k] = new Integer(j++);

    // range [-128, 127] must be interned (JLS7 5.1.7)
    assert IntegerCache.high >= 127;
}
```

编译器会在自动装箱过程调用 `valueOf()` 方法，也就是说，值相同且在缓存池内的 Integer 对象使用 == 来比较的时候会返回 true。

```java
Integer m = 123;
Integer n = 123;
System.out.println(m == n); // true
```

基本类型对应的缓冲池如下：

- boolean values true and false
- all byte values
- short values between -128 and 127
- int values between -128 and 127
- char in the range \u0000 to \u007F

在 Java 8 的数值类缓冲池中，Integer 的缓冲池 IntegerCache 很特殊，这个缓冲池的下界是 - 128，上界默认是 127，但是上界是可调的。

在启动 jvm 的时候，可以通过 -XX:AutoBoxCacheMax=&lt;size&gt; 来指定缓冲池的大小，该选项在 JVM 初始化的时候会设定一个名为 java.lang.IntegerCache.high 系统属性，然后 IntegerCache 初始化的时候就会读取该系统属性来决定上界。

![沉默王二：IntegerCache.high](https://cdn.tobebetterjavaer.com/stutymore/Java基础-20240602173130.png)

> 微信搜索《**沉默王二**》或者微信扫下面的二维码，关注后回复《**java**》即可获取最新的 PDF 版本。

![手机端可以长按识别](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

## 二、String

### 概览

String 被声明为 final，因此它不能被继承。在 Java 8 中，String 内部使用 char 数组存储数据。

```java
public final class String
    implements java.io.Serializable, Comparable<String>, CharSequence {
    /** The value is used for character storage. */
    private final char value[];
}
```

但在 Java 9 之后，String 类的实现改用 byte 数组来存储字符串，同时使用 `coder` 来标识使用了哪种编码。

```java
public final class String
    implements java.io.Serializable, Comparable<String>, CharSequence {
    /** The value is used for character storage. */
    private final byte[] value;

    /** The identifier of the encoding used to encode the bytes in {@code value}. */
    private final byte coder;
}
```

value 数组被声明为 final，这意味着 value 变量在数组初始化之后就不能再引用其它数组对象了。并且 String 内部没有改变 value 数组的方法，因此可以保证 String 不可变。

推荐阅读：[二哥的 Java 进阶之路：String类源码](https://javabetter.cn/string/string-source.html)

### 字符串不可变的好处

**1. 可以用来作为 HashMap 的 key**  

HashMap 的底层数据结构是数组，其键值对在数组中的位置是通过 `(n - 1) & hash` 计算得到的，n 也就是数组的长度，hash 也就是键的哈希值。

![沉默王二：字符串的不可变性](https://cdn.tobebetterjavaer.com/stutymore/Java基础-20240604072937.png)

如果键是可变的，那么在计算键的哈希值时，哈希值也是不确定的，于是就无法准确地在数组中定位到键值对的位置。

推荐阅读：[HashMap 的源码解读](https://javabetter.cn/collection/hashmap.html)

**2. 字符串常量池的需要**  

因为字符串的使用频率非常高，所以 Java 设计者就决定将字符串常量放到一个公共的地方，这个地方叫做字符串常量池（String Pool）。

通过双引号创建的字符串（如 "沉默王二"）都会被加入到字符串常量池中，这样就可以减少字符串的创建，节约内存空间。

![沉默王二：字符串常量池](https://cdn.tobebetterjavaer.com/stutymore/Java基础-20240604074510.png)

推荐阅读：[深入理解Java的字符串常量池](https://javabetter.cn/string/constant-pool.html)

**3. 安全性**  

String 经常作为参数进行传递，比如说数据库连接中的用户名和密码，如果 String 是可变的，那么在传递的过程中就会存在安全隐患。

推荐阅读：[为什么 Java 字符串是不可变的？](https://javabetter.cn/string/immutable.html)

### String, StringBuffer 和 StringBuilder	

**1. 可变性**  

- String 不可变
- StringBuffer 和 StringBuilder 可变

**2. 线程安全**  

- String 不可变，因此是线程安全的
- StringBuilder 不是线程安全的
- StringBuffer 是线程安全的，内部使用 synchronized 进行同步

推荐阅读：[聊聊 Java StringBuilder和StringBuffer 两兄弟](https://javabetter.cn/string/builder-buffer.html)

### 字符串常量池

字符串常量池（String Pool）保存了所有字符串字面量（literal strings），也就是使用双引号 `""` 创建的字符串对象。当然了，也可以使用 String 的 `intern()` 方法将字符串添加到字符串常量池中。

当一个字符串调用 `intern()` 方法时，如果 String Pool 中已经存在一个字符串和该字符串值相等（使用 `equals()` 方法进行确定），那么就会返回 String Pool 中字符串的引用；否则，就会在 String Pool 中添加一个新的字符串，并返回这个新字符串的引用。

下面示例中，s1 和 s2 采用 `new String()` 的方式新建了两个不同字符串，而 s3 和 s4 是通过 `s1.intern()` 和 `s2.intern()` 方法获取字符串的引用。

`intern()` 会从字符串常量池中返回这个字符串引用，因此 s3 和 s4 引用的是同一个字符串。

```java
String s1 = new String("aaa");
String s2 = new String("aaa");
System.out.println(s1 == s2);           // false
String s3 = s1.intern();
String s4 = s2.intern();
System.out.println(s3 == s4);           // true
```

如果是采用 "bbb" 这种字面量的形式创建字符串，编译器会自动地将字符串放入 String Pool 中。

```java
String s5 = "bbb";
String s6 = "bbb";
System.out.println(s5 == s6);  // true
```


- [字符串常量池](https://javabetter.cn/string/constant-pool.html)
- [详解 String.intern() 方法](https://javabetter.cn/string/intern.html)

### new String("abc")

使用这种方式一共会创建两个字符串对象（前提是 String Pool 中还没有 "abc" 字符串对象）。

- "abc" 属于字符串字面量，因此编译时会在 String Pool 中创建一个字符串对象；
- 使用 new 会在堆中创建一个新的字符串对象，这个新对象在创建的时候，会使用字符串常量池中 "abc" 作为构造方法的参数。

好，我们来创建一个测试类，main 方法中使用这种方式来创建字符串对象。

```java
public class NewStringTest {
    public static void main(String[] args) {
        String s = new String("abc");
    }
}
```

使用 `javap -verbose` 进行反编译，得到以下内容：

```java
// ...
Constant pool:
// ...
   #2 = Class              #18            // java/lang/String
   #3 = String             #19            // abc
// ...
  #18 = Utf8               java/lang/String
  #19 = Utf8               abc
// ...

  public static void main(java.lang.String[]);
    descriptor: ([Ljava/lang/String;)V
    flags: ACC_PUBLIC, ACC_STATIC
    Code:
      stack=3, locals=2, args_size=1
         0: new           #2                  // class java/lang/String
         3: dup
         4: ldc           #3                  // String abc
         6: invokespecial #4                  // Method java/lang/String."<init>":(Ljava/lang/String;)V
         9: astore_1
// ...
```

在 Constant Pool 中，#19 存储了字符串字面量 "abc"，#3 是 String Pool 的字符串对象，它指向 #19 这个字符串字面量。

在 main 方法中，0: 行使用 new #2 在堆中创建了一个字符串对象，并且使用 ldc #3 将 String Pool 中的字符串对象作为 String 构造方法的参数。

以下是 String 构造方法的源码，可以看到，在将一个字符串对象作为另一个字符串对象的构造方法参数时，并不会复制 value 数组的内容，而是指向同一个 value 数组。

```java
public String(String original) {
    this.value = original.value;
    this.hash = original.hash;
}
```

> 微信搜索《**沉默王二**》或者微信扫下面的二维码，关注后回复《**java**》即可获取最新的 PDF 版本。

![手机端可以长按识别](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

## 三、运算

### 参数传递

Java 的参数是以值传递的形式传入方法中的，而不是引用传递。

这是一个 Dog 类，有一个字段 name、一个构造方法、一个 getName 方法和一个 setName 方法，以及一个 getObjectAddress 方法，用来返回对象的地址。

```java
public class Dog {

    String name;

    Dog(String name) {
        this.name = name;
    }

    String getName() {
        return this.name;
    }

    void setName(String name) {
        this.name = name;
    }

    String getObjectAddress() {
        return super.toString();
    }
}
```

然后我们在测试类的 main 方法中创建一个 Dog 对象 dog，并调用 func 方法，将 dog 对象作为参数传入。

```java
class PassByValueExample {
    public static void main(String[] args) {
        Dog dog = new Dog("A");
        func(dog);
        System.out.println(dog.getName());          // B
    }

    private static void func(Dog dog) {
        dog.setName("B");
    }
}
```

可以看到，dog 的 name 发生了改变，因为调用 func 方法时，传入的是 dog 对象的引用，也就是说，传入的是对象的地址，所以在 func 方法中对对象的字段进行修改，会影响到传入之前的对象。

但如果在方法中将变量引用到其它对象，那么此时方法里和方法外的两个引用其实指向了不同的对象，因此 func 方法中的 `dog = new Dog("B")` 并不会影响 main 方法中的 dog 对象。

```java
public class PassByValueExample {
    public static void main(String[] args) {
        Dog dog = new Dog("A");
        System.out.println(dog.getObjectAddress()); // Dog@4554617c
        func(dog);
        System.out.println(dog.getObjectAddress()); // Dog@4554617c
        System.out.println(dog.getName());          // A
    }

    private static void func(Dog dog) {
        System.out.println(dog.getObjectAddress()); // Dog@4554617c
        dog = new Dog("B");
        System.out.println(dog.getObjectAddress()); // Dog@74a14482
        System.out.println(dog.getName());          // B
    }
}
```

因此，在将一个对象作为参数传入另外一个方法时，本质上是将对象的地址以值的方式传递到形参中。

推荐阅读：[Java 到底是值传递还是引用传递](https://javabetter.cn/basic-extra-meal/pass-by-value.html)

### float 与 double

Java 不能隐式向下转型，因为这会使精度降低。

`1.1` 字面量属于 double 类型，不能直接将 `1.1` 赋值给 float 变量，因为这是向下转型。

```java
// float f = 1.1;
```

1.1f 字面量才是 float 类型。

```java
float f = 1.1f;
```

### 隐式类型转换

因为字面量 1 是 int 类型，它比 short 类型精度要高，因此不能隐式地将 int 类型向下转型为 short 类型。

```java
short s1 = 1;
// s1 = s1 + 1;
```

但是使用 += 或者 ++ 运算符会执行隐式类型转换。

```java
s1 += 1;
s1++;
```

上面的语句相当于将 s1 + 1 的计算结果进行了向下转型：

```java
s1 = (short) (s1 + 1);
```

推荐阅读：[自动类型转换与强制类型转换](https://javabetter.cn/basic-grammar/type-cast.html)

### switch

从 Java 7 开始，可以在 switch 条件判断语句中使用 String 对象。

```java
String s = "a";
switch (s) {
    case "a":
        System.out.println("aaa");
        break;
    case "b":
        System.out.println("bbb");
        break;
}
```

推荐阅读：[switch 语句的介绍](https://javabetter.cn/basic-grammar/flow-control.html#_02%E3%80%81switch-%E8%AF%AD%E5%8F%A5)

> 微信搜索《**沉默王二**》或者微信扫下面的二维码，关注后回复《**java**》即可获取最新的 PDF 版本。

![手机端可以长按识别](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

## 四、关键字

### final

#### 1.变量

使用 final 修饰的变量被称为常量，常量在定义时必须进行初始化，并且初始化后值不可改变。

- 对于基本数据类型，final 修饰后的变量值不可改变。
- 对于引用数据类型，final 修饰后的引用不变，也就事不能引用其它对象，但是被引用的对象本身是可以修改的。

```java
final int x = 1;
// x = 2;  // cannot assign value to final variable 'x'
final A y = new A();
y.a = 1;
```

#### 2.方法 

final 修饰的方法不能被子类重写。

#### 3. 类

final 修饰的类不允许被继承。

推荐阅读：[一文彻底搞懂 Java final 关键字](https://javabetter.cn/oo/final.html)

### static

#### 1.静态变量 

- 静态变量：又称类变量，也就是通过 static 关键字修饰的变量，这个变量是属于类的，类所有的实例都共享静态变量，可以直接通过类名来访问静态变量。静态变量在内存中只有一份。
- 实例变量：或者叫成员变量，每创建一个实例就会产生一个实例变量，它与该实例同生共死。

```java
public class A {

    private int x;         // 实例变量
    private static int y;  // 静态变量

    public static void main(String[] args) {
        // int x = A.x;  // Non-static field 'x' cannot be referenced from a static context
        A a = new A();
        int x = a.x;
        int y = A.y;
    }
}
```

#### 2.静态方法

static 修饰的方法被称为静态方法，它在类加载的时候就存在了，它不依赖于任何实例。

但 static 不能用来修饰抽象方法，因为 abstract 方法需要子类重写并提供具体实现，而 static 方法是静态的，无法被子类重写，这使得 static 和 abstract 修饰符是冲突的。

```java
public abstract class A {
    public static void func1(){
    }
    // public abstract static void func2();  // Illegal combination of modifiers: 'abstract' and 'static'
}
```

静态方法只能访问所属类的静态字段和静态方法，并且静态方法中不能有 this 和 super 关键字，因为这两个关键字与具体的对象关联。

```java
public class A {

    private static int x;
    private int y;

    public static void func1(){
        int a = x;
        // int b = y;  // Non-static field 'y' cannot be referenced from a static context
        // int b = this.y;     // 'A.this' cannot be referenced from a static context
    }
}
```

#### 3.静态代码块

静态代码块在类初始化时运行一次。

```java
public class A {
    static {
        System.out.println("123");
    }

    public static void main(String[] args) {
        A a1 = new A();
        A a2 = new A();
    }
}
```

可以用 static 代码块来初始化一些静态变量，它会优先于 main 方法执行。

```
123
```

#### 4.静态内部类

非静态内部类依赖于外部类的实例，也就是说需要先创建外部类的实例，才能用这个实例去创建非静态内部类。而静态内部类不需要，可以直接实例化。

```java
public class OuterClass {

    class InnerClass {
    }

    static class StaticInnerClass {
    }

    public static void main(String[] args) {
        // InnerClass innerClass = new InnerClass(); // 'OuterClass.this' cannot be referenced from a static context
        OuterClass outerClass = new OuterClass();
        InnerClass innerClass = outerClass.new InnerClass();
        StaticInnerClass staticInnerClass = new StaticInnerClass();
    }
}
```

但静态内部类不能访问外部类的非静态变量和方法。

#### 5.静态导包

在使用静态变量和静态方法时不用再指明 ClassName，从而简化代码，但可读性大大降低，不推荐。

```java
import static com.xxx.ClassName.*
```

#### 6.代码的初始化顺序

静态变量和静态代码块优先于实例变量和普通代码块，而静态变量和静态代码块的初始化顺序取决于它们在代码中的顺序。

```java
public static String staticField = "静态变量";

static {
    System.out.println("静态语句块");
}

public String field = "实例变量";

{
    System.out.println("普通语句块");
}
```

最后才是构造方法的初始化。

```java
public InitialOrderTest() {
    System.out.println("构造方法");
}
```

存在继承的情况下，初始化顺序为：

- 父类（静态变量、静态语句块）
- 子类（静态变量、静态语句块）
- 父类（实例变量、普通语句块）
- 父类（构造方法）
- 子类（实例变量、普通语句块）
- 子类（构造方法）

推荐阅读：[详解 Java static 关键字的作用](https://javabetter.cn/oo/static.html)

> 微信搜索《**沉默王二**》或者微信扫下面的二维码，关注后回复《**java**》即可获取最新的 PDF 版本。

![手机端可以长按识别](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

## 五、Object 通用方法

### 概览

下面👇🏻这些方法都挺常用的，先看个大概，然后我们来挑一些使用频率非常高的方法做一个系统化地介绍。

```java
public native int hashCode()

public boolean equals(Object obj)

protected native Object clone() throws CloneNotSupportedException

public String toString()

public final native Class<?> getClass()

protected void finalize() throws Throwable {}

public final native void notify()

public final native void notifyAll()

public final native void wait(long timeout) throws InterruptedException

public final void wait(long timeout, int nanos) throws InterruptedException

public final void wait() throws InterruptedException
```

### equals()

#### 1. 等价关系

两个对象具有等价关系，需要满足以下 4 个条件：

①、对称性

```java
x.equals(y) == y.equals(x); // true
```

②、传递性

```java
if (x.equals(y) && y.equals(z))
    x.equals(z); // true;
```

③、一致性

多次调用 equals() 方法结果不变

```java
x.equals(y) == x.equals(y); // true
```

④、与 null 的比较

对任何不是 null 的对象 x 调用 x.equals(null) 结果都为 false

```java
x.equals(null); // false;
```

#### 2. 等价与相等

- 对于基本数据类型，可以使用 == 判断两个值是否相等。
- 对于引用数据类型，可以使用 == 判断两个变量是否引用了同一个对象，而 `equals()` 方法用于判断引用的对象是否等价。

```java
Integer x = new Integer(1);
Integer y = new Integer(1);
System.out.println(x.equals(y)); // true
System.out.println(x == y);      // false
```

#### 3. 如何实现equals方法

①、检查是否为同一个对象的引用，如果是直接返回 true；

②、检查是否是同一类型，如果不是，直接返回 false；

③、转型后判断关键字段是否相等。

```java
public class EqualExample {

    private int x;
    private int y;
    private int z;

    public EqualExample(int x, int y, int z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        EqualExample that = (EqualExample) o;

        if (x != that.x) return false;
        if (y != that.y) return false;
        return z == that.z;
    }
}
```

### hashCode()

`hashCode()` 方法用于返回对象的哈希值，而 `equals()` 用来判断两个对象是否等价。等价的两个对象哈希值一定相同，但是哈希值相同的两个对象不一定等价，因为哈希值的计算具有随机性，两个值不同的对象可能计算出相同的哈希值。

在重写 `equals()` 方法时应该重写 `hashCode()` 方法，保证等价的两个对象哈希值也相等。

HashSet 和 HashMap 等集合类使用了 `hashCode()` 方法来计算对象应该存储的位置（底层数据结构为数组），因此要将对象添加到这些集合类中，需要让对应的类实现 `hashCode()` 方法。

下面的代码中，新建了两个等价的对象，并将它们添加到 HashSet 中。我们希望将这两个对象当成一样的，只在集合中添加一个。但是 EqualExample 没有实现 `hashCode()` 方法，因此这两个对象的哈希值是不同的，最终导致集合添加了两个等价的对象。

```java
EqualExample e1 = new EqualExample(1, 1, 1);
EqualExample e2 = new EqualExample(1, 1, 1);
System.out.println(e1.equals(e2)); // true
HashSet<EqualExample> set = new HashSet<>();
set.add(e1);
set.add(e2);
System.out.println(set.size());   // 2
```

理想的哈希函数（方法/算法）应当具有均匀性，即不相等的对象应当均匀分布到所有可能的哈希值上。

这就要求了哈希函数要把所有域（字段）的值都考虑进来。可以将每个域都当成 R 进制的某一位，然后组成一个 R 进制的整数。

R 一般取 31，因为它是一个奇素数，如果是偶数的话，当出现乘法溢出，信息就会丢失，因为与 2 相乘相当于向左移一位，最左边的位丢失。

并且一个数与 31 相乘可以转换成移位和减法：`31*x == (x<<5)-x`，编译器会自动进行这个优化。

```java
@Override
public int hashCode() {
    int result = 17;
    result = 31 * result + x;
    result = 31 * result + y;
    result = 31 * result + z;
    return result;
}
```

### toString()

默认返回 `ToStringExample@4554617c` 这种形式，其中 @ 后面的数值为哈希值（散列码）的无符号十六进制表示。

```java
public class ToStringExample {

    private int number;

    public ToStringExample(int number) {
        this.number = number;
    }
}
```

测试一下：

```java
ToStringExample example = new ToStringExample(123);
System.out.println(example.toString());
```

输出结果：

```html
ToStringExample@4554617c
```

### clone()

#### 1. cloneable 接口

`clone()` 是 Object 的 protected 方法，它不是 public，因此如果一个类没有显式重写 `clone()`，其它类就不能直接调用该类实例的 `clone()` 方法。

```java
public class CloneExample {
    private int a;
    private int b;
}
```

尝试直接调用 `clone()` 方法，编译器提示错误：

```java
CloneExample e1 = new CloneExample();
// CloneExample e2 = e1.clone(); // 'clone()' has protected access in 'java.lang.Object'
```

好，这次重写 `clone()` 方法：

```java
public class CloneExample {
    private int a;
    private int b;

    @Override
    public CloneExample clone() throws CloneNotSupportedException {
        return (CloneExample)super.clone();
    }
}
```

再次尝试调用 `clone()` 方法：

```java
CloneExample e1 = new CloneExample();
try {
    CloneExample e2 = e1.clone();
} catch (CloneNotSupportedException e) {
    e.printStackTrace();
}
```

输出结果：

```html
java.lang.CloneNotSupportedException: CloneExample
```

哦哦，编译通过了，但运行时抛出 CloneNotSupportedException，这是因为 CloneExample 没有实现 Cloneable 接口。

需要注意的是，`clone()` 方法并不是 Cloneable 接口的方法，而是 Object 的 protected 方法。

Cloneable 接口只是规定（约束），规定一个类如果没有实现 Cloneable 接口就直接调用了 `clone()` 方法，就会抛出 CloneNotSupportedException。

```java
public class CloneExample implements Cloneable {
    private int a;
    private int b;

    @Override
    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}
```

#### 2. 浅拷贝

浅拷贝：复制对象的基本数据类型成员变量，和引用数据类型成员变量的引用，导致新对象和原对象共享同一引用对象。

```java
public class ShallowCloneExample implements Cloneable {

    private int[] arr;

    public ShallowCloneExample() {
        arr = new int[10];
        for (int i = 0; i < arr.length; i++) {
            arr[i] = i;
        }
    }

    public void set(int index, int value) {
        arr[index] = value;
    }

    public int get(int index) {
        return arr[index];
    }

    @Override
    protected ShallowCloneExample clone() throws CloneNotSupportedException {
        return (ShallowCloneExample) super.clone();
    }
}
```

进行浅拷贝，改变 e1 的 arr 数组，e2 的 arr 数组也会改变。

```java
ShallowCloneExample e1 = new ShallowCloneExample();
ShallowCloneExample e2 = null;
try {
    e2 = e1.clone();
} catch (CloneNotSupportedException e) {
    e.printStackTrace();
}
e1.set(2, 222);
System.out.println(e2.get(2)); // 222
```

#### 3. 深拷贝

深拷贝：不仅复制对象的基本数据类型成员变量，还递归复制引用类型成员变量所引用的对象，使得新对象和原对象完全独立。

```java
public class DeepCloneExample implements Cloneable {

    private int[] arr;

    public DeepCloneExample() {
        arr = new int[10];
        for (int i = 0; i < arr.length; i++) {
            arr[i] = i;
        }
    }

    public void set(int index, int value) {
        arr[index] = value;
    }

    public int get(int index) {
        return arr[index];
    }

    @Override
    protected DeepCloneExample clone() throws CloneNotSupportedException {
        DeepCloneExample result = (DeepCloneExample) super.clone();
        result.arr = new int[arr.length];
        for (int i = 0; i < arr.length; i++) {
            result.arr[i] = arr[i];
        }
        return result;
    }
}
```

进行深拷贝，改变 e1 的 arr 数组，e2 的 arr 数组不会改变。

```java
DeepCloneExample e1 = new DeepCloneExample();
DeepCloneExample e2 = null;
try {
    e2 = e1.clone();
} catch (CloneNotSupportedException e) {
    e.printStackTrace();
}
e1.set(2, 222);
System.out.println(e2.get(2)); // 2
```

#### 4. clone() 的替代方案

使用 `clone()` 方法来拷贝一个对象既复杂又有风险，一需要类型转换，二可能抛出异常。

Effective Java 一书上讲到，最好不要去使用 `clone()`，可以使用拷贝构造方法或者拷贝工厂来拷贝一个对象。

```java
public class CloneConstructorExample {

    private int[] arr;

    public CloneConstructorExample() {
        arr = new int[10];
        for (int i = 0; i < arr.length; i++) {
            arr[i] = i;
        }
    }

    public CloneConstructorExample(CloneConstructorExample original) {
        arr = new int[original.arr.length];
        for (int i = 0; i < original.arr.length; i++) {
            arr[i] = original.arr[i];
        }
    }

    public void set(int index, int value) {
        arr[index] = value;
    }

    public int get(int index) {
        return arr[index];
    }
}
```

使用拷贝构造方法来拷贝一个对象，简单高效。

```java
CloneConstructorExample e1 = new CloneConstructorExample();
CloneConstructorExample e2 = new CloneConstructorExample(e1);
e1.set(2, 222);
System.out.println(e2.get(2)); // 2
```

推荐阅读：[深入理解Java浅拷贝与深拷贝](https://javabetter.cn/basic-extra-meal/deep-copy.html)

> 微信搜索《**沉默王二**》或者微信扫下面的二维码，关注后回复《**java**》即可获取最新的 PDF 版本。

![手机端可以长按识别](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

## 六、继承

### 访问权限

Java 中有三个访问权限修饰符：private、protected 以及 public，如果不加访问修饰符，表示包级可见。

可以对类或类中的成员（字段和方法）加上访问修饰符。

- 类可见表示其它类可以用这个类创建实例对象。
- 成员可见表示其它类可以用这个类的实例对象访问到该成员；

protected 用于修饰成员，表示在继承体系中成员对于子类可见，但是这个访问修饰符对于类没有意义。

设计良好的模块会隐藏所有的实现细节，把它的 API 与它的实现清晰地隔离开来。模块之间只通过它们的 API 进行通信，一个模块不需要知道其他模块的内部工作情况，这个概念被称为信息隐藏或封装。因此访问权限应当尽可能地使每个类或者成员不被外界访问。

如果子类的方法重写了父类的方法，那么子类中该方法的访问级别不允许低于父类的访问级别。这是为了确保可以使用父类实例的地方都可以使用子类实例去代替，也就是确保满足里氏替换原则。

字段决不能是公有的，因为这么做的话就失去了对这个字段修改行为的控制，客户端可以对其随意修改。

例如下面的例子中，AccessExample 拥有 id 公有字段，如果在某个时刻，我们想要使用 int 存储 id 字段，那么就需要修改所有的客户端代码。

```java
public class AccessExample {
    public String id;
}
```

可以使用公有的 getter 和 setter 方法来替换公有字段，这样的话就可以控制对字段的修改行为。

```java
public class AccessExample {

    private int id;

    public String getId() {
        return id + "";
    }

    public void setId(String id) {
        this.id = Integer.valueOf(id);
    }
}
```

但是也有例外，如果是包级私有的类或者私有的嵌套类，那么直接暴露成员不会有特别大的影响。

```java
public class AccessWithInnerClassExample {

    private class InnerClass {
        int x;
    }

    private InnerClass innerClass;

    public AccessWithInnerClassExample() {
        innerClass = new InnerClass();
    }

    public int getValue() {
        return innerClass.x;  // 直接访问
    }
}
```

推荐阅读：[Java访问权限修饰符](https://javabetter.cn/oo/access-control.html)

### 抽象类与接口

#### 1. 抽象类

抽象类和抽象方法都使用 abstract 关键字进行声明。如果一个类中包含抽象方法，那么这个类必须声明为抽象类。

抽象类和普通类最大的区别是，抽象类不能被实例化，只能被继承。

```java
public abstract class AbstractClassExample {

    protected int x;
    private int y;

    public abstract void func1();

    public void func2() {
        System.out.println("func2");
    }
}
```

继承：

```java
public class AbstractExtendClassExample extends AbstractClassExample {
    @Override
    public void func1() {
        System.out.println("func1");
    }
}
```

抽象类不能被实例化。

```java
// AbstractClassExample ac1 = new AbstractClassExample(); // 'AbstractClassExample' is abstract; cannot be instantiated
AbstractClassExample ac2 = new AbstractExtendClassExample();
ac2.func1();
```

#### 2. 接口

接口是抽象类的延伸，在 Java 8 之前，它可以看成是一个完全抽象的类，也就是说它不能有任何的方法实现。

从 Java 8 开始，接口也可以拥有默认的方法实现，这是因为不支持默认方法的接口维护成本太高了。在 Java 8 之前，如果一个接口想要添加新的方法，那么要修改所有实现了该接口的类，让它们都实现新增的方法。

接口的成员（字段 + 方法）默认都是 public 的，并且不允许定义为 private 或者 protected。从 Java 9 开始，允许将方法定义为 private，这样就能定义某些复用的代码又不会把方法暴露出去。

接口的字段默认都是 static 和 final 的。

```java
public interface InterfaceExample {

    void func1();

    default void func2(){
        System.out.println("func2");
    }

    int x = 123;
    // int y;               // Variable 'y' might not have been initialized
    public int z = 0;       // Modifier 'public' is redundant for interface fields
    // private int k = 0;   // Modifier 'private' not allowed here
    // protected int l = 0; // Modifier 'protected' not allowed here
    // private void fun3(); // Modifier 'private' not allowed here
}
```

接口的实现：

```java
public class InterfaceImplementExample implements InterfaceExample {
    @Override
    public void func1() {
        System.out.println("func1");
    }
}
```

接口不能被实例化，但是可以使用接口引用来指向实现了该接口的类。

```java
// InterfaceExample ie1 = new InterfaceExample(); // 'InterfaceExample' is abstract; cannot be instantiated
InterfaceExample ie2 = new InterfaceImplementExample();
ie2.func1();
System.out.println(InterfaceExample.x);
```

#### 3. 抽象类和接口比较 

- 从设计层面上看，抽象类提供了一种 IS-A 的关系，需要满足里式替换原则，即子类对象必须能够替换掉所有父类对象。而接口更像是一种 LIKE-A 关系，它只是提供一种方法实现契约，并不要求接口和实现接口的类具有 IS-A 关系。
- 从使用上来看，一个类可以实现多个接口，但是不能继承多个抽象类。
- 接口的字段只能是 static 和 final 类型的，而抽象类的字段没有这种限制。
- 接口的成员只能是 public 的，而抽象类的成员可以有多种访问权限。

#### 4. 抽象类和接口的使用选择

使用接口：

- 需要让不相关的类都实现一个方法，例如不相关的类都可以实现 Comparable 接口中的 `compareTo()` 方法；
- 需要使用多重继承。

使用抽象类：

- 需要在几个相关的类中共享代码。
- 需要能控制继承来的成员访问权限，而不是都为 public。
- 需要继承非静态和非常量字段。

在很多情况下，接口优先于抽象类。因为接口没有抽象类严格的类层次结构要求，可以灵活地为一个类添加行为。并且从 Java 8 开始，接口也可以有默认的方法实现，使得修改接口的成本也变的很低。

推荐阅读：

- [接口](https://javabetter.cn/oo/interface.html)
- [抽象类](https://javabetter.cn/oo/abstract.html)


### super 关键字

- 可以使用 `super()` 访问父类的构造方法，从而委托父类完成一些初始化的工作。应该注意到，子类一定会调用父类的构造方法来完成初始化工作，一般是调用父类的默认构造方法，如果子类需要调用父类其它的构造方法，那么就可以使用 `super()`。
- 访问父类的成员：如果子类重写了父类的某个方法，可以通过使用 super 关键字来引用父类的方法实现。

```java
public class SuperExample {

    protected int x;
    protected int y;

    public SuperExample(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public void func() {
        System.out.println("SuperExample.func()");
    }
}
```

使用 `super()` 调用父类的构造方法：

```java
public class SuperExtendExample extends SuperExample {

    private int z;

    public SuperExtendExample(int x, int y, int z) {
        super(x, y);
        this.z = z;
    }

    @Override
    public void func() {
        super.func();
        System.out.println("SuperExtendExample.func()");
    }
}
```

测试：

```java
SuperExample e = new SuperExtendExample(1, 2, 3);
e.func();
```

输出结果：

```html
SuperExample.func()
SuperExtendExample.func()
```

推荐阅读：[this 和 super](https://javabetter.cn/oo/this-super.html)

### 重写与重载

#### 1. 重写（Override） 

重写存在于继承体系中，指子类实现了一个与父类在方法声明上完全相同的方法。

为了满足里式替换原则，重写有以下三个限制：

- 子类方法的访问权限必须大于等于父类方法；
- 子类方法的返回类型必须是父类方法返回类型或为其子类型。
- 子类方法抛出的异常类型必须是父类抛出异常类型或为其子类型。

使用 `@Override` 注解，可以让编译器帮忙检查是否满足上面的三个限制条件。

下面的示例中，SubClass 为 SuperClass 的子类，SubClass 重写了 SuperClass 的 `func()` 方法。其中：

- 子类方法访问权限为 public，大于父类的 protected。
- 子类的返回类型为 ArrayList\<Integer\>，是父类返回类型 List\<Integer\> 的子类。
- 子类抛出的异常类型为 Exception，是父类抛出异常 Throwable 的子类。
- 子类重写方法使用 `@Override` 注解，从而让编译器自动检查是否满足限制条件。

```java
class SuperClass {
    protected List<Integer> func() throws Throwable {
        return new ArrayList<>();
    }
}

class SubClass extends SuperClass {
    @Override
    public ArrayList<Integer> func() throws Exception {
        return new ArrayList<>();
    }
}
```

在调用一个方法时，先从本类中查找是否有对应的方法，如果没有再到父类中查看，看是否从父类继承来。否则就要对参数进行转型，转成父类之后看是否有对应的方法。总的来说，方法调用的优先级为：

- this.func(this)
- super.func(this)
- this.func(super)
- super.func(super)


```java
/*
    A
    |
    B
    |
    C
    |
    D
 */
class A {

    public void show(A obj) {
        System.out.println("A.show(A)");
    }

    public void show(C obj) {
        System.out.println("A.show(C)");
    }
}

class B extends A {

    @Override
    public void show(A obj) {
        System.out.println("B.show(A)");
    }
}

class C extends B {
}

class D extends C {
}
```

测试：

```java
public static void main(String[] args) {

    A a = new A();
    B b = new B();
    C c = new C();
    D d = new D();

    // 在 A 中存在 show(A obj)，直接调用
    a.show(a); // A.show(A)
    // 在 A 中不存在 show(B obj)，将 B 转型成其父类 A
    a.show(b); // A.show(A)
    // 在 B 中存在从 A 继承来的 show(C obj)，直接调用
    b.show(c); // A.show(C)
    // 在 B 中不存在 show(D obj)，但是存在从 A 继承来的 show(C obj)，将 D 转型成其父类 C
    b.show(d); // A.show(C)

    // 引用的还是 B 对象，所以 ba 和 b 的调用结果一样
    A ba = new B();
    ba.show(c); // A.show(C)
    ba.show(d); // A.show(C)
}
```

#### 2. 重载（Overload） 

重载存在于同一个类中，指一个方法与已经存在的方法名称上相同，但是参数类型、个数、顺序至少有一个不同。

应该注意的是，返回值不同，其它都相同不算是重载。

```java
class OverloadingExample {
    public void show(int x) {
        System.out.println(x);
    }

    public void show(int x, String y) {
        System.out.println(x + " " + y);
    }
}
```

测试：

```java
public static void main(String[] args) {
    OverloadingExample example = new OverloadingExample();
    example.show(1);
    example.show(1, "2");
}
```

推荐阅读：[重载和重写](https://javabetter.cn/basic-extra-meal/override-overload.html)

> 微信搜索《**沉默王二**》或者微信扫下面的二维码，关注后回复《**java**》即可获取最新的 PDF 版本。

![手机端可以长按识别](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

## 七、反射

每个类都有一个 **Class** 对象，包含了与类有关的信息。当编译一个新类时，会产生一个同名的 .class 文件，该文件内容保存着 Class 对象。

类加载相当于 Class 对象的加载，类在第一次使用时才动态加载到 JVM 中。也可以使用 `Class.forName("com.mysql.jdbc.Driver")` 这种方式来控制类的加载，该方法会返回一个 Class 对象。

反射可以提供运行时的类信息，并且这个类可以在运行时才加载进来，甚至在编译时期该类的 .class 不存在也可以加载进来。

Class 和 java.lang.reflect 一起对反射提供了支持，java.lang.reflect 类库主要包含了以下三个类：

-  **Field** ：可以使用 `get()` 和 `set()` 方法读取和修改 Field 对象关联的字段；
-  **Method** ：可以使用 `invoke()` 方法调用与 Method 对象关联的方法；
-  **Constructor** ：可以用 Constructor 的 `newInstance()` 创建新的对象。

**反射的优点：**  

-  **可扩展性**   ：应用程序可以利用全限定名创建可扩展对象的实例，来使用来自外部的用户自定义类。
-  **类浏览器和可视化开发环境**   ：一个类浏览器需要可以枚举类的成员。可视化开发环境（如 IDE）可以从利用反射中可用的类型信息中受益，以帮助程序员编写正确的代码。
-  **调试器和测试工具**   ： 调试器需要能够检查一个类里的私有成员。测试工具可以利用反射来自动地调用类里定义的可被发现的 API 定义，以确保一组测试中有较高的代码覆盖率。

**反射的缺点：**  

尽管反射非常强大，但也不能滥用。如果一个功能可以不用反射完成，那么最好就不用。在我们使用反射技术时，下面几条内容应该牢记于心。

-  **性能开销**   ：反射涉及了动态类型的解析，所以 JVM 无法对这些代码进行优化。因此，反射操作的效率要比那些非反射操作低得多。我们应该避免在经常被执行的代码或对性能要求很高的程序中使用反射。
-  **安全限制**   ：使用反射技术要求程序必须在一个没有安全限制的环境中运行。如果一个程序必须在有安全限制的环境中运行，如 Applet，那么这就是个问题了。
-  **内部暴露**   ：由于反射允许代码执行一些在正常情况下不被允许的操作（比如访问私有的属性和方法），所以使用反射可能会导致意料之外的副作用，这可能导致代码功能失调并破坏可移植性。反射代码破坏了抽象性，因此当平台发生改变的时候，代码的行为就有可能也随着变化。

推荐阅读：[Java 反射详解](https://javabetter.cn/basic-extra-meal/fanshe.html)

## 八、异常

Throwable 可以用来表示任何可以作为异常抛出的类，分为两种：  **Error**   和 **Exception**。其中 Error 用来表示 JVM 无法处理的错误，Exception 分为两种：

-   **受检异常**  ：需要用 try...catch... 语句捕获并进行处理，并且可以从异常中恢复；
-   **非受检异常**  ：程序运行时错误，例如除 0 会引发 Arithmetic Exception，此时程序崩溃并且无法恢复。

![二哥的 Java 进阶之路：异常](https://cdn.tobebetterjavaer.com/studymore/gailan-20230326090207.png)

推荐阅读：[一文彻底搞懂Java异常处理](https://javabetter.cn/exception/gailan.html)

## 九、泛型

```java
public class Box<T> {
    // T stands for "Type"
    private T t;
    public void set(T t) { this.t = t; }
    public T get() { return t; }
}
```

推荐阅读：[Java 泛型深入解析](https://javabetter.cn/collection/generic.html)

## 十、注解

Java 注解是附加在代码中的一些元信息，用于一些工具在编译、运行时进行解析和使用，起到说明、配置的功能。注解不会也不能影响代码的实际逻辑，仅仅起到辅助性的作用。

推荐阅读：[深入理解Java中的注解](https://javabetter.cn/basic-extra-meal/annotation.html)

## 十一、特性

### Java 各版本的新特性

**New highlights in Java SE 8**  

1. Lambda Expressions
2. Pipelines and Streams
3. Date and Time API
4. Default Methods
5. Type Annotations
6. Nashhorn JavaScript Engine
7. Concurrent Accumulators
8. Parallel operations
9. PermGen Error Removed

**New highlights in Java SE 7**  

1. Strings in Switch Statement
2. Type Inference for Generic Instance Creation
3. Multiple Exception Handling
4. Support for Dynamic Languages
5. Try with Resources
6. Java nio Package
7. Binary Literals, Underscore in literals
8. Diamond Syntax

推荐阅读：
- [Java 8 Stream流](https://javabetter.cn/java8/stream.html)
- [Java 8 Optional最佳指南](https://javabetter.cn/java8/optional.html)
- [深入浅出Java 8 Lambda表达式](https://javabetter.cn/java8/Lambda.html)
- [Java 14 开箱，新特性Record、instanceof、switch香香香香](https://javabetter.cn/java8/java14.html)

### JRE or JDK

- JRE：Java Runtime Environment，Java 运行环境的简称，为 Java 的运行提供所需环境。它是一个 JVM 程序，主要包括了 JVM 的标准实现和一些 Java 基本类库。
- JDK：Java Development Kit，Java 开发工具包，提供了 Java 的开发及运行环境。JDK 是 Java 开发的核心，集成了 JRE 以及一些其它的工具，比如编译 Java 源码的编译器 javac 等。

## 参考资料

CS-Notes，原文档地址：[https://github.com/CyC2018/CS-Notes/](https://github.com/CyC2018/CS-Notes/blob/master/notes/Java%20%E5%9F%BA%E7%A1%80.md)

## 花絮

该 PDF 文档是我在学习 CSNotes 时的一些优化和补充，加了很多二哥的 Java 进阶之路上的内容，可以进行很好的互补。整理不易，希望能帮助到大家（❤️）。

最新版更新完成后我会放到网盘中，微信搜索《**沉默王二**》或者微信扫下面的二维码，关注后回复《**Java**》即可获取最新的 PDF 版本。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

附其他干货笔记下载地址：

- [二哥的 Linux 速查备忘手册 PDF 下载](https://javabetter.cn/pdf/linux.html)
- [阮一峰 C 语言入门教程 PDF 下载](https://javabetter.cn/pdf/yuanyifeng-c-language.html)
- [Java 核心知识点整理 PDF 下载](https://javabetter.cn/pdf/github-java-jiaocheng-115-star.html)
- [深入浅出 Java 多线程 PDF 下载](https://javabetter.cn/pdf/java-concurrent.html)
- [Pro Git 中文版 PDF 下载](https://javabetter.cn/pdf/progit.html)
- [给操作系统捋条线 PDF 下载](https://javabetter.cn/pdf/os.html)