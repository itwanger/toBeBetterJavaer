---
title: 深入理解Java中的注解：从原理到实践掌握注解技巧
shortTitle: Java注解
category:
  - Java核心
tag:
  - Java重要知识点
description: 本文深入探讨了Java注解的概念、分类及其在实际项目中的应用。通过详细的示例和解释，帮助读者更好地理解和掌握Java注解技术，学会如何自定义注解以及在实际开发中灵活运用，提升代码的可读性和可维护性。
head:
  - - meta
    - name: keywords
      content: Java,注解,annotation,java 注解,java annotation
---

# 5.20 Java注解

“二哥，这节讲注解吗？”三妹问。

“是的。”我说，“注解是 Java 中非常重要的一部分，但经常被忽视也是真的。之所以这么说是因为我们更倾向成为一名注解的使用者而不是创建者。`@Override` 注解用过吧？[方法重写](https://javabetter.cn/basic-extra-meal/override-overload.html)的时候用到过。但你知道怎么自定义一个注解吗？”

三妹毫不犹豫地摇摇头，摆摆手，不好意思地承认自己的确没有自定义过。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/annotation/annotation-01.png)

“好吧，哥来告诉你吧。”

注解（Annotation）是在 Java 1.5 时引入的概念，同 class 和 interface 一样，也属于一种类型。注解提供了一系列数据用来装饰程序代码（类、方法、字段等），但是注解并不是所装饰代码的一部分，它对代码的运行效果没有直接影响，由编译器决定该执行哪些操作。

来看一段代码。

```java
public class AutowiredTest {
    @Autowired
    private String name;

    public static void main(String[] args) {
        System.out.println("沉默王二，一枚有趣的程序员");
    }
}
```

注意到 `@Autowired` 这个注解了吧？它本来是为 Spring（后面会讲）容器注入 Bean 的，现在被我无情地扔在了字段 name 的身上，但这段代码所在的项目中并没有启用 Spring，意味着 `@Autowired` 注解此时只是一个摆设。

“既然只是个摆设，那你这个地方为什么还要用 `@Autowired` 呢？”三妹好奇地问。

“傻呀你，就是给你举个例子，证明：注解对代码的运行效果没有直接影响，明白我的用意了吧？”我毫不客气地说。

“哦。”三妹若有所思地说。

“认真听哈，接下来给你讲讲注解的生命周期。”我瞅了瞅三妹，看她是否在专注的听，然后继续说，“注解的生命周期有 3 种策略，定义在 RetentionPolicy 枚举中。”

1）SOURCE：在源文件中有效，被编译器丢弃。

2）CLASS：在编译器生成的字节码文件中有效，但在运行时会被处理类文件的 JVM 丢弃。

3）RUNTIME：在运行时有效。这也是注解生命周期中最常用的一种策略，它允许程序通过反射的方式访问注解，并根据注解的定义执行相应的代码。

“然后我们来讲注解装饰的目标。”我看三妹还在线，就继续说。

注解的目标定义了注解将适用于哪一种级别的 Java 代码上，有些注解只适用于方法，有些只适用于成员变量，有些只适用于类，有些则都适用。截止到 Java 9，注解的类型一共有 11 种，定义在 ElementType 枚举中。

1）TYPE：用于类、接口、注解、枚举

2）FIELD：用于字段（类的成员变量），或者枚举常量

3）METHOD：用于方法

4）PARAMETER：用于普通方法或者构造方法的参数

5）CONSTRUCTOR：用于构造方法

6）LOCAL_VARIABLE：用于变量

7）ANNOTATION_TYPE：用于注解

8）PACKAGE：用于包

9）TYPE_PARAMETER：用于泛型参数

10）TYPE_USE：用于声明语句、泛型或者强制转换语句中的类型

11）MODULE：用于模块

“哥，你将这些我都记不住，能不能直接开撸注解呀！！！！！”三妹不耐烦了。

“确实哈，说再多，都不如撸个注解来得让人心动。撸个什么样的注解呢？一个字段注解吧，它用来标记对象在序列化成 JSON 的时候要不要包含这个字段。”我笑着对三妹说，“怎么样？”

“好呀！”

“来看下面这段代码。”

```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface JsonField {
    public String value() default "";
}
```

1）JsonField 注解的生命周期是 RUNTIME，也就是运行时有效。

2）JsonField 注解装饰的目标是 FIELD，也就是针对字段的。

3）创建注解需要用到 `@interface` 关键字。

4）JsonField 注解有一个参数，名字为 value，类型为 String，默认值为一个空字符串。

“为什么参数名要为 value 呢？有什么特殊的含义吗？”三妹问。

“当然是有的，value 允许注解的使用者提供一个无需指定名字的参数。举个例子，我们可以在一个字段上使用 `@JsonField(value = "沉默王二")`，也可以把 `value =` 省略，变成 `@JsonField("沉默王二")`。”我说。





“那 `default ""` 有什么特殊含义吗？”三妹继续问。

“当然也是有的，它允许我们在一个字段上直接使用 `@JsonField`，而无需指定参数的名和值。”我回答说。


“明白了，那 `@JsonField` 注解已经撸好了，是不是可以使用它了呀？”三妹激动地说。

“嗯，假设有一个 Writer 类，他有 3 个字段，分别是 age、name 和 bookName，后 2 个是必须序列化的字段。就可以这样来用 `@JsonField` 注解。”我说。

```java
public class Writer {
    private int age;

    @JsonField("writerName")
    private String name;

    @JsonField
    private String bookName;

    public Writer(int age, String name, String bookName) {
        this.age = age;
        this.name = name;
        this.bookName = bookName;
    }

    // getter / setter

    @Override
    public String toString() {
        return "Writer{" +
                "age=" + age +
                ", name='" + name + '\'' +
                ", bookName='" + bookName + '\'' +
                '}';
    }
}
```

1）name 上的 `@JsonField` 注解提供了显式的字符串值。

2）bookName 上的 `@JsonField` 注解使用了缺省项。

接下来，我们来编写序列化类 JsonSerializer，内容如下：

```java
public class JsonSerializer {
    public static String serialize(Object object) throws IllegalAccessException {
        Class<?> objectClass = object.getClass();
        Map<String, String> jsonElements = new HashMap<>();
        for (Field field : objectClass.getDeclaredFields()) {
            field.setAccessible(true);
            if (field.isAnnotationPresent(JsonField.class)) {
                jsonElements.put(getSerializedKey(field), (String) field.get(object));
            }
        }
        return toJsonString(jsonElements);
    }

    private static String getSerializedKey(Field field) {
        String annotationValue = field.getAnnotation(JsonField.class).value();
        if (annotationValue.isEmpty()) {
            return field.getName();
        } else {
            return annotationValue;
        }
    }

    private static String toJsonString(Map<String, String> jsonMap) {
        String elementsString = jsonMap.entrySet()
                .stream()
                .map(entry -> "\"" + entry.getKey() + "\":\"" + entry.getValue() + "\"")
                .collect(Collectors.joining(","));
        return "{" + elementsString + "}";
    }
}
```

“JsonSerializer 类的内容看起来似乎有点多啊，二哥，我有点看不懂。”三妹说。

“不要怕，我一点点来解释，直到你搞明白为止。”

1）`serialize()` 方法是用来序列化对象的，它接收一个 Object 类型的参数。`objectClass.getDeclaredFields()` 通过反射的方式获取对象声明的所有字段，然后进行 for 循环遍历。在 for 循环中，先通过 `field.setAccessible(true)` 将反射对象的可访问性设置为 true，供序列化使用（如果没有这个步骤的话，private 字段是无法获取的，会抛出 IllegalAccessException 异常）；再通过 `isAnnotationPresent()` 判断字段是否装饰了 `JsonField` 注解，如果是的话，调用 `getSerializedKey()` 方法，以及获取该对象上由此字段表示的值，并放入 jsonElements 中。

2）`getSerializedKey()` 方法用来获取字段上注解的值，如果注解的值是空的，则返回字段名。

3）`toJsonString()` 方法借助 Stream 流的方式返回格式化后的 JSON 字符串。Stream 流你还没有接触过，不过没关系，后面我再给你讲。

“现在是不是豁然开朗了？”我问三妹，看到三妹点了点头，我继续说，“接下来，我们来写一个测试类 JsonFieldTest。”

```java
public class JsonFieldTest {
    public static void main(String[] args) throws IllegalAccessException {
        Writer cmower = new Writer(18,"沉默王二","Web全栈开发进阶之路");
        System.out.println(JsonSerializer.serialize(cmower));
    }
}
```

程序输出结果如下：

```
{"bookName":"Web全栈开发进阶之路","writerName":"沉默王二"}
```

从结果上来看：

1）Writer 类的 age 字段没有装饰 `@JsonField` 注解，所以没有序列化。

2）Writer 类的 name 字段装饰了 `@JsonField` 注解，并且显示指定了字符串“writerName”，所以序列化后变成了 writerName。

3）Writer 类的 bookName 字段装饰了 `@JsonField` 注解，但没有显式指定值，所以序列化后仍然是 bookName。

“怎么样，三妹，是不是也不是特别难？”我对三妹说。

“撸个注解好像真没什么难度，但你接下来的那个 JsonSerializer 我还需要再消化一下。”三妹很认真地说。

“嗯，你好好复习下，我看会《编译原理》。”说完我拿起桌子边上的一本书就走了。


----

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
