import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as p,c,a as n,d as s,b as e,e as o}from"./app-72970f25.js";const l={},u=n("p",null,"作为开发者，相信大家都知道 Redis 的重要性。Redis 是使用 C 语言开发的一个高性能键值对数据库，是互联网技术领域使用最为广泛的存储中间件，它是「Remote Dictionary Service」的首字母缩写，也就是「远程字典服务」。",-1),d=n("p",null,"Redis 以超高的性能、完美的文档、简洁的源码著称，国内外很多大型互联网公司都在用，比如说阿里、腾讯、GitHub、Stack Overflow 等等。当然了，中小型公司也都在用。",-1),r=n("h2",{id:"安装-redis",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#安装-redis","aria-hidden":"true"},"#"),s(" 安装 Redis")],-1),v=n("p",null,"Redis 的官网提供了各种平台的安装包，Linux、macOS、Windows 的都有。",-1),m=n("figure",null,[n("img",{src:"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-182f2469-b7f2-4fec-bd41-e5a33dca185a.png",alt:"",tabindex:"0",loading:"lazy"}),n("figcaption")],-1),k={href:"https://redis.io/docs/getting-started/",target:"_blank",rel:"noopener noreferrer"},b=n("p",null,[s("我目前用的是 macOS，直接执行 "),n("code",null,"brew install redis"),s(" 就可以完成安装了。")],-1),g=n("figure",null,[n("img",{src:"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-cdf02715-5ed6-44b5-a1ce-db0249107dd7.png",alt:"",tabindex:"0",loading:"lazy"}),n("figcaption")],-1),f=n("p",null,[s("完成安装后执行 "),n("code",null,"redis-server"),s(" 就可以启动 Redis 服务了。")],-1),h=n("figure",null,[n("img",{src:"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-8c272a19-e961-449c-afee-c973fb44a5e0.png",alt:"",tabindex:"0",loading:"lazy"}),n("figcaption")],-1),y={href:"https://mp.weixin.qq.com/s/Hgm3ZAbOeBqpSUsJZBtlNg",target:"_blank",rel:"noopener noreferrer"},x=n("code",null,"choco install redis",-1),R=n("figure",null,[n("img",{src:"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-13b569ca-e747-4d64-af0d-a9a5d0260f5f.png",alt:"",tabindex:"0",loading:"lazy"}),n("figcaption")],-1),_=n("p",null,"生产环境中，我们通常会在 Linux 上安装 Redis。我的服务器上安装了宝塔面板，可以直接在软件商店里搜「Redis」关键字，然后直接安装（我已经安装过了）。",-1),j=n("figure",null,[n("img",{src:"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-df5e600b-1290-447c-b140-6f513c69492c.png",alt:"",tabindex:"0",loading:"lazy"}),n("figcaption")],-1),S=n("p",null,"顺带安装一下 Redis 客户端工具，推荐 GitHub 星标 20k+ 的 AnotherRedisDesktopManager，一款 🚀🚀🚀 更快、更好、更稳定的Redis桌面(GUI)管理客户端，支持 Windows、macOS 和 Linux，性能出众，可以轻松加载海量键值。",-1),w={href:"https://github.com/qishibo/AnotherRedisDesktopManager",target:"_blank",rel:"noopener noreferrer"},T=n("p",null,"安装完成后，链接 Redis 服务：",-1),C=n("figure",null,[n("img",{src:"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-d36b9022-fe3b-4fb1-80c3-8d23d19d9025.png",alt:"",tabindex:"0",loading:"lazy"}),n("figcaption")],-1),q=n("h2",{id:"redis-数据类型",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#redis-数据类型","aria-hidden":"true"},"#"),s(" Redis 数据类型")],-1),z=n("p",null,"Redis支持五种数据类型：string（字符串），hash（哈希），list（列表），set（集合）及zset(sorted set：有序集合)。",-1),I={href:"https://www.redis.net.cn/tutorial/3508.html",target:"_blank",rel:"noopener noreferrer"},O=o(`<p><strong>1）string</strong></p><p>string 是 Redis 最基本的数据类型，一个key对应一个value。</p><p>我们可以通过 AnotherRedisDesktopManager 客户端来练习一下基本的 set、get 命令（参考 Redis 文档，客户端会有提示，所以命令完全不用死记硬背）。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-d7d4043b-b753-484c-bfc1-25533004cca5.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>对应文本命令：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>## 增加一个 key 为 name，value 为 沉默王二
&gt; set name &#39;沉默王二&#39;
OK
## 获取
&gt; get name
沉默王二
&gt; set name &#39;沉默王三&#39;
OK
&gt; get name
沉默王三
## 删除
&gt; del name
1
&gt; get name
null
## 测试是否存在 name
&gt; EXISTS key
0
&gt; EXISTS name
0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2）hash</strong></p><p>Redis hash 是一个键值对集合，值可以看成是一个 Map。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>## 清除数据库
&gt; flushdb
OK
## 创建 hash，key 为 user_hset 字段为 user1，值为 沉默王二
&gt; hset user_hset user1 沉默王二
1
&gt; hset user_hset user2 沉默王三
1
## 字段长度
&gt; hlen user_hset
2
## 所有字段
&gt; HKEYS user_hset
user1
user2
## 所有值
&gt; hvals user_hset
沉默王二
沉默王三
## 字段 user1 的值
&gt; hget user_hset user1
沉默王二
## 获取 key 为 user_hset 的所有字段和值
&gt; hgetall user_hset
user1
沉默王二
user2
沉默王三
## 更新字段
&gt; hset user_hset user1 沉默王四
0
&gt; hgetall user_hset
user1
沉默王四
user2
沉默王三
&gt; hdel user_hset user1
1
&gt; hgetall user_hset
user2
沉默王三
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>3）list</strong></p><p>list 是一个简单的字符串列表，按照插入顺序排序。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>## 添加 key 为 user_list value 为 沉默王二、沉默万三的集合
&gt; lpush user_list 沉默王二 沉默王三
2
## 查询
&gt; lrange user_list 0 -1
沉默王三
沉默王二
## 往尾部添加
&gt; rpush user_list 沉默王二是沙比
3
## 头部添加
&gt; lpush user_list 沉默王二是傻叉
4
&gt; lrange user_list 0 -1
沉默王二是傻叉
沉默王三
沉默王二
沉默王二是沙比
## 更新 index 为 0 的值
&gt; lset user_list 0 沉默王四
OK
&gt; lrange user_list 0 -1
沉默王四
沉默王三
沉默王二
沉默王二是沙比
## 删除 index 为 0 的值
&gt; lrem user_list 0 沉默王四
1
&gt; lrange user_list 0 -1
沉默王三
沉默王二
沉默王二是沙比
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>4）set</strong></p><p>set 是 string 类型的无序集合，不允许有重复的元素。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>## 添加 key 为 user_set value 为沉默王二 沉默王三 沉默王二的狗腿子的集合
&gt; sadd user_set 沉默王二 沉默王三 沉默王二的狗腿子
3
## 查询
&gt; smembers user_set
沉默王二
沉默王二的狗腿子
沉默王三
## 删除 value 为沉默王二的元素
&gt; srem user_set 沉默王二
1
&gt; smembers user_set
沉默王二的狗腿子
沉默王三
## 添加
&gt; sadd user_set 沉默王二
1
&gt; smembers user_set
沉默王二
沉默王二的狗腿子
沉默王三
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>5）sorted set</strong></p><p>sorted set 是 string 类型的有序集合，不允许有重复的元素。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&gt; FLUSHDB
OK
## 添加 key 为 user_zset 分数为 1 值为沉默王二、分数为 2 值为沉默王三、分数为 3 值为沉默王二的狗腿子
&gt; zadd user_zset 1 沉默王二 2 沉默王三 3 沉默王二的狗腿子
3
## 查询
&gt; zrange user_zset 0 -1
沉默王二
沉默王三
沉默王二的狗腿子
## 反转
&gt; zrevrange user_zset 0 -1
沉默王二的狗腿子
沉默王三
沉默王二
## 查询元素沉默王二的分数
&gt; zscore user_zset 沉默王二
1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="spring-boot-整合-redis" tabindex="-1"><a class="header-anchor" href="#spring-boot-整合-redis" aria-hidden="true">#</a> Spring Boot 整合 Redis</h2><p>第一步，在 pom.xml 文件中添加 Redis 的 starter。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;dependency&gt;
    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
    &lt;artifactId&gt;spring-boot-starter-data-redis&lt;/artifactId&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二步，在 application.yml 文件中添加 Redis 的配置信息</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>spring:
  redis:
    host: xxx.xxx.99.232 # Redis服务器地址
    database: 0 # Redis数据库索引（默认为0）
    port: 6379 # Redis服务器连接端口
    password: xxx # Redis服务器连接密码（默认为空）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第三步，在测试类中添加以下代码。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span>
<span class="token keyword">class</span> <span class="token class-name">CodingmoreRedisApplicationTests</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Resource</span>
    <span class="token keyword">private</span> <span class="token class-name">RedisTemplate</span> redisTemplate<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Resource</span>
    <span class="token keyword">private</span> <span class="token class-name">StringRedisTemplate</span> stringRedisTemplate<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testRedis</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 添加</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;沉默王二&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 查询</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 删除</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 更新</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;沉默王二的狗腿子&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 查询</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 添加</span>
        stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;沉默王二&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 查询</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 删除</span>
        stringRedisTemplate<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 更新</span>
        stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;沉默王二的狗腿子&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 查询</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>RedisTemplate 和 StringRedisTemplate 都是 Spring Data Redis 提供的模板类，可以对 Redis 进行操作，后者针对键值对都是 String 类型的数据，前者可以是任何类型的对象。</p><p>RedisTemplate 和 StringRedisTemplate 除了提供 opsForValue 方法来操作字符串之外，还提供了以下方法：</p><ul><li>opsForList：操作 list</li><li>opsForSet：操作 set</li><li>opsForZSet：操作有序 set</li><li>opsForHash：操作 hash</li></ul><p>运行测试类后可以在控制台看到以下输出信息：</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-f4456aea-2e48-4bad-910d-2d963ef0224e.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>也可以通过 AnotherRedisDesktopManager 客户端查看 Redis 数据库中的数据。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-f7551ebb-0bde-4084-9ab0-4a724d8ad2ec.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="编程喵整合-redis" tabindex="-1"><a class="header-anchor" href="#编程喵整合-redis" aria-hidden="true">#</a> 编程喵整合 Redis</h2><p>编程喵是一个 Spring Boot + Vue 的前后端分离项目，要整合 Redis 的话，最好的方式是使用 Spring Cache，仅仅通过 @Cacheable、@CachePut、@CacheEvict、@EnableCaching 等注解就可以轻松使用 Redis 做缓存了。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-eb6d69d7-9152-4695-87c7-cba138ca93fd.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>1）@EnableCaching</strong>，开启缓存功能。</p><p><strong>2）@Cacheable</strong>，调用方法前，去缓存中找，找到就返回，找不到就执行方法，并将返回值放到缓存中。</p><p><strong>3）@CachePut</strong>，方法调用前不会去缓存中找，无论如何都会执行方法，执行完将返回值放到缓存中。</p><p><strong>4）@CacheEvict</strong>，清理缓存中的一个或多个记录。</p><p>Spring Cache 是 Spring 提供的一套完整的缓存解决方案，虽然它本身没有提供缓存的实现，但它提供的一整套接口、规范、配置、注解等，可以让我们无缝衔接 Redis、Ehcache 等缓存实现。</p><p>Spring Cache 的注解（前面提到的四个）会在调用方法之后，去缓存方法返回的最终结果；或者在方法调用之前拿缓存中的结果，当然还有删除缓存中的结果。</p><p>这些读写操作不用我们手动再去写代码实现了，直接交给 Spring Cache 来打理就 OK 了，是不是非常贴心？</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-afed274d-458d-4e6e-9fd0-b421ac811f47.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>第一步</strong>，在 pom.xml 文件中追加 Redis 的 starter。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;dependency&gt;
    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
    &lt;artifactId&gt;spring-boot-starter-data-redis&lt;/artifactId&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>第二步</strong>，在 application.yml 文件中添加 Redis 链接配置。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>spring:
    redis:
        host: 118.xx.xx.xxx # Redis服务器地址
        database: 0 # Redis数据库索引（默认为0）
        port: 6379 # Redis服务器连接端口
        password: xx # Redis服务器连接密码（默认为空）
        timeout: 1000ms # 连接超时时间（毫秒）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>第三步</strong>，新增 RedisConfig.java 类，通过 RedisTemplate 设置 JSON 格式的序列化器，这样的话存储到 Redis 里的数据将是有类型的 JSON 数据，例如：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@EnableCaching</span>
<span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RedisConfig</span> <span class="token keyword">extends</span> <span class="token class-name">CachingConfigurerSupport</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> <span class="token function">redisTemplate</span><span class="token punctuation">(</span><span class="token class-name">RedisConnectionFactory</span> redisConnectionFactory<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> redisTemplate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">setConnectionFactory</span><span class="token punctuation">(</span>redisConnectionFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 通过 Jackson 组件进行序列化</span>
        <span class="token class-name">RedisSerializer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> serializer <span class="token operator">=</span> <span class="token function">redisSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// key 和 value</span>
        <span class="token comment">// 一般来说， redis-key采用字符串序列化；</span>
        <span class="token comment">// redis-value采用json序列化， json的体积小，可读性高，不需要实现serializer接口。</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">setKeySerializer</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">StringRedisSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">setValueSerializer</span><span class="token punctuation">(</span>serializer<span class="token punctuation">)</span><span class="token punctuation">;</span>

        redisTemplate<span class="token punctuation">.</span><span class="token function">setHashKeySerializer</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">StringRedisSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">setHashValueSerializer</span><span class="token punctuation">(</span>serializer<span class="token punctuation">)</span><span class="token punctuation">;</span>

        redisTemplate<span class="token punctuation">.</span><span class="token function">afterPropertiesSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> redisTemplate<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">RedisSerializer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> <span class="token function">redisSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//创建JSON序列化器</span>
        <span class="token class-name">Jackson2JsonRedisSerializer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> serializer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Jackson2JsonRedisSerializer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ObjectMapper</span> objectMapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        objectMapper<span class="token punctuation">.</span><span class="token function">setVisibility</span><span class="token punctuation">(</span><span class="token class-name">PropertyAccessor</span><span class="token punctuation">.</span><span class="token constant">ALL</span><span class="token punctuation">,</span> <span class="token class-name">JsonAutoDetect<span class="token punctuation">.</span>Visibility</span><span class="token punctuation">.</span><span class="token constant">ANY</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// https://www.cnblogs.com/shanheyongmu/p/15157378.html</span>
        <span class="token comment">// objectMapper.enableDefaultTyping()被弃用</span>
        objectMapper<span class="token punctuation">.</span><span class="token function">activateDefaultTyping</span><span class="token punctuation">(</span>
                <span class="token class-name">LaissezFaireSubTypeValidator</span><span class="token punctuation">.</span>instance<span class="token punctuation">,</span>
                <span class="token class-name">ObjectMapper<span class="token punctuation">.</span>DefaultTyping</span><span class="token punctuation">.</span><span class="token constant">NON_FINAL</span><span class="token punctuation">,</span>
                <span class="token class-name">JsonTypeInfo<span class="token punctuation">.</span>As</span><span class="token punctuation">.</span><span class="token constant">WRAPPER_ARRAY</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        serializer<span class="token punctuation">.</span><span class="token function">setObjectMapper</span><span class="token punctuation">(</span>objectMapper<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> serializer<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过 RedisCacheConfiguration 设置超时时间，来避免产生很多不必要的缓存数据。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">RedisCacheManager</span> <span class="token function">redisCacheManager</span><span class="token punctuation">(</span><span class="token class-name">RedisConnectionFactory</span> redisConnectionFactory<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">RedisCacheWriter</span> redisCacheWriter <span class="token operator">=</span> <span class="token class-name">RedisCacheWriter</span><span class="token punctuation">.</span><span class="token function">nonLockingRedisCacheWriter</span><span class="token punctuation">(</span>redisConnectionFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//设置Redis缓存有效期为1天</span>
    <span class="token class-name">RedisCacheConfiguration</span> redisCacheConfiguration <span class="token operator">=</span> <span class="token class-name">RedisCacheConfiguration</span><span class="token punctuation">.</span><span class="token function">defaultCacheConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">serializeValuesWith</span><span class="token punctuation">(</span><span class="token class-name">RedisSerializationContext<span class="token punctuation">.</span>SerializationPair</span><span class="token punctuation">.</span><span class="token function">fromSerializer</span><span class="token punctuation">(</span><span class="token function">redisSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">entryTtl</span><span class="token punctuation">(</span><span class="token class-name">Duration</span><span class="token punctuation">.</span><span class="token function">ofDays</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RedisCacheManager</span><span class="token punctuation">(</span>redisCacheWriter<span class="token punctuation">,</span> redisCacheConfiguration<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>第四步</strong>，在标签更新接口中添加 @CachePut 注解，也就是说方法执行前不会去缓存中找，但方法执行完会将返回值放入缓存中。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Controller</span>
<span class="token annotation punctuation">@Api</span><span class="token punctuation">(</span>tags <span class="token operator">=</span> <span class="token string">&quot;标签&quot;</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/postTag&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PostTagController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">IPostTagService</span> postTagService<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">IPostTagRelationService</span> postTagRelationService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;/update&quot;</span><span class="token punctuation">,</span> method <span class="token operator">=</span> <span class="token class-name">RequestMethod</span><span class="token punctuation">.</span><span class="token constant">POST</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ResponseBody</span>
    <span class="token annotation punctuation">@ApiOperation</span><span class="token punctuation">(</span><span class="token string">&quot;修改标签&quot;</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@CachePut</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;codingmore&quot;</span><span class="token punctuation">,</span> key <span class="token operator">=</span> <span class="token string">&quot;&#39;codingmore:postag:&#39;+#postAddTagParam.postTagId&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">ResultObject</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Valid</span> <span class="token class-name">PostTagParam</span> postAddTagParam<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>postAddTagParam<span class="token punctuation">.</span><span class="token function">getPostTagId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token class-name">ResultObject</span><span class="token punctuation">.</span><span class="token function">failed</span><span class="token punctuation">(</span><span class="token string">&quot;标签id不能为空&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">PostTag</span> postTag <span class="token operator">=</span> postTagService<span class="token punctuation">.</span><span class="token function">getById</span><span class="token punctuation">(</span>postAddTagParam<span class="token punctuation">.</span><span class="token function">getPostTagId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>postTag <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token class-name">ResultObject</span><span class="token punctuation">.</span><span class="token function">failed</span><span class="token punctuation">(</span><span class="token string">&quot;标签不存在&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">QueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">PostTag</span><span class="token punctuation">&gt;</span></span> queryWrapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">QueryWrapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        queryWrapper<span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">&quot;description&quot;</span><span class="token punctuation">,</span> postAddTagParam<span class="token punctuation">.</span><span class="token function">getDescription</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> count <span class="token operator">=</span> postTagService<span class="token punctuation">.</span><span class="token function">count</span><span class="token punctuation">(</span>queryWrapper<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token class-name">ResultObject</span><span class="token punctuation">.</span><span class="token function">failed</span><span class="token punctuation">(</span><span class="token string">&quot;标签名称已存在&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">BeanUtils</span><span class="token punctuation">.</span><span class="token function">copyProperties</span><span class="token punctuation">(</span>postAddTagParam<span class="token punctuation">,</span> postTag<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">ResultObject</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span>postTagService<span class="token punctuation">.</span><span class="token function">updateById</span><span class="token punctuation">(</span>postTag<span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token string">&quot;修改成功&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;修改失败&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意看 @CachePut 注解这行代码：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@CachePut</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;codingmore&quot;</span><span class="token punctuation">,</span> key <span class="token operator">=</span> <span class="token string">&quot;&#39;codingmore:postag:&#39;+#postAddTagParam.postTagId&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>value：缓存名称，也就是缓存的命名空间，value 这里应该换成 namespace 更好一点；</li><li>key：用于在命名空间中缓存的 key 值，可以使用 SpEL 表达式，比如说 <code>&#39;codingmore:postag:&#39;+#postAddTagParam.postTagId</code>；</li><li>还有两个属性 unless 和 condition 暂时没用到，分别表示条件符合则不缓存，条件符合则缓存。</li></ul><p><strong>第五步</strong>，启动服务器端，启动客户端，修改标签进行测试。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-6463fdda-6cc2-43f4-91e6-e0de9f0f1c0c.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>通过 Red 客户端（一款 macOS 版的 Redis 桌面工具），可以看到刚刚更新的返回值已经添加到 Redis 中了。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-468a253d-931a-4e5b-8f7e-36ecc1561dac.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="使用-redis-连接池" tabindex="-1"><a class="header-anchor" href="#使用-redis-连接池" aria-hidden="true">#</a> 使用 Redis 连接池</h2><p>Redis 是基于内存的数据库，本来是为了提高程序性能的，但如果不使用 Redis 连接池的话，建立连接、断开连接就需要消耗大量的时间。</p><p>用了连接池，就可以实现在客户端建立多个连接，需要的时候从连接池拿，用完了再放回去，这样就节省了连接建立、断开的时间。</p><p>要使用连接池，我们得先了解 Redis 的客户端，常用的有两种：Jedis 和 Lettuce。</p><ul><li>Jedis：Spring Boot 1.5.x 版本时默认的 Redis 客户端，实现上是直接连接 Redis Server，如果在多线程环境下是非线程安全的，这时候要使用连接池为每个 jedis 实例增加物理连接；</li><li>Lettuce：Spring Boot 2.x 版本后默认的 Redis 客户端，基于 Netty 实现，连接实例可以在多个线程间并发访问，一个连接实例不够的情况下也可以按需要增加连接实例。</li></ul><p>它俩在 GitHub 上都挺受欢迎的，大家可以按需选用。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-c94651b5-1e53-42e5-ad5f-162b4bf509a7.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>我这里把两种客户端的情况都演示一下，方便小伙伴们参考。</p><p><strong>1）Lettuce</strong></p><p><strong>第一步</strong>，修改 application-dev.yml，添加 Lettuce 连接池配置（pool 节点）。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>spring:
    redis:
        lettuce:
          pool:
            max-active: 8 # 连接池最大连接数
            max-idle: 8 # 连接池最大空闲连接数
            min-idle: 0 # 连接池最小空闲连接数
            max-wait: -1ms # 连接池最大阻塞等待时间，负值表示没有限制
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>第二步</strong>，在 pom.xml 文件中添加 commons-pool2 依赖，否则会在启动的时候报 ClassNotFoundException 的错。这是因为 Spring Boot 2.x 里默认没启用连接池。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Caused by: java.lang.ClassNotFoundException: org.apache.commons.pool2.impl.GenericObjectPoolConfig
    at java.net.URLClassLoader.findClass(URLClassLoader.java:381)
    at java.lang.ClassLoader.loadClass(ClassLoader.java:424)
    at sun.misc.Launcher$AppClassLoader.loadClass(Launcher.java:335)
    at java.lang.ClassLoader.loadClass(ClassLoader.java:357)
    ... 153 common frames omitted
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>添加 commons-pool2 依赖：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;dependency&gt;
    &lt;groupId&gt;org.apache.commons&lt;/groupId&gt;
    &lt;artifactId&gt;commons-pool2&lt;/artifactId&gt;
    &lt;version&gt;2.6.2&lt;/version&gt;
    &lt;type&gt;jar&lt;/type&gt;
    &lt;scope&gt;compile&lt;/scope&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重新启动服务，在 RedisConfig 类的 redisTemplate 方法里对 redisTemplate 打上断点，debug 模式下可以看到连接池的配置信息（<code>redisConnectionFactory→clientConfiguration→poolConfig</code>）。如下图所示。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-e4cd346c-07d0-4ee3-9832-4c7a2aa1b7b4.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>如果在 application-dev.yml 文件中没有添加 Lettuce 连接池配置的话，是不会看到</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-7e86e208-bf5f-4dc2-a962-2b926adaa524.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>2）Jedis</strong></p><p><strong>第一步</strong>，在 pom.xml 文件中添加 Jedis 依赖，去除 Lettuce 默认依赖。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;dependency&gt;
    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
    &lt;artifactId&gt;spring-boot-starter-data-redis&lt;/artifactId&gt;
    &lt;exclusions&gt;
        &lt;exclusion&gt;
            &lt;groupId&gt;io.lettuce&lt;/groupId&gt;
            &lt;artifactId&gt;lettuce-core&lt;/artifactId&gt;
        &lt;/exclusion&gt;
    &lt;/exclusions&gt;
&lt;/dependency&gt;

&lt;dependency&gt;
    &lt;groupId&gt;redis.clients&lt;/groupId&gt;
    &lt;artifactId&gt;jedis&lt;/artifactId&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>第二步</strong>，修改 application-dev.yml，添加 Jedis 连接池配置。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>spring:
    redis:
        jedis:
          pool:
            max-active: 8 # 连接池最大连接数
            max-idle: 8 # 连接池最大空闲连接数
            min-idle: 0 # 连接池最小空闲连接数
            max-wait: -1ms # 连接池最大阻塞等待时间，负值表示没有限制
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动服务后，观察 redisTemplate 的 clientConfiguration 节点，可以看到它的值已经变成 DefaultJedisClientConfiguration 对象了。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-01aa7dc6-b9f7-46bd-b8a4-0a24e44185bc.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>当然了，也可以不配置 Jedis 客户端的连接池，走默认的连接池配置。因为 Jedis 客户端默认增加了连接池的依赖包，在 pom.xml 文件中点开 Jedis 客户端依赖可以查看到。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-c87d8e02-aace-4d86-8011-13e4087956e0.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="自由操作-redis" tabindex="-1"><a class="header-anchor" href="#自由操作-redis" aria-hidden="true">#</a> 自由操作 Redis</h2><p>Spring Cache 虽然提供了操作 Redis 的便捷方法，比如我们前面演示的 @CachePut 注解，但注解提供的操作非常有限，比如说它只能保存返回值到缓存中，而返回值并不一定是我们想要保存的结果。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-f28a3b84-ed0b-4a78-a5e5-5803bae967be.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>与其保存这个返回给客户端的 JSON 信息，我们更想保存的是更新后的标签。那该怎么自由地操作 Redis 呢？</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-9b89af51-c2fd-4b2d-ba57-a59efa4cbffd.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>第一步</strong>，增加 RedisService 接口：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">RedisService</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 保存属性
     */</span>
    <span class="token keyword">void</span> <span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">Object</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 获取属性
     */</span>
    <span class="token class-name">Object</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 删除属性
     */</span>
    <span class="token class-name">Boolean</span> <span class="token function">del</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

    <span class="token comment">// 更多方法见：https://github.com/itwanger/coding-more/blob/main/codingmore-mbg/src/main/java/com/codingmore/service/RedisService.java</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>第二步</strong>，增加 RedisServiceImpl 实现类：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RedisServiceImpl</span> <span class="token keyword">implements</span> <span class="token class-name">RedisService</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> redisTemplate<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">Object</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Boolean</span> <span class="token function">del</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> redisTemplate<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 更多代码参考：https://github.com/itwanger/coding-more/blob/main/codingmore-mbg/src/main/java/com/codingmore/service/impl/RedisServiceImpl.java</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>第三步</strong>，在标签 PostTagController 中增加 Redis 测试用接口 simpleTest ：</p><hr>`,99),P={href:"https://javabetter.cn/zhishixingqiu/",target:"_blank",rel:"noopener noreferrer"},A=n("strong",null,"编程喵",-1),L=n("hr",null,null,-1),F=n("h2",{id:"项目源码",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#项目源码","aria-hidden":"true"},"#"),s(" 项目源码")],-1),V={href:"https://github.com/itwanger/coding-more",target:"_blank",rel:"noopener noreferrer"},B={href:"https://github.com/itwanger/codingmore-learning/tree/main/codingmore-redis",target:"_blank",rel:"noopener noreferrer"},J=n("figure",null,[n("img",{src:"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png",alt:"",tabindex:"0",loading:"lazy"}),n("figcaption")],-1);function M(D,E){const a=i("ExternalLinkIcon");return p(),c("div",null,[u,d,r,v,m,n("blockquote",null,[n("p",null,[s("官方地址："),n("a",k,[s("https://redis.io/docs/getting-started/"),e(a)])])]),b,g,f,h,n("p",null,[s("Windows 用户可以通过我之前提到的 "),n("a",y,[s("chocolatey 命令行软件管理神器"),e(a)]),s("安装（可以戳链接了解详情），只需要一行命令 "),x,s(" 就可以完成安装了，非常方便。")]),R,_,j,S,n("blockquote",null,[n("p",null,[n("a",w,[s("https://github.com/qishibo/AnotherRedisDesktopManager"),e(a)])])]),T,C,q,z,n("blockquote",null,[n("p",null,[s("Redis 教程："),n("a",I,[s("https://www.redis.net.cn/tutorial/3508.html"),e(a)])])]),O,n("p",null,[s("更多内容，只针对《二哥的Java进阶之路》星球用户开放，需要的小伙伴可以"),n("a",P,[s("戳链接🔗"),e(a)]),s("加入我们的星球，一起学习，一起卷。。"),A,s("🐱是一个 Spring Boot+Vue 的前后端分离项目，融合了市面上绝大多数流行的技术要点。通过学习实战项目，你可以将所学的知识通过实践进行检验、你可以拓宽自己的技术边界，你可以掌握一个真正的实战项目是如何从 0 到 1 的。")]),L,F,n("blockquote",null,[n("ul",null,[n("li",null,[s("编程喵："),n("a",V,[s("https://github.com/itwanger/coding-more"),e(a)])]),n("li",null,[s("整合 Redis 专用："),n("a",B,[s("https://github.com/itwanger/coding-more"),e(a)])])])]),J])}const H=t(l,[["render",M],["__file","redis-springboot.html.vue"]]);export{H as default};
