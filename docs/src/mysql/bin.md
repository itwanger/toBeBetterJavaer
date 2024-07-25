---
title: MySQL bin目录下的可执行文件都是用来干嘛的？
shortTitle: bin目录下的可执行文件
---

# MySQL bin目录下的可执行文件

这节我们穿插讲一点轻松的内容，关于 MySQL 安装成功后，bin 目录下的一些可执行文件，它们到底是干嘛用的？

![](https://cdn.tobebetterjavaer.com/stutymore/bin-20240205172946.png)

我本机是 macOS 环境，目前能看到的可执行文件就如上图所示，Windows 下看到的是一些带 exe 后缀的文件，但它们的功能都是一样的。

## mysql

MySQL 是 CS 架构，当客户端想要连接 MySQL 服务器的时候，就需要执行 mysql 这个可执行文件，我们在 [MySQL 安装](https://javabetter.cn/mysql/install.html)的时候也讲到过。

如果 MySQL 已经添加到 PATH 环境变量中的话，不管你在任何地方打开终端，只要执行 `mysql -uroot -p` 就可以连接到 MySQL 服务器，否则就要在 bin 目录下执行 `./mysql -uroot -p` 或者 `mysql -uroot -p`（macOS 环境）。

Windows 环境的话，需要在 cmd 中切换到 bin 目录下，再执行 `mysql -uroot -p`。

我们前面也讲过为什么要这样，这里就不再赘述了。

这里讲一些连接到 MySQL 服务器后的注意事项，属于比较细节的内容。

### 命令结束符

在敲入一条 SQL 语句后，需要加上命令结束符 `;`，否则 MySQL 服务器会认为你还没有输入完整的 SQL 语句，会一直等待你输入，直到你输入 `;`。

![](https://cdn.tobebetterjavaer.com/stutymore/bin-20240205174107.png)

那除了 `;` 之外，你还可以使用 `\g` 或者 `\G` 作为命令结束符，它们的区别是：

- `;`：表示一次性执行所有 SQL 语句；
- `\g`：同上；
- `\G`：表示一次性执行所有 SQL 语句，并且以纵向显示结果，如果查询结果的列数比较多的话，该结尾符会让结果更加清晰。


![](https://cdn.tobebetterjavaer.com/stutymore/bin-20240205174327.png)

### 命令可以随意换行

在输入 SQL 语句的时候，可以随意换行，不需要在意换行的位置，只要 SQL 语句的逻辑是正确的，MySQL 服务器就会认为你输入的是一条完整的 SQL 语句。

![](https://cdn.tobebetterjavaer.com/stutymore/bin-20240205174621.png)

### 一次性执行多条 SQL 语句

可以在一行 SQL 语句里执行多条 SQL 语句，只需要用 `;` 分隔开即可。这对于批量执行 SQL 语句是非常方便的。

举例来说，下面的 SQL 语句就是一次性执行了两条 SQL 语句。

```sql
show databases; use mysql;
```

![](https://cdn.tobebetterjavaer.com/stutymore/bin-20240205174853.png)

### 放弃执行 SQL 语句

如果你输入了一条 SQL 语句，但是又不想执行了，可以输入 `\c` 来放弃执行。

当你SQL 输错了，又懒得删改，就可以使用 `\c` 来放弃执行。

![](https://cdn.tobebetterjavaer.com/stutymore/bin-20240205175026.png)

### SQL 语句大小写不敏感

MySQL 默认对命令的大小写是不敏感的，也就是说，你可以随意输入大小写，MySQL 服务器都会认为你输入的是一样的。

![](https://cdn.tobebetterjavaer.com/stutymore/bin-20240205175153.png)

不过通常来说，SQL 语句的关键字都是大写的，而表名、字段名等都是小写的，这样可以让 SQL 语句更加清晰。

>不过，这只是一种约定，不是强制的。

### 字符串的引号

在 SQL 语句中，可以使用单引号或者双引号表示字符串字面量。

![](https://cdn.tobebetterjavaer.com/stutymore/bin-20240205175523.png)

建议使用单引号，因为 MySQL 在开启 `ANSI_QUOTES` 模式的情况下，双引号会有其他特殊的含义。

![](https://cdn.tobebetterjavaer.com/stutymore/bin-20240205175915.png)

查询 MySQL 是不是开启了 `ANSI_QUOTES` 模式，可以使用 `show variables like 'sql_mode';` 来查询。

![](https://cdn.tobebetterjavaer.com/stutymore/bin-20240205180347.png)

可以看到默认是没有开启的。

我们可以使用单引号和双引号来定义字符串，使用反引号 \` 来定义标识符，比如表名、字段名等。

![](https://cdn.tobebetterjavaer.com/stutymore/bin-20240205180656.png)

我们给 sql_mode 添加 `ANSI_QUOTES` 模式：

```sql
set sql_mode='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION,ANSI_QUOTES';
```

![](https://cdn.tobebetterjavaer.com/stutymore/bin-20240205181238.png)

再执行下面的 SQL 语句：

```sql
SELECT `title`,"short_title" FROM `article`;
```

会发现，双引号也被认为是标识符了，和反引号  \` 的效果是一样的。

![](https://cdn.tobebetterjavaer.com/stutymore/bin-20240205181258.png)

### 退出 MySQL 连接

在 MySQL 连接状态下，可以使用 `exit`、`quit`、`\q`、`Ctrl + D` 来退出连接。

![](https://cdn.tobebetterjavaer.com/stutymore/bin-20240205181608.png)

看，我们在添加 sql_mode 的时候，是针对当前连接 session 的，所以当我们退出连接后，再重新连接，就会发现 sql_mode 又变成了默认的。

## mysqldump

mysqldump 是一个非常实用的 MySQL 数据库备份工具，用于创建一个或多个 MySQL 数据库级别的 SQL 转储文件，包括数据库的表结构和数据。对数据备份、迁移或恢复非常重要。

备份整个数据库的语法如下：

```shell
mysqldump -u [username] -p[password] [database_name] > [filename].sql
```

- `-u`：指定用户名；
- `-p`：指定密码；如果没有输入密码，系统会在执行命令后提示输入密码；
- `database_name`：指定要备份的数据库；
- `filename`：指定备份文件的名称。

比如说，我要备份[技术派实战项目]([https://](https://javabetter.cn/zhishixingqiu/paicoding.html))的整个数据库，可以使用下面的命令：

```shell
mysqldump -uroot -p pai_coding > pai_coding.sql
```

执行完再打个压缩包：

```shell
gzip pai_coding.sql
```

![](https://cdn.tobebetterjavaer.com/stutymore/bin-20240205183507.png)

也可以备份指定的表，比如说，我要备份 article 表：

```shell
mysqldump -uroot -p pai_coding article > article.sql
```

在数据库名后面加上表名就好了。

也可以备份多个数据库，比如说，我要备份 pai_coding 和 test 两个数据库：

```shell
mysqldump -uroot -p --databases pai_coding test > pai_coding_test.sql
```

使用 `--databases` 参数，后面跟上要备份的数据库名，中间用空格隔开。

要备份所有数据库的话，可以使用 `--all-databases` 参数。

在生产环境中，为了防止数据丢失，我们可以编写脚本并使用 [cron 表达式](https://help.aliyun.com/document_detail/133509.html)在后台自动执行这些备份操作。

我们来写一个简单的备份脚本：

```shell
#!/bin/bash

# 设置 MySQL 用户名、密码、数据库名和备份目录
MYSQL_USER="your_username"
MYSQL_PASSWORD="your_password"
DATABASE_NAME="your_database_name"
BACKUP_DIR="/path/to/your/backup/directory"

# 生成备份文件名，包含日期
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/$DATABASE_NAME_$DATE.sql"

# 使用 mysqldump 创建数据库备份
mysqldump -u $MYSQL_USER -p$MYSQL_PASSWORD $DATABASE_NAME > $BACKUP_FILE

# 检查备份操作是否成功
if [ $? -eq 0 ]; then
  echo "数据库备份成功: $BACKUP_FILE"
else
  echo "备份出错了！"
fi
```

将上面的脚本保存为 `backup.sh`，然后添加执行权限：

```shell
chmod +x backup.sh
```

然后执行脚本：

```shell
./backup.sh
```

![](https://cdn.tobebetterjavaer.com/stutymore/bin-20240205185257.png)

OK，打开 crontab：

```shell
crontab -e
```

添加一行：

```shell
0 3 * * * /path/to/your/backup.sh
```

这样就可以在每天凌晨三点执行备份操作了。我就不再演示了。

当数据库较大时，mysqldump 可能会消耗较长的时间和系统资源，所以尽量在数据库不繁忙的时候执行备份操作，比如说凌晨两三点。

对于非常大的数据库，可以使用 `--single-transaction` 参数来执行备份，这样可以避免锁表，但是要求数据库引擎是 [InnoDB](https://javabetter.cn/mysql/InnoDB.html)。

## mysqladmin

mysql 后面加上 admin 就表明这是一个 MySQL 的管理工具，它可以用来执行一些管理操作，比如说创建数据库、删除数据库、查看 MySQL 服务器的状态等。

比如说，我要查看 MySQL 服务器的状态：

```shell
mysqladmin -uroot -p status
```

![](https://cdn.tobebetterjavaer.com/stutymore/bin-20240205190217.png)

比如说，重新加载授权表、刷新日志文件等：

```shell
mysqladmin -uroot -p flush-privileges
mysqladmin -uroot -p reload
mysqladmin -uroot -p flush-logs
```

- flush-privileges 和 reload 是一样的效果。
- flush-logs 是刷新日志文件。

比如说，我要创建一个数据库：

```shell
mysqladmin -uroot -p create test
```

比如说，我要删除一个数据库：

```shell
mysqladmin -uroot -p drop test
```

在自动化脚本中，会经常使用 mysqladmin 来执行一些管理操作。

## mysqlcheck

mysqlcheck 是 MySQL 提供的一个命令行工具，用于检查、修复、分析和优化数据库表，对数据库的维护和性能优化非常有用。

比如说，我要检查数据库的所有表：

```shell
mysqlcheck -uroot -p --check your_database_name
```

![](https://cdn.tobebetterjavaer.com/stutymore/bin-20240205191424.png)

## mysqlimport

mysqlimport 用于从文本文件中导入数据到数据库表中，非常适合用于批量导入数据。比如说，我有一个 CSV 文件，我要导入到数据库表中：

```shell
mysqlimport -uroot -p --fields-terminated-by=, --fields-enclosed-by='"' --lines-terminated-by='\n' your_database_name your_table_name.csv
```

- `--fields-terminated-by`：指定字段之间的分隔符；
- `--fields-enclosed-by`：指定字段的包围符；
- `--lines-terminated-by`：指定行的结束符。
- `your_table_name.csv`：指定要导入的文件。
- `your_database_name`：指定要导入的数据库。

好，我们来创建一个 CSV 文件：

```shell
echo "1, 'Java', 'Java is the best language', '2022-02-05 19:30:00'" > article.csv
echo "2, 'Python', 'Python is the best language', '2022-02-05 19:30:00'" >> article.csv
echo "3, 'Go', 'Go is the best language', '2022-02-05 19:30:00'" >> article.csv
```

接着创建一张表：

```sql
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

然后导入：

```shell
mysqlimport -uroot -p --fields-terminated-by=, --fields-enclosed-by='"' --lines-terminated-by='\n' pai_coding article.csv
```

哦，出现了 `--secure-file-priv` 错误：

![](https://cdn.tobebetterjavaer.com/stutymore/bin-20240205194729.png)

我们可以先查看一下 `--secure-file-priv` 参数的值：

```sql
show variables like 'secure_file_priv';
```

![](https://cdn.tobebetterjavaer.com/stutymore/bin-20240205195109.png)

为 null，表明 MySQL 并没有限制导入文件的目录。我们只需要加入 `--local` 参数即可：

```shell
mysqlimport -uroot -p --fields-terminated-by=, --fields-enclosed-by='"' --lines-terminated-by='\n' --local pai_coding article.csv
```

![](https://cdn.tobebetterjavaer.com/stutymore/bin-20240205195624.png)

OK，导入成功。

![](https://cdn.tobebetterjavaer.com/stutymore/bin-20240205195636.png)

## mysqlshow

mysqlshow 用于显示 MySQL 数据库服务器中的数据库、表、列等信息。

比如说，我要查看数据库中的所有表：

```shell
mysqlshow -uroot -p your_database_name
```

![](https://cdn.tobebetterjavaer.com/stutymore/bin-20240205200127.png)

比如说，我要查看表中的所有列：

```shell
mysqlshow -uroot -p your_database_name your_table_name
```

![](https://cdn.tobebetterjavaer.com/stutymore/bin-20240205200227.png)

比如说，我要查看表的索引信息：

```shell
mysqlshow -uroot -p --keys your_database_name your_table_name
```

![](https://cdn.tobebetterjavaer.com/stutymore/bin-20240205200416.png)

在部署新应用或进行数据库迁移时，可以使用 mysqlshow 快速确认目标数据库是否已经存在。

## mysqlbinlog

mysqlbinlog 用于查看 MySQL 二进制日志文件的内容，可以用于恢复数据、查看数据变更等。二进制日志是 MySQL 服务器的一个重要特性，记录了数据库更改的所有“事件”，如表的创建、数据的插入、更新和删除操作。

如果发生数据丢失或损坏，就可以使用 mysqlbinlog 来查看和恢复自上次备份以来执行的更改。

比如说，我要查看二进制日志文件的内容：

```shell
mysqlbinlog -uroot -p /path/to/your/binlog.000001
```

前提条件是你已经开启了二进制日志。

假设你想要查看并恢复从昨天晚上 10 点到今天早上 2 点之间发生的所有数据库更改，你可以使用 mysqlbinlog 的 `--start-datetime` 和 `--stop-datetime` 选项来过滤这个时间范围内的事件：

```shell
mysqlbinlog --start-datetime="YYYY-MM-DD 22:00:00" \
            --stop-datetime="YYYY-MM-DD 02:00:00" \
            /path/to/binlog-file > /path/to/output.sql
```

这部分我们在讲 [binlog](https://javabetter.cn/mysql/binlog.html) 的时候会详细讲。

## 其他

bin 目录下还有一些其他的可执行文件，比如说 mysqlslap、mysql_upgrade、mysqld_safe、mysql_secure_installation、mysqlpump、mysql_config、mysql_tzinfo_to_sql 等等，我们就不一次性全讲了，后面遇到我觉得值得给大家细讲的，我们再回来来补充。

这里就简单做一个表格吧：

| 可执行文件 | 作用 |
| --- | --- |
| mysqlslap | 用于模拟多个客户端并发访问 MySQL 服务器，用于测试 MySQL 服务器的性能。 |
| mysql_upgrade | 用于升级 MySQL 数据库。 |
| mysqld_safe | 用于启动 MySQL 服务器的守护进程。 |
| mysql_secure_installation | 用于执行一系列安全相关的操作来提高 MySQL 安装的安全性。它包括设置 root 密码、删除匿名用户、禁用远程 root 登录等步骤。 |
| mysqlpump | 一个类似于 mysqldump 的 MySQL 备份工具，但它支持并行备份操作，可以更快地备份大型数据库。 |
| mysql_config | 用于获取编译和链接客户端应用所需的 MySQL 选项的脚本。 |
| mysql_tzinfo_to_sql | 用于加载时区信息到 MySQL 服务器。 |

## 小结

bin 目录下的可执行文件合起来为 MySQL 的安装、运行、管理和维护提供了全面的支持。


----

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)