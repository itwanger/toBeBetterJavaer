---
title: 深入理解 JVM 的栈帧结构
shortTitle: 深入理解栈帧结构
category:
  - Java核心
tag:
  - Java虚拟机
description: 栈帧是运行时数据区中用于支持虚拟机进行方法调用和方法执行的数据结构。每一个方法从调用开始到执行完成，都对应着一个栈帧在虚拟机栈/本地方法栈里从入栈到出栈的过程。
head:
  - - meta
    - name: keywords
      content: Java,JavaSE,教程,二哥的Java进阶之路,jvm,Java虚拟机,栈虚拟机,栈帧,局部变量表,操作数栈,动态链接,方法返回地址
---

# 第八节：深入理解栈帧结构

前面我们讲[栈虚拟机和寄存器虚拟机](https://javabetter.cn/jvm/vm-stack-register.html)的时候，提到过栈帧结构；在讲[字节码指令](https://javabetter.cn/jvm/zijiema-zhiling.html)的时候，又提到了栈帧中的操作数栈，那今天我们就来详细地讲一讲 JVM 的栈帧结构，好让大家对栈帧有一个更加清晰的认知。

我们从下面这幅图开始讲起。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/neicun-jiegou-e33179f3-275b-44c9-87f6-802198f8f360.png)

Java 的源码文件经过编译器编译后会生成[字节码文件](https://javabetter.cn/jvm/class-file-jiegou.html)，然后由 JVM 的类加载器进行[加载](https://javabetter.cn/jvm/class-load.html)，再交给执行引擎执行。在执行过程中，JVM 会划出一块内存空间来存储程序执行期间所需要用到的数据，这块空间一般被称为[运行时数据区](https://javabetter.cn/jvm/neicun-jiegou.html)。

栈帧（Stack Frame）是运行时数据区中用于支持虚拟机进行方法调用和方法执行的数据结构。每一个方法从调用开始到执行完成，都对应着一个栈帧在虚拟机栈/本地方法栈里从入栈到出栈的过程。

本地方法，也就是 native 方法，我们[前面](https://javabetter.cn/oo/native-method.html)有详细地讲过，由 C/C++ 实现。

每一个栈帧都包括了局部变量表、操作数栈、动态链接、方法返回地址和一些额外的附加信息。

在编译程序代码时，栈帧中需要多大的局部变量表，多深的操作数栈都已经完全确定了，并且写入到[方法表的 Code 属性](https://javabetter.cn/jvm/bytecode.html#_03%E3%80%81%E5%B8%B8%E9%87%8F%E6%B1%A0)之中。

>方法表、局部变量表我们在讲字节码的时候有讲过，可以[戳链接](https://javabetter.cn/jvm/bytecode.html#_03%E3%80%81%E5%B8%B8%E9%87%8F%E6%B1%A0)再回头看一下，这篇内容也会继续盘一盘。

一个线程中的方法调用链可能会很长，很多方法都处于执行状态。在当前线程中，位于栈顶的栈帧被称为当前栈帧（Current Stack Frame），与这个栈帧相关联的方法成为当前方法。[执行引擎](https://javabetter.cn/jvm/what-is-jvm.html#_3-%E6%89%A7%E8%A1%8C%E5%BC%95%E6%93%8E)运行的所有[字节码指令](https://javabetter.cn/jvm/zijiema-zhiling.html)都是对当前栈帧进行操作，在概念模型上，栈帧的结构如下图所示：

![](https://cdn.tobebetterjavaer.com/stutymore/stack-frame-20231224090450.png)

## 局部变量表

局部变量表（Local Variables Table）用来保存[方法](https://javabetter.cn/oo/method.html)中的局部变量，以及方法参数。当 Java 源代码文件被编译成 class 文件的时候，局部变量表的最大容量就已经确定了。

我们来看这样一段代码。

```java
public class LocalVaraiablesTable {
    private void write(int age) {
        String name = "沉默王二";
    }
}
```

`write()` 方法有一个参数 age，一个局部变量 name。

然后用 Intellij IDEA 的 jclasslib 查看一下编译后的字节码文件 LocalVaraiablesTable.class。可以看到 `write()` 方法的 Code 属性中，Maximum local variables（局部变量表的最大容量）的值为 3。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/how-jvm-run-zijiema-zhiling-70ab6bf6-4fbb-4722-99b4-a93d5061630c.png)

按理说，局部变量表的最大容量应该为 2 才对，一个 age，一个 name，为什么是 3 呢？

当一个成员方法（非静态方法）被调用时，第 0 个变量其实是调用这个成员方法的对象引用，也就是那个大名鼎鼎的 [this](https://javabetter.cn/oo/this-super.html)。调用方法 `write(18)`，实际上是调用 `write(this, 18)`。

点开 Code 属性，查看 LocalVaraiableTable 就可以看到详细的信息了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/how-jvm-run-zijiema-zhiling-e5e6037c-9be1-472f-8ab3-2754466e7828.png)

第 0 个是 this，类型为 LocalVaraiablesTable 对象；第 1 个是方法参数 age，类型为整型 int；第 2 个是方法内部的局部变量 name，类型为字符串 String。

当然了，局部变量表的大小并不是方法中所有局部变量的数量之和，它与变量的类型和变量的作用域有关。当一个局部变量的作用域结束了，它占用的局部变量表中的位置就被接下来的局部变量取代了。

来看下面这段代码。

```java
public static void method() {
    // ①
    if (true) {
        // ②
        String name = "沉默王二";
    }
    // ③
    if(true) {
        // ④
        int age = 18;
    }
    // ⑤
}
```

- `method()` 方法的局部变量表大小为 1，因为是静态方法，所以不需要添加 this 作为局部变量表的第一个元素；
- ②的时候局部变量有一个 name，局部变量表的大小变为 1；
- ③的时候 name 变量的作用域结束；
- ④的时候局部变量有一个 age，局部变量表的大小为 1；
- ⑤的时候局 age 变量的作用域结束；

关于局部变量的作用域，《Effective Java》 中的第 57 条建议：

>将局部变量的作用域最小化，可以增强代码的可读性和可维护性，并降低出错的可能性。

在此，我还有一点要提醒大家。为了尽可能节省栈帧耗用的内存空间，局部变量表中的槽是可以重用的，就像 `method()` 方法演示的那样，这就意味着，合理的作用域有助于提高程序的性能。是不是很有意思？

>局部变量表的容量以槽（slot）为最小单位，一个槽可以容纳一个 32 位的数据类型（比如说 int，当然了，《Java 虚拟机规范》中没有明确指出一个槽应该占用的内存空间大小，但我认为这样更容易理解），像 float 和 double 这种明确占用 64 位的数据类型会占用两个紧挨着的槽。

来看下面的代码。

```java
public void solt() {
    double d = 1.0;
    int i = 1;
}
```

用 jclasslib 可以查看到，`solt()` 方法的 Maximum local variables 的值为 4。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/how-jvm-run-zijiema-zhiling-6734774b-376c-49bf-a915-508c7e829557.png)

为什么等于 4 呢？带上 this 也就 3 个呀？

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/how-jvm-run-zijiema-zhiling-91ad04f8-1620-44c9-83d1-6fbd7860701a.png)

查看 LocalVaraiableTable 就明白了，变量 i 的下标为 3，也就意味着变量 d 占了两个槽。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/how-jvm-run-zijiema-zhiling-630b50e3-fc37-4748-8d20-852d5358f87a.png)

## 操作数栈

同局部变量表一样，操作数栈（Operand Stack）的最大深度也在编译的时候就确定了，被写入到了 Code 属性的 maximum stack size 中。当一个方法刚开始执行的时候，操作数栈是空的，在方法执行过程中，会有各种字节码指令往操作数栈中写入和取出数据，也就是入栈和出栈操作。

来看下面这段代码。

```java
public class OperandStack {
    public void test() {
        add(1,2);
    }

    private int add(int a, int b) {
        return a + b;
    }
}
```

OperandStack 类共有 2 个方法，`test()` 方法中调用了 `add()` 方法，传递了 2 个参数。用 jclasslib 可以看到，`test()` 方法的 maximum stack size 的值为 3。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/how-jvm-run-zijiema-zhiling-f790aa0f-d742-465b-91bf-5f143ee098c1.png)

这是因为调用成员方法的时候会将 this 和所有参数压入栈中，调用完毕后 this 和参数都会一一出栈。通过 「Bytecode」 面板可以查看到对应的字节码指令。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/how-jvm-run-zijiema-zhiling-c37add5c-a74b-4bd6-8c8e-9085d9e6d374.png)

- aload_0 用于将局部变量表中下标为 0 的引用类型的变量，也就是 this 加载到操作数栈中；
- iconst_1 用于将整数 1 加载到操作数栈中；
- iconst_2 用于将整数 2 加载到操作数栈中；
- invokevirtual 用于调用对象的成员方法；
- pop 用于将栈顶的值出栈；
- return 为 void 方法的返回指令。

[字节码指令](https://javabetter.cn/jvm/zijiema-zhiling.html)前面我们已经讲过了，忘记的[球友](https://javabetter.cn/zhishixingqiu/)可以再回顾一下。再来看一下 `add()` 方法的字节码指令。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/how-jvm-run-zijiema-zhiling-49e3f396-7ea8-49f5-81d4-093b9bdfa453.png)

- iload_1 用于将局部变量表中下标为 1 的 int 类型变量加载到操作数栈上（下标为 0 的是 this）；
- iload_2 用于将局部变量表中下标为 2 的 int 类型变量加载到操作数栈上；
- iadd 用于 int 类型的加法运算；
- ireturn 为返回值为 int 的方法返回指令。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/how-jvm-run-zijiema-zhiling-3ffdbe03-c0e4-49de-97a6-76666964a087.png)

操作数中的数据类型必须与字节码指令匹配，以上面的 iadd 指令为例，该指令只能用于整型数据的加法运算，它在执行的时候，栈顶的两个数据必须是 int 类型的，不能出现一个 long 型和一个 double 型的数据进行 iadd 命令相加的情况。

## 动态链接

每个栈帧都包含了一个指向运行时常量池中该栈帧所属方法的引用，持有这个引用是为了支持方法调用过程中的动态链接（Dynamic Linking）。

![图片来源于网络，作者浣熊say](https://cdn.tobebetterjavaer.com/stutymore/vm-stack-register-20231222175706.png)

①、[前面](https://javabetter.cn/jvm/what-is-jvm.html)我们就讲过，方法区是 JVM 的一个运行时内存区域，属于逻辑定义，不同版本的 JDK 都有不同的实现，但主要的作用就是用于存储已被虚拟机加载的类信息、常量、静态变量，以及即时编译器编译后的代码等。

②、运行时常量池（Runtime Constant Pool）是方法区的一部分，用于存放编译期生成的各种字面量和符号引用——在类加载后进入运行时常量池。关于[方法区](https://javabetter.cn/jvm/neicun-jiegou.html)我们也会在后面进行详细地讲解。

来看下面这段代码。

```java
public class DynamicLinking {
    static abstract class Human {
       protected abstract void sayHello();
    }
    
    static class Man extends Human {
        @Override
        protected void sayHello() {
            System.out.println("男人哭吧哭吧不是罪");
        }
    }
    
    static class Woman extends Human {
        @Override
        protected void sayHello() {
            System.out.println("山下的女人是老虎");
        }
    }

    public static void main(String[] args) {
        Human man = new Man();
        Human woman = new Woman();
        man.sayHello();
        woman.sayHello();
        man = new Woman();
        man.sayHello();
    }
}
```

大家对 Java [重写](https://javabetter.cn/basic-extra-meal/override-overload.html)有了解的话，应该能看懂这段代码的意思。Man 类和 Woman 类继承了 Human 类，并且重写了 `sayHello()` 方法。来看一下运行结果：

```
男人哭吧哭吧不是罪
山下的女人是老虎
山下的女人是老虎
```

这个运行结果很好理解，man 的引用类型为 Human，但指向的是 Man 对象，woman 的引用类型也为 Human，但指向的是 Woman 对象；之后，man 又指向了新的 Woman 对象。

从面向对象编程的角度，从多态的角度，我们对运行结果是很好理解的，但站在 Java 虚拟机的角度，它是如何判断 man 和 woman 该调用哪个方法的呢？

用 jclasslib 看一下 main 方法的字节码指令。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/how-jvm-run-zijiema-zhiling-93a21aaf-ff67-445d-8ddb-ac6f72fd9b25.png)

- 第 1 行：new 指令创建了一个 Man 对象，并将对象的内存地址压入栈中。
- 第 2 行：dup 指令将栈顶的值复制一份并压入栈顶。因为接下来的指令 invokespecial 会消耗掉一个当前类的引用，所以需要复制一份。
- 第 3 行：invokespecial 指令用于调用构造方法进行初始化。
- 第 4 行：astore_1，Java 虚拟机从栈顶弹出 Man 对象的引用，然后将其存入下标为 1 局部变量 man 中。
- 第 5、6、7、8 行的指令和第 1、2、3、4 行类似，不同的是 Woman 对象。
- 第 9 行：aload_1 指令将第局部变量 man 压入操作数栈中。
- 第 10 行：invokevirtual 指令调用对象的成员方法 `sayHello()`，注意此时的对象类型为 `com/itwanger/jvm/DynamicLinking$Human`。
- 第 11 行：aload_2 指令将第局部变量 woman 压入操作数栈中。
- 第 12 行同第 10 行。

注意，从字节码的角度来看，`man.sayHello()`（第 10 行）和 `woman.sayHello()`（第 12 行）的字节码是完全相同的，但我们都知道，这两句指令最终执行的目标方法并不相同。

究竟发生了什么呢？

还得从 `invokevirtual` 这个指令着手，看它是如何实现多态的。根据《Java 虚拟机规范》，invokevirtual 指令在运行时的解析过程可以分为以下几步：

- ①、找到操作数栈顶的元素所指向的对象的实际类型，记作 C。
- ②、如果在类型 C 中找到与常量池中的描述符匹配的方法，则进行访问权限校验，如果通过则返回这个方法的直接引用，查找结束；否则返回 `java.lang.IllegalAccessError` 异常。
- ③、否则，按照继承关系从下往上一次对 C 的各个父类进行第二步的搜索和验证。
- ④、如果始终没有找到合适的方法，则抛出 `java.lang.AbstractMethodError` 异常。

也就是说，invokevirtual 指令在第一步的时候就确定了运行时的实际类型，所以两次调用中的 invokevirtual 指令并不是把常量池中方法的符号引用解析到直接引用上就结束了，还会根据方法接受者的实际类型来选择方法版本，这个过程就是 Java 重写的本质。我们把这种在运行期根据实际类型确定方法执行版本的过程称为**动态链接**。

## 方法返回地址

当一个方法开始执行后，只有两种方式可以退出这个方法：

- 正常退出，可能会有返回值传递给上层的方法调用者，方法是否有返回值以及返回值的类型根据方法返回的指令来决定，像之前提到的 ireturn 用于返回 int 类型，return 用于 void 方法；还有其他的一些，lreturn 用于 long 型，freturn 用于 float，dreturn 用于 double，areturn 用于引用类型。
- 异常退出，方法在执行的过程中遇到了[异常](https://javabetter.cn/exception/gailan.html)，并且没有得到妥善的处理，这种情况下，是不会给它的上层调用者返回任何值的。

无论是哪种方式退出，在方法退出后，都必须返回到方法最初被调用时的位置，程序才能继续执行。一般来说，方法正常退出的时候，PC 计数器的值会作为返回地址，栈帧中很可能会保存这个计数器的值，异常退出时则不会。

>PC 计数器：JVM 运行时数据区的一部分，跟踪当前线程执行字节码的位置。

方法退出的过程实际上等同于把当前栈帧出栈，因此接下来可能执行的操作有：恢复上层方法的局部变量表和操作数栈，把返回值（如果有的话）压入调用者栈帧的操作数栈中，调整 PC 计数器的值，找到下一条要执行的指令等。


## 附加信息

虚拟机规范允许具体的虚拟机实现增加一些规范里没有描述的信息到栈帧中，例如与调试相关的信息，这部分信息完全取决于具体的虚拟机实现。实际开发中，一般会把动态连接、方法返回地址与其他附加信息全部归为一类，成为栈帧信息。

## StackOverflowError

下面这段代码在运行的时候会抛出 StackOverflowError 异常。

```java
public class StackOverflowErrorTest {
    public static void main(String[] args) {
        StackOverflowErrorTest test = new StackOverflowErrorTest();
        test.testStackOverflowError();
    }

    public void testStackOverflowError() {
        testStackOverflowError();
    }
}
```

我们来看一下异常的堆栈信息。

![](https://cdn.tobebetterjavaer.com/stutymore/stack-frame-20231224190051.png)

之所以抛出 StackOverflowError 异常，是因为在执行 `testStackOverflowError()` 方法的时候，会创建一个栈帧，然后调用 `testStackOverflowError()` 方法，又会创建一个栈帧，然后调用 `testStackOverflowError()` 方法，又会创建一个栈帧……这样一直循环下去，直到栈内存溢出。

我们来简单改造了一下代码，看一下异常的堆栈信息。

```java
public class StackOverflowErrorTest1 {
    private static AtomicInteger count = new AtomicInteger(0);
    public static void main(String[] args) {
        while (true) {
            testStackOverflowError();
        }
    }

    public static void testStackOverflowError() {
        System.out.println(count.incrementAndGet());
        testStackOverflowError();
    }
}
```

在 10924 次的时候，抛出了 StackOverflowError 异常。大家可以试试自己的本地环境，看多少次的时候会抛出异常。

![](https://cdn.tobebetterjavaer.com/stutymore/stack-frame-20231224190542.png)


## 小结

栈帧是 JVM 中用于方法执行的数据结构，每当一个方法被调用时，JVM 会为该方法创建一个栈帧，并在方法执行完毕后销毁。

- **局部变量表**：存储方法的参数和局部变量，由基本数据类型或对象引用组成。
- **操作数栈**：后进先出（LIFO）的栈结构，用于存储操作数和中间计算结果。
- **动态链接**：关联到方法所属类的常量池，支持动态方法调用。
- **方法返回地址**：记录方法结束后控制流应返回的位置。

栈帧是线程私有的，每个线程有自己的 JVM 栈。方法调用时，新栈帧被推入栈顶；方法完成后，栈帧出栈。

栈帧的局部变量表的大小和操作数栈的最大深度在编译时就已确定。栈空间不足时可能引发 `StackOverflowError`。理解栈帧对于深入理解 Java 程序的运行机制至关重要。


---

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括 Java 基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM 等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
