---
title: Java中的instanceof关键字是如何实现的？
shortTitle: instanceof关键字是如何实现的？
category:
  - Java核心
tag:
  - Java重要知识点
description: Java程序员进阶之路，小白的零基础Java教程，从入门到进阶，Java中的instanceof关键字是如何实现的？
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,java,instanceof
---


小二那天去面试，碰到了这个问题：“**instanceof 关键字是如何实现的**？”面试官希望他能从底层来分析一下，结果小二没答上来，就来问我。

我唯唯诺诺，强装镇定，只好把 R 大的一篇回答甩给了他，并且叮嘱他：“认认真真看，玩完后要是还不明白，再来问我。。。”

>作者：RednaxelaFX，整理：沉默王二，链接：[https://www.zhihu.com/question/21574535/answer/18998914](https://www.zhihu.com/question/21574535/answer/18998914)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/basic-extra-meal/instanceof-jvm-b676fee6-bfd4-4ae9-9c7b-e488e345f775.gif)

--------

## 场景一：月薪 3000 元一下的码农职位

用 Java 伪代码来表现instanceof关键字在Java语言规范所描述的运行时语义，是这样的：

```java
// obj instanceof T
boolean result;
if (obj == null) {
  result = false;
} else {
  try {
      T temp = (T) obj; // checkcast
      result = true;
  } catch (ClassCastException e) {
      result = false;
  }
}
```

用中文说就是：如果有表达式 `obj instanceof T`，那么如果 obj 不为 null 并且 (T) obj 不抛 ClassCastException 异常则该表达式值为 true ，否则值为 false 。

如果面试官说“这不是废话嘛”，进入场景二。

## 场景二：月薪6000-8000的Java研发职位

JVM有一条名为 instanceof 的指令，而Java源码编译到Class文件时会把Java语言中的 instanceof 运算符映射到JVM的 instanceof 指令上。

javac是这样做的：

- instanceof 是javac能识别的一个关键字，对应到Token.INSTANCEOF的token类型。做词法分析的时候扫描到"instanceof"关键字就映射到了一个Token.INSTANCEOF token。
- 该编译器的抽象语法树节点有一个JCTree.JCInstanceOf类用于表示instanceof运算。做语法分析的时候解析到[instanceof运算符](https://tobebetterjavaer.com/basic-extra-meal/instanceof.html)就会生成这个JCTree.JCInstanceof类型的节点。
- 中途还得根据Java语言规范对instanceof运算符的编译时检查的规定把有问题的情况找出来。
- 到最后生成字节码的时候为JCTree.JCInstanceof节点生成instanceof字节码指令。

回答到这层面就已经能解决好些实际问题了，如果面试官还说，“这不还是废话嘛”，进入场景三。

## 场景三：月薪10000的Java高级研发职位

先简单介绍一下instanceof的字节码：

- 操作：确定对象是否为给定的类型
- 指令格式：instanceof|indexbyte1|indexbyte2
- 指令执行前后的栈顶状态：
  - ……，objectref=>
  - ……，result

再简单描述下：indexbyte1和indexbyte2用于构造对当前类的常量池的索引，objectref为reference类型，可以是某个类，数组的实例或者是接口。

基本的实现过程：对indexbyte1和indexbyte2构造的常量池索引进行解析，然后根据java规范判断解析的类是不是objectref的一个实例，最后在栈顶写入结果。

基本上就是根据规范来 YY 下实现，就能八九不离十蒙混过关了。

如果面试官还不满意，进入场景四。

## 场景四：月薪10000以上的Java资深研发职位

这个岗位注重性能调优什么的，R 大说可以上论文了：

>[https://dl.acm.org/doi/10.1145/583810.583821](https://dl.acm.org/doi/10.1145/583810.583821)

论文我也看不懂，所以这里就不 BB 了。（逃

篇论文描述了HotSpot VM做子类型判断的算法，这里简单补充一下JDK6至今的HotSpot VM实际采用的算法：

```java
S.is_subtype_of(T) := {
  int off = T.offset;
  if (S == T) return true;
  if (T == S[off]) return true;
  if (off != &cache) return false;
  if ( S.scan_secondary_subtype_array(T) ) {
    S.cache = T;
    return true;
  }
  return false;
}
```

HotSpot VM的两个编译器，Client Compiler (C1) 与 Server Compiler (C2) 各自对子类型判断的实现有更进一步的优化。实际上在JVM里，instanceof的功能就实现了4份，VM runtime、解释器、C1、C2各一份。

VM runtime的：

>[http://hg.openjdk.java.net/jdk7u/jdk7u/hotspot/file/tip/src/share/vm/oops/oop.inline.hpp](http://hg.openjdk.java.net/jdk7u/jdk7u/hotspot/file/tip/src/share/vm/oops/oop.inline.hpp)

分享的最后，二哥简单来说一下。

这个问题涉及语法细节，涉及jvm实现，涉及编译器，还涉及一点点数据结构设计，比较考验一个 Java 程序员的内功，如果要回答到论文的程度，那真的是，面试官也得提前备好知识点，不然应聘者的回答啥也听不懂就挺尴尬的。

反正 R 大回答里的很多细节我都是第一次听，逃了逃了。。。。。。

----

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
