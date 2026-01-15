---
title: 快手面试官：设计一个评论系统？
shortTitle: 评论系统设计
author: 江南一点雨
description: 设计一个评论系统，从add，del，list维度思考，如何优化（redis，消息队列，索引，高并发，读写一致等），面试官拷问的比较深入，基本上提到的方案都会深入问到不会为止，从各种角度考虑优化方案
category:
  - 微信公众号
---

这是一道场景题，有些面试中会遇到，于是二哥就来给大家聊聊，文章主题思想来自二哥的好朋友松哥：[评论系统设计思路](https://mp.weixin.qq.com/s/5L609dIGwwBwwBsecth8-Q)

无论是阅读公众号文章还是刷短视频，现在都有评论功能，而且这些评论基本上都是支持“楼中楼”，也就是文章下面有评论，评论下面有回复，回复下面又有回复，回复还可以继续回复...

![](https://cdn.paicoding.com/stutymore/pinglxtsjsl-20241117112803.png)

如果数据量不大的话，这个表其实很好设计，一张表就可以搞定，类似省市县表结构：

![](http://cdn.paicoding.com/tobebetterjavaer/images/nice-article/weixin/pinglxtsjsl-abbc5067-2e03-40d5-8978-706b3751016c.jpg)

建表语句：

```
CREATE TABLE administrative_divisions ( 
   id INT AUTO_INCREMENT PRIMARY KEY, 
   name VARCHAR(100) NOT NULL, 
   parent_id INT DEFAULT NULL, 
   level TINYINT NOT NULL, 
   country_code VARCHAR(10), 
   created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
   updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
   INDEX idx_parent_id (parent_id), 
   INDEX idx_level (level) 
 );
```
 

对于这种结构的表，数据量不大的话没问题。[技术派](https://javabetter.cn/zhishixingqiu/paicoding.html)目前采用的就是这种表结构。

![](https://cdn.paicoding.com/stutymore/pinglxtsjsl-20241117114812.png)


数据量大的话，查询性能和维护都会成为问题。接下来，我们就来讨论下这种评论表如何设计会好一些。

## 一 表设计

无论是文章还是短视频，评论数动辄很大，所以系统在显示的时候，往往会先进行评论折叠，只显示一个总数，点击展开的时候，才会显示出来，以微信公众号为例，一般是这样：

首先在文章下方会先展示一个评论总数：

![](https://cdn.paicoding.com/stutymore/pinglxtsjsl-20241117112959.png)

点开评论区之后，这里也有两个值得关注的信息：

1.  评论区上方会显示总的评论数
2.  回复的评论不会一次性显示出来，但是会显示有多少条回复，需要用户点击之后才可以看到回复内容。

![](https://cdn.paicoding.com/stutymore/pinglxtsjsl-20241117113345.png)


> 需要注意的是，如果回复数量特别多的话，也不会一次性全部展示出来。

首这样的设计是合情合理的，相信大家应该没什么异议，评论回复之所以不一次性全部展示，一方面是性能考虑，另一方面也是用户体验考虑。有的评论回复特别多，一次性全部展示出来，会影响查看一级评论。

那么我们就看下这样的评论功能，表该如何设计。

为了满足这些要求，我们将设计三个表：`Articles`（文章表），`Comments`（评论索引表），和 `CommentsContent`（评论内容表）。文章表将记录文章的根评论数，评论索引表将记录评论的层级关系、回复数量和点赞数量，评论内容表将存储实际的评论内容。

这种设计方式通过将评论内容和评论索引分开存储，提高了查询性能，同时也便于数据维护，并且通过文章表记录文章的根评论数，方便快速统计。

### Articles（文章表）

字段名|数据类型|描述|
---|---|---|
article\_id|BIGINT AUTO\_INCREMENT|主键，自增|
title|VARCHAR(255)|文章标题|
root\_comment\_count|INT DEFAULT 0|文章的根评论数|
created\_at|DATETIME|创建时间|
updated\_at|DATETIME|更新时间|

### Comments（评论索引表）

字段名|数据类型|描述|
---|---|---|
comment\_id|BIGINT AUTO\_INCREMENT|主键，自增|
article\_id|BIGINT|文章ID|
parent\_id|BIGINT DEFAULT 0|父评论ID，用于实现多级评论，顶级评论此字段为0|
user\_id|BIGINT|发表评论的用户ID|
reply\_count|INT DEFAULT 0|这条评论的回复数量|
like\_count|INT DEFAULT 0|这条评论的点赞数量|
created\_at|DATETIME|创建时间|
updated\_at|DATETIME|更新时间|

### CommentsContent（评论内容表）

字段名|数据类型|描述|
---|---|---|
comment\_id|BIGINT|外键，关联评论索引表的comment\_id|
comment\_text|TEXT|评论内容|
comment\_time|DATETIME|评论时间|

### SQL 创建表的语句

```sql
-- 创建文章表 
 CREATE TABLE articles ( 
   article_id BIGINT AUTO_INCREMENT PRIMARY KEY, 
   title VARCHAR(255) NOT NULL, 
   root_comment_count INT DEFAULT 0, 
   created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
   updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
   INDEX idx_root_comment_count (root_comment_count) 
 ); 
  
 -- 创建评论索引表 
 CREATE TABLE comments ( 
   comment_id BIGINT AUTO_INCREMENT PRIMARY KEY, 
   article_id BIGINT NOT NULL, 
   parent_id BIGINT DEFAULT 0, 
   user_id BIGINT NOT NULL, 
   reply_count INT DEFAULT 0, 
   like_count INT DEFAULT 0, 
   created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
   updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
   INDEX idx_article_id (article_id), 
   INDEX idx_parent_id (parent_id) 
 ); 
  
 -- 创建评论内容表 
 CREATE TABLE comments_content ( 
   comment_id BIGINT PRIMARY KEY, 
   comment_text TEXT NOT NULL, 
   comment_time DATETIME DEFAULT CURRENT_TIMESTAMP, 
   FOREIGN KEY (comment_id) REFERENCES comments(comment_id) 
 );
```
 

### 触发器

触发器主要用于更新文章的根评论数和评论的回复数量及点赞数量，**不过这个并非必须，这个也可以通过业务逻辑去处理**，这里主要是给大家提供一个参考。

```sql
DELIMITER // 
 CREATE TRIGGER after_comment_insert 
 AFTER INSERT ON comments 
 FOR EACH ROW 
 BEGIN 
   IF NEW.parent_id = 0 THEN 
     UPDATE articles SET root_comment_count = root_comment_count + 1 WHERE article_id = NEW.article_id; 
   END IF; 
 END; // 
 DELIMITER ; 
  
 CREATE TRIGGER after_comment_like_insert 
 AFTER INSERT ON comments 
 FOR EACH ROW 
 BEGIN 
   UPDATE comments SET like_count = like_count + 1 WHERE comment_id = NEW.comment_id; 
 END; // 
 DELIMITER ; 
  
 CREATE TRIGGER after_comment_reply_insert 
 AFTER INSERT ON comments 
 FOR EACH ROW 
 BEGIN 
   UPDATE comments SET reply_count = reply_count + 1 WHERE comment_id = NEW.parent_id; 
 END; // 
 DELIMITER ; 
  
 CREATE TRIGGER after_comment_delete 
 BEFORE DELETE ON comments 
 FOR EACH ROW 
 BEGIN 
   IF OLD.parent_id = 0 THEN 
     UPDATE articles SET root_comment_count = root_comment_count - 1 WHERE article_id = OLD.article_id; 
   ELSE 
     UPDATE comments SET reply_count = reply_count - 1 WHERE comment_id = OLD.parent_id; 
   END IF; 
 END; // 
 DELIMITER ;
```
 

在 `Comments` 表的 `article_id` 和 `parent_id` 字段上创建索引，可以提高查询特定文章的评论及其子评论的性能。

根据上面的设计，当我们想要获取评论总数、回复总数的时候，直接查询就可以了，就不需要统计了，非常方便。

## 二 添加评论

为了应对高并发，添加评论这块我们可以结合 MQ 去完成。

1.  首先前端发送评论到服务端。
2.  服务端收到评论消息之后，将之发给 MQ 去处理。
3.  消费者从 MQ 上消费消息，向数据添加评论。
4.  添加完成后，将添加成功的消息发送给客户端。

![](https://cdn.paicoding.com/stutymore/pinglxtsjsl-20241117115150.png)

> 以上步骤需要确保 MQ 消息可靠性，具体如何确保可靠性，松哥在之前的文章中和大家聊过（[四种策略确保 RabbitMQ 消息发送可靠性](https://mp.weixin.qq.com/s/hj8iqASSOk2AgdtkuLPCCQ)）。

另外还有一点就是如果需要对评论内容进行分析，那么在第 4 步完成之后，还是通过消费 MQ 消息将评论存入 ES；或者通过 Canal 之类的工具，将表中的数据同步到 ES。

[技术派](https://javabetter.cn/zhishixingqiu/paicoding.html)添加评论的代码在这里。

![](https://cdn.paicoding.com/stutymore/pinglxtsjsl-20241117120823.png)

发布评论的通知在这里：

![](https://cdn.paicoding.com/stutymore/pinglxtsjsl-20241117120953.png)

## 三 查询评论

热门评论可以存入缓存中，避免每次查询数据库。

```java
public class CommentService {
    private static final String COMMENT_CACHE_KEY = "comment:article:";

    @Autowired
    private RedisTemplate<String, List<Comment>> redisTemplate;

    @Autowired
    private CommentRepository commentRepository;

    public List<Comment> getCommentsByArticleId(Long articleId) {
        String cacheKey = COMMENT_CACHE_KEY + articleId;

        // 从 Redis 缓存查询
        List<Comment> cachedComments = redisTemplate.opsForValue().get(cacheKey);

        if (cachedComments != null) {
            return cachedComments;
        }

        // 如果缓存没有数据，从数据库查询
        List<Comment> comments = commentRepository.findByArticleId(articleId);

        // 将查询结果存入缓存，设置过期时间
        redisTemplate.opsForValue().set(cacheKey, comments, Duration.ofHours(1));

        return comments;
    }
}
```

另一方面就是读写分离。评论数据是非常典型的读多写少场景，因此我们可以从数据库层面进行读写分离，以提升性能。

配置主从数据源：

```yaml
spring:
  datasource:
    master:
      url: jdbc:mysql://localhost:3306/master_db
      username: root
      password: root
    slave:
      url: jdbc:mysql://localhost:3306/slave_db
      username: root
      password: root
```

动态数据源路由：

```java
@Component
@Primary
public class DynamicDataSource extends AbstractRoutingDataSource {
    private static final ThreadLocal<String> CONTEXT_HOLDER = new ThreadLocal<>();

    public static void setDataSource(String dataSource) {
        CONTEXT_HOLDER.set(dataSource);
    }

    public static void clearDataSource() {
        CONTEXT_HOLDER.remove();
    }

    @Override
    protected Object determineCurrentLookupKey() {
        return CONTEXT_HOLDER.get();
    }
}
```

AOP 实现动态数据源切换：

```java
@Aspect
@Component
public class DataSourceAspect {

    @Before("@annotation(com.example.annotation.ReadOnly)")
    public void useSlaveDataSource() {
        DynamicDataSource.setDataSource("slave");
    }

    @Before("@annotation(com.example.annotation.WriteOnly)")
    public void useMasterDataSource() {
        DynamicDataSource.setDataSource("master");
    }

    @After("@annotation(com.example.annotation.ReadOnly) || @annotation(com.example.annotation.WriteOnly)")
    public void clearDataSource() {
        DynamicDataSource.clearDataSource();
    }
}
```

注解标识操作：

```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface ReadOnly {}

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface WriteOnly {}
```

准备写入操作：

```java
@Service
public class CommentService {

    @ReadOnly
    public List<Comment> getComments(Long articleId) {
        // 从从库读取评论
        return commentRepository.findByArticleId(articleId);
    }

    @WriteOnly
    public void addComment(Comment comment) {
        // 写入主库
        commentRepository.save(comment);
    }
}
```

好啦，整体的思路大致上就是这样，如果有不同看法，欢迎球友们留言讨论。

* * *



>参考链接：[https://mp.weixin.qq.com/s/5L609dIGwwBwwBsecth8-Q](https://mp.weixin.qq.com/s/5L609dIGwwBwwBsecth8-Q)，整理：沉默王二
