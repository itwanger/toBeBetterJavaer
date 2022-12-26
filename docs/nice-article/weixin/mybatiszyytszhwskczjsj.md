---
title: MyBatis这样用，同事直呼哇塞，堪称最佳实践！
shortTitle: MyBatis这样用，同事直呼哇塞，堪称最佳实践！
description: MyBatis最佳实践，建议收藏！
author: 梦想de星空
category:
  - 微信公众号
---

>[二哥的编程星球](https://mp.weixin.qq.com/s/e5Q4aJCX9xccTzBBGepx4g)已经有 **950 多名** 球友加入了，如果你也需要一个良好的学习氛围，[戳链接](https://mp.weixin.qq.com/s/e5Q4aJCX9xccTzBBGepx4g)加入我们吧！这是一个Java学习指南+编程实战+LeetCode 刷题的私密圈子，你可以向二哥提问、帮你制定学习计划、和球友一起打卡成长，冲冲冲。


MyBatis是一款非常流行的ORM框架，相信很多小伙伴都在使用。我们经常会把它和MyBatis-Plus或者MBG一起使用，用多了之后对于其一些常规操作就不太熟悉了。最近总结了下MyBatis的实用用法和技巧，希望对大家有所帮助！

## MyBatis简介

MyBatis支持自定义SQL查询、存储过程和高级映射，目前在Github上已有`17k+Star`。在MyBatis中，我们可以在XML中编写SQL语句，然后绑定到Java方法中，通过参数和结果集的自动映射来实现复杂的查询逻辑。MyBatis消除了几乎所有JDBC操作和手动绑定参数操作，使用起来非常方便！

## 在SpringBoot中集成

> 下面我们来聊聊MyBatis在SpringBoot中的使用，首先我们需要集成它。

*   在`pom.xml`中添加MyBatis提供的Spring Boot Starter；

```
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.2.2</version>
</dependency>
```

*   然后在`application.yml`中配置好编写SQL实现的`xml`文件路径，这里我们存放在`resources/dao`目录下；

```
mybatis:
  mapper-locations:
    - classpath:dao/*.xml
```

*   然后添加Java配置，通过`@MapperScan`配置好Dao接口路径，这样就可以开始使用了。

```
/**

 * MyBatis配置类

 * Created by macro on 2019/4/8.

 */
@Configuration
@MapperScan("com.macro.mall.tiny.dao")
public class MyBatisConfig {
}
```

## 基本使用

> 下面我们来聊聊MyBatis的基本使用方法，涵盖了基本的增删改查操作。

### 表结构说明

这里将以mall项目中权限管理模块相关表为例进行介绍，具体表结构如下。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mybatiszyytszhwskczjsj-e4c9fdba-fef0-43bf-9d1b-a58b1eae41e8.jpg)

### 项目结构说明

本文示例使用了`mall-learning`项目中的`mall-tiny-mybatis`模块代码，具体项目结构如下。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mybatiszyytszhwskczjsj-89145395-c273-4300-8ec3-1676c2a4a855.jpg)

### select

*   首先是查询操作，这里我们以后台用户表`ums_admin`为例，编写一个`根据ID查询用户`的方法，先创建实体类`UmsAdmin`；

```
public class UmsAdmin implements Serializable {
    private Long id;

    private String username;

    private String password;

    @ApiModelProperty(value = "头像")
    private String icon;

    @ApiModelProperty(value = "邮箱")
    private String email;

    @ApiModelProperty(value = "昵称")
    private String nickName;

    @ApiModelProperty(value = "备注信息")
    private String note;

    @ApiModelProperty(value = "创建时间")
    private Date createTime;

    @ApiModelProperty(value = "最后登录时间")
    private Date loginTime;

    @ApiModelProperty(value = "帐号启用状态：0->禁用；1->启用")
    private Integer status;
}
```

*   然后创建数据操作的接口`UmsAdminDao`，再添加对应的方法；

```
/**

 * 自定义UmsAdmin表查询

 * Created by macro on 2022/10/20.

 */
@Repository
public interface UmsAdminDao {

    /**

     * 根据ID查询用户

     */
    UmsAdmin selectByIdSimple(Long id);
}
```

*   再创建`xml`文件`UmsAdminDao.xml`，添加查询方法的SQL实现；

```
<select id="selectByIdSimple" resultType="com.macro.mall.tiny.model.UmsAdmin">
    select * from ums_admin where id = #{id}
</select>
```

*   然后编写测试类，注入Dao，调用Dao方法来进行测试；

```
/**

 * MyBatis基本操作测试

 * Created by macro on 2022/10/20.

 */
@SpringBootTest
public class MyBatisBaseTest {

    private static final Logger LOGGER = LoggerFactory.getLogger(MyBatisBaseTest.class);

    @Autowired
    private UmsAdminDao umsAdminDao;

    @Test
    void testSelectByIdSimple(){
        UmsAdmin umsAdmin = umsAdminDao.selectByIdSimple(1L);
        LOGGER.info("testSelectByIdSimple result={}",umsAdmin);
    }
}
```

*   此时你会发现，对于一些数据库表中以`下划线`分割的返回字段无法自动映射，可以通过对字段取别名的方式来进行映射；

```
<select id="selectById" resultType="com.macro.mall.tiny.model.UmsAdmin">
    select username,
           password,
           icon,
           email,
           nick_name   as nickName,
           note,
           create_time as createTime,
           login_time  as loginTime,
           status
    from ums_admin
    where id = #{id}
</select>
```

*   如果你觉得这种方式比较麻烦，也可以通过在`application.yml`中开启全局下划线自动转驼峰功能来解决，个人习惯使用第一种。

```
mybatis:
  configuration:
    # 下划线自动转驼峰
    map-underscore-to-camel-case: true
```

### insert

*   接下来我们来编写一个`插入单个用户`的方法；

```
/**

 * 自定义UmsAdmin表查询

 * Created by macro on 2022/10/20.

 */
@Repository
public interface UmsAdminDao {

    /**

     * 插入用户

     */
    int insert(UmsAdmin entity);
}
```

*   然后在xml中编写对应的SQL实现，这里需要注意的是如果想返回插入后的自增ID的话，需要使用`selectKey`标签进行配置。

```
<insert id="insert">
    insert into ums_admin(username, password, icon, email, nick_name, note, create_time, login_time)
    values (#{username}, #{password}, #{icon}, #{email}, #{nickName}, #{note}, #{createTime}, #{loginTime})
    <selectKey keyColumn="id" resultType="long" keyProperty="id" order="AFTER">
        SELECT LAST_INSERT_ID()
    </selectKey>
</insert>
```

### update

*   接下来我们来编写一个`根据ID修改用户信息`的方法；

```
/**

 * 自定义UmsAdmin表查询

 * Created by macro on 2022/10/20.

 */
@Repository
public interface UmsAdminDao {
    /**

     * 根据ID修改用户信息

     */
    int updateById(UmsAdmin entity);
}
```

*   然后在xml中编写对应的SQL实现。

```
<update id="updateById">
    update ums_admin
    set username = #{username},
        password = #{password},
        icon = #{icon},
        email = #{email},
        nick_name = #{nickName},
        note = #{note},
        create_time = #{createTime},
        login_time = #{loginTime}
    where id = #{id}
</update>
```

### delete

*   接下来我们来编写一个`根据ID删除用户`的方法；

```
/**

 * 自定义UmsAdmin表查询

 * Created by macro on 2022/10/20.

 */
@Repository
public interface UmsAdminDao {
    /**

     * 根据ID删除用户

     */
    int deleteById(Long id);
}
```

*   然后在xml中编写对应的SQL实现。

```
<delete id="deleteById">
    delete from  ums_admin where id = #{id}
</delete>
```

## 动态SQL

> 通过MyBatis的动态SQL功能，我们可以灵活地在xml中实现各种复杂的操作，动态SQL功能需要依赖MyBatis的各种标签，下面我们就来学习下。

### if

*   `if`标签可以实现判断逻辑，这里我们以`根据用户名和Email模糊查询用户`为例，来聊聊它的使用；

```
/**

 * 自定义UmsAdmin表查询

 * Created by macro on 2022/10/20.

 */
@Repository
public interface UmsAdminDao {
    /**

     * 根据用户名和Email模糊查询用户

     * 不输入查询所有

     */
    List<UmsAdmin> selectByUsernameAndEmailLike(@Param("username") String username, @Param("email") String email);
}
```

*   xml中添加对应的SQL实现如下。

```
<select id="selectByUsernameAndEmailLike" resultType="com.macro.mall.tiny.model.UmsAdmin">
    select username,
           password,
           icon,
           email,
           nick_name   as nickName,
           note,
           create_time as createTime,
           login_time  as loginTime,
           status
    from ums_admin
    where 1=1
    <if test="username!=null and username!=''">
        and username like concat('%',#{username},'%')
    </if>
    <if test="email!=null and email!=''">
        and email like concat('%',#{email},'%')
    </if>
</select>
```

### choose

*   `choose`标签也可以实现判断逻辑，上面的例子中当我们不输入用户名和Email时，会查询出全部用户，我们如果想不查询出用户，可以使用它；

```
<select id="selectByUsernameAndEmailLike2" resultType="com.macro.mall.tiny.model.UmsAdmin">
    select username,
    password,
    icon,
    email,
    nick_name as nickName,
    note,
    create_time as createTime,
    login_time as loginTime,
    status
    from ums_admin
    where 1=1
    <choose>
        <when test="username!=null and username!=''">
            and username like concat('%',#{username},'%')
        </when>
        <when test="email!=null and email!=''">
            and email like concat('%',#{email},'%')
        </when>
        <otherwise>
            and 1=2
        </otherwise>
    </choose>
</select>
```

### where

*   上面的例子中我们为了SQL拼接不出错，添加了`where 1=1`这样的语句，其实可以使用`where`标签来实现查询条件，当标签内没有内容时会自动去除`where`关键字，同时还会去除开头多余的`and`关键字。

```
<select id="selectByUsernameAndEmailLike3" resultType="com.macro.mall.tiny.model.UmsAdmin">
    select username,
    password,
    icon,
    email,
    nick_name as nickName,
    note,
    create_time as createTime,
    login_time as loginTime,
    status
    from ums_admin
    <where>
        <if test="username!=null and username!=''">
            and username like concat('%',#{username},'%')
        </if>
        <if test="email!=null and email!=''">
            and email like concat('%',#{email},'%')
        </if>
    </where>
</select>
```

### set

*   当我们拼接更新字段的语句时，也会面临同样的问题，此时可以使用`set`标签来解决，比如我们现在想写一个`根据ID选择性修改用户信息`的方法；

```
/**

 * 自定义UmsAdmin表查询

 * Created by macro on 2022/10/20.

 */
@Repository
public interface UmsAdminDao {
    /**

     * 根据ID选择性修改用户信息

     */
    int updateByIdSelective(UmsAdmin entity);
}
```

*   方法对应的SQL实现如下，这里既避免了使用`set`关键字，也会将多余的逗号去除。

```
<update id="updateByIdSelective">
    update ums_admin
    <set>
        <if test="username!=null and username!=''">
            username = #{username},
        </if>
        <if test="password!=null and password!=''">
            password = #{password},
        </if>
        <if test="icon!=null and icon!=''">
            icon = #{icon},
        </if>
        <if test="email!=null and email!=''">
            email = #{email},
        </if>
        <if test="nickName!=null and nickName!=''">
            nick_name = #{nickName},
        </if>
        <if test="note!=null and note!=''">
            note = #{note},
        </if>
        <if test="createTime!=null">
            create_time = #{createTime},
        </if>
        <if test="loginTime!=null">
            login_time = #{loginTime},
        </if>
    </set>
    where id = #{id}
</update>
```

### foreach

*   通过`foreach`我们可以实现一些循环拼接SQL的逻辑，例如我们现在需要编写一个`批量插入用户`的方法；

```
/**

 * 自定义UmsAdmin表查询

 * Created by macro on 2022/10/20.

 */
@Repository
public interface UmsAdminDao {
    /**

     * 批量插入用户

     */
    int insertBatch(@Param("entityList") List<UmsAdmin> adminList);
}
```

*   在xml中的对应SQL实现如下，在`foreach`标签中的内容会根据传入的集合参数进行循环拼接；

```
<insert id="insertBatch">
    insert into ums_admin(username, password, icon, email, nick_name, note, create_time, login_time) values
    <foreach collection="entityList" separator="," item="item">
        (#{item.username}, #{item.password}, #{item.icon}, #{item.email}, #{item.nickName}, #{item.note}, #{item.createTime}, #{item.loginTime})
    </foreach>
</insert>
```

*   再例如我们现在需要编写一个`根据用户ID批量查询`的方法；

```
/**

 * 自定义UmsAdmin表查询

 * Created by macro on 2022/10/20.

 */
@Repository
public interface UmsAdminDao {
    /**

     * 根据用户ID批量查询

     */
    List<UmsAdmin> selectByIds(@Param("ids") List<Long> ids);
}
```

*   在xml中的对应SQL实现如下，我们可以使用`open`、`close`属性指定拼接语句的前后缀。

```
<select id="selectByIds" resultType="com.macro.mall.tiny.model.UmsAdmin">
    select username,
           password,
           icon,
           email,
           nick_name   as nickName,
           note,
           create_time as createTime,
           login_time  as loginTime,
           status
    from ums_admin
    where id in
    <foreach collection="ids" item="item" open="(" close=")" separator=",">
        #{item}
    </foreach>
</select>
```

## 高级查询

> 介绍完MyBatis的基本操作后，我们再来介绍下MyBatis的高级查询功能。

### 一对一映射

*   在我们平时进行SQL查询时，往往会有`一对一`的情况，比如说我们这里有资源分类`ums_resource_category`和资源`ums_resource`两张表，资源和分类就是一对一的关系，如果你不想改动原实体类的话，可以编写一个扩展类继承`UmsResource`，并包含`UmsResourceCategory`属性；

```
/**

 * UmsResource扩展类

 * Created by macro on 2022/10/20.

 */
@Data
public class UmsResourceExt extends UmsResource {

    private UmsResourceCategory category;
}
```

*   例如我们需要编写一个`根据资源ID获取资源及分类信息`的方法；

```
/**

 * 自定义UmsResource表查询

 * Created by macro on 2022/10/20.

 */
@Repository
public interface UmsResourceDao {
    /**

     * 根据资源ID获取资源及分类信息

     */
    UmsResourceExt selectResourceWithCategory(Long id);
}
```

*   在xml中的具体SQL实现如下，我们可以通过给`ums_resource_category`表中字段取以`category.xxx`的别名来自动进行自动映射；

```
<select id="selectResourceWithCategory" resultType="com.macro.mall.tiny.domain.UmsResourceExt">
    select ur.id,
           ur.create_time  as createTime,
           ur.name,
           ur.url,
           ur.description,
           ur.category_id  as categoryId,
           urc.id          as "category.id",
           urc.name        as "category.name",
           urc.sort        as "category.sort",
           urc.create_time as "category.createTime"
    from ums_resource ur
             left join ums_resource_category urc on ur.category_id = urc.id
    where ur.id = #{id}
</select>
```

*   当然除了这种方式以外，我们还可以通过`ResultMap`+`association`标签来实现，不过在此之前我们在编写xml文件的时候，一般习惯于先给当前文件写一个`BaseResultMap`，用于对当前表的字段和对象属性进行直接映射，例如在`UmsResourceCategoryDao.xml`中这样实现；

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.macro.mall.tiny.dao.UmsResourceCategoryDao">

    <resultMap id="BaseResultMap" type="com.macro.mall.tiny.model.UmsResourceCategory">
        <id property="id" column="id"/>
        <result property="createTime" column="create_time"/>
        <result property="name" column="name"/>
        <result property="sort" column="sort"/>
    </resultMap>
</mapper>
```

*   在`UmsResourceDao.xml`中我们可以这样实现；

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.macro.mall.tiny.dao.UmsResourceDao">

    <resultMap id="BaseResultMap" type="com.macro.mall.tiny.model.UmsResource">
        <id property="id" column="id"/>
        <result property="createTime" column="create_time"/>
        <result property="name" column="name"/>
        <result property="url" column="url"/>
        <result property="description" column="description"/>
        <result property="categoryId" column="category_id"/>
    </resultMap>
</mapper>
```

*   编写完成后，我们的一对一`ResultMap`实现就很简单了，我们可以使用`association`标签进行一对一管理，配置`columnPrefix`属性将匹配到的字段直接映射到关联对象中去；

```
<resultMap id="ResourceWithCategoryMap" type="com.macro.mall.tiny.domain.UmsResourceExt" extends="BaseResultMap">
    <association property="category" resultMap="com.macro.mall.tiny.dao.UmsResourceCategoryDao.BaseResultMap" columnPrefix="category_"/>
</resultMap>
```

*   然后再编写下Dao中方法对应SQL实现即可，这里直接使用上面的ResultMap，同时给`ums_resource_category`表中的字段指定了`category_`前缀以便于映射。

```
<select id="selectResourceWithCategory2" resultMap="ResourceWithCategoryMap">
    select ur.id,
           ur.create_time,
           ur.name,
           ur.url,
           ur.description,
           ur.category_id,
           urc.id          as category_id,
           urc.name        as category_name,
           urc.sort        as category_sort,
           urc.create_time as category_create_time
    from ums_resource ur
             left join ums_resource_category urc on ur.category_id = urc.id
    where ur.id = #{id}
</select>
```

### 一对多映射

*   在编写SQL查询时，一对多的情况也比较常见，例如这里的分类和资源就是一对多的情况；

```
/**

 * UmsResourceCategory扩展类

 * Created by macro on 2022/10/20.

 */
@Data
public class UmsResourceCategoryExt extends UmsResourceCategory {

    private List<UmsResource> resourceList;
}
```

*   例如我们现在需要编写一个`根据分类ID获取分类及对应资源`的方法；

```
/**

 * 自定义UmsResourceCategory表查询

 * Created by macro on 2022/10/20.

 */
@Repository
public interface UmsResourceCategoryDao {

    /**

     * 根据分类ID获取分类及对应资源

     */
    UmsResourceCategoryExt selectCategoryWithResource(Long id);
}
```

*   在实现具体SQL前，我们需要先在xml中配置一个ResultMap，通过`collection`标签建立一对多关系；

```
<resultMap id="selectCategoryWithResourceMap" type="com.macro.mall.tiny.domain.UmsResourceCategoryExt" extends="BaseResultMap">
    <collection property="resourceList" columnPrefix="resource_" resultMap="com.macro.mall.tiny.dao.UmsResourceDao.BaseResultMap"/>
</resultMap>
```

*   然后在xml中编写具体的SQL实现，使用该ResultMap。

```
<select id="selectCategoryWithResource" resultMap="selectCategoryWithResourceMap">
    select urc.id,
           urc.create_time,
           urc.name,
           urc.sort,
           ur.id resource_id,
           ur.create_time resource_create_time,
           ur.name resource_name,
           ur.url resource_url,
           ur.description resource_description,
           ur.category_id resource_category_id
    from ums_resource_category urc
    left join ums_resource ur on urc.id = ur.category_id
    where urc.id = #{id}
</select>
```

### 分页插件

*   我们平时实现查询逻辑时，往往还会遇到分页查询的需求，直接使用开源的`PageHelper`插件即可，首先在`pom.xml`中添加它的Starter；

```
<!--MyBatis分页插件-->
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper-spring-boot-starter</artifactId>
    <version>1.4.2</version>
</dependency>
```

*   然后在查询方法之前使用它的`startPage`方法传入分页参数即可，分页后的得到的数据可以在`PageInfo`中获取到。

```
/**

 * UmsResource的Service接口实现类

 * Created by macro on 2022/10/20.

 */
@Service
public class UmsResourceServiceImpl implements UmsResourceService {

    @Autowired
    private UmsResourceDao umsResourceDao;

    @Override
    public PageInfo<UmsResource> page(Integer pageNum, Integer pageSize,Long categoryId) {
        PageHelper.startPage(pageNum,pageSize);
        List<UmsResource> resourceList = umsResourceDao.selectListByCategoryId(categoryId);
        PageInfo<UmsResource> pageInfo = new PageInfo<>(resourceList);
        return pageInfo;
    }
}

```

## 总结

本文主要介绍了MyBatis中一些比较常规的用法，涵盖了SpringBoot集成、基本查询、动态SQL和高级查询，建议大家收藏起来，在对MyBatis的用法有所遗忘的时候拿出来看看。


>项目源码地址: https://github.com/macrozheng/mall-learning/tree/master/mall-tiny-mybatis

---

没有什么使我停留——除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟。

- [曝光秋招毁约公司](https://mp.weixin.qq.com/s/gOuoM27tl4l6GW7aqZu98Q)
- [垃圾外包，离职也罢](https://mp.weixin.qq.com/s/3Iry19JaEoN4pA3-JDtVhw)
- [非科班转码](https://mp.weixin.qq.com/s/CyJAVQza-9zmDdboStKe8w)
- [推荐 10 个神级 Intellij IDEA 插件](https://mp.weixin.qq.com/s/4qHRBcJn1AvP07U4H6JcOQ)
- [美团率先开奖 24k，不甘心？](https://mp.weixin.qq.com/s/MGqyie9KvD6kH8Tuv2mqOw)
- [Fleet，Java 轻量级 IDE 的未来？](https://mp.weixin.qq.com/s/Pu1cddsQOiMfCU4I96iygQ)
- [先不管那么多，offer 接了再说](https://mp.weixin.qq.com/s/9f_sOLiRwDS3pzC-mJ9jLQ)
- [一套 KTV 管理系统，估价 3 万还是 30 万？](https://mp.weixin.qq.com/s/zYLEUmbfmiKeFk03e1TxbA)
- [给 offer 的公司不问技术细节？](https://mp.weixin.qq.com/s/QYFB2NHhyZSBfdgSUcZU5g)
- [入职一个月，就想跑路了？](https://mp.weixin.qq.com/s/SfEUk-4hE6ezUk2Lu6cd2g)

![](https://files.mdnice.com/user/3903/b7e50cf4-6fca-4511-9bfd-aa1ed9eb587b.png)
