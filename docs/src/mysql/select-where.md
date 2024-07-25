---
title: （付费）MySQL WHERE 条件查询，重点搞懂 % 通配符，MyBatis 中的 \# 和 $ 的区别，MySQL 会如何处理连续的 % 通配符
shortTitle: MySQL WHERE条件查询（付费）
---

# MySQL WHERE 条件查询

在[上一篇](https://javabetter.cn/mysql/select-simple.html)中，我们学习了简单的 SELECT 查询，但没有带上查询条件。要知道，真实的业务场景中，数量会非常大，有些甚至会有几百万、几千万条数据，如果不带上查询条件，一次性把全部数据查出来是不太现实的。

所以，我们通常要求在执行 SELECT 查询时，都要带上查询条件。那这一节，我们就来学习一些简单的 WHERE 条件查询。

我们仍然以[技术派](https://javabetter.cn/zhishixingqiu/paicoding.html)的文章表 article 为例，比如说我们要查找标题为“聊聊分库分表”的文章，可以这么写：

```sql
SELECT * FROM article WHERE title = '聊聊分库分表';
```

![](https://cdn.tobebetterjavaer.com/stutymore/select-where-20240224154457.png)

这其中的 `WHERE title = '聊聊分库分表'` 就是查询条件，`title` 是字段名，`'聊聊分库分表'` 是字段值。

## 比较查询操作符

除了上面提到的 `=` 操作符，MySQL 还提供了很多其他的比较查询操作符，常用的有以下几种：

| 操作符       | 示例                             | 描述     |
| ------------ | -------------------------------- | -------- |
| `=`          | `user_id = 1`                    | 等于     |
| `!=` 或 `<>` | `user_id != 1` 或 `user_id <> 1` | 不等于   |
| `>`          | `user_id > 1`                    | 大于     |
| `<`          | `user_id < 1`                    | 小于     |
| `>=`         | `user_id >= 1`                   | 大于等于 |
| `<=`         | `user_id <= 1`                   | 小于等于 |

比如说，我们要查找 user_id 大于 1000 的文章，可以这么写：

```sql
SELECT title, user_id, create_time FROM article WHERE user_id > 1000;
```

![](https://cdn.tobebetterjavaer.com/stutymore/select-where-20240224155141.png)

其他的我就不一一展示了，很简单，大家可以自己试试（也没必要 😂，知道有这么一些比较操作符就行了，用到的时候会用就 OK）

## 区间查询

假如说我们要查询 user_id 在 1000 到 2000 之间的文章，可以这么写：

```sql
SELECT title, user_id, create_time FROM article WHERE user_id >= 1000 AND user_id <= 2000;
```

![](https://cdn.tobebetterjavaer.com/stutymore/select-where-20240224155553.png)

利用一个 `>=` 和一个 `<=`，配合 `AND` 关键字，就可以实现区间查询。除此之外，MySQL 还提供了 `BETWEEN` 这个关键字，可以更简洁地实现区间查询（字段 user_id 不需要写两次），比如：

```sql
SELECT title, user_id, create_time FROM article WHERE user_id BETWEEN 1000 AND 2000;
```

![](https://cdn.tobebetterjavaer.com/stutymore/select-where-20240224155916.png)

配合 `NOT` 关键字，还可以实现区间查询的取反操作，比如说，我们要查询 user_id 不在 1000 到 2000 之间的文章，可以这么写：

```sql
SELECT title, user_id, create_time FROM article WHERE user_id NOT BETWEEN 1000 AND 2000;
```

## 枚举查询

假如说我们要查询 user_id 是 1、2、3 的文章，可以这么写：

```sql
SELECT title, user_id, create_time FROM article WHERE user_id IN (1, 2, 3);
```

只要匹配到枚举中的任意一个值，就会被查询出来。

![](https://cdn.tobebetterjavaer.com/stutymore/select-where-20240224160209.png)

同样配合 `NOT` 关键字，可以实现枚举查询的取反操作，比如说，我们要查询 user_id 不是 1、2、3 的文章，可以这么写：

```sql
SELECT title, user_id, create_time FROM article WHERE user_id NOT IN (1, 2, 3);
```

## NULL 查询

在[前面讲字段属性](https://javabetter.cn/mysql/column.html)的内容中，我们提到过，NULL 是一个特殊的值，表示未知或者不存在。

我们没办法直接通过 `=` 或者 `!=` 来查询 NULL 值，而是要使用 `IS NULL` 或者 `IS NOT NULL` 来查询。

这里简单解释一下为什么？（面试可能会被问到）

在 SQL 中，NULL 表示一个未知值或缺失值，它不等于空字符串、零或任何其他值。

由于 NULL 是未知的，所以它与任何其他值（包括另一个 NULL）的比较都是未知的。在逻辑上，你不能说一个未知的值等于或不等于另一个未知的值或任何具体的值。

根据 SQL 标准，任何与 NULL 进行比较的操作结果都是 NULL，表示逻辑上的“未知”。这意味着表达式`column = NULL`或`column != NULL`的结果都不是 TRUE 或 FALSE，而是 NULL。

为了解决这个问题，SQL 引入了 IS NULL 和 IS NOT NULL，专门用于检查列是否为 NULL。这些操作符产生的是布尔值（TRUE 或 FALSE），可以直接用在逻辑表达式中。

比如说，我们来查询短标题 short_title 为 NULL 的文章：

```sql
SELECT title, short_title, create_time FROM article WHERE short_title IS NULL;
```

不为 NULL 的文章，可以这么写：

```sql
SELECT title, short_title, create_time FROM article WHERE short_title IS NOT NULL;
```

当然了，为了简化查询，技术派在设计表的时候，尽量避免了使用 NULL，而是使用空字符串或者 0 来代替。

![](https://cdn.tobebetterjavaer.com/stutymore/select-where-20240224162106.png)

这样，当我们要查询 short_title 不为空的文章时，就可以这么写：

```sql
SELECT title, short_title, create_time FROM article WHERE short_title != '';
```

![](https://cdn.tobebetterjavaer.com/stutymore/select-where-20240224162246.png)

不然还要在 SQL 层面做一层对前端查询条件的转换，麻烦。

## 逻辑操作符

除了上面提到的 `AND`、`NOT`，MySQL 还提供了 `OR`、`()` 等用来改变查询条件的逻辑操作符，它们配合起来还可以用来组合多个查询条件。

### AND 操作符

`AND` 操作符用于组合多个查询条件，只有当所有的条件都满足时，才会返回结果。

比如说，我们要查询 user_id 不等于 1 且标题为“聊聊分库分表”的文章，可以这么写：

```sql
SELECT title, user_id, create_time FROM article WHERE user_id != 1 AND title = '聊聊分库分表';
```

![](https://cdn.tobebetterjavaer.com/stutymore/select-where-20240224162931.png)

### OR 操作符

`OR` 操作符用于组合多个查询条件，但只要有一个条件满足，就会返回结果。

ADN 和 OR 其实在编程中也是非常常见的，比如说 Java 中的 `&&` 和 `||`。

[Java 中的逻辑运算符](https://javabetter.cn/basic-grammar/operator.html#_04%E3%80%81%E9%80%BB%E8%BE%91%E8%BF%90%E7%AE%97%E7%AC%A6)

比如说，我们要查询 user_id 等于 1 或者标题为“聊聊分库分表”的文章，可以这么写：

```sql
SELECT title, user_id, create_time FROM article WHERE user_id = 1 OR title = '聊聊分库分表';
```

![](https://cdn.tobebetterjavaer.com/stutymore/select-where-20240224163230.png)

### 优先级操作符

小括号 `()` 操作符用于改变查询条件的优先级，比如说，我们要查询 user_id 不等于 1 且标题为“聊聊分库分表”或者 short_title 不为空的文章，可以这么写：

```sql
SELECT title, user_id, create_time FROM article WHERE user_id != 1 AND (title = '聊聊分库分表' OR short_title != '');
```

对比一下有小括号和没有小括号的查询结果，是完全不一样的，因为逻辑的先后顺序不同，这个大家都能懂：

![](https://cdn.tobebetterjavaer.com/stutymore/select-where-20240224163722.png)

## 通配符查询

有时候，我们并不需要精确查询，模糊查询就够了，那这时候就需要一些通配符来帮我们完成工作 😁。

比如说我们要查询标题中包含“分布式”的文章，可以这么写：

```sql
SELECT title, user_id, create_time FROM article WHERE title LIKE '%分布式%';
```

LIKE 关键字用于模糊查询，之前用到的 `=` 属于精确查询。

MySQL 支持两种通配符，`%` 和 `_`，其中 `%` 用于匹配任意长度的字符串，`_` 用于匹配单个字符。

我们来详细看一下。

### % 通配符

`%` 通配符用于匹配任意长度的字符串，包括零长度，在查询文章标题、用户名等此类字段时，会非常有用。

我们来执行一下之前提到的模糊查询标题带有“分布式”的文章：

![](https://cdn.tobebetterjavaer.com/stutymore/select-where-20240224194056.png)

`%` 通配符可以出现在模式的任何位置，比如说，我们要查询标题以“分布式”开头的文章，可以这么写：

```sql
SELECT title, user_id, create_time FROM article WHERE title LIKE '分布式%';
```

也可以出现在模式的开头，表示以该关键词结尾：

```sql
SELECT title, user_id, create_time FROM article WHERE title LIKE '%分布式';
```

不过，还是以出现在模式的两端最常见。在[技术派实战项目](https://javabetter.cn/zhishixingqiu/paicoding.html)中，我们是通过 MyBatis-Plus 提供的 `like` 方法来实现模糊查询的，它会自动在关键词两端加上 `%`。

![](https://cdn.tobebetterjavaer.com/stutymore/select-where-20240224194442.png)

源码在 SqlUtils 类的 concatLike 方法中，通过判断通配符的位置来拼接通配符 `%`。

![](https://cdn.tobebetterjavaer.com/stutymore/select-where-20240224194714.png)

当然了，有些复杂 SQL MyBatis-Plus 也不一定能满足，这时候就需要我们自己写 SQL 了。

通常会在 Mapper.xml 文件中进行 SQL 语句的定义和拼接，比如说技术派的 admin 端在查询文章的时候，就是通过自定义 SQL 来实现模糊查询的。

![](https://cdn.tobebetterjavaer.com/stutymore/select-where-20240224202214.png)

注意看这行 SQL：

```xml
<if test="searchParams.title != null and searchParams.title != ''">
    and a.title like concat('%', #{searchParams.title}, '%')
</if>
```

如果 searchParams.title 不为空，就会拼接 `%` 通配符，实现模糊查询。

其中的 concat 方法是 MySQL 的字符串拼接函数。

`#` 是 MyBatis 中参数占位符的标记，用于预处理语句（PreparedStatement）中，以防止 SQL 注入攻击。当使用`#{}`来包裹一个参数时，MyBatis 会在执行 SQL 之前将该参数的值安全地填充到 SQL 语句中。

注意，这是一个考点。在面试中，可能会被问到 `#` 和 `$` 的区别。

`$` 也是 MyBatis 中参数占位符的标记，用于直接拼接 SQL 语句，不会进行预处理。当使用`${}`来包裹一个参数时，MyBatis 会直接将该参数的值拼接到 SQL 语句中。

`#{}` 和 `${}` 的区别在于，`#{}` 是预处理，会对参数进行安全处理，而 `${}` 是直接拼接，不会对参数进行处理。

### MyBatis 中的 # 和 $

我们这里稍微拓展一丢丢，假如 mapper.xml 文件中的 SQL 语句是这样的：

```xml
select * from user where name = #{name};
```

那么它将被解析为：

```sql
select * from user where name = ?;
```

一个 `#{}` 会被解析为一个参数占位符 `?`。

而如果 xml 中的 SQL 语句是这样的：

```xml
select * from user where name = '${name}';
```

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