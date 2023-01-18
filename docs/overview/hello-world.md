---
title: 编写第一个Java程序：Hello World
shortTitle: 编写第一个Java程序
category:
  - Java核心
tag:
  - Java概述
description: Java程序员进阶之路，小白的零基础Java教程，编写第一个Java程序：Hello World
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,Hello World
---

## 2.6 编写第一个Java程序：Hello World

“三妹，今天，我们来编写第一个 Java 程序，Hello World 期待吗？”

三妹点了点头，表示认同（😂）。

“好的，那我们直接开始。”

打开 Intellij IDEA，新建一个学习 Java 的项目，点击 File → New → Project。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/hello-world-3810664d-49fb-4bed-ad32-3cb962ab5201.png)

选择 JDK 版本，比如之前我们[安装的 JDK 8](https://tobebetterjavaer.com/overview/jdk-install-config.html)。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/hello-world-3773144f-ba5a-4639-8747-70eb815f1ccd.png)

你也可以选择 JDK 11 或者最新的 JDK 17 或者添加新的 JDK 版本，但（不建议）。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/hello-world-85e3860b-3207-45c1-85d6-09c7cfd83c77.png)

然后点击「next」，直到填写项目名字，比如说 tobebetterjavaerdemo。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/hello-world-aad8ff0b-61e4-4dc1-9f5b-70f64f34a49b.png)

然后点击 finish，之后就可以看到我们新建的项目界面了。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/hello-world-5ef6024a-86e4-4fb7-860c-526ed867ab4a.png)

如果你的 Intellij IDEA 主题和二哥不一样，没关系，当然了，如果你也是个有颜值追求的家伙，可以安装 Vuesion Theme 插件，安装方法[戳这里](https://tobebetterjavaer.com/ide/shenji-chajian-10.html)。

“OK，到这里，我们已经把学习 Java 的环境准备好了，接下来就可以写第一个 Hello World 程序了。”我自信地对三妹说。

一般我们会把源代码放在 src 目录下（source 的前缀，所以学编程，英语中常用的单词必须得会，不会就去学）。

右键 src 目录，在菜单中依次选择 New → Java Class。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/hello-world-3dcc212c-bc06-49b0-989a-d3d129586064.png)

填写 Class 名，也就是类名（不知道类名是啥，后面会讲），注意大小写敏感，然后按下 enter 键。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/hello-world-c4e95c3f-1832-4fc5-bfe7-ce5def0129e2.png)

就会出现这样的代码。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/hello-world-380bd820-3b92-4195-86cc-1af30836ce38.png)

注释是二哥配置好的，你如果没配置可能没有，`public class HelloWorld {}` 是 Intellij IDEA 帮我们自动生成的。

之后在大括号里面键入 `main` 等 Intellij IDEA 给出提示后键入 enter 键。

Intellij IDEA 就会帮我们自动生成 main 方法，也就是这段代码。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/hello-world-e0acad2b-1735-42d9-b843-5d65d48c0946.png)

然后在 main 方法中键入 `so` 等出现提示后键入 enter 键。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/hello-world-9733e9ba-9e38-41d6-8a58-e73062ee9ed2.png)

Intellij IDEA 就会帮我们自动添加 `System.out.println()`，这是一个向控制台输出的方法（小白先不管它是什么意思，后面会讲）。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/hello-world-8eb1a438-88d8-4ea2-8861-af96862518fc.png)

接着在 `println()` 的小括号中键入 `"Hello World"`，注意是英文的双引号，中文的会报错哦，三妹。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/hello-world-f5aa5fd1-4498-4022-b6e6-cc50f23dacb7.png)

然后在 HelloWorld.java 的代码编辑器，也就是光标所在的位置右键，选择「Run 'HelloWorld.main()'」。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/hello-world-98e26e22-4811-4546-a88f-59a67d2d93ca.png)

等 Intellij IDEA 编译&运行后就可以在控制台看到这样的输出内容。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/hello-world-39d0d413-a2c6-4238-bead-f29183d271c7.png)

这就表明我们的第一个 Java 代码完成了，恭喜自己一下吧，三妹！

“二哥，你太棒了，好激动哦！！！！！！！”

下面，我们来简单解释一下这段代码。

第一个 Java 程序非常简单，我们来改一下输出内容，把 Hello World 替换掉：

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("三妹，少看手机少打游戏，好好学，美美哒。");
    }
}
```

IDEA 会自动保存，在代码编辑面板中右键，在弹出的菜单中选择「Run 'HelloWorld.main()'」，如下图所示：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/four-01.png)

等代码编译结束后，就可以在 Run 面板里看到下面的内容：

```
三妹，少看手机少打游戏，好好学，美美哒。
```

“二哥，上面这段代码的输出结果虽然令我非常开心，但是有好多生疏的关键字令我感到困惑，能给我解释一下吗？”

“当然没问题啊。”

- class 关键字：用于在 Java 中声明一个类。
- public 关键字：一个表示可见性的访问修饰符。
- static 关键字：我们可以用它来声明任何一个方法，被 static 修饰后的方法称之为静态方法。静态方法不需要为其创建对象就能调用。
- void 关键字：表示该方法不返回任何值。
- main 关键字：表示该方法为主方法，也就是程序运行的入口。`main()` 方法由 Java 虚拟机执行，配合上 static 关键字后，可以不用创建对象就可以调用，可以节省不少内存空间。
- `String [] args`：`main()` 方法的参数，类型为 String 数组，参数名为 args。
- `System.out.println()`：一个 Java 语句，一般情况下是将传递的参数打印到控制台。System 是 java.lang 包中的一个 final 类，该类提供的设施包括标准输入，标准输出和错误输出流等等。out 是 System 类的静态成员字段，类型为 PrintStream，它与主机的标准输出控制台进行映射。println 是 PrintStream 类的一个方法，通过调用 print 方法并添加一个换行符实现的。

“实在记不住也没关系，我们后面还会讲哦。”我的话令三妹感到非常开心。

----

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)