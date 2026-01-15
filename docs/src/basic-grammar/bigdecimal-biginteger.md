---
title: BigDecimal，非常大的高精度浮点数
shortTitle: 掌握BigDecimal
description: BigDecimal是Java中用于浮点数数值计算的类，其主要适合用于处理需要精确表示和运算的场景。
author: 毅航
category:
  - 微信公众号
---

`BigDecimal`是`Java`中用于浮点数数值计算的类，其主要适合用于处理需要精确表示和运算的场景。**「`BigDecimal`不仅能精确表示非常大的或非常小的数字，同时还提供任意精度的运算。其有效的解决了浮点数（`float`和`double`）在进行精确计算时可能出现的舍入误差问题。」**

## BigDecimal简介

在处理金融、科学等领域的计算时，为了解决`double`或`float`在计算值存在的精度缺失问题`BigDecimal`应运而生。`BigDecimal`在设计之初**「皆在提供更高的精度和准确性，以确保浮点数运算的准确性」**。因此其具有如下特点：

1.  **「高精度」**：`BigDecimal`能够精确表示非常大的或非常小的数字，并且提供任意精度的运算。
2.  **「不可变性」**：`BigDecimal`对象是不可变的。一旦创建，数值就不会改变。所有的算术运算都会返回一个新的`BigDecimal`对象，而不会修改原来的对象。这种设计使得`BigDecimal`是线程安全的。
3.  **「丰富的运算方法」**：`BigDecimal`提供了丰富的算术运算方法，如`add`（加法）、`subtract`（减法）、`multiply`（乘法）和`divide`（除法），以及用于舍入、取整和比较的方法。
4.  **「灵活的舍入模式」**：提供多种舍入模式（如四舍五入、向上取整等），确保结果的精度和舍入行为可控。

总的来看，「`BigDecimal`通过其对象的不可变性，从而确保了线程安全；与此同时，其还并提供丰富的算术运算方法（如加法、减法、乘法、除法）和多种舍入模式（如四舍五入、向上取整等），从而满足精确数值计算的需求。」

## BigDecimal数据存储的秘密

对`BigDecimal`有了基础认识后，接下来我们便通过`Debug`的形式来看看`BigDecimal`内部究竟是如来实现数据的高精度的存储的。为此我们首先通过如下的语句来构建一个`BigDecimal`对象

```java
BigDecimal bigDecimal = new BigDecimal("3.1415926");
```

运行代码进入`Idea`的`Debug`模式后，可以看到如下内容：

![](http://cdn.paicoding.com/tobebetterjavaer/images/nice-article/weixin//zhangwbigdecimalxjqyljzjsj-d87c0e82-6ab7-479f-a5fb-6a1c863f5d76.jpg)

不难发现，对于`BigDecimal`对象而言其内部有 **「`intVal、scal、precision、stringCache、initCompact`等五个重要属性。」**   进一步，翻开`BigDecimal`源码，可以看到这五个属性各自对应的类型：

```java
public class BigDecimal extends Number implements Comparable<BigDecimal> {
     
     private final BigInteger intVal;

     private final int scale;  
                               
     private transient int precision;

     private transient String stringCache;

   
     private final transient long intCompact;
```

具体来看,**「`intVal`为一个`BigInteger`对象,其主要用于保存超出基本类型的数值。」** 例如：对于`Long`数据类型来看，其最大类型为`0x7fffffffffffffff`即`9223372036854775807`。因此如下的赋值`BigDecimal bigDecimal = new BigDecimal("9223372036854775808")`其已然超出了`Java`中基础类型所能表示的范围，而此时在`bigDecimal`对象中，其内部的`intVal`如下所示，不难发现`9223372036854775808`被赋值给`intVal`。

![](http://cdn.paicoding.com/tobebetterjavaer/images/nice-article/weixin//zhangwbigdecimalxjqyljzjsj-5d30da6f-c6a4-44cc-9919-8827d027269c.jpg)

明白了`BigDecimal`中`intVal`属性的存储规则后，再来看其中的`scale、precision`所标示的含义。**「其中`scale`表示小数点后的位数而`precision`则代表`BigDecimal`中数据的总位数，即包括整数和小数部分。」**

进一步，**「`BigDecimal`的`stringCache`属性则主要用于保存`BigDecimal`数据所转成的字符串信息，而`intCompact`则用于将`long`数值以内的数据转为基本数据类型`long`进行存储。」**

(注：如果数据类型范围超过`long`所能表示的范围，则会将数据保存至`intVal`中)

此外还要注意一点，如果是包含小数点的数据其会将其小数点去掉，进而保存其去掉小数点后的数据。例如`new BigDecimal("3.1415926")`在该`BigDecimal`对象中`intCompact = 31415926`。

## BigDecimal的最佳实践

知晓了`BigDecimal`内部对于`浮点`数据的存储原理后，接下来我们来谈一谈有关`BigDecimal`的几点最佳实践，以避免在使用`BigDecimal`时踩坑。

> ❝
>
> 1.为了避免精度丢失，尽量使用`BigDecimal(String val)`构造方法或者  `BigDecimal.valueOf(double val)`
>
> ❞

如果使用`double` 类型的数据来构建一个 `BigDecimal` 对象时，其会出现精度丢失的问题。这主要是因为 `double` 类型本身在表示浮点数时存在精度限制。

具体来看，`double` 类型使用 `IEEE 754`标准的双精度浮点数格式，该格式在二进制表示中无法精确地表示所有十进制的小数。例如，十进制数 `0.1` 在二进制浮点数中是一个无限循环小数，只能近似表示为 `0.1000000000000000055511151231257827021181583404541015625`。而使用 `new BigDecimal(double)` 构造函数时`double`类型的数值的会将其近似值传递给 `BigDecimal`，进入导致精度丢失。例如：

```java
double value = 0.1;
BigDecimal bd = new BigDecimal(value);
System.out.println(bd); 
```

上述代码最终会输出：`0.1000000000000000055511151231257827021181583404541015625`而我们所期待的 `BigDecimal` 实际为 `0.1`。因此为了避免构建`BigDecimal`时出现精度丢失的问题，**「推荐使用它的`BigDecimal(String val)`构造方法或者  `BigDecimal.valueOf(double val)` 静态方法来创建对象。」**

> ❝
>
> 2.使用 `BigDecimal`进行除法运算时，指明数据结果的精度
>
> ❞

`BigDecimal` 在进行除法运算时，**「如果不指定截取的精度和舍入模式，当出现数据无法整除时，会出现 `ArithmeticException` 异常」**。例如 `1 / 3`时其会得到一个无限循环小数。这时如果没有明确指定精度和舍入方式，`BigDecimal` 将无法完成除法运算并抛出异常。

```java
public class BigDecimalDivisionExample {
     public static void main(String[] args) {
         BigDecimal num1 = new BigDecimal("1");
         BigDecimal num2 = new BigDecimal("3");
         BigDecimal result = num1.divide(num2);
 }
```

在上述代码中，`num1 / num2`的结果为一个无限循环小数 `0.333...`。**「由于我们并未在代码中指定精度和舍入模式，所以当执行上述代码时如出现如下异常」**：`Exception: Non-terminating decimal expansion; no exact representable decimal result.`

为了避免上述异常的发生，可以再执行`divide`显示的指定精度截取方式。具体方式如下：`num1.divide(num2,2, RoundingMode.HALF_UP);`在本例中对数据保留了两位小数，同时使用`RoundingMode.HALF_UP`四舍五入的截取方式。

事实上 `BigDecimal`除了外`RoundingMode.HALF_UP`的舍入方式外，还有如下的截取方式：

- `RoundingMode.HALF_UP`：四舍五入，向上舍入。
- `RoundingMode.HALF_DOWN`：四舍五入，向下舍入。
- `RoundingMode.HALF_EVEN`：四舍五入，如果舍弃部分等于 0.5，则舍入到最接近的偶数。

> ❝
>
> 3.根据业务需要，合理的使用`compareTo`和`equals`
>
> ❞

由于`BigDecimal` 内部对 `equals`方法逻辑进行了重写，这使得`equals`方法不仅比较数值部分，还比较标度。因此只有数值和标度都相同时`equals` 方法才会返回 `true`。例如：

```java
public class BigDecimalComparison {
     public static void main(String[] args) {
         BigDecimal bd1 = new BigDecimal("1.0");
         BigDecimal bd2 = new BigDecimal("1.00");
         
         System.out.println(bd1.equals(bd2)); // 输出 false
     }
 }
```

在这个例子中，`bd1 = 1.0`  `bd2 = 1.00` 两个数的数值部分代表的含义是完全相同的，但其精度却不同，此时如果使用`equals` 方法进行比较，则会返回 `false`。如果贸然使用`equals` 是很容易导致出现意料之外的结果。

为了保证数值的比较，`BigDecimal` 内部也对`compareTo` 方法进行了重写，使得`compareTo`方法只比较`BigDecimal`的数值部分而不考虑标度。**「因此如果两个 `BigDecimal`对象的数值相等，即使标度不同`compareTo` 方法也会认为它们相等。」**

```java
public class BigDecimalComparison {
     public static void main(String[] args) {
         BigDecimal bd1 = new BigDecimal("1.0");
         BigDecimal bd2 = new BigDecimal("1.00");

         System.out.println(bd1.compareTo(bd2)); // 
     }
 }
```

在这个例子中最终的输出结果为`0`，即代表`bd1`和`bd2`相等。这主要是因为`bd1`和`bd2`的数值相等因此`compareTo` 方法返回 `0`。

因此对于为了避免不必要的混淆和错误，尽量遵循以下最佳实践：

- **「明确比较目的」**：在使用 `BigDecimal` 进行比较时，首先明确你的比较目的是检查数值相等还是完全相等（包括标度）。如果仅比较数值，请使用 `compareTo` 方法。如果需要完全相等，请使用 `equals` 方法。
- **「避免误解」**：理解 `BigDecimal` 的 `equals` 方法会考虑标度，而 `compareTo` 方法只比较数值。在常见的数值比较中，更推荐使用 `compareTo` 方法。

> ❝
>
> 4.慎用`BigDecimal`的`toString`方法
>
> ❞

`BigDecimal`内部对`toString`方法进行`重载`，这使得`BigDecimal` 的 `toString` 方法会自动去除尾随零，并且使用科学计数法表示非常大的或非常小的数值。例如：

```java
public class BigDecimalToStringExample {
     public static void main(String[] args) {
         BigDecimal bd1 = new BigDecimal("123.4500");
         BigDecimal bd2 = new BigDecimal("0.00012345");

         System.out.println(bd1.toString()); 
         System.out.println(bd2.toString()); 
     }
 }
```

上述代码分别会输出`123.45、1.2345E-4`。其中`bd1` 的尾随零被去除，而 `bd2` 使用了科学计数法进行数据的表示。而为了避免这类问题的发生，可以使用 `BigDecimal` 的 `toPlainString` 方法。该方法不会去除尾随零，也不会使用科学计数法。

```java
import java.math.BigDecimal;

 public class BigDecimalToPlainStringExample {
     public static void main(String[] args) {
         BigDecimal bd1 = new BigDecimal("123.4500");
         BigDecimal bd2 = new BigDecimal("0.00012345");
         

         System.out.println(bd1.toPlainString()); // 输出 123.4500
         System.out.println(bd2.toPlainString()); // 输出 0.00012345

     }
 }
```

不难看出，在这个例子中`toPlainString` 方法保留了尾随零，并且没有使用科学计数法，输出格式更加直观。

- **「`toString` 方法」**：自动去除尾随零，使用科学计数法表示非常大或非常小的数值。可能导致格式不符合预期。
- **「`toPlainString` 方法」**：不会去除尾随零，不会使用科学计数法，适合需要保留原始数值格式的场景。

## 总结

本文主要对`BigDecimal`内部对于浮点数的存储规则进行分析，以加深读者对于`BigDecimal`的理解。同时整理了如下五条`BigDecimal`使用的最佳实践：

1.  为了避免精度丢失，尽量使用`BigDecimal(String val)`构造方法或者  `BigDecimal.valueOf(double val)` ；
2.  使用 `BigDecimal`进行除法运算时，指明数据结果的精度；
3.  根据业务需要，合理的使用`compareTo`和`equals`；
4.  慎用`BigDecimal`的`toString`方法。

> 参考链接：[https://mp.weixin.qq.com/s/ShXkr9KKXsDBvmh5PlUgUA](https://mp.weixin.qq.com/s/ShXkr9KKXsDBvmh5PlUgUA)，整理：沉默王二
