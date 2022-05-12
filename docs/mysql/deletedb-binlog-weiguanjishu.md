大家好，我是二哥呀~我们都知道，数据非常重要。

网上也经常看到一些段子，某公司程序员对工作不满，删库跑路，老板损失惨重，欲哭无泪。这不前几天又爆出一例，**某程序员离职当天删库跑路**！


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mysql/deletedb-binlog-weiguanjishu-1.png)

那么有没有什么解决方案？即使数据库真的被删了，也有备份数据，能快速恢复。甚至可以做到实时热备，即使内部炸掉外部用户也感知不到，一片风平浪静。


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mysql/deletedb-binlog-weiguanjishu-2.png)

MySQL 作为当下流行数据库，在数据备份、高可用方面非常有竞争力，今天，我们就重点聊一聊数据备份的杀手锏 binlog。

### 一、MySQL 主备是什么？


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mysql/deletedb-binlog-weiguanjishu-3.png)

情况一：

- 客户端的业务操作，读、写访问的是主库
- 主库通过某种机制，将数据实时同步给备库
- 主库由于有些原因，无法正常响应客户端的请求

情况二：

- 完成主备切换
- 客户端读写，访问的是备库（此时备库升级为新主库）

那么，这里面最核心的数据同步是如何实现的呢？

### 二、主从同步


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mysql/deletedb-binlog-weiguanjishu-4.png)

1、在备库执行 `change master` 命令 ，绑定主库的信息

```
mysql> CHANGE MASTER TO MASTER_HOST = '192.168.1.1', MASTER_USER = 'repl', MASTER_PASSWORD = 'replpassword', MASTER_PORT = 3306, MASTER_AUTO_POSITION = 1, MASTER_RETRY_COUNT = 0, MASTER_HEARTBEAT_PERIOD = 10000; 
```

简单解释下：

- MASTER_HOST ：master主机名（或IP地址）
- MASTER_PORT ：mysql实例端口号
- MASTER_USER：用户名
- MASTER_PASSWORD：密码
- MASTER_AUTO_POSITION：如果进行change master to时使用MASTER_AUTO_POSITION = 1，slave连接master将使用基于GTID的复制协议
- MASTER_RETRY_COUNT：重连次数
- MASTER_HEARTBEAT_PERIOD：复制心跳的周期

2、备库执行 start slave 命令，备库启动两个线程：I/O thread 和 SQL thread

3、master主库，有数据更新，将此次更新的事件类型写入到主库的 binlog 文件中

4、主库会创建log dump 线程，通知slave有数据更新

5、slave，向master节点的 log dump线程请求一份指定binlog文件位置的副本，并将请求回来的binlog存到本地的Relay log 中继日志中

6、slave 再开启一个SQL 线程读取Relay log日志，解析出日志里的命令，并执行，从而保证主备库数据同步



### 三、开启 binlog

从以上步骤可以看得出，binlog 起到了非常关键的作用，那就让我们近距离看下 binlog 日志。

binlog 格式有三种：

- row
- statement
- mixed

接下来，我们来做一个实验：

先创建一个表：

```
CREATE TABLE `person` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `income` bigint(20) NOT NULL COMMENT '收入',
  `expend` bigint(20) NOT NULL COMMENT '支出',
  PRIMARY KEY (`id`),
  KEY `idx_income` (`income`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='个人收支表';
```

插入4条记录：

```
insert into person values(50,500,500);
insert into person values(60,600,600);
insert into person values(70,700,700);
insert into person values(80,800,800);
```

查看binlog模式：


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mysql/deletedb-binlog-weiguanjishu-5.png)

查看当前正在写入的binlog文件：


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mysql/deletedb-binlog-weiguanjishu-6.png)

查看 binlog 中的内容，我们先来看下 row 模式

```
show binlog events in 'mysql-bin.000001';
```


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mysql/deletedb-binlog-weiguanjishu-7.png)

说明：

- SET @@SESSION.GTID_NEXT='ANONYMOUS’
- BEGIN  开始一个事务
- Table_map  记录更新了哪个库、哪张表
- Write_rows 记录做了什么操作，详细看binlog需要借助mysqlbinlog工具。
- COMMIT /* xid=157 */  结束一个事务

查找 binlog 文件的物理位置：

```
root@167bfa3785f1:/# find / -name mysql-bin.000001
/var/lib/mysql/mysql-bin.000001
```

借助 mysqlbinlog 命令，查看具体内容：

```
mysqlbinlog -vv mysql-bin.000001 --start-position=2986;
```


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mysql/deletedb-binlog-weiguanjishu-8.png)

红框中的内容表示执行了插入命令，insert into person values(80,800,800);

其中，@1、@2、@3 表示表 person 的第几个字段，不用原始名称，是为了节省空间。

**修改 binlog 格式，设置为 STATEMENT** ，查看日志格式：

```
set global binlog_format='STATEMENT';
```

设置之后，需要退出mysql重新连接，才能看到生效
```
show binlog events in 'mysql-bin.000001';
```


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mysql/deletedb-binlog-weiguanjishu-9.png)

从上图中我们可以看出，当 binlog_format=statement 时，binlog 里面记录的就是 SQL 语句的原文。

其中，use tomge  表示要先切到对应的数据库

如果想从指定位置查看binlog，可以增加 from 可选参数，如下：

```
show binlog events in 'mysql-bin.000001'  from 5168;
```

statement 与 row 对比：

statement 格式的binlog记录的是sql语句；row 格式的binlog记录的是event（Table_map，Write_rows，Delete_rows）


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mysql/deletedb-binlog-weiguanjishu-10.png)

当 binlog 在 statement 格式下，记录的是sql语句，在主库执行时可能使用的是索引 A；但是同步给备库执行时，可能用了 索引B。

索引不同，同一条sql语句，运行结果可能也不一样。

针对这个场景，我们建议采用 row 格式的 binlog。

即使我们使用了带where 条件（如：income>720）的delete语句，但 binlog 记录的是要删除的主键id（id =80 ），所以不会出现差错。



![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mysql/deletedb-binlog-weiguanjishu-11.png)


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mysql/deletedb-binlog-weiguanjishu-12.png)


**mixed 格式 的binlog 是个啥**？

由于 statement 格式的binlog 可能会导致主库、备库间的数据同步不一致，因此我们会采用 row 格式。

但是，row 格式占用的空间很大，写 binlog 也要占用大量的 IO 资源。

所以，官方提出一种mixed混合模式，集成了两者的优点。

内容如下：

- mysql会自动判断statement格式，是否会引发主备不一致的问题
- 如果statement格式会引起主备不一致的问题，自动使用row格式。
- 如果statement格式不会引起主备不一致的问题，那么就用statement格式，


### 四、恢复数据

当然，我们还建议把MySQL 的binlog设置成 row 模式，因为它可以用于数据恢复。我们来看下 insert、update、delete 三种DML操作如何来恢复数据的。

1、delete：

当我们执行 delete 命令时，如果 binlog_row_image 设置了 'FULL'，那么 Delete_rows 里面，包含了删掉的行的所有字段的值。

如果误删了，因为 binlog 记录了所有字段的值，反向执行 insert  就可以了。

当 binlog_row_image 设置为 MINIMAL，只记录关键信息，比如 id=80
2、insert：

row 格式下，binlog 会 记录 insert 的所有字段值。

如果误操作，只需要根据这些值找到对应的行，再执行 delete 操作即可

3、update：

row 格式下，binlog 会 记录 update 修改前、修改后的整行数据。

如果误操作，只需要用修改前的数据覆盖即可。

通过命令来恢复数据：

如果要执行数据恢复，可以使用下面命令

```
mysqlbinlog mysql-bin.000001  --start-position=1  --stop-position=3000 | mysql -h192.168.0.1 -P3306 -u$user -p$pwd;
```

将 mysql-bin.000001 文件位置从 1到3000 的 binlog 在 192.168.0.1机器的数据库上回放，还原。

OK，搞定，再也不怕删库跑路了。

----

转载自：微观技术

转载链接：https://mp.weixin.qq.com/s/oD3Anvz3XCsrahn6WdeeNw

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mysql/deletedb-binlog-weiguanjishu-13.png)

*没有什么使我停留——除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟*。
