---
title: 虾皮二面：如何保证接口的幂等性？
shortTitle: 虾皮二面：如何保证接口的幂等性？
category:
  - 微信公众号
---

>[二哥的编程星球](https://mp.weixin.qq.com/s/3RVsFZ17F0JzoHCLKbQgGw)已经有 **560 多名** 小伙伴加入了，如果你也需要一个良好的学习氛围，[戳链接](https://mp.weixin.qq.com/s/3RVsFZ17F0JzoHCLKbQgGw)加入我们吧！这是一个 Java 学习指南 + 编程实战的私密圈子，你可以向二哥提问、帮你制定学习计划、跟着二哥一起做项目、刷力扣，冲冲冲。

分享一道群友面试虾皮遇到的面试题。

下面是正文。

幂等性的问题不仅是在面试中经常问，在实际项目中也是不得不考虑的一个问题，我以前项目中就出现过因为没有保证幂等性而导致消息重复消费的问题，所以本文就来讲一讲在实际项目中该如何去保证接口的幂等性，并且提供了4种方案可供选择。

## 幂等性的介绍

#### 1、什么是接口幂等性

接口幂等性就是用户对于同一操作发起的一次请求或者多次请求的结果是一致的，不会因为多次点击而产生了副作用。

举个最简单的例子，那就是支付，用户购买商品后支付，支付扣款成功，但是返回结果的时候网络异常，此时钱已经扣了，用户再次点击按钮，此时会进行第二次扣款，返回结果成功，用户查询余额返发现多扣钱了，流水记录也变成了两条，这就没有保证接口的幂等性。

#### 2、为什么需要实现幂等性

在接口调用时一般情况下都能正常返回信息不会重复提交，不过在遇见以下情况时可以就会出现问题，如：

*   前端重复提交表单：在填写一些表格时候，用户填写完成提交，很多时候会因网络波动没有及时对用户做出提交成功响应，致使用户认为没有成功提交，然后一直点提交按钮，这时就会发生重复提交表单请求。
*   用户恶意进行刷单：例如在实现用户投票这种功能时，如果用户针对一个用户进行重复提交投票，这样会导致接口接收到用户重复提交的投票信息，这样会使投票结果与事实严重不符。
*   接口超时重复提交：很多时候 HTTP 客户端工具都默认开启超时重试的机制，尤其是第三方调用接口时候，为了防止网络波动超时等造成的请求失败，都会添加重试机制，导致一个请求提交多次。
*   消息进行重复消费：当使用 MQ 消息中间件时候，如果发生消息中间件出现错误未及时提交消费信息，导致发生重复消费。

使用幂等性最大的优势在于使接口保证任何幂等性操作，免去因重试等造成系统产生的未知的问题。

#### 3、哪些操作需要保证接口的幂等性

在增删改查4个操作中，尤为注意就是增加或者修改

##### 新增操作

增加在重复提交的场景下会出现幂等性问题,如以上的支付问题

##### 删除操作

删除一次和多次删除都是把数据删除。(注意可能返回结果不一样，删除的数据不存在，返回0，删除的数据多条，返回结果多个,在不考虑返回结果的情况下,删除操作也是具有幂等性的)

##### 更新操作

修改在大多场景下结果一样,但是如果是增量修改是需要保证幂等性的,如下例子: 把表中id为XXX的记录的A字段值设置为1,这种操作不管执行多少次都是幂等的 把表中id为XXX的记录的A字段值增加1,这种操作就不是幂等的

##### 查询操作

查询对于结果是不会有改变的，查询一次和查询多次，在数据不变的情况下，查询结果是一样的。select是天然的幂等操作

#### 4、引入幂等性后对系统的影响

幂等性是为了简化客户端逻辑处理，能放置重复提交等操作，但却增加了服务端的逻辑复杂性和成本，其主要是：

*   把并行执行的功能改为串行执行，降低了执行效率。
*   增加了额外控制幂等的业务逻辑，复杂化了业务功能；

所以在使用时候需要考虑是否引入幂等性的必要性，根据实际业务场景具体分析，除了业务上的特殊要求外，一般情况下不需要引入的接口幂等性。

## 实现幂等性的常见方案

#### 方案一：数据库唯一主键

##### 方案描述

数据库唯一主键的实现主要是利用数据库中主键唯一约束的特性，一般来说唯一主键比较适用于“插入”时的幂等性，其能保证一张表中只能存在一条带该唯一主键的记录。

使用数据库唯一主键完成幂等性时需要注意的是，该主键一般来说并不是使用数据库中自增主键，而是使用分布式 ID 充当主键，这样才能能保证在分布式环境下 ID 的全局唯一性。

##### 适用操作：

*   插入操作
*   删除操作

##### 使用限制：

*   需要生成全局唯一主键 ID；

##### 主要流程：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-xiapemrhbzjkdmdx-057bba0a-027b-4bed-a757-475f5f62ddb6.jpg)

*   ① 客户端执行创建请求，调用服务端接口。
*   ② 服务端执行业务逻辑，生成一个分布式 ID，将该 ID 充当待插入数据的主键，然后执数据插入操作，运行对应的 SQL 语句。
*   ③ 服务端将该条数据插入数据库中，如果插入成功则表示没有重复调用接口。如果抛出主键重复异常，则表示数据库中已经存在该条记录，返回错误信息到客户端。

#### 方案二：数据库乐观锁

##### 方案描述：

数据库乐观锁方案一般只能适用于执行“更新操作”的过程，我们可以提前在对应的数据表中多添加一个字段，充当当前数据的版本标识。这样每次对该数据库该表的这条数据执行更新时，都会将该版本标识作为一个条件，值为上次待更新数据中的版本标识的值。

##### 适用操作：

*   更新操作

##### 使用限制：

*   需要数据库对应业务表中添加额外字段；

##### 描述示例：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-xiapemrhbzjkdmdx-03eb841e-5992-4005-bbee-a802c1933b41.jpg)

例如，存在如下的数据表中：

id|name|price|
---|---|---|
1|小米手机|1000|
2|苹果手机|2500|
3|华为手机|1600|

为了每次执行更新时防止重复更新，确定更新的一定是要更新的内容，我们通常都会添加一个 version 字段记录当前的记录版本，这样在更新时候将该值带上，那么只要执行更新操作就能确定一定更新的是某个对应版本下的信息。

id|name|price|version|
---|---|---|---|
1|小米手机|1000|10|
2|苹果手机|2500|21|
3|华为手机|1600|5|

这样每次执行更新时候，都要指定要更新的版本号，如下操作就能准确更新 version=5 的信息：

```
UPDATE my_table SET price = price+50 ,version = version + 1 WHERE id = 1 AND version = 5

```

上面 WHERE 后面跟着条件 id=1 AND version=5 被执行后，id=1 的 version 被更新为 6，所以如果重复执行该条 SQL 语句将不生效，因为 id=1 AND version=5 的数据已经不存在，这样就能保住更新的幂等，多次更新对结果不会产生影响。

#### 方案三：防重 Token 令牌

##### 方案描述：

针对客户端连续点击或者调用方的超时重试等情况，例如提交订单，此种操作就可以用 Token 的机制实现防止重复提交。简单的说就是调用方在调用接口的时候先向后端请求一个全局 ID（Token），请求的时候携带这个全局 ID 一起请求（Token 最好将其放到 Headers 中），后端需要对这个 Token 作为 Key，用户信息作为 Value 到 Redis 中进行键值内容校验，如果 Key 存在且 Value 匹配就执行删除命令，然后正常执行后面的业务逻辑。如果不存在对应的 Key 或 Value 不匹配就返回重复执行的错误信息，这样来保证幂等操作。

##### 适用操作：

*   插入操作
*   更新操作
*   删除操作

##### 使用限制：

*   需要生成全局唯一 Token 串；
*   需要使用第三方组件 Redis 进行数据效验；

##### 主要流程：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-xiapemrhbzjkdmdx-d7479bd6-1830-41df-9331-8373cfcce533.jpg)

*   ① 服务端提供获取 Token 的接口，该 Token 可以是一个序列号，也可以是一个分布式 ID 或者 UUID 串。
*   ② 客户端调用接口获取 Token，这时候服务端会生成一个 Token 串。
*   ③ 然后将该串存入 Redis 数据库中，以该 Token 作为 Redis 的键（注意设置过期时间）。
*   ④ 将 Token 返回到客户端，客户端拿到后应存到表单隐藏域中。
*   ⑤ 客户端在执行提交表单时，把 Token 存入到 Headers 中，执行业务请求带上该 Headers。
*   ⑥ 服务端接收到请求后从 Headers 中拿到 Token，然后根据 Token 到 Redis 中查找该 key 是否存在。
*   ⑦ 服务端根据 Redis 中是否存该 key 进行判断，如果存在就将该 key 删除，然后正常执行业务逻辑。如果不存在就抛异常，返回重复提交的错误信息。

> ###### 注意，在并发情况下，执行 Redis 查找数据与删除需要保证原子性，否则很可能在并发下无法保证幂等性。其实现方法可以使用分布式锁或者使用 Lua 表达式来注销查询与删除操作。

#### 方案四、下游传递唯一序列号

##### 方案描述：

所谓请求序列号，其实就是每次向服务端请求时候附带一个短时间内唯一不重复的序列号，该序列号可以是一个有序 ID，也可以是一个订单号，一般由下游生成，在调用上游服务端接口时附加该序列号和用于认证的 ID。

当上游服务器收到请求信息后拿取该 序列号 和下游 认证ID 进行组合，形成用于操作 Redis 的 Key，然后到 Redis 中查询是否存在对应的 Key 的键值对，根据其结果

*   如果存在，就说明已经对该下游的该序列号的请求进行了业务处理，这时可以直接响应重复请求的错误信息。
*   如果不存在，就以该 Key 作为 Redis 的键，以下游关键信息作为存储的值（例如下游商传递的一些业务逻辑信息），将该键值对存储到 Redis 中 ，然后再正常执行对应的业务逻辑即可。

##### 适用操作：

*   插入操作
*   更新操作
*   删除操作

##### 使用限制：

*   要求第三方传递唯一序列号；
*   需要使用第三方组件 Redis 进行数据效验；

##### 主要流程：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-xiapemrhbzjkdmdx-bda279ca-262b-484d-9451-da0b31c273bc.jpg)

*   ① 下游服务生成分布式 ID 作为序列号，然后执行请求调用上游接口，并附带“唯一序列号”与请求的“认证凭据ID”。
*   ② 上游服务进行安全效验，检测下游传递的参数中是否存在“序列号”和“凭据ID”。
*   ③ 上游服务到 Redis 中检测是否存在对应的“序列号”与“认证ID”组成的 Key，如果存在就抛出重复执行的异常信息，然后响应下游对应的错误信息。如果不存在就以该“序列号”和“认证ID”组合作为 Key，以下游关键信息作为 Value，进而存储到 Redis 中，然后正常执行接来来的业务逻辑。

> ###### 上面步骤中插入数据到 Redis 一定要设置过期时间。这样能保证在这个时间范围内，如果重复调用接口，则能够进行判断识别。如果不设置过期时间，很可能导致数据无限量的存入 Redis，致使 Redis 不能正常工作。

## 接口幂等代码示例

这里使用防重 Token 令牌方案，该方案能保证在不同请求动作下的幂等性，实现逻辑可以看上面写的"防重 Token 令牌"方案，接下来写下实现这个逻辑的代码。

#### 1、引入依赖

这里使用 Maven 工具管理依赖，这里在 pom.xml 中引入 SpringBoot、Redis、lombok 相关依赖。

```
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"

         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">

    <modelVersion>4.0.0</modelVersion>



    <parent>

        <groupId>org.springframework.boot</groupId>

        <artifactId>spring-boot-starter-parent</artifactId>

        <version>2.3.4.RELEASE</version>

    </parent>



    <groupId>mydlq.club</groupId>

    <artifactId>springboot-idempotent-token</artifactId>

    <version>0.0.1</version>

    <name>springboot-idempotent-token</name>

    <description>Idempotent Demo</description>



    <properties>

        <java.version>1.8</java.version>

    </properties>



    <dependencies>

        <!--springboot web-->

        <dependency>

            <groupId>org.springframework.boot</groupId>

            <artifactId>spring-boot-starter-web</artifactId>

        </dependency>

        <!--springboot data redis-->

        <dependency>

            <groupId>org.springframework.boot</groupId>

            <artifactId>spring-boot-starter-data-redis</artifactId>

        </dependency>

        <dependency>

            <groupId>org.apache.commons</groupId>

            <artifactId>commons-pool2</artifactId>

        </dependency>

        <!--lombok-->

        <dependency>

            <groupId>org.projectlombok</groupId>

            <artifactId>lombok</artifactId>

        </dependency>

    </dependencies>



    <build>

        <plugins>

            <plugin>

                <groupId>org.springframework.boot</groupId>

                <artifactId>spring-boot-maven-plugin</artifactId>

            </plugin>

        </plugins>

    </build>



</project>

```

#### 2、Redis的配置

在 application 配置文件中配置连接 Redis 的参数，如下：

```
spring:

  redis:

    ssl: false

    host: 127.0.0.1

    port: 6379

    database: 0

    timeout: 1000

    password:

    lettuce:

      pool:

        max-active: 100

        max-wait: -1

        min-idle: 0

        max-idle: 20

```

#### 3、创建与验证 Token 工具类

创建用于操作 Token 相关的 Service 类，里面存在 Token 创建与验证方法，其中：

*   **Token 创建方法：** 使用 UUID 工具创建 Token 串，设置以 "idempotent\_token:"+"Token串" 作为 Key，以用户信息当成 Value，将信息存入 Redis 中。
*   **Token 验证方法：** 接收 Token 串参数，加上 Key 前缀形成 Key，再传入 value 值，执行 Lua 表达式（Lua 表达式能保证命令执行的原子性）进行查找对应 Key 与删除操作。执行完成后验证命令的返回结果，如果结果不为空且非0，则验证成功，否则失败。

```
@Slf4j

@Service

public class TokenUtilService {



    @Autowired

    private StringRedisTemplate redisTemplate;



    /**

     * 存入 Redis 的 Token 键的前缀

     */

    private static final String IDEMPOTENT_TOKEN_PREFIX = "idempotent_token:";



    /**

     * 创建 Token 存入 Redis，并返回该 Token

     *

     * @param value 用于辅助验证的 value 值

     * @return 生成的 Token 串

     */

    public String generateToken(String value) {

        // 实例化生成 ID 工具对象

        String token = UUID.randomUUID().toString();

        // 设置存入 Redis 的 Key

        String key = IDEMPOTENT_TOKEN_PREFIX + token;

        // 存储 Token 到 Redis，且设置过期时间为5分钟

        redisTemplate.opsForValue().set(key, value, 5, TimeUnit.MINUTES);

        // 返回 Token

        return token;

    }



    /**

     * 验证 Token 正确性

     *

     * @param token token 字符串

     * @param value value 存储在Redis中的辅助验证信息

     * @return 验证结果

     */

    public boolean validToken(String token, String value) {

        // 设置 Lua 脚本，其中 KEYS[1] 是 key，KEYS[2] 是 value

        String script = "if redis.call('get', KEYS[1]) == KEYS[2] then return redis.call('del', KEYS[1]) else return 0 end";

        RedisScript<Long> redisScript = new DefaultRedisScript<>(script, Long.class);

        // 根据 Key 前缀拼接 Key

        String key = IDEMPOTENT_TOKEN_PREFIX + token;

        // 执行 Lua 脚本

        Long result = redisTemplate.execute(redisScript, Arrays.asList(key, value));

        // 根据返回结果判断是否成功成功匹配并删除 Redis 键值对，若果结果不为空和0，则验证通过

        if (result != null && result != 0L) {

            log.info("验证 token={},key={},value={} 成功", token, key, value);

            return true;

        }

        log.info("验证 token={},key={},value={} 失败", token, key, value);

        return false;

    }



}

```

#### 4、创建测试的 Controller 类

创建用于测试的 Controller 类，里面有获取 Token 与测试接口幂等性的接口，内容如下：

```
@Slf4j

@RestController

public class TokenController {



    @Autowired

    private TokenUtilService tokenService;



    /**

     * 获取 Token 接口

     *

     * @return Token 串

     */

    @GetMapping("/token")

    public String getToken() {

        // 获取用户信息（这里使用模拟数据）

        // 注：这里存储该内容只是举例，其作用为辅助验证，使其验证逻辑更安全，如这里存储用户信息，其目的为:

        // - 1)、使用"token"验证 Redis 中是否存在对应的 Key

        // - 2)、使用"用户信息"验证 Redis 的 Value 是否匹配。

        String userInfo = "mydlq";

        // 获取 Token 字符串，并返回

        return tokenService.generateToken(userInfo);

    }



    /**

     * 接口幂等性测试接口

     *

     * @param token 幂等 Token 串

     * @return 执行结果

     */

    @PostMapping("/test")

    public String test(@RequestHeader(value = "token") String token) {

        // 获取用户信息（这里使用模拟数据）

        String userInfo = "mydlq";

        // 根据 Token 和与用户相关的信息到 Redis 验证是否存在对应的信息

        boolean result = tokenService.validToken(token, userInfo);

        // 根据验证结果响应不同信息

        return result ? "正常调用" : "重复调用";

    }



}

```

#### 5、创建 SpringBoot 启动引导类

```
@SpringBootApplication

public class Application {



    public static void main(String[] args) {

        SpringApplication.run(Application.class, args);

    }



}

```

#### 6、写测试类进行测试

写个测试类进行测试，多次访问同一个接口，测试是否只有第一次能否执行成功。

```
@Slf4j

@SpringBootTest

@RunWith(SpringRunner.class)

public class IdempotenceTest {



    @Autowired

    private WebApplicationContext webApplicationContext;



    @Test

    public void interfaceIdempotenceTest() throws Exception {

        // 初始化 MockMvc

        MockMvc mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();

        // 调用获取 Token 接口

        String token = mockMvc.perform(MockMvcRequestBuilders.get("/token")

                .accept(MediaType.TEXT_HTML))

                .andReturn()

                .getResponse().getContentAsString();

        log.info("获取的 Token 串：{}", token);

        // 循环调用 5 次进行测试

        for (int i = 1; i <= 5; i++) {

            log.info("第{}次调用测试接口", i);

            // 调用验证接口并打印结果

            String result = mockMvc.perform(MockMvcRequestBuilders.post("/test")

                    .header("token", token)

                    .accept(MediaType.TEXT_HTML))

                    .andReturn().getResponse().getContentAsString();

            log.info(result);

            // 结果断言

            if (i == 0) {

                Assert.assertEquals(result, "正常调用");

            } else {

                Assert.assertEquals(result, "重复调用");

            }

        }

    }



}

```

**测试结果如下：**

```
[main] IdempotenceTest:  获取的 Token 串：980ea707-ce2e-456e-a059-0a03332110b4

[main] IdempotenceTest:  第1次调用测试接口

[main] IdempotenceTest:  正常调用

[main] IdempotenceTest:  第2次调用测试接口

[main] IdempotenceTest:  重复调用

[main] IdempotenceTest:  第3次调用测试接口

[main] IdempotenceTest:  重复调用

[main] IdempotenceTest:  第4次调用测试接口

[main] IdempotenceTest:  重复调用

[main] IdempotenceTest:  第5次调用测试接口

[main] IdempotenceTest:  重复调用

```

## 总结

幂等性是开发当中很常见也很重要的一个需求，尤其是支付、订单等与金钱挂钩的服务，保证接口幂等性尤其重要。在实际开发中，我们需要针对不同的业务场景我们需要灵活的选择幂等性的实现方式：

*   对于下单等存在唯一主键的，可以使用“唯一主键方案”的方式实现。对于更新订单状态等相关的更新场景操作，使用“乐观锁方案”实现更为简单。
*   对于上下游这种，下游请求上游，上游服务可以使用“下游传递唯一序列号方案”更为合理。
*   类似于前端重复提交、重复下单、没有唯一ID号的场景，可以通过 Token 与 Redis 配合的“防重 Token 方案”实现更为快捷。

上面只是给与一些建议，再次强调一下，实现幂等性需要先理解自身业务需求，根据业务逻辑来实现这样才合理，处理好其中的每一个结点细节，完善整体的业务流程设计，才能更好的保证系统的正常运行。最后做一个简单总结，然后本博文到此结束，如下：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-xiapemrhbzjkdmdx-8ae66a95-6a7a-4f32-9e01-8fa08b48626c.jpg)

* * *

没有什么使我停留——除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟。

**推荐阅读**：

- [新一代开源免费的终端工具，太酷了](https://mp.weixin.qq.com/s/2IUe50xBhuEWKDzARVd51A)
- [最大成就，拿到一等奖学金](https://mp.weixin.qq.com/s/3lqp4x1B5LI1hNjWAi6v1g)
- [银行开发太安逸，奋发图强要跳槽](https://mp.weixin.qq.com/s/ZeA-mEyMkEeSHRtd8Pob9A)
- [这个大专生，强的离谱！](https://mp.weixin.qq.com/s/fNMhpER0tp5RO5TGcgALMQ)
- [一怒之下，退伍转码](https://mp.weixin.qq.com/s/IEEkWiI9iN4MEhoHvrTgcg)
- [没必要为实习碰的头破血流](https://mp.weixin.qq.com/s/KxUMq2YmlIBMbAeRwUm8JA)
- [网站挣了 200 美刀后的感触](https://mp.weixin.qq.com/s/PxgZkuA_SnAgG7xfwlKLgw)
- [在 IDEA 里下五子棋不过分吧？](https://mp.weixin.qq.com/s/R13FkPipfEMKjqNaCL3UoA)



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-quanxxtjgzysjyyds-33afdc45-d78b-46e0-91c2-1107161496e9.jpg)

>转载链接：[https://mp.weixin.qq.com/s/tL0fnUR3BNBjP8Qw2pldVg](https://mp.weixin.qq.com/s/tL0fnUR3BNBjP8Qw2pldVg)，出处：JavaGuide，整理：沉默王二
