---
title: Java 8 Stream流：掌握流式编程的精髓
shortTitle: 掌握Stream流
category:
  - Java核心
tag:
  - Java新特性
description: 本文详细介绍了Java 8引入的Stream流，阐述了Stream流的特点和用法。通过实际的代码示例，展示了如何使用Stream流对集合进行高效、简洁的操作。学习本文，让您快速掌握Java 8 Stream流的实践技巧，体验流式编程带来的编程乐趣。
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,二哥的Java进阶之路,Java进阶之路,Java入门,教程,java8,stream,java stream,Java 8, Stream流, 流式编程
---

# 10.1 掌握Stream流

两个星期以前，就有读者强烈要求我写一篇 Java Stream 流的文章，我说市面上不是已经有很多了吗，结果你猜他怎么说：“就想看你写的啊！”你看你看，多么苍白的喜欢啊。那就“勉为其难”写一篇吧，嘻嘻。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/java8/stream-1.jpg)

单从“Stream”这个单词上来看，它似乎和 java.io 包下的 InputStream 和 OutputStream 有些关系。实际上呢，没毛关系。Java 8 新增的 Stream 是为了解放程序员操作集合（Collection）时的生产力，之所以能解放，很大一部分原因可以归功于同时出现的 Lambda 表达式——极大的提高了编程效率和程序可读性。

Stream 究竟是什么呢？

>Stream 就好像一个高级的迭代器，但只能遍历一次，就好像一江春水向东流；在流的过程中，对流中的元素执行一些操作，比如“过滤掉长度大于 10 的字符串”、“获取每个字符串的首字母”等。

要想操作流，首先需要有一个数据源，可以是数组或者集合。每次操作都会返回一个新的流对象，方便进行链式操作，但原有的流对象会保持不变。

流的操作可以分为两种类型：

1）中间操作，可以有多个，每次返回一个新的流，可进行链式操作。

2）终端操作，只能有一个，每次执行完，这个流也就用光光了，无法执行下一个操作，因此只能放在最后。

来举个例子。

```java
List<String> list = new ArrayList<>();
list.add("武汉加油");
list.add("中国加油");
list.add("世界加油");
list.add("世界加油");

long count = list.stream().distinct().count();
System.out.println(count);
```

`distinct()` 方法是一个中间操作（去重），它会返回一个新的流（没有共同元素）。

```java
Stream<T> distinct();
```

`count()` 方法是一个终端操作，返回流中的元素个数。

```java
long count();
```

中间操作不会立即执行，只有等到终端操作的时候，流才开始真正地遍历，用于映射、过滤等。通俗点说，就是一次遍历执行多个操作，性能就大大提高了。

理论部分就扯这么多，下面直接进入实战部分。

### 01、创建流

如果是数组的话，可以使用 `Arrays.stream()` 或者 `Stream.of()` 创建流；如果是集合的话，可以直接使用 `stream()` 方法创建流，因为该方法已经添加到 Collection 接口中。

```java
public class CreateStreamDemo {
    public static void main(String[] args) {
        String[] arr = new String[]{"武汉加油", "中国加油", "世界加油"};
        Stream<String> stream = Arrays.stream(arr);

        stream = Stream.of("武汉加油", "中国加油", "世界加油");

        List<String> list = new ArrayList<>();
        list.add("武汉加油");
        list.add("中国加油");
        list.add("世界加油");
        stream = list.stream();
    }
}
```

查看 Stream 源码的话，你会发现 `of()` 方法内部其实调用了 `Arrays.stream()` 方法。

```java
public static<T> Stream<T> of(T... values) {
    return Arrays.stream(values);
}
```

另外，集合还可以调用 `parallelStream()` 方法创建并发流，默认使用的是 `ForkJoinPool.commonPool()`线程池。

```java
List<Long> aList = new ArrayList<>();
Stream<Long> parallelStream = aList.parallelStream();
```

### 02、操作流

Stream 类提供了很多有用的操作流的方法，我来挑一些常用的给你介绍一下。

#### 1）过滤

通过 `filter()` 方法可以从流中筛选出我们想要的元素。

```java
public class FilterStreamDemo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("周杰伦");
        list.add("王力宏");
        list.add("陶喆");
        list.add("林俊杰");
        Stream<String> stream = list.stream().filter(element -> element.contains("王"));
        stream.forEach(System.out::println);
    }
}
```

`filter()` 方法接收的是一个 Predicate（Java 8 新增的一个函数式接口，接受一个输入参数返回一个布尔值结果）类型的参数，因此，我们可以直接将一个 Lambda 表达式传递给该方法，比如说 `element -> element.contains("王")` 就是筛选出带有“王”的字符串。

`forEach()` 方法接收的是一个 Consumer（Java 8 新增的一个函数式接口，接受一个输入参数并且无返回的操作）类型的参数，`类名 :: 方法名`是 Java 8 引入的新语法，`System.out` 返回 PrintStream 类，println 方法你应该知道是打印的。

`stream.forEach(System.out::println);` 相当于在 for 循环中打印，类似于下面的代码：

```java
for (String s : strs) {
    System.out.println(s);
}
```

很明显，一行代码看起来更简洁一些。来看一下程序的输出结果：

```
王力宏
```

#### 2）映射 

如果想通过某种操作把一个流中的元素转化成新的流中的元素，可以使用 `map()` 方法。

```java
public class MapStreamDemo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("周杰伦");
        list.add("王力宏");
        list.add("陶喆");
        list.add("林俊杰");
        Stream<Integer> stream = list.stream().map(String::length);
        stream.forEach(System.out::println);
    }
}
```

`map()` 方法接收的是一个 Function（Java 8 新增的一个函数式接口，接受一个输入参数 T，返回一个结果 R）类型的参数，此时参数 为 String 类的 length 方法，也就是把 `Stream<String>` 的流转成一个 `Stream<Integer>` 的流。

程序输出的结果如下所示：

```
3
3
2
3
```

#### 3）匹配

Stream 类提供了三个方法可供进行元素匹配，它们分别是：

- `anyMatch()`，只要有一个元素匹配传入的条件，就返回 true。

- `allMatch()`，只有有一个元素不匹配传入的条件，就返回 false；如果全部匹配，则返回 true。

- `noneMatch()`，只要有一个元素匹配传入的条件，就返回 false；如果全部不匹配，则返回 true。

```java
public class MatchStreamDemo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("周杰伦");
        list.add("王力宏");
        list.add("陶喆");
        list.add("林俊杰");

        boolean  anyMatchFlag = list.stream().anyMatch(element -> element.contains("王"));
        boolean  allMatchFlag = list.stream().allMatch(element -> element.length() > 1);
        boolean  noneMatchFlag = list.stream().noneMatch(element -> element.endsWith("沉"));
        System.out.println(anyMatchFlag);
        System.out.println(allMatchFlag);
        System.out.println(noneMatchFlag);
    }
}
```

因为“王力宏”以“王”字开头，所以 anyMatchFlag 应该为 true；因为“周杰伦”、“王力宏”、“陶喆”、“林俊杰”的字符串长度都大于 1，所以 allMatchFlag 为 true；因为 4 个字符串结尾都不是“沉”，所以 noneMatchFlag  为 true。

程序输出的结果如下所示：

```
true
true
true
```

#### 4）组合

`reduce()` 方法的主要作用是把 Stream 中的元素组合起来，它有两种用法：

- `Optional<T> reduce(BinaryOperator<T> accumulator)`

没有起始值，只有一个参数，就是运算规则，此时返回 [Optional](https://mp.weixin.qq.com/s/PqK0KNVHyoEtZDtp5odocA)。

- `T reduce(T identity, BinaryOperator<T> accumulator)`

有起始值，有运算规则，两个参数，此时返回的类型和起始值类型一致。

来看下面这个例子。

```java
public class ReduceStreamDemo {
    public static void main(String[] args) {
        Integer[] ints = {0, 1, 2, 3};
        List<Integer> list = Arrays.asList(ints);

        Optional<Integer> optional = list.stream().reduce((a, b) -> a + b);
        Optional<Integer> optional1 = list.stream().reduce(Integer::sum);
        System.out.println(optional.orElse(0));
        System.out.println(optional1.orElse(0));

        int reduce = list.stream().reduce(6, (a, b) -> a + b);
        System.out.println(reduce);
        int reduce1 = list.stream().reduce(6, Integer::sum);
        System.out.println(reduce1);
    }
}
```

运算规则可以是 [Lambda 表达式](https://mp.weixin.qq.com/s/ozr0jYHIc12WSTmmd_vEjw)（比如 `(a, b) -> a + b`），也可以是类名::方法名（比如 `Integer::sum`）。

程序运行的结果如下所示：

```java
6
6
12
12
```

0、1、2、3 在没有起始值相加的时候结果为 6；有起始值 6 的时候结果为 12。

### 03、转换流

既然可以把集合或者数组转成流，那么也应该有对应的方法，将流转换回去——`collect()` 方法就满足了这种需求。

```java
public class CollectStreamDemo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("周杰伦");
        list.add("王力宏");
        list.add("陶喆");
        list.add("林俊杰");

        String[] strArray = list.stream().toArray(String[]::new);
        System.out.println(Arrays.toString(strArray));

        List<Integer> list1 = list.stream().map(String::length).collect(Collectors.toList());
        List<String> list2 = list.stream().collect(Collectors.toCollection(ArrayList::new));
        System.out.println(list1);
        System.out.println(list2);

        String str = list.stream().collect(Collectors.joining(", ")).toString();
        System.out.println(str);
    }
}
```

`toArray()` 方法可以将流转换成数组，你可能比较好奇的是 `String[]::new`，它是什么东东呢？来看一下 `toArray()` 方法的源码。

```java
<A> A[] toArray(IntFunction<A[]> generator);
```

也就是说 `String[]::new` 是一个 IntFunction，一个可以产生所需的新数组的函数，可以通过反编译字节码看看它到底是什么：

```java
String[] strArray = (String[])list.stream().toArray((x$0) -> {
    return new String[x$0];
});
System.out.println(Arrays.toString(strArray));
```

也就是相当于返回了一个指定长度的字符串数组。

当我们需要把一个集合按照某种规则转成另外一个集合的时候，就可以配套使用 `map()` 方法和 `collect()` 方法。

```java
List<Integer> list1 = list.stream().map(String::length).collect(Collectors.toList());
```

通过 `stream()` 方法创建集合的流后，再通过 `map(String:length)` 将其映射为字符串长度的一个新流，最后通过 `collect()` 方法将其转换成新的集合。

Collectors 是一个收集器的工具类，内置了一系列收集器实现，比如说 `toList()` 方法将元素收集到一个新的 `java.util.List` 中；比如说 `toCollection()` 方法将元素收集到一个新的 ` java.util.ArrayList` 中；比如说 `joining()` 方法将元素收集到一个可以用分隔符指定的字符串中。

来看一下程序的输出结果：

```java
[周杰伦, 王力宏, 陶喆, 林俊杰]
[3, 3, 2, 3]
[周杰伦, 王力宏, 陶喆, 林俊杰]
周杰伦, 王力宏, 陶喆, 林俊杰
```

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/java8/stream-2.jpg)

----

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
