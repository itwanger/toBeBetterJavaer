---
title: Java 中，先有Class还是先有Object？
shortTitle: 先有Class还是先有Object？
category:
  - Java核心
tag:
  - Java重要知识点
description: Java程序员进阶之路，小白的零基础Java教程，从入门到进阶，Java 中，先有Class还是先有Object？
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,java,class,object
---



Java 对象模型中：

- 所有的类都是Class类的实例，Object是类，那么Object也是Class类的一个实例。
- 所有的类都最终继承自Object类，Class是类，那么Class也继承自Object。

那到底是先有Class还是先有Object？ JVM 是怎么处理这个“鸡·蛋”问题呢？

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/basic-extra-meal/class-object-2f47490c-70b8-41b8-9551-42c2f98eea91.png)

针对这个问题，我在知乎上看到了 R 大的一个回答，正好解答了我心中的疑惑，就分享出来给各位小伙伴一个参考和启发~

>作者：RednaxelaFX，整理：沉默王二，参考链接：[https://www.zhihu.com/question/30301819/answer/47539163](https://www.zhihu.com/question/30301819/answer/47539163)

-----

“鸡・蛋”问题通常都是通过一种叫“自举”（bootstrap）的过程来解决的。

“鸡蛋问题”的根本矛盾就在于假定了“鸡”或“蛋”的其中一个要先进入“完全可用”的状态。而许多现实中被简化为“鸡蛋问题”的情况实际可以在“混沌”中把“鸡”和“蛋”都初始化好，而不存在先后问题；在它们初始化的过程中，两者都不处于“完全可用”状态，而完成初始化后它们就同时都进入了可用状态。

打个比方，番茄炒蛋。并不是要先把番茄完全炒好，然后把鸡蛋完全炒好，然后把它们混起来；而是先炒番茄炒到半熟，再炒鸡蛋炒到半熟，然后把两个半熟的部分混在一起同时炒熟。

对于**先有Class还是先有Object**这个问题来说，题主假设所有的类都是Class类的实例，Object是类，那么Object也是Class类的一个实例，这个假设就是错的。

`java.lang.Object`是一个Java类，但并不是`java.lang.Class`的一个实例。后者只是一个用于描述Java类与接口的、用于支持反射操作的类型。这点上Java跟其它一些更纯粹的面向对象语言（例如Python和Ruby）不同。

第二个假设“所有的类都最终继承自Object类，Class是类，那么Class也继承自Object”是对的，`java.lang.Class`是`java.lang.Object`的派生类，前者继承自后者。

虽然第1个假设不对，但“鸡蛋问题”仍然存在：在一个已经启动完毕、可以使用的Java对象系统里，必须要有一个`java.lang.Class`实例对应`java.lang.Object`这个类；而`java.lang.Class`是`java.lang.Object`的派生类，按“一般思维”，前者应该要在后者完成初始化之后才可以初始化…

事实是：这些相互依赖的核心类型完全可以在“混沌”中一口气都初始化好，然后对象系统的状态才叫做完成了“bootstrap”，后面就可以按照Java对象系统的一般规则去运行。JVM、JavaScript、Python、Ruby等的运行时都有这样的bootstrap过程。

在“混沌”（boostrap过程）里，JVM可以为对象系统中最重要的一些核心类型先分配好内存空间，让它们进入[已分配空间]但[尚未完全初始化]状态。

此时这些对象虽然已经分配了空间，但因为状态还不完整所以尚不可使用。然后，通过这些分配好的空间把这些核心类型之间的引用关系串好。

到此为止所有动作都由JVM完成，尚未执行任何Java字节码。然后这些核心类型就进入了[完全初始化]状态，对象系统就可以开始自我运行下去，也就是可以开始执行Java字节码来进一步完成Java系统的初始化了。

在HotSpot VM里，有一个叫做“Universe”的C++类用于记录对象系统的总体状态。它有这么两个有趣的字段记录当前是处于bootstrapping阶段还是已经完全初始化好：

```
static bool is_bootstrapping()                      { return _bootstrapping; }
static bool is_fully_initialized()                  { return _fully_initialized; }
```

然后`Universe::genesis()`函数会在bootstrap阶段中创建核心类型的对象模型，其中会调用`SystemDictionary::initialize()`来初始化对象系统的核心类型，其中会进一步跑到`SystemDictionary::initialize_preloaded_classes()`来创建`java.lang.Object`、`java.lang.Class`等核心类型。

这个函数在加载了`java.lang.Object`、`java.lang.Class`等核心类型后会调用`Universe::fixup_mirrors()`来完成前面说的“把引用关系串起来”的动作：

```
// Fixup mirrors for classes loaded before java.lang.Class.
// These calls iterate over the objects currently in the perm gen
// so calling them at this point is matters (not before when there
// are fewer objects and not later after there are more objects
// in the perm gen.
Universe::initialize_basic_type_mirrors(CHECK);
Universe::fixup_mirrors(CHECK);

void Universe::fixup_mirrors(TRAPS) {
  // Bootstrap problem: all classes gets a mirror (java.lang.Class instance) assigned eagerly,
  // but we cannot do that for classes created before java.lang.Class is loaded. Here we simply
  // walk over permanent objects created so far (mostly classes) and fixup their mirrors. Note
  // that the number of objects allocated at this point is very small.

  // ...
}
```

就是这样：“**Object里有一个成员变量指向Class类实例c，c保存这个Object成员、方法的名字和地址的Map映射用作反射**。”涉及到主类有这么几个：

```
http://hg.openjdk.java.net/jdk8u/jdk8u/hotspot/file/ade5be2b1758/src/share/vm/memory/universe.hpp#l399
http://hg.openjdk.java.net/jdk8u/jdk8u/hotspot/file/ade5be2b1758/src/share/vm/memory/universe.cpp#l259
http://hg.openjdk.java.net/jdk8u/jdk8u/hotspot/file/ade5be2b1758/src/share/vm/classfile/systemDictionary.cpp#l1814
```

分享的最后，二哥要简单说两句，每次看 R 大的内容，总是感觉膝盖忍不住要跪一下，只能说写过 JVM 的男人就是不一样。喜欢研究 CPP 源码的话小伙伴可以再深入学习下，一定会有所收获。

----


最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)











