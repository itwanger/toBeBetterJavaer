---
title: 如何在Java中优雅地分割String字符串？
shortTitle: Java字符串分割
category:
  - Java核心
tag:
  - 数组&字符串
description: Java程序员进阶之路，小白的零基础Java教程，从入门到进阶，如何在Java中优雅地分割String字符串？
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,java字符串,String,拆分字符串
---

“哥，我感觉字符串拆分没什么可讲的呀，直接上 String 类的 `split()` 方法不就可以了！”三妹毫不客气地说。

“假如你真的这么觉得，那可要注意了，事情远没这么简单。”我微笑着说。

假如现在有这样一串字符序列“沉默王二，一枚有趣的程序员”，需要按照中文逗号“，”进行拆分，这意味着第一串字符序列为逗号前面的“沉默王二”，第二串字符序列为逗号后面的“一枚有趣的程序员”。

“这不等于没说吗？哥！”还没等我说，三妹就打断了我。

“别着急嘛，等哥说完。”我依然保持着微笑继续说，“在拆分之前，要先进行检查，判断一下这串字符是否包含逗号，否则应该抛出异常。”

```java
public class Test {
    public static void main(String[] args) {
        String cmower = "沉默王二，一枚有趣的程序员";
        if (cmower.contains("，")) {
            String [] parts = cmower.split("，");
            System.out.println("第一部分：" + parts[0] +" 第二部分：" + parts[1]);
        } else {
            throw new IllegalArgumentException("当前字符串没有包含逗号");
        }
    }
}
```

“三妹你看，这段代码挺严谨的吧？”我说，“来看一下程序的输出结果。”

```
第一部分：沉默王二 第二部分：一枚有趣的程序员
```

“的确和预期完全一致。”三妹说。

“这是建立在字符串是确定的情况下，最重要的是分隔符是确定的。否则，麻烦就来了。”我说，“大约有 12 种英文特殊符号，如果直接拿这些特殊符号替换上面代码中的分隔符（中文逗号），这段程序在运行的时候就会出现以下提到的错误。”


- 反斜杠 `\`（ArrayIndexOutOfBoundsException）
- 插入符号 `^`（同上）
- 美元符号 `$`（同上）
- 逗点 `.`（同上）
- 竖线 `|`（正常，没有出错）
- 问号 `?`（PatternSyntaxException）
- 星号 `*`（同上）
- 加号 `+`（同上）
- 左小括号或者右小括号 `()`（同上）
- 左方括号或者右方括号 `[]`（同上）
- 左大括号或者右大括号 `{}`（同上）

“那遇到这些特殊符号该怎么办呢？”三妹问。

“用正则表达式。”我说，“正则表达式是一组由字母和符号组成的特殊文本，它可以用来从文本中找出满足你想要的格式的句子。”

我在 GitHub 上找打了一个开源的正则表达式学习文档，非常详细。一开始写正则表达式的时候难免会感觉到非常生疏，你可以查看一下这份文档。记不住没关系，遇到就查。

>[https://github.com/cdoco/learn-regex-zh](https://github.com/cdoco/learn-regex-zh)

除了这份文档，还有一份：

>[https://github.com/cdoco/common-regex](https://github.com/cdoco/common-regex)

作者收集了一些在平时项目开发中经常用到的正则表达式，可以直接拿来用。

“哥，你真周到。”三妹笑着说。

“好了，来用英文逗点 `.` 替换一下分隔符。”我说。

```java
String cmower = "沉默王二.一枚有趣的程序员";
if (cmower.contains(".")) {
    String [] parts = cmower.split("\\.");
    System.out.println("第一部分：" + parts[0] +" 第二部分：" + parts[1]);
}
```

由于英文逗点属于特殊符号，所以在使用 `split()` 方法的时候，就需要使用正则表达式 `\\.` 而不能直接使用 `.`。

“为什么用两个反斜杠呢？”三妹问。

“因为反斜杠本身就是一个特殊字符，需要用反斜杠来转义。”我说。

当然了，你也可以使用 `[]` 来包裹住英文逗点“.”，`[]` 也是一个正则表达式，用来匹配方括号中包含的任意字符。

```java
cmower.split("[.]");
```

除此之外， 还可以使用 Pattern 类的 `quote()` 方法来包裹英文逗点“.”，该方法会返回一个使用 `\Q\E` 包裹的字符串。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/string/split-01.png)

来看示例：

```java
String [] parts = cmower.split(Pattern.quote("."));
```

当 `split()` 方法的参数是正则表达式的时候，方法最终会执行下面这行代码：

```java
return Pattern.compile(regex).split(this, limit);
```

也就意味着，拆分字符串有了新的选择，可以不使用 String 类的 `split()` 方法，直接用下面的方式。

```java
public class TestPatternSplit {
    private static Pattern twopart = Pattern.compile("\\.");

    public static void main(String[] args) {
        String [] parts = twopart.split("沉默王二.一枚有趣的程序员");
        System.out.println("第一部分：" + parts[0] +" 第二部分：" + parts[1]);
    }
}
```

“为什么要把 Pattern 表达式声明称 static 的呢？”三妹问。

“由于模式是确定的，通过 static 的预编译功能可以提高程序的效率。”我说，“除此之外，还可以使用 Pattern 配合 Matcher 类进行字符串拆分，这样做的好处是可以对要拆分的字符串进行一些严格的限制，来看这段示例代码。”

```java
public class TestPatternMatch {
    /**
     * 使用预编译功能，提高效率
     */
    private static Pattern twopart = Pattern.compile("(.+)\\.(.+)");

    public static void main(String[] args) {
        checkString("沉默王二.一枚有趣的程序员");
        checkString("沉默王二.");
        checkString(".一枚有趣的程序员");
    }

    private static void checkString(String str) {
        Matcher m = twopart.matcher(str);
        if (m.matches()) {
            System.out.println("第一部分：" + m.group(1) + " 第二部分：" + m.group(2));
        } else {
            System.out.println("不匹配");
        }
    }
}
```

正则表达式 `(.+)\\.(.+)` 的意思是，不仅要把字符串按照英文标点的方式拆成两部分，并且英文逗点的前后要有内容。

来看一下程序的输出结果：

```java
第一部分：沉默王二 第二部分：一枚有趣的程序员
不匹配
不匹配
```

不过，使用 Matcher 来匹配一些简单的字符串时相对比较沉重一些，使用 String 类的 `split()` 仍然是首选，因为该方法还有其他一些牛逼的功能。比如说，如果你想把分隔符包裹在拆分后的字符串的第一部分，可以这样做：

```java
String cmower = "沉默王二，一枚有趣的程序员";
if (cmower.contains("，")) {
    String [] parts = cmower.split("(?<=，)");
    System.out.println("第一部分：" + parts[0] +" 第二部分：" + parts[1]);
}
```

程序输出的结果如下所示：

```
第一部分：沉默王二， 第二部分：一枚有趣的程序员
```

可以看到分隔符“，”包裹在了第一部分，如果希望包裹在第二部分，可以这样做：

```java
String [] parts = cmower.split("(?=，)");
```

“`?<=` 和 `?=` 是什么东东啊？”三妹好奇地问。

“它其实是正则表达式中的断言模式。”我说，“你有时间的话，可以看看前面我推荐的两份开源文档。”

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/string/split-02.png)

“`split()` 方法可以传递 2 个参数，第一个为分隔符，第二个为拆分的字符串个数。”我说。

```java
String cmower = "沉默王二，一枚有趣的程序员，宠爱他";
if (cmower.contains("，")) {
    String [] parts = cmower.split("，", 2);
    System.out.println("第一部分：" + parts[0] +" 第二部分：" + parts[1]);
}
```

进入 debug 模式的话，可以看到以下内容：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/string/split-03.png)

也就是说，传递 2 个参数的时候，会直接调用 `substring()` 进行截取，第二个分隔符后的就不再拆分了。

来看一下程序输出的结果：

```
第一部分：沉默王二 第二部分：一枚有趣的程序员，宠爱他
```

“没想到啊，这个字符串拆分还挺讲究的呀！”三妹感慨地说。

“是的，其实字符串拆分在实际的工作当中还是挺经常用的。前端经常会按照规则传递一长串字符序列到后端，后端就需要按照规则把字符串拆分再做处理。”我说。

“嗯，我把今天的内容温习下，二哥，你休息会。”三妹说。


---

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
