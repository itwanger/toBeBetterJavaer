---
title: 一文彻底搞懂 MySQL 字段定义时的属性设置
shortTitle: 字段都有哪些属性？
---

# MySQL字段都有哪些属性？

在[创建表](https://javabetter.cn/mysql/table.html)的时候，我们需要定义表的字段，每个字段都有一些属性，比如说是否有默认值、是否允许为空、是不是主键等等。

这些约束字段的属性，可以让字段的值更符合我们的预期，也会为以后的数据查询和更新提供便利。

比如说，我们在定义字段的时候添加了默认值，那在插入数据的时候，如果我们没有主动指定这个字段的值（比如 Java 程序中），数据库就会使用默认值帮我们自动填充。

像[技术派实战项目](https://javabetter.cn/zhishixingqiu/paicoding.html)中的文章详情表，我们为 id 字段设置了 NOT NULL、AUTO_INCREMENT、COMMENT 等属性。

![](https://cdn.tobebetterjavaer.com/stutymore/column-20240206170954.png)

那接下来，就来一起看看 MySQL 字段的常用属性都有哪些吧。

## 默认值

默认值（DEFAULT）是指在插入数据的时候，如果没有指定这个字段的值，那就会使用默认值。

我们创建这样一张表，包含了 varchar、int、datetime 等字段类型，每个字段都设置了默认值。

```sql
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT '沉默王二',
  `age` int(11) DEFAULT 18,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

在插入数据的时候，如果没有指定 name、age、create_time 字段的值，那就会使用默认值。

```sql
INSERT INTO `user` (`id`) VALUES (1);
```

可以看到，插入数据的时候，我们只指定了 id 字段的值，其他字段都省略了，但 MySQL 自动帮我们填充了默认值。

![](https://cdn.tobebetterjavaer.com/stutymore/column-20240208063305.png)

- `DEFAULT '沉默王二'`：指定了 name 字段的默认值为“沉默王二”。
- `DEFAULT 18`：指定了 age 字段的默认值为 18。
- `DEFAULT CURRENT_TIMESTAMP`：指定了 create_time 字段的默认值为当前时间。

那假如我们没有指定默认值，又没有主动插入数据，那这个字段的值会是什么呢？

```sql
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255),
  `age` int(11),
  `create_time` datetime,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

在插入数据的时候，我们没有指定 name、age、create_time 字段的值，也没有设置默认值。

```sql
INSERT INTO `user` (`id`) VALUES (1);
```

可以看到，此时，MySQL 帮我们填充的值是 NULL。

![](https://cdn.tobebetterjavaer.com/stutymore/column-20240208063712.png)

这也是为什么[阿里巴巴的开发规约](https://javabetter.cn/pdf/ali-java-shouce.html)上会要求我们，在 POJO 中，要使用包装类型，而不是基本数据类型，因为数据库的查询结构可能是 null，如果使用基本数据类型的画，因为要[自动拆箱](https://javabetter.cn/basic-extra-meal/box.html)，就会抛出 NPE 异常。

当然了，DEFAULT 也不能乱用，要根据业务需求来设置默认值，比如说，我们在创建用户表的时候，就不应该为 name 字段设置默认值，因为这样的话，如果用户没有填写名字，MySQL 就会默认填充“沉默王二”，这显然是不合理的。

我们要尽早提示用户填写名字，而不是用默认值填充。

但对于 create_time 字段，我们就可以设置默认值为 CURRENT_TIMESTAMP，这样的话，MySQL 就会自动帮我们填充当前时间，Java 程序就不需要在插入数据的时候，手动填充时间了。

## 是否允许为空

有时候，我们会希望某个字段的值不能为空，比如说，用户名、手机号、邮箱等，这些字段的值都是必填的。

那我们在创建表的时候，就会明确指定这些字段是 `NOT NULL` 的。

```sql
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `mobile` varchar(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

这样在插入数据的时候，如果我们没有指定 name、mobile、email 字段的值，那 MySQL 就会报错。

```sql
INSERT INTO `user` (`id`) VALUES (1);
```

![](https://cdn.tobebetterjavaer.com/stutymore/column-20240208065216.png)

虽然我们也会在 Java 程序中对这些字段进行校验，但在数据库层面，也要对字段的值进行约束，这样可以更好地保证数据的完整性。

## 主键

主键（PRIMARY KEY）是用来唯一标识一条记录的，一个表中只能有一个主键，主键的值不能重复，也不能为 NULL。

主键的指定方式有两种，一种是在字段定义的时候直接跟上 PRIMARY KEY，另一种是在所有字段定义完成后，再通过 PRIMARY KEY（字段）这种方式指定。

```sql
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

或者

```sql
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

第二种方式在复合主键（由两个或更多的字段组合而成）的时候会更加方便，比如说，我们要为学生课程表设置复合主键，就可以这样定义。

```sql
CREATE TABLE `student_course` (
  `student_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  created_time datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`student_id`, `course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

通过 PRIMARY KEY 关键字后面跟上括号内的多个字段名来实现。

不过，复合主键会创建更复杂的索引，可能会对插入、更新、删除等操作的性能产生影响，另外，在执行[联合查询](https://javabetter.cn/mysql/select-join.html)的时候，因为需要处理复合主键的多个字段，也会使 SQL 查询语句变得复杂。

所以在实际开发中，复合主键的使用频率并不高。

## 自增

自增（AUTO_INCREMENT）是指在插入数据的时候，如果没有指定这个字段的值，那 MySQL 就会自动帮我们填充一个递增的值。

一般用于类型为整型的主键字段，比如说 int 或 bigint。

```sql
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

我们来插入几条数据，看看 id 字段的值是怎么填充的。

```sql
INSERT INTO `user` (`name`) VALUES ('沉默王二');
INSERT INTO `user` (`name`) VALUES ('沉默王三');
INSERT INTO `user` (`name`) VALUES ('沉默王四');
```

再删除一条数据后插入：

```sql
DELETE FROM `user` WHERE `id` = 2;
INSERT INTO `user` (`name`) VALUES ('沉默王五');
```

可以看到，每次插入数据的时候，id 都会在以前的最大值上加 1。

![](https://cdn.tobebetterjavaer.com/stutymore/column-20240208073513.png)