---
title: Java数据类型全解析：基本数据类型与引用数据类型
shortTitle: Java数据类型
category:
  - Java核心
tag:
  - Java语法基础
description: 本文详细探讨了Java数据类型，包括比特与字节、基本数据类型、单精度与双精度、int与char互转、包装器类型、引用数据类型以及堆与栈的内存模型。通过阅读本文，您将全面了解Java数据类型的概念与使用方法，为Java编程打下坚实基础。
head:
  - - meta
    - name: keywords
      content: Java, 数据类型, 比特, 字节, 基本数据类型, 引用数据类型, 单精度, 双精度, int, char, 包装器类型, 堆, 栈, 内存模型, 类型转换
---

# 3.3 Java 数据类型

“Java 是一种静态类型的编程语言，这意味着所有变量必须在使用之前声明好，也就是必须得先指定变量的类型和名称。”我吸了一口麦香可可奶茶后对三妹说。

Java 中的数据类型可分为 2 种：

1）**基本数据类型**。

基本数据类型是 Java 语言操作数据的基础，包括 boolean、char、byte、short、int、long、float 和 double，共 8 种。

2）**引用数据类型**。

除了基本数据类型以外的类型，都是所谓的引用类型。常见的有[数组](https://javabetter.cn/array/array.html)（对，没错，数组是引用类型，后面我们会讲）、class（也就是[类](https://javabetter.cn/oo/object-class.html)），以及[接口](https://javabetter.cn/oo/interface.html)（指向的是实现接口的类的对象）。

来个思维导图，感受下。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/core-grammar/nine-01.png)

[变量](https://javabetter.cn/oo/var.html)可以分为局部变量、成员变量、静态变量。

当变量是局部变量的时候，必须得先初始化，否则编译器不允许你使用它。拿 int 来举例吧，看下图。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/core-grammar/nine-02.png)

当变量是成员变量或者静态变量时，可以不进行初始化，它们会有一个默认值，仍然以 int 为例，来看代码：

```java
/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class LocalVar {
    private int a;
    static int b;

    public static void main(String[] args) {
        LocalVar lv = new LocalVar();
        System.out.println(lv.a);
        System.out.println(b);
    }
}
```

来看输出结果：

```
0
0
```

瞧见没，int 作为成员变量时或者静态变量时的默认值是 0。那不同的基本数据类型，是有不同的默认值和大小的，来个表格感受下。

| 数据类型 | 默认值   | 大小   |
| -------- | -------- | ------ |
| boolean  | false    | 1 比特 |
| char     | '\u0000' | 2 字节 |
| byte     | 0        | 1 字节 |
| short    | 0        | 2 字节 |
| int      | 0        | 4 字节 |
| long     | 0L       | 8 字节 |
| float    | 0.0f     | 4 字节 |
| double   | 0.0      | 8 字节 |

### 01、比特和字节

那三妹可能要问，“比特和字节是什么鬼？”

比特币（Bitcoin）听说过吧？字节跳动（Byte Dance）听说过吧？这些名字当然不是乱起的，确实和比特、字节有关系。

#### **1）bit（比特）**

比特作为信息技术的最基本存储单位，非常小，但大名鼎鼎的比特币就是以此命名的，它的简写为小写字母“b”。

大家都知道，计算机是以二进制存储数据的，二进制的一位，就是 1 比特，也就是说，比特要么为 0 要么为 1。

#### **2）Byte（字节）**

通常来说，一个英文字符是一个字节，一个中文字符是两个字节。字节与比特的换算关系是：1 字节 = 8 比特。

在往上的单位就是 KB，并不是 1000 字节，因为计算机只认识二进制，因此是 2 的 10 次方，也就是 1024 个字节。

（终于知道 1024 和程序员的关系了吧？狗头保命）

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/core-grammar/nine-03.png)

### 02、基本数据类型

接下来，我们再来详细地了解一下 8 种基本数据类型。

#### 1）布尔

布尔（boolean）仅用于存储两个值：true 和 false，也就是真和假，通常用于条件的判断。代码示例：

```java
boolean hasMoney = true;
boolean hasGirlFriend = false;
```

#### 2）byte

一个字节可以表示 2^8 = 256 个不同的值。由于 byte 是有符号的，它的值可以是负数或正数，其取值范围是 -128 到 127（包括 -128 和 127）。

在网络传输、大文件读写时，为了节省空间，常用字节来作为数据的传输方式。代码示例：

```java
byte b; // 声明一个 byte 类型变量
b = 10; // 将值 10 赋给变量 b
byte c = -100; // 声明并初始化一个 byte 类型变量 c，赋值为 -100
```

#### 3）short

short 的取值范围在 -32,768 和 32,767 之间，包含 32,767。代码示例：

```java
short s; // 声明一个 short 类型变量
s = 1000; // 将值 1000 赋给变量 s
short t = -2000; // 声明并初始化一个 short 类型变量 t，赋值为 -2000
```

实际开发中，short 比较少用，整型用 int 就 OK。

#### 3）int

int 的取值范围在 -2,147,483,648（-2 ^ 31）和 2,147,483,647（2 ^ 31 -1）（含）之间。如果没有特殊需求，整型数据就用 int。代码示例：

```java
int i; // 声明一个 int 类型变量
i = 1000000; // 将值 1000000 赋给变量 i
int j = -2000000; // 声明并初始化一个 int 类型变量 j，赋值为 -2000000
```

#### 5）long

long 的取值范围在 -9,223,372,036,854,775,808(-2^63) 和 9,223,372,036,854,775,807(2^63 -1)（含）之间。如果 int 存储不下，就用 long。代码示例：

```java
long l; // 声明一个 long 类型变量
l = 100000000000L; // 将值 100000000000L 赋给变量 l（注意要加上 L 后缀）
long m = -20000000000L; // 声明并初始化一个 long 类型变量 m，赋值为 -20000000000L
```

为了和 int 作区分，long 型变量在声明的时候，末尾要带上大写的“L”。不用小写的“l”，是因为小写的“l”容易和数字“1”混淆。

#### 6）float

float 是单精度的浮点数（单精度浮点数的有效数字大约为 6 到 7 位），32 位（4 字节），遵循 IEEE 754（二进制浮点数算术标准），取值范围为 1.4E-45 到 3.4E+38。float 不适合用于精确的数值，比如说金额。代码示例：

```java
float f; // 声明一个 float 类型变量
f = 3.14159f; // 将值 3.14159f 赋给变量 f（注意要加上 f 后缀）
float g = -2.71828f; // 声明并初始化一个 float 类型变量 g，赋值为 -2.71828f
```

为了和 double 作区分，float 型变量在声明的时候，末尾要带上小写的“f”。不需要使用大写的“F”，是因为小写的“f”很容易辨别。

#### 7）double

double 是双精度浮点数（双精度浮点数的有效数字大约为 15 到 17 位），占 64 位（8 字节），也遵循 IEEE 754 标准，取值范围大约 ±4.9E-324 到 ±1.7976931348623157E308。double 同样不适合用于精确的数值，比如说金额。

代码示例：

```java
double myDouble = 3.141592653589793;
```

在进行金融计算或需要精确小数计算的场景中，可以使用 [BigDecimal 类](https://javabetter.cn/basic-grammar/bigdecimal-biginteger.html)来避免浮点数舍入误差。BigDecimal 可以表示一个任意大小且精度完全准确的浮点数。

> 在实际开发中，如果不是特别大的金额（精确到 0.01 元，也就是一分钱），一般建议乘以 100 转成整型进行处理。

#### 8）char

char 用于表示 Unicode 字符，占 16 位（2 字节）的存储空间，取值范围为 0 到 65,535。

代码示例：

```java
char letterA = 'A'; // 用英文的单引号包裹住。
```

注意，字符字面量应该用单引号（''）包围，而不是双引号（""），因为[双引号表示字符串字面量](https://javabetter.cn/string/constant-pool.html)。

### 03、单精度和双精度

单精度（single-precision）和双精度（double-precision）是指两种不同精度的浮点数表示方法。

单精度是这样的格式，1 位符号，8 位指数，23 位小数。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/core-grammar/nine-04.png)

单精度浮点数通常占用 32 位（4 字节）存储空间。数值范围大约是 ±1.4E-45 到 ±3.4028235E38，精度大约为 6 到 9 位有效数字。

双精度是这样的格式，1 位符号，11 位指数，52 为小数。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/core-grammar/nine-05.png)

双精度浮点数通常占用 64 位（8 字节）存储空间，数值范围大约是 ±4.9E-324 到 ±1.7976931348623157E308，精度大约为 15 到 17 位有效数字。

计算精度取决于小数位（尾数）。小数位越多，则能表示的数越大，那么计算精度则越高。

一个数由若干位数字组成，其中影响测量精度的数字称作有效数字，也称有效数位。有效数字指科学计算中用以表示一个浮点数精度的那些数字。一般地，指一个用小数形式表示的浮点数中，从第一个非零的数字算起的所有数字。如 1.24 和 0.00124 的有效数字都有 3 位。

以下是确定有效数字的一些基本规则：

- 非零数字总是有效的。
- 位于两个非零数字之间的零是有效的。
- 对于小数，从左侧开始的第一个非零数字之前的零是无效的。
- 对于整数，从右侧开始的第一个非零数字之后的零是无效的。

下面是一些示例，说明如何确定有效数字：

- 1234：4 个有效数字（所有数字都是非零数字）
- 1002：4 个有效数字（零位于两个非零数字之间）
- 0.00234：3 个有效数字（从左侧开始的前两个零是无效的）
- 1200：2 个有效数字（从右侧开始的两个零是无效的）

### 04、int 和 char 类型互转

int 和 char 之间比较特殊，可以互转，也会在以后的学习当中经常遇到。

1）可以通过[强制类型转换](https://javabetter.cn/basic-grammar/type-cast.html)将整型 int 转换为字符 char。

```java
int value_int = 65;
char value_char  = (char) value_int;
System.out.println(value_char);
```

输出 `A`(其 [ASCII 值](https://javabetter.cn/basic-extra-meal/java-unicode.html)可以通过整数 65 来表示)。

2）可以使用 `Character.forDigit()` 方法将整型 int 转换为字符 char，参数 radix 为基数，十进制为 10，十六进制为 16。。

```java
int radix = 10;
int value_int = 6;
char value_char = Character.forDigit(value_int , radix);
System.out.println(value_char );
```

Character 为 char 的包装器类型。我们随后会讲。

3）可以使用 int 的包装器类型 Integer 的 `toString()` 方法+String 的 `charAt()` 方法转成 char。

```java
int value_int = 1;
char value_char = Integer.toString(value_int).charAt(0);
System.out.println(value_char );
```

4）char 转 int

当然了，如果只是简单的 char 转 int，直接赋值就可以了。

```java
int a = 'a';
```

因为发生了[自动类型转换](https://javabetter.cn/basic-grammar/type-cast.html)，后面会细讲。

### 05、包装器类型

包装器类型（Wrapper Types）是 Java 中的一种特殊类型，用于将基本数据类型（如 int、float、char 等）转换为对应的[对象类型](https://javabetter.cn/oo/object-class.html)。

Java 提供了以下包装器类型，与基本数据类型一一对应：

- Byte（对应 byte）
- Short（对应 short）
- Integer（对应 int）
- Long（对应 long）
- Float（对应 float）
- Double（对应 double）
- Character（对应 char）
- Boolean（对应 boolean）

包装器类型允许我们使用基本数据类型提供的各种实用方法，并兼容需要对象类型的场景。例如，我们可以使用 Integer 类的 parseInt 方法将字符串转换为整数，或使用 Character 类的 isDigit 方法检查字符是否为数字，还有前面提到的 `Character.forDigit()` 方法。

下面是一个简单的示例，演示了如何使用包装器类型：

```java
// 使用 Integer 包装器类型
Integer integerValue = new Integer(42);
System.out.println("整数值: " + integerValue);

// 将字符串转换为整数
String numberString = "123";
int parsedNumber = Integer.parseInt(numberString);
System.out.println("整数值: " + parsedNumber);

// 使用 Character 包装器类型
Character charValue = new Character('A');
System.out.println("字符: " + charValue);

// 检查字符是否为数字
char testChar = '9';
if (Character.isDigit(testChar)) {
System.out.println("字符是个数字.");
}
```

上面的示例中，我们创建了一个 [Integer 类型](https://javabetter.cn/basic-extra-meal/int-cache.html)的对象 integerValue 并为其赋值 42。然后，我们将其值打印到控制台。

我们有一个包含数字的[字符串](https://javabetter.cn/string/immutable.html) numberString。我们使用 `Integer.parseInt()` 方法将其转换为整数 parsedNumber。然后，我们将转换后的值打印到控制台。

我们有一个字符变量 testChar，并为其赋值字符 '9'。我们使用 `Character.isDigit()` 方法检查 testChar 是否为数字字符。如果是数字字符，我们将输出一条消息到控制台。

从 Java 5 开始，[自动装箱（Autoboxing）和自动拆箱（Unboxing）机制](https://javabetter.cn/basic-extra-meal/box.html)允许我们在基本数据类型和包装器类型之间自动转换，无需显式地调用构造方法或转换方法（链接里会细讲）。

```java
Integer integerValue = 42; // 自动装箱，等同于 new Integer(42)
int primitiveValue = integerValue; // 自动拆箱，等同于 integerValue.intValue()
```

### 06、引用数据类型

基本数据类型在作为成员变量和静态变量的时候有默认值，引用数据类型也有的（学完数组&字符串，以及面向对象编程后会更加清楚，这里先简单过一下）。

[String](https://javabetter.cn/string/immutable.html) 是最典型的引用数据类型，所以我们就拿 String 类举例，看下面这段代码：

```java
/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class LocalRef {
    private String a;
    static String b;

    public static void main(String[] args) {
        LocalRef lv = new LocalRef();
        System.out.println(lv.a);
        System.out.println(b);
    }
}
```

输出结果如下所示：

```
null
null
```

null 在 Java 中是一个很神奇的存在，在你以后的程序生涯中，见它的次数不会少，尤其是伴随着令人烦恼的“[空指针异常](https://javabetter.cn/exception/npe.html)”，也就是所谓的 `NullPointerException`。

也就是说，引用数据类型的默认值为 null，包括数组和接口。

那你是不是很好奇，为什么[数组](https://javabetter.cn/array/array.html)和[接口](https://javabetter.cn/oo/interface.html)也是引用数据类型啊？

先来看数组：

```java
int [] arrays = {1,2,3};
System.out.println(arrays);
```

arrays 是一个 int 类型的数组，对吧？打印结果如下所示：

```
[I@2d209079
```

`[I` 表示数组是 int 类型的，@ 后面是十六进制的 hashCode——这样的打印结果太“人性化”了，一般人表示看不懂！为什么会这样显示呢？查看一下 `java.lang.Object` 类的 `toString()` 方法就明白了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/core-grammar/nine-06.png)

数组虽然没有显式定义成一个类，但它的确是一个对象，继承了祖先类 Object 的所有方法。那为什么数组不单独定义一个类来表示呢？就像字符串 String 类那样呢？

一个合理的解释是 Java 将其隐藏了。假如真的存在一个 Array.java，我们也可以假想它真实的样子，它必须要定义一个容器来存放数组的元素，就像 String 类那样。

```java
public final class String
    implements java.io.Serializable, Comparable<String>, CharSequence {
    /** The value is used for character storage. */
    private final char value[];
}
```

数组内部定义数组？没必要的！

再来看接口：

```java
List<String> list = new ArrayList<>();
System.out.println(list);
```

[List](https://javabetter.cn/collection/gailan.html) 是一个非常典型的接口：

```java
public interface List<E> extends Collection<E> {}
```

而 [ArrayList](https://javabetter.cn/collection/arraylist.html) 是 List 接口的一个实现：

```java
public class ArrayList<E> extends AbstractList<E>
        implements List<E>, RandomAccess, Cloneable, java.io.Serializable
{}
```

对于接口类型的引用变量来说，你没法直接 new 一个：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/core-grammar/nine-07.png)

只能 new 一个实现它的类的对象——那自然接口也是引用数据类型了。

来看一下基本数据类型和引用数据类型之间最大的差别。

基本数据类型：

- 1、变量名指向具体的数值。
- 2、基本数据类型存储在栈上。

引用数据类型：

- 1、变量名指向的是存储对象的内存地址，在栈上。
- 2、内存地址指向的对象存储在堆上。

### 07、堆和栈

看到这，三妹是不是又要问，“堆是什么，栈又是什么？”

堆是堆（heap），栈是栈（stack），如果看到“堆栈”的话，请不要怀疑自己，那是翻译的错，堆栈也是栈，反正我很不喜欢“堆栈”这种叫法，容易让新人掉坑里。

堆是在程序运行时在内存中申请的空间（可理解为动态的过程）；切记，不是在编译时；因此，Java 中的对象就放在这里，这样做的好处就是：

> 当需要一个对象时，只需要通过 new 关键字写一行代码即可，当执行这行代码时，会自动在内存的“堆”区分配空间——这样就很灵活。

栈，能够和处理器（CPU，也就是脑子）直接关联，因此访问速度更快。既然访问速度快，要好好利用啊！Java 就把对象的引用放在栈里。为什么呢？因为引用的使用频率高吗？

不是的，因为 Java 在编译程序时，必须明确的知道存储在栈里的东西的生命周期，否则就没法释放旧的内存来开辟新的内存空间存放引用——空间就那么大，前浪要把后浪拍死在沙滩上啊。

这么说就理解了吧？

如果还不理解的话，可以看一下这个视频，讲的非常不错：[什么是堆？什么是栈？他们之间有什么区别和联系？](https://www.zhihu.com/question/19729973/answer/2238950166)

用图来表示一下，左侧是栈，右侧是堆。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/basic-grammar/basic-data-type-dc26645a-3ed8-4ad4-815d-52528ad12d6b.png)

这里再补充一些额外的知识点，能看懂就继续吸收，看不懂可以先去学下一节，以后再来补，没关系的。学习就是这样，可以跳过，可以温故。

举个例子。

```java
String a = new String("沉默王二")
```

这段代码会先在堆里创建一个 沉默王二的字符串对象，然后再把对象的引用 a 放到栈里面。这里面还会涉及到[字符串常量池](https://javabetter.cn/string/constant-pool.html)，后面会讲。

那么对于这样一段代码，有基本数据类型的变量，有引用类型的变量，堆和栈都是如何存储他们的呢？

```java
public void test()
{
    int i = 4;
    int y = 2;
    Object o1 = new Object();
}
```

我来画个图表示下。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/basic-grammar/basic-data-type-3d5b3e40-1abb-4624-8282-b83e58388825.png)

应该一目了然了吧？

“好了，三妹，关于 Java 中的数据类型就先说这么多吧，你是不是已经清楚了？”转动了一下僵硬的脖子后，我对三妹说。

### 08、小结

本文详细探讨了 Java 数据类型，包括比特与字节、基本数据类型、单精度与双精度、int 与 char 互转、包装器类型、引用数据类型以及堆与栈的内存模型。通过阅读本文，你将全面了解 Java 数据类型的概念与使用方法，为 Java 编程打下坚实基础。

----

GitHub 上标星 9300+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 9300+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
