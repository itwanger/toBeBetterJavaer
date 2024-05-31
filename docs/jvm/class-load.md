---
title: 一文彻底搞懂 Java 类加载机制（付费）
shortTitle: Java的类加载机制（付费）
category:
  - Java核心
tag:
  - Java虚拟机
description: Java的类加载机制通过类加载器和类加载过程的合作，确保了Java程序的动态加载、灵活性和安全性。双亲委派模型进一步增强了这种机制的安全性和类之间的协调性。
head:
  - - meta
    - name: keywords
      content: Java,JavaSE,教程,二哥的Java进阶之路,jvm,Java虚拟机,类加载机制,类加载器,类加载过程,双亲委派模型
---

# 第三节：Java的类加载机制

[上一节](https://javabetter.cn/jvm/how-run-java-code.html)在讲 JVM 运行 Java 代码的时候，我们提到，JVM 需要将编译后的字节码文件加载到其内部的运行时数据区域中进行执行。这个过程涉及到了 Java 的类加载机制（面试常问的知识点），所以我们来详细地讲一讲。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/how-run-java-code-91dac706-1c4e-4775-bc4e-b2104283aa04.png)

字节码我们[上一节](https://javabetter.cn/jvm/how-run-java-code.html)也讲过，它和类的加载机制息息相关，相信大家都还有印象。

这里再给大家普及一个小技巧，可以通过 xxd 命令来查看字节码文件，先看下面这段代码。

```java
public class Test {
    public static void main(String[] args) {
        System.out.println("沉默王二");
    }
}
```

代码编译通过后，在命令行执行 `xxd Test.class`（macOS 用户可以直接执行，Windows 用户可以戳[这个链接](https://superuser.com/questions/497953/convert-hex-dump-of-file-to-binary-program-file-on-windows/638850#638850)获取替代品）就可以快速查看字节码的十六进制内容。

> xxd 是一个用于在终端中创建十六进制转储（hex dump）或将十六进制转回二进制的工具。可通过[维基百科](https://zh.wikipedia.org/zh-sg/%E5%8D%81%E5%85%AD%E8%BF%9B%E5%88%B6%E8%BD%AC%E5%82%A8)了解更多信息。

```
00000000: cafe babe 0000 0034 0022 0700 0201 0019  .......4."......
00000010: 636f 6d2f 636d 6f77 6572 2f6a 6176 615f  com/cmower/java_
00000020: 6465 6d6f 2f54 6573 7407 0004 0100 106a  demo/Test......j
00000030: 6176 612f 6c61 6e67 2f4f 626a 6563 7401  ava/lang/Object.
00000040: 0006 3c69 6e69 743e 0100 0328 2956 0100  ..<init>...()V..
00000050: 0443 6f64 650a 0003 0009 0c00 0500 0601  .Code...........
00000060: 000f 4c69 6e65 4e75 6d62 6572 5461 626c  ..LineNumberTabl
```

这里只说一点，这段字节码中的 `cafe babe` 被称为“魔数”，是 JVM 识别 .class 文件（字节码文件）的标志，相信大家都知道，Java 的 logo 是一杯冒着热气的咖啡，是不是又关联上了？

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/overview/two-02.png)

> 文件格式的定制者可以自由选择魔数值（只要没用过），比如说 .png 文件的魔数是 `8950 4e47`。

至于字节码文件中的其他内容，暂时先不用去管，我们后面会详细讲解。

## 类加载过程

知道什么是 Java 字节码后，我们来聊聊 Java 的类加载过程。

![](https://cdn.tobebetterjavaer.com/stutymore/class-load-20231031202641.png)

。。。。

## 付费内容

以下内容为[二哥编程星球](https://javabetter.cn/zhishixingqiu/)的付费内容（点击[链接](](https://javabetter.cn/jvm/))可以查看详细介绍和加入方式）。

![](https://cdn.tobebetterjavaer.com/stutymore/readme-20240116130809.png)

加入二哥的编程星球后，你不仅可以阅读完整版的《二哥的 JVM 进阶之路》内容，还可以阅读更多付费专栏，比如说《[技术派付费专栏](https://javabetter.cn/zhishixingqiu/mianshi.html)》、《[二哥的 LeetCode 刷题笔记](https://paicoding.com/column/7/1)》、《编程喵实战项目笔记》、《[Java 面试指南](https://javabetter.cn/zhishixingqiu/mianshi.html)》等等。

![](https://cdn.tobebetterjavaer.com/stutymore/class-load-vip-20240116135627.png)

除此之外，还可以为你提供：

- **专属的一对一提问交流**，如何准备面试，如何制定学习计划，如何选择 offer，以及职场规划，都能得到我 1v1 的指导和建议；
- **强大的嘉宾阵容**，有微信的、字节的、小米的、百度的、国企的、外企的、阿里的等等各方大佬。如果你的问题二哥解决不了，总有一个大佬能够帮你解决。
- **为你精挑细选了一些可以写到简历上，可以提高编程功底的优质实战项目**，比如说动态线程池 hippo4j、手写数据库 MYDB、Spring Boot 的前后端分离项目技术派等等，无论你是缺少项目经验的学生党，还是有一定经验的工作党，这些项目都能帮助你完成技术上的蜕变和提升。
- **星球会定期整理和分享优质的学习资料**，包括 PDF&视频教程&学习资料等等。
- **为你提供容易被忽视但又十分重要的简历指导服务**，二哥会事无巨细地帮你指出简历上的问题，打造一份投了就有声音的优质简历。
- **为你创造一个沉浸式的学习环境**，二哥的编程星球自上线以来，氛围非常好，有一种高中初中上晚自习，大学进图书馆的感觉，每天都会有很多球友积极打卡，分享自己一天的学习成果。

学习的路上最缺的就是清晰的学习路线、优质的学习资料和良好的学习氛围，二哥的编程星球恰好就能给你提供这样的服务。来星球的球友几乎都斩获不错的成绩，有美团、华为等大厂，也有 16k 的双非本、甚至 23k 的大专社招，我随便发几个球友报喜的截图给大家展示下。

![](https://cdn.tobebetterjavaer.com/stutymore/readme-20231221211916.png)

![](https://cdn.tobebetterjavaer.com/stutymore/readme-20231221213449.png)

《[Java 面试指南](https://javabetter.cn/zhishixingqiu/mianshi.html)》是[二哥编程星球的](https://javabetter.cn/zhishixingqiu/)的一个付费专栏，和《Java 进阶之路》上的内容可以形成很好的互补，截止到目前，已经更新 48 万字，可以说是满满的干货和诚意。

![](https://cdn.tobebetterjavaer.com/stutymore/readme-20230904113349.png)

一共分为 6 大板块，对面试、职场、技术、学习都会帮助特别大。

- 面试准备篇（25+篇），手把手教你如何准备面试。
- 职场修炼篇（11+篇），手摸手教你如何在职场中如鱼得水。
- 学习路线篇（13+篇），手勾手教你如何快速学习一门技术栈。
- 技术提升篇（33+篇），手拉手教你如何成为团队不可或缺的技术攻坚小能手。
- 面经分享篇（23+篇），手牵手教你如何在面试中知彼知己，百战不殆。
- 场景设计篇（22+篇），手握手教你如何在面试中脱颖而出。

### 01、面试准备篇

所谓临阵磨枪，不快也光。更何况提前做好充足的准备呢？这 25+篇内容会系统地引导你该如何做好面试准备。涉及到的主题有：简历、源码、LeetCode、项目经验、开源项目、高并发、证书、和 HR 对线、国企名单、公司投递名单、银行、谈薪等等面试常见问题。

![如何准备面试](https://cdn.tobebetterjavaer.com/paicoding/8f43c95b9c03f786f42e314d84842564.png)


![如何写好简历](https://cdn.tobebetterjavaer.com/paicoding/d2770ebcf6433388f802d5bdd2db83f3.png)


![秋招投递名单](https://cdn.tobebetterjavaer.com/paicoding/c3e2e95606aa42f520bcffbb89807fbf.png)


### 02、职场修炼篇

如何平滑度过试用期？如何平滑度过 35 岁程序员危机？如何在繁重的工作中持续成长？如何做副业？如何赚零花钱？如何达到 30 万+年薪等等，都是大家迫切关心的问题，这 11+篇内容会一一为你揭晓答案。

![](https://cdn.tobebetterjavaer.com/paicoding/398dad8b63a4d1fe0998187bf02ec8f5.png)

### 03、技术提升篇

编程能力、技术功底，是我们程序员安身立命之本，是我们求职/工作的最核心的武器。


![](https://cdn.tobebetterjavaer.com/paicoding/0b2b08709ff2bfc7fefaa7d079760381.png)

### 04、面经分享篇

知彼知己，方能百战不殆，我们必须得站在前辈的肩膀上，才能走得更远更快。他们在面试中遇到过哪些经典的问题，我们能不能提前演练一下，对临场发挥有着至关重要的作用。


![](https://cdn.tobebetterjavaer.com/paicoding/200dac9430e454dafc42551d531c4bb1.png)

### 05、场景设计题篇

有些面试官不喜欢问八股文，反而更喜欢结合项目问一些非常经典的场景题，这种场景题没有标准的答案，但却很能考察一名求职者的逻辑思维能力。

![](https://cdn.tobebetterjavaer.com/paicoding/3a11266fb00df1b1e2c7e9283a82f0bb.png)

## 星球限时优惠

一年前，星球的定价还是 99 元一年，第一批优惠券的额度是 30 元，等于说 69 元的低价就可以加入，再扣除掉星球手续费，几乎就是纯粹做公益。

随着时间的推移，星球积累的干货/资源越来越多，我花在星球上的时间也越来越多，[星球的知识图谱](https://javabetter.cn/zhishixingqiu/map.html)里沉淀的问题，你可以戳这个[链接](https://javabetter.cn/zhishixingqiu/map.html)去感受一下。有学习计划啊、有学生党秋招&春招&offer选择&考研&实习&专升本&培训班的问题啊、有工作党方向选择&转行&求职&职业规划的问题啊，还有大大小小的技术细节，我都竭尽全力去帮助球友，并且得到了球友的认可和尊重。

目前星球已经 5000+ 人了，所以星球也涨价到了 149 元，后续会讲星球的价格调整为 159 元/年，所以想加入的小伙伴一定要趁早。

![](https://cdn.tobebetterjavaer.com/stutymore/readme-20240521200742.png)

你可以微信扫码或者长按自动识别领取 30 元优惠券，**119/年** 加入，新项目 pmhub 上线后会涨价至 159 元，所以想要加入的话请趁早。

![](https://cdn.tobebetterjavaer.com/stutymore/readme-20240116131318.png)

对了，**加入星球后记得花 10 分钟时间看一下星球的两个置顶贴，你会发现物超所值**！

成功没有一蹴而就，没有一飞冲天，但只要你能够一步一个脚印，就能取得你心满意足的好结果，请给自己一个机会！

最后，把二哥的座右铭送给你：**没有什么使我停留——除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟**。

共勉 ⛽️。