---
title: 从根上理解 MySQL 的事务 | MySQL 技术论坛
shortTitle: 从根上理解 MySQL 事务
description: 事务的概念 MySQL事务是一个或者多个的数据库操作，要么全部执行成功，要么全部失败回滚。 事务是通过事务日志来实现的，事务日志包括：redo log和undo log。 事务的状态 活动的（active） 事务对应的数据库操作正在...
category:
  - MySQL
tag:
  - MySQL
head:
  - - meta
    - name: keywords
      content: mysql,MySQL,MySQL论坛,MySQL社区,MySQL开发者,MySQL教程,MySQL入门,MySQL职位,MySQL工作,MySQL视频,MySQL开源,MySQL新手

---


## 事务的概念

> MySQL事务是一个或者多个的数据库操作，要么全部执行成功，要么全部失败回滚。
> 
> 事务是通过事务日志来实现的，事务日志包括：redo log和undo log。

## 事务的状态

#### 活动的（active）

> 事务对应的数据库操作正在执行过程中时，我们就说该事务处在活动的状态。

#### 部分提交的（partially committed）

> 当事务中的最后一个操作执行完成，但由于操作都在内存中执行，所造成的影响并没有刷新到磁盘时，我们就说该事务处在部分提交的状态。

#### 失败的（failed）

> 当事务处在活动的或者部分提交的状态时，可能遇到了某些错误（数据库自身的错误、操作系统错误或者直接断电等）而无法继续执行，或者人为的停止当前事务的执行，我们就说该事务处在失败的状态。

#### 中止的（aborted）

> 如果事务执行了半截而变为失败的状态，撤销失败事务对当前数据库造成的影响，我们把这个撤销的过程称之为回滚。
> 
> 当回滚操作执行完毕时，也就是数据库恢复到了执行事务之前的状态，我们就说该事务处在了中止的状态。

#### 提交的（committed）

> 当一个处在部分提交的状态的事务将修改过的数据都同步到磁盘上之后，我们就可以说该事务处在了提交的状态。

![从根上理解MySQL的事务](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mysql/lijie-shiwu-1689cc94-9c1b-45a2-a132-0815dcc8e3d4.png)

> 从图中大家也可以看出了，只有当事务处于提交的或者中止的状态时，一个事务的生命周期才算是结束了。对于已经提交的事务来说，该事务对数据库所做的修改将永久生效，对于处于中止状态的事务，该事务对数据库所做的所有修改都会被回滚到没执行该事务之前的状态。

## 事务的作用

> 事务主要是为了保证复杂数据库操作数据的一致性，尤其是在并发访问数据时。
> 
> MySQL 事务主要用于处理操作量大，复杂度高的数据。

## 事务的特点

#### 原子性（Atomicity，又称不可分割性）

> 事务的数据操作，要么全部执行成功，要么全部失败回滚到执行之前的状态，就像这个事务从来没有执行过一样。

#### 隔离性（Isolation，又称独立性）

> 多个事务之间是相互隔离，互不影响的。数据库允许多个并发事务同时对其数据进行读写和修改的能力，隔离性可以防止多个事务并发执行时由于交叉执行而导致数据的不一致。

```
四种隔离状态：
1. 读未提交（Read uncommitted）
2. 读提交（Read committed）
3. 可重复读（Repeatable read）
4. 串行化（Serializable）
```

#### 一致性（Consistency）

> 在事务操作之前和之后，数据都是保持一个相同的状态，数据库的完整性没有被破坏。
> 
> 原子性和隔离性，对一致性有着至关重要的影响。

#### 持久性（Durability）

> 当事务操作完成后，数据会被刷新到磁盘永久保存，即便是系统故障也不会丢失。

## 事务的语法

#### 数据

```
创建数据表：
create table account(
    -> id int(10) auto_increment,
    -> name varchar(30),
    -> balance int(10),
    -> primary key (id));
插入数据：
insert into account(name,balance) values('老王媳妇',100),('老王',10);
```

```
mysql> select * from account;
+----+--------------+---------+
| id | name         | balance |
+----+--------------+---------+
|  1 | 老王媳妇 |     100    |
|  2 | 老王        |      10 |
+----+--------------+---------+
```

> 老王媳妇有100元存在自己的微信账户上了，专门给老王每个月发零花钱用的，表现好给的多，老王也有自己的小金库，目前已经攒到了10元零花钱了，哈哈哈。

#### begin

> 事务启动方式1

```
mysql> begin;
Query OK, 0 rows affected (0.00 sec)
mysql> 事务操作SQL......
```

#### start transaction \[修饰符\]

```
修饰符：
1. read only //只读
2. read write //读写 默认
3. WITH CONSISTENT SNAPSHOT //一致性读
```

> 事务启动方式2

```
mysql> start transaction read only;
Query OK, 0 rows affected (0.00 sec)
mysql> 事务操作SQL......
```

```
如设置read only后，对数据进行修改会报错：

mysql> start transaction read only;
Query OK, 0 rows affected (0.00 sec)

mysql> update account set balance=banlance+30 where id = 2;
ERROR 1792 (25006): Cannot execute statement in a READ ONLY transaction.
```

#### commit

> 事务执行提交，提交成功则刷新到磁盘

```
mysql> commit;
Query OK, 0 rows affected (0.00 sec)
```

#### rollback

> 事务执行回滚，回到事务操作之前的状态。

```
mysql> rollback;
Query OK, 0 rows affected (0.00 sec)
```

> 这里需要强调一下，ROLLBACK语句是我们程序员手动的去回滚事务时才去使用的，如果事务在执行过程中遇到了某些错误而无法继续执行的话，事务自身会自动的回滚。

#### 完整的提交例子

> 1月份，老王的表现很不错，老王媳妇给他奖励20元零花钱。

```
执行步骤：
1. 从老王媳妇账户读取数据
2. 从老王媳妇账户上减掉20元
3. 从老王账户读取数据
4. 给老王账户增加20元
5. 执行提交成功
6. 此时老王媳妇账户只有80元啦，而老王账户有30元啦，老王高兴不得了咯
```

```
mysql> begin;
Query OK, 0 rows affected (0.01 sec)

mysql> update account set balance=balance-20 where id = 1;
Query OK, 1 row affected (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update account set balance=balance+20 where id = 2;
Query OK, 1 row affected (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> commit;
Query OK, 0 rows affected (0.01 sec)
```

```
账户余额：
mysql> select * from account;
+----+--------------+---------+
| id | name  | balance |
+----+--------------+---------+
| 1 | 老王媳妇 | 80 |
| 2 | 老王  | 30 |
+----+--------------+---------+
```

#### 完整的回滚例子

> 2月份，老王本来表现得很棒，坚持干家务活和遛狗，老王媳妇要给他25元的零花钱，可老王不经夸啊，老王媳妇正在给老王转零花钱时，突然看到桌子上老王手机收到一条小女生发来的微信：亲爱的王哥....，老王媳妇特别生气，一怒之下撤回了转账，取消这个月的零花钱。

```
执行步骤：
1. 从老王媳妇账户读取数据
2. 从老王媳妇账户上减掉25元
3. 从老王账户读取数据
4. 给老王账户增加25元
5. 此时老王媳妇撤回之前的操作
6. 此时，老王和老王媳妇的账户余额还是保持操作之前的数目
```

```
mysql> begin;
Query OK, 0 rows affected (0.00 sec)

mysql> update account set balance=balance-25 where id = 1;
Query OK, 1 row affected (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update account set balance=balance+25 where id = 2;
Query OK, 1 row affected (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> rollback;
Query OK, 0 rows affected (0.00 sec)
```

```
账户余额：
mysql> select * from account;
+----+--------------+---------+
| id | name         | balance |
+----+--------------+---------+
|  1 | 老王媳妇 |      80 |
|  2 | 老王       |      30 |
+----+--------------+---------+
```

## 事务支持的存储引擎

```
1. InnoDB
2. NDB
```

> 不支持的存储引擎，比如在MyISAM上操作事务，事务不会生效，SQL语句直接自动执行提交，所以回滚对于不支持事务的存储引擎是无效的。

```
create table tb1(
    -> id int(10) auto_increment,
    -> name varchar(30),
    -> primary key (id)
    -> )engine=myisam charset=utf8mb4;

mysql> begin;
Query OK, 0 rows affected (0.00 sec)

mysql> insert into tb1(name) values('Tom');
Query OK, 1 row affected (0.01 sec)

mysql> select * from tb1;
+----+------+
| id | name |
+----+------+
| 1 | Tom |
+----+------+
1 row in set (0.00 sec)

mysql> rollback;//回滚无效
Query OK, 0 rows affected, 1 warning (0.00 sec)

mysql> select * from tb1;
+----+------+
| id | name |
+----+------+
| 1 | Tom |
+----+------+
1 row in set (0.00 sec)
```

## 事务的设置与查看

```
查看事务开启情况：
mysql> SHOW VARIABLES LIKE 'autocommit';
+---------------+-------+
| Variable_name | Value |
+---------------+-------+
| autocommit | ON |
+---------------+-------+
```

> 默认是事务自动提交的，每执行一条SQL就自动提交。
> 
> 此时需要操作事务，则需要显式开启（begin or start transaction）和提交（commit）或回滚（rollback）。
> 
> 如设置成OFF，则需要执行提交（commit）或回滚（rollback）操作时才会真正执行事务。

#### 关闭自动提交方式

##### 第一种

> 显式的的使用START TRANSACTION或者BEGIN语句开启一个事务。

##### 第二种

> 把系统变量autocommit的值设置为OFF。

```
SET autocommit = OFF;
```

#### 隐式提交情况

> 当我们使用START TRANSACTION或者BEGIN语句开启了一个事务，或者把系统变量autocommit的值设置为OFF时，事务就不会进行自动提交，但是如果我们输入了某些语句之后就会悄悄的提交掉，就像我们输入了COMMIT语句了一样，这种因为某些特殊的语句而导致事务提交的情况称为隐式提交

##### 定义或修改数据库对象的数据定义语言（Data definition language，缩写为：DDL）

> 所谓的数据库对象，指的就是数据库、表、视图、存储过程等等这些东西。当我们使用CREATE、ALTER、DROP等语句去修改这些所谓的数据库对象时，就会隐式的提交前边语句所属于的事务。

```
BEGIN;
SELECT ... # 事务中的一条语句
UPDATE ... # 事务中的一条语句
... # 事务中的其它语句
CREATE TABLE ... # 此语句会隐式的提交前边语句所属于的事务
```

##### 隐式使用或修改mysql数据库中的表

> 隐式使用或修改mysql数据库中的表。
> 
> 当我们使用ALTER USER、CREATE USER、DROP USER、GRANT、RENAME USER、REVOKE、SET PASSWORD等语句时也会隐式的提交前边语句所属于的事务。

##### 事务控制或关于锁定的语句

> 事务控制或关于锁定的语句。
> 
> 当我们在一个事务还没提交或者回滚时就又使用START TRANSACTION或者BEGIN语句开启了另一个事务时，会隐式的提交上一个事务。

```
BEGIN;
SELECT ... # 事务中的一条语句
UPDATE ... # 事务中的一条语句
... # 事务中的其它语句
BEGIN; # 此语句会隐式的提交前边语句所属于的事务
```

> 或者当前的autocommit系统变量的值为OFF，我们手动把它调为ON时，也会隐式的提交前边语句所属的事务。
> 
> 或者使用LOCK TABLES、UNLOCK TABLES等关于锁定的语句也会隐式的提交前边语句所属的事务。

##### 加载数据的语句

> 比如我们使用LOAD DATA语句来批量往数据库中导入数据时，也会隐式的提交前边语句所属的事务。

##### 关于MySQL复制的一些语句

> 使用START SLAVE、STOP SLAVE、RESET SLAVE、CHANGE MASTER TO等语句时也会隐式的提交前边语句所属的事务。

##### 其它的一些语句

> 使用ANALYZE TABLE、CACHE INDEX、CHECK TABLE、FLUSH、 LOAD INDEX INTO CACHE、OPTIMIZE TABLE、REPAIR TABLE、RESET等语句也会隐式的提交前边语句所属的事务。

## 事务的保存点

#### 概念

> 在事务对应的数据库语句中打几个点，我们在调用ROLLBACK语句时可以指定会滚到哪个点，而不是回到最初的原点。
> 
> 有了事务的保存点，我们在进行复杂的事务操作时，我们不用担心一出错直接回滚到最初状态，就如一夜回到解放前。

#### 使用语法

```
1. SAVEPOINT 保存点名称;//标记保存点
2. ROLLBACK TO [SAVEPOINT] 保存点名称;//回滚到某一个保存点
3. RELEASE SAVEPOINT 保存点名称;//删除
```

```
mysql> begin;
Query OK, 0 rows affected (0.00 sec)

mysql> update account set balance=balance-20 where id = 1;
Query OK, 1 row affected (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> savepoint action1;
Query OK, 0 rows affected (0.02 sec)

mysql> select * from account;
+----+--------------+---------+
| id | name         | balance |
+----+--------------+---------+
|  1 | 老王媳妇 |      60 |
|  2 | 老王       |      30 |
+----+--------------+---------+

mysql> update account set balance=balance+30 where id = 2;
Query OK, 1 row affected (0.01 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> rollback to action1;//回滚到action1保存点
Query OK, 0 rows affected (0.00 sec)

mysql> select * from account;
+----+--------------+---------+
| id | name         | balance |
+----+--------------+---------+
|  1 | 老王媳妇 |      60 |
|  2 | 老王       |      30 |
+----+--------------+---------+
```

> 参考：[掘金小册《MySQL 是怎样运行的：从根儿上理解 MySQL》](https://juejin.im/book/5bffcbc9f265da614b11b731)
> 
> 书籍《MySQL高性能》

[mysql](https://learnku.com/blog/zhangdeTalk/tags/mysql_487)


>参考链接：[https://learnku.com/articles/39938](https://learnku.com/articles/39938)，整理：沉默王二
