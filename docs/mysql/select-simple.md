---
title: MySQL 之简单查询：开始踏上 SELECT 之旅
shortTitle: MySQL 之简单查询
---

# MySQL 之简单查询

前面我们介绍了如何[创建数据库](https://javabetter.cn/mysql/database.html)、[如何创建数据表](https://javabetter.cn/mysql/table.html)，那今天我们来结合[技术派实战项目](https://javabetter.cn/zhishixingqiu/paicoding.html)来讲讲 MySQL 的查询，也就是 `SELECT` 语句。

我们先从最简单的 SELECT 查询开始，主打一个循序渐进，让大家彻底掌握 SELECT。

在日常的开发工作中，查询语句也是最常用的，因为表在一开始设计的时候已经确定了，后期很少去修改表结构，也就意味着插入数据的方式也是确定的，但数据的展示方式却千奇百怪，用户端和 admin 管理端可能需要各种各样的数据，那 MySQL 就要提供最接近需求的数据。

承载这项工作的重任就交给了 `SELECT` 语句。