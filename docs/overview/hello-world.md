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

# 编写第一个Java程序：Hello World

第一个 Java 程序非常简单，代码如下：

```java
/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("三妹，少看手机少打游戏，好好学，美美哒。");
    }
}
```

IDEA 会自动保存，在代码编辑面板中右键，在弹出的菜单中选择「Run 'HelloWorld.main()'」，如下图所示：

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/four-01.png)

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

----

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

关注二哥的原创公众号 **沉默王二**，回复**111** 即可免费领取。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png)