### 45.什么是序列化？什么是反序列化？

什么是序列化，序列化就是**把 Java 对象转为二进制流**，方便存储和传输。

所以**反序列化就是把二进制流恢复成对象**。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/sanfene/serializable-1.png)

类比我们生活中一些大件物品的运输，运输的时候把它拆了打包，用的时候再拆包组装。

> Serializable 接口有什么用？

这个接口只是一个标记，没有具体的作用，但是如果不实现这个接口，在有些序列化场景会报错，所以一般建议，创建的 JavaBean 类都实现 Serializable。

> serialVersionUID 又有什么用？

serialVersionUID 就是起验证作用。

```java
private static final long serialVersionUID = 1L;
```

我们经常会看到这样的代码，这个 ID 其实就是用来验证序列化的对象和反序列化对应的对象 ID 是否一致。

这个 ID 的数字其实不重要，无论是 1L 还是 IDE 自动生成的，只要序列化时候对象的 serialVersionUID 和反序列化时候对象的 serialVersionUID 一致的话就行。

如果没有显示指定 serialVersionUID ，则编译器会根据类的相关信息自动生成一个，可以认为是一个指纹。

所以如果你没有定义一个 serialVersionUID， 结果序列化一个对象之后，在反序列化之前把对象的类的结构改了，比如增加了一个成员变量，则此时的反序列化会失败。

因为类的结构变了，所以 serialVersionUID 就不一致。

> Java 序列化不包含静态变量？

序列化的时候是不包含静态变量的。

> 如果有些变量不想序列化，怎么办？

对于不想进行序列化的变量，使用`transient`关键字修饰。

`transient` 关键字的作用是：阻止实例中那些用此关键字修饰的的变量序列化；当对象被反序列化时，被 `transient` 修饰的变量值不会被持久化和恢复。`transient` 只能修饰变量，不能修饰类和方法。

### 46.说说有几种序列化方式？

Java 序列化方式有很多，常见的有三种：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/sanfene/serializable-2.png)

- Java 对象流列化 ：Java 原生序列化方法即通过 Java 原生流(InputStream 和 OutputStream 之间的转化)的方式进行转化，一般是对象输出流 `ObjectOutputStream`和对象输入流`ObjectI叩utStream`。
- Json 序列化：这个可能是我们最常用的序列化方式，Json 序列化的选择很多，一般会使用 jackson 包，通过 ObjectMapper 类来进行一些操作，比如将对象转化为 byte 数组或者将 json 串转化为对象。
- ProtoBuff 序列化：ProtocolBuffer 是一种轻便高效的结构化数据存储格式，ProtoBuff 序列化对象可以很大程度上将其压缩，可以大大减少数据传输大小，提高系统性能。

> 图文详解 53 道Java基础面试高频题，整理：沉默王二，戳[转载链接](https://mp.weixin.qq.com/s/t7EYyF0VGEg1rAZut9dwSw)，作者：三分恶，戳[原文链接](https://mp.weixin.qq.com/s/M-6RSRcRd3X93cR7VXpanw)。
