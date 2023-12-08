---
title: 了解Java注释：单行、多行与文档注释的使用方法
shortTitle: Java注释
category:
  - Java核心
tag:
  - Java语法基础
description: 本文详细介绍了Java编程中使用的三种注释方式：单行、多行和文档注释。通过对这三种注释类型的讲解和示例，您将了解它们的应用场景和使用技巧，提高代码的可读性和维护性。
head:
  - - meta
    - name: keywords
      content: Java, 注释, 单行注释, 多行注释, 文档注释
---

# 3.2 Java注释

“二哥，Java 中的注释好像真没什么可讲的，我已经提前预习了，不过是单行注释，多行注释，还有文档注释。”三妹的脸上泛着甜甜的笑容，她竟然提前预习了接下来要学习的知识，有一种“士别三日，当刮目相看”的感觉。

“注释的种类确实不多，但还是挺有意思的，且听哥来给你说道说道。”

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/fourteen-01.png)

### 01、单行注释

单行注释通常用于解释方法内某单行代码的作用。

```java
public void method() {
    int age = 18; // age 用于表示年龄
}
```

**但如果写在行尾的话，其实是不符合阿里巴巴的开发规约的**。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/fourteen-02.png)

正确的单行注释如上图中所说，在被注释语句上方另起一行，使用 `//` 注释。

```java
public void method() {
    // age 用于表示年龄
    int age = 18;
}
```

### 02、多行注释

多行注释使用的频率其实并不高，通常用于解释一段代码的作用。

```java
/*
age 用于表示年纪
name 用于表示姓名
*/
int age = 18;
String name = "沉默王二";
```

以 `/*` 开始，以 `*/` 结束，但不如用多个 `//` 来得痛快，因为 `*` 和 `/` 不在一起，敲起来麻烦。

```java
// age 用于表示年纪
// name 用于表示姓名
int age = 18;
String name = "沉默王二";
```

### 03、文档注释

文档注释可用在三个地方，类、字段和方法，用来解释它们是干嘛的。

```java
/**
 * 微信搜索「沉默王二」，回复 Java
 */
public class Demo {
    /**
     * 姓名
     */
    private int age;

    /**
     * main 方法作为程序的入口
     *
     * @param args 参数
     */
    public static void main(String[] args) {

    }
}
```

PS：在 Intellij IDEA 中，按下 `/**` 后敲下回车键就可以自动添加文档注释的格式，`*/` 是自动补全的。

接下来，我们来看看如何通过 javadoc 命令生成代码文档。

**第一步**，在该类文件上右键，找到「Open in Terminal」 可以打开命令行窗口。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/fourteen-03.png)

**第二步**，执行 javadoc 命令 `javadoc Demo.java -encoding utf-8`。`-encoding utf-8` 可以保证中文不发生乱码。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/fourteen-04.png)

**第三步，**执行 `ls -l` 命令就可以看到生成代码文档时产生的文件，主要是一些可以组成网页的 html、js 和 css 文件。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/fourteen-05.png)

**第四步**，执行 `open index.html` 命令可以通过默认的浏览器打开文档注释。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/fourteen-06.png)

点击「Demo」，可以查看到该类更具体的注释文档。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/fourteen-07.png)

### 04、文档注释的注意事项

1）`javadoc` 命令只能为 public 和 protected 修饰的字段、方法和类生成文档。

default 和 private 修饰的字段和方法的注释将会被忽略掉。因为我们本来就不希望这些字段和方法暴露给调用者。

如果类不是 public 的话，javadoc 会执行失败。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/fourteen-08.png)

2）文档注释中可以嵌入一些 HTML 标记，比如说段落标记 `<p>`，超链接标记 `<a></a>` 等等，但不要使用标题标记，比如说 `<h1>`，因为 javadoc 会插入自己的标题，容易发生冲突。

3）文档注释中可以插入一些 `@` 注解，比如说 `@see` 引用其他类，`@version` 版本号，`@param` 参数标识符，`@author` 作者标识符，`@deprecated` 已废弃标识符，等等。

### 05、注释规约

1）类、字段、方法必须使用文档注释，不能使用单行注释和多行注释。因为注释文档在 IDE 编辑窗口中可以悬浮提示，提高编码效率。

比如说，在使用 [String 类](https://javabetter.cn/string/immutable.html)的时候，鼠标悬停在 String 上时可以得到以下提示。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/fourteen-09.png)

2）所有的[抽象方法](https://javabetter.cn/oo/abstract.html)(包括接口中的方法)必须要用 Javadoc 注释、除了返回值、参数、 异常说明外，还必须指出该方法做什么事情，实现什么功能。

3）所有的类都必须添加创建者和创建日期。

Intellij IDEA 中可以在「File and Code Templates」中设置。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/fourteen-10.png)

语法如下所示：

```
/**
* 微信搜索「沉默王二」，回复 Java
* @author 沉默王二
* @date ${DATE}
*/
```

设置好后，在新建一个类的时候就可以自动生成了。

```java
/**
 * 微信搜索「沉默王二」，回复 Java
 *
 * @author 沉默王二
 * @date 2020/11/16
 */
public class Test {
}
```

4）所有的[枚举](https://javabetter.cn/basic-extra-meal/enum.html)类型字段必须要有注释，说明每个数据项的用途。

5）代码修改的同时，注释也要进行相应的修改。

“好了，三妹，关于 Java 中的注释就先说这么多吧。”转动了一下僵硬的脖子后，我对三妹说。“记住一点，注释是程序固有的一部分。”

- 第一、注释要能够准确反映设计思想和代码逻辑;
- 第二、注释要能够描述业务含 义，使别的程序员能够迅速了解到代码背后的信息。

完全没有注释的大段代码对于阅读者形同 天书，注释是给自己看的，即使隔很长时间，也能清晰理解当时的思路;注释也是给继任者看 的，使其能够快速接替自己的工作。

----

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
