import{_ as l}from"./plugin-vue_export-helper.21dcd24c.js";import{r as a,o as d,c as r,a as e,b as s,d as n,e as t}from"./app.f1bb3cb0.js";const o={},u=e("p",null,"ORM \u6846\u67B6\u7684\u672C\u8D28\u662F\u7B80\u5316\u64CD\u4F5C\u6570\u636E\u5E93\u7684\u7F16\u7801\u5DE5\u4F5C\uFF0C\u5E38\u7528\u7684\u6846\u67B6\u6709\u4E24\u4E2A\uFF0C\u4E00\u4E2A\u662F\u53EF\u4EE5\u7075\u6D3B\u6267\u884C\u52A8\u6001 SQL \u7684 MyBatis\uFF1B\u4E00\u4E2A\u662F\u5D07\u5C1A\u4E0D\u7528\u5199 SQL \u7684 Hibernate\u3002\u524D\u8005\u4E92\u8054\u7F51\u884C\u4E1A\u7528\u7684\u591A\uFF0C\u540E\u8005\u4F20\u7EDF\u884C\u4E1A\u7528\u7684\u591A\u3002",-1),c=e("p",null,"Hibernate \u7684\u7279\u70B9\u662F\u6240\u6709\u7684 SQL \u901A\u8FC7 Java \u4EE3\u7801\u751F\u6210\uFF0C\u53D1\u5C55\u5230\u6700\u9876\u7AEF\u7684\u5C31\u662F Spring Data JPA\uFF0C\u57FA\u672C\u4E0A\u6839\u636E\u65B9\u6CD5\u540D\u5C31\u53EF\u4EE5\u751F\u6210\u5BF9\u5E94\u7684 SQL \u4E86\u3002",-1),v={href:"https://tobebetterjavaer.com/springboot/jpa.html",target:"_blank",rel:"noopener noreferrer"},p=n("Spring Boot \u6574\u5408 JPA"),m=n("MyBatis \u65E9\u4E9B\u65F6\u5019\u7528\u8D77\u6765\u6BD4\u8F83\u7E41\u7410\uFF0C\u9700\u8981\u5404\u79CD\u914D\u7F6E\u6587\u4EF6\uFF0C\u9700\u8981\u5B9E\u4F53\u7C7B\u548C DAO \u7684\u6620\u5C04\u5173\u8054\uFF0C\u7ECF\u8FC7\u4E0D\u65AD\u5730\u6F14\u5316\u548C\u6539\u8FDB\uFF0C\u53EF\u4EE5\u901A\u8FC7 "),b={href:"https://tobebetterjavaer.com/kaiyuan/auto-generator.html",target:"_blank",rel:"noopener noreferrer"},g=n("generator"),_=n(" \u81EA\u52A8\u751F\u6210\u5B9E\u4F53\u7C7B\u3001\u914D\u7F6E\u6587\u4EF6\u548C DAO \u5C42\u4EE3\u7801\uFF0C\u7B80\u5316\u4E86\u4E0D\u5C11\u5F00\u53D1\u5DE5\u4F5C\u3002"),h=n("\u968F\u7740 "),q={href:"https://baomidou.com/",target:"_blank",rel:"noopener noreferrer"},x=n("MyBatis-Plus"),M=n(" \u7684\u51FA\u73B0\uFF0C\u53C8\u8FDB\u4E00\u6B65\u52A0\u901F\u4E86 MyBatis \u7684\u53D1\u5C55\u3002\u7ECF\u8FC7 MyBatis-Plus \u7684\u589E\u5F3A\uFF0C\u5F00\u53D1\u8005\u53EA\u9700\u8981\u7B80\u5355\u7684\u914D\u7F6E\uFF0C\u5C31\u53EF\u4EE5\u5FEB\u901F\u8FDB\u884C\u5355\u8868\u7684 CRUD \u64CD\u4F5C\uFF1B\u540C\u65F6\uFF0CMyBatis-Plus\u53C8\u63D0\u4F9B\u4E86\u4EE3\u7801\u751F\u6210\u3001\u81EA\u52A8\u5206\u9875\u3001\u903B\u8F91\u5220\u9664\u3001\u81EA\u52A8\u586B\u5145\u7B49\u4E30\u5BCC\u529F\u80FD\uFF0C\u8FDB\u4E00\u6B65\u7B80\u5316\u4E86\u5F00\u53D1\u5DE5\u4F5C\u3002"),y=t(`<h3 id="\u6574\u5408-mybatis" tabindex="-1"><a class="header-anchor" href="#\u6574\u5408-mybatis" aria-hidden="true">#</a> \u6574\u5408 MyBatis</h3><p>\u7B2C\u4E00\u6B65\uFF0C\u5728 pom.xml \u6587\u4EF6\u4E2D\u5F15\u5165 starter\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;dependency&gt;
    &lt;groupId&gt;org.mybatis.spring.boot&lt;/groupId&gt;
    &lt;artifactId&gt;mybatis-spring-boot-starter&lt;/artifactId&gt;
    &lt;version&gt;2.2.2&lt;/version&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7B2C\u4E8C\u6B65\uFF0C\u5728 application.yml \u6587\u4EF6\u4E2D\u6DFB\u52A0\u6570\u636E\u5E93\u8FDE\u63A5\u914D\u7F6E\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    username: root
    password: Huicheng123**
    url: jdbc:mysql://localhost:3306/codingmore-mybatis?useUnicode=true&amp;characterEncoding=utf-8&amp;serverTimezone=Asia/Shanghai&amp;useSSL=false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7B2C\u4E09\u6B65\uFF0C\u5BFC\u5165 SQL \u6587\u4EF6\u3002</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/mybatis-3a1794fa-7c6b-4499-9c7d-a69e088c28fe.png" alt=""></p><p>\u7B2C\u56DB\u6B65\uFF0C\u65B0\u5EFA User.java \u5B9E\u4F53\u7C7B\u3002</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@Builder</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> age<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> password<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Tolerate</span>
    <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u91CC\u4F7F\u7528\u4E86 lombok \u7684</p><ul><li><a href="/Data">@Data</a> \u6CE8\u89E3\u81EA\u52A8\u751F\u6210 getter/setter</li><li><a href="/Builder">@Builder</a> \u751F\u6210\u94FE\u5F0F\u8C03\u7528</li><li>\u7531\u4E8E @Data\u548C<a href="/Builder">@Builder</a> \u914D\u5408\u4F7F\u7528\u7684\u65F6\u5019\u4F1A\u5BFC\u81F4\u65E0\u53C2\u6784\u9020\u65B9\u6CD5\u4E22\u5931\uFF0C\u6240\u4EE5\u6211\u4EEC\u4E3B\u52A8\u58F0\u660E\u4E86\u65E0\u53C2\u6784\u9020\u65B9\u6CD5\uFF0C\u5E76\u4F7F\u7528 <code>@Tolerate</code> \u6CE8\u89E3\u6765\u544A\u8BC9 lombok \u8BF7\u5141\u8BB8\u6211\u4EEC\u7684\u65E0\u53C2\u6784\u9020\u65B9\u6CD5\u5B58\u5728\uFF08\u6CA1\u6709\u65E0\u53C2\u6784\u9020\u65B9\u6CD5\u7684\u65F6\u5019\u4F1A\u5BFC\u81F4 ORM \u6620\u5C04\u51FA\u9519\uFF09</li></ul><p>\u7B2C\u4E94\u6B65\uFF0C\u65B0\u5EFA UserMapper.java \u63A5\u53E3\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public interface UserMapper {
    @Select(&quot;SELECT * FROM user&quot;)
    List&lt;User&gt; getAll();

    @Select(&quot;SELECT * FROM user WHERE id = #{id}&quot;)
    User getOne(Integer id);

    @Insert(&quot;INSERT INTO user(name,password,age) VALUES(#{name}, #{password}, #{age})&quot;)
    void insert(User user);

    @Update(&quot;UPDATE user SET name=#{name},password=#{password},age=#{age} WHERE id =#{id}&quot;)
    void update(User user);

    @Delete(&quot;DELETE FROM user WHERE id =#{id}&quot;)
    void delete(Integer id);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><a href="/Select">@Select</a> \u6CE8\u89E3\u7528\u6765\u67E5\u8BE2</li><li><a href="/Insert">@Insert</a> \u6CE8\u89E3\u7528\u6765\u63D2\u5165</li><li><a href="/Update">@Update</a> \u6CE8\u89E3\u7528\u6765\u4FEE\u6539</li><li><a href="/Delete">@Delete</a> \u6CE8\u89E3\u7528\u6765\u5220\u9664</li></ul><p>\u7B2C\u516D\u6B65\uFF0C\u5728\u542F\u52A8\u7C7B CodingmoreMybatisApplication \u4E0A\u6DFB\u52A0 <a href="/MapperScan">@MapperScan</a> \u6CE8\u89E3\u6765\u626B\u63CF mapper\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@SpringBootApplication
@MapperScan
public class CodingmoreMybatisApplication {

	public static void main(String[] args) {
		SpringApplication.run(CodingmoreMybatisApplication.class, args);
	}

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5982\u679C\u6CA1\u6709\u6307\u5B9A <a href="/MapperScan">@MapperScan</a> \u7684\u626B\u63CF\u8DEF\u5F84\uFF0C\u5C06\u4ECE\u58F0\u660E\u8BE5\u6CE8\u89E3\u7684\u7C7B\u7684\u5305\u5F00\u59CB\u8FDB\u884C\u626B\u63CF\u3002</p><p>\u7B2C\u4E03\u6B65\uFF0C\u5728\u6D4B\u8BD5\u7C7B\u4E2D\u5BF9 mapper \u8FDB\u884C\u6D4B\u8BD5\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@SpringBootTest
@Slf4j
class CodingmoreMybatisApplicationTests {

	@Autowired
	private UserMapper userMapper;

	@Test
	void testInsert() {
		userMapper.insert(User.builder().age(18).name(&quot;\u6C89\u9ED8\u738B\u4E8C&quot;).password(&quot;123456&quot;).build());
		userMapper.insert(User.builder().age(18).name(&quot;\u6C89\u9ED8\u738B\u4E09&quot;).password(&quot;123456&quot;).build());
		userMapper.insert(User.builder().age(18).name(&quot;\u6C89\u9ED8\u738B\u56DB&quot;).password(&quot;123456&quot;).build());
		log.info(&quot;\u67E5\u8BE2\u6240\u6709\uFF1A{}&quot;,userMapper.getAll().stream().toArray());
	}

	@Test
	List&lt;User&gt; testQuery() {
		List&lt;User&gt; all = userMapper.getAll();
		log.info(&quot;\u67E5\u8BE2\u6240\u6709\uFF1A{}&quot;,all.stream().toArray());
		return all;
	}

	@Test
	void testUpdate() {
		User one = userMapper.getOne(1);
		log.info(&quot;\u66F4\u65B0\u524D{}&quot;, one);
		one.setPassword(&quot;654321&quot;);
		userMapper.update(one);
		log.info(&quot;\u66F4\u65B0\u540E{}&quot;, userMapper.getOne(1));
	}

	@Test
	void testDelete() {
		log.info(&quot;\u5220\u9664\u524D{}&quot;, userMapper.getAll().toArray());
		userMapper.delete(1);
		log.info(&quot;\u5220\u9664\u540E{}&quot;, userMapper.getAll().toArray());

	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u6781\u7B80-xml-\u7248\u672C" tabindex="-1"><a class="header-anchor" href="#\u6781\u7B80-xml-\u7248\u672C" aria-hidden="true">#</a> \u6781\u7B80 xml \u7248\u672C</h3><p>\u6781\u7B80 xml \u7248\u672C\u6BD4\u8F83\u9002\u5408\u66F4\u52A0\u590D\u6742\u7684 SQL\uFF0C\u63A5\u53E3\u5C42\u53EA\u5B9A\u4E49\u7A7A\u7684\u65B9\u6CD5\uFF0C\u7136\u540E\u5728 xml \u4E2D\u7F16\u5199\u5BF9\u5E94\u7684 SQL\u3002\u7F16\u7A0B\u55B5\u{1F431}\u5B9E\u6218\u9879\u76EE\u4E2D\u4F7F\u7528\u7684\u5C31\u662F\u8FD9\u79CD\u65B9\u5F0F\u3002</p><p>\u7B2C\u4E00\u6B65\uFF0C\u65B0\u5EFA PostMapper\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public interface PostMapper {
    List&lt;Posts&gt; getAll();
    Posts getOne(Long id);
    void insert(Posts post);
    void update(Posts post);
    void delete(Long id);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7B2C\u4E8C\u6B65\uFF0C\u5728 resources \u76EE\u5F55\u4E0B\u65B0\u5EFA PostMapper.xml \u6587\u4EF6\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;!DOCTYPE mapper PUBLIC &quot;-//mybatis.org//DTD Mapper 3.0//EN&quot; &quot;http://mybatis.org/dtd/mybatis-3-mapper.dtd&quot;&gt;
&lt;mapper namespace=&quot;top.codingmore.mapper.PostMapper&quot;&gt;
    &lt;resultMap id=&quot;BaseResultMap&quot; type=&quot;top.codingmore.entity.Posts&quot;&gt;
        &lt;id column=&quot;posts_id&quot; property=&quot;postsId&quot;/&gt;
        &lt;result column=&quot;post_author&quot; property=&quot;postAuthor&quot;/&gt;
        &lt;result column=&quot;post_content&quot; property=&quot;postContent&quot;/&gt;
        &lt;result column=&quot;post_title&quot; property=&quot;postTitle&quot;/&gt;
    &lt;/resultMap&gt;

    &lt;sql id=&quot;Base_Column_List&quot;&gt;
        posts_id, post_author, post_content, post_title
    &lt;/sql&gt;

    &lt;select id=&quot;getAll&quot; resultMap=&quot;BaseResultMap&quot;&gt;
        select
        &lt;include refid=&quot;Base_Column_List&quot; /&gt;
        from posts;
    &lt;/select&gt;

    &lt;select id=&quot;getOne&quot; parameterType=&quot;java.lang.Long&quot; resultMap=&quot;BaseResultMap&quot; &gt;
        SELECT
        &lt;include refid=&quot;Base_Column_List&quot; /&gt;
        FROM users
        WHERE id = #{id}
    &lt;/select&gt;

    &lt;insert id=&quot;insert&quot; parameterType=&quot;top.codingmore.entity.Posts&quot;&gt;
        insert into
            posts
            (post_author,post_content,post_title)
        values
            (#{postAuthor},#{postContent},#{postTitle});
    &lt;/insert&gt;
    &lt;update id=&quot;update&quot; parameterType=&quot;top.codingmore.entity.Posts&quot;&gt;
        update
            posts
        set
        &lt;if test=&quot;postAuthor != null&quot;&gt;post_author=#{postAuthor},&lt;/if&gt;
        &lt;if test=&quot;postContent != null&quot;&gt;post_content=#{postContent},&lt;/if&gt;
        post_title=#{postTitle}
        where id=#{id}
    &lt;/update&gt;
    &lt;delete id=&quot;delete&quot;&gt;
        delete from
            posts
        where
            id=#{id}
    &lt;/delete&gt;
&lt;/mapper&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u63A5\u53E3\u4E2D\u65B9\u6CD5\u5BF9\u5E94\u7684 SQL \u76F4\u63A5\u5199\u5728 xml \u6587\u4EF6\u4E2D\uFF0C\u5177\u4F53\u4F4D\u7F6E\u89C1\u4E0B\u56FE\uFF1A</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/mybatis-cc8515b1-e501-41e2-8dea-7612022e1bb7.png" alt=""></p><p>\u4E5F\u53EF\u4EE5\u770B\u6587\u4EF6\u653E\u5728\u548C PostMapper.java \u63A5\u53E3\u540C\u7EA7\u7684\u76EE\u5F55\u4E0B\uFF0C\u4F46\u662F\u8FD9\u6837\u4F1A\u5E26\u6765\u4E00\u4E2A\u95EE\u9898\uFF0C\u5C31\u662F Maven \u6253\u5305\u7684\u65F6\u5019\u9ED8\u8BA4\u4F1A\u5FFD\u7565 xml \u6587\u4EF6\uFF0C\u6240\u4EE5\u4E3A\u4E86\u907F\u514D\u8FD9\u79CD\u60C5\u51B5\u53D1\u751F\uFF0C\u6211\u4EEC\u9700\u8981\u5728 pom.xml \u6587\u4EF6\u4E2D\u6DFB\u52A0\u914D\u7F6E\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;build&gt;
    &lt;resources&gt;
        &lt;resource&gt;
            &lt;directory&gt;src/main/java&lt;/directory&gt;
            &lt;includes&gt;
                &lt;include&gt;**/*.xml&lt;/include&gt;
            &lt;/includes&gt;
        &lt;/resource&gt;
        &lt;resource&gt;
            &lt;directory&gt;src/main/resources&lt;/directory&gt;
        &lt;/resource&gt;
    &lt;/resources&gt;
&lt;/build&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5982\u679C\u76F4\u63A5\u653E\u5728 resources \u76EE\u5F55\u4E0B\uFF0C\u5C31\u4E0D\u7528\u62C5\u5FC3\u6253\u5305\u65F6\u88AB\u5FFD\u7565\u4E86\uFF0C\u4F46\u653E\u5728 resources \u76EE\u5F55\u4E0B\u4E0D\u4F1A\u88AB \xA0MyBatis \u81EA\u52A8\u626B\u63CF\u5230\uFF0C\u6240\u4EE5\u9700\u8981\u5728 application.yml \u914D\u7F6E\u6587\u4EF6\u4E2D\u544A\u8BC9 MyBatis \u5177\u4F53\u7684\u626B\u63CF\u8DEF\u5F84\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>mybatis:
  mapper-locations: classpath:mapper/*.xml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7B2C\u4E09\u6B65\uFF0C\u5728\u6D4B\u8BD5\u7C7B\u4E2D\u6DFB\u52A0\u6D4B\u8BD5\u65B9\u6CD5\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@Test
void testPostInsert() {
    postMapper.insert(Posts.builder()
            .postAuthor(1L)
            .postTitle(&quot;\u6C89\u9ED8\u738B\u4E8C&quot;)
            .postContent(&quot;123456&quot;)
            .build());
    log.info(&quot;\u67E5\u8BE2\u6240\u6709\uFF1A{}&quot;,postMapper.getAll().stream().toArray());
}

@Test
List&lt;Posts&gt; testPostQuery() {
    List&lt;Posts&gt; all = postMapper.getAll();
    log.info(&quot;\u67E5\u8BE2\u6240\u6709\uFF1A{}&quot;,all.stream().toArray());
    return all;
}

@Test
void testPostUpdate() {
    Posts one = postMapper.getOne(1L);
    log.info(&quot;\u66F4\u65B0\u524D{}&quot;, one);
    one.setPostContent(&quot;\u6C89\u9ED8\u738B\u4E8C\u662F\u6C99\u6BD4&quot;);
    postMapper.update(one);
    log.info(&quot;\u66F4\u65B0\u540E{}&quot;, postMapper.getOne(1L));
}

@Test
void testPostDelete() {
    log.info(&quot;\u5220\u9664\u524D{}&quot;, postMapper.getAll().toArray());
    postMapper.delete(1L);
    log.info(&quot;\u5220\u9664\u540E{}&quot;, postMapper.getAll().toArray());

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53EF\u4EE5\u770B\u5F97\u51FA\uFF0C\u6CE8\u89E3\u7248\u6BD4\u8F83\u9002\u5408\u7B80\u5355\u7684 SQL \u8BED\u53E5\uFF0C\u4E00\u65E6\u9047\u5230\u6BD4\u8F83\u590D\u6742\u7684 SQL \u67E5\u8BE2\uFF0C\u6BD4\u5982\u8BF4\u591A\u8868\u67E5\u8BE2\uFF0Cxml \u4E2D\u5199 SQL \u8BED\u53E5\u4F1A\u5BB9\u6613\u5B9E\u73B0\u3002</p><p>\u6BD4\u5982\u8BF4\u7F16\u7A0B\u55B5\u{1F431}\u5B9E\u6218\u9879\u76EE\u4E2D\u6709\u4E00\u4E2A\u5206\u9875\u67E5\u8BE2\uFF08\u9996\u9875\u5C55\u793A\uFF0C\u9700\u8981\u67E5\u8BE2\u6807\u7B7E\u3001\u4F5C\u8005\u540D\u3001\u6587\u7AE0\u4FE1\u606F\u7B49\u7B49\uFF09\uFF0C\u6D89\u53CA\u5230\u591A\u5F20\u8868\uFF0C\u90A3\u4E48\u6B64\u65F6\uFF0Cxml \u7248\u672C\u5C31\u66F4\u9002\u5408\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;select id=&quot;findByPageWithTagPaged&quot; resultMap=&quot;PostsVoResultMapWithTagList&quot;&gt;
    SELECT a.*, pt.description, ptr.post_tag_id
    FROM (
             SELECT
                &lt;include refid=&quot;Base_Column_List_No_Content&quot; /&gt;,
                 b.term_taxonomy_id,
                 c.user_nicename
             FROM
                 posts a
                     LEFT JOIN term_relationships b ON a.posts_id = b.term_relationships_id
                     LEFT JOIN users c ON a.post_author = c.users_id
             WHERE 1=1
             &lt;if test=&quot;searchTagId != null&quot;&gt;
                and a.posts_id in (select post_id from post_tag_relation where post_tag_id=#{searchTagId})
             &lt;/if&gt;
             and \${ew.sqlSegment}
                 LIMIT #{pageStart}, #{pageSize}
         ) a
             LEFT JOIN post_tag_relation ptr on a.posts_id = ptr.post_id
             LEFT JOIN post_tag pt on pt.post_tag_id = ptr.post_tag_id
&lt;/select&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7EC6\u5FC3\u7684\u5C0F\u4F19\u4F34\u5E94\u8BE5\u53EF\u4EE5\u770B\u5230 <code>\${ew.sqlSegment}</code> \u8FD9\u6837\u7684\u8868\u8FBE\u5F0F\uFF0C\u5B83\u5C5E\u4E8E MyBatis-Plus \u4E2D\u7684\u5185\u5BB9\u3002</p><h3 id="\u901A\u8FC7-mybatis-plus-\u589E\u5F3A" tabindex="-1"><a class="header-anchor" href="#\u901A\u8FC7-mybatis-plus-\u589E\u5F3A" aria-hidden="true">#</a> \u901A\u8FC7 MyBatis-Plus \u589E\u5F3A</h3>`,38),f=n("MyBatis \u5C5E\u4E8E\u534A\u81EA\u52A8\u7684 ORM \u6846\u67B6\uFF0C\u5B9E\u73B0\u4E00\u4E9B\u7B80\u5355\u7684 CRUD \u4E5F\u662F\u9700\u8981\u7F16\u5199 SQL \u8BED\u53E5\uFF0C\u90A3\u5982\u679C\u60F3\u7701\u6389\u8FD9\u4E9B\u6B65\u9AA4\u7684\u8BDD\uFF0C\u53EF\u4EE5\u9009\u62E9 "),S={href:"https://tobebetterjavaer.com/springboot/jpa.html",target:"_blank",rel:"noopener noreferrer"},T=n("JPA"),L=n("\uFF0C\u4E5F\u53EF\u4EE5\u9009\u62E9\u56FD\u4EBA\u5F00\u6E90\u7684 MyBatis-Plus\uFF08\u7B80\u79F0 MP\uFF09\u3002"),k=e("p",null,"MP \u63D0\u4F9B\u4E86\u8BF8\u591A\u4F18\u79C0\u7684\u7279\u6027\uFF0C\u6BD4\u5982\u8BF4\uFF1A",-1),P=e("li",null,"\u5F3A\u5927\u7684 CRUD \u64CD\u4F5C\uFF1A\u5185\u7F6E\u4E86\u901A\u7528\u7684 mapper\u3001service\uFF0C\u53EF\u901A\u8FC7\u5C11\u91CF\u7684\u914D\u7F6E\u5B9E\u73B0\u5927\u90E8\u5206\u5E38\u7528\u7684 CRUD\uFF0C\u4E0D\u7528\u518D\u7F16\u5199 SQL \u8BED\u53E5\u3002",-1),A=e("li",null,"\u652F\u6301\u4E3B\u952E\u81EA\u52A8\u751F\u6210",-1),B=e("li",null,"\u652F\u6301 ActiveRecord \u6A21\u5F0F\uFF1A\u5B9E\u4F53\u7C7B\u53EA\u9700\u7EE7\u627F Model \u7C7B\u5373\u53EF\u8FDB\u884C\u5F3A\u5927\u7684 CRUD \u64CD\u4F5C",-1),E={href:"https://tobebetterjavaer.com/kaiyuan/auto-generator.html",target:"_blank",rel:"noopener noreferrer"},I=n("\u5F3A\u5927\u7684\u4EE3\u7801\u751F\u6210\u5668"),U=n("\uFF1A\u53EF\u5FEB\u901F\u751F\u6210 Mapper \u3001 Model \u3001 Service \u3001 Controller \u5C42\u4EE3\u7801"),C=e("li",null,"\u5185\u7F6E\u5206\u9875\u63D2\u4EF6",-1),j=e("li",null,"\u5185\u7F6E\u6027\u80FD\u5206\u6790\u63D2\u4EF6\uFF1A\u53EF\u8F93\u51FA SQL \u8BED\u53E5\u4EE5\u53CA\u5176\u6267\u884C\u65F6\u95F4",-1),w=t(`<p>\u6211\u4EEC\u76F4\u63A5\u8FDB\u5165\u5B9E\u6218\u3002</p><p>\u7B2C\u4E00\u6B65\uFF0C\u5728 pom.xml \u6587\u4EF6\u4E2D\u6DFB\u52A0 MyBatis-Plus \u7684 starter\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;dependency&gt;
    &lt;groupId&gt;com.baomidou&lt;/groupId&gt;
    &lt;artifactId&gt;mybatis-plus-boot-starter&lt;/artifactId&gt;
    &lt;version&gt;3.4.2&lt;/version&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7B2C\u4E8C\u6B65\uFF0C\u65B0\u5EFA PostTag \u5B9E\u4F53\u7C7B\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@Data
public class PostTag {
    private Long postTagId;
    private String description;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5BF9\u5E94\u7684\u6570\u636E\u5E93\u8868\u4E3A post-tag\u3002</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/mybatis-d4471207-9284-43bf-b1aa-50bbc6001a9f.png" alt=""></p><p>\u53EF\u4EE5\u770B\u5F97\u51FA\uFF0C\u7C7B\u540D PostTag\uFF0C\u5B57\u6BB5\u540D postTagId \u548C\u6570\u636E\u5E93\u8868 post_tag\u3001\u5B57\u6BB5\u540D post_tag_id \u5E76\u4E0D\u4E00\u81F4\uFF0C\u4F46 mp \u81EA\u52A8\u5E2E\u6211\u4EEC\u505A\u4E86\u6620\u5C04\u5173\u8054\u3002</p><p>\u7B2C\u4E8C\u6B65\uFF0C\u65B0\u5EFA PostTagMapper \u7EE7\u627F BaseMapper\uFF0C\u7EE7\u627F\u8BE5\u63A5\u53E3\u540E\uFF0C\u65E0\u9700\u7F16\u5199 mapper.xml \u6587\u4EF6\uFF0C\u5373\u53EF\u83B7\u5F97CRUD\u529F\u80FD\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public interface PostTagMapper extends BaseMapper&lt;PostTag&gt; {}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>BaseMapper\u91CC\u63D0\u4F9B\u7684\u65B9\u6CD5\u5982\u4E0B\uFF1A</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/mybatis-79ac66eb-25fd-44a0-8668-359d1b95b80d.png" alt="image.png"></p><p>\u7B2C\u4E09\u6B65\uFF0C\u5728\u6D4B\u8BD5\u7C7B\u4E2D\u6DFB\u52A0\u67E5\u8BE2\u65B9\u6CD5\u3002</p><hr>`,14),O=n("\u66F4\u591A\u5185\u5BB9\uFF0C\u53EA\u9488\u5BF9\u300AJava \u7A0B\u5E8F\u5458\u8FDB\u9636\u4E4B\u8DEF\u300B\u661F\u7403\u7528\u6237\u5F00\u653E\uFF0C\u9700\u8981\u7684\u5C0F\u4F19\u4F34\u53EF\u4EE5"),R={href:"https://tobebetterjavaer.com/zhishixingqiu/",target:"_blank",rel:"noopener noreferrer"},D=n("\u6233\u94FE\u63A5\u{1F517}"),Q=n("\u52A0\u5165\u6211\u4EEC\u7684\u661F\u7403\uFF0C\u4E00\u8D77\u5B66\u4E60\uFF0C\u4E00\u8D77\u5377\u3002\u3002"),N=e("strong",null,"\u7F16\u7A0B\u55B5",-1),F=n("\u{1F431}\u662F\u4E00\u4E2A Spring Boot+Vue \u7684\u524D\u540E\u7AEF\u5206\u79BB\u9879\u76EE\uFF0C\u878D\u5408\u4E86\u5E02\u9762\u4E0A\u7EDD\u5927\u591A\u6570\u6D41\u884C\u7684\u6280\u672F\u8981\u70B9\u3002\u901A\u8FC7\u5B66\u4E60\u5B9E\u6218\u9879\u76EE\uFF0C\u4F60\u53EF\u4EE5\u5C06\u6240\u5B66\u7684\u77E5\u8BC6\u901A\u8FC7\u5B9E\u8DF5\u8FDB\u884C\u68C0\u9A8C\u3001\u4F60\u53EF\u4EE5\u62D3\u5BBD\u81EA\u5DF1\u7684\u6280\u672F\u8FB9\u754C\uFF0C\u4F60\u53EF\u4EE5\u638C\u63E1\u4E00\u4E2A\u771F\u6B63\u7684\u5B9E\u6218\u9879\u76EE\u662F\u5982\u4F55\u4ECE 0 \u5230 1 \u7684\u3002"),J=e("h3",{id:"\u6E90\u7801\u8DEF\u5F84",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u6E90\u7801\u8DEF\u5F84","aria-hidden":"true"},"#"),n(" \u6E90\u7801\u8DEF\u5F84")],-1),H=n("\u7F16\u7A0B\u55B5\uFF1A"),V={href:"https://github.com/itwanger/coding-more",target:"_blank",rel:"noopener noreferrer"},W=n("https://github.com/itwanger/coding-more"),z=n("codingmore-mybatis\uFF1A"),$={href:"https://github.com/itwanger/codingmore-learning/tree/main/codingmore-mybatis",target:"_blank",rel:"noopener noreferrer"},Y=n("https://github.com/itwanger/codingmore-learning"),G=e("hr",null,null,-1),K=e("p",null,[e("img",{src:"http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png",alt:""})],-1);function X(Z,ee){const i=a("ExternalLinkIcon");return d(),r("div",null,[u,c,e("p",null,[e("a",v,[p,s(i)])]),e("p",null,[m,e("a",b,[g,s(i)]),_]),e("p",null,[h,e("a",q,[x,s(i)]),M]),y,e("p",null,[f,e("a",S,[T,s(i)]),L]),k,e("ul",null,[P,A,B,e("li",null,[e("a",E,[I,s(i)]),U]),C,j]),w,e("p",null,[O,e("a",R,[D,s(i)]),Q,N,F]),J,e("ul",null,[e("li",null,[H,e("a",V,[W,s(i)])]),e("li",null,[z,e("a",$,[Y,s(i)])])]),G,K])}var se=l(o,[["render",X],["__file","mybatis.html.vue"]]);export{se as default};
