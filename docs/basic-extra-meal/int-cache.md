---
title: Java中new Integer与Integer.valueOf的区别
shortTitle: new Integer与Integer.valueOf的区别
category:
  - Java核心
tag:
  - Java重要知识点
description: Java程序员进阶之路，小白的零基础Java教程，从入门到进阶，Java中new Integer与Integer.valueOf的区别
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,Integer
---

“三妹，今天我们来补一个小的知识点：Java 数据类型缓存池。”我喝了一口枸杞泡的茶后对三妹说，“考你一个问题哈：`new Integer(18) 与 Integer.valueOf(18)` 的区别是什么？”

“难道不一样吗？”三妹有点诧异。

“不一样的。”我笑着说。

- `new Integer(18)` 每次都会新建一个对象;
- `Integer.valueOf(18)` 会使⽤用缓存池中的对象，多次调用只会取同⼀一个对象的引用。

来看下面这段代码：

```java
Integer x = new Integer(18);
Integer y = new Integer(18);
System.out.println(x == y);

Integer z = Integer.valueOf(18);
Integer k = Integer.valueOf(18);
System.out.println(z == k);

Integer m = Integer.valueOf(300);
Integer p = Integer.valueOf(300);
System.out.println(m == p);
```

来看一下输出结果吧：

```
false
true
false
```

“第一个 false，我知道原因，因为 new 出来的是不同的对象，地址不同。”三妹解释道，“第二个和第三个我认为都应该是 true 啊，为什么第三个会输出 false 呢？这个我理解不了。”

“其实原因也很简单。”我胸有成竹地说。

基本数据类型的包装类除了 Float 和 Double 之外，其他六个包装器类（Byte、Short、Integer、Long、Character、Boolean）都有常量缓存池。

- Byte：-128~127，也就是所有的 byte 值
- Short：-128~127
- Long：-128~127
- Character：\u0000 - \u007F
- Boolean：true 和 false

拿 Integer 来举例子，Integer 类内部中内置了 256 个 Integer 类型的缓存数据，当使用的数据范围在 -128~127 之间时，会直接返回常量池中数据的引用，而不是创建对象，超过这个范围时会创建新的对象。

 18 在 -128~127 之间，300 不在。

来看一下 valueOf 方法的源码吧。

```java
public static Integer valueOf(int i) {
    if (i >=IntegerCache.low && i <=IntegerCache.high)
        return IntegerCache.cache[i + (-IntegerCache.low)];
    return new Integer(i);
}
```

“哦，原来是因为 Integer.IntegerCache 这个内部类的原因啊！”三妹好像发现了新大陆。

“是滴。来看一下 IntegerCache 这个静态内部类的源码吧。”

```java
private static class IntegerCache {
    static final int low = -128;
    static final int high;
    static final Integer cache[];

    static {
        // high value may be configured by property
        int h = 127;
        String integerCacheHighPropValue =
                sun.misc.VM.getSavedProperty("java.lang.Integer.IntegerCache.high");
        if (integerCacheHighPropValue != null) {
            try {
                int i = parseInt(integerCacheHighPropValue);
                i = Math.max(i, 127);
                // Maximum array size is Integer.MAX_VALUE
                h = Math.min(i, Integer.MAX_VALUE - (-low) -1);
            } catch( NumberFormatException nfe) {
                // If the property cannot be parsed into an int, ignore it.
            }
        }
        high = h;

        cache = new Integer[(high - low) + 1];
        int j = low;
        for(int k = 0; k < cache.length; k++)
            cache[k] = new Integer(j++);

        // range [-128, 127] must be interned (JLS7 5.1.7)
        assert Integer.IntegerCache.high >= 127;
    }

    private IntegerCache() {}
}
```



之前我们在[学习 static 关键字](https://tobebetterjavaer.com/oo/static.html)的时候，提到过静态代码块，还记得吧？三妹。静态代码块通常用来初始化一些静态变量，它会优先于 main() 方法执行。

在静态代码块中，low 为 -128，也就是缓存池的最小值；high 默认为 127，也就是缓存池的最大值，共计 256 个。

*可以在 JVM 启动的时候，通过 `-XX:AutoBoxCacheMax=NNN` 来设置缓存池的大小，当然了，不能无限大，最大到 `Integer.MAX_VALUE -129`*

之后，初始化 cache 数组的大小，然后遍历填充，下标从 0 开始。

“明白了吧？三妹。”我喝了一口水后，扭头看了看旁边的三妹。

“这段代码不难理解，难理解的是 `assert Integer.IntegerCache.high >= 127;`，这行代码是干嘛的呀？”三妹很是不解。

“哦哦，你挺细心的呀！”三妹真不错，求知欲望越来越强烈了。

assert 是 Java 中的一个关键字，寓意是断言，为了方便调试程序，并不是发布程序的组成部分。

默认情况下，断言是关闭的，可以在命令行运行 Java 程序的时候加上 `-ea` 参数打开断言。

来看这段代码。

```java
public class AssertTest {
    public static void main(String[] args) {
        int high = 126;
        assert high >= 127;
    }
}
```

假设手动设置的缓存池大小为 126，显然不太符合缓存池的预期值 127，结果会输出什么呢？

直接在 Intellij IDEA 中打开命令行终端，进入 classes 文件，执行：

```
 /usr/libexec/java_home -v 1.8 --exec java -ea com.itwanger.s51.AssertTest
```

*我用的 macOS 环境，装了好多个版本的 JDK，该命令可以切换到 JDK 8*

也可以不指定 Java 版本直接执行（加上 `-ea` 参数）：

```
java -ea com.itwanger.s51.AssertTest
```

“呀，报错了呀。”三妹喊道。

```
Exception in thread "main" java.lang.AssertionError
        at com.itwanger.s51.AssertTest.main(AssertTest.java:9)
```

“是滴，因为 126 小于 127。”我回答道。

“原来 assert 是这样用的啊，我明白了。”三妹表示学会了。

“那，缓存池之所以存在的原因也是因为这样做可以提高程序的整体性能，因为相对来说，比如说 Integer，-128~127 这个范围内的 256 个数字使用的频率会高一点。”我总结道。

“get 了！二哥你真棒，又学到了。”三妹很开心~

----

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)