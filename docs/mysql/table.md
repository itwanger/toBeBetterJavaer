---
title: 掌握MySQL表的增删改查，一名真正的 CRUD boy 即将出炉
shortTitle: MySQL 表的增删改查
---

# MySQL 表的基本操作

有了数据库以后，我们就可以在数据库中对表进行增删改查了，这也就意味着，一名真正的 CRUD Boy 即将到来（😁）。

## 查表

查看当前数据库中的所有表，可以使用 `show tables;` 命令。

![](https://cdn.tobebetterjavaer.com/stutymore/table-20240127180015.png)

由于当前数据库中还没有表，所以输出 `Empty set`。

### 不指定数据库

[上一节](https://javabetter.cn/mysql/database.html)，我们提到，在操作表之前，可以通过 `use 数据库名;` 命令，指定要操作的数据库。

那假如不指定数据库的话，我们可以通过 `show tables from database` 的方式，来指定要操作的表，例如：

```sql
show tables from itwanger;
```

![](https://cdn.tobebetterjavaer.com/stutymore/table-20240127183044.png)

>可以在建表后再尝试哈。

## 建表

既然没有表，那我们就创建一张表吧。创建表的语法如下：

```sql
create table 表名(
    列名1 数据类型1,
    列名2 数据类型2,
    ...
    列名n 数据类型n
);
```

例如，我们创建一张文章表，表中包含文章的标题、内容、作者、发布时间、阅读量等信息，那么可以这样创建：

```sql
create table article(
    id int primary key auto_increment,
    title varchar(100) not null,
    content text not null,
    author varchar(20) not null,
    create_time datetime not null,
    read_count int default 0
);
```

- article 是表名；
- id 是主键，类型为 int，自增长；
- title 是标题，类型为 varchar，长度为 100，不允许为空；
- content 是内容，类型为 text，不允许为空；
- author 是作者，类型为 varchar，长度为 20，不允许为空；
- create_time 是发布时间，类型为 datetime，不允许为空；
- read_count 是阅读量，类型为 int，默认值为 0。

执行上述语句后，可以使用 `show tables;` 命令查看当前数据库中的所有表，可以看到，已经创建了一张 article 表。

![](https://cdn.tobebetterjavaer.com/stutymore/table-20240127180502.png)

当然了，实际工作中，我们可能不会直接通过 SQL 语句来创建表，而是通过一些建表的工具，比如说 Navicat、DataGrip 等。

![](https://cdn.tobebetterjavaer.com/stutymore/table-20240127180836.png)

以及 PowerDesigner、chiner 这种建模工具，关于工具的使用，可以戳这篇帖子：

- [一款国人开源的数据库设计工具](https://javabetter.cn/gongju/chiner.html)

### 给表添加注释

在建表的时候，我们可以给表添加注释，语法如下：

```sql
create table 表名(
    列名1 数据类型1 comment '注释1',
    列名2 数据类型2 comment '注释2',
    ...
    列名n 数据类型n comment '注释n'
) comment '表注释';
```

这样方便我们在后期维护的时候，能够更好的理解表的含义。

我们来一个简单的例子，在之前的基础上增加了一些字段的注释和表注释：

```sql
create table article(
    id int primary key auto_increment comment '主键',
    title varchar(100) not null comment '标题',
    content text not null comment '内容',
    author varchar(20) not null comment '作者',
    create_time datetime not null comment '发布时间',
    read_count int default 0 comment '阅读量'
) comment '文章表';
```

### 假如表已经存在

由于之前 article 表已经创建了，这时候再执行上述语句，就会报错 `Table 'article' already exists`：

![](https://cdn.tobebetterjavaer.com/stutymore/table-20240127181331.png)

为了避免这种情况，我们可以在建表的时候，先判断表是否存在，如果不存在，再创建表，语法如下：

```sql
create table if not exists 表名(
    列名1 数据类型1,
    列名2 数据类型2,
    ...
    列名n 数据类型n
);
```

实际的例子如下所示：

```sql
create table if not exists article(
    id int primary key auto_increment comment '主键',
    title varchar(100) not null comment '标题',
    content text not null comment '内容',
    author varchar(20) not null comment '作者',
    create_time datetime not null comment '发布时间',
    read_count int default 0 comment '阅读量'
) comment '文章表';
```

## 删表

删除表的语法如下：

```sql
drop table 表名;
```

同样的，在删表的时候尽量眨眨眼😂，看看自己是不是被坏人给控制了，否则又是“删库跑路”的悲剧。

![](https://cdn.tobebetterjavaer.com/stutymore/table-20240127181740.png)

同样，在删除表的时候也可以加上 `if exists`，语法如下：

```sql
drop table if exists 表名;
```

这样可以防止表不存在的时候，报错。

## 查看表结构

有时候，我们想知道表的结构是什么样的，也就是 create table 的时候包含了哪些列、列有哪些属性，那这时候我们可以使用以下这些命令查看：

- `desc 表名;`
- `describe 表名;`
- `explain 表名;`
- `show columns from 表名;`
- `show fields from 表名;`

结果都是一样的，大家可以根据自己的喜好，记住其中的一个就行了。

![](https://cdn.tobebetterjavaer.com/stutymore/table-20240127182413.png)

还有一个命令 `show create table 表名;`，可以查看建表语句。

![](https://cdn.tobebetterjavaer.com/stutymore/table-20240127182525.png)

关于[表的数据类型](https://javabetter.cn/mysql/data-type.html)，比如说 int、varchar、datetime 等，这些我们会留到后面的章节来讲。

那假如没有使用 `use 数据库名;` 命令指定要操作的数据库，那我们可以通过 `show columns from 数据库名.表名;` 的方式，来查看表的结构，例如：

```sql
show create table itwanger.article;
```

`;` 结尾查询到的信息格式比较乱，可以通过 ` \G` 来格式化输出，例如：

```sql
show create table itwanger.article \G;
```

![](https://cdn.tobebetterjavaer.com/stutymore/table-20240127183428.png)