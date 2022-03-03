### 56、为什么 MySQL 会抖一下？

- 脏页会被后台线程自动 flush，也会由于数据页淘汰而触发 flush，而刷脏页的过程由于会占用资源，可能会让你的更新和查询语句的响应时间长一些。

### 57、为什么删除了表，表文件的大小还是没变？

- 数据项删除之后 InnoDB 某个页 page A 会被标记为可复用。
- delete 命令把整个表的数据删除，结果就是，所有的数据页都会被标记为可复用。但是磁盘上，文件不会变小。
- 经过大量增删改的表，都是可能是存在空洞的。这些空洞也占空间所以，如果能够把这些空洞去掉，就能达到收缩表空间的目的。
- 重建表，就可以达到这样的目的。可以使用 alter table A engine=InnoDB 命令来重建表。

### 58、count(*)实现方式以及各种 count 对比

- 对于 count(主键 id) 来说，InnoDB 引擎会遍历整张表，把每一行的 id 值都取出来，返回给 server 层。server 层拿到 id 后，判断是不可能为空的，就按行累加。
-  对于 count(1) 来说，InnoDB 引擎遍历整张表，但不取值。server 层对于返回的每一行，放一个数字“1”进去，判断是不可能为空的，按行累加。 单看这两个用法的差别的话，你能对比出来，count(1) 执行得要比 count(主键 id) 快。因为从引擎返回 id 会涉及到解析数据行，以及拷贝字段值的操作。
- 对于 count(字段) 来说：如果这个“字段”是定义为 not null 的话，一行行地从记录里面读出这个字段，判断不能为 null，按行累加；如果这个“字段”定义允许为 null，那么执行的时候，判断到有可能是 null，还要把值取出来再判断一下，不是 null 才累加。也就是前面的第一条原则，server 层要什么字段，InnoDB 就返回什么字段。 
- 但是 count `*` 是例外，并不会把全部字段取出来，而是专门做了优化，不取值。`count(*)` 肯定不是 null，按行累加。
- 所以结论是：按照效率排序的话，`count(字段)<count(主键 id)<count(1)≈count(※)`，所以建议尽量使用 `count(*)`。

### 59、orderby 排序的内部原理

- MySQL 会为每个线程分配一个内存（sort-buffer）用于排序该内存大小为 sort_buffer_size；

- 如果排序的数据量小于 sort_buffer_size，排序就会在内存中完成；

  内部排序分为两种

- 全字段排序：到索引树上找到满足条件的主键ID根据主键ID去取出数据放到sort_buffer然后进行快速排序

- rowid排序：通过控制排序的行数据的长度来让sort_buffer中尽可能多的存放数据

- 如果数据量很大，内存中无法存下这么多，就会使用磁盘临时文件来辅助排序，称为外部排序；

- 外部排序，MySQL会分为好几份单独的临时文件来存放排序后的数据，一般是磁盘文件中进行归并，然后将这些文件合并成一个大文件；

### 60、如何高效的使用 MySQL 显式随机消息

- 随机取出 Y1,Y2,Y3之后，算出Ymax,Ymin

- 得到id集后算出Y1、Y2、Y3对应的三个id 最后 `select * from t where id in (id1, id2, id3)`
  这样扫描的行数应该是C+Ymax+3

  ```mysql
  mysql> select count(*) into @C from t;
  set @Y1 = floor(@C * rand());
  set @Y2 = floor(@C * rand());
  set @Y3 = floor(@C * rand());
  Ymax = max(Y1,Y2,Y3)
  Ymin = min(Y1,Y2,Y3)
  select id from t limit Ymin，(Ymax - Ymin)
  ```