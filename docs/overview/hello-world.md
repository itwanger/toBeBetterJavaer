## 第一个 Java 程序：Hello World

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

![](https://cdn.jsdelivr.net/gh/itwanger/jmx-java/images/overview/four-01.png)

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