---
title: Apache StringUtils：专为Java字符串而生的工具类
shortTitle: StringUtils工具类
category:
  - Java核心
tag:
  - 常用工具类
description: 本文详细介绍了Apache StringUtils工具类，深入分析了它在Java字符串操作中的实际应用和优势。通过具体的代码示例，展示了如何使用StringUtils类处理字符串的常见问题，如判断空白、连接、替换等。掌握Apache StringUtils工具类，让您在Java编程中轻松应对各种字符串操作，提高开发效率。
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,二哥的Java进阶之路,Java进阶之路,Java入门,教程,java,Apache StringUtils,java StringUtils
---

# 9.3 StringUtils工具类

`字符串`（[String](https://javabetter.cn/string/immutable.html)）在我们的日常工作中，用得非常非常非常多。

在我们的代码中经常需要对字符串判空，截取字符串、转换大小写、[分隔字符串](https://javabetter.cn/string/split.html)、[比较字符串](https://javabetter.cn/string/equals.html)、去掉多余空格、[拼接字符串](https://javabetter.cn/string/join.html)、使用正则表达式等等。

如果只用 String 类提供的那些方法，我们需要手写大量的额外代码，不然容易出现各种异常。

现在有个好消息是：`org.apache.commons.lang3`包下的`StringUtils`工具类，给我们提供了非常丰富的选择。

Maven 坐标：

```
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-lang3</artifactId>
    <version>3.12.0</version>
</dependency>
```

StringUtils 提供了非常多实用的方法，大概有下图的四页到五页，我只截了两页，实在是太多了。

![](https://cdn.tobebetterjavaer.com/stutymore/StringUtils-20230330111122.png)

接下来，我们来拿一些常用的方法举例说明。

### 字符串判空

其实空字符串，不只是 null 一种，还有""，" "，"null"等等，多种情况。

StringUtils 给我们提供了多个判空的静态方法，例如：

```java
String str1 = null;
String str2 = "";
String str3 = " ";
String str4 = "abc";
System.out.println(StringUtils.isEmpty(str1));
System.out.println(StringUtils.isEmpty(str2));
System.out.println(StringUtils.isEmpty(str3));
System.out.println(StringUtils.isEmpty(str4));
System.out.println("=====");
System.out.println(StringUtils.isNotEmpty(str1));
System.out.println(StringUtils.isNotEmpty(str2));
System.out.println(StringUtils.isNotEmpty(str3));
System.out.println(StringUtils.isNotEmpty(str4));
System.out.println("=====");
System.out.println(StringUtils.isBlank(str1));
System.out.println(StringUtils.isBlank(str2));
System.out.println(StringUtils.isBlank(str3));
System.out.println(StringUtils.isBlank(str4));
System.out.println("=====");
System.out.println(StringUtils.isNotBlank(str1));
System.out.println(StringUtils.isNotBlank(str2));
System.out.println(StringUtils.isNotBlank(str3));
System.out.println(StringUtils.isNotBlank(str4));
```

执行结果：

```java
true
true
false
false
=====
false
false
true
true
=====
true
true
true
false
=====
false
false
false
true
```

示例中的：`isEmpty`、`isNotEmpty`、`isBlank`和`isNotBlank`，这 4 个判空方法你们可以根据实际情况使用。

优先推荐使用`isBlank`和`isNotBlank`方法，因为它会把`" "`也考虑进去。

### 分隔字符串

分隔字符串是常见需求，如果直接使用 String 类的 split 方法，就可能会出现空指针异常。

```java
String str1 = null;
System.out.println(StringUtils.split(str1,","));
System.out.println(str1.split(","));
```

执行结果：

```java
null
Exception in thread "main" java.lang.NullPointerException
\tat com.sue.jump.service.test1.UtilTest.main(UtilTest.java:21)
```

使用 StringUtils 的 split 方法会返回 null，而使用 String 的 split 方法会报指针异常。

### 判断是否纯数字

给定一个字符串，判断它是否为纯数字，可以使用`isNumeric`方法。例如：

```java
String str1 = "123";
String str2 = "123q";
String str3 = "0.33";
System.out.println(StringUtils.isNumeric(str1));
System.out.println(StringUtils.isNumeric(str2));
System.out.println(StringUtils.isNumeric(str3));
```

执行结果：

```java
true
false
false
```

### 将集合拼接成字符串

有时候，我们需要将某个集合的内容，拼接成一个字符串，然后输出，这时可以使用`join`方法。例如：

```java
List<String> list = Lists.newArrayList("a", "b", "c");
List<Integer> list2 = Lists.newArrayList(1, 2, 3);
System.out.println(StringUtils.join(list, ","));
System.out.println(StringUtils.join(list2, " "));
```

执行结果：

```java
a,b,c
1 2 3
```

### 其他方法

这里再列举一些，其他的方法可以自己去研究一下。

- `trim(String str)`：去除字符串首尾的空白字符。
- `trimToEmpty(String str)`：去除字符串首尾的空白字符，如果字符串为 null，则返回空字符串。
- `trimToNull(String str)`：去除字符串首尾的空白字符，如果结果为空字符串，则返回 null。
- `equals(String str1, String str2)`：比较两个字符串是否相等。
- `equalsIgnoreCase(String str1, String str2)`：比较两个字符串是否相等，忽略大小写。
- `startsWith(String str, String prefix)`：检查字符串是否以指定的前缀开头。
- `endsWith(String str, String suffix)`：检查字符串是否以指定的后缀结尾。
- `contains(String str, CharSequence seq)`：检查字符串是否包含指定的字符序列。
- `indexOf(String str, CharSequence seq)`：返回指定字符序列在字符串中首次出现的索引，如果没有找到，则返回 -1。
- `lastIndexOf(String str, CharSequence seq)`：返回指定字符序列在字符串中最后一次出现的索引，如果没有找到，则返回 -1。
- `substring(String str, int start, int end)`：截取字符串中指定范围的子串。
- `replace(String str, String searchString, String replacement)`：替换字符串中所有出现的搜索字符串为指定的替换字符串。
- `replaceAll(String str, String regex, String replacement)`：使用正则表达式替换字符串中所有匹配的部分。
- `join(Iterable<?> iterable, String separator)`：使用指定的分隔符将可迭代对象中的元素连接为一个字符串。
- `split(String str, String separator)`：使用指定的分隔符将字符串分割为一个字符串数组。
- `capitalize(String str)`：将字符串的第一个字符转换为大写。
- `uncapitalize(String str)`：将字符串的第一个字符转换为小写。

----

GitHub 上标星 9300+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 9300+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)