---
title: 深入理解JVM的运行时数据区
shortTitle: 深入理解运行时数据区
category:
  - Java核心
tag:
  - Java虚拟机
description: 二哥的Java进阶之路，小白的零基础Java教程，从入门到进阶，咱们从头到尾说一次Java虚拟机的内存数据区，程序计数器、Java虚拟机栈、本地方法栈、堆、方法区与元空间
head:
  - - meta
    - name: keywords
      content: Java,JavaSE,教程,二哥的Java进阶之路,jvm,Java虚拟机,内存结构,内存数据区
---

# 第九节：深入理解运行时数据区

前面我们就讲过，Java 源代码文件经过编译器编译后会生成字节码文件，经过加载器加载完毕后会交给执行引擎执行。在执行的过程中，JVM 会划出来一块空间来存储程序执行期间需要用到的数据，这块空间一般被称为运行时数据区，见下图。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/neicun-jiegou-dac0f4c1-8a7e-4309-a599-5664cdaf5016.png)

根据 Java 虚拟机规范的规定，运行时数据区可以分为以下几个部分：

- 程序计数器（Program Counter Register）
- Java 虚拟机栈（Java Virtual Machine Stacks）
- 本地方法栈（Native Method Stack）
- 堆（Heap）
- 方法区（Method Area）

![](https://cdn.tobebetterjavaer.com/stutymore/neicun-jiegou-20240110194325.png)

>JDK 8 开始，永久代被彻底移除，取而代之的是元空间。元空间不再是 JVM 内存的一部分，而是通过本地内存（Native Memory）来实现的。也就是说，JDK 8 开始，方法区的实现就是元空间。


## 程序计数器

程序计数器（Program Counter Register）所占的内存空间不大，很小很小一块，可以看作是当前线程所执行的[字节码指令](https://javabetter.cn/jvm/zijiema-zhiling.html)的行号指示器。字节码解释器会在工作的时候改变这个计数器的值来选取下一条需要执行的字节码指令，像分支、循环、跳转、异常处理、线程恢复等功能都需要依赖这个计数器来完成。

在 JVM 中，多线程是通过线程轮流切换来获得 CPU 执行时间的，因此，在任一具体时刻，一个 CPU 的内核只会执行一条线程中的指令，因此，为了线程切换后能恢复到正确的执行位置，每个线程都需要有一个独立的程序计数器，并且不能互相干扰，否则就会影响到程序的正常执行次序。

也就是说，我们要求**程序计数器是线程私有的**。

《Java 虚拟机规范》中规定，如果线程执行的是非本地方法，则程序计数器中保存的是当前需要执行的指令地址；如果线程执行的是本地方法，则程序计数器中的值是 undefined。

为什么本地方法在程序计数器中的值是 undefined 的？因为[本地方法](https://javabetter.cn/oo/native-method.html)大多是通过 C/C++ 实现的，并未编译成需要执行的字节码指令。

我们来通过代码以及字节码指令来看看程序计数器的作用。

```java
public static int add(int a, int b) {
    return a + b;
}
```

字节码指令大致如下：

```java
0: iload_0      // 从局部变量表中加载变量 a 到操作数栈
1: iload_1      // 从局部变量表中加载变量 b 到操作数栈
2: iadd         // 两数相加
3: ireturn      // 返回
```

现在，让我们逐步分析程序计数器是如何在执行这些指令时更新的：

1. **初始状态**：当方法开始执行时，PC 计数器设置为 0，指向第一条指令 `0: iload_0`。

2. **执行第一条指令**：
   - 执行 `iload_0` 指令，将局部变量表中索引为 0 的整数（即方法的第一个参数 `a`）加载到操作数栈顶。
   - 执行完成后，PC 计数器更新为 1，指向下一条指令 `1: iload_1`。

3. **执行第二条指令**：
   - 执行 `iload_1` 指令，将局部变量表中索引为 1 的整数（即方法的第二个参数 `b`）加载到操作数栈顶。
   - 执行完成后，PC 计数器更新为 2，指向下一条指令 `2: iadd`。

4. **执行第三条指令**：
   - 执行 `iadd` 指令，弹出操作数栈顶的两个整数（即 `a` 和 `b`），将它们相加，然后将结果压入操作数栈顶。
   - 执行完成后，PC 计数器更新为 3，指向下一条指令 `3: ireturn`。

5. **执行最后一条指令：**
   - 执行 `ireturn` 指令，弹出操作数栈顶的整数（即 `a + b` 的结果），并将这个值作为方法的返回值。
   - 方法执行完成，控制权返回到方法调用者。


## Java 虚拟机栈

Java 虚拟机栈（JVM 栈）中是一个个[栈帧](https://javabetter.cn/jvm/stack-frame.html)，每个栈帧对应一个被调用的方法。当线程执行一个方法时，会创建一个对应的栈帧，并将栈帧压入栈中。当方法执行完毕后，将栈帧从栈中移除。

栈帧包含以下 5 个部分，见下图。我们前面已经详细地讲过[栈帧](https://javabetter.cn/jvm/stack-frame.html)了，忘记的球友可以回头去看一下。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/neicun-jiegou-4ea2a60a-05df-4ed1-8109-99ae23acefd1.png)


假设我们有一个简单的 add 方法，如下所示：

```java
public int add(int a, int b) {
    int result = a + b;
    return result;
}
```

当 `add` 方法被调用时，JVM 为这次方法调用创建一个新的栈帧。然后执行方法内的字节码指令，这部分我们前面已经讲过了，大家可以自己通过 [javap](https://javabetter.cn/jvm/bytecode.html) 查看字节码并模拟一下[字节码指令](https://javabetter.cn/jvm/zijiema-zhiling.html)执行的过程。

当 `add` 方法执行完毕后，对应的栈帧会从 JVM 栈中弹出。

Java 虚拟机栈的特点如下：

- **线程私有：** 每个线程都有自己的 JVM 栈，线程之间的栈是不共享的。
- **栈溢出：** 如果栈的深度超过了 JVM 栈所允许的深度，将会抛出 `StackOverflowError`，这个我们讲[栈帧](https://javabetter.cn/jvm/stack-frame.html)的时候讲过了。

大家可以猜一下 JVM 栈的默认大小是多少？

还用我们之前的讲栈帧时候的例子：

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

默认配置下，堆栈异常出现在 10886 次：

![](https://cdn.tobebetterjavaer.com/stutymore/neicun-jiegou-20231225143408.png)

增加 `-Xss256k` 后，来试试。

![](https://cdn.tobebetterjavaer.com/stutymore/neicun-jiegou-20231225143746.png)

1991 次出现了堆栈异常。

![](https://cdn.tobebetterjavaer.com/stutymore/neicun-jiegou-20231225143841.png)

这之间存在什么关系呢？

通过 `java -XX:+PrintFlagsFinal -version | grep ThreadStackSize` 这个命令可以查看 JVM 栈的默认大小。

![](https://cdn.tobebetterjavaer.com/stutymore/neicun-jiegou-20231225145929.png)

其中 `ThreadStackSize` 的单位是字节，也就是说默认的 JVM 栈大小是 1024 KB，也就是 1M。

也就是说，默认 1024 KB 的 JVM 栈可以执行 10885 次 `testStackOverflowError` 方法，而 256 KB 的 JVM 栈只能执行 1990 次 `testStackOverflowError` 方法，四五倍的样子。

## 本地方法栈

本地方法栈（Native Method Stack）与 Java 虚拟机栈类似，只不过 Java 虚拟机栈为虚拟机执行 Java 方法服务，而本地方法栈则为虚拟机使用到的 [Native 方法](https://javabetter.cn/oo/native-method.html)服务。

## 堆

堆是所有线程共享的一块内存区域，在  JVM 启动的时候创建，用来存储对象（数组也是一种对象）。

以前，Java 中“几乎”所有的对象都会在堆中分配，但随着 [JIT](https://javabetter.cn/jvm/jit.html) 编译器的发展和逃逸技术的逐渐成熟，所有的对象都分配到堆上渐渐变得不那么“绝对”了。从 JDK 7 开始，Java 虚拟机已经默认开启逃逸分析了，意味着如果某些方法中的对象引用没有被返回或者未被外面使用（也就是未逃逸出去），那么对象可以直接在栈上分配内存。

![](https://cdn.tobebetterjavaer.com/stutymore/neicun-jiegou-20231225154450.png)

栈就是前面提到的 JVM 栈（主要存储局部变量、方法参数、对象引用等），属于线程私有，通常随着方法调用的结束而消失，也就无需进行垃圾收集；堆前面也讲了，属于线程共享的内存区域，几乎所有的对象都在对上分配，生命周期不由单个方法调用所决定，可以在方法调用结束后继续存在，直到不在被任何变量引用，然后被垃圾收集器回收。

简单解释一下 JIT 和逃逸分析（后面讲 [JIT](https://javabetter.cn/jvm/jit.html) 会细讲）。

常见的编译型语言如 C++，通常会把代码直接编译成 CPU 所能理解的机器码来运行。而 Java 为了实现“一次编译，处处运行”的特性，把编译的过程分成两部分，首先它会先由 javac 编译成通用的中间形式——字节码，然后再由解释器逐条将字节码解释为机器码来执行。所以在性能上，Java 可能会干不过 C++ 这类编译型语言。

![](https://cdn.tobebetterjavaer.com/stutymore/what-is-jvm-20231223155202.png)

为了优化 Java 的性能 ，JVM 在解释器之外引入了 JIT 编译器：当程序运行时，解释器首先发挥作用，代码可以直接执行。随着时间推移，即时编译器逐渐发挥作用，把越来越多的代码编译优化成本地代码，来获取更高的执行效率。解释器这时可以作为编译运行的降级手段，在一些不可靠的编译优化出现问题时，再切换回解释执行，保证程序可以正常运行。

逃逸分析（Escape Analysis）是一种编译器优化技术，用于判断对象的作用域和生命周期。如果编译器确定一个对象不会逃逸出方法或线程的范围，它可以选择在栈上分配这个对象，而不是在堆上。这样做可以减少垃圾回收的压力，并提高性能。

我们来写一段可能触发栈分配的代码。

```java
public class EscapeAnalysisExample {

    private static class Point {
        private int x;
        private int y;

        Point(int x, int y) {
            this.x = x;
            this.y = y;
        }

        int calculate() {
            return x + y;
        }
    }

    public static void main(String[] args) {
        int total = 0;
        for (int i = 0; i < 1000000; i++) {
            total += createAndCalculate();
        }
        System.out.println(total);
    }

    private static int createAndCalculate() {
        Point p = new Point(1, 2);
        return p.calculate();
    }
}
```

- createAndCalculate 方法创建了一个 Point 对象，并调用它的 calculate 方法。
- Point 对象在 createAndCalculate 方法中创建，并且不会逃逸到该方法之外。
- 如果 JVM 的逃逸分析确定 Point 对象不会逃逸出 createAndCalculate 方法，它可能会在栈上分配 Point 对象，而不是在堆上。

堆我们前面已经讲过了，它除了是对象的聚集地，也是 [Java 垃圾收集器](https://javabetter.cn/jvm/gc.html)管理的主要区域，因此也被称作 GC 堆（Garbage Collected Heap）。从垃圾回收的角度来看，由于垃圾收集器基本都采用了分代垃圾收集的算法，所以堆还可以细分为：新生代和老年代。新生代还可以细分为：Eden 空间、From Survivor、To Survivor 空间等。进一步划分的目的是更好地回收内存，或者更快地分配内存。

>不要担心，这些我们会放到后面[垃圾回收](https://javabetter.cn/jvm/gc.html)的章节来细讲。

堆这最容易出现的就是 [OutOfMemoryError 错误](https://javabetter.cn/jvm/oom.html)，分为以下几种表现形式：

- `OutOfMemoryError: GC Overhead Limit Exceeded`：当 JVM 花太多时间执行垃圾回收并且只能回收很少的堆空间时，就会发生该错误。
- `java.lang.OutOfMemoryError: Java heap space`：假如在创建新的对象时, 堆内存中的空间不足以存放新创建的对象, 就会引发该错误。和本机的物理内存无关，和我们配置的虚拟机内存大小有关！

我们先来通过代码模拟一下堆内存溢出的情况。

```java
public class HeapSpaceErrorGenerator {
    public static void main(String[] args) {
        List<byte[]> bigObjects = new ArrayList<>();
        try {
            while (true) {
                // 创建一个大约 10MB 的数组
                byte[] bigObject = new byte[10 * 1024 * 1024];
                bigObjects.add(bigObject);
            }
        } catch (OutOfMemoryError e) {
            System.out.println("OutOfMemoryError 发生在 " + bigObjects.size() + " 对象后");
            throw e;
        }
    }
}
```

通过 VM 参数设置堆内存大小为 `-Xmx128M`，然后运行程序。

![](https://cdn.tobebetterjavaer.com/stutymore/neicun-jiegou-20231225160028.png)

可以看到，堆内存溢出发生在 11 个对象后。

![](https://cdn.tobebetterjavaer.com/stutymore/neicun-jiegou-20231225160115.png)

默认的堆内存大小是多少呢？

通过 `java -XX:+PrintFlagsFinal -version | grep HeapSize` 这个命令可以查看 JVM 堆的默认大小。

![](https://cdn.tobebetterjavaer.com/stutymore/neicun-jiegou-20231225160212.png)

也可以通过下面这行代码获取：

```java
System.out.println(Runtime.getRuntime().maxMemory() / 1024.0 / 1024 + "MB");
```

大家可以通过上面的方法查看一下自己本机电脑的堆内存大小。

## 元空间和方法区

方法区是 Java 虚拟机规范上的一个逻辑区域，在不同的 JDK 版本上有着不同的实现。在 JDK 7 的时候，方法区被称为永久代（PermGen），而在 JDK 8 的时候，永久代被彻底移除，取而代之的是元空间。

如果你在有些资料上依然看到了永久代，要么就是二哥这样在给你解释，要么就是内容过时了。

>《Java 虚拟机规范》中只规定了有方法区这么一个概念和它的作用，并没有规定如何去实现它。不同的 Java 虚拟机可能就会有不同的实现。永久代是 HotSpot 对方法区的一种实现形式。也就是说，永久代是 HotSpot 旧版本中的一个实现，而方法区则是 Java 虚拟机规范中的一个定义，一种规范。

换句话说，方法区和永久代的关系就像是 Java 中接口和类的关系，类实现了接口，接口还是那个接口，但实现已经完全升级了。

![](https://cdn.tobebetterjavaer.com/stutymore/neicun-jiegou-20240110195211.png)

JDK 7 之前，只有常量池的概念，都在方法区中。

JDK 7 的时候，字符串常量池从方法区中拿出来放到了堆中，运行时常量池还在方法区中（也就是永久代中）。

JDK 8 的时候，HotSpot 移除了永久代，取而代之的是元空间。[字符串常量池](https://javabetter.cn/string/constant-pool.html)还在堆中，而运行时常量池跑到了元空间。

![](https://cdn.tobebetterjavaer.com/stutymore/neicun-jiegou-20231227111238.png)

**为什么要废弃永久代，而使用元空间来进行替换呢？**

旧版的 Hotspot 虚拟机是没有 JIT 的，而 Oracle 旗下的另外一款虚拟机 JRocket 是有的，那为了将 Java 帝国更好的传下去，Oracle 就想把庶长子 JRocket 的 JIT 技术融合到嫡长子 Hotspot 中。

但 JRockit 虚拟机中并没有永久代的概念，因此新的 HotSpot 索性就不要永久代了，直接占用操作系统的一部分内存好了，并且把这块内存取名叫做元空间。

元空间的大小不再受限于 JVM 启动时设置的最大堆大小，而是直接利用本地内存，也就是操作系统的内存。有效地解决了 OutOfMemoryError 错误。

>可以通过 `java -XX:+PrintFlagsFinal -version | grep HeapSize` 查看 JVM 默认的堆内存大小。

![](https://cdn.tobebetterjavaer.com/stutymore/neicun-jiegou-20231225192753.png)

当元空间的数据增长时，JVM 会请求操作系统分配更多的内存。如果内存空间足够，操作系统就会满足 JVM 的请求。那会不会出现元空间溢出的情况呢？

答案是肯定的，这个我们留到[内存溢出](https://javabetter.cn/jvm/oom.html)的章节里来细讲。

### 运行时常量池

在讲字节码的时候，我们详细的讲过[常量池](https://javabetter.cn/jvm/bytecode.html)，它是字节码文件的资源仓库，先是一个常量池大小，从 1 到 n-1，0 为保留索引，然后是常量池项的集合，包括类信息、字段信息、方法信息、接口信息、字符串常量等。

![](https://cdn.tobebetterjavaer.com/stutymore/neicun-jiegou-20231225183354.png)

运行时常量池，顾名思义，就是在运行时期间，JVM 会将字节码文件中的常量池加载到内存中，存放在运行时常量池中。

也就是说，常量池是在字节码文件中，而运行时常量池在元空间当中（JDK 8 及以后），讲的是一个东西，但形态不一样，就好像一个是固态，一个是液态；或者一个是模子，一个是模子里的锅碗瓢盆。

![](https://cdn.tobebetterjavaer.com/stutymore/neicun-jiegou-20231225184358.png)

### 字符串常量池

字符串常量池我们在讲[字符串](https://javabetter.cn/string/constant-pool.html)的时候已经详细讲过了，它的作用是存放字符串常量，也就是我们在代码中写的字符串。依然在堆中。

![](https://cdn.tobebetterjavaer.com/stutymore/neicun-jiegou-20231225184843.png)

OK，方法区（不管是永久代还是元空间的实现）和堆一样，**是线程共享的区域**。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/neicun-jiegou-e33179f3-275b-44c9-87f6-802198f8f360.png)

## 小结

来总结一下运行时数据区的主要组成：

- PC 寄存器（PC Register），也叫程序计数器（Program Counter Register），是一块较小的内存空间，它的作用可以看做是当前线程所执行的字节码的信号指示器。
- JVM 栈（Java Virtual Machine Stack），与 PC 寄存器一样，JVM 栈也是线程私有的。每一个 JVM 线程都有自己的 JVM 栈（也叫方法栈），这个栈与线程同时创建，它的生命周期与线程相同。
- 本地方法栈（Native Method Stack），JVM 可能会使用到传统的栈来支持 [Native 方法](https://javabetter.cn/oo/native-method.html)的执行，这个栈就是本地方法栈。
- 堆（Heap），在 JVM 中，堆是可供各条线程共享的运行时内存区域，也是供所有类实例和数据对象分配内存的区域。
- 方法区（Method area），JDK 8 开始，使用元空间取代了永久代。**方法区是 JVM 中的一个逻辑区域**，用于存储类的结构信息，包括类的定义、方法的定义、字段的定义以及字节码指令。不同的是，元空间不再是 JVM 内存的一部分，而是通过本地内存（Native Memory）来实现的。
- [运行时常量池](https://javabetter.cn/jvm/neicun-jiegou.html)，运行时常量池是每一个类或接口的常量在运行时的表现形式，它包括了编译器可知的数值字面量，以及运行期解析后才能获得的方法或字段的引用。简而言之，当一个方法或者变量被引用时，JVM 通过运行时常量区来查找方法或者变量在内存里的实际地址。

在 JVM 启动时，元空间的大小由 MaxMetaspaceSize 参数指定，JVM 在运行时会自动调整元空间的大小，以适应不同的程序需求。

![](https://cdn.tobebetterjavaer.com/stutymore/what-is-jvm-20231030191213.png)



----

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
