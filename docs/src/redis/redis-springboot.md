---
category:
  - Java企业级开发
tag:
  - Spring Boot
  - Redis
title: Spring Boot 整合 Redis  缓存
---

作为开发者，相信大家都知道 Redis 的重要性。Redis 是使用 C 语言开发的一个高性能键值对数据库，是互联网技术领域使用最为广泛的存储中间件，它是「Remote Dictionary Service」的首字母缩写，也就是「远程字典服务」。

Redis 以超高的性能、完美的文档、简洁的源码著称，国内外很多大型互联网公司都在用，比如说阿里、腾讯、GitHub、Stack Overflow 等等。当然了，中小型公司也都在用。

## 安装 Redis

Redis 的官网提供了各种平台的安装包，Linux、macOS、Windows 的都有。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-182f2469-b7f2-4fec-bd41-e5a33dca185a.png)

>官方地址：[https://redis.io/docs/getting-started/](https://redis.io/docs/getting-started/)

我目前用的是 macOS，直接执行 `brew install redis` 就可以完成安装了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-cdf02715-5ed6-44b5-a1ce-db0249107dd7.png)

完成安装后执行 `redis-server` 就可以启动 Redis 服务了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-8c272a19-e961-449c-afee-c973fb44a5e0.png)

Windows 用户可以通过我之前提到的 [chocolatey 命令行软件管理神器](https://mp.weixin.qq.com/s/Hgm3ZAbOeBqpSUsJZBtlNg)安装（可以戳链接了解详情），只需要一行命令 `choco install redis` 就可以完成安装了，非常方便。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-13b569ca-e747-4d64-af0d-a9a5d0260f5f.png)


生产环境中，我们通常会在 Linux 上安装 Redis。我的服务器上安装了宝塔面板，可以直接在软件商店里搜「Redis」关键字，然后直接安装（我已经安装过了）。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-df5e600b-1290-447c-b140-6f513c69492c.png)

顺带安装一下 Redis 客户端工具，推荐 GitHub 星标 20k+ 的 AnotherRedisDesktopManager，一款 🚀🚀🚀 更快、更好、更稳定的Redis桌面(GUI)管理客户端，支持 Windows、macOS 和 Linux，性能出众，可以轻松加载海量键值。

>[https://github.com/qishibo/AnotherRedisDesktopManager](https://github.com/qishibo/AnotherRedisDesktopManager)

安装完成后，链接 Redis 服务：


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-d36b9022-fe3b-4fb1-80c3-8d23d19d9025.png)


## Redis 数据类型

Redis支持五种数据类型：string（字符串），hash（哈希），list（列表），set（集合）及zset(sorted set：有序集合)。

>Redis 教程：[https://www.redis.net.cn/tutorial/3508.html](https://www.redis.net.cn/tutorial/3508.html)

**1）string**

string 是 Redis 最基本的数据类型，一个key对应一个value。

我们可以通过 AnotherRedisDesktopManager 客户端来练习一下基本的 set、get 命令（参考 Redis 文档，客户端会有提示，所以命令完全不用死记硬背）。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-d7d4043b-b753-484c-bfc1-25533004cca5.png)

对应文本命令：

```
## 增加一个 key 为 name，value 为 沉默王二
> set name '沉默王二'
OK
## 获取
> get name
沉默王二
> set name '沉默王三'
OK
> get name
沉默王三
## 删除
> del name
1
> get name
null
## 测试是否存在 name
> EXISTS key
0
> EXISTS name
0
```

**2）hash**

Redis hash 是一个键值对集合，值可以看成是一个 Map。

```
## 清除数据库
> flushdb
OK
## 创建 hash，key 为 user_hset 字段为 user1，值为 沉默王二
> hset user_hset user1 沉默王二
1
> hset user_hset user2 沉默王三
1
## 字段长度
> hlen user_hset
2
## 所有字段
> HKEYS user_hset
user1
user2
## 所有值
> hvals user_hset
沉默王二
沉默王三
## 字段 user1 的值
> hget user_hset user1
沉默王二
## 获取 key 为 user_hset 的所有字段和值
> hgetall user_hset
user1
沉默王二
user2
沉默王三
## 更新字段
> hset user_hset user1 沉默王四
0
> hgetall user_hset
user1
沉默王四
user2
沉默王三
> hdel user_hset user1
1
> hgetall user_hset
user2
沉默王三
```

**3）list**

list 是一个简单的字符串列表，按照插入顺序排序。

```
## 添加 key 为 user_list value 为 沉默王二、沉默万三的集合
> lpush user_list 沉默王二 沉默王三
2
## 查询
> lrange user_list 0 -1
沉默王三
沉默王二
## 往尾部添加
> rpush user_list 沉默王二是沙比
3
## 头部添加
> lpush user_list 沉默王二是傻叉
4
> lrange user_list 0 -1
沉默王二是傻叉
沉默王三
沉默王二
沉默王二是沙比
## 更新 index 为 0 的值
> lset user_list 0 沉默王四
OK
> lrange user_list 0 -1
沉默王四
沉默王三
沉默王二
沉默王二是沙比
## 删除 index 为 0 的值
> lrem user_list 0 沉默王四
1
> lrange user_list 0 -1
沉默王三
沉默王二
沉默王二是沙比
```

**4）set**

set 是 string 类型的无序集合，不允许有重复的元素。

```
## 添加 key 为 user_set value 为沉默王二 沉默王三 沉默王二的狗腿子的集合
> sadd user_set 沉默王二 沉默王三 沉默王二的狗腿子
3
## 查询
> smembers user_set
沉默王二
沉默王二的狗腿子
沉默王三
## 删除 value 为沉默王二的元素
> srem user_set 沉默王二
1
> smembers user_set
沉默王二的狗腿子
沉默王三
## 添加
> sadd user_set 沉默王二
1
> smembers user_set
沉默王二
沉默王二的狗腿子
沉默王三
```

**5）sorted set**

sorted set 是 string 类型的有序集合，不允许有重复的元素。

```
> FLUSHDB
OK
## 添加 key 为 user_zset 分数为 1 值为沉默王二、分数为 2 值为沉默王三、分数为 3 值为沉默王二的狗腿子
> zadd user_zset 1 沉默王二 2 沉默王三 3 沉默王二的狗腿子
3
## 查询
> zrange user_zset 0 -1
沉默王二
沉默王三
沉默王二的狗腿子
## 反转
> zrevrange user_zset 0 -1
沉默王二的狗腿子
沉默王三
沉默王二
## 查询元素沉默王二的分数
> zscore user_zset 沉默王二
1
```


## Spring Boot 整合 Redis

第一步，在 pom.xml 文件中添加 Redis 的 starter。

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

第二步，在 application.yml 文件中添加 Redis 的配置信息

```
spring:
  redis:
    host: xxx.xxx.99.232 # Redis服务器地址
    database: 0 # Redis数据库索引（默认为0）
    port: 6379 # Redis服务器连接端口
    password: xxx # Redis服务器连接密码（默认为空）
```

第三步，在测试类中添加以下代码。

```java
@SpringBootTest
class CodingmoreRedisApplicationTests {
    @Resource
    private RedisTemplate redisTemplate;

    @Resource
    private StringRedisTemplate stringRedisTemplate;

    @Test
    public void testRedis() {
        // 添加
        redisTemplate.opsForValue().set("name","沉默王二");
        // 查询
        System.out.println(redisTemplate.opsForValue().get("name"));
        // 删除
        redisTemplate.delete("name");
        // 更新
        redisTemplate.opsForValue().set("name","沉默王二的狗腿子");
        // 查询
        System.out.println(redisTemplate.opsForValue().get("name"));

        // 添加
        stringRedisTemplate.opsForValue().set("name","沉默王二");
        // 查询
        System.out.println(stringRedisTemplate.opsForValue().get("name"));
        // 删除
        stringRedisTemplate.delete("name");
        // 更新
        stringRedisTemplate.opsForValue().set("name","沉默王二的狗腿子");
        // 查询
        System.out.println(stringRedisTemplate.opsForValue().get("name"));

    }

}
```

RedisTemplate 和 StringRedisTemplate 都是 Spring Data Redis 提供的模板类，可以对 Redis 进行操作，后者针对键值对都是 String 类型的数据，前者可以是任何类型的对象。

RedisTemplate 和 StringRedisTemplate 除了提供 opsForValue 方法来操作字符串之外，还提供了以下方法：

- opsForList：操作 list
- opsForSet：操作 set
- opsForZSet：操作有序 set
- opsForHash：操作 hash

运行测试类后可以在控制台看到以下输出信息：


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-f4456aea-2e48-4bad-910d-2d963ef0224e.png)

也可以通过 AnotherRedisDesktopManager 客户端查看 Redis 数据库中的数据。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-f7551ebb-0bde-4084-9ab0-4a724d8ad2ec.png)



## 编程喵整合 Redis

编程喵是一个 Spring Boot + Vue 的前后端分离项目，要整合 Redis 的话，最好的方式是使用 Spring Cache，仅仅通过 @Cacheable、@CachePut、@CacheEvict、@EnableCaching 等注解就可以轻松使用 Redis 做缓存了。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-eb6d69d7-9152-4695-87c7-cba138ca93fd.png)

**1）@EnableCaching**，开启缓存功能。

**2）@Cacheable**，调用方法前，去缓存中找，找到就返回，找不到就执行方法，并将返回值放到缓存中。

**3）@CachePut**，方法调用前不会去缓存中找，无论如何都会执行方法，执行完将返回值放到缓存中。

**4）@CacheEvict**，清理缓存中的一个或多个记录。

Spring Cache 是 Spring 提供的一套完整的缓存解决方案，虽然它本身没有提供缓存的实现，但它提供的一整套接口、规范、配置、注解等，可以让我们无缝衔接 Redis、Ehcache 等缓存实现。

Spring Cache 的注解（前面提到的四个）会在调用方法之后，去缓存方法返回的最终结果；或者在方法调用之前拿缓存中的结果，当然还有删除缓存中的结果。

这些读写操作不用我们手动再去写代码实现了，直接交给 Spring Cache 来打理就 OK 了，是不是非常贴心？

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-afed274d-458d-4e6e-9fd0-b421ac811f47.png)

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
    @CachePut(value = "codingmore", key = "'codingmore:postag:'+#postAddTagParam.postTagId")
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
@CachePut(value = "codingmore", key = "'codingmore:postag:'+#postAddTagParam.postTagId")
```

- value：缓存名称，也就是缓存的命名空间，value 这里应该换成 namespace 更好一点；
- key：用于在命名空间中缓存的 key 值，可以使用 SpEL 表达式，比如说 `'codingmore:postag:'+#postAddTagParam.postTagId`；
- 还有两个属性 unless 和 condition 暂时没用到，分别表示条件符合则不缓存，条件符合则缓存。

**第五步**，启动服务器端，启动客户端，修改标签进行测试。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-6463fdda-6cc2-43f4-91e6-e0de9f0f1c0c.png)

通过 Red 客户端（一款 macOS 版的 Redis 桌面工具），可以看到刚刚更新的返回值已经添加到 Redis 中了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-468a253d-931a-4e5b-8f7e-36ecc1561dac.png)

## 使用 Redis 连接池

Redis 是基于内存的数据库，本来是为了提高程序性能的，但如果不使用 Redis 连接池的话，建立连接、断开连接就需要消耗大量的时间。

用了连接池，就可以实现在客户端建立多个连接，需要的时候从连接池拿，用完了再放回去，这样就节省了连接建立、断开的时间。

要使用连接池，我们得先了解 Redis 的客户端，常用的有两种：Jedis 和 Lettuce。

- Jedis：Spring Boot 1.5.x 版本时默认的 Redis 客户端，实现上是直接连接 Redis Server，如果在多线程环境下是非线程安全的，这时候要使用连接池为每个 jedis 实例增加物理连接；
- Lettuce：Spring Boot 2.x 版本后默认的 Redis 客户端，基于 Netty 实现，连接实例可以在多个线程间并发访问，一个连接实例不够的情况下也可以按需要增加连接实例。

它俩在 GitHub 上都挺受欢迎的，大家可以按需选用。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-c94651b5-1e53-42e5-ad5f-162b4bf509a7.png)

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

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-e4cd346c-07d0-4ee3-9832-4c7a2aa1b7b4.png)

如果在 application-dev.yml 文件中没有添加 Lettuce 连接池配置的话，是不会看到

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-7e86e208-bf5f-4dc2-a962-2b926adaa524.png)



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


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-01aa7dc6-b9f7-46bd-b8a4-0a24e44185bc.png)


当然了，也可以不配置 Jedis 客户端的连接池，走默认的连接池配置。因为 Jedis 客户端默认增加了连接池的依赖包，在 pom.xml 文件中点开 Jedis 客户端依赖可以查看到。 

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-c87d8e02-aace-4d86-8011-13e4087956e0.png)

## 自由操作 Redis

Spring Cache 虽然提供了操作 Redis 的便捷方法，比如我们前面演示的 @CachePut 注解，但注解提供的操作非常有限，比如说它只能保存返回值到缓存中，而返回值并不一定是我们想要保存的结果。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-f28a3b84-ed0b-4a78-a5e5-5803bae967be.png)

与其保存这个返回给客户端的 JSON 信息，我们更想保存的是更新后的标签。那该怎么自由地操作 Redis 呢？

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/redis-springboot-9b89af51-c2fd-4b2d-ba57-a59efa4cbffd.png)

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

----

更多内容，只针对《二哥的Java进阶之路》星球用户开放，需要的小伙伴可以[戳链接🔗](https://javabetter.cn/zhishixingqiu/)加入我们的星球，一起学习，一起卷。。**编程喵**🐱是一个 Spring Boot+Vue 的前后端分离项目，融合了市面上绝大多数流行的技术要点。通过学习实战项目，你可以将所学的知识通过实践进行检验、你可以拓宽自己的技术边界，你可以掌握一个真正的实战项目是如何从 0 到 1 的。

----



## 项目源码

> - 编程喵：[https://github.com/itwanger/coding-more](https://github.com/itwanger/coding-more)
> - 整合 Redis 专用：[https://github.com/itwanger/coding-more](https://github.com/itwanger/codingmore-learning/tree/main/codingmore-redis)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

