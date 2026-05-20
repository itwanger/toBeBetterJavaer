---
title: 利用Spring Boot实现MySQL数据库的自动创建，666
shortTitle: MySQL 的数据库操作
---


[MySQL 安装完成并连接](https://javabetter.cn/mysql/install.html)成功后，就可以创建数据库进行操作了。

执行 `show databases;` 命令可以查看当前数据库的所有数据库。

![](https://cdn.paicoding.com/stutymore/database-20240125185015.png)

注意在 MySQL 客户端执行 SQL 语句的时候要带上分号 `;` 并按下 enter 键，不然 MySQL 会认为你还没有输入完，会换一行继续等待你输入。

![](https://cdn.paicoding.com/stutymore/database-20240125185214.png)

也就是说，分号 `;` 是 MySQL 的语句结束符。

OK，像上面截图中的 information_schema、mysql、performance_schema、sys 这些都是 MySQL 自带的数据库，剩余的 cmower、codingmore、jeesite、jepf、pai_coding 等都是我本地创建的数据库，这些数据库名大家很容易就联系到某些有点名气的开源项目，比如说技术派。

[二哥的 MySQL 进阶之路](https://javabetter.cn/mysql/)会结合[技术派实战项目](https://javabetter.cn/zhishixingqiu/paicoding.html)来讲解 MySQL 的基本操作。

上面截图中的 pai_coding 就是技术派项目的数据库。对技术派项目还不太了解的小伙伴可以戳下面的链接了解：

[二哥的原创实战项目技术派详细介绍](https://javabetter.cn/zhishixingqiu/paicoding.html)

## 创建数据库

创建数据库的语法是：

```sql
create database 数据库名;
```

比如说我要创建一个名为 `test` 的数据库，就可以执行：

```sql
create database test;
```

如果提示 `Query OK, 1 row affected (0.02 sec)`，说明数据库创建成功了。

再用 `show databases;` 命令查看一下，就可以看到 `test` 数据库了。

>一个小技巧：MySQL 会记忆之前输入过的命令，使用键盘上的上下箭头按键可以切换命令。

![](https://cdn.paicoding.com/stutymore/database-20240125190817.png)

通常情况下，我们在创建数据库的时候会额外加上 `if not exists`，否则当数据库已经存在的时候，会报 `database exists` 的错误。

```sql
create database test;
ERROR 1007 (HY000): Can't create database 'test'; database exists
```

我们可以这样写：

```sql
create database if not exists test;
Query OK, 1 row affected, 1 warning (0.00 sec)
```

可以看到，SQL 语句执行成功了，但会有一个 warning 警告，这是因为数据库已经存在了，所以 MySQL 会提示我们。

## 切换数据库

切换数据库的语法是：

```sql
use 数据库名;
```

比如说我们要切换到技术派的 `pai_coding` 数据库，就可以执行：

```sql
use pai_coding;
```

如果提示 `Database changed`，说明切换成功了。

![](https://cdn.paicoding.com/stutymore/database-20240126160536.png)

只有切换到技术派数据库下，我们才能对技术派数据库下面的表进行操作。

![](https://cdn.paicoding.com/stutymore/database-20240126161020.png)

## 删除数据库

删除数据库的语法是：

```sql
drop database 数据库名;
```

比如说我们要删除 `test` 数据库，就可以执行：

```sql
drop database test;
```

是不是很简单？

但删库跑路之前，最好掐一下自己的大腿，看看自己是不是清醒着，不然后悔都来不及（😂）。

删除数据库的时候，也可以带上 `if exists`，这样当数据库不存在的时候，就不会报错了。

```sql
drop database if exists test;
```

## 技术派是如何创建数据库的？

技术派创建数据库是自动完成的，当项目启动的时候就会自动创建数据库。

具体实现的方法我放在了技术派的教程里，大家可以通过这个链接获取技术派实战教程。

[二哥的原创实战项目技术派详细介绍](https://javabetter.cn/zhishixingqiu/paicoding.html)

![](https://cdn.paicoding.com/stutymore/database-20240126170719.png)

这里我做一些简单的介绍，实现源码在 ForumDataSourceInitializer 这个类中。

![](https://cdn.paicoding.com/stutymore/database-20240126170743.png)

注意看 autoInitDatabase 方法，这里是自动创建数据库的逻辑。

```java
private boolean autoInitDatabase() {
    // 查询失败，可能是数据库不存在，尝试创建数据库之后再次测试

    // 数据库链接
    URI url = URI.create(SpringUtil.getConfigOrElse("spring.datasource.url", "spring.dynamic.datasource.master.url").substring(5));
    // 用户名
    String uname = SpringUtil.getConfigOrElse("spring.datasource.username", "spring.dynamic.datasource.master.username");
    // 密码
    String pwd = SpringUtil.getConfigOrElse("spring.datasource.password", "spring.dynamic.datasource.master.password");
    // 创建连接
    try (Connection connection = DriverManager.getConnection("jdbc:mysql://" + url.getHost() + ":" + url.getPort() +
            "?useUnicode=true&characterEncoding=UTF-8&useSSL=false", uname, pwd);
            Statement statement = connection.createStatement()) {
        // 查询数据库是否存在
        ResultSet set = statement.executeQuery("select schema_name from information_schema.schemata where schema_name = '" + database + "'");
        if (!set.next()) {
            // 不存在时，创建数据库
            String createDb = "CREATE DATABASE IF NOT EXISTS " + database;
            connection.setAutoCommit(false);
            statement.execute(createDb);
            connection.commit();
            log.info("创建数据库（{}）成功", database);
            if (set.isClosed()) {
                set.close();
            }
            return true;
        }
        set.close();
        log.info("数据库已存在，无需初始化");
        return false;
    } catch (SQLException e2) {
        throw new RuntimeException(e2);
    }
}
```

逻辑很简单，就是根据 URL、用户名、密码创建数据库连接，客户端到服务端的连接，然后从 `information_schema.schemata` 表中查询数据库是否存在，如果不存在，就创建数据库。

用的是最原始的 JDBC 方式，以及一些 Spring 方面的知识，这里就不展开了。大家看代码注释应该是能懂的。

information_schema 是 MySQL 的元数据信息，数据库的信息会存放在 schemata 表中。我们可以通过终端查看到 schemata 表的结构。

![](https://cdn.paicoding.com/stutymore/database-20240126171959.png)

这里给大家留一个作业题，如果你之前学过 Java 或者 Spring Boot 的话，可以仿照技术派的方式实现一个自动创建数据库的功能。

### Java 原生

Java 原生代码需要你先下载一个 MySQL 的 JDBC 驱动，驱动的作用是让 Java 程序能够和 MySQL 数据库进行交互。

[MySQL Connector/J](https://dev.mysql.com/downloads/connector/j/) 

![](https://cdn.paicoding.com/stutymore/database-20240126174913.png)


将下载的 `.jar` 包放到项目 classpath 下，什么是 classpath，一般就是项目的 `src/main/resources` 目录，或者是项目的 `lib` 目录。

接下来，编写一个 Java 类来连接到 MySQL 服务器，并在数据库不存在时创建它：

```java
class DatabaseCreator {
    private static final String URL = "jdbc:mysql://localhost:3306/?useSSL=false&serverTimezone=UTC";
    private static final String USER = "root";
    private static final String PASSWORD = "Codingmore123";
    private static final String DATABASE_NAME = "pai_coding";

    public static void main(String[] args) {
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             Statement stmt = conn.createStatement()) {

            if (!databaseExists(conn, DATABASE_NAME)) {
                stmt.executeUpdate("CREATE DATABASE IF NOT EXISTS " + DATABASE_NAME);
                System.out.println("数据库创建成功");
            } else {
                System.out.println("数据库已经存在");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private static boolean databaseExists(Connection conn, String dbName) throws SQLException {
        ResultSet resultSet = conn.getMetaData().getCatalogs();

        while (resultSet.next()) {
            if (dbName.equals(resultSet.getString(1))) {
                return true;
            }
        }

        return false;
    }
}
```

这里简单解释一下大家可能比较陌生的代码：

先说 main 方法：

①、`DriverManager.getConnection(URL, USER, PASSWORD)`：通过 JDBC 建立到 MySQL 服务器的连接。

②、`conn.createStatement()`：创建一个 Statement 对象来执行 SQL 命令。

③、`stmt.executeUpdate("CREATE DATABASE IF NOT EXISTS " + DATABASE_NAME)`：执行 SQL 命令，创建数据库。这就和我们本篇的主题串起来了，哈哈😆。

再说 databaseExists 方法：

①、使用 Connection 对象的 `getMetaData()` 方法可以获取数据库的元数据。这个元数据包含了服务器上所有数据库的信息。

②、`getCatalogs()` 方法可以获取服务器上所有数据库的列表，返回的 ResultSet 对象包含了服务器上每个数据库的名称。

③、`resultSet.getString(1)` 方法可以获取当前行第一列的值，也就是数据库的名称。

### Spring Boot

Spring Boot 项目的话，就比较省事了，不用去下载驱动，直接在 pom.xml 文件中添加 MySQL 的驱动依赖就可以了。

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.19</version>
</dependency>
```

接着在 application.yml 配置文件中，设置数据库的基本连接信息。

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/?useSSL=false&serverTimezone=UTC
    username: root
    password: 123456
```

然后在 Spring Boot 的测试类中进行数据库创建操作。

```java
@Slf4j
@SpringBootTest(classes = QuickForumApplication.class)
@RunWith(SpringJUnit4ClassRunner.class)
public class DatabaseCreationTest {

    @Autowired
    private DataSource dataSource;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Test
    public void createDatabaseTest() throws SQLException {
        String dbName = "pai_coding";
        if (!databaseExists(dbName)) {
            jdbcTemplate.execute("CREATE DATABASE IF NOT EXISTS " + dbName);
            System.out.println("创建成功");
        } else {
            System.out.println("已存在");
        }
    }

    private boolean databaseExists(String dbName) throws SQLException {
        try (Connection connection = dataSource.getConnection();
             Statement statement = connection.createStatement()) {
            ResultSet set = statement.executeQuery("select schema_name from information_schema.schemata where schema_name = '" + dbName + "'");
            return set.next();
        }
    }
}
```

这里也简单解释一下大家可能比较陌生的代码：

①、`@Slf4j`：[Lombok 库](https://javabetter.cn/springboot/lombok.html)提供的注解，用于自动创建日志对象（比如 Logger）。

②、`@SpringBootTest(classes = QuickForumApplication.class)`：表示这是一个 Spring Boot 的集成测试类，它会加载[技术派项目](https://javabetter.cn/zhishixingqiu/paicoding.html) QuickForumApplication 类指定的 Spring Boot 应用程序上下文。

③、`@RunWith(SpringJUnit4ClassRunner.class)`：使用 JUnit4 来支持 Spring 上下文测试。

④、`@Autowired`：自动注入 DataSource 和 JdbcTemplate 对象。

大家可以尝试下，看看能不能成功。

关于 Spring Boot 的更多知识，可以参考：[Spring Boot 进阶之路](https://javabetter.cn/springboot/)

源码：[DatabaseCreationTest](https://github.com/itwanger/paicoding/blob/main/paicoding-web/src/test/java/com/github/paicoding/forum/test/mysql1/DatabaseCreationTest.java)

## 小结

本篇我们主要讲解了 MySQL 数据库的基本操作，包括创建数据库、切换数据库、删除数据库。

并结合技术派实战项目来讲解了技术派是如何自动创建数据库的。以及如何通过 Java 原生代码和 Spring Boot 项目来创建数据库。

希望大家动动手，练习一下，实战和理论真正的结合起来，冲鸭😁。

----

GitHub 上标星 17000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 17000+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.paicoding.com/tobebetterjavaer/images/gongzhonghao.png)