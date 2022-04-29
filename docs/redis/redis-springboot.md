---
category:
  - 数据库
tag:
  - Redis
---

# 某意大利小哥，竟靠一个缓存中间件直接封神？

大家好，我是二哥呀！关注我有一段时间的小伙伴都知道了，我最近的业余时间都花在了编程喵🐱这个实战项目上，其中要用到 Redis，于是我就想，索性出一期 Redis 的入门教程吧——主要是整合 Redis 来实现缓存功能，希望能帮助到大家。

作为开发者，相信大家都知道 Redis 的重要性。Redis 是使用 C 语言开发的一个高性能键值对数据库，是互联网技术领域使用最为广泛的存储中间件，它是「Remote Dictionary Service」的首字母缩写，也就是「远程字典服务」。

Redis 以超高的性能、完美的文档、简洁的源码著称，国内外很多大型互联网公司都在用，比如说阿里、腾讯、GitHub、Stack Overflow 等等。当然了，中小型公司也都在用。

![](https://img-blog.csdnimg.cn/img_convert/10872dcbe110f9aa7aaf23a8fed76469.png)

Redis 的作者是一名意大利人，原名 Salvatore Sanfilippo，网名 Antirez。不过，很遗憾的是，网上竟然没有他的维基百科，甚至他自己的博客网站，都在跪的边缘（没有 HTTPS，一些 js 也加载失败了）。

![](https://img-blog.csdnimg.cn/img_convert/5dba51cff6e4f1c6c05ab893749b0a18.png)

不过，如果是鄙人造出 Redis 这么酷炫的产品，早就功成身退了。

### 一、安装 Redis

Redis 的官网提供了各种平台的安装包，Linux、macOS、Windows 的都有。


![](https://img-blog.csdnimg.cn/img_convert/a4ac529b6f2a4ee018e344ba1e65dc5f.png)

>官方地址：[https://redis.io/docs/getting-started/](https://redis.io/docs/getting-started/)

我目前用的是 macOS，直接执行 `brew install redis` 就可以完成安装了。

![](https://img-blog.csdnimg.cn/img_convert/7de3dc4db8e8711270a6974aa8e083c5.png)

完成安装后执行 `redis-server` 就可以启动 Redis 服务了。

![](https://img-blog.csdnimg.cn/img_convert/d1ea58d82b3dfbd79baef07efef24054.png)

不过，实际的开发当中，我们通常会选择 Linux 服务器来作为生产环境。我的服务器上安装了宝塔面板，可以直接在软件商店里搜「Redis」关键字，然后直接安装（我的已经安装过了）。

![](https://img-blog.csdnimg.cn/img_convert/753dc67e5ca3fd1090c281ff77c105a2.png)

### 二、整合 Redis

编程喵是一个 Spring Boot + Vue 的前后端分离项目，要整合 Redis 的话，最好的方式是使用 Spring Cache，仅仅通过 @Cacheable、@CachePut、@CacheEvict、@EnableCaching 等注解就可以轻松使用 Redis 做缓存了。


![](https://img-blog.csdnimg.cn/img_convert/3855e75d86e5da978a76369384dd8055.png)

**1）@EnableCaching**，开启缓存功能。

**2）@Cacheable**，调用方法前，去缓存中找，找到就返回，找不到就执行方法，并将返回值放到缓存中。

**3）@CachePut**，方法调用前不会去缓存中找，无论如何都会执行方法，执行完将返回值放到缓存中。

**4）@CacheEvict**，清理缓存中的一个或多个记录。

Spring Cache 是 Spring 提供的一套完整的缓存解决方案，虽然它本身没有提供缓存的实现，但它提供的一整套接口、规范、配置、注解等，可以让我们无缝衔接 Redis、Ehcache 等缓存实现。

Spring Cache 的注解（前面提到的四个）会在调用方法之后，去缓存方法返回的最终结果；或者在方法调用之前拿缓存中的结果，当然还有删除缓存中的结果。

这些读写操作不用我们手动再去写代码实现了，直接交给 Spring Cache 来打理就 OK 了，是不是非常贴心？

![](https://img-blog.csdnimg.cn/img_convert/66e9480a7b1e9ecf48953dc97ed882f0.png)

**第一步**，在 pom.xml 文件中追加 Redis 的 starter。

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

**第二步**，在 application.yml 文件中添加 Redis 链接配置。

```
spring:
    redis:
        host: 118.xx.xx.xxx # Redis服务器地址
        database: 0 # Redis数据库索引（默认为0）
        port: 6379 # Redis服务器连接端口
        password: xx # Redis服务器连接密码（默认为空）
        timeout: 1000ms # 连接超时时间（毫秒）
```

**第三步**，新增 RedisConfig.java 类，通过 RedisTemplate 设置 JSON 格式的序列化器，这样的话存储到 Redis 里的数据将是有类型的 JSON 数据，例如：

```java
@EnableCaching
@Configuration
public class RedisConfig extends CachingConfigurerSupport {

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory);

        // 通过 Jackson 组件进行序列化
        RedisSerializer<Object> serializer = redisSerializer();

        // key 和 value
        // 一般来说， redis-key采用字符串序列化；
        // redis-value采用json序列化， json的体积小，可读性高，不需要实现serializer接口。
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(serializer);

        redisTemplate.setHashKeySerializer(new StringRedisSerializer());
        redisTemplate.setHashValueSerializer(serializer);

        redisTemplate.afterPropertiesSet();
        return redisTemplate;
    }

    @Bean
    public RedisSerializer<Object> redisSerializer() {
        //创建JSON序列化器
        Jackson2JsonRedisSerializer<Object> serializer = new Jackson2JsonRedisSerializer<>(Object.class);
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        // https://www.cnblogs.com/shanheyongmu/p/15157378.html
        // objectMapper.enableDefaultTyping()被弃用
        objectMapper.activateDefaultTyping(
                LaissezFaireSubTypeValidator.instance,
                ObjectMapper.DefaultTyping.NON_FINAL,
                JsonTypeInfo.As.WRAPPER_ARRAY);
        serializer.setObjectMapper(objectMapper);
        return serializer;
    }

}
```

通过 RedisCacheConfiguration 设置超时时间，来避免产生很多不必要的缓存数据。

```java
@Bean
public RedisCacheManager redisCacheManager(RedisConnectionFactory redisConnectionFactory) {
    RedisCacheWriter redisCacheWriter = RedisCacheWriter.nonLockingRedisCacheWriter(redisConnectionFactory);
    //设置Redis缓存有效期为1天
    RedisCacheConfiguration redisCacheConfiguration = RedisCacheConfiguration.defaultCacheConfig()
            .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(redisSerializer())).entryTtl(Duration.ofDays(1));
    return new RedisCacheManager(redisCacheWriter, redisCacheConfiguration);
}
```

**第四步**，在标签更新接口中添加 @CachePut 注解，也就是说方法执行前不会去缓存中找，但方法执行完会将返回值放入缓存中。

```java
@Controller
@Api(tags = "标签")
@RequestMapping("/postTag")
public class PostTagController {

    @Autowired
    private IPostTagService postTagService;
    @Autowired
    private IPostTagRelationService postTagRelationService;

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseBody
    @ApiOperation("修改标签")
    @CachePut(value = "codingmore", key = "'codingmore:postags:'+#postAddTagParam.postTagId")
    public ResultObject<String> update(@Valid PostTagParam postAddTagParam) {
        if (postAddTagParam.getPostTagId() == null) {
            return ResultObject.failed("标签id不能为空");
        }
        PostTag postTag = postTagService.getById(postAddTagParam.getPostTagId());
        if (postTag == null) {
            return ResultObject.failed("标签不存在");
        }
        QueryWrapper<PostTag> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("description", postAddTagParam.getDescription());
        int count = postTagService.count(queryWrapper);
        if (count > 0) {
            return ResultObject.failed("标签名称已存在");
        }
        BeanUtils.copyProperties(postAddTagParam, postTag);
        return ResultObject.success(postTagService.updateById(postTag) ? "修改成功" : "修改失败");
    }
}
```

注意看 @CachePut 注解这行代码：

```java
@CachePut(value = "codingmore", key = "'codingmore:postags:'+#postAddTagParam.postTagId")
```

- value：缓存名称，也就是缓存的命名空间，value 这里应该换成 namespace 更好一点；
- key：用于在命名空间中缓存的 key 值，可以使用 SpEL 表达式，比如说 `'codingmore:postags:'+#postAddTagParam.postTagId`；
- 还有两个属性 unless 和 condition 暂时没用到，分别表示条件符合则不缓存，条件符合则缓存。

**第五步**，启动服务器端，启动客户端，修改标签进行测试。

![](https://img-blog.csdnimg.cn/img_convert/7a3faff80eae3d43031aae38f2fc8a89.png)

通过 Red 客户端（一款 macOS 版的 Redis 桌面工具），可以看到刚刚更新的返回值已经添加到 Redis 中了。

![](https://img-blog.csdnimg.cn/img_convert/482888d29652bcf20ec5e1af369cd03b.png)

### 三、使用 Redis 连接池

Redis 是基于内存的数据库，本来是为了提高程序性能的，但如果不使用 Redis 连接池的话，建立连接、断开连接就需要消耗大量的时间。

用了连接池，就可以实现在客户端建立多个连接，需要的时候从连接池拿，用完了再放回去，这样就节省了连接建立、断开的时间。

要使用连接池，我们得先了解 Redis 的客户端，常用的有两种：Jedis 和 Lettuce。

- Jedis：Spring Boot 1.5.x 版本时默认的 Redis 客户端，实现上是直接连接 Redis Server，如果在多线程环境下是非线程安全的，这时候要使用连接池为每个 jedis 实例增加物理连接；
- Lettuce：Spring Boot 2.x 版本后默认的 Redis 客户端，基于 Netty 实现，连接实例可以在多个线程间并发访问，一个连接实例不够的情况下也可以按需要增加连接实例。

它俩在 GitHub 上都挺受欢迎的，大家可以按需选用。

![](https://img-blog.csdnimg.cn/img_convert/0304871d4718d0dd9a5d428f14bb21a3.png)

我这里把两种客户端的情况都演示一下，方便小伙伴们参考。

**1）Lettuce**

**第一步**，修改 application-dev.yml，添加 Lettuce 连接池配置（pool 节点）。

```
spring:
    redis:
        lettuce:
          pool:
            max-active: 8 # 连接池最大连接数
            max-idle: 8 # 连接池最大空闲连接数
            min-idle: 0 # 连接池最小空闲连接数
            max-wait: -1ms # 连接池最大阻塞等待时间，负值表示没有限制
```

**第二步**，在 pom.xml 文件中添加 commons-pool2 依赖，否则会在启动的时候报 ClassNotFoundException 的错。这是因为 Spring Boot 2.x 里默认没启用连接池。

```
Caused by: java.lang.ClassNotFoundException: org.apache.commons.pool2.impl.GenericObjectPoolConfig
	at java.net.URLClassLoader.findClass(URLClassLoader.java:381)
	at java.lang.ClassLoader.loadClass(ClassLoader.java:424)
	at sun.misc.Launcher$AppClassLoader.loadClass(Launcher.java:335)
	at java.lang.ClassLoader.loadClass(ClassLoader.java:357)
	... 153 common frames omitted
```

添加 commons-pool2 依赖：

```
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
    <version>2.6.2</version>
    <type>jar</type>
    <scope>compile</scope>
</dependency>
```

重新启动服务，在 RedisConfig 类的 redisTemplate 方法里对 redisTemplate 打上断点，debug 模式下可以看到连接池的配置信息（`redisConnectionFactory→clientConfiguration→poolConfig`）。如下图所示。

![](https://img-blog.csdnimg.cn/img_convert/1550863dcb1dc7eb24efb265d5b04319.png)

如果在 application-dev.yml 文件中没有添加 Lettuce 连接池配置的话，是不会看到

![](https://img-blog.csdnimg.cn/img_convert/4dd422a75f9e710ea34a1771001b8333.png)



**2）Jedis**

**第一步**，在 pom.xml 文件中添加 Jedis 依赖，去除 Lettuce 默认依赖。

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
    <exclusions>
        <exclusion>
            <groupId>io.lettuce</groupId>
            <artifactId>lettuce-core</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
</dependency>
```

**第二步**，修改 application-dev.yml，添加 Jedis 连接池配置。

```
spring:
    redis:
        jedis:
          pool:
            max-active: 8 # 连接池最大连接数
            max-idle: 8 # 连接池最大空闲连接数
            min-idle: 0 # 连接池最小空闲连接数
            max-wait: -1ms # 连接池最大阻塞等待时间，负值表示没有限制
```

启动服务后，观察 redisTemplate 的 clientConfiguration 节点，可以看到它的值已经变成 DefaultJedisClientConfiguration 对象了。


![](https://img-blog.csdnimg.cn/img_convert/fab2a70033e339b836802aa15b1327ba.png)


当然了，也可以不配置 Jedis 客户端的连接池，走默认的连接池配置。因为 Jedis 客户端默认增加了连接池的依赖包，在 pom.xml 文件中点开 Jedis 客户端依赖可以查看到。 

![](https://img-blog.csdnimg.cn/img_convert/dabc473eebaf612a913f740002a6af5f.png)

### 四、自由操作 Redis

Spring Cache 虽然提供了操作 Redis 的便捷方法，比如我们前面演示的 @CachePut 注解，但注解提供的操作非常有限，比如说它只能保存返回值到缓存中，而返回值并不一定是我们想要保存的结果。

![](https://img-blog.csdnimg.cn/img_convert/3804abcc76359d9f225ac794e68650bc.png)

与其保存这个返回给客户端的 JSON 信息，我们更想保存的是更新后的标签。那该怎么自由地操作 Redis 呢？

![](https://img-blog.csdnimg.cn/img_convert/2effe1fc18c93391c51340576a00ddf5.png)

**第一步**，增加 RedisService 接口：

```java
public interface RedisService {

    /**
     * 保存属性
     */
    void set(String key, Object value);

    /**
     * 获取属性
     */
    Object get(String key);

    /**
     * 删除属性
     */
    Boolean del(String key);

    ...

    // 更多方法见：https://github.com/itwanger/coding-more/blob/main/codingmore-mbg/src/main/java/com/codingmore/service/RedisService.java

}
```

**第二步**，增加 RedisServiceImpl 实现类：

```java
@Service
public class RedisServiceImpl implements RedisService {
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Override
    public void set(String key, Object value) {
        redisTemplate.opsForValue().set(key, value);
    }

    @Override
    public Object get(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    @Override
    public Boolean del(String key) {
        return redisTemplate.delete(key);
    }

    // 更多代码参考：https://github.com/itwanger/coding-more/blob/main/codingmore-mbg/src/main/java/com/codingmore/service/impl/RedisServiceImpl.java
}
```

**第三步**，在标签 PostTagController 中增加 Redis 测试用接口 simpleTest ：

```java
@Controller
@Api(tags = "标签")
@RequestMapping("/postTag")
public class PostTagController {
    @Autowired
    private IPostTagService postTagService;
    @Autowired
    private IPostTagRelationService postTagRelationService;

    @Autowired
    private RedisService redisService;

    @RequestMapping(value = "/simpleTest", method = RequestMethod.POST)
    @ResponseBody
    @ApiOperation("修改标签/Redis 测试用")
    public ResultObject<PostTag> simpleTest(@Valid PostTagParam postAddTagParam) {
        if (postAddTagParam.getPostTagId() == null) {
            return ResultObject.failed("标签id不能为空");
        }
        PostTag postTag = postTagService.getById(postAddTagParam.getPostTagId());
        if (postTag == null) {
            return ResultObject.failed("标签不存在");
        }
        QueryWrapper<PostTag> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("description", postAddTagParam.getDescription());
        int count = postTagService.count(queryWrapper);
        if (count > 0) {
            return ResultObject.failed("标签名称已存在");
        }
        BeanUtils.copyProperties(postAddTagParam, postTag);

        boolean successFlag = postTagService.updateById(postTag);

        String key = "redis:simple:" + postTag.getPostTagId();
        redisService.set(key, postTag);

        PostTag cachePostTag = (PostTag) redisService.get(key);
        return ResultObject.success(cachePostTag);
    }

}
```

**第四步**，重启服务，使用 Knife4j 测试该接口 ：

![](https://img-blog.csdnimg.cn/img_convert/5a05faf1d698be1004d43459d10c4c41.png)

然后通过 Red 查看该缓存，OK，确认我们的代码是可以完美执行的。

![](https://img-blog.csdnimg.cn/img_convert/7c5062a79c293b58f279e61588280d18.png)

### 五、小结

赞美 Redis 的彩虹屁我就不再吹了，总之，如果我是 Redis 的作者 Antirez，我就自封为神！

![](https://img-blog.csdnimg.cn/img_convert/dbbeda5f72afd77fbccb2f66560f8ab3.gif)

编程喵实战项目的源码地址我贴下面了，大家可以下载下来搞一波了：

> [https://github.com/itwanger/coding-more](https://github.com/itwanger/coding-more)

我们下期见~

----

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png)

