import{_ as s}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as d,c as a,a as e,d as i,b as l,e as t,r}from"./app.99eb8281.js";const c={},u={href:"https://mp.weixin.qq.com/s/e5Q4aJCX9xccTzBBGepx4g",target:"_blank",rel:"noopener noreferrer"},v=e("strong",null,"950 多名",-1),m={href:"https://mp.weixin.qq.com/s/e5Q4aJCX9xccTzBBGepx4g",target:"_blank",rel:"noopener noreferrer"},o=t(`<p>MyBatis是一款非常流行的ORM框架，相信很多小伙伴都在使用。我们经常会把它和MyBatis-Plus或者MBG一起使用，用多了之后对于其一些常规操作就不太熟悉了。最近总结了下MyBatis的实用用法和技巧，希望对大家有所帮助！</p><h2 id="mybatis简介" tabindex="-1"><a class="header-anchor" href="#mybatis简介" aria-hidden="true">#</a> MyBatis简介</h2><p>MyBatis支持自定义SQL查询、存储过程和高级映射，目前在Github上已有<code>17k+Star</code>。在MyBatis中，我们可以在XML中编写SQL语句，然后绑定到Java方法中，通过参数和结果集的自动映射来实现复杂的查询逻辑。MyBatis消除了几乎所有JDBC操作和手动绑定参数操作，使用起来非常方便！</p><h2 id="在springboot中集成" tabindex="-1"><a class="header-anchor" href="#在springboot中集成" aria-hidden="true">#</a> 在SpringBoot中集成</h2><blockquote><p>下面我们来聊聊MyBatis在SpringBoot中的使用，首先我们需要集成它。</p></blockquote><ul><li>在<code>pom.xml</code>中添加MyBatis提供的Spring Boot Starter；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;dependency&gt;
    &lt;groupId&gt;org.mybatis.spring.boot&lt;/groupId&gt;
    &lt;artifactId&gt;mybatis-spring-boot-starter&lt;/artifactId&gt;
    &lt;version&gt;2.2.2&lt;/version&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>然后在<code>application.yml</code>中配置好编写SQL实现的<code>xml</code>文件路径，这里我们存放在<code>resources/dao</code>目录下；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mybatis:
  mapper-locations:
    - classpath:dao/*.xml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>然后添加Java配置，通过<code>@MapperScan</code>配置好Dao接口路径，这样就可以开始使用了。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**

 * MyBatis配置类

 * Created by macro on 2019/4/8.

 */
@Configuration
@MapperScan(&quot;com.macro.mall.tiny.dao&quot;)
public class MyBatisConfig {
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="基本使用" tabindex="-1"><a class="header-anchor" href="#基本使用" aria-hidden="true">#</a> 基本使用</h2><blockquote><p>下面我们来聊聊MyBatis的基本使用方法，涵盖了基本的增删改查操作。</p></blockquote><h3 id="表结构说明" tabindex="-1"><a class="header-anchor" href="#表结构说明" aria-hidden="true">#</a> 表结构说明</h3><p>这里将以mall项目中权限管理模块相关表为例进行介绍，具体表结构如下。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mybatiszyytszhwskczjsj-e4c9fdba-fef0-43bf-9d1b-a58b1eae41e8.jpg" alt="" loading="lazy"></p><h3 id="项目结构说明" tabindex="-1"><a class="header-anchor" href="#项目结构说明" aria-hidden="true">#</a> 项目结构说明</h3><p>本文示例使用了<code>mall-learning</code>项目中的<code>mall-tiny-mybatis</code>模块代码，具体项目结构如下。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mybatiszyytszhwskczjsj-89145395-c273-4300-8ec3-1676c2a4a855.jpg" alt="" loading="lazy"></p><h3 id="select" tabindex="-1"><a class="header-anchor" href="#select" aria-hidden="true">#</a> select</h3><ul><li>首先是查询操作，这里我们以后台用户表<code>ums_admin</code>为例，编写一个<code>根据ID查询用户</code>的方法，先创建实体类<code>UmsAdmin</code>；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class UmsAdmin implements Serializable {
    private Long id;

    private String username;

    private String password;

    @ApiModelProperty(value = &quot;头像&quot;)
    private String icon;

    @ApiModelProperty(value = &quot;邮箱&quot;)
    private String email;

    @ApiModelProperty(value = &quot;昵称&quot;)
    private String nickName;

    @ApiModelProperty(value = &quot;备注信息&quot;)
    private String note;

    @ApiModelProperty(value = &quot;创建时间&quot;)
    private Date createTime;

    @ApiModelProperty(value = &quot;最后登录时间&quot;)
    private Date loginTime;

    @ApiModelProperty(value = &quot;帐号启用状态：0-&gt;禁用；1-&gt;启用&quot;)
    private Integer status;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>然后创建数据操作的接口<code>UmsAdminDao</code>，再添加对应的方法；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**

 * 自定义UmsAdmin表查询

 * Created by macro on 2022/10/20.

 */
@Repository
public interface UmsAdminDao {

    /**

     * 根据ID查询用户

     */
    UmsAdmin selectByIdSimple(Long id);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>再创建<code>xml</code>文件<code>UmsAdminDao.xml</code>，添加查询方法的SQL实现；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;select id=&quot;selectByIdSimple&quot; resultType=&quot;com.macro.mall.tiny.model.UmsAdmin&quot;&gt;
    select * from ums_admin where id = #{id}
&lt;/select&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>然后编写测试类，注入Dao，调用Dao方法来进行测试；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**

 * MyBatis基本操作测试

 * Created by macro on 2022/10/20.

 */
@SpringBootTest
public class MyBatisBaseTest {

    private static final Logger LOGGER = LoggerFactory.getLogger(MyBatisBaseTest.class);

    @Autowired
    private UmsAdminDao umsAdminDao;

    @Test
    void testSelectByIdSimple(){
        UmsAdmin umsAdmin = umsAdminDao.selectByIdSimple(1L);
        LOGGER.info(&quot;testSelectByIdSimple result={}&quot;,umsAdmin);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>此时你会发现，对于一些数据库表中以<code>下划线</code>分割的返回字段无法自动映射，可以通过对字段取别名的方式来进行映射；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;select id=&quot;selectById&quot; resultType=&quot;com.macro.mall.tiny.model.UmsAdmin&quot;&gt;
    select username,
           password,
           icon,
           email,
           nick_name   as nickName,
           note,
           create_time as createTime,
           login_time  as loginTime,
           status
    from ums_admin
    where id = #{id}
&lt;/select&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>如果你觉得这种方式比较麻烦，也可以通过在<code>application.yml</code>中开启全局下划线自动转驼峰功能来解决，个人习惯使用第一种。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mybatis:
  configuration:
    # 下划线自动转驼峰
    map-underscore-to-camel-case: true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="insert" tabindex="-1"><a class="header-anchor" href="#insert" aria-hidden="true">#</a> insert</h3><ul><li>接下来我们来编写一个<code>插入单个用户</code>的方法；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**

 * 自定义UmsAdmin表查询

 * Created by macro on 2022/10/20.

 */
@Repository
public interface UmsAdminDao {

    /**

     * 插入用户

     */
    int insert(UmsAdmin entity);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>然后在xml中编写对应的SQL实现，这里需要注意的是如果想返回插入后的自增ID的话，需要使用<code>selectKey</code>标签进行配置。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;insert id=&quot;insert&quot;&gt;
    insert into ums_admin(username, password, icon, email, nick_name, note, create_time, login_time)
    values (#{username}, #{password}, #{icon}, #{email}, #{nickName}, #{note}, #{createTime}, #{loginTime})
    &lt;selectKey keyColumn=&quot;id&quot; resultType=&quot;long&quot; keyProperty=&quot;id&quot; order=&quot;AFTER&quot;&gt;
        SELECT LAST_INSERT_ID()
    &lt;/selectKey&gt;
&lt;/insert&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="update" tabindex="-1"><a class="header-anchor" href="#update" aria-hidden="true">#</a> update</h3><ul><li>接下来我们来编写一个<code>根据ID修改用户信息</code>的方法；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**

 * 自定义UmsAdmin表查询

 * Created by macro on 2022/10/20.

 */
@Repository
public interface UmsAdminDao {
    /**

     * 根据ID修改用户信息

     */
    int updateById(UmsAdmin entity);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>然后在xml中编写对应的SQL实现。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;update id=&quot;updateById&quot;&gt;
    update ums_admin
    set username = #{username},
        password = #{password},
        icon = #{icon},
        email = #{email},
        nick_name = #{nickName},
        note = #{note},
        create_time = #{createTime},
        login_time = #{loginTime}
    where id = #{id}
&lt;/update&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="delete" tabindex="-1"><a class="header-anchor" href="#delete" aria-hidden="true">#</a> delete</h3><ul><li>接下来我们来编写一个<code>根据ID删除用户</code>的方法；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**

 * 自定义UmsAdmin表查询

 * Created by macro on 2022/10/20.

 */
@Repository
public interface UmsAdminDao {
    /**

     * 根据ID删除用户

     */
    int deleteById(Long id);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>然后在xml中编写对应的SQL实现。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;delete id=&quot;deleteById&quot;&gt;
    delete from  ums_admin where id = #{id}
&lt;/delete&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="动态sql" tabindex="-1"><a class="header-anchor" href="#动态sql" aria-hidden="true">#</a> 动态SQL</h2><blockquote><p>通过MyBatis的动态SQL功能，我们可以灵活地在xml中实现各种复杂的操作，动态SQL功能需要依赖MyBatis的各种标签，下面我们就来学习下。</p></blockquote><h3 id="if" tabindex="-1"><a class="header-anchor" href="#if" aria-hidden="true">#</a> if</h3><ul><li><code>if</code>标签可以实现判断逻辑，这里我们以<code>根据用户名和Email模糊查询用户</code>为例，来聊聊它的使用；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**

 * 自定义UmsAdmin表查询

 * Created by macro on 2022/10/20.

 */
@Repository
public interface UmsAdminDao {
    /**

     * 根据用户名和Email模糊查询用户

     * 不输入查询所有

     */
    List&lt;UmsAdmin&gt; selectByUsernameAndEmailLike(@Param(&quot;username&quot;) String username, @Param(&quot;email&quot;) String email);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>xml中添加对应的SQL实现如下。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;select id=&quot;selectByUsernameAndEmailLike&quot; resultType=&quot;com.macro.mall.tiny.model.UmsAdmin&quot;&gt;
    select username,
           password,
           icon,
           email,
           nick_name   as nickName,
           note,
           create_time as createTime,
           login_time  as loginTime,
           status
    from ums_admin
    where 1=1
    &lt;if test=&quot;username!=null and username!=&#39;&#39;&quot;&gt;
        and username like concat(&#39;%&#39;,#{username},&#39;%&#39;)
    &lt;/if&gt;
    &lt;if test=&quot;email!=null and email!=&#39;&#39;&quot;&gt;
        and email like concat(&#39;%&#39;,#{email},&#39;%&#39;)
    &lt;/if&gt;
&lt;/select&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="choose" tabindex="-1"><a class="header-anchor" href="#choose" aria-hidden="true">#</a> choose</h3><ul><li><code>choose</code>标签也可以实现判断逻辑，上面的例子中当我们不输入用户名和Email时，会查询出全部用户，我们如果想不查询出用户，可以使用它；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;select id=&quot;selectByUsernameAndEmailLike2&quot; resultType=&quot;com.macro.mall.tiny.model.UmsAdmin&quot;&gt;
    select username,
    password,
    icon,
    email,
    nick_name as nickName,
    note,
    create_time as createTime,
    login_time as loginTime,
    status
    from ums_admin
    where 1=1
    &lt;choose&gt;
        &lt;when test=&quot;username!=null and username!=&#39;&#39;&quot;&gt;
            and username like concat(&#39;%&#39;,#{username},&#39;%&#39;)
        &lt;/when&gt;
        &lt;when test=&quot;email!=null and email!=&#39;&#39;&quot;&gt;
            and email like concat(&#39;%&#39;,#{email},&#39;%&#39;)
        &lt;/when&gt;
        &lt;otherwise&gt;
            and 1=2
        &lt;/otherwise&gt;
    &lt;/choose&gt;
&lt;/select&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="where" tabindex="-1"><a class="header-anchor" href="#where" aria-hidden="true">#</a> where</h3><ul><li>上面的例子中我们为了SQL拼接不出错，添加了<code>where 1=1</code>这样的语句，其实可以使用<code>where</code>标签来实现查询条件，当标签内没有内容时会自动去除<code>where</code>关键字，同时还会去除开头多余的<code>and</code>关键字。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;select id=&quot;selectByUsernameAndEmailLike3&quot; resultType=&quot;com.macro.mall.tiny.model.UmsAdmin&quot;&gt;
    select username,
    password,
    icon,
    email,
    nick_name as nickName,
    note,
    create_time as createTime,
    login_time as loginTime,
    status
    from ums_admin
    &lt;where&gt;
        &lt;if test=&quot;username!=null and username!=&#39;&#39;&quot;&gt;
            and username like concat(&#39;%&#39;,#{username},&#39;%&#39;)
        &lt;/if&gt;
        &lt;if test=&quot;email!=null and email!=&#39;&#39;&quot;&gt;
            and email like concat(&#39;%&#39;,#{email},&#39;%&#39;)
        &lt;/if&gt;
    &lt;/where&gt;
&lt;/select&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="set" tabindex="-1"><a class="header-anchor" href="#set" aria-hidden="true">#</a> set</h3><ul><li>当我们拼接更新字段的语句时，也会面临同样的问题，此时可以使用<code>set</code>标签来解决，比如我们现在想写一个<code>根据ID选择性修改用户信息</code>的方法；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**

 * 自定义UmsAdmin表查询

 * Created by macro on 2022/10/20.

 */
@Repository
public interface UmsAdminDao {
    /**

     * 根据ID选择性修改用户信息

     */
    int updateByIdSelective(UmsAdmin entity);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>方法对应的SQL实现如下，这里既避免了使用<code>set</code>关键字，也会将多余的逗号去除。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;update id=&quot;updateByIdSelective&quot;&gt;
    update ums_admin
    &lt;set&gt;
        &lt;if test=&quot;username!=null and username!=&#39;&#39;&quot;&gt;
            username = #{username},
        &lt;/if&gt;
        &lt;if test=&quot;password!=null and password!=&#39;&#39;&quot;&gt;
            password = #{password},
        &lt;/if&gt;
        &lt;if test=&quot;icon!=null and icon!=&#39;&#39;&quot;&gt;
            icon = #{icon},
        &lt;/if&gt;
        &lt;if test=&quot;email!=null and email!=&#39;&#39;&quot;&gt;
            email = #{email},
        &lt;/if&gt;
        &lt;if test=&quot;nickName!=null and nickName!=&#39;&#39;&quot;&gt;
            nick_name = #{nickName},
        &lt;/if&gt;
        &lt;if test=&quot;note!=null and note!=&#39;&#39;&quot;&gt;
            note = #{note},
        &lt;/if&gt;
        &lt;if test=&quot;createTime!=null&quot;&gt;
            create_time = #{createTime},
        &lt;/if&gt;
        &lt;if test=&quot;loginTime!=null&quot;&gt;
            login_time = #{loginTime},
        &lt;/if&gt;
    &lt;/set&gt;
    where id = #{id}
&lt;/update&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="foreach" tabindex="-1"><a class="header-anchor" href="#foreach" aria-hidden="true">#</a> foreach</h3><ul><li>通过<code>foreach</code>我们可以实现一些循环拼接SQL的逻辑，例如我们现在需要编写一个<code>批量插入用户</code>的方法；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**

 * 自定义UmsAdmin表查询

 * Created by macro on 2022/10/20.

 */
@Repository
public interface UmsAdminDao {
    /**

     * 批量插入用户

     */
    int insertBatch(@Param(&quot;entityList&quot;) List&lt;UmsAdmin&gt; adminList);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>在xml中的对应SQL实现如下，在<code>foreach</code>标签中的内容会根据传入的集合参数进行循环拼接；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;insert id=&quot;insertBatch&quot;&gt;
    insert into ums_admin(username, password, icon, email, nick_name, note, create_time, login_time) values
    &lt;foreach collection=&quot;entityList&quot; separator=&quot;,&quot; item=&quot;item&quot;&gt;
        (#{item.username}, #{item.password}, #{item.icon}, #{item.email}, #{item.nickName}, #{item.note}, #{item.createTime}, #{item.loginTime})
    &lt;/foreach&gt;
&lt;/insert&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>再例如我们现在需要编写一个<code>根据用户ID批量查询</code>的方法；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**

 * 自定义UmsAdmin表查询

 * Created by macro on 2022/10/20.

 */
@Repository
public interface UmsAdminDao {
    /**

     * 根据用户ID批量查询

     */
    List&lt;UmsAdmin&gt; selectByIds(@Param(&quot;ids&quot;) List&lt;Long&gt; ids);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>在xml中的对应SQL实现如下，我们可以使用<code>open</code>、<code>close</code>属性指定拼接语句的前后缀。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;select id=&quot;selectByIds&quot; resultType=&quot;com.macro.mall.tiny.model.UmsAdmin&quot;&gt;
    select username,
           password,
           icon,
           email,
           nick_name   as nickName,
           note,
           create_time as createTime,
           login_time  as loginTime,
           status
    from ums_admin
    where id in
    &lt;foreach collection=&quot;ids&quot; item=&quot;item&quot; open=&quot;(&quot; close=&quot;)&quot; separator=&quot;,&quot;&gt;
        #{item}
    &lt;/foreach&gt;
&lt;/select&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="高级查询" tabindex="-1"><a class="header-anchor" href="#高级查询" aria-hidden="true">#</a> 高级查询</h2><blockquote><p>介绍完MyBatis的基本操作后，我们再来介绍下MyBatis的高级查询功能。</p></blockquote><h3 id="一对一映射" tabindex="-1"><a class="header-anchor" href="#一对一映射" aria-hidden="true">#</a> 一对一映射</h3><ul><li>在我们平时进行SQL查询时，往往会有<code>一对一</code>的情况，比如说我们这里有资源分类<code>ums_resource_category</code>和资源<code>ums_resource</code>两张表，资源和分类就是一对一的关系，如果你不想改动原实体类的话，可以编写一个扩展类继承<code>UmsResource</code>，并包含<code>UmsResourceCategory</code>属性；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**

 * UmsResource扩展类

 * Created by macro on 2022/10/20.

 */
@Data
public class UmsResourceExt extends UmsResource {

    private UmsResourceCategory category;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>例如我们需要编写一个<code>根据资源ID获取资源及分类信息</code>的方法；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**

 * 自定义UmsResource表查询

 * Created by macro on 2022/10/20.

 */
@Repository
public interface UmsResourceDao {
    /**

     * 根据资源ID获取资源及分类信息

     */
    UmsResourceExt selectResourceWithCategory(Long id);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>在xml中的具体SQL实现如下，我们可以通过给<code>ums_resource_category</code>表中字段取以<code>category.xxx</code>的别名来自动进行自动映射；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;select id=&quot;selectResourceWithCategory&quot; resultType=&quot;com.macro.mall.tiny.domain.UmsResourceExt&quot;&gt;
    select ur.id,
           ur.create_time  as createTime,
           ur.name,
           ur.url,
           ur.description,
           ur.category_id  as categoryId,
           urc.id          as &quot;category.id&quot;,
           urc.name        as &quot;category.name&quot;,
           urc.sort        as &quot;category.sort&quot;,
           urc.create_time as &quot;category.createTime&quot;
    from ums_resource ur
             left join ums_resource_category urc on ur.category_id = urc.id
    where ur.id = #{id}
&lt;/select&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>当然除了这种方式以外，我们还可以通过<code>ResultMap</code>+<code>association</code>标签来实现，不过在此之前我们在编写xml文件的时候，一般习惯于先给当前文件写一个<code>BaseResultMap</code>，用于对当前表的字段和对象属性进行直接映射，例如在<code>UmsResourceCategoryDao.xml</code>中这样实现；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;!DOCTYPE mapper PUBLIC &quot;-//mybatis.org//DTD Mapper 3.0//EN&quot; &quot;http://mybatis.org/dtd/mybatis-3-mapper.dtd&quot;&gt;
&lt;mapper namespace=&quot;com.macro.mall.tiny.dao.UmsResourceCategoryDao&quot;&gt;

    &lt;resultMap id=&quot;BaseResultMap&quot; type=&quot;com.macro.mall.tiny.model.UmsResourceCategory&quot;&gt;
        &lt;id property=&quot;id&quot; column=&quot;id&quot;/&gt;
        &lt;result property=&quot;createTime&quot; column=&quot;create_time&quot;/&gt;
        &lt;result property=&quot;name&quot; column=&quot;name&quot;/&gt;
        &lt;result property=&quot;sort&quot; column=&quot;sort&quot;/&gt;
    &lt;/resultMap&gt;
&lt;/mapper&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>在<code>UmsResourceDao.xml</code>中我们可以这样实现；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;!DOCTYPE mapper PUBLIC &quot;-//mybatis.org//DTD Mapper 3.0//EN&quot; &quot;http://mybatis.org/dtd/mybatis-3-mapper.dtd&quot;&gt;
&lt;mapper namespace=&quot;com.macro.mall.tiny.dao.UmsResourceDao&quot;&gt;

    &lt;resultMap id=&quot;BaseResultMap&quot; type=&quot;com.macro.mall.tiny.model.UmsResource&quot;&gt;
        &lt;id property=&quot;id&quot; column=&quot;id&quot;/&gt;
        &lt;result property=&quot;createTime&quot; column=&quot;create_time&quot;/&gt;
        &lt;result property=&quot;name&quot; column=&quot;name&quot;/&gt;
        &lt;result property=&quot;url&quot; column=&quot;url&quot;/&gt;
        &lt;result property=&quot;description&quot; column=&quot;description&quot;/&gt;
        &lt;result property=&quot;categoryId&quot; column=&quot;category_id&quot;/&gt;
    &lt;/resultMap&gt;
&lt;/mapper&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>编写完成后，我们的一对一<code>ResultMap</code>实现就很简单了，我们可以使用<code>association</code>标签进行一对一管理，配置<code>columnPrefix</code>属性将匹配到的字段直接映射到关联对象中去；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;resultMap id=&quot;ResourceWithCategoryMap&quot; type=&quot;com.macro.mall.tiny.domain.UmsResourceExt&quot; extends=&quot;BaseResultMap&quot;&gt;
    &lt;association property=&quot;category&quot; resultMap=&quot;com.macro.mall.tiny.dao.UmsResourceCategoryDao.BaseResultMap&quot; columnPrefix=&quot;category_&quot;/&gt;
&lt;/resultMap&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>然后再编写下Dao中方法对应SQL实现即可，这里直接使用上面的ResultMap，同时给<code>ums_resource_category</code>表中的字段指定了<code>category_</code>前缀以便于映射。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;select id=&quot;selectResourceWithCategory2&quot; resultMap=&quot;ResourceWithCategoryMap&quot;&gt;
    select ur.id,
           ur.create_time,
           ur.name,
           ur.url,
           ur.description,
           ur.category_id,
           urc.id          as category_id,
           urc.name        as category_name,
           urc.sort        as category_sort,
           urc.create_time as category_create_time
    from ums_resource ur
             left join ums_resource_category urc on ur.category_id = urc.id
    where ur.id = #{id}
&lt;/select&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="一对多映射" tabindex="-1"><a class="header-anchor" href="#一对多映射" aria-hidden="true">#</a> 一对多映射</h3><ul><li>在编写SQL查询时，一对多的情况也比较常见，例如这里的分类和资源就是一对多的情况；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**

 * UmsResourceCategory扩展类

 * Created by macro on 2022/10/20.

 */
@Data
public class UmsResourceCategoryExt extends UmsResourceCategory {

    private List&lt;UmsResource&gt; resourceList;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>例如我们现在需要编写一个<code>根据分类ID获取分类及对应资源</code>的方法；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**

 * 自定义UmsResourceCategory表查询

 * Created by macro on 2022/10/20.

 */
@Repository
public interface UmsResourceCategoryDao {

    /**

     * 根据分类ID获取分类及对应资源

     */
    UmsResourceCategoryExt selectCategoryWithResource(Long id);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>在实现具体SQL前，我们需要先在xml中配置一个ResultMap，通过<code>collection</code>标签建立一对多关系；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;resultMap id=&quot;selectCategoryWithResourceMap&quot; type=&quot;com.macro.mall.tiny.domain.UmsResourceCategoryExt&quot; extends=&quot;BaseResultMap&quot;&gt;
    &lt;collection property=&quot;resourceList&quot; columnPrefix=&quot;resource_&quot; resultMap=&quot;com.macro.mall.tiny.dao.UmsResourceDao.BaseResultMap&quot;/&gt;
&lt;/resultMap&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>然后在xml中编写具体的SQL实现，使用该ResultMap。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;select id=&quot;selectCategoryWithResource&quot; resultMap=&quot;selectCategoryWithResourceMap&quot;&gt;
    select urc.id,
           urc.create_time,
           urc.name,
           urc.sort,
           ur.id resource_id,
           ur.create_time resource_create_time,
           ur.name resource_name,
           ur.url resource_url,
           ur.description resource_description,
           ur.category_id resource_category_id
    from ums_resource_category urc
    left join ums_resource ur on urc.id = ur.category_id
    where urc.id = #{id}
&lt;/select&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="分页插件" tabindex="-1"><a class="header-anchor" href="#分页插件" aria-hidden="true">#</a> 分页插件</h3><ul><li>我们平时实现查询逻辑时，往往还会遇到分页查询的需求，直接使用开源的<code>PageHelper</code>插件即可，首先在<code>pom.xml</code>中添加它的Starter；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;!--MyBatis分页插件--&gt;
&lt;dependency&gt;
    &lt;groupId&gt;com.github.pagehelper&lt;/groupId&gt;
    &lt;artifactId&gt;pagehelper-spring-boot-starter&lt;/artifactId&gt;
    &lt;version&gt;1.4.2&lt;/version&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>然后在查询方法之前使用它的<code>startPage</code>方法传入分页参数即可，分页后的得到的数据可以在<code>PageInfo</code>中获取到。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**

 * UmsResource的Service接口实现类

 * Created by macro on 2022/10/20.

 */
@Service
public class UmsResourceServiceImpl implements UmsResourceService {

    @Autowired
    private UmsResourceDao umsResourceDao;

    @Override
    public PageInfo&lt;UmsResource&gt; page(Integer pageNum, Integer pageSize,Long categoryId) {
        PageHelper.startPage(pageNum,pageSize);
        List&lt;UmsResource&gt; resourceList = umsResourceDao.selectListByCategoryId(categoryId);
        PageInfo&lt;UmsResource&gt; pageInfo = new PageInfo&lt;&gt;(resourceList);
        return pageInfo;
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>本文主要介绍了MyBatis中一些比较常规的用法，涵盖了SpringBoot集成、基本查询、动态SQL和高级查询，建议大家收藏起来，在对MyBatis的用法有所遗忘的时候拿出来看看。</p>`,107),b={href:"https://github.com/macrozheng/mall-learning/tree/master/mall-tiny-mybatis",target:"_blank",rel:"noopener noreferrer"},g=e("hr",null,null,-1),p=e("p",null,"没有什么使我停留——除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟。",-1),h={href:"https://mp.weixin.qq.com/s/gOuoM27tl4l6GW7aqZu98Q",target:"_blank",rel:"noopener noreferrer"},q={href:"https://mp.weixin.qq.com/s/3Iry19JaEoN4pA3-JDtVhw",target:"_blank",rel:"noopener noreferrer"},x={href:"https://mp.weixin.qq.com/s/CyJAVQza-9zmDdboStKe8w",target:"_blank",rel:"noopener noreferrer"},y={href:"https://mp.weixin.qq.com/s/4qHRBcJn1AvP07U4H6JcOQ",target:"_blank",rel:"noopener noreferrer"},_={href:"https://mp.weixin.qq.com/s/MGqyie9KvD6kH8Tuv2mqOw",target:"_blank",rel:"noopener noreferrer"},f={href:"https://mp.weixin.qq.com/s/Pu1cddsQOiMfCU4I96iygQ",target:"_blank",rel:"noopener noreferrer"},U={href:"https://mp.weixin.qq.com/s/9f_sOLiRwDS3pzC-mJ9jLQ",target:"_blank",rel:"noopener noreferrer"},R={href:"https://mp.weixin.qq.com/s/zYLEUmbfmiKeFk03e1TxbA",target:"_blank",rel:"noopener noreferrer"},B={href:"https://mp.weixin.qq.com/s/QYFB2NHhyZSBfdgSUcZU5g",target:"_blank",rel:"noopener noreferrer"},k={href:"https://mp.weixin.qq.com/s/SfEUk-4hE6ezUk2Lu6cd2g",target:"_blank",rel:"noopener noreferrer"},M=e("p",null,[e("img",{src:"https://files.mdnice.com/user/3903/b7e50cf4-6fca-4511-9bfd-aa1ed9eb587b.png",alt:"",loading:"lazy"})],-1);function w(L,S){const n=r("ExternalLinkIcon");return d(),a("div",null,[e("blockquote",null,[e("p",null,[e("a",u,[i("二哥的编程星球"),l(n)]),i("已经有 "),v,i(" 球友加入了，如果你也需要一个良好的学习氛围，"),e("a",m,[i("戳链接"),l(n)]),i("加入我们吧！这是一个Java学习指南+编程实战+LeetCode 刷题的私密圈子，你可以向二哥提问、帮你制定学习计划、和球友一起打卡成长，冲冲冲。")])]),o,e("blockquote",null,[e("p",null,[i("项目源码地址: "),e("a",b,[i("https://github.com/macrozheng/mall-learning/tree/master/mall-tiny-mybatis"),l(n)])])]),g,p,e("ul",null,[e("li",null,[e("a",h,[i("曝光秋招毁约公司"),l(n)])]),e("li",null,[e("a",q,[i("垃圾外包，离职也罢"),l(n)])]),e("li",null,[e("a",x,[i("非科班转码"),l(n)])]),e("li",null,[e("a",y,[i("推荐 10 个神级 Intellij IDEA 插件"),l(n)])]),e("li",null,[e("a",_,[i("美团率先开奖 24k，不甘心？"),l(n)])]),e("li",null,[e("a",f,[i("Fleet，Java 轻量级 IDE 的未来？"),l(n)])]),e("li",null,[e("a",U,[i("先不管那么多，offer 接了再说"),l(n)])]),e("li",null,[e("a",R,[i("一套 KTV 管理系统，估价 3 万还是 30 万？"),l(n)])]),e("li",null,[e("a",B,[i("给 offer 的公司不问技术细节？"),l(n)])]),e("li",null,[e("a",k,[i("入职一个月，就想跑路了？"),l(n)])])]),M])}const A=s(c,[["render",w],["__file","mybatiszyytszhwskczjsj.html.vue"]]);export{A as default};
