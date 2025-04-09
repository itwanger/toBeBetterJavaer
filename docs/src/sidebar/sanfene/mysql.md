---
title: MySQL面试题，84道MySQL八股文（4.4万字101张手绘图），面渣逆袭必看👍
shortTitle: 面渣逆袭-MySQL
description: 下载次数超 1 万次，4.4 万字 101 张手绘图，详解 84 道 MySQL 面试高频题（让天下没有难背的八股），面渣背会这些 MySQL 八股文，这次吊打面试官，我觉得稳了（手动 dog）。
date: 2025-02-27
author: 三分恶
category:
  - 面渣逆袭
tag:
  - 面渣逆袭
head:
  - - meta
    - name: keywords
      content: MySQL面试题,MySQL,mysql,面试题,八股文
---


![面渣逆袭并发编程篇封面图](https://cdn.tobebetterjavaer.com/stutymore/javathread-mianzhanixi-thread.jpg)

## 前言

4.4 万字 101 张手绘图，详解 84 道 MySQL 面试高频题（让天下没有难背的八股），面渣背会这些 MySQL 八股文，这次吊打面试官，我觉得稳了（手动 dog）。整理：沉默王二，戳[转载链接](https://mp.weixin.qq.com/s/JFjFs_7xduCmHOegbJ-Gbg)，作者：三分恶，戳[原文链接](https://mp.weixin.qq.com/s/zSTyZ-8CFalwAYSB0PN6wA)。

亮白版本更适合拿出来打印，这也是很多学生党喜欢的方式，打印出来背诵的效率会更高。

![面渣逆袭MySQL篇.pdf第二版](https://cdn.tobebetterjavaer.com/stutymore/javathread-20250226112951.png)

2025 年 02 月 27 日开始着手第二版更新。

- 对于高频题，会标注在《[Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)》中出现的位置，哪家公司，原题是什么；如果你想节省时间的话，可以优先背诵这些题目，尽快做到知彼知己，百战不殆。
- 结合项目（[技术派](https://javabetter.cn/zhishixingqiu/paicoding.html)、[pmhub](https://javabetter.cn/zhishixingqiu/pmhub.html)）来组织语言，让面试官最大程度感受到你的诚意，而不是机械化的背诵。
- 修复第一版中出现的问题，包括球友们的私信反馈，网站留言区的评论，以及 [GitHub 仓库](https://github.com/itwanger/toBeBetterJavaer/issues)中的 issue，让这份面试指南更加完善。
- 优化排版，增加手绘图，重新组织答案，使其更加口语化，从而更贴近面试官的预期。


![面渣逆袭已经提交 1479 次 GitHub 记录](https://cdn.tobebetterjavaer.com/stutymore/javathread-20250122093837.png)

由于 PDF 没办法自我更新，所以需要最新版的小伙伴，可以微信搜【**沉默王二**】，或者扫描/长按识别下面的二维码，关注二哥的公众号，回复【**222**】即可拉取最新版本。

<div style="text-align: center; margin: 20px 0;">
    <img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png" alt="微信扫码或者长按识别，或者微信搜索“沉默王二”" style="max-width: 100%; height: auto;  border-radius: 10px;" />
</div>

百度网盘、阿里云盘、夸克网盘都可以下载到最新版本，我会第一时间更新上去。

![回复 222](https://cdn.tobebetterjavaer.com/stutymore/javase-20241230171125.png)

当然了，请允许我的一点点私心，那就是星球的 PDF 版本会比公众号早一个月时间，毕竟星球用户都付费过了，我有必要让他们先享受到一点点福利。相信大家也都能理解，毕竟在线版是免费的，CDN、服务器、域名、OSS 等等都是需要成本的。

更别说我付出的时间和精力了。

展示一下暗黑版本的 PDF 吧，排版清晰，字体优雅，更加适合夜服，晚上看会更舒服一点。

![面渣逆袭MySQL篇.pdf暗黑版](https://cdn.tobebetterjavaer.com/stutymore/javathread-20250226113113.png)

## MySQL 基础

### 🌟0.什么是 MySQL？

MySQL 是一个开源的关系型数据库，现在隶属于 Oracle 公司。是我们国内使用频率最高的一种数据库，我在本地安装的是最新的 8.3 版本。

![二哥的 Java 进阶之路：MySQL 8.3 最新版本](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250227062838.png)

#### 怎么删除/创建一张表？

可以使用 `DROP TABLE` 来删除表，使用 `CREATE TABLE` 来创建表。

创建表的时候，可以通过 `PRIMARY KEY` 设定主键。

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    PRIMARY KEY (id)
);
```

#### 请写一个升序/降序的 SQL 语句？

在 SQL 中，可以使用 `ORDER BY` 子句来对查询结果进行升序或者降序。默认情况下，查询结果是升序的，如果需要降序，可以通过 `DESC` 关键字来实现。

比如说在员工表中，我们要按工资降序，就可以使用 `ORDER BY salary DESC` 来完成：

```sql
SELECT id, name, salary
FROM employees
ORDER BY salary DESC;
```

如果需对多个字段进行排序，例如按工资降序，按名字升序，就可以 `ORDER BY salary DESC, name ASC` 来完成：

```sql
SELECT id, name, salary
FROM employees
ORDER BY salary DESC, name ASC;
```

#### MySQL出现性能差的原因有哪些？

可能是 SQL 查询使用了全表扫描，也可能是查询语句过于复杂，如多表 JOIN 或嵌套子查询。

也有可能是单表数据量过大。

通常情况下，添加索引就能解决大部分性能问题。对于一些热点数据，还可以通过增加 Redis 缓存，来减轻数据库的访问压力。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 1 Java 后端技术一面面试原题：你平时用到的数据库
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯云智面经同学 16 一面面试原题：数据库用过哪些，对哪个比较熟？
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的 360 面经同学 3 Java 后端技术一面面试原题：用过哪些数据库
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的招商银行面经同学 6 招银网络科技面试原题：了解 MySQL、Redis 吗？
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的国企零碎面经同学 9 面试原题：数据库用什么多（说了 Mysql 和 Redis）
> 6. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的vivo 面经同学 10 技术一面面试原题：怎么删除/创建一张表和设定主键
，举例用sql实现升序降序
> 7. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的滴滴面经同学 3 网约车后端开发一面原题：MySQL性能慢的原因

### 1.两张表怎么进行连接？

可以通过内连接 `inner join`、外连接 `outer join`、交叉连接 `cross join` 来合并多个表的查询结果。

#### 什么是内连接？

内连接用于返回两个表中有匹配关系的行。假设有两张表，用户表和订单表，想查询有订单的用户，就可以使用内连接 `users INNER JOIN orders`，按照用户 ID 关联就行了。

```sql
SELECT users.name, orders.order_id
FROM users
INNER JOIN orders ON users.id = orders.user_id;
```

只有那些在两个表中都存在 user_id 的记录才会出现在查询结果中。

#### 什么是外连接？

和内连接不同，外连接不仅返回两个表中匹配的行，还返回没有匹配的行，用 `null` 来填充。

外连接又分为左外连接 `left join` 和右外连接 `right join`。

left join 会保留左表中符合条件的所有记录，如果右表中有匹配的记录，就返回匹配的记录，否则就用 null 填充，常用于某表中有，但另外一张表中可能没有的数据的查询场景。

假设要查询所有用户及他们的订单，即使用户没有下单，就可以使用左连接：

```sql
SELECT users.id, users.name, orders.order_id
FROM users
LEFT JOIN orders ON users.id = orders.user_id;
```

查询前：

users|	orders
---|---
id|	name|	user_id
1|	王二|	1
2|	张三|	2
3|	李四|	无

查询后：

id|	name|	order_id
---|---|---
1|	王二|	10
2|	张三|	20
3|	李四|	null

右连接就是左连接的镜像，right join 会保留右表中符合条件的所有记录，如果左表中有匹配的记录，就返回匹配的记录，否则就用 null 填充。

#### 什么是交叉连接？

交叉连接会返回两张表的笛卡尔积，也就是将左表的每一行与右表的每一行进行组合，返回的行数是两张表行数的乘积。

假设有 A 表和 B 表，A 表有 2 行数据，B 表有 3 行数据，那么交叉连接的结果就是 2 ✖️ 3 = 6 行。

```sql
SELECT A.id, B.id
FROM A
CROSS JOIN B;
```

笛卡尔积是数学中的一个概念，例如集合 `A={a,b}`，集合 `B={0,1,2}`，那么 A✖️B=`{<a,0>,<a,1>,<a,2>,<b,0>,<b,1>,<b,2>,}`。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的用友面试原题：两张表怎么进行连接

### 2.内连接、左连接、右连接有什么区别？

MySQL 的连接主要分为内连接和外连接，外连接又可以分为左连接和右连接。

![MySQL 内连接、左连接、右连接-来源菜鸟教程](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-fcdaad5f-c50e-4834-9f9a-0b676cc6be83.jpg)

内连接可以用来找出两个表中共同的记录，相当于两个数据集的交集。

左连接和右连接可以用来找出两个表中不同的记录，相当于两个数据集的并集。两者的区别是，左连接会保留左表中符合条件的所有记录，右连接则刚好相反。

拿[技术派实战项目](https://javabetter.cn/zhishixingqiu/paicoding.html)的表为例来详细验证下。

有三张表，一张文章表 article，主要存文章标题 title， 一张文章详情表 article_detail，主要存文章的内容 content，一张文章评论表 comment，主要存评论 content，三个表通过文章 id 关联。

先来看内连接：

```sql
SELECT LEFT(a.title, 20) AS ArticleTitle, LEFT(c.content, 20) AS CommentContent
FROM article a
INNER JOIN comment c ON a.id = c.article_id
LIMIT 2;
```

![技术派实战项目：内连接的结果](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240308184454.png)

返回至少有一条评论的文章标题和评论内容（前 20 个字符），只返回符合条件的前 2 条记录。

再来看做连接：

```sql
SELECT LEFT(a.title, 20) AS ArticleTitle, LEFT(c.content, 20) AS CommentContent
FROM article a
LEFT JOIN comment c ON a.id = c.article_id
LIMIT 2;
```

![技术派实战项目：做连接查询结果](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240308184901.png)

返回所有文章的标题和文章评论，即使某些文章没有评论（填充为 NULL）。

最后来看右连：

```sql
SELECT LEFT(a.title, 20) AS ArticleTitle, LEFT(c.content, 20) AS CommentContent
FROM comment c
RIGHT JOIN article a ON a.id = c.article_id
LIMIT 2;
```

![技术派实战项目：右连接查询结果](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240308185525.png)

> 1.  [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯 Java 后端实习一面原题：请说说 MySQL 的内联、左联、右联的区别。

memo：2025 年 2 月 27 日修改至此。给大家看[一条球友的面经](https://t.zsxq.com/1g4gI)，基本上都是面渣逆袭中常见的八股，所以只要能把面渣中的高频题拿下，面试 OC 的概率真的很大，真心话。

![二哥编程星球的球友：小赢科技 OC了](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250227084922.png)

### 3.说一下数据库的三大范式？

![三分恶面渣逆袭：数据库三范式](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-16e74a6b-a42a-464e-9b10-0252ee7ecc6e.jpg)

第一范式，确保表的每一列都是不可分割的基本数据单元，比如说用户地址，应该拆分成省、市、区、详细地址等 4 个字段。

![Ruthless：第一范式](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240418093235.png)

第二范式，要求表中的每一列都和主键直接相关。比如在订单表中，商品名称、单位、商品价格等字段应该拆分到商品表中。

![Ruthless：不符合第二范式](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240418093351.png)

然后新建一个订单商品关联表，用订单编号和商品编号进行关联就好了。

![Ruthless：订单商品关联表](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240418093726.png)

第三范式，非主键列应该只依赖于主键列。比如说在设计订单信息表的时候，可以把客户名称、所属公司、联系方式等信息拆分到客户信息表中，然后在订单信息表中用客户编号进行关联。

![Ruthless：第三范式](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240418094332.png)

#### 建表的时候需要考虑哪些问题？

首先需要考虑表是否符合数据库的三大范式，确保字段不可再分，消除非主键依赖，确保字段仅依赖于主键等。

然后在选择字段类型时，应该尽量选择合适的数据类型。

在字符集上，尽量选择 utf8mb4，这样不仅可以支持中文和英文，还可以支持表情符号等。

当数据量较大时，比如上千万行数据，需要考虑分表。比如订单表，可以采用水平分表的方式来分散单表存储压力。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 13 Java 后端二面面试原题：什么是三大范式，为什么要有三大范式，什么场景下不用遵循三大范式，举一个场景
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的京东面经同学 5 Java 后端技术一面面试原题：建表考虑哪些问题

### 4.varchar 与 char 的区别？

varchar 是可变长度的字符类型，原则上最多可以容纳 65535 个字符，但考虑字符集，以及 MySQL 需要 1 到 2 个字节来表示字符串长度，所以实际上最大可以设置到 65533。

>latin1 字符集，且列属性定义为 NOT NULL。

![三分恶面渣逆袭：varchar和 char](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-40f42d59-a295-4543-8a03-43925da4d6d9.jpg)

char 是固定长度的字符类型，当定义一个 `CHAR(10)` 字段时，不管实际存储的字符长度是多少，都只会占用 10 个字符的空间。如果插入的数据小于 10 个字符，剩余的部分会用空格填充。

值|	CHAR(4)|	存储需求（字节）|	VARCHAR(4)|	存储需求（字节）
---|---|---|---|---
''|	'    '|	4|	''|	1
'ab'|	'ab   '|	4|	'ab'|	3
'abcd'|	'abcd'|	4|	'abcd'|	5
'abcdefgh'|	'abcd'|	4|	'abcd'|	5

### 5.blob 和 text 有什么区别？

blob 用于存储二进制数据，比如图片、音频、视频、文件等；但实际开发中，我们都会把这些文件存储到 OSS 或者文件服务器上，然后在数据库中存储文件的 URL。

text 用于存储文本数据，比如文章、评论、日志等。

>memo：2025 年 2 月 28 日修改至此。今天有球友反馈拿到了理想汽车的补录 offer， 真的恭喜了！

![别问，问就是给的薪资待遇很 ok](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250301165545.png)

### 6.DATETIME 和 TIMESTAMP 有什么区别？

DATETIME 直接存储日期和时间的完整值，与时区无关。

TIMESTAMP 存储的是 Unix 时间戳，1970-01-01 00:00:01 UTC 以来的秒数，受时区影响。

![三分恶面渣逆袭：DATETIME 和 TIMESTAMP](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-d94e5e1c-2614-4b8b-acdb-efb333032854.jpg)

另外，DATETIME 的默认值为 null，占用 8 个字节；TIMESTAMP 的默认值为当前时间——CURRENT_TIMESTAMP，占 4 个字节，实际开发中更常用，因为可以自动更新。

![二哥的 Java 进阶之路：更新时不用 set 更新时间](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250301170530.png)

### 7.in 和 exists 的区别？

当使用 IN 时，MySQL 会首先执行子查询，然后将子查询的结果集用于外部查询的条件。这意味着子查询的结果集需要全部加载到内存中。

而 EXISTS 会对外部查询的每一行，执行一次子查询。如果子查询返回任何行，则 `EXISTS` 条件为真。`EXISTS` 关注的是子查询是否返回行，而不是返回的具体值。

```sql
-- IN 的临时表可能成为性能瓶颈
SELECT * FROM users 
WHERE id IN (SELECT user_id FROM orders WHERE amount > 100);

-- EXISTS 可以利用关联索引
SELECT * FROM users u
WHERE EXISTS (SELECT 1 FROM orders o 
            WHERE o.user_id = u.id AND o.amount > 100);
```

`IN` 适用于子查询结果集较小的情况。如果子查询返回大量数据，`IN` 的性能可能会下降，因为它需要将整个结果集加载到内存。

而 EXISTS 适用于子查询结果集可能很大的情况。由于 `EXISTS` 只需要判断子查询是否返回行，而不需要加载整个结果集，因此在某些情况下性能更好，特别是当子查询可以使用索引时。


#### NULL值陷了解吗？

`IN`: 如果子查询的结果集中包含 `NULL` 值，可能会导致意外的结果。例如，`WHERE column IN (subquery)`，如果 `subquery` 返回 `NULL`，则 `column IN (subquery)` 永远不会为真，除非 `column` 本身也为 `NULL`。

`EXISTS`: 对 `NULL` 值的处理更加直接。`EXISTS` 只是检查子查询是否返回行，不关心行的具体值，因此不受 `NULL` 值的影响。

memo：2025 年 3 月 1 日修改至此。

### 8.记录货币用什么类型比较好？

如果是电商、交易、账单等涉及货币的场景，建议使用 DECIMAL 类型，因为 DECIMAL 类型是精确数值类型，不会出现浮点数计算误差。

例如，`DECIMAL(19,4)` 可以存储最多 19 位数字，其中 4 位是小数。

```sql
CREATE TABLE orders (
    id INT AUTO_INCREMENT,
    amount DECIMAL(19,4),
    PRIMARY KEY (id)
);
```

如果是银行，涉及到支付的场景，建议使用 BIGINT 类型。可以将货币金额乘以一个固定因子，比如 100，表示以“分”为单位，然后存储为 `BIGINT`。这种方式既避免了浮点数问题，同时也提供了不错的性能。但在展示的时候需要除以相应的因子。

#### 为什么不推荐使用 FLOAT 或 DOUBLE？

因为 FLOAT 和 DOUBLE 都是浮点数类型，会存在精度问题。

在许多编程语言中，`0.1 + 0.2` 的结果会是类似 `0.30000000000000004` 的值，而不是预期的 `0.3`。

### 9.怎么存储 emoji?

因为 emoji（😊）是 4 个字节的 UTF-8 字符，而 MySQL 的 utf8 字符集只支持最多 3 个字节的 UTF-8 字符，所以在 MySQL 中存储 emoji 时，需要使用 utf8mb4 字符集。

```sql
ALTER TABLE mytable CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
``` 

MySQL 8.0 已经默认支持 utf8mb4 字符集，可以通过 `SHOW VARIABLES WHERE Variable_name LIKE 'character\_set\_%' OR Variable_name LIKE 'collation%';` 查看。

![二哥的 Java 进阶之路：查看 MySQL 的默认字符集](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240418103116.png)

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 13 Java 后端二面面试原题：mysql 怎么存 emoji，怎么编码

### 10.drop、delete 与 truncate 的区别？

DROP 是物理删除，用来删除整张表，包括表结构，且不能回滚。

DELETE 支持行级删除，可以带 WHERE 条件，可以回滚。

TRUNCATE 用于清空表中的所有数据，但会保留表结构，不能回滚。

memo：2025 年 3 月 4 日修改至此。给大家传递一个喜报，一位球友拿到了科大讯飞的 offer，这薪资在合肥真的会很香。

![一位球友拿到了科大讯飞的 offer，春招](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250304161556.png)

### 11.UNION 与 UNION ALL 的区别？

UNION 会自动去除合并后结果集中的重复行。UNION ALL 不会去重，会将所有结果集合并起来。

### 12.count(1)、count(\*) 与 count(列名) 的区别？

在 InnoDB 引擎中，`COUNT(1)` 和 `COUNT(*)` 没有区别，都是用来统计所有行，包括 NULL。

如果表有索引，`COUNT(*)` 会直接用索引统计，而不是全表扫描，而 `COUNT(1)` 也会被 MySQL 优化为 `COUNT(*)`。

`COUNT(列名)` 只统计列名不为 NULL 的行数。

```
-- 假设 users 表：
+----+-------+------------+
| id | name  | email      |
+----+-------+------------+
| 1  | 张三  | zhang@xx.com |
| 2  | 李四  | NULL       |
| 3  | 王二  | wang@xx.com |
+----+-------+------------+

-- COUNT(*)
SELECT COUNT(*) FROM users;
-- 结果：3  （统计所有行）

-- COUNT(1)
SELECT COUNT(1) FROM users;
-- 结果：3  （统计所有行）

-- COUNT(email)
SELECT COUNT(email) FROM users;
-- 结果：2  （NULL 不计入统计）
```

这里解释一下，假设有这样一张表：

```sql
CREATE TABLE t1 (
    id INT,
    name VARCHAR(50),
    value INT
);
```

插入的数据为：

```sql
INSERT INTO t1 VALUES 
    (1, 'A', 10),
    (2, 'B', NULL),  -- NULL in value column
    (3, 'C', 30),
    (4, NULL, 40),   -- NULL in name column
    (5, 'E', NULL);  -- NULL in value column
```

因为 id 列没有索引，所以 `select count(*)` 是全表扫描。

![二哥的 Java 进阶之路：count(\*)全表扫描](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250305181629.png)

然后我们给 id 列加上索引。

```sql
alter table t1 add primary key (id);
```

![二哥的 Java 进阶之路：修改t1主键](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250305181907.png)

再来看一下 `select count(*)`，发现用了索引（MySQL 默认为给主键添加索引）。

![二哥的 Java 进阶之路：count(\*)走了索引](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250305182117.png)

另外，MySQL 8.0 官方手册有明确说明，InnoDB 引擎对 `SELECT COUNT(*)` 和 `SELECT COUNT(1)` 的处理方式完全一致，性能并无差异。

![二哥的 Java 进阶之路：MySQL 8.0 官方手册](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250305183220.png)

memo：2025 年 3 月 5 日修改至此。再晒一个喜报给正在刷八股的你，[一位球友](https://javabetter.cn/zhishixingqiu/)拿到了咪咕的大模型应用开发，很不错的方向，恭喜了！给你也加加好运🍀buff，你也加把劲。

![球友拿到了咪咕的大模型开发实习](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250305183751.png)

### 13.SQL 查询语句的执行顺序了解吗？

了解。先执行 FROM 确定主表，再执行 JOIN 连接，然后 WHERE 进行过滤，接着 GROUP BY 进行分组，HAVING 过滤聚合结果，SELECT 选择最终列，ORDER BY 排序，最后 LIMIT 限制返回行数。

WHERE 先执行是为了减少数据量，HAVING 只能过滤聚合数据，ORDER BY 必须在 SELECT 之后排序最终结果，LIMIT 最后执行以减少数据传输。

![博客园数据派：查询语句执行顺序](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250306153200.png)

执行顺序|	SQL 关键字|	作用
---|---|---
①|	FROM|	确定主表，准备数据
②|	ON|	连接多个表的条件
③|	JOIN|	执行 INNER JOIN / LEFT JOIN 等
④|	WHERE|	过滤行数据（提高效率）
⑤|	GROUP BY|	进行分组
⑥|	HAVING|	过滤聚合后的数据
⑦|	SELECT|	选择最终返回的列
⑧|	DISTINCT|	进行去重
⑨|	ORDER BY|	对最终结果排序
⑩|	LIMIT|	限制返回行数

这个执行顺序与编写 SQL 语句的顺序不同，这也是为什么有时候在 SELECT 子句中定义的别名不能在 WHERE 子句中使用得原因，因为 WHERE 是在 SELECT 之前执行的。

#### LIMIT 为什么在最后执行？

因为 LIMIT 是在最终结果集上执行的，如果在 WHERE 之前执行 LIMIT，那么就会先返回所有行，然后再进行 LIMIT 限制，这样会增加数据传输的开销。

#### ORDER BY 为什么在 SELECT 之后执行？

因为排序需要基于最终返回的列，如果 ORDER BY 早于 SELECT 执行，计算 `COUNT(*)` 之类的聚合函数就会出问题。

```sql
SELECT name, COUNT(*) AS order_count
FROM orders
GROUP BY name
ORDER BY order_count DESC;
```

### 14.介绍一下 MySQL 的常用命令（补充）

> 2024 年 03 月 13 日增补。

![二哥的 Java 进阶之路：MySQL常用命令](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240313093551.png)

MySQL 的常用命令主要包括数据库操作命令、表操作命令、行数据 CRUD 命令、索引和约束的创建修改命令、用户和权限管理的命令、事务控制的命令等。

#### 说说数据库操作命令？

`CREATE DATABASE database_name;` 用于创建数据库；`DROP DATABASE database_name;` 用于删除数据库；`SHOW DATABASES;` 用于显示所有数据库；`USE database_name;` 用于切换数据库。

#### 说说表操作命令？

`CREATE TABLE table_name (列名1 数据类型1, 列名2 数据类型2,...);` 用于创建表；`DROP TABLE table_name;` 用于删除表；`SHOW TABLES;` 用于显示所有表；`DESCRIBE table_name;` 用于查看表结构；`ALTER TABLE table_name ADD column_name datatype;` 用于修改表。

#### 说说行数据的 CRUD 命令？

`INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...);` 用于插入数据；`SELECT column_names FROM table_name WHERE condition;` 用于查询数据；`UPDATE table_name SET column1 = value1, column2 = value2 WHERE condition;` 用于更新数据；`DELETE FROM table_name WHERE condition;` 用于删除数据。

#### 说说索引和约束的创建修改命令？

`CREATE INDEX index_name ON table_name (column_name);` 用于创建索引；`ALTER TABLE table_name ADD PRIMARY KEY (column_name);` 用于添加主键；`ALTER TABLE table_name ADD CONSTRAINT fk_name FOREIGN KEY (column_name) REFERENCES parent_table (parent_column_name);` 用于添加外键。

#### 说说用户和权限管理的命令？

`CREATE USER 'username'@'host' IDENTIFIED BY 'password';` 用于创建用户；`GRANT ALL PRIVILEGES ON database_name.table_name TO 'username'@'host';` 用于授予权限；`REVOKE ALL PRIVILEGES ON database_name.table_name FROM 'username'@'host';` 用于撤销权限；`DROP USER 'username'@'host';` 用于删除用户。

#### 说说事务控制的命令？

`START TRANSACTION;` 用于开始事务；`COMMIT;` 用于提交事务；`ROLLBACK;` 用于回滚事务。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的用友金融一面原题：介绍一下 MySQL 的常用命令

### 15.MySQL bin 目录下的可执行文件了解吗（补充）

> 2024 年 03 月 13 日增补

推荐阅读：[MySQL bin 目录下的一些可执行文件](https://javabetter.cn/mysql/bin.html)

了解的。MySQL 的 bin 目录下有很多可执行文件，主要用于管理 MySQL 服务器、数据库、表、数据等。比如说：

- mysql：用于连接 MySQL 服务器
- mysqldump：用于数据库备份，对数据备份、迁移或恢复时非常有用
- mysqladmin：用来执行一些管理操作，比如说创建数据库、删除数据库、查看 MySQL 服务器的状态等。
- mysqlcheck：用于检查、修复、分析和优化数据库表，对数据库的维护和性能优化非常有用。
- mysqlimport：用于从文本文件中导入数据到数据库表中，适合批量数据导入。
- mysqlshow：用于显示 MySQL 数据库服务器中的数据库、表、列等信息。
- mysqlbinlog：用于查看 MySQL 二进制日志文件的内容，可以用于恢复数据、查看数据变更等。

### 16.MySQL 第 3-10 条记录怎么查？（补充）

> 2024 年 03 月 30 日增补

可以使用 limit 语句，结合偏移量和行数来实现。

```sql
SELECT * FROM table_name LIMIT 2, 8;
```

limit 语句用于限制查询结果的数量，偏移量表示从哪条记录开始，行数表示返回的记录数量。

- 2：偏移量，表示跳过前两条记录，从第三条记录开始。
- 8：行数，表示从偏移量开始，返回 8 条记录。

偏移量是从 0 开始的，即第一条记录的偏移量是 0；如果想从第 3 条记录开始，偏移量就应该是 2。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团面经同学 16 暑期实习一面面试原题：MySQL 第 3-10 条记录怎么查？

### 17.用过哪些 MySQL 函数？（补充）

> 2024 年 04 月 12 日增补

用过挺多的，比如说处理字符串的函数：

- `CONCAT()`: 用于连接两个或多个字符串。
- `LENGTH()`: 用于返回字符串的长度。
- `SUBSTRING()`: 从字符串中提取子字符串。
- `REPLACE()`: 替换字符串中的某部分。
- `TRIM()`: 去除字符串两侧的空格或其他指定字符。

实测数据：

```sql
-- 连接字符串
SELECT CONCAT('沉默', ' ', '王二') AS concatenated_string;

-- 获取字符串长度
SELECT LENGTH('沉默 王二') AS string_length;

-- 提取子字符串
SELECT SUBSTRING('沉默 王二', 1, 5) AS substring;

-- 替换字符串内容
SELECT REPLACE('沉默 王二', '王二', 'MySQL') AS replaced_string;

-- 去除字符串两侧的空格
SELECT TRIM('  沉默 王二  ') AS trimmed_string;
```

处理数字的函数：

- `ABS()`: 返回一个数的绝对值。
- `ROUND()`: 四舍五入到指定的小数位数。
- `MOD()`: 返回除法操作的余数。

实测数据：

```sql
-- 返回绝对值
SELECT ABS(-123) AS absolute_value;

-- 四舍五入
SELECT ROUND(123.4567, 2) AS rounded_value;

-- 余数
SELECT MOD(10, 3) AS modulus;
```

日期和时间处理函数：

- `NOW()`: 返回当前的日期和时间。
- `CURDATE()`: 返回当前的日期。

实测数据：

```sql
-- 返回当前日期和时间
SELECT NOW() AS current_date_time;

-- 返回当前日期
SELECT CURDATE() AS current_date;
```

汇总函数：

- `SUM()`: 计算数值列的总和。
- `AVG()`: 计算数值列的平均值。
- `COUNT()`: 计算某列的行数。

实测数据：

```sql
-- 创建一个表并插入数据进行聚合查询
CREATE TABLE sales (
    product_id INT,
    sales_amount DECIMAL(10, 2)
);

INSERT INTO sales (product_id, sales_amount) VALUES (1, 100.00);
INSERT INTO sales (product_id, sales_amount) VALUES (1, 150.00);
INSERT INTO sales (product_id, sales_amount) VALUES (2, 200.00);

-- 计算总和
SELECT SUM(sales_amount) AS total_sales FROM sales;

-- 计算平均值
SELECT AVG(sales_amount) AS average_sales FROM sales;

-- 计算总行数
SELECT COUNT(*) AS total_entries FROM sales;
```

逻辑函数：

- `IF()`: 如果条件为真，则返回一个值；否则返回另一个值。
- `CASE`: 根据一系列条件返回值。

```sql
-- IF函数
SELECT IF(1 > 0, 'True', 'False') AS simple_if;

-- CASE表达式
SELECT CASE WHEN 1 > 0 THEN 'True' ELSE 'False' END AS case_expression;
```

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的华为 OD 面经同学 1 一面面试原题：用过哪些 MySQL 函数？
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的 小公司面经合集好未来测开面经同学 3 测开一面面试原题：知道 MySQL 的哪些函数，如 order by count()

### 18.说说 SQL 的隐式数据类型转换？（补充）

> 2024 年 04 月 25 日增补

当一个整数和一个浮点数相加时，整数会被转换为浮点数。

```sql
SELECT 1 + 1.0; -- 结果为 2.0
```

当一个字符串和一个整数相加时，字符串会被转换为整数。

```sql
SELECT '1' + 1; -- 结果为 2
```

隐式转换会导致意想不到的结果，最好通过显式转换来规避。

```sql
SELECT CAST('1' AS SIGNED INTEGER) + 1; -- 结果为 2
```

实际验证结果：

![二哥的 Java 进阶之路：隐式转换](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240425111246.png)

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小公司面经合集同学 1 Java 后端面试原题：说说 SQL 的隐式数据类型转换？

memo：2025 年 3 月 6 日修改至此。

### 19. 说说 SQL 的语法树解析？（补充）

> 2024 年 09 月 19 日增补

SQL 语法树解析是将 SQL 查询语句转换成抽象语法树 —— AST 的过程，是数据库引擎处理查询的第一步，也是防止 SQL 注入的重要手段。

通常分为 3 个阶段。

第一个阶段，词法分析：拆解 SQL 语句，识别关键字、表名、列名等。

---这部分是帮助大家理解 start，面试中可不背---

比如说：

```sql
SELECT id, name FROM users WHERE age > 18;
```

将会被拆解为：

```
[SELECT] [id] [,] [name] [FROM] [users] [WHERE] [age] [>] [18] [;]
```

---这部分是帮助大家理解 end，面试中可不背---

第二个阶段，语法分析：检查 SQL 是否符合语法规则，并构建抽象语法树。

---这部分是帮助大家理解 start，面试中可不背---

比如说上面的语句会被构建成如下的语法树：

```
          SELECT
         /      \
     Columns     FROM
    /      \      |
  id      name  users
               |
             WHERE
               |
            age > 18
```

或者这样表示：

```
SELECT
 ├── COLUMNS: id, name
 ├── FROM: users
 ├── WHERE
 │    ├── CONDITION: age > 18
```

---这部分是帮助大家理解 end，面试中可不背---

第三个阶段，语义分析：检查表、列是否存在，进行权限验证等。

---这部分是帮助大家理解 start，面试中可不背---

比如说执行：

```sql
SELECT id, name FROM users WHERE age > 'eighteen';
```

会报错：

```
ERROR: Column 'age' is INT, but 'eighteen' is STRING.
```

---这部分是帮助大家理解 end，面试中可不背---


> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 21 抖音商城一面面试原题：sql的语法树解析

memo：2025 年 3 月 7 日 修改至此。再晒一个 offer，一位球友拿到了经纬恒润的实习 offer，并且直言面试了很多场，我说超过 5 次的题目基本上都碰到了，啥都别说了，面渣逆袭 YYDS。

![球友拿到了经纬恒润的实习 offer](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250308085803.png)

## 数据库架构

### 20.说说 MySQL 的基础架构？

MySQL 采用分层架构，主要包括连接层、服务层、和存储引擎层。

![三分恶面渣逆袭：MySQL 的基础架构](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-77626fdb-d2b0-4256-a483-d1c60e68d8ec.jpg)

①、连接层主要负责客户端连接的管理，包括验证用户身份、权限校验、连接管理等。可以通过数据库连接池来提升连接的处理效率。

②、服务层是 MySQL 的核心，主要负责查询解析、优化、执行等操作。在这一层，SQL 语句会经过解析、优化器优化，然后转发到存储引擎执行，并返回结果。这一层包含查询解析器、优化器、执行计划生成器、日志模块等。

③、存储引擎层负责数据的实际存储和提取。MySQL 支持多种存储引擎，如 InnoDB、MyISAM、Memory 等。

#### binlog写入在哪一层？

binlog 在服务层，负责记录 SQL 语句的变化。它记录了所有对数据库进行更改的操作，用于数据恢复、主从复制等。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 21  抖音商城一面面试原题：mysql分为几层？binlog写入在哪一层

### 21.一条查询语句是如何执行的？

当我们执行一条 SELECT 语句时，MySQL 并不会直接去磁盘读取数据，而是经过 6 个步骤来解析、优化、执行，然后再返回结果。

![二哥的 Java 进阶之路：SQL 执行](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240415102041.png)

第一步，客户端发送 SQL 查询语句到 MySQL 服务器。

第二步，MySQL 服务器的连接器开始处理这个请求，跟客户端建立连接、获取权限、管理连接。

第三步，解析器对 SQL 语句进行解析，检查语句是否符合 SQL 语法规则，确保数据库、表和列都是存在的，并处理 SQL 语句中的名称解析和权限验证。

第四步，优化器负责确定 SQL 语句的执行计划，这包括选择使用哪些索引，以及决定表之间的连接顺序等。

第五步，执行器会调用存储引擎的 API 来进行数据的读写。

第六步，存储引擎负责查询数据，并将执行结果返回给客户端。客户端接收到查询结果，完成这次查询请求。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团面经同学 2 Java 后端技术一面面试原题：MySQL 执行语句的整个过程了解吗？
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团面经同学 18 成都到家面试原题：mysql一条数据的查询过程
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学19番茄小说一面面试原题：MySQL中一条SQL的执行流程

memo：2025 年 3 月 8 日修改至此。

### 22.一条更新语句是如何执行的？

总的来说，一条 UPDATE 语句的执行过程包括读取数据页、加锁解锁、事务提交、日志记录等多个步骤。

![三分恶面渣逆袭：update 执行](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-812fb038-39de-4204-ac9f-93d8b7448a18.jpg)

拿 `update test set a=1 where id=2` 举例来说：

在事务开始前，MySQL 需要记录undo log，用于事务回滚。

操作|id|旧值|新值
---|---|---|---
update|2|N|1

除了记录 undo log，存储引擎还会将更新操作写入 redo log，状态标记为 prepare，并确保 redo log 持久化到磁盘。这一步可以保证即使系统崩溃，数据也能通过 redo log 恢复到一致状态。

写完 redo log 后，MySQL 会获取行锁，将 a 的值修改为 1，标记为脏页，此时数据仍然在内存的 buffer pool 中，不会立即写入磁盘。后台线程会在适当的时候将脏页刷盘，以提高性能。

最后提交事务，redo log 中的记录被标记为 committed，行锁释放。

如果 MySQL 开启了 binlog，还会将更新操作记录到 binlog 中，主要用于主从复制。

以及数据恢复，可以结合 redo log 进行点对点的恢复。binlog 的写入通常发生在事务提交时，与 redo log 共同构成“两阶段提交”，确保两者的一致性。

注意，redo log 的写入有两个阶段的提交，一是 binlog 写入之前`prepare` 状态的写入，二是 binlog 写入之后 `commit` 状态的写入。

memo：2025 年 3 月 9 日修改至此。

### 23.说说 MySQL 的段区页行（补充）

> 2024 年 04 月 26 日增补

推荐阅读：[了解 MySQL的数据行、行溢出机制吗？](https://www.cnblogs.com/ZhuChangwu/p/14035330.html)

MySQL 是以表的形式存储数据的，而表空间的结构则由段、区、页、行组成。

![不要迷恋发哥：段、区、页、行](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240515110034.png)

①、段：表空间由多个段组成，常见的段有数据段、索引段、回滚段等。

创建索引时会创建两个段，数据段和索引段，数据段用来存储叶子节点中的数据；索引段用来存储非叶子节点的数据。

回滚段包含了事务执行过程中用于数据回滚的旧数据。

②、区：段由一个或多个区组成，区是一组连续的页，通常包含 64 个连续的页，也就是 1M 的数据。

使用区而非单独的页进行数据分配可以优化磁盘操作，减少磁盘寻道时间，特别是在大量数据进行读写时。

③、页：页是 InnoDB 存储数据的基本单元，标准大小为 16 KB，索引树上的一个节点就是一个页。

也就意味着数据库每次读写都是以 16 KB 为单位的，一次最少从磁盘中读取 16KB 的数据到内存，一次最少写入 16KB 的数据到磁盘。

④、行：InnoDB 采用行存储方式，意味着数据按照行进行组织和管理，行数据可能有多个格式，比如说 COMPACT、REDUNDANT、DYNAMIC 等。

MySQL 8.0 默认的行格式是 DYNAMIC，由COMPACT 演变而来，意味着这些数据如果超过了页内联存储的限制，则会被存储在溢出页中。

可以通过 `show table status like '%article%'` 查看行格式。

![二哥的 Java 进阶之路：行格式](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240515123301.png)

<MZNXQRcodeBanner />    

## 存储引擎

### 24.MySQL 有哪些常见存储引擎？

MySQL 支持多种存储引擎，常见的有 MyISAM、InnoDB、MEMORY 等。

---这部分是帮助大家理解 start，面试中可不背---

![二哥的 Java 进阶之路：存储引擎](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240408073338.png)

我来做一个表格对比：

| 功能          | InnoDB | MyISAM | MEMORY |
| ------------- | ------ | ------ | ------ |
| 支持事务      | Yes    | No     | No     |
| 支持全文索引  | Yes    | Yes    | No     |
| 支持 B+树索引 | Yes    | Yes    | Yes    |
| 支持哈希索引  | Yes    | No     | Yes    |
| 支持外键      | Yes    | No     | No     |

---这部分是帮助大家理解 end，面试中可不背---

除此之外，我还了解到：

①、MySQL 5.5 之前，默认存储引擎是 MyISAM，5.5 之后是 InnoDB。

②、InnoDB 支持的哈希索引是自适应的，不能人为干预。

③、InnoDB 从 MySQL 5.6 开始，支持全文索引。

④、InnoDB 的最小表空间略小于 10M，最大表空间取决于页面大小。

![MySQL 官网：innodb-limits.html](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240408074630.png)

#### 如何切换 MySQL 的数据引擎？

可以通过 alter table 语句来切换 MySQL 的数据引擎。

```sql
ALTER TABLE your_table_name ENGINE=InnoDB;
```

不过不建议，应该提前设计好到底用哪一种存储引擎。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 1 Java 后端技术一面面试原题：MySQL 支持哪些存储引擎?
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的用友面试原题：innodb 引擎和 hash 引擎有什么区别
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的国企零碎面经同学 9 面试原题：MySQL 的存储引擎
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的京东同学 4 云实习面试原题：mysql的数据引擎有哪些, 区别(innodb,MyISAM,Memory)
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的阿里系面经同学 19 饿了么面试原题：存储引擎介绍

memo：2025 年 3 月 10 日修改至此。

### 25.存储引擎应该怎么选择？

大多数情况下，使用默认的 InnoDB 就可以了，InnoDB 可以提供事务、行级锁、外键、B+ 树索引等能力。

MyISAM 适合读多写少的场景。

MEMORY 适合临时表，数据量不大的情况。因为数据都存放在内存，所以速度非常快。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的快手同学 2 一面面试原题：MySQL的InnoDB特点？为什么用B+树？而不是B树，区别？

### 26.InnoDB 和 MyISAM 主要有什么区别？

InnoDB 和 MyISAM 的最大区别在于事务支持和锁机制。InnoDB 支持事务、行级锁，适合大多数业务系统；而 MyISAM 不支持事务，用的是表锁，查询快但写入性能差，适合读多写少的场景。

![三分恶面渣逆袭：InnoDB 和 MyISAM 主要有什么区别](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-b7aa040e-a3a7-4133-8c43-baccc3c8d012.jpg)

另外，从存储结构上来说，MyISAM 用三种格式的文件来存储，.frm 文件存储表的定义；.MYD 存储数据；.MYI 存储索引；而 InnoDB 用两种格式的文件来存储，.frm 文件存储表的定义；.ibd 存储数据和索引。

从索引类型上来说，MyISAM 为非聚簇索引，索引和数据分开存储，索引保存的是数据文件的指针。

![未见初墨：MyIsam](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240403130104.png)

InnoDB 为聚簇索引，索引和数据不分开。

![yangh124：InnoDB](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240403130508.png)

更细微的层面上来讲，MyISAM 不支持外键，可以没有主键，表的具体行数存储在表的属性中，查询时可以直接返回；InnoDB 支持外键，必须有主键，具体行数需要扫描整个表才能返回，有索引的情况下会扫描索引。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 1 Java 后端技术一面面试原题：MyISAM 和 InnoDB 的区别有哪些？
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团同学 9 一面面试原题：mysql存储的数据都是什么样的？

memo：2025 年 3 月 11 日修改至此。

### 27. InnoDB 的 Buffer Pool了解吗？（补充）

> 2024 年 11 月 04 日增补

Buffer Pool 是 InnoDB 存储引擎中的一个内存缓冲区，它会将经常使用的数据页、索引页加载进内存，读的时候先查询 Buffer Pool，如果命中就不用访问磁盘了。

![Nuwan Weerasinhge：MySQL InnoDB Buffer Pool](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250312083102.png)

如果没有命中，就从磁盘读取，并加载到 Buffer Pool，此时可能会触发页淘汰，将不常用的页移出 Buffer Pool。

![极客时间：改良的 LRU 算法](https://cdn.tobebetterjavaer.com/stutymore/mysql-20241104202752.png)

写操作时不会直接写入磁盘，而是先修改内存中的页，此时页被标记为脏页，后台线程会定期将脏页刷新到磁盘。

Buffer Pool 可以显著减少磁盘的读写次数，从而提升 MySQL 的读写性能。

#### Buffer Pool 的默认大小是多少？

我本机上 InnoDB 的 Buffer Pool 默认大小是 128MB。

```sql
SHOW VARIABLES LIKE 'innodb_buffer_pool_size';
```

另外，在具有 1GB-4GB RAM 的系统上，默认值为系统 RAM 的 25%；在具有超过 4GB RAM 的系统上，默认值为系统 RAM 的 50%，但不超过 4GB。

![二哥的 Java 进阶之路：buffer_pool 的默认大小](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250312084307.png)

#### InnoDB 对 LRU 算法的优化了解吗？

了解，InnoDB 对 LRU 算法进行了改良，最近访问的数据并不直接放到 LRU 链表的头部，而是放在一个叫 midpoiont 的位置。默认情况下，midpoint 位于 LRU 列表的 5/8 处。

![smartkeyerror：InnoDB 的 LRU](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250312085209.png)

比如 Buffer Pool 有 100 页，新页插入的位置大概是在第 80 页；当页数据被频繁访问后，再将其移动到 young 区，这样做的好处是热点页能长时间保留在内存中，不容易被挤出去。

----这部分是帮助大家理解 start，面试中可不背----

可以通过 `innodb_old_blocks_pct` 参数来调整 Buffer Pool 中 old 和 young 区的比例；通过 `innodb_old_blocks_time` 参数来调整页在 young 区的停留时间。

![二哥的 Java 进阶之路：对 buffer pool 进行调整](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250312093325.png)

默认情况下，LRU 链表中 old 区占 37%；同一页再次访问提升的最小时间间隔是 1000 毫秒。

也就是说，如果某页在 1 秒内被多次访问，只会计算一次，不会立刻升级为热点页，防止短时间批量访问导致缓存污染。

----这部分是帮助大家理解 end，面试中可不背----

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团面经同学 15 点评后端技术面试原题：说说 bufferpool

<MZNXQRcodeBanner />

memo：2025 年 3 月 12 日修改至此。继续给大家一个喜报，今天[有球友报喜](https://javabetter.cn/zhishixingqiu/)说社招拿到了京东和美团的 offer，后续补充说滴滴也过了，我只能说太强了呀。

![今天有球友拿到京东和美团的 offer](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250312172018.png)

## 日志

### 28.MySQL 日志文件有哪些？

有 6 大类，其中错误日志用于问题诊断，慢查询日志用于 SQL 性能分析，general log 用于记录所有的 SQL 语句，binlog 用于主从复制和数据恢复，redo log 用于保证事务持久性，undo log 用于事务回滚和 MVCC。

![三分恶面渣逆袭：MySQL的主要日志](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-c0ef6e68-bb33-48fc-b3a2-b9cdadd8e403.jpg)

----这部分是帮助大家理解 start，面试中可不背----

①、**错误日志**（Error Log）：记录 MySQL 服务器启动、运行或停止时出现的问题。

②、**慢查询日志**（Slow Query Log）：记录执行时间超过 long_query_time 值的所有 SQL 语句。这个时间值是可配置的，默认情况下，慢查询日志功能是关闭的。

③、**一般查询日志**（General Query Log）：记录 MySQL 服务器的启动关闭信息，客户端的连接信息，以及更新、查询的 SQL 语句等。

④、**二进制日志**（Binary Log）：记录所有修改数据库状态的 SQL 语句，以及每个语句的执行时间，如 INSERT、UPDATE、DELETE 等，但不包括 SELECT 和 SHOW 这类的操作。

⑤、**重做日志**（Redo Log）：记录对于 InnoDB 表的每个写操作，不是 SQL 级别的，而是物理级别的，主要用于崩溃恢复。

⑥、**回滚日志**（Undo Log，或者叫事务日志）：记录数据被修改前的值，用于事务的回滚。

----这部分是帮助大家理解 end，面试中可不背----

#### 请重点说说 binlog？

推荐阅读：[带你了解 MySQL Binlog 不为人知的秘密](https://www.cnblogs.com/rickiyang/p/13841811.html)

binlog 是一种物理日志，会在磁盘上记录数据库的所有修改操作。

如果误删了数据，就可以使用 binlog 进行回退到误删之前的状态。

```sql
# 步骤1：恢复全量备份
mysql -u root -p < full_backup.sql
# 步骤2：应用Binlog到指定时间点
mysqlbinlog --start-datetime="2025-03-13 14:00:00" --stop-datetime="2025-03-13 15:00:00" binlog.000001 | mysql -u root -p
```

如果要搭建主从复制，就可以让从库定时读取主库的 binlog。

MySQL 提供了三种格式的 binlog：Statement、Row 和 Mixed，分别对应 SQL 语句级别、行级别和混合级别，默认为行级别。

![二哥的 Java 进阶之路：MySQL 默认的 binlog格式](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250313151551.png)

从后缀名上来看，binlog 文件分为两类：以 .index 结尾的索引文件，以 .00000\* 结尾的二进制日志文件。

binlog 默认是没有启用的。

生产环境中是一定要启用的，可以通过在 my.cnf 文件中配置 log_bin 参数，以启用 binlog。

```
log_bin = mysql-bin #开启binlog

#mysql-bin.*日志文件最大字节（单位：字节）
#设置最大100MB
max_binlog_size=104857600

#设置了只保留7天BINLOG（单位：天）
expire_logs_days = 7

#binlog日志只记录指定库的更新
#binlog-do-db=db_name

#binlog日志不记录指定库的更新
#binlog-ignore-db=db_name

#写缓冲多少次，刷一次磁盘，默认0
sync_binlog=0
```

#### binlog 的配置参数都了解哪些？

`log_bin = mysql-bin` 用于启用 binlog，这样就可以在 MySQL 的数据目录中找到 db-bin.000001、db-bin.000002 等日志文件。

![二哥的 Java 进阶之路：binlog 文件](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240417074049.png)

`max_binlog_size=104857600` 用于设置每个 binlog 文件的大小，不建议设置太大，网络传送起来比较麻烦。

当 binlog 文件达到 max_binlog_size 时，MySQL 会关闭当前文件并创建一个新的 binlog 文件。

`expire_logs_days = 7` 用于设置 binlog 文件的自动过期时间为 7 天。过期的 binlog 文件会被自动删除。防止长时间累积的 binlog 文件占用过多存储空间，[技术派实战项目](https://javabetter.cn/zhishixingqiu/paicoding.html)所在的项目是丐版服务器，所以这个配置很重要。

`binlog-do-db=db_name`，指定哪些数据库表的更新应该被记录。

`binlog-ignore-db=db_name`，指定忽略哪些数据库表的更新。

`sync_binlog=0`，设置每多少次 binlog 写操作会触发一次磁盘同步操作。默认值为 0，表示 MySQL 不会主动触发同步操作，而是依赖操作系统的磁盘缓存策略。

即当执行写操作时，数据会先写入缓存，当缓存区满了再由操作系统将数据一次性刷入磁盘。

如果设置为 1，表示每次 binlog 写操作后都会同步到磁盘，虽然可以保证数据能够及时写入磁盘，但会降低性能。

可以通过 `show variables like '%log_bin%';` 查看 binlog 是否开启。

![二哥的 Java 进阶之路：开启 binlog](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240326102701.png)

#### 有了binlog为什么还要undolog redolog？

binlog 属于 Server 层，与存储引擎无关，无法直接操作物理数据页。而 redo log 和 undo log 是 InnoDB 存储引擎实现 ACID 的基石。

binlog 关注的是逻辑变更的全局记录；redo log 用于确保物理变更的持久性，确保事务最终能够刷盘成功；undo log 是逻辑逆向操作日志，记录的是旧值，方便恢复到事务开始前的状态。

>另外一种回答方式。

binlog 会记录整个 SQL 或行变化；redo log 是为了恢复“已提交但未刷盘”的数据，undo log 是为了撤销未提交的事务。

以一次事务更新为例：

```sql
# 开启事务
BEGIN;
# 更新数据
UPDATE users SET age = age + 1 WHERE id = 1;
# 提交事务
COMMIT;
```

事务开始的时候会生成 undo log，记录更新前的数据，比如原值是 18：

```
undo log: id=1, age=18
```

修改数据的时候，会将数据写入到 redo log。

比如数据页 page_id=123 上，id=1 的用户被更新为 age=26：

```
redo log (prepare):
page_id=123, offset=0x40, before=18, after=26
```

等事务提交的时候，redo log 刷盘，binlog 刷盘。

binlog 写完之后，redo log 的状态会变为 commit：

```
redo log (commit):
page_id=123, offset=0x40, before=18, after=26
```

binlog 如果是 Statement 格式，会记录一条 SQL 语句：

```sql
UPDATE users SET age = age + 1 WHERE id = 1;
```

binlog 如果是 Row 格式，会记录：

```
表：users
before: id=1, age=18
after:  id=1, age=26
```

随后，后台线程会将 redo log 中的变更异步刷新到磁盘。

memo：2025 年 3 月 13 日修改至此。有[球友报喜](httpshttps://javabetter.cn/zhishixingqiu/)，字节二面过了，找暑期顺利的不可思议，八股直接吟唱面渣。

![球友报喜字节二面过了](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250313170334.png)

#### 说说 redo log 的工作机制？

当事务启动时，MySQL 会为该事务分配一个唯一标识符。

在事务执行过程中，每次对数据进行修改，MySQL 都会生成一条 Redo Log，记录修改前后的数据状态。

这些 Redo Log 首先会被写入内存中的 Redo Log Buffer。

![二哥的 Java 进阶之路： 我本机 MySQL 的 redolog buffer size 为 16M](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250314155647.png)

当事务提交时，MySQL 再将 Redo Log Buffer 中的记录刷新到磁盘上的 Redo Log 文件中。

只有当 Redo Log 成功写入磁盘，事务才算真正提交成功。

![greatsql 社区：Redo Log的刷盘策略](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250314160523.png)

当 MySQL 崩溃重启时，会先检查 Redo Log。对于已提交的事务，MySQL 会重放 Redo Log 中的记录。

![greatsql 社区：redo log 恢复](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250314160157.png)

对于未提交的事务，MySQL 会通过 Undo Log 回滚这些修改，确保数据恢复到崩溃前的一致性状态。

Redo Log 是循环使用的，当文件写满后会覆盖最早的记录。

为避免覆盖未持久化的记录，MySQL 会定期执行 CheckPoint 操作，将内存中的数据页刷新到磁盘，并记录 CheckPoint 点。

![博客园太白金星有点烦：checkpoint](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250314161732.png)

重启时，MySQL 只会重放 CheckPoint 之后的 Redo Log，从而提高恢复效率。

#### redo log 文件的大小是固定的吗？

redo log 文件是固定大小的，通常配置为一组文件，使用环形方式写入，旧的日志会在空间需要时被覆盖。

![greatsql社区：redo log 文件组](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250314161331.png)

命名方式为 `ib_logfile0、iblogfile1、、、iblogfilen`。默认 2 个文件，每个文件大小为 48MB。

![greatsql社区：ib_logfile0和ib_logfile1](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250314160340.png)

可以通过 `show variables like 'innodb_log_file_size';` 查看 redo log 文件的大小；通过 `show variables like 'innodb_log_files_in_group';` 查看 redo log 文件的数量。

![二哥的 Java 进阶之路：redo log 文件大小](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250314155806.png)

#### 说说 WAL？

>WAL——Write-Ahead Logging。

预写日志是 InnoDB 实现事务持久化的核心机制，它的思想是：先写日志再刷磁盘。

![小许 code：WAL](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250314163343.png)

即在修改数据页之前，先将修改记录写入 Redo Log。

这样的话，即使数据页尚未写入磁盘，系统崩溃时也能通过 Redo Log 恢复数据。

----这部分是帮助大家理解 start，面试中可不背----

解释一下为什么需要 WAL：

- 数据最终是要写入磁盘的，但磁盘 IO 很慢；
- 如果每次更新都立刻把数据页刷盘，性能很差；
- 如果还没写入磁盘就宕机，事务会丢失。

WAL 的好处是更新时不直接写数据页，而是先写一份变更记录到 redo log，后台再慢慢把真正的数据页刷盘，一举多得。

----这部分是帮助大家理解 end，面试中可不背----

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的华为面经同学 8 技术二面面试原题：MySQL 中的 bin log 的作用是什么？
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团面经同学 2 Java 后端技术一面面试原题：说说 MySQL 的三大日志？
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 21  抖音商城一面面试原题：redolog undolog binlog，有了binlog为什么还要undolog redolog，redolog的工作机制，说说 WAL

memo：2025 年 3 月 14 日修改至此。今天修改简历的时候，碰到一位比赛经历[非常丰富的球友](https://javabetter.cn/zhishixingqiu/)，大家在校期间如果有时间，也可以冲一下。

![球友的竞赛经历](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250314163859.png)

### 29.binlog 和 redo log 有什么区别？

binlog 由 MySQL 的 Server 层实现，与存储引擎无关；redo log 由 InnoDB 存储引擎实现。

![连边：binlog 和 redo log](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250315151137.png)

binlog 记录的是逻辑日志，包括原始的 SQL 语句或者行数据变化，例如“将 id=2 这行数据的 age 字段+1”。

redo log 记录物理日志，即数据页的具体修改，例如“将 page_id=123 上 offset=0x40 的数据从 18 修改为 26”。

binlog 是追加写入的，文件写满后会新建文件继续写入，不会覆盖历史日志，保存的是全量操作记录；redo log 是循环写入的，空间是固定的，写满后会覆盖旧的日志，仅保存未刷盘的脏页日志，已持久化的数据会被清除。

另外，为保证两种日志的一致性，innodb 采用了两阶段提交策略，redo log 在事务执行过程中持续写入，并在事务提交前进入 prepare 状态；binlog 在事务提交的最后阶段写入，之后 redo log 会被标记为 commit 状态。

可以通过回放 binlog 实现数据同步或者恢复到指定时间点；redo log 用来确保事务提交后即使系统宕机，数据仍然可以通过重放 redo log 恢复。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团同学 2 优选物流调度技术 2 面面试原题：redo log、bin log

### 30.为什么要两阶段提交呢？

为了保证 redo log 和 binlog 中的数据一致性，防止主从复制和事务状态不一致。

![阿里：MySQL 两阶段提交](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250316104456.png)

#### 为什么 2PC 能保证 redo log 和 binlog 的强⼀致性？

假如 MySQL 在预写 redo log 之后、写入 binlog 之前崩溃。那么 MySQL 重启后 InnoDB 会回滚该事务，因为 redo log 不是提交状态。并且由于 binlog 中没有写入数据，所以从库也不会有该事务的数据。

![阿里：2PC 可以保证redo log 和 binlog 的数据一致性](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250316105500.png)

假如 MySQL 在写入 binlog 之后、redo log 提交之前崩溃。那么 MySQL 重启后 InnoDB 会提交该事务，因为 redo log 是提交状态。并且由于 binlog 中有写入数据，所以从库也会同步到该事务的数据。

伪代码如下所示：

```java
// 事务开始
begin;

// try
{
    // 执行 SQL
    execute SQL;

    // 写入 redo log 并标记为 prepare
    write redo log prepare xid;

    // 写入 binlog
    write binlog xid sql;

    // 提交 redo log
    commit redo log xid;
}
// catch
{
    // 回滚 redo log
    innodb rollback redo log xid;
}

// 事务结束
end;
```

#### XID 了解吗？

XID 是 binlog 中用来标识事务提交的唯一标识符。

![mysql：xid](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250316113030.png)

在事务提交时，会写入一个 XID_EVENT 到 binlog，表示这个事务真正完成了。

```sql
  Log_name         | Pos  | Event_type     | Server_id | End_log_pos | Info      
| mysql-bin.000003 | 2005 | Gtid           |   1013307 |        2070 | SET @@SESSION.GTID_NEXT= 'f971d5f1-d450-11ec-9e7b-5254000a56df:11'                 |
| mysql-bin.000003 | 2070 | Query          |   1013307 |        2142 | BEGIN                                                                              |
| mysql-bin.000003 | 2142 | Table_map      |   1013307 |        2187 | table_id: 109 (test.t1)                                                            |
| mysql-bin.000003 | 2187 | Write_rows     |   1013307 |        2227 | table_id: 109 flags: STMT_END_F                                                    |
| mysql-bin.000003 | 2227 | Xid            |   1013307 |        2258 | COMMIT /* xid=121 */      
```

它不仅用于主从复制中事务完整性的判断，也在崩溃恢复中对 redo log 和 binlog 的一致性校验起到关键作用。

XID 可以帮助 MySQL 判断哪些 redo log 是已提交的，哪些是未提交需要回滚的，是两阶段提交机制中非常关键的一环。

memo：2025 年 3 月 16 日修改至此。

### 31.redo log 的写入过程了解吗？

InnoDB 会先将 Redo Log 写入内存中的 Redo Log Buffer，之后再以一定的频率刷入到磁盘的 Redo Log File 中。

![三分恶面渣逆袭：redo log 缓冲](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-e1f59341-0695-45db-b759-30db73314e39.jpg)

#### 哪些场景会触发 redo log 的刷盘动作？

比如说 Redo Log Buffer 的空间不足时，事务提交时，触发 Checkpoint 时，后台线程定期刷盘时。

不过，Redo Log Buffer 刷盘到 Redo Log File 还会涉及到操作系统的磁盘缓存策略，可能不会立即刷盘，而是等待一定时间后才刷盘。

![酷酷博客园：Page Cache](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250317160220.png)

#### innodb_flush_log_at_trx_commit 参数你了解多少？

innodb_flush_log_at_trx_commit 参数是用来控制事务提交时，Redo Log 的刷盘策略，一共有三种。

![greatsql：innodb_flush_log_at_trx_commit](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250317155312.png)

0 表示事务提交时不刷盘，而是交给后台线程每隔 1 秒执行一次。这种方式性能最好，但是在 MySQL 宕机时可能会丢失一秒内的事务。

1 表示事务提交时会立即刷盘，确保事务提交后数据就持久化到磁盘。这种方式是最安全的，也是 InnoDB 的默认值。

![二哥的 Java 进阶之路：innodb_flush_log_at_trx_commit的默认值](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250317160701.png)

2 表示事务提交时只把 Redo Log Buffer 写入到 Page Cache，由操作系统决定什么时候刷盘。操作系统宕机时，可能会丢失一部分数据。

#### 一个没有提交事务的 redo log，会不会刷盘？

InnoDB 有一个后台线程，每隔 1 秒会把 Redo Log Buffer 中的日志写入到文件系统的缓存中，然后调用刷盘操作。

![greatsql：InnoDB 的后台线程](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250317161008.png)

因此，一个没有提交事务的 Redo Log 也可能会被刷新到磁盘中。

另外，如果当 Redo Log Buffer 占用的空间即将达到 innodb_log_buffer_size 的一半时，也会触发刷盘操作。

memo：2025 年 3 月 17 日修改至此。已经有[球友发来喜报](https://javabetter.cn/zhishixingqiu/)，暑期实习拿到恒生电子的暑期实习了。

![球友拿到恒生电子的暑期实习了](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250317163123.png)

#### Redo Log Buffer 是顺序写还是随机写？

MySQL 在启动后会向操作系统申请一块连续的内存空间作为 Redo Log Buffer，并将其分为若干个连续的 Redo Log Block。

![xyZGHio：Redo Log Block](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250318160752.png)

那为了提高写入效率，Redo Log Buffer 采用了顺序写入的方式，会先往前面的 Redo Log Block 中写入，当写满后再往后面的 Block 中写入。

![greatsql：redo log buffer的写入](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250318152808.png)

于此同时，InnoDB 还提供了一个全局变量 buf_free，来控制后续的 redo log 记录应该写入到 block 中的哪个位置。

#### buf_next_to_write 了解吗？

buf_next_to_write 指向 Redo Log Buffer 中下一次需要写入硬盘的起始位置。

![xyZGHio：buf_next_to_write](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250318180850.png)

而 buf_free 指向的是 Redo Log Buffer 中空闲区域的起始位置。

#### 了解 MTR 吗？

Mini Transaction 是 InnoDB 内部用于操作数据页的原子操作单元。

```c
mtr_t mtr;
mtr_start(&mtr);

// 1. 加锁

// 对待访问的index加锁
mtr_s_lock(rw_lock_t, mtr);
mtr_x_lock(rw_lock_t, mtr);

// 对待读写的page加锁
mtr_memo_push(mtr, buf_block_t, MTR_MEMO_PAGE_S_FIX);
mtr_memo_push(mtr, buf_block_t, MTR_MEMO_PAGE_X_FIX);

// 2. 访问或修改page
btr_cur_search_to_nth_level
btr_cur_optimistic_insert

// 3. 为修改操作生成redo
mlog_open
mlog_write_initial_log_record_fast
mlog_close

// 4. 持久化redo，解锁
mtr_commit(&mtr);
```

多个事务的 Redo Log 会以 MTR 为单位交替写入到 Redo Log Buffer 中，假如事务 1 和事务 2 均有两个 MTR，一旦某个 MTR 结束，就会将其生成的若干条 Redo Log 记录顺序写入到 Redo Log Buffer 中。

![xyZGHio：MTR 与 Redo Log Buffer](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250318163110.png)

也就是说，一个 MTR 会包含一组 Redo Log 记录，是 MySQL 崩溃后恢复事务的最小执行单元。

![xyZGHio：MTR](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250318163310.png)

#### Redo Log Block 的结构了解吗？

Redo Log Block 由日志头、日志体和日志尾组成，一共占用 512 个字节，其中日志头占用 12 个字节，日志尾占用 4 个字节，剩余的 496 个字节用于存储日志体。

![greatsql：Redo Log Block](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250318154904.png)

日志头包含了当前 Block 的序列号、第一条日志的序列号、类型等信息。

字段|	作用
---|---
LOG_BLOCK_HDR_NO|	当前 Block 的序号，假如把 Redo Log Buffer 看成一个数组，那么 LOG_BLOCK_HDR_NO 就相当于 Block 在 Buffer 中的下标。
LOG_BLOCK_HDR_DATA_LEN|	Block 已使用的字节数，初始值为 12，也就是日志头的长度；如果日志体被写满，值增长为 512。
LOG_BLOCK_FIRST_REC_GROUP|	该 Block 中第一个 MTR 起始处的偏移量
LOG_BLOCK_CHECKPOINT_NO| Block 最后被写入时的checkpoint

日志尾主要存储的是 LOG_BLOCK_CHECKSUM，也就是 Block 的校验和，主要用于判断 Block 是否完整。

#### Redo Log Block 为什么设计成 512 字节？

因为机械硬盘的物理扇区大小通常为 512 字节，Redo Log Block 也设计为同样的大小，就可以确保每次写入都是整数个扇区，减少对齐开销。

![西维蜀黍：Redo Log 工作原理](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250318155855.png)

比如说操作系统的页缓存默认为 4KB，8 个 Redo Log Block 就可以组合成一个页缓存单元，从而提升 Redo Log Buffer 的写入效率。

memo：2025 年 3 月 18 日修改至此。

#### LSN 了解吗？

Log Sequence Number 是一个 8 字节的单调递增整数，用来标识事务写入 redo log 的字节总量，存在于 redo log、数据页头部和 checkpoint 中。

![xyZGHio：LSN](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250318181133.png)

----这部分是帮助大家理解 start，面试中可不背----

MySQL 在第一次启动时，LSN 的初始值并不为 0，而是 8704；当 MySQL 再次启动时，会继续使用上一次服务停止时的 LSN。

在计算 LSN 的增量时，不仅需要考虑 log block body 的大小，还需要考虑 log block header 和 log block tail 中部分字节数。

比如说在上图中，事务 3 的 MTR 总量为 300 字节，那么写入到 Redo Log Buffer 中的 LSN 会增长为 8704 + 300 + 12 = 9016。

假如事务 4 的 MTR 总量为 900 字节，那么再次写入到 Redo Log Buffer 中的 LSN 会增长为 9016 + 900 + 12\*2 + 4\*2 = 9948。

2 个 12 字节的 log block header + 2 个 4 字节的 log block tail。

----这部分是帮助大家理解 end，面试中可不背----

核心作用有三个：

第一，redo log 按照 LSN 递增顺序记录所有数据的修改操作。LSN 的递增量等于每次写入日志的字节数。

第二，InnoDB 的每个数据页头部中，都会记录该页最后一次刷新到磁盘时的 LSN。如果数据页的 LSN 小于 redo log 的 LSN，说明该页需要从日志中恢复；否则说明该页已更新。

第三，checkpoint 通过 LSN 记录已刷新到磁盘的数据页位置，减少恢复时需要处理的日志。

----这部分是帮助大家理解 start，面试中可不背----

场景|	LSN 的作用
---|---
🔁 redo log 记录|	每条 redo log 对应一个唯一的 LSN
📄 数据页刷盘|	每个数据页会记录当前刷盘时的 LSN（FIL_PAGE_LSN）
⛳ Checkpoint|	表示“脏页已经刷盘，可以释放 redo”的安全点
💥 崩溃恢复|	重启时从 checkpoint LSN 开始重放 redo log

可以通过 `show engine innodb status;` 查看当前的 LSN 信息。

![二哥的 Java 进阶之路：LSN](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250319161213.png)

- Log sequence number：当前系统最大 LSN（已生成的日志总量）。
- Log flushed up to：已写入磁盘的 redo log LSN。
- Pages flushed up to：已刷新到数据页的 LSN。
- Last checkpoint at：最后一次检查点的 LSN，表示已持久化的数据状态。

----这部分是帮助大家理解 end，面试中可不背----

memo：2025 年 3 月 19 日修改至此。今天有读者问怎么付费购买纸质版[面渣逆袭](https://javabetter.cn/sidebar/sanfene/nixi.html)，说看到网友有这个，好羡慕啊。说实话，第一眼看到这个封面，真的觉得挺惊艳（虽然是我设计的）。😄

![读者已经把面渣逆袭彩印了，好漂亮啊](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250319163123.png)

#### Checkpoint 了解多少？

Checkpoint 是 InnoDB 为了保证事务持久性和回收 redo log 空间的一种机制。

它的作用是在合适的时机将部分脏页刷入磁盘，比如说 buffer pool 的容量不足时。并记录当前 LSN 为 Checkpoint LSN，表示这个位置之前的 redo log file 已经安全，可以被覆盖了。

MySQL 崩溃恢复时只需要从 Checkpoint 之后开始恢复 redo log 就可以了，这样可以最大程度减少恢复所花费的时间。

redo log file 的写入是循环的，其中有两个标记位置非常重要，也就是 Checkpoint 和 write pos。

![三分恶面渣逆袭：checkpoint 和 write pos](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-8d944e76-89ba-4fa6-9066-64ff4f55b532.jpg)

write pos 是 redo log 当前写入的位置，Checkpoint 是可以被覆盖的位置。

当 write pos 追上 Checkpoint 时，表示 redo log 日志已经写满。这时候就要暂停写入并强制刷盘，释放可覆写的日志空间。

![三分恶面渣逆袭：write pos 和 checkpoint](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-31a14149-b261-45d9-bd3b-6afaec16e136.jpg)

#### 关于redo log 的调优参数了解多少？

如果是高并发写入的电商系统，可以最大化写入吞吐量，容忍秒级数据丢失的风险。

```sql
innodb_flush_log_at_trx_commit = 2
sync_binlog = 1000
innodb_redo_log_capacity = 64G
innodb_io_capacity = 5000
innodb_lru_scan_depth = 512
innodb_log_buffer_size = 256M
```

如果是金融交易系统，需要保证数据零丢失，接受较低的吞吐量。

```sql
innodb_flush_log_at_trx_commit = 1
sync_binlog = 1
innodb_redo_log_capacity = 32G
innodb_io_capacity = 2000
innodb_lru_scan_depth = 1024
```

核心参数一览表：

参数名|	控制内容|	影响点
---|---|---
innodb_log_file_size|	每个 redo log 文件大小|	总 redo 空间、恢复时间
innodb_log_files_in_group|	redo log 文件个数|	配合文件大小决定总容量
innodb_log_buffer_size|	redo log buffer 缓冲区大小|	是否频繁刷盘、写入性能
innodb_flush_log_at_trx_commit|	redo 刷盘策略|	安全性 vs TPS
innodb_max_dirty_pages_pct|	脏页比例阈值|	何时触发刷盘 / Checkpoint
innodb_io_capacity|	后台刷盘速度|	限制 checkpoint 刷盘压力

总结：

- 对数据一致性要求高的场景，如金融交易使用`innodb_flush_log_at_trx_commit=1`，对写入吞吐量敏感的场景，如日志采集可以使用 =2 或 =0，需要结合 sync_binlog 参数
- sync_binlog 参数控制 binlog 的刷盘策略，可以设置为 0、1、N，0 表示依赖系统刷盘，1 表示每次事务提交都刷盘（推荐与 `innodb_flush_log_at_trx_commit=1` 搭配），N=1000 表示累计 1000 次事务后刷盘
- innodb_redo_log_capacity 动态调整 Redo Log 总容量，可以根据业务负载情况调整，建议设置为 1 小时写入量的峰值（如每秒 10MB 写入则设为 36GB）
- innodb_io_capacity 定义 InnoDB 后台线程的每秒 I/O 操作上限，直接影响脏页刷新速率；机械硬盘建议 200-500，SSD 建议 1000-2000，NVMe SSD 可设为 5000+
- innodb_lru_scan_depth 控制每个缓冲池实例中 LRU 列表的扫描深度，决定每秒可刷新的脏页数量，默认值 1024 适用于多数场景，I/O 密集型负载可适当降低（如 512），减少 CPU 开销。

<MZNXCQRcodeBanner />

memo：2025 年 3 月 20 日修改至此。[有球友](https://javabetter.cn/zhishixingqiu/)报喜说拿到了滴滴的测开实习 offer，恭喜恭喜！

![球友拿到了滴滴的测开实习 offer](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250320163641.png)

## SQL 优化

### 🌟32.什么是慢 SQL？

推荐阅读：[慢 SQL 优化一点小思路](https://juejin.cn/post/7048974570228809741)

MySQL 中有一个叫 long_query_time 的参数，原则上执行时间超过该参数值的 SQL 就是慢 SQL，会被记录到慢查询日志中。

----这部分是帮助大家理解 start，面试中可不背----

可通过 `show variables like 'long_query_time';` 查看当前的 long_query_time 的参数值。

![二哥的 Java 进阶之路：long_query_time](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240327083506.png)

----这部分是帮助大家理解 end，面试中可不背----

#### SQL 的执行过程了解吗？

了解。

SQL 的执行过程大致可以分为六个阶段：连接管理、语法解析、语义分析、查询优化、执行器调度、存储引擎读写等。Server 层负责理解和规划 SQL 怎么执行，存储引擎层负责数据的真正读写。

![三个猪皮匠：SQL 执行过程](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240327083838.png)

----这部分是帮助大家理解 start，面试中可不背----

来详细拆解一下：

1. 客户端发送 SQL 语句给 MySQL 服务器。
2. 如果查询缓存打开则会优先查询缓存，缓存中有对应的结果就直接返回。不过，MySQL 8.0 已经移除了查询缓存。这部分的功能正在被 Redis 等缓存中间件取代。
3. 分析器对 SQL 语句进行语法分析，判断是否有语法错误。
4. 搞清楚 SQL 语句要干嘛后，MySQL 会通过优化器生成执行计划。
5. 执行器调用存储引擎的接口，执行 SQL 语句。

SQL 执行过程中，优化器通过成本计算预估出执行效率最高的方式，基本的预估维度为：

- IO 成本：从磁盘读取数据到内存的开销。
- CPU 成本：CPU 处理内存中数据的开销。

基于这两个维度，可以得出影响 SQL 执行效率的因素有：

**①、IO 成本**，数据量越大，IO 成本越高。所以要尽量查询必要的字段；尽量分页查询；尽量通过索引加快查询。

**②、CPU 成本**，尽量避免复杂的查询条件，如有必要，考虑对子查询结果进行过滤。

----这部分是帮助大家理解 end，面试中可不背----

#### 如何优化慢 SQL 呢？

首先，需要找到那些比较慢的 SQL，可以通过启用慢查询日志，记录那些超过指定执行时间的 SQL 查询。

也可以使用 `show processlist;` 命令查看当前正在执行的 SQL 语句，找出执行时间较长的 SQL。

![二哥的java 进阶之路：技术派当前正在执行的 sql](https://cdn.tobebetterjavaer.com/stutymore/mysql-20241115145204.png)

或者在业务基建中加入对慢 SQL 的监控，常见的方案有字节码插桩、连接池扩展、ORM 框架扩展等。

![二哥的Java 进阶之路：技术派会在日志中记录请求的执行时间](https://cdn.tobebetterjavaer.com/stutymore/mysql-20241115145401.png)

然后，使用 EXPLAIN 查看慢 SQL 的执行计划，看看有没有用索引，大部分情况下，慢 SQL 的原因都是因为没有用到索引。

```sql
EXPLAIN SELECT * FROM your_table WHERE conditions;
```

最后，根据分析结果，通过添加索引、优化查询条件、减少返回字段等方式进行优化。

#### 慢sql日志怎么开启？

编辑 MySQL 的配置文件 my.cnf，设置 slow_query_log 参数为 1。

```ini
[mysqld]
slow_query_log = 1
slow_query_log_file = /var/log/mysql/slow.log
long_query_time = 2  # 记录执行时间超过2秒的查询
```

然后重启 MySQL 就好了。

也可以通过 set global 命令动态设置。

```sql
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL slow_query_log_file = '/var/log/mysql/slow.log';
SET GLOBAL long_query_time = 2;
```

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯云智面经同学 16 一面面试原题：场景题：sql 查询很慢怎么排查
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的快手面经同学 5 面试原题：慢sql日志怎么开启？
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团面经同学 3 Java 后端技术一面面试原题：如何判断sql的效率，怎样排查效率比较低的sql
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的作业帮面经同学 1 Java 后端一面面试原题：mysql中如何定位慢查询
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的同学 1 贝壳找房后端技术一面面试原题：慢查询怎么分析
> 6. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 27 云后台技术一面面试原题：如何优化慢查询语句？
> 7. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的虾皮面经同学 13 一面面试原题：mysql慢查询

memo：2025 年 3 月 21 日修改至此。今天[有球友报喜](https://javabetter.cn/zhishixingqiu/)说拿到了 wxg 的实习 offer，阿里云和美团也在进行当中，真的 tql。

![球友报喜说拿到了 wxg 的实习 offer](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250321155611.png)

### 🌟33.你知道哪些方法来优化 SQL？

SQL 优化的方法非常多，但本质上就一句话：尽可能少地扫描、尽快地返回结果。

最常见的做法就是加索引、改写 SQL 让它用上索引，比如说使用索引覆盖、让联合索引遵守最左前缀原则等。

![沉默王二：SQL 优化](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240327104050.png)

#### 如何利用索引覆盖？

索引覆盖的核心是“查询所需的字段都在同一个索引里”，这样 MySQL 就不需要回表，直接从索引中返回结果。

![梦里花。：回表](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250322095940.png)

实际使用中，我会优先考虑把 WHERE 和 SELECT 涉及的字段一起建联合索引，并通过 EXPLAIN 观察结果是否有 Using index，确认命中索引。

----这部分是帮助大家理解 start，面试中可不背----

举个例子，现在要从 test 表中查询 city 为上海的 name 字段。

```sql
select name from test where city='上海'
```

如果仅在 city 字段上添加索引，那么这条查询语句会先通过索引找到 city 为上海的行，然后再回表查询 name 字段。

为了避免回表查询，可以在 city 和 name 字段上建立联合索引，这样查询结果就可以直接从索引中获取。

```sql
alter table test add index index1(city,name);
```

----这部分是帮助大家理解 end，面试中可不背----

#### 如何正确使用联合索引？

使用联合索引最重要的一条是遵守最左前缀原则，也就是查询条件需要从索引的左侧字段开始。

----这部分是帮助大家理解 start，面试中可不背----

比如说我们创建了一个三列的联合索引。

```sql
CREATE INDEX idx_name_age_sex ON user(name, age, sex);
```

我们来看一下什么样的查询条件可以用到这个索引：

查询条件|	能否用上 idx_name_age_sex？|	说明
---|---|---
WHERE name = 'itwanger'|	✅ 可以|	匹配第一列，命中索引
WHERE name = 'itwanger' AND age=20|	✅ 可以|	匹配前两列，命中索引
WHERE age = 20|	❌ 不行|	第一列没用上，索引失效
WHERE name='itwanger' AND sex='女'|	✅ 部分可用（只用前一列）|	age 被跳过，后面的列无法使用
WHERE name LIKE 'it%'|	✅ 可以（前缀匹配）|	name 是前缀匹配，不影响使用
WHERE name LIKE '%wanger%'|	❌ 不行|	通配符在前，不能用索引

----这部分是帮助大家理解 end，面试中可不背----

#### 如何进行分页优化？

分页优化的核心是避免深度偏移带来的全表扫描，可以通过两种方式来优化：延迟关联和添加书签。

延迟关联适用于需要从多个表中获取数据且主表行数较多的情况。它首先从索引表中检索出需要的行 ID，然后再根据这些 ID 去关联其他的表获取详细信息。

```sql
SELECT e.id, e.name, d.details
FROM employees e
JOIN department d ON e.department_id = d.id
ORDER BY e.id
LIMIT 1000, 20;
```

延迟关联后，第一步只查主键，速度快，第二步只处理 20 条数据，效率高。

```sql
SELECT e.id, e.name, d.details
FROM (
    SELECT id
    FROM employees
    ORDER BY id
    LIMIT 1000, 20
) AS sub
JOIN employees e ON sub.id = e.id
JOIN department d ON e.department_id = d.id;
```

添加书签的方式是通过记住上一次查询返回的最后一行主键值，然后在下一次查询的时候从这个值开始，从而跳过偏移量计算，仅扫描目标数据，适合翻页、资讯流等场景。

假设需要对用户表进行分页。

```sql
SELECT id, name
FROM users
ORDER BY id
LIMIT 1000, 20;
```

通过添加书签来优化后，查询不再使用`OFFSET`，而是从上一页最后一个用户的 ID 开始查询。这种方法可以有效避免不必要的数据扫描，提高了分页查询的效率。

```sql
SELECT id, name
FROM users
WHERE id > last_max_id  -- 假设last_max_id是上一页最后一行的ID
ORDER BY id
LIMIT 20;
```

#### 为什么分页会变慢？

分页查询的效率问题主要是由于 OFFSET 的存在，OFFSET 会导致 MySQL 必须扫描和跳过 offset + limit 条数据，这个过程是非常耗时的。

比如说，我们要查询第 100000 条数据，那么 MySQL 就必须扫描 100000 条数据，然后再返回 10 条数据。

```sql
SELECT * FROM user ORDER BY id LIMIT 100000, 10;
```

数据越多、偏移越大，就越慢！

memo：2025 年 3 月 22 日修改至此。今天[有球友说](https://javabetter.cn/zhishixingqiu/)等腾讯云的 HR 面，很着急，但我赌他一定能拿到 offer，等一个后续哈。

![球友进入腾讯云的 HR 面了](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250322103527.png)

#### JOIN 代替子查询有什么好处？

第一，JOIN 的 ON 条件能更直接地触发索引，而子查询可能因嵌套导致索引失效。

第二，JOIN 的一次连接操作替代了子查询的多次重复执行，尤其在大数据量的情况下性能差异明显。

----这部分是帮助大家理解 start，面试中可不背----

比如说我们有两个表 orders 和 customers。

```sql
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    amount DECIMAL(10,2),
    INDEX idx_customer_id (customer_id)  -- customer_id字段有索引
);
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    name VARCHAR(100)
);
```

子查询的写法：

```sql
SELECT o.order_id, o.amount, 
       (SELECT c.name 
        FROM customers c 
        WHERE c.customer_id = o.customer_id) AS customer_name
FROM orders o;
```

JOIN 的写法：

```sql
SELECT o.order_id, o.amount, c.name AS customer_name
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id;
```

对比项|子查询|JOIN
---|---|---
索引使用|内层子查询 `WHERE c.customer_id = o.customer_id` 每次执行时，可能无法直接利用 orders 表的 customer_id 索引。|JOIN 的 ON 条件 `o.customer_id = c.customer_id` 可以直接利用 orders 的 idx_customer_id 索引，加速连接过程。
执行计划|子查询会被重复执行（每次外层 orders 行都会触发一次子查询），导致全表扫描。|优化器可能选择通过索引快速关联两张表，减少数据扫描量。例如，先通过 orders 的索引找到 customer_id，再与 customers 主键快速匹配。
性能表现|当 orders 表数据量大时，子查询可能因重复执行导致性能急剧下降。|JOIN 的一次连接操作通常更高效，尤其在大数据量时。

对于子查询，执行流程是这样的：

- 外层 orders 表的每一行都会触发一次子查询。
- 如果 orders 表有 1000 条记录，则子查询会执行 1000 次。
- 每次子查询都需要单独查询 customers 表（即使 customer_id 相同）。

而 JOIN 的执行流程是这样的：

- 数据库优化器会将两张表的连接操作合并为一次执行。
- 通过索引（如 orders.customer_id 和 customers.customer_id）快速关联数据。
- 仅执行一次关联操作，而非多次子查询。

来看一下子查询的执行计划：

```sql
EXPLAIN SELECT o.order_id, 
               (SELECT c.name FROM customers c WHERE c.customer_id = o.customer_id) 
        FROM orders o;
```

![二哥的 Java 进阶之路：子查询的执行计划](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250323213511.png)

子查询（DEPENDENT SUBQUERY）类型表明其依赖外层查询的每一行，导致重复执行。

再对比看一下 JOIN 的执行计划：

```sql
EXPLAIN SELECT o.order_id, 
               (SELECT c.name FROM customers c WHERE c.customer_id = o.customer_id) 
        FROM orders o;
```

![二哥的 Java 进阶之路：JOIN 的执行计划](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250323213756.png)

JOIN 通过 eq_ref 类型直接利用主键（customers.customer_id）快速关联，减少扫描次数。

----这部分是帮助大家理解 end，面试中可不背----

memo：2025 年 3 月 23 日修改至此，今天[有球友说](https://javabetter.cn/zhishixingqiu/)，通过一晚上的时间，就在星球里学到很多知识，让他这个 7 年经验的 CRUD Boy 受益匪浅。

![球友对星球的一种褒奖](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250323214034.png)

**②、小表驱动大表**

在执行 JOIN 操作时，应尽量让行数较少的表（小表）驱动行数较多的表（大表），这样可以减少查询过程中需要处理的数据量。

比如 left join，左表是驱动表，所以 A 表应小于 B 表，这样建立连接的次数就少，查询速度就快了。

```sql
select name from A left join B;
```

**③、适当增加冗余字段**

在某些情况下，通过在表中适当增加冗余字段来避免 JOIN 操作，可以提高查询效率，尤其是在高频查询的场景下。

比如，我们有一个订单表和一个商品表，查询订单时需要显示商品名称，如果每次都通过 JOIN 操作查询商品表，会降低查询效率。这时可以在订单表中增加一个冗余字段，存储商品名称，这样就可以避免 JOIN 操作。

```sql
select order_id,product_name from orders;
```

**④、避免使用 JOIN 关联太多的表**

《[阿里巴巴 Java 开发手册](https://javabetter.cn/pdf/ali-java-shouce.html)》上就规定，不要使用 join 关联太多的表，最多不要超过 3 张表。

因为 join 太多表会降低查询的速度，返回的数据量也会变得非常大，不利于后续的处理。

如果业务逻辑允许，可以考虑将复杂的 JOIN 查询分解成多个简单查询，然后在应用层组合这些查询的结果。

#### 如何进行排序优化？

MySQL 生成有序结果的方式有两种：一种是对结果集进行排序操作，另外一种是按照索引顺序扫描得出的自然有序结果。

因此在设计索引的时候要充分考虑到排序的需求。

```sql
select id, name from users order by name;
```

如果 name 字段上有索引，那么 MySQL 可以直接利用索引的有序性，避免排序操作。

#### 如何进行 UNION 优化？

UNION 操作用于合并两个或者多个 SELECT 语句的结果集。

**①、条件下推**

条件下推是指将 where、limit 等子句下推到 union 的各个子查询中，以便优化器可以充分利用这些条件进行优化。

假设我们有两个查询分支，需要合并结果并过滤：

```sql
SELECT * FROM (
    SELECT * FROM A
    UNION
    SELECT * FROM B
) AS sub
WHERE sub.id = 1;
```

可以改写成：

```sql
SELECT * FROM A WHERE id = 1
UNION
SELECT * FROM B WHERE id = 1;
```

通过将查询条件下推到 UNION 的每个分支中，每个分支查询都只处理满足条件的数据，减少了不必要的数据合并和过滤。

#### 为什么要尽量避免使用 select *？

因为它会读取所有列，增加 I/O 和网络传输成本，而且还会让覆盖索引失效，影响查询性能。

建议只查询需要的字段，尽量把`select * from table`改成`select id, name from table`。

#### 你还知道哪些 SQL 优化方法？

**①、避免使用 != 或者 <> 操作符**

`!=` 或者 `<>` 操作符会导致 MySQL 无法使用索引，从而导致全表扫描。

例如，可以把`column<>'aaa'`，改成`column>'aaa' or column<'aaa'`，就可以使用索引了。

优化策略就是尽可能使用 `=`、`>`、`<`、`BETWEEN`等操作符，它们能够更好地利用索引。

**②、适当使用前缀索引**

适当使用前缀索引可以降低索引的空间占用，提高索引的查询效率。

比如，邮箱的后缀一般都是固定的`@xxx.com`，那么类似这种后面几位为固定值的字段就非常适合定义为前缀索引：

```sql
alter table test add index index2(email(6));
```

需要注意的是，MySQL 无法利用前缀索引做 order by 和 group by 操作。

**③、避免列上使用函数**

在 where 子句中直接对列使用函数会导致索引失效，因为数据库需要对每行的列应用函数后再进行比较，无法直接利用索引。

```sql
select name from test where date_format(create_time,'%Y-%m-%d')='2021-01-01';
```

可以改成：

```sql
select name from test where create_time>='2021-01-01 00:00:00' and create_time<'2021-01-02 00:00:00';
```

通过日期的范围查询，而不是在列上使用函数，可以利用 create_time 上的索引。

#### 了解MRR 吗？












> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 22 暑期实习一面面试原题：查询优化、联合索引、覆盖索引
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的华为面经同学 8 技术二面面试原题：说说 SQL 该如何优化
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的华为面经同学 6 Java 通用软件开发一面面试原题：说说 SQL 该如何优化
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的微众银行同学 1 Java 后端一面的原题：MySQL 索引如何优化？
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的携程面经同学 10 Java 暑期实习一面面试原题：讲一讲 MySQL 的索引，如何优化 SQL？
> 6. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的用友面试原题：了解 mysql 怎么优化吗
> 7. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的阿里系面经同学 19 饿了么面试原题：查询如何优化  

### 34.怎么看执行计划 explain，如何理解其中各个字段的含义？

explain 是 MySQL 提供的一个用于查看查询执行计划的工具，可以帮助我们分析查询语句的性能瓶颈，找出慢 SQL 的原因。

使用方式也非常简单，在 select 语句前加上 `explain` 关键字就可以了。

```sql
explain select * from students where id =9
```

![三分恶面渣逆袭：EXPLAIN](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-e234658f-5672-4a8d-9a75-872b305a171d.jpg)

explain 的输出结果中包含了很多字段，下面是一些常见的字段含义：

①、**id** 列：查询的标识符。

②、**select_type** 列：查询的类型。常见的类型有：

- SIMPLE：简单查询，不包含子查询或者 UNION 查询。
- PRIMARY：查询中如果包含子查询，则最外层查询被标记为 PRIMARY。
- SUBQUERY：子查询。
- DERIVED：派生表的 SELECT，FROM 子句的子查询。

③、**table** 列：查的哪个表。

④、**type** 列：表示 MySQL 在表中找到所需行的方式，性能从最优到最差分别为：system > const > eq_ref > ref > range > index > ALL。

- system，表只有一行，一般是系统表，往往不需要进行磁盘 IO，速度非常快
- const：表中只有一行匹配，或通过主键或唯一索引获取单行记录。通常用于使用主键或唯一索引的精确匹配查询，性能非常高。
- eq_ref：对于每个来自上一张表的记录，最多只返回一条匹配记录，通常用于多表关联且使用主键或唯一索引的查询。效率非常高，适合多表关联查询。
- ref：使用非唯一索引或前缀索引查询的情况，返回符合条件的多行记录。通常用于普通索引或联合索引查询，效率较高，但不如 const 和 eq_ref。
- range：只检索给定范围的行，使用索引来检索。在`where`语句中使用 `bettween...and`、`<`、`>`、`<=`、`in` 等条件查询 `type` 都是 `range`。
- index：全索引扫描，即扫描整个索引而不访问数据行。
- ALL：全表扫描，效率最低。

⑤、**possible_keys** 列：可能会用到的索引，但并不一定实际被使用。

⑥、**key** 列：实际使用的索引。如果为 NULL，则没有使用索引。

⑦、**key_len** 列：MySQL 决定使用的索引长度（以字节为单位）。当表有多个索引可用时，key_len 字段可以帮助识别哪个索引最有效。通常情况下，更短的 key_len 意味着数据库在比较键值时需要处理更少的数据。

⑧、**ref** 列：用于与索引列比较的值来源。

- const：表示常量，这个值是在查询中被固定的。例如在 WHERE `column = 'value'`中。
- 一个或多个列的名称，通常在 JOIN 操作中，表示 JOIN 条件依赖的字段。
- NULL，表示没有使用索引，或者查询使用的是全表扫描。

⑨、**rows** 列：估算查到结果集需要扫描的数据行数，原则上 rows 越少越好。

⑩、**Extra** 列：附加信息。

- Using index：表示只利用了索引。
- Using where：表示使用了 WHERE 过滤。
- Using temporary ：表示使用了临时表来存储中间结果。

示例：

![二哥的 Java 进阶之路](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240417092646.png)

#### type的执行效率等级，达到什么级别比较合适？

从高到低的效率排序是 system、const、eq_ref、ref、range、index 和 ALL。

一般情况下，建议 type 值达到 const、eq_ref 或 ref，因为这些类型表明查询使用了索引进行精确匹配，效率较高。

如果是范围查询，range 类型也是可以接受的。

通常要避免出现 ALL 类型，因为它表示全表扫描，性能最低。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的华为面经同学 8 技术二面面试原题：怎么看走没走索引，如何分析 SQL
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的作业帮面经同学 1 Java 后端一面面试原题：key-len和key没什么区别，什么时候会用到key-len，你还会查看explain中的哪些字段，extra有哪些类型
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的同学 1 贝壳找房后端技术一面面试原题：explain分析后， type的执行效率等级，达到什么级别比较合适

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括 Java 基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM 等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

## 索引

### 35.为什么使用索引会加快查询？

数据库文件是存储在磁盘上的，磁盘 I/O 是数据库操作中最耗时的部分之一。没有索引时，数据库会进行全表扫描（Sequential Scan），这意味着它必须读取表中的每一行数据来查找匹配的行（时间效率为 O(n)）。当表的数据量非常大时，就会导致大量的磁盘 I/O 操作。

有了索引，就可以直接跳到索引指示的数据位置，而不必扫描整张表，从而大大减少了磁盘 I/O 操作的次数。

MySQL 的 InnoDB 存储引擎默认使用 B+ 树来作为索引的数据结构，而 B+ 树的查询效率非常高，时间复杂度为 O(logN)。

索引文件相较于数据库文件，体积小得多，查到索引之后再映射到数据库记录，查询效率就会高很多。

索引就好像书的目录，通过目录去查找对应的章节内容会比一页一页的翻书快很多。

![三分恶面渣逆袭：索引加快查询远离](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-6b9c9901-9bf3-46ed-a5c4-c1b781965c1e.jpg)

可通过 `create index` 创建索引，比如：

```sql
create index idx_name on students(name);
```

#### 索引优化举例？

在实际开发中，我们可以通过合理使用单字段索引、复合索引和覆盖索引来优化查询。例如，如果要加速查询 age 字段的条件，我们可以在 age 字段上创建索引。

```sql
CREATE INDEX idx_age ON users(age);
```

如果查询涉及多个字段 age 和 name，可以使用复合索引来提高查询效率。

```sql
CREATE INDEX idx_age_name ON users(age, name);
```

当我们只需要查询部分字段时 `SELECT name FROM users WHERE age = 30;`，覆盖索引可以提升查询效率。

```sql
CREATE INDEX idx_age_name ON users(age, name);
```

由于 age 和 name 字段都在索引中，MySQL 直接从索引中获取结果，无需回表查找。


> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 23 QQ 后台技术一面面试原题：MySQL 索引，为什么用 B+树
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小米面经同学 E 第二个部门 Java 后端技术一面面试原题：为什么需要索引
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小公司面经同学 5 Java 后端面试原题：数据库索引讲一下，然后为什么会加快查询速度，我讲到了 B+树，然后问了 B 数与 B+树区别
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的去哪儿面经同学 1 技术二面面试原题：mysql为什么用索引
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的 OPPO 面经同学 1 面试原题：对MySQL索引的理解
> 6. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的vivo 面经同学 10 技术一面面试原题：索引，索引优化举例，为什么使用索引更快
> 7. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 27 云后台技术一面面试原题：介绍下索引？底层是啥？

### 36.能简单说一下索引的分类吗？

MySQL 的索引可以显著提高查询的性能，可以从三个不同的维度对索引进行分类（功能、数据结构、存储位置）：

![二哥的 Java 进阶之路：索引类型](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240311225809.png)

#### 01、说说从功能上的分类？

①、**主键索引**: 表中每行数据唯一标识的索引，强调列值的唯一性和非空性。

当创建表的时候，可以直接指定主键索引：

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255)
);
```

id 列被指定为主键索引，同时，MySQL 会自动为这个列创建一个聚簇索引（主键索引一定是聚簇索引）。

可以通过 `show index from table_name` 查看索引信息，比如前面创建的 users 表：

![二哥的 Java 进阶之路：索引信息](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240312090221.png)

- `Non_unique` 如果索引不能包含重复词，则为 0；如果可以，则为 1。这可以帮助我们区分是唯一索引还是普通索引。
- `Key_name` 索引的名称。如果索引是主键，那么这个值是 PRIMARY。
- `Column_name` 索引所包含的字段名。
- `Index_type` 索引的类型，比如 BTREE、HASH 等。

②、**唯一索引**: 保证数据列中每行数据的唯一性，但允许有空值。

可以通过下面的语句创建唯一索引：

```sql
CREATE UNIQUE INDEX idx_username ON users(username);
```

同样可以通过 `show index from table_name` 确认索引信息：

![二哥的 Java 进阶之路：唯一索引](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240312091008.png)

`Non_unique` 为 0，表示这是一个唯一索引。

③、**普通索引**: 基本的索引类型，用于加速查询。

可以通过下面的语句创建普通索引：

```sql
CREATE INDEX idx_email ON users(email);
```

这次我们通过下面的语句一起把三个索引的关键信息查出来：

```sql
SELECT `TABLE_NAME` AS `Table`, `NON_UNIQUE`, `INDEX_NAME` AS `Key_name`, `COLUMN_NAME` AS `Column_name`, `INDEX_TYPE` AS `Index_type`
FROM information_schema.statistics
WHERE `TABLE_NAME` = 'users' AND `TABLE_SCHEMA` = DATABASE();
```

![二哥的 Java 进阶之路：普通索引](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240312091632.png)

可以确定 idx_email 是一个普通索引，因为 `Non_unique` 为 1。

④、**全文索引**：特定于文本数据的索引，用于提高文本搜索的效率。

假设有一个名为 articles 的表，下面这条语句在 content 列上创建了一个全文索引。

```sql
CREATE FULLTEXT INDEX idx_article_content ON articles(content);
```

#### 02、说说从数据结构上分类？

①、B+树索引：最常见的索引类型，一种将索引值按照一定的算法，存入一个树形的数据结构中（二叉树），每次查询都从树的根节点开始，一次遍历叶子节点，找到对应的值。查询效率是 O(logN)。

也是 **InnoDB 存储引擎的默认索引类型**。

B+ 树是 B 树的升级版，B+ 树中的非叶子节点都不存储数据，只存储索引。叶子节点中存储了所有的数据，并且构成了一个从小到大的有序双向链表，使得在完成一次树的遍历定位到范围查询的起点后，可以直接通过叶子节点间的指针顺序访问整个查询范围内的所有记录，而无需对树进行多次遍历。这在处理大范围的查询时特别高效。

![一颗剽悍的种子：B+树的结构](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240312092745.png)

因为 B+ 树是 InnoDB 的默认索引类型，所以创建 B+ 树的时候不需要指定索引类型。

```sql
CREATE TABLE example_btree (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    INDEX name_index (name)
) ENGINE=InnoDB;
```

②、Hash 索引：基于哈希表的索引，查询效率可以达到 O(1)。

Hash 索引在原理上和 Java 中的 [HashMap](https://javabetter.cn/collection/hashmap.html) 类似，当发生哈希冲突的时候也是通过拉链法来解决。

![业余码农：哈希索引](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240312094537.png)

可以通过下面的语句创建哈希索引：

```sql
CREATE TABLE example_hash (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    UNIQUE HASH (name)
) ENGINE=MEMORY;
```

注意，我们这里创建的是 MEMORY 存储引擎，InnoDB 并不提供直接创建哈希索引的选项，因为 B+ 树索引能够很好地支持范围查询和等值查询，满足了大多数数据库操作的需要。

不过，InnoDB 存储引擎内部使用了一种名为“自适应哈希索引”（Adaptive Hash Index, AHI）的技术。

自适应哈希索引并不是由用户显式创建的，而是 InnoDB 根据数据访问的模式自动建立和管理的。当 InnoDB 发现某个索引被频繁访问时，会在内存中创建一个哈希索引，以加速对这个索引的访问。

可以通过下面的语句查看自适应哈希索引的状态：

```sql
SHOW VARIABLES LIKE 'innodb_adaptive_hash_index';
```

如果返回的值是 ON，说明自适应哈希索引是开启的。

![二哥的 Java 进阶之路](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240312095811.png)

#### 03、说说从存储位置上分类：

①、聚簇索引：聚簇索引的叶子节点保存了一行记录的所有列信息。也就是说，聚簇索引的叶子节点中，包含了一个完整的记录行。

![代码敲上天.：聚簇索引](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240311231652.png)

②、非聚簇索引：它的叶子节点只包含一个主键值，通过非聚簇索引查找记录要先找到主键，然后通过主键再到聚簇索引中找到对应的记录行，这个过程被称为回表。

![代码敲上天.非聚簇索引，以 age 为索引](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240311231611.png)

InnoDB 存储引擎的主键使用的是聚簇索引，MyISAM 存储引擎不管是主键索引，还是二级索引使用的都是非聚簇索引。

想要了解 B 树和 B+树的更多区别，推荐阅读：

- [GitHub：B 树和 B+树详解](https://github.com/wardseptember/notes/blob/master/docs/B%E6%A0%91%E5%92%8CB+%E6%A0%91%E8%AF%A6%E8%A7%A3.md)
- [思否：面试官问你 B 树和 B+树，就把这篇文章丢给他](https://segmentfault.com/a/1190000020416577)
- [极客时间：为什么用 B+树来做索引？](https://time.geekbang.org/column/article/112298)
- [一颗剽悍的种子：用 16 张图就给你讲明白 MySQL 为什么要用 B+树做索引](https://mp.weixin.qq.com/s/muOwXKNTvPjXjrLsFRveIw)

想要了解更多聚簇索引和非聚簇索引，推荐阅读：

- [磊哥：聚簇索引和非聚簇索引有什么区别？](https://www.cnblogs.com/vipstone/p/16370305.html)
- [浅谈聚簇索引与非聚簇索引](https://learnku.com/articles/50096)
- [聚簇索引、非聚簇索引、联合索引、唯一索引](https://blog.csdn.net/m0_52226803/article/details/135494499)
- [松哥：再聊 MySQL 聚簇索引](https://mp.weixin.qq.com/s/F0cEzIqecF4sWg7ZRmHKRQ)

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的科大讯飞非凡计划研发类面经原题：聊聊 MySQL 的索引
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 23 QQ 后台技术一面面试原题：MySQL 索引，为什么用 B+树
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的携程面经同学 10 Java 暑期实习一面面试原题：讲一讲 MySQL 的索引，如何优化 SQL？
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的阿里面经同学 5 阿里妈妈 Java 后端技术一面面试原题：索引的分类，创建索引的最佳实践
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的 360 面经同学 3 Java 后端技术一面面试原题：mysql 的索引用过哪些
> 6. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的用友面试原题：索引是什么？有哪些索引
> 7. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的作业帮面经同学 1 Java 后端一面面试原题：普通索引的叶子节点存储的是什么
> 8. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的作业帮面经同学 1 Java 后端一面面试原题：innodb底层有哪些数据结构
> 9. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的比亚迪面经同学 12 Java 技术面试原题：索引有哪些，区别是什么


### 37.创建索引有哪些注意点？

①、选择合适的列作为索引

- 经常作为查询条件（WHERE 子句）、排序条件（ORDER BY 子句）、分组条件（GROUP BY 子句）的列是建立索引的好选项。
- 区分度低的字段，例如性别，不要建索引
- 频繁更新的字段，不要建索引

②、避免过多的索引

- 因为每个索引都需要占用额外的磁盘空间。
- 更新表（INSERT、UPDATE、DELETE 操作）的时候，索引都需要被更新。

③、利用前缀索引和索引列的顺序

- 对于字符串类型的列，可以考虑使用前缀索引来减少索引大小。
- 在创建联合索引时，应该根据查询条件将最常用的放在前面，遵守最左前缀原则。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的用友金融一面原题：索引的作用，加索引需要注意什么
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的京东同学 10 后端实习一面的原题：查询和更新都频繁的字段是否适合创建索引，为什么
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小米春招同学 K 一面面试原题：索引怎么设计才是最好的
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的京东面经同学 1 Java 技术一面面试原题：MySQL 索引结构，建立索引的策略
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的阿里面经同学 5 阿里妈妈 Java 后端技术一面面试原题：索引的分类，创建索引的最佳实践
> 6. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的oppo 面经同学 8 后端开发秋招一面面试原题：建索引的时候应该注意什么
> 7. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的京东面经同学 5 Java 后端技术一面面试原题：建立索引考虑哪些问题

### 38.索引哪些情况下会失效呢？

- **在索引列上使用函数或表达式**：索引可能无法使用，因为 MySQL 无法预先计算出函数或表达式的结果。例如：`SELECT * FROM table WHERE YEAR(date_column) = 2021`。
- 使用不等于（`<>`）或者 NOT 操作符：因为它们会扫描全表。
- **使用 LIKE 语句，但通配符在前面**：以“%”或者“\_”开头，索引也无法使用。例如：`SELECT * FROM table WHERE column LIKE '%abc'`。
- 联合索引，但 WHERE 不满足最左前缀原则，索引无法起效。例如：`SELECT * FROM table WHERE column2 = 2`，联合索引为 `(column1, column2)`。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 1 Java 后端技术一面面试原题：where b =5 是否一定会命中索引？（索引失效场景）
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的京东面经同学 1 Java 技术一面面试原题：索引失效的情况
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小公司面经合集同学 1 Java 后端面试原题：编写 SQL 语句哪些情况会导致索引失效？
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的比亚迪面经同学 12 Java 技术面试原题：索引失效场景
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的 OPPO 面经同学 1 面试原题：什么情况下索引失效？
> 6. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的京东面经同学 5 Java 后端技术一面面试原题：索引失效情况
> 7. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的理想汽车面经同学 2 一面面试原题：什么操作会导致索引失效？

### 39.索引不适合哪些场景呢？

- **数据表较小**：当表中的数据量很小，或者查询需要扫描表中大部分数据时，数据库优化器可能会选择全表扫描而不是使用索引。在这种情况下，维护索引的开销可能大于其带来的性能提升。
- **频繁更新的列**：对于经常进行更新、删除或插入操作的列，使用索引可能会导致性能下降。因为每次数据变更时，索引也需要更新，这会增加额外的写操作负担。

#### 性别字段要建立索引吗？

性别字段通常不适合建立索引。因为性别字段的选择性（区分度）较低，独立索引效果有限。

如果性别字段又很少用于查询，表的数据规模较小，那么建立索引反而会增加额外的存储空间和维护成本。

如果性别字段确实经常用于查询条件，数据规模也比较大，可以将性别字段作为复合索引的一部分，与选择性较高的字段一起加索引，会更好一些。

#### 什么是区分度？

区分度（Selectivity）是衡量一个字段在数据库表中唯一值的比例，用来表示该字段在索引优化中的有效性。

区分度 = 字段的唯一值数量 / 字段的总记录数；接近 1，字段值大部分是唯一的。例如，用户的唯一 ID，一般都是主键索引。接近 0，则说明字段值重复度高。

例如，一个表中有 1000 条记录，其中性别字段只有两个值（男、女），那么性别字段的区分度只有 0.002。

高区分度的字段更适合拿来作为索引，因为索引可以更有效地缩小查询范围。

#### MySQL查看字段区分度的命令？

在 MySQL 中，可以通过 `COUNT(DISTINCT column_name)` 和 `COUNT(*)` 的比值来计算字段的区分度。例如：

```sql
SELECT 
    COUNT(DISTINCT gender) / COUNT(*) AS gender_selectivity
FROM 
    users;
```

#### 什么样的字段适合加索引？什么不适合？

适合加索引的字段包括：

- 经常出现在 WHERE 子句中的字段，如 `SELECT * FROM users WHERE age = 30` 中的 age 字段，加上索引后可以快速定位到满足条件的记录。
- 经常用于 JOIN 的字段，如 `SELECT * FROM users u JOIN orders o ON u.id = o.user_id` 中的 user_id 字段，加上索引后可以避免多表扫描。
- 经常出现在 ORDER BY 或 GROUP BY 子句中的字段，如 `SELECT * FROM users ORDER BY age` 中的 age 字段。加上索引后可以避免额外的排序操作。
- 高区分度的字段，查询时可以有效减少返回的数据行，比如用户 ID、邮箱等。

对应的，不适合加索引的字段包括：

- 低区分度字段，如性别、状态等。
- 经常更新的字段，如用户的登录时间、登录次数等。
- 不经常出现在查询条件中的字段，如用户的生日、地址等。
- 使用函数、运算符的字段。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 1 技术二面面试原题：性别字段要建立索引吗？为什么？什么是区分度？MySQL查看字段区分度的命令？
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的快手同学 2 一面面试原题：什么样的字段适合加索引？什么不适合？

### 40.索引是不是建的越多越好？

当然不是。

- **索引会占据磁盘空间**
- **索引虽然会提高查询效率，但是会降低更新表的效率**。每次对表进行增删改操作，MySQL 不仅要更新数据，还要更新对应的索引文件。

#### 说说索引优化的思路？

①、选择合适的索引类型

- 如果需要等值查询和范围查询，请选择 B+树索引。
- 如果是用于处理文本数据的全文搜索，请选择全文索引。

②、创建适当的索引

- 创建组合索引时，应将查询中最常用、区分度高的列放在前面。对于查询条件 `WHERE age = 18 AND gender = '女' AND city = '洛阳'`，如果 age 列的值相对较为分散，可以优先考虑将 age 放在组合索引的第一位。
- 使用 SELECT 语句时，尽量选择覆盖索引来避免不必要的回表操作，也就是说，索引中包含了查询所需的所有列；但要注意，覆盖索引的列数不宜过多，否则会增加索引的存储空间。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的比亚迪面经同学 12 Java 技术面试原题：索引优化的思路

### 41.为什么 InnoDB 要使用 B+树作为索引？

1. 推荐阅读：[终于把 B 树搞明白了](https://www.bilibili.com/video/BV1mY4y1W7pS)
2. 推荐阅读：[一篇文章讲透 MySQL 为什么要用 B+树实现索引](https://cloud.tencent.com/developer/article/1543335)

MySQL 的默认存储引擎是 InnoDB，它采用的是 B+树索引，是 B 树的升级版。

B 树是一种自平衡的多路查找树，和红黑树、二叉平衡树不同，B 树的每个节点可以有 m 个子节点，而红黑树和二叉平衡树都只有 2 个。

换句话说，红黑树、二叉平衡树是细高个，而 B 树是矮胖子。

![二哥的 Java 进阶之路：B 树](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240322132606.png)

内存和磁盘在进行 IO 读写的时候，有一个最小的逻辑单元，叫做页（Page），页的大小一般是 4KB。

![二哥的 Java 进阶之路：IO 读写](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240322133650.png)

那为了提高读写效率，从磁盘往内存中读数据的时候，一次会读取至少一页的数据，比如说读取 2KB 的数据，实际上会读取 4KB 的数据；读取 5KB 的数据，实际上会读取 8KB 的数据。**我们要尽量减少读写的次数**。

因为读的次数越多，效率就越低。就好比我们在工地上搬砖，一次搬 10 块砖肯定比一次搬 1 块砖的效率要高，反正我每次都搬 10 块（😁）。

对于红黑树、二叉平衡树这种细高个来说，每次搬的砖少，因为力气不够嘛，那来回跑的次数就越多。

树越高，意味着查找数据时就需要更多的磁盘 IO，因为每一层都可能需要从磁盘加载新的节点。

![用户1260737：二叉树](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240322140825.png)

B 树的节点大小通常与页的大小对齐，这样每次从磁盘加载一个节点时，可以正好是一个页的大小。因为 B 树的节点可以有多个子节点，可以填充更多的信息以达到一页的大小。

![用户1260737：B 树](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240322141957.png)

B 树的一个节点通常包括三个部分：

- 键值：即表中的主键
- 指针：存储子节点的信息
- 数据：表记录中除主键外的数据

不过，正所谓“祸兮福所倚，福兮祸所伏”，正是因为 B 树的每个节点上都存了数据，就导致每个节点能存储的键值和指针变少了，因为每一页的大小是固定的，对吧？

于是 B+树就来了，B+树的非叶子节点只存储键值，不存储数据，而叶子节点存储了所有的数据，并且构成了一个有序链表。

![用户1260737：B+树](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240322142950.png)

这样做的好处是，非叶子节点上由于没有存储数据，就可以存储更多的键值对，树就变得更加矮胖了，于是就更有劲了，每次搬的砖也就更多了（😂）。

由此一来，查找数据进行的磁盘 IO 就更少了，查询的效率也就更高了。

再加上叶子节点构成了一个有序链表，范围查询时就可以直接通过叶子节点间的指针顺序访问整个查询范围内的所有记录，而无需对树进行多次遍历。

**注**：在 InnoDB 存储引擎中，默认的页大小是 16KB。可以通过 `show variables like 'innodb_page_size';` 查看。

![二哥的 Java 进阶之路：页的大小](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240322135441.png)

#### 简版回答：

MySQL 的默认存储引擎是 InnoDB，它采用的是 B+树索引，B+树是一种自平衡的多路查找树，和红黑树、二叉平衡树不同，B+树的每个节点可以有 m 个子节点，而红黑树和二叉平衡树都只有 2 个。

![William Johnson：b+树](https://cdn.tobebetterjavaer.com/stutymore/mysql-20241104203402.png)

和 B 树不同，B+树的非叶子节点只存储键值，不存储数据，而叶子节点存储了所有的数据，并且构成了一个有序链表。

这样做的好处是，非叶子节点上由于没有存储数据，就可以存储更多的键值对，再加上叶子节点构成了一个有序链表，范围查询时就可以直接通过叶子节点间的指针顺序访问整个查询范围内的所有记录，而无需对树进行多次遍历。查询的效率会更高。

#### B+树的页是单向链表还是双向链表？如果从大值向小值检索，如何操作？

B+树的叶子节点是通过双向链表连接的，这样可以方便范围查询和反向遍历。

- 当执行范围查询时，可以从范围的开始点或结束点开始，向前或向后遍历，这使得查询更为灵活。
- 在需要对数据进行逆序处理时，双向链表非常有用。

如果需要在 B+树中从大值向小值进行检索，可以按以下步骤操作：

- 定位到最右侧节点：首先，找到包含最大值的叶子节点。这通常通过从根节点开始向右遍历树的方式实现。
- 反向遍历：一旦定位到了最右侧的叶子节点，可以利用叶节点间的双向链表向左遍历。

#### 为什么 MongoDB 索引用 B树，而 MySQL 用 B+ 树？

推荐阅读：[为什么 MongoDB 索引用 B树，而 MySQL 用 B+ 树？](https://www.cnblogs.com/rjzheng/p/12316685.html)

B树的特点是每个节点都存储数据，相邻的叶子节点之间没有指针链接。

![孤独烟：B树](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240516125249.png)

B+树的特点是非叶子节点只存储索引，叶子节点存储数据，并且相邻的叶子节点之间有指针链接。

![孤独烟：B+树](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240516125326.png)

那么在查找单条数据时，B 树的查询效率可能会更高，因为每个节点都存储数据，所以最好情况就是 O(1)。

但由于 B 树的节点之间没有指针链接，所以并不适合做范围查询，因为范围查询需要遍历多个节点。

而 B+ 树的叶子节点之间有指针链接，所以适合做范围查询，因为可以直接通过叶子节点间的指针顺序访问整个查询范围内的所有记录，而无需对树进行多次遍历。

MySQL 属于关系型数据库，所以范围查询会比较多，所以采用了 B+树；但 MongoDB 属于非关系型数据库，在大多数情况下，只需要查询单条数据，所以 MongoDB 选择了 B 树。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动商业化一面的原题：说说 B+树，为什么 3 层容纳 2000W 条，为什么 2000w 条数据查的快
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的国企面试原题：说说 MySQL 的底层数据结构，B 树和 B+树的区别
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 22 暑期实习一面面试原题：MySQL 为什么选用 B+树
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小米面经同学 E 第二个部门 Java 后端技术一面面试原题：说一说 mysql 索引的底层机制
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的京东面经同学 1 Java 技术一面面试原题：MySQL 索引结构，建立索引的策略
> 6. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯云智面经同学 16 一面面试原题：MySQL 索引结构，为什么用 B+树？
> 7. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小公司面经同学 5 Java 后端面试原题：数据库索引讲一下，然后为什么会加快查询速度，我讲到了 B+树，然后问了 B 数与 B+树区别
> 8. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的百度面经同学 1 文心一言 25 实习 Java 后端面试原题：B+树的页是单向链表还是双向链表？如果从大值向小值检索，如何操作？
> 9. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的得物面经同学 1 面试原题：项目索引，MySQL索引，mongoDB为什么用的B树，二者比较
> 10. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的oppo 面经同学 8 后端开发秋招一面面试原题：Mysql索引的数据结构，为什么选择这样的数据结构
> 11. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的京东面经同学 8 面试原题：索引
> 12. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团同学 9 一面面试原题：B+树？
> 13. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团面经同学 15 点评后端技术面试原题：索引的数据结构
> 14. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的得物面经同学 9 面试题目原题：B+树了解吗？底层呢？为什么这么用？
> 15. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的滴滴面经同学 3 网约车后端开发一面原题：MySQL索引原理，B+树更扁 有什么好处


### 42.一棵 B+树能存储多少条数据呢？

推荐阅读：[清幽之地：InnoDB 一棵 B+树可以存放多少行数据？](https://juejin.cn/post/6904293886626103309)

![清幽之地：B+树存储数据条数](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-16f3523d-20b0-4376-908d-ac40b329768f.jpg)

假如我们的主键 ID 是 bigint 类型，长度为 8 个字节。指针大小在 InnoDB 源码中设置为 6 字节，这样一共 14 字节。所以非叶子节点(一页16k)可以存储 16384/14=1170 个这样的单元(键值+指针)。

一个指针指向一个存放记录的页，一页可以放 16 条数据，树深度为 2 的时候，可以存放 1170\*16=**18720** 条数据。

同理，树深度为 3 的时候，可以存储的数据为 1170\*1170\*16=**21902400**条记录。

理论上，在 InnoDB 存储引擎中，B+树的高度一般为 2-4 层，就可以满足千万级数据的存储。查找数据的时候，一次页的查找代表一次 IO，当我们通过主键索引查询的时候，最多只需要 2-4 次 IO 就可以了。

#### innodb 使用数据页存储数据？默认数据页大小 16K，我现在有一张表，有 2kw 数据，我这个 b+树的高度有几层？

推荐阅读：[Innodb 引擎中 B+树一般有几层？能容纳多少数据量？](https://www.cnblogs.com/yifanSJ/p/17662132.html)

在 MySQL 中，InnoDB 存储引擎的最小存储单元是页，默认大小是 16k。页可以用来存储 B+树叶子节点上的数据，也可以存放非叶子节点上的键值对。

在查找数据时，一次页的查找代表一次 IO，一般 B+树的高度为 2-4 层，所以通过主键索引查询时，最多只需要 2-4 次 IO 就可以了。

已知非叶子节点可以存储 1170 个键值对。

> 主键 ID 是 bigint 类型，长度为 8 个字节。指针大小在 InnoDB 源码中设置为 6 字节，这样一共是 14 字节。所以非叶子节点（一页）可以存储 16384/14=1170 个这样的单元(键值+指针)。

假设一行数据的大小为 1KB，那么一页的叶子节点就可以存储 16 条数据。对于 3 层的 B+树，第一层叶子节点数\*第二层叶子节点数\*一页能够存储的数据量 = 1170\*1170\*16 = 21902400 条数据。

![yifanSJ：3 层 B+树](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240410124358.png)

如果有 2KW 条数据，那么这颗 B+树的高度为 3 层。

#### 每个叶子节点能存放多少条数据？

B+ 树索引的每个叶子节点对应一个数据页，默认大小为 16KB。假设一条数据的大小为 1k，那么每个叶子节点可以存放 16 条数据。


> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动商业化一面的原题：说说 B+树，为什么 3 层容纳 2000W 条，为什么 2000w 条数据查的快
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的奇安信面经同学 1 Java 技术一面面试原题：innodb 使用数据页存储数据？默认数据页大小 16K，我现在有一张表，有 2kw 数据，我这个 b+树的高度有几层？
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团面经同学 18 成都到家面试原题：一张表最多存多少数据（我答得2kw，根据b+树的三层高度计算）
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的得物面经同学 1 面试原题：MySQL B+树的度数越大越好吗，一般设多少
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 29 Java 后端一面原题：InnoDB中一个三层的B+树能存多少数据？每个叶子节点能存放多少条数据？

### 43.为什么不用普通二叉树？

普通二叉树存在退化的情况，如果它退化成链表，就相当于全表扫描。

![二哥的Java 进阶之路：普通二叉树](https://cdn.tobebetterjavaer.com/stutymore/mysql-20241115151059.png)

#### 为什么不用平衡二叉树呢？

虽然 AVL 树是平衡二叉树，但因为只有 2 叉，高度会比较高，磁盘 I/O 次数就会非常多。

![二哥的Java 进阶之路：AVL 树](https://cdn.tobebetterjavaer.com/stutymore/mysql-20241115151729.png)

而 B+ 树是 N 叉，每一层可以存储更多的节点数据，树的高度就会降低，因此读取磁盘的次数就会下降，查询效率就快。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的百度面经同学 1 文心一言 25 实习 Java 后端面试原题：MySQL 索引为什么使用 B+树而不是用别的数据结构？
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 27 云后台技术一面面试原题：为什么不用二叉树？为什么不用AVL树？

### 44.为什么用 B+ 树而不用 B 树呢？

B+ 树相比 B 树有 2 个显著优势：

首先，B+ 树的非叶子节点不存储数据，能包含更多的键值指针，因此在相同节点容量下，B+ 树的层级更少，树的高度更低。较少的树层级意味着查找路径更短，磁盘 I/O 次数更少。

![极客时间：B 树](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240325115614.png)

其次，B+ 树的叶子节点通过链表相连，非常适合范围查询，如 ORDER BY 和 BETWEEN。

![极客时间：B+树](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240325115641.png)

只需要找到符合条件的第一个叶子节点，顺序扫描后续的叶子节点就可以了。相比之下，B 树的每次范围查询都需要回溯到父节点，查询效率较低。

#### B+树的时间复杂度是多少？

树的高度 h 为：

$$
h = \lceil \log_m N \rceil
$$

其中 N 是数据总量，m 是阶数。每层需要做一次二分查找，复杂度为 $O(\log m)$。

总复杂度为：

$$
O(\log_m N \cdot \log m) = O(\log N)
$$

#### 了解快排吗？

推荐链接：[快速排序](https://oi-wiki.org/basic/quick-sort/)

快速排序是一种基于分治法的高效排序算法。其核心思想是：

1. 选择一个基准值。
2. 将数组分为两部分，左边小于基准值，右边大于或等于基准值。
3. 对左右两部分递归排序，最终合并。

#### 为什么用 B+树不用跳表呢？

- 跳表基于链表，节点分布不连续，会频繁触发随机磁盘访问，性能较差。
- 跳表需要逐节点遍历链表，范围查询性能不如 B+ 树。

#### B+树的范围查找怎么做的？

B+ 树索引的范围查找主要依赖叶子节点之间的双向链表来完成。

第一步，从 B+ 树的根节点开始，通过索引键值逐层向下，找到第一个满足条件的叶子节点。

第二步，利用叶子节点之间的双向链表，从起始节点开始，依次向后遍历每个节点。当索引值超过查询范围，或者遍历到链表末尾时，终止查询。

比如说在下面这棵 B+ 树上查找 45。

![oi-wiki：查找 45](https://cdn.tobebetterjavaer.com/stutymore/mysql-20241223114806.png)

第一步，从根节点开始，因为比 25 大，所以从右子树开始。因为 45 比 35大，所以和右边的索引比较，右侧的索引也是 45，所以继续往右子树查找。

![oi-wiki：从根节点开始](https://cdn.tobebetterjavaer.com/stutymore/mysql-20241223114907.png)

第二步，从叶子节点 45 开始，依次遍历，找到 45。

![oi-wiki：找到 45](https://cdn.tobebetterjavaer.com/stutymore/mysql-20241223115300.png)

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的支付宝面经同学 2 春招技术一面面试原题：聚簇索引和非聚簇索引的区别？B+树叶子节点除了存数据还有什么？
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的奇安信面经同学 1 Java 技术一面面试原题：b 树和 b+树有什么区别
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的百度面经同学 1 文心一言 25 实习 Java 后端面试原题：MySQL 索引为什么使用 B+树而不是用别的数据结构？
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 8 Java 后端实习一面面试原题：mysql b+树和b树的区别
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的作业帮面经同学 1 Java 后端一面面试原题：B+树有哪些优点
> 6. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的同学 1 贝壳找房后端技术一面面试原题：为什么用b+树不用b树
> 7. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的阿里系面经同学 19 饿了么面试原题：索引为什么用B+树不用B树 时间复杂度深究  b+树 快速排序...

### 45.Hash 索引和 B+ 树索引区别是什么？

- B+ 树索引可以进行范围查询，Hash 索引不能。
- B+ 树索引支持联合索引的最左侧原则，Hash 索引不支持。
- B+ 树索引支持 order by 排序，Hash 索引不支持。
- Hash 索引在等值查询上比 B+ 树索引效率更高。
- B+ 树使用 like 进行模糊查询的时候，`LIKE 'abc%'` 的话可以起到索引优化的作用，Hash 索引无法进行模糊查询。

#### MySQL 模糊查询怎么查，什么情况下模糊查询不走索引？

MySQL 中进行模糊查询主要使用 LIKE 语句，结合通配符 %（代表任意多个字符）和 \_（代表单个字符）来实现。

```sql
SELECT * FROM table WHERE column LIKE '%xxx%';
```

这个查询会返回所有 column 列中包含 xxx 的记录。

但是，如果模糊查询的通配符 % 出现在搜索字符串的开始位置，如 `LIKE '%xxx'`，MySQL 将无法使用索引，因为数据库必须扫描全表以匹配任意位置的字符串。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团面经同学 16 暑期实习一面面试原题：MySQL 模糊查询怎么查，什么情况下模糊查询不走索引
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的作业帮面经同学 1 Java 后端一面面试原题：为什么不用hash索引

### 46.聚簇索引与非聚簇索引的区别？

MySQL 默认的存储引擎是 InnoDB，InnoDB 的索引是按照 B+ 树结构存储的，不同类型的索引有不同的存储方式。

主键索引是按照聚簇索引的方式存储的，也就是说，主键索引的叶子节点存储的是整行数据，数据和索引在同一个 B+ 树中。

普通索引、唯一索引是按照非聚簇索引的方式存储的，每个辅助索引都是独立的 B+ 树，叶子节点存储的是主键值，通过主键值回到主键索引中查找完整的数据，俗称回表。

![三分恶面渣逆袭：聚簇索引和非聚簇索引](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-692cced2-615a-4b70-a933-69771d53e809.jpg)

每个表只能有一个聚簇索引；但可以有多个非聚簇索引。

举例来说：

- InnoDB 采用的是聚簇索引，如果没有显式定义主键，InnoDB 会选择一个唯一的非空列作为隐式的聚簇索引；如果这样的列也不存在，InnoDB 会自动生成一个隐藏的行 ID 作为聚簇索引。这意味着数据与主键是紧密绑定的，行数据直接存储在索引的叶子节点上。
- MyISAM 采用的是非聚簇索引，表数据存储在一个地方，而索引存储在另一个地方，索引指向数据行的物理位置。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小米春招同学 K 一面面试原题：mysql：聚簇索引和非聚簇索引区别
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的支付宝面经同学 2 春招技术一面面试原题：聚簇索引和非聚簇索引的区别？B+树叶子节点除了存数据还有什么？
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 1 Java 后端技术一面面试原题：聚簇索引是什么？非聚簇索引是什么？
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯云智面经同学 16 一面面试原题：聚簇索引和非聚簇索引的区别？
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的快手面经同学 1 部门主站技术部面试原题：Mysql 的聚簇索引和非聚簇索引的区别是什么?
> 6. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的作业帮面经同学 1 Java 后端一面面试原题：mysql的聚簇索引是什么
> 7. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 29 Java 后端一面原题：MySQL的索引怎么存储的？每个索引一个B+树，还是多个索引放一个B+树？叶子节点中存的是什么数据？

### 47.回表了解吗？

回表是指在数据库查询过程中，通过非聚簇索引（secondary index）查找到记录的主键值后，再根据这个主键值到聚簇索引（clustered index）中查找完整记录的过程。

回表操作通常发生在使用非聚簇索引进行查询，但查询的字段不全在该索引中，必须通过主键进行再次查询以获取完整数据。

换句话说，数据库需要先查找索引，然后再根据索引回到数据表中去查找实际的数据。

因此，使用非聚簇索引查找数据通常比使用聚簇索引要慢，因为需要进行两次磁盘访问。当然，如果索引所在的数据页已经被加载到内存中，那么非聚簇索引的查找速度也可以非常快。

例如：`select * from user where name = '张三';`，会先从辅助索引中找到 name='张三' 的主键 ID，然后再根据主键 ID 从主键索引中找到对应的数据行。

![三分恶面渣逆袭：InnoDB 回表](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-7d69e289-dc05-47e1-9308-20a8278ebf2e.jpg)

假设现在有一张用户表 users：

```sql
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    age INT,
    email VARCHAR(50),
    INDEX (name)
);
```

执行查询：

```sql
SELECT * FROM users WHERE name = '张三';
```

查询过程如下：

- MySQL 使用 name 列上的非聚簇索引查找到所有 `name = '张三'` 的记录，得到对应的主键 id。
- 使用主键 id 到聚簇索引中查找完整记录。

#### 回表记录越多好吗？

回表记录越多并不是一件好事。事实上，回表的代价是很高的，尤其在记录较多时，回表操作会显著影响查询性能。

因为每次回表操作都需要进行一次磁盘 I/O 读取操作。如果回表记录很多，会导致大量的磁盘 I/O。

索引覆盖（Covering Index）可以减少回表操作，将查询的字段都放在索引中，这样不需要回表就可以获取到查询结果了。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 1 Java 后端技术一面面试原题：使用非聚簇索引如何查找数据？
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 1 技术二面面试原题：回表记录越多好吗？（回表的代价）

### 48.联合索引了解吗？（补充）

>2024 年 11 月 22 日增补

联合索引指的是一个索引包含多个列。联合索引的创建语法如下：

```sql
CREATE INDEX index_name ON table_name (column1, column2, ...);
```

#### 联合索引底层的存储结构是怎样的？

推荐阅读：[ivan.L：B+树详解](https://ivanzz1001.github.io/records/post/data-structure/2018/06/16/ds-bplustree)

在 MySQL 中，联合索引的底层存储结构是 B+ 树。B+ 树是一种多路搜索树，它的每个节点最多包含 M 个子节点，其中 M 是一个正整数。

![ivan.L：三阶的 B+树](https://cdn.tobebetterjavaer.com/stutymore/mysql-20241122163540.png)

#### 联合索引的叶子节点存的什么内容?

比如说有这样一个联合索引 idx_c2_c3（c2 和 c3 列，主键是 c1），那么叶子节点存储的是 c2、c3 索引列的值和c1 主键列的值。这样，当查询时，可以先通过联合索引找到对应的主键值，然后再通过主键值找到完整的数据行。

![小孩子：联合索引](https://cdn.tobebetterjavaer.com/stutymore/mysql-20241122171938.png)

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的百度同学 4 面试原题：联合索引底层存储结构(和其他种类的索引存储结构有什么区别?)联合索引的叶子节点存的什么内容?

### 49.覆盖索引了解吗？

覆盖索引（Covering Index）指的是一种索引能够“覆盖”查询中所涉及的所有列，换句话说，查询所需的数据全部都可以从索引中直接获取，而无需访问数据表的行数据（也就是无需回表）。

通常情况下，索引中只包含表的某些字段，数据库在通过索引查找到满足条件的记录后，还需要回到表中获取其它字段的数据，这个过程叫做“回表”。

假设有一张用户表 users，包含以下字段：id、name、email、age。执行下面的查询：

```sql
SELECT age, email FROM users WHERE name = "张三";
```

如果在 name 列上创建了索引，但没有在 age 和 email 列上创建索引，那么数据库引擎会：

1. 使用 name 列的索引查找到满足条件的记录的 id。
2. 根据 id 回表查询 age 和 email 字段的数据。

如果创建了一个覆盖索引 idx_users_name_email_age 包含 name、email、age 列：

```sql
CREATE INDEX idx_users_name_email_age ON users (age, name, email);
```

那么执行：

```sql
SELECT age, email FROM users WHERE name = "张三";
```

查询时可以直接从索引中获取 age 和 email 的值，而不需要回表。这是因为索引已经覆盖了查询所需的所有字段。

![三分恶面渣逆袭：覆盖索引](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-69e33c61-34bc-4f4b-912b-ca7beb9d5c7c.jpg)

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的作业帮面经同学 1 Java 后端一面面试原题：了解覆盖索引吗
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团同学 9 一面面试原题：索引覆盖，回表？

### 50.什么是最左前缀原则？

在使用联合索引时，应当遵守最左前缀原则，或者叫最左匹配原则（最左前缀匹配原则）。

它指的是在使用联合索引时，查询条件从索引的最左列开始并且不跳过中间的列。

如果一个复合索引包含`(col1, col2, col3)`，那么它可以支持 `col1`、`col1,col2` 和 `col1, col2, col3` 的查询优化，但不支持只有 col2 或 col3 的查询。

也就说，在进行查询时，如果没有遵循最左前缀，那么联合索引可能不会被利用，导致查询效率降低。

#### 为什么不从最左开始查，就无法匹配呢？

比如有一个 user 表，我们给 name 和 age 建立了一个联合索引 `(name, age)`。

```sql
ALTER TABLE user add INDEX comidx_name_phone (name,age);
```

联合索引在 B+ 树中是复合的数据结构，按照从左到右的顺序依次建立搜索树 (name 在左边，age 在右边)。

![三分恶面渣逆袭：联合索引](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-e348203c-f00a-42a4-a745-b219d98ea435.jpg)

注意，name 是有序的，age 是无序的。当 name 相等的时候，age 才有序。

当我们使用 `where name= '张三' and age = '20'` 去查询的时候， B+ 树会优先比较 name 来确定下一步应该搜索的方向，往左还是往右。

如果 name 相同的时候再比较 age。

但如果查询条件没有 name，就不知道应该怎么查了，因为 name 是 B+树中的前置条件，没有 name，索引就派不上用场了。

#### 联合索引 (a, b)，where a = 1 和 where b = 1，效果是一样的吗

不一样。

`WHERE a = 1` 能有效利用联合索引，因为 a 是联合索引的第一个字段，符合最左前缀匹配原则。而 `WHERE b = 1` 无法利用该联合索引，因为缺少 a 的匹配条件，MySQL 会选择全表扫描。

我们来验证一下，假设有一个 ab 表，建立了联合索引 `(a, b)`：

```sql
CREATE TABLE ab (
    a INT,
    b INT,
    INDEX ab_index (a, b)
);
```

插入数据：

```sql
INSERT INTO ab (a, b) VALUES (1, 2), (1, 3), (2, 1), (3, 3), (2, 2);
```

执行查询：

![二哥的Java 进阶之路：最左前缀匹配的差异](https://cdn.tobebetterjavaer.com/stutymore/mysql-20241105120556.png)

通过 explain 可以看到，`WHERE a = 1` 使用了联合索引，而 `WHERE b = 1` 需要全表扫描，依次检查每一行。

#### （联合索引）下面怎么走的索引？

```
select * from t where a = 2 and b = 2;
select * from t where b = 2 and c = 2;
select * from t where a > 2 and b = 2;
```

联合索引在 MySQL 中的行为受最左前缀原则的影响。假设 t 表上有一个联合索引 (a, b, c)，我们来分析一下：

第一条 SQL 语句包含条件 a = 2 和 b = 2，刚好符合联合索引的前两列。

![explain中也可以明确看出来用了索引](https://cdn.tobebetterjavaer.com/stutymore/mysql-20241115153445.png)

第二条 SQL 语句由于未使用最左前缀中的 a，可能会触发全表扫描。

![rows 为 10 行，说明全表扫描了](https://cdn.tobebetterjavaer.com/stutymore/mysql-20241115153552.png)

第三条 SQL 语句在范围条件 a > 2 之后，索引后会停止匹配，b = 2 的条件需要额外过滤。

![rows 为 9 行说明的确走索引了，但还需要额外过滤](https://cdn.tobebetterjavaer.com/stutymore/mysql-20241115153636.png)

#### 联合索引 (a, b, c)，where b = 1，能走吗，where a = 1，能走吗

`WHERE b = 1` 无法利用联合索引，因为缺少 a 的匹配条件，MySQL 会选择全表扫描。

`WHERE a = 1` 能有效利用联合索引，因为 a 是联合索引的第一个字段，符合最左前缀匹配原则。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的比亚迪面经同学 3 Java 技术一面面试原题：说一下数据库索引，最左匹配原则和索引的结构
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯云智面经同学 16 一面面试原题：说说最左前缀原则
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团面经同学 3 Java 后端技术一面面试原题：最左匹配原则 索引失效
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的招银网络科技面经同学 9 Java 后端技术一面面试原题：Mysql联合索引的设计原则
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的同学 1 贝壳找房后端技术一面面试原题：联合索引 (a, b)，where a = 1 和 where b = 1，效果是一样的吗
> 6. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 27 云后台技术一面面试原题：（联合索引）下面怎么走的索引？
> 7. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的滴滴面经同学 3 网约车后端开发一面原题：联合索引 (a, b, c)，where b = 1，能走吗，where a = 1，能走吗

### 51.什么是索引下推优化？

索引下推`（Index Condition Pushdown (ICP) ）`是 MySQL 5.6 时添加的，它允许在访问索引时对数据进行过滤，从而减少回表的次数。

例如有一张 user 表，建了一个联合索引（name, age），查询语句：`select * from user where name like '张%' and age=10;`，没有索引下推优化的情况下：

MySQL 会先根据 `name like '张%'` 查找条件匹配的数据，对于符合索引条件的每一条记录，都会去访问对应的数据行，并在 Server 层过滤 `age=10` 这个条件。

这样就等于说及时 age 不等于 10，MySQL 也会执行回表操作。

![三分恶面渣逆袭：没有使用 ICP](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-c58f59e0-850b-4dfd-8129-2dfc51cf4768.jpg)

有索引下推的情况下，MySQL 可以在存储引擎层检查 `name like '张%' and age=10` 的条件，而不仅仅是 `name like '张%'`。

![三分恶面渣逆袭：使用 ICP](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-a8525cf3-2d16-49a9-a7da-a19762ed16df.jpg)

这就意味着不符合 age = 10 条件的记录将会在索引扫描时被过滤掉，从而减少了回表的次数。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团同学 9 一面面试原题：索引下推

### 52.如何查看是否用到了索引？（补充）

> 2024 年 03 月 15 日增补。

可以通过 `EXPLAIN` 关键字来查看是否使用了索引。

```sql
EXPLAIN SELECT * FROM table WHERE column = 'value';
```

其结果中的 `key` 值显示了查询是否使用索引，如果使用了索引，会显示索引的名称。比如下面这个截图就表明该查询语句使用了主键索引。

![二哥的 Java 进阶之路：explain 和索引](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240417092646.png)

#### (A,B,C) 联合索引 `select * from tbn where a=? and b in (?,?) and c>?` 会走索引吗？

> 2024 年 03 月 15 日增补。

这个查询会使用到联合索引 `(A,B,C)`，因为条件是按照索引列 `A`、`B`、`C` 的顺序来的，这是理想的使用场景。

1. 对于 `A=?`：这个条件是一个精确匹配，MySQL 会使用索引来定位到满足条件 `A=?` 的记录。

2. 对于 `B IN (?, ?)`：这个条件指定了 `B` 列可以取两个可能的值。MySQL 会利用索引来查找所有匹配 `A=?` 且 `B` 列为这两个值中任意一个的记录。

3. 对于 `C>?`：这个条件是一个范围查询。在已经根据 `A` 和 `B` 筛选的基础上，MySQL 会继续利用索引来查找 `C` 列值大于指定值的记录。

来验证一下。

第一步，建表。

```sql
CREATE TABLE tbn (A INT, B INT, C INT, D TEXT);
```

第二步，创建索引。

```sql
CREATE INDEX idx_abc ON tbn (A, B, C);
```

第三步，插入数据。

```sql
INSERT INTO tbn VALUES (1, 2, 3, 'First');
INSERT INTO tbn VALUES (1, 2, 4, 'Second');
INSERT INTO tbn VALUES (1, 3, 5, 'Third');
INSERT INTO tbn VALUES (2, 2, 3, 'Fourth');
INSERT INTO tbn VALUES (2, 3, 4, 'Fifth');
```

第四步，执行查询。

```sql
EXPLAIN SELECT * FROM tbn WHERE A=1 AND B IN (2, 3) AND C>3\G
```

![二哥的 Java 进阶之路](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240315140807.png)

从 `EXPLAIN` 输出结果来看，我们可以得到 MySQL 是如何执行查询的一些关键信息：

- **id**: 查询标识符，这里是 `1`。
- **select_type**: 查询的类型，这里是 `SIMPLE`，表示这是一个简单的查询，没有使用子查询或复杂的联合查询。
- **table**: 正在查询的表名，这里是 `tbn`。
- **type**: 查询类型，这里是 `range`，表示 MySQL 使用了范围查找。这是因为查询条件包含了 `>` 操作符，使得 MySQL 需要在索引中查找满足范围条件的记录。
- **possible_keys**: 可能被用来执行查询的索引，这里是 `idx_abc`，表示 MySQL 认为 `idx_abc` 索引可能会用于优化查询。
- **key**: 实际用来执行查询的索引，也是 `idx_abc`，这意味着 MySQL 实际上使用了 `idx_abc` 联合索引来优化查询。
- **key_len**: 使用索引的长度，这里是 `15` 字节，这提供了关于索引使用情况的一些信息，比如哪些列被用在了索引中。
- **ref**: 显示哪些列或常量被用作索引查找的参考。
- **rows**: MySQL 估计为了找到结果需要检查的行数，这里是 `2`。
- **filtered**: 表示根据表的条件过滤后，剩余多少百分比的结果，这里是 `100.00`%，意味着所有扫描的行都会被返回。
- **Extra**: 提供了关于查询执行的额外信息。`Using index condition` 表示 MySQL 使用了索引条件推送（Index Condition Pushdown，ICP），这是 MySQL 的一个优化方式，它允许在索引层面过滤数据，减少访问表数据的需要。

#### 联合索引 abc，a=1,c=1/b=1,c=1/a=1,c=1,b=1 走不走索引？

> 2024 年 03 月 19 日增补

我们通过实际的 SQL 来验证一下。

示例 1（a=1,c=1）：

```sql
EXPLAIN SELECT * FROM tbn WHERE A=1 AND C=1\G
```

![二哥的 Java 进阶之路](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240319131120.png)

key 是 idx_abc，表明 a=1,c=1 会使用联合索引。但因为缺少了 B 字段的条件，所以 MySQL 可能无法利用索引来直接定位到精确的行，而是使用索引来缩小搜索范围。

最终，MySQL 需要检查更多的行（rows: 3）来找到满足所有条件的结果集，但总体来说，使用索引明显比全表扫描要高效得多。

示例 2（b=1,c=1）：

```sql
EXPLAIN SELECT * FROM tbn WHERE B=1 AND C=1\G
```

![二哥的 Java 进阶之路](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240319131245.png)

key 是 NULL，表明 b=1,c=1 不会使用联合索引。这是因为查询条件中涉及的字段 B 和 C 没有遵循之前定义的联合索引 idx_abc（A、B、C 顺序）的最左前缀原则。

在 idx_abc 索引中，A 是最左边的列，但是查询没有包含 A，因此 MySQL 无法利用这个索引。

示例 3（a=1,c=1,b=1）：

```sql
EXPLAIN SELECT * FROM tbn WHERE A=1 AND C=1 AND B=1\G
```

![二哥的 Java 进阶之路](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240319131306.png)

key 是 idx_abc，表明 a=1,c=1,b=1 会使用联合索引。

并且 rows=1，因为查询条件包含了联合索引 idx_abc 中所有列的等值条件，并且条件的顺序与索引列的顺序相匹配，使得查询能够准确、快速地定位到目标数据。

#### 联合索引的一个场景题：(a,b,c)联合索引，(b,c)是否会走索引吗？

> 2024 年 04 月 06 日增补

根据最左前缀原则，(b,c) 查询不会走索引。

因为联合索引 (a,b,c) 中，a 是最左边的列，联合索引在创建索引树的时候需要先有 a，然后才会有 b 和 c。而查询条件中没有包含 a，所以 MySQL 无法利用这个索引。

```sql
EXPLAIN SELECT * FROM tbn WHERE B=1 AND C=1\G
```

![二哥的 Java 进阶之路](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240408092425.png)

#### 建立联合索引(a,b,c)，where c = 5 是否会用到索引？为什么？

> 2024 年 04 月 08 日增补

在这个查询中，只有索引的第三列 c 被用作查询条件，而前两列 a 和 b 没有被使用。这不符合最左前缀原则，因此 MySQL 不会使用联合索引 (a,b,c)。

```sql
EXPLAIN SELECT * FROM tbn WHERE C=5\G
```

![二哥的 Java 进阶之路](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240408092646.png)

#### sql中使用like，如果遵循最左前缀匹配，查询是不是一定会用到索引？

> 2024 年 11 月 04 日增补

既然遵循最左前缀匹配，说明一定是联合索引，那么查询是一定会用到索引的。

但如果查询条件中的 like 通配符 % 出现在搜索字符串的开始位置，如 `age = 18 and name LIKE '%xxx'`，MySQL 会先使用联合索引 age_name 找到 age 符合条件的所有行，然后再进行 name 字段的过滤。

![二哥的java 进阶之路：联合索引前缀通配符](https://cdn.tobebetterjavaer.com/stutymore/mysql-20241104212447.png)

`type: ref` 表示使用索引查找匹配某个值的所有行。

![二哥的java 进阶之路：6 行数据](https://cdn.tobebetterjavaer.com/stutymore/mysql-20241104212743.png)

`rows: 3` 表示预计扫描 3 行。`filtered: 16.67` 表示在前面的 rows 中，大约有 16.67% 的行满足 WHERE 条件。

如果是后缀通配符，如 `age = 18 and name LIKE 'xxx%'`，MySQL 会直接使用联合索引 age_name 找到所有符合条件的行。

![二哥的java 进阶之路：联合索引后缀通配符](https://cdn.tobebetterjavaer.com/stutymore/mysql-20241104213135.png)

type 为 range，表示 MySQL 使用了索引范围扫描，`filtered 为 100.00%`，表示在扫描的行中，所有的行都满足 WHERE 条件。


> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动商业化一面的原题：(A,B,C) 联合索引 `select * from tbn where a=? and b in (?,?) and c>?` 会走索引吗？
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的京东同学 10 后端实习一面的原题：联合索引 abc，a=1,c=1/b=1,c=1/a=1,c=1,b=1 走不走索引
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的快手面经同学 7 Java 后端技术一面面试原题：联合索引的一个场景题：(a,b,c)联合索引，(b,c)是否会走索引
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 1 Java 后端技术一面面试原题：建立联合索引(a,b,c)，where c = 5 是否会用到索引？为什么？
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团面经同学 15 点评后端技术面试原题：sql中使用like，如果遵循最左前缀匹配，查询是不是一定会用到索引

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括 Java 基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM 等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

## 锁

### 53.MySQL 中有哪几种锁，列举一下？

![三分恶面渣逆袭：MySQL 中的锁](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-a07e4525-ccc1-4287-aec5-ebf3f277857c.jpg)

按锁粒度划分的话，MySQL 的锁有：

- 表锁：开销小，加锁快；锁定力度大，发生锁冲突概率高，并发度最低；不会出现死锁。
- 行锁：开销大，加锁慢；会出现死锁；锁定粒度小，发生锁冲突的概率低，并发度高。
- 页锁：开销和加锁速度介于表锁和行锁之间；会出现死锁；锁定粒度介于表锁和行锁之间，并发度一般。

按兼容性划分的话，MySQL 的锁有：

- 共享锁（S Lock），也叫读锁（read lock），相互不阻塞。
- 排他锁（X Lock），也叫写锁（write lock），排它锁是阻塞的，在一定时间内，只有一个请求能执行写入，并阻止其它锁读取正在写入的数据。

按加锁机制划分的话，MySQL 的锁有：

①、乐观锁

乐观锁基于这样的假设：冲突在系统中出现的频率较低，因此在数据库事务执行过程中，不会频繁地去锁定资源。相反，它在提交更新的时候才检查是否有其他事务已经修改了数据。

可以通过在数据表中使用版本号（Version）或时间戳（Timestamp）来实现，每次读取记录时，同时获取版本号或时间戳，更新时检查版本号或时间戳是否发生变化。

如果没有变化，则执行更新并增加版本号或更新时间戳；如果检测到冲突（即版本号或时间戳与之前读取的不同），则拒绝更新。

②、悲观锁

悲观锁假设冲突是常见的，因此在数据处理过程中，它会主动锁定数据，防止其他事务进行修改。

可以直接使用数据库的锁机制，如行锁或表锁，来锁定被访问的数据。常见的实现是 `SELECT FOR UPDATE` 语句，它在读取数据时就加上了锁，直到当前事务提交或回滚后才释放。

#### 如何解决库存超卖问题？

按照乐观锁的方式：

```sql
UPDATE inventory SET count = count - 1, version = version + 1 WHERE product_id = 1 AND version = current_version;
```

按照悲观锁的方式：

在事务开始时直接锁定库存记录，直到事务结束。

```sql
START TRANSACTION;
SELECT * FROM inventory WHERE product_id = 1 FOR UPDATE;
UPDATE inventory SET count = count - 1 WHERE product_id = 1;
COMMIT;
```

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小公司面经合集同学 1 Java 后端面试原题：乐观锁和悲观锁，库存的超卖问题的原因和解决方案？
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的京东同学 4 云实习面试原题：mysql一共有哪些锁
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团面经同学 15 点评后端技术面试原题：问了一下mysql的锁和MVCC
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的阿里系面经同学 19 饿了么面试原题：MySQL锁

### 54.全局锁和表级锁了解吗？（补充）

> 2024 年 07 月 15 日增补。

全局锁就是对整个数据库实例进行加锁，在 MySQL 中，可以使用 `FLUSH TABLES WITH READ LOCK` 命令来获取全局读锁。

全局锁的作用是保证在备份数据库时，数据不会发生变化【数据更新语句（增删改）、数据定义语句（建表、修改表结构等）和更新事务的提交语句】。当我们需要备份数据库时，可以先获取全局读锁，然后再执行备份操作。

#### 表锁了解吗？

表锁就是锁住整个表。在 MySQL 中，可以使用 `LOCK TABLES` 命令来锁定表。

表锁可以分为读锁（共享锁）和写锁（排他锁）。

```sql
LOCK TABLES your_table READ;
-- 执行读操作
UNLOCK TABLES;
```

读锁允许多个事务同时读取被锁定的表，但不允许任何事务进行写操作。

```sql
LOCK TABLES your_table WRITE;
-- 执行写操作
UNLOCK TABLES;
```

写锁允许一个事务对表进行读写操作，其他事务不能对该表进行任何操作（读或写）。

在进行大规模的数据导入、导出或删除操作时，为了防止其他事务对数据进行并发操作，可以使用表锁。

或者在进行表结构变更（如添加列、修改列类型）时，为了确保变更期间没有其他事务访问或修改该表，可以使用表锁。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团面经同学 3 Java 后端技术一面面试原题：数据库中的全局锁 表锁 行级锁  每种锁的应用场景有哪些
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的同学 30 腾讯音乐面试原题：mysql的表级锁有几种

### 55.说说 MySQL 的行锁？

行级锁（Row Lock）是数据库锁机制中最细粒度的锁，主要用于对单行数据进行加锁，以确保数据的一致性和完整性。

在 MySQL 中，InnoDB 存储引擎支持行级锁。通过 `SELECT ... FOR UPDATE` 可以加排他锁，通过 `LOCK IN SHARE MODE` 可以加共享锁。

比如说：

```sql
START TRANSACTION;

-- 加排他锁，锁定某一行
SELECT * FROM your_table WHERE id = 1 FOR UPDATE;
-- 对该行进行操作
UPDATE your_table SET column1 = 'new_value' WHERE id = 1;

COMMIT;
```

```sql
START TRANSACTION;

-- 加共享锁，锁定某一行
SELECT * FROM your_table WHERE id = 1 LOCK IN SHARE MODE;
-- 只能读取该行，不能修改

COMMIT;
```

在高并发环境中，行级锁能够提高系统的并发性能，因为锁定的粒度较小，只会锁住特定的行，不会影响其他行的操作。

#### select for update 加锁有什么需要注意的？

如果查询条件使用了索引（特别是主键索引或唯一索引），SELECT FOR UPDATE 会锁定特定的行，即行级锁，这样锁的粒度较小，不会影响未涉及的行或其他并发操作。

但如果查询条件未使用索引，SELECT FOR UPDATE 可能锁定整个表或大量的行，因为查询需要执行全表扫描。

假设有一张名为 orders 的表，包含以下数据：

```sql
CREATE TABLE orders (
    id INT PRIMARY KEY,
    order_no VARCHAR(255),
    amount DECIMAL(10,2),
    status VARCHAR(50),
    INDEX (order_no)  -- order_no 上有索引
);
```

表中的数据是这样的：

id  | order_no | amount | status
----|----------|--------|--------
1   | 10001    | 50.00  | pending
2   | 10002    | 75.00  | pending
3   | 10003    | 100.00 | pending
4   | 10004    | 150.00 | completed
5   | 10005    | 200.00 | pending

如果我们通过主键索引执行 SELECT FOR UPDATE，只会锁定特定的行：

```sql
START TRANSACTION;
SELECT * FROM orders WHERE id = 1 FOR UPDATE;
-- 对 id=1 的行进行操作
COMMIT;
```

由于 id 是主键，所以只会锁定 `id=1` 这行，不会影响其他行的操作。其他事务依然可以对 id = 2, 3, 4, 5 等行执行更新操作，因为它们没有被锁定。

如果使用 order_no 索引执行 SELECT FOR UPDATE，也只会锁定特定的行：

```sql
START TRANSACTION;
SELECT * FROM orders WHERE order_no = '10001' FOR UPDATE;
-- 对 order_no=10001 的行进行操作
COMMIT;
```

因为 order_no 上有索引，所以只会锁定 `order_no=10001` 这行，不会影响其他行的操作。

但如果查询 `status='pending'`，而 status 上没有索引：

```sql
START TRANSACTION;
SELECT * FROM orders WHERE status = 'pending' FOR UPDATE;
-- 对 status=pending 的行进行操作
COMMIT;
```

查询需要执行全表扫描。在这种情况下，SELECT FOR UPDATE 可能会锁定表中所有符合条件的记录，甚至是整个表，因为 MySQL 需要检查每一行的 status。

这会影响表中的大部分记录，其他事务将无法修改这些记录，直到当前事务结束。

#### 说说 InnoDB 的行锁实现？

我们拿这么一个用户表来表示行级锁，其中插入了 4 行数据，主键值分别是 1,6,8,12，现在简化它的聚簇索引结构，只保留数据记录。

![三分恶面渣逆袭：简化的主键索引](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-013afdbe-889b-4ed0-ae68-c8c9882570d9.jpg)

InnoDB 的行锁的主要实现如下：

①、**Record Lock 记录锁**

记录锁就是直接锁定某行记录。当我们使用唯一性的索引(包括唯一索引和聚簇索引)进行等值查询且精准匹配到一条记录时，此时就会直接将这条记录锁定。例如`select * from t where id =6 for update;`就会将`id=6`的记录锁定。

![三分恶面渣逆袭：记录锁](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-8989ac27-e442-4c14-81ad-6bc133d78bfd.jpg)


③、**Next-key Lock 临键锁**

临键指的是间隙加上它右边的记录组成的**左开右闭区间**。比如上述的`(1,6]、(6,8]`等。

![三分恶面渣逆袭：临键锁](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-ae8a21cc-8b52-467d-9173-4e01b24e04b9.jpg)

临键锁就是记录锁(Record Locks)和间隙锁(Gap Locks)的结合，即除了锁住记录本身，还要再锁住索引之间的间隙。当我们使用范围查询，并且命中了部分`record`记录，此时锁住的就是临键区间。

注意，临键锁锁住的区间会包含最后一个 record 的右边的临键区间。

例如 `select * from t where id > 5 and id <= 7 for update;` 会锁住`(4,7]、(7,+∞)`。

MySQL 默认行锁类型就是`临键锁(Next-Key Locks)`。当使用唯一性索引，等值查询匹配到一条记录的时候，临键锁(Next-Key Locks)会退化成记录锁；没有匹配到任何记录的时候，退化成间隙锁。

`间隙锁(Gap Locks)`和`临键锁(Next-Key Locks)`都是用来解决幻读问题的，在`已提交读（READ COMMITTED）`隔离级别下，`间隙锁(Gap Locks)`和`临键锁(Next-Key Locks)`都会失效！

上面是行锁的三种实现算法，除此之外，在行上还存在插入意向锁。

④、**Insert Intention Lock 插入意向锁**

一个事务在插入一条记录时需要判断一下插入位置是不是被别的事务加了意向锁 ，如果有的话，插入操作需要等待，直到拥有 gap 锁 的那个事务提交。但是事务在等待的时候也需要在内存中生成一个 锁结构 ，表明有事务想在某个 间隙 中插入新记录，但是现在在等待。这种类型的锁命名为 Insert Intention Locks ，也就是插入意向锁 。

假如我们有个 T1 事务，给(1,6)区间加上了意向锁，现在有个 T2 事务，要插入一个数据，id 为 4，它会获取一个（1,6）区间的插入意向锁，又有有个 T3 事务，想要插入一个数据，id 为 3，它也会获取一个（1,6）区间的插入意向锁，但是，这两个插入意向锁锁不会互斥。

![三分恶面渣逆袭：插入意向锁](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-751425cb-daba-4da1-bab6-f843254cad3d.jpg)

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团面经同学 3 Java 后端技术一面面试原题：数据库中的全局锁 表锁 行级锁  每种锁的应用场景有哪些
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的招银网络科技面经同学 9 Java 后端技术一面面试原题：select for update 加锁有什么需要注意的

### 85. 间隙锁了解吗？（补充）

> 2024 年 12 月 15 日增补。

间隙锁用于在范围查询时锁定记录之间的“间隙”，防止其他事务在该范围内插入新记录。

假设表 test_gaplock 有 id、age、name 三个字段，其中 id 是主键，age 上有索引，并插入了 4 条数据。

```sql
CREATE TABLE `test_gaplock` (
  `id` int(11) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `age` (`age`)
) ENGINE=InnoDB;

insert into test_gaplock values(1,1,'张三'),(6,6,'吴老二'),(8,8,'赵四'),(12,12,'熊大');
```

间隙锁会锁住以下范围：

- (−∞, 1)：在最小记录之前的间隙。
- (1, 6)、(6, 8)、(8, 12)：记录之间的间隙。
- (12, +∞)：在最大记录之后的间隙。

![三分恶面渣逆袭：间隙锁](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-d60f3a42-4b0f-4612-b7ad-65191fecb852.jpg)

假设有两个事务，T1 执行以下语句：

```sql
START TRANSACTION;
SELECT * FROM test_gaplock WHERE age > 5 FOR UPDATE;
```

T2 执行以下语句：

```sql
START TRANSACTION;
INSERT INTO test_gaplock VALUES (7, 7, '王五');
```

T1 会锁住 (6, 8) 的间隙，防止其他事务在这个范围内插入新记录。

T2 在插入 (7, 7, '王五') 时，会被阻塞，可以在另外一个回话中执行 `SHOW ENGINE INNODB STATUS` 查看间隙锁的信息。

![二哥的Java 进阶之路：间隙锁](https://cdn.tobebetterjavaer.com/stutymore/mysql-20241215095640.png)

推荐阅读：[六个案例搞懂间隙锁](https://www.51cto.com/article/779551.html)、[MySQL中间隙锁的加锁机制](https://blog.csdn.net/javaanddonet/article/details/111187345)

#### 执行什么命令会加上间隙锁？

当范围查询与锁定操作（如 FOR UPDATE）结合时，InnoDB 会对查询范围内的记录间隙加上间隙锁。

```sql
SELECT * FROM table WHERE column > 10 and column < 20 FOR UPDATE;
```

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的阿里云面经同学 22 面经：mysql的什么命令会加上间隙锁

### 56.意向锁是什么知道吗？

意向锁是一个表级锁，不要和插入意向锁搞混。

意向锁的出现是为了支持 InnoDB 的多粒度锁，它解决的是表锁和行锁共存的问题。

当我们需要给一个表加表锁的时候，我们需要根据去判断表中有没有数据行被锁定，以确定是否能加成功。

假如没有意向锁，那么我们就得遍历表中所有数据行来判断有没有行锁；

有了意向锁这个表级锁之后，则我们直接判断一次就知道表中是否有数据行被锁定了。

有了意向锁之后，要执行的事务 A 在申请行锁（写锁）之前，数据库会自动先给事务 A 申请表的意向排他锁。当事务 B 去申请表的互斥锁时就会失败，因为表上有意向排他锁之后事务 B 申请表的互斥锁时会被阻塞。

![意向锁](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-31f7f49c-1e5a-4d42-b8b3-e022b3ba82ae.jpg)

### 57.MySQL 的乐观锁和悲观锁了解吗？

悲观锁认为它保护的数据是非常敏感的，每时每刻都有可能被改动，一个事务在拿到悲观锁后，其他事务不能对该数据进行修改，直到它提交或回滚后。

MySQL 中的行锁、表锁都是悲观锁。

乐观锁则认为数据的变动不会太频繁。通常通过版本号(version)或者时间戳(timestamp)来实现。

事务拿到数据后，会将数据的版本号也取出来(比如说标记为 v1)，当数据变动完想要更新到表中时，会将最新的版本 v2 和 v1 进行对比，如果 v1=v2，说明在数据变动期间，没有其他事务对数据进行修改。

此时，事务提交就会成功，并且 version 会加 1，以此来表明数据已变动。

如果 v1 不等于 v2，说明数据变动期间，数据被其他事务修改了，此时需要通知用户重新操作。

悲观锁是 MySQL 自带的，而乐观锁通常需要开发者自己去实现。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的京东面经同学 5 Java 后端技术一面面试原题：乐观锁与悲观锁

### 58.遇到过死锁问题吗，你是如何解决的？

有，一次典型的场景是在[技术派](https://javabetter.cn/zhishixingqiu/paicoding.html)项目中，两个事务分别更新两张表，但是更新顺序不一致，导致了死锁。

```sql
-- 创建表/插入数据
CREATE TABLE account (
    id INT AUTO_INCREMENT PRIMARY KEY,
    balance INT NOT NULL
);

INSERT INTO account (balance) VALUES (100), (200);

-- 事务 1
START TRANSACTION;
-- 锁住 id=1 的行
UPDATE account SET balance = balance - 10 WHERE id = 1;

-- 等待锁住 id=2 的行（事务 2 已锁住）
UPDATE account SET balance = balance + 10 WHERE id = 2;

-- 事务 2
START TRANSACTION;
-- 锁住 id=2 的行
UPDATE account SET balance = balance - 10 WHERE id = 2;

-- 等待锁住 id=1 的行（事务 1 已锁住）
UPDATE account SET balance = balance + 10 WHERE id = 1;
```

两个事务访问相同的资源，但是访问顺序不同，导致了死锁。

![死锁](https://cdn.tobebetterjavaer.com/stutymore/mysql-20241201101426.png)

解决方法：

第一步，使用 `SHOW ENGINE INNODB STATUS\G;` 查看死锁信息。

![查看死锁](https://cdn.tobebetterjavaer.com/stutymore/mysql-20241201101704.png)

第二步，调整事务的资源访问顺序，保持一致。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的虾皮面经同学 13 一面面试原题：遇到过mysql死锁或者数据不安全吗

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括 Java 基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM 等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

## 事务

### 59.MySQL 事务的四大特性说一下？

事务是一条或多条 SQL 语句组成的执行单元，要么全部执行成功，要么全部失败，不会出现部分执行的情况。

事务具有四个基本特性，也就是通常所说的 ACID 特性，即原子性、一致性、隔离性和持久性。主要作用是保证数据库操作的一致性。

![三分恶面渣逆袭：事务四大特性](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-eaafb8b8-fbe6-42c0-9cc2-f2e04631b56c.jpg)

#### 什么是原子性？

原子性子性意味着事务中的所有操作要么全部完成，要么全部不完成，它是不可分割的单位。如果事务中的任何一个操作失败了，整个事务都会回滚到事务开始之前的状态，如同这些操作从未被执行过一样。

#### 什么是一致性？

一致性确保事务从一个一致的状态转换到另一个一致的状态。

比如在银行转账事务中，无论发生什么，转账前后两个账户的总金额应保持不变。假如 A 账户（100 块）给 B 账户（10 块）转了 10 块钱，不管成功与否，A 和 B 的总金额都是 110 块。

#### 什么是隔离性？

隔离性意味着并发执行的事务是彼此隔离的，一个事务的执行不会被其他事务干扰。就是事务之间是井水不犯河水的。

隔离性主要是为了解决事务并发执行时可能出现的问题，如脏读、不可重复读、幻读等。

数据库系统通过事务隔离级别（如读未提交、读已提交、可重复读、串行化）来实现事务的隔离性。

#### 什么是持久性？

持久性确保事务一旦提交，它对数据库所做的更改就是永久性的，即使发生系统崩溃，数据库也能恢复到最近一次提交的状态。通常，持久性是通过数据库的恢复和日志机制来实现的，确保提交的事务更改不会丢失。

简短一点的回答可以是：

- **原子性**：事务的所有操作要么全部提交成功，要么全部失败回滚，对于一个事务中的操作不能只执行其中一部分。
- **一致性**：事务应确保数据库的状态从一个一致状态转变为另一个一致状态。一致性与业务规则有关，比如银行转账，不论事务成功还是失败，转账双方的总金额应该是不变的。
- **隔离性**：多个并发事务之间需要相互隔离，即一个事务的执行不能被其他事务干扰。
- **持久性**：一旦事务提交，则其所做的修改将永久保存到数据库中。即使发生系统崩溃，修改的数据也不会丢失。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的京东同学 10 后端实习一面的原题：事务的四个特性，怎么理解事务一致性
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团面经同学 16 暑期实习一面面试原题：MySQL 事务是什么，默认隔离级别，什么是可重复读？
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 23 QQ 后台技术一面面试原题：MySQL 事务，隔离级别
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 1 Java 后端技术一面面试原题：什么是数据库事务？事务的作用是什么？
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的 OPPO 面经同学 1 面试原题：对MySQL事务的理解
> 6. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的vivo 面经同学 10 技术一面面试原题：事务的概念
> 7. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的同学 1 贝壳找房后端技术一面面试原题：事务ACID
> 8. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动同学 17 后端技术面试原题：什么是事务 事务为什么要有隔离级别 幻读是什么 什么时候要解决幻读 什么时候不用解决
> 9. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学19番茄小说一面面试原题：MySQL中的事务

### 60.ACID 靠什么保证的呢？

MySQL 通过事务、undo log、redo log 来确保 ACID。

![二哥的 Java 进阶之路：ACID 的保证机制](https://cdn.tobebetterjavaer.com/stutymore/mysql-20230919103025.png)

#### 如何保证原子性？

MySQL 通过 undo log 来确保原子性（Atomicity）。

当事务开始时，MySQL 会在`undo log`中记录事务开始前的旧值。如果事务执行失败，MySQL 会使用`undo log`中的旧值来回滚事务开始前的状态；如果事务执行成功，MySQL 会在某个时间节点将`undo log`删除。

#### 如何保证一致性？

如果其他三个特性都得到了保证，那么一致性就自然而然得到保证了。

#### 如何保证隔离性？

MySQL 定义了多种隔离级别，通过 MVCC 来确保每个事务都有专属自己的数据版本，从而实现隔离性（Isolation）。

在 MVCC 中，每行记录都有一个版本号，当事务尝试读取记录时，会根据事务的隔离级别和记录的版本号来决定是否可以读取。

#### 如何保证持久性？

redo log 是一种物理日志，当执行写操作时，MySQL 会先将更改记录到 redo log 中。当 redo log 填满时，MySQL 再将这些更改写入数据文件中。

如果 MySQL 在写入数据文件时发生崩溃，可以通过 redo log 来恢复数据文件，从而确保持久性（Durability）。

#### 事务会不会自动提交？

在 MySQL 中，默认情况下事务是 自动提交 的。每执行一条 SQL 语句（如 INSERT、UPDATE），都会被当作一个事务自动提交。

如果需要手动控制事务，可以使用 START TRANSACTION 开启事务，并通过 COMMIT 或 ROLLBACK 完成事务。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团同学 2 优选物流调度技术 2 面面试原题：MySQL ACID 哪些机制来保证
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的百度同学 4 面试原题：事务会不会自动提交?

### 61.事务的隔离级别有哪些？

事务的隔离级别定了一个事务可能受其他事务影响的程度，MySQL 支持四种隔离级别，分别是：读未提交、读已提交、可重复读和串行化。

![三分恶面渣逆袭：事务的四个隔离级别](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-99942529-4a91-420b-9ce2-4149e747f64d.jpg)

#### 什么是读未提交？

读未提交是最低的隔离级别，在这个级别，当前事务可以读取未被其他事务提交的数据，以至于会出现“脏读”、“不可重复读”和“幻读”的问题。

#### 什么是读已提交？

在读已提交级别，当前事务只能读取已经被其他事务提交的数据，可以避免“脏读”现象。但不可重复读和幻读问题仍然存在。

#### 什么是可重复读？

可重复读是指一个事务在执行过程中看到的数据，一直跟这个事务启动时看到的数据是一致的。

**可重复读是 MySQL 默认的隔离级别**，避免了“脏读”和“不可重复读”，也能在一定程度上避免幻读。

#### 什么是串行化？

串行化是最高的隔离级别，通过强制事务串行执行来解决“脏读”、“不可重复读”和“幻读”问题。但会导致大量的锁竞争问题。

#### A 事务未提交，B 事务上查询到的是旧值还是新值？

在 MySQL 的默认隔离级别（可重复读）下，如果事务 A 修改了数据但未提交，事务 B 将看到修改之前的数据。

这是因为在可重复读隔离级别下，MySQL 将通过多版本并发控制（MVCC）机制来保证一个事务不会看到其他事务未提交的数据，从而确保读一致性。

#### 怎么更改事务的隔离级别？

使用 `SET SESSION TRANSACTION ISOLATION LEVEL` 可以修改当前连接的隔离级别，只影响当前会话。

使用 `SET GLOBAL TRANSACTION ISOLATION LEVEL` 可以修改全局隔离级别，影响新的连接，但不会改变现有会话。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团面经同学 16 暑期实习一面面试原题：MySQL 事务是什么，默认隔离级别，什么是可重复读？
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 23 QQ 后台技术一面面试原题：MySQL 事务，隔离级别
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的快手面经同学 7 Java 后端技术一面面试原题：说一下事务的四大隔离级别，分别解决什么问题
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 1 Java 后端技术一面面试原题：MySQL 默认隔离级别？
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团面经同学 2 Java 后端技术一面面试原题：说说 MySQL 事务的隔离级别，如何实现？
> 6. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小公司面经合集同学 1 Java 后端面试原题：MySQL 的四个隔离级别以及默认隔离级别？
> 7. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的 360 面经同学 3 Java 后端技术一面面试原题：数据库隔离级别有哪些？mysql 是属于哪个隔离级别
> 8. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的联想面经同学 7 面试原题：Mysql 四个隔离级别，MVCC 实现
> 9. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的oppo 面经同学 8 后端开发秋招一面面试原题：讲讲Mysql的四个隔离级别
> 10. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的比亚迪面经同学 12 Java 技术面试原题：mysql的隔离级别有哪些
> 11. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 27 云后台技术一面面试原题：事务的隔离级别？这些隔离级别是怎么保证数据的一致性的？默认的事务隔离级别是啥？（MVCC）怎么更改事务的隔离级别？
> 12. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学19番茄小说一面面试原题：事务隔离级别，哪个是默认的，特点
> 13. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的虾皮面经同学 13 一面面试原题：mysql事务隔离级别


### 62.什么是脏读、不可重复读、幻读呢？

脏读指的是一个事务能够读取另一个事务尚未提交的数据。如果读到的数据在之后被回滚了，那么第一个事务读取到的就是无效的数据。

```sql
-- 事务 A
START TRANSACTION;
UPDATE employees SET salary = 5000 WHERE id = 1;

-- 事务 B
START TRANSACTION;
SELECT salary FROM employees WHERE id = 1;  -- 读取到 salary = 5000 (脏读)
ROLLBACK;
```

不可重复读指的是在同一事务中执行相同的查询时，返回的结果集不同。这是由于在事务过程中，另一个事务修改了数据并提交。

比如说事务 A 在第一次读取某个值后，事务 B 修改了这个值并提交，事务 A 再次读取时，发现值已经改变。

```sql
-- 事务 A
START TRANSACTION;
SELECT salary FROM employees WHERE id = 1;  -- 读取到 salary = 3000

-- 事务 B
START TRANSACTION;
UPDATE employees SET salary = 5000 WHERE id = 1;
COMMIT;

-- 事务 A 再次读取
SELECT salary FROM employees WHERE id = 1;  -- 读取到 salary = 5000 (不可重复读)
COMMIT;
```

幻读指的是在同一事务中执行相同的查询时，返回的结果集中出现了之前没有的数据行。这是因为在事务执行过程中，另外一个事务插入了新的数据。

比如说事务 A 在第一次查询某个条件范围的数据行后，事务 B 插入了一条新数据且符合条件范围，事务 A 再次查询时，发现多了一条数据。

```sql
-- 事务 A
START TRANSACTION;
SELECT * FROM employees WHERE department = 'HR';  -- 读取到 10 条记录

-- 事务 B
START TRANSACTION;
INSERT INTO employees (id, name, department) VALUES (11, 'John Doe', 'HR');
COMMIT;

-- 事务 A 再次查询
SELECT * FROM employees WHERE department = 'HR';  -- 读取到 11 条记录 (幻读)
COMMIT;
```

需要解决幻读的场景一般是对数据一致性要求较高的业务，例如银行转账、库存管理等，而在一些只要求最终一致性的应用场景中（如统计功能），可以忽略幻读问题。

#### 如何避免幻读？

①、直接使用最高的隔离级别串行化，但会导致大量的锁竞争。

②、使用间隙锁，防止其他事务在间隙范围内插入数据。

③、在可重复读的隔离级别下，MVCC 机制会为每个事务维护一个快照，事务在读取数据时，只能读取到快照中的数据，而不会读取到其他事务插入的数据。

#### 不同的隔离级别，在并发事务下可能会发生什么问题？

| 隔离级别                   | 脏读 | 不可重复读 | 幻读 |
| -------------------------- | ---- | ---------- | ---- |
| Read Uncommited 读取未提交 | 是   | 是         | 是   |
| Read Commited 读取已提交   | 否   | 是         | 是   |
| Repeatable Read 可重复读   | 否   | 否         | 是   |
| Serialzable 可串行化       | 否   | 否         | 否   |

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的京东面经同学 7  京东到家面试原题：mysql事务隔离级别，默认隔离级别，如何避免幻读
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的阿里云面经同学 22 面经：事务隔离级别，幻读和脏读的区别，如何防止幻读，事务的mvcc机制

### 63.事务的隔离级别是如何实现的？

读未提交不提供任何锁机制来保护读取的数据，允许读取未提交的数据（即脏读）。

读已提交和可重复读通过 MVCC 机制中的 ReadView 来实现。

- 读已提交：每次读取数据前都生成一个 ReadView，保证每次读操作都是最新的数据。
- 可重复读：只在第一次读操作时生成一个 ReadView，后续读操作都使用这个 ReadView，保证事务内读取的数据是一致的。

串行化级别下，事务在读操作时，必须先加表级共享锁，直到事务结束才释放；事务在写操作时，必须先加表级排他锁，直到事务结束才释放。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团面经同学 2 Java 后端技术一面面试原题：说说 MySQL 事务的隔离级别，如何实现？
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的得物面经同学 9 面试题目原题：Mysql隔离机制有哪些？怎么实现的？可串行化是怎么避免的三个事务问题？
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的滴滴面经同学 3 网约车后端开发一面原题：可重复读级别是怎么实现的

### 64.MVCC 了解吗？怎么实现的？

MVCC 指的是多版本并发控制，简单来说，就是给我们的 MySQL 数据拍个“快照”，定格某个时刻数据库的状态。

在 MySQL 中，MVCC 是通过版本链和 ReadView 机制来实现的。

![天瑕：undo log 版本链和 ReadView](https://cdn.tobebetterjavaer.com/stutymore/mysql-20241215073837.png)

1. 每条记录包含两个隐藏列：最近修改的事务 ID 和指向 Undo Log 的指针，用于构成版本链。
2. 每次更新数据时，会生成一个新的数据版本，并将旧版本的数据保存到 Undo Log 中。
3. 每次读取数据时，会生成一个 ReadView，用于判断哪个版本的数据对当前事务可见。

#### 什么是版本链？

在 InnoDB 中，每一行数据都有两个隐藏的列：一个是 DB_TRX_ID，另一个是 DB_ROLL_PTR。

- `DB_TRX_ID`，保存创建这个版本的事务 ID。
- `DB_ROLL_PTR`，指向 undo 日志记录的指针，这个记录包含了该行的前一个版本的信息。通过这个指针，可以访问到该行数据的历史版本。

![二哥的 Java 进阶之路：版本链](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240415084347.png)

假设有一张`hero`表，表中有一行记录 name 为张三，city 为帝都，插入这行记录的事务 id 是 80。此时，`DB_TRX_ID`的值就是 80，`DB_ROLL_PTR`的值就是指向这条 insert undo 日志的指针。

![三分恶面渣逆袭：表记录](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-80ebc2b3-ae63-417d-9307-f6a7811f7965.jpg)

接下来，如果有两个`DB_TRX_ID`分别为`100`、`200`的事务对这条记录进行了`update`操作，那么这条记录的版本链就会变成下面这样：

![三分恶面渣逆袭：update 操作](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-bf4ff00d-01bd-4170-a17b-6919f7873ea4.jpg)

当事务更新一行数据时，InnoDB 不会直接覆盖原有数据，而是创建一个新的数据版本，并更新 DB_TRX_ID 和 DB_ROLL_PTR，使得它们指向前一个版本和相关的 undo 日志。这样，老版本的数据不会丢失，可以通过版本链找到。

由于 undo 日志会记录每一次的 update，并且新插入的行数据会记录上一条 undo 日志的指针，所以可以通过这个指针找到上一条记录，这样就形成了一个版本链。

![三分恶面渣逆袭：版本链](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-765b3d83-14eb-4b56-8940-9d60bfaf1737.jpg)

#### 说说什么是 ReadView？

ReadView（读视图）是 InnoDB 为了实现一致性读而创建的数据结构，它用于确定在特定事务中哪些版本的行记录是可见的。

ReadView 主要用来处理隔离级别为"可重复读"和"读已提交"的情况。因为在这两个隔离级别下，事务在读取数据时，需要保证读取到的数据是一致的，即读取到的数据是在事务开始时的一个快照。

![二哥的 Java 进阶之路：ReadView](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240415093703.png)

当事务开始执行时，InnoDB 会为该事务创建一个 ReadView，这个 ReadView 会记录 4 个重要的信息：

- creator_trx_id：创建该 ReadView 的事务 ID。
- m_ids：所有活跃事务的 ID 列表，活跃事务是指那些已经开始但尚未提交的事务。
- min_trx_id：所有活跃事务中最小的事务 ID。它是 m_ids 数组中最小的事务 ID。
- max_trx_id ：事务 ID 的最大值加一。换句话说，它是下一个将要生成的事务 ID。

#### ReadView 是如何判断记录的某个版本是否可见的？

![二哥的 Java 进阶之路：](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240415094939.png)

当一个事务读取某条数据时，InnoDB 会根据 ReadView 中的信息来判断该数据的某个版本是否可见。

①、如果某个数据版本的 DB_TRX_ID 小于 min_trx_id，则该数据版本在生成 ReadView 之前就已经提交，因此对当前事务是可见的。

②、如果某个数据版本的 DB_TRX_ID 大于 max_trx_id，则表示创建该数据版本的事务在生成 ReadView 之后开始，因此对当前事务是不可见的。

③、如果某个数据版本的 DB_TRX_ID 在 min_trx_id 和 max_trx_id 之间，需要判断 DB_TRX_ID 是否在 m_ids 列表中：

- 不在，表示创建该数据版本的事务在生成 ReadView 之后已经提交，因此对当前事务也是可见的。
- 在，则表示创建该数据版本的事务仍然活跃，或者在当前事务生成 ReadView 之后开始，因此对当前事务是不可见的。

> 上面这种方式有点绕，我讲一个简单的记忆规则。

读事务开启了一个 ReadView，这个 ReadView 里面记录了当前活跃事务的 ID 列表（444、555、665），以及最小事务 ID（444）和最大事务 ID（666）。当然还有自己的事务 ID 520，也就是 creator_trx_id。

它要读的这行数据的写事务 ID 是 x，也就是 DB_TRX_ID。

- 如果 x = 110，显然在 ReadView 生成之前就提交了，所以这行数据是可见的。
- 如果 x = 667，显然是未知世界，所以这行数据对读操作是不可见的。
- 如果 x = 519，虽然 519 大于 444 小于 666，但是 519 不在活跃事务列表里，所以这行数据是可见的。因为 519 是在 520 生成 ReadView 之前就提交了。
- 如果 x = 555，虽然 555 大于 444 小于 666，但是 555 在活跃事务列表里，所以这行数据是不可见的。因为 555 不确定有没有提交。

#### 可重复读和读已提交在 ReadView 上的区别是什么？

可重复读（REPEATABLE READ）和读已提交（READ COMMITTED）的区别在于生成 ReadView 的时机不同。

- 可重复读：在第一次读取数据时生成一个 ReadView，这个 ReadView 会一直保持到事务结束，这样可以保证在事务中多次读取同一行数据时，读取到的数据是一致的。
- 读已提交：每次读取数据前都生成一个 ReadView，这样就能保证每次读取的数据都是最新的。

#### 如果两个 AB 事务并发修改一个变量，那么 A 读到的值是什么，怎么分析。

当两个事务 A 和 B 并发修改同一个变量时，A 事务读取到的值取决于多个因素，包括事务的隔离级别、事务的开始时间和提交时间等。

- 读未提交：在这个级别下，事务可以看到其他事务尚未提交的更改。如果 B 更改了一个变量但尚未提交，A 可以读到这个更改的值。
- 读提交：A 只能看到 B 提交后的更改。如果 B 还没提交，A 将看到更改前的值。
- 可重复读：在事务开始后，A 总是读取到变量的相同值，即使 B 在这期间提交了更改。这是通过 MVCC 机制实现的。
- 可串行化：A 和 B 的操作是串行执行的，如果 A 先执行，那么 A 读到的值就是 B 提交前的值；如果 B 先执行，那么 A 读到的值就是 B 提交后的值。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团面经同学 2 Java 后端技术一面面试原题：说说 MVCC，解决了什么问题？
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小公司面经合集同学 1 Java 后端面试原题：了解的 MVCC 吗？
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的联想面经同学 7 面试原题：Mysql 四个隔离级别，MVCC 实现，如果两个AB事务并发修改一个变量，那么A读到的值是什么，怎么分析，快照读的原理，读已提交和可重复读区别，具体原理是什么。
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的oppo 面经同学 8 后端开发秋招一面面试原题：讲讲Mysql的MVCC机制
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的快手同学 2 一面面试原题：事务隔离级别？MVCC机制介绍下？（版本链）版本链通过什么控制
> 6. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团面经同学 15 点评后端技术面试原题：问了一下mysql的锁和MVCC

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括 Java 基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM 等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

## 高可用/性能

### 65.数据库读写分离了解吗？

读写分离的基本原理是将数据库读写操作分散到不同的节点上，下面是基本架构图：

![读写分离](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-31df767c-db05-4de4-a05b-a45bcf76c1bf.jpg)

读写分离的基本实现是:

- 数据库服务器搭建主从集群，一主一从、一主多从都可以。
- 数据库主机负责读写操作，从机只负责读操作。
- 数据库主机通过复制将数据同步到从机，每台数据库服务器都存储了所有的业务数据。
- 业务服务器将写操作发给数据库主机，将读操作发给数据库从机。

### 66.读写分离的分配怎么实现呢？

将读写操作区分开来，然后访问不同的数据库服务器，一般有两种方式：程序代码封装和中间件封装。

1.  程序代码封装

程序代码封装指在代码中抽象一个数据访问层（所以有的文章也称这种方式为 "中间层封装" ） ，实现读写操作分离和数据库服务器连接的管理。例如，基于 Hibernate 进行简单封装，就可以实现读写分离：

![业务代码封装](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-771eb01f-3f1a-4437-8e1b-affe4de36ec3.jpg)

目前开源的实现方案中，淘宝的 TDDL （Taobao Distributed Data Layer, 外号：头都大了）是比较有名的。

2.  中间件封装

中间件封装指的是独立一套系统出来，实现读写操作分离和数据库服务器连接的管理。中间件对业务服务器提供 SQL 兼容的协议，业务服务器无须自己进行读写分离。

对于业务服务器来说，访问中间件和访问数据库没有区别，事实上在业务服务器看来，中间件就是一个数据库服务器。

其基本架构是：

![数据库中间件](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-f2313613-25bd-4065-8f63-969a4b5757a7.jpg)

### 67.主从复制原理了解吗？

MySQL 的主从复制（Master-Slave Replication）是一种数据同步机制，用于将数据从一个主数据库（master）复制到一个或多个从数据库（slave）。

广泛用于数据备份、灾难恢复和数据分析等场景。

![三分恶面渣逆袭：主从复制](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-1bfbfcb5-2392-4f98-be1b-a66204da09e5.jpg)

复制过程的主要步骤有：

- 在主服务器上，所有修改数据的语句（如 INSERT、UPDATE、DELETE）会被记录到二进制日志中。
- 主服务器上的一个线程（二进制日志转储线程）负责读取二进制日志的内容并发送给从服务器。
- 从服务器接收到二进制日志数据后，会将这些数据写入自己的中继日志（Relay Log）。中继日志是从服务器上的一个本地存储。
- 从服务器上有一个 SQL 线程会读取中继日志，并在本地数据库上执行，从而将更改应用到从数据库中，完成同步。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯云智面经同学 16 一面面试原题：MySQL 的主从复制过程

### 68.主从同步延迟怎么处理？

**主从同步延迟的原因**

一个服务器开放Ｎ个链接给客户端来连接的，这样有会有大并发的更新操作, 但是从服务器的里面读取 binlog 的线程仅有一个，当某个 SQL 在从服务器上执行的时间稍长 或者由于某个 SQL 要进行锁表就会导致，主服务器的 SQL 大量积压，未被同步到从服务器里。这就导致了主从不一致， 也就是主从延迟。

**主从同步延迟的解决办法**

解决主从复制延迟有几种常见的方法:

1.  写操作后的读操作指定发给数据库主服务器

例如，注册账号完成后，登录时读取账号的读操作也发给数据库主服务器。这种方式和业务强绑定，对业务的侵入和影响较大，如果哪个新来的程序员不知道这样写代码，就会导致一个 bug。

2.  读从机失败后再读一次主机

这就是通常所说的 "二次读取" ，二次读取和业务无绑定，只需要对底层数据库访问的 API 进行封装即可，实现代价较小，不足之处在于如果有很多二次读取，将大大增加主机的读操作压力。例如，黑客暴力破解账号，会导致大量的二次读取操作，主机可能顶不住读操作的压力从而崩溃。

3.  关键业务读写操作全部指向主机，非关键业务采用读写分离

例如，对于一个用户管理系统来说，注册 + 登录的业务读写操作全部访问主机，用户的介绍、爰好、等级等业务，可以采用读写分离，因为即使用户改了自己的自我介绍，在查询时却看到了自我介绍还是旧的，业务影响与不能登录相比就小很多，还可以忍受。

### 69.你们一般是怎么分库的呢？

分库分表是为了解决单库单表数据量过大导致数据库性能下降的一种解决方案。

分库的策略有两种：

①、垂直分库：按照业务模块将不同的表拆分到不同的库中，例如，用户表、订单表、商品表等分到不同的库中。

![三分恶面渣逆袭：垂直分库](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-2a43af18-617b-4502-b66a-894c2ff4c6c3.jpg)

②、水平分库：按照一定的策略将一个表中的数据拆分到多个库中，例如，按照用户 id 的 hash 值将用户表拆分到不同的库中。

![三分恶面渣逆袭：水平分库](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-debe0fb1-d7f7-4ef2-8c99-13c9377138b6.jpg)

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的快手面经同学 7 Java 后端技术一面面试原题：分库分表了解吗
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的华为面经同学 8 技术二面面试原题：说说分库分表的准则

### 70.那你们是怎么分表的？

在[技术派实战项目](https://javabetter.cn/zhishixingqiu/paicoding.html)中，我们将文章的基本信息和文章详情做了垂直分表处理，因为文章的详情会占用比较大的空间，并且更新频繁，而文章的基本信息占用的空间比较小，且更新频率较低。

垂直拆分可以减轻单表的查询和更新压力。

当单表数据增量过快，比如说单表超过 500 万条数据，就可以考虑水平分表了。比如说我们可以将文章表拆分成多个表，如 article_0、article_9999、article_19999 等。

![三分恶面渣逆袭：表拆分](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-7cba6ce0-c8bb-4f51-9c3b-e5a44e724c79.jpg)


> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的快手面经同学 7 Java 后端技术一面面试原题：分库分表了解吗
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的华为面经同学 8 技术二面面试原题：说说分库分表的准则
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 29 Java 后端一面原题：表存满了之后怎么扩表？


### 71.分片策略有哪几种？

常见的分片策略有三种，分别是范围分片、Hash 分片和配置路由分片。

范围分片是根据某个字段的值范围进行分库分表。这种方式适用于分片键具有顺序性或连续性的场景。

![三分恶面渣逆袭：范围分片](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-b3882ca3-1d04-44e2-9015-7e6c867255a0.jpg)

比如说将 user_id 作为分片键：

- 1 ~ 10000 → db1.user_1
- 10001 ~ 20000 → db2.user_2

Hash 分片是指通过对分片键的值进行哈希运算，将数据均匀分布到多个分片中。

![三分恶面渣逆袭：Hash 分片](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-e01e7757-c337-48c8-95db-2f7cfd2bc036.jpg)

假如我们一开始规划好了 4 个数据表，那么路由算法可以简单地通过取模来实现：

```java
public String getTableNameByHash(long userId) {
    int tableIndex = (int) (userId % 4);
    return "user_" + tableIndex;
}
```

配置路由分片是通过路由配置来确定数据应该存储在哪个表，适用于分片键不规律的场景。

![三分恶面渣逆袭：配置路由](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-fcd34332-d38d-455a-875d-d4afd37cac72.jpg)

比如说我们可以通过 order_router 表来确定订单数据存储在哪个表中：

| order_id | table_id |
| -------- | -------- |
| xxxx        | table_1        |
| yyyy        | table_2        |
| zzzz        | table_3        |

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 24 面试原题：项目中的水平分表是怎么做的？分片键具体是怎么设置的？
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 29 Java 后端一面原题：分库分表具体的分片策略是怎么做的？

### 72.不停机扩容怎么实现？

实际上，不停机扩容，实操起来是个非常麻烦而且很有风险的操作，当然，面试回答起来就简单很多。

- **第一阶段：在线双写，查询走老库**

1.  建立好新的库表结构，数据写入久库的同时，也写入拆分的新库
2.  数据迁移，使用数据迁移程序，将旧库中的历史数据迁移到新库
3.  使用定时任务，新旧库的数据对比，把差异补齐

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-2d4d94c9-e816-47fc-93dd-a835b1318099.jpg)

- **第二阶段：在线双写，查询走新库**

1.  完成了历史数据的同步和校验
2.  把对数据的读切换到新库

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-5cf01486-72c1-4eab-9f6e-a19c31569f46.jpg)

- **第三阶段：旧库下线**

1.  旧库不再写入新的数据
2.  经过一段时间，确定旧库没有请求之后，就可以下线老库

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-a122d6d5-fff2-4ccd-8ddb-a9282eb2e2da.jpg)

### 73.怎么分库分表？

如果表的字段过多，我会按字段的访问频率或功能相关性拆分成多个表，减少单表宽度。

如果单表数据量过大，我会按 ID 或时间将数据分到多张表中。比如订单表可以按 `user_id % N` 进行水平分表。

如果业务模块较多，我会将不同模块的表分布到不同的数据库中，比如用户相关的表放在一个库，订单相关的表放在另一个库。

如果单库数据量过大，我会按用户 ID 范围或哈希值将数据分布到多个库中。

#### 常用的分库分表中间件有哪些？

常用的分库分表中间件有 Sharding-JDBC 和 Mycat。

①、Sharding-JDBC 最初由当当开源，后来贡献给了 Apache，主要在 Java 的 JDBC 层提供额外的服务。无需额外部署和依赖，可理解为增强版的 JDBC 驱动，完全兼容 JDBC 和各种 ORM 框架。

![AWS：Sharding-JDBC](https://cdn.tobebetterjavaer.com/stutymore/mysql-20241207120214.png)

②、Mycat 是由阿里巴巴的一款产品 Cobar 衍生而来，可以把它看作一个数据库代理，其核心功能是分表分库，即将一个大表切片为多个小表，一个大库切片成多个小库。

![piwenfei：mycat](https://cdn.tobebetterjavaer.com/stutymore/mysql-20241207121845.png)

推荐阅读：[mycat 介绍](https://yanxizhu.com/index.php/archives/113/)

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的得物面经同学 9 面试题目原题：Mysql有很大的数据量怎么办？怎么分表分库？


### 74.你觉得分库分表会带来什么问题呢？

从分库的角度来讲：

- **事务的问题**

使用关系型数据库，有很大一点在于它保证事务完整性。

而分库之后单机事务就用不上了，必须使用分布式事务来解决。

- **跨库 JOIN 问题**

在一个库中的时候我们还可以利用 JOIN 来连表查询，而跨库了之后就无法使用 JOIN 了。

此时的解决方案就是**在业务代码中进行关联**，也就是先把一个表的数据查出来，然后通过得到的结果再去查另一张表，然后利用代码来关联得到最终的结果。

这种方式实现起来稍微比较复杂，不过也是可以接受的。

还有可以**适当的冗余一些字段**。比如以前的表就存储一个关联 ID，但是业务时常要求返回对应的 Name 或者其他字段。这时候就可以把这些字段冗余到当前表中，来去除需要关联的操作。

还有一种方式就是**数据异构**，通过 binlog 同步等方式，把需要跨库 join 的数据异构到 ES 等存储结构中，通过 ES 进行查询。

从分表的角度来看：

- **跨节点的 count,order by,group by 以及聚合函数问题**

只能由业务代码来实现或者用中间件将各表中的数据汇总、排序、分页然后返回。

- **数据迁移，容量规划，扩容等问题**

数据的迁移，容量如何规划，未来是否可能再次需要扩容，等等，都是需要考虑的问题。

- **ID 问题**

数据库表被切分后，不能再依赖数据库自身的主键生成机制，所以需要一些手段来保证全局主键唯一。

1.  还是自增，只不过自增步长设置一下。比如现在有三张表，步长设置为 3，三张表 ID 初始值分别是 1、2、3。这样第一张表的 ID 增长是 1、4、7。第二张表是 2、5、8。第三张表是 3、6、9，这样就不会重复了。
2.  UUID，这种最简单，但是不连续的主键插入会导致严重的页分裂，性能比较差。
3.  分布式 ID，比较出名的就是 Twitter 开源的 sonwflake 雪花算法

#### id 是怎么生成的？

[技术派](https://javabetter.cn/zhishixingqiu/paicoding.html)项目中，我们在雪花算法 Snowflake 的基础上实现了一套自定义的 ID 生成方案，通过更改时间戳单位、ID 长度、workId 与 dataCenterId 的分配比例，ID 生成的延迟降低了 20%；同时满足了社区在高并发环境下 ID 的唯一性和可追溯性。

![技术派：自定义雪花算法算法](https://cdn.tobebetterjavaer.com/stutymore/mysql-20241223150915.png)

#### 雪花算法具体是怎么实现的？

雪花算法是 Twitter 开源的分布式 ID 生成算法，其核心思想是：使用一个 64 位的数字来作为全局唯一 ID。

- 第 1 位是符号位，永远是 0，表示正数。
- 接下来的 41 位是时间戳，记录的是当前时间戳减去一个固定的开始时间戳，可以使用 69 年。
- 然后是 10 位的工作机器 ID。
- 最后是 12 位的序列号，每毫秒最多可生成 4096 个 ID。

![技术派：雪花算法](https://cdn.tobebetterjavaer.com/stutymore/mysql-20241223150351.png)

大致的实现代码如下所示：

```java
public class SnowflakeIdGenerator {
    private long datacenterId = 1L; // 数据中心ID
    private long machineId = 1L; // 机器ID
    private long sequence = 0L; // 序列号

    private long lastTimestamp = -1L;

    public synchronized long nextId() {
        long timestamp = System.currentTimeMillis();
        if (timestamp == lastTimestamp) {
            sequence = (sequence + 1) & 4095;
            if (sequence == 0) {
                while (timestamp == lastTimestamp) {
                    timestamp = System.currentTimeMillis();
                }
            }
        } else {
            sequence = 0;
        }

        lastTimestamp = timestamp;

        return ((timestamp - 1609459200000L) << 22) | (datacenterId << 17) | (machineId << 12) | sequence;
    }
}
```

除了雪花算法，还有百度 UidGenerator、美团 Leaf 等开源的分布式 ID 生成方案。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 29 Java 后端一面原题：id是怎么生成的？（分布式自增主键）

<MZNXQrcodeBanner />


## 运维

### 75.百万级别以上的数据如何删除？

关于索引：由于索引需要额外的维护成本，因为索引文件是单独存在的文件,所以当我们对数据的增加,修改,删除,都会产生额外的对索引文件的操作,这些操作需要消耗额外的 IO,会降低增/改/删的执行效率。

所以，在我们删除数据库百万级别数据的时候，查询 MySQL 官方手册得知删除数据的速度和创建的索引数量是成正比的。

1.  所以我们想要删除百万数据的时候可以先删除索引
2.  然后删除其中无用数据
3.  删除完成后重新创建索引创建索引也非常快

### 76.百万千万级大表如何添加字段？

当线上的数据库数据量到达几百万、上千万的时候，加一个字段就没那么简单，因为可能会长时间锁表。

大表添加字段，通常有这些做法：

- 通过中间表转换过去

创建一个临时的新表，把旧表的结构完全复制过去，添加字段，再把旧表数据复制过去，删除旧表，新表命名为旧表的名称，这种方式可能回丢掉一些数据。

- 用 pt-online-schema-change

`pt-online-schema-change`是 percona 公司开发的一个工具，它可以在线修改表结构，它的原理也是通过中间表。

- 先在从库添加 再进行主从切换

如果一张表数据量大且是热表（读写特别频繁），则可以考虑先在从库添加，再进行主从切换，切换后再将其他几个节点上添加字段。

### 77.MySQL cpu 飙升的话，要怎么处理呢？

排查过程：

（1）使用 top 命令观察，确定是 mysqld 导致还是其他原因。

（2）如果是 mysqld 导致的，show processlist，查看 session 情况，确定是不是有消耗资源的 sql 在运行。

（3）找出消耗高的 sql，看看执行计划是否准确， 索引是否缺失，数据量是否太大。

处理：

（1）kill 掉这些线程 (同时观察 cpu 使用率是否下降)，

（2）进行相应的调整 (比如说加索引、改 sql、改内存参数)

（3）重新跑这些 SQL。

其他情况：

也有可能是每个 sql 消耗资源并不多，但是突然之间，有大量的 session 连进来导致 cpu 飙升，这种情况就需要跟应用一起来分析为何连接数会激增，再做出相应的调整，比如说限制连接数等

## SQL 题

### 78.一张表：id，name，age，sex，class，sql 语句：所有年龄为 18 的人的名字？找到每个班年龄大于 18 有多少人？找到每个班年龄排前两名的人？（补充）

> 这是一道 SQL 题，主要考察 SQL 的基本语法。建议大家直接在本地建表，然后实操一下。 2024 年 04 月 11 日增补。

第一步，建表：

```sql
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    age INT,
    sex CHAR(1),
    class VARCHAR(50)
);
```

第二步，插入数据：

```sql
INSERT INTO students (name, age, sex, class) VALUES
('沉默王二', 18, '女', '三年二班'),
('沉默王一', 20, '男', '三年二班'),
('沉默王三', 19, '男', '三年三班'),
('沉默王四', 17, '男', '三年三班'),
('沉默王五', 20, '女', '三年四班'),
('沉默王六', 21, '男', '三年四班'),
('沉默王七', 18, '女', '三年四班');
```

①、所有年龄为 18 的人的名字

```sql
SELECT name FROM students WHERE age = 18;
```

这条 SQL 语句从表中选择`age`等于 18 的所有记录，并返回这些记录的`name`字段。

![二哥的 Java 进阶之路](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240410105325.png)

②、找到每个班年龄大于 18 有多少人

```sql
SELECT class, COUNT(*) AS number_of_students
FROM students
WHERE age > 18
GROUP BY class;
```

这条 SQL 语句先筛选出年龄大于 18 的记录，然后按`class`分组，并计算每个班的学生数。

![二哥的 Java 进阶之路](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240410105512.png)

③、找到每个班年龄排前两名的人

这个查询稍微复杂一些，需要使用子查询和`COUNT`函数。

```sql
SELECT a.class, a.name, a.age
FROM students a
WHERE (
    SELECT COUNT(DISTINCT b.age)
    FROM students b
    WHERE b.class = a.class AND b.age > a.age
) < 2
ORDER BY a.class, a.age DESC;
```

这条 SQL 语句首先从`students`表中选择`class`、`name`和`age`字段，然后使用子查询计算每个班级中年龄排前两名的学生。

![二哥的 Java 进阶之路](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240410105951.png)

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的奇安信面经同学 1 Java 技术一面面试原题：一张表：id，name，age，sex，class，sql 语句：所有年龄为 18 的人的名字？找到每个班年龄大于 18 有多少人？找到每个班年龄排前两名的人？

### 79.有一个查询需求，MySQL 中有两个表，一个表 1000W 数据，另一个表只有几千数据，要做一个关联查询，如何优化

如果 orders 表是大表（比如 1000 万条记录），而 users 表是相对较小的表（比如几千条记录）。

**①、为关联字段建立索引**，确保两个表中用于 JOIN 操作的字段都有索引。这是最基本的优化策略，避免数据库进行全表扫描，可以大幅度减少查找匹配行的时间。

```sql
CREATE INDEX idx_user_id ON users(user_id);
CREATE INDEX idx_user_id ON orders(user_id);
```

**②、小表驱动大表**，在执行 JOIN 操作时，先过滤小表中的数据，这样可以减少后续与大表进行 JOIN 时需要处理的数据量，从而提高查询效率。

```sql
SELECT u.*, o.*
FROM (
    SELECT user_id
    FROM users
    WHERE some_condition  -- 这里是对小表进行过滤的条件
) AS filtered_users
JOIN orders o ON filtered_users.user_id = o.user_id
WHERE o.some_order_condition;  -- 如果需要，可以进一步过滤大表
```

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的京东面经同学 1 Java 技术一面面试原题：有一个查询需求，MySQL 中有两个表，一个表 1000W 数据，另一个表只有几千数据，要做一个关联查询，如何优化

### 80.新建一个表结构，创建索引，将百万或千万级的数据使用 insert 导入该表，新建一个表结构，将百万或千万级的数据使用 isnert 导入该表，再创建索引，这两种效率哪个高呢？或者说用时短呢？

talk is cheap，show me the code。

先创建一个表，然后创建索引，然后执行插入语句，来看看执行时间（100 万数据在我本机上执行时间比较长，我们就用 10 万条数据来测试）。

```sql
CREATE TABLE test_table (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL
);
CREATE INDEX idx_name ON test_table(name);
DELIMITER //

CREATE PROCEDURE insert_data()
BEGIN
    DECLARE i INT DEFAULT 0;

    WHILE i < 1000000 DO
        INSERT INTO test_table(name, email, created_at)
        VALUES (CONCAT('wanger',i), CONCAT('email', i, '@example.com'), NOW());
        SET i = i + 1;
    END WHILE;
END //

DELIMITER ;
CALL insert_data();
```

这是一个完整的测试过程，通过存储过程来执行插入操作，然后查看总的执行时间。

在实际的开发工作中，可能涉及到持久层框架，还有批量插入。

![二哥的 Java 进阶之路](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240412083019.png)

总的时间 13.93+0.01+0.01+0.01=13.96 秒。

接下来，我们再创建一个表，然后执行插入操作，最后再创建索引。

```sql
CREATE TABLE test_table_no_index (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL
);
DELIMITER //

CREATE PROCEDURE insert_data_no_index()
BEGIN
    DECLARE i INT DEFAULT 0;

    WHILE i < 1000000 DO
        INSERT INTO test_table_no_index(name, email, created_at)
        VALUES (CONCAT('wanger', i), CONCAT('email', i, '@example.com'), NOW());
        SET i = i + 1;
    END WHILE;
END //

DELIMITER ;
CALL insert_data_no_index();
CREATE INDEX idx_name_no_index ON test_table_no_index(name);
```

来看一下总的时间，0.01+0.00+13.08+0.18=13.27 秒。

![二哥的 Java 进阶之路](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240412083312.png)

先插入数据再创建索引的方式（13.27 秒）比先创建索引再插入数据（13.96 秒）要快一些。这个结果虽然显示时间差异不是非常大，但它确实反映了数据库处理大量数据插入时的性能特点。

- **先插入数据再创建索引**：在没有索引的情况下插入数据，数据库不需要在每次插入时更新索引，这会减少插入操作的开销。之后一次性创建索引通常比逐条记录更新索引更快。
- **先创建索引再插入数据**：这种情况下，数据库需要在每次插入新记录时维护索引结构，随着数据量的增加，索引的维护可能会导致额外的性能开销。

#### 数据库是先建立索引还是先插入数据？

在 InnoDB 中，如果表定义了主键，那么主键索引就是聚簇索引。如果没有明确指定主键，InnoDB 会自动选择一个唯一索引作为聚簇索引。如果表没有任何唯一索引，InnoDB 将自动生成一个隐藏的行 ID 作为聚簇索引。

这意味着当插入新数据时，InnoDB 首先将数据插入到聚簇索引中。这一步骤实质上是创建索引的一部分，因为数据存放在索引结构中。

对于非主键的其他索引（次级索引），在插入数据到聚簇索引后，InnoDB 还需要更新表的所有次级索引。这些索引中的每一个都包含指向聚簇索引记录的指针。

所以在 InnoDB 中，数据插入和索引创建（更新）是密不可分的。从数据库的视角看，插入操作包括向聚簇索引添加记录和更新所有相关的次级索引。这些步骤在一个事务中原子地执行，以确保数据的一致性和完整性。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的农业银行面经同学 7 Java 后端面试原题：数据库是先建立索引还是先插入数据

### 81.什么是深分页，select \* from tbn limit 1000000000 这个有什么问题，如果表大或者表小分别什么问题

深分页指的是在分页查询中，请求的页数非常大，例如请求第 100 万页的数据。在这种情况下，数据库需要跳过前 999999 页的数据，会消耗大量的 CPU 和 I/O 资源，导致查询性能下降。

`select * from tbn limit 1000000000` 正是一个深分页查询。

- 如果表的数据量非常大，那么这个查询可能会消耗大量的内存和 CPU 资源，甚至可能导致数据库崩溃。
- 如果表的数据量非常小，比如说只有 100 条，那就会返回这前 100 条，虽然没什么性能影响，但这个查询本身没什么意义。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 13 Java 后端二面面试原题：什么是深分页，select \* from tbn limit 1000000000 这个有什么问题，如果表大或者表小分别什么问题

### 82.一个表（name, sex,age,id），select age,id,name from tblname where name='paicoding';怎么建索引

索引的建立应当基于查询中的过滤条件（WHERE 子句）以及查询的选择列（SELECT 子句）。

由于查询条件是`name='paicoding'`，所以应当为`name`字段建立索引。

```sql
CREATE INDEX idx_name ON tblname(name);
```

查询中选择了`age`、`id`和`name`字段，如果这三列经常一起使用，可以考虑建立包含这些字段的联合索引。可以将查询条件中的字段放在联合索引的首位，这样查询时可以利用索引覆盖，直接从索引中获取数据，而不需要再去查找数据行。

```sql
CREATE INDEX idx_name_age_id ON tblname (name, age, id);
```

#### 表字段id（主键）age name select name,age from 表 where name like(A%) and age =30会不会走索引？

可以创建组合索引 (name, age)，这可以利用 name 和 age 的双重条件来高效地进行查询。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 13 Java 后端二面面试原题：一个表（name, sex,age,id），select age,id,name from tblname where name='paicoding';怎么建索引

### 83.SQL 题：一个学生成绩表，字段有学生姓名、班级、成绩，求各班前十名

这是一个典型的 SQL 题，主要考察 SQL 的基本语法和分组查询。

第一步，建表：

```sql
CREATE TABLE student_scores (
    student_name VARCHAR(100),
    class VARCHAR(50),
    score INT
);
```

第二步，插入数据：

```sql
INSERT INTO student_scores (student_name, class, score) VALUES
('沉默王二', '三年二班', 88),
('沉默王三', '三年二班', 92),
('沉默王四', '三年二班', 87),
('沉默王五', '三年二班', 85),
('沉默王六', '三年二班', 90),
('沉默王七', '三年二班', 95),
('沉默王八', '三年二班', 82),
('沉默王九', '三年二班', 78),
('沉默王十', '三年二班', 91),
('沉默王十一', '三年二班', 79),
('沉默王十二', '三年三班', 84),
('沉默王十三', '三年三班', 81),
('沉默王十四', '三年三班', 90),
('沉默王十五', '三年三班', 88),
('沉默王十六', '三年三班', 87),
('沉默王十七', '三年三班', 93),
('沉默王十八', '三年三班', 89),
('沉默王十九', '三年三班', 85),
('沉默王二十', '三年三班', 92),
('沉默王二十一', '三年三班', 84);
```

第三步，查询各班前十名：

```sql
SET @cur_class = NULL, @cur_rank = 0;

SELECT student_name, class, score
FROM (
    SELECT
        student_name,
        class,
        score,
        @cur_rank := IF(@cur_class = class, @cur_rank + 1, 1) AS rank,
        @cur_class := class
    FROM student_scores
    ORDER BY class, score DESC
) AS ranked
WHERE ranked.rank <= 10;
```

使用 `@cur_class` 和 `@cur_rank` 来跟踪当前行的班级和排名。

在 SELECT 语句中，通过检查当前班级（`@cur_class`）是否与上一行相同来决定排名。如果相同，则增加排名；如果不同，则重置排名为 1。

然后通过 ORDER BY 子句确保在计算排名前按班级和分数排序。

![二哥的 Java 进阶之路](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240423113508.png)

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯云智面经同学 16 一面面试原题：SQL 题：一个学生成绩表，字段有学生姓名、班级、成绩，求各班前十名

---

图文详解 84 道 MySQL 面试高频题，这次吊打面试官，我觉得稳了（手动 dog）。整理：沉默王二，戳[转载链接](https://mp.weixin.qq.com/s/JFjFs_7xduCmHOegbJ-Gbg)，作者：三分恶，戳[原文链接](https://mp.weixin.qq.com/s/zSTyZ-8CFalwAYSB0PN6wA)。

_没有什么使我停留——除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟_。

**系列内容**：

- [面渣逆袭 Java SE 篇 👍](https://javabetter.cn/sidebar/sanfene/javase.html)
- [面渣逆袭 Java 集合框架篇 👍](https://javabetter.cn/sidebar/sanfene/javathread.html)
- [面渣逆袭 Java 并发编程篇 👍](https://javabetter.cn/sidebar/sanfene/collection.html)
- [面渣逆袭 JVM 篇 👍](https://javabetter.cn/sidebar/sanfene/jvm.html)
- [面渣逆袭 Spring 篇 👍](https://javabetter.cn/sidebar/sanfene/spring.html)
- [面渣逆袭 Redis 篇 👍](https://javabetter.cn/sidebar/sanfene/redis.html)
- [面渣逆袭 MyBatis 篇 👍](https://javabetter.cn/sidebar/sanfene/mybatis.html)
- [面渣逆袭 MySQL 篇 👍](https://javabetter.cn/sidebar/sanfene/mysql.html)
- [面渣逆袭操作系统篇 👍](https://javabetter.cn/sidebar/sanfene/os.html)
- [面渣逆袭计算机网络篇 👍](https://javabetter.cn/sidebar/sanfene/network.html)
- [面渣逆袭 RocketMQ 篇 👍](https://javabetter.cn/sidebar/sanfene/rocketmq.html)
- [面渣逆袭分布式篇 👍](https://javabetter.cn/sidebar/sanfene/fenbushi.html)
- [面渣逆袭微服务篇 👍](https://javabetter.cn/sidebar/sanfene/weifuwu.html)
- [面渣逆袭设计模式篇 👍](https://javabetter.cn/sidebar/sanfene/shejimoshi.html)

---

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括 Java 基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM 等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
