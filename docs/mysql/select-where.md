---
title: MySQL WHERE 条件查询，重点搞懂 % 通配符，MyBatis 中的 \# 和 $ 的区别，MySQL 会如何处理连续的 % 通配符
shortTitle: MySQL WHERE条件查询
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

当我们传入的参数是 `name = "王二"` 时，它将被解析为：

```sql
select * from user where name = '王二';
```

`$` 会直接拼接参数的值，不会进行预处理。这就存在 SQL 注入的风险。

假如有这样的 SQL 语句：

```xml
select * from ${tableName} where name = #{name} 
```

当 tableName 为 `user; delete user; --` 时，它将被解析为：

```sql
select * from user; delete user; -- where name = ?;
```

`--` 是 SQL 中的注释符，表示注释掉后面的内容。于是，一条本来是 SQL 查询的语句，变成了删除 user 表的语句。

这是万万不能够的，当然了，这里讲的很浅，我们单独留一个传送门（里面再细讲）：

[MyBatis 中的 # 和 $](https://javabetter.cn/mybatis/dollar-vs-jing.html)

### 连续的%通配符

我们这里来实验一下，假如查询条件中包含 `%` 通配符，MyBatis 会如何解析呢？MySQL 的执行结果又会怎么样呢？

我们还是以[技术派实战项目](https://javabetter.cn/zhishixingqiu/paicoding.html)为例，假如我们要查询标题中包含“%0”的文章。

![](https://cdn.tobebetterjavaer.com/stutymore/select-where-20240225091030.png)

#### MyBatis

先来看 MyBatis 生成的 SQL 语句：

![](https://cdn.tobebetterjavaer.com/stutymore/select-where-20240225091214.png)

我把关键的部分摘出来：

```java
Preparing: select a.id  from article a where a.title like concat('%', ?, '%') order by a.update_time desc limit ?, ?

Parameters: %0(String), 0(Long), 10(Long)
```

可以看到，`#{}`是通过占位符 `?` 的方式进行拼接的。

#### MySQL

那最终 MySQL 执行的 SQL 语句又是什么样的？

我们可以通过打开 MySQL 的通用查询日志（General Query Log）来辅助我们完成这项工作。

- 可以通过 `SHOW VARIABLES LIKE 'general_log';` 来查看通用查询日志是否开启。ON 为开启，OFF 为关闭。
- 可以通过 `SHOW VARIABLES LIKE 'general_log_file';` 来查看通用查询日志的文件路径。

![](https://cdn.tobebetterjavaer.com/stutymore/select-where-20240225093736.png)

如果未开启的话，可以通过 `SET GLOBAL general_log = 'ON';` 来开启通用查询日志。

![](https://cdn.tobebetterjavaer.com/stutymore/select-where-20240225093952.png)

然后执行上面的查询，就可以在通用查询日志中看到 MySQL 执行的 SQL 语句。

可以通过文本工具打开日志文件，拉到最后，就可以找到对应的 SQL 语句。我的是 macOS，所以直接用 [vim](https://javabetter.cn/xuexiluxian/vim.html) 就可以打开。

![](https://cdn.tobebetterjavaer.com/stutymore/select-where-20240225094041.png)

可以看到，最终 MySQL 执行的 SQL 语句是这样的（省略部分 SQL 内容）：

```sql
select a.id  from article a where a.title like concat('%', '%0', '%') order by a.update_time desc limit 0, 10
```

#### 执行结果

前面我们讲了，在SQL的LIKE语句中，`%`是一个通配符，它可以匹配任意数量（包括零个）的字符。

那 MySQL 是如何处理 `%%0%` 的呢？

它会将连续的`%`视为一个，因为它们的含义没有变化——仍然是匹配任意长度的字符序列。

- 'a.title LIKE '%0%'：匹配任何包含0的a.title。
- 'a.title LIKE '%%0%'：效果同上，多出来的`%`并不改变匹配模式。
- 'a.title LIKE '%%%0%%%'：即使更多的`%`被添加进来，匹配模式仍然相同。

我们来验证一下，查询 `%01%`、`%%01%`、`%%%01%`的结果是完全一样的，都是查询标题中包含“10”的文章。

![](https://cdn.tobebetterjavaer.com/stutymore/select-where-20240225094921.png)

所以，`%` 通配符可以连续出现，但是它们的含义是一样的，都是匹配任意长度的字符序列。这也是一个面试的考点，但实际使用中，应该尽量避免这种情况的出现，因为会让不懂的新手产生困惑。

### \_ 通配符

`_` 通配符其实算是一个占位符，比如说我们要查询标题为“分表”、“分库”的文章，可以这么写：

```sql
SELECT title, user_id, create_time FROM article WHERE title LIKE '分_';
```

但它只会匹配一个字符，所以只能匹配“分表”或者“分库”，而不能匹配“分布式”。

假如标题有这么几个：

- 分表
- 分库
- 分布式
- MySQL 分库
- MySQL 分表

那么，`title LIKE '分_'` 就只会匹配到“分表”和“分库”，而不会匹配到“分布式”、“MySQL 分库”、“MySQL 分表”。

所以，`_` 通配符在实际工作中并不常用。

### 转义通配符

如果我们要查询的字符串中本身就包含 `%` 或者 `_`，那么就需要对它们进行转义，否则会被误认为是通配符。

MySQL 使用 `\` 作为转义字符，比如说，我们要查询标题中包含“%分布式%”的文章，可以这么写：

```sql
SELECT title, user_id, create_time FROM article WHERE title LIKE '%\%分布式\%%';
```

## 小结

这一节，我们学习了一些简单的 WHERE 条件查询，包括比较查询操作符、区间查询、枚举查询、NULL 查询、逻辑操作符、通配符查询等。

其中重点讲了 `%` 通配符的使用，包括 MyBatis 中的 `#` 和 `$` 的区别，以及 MySQL 会如何处理连续的 `%` 通配符。

这两个都是面试中的考点，如果有时间的话，大家还是要结合源码进行深入拆解的，对提到编程功底也大有帮助。