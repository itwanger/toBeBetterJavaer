# 第一章：小册简介

> PS：为了增加这份小册的趣味性，我特意为此追加了两个虚拟角色，一个二哥，一个三妹，二哥负责教，三妹负责学。这样大家在学习 Java 的时候代入感会更强烈一些，希望这样的设定能博得大家的欢心。

三妹：“二哥，帮读者朋友们问一下哈，为什么会有《二哥的 Java 进阶之路》这份小册呢？”

*二哥巴拉巴拉 ing...*

小册的内容主要来源于我的开源知识库《[Java程序员进阶之路](https://github.com/itwanger/toBeBetterJavaer)》，已托管在 GitHub 上，目前已经收获 6000 star，评价极高。小册之所以叫《二哥的Java进阶之路》，是因为这样更方便小册的读者知道这份小册的作者是谁，IP 感更强烈一些。

如果你是第一次阅读这份小册，肯定又会问，“二哥是哪个鸟人？”

噢噢噢噢，正是鄙人了，一个英俊潇洒的男人（见下图），你可以通过我的微信公众号“**沉默王二**”了解更多关于我的信息，总之，就是一个非常喜欢王小波的程序员，写得一手风趣幽默的技术文章，被读者“尊称”为二哥就对了。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/readme-ece0be3e-d176-447c-bff9-59d9f02c7a65.jpg)

现实中，三妹也是真实存在的哦。

《二哥的 Java 进阶之路》是我自学 Java 以来所有原创文章和学习资料的大聚合。内容包括 Java 基础、Java 并发编程、Java 虚拟机、Java 企业级开发（包括开发/构建/测试、JavaWeb、SSM、Spring Boot、Linux、Nginx、Docker、k8s、微服务&分布式、消息队列等）、Java 面试等核心内容。据说每一个优秀的 Java 程序员都喜欢这份小册，风趣幽默、通俗易懂。总之一句话：学 Java，就认准《二哥的 Java 进阶之路》😄。

小册旨在为学习 Java 的小伙伴提供一系列：

 - **优质的原创 Java 教程**
 - **全面清晰的 Java 学习路线**
 - **免费但靠谱的 Java 学习资料**
 - **精选的 Java 岗求职面试指南**
 - **Java 企业级开发所需的必备技术**

小册会持续保持**更新**，如果想获得最新版，请在我的微信公众号 **沉默王二** 后台回复 **222** 获取（你懂我的意思吧，我肯定是足够二才有这样的勇气定义这样一个关键字）！

如果你更喜欢在线阅读，请戳下面这个网址：

> [https://tobebetterjavaer.com](https://tobebetterjavaer.com)

如果你在阅读过程中感觉这份小册写的还不错，甚至有亿点点收获，请肆无忌惮地把这份小册分享给你的同事、同学、舍友、朋友，让他们也进步亿点点，赠人玫瑰手有余香嘛。

如果这份小册有幸被更多人看得到，我的虚荣心也会得到恰当的满足，嘿嘿😜

对了，如果你在阅读的过程中遇到一些错误，欢迎到我的开源仓库提交 issue，我会第一时间修正，感谢你的批评和指正。

>- GitHub：[https://github.com/itwanger/toBeBetterJavaer](https://github.com/itwanger/toBeBetterJavaer)
>- 码云：[https://gitee.com/itwanger/toBeBetterJavaer](https://gitee.com/itwanger/toBeBetterJavaer)

在正式开始之前，请允许我叮嘱三点：

- 如果你是零基础的小白，可以按照小册的顺序一路读下去，小册的内容安排都是经过我精心安排的；
- 否则，请按照目录按需阅读，该跳过的跳过，该放慢节奏的放慢节奏。
- 小册中会有一个虚拟人物，三妹，当然她的原型也是真实存在的，目的就是通过我们之间的对话，来增强文章的趣味性，以便你能更轻松地获取知识。
- 最重要的一点，“光看不练假把戏”，请在阅读的过程中把该敲的代码敲了，把该记的笔记记了。

好了，让我们开始愉快的 Java 进阶之旅吧。

# 第二章：Java概述及环境配置

## 2.1 Java简介，什么是 Java？

“二哥，到底什么是 Java？给我说说呗。”

“三妹啊，这就直奔主题了啊，先去给哥买包烟吧，哥先考验考验你的诚心。”

（五分钟过后）

“三妹啊，你怎么还不去？”

“二哥，掏钱啊。”

>真是亲妹啊，买包烟还得我掏钱，关键是还得给跑腿费。十分钟后，三妹从楼下小卖部买了一包熊猫回来了，我用 Zippo 火机点了一支——这火机是 21 岁生日的时候初恋女友送我的，质量确实不错，现在还在用。

“三妹啊，听我慢慢来给你解释。”

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

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/what-is-java-d5e8b87c-741b-49c8-a6d9-7b8bb9ba803b.png)

24 届及以后的起薪肯定会比这个好得多，这上面大专、普本的案例比较少，是因为网上爆的人比较少，但其实这部分群体也是非常大的，所以，学习 Java 还是很有“**钱秃**”的。

“噢噢噢噢，那好吧，我先跟着《[Java 程序员进阶之路](https://tobebetterjavaer.com/)》学起来！”

----

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

## 2.2 Java发展简史

20 世纪 90 年代，单片式计算机系统诞生。单片式计算机系统不仅廉价（之前的计算机非常庞大，并且昂贵），而且功能强大，可以大幅度提升消费性电子产品的智能化程度。

Sun 公司为了抢占市场先机，在 1991 年成立了一个由詹姆斯·高斯林（James Gosling）领导的，名为“Green”的项目组，目的是开发一种能够在各种消费性电子产品上运行的程序架构。

项目组首先考虑的是采用 C++ 来编写程序，但 C++ 过于复杂和庞大，再加上消费电子产品所采用的嵌入式处理器芯片的种类繁杂，需要让编写的程序能够跨平台运行并不容易——C++ 在跨平台方面做得并不好。

思前想后，项目组最后决定：在 C++ 的基础上创建一种新的编程语言，既能够剔除 C++ 复杂的指针和内存管理，还能够兼容各种设备。这语言最初的名字叫做 **Greentalk**，文件扩展名为 `.gt`。这个名字叫的比较随意，就因为项目组叫 Green，没什么特殊的寓意。

**Oak** 是“Java”的第二个名字，这次就有点意义了。Oak（橡树）是力量的象征，被美国、法国、德国等许多欧美国家选为国树。橡树长下面这样。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/two-01.png)

1992 年，Oak 的雏形有了，但项目组在向硬件生产商进行商演的时候，并没有获得认可，于是 Oak 就被搁置一旁了。

1994 年，项目组发现 Java 更适合进行 Internet 编程。随后，项目组用 Oak 语言研发了一种能将小程序嵌入到网页中执行的技术——Applet。Applet 不仅能嵌入网页，还能够随同网页在网络上进行传输。

不得不感慨一下，技术的更新迭代是真的快，Applet 拯救了 Oak，并使其蜕变成顶天立地的 Java，但 Applet 很早之前就被无情地拍死在了沙滩上。是不是很残酷？

1995 年，Oak 被重新命名为“Java”，因为 Oak 被别的公司注册过了。新的名字最好能够表达出技术的本质：dynamic（动态的）、revolutionary（革命性的）、Silk（像丝绸一样柔软的）、Cool（炫酷的）等等。另外，名字一定要容易拼写，念起来也比较有趣。

选来选去，项目组最后选择了“Java”，中文叫“爪哇”。细心的小伙伴可能会发现，Java 这个单词里有一个敏感词，所以有段时间微信（文章专辑名这块）为了禁敏感词，竟然把 Java 都禁了，我当时就只能用爪哇来代替 Java，手动狗头。

“Java”是印度尼西亚爪哇岛的英文名，因生产咖啡而闻名，所以，小伙伴也看到了，Java 这个单词经常和一杯冒着热气的咖啡一起出现。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/two-02.png)

同年，Sun 公司在 SunWorld 大会上正式发布了 Java 1.0 版本，第一次提出了“Write Once, Run anywhere”的口号。《时代》杂志将 Java 评为 1995 年十大最佳产品之一。

1996 年 1 月 23 日，JDK 1.0 发布，Java 语言有了第一个正式版本的运行环境。JDK 1.0 是一个纯解释执行的 Java 虚拟机，代表技术有：Java 虚拟机、AWT（图形化界面）、Applet。

4 月，十个主要的操作系统和计算机供应商宣称将在产品中嵌入 Java 技术。9 月，已有大约 8.3 万网页应用采用了 Java 来制作。5 月底，第一届 JavaOne 大会在旧金山举行，从此，JavaOne 成为全世界数百万 Java 语言开发者的技术盛会。

 1997 年 2 月 19 日，JDK 1.1 发布，代表技术有：JAR 文件格式、JDBC、JavaBeans、RMI（远程方法调用）。

1998 年 12 月 4 日，JDK 1.2 发布，这是一个里程碑式的版本。Sun 在这个版本中把 Java 拆分为三个方向：面向桌面开发的 J2SE、面向企业开发的 J2EE，面向移动开发的 J2ME。代表技术有：EJB、Swing。

2000 年 5 月 8 日，JDK 1.3 发布，对 Java 2D 做了大幅修改。

2002 年 2 月 13 日，JDK 1.4 发布，这是 Java 真正走向成熟的一个版本，IBM、富士通（二哥曾在这家世界 500 强的日企工作过三年半时间）等著名公司都有参与。代表技术有：正则表达式、NIO。

2004 年 9 月 30 日，JDK 5 发布，注意 Sun 把“1.x”的命名方式抛弃了。JDK 5 在 Java 语法的易用性上做出了非常大的改进，比如说：自动装箱、泛型、动态注解、枚举、可变参数、foreach 循环。

2006 年 12 月 11 日，JDK 6 发布，J2SE 变成了 Java SE 6，J2EE 变成了 Java EE 6，J2ME 变成了 Java ME 6。JDK 6 恐怕是 Java 历史上使用寿命最长的一个版本了。主要的原因有：代码复杂性的增加、世界经济危机、Oracle 对 Sun 的收购。

JDK 6 的最后一个升级补丁为 Java SE 6 Update 211， 于 2018 年 10 月 18 日发布——12 年的跨度啊！

2009 年 2 月 19 日，JDK 7 发布，但功能是阉割的。很多翘首以盼的功能都没有完成，比如说 Lambda  表达式。主要是因为 Sun 公司在商业上陷入了泥沼，已经无力推动 JDK 7 的研发工作。

2009 年 4 月 20 日，Oracle 以 74 亿美元的价格收购了市值曾超过 2000 亿美元的 Sun 公司——太阳终究还是落山了。对于 Java 语言这个孩子来说，可以说是好事，也可以说是坏事。好事是 Oracle 有钱，能够注入资金推动 Java 的发展；坏处就是 Oracle 是后爸，对 Java 肯定没有 Sun 那么亲，走的是极具商业化的道路。

2014 年 3 月 18 日，JDK 8 终于来了，步伐是那么蹒跚，但终究还是来了。带着最强有力的武器——Lambda 表达式而来。虽然 JDK 19 马上就发布了，但“新版任你发，我用 Java 8”的梗至今还流传着。

2017 年 9 月 21 日，JDK 9 发布。从此以后，JDK 更新版本的速度令开发者应接不暇，半年一个版本，虽然 Oracle 的目的是好的，为了避免因功能增加而引发的跳票风险，但不得不承认，版本更新的节奏实在是有点过于频繁。

这就导致一个问题，好不容易更新一个版本，用了六个月后，Oracle 不维护了。针对这个问题，Oracle 给出的解决方案挺奇葩的，每六个 JDK 大版本才会被长期支持（Long Term Support，LTS）。

JDK 8 是 LTS 版，2018 年 9 月 25 日发布的 JDK 11 是 LTS 版， 2018 年 3 月 20 日发布的 JDK 10 就可以一笔带过了。

2021 年发布的 JDK 17 是目前最新的 LTS 版本。

JDK 12、JDK 13、JDK 14、JDK 15、JDK 16、JDK 18、JDK 19 都是过渡产品，就好像是试验品一样，不太受开发者待见。

Java 发展到今天已经 20 多年了，作为一个编程语言确实不简单，Java 代表的面向对象思想确实给工程领域带来了革命性的变化，关键是 Java 一直在拥抱变化。

大数据方面，有 Apache Kafka、Apache Samza、Apache Storm、Apache Spark、Apache Flink，除了 Spark 是基于 JVM 的函数语言 Scala 编写的，其余都是 Java 编写的。

Java 在云时代面临着以 Go 语言为主的容器（Docker 等技术）生态圈的挑战，但是，Java 的大型分布式系统越来越多，Java 在云计算与分布式系统中还是扮演着主要角色，并且形成了一个大型的生态圈。

虽然 Java 和 C++，C 一样，都“老”了，被其他语言不断地挑战，但只有强者才有机会接受挑战，对吧？我相信，Java 的未来依然很光明。

----

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

关注二哥的原创公众号 **沉默王二**，回复**111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)


## 2.3 学 Java 有前途吗？

尽管 Java 已经 25 岁了，但仍然“宝刀未老”。在 Stack Overflow 2019 年流行编程语言调查报告中，Java 位居第 5 位，有 41% 的受调开发者认为 Java 仍然是一门受欢迎的编程语言。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/three-01.png)

国内对 Java 的使用率远超国外，所以国内 Java 的市场占有率更大，不管是 2020 年还是 2021、2022、2023 年，短时间内，Java 的霸主地位很难撼动。

虽然这些年 Java 很卷的话，甚嚣尘上，我只能说这样的声音每年都有，听听就好了。

很多大型的互联网公司都在使用 Java，国内最有名的当属阿里巴巴，国外最有名的当属谷歌。那为什么 Java 如此流行呢？

**1）简单性**

Java 为开发者提供了简单易用的用户体验，与其他面向对象编程语言相比，Java 的设计和生态库具有巨大的优势。Java 剔除了 C++ 中很少使用、难以理解、易混淆的特别，比如说指针运算、操作符重载，内存管理等。

Java 可以做到堆栈分配、垃圾回收和自动内存管理，在一定程度上为开发者减轻了入门的难度。

**2）可移植性**

如果 Java 直接编译成操作系统能识的二进制码，可能一个标识在 Windows 操作系统下是1100，而 Linux 下是 1001，这样的话，在 Windows 操作系统下可以运行的程序到了 Linux 环境下就无法运行。

为了解决这个问题，Java 先编译生成字节码，再由 JVM（Java 虚拟机）来解释执行，目的就是将统一的字节码转成操作系统可以识别的二进制码，然后执行。而针对不同的操作系统，都有相应版本的 JVM，所以 Java 就实现了可移植性。

**3）安全性**

Java 适用于网络/分布式环境，为了达到这个目标，在安全方面投入了巨大的精力。使用 Java 可以构建防病毒、防篡改的程序。

从一开始，Java 就设计了很多可以防范攻击的机制，比如说：

- 运行时堆栈溢出，这是蠕虫病毒常用的攻击手段。
- 字节码验证，可以确保代码符合 JVM 规范并防止恶意代码破坏运行时环境。
- 安全的类加载，可以防止不受信任的代码干扰 Java 程序的运行。
- 全面的 API 支持广泛的加密服务，包括数字签名、消息摘要、（对称、非对称）密码、密钥生成器。
- 安全通信，支持 HTTPS、SSL，保护传输的数据完整性和隐私性。

**4）并发性**

Java 在多线程方面做得非常突出，只要操作系统支持，Java 中的线程就可以利用多个处理器，带来了更好的交互响应和实时行为。

“二哥，那 Java 还会继续流行下去吗？”三妹眨了眨她的长睫毛，对我说。

“当然！这主要得益于 Java 广泛的应用场景。”我斩钉截铁地回答到。

### **大数据领域：**

与 Python 一样，Java 在大数据领域占据着主导地位，很多用于处理大规模数据的框架都是基于 Java 开发的。

- Apache Hadoop，用于在分布式环境中处理大规模数据集。Hadoop 采用了主副架构模式，其中主节点负责控制整个分布式计算栈。Hadoop 在需要处理和分析大规模数据的公司当中很流行。
- Apache Spark，大型的 ETL（数据仓库技术）、预测分析和报表程序经常使用到 Spark。
- Apache Mahout，用于机器学习，比如分类、聚类和推荐。
- JFreechart，用于可视化数据，可以用它制作各种图表，比如饼图、柱状图、线图、散点图、盒状图、直方图等等。
- Deeplearning4j，用于构建各种类型的神经网络，可以与 Spark 集成，运行在 GPU（图形处理器）上。
- Apache Storm，用于处理实时数据流，一个 Storm 节点可以在秒级处理数百万个作业。

### **物联网（IoT）领域：**

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/three-02.png)

Oracle 表示，灵活性和流行度是 IoT 程序员选择 Java 的主要原因。Java 提供了大量的 API 库，可以很容易应用到嵌入式应用程序中。相比其他编程语言，比如 C 语言，Java 在切换平台时更加顺畅，不容易出错。

### **金融服务领域：**

- 聊天机器人，由于可移植性、可维护性、可视化等诸多方面的因素，Java 成了开发聊天机器人最好的工具。
- 欺诈检测和管理，银行和金融公司使用 AI（人工智能）工具来进行金融欺诈和信用卡欺诈检测，而 Java 常用来开发这些 AI 工具。
- 交易系统，Java 虚拟机提供的动态运行时编译优化在很多情况下比编译型语言（如 C++）具有更好的性能，让交易系统运行得更顺畅。
- 移动钱包，基于 AI 和 Java 算法开发的移动钱包，可以帮助用户在花钱时做出更智能的决策。

### **Web 领域：**

Java 技术对 Web 领域的发展注入了强大的动力，主流的 Java Web 开发框架有很多：

-  Spring 框架，一个轻量级的控制反转（IoC）和面向切面（AOP）的容器框架，渗透了 Java EE 技术的方方面面，绝大部分 Java 应用都可以从 Spring 框架中受益。
- Spring MVC 框架，是一种基于 Java 实现的 MVC（Model-View-Controller）设计模式的请求驱动类型的轻量级 Web 框架。
- MyBatis 框架，一个优秀的数据持久层框架，可在实体类和 SQL 语句之间建立映射关系，是一种半自动化的 ORM（Object Relational Mapping，对象关系映射）实现。
- JavaServer Faces 框架，由 Oracle 开发，能够将表示层与应用程序代码轻松连接，它提供了一个 API 集，用于表示和管理 UI 组件。

总之，Oracle 宣称，Java 正运行在 97% 的企业计算机上——有点厉害的样子。

----

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

关注二哥的原创公众号 **沉默王二**，回复**111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

## 2.4 安装Java开发工具包JDK

因为Java程序必须运行在 JVM 之上，所以我们 Java 程序员在学习 Java 之前，要做的第一件事情就是安装JDK。

什么？ 

又是 JVM 又是 JDK 的，能不能讲清楚一点。

要扯清楚这两者之间的关系，就必须得再扯出另外一个名词 JRE，哈哈哈。

它们之间的关系可以用这幅图来表示。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/jdk-install-config-6f6fdb4a-7a44-4e76-b4ea-71c070a5b220.png)

真的是人生无常，大肠包小肠啊。

### JVM、JRE、JDK 有什么关系

JDK（Java Development Kit）是用于开发 Java 应用程序的软件环境。里面包含运行时环境（JRE）和其他 Java 开发所需的工具，比如说解释器（java）、编译器（javac）、文档生成器（javadoc）等等。

JRE（Java Runtime Environment）是用于运行 Java 应用程序的软件环境。也就是说，如果只想运行 Java 程序而不需要开发 Java 程序的话，只需要安装 JRE 就可以了。

JVM (Java Virtual Machine) ，也就是 Java 虚拟机，由一套字节码指令集、一组寄存器、一个栈、一个垃圾回收堆和一个存储方法域等组成，屏蔽了不同操作系统（macOS、Windows、Linux）的差异性，使得Java能够“一次编译，到处运行”。

比如说我用 macOS 生成了一个 jar 包（里面是打包好的字节码——可以在Java虚拟机上运行的目标代码），可以丢给 Windows 用户直接运行，也可以直接上传到 Linux 服务器运行。

这是 Oracle 官方给出的 JDK、JRE、JVM 关系图。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/jdk-install-config-cbc87f87-6351-4356-936b-77850cc682d5.png)

那针对不同的操作系统，官方也提供了不同的 JDK 安装包。如果你用谷歌去搜“JDK”关键字，能搜到官方的下载链接。

>[https://www.oracle.com/java/technologies/downloads/](https://www.oracle.com/java/technologies/downloads/)

如果你用百度去搜，嗯。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/jdk-install-config-31e739ff-b69f-47b6-9db4-8843cd8a716a.png)

总之，是把官方给吃了。

好，如果你想安装 JDK ，到官方下载。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/jdk-install-config-e5b91a70-2a23-4ebd-896a-5ff19f0075b1.png)

最新版是 JDK 18（短期版本），上一个长期支持版本是 JDK 17，推荐安装 JDK 8，哈哈哈哈，它升任它升，我用 Java 8。往下翻就能找到了。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/jdk-install-config-a32db267-febe-4852-b528-deaacb43247d.png)

下载完双击安装，然后配置环境变量就OK 了。

先说 Windows 用户，在电脑桌面 右键点击 “此电脑”的“属性”选项

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/jdk-install-config-a0a78e05-886f-425a-8ba9-d27314f7a21c.png)

选择“高级系统设置”选项

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/jdk-install-config-fdc94ada-ae44-4a93-ba0d-92860119ad9c.png)

点击下面的“环境变量”选项

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/jdk-install-config-919eb8f0-9869-450c-a6cb-50318dd3e2e5.png)

点击“系统变量”下面的”新建“选项

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/jdk-install-config-a4c05c3e-f305-4d6a-96d2-fe345e980c3b.png)

在”变量名“处填上”Java_Home“，”变量值“为JDK安装路径，比如说”D:\Program Files\Java\jdk1.8.0_91“

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/jdk-install-config-26be5706-036d-4fae-99fa-d5f14b7380d4.png)

参考链接：https://www.cnblogs.com/cnwutianhao/p/5487758.html

macOS 用户直接往后翻。

上面这种下载 JDK 安装配置的方式没啥技术含量，所以下面我给大家推荐两种高级的：

### Windows 用户

Windows 用户建议先安装 Chocolatey，这是一个Windows下的命令行软件管理器，可以方便开发者像在Linux下使用yum命令来安装软件，或者像在macOS下使用brew 命令来安装软件，非常酷炫。

[Chocolatey：Windows的命令行软件管理神器](https://tobebetterjavaer.com/gongju/choco.html)

安装完成后，直接执行 `choco install jdk8` 就可以安装 JDK 8 了，并且会自动将Java加入到环境变量中，不用再去「我的电脑」「环境变量」中新建 JAVA_HOME 并复制 JDK 安装路径配置 PATH 变量了

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/choco-80a6ced8-c25d-4371-8096-b95be48af768)

### macOS 用户

macOS 用户建议先安装 Homebrew，这是一个 macOS 下的命令行软件管理器，可以通过一行命令安装 Apple（或 Linux 系统）没有预装但你需要的软件。

[Homebrew：macOS的命令行软件管理神器](https://tobebetterjavaer.com/gongju/brew.html)

安装完成后，直接执行 `brew install openjdk@8` 就可以安装 JDK 8 了。

如果需要在 macOS 安装多个版本的 JDK ，比如说 JDK 17，多个版本的 JDK 怎么管理呢？可以安装一下 jEnv，一个帮助我们管理 JAVA_HOME 的命令行工具，在 GitHub 上已经收获 4.3k 的 star。

安装：

```
brew install jenv
```

配置：

```
echo 'export PATH="$HOME/.jenv/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(jenv init -)"' >> ~/.zshrc
```

添加：

```
jenv add /usr/local/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home/
```


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/brew-b126c35d-edab-48a9-9543-831cfd0a51c6.png)


JDK 的安装路径可以通过下图的位置查找。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/brew-a32accec-4044-480c-a8c8-3781bc5048b5.png)

管理：

```
jenv versions
jenv global 17.0.3
```

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/brew-cc01fad8-53e9-4474-8923-08e97ac7090a.png)

是不是贼方便？再也不用整这 `echo 'export PATH="/usr/local/opt/openjdk@17/bin:$PATH"' >> ~/.zshrc` 玩意了！爽，实在是爽！

----

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

关注二哥的原创公众号 **沉默王二**，回复**111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

## 2.5 安装集成开发环境Intellij IDEA

IntelliJ IDEA 简称 IDEA，是业界公认为最好的 Java 集成开发工具，尤其是在代码自动提示、代码重构、代码版本管理、单元测试、代码分析等方面有着亮眼的发挥。

IDEA 产于捷克，开发人员以严谨著称的东欧程序员为主，分为社区版和付费版两个版本。如果只是学习 Java SE 社区版就足够用了。想要更多功能的话，比如说 Spring initializr 功能，需要下载付费版。

回想起我最初学 Java 的时候，老师要求我们在记事本上敲代码，在命令行中编译和执行 Java 代码，搞得全班三分之二的同学都做好了放弃学习 Java 的打算。

鉴于此，我强烈推荐大家使用集成开发工具，比如说 IntelliJ IDEA 来学习。

为了照顾到刚学 Java 的零基础的宝宝，我这里把 macOS 系统和 Windows 系统都介绍一下，真手摸手教你学 Java 系统。

（你应该知道自己的电脑是 Windows 还是 macOS 吧？什么？你是 Linux 系统，不好意思，你可以跳过这个章节了。）

### 一、Windows

#### 01、下载 IDEA

IntelliJ IDEA 的官方下载地址为：[https://www.jetbrains.com/idea/download/](https://www.jetbrains.com/idea/download)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-d7ac2335-4c65-442c-931e-994e00db4235.png)


UItimate 为付费版，可以免费试用，主要针对的是 Web 和企业开发用户；Community 为免费版，可以免费使用，主要针对的是 Java 初学者和安卓开发用户。

功能上的差别如下图所示。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-43e0ec45-acee-4c18-b0ff-ac7f4fc054f9.png)

本篇教程主要针对的是 Java 初学者，所以选择免费版为例，点击「Download」进行下载。

稍等一分钟时间，大概 580M。

#### 02、安装 IDEA

双击运行 IDEA 安装程序，一步步傻瓜式的下一步就行了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-8d0b11b3-99da-45c5-b9c3-a5d4e26077b5.png)


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-3747b308-9b27-4068-9c47-46bc7098f8d4.png)


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-5765a40b-e3c1-4021-b1de-73ae27774008.png)

为了方便启动 IDEA，可以勾选【64-bit launcher】复选框。为了关联 Java 源文件，可以勾选【.java】复选框。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-15b6f6f4-308d-41d8-869a-4eb625f65eb0.png)

点击【Install】后，需要静静地等待一会，大概一分钟的时间，趁机休息一下眼睛。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-2a80c17a-dbb6-4411-b88b-5bf1398db411.png)

安装完成后的界面如下图所示。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-2afe2860-e3ef-4370-a0a5-f0075487f159.png)

#### 03、启动 IDEA

回到桌面，双击运行 IDEA 的快捷方式，启动 IDEA。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-937da9b9-56e3-4970-ab50-e24f4b3549da.png)

假装阅读完条款后，勾选同意复选框，点击【Continue】

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-0426d0d2-26eb-4376-bcaa-cede00fc2622.png)

如果想要帮助 IDEA 收集改进信息，可以点击【Send Usage Statistics】；否则点击【Don't send】。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-b880a884-dbf5-4ce8-b0c1-345d60c72eff.png)


到此，Intellij IDEA 的安装就完成了，很简单。

### 二、macOS

#### 01、下载 IDEA

1.  打开 [https://www.jetbrains.com/idea/](https://www.jetbrains.com/idea/download/#section=mac)，点击Download按钮

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-38cc7637-ed3f-44c0-b244-aafafd3634b6.png)

2.  选择 Community 版本（也就是社区版、免费版了，旗舰版需要激活，你可以戳这里[激活](https://tobebetterjavaer.com/nice-article/itmind/)）。
  
确定后点击 Download 下载

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-b17d0ff0-d33c-4d19-86e0-cd491c0cc613.png)


如何查看 Mac 电脑是 Intel 还是 Apple Silicon 的 CPU？

在 Mac 上，单击菜单栏左上角的\[Apple\]图标，然后选择“关于本机”（About This Mac）选项。

- 如果在“芯片”部分中看到Apple M1（或更高版本），则意味着使用的是带有\[Apple Silicon CPU\]的Mac。
- 如果在“处理器”部分中看到英特尔处理器，则表示正在使用带有英特尔芯片的Mac。

瞧，我这里就是英特尔芯片的（Intel）。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-3977e9b4-9c26-4e00-bc88-1ac1f2f89d5e.png)


3.  打开如下页面，IntelliJ IDEA 便会开始自动下载。若未开始自动下载，可以点击如下红框内的 direct link。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-5b074f76-71c7-405e-871e-de1ee1d6376e.png)


中文页面如下所示：

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-f88924e5-6470-4d44-8f85-922875a3c565.png)

4.  IntelliJ IDEA下载完成，在下载文件夹内便会出现 ideaIC-2020.3.2.dmg 的文件。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-7aec8534-ea7b-41f5-bc68-e6d2fb20e6c1.png)

#### 02、安装 IDEA

1.  双击 ideaIC-2020.3.2.dmg 文件开始安装

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-23195fb7-3a1c-4466-bf17-4f681ef0be5e.png)

2.  把 IntelliJ IDEA CE.app 拖入 Applications 文件夹

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-7bd55d3b-54ce-4e4e-8e21-aa94f15d105a.png)

3.  在 Applications 中可以找到 IntelliJ IDEA CE.app，说明安装完成

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-96c1a054-8429-416a-ad5d-7fa3f360c19f.png)

#### 03、打开 IDEA

首次打开 IntelliJ IDEA 后展现的第一个页面如下所示。至此，IntelliJ IDEA下载、安装和打开就搞定了。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/IDEA-install-config-7637a241-8524-4e0a-bb2a-a3bd1c575c9a.png)


-----

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

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

# 第三章：Java语法基础

## 3.1 Java中常用的48个关键字和2个保留字

“二哥，就之前你给我展示的 Java 代码中，有 public、static、void、main 等等，它们应该都是关键字吧？”三妹的脸上泛着甜甜的笑容，我想她在学习 Java 方面已经变得越来越自信了。

“是的，三妹。Java 中的关键字可不少呢！你一下子可能记不了那么多，不过，先保留个印象吧，对以后的学习会很有帮助。”

>PS：这里我们按照首字母的自然顺序排列来简述一下，了解即可，记不住没关系哦。这些关键字我们在后续的学习中会详细讲解的，直到你搞懂为止。

1.  **abstract：** 用于声明[抽象类](https://tobebetterjavaer.com/oo/abstract.html)，以及抽象方法。

2.  **boolean：** 用于将变量声明为布尔值类型，只有 true 和 false 两个值。

3.  **break：** 用于中断循环或 switch 语句。

4.  **byte：** 用于声明一个可以容纳 8 个比特的变量。

5.  **case：** 用于在 switch 语句中标记条件的值。

6.  **catch：** 用于捕获 try 语句中的[异常](https://tobebetterjavaer.com/exception/gailan.html)。

7.  **char：** 用于声明一个可以容纳无符号 16 位比特的 [Unicode 字符](https://tobebetterjavaer.com/basic-extra-meal/java-unicode.html)的变量。

8.  **class：** 用于声明一个[类](https://tobebetterjavaer.com/oo/object-class.html)。

9.  **continue：** 用于继续下一个循环，可以在指定条件下跳过其余代码。

10.  **default：** 用于指定 switch 语句中除去 case 条件之外的默认代码块。

11.  **do：** 通常和 while 关键字配合使用，do 后紧跟循环体。

12.  **double：** 用于声明一个可以容纳 64 位浮点数的变量。

13.  **else：** 用于指示 if 语句中的备用分支。

14.  **enum：** 用于定义一组固定的常量（[枚举](https://tobebetterjavaer.com/basic-extra-meal/enum.html)）。

15.  **extends：** 用于指示一个类是从另一个类或接口[继承](https://tobebetterjavaer.com/oo/extends-bigsai.html)的。

16.  **final：** [用于指示该变量是不可更改的](https://tobebetterjavaer.com/oo/final.html)。

17.  **finally：** 和 `try-catch` 配合使用，表示无论是否处理异常，总是执行 finally 块中的代码。

18.  **float：** 用于声明一个可以容纳 32 位浮点数的变量。

19.  **for：** 用于声明一个 for 循环，如果循环次数是固定的，建议使用 for 循环。

20.  **if：** 用于指定条件，如果条件为真，则执行对应代码。

21.  **implements：** 用于实现[接口](https://tobebetterjavaer.com/oo/interface.html)。

22.  **import：** 用于导入对应的类或者接口。

23.  **instanceof：** [用于判断对象是否属于某个类型（class）](https://tobebetterjavaer.com/basic-extra-meal/instanceof.html)。

24.  **int：** 用于声明一个可以容纳 32 位带符号的整数变量。

25.  **interface：** 用于声明接口。

26.  **long：** 用于声明一个可以容纳 64 位整数的变量。

27.  **native：** 用于指定一个[方法是通过调用本机接口（非 Java）实现的](https://tobebetterjavaer.com/oo/method.html)。

28.  **new：** 用于创建一个新的对象。

29.  **null：** 如果一个变量是空的（什么引用也没有指向），就可以将它赋值为 null，和空指针异常息息相关。

30.  **package：** 用于声明类所在的[包](https://tobebetterjavaer.com/oo/package.html)。

31.  **private：** 一个[访问权限修饰符](https://tobebetterjavaer.com/oo/access-control.html)，表示方法或变量只对当前类可见。

32.  **protected：** 一个访问权限修饰符，表示方法或变量对同一包内的类和所有子类可见。

33.  **public：** 一个访问权限修饰符，除了可以声明方法和变量（所有类可见），还可以声明类。`main()` 方法必须声明为 public。

34.  **return：** 用于在代码执行完成后返回（一个值）。

35.  **short：** 用于声明一个可以容纳 16 位整数的变量。

36.  **static：** 表示该变量或方法是[静态变量或静态方法](https://tobebetterjavaer.com/oo/static.html)。

37.  **strictfp：** 并不常见，通常用于修饰一个方法，确保方法体内的浮点数运算在每个平台上执行的结果相同。

38.  **super：** 可用于[调用父类的方法或者字段](https://tobebetterjavaer.com/oo/this-super.html)。

39.  **switch：** 通常用于三个（以上）的条件判断。

40.  **synchronized：** [用于指定多线程代码中的同步方法、变量或者代码块](https://tobebetterjavaer.com/thread/synchronized-1.html)。

41.  **this：** [可用于在方法或构造函数中引用当前对象](https://tobebetterjavaer.com/oo/this-super.html)。

42.  **throw：** 主动抛出[异常](https://tobebetterjavaer.com/exception/gailan.html)。

43.  **throws：** 用于声明异常。

44.  **transient：**  [修饰的字段不会被序列化](https://tobebetterjavaer.com/io/transient.html)。

45.  **try：** 于包裹要捕获异常的代码块。

46.  **void：** 用于指定方法没有返回值。

47.  **volatile：** 保证不同线程对它修饰的变量进行操作时的[可见性](https://tobebetterjavaer.com/thread/volatile.html)，即一个线程修改了某个变量的值，新值对其他线程来说是立即可见的。

48.  **while：** 如果循环次数不固定，建议使用 while 循环。


“好了，三妹，关于 Java 中的关键字就先说这 48 个吧，这只是一个大概的介绍，后面还会对一些特殊的关键字单独拎出来详细地讲，比如说重要的 static、final 等等。”转动了一下僵硬的脖子后，我对三妹说。

“除了这些关键字，Java 中还有两个非常特殊的保留字（goto 和 const），它们不能在程序中使用。”

“goto 在 C语言中叫做‘无限跳转’语句，在 Java 中，不再使用 goto 语句，因为无限跳转会破坏程序结构。”

“const 在 C语言中是声明常量的关键字，在 Java 中可以使用 public static final 三个关键字的组合来达到常量的效果。”

“好的二哥，我了解了，你休息会，我再记一记。”

----

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

## 3.2 Java注释

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

**第三步，** 执行 `ls -l` 命令就可以看到生成代码文档时产生的文件，主要是一些可以组成网页的 html、js 和 css 文件。

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

比如说，在使用 String 类的时候，鼠标悬停在 String 上时可以得到以下提示。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/fourteen-09.png)

2）所有的抽象方法(包括接口中的方法)必须要用Javadoc注释、除了返回值、参数、 异常说明外，还必须指出该方法做什么事情，实现什么功能。

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

4）所有的枚举类型字段必须要有注释，说明每个数据项的用途。

5）代码修改的同时，注释也要进行相应的修改。


“好了，三妹，关于 Java 中的注释就先说这么多吧。”转动了一下僵硬的脖子后，我对三妹说。“记住一点，注释是程序固有的一部分。”

- 第一、注释要能够准确反映设计思想和代码逻辑;
- 第二、注释要能够描述业务含 义，使别的程序员能够迅速了解到代码背后的信息。

完全没有注释的大段代码对于阅读者形同 天书，注释是给自己看的，即使隔很长时间，也能清晰理解当时的思路;注释也是给继任者看 的，使其能够快速接替自己的工作。

-----

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

## 3.3 Java中的数据类型

“Java 是一种静态类型的编程语言，这意味着所有变量必须在使用之前声明好，也就是必须得先指定变量的类型和名称。”我吸了一口麦香可可奶茶后对三妹说。

Java 中的数据类型可分为 2 种：

1）**基本数据类型**。

基本数据类型是 Java 语言操作数据的基础，包括 boolean、char、byte、short、int、long、float 和 double，共 8 种。

2）**引用数据类型**。

除了基本数据类型以外的类型，都是所谓的引用类型。常见的有[数组](https://tobebetterjavaer.com/array/array.html)（对，没错，数组是引用类型，后面我们会讲）、class（也就是[类](https://tobebetterjavaer.com/oo/object-class.html)），以及[接口](https://tobebetterjavaer.com/oo/interface.html)（指向的是实现接口的类的对象）。

来个思维导图，感受下。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/core-grammar/nine-01.png)

[变量](https://tobebetterjavaer.com/oo/var.html)可以分为局部变量、成员变量、静态变量。

当变量是局部变量的时候，必须得先初始化，否则编译器不允许你使用它。拿 int 来举例吧，看下图。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/core-grammar/nine-02.png)

当变量是成员变量或者静态变量时，可以不进行初始化，它们会有一个默认值，仍然以 int 为例，来看代码：

```java
/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class LocalVar {
    private int a;
    static int b;

    public static void main(String[] args) {
        LocalVar lv = new LocalVar();
        System.out.println(lv.a);
        System.out.println(b);
    }
}
```

来看输出结果：

```
0
0
```

瞧见没，int 作为成员变量时或者静态变量时的默认值是 0。那不同的基本数据类型，是有不同的默认值和大小的，来个表格感受下。

| 数据类型 | 默认值   | 大小  |
| -------- | -------- | ----- |
| boolean  | false    | 1比特 |
| char     | '\u0000' | 2字节 |
| byte     | 0        | 1字节 |
| short    | 0        | 2字节 |
| int      | 0        | 4字节 |
| long     | 0L       | 8字节 |
| float    | 0.0f     | 4字节 |
| double   | 0.0      | 8字节 |

### 比特和字节

那三妹可能要问，“比特和字节是什么鬼？”

比特币（Bitcoin）听说过吧？字节跳动（Byte Dance）听说过吧？这些名字当然不是乱起的，确实和比特、字节有关系。

#### **1）bit（比特）**

比特作为信息技术的最基本存储单位，非常小，但大名鼎鼎的比特币就是以此命名的，它的简写为小写字母“b”。

大家都知道，计算机是以二进制存储数据的，二进制的一位，就是 1 比特，也就是说，比特要么为 0 要么为 1。

#### **2）Byte（字节）**

通常来说，一个英文字符是一个字节，一个中文字符是两个字节。字节与比特的换算关系是：1 字节 = 8 比特。

在往上的单位就是 KB，并不是 1000 字节，因为计算机只认识二进制，因此是 2 的 10 次方，也就是 1024 个字节。

（终于知道 1024 和程序员的关系了吧？狗头保命）

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/core-grammar/nine-03.png)

### 基本数据类型

接下来，我们再来详细地了解一下 8 种基本数据类型。

#### 01、布尔

布尔（boolean）仅用于存储两个值：true 和 false，也就是真和假，通常用于条件的判断。代码示例：

```java
boolean flag = true;
```

#### 02、byte

byte 的取值范围在 -128 和 127 之间，包含 127。最小值为 -128，最大值为 127，默认值为 0。

在网络传输的过程中，为了节省空间，常用字节来作为数据的传输方式。代码示例：


```java
byte a = 10;
byte b = -10;
```

#### 03、short

short 的取值范围在 -32,768 和 32,767 之间，包含 32,767。最小值为 -32,768，最大值为 32,767，默认值为 0。代码示例：

```java
short s = 10000;
short r = -5000;
```

#### 04、int

int 的取值范围在 -2,147,483,648（-2 ^ 31）和 2,147,483,647（2 ^ 31 -1）（含）之间，默认值为 0。如果没有特殊需求，整型数据就用 int。代码示例：

```java
int a = 100000;
int b = -200000;
```

#### 05、long

long 的取值范围在 -9,223,372,036,854,775,808(-2^63) 和 9,223,372,036,854,775,807(2^63 -1)（含）之间，默认值为 0。如果 int 存储不下，就用 long，整型数据就用 int。代码示例：

```java
long a = 100000L; 
long b = -200000L;
```

为了和 int 作区分，long 型变量在声明的时候，末尾要带上大写的“L”。不用小写的“l”，是因为小写的“l”容易和数字“1”混淆。

#### 06、float

float 是单精度的浮点数，遵循 IEEE 754（二进制浮点数算术标准），取值范围是无限的，默认值为 0.0f。float 不适合用于精确的数值，比如说货币。代码示例：

```java
float f1 = 234.5f;
```

为了和 double 作区分，float 型变量在声明的时候，末尾要带上小写的“f”。不需要使用大写的“F”，是因为小写的“f”很容易辨别。

#### 07、double

double 是双精度的浮点数，遵循 IEEE 754（二进制浮点数算术标准），取值范围也是无限的，默认值为 0.0。double 同样不适合用于精确的数值，比如说货币。代码示例：

```java
double d1 = 12.3
```

那精确的数值用什么表示呢？最好使用 BigDecimal，它可以表示一个任意大小且精度完全准确的浮点数。针对货币类型的数值，也可以先乘以 100 转成整型进行处理。

Tips：单精度是这样的格式，1 位符号，8 位指数，23 位小数，有效位数为 7 位。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/core-grammar/nine-04.png)

双精度是这样的格式，1 位符号，11 位指数，52 为小数，有效位数为 16 位。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/core-grammar/nine-05.png)

取值范围取决于指数位，计算精度取决于小数位（尾数）。小数位越多，则能表示的数越大，那么计算精度则越高。

>一个数由若干位数字组成，其中影响测量精度的数字称作有效数字，也称有效数位。有效数字指科学计算中用以表示一个浮点数精度的那些数字。一般地，指一个用小数形式表示的浮点数中，从第一个非零的数字算起的所有数字。如 1.24 和 0.00124 的有效数字都有 3 位。

#### 08、char

char 可以表示一个 16 位的 Unicode 字符，其值范围在 '\u0000'（0）和 '\uffff'（65,535）（包含）之间。代码示例：

```java
char letterA = 'A'; // 用英文的单引号包裹住。
```

那三妹可能要问，“char 既然只有一个字符，为什么占 2 个字节呢？”

“主要是因为 Java 使用的是 Unicode 字符集而不是 ASCII 字符集。字符集也可以叫编码，编码不同，实际占用的字节就会不同。”

[关于字符编码](https://tobebetterjavaer.com/basic-extra-meal/java-unicode.html)


### 关于 int 和 char 类型互转

这里整理一波 int 和 char 类型的互转，它们之间比较特殊。也会在以后的学习当中经常遇到。

1）可以通过[强制类型转换](https://tobebetterjavaer.com/basic-grammar/type-cast.html)将整型 int 转换为字符 char。

```java
public class SimpleTesting {
    public static void main(String[] args) {
        int value_int = 65;
        char value_char  = (char) value_int;
        System.out.println(value_char);
    }
} 
```

输出 `A`(其 [ASCII 值](https://tobebetterjavaer.com/basic-extra-meal/java-unicode.html)可以通过整数 65 来表示)。

2）可以使用 `Character.forDigit()` 方法将整型 int 转换为字符 char。

```java
public class SimpleTesting {
    public static void main(String[] args) {
        //radix 10 is for decimal number, for hexa use radix 16 
        int radix = 10; 
        int value_int = 6;
        char value_char = Character.forDigit(value_int , radix);
        System.out.println(value_char );
    }
}
```

radix 为基数，十进制为 10，十六进制为 16。

3）可以使用 int 的包装器类型 Integer 的 toString() 方法+String 的 CharAt() 方法转成 char

```java
public class SimpleTesting {
    public static void main(String[] args) {
        int value_int = 1;
        char value_char = Integer.toString(value_int).charAt(0);
System.out.println(value_char );
    }
}
```

4）char 转 int

当然了，如果只是简单的 char 转 int，直接赋值就可以了。

```java
int a = 'a';
```

因为发生了[自动类型转换](https://tobebetterjavaer.com/basic-grammar/type-cast.html)。


### 引用数据类型

基本数据类型在作为成员变量和静态变量的时候有默认值，引用数据类型也有的。

String 是最典型的引用数据类型，所以我们就拿 String 类举例，看下面这段代码：

```java
/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class LocalRef {
    private String a;
    static String b;

    public static void main(String[] args) {
        LocalRef lv = new LocalRef();
        System.out.println(lv.a);
        System.out.println(b);
    }
}
```

输出结果如下所示：

```
null
null
```

null 在 Java 中是一个很神奇的存在，在你以后的程序生涯中，见它的次数不会少，尤其是伴随着令人烦恼的“[空指针异常](https://tobebetterjavaer.com/exception/npe.html)”，也就是所谓的 `NullPointerException`。

也就是说，引用数据类型的默认值为 null，包括数组和接口。

那三妹是不是很好奇，为什么数组和接口也是引用数据类型啊？

先来看数组：

```java
/**
 * @author 微信搜「沉默王二」，回复关键字 java
 */
public class ArrayDemo {
    public static void main(String[] args) {
        int [] arrays = {1,2,3};
        System.out.println(arrays);
    }
}
```

arrays 是一个 int 类型的数组，对吧？打印结果如下所示：

```
[I@2d209079
```

`[I` 表示数组是 int 类型的，@ 后面是十六进制的 hashCode——这样的打印结果太“人性化”了，一般人表示看不懂！为什么会这样显示呢？查看一下 `java.lang.Object` 类的 `toString()` 方法就明白了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/core-grammar/nine-06.png)

数组虽然没有显式定义成一个类，但它的确是一个对象，继承了祖先类 Object 的所有方法。那为什么数组不单独定义一个类来表示呢？就像字符串 String 类那样呢？

一个合理的解释是 Java 将其隐藏了。假如真的存在一个 Array.java，我们也可以假想它真实的样子，它必须要定义一个容器来存放数组的元素，就像 String 类那样。

```java
public final class String
    implements java.io.Serializable, Comparable<String>, CharSequence {
    /** The value is used for character storage. */
    private final char value[];
}
```

数组内部定义数组？没必要的！

再来看接口：

```java
/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
public class IntefaceDemo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        System.out.println(list);
    }
}
```

List 是一个非常典型的接口：

```java
public interface List<E> extends Collection<E> {}
```

而 ArrayList 是 List 接口的一个实现：

```java
public class ArrayList<E> extends AbstractList<E>
        implements List<E>, RandomAccess, Cloneable, java.io.Serializable
{}
```

对于接口类型的引用变量来说，你没法直接 new 一个：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/core-grammar/nine-07.png)

只能 new 一个实现它的类的对象——那自然接口也是引用数据类型了。

来看一下基本数据类型和引用数据类型之间最大的差别。

基本数据类型：

- 1、变量名指向具体的数值。
- 2、基本数据类型存储在栈上。

引用数据类型：

- 1、变量名指向的是存储对象的内存地址，在栈上。
- 2、内存地址指向的对象存储在堆上。

### 堆和栈

看到这，三妹是不是又要问，“堆是什么，栈又是什么？”

堆是堆（heap），栈是栈（stack），如果看到“堆栈”的话，请不要怀疑自己，那是翻译的错，堆栈也是栈，反正我很不喜欢“堆栈”这种叫法，容易让新人掉坑里。

堆是在程序运行时在内存中申请的空间（可理解为动态的过程）；切记，不是在编译时；因此，Java 中的对象就放在这里，这样做的好处就是：

>当需要一个对象时，只需要通过 new 关键字写一行代码即可，当执行这行代码时，会自动在内存的“堆”区分配空间——这样就很灵活。

栈，能够和处理器（CPU，也就是脑子）直接关联，因此访问速度更快。既然访问速度快，要好好利用啊！Java 就把对象的引用放在栈里。为什么呢？因为引用的使用频率高吗？

不是的，因为 Java 在编译程序时，必须明确的知道存储在栈里的东西的生命周期，否则就没法释放旧的内存来开辟新的内存空间存放引用——空间就那么大，前浪要把后浪拍死在沙滩上啊。

这么说就理解了吧？

如果还不理解的话，可以看一下这个视频，讲的非常不错：[什么是堆？什么是栈？他们之间有什么区别和联系？](https://www.zhihu.com/question/19729973/answer/2238950166)

用图来表示一下，左侧是栈，右侧是堆。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/basic-grammar/basic-data-type-dc26645a-3ed8-4ad4-815d-52528ad12d6b.png)

这里再补充一些额外的知识点，能看懂就继续吸收，看不懂可以先去学下一节，以后再来补，没关系的。学习就是这样，可以跳过，可以温故。

举个例子。

```java
String a = new String("沉默王二")
```

这段代码会先在堆里创建一个 沉默王二的字符串对象，然后再把对象的引用 a 放到栈里面。这里面还会涉及到[字符串常量池](https://tobebetterjavaer.com/string/constant-pool.html)，后面会讲。

那么对于这样一段代码，有基本数据类型的变量，有引用类型的变量，堆和栈都是如何存储他们的呢？

```java
public void test()
{
    int i = 4;
    int y = 2;
    Object o1 = new Object();
}
```

我来画个图表示下。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/basic-grammar/basic-data-type-3d5b3e40-1abb-4624-8282-b83e58388825.png)

应该一目了然了吧？

“好了，三妹，关于 Java 中的数据类型就先说这么多吧，你是不是已经清楚了？”转动了一下僵硬的脖子后，我对三妹说。

---

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

## 3.4 Java数据类型转换

数据类型转换发生在所赋值的数值类型和接收数据的变量类型不一致的时候，它需要从一种数据类型转换成另一种数据类型。数据类型的转换可以分为隐式转换（自动类型转换）和显式转换（强制类型转换）两种。

### 自动类型转换

如果以下 2 个条件都满足，那么将一种类型的数据赋给另外一种类型的变量的时候，将会发生自动类型转换（automatic type conversion）。

*   两种数据类型彼此兼容
*   目标类型的取值范围大于源数据类型（低级类型数据转换成高级类型数据）

当以上 2 个条件都满足时，拓宽转换（widening conversion）就会发生。例如 byte 类型向 short 类型转换时，由于 short 类型的取值范围较大，会自动将 byte 转换为 short 类型。

在运算过程中，由于不同的数据类型会转换成同一种数据类型，所以整型、浮点型以及字符型都可以参与混合运算。自动转换的规则是从低级类型数据转换成高级类型数据。转换规则如下：

*   数值型数据的转换：byte→short→int→long→float→double。
*   字符型转换为整型：char→int。

以上数据类型的转换遵循从左到右的转换顺序，最终转换成表达式中表示范围最大的变量的数据类型。

顾客到超市购物，购买牙膏 2 盒，面巾纸 4 盒。其中牙膏的价格是 10.9 元，面巾纸的价格是 5.8 元，求商品总价格。实现代码如下：

```java
public static void main(String[] args) {
    float price1 = 10.9f; // 定义牙膏的价格
    double price2 = 5.8; // 定义面巾纸的价格
    int num1 = 2; // 定义牙膏的数量
    int num2 = 4; // 定义面巾纸的数量
    double res = price1 * num1 + price2 * num2; // 计算总价
    System.out.println("一共付给收银员" + res + "元"); // 输出总价
}
```

上述代码中首先定义了一个 float 类型的变量存储牙膏的价格，然后定义了一个 double 类型的变量存储面巾纸的价格，再定义两个 int 类型的变量存储物品的数量，最后进行了乘运算以及和运算之后，将结果储存在一个 double 类型的变量中进行输出。

```
一共付给收银员44.99999923706055元
```

从执行结果看出，float、int 和 double 三种数据类型参与运算，最后输出的结果为 double 类型的数据。这种转换一般称为“表达式中类型的自动提升”。

自动类型提升有好处，但它也会引起令人疑惑的编译错误。例如，下面看起来正确的程序却会引起问题：

```java
byte b = 50;

b = b * 2; // Type mismatch: cannot convert from int to byte
```

如上所示，第二行会报“类型不匹配：无法从int转换为byte”错误。


该程序试图将一个完全合法的 byte 型的值 `50*2` 存储给一个 byte 型的变量。但是当表达式求值的时候，操作数被自动的提升为 int 型，计算结果也被提升为 int 型。这样表达式的结果现在是 int 型，不强制转换它就不能被赋为 byte 型。

所以应该使用一个显示的强制类型转换，例如：

```java
byte b = 50;

b = (byte)(b*2);
```

这样就能产生正确的值 100。

注意：char 类型比较特殊，char 自动转换成 int、long、float 和 double，但 byte 和 short 不能自动转换为 char，而且 char 也不能自动转换为 byte 或 short。

### 强制类型转换

尽管自动类型转换是很有帮助的，但并不能满足所有的编程需要。例如，如果你需要将 double 型的值赋给一个 int 型的变量，你将怎么办？

这种转换不会自动进行，因为 double 型的变化范围比 int 型的要小。这种转换有使成为“缩小转换”，因为你肯定要将源数据类型的值变小才能适合目标数据类型。

所以当两种数据类型不兼容，或目标类型的取值范围小于源类型时，自动转换将无法进行，这时就需要进行强制类型转换。其语法格式如下：

```java
(type)variableName
```

其中，type 为 variableName 要转换成的数据类型，而 variableName 是指要进行类型转换的变量名称，强制转换的实例如下：

```java
int a = 3;
double b = 5.0;
a = (int)b;
```

上述代码中首先将 double 类型变量 b 的值强制转换成 int 类型，然后将值赋给 a，但是变量 b 本身的值是没有发生变化的。

在强制类型转换中，如果是将浮点类型的值转换为整数，直接去掉小数点后边的所有数字；而如果是整数类型强制转换为浮点类型时，将在小数点后面补零。

顾客到超市购物，购买牙膏 2 盒，面巾纸 4 盒。其中牙膏的价格是 10.9 元，面巾纸的价格是 5.8 元，求商品总价格，在计算总价时采用 int 类型的数据进行存储。实现代码如下：

```java
public static void main(String[] args) {
    float price1 = 10.9f;
    double price2 = 5.8;
    int num1 = 2;
    int num2 = 4;
    int res2 = (int) (price1 * num1 + price2 * num2);
    System.out.println("一共付给收银员" + res2 + "元");
}
```

在上述实例中，有 double 类型、float 类型和 int 类型的数据参与运算，其运算结果默认为 double 类型，题目要求的结果为 int 类型，因为 int 类型的取值范围要小于 double 类型的取值范围，所以需要进行强制类型转换。

```
一共付给收银员44元
```

>参考链接：[http://c.biancheng.net/view/796.html](http://c.biancheng.net/view/796.html)，整理：沉默王二

---

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

## 3.5 Java流程控制语句

“二哥，流程控制语句都有哪些呢？”三妹的脸上泛着甜甜的笑容，她开始对接下来要学习的内容充满期待了，这正是我感到欣慰的地方。

“比如说 if-else、switch、for、while、do-while、return、break、continue 等等，接下来，我们一个个来了解下。”

### 01、if-else 相关

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/control/thirteen-01.png)


#### **1）if 语句**

if 语句的格式如下：

```java
if(布尔表达式){  
// 如果条件为 true，则执行这块代码
} 
```

画个流程图表示一下：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/control/thirteen-02.png)


来写个示例：

```java
public class IfExample {
    public static void main(String[] args) {
        int age = 20;
        if (age < 30) {
            System.out.println("青春年华");
        }
    }
}
```

输出：

```
青春年华
```

#### **2）if-else 语句**

if-else 语句的格式如下:

```java
if(布尔表达式){  
// 条件为 true 时执行的代码块
}else{  
// 条件为 false  时执行的代码块
}  
```

画个流程图表示一下：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/control/thirteen-03.png)


来写个示例：

```java
public class IfElseExample {
    public static void main(String[] args) {
        int age = 31;
        if (age < 30) {
            System.out.println("青春年华");
        } else {
            System.out.println("而立之年");
        }
    }
}
```

输出：

```
而立之年
```

除了这个例子之外，还有一个判断闰年（被 4 整除但不能被 100 整除或者被 400 整除）的例子：

```java
public class LeapYear {
    public static void main(String[] args) {
        int year = 2020;
        if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
            System.out.println("闰年");
        } else {
            System.out.println("普通年份");
        }
    }
}
```

输出：

```
闰年
```

如果执行语句比较简单的话，可以使用三元运算符来代替 if-else 语句，如果条件为 true，返回 ? 后面 : 前面的值；如果条件为 false，返回 : 后面的值。

```java
public class IfElseTernaryExample {
    public static void main(String[] args) {
        int num = 13;
        String result = (num % 2 == 0) ? "偶数" : "奇数";
        System.out.println(result);
    }
}
```

输出：

```
奇数
```

#### **3）if-else-if 语句**

if-else-if 语句的格式如下：

```java
if(条件1){  
// 条件1 为 true 时执行的代码
}else if(条件2){  
// 条件2 为 true 时执行的代码
}  
else if(条件3){  
// 条件3 为 true 时执行的代码
}  
...  
else{  
// 以上条件均为 false 时执行的代码
} 
```

画个流程图表示一下：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/control/thirteen-04.png)


来写个示例：

```java
public class IfElseIfExample {
    public static void main(String[] args) {
        int age = 31;
        if (age < 30) {
            System.out.println("青春年华");
        } else if (age >= 30 && age < 40 ) {
            System.out.println("而立之年");
        } else if (age >= 40 && age < 50 ) {
            System.out.println("不惑之年");
        } else {
            System.out.println("知天命");
        }
    }
}
```

输出：

```
而立之年
```

#### **4）if 嵌套语句**

if 嵌套语句的格式如下：

```java
if(外侧条件){    
     // 外侧条件为 true 时执行的代码 
          if(内侧条件){  
             // 内侧条件为 true 时执行的代码
    }    
}  
```

画个流程图表示一下：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/control/thirteen-05.png)


来写个示例：

```java
public class NestedIfExample {
    public static void main(String[] args) {
        int age = 20;
        boolean isGirl = true;
        if (age >= 20) {
            if (isGirl) {
                System.out.println("女生法定结婚年龄");
            }
        }
    }
}
```

输出：

```
女生法定结婚年龄
```

### 02、switch 语句

switch 语句用来判断变量与多个值之间的相等性。变量的类型可以是 byte、short、int、long，或者对应的包装器类型 Byte、Short、Integer、Long，以及字符串和枚举。

来看一下 switch 语句的格式：

```java
switch(变量) {    
case 可选值1:    
 // 可选值1匹配后执行的代码;    
 break;  // 该关键字是可选项
case 可选值2:    
 // 可选值2匹配后执行的代码;    
 break;  // 该关键字是可选项
......    
    
default: // 该关键字是可选项     
 // 所有可选值都不匹配后执行的代码 
}    
```

- 变量可以有 1 个或者 N 个值。

- 值类型必须和变量类型是一致的，并且值是确定的。

- 值必须是唯一的，不能重复，否则编译会出错。

- break 关键字是可选的，如果没有，则执行下一个 case，如果有，则跳出 switch 语句。

- default 关键字也是可选的。



画个流程图：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/control/thirteen-06.png)



来个示例：

```java
public class Switch1 {
    public static void main(String[] args) {
        int age = 20;
        switch (age) {
            case 20 :
                System.out.println("上学");
                break;
            case 24 :
                System.out.println("苏州工作");
                break;
            case 30 :
                System.out.println("洛阳工作");
                break;
            default:
                System.out.println("未知");
                break; // 可省略
        }
    }
}
```

输出：

```
上学
```

当两个值要执行的代码相同时，可以把要执行的代码写在下一个 case 语句中，而上一个 case 语句中什么也没有，来看一下示例：

```java
public class Switch2 {
    public static void main(String[] args) {
        String name = "沉默王二";
        switch (name) {
            case "詹姆斯":
                System.out.println("篮球运动员");
                break;
            case "穆里尼奥":
                System.out.println("足球教练");
                break;
            case "沉默王二":
            case "沉默王三":
                System.out.println("乒乓球爱好者");
                break;
            default:
                throw new IllegalArgumentException(
                        "名字没有匹配项");

        }
    }
}
```

输出：

```
乒乓球爱好者
```

枚举作为 switch 语句的变量也很常见，来看例子：

```java
public class SwitchEnumDemo {
    public enum PlayerTypes {
        TENNIS,
        FOOTBALL,
        BASKETBALL,
        UNKNOWN
    }

    public static void main(String[] args) {
        System.out.println(createPlayer(PlayerTypes.BASKETBALL));
    }

    private static String createPlayer(PlayerTypes playerType) {
        switch (playerType) {
            case TENNIS:
                return "网球运动员费德勒";
            case FOOTBALL:
                return "足球运动员C罗";
            case BASKETBALL:
                return "篮球运动员詹姆斯";
            case UNKNOWN:
                throw new IllegalArgumentException("未知");
            default:
                throw new IllegalArgumentException(
                        "运动员类型: " + playerType);

        }
    }
}
```

输出：

```
篮球运动员詹姆斯
```

### 03、for 循环

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/control/thirteen-07.png)

#### **1）普通 for 循环**

普通的 for 循环可以分为 4 个部分：

1）初始变量：循环开始执行时的初始条件。

2）条件：循环每次执行时要判断的条件，如果为 true，就执行循环体；如果为 false，就跳出循环。当然了，条件是可选的，如果没有条件，则会一直循环。

3）循环体：循环每次要执行的代码块，直到条件变为 false。

4）自增/自减：初始变量变化的方式。

来看一下普通 for 循环的格式：

```java
for(初始变量;条件;自增/自减){  
// 循环体
}  
```

画个流程图：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/control/thirteen-08.png)


来个示例：

```java
public class ForExample {
    public static void main(String[] args) {
        for (int i = 0; i < 5; i++) {
            System.out.println("沉默王三好美啊");
        }
    }
}
```

输出：

```
沉默王三好美啊
沉默王三好美啊
沉默王三好美啊
沉默王三好美啊
沉默王三好美啊
```

“哎呀，二哥，你真的是变着法夸我啊。”

“非也非也，三妹，你看不出我其实在夸我自己吗？循环语句还可以嵌套呢，这样就可以打印出更好玩的呢，你要不要看看？”

“好呀好呀！”

“看好了啊。”

```java
public class PyramidForExample {
    public static void main(String[] args) {
        for (int i = 0; i < 5; i++) {
            for (int j = 0;j<= i;j++) {
                System.out.print("❤");
            }
            System.out.println();
        }
    }
}
```

打印出什么玩意呢？

```
❤
❤❤
❤❤❤
❤❤❤❤
❤❤❤❤❤
```

“哇，太不可思议了，二哥。”

“嘿嘿。”

#### **2）for-each**

for-each 循环通常用于遍历数组和集合，它的使用规则比普通的 for 循环还要简单，不需要初始变量，不需要条件，不需要下标来自增或者自减。来看一下语法：

```java
for(元素类型 元素 : 数组或集合){  
// 要执行的代码
}  
```


来看一下示例：

```java
public class ForEachExample {
    public static void main(String[] args) {
        String[] strs = {"沉默王二", "一枚有趣的程序员"};

        for (String str : strs) {
            System.out.println(str);
        }
    }
}
```

输出：

```
沉默王二
一枚有趣的程序员
```

“呀，二哥，你开始王哥卖瓜了啊。”

“嘿嘿，三妹，你这样说哥会脸红的。”

#### **3）无限 for 循环**

“三妹，你想不想体验一下无限 for 循环的威力，也就是死循环。”

“二哥，那会有什么样的后果啊？”

“来，看看就知道了。”

```java
public class InfinitiveForExample {
    public static void main(String[] args) {
        for(;;){
            System.out.println("停不下来。。。。");
        }
    }
}
```

输出：

```
停不下来。。。。
停不下来。。。。
停不下来。。。。
停不下来。。。。
```

一旦运行起来，就停不下来了，除非强制停止。

### 04、while 循环

来看一下 while 循环的格式：

```java
while(条件){  
//循环体  
}  
```

画个流程图：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/control/thirteen-09.png)

来个示例：

```java
public class WhileExample {
    public static void main(String[] args) {
        int i = 0;
        while (true) {
            System.out.println("沉默王三");
            i++;
            if (i == 5) {
                break;
            }
        }
    }
}
```

“三妹，你猜猜会输出几次？”

“五次吗？”

“对了，你可真聪明。”

```
沉默王三
沉默王三
沉默王三
沉默王三
沉默王三
```

“三妹，你想不想体验一下无限 while 循环的威力，也就是死循环。”

“二哥，那会有什么样的后果啊？”

“来，看看就知道了。”

```java
public class InfinitiveWhileExample {
    public static void main(String[] args) {
        while (true) {
            System.out.println("停不下来。。。。");
        }
    }
}
```

输出：

```
停不下来。。。。
停不下来。。。。
停不下来。。。。
停不下来。。。。
```

把 while 的条件设置为 true，并且循环体中没有 break 关键字的话，程序一旦运行起来，就根本停不下来了，除非强制停止。

### 05、do-while 循环

来看一下 do-while 循环的格式：

```java
do{  
// 循环体
}while(提交);  
```

画个流程图：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/control/thirteen-10.png)

来个示例：

```java
public class DoWhileExample {
    public static void main(String[] args) {
        int i = 0;
        do {
            System.out.println("沉默王三");
            i++;
            if (i == 5) {
                break;
            }
        } while (true);
    }
}
```

“三妹，你猜猜会输出几次？”

“五次吗？”

“对了，你可真聪明。”

```
沉默王三
沉默王三
沉默王三
沉默王三
沉默王三
```

“三妹，你想不想体验一下无限 do-while 循环的威力......”

“二哥，又来啊，我都腻了。”

“来吧，例行公事，就假装看看嘛。”

```java
public class InfinitiveDoWhileExample {
    public static void main(String[] args) {
        do {
            System.out.println("停不下来。。。。");
        } while (true);
    }
}
```

输出：

```
停不下来。。。。
停不下来。。。。
停不下来。。。。
停不下来。。。。
```

把 do-while 的条件设置为 true，并且循环体中没有 break 关键字的话，程序一旦运行起来，就根本停不下来了，除非强制停止。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/control/thirteen-11.png)

### 06、break

break 关键字通常用于中断循环或 switch 语句，它在指定条件下中断程序的当前流程。如果是内部循环，则仅中断内部循环。

可以将 break 关键字用于所有类型循环语句中，比如说 for 循环、while 循环，以及 do-while 循环。

来画个流程图感受一下：


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/control/thirteen-12.png)


用在 for 循环中的示例：

```java
for (int i = 1; i <= 10; i++) {
    if (i == 5) {
        break;
    }
    System.out.println(i);
}
```

用在嵌套 for 循环中的示例：

```java
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        if (i == 2 && j == 2) {
            break;
        }
        System.out.println(i + " " + j);
    }
}
```

用在 while 循环中的示例：

```java
int i = 1;
while (i <= 10) {
    if (i == 5) {
        i++;
        break;
    }
    System.out.println(i);
    i++;
}
```

用在 do-while 循环中的示例：

```java
int j = 1;
do {
    if (j == 5) { 
        j++;
        break;
    }
    System.out.println(j);
    j++;
} while (j <= 10);
```

用在 switch 语句中的示例：

```java
switch (age) {
        case 20 :
          System.out.println("上学");
          break;
        case 24 :
          System.out.println("苏州工作");
          break;
        case 30 :
          System.out.println("洛阳工作");
          break;
       default:
         System.out.println("未知");
         break; // 可省略
}
```

### 07、continue

当我们需要在 for 循环或者 （do）while 循环中立即跳转到下一个循环时，就可以使用 continue 关键字，通常用于跳过指定条件下的循环体，如果循环是嵌套的，仅跳过当前循环。

来个示例：

```java
public class ContinueDemo {
    public static void main(String[] args) {
        for (int i = 1; i <= 10; i++) {
            if (i == 5) {
                // 使用 continue 关键字
                continue;// 5 将会被跳过
            }
            System.out.println(i);
        }
    }
}
```

输出：

```
1
2
3
4
6
7
8
9
10
```

“二哥，5 真的被跳过了呀。”

“那必须滴。不然就是 bug。”

再来个循环嵌套的例子。

```java
public class ContinueInnerDemo {
    public static void main(String[] args) {
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 3; j++) {
                if (i == 2 && j == 2) {
                    //  当i=2，j=2时跳过
                    continue;
                }
                System.out.println(i + " " + j);
            }
        }
    }
}
```

打印出什么玩意呢？

```
1 1
1 2
1 3
2 1
2 3
3 1
3 2
3 3
```

“2 2” 没有输出，被跳过了。

再来看一下 while 循环时 continue 的使用示例：

```java
public class ContinueWhileDemo {
    public static void main(String[] args) {
        int i = 1;
        while (i <= 10) {
            if (i == 5) {
                i++;
                continue;
            }
            System.out.println(i);
            i++;
        }
    }
}
```

输出：

```
1
2
3
4
6
7
8
9
10
```

注意：如果把 if 条件中的“i++”省略掉的话，程序就会进入死循环，一直在 continue。

最后，再来看一下 do-while 循环时 continue 的使用示例：

```java
public class ContinueDoWhileDemo {
    public static void main(String[] args) {
        int i=1;
        do{
            if(i==5){
                i++;
                continue;
            }
            System.out.println(i);
            i++;
        }while(i<=10);
    }
}

```

输出：

```
1
2
3
4
6
7
8
9
10
```

注意：同样的，如果把 if 条件中的“i++”省略掉的话，程序就会进入死循环，一直在 continue。


---

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

## 3.6 Java运算符

“二哥，让我盲猜一下哈，运算符是不是指的就是加减乘除啊？”三妹的脸上泛着甜甜的笑容，我想她一定对提出的问题很有自信。

“是的，三妹。运算符在 Java 中占据着重要的位置，对程序的执行有着很大的帮助。除了常见的加减乘除，还有许多其他类型的运算符，来看下面这张思维导图。”

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/core-grammar/eleven-01.png)


### 01、算数运算符

算术运算符除了最常见的加减乘除，还有一个取余的运算符，用于得到除法运算后的余数，来串代码感受下。

```java
/**
 * 微信搜索「沉默王二」，回复 Java
 */
public class ArithmeticOperator {
    public static void main(String[] args) {
        int a = 10;
        int b = 5;

        System.out.println(a + b);//15
        System.out.println(a - b);//5
        System.out.println(a * b);//50
        System.out.println(a / b);//2
        System.out.println(a % b);//0

        b = 3;
        System.out.println(a + b);//13
        System.out.println(a - b);//7
        System.out.println(a * b);//30
        System.out.println(a / b);//3
        System.out.println(a % b);//1
    }
}
```

对于初学者来说，加法（+）、减法（-）、乘法（*）很好理解，但除法（/）和取余（%）会有一点点疑惑。在以往的认知里，10/3 是除不尽的，结果应该是 3.333333...，而不应该是 3。相应的，余数也不应该是 1。这是为什么呢？

因为数字在程序中可以分为两种，一种是整型，一种是浮点型（不清楚的同学可以回头看看[数据类型那篇](https://tobebetterjavaer.com/basic-grammar/basic-data-type.html)），整型和整型的运算结果就是整型，不会出现浮点型。否则，就会出现浮点型。

```java
/**
 * 微信搜索「沉默王二」，回复 Java
 */
public class ArithmeticOperator {
    public static void main(String[] args) {
        int a = 10;
        float c = 3.0f;
        double d = 3.0;
        System.out.println(a / c); // 3.3333333
        System.out.println(a / d); // 3.3333333333333335
        System.out.println(a % c); // 1.0
        System.out.println(a % d); // 1.0
    }
}
```

需要注意的是，当浮点数除以 0 的时候，结果为 Infinity 或者 NaN。

```
System.out.println(10.0 / 0.0); // Infinity
System.out.println(0.0 / 0.0); // NaN
```

Infinity 的中文意思是无穷大，NaN 的中文意思是这不是一个数字（Not a Number）。


当整数除以 0 的时候（`10 / 0`），会抛出异常：

```
Exception in thread "main" java.lang.ArithmeticException: / by zero
	at com.itwanger.eleven.ArithmeticOperator.main(ArithmeticOperator.java:32)
```

所以整数在进行除法运算时，需要先判断除数是否为 0，以免程序抛出异常。

算术运算符中还有两种特殊的运算符，自增运算符（++）和自减运算符（--），它们也叫做一元运算符，只有一个操作数。

```java
public class UnaryOperator1 {
    public static void main(String[] args) {
        int x = 10;
        System.out.println(x++);//10 (11)  
        System.out.println(++x);//12  
        System.out.println(x--);//12 (11)  
        System.out.println(--x);//10  
    }
}
```

一元运算符可以放在数字的前面或者后面，放在前面叫前自增（前自减），放在后面叫后自增（后自减）。

前自增和后自增是有区别的，拿 `int y = ++x` 这个表达式来说（x = 10），它可以拆分为 `x = x+1 = 11; y = x = 11`，所以表达式的结果为 `x = 11, y = 11`。拿 `int y = x++` 这个表达式来说（x = 10），它可以拆分为 `y = x = 10; x = x+1 = 11`，所以表达式的结果为 `x = 11, y = 10`。

```java
int x = 10;
int y = ++x;
System.out.println(y + " " + x);// 11 11

x = 10;
y = x++;
System.out.println(y + " " + x);// 10 11
```

对于前自减和后自减来说，同学们可以自己试一把。


### 02、关系运算符

关系运算符用来比较两个操作数，返回结果为 true 或者 false。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/core-grammar/eleven-02.png)

来看示例：

```java
/**
 * 微信搜索「沉默王二」，回复 Java
 */
public class RelationOperator {
    public static void main(String[] args) {
        int a = 10, b = 20;
        System.out.println(a == b); // false
        System.out.println(a != b); // true
        System.out.println(a > b); // false
        System.out.println(a < b); // true
        System.out.println(a >= b); // false
        System.out.println(a <= b); // true
    }
}
```

### 03、位运算符

在学习位运算符之前，需要先学习一下二进制，因为位运算符操作的不是整型数值（int、long、short、char、byte）本身，而是整型数值对应的二进制。

```java
/**
 * 微信搜索「沉默王二」，回复 Java
 */
public class BitOperator {
    public static void main(String[] args) {
        System.out.println(Integer.toBinaryString(60)); // 111100
        System.out.println(Integer.toBinaryString(13)); // 1101
    }
}
```

 从程序的输出结果可以看得出来，60 的二进制是 0011 1100（用 0 补到 8 位），13 的二进制是 0000 1101。

PS：现代的二进制记数系统由戈特弗里德·威廉·莱布尼茨于 1679 年设计。莱布尼茨是德意志哲学家、数学家，历史上少见的通才。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/core-grammar/eleven-03.png)

来看示例：

```java
/**
 * 微信搜索「沉默王二」，回复 Java
 */
public class BitOperator {
    public static void main(String[] args) {
        int a = 60, b = 13;
        System.out.println("a 的二进制：" + Integer.toBinaryString(a)); // 111100
        System.out.println("b 的二进制：" + Integer.toBinaryString(b)); // 1101

        int c = a & b;
        System.out.println("a & b：" + c + "，二进制是：" + Integer.toBinaryString(c));

        c = a | b;
        System.out.println("a | b：" + c + "，二进制是：" + Integer.toBinaryString(c));

        c = a ^ b;
        System.out.println("a ^ b：" + c + "，二进制是：" + Integer.toBinaryString(c));

        c = ~a;
        System.out.println("~a：" + c + "，二进制是：" + Integer.toBinaryString(c));

        c = a << 2;
        System.out.println("a << 2：" + c + "，二进制是：" + Integer.toBinaryString(c));

        c = a >> 2;
        System.out.println("a >> 2：" + c + "，二进制是：" + Integer.toBinaryString(c));

        c = a >>> 2;
        System.out.println("a >>> 2：" + c + "，二进制是：" + Integer.toBinaryString(c));
    }
}
```

对于初学者来说，位运算符无法从直观上去计算出结果，不像加减乘除那样。因为我们日常接触的都是十进制，位运算的时候需要先转成二进制，然后再计算出结果。

鉴于此，初学者在写代码的时候其实很少会用到位运算。对于编程高手来说，为了提高程序的性能，会在一些地方使用位运算。比如说，HashMap 在计算哈希值的时候：

```java
static final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}
```

如果对位运算一点都不懂的话，遇到这样的源码就很吃力。所以说，虽然位运算用的少，但还是要懂。

1）按位左移运算符：

```java
public class LeftShiftOperator {
    public static void main(String[] args) {
        System.out.println(10<<2);//10*2^2=10*4=40  
        System.out.println(10<<3);//10*2^3=10*8=80  
        System.out.println(20<<2);//20*2^2=20*4=80  
        System.out.println(15<<4);//15*2^4=15*16=240  
    }
}
```

`10<<2` 等于 10 乘以 2 的 2 次方；`10<<3` 等于 10 乘以 2 的 3 次方。

2）按位右移运算符：

```java
public class RightShiftOperator {
    public static void main(String[] args) {
        System.out.println(10>>2);//10/2^2=10/4=2
        System.out.println(20>>2);//20/2^2=20/4=5
        System.out.println(20>>3);//20/2^3=20/8=2
    }
}
```

`10>>2` 等于 10 除以 2 的 2 次方；`20>>2` 等于 20 除以 2 的 2 次方。

### 04、逻辑运算符

逻辑与运算符（&&）：多个条件中只要有一个为 false 结果就为 false。

逻辑或运算符（||）：多个条件只要有一个为 true 结果就为 true。

```java
public class LogicalOperator {
    public static void main(String[] args) {
        int a=10;
        int b=5;
        int c=20;
        System.out.println(a<b&&a<c);//false && true = false

        System.out.println(a>b||a<c);//true || true = true
    }
}
```

逻辑非运算符（!）：用来反转条件的结果，如果条件为 true，则逻辑非运算符将得到 false。

单逻辑与运算符（&）：很少用，因为不管第一个条件为 true 还是 false，依然会检查第二个。

单逻辑或运算符（|）：也会检查第二个条件。

也就是说，& 和 | 性能不如 && 和 ||，但用法一样：

```java
public class LogicalOperator1 {
    public static void main(String[] args) {
        int a=10;
        int b=5;
        int c=20;
        System.out.println(a<b&a<c);//false & true = false

        System.out.println(a>b|a<c);//true | true = true  
    }
}
```

### 05、赋值运算符

赋值操作符恐怕是 Java 中使用最频繁的操作符了，它就是把操作符右侧的值赋值给左侧的变量。来看示例：

```java
public class AssignmentOperator {
    public static void main(String[] args) {
        int a=10;
        int b=20;
        a+=4;//a=a+4 (a=10+4)  
        b-=4;//b=b-4 (b=20-4)  
        System.out.println(a);
        System.out.println(b);
    }
}
```

不过在进行数值的赋值时，需要小点心，比如说下面这种情况：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/core-grammar/eleven-04.png)

编译器之所以提示错误，是因为 = 右侧的算术表达式默认为 int 类型，左侧是 short 类型的时候需要进行强转。

```java
public class AssignmentOperator1 {
    public static void main(String[] args) {
        short a = 10;
        short b = 10;
//a+=b;//a=a+b internally so fine
        a = (short)(a + b);
        System.out.println(a);
    }
}
```

除此之外，还会有边界问题，比如说，两个非常大的 int 相乘，结果可能就超出了 int 的范围：

```java
/**
 * 微信搜索「沉默王二」，回复 Java
 */
public class BigIntMulti {
    public static void main(String[] args) {
        int a = Integer.MAX_VALUE;
        int b = 10000;
        int c = a * b;
        System.out.println(c); // -10000
    }
}
```

程序输出的结果为 -10000，这个答案很明显不是我们想要的结果，虽然可以通过右侧表达式强转 long 的方法解决：

```
/**
 * 微信搜索「沉默王二」，回复 Java
 */
public class BigIntMulti {
    public static void main(String[] args) {
        int a = Integer.MAX_VALUE;
        int b = 10000;
        long c = (long)a * b;
        System.out.println(c); // 21474836470000
    }
}
```

但尽量不要这样做，结果非常大的时候，尽量提前使用相应的类型进行赋值。

```java
long a = Integer.MAX_VALUE - 1;
long b = 10000;
long c = a * b;
System.out.println(c); // 21474836460000
```

### 06、三元运算符

三元运算符用于替代 if-else，可以使用一行代码完成条件判断的要求。来看示例：

```java
public class TernaryOperator {
    public static void main(String[] args) {
        int a=2;
        int b=5;
        int min=(a<b)?a:b;
        System.out.println(min);
    }
}
```

如果 ? 前面的条件为 true，则结果为 : 前的值，否则为 : 后的值。

“好了，三妹，关于 Java 运算符就先说这么多吧，你是不是已经清楚了？”转动了一下僵硬的脖子后，我对三妹说。

“差不多，二哥，我需要写点 demo 练习会。”


---

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

# 第四章：数组&字符串

## 4.1 Java数组

“二哥，我看你公众号的一篇文章里提到，[ArrayList](https://tobebetterjavaer.com/collection/arraylist.html) 的内部是用数组实现的，我就对数组非常感兴趣，想深入地了解一下，今天终于到这个环节了，好期待呀！”三妹的语气里显得很兴奋。

“的确是的，看 ArrayList 的源码就一清二楚了。”我一边说，一边打开 Intellij IDEA，并找到了 ArrayList 的源码。

```java
/**
 * The array buffer into which the elements of the ArrayList are stored.
 * The capacity of the ArrayList is the length of this array buffer. Any
 * empty ArrayList with elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA
 * will be expanded to DEFAULT_CAPACITY when the first element is added.
 */
transient Object[] elementData; // non-private to simplify nested class access

/**
 * The size of the ArrayList (the number of elements it contains).
 *
 * @serial
 */
private int size;
```

“瞧见没？`Object[] elementData` 就是数组。”我指着显示屏上这串代码继续说。

数组是一个对象，它包含了一组固定数量的元素，并且这些元素的类型是相同的。数组会按照索引的方式将元素放在指定的位置上，意味着我们可以通过索引来访问这些元素。在 Java 中，索引是从 0 开始的。

“哥，能说一下为什么索引从 0 开始吗？”三妹突然这个话题很感兴趣。

“哦，Java 是基于 C/C++ 语言实现的，而 C 语言的下标是从 0 开始的，所以 Java 就继承了这个良好的传统习惯。C语言有一个很重要概念，叫做指针，它实际上是一个偏移量，距离开始位置的偏移量，第一个元素就在开始的位置，它的偏移量就为 0，所以索引就为 0。”此刻，我很自信。

“此外，还有另外一种说法。早期的计算机资源比较匮乏，0 作为起始下标相比较于 1 作为起始下标，编译的效率更高。”

“哦。”三妹意味深长地点了点头。 

我们可以将数组理解为一个个整齐排列的单元格，每个单元格里面存放着一个元素。

数组元素的类型可以是基本数据类型（比如说 int、double），也可以是引用数据类型（比如说 String），包括自定义类型。

数组的声明方式分两种。

先来看第一种：

```java
int[] anArray;
```

再来看第二种：

```java
int anOtherArray[];
```

不同之处就在于中括号的位置，是跟在类型关键字的后面，还是跟在变量的名称的后面。前一种的使用频率更高一些，像 ArrayList 的源码中就用了第一种方式。

同样的，数组的初始化方式也有多种，最常见的是：

```java
int[] anArray = new int[10];
```

看到了没？上面这行代码中使用了 new 关键字，这就意味着数组的确是一个对象，只有对象的创建才会用到 new 关键字，[基本数据类型](https://tobebetterjavaer.com/basic-grammar/basic-data-type.html)是不用的。然后，我们需要在方括号中指定数组的长度。

这时候，数组中的每个元素都会被初始化为默认值，int 类型的就为 0，Object 类型的就为 null。 不同数据类型的默认值不同，可以参照[之前的文章](https://tobebetterjavaer.com/basic-grammar/basic-data-type.html)。

另外，还可以使用大括号的方式，直接初始化数组中的元素：

```java
int anOtherArray[] = new int[] {1, 2, 3, 4, 5};
```

这时候，数组的元素分别是 1、2、3、4、5，索引依次是 0、1、2、3、4，长度是 5。

“哥，怎么访问数组呢？”三妹及时地插话到。

前面提到过，可以通过索引来访问数组的元素，就像下面这样：

```java
anArray[0] = 10;
```

变量名，加上中括号，加上元素的索引，就可以访问到数组，通过“=”操作符可以对元素进行赋值。

如果索引的值超出了数组的界限，就会抛出 `ArrayIndexOutOfBoundException`。

既然数组的索引是从 0 开始，那就是到数组的 `length - 1` 结束，不要使用超出这个范围内的索引访问数组，就不会抛出数组越界的异常了。 

当数组的元素非常多的时候，逐个访问数组就太辛苦了，所以需要通过遍历的方式。

第一种，使用 for 循环：

```java
int anOtherArray[] = new int[] {1, 2, 3, 4, 5};
for (int i = 0; i < anOtherArray.length; i++) {
    System.out.println(anOtherArray[i]);
}
```

通过 length 属性获取到数组的长度，然后从 0 开始遍历，就得到了数组的所有元素。

第二种，使用 for-each 循环：

```java
for (int element : anOtherArray) {
    System.out.println(element);
}
```

如果不需要关心索引的话（意味着不需要修改数组的某个元素），使用 for-each 遍历更简洁一些。当然，也可以使用 while 和 do-while 循环。

在 Java 中，可变参数用于将任意数量的参数传递给方法，来看 `varargsMethod()` 方法：

```java
void varargsMethod(String... varargs) {}
```

该方法可以接收任意数量的字符串参数，可以是 0 个或者 N 个，本质上，可变参数就是通过数组实现的。为了证明这一点，我们可以看一下反编译一后的字节码：

```java
public class VarargsDemo
{

    public VarargsDemo()
    {
    }

    transient void varargsMethod(String as[])
    {
    }
}
```

所以，我们其实可以直接将数组作为参数传递给该方法：

```java
VarargsDemo demo = new VarargsDemo();
String[] anArray = new String[] {"沉默王二", "一枚有趣的程序员"};
demo.varargsMethod(anArray);
```

也可以直接传递多个字符串，通过逗号隔开的方式：

```java
demo.varargsMethod("沉默王二", "一枚有趣的程序员");
```

在 Java 中，数组与 List 关系非常密切。List 封装了很多常用的方法，方便我们对集合进行一些操作，而如果直接操作数组的话，有很多不便，因为数组本身没有提供这些封装好的操作，所以有时候我们需要把数组转成 List。

“怎么转呢？”三妹问到。

最原始的方式，就是通过遍历数组的方式，一个个将数组添加到 List 中。

```java
int[] anArray = new int[] {1, 2, 3, 4, 5};

List<Integer> aList = new ArrayList<>();
for (int element : anArray) {
    aList.add(element);
}
```

更优雅的方式是通过 Arrays 类的 `asList()` 方法：

```java
List<Integer> aList = Arrays.asList(anArray);
```

但需要注意的是，该方法返回的 ArrayList 并不是 `java.util.ArrayList`，它其实是  Arrays 类的一个内部类：

```java
private static class ArrayList<E> extends AbstractList<E>
        implements RandomAccess, java.io.Serializable{}
```

如果需要添加元素或者删除元素的话，需要把它转成 `java.util.ArrayList`。

```java
new ArrayList<>(Arrays.asList(anArray));
```

Java 8 新增了 Stream 流的概念，这就意味着我们也可以将数组转成 Stream 进行操作。

```java
String[] anArray = new String[] {"沉默王二", "一枚有趣的程序员", "好好珍重他"};
Stream<String> aStream = Arrays.stream(anArray);
```

如果想对数组进行排序的话，可以使用 Arrays 类提供的 `sort()` 方法。

- 基本数据类型按照升序排列
- 实现了 Comparable 接口的对象按照 `compareTo()` 的排序

来看第一个例子：

```java
int[] anArray = new int[] {5, 2, 1, 4, 8};
Arrays.sort(anArray);
```

排序后的结果如下所示：

```java
[1, 2, 4, 5, 8]
```

来看第二个例子：

```java
String[] yetAnotherArray = new String[] {"A", "E", "Z", "B", "C"};
Arrays.sort(yetAnotherArray, 1, 3,
                Comparator.comparing(String::toString).reversed());
```

只对 1-3 位置上的元素进行反序，所以结果如下所示：

```
[A, Z, E, B, C]
```

有时候，我们需要从数组中查找某个具体的元素，最直接的方式就是通过遍历的方式：

```java
int[] anArray = new int[] {5, 2, 1, 4, 8};
for (int i = 0; i < anArray.length; i++) {
    if (anArray[i] == 4) {
        System.out.println("找到了 " + i);
        break;
    }
}
```

上例中从数组中查询元素 4，找到后通过 break 关键字退出循环。

如果数组提前进行了排序，就可以使用二分查找法，这样效率就会更高一些。`Arrays.binarySearch()` 方法可供我们使用，它需要传递一个数组，和要查找的元素。

```java
int[] anArray = new int[] {1, 2, 3, 4, 5};
int index = Arrays.binarySearch(anArray, 4);
```

“除了一维数组，还有二维数组，三妹你可以去研究下，比如说用二维数组打印一下杨辉三角。”说完，我就去阳台上休息了，留三妹在那里学习，不能打扰她。

----

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)