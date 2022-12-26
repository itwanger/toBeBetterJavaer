---
title: Gson：Google开源的JSON解析库
category:
  - Java企业级开发
tag:
  - 辅助工具/轮子
---



### 01、前世今生

我叫 Gson，是一款开源的 Java 库，主要用途为序列化 Java 对象为 JSON 字符串，或反序列化 JSON 字符串成 Java 对象。从我的名字上，就可以看得出一些端倪，我并非籍籍无名，我出身贵族，我爸就是 Google，市值富可敌国。

当然了，作为一个聪明人，我是有自知之明的，我在我爸眼里，我并不是最闪耀的那颗星。

我来到这个世上，纯属一次意外，反正我爸是这样对我说的，他总说我是从河边捡回来的，虽然我一直不太相信。对于这件事，我向我妈确认过，她听完笑得合不拢嘴，说我太天真。

长大后，我喜欢四处闯荡，因此结识了不少同行，其中就有 [Jackson](https://mp.weixin.qq.com/s/e94E2FquEzjmXSlHRA8Qzw) 和 [Fastjson](https://mp.weixin.qq.com/s/TsIHRTOyF2_4oNb1APfZ6Q)。

说起 Jackson，我总能第一时间想到 MJ，那个被上帝带走的流行天王。Jackson 在 GitHub 上有 6.1k 的 star，虽然他的粉丝数没我多，但作为 Spring Boot 的默认 JSON 解析器，我非常地尊重他。

Fastjson 来自神秘的东方，虽然爆出过一些严重的漏洞，但这并不妨碍他成为最受欢迎的 JSON 解析器，他的粉丝数比我还要多，尽管我已经有超过 18K 的 star。

外人总说我们是竞争对手，但我必须得告诉他们，我们仨的关系，好到就差穿同一条内裤了。

我们各有优势，Jackson 在运行时占用的内存较少，Fastjson 的速度更快，而我，可以处理任意的 Java 对象，甚至在没有源代码的情况下。另外，我对泛型的支持也更加的友好。

### 02、添加依赖

在使用我的 API 之前，需要先把我添加到项目当中，推荐使用  Maven 和 Gradle 两种形式。

Maven：

```
<dependency>
    <groupId>com.google.code.gson</groupId>
    <artifactId>gson</artifactId>
    <version>2.8.6</version>
</dependency>
```

Gradle：

```
dependencies {
  implementation 'com.google.code.gson:gson:2.8.6'
}
```

PS：Gradle 是一个基于 Apache Ant 和 Apache Maven 概念的项目自动化建构工具。Gradle 构建脚本使用的是 Groovy 或 Kotlin 的特定领域语言来编写的，而不是传统的 XML。

### 03、性能表现

不是我觉得，是真的，通过大量的测试证明，我在处理 JSON 的时候性能还是很牛逼的。

测试环境：双核，8G 内存，64 位的 Ubuntu 操作系统（以桌面应用为主的 Linux 发行版）

测试结果：

1）在反序列化 25M 以上的字符串时没有出现过任何问题。

2）可以序列化 140 万个对象的集合。

3）可以反序列化包含 87000 个对象的集合。

 4）将字节数组和集合的反序列化限制从 80K 提高到 11M 以上。

测试用例我已经帮你写好了，放在 GitHub 上，如果你不相信的话，可以验证一下。

>[https://github.com/google/gson/blob/master/gson/src/test/java/com/google/gson/metrics/PerformanceTest.java](https://github.com/google/gson/blob/master/gson/src/test/java/com/google/gson/metrics/PerformanceTest.java)

### 04、使用指南

不是我自吹自擂，是真的，我还是挺好用的，上手难度几乎为零。如果你不相信话，可以来试试。

我有一个女朋友，她的名字和我一样，也叫 `Gson`，我的主要功能都由她来提供。你可以通过 `new Gson()` 的这种简单粗暴的方式创建她，也可以打电话给一个叫 GsonBuilder 的老板，让他邮寄一个复刻版过来，真的，我不骗你。

先来看一个序列化的例子。

```java
Gson gson = new Gson();
System.out.println(gson.toJson(18));
System.out.println(gson.toJson("沉默"));
System.out.println(gson.toJson(new Integer(18)));
int[] values = { 18,20 };
System.out.println(gson.toJson(values));
```

在我女朋友的帮助下，你可以将基本数据类型 int、字符串类型 String、包装器类型 Integer、int 数组等等作为参数，传递给 `toJson()` 方法，该方法将会返回一个 JSON 形式的字符串。

来看一下输出结果：

```
18
"沉默"
18
[18,20]
```

再来看一下反序列化的例子。

```java
Gson gson = new Gson();
int one = gson.fromJson("1", int.class);
Integer two = gson.fromJson("2", Integer.class);
Boolean false1 = gson.fromJson("false", Boolean.class);
String str = gson.fromJson("\"王二\"", String.class);
String[] anotherStr = gson.fromJson("[\"沉默\",\"王二\"]", String[].class);

System.out.println(one);
System.out.println(two);
System.out.println(false1);
System.out.println(str);
System.out.println(Arrays.toString(anotherStr));
```

`toJson()` 方法用于序列化，对应的，`fromJson()` 方法用于反序列化。不过，你需要在反序列化的时候，指定参数的类型，是 int 还是 Integer，是 Boolean 还是 String，或者 String 数组。

来看一下输出结果：

```
1
2
false
王二
[沉默, 王二]
```

上面的例子都比较简单，还体现不出来我的威力。

下面，我们来自定义一个类：

```java
public class Writer {
    private int age = 18;
    private String name = "王二";
    private transient int sex = 1;
}
```

然后，我们来将其序列化：

```java
Writer writer = new Writer();
Gson gson = new Gson();
String json = gson.toJson(writer);
System.out.println(json);
```

用法和之前一样简单，来看一下输出结果：

```
{"age":18,"name":"王二"}
```

同样，可以将结果反序列化：

```
Writer writer1 = gson.fromJson(json, Writer.class);
```

这里有一些注意事项，我需要提醒你。

1）推荐使用 `private` 修饰字段。

2）不需要使用任何的注解来表明哪些字段需要序列化，哪些字段不需要序列化。默认情况下，包括所有的字段，以及从父类继承过来的字段。

3）如果一个字段被 `transient` 关键字修饰的话，它将不参与序列化。

4）如果一个字段的值为 null，它不会在序列化后的结果中显示。

5）JSON 中缺少的字段将在反序列化后设置为默认值，引用数据类型的默认值为 null，数字类型的默认值为 0，布尔值默认为 false。

接下来，来看一个序列化集合的例子。

```java
List<String> list =new ArrayList<>();
list.add("好好学习");
list.add("天天向上");
String json = gson.toJson(list);
```

结果如下所示：

```
["好好学习","天天向上"]
```

反序列化的时候，也很简单。

```java
List<String> listResult = gson.fromJson(json,List.class);
```

结果如下所示：

```
[好好学习, 天天向上]
```

我女朋友是一个很细心也很贴心的人，在你调用 `toJson()` 方法进行序列化的时候，她会先判 null，防止抛出 NPE，再通过 `getClass()` 获取参数的类型，然后进行序列化。

```java
public String toJson(Object src) {
    if (src == null) {
        return toJson(JsonNull.INSTANCE);
    }
    return toJson(src, src.getClass());
}
```

但是呢？对于泛型来说，`getClass()` 的时候会丢掉参数化类型。来看下面这个例子。

```java
public class Foo<T> {
    T value;

    public void set(T value) {
        this.value = value;
    }

    public T get() {
        return value;
    }

    public static void main(String[] args) {
        Gson gson = new Gson();
        Foo<Bar> foo = new Foo<Bar>();
        Bar bar = new Bar();
        foo.set(bar);

        String json = gson.toJson(foo);
    }
}

class Bar{
    private int age = 10;
    private String name = "图灵";
}
```


假如你 debug 的时候，进入到 `toJson()` 方法的内部，就可以观察到。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/gson-402ff6b5-a460-45de-ab62-ede6fbf6b61e.png)

foo 的实际类型为 `Foo<Bar>`，但我女朋友在调用 `foo.getClass()` 的时候，只会得到 Foo，这就意味着她并不知道 foo 的实际类型。

序列化的时候还好，反序列化的时候就无能为力了。

```java
Foo<Bar> foo1 = gson.fromJson(json, foo.getClass());
Bar bar1 = foo1.get();
```

这段代码在运行的时候就报错了。

```
Exception in thread "main" java.lang.ClassCastException: class com.google.gson.internal.LinkedTreeMap cannot be cast to class com.itwanger.gson.Bar (com.google.gson.internal.LinkedTreeMap and com.itwanger.gson.Bar are in unnamed module of loader 'app')
	at com.itwanger.gson.Foo.main(Foo.java:36)
```

默认情况下，泛型的参数类型会被转成 LinkedTreeMap，这显然并不是我们预期的 Bar，女朋友对此表示很无奈。

作为 Google 的亲儿子，我的血液里流淌着“贵族”二字，我又怎能忍心女朋友无助时的落寞。

于是，我在女朋友的体内植入了另外两种方法，带 Type 类型参数的：

```java
toJson(Object src, Type typeOfSrc);
<T> T fromJson(String json, Type typeOfT);
```

这样的话，你在进行泛型的序列化和反序列化时，就可以指定泛型的参数化类型了。

```java
Type fooType = new TypeToken<Foo<Bar>>() {}.getType();
String json = gson.toJson(foo,fooType);
Foo<Bar> foo1 = gson.fromJson(json, fooType);
Bar bar1 = foo1.get();
```

debug 进入 `toJson()` 方法内部查看的话，就可以看到 foo 的真实类型了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/gson-1c6eac43-6f0b-4a00-ae6c-2db29f911719.png)

`fromJson()` 在反序列化的时候，和此类似。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/gson-5afe5cd1-4966-4b16-adcb-fc04edfff406.png)

这样的话，bar1 就可以通过 `foo1.get()` 到了。

瞧，我考虑得多周全，女朋友都忍不住夸我了！

### 05、处理混合类型

你知道的，Java 不建议使用混合类型，也就是下面这种情况。

```java
List list = new ArrayList();
list.add("沉默王二");
list.add(18);
list.add(new Event("gson", "google"));
```

Event 的定义如下所示：

```java
class Event {
    private String name;
    private String source;
    Event(String name, String source) {
        this.name = name;
        this.source = source;
    }
}
```

由于 list 没有指定具体的类型，因此它里面可以存放各种类型的数据。这样虽然省事，我女朋友在序列化的时候也没问题，但反序列化的时候就要麻烦多了。

```java
Gson gson = new Gson();
String json = gson.toJson(list);
System.out.println(json);
```

输出结果如下所示：

```
["沉默王二",18,{"name":"gson","source":"google"}]
```

反序列化的时候，就需要花点心思才能拿到 Event 对象。

```java
JsonParser parser = new JsonParser();
JsonArray array = parser.parse(json).getAsJsonArray();
String message = gson.fromJson(array.get(0), String.class);
int number = gson.fromJson(array.get(1), int.class);
Event event = gson.fromJson(array.get(2), Event.class);
```

承认了，JsonParser 是我的前任。希望你不要喷我渣男，真不是我花心，是因为我们性格上有些不太适合。但我们仍然保持着朋友的关系，因为我们谁都没有错，只是代码更加规范了，已经很少有开发者使用混合类型了。

### 06、个性化定制

考虑到你是一个追求时髦的人，我一直对自己要求很高，力争能够满足你的所有需求。这种高标准的要求，让我女朋友对我是又爱又恨。

爱的是，我这种追求完美的态度；恨的是，她有时候力不从心，帮不上忙。

使用 `toJson()` 序列化 Java 对象时，返回的 JSON 字符串中没有空格，很紧凑。如果你想要打印更漂亮的 JSON 格式，你需要打电话给一个叫 GsonBuilder 的老板，让他进行一些定制，然后再把复刻版邮寄给你，就像我在**使用指南**中提到的那样。

```java
public class Writer {
    private int age = 18;
    private String name = "沉默王二";

    public static void main(String[] args) {
        Writer writer = new Writer();
        Gson gson = new Gson();
        String json = gson.toJson(writer);
        System.out.println(json);

        Gson gson1 = new GsonBuilder().setPrettyPrinting().create();
        String jsonOutput = gson1.toJson(writer);
        System.out.println(jsonOutput);
    }
}
```

来对比一下输出结果：

```
{"age":18,"name":"沉默王二"}
{
  "age": 18,
  "name": "沉默王二"
}
```

通过 `setPrettyPrinting()` 定制后，输出的格式更加层次化、立体化，字段与值之间有空格，每个不同的字段之间也会有换行。

之前提到了，默认情况下，我女朋友在序列化的时候会忽略 null 值的字段，如果不想这样的话，同样可以打电话给 GsonBuilder。

```java
public class Writer {
    private int age = 18;
    private String name = null;

    public static void main(String[] args) {
        Writer writer = new Writer();
        Gson gson = new Gson();
        String json = gson.toJson(writer);
        System.out.println(json);

        Gson gson2 = new GsonBuilder().serializeNulls().create();
        String jsonOutput2 = gson2.toJson(writer);
        System.out.println(jsonOutput2);
    }
}
```

来对比一下输出结果：

```
{"age":18}
{"age":18,"name":null}
```

通过 `serializeNulls()` 定制后，序列化的时候就不会再忽略 null 值的字段。

也许，你在序列化和反序列化的时候想要筛选一些字段，我也考虑到这种需求了，特意为你准备了几种方案，你可以根据自己的口味挑选适合你的。

**第一种，通过 Java 修饰符**。

你之前也看到了，使用 `transient` 关键字修饰的字段将不会参与序列化和反序列化。同样的，`static` 关键字修饰的字段也不会。如果你想保留这些关键字修饰的字段，可以这样做。

保留单种。

```java
Gson gson = new GsonBuilder().excludeFieldsWithModifiers(Modifier.TRANSIENT).create();
```

保留多种。

```java
Gson gson = new GsonBuilder()
    .excludeFieldsWithModifiers(Modifier.STATIC, Modifier.TRANSIENT, Modifier.VOLATILE)
    .create();
```

**第二种，通过 `@Expose` 注解**。

 要使用 `@Expose` 注解，你需要先这样做：

```java
Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
```

再在需要序列化和反序列化的字段上加上 `@Expose` 注解，如果没加的话，该字段将会被忽略。

```java
@Expose
private int age = 18;
```

### 07、心声

如果你还想了解更多的话，请来参观我的 GitHub 主页：

>[https://github.com/google/gson](https://github.com/google/gson)

我会向你坦露我的一切，毫不保留的，除了我和女朋友之间的一些秘密，只为能够帮助到你。

如果你觉得我有点用的话，不妨点个赞，留个言，see you。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
