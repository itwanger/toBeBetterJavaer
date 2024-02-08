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

。。。。。

以下内容为知识星球付费内容。