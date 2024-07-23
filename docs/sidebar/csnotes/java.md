# 二哥修订版《30天速通Java》

大家好，我是二哥呀。

GitHub 上有一个很知名的开源知识库《[CS-Notes](https://github.com/CyC2018/CS-Notes)》，目前已有 173k 的 star 数，其中收录了不少我认为蛮不错的内容，比如说大家现在看到的《30天速通Java》——请原谅我起了一个噱头十足的名字😁。

一共五个章节，基础篇、IO 篇、容器篇、并发篇和虚拟机篇，我结合《[二哥的 Java 进阶之路](https://javabetter.cn/)》对内容做一些补充和优化，并导出了亮白版和暗黑版的 PDF 和 epub 版本，好方便大家在 30 天内真的速通 Java（减少大家学习的成本）。

- 由于时间仓促和个人能力有限，手册难免存在错误和疏漏，还请大家批评指正。微信 itwanger
- 该手册会持续更新，再次感谢原作者 CS-Notes，原文档地址：[https://github.com/CyC2018/CS-Notes/](https://github.com/CyC2018/CS-Notes/blob/master/notes/Java%20%E5%9F%BA%E7%A1%80.md)
- 推荐：[二哥的 Java 进阶之路：Java 最新学习路线](https://javabetter.cn/xuexiluxian/java/yitiaolong.html)

**最新版 PDF 获取**

讲个不好笑的笑话，PDF 内容没办法自动更新（😂），所以只能通过下面的方式：

> 微信搜索《**沉默王二**》或者微信扫下面的二维码，关注后回复《**java**》即可获取最新的 PDF 版本（我会不定期更新）。

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

## 第一章、Java基础篇

### 一、数据类型

#### 基本类型

![二哥的 Java 进阶之路：数据类型](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/core-grammar/nine-01.png)

Java 基本数据类型的默认值和占用大小：

| 数据类型 | 默认值   | 大小   |
| -------- | -------- | ------ |
| boolean  | false    | 1 字节或 4 字节 |
| char     | '\u0000' | 2 字节 |
| byte     | 0        | 1 字节 |
| short    | 0        | 2 字节 |
| int      | 0        | 4 字节 |
| long     | 0L       | 8 字节 |
| float    | 0.0f     | 4 字节 |
| double   | 0.0      | 8 字节 |

推荐阅读：[二哥的 Java 进阶之路：Java 基本数据类型](https://javabetter.cn/basic-grammar/basic-data-type.html)

#### 包装类型

基本类型都有对应的包装类型，基本类型与其对应的包装类型之间的赋值使用自动装箱与拆箱完成。

```java
Integer x = 2; // 装箱 调用了 Integer.valueOf(2)
int y = x; // 拆箱 调用了 X.intValue()
```

推荐阅读：[二哥的 Java 进阶之路：拆箱和装箱](https://javabetter.cn/basic-extra-meal/box.html)

#### 缓存池

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


### 二、String

#### 概览

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

#### 字符串不可变的好处

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

#### String, StringBuffer 和 StringBuilder	

**1. 可变性**  

- String 不可变
- StringBuffer 和 StringBuilder 可变

**2. 线程安全**  

- String 不可变，因此是线程安全的
- StringBuilder 不是线程安全的
- StringBuffer 是线程安全的，内部使用 synchronized 进行同步

推荐阅读：[聊聊 Java StringBuilder和StringBuffer 两兄弟](https://javabetter.cn/string/builder-buffer.html)

#### 字符串常量池

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

#### new String("abc")

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

### 三、运算

#### 参数传递

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

#### float 与 double

Java 不能隐式向下转型，因为这会使精度降低。

`1.1` 字面量属于 double 类型，不能直接将 `1.1` 赋值给 float 变量，因为这是向下转型。

```java
// float f = 1.1;
```

1.1f 字面量才是 float 类型。

```java
float f = 1.1f;
```

#### 隐式类型转换

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

#### switch

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

### 四、关键字

#### final

##### 1.变量

使用 final 修饰的变量被称为常量，常量在定义时必须进行初始化，并且初始化后值不可改变。

- 对于基本数据类型，final 修饰后的变量值不可改变。
- 对于引用数据类型，final 修饰后的引用不变，也就事不能引用其它对象，但是被引用的对象本身是可以修改的。

```java
final int x = 1;
// x = 2;  // cannot assign value to final variable 'x'
final A y = new A();
y.a = 1;
```

##### 2.方法 

final 修饰的方法不能被子类重写。

##### 3. 类

final 修饰的类不允许被继承。

推荐阅读：[一文彻底搞懂 Java final 关键字](https://javabetter.cn/oo/final.html)

#### static

##### 1.静态变量 

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

##### 2.静态方法

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

##### 3.静态代码块

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

##### 4.静态内部类

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

##### 5.静态导包

在使用静态变量和静态方法时不用再指明 ClassName，从而简化代码，但可读性大大降低，不推荐。

```java
import static com.xxx.ClassName.*
```

##### 6.代码的初始化顺序

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

### 五、Object 通用方法

#### 概览

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

#### equals()

##### 1. 等价关系

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

##### 2. 等价与相等

- 对于基本数据类型，可以使用 == 判断两个值是否相等。
- 对于引用数据类型，可以使用 == 判断两个变量是否引用了同一个对象，而 `equals()` 方法用于判断引用的对象是否等价。

```java
Integer x = new Integer(1);
Integer y = new Integer(1);
System.out.println(x.equals(y)); // true
System.out.println(x == y);      // false
```

##### 3. 如何实现equals方法

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

#### hashCode()

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

#### toString()

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

#### clone()

##### 1. cloneable 接口

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

##### 2. 浅拷贝

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

##### 3. 深拷贝

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

##### 4. clone() 的替代方案

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

### 六、继承

#### 访问权限

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

#### 抽象类与接口

##### 1. 抽象类

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

##### 2. 接口

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

##### 3. 抽象类和接口比较 

- 从设计层面上看，抽象类提供了一种 IS-A 的关系，需要满足里式替换原则，即子类对象必须能够替换掉所有父类对象。而接口更像是一种 LIKE-A 关系，它只是提供一种方法实现契约，并不要求接口和实现接口的类具有 IS-A 关系。
- 从使用上来看，一个类可以实现多个接口，但是不能继承多个抽象类。
- 接口的字段只能是 static 和 final 类型的，而抽象类的字段没有这种限制。
- 接口的成员只能是 public 的，而抽象类的成员可以有多种访问权限。

##### 4. 抽象类和接口的使用选择

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


#### super 关键字

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

#### 重写与重载

##### 1. 重写（Override） 

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

##### 2. 重载（Overload） 

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

### 七、反射

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

### 八、异常

Throwable 可以用来表示任何可以作为异常抛出的类，分为两种：  **Error**   和 **Exception**。其中 Error 用来表示 JVM 无法处理的错误，Exception 分为两种：

-   **受检异常**  ：需要用 try...catch... 语句捕获并进行处理，并且可以从异常中恢复；
-   **非受检异常**  ：程序运行时错误，例如除 0 会引发 Arithmetic Exception，此时程序崩溃并且无法恢复。

![二哥的 Java 进阶之路：异常](https://cdn.tobebetterjavaer.com/studymore/gailan-20230326090207.png)

推荐阅读：[一文彻底搞懂Java异常处理](https://javabetter.cn/exception/gailan.html)

### 九、泛型

```java
public class Box<T> {
    // T stands for "Type"
    private T t;
    public void set(T t) { this.t = t; }
    public T get() { return t; }
}
```

推荐阅读：[Java 泛型深入解析](https://javabetter.cn/collection/generic.html)

### 十、注解

Java 注解是附加在代码中的一些元信息，用于一些工具在编译、运行时进行解析和使用，起到说明、配置的功能。注解不会也不能影响代码的实际逻辑，仅仅起到辅助性的作用。

推荐阅读：[深入理解Java中的注解](https://javabetter.cn/basic-extra-meal/annotation.html)

### 十一、特性

#### Java 各版本的新特性

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

#### JRE or JDK

- JRE：Java Runtime Environment，Java 运行环境的简称，为 Java 的运行提供所需环境。它是一个 JVM 程序，主要包括了 JVM 的标准实现和一些 Java 基本类库。
- JDK：Java Development Kit，Java 开发工具包，提供了 Java 的开发及运行环境。JDK 是 Java 开发的核心，集成了 JRE 以及一些其它的工具，比如编译 Java 源码的编译器 javac 等。

### 参考资料

CS-Notes，原文档地址：[https://github.com/CyC2018/CS-Notes/](https://github.com/CyC2018/CS-Notes/blob/master/notes/Java%20%E5%9F%BA%E7%A1%80.md)

## 第二章、IO 篇

### 一、概览

Java 的 I/O 大概可以分成以下几类：

- 磁盘操作：File
- 字节操作：InputStream 和 OutputStream
- 字符操作：Reader 和 Writer
- 对象操作：Serializable
- 网络操作：Socket
- 新的输入/输出：NIO

### 二、磁盘操作

File 类可以用于表示文件和目录的信息，但是它不表示文件的内容。

来看一个递归列出目录下所有文件的例子：

```java
public static void listAllFiles(File dir) {
    if (dir == null || !dir.exists()) {
        return;
    }
    if (dir.isFile()) {
        System.out.println(dir.getName());
        return;
    }
    for (File file : dir.listFiles()) {
        listAllFiles(file);
    }
}
```

从 Java 7 开始，可以使用 Paths 和 Files 代替 File。

推荐阅读：

- [Java File：IO 流的起点与终点](https://javabetter.cn/io/file-path.html)
- [聊聊 Java NIO 中的Paths 和 Files](https://javabetter.cn/nio/paths-files.html)

### 三、字节操作

#### 实现文件复制

```java
public static void copyFile(String src, String dist) throws IOException {
    FileInputStream in = new FileInputStream(src);
    FileOutputStream out = new FileOutputStream(dist);

    byte[] buffer = new byte[20 * 1024];
    int cnt;

    // read() 最多读取 buffer.length 个字节
    // 返回的是实际读取的个数
    // 返回 -1 的时候表示读到 eof，即文件尾
    while ((cnt = in.read(buffer, 0, buffer.length)) != -1) {
        out.write(buffer, 0, cnt);
    }

    in.close();
    out.close();
}
```

#### 装饰者模式

Java I/O 使用了装饰者模式来实现。

![cyc2018：InputStream](https://cdn.tobebetterjavaer.com/stutymore/java-io-20240606165832.png)

以 InputStream 为例：

- InputStream 是抽象组件；
- FileInputStream 是 InputStream 的子类，属于具体组件，提供了字节流的输入操作；
- FilterInputStream 属于抽象装饰者，装饰者用于装饰组件，为组件提供额外的功能。例如 BufferedInputStream 为 FileInputStream 提供缓存的功能。

实例化一个具有缓存功能的字节流对象时，只需要在 FileInputStream 对象上再套一层 BufferedInputStream 对象即可。

```java
FileInputStream fileInputStream = new FileInputStream(filePath);
BufferedInputStream bufferedInputStream = new BufferedInputStream(fileInputStream);
```

DataInputStream 装饰者提供了对更多数据类型进行输入的操作，比如 int、double 等基本类型。

### 四、字符操作

#### 编码与解码

编码就是把字符转换为字节，而解码是把字节重新组合成字符。

如果编码和解码过程使用不同的编码方式那么就出现了乱码。

- GBK 编码中，中文字符占 2 个字节，英文字符占 1 个字节；
- UTF-8 编码中，中文字符占 3 个字节，英文字符占 1 个字节；
- UTF-16be 编码中，中文字符和英文字符都占 2 个字节。

UTF-16be 中的 be 指的是 Big Endian，也就是大端。相应地也有 UTF-16le，le 指的是 Little Endian，也就是小端。

Java 的内存编码使用双字节编码 UTF-16be，这不是指 Java 只支持这一种编码方式，而是说 char 这种类型使用 UTF-16be 进行编码。char 类型占 16 位，也就是两个字节，Java 使用这种双字节编码是为了让一个中文或者一个英文都能使用一个 char 来存储。

推荐阅读：[解决中文乱码：字符编码全攻略 - ASCII、Unicode、UTF-8、GB2312详解](https://javabetter.cn/basic-extra-meal/java-unicode.html)

#### String 的编码方式

String 可以看成一个字符序列，可以指定一个编码方式将它编码为字节序列，也可以指定一个编码方式将一个字节序列解码为 String。

```java
String str1 = "中文";
byte[] bytes = str1.getBytes("UTF-8");
String str2 = new String(bytes, "UTF-8");
System.out.println(str2);
```

在调用无参数 `getBytes()` 方法时，默认的编码方式不是 UTF-16be。双字节编码的好处是可以使用一个 char 存储中文和英文，而将 String 转为 `bytes[]` 字节数组就不再需要这个好处，因此也就不再需要双字节编码。`getBytes()` 的默认编码方式与平台有关，一般为 UTF-8。

```java
byte[] bytes = str1.getBytes();
```

#### Reader 与 Writer

不管是磁盘还是网络传输，最小的存储单元都是字节，而不是字符。但是在程序中操作的通常是字符形式的数据，因此需要提供对字符进行操作的方法。

- InputStreamReader 实现从字节流解码成字符流；
- OutputStreamWriter 实现字符流编码成为字节流。

推荐阅读：[Java 字符流：Reader和Writer的故事](https://javabetter.cn/io/reader-writer.html)

#### 实现逐行输出文本文件的内容

```java
public static void readFileContent(String filePath) throws IOException {

    FileReader fileReader = new FileReader(filePath);
    BufferedReader bufferedReader = new BufferedReader(fileReader);

    String line;
    while ((line = bufferedReader.readLine()) != null) {
        System.out.println(line);
    }

    // 装饰者模式使得 BufferedReader 组合了一个 Reader 对象
    // 在调用 BufferedReader 的 close() 方法时会去调用 Reader 的 close() 方法
    // 因此只要一个 close() 调用即可
    bufferedReader.close();
}
```

> 微信搜索《**沉默王二**》或者微信扫下面的二维码，关注后回复《**java**》即可获取最新的 PDF 版本。

![手机端可以长按识别](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

### 五、对象操作

#### 序列化

序列化就是将一个对象转换成字节序列，方便存储和传输。

- 序列化：`ObjectOutputStream.writeObject()`
- 反序列化：`ObjectInputStream.readObject()`

不会对静态变量进行序列化，因为序列化只是保存对象的状态，静态变量属于类的状态。

推荐阅读：[Java 序列流：Java 对象的序列化和反序列化](https://javabetter.cn/io/serialize.html)

#### Serializable

序列化的类需要实现 Serializable 接口，它只是一个标准，没有任何方法需要实现，但是如果不去实现它的话而进行序列化，会抛出异常。

```java
public static void main(String[] args) throws IOException, ClassNotFoundException {

    A a1 = new A(123, "abc");
    String objectFile = "file/a1";

    ObjectOutputStream objectOutputStream = new ObjectOutputStream(new FileOutputStream(objectFile));
    objectOutputStream.writeObject(a1);
    objectOutputStream.close();

    ObjectInputStream objectInputStream = new ObjectInputStream(new FileInputStream(objectFile));
    A a2 = (A) objectInputStream.readObject();
    objectInputStream.close();
    System.out.println(a2);
}

private static class A implements Serializable {

    private int x;
    private String y;

    A(int x, String y) {
        this.x = x;
        this.y = y;
    }

    @Override
    public String toString() {
        return "x = " + x + "  " + "y = " + y;
    }
}
```

推荐阅读：[Java Serializable 接口：明明就一个空的接口嘛](https://javabetter.cn/io/Serializbale.html)

#### transient

transient 关键字可以使一些属性（字段）不会被序列化。

ArrayList 中存储数据的数组 elementData 是用 transient 修饰的，因为这个数组是动态扩展的，并不是所有的空间都被使用，因此就不需要所有的内容都被序列化。

通过重写序列化和反序列化方法，使得可以只序列化数组中有内容的那部分数据。

```java
private transient Object[] elementData;
```

推荐阅读：[深入探讨 Java transient 关键字](https://javabetter.cn/io/transient.html)

### 六、网络操作

Java 中的网络支持：

- InetAddress：用于表示网络上的硬件资源，即 IP 地址；
- URL：统一资源定位符；
- Sockets：使用 TCP 协议实现网络通信；
- Datagram：使用 UDP 协议实现网络通信。

#### InetAddress

没有公有的构造方法，只能通过静态方法来创建实例。

```java
InetAddress.getByName(String host);
InetAddress.getByAddress(byte[] address);
```

#### URL

可以直接从 URL 中读取字节流数据。

```java
public static void main(String[] args) throws IOException {

    URL url = new URL("https://www.javabetter.cn");

    /* 字节流 */
    InputStream is = url.openStream();

    /* 字符流 */
    InputStreamReader isr = new InputStreamReader(is, "utf-8");

    /* 提供缓存功能 */
    BufferedReader br = new BufferedReader(isr);

    String line;
    while ((line = br.readLine()) != null) {
        System.out.println(line);
    }

    br.close();
}
```

推荐阅读：[Java网络编程的基础：计算机网络](https://javabetter.cn/socket/network-base.html)

#### Sockets

![cyc2018：服务端和客户端模型](https://cdn.tobebetterjavaer.com/stutymore/java-io-20240606170549.png)

- ServerSocket：服务器端类
- Socket：客户端类
- 服务器和客户端通过 InputStream 和 OutputStream 进行输入输出。

推荐阅读：[Java Socket：飞鸽传书的网络套接字](https://javabetter.cn/socket/socket.html)

#### Datagram

- DatagramSocket：通信类
- DatagramPacket：数据包类

### 七、NIO

新的输入/输出 (NIO) 库是在 JDK 1.4 中引入的，弥补了原来 I/O 的不足，提供了高速的、面向块的 I/O。

#### 流与块

I/O 与 NIO 最重要的区别是数据打包和传输的方式，I/O 以流的方式处理数据，而 NIO 以块的方式处理数据。

面向流的 I/O 一次处理一个字节数据：一个输入流产生一个字节数据，一个输出流消费一个字节数据。为流式数据创建过滤器非常容易，链接几个过滤器，以便每个过滤器只负责复杂处理机制的一部分。不利的一面是，面向流的 I/O 通常相当慢。

面向块的 I/O 一次处理一个数据块，按块处理数据比按流处理数据要快得多。但是面向块的 I/O 缺少一些面向流的 I/O 所具有的优雅性和简单性。

I/O 包和 NIO 已经很好地集成了，java.io.\* 已经以 NIO 为基础重新实现了，所以现在它可以利用 NIO 的一些特性。例如，java.io.\* 包中的一些类包含以块的形式读写数据的方法，这使得即使在面向流的系统中，处理速度也会更快。

#### 通道与缓冲区

##### 1. 通道

通道 Channel 是对原 I/O 包中流的模拟，可以通过它读取和写入数据。

通道与流的不同之处在于，流只能在一个方向上移动(一个流必须是 InputStream 或者 OutputStream 的子类)，而通道是双向的，可以用于读、写或者同时用于读写。

通道包括以下类型：

- FileChannel：从文件中读写数据；
- DatagramChannel：通过 UDP 读写网络中数据；
- SocketChannel：通过 TCP 读写网络中数据；
- ServerSocketChannel：可以监听新进来的 TCP 连接，对每一个新进来的连接都会创建一个 SocketChannel。

##### 2. 缓冲区

发送给通道的所有数据都必须首先放到缓冲区中，同样地，从通道中读取的任何数据都要先读到缓冲区中。也就是说，不会直接对通道进行读写数据，而是要先经过缓冲区。

缓冲区实质上是一个数组，但它不仅仅是一个数组。缓冲区提供了对数据的结构化访问，而且还可以跟踪系统的读/写进程。

缓冲区包括以下类型：

- ByteBuffer
- CharBuffer
- ShortBuffer
- IntBuffer
- LongBuffer
- FloatBuffer
- DoubleBuffer

#### 缓冲区状态变量

- capacity：最大容量；
- position：当前已经读写的字节数；
- limit：还可以读写的字节数。

状态变量的改变过程举例：

① 新建一个大小为 8 个字节的缓冲区，此时 position 为 0，而 limit = capacity = 8。capacity 变量不会改变，下面的讨论会忽略它。

![cyc2018：limit = capacity](https://cdn.tobebetterjavaer.com/stutymore/java-io-20240606180609.png)

② 从输入通道中读取 5 个字节数据写入缓冲区中，此时 position 为 5，limit 保持不变。

![cyc2018：position 不变](https://cdn.tobebetterjavaer.com/stutymore/java-io-20240606180749.png)

③ 在将缓冲区的数据写到输出通道之前，需要先调用 `flip()` 方法，这个方法将 limit 设置为当前 position，并将 position 设置为 0。

![cyc2018：limit 和 position 重新改变](https://cdn.tobebetterjavaer.com/stutymore/java-io-20240606180846.png)

④ 从缓冲区中取 4 个字节到输出缓冲中，此时 position 设为 4。

![cyc2018：读取 4 个字节](https://cdn.tobebetterjavaer.com/stutymore/java-io-20240606180919.png)

⑤ 最后需要调用 `clear()` 方法来清空缓冲区，此时 position 和 limit 都被设置为最初位置。

![cyc2018：恢复到初始状态](https://cdn.tobebetterjavaer.com/stutymore/java-io-20240606180948.png)

推荐阅读：[详解Java NIO的Buffer缓冲区和Channel通道](https://javabetter.cn/nio/buffer-channel.html)

#### 文件 NIO 实例

以下展示了使用 NIO 快速复制文件的实例：

```java
public static void fastCopy(String src, String dist) throws IOException {

    /* 获得源文件的输入字节流 */
    FileInputStream fin = new FileInputStream(src);

    /* 获取输入字节流的文件通道 */
    FileChannel fcin = fin.getChannel();

    /* 获取目标文件的输出字节流 */
    FileOutputStream fout = new FileOutputStream(dist);

    /* 获取输出字节流的文件通道 */
    FileChannel fcout = fout.getChannel();

    /* 为缓冲区分配 1024 个字节 */
    ByteBuffer buffer = ByteBuffer.allocateDirect(1024);

    while (true) {

        /* 从输入通道中读取数据到缓冲区中 */
        int r = fcin.read(buffer);

        /* read() 返回 -1 表示 EOF */
        if (r == -1) {
            break;
        }

        /* 切换读写 */
        buffer.flip();

        /* 把缓冲区的内容写入输出文件中 */
        fcout.write(buffer);

        /* 清空缓冲区 */
        buffer.clear();
    }
}
```

#### 选择器

NIO 常常被叫做非阻塞 IO，主要是因为 NIO 在网络通信中的非阻塞特性被广泛使用。

NIO 实现了 IO 多路复用中的 Reactor 模型，一个线程 Thread 使用一个选择器 Selector 通过轮询的方式去监听多个通道 Channel 上的事件，从而让一个线程就可以处理多个事件。

通过配置监听的通道 Channel 为非阻塞，那么当 Channel 上的 IO 事件还未到达时，就不会进入阻塞状态一直等待，而是继续轮询其它 Channel，找到 IO 事件已经到达的 Channel 执行。

因为创建和切换线程的开销很大，因此使用一个线程来处理多个事件而不是一个线程处理一个事件，对于 IO 密集型的应用具有很好地性能。

应该注意的是，只有 SocketChannel 才能配置为非阻塞，FileChannel 不能，为 FileChannel 配置非阻塞也没有意义。

![CYC2018：IO 多路复用](https://cdn.tobebetterjavaer.com/stutymore/java-io-20240606181154.png)

##### 1. 创建选择器

```java
Selector selector = Selector.open();
```

##### 2. 将通道注册到选择器上

```java
ServerSocketChannel ssChannel = ServerSocketChannel.open();
ssChannel.configureBlocking(false);
ssChannel.register(selector, SelectionKey.OP_ACCEPT);
```

通道必须配置为非阻塞模式，否则使用选择器就没有任何意义了，因为如果通道在某个事件上被阻塞，那么服务器就不能响应其它事件，必须等待这个事件处理完毕才能去处理其它事件，显然这和选择器的作用背道而驰。

在将通道注册到选择器上时，还需要指定要注册的具体事件，主要有以下几类：

- SelectionKey.OP_CONNECT
- SelectionKey.OP_ACCEPT
- SelectionKey.OP_READ
- SelectionKey.OP_WRITE

它们在 SelectionKey 的定义如下：

```java
public static final int OP_READ = 1 << 0;
public static final int OP_WRITE = 1 << 2;
public static final int OP_CONNECT = 1 << 3;
public static final int OP_ACCEPT = 1 << 4;
```

可以看出每个事件可以被当成一个位域，从而组成事件集整数。例如：

```java
int interestSet = SelectionKey.OP_READ | SelectionKey.OP_WRITE;
```

##### 3. 监听事件

```java
int num = selector.select();
```

使用 `select()` 来监听到达的事件，它会一直阻塞直到有至少一个事件到达。

##### 4. 获取到达的事件

```java
Set<SelectionKey> keys = selector.selectedKeys();
Iterator<SelectionKey> keyIterator = keys.iterator();
while (keyIterator.hasNext()) {
    SelectionKey key = keyIterator.next();
    if (key.isAcceptable()) {
        // ...
    } else if (key.isReadable()) {
        // ...
    }
    keyIterator.remove();
}
```

##### 5. 事件循环

因为一次 `select()` 调用不能处理完所有的事件，并且服务器端有可能需要一直监听事件，因此服务器端处理事件的代码一般会放在一个死循环内。

```java
while (true) {
    int num = selector.select();
    Set<SelectionKey> keys = selector.selectedKeys();
    Iterator<SelectionKey> keyIterator = keys.iterator();
    while (keyIterator.hasNext()) {
        SelectionKey key = keyIterator.next();
        if (key.isAcceptable()) {
            // ...
        } else if (key.isReadable()) {
            // ...
        }
        keyIterator.remove();
    }
}
```

#### 套接字 NIO 实例

```java
public class NIOServer {

    public static void main(String[] args) throws IOException {

        Selector selector = Selector.open();

        ServerSocketChannel ssChannel = ServerSocketChannel.open();
        ssChannel.configureBlocking(false);
        ssChannel.register(selector, SelectionKey.OP_ACCEPT);

        ServerSocket serverSocket = ssChannel.socket();
        InetSocketAddress address = new InetSocketAddress("127.0.0.1", 8888);
        serverSocket.bind(address);

        while (true) {

            selector.select();
            Set<SelectionKey> keys = selector.selectedKeys();
            Iterator<SelectionKey> keyIterator = keys.iterator();

            while (keyIterator.hasNext()) {

                SelectionKey key = keyIterator.next();

                if (key.isAcceptable()) {

                    ServerSocketChannel ssChannel1 = (ServerSocketChannel) key.channel();

                    // 服务器会为每个新连接创建一个 SocketChannel
                    SocketChannel sChannel = ssChannel1.accept();
                    sChannel.configureBlocking(false);

                    // 这个新连接主要用于从客户端读取数据
                    sChannel.register(selector, SelectionKey.OP_READ);

                } else if (key.isReadable()) {

                    SocketChannel sChannel = (SocketChannel) key.channel();
                    System.out.println(readDataFromSocketChannel(sChannel));
                    sChannel.close();
                }

                keyIterator.remove();
            }
        }
    }

    private static String readDataFromSocketChannel(SocketChannel sChannel) throws IOException {

        ByteBuffer buffer = ByteBuffer.allocate(1024);
        StringBuilder data = new StringBuilder();

        while (true) {

            buffer.clear();
            int n = sChannel.read(buffer);
            if (n == -1) {
                break;
            }
            buffer.flip();
            int limit = buffer.limit();
            char[] dst = new char[limit];
            for (int i = 0; i < limit; i++) {
                dst[i] = (char) buffer.get(i);
            }
            data.append(dst);
            buffer.clear();
        }
        return data.toString();
    }
}
```

客户端：

```java
public class NIOClient {

    public static void main(String[] args) throws IOException {
        Socket socket = new Socket("127.0.0.1", 8888);
        OutputStream out = socket.getOutputStream();
        String s = "hello world";
        out.write(s.getBytes());
        out.close();
    }
}
```

推荐阅读：[一文彻底理解Java IO模型](https://javabetter.cn/nio/moxing.html)

#### 内存映射文件

内存映射文件 I/O 是一种读和写文件数据的方法，它可以比常规的基于流或者基于通道的 I/O 快得多。

向内存映射文件写入可能是危险的，只是改变数组的单个元素这样的简单操作，就可能会直接修改磁盘上的文件。修改数据与将数据保存到磁盘是没有分开的。

下面代码行将文件的前 1024 个字节映射到内存中，`map()` 方法返回一个 MappedByteBuffer，它是 ByteBuffer 的子类。因此，可以像使用其他任何 ByteBuffer 一样使用新映射的缓冲区，操作系统会在需要时负责执行映射。

```java
MappedByteBuffer mbb = fc.map(FileChannel.MapMode.READ_WRITE, 0, 1024);
```

#### 对比

NIO 与普通 I/O 的区别主要有以下两点：

- NIO 是非阻塞的；
- NIO 面向块，I/O 面向流。

### 八、参考资料

[https://github.com/CyC2018/CS-Notes/](https://github.com/CyC2018/CS-Notes/blob/master/notes/Java%20%E5%AE%B9%E5%99%A8.md)

> 微信搜索《**沉默王二**》或者微信扫下面的二维码，关注后回复《**java**》即可获取最新的 PDF 版本。

![手机端可以长按识别](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

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

## 第三章、容器/集合框架

### 一、概览

容器，也叫集合框架，主要包括 Collection 和 Map，Collection 又细分为 Set、List 和 Queue，Set 不常用，List 也就是列表，Queue 是队列；Map 是键值对集合。

![二哥的 Java 进阶之路-容器概览](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/gailan-01.png)

推荐阅读：[Java集合框架全面解析](https://javabetter.cn/collection/gailan.html)

#### Collection

##### 1. Set

- TreeSet：基于红黑树实现，支持有序操作，例如根据一个范围查找元素的操作。但是查找效率不如 HashSet，HashSet 查找的时间复杂度为 `O(1)`，TreeSet 则为 `O(logN)`。
- HashSet：基于哈希表实现，支持快速查找，但不支持有序性操作。并且失去了元素的插入顺序，也就是说使用 Iterator 遍历 HashSet 得到的结果是不确定的。
- LinkedHashSet：具有 HashSet 的查找效率，并且内部使用双向链表维护元素的插入顺序。

##### 2. List

- [ArrayList](https://javabetter.cn/collection/arraylist.html)：基于动态数组实现，支持随机访问。
- Vector：和 ArrayList 类似，但它是线程安全的，几乎已淘汰。
- [LinkedList](https://javabetter.cn/collection/linkedlist.html)：基于双向链表实现，只能顺序访问，但是可以快速地在链表中间插入和删除元素。不仅如此，LinkedList 还可以用作栈、队列。

##### 3. Queue

- LinkedList：意不意外，LinkedList 也可以用它来实现双向队列。
- [PriorityQueue](https://javabetter.cn/collection/PriorityQueue.html)：基于堆结构实现，可以用它来实现优先级队列。
- [ArrayDeque](https://javabetter.cn/collection/arraydeque.html)：双端队列，可以用来取代以前的 Stack。

#### Map

- [TreeMap](https://javabetter.cn/collection/treemap.html)：基于红黑树实现。
- [HashMap](https://javabetter.cn/collection/hashmap.html)：基于哈希表实现。
- HashTable：和 HashMap 类似，但它是线程安全的，这意味着同一时刻多个线程同时写入 HashTable 不会导致数据不一致。它是遗留类，已不推荐使用，替代品是 [ConcurrentHashMap](https://javabetter.cn/thread/ConcurrentHashMap.html)。
- [LinkedHashMap](https://javabetter.cn/collection/linkedhashmap.html)：使用双向链表来维护元素的顺序，顺序为插入顺序或者最近最少使用（LRU）顺序。

### 二、容器中的设计模式

#### 迭代器模式

Collection 继承了 Iterable 接口，其中的 `iterator()` 方法能够产生一个 Iterator 对象，通过这个对象就可以迭代遍历 Collection 中的元素。

![CYC2018-迭代器](https://cdn.tobebetterjavaer.com/stutymore/java-collection-20240606160103.png)

JDK 1.5 之后，可以使用 foreach 来遍历集合，非常方便。

```java
List<String> list = new ArrayList<>();
list.add("a");
list.add("b");
for (String item : list) {
    System.out.println(item);
}
```

推荐阅读：[Java迭代器Iterator和Iterable有什么区别？](https://javabetter.cn/collection/iterator-iterable.html)

#### 适配器模式

`java.util.Arrays#asList()` 可以把数组类型转换为 List 类型。

```java
@SafeVarargs
public static <T> List<T> asList(T... a)
```

需要注意的是，`asList()` 的参数为泛型的变长参数，不能使用基本数据类型的数组作为参数，只能使用相应的包装器类型数组。

```java
Integer[] arr = {1, 2, 3};
List list = Arrays.asList(arr);
```

也可以使用以下方式调用 asList()：

```java
List list = Arrays.asList(1, 2, 3);
```

> 微信搜索《**沉默王二**》或者微信扫下面的二维码，关注后回复《**java**》即可获取最新的 PDF 版本。

![手机端可以长按识别](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

### 三、源码分析

>如果没有特别说明，以下源码分析均基于 JDK 1.8。

#### ArrayList

##### 1. 概览

因为 ArrayList 是基于数组实现的，所以支持快速随机访问。RandomAccess 接口标识该类支持快速随机访问。

```java
public class ArrayList<E> extends AbstractList<E>
        implements List<E>, RandomAccess, Cloneable, java.io.Serializable
```

数组的默认大小为 10。

```java
private static final int DEFAULT_CAPACITY = 10;
```

![CYC2018：ArrayList](https://cdn.tobebetterjavaer.com/stutymore/java-collection-20240606160600.png)

##### 2. 扩容

添加元素时，`ensureCapacityInternal()` 方法会确认容量是否足够，如果不够时，需要使用 `grow()` 方法进行扩容，新容量的大小为 `oldCapacity + (oldCapacity >> 1)`，即 `oldCapacity+oldCapacity/2`。

其中 oldCapacity >> 1 需要取整，所以新容量大约是旧容量的 1.5 倍左右。（oldCapacity 为偶数就是 1.5 倍，为奇数就是 1.5 倍-0.5）

扩容操作需要调用 `Arrays.copyOf()` 把原数组复制到新数组中，这个操作代价很高，因此最好在创建 ArrayList 对象时就指定恰当的容量大小，以减少扩容操作的次数。

```java
public boolean add(E e) {
    ensureCapacityInternal(size + 1);  // Increments modCount!!
    elementData[size++] = e;
    return true;
}

private void ensureCapacityInternal(int minCapacity) {
    if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
        minCapacity = Math.max(DEFAULT_CAPACITY, minCapacity);
    }
    ensureExplicitCapacity(minCapacity);
}

private void ensureExplicitCapacity(int minCapacity) {
    modCount++;
    // overflow-conscious code
    if (minCapacity - elementData.length > 0)
        grow(minCapacity);
}

private void grow(int minCapacity) {
    // overflow-conscious code
    int oldCapacity = elementData.length;
    int newCapacity = oldCapacity + (oldCapacity >> 1);
    if (newCapacity - minCapacity < 0)
        newCapacity = minCapacity;
    if (newCapacity - MAX_ARRAY_SIZE > 0)
        newCapacity = hugeCapacity(minCapacity);
    // minCapacity is usually close to size, so this is a win:
    elementData = Arrays.copyOf(elementData, newCapacity);
}
```

##### 3. 删除元素

需要调用 `System.arraycopy()` 将 index+1 后面的元素复制到 index 位置上，该操作的时间复杂度为 O(N)，因此 ArrayList 删除元素的代价是非常高的。

```java
public E remove(int index) {
    rangeCheck(index);
    modCount++;
    E oldValue = elementData(index);
    int numMoved = size - index - 1;
    if (numMoved > 0)
        System.arraycopy(elementData, index+1, elementData, index, numMoved);
    elementData[--size] = null; // clear to let GC do its work
    return oldValue;
}
```

##### 4. 序列化

ArrayList 基于数组实现，并且具有动态扩容特性，因此保存元素的数组不一定都会被使用，那么就没有必要全部进行序列化。

保存元素的数组 elementData 使用了 transient 关键字修饰，该关键字声明数组默认不会被序列化。

```java
transient Object[] elementData; // non-private to simplify nested class access
```

ArrayList 实现了 `writeObject()` 和 `readObject()` 来控制只序列化数组中有元素填充的那部分内容。

```java
private void readObject(java.io.ObjectInputStream s)
    throws java.io.IOException, ClassNotFoundException {
    elementData = EMPTY_ELEMENTDATA;

    // Read in size, and any hidden stuff
    s.defaultReadObject();

    // Read in capacity
    s.readInt(); // ignored

    if (size > 0) {
        // be like clone(), allocate array based upon size not capacity
        ensureCapacityInternal(size);

        Object[] a = elementData;
        // Read in all elements in the proper order.
        for (int i=0; i<size; i++) {
            a[i] = s.readObject();
        }
    }
}
```

序列化：

```java
private void writeObject(java.io.ObjectOutputStream s)
    throws java.io.IOException{
    // Write out element count, and any hidden stuff
    int expectedModCount = modCount;
    s.defaultWriteObject();

    // Write out size as capacity for behavioural compatibility with clone()
    s.writeInt(size);

    // Write out all elements in the proper order.
    for (int i=0; i<size; i++) {
        s.writeObject(elementData[i]);
    }

    if (modCount != expectedModCount) {
        throw new ConcurrentModificationException();
    }
}
```

序列化时需要使用 ObjectOutputStream 的 `writeObject()` 将对象转换为字节流并输出。而 `writeObject()` 方法在传入的对象存在 `writeObject()` 的时候会去反射调用该对象的 `writeObject()` 来实现序列化。反序列化使用的是 ObjectInputStream 的 `readObject()` 方法，原理类似。

```java
ArrayList list = new ArrayList();
ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(file));
oos.writeObject(list);
```

推荐阅读：[深入探讨 Java ArrayList](https://javabetter.cn/collection/arraylist.html)

##### 5. Fail-Fast

modCount 用来记录 ArrayList 结构发生变化的次数。结构发生变化是指添加或者删除至少一个元素的所有操作，或者是调整内部数组的大小，仅仅只是设置元素的值不算结构发生变化。

在进行序列化或者迭代等操作时，需要比较操作前后 modCount 是否改变，如果改变了需要抛出 ConcurrentModificationException。代码参考上节序列化中的 `writeObject()` 方法。

推荐阅读：[阿里Java开发规约：禁止在foreach里执行元素的删除操作](https://javabetter.cn/collection/fail-fast.html)

#### Vector

##### 1. 同步

Vector 的实现与 ArrayList 类似，但是使用了 synchronized 进行同步。

```java
public synchronized boolean add(E e) {
    modCount++;
    ensureCapacityHelper(elementCount + 1);
    elementData[elementCount++] = e;
    return true;
}

public synchronized E get(int index) {
    if (index >= elementCount)
        throw new ArrayIndexOutOfBoundsException(index);

    return elementData(index);
}
```

##### 2. 扩容

Vector 的构造方法可以传入 capacityIncrement 参数，它的作用是在扩容时使容量 capacity 增长 capacityIncrement。如果这个参数的值小于等于 0，扩容时每次都令 capacity 为原来的两倍。

```java
public Vector(int initialCapacity, int capacityIncrement) {
    super();
    if (initialCapacity < 0)
        throw new IllegalArgumentException("Illegal Capacity: "+
                                           initialCapacity);
    this.elementData = new Object[initialCapacity];
    this.capacityIncrement = capacityIncrement;
} 

private void grow(int minCapacity) {
    // overflow-conscious code
    int oldCapacity = elementData.length;
    int newCapacity = oldCapacity + ((capacityIncrement > 0) ?
                                     capacityIncrement : oldCapacity);
    if (newCapacity - minCapacity < 0)
        newCapacity = minCapacity;
    if (newCapacity - MAX_ARRAY_SIZE > 0)
        newCapacity = hugeCapacity(minCapacity);
    elementData = Arrays.copyOf(elementData, newCapacity);
}
```

调用没有 capacityIncrement 的构造函数时，capacityIncrement 值被设置为 0，也就是说默认情况下 Vector 每次扩容时容量都会翻倍。

```java
public Vector(int initialCapacity) {
    this(initialCapacity, 0);
}

public Vector() {
    this(10);
}
```

##### 3. 与 ArrayList 的比较

- Vector 是同步的，因此开销比 ArrayList 要大，访问速度更慢。最好使用 ArrayList 而不是 Vector，实际上 Vector 几乎已经不再使用了。
- Vector 每次扩容请求其大小的 2 倍（也可以通过构造函数设置增长的容量），而 ArrayList 是 1.5 倍。

##### 4. 替代方案

可以使用 `Collections.synchronizedList();` 得到一个线程安全的 ArrayList。

```java
List<String> list = new ArrayList<>();
List<String> synList = Collections.synchronizedList(list);
```

也可以使用 concurrent 并发包下的 [CopyOnWriteArrayList](https://javabetter.cn/thread/CopyOnWriteArrayList.html) 类。

```java
List<String> list = new CopyOnWriteArrayList<>();
```

#### CopyOnWriteArrayList

##### 1. 读写分离

写操作是在数组的拷贝上进行的，读操作还是在原始数组中进行，读写分离，互不影响。

写操作需要加锁，防止并发写入时数据丢失。写操作结束之后需要把原始数组指向新的复制数组。

```java
public boolean add(E e) {
    final ReentrantLock lock = this.lock;
    lock.lock();
    try {
        Object[] elements = getArray();
        int len = elements.length;
        Object[] newElements = Arrays.copyOf(elements, len + 1);
        newElements[len] = e;
        setArray(newElements);
        return true;
    } finally {
        lock.unlock();
    }
}

final void setArray(Object[] a) {
    array = a;
}
```

读：

```java
@SuppressWarnings("unchecked")
private E get(Object[] a, int index) {
    return (E) a[index];
}
```

##### 2. 适用场景

CopyOnWriteArrayList 在写操作的同时允许读操作，大大提高了读操作的性能，因此很适合读多写少的应用场景。

但是 CopyOnWriteArrayList 有其缺陷：

- 内存占用：在写操作时需要复制一个新的数组，使得内存占用为原来的两倍左右；
- 数据不一致：读操作不能读取实时性的数据，因为部分写操作的数据还未同步到读数组中。

所以 CopyOnWriteArrayList 不适合内存敏感以及对实时性要求很高的场景。

推荐阅读：[吊打Java并发面试官之CopyOnWriteArrayList](https://javabetter.cn/thread/CopyOnWriteArrayList.html)

#### LinkedList

##### 1. 概览

![cyc2018：LinkedList](https://cdn.tobebetterjavaer.com/stutymore/java-collection-20240606162054.png)

LinkedList 基于双向链表实现，使用 Node 存储链表节点信息。

```java
private static class Node<E> {
    E item;
    Node<E> next;
    Node<E> prev;
}
```

每个链表存储了 first 和 last 指针：

```java
transient Node<E> first;
transient Node<E> last;
```

##### 2. 与 ArrayList 的比较

ArrayList 基于动态数组实现，LinkedList 基于双向链表实现。ArrayList 和 LinkedList 的区别可以归结为数组和链表的区别：

- 数组支持随机访问，但插入和删除的代价很高，需要移动大量元素；
- 链表不支持随机访问，但插入删除只需要改变指针。

推荐阅读：[深入探讨 Java LinkedList](https://javabetter.cn/collection/linkedlist.html)

#### HashMap

>注意，为了便于理解，以下源码分析以 JDK 1.7 为主。

##### 1. 存储结构

HashMap 内部包含了一个 Entry 类型的数组 table。Entry 存储着键值对。它包含了四个字段，从 next 字段我们可以看出 Entry 是一个链表。

![cyc2018：HashMap](https://cdn.tobebetterjavaer.com/stutymore/java-collection-20240606162421.png)

即数组中的每个位置被当成一个桶，一个桶存放一个链表。HashMap 使用拉链法来解决冲突，同一个链表中存放哈希值和数组长度取模运算结果相同的 Entry。



```java
transient Entry[] table;

static class Entry<K,V> implements Map.Entry<K,V> {
    final K key;
    V value;
    Entry<K,V> next;
    int hash;

    Entry(int h, K k, V v, Entry<K,V> n) {
        value = v;
        next = n;
        key = k;
        hash = h;
    }

    public final K getKey() {
        return key;
    }

    public final V getValue() {
        return value;
    }

    public final V setValue(V newValue) {
        V oldValue = value;
        value = newValue;
        return oldValue;
    }

    public final boolean equals(Object o) {
        if (!(o instanceof Map.Entry))
            return false;
        Map.Entry e = (Map.Entry)o;
        Object k1 = getKey();
        Object k2 = e.getKey();
        if (k1 == k2 || (k1 != null && k1.equals(k2))) {
            Object v1 = getValue();
            Object v2 = e.getValue();
            if (v1 == v2 || (v1 != null && v1.equals(v2)))
                return true;
        }
        return false;
    }

    public final int hashCode() {
        return Objects.hashCode(getKey()) ^ Objects.hashCode(getValue());
    }

    public final String toString() {
        return getKey() + "=" + getValue();
    }
}
```

##### 2. 拉链法的工作原理

```java
HashMap<String, String> map = new HashMap<>();
map.put("K1", "V1");
map.put("K2", "V2");
map.put("K3", "V3");
```

- 新建一个 HashMap，默认大小为 16；
- 插入 &lt;K1,V1\> 键值对，先计算 K1 的 hashCode 为 115，使用除留余数法得到所在的桶下标 115%16=3。
- 插入 &lt;K2,V2\> 键值对，先计算 K2 的 hashCode 为 118，使用除留余数法得到所在的桶下标 118%16=6。
- 插入 &lt;K3,V3\> 键值对，先计算 K3 的 hashCode 为 118，使用除留余数法得到所在的桶下标 118%16=6，插在 &lt;K2,V2\> 的前面。

需要注意到，链表的插入是以头插法方式进行的，例如上面的 &lt;K3,V3\> 不是插在 &lt;K2,V2\> 后面，而是插入在链表头部。

![cyc2018：拉链法](https://cdn.tobebetterjavaer.com/stutymore/java-collection-20240606162624.png)

查找需要分成两步进行：

- 计算键值对所在的桶；
- 在链表上顺序查找，时间复杂度显然和链表的长度成正比。



##### 3. put 操作

```java
public V put(K key, V value) {
    if (table == EMPTY_TABLE) {
        inflateTable(threshold);
    }
    // 键为 null 单独处理
    if (key == null)
        return putForNullKey(value);
    int hash = hash(key);
    // 确定桶下标
    int i = indexFor(hash, table.length);
    // 先找出是否已经存在键为 key 的键值对，如果存在的话就更新这个键值对的值为 value
    for (Entry<K,V> e = table[i]; e != null; e = e.next) {
        Object k;
        if (e.hash == hash && ((k = e.key) == key || key.equals(k))) {
            V oldValue = e.value;
            e.value = value;
            e.recordAccess(this);
            return oldValue;
        }
    }

    modCount++;
    // 插入新键值对
    addEntry(hash, key, value, i);
    return null;
}
```

HashMap 允许插入键为 null 的键值对。但是因为无法调用 null 的 `hashCode()` 方法，也就无法确定该键值对的桶下标，只能通过强制指定一个桶下标来存放。HashMap 使用第 0 个桶存放键为 null 的键值对。

```java
private V putForNullKey(V value) {
    for (Entry<K,V> e = table[0]; e != null; e = e.next) {
        if (e.key == null) {
            V oldValue = e.value;
            e.value = value;
            e.recordAccess(this);
            return oldValue;
        }
    }
    modCount++;
    addEntry(0, null, value, 0);
    return null;
}
```

使用链表的头插法，也就是新的键值对插在链表的头部，而不是链表的尾部。

```java
void addEntry(int hash, K key, V value, int bucketIndex) {
    if ((size >= threshold) && (null != table[bucketIndex])) {
        resize(2 * table.length);
        hash = (null != key) ? hash(key) : 0;
        bucketIndex = indexFor(hash, table.length);
    }

    createEntry(hash, key, value, bucketIndex);
}

void createEntry(int hash, K key, V value, int bucketIndex) {
    Entry<K,V> e = table[bucketIndex];
    // 头插法，链表头部指向新的键值对
    table[bucketIndex] = new Entry<>(hash, key, value, e);
    size++;
}
```

Entry 的构造方法：

```java
Entry(int h, K k, V v, Entry<K,V> n) {
    value = v;
    next = n;
    key = k;
    hash = h;
}
```

##### 4. 确定桶下标

很多操作都需要先确定一个键值对所在的桶下标。

```java
int hash = hash(key);
int i = indexFor(hash, table.length);
```

###### 4.1 计算 hash 值

```java
final int hash(Object k) {
    int h = hashSeed;
    if (0 != h && k instanceof String) {
        return sun.misc.Hashing.stringHash32((String) k);
    }

    h ^= k.hashCode();

    // This function ensures that hashCodes that differ only by
    // constant multiples at each bit position have a bounded
    // number of collisions (approximately 8 at default load factor).
    h ^= (h >>> 20) ^ (h >>> 12);
    return h ^ (h >>> 7) ^ (h >>> 4);
}
```

HashMap 的 hash 方法先获取一个 hashSeed，然后对 key 的 `hashCode()` 进行处理。如果 key 是字符串类型，就调用 `sun.misc.Hashing.stringHash32()` 方法计算字符串的 hash 值。

来看一下 Ojbect 的 `hashCode()` 方法：

```java
public final int hashCode() {
    return Objects.hashCode(key) ^ Objects.hashCode(value);
}
```

###### 4.2 取模 

令 x = 1\<\<4，即 x 为 2 的 4 次方，它具有以下性质：

```
x   : 00010000
x-1 : 00001111
```

令一个数 y 与 x-1 做与运算，可以去除 y 位级表示的第 4 位以上数：

```
y       : 10110010
x-1     : 00001111
y&(x-1) : 00000010
```

这个性质和 y 对 x 取模效果是一样的：

```
y   : 10110010
x   : 00010000
y%x : 00000010
```

我们知道，位运算的代价比求模运算小的多，因此在进行这种计算时用位运算的话能带来更高的性能。

确定桶下标的最后一步是将 key 的 hash 值对桶个数取模：`hash%capacity`，如果能保证 capacity 为 2 的 n 次方，那么就可以将这个操作转换为位运算。

```java
static int indexFor(int h, int length) {
    return h & (length-1);
}
```

##### 5. 扩容-基本原理

设 HashMap 的 table 长度为 M，需要存储的键值对数量为 N，如果哈希函数满足均匀性的要求，那么每条链表的长度大约为 N/M，因此查找的复杂度为 O(N/M)。

为了让查找的成本降低，应该使 N/M 尽可能小，因此需要保证 M 尽可能大，也就是说 table 要尽可能大。HashMap 采用动态扩容来根据当前的 N 值来调整 M 值，使得空间效率和时间效率都能得到保证。

和扩容相关的参数主要有：capacity、size、threshold 和 load_factor。

| 参数 | 含义 |
| :--: | :-- |
| capacity | table 的容量大小，默认为 16。需要注意的是 capacity 必须保证为 2 的 n 次方。|
| size | 键值对数量。 |
| threshold | size 的临界值，当 size 大于等于 threshold 就必须进行扩容操作。 |
| loadFactor | 装载因子，table 能够使用的比例，`threshold = (int)(capacity* loadFactor)`。 |

```java
static final int DEFAULT_INITIAL_CAPACITY = 16;

static final int MAXIMUM_CAPACITY = 1 << 30;

static final float DEFAULT_LOAD_FACTOR = 0.75f;

transient Entry[] table;

transient int size;

int threshold;

final float loadFactor;

transient int modCount;
```

从下面的添加元素代码中可以看出，当需要扩容时，令 capacity 为原来的两倍。

```java
void addEntry(int hash, K key, V value, int bucketIndex) {
    Entry<K,V> e = table[bucketIndex];
    table[bucketIndex] = new Entry<>(hash, key, value, e);
    if (size++ >= threshold)
        resize(2 * table.length);
}
```

扩容使用 `resize()` 实现，需要注意的是，扩容操作同样需要把 oldTable 的所有键值对重新插入 newTable 中，因此这一步是很费时的。

```java
void resize(int newCapacity) {
    Entry[] oldTable = table;
    int oldCapacity = oldTable.length;
    if (oldCapacity == MAXIMUM_CAPACITY) {
        threshold = Integer.MAX_VALUE;
        return;
    }
    Entry[] newTable = new Entry[newCapacity];
    transfer(newTable);
    table = newTable;
    threshold = (int)(newCapacity * loadFactor);
}

void transfer(Entry[] newTable) {
    Entry[] src = table;
    int newCapacity = newTable.length;
    for (int j = 0; j < src.length; j++) {
        Entry<K,V> e = src[j];
        if (e != null) {
            src[j] = null;
            do {
                Entry<K,V> next = e.next;
                int i = indexFor(e.hash, newCapacity);
                e.next = newTable[i];
                newTable[i] = e;
                e = next;
            } while (e != null);
        }
    }
}
```

##### 6. 扩容-重新计算桶下标

在进行扩容时，需要把键值对重新计算桶下标，从而放到对应的桶上。在前面提到，HashMap 使用 `hash%capacity` 来确定桶下标。HashMap capacity 为 2 的 n 次方这一特点能够极大降低重新计算桶下标操作的复杂度。

假设原数组长度 capacity 为 16，扩容之后 new capacity 为 32：

```html
capacity     : 00010000
new capacity : 00100000
```

对于一个 Key，它的哈希值 hash 在第 5 位：

- 为 0，那么 hash%00010000 = hash%00100000，桶位置和原来一致；
- 为 1，hash%00010000 = hash%00100000 + 16，桶位置是原位置 + 16。

##### 7. 计算数组容量

HashMap 构造方法允许用户传入的容量不是 2 的 n 次方，因为它可以自动地将传入的容量转换为 2 的 n 次方。

先考虑如何求一个数的掩码，对于 10010000，它的掩码为 11111111，可以使用以下方法得到：

```
mask |= mask >> 1    11011000
mask |= mask >> 2    11111110
mask |= mask >> 4    11111111
```

mask+1 是大于原始数字的最小的 2 的 n 次方。

```
num     10010000
mask+1 100000000
```

以下是 HashMap 中计算数组容量的代码：

```java
static final int tableSizeFor(int cap) {
    int n = cap - 1;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    return (n < 0) ? 1 : (n >= MAXIMUM_CAPACITY) ? MAXIMUM_CAPACITY : n + 1;
}
```

##### 8. 链表转红黑树

从 JDK 1.8 开始，一个桶存储的链表长度大于等于 8 时会将链表转换为红黑树。

##### 9. 与 Hashtable 的比较

- Hashtable 使用 synchronized 来进行同步。
- HashMap 可以插入键为 null 的 Entry。
- HashMap 的迭代器是 fail-fast 迭代器。
- HashMap 不能保证随着时间的推移 Map 中的元素次序是不变的。

推荐阅读：[Java HashMap详解](https://javabetter.cn/collection/hashmap.html)

#### ConcurrentHashMap

##### 1. 存储结构

![cyc2018：ConcurrentHashMap](https://cdn.tobebetterjavaer.com/stutymore/java-collection-20240606163737.png)

```java
static final class HashEntry<K,V> {
    final int hash;
    final K key;
    volatile V value;
    volatile HashEntry<K,V> next;
}
```

ConcurrentHashMap 和 HashMap 实现上类似，最主要的差别是 ConcurrentHashMap 采用了分段锁（Segment），每个分段锁维护着几个桶（HashEntry），多个线程可以同时访问不同分段锁上的桶，从而使其并发度更高（并发度就是 Segment 的个数）。

Segment 继承自 ReentrantLock。

```java
static final class Segment<K,V> extends ReentrantLock implements Serializable {

    private static final long serialVersionUID = 2249069246763182397L;

    static final int MAX_SCAN_RETRIES =
        Runtime.getRuntime().availableProcessors() > 1 ? 64 : 1;

    transient volatile HashEntry<K,V>[] table;

    transient int count;

    transient int modCount;

    transient int threshold;

    final float loadFactor;
}
```

多个分段锁：

```java
final Segment<K,V>[] segments;
```

默认的并发级别为 16，也就是说默认创建 16 个 Segment。

```java
static final int DEFAULT_CONCURRENCY_LEVEL = 16;
```

##### 2. size 操作

每个 Segment 维护了一个 count 变量来统计该 Segment 中的键值对个数。

```java
/**
 * The number of elements. Accessed only either within locks
 * or among other volatile reads that maintain visibility.
 */
transient int count;
```

在执行 size 操作时，需要遍历所有 Segment 然后把 count 累计起来。

ConcurrentHashMap 在执行 size 操作时先尝试不加锁，如果连续两次不加锁操作得到的结果一致，那么可以认为这个结果是正确的。

尝试次数使用 RETRIES_BEFORE_LOCK 定义，该值为 2，retries 初始值为 -1，因此尝试次数为 3。

如果尝试的次数超过 3 次，就需要对每个 Segment 加锁。

```java
/**
 * Number of unsynchronized retries in size and containsValue
 * methods before resorting to locking. This is used to avoid
 * unbounded retries if tables undergo continuous modification
 * which would make it impossible to obtain an accurate result.
 */
static final int RETRIES_BEFORE_LOCK = 2;

public int size() {
    // Try a few times to get accurate count. On failure due to
    // continuous async changes in table, resort to locking.
    final Segment<K,V>[] segments = this.segments;
    int size;
    boolean overflow; // true if size overflows 32 bits
    long sum;         // sum of modCounts
    long last = 0L;   // previous sum
    int retries = -1; // first iteration isn't retry
    try {
        for (;;) {
            // 超过尝试次数，则对每个 Segment 加锁
            if (retries++ == RETRIES_BEFORE_LOCK) {
                for (int j = 0; j < segments.length; ++j)
                    ensureSegment(j).lock(); // force creation
            }
            sum = 0L;
            size = 0;
            overflow = false;
            for (int j = 0; j < segments.length; ++j) {
                Segment<K,V> seg = segmentAt(segments, j);
                if (seg != null) {
                    sum += seg.modCount;
                    int c = seg.count;
                    if (c < 0 || (size += c) < 0)
                        overflow = true;
                }
            }
            // 连续两次得到的结果一致，则认为这个结果是正确的
            if (sum == last)
                break;
            last = sum;
        }
    } finally {
        if (retries > RETRIES_BEFORE_LOCK) {
            for (int j = 0; j < segments.length; ++j)
                segmentAt(segments, j).unlock();
        }
    }
    return overflow ? Integer.MAX_VALUE : size;
}
```

##### 3. JDK 1.8 的改动

JDK 1.7 使用分段锁机制来实现并发更新操作，核心类为 Segment，它继承自重入锁 ReentrantLock，并发度与 Segment 数量相等。

JDK 1.8 使用了 CAS 操作来支持更高的并发度，在 CAS 操作失败时使用内置锁 synchronized。

并且 JDK 1.8 的实现也在链表过长时会转换为红黑树。

推荐阅读：[吊打Java并发面试官之ConcurrentHashMap](https://javabetter.cn/thread/ConcurrentHashMap.html)

#### LinkedHashMap

##### 存储结构

继承自 HashMap，因此具有和 HashMap 一样的快速查找特性。

```java
public class LinkedHashMap<K,V> extends HashMap<K,V> implements Map<K,V>
```

内部维护了一个双向链表，用来维护插入顺序或者 LRU 顺序。

```java
/**
 * The head (eldest) of the doubly linked list.
 */
transient LinkedHashMap.Entry<K,V> head;

/**
 * The tail (youngest) of the doubly linked list.
 */
transient LinkedHashMap.Entry<K,V> tail;
```

accessOrder 决定了顺序，默认为 false，此时维护的是插入顺序。

```java
final boolean accessOrder;
```

LinkedHashMap 最重要的是用于维护顺序的方法，它们会在 put、get 等方法中被调用。

```java
void afterNodeAccess(Node<K,V> p) { }
void afterNodeInsertion(boolean evict) { }
```

##### afterNodeAccess()

当一个节点被访问时，如果 accessOrder 为 true，则会将该节点移到链表尾部。也就是说指定为 LRU 顺序之后，在每次访问一个节点时，会将这个节点移到链表尾部，保证链表尾部是最近访问的节点，那么链表头部就是最近最久未使用的节点。

```java
void afterNodeAccess(Node<K,V> e) { // move node to last
    LinkedHashMap.Entry<K,V> last;
    if (accessOrder && (last = tail) != e) {
        LinkedHashMap.Entry<K,V> p =
            (LinkedHashMap.Entry<K,V>)e, b = p.before, a = p.after;
        p.after = null;
        if (b == null)
            head = a;
        else
            b.after = a;
        if (a != null)
            a.before = b;
        else
            last = b;
        if (last == null)
            head = p;
        else {
            p.before = last;
            last.after = p;
        }
        tail = p;
        ++modCount;
    }
}
```

##### afterNodeInsertion()

在 put 等操作之后执行，当 `removeEldestEntry()` 方法返回 true 时会移除最晚的节点，也就是链表头部节点 first。

evict 只有在构建 Map 的时候才为 false，在这里为 true。

```java
void afterNodeInsertion(boolean evict) { // possibly remove eldest
    LinkedHashMap.Entry<K,V> first;
    if (evict && (first = head) != null && removeEldestEntry(first)) {
        K key = first.key;
        removeNode(hash(key), key, null, false, true);
    }
}
```

`removeEldestEntry()` 默认为 false，如果需要让它为 true，需要继承 LinkedHashMap 并且覆盖这个方法的实现，这在实现 LRU 的缓存中特别有用，通过移除最近最久未使用的节点，从而保证缓存空间足够，并且缓存的数据都是热点数据。

```java
protected boolean removeEldestEntry(Map.Entry<K,V> eldest) {
    return false;
}
```

##### LRU 缓存

以下是使用 LinkedHashMap 实现的一个 LRU 缓存：

- 设定最大缓存空间 MAX_ENTRIES  为 3；
- 使用 LinkedHashMap 的构造方法将 accessOrder 设置为 true，开启 LRU 顺序；
- 覆盖 `removeEldestEntry()` 方法实现，在节点多于 MAX_ENTRIES 就会将最近最久未使用的数据移除。

```java
class LRUCache<K, V> extends LinkedHashMap<K, V> {
    private static final int MAX_ENTRIES = 3;

    protected boolean removeEldestEntry(Map.Entry eldest) {
        return size() > MAX_ENTRIES;
    }

    LRUCache() {
        super(MAX_ENTRIES, 0.75f, true);
    }
}
```

来测试一下：

```java
public static void main(String[] args) {
    LRUCache<Integer, String> cache = new LRUCache<>();
    cache.put(1, "a");
    cache.put(2, "b");
    cache.put(3, "c");
    cache.get(1);
    cache.put(4, "d");
    System.out.println(cache.keySet());
}
```

结果为：

```html
[3, 1, 4]
```

推荐阅读：[Java LinkedHashMap详解](https://javabetter.cn/collection/linkedhashmap.html)

#### WeakHashMap

##### 存储结构

WeakHashMap 的 Entry 继承自 WeakReference，被 WeakReference 关联的对象在下一次垃圾回收时会被回收。

WeakHashMap 主要用来实现缓存，通过使用 WeakHashMap 来引用缓存对象，由 JVM 对这部分缓存进行回收。

```java
private static class Entry<K,V> extends WeakReference<Object> implements Map.Entry<K,V>
```

##### ConcurrentCache

Tomcat 中的 ConcurrentCache 使用了 WeakHashMap 来实现缓存功能。

ConcurrentCache 采取的是分代缓存：

- 经常使用的对象放入 eden 中，eden 使用 ConcurrentHashMap 实现，不用担心会被回收（伊甸园）；
- 不常用的对象放入 longterm，longterm 使用 WeakHashMap 实现，这些老对象会被垃圾收集器回收。
- 当调用  `get()` 方法时，会先从 eden 区获取，如果没有找到的话再到 longterm 获取，当从 longterm 获取到就把对象放入 eden 中，从而保证经常被访问的节点不容易被回收。
- 当调用 `put()` 方法时，如果 eden 的大小超过了 size，那么就将 eden 中的所有对象都放入 longterm 中，利用虚拟机回收掉一部分不经常使用的对象。

```java
public final class ConcurrentCache<K, V> {

    private final int size;

    private final Map<K, V> eden;

    private final Map<K, V> longterm;

    public ConcurrentCache(int size) {
        this.size = size;
        this.eden = new ConcurrentHashMap<>(size);
        this.longterm = new WeakHashMap<>(size);
    }

    public V get(K k) {
        V v = this.eden.get(k);
        if (v == null) {
            v = this.longterm.get(k);
            if (v != null)
                this.eden.put(k, v);
        }
        return v;
    }

    public void put(K k, V v) {
        if (this.eden.size() >= size) {
            this.longterm.putAll(this.eden);
            this.eden.clear();
        }
        this.eden.put(k, v);
    }
}
```


### 参考资料

[https://github.com/CyC2018/CS-Notes/](https://github.com/CyC2018/CS-Notes/blob/master/notes/Java%20%E5%AE%B9%E5%99%A8.md)

> 微信搜索《**沉默王二**》或者微信扫下面的二维码，关注后回复《**java**》即可获取最新的 PDF 版本。

![手机端可以长按识别](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)