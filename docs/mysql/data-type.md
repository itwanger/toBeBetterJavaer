---
title: （付费）4000 字 20 张手绘图，结合技术派实战项目，彻底掌握 MySQL 的数据类型
shortTitle: MySQL数据类型（付费）
---

# MySQL数据类型

上一节，我们学了 [MySQL 表的基本操作](https://javabetter.cn/mysql/table.html)，知道了表是由不同数据类型的列组成的，然后填充了一行一行的数据。

当我们要创建表的时候，就要根据业务需求，选择合适的数据类型。比如说在[技术派实战项目](https://javabetter.cn/zhishixingqiu/paicoding.html)当中，文章表就是由下面这些不同数据类型的字段定义的。

![](https://cdn.tobebetterjavaer.com/stutymore/data-type-20240201164851.png)

目前用到了 bigint、tinyint、varchar、int、timestamp 等数据类型，这些数据类型到底该如何选择呢？就需要我们提前先了解清楚，MySQL 到底支持哪些数据类型，以及每种数据类型的特点是什么。

## 整数类型

上面提到的 bigint、tinyint、int 都是整数类型，MySQL 支持的整数类型如下：

| 类型名称 | 存储空间 | 范围 |
| :--- | :--- | :--- |
| tinyint | 1 字节 | -128 到 127 或者 0 到 255 |
| smallint | 2 字节 | -32768 到 32767 或者 0 到 65535 |
| mediuint | 3 字节 | -8388608 到 8388607 或者 0 到 16777215 |
| int | 4 字节 | -2147483648 到 2147483647 或者 0 到 4294967295 |
| bigint | 8 字节 | -9223372036854775808 到 9223372036854775807 或者 0 到 18446744073709551615 |

smallint 和 mediuint 这两种类型很少用到，一般我们用的是 tinyint、int、bigint 这三种类型。

比如说技术派中 article 表的文章类型字段 article_type，就是用 tinyint 类型定义的，因为文章类型只有 1（博文）、2（问答）种，所以用 tinyint 就足够了。

再比如说状态 status 字段，也是用 tinyint 类型定义的，因为状态我们只有 0（未发布）、1（发布）两种。

以及 deleted 字段，也是用 tinyint 类型定义的，因为删除状态一般只有 0（未删除）、1（已删除）两种。

那像 int 一般用于用户的年龄啊、库存数量啊、评论数量啊、点赞数量啊等等。

技术派中 article 表的 offical_stat（官方推荐状态）、topping_stat（置顶状态）、cream_stat（加精状态）用了 int 类型，其实不太合理，应该用 tinyint 类型就足够了。暂时也就懒得改了。

bigint 我们用到了表的主键上，这也是一种比较常见的做法，尤其是当预计数量超过 int 的最大值（21 亿）时，但是就技术派目前的数量来看，用 int 就足够了。

我之前在做大宗期货交易的订单时，一开始用的是 int 类型，后来还真的出现了超出 int 范围的情况，所以后来改成了 bigint 类型。

bigint 的最大值是 9223372036854775807，也就是 922 亿亿，这个数字非常非常大，往往到这个数量级的都要做分库分表了。

另外，对于主键的数据类型选择，不同的业务场景有不同的需求，如果需要确保跨多个数据库或者系统唯一性，那么 UUID 或者[雪花算法](https://zhuanlan.zhihu.com/p/85837641)生成的 ID 会更合适。

UUID 不依赖于数据库的自增特性，非常适合分布式系统，但是 UUID 会占用更多的存储空间（`CHAR(36)` 或 `VARCHAR(36)`），而且不是递增的，会导致[索引](https://javabetter.cn/mysql/suoyin.html)的性能下降。

### 有符号和无符号

整型数据类型还可以选择有符号和无符号，有符号就是可以存储正数和负数，无符号就是只能存储正数。默认为有符号，也就是不用指定。

比如说 int 类型，如果是有符号的，那么范围是 -2147483648 到 2147483647，如果是无符号的，那么范围是 0 到 4294967295。

![from MySQL 官网](https://cdn.tobebetterjavaer.com/stutymore/data-type-20240202084103.png)

**无符号的情况下，要特别注意和 Java 数据类型的对应关系**。

我们都知道，Java 中的 [int 范围](https://javabetter.cn/basic-grammar/basic-data-type.html)是 -2147483648 到 2147483647。那如果 MySQL 选择的 int 类型是无符号的，范围就超出了 Java 的 int 类型范围了。

这时候，为了避免出现不兼容的情况，Java 的数据类型要选择 long 类型。当然了，在数据库实体（POJO）中，要用[包装类型](https://javabetter.cn/basic-extra-meal/box.html) Long。

![](https://cdn.tobebetterjavaer.com/stutymore/data-type-20240202081618.png)

像自增 ID，肯定是无符号的，所以我们会在定义的时候将其设置为 `unsigned`，比如说技术派项目中的 article 表。

![](https://cdn.tobebetterjavaer.com/stutymore/data-type-20240202082214.png)

### int(10) 和 int 

注意，上图中我们在定义 id 的时候，设置的数据类型是 `int(10)`，和 int 有什么区别呢？

这其实是一道不错的面试题，比如说面试官可能会问你，`int(10)` 和 `int(11)` 有什么区别？

如果之前没有了解过的话，可能一下子就懵了。其实这个和存储空间没有关系，只是用来规定显示宽度的。

我们来创建这样一张测试表，包含四个字段，一个是主键 ID，一个是 `int(10)`，一个是 `int(11)`，另外一个是 int。

```sql
CREATE TABLE `test` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `int10` int(10) NOT NULL,
  `int11` int(11) NOT NULL,
  `int` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

>这里的反引号 \` 是为了避免关键字冲突。

![](https://cdn.tobebetterjavaer.com/stutymore/data-type-20240202083135.png)

然后我们插入一条数据，看看结果。

```sql
INSERT INTO `test` (`int10`, `int11`, `int`) VALUES (1234567890, 1234567890, 1234567890);
```

[查询一下](https://javabetter.cn/mysql/select-simple.html)，似乎没有什么区别。

![](https://cdn.tobebetterjavaer.com/stutymore/data-type-20240202083253.png)

我们来看一下 MySQL 官方对 `int(M)` 的解释。

> M indicates the maximum display width for integer types. 

。。。。。

## 付费内容

以下内容为[二哥编程星球](https://javabetter.cn/zhishixingqiu/)的付费内容（点击[链接](](https://javabetter.cn/jvm/))可以查看详细介绍和加入方式）。

![](https://cdn.tobebetterjavaer.com/stutymore/readme-20240116130809.png)

加入二哥的编程星球后，你不仅可以阅读完整版的《二哥的 MySQL 进阶之路》内容，还可以阅读更多付费专栏，比如说《[技术派付费专栏](https://javabetter.cn/zhishixingqiu/mianshi.html)》、《[二哥的 LeetCode 刷题笔记](https://paicoding.com/column/7/1)》、《编程喵实战项目笔记》、《[Java 面试指南](https://javabetter.cn/zhishixingqiu/mianshi.html)》等等。

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