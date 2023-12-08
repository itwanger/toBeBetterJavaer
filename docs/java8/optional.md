---
title: Java 8 Optional最佳指南：解决空指针问题的优雅之选
shortTitle: Optional最佳指南
category:
  - Java核心
tag:
  - Java新特性
description: 本文详细介绍了Java 8引入的Optional类，阐述了Optional的设计初衷和用法。通过实际的代码示例，展示了如何使用Optional来优雅地解决空指针问题，避免程序中的NullPointerException。掌握Optional的使用方法，让您的Java代码更加健壮和可靠。
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,二哥的Java进阶之路,Java进阶之路,Java入门,教程,java8,Optional,java Optional,空指针异常, NullPointerException
---

# 10.2 Optional最佳指南

想学习，永远都不晚，尤其是针对 Java 8 里面的好东西，Optional 就是其中之一，该类提供了一种用于表示可选值而非空引用的类级别解决方案。作为一名 Java 程序员，我真的是烦透了 [NullPointerException（NPE）](https://javabetter.cn/exception/npe.html)，尽管和它熟得就像一位老朋友，知道它也是迫不得已——程序正在使用一个对象却发现这个对象的值为 null，于是 Java 虚拟机就怒发冲冠地把它抛了出来当做替罪羊。

当然了，我们程序员是富有责任心的，不会坐视不管，于是就有了大量的 null 值检查。尽管有时候这种检查完全没有必要，但我们已经习惯了例行公事。终于，Java 8 看不下去了，就引入了 Optional，以便我们编写的代码不再那么刻薄呆板。

![](https://cdn.tobebetterjavaer.com/stutymore/guava-20230329172935.png)


### 01、没有 Optional 会有什么问题

我们来模拟一个实际的应用场景。小王第一天上班，领导老马就给他安排了一个任务，要他从数据库中根据会员 ID 拉取一个会员的姓名，然后将姓名打印到控制台。虽然是新来的，但这个任务难不倒小王，于是他花了 10 分钟写下了这段代码：

```java
public class WithoutOptionalDemo {
    class Member {
        private String name;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }

    public static void main(String[] args) {
        Member mem = getMemberByIdFromDB();
        if (mem != null) {
            System.out.println(mem.getName());
        }
    }

    public static Member getMemberByIdFromDB() {
        // 当前 ID 的会员不存在
        return null;
    }
}
```

由于当前 ID 的会员不存在，所以 `getMemberByIdFromDB()` 方法返回了 null 来作为没有获取到该会员的结果，那就意味着在打印会员姓名的时候要先对 mem 判空，否则就会抛出 NPE 异常，不信？让小王把 `if (mem != null)` 去掉试试，控制台立马打印错误堆栈给你颜色看看。

```
Exception in thread "main" java.lang.NullPointerException
	at com.cmower.dzone.optional.WithoutOptionalDemo.main(WithoutOptionalDemo.java:24)
```

### 02、Optional 是如何解决这个问题的

小王把代码提交后，就兴高采烈地去找老马要新的任务了。本着虚心学习的态度，小王请求老马看一下自己的代码，于是老王就告诉他应该尝试一下 Optional，可以避免没有必要的 null 值检查。现在，让我们来看看小王是如何通过 Optional 来解决上述问题的。

```java
public class OptionalDemo {
    public static void main(String[] args) {
        Optional<Member> optional = getMemberByIdFromDB();
        optional.ifPresent(mem -> {
            System.out.println("会员姓名是：" + mem.getName());
        });
    }

    public static Optional<Member> getMemberByIdFromDB() {
        boolean hasName = true;
        if (hasName) {
            return Optional.of(new Member("沉默王二"));
        }
        return Optional.empty();
    }
}
class Member {
    private String name;

    public String getName() {
        return name;
    }

    // getter / setter
}
```

`getMemberByIdFromDB()` 方法返回了 `Optional<Member>` 作为结果，这样就表明 Member 可能存在，也可能不存在，这时候就可以在 Optional 的 `ifPresent()` 方法中使用 Lambda 表达式来直接打印结果。

Optional 之所以可以解决 NPE 的问题，是因为它明确的告诉我们，不需要对它进行判空。它就好像十字路口的路标，明确地告诉你该往哪走。

### 03、创建 Optional 对象

1）可以使用静态方法 `empty()` 创建一个空的 Optional 对象

```java
Optional<String> empty = Optional.empty();
System.out.println(empty); // 输出：Optional.empty
```

2）可以使用静态方法 `of()` 创建一个非空的 Optional 对象

```java
Optional<String> opt = Optional.of("沉默王二");
System.out.println(opt); // 输出：Optional[沉默王二]
```

当然了，传递给 `of()` 方法的参数必须是非空的，也就是说不能为 null，否则仍然会抛出 NullPointerException。

```java
String name = null;
Optional<String> optnull = Optional.of(name);
```

3）可以使用静态方法 `ofNullable()` 创建一个即可空又可非空的 Optional 对象

```java
String name = null;
Optional<String> optOrNull = Optional.ofNullable(name);
System.out.println(optOrNull); // 输出：Optional.empty
```

`ofNullable()` 方法内部有一个三元表达式，如果为参数为 null，则返回私有常量 EMPTY；否则使用 new 关键字创建了一个新的 Optional 对象——不会再抛出 NPE 异常了。

### 04、判断值是否存在

可以通过方法 `isPresent()` 判断一个 Optional 对象是否存在，如果存在，该方法返回 true，否则返回 false——取代了 `obj != null` 的判断。

```java
Optional<String> opt = Optional.of("沉默王二");
System.out.println(opt.isPresent()); // 输出：true

Optional<String> optOrNull = Optional.ofNullable(null);
System.out.println(optOrNull.isPresent()); // 输出：false
```

Java 11 后还可以通过方法 `isEmpty()` 判断与 `isPresent()` 相反的结果。

```java
Optional<String> opt = Optional.of("沉默王二");
System.out.println(opt.isEmpty()); // 输出：false

Optional<String> optOrNull = Optional.ofNullable(null);
System.out.println(optOrNull.isEmpty()); // 输出：true
```

### 05、非空表达式

Optional 类有一个非常现代化的方法——`ifPresent()`，允许我们使用函数式编程的方式执行一些代码，因此，我把它称为非空表达式。如果没有该方法的话，我们通常需要先通过 `isPresent()` 方法对 Optional 对象进行判空后再执行相应的代码：

```java
Optional<String> optOrNull = Optional.ofNullable(null);
if (optOrNull.isPresent()) {
    System.out.println(optOrNull.get().length());
}
```

有了 `ifPresent()` 之后，情况就完全不同了，可以直接将 Lambda 表达式传递给该方法，代码更加简洁，更加直观。

```java
Optional<String> opt = Optional.of("沉默王二");
opt.ifPresent(str -> System.out.println(str.length()));
```

Java 9 后还可以通过方法 `ifPresentOrElse(action, emptyAction)` 执行两种结果，非空时执行 action，空时执行 emptyAction。

```java
Optional<String> opt = Optional.of("沉默王二");
opt.ifPresentOrElse(str -> System.out.println(str.length()), () -> System.out.println("为空"));
```

### 06、设置（获取）默认值

有时候，我们在创建（获取） Optional 对象的时候，需要一个默认值，`orElse()` 和 `orElseGet()` 方法就派上用场了。

`orElse()` 方法用于返回包裹在 Optional 对象中的值，如果该值不为 null，则返回；否则返回默认值。该方法的参数类型和值的类型一致。

```java
String nullName = null;
String name = Optional.ofNullable(nullName).orElse("沉默王二");
System.out.println(name); // 输出：沉默王二
```

`orElseGet()` 方法与 `orElse()` 方法类似，但参数类型不同。如果 Optional 对象中的值为 null，则执行参数中的函数。

```java
String nullName = null;
String name = Optional.ofNullable(nullName).orElseGet(()->"沉默王二");
System.out.println(name); // 输出：沉默王二
```

从输出结果以及代码的形式上来看，这两个方法极其相似，这不免引起我们的怀疑，Java 类库的设计者有必要这样做吗？

假设现在有这样一个获取默认值的方法，很传统的方式。

```java
public static String getDefaultValue() {
    System.out.println("getDefaultValue");
    return "沉默王二";
}
```

然后，通过 `orElse()` 方法和 `orElseGet()` 方法分别调用 `getDefaultValue()` 方法返回默认值。

```java
public static void main(String[] args) {
    String name = null;
    System.out.println("orElse");
    String name2 = Optional.ofNullable(name).orElse(getDefaultValue());

    System.out.println("orElseGet");
    String name3 = Optional.ofNullable(name).orElseGet(OrElseOptionalDemo::getDefaultValue);
}
```

注：`类名 :: 方法名`是 Java 8 引入的语法，方法名后面是没有 `()` 的，表明该方法并不一定会被调用。

输出结果如下所示：

```java
orElse
getDefaultValue

orElseGet
getDefaultValue
```

输出结果是相似的，没什么太大的不同，这是在 Optional 对象的值为 null 的情况下。假如 Optional 对象的值不为 null 呢？

```java
public static void main(String[] args) {
    String name = "沉默王三";
    System.out.println("orElse");
    String name2 = Optional.ofNullable(name).orElse(getDefaultValue());

    System.out.println("orElseGet");
    String name3 = Optional.ofNullable(name).orElseGet(OrElseOptionalDemo::getDefaultValue);
}
```

输出结果如下所示：

```java
orElse
getDefaultValue
orElseGet
```

咦，`orElseGet()` 没有去调用 `getDefaultValue()`。哪个方法的性能更佳，你明白了吧？

### 07、获取值

直观从语义上来看，`get()` 方法才是最正宗的获取 Optional 对象值的方法，但很遗憾，该方法是有缺陷的，因为假如 Optional 对象的值为 null，该方法会抛出 NoSuchElementException 异常。这完全与我们使用 Optional 类的初衷相悖。

```java
public class GetOptionalDemo {
    public static void main(String[] args) {
        String name = null;
        Optional<String> optOrNull = Optional.ofNullable(name);
        System.out.println(optOrNull.get());
    }
}
```

这段程序在运行时会抛出异常：

```
Exception in thread "main" java.util.NoSuchElementException: No value present
	at java.base/java.util.Optional.get(Optional.java:141)
	at com.cmower.dzone.optional.GetOptionalDemo.main(GetOptionalDemo.java:9)
```

尽管抛出的异常是 NoSuchElementException 而不是 NPE，但在我们看来，显然是在“五十步笑百步”。建议 `orElseGet()` 方法获取 Optional 对象的值。

### 08、过滤值

小王通过 Optional 类对之前的代码进行了升级，完成后又兴高采烈地跑去找老马要任务了。老马觉得这小伙子不错，头脑灵活，又干活积极，很值得培养，就又交给了小王一个新的任务：用户注册时对密码的长度进行检查。

小王拿到任务后，乐开了花，因为他刚要学习 Optional 类的 `filter()` 方法，这就派上了用场。

```java
public class FilterOptionalDemo {
    public static void main(String[] args) {
        String password = "12345";
        Optional<String> opt = Optional.ofNullable(password);
        System.out.println(opt.filter(pwd -> pwd.length() > 6).isPresent());
    }
}
```

`filter()` 方法的参数类型为 Predicate（Java 8 新增的一个函数式接口），也就是说可以将一个 Lambda 表达式传递给该方法作为条件，如果表达式的结果为 false，则返回一个 EMPTY 的 Optional 对象，否则返回过滤后的 Optional 对象。

在上例中，由于 password 的长度为 5 ，所以程序输出的结果为 false。假设密码的长度要求在 6 到 10 位之间，那么还可以再追加一个条件。来看小王增加难度后的代码。


```java
Predicate<String> len6 = pwd -> pwd.length() > 6;
Predicate<String> len10 = pwd -> pwd.length() < 10;

password = "1234567";
opt = Optional.ofNullable(password);
boolean result = opt.filter(len6.and(len10)).isPresent();
System.out.println(result);
```

这次程序输出的结果为 true，因为密码变成了 7 位，在 6 到 10 位之间。想象一下，假如小王使用 if-else 来完成这个任务，代码该有多冗长。

### 09、转换值

小王检查完了密码的长度，仍然觉得不够尽兴，觉得要对密码的强度也进行检查，比如说密码不能是“password”，这样的密码太弱了。于是他又开始研究起了 `map()` 方法，该方法可以按照一定的规则将原有 Optional 对象转换为一个新的 Optional 对象，原有的 Optional 对象不会更改。

先来看小王写的一个简单的例子：

```java
public class OptionalMapDemo {
    public static void main(String[] args) {
        String name = "沉默王二";
        Optional<String> nameOptional = Optional.of(name);
        Optional<Integer> intOpt = nameOptional
                .map(String::length);
        
        System.out.println( intOpt.orElse(0));
    }
}
```

在上面这个例子中，`map()` 方法的参数 `String::length`，意味着要 将原有的字符串类型的 Optional 按照字符串长度重新生成一个新的 Optional 对象，类型为 Integer。

搞清楚了 `map()` 方法的基本用法后，小王决定把 `map()` 方法与 `filter()` 方法结合起来用，前者用于将密码转化为小写，后者用于判断长度以及是否是“password”。

```java
public class OptionalMapFilterDemo {
    public static void main(String[] args) {
        String password = "password";
        Optional<String>  opt = Optional.ofNullable(password);

        Predicate<String> len6 = pwd -> pwd.length() > 6;
        Predicate<String> len10 = pwd -> pwd.length() < 10;
        Predicate<String> eq = pwd -> pwd.equals("password");

        boolean result = opt.map(String::toLowerCase).filter(len6.and(len10 ).and(eq)).isPresent();
        System.out.println(result);
    }
}
```

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/java8/optional-2.jpg)

好了，我亲爱的读者朋友，以上就是本文的全部内容了——可以说是史上最佳 Optional 指南了，能看到这里的都是最优秀的程序员，二哥必须要伸出大拇指为你点个赞。

----

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
