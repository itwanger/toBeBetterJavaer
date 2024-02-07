---
title: 一文彻底搞懂 MySQL 字段定义时的属性设置
shortTitle: 字段都有哪些属性？
---

# MySQL字段都有哪些属性？

在[创建表](https://javabetter.cn/mysql/table.html)的时候，我们需要定义表的字段，每个字段都有一些属性，比如说默认值、是否允许为空、是不是主键等等。

这些约束字段的属性，可以让字段的值更符合我们的预期，也会为以后数据的查询和更新提供便利。

比如说，我们在定义字段的时候添加了默认值，那在插入数据的时候，如果没有指定这个字段的值，就会使用默认值，这样就不需要在程序中做处理了。

像[技术派实战项目](https://javabetter.cn/zhishixingqiu/paicoding.html)中的文章详情表，我们为 id 字段设置了 NOT NULL、AUTO_INCREMENT、COMMENT 等属性。

![](https://cdn.tobebetterjavaer.com/stutymore/column-20240206170954.png)

