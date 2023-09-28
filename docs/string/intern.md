---
title: Java 字符串优化：详解 String.intern() 方法
shortTitle: 详解 String.intern 方法
category:
  - Java核心
tag:
  - 数组&字符串
description: 本文详细解析了 Java 中 String.intern() 方法的工作原理和应用场景。了解 String.intern() 如何优化字符串处理性能，减少内存开销，并探讨其在实际开发中的使用技巧。深入了解字符串常量池和 String.intern() 方法之间的关联，以更好地应用于 Java 编程。
head:
  - - meta
    - name: keywords
      content: Java,字符串,String,intern,string intern,java intern,java string intern,String.intern
---

# 4.7 详解 String.intern() 方法

“哥，你发给我的那篇文章我看了，结果直接把我给看得不想学 Java 了！”三妹气冲冲地说。

“哪一篇啊？”看着三妹面色沉重，我关心地问到。

“就是[美团技术团队深入解析 `String.intern()` 那篇](https://tech.meituan.com/2014/03/06/in-depth-understanding-string-intern.html)啊！”三妹回答。

“哦，我想起来了，不挺好一篇文章嘛，深入浅出，精品中的精品，看完后你应该对 String 的 intern 方法彻底理解了才对呀。”

“好是好，但我就是看不懂！”三妹委屈地说，“哥，还是你亲自给我讲讲吧？”

“好吧，上次学的[字符串常量池](https://javabetter.cn/string/constant-pool.html)你都搞清楚了吧？”

“嗯。”三妹微微的点了点头。

要理解美团技术团队的这篇文章，你只需要记住这几点内容：

第一，使用双引号声明的字符串对象会保存在字符串常量池中。

第二，使用 new 关键字创建的字符串对象会先从字符串常量池中找，如果没找到就创建一个，然后再在堆中创建字符串对象；如果找到了，就直接在堆中创建字符串对象。

第三，针对没有使用双引号声明的字符串对象来说，就像下面代码中的 s1 那样：

```java
String s1 = new String("二哥") + new String("三妹");
```

如果想把 s1 的内容也放入字符串常量池的话，可以调用 `intern()` 方法来完成。

不过，需要注意的是，Java 7 的时候，字符串常量池从永久代中移动到了堆中，虽然此时永久代还没有完全被移除。Java 8 的时候，永久代被彻底移除。

这个变化也直接影响了  `String.intern()` 方法在执行时的策略，Java 7 之前，执行 `String.intern()` 方法的时候，不管对象在堆中是否已经创建，字符串常量池中仍然会创建一个内容完全相同的新对象； Java 7 之后呢，由于字符串常量池放在了堆中，执行 `String.intern()` 方法的时候，如果对象在堆中已经创建了，字符串常量池中就不需要再创建新的对象了，而是直接保存堆中对象的引用，也就节省了一部分的内存空间。

“还没有理解清楚，二哥”，三妹很苦恼。

“嗯。。。别怕，三妹，先来猜猜这段代码输出的结果吧。”我说。

```java
String s1 = new String("二哥三妹");
String s2 = s1.intern();
System.out.println(s1 == s2);
```

“哥，这我完全猜不出啊，还是你直接解释吧。”三妹说。

“好吧。”

第一行代码，字符串常量池中会先创建一个“二哥三妹”的对象，然后堆中会再创建一个“二哥三妹”的对象，s1 引用的是堆中的对象。

第二行代码，对 s1 执行 `intern()` 方法，该方法会从字符串常量池中查找“二哥三妹”这个字符串是否存在，此时是存在的，所以 s2 引用的是字符串常量池中的对象。

也就意味着 s1 和 s2 的引用地址是不同的，一个来自堆，一个来自字符串常量池，所以输出的结果为 false。

“来看一下运行结果。”我说。

```
false
```

“我来画幅图，帮助你理解下。”看到三妹惊讶的表情，我耐心地说。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/string/intern-01.png)

“这下理解了吧？”我问三妹。

“嗯嗯，一下子就豁然开朗了！”三妹说。

“好，我们再来看下面这段代码。”

```java
String s1 = new String("二哥") + new String("三妹");
String s2 = s1.intern();
System.out.println(s1 == s2);
```

“难道也输出 false ？”三妹有点不确定。

“不，这段代码会输出 true。”我否定了三妹的猜测。

“为啥呀？”三妹迫切地想要知道答案。

第一行代码，会在字符串常量池中创建两个对象，一个是“二哥”，一个是“三妹”，然后在堆中会创建两个匿名对象“二哥”和“三妹”，最后还有一个“二哥三妹”的对象（稍后会解释），s1 引用的是堆中“二哥三妹”这个对象。

第二行代码，对 s1 执行 `intern()` 方法，该方法会从字符串常量池中查找“二哥三妹”这个对象是否存在，此时不存在的，但堆中已经存在了，所以字符串常量池中保存的是堆中这个“二哥三妹”对象的引用，也就是说，s2 和 s1 的引用地址是相同的，所以输出的结果为 true。

“来看一下运行结果。”我胸有成竹地说。

```
true
```

“我再来画幅图，帮助你理解下。”

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/string/intern-02.png)

“哇，我明白了！”三妹长舒一口气，大有感慨 intern 也没什么难理解的意味，“不过，我有一个疑惑，“二哥三妹”这个对象是什么时候创建的呢？”

“三妹，不错嘛，能抓住问题的关键。再来解释一下 `String s1 = new String("二哥") + new String("三妹")` 这行代码。”我对三妹的表现非常开心。

1. 创建 "二哥" 字符串对象，存储在字符串常量池中。
2. 创建 "三妹" 字符串对象，存储在字符串常量池中。
3. 执行 `new String("二哥")`，在堆上创建一个字符串对象，内容为 "二哥"。
4. 执行 `new String("三妹")`，在堆上创建一个字符串对象，内容为 "三妹"。
5. 执行 `new String("二哥") + new String("三妹")`，会创建一个 StringBuilder 对象，并将 "二哥" 和 "三妹" 追加到其中，然后调用 StringBuilder 对象的 toString() 方法，将其转换为一个新的字符串对象，内容为 "二哥三妹"。这个新的字符串对象存储在堆上。

也就是说，当编译器遇到 `+` 号这个操作符的时候，会将 `new String("二哥") + new String("三妹")` 这行代码编译为以下代码：

```
new StringBuilder().append("二哥").append("三妹").toString();
```

实际执行过程如下：

- 创建一个 StringBuilder 对象。
- 在 StringBuilder 对象上调用 append("二哥")，将 "二哥" 追加到 StringBuilder 中。
- 在 StringBuilder 对象上调用 append("三妹")，将 "三妹" 追加到 StringBuilder 中。
- 在 StringBuilder 对象上调用 toString() 方法，将 StringBuilder 转换为一个新的字符串对象，内容为 "二哥三妹"。

关于 [StringBuilder](https://javabetter.cn/string/builder-buffer.html)，我们随后会详细地讲到。今天先了解到这。

不过需要注意的是，尽管 intern 可以确保所有具有相同内容的字符串共享相同的内存空间，但也不要烂用 intern，因为任何的缓存池都是有大小限制的，不能无缘无故就占用了相对稀缺的缓存空间，导致其他字符串没有坑位可占。

另外，字符串常量池本质上是一个固定大小的 StringTable，如果放进去的字符串过多，就会造成严重的哈希冲突，从而导致链表变长，链表变长也就意味着字符串常量池的性能会大幅下降，因为要一个一个找是需要花费时间的。

“好了，三妹，关于 String 的 intern 就讲到这吧，这次理解了吧？”我问。

“哥，你真棒！”

看到三妹一点一滴的进步，我也感到由衷的开心。

---

GitHub 上标星 9300+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 9300+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)