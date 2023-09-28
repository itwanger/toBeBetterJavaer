---
title: Guava：Google开源的Java工具库，太强大了
shortTitle: Guava工具库
category:
  - Java核心
tag:
  - 常用工具类
description: 描述：本文详细介绍了Google开源的Java工具库Guava，阐述了它在简化Java编程中的实际应用和优势。通过具体的代码示例，展示了如何使用Guava解决字符串处理、集合操作、缓存等常见问题。学习Guava的技巧，让您在Java编程中更加轻松、高效，享受编程的乐趣。
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,二哥的Java进阶之路,Java进阶之路,Java入门,教程,java,Guava,java guava,google guava
---

# 9.7 Guava工具库

### 01、前世今生

你好呀，我是 Guava。

我由 Google 公司开源，目前在 GitHub 上已经有 39.9k 的铁粉了，由此可以证明我的受欢迎程度。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/common-tool/guava-01.png)

我的身体里主要包含有这些常用的模块：集合 [collections] 、缓存 [caching] 、原生类型支持 [primitives support] 、并发库 [concurrency libraries] 、通用注解 [common annotations] 、字符串处理 [string processing] 、I/O 等。新版的 JDK 中已经直接把我引入了，可想而知我有多优秀，忍不住骄傲了。

这么说吧，学好如何使用我，能让你在编程中变得更快乐，写出更优雅的代码！

### 02、引入 Guava

如果你要在 Maven 项目使用我的话，需要先在 pom.xml 文件中引入我的依赖。

```
<dependency>
    <groupId>com.google.guava</groupId>
    <artifactId>guava</artifactId>
    <version>30.1-jre</version>
</dependency>
```

一点要求，JDK 版本需要在 8 以上。

### 03、基本工具

Doug Lea，java.util.concurrent 包的作者，曾说过一句话：“[null 真糟糕](https://javabetter.cn/exception/npe.html)”。Tony Hoare，图灵奖得主、快速排序算法的作者，当然也是 null 的创建者，也曾说过类似的话：“null 的使用，让我损失了十亿美元。”鉴于此，我用 Optional 来表示可能为 null 的对象。

![](https://cdn.tobebetterjavaer.com/stutymore/guava-20230329172935.png)


代码示例如下所示。

```java
Optional<Integer> possible = Optional.of(5);
possible.isPresent(); // returns true
possible.get(); // returns 5
```

我大哥 Java 在 JDK 8 中新增了 [Optional 类](https://javabetter.cn/java8/optional.html)，显然是从我这借鉴过去的，不过他的和我的有些不同。

- 我的 Optional 是 abstract 的，意味着我可以有子类对象；我大哥的是 final 的，意味着没有子类对象。
- 我的 Optional 实现了 Serializable 接口，可以序列化；我大哥的没有。
- 我的一些方法和我大哥的也不尽相同。

使用 Optional 除了赋予 null 语义，增加了可读性，最大的优点在于它是一种傻瓜式的防护。Optional 迫使你积极思考引用缺失的情况，因为你必须显式地从 Optional 获取引用。

除了 Optional 之外，我还提供了：

- 参数校验
- 常见的 Object 方法，比如说 Objects.equals、Objects.hashCode，JDK 7 引入的 Objects 类提供同样的方法，当然也是从我这借鉴的灵感。
- 更强大的比较器

### 04、集合

首先我来说一下，为什么需要不可变集合。

- 保证线程安全。在并发程序中，使用不可变集合既保证线程的安全性，也大大地增强了并发时的效率（跟并发锁方式相比）。
- 如果一个对象不需要支持修改操作，不可变的集合将会节省空间和时间的开销。
- 可以当作一个常量来对待，并且集合中的对象在以后也不会被改变。

与 JDK 中提供的不可变集合相比，我提供的 Immutable 才是真正的不可变，我为什么这么说呢？来看下面这个示例。

下面的代码利用 JDK 的 [`Collections.unmodifiableList(list)`](https://javabetter.cn/common-tool/collections.html) 得到一个不可修改的集合 unmodifiableList。

```java
List list = new ArrayList();
list.add("雷军");
list.add("乔布斯");

List unmodifiableList = Collections.unmodifiableList(list);
unmodifiableList.add("马云");
```

运行代码将会出现以下异常：

```
Exception in thread "main" java.lang.UnsupportedOperationException
	at java.base/java.util.Collections$UnmodifiableCollection.add(Collections.java:1060)
	at com.itwanger.guava.NullTest.main(NullTest.java:29)
```

很好，执行 `unmodifiableList.add()` 的时候抛出了 UnsupportedOperationException 异常，说明 `Collections.unmodifiableList()` 返回了一个不可变集合。但真的是这样吗？

你可以把 `unmodifiableList.add()` 换成 `list.add()`。

```java
List list = new ArrayList();
list.add("雷军");
list.add("乔布斯");

List unmodifiableList = Collections.unmodifiableList(list);
list.add("马云");
```

再次执行的话，程序并没有报错，并且你会发现 unmodifiableList 中真的多了一个元素。说明什么呢？

`Collections.unmodifiableList(…)` 实现的不是真正的不可变集合，当原始集合被修改后，不可变集合里面的元素也是跟着发生变化。

我就不会犯这种错，来看下面的代码。

```java
List<String> stringArrayList = Lists.newArrayList("雷军","乔布斯");
ImmutableList<String> immutableList = ImmutableList.copyOf(stringArrayList);
immutableList.add("马云");
```

尝试 `immutableList.add()` 的时候会抛出 `UnsupportedOperationException`。我在源码中已经把 `add()` 方法废弃了。

```java
/**
  * Guaranteed to throw an exception and leave the collection unmodified.
  *
  * @throws UnsupportedOperationException always
  * @deprecated Unsupported operation.
  */
@CanIgnoreReturnValue
@Deprecated
@Override
public final boolean add(E e) {
  throw new UnsupportedOperationException();
}
```

尝试 `stringArrayList.add()` 修改原集合的时候 immutableList 并不会因此而发生改变。

除了不可变集合以外，我还提供了新的集合类型，比如说：

- Multiset，可以多次添加相等的元素。当把 Multiset 看成普通的 Collection 时，它表现得就像无序的 ArrayList；当把 Multiset 看作 `Map<E, Integer>` 时，它也提供了符合性能期望的查询操作。
- Multimap，可以很容易地把一个键映射到多个值。
- BiMap，一种特殊的 Map，可以用 `inverse()` 反转 
 `BiMap<K, V>` 的键值映射；保证值是唯一的，因此 `values()` 返回 Set 而不是普通的 Collection。

### 05、字符串处理

字符串表示字符的不可变序列，创建后就不能更改。在我们日常的工作中，字符串的使用非常频繁，熟练的对其操作可以极大的提升我们的工作效率。

我提供了连接器——Joiner，可以用分隔符把字符串序列连接起来。下面的代码将会返回“雷军; 乔布斯”，你可以使用 `useForNull(String)` 方法用某个字符串来替换 null，而不像 `skipNulls()` 方法那样直接忽略 null。

```java
Joiner joiner = Joiner.on("; ").skipNulls();
return joiner.join("雷军", null, "乔布斯");
```

我还提供了拆分器—— Splitter，可以按照指定的分隔符把字符串序列进行拆分。

```java
Splitter.on(',')
        .trimResults()
        .omitEmptyStrings()
        .split("雷军,乔布斯,,   沉默王二");
```

### 06、缓存

缓存在很多场景下都是相当有用的。你应该知道，检索一个值的代价很高，尤其是需要不止一次获取值的时候，就应当考虑使用缓存。

我提供的 Cache 和 ConcurrentMap 很相似，但也不完全一样。最基本的区别是 ConcurrentMap 会一直保存所有添加的元素，直到显式地移除。相对地，我提供的 Cache 为了限制内存占用，通常都设定为自动回收元素。

如果你愿意消耗一些内存空间来提升速度，你能预料到某些键会被查询一次以上，缓存中存放的数据总量不会超出内存容量，就可以使用 Cache。

来个示例你感受下吧。

```java
@Test
public void testCache() throws ExecutionException, InterruptedException {

    CacheLoader cacheLoader = new CacheLoader<String, Animal>() {
        // 如果找不到元素，会调用这里
        @Override
        public Animal load(String s) {
            return null;
        }
    };
    LoadingCache<String, Animal> loadingCache = CacheBuilder.newBuilder()
        .maximumSize(1000) // 容量
        .expireAfterWrite(3, TimeUnit.SECONDS) // 过期时间
        .removalListener(new MyRemovalListener()) // 失效监听器
        .build(cacheLoader); //
    loadingCache.put("狗", new Animal("旺财", 1));
    loadingCache.put("猫", new Animal("汤姆", 3));
    loadingCache.put("狼", new Animal("灰太狼", 4));

    loadingCache.invalidate("猫"); // 手动失效

    Animal animal = loadingCache.get("狼");
    System.out.println(animal);
    Thread.sleep(4 * 1000);
    // 狼已经自动过去，获取为 null 值报错
    System.out.println(loadingCache.get("狼"));
}

/**
 * 缓存移除监听器
 */
class MyRemovalListener implements RemovalListener<String, Animal> {

    @Override
    public void onRemoval(RemovalNotification<String, Animal> notification) {
        String reason = String.format("key=%s,value=%s,reason=%s", notification.getKey(), notification.getValue(), notification.getCause());
        System.out.println(reason);
    }
}

class Animal {
    private String name;
    private Integer age;

    public Animal(String name, Integer age) {
        this.name = name;
        this.age = age;
    }
}
```

CacheLoader 中重写了 load 方法，这个方法会在查询缓存没有命中时被调用，我这里直接返回了 null，其实这样会在没有命中时抛出 CacheLoader returned null for key 异常信息。

MyRemovalListener 作为缓存元素失效时的监听类，在有元素缓存失效时会自动调用 onRemoval 方法，这里需要注意的是这个方法是同步方法，如果这里耗时较长，会阻塞直到处理完成。

LoadingCache 就是缓存的主要操作对象了，常用的就是其中的 put 和 get 方法了。

### 07、集合工具

`com.google.common.collect`包下的集合工具：`Lists`也非常强大。

#### 创建空集合

有时候，我们想创建一个空集合。这时可以用Lists的`newArrayList`方法，例如：
```java
List<Integer> list = Lists.newArrayList();
```

#### 快速初始化集合

有时候，我们想给一个集合中初始化一些元素。这时可以用Lists的newArrayList方法，例如：
```java
List<Integer> list = Lists.newArrayList(1, 2, 3);
```
执行结果：
```java
[1, 2, 3]
```

#### 笛卡尔积

如果你想将两个集合做`笛卡尔积`，Lists的`cartesianProduct`方法可以帮你实现：
```java
List<Integer> list1 = Lists.newArrayList(1, 2, 3);
List<Integer> list2 = Lists.newArrayList(4,5);
List<List<Integer>> productList = Lists.cartesianProduct(list1,list2);
System.out.println(productList);
```
执行结果：
```java
[[1, 4], [1, 5], [2, 4], [2, 5], [3, 4], [3, 5]]
```

#### 分页

如果你想将一个`大集合`分成若干个`小集合`，可以使用Lists的`partition`方法：

```java
List<Integer> list = Lists.newArrayList(1, 2, 3, 4, 5);
List<List<Integer>> partitionList = Lists.partition(list, 2);
System.out.println(partitionList);
```

执行结果：

```java
[[1, 2], [3, 4], [5]]
```

这个例子中，list有5条数据，我将list集合按大小为2，分成了3页，即变成3个小集合。

这个是我最喜欢的方法之一，经常在项目中使用。

比如有个需求：现在有5000个id，需要调用批量用户查询接口，查出用户数据。但如果你直接查5000个用户，单次接口响应时间可能会非常慢。如果改成分页处理，每次只查500个用户，异步调用10次接口，就不会有单次接口响应慢的问题。

#### 流处理

如果我们想把某个集合转换成另外一个接口，可以使用Lists的 `transform`方法。例如：

```java
List<String> list = Lists.newArrayList("a","b","c");
List<String> transformList = Lists.transform(list, x -> x.toUpperCase());
System.out.println(transformList);
```

将小写字母转换成了大写字母。

#### 颠倒顺序

Lists的有颠倒顺序的方法`reverse`。例如：

```java
List<Integer> list = Lists.newArrayList(3, 1, 2);
List<Integer> reverseList = Lists.reverse(list);
System.out.println(reverseList);
```

执行结果：

```java
[2, 1, 3]
```

list的原始顺序是312，使用`reverse`方法颠倒顺序之后，变成了213。

Lists还有其他的好用的工具，我在这里只是抛砖引玉，有兴趣的小伙伴，可以仔细研究一下。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/common-tool/guava-4b962b06-a626-4707-9fe9-f5729536d9c5.jpg)

### 08、尾声

上面介绍了我认为最常用的功能，作为 Google 公司开源的 Java 开发核心库，个人觉得实用性还是很高的（不然呢？嘿嘿嘿）。引入到你的项目后不仅能快速的实现一些开发中常用的功能，而且还可以让代码更加的优雅简洁。

我觉得适用于每一个 Java 项目，至于其他的一些功能，比如说散列、事件总线、数学运算、反射，就等待你去发掘了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/common-tool/guava-03.png)

----

GitHub 上标星 9300+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 9300+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
