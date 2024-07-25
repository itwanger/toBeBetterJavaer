---
title: Java枚举：小小enum，优雅而干净
shortTitle: Java枚举（enum）
category:
  - Java核心
tag:
  - Java重要知识点
description: 本文全面介绍了Java枚举的概念、基础语法、高级应用以及在实际项目中的应用。通过详细的示例和解释，帮助读者深入理解枚举类型的使用
head:
  - - meta
    - name: keywords
      content: Java,枚举,enum,java 枚举,java enum
---

# 5.21 Java枚举（enum）

“今天我们来学习枚举吧，三妹！”我说，“同学让你去她家玩了两天，感觉怎么样呀？”

“心情放松了不少。”三妹说，“可以开始学 Java 了，二哥。”

“OK。”

“枚举（enum），是 Java 1.5 时引入的关键字，它表示一种特殊类型的类，继承自 java.lang.Enum。”

“我们来新建一个枚举 PlayerType。”

```java
public enum PlayerType {
    TENNIS,
    FOOTBALL,
    BASKETBALL
}
```

“二哥，我没看到有继承关系呀！”

“别着急，看一下反编译后的字节码，你就明白了。”

```java
public final class PlayerType extends Enum
{

    public static PlayerType[] values()
    {
        return (PlayerType[])$VALUES.clone();
    }

    public static PlayerType valueOf(String name)
    {
        return (PlayerType)Enum.valueOf(com/cmower/baeldung/enum1/PlayerType, name);
    }

    private PlayerType(String s, int i)
    {
        super(s, i);
    }

    public static final PlayerType TENNIS;
    public static final PlayerType FOOTBALL;
    public static final PlayerType BASKETBALL;
    private static final PlayerType $VALUES[];

    static 
    {
        TENNIS = new PlayerType("TENNIS", 0);
        FOOTBALL = new PlayerType("FOOTBALL", 1);
        BASKETBALL = new PlayerType("BASKETBALL", 2);
        $VALUES = (new PlayerType[] {
            TENNIS, FOOTBALL, BASKETBALL
        });
    }
}
```

“看到没？Java 编译器帮我们做了很多隐式的工作，不然手写一个枚举就没那么省心省事了。”

- 要继承 Enum 类；
- 要写构造方法；
- 要声明静态变量和数组；
- 要用 static 块来初始化静态变量和数组；
- 要提供静态方法，比如说 `values()` 和  `valueOf(String name)`。

“确实，作为开发者，我们的代码量减少了，枚举看起来简洁明了。”三妹说。

“既然枚举是一种特殊的类，那它其实是可以定义在一个类的内部的，这样它的作用域就可以限定于这个外部类中使用。”我说。

```java
public class Player {
    private PlayerType type;
    public enum PlayerType {
        TENNIS,
        FOOTBALL,
        BASKETBALL
    }
    
    public boolean isBasketballPlayer() {
      return getType() == PlayerType.BASKETBALL;
    }

    public PlayerType getType() {
        return type;
    }

    public void setType(PlayerType type) {
        this.type = type;
    }
}
```

PlayerType 就相当于 Player 的内部类。

由于枚举是 final 的，所以可以确保在 Java 虚拟机中仅有一个常量对象，基于这个原因，我们可以使用“==”运算符来比较两个枚举是否相等，参照 `isBasketballPlayer()` 方法。

“那为什么不使用 `equals()` 方法判断呢？”三妹问。

```java
if(player.getType().equals(Player.PlayerType.BASKETBALL)){};
```

“我来给你解释下。”

“==”运算符比较的时候，如果两个对象都为 null，并不会发生 `NullPointerException`，而 `equals()` 方法则会。

另外， “==”运算符会在编译时进行检查，如果两侧的类型不匹配，会提示错误，而 `equals()` 方法则不会。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/enum/enum-01.png)

“枚举还可用于 switch 语句，和基本数据类型的用法一致。”我说。

```java
switch (playerType) {
    case TENNIS:
        return "网球运动员费德勒";
    case FOOTBALL:
        return "足球运动员C罗";
    case BASKETBALL:
        return "篮球运动员詹姆斯";
    case UNKNOWN:
        throw new IllegalArgumentException("未知");
    default:
        throw new IllegalArgumentException(
                "运动员类型: " + playerType);

}
```

“如果枚举中需要包含更多信息的话，可以为其添加一些字段，比如下面示例中的 name，此时需要为枚举添加一个带参的构造方法，这样就可以在定义枚举时添加对应的名称了。”我继续说。

```java
public enum PlayerType {
    TENNIS("网球"),
    FOOTBALL("足球"),
    BASKETBALL("篮球");

    private String name;

    PlayerType(String name) {
        this.name = name;
    }
}
```

“get 了吧，三妹？”

“嗯，比较好理解。”

“那接下来，我就来说点不一样的。”

“来吧，我准备好了。”

“EnumSet 是一个专门针对枚举类型的 [Set 接口](https://javabetter.cn/collection/gailan.html)（后面会讲）的实现类，它是处理枚举类型数据的一把利器，非常高效。”我说，“从名字上就可以看得出，EnumSet 不仅和 Set 有关系，和枚举也有关系。”

“因为 EnumSet 是一个抽象类，所以创建 EnumSet 时不能使用 new 关键字。不过，EnumSet 提供了很多有用的静态工厂方法。”

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/enum/enum-02.png)

“来看下面这个例子，我们使用 `noneOf()` 静态工厂方法创建了一个空的 PlayerType 类型的 EnumSet；使用 `allOf()` 静态工厂方法创建了一个包含所有 PlayerType 类型的 EnumSet。”

```java
public class EnumSetTest {
    public enum PlayerType {
        TENNIS,
        FOOTBALL,
        BASKETBALL
    }

    public static void main(String[] args) {
        EnumSet<PlayerType> enumSetNone = EnumSet.noneOf(PlayerType.class);
        System.out.println(enumSetNone);

        EnumSet<PlayerType> enumSetAll = EnumSet.allOf(PlayerType.class);
        System.out.println(enumSetAll);
    }
}
```

“来看一下输出结果。”

```java
[]
[TENNIS, FOOTBALL, BASKETBALL]
```

有了 EnumSet 后，就可以使用 Set 的一些方法了，见下图。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/enum/enum-03.png)

“除了 EnumSet，还有 EnumMap，是一个专门针对枚举类型的 Map 接口的实现类，它可以将枚举常量作为键来使用。EnumMap 的效率比 HashMap 还要高，可以直接通过数组下标（枚举的 ordinal 值）访问到元素。”

“和 EnumSet 不同，EnumMap 不是一个抽象类，所以创建 EnumMap 时可以使用 new 关键字。”

```java
EnumMap<PlayerType, String> enumMap = new EnumMap<>(PlayerType.class);
```

有了 EnumMap 对象后就可以使用 Map 的一些方法了，见下图。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/enum/enum-04.png)

和 [HashMap](https://javabetter.cn/collection/hashmap.html)（后面会讲）的使用方法大致相同，来看下面的例子。

```java
EnumMap<PlayerType, String> enumMap = new EnumMap<>(PlayerType.class);
enumMap.put(PlayerType.BASKETBALL,"篮球运动员");
enumMap.put(PlayerType.FOOTBALL,"足球运动员");
enumMap.put(PlayerType.TENNIS,"网球运动员");
System.out.println(enumMap);

System.out.println(enumMap.get(PlayerType.BASKETBALL));
System.out.println(enumMap.containsKey(PlayerType.BASKETBALL));
System.out.println(enumMap.remove(PlayerType.BASKETBALL));
```

“来看一下输出结果。”

```
{TENNIS=网球运动员, FOOTBALL=足球运动员, BASKETBALL=篮球运动员}
篮球运动员
true
篮球运动员
```

“除了以上这些，《Effective Java》这本书里还提到了一点，如果要实现单例的话，最好使用枚举的方式。”我说。

“等等二哥，单例是什么？”三妹没等我往下说，就连忙问道。

“单例（Singleton）用来保证一个类仅有一个对象，并提供一个访问它的全局访问点，在一个进程中。因为这个类只有一个对象，所以就不能再使用 `new` 关键字来创建新的对象了。”

“Java 标准库有一些类就是单例，比如说 Runtime 这个类。”

```java
Runtime runtime = Runtime.getRuntime();
```

“Runtime 类可以用来获取 Java 程序运行时的环境。”

“关于单例，懂了些吧？”我问三妹。

“噢噢噢噢。”三妹点了点头。

“通常情况下，实现单例并非易事，来看下面这种写法。”

```java
public class Singleton {  
    private volatile static Singleton singleton; 
    private Singleton (){}  
    public static Singleton getSingleton() {  
    if (singleton == null) {
        synchronized (Singleton.class) { 
        if (singleton == null) {  
            singleton = new Singleton(); 
        }  
        }  
    }  
    return singleton;  
    }  
}
```

“要用到 [volatile](https://javabetter.cn/thread/volatile.html)、[synchronized](https://javabetter.cn/thread/synchronized-1.html) 关键字等等，但枚举的出现，让代码量减少到极致。”

```java
public enum EasySingleton{
    INSTANCE;
}
```

“就这？”三妹睁大了眼睛。

“对啊，枚举默认实现了 [Serializable 接口](https://javabetter.cn/io/Serializbale.html)，因此 Java 虚拟机可以保证该类为单例，这与传统的实现方式不大相同。传统方式中，我们必须确保单例在反序列化期间不能创建任何新实例。”我说。

“好了，关于枚举就讲这么多吧，三妹，你把这些代码都手敲一遍吧！”

“好勒，这就安排。二哥，你去休息吧。”

“嗯嗯。”讲了这么多，必须跑去抽烟机那里安排一根华子了。

----

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
