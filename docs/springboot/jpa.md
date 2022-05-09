---
category:
  - Java企业级开发
tag:
  - Spring Boot
title: Spring Boot 整合 JPA
---

### 关于 Spring Data JPA

Spring Data 是 Spring 提供的一个操作数据的框架，Spring Data JPA是 Spring Data 下的一个基于 JPA 标准的操作数据的模块。

JPA（Java Persistence API）是 Java 亲妈 Sun 公司提出的一套 Java 持久化规范。所谓规范，就是只定义标准，不提供实现。

JPA 的提出主要是为了整合市面上已有的 ORM 框架，比如说 Hibernate、EclipseLink 等。官方觉得你们搞框架可以，但不要乱搞，得按照我的标准来。

Spring Data JPA 只是一个抽象层，它上接 JPA 下接 ORM 框架，通过基于 JPA 的 Respository 接口极大地减少了 JPA 作为数据访问方案的代码量，简化了持久层开发并且屏蔽了各大 ORM 框架的差异。

总结一下就是：

- JPA 是规范，统一了规范才便于使用。
- Hibernate 是 JPA 的实现，是一套成熟的 ORM 框架。
- Spring Data JPA 是 Spring 提出的，它增加了一个抽象层，用来屏蔽不同 ORM 框架的差异。

### 整合 Spring Data JPA

第一步，在 pom.xml 文件中添加 JPA 的 starter 依赖。

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```

第二步，在 application.yml 文件中添加数据库连接信息。

```
spring:
  datasource:
    username: codingmore-mysql
    password: dddd
    url: jdbc:mysql://xxxx:3306/codingmore-mysql?useUnicode=true&characterEncoding=utf-8&serverTimezone=Asia/Shanghai&useSSL=false
```

第三步，新建实体类 User.java。

```java
@Data
@Entity
@Table(name = "user")
public class User {
    @Id
    private Integer id;
    private Integer age;
    private String name;
    private String password;
}
```

- `@Data` 注解为 lombok 注解，会自动为该类添加 getter/setter 方法。
- `@Entity` 和 `@Table` 注解都是 JDK 1.5 以后引入的元数据注解，遵循 JPA 规范中定义的查询语言 JPQL，类似 SQL 语法，适用于 Java 类。
- `@Entity` 表明该类是一个实体类，默认使用 ORM 规则，即类名为数据库表名，类中的字段名为数据库表中的字段名。
- `@Table` 注解是非必选项，它的优先级高于 `@Entity` 注解，比如说 `@Entity(name="user")` 和 `@Table(name="users")` 同时存在的话，对应的表名为 users。
- `@Id` 表名该字段为主键字段，当声明了 @Entity 注解，`@Id` 就必须也得声明。


这里推荐大家在 Intellij IDEA 中安装 JPA Buddy 插件，该插件提供了可视化的代码生成器，可以帮我们简化 JPA 的开发工作。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/jpa-dbd461e0-f74b-4914-9f79-37c09bce8db4.png)

安装完 JPA Buddy 插件后，当我们创建好实体类后，会自动打开三个面板：JPA Structure，JPA Palette和JPA Inspector。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/jpa-f8e43568-d286-4da6-a61a-c88b50642824.png)

>更多详细介绍：[https://codingdict.com/blog/1406](https://codingdict.com/blog/1406)

在JPA Buddy 插件的帮助下，我们其实可以直接在项目的目录上右键选择通过 JPA 的方式创建实体类。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/jpa-ef1d4416-1ac5-4ad8-b305-dafd454cec3b.png)

选择数据表。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/jpa-64ad825d-2e53-4315-9fad-3d053d958303.png)

代码如下所示：

```java
@Entity
@Table(name = "user")
public class User {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false, length = 10)
    private String name;

    @Column(name = "password", nullable = false, length = 10)
    private String password;

    @Column(name = "age", nullable = false)
    private Integer age;

    // 省略 getter/setter

}
```


第四步，新建 UserRepository 接口。

在项目路径上右键，选择新建 JPA Repository。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/jpa-1114773a-a507-48e9-a1a1-781a89cc517e.png)

生成的代码如下：

```java
public interface UserRepository extends JpaRepository<User, Integer> {
}
```

如果只是简单的对表进行增删改查操作，那么只需要继承 JpaRepository 接口，并传递两个参数（第一个为实体类，第二个为主键类型）即可。

第五步，新建服务接口 UserService 和实现类 UserServiceImpl。

```java
public interface UserService {
    User findById(Integer id);
    List<User> findAll();
    User save(User user);
    void delete(Integer id);
}
```

UserService 定义了 4 个方法：

- findById 根据 ID 查询单条记录
- findAll 查询所有
- save 用来保存和更新
- delete 用来删除

```java
@Service
public class UserServiceImpl implements UserService{
    @Resource
    private UserRepository userRepository;

    @Override
    public User findById(Integer id) {
        return userRepository.getById(id);
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public void delete(Integer id) {
        userRepository.deleteById(id);
    }
}
```

- `@Service` 注解用在服务层，和 `@Component` 注解作用类似（通用注解），Spring Boot 会自动扫描该类注解注解的类，并把它们假如到 Spring 容器中。
- `@Resource` 和 `@Autowired` 注解都是用来自动装配对象的，可以用在字段上，也可以用在 setter 方法上。@Autowired 是 Spring 提供的注解，@Resource 是 Java 提供的注解，也就是说，如果项目没有使用 Spring 框架而是 JFinal 框架，@Resource 注解也是支持的。另外，@Resource 是 byName 自动装配，@Autowired 是 byType 自动装配，当有两个类型完全一样的对象时，@Autowired 就会出错了。

>苏三写了一篇@Autowired的文章，很不错：[https://www.zhihu.com/question/39356740](https://www.zhihu.com/question/39356740)

当然了，只是简单的增删改查已经不能提起我们学习的兴趣了，必须得来点不一样的，所以我们在 UserService 接口中添加一个分页的接口。

```java
Page<User> findAll(Pageable pageable);
```

实现类：

```java
@Override
public Page<User> findAll(Pageable pageable) {
    return userRepository.findAll(pageable);
}
```

- Pageable 是 Spring 提供的一个分页查询接口，查询的时候只需要传入一个 Pageable 接口的实现类，指定第几页（pageNumber）和页面大小（pageSize）即可。
- Page 是 Spring 提供的一个分页返回结果接口。

再增加一个自定义查询接口（按照 name 的模糊查询）吧。

首先是 UserRepository，直接用 JPA Buddy 插件：


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/jpa-d4f2619a-85ea-437f-860d-3738669b4582.png)

生成的代码如下：

```java
public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findByNameLikeIgnoreCase(String name);
}
```

然后是 UserService 接口：

```java
List<User> findByNameLikeIgnoreCase(String name);
```

最后是 UserServiceImpl：

```java
@Override
public List<User> findByNameLikeIgnoreCase(String name) {
    return userRepository.findByNameLikeIgnoreCase(name);
}
```

### 测试 Spring Data JPA

在测试类中对服务类中的 5 个接口进行测试，顺带在application.yml 中开启 SQL 语句的输出，看看 JPA 自动生成的 SQL 语句到底长什么样子。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/jpa-a3d8641a-c701-47bb-ae44-f53eb8e05f65.png)

测试类非常简单哈：

```java
@SpringBootTest
@Slf4j
class CodingmoreJpaApplicationTests {
    @Resource
    private UserService userService;

    @Test
    void contextLoads() {
        // 查询所有
        userService.findAll().stream().forEach(user -> log.info("查询所有{}", user));

        // 新增数据
        userService.save(new User().setId(2).setAge(12).setName("沉默王三").setPassword("123456"));
        userService.save(new User().setId(3).setAge(12).setName("沉默王四").setPassword("123456"));
        userService.save(new User().setId(4).setAge(12).setName("沉默王五").setPassword("123456"));

        // 分页查询
        userService.findAll(PageRequest.of(1,2)).stream().forEach(user -> log.info("分页查询{}", user));
        // 模糊查询
        log.info("模糊查询{}",userService.findByNameLike("沉默"));
        // 删除
        userService.delete(1);
    }
}
```

从日志当中可以看得出，Spring Data JPA 默认使用的是 Hibernate 框架，这是查询全部：

```
Hibernate: select user0_.id as id1_0_, user0_.age as age2_0_, user0_.name as name3_0_, user0_.password as password4_0_ from user user0_
```

这是保存：

```
Hibernate: insert into user (age, name, password, id) values (?, ?, ?, ?)
```

这是更新：

```
Hibernate: update user set age=?, name=?, password=? where id=?
```

这是分页：

```
Hibernate: select user0_.id as id1_0_, user0_.age as age2_0_, user0_.name as name3_0_, user0_.password as password4_0_ from user user0_ limit ?, ?
```

这是模糊查询：

```
Hibernate: select user0_.id as id1_0_, user0_.age as age2_0_, user0_.name as name3_0_, user0_.password as password4_0_ from user user0_ where user0_.name like ? escape ?
```

不过，这个模糊查询不符合我们的预期，没有前后的 `%`，我们可以选择 Spring Data 提供的 `@Query` 来自定义 SQL 语句。

默认情况下，`@Query` 注解会使用 JPQL 来进行查询。举个例子：

```java
@Query("select u from User u where u.name like concat('%',?1,'%')")
List<User> findByNameLike(String name);
```

`@Query` 注解中的 “User” 为实体类的类名，而非数据库的表名 user，这就是 JPQL 和原生 SQL 的区别。来看原生 SQL 的写法：

```java
@Query(value = "SELECT * FROM user u WHERE u.name like '%'|| ?1 || '%'",
        nativeQuery = true)
List<User> findByNameLikeNativeQuery(String name);
```

`@Query` 注解中的 “user” 为数据库表名，另外需要加上参数 nativeQuery，默认值为 false，设为 true 表明开启原生 SQL 查询。注意这次我们用“||”替换了“concat” 方法。

除了使用 `?1`、`?2` 的形式来动态传递参数，我们还可以使用 `@Param` 注解的形式来传递参数，此时的 SQL 语句中采用 `:param` 形式来接收参数。

```java
@Query("select u from User u where u.name like concat('%',:name,'%')")
List<User> findByNameLikeParam(@Param("name")String name);
```

这是删除：

```
Hibernate: delete from user where id=?
```

### Spring Data JPA 还是 MyBatis

在以往我参与的项目当中，无一例外都选择的是 MyBatis。国内采用 MyBatis 作为 ORM 框架的要比 Spring Data JPA 多得多。

我想原因有这么几个：

1）MyBatis 是针对SQL 的，上手难度比 Spring Data JPA 面向 JPQL 要稍微容易一些。但在 Intellij IDEA 这种集成开发环境的代码提示下，优势并不大。

2）Spring Data JPA 的资料相对少一些，而 MyBatis 的资料可以说非常全面了，遇到问题基本上都能找到解决方案，另外像 MyBatis-Plus 的出现，在一定程度上增强了 MyBatis 的能力。

3）Spring Data JPA 一开始在动态 SQL 能力上不如 MyBatis，但随着 Spring Boot 和 Spring Data JPA 的无缝衔接，Spring Data JPA 的应用会越来越广泛，事实上，国外用 Spring Data JPA 的就比 MyBatis 的多一些。

那在以后的项目当中，我会更加倾向于 Spring Data JPA，原因有这么几点：

1）新项目不用事先设计数据库和表结构，开发过程中可以自动根据实体类生成数据库和表结构，更容易快速迭代。

2）能减少切换数据库带来的改造成本，因为 Spring Data JPA 底层屏蔽了 ORM 框架的差异性；再者不用写原生 SQL 的话，也屏蔽了数据库之间的 SQL 差异性。

3）持久层的代码量更少，维护起来更加简单和方便，更多的时候，只需要维护 entity 和 Respository 接口之间的映射关系就可以了。

### 源码地址：

> - 编程喵：[https://github.com/itwanger/coding-more](https://github.com/itwanger/coding-more)
> - Spring Boot 整合 JPA：[https://github.com/itwanger/codingmore-learning](https://github.com/itwanger/codingmore-learning)



---

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png)