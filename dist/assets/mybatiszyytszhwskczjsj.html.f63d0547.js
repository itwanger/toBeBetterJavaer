import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";import{r as d,o as a,c as t,a as e,b as l,d as i,e as r}from"./app.36bfa2ec.js";const c={},u={href:"https://mp.weixin.qq.com/s/e5Q4aJCX9xccTzBBGepx4g",target:"_blank",rel:"noopener noreferrer"},v=i("\u4E8C\u54E5\u7684\u7F16\u7A0B\u661F\u7403"),m=i("\u5DF2\u7ECF\u6709 "),o=e("strong",null,"950 \u591A\u540D",-1),b=i(" \u7403\u53CB\u52A0\u5165\u4E86\uFF0C\u5982\u679C\u4F60\u4E5F\u9700\u8981\u4E00\u4E2A\u826F\u597D\u7684\u5B66\u4E60\u6C1B\u56F4\uFF0C"),g={href:"https://mp.weixin.qq.com/s/e5Q4aJCX9xccTzBBGepx4g",target:"_blank",rel:"noopener noreferrer"},p=i("\u6233\u94FE\u63A5"),h=i("\u52A0\u5165\u6211\u4EEC\u5427\uFF01\u8FD9\u662F\u4E00\u4E2AJava\u5B66\u4E60\u6307\u5357+\u7F16\u7A0B\u5B9E\u6218+LeetCode \u5237\u9898\u7684\u79C1\u5BC6\u5708\u5B50\uFF0C\u4F60\u53EF\u4EE5\u5411\u4E8C\u54E5\u63D0\u95EE\u3001\u5E2E\u4F60\u5236\u5B9A\u5B66\u4E60\u8BA1\u5212\u3001\u548C\u7403\u53CB\u4E00\u8D77\u6253\u5361\u6210\u957F\uFF0C\u51B2\u51B2\u51B2\u3002"),q=r(`<p>MyBatis\u662F\u4E00\u6B3E\u975E\u5E38\u6D41\u884C\u7684ORM\u6846\u67B6\uFF0C\u76F8\u4FE1\u5F88\u591A\u5C0F\u4F19\u4F34\u90FD\u5728\u4F7F\u7528\u3002\u6211\u4EEC\u7ECF\u5E38\u4F1A\u628A\u5B83\u548CMyBatis-Plus\u6216\u8005MBG\u4E00\u8D77\u4F7F\u7528\uFF0C\u7528\u591A\u4E86\u4E4B\u540E\u5BF9\u4E8E\u5176\u4E00\u4E9B\u5E38\u89C4\u64CD\u4F5C\u5C31\u4E0D\u592A\u719F\u6089\u4E86\u3002\u6700\u8FD1\u603B\u7ED3\u4E86\u4E0BMyBatis\u7684\u5B9E\u7528\u7528\u6CD5\u548C\u6280\u5DE7\uFF0C\u5E0C\u671B\u5BF9\u5927\u5BB6\u6709\u6240\u5E2E\u52A9\uFF01</p><h2 id="mybatis\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#mybatis\u7B80\u4ECB" aria-hidden="true">#</a> MyBatis\u7B80\u4ECB</h2><p>MyBatis\u652F\u6301\u81EA\u5B9A\u4E49SQL\u67E5\u8BE2\u3001\u5B58\u50A8\u8FC7\u7A0B\u548C\u9AD8\u7EA7\u6620\u5C04\uFF0C\u76EE\u524D\u5728Github\u4E0A\u5DF2\u6709<code>17k+Star</code>\u3002\u5728MyBatis\u4E2D\uFF0C\u6211\u4EEC\u53EF\u4EE5\u5728XML\u4E2D\u7F16\u5199SQL\u8BED\u53E5\uFF0C\u7136\u540E\u7ED1\u5B9A\u5230Java\u65B9\u6CD5\u4E2D\uFF0C\u901A\u8FC7\u53C2\u6570\u548C\u7ED3\u679C\u96C6\u7684\u81EA\u52A8\u6620\u5C04\u6765\u5B9E\u73B0\u590D\u6742\u7684\u67E5\u8BE2\u903B\u8F91\u3002MyBatis\u6D88\u9664\u4E86\u51E0\u4E4E\u6240\u6709JDBC\u64CD\u4F5C\u548C\u624B\u52A8\u7ED1\u5B9A\u53C2\u6570\u64CD\u4F5C\uFF0C\u4F7F\u7528\u8D77\u6765\u975E\u5E38\u65B9\u4FBF\uFF01</p><h2 id="\u5728springboot\u4E2D\u96C6\u6210" tabindex="-1"><a class="header-anchor" href="#\u5728springboot\u4E2D\u96C6\u6210" aria-hidden="true">#</a> \u5728SpringBoot\u4E2D\u96C6\u6210</h2><blockquote><p>\u4E0B\u9762\u6211\u4EEC\u6765\u804A\u804AMyBatis\u5728SpringBoot\u4E2D\u7684\u4F7F\u7528\uFF0C\u9996\u5148\u6211\u4EEC\u9700\u8981\u96C6\u6210\u5B83\u3002</p></blockquote><ul><li>\u5728<code>pom.xml</code>\u4E2D\u6DFB\u52A0MyBatis\u63D0\u4F9B\u7684Spring Boot Starter\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;dependency&gt;
    &lt;groupId&gt;org.mybatis.spring.boot&lt;/groupId&gt;
    &lt;artifactId&gt;mybatis-spring-boot-starter&lt;/artifactId&gt;
    &lt;version&gt;2.2.2&lt;/version&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u7136\u540E\u5728<code>application.yml</code>\u4E2D\u914D\u7F6E\u597D\u7F16\u5199SQL\u5B9E\u73B0\u7684<code>xml</code>\u6587\u4EF6\u8DEF\u5F84\uFF0C\u8FD9\u91CC\u6211\u4EEC\u5B58\u653E\u5728<code>resources/dao</code>\u76EE\u5F55\u4E0B\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>mybatis:
  mapper-locations:
    - classpath:dao/*.xml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u7136\u540E\u6DFB\u52A0Java\u914D\u7F6E\uFF0C\u901A\u8FC7<code>@MapperScan</code>\u914D\u7F6E\u597DDao\u63A5\u53E3\u8DEF\u5F84\uFF0C\u8FD9\u6837\u5C31\u53EF\u4EE5\u5F00\u59CB\u4F7F\u7528\u4E86\u3002</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/**

 * MyBatis\u914D\u7F6E\u7C7B

 * Created by macro on 2019/4/8.

 */
@Configuration
@MapperScan(&quot;com.macro.mall.tiny.dao&quot;)
public class MyBatisConfig {
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u57FA\u672C\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#\u57FA\u672C\u4F7F\u7528" aria-hidden="true">#</a> \u57FA\u672C\u4F7F\u7528</h2><blockquote><p>\u4E0B\u9762\u6211\u4EEC\u6765\u804A\u804AMyBatis\u7684\u57FA\u672C\u4F7F\u7528\u65B9\u6CD5\uFF0C\u6DB5\u76D6\u4E86\u57FA\u672C\u7684\u589E\u5220\u6539\u67E5\u64CD\u4F5C\u3002</p></blockquote><h3 id="\u8868\u7ED3\u6784\u8BF4\u660E" tabindex="-1"><a class="header-anchor" href="#\u8868\u7ED3\u6784\u8BF4\u660E" aria-hidden="true">#</a> \u8868\u7ED3\u6784\u8BF4\u660E</h3><p>\u8FD9\u91CC\u5C06\u4EE5mall\u9879\u76EE\u4E2D\u6743\u9650\u7BA1\u7406\u6A21\u5757\u76F8\u5173\u8868\u4E3A\u4F8B\u8FDB\u884C\u4ECB\u7ECD\uFF0C\u5177\u4F53\u8868\u7ED3\u6784\u5982\u4E0B\u3002</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mybatiszyytszhwskczjsj-e4c9fdba-fef0-43bf-9d1b-a58b1eae41e8.jpg" alt=""></p><h3 id="\u9879\u76EE\u7ED3\u6784\u8BF4\u660E" tabindex="-1"><a class="header-anchor" href="#\u9879\u76EE\u7ED3\u6784\u8BF4\u660E" aria-hidden="true">#</a> \u9879\u76EE\u7ED3\u6784\u8BF4\u660E</h3><p>\u672C\u6587\u793A\u4F8B\u4F7F\u7528\u4E86<code>mall-learning</code>\u9879\u76EE\u4E2D\u7684<code>mall-tiny-mybatis</code>\u6A21\u5757\u4EE3\u7801\uFF0C\u5177\u4F53\u9879\u76EE\u7ED3\u6784\u5982\u4E0B\u3002</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-mybatiszyytszhwskczjsj-89145395-c273-4300-8ec3-1676c2a4a855.jpg" alt=""></p><h3 id="select" tabindex="-1"><a class="header-anchor" href="#select" aria-hidden="true">#</a> select</h3><ul><li>\u9996\u5148\u662F\u67E5\u8BE2\u64CD\u4F5C\uFF0C\u8FD9\u91CC\u6211\u4EEC\u4EE5\u540E\u53F0\u7528\u6237\u8868<code>ums_admin</code>\u4E3A\u4F8B\uFF0C\u7F16\u5199\u4E00\u4E2A<code>\u6839\u636EID\u67E5\u8BE2\u7528\u6237</code>\u7684\u65B9\u6CD5\uFF0C\u5148\u521B\u5EFA\u5B9E\u4F53\u7C7B<code>UmsAdmin</code>\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class UmsAdmin implements Serializable {
    private Long id;

    private String username;

    private String password;

    @ApiModelProperty(value = &quot;\u5934\u50CF&quot;)
    private String icon;

    @ApiModelProperty(value = &quot;\u90AE\u7BB1&quot;)
    private String email;

    @ApiModelProperty(value = &quot;\u6635\u79F0&quot;)
    private String nickName;

    @ApiModelProperty(value = &quot;\u5907\u6CE8\u4FE1\u606F&quot;)
    private String note;

    @ApiModelProperty(value = &quot;\u521B\u5EFA\u65F6\u95F4&quot;)
    private Date createTime;

    @ApiModelProperty(value = &quot;\u6700\u540E\u767B\u5F55\u65F6\u95F4&quot;)
    private Date loginTime;

    @ApiModelProperty(value = &quot;\u5E10\u53F7\u542F\u7528\u72B6\u6001\uFF1A0-&gt;\u7981\u7528\uFF1B1-&gt;\u542F\u7528&quot;)
    private Integer status;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u7136\u540E\u521B\u5EFA\u6570\u636E\u64CD\u4F5C\u7684\u63A5\u53E3<code>UmsAdminDao</code>\uFF0C\u518D\u6DFB\u52A0\u5BF9\u5E94\u7684\u65B9\u6CD5\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/**

 * \u81EA\u5B9A\u4E49UmsAdmin\u8868\u67E5\u8BE2

 * Created by macro on 2022/10/20.

 */
@Repository
public interface UmsAdminDao {

    /**

     * \u6839\u636EID\u67E5\u8BE2\u7528\u6237

     */
    UmsAdmin selectByIdSimple(Long id);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u518D\u521B\u5EFA<code>xml</code>\u6587\u4EF6<code>UmsAdminDao.xml</code>\uFF0C\u6DFB\u52A0\u67E5\u8BE2\u65B9\u6CD5\u7684SQL\u5B9E\u73B0\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;select id=&quot;selectByIdSimple&quot; resultType=&quot;com.macro.mall.tiny.model.UmsAdmin&quot;&gt;
    select * from ums_admin where id = #{id}
&lt;/select&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u7136\u540E\u7F16\u5199\u6D4B\u8BD5\u7C7B\uFF0C\u6CE8\u5165Dao\uFF0C\u8C03\u7528Dao\u65B9\u6CD5\u6765\u8FDB\u884C\u6D4B\u8BD5\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/**

 * MyBatis\u57FA\u672C\u64CD\u4F5C\u6D4B\u8BD5

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u6B64\u65F6\u4F60\u4F1A\u53D1\u73B0\uFF0C\u5BF9\u4E8E\u4E00\u4E9B\u6570\u636E\u5E93\u8868\u4E2D\u4EE5<code>\u4E0B\u5212\u7EBF</code>\u5206\u5272\u7684\u8FD4\u56DE\u5B57\u6BB5\u65E0\u6CD5\u81EA\u52A8\u6620\u5C04\uFF0C\u53EF\u4EE5\u901A\u8FC7\u5BF9\u5B57\u6BB5\u53D6\u522B\u540D\u7684\u65B9\u5F0F\u6765\u8FDB\u884C\u6620\u5C04\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;select id=&quot;selectById&quot; resultType=&quot;com.macro.mall.tiny.model.UmsAdmin&quot;&gt;
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u5982\u679C\u4F60\u89C9\u5F97\u8FD9\u79CD\u65B9\u5F0F\u6BD4\u8F83\u9EBB\u70E6\uFF0C\u4E5F\u53EF\u4EE5\u901A\u8FC7\u5728<code>application.yml</code>\u4E2D\u5F00\u542F\u5168\u5C40\u4E0B\u5212\u7EBF\u81EA\u52A8\u8F6C\u9A7C\u5CF0\u529F\u80FD\u6765\u89E3\u51B3\uFF0C\u4E2A\u4EBA\u4E60\u60EF\u4F7F\u7528\u7B2C\u4E00\u79CD\u3002</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>mybatis:
  configuration:
    # \u4E0B\u5212\u7EBF\u81EA\u52A8\u8F6C\u9A7C\u5CF0
    map-underscore-to-camel-case: true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="insert" tabindex="-1"><a class="header-anchor" href="#insert" aria-hidden="true">#</a> insert</h3><ul><li>\u63A5\u4E0B\u6765\u6211\u4EEC\u6765\u7F16\u5199\u4E00\u4E2A<code>\u63D2\u5165\u5355\u4E2A\u7528\u6237</code>\u7684\u65B9\u6CD5\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/**

 * \u81EA\u5B9A\u4E49UmsAdmin\u8868\u67E5\u8BE2

 * Created by macro on 2022/10/20.

 */
@Repository
public interface UmsAdminDao {

    /**

     * \u63D2\u5165\u7528\u6237

     */
    int insert(UmsAdmin entity);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u7136\u540E\u5728xml\u4E2D\u7F16\u5199\u5BF9\u5E94\u7684SQL\u5B9E\u73B0\uFF0C\u8FD9\u91CC\u9700\u8981\u6CE8\u610F\u7684\u662F\u5982\u679C\u60F3\u8FD4\u56DE\u63D2\u5165\u540E\u7684\u81EA\u589EID\u7684\u8BDD\uFF0C\u9700\u8981\u4F7F\u7528<code>selectKey</code>\u6807\u7B7E\u8FDB\u884C\u914D\u7F6E\u3002</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;insert id=&quot;insert&quot;&gt;
    insert into ums_admin(username, password, icon, email, nick_name, note, create_time, login_time)
    values (#{username}, #{password}, #{icon}, #{email}, #{nickName}, #{note}, #{createTime}, #{loginTime})
    &lt;selectKey keyColumn=&quot;id&quot; resultType=&quot;long&quot; keyProperty=&quot;id&quot; order=&quot;AFTER&quot;&gt;
        SELECT LAST_INSERT_ID()
    &lt;/selectKey&gt;
&lt;/insert&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="update" tabindex="-1"><a class="header-anchor" href="#update" aria-hidden="true">#</a> update</h3><ul><li>\u63A5\u4E0B\u6765\u6211\u4EEC\u6765\u7F16\u5199\u4E00\u4E2A<code>\u6839\u636EID\u4FEE\u6539\u7528\u6237\u4FE1\u606F</code>\u7684\u65B9\u6CD5\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/**

 * \u81EA\u5B9A\u4E49UmsAdmin\u8868\u67E5\u8BE2

 * Created by macro on 2022/10/20.

 */
@Repository
public interface UmsAdminDao {
    /**

     * \u6839\u636EID\u4FEE\u6539\u7528\u6237\u4FE1\u606F

     */
    int updateById(UmsAdmin entity);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u7136\u540E\u5728xml\u4E2D\u7F16\u5199\u5BF9\u5E94\u7684SQL\u5B9E\u73B0\u3002</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;update id=&quot;updateById&quot;&gt;
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="delete" tabindex="-1"><a class="header-anchor" href="#delete" aria-hidden="true">#</a> delete</h3><ul><li>\u63A5\u4E0B\u6765\u6211\u4EEC\u6765\u7F16\u5199\u4E00\u4E2A<code>\u6839\u636EID\u5220\u9664\u7528\u6237</code>\u7684\u65B9\u6CD5\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/**

 * \u81EA\u5B9A\u4E49UmsAdmin\u8868\u67E5\u8BE2

 * Created by macro on 2022/10/20.

 */
@Repository
public interface UmsAdminDao {
    /**

     * \u6839\u636EID\u5220\u9664\u7528\u6237

     */
    int deleteById(Long id);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u7136\u540E\u5728xml\u4E2D\u7F16\u5199\u5BF9\u5E94\u7684SQL\u5B9E\u73B0\u3002</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;delete id=&quot;deleteById&quot;&gt;
    delete from  ums_admin where id = #{id}
&lt;/delete&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u52A8\u6001sql" tabindex="-1"><a class="header-anchor" href="#\u52A8\u6001sql" aria-hidden="true">#</a> \u52A8\u6001SQL</h2><blockquote><p>\u901A\u8FC7MyBatis\u7684\u52A8\u6001SQL\u529F\u80FD\uFF0C\u6211\u4EEC\u53EF\u4EE5\u7075\u6D3B\u5730\u5728xml\u4E2D\u5B9E\u73B0\u5404\u79CD\u590D\u6742\u7684\u64CD\u4F5C\uFF0C\u52A8\u6001SQL\u529F\u80FD\u9700\u8981\u4F9D\u8D56MyBatis\u7684\u5404\u79CD\u6807\u7B7E\uFF0C\u4E0B\u9762\u6211\u4EEC\u5C31\u6765\u5B66\u4E60\u4E0B\u3002</p></blockquote><h3 id="if" tabindex="-1"><a class="header-anchor" href="#if" aria-hidden="true">#</a> if</h3><ul><li><code>if</code>\u6807\u7B7E\u53EF\u4EE5\u5B9E\u73B0\u5224\u65AD\u903B\u8F91\uFF0C\u8FD9\u91CC\u6211\u4EEC\u4EE5<code>\u6839\u636E\u7528\u6237\u540D\u548CEmail\u6A21\u7CCA\u67E5\u8BE2\u7528\u6237</code>\u4E3A\u4F8B\uFF0C\u6765\u804A\u804A\u5B83\u7684\u4F7F\u7528\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/**

 * \u81EA\u5B9A\u4E49UmsAdmin\u8868\u67E5\u8BE2

 * Created by macro on 2022/10/20.

 */
@Repository
public interface UmsAdminDao {
    /**

     * \u6839\u636E\u7528\u6237\u540D\u548CEmail\u6A21\u7CCA\u67E5\u8BE2\u7528\u6237

     * \u4E0D\u8F93\u5165\u67E5\u8BE2\u6240\u6709

     */
    List&lt;UmsAdmin&gt; selectByUsernameAndEmailLike(@Param(&quot;username&quot;) String username, @Param(&quot;email&quot;) String email);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>xml\u4E2D\u6DFB\u52A0\u5BF9\u5E94\u7684SQL\u5B9E\u73B0\u5982\u4E0B\u3002</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;select id=&quot;selectByUsernameAndEmailLike&quot; resultType=&quot;com.macro.mall.tiny.model.UmsAdmin&quot;&gt;
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="choose" tabindex="-1"><a class="header-anchor" href="#choose" aria-hidden="true">#</a> choose</h3><ul><li><code>choose</code>\u6807\u7B7E\u4E5F\u53EF\u4EE5\u5B9E\u73B0\u5224\u65AD\u903B\u8F91\uFF0C\u4E0A\u9762\u7684\u4F8B\u5B50\u4E2D\u5F53\u6211\u4EEC\u4E0D\u8F93\u5165\u7528\u6237\u540D\u548CEmail\u65F6\uFF0C\u4F1A\u67E5\u8BE2\u51FA\u5168\u90E8\u7528\u6237\uFF0C\u6211\u4EEC\u5982\u679C\u60F3\u4E0D\u67E5\u8BE2\u51FA\u7528\u6237\uFF0C\u53EF\u4EE5\u4F7F\u7528\u5B83\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;select id=&quot;selectByUsernameAndEmailLike2&quot; resultType=&quot;com.macro.mall.tiny.model.UmsAdmin&quot;&gt;
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="where" tabindex="-1"><a class="header-anchor" href="#where" aria-hidden="true">#</a> where</h3><ul><li>\u4E0A\u9762\u7684\u4F8B\u5B50\u4E2D\u6211\u4EEC\u4E3A\u4E86SQL\u62FC\u63A5\u4E0D\u51FA\u9519\uFF0C\u6DFB\u52A0\u4E86<code>where 1=1</code>\u8FD9\u6837\u7684\u8BED\u53E5\uFF0C\u5176\u5B9E\u53EF\u4EE5\u4F7F\u7528<code>where</code>\u6807\u7B7E\u6765\u5B9E\u73B0\u67E5\u8BE2\u6761\u4EF6\uFF0C\u5F53\u6807\u7B7E\u5185\u6CA1\u6709\u5185\u5BB9\u65F6\u4F1A\u81EA\u52A8\u53BB\u9664<code>where</code>\u5173\u952E\u5B57\uFF0C\u540C\u65F6\u8FD8\u4F1A\u53BB\u9664\u5F00\u5934\u591A\u4F59\u7684<code>and</code>\u5173\u952E\u5B57\u3002</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;select id=&quot;selectByUsernameAndEmailLike3&quot; resultType=&quot;com.macro.mall.tiny.model.UmsAdmin&quot;&gt;
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="set" tabindex="-1"><a class="header-anchor" href="#set" aria-hidden="true">#</a> set</h3><ul><li>\u5F53\u6211\u4EEC\u62FC\u63A5\u66F4\u65B0\u5B57\u6BB5\u7684\u8BED\u53E5\u65F6\uFF0C\u4E5F\u4F1A\u9762\u4E34\u540C\u6837\u7684\u95EE\u9898\uFF0C\u6B64\u65F6\u53EF\u4EE5\u4F7F\u7528<code>set</code>\u6807\u7B7E\u6765\u89E3\u51B3\uFF0C\u6BD4\u5982\u6211\u4EEC\u73B0\u5728\u60F3\u5199\u4E00\u4E2A<code>\u6839\u636EID\u9009\u62E9\u6027\u4FEE\u6539\u7528\u6237\u4FE1\u606F</code>\u7684\u65B9\u6CD5\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/**

 * \u81EA\u5B9A\u4E49UmsAdmin\u8868\u67E5\u8BE2

 * Created by macro on 2022/10/20.

 */
@Repository
public interface UmsAdminDao {
    /**

     * \u6839\u636EID\u9009\u62E9\u6027\u4FEE\u6539\u7528\u6237\u4FE1\u606F

     */
    int updateByIdSelective(UmsAdmin entity);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u65B9\u6CD5\u5BF9\u5E94\u7684SQL\u5B9E\u73B0\u5982\u4E0B\uFF0C\u8FD9\u91CC\u65E2\u907F\u514D\u4E86\u4F7F\u7528<code>set</code>\u5173\u952E\u5B57\uFF0C\u4E5F\u4F1A\u5C06\u591A\u4F59\u7684\u9017\u53F7\u53BB\u9664\u3002</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;update id=&quot;updateByIdSelective&quot;&gt;
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="foreach" tabindex="-1"><a class="header-anchor" href="#foreach" aria-hidden="true">#</a> foreach</h3><ul><li>\u901A\u8FC7<code>foreach</code>\u6211\u4EEC\u53EF\u4EE5\u5B9E\u73B0\u4E00\u4E9B\u5FAA\u73AF\u62FC\u63A5SQL\u7684\u903B\u8F91\uFF0C\u4F8B\u5982\u6211\u4EEC\u73B0\u5728\u9700\u8981\u7F16\u5199\u4E00\u4E2A<code>\u6279\u91CF\u63D2\u5165\u7528\u6237</code>\u7684\u65B9\u6CD5\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/**

 * \u81EA\u5B9A\u4E49UmsAdmin\u8868\u67E5\u8BE2

 * Created by macro on 2022/10/20.

 */
@Repository
public interface UmsAdminDao {
    /**

     * \u6279\u91CF\u63D2\u5165\u7528\u6237

     */
    int insertBatch(@Param(&quot;entityList&quot;) List&lt;UmsAdmin&gt; adminList);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u5728xml\u4E2D\u7684\u5BF9\u5E94SQL\u5B9E\u73B0\u5982\u4E0B\uFF0C\u5728<code>foreach</code>\u6807\u7B7E\u4E2D\u7684\u5185\u5BB9\u4F1A\u6839\u636E\u4F20\u5165\u7684\u96C6\u5408\u53C2\u6570\u8FDB\u884C\u5FAA\u73AF\u62FC\u63A5\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;insert id=&quot;insertBatch&quot;&gt;
    insert into ums_admin(username, password, icon, email, nick_name, note, create_time, login_time) values
    &lt;foreach collection=&quot;entityList&quot; separator=&quot;,&quot; item=&quot;item&quot;&gt;
        (#{item.username}, #{item.password}, #{item.icon}, #{item.email}, #{item.nickName}, #{item.note}, #{item.createTime}, #{item.loginTime})
    &lt;/foreach&gt;
&lt;/insert&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u518D\u4F8B\u5982\u6211\u4EEC\u73B0\u5728\u9700\u8981\u7F16\u5199\u4E00\u4E2A<code>\u6839\u636E\u7528\u6237ID\u6279\u91CF\u67E5\u8BE2</code>\u7684\u65B9\u6CD5\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/**

 * \u81EA\u5B9A\u4E49UmsAdmin\u8868\u67E5\u8BE2

 * Created by macro on 2022/10/20.

 */
@Repository
public interface UmsAdminDao {
    /**

     * \u6839\u636E\u7528\u6237ID\u6279\u91CF\u67E5\u8BE2

     */
    List&lt;UmsAdmin&gt; selectByIds(@Param(&quot;ids&quot;) List&lt;Long&gt; ids);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u5728xml\u4E2D\u7684\u5BF9\u5E94SQL\u5B9E\u73B0\u5982\u4E0B\uFF0C\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528<code>open</code>\u3001<code>close</code>\u5C5E\u6027\u6307\u5B9A\u62FC\u63A5\u8BED\u53E5\u7684\u524D\u540E\u7F00\u3002</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;select id=&quot;selectByIds&quot; resultType=&quot;com.macro.mall.tiny.model.UmsAdmin&quot;&gt;
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u9AD8\u7EA7\u67E5\u8BE2" tabindex="-1"><a class="header-anchor" href="#\u9AD8\u7EA7\u67E5\u8BE2" aria-hidden="true">#</a> \u9AD8\u7EA7\u67E5\u8BE2</h2><blockquote><p>\u4ECB\u7ECD\u5B8CMyBatis\u7684\u57FA\u672C\u64CD\u4F5C\u540E\uFF0C\u6211\u4EEC\u518D\u6765\u4ECB\u7ECD\u4E0BMyBatis\u7684\u9AD8\u7EA7\u67E5\u8BE2\u529F\u80FD\u3002</p></blockquote><h3 id="\u4E00\u5BF9\u4E00\u6620\u5C04" tabindex="-1"><a class="header-anchor" href="#\u4E00\u5BF9\u4E00\u6620\u5C04" aria-hidden="true">#</a> \u4E00\u5BF9\u4E00\u6620\u5C04</h3><ul><li>\u5728\u6211\u4EEC\u5E73\u65F6\u8FDB\u884CSQL\u67E5\u8BE2\u65F6\uFF0C\u5F80\u5F80\u4F1A\u6709<code>\u4E00\u5BF9\u4E00</code>\u7684\u60C5\u51B5\uFF0C\u6BD4\u5982\u8BF4\u6211\u4EEC\u8FD9\u91CC\u6709\u8D44\u6E90\u5206\u7C7B<code>ums_resource_category</code>\u548C\u8D44\u6E90<code>ums_resource</code>\u4E24\u5F20\u8868\uFF0C\u8D44\u6E90\u548C\u5206\u7C7B\u5C31\u662F\u4E00\u5BF9\u4E00\u7684\u5173\u7CFB\uFF0C\u5982\u679C\u4F60\u4E0D\u60F3\u6539\u52A8\u539F\u5B9E\u4F53\u7C7B\u7684\u8BDD\uFF0C\u53EF\u4EE5\u7F16\u5199\u4E00\u4E2A\u6269\u5C55\u7C7B\u7EE7\u627F<code>UmsResource</code>\uFF0C\u5E76\u5305\u542B<code>UmsResourceCategory</code>\u5C5E\u6027\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/**

 * UmsResource\u6269\u5C55\u7C7B

 * Created by macro on 2022/10/20.

 */
@Data
public class UmsResourceExt extends UmsResource {

    private UmsResourceCategory category;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u4F8B\u5982\u6211\u4EEC\u9700\u8981\u7F16\u5199\u4E00\u4E2A<code>\u6839\u636E\u8D44\u6E90ID\u83B7\u53D6\u8D44\u6E90\u53CA\u5206\u7C7B\u4FE1\u606F</code>\u7684\u65B9\u6CD5\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/**

 * \u81EA\u5B9A\u4E49UmsResource\u8868\u67E5\u8BE2

 * Created by macro on 2022/10/20.

 */
@Repository
public interface UmsResourceDao {
    /**

     * \u6839\u636E\u8D44\u6E90ID\u83B7\u53D6\u8D44\u6E90\u53CA\u5206\u7C7B\u4FE1\u606F

     */
    UmsResourceExt selectResourceWithCategory(Long id);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u5728xml\u4E2D\u7684\u5177\u4F53SQL\u5B9E\u73B0\u5982\u4E0B\uFF0C\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7\u7ED9<code>ums_resource_category</code>\u8868\u4E2D\u5B57\u6BB5\u53D6\u4EE5<code>category.xxx</code>\u7684\u522B\u540D\u6765\u81EA\u52A8\u8FDB\u884C\u81EA\u52A8\u6620\u5C04\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;select id=&quot;selectResourceWithCategory&quot; resultType=&quot;com.macro.mall.tiny.domain.UmsResourceExt&quot;&gt;
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u5F53\u7136\u9664\u4E86\u8FD9\u79CD\u65B9\u5F0F\u4EE5\u5916\uFF0C\u6211\u4EEC\u8FD8\u53EF\u4EE5\u901A\u8FC7<code>ResultMap</code>+<code>association</code>\u6807\u7B7E\u6765\u5B9E\u73B0\uFF0C\u4E0D\u8FC7\u5728\u6B64\u4E4B\u524D\u6211\u4EEC\u5728\u7F16\u5199xml\u6587\u4EF6\u7684\u65F6\u5019\uFF0C\u4E00\u822C\u4E60\u60EF\u4E8E\u5148\u7ED9\u5F53\u524D\u6587\u4EF6\u5199\u4E00\u4E2A<code>BaseResultMap</code>\uFF0C\u7528\u4E8E\u5BF9\u5F53\u524D\u8868\u7684\u5B57\u6BB5\u548C\u5BF9\u8C61\u5C5E\u6027\u8FDB\u884C\u76F4\u63A5\u6620\u5C04\uFF0C\u4F8B\u5982\u5728<code>UmsResourceCategoryDao.xml</code>\u4E2D\u8FD9\u6837\u5B9E\u73B0\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;!DOCTYPE mapper PUBLIC &quot;-//mybatis.org//DTD Mapper 3.0//EN&quot; &quot;http://mybatis.org/dtd/mybatis-3-mapper.dtd&quot;&gt;
&lt;mapper namespace=&quot;com.macro.mall.tiny.dao.UmsResourceCategoryDao&quot;&gt;

    &lt;resultMap id=&quot;BaseResultMap&quot; type=&quot;com.macro.mall.tiny.model.UmsResourceCategory&quot;&gt;
        &lt;id property=&quot;id&quot; column=&quot;id&quot;/&gt;
        &lt;result property=&quot;createTime&quot; column=&quot;create_time&quot;/&gt;
        &lt;result property=&quot;name&quot; column=&quot;name&quot;/&gt;
        &lt;result property=&quot;sort&quot; column=&quot;sort&quot;/&gt;
    &lt;/resultMap&gt;
&lt;/mapper&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u5728<code>UmsResourceDao.xml</code>\u4E2D\u6211\u4EEC\u53EF\u4EE5\u8FD9\u6837\u5B9E\u73B0\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u7F16\u5199\u5B8C\u6210\u540E\uFF0C\u6211\u4EEC\u7684\u4E00\u5BF9\u4E00<code>ResultMap</code>\u5B9E\u73B0\u5C31\u5F88\u7B80\u5355\u4E86\uFF0C\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528<code>association</code>\u6807\u7B7E\u8FDB\u884C\u4E00\u5BF9\u4E00\u7BA1\u7406\uFF0C\u914D\u7F6E<code>columnPrefix</code>\u5C5E\u6027\u5C06\u5339\u914D\u5230\u7684\u5B57\u6BB5\u76F4\u63A5\u6620\u5C04\u5230\u5173\u8054\u5BF9\u8C61\u4E2D\u53BB\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;resultMap id=&quot;ResourceWithCategoryMap&quot; type=&quot;com.macro.mall.tiny.domain.UmsResourceExt&quot; extends=&quot;BaseResultMap&quot;&gt;
    &lt;association property=&quot;category&quot; resultMap=&quot;com.macro.mall.tiny.dao.UmsResourceCategoryDao.BaseResultMap&quot; columnPrefix=&quot;category_&quot;/&gt;
&lt;/resultMap&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u7136\u540E\u518D\u7F16\u5199\u4E0BDao\u4E2D\u65B9\u6CD5\u5BF9\u5E94SQL\u5B9E\u73B0\u5373\u53EF\uFF0C\u8FD9\u91CC\u76F4\u63A5\u4F7F\u7528\u4E0A\u9762\u7684ResultMap\uFF0C\u540C\u65F6\u7ED9<code>ums_resource_category</code>\u8868\u4E2D\u7684\u5B57\u6BB5\u6307\u5B9A\u4E86<code>category_</code>\u524D\u7F00\u4EE5\u4FBF\u4E8E\u6620\u5C04\u3002</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;select id=&quot;selectResourceWithCategory2&quot; resultMap=&quot;ResourceWithCategoryMap&quot;&gt;
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u4E00\u5BF9\u591A\u6620\u5C04" tabindex="-1"><a class="header-anchor" href="#\u4E00\u5BF9\u591A\u6620\u5C04" aria-hidden="true">#</a> \u4E00\u5BF9\u591A\u6620\u5C04</h3><ul><li>\u5728\u7F16\u5199SQL\u67E5\u8BE2\u65F6\uFF0C\u4E00\u5BF9\u591A\u7684\u60C5\u51B5\u4E5F\u6BD4\u8F83\u5E38\u89C1\uFF0C\u4F8B\u5982\u8FD9\u91CC\u7684\u5206\u7C7B\u548C\u8D44\u6E90\u5C31\u662F\u4E00\u5BF9\u591A\u7684\u60C5\u51B5\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/**

 * UmsResourceCategory\u6269\u5C55\u7C7B

 * Created by macro on 2022/10/20.

 */
@Data
public class UmsResourceCategoryExt extends UmsResourceCategory {

    private List&lt;UmsResource&gt; resourceList;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u4F8B\u5982\u6211\u4EEC\u73B0\u5728\u9700\u8981\u7F16\u5199\u4E00\u4E2A<code>\u6839\u636E\u5206\u7C7BID\u83B7\u53D6\u5206\u7C7B\u53CA\u5BF9\u5E94\u8D44\u6E90</code>\u7684\u65B9\u6CD5\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/**

 * \u81EA\u5B9A\u4E49UmsResourceCategory\u8868\u67E5\u8BE2

 * Created by macro on 2022/10/20.

 */
@Repository
public interface UmsResourceCategoryDao {

    /**

     * \u6839\u636E\u5206\u7C7BID\u83B7\u53D6\u5206\u7C7B\u53CA\u5BF9\u5E94\u8D44\u6E90

     */
    UmsResourceCategoryExt selectCategoryWithResource(Long id);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u5728\u5B9E\u73B0\u5177\u4F53SQL\u524D\uFF0C\u6211\u4EEC\u9700\u8981\u5148\u5728xml\u4E2D\u914D\u7F6E\u4E00\u4E2AResultMap\uFF0C\u901A\u8FC7<code>collection</code>\u6807\u7B7E\u5EFA\u7ACB\u4E00\u5BF9\u591A\u5173\u7CFB\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;resultMap id=&quot;selectCategoryWithResourceMap&quot; type=&quot;com.macro.mall.tiny.domain.UmsResourceCategoryExt&quot; extends=&quot;BaseResultMap&quot;&gt;
    &lt;collection property=&quot;resourceList&quot; columnPrefix=&quot;resource_&quot; resultMap=&quot;com.macro.mall.tiny.dao.UmsResourceDao.BaseResultMap&quot;/&gt;
&lt;/resultMap&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u7136\u540E\u5728xml\u4E2D\u7F16\u5199\u5177\u4F53\u7684SQL\u5B9E\u73B0\uFF0C\u4F7F\u7528\u8BE5ResultMap\u3002</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;select id=&quot;selectCategoryWithResource&quot; resultMap=&quot;selectCategoryWithResourceMap&quot;&gt;
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5206\u9875\u63D2\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u5206\u9875\u63D2\u4EF6" aria-hidden="true">#</a> \u5206\u9875\u63D2\u4EF6</h3><ul><li>\u6211\u4EEC\u5E73\u65F6\u5B9E\u73B0\u67E5\u8BE2\u903B\u8F91\u65F6\uFF0C\u5F80\u5F80\u8FD8\u4F1A\u9047\u5230\u5206\u9875\u67E5\u8BE2\u7684\u9700\u6C42\uFF0C\u76F4\u63A5\u4F7F\u7528\u5F00\u6E90\u7684<code>PageHelper</code>\u63D2\u4EF6\u5373\u53EF\uFF0C\u9996\u5148\u5728<code>pom.xml</code>\u4E2D\u6DFB\u52A0\u5B83\u7684Starter\uFF1B</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;!--MyBatis\u5206\u9875\u63D2\u4EF6--&gt;
&lt;dependency&gt;
    &lt;groupId&gt;com.github.pagehelper&lt;/groupId&gt;
    &lt;artifactId&gt;pagehelper-spring-boot-starter&lt;/artifactId&gt;
    &lt;version&gt;1.4.2&lt;/version&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u7136\u540E\u5728\u67E5\u8BE2\u65B9\u6CD5\u4E4B\u524D\u4F7F\u7528\u5B83\u7684<code>startPage</code>\u65B9\u6CD5\u4F20\u5165\u5206\u9875\u53C2\u6570\u5373\u53EF\uFF0C\u5206\u9875\u540E\u7684\u5F97\u5230\u7684\u6570\u636E\u53EF\u4EE5\u5728<code>PageInfo</code>\u4E2D\u83B7\u53D6\u5230\u3002</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/**

 * UmsResource\u7684Service\u63A5\u53E3\u5B9E\u73B0\u7C7B

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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u603B\u7ED3" tabindex="-1"><a class="header-anchor" href="#\u603B\u7ED3" aria-hidden="true">#</a> \u603B\u7ED3</h2><p>\u672C\u6587\u4E3B\u8981\u4ECB\u7ECD\u4E86MyBatis\u4E2D\u4E00\u4E9B\u6BD4\u8F83\u5E38\u89C4\u7684\u7528\u6CD5\uFF0C\u6DB5\u76D6\u4E86SpringBoot\u96C6\u6210\u3001\u57FA\u672C\u67E5\u8BE2\u3001\u52A8\u6001SQL\u548C\u9AD8\u7EA7\u67E5\u8BE2\uFF0C\u5EFA\u8BAE\u5927\u5BB6\u6536\u85CF\u8D77\u6765\uFF0C\u5728\u5BF9MyBatis\u7684\u7528\u6CD5\u6709\u6240\u9057\u5FD8\u7684\u65F6\u5019\u62FF\u51FA\u6765\u770B\u770B\u3002</p><blockquote><p>\u9879\u76EE\u6E90\u7801\u5730\u5740: https://github.com/macrozheng/mall-learning/tree/master/mall-tiny-mybatis</p></blockquote><hr><p>\u6CA1\u6709\u4EC0\u4E48\u4F7F\u6211\u505C\u7559\u2014\u2014\u9664\u4E86\u76EE\u7684\uFF0C\u7EB5\u7136\u5CB8\u65C1\u6709\u73AB\u7470\u3001\u6709\u7EFF\u836B\u3001\u6709\u5B81\u9759\u7684\u6E2F\u6E7E\uFF0C\u6211\u662F\u4E0D\u7CFB\u4E4B\u821F\u3002</p>`,110),x={href:"https://mp.weixin.qq.com/s/gOuoM27tl4l6GW7aqZu98Q",target:"_blank",rel:"noopener noreferrer"},y=i("\u66DD\u5149\u79CB\u62DB\u6BC1\u7EA6\u516C\u53F8"),_={href:"https://mp.weixin.qq.com/s/3Iry19JaEoN4pA3-JDtVhw",target:"_blank",rel:"noopener noreferrer"},f=i("\u5783\u573E\u5916\u5305\uFF0C\u79BB\u804C\u4E5F\u7F62"),U={href:"https://mp.weixin.qq.com/s/CyJAVQza-9zmDdboStKe8w",target:"_blank",rel:"noopener noreferrer"},R=i("\u975E\u79D1\u73ED\u8F6C\u7801"),B={href:"https://mp.weixin.qq.com/s/4qHRBcJn1AvP07U4H6JcOQ",target:"_blank",rel:"noopener noreferrer"},k=i("\u63A8\u8350 10 \u4E2A\u795E\u7EA7 Intellij IDEA \u63D2\u4EF6"),M={href:"https://mp.weixin.qq.com/s/MGqyie9KvD6kH8Tuv2mqOw",target:"_blank",rel:"noopener noreferrer"},w=i("\u7F8E\u56E2\u7387\u5148\u5F00\u5956 24k\uFF0C\u4E0D\u7518\u5FC3\uFF1F"),L={href:"https://mp.weixin.qq.com/s/Pu1cddsQOiMfCU4I96iygQ",target:"_blank",rel:"noopener noreferrer"},S=i("Fleet\uFF0CJava \u8F7B\u91CF\u7EA7 IDE \u7684\u672A\u6765\uFF1F"),I={href:"https://mp.weixin.qq.com/s/9f_sOLiRwDS3pzC-mJ9jLQ",target:"_blank",rel:"noopener noreferrer"},D=i("\u5148\u4E0D\u7BA1\u90A3\u4E48\u591A\uFF0Coffer \u63A5\u4E86\u518D\u8BF4"),A={href:"https://mp.weixin.qq.com/s/zYLEUmbfmiKeFk03e1TxbA",target:"_blank",rel:"noopener noreferrer"},C=i("\u4E00\u5957 KTV \u7BA1\u7406\u7CFB\u7EDF\uFF0C\u4F30\u4EF7 3 \u4E07\u8FD8\u662F 30 \u4E07\uFF1F"),T={href:"https://mp.weixin.qq.com/s/QYFB2NHhyZSBfdgSUcZU5g",target:"_blank",rel:"noopener noreferrer"},E=i("\u7ED9 offer \u7684\u516C\u53F8\u4E0D\u95EE\u6280\u672F\u7EC6\u8282\uFF1F"),Q={href:"https://mp.weixin.qq.com/s/SfEUk-4hE6ezUk2Lu6cd2g",target:"_blank",rel:"noopener noreferrer"},P=i("\u5165\u804C\u4E00\u4E2A\u6708\uFF0C\u5C31\u60F3\u8DD1\u8DEF\u4E86\uFF1F"),z=e("p",null,[e("img",{src:"https://files.mdnice.com/user/3903/b7e50cf4-6fca-4511-9bfd-aa1ed9eb587b.png",alt:""})],-1);function N(j,J){const n=d("ExternalLinkIcon");return a(),t("div",null,[e("blockquote",null,[e("p",null,[e("a",u,[v,l(n)]),m,o,b,e("a",g,[p,l(n)]),h])]),q,e("ul",null,[e("li",null,[e("a",x,[y,l(n)])]),e("li",null,[e("a",_,[f,l(n)])]),e("li",null,[e("a",U,[R,l(n)])]),e("li",null,[e("a",B,[k,l(n)])]),e("li",null,[e("a",M,[w,l(n)])]),e("li",null,[e("a",L,[S,l(n)])]),e("li",null,[e("a",I,[D,l(n)])]),e("li",null,[e("a",A,[C,l(n)])]),e("li",null,[e("a",T,[E,l(n)])]),e("li",null,[e("a",Q,[P,l(n)])])]),z])}var W=s(c,[["render",N],["__file","mybatiszyytszhwskczjsj.html.vue"]]);export{W as default};
