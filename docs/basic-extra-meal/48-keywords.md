---
title: Java中常用的48个关键字和2个保留字
shortTitle: 48个关键字和2个保留字
category:
  - Java核心
tag:
  - Java语法基础
description: Java程序员进阶之路，小白的零基础Java教程，Java中常用的48个关键字和2个保留字
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,Java保留字,Java关键字,关键字,保留字
---

## 3.1 Java中常用的48个关键字和2个保留字

“二哥，就之前你给我展示的 Java 代码中，有 public、static、void、main 等等，它们应该都是关键字吧？”三妹的脸上泛着甜甜的笑容，我想她在学习 Java 方面已经变得越来越自信了。

“是的，三妹。Java 中的关键字可不少呢！你一下子可能记不了那么多，不过，先保留个印象吧，对以后的学习会很有帮助。”

>PS：这里我们按照首字母的自然顺序排列来简述一下，了解即可，记不住没关系哦。这些关键字我们在后续的学习中会详细讲解的，直到你搞懂为止。

1.  **abstract：** 用于声明[抽象类](https://tobebetterjavaer.com/oo/abstract.html)，以及抽象方法。

2.  **boolean：** 用于将变量声明为布尔值类型，只有 true 和 false 两个值。

3.  **break：** 用于中断循环或 switch 语句。

4.  **byte：** 用于声明一个可以容纳 8 个比特的变量。

5.  **case：** 用于在 switch 语句中标记条件的值。

6.  **catch：** 用于捕获 try 语句中的[异常](https://tobebetterjavaer.com/exception/gailan.html)。

7.  **char：** 用于声明一个可以容纳无符号 16 位比特的 [Unicode 字符](https://tobebetterjavaer.com/basic-extra-meal/java-unicode.html)的变量。

8.  **class：** 用于声明一个[类](https://tobebetterjavaer.com/oo/object-class.html)。

9.  **continue：** 用于继续下一个循环，可以在指定条件下跳过其余代码。

10.  **default：** 用于指定 switch 语句中除去 case 条件之外的默认代码块。

11.  **do：** 通常和 while 关键字配合使用，do 后紧跟循环体。

12.  **double：** 用于声明一个可以容纳 64 位浮点数的变量。

13.  **else：** 用于指示 if 语句中的备用分支。

14.  **enum：** 用于定义一组固定的常量（[枚举](https://tobebetterjavaer.com/basic-extra-meal/enum.html)）。

15.  **extends：** 用于指示一个类是从另一个类或接口[继承](https://tobebetterjavaer.com/oo/extends-bigsai.html)的。

16.  **final：** [用于指示该变量是不可更改的](https://tobebetterjavaer.com/oo/final.html)。

17.  **finally：** 和 `try-catch` 配合使用，表示无论是否处理异常，总是执行 finally 块中的代码。

18.  **float：** 用于声明一个可以容纳 32 位浮点数的变量。

19.  **for：** 用于声明一个 for 循环，如果循环次数是固定的，建议使用 for 循环。

20.  **if：** 用于指定条件，如果条件为真，则执行对应代码。

21.  **implements：** 用于实现[接口](https://tobebetterjavaer.com/oo/interface.html)。

22.  **import：** 用于导入对应的类或者接口。

23.  **instanceof：** [用于判断对象是否属于某个类型（class）](https://tobebetterjavaer.com/basic-extra-meal/instanceof.html)。

24.  **int：** 用于声明一个可以容纳 32 位带符号的整数变量。

25.  **interface：** 用于声明接口。

26.  **long：** 用于声明一个可以容纳 64 位整数的变量。

27.  **native：** 用于指定一个[方法是通过调用本机接口（非 Java）实现的](https://tobebetterjavaer.com/oo/method.html)。

28.  **new：** 用于创建一个新的对象。

29.  **null：** 如果一个变量是空的（什么引用也没有指向），就可以将它赋值为 null，和空指针异常息息相关。

30.  **package：** 用于声明类所在的[包](https://tobebetterjavaer.com/oo/package.html)。

31.  **private：** 一个[访问权限修饰符](https://tobebetterjavaer.com/oo/access-control.html)，表示方法或变量只对当前类可见。

32.  **protected：** 一个访问权限修饰符，表示方法或变量对同一包内的类和所有子类可见。

33.  **public：** 一个访问权限修饰符，除了可以声明方法和变量（所有类可见），还可以声明类。`main()` 方法必须声明为 public。

34.  **return：** 用于在代码执行完成后返回（一个值）。

35.  **short：** 用于声明一个可以容纳 16 位整数的变量。

36.  **static：** 表示该变量或方法是[静态变量或静态方法](https://tobebetterjavaer.com/oo/static.html)。

37.  **strictfp：** 并不常见，通常用于修饰一个方法，确保方法体内的浮点数运算在每个平台上执行的结果相同。

38.  **super：** 可用于[调用父类的方法或者字段](https://tobebetterjavaer.com/oo/this-super.html)。

39.  **switch：** 通常用于三个（以上）的条件判断。

40.  **synchronized：** [用于指定多线程代码中的同步方法、变量或者代码块](https://tobebetterjavaer.com/thread/synchronized-1.html)。

41.  **this：** [可用于在方法或构造函数中引用当前对象](https://tobebetterjavaer.com/oo/this-super.html)。

42.  **throw：** 主动抛出[异常](https://tobebetterjavaer.com/exception/gailan.html)。

43.  **throws：** 用于声明异常。

44.  **transient：**  [修饰的字段不会被序列化](https://tobebetterjavaer.com/io/transient.html)。

45.  **try：** 于包裹要捕获异常的代码块。

46.  **void：** 用于指定方法没有返回值。

47.  **volatile：** 保证不同线程对它修饰的变量进行操作时的[可见性](https://tobebetterjavaer.com/thread/volatile.html)，即一个线程修改了某个变量的值，新值对其他线程来说是立即可见的。

48.  **while：** 如果循环次数不固定，建议使用 while 循环。


“好了，三妹，关于 Java 中的关键字就先说这 48 个吧，这只是一个大概的介绍，后面还会对一些特殊的关键字单独拎出来详细地讲，比如说重要的 static、final 等等。”转动了一下僵硬的脖子后，我对三妹说。

“除了这些关键字，Java 中还有两个非常特殊的保留字（goto 和 const），它们不能在程序中使用。”

“goto 在 C语言中叫做‘无限跳转’语句，在 Java 中，不再使用 goto 语句，因为无限跳转会破坏程序结构。”

“const 在 C语言中是声明常量的关键字，在 Java 中可以使用 public static final 三个关键字的组合来达到常量的效果。”

“好的二哥，我了解了，你休息会，我再记一记。”

----

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

