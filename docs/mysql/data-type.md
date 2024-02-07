---
title: 4000 字 20 张手绘图，结合技术派实战项目，彻底掌握 MySQL 的数据类型
shortTitle: MySQL数据类型
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

也就是说，`int(M)` 只是规定了显示宽度，对于存储空间和范围没有影响。通常与 ZEROFILL 一起使用，这样会在数字前面补 0，直到达到 M 位数。

> If ZEROFILL is specified, the column will be zero-filled to the specified width for numeric types.

我们来修改一下之前的表结构，将 `int(10)` 和 `int(11)` 改成 `int(10) ZEROFILL` 和 `int(11) ZEROFILL`。

```sql
CREATE TABLE `test` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `int10` int(10) ZEROFILL NOT NULL,
  `int11` int(11) ZEROFILL NOT NULL,
  `int` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

再插入一条同样的数据（10 位），看看结果。

```sql
INSERT INTO `test` (`int10`, `int11`, `int`) VALUES (1234567890, 1234567890, 1234567890);
```

结果如下所示：

![](https://cdn.tobebetterjavaer.com/stutymore/data-type-20240202084838.png)

可以看到，`int(10) ZEROFILL` 和 int 都是正常显示，而 `int(11) ZEROFILL` 在数字前面补了 0，这是因为 1234567890 不足我们规定的 11 位，所以前面补了 0。

也就是说，没有指定 ZEROFILL 的话，`int(M)` 和 int 是一样的；指定了 ZEROFILL 的话，就会在数字前面补 0，直到达到 M 位数。

## 浮点数类型

浮点数类型包括 float 和 double，它们的取值范围我从来没有记住过（😂），太难记了。

它们之间的区别是存储空间不同，float 是 4 字节，double 是 8 字节。既然存储空间不同，肯定表示的范围也就不同，double 占用的空间大，所以精度上也更加准确。

>关于精度，我在《[二哥的 Java 进阶之路](https://javabetter.cn/basic-grammar/basic-data-type.html#_03%E3%80%81%E5%8D%95%E7%B2%BE%E5%BA%A6%E5%92%8C%E5%8F%8C%E7%B2%BE%E5%BA%A6)》上也有讲过。

![](https://cdn.tobebetterjavaer.com/stutymore/data-type-20240202091551.png)

## 定点数类型

实际工作当中，浮点数其实并不常用，因为很容易出现精度丢失的问题，尤其是一些涉及到货币值时，所以我们一般会选择定点数类型。

记得之前在对接微信支付的时候，微信支付的金额是用 `int` 类型表示的，单位是分，也就是说 1 元是 100 分。这样做的好处是，避免了浮点数精度丢失的问题。

![](https://cdn.tobebetterjavaer.com/stutymore/data-type-20240202093128.png)

定点数类型包括 decimal 和 numeric，~~网上有说 decimal 的存储空间是定长的，而 numeric 的存储空间是变长的~~，但是我在 MySQL 官方文档上并没有找到相关的信息。

![](https://cdn.tobebetterjavaer.com/stutymore/data-type-20240202093648.png)

换句话说，在 MySQL 中，decimal 和 numeric 是等价的，没有区别。

例如，我们可以这样定义一个定点数类型的字段。

```sql
CREATE TABLE `test` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `price` decimal(10, 2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

声明 `decimal(10, 2)` 意味着 price 最多有 10 位数，包括小数点后的 2 位。

也就是说，`decimal(M, D)` 中的 M 表示总的位数，D 表示小数点后的位数。

定点数之所以比浮点数精确，是因为定点数会按照小数点把数字分成两部分，整数部分和小数部分，而浮点数是按照科学计数法来存储的。

比方说对于十进制小数 123.456，定点数会把它存储为 123 和 456 两部分，而浮点数会把它存储为 $1.23456 * 10^2$。

大家都知道，计算机存储的是二进制，遇到小数的时候就容易表示不精确，比如说 0.1 在二进制中是无限循环的。

>使用 [binaryconvert](https://www.binaryconvert.com/) 可以查看 0.1 在二进制中的表示。

![](https://cdn.tobebetterjavaer.com/stutymore/data-type-20240202100059.png)

但存储整数就完全没问题，0 的二进制表示就是 00，1 的二进制表示就是 01，2 的二进制表示就是 10，3 的二进制表示就是 11，4 的二进制表示就是 0100，以此类推（逢二进一）。

回到定点数上，对于定点数 `decimal(M, D)`，M 的取值范围是 1 到 255，D 的取值范围是 0 到 30；且 M 必须大于等于 D。

那 MySQL 是如何存储 `decimal(16, 4)` 这个定点数的呢？

可以选择字符串的存储方式，每个数字占用一个字符的位置，比如说数值 123.4567，直接存储为字符串 "123.4567"。

但这种方式对于计算机来说，并不高效，毕竟计算机的底层仍然是通过二进制来实现存储的。那怎么办呢？

对于 `decimal(16, 4)`，MySQL 会将其拆解为两部分，整数部分和小数部分，然后采用二进制压缩存储的方式来存储。

![图片来源于小孩子的 MySQL 是怎样使用的](https://cdn.tobebetterjavaer.com/stutymore/data-type-20240202102322.png)

①、**整数部分**：有 12 位数字（16-4=12），每组 9 位十进制数字可以被压缩存储在 4 个字节的二进制格式中（因为 $10^9 < 2^32$）。如果整数部分少于 9 位数字，它将占用足够存储该数值的最小字节数。

![](https://cdn.tobebetterjavaer.com/stutymore/data-type-20240202102419.png)

②、**小数部分**：有 4 位数字，同样可以通过压缩的二进制格式存储。4 位十进制数字可以压缩到 2 字节内（因为 $10^4 < 2^16$）。

每组中包含的十进制数字位数不同，所需的存储空间也不同，具体见下表：

| 位数 | 存储空间 |
| :--- | :--- |
| 1-2 | 1 字节 |
| 3-4 | 2 字节 |
| 5-6 | 3 字节 |
| 7-9 | 4 字节 |

所以 `decimal(16, 4)` 共需要占用 8 个字节的存储空间：

- 第 1 组包含 3 个十进制，需要 2 个字节；
- 第 2 组包含 9 个十进制，需要 4 个字节；
- 第 3 组包含 4 个十进制，需要 2 个字节。

我们拿 1234567890.1234 举例：

①、整数部分 1234567890，可以分组为 1 和 234567890，分别占用 1 个字节和 4 个字节。

②、小数部分 1234，可以分组为 1234，占用 2 个字节。

Java 与 decimal 对应的数据类型是 BigDecimal，常用在金融领域。

## 日期和时间类型

日期和时间类型包括 year、date、time、datetime、timestamp。

- year 类型用于存储年份，范围是 1901 到 2155，占用 1 个字节。
- date 类型用于存储日期，范围是 1000-01-01 到 9999-12-31，占用 3 个字节。
- time 类型用于存储时间，范围是 `-838:59:59[.000000]` 到 `838:59:59[.000000]`，占用 3 字节 + 小数秒的存储空间
- datetime 类型用于存储日期和时间，范围是 `1000-01-01 00:00:00[.000000]` 到 `9999-12-31 23:59:59[.999999]`，占用 5字节+小数秒的存储空间。
- timestamp 类型用于存储时间戳，范围是 `1970-01-01 00:00:01[.000000]` 到 `2038-01-19 03:14:07[.999999]`，占用 4 字节 + 小数秒的存储空间。

datetime 和 timestamp 是最常用的两个类型，新手经常会搞混，不知道到底该使用哪一个。

- datetime 是存储的是实际的时间，不会受到时区的影响。适用于需要存储较宽时间范围的日期和时间数据，或者数据不需要考虑时区变化的场景，如出生日期。
- timestamp 是存储的是 UTC（Coordinated Universal Time，一个时间标准）时间，可以根据时区进行转换。特别适合记录数据的创建时间和修改时间等需要考虑时区的场景。

举例来说，我们把 `2024-02-02 11:12:13` 存储到 datetime 类型的字段中，那么无论在哪个时区，都是 `2024-02-02 11:12:13`。

而 timestamp 要求存储的是时间戳，存储之前，要先计算从 `1970-01-01 00:00:00` 起到某个时间节点的秒数，比如说 `2024-02-02 11:12:13` 对应的时间戳是 1706843533000。

那这个时间戳在 UTC+8（北京时间）时区下，就是 `2024-02-02 11:12:13`，在 UTC-5（纽约）时区下，就是 `2024-02-01 20:12:13`，在 UTC+1（伦敦）时区下，就是 `2024-02-02 03:12:13`。

在技术派项目中，article 表的 create_time 和 update_time 字段就是 timestamp 类型的。

![](https://cdn.tobebetterjavaer.com/stutymore/data-type-20240202114320.png)

注意到 timestamp 类型的字段，还有一个属性 `DEFAULT CURRENT_TIMESTAMP`，这是设置默认值的，也就是说，如果插入数据的时候没有指定 create_time 和 update_time 的值，那么就会自动填充当前时间。这是 MySQL 5.6 之后的新特性。

`ON UPDATE CURRENT_TIMESTAMP` 是设置更新时间的，也就是说，如果更新数据的时候没有指定 update_time 的值，那么就会自动填充当前时间。

通过 `select CURRENT_TIMESTAMP` 可以查看当前时间。

![](https://cdn.tobebetterjavaer.com/stutymore/data-type-20240202115835.png)

也就是说，我们在插入数据和更新数据的时候，不需要手动填充 create_time 和 update_time 的值，MySQL 会自动帮我们填充。

对应的 Java 数据类型是 java.util.Date。

![](https://cdn.tobebetterjavaer.com/stutymore/data-type-20240202114424.png)

技术派实战项目中用 MyBatis-Plus 作为持久层框架，它扩展了 MyBatis，而 MyBatis 会自动将 timestamp 类型的字段映射为 java.util.Date 类型，由 DateTypeHandler 实现。

![](https://cdn.tobebetterjavaer.com/stutymore/data-type-20240202121438.png)

## 字符串类型

字符串类型包括 char、varchar、tinytext、text、mediumtext、longtext。

①、char(M)，固定 M 个字符长度，最多 255 个字符，如果省略掉 M，默认为 1。

②、varchar(M)，可变 M 个字符长度，最多 65535 个字符，但实际上存不了这么多，因为需要额外两个字节来存储长度（字符数小于 255 时使用一个字节），除此之外，还和[字符集](https://javabetter.cn/mysql/charset.html)、[存储引擎](https://javabetter.cn/mysql/InnoDB.html)有关。

下表展示了 `char(4)` 和 `varchar(4)` 在单字节字符集（latin1）下的不同。

>latin1 是单字节字符集，一个字符占用 1 个字节。

值|char(4)|存储空间|varchar(4)|存储空间
:---|:---|:---|:---|:---
''|'    '|4 字节|''|1 字节
'ab'|'ab  '|4 字节|'ab'|3 字节
'abcd'|'abcd'|4 字节|'abcd'|5 字节
'abcde'|'abcd'|4 字节|'abcd'|5 字节

由此可以看出，char 类型是固定长度的，不足的地方会用空格填充，而 varchar 类型是可变长度的；当超过指定长度时，都会截断。

也就是说，当我们不确定字段的长度时，应该使用 varchar 类型。这样可以节省一定的存储空间。

实际工作中，char 确定也非常少用，[技术派实战项目](https://javabetter.cn/zhishixingqiu/paicoding.html)中基本上用的都是 varchar 类型。

![](https://cdn.tobebetterjavaer.com/stutymore/data-type-20240202142924.png)

③、文本类型，最常用的就是 longtext类型，比如说技术派项目中 article 表的 content 字段就是 longtext 类型的。

![](https://cdn.tobebetterjavaer.com/stutymore/data-type-20240202123538.png)

内容是 markdown 格式的字符，所以 longtext 足够用了，来看一下它们的存储空间：

- tinytext，最多 $2^{8*1}-1$ 个字节。
- text，最多 $2^{8*2}-1$ 个字节，相当于 64KB。
- mediumtext，最多 $2^{8*3}-1$ 个字节，相当于 16MB。
- longtext，最多 $2^{8*4}-1$ 个字节，相当于 4GB。

那其实除了上面提到的这几种字符类型，还有 enum 和 set 类型。

- enum 类型，用于存储枚举类型，比如说性别字段，只有男和女两种，就可以用 enum 类型。
- set 类型，用于存储集合类型，比如说文章标签字段，可以有多个标签，就可以用 set 类型。

通过下面这个例子，我们可以看到 enum 和 set 类型的定义方式。

```sql
CREATE TABLE `test` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `gender` enum('男', '女') NOT NULL,
  `tags` set('Java', 'Python', 'Go', 'C++') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

插入两条数据，看看结果。

```sql
INSERT INTO `test` (`gender`, `tags`) VALUES ('男', 'Java,Python');
INSERT INTO `test` (`gender`, `tags`) VALUES ('女', 'Go,C++');
```

![](https://cdn.tobebetterjavaer.com/stutymore/data-type-20240202143308.png)

当然了，这两个类型在实际工作中并不常用，比如说 enum 类型，可以通过 tinyint 配合 Java 中的[枚举](https://javabetter.cn/basic-extra-meal/enum.html)类型来实现。

![](https://cdn.tobebetterjavaer.com/stutymore/data-type-20240202143728.png)

这样会更加灵活，枚举中的 code 和表中的字段值对应，枚举中的 desc 就可以定义为枚举的描述。

至于 set，同样可以通过一对多的关系来实现，比如说文章和标签的关系，可以通过一张文章表和一张标签表来实现。

![](https://cdn.tobebetterjavaer.com/stutymore/data-type-20240202144024.png)

这样修改起来会更加容易，比如说哪天 Go 标签想更改为 Golang 标签，我只需要改一下 tag 表就可以了，文章表不需要做任何修改。

![](https://cdn.tobebetterjavaer.com/stutymore/data-type-20240202144101.png)

## 二进制类型

二进制类型通常用来存储图片、音频、视频等二进制文件，MySQL 提供了多种二进制类型来满足不同的存储要求，包括 binary、varbinary、tinyblob、blob、mediumblob、longblob。

binary 和 varbinary 类型适合存储需要精确字节长度的二进制数据，比如说 MD5 值等。

- binary：固定长度的二进制，最多 255 个字节。
- varbinary：可变长度的二进制，最多 65535 个字节。

blob（Binary Large OBject）类型适合存储大型二进制数据，比如说图片、音频、视频等。

- tinyblob：最多 $2^{8*1}-1$ 个字节。
- blob：最多 $2^{8*2}-1$ 个字节，相当于 64KB。
- mediumblob：最多 $2^{8*3}-1$ 个字节，相当于 16MB。
- longblob：最多 $2^{8*4}-1$ 个字节，相当于 4GB。

不过在实际工作中，我们很少直接存储二进制文件，而是存储文件的路径，然后通过路径来访问文件。

文件本身通过 OSS（Object Storage Service）等对象存储服务来存储，数据库只存储文件的元数据，比如说文件名、文件大小、文件类型等。

这样做的好处是，可以减少数据库的存储压力，提高数据库的性能，而且还可以实现文件的分布式存储。

像技术派中的 article 表，就有一个 picture 字段，用来存储文章的封面图片，这个字段是 varchar 类型的，存储的就图片的路径。

![](https://cdn.tobebetterjavaer.com/stutymore/data-type-20240202151217.png)

关于图片如何上传至 OSS，教程我放到技术派实战教程中，大家可以通过下面的链接获取。

[技术派实战教程](https://javabetter.cn/zhishixingqiu/paicoding.html)

![](https://cdn.tobebetterjavaer.com/stutymore/data-type-20240202151027.png)


## 小结

关于 MySQL 的数据类型，这一节我们就先讲到这里，总结一下：

- 整数类型包括 tinyint、smallint、mediuint、int、bigint，可以选择有符号和无符号。
- 浮点数类型包括 float 和 double，double 的精度更高。
- 定点数类型包括 decimal 和 numeric，用于存储货币值等精度要求高的数据。
- 日期和时间类型包括 year、date、time、datetime、timestamp，datetime 适用于不需要考虑时区变化的场景，timestamp 适用于需要考虑时区变化的场景。
- 字符串类型包括 char、varchar、tinytext、text、mediumtext、longtext，char 是固定长度的，varchar 是可变长度的，文本类型适合存储大型文本数据。
- 二进制类型包括 binary、varbinary、tinyblob、blob、mediumblob、longblob，适合存储图片、音频、视频等二进制文件。

在实际工作中，我们要根据业务需求，选择合适的数据类型，避免浪费存储空间，提高数据库性能。

另外，还要注意数据库和 Java 数据类型的对应关系，避免出现不兼容的情况。



----

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)