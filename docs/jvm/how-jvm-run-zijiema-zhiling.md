---
title: Java虚拟机是如何执行字节码指令的？
shortTitle: 虚拟机是如何执行字节码指令的？
category:
  - Java核心
tag:
  - Java虚拟机
description: 二哥的Java进阶之路，小白的零基础Java教程，从入门到进阶，虚拟机是如何执行字节码指令的？
head:
  - - meta
    - name: keywords
      content: Java,JavaSE,教程,二哥的Java进阶之路,jvm,Java虚拟机,字节码指令
---

# 虚拟机是如何执行字节码指令的？


执行引擎是 Java 虚拟机最核心的组成部分之一。「虚拟机」是相对于「物理机」的概念，这两种机器都有代码执行的能力，区别是物理机的执行引擎是直接建立在处理器、硬件、指令集和操作系统层面上的，而虚拟机执行引擎是由自己实现的，因此可以自行制定指令集与执行引擎的结构体系，并且能够执行那些不被硬件直接支持的指令集格式。

在 Java 虚拟机规范中制定了虚拟机字节码执行引擎的概念模型，这个概念模型成为各种虚拟机执行引擎的统一外观（Facade）。在不同的虚拟机实现里，执行引擎在执行 Java 代码的时候可能会有解释执行（通过解释器执行）和编译执行（通过即时编译器产生本地代码执行）两种方式，也可能两者都有，甚至还可能会包含几个不同级别的编译器执行引擎。但从外观上来看，所有 Java 虚拟机的执行引擎是一致的：输入的是字节码文件，处理过程是字节码解析的等效过程，输出的是执行结果。

### 一. 运行时栈帧结构

栈帧（Stack Frame）是用于支持虚拟机进行方法调用和方法执行的数据结构，它是虚拟机运行时数据区中的虚拟机栈的栈元素。栈帧存储了方法的局部变量、操作数栈、动态链接和方法返回地址等信息。**每一个方法从调用开始到执行完成的过程，都对应着一个栈帧在虚拟机栈里从入栈到出栈的过程。**

每一个栈帧都包括了局部变量表、操作数栈、动态链接、方法返回地址和一些额外的附加信息。在编译程序代码时，栈帧中需要多大的局部变量表，多深的操作数栈都已经完全确定了，并且写入到方法表的 Code 属性之中，因此一个栈帧需要分配多少内存，不会受到程序运行期变量数据的影响，而仅仅取决于具体的虚拟机实现。

一个线程中的方法调用链可能会很长，很多方法都处于执行状态。对于执行引擎来说，在活动线程中，只有位于栈顶的栈帧才是有效的，称为当前栈帧（Current Stack Frame），与这个栈帧相关联的方法成为当前方法。执行引擎运行的所有字节码指令对当前栈帧进行操作，在概念模型上，典型的栈帧结构如下图：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/how-jvm-run-zijiema-zhiling-a58ee82e-c0b0-4c06-9606-f7a0f0df0de9)

#### 局部变量表

局部变量表（Local Variables Table）用来保存方法中的局部变量，以及方法参数。当 Java 源代码文件被编译成 class 文件的时候，局部变量表的最大容量就已经确定了。

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

当一个成员方法（非静态方法）被调用时，第 0 个变量其实是调用这个成员方法的对象引用，也就是那个大名鼎鼎的 this。调用方法 `write(18)`，实际上是调用 `write(this, 18)`。

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

在此，我还有一点要提醒大家。为了尽可能节省栈帧耗用的内存空间，局部变量表中的槽是可以重用的，就像 `method()` 方法演示的那样，这就意味着，合理的作用域有助于提高程序的性能。

局部变量表的容量以槽（slot）为最小单位，一个槽可以容纳一个 32 位的数据类型（比如说 int，当然了，《Java 虚拟机规范》中没有明确指出一个槽应该占用的内存空间大小，但我认为这样更容易理解），像 float 和 double 这种明确占用 64 位的数据类型会占用两个紧挨着的槽。

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

#### 操作数栈

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

再来看一下 `add()` 方法的字节码指令。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/how-jvm-run-zijiema-zhiling-49e3f396-7ea8-49f5-81d4-093b9bdfa453.png)

- iload_1 用于将局部变量表中下标为 1 的 int 类型变量加载到操作数栈上（下标为 0 的是 this）；
- iload_2 用于将局部变量表中下标为 2 的 int 类型变量加载到操作数栈上；
- iadd 用于 int 类型的加法运算；
- ireturn 为返回值为 int 的方法返回指令。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/how-jvm-run-zijiema-zhiling-3ffdbe03-c0e4-49de-97a6-76666964a087.png)

操作数中的数据类型必须与字节码指令匹配，以上面的 iadd 指令为例，该指令只能用于整型数据的加法运算，它在执行的时候，栈顶的两个数据必须是 int 类型的，不能出现一个 long 型和一个 double 型的数据进行 iadd 命令相加的情况。

#### 动态链接

每个栈帧都包含了一个指向运行时常量池中该栈帧所属方法的引用，持有这个引用是为了支持方法调用过程中的动态链接（Dynamic Linking）。

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

大家对 Java 重写有了解的话，应该能看懂这段代码的意思。Man 类和 Woman 类继承了 Human 类，并且重写了 `sayHello()` 方法。来看一下运行结果：

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

>①、找到操作数栈顶的元素所指向的对象的实际类型，记作 C。
②、如果在类型 C 中找到与常量池中的描述符匹配的方法，则进行访问权限校验，如果通过则返回这个方法的直接引用，查找结束；否则返回 `java.lang.IllegalAccessError` 异常。
③、否则，按照继承关系从下往上一次对 C 的各个父类进行第二步的搜索和验证。
④、如果始终没有找到合适的方法，则抛出 `java.lang.AbstractMethodError` 异常。

也就是说，invokevirtual 指令在第一步的时候就确定了运行时的实际类型，所以两次调用中的 invokevirtual 指令并不是把常量池中方法的符号引用解析到直接引用上就结束了，还会根据方法接受者的实际类型来选择方法版本，这个过程就是 Java 重写的本质。我们把这种在运行期根据实际类型确定方法执行版本的过程称为**动态链接**。

#### 方法返回地址

当一个方法开始执行后，只有两种方式可以退出这个方法：

- 正常退出，可能会有返回值传递给上层的方法调用者，方法是否有返回值以及返回值的类型根据方法返回的指令来决定，像之前提到的 ireturn 用于返回 int 类型，return 用于 void 方法；还有其他的一些，lreturn 用于 long 型，freturn 用于 float，dreturn 用于 double，areturn 用于引用类型。

- 异常退出，方法在执行的过程中遇到了异常，并且没有得到妥善的处理，这种情况下，是不会给它的上层调用者返回任何值的。

无论是哪种方式退出，在方法退出后，都必须返回到方法最初被调用时的位置，程序才能继续执行。一般来说，方法正常退出的时候，PC 计数器的值会作为返回地址，栈帧中很可能会保存这个计数器的值，异常退出时则不会。

方法退出的过程实际上等同于把当前栈帧出栈，因此接下来可能执行的操作有：恢复上层方法的局部变量表和操作数栈，把返回值（如果有的话）压入调用者栈帧的操作数栈中，调整 PC 计数器的值，找到下一条要执行的指令等。


#### 附加信息

虚拟机规范允许具体的虚拟机实现增加一些规范里没有描述的信息到栈帧中，例如与调试相关的信息，这部分信息完全取决于具体的虚拟机实现。实际开发中，一般会把动态连接、方法返回地址与其他附加信息全部归为一类，成为栈帧信息。

### 二. 方法调用

方法调用并不等同于方法执行，方法调用阶段唯一的任务就是确定被调用方法的版本（即调用哪一个方法），暂时还不涉及方法内部的具体运行过程。

在程序运行时，进行方法调用是最为普遍、频繁的操作。前面说过 Class 文件的编译过程是不包含传统编译中的连接步骤的，一切方法调用在 Class 文件里面存储的都只是符号引用，而不是方法在运行时内存布局中的入口地址（相当于之前说的直接引用）。这个特性给 Java 带来了更强大的动态扩展能力，但也使得 Java 方法调用过程变得相对复杂起来，需要在类加载期间，甚至到运行期间才能确定目标方法的直接引用。

#### 解析

所有方法调用中的目标方法在 Class 文件里都是一个常量池中的符号引用，在类加载的解析阶段，会将其中一部分符号引用转化为直接引用，这种解析能成立的前提是方法在程序真正运行之前就有一个可确定的调用版本，并且这个方法的调用版本在运行期是不可改变的。话句话说，调用目标在程序代码写好、编译器进行编译时就必须确定下来。这类方法的调用称为解析（Resolution）。

Java 语言中符合「编译器可知，运行期不可变」这个要求的方法，主要包括静态方法和私有方法两大类，前者与类型直接关联，后者在外部不可被访问，这两种方法各自的特点决定了它们都不可能通过继承或者别的方式重写其它版本，因此它们都适合在类加载阶段解析。

与之相应的是，在 Java 虚拟机里提供了 5 条方法调用字节码指令，分别是：

*   invokestatic：调用静态方法；
*   invokespecial：调用实例构造器 方法、私有方法和父类方法；
*   invokevirtual：调用所有虚方法；
*   invokeinterface：调用接口方法，会在运行时再确定一个实现此接口的对象；
*   invokedynamic：先在运行时动态解析出调用点限定符所引用的方法，然后再执行该方法。

只要能被 invokestatic 和 invokespecial 指令调用的方法，都可以在解析阶段中确定唯一的调用版本，符合这个条件的有静态方法、私有方法、实例构造器、父类方法 4 类，它们在加载的时候就会把符号引用解析为直接引用。这些方法可以称为非虚方法，与之相反，其它方法称为虚方法（final 方法除外）。

Java 中的非虚方法除了使用 invokestatic、invokespecial 调用的方法之外还有一种，就是被 final 修饰的方法。虽然 final 方法是使用 invokevirtual 指令来调用的，但是由于它无法被覆盖，没有其它版本，所以也无需对方法接受者进行多态选择，又或者说多态选择的结果肯定是唯一的。在 Java 语言规范中明确说明了 final 方法是一种非虚方法。

解析调用一定是个静态过程，在编译期间就能完全确定，在类装载的解析阶段就会把涉及的符号引用全部转变为可确定的直接引用，不会延迟到运行期再去完成。而分派（Dispatch）调用则可能是静态的也可能是动态的，根据分派依据的宗量数可分为单分派和多分派。这两类分派方式的两两组合就构成了静态单分派、静态多分派、动态单分派、动态多分派 4 种分派组合情况，下面我们再看看虚拟机中的方法分派是如何进行的。

#### 分派

面向对象有三个基本特征，封装、继承和多态。这里要说的分派将会揭示多态特征的一些最基本的体现，如「重载」和「重写」在 Java 虚拟机中是如何实现的？虚拟机是如何确定正确目标方法的？

**静态分派**

在开始介绍静态分派前我们先看一段代码。

```java
/**
 * 方法静态分派演示
 *
 * @author baronzhang
 */
public class StaticDispatch {

    private static abstract class Human { }

    private static class Man extends Human { }

    private static class Woman extends Human { }

    private void sayHello(Human guy) {
        System.out.println("Hello, guy!");
    }

    private void sayHello(Man man) {
        System.out.println("Hello, man!");
    }

    private void sayHello(Woman woman) {
        System.out.println("Hello, woman!");
    }

    public static void main(String[] args) {

        Human man = new Man();
        Human woman = new Woman();
        StaticDispatch dispatch = new StaticDispatch();
        dispatch.sayHello(man);
        dispatch.sayHello(woman);
    }
}
```

运行后这段程序的输出结果如下：

```
Hello, guy!
Hello, guy!
```

稍有经验的 Java 程序员都能得出上述结论，但为什么我们传递给 sayHello() 方法的实际参数类型是 Man 和 Woman，虚拟机在执行程序时选择的却是 Human 的重载呢？要理解这个问题，我们先弄清两个概念。

```java
Human man = new Man();
```

上面这段代码中的「Human」称为变量的静态类型（Static Type），或者叫做外观类型（Apparent Type），后面的「Man」称为变量为实际类型（Actual Type），静态类型和实际类型在程序中都可以发生一些变化，区别是静态类型的变化仅发生在使用时，变量本身的静态类型不会被改变，并且最终的静态类型是在编译期可知的；而实际类型变化的结果在运行期才可确定，编译器在编译程序的时候并不知道一个对象的实际类型是什么。

弄清了这两个概念，再来看 StaticDispatch 类中 main() 方法里的两次 sayHello() 调用，在方法接受者已经确定是对象「dispatch」的前提下，使用哪个重载版本，就完全取决于传入参数的数量和数据类型。代码中定义了两个静态类型相同但是实际类型不同的变量，但是虚拟机（准确的说是编译器）在重载时是通过参数的静态类型而不是实际类型作为判定依据的。并且静态类型是编译期可知的，因此在编译阶段， Javac 编译器会根据参数的静态类型决定使用哪个重载版本，所以选择了 sayHello(Human) 作为调用目标，并把这个方法的符号引用写到 man() 方法里的两条 invokevirtual 指令的参数中。

所有依赖静态类型来定位方法执行版本的分派动作称为**静态分派**。静态分派的典型应用是方法重载。静态分派发生在编译阶段，因此确定静态分派的动作实际上不是由虚拟机来执行的。

另外，编译器虽然能确定方法的重载版本，但是很多情况下这个重载版本并不是「唯一」的，因此往往只能确定一个「更加合适」的版本。**产生这种情况的主要原因是字面量不需要定义，所以字面量没有显示的静态类型，它的静态类型只能通过语言上的规则去理解和推断**。下面的代码展示了什么叫「更加合适」的版本。

```java
/**
 * @author baronzhang
 */
public class Overlaod {

    static void sayHello(Object arg) {
        System.out.println("Hello, Object!");
    }

    static void sayHello(int arg) {
        System.out.println("Hello, int!");
    }

    static void sayHello(long arg) {
        System.out.println("Hello, long!");
    }

    static void sayHello(Character arg) {
        System.out.println("Hello, Character!");
    }

    static void sayHello(char arg) {
        System.out.println("Hello, char!");
    }

    static void sayHello(char... arg) {
        System.out.println("Hello, char...!");
    }

    static void sayHello(Serializable arg) {
        System.out.println("Hello, Serializable!");
    }

    public static void main(String[] args) {
        sayHello('a');
    }
}
```

上面代码的运行结果为：

```
Hello, char!
```

这很好理解，‘a’ 是一个 char 类型的数据，自然会寻找参数类型为 char 的重载方法，如果注释掉 sayHello(chat arg) 方法，那么输出结果将会变为：

```
Hello, int!
```

这时发生了一次类型转换， ‘a’ 除了可以代表一个字符，还可以代表数字 97，因为字符 ‘a’ 的 Unicode 数值为十进制数字 97，因此参数类型为 int 的重载方法也是合适的。我们继续注释掉 sayHello(int arg) 方法，输出变为：

```
Hello, long!
```

这时发生了两次类型转换，‘a’ 转型为整数 97 之后，进一步转型为长整型 97L，匹配了参数类型为 long 的重载方法。我们继续注释掉 sayHello(long arg) 方法，输出变为：

```
Hello, Character!
```

这时发生了一次自动装箱， ‘a’ 被包装为它的封装类型 java.lang.Character，所以匹配到了类型为 Character 的重载方法，继续注释掉 sayHello(Character arg) 方法，输出变为：

```
Hello, Serializable!
```

这里输出之所以为「Hello, Serializable!」，是因为 java.lang.Serializable 是 java.lang.Character 类实现的一个接口，当自动装箱后发现还是找不到装箱类，但是找到了装箱类实现了的接口类型，所以紧接着又发生了一次自动转换。char 可以转型为 int，但是 Character 是绝对不会转型为 Integer 的，他只能安全的转型为它实现的接口或父类。Character 还实现了另外一个接口 java.lang.Comparable，如果同时出现两个参数分别为 Serializable 和 Comparable 的重载方法，那它们在此时的优先级是一样的。编译器无法确定要自动转型为哪种类型，会提示类型模糊，拒绝编译。程序必须在调用时显示的指定字面量的静态类型，如：sayHello((Comparable) 'a')，才能编译通过。继续注释掉 sayHello(Serializable arg) 方法，输出变为：

```
Hello, Object!
```

这时是 char 装箱后转型为父类了，如果有多个父类，那将在继承关系中从下往上开始搜索，越接近上层的优先级越低。即使方法调用的入参值为 null，这个规则依然适用。继续注释掉 sayHello(Serializable arg) 方法，输出变为：

```
Hello, char...!
```

7 个重载方法以及被注释得只剩一个了，可见变长参数的重载优先级是最低的，这时字符 ‘a’ 被当成了一个数组元素。

前面介绍的这一系列过程演示了编译期间选择静态分派目标的过程，这个过程也是 Java 语言实现方法重载的本质。

**动态分派**

动态分派和多态性的另一个重要体现「重写（Override）」有着密切的关联，我们依旧通过代码来理解什么是动态分派。

```java
/**
 * 方法动态分派演示
 *
 * @author baronzhang
 */
public class DynamicDispatch {

    static abstract class Human {

        abstract void sayHello();
    }

    static class Man extends Human {

        @Override
        void sayHello() {
            System.out.println("Man say hello!");
        }
    }

    static class Woman extends Human {
        @Override
        void sayHello() {
            System.out.println("Woman say hello!");
        }
    }

    public static void main(String[] args){

        Human man = new Man();
        Human woman = new Woman();
        man.sayHello();
        woman.sayHello();

        man = new Woman();
        man.sayHello();
    }
}
```

代码执行结果：

```
Man say hello!
Woman say hello!
Woman say hello!
```

对于上面的代码，虚拟机是如何确定要调用哪个方法的呢？显然这里不再通过静态类型来决定了，因为静态类型同样都是 Human 的两个变量 man 和 woman 在调用 sayHello() 方法时执行了不同的行为，并且变量 man 在两次调用中执行了不同的方法。导致这个结果的原因是因为它们的实际类型不同。对于虚拟机是如何通过实际类型来分派方法执行版本的，这里我们就不做介绍了，有兴趣的可以去看看原著。

我们把这种在运行期根据实际类型来确定方法执行版本的分派称为**动态分派**。

**单分派和多分派**

方法的接收者和方法的参数统称为方法的宗量，这个定义最早来源于《Java 与模式》一书。根据分派基于多少宗量，可将分派划分为**单分派**和**多分派**。

单分派是根据一个宗量来确定方法的执行版本；多分派则是根据多余一个宗量来确定方法的执行版本。

我们依旧通过代码来理解(代码以著名的 3Q 大战作为背景)：

```java
/**
 * 单分派、多分派演示
 *
 * @author baronzhang
 */
public class Dispatch {

    static class QQ { }

    static class QiHu360 { }

    static class Father {

        public void hardChoice(QQ qq) {
            System.out.println("Father choice QQ!");
        }

        public void hardChoice(QiHu360 qiHu360) {
            System.out.println("Father choice 360!");
        }
    }

    static class Son extends Father {

        @Override
        public void hardChoice(QQ qq) {
            System.out.println("Son choice QQ!");
        }

        @Override
        public void hardChoice(QiHu360 qiHu360) {
            System.out.println("Son choice 360!");
        }
    }

    public static void main(String[] args) {

        Father father = new Father();
        Father son = new Son();

        father.hardChoice(new QQ());
        son.hardChoice(new QiHu360());
    }
}
```

代码输出结果：

```
Father choice QQ!
Son choice 360!
```

我们先来看看编译阶段编译器的选择过程，也就是静态分派过程。这个时候选择目标方法的依据有两点：一是静态类型是 Father 还是 Son；二是方法入参是 QQ 还是 QiHu360。**因为是根据两个宗量进行选择的，所以 Java 语言的静态分派属于多分派**。

再看看运行阶段虚拟机的选择过程，也就是动态分派的过程。在执行 son.hardChoice(new QiHu360()) 时，由于编译期已经确定目标方法的签名必须为 hardChoice(QiHu360)，这时参数的静态类型、实际类型都不会对方法的选择造成任何影响，唯一可以影响虚拟机选择的因数只有此方法的接收者的实际类型是 Father 还是 Son。因为只有一个宗量作为选择依据，所以 Java 语言的动态分派属于单分派。

综上所述，Java 语言是一门静态多分派、动态单分派的语言。

### 三. 基于栈的字节码解释执行引擎

虚拟机如何调用方法已经介绍完了，下面我们来看看虚拟机是如何执行方法中的字节码指令的。

#### 解释执行

Java 语言常被人们定义成「解释执行」的语言，但随着 JIT 以及可直接将 Java 代码编译成本地代码的编译器的出现，这种说法就不对了。只有确定了谈论对象是某种具体的 Java 实现版本和执行引擎运行模式时，谈解释执行还是编译执行才会比较确切。

无论是解释执行还是编译执行，无论是物理机还是虚拟机，对于应用程序，机器都不可能像人一样阅读、理解，然后获得执行能力。大部分的程序代码到物理机的目标代码或者虚拟机执行的指令之前，都需要经过下图中的各个步骤。下图中最下面的那条分支，就是传统编译原理中程序代码到目标机器代码的生成过程；中间那条分支，则是解释执行的过程。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/how-jvm-run-zijiema-zhiling-3c8a0865-2a77-464e-8dd6-5616fd6a72d7.png)


如今，基于物理机、Java 虚拟机或者非 Java 的其它高级语言虚拟机的语言，大多都会遵循这种基于现代编译原理的思路，在执行前先对程序源代码进行词法分析和语法分析处理，把源代码转化为抽象语法树。对于一门具体语言的实现来说，词法分析、语法分析以至后面的优化器和目标代码生成器都可以选择独立于执行引擎，形成一个完整意义的编译器去实现，这类代表是 C/C++。也可以为一个半独立的编译器，这类代表是 Java。又或者把这些步骤和执行全部封装在一个封闭的黑匣子中，如大多数的 JavaScript 执行器。

Java 语言中，Javac 编译器完成了程序代码经过词法分析、语法分析到抽象语法树、再遍历语法树生成字节码指令流的过程。因为这一部分动作是在 Java 虚拟机之外进行的，而解释器在虚拟机的内部，所以 Java 程序的编译就是半独立的实现。

许多 Java 虚拟机的执行引擎在执行 Java 代码的时候都有解释执行（通过解释器执行）和编译执行（通过即时编译器产生本地代码执行）两种选择。而对于最新的 Android 版本的执行模式则是 AOT + JIT + 解释执行，关于这方面我们后面有机会再聊。

#### 基于栈的指令集与基于寄存器的指令集

Java 编译器输出的指令流，基本上是一种基于栈的指令集架构。基于栈的指令集主要的优点就是可移植，寄存器由硬件直接提供，程序直接依赖这些硬件寄存器则不可避免的要受到硬件约束。栈架构的指令集还有一些其他优点，比如相对更加紧凑（字节码中每个字节就对应一条指令，而多地址指令集中还需要存放参数）、编译实现更加简单（不需要考虑空间分配的问题，所有空间都是在栈上操作）等。

栈架构指令集的主要缺点是执行速度相对来说会稍慢一些。所有主流物理机的指令集都是寄存器架构也从侧面印证了这一点。

虽然栈架构指令集的代码非常紧凑，但是完成相同功能需要的指令集数量一般会比寄存器架构多，因为出栈、入栈操作本身就产生了相当多的指令数量。更重要的是，栈实现在内存中，频繁的栈访问也意味着频繁的内存访问，相对于处理器来说，内存始终是执行速度的瓶颈。由于指令数量和内存访问的原因，所以导致了栈架构指令集的执行速度会相对较慢。

正是基于上述原因，Android 虚拟机中采用了基于寄存器的指令集架构。不过有一点不同的是，前面说的是物理机上的寄存器，而 Android 上指的是虚拟机上的寄存器。

----


引用链接：https://juejin.cn/post/6844903871010045960

----

GitHub 上标星 9300+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 9300+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
