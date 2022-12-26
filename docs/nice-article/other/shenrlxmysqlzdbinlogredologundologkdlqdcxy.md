---
title: MySQL的bin log、redo log、undo log 到底有什么区别？
shortTitle: bin log、redo log、undo log
description: bin log：使用场景、主从复制流程、如何恢复被删数据、如何正确删除bin log日志。redo log：原理、mysql如何进行异常崩溃数据恢复、自定义日志刷入时机。undo log：作用、工作机制以及原理。
tag:
  - 优质文章
category:
  - 其他网站
head:
  - - meta
    - name: keywords
      content: bin log,redo log,undo log,主从备份,myql,事务回滚,MVCC,会打篮球的程序猿
---

球友们好，本来打算自己写一篇 MySQL 的 bin log、redo log、undo log 的，结果看到一篇读者的文章，写得已经非常好了，这里就直接先分享给大家吧。后面写MySQL 专栏的时候再自己重写一版。

日志是 mysql 数据库的重要组成部分，记录着数据库运行期间各种状态信息。 MySQL 日志主要包括错误日志、查询日志、慢查询日志、事务日志、二进制日志几大类。作为开发，我们重点需要关注的是二进制日志( binlog )和事务日志(包括 redo log 和 undo log )。

## bin log（二进制日志）

### 什么是bin log？

> 记录数据库执行的写入性操作信息，以二进制的形式保存在磁盘中。
> 
> 由服务层产生，所有储存引擎都支持。
> 
> bin log属于逻辑日志。

bin log日志有三种格式：STATMENT、ROW、MIXED。MySQL5.7.7之后默认是ROW。

简单普及一下逻辑日志和物理日志：

*   逻辑日志：记录的sql语句。
*   物理日志：记录的数据页变更。

### bin log的使用场景？

*   主从复制：在`master`端开启bin log，然后`master`将bin log发送到每个`slave`端，`slave`端重放bin log从而达到主从数据一致。

简单画个图来理解一下MySQL的主从复制流程：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/other-shenrlxmysqlzdbinlogredologundologkdlqdcxy-7ed47c4c-8ce7-4f66-8121-6f2f12f9622f.png)

1.  master在准备提交事务之前，将变更记录到bin log中。
2.  slave启动一个IO线程来读取bin log中的事件，并记录到自己的ready log（中继日志）中。
3.  同时slave还会启动一个SQL线程，读取ready log中的事件在备库中执行，从而实现备库的数据更新。
*   数据恢复：通过使用`mysqlbinlog`工具来恢复数据。
*   增量备份

### 如何开启bin log？

```mysql
# 查看是否开启bin log，这里可以看到没有开启
mysql> show variables like '%log_bin%';
+---------------------------------+-------+
| Variable_name                   | Value |
+---------------------------------+-------+
| log_bin                         | OFF   |
| log_bin_basename                |       |
| log_bin_index                   |       |
| log_bin_trust_function_creators | OFF   |
| log_bin_use_v1_row_events       | OFF   |
| sql_log_bin                     | ON    |
+---------------------------------+-------+
6 rows in set (0.05 sec)

# 查看当前MySQL版本
mysql> select version();
+-----------+
| version() |
+-----------+
| 5.7.36    |
+-----------+
1 row in set (0.20 sec)

# 确认已开启bin log
mysql> show variables like '%log_bin%';
+---------------------------------+-----------------------------+
| Variable_name                   | Value                       |
+---------------------------------+-----------------------------+
| log_bin                         | ON                          |
| log_bin_basename                | /var/lib/mysql/binlog       |
| log_bin_index                   | /var/lib/mysql/binlog.index |
| log_bin_trust_function_creators | OFF                         |
| log_bin_use_v1_row_events       | OFF                         |
| sql_log_bin                     | ON                          |
+---------------------------------+-----------------------------+
6 rows in set (0.03 sec)
```
 

如果没有开启，编辑`/etc/my.cnf`文件，添加以下配置：

```mysql
# 开启bin log日志
log-bin=binlog
# 配置server-id
server-id=1
```
 

### 如何查看以及修改每个bin log文件大小最大值？

查看本机的bin log文件大小最大值，可以看到是1073741824字节，也就是1G。

```shell
mysql> show variables like 'max_binlog_size';
+-----------------+------------+
| Variable_name   | Value      |
+-----------------+------------+
| max_binlog_size | 1073741824 |
+-----------------+------------+
1 row in set (0.00 sec)
```
 

添加或修改MySQL的`my.cnf`文件：

```shell
max_binlog_size=2G
```
 

### 如何使用bin log恢复数据？

查看 bin log：

```mysql
# 查看当前bin log位置
mysql> show master status;
 # 也可以刷新日志，方便后面筛选
mysql> flush logs;
 # 查看二进制日志列表
mysql> show binary logs;
```
 

bin log恢复数据：

```shell
# 根据事件位置恢复（--start-position是开始位置，--stop-position是结束位置）
mysqlbinlog --start-position=16275 --stop-position=16566 --database=just-test /var/lib/mysql/binlog.000004 | mysql -uroot -p123456
# 根据指定时间恢复（--start-datetime是开始时间，--stop-datetime是结束时间）
mysqlbinlog --start-datetime="2022-02-17 12:00:00" --stop-datetime="2022-02-17 18:00:00" --database=just-test /var/lib/mysql/binlog.000004 | mysql -uroot -p123456

# --database是指定只恢复just-test数据库，/var/lib/mysql/binlog.000004是binlog日志文件路径
```
 

bin log日志解码以及导出到服务器中：

```shell
mysqlbinlog -vvv --base64-output=decode-rows --start-position=154 --stop-position=2150 --database=just-test /var/lib/mysql/binlog.000001 > /just-test.sql | mysql -uroot -p123456 -f
```
 

`-vvv`：显示出执行的SQL以及binlog\_rows\_query\_log\_events参数。

`--base64-output=decode-rows`：如果bin log为row格式必须使用该选项对日志进行解析，恢复数据时不能加该选项。

简单演示一下如何恢复被删掉的数据：

```mysql
# 快速创建一个极其简单的数据表来用于测试
mysql> CREATE TABLE `quick-test-data` (
  `id` bigint(20) DEFAULT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

# 分别插入小明和小花两条数据
mysql> INSERT INTO `quick-test-data` (`id`, `name`) VALUES (1, '小明');
mysql> INSERT INTO `quick-test-data` (`id`, `name`) VALUES (2, '小花');
mysql> INSERT * FROM `quick-test-data`;
+------+--------+
| id   | name   |
+------+--------+
|    1 | 小明   |
|    2 | 小花   |
+------+--------+

# 删掉小花
mysql> DELETE FROM `quick-test-data` WHERE `id` = 2
mysql> INSERT * FROM `quick-test-data`;
+------+--------+
| id   | name   |
+------+--------+
|    1 | 小明   |
+------+--------+

# 查看bin log日志，确定从哪里开始恢复（数据比较多，我在此抽取一部分，binlog.000004是刷新几次之后的日志文件，根据自己实际情况来）
mysql> show binlog events in 'binlog.000004';
+---------------+-------+----------------+-----------+-------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Log_name      | Pos   | Event_type     | Server_id | End_log_pos | Info                                                                                                                                                                                                                     |
+---------------+-------+----------------+-----------+-------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| binlog.000004 | 15636 | Anonymous_Gtid |         1 |       15701 | SET @@SESSION.GTID_NEXT= 'ANONYMOUS'                                                                                                                                                                                     |
| binlog.000004 | 15701 | Query          |         1 |       15984 | use `just-test`; CREATE TABLE `just-test`.`quick-test-data`  (
  `id` bigint NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL
) CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci |
| binlog.000004 | 15984 | Anonymous_Gtid |         1 |       16049 | SET @@SESSION.GTID_NEXT= 'ANONYMOUS'                                                                                                                                                                                     |
| binlog.000004 | 16049 | Query          |         1 |       16126 | BEGIN                                                                                                                                                                                                                    |
| binlog.000004 | 16126 | Table_map      |         1 |       16192 | table_id: 116 (just-test.quick-test-data)                                                                                                                                                                                |
| binlog.000004 | 16192 | Write_rows     |         1 |       16244 | table_id: 116 flags: STMT_END_F                                                                                                                                                                                          |
| binlog.000004 | 16244 | Xid            |         1 |       16275 | COMMIT /* xid=1088 */                                                                                                                                                                                                    |
| binlog.000004 | 16275 | Anonymous_Gtid |         1 |       16340 | SET @@SESSION.GTID_NEXT= 'ANONYMOUS'                                                                                                                                                                                     |
| binlog.000004 | 16340 | Query          |         1 |       16417 | BEGIN                                                                                                                                                                                                                    |
| binlog.000004 | 16417 | Table_map      |         1 |       16483 | table_id: 116 (just-test.quick-test-data)                                                                                                                                                                                |
| binlog.000004 | 16483 | Write_rows     |         1 |       16535 | table_id: 116 flags: STMT_END_F                                                                                                                                                                                          |
| binlog.000004 | 16535 | Xid            |         1 |       16566 | COMMIT /* xid=1091 */                                                                                                                                                                                                    |
| binlog.000004 | 16566 | Anonymous_Gtid |         1 |       16631 | SET @@SESSION.GTID_NEXT= 'ANONYMOUS'                                                                                                                                                                                     |
| binlog.000004 | 16631 | Query          |         1 |       16708 | BEGIN                                                                                                                                                                                                                    |
| binlog.000004 | 16708 | Table_map      |         1 |       16774 | table_id: 116 (just-test.quick-test-data)                                                                                                                                                                                |
| binlog.000004 | 16774 | Delete_rows    |         1 |       16826 | table_id: 116 flags: STMT_END_F                                                                                                                                                                                          |
| binlog.000004 | 16826 | Xid            |         1 |       16857 | COMMIT /* xid=1094 */                                                                                                                                                                                                    |
+---------------+-------+----------------+-----------+-------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

### 分析此处的bin log日志 ###
# 15701~15984：建表quick-test-data
# 15984~16275：插入第一条数据，即小明
# 16275~16566：插入第二条数据，即小花
# 16566~16857：删除小花
## 所以，因为数据表和小明都是存在的，所以，我们的start-position应该是16275，stop-position应该是16566
## 16566~16857这里是删除小花的，所以，这个部分不能被包括进来，不然恢复之后又被删除掉了

# 使用mysqlbinlog工具恢复被删除的小花数据
# 在Linux命令行执行（注意不是在mysql命令行）
[root@lzhpo-light ~]# mysqlbinlog --start-position=16275 --stop-position=16566 --database=just-test /var/lib/mysql/binlog.000004 | mysql -uroot -p123456

# 恢复之后的数据表
mysql> select * from `quick-test-data`;
+------+--------+
| id   | name   |
+------+--------+
|    1 | 小明   |
|    2 | 小花   |
+------+--------+
```
 

### 如何正确删除bin log日志?

*   `reset master`命令：虽然可以清空所有bin log文件，但是会导致从库异常，主从架构下无法使用。
*   `expire_logs_days`变量：通过该变量可以指定自动删除日期，如果日志过多，在删除时会有IO过高问题，可能导致性能抖动。
*   `purge`命令：推荐方法，可以快速删除指定bin log。

```mysql
# 删除bin log到指定的文件为止
mysql> PURGE MASTER LOGS TO 'binlog.000004'
 # 删除指定日期之前的文件
mysql> PURGE MASTER LOGS BEFORE '2022-02-18 18:30:00'
```
 

## redo log（重做日志）

### 什么是redo log？

> 简单一句话：**redo log就是记录数据页的变更**。
> 
> redo log由InnoDB的存储引擎层产生，是InnoDB 存储引擎特有的。
> 
> redo log属于物理日志，因为，它记录的是数据页的变更。

因为，这种改变记录不是说一定要全部保存下来，所以，redo log采用的是大小固定，循环写入的方式，当从开头开始写到结尾的时候，又会回到开头继续写日志。

### redo log记录日志的方式（原理）？

*emm…图丑，但能帮助理解就好。*

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/other-shenrlxmysqlzdbinlogredologundologkdlqdcxy-7c27e1cc-8336-42f1-9fa4-f65062550074.png)

InnoDB的redo log文件大小是固定的，假设我这里redo log大小为4G，并且我划分为4个部分，redo log就会从`ib_logfile_0`开始写`ib_logfile_1`、`ib_logfile_2`、`ib_logfile_3`，直到4个部分都写满为止，再重新回到第一个部分`ib_logfile_0`开始写。

`write position`：当前记录的LSN（Log Sequence Number，日志序列号）位置。一边写，一边顺时针移动（向前移动）。

`check point`：当前数据页更改记录刷盘之后所处的LSN（Log Sequence Number，日志序列号）位置。一边写，一边顺时针移动（向前移动）。

`check point`到`write position`部分就是待落盘的数据页更改记录。

`write position`到`check point`部分就是redo log空闲的部分，用来记录新的操作日志。

当`write position`追上`check point`的时候，会先推动`check point`顺时针移动（向前移动），等到有空闲的redo log位置的时候再记录新的操作日志。

### redo log如何进行异常崩溃数据恢复的？

每当启动InnoDB的时候，不管上次是正常关闭还是异常关闭，都会进行恢复操作。

因为`redo log`记录的是数据页的物理变化，因此恢复的时候速度比逻辑日志(如`bin log`)要快很多。

在此，我画一个简单的流程图方便理解

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/other-shenrlxmysqlzdbinlogredologundologkdlqdcxy-7a574353-5f48-4b4d-907b-f5415583ca5a.png)

**还有一种比较特殊的情况，数据页LSN也会大于日志LSN：**

当宕机的时候，正在处理`check point`刷盘过程，且数据页的刷盘进度超过了日志页的刷盘进度，此时，也会出现数据页LSN也会大于日志LSN的情况。

这种情况的话，数据页剩下的这点redo log日志将不会重做，会正常启动。

### 如何查看以及修改redo log的大小？

```mysql
mysql> show variables like 'innodb_log%';
+------------------------------------+----------+
| Variable_name                      | Value    |
+------------------------------------+----------+
| innodb_log_buffer_size             | 16777216 |
| innodb_log_checksums               | ON       |
| innodb_log_compressed_pages        | ON       |
| innodb_log_file_size               | 50331648 |
| innodb_log_files_in_group          | 2        |
| innodb_log_group_home_dir          | ./       |
| innodb_log_spin_cpu_abs_lwm        | 80       |
| innodb_log_spin_cpu_pct_hwm        | 50       |
| innodb_log_wait_for_flush_spin_hwm | 400      |
| innodb_log_write_ahead_size        | 8192     |
| innodb_log_writer_threads          | ON       |
+------------------------------------+----------+
11 rows in set (0.00 sec)
```
 

`innodb_log_file_size`就是redo log文件大小，50331648字节，也就是48MB。

要修改的话，打开MySQL的`my.cnf`文件，添加或编辑配置，比如，我修改为1G：

```shell
innodb_log_file_size=1G
```
 

### 如何自定义在事务提交的时候将log buffer中的日志刷入log file中的时机？

可以通过配置`innodb_flush_log_at_trx_commit`参数来更改刷入时机。

查看当前MySQL的配置时机：

```mysql
mysql> show variables like 'innodb_flush_log_at_trx_commit';
+--------------------------------+-------+
| Variable_name                  | Value |
+--------------------------------+-------+
| innodb_flush_log_at_trx_commit | 1     |
+--------------------------------+-------+
1 row in set (0.00 sec)
```
 

参数值解释：

*   0：延迟写，延迟刷。

事务提交的的时候不会将`redo log buffer`中的日志写入到`os buffer`，而是每秒写入`os buffer`并调用`fsync()`写入到`redo log file`中。

这样子可能会导致，当系统崩溃，可能丢失1秒的数据。
*   1：实时写，实时刷。

事务每次提交都会将`redo log buffer`中的日志写入`os buffer`并调用`fsync()`刷到`redo log file`中。

这种方式即使系统崩溃也不会丢失任何数据，但是因为每次提交都写入磁盘，IO的性能较差。
*   2：实时写，延迟刷。

事务每次提交都仅写入到`os buffer`，然后是每秒调用`fsync()`将`os buffer`中的日志写入到`redo log file`。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/other-shenrlxmysqlzdbinlogredologundologkdlqdcxy-a079ed69-cb61-4221-be23-4c6c613308c2.png)

## undo log（回滚日志）

### 什么是undo log？

> MySQL（存储引擎需要能支持事务）在修改记录之前（提交事务之前），会把原先记录的值先保存起来（也就是写入到undo log），然后再修改（提交事务），当出问题的时候MySQL可以利用undo log来回滚事务，即恢复原先的记录值。
> 
> undo log由InnoDB的存储引擎层产生，是InnoDB 存储引擎特有的（和redo log一样）。
> 
> undo log属于逻辑日志。

MySQL的事务四大特性：原子性、隔离性、持久性、一致性。其中，原子性的底层就是靠undo log实现的。

### undo log的作用？

#### 1.事务回滚

前面我们说到，当出问题需要回滚事务的时候，可以利用MySQL的undo log来回滚事务，以保证事务的一致性。

比如：执行一条delete语句:

```mysql
DELETE FROM sys_log WHERE id = 1;
```
 

undo log就会记录一条与它相反的日志，即记录它的insert语句。

update语句也是同理，记录与它相反的update语句。

执行一条update语句：

```mysql
# 假设，之前username是小花
UPDATE sys_user SET username = '小明' WHERE id = 1;
```
 

undo log就会记录与它相反的update语句：

```mysql
UPDATE sys_user SET username = '小花' WHERE id = 1;
```
 

#### 2.多版本控制（MVCC）

> MVCC全称即Multi-Version Concurrency Control。

在MySQL的InnoDB存储引擎中，就是用undo log来实现MVCC的。

举个例子，当我们读取的某一行被其它事务锁定的时候，InnoDB可以从undo log中分析出该记录历史版本的数据，从而让我们可以读取到当前事务操作之前的数据（也就是快照读）。

普及一下快照读和当前读：

*   快照读：读取的历史版本数据，不会加锁。

普通的select就是快照读。
*   当前读：读取的是最新版本, 会对读取的记录加锁, 以保证其它事务无法对此记录进行变更，保证安全性。

属于当前读的：update、delete、insert、select … for update、select … lock in share mode（共享读锁）等等。

### undo log的工作机制？

在MySQL的InnoDB存储引擎中，undo log是采用分段（segment）的方式保存的，简单来说，就是一种命名为rollback segment的回滚段，每个回滚段中有1024个undo log segment。

在MySQL5.5之后，能支持128个回滚段，也就是能支持128\*1024个undo log segment，在此之前是只支持1个回滚段，也就是1024个undo log segment。

### undo log工作原理？

在此，简单画一张图来理解一下：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/other-shenrlxmysqlzdbinlogredologundologkdlqdcxy-d20d0db9-54cf-4258-9e3f-56811e52fa5b.png)

1.  事务A提交之前，会备份之前的数据到对应的undo buffer，然后undo log保存之前的记录数据，然后再将最新的数据持久化到ibd文件。
2.  此时事务B查询，直接读取undo buffer缓存，因为这时候事务A还没提交且它需要回滚事务，所以，这时候事务B是不读取磁盘的，是直接从undo buffer缓存中读取。


>参考链接：[http://www.lzhpo.com/article/173](http://www.lzhpo.com/article/173)

