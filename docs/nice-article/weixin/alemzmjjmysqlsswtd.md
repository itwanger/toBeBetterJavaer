---
title: 如何解决 MySQL 死锁问题？
shortTitle: 如何解决 MySQL 死锁问题？
description: 咱们使用 MySQL 大概率上都会遇到死锁问题，这实在是个令人非常头痛的
author: 狼王
category:
  - 微信公众号
---

使用 MySQL 的过程中，大概率上都会遇到死锁问题，这实在是个令人头痛的问题。今天二哥就来对死锁进行一个详细地分析，并结合常见的死锁案例进行探讨，同时，给出一些如何去尽可能避免死锁的建议，希望能给球友们一些帮助和启发。

## 什么是死锁

死锁是并发系统中一个常见的问题，同样也会出现在数据库 MySQL 的并发读写请求场景中。

当两个及以上的事务，都在等待对方释放已经持有的锁，或因为加锁顺序不一致造成循环等待锁资源的时候，就会出现“**死锁**”。

常见的报错信息为 `Deadlock found when trying to get lock...`。

举例来说 A 事务持有 X1 锁 ，申请 X2 锁，B 事务持有 X2 锁，申请 X1 锁。A 和 B 事务持有锁并且申请对方持有的锁进入循环等待，就造成了死锁。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-alemzmjjmysqlsswtd-3ccf37d0-cae4-4cb0-a11d-462be7288611.jpg)

如上图，是右侧的四辆汽车资源请求产生了回路现象，即死循环，导致了死锁。

从死锁的定义来看，MySQL 出现死锁的几个要素为：

1.  两个或者两个以上事务
2.  每个事务都已经持有锁并且申请新的锁
3.  锁资源同时只能被同一个事务持有或者不兼容
4.  事务之间因为持有锁和申请锁导致彼此循环等待

## InnoDB 锁类型

为了分析死锁，我们有必要对 InnoDB 的锁类型有一个了解。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-alemzmjjmysqlsswtd-da7199f3-0ed4-4e01-825e-8f5f54cb4926.jpg)

MySQL InnoDB 引擎实现了标准的`行级别锁：共享锁( S lock ) 和排他锁 ( X lock )`

1.  不同事务可以同时对同一行记录加 S 锁。
2.  如果一个事务对某一行记录加 X 锁，其他事务就不能加 S 锁或者 X 锁，从而导致锁等待。

如果事务 T1 持有行 r 的 S 锁，那么另一个事务 T2 请求 r 的锁时，会做如下处理:

1.  T2 请求 S 锁立即被允许，结果 T1 T2 都持有 r 行的 S 锁
2.  T2 请求 X 锁不能被立即允许

如果 T1 持有 r 的 X 锁，那么 T2 请求 r 的 X、S 锁都不能被立即允许，T2 必须等待 T1 释放 X 锁才可以，因为 X 锁与任何的锁都不兼容。

共享锁和排他锁的兼容性如下所示：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-alemzmjjmysqlsswtd-da39b1a9-110e-4649-869a-a54e1d449973.jpg)

## 间隙锁( gap lock )

间隙锁锁住一个间隙以防止插入。假设索引列有 2, 4, 8 三个值，如果对 4 加锁，那么同时也会对(2,4)和(4,8)这两个间隙加锁。其他事务无法插入索引值在这两个间隙之间的记录。但是，间隙锁有个例外:

1.  如果索引列是唯一索引，那么只会锁住这条记录(只加行锁)，而不会锁住间隙。
2.  对于联合索引且是唯一索引，如果 where 条件只包括联合索引的一部分，那么依然会加间隙锁。

## next-key lock

next-key lock 实际上就是 行锁+这条记录前面的 gap lock 的组合。假设有索引值 10,11,13 和 20，那么可能的 next-key lock 包括:

> (负无穷,10\],(10,11\],(11,13\],(13,20\],(20,正无穷)

在 RR 隔离级别下，InnoDB 使用 next-key lock 主要是防止`幻读`问题产生。

## 意向锁( Intention lock )

InnoDB 为了支持多粒度的加锁，允许行锁和表锁同时存在。为了支持在不同粒度上的加锁操作，InnoDB 支持了额外的一种锁方式，称之为意向锁( Intention Lock )。意向锁是将锁定的对象分为多个层次，意向锁意味着事务希望在更细粒度上进行加锁。意向锁分为两种:

1.  意向共享锁( IS )：事务有意向对表中的某些行加共享锁
2.  意向排他锁( IX )：事务有意向对表中的某些行加排他锁

由于 InnoDB 存储引擎支持的是行级别的锁，因此意向锁其实不会阻塞除全表扫描以外的任何请求。表级意向锁与行级锁的兼容性如下所示:

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-alemzmjjmysqlsswtd-208eaa9b-5d8e-48c8-a39c-2b4c881ec8f9.jpg)

## 插入意向锁( Insert Intention lock )

插入意向锁是在插入一行记录操作之前设置的一种间隙锁，这个锁释放了一种插入方式的信号，即多个事务在相同的索引间隙插入时如果不是插入间隙中相同的位置就不需要互相等待。假设某列有索引值 2，6，只要两个事务插入位置不同(如事务 A 插入 3，事务 B 插入 4)，那么就可以同时插入。

## 锁模式兼容矩阵

横向是已持有锁，纵向是正在请求的锁：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-alemzmjjmysqlsswtd-a85d87df-ace5-4827-a7c6-ac8c4c38d8fd.jpg)

## 阅读死锁日志

在进行具体案例分析之前，咱们先了解下如何去读懂死锁日志，尽可能地使用死锁日志里面的信息来帮助我们来解决死锁问题。

后面测试用例的数据库场景如下:`MySQL 5.7 事务隔离级别为 RR`。

表结构和数据如下:

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-alemzmjjmysqlsswtd-cb2e7966-e318-4598-8392-0c85f2fb3bf0.jpg)

测试用例如下:

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-alemzmjjmysqlsswtd-abd2fc8c-3a5b-4ecd-a2dd-28167b697465.jpg)

通过执行 `show engine innodb status` 可以查看到最近一次死锁的日志。

## 日志分析如下:

1.  `(1) TRANSACTION: TRANSACTION 2322, ACTIVE 6 sec starting index read`

事务号为 2322，活跃 6 秒，starting index read 表示事务状态为根据索引读取数据。常见的其他状态有:

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-alemzmjjmysqlsswtd-81e70574-3fb0-4066-97fa-c1e48fc136c7.jpg)

`mysql tables in use 1` 说明当前的事务使用一个表。

`locked 1` 表示表上有一个表锁，对于 DML 语句为 LOCK_IX

```
LOCK WAIT 2 lock struct(s), heap size 1136, 1 row lock(s)
```

`LOCK WAIT` 表示正在等待锁，`2 lock struct(s)` 表示 trx->trx_locks 锁链表的长度为 2，每个链表节点代表该事务持有的一个锁结构，包括表锁，记录锁以及自增锁等。本用例中 2locks 表示 IX 锁和 lock_mode X (Next-key lock)

`1 row lock(s)` 表示当前事务持有的行记录锁/ gap 锁的个数。

```
MySQL thread id 37, OS thread handle 140445500716800, query id 1234 127.0.0.1 root updating
```

`MySQL thread id 37` 表示执行该事务的线程 ID 为 37 (即 show processlist; 展示的 ID )

`delete from student where stuno=5` 表示事务 1 正在执行的 sql，比较难受的事情是 `show engine innodb status` 是查看不到完整的 sql 的，通常显示当前正在等待锁的 sql。

```
(1) WAITING FOR THIS LOCK TO BE GRANTED:

RECORD LOCKS space id 11 page no 5 n bits 72 index idx_stuno of table cw.student trx id 2322 lock_mode X waiting
```

RECORD LOCKS 表示记录锁， 此条内容表示事务 1 正在等待表 student 上的 idx_stuno 的 X 锁，本案例中其实是 Next-Key Lock 。

事务 2 的 log 和上面分析类似:

2.  `(2) HOLDS THE LOCK(S):`

```
RECORD LOCKS space id 11 page no 5 n bits 72 index idx_stuno of table cw. student trx id 2321 lock_mode X
```

显示事务 2 的 `insert into student(stuno,score) values(2,10)` 持有了 a=5 的 `Lock mode X | LOCK_gap`，不过我们从日志里面看不到事务 2 执行的 `delete from student where stuno=5;`

这点也是造成 DBA 仅仅根据日志难以分析死锁的问题的根本原因。

3.  `(2) WAITING FOR THIS LOCK TO BE GRANTED:`

```
RECORD LOCKS space id 11 page no 5 n bits 72 index idx_stuno of table cw\***\*.\*\***student trx id 2321 lock_mode X locks gap before rec insert intention waiting
```

表示事务 2 的 insert 语句正在等待插入意向锁 `lock_mode X locks gap before rec insert intention waiting ( LOCK_X + LOCK_REC_gap )`

## 经典案例分析

## 案例一:事务并发 insert 唯一键冲突

表结构和数据如下所示:

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-alemzmjjmysqlsswtd-cd2175f3-5ed0-406a-97c8-e328b42fa9f3.jpg)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-alemzmjjmysqlsswtd-54eda565-e156-445a-8577-7c7e5dac4cdc.jpg)

测试用例如下:

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-alemzmjjmysqlsswtd-1cad4c4e-ff19-4bea-b4ba-0e83ff206d6a.jpg)

日志分析如下:

1.  事务 T2 `insert into t7(id,a) values (26,10)` 语句 insert 成功，持有 a=10 的 `排他行锁( Xlocks rec but no gap )`
2.  事务 T1 `insert into t7(id,a) values (30,10)`, 因为 T2 的第一条 insert 已经插入 a=10 的记录,事务 T1 insert a=10 则发生唯一键冲突,需要申请对冲突的唯一索引加上 S Next-key Lock( 即 lock mode S waiting ) 这是一个`间隙锁`会申请锁住(,10\],(10,20\]之间的 gap 区域。
3.  事务 T2 `insert into t7(id,a) values (40，9)`该语句插入的 a=9 的值在事务 T1 申请的 `gap 锁4-10之间`， 故需事务 T2 的第二条 insert 语句要等待事务 T1 的 `S-Next-key Lock 锁`释放,在日志中显示 `lock_mode X locks gap before rec insert intention waiting` 。

## 案例二:先 update 再 insert 的并发死锁问题

表结构如下，无数据:

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-alemzmjjmysqlsswtd-2fb97adc-0ccc-4111-9f24-548b5640b418.jpg)

测试用例如下:

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-alemzmjjmysqlsswtd-e79b54b9-f67c-4391-aa89-43463987529a.jpg)

死锁分析:

可以看到两个事务 update 不存在的记录，先后获得`间隙锁( gap 锁)`，gap 锁之间是兼容的所以在 update 环节不会阻塞。两者都持有 gap 锁，然后去竞争插入`意向锁`。当存在其他会话持有 gap 锁的时候，当前会话申请不了插入意向锁，导致死锁。

## 如何尽可能避免死锁

1.  合理的设计索引，区分度高的列放到组合索引前面，使业务 SQL 尽可能通过索引`定位更少的行，减少锁竞争`。
2.  调整业务逻辑 SQL 执行顺序， 避免 update/delete 长时间持有锁的 SQL 在事务前面。
3.  避免`大事务`，尽量将大事务拆成多个小事务来处理，小事务发生锁冲突的几率也更小。
4.  以`固定的顺序`访问表和行。比如两个更新数据的事务，事务 A 更新数据的顺序为 1，2;事务 B 更新数据的顺序为 2，1。这样可能会造成死锁。
5.  在并发比较高的系统中，不要显式加锁，特别是是在事务里显式加锁。如 `select … for update` 语句，如果是在事务里`（运行了 start transaction 或设置了autocommit 等于0）`,那么就会锁定所查找到的记录。
6.  尽量按`主键/索引`去查找记录，范围查找增加了锁冲突的可能性，也不要利用数据库做一些额外额度计算工作。比如有的程序会用到 “`select … where … order by rand();`”这样的语句，由于类似这样的语句用不到索引，因此将导致整个表的数据都被锁住。
7.  优化 SQL 和表设计，减少同时占用太多资源的情况。比如说，`减少连接的表`，将复杂 SQL `分解`为多个简单的 SQL。

以上，希望能给球友们一些帮助。

> 参考链接：[https://mp.weixin.qq.com/s?\_\_biz=MzAwMDg2OTAxNg==&mid=2652056181&idx=1&sn=ef983612c4323bbd94929886ff564be6&chksm=8105dd82b67254945335a88cbfdab0a593f40a35ed333c8aa790a0af2b338fa5edbce78a4c00#rd](https://mp.weixin.qq.com/s?__biz=MzAwMDg2OTAxNg==&mid=2652056181&idx=1&sn=ef983612c4323bbd94929886ff564be6&chksm=8105dd82b67254945335a88cbfdab0a593f40a35ed333c8aa790a0af2b338fa5edbce78a4c00#rd)
