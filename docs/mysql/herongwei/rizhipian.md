### 11、MySQL 的 change buffer 是什么？

- 当需要更新一个数据页时，如果数据页在内存中就直接更新；而如果这个数据页还没有在内存中的话，在不影响数据一致性的前提下，InnoDB 会将这些更新操作缓存在 change buffer 中。
- 这样就不需要从磁盘中读入这个数据页了，在下次查询需要访问这个数据页的时候，将数据页读入内存，然后执行 change buffer 中与这个页有关的操作。通过这种方式就能保证这个数据逻辑的正确性。
- 注意唯一索引的更新就不能使用 change buffer，实际上也只有普通索引可以使用。
- 适用场景：
- - 对于写多读少的业务来说，页面在写完以后马上被访问到的概率比较小，此时 change buffer 的使用效果最好。这种业务模型常见的就是账单类、日志类的系统。
  - 反过来，假设一个业务的更新模式是写入之后马上会做查询，那么即使满足了条件，将更新先记录在 change buffer，但之后由于马上要访问这个数据页，会立即触发 merge 过程。这样随机访问 IO 的次数不会减少，反而增加了 change buffer 的维护代价。

### 12、MySQL 是如何判断一行扫描数的？

- MySQL 在真正开始执行语句之前，并不能精确地知道满足这个条件的记录有多少条。
- 而只能根据统计信息来估算记录数。这个统计信息就是索引的“区分度。

### 13、MySQL 的 redo log 和 binlog 区别？

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/mysql/herongwei/rizhipian-1.png)

### 14、为什么需要 redo log？ 

-  redo log 主要用于 MySQL 异常重启后的一种数据恢复手段，确保了数据的一致性。 
-  其实是为了配合 MySQL 的 WAL 机制。因为 MySQL 进行更新操作，为了能够快速响应，所以采用了异步写回磁盘的技术，写入内存后就返回。但是这样，会存在 **crash后** 内存数据丢失的隐患，而 redo log 具备 crash safe 的能力。

### 15、为什么 redo log 具有 crash-safe 的能力，是 binlog 无法替代的？

第一点：redo log 可确保 innoDB 判断哪些数据已经刷盘，哪些数据还没有

- redo log 和 binlog 有一个很大的区别就是，一个是循环写，一个是追加写。也就是说 redo log 只会记录未刷盘的日志，已经刷入磁盘的数据都会从 redo log 这个有限大小的日志文件里删除。binlog 是追加日志，保存的是全量的日志。

- 当数据库 crash 后，想要恢复**未刷盘但已经写入 redo log 和 binlog 的数据**到内存时，binlog 是无法恢复的。虽然 binlog 拥有全量的日志，但没有一个标志让 innoDB 判断哪些数据已经刷盘，哪些数据还没有。
- 但 redo log 不一样，只要刷入磁盘的数据，都会从 redo log 中抹掉，因为是循环写！数据库重启后，直接把 redo log 中的数据都恢复至内存就可以了。

第二点：如果 redo log 写入失败，说明此次操作失败，事务也不可能提交

- redo log 每次更新操作完成后，就一定会写入日志，如果**写入失败**，说明此次操作失败，事务也不可能提交。 
- redo log 内部结构是基于页的，记录了这个页的字段值变化，只要crash后读取redo log进行重放，就可以恢复数据。
- 这就是为什么 redo log 具有 crash-safe 的能力，而 binlog 不具备。

### 16、当数据库 crash 后，如何恢复未刷盘的数据到内存中？

根据 redo log 和 binlog 的两阶段提交，未持久化的数据分为几种情况：

- change buffer 写入，redo log 虽然做了 fsync 但未 commit，binlog 未 fsync 到磁盘，这部分数据丢失。

- change buffer 写入，redo log fsync 未 commit，binlog 已经 fsync 到磁盘，先从 binlog 恢复 redo log，再从 redo log 恢复 change buffer。

- change buffer 写入，redo log 和 binlog 都已经 fsync，直接从 redo log 里恢复。

### 17、redo log 写入方式？

redo log包括两部分内容，分别是内存中的**日志缓冲**(redo log buffer)和磁盘上的**日志文件**(redo log file)。

MySQL 每执行一条 DML 语句，会先把记录写入 **redo log buffer（用户空间）** ，再保存到内核空间的缓冲区 OS-buffer 中，后续某个时间点再一次性将多个操作记录写到 **redo log file（刷盘）** 。这种先写日志，再写磁盘的技术，就是**WAL**。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/mysql/herongwei/rizhipian-2.png)


可以发现，redo log buffer写入到redo log file，是经过OS buffer中转的。其实可以通过参数innodb_flush_log_at_trx_commit进行配置，参数值含义如下： 

-  0：称为**延迟写**，事务提交时不会将redo log buffer中日志写入到OS buffer，而是每秒写入OS buffer并调用写入到redo log file中。 
-  1：称为**实时写**，实时刷”，事务每次提交都会将redo log buffer中的日志写入OS buffer并保存到redo log file中。 
-  2： 称为**实时写，延迟刷**。每次事务提交写入到OS buffer，然后是每秒将日志写入到redo log file。

### 18、redo log 的执行流程?

我们来看下Redo log的执行流程，假设执行的 SQL 如下： 

```
update T set a =1 where id =666
```

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/mysql/herongwei/rizhipian-3.png)


1.  MySQL 客户端将请求语句 update T set a =1 where id =666，发往 MySQL Server 层。 
2.  MySQL Server 层接收到 SQL 请求后，对其进行分析、优化、执行等处理工作，将生成的 SQL 执行计划发到 InnoDB 存储引擎层执行。 
3.  InnoDB 存储引擎层将**a修改为1**的这个操作记录到内存中。 
4.  记录到内存以后会修改 redo log 的记录，会在添加一行记录，其内容是**需要在哪个数据页上做什么修改**。 
5.  此后，将事务的状态设置为 prepare ，说明已经准备好提交事务了。 
6.  等到 MySQL Server 层处理完事务以后，会将事务的状态设置为 **commit**，也就是提交该事务。 
7.  在收到事务提交的请求以后，**redo log** 会把刚才写入内存中的操作记录写入到磁盘中，从而完成整个日志的记录过程。

### 19、binlog 的概念是什么，起到什么作用， 可以保证 crash-safe 吗? 

-  binlog 是归档日志，属于 MySQL Server 层的日志。可以实现**主从复制**和**数据恢复**两个作用。 
-  当需要**恢复数据**时，可以取出某个时间范围内的 binlog 进行重放恢复。 
-  但是 binlog 不可以做 crash safe，因为 crash 之前，binlog **可能没有写入完全** MySQL 就挂了。所以需要配合 **redo log** 才可以进行 crash safe。

### 20、什么是两阶段提交？

MySQL 将 redo log 的写入拆成了两个步骤：prepare 和 commit，中间再穿插写入binlog，这就是"两阶段提交"。


![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/mysql/herongwei/rizhipian-4.png)


而两阶段提交就是让这两个状态保持逻辑上的一致。redolog 用于恢复主机故障时的未更新的物理数据，binlog 用于备份操作。两者本身就是两个独立的个体，要想保持一致，就必须使用分布式事务的解决方案来处理。

**为什么需要两阶段提交呢?** 

-  如果不用两阶段提交的话，可能会出现这样情况
- 先写 redo log，crash 后 bin log 备份恢复时少了一次更新，与当前数据不一致。 
- 先写 bin log，crash 后，由于 redo log 没写入，事务无效，所以后续 bin log 备份恢复时，数据不一致。
-  两阶段提交就是为了保证 redo log 和 binlog 数据的安全一致性。只有在这两个日志文件逻辑上高度一致了才能放心的使用。

在恢复数据时，redolog 状态为 commit 则说明 binlog 也成功，直接恢复数据；如果 redolog 是 prepare，则需要查询对应的 binlog事务是否成功，决定是回滚还是执行。

### 21、MySQL 怎么知道 binlog 是完整的?

一个事务的 binlog 是有完整格式的：

- statement 格式的 binlog，最后会有 COMMIT；
- row 格式的 binlog，最后会有一个 XID event。

### 22、什么是 WAL 技术，有什么优点？

WAL，中文全称是 Write-Ahead Logging，它的关键点就是日志先写内存，再写磁盘。MySQL 执行更新操作后，**在真正把数据写入到磁盘前，先记录日志**。 

 好处是不用每一次操作都实时把数据写盘，就算 crash 后也可以通过redo log 恢复，所以能够实现快速响应 SQL 语句。

### 23、binlog 日志的三种格式 

 binlog 日志有三种格式 

-  Statement：基于SQL语句的复制((statement-based replication,SBR)) 
-  Row：基于行的复制。(row-based replication,RBR) 
-  Mixed：混合模式复制。(mixed-based replication,MBR) 

 **Statement格式** 

 每一条会修改数据的 SQL 都会记录在 binlog 中 

-  优点：不需要记录每一行的变化，减少了binlog日志量，节约了IO，提高性能。 
-  缺点：由于记录的只是执行语句，为了这些语句能在备库上正确运行，还必须记录每条语句在执行的时候的一些相关信息，以保证所有语句能在备库得到和在主库端执行时候相同的结果。 

 **Row格式** 

 不记录 SQL 语句上下文相关信息，仅保存哪条记录被修改。 

-  优点：binlog 中可以不记录执行的 SQL 语句的上下文相关的信息，仅需要记录那一条记录被修改成什么了。所以rowlevel的日志内容会非常清楚的记录下每一行数据修改的细节。不会出现某些特定情况下的存储过程、或 function、或trigger的调用和触发无法被正确复制的问题。 
-  缺点:可能会产生大量的日志内容。 

 **Mixed格式** 

 实际上就是 Statement 与 Row 的结合。一般的语句修改使用 statment 格式保存 binlog，如一些函数，statement 无法完成主从复制的操作，则采用 row 格式保存 binlog，MySQL 会根据执行的每一条具体的 SQL 语句来区分对待记录的日志形式。

### 24、redo log日志格式

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/mysql/herongwei/rizhipian-5.png)


redo log buffer (内存中)是由首尾相连的四个文件组成的，它们分别是：ib_logfile_1、ib_logfile_2、ib_logfile_3、ib_logfile_4。

- write pos 是当前记录的位置，一边写一边后移，写到第 3 号文件末尾后就回到 0 号文件开头。
- checkpoint 是当前要擦除的位置，也是往后推移并且循环的，擦除记录前要把记录更新到数据文件。
- write pos 和 checkpoint 之间的是“粉板”上还空着的部分，可以用来记录新的操作。
- 如果 write pos 追上 checkpoint，表示“粉板”满了，这时候不能再执行新的更新，得停下来先擦掉一些记录，把 checkpoint 推进一下。
- 有了 redo log，当数据库发生宕机重启后，可通过 redo log将未落盘的数据（check point之后的数据）恢复，保证已经提交的事务记录不会丢失，这种能力称为**crash-safe**。

### 25、原本可以执行得很快的 SQL 语句，执行速度却比预期的慢很多，原因是什么？如何解决？

原因：从大到小可分为四种情况

- MySQL 数据库本身被堵住了，比如：系统或网络资源不够。
- SQL 语句被堵住了，比如：表锁，行锁等，导致存储引擎不执行对应的 SQL 语句。
- 确实是索引使用不当，没有走索引。
- 表中数据的特点导致的，走了索引，但回表次数庞大。

解决：

- 考虑采用 force index 强行选择一个索引
- 考虑修改语句，引导 MySQL 使用我们期望的索引。比如把“order by b limit 1” 改成 “order by b,a limit 1” ，语义的逻辑是相同的。
- 第三种方法是，在有些场景下，可以新建一个更合适的索引，来提供给优化器做选择，或删掉误用的索引。
- 如果确定是索引根本没必要，可以考虑删除索引。

### 26、InnoDB 数据页结构

一个数据页大致划分七个部分

- File Header：表示页的一些通用信息，占固定的38字节。
- page Header：表示数据页专有信息，占固定的56字节。
- inimum+Supermum：两个虚拟的伪记录，分别表示页中的最小记录和最大记录，占固定的26字节。
- User Records：真正存储我们插入的数据，大小不固定。
- Free Space：页中尚未使用的部分，大小不固定。
- Page Directory：页中某些记录的相对位置，也就是各个槽对应的记录在页面中的地址偏移量。
- File Trailer：用于检验页是否完整，占固定大小 8 字节。

> 图文详解 60 道 MySQL 面试高频题，这次吊打面试官，我觉得稳了（手动 dog）。整理：沉默王二，戳[转载链接](https://mp.weixin.qq.com/s/c-sy7tM0BmrqMUQFW7C65g)，里面有局详细的思维导图；作者：herongwei，戳[原文链接](https://mp.weixin.qq.com/s/-SqqKmhZcOlQxM-rHiIpKg)。
