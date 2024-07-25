---
title: fastjson：阿里巴巴开源的JSON解析库
category:
  - Java企业级开发
tag:
  - 辅助工具/轮子
---



### 01、前世今生

我是 fastjson，是个地地道道的杭州土著，但我始终怀揣着一颗走向全世界的雄心。这不，我在 GitHub 上的简介都换成了英文，国际范十足吧？

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/fastjson-0576767f-c447-49f1-83a3-6971782c4d52.png)

如果你的英语功底没有我家老板 666 的话，我可以简单地翻译下（说人话，不装逼）。

我是阿里巴巴开源的一款 JSON 解析库，可以将 Java 对象序列化成 JSON 字符串，同时也可以将 JSON 字符串反序列化为 Java 对象。

- 我提供了服务器端和安卓客户端两种解析工具，性能表现还不错。

- 我提供了便捷的方式来进行 Java 对象和 JSON 之间的互转，`toJSONString()` 方法用来序列化，`parseObject()` 方法用来反序列化。

- 我允许转换预先存在的无法修改的对象（只有 class、没有源代码）。

- 对 Java 泛型有着广泛的支持。

- 我支持任意复杂的对象（深度的继承层次）。

2012 年的时候，我就被开源中国评选为最受欢迎的国产开源软件之一。时隔多年，我的流行趋势没有丝毫减退，在 JSON 领域，我敢说我是 NO 1，因为我在 GitHub 上的粉丝数已经超过了 22k，没有任何人敢忽视我这样的成就。

### 02、使用指南

在使用我的 API 之前，需要先在 pom.xml 文件中引入我的依赖。

```
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>1.2.58</version>
</dependency>
```

我来写一个简单的测试用例，你看一下。

```java
public class Test {
    public static void main(String[] args) {
        Writer writer = new Writer();
        writer.setAge(18);
        writer.setName("沉默王二");

        String json = JSON.toJSONString(writer);
        System.out.println(json);
    }
}
class Writer {
    private int age;
    private String name;

    // getter/setter
}
```

Writer 是一个普通的 Java 类，有两个字段，分别是 age 和 name，还有它们俩对应的 getter 和 setter 方法。

`main()` 方法中创建了一个 Writer 对象，然后调用我提供的一个静态方法 `JSON.toJSONString()` 来得到 JSON 字符串。

来看一下打印后的结果。

```
{"age":18,"name":"沉默王二"}
```

如果想反序列化的话，执行以下的代码即可。

```
Writer writer1 = JSON.parseObject(json, Writer.class);
```

调用静态方法 `JSON.parseObject()`，传递两个参数，一个是 JSON 字符串，一个是对象的类型。

如果想把 JSON 字符串转成集合的话，需要调用另外一个静态方法 `JSON.parseArray()`。

```java
List<Writer> list = JSON.parseArray("[{\"age\":18,\"name\":\"沉默王二\"},{\"age\":19,\"name\":\"沉默王一\"}]", Writer.class);
```

如果没有特殊要求的话，我敢这么说，以上 3 个方法就可以覆盖到你绝大多数的业务场景了。

### 03、使用注解

有时候，你的 JSON 字符串中的 key 可能与 Java 对象中的字段不匹配，比如大小写；有时候，你需要指定一些字段序列化但不反序列化；有时候，你需要日期字段显示成指定的格式。

这些特殊场景，我统统为你考虑到了，只需要在对应的字段上加上 `@JSONField` 注解就可以了。

先来看一下 `@JSONField` 注解的定义吧。

```java
public @interface JSONField {
    String name() default "";
    String format() default "";
    boolean serialize() default true;
    boolean deserialize() default true;
}
```

name 用来指定字段的名称，format 用来指定日期格式，serialize 和 deserialize 用来指定是否序列化和反序列化。

```java
class Writer {
    private int age;
    private String name;
    private Date birthday;

    @JSONField(format = "yyyy年MM月dd日")
    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    @JSONField(name = "Age")
    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @JSONField(serialize = false,deserialize = true)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

我建议在 getter 字段上使用 `@JSONField` 注解。来看一下测试代码。

```java
Writer writer = new Writer();
writer.setAge(18);
writer.setName("沉默王二");
writer.setBirthday(new Date());

String json = JSON.toJSONString(writer);
System.out.println(json);
```

此时的输出结果如下所示。

```
{"Age":18,"birthday":"2020年12月17日"}
```

JSON 字符串中的 Age 首字母为大写，birthday 的格式符合“年月日”的预期，name 字段没有出现在结果中，说明没有被序列化。

### 04、序列化特性

为了满足更多个性化的需求，我在 SerializerFeature 类中定义了很多特性，你可以在调用 `toJSONString()` 方法的时候进行指定。

- PrettyFormat，让 JSON 格式打印得更漂亮一些
- WriteClassName，输出类名
- UseSingleQuotes，key 使用单引号
- WriteNullListAsEmpty，List 为空则输出 []
- WriteNullStringAsEmpty，String 为空则输出“”

等等等等，更多新技能，等待你去开锁。我这里写个简单的 demo 供你参考。

```java
System.out.println(JSON.toJSONString(writer, 
SerializerFeature.PrettyFormat, 
SerializerFeature.UseSingleQuotes));
```

对比一下配置前和配置后的结果。

```
{"Age":18,"birthday":"2020年12月17日"}
{
	'Age':18,
	'birthday':'2020年12月17日'
}
```

### 05、我为什么快

众所周知，把 Java 对象序列化成 JSON 字符串，是不可能使用字符串直接拼接的，因为这样性能很差。比字符串拼接更好的办法就是使用 `StringBuilder`。

StringBuilder 尽管已经很好了，但在性能上还有上升的空间。“自己动手，丰衣足食”，于是我就创造了一个 SerializeWriter 类，专门用来序列化。

SerializeWriter 类中包含了一个 `char[] buf`，每序列化一次，都要做一次分配，但我使用了 ThreadLocal 来进行优化，这样就能够有效地减少对象的分配和垃圾回收，从而提升性能。

```java
private final static ThreadLocal<char[]> bufLocal         = new ThreadLocal<char[]>();

public SerializeWriter(java.io.Writer writer, int defaultFeatures, SerializerFeature... features){
    this.writer = writer;

    buf = bufLocal.get();

    if (buf != null) {
        bufLocal.set(null);
    } else {
        buf = new char[2048];
    }
}
```

除此之外，还有很多其他的细节，比如说使用 IdentityHashMap 而不是 HashMap，既可以避免多余的 `equals` 操作，又可以避免多线程并发情况下的死循环。

```java
/**
 * for concurrent IdentityHashMap
 * 
 * @author wenshao[szujobs@hotmail.com]
 */
@SuppressWarnings("unchecked")
public class IdentityHashMap<K, V> {
    private final Entry<K, V>[] buckets;
    private final int           indexMask;
    public final static int DEFAULT_SIZE = 8192;
}
```

再比如说，使用 asm 技术来避免反射导致的开销。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/fastjson-86a38cb0-3acc-4132-8e1f-48ebeaa52b47.png)

我承认，快的同时，也带来了一些安全性的问题。尤其是 AutoType 的引入，让黑客有了可乘之机。

> 1.2.59 发布，增强 AutoType 打开时的安全性
>
> 1.2.60 发布，增加了 AutoType 黑名单，修复拒绝服务安全问题
>
> 1.2.61 发布，增加 AutoType 安全黑名单
>
> 1.2.62 发布，增加 AutoType 黑名单、增强日期反序列化和 JSONPath
>
> 1.2.66 发布，Bug 修复安全加固，并且做安全加固，补充了 AutoType 黑名单
>
> 1.2.67 发布，Bug 修复安全加固，补充了 AutoType 黑名单
>
> 1.2.68 发布，支持 GEOJSON，补充了 AutoType 黑名单。（引入一个 safeMode 的配置，配置 safeMode 后，无论白名单和黑名单，都不支持 autoType。）
>
> 1.2.69 发布，修复新发现高危 AutoType 开关绕过安全漏洞，补充了 AutoType 黑名单
>
> 1.2.70 发布，提升兼容性，补充了 AutoType 黑名单

在于黑客的反复较量中，我虽然变得越来越稳重成熟了，但与此同时，让我的用户为此也付出了沉重的代价。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/fastjson-6868c673-8799-4326-baab-1050a5a4e9a3.png)


网络上也出现了很多不和谐的声音，他们声称我是最垃圾的国产开源软件之一，只不过凭借着一些投机取巧赢得了国内开发者的信赖。

但更多的是，对我的不离不弃。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/fastjson-85a44233-6eb2-4164-a091-6b65fc5f001a.png)

最令我感到为之动容的一句话是：

>温少几乎凭一己之力撑起了一个被广泛使用 JSON 库，而其他库几乎都是靠一整个团队，就凭这一点，温少作为“初心不改的阿里初代开源人”，当之无愧。

出现漏洞并不可怕，可怕的是发现不了漏洞，或者说无法解决掉漏洞。

为了彻底解决 AutoType 带来的问题，在 1.2.68 版本中，我引入了 safeMode 的安全模式，无论白名单和黑名单，都不支持 AutoType，这样就可以彻底地杜绝攻击。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/fastjson-57146979-cb99-4236-94f9-1cd5276e8269.png)

安全模式下，`checkAutoType()` 方法会直接抛出异常。

### 06、尾声

不管前面的路还有多少艰难困苦，也不管还要面对多少风言风语，我都会砥砺前行，为了国产开源软件的蓬勃发展，我愿意做一个先驱者，也愿意做一个持久战者。


2020 年的最后一篇文章！看到的就点个赞吧，2021 年顺顺利利。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
