---
title: Java简介，什么是 Java？
shortTitle: Java简介
category:
  - Java核心
tag:
  - Java概述
description: Java程序员进阶之路，小白的零基础Java教程，Java 简介，什么是Java？
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,Java简介
---

## 2.1 Java简介，什么是 Java？

“二哥，到底什么是 Java？给我说说呗。”

“三妹啊，这就直奔主题了啊，先去给哥买包烟吧，哥先考验考验你的诚心。”

（五分钟过后）

“三妹啊，你怎么还不去？”

“二哥，掏钱啊。”

>真是亲妹啊，买包烟还得我掏钱，关键是还得给跑腿费。十分钟后，三妹从楼下小卖部买了一包熊猫回来了，我用 Zippo 火机点了一支——这火机是 21 岁生日的时候初恋女友送我的，质量确实不错，现在还在用。

“三妹啊，听我慢慢来给你解释。”

### Java 的由来

Java 是一门计算机编程语言，高级、健壮、面向对象，并且非常安全。它由 Sun 公司在 1995 年开发，主力开发叫 James Gosling，被称为 Java 之父，就是下图这位，头秃的厉害。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/one-01.png)

“三妹啊，你要不要再考虑考虑？做程序员不容易啊，很容易头秃的！”

“二哥，你咋没有秃呢？是因为你不够厉害吗？”

>这孩子，嘴咋这么损呢？

Java 在叫“Java”之前，其实叫 Oak（橡树的意思，我感觉好像比 Java 好听一些）。怎么想到橡树的呢？James Gosling 坐在办公室，望向窗外，视野里出现了一颗橡树。不过，遗憾的是，Oak 已经被另外一家公司注册了，因此 1995 年 5 月 23 日，Oak 语言改名为 Java。

Java 这名字并不是 James Gosling 的首选，也不是命名团队的首选。团队其他人员更青睐 Silk（丝绸），但 Gosling 不喜欢，他本人喜欢的是 Lyric（抒情诗），但没通过律师这一关。最后，排在第四位的“Java”脱颖而出。是不是像极了婴儿没生下来之前，家人就着急着起名的那种感觉，这个你觉得不行，那个他觉得不行，最后叫了“狗蛋”（😆）。

James Gosling 回忆说，“Java”是一个叫 Mark Opperman 的人提议的，他是在一家咖啡店得到灵感的。奇妙的是，“Java”这个单词也是印度尼西亚爪哇岛的英文名，因生产咖啡而闻名，巧不巧？

使用十六进制编辑器（比如说 [wxMEdit](https://wxmedit.github.io/zh_CN/)）打开由 Java 源代码编译出的二进制文件（.class 文件，后面会详细介绍，先不着急），就可以看得到，最前面的 8 个字符是 CA FE BA BE（定义文件类型的魔数），即词组“CAFE BABE”（咖啡屋宝贝），是不是还挺有意思的？

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/one-02.png)

“二哥，能给我展示一段 Java 代码吗？我想近距离感受一下。”

“三妹啊，马上就来。”

>我噼里啪啦在键盘上一阵狂按，详细见[https://tobebetterjavaer.com/overview/hello-world.html](https://tobebetterjavaer.com/overview/hello-world.html)

“好，你看，就这样子。”

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}
```

“二哥，这都什么跟什么啊，看得一头雾水。”

“三妹啊，先不要着急，Hello World 这段代码以后再慢慢消化，现在就是让它来给你打个招呼。”

“好吧。”

### Java 是编译型语言还是解释型语言

“二哥，你之前给我看了 .class 文件和 .java 源代码，它们之间的关系是什么样的呢？”三妹还是挺喜欢学习的嘛，发现的问题都很关键。

“不错不错，都能挖掘到这个点了。”

.java 是源代码，也就是我们开发人员可以看懂的，可以编写的；.class 是字节码文件，是经过 javac 编译后的文件，是交给 [JVM](https://tobebetterjavaer.com/jvm/what-is-jvm.html) 执行的文件。

[JVM到底是如何运行Java代码的？](https://tobebetterjavaer.com/jvm/how-run-java-code.html)

上面👆🏻这篇文章会详细讲解运行的过程。

“三妹，这里再顺带给你讲一下，Java 是编译型语言还是解释型语言。”

“好啊，我正要问这个‘编译’到底是怎么回事呢？”

Java的第一道工序是通过javac命令把Java源码编译成字节码，之后，我们可以通过java命令运行字节码，此时就有2种处理方式了。

- 1、字节码由JVM逐条解释执行。
- 2、部分字节码可能由 [JIT，即时编译，戳链接了解](https://tobebetterjavaer.com/jvm/jit.html) 编译为机器指令直接执行。

也就是说，为了跨平台，Java源代码首先会编译成字节码，字节码不是机器语言，需要JVM来解释。有了JVM这个中间层，Java的运行效率就没有直接把源代码编译为机器码来得效率更高，这个应该能理解吗，多了中间商嘛。所以为了提高效率，JVM引入了 JIT 编译器，把一些经常执行的字节码直接搞成机器码。

所以，Java是解释和编译并存。但通常来说，我们会说“Java 是编译型语言”，尽管这样并不准确，主要是 JIT 是后面才出现的，“先入为主嘛”。

### 学 Java 有钱途吗？

“二哥，学 Java 到底有没有前途啊？我毕业以后能不能找到工作啊？”

“三妹啊，就目前来说，Java 不仅仅是一门编程语言，它还是一个由一系列计算机软件和规范组成的技术体系，这个技术体系提供了完整的用于软件开发和跨平台部署的支持环境，并广泛应用于以下这些场合。”

- 1）桌面应用程序；
- 2）Web 应用程序；
- 3）企业应用程序，体现出了 Java 的安全性、负载均衡和集群的优势；
- 4）移动端应用程序，主要是安卓；
- 5）嵌入式系统；
- 6）机器人技术；
- 7）游戏。

时至今日，Java 技术体系已经吸引了  1000 多万软件开发者（随着时间的推移，这数字会越来越大），是全球最大的软件开发团队。Java 能够获得如此广泛的认可，除了它是一门结构严谨、面向对象的编程语言之外，还有很多其他不可忽视的优点：

- 摆脱了硬件平台的束缚，实现了“一次编写，处处运行”的理念；
- 内存管理相对安全，避免了绝大部分内存泄露和指针越界的问题；
- 实现了热点代码检测和运行时编译，使得 Java 应用能随着运行时间的增长而获得更高的性能；
- 有一套完善的应用程序接口，还有无数来自商业机构和开源社区的第三方类库。

这一切的一切，都让软件开发的效率大大的提高。

下图是号称史上最惨的 23 届秋招 Java 岗的薪资状况，像 22 届的薪资待遇远比这个好得多。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/what-is-java-d5e8b87c-741b-49c8-a6d9-7b8bb9ba803b.png)

24 届及以后的起薪肯定会比这个好得多，这上面大专、普本的案例比较少，是因为网上爆的人比较少，但其实这部分群体也是非常大的，所以，学习 Java 还是很有“**钱秃**”的。

“噢噢噢噢，那好吧，我先跟着《[Java 程序员进阶之路](https://tobebetterjavaer.com/)》学起来！”

----

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

