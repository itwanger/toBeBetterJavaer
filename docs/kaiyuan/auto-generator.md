

作为一名 Java 后端开发，日常工作中免不了要生成数据库表对应的持久化对象 PO，操作数据库的接口 DAO，以及 CRUD 的 XML，也就是 mapper。

Mybatis Generator 是 MyBatis 官方提供的一个代码生成工具，完全可以胜任这个工作，不过最近在开发“编程猫”开源网站的时候试用了一下 MyBatis-Plus 官方提供  AutoGenerator，发现配置更简单，开发效率更高！于是就来给小伙伴们安利一波。

来个 GIF 感受一下 AutoGenerator 生成代码的快感吧。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/kaiyuan/auto-generator-1.gif)


### 一、使用 Mybatis Generator

为了形成鲜明的对比，我们先来使用 Mybatis Generator 生成一次代码，感受一下整个过程。

第一步，在 pom.xml 文件中添加 MySQL+MyBatis 的依赖（Mybatis Generator 的前置条件）。

```
<!-- MySQL 连接池 -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>${mysql.version}</version>
</dependency>
<!--MyBatis 的 Spring Boot starter -->
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.2.2</version>
</dependency>
```

添加完成后，一定要执行一次 Maven 重载（见下图），确保 MyBatis 的依赖加载完毕后再执行第二步。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/kaiyuan/auto-generator-2.png)


否则下一步可能不通过，但又得不到任何错误提示。不要问我为什么，踩过坑后痛苦的领悟。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/kaiyuan/auto-generator-3.png)

添加完成后，可以通过 Maven 插件来生成代码，也可以通过 Java 代码来生成代码，这里以 Maven 插件的形式来演示。Java 代码的形式可参照 Mybatis Generator：

>https://mybatis.org/generator/running/runningWithJava.html

第二步，在 pom.xml 的 MyBatis Generator 插件，先来看一下整体的结构图，注意是在 build→plugins 下节点下添加。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/kaiyuan/auto-generator-4.png)

首先是 MyBatis Generator 插件，目前最新版是 1.4.0，我们采用上一个稳定版本 1.3.7，稳一点。

```
<groupId>org.mybatis.generator</groupId>
<artifactId>mybatis-generator-maven-plugin</artifactId>
<version>1.3.7</version>
```

只添加插件还不够，还需要对其进行配置，我们使用 configurationFile 元素来指定一个配置文件 mybatis-generator-config.xml：

```
<configurationFile>src/main/resources/mybatis-generator-config.xml</configurationFile>
```

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/kaiyuan/auto-generator-5.png)

来看一下 mybatis-generator-config.xml 的内容。

```
<generatorConfiguration>
    <context id="myContext" targetRuntime="MyBatis3" defaultModelType="flat">

        <!-- 注释 -->
        <commentGenerator>
            <!-- 是否不生成注释 -->
            <property name="suppressAllComments" value="true"/>
        </commentGenerator>

        <!-- jdbc连接 -->
        <jdbcConnection driverClass="com.mysql.cj.jdbc.Driver"
                        connectionURL="jdbc:mysql://ip:3306/codingmoretiny02?useUnicode=true&amp;characterEncoding=utf-8&amp;serverTimezone=Asia/Shanghai&amp;useSSL=false"
                        userId="codingmoretiny02"
                        password="123456">
            <!--高版本的 mysql-connector-java 需要设置 nullCatalogMeansCurrent=true-->
            <property name="nullCatalogMeansCurrent" value="true"/>
        </jdbcConnection>

        <!-- 类型转换 -->
        <javaTypeResolver>
            <property name="forceBigDecimals" value="true"/>
        </javaTypeResolver>

        <!-- 生成实体类地址 -->
        <javaModelGenerator targetPackage="com.codingmore.mbg.po" targetProject="src/main/java">
            <!-- 是否针对string类型的字段在set方法中进行修剪，默认false -->
            <property name="trimStrings" value="true"/>
        </javaModelGenerator>


        <!-- 生成Mapper.xml文件 -->
        <sqlMapGenerator targetPackage="com.codingmore.mbg.mapper" targetProject="src/main/resources">
        </sqlMapGenerator>

        <!-- 生成 XxxMapper.java 接口-->
        <javaClientGenerator targetPackage="com.codingmore.mbg.dao" targetProject="src/main/java" type="XMLMAPPER">
        </javaClientGenerator>

        <table schema="" tableName="user" domainObjectName="User"
               enableCountByExample="false" enableDeleteByExample="false" enableSelectByExample="false"
               enableUpdateByExample="false" selectByExampleQueryId="false">
        </table>
    </context>
</generatorConfiguration>
```

- 配置文件至少得包含一个context
- commentGenerator 用来配置生成的注释
- jdbcConnection 用来链接数据库
- javaTypeResolver 配置 JDBC 与 Java 的类型转换规则
- javaModelGenerator 配置 po 生成的包路径和项目路径
- sqlMapGenerator 配置 mapper.xml 文件生成的目录
- javaClientGenerator 配置 mapper.java 文件生成的目录
- 一个 table 对应一张表，如果想同时生成多张表，需要配置多个 table

更多配置信息可以参照下面这篇文章：

>https://juejin.cn/post/6844903982582743048

由于数据库表可能会发生变动，因此我们需要追加一个配置 `<overwrite>true</overwrite>`，允许覆盖旧的文件。为了防止我们编写的 SQL 语句被覆盖掉，MyBatis Generator 只会覆盖旧的 po、dao、而 *mapper.xml 不会覆盖，而是追加。

Mybatis Generator 需要链接数据库，所以还需要添加数据库驱动依赖，就像这样：

```
<configuration>
</configuration>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>${mysql.version}</version>
</dependency>
```

这样就会显得比较冗余，因为我们之前添加过了。好在 Maven 提供了 includeCompileDependencies 属性，可以让我们在插件中引用之前添加的依赖。

```
<includeCompileDependencies>true</includeCompileDependencies>
```

到此为止，mybatis-generator-maven-plugin 就算是配置完成了，完整内容如下所示：

```
<build>
    <plugins>
        <plugin>
            <groupId>org.mybatis.generator</groupId>
            <artifactId>mybatis-generator-maven-plugin</artifactId>
            <version>1.3.7</version>
            <configuration>
                <configurationFile>src/main/resources/mybatis-generator-config.xml</configurationFile>
                <overwrite>true</overwrite><includeCompileDependencies>true</includeCompileDependencies>
            </configuration>
        </plugin>
    </plugins>
</build>
```

配置完成后可以双击运行 Maven 的插件 Mybatis Generator，没有问题的话，可以看到生成后的文件。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/kaiyuan/auto-generator-6.png)

### 二、使用 MyBatis-Plus 的 AutoGenerator

MyBatis-Plus（简写 MP）是 MyBatis 的增强工具，官方宣称 MP 和 MyBatis 的关系就好像魂斗罗中的 1P 和 2P，可谓好基友，天下走。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/kaiyuan/auto-generator-7.png)

AutoGenerator 是 MyBatis-Plus 推出的代码生成器，可以快速生成 Entity、Mapper、Mapper XML、Service、Controller 等各个模块的代码，比 Mybatis Generator 更强大，开发效率更高。

通过前面的体验，想必大家确实感觉到了 Mybatis Generator 的繁琐，接下来，我们来体验一下 AutoGenerator，对比过后，大家心里就有答案了。

第一步，在 pom.xml 文件中添加 AutoGenerator 的依赖。

```
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-generator</artifactId>
    <version>3.4.1</version>
</dependency>
```

第二步，添加模板引擎依赖，MyBatis-Plus 支持 Velocity（默认）、Freemarker、Beetl，这里使用默认的 Velocity 引擎。

```
<dependency>
    <groupId>org.apache.velocity</groupId>
    <artifactId>velocity-engine-core</artifactId>
    <version>2.3</version>
</dependency>
```

第三步，进行全局配置。

```java
// 全局配置
GlobalConfig gc = new GlobalConfig();
String projectPath = System.getProperty("user.dir");
gc.setOutputDir(projectPath + "/src/main/java");
gc.setAuthor("沉默王二");
gc.setOpen(false);
gc.setDateType(DateType.ONLY_DATE);
gc.setSwagger2(true);
gc.setIdType(IdType.AUTO);
```

第四步，配置数据源。

```java
// 数据源配置
DataSourceConfig dsc = new DataSourceConfig();
dsc.setUrl("jdbc:mysql://ip:3306/codingmoretiny02?useUnicode=true&characterEncoding=utf-8&serverTimezone=Asia/Shanghai");
dsc.setDriverName("com.mysql.cj.jdbc.Driver");
dsc.setUsername("codingmoretiny02");
dsc.setPassword("123456");
```

第五步，配置包。

```java
// 包配置
PackageConfig pc = new PackageConfig();
pc.setParent("top.codingmore.mpg");
```

更多配置项可以到官方查看：

>https://baomidou.com/pages/061573/

示例代码示例如下所示：

```
public class CodeGenerator {
    public static void main(String[] args) {
        // 代码生成器
        AutoGenerator mpg = new AutoGenerator();
        GlobalConfig gc = new GlobalConfig();
        String projectPath = System.getProperty("user.dir");
        gc.setOutputDir(projectPath + "/src/main/java");
        gc.setAuthor("沉默王二");

        mpg.setGlobalConfig(gc);
        DataSourceConfig dsc = new DataSourceConfig();
        dsc.setDriverName("com.mysql.cj.jdbc.Driver");
        mpg.setDataSource(dsc);

        mpg.execute();
    }
}
```

再来看一下运行后的效果，可以看到数据库表对应的 controller、service、entity、mapper 等等全有了——爽歪歪：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/kaiyuan/auto-generator-1.gif)

### 三、总结对比

对比 Mybatis 的 Generator 和 MyBatis-Plus 的 AutoGenerator，就可以得出这样一条结论：后者的配置更简单，开发效率也更高，功能也更强大——可快速生成 Mapper 、 Model 、 Service 、 Controller 层代码。

**MyBatis-Plus 的确配得上 Plus 啊，确实优秀**。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/kaiyuan/auto-generator-9.png)

 想要完整示例的话，可以到 GitHub 上查看：

>https://github.com/itwanger/codingmore-learning/tree/main/codingmore-tiny-02

------
