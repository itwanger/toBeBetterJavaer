# 这是雷军的简历，落魄时卡里只有冰冷的40亿 

大家好，我是二哥呀。

昨天，在星球嘉宾 Jack 那里看到一份雷军的简历，看完后真的想给雷军发个面试邀请，以便好好地拷打他一下（dog）

![点击可以放大查看](https://files.mdnice.com/user/3903/284317dc-2cd3-4651-842a-e8eb8d109910.png)


- 高考 710 分的卷子，考了 700 分，约等于每门只丢 2 分
- 只用两年修完大学所有学分，奖学金拿到手软
- 大三，接私活赚了100万
- 28 岁出任金山软件总经理
- 38 岁开始迷茫，卡里只剩冰冷的 40 亿
- 41 岁创办小米，导致我买了 12 个小米手机（包括给爸妈买的）
- 55 岁造车成功。

看看人家的 28 岁，再回想自己的 28 岁，真的我捂了嚎风。。。。

>捂了嚎风，这个成语通常用来形容一个人在面对某些事情时，表现得非常焦虑、烦躁，甚至有些失控的状态。 

## 小米面经（八股吟唱）

回归主线。今天我们继续以《[Java 面试指南-小米面经](https://mp.weixin.qq.com/s/nWyWWZ42mUAPqqV8M8YXiw)》中同学 E 的第二个部门实习一面为例，来看看小米的面试官都喜欢问哪些题目，24 届春招和 25 届暑期实习的同学听劝（😁）


![](https://files.mdnice.com/user/3903/75166a0f-770a-4279-8ce4-768278b7b1be.png)


可以看得出，基本上围绕着二哥一直给大家强调的 Java 后端四大件展开。内容较长，建议大家先收藏起来，面试的时候大概率会碰到，我会尽量用通俗易懂+手绘图的方式，让天下所有的面渣都能逆袭 😂

>- 1、三分恶面渣逆袭在线版：https://javabetter.cn/sidebar/sanfene/nixi.html
>- 2、三分恶面渣逆袭PDF离线版：https://t.zsxq.com/04FuZrRVf
>- [二哥的 Linux 速查备忘手册.pdf 下载](https://mp.weixin.qq.com/s/KLzYi4Y6sjC5m5iFQKb0RQ)


![小米 24 届秋招薪资参考](https://files.mdnice.com/user/3903/21510639-7ead-4a19-aee0-e21a3449b09c.png)

### 你封装过springboot starter吗

创建一个自定义的 Spring Boot Starter，需要这几步：

第一步，创建一个新的Maven 项目，例如命名为 my-spring-boot-starter。在 pom.xml 文件中添加必要的依赖和配置：


```xml
<properties>
    <spring.boot.version>2.3.1.RELEASE</spring.boot.version>
</properties>

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-autoconfigure</artifactId>
        <version>${spring.boot.version}</version>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter</artifactId>
        <version>${spring.boot.version}</version>
    </dependency>
</dependencies>
```

第二步，在 `src/main/java` 下创建一个自动配置类，比如 MyServiceAutoConfiguration.java：（通常是autoconfigure包下）。

```java
@Configuration
@EnableConfigurationProperties(MyStarterProperties.class)
public class MyServiceAutoConfiguration {

    @Bean
    @ConditionalOnMissingBean
    public MyService myService(MyStarterProperties properties) {
        return new MyService(properties.getMessage());
    }
}
```

第三步，创建一个配置属性类 MyStarterProperties.java：

```java
@ConfigurationProperties(prefix = "mystarter")
public class MyStarterProperties {
    private String message = "二哥的 Java 进阶之路不错啊!";

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
```

第四步，创建一个简单的服务类 MyService.java：

```java
public class MyService {
    private final String message;

    public MyService(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
```

第五步，配置 spring.factories，在 `src/main/resources/META-INF` 目录下创建 spring.factories 文件，并添加：

```
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
com.itwanger.mystarter.autoconfigure.MyServiceAutoConfiguration
```

第六步，使用 Maven 打包这个项目：

```shell
mvn clean install
```

第七步，在其他的 Spring Boot 项目中，通过 Maven 来添加这个自定义的 Starter 依赖，并通过 application.properties 配置欢迎消息：

```xml
mystarter.message=javabetter.cn
```

然后就可以在 Spring Boot 项目中注入 MyStarterProperties 来使用它。

![](https://cdn.tobebetterjavaer.com/stutymore/spring-20240409114642.png)

启动项目，然后在浏览器中输入 `localhost:8081/hello`，就可以看到欢迎消息了。

![二哥的 Java 进阶之路](https://cdn.tobebetterjavaer.com/stutymore/spring-20240409114610.png)

### 你平时用到的数据库

我经常使用的数据库是 MySQL，它是一个开源的关系型数据库管理系统，现在隶属于 Oracle 旗下。

也是我们国内使用频率最高的一种数据库，我在本地安装的 MySQL 的社区版，最新的 8.0 版本。

![二哥的 Java 进阶之路](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-1992b6dd-1c1d-4b8b-b98a-8407e8c51ff9.jpg)

### 说一说mysql索引的底层机制

MySQL 的默认存储引擎是 InnoDB，它采用的是 B+树索引。

那在说 B+树之前，必须得先说一下 B 树（B-tree）。

B 树是一种自平衡的多路查找树，和红黑树、二叉平衡树不同，B 树的每个节点可以有 m 个子节点，而红黑树和二叉平衡树都只有 2 个。

换句话说，红黑树、二叉平衡树是细高个，而 B 树是矮胖子。

![二哥的 Java 进阶之路：B 树](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240322132606.png)

好，我继续说。

内存和磁盘在进行 IO 读写的时候，有一个最小的逻辑单元，叫做页（Page），页的大小一般是 4KB。

![二哥的 Java 进阶之路：IO 读写](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240322133650.png)

那为了提高读写效率，从磁盘往内存中读数据的时候，一次会读取至少一页的数据，比如说读取 2KB 的数据，实际上会读取 4KB 的数据；读取 5KB 的数据，实际上会读取 8KB 的数据。**我们要尽量减少读写的次数**。

因为读的次数越多，效率就越低。就好比我们在工地上搬砖，一次搬 10 块砖肯定比一次搬 1 块砖的效率要高，反正我每次都搬 10 块（😁）。

对于红黑树、二叉平衡树这种细高个来说，每次搬的砖少，因为力气不够嘛，那来回跑的次数就越多。

是这个道理吧，树越高，意味着查找数据时就需要更多的磁盘 IO，因为每一层都可能需要从磁盘加载新的节点。

![用户1260737：二叉树](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240322140825.png)

B 树的节点大小通常与页的大小对齐，这样每次从磁盘加载一个节点时，可以正好是一个页的大小。因为 B 树的节点可以有多个子节点，可以填充更多的信息以达到一页的大小。

![用户1260737：B 树](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240322141957.png)

B 树的一个节点通常包括三个部分：

- 键值：即表中的主键
- 指针：存储子节点的信息
- 数据：表记录中除主键外的数据

不过，正所谓“祸兮福所倚，福兮祸所伏”，正是因为 B 树的每个节点上都存了数据，就导致每个节点能存储的键值和指针变少了，因为每一页的大小是固定的，对吧？

于是 B+树就来了，B+树的非叶子节点只存储键值，不存储数据，而叶子节点存储了所有的数据，并且构成了一个有序链表。

![用户1260737：B+树](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240322142950.png)

这样做的好处是，非叶子节点上由于没有存储数据，就可以存储更多的键值对，树就变得更加矮胖了，于是就更有劲了，每次搬的砖也就更多了（😂）。

由此一来，查找数据进行的磁盘 IO 就更少了，查询的效率也就更高了。

再加上叶子节点构成了一个有序链表，范围查询时就可以直接通过叶子节点间的指针顺序访问整个查询范围内的所有记录，而无需对树进行多次遍历。

总结一下，InnoDB 之所以选择 B+树是因为：

- 更高效的磁盘 IO，因为它减少了磁盘寻道时间和页的加载次数。
- 支持范围查询，与 B 树相比，B+树的叶子节点通过指针连接成一个链表，这使得范围查询变得非常高效。在 B+树上执行范围查询可以简单地从范围的起始点开始，然后沿着链表向后遍历，直到结束点。
- 查询性能稳定，B+树的所有查找操作都要查到叶子节点，这使得所有的查询操作都有着相同的访问深度，因此查询性能非常稳定。不像某些其他数据结构，如 B 树，其查询性能因为数据存在所有的节点上导致深度不一致，性能不稳定。

**注**：在 InnoDB 存储引擎中，默认的页大小是 16KB。可以通过 `show variables like 'innodb_page_size';` 查看。

![二哥的 Java 进阶之路：页的大小](https://cdn.tobebetterjavaer.com/stutymore/mysql-20240322135441.png)

总结一下：

MySQL 的默认存储引擎是 InnoDB，它采用的是 B+树索引，B+树是一种自平衡的多路查找树，和红黑树、二叉平衡树不同，B+树的每个节点可以有 m 个子节点，而红黑树和二叉平衡树都只有 2 个。

和 B 树不同，B+树的非叶子节点只存储键值，不存储数据，而叶子节点存储了所有的数据，并且构成了一个有序链表。

这样做的好处是，非叶子节点上由于没有存储数据，就可以存储更多的键值对，再加上叶子节点构成了一个有序链表，范围查询时就可以直接通过叶子节点间的指针顺序访问整个查询范围内的所有记录，而无需对树进行多次遍历。查询的效率会更高。

### 为什么需要索引

数据库文件是存储在磁盘上的，磁盘 I/O 是数据库操作中最耗时的部分之一。没有索引时，数据库会进行全表扫描（Sequential Scan），这意味着它必须读取表中的每一行数据来查找匹配的行（时间效率为 O(n)）。当表的数据量非常大时，就会导致大量的磁盘 I/O 操作。

有了索引，就可以直接跳到索引指示的数据位置，而不必扫描整张表，从而大大减少了磁盘 I/O 操作的次数。

MySQL 的 InnoDB 存储引擎默认使用 B+ 树来作为索引的数据结构，而 B+ 树的查询效率非常高，时间复杂度为 O(logN)。

索引文件相较于数据库文件，体积小得多，查到索引之后再映射到数据库记录，查询效率就会高很多。

就好像我们通过书的目录，去查找对应的章节内容一样。

![三分恶面渣逆袭：索引加快查询远离](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/mysql-6b9c9901-9bf3-46ed-a5c4-c1b781965c1e.jpg)

### spring的隔离机制，默认是哪一种

事务的隔离级别定义了一个事务可能受其他并发事务影响的程度。SQL 标准定义了四个隔离级别，Spring 都支持，并且提供了对应的机制来配置它们，定义在 TransactionDefinition 接口中。

![二哥的 Java 进阶之路](https://cdn.tobebetterjavaer.com/stutymore/spring-20240326082116.png)

①、ISOLATION_DEFAULT：使用数据库默认的隔离级别（你们爱咋咋滴 😁），MySQL 默认的是可重复读，Oracle 默认的读已提交。

②、ISOLATION_READ_UNCOMMITTED：读未提交，允许事务读取未被其他事务提交的更改。这是隔离级别最低的设置，可能会导致“脏读”问题。

③、ISOLATION_READ_COMMITTED：读已提交，确保事务只能读取已经被其他事务提交的更改。这可以防止“脏读”，但仍然可能发生“不可重复读”和“幻读”问题。

④、ISOLATION_REPEATABLE_READ：可重复读，确保事务可以多次从一个字段中读取相同的值，即在这个事务内，其他事务无法更改这个字段，从而避免了“不可重复读”，但仍可能发生“幻读”问题。

⑤、ISOLATION_SERIALIZABLE：串行化，这是最高的隔离级别，它完全隔离了事务，确保事务序列化执行，以此来避免“脏读”、“不可重复读”和“幻读”问题，但性能影响也最大。

### 你有没有看过哪些框架的源码

我做过一个轮子项目，叫 MYDB，所以对数据可靠性和数据恢复、MVCC（多版本并发控制）、两种事务隔离级别（读提交和可重复读）、死锁处理、简单的表和字段管理、简单的 SQL 解析、基于 socket 的 Server 和 Client通信有比较深入的理解。

![二哥的 Java 进阶之路](https://files.mdnice.com/user/3903/76d56cd6-9c8d-4319-bc41-af5cc6c3fbf0.png)

>附一份球友当时写 MYDB 到简历上的模版：

技术亮点：

- 日志管理：引入数据库日志管理机制，通过日志保障数据一致性，实现故障恢复功能，强化了数据的安全性和稳定性。
- 事务管理：设计事务状态管理模块，支持事务状态的实时查询，增强了事务控制的灵活性和可视化。
- NIO 文件操作：采用 Java NIO 技术优化数据库文件的读写操作，提高数据访问效率。
- MVCC 与锁协议：基于两阶段锁（2PL）协议和 MVCC 实现事务的可串行化，优化了读写并发处理，减少阻塞，支持不同隔离级别的实现。
- 索引与表管理：实现基于 B+ 树的聚簇索引，支持高效的索引查找；并构建表管理器，负责管理表结构和字段信息，包括 SQL 语句的解析功能。
- 网络通信：通过 Socket 编程实现数据库与客户端的通信，支持执行类 SQL 语句并返回查询结果；客户端提供简易 Shell 界面，方便用户操作。


## 参考链接

- 1、三分恶的面渣逆袭，https://javabetter.cn/sidebar/sanfene/nixi.html
- 2、二哥的 Java 进阶之路：https://javabetter.cn