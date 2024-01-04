---
title: 如何调试 JVM 运行时数据？HSDB（Hotspot Debugger）从入门到实战
shortTitle: 如何调试 JVM 运行时数据？
category:
  - Java核心
tag:
  - Java虚拟机
description: 二哥的Java进阶之路，小白的零基础Java教程，从入门到进阶，HSDB（Hotspot Debugger）从入门到实战
head:
  - - meta
    - name: keywords
      content: Java,JavaSE,教程,二哥的Java进阶之路,jvm,Java虚拟机,HSDB
---

# 第十三节：如何调试 JVM 运行时数据？

`HSDB（Hotspot Debugger)`，是一款内置于 SA 中的 GUI 调试工具，可用于调试 JVM 运行时数据，从而进行故障排除。

## 启动HSDB

检测不同 JDK 版本需要使用不同的 `HSDB` 版本，否则容易出现无法扫描到对象等莫名其妙的问题

*   **Mac**：JDK7 和 JDK8 均可以采用以下的方式

  ```
$ sudo java -cp ,:/Library/Java/JavaVirtualMachines/jdk1.7.0_80.jdk/Contents/Home/lib/sa-jdi.jar sun.jvm.hotspot.HSDB
```

> 事实上经过测试，即使通过 JDK8 自带的 `sa-jdi.jar` 去扫描对象（`scanoops`）的时候也会发生扫不到的情况，但可以通过其他手段代替

而 JDK11 的启动方式有些区别

```
$ /Library/Java/JavaVirtualMachines/jdk-11.0.1.jdk/Contents/Home/bin/jhsdb hsdb
```

> 事实上经过测试，该版本启动的 `HSDB` 会少支持一些指令（比如 `mem, whatis`），**因此目前不推荐使用该版本**

*   **Windows**: 

```
$ java -classpath "%JAVA_HOME%/lib/sa-jdi.jar" sun.jvm.hotspot.HSDB
```

其中启动版本可以使用 `/usr/libexec/java_home -V` 获取

> 若遇到 Unable to locate an executable at “/Users/xx/.jenv/versions/1.7/bin/jhsdb” (-1) 可通过 `Jenv` 切换到当前 Jdk 版本即可解决

## JVM参数设置

`HSDB` 对 `Serial GC` 支持的较好，因此 Debug 时增加参数 `-XX:+UseSerialGC`，Debug 工具可以使用 IDE 或 JDB

## 获取应用进程id

jps 仅查找当前用户的 Java 进程，而不是当前系统中的所有进程

```
$ jps
```

*   默认**显示 pid **以及 **main 方法对应的 class 名称**
*   -v：**输出传递给 JVM 的参数**
*   -l： **输出 main 方法对应的 class 的完整 package 名**

## CLHSDB常用指令

*   `universe`：查看堆空间信息

*   `scanoops start end [type]`：扫描指定空间中的 type 类型及其子类的实例

> JDK8 版本的 `HSDB` 的 `scanoops` 会无法扫描到对象，但可以通过 GUI 界面的 `Tools -> Object Histogram`，输入想要查询的对象，之后双击来获取对象的地址，也可以继续在里面点击 `inspect` 来查看对象信息

*   `inspect`：查看对象（`OOP`）信息【使用 `tools->inspect`，输入对象地址有更详细的信息哦】

*   `revptrs`：反向指针，查找引用该对象的指针

## HSDB GUI界面

### 可视化线程栈

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/hsdb-a606c6ac-1cfc-44c3-8fdf-e0eeeabbf05a.png)

### 对象直方图

`Tools -> Object Histogram`，我们可以通过对象直方图快速定位某个类型的对象的地址以供我们进一步分析

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/hsdb-cf39737a-7d6a-42de-b843-123cba1f96aa.png)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/hsdb-974d211c-e627-40d6-af13-9560ebae0bfa.png)

### OOP信息

我们可以根据对象地址在 `Tools -> Inspector` 获取对象的在 JVM 层的实例 `instanceOopDesc` 对象，它包括对象头 `_mark` 和 `_metadata` 以及实例信息

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/hsdb-026fb881-59a2-4e0f-ac4a-a2a7b505a707.png)

### 堆信息

我们可以通过 `Tools -> Heap Parameters` 获取堆信息，可以结合对象地址判断对象位置

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/hsdb-3baabaf0-1681-4443-b8db-ae08128744d6.png)

### 加载类列表

我们可以通过 `Tools -> Class Browser` 来获取所有加载类列表

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/hsdb-7e4ebd1f-ba9c-4862-b4c3-574de5c30d6b.png)

### 元数据区

HotSpot VM 里有一套对象专门用来存放元数据，它们包括： 

*   `Klass` 系对象，用于描述类型的总体信息【**通过 `OOP` 信息（`inspect`）可以看到 `instanceKlass` 对象**】

*   `ConstantPool/ConstantPoolCache` 对象：每个 `InstanceKlass` 关联着一个 `ConstantPool`，作为该类型的运行时常量池。这个常量池的结构跟 Class 文件里的常量池基本上是对应的

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/hsdb-07d80d18-be4e-4861-bea3-291eea0ff262.png)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/hsdb-b7b0ebed-cd38-42b7-bebc-41090409a1db.png)

*   `Method` 对象，用来描述 Java 方法的总体信息，如方法入口地址、调用/循环计数器等等

    *   `ConstMethod` 对象，记录着 Java 方法的不变的描述信息，包括方法名、方法的访问修饰符、**字节码**、行号表、局部变量表等等。**注意，字节码指令被分配在 `constMethodOop` 对象的内存区域的末尾**
    *   `MethodData` 对象，记录着 Java 方法执行时的 profile 信息，例如某方法里的某个字节码之类是否从来没遇到过 null，某个条件跳转是否总是走同一个分支，等等。这些信息在解释器（多层编译模式下也在低层的编译生成的代码里）收集，然后供给 HotSpot Server Compiler 用于做激进优化。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/hsdb-59231922-9ce3-4107-ab1a-b33818cbab96.png)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/hsdb-85c6fca7-2d1f-4194-bc07-fd1e2ab18632.png)

*   `Symbol` 对象，对应 Class 文件常量池里的 `JVM_CONSTANT_Utf8` 类型的常量。有一个 VM 全局的 `SymbolTable` 管理着所有 `Symbol`。`Symbol` 由所有 Java 类所共享。

### 生成class文件

到对应类下点击 create .class 后就可以在执行 HSDB 的目录下看到生成的 class文件，适合查看动态代理生成的字节码

## 实战

### 分析对象存储区域

下面代码中的静态变量，成员变量分别存储在什么地方呢？

```java
public class Main {

    private static VMShow StaticVmShow = new VMShow();
    private VMShow objVmShow = new VMShow();

    public static void main(String[] args) {
        fn();
    }

    private static VMShow fn(){
        return new VMShow();
    }
}

class VMShow {
    private int basicInt = 1;
    private Integer objInt = 2;
    private static Integer staticInt = 3;
    private String basicString = "basicString";
    private static String staticString = new String("staticString");
}
```

首先查看对象直方图可以找到三个 VMShow 对象

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/hsdb-e5f0f200-83fd-4529-b5d6-416f9a6f626b.png)

那么如何确定这三个地址分别属于哪些变量呢？首先找静态变量，它在 JDK8 中是在 Class 对象中的，因此我们可以找它们的反向指针，如果是`java.lang.Class` 的那么就是静态变量

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/hsdb-301ebfc3-c2c4-49de-946a-5d2f1660e669.png)

我们可以从 ObjTest 的 `instanceKlass` 中的镜像找到 class 对象来验证是否是该对象的 class

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/hsdb-f22359ab-b066-405f-a754-197ccbd36884.png)

那么成员变量和局部变量如何区分呢？成员变量会被类实例引用，而局部变量地址则在会被被放在栈区

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/hsdb-51cb7321-fb7a-42b0-9321-edd410e3d328.png)

那么局部变量的反向指针都是 null，怎么确定它就被栈区所引用呢？我们可以看可视化线程栈

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/hsdb-51fb09f4-06d7-4518-8038-5dd69d765862.png)

### 分析字符串字面量存储区域

```java
public class StringTest {

    public static void main(String[] args) {
        String s1 = "a";
        String s2 = "b";
        String s3 = s1 + s2;
        String s4 = new String("ab");
        System.out.println(s4);
    }
}
```

上面一共涉及的字符串字面量和实例分别存储在什么地方呢？

1.  首先在 s2 处打上断点，启动 `HSDB` 监控该进程

2.  打开对象直方图发现只有 1 个 `a` 的字符串对象

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/hsdb-b5631e70-be3a-48de-99be-4468632d23e0.png)

3.  查找 StringTable 中 `a` 的对象地址

 ```
jseval "st = sa.vm.stringTable;st.stringsDo(function (s) { if (sapkg.oops.OopUtilities.stringOopToString(s).matches('^(a)')) {print(s + ': ');s.printValueOn(java.lang.System.out); println('')}})"
```

可以根据需要改变 `matches` 中的值来匹配

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/hsdb-76084b8d-6134-4866-8891-c24a43a3b836.png)

可以看到这个对象地址就是 StringTable 中引用的地址

4.  然后打断点在 sout 上，重新开始监控进程

5.  重新使用对象直方图查看 String 值

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/hsdb-f3c35027-2fe1-4b18-8a1c-b7243a9b5149.png)

这里有5个值，`ab` 有3个：

 *   `ab` 字面量
*   其中 s3 相当于 `new StringBuild().append("a").append("b").toString()`，会创建一个 `ab` 的实例
*   s4会创建一个 `ab` 的实例

6.  我们重新打印 StringTable 相应的值来验证

```
jseval "st = sa.vm.stringTable;st.stringsDo(function (s) { if (sapkg.oops.OopUtilities.stringOopToString(s).matches('^(a|b).?')) {print(s + ': ');s.printValueOn(java.lang.System.out); println('')}})"
```

 
![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/hsdb-f07a9fc8-5744-4859-9df9-c3a1016e936a.png)

那么运行时常量池中存放的是哪些呢？实际上它和 StringTable 一样是这些对象的引用，只不过 StringTable 是全局共享的，而运行时常量池只有该类的一些字面量。我们通过加载类列表可以查看

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/hsdb-25fa5e06-0250-424b-8b05-aea770e80963.png)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/hsdb-88e8c10d-e09c-4a74-95e6-e5b21577459f.png)

### 分析String.intern

```java
public class StringInternTest {

    public static void main(String[] args) {
        String s1 = new String("he") + new String("llo"); //  1
        s1.intern(); // 2
        String s2="hello"; // 3
        System.out.println(s1==s2); // true

        String s3 = new String("1") + new String("2"); // 4
        String s4 = "12"; // 5
        s3.intern(); // 6
        System.out.println(s3 == s4);  // false
    }
}
```

上述在编译器确定的字面量有 `he`, `llo`, `hello`, `1`,  `2`, `12`，但在真正执行到语句前，符号引用不一定解析成直接引用，即字面量对应的对象会在执行到语句时（`idc` 指令）才会创建

首先看通过加载类列表查看字节码指令： 

| line | bci | bytecode |
| --- | --- | --- |
| 7 | 0 | `new #2 [Class java.lang.StringBuilder]` |
| 7 | 3 | dup |
| 7 | 4 | `invokespecial #3 [Method void ()]` |
| 7 | 7 | `new #4 [Class java.lang.String]` |
| 7 | 10 | dup |
| 7 | 11 | `  ldc #5(0) [fast_aldc]` |
| 7 | 13 | `invokespecial #6 [Method void (java.lang.String)]` |
| 7 | 16 | `invokevirtual #7 [Method java.lang.StringBuilder append(java.lang.String)]` |
| 7 | 19 | `new #4 [Class java.lang.String]` |
| 7 | 22 | dup |
| 7 | 23 | `ldc #8(1) [fast_aldc]` |
| 7 | 25 | `invokespecial #6 [Method void (java.lang.String)]` |
| 7 | 28 | `invokevirtual #7 [Method java.lang.StringBuilder append(java.lang.String)]` |
| 7 | 31 | `invokevirtual #9 [Method java.lang.String toString()]` |
| 7 | 34 | astore_1 |
| 8 | 35 | aload_1 |
| 8 | 36 | `invokevirtual #10 [Method java.lang.String intern()]` |
| 8 | 39 | pop |
| 9 | 40 | `ldc #11(2) [fast_aldc]` |
| 9 | 42 | astore_2 |
| 10 | 43 | `getstatic #12 [Field java.io.PrintStream out]` |
| 10 | 46 | aload_1 |
| 10 | 47 | aload_2 |
| 10 | 48 | if_acmpne 55 |
| 10 | 51 | iconst_1 |
| 10 | 52 | goto 56 |
| 10 | 55 | iconst_0 |
| 10 | 56 | `invokevirtual #13 [Method void println(boolean)]` |
| 12 | 59 | `new #2 [Class java.lang.StringBuilder]` |
| 12 | 62 | dup |
| 12 | 63 | `invokevirtual #13 [Method void println(boolean)]` |
| 12 | 66 | `new #4 [Class java.lang.String]` |
| 12 | 69 | dup |
| 12 | 70 | `ldc #14(3) [fast_aldc]` |
| 12 | 72 | `invokespecial #6 [Method void (java.lang.String)]` |
| 12 | 75 | `invokevirtual #7 [Method java.lang.StringBuilder append(java.lang.String)]` |
| 12 | 78 | `new #4 [Class java.lang.String]` |
| 12 | 81 | dup |
| 12 | 82 | `ldc #15(4) [fast_aldc]` |
| 12 | 84 | `invokespecial #6 [Method void (java.lang.String)]` |
| 12 | 87 | `invokevirtual #7 [Method java.lang.StringBuilder append(java.lang.String)]` |
| 12 | 90 | `invokevirtual #9 [Method java.lang.String toString()]` |
| 12 | 93 | astore_3 |
| 13 | 94 | `ldc #16(5) [fast_aldc]` |
| 13 | 96 | astore #4 |
| 14 | 98 | aload_3 |
| 14 | 99 | `invokevirtual #10 [Method java.lang.String intern()]` |
| 14 | 102 | pop |
| 15 | 103 | `getstatic #12 [Field java.io.PrintStream out]` |
| 15 | 106 | aload_3 |
| 15 | 107 | aload #4 |
| 15 | 109 | if_acmpne 116 |
| 15 | 112 | iconst_1 |
| 15 | 113 | goto 117 |
| 15 | 116 | iconst_0 |
| 15 | 117 | `invokevirtual #13 [Method void println(boolean)]` |
| 16 | 120 | return |

可以看到确实有 6 个`idc`，但如果我们在第一行语句打上断点，会发现它们都不在 StringTable（但这里的 `he` 在，它可能被其他类用到了），然后执行第一行，会发现 `he` 和 `llo` 在了，但 `hello` 不在

```
jseval "st = sa.vm.stringTable;st.stringsDo(function (s) { if (sapkg.oops.OopUtilities.stringOopToString(s).matches('^(he|llo|hello|1|2|12)')) {print(s + ': ');s.printValueOn(java.lang.System.out); println('')}})"
```

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/hsdb-ca5d06a0-1690-4a8f-98cb-aa6bd7800afe.png)

但是 `hello` 对象还是存在的（new）

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/hsdb-85253e10-d0c2-442b-a26b-91b1b2588f1c.png)

接着执行 s1.intern 会将 `hello` 对象的地址放入 StringTable

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/hsdb-801d35f2-0c8a-4699-afbf-057c1e6cac6c.png)

再执行 `String s2="hello";` 会发现 `hello` 对象仍然只有一个，都指向同一个。

而继续在 6 打断点，即执行完 `String s4 = "12";`，因为 `12` 不在字符串常量池，那么会新建一个 `12`的实例，并让字符串常量池引用它，这样会发现就有两个 `12` 了

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/hsdb-47a42bfa-7645-4c9b-bcd8-aeabea1ae44f.png)


参考链接：https://juejin.cn/post/7072344870374866951

----

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
