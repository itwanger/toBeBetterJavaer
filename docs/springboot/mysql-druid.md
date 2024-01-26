---
category:
  - Java企业级开发
tag:
  - Spring Boot
title: Spring Boot 整合 MySQL 和 Druid
---

## MySQL 简介

MySQL 是目前项目中运用最广泛的关系型数据库，无论是互联网大厂，还是中小型公司，几乎都在用。

MySQL 体积小、速度快、源码开放，所以广受开发者喜爱。

MySQL 的安装非常简单，针对不同的操作系统，MySQL 都提供了安装包的下载。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/mysql-druid-f75e7dfe-7dc2-43b2-94d1-68ff775cd2ed.png)

MySQL 目前主推的版本是 8.0，参考手册的地址如下所示：

>[https://dev.mysql.com/doc/refman/8.0/en/](https://dev.mysql.com/doc/refman/8.0/en/)

## 如何安装 MySQL

我在讲 MySQL 的时候也有专门讲过，更详细：[MySQL 的安装(Windows、macOS、Linux)](https://javabetter.cn/mysql/install.html)

如果有云服务器的话，建议安装在云服务器上，这样就可以长时间运行 MySQL 而不用担心服务重启的问题。按照步骤参照下面的文档。

>[https://dev.mysql.com/doc/refman/8.0/en/linux-installation.html](https://dev.mysql.com/doc/refman/8.0/en/linux-installation.html)

也可以直接通过宝塔面板的形式来安装，这样更省事省力省心。

>宝塔面板安装脚本地址：[https://www.bt.cn/new/download.html](https://www.bt.cn/new/download.html)


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/mysql-druid-89f6d126-b059-4511-b64d-720aa8df354f.png)

安装完成后，就可以在数据库管理页面添加数据库并且进行管理了。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/mysql-druid-86d80ab6-968e-42ec-a532-1eeb341779c1.png)



如果是 Windows 用户的话，安装步骤参照下面的文档。

>[https://dev.mysql.com/doc/refman/8.0/en/windows-installation.html](https://dev.mysql.com/doc/refman/8.0/en/windows-installation.html)

如果是 macOS 用户的话，安装步骤参照下面的文档。

>[https://dev.mysql.com/doc/refman/8.0/en/macos-installation-pkg.html](https://dev.mysql.com/doc/refman/8.0/en/macos-installation-pkg.html)

Windows 和 macOS 的安装都非常的简单，主要就是下载对应操作系统的 MySQL 包安装管理器。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/mysql-druid-ab94f6df-2031-42ff-8746-b4ad5a4e3a81.png)

然后按照包安装向导的提示一步步傻瓜式安装即可。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/mysql-druid-e7031aec-74c5-4079-a6f3-97368c921620.png)

## Spring Boot 整合 MySQL 数据库

Spring Boot 整合 MySQL 数据库非常简单，只需要添加 MySQL 依赖并在配置文件中添加数据库配置即可。我们可以不用编写原始的访问数据库的代码，也不用调用 JDBC 或者连接池就可以访问 MySQL。

1）使用 Intellij IDEA 新建一个 Spring Boot 项目，使用 Java 8 版本「社区版没有此功能，需要到 (Spring initializr)[https://start.spring.io/]）生成项目后导入，推荐使用旗舰版，功能更加强大」。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/mysql-druid-d7765111-9dcb-4125-a87a-da1439a0a6cf.png)


添加 MySQL 的 Java连接驱动依赖和 JDBC Starter。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/mysql-druid-201eb6fa-0a09-46d7-a555-3988bee92a9f.png)


对应pom.xml文件中的代码：

```
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
</dependency>
```

**2）通过宝塔面板新建codingmore-mysql数据库并添加数据表**

```
CREATE TABLE `user` (
  `id` int NOT NULL,
  `name` varchar(10) NOT NULL,
  `password` varchar(10) NOT NULL,
  `age` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- 转储表的索引
--

--
-- 表的索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);
COMMIT;
```

然后插入一条数据：

```
INSERT INTO `user` (`id`, `name`, `password`, `age`) VALUES ('1', '沉默王二', ' 123456', '18');
```

我把 SQL 语句放在源码的 resouces 目录里了

**3）在 application.yml 文件中添加数据库链接驱动信息**

```
spring:
  datasource:
    username: codingmore-mysql
    password: YyfR4TDxCwrjZ2Fs
    url:jdbc: mysql://118.190.99.232:3306/codingmore-mysql?useUnicode=true&characterEncoding=utf-8&serverTimezone=Asia/Shanghai&useSSL=false
```

推荐安装 Spring Initializr and assistant 插件。可以自动补全配置信息。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/mysql-druid-be486130-539a-49b5-ac6f-dc1bf7f8cba6.png)

**4）新建实体类 User.java**

```java
@Data
public class User {
    private Integer id;
    private String name;
    private String password;
    private Integer age;
}
```

建议在 pom.xml 文件中添加 lombok 的依赖。

```
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.20</version>
</dependency>
```

**5）在测试类中添加以下代码**

```java
@SpringBootTest
@Slf4j
class CodingmoreMysqlApplicationTests {
    @Resource
    private JdbcTemplate jdbcTemplate;

    @Test
    void contextLoads() {
        String sql ="select * from user";
        List<User> users = jdbcTemplate.query(sql, new RowMapper<User>() {
            @Override
            public User mapRow(ResultSet rs, int rowNum) throws SQLException {
                User user = new User();
                user.setId(rs.getInt(1));
                user.setAge(rs.getInt("age"));
                user.setName(rs.getString("name"));
                user.setPassword(rs.getString("password"));
                return user;
            }
        });
        log.info("查询成功");
        log.info("用户{}",users);
    }
}
```

Spring Boot 的测试类主要放置在 `src/test/java` 目录下面，项目创建成功后，Spring Boot 会根据项目名称自动为我们生成测试类。

比如说本次项目名为 codingmore-mysql，那么测试类名为 CodingmoreMysqlApplicationTests。

`@SpringBootTest` 注解能够测试我们的项目主类，该项目为 CodingmoreMysqlApplication。

`@Test` 注解是 junit 单元测试的注解，表示该方法为测试方法。

`JdbcTemplate` 一个通过 JDBC 连接数据库的工具类，spring-boot-starter-jdbc 依赖中包含了该类。

`@Resource` 注解会帮我们在 Spring Boot 启动的时候注入一个 JdbcTemplate 的对象。

`jdbcTemplate.query()` 方法通过 SQL 语句和匿名内部类参数的形式，执行 SQL 并查询结果集。

`RowMapper` 就是查询到的每一行数据对象，我们可以通过重写 mapRow 方法将数据结果集封装到 User 对象上。

右键菜单运行 testMysql 方法就可以在日志中看到 SQL 执行的结果。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/mysql-druid-92a53c8e-e99a-4ca6-8ad1-f5ec4653da3b.png)

## 如何通过 Navicat 连接 MySQL

Navicat 是一个从我参加工作到现在一直都在用的 MySQL 客户端工具，通过 Navicat 可以轻松连接数据库，并执行增删改查操作。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/mysql-druid-2daef9fc-4a97-41bb-bd1c-875f468d90bc.png)

连接数据库也非常的简单，只需要填写主机 IP 地址、端口、用户名和密码即可。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/mysql-druid-18d120ea-0f84-4ca0-b0fd-020587e43fc4.png)

## 如何通过 Intellij IDEA 连接 MySQL

除了 Navicat，还可以使用 Intellij IDEA 直连 MySQL。

点击「database」面板，在左上角选择 + 号，选择 DataSource，再选择 MySQL。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/mysql-druid-070ab8b8-0629-4238-b35d-438dbcbb130e.png)

在弹出面板中填写连接信息。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/mysql-druid-29ba218a-7528-49bf-b2da-c5fa48b40d2b.png)

如果是第一次连接 MySQL 的话，记得点击「download」下载 MySQL 驱动，之后点击「test connection」测试是否链接成功，如果出现以下界面，则表示 OK。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/mysql-druid-1b86d117-412c-47a2-82c8-c22f9bcf6455.png)

选择右侧的数据库表，双击，就可以查看到数据了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/mysql-druid-8c0288ae-ee22-4983-8d91-7ed7125b17a5.png)

在「console」SQL 查询面板里可以编写 SQL 语句来执行增删改查操作。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/mysql-druid-e1c9e85c-382a-40a8-a4fa-3fe32ee612fb.png)

## Spring Boot 整合 Druid

Druid 是阿里巴巴开源的一款数据库连接池，结合了C3P0、DBCP 等 DB 池的优点，同时还加入了日志监控。

Druid 在 GitHub 上已经收获了 25.4k 的 star，可以说非常的知名，从简介上也能看得出，Druid 就是为了监控而生的。

> [https://github.com/alibaba/druid/](https://github.com/alibaba/druid/)


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/mysql-druid-a1f53d5b-1048-4707-bebc-1a59d7793880.png#id=n2yqp&originHeight=552&originWidth=1100&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

Druid 包含了三个重要的组成部分：

- DruidDriver，能够提供基于 Filter-Chain 模式的插件体系；
- DruidDataSource，高效可管理的数据库连接池；
- SQLParser，支持所有 JDBC 兼容的数据库，包括 Oracle、MySQL 等。

Spring Boot2.0 以上默认使用的是 Hikari 连接池，我们从之前的日志信息里就可以看得到。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/mysql-druid-0982b47e-b211-41a6-ab88-355e1d2ae7be.png#id=K9tfC&originHeight=564&originWidth=2744&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

那如果我们想使用 Druid 的话，该怎么整合呢？

这次我们直接在编程喵项目后端项目 codingmore-admin 上进行修改。

第一步，在 pom.xml 文件中添加 Druid 的依赖，官方已经提供了 starter，我们直接使用。

```
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid-spring-boot-starter</artifactId>
    <version>1.1.23</version>
</dependency>
```

第二步，在 application.yml 文件中添加 Druid 配置。

```
spring:
  datasource:    
    type: com.alibaba.druid.pool.DruidDataSource
    druid:
      #初始化连接池大小
      initial-size: 5
      #配置最小连接数
      min-idle: 5
      #配置最大连接数
      max-active: 200
      #配置连接等待超时时间
      max-wait: 60000
      #配置间隔多久才进行一次检测，检测需要关闭的空闲连接，单位是毫秒
      time-between-eviction-runs-millis: 60000
      #配置一个连接在池中最小生存的时间，单位是毫秒
      min-evictable-idle-time-millis: 300000
      #测试连接
      validation-query: SELECT 1 FROM DUAL
      #申请连接的时候检测，建议配置为true，不影响性能，并且保证安全
      test-while-idle: true
      #获取连接时执行检测，建议关闭，影响性能
      test-on-borrow: false
      #归还连接时执行检测，建议关闭，影响性能
      test-on-return: false
      #是否开启PSCache，PSCache对支持游标的数据库性能提升巨大，oracle建议开启，mysql下建议关闭
      pool-prepared-statements: false
      #开启poolPreparedStatements后生效
      max-pool-prepared-statement-per-connection-size: 20
      #配置扩展插件，常用的插件有=>stat:监控统计  log4j:日志  wall:防御sql注入
      filters: stat,wall,slf4j
      #打开mergeSql功能；慢SQL记录
      connection-properties: druid.stat.mergeSql\=true;druid.stat.slowSqlMillis\=5000
      #配置DruidStatFilter
      web-stat-filter:
        enabled: true
        url-pattern: "/*"
        exclusions: "*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico,/druid/*"
      #配置DruidStatViewServlet
      stat-view-servlet:
        url-pattern: "/druid/*"
        #登录名
        login-username: root
        #登录密码
        login-password: root
```

第三步，重启项目。在日志信息里可以看到 Druid 的初始化信息。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/mysql-druid-06115c50-5741-482f-b5c0-45c55017098f.png#id=Wnc1o&originHeight=642&originWidth=2244&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

第四步，通过 `http://localhost:9002/druid/` 地址就可以在浏览器访问 Druid 的监控页面了，用户名和密码是我们在配置文件里指定的 root 和 root，登录后是这样的。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/mysql-druid-daaf401e-e4c4-4057-9b3b-d605eefb6eb3.png#id=C7ZKf&originHeight=1546&originWidth=2744&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

更多关于监控的配置信息，可以到 Druid 的 GitHub 仓库查看。

> [https://github.com/alibaba/druid/wiki/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98](https://github.com/alibaba/druid/wiki/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98)


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/mysql-druid-a5db84fc-1030-4a38-824d-4e649ad2b768.png#id=hcluY&originHeight=1020&originWidth=1414&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### 源码地址

> - 编程喵 GitHub：[https://github.com/itwanger/coding-more](https://github.com/itwanger/coding-more)
> - codingmore-mysql：[https://github.com/itwanger/codingmore-learning/tree/main/codingmore-mysql](https://github.com/itwanger/codingmore-learning/tree/main/codingmore-mysql)


----

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
