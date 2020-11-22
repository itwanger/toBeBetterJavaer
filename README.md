👍推荐 [在线阅读](https://itwanger.gitee.io/javazero)  (Github 访问速度比较慢可能会导致部分图片无法刷新出来) 

👍推荐 [百度云下载链接](https://pan.baidu.com/s/1qwomiFHW6vZdVo26heMctg)  密码:1thn  (一个月更新一次，每次更新 10 个小节) 

# 前言

同学们好啊，我是沉默王二，欢迎大家来到《零基础学 Java》专栏。

[我妹今年上大学了](https://mp.weixin.qq.com/s/bsu9uH8VKh5Vtue-9SafwQ)，学的计算机编程，立志像我一样做一名正儿八经的 Java 程序员。我期初是反抗的，因为程序员这行业容易掉头发，作为一名需要美貌的女生，长发飘飘是必须的啊。但与其反抗，不如做点更积极的事情，比如说写点有趣的文章，教我妹更快地掌握 Java 这门编程语言，于是就有了这个专栏。

>**强烈推荐**：我在 GitHub 上发现了一个宝藏项目，里面收录了 500+ 本电子书，包含 Java、Spring、MySQL、设计模式、计算机网络、计算机操作系统、数据结构与算法、面试题等方面的电子书，需要的小伙伴可以通过下面的链接按需获取。
>
>GitHub：[https://github.com/itwanger/JavaBooks](https://github.com/itwanger/JavaBooks)
>
>码云：[https://gitee.com/itwanger/JavaBooks](https://gitee.com/itwanger/JavaBooks)

有同学可能会说“妹妹大一就开始学习 Java 了，有点厉害啊。”我只能说，要对妹妹负责，就必须得趁早，因为生意经有这么一句话：

>人无我有，人有我好，人好我早，人多我早。

这句话用在生意上合适，用在学习上也是再合适不过了。当别人都不懂一门新技术的时候，你懂，那么恭喜你，你已经遥遥领先了；当别人也懂了，你比他精通，那么你就是牛逼；当别人也精通了，你比他精通的早，还是有优势，对吧？

强调一下，《零基础学 Java》面向的是零基础的 Java 爱好者，我希望能帮助同学们轻松迈进编程世界的大门，为后续的深入学习打下坚实的基础。

![](http://www.itwanger.com/assets/images/tech-sister.png)

**基础知识：**

- [什么是 Java](docs/what-is-java.md)
- [Java 发展简史](docs/java-history.md)
- [Java 为什么如此流行](docs/why-java-popular.md)
- [第一个 Java 程序：Hello World](docs/hello-world.md)
- [Java程序在编译期发生了什么](docs/what-happen-when-javac.md)
- [JDK 与 JRE](docs/jdk-jre.md)
- [Java 虚拟机](docs/jvm.md)
- [Java 变量](docs/java-var.md)
- [Java 数据类型](docs/java-data-type.md)
- [Unicode](docs/unicode.md)
- [Java 运算符](docs/java-operator.md)
- [Java 的那些关键字](docs/java-keywords.md)
- [流程控制语句](docs/java-control.md)
- [Java 注释](docs/javadoc.md)

**对象和类：**

- [命名约定](docs/java-naming.md)

---------------

# 基础知识

## 一、Java 是什么

“二哥，到底什么是 Java？给我说说呗。”

“三妹啊，这就直奔主题了啊，先去给哥买包烟吧，哥先考验考验你的诚心。”

（五分钟过后）

“三妹啊，你怎么还不去？”

“二哥，掏钱啊。”

（真实亲妹子啊，买包烟还得我掏钱，关键是还得给跑腿费。十分钟后，三妹从楼下小卖部买了一包熊猫回来了，我用 Zippo 火机点了一支——这火机是 21 岁生日的时候初恋女友送我的，质量确实不错，现在还在用。）

“三妹啊，听我慢慢来给你解释。”

Java 是一门计算机编程语言，高级、健壮、面向对象，并且非常安全。它由 Sun 公司在 1995 年开发，主力开发叫 James Gosling，被称为 Java 之父，就是下图这位，头秃的厉害。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/one-01.png)

“三妹啊，你要不要再考虑考虑？做程序员不容易啊”

“二哥，你咋没有秃呢？是因为你不够厉害吗？”

（这孩子，嘴咋这么损呢？）


Java 在叫“Java”之前，其实叫 Oak（橡树的意思，我感觉好像比 Java 好听一些）。怎么想到呢？James Gosling 坐在办公室，望向窗外，视野里出现了一颗橡树。不过，遗憾的是，Oak 已经被 另外一家公司注册了，因此 1995 年 5 月 23 日，Oak 语言改名为 Java。

Java 起初并不是 James Gosling 的首选，也不是命名团队的首选。团队其他人员更青睐 Silk（丝绸），但 Gosling 不喜欢，他本人喜欢的是 Lyric（抒情诗），但没通过律师这一关。最后，排在第四位的“Java”脱颖而出。是不是像极了婴儿没生下来之前，家人就着急着起名的那种感觉。

James Gosling 回忆说，“Java”是一个叫 Mark Opperman 的人提议的，他是在一家咖啡店得到灵感的，“Java”是印度尼西亚爪哇岛的英文名，因生产咖啡而闻名。

使用十六进制编辑器打开由 Java 源代码编译出的二进制文件（.class 文件），就可以看得到，最前面的 8 个字符是 CA FE BA BE（定义文件类型的魔数），即词组“CAFE BABE”（咖啡屋宝贝）。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/one-02.png)

“二哥，能给我展示一段 Java 代码吗？我想感受一下。”

“三妹啊，马上就来。”

（我噼里啪啦一阵在键盘上一阵狂按）

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

1）桌面应用程序；
2）Web 应用程序；
3）企业应用程序，体现了 Java 的安全性、负载均衡和集群的优势；
4）移动端应用程序，主要就是安卓；
5）嵌入式系统；
6）机器人技术；
7）游戏。

时至今日，Java 技术体系已经吸引了 600 多万软件开发者，是全球最大的软件开发团队。Java 能够获得如此广泛的认可，除了它是一门结构严谨、面向对象的编程语言之外，还有很多其他不可忽视的优点：

- 摆脱了硬件平台的束缚，实现了“一次编写，处处运行”的理念；
- 内存管理相对安全，避免了绝大部分内存泄露和指针越界的问题；
- 实现了热点代码检测和运行时编译，使得 Java 应用能随着运行时间的增长而获得更高的性能；
- 有一套完善的应用程序接口，还有无数来自商业机构和开源社区的第三方类库。

这一切的一切，都让软件开发的效率大大的提高。所以，学习 Java 还是很有“钱”“秃”的。

## 二、Java 发展简史

20 世纪 90 年代，单片式计算机系统诞生。单片式计算机系统不仅廉价（之前的计算机非常庞大，并且昂贵），而且功能强大，可以大幅度提升消费性电子产品的智能化程度。

Sun 公司为了抢占市场先机，在 1991 年成立了一个由詹姆斯·高斯林（James Gosling）领导的，名为“Green”的项目组，目的是开发一种能够在各种消费性电子产品上运行的程序架构。

项目组首先考虑的是采用 C++ 来编写程序，但 C++ 过于复杂和庞大，再加上消费电子产品所采用的嵌入式处理器芯片的种类繁杂，需要让编写的程序能够跨平台运行并不容易——C++ 在跨平台方面做得并不好。

思前想后，项目组最后决定：在 C++ 的基础上创建一种新的编程语言，既能够剔除 C++ 复杂的指针和内存管理，还能够兼容各种设备。这语言最初的名字叫做 **Greentalk**，文件扩展名为 `.gt`。这个名字叫的比较随意，就因为项目组叫 Green，没什么特殊的寓意。

**Oak** 是“Java”的第二个名字，这次就有点意义了。Oak（橡树）是力量的象征，被美国、法国、德国等许多欧美国家选为国树。橡树长下面这样。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/two-01.png)

1992 年，Oak 的雏形有了，但项目组在向硬件生产商进行商演的时候，并没有获得认可，于是 Oak 就被搁置一旁了。

1994 年，项目组发现 Java 更适合进行 Internet 编程。随后，项目组用 Oak 语言研发了一种能将小程序嵌入到网页中执行的技术——Applet。Applet 不仅能嵌入网页，还能够随同网页在网络上进行传输。

不得不感慨一下，技术的更新迭代是真的快，Applet 拯救了 Oak，并使其蜕变成顶天立地的 Java，但很早之前就被无情地拍死在了沙滩上。是不是很残酷？

1995 年，Oak 被重新命名为“Java”，因为 Oak 被别的公司注册过了。新的名字最好能够表达出技术的本质：dynamic（动态的）、revolutionary（革命性的）、Silk（像丝绸一样柔软的）、Cool（炫酷的）等等。另外，名字一定要容易拼写，念起来也比较有趣。

选来选去，项目组最后选择了“Java”，中文叫“爪哇”。细心的小伙伴可能会发现，Java 这个单词里有一个敏感词，所以有段时间微信（文章专辑名这块）为了禁敏感词，竟然把 Java 都禁了，我当时就只能用爪哇来代替 Java，手动狗头。

“Java”是印度尼西亚爪哇岛的英文名，因生产咖啡而闻名，所以，小伙伴也看到了，Java 这个单词经常和一杯冒着热气的咖啡一起出现。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/two-02.png)

同年，Sun 公司在 SunWorld 大会上正式发布了 Java 1.0 版本，第一次提出了“Write Once, Run anywhere”的口号。《时代》杂志将 Java 评为 1995 年十大最佳产品之一。

1996 年 1 月 23 日，JDK 1.0 发布，Java 语言有了第一个正式版本的运行环境。JDK 1.0 是一个纯解释执行的 Java 虚拟机，代表技术有：Java 虚拟机、AWT（图形化界面）、Applet。

4 月，十个主要的操作系统和计算机供应商宣称将在产品中嵌入 Java 技术。9 月，已有大约 8.3 万网页应用采用了 Java 来制作。5 月底，第一届 JavaOne 大会在旧金山举行，从此，JavaOne 成为全世界数百万 Java 语言开发者的技术盛会。

 1997 年 2 月 19 日，JDK 1.1 发布，代表技术有：JAR 文件格式、JDBC、JavaBeans、RMI（远程方法调用）。

1998 年 12 月 4 日，JDK 1.2 发布，这是一个里程碑式的版本。Sun 在这个版本中把 Java 拆分为三个方向：面向桌面开发的 J2SE、面向企业开发的 J2EE，面向移动开发的 J2ME。代表技术有：EJB、Swing。

2000 年 5 月 8 日，JDK 1.3 发布，对 Java 2D 做了大幅修改。

2002 年 2 月 13 日，JDK 1.4 发布，这是 Java 真正走向成熟的一个版本，IBM、富士通等著名公司都有参与。代表技术有：正则表达式、NIO。

2004 年 9 月 30 日，JDK 5 发布，注意 Sun 把“1.x”的命名方式抛弃了。JDK 5 在 Java 语法的易用性上做出了非常大的改进，比如说：自动装箱、泛型、动态注解、枚举、可变参数、foreach 循环。

2006 年 12 月 11 日，JDK 6 发布，J2SE 变成了 Java SE 6，J2EE 变成了 Java EE 6，J2ME 变成了 Java ME 6。JDK 6 恐怕是 Java 历史上使用寿命最长的一个版本了。主要的原因有：代码复杂性的增加、世界经济危机、Oracle 对 Sun 的收购。

JDK 6 的最后一个升级补丁为 Java SE 6 Update 211， 于 2018 年 10 月 18 日发布——12 年的跨度啊！

2009 年 2 月 19 日，JDK 7 发布，但功能是阉割。很多翘首以盼的功能都没有完成，比如说 Lambda  表达式。主要是因为 Sun 公司在商业上陷入了泥沼，已经无力推动 JDK 7 的研发工作。

2009 年 4 月 20 日，Oracle 以 74 亿美元的价格收购了市值曾超过 2000 亿美元的 Sun 公司——太阳终究还是落山了。对于 Java 语言这个孩子来说，可以说是好事，也可以说是坏事。好事是 Oracle 有钱，能够注入资金推动 Java 的发展；坏处就是 Oracle 是后爸，对 Java 肯定没有 Sun 那么亲，走的是极具商业化的道路。

 2014 年 3 月 18 日，JDK 8 终于来了，步伐是那么蹒跚，但终究还是来了。带着最强有力的武器——Lambda 表达式而来。虽然 JDK 15 已经发布了，但“新版任你发，我用 Java 8”的梗至今还流传着。

2017 年 9 月 21 日，JDK 9 发布。从此以后，JDK 更新版本的速度令开发者应接不暇，半年一个版本，虽然 Oracle 的目的是好的，为了避免因功能增加而引发的跳票风险，但不得不承认，版本更新的节奏实在是有点过于频繁。

这就导致一个问题，好不容易更新一个版本，用了六个月后，Oracle 不维护了。针对这个问题，Oracle 给出的解决方案挺奇葩的，每六个 JDK 大版本才会被长期支持（Long Term Support，LTS）。

JDK 8 是 LTS 版，2018 年 9 月 25 日发布的 JDK 11 是 LTS 版， 2018 年 3 月 20 日发布的 JDK 10 就可以一笔带过了。按照这个节奏算下去的话，下一个 LTS 版就是 2021 年发布的 JDK 17 了。

JDK 12、JDK 13、JDK 14、JDK 15、JDK 16 都是过渡产品，就好像是试验品一样，不太受开发者待见。

Java 发展到今天已经 20 多年了，作为一个编程语言确实不简单，Java 代表的面向对象思想确实给工程领域带来了革命性的变化，关键是 Java 一直在拥抱变化。

大数据方面，有 Apache Kafka、Apache Samza、Apache Storm、Apache Spark、Apache Flink，除了 Spark 是基于 JVM 的函数语言 Scala 编写的，其余都是 Java 编写的。

Java 在云时代面临着以 Go 语言为主的容器（Docker 等技术）生态圈的挑战，但是，Java 的大型分布式系统越来越多，Java 在云计算与分布式系统中还是扮演着主要角色，并且形成了一个大型的生态圈。

虽然 Java 和 C++，C 一样，都“老”了，被其他语言不断地挑战，但只有强者才有机会接受挑战，对吧？我相信，Java 的未来依然很光明。

## 三、Java 为什么如此流行？

尽管 Java 已经 25 岁了，但仍然“宝刀未老”。在 Stack Overflow 2019 年流行编程语言调查报告中，Java 位居第 5 位，有 41% 的受调开发者认为 Java 仍然是一门受欢迎的编程语言。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/three-01.png)

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

“当然。”我斩钉截铁地回答到。

**大数据领域：**

与 Python 一样，Java 在大数据领域占据着主导地位，很多用于处理大规模数据的框架都是基于 Java 开发的。

- Apache Hadoop，用于在分布式环境中处理大规模数据集。Hadoop 采用了主副架构模式，其中主节点负责控制整个分布式计算栈。Hadoop 在需要处理和分析大规模数据的公司当中很流行。

- Apache Spark，大型的 ETL（数据仓库技术）、预测分析和报表程序经常使用到 Spark。

- Apache Mahout，用于机器学习，比如分类、聚类和推荐。

- JFreechart，用于可视化数据，可以用它制作各种图表，比如饼图、柱状图、线图、散点图、盒状图、直方图等等。

- Deeplearning4j，用于构建各种类型的神经网络，可以与 Spark 集成，运行在 GPU（图形处理器）上。

- Apache Storm，用于处理实时数据流，一个 Storm 节点可以在秒级处理数百万个作业。

**物联网（IoT）领域：**

![](http://www.itwanger.com/assets/images/techSisterLearnJava/three-02.png)

Oracle 表示，灵活性和流行度是 IoT 程序员选择 Java 的主要原因。Java 提供了大量的 API 库，可以很容易应用到嵌入式应用程序中。相比其他编程语言，比如 C 语言，Java 在切换平台时更加顺畅，不容易出错。

**金融服务领域：**

- 聊天机器人，由于可移植性、可维护性、可视化等诸多方面的因素，Java 成了开发聊天机器人最好的工具。

- 欺诈检测和管理，银行和金融公司使用 AI（人工智能）工具来进行金融欺诈和信用卡欺诈检测，而 Java 常用来开发这些 AI 工具。

- 交易系统，Java 虚拟机提供的动态运行时编译优化在很多情况下比编译型语言（如 C++）具有更好的性能，让交易系统运行得更顺畅。

- 移动钱包，基于 AI 和 Java 算法开发的移动钱包，可以帮助用户在花钱时做出更智能的决策。

**Web 领域：**

Java 技术对 Web 领域的发展注入了强大的动力，主流的 Java Web 开发框架有很多：

-  Spring 框架，一个轻量级的控制反转（IoC）和面向切面（AOP）的容器框架，渗透了 Java EE 技术的方方面面，绝大部分 Java 应用都可以从 Spring 框架中受益。

-  Spring MVC 框架，是一种基于 Java 实现的 MVC（Model-View-Controller）设计模式的请求驱动类型的轻量级 Web 框架。

-  MyBatis 框架，一个优秀的数据持久层框架，可在实体类和 SQL 语句之间建立映射关系，是一种半自动化的 ORM（Object Relational Mapping，对象关系映射）实现。

-  JavaServer Faces 框架，由 Oracle 开发，能够将表示层与应用程序代码轻松连接，它提供了一个 API 集，用于表示和管理 UI 组件。

总之，Oracle 宣称，Java 正运行在 97% 的企业计算机上——有点厉害的样子。

## 四、第一个 Java 程序：Hello World

### 01、安装 JDK 

如果电脑上没有安装 JDK 的话，就无法编译和运行 Java 代码，因此我们要先下载 JDK。虽然 JDK 已经更新到了 Java 15，但上一个长期支持（Long Term Support，LTS）的版本还是 JDK 11，它的官网下载地址为：

>https://www.oracle.com/java/technologies/javase-jdk11-downloads.html

PS：对 JDK 版本不解的小伙伴可以回看《[Java 发展简史](https://mp.weixin.qq.com/s/Ctouw652iC0qtrmjen9aEw)》那篇专栏。

JDK 是 `Java Development ToolKit` 的简称，也就是 Java 开发工具包，它是整个 Java 的核心，包括 Java 运行时环境（Java Runtime Envirnment，简称 JRE），Java 程序编译命令（javac）、Java 程序运行命令（java）、Java 字节码反编译命令（javap），以及 Java 基础类库（比如 rt.jar——像常见的包 io、lang、math、net、nio、util 等都在它里面）等等。

Windows 安装 JDK 和配置环境变量的步骤，可以参照我博客上的一篇文章：

>http://www.itwanger.com/java/2019/10/19/java-jdk-install-windows.html

### 02、安装 IntelliJ IDEA

IntelliJ IDEA 简称 IDEA，是业界公认为最好的 Java 集成开发工具，尤其是在代码自动提示、代码重构、代码版本管理、单元测试、代码分析等方面有着亮眼的发挥。

IDEA 产于捷克，开发人员以严谨著称的东欧程序员为主，分为社区版和付费版两个版本。我们在学习阶段，社区版就足够用了。

回想起我最初学 Java 的时候，老师要求我们在记事本上敲代码，在命令行中编译和执行 Java 代码，搞得全班三分之二的同学都做好了放弃学习 Java 的打算。

鉴于此，我强烈推荐大家使用集成开发工具，比如说 IntelliJ IDEA 来学习。

我最初学习 Java 的时候，老师都要求我们在记事本上开发，导致我当时觉得写 Java 代码好难，差点还没入门就放弃了。不过，三妹你别担心，我推荐使用 IDEA 进行学习和开发。

IDEA 的安装步骤，可以参照我博客上的一篇文章：

>[http://www.itwanger.com/java/2019/11/25/java-idea-community.html](http://www.itwanger.com/java/2019/11/25/java-idea-community.html)



### 03、编写 Hello World 程序

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

![](http://www.itwanger.com/assets/images/techSisterLearnJava/four-01.png)

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

“三妹，怎么样？这下没有困扰你的关键字了吧？后面我们更细致地分析这些关键字，所以担心是大可不必的。”

“没有了，二哥，好期待后面的内容哦！”

## 五、Java 程序在编译期发生了什么

“二哥，看了上一篇 [Hello World](https://mp.weixin.qq.com/s/191I_2CVOxVuyfLVtb4jhg) 的程序后，我很好奇，它是怎么在 Run 面板里打印出‘三妹，少看手机少打游戏，好好学，美美哒’呢？”三妹咪了一口麦香可可奶茶后对我说。

“三妹，我们通常把 Java 分为编译期和运行时，弄清楚这两个阶段就知道原因了。由于运行时涉及到的内容比较多，这篇文章我们先来说说编译期，等学习了 Java 虚拟机的一些知识后再说道说道运行时。”

贴一下 HelloWorld 这段代码：

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

点击 IDEA 工具栏中的锤子按钮（Build Project，编译整个项目），如下图所示。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/five-01.png)


这时候，就可以在 src 的同级目录 target 下找到一个名为 HelloWorld.class 的文件。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/five-02.png)


如果找不到的话，在目录上右键选择「Reload from Disk，从磁盘上重新加载」，如下图所示：

![](http://www.itwanger.com/assets/images/techSisterLearnJava/five-03.png)


可以双击打开它。

```java
//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.itwanger.five;

public class HelloWorld {
    public HelloWorld() {
    }

    public static void main(String[] args) {
        System.out.println("三妹，少看手机少打游戏，好好学，美美哒。");
    }
}
```

IDEA 默认会用 Fernflower 反编译工具将字节码文件（后缀为 .class 的文件，也就是 Java 源代码编译后的文件）反编译为我们可以看得懂的 Java 源代码。但实际上，字节码文件并不是这样的，而是：

```
// class version 58.0 (58)
// access flags 0x21
public class com/itwanger/five/HelloWorld {

  // compiled from: HelloWorld.java

  // access flags 0x1
  public <init>()V
   L0
    LINENUMBER 6 L0
    ALOAD 0
    INVOKESPECIAL java/lang/Object.<init> ()V
    RETURN
   L1
    LOCALVARIABLE this Lcom/itwanger/five/HelloWorld; L0 L1 0
    MAXSTACK = 1
    MAXLOCALS = 1

  // access flags 0x9
  public static main([Ljava/lang/String;)V
   L0
    LINENUMBER 8 L0
    GETSTATIC java/lang/System.out : Ljava/io/PrintStream;
    LDC "\u4e09\u59b9\uff0c\u5c11\u770b\u624b\u673a\u5c11\u6253\u6e38\u620f\uff0c\u597d\u597d\u5b66\uff0c\u7f8e\u7f8e\u54d2\u3002"
    INVOKEVIRTUAL java/io/PrintStream.println (Ljava/lang/String;)V
   L1
    LINENUMBER 9 L1
    RETURN
   L2
    LOCALVARIABLE args [Ljava/lang/String; L0 L2 0
    MAXSTACK = 2
    MAXLOCALS = 1
}
```

是不是就有点懵逼了？新手看到这个很容易头大，不过不要担心，后面我再和大家一块深入研究一下，这里就是感受一下字节码的魅力。

那这个字节码文件是怎么看到的呢？可以通过 IDEA 菜单栏中的「View」→「Show Bytecode」查看，如下图所示。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/five-04.png)

PS：字节码并不是机器码，操作系统无法直接识别，需要在操作系统上安装不同版本的 Java 虚拟机（JVM）来识别。通常情况下，我们只需要安装不同版本的 JDK（Java Development Kit，Java 开发工具包）就行了，它里面包含了 JRE（Java Runtime Environment，Java 运行时环境），而 JRE 又包含了 JVM。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/five-05.png)

Windows、Linux、MacOS 等操作系统都有相应的 JDK，只要安装好了 JDK 就有了 Java 语言的运行时环境，就可以把一份字节码文件在不同的平台上运行了。可以在 [Oracle 官网](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)上下载不同版本的 JDK。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/five-06.png)

PPS：为什么要查看字节码呢？查看字节码文件更容易让我们搞懂 Java 代码背后的原理，比如搞懂 Java 中的各种语法糖的本质。

相比于 IDEA 自带的「Show Bytecode」功能，我更推荐 `jclasslib` 这款插件，可以在插件市场中安装（我已经安装过了）。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/five-07.png)

安装完成之后，点击 View -> Show Bytecode With jclasslib 即可通过 jclasslib 查看字节码文件了（点击之前，光标要停留在对应的类文件上），如下图所示。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/five-08.png)

使用 jclasslib 不仅可以直观地查看类对应的字节码文件，还可以查看类的基本信息、常量池、接口、字段、方法等信息，如下图所示。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/five-09.png)



也就是说，在编译阶段，Java 会将 Java 源代码文件编译为字节码文件。在这个阶段，编译器会进行一些检查工作，比如说，某个关键字是不是写错了，语法上是不是符合预期了，不能有很明显的错误，否则带到运行时再检查出来就会比较麻烦了。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/five-10.png)

## 六、JDK 与 JRE 之间的区别是什么？

“二哥，之前的文章里提到 JDK 与 JRE，说实在的，这两个概念把我搞得晕乎乎的，你能再给我普及一下吗？”三妹咪了一口麦香可可奶茶后对我说。

“三妹，不要担心，二哥这篇文章一定会让你把它们搞得一清二楚。确实有不少初学的小伙伴对这两个概念很困惑，我当年也困惑了很久。”说完最后这句话，我脸上忍不住泛起了一阵羞涩的红晕。

### 01、JDK

JDK 是 Java Development Kit 的首字母缩写，是提供给 Java 程序员的开发工具包，换句话说，没有 JDK，Java 程序员就无法使用 Java 语言编写 Java 程序。也就是说，JDK 是用于开发 Java 程序的最小环境。

想要成为一名 Java 程序员，首先就需要在电脑上安装 JDK。当然了，新版的 Intellij IDEA（公认最好用的集成开发环境）已经支持直接下载 JDK 了。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/six-01.png)

并且支持下载不同版本的 JDK，除了 Oracle 的 OpenJDK，还有社区维护版 AdoptOpenJDK，里面包含了目前使用范围最广的 HotSpot 虚拟机。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/six-02.png)

如果下载比较慢的话，可以直接在 AdoptOpenJDK 官网上下载。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/six-03.png)

如果还是比较慢的话，通过 Oracle 官网下载吧！

>https://www.oracle.com/java/technologies/javase-jdk11-downloads.html


JDK 安装成功后，就可以编写 Java 代码了，小伙伴们可以参照上一篇文章《[Hello World](https://mp.weixin.qq.com/s/GYDFndO0Q1Nqzcc_Te61gw)》。

JDK 包含了 JRE，同时还包含了编译 Java 源码的编译器 javac，以及其他的一些重要工具：

- keytool：用于操作 keystore 密钥；
- javap：class 类文件的最基础的反编译器；
- jstack：用于打印 Java 线程栈踪迹的工具；
- jconsole：用于监视 Java 程序的工具；
- jhat：用于 Java 堆分析的工具
- jar：用于打包 Java 程序的工具；
- javadoc：用于生成 Java 文档的工具；

### 02、JRE

JRE 是 Java Runtime Environment 的首字母缩写，是提供给 Java 程序运行的最小环境，换句话说，没有 JRE，Java 程序就无法运行。

Java 程序运行的正式环境一般会选择 Linux 服务器，因为更安全、更高效、更稳定。我们只需要在 Linux 服务器上安装 JRE 就可以运行 Java 程序，而不必安装 JDK，因为我们不需要在服务器上编译和调试 Java 源代码。

刚好我有一台闲置的阿里云服务器，这里就给小伙伴们演示一下 JRE 的安装过程。

第一步：使用以下命令列出服务器上可以安装的 Java 环境：

>yum list java*

可以看到有这么一些（只列出 Java 11 的部分——最近一个 LTS 版本）：

![](http://www.itwanger.com/assets/images/techSisterLearnJava/six-04.png)

其中 JRE 为 java-11-openjdk.x86_64，JDK 为 java-11-openjdk-devel.x86_64。

第二步，使用以下命令安装 JRE：

>yum install java-11-openjdk.x86_64

第三步，使用以下命令测试是否安装成功：

>java -version

如果出现以下结果，则表明安装成功：

![](http://www.itwanger.com/assets/images/techSisterLearnJava/six-05.png)

由于 JRE 中不包含 javac，所以 `javac -version` 的结果如下所示：

![](http://www.itwanger.com/assets/images/techSisterLearnJava/six-06.png)

那既然服务器上的 JRE 环境已经 OK 了，那我们就把之前的“Hello World”程序打成 jar 上传过去，让它跑起来。

第一步，Maven clean（对项目清理）：

![](http://www.itwanger.com/assets/images/techSisterLearnJava/six-07.png)

第二步，Maven package（对项目打包）：

![](http://www.itwanger.com/assets/images/techSisterLearnJava/six-08.png)

可以在 Run 面板中看到以下信息：

![](http://www.itwanger.com/assets/images/techSisterLearnJava/six-09.png)

说明项目打包成功了。

第三步，使用 FileZilla 工具将 jar 包上传到服务器指定目录。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/six-10.png)

第四步，使用 iTerm2 工具连接服务器。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/six-11.png)

第五步，执行以下命令：

>java -cp TechSister-1.0-SNAPSHOT.jar com.itwanger.five.HelloWorld

可以看到以下结果：

![](http://www.itwanger.com/assets/images/techSisterLearnJava/six-12.png)

“搞定了，三妹，今天我们就学到这吧。”转动了一下僵硬的脖子后，我对三妹说，“开发环境需要安装 JDK，因为既需要编写源代码，还需要打包和测试；生产环境只需要安装 JRE，因为只需要运行编译打包好的 jar 包即可。”

“好的，二哥，能把你的服务器账号密码给我一下吗，我想上去测试一把。”三妹似乎对未来充满了希望，这正是我想看到的。

“没问题，随便倒腾。”

## 七、每个程序员都应该了解的 Java 虚拟机



“二哥，之前的文章里提到 JVM，说实在的， 我还不知道它到底是干嘛的，你能给我普及一下吗？”三妹咪了一口麦香可可奶茶后对我说。

“三妹，不要担心，这篇文章来带你认识一下什么是 JVM，这也是 Java 中非常重要的一块知识，每个程序员都应该了解的。”说完最后这句话，我脸上忍不住泛起了一阵羞涩的红晕。

看过《[Java 发展简史](https://mp.weixin.qq.com/s/Ctouw652iC0qtrmjen9aEw)》的小伙伴应该知道，Sun 在 1991 年成立了一个由詹姆斯·高斯林（James Gosling）领导的，名为“Green”的项目组，目的是开发一种能够在各种消费性电子产品上运行的程序架构。

一开始，项目组打算使用 C++，但 C++ 无法达到跨平台的要求，比如在 Windows 系统下编译的 Hello.exe 无法直接拿到 Linux 环境下执行。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/seven-01.png)

在当时，C++ 已经非常流行了，但无法跨平台，只能忍痛割爱了。

怎么办呢？

三妹不知道有没有听过直译器（解释器）这玩意？（估计你没听过）就是每跑一行代码就生成机器码，然后执行，比如说 Python 和 Ruby 用的就是直译器。在每个操作系统上装一个直译器就好了，跨平台的目的就达到了。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/seven-02.png)

但直译器有个缺点，就是没法像编译器那样对一些热点代码进行优化，从而让机器码跑得更快一些。

怎么办呢？

来个结合体呗，编译器和直译器一块上！

![](http://www.itwanger.com/assets/images/techSisterLearnJava/seven-03.png)

编译器负责把 Java 源代码编译成字节码（不清楚的小伙伴可以点击链接查看[上一节](https://mp.weixin.qq.com/s/GYDFndO0Q1Nqzcc_Te61gw)），Java 虚拟机（Java Virtual Machine，简称 JVM） 负责把字节码转换成机器码。转换的时候，可以做一些压缩或者优化，这样的机器码跑起来就快多了。

不仅跨平台的目的达到了，而且性能得到了优化。

三妹是不是想问，“为什么 Java 虚拟机会叫 Java 虚拟机呢？”

虚拟机，顾名思义，就是虚拟的机器（多苍白的解释），反正就是看不见摸不着的机器，把它想象成一个会执行字节码的怪兽吧。

记得上大学那会，由于没有 Linux 环境，但又需要在上面玩一些命令，于是就在 Windows 上装 Linux 的虚拟机，这个 JVM 就类似这种东西。

 说白了，就是我们编写 Java 代码，编译 Java 代码，目的不是让它在 Linux、Windows 或者 MacOS 上跑，而是在 JVM 上跑。

说到这，三妹是不是想问，“都有哪些 Java 虚拟机呢？”来看下面这张思维导图：

![](http://www.itwanger.com/assets/images/techSisterLearnJava/seven-04.png)

除了我们经常看到，经常听到的 Hotspot VM，还有很多，下面我来简单介绍一下。

- Sun Classic：世界上第一款商用 Java 虚拟机，但执行效率低下，导致 Java 程序的性能和 C/C++ 存在很大差距，因此给后来者留下了“Java 语言很慢”的刻板印象。

- Exact VM：为了提升 Classic 的效率，Sun 的虚拟机团队曾在 Solaris（Sun 研发的一款类似 Unix 的操作系统）上发布过这款虚拟机，它的执行系统里包含有热点探测、即时编译等，但不是很成熟。

Sun Classic 在 JDK 1.4 的时候被彻底抛弃，而 Exact VM 被抛弃得更早，取代它的正是 HotSpot VM——时也命也。

- HotSpot VM：OracleJDK（商用）和 OpenJDK（开源）的默认虚拟机，也是目前使用最广泛的 Java 虚拟机。

HotSpot 的技术优势就在于热点代码探测技术（名字就从这来）和准确式内存管理技术，但其实这两个技术在 Exact VM 中都有体现，因此你看起个好的名字多重要（开玩笑了，这就是命）。

热点代码探测，指的是，通过执行计数器找出最具有编译价值的代码，然后通知即时编译器以方法为单位进行编译，解释器就可以不再逐行的将字节码翻译成机器码，而是将一整个方法的所有字节码翻译成机器码再执行。

这样的话，效率就提高了很多，对吧？

- Mobile VM：Java 在移动手机端（被 Android 和 IOS 二分天下）的发展并没有那么成功，因此 Mobile VM 的声望值比较低。

- Embedded VM：嵌入式设备上的虚拟机。

- BEA JRockit：曾经号称是“世界上最快的 Java 虚拟机”，后来被 Oracle 收购后就没有声音了。

- IBM J9 VM：提起 IBM，基本上所有程序员都知道了，也是个巨头，所以他家的虚拟机也很强，在职责分离和模块化上做得比 HotSpot 更好。目前已经开源给 Eclipse 基金会。

- BEA Liquid VM：是 BEA 公司开发的可以直接运行在自家系统上的虚拟机，可以越过操作系统直接和硬件打交道，因此可以更大程度上的发挥硬件的能力。不过核心用的还是 JRockit，所以伴随着 JRockit 的消失，Liquid VM 也退出历史舞台了。

- Azul VM：是 Azul 公司在 HotSpot 基础上进行大量改进后的，可以运行在 Azul 公司专有硬件上的虚拟机。2010 年起，Azul 公司的重心从硬件转移到软件上，并发布了 Zing 虚拟机，性能方面很强大。

- Apache Harmony 和 Google Android Dalvik VM 并不是 严格意义上的 Java 虚拟机，但对 Java 虚拟机的发展起到了很大的刺激作用。但它们终究没有熬过时间。

- Microsoft JVM：在早期的 Java Applets 年代，微软为了在 IE 中支持 Applets 开发了自己的 Java 虚拟机。你敢相信？Microsoft JVM 只有 Windows 版本，它与 JVM 实现的“一次编译，到处运行”的理念完全沾不上边。

关键是，1997 年 10 月，Sun 公司因为这事把微软告了，最后微软赔给了 Sun 公司 2000 万美金，并且终止了在 Java 虚拟机方面的发展。如果，我是说如果，如果微软保持着对 Java 的热情，后面还有 .Net 什么事？

![](http://www.itwanger.com/assets/images/techSisterLearnJava/seven-05.png)

解释了这么多 Java 虚拟机后，三妹是不是想问，“Java 虚拟机长什么样子呢？”

Java 虚拟机虽然是虚拟的，但它的内部是可以划分为：

- 类加载器（Class Loader）
- 运行时数据区（Runtime Data Areas）
- 执行引擎（Excution Engine）

![](http://www.itwanger.com/assets/images/techSisterLearnJava/seven-06.png)


**1）类加载器**


类加载器是 Java 虚拟机的一个子系统，用于加载类文件。每当我们运行一个 Java 程序，它都会由类加载器首先加载。

一般来说，Java 程序员并不需要直接同类加载器进行交互。JVM 默认的行为就已经足够满足大多数情况的需求了。不过，如果遇到了需要和类加载器进行交互的情况，而对类加载器的机制又不是很了解的话，就不得不花大量的时间去调试 
 `ClassNotFoundException` 和 `NoClassDefFoundError` 等异常。

对于任意一个类，都需要由它的类加载器和这个类本身一同确定其在 JVM 中的唯一性。也就是说，如果两个类的加载器不同，即使两个类来源于同一个字节码文件，那这两个类就必定不相等（比如两个类的 Class 对象不 `equals`）。

来通过一段简单的代码了解下。

```java
/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class Test {
    public static void main(String[] args) {
        ClassLoader loader = Test.class.getClassLoader();
        while (loader != null) {
            System.out.println(loader);
            loader = loader.getParent();
        }
    }
}
```

每个 Java 类都维护着一个指向定义它的类加载器的引用，通过 `类名.class.getClassLoader()` 可以获取到此引用；然后通过 `loader.getParent()` 可以获取类加载器的上层类加载器。

上面这段代码的输出结果如下：

```
jdk.internal.loader.ClassLoaders$AppClassLoader@512ddf17
jdk.internal.loader.ClassLoaders$PlatformClassLoader@2d209079
```

第一行输出为 Test 的类加载器，即应用类加载器，它是 `jdk.internal.loader.ClassLoaders$AppClassLoader` 类的实例；第二行输出为平台类加载器，是 `jdk.internal.loader.ClassLoaders$PlatformClassLoader` 类的实例。那启动类加载器呢？

按理说，扩展类加载器的上层类加载器是启动类加载器，但启动类加载器是虚拟机的内置类加载器，通常表示为 null。

**2）运行时数据区**

来看下面这张图：


![](http://www.itwanger.com/assets/images/techSisterLearnJava/seven-07.png)


- PC寄存器（PC Register），也叫程序计数器（Program Counter Register），是一块较小的内存空间，它的作用可以看做是当前线程所执行的字节码的信号指示器。

- JVM 栈（Java Virtual Machine Stack），与 PC 寄存器一样，JVM 栈也是线程私有的。每一个 JVM 线程都有自己的 JVM 栈，这个栈与线程同时创建，它的生命周期与线程相同。

- 本地方法栈（Native Method Stack），JVM 可能会使用到传统的栈来支持 Native 方法（使用 Java 语言以外的其它语言［C语言］编写的方法）的执行，这个栈就是本地方法栈。

- 堆（Heap），在 JVM 中，堆是可供各条线程共享的运行时内存区域，也是供所有类实例和数据对象分配内存的区域。

- 方法区（Method area），在 JVM 中，被加载类型的信息都保存在方法区中。包括类型信息（Type Information）和方法列表（Method Tables）。方法区是所有线程共享的，所以访问方法区信息的方法必须是线程安全的。

- 运行时常量池（Runtime Constant Pool），运行时常量池是每一个类或接口的常量池在运行时的表现形式，它包括了编译器可知的数值字面量，以及运行期解析后才能获得的方法或字段的引用。简而言之，当一个方法或者变量被引用时，JVM 通过运行时常量区来查找方法或者变量在内存里的实际地址。


**3）执行引擎**

执行引擎包含了：

- 解释器：读取字节码流，然后执行指令。因为它是一行一行地解释和执行指令，所以它可以很快地解释字节码，但是执行起来会比较慢（毕竟要一行执行完再执行下一行）。

- 即时（Just-In-Time，JIT）编译器：即时编译器用来弥补解释器的缺点，提高性能。执行引擎首先按照解释执行的方式来执行，然后在合适的时候，即时编译器把整段字节码编译成本地代码。然后，执行引擎就没有必要再去解释执行方法了，它可以直接通过本地代码去执行。执行本地代码比一条一条进行解释执行的速度快很多。编译后的代码可以执行的很快，因为本地代码是保存在缓存里的。

“三妹，关于 Java 虚拟机，今天我们就学到这吧，后面再展开讲，怎么样？”转动了一下僵硬的脖子后，我对三妹说，“Java 虚拟机是一块很大很深的内容，如果一上来学太多的话，我怕难倒你。”

“好的，二哥，我也觉得今天的知识量够了，我要好好消化几天。我会加油的！”三妹似乎对未来充满了希望，这正是我想看到的。

## 八、初识 Java 变量

“二哥，听说 Java 变量在以后的日子里经常用，能不能提前给我透露透露？”三妹咪了一口麦香可可奶茶后对我说。

“三妹啊，搬个凳子坐我旁边，听二哥来给你慢慢说啊。”

Java 变量就好像一个容器，可以保存程序在运行过程中的值，它在声明的时候会定义对应的数据类型（Java 分为两种数据类型：基本数据类型和引用数据类型）。变量按照作用域的范围又可分为三种类型：局部变量，成员变量和静态变量。

比如说，`int data = 88;`，其中 data 就是一个变量，它的值为 88，类型为整形（int）。


### 01、局部变量

在方法体内声明的变量被称为局部变量，该变量只能在该方法内使用，类中的其他方法并不知道该变量。来看下面这个示例：

```java
/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class LocalVariable {
    public static void main(String[] args) {
        int a = 10;
        int b = 10;
        int c = a + b;
        System.out.println(c);
    }
}
```

其中 a、b、c 就是局部变量，它们只能在当前这个 main 方法中使用。

声明局部变量时的注意事项：

- 局部变量声明在方法、构造方法或者语句块中。
- 局部变量在方法、构造方法、或者语句块被执行的时候创建，当它们执行完成后，将会被销毁。
- 访问修饰符不能用于局部变量。
- 局部变量只在声明它的方法、构造方法或者语句块中可见。
- 局部变量是在栈上分配的。
- 局部变量没有默认值，所以局部变量被声明后，必须经过初始化，才可以使用。

### 02、成员变量

在类内部但在方法体外声明的变量称为成员变量，或者实例变量。之所以称为实例变量，是因为该变量只能通过类的实例（对象）来访问。来看下面这个示例：

```java
/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class InstanceVariable {
    int data = 88;
    public static void main(String[] args) {
        InstanceVariable iv = new InstanceVariable();
        System.out.println(iv.data); // 88
    }
}
```

其中 iv 是一个变量，它是一个引用类型的变量。`new` 关键字可以创建一个类的实例（也称为对象），通过“=”操作符赋值给 iv 这个变量，iv 就成了这个对象的引用，通过 `iv.data` 就可以访问成员变量了。

声明成员变量时的注意事项：

- 成员变量声明在一个类中，但在方法、构造方法和语句块之外。
- 当一个对象被实例化之后，每个成员变量的值就跟着确定。
- 成员变量在对象创建的时候创建，在对象被销毁的时候销毁。
- 成员变量的值应该至少被一个方法、构造方法或者语句块引用，使得外部能够通过这些方式获取实例变量信息。
- 成员变量可以声明在使用前或者使用后。
- 访问修饰符可以修饰成员变量。
- 成员变量对于类中的方法、构造方法或者语句块是可见的。一般情况下应该把成员变量设为私有。通过使用访问修饰符可以使成员变量对子类可见；成员变量具有默认值。数值型变量的默认值是 0，布尔型变量的默认值是 false，引用类型变量的默认值是 null。变量的值可以在声明时指定，也可以在构造方法中指定。

### 03、静态变量

通过 static 关键字声明的变量被称为静态变量（类变量），它可以直接被类访问，来看下面这个示例：

```java
/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class StaticVariable {
    static int data = 99;
    public static void main(String[] args) {
        System.out.println(StaticVariable.data); // 99
    }
}
```

其中 data 就是静态变量，通过`类名.静态变量`就可以访问了，不需要创建类的实例。

声明静态变量时的注意事项：

- 静态变量在类中以 static 关键字声明，但必须在方法构造方法和语句块之外。
- 无论一个类创建了多少个对象，类只拥有静态变量的一份拷贝。
- 静态变量除了被声明为常量外很少使用。
- 静态变量储存在静态存储区。
- 静态变量在程序开始时创建，在程序结束时销毁。
- 与成员变量具有相似的可见性。但为了对类的使用者可见，大多数静态变量声明为 public 类型。
- 静态变量的默认值和实例变量相似。
- 静态变量还可以在静态语句块中初始化。

### 04、常量

在 Java 中，有些数据的值是不会发生改变的，这些数据被叫做常量——使用 final 关键字修饰的成员变量。常量的值一旦给定就无法改变！

常量在程序运行过程中主要有 2 个作用：

- 代表常数，便于修改（例如：圆周率的值，`final double PI = 3.14`）

- 增强程序的可读性（例如：常量 UP、DOWN 用来代表上和下，`final int UP = 0`）

Java 要求常量名必须大写。来看下面这个示例：

```java
/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class FinalVariable {
    final String CHEN = "沉";
    static final String MO = "默";
    public static void main(String[] args) {
        FinalVariable fv = new FinalVariable();
        System.out.println(fv.CHEN);
        System.out.println(MO);

    }
}
```

“好了，三妹，关于 Java 变量就先说这么多吧，你是不是已经清楚了？”转动了一下僵硬的脖子后，我对三妹说。

“是啊，二哥，我想以后还会再见到它们吧？”

“那见的次数可就多了，就好像你每天眨眼的次数一样多。”

## 九、Java 中的数据类型

“二哥，[上一节](https://mp.weixin.qq.com/s/IgBpLGn0L1HZymgI4hWGVA)提到了 Java 变量的数据类型，是不是指定了类型就限定了变量的取值范围啊？”三妹吸了一口麦香可可奶茶后对我说。

“三妹，你不得了啊，长进很大嘛，都学会推理判断了。Java 是一种静态类型的编程语言，这意味着所有变量必须在使用之前声明好，也就是必须得先指定变量的类型和名称。”

Java 中的数据类型可分为 2 种：

1）**基本数据类型**。

基本数据类型是 Java 语言操作数据的基础，包括 boolean、char、byte、short、int、long、float 和 double，共 8 种。

2）**引用数据类型**。

除了基本数据类型以外的类型，都是所谓的引用类型。常见的有数组（对，没错，数组是引用类型）、class（也就是类），以及接口（指向的是实现接口的类的对象）。

来个思维导图，感受下。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/nine-01.png)

通过[上一节](https://mp.weixin.qq.com/s/IgBpLGn0L1HZymgI4hWGVA)的学习，我们知道变量可以分为局部变量、成员变量、静态变量。

当变量是局部变量的时候，必须得先初始化，否则编译器不允许你使用它。拿 int 来举例吧，看下图。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/nine-02.png)

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

那三妹可能要问，“比特和字节是什么鬼？”

比特币听说过吧？字节跳动听说过吧？这些名字当然不是乱起的，确实和比特、字节有关系。

**1）bit（比特）**

比特作为信息技术的最基本存储单位，非常小，但大名鼎鼎的比特币就是以此命名的，它的简写为小写字母“b”。

大家都知道，计算机是以二进制存储数据的，二进制的一位，就是 1 比特，也就是说，比特要么为 0 要么为 1。

**2）Byte（字节）**

通常来说，一个英文字符是一个字节，一个中文字符是两个字节。字节与比特的换算关系是：1 字节 = 8 比特。

在往上的单位就是 KB，并不是 1000 字节，因为计算机只认识二进制，因此是 2 的 10 次方，也就是 1024 个字节。

（终于知道 1024 和程序员的关系了吧？狗头保命）

![](http://www.itwanger.com/assets/images/techSisterLearnJava/nine-03.png)

接下来，我们再来详细地了解一下 8 种基本数据类型。

### 01、布尔

布尔（boolean）仅用于存储两个值：true 和 false，也就是真和假，通常用于条件的判断。代码示例：

```java
boolean flag = true;
```


### 02、byte

byte 的取值范围在 -128 和 127 之间，包含 127。最小值为 -128，最大值为 127，默认值为 0。

在网络传输的过程中，为了节省空间，常用字节来作为数据的传输方式。代码示例：


```java
byte a = 10;
byte b = -10;
```




### 03、short

short 的取值范围在 -32,768 和 32,767 之间，包含 32,767。最小值为 -32,768，最大值为 32,767，默认值为 0。代码示例：

```java
short s = 10000;
short r = -5000;
```



### 04、int

int 的取值范围在 -2,147,483,648（-2 ^ 31）和 2,147,483,647（2 ^ 31 -1）（含）之间，默认值为 0。如果没有特殊需求，整形数据就用 int。代码示例：

```java
int a = 100000;
int b = -200000;
```

### 05、long

long 的取值范围在 -9,223,372,036,854,775,808(-2^63) 和 9,223,372,036,854,775,807(2^63 -1)（含）之间，默认值为 0。如果 int 存储不下，就用 long，整形数据就用 int。代码示例：

```java
long a = 100000L; 
long b = -200000L;
```

为了和 int 作区分，long 型变量在声明的时候，末尾要带上大写的“L”。不用小写的“l”，是因为小写的“l”容易和数字“1”混淆。

### 06、float

float 是单精度的浮点数，遵循 IEEE 754（二进制浮点数算术标准），取值范围是无限的，默认值为 0.0f。float 不适合用于精确的数值，比如说货币。代码示例：

```java
float f1 = 234.5f;
```

为了和 double 作区分，float 型变量在声明的时候，末尾要带上小写的“f”。不需要使用大写的“F”，是因为小写的“f”很容易辨别。


### 07、double

double 是双精度的浮点数，遵循 IEEE 754（二进制浮点数算术标准），取值范围也是无限的，默认值为 0.0。double 同样不适合用于精确的数值，比如说货币。代码示例：

```java
double d1 = 12.3
```

那精确的数值用什么表示呢？最好使用 BigDecimal，它可以表示一个任意大小且精度完全准确的浮点数。针对货币类型的数值，也可以先乘以 100 转成整形进行处理。

Tips：单精度是这样的格式，1 位符号，8 位指数，23 位小数，有效位数为 7 位。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/nine-04.png)

双精度是这样的格式，1 位符号，11 位指数，52 为小数，有效位数为 16 位。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/nine-05.png)

取值范围取决于指数位，计算精度取决于小数位（尾数）。小数位越多，则能表示的数越大，那么计算精度则越高。

>一个数由若干位数字组成，其中影响测量精度的数字称作有效数字，也称有效数位。有效数字指科学计算中用以表示一个浮点数精度的那些数字。一般地，指一个用小数形式表示的浮点数中，从第一个非零的数字算起的所有数字。如 1.24 和 0.00124 的有效数字都有 3 位。

### 08、char

char 可以表示一个 16 位的 Unicode 字符，其值范围在 '\u0000'（0）和 '\uffff'（65,535）（包含）之间。代码示例：

```java
char letterA = 'A'; // 用英文的单引号包裹住。
```

那三妹可能要问，“char 既然只有一个字符，为什么占 2 个字节呢？”

“主要是因为 Java 使用的是 Unicode 字符集而不是 ASCII 字符集。”

这又是为什么呢？我们留到下一节再讲。

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

null 在 Java 中是一个很神奇的存在，在你以后的程序生涯中，见它的次数不会少，尤其是伴随着令人烦恼的“[空指针异常](https://mp.weixin.qq.com/s/PBqR_uj6dd4xKEX8SUWIYQ)”，也就是所谓的 `NullPointerException`。

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

![](http://www.itwanger.com/assets/images/techSisterLearnJava/nine-06.png)

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

![](http://www.itwanger.com/assets/images/techSisterLearnJava/nine-07.png)


只能 new 一个实现它的类的对象——那自然接口也是引用数据类型了。

来看一下基本数据类型和引用数据类型之间最大的差别。

基本数据类型：

1、变量名指向具体的数值。
2、基本数据类型存储在栈上。

引用数据类型：

1、变量名指向的是存储对象的内存地址，在栈上。
2、内存地址指向的对象存储在堆上。

看到这，三妹是不是又要问，“堆是什么，栈又是什么？”

堆是堆（heap），栈是栈（stack），如果看到“堆栈”的话，请不要怀疑自己，那是翻译的错，堆栈也是栈，反正我很不喜欢“堆栈”这种叫法，容易让新人掉坑里。

堆是在程序运行时在内存中申请的空间（可理解为动态的过程）；切记，不是在编译时；因此，Java 中的对象就放在这里，这样做的好处就是：

>当需要一个对象时，只需要通过 new 关键字写一行代码即可，当执行这行代码时，会自动在内存的“堆”区分配空间——这样就很灵活。

栈，能够和处理器（CPU，也就是脑子）直接关联，因此访问速度更快。既然访问速度快，要好好利用啊！Java 就把对象的引用放在栈里。为什么呢？因为引用的使用频率高吗？

不是的，因为 Java 在编译程序时，必须明确的知道存储在栈里的东西的生命周期，否则就没法释放旧的内存来开辟新的内存空间存放引用——空间就那么大，前浪要把后浪拍死在沙滩上啊。

这么说就理解了吧？

“好了，三妹，关于 Java  中的数据类型就先说这么多吧，你是不是已经清楚了？”转动了一下僵硬的脖子后，我对三妹说。

## 十、不可不知的 Unicode

“二哥，[上一篇](https://mp.weixin.qq.com/s/twim3w_dp5ctCigjLGIbFw)文章中提到了 Unicode，说 Java 中的 
 char 类型之所以占 2 个字节，是因为 Java 使用的是 Unicode 字符集而不是 ASCII 字符集，我有点迷，想了解一下，能细致给我说说吗？”

“当然没问题啊，三妹。”

**1）ASCII**

对于计算机来说，只认 0 和 1，所有的信息最终都是一个二进制数。一个二进制数要么是 0，要么是 1，所以 8 个二进制数放在一起（一个字节），就会组合出 256 种状态，也就是 2 的 8 次方（`2^8`），从 00000000 到 11111111。

ASCII 码由电报码发展而来，第一版标准发布于 1963 年，最后一次更新则是在1986 年，至今为止共定义了 128 个字符。其中 33 个字符无法显示在一般的设备上，需要用特殊的设备才能显示。

ASCII 码的局限在于只能显示 26 个基本拉丁字母、阿拉伯数字和英式标点符号，因此只能用于显示现代美国英语，对于其他一些语言则无能无力，比如在法语中，字母上方有注音符号，它就无法用 ASCII 码表示。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/ten-01.png)

PS：拉丁字母（也称为罗马字母）是多数欧洲语言采用的字母系统，是世界上最通行的字母文字系统，是罗马文明的成果之一。

虽然名称上叫作拉丁字母，但拉丁文中并没有用 J、U 和 W 这三个字母。

在我们的印象中，可能说拉丁字母多少有些陌生，说英语字母可能就有直观的印象了。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/ten-02.png)

PPS：阿拉伯数字，我们都很熟悉了。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/ten-03.png)

但是，阿拉伯数字并非起源于阿拉伯，而是起源于古印度。学过历史的我们应该有一些印象，阿拉伯分布于西亚和北非，以阿拉伯语为主要语言，以伊斯兰教为主要信仰。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/ten-04.png)

处在这样的地理位置，做起东亚和欧洲的一些生意就很有优势，于是阿拉伯数字就由阿拉伯人传到了欧洲，因此得名。

PPPS：英式标点符号，也叫英文标点符号，和中文标点符号很相近。标点符号是辅助文字记录语言的符号，是书面语的组成部分，用来表示停顿、加强语气等。

英文标点符号在 16 世纪时，分为朗诵学派和句法学派，主要由古典时期的希腊文和拉丁文演变而来，在 17 世纪后进入稳定阶段。俄文的标点符号依据希腊文而来，到了 18 世纪后也采用了英文标点符号。

在很多人的印象中，古文是没有标点符号的，但管锡华博士研究指出，中国早在先秦时代就有标点符号了，后来融合了一些英文标点符号后，逐渐形成了现在的中文标点符号。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/ten-05.png)


**2）Unicode**

这个世界上，除了英语，还有法语、葡萄牙语、西班牙语、德语、俄语、阿拉伯语、韩语、日语等等等等。ASCII 码用来表示英语是绰绰有余的，但其他这些语言就没办法了。

像我们的母语，博大精深，汉字的数量很多很多，东汉的《说文解字》收字 9353 个，清朝《康熙字典》收字 47035 个，当代的《汉语大字典》收字 60370 个。1994 年中华书局、中国友谊出版公司出版的《中华字海》收字 85568 个。

PS：常用字大概 2500 个，次常用字 1000 个。

一个字节只能表示 256 种符号，所以如果拿 ASCII 码来表示汉字的话，是远远不够用的，那就必须要用更多的字节。简体中文常见的编码方式是 GB2312，使用两个字节表示一个汉字，理论上最多可以表示 256 x 256 = 65536 个符号。

要知道，世界上存在着多种编码方式，同一个二进制数字可以被解释成不同的符号。因此，要想打开一个文本文件，就必须知道它的编码方式，否则用错误的编码方式解读，就会出现乱码。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/ten-06.png)

PPS：这“锟斤拷”价格挺公道的啊！！！（逃

如果有一种编码，将世界上所有的符号都纳入其中。每一个符号都给予一个独一无二的编码，那么乱码问题就会彻底消失。

这个艰巨的任务有谁来完成呢？**Unicode**，中文译作万国码、国际码、统一码、单一码，就像它的名字都表示的，这是一种所有符号的编码。

Unicode 至今仍在不断增修，每个新版本都会加入更多新的字符。目前最新的版本为 2020 年 3 月公布的 13.0，收录了 13 万个字符。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/ten-07.png)

Unicode 是一个很大的集合，现在的规模可以容纳 100 多万个符号。每个符号的编码都不一样，比如，`U+0639`表示阿拉伯字母 `Ain`，`U+0041` 表示英语的大写字母 `A`，`U+4E25` 表示汉字`严`。

具体的符号对应表，可以查询 [unicode.org](http://www.unicode.org/)，或者专门的[汉字对应表](http://www.chi2ko.com/tool/CJK.htm)。

曾有人这样说：

>Unicode 支持的字符上限是 65536 个，Unicode 字符必须占两个字节。

但这是一种误解，记住，Unicode 只是一个用来映射字符和数字的标准。它对支持字符的数量没有限制，也不要求字符必须占两个、三个或者其它任意数量的字节，所以它可以无穷大。

Unicode 虽然统一了全世界字符的编码，但没有规定如何存储。如果统一规定的话，每个符号就要用 3 个或 4 个字节表示，因为 2 个字节只能表示 65536 个，根本表示不全。

那怎么办呢？

UTF（Unicode Transformation Formats，Unicode 的编码方式）来了！最常见的就是 UTF-8 和 UTF-16。

在 UTF-8 中，0-127 号的字符用 1 个字节来表示，使用和 ASCII 相同的编码。只有 128 号及以上的字符才用 2 个、3 个或者 4 个字节来表示。

如果只有一个字节，那么最高的比特位为 0；如果有多个字节，那么第一个字节从最高位开始，连续有几个比特位的值为 1，就使用几个字节编码，剩下的字节均以 10 开头。

具体的表现形式为：

0xxxxxxx：一个字节；
110xxxxx 10xxxxxx：两个字节编码形式（开始两个 1）；
1110xxxx 10xxxxxx 10xxxxxx：三字节编码形式（开始三个 1）；
11110xxx 10xxxxxx 10xxxxxx 10xxxxxx：四字节编码形式（开始四个 1）。

也就是说，UTF-8 是一种可变长度的编码方式——这是它的优势也是劣势。

怎么讲呢？优势就是它包罗万象，劣势就是浪费空间。举例来说吧，UTF-8 采用了 3 个字节（256*256*256=16777216）来编码常用的汉字，但常用的汉字没有这么多，这对于计算机来说，就是一种严重的资源浪费。

基于这样的考虑，中国国家标准总局于 1980 年发布了 GB 2312 编码，即中华人民共和国国家标准简体中文字符集。GB 2312 标准共收录 6763 个汉字（2 个字节就够用了），其中一级汉字 3755 个，二级汉字 3008 个；同时收录了包括拉丁字母、希腊字母、日文平假名及片假名字母、俄语西里尔字母在内的 682 个字符。

GB 2312 的出现，基本满足了汉字的计算机处理需求。对于人名、古汉语等方面出现的罕用字和繁体字，GB 2312 不能处理，就有了 GBK（K 为“扩展”的汉语拼音（kuòzhǎn）第一个声母）。

来看一段代码：

```java
public class Demo {
    public static void main(String[] args) {
        String wanger = "沉默王二";
        byte[] bytes = wanger.getBytes(Charset.forName("GBK"));
        String result = new String(bytes, Charset.forName("UTF-8"));
        System.out.println(result);
    }
}
```

先用 GBK 编码，再用 UTF-8 解码，程序会输出什么呢？

```
��Ĭ����
```

嘿嘿，乱码来了！在 Unicode 中，� 是一个特殊的符号，它用来表示无法显示，它的十六进制是 `0xEF 0xBF 0xBD`。那么两个 �� 就是 `0xEF 0xBF 0xBD 0xEF 0xBF 0xBD`，如果用 GBK 进行解码的话，就是大名鼎鼎的“**锟斤拷**”。

可以通过代码来验证一下：

```java
// 输出 efbfbdefbfbd
System.out.println(HexUtil.encodeHex("��", Charset.forName("UTF-8")));
// 借助 hutool 转成二进制
byte[] testBytes = HexUtil.decodeHex("efbfbdefbfbd");
// 使用 GBK 解码
String testResult = new String(testBytes, Charset.forName("GBK"));
// 输出锟斤拷
System.out.println(testResult);
```

PPPS：hutool 的使用方法可以参照我的另外一篇[文章](https://mp.weixin.qq.com/s/hso-Hm5NuFStMu3m0iz_0w)。

所以，以后再见到**锟斤拷**，第一时间想到 UTF-8 和 GBK 的转换问题准没错。

UTF-16 使用 2 个或者 4 个字节来存储字符。

- 对于 Unicode 编号范围在 0 ~ FFFF 之间的字符，UTF-16 使用两个字节存储。

- 对于 Unicode 编号范围在 10000 ~ 10FFFF 之间的字符，UTF-16 使用四个字节存储，具体来说就是：将字符编号的所有比特位分成两部分，较高的一些比特位用一个值介于 D800~DBFF 之间的双字节存储，较低的一些比特位（剩下的比特位）用一个值介于 DC00~DFFF 之间的双字节存储。

**3）char**

搞清楚了 Unicode 之后，再回头来看 char 为什么是两个字节的问题，就很容易搞明白了。

在 Unicode 的设计之初，人们认为两个字节足以对世界上各种语言的所有字符进行编码，在 1991 年发布的 Unicode 1.0 中，仅用了 65536 个代码值中不到一半的部分。

所以，Java 决定采用 16 位的 Unicode 字符集（[诞生于 90 年代](https://mp.weixin.qq.com/s/Ctouw652iC0qtrmjen9aEw)）。也就是说，当时的 char 类型可以表示任意一个 Unicode 字符。

但是，不可避免的事情发生了，Unicode 收录的字符越来越多，超过了 65536 个（2 个字节的最大表示范围）。超过的部分怎么办呢？只能用两个 char 来表示了。

这个 `𐐷` 字符很特殊，Unicode 编码是 `U+10437`，它就无法使用一个 char 来表示，当你尝试用 char 来表示时，它会被 IDEA 转成 UTF-16 十六进制字符代码 `\uD801\uDC37`（与此同时，编译器会提醒你最好把它声明成 String 类型）。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/ten-08.png)

也就是说，在 Java 中，char 会占用两个字节，超出 char 的承受范围（'\u0000'（0）和 '\uffff'（65,535））的字符，都将无法表示。



“好了，三妹，关于 Unicode 就先说这么多吧，你是不是已经清楚了？”转动了一下僵硬的脖子后，我对三妹说。

## 十一、Java 运算符

“二哥，让我盲猜一下哈，运算符是不是指的就是加减乘除啊？”三妹的脸上泛着甜甜的笑容，我想她一定对提出的问题很有自信。

“是的，三妹。运算符在 Java 中占据着重要的位置，对程序的执行有着很大的帮助。除了常见的加减乘除，还有许多其他类型的运算符，来看下面这张思维导图。”

![](http://www.itwanger.com/assets/images/techSisterLearnJava/eleven-01.png)


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

因为数字在程序中可以分为两种，一种是整形，一种是浮点型（不清楚的同学可以回头看看[数据类型那篇](https://mp.weixin.qq.com/s/twim3w_dp5ctCigjLGIbFw)），整形和整形的运算结果就是整形，不会出现浮点型。否则，就会出现浮点型。

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

![](http://www.itwanger.com/assets/images/techSisterLearnJava/eleven-02.png)

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

在学习位运算符之前，需要先学习一下二进制，因为位运算符操作的不是整形数值（int、long、short、char、byte）本身，而是整形数值对应的二进制。

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

![](http://www.itwanger.com/assets/images/techSisterLearnJava/eleven-03.png)

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

逻辑非运算符（|）：用来反转条件的结果，如果条件为 true，则逻辑非运算符将得到 false。

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

![](http://www.itwanger.com/assets/images/techSisterLearnJava/eleven-04.png)

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

## 十二、 48 个关键字

“二哥，就我之前学过的这些 Java 代码中，有 public、static、void、main 等等，它们应该都是关键字吧？”三妹的脸上泛着甜甜的笑容，我想她在学习 Java 方面已经变得越来越自信了。

“是的，三妹。Java 中的关键字可不少呢！你一下子可能记不了那么多，不过，先保留个印象吧，对以后的学习会很有帮助。”

PS：按照首字母的自然顺序排列。

1.  **abstract：** 用于声明抽象类，以及抽象方法。

2.  **boolean：** 用于将变量声明为布尔值类型，只有 true 和 false 两个值。

3.  **break：** 用于中断循环或 switch 语句。

4.  **byte：** 用于声明一个可以容纳 8 个比特的变量。

5.  **case：** 用于在 switch 语句中标记条件的值。

6.  **catch：** 用于捕获 try 语句中的异常。

7.  **char：** 用于声明一个可以容纳无符号 16 位比特的 [Unicode 字符](https://mp.weixin.qq.com/s/pNQjlXOivIgO3pbYc0GnpA)的变量。

8.  **class：** 用于声明一个类。

9.  **continue：** 用于继续下一个循环，可以在指定条件下跳过其余代码。

10.  **default：** 用于指定 switch 语句中除去 case 条件之外的默认代码块。

11.  **do：** 通常和 while 关键字配合使用，do 后紧跟循环体。

12.  **double：** 用于声明一个可以容纳 64 位浮点数的变量。

13.  **else：** 用于指示 if 语句中的备用分支。

14.  **enum：** 用于定义一组固定的常量（枚举）。

15.  **extends：** 用于指示一个类是从另一个类或接口继承的。

16.  **final：** 用于指示该变量是不可更改的。

17.  **finally：** 和 `try-catch` 配合使用，表示无论是否处理异常，总是执行 finally 块中的代码。

18.  **float：** 用于声明一个可以容纳 32 位浮点数的变量。

19.  **for：** 用于声明一个 for 循环，如果循环次数是固定的，建议使用 for 循环。

20.  **if：** 用于指定条件，如果条件为真，则执行对应代码。

21.  **implements：** 用于实现接口。

22.  **import：** 用于导入对应的类或者接口。

23.  **instanceof：** 用于判断对象是否属于某个类型（class）。

24.  **int：** 用于声明一个可以容纳 32 位带符号的整数变量。

25.  **interface：** 用于声明接口。

26.  **long：** 用于声明一个可以容纳 64 位整数的变量。

27.  **native：** 用于指定一个方法是通过调用本机接口（非 Java）实现的。

28.  **new：** 用于创建一个新的对象。

29.  **null：** 如果一个变量是空的（什么引用也没有指向），就可以将它赋值为 null，和空指针异常息息相关。

30.  **package：** 用于声明类所在的包。

31.  **private：** 一个访问权限修饰符，表示方法或变量只对当前类可见。

32.  **protected：** 一个访问权限修饰符，表示方法或变量对同一包内的类和所有子类可见。

33.  **public：** 一个访问权限修饰符，除了可以声明方法和变量（所有类可见），还可以声明类。`main()` 方法必须声明为 public。

34.  **return：** 用于在代码执行完成后返回（一个值）。

35.  **short：** 用于声明一个可以容纳 16 位整数的变量。

36.  **static：** 表示该变量或方法是静态变量或静态方法。

37.  **strictfp：** 并不常见，通常用于修饰一个方法，确保方法体内的浮点数运算在每个平台上执行的结果相同。

38.  **super：** 可用于调用父类的方法或者字段。

39.  **switch：** 通常用于三个（以上）的条件判断。

40.  **synchronized：** 用于指定多线程代码中的同步方法、变量或者代码块。

41.  **this：** 可用于在方法或构造函数中引用当前对象。

42.  **throw：** 主动抛出异常。

43.  **throws：** 用于声明异常。

44.  **transient：**  修饰的字段不会被序列化。

45.  **try：** 于包裹要捕获异常的代码块。

46.  **void：** 用于指定方法没有返回值。

47.  **volatile：** 保证不同线程对它修饰的变量进行操作时的可见性，即一个线程修改了某个变量的值，新值对其他线程来说是立即可见的。

48.  **while：** 如果循环次数不固定，建议使用 while 循环。


“好了，三妹，关于 Java 中的关键字就先说这 48 个吧，这只是一个大概的介绍，后面还会对一些特殊的关键字单独拎出来详细地讲，比如说重要的 static、final 等。”转动了一下僵硬的脖子后，我对三妹说。

“二哥，你辛苦了，足足 48 个啊，容我好好消化一下。”

## 十三、12 张图带你彻底了解流程控制语句

“二哥，流程控制语句都有哪些呢？”三妹的脸上泛着甜甜的笑容，她开始对接下来要学习的内容充满期待了，这正是我感到欣慰的地方。

“比如说 if-else、switch、for、while、do-while、return、break、continue 等等，接下来，我们一个个来了解下。”

### 01、if-else 相关

![](http://www.itwanger.com/assets/images/techSisterLearnJava/thirteen-01.png)


**1）if 语句**

if 语句的格式如下：

```java
if(布尔表达式){  
// 如果条件为 true，则执行这块代码
} 
```

画个流程图表示一下：

![](http://www.itwanger.com/assets/images/techSisterLearnJava/thirteen-02.png)


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

**2）if-else 语句**

if-else 语句的格式如下:

```java
if(布尔表达式){  
// 条件为 true 时执行的代码块
}else{  
// 条件为 false  时执行的代码块
}  
```

画个流程图表示一下：

![](http://www.itwanger.com/assets/images/techSisterLearnJava/thirteen-03.png)


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

**3）if-else-if 语句**

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

![](http://www.itwanger.com/assets/images/techSisterLearnJava/thirteen-04.png)


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

**4）if 嵌套语句**

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

![](http://www.itwanger.com/assets/images/techSisterLearnJava/thirteen-05.png)


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

![](http://www.itwanger.com/assets/images/techSisterLearnJava/thirteen-06.png)



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

![](http://www.itwanger.com/assets/images/techSisterLearnJava/thirteen-07.png)

**1）普通 for 循环**

普通的 for 循环可以分为 4 个部分：

1）初始变量：循环开始执行时的初始条件。

2）条件：循环每次执行时要判断的条件，如果为 true，就执行循环体；如果为 false，就跳出循环。当然了，条件是可选的，如果没有条件，则会一直循环。

3）循环体：循环每次要执行的代码块，直到条件变为 false。

4）自增/自减：初识变量变化的方式。



来看一下普通 for 循环的格式：



```java
for(初识变量;条件;自增/自减){  
// 循环体
}  
```



画个流程图：

![](http://www.itwanger.com/assets/images/techSisterLearnJava/thirteen-08.png)




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

**2）for-each**

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

**3）无限 for 循环**

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

![](http://www.itwanger.com/assets/images/techSisterLearnJava/thirteen-09.png)





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

![](http://www.itwanger.com/assets/images/techSisterLearnJava/thirteen-10.png)






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

![](http://www.itwanger.com/assets/images/techSisterLearnJava/thirteen-11.png)

### 06、break

break 关键字通常用于中断循环或 switch 语句，它在指定条件下中断程序的当前流程。如果是内部循环，则仅中断内部循环。

可以将 break 关键字用于所有类型循环语句中，比如说 for 循环、while 循环，以及 do-while 循环。

来画个流程图感受一下：


![](http://www.itwanger.com/assets/images/techSisterLearnJava/thirteen-12.png)


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

## 十四、Java 中的注释有什么好讲的？

“二哥，Java 中的注释好像真没什么可讲的，我已经提前预习了，不过是单行注释，多行注释，还有文档注释。”三妹的脸上泛着甜甜的笑容，她竟然提前预习了接下来要学习的知识，有一种“士别三日，当刮目相看”的感觉。

“注释的种类确实不多，但还是挺有意思的，且听哥来给你说道说道。”

![](http://www.itwanger.com/assets/images/techSisterLearnJava/fourteen-01.png)




### 01、单行注释

单行注释通常用于解释方法内某单行代码的作用。

```java
public void method() {
    int age = 18; // age 用于表示年龄
}
```

**但如果写在行尾的话，其实是不符合阿里巴巴的开发规约的**。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/fourteen-02.png)

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

![](http://www.itwanger.com/assets/images/techSisterLearnJava/fourteen-03.png)


**第二步**，执行 javadoc 命令 `javadoc Demo.java -encoding utf-8`。`-encoding utf-8` 可以保证中文不发生乱码。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/fourteen-04.png)

**第三步，**执行 `ls -l` 命令就可以看到生成代码文档时产生的文件，主要是一些可以组成网页的 html、js 和 css 文件。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/fourteen-05.png)

**第四步**，执行 `open index.html` 命令可以通过默认的浏览器打开文档注释。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/fourteen-06.png)

点击「Demo」，可以查看到该类更具体的注释文档。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/fourteen-07.png)

### 04、文档注释的注意事项

1）`javadoc` 命令只能为 public 和 protected 修饰的字段、方法和类生成文档。

default 和 private 修饰的字段和方法的注释将会被忽略掉。因为我们本来就不希望这些字段和方法暴露给调用者。

如果类不是 public 的话，javadoc 会执行失败。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/fourteen-08.png)

2）文档注释中可以嵌入一些 HTML 标记，比如说段落标记 `<p>`，超链接标记 `<a></a>` 等等，但不要使用标题标记，比如说 `<h1>`，因为 javadoc 会插入自己的标题，容易发生冲突。

3）文档注释中可以插入一些 `@` 注解，比如说 `@see` 引用其他类，`@version` 版本号，`@param` 参数标识符，`@author` 作者标识符，`@deprecated` 已废弃标识符，等等。

### 05、注释规约

1）类、字段、方法必须使用文档注释，不能使用单行注释和多行注释。因为注释文档在 IDE 编辑窗口中可以悬浮提示，提高编码效率。

比如说，在使用 String 类的时候，鼠标悬停在 String 上时可以得到以下提示。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/fourteen-09.png)

2）所有的抽象方法(包括接口中的方法)必须要用Javadoc注释、除了返回值、参数、 异常说明外，还必须指出该方法做什么事情，实现什么功能。

3）所有的类都必须添加创建者和创建日期。

Intellij IDEA 中可以在「File and Code Templates」中设置。

![](http://www.itwanger.com/assets/images/techSisterLearnJava/fourteen-10.png)

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

>第一、注释要能够准确反映设计思想和代码逻辑;第二、注释要能够描述业务含 义，使别的程序员能够迅速了解到代码背后的信息。完全没有注释的大段代码对于阅读者形同 天书，注释是给自己看的，即使隔很长时间，也能清晰理解当时的思路;注释也是给继任者看 的，使其能够快速接替自己的工作。

# 对象和类

## 十五、Java 命名约定

“二哥，Java 中的命名约定都有哪些呢？”三妹的脸上泛着甜甜的笑容，她开始对接下来要学习的内容充满期待了，这正是我感到欣慰的地方。

“对于我们中国人来说，名字也是有讲究的，比如说我叫沉默王二，你就叫沉默王三，哈哈。”我笑着对三妹说。

命名约定决定我们使用什么样的标识符来命名包、类、字段、方法等等，虽然这个规则不是强制的，可以遵守，也可以不遵守，但如果不遵守的话，就会带来很多不必要的麻烦。

起个好的名字，就好像穿一件得体的衣服，呈现给人的用户体验是完全不一样的。 

好的命名可以让你的代码更易读，包括你自己和你的小伙伴，看一眼，不用想太多，就能明白代码是干嘛的。

拿我这个笔名“沉默王二”来举例吧，读起来我就觉得朗朗上口，读者看到这个笔名就知道我是一个什么样的人——对不熟的人保持沉默，对熟的人妙语连珠，哈哈。

### 01、包（package）

包的命名应该遵守以下规则：

- 应该全部是小写字母

- 点分隔符之间有且仅有一个自然语义的英语单词

- 包名统一使用单数形式，比如说 `com.itwanger.util` 不能是 `com.itwanger.utils`

- 在最新的 Java 编程规范中，要求开发人员在自己定义的包名前加上唯一的前缀。由于互联网上的域名是不会重复的，所以多数开发人员采用自己公司（或者个人博客）在互联网上的域名称作为包的唯一前缀。比如我文章中出现的代码示例的包名就是 `package com.itwanger`。


### 02、类（class）

类的命名应该遵守以下规则：

- 必须以大写字母开头

- 最好是一个名词，比如说 System

- 类名使用 UpperCamelCase（驼峰式命名）风格

- 尽量不要省略成单词的首字母，但以下情形例外：DO/BO/DTO/VO/AO/ PO / UID 等

![](http://www.itwanger.com/assets/images/techSisterLearnJava/fifteen-01.png)

另外，如果是抽象类的话，使用 Abstract 或 Base 开头；如果是异常类的话，使用 Exception 结尾；如果是测试类的话，使用 Test 结尾。

### 03、接口（interface）

接口的命名应该遵守以下规则：

- 必须以大写字母开头

- 最好是一个形容词，比如说 Runnable

- 尽量不要省略成单词的首字母

来看个例子：

```java
interface Printable {}
```

接口和实现类之间也有一些规则：

- 实现类用 Impl 的后缀与接口区别，比如说 CacheServiceImpl 实现 CacheService 接口

- 或者，AbstractTranslator 实现 Translatable 接口

### 04、字段（field）和变量（variable）

字段和变量的命名应该遵守以下规则：

- 必须以小写字母开头

- 可以包含多个单词，第一个单词的首字母小写，其他的单词首字母大写，比如说 `firstName`

- 最好不要使用单个字符，比如说 `int a`，除非是局部变量

- 类型与中括号紧挨相连来表示数组，比如说 `int[] arrayDemo`，main 方法中字符串数组参数不应该写成 `String args[]`

- POJO 类中的任何布尔类型的变量，都不要加 is 前缀，否则部分框架解析会引起序列化错误，我自己知道的有 fastjson

- 避免在子类和父类的成员变量之间、或者不同代码块的局部变量之间采用完全相同的命名，使可理解性降低。子类、父类成员变量名相同，即使是 public 类型的变量也能够通过编译，另外，局部变量在同一方法内的不同代码块中同名也是合法的，这些情况都要避免。

反例：

```java
public class ConfusingName {
    public int stock;

    // 非 setter/getter 的参数名称，不允许与本类成员变量同名
    public void get(String alibaba) {
        if (condition) {
            final int money = 666;
// ...
        }
        for (int i = 0; i < 10; i++) {
// 在同一方法体中，不允许与其它代码块中的 money 命名相同 final int money = 15978;
// ...
        }
    }
}

class Son extends ConfusingName {
// 不允许与父类的成员变量名称相同 public int stock;
}
```

### 05、常量（constant）

常量的命名应该遵守以下规则：

- 应该全部是大写字母

- 可以包含多个单词，单词之间使用“_”连接，比如说 `MAX_PRIORITY`，力求语义表达完整清楚，不要嫌名字长

- 可以包含数字，但不能以数字开头

来看个例子：

```java
static final int MIN_AGE = 18;  
```


### 06、方法（method）

方法的命名应该遵守以下规则：

- 必须以小写字母开头

- 最好是一个动词，比如说 `print()`

- 可以包含多个单词，第一个单词的首字母小写，其他的单词首字母大写，比如说 `actionPerformed()`

来看个例子：

```java
void writeBook(){}
```

Service/DAO 层的方法命名规约：

- 获取单个对象的方法用 get 做前缀

- 获取多个对象的方法用 list 做前缀，复数结尾，如：listObjects

- 获取统计值的方法用 count 做前缀

- 插入的方法用 save/insert 做前缀

- 删除的方法用 remove/delete 做前缀

- 修改的方法用 update 做前缀


### 07、总结

除了以上这些规则以外，还有一些共同的规则需要遵守，比如说：

- 代码中的命名均不能以下划线或美元符号开始，也不能以下划线或美元符号结束。反例：`_name / __name / $name / name_ / name$ / name__`
- 所有编程相关的命名严禁使用拼音与英文混合的方式，更不允许直接使用中文的方式。反例：`DaZhePromotion [打折] / getPingfenByName() [评分] / String fw[福娃] / int 某变量 = 3`
- 代码和注释中都要避免使用任何语言的种族歧视性词语。反例：`RIBENGUIZI / Asan / blackList / whiteList / slave`
- 方法名、参数名、成员变量、局部变量都统一使用 lowerCamelCase 风格。
- 杜绝完全不规范的缩写，避免望文不知义。反例：AbstractClass “缩写”成 AbsClass；condition “缩写”成 condi；Function 缩写”成 Fu，此类随意缩写严重降低了代码的可阅读性。
- 为了达到代码自解释的目标，任何自定义编程元素在命名时，使用尽量完整的单词组合来表达。
- 在常量与变量的命名时，表示类型的名词放在词尾，以提升辨识度。正例：`startTime / workQueue / nameList / TERMINATED_THREAD_COUNT`
- 如果模块、接口、类、方法使用了设计模式，在命名时需体现出具体模式。 将设计模式体现在名字中，有利于阅读者快速理解架构设计理念。比如说：`public class OrderFactory;public class LoginProxy;public class ResourceObserver;`
- 枚举类名带上 Enum 后缀，枚举成员名称需要全大写，单词间用下划线隔开。枚举其实就是特殊的常量类，且构造方法被默认强制是私有。比如说：`枚举名字为 ProcessStatusEnum 的成员名称：SUCCESS / UNKNOWN_REASON`。


# one more thing

同学们放宽心，《零基础学 Java》专栏还会继续更新，敬请期待👍。写这个专栏的初衷就是为了帮助那些零基础学 Java，或者自学 Java 感觉特别痛苦，特别难入门的小伙伴。

另外，我还创建了一些「**技术交流群**」，群里氛围很不错，有不少小伙伴会分享一些校招或者社招经验，更重要的是，群里时不时会有「红包」等福利，当然，群里不允许任何形式的广告。扫描下方的二维码，回复「**加群**」即可。

![](http://www.itwanger.com/assets/images/wangsan.png)