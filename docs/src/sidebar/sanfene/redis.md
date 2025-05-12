---
title: Redis面试题，57道Redis八股文（1.9万字97张手绘图），面渣逆袭必看👍
shortTitle: 面渣逆袭-Redis
description: 下载次数超 1 万次，3.4 万字 97 张手绘图，详解 57 道 Redis 面试高频题（让天下没有难背的八股），面渣背会这些 Redis 八股文，这次吊打面试官，我觉得稳了（手动 dog）。
author: 三分恶
date: 2024-10-31
category:
  - 面渣逆袭
tag:
  - 面渣逆袭
head:
  - - meta
    - name: keywords
      content: Redis面试题,Redis,八股文,面试题
---

![面渣逆袭MySQL篇封面图](https://cdn.tobebetterjavaer.com/stutymore/mysql-mianzhanixi-mysql.jpg)

## 前言

3.4 万字 97 张手绘图，详解 57 道 Redis 面试高频题（让天下没有难背的八股），面渣背会这些 Redis 八股文，这次吊打面试官，我觉得稳了（手动 dog）。整理：沉默王二，戳[转载链接](https://mp.weixin.qq.com/s/19u34NXALB1nOlBCE6Eg-Q)，作者：三分恶，戳[原文链接](https://mp.weixin.qq.com/s/iJtNJYgirRugNBnzxkbB4Q)。

亮白版本更适合拿出来打印，这也是很多学生党喜欢的方式，打印出来背诵的效率会更高。

![面渣逆袭MySQL篇.pdf第二版](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250427104843.png)

2025 年 04 月 27 日开始着手第二版更新。

- 对于高频题，会标注在《[Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)》中出现的位置，哪家公司，原题是什么，并且会加🌟，目录一目了然；如果你想节省时间的话，可以优先背诵这些题目，尽快做到知彼知己，百战不殆。
- 区分八股精华回答版本和原理底层解释，让大家知其然知其所以然，同时又能做到面试时的高效回答。
- 结合项目（[技术派](https://javabetter.cn/zhishixingqiu/paicoding.html)、[pmhub](https://javabetter.cn/zhishixingqiu/pmhub.html)）来组织语言，让面试官最大程度感受到你的诚意，而不是机械化的背诵。
- 修复第一版中出现的问题，包括球友们的私信反馈，网站留言区的评论，以及 [GitHub 仓库](https://github.com/itwanger/toBeBetterJavaer/issues)中的 issue，让这份面试指南更加完善。
- 增加[二哥编程星球](https://javabetter.cn/zhishixingqiu/)的球友们拿到的一些 offer，对面渣逆袭的感谢，以及对简历修改的一些认可，以此来激励大家，给大家更多信心。
- 优化排版，增加手绘图，重新组织答案，使其更加口语化，从而更贴近面试官的预期。

![面渣逆袭已经提交 1457 次 GitHub 记录](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250427100320.png)

由于 PDF 没办法自我更新，所以需要最新版的小伙伴，可以微信搜【**沉默王二**】，或者扫描/长按识别下面的二维码，关注二哥的公众号，回复【**222**】即可拉取最新版本。

<div style="text-align: center; margin: 20px 0;">
    <img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png" alt="微信扫码或者长按识别，或者微信搜索“沉默王二”" style="max-width: 100%; height: auto;  border-radius: 10px;" />
</div>

百度网盘、阿里云盘、夸克网盘都可以下载到最新版本，我会第一时间更新上去。

![回复 222](https://cdn.tobebetterjavaer.com/stutymore/javase-20241230171125.png)

当然了，请允许我的一点点私心，那就是星球的 PDF 版本会比公众号早一个月时间，毕竟星球用户都付费过了，我有必要让他们先享受到一点点福利。相信大家也都能理解，毕竟在线版是免费的，CDN、服务器、域名、OSS 等等都是需要成本的。

更别说我付出的时间和精力了。

展示一下暗黑版本的 PDF 吧，排版清晰，字体优雅，更加适合夜服，晚上看会更舒服一点。

![面渣逆袭MySQL篇.pdf暗黑版](https://cdn.tobebetterjavaer.com/stutymore/mysql-20250427105032.png)


## 基础

### 🌟1.说说什么是 Redis?

[Redis](https://javabetter.cn/redis/rumen.html) 是一种基于键值对的 NoSQL 数据库。

![二哥的Java进阶之路：macOS 启动 Redis](https://cdn.tobebetterjavaer.com/stutymore/redis-20250427143333.png)

它主要的特点是把数据放在内存当中，相比直接访问磁盘的关系型数据库，读写速度会快很多，基本上能达到微秒级的响应。

![每秒请求数能达到10 万级](https://cdn.tobebetterjavaer.com/stutymore/redis-20250427143852.png)

所以在一些对性能要求很高的场景，比如缓存热点数据、防止接口爆刷，都会用到 Redis。

不仅如此，Redis 还支持持久化，可以将内存中的数据异步落盘，以便服务宕机重启后能恢复数据。

#### Redis 和 MySQL 的区别？

Redis 属于非关系型数据库，数据是通过键值对的形式放在内存当中的；MySQL 属于关系型数据库，数据以行和列的形式存储在磁盘当中。

![二哥的 Java 进阶之路：Redis 作为 MySQL 的缓存](https://cdn.tobebetterjavaer.com/stutymore/redis-20250427152053.png)

实际开发中，会将 MySQL 作为主存储，Redis 作为缓存，通过先查 Redis，未命中再查 MySQL 并写回Redis 的方式来提高系统的整体性能。

#### 项目里哪里用到了 Redis？

在[技术派实战项目](https://javabetter.cn/zhishixingqiu/paicoding.html)当中，有很多地方都用到了 Redis，比如说用户活跃排行榜用到了 zset，作者白名单用到了 set。

![技术派专栏：用户活越排行榜](https://cdn.tobebetterjavaer.com/stutymore/redis-20240420093229.png)

还有用户登录后的 Session、站点地图 SiteMap，分别用到了 Redis 的字符串和哈希表两种数据类型。

![技术派专栏：Redis 的使用示例](https://cdn.tobebetterjavaer.com/stutymore/redis-20250427152536.png)

其中比较有挑战性的一个应用是，通过 Lua 脚本封装 Redis 的 setnex 命令来实现分布式锁，以保证在高并发场景下，热点文章在短时间内的高频访问不会击穿 MySQL。

![技术派专栏：Redis 分布式锁的应用](https://cdn.tobebetterjavaer.com/stutymore/redis-20250427152627.png)

#### 部署过 Redis 吗？

第一种回答版本：

我只在本地部署过单机版，下载 Redis 的安装包，解压后运行 `redis-server` 命令即可。

第二种回答版本：

我有在生产环境中部署单机版 Redis，从官网下载源码包解压后执行 `make && make install` 编译安装。然后编辑 `redis.conf` 文件，开启远程访问、设置密码、限制内存、设置内存过期淘汰策略、开启 AOF 持久化等：

```
bind 0.0.0.0        # 允许远程访问
requirepass your_password  # 设置密码
maxmemory 4gb      # 限制内存，避免 OOM
maxmemory-policy allkeys-lru  # 内存淘汰策略
appendonly yes     # 开启 AOF 持久化
```

第三种回答版本：

我有使用 Docker 拉取 Redis 镜像后进行容器化部署。

```shell
docker run -d --name redis -p 6379:6379 redis:7.0-alpine
```

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的华为一面原题：说下 Redis 和 HashMap 的区别
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动商业化一面的原题：Redis 和 MySQL 的区别
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的农业银行面经同学 7 Java 后端面试原题：Redis 相关的基础知识
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的华为 OD 面经同学 1 一面面试原题：Redis 的了解, 部署方案?
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的农业银行面经同学 3 Java 后端面试原题：项目里哪里用到了 Redis
> 6. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的 360 面经同学 3 Java 后端技术一面面试原题：用过 redis 吗 用来干什么
> 7. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的招商银行面经同学 6 招银网络科技面试原题：了解 MySQL、Redis 吗？
> 8. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的百度面经同学 1 文心一言 25 实习 Java 后端面试原题：项目中什么地方使用了 redis 缓存，redis 为什么快？
> 9. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的国企零碎面经同学 9 面试原题：数据库用什么多（说了 Mysql 和 Redis）
> 10. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的荣耀面经同学 4 面试原题：Redis和MySQL的区别？
> 11. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的海康威视同学 4面试原题：Redis部署


### 2.Redis 可以用来干什么？

Redis 可以用来做缓存，比如说把高频访问的文章详情、商品信息、用户信息放入 Redis 当中，并通过设置过期时间来保证数据一致性，这样就可以减轻数据库的访问压力。

![三分恶面渣逆袭：Redis缓存](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-d44c2397-5994-452f-8b7b-eb85d2b87685.png)

Redis 的 Zset 还可以用来实现积分榜、热搜榜，通过 score 字段进行排序，然后取前 N 个元素，就能实现 TOPN 的榜单功能。

![技术派：阅读活跃榜](https://cdn.tobebetterjavaer.com/stutymore/redis-20240420100012.png)

利用 Redis 的 SETNX 命令或者 Redisson 还可以实现分布式锁，确保同一时间只有一个节点可以持有锁；为了防止出现死锁，可以给锁设置一个超时时间，到期后自动释放；并且最好开启一个监听线程，当任务尚未完成时给锁自动续期。

![PmHub：Redis分布式锁保障流程状态更新](https://cdn.tobebetterjavaer.com/stutymore/redis-20250428152255.png)

如果是秒杀接口，还可以使用 Lua 脚本来实现令牌桶算法，限制每秒只能处理 N 个请求。

```lua
-- KEYS[1]: 令牌桶的key
-- ARGV[1]: 桶容量
-- ARGV[2]: 令牌生成速率（每秒）
-- ARGV[3]: 当前时间戳（秒）

local bucket = redis.call('HMGET', KEYS[1], 'tokens', 'timestamp')
local tokens = tonumber(bucket[1]) or ARGV[1]
local last_time = tonumber(bucket[2]) or ARGV[3]

local rate = tonumber(ARGV[2])
local capacity = tonumber(ARGV[1])
local now = tonumber(ARGV[3])

-- 计算新令牌数
local delta = math.max(0, now - last_time)
local add_tokens = delta * rate
tokens = math.min(capacity, tokens + add_tokens)
last_time = now

local allowed = 0
if tokens >= 1 then
    tokens = tokens - 1
    allowed = 1
end

redis.call('HMSET', KEYS[1], 'tokens', tokens, 'timestamp', last_time)
redis.call('EXPIRE', KEYS[1], 3600) -- 过期时间可自定义

return allowed
```

在 Java 中调用 Lua 脚本：

```java
// 令牌桶参数
int capacity = 10; // 桶容量
int rate = 2;      // 每秒2个令牌
long now = System.currentTimeMillis() / 1000;
String key = "token_bucket:user:123";

// 调用 Lua 脚本，返回 1 表示通过，0 表示被限流
Long allowed = (Long) redis.eval(luaScript, 1, key, String.valueOf(capacity), String.valueOf(rate), String.valueOf(now));
```

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的农业银行面经同学 7 Java 后端面试原题：Redis 相关的基础知识
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动同学 7 Java 后端实习一面的原题：讲一下为什么要用 Redis 去存权限列表？
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动同学 20 测开一面的原题：redis 有什么好处，为什么用 redis

memo：2025 年 4 月 28 日修改至此，今天[帮球友修改简历](https://javabetter.cn/zhishixingqiu/jianli.html)的时候，碰到一位东南大学本硕连读的球友，星球能来这么多优秀的球友，真的很开心啊。

![东南大学本硕的球友](https://cdn.tobebetterjavaer.com/stutymore/redis-20250428163928.png)

### 🌟3.Redis有哪些数据类型？

Redis 支持五种基本数据类型，分别是字符串、列表、哈希、集合和有序集合。

![三分恶面渣逆袭：Redis基本数据类型](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-10434dc7-c7a3-4c1a-b484-de3fb37669ee.png)

还有三种扩展数据类型，分别是用于位级操作的 Bitmap、用于基数估算的 HyperLogLog、支持存储和查询地理坐标的 GEO。

#### 详细介绍下字符串？

字符串是最基本的数据类型，可以存储文本、数字或者二进制数据，最大容量是 512 MB。

![Mr于：Redis 的 string](https://cdn.tobebetterjavaer.com/stutymore/redis-20250429112032.png)

适合缓存单个对象，比如验证码、token、计数器等。

#### 详细介绍下列表？

列表是一个有序的元素集合，支持从头部或尾部插入/删除元素，常用于消息队列或任务列表。

![Mr于：Redis 的 list](https://cdn.tobebetterjavaer.com/stutymore/redis-20250429112708.png)

#### 详细介绍下哈希？

哈希是一个键值对集合，适合存储对象，如商品信息、用户信息等。比如说 `value = {name: '沉默王二', age: 18}`。

![Mr于：Redis 的hash](https://cdn.tobebetterjavaer.com/stutymore/redis-20250429113019.png)

#### 详细介绍下集合？

集合是无序且不重复的，支持交集、并集操作，查询效率能达到 `O(1)` 级别，主要用于去重、标签、共同好友等场景。

![Mr于：Redis 的 set](https://cdn.tobebetterjavaer.com/stutymore/redis-20250429113501.png)

#### 详细介绍下有序集合？

有序集合的元素按分数进行排序，支持范围查询，适用于排行榜或优先级队列。

![二哥的 Java 进阶之路](https://cdn.tobebetterjavaer.com/stutymore/redis-20240315120652.png)

#### 详细介绍下Bitmap？

Bitmap 可以把一组二进制位紧凑地存储在一块连续内存中，每一位代表一个对象的状态，比如是否签到、是否活跃等。

![码哥字节：Bitmap](https://cdn.tobebetterjavaer.com/stutymore/redis-20250429120349.png)

比如用户 0 的已签到 1、用户 1 未签到 0、用户 2 已签到，Redis 就会把这些状态放进一个连续的二进制串 `101`，1 亿用户签到仅需 `100,000,000 / 8 / 1024 ≈ 12MB` 的空间，真的省到离谱。

#### 详细介绍下HyperLogLog？

HyperLogLog 是一种用于基数统计的概率性数据结构，可以在仅有 12KB 的内存空间下，统计海量数据集中不重复元素的个数，误差率仅 0.81%。

![devops.dev：HyperLogLog](https://cdn.tobebetterjavaer.com/stutymore/redis-20250429121524.png)

底层基于 LogLog 算法改进，先把每个元素哈希成一个二进制串，然后取前 14 位进行分组，放到 16384 个桶中，记录每组最大的前导零数量，最后用一个近似公式推算出总体的基数。

![林冠宏：近似公式](https://cdn.tobebetterjavaer.com/stutymore/redis-20250429132129.png)

>$2^{14}$个桶，每个桶 6 Bit，刚好 `16384 * 6 /8 / 1024 K = 12KB`，8 bit = 1 byte。

举个超简单的例子，假设有一个神奇的哈希函数，可以把元素散列成一个二进制数，比如：

元素|	哈希值|	前导零个数
---|---|---
userA|	000100101…|	3
userB|	001010011…|	2
userC|	000000101…|	6

可以发现，哈希值越长前导零越多，也就说明集合里的元素越多。

大型网站 UV 统计系统示例：

```java
public class UVCounter {
    private Jedis jedis;
    
    public void recordVisit(String date, String userId) {
        String key = "uv:" + date;
        jedis.pfadd(key, userId);
    }
    
    public long getUV(String date) {
        return jedis.pfcount("uv:" + date);
    }
    
    public long getUVBetween(String startDate, String endDate) {
        List<String> keys = getDateKeys(startDate, endDate);
        return jedis.pfcount(keys.toArray(new String[0]));
    }
}
```

#### 详细介绍下GEO？

GEO 用于存储和查询地理位置信息，可以用来计算两点之间的距离，查找某位置半径内的其他元素。

常见的应用场景包括：附近的人或者商家、计算外卖员和商家的距离、判断用户是否进入某个区域等。

底层基于 ZSet 实现，通过 Geohash 算法把经纬度编码成 score。

![小徐先生的编程世界：GEO 原理](https://cdn.tobebetterjavaer.com/stutymore/redis-20250429134358.png)

比如说查询附近的商家时，Redis 会根据中心点经纬度反推可能的 Geohash 范围，
在 ZSet 上做范围查询，拿到候选点后，用 Haversine 公式精确计算球面距离，筛选出最终符合要求的位置。

```java
public class NearbyShopService {
    private Jedis jedis;
    private static final String SHOP_KEY = "shops:geo";
    
    // 添加商铺
    public void addShop(String shopId, double longitude, double latitude) {
        jedis.geoadd(SHOP_KEY, longitude, latitude, shopId);
    }
    
    // 查询附近的商铺
    public List<GeoRadiusResponse> getNearbyShops(
            double longitude, 
            double latitude, 
            double radiusKm) {
        return jedis.georadius(SHOP_KEY, 
                             longitude, 
                             latitude, 
                             radiusKm, 
                             GeoUnit.KM, 
                             GeoRadiusParam.geoRadiusParam()
                                         .withCoord()
                                         .withDist()
                                         .sortAscending()
                                         .count(20));
    }
    
    // 计算两个商铺之间的距离
    public double getShopDistance(String shop1Id, String shop2Id) {
        return jedis.geodist(SHOP_KEY, 
                           shop1Id, 
                           shop2Id, 
                           GeoUnit.KILOMETERS);
    }
}
```

#### 为什么使用 hash 类型而不使用 string 类型序列化存储？

Hash 可以只读取或者修改某一个字段，而 String 需要一次性把整个对象取出来。

![二哥的 Java 进阶之路：hash 和 string 的区别](https://cdn.tobebetterjavaer.com/stutymore/redis-20240315115713.png)

比如说有一个用户对象 `user = {name: '沉默王二', age: 18}`，如果使用 Hash 存储，可以直接修改 `age` 字段：

```java
redis.hset("user:1", "age", 19);
```

如果使用 String 存储，需要先取出整个对象，修改后再存回去：

```java
String userJson = redis.get("user:1");
User user = JSON.parseObject(userJson, User.class);
user.setAge(19);
redis.set("user:1", JSON.toJSONString(user));
```

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动商业化一面的原题：说说 Redis 的 zset，什么是跳表，插入一个节点要构建几层索引
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 9 飞书后端技术一面面试原题：Redis 的数据类型，ZSet 的实现
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小米暑期实习同学 E 一面面试原题：你对 Redis 了解多少，说说常见的数据结构和应用场景
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 23 QQ 后台技术一面面试原题：Redis 的数据类型
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的快手面经同学 7 Java 后端技术一面面试原题：说一下 Redis 常用的数据结构
> 6. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的农业银行面经同学 7 Java 后端面试原题：Redis 相关的基础知识
> 7. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的华为面经同学 11 面试原题：项目中使用了 redis，redis 有哪些数据类型？分别使用的场景是什么？什么使用 hash 类型而不使用 string 类型序列化存储？
> 8. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的 OPPO 面经同学 1 面试原题：Redis常见数据结构
> 9. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团同学 9 一面面试原题：redis的数据结构类型？
> 10. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的阿里云面经同学 22 面经：redis高级数据结构的使用场景
> 11. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 29 Java 后端一面原题：Redis保证incr命令原子性的原理是什么？

memo：2025 年 4 月 29 日修改至此，今天[有球友发信息](https://javabetter.cn/zhishixingqiu/)说拿到了亚马逊的 offer，工资还给的很高，问我要不要选？ 真的恭喜了🎉。

![球友拿到了亚马逊的 offer](https://cdn.tobebetterjavaer.com/stutymore/redis-20250429155817.png)

### 🌟4.Redis 为什么快呢？

第一，Redis 的所有数据都放在内存中，而内存的读写速度本身就比磁盘快几个数量级。

![Shirley：Redis 基于内存](https://cdn.tobebetterjavaer.com/stutymore/redis-20250430112922.png)

第二，Redis 采用了基于 IO 多路复用技术的事件驱动模型来处理客户端请求和执行 Redis 命令。

![士云：Redis的事件驱动模型](https://cdn.tobebetterjavaer.com/stutymore/redis-20250430132517.png)

其中的 IO 多路复用技术可以在只有一个线程的情况下，同时监听成千上万个客户端连接，解决传统 IO 模型中每个连接都需要一个独立线程带来的性能开销。

![Rico：IO 多路复用](https://cdn.tobebetterjavaer.com/stutymore/redis-20250430143547.png)

IO 多路复用会持续监听请求，然后把准备好的请求压入到一个队列当中，并将其有序地传递给文件事件分派器，最后由事件处理器来执行对应的 accept、read 和 write 请求。

![开发者内功修炼：Redis 事件驱动机制](https://cdn.tobebetterjavaer.com/stutymore/redis-20250430150054.png)

Redis 会根据操作系统选择最优的 IO 多路复用技术，比如 Linux 下使用 epoll，macOS 下使用 kqueue 等。

```c
// epoll 的创建和使用
int epfd = epoll_create(1024); // 创建 epoll 实例
struct epoll_event ev, events[MAX_EVENTS];

// 添加监听事件
ev.events = EPOLLIN;
ev.data.fd = listen_sock;
epoll_ctl(epfd, EPOLL_CTL_ADD, listen_sock, &ev);

// 等待事件发生
while (1) {
    int nfds = epoll_wait(epfd, events, MAX_EVENTS, -1);
    for (int i = 0; i < nfds; i++) {
        // 处理就绪的文件描述符
    }
}
```

在 Redis 6.0 之前，包括连接建立、请求读取、响应发送，以及命令执行都是在主线程中顺序执行的，这样可以避免多线程环境下的锁竞争和上下文切换，因为 Redis 的绝大部分操作都是在内存中进行的，性能瓶颈主要是内存操作和网络通信，而不是 CPU。

![小眼睛聊技术：Redis 单线程](https://cdn.tobebetterjavaer.com/stutymore/redis-20250430145617.png)

为了进一步解决网络 IO 的性能瓶颈，Redis 6.0 引入了多线程机制，把网络 IO 和命令执行分开，网络 IO 交给线程池来处理，而命令执行仍然在主线程中进行，这样就可以充分利用多核 CPU 的性能。

![小眼睛聊技术：Redis6.0 引入了多线程](https://cdn.tobebetterjavaer.com/stutymore/redis-20250430145654.png)

主线程专注于命令执行，网络IO 由其他线程分担，在多核 CPU 环境下，Redis 的性能可以得到显著提升。

![lxkka：Redis io 线程和主线程的关系](https://cdn.tobebetterjavaer.com/stutymore/redis-20250430151846.png)

第三，Redis 对底层数据结构做了极致的优化，比如说 String 的底层数据结构动态字符串支持动态扩容、预分配冗余空间，能够减少内存碎片和内存分配的开销。

![古明地盆：Redis 的数据类型和底层数据结构](https://cdn.tobebetterjavaer.com/stutymore/redis-20250430152926.png)


> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯 Java 后端实习一面原题：Redis 为什么读写性能高？
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小米春招同学 K 一面面试原题：为什么 redis 快，淘汰策略 持久化
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 1 Java 后端技术一面面试原题：单线程的 Redis 为什么这么快？
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的微众银行同学 1 Java 后端一面的原题：Redis 为什么这么快？
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的百度面经同学 1 文心一言 25 实习 Java 后端面试原题：项目中什么地方使用了 redis 缓存，redis 为什么快？
> 6. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的得物面经同学 8 一面面试原题：Redis 为什么快
> 7. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 21  抖音商城一面面试原题：redis为什么能处理高并发

memo：2025 年 4 月 30 日修改至此，今天[有球友发信息](https://javabetter.cn/zhishixingqiu/)说拿到了滴滴的实习 offer，真的恭喜了🎉。

![球友拿到了滴滴的暑期实习 offer](https://cdn.tobebetterjavaer.com/stutymore/redis-20250501102228.png)

### 5.能详细说一下IO多路复用吗？

IO 多路复用是一种允许单个进程同时监视多个文件描述符的技术，使得程序能够高效处理多个并发连接而无需创建大量线程。

![Journey-C：IO 多路复用](https://cdn.tobebetterjavaer.com/stutymore/redis-20250501104352.png)

IO 多路复用的核心思想是：让单个线程可以等待多个文件描述符就绪，然后对就绪的描述符进行操作。这样可以在不使用多线程或多进程的情况下处理并发连接。

![蛮荆：IO 多路复用和多线程](https://cdn.tobebetterjavaer.com/stutymore/redis-20250501104549.png)

主要的实现机制包括 select、poll、epoll、kqueue 和 IOCP 等。

#### 请说说 select、poll、epoll、kqueue 和 IOCP 的区别？

select 的缺点是单个进程能监视的文件描述符数量有限，一般为 1024 个，且每次调用都需要将文件描述符集合从用户态复制到内核态，然后遍历找出就绪的描述符，性能较差。

```c
// select 的基本使用
int select(int nfds, fd_set *readfds, fd_set *writefds, 
           fd_set *exceptfds, struct timeval *timeout);

// 示例代码
fd_set readfds;
FD_ZERO(&readfds);                // 清空集合
FD_SET(sockfd, &readfds);         // 添加监听套接字
select(sockfd + 1, &readfds, NULL, NULL, NULL);
if (FD_ISSET(sockfd, &readfds)) { // 检查是否就绪
    // 处理读事件
}
```

poll 的优点是没有最大文件描述符数量的限制，但是每次调用仍然需要将文件描述符集合从用户态复制到内核态，依然需要遍历，性能仍然较差。

```c
// poll 的基本使用
int poll(struct pollfd *fds, nfds_t nfds, int timeout);

// 示例代码
struct pollfd fds[MAX_EVENTS];
fds[0].fd = sockfd;
fds[0].events = POLLIN;    // 监听读事件
poll(fds, 1, -1);
if (fds[0].revents & POLLIN) {
    // 处理读事件
}
```

epoll 是 Linux 特有的 IO 多路复用机制，支持大规模并发连接，使用事件驱动模型，性能更高。其工作原理是将文件描述符注册到内核中，然后通过事件通知机制来处理就绪的文件描述符，不需要轮询，也不需要数据拷贝，更没有数量限制，所以性能非常高。

```c
// epoll 的基本使用
int epoll_create(int size);
int epoll_ctl(int epfd, int op, int fd, struct epoll_event *event);
int epoll_wait(int epfd, struct epoll_event *events, int maxevents, int timeout);

// 示例代码
int epfd = epoll_create(1);
struct epoll_event ev, events[MAX_EVENTS];
ev.events = EPOLLIN;
ev.data.fd = sockfd;
epoll_ctl(epfd, EPOLL_CTL_ADD, sockfd, &ev);

while (1) {
    int nfds = epoll_wait(epfd, events, MAX_EVENTS, -1);
    for (int i = 0; i < nfds; i++) {
        if (events[i].data.fd == sockfd) {
            // 处理读事件
        }
    }
}
```

kqueue 是 BSD/macOS 系统下的 IO 多路复用机制，类似于 epoll，支持大规模并发连接，使用事件驱动模型。

```c
int kqueue(void);
int kevent(int kq, const struct kevent *changelist, int nchanges, struct kevent *eventlist, int nevents, const struct timespec *timeout);
```

IOCP 是 Windows 系统下的 IO 多路复用机制，使用使用完成端口模型而非事件通知。

```c
HANDLE CreateIoCompletionPort(HANDLE FileHandle, HANDLE ExistingCompletionPort, ULONG_PTR CompletionKey, DWORD NumberOfConcurrentThreads);
```

#### 举个例子说一下 IO 多路复用？

比如说我是一名数学老师，上课时提出了一个问题：“今天谁来证明一下勾股定律？”

同学小王举手，我就让小王回答；小李举手，我就让小李回答；小张举手，我就让小张回答。

这种模式就是 IO 多路复用，我只需要在讲台上等，谁举手谁回答，不需要一个一个去问。

![有盐先生：IO 多路复用](https://cdn.tobebetterjavaer.com/stutymore/redis-20240918114125.png)

Redis 就是使用 epoll 这样的 IO 多路复用机制，在单线程模型下实现高效的网络 IO，从而支持高并发的请求处理。

#### 举例子说一下阻塞 IO和 IO 多路复用的差别？

假设我是一名老师，让学生解答一道题目。

我的第一种选择：按顺序逐个检查，先检查 A同学，然后是 B，之后是 C、D。。。这中间如果有一个学生卡住，全班都会被耽误。

这种就是阻塞 IO，不具有并发能力。

![阻塞 IO和 IO多路复用差别](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-eb541432-d68a-4dd9-b427-96c4dd607d64.png)

我的第二种选择，我站在讲台上等，谁举手我去检查谁。C、D 举手，我去检查 C、D 的答案，然后继续回到讲台上等。此时 E、A 又举手，然后去处理 E 和 A。

#### select、poll 和 epoll 的实现原理？

select 和 poll 都是通过把所有文件描述符传递给内核，由内核遍历判断哪些就绪。

select 将文件描述符 FD 通过 BitsMap 传入内核，轮询所有的 FD，通过调用 file->poll 函数查询是否有对应事件，没有就将 task 加入 FD 对应 file 的待唤醒队列，等待事件来临被唤醒。

![journey-c：select](https://cdn.tobebetterjavaer.com/stutymore/redis-20250501113356.png)

poll 改进了连接数上限问题，不再用 BitsMap 来传入 FD，取而代之的是动态数组 pollfd，但本质上仍是线性遍历，性能没有提升太多。

![journey-c：poll](https://cdn.tobebetterjavaer.com/stutymore/redis-20250501113618.png)

select和poll的模式都是，一次将参数拷贝到内核空间，等有结果了再一次拷贝出去。

epoll 将监听的 FD 注册进内核的红黑树，由内核在事件触发时将就绪的 FD 放入 ready list。应用程序通过 epoll_wait 获取就绪的 FD，从而避免遍历所有连接的开销。

![journey-c：epoll](https://cdn.tobebetterjavaer.com/stutymore/redis-20250501113710.png)

epoll 最大的优点是：支持事件驱动 + 边缘触发，ADD 时拷贝一次，epoll_wait 时利用 MMAP 和用户共享空间，直接拷贝数据到用户空间，因此在高并发场景下性能远高于 select 和 poll。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 21  抖音商城一面面试原题：io多路复用了解吗？
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的快手同学 4 一面原题：IO多路复用中select/poll/epoll各自的实现原理和区别？
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学19番茄小说一面面试原题：Linux中的IO多路复用

memo：2025 年 5 月 1 日修改至此，今天[帮球友修改简历时](https://javabetter.cn/zhishixingqiu/jianli.html) 时，碰到一名北京交通大学的同学，又一所 211 院校，星球真的是人才济济，大家一起加油吧（骄傲）。

![北京交通大学的球友](https://cdn.tobebetterjavaer.com/stutymore/redis-20250502100516.png)

### 6. Redis为什么早期选择单线程？

第一，单线程模型不需要考虑复杂的锁机制，不存在多线程环境下的死锁、竞态条件等问题，开发起来更快，也更容易维护。

![wsh-study.com：Redis的单线程模型](https://cdn.tobebetterjavaer.com/stutymore/redis-20250502100006.png)

第二，Redis 是IO 密集型而非 CPU 密集型，主要受内存和网络 IO 限制，而非 CPU 的计算能力，单线程可以避免线程上下文切换的开销。

哪怕我们在一个普通的 Linux 服务器上启动 Redis 服务，它也能在 1s 内处理 1000000 个用户请求。

第三，单线程可以保证命令执行的原子性，无需额外的同步机制。

![官方单线程解释](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-344b8461-98d4-495b-a697-70275b0abad6.png)

Redis 虽然最初采用了单线程设计，但后续的版本中也在特定方面引入了多线程，比如说 Redis 4.0 就引异步多线程，用于清理脏数据、释放无用连接、删除大 Key 等。



```c
/* 从数据库中删除一个键、值以及相关的过期条目（如果有的话）。
 * 如果释放值对象需要大量的内存分配操作，该对象可能会被放入
 * 延迟释放列表中，而不是同步释放。延迟释放列表将在
 * bio.c 的另一个线程中进行回收。 */
#define LAZYFREE_THRESHOLD 64
int dbAsyncDelete(redisDb *db, robj *key) {
    /* 从过期字典中删除条目不会释放键的 sds，
     * 因为它与主字典共享。 */
    if (dictSize(db->expires) > 0) dictDelete(db->expires,key->ptr);

    /* 如果值对象只包含少量的内存分配，使用延迟释放方式
     * 实际上会更慢... 所以在一定阈值以下，我们就直接
     * 同步释放对象。 */
    dictEntry *de = dictUnlink(db->dict,key->ptr);
    if (de) {
        robj *val = dictGetVal(de);
        // 计算value的回收收益
        size_t free_effort = lazyfreeGetFreeEffort(val);

        /* 如果释放对象的工作量太大，就通过将对象添加到延迟释放列表
         * 在后台进行处理。
         * 注意，如果对象是共享的，现在就回收它是不可能的。这种情况
         * 很少发生，但是有时 Redis 核心的某些实现部分可能会调用
         * incrRefCount() 来保护对象，然后调用 dbDelete()。在这种
         * 情况下，我们会继续执行并到达 dictFreeUnlinkedEntry() 
         * 调用，这相当于仅仅调用 decrRefCount()。 */
        // 只有回收收益超过一定值，才会执行异步删除，否则还是会退化到同步删除
        if (free_effort > LAZYFREE_THRESHOLD && val->refcount == 1) {
            atomicIncr(lazyfree_objects,1);
            bioCreateBackgroundJob(BIO_LAZY_FREE,val,NULL,NULL);
            dictSetVal(db->dict,de,NULL);
        }
    }

    /* 释放键值对，如果我们将 val 字段设置为 NULL 以便稍后
     * 延迟释放，那么就只释放键。 */
    if (de) {
        dictFreeUnlinkedEntry(db->dict,de);
        if (server.cluster_enabled) slotToKeyDel(key->ptr);
        return 1;
    } else {
        return 0;
    }
}
```

官方解释：[https://redis.io/topics/faq](https://redis.io/topics/faq)

### 7.Redis 6.0 使用多线程是怎么回事?

Redis 6.0 的多线程仅用于处理网络 IO，包括网络数据的读取、写入，以及请求解析。

```
│ 单线程执行命令 │
                  │    ↑    ↓     │
┌─────────┐     ┌─┴────────────┴──┐
│ I/O线程1 │ ←→ │                 │
├─────────┤     │                 │
│ I/O线程2 │ ←→ │    主线程       │
├─────────┤     │                 │
│ I/O线程3 │ ←→ │                 │
└─────────┘     └─────────────────┘
```

而命令的执行依然是单线程，这种设计被称为“IO 线程化”，能够在高负载的情况下，最大限度地提升 Redis 的响应速度。

![三分恶面渣逆袭：Redis6.0多线程](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-b7b24e25-d2dc-4457-994f-95bdb3674b8e.png)

---- 这部分面试中可以不背，方便大家理解 start ----

这一变化主要是因为随着网络带宽和服务器性能的提升，Redis 的瓶颈从 CPU 逐渐转移到了网络 IO：

- 带宽从 10Gbps 提升到 100Gbps，甚至更高。
- 请求的并发数从几千到几万，甚至几十万。

单线程在高负载场景下处理网络 IO 出现了明显的性能瓶颈，Redis 的开发团队通过研究发现，在处理大数据包时，单线程 Redis 有超过 80% 的 CPU 时间花在网络 IO 上，而实际命令执行仅占 20% 左右。

![wsh-study.com：Redis 6.0的多线程网络模型](https://cdn.tobebetterjavaer.com/stutymore/redis-20250502095838.png)

Redis 6.0 的多线程 IO 模型主要包含三个核心步骤：

- 仍然由主线程负责接收客户端的连接请求。
- 主线程将连接请求分发给多个 IO 线程进行处理，主线程负责解析和执行命令。
- 命令执行完毕后，由多个 IO 线程将结果返回给客户端。

```c
// Redis 主事件循环（简化版）
void beforeSleep(struct aeEventLoop *eventLoop) {
    // 1. 主线程分派读任务给 I/O 线程
    handleClientsWithPendingReadsUsingThreads();
    
    // 2. 等待 I/O 线程完成读取
    waitForIOThreads();
    
    // 3. 主线程处理命令
    processInputBuffer();
    
    // 4. 主线程分派写任务给 I/O 线程
    handleClientsWithPendingWritesUsingThreads();
}
```

Redis 6.0 默认仍然使用单线程模式，但可以通过配置文件或命令行参数启用多线程模式。

```shell
# 启用多线程模式
io-threads 4

# 启用多线程写入（Redis 6.0 默认只开启多线程读取）
io-threads-do-reads yes
```

建议将 IO 线程数设置为 CPU 核心数的一半，一般不建议超过 8 个。

经过多次测试，Redis 6.0 在处理 1-200 字节的小数据包时，性能提升 1.5-2 倍；在处理 1KB 以上的大数据包时提升约 3-5 倍。

----这部分面试中可以不背，方便大家理解 end ----

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的同学 30 腾讯音乐面试原题：redis6.0引入的多线程用作什么地方

### 8.说说 Redis 常用命令（补充）

> 2024 年 04 月 11 日增补

①、操作字符串的命令有：

- `SET key value`：设置键 key 的值为 value。
- `GET key`：获取键 key 的值。
- `DEL key`：删除键 key。
- `INCR key`：将键 key 存储的数值增一。
- `DECR key`：将键 key 存储的数值减一。

②、操作列表的命令有：

- `LPUSH key value`：将一个值插入到列表 key 的头部。
- `RPUSH key value`：将一个值插入到列表 key 的尾部。
- `LPOP key`：移除并返回列表 key 的头元素。
- `RPOP key`：移除并返回列表 key 的尾元素。
- `LRANGE key start stop`：获取列表 key 中指定范围内的元素。

③、操作集合的命令有：

- `SADD key member`：向集合 key 添加一个元素。
- `SREM key member`：从集合 key 中移除一个元素。
- `SMEMBERS key`：返回集合 key 中的所有元素。

④、操作有序集合的命令有：

- `ZADD key score member`：向有序集合 key 添加一个成员，或更新其分数。
- `ZRANGE key start stop [WITHSCORES]`：按照索引区间返回有序集合 key 中的成员，可选 WITHSCORES 参数返回分数。
- `ZREVRANGE key start stop [WITHSCORES]`：返回有序集合 key 中，指定区间内的成员，按分数递减。
- `ZREM key member`：移除有序集合 key 中的一个或多个成员。

⑤、操作哈希的命令有：

- `HSET key field value`：向键为 key 的哈希表中设置字段 field 的值为 value。
- `HGET key field`：获取键为 key 的哈希表中字段 field 的值。
- `HGETALL key`：获取键为 key 的哈希表中所有的字段和值。
- `HDEL key field`：删除键为 key 的哈希表中的一个或多个字段。

#### 详细说说 set 命令？

在 Redis 中，设置键值对的命令是 set。set 命令有几个常用的参数：

①、可以通过 EX 或 PX 为键设置过期时间（秒或毫秒）

```shell
redis-cli SET session_id "xyz" EX 3600  # 设置键 session_id，值为 "xyz"，过期时间为 3600 秒
```

②、NX 选项表示只有键不存在时才设置

```shell
redis-cli SET lock_key "locked" NX
```

③、XX 选项表示只有键存在时才设置

```shell
redis-cli SET config "new_config" XX
```

#### sadd 命令的时间复杂度是多少？

向指定 Set 中添加 1 个或多个 member，如果指定 Set 不存在，会自动创建一个。**时间复杂度 O(N)** ，N 为添加的 member 个数。

#### incr命令了解吗？

INCR 命令是 Redis 中的一个原子操作，用于将存储在 key 中的数值加 1。

Redis 的单线程模型确保了每个命令都是原子执行的，不会被其他命令打断。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的京东面经同学 1 Java 技术一面面试原题：说说 Redis 常用命令
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的农业银行面经同学 3 Java 后端面试原题：说的那么好，Redis 设置 key value 的函数是啥
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的快手面经同学 1 部门主站技术部面试原题：Redis 的 sadd 命令时间复杂度是多少？

### 9.单线程 Redis 的 QPS 是多少？(补充)

> 2024 年 4 月 14 日增补

Redis 的 QPS（Queries Per Second，每秒查询率）受多种因素影响，包括硬件配置（如 CPU、内存、网络带宽）、数据模型、命令类型、网络延迟等。

根据官方的基准测试，一个普通服务器的 Redis 实例通常可以达到每秒数万到几十万的 QPS。

可以通过 `redis-benchmark` 命令进行基准测试：

```shell
redis-benchmark -h 127.0.0.1 -p 6379 -c 50 -n 10000
```

- `-h`：指定 Redis 服务器的地址，默认是 127.0.0.1。
- `-p`：指定 Redis 服务器的端口，默认是 6379。
- `-c`：并发连接数，即同时有多少个客户端在进行测试。
- `-n`：请求总数，即测试过程中总共要执行多少个请求。

我本机是一台 macOS，4 GHz 四核 Intel Core i7，32 GB 1867 MHz DDR3，测试结果如下：

![二哥的 Java 进阶之路](https://cdn.tobebetterjavaer.com/stutymore/redis-20240408100900.png)

可以看得出，每秒能处理超过 10 万次请求。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 1 Java 后端技术一面面试原题：单线程 Redis 的 QPS 是多少？

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括 Java 基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM 等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

## 持久化

### 10.Redis 持久化⽅式有哪些？有什么区别？

Redis 的持久化机制保证了 Redis 服务器在重启后数据不丢失，通过 RDB 和 AOF 文件来恢复内存中原有的数据。

这两种持久化方式可以单独使用，也可以同时使用。

![三分恶面渣逆袭：Redis持久化的两种方式](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-3bda4a46-adc3-4f0d-a135-b8ae5d4c0d5d.png)

#### 说一下 RDB？

RDB 持久化通过创建数据集的快照来工作，在指定的时间间隔内将 Redis 在某一时刻的数据状态保存到磁盘的一个 RDB 文件中。

可通过 save 和 bgsave 命令两个命令来手动触发 RDB 持久化操作：

![三分恶面渣逆袭：save和bgsave](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-ffe56e32-34c5-453d-8859-c2febbe6a038.png)

**①、save 命令**：会同步地将 Redis 的所有数据保存到磁盘上的一个 RDB 文件中。这个操作会阻塞所有客户端请求直到 RDB 文件被完全写入磁盘。

当 Redis 数据集较大时，使用 SAVE 命令会导致 Redis 服务器停止响应客户端的请求。

不推荐在生产环境中使用，除非数据集非常小，或者可以接受服务暂时的不可用状态。

**②、bgsave 命令**：会在后台异步地创建 Redis 的数据快照，并将快照保存到磁盘上的 RDB 文件中。这个命令会立即返回，Redis 服务器可以继续处理客户端请求。

在 BGSAVE 命令执行期间，Redis 会继续响应客户端的请求，对服务的可用性影响较小。快照的创建过程是由一个子进程完成的，主进程不会被阻塞。是在生产环境中执行 RDB 持久化的推荐方式。

以下场景会自动触发 RDB 持久化：

①、在 Redis 配置文件（通常是 redis.conf）中，可以通过`save <seconds> <changes>`指令配置自动触发 RDB 持久化的条件。这个指令可以设置多次，每个设置定义了一个时间间隔（秒）和该时间内发生的变更次数阈值。

```
save 900 1
save 300 10
save 60 10000
```

这意味着：

- 如果至少有 1 个键被修改，900 秒后自动触发一次 RDB 持久化。
- 如果至少有 10 个键被修改，300 秒后自动触发一次 RDB 持久化。
- 如果至少有 10000 个键被修改，60 秒后自动触发一次 RDB 持久化。

满足以上任一条件，RDB 持久化就会被自动触发。

②、当 Redis 服务器通过 SHUTDOWN 命令正常关闭时，如果没有禁用 RDB 持久化，Redis 会自动执行一次 RDB 持久化，以确保数据在下次启动时能够恢复。

③、在 Redis 复制场景中，当一个 Redis 实例被配置为从节点并且与主节点建立连接时，它可能会根据配置接收主节点的 RDB 文件来初始化数据集。这个过程中，主节点会在后台自动触发 RDB 持久化，然后将生成的 RDB 文件发送给从节点。

#### 说一下 AOF？

AOF 持久化通过记录每个写操作命令并将其追加到 AOF 文件中来工作，恢复时通过重新执行这些命令来重建数据集。

AOF 的主要作用是解决了数据持久化的实时性，目前已经是 Redis 持久化的主流方式。

AOF 的工作流程分为四个步骤：命令写入、文件同步、文件重写、重启加载。

![三分恶面渣逆袭：AOF工作流程](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-a9fb6202-b1a1-484d-a4fa-fef519090b44.png)

1）当 AOF 持久化机制被启用时，Redis 服务器会将接收到的所有写命令追加到 AOF 缓冲区的末尾。

2）接着将缓冲区中的命令刷新到磁盘的 AOF 文件中，刷新策略有三种：

- always：每次写命令都会同步到 AOF 文件。
- everysec（默认）：每秒同步一次。如果系统崩溃，可能会丢失最后一秒的数据。
- no：在这种模式下，如果发生宕机，那么丢失的数据量由操作系统内核的缓存冲洗策略决定。

3）随着 AOF 文件的不断增长，Redis 会启用重写机制来生成一个更小的 AOF 文件：

- 将内存中每个键值对的当前状态转换为一条最简单的 Redis 命令，写入到一个新的 AOF 文件中。即使某个键被修改了多次，在新的 AOF 文件中也只会保留最终的状态。
- Redis 会 fork 一个子进程，子进程负责重写 AOF 文件，主进程不会被阻塞。

```
主进程（fork）  
   │  
   ├─→ 子进程（生成新的 AOF 文件）  
   │       │  
   │       ├─→ 内存快照  
   │       ├─→ 写入临时 AOF 文件  
   │       ├─→ 通知主进程完成  
   │  
   ├─→ 主进程（追加缓冲区到新 AOF 文件）  
   ├─→ 替换旧 AOF 文件  
   ├─→ 重写完成
```

4）当 Redis 服务器重启时，会读取 AOF 文件中的所有命令并重新执行它们，以恢复重启前的内存状态。

#### AOF 文件存储的是什么类型的数据？

AOF 文件存储的是 Redis 所有的写操作命令，比如 SET、HSET、INCR 等。

![二哥的Java 进阶之路：AOF文件内容](https://cdn.tobebetterjavaer.com/stutymore/redis-20241208204853.png)

#### AOF重写期间命令可能会写入两次，会造成什么影响？

AOF 重写期间，Redis 会将新的写命令同时写入旧的 AOF 文件和重写缓冲区。

这样会带来额外的磁盘开销。

但可以防止在 AOF 重写尚未完成时，Redis 发生崩溃，导致数据丢失。即使重写失败，旧的 AOF 文件仍然是完整的。

当重写完成后，会通过原子操作将新的 AOF 文件替换旧的 AOF 文件。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小米春招同学 K 一面面试原题：为什么 redis 快，淘汰策略 持久化
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的快手面经同学 7 Java 后端技术一面面试原题：说一下 Redis 的持久化方式
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小公司面经合集同学 1 Java 后端面试原题：Redis 的持久化方式？RDB 和 AOF 的区别？Redis 宕机哪种恢复的比较快？
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团面经同学 18 成都到家面试原题：redis 持久化
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的作业帮面经同学 1 Java 后端一面面试原题：redis持久化机制
> 6. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的 OPPO 面经同学 1 面试原题：Redis持久化方案
> 7. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的得物面经同学 9 面试题目原题：Redis的基本数据类型？Redis的持久化呢？有何优缺点？
> 8. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的滴滴面经同学 3 网约车后端开发一面原题：Redis持久化
> 9. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的快手面经同学 1 部门主站技术部面试原题：Redis数据的可靠性怎么保证？AOF重写期间命令可能会写入两次，会造成什么影响？


### 11.RDB 和 AOF 各自有什么优缺点？

RDB 是一个非常紧凑的单文件（二进制文件 dump.rdb），代表了 Redis 在某个时间点上的数据快照。非常适合用于备份数据，比如在夜间进行备份，然后将 RDB 文件复制到远程服务器。但可能会丢失最后一次持久化后的数据。

AOF 的最大优点是灵活，实时性好，可以设置不同的 fsync 策略，如每秒同步一次，每次写入命令就同步，或者完全由操作系统来决定何时同步。但 AOF 文件往往比较大，恢复速度慢，因为它记录了每个写操作。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小公司面经合集同学 1 Java 后端面试原题：Redis 的持久化方式？RDB 和 AOF 的区别？Redis 宕机哪种恢复的比较快？

### 12.RDB 和 AOF 如何选择？

如果需要尽可能减少数据丢失，AOF 是更好的选择。尤其是在频繁写入的环境下，设置 AOF 每秒同步可以最大限度减少数据丢失。

如果性能是首要考虑，RDB 可能更适合。RDB 的快照生成通常对性能影响较小，并且数据恢复速度快。

如果系统需要经常重启，并且希望系统重启后快速恢复，RDB 可能是更好的选择。虽然 AOF 也提供了良好的恢复能力，但重写 AOF 文件可能会比较慢。

在许多生产环境中，同时启用 RDB 和 AOF 被认为是最佳实践：

- 使用 RDB 进行快照备份。
- 使用 AOF 保证崩溃后的最大数据完整性。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团面经同学 18 成都到家面试原题：什么时候用 rdb 什么时候用 aof

### 13.Redis 的数据恢复？

当 Redis 中的数据丢失时，可以从 RDB 或者 AOF 中恢复数据。

可以将 RDB 文件或者 AOF 文件复制到 Redis 的数据目录下，然后重启 Redis 服务，Redis 会自动加载数据文件并恢复数据。

![三分恶面渣逆袭：Redis启动加载数据](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-f9aab5e9-a875-4316-9ec9-0c5650afe5c1.png)

**Redis** 启动时加载数据的流程：

1. AOF 开启且存在 AOF 文件时，优先加载 AOF 文件。
2. AOF 关闭或者 AOF 文件不存在时，加载 RDB 文件。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团面经同学 4 一面面试原题：Redis 内存中数据丢失怎么解决

### 14.Redis 4.0 的混合持久化了解吗？

在 Redis 中，RDB 持久化是通过创建数据的快照来保存数据的，而 AOF 持久化则是通过记录每个写入命令来保存数据的。

两种方式各有优缺点。RDB 持久化的优点是恢复大数据集的速度比较快，但是可能会丢失最后一次快照以后的数据。AOF 持久化的优点是数据的完整性比较高，通常只会丢失一秒的数据，但是对于大数据集，AOF 文件可能会比较大，恢复的速度比较慢。

在 Redis 4.0 版本中，混合持久化模式会在 AOF 重写的时候同时生成一份 RDB 快照，然后将这份快照作为 AOF 文件的一部分，最后再附加新的写入命令。

![三分恶面渣逆袭：混合持久化](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-19c531e5-da95-495a-a4c4-d63a0b8bba95.png)

这样，当需要恢复数据时，Redis 先加载 RDB 文件来恢复到快照时刻的状态，然后应用 RDB 之后记录的 AOF 命令来恢复之后的数据更改，既快又可靠。

#### 如何设置持久化模式？

可以通过编辑 Redis 的配置文件 redis.conf 来进行设置，或者在运行时通过 Redis 命令行动态调整。

RDB 持久化通过在配置文件中设置快照（snapshotting）规则来启用。这些规则定义了在多少秒内如果有多少个键被修改，则自动执行一次持久化操作。

```shell
save 900 1      # 如果至少有1个键被修改，900秒后自动保存一次
save 300 10     # 如果至少有10个键被修改，300秒后自动保存一次
save 60 10000   # 如果至少有10000个键被修改，60秒后自动保存一次
```

AOF 持久化是通过在配置文件中设置 appendonly 参数为 yes 来启用的：

```shell
appendonly yes
```

此外，还可以配置 AOF 文件的写入频率，这是通过 appendfsync 设置的：

```shell
appendfsync always    # 每次写入数据都同步，保证数据不丢失，但性能较低
appendfsync everysec  # 每秒同步一次，折中方案
appendfsync no        # 由操作系统决定何时同步，性能最好，但数据安全性最低
```

为了优化 AOF 文件的大小，Redis 允许自动或手动重写 AOF 文件。可以在配置文件中设置重写的触发条件：

```shell
auto-aof-rewrite-percentage 100  # 增长到原大小的100%时触发重写
auto-aof-rewrite-min-size 64mb   # AOF 文件至少达到64MB时才考虑重写
```

手动执行 AOF 重写的命令是：

```shell
redis-cli bgrewriteaof
```

如果决定同时使用 RDB 和 AOF，可以在配置文件中同时启用两者。

```shell
save 900 1
appendonly yes
```

还可以在运行时动态更改：

```shell
redis-cli config set save "900 1 300 10 60 10000"
redis-cli config set appendonly yes
redis-cli config set appendfsync everysec
```

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 1 Java 后端技术一面面试原题：Redis 的持久化机制？
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小公司面经合集同学 1 Java 后端面试原题：Redis 宕机哪种恢复的比较快？
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团面经同学 18 成都到家面试原题：如何设置持久化模式
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团面经同学 4 一面面试原题：业界使用哪一种数据持久化，两种持久化方法的优缺点
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的作业帮面经同学 1 Java 后端一面面试原题：两种 Redis持久化机制可以混合使用吗

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括 Java 基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM 等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

## 高可用

Redis 除了单机部署外，还可以通过主从复制、哨兵模式和集群模式来实现高可用。

**主从复制**：允许一个 Redis 服务器（主节点）将数据复制到一个或多个 Redis 服务器（从节点）。这种方式可以实现读写分离，适合读多写少的场景。

**哨兵模式**：用于监控主节点和从节点的状态，实现自动故障转移。如果主节点发生故障，哨兵可以自动将一个从节点升级为新的主节点。

**集群模式**：Redis 集群通过分片的方式存储数据，每个节点存储数据的一部分，用户请求可以并行处理。集群模式支持自动分区、故障转移，并且可以在不停机的情况下进行节点增加或删除。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的华为 OD 面经同学 1 一面面试原题：Redis 的了解, 部署方案?
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的同学 30 腾讯音乐面试原题：redis的部署方式都有哪些呢，各自有什么优缺点？

### 15.主从复制了解吗？

主从复制是指将一台 Redis 服务器的数据，复制到其他的 Redis 服务器。

前者称为主节点 master，后者称为从节点slave。且数据的复制是单向的，只能由主节点到从节点。

![三分恶面渣逆袭：Redis主从复制简图](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-60497f1e-8afb-44b3-bb7a-d4c29e5ac484.png)

在 Redis 主从架构中，主节点负责处理所有的写操作，并将这些操作异步复制到从节点。从节点主要用于读取操作，以分担主节点的压力和提高读性能。

#### 主从复制主要的作用是什么?

①、**数据冗余：** 主从复制实现了数据的热备份，是持久化之外的一种数据冗余方式。

②、**故障恢复：** 如果主节点挂掉了，可以将一个从节点提升为主节点，从而实现故障的快速恢复。

通常会使用 Sentinel 哨兵来实现自动故障转移，当主节点挂掉时，Sentinel 会自动将一个从节点升级为主节点，保证系统的可用性。

```shell
# sentinel.conf

port 26379
sentinel monitor mymaster 192.168.1.1 6379 2
sentinel down-after-milliseconds mymaster 5000
sentinel failover-timeout mymaster 60000
sentinel parallel-syncs mymaster 1
```

假如是从节点挂掉了，主节点不受影响，但应该尽快修复并重启挂掉的从节点，使其重新加入集群并从主节点同步数据。

③、**负载均衡：** 在主从复制的基础上，配合读写分离，可以由主节点提供写服务，由从节点提供读服务 _（即写 Redis 时连接主节点，读 Redis 时连接从节点）_，分担服务器负载。尤其是在写少读多的场景下，通过多个从节点分担读负载，可以大大提高 Redis 服务器的并发量。

④、**高可用基石：** 除了上述作用以外，主从复制还是哨兵和集群能够实施的 **基础**。

#### 主从复制出现数据不一致怎么办？

Redis 的主从复制是异步进行的，这意味着主节点在执行完写操作后，会立即返回给客户端，而不是等待从节点完成数据同步。

在主节点将数据同步到从节点的过程中，可能会出现网络延迟或中断，从而导致从节点的数据滞后于主节点。

为了解决数据不一致的问题，应该尽量保证主从节点之间的网络连接状况良好，比如说避免在不同机房之间部署主从节点，以减少网络延迟。但可能会带来新的问题，就是整个机房都挂掉的情况。

此外，Redis 本身也提供了一些机制来解决数据不一致的问题，比如说通过 Redis 的 `INFO replication` 命令监控主从节点的复制进度，及时发现和处理复制延迟。

具体做法是获取主节点的 master_repl_offset 和从节点的 slave_repl_offset，计算两者的差值。如果差值超过预设的阈值，采取措施（如停止从节点的数据读取）以减少读到不一致数据的情况。

![极客时间：Redis 核心技术与实战](https://cdn.tobebetterjavaer.com/stutymore/redis-20240709135618.png)

#### Redis解决单点故障主要靠什么？

主从复制，当主节点发生故障时，可以通过手动或自动方式将某个从节点提升为新的主节点，继续对外提供服务，从而避免单点故障。

Redis 的哨兵机制（Sentinel）可以实现自动化的故障转移，当主节点宕机时，哨兵会自动将一个从节点升级为新的主节点。

另外，集群模式下，当某个节点发生故障时，Redis Cluster 会自动将请求路由到其他节点，并通过从节点进行故障恢复。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的得物面经同学 1 面试原题：Redis 分布式，主从，一个节点挂掉怎么办
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小米面经同学 F 面试原题：redis 的主从架构和主从哨兵区别
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的收钱吧面经同学 1 Java 后端一面面试原题：Redis解决单点故障主要靠什么？主从模式用的是异步还是同步？


### 16.Redis 主从有几种常见的拓扑结构？

Redis 的复制拓扑结构可以支持单层或多层复制关系，根据拓扑复杂性可以分为以下三种：一主一从、一主多从、树状主从结构。

1.一主一从结构

一主一从结构是最简单的复制拓扑结构，用于主节点出现宕机时从节点提供故障转移支持。

![一主一从结构](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-5d91a67c-dbff-4a8d-bf9d-1fe7602d5a27.png) 2.一主多从结构

一主多从结构（又称为星形拓扑结构）使得应用端可以利用多个从节点实现读写分离（见图 6-5）。对于读占比较大的场景，可以把读命令发送到从节点来分担主节点压力。

![一主多从结构](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-71074254-699a-480b-bbb0-c68f364a380b.png) 3.树状主从结构

树状主从结构（又称为树状拓扑结构）使得从节点不但可以复制主节点数据，同时可以作为其他从节点的主节点继续向下层复制。通过引入复制中间层，可以有效降低主节点负载和需要传送给从节点的数据量。

![树状主从结构](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-dff14203-5e01-4d1b-a775-10ee444ada54.png)

### 17.Redis 的主从复制原理了解吗？

Redis 主从复制的工作流程大概可以分为如下几步：
![Redis主从复制工作流程](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-21123b1e-68b4-436b-ac84-3365a49a81bd.png)

1.  保存主节点（master）信息
    这一步只是保存主节点信息，保存主节点的 ip 和 port。
2.  主从建立连接
    从节点（slave）发现新的主节点后，会尝试和主节点建立网络连接。
3.  发送 ping 命令
    连接建立成功后从节点发送 ping 请求进行首次通信，主要是检测主从之间网络套接字是否可用、主节点当前是否可接受处理命令。
4.  权限验证
    如果主节点要求密码验证，从节点必须正确的密码才能通过验证。
5.  同步数据集
    主从复制连接正常通信后，主节点会把持有的数据全部发送给从节点。
6.  命令持续复制
    接下来主节点会持续地把写命令发送给从节点，保证主从数据一致性。

### 18.说说主从数据同步的方式？

Redis 在 2.8 及以上版本使用 psync 命令完成主从数据同步，同步过程分为：全量复制和部分复制。

![主从数据同步方式](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-7518f715-6dee-4e70-b972-8aed9879e451.png)

**全量复制**
一般用于初次复制场景，Redis 早期支持的复制功能只有全量复制，它会把主节点全部数据一次性发送给从节点，当数据量较大时，会对主从节点和网络造成很大的开销。

全量复制的完整运行流程如下：
![全量复制](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-aa8d2960-b341-49cc-b04c-201241fd15de.png)

1. 发送 psync 命令进行数据同步，由于是第一次进行复制，从节点没有复制偏移量和主节点的运行 ID，所以发送 psync-1。
2. 主节点根据 psync-1 解析出当前为全量复制，回复+FULLRESYNC 响应。
3. 从节点接收主节点的响应数据保存运行 ID 和偏移量 offset
4. 主节点执行 bgsave 保存 RDB 文件到本地
5. 主节点发送 RDB 文件给从节点，从节点把接收的 RDB 文件保存在本地并直接作为从节点的数据文件
6. 对于从节点开始接收 RDB 快照到接收完成期间，主节点仍然响应读写命令，因此主节点会把这期间写命令数据保存在复制客户端缓冲区内，当从节点加载完 RDB 文件后，主节点再把缓冲区内的数据发送给从节点，保证主从之间数据一致性。
7. 从节点接收完主节点传送来的全部数据后会清空自身旧数据
8. 从节点清空数据后开始加载 RDB 文件
9. 从节点成功加载完 RDB 后，如果当前节点开启了 AOF 持久化功能， 它会立刻做 bgrewriteaof 操作，为了保证全量复制后 AOF 持久化文件立刻可用。

**部分复制**
部分复制主要是 Redis 针对全量复制的过高开销做出的一种优化措施， 使用 psync{runId}{offset}命令实现。当从节点（slave）正在复制主节点 （master）时，如果出现网络闪断或者命令丢失等异常情况时，从节点会向 主节点要求补发丢失的命令数据，如果主节点的复制积压缓冲区内存在这部分数据则直接发送给从节点，这样就可以保持主从节点复制的一致性。

![部分复制](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-87600c72-cc6a-4656-81b2-e71864c97f23.png)

1.  当主从节点之间网络出现中断时，如果超过 repl-timeout 时间，主节点会认为从节点故障并中断复制连接
2.  主从连接中断期间主节点依然响应命令，但因复制连接中断命令无法发送给从节点，不过主节点内部存在的复制积压缓冲区，依然可以保存最近一段时间的写命令数据，默认最大缓存 1MB。
3.  当主从节点网络恢复后，从节点会再次连上主节点
4.  当主从连接恢复后，由于从节点之前保存了自身已复制的偏移量和主节点的运行 ID。因此会把它们当作 psync 参数发送给主节点，要求进行部分复制操作。
5.  主节点接到 psync 命令后首先核对参数 runId 是否与自身一致，如果一 致，说明之前复制的是当前主节点；之后根据参数 offset 在自身复制积压缓冲区查找，如果偏移量之后的数据存在缓冲区中，则对从节点发送+CONTINUE 响应，表示可以进行部分复制。
6.  主节点根据偏移量把复制积压缓冲区里的数据发送给从节点，保证主从复制进入正常状态。

### 19.主从复制存在哪些问题呢？

Redis 主从复制虽然实现了读写分离和数据备份，但也存在一些明显的缺点：

- 由于主从复制是异步的，如果主节点在数据尚未完全同步到从节点时崩溃，会导致数据丢失。
- 写操作集中在主节点，从节点只能处理读操作，无法分担写入压力。
- 在网络分区的情况下，主节点和从节点可能无法相互通信，导致两个节点都被认为是主节点，形成多个主节点的情况，也就是脑裂。

#### 脑裂问题了解吗？

Redis 的脑裂问题是指在主从模式或集群模式下，由于网络分区或节点故障，可能导致系统中出现多个主节点，从而引发数据不一致、数据丢失等问题。

可以通过 Sentinel 模式和 Cluster 模式中的投票机制和强制下线机制来解决。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的同学 30 腾讯音乐面试原题：主从复制有什么缺点呢？redis的脑裂问题

### 20.Redis 哨兵了解吗？

哨兵（Sentinel）机制是 Redis 提供的一个高可用性解决方案，主要用来监控 Redis 主从架构中的实例，并在主节点出现故障时，自动进行故障转移。

![三分恶面渣逆袭：Redis Sentinel](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-8b1a055c-f077-49ff-9432-c194d4fc3639.png)

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的比亚迪面经同学 1 面试原题：Redis 的哨兵机制了解吗？


### 21.Redis 哨兵实现原理知道吗？

哨兵的工作流程包括定时监控、主观下线和客观下线、领导者 Sentinel 节点选举、故障转移等。

![三分恶面渣逆袭：Redis Sentinel工作流程](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-4074d72a-886a-4892-8f55-80112005aad8.png)

每个 Sentinel 实例会定期通过 PING 命令向主节点和从节点发送心跳包。
  
![三分恶面渣逆袭：三个定时任务](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-e7708f8d-ef34-4255-b5d0-cb300c649716.png)


如果一个节点长时间没有响应 PING 命令，Sentinel 会将该节点标记为主观下线。当多个 Sentinel 同时认为一个节点不可用时，该节点被标记为客观下线。

![三分恶面渣逆袭：主观下线和客观下线](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-11839a24-9249-48a5-8c9d-888aa80d91dc.png)

当主节点被确认下线后，Sentinel 之间会通过类似 Raft 的选举算法进行协商，选出一个领导者 Sentinel 来负责执行故障转移。

![三分恶面渣逆袭：故障转移](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-0618a5e2-e94f-40d7-888a-e78019ba8f93.png)

1. 将某个从节点提升为新的主节点。
2. 通知其他从节点重新复制新的主节点的数据。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的 OPPO 面经同学 1 面试原题：Redis的Sentinel和Cluster怎么理解？说一下大概原理

### 22.领导者 Sentinel 节点选举了解吗？

Redis 使用 Raft 算法实现领导者选举的：当主节点挂掉后，新的主节点是由剩余的从节点发起选举后晋升的。

![二哥的 Java 进阶之路：领导者Sentinel节点选举](https://cdn.tobebetterjavaer.com/stutymore/redis-20240819112712.png)

①、每个在线的 Sentinel 节点都有资格成为领导者，当它确认主节点下线时候，会向其他哨兵节点发送命令，表明希望由自己来执行主从切换，并让所有其他哨兵进行投票。

这个投票过程称为“Leader 选举”。候选者会给自己先投 1 票，然后向其他 Sentinel 节点发送投票的请求。

②、收到请求的 Sentinel 节点会进行判断，如果候选者的日志与自己的日志一样新，任期号也小于自己，且之前没有投票过，就会同意投票，回复 Y。否则回复 N。

③、候选者收到投票后会统计支持自己的得票数，如果候选者获得了集群中超过半数节点的投票支持（即多数原则），它将成为新的主节点。

新的主节点在确立后，会向其他从节点发送心跳信号，告诉它们自己已经成为主节点，并将其他节点的状态重置为从节点。

④、如果多个节点同时成为候选者，并且都有可能获得足够的票数，这种情况下可能会出现选票分裂。也就是没有候选者获得超过半数的选票，那么这次选举就会失败，所有候选者都会再次发起选举。

为了防止无限制的选举失败，每个节点都会有一个选举超时时间，且是随机的。

>超时时间指从节点在没有收到主节点的心跳信号或日志追加请求后，等待多长时间才会认为主节点已挂掉，从而进入候选状态并发起选举。

推荐阅读：[Raft算法的选主过程详解](https://hoverzheng.github.io/post/technology-blog/blockchain/raft%E7%AE%97%E6%B3%95%E8%AF%A6%E8%A7%A33--%E9%80%89%E4%B8%BB/)

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的8 后端开发秋招一面面试原题：raft主节点挂了怎么选从节点

### 23.新的主节点是怎样被挑选出来的？

选出新的主节点，大概分为这么几步：
![新的主节点](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-03976d35-20b6-4efe-aa9c-7d3759460d34.png)

1.  过滤：“不健康”（主观下线、断线）、5 秒内没有回复过 Sentinel 节 点 ping 响应、与主节点失联超过 down-after-milliseconds\*10 秒。
2.  选择 slave-priority（从节点优先级）最高的从节点列表，如果存在则返回，不存在则继续。
3.  选择复制偏移量最大的从节点（复制的最完整），如果存在则返 回，不存在则继续。
4.  选择 runid 最小的从节点。

### 24.Redis 集群了解吗？

前面说到了主从存在高可用和分布式的问题，哨兵解决了高可用的问题，而集群就是终极方案，一举解决高可用和分布式问题。

![Redis 集群示意图](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-5cbc6009-251e-4d5b-8f22-8d543938eccb.png)

1. **数据分区：** 数据分区 _(或称数据分片)_ 是集群最核心的功能。集群将数据分散到多个节点，一方面 突破了 Redis 单机内存大小的限制，**存储容量大大增加**；**另一方面** 每个主节点都可以对外提供读服务和写服务，**大大提高了集群的响应能力**。

2. **高可用：** 集群支持主从复制和主节点的 **自动故障转移** _（与哨兵类似）_，当任一节点发生故障时，集群仍然可以对外提供服务。

### 25.Redis Cluster了解吗？（补充）

> 2024 年 04 月 26 日新增

切片集群是一种将数据分片存储在多个 Redis 实例上的集群架构，每个 Redis 实例负责存储部分数据。比如说把 25G 的数据平均分为 5 份，每份 5G，然后启动 5 个 Redis 实例，每个实例保存一份数据。

![极客时间：切片集群架构图](https://cdn.tobebetterjavaer.com/stutymore/redis-20240408104101.png)

在 Redis 3.0 之前，官方并没有针对切片集群提供具体的解决方案；但是在 Redis 3.0 之后，官方提供了 Redis Cluster，数据和实例之间的映射通过哈希槽（hash slot）来实现。

Redis Cluster 有 16384 个哈希槽，每个键根据其名字的 CRC16 值被映射到这些哈希槽上。然后，这些哈希槽会被均匀地分配到所有的 Redis 实例上。

> CRC16 是一种哈希算法，它可以将任意长度的输入数据映射为一个 16 位的哈希值。

![三分恶面渣逆袭：槽](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-e0ed9d62-3406-40db-8b01-c931f1020612.png)

例如，如果我们有 3 个 Redis 实例，那么每个实例可能会负责大约 5461 个哈希槽。

当需要存储或检索一个键值对时，Redis Cluster 会先计算这个键的哈希槽，然后找到负责这个哈希槽的 Redis 实例，最后在这个实例上进行操作。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 1 Java 后端技术一面面试原题：Redis 切片集群？数据和实例之间的如何进行映射？
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的快手面经同学 1 部门主站技术部面试原题：Redis 的 cluster 集群如何实现？

### 26.集群中数据如何分区？

在 Redis 集群中，数据分区是通过将数据分散到不同的节点来实现的，常见的数据分区规则有三种：节点取余分区、一致性哈希分区、虚拟槽分区。

![三分恶面渣逆袭：分布式数据分区](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-ceb49e41-dfd7-4d1e-91f9-c299437227d2.png)

#### 说说节点取余分区

节点取余分区是一种简单的分区策略，其中数据项通过对某个值（通常是键的哈希值）进行取余操作来分配到不同的节点。

类似 HashMap 中的取余操作，数据项的键经过哈希函数计算后，对节点数量取余，然后将数据项分配到余数对应的节点上。

缺点是扩缩容时，大多数数据需要重新分配，因为节点总数的改变会影响取余结果，这可能导致大量数据迁移。

![三分恶面渣逆袭：节点取余分区](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-8b1fcaec-37e6-420a-9ca2-03615232af17.png)

#### 说说一致性哈希分区

一致性哈希分区的原理是：将哈希值空间组织成一个环，数据项和节点都映射到这个环上。数据项由其哈希值直接映射到环上，然后顺时针分配到遇到的第一个节点。

从而来减少节点变动时数据迁移的量。

![三分恶面渣逆袭：一致性哈希分区](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-89bd1c1c-251c-4f53-bba3-fe945b2ae9e2.png)

Key 1 和 Key 2 会落入到 Node 1 中，Key 3、Key 4 会落入到 Node 2 中，Key 5 落入到 Node 3 中，Key 6 落入到 Node 4 中。

这种方式相比节点取余最大的好处在于加入和删除节点只影响哈希环中相邻的节点，对其他节点无影响。

但它还是存在问题：

- 节点在圆环上分布不平均，会造成部分缓存节点的压力较大
- 当某个节点故障时，这个节点所要承担的所有访问都会被顺移到另一个节点上，会对后面这个节点造成压力。

#### 说说虚拟槽分区？

在虚拟槽（也叫哈希槽）分区中，槽位的数量是固定的（例如 Redis Cluster 有 16384 个槽），每个键通过哈希算法（比如 CRC16）映射到这些槽上，每个集群节点负责管理一定范围内的槽。

这种分区可以灵活地将槽（以及槽中的数据）从一个节点迁移到另一个节点，从而实现平滑扩容和缩容；数据分布也更加均匀，Redis Cluster 采用的正是这种分区方式。

![三分恶面渣逆袭：虚拟槽分配](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-e0ed9d62-3406-40db-8b01-c931f1020612.png)

假设系统中有 4 个实际节点，假设为其分配了 16 个槽(0-15)；

- 槽 0-3 位于节点 node1；
- 槽 4-7 位于节点 node2；
- 槽 8-11 位于节点 node3；
- 槽 12-15 位于节点 node4。

如果此时删除 `node2`，只需要将槽 4-7 重新分配即可，例如将槽 4-5 分配给 `node1`，槽 6 分配给 `node3`，槽 7 分配给 `node4`，数据在节点上的分布仍然较为均衡。

如果此时增加 node5，也只需要将一部分槽分配给 node5 即可，比如说将槽 3、槽 7、槽 11、槽 15 迁移给 node5，节点上的其他槽位保留。

当然了，这取决于 `CRC16(key) % 槽的个数` 的具体结果。因为在 Redis Cluster 中，槽的个数刚好是 2 的 14 次方，这和 HashMap 中数组的长度必须是 2 的幂次方有着异曲同工之妙。

它能保证扩容后，大部分数据停留在扩容前的位置，只有少部分数据需要迁移到新的槽上。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小米暑期实习同学 E 一面面试原题：你知道 Redis 的一致性 hash 吗
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 1 Java 后端技术一面面试原题：Redis 扩容之后，哈希槽的位置是否发生变化？
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 8 Java 后端实习一面面试原题：redis 分片集群，如何分片的，有什么好处

### 27.能说说 Redis 集群的原理吗？

Redis 集群通过数据分区来实现数据的分布式存储，通过自动故障转移实现高可用。

##### 集群创建

数据分区是在集群创建的时候完成的。

![集群创建](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-046a512c-baab-4e3a-9409-2af58088cceb.png)

**设置节点**
Redis 集群一般由多个节点组成，节点数量至少为 6 个才能保证组成完整高可用的集群。每个节点需要开启配置 cluster-enabled yes，让 Redis 运行在集群模式下。

![节点和握手](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-e6064ba6-fd6f-4270-92f9-68c0bb98fd4b.png)

**节点握手**
节点握手是指一批运行在集群模式下的节点通过 Gossip 协议彼此通信， 达到感知对方的过程。节点握手是集群彼此通信的第一步，由客户端发起命 令：cluster meet{ip}{port}。完成节点握手之后，一个个的 Redis 节点就组成了一个多节点的集群。

**分配槽（slot）**
Redis 集群把所有的数据映射到 16384 个槽中。每个节点对应若干个槽，只有当节点分配了槽，才能响应和这些槽关联的键命令。通过 cluster addslots 命令为节点分配槽。

![分配槽](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-15341792-e7a6-428c-a109-22827e02be5f.png)

##### 故障转移

Redis 集群的故障转移和哨兵的故障转移类似，但是 Redis 集群中所有的节点都要承担状态维护的任务。

**故障发现**
Redis 集群内节点通过 ping/pong 消息实现节点通信，集群中每个节点都会定期向其他节点发送 ping 消息，接收节点回复 pong 消息作为响应。如果在 cluster-node-timeout 时间内通信一直失败，则发送节 点会认为接收节点存在故障，把接收节点标记为主观下线（pfail）状态。

![主观下线](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-84a2a89e-f9ea-4681-b748-1a4f1dee172b.png)

当某个节点判断另一个节点主观下线后，相应的节点状态会跟随消息在集群内传播。通过 Gossip 消息传播，集群内节点不断收集到故障节点的下线报告。当 半数以上持有槽的主节点都标记某个节点是主观下线时。触发客观下线流程。

![主观下线和客观下线](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-b61a6109-7aea-45ab-a53c-267eebb9180a.png)

**故障恢复**

故障节点变为客观下线后，如果下线节点是持有槽的主节点则需要在它 的从节点中选出一个替换它，从而保证集群的高可用。

![故障恢复流程](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-0e5a49b3-cb5a-4aef-a81f-fce50a012a39.png)

1. 资格检查
   每个从节点都要检查最后与主节点断线时间，判断是否有资格替换故障 的主节点。
2. 准备选举时间
   当从节点符合故障转移资格后，更新触发故障选举的时间，只有到达该 时间后才能执行后续流程。
3. 发起选举
   当从节点定时任务检测到达故障选举时间（failover_auth_time）到达后，发起选举流程。
4. 选举投票
   持有槽的主节点处理故障选举消息。投票过程其实是一个领导者选举的过程，如集群内有 N 个持有槽的主节 点代表有 N 张选票。由于在每个配置纪元内持有槽的主节点只能投票给一个 从节点，因此只能有一个从节点获得 N/2+1 的选票，保证能够找出唯一的从节点。

   ![选举投票](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-d0e16ea3-6683-43f4-82a3-80478703ae06.png)

5. 替换主节点
   当从节点收集到足够的选票之后，触发替换主节点操作。

#### 部署 Redis 集群至少需要几个物理节点？

在投票选举的环节，故障主节点也算在投票数内，假设集群内节点规模是 3 主 3 从，其中有 2 个主节点部署在一台机器上，当这台机器宕机时，由于从节点无法收集到 3/2+1 个主节点选票将导致故障转移失败。这个问题也适用于故障发现环节。因此部署集群时所有主节点最少需要部署在 3 台物理机上才能避免单点问题。

### 28.说说集群的伸缩？

Redis 集群使用数据分片和哈希槽的机制将数据分布到不同的节点上。集群扩容和缩容的关键，在于槽和节点之间的对应关系。

![三分恶面渣逆袭：集群的伸缩](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-dd3e9494-eddb-4861-85f7-2646018d93f6.png)

当需要扩容时，新的节点被添加到集群中，集群会自动执行数据迁移，以重新分布哈希槽到新的节点。数据迁移的过程可以确保在扩容期间数据的正常访问和插入。

![三分恶面渣逆袭：扩容实例](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-1d24bb63-2b05-4db9-bd6b-983f16a4830e.png)

当数据正在迁移时，客户端请求可能被路由到原有节点或新节点。Redis Cluster 会根据哈希槽的映射关系判断请求应该被路由到哪个节点，并在必要时进行重定向。

如果请求被路由到正在迁移数据的哈希槽，Redis Cluster 会返回一个 MOVED 响应，指示客户端重新路由请求到正确的目标节点。这种机制也就保证了数据迁移过程中的最终一致性。

当需要缩容时，Redis 集群会将槽从要缩容的节点上迁移到其他节点上，然后将要缩容的节点从集群中移除。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 21  抖音商城一面面试原题：redis如何保证扩容过程中数据正常访问插入

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括 Java 基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM 等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

## 缓存设计

### 29.缓存击穿、缓存穿透、缓存雪崩了解吗？

缓存穿透、缓存击穿和缓存雪崩是指在使用 Redis 做缓存时可能遇到的三种高并发场景下的问题。

#### 什么是缓存击穿？

缓存击穿是指某一个或少数几个数据被高频访问，当这些数据在缓存中过期的那一刻，大量请求就会直接到达数据库，导致数据库瞬间压力过大。

![三分恶面渣逆袭：缓存击穿](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-86579ee6-9dae-4274-a5cc-af6812f48da4.png)

解决⽅案：

①、加锁更新，⽐如请求查询 A，发现缓存中没有，对 A 这个 key 加锁，同时去数据库查询数据，写⼊缓存，再返回给⽤户，这样后⾯的请求就可以从缓存中拿到数据了。

![三分恶面渣逆袭：加锁更新](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-cf63911a-8501-493e-a375-8b47a9f33358.png)

②、将过期时间组合写在 value 中，通过异步的⽅式不断的刷新过期时间，防⽌此类现象。

#### 什么是缓存穿透？

缓存穿透是指查询不存在的数据，由于缓存没有命中（因为数据根本就不存在），请求每次都会穿过缓存去查询数据库。如果这种查询非常频繁，就会给数据库造成很大的压力。

![三分恶面渣逆袭：缓存穿透](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-029951e6-8b99-4364-a570-010853deb594.png)

缓存穿透意味着缓存失去了减轻数据压力的意义。缓存穿透可能有两种原因：

1. 自身业务代码问题
2. 恶意攻击，爬虫造成空命中

它主要有两种解决办法：

①、**缓存空值/默认值**

客户端请求某个 ID 的数据，首先检查缓存是否命中。如果缓存未命中，查询数据库。如果数据库查询结果为空，将该空结果（如 null 或 {}）缓存起来，并设置一个合理的过期时间。当后续请求再访问相同 ID 时，缓存直接返回空结果，避免每次都打到数据库。

![三分恶面渣逆袭：缓存空值/默认值](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-288af5a2-ae5a-427a-95e9-b4a658b01386.png)

代码示例：

```java
String cacheKey = "product::" + productId;
String result = cache.get(cacheKey);

if (result == null) {
    result = database.queryProductById(productId);

    if (result == null) {
        // 缓存空值，设置较短的过期时间
        cache.set(cacheKey, "null", shortTTL);
    } else {
        // 缓存有效数据
        cache.set(cacheKey, result, longTTL);
    }
}
```

②、**布隆过滤器**

通过布隆过滤器存储所有可能存在的合法数据的键，当请求到达时，先通过布隆过滤器判断该键是否存在：

- 如果布隆过滤器认为该键不存在，直接返回空，不会查询数据库。
- 如果布隆过滤器认为该键可能存在，则查询缓存和数据库。

![三分恶面渣逆袭：布隆过滤器](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-0e18ea40-a2e5-4fa6-989e-e771f6e4b0fc.png)

代码示例：

```java
BloomFilter<String> bloomFilter = new BloomFilter<>(expectedInsertions, fpp); // 期望插入量和误判率
bloomFilter.put("valid_key_1");
bloomFilter.put("valid_key_2");

// 判断请求的键是否存在于布隆过滤器中
if (!bloomFilter.mightContain(requestedKey)) {
    // 如果布隆过滤器认为该键不存在，则直接返回空
    return null;
} else {
    // 继续正常的缓存查询和数据库查询流程
}
```

两种解决方案的对比：

![三分恶面渣逆袭：缓存空对象和布隆过滤器方案](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-e8a382c9-4379-44ab-b1dc-fb598a228105.png)

#### 什么是缓存雪崩？

缓存雪崩是指在某一个时间点，由于大量的缓存数据同时过期或缓存服务器突然宕机了，导致所有的请求都落到了数据库上（比如 MySQL），从而对数据库造成巨大压力，甚至导致数据库崩溃的现象。

总之就是，崩了，崩的非常严重，就叫雪崩了（电影电视里应该看到过，非常夸张）。

![三分恶面渣逆袭：缓存雪崩](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-1464fe22-c463-4850-8989-b899510cb10e.png)

#### 如何解决缓存雪崩呢？

第一种：提高缓存可用性

**01、集群部署**：采用分布式缓存而不是单一缓存服务器，可以降低单点故障的风险。即使某个缓存节点发生故障，其他节点仍然可以提供服务，从而避免对数据库的大量直接访问。

可以利用 Redis Cluster。

![Rajat Pachauri：Redis Cluster](https://cdn.tobebetterjavaer.com/stutymore/redis-20240326220634.png)

或者第三方集群方案 Codis。

![极客时间：Codis](https://cdn.tobebetterjavaer.com/stutymore/redis-20240326220408.png)

**02、备份缓存**：对于关键数据，除了在主缓存中存储，还可以在备用缓存中保存一份。当主缓存不可用时，可以快速切换到备用缓存，确保系统的稳定性和可用性。

在[技术派实战项目](https://javabetter.cn/zhishixingqiu/paicoding.html)中，我们采用了多级缓存的策略，其中就包括使用本地缓存 Guava Cache 和 Caffeine 来作为二级缓存，在 Redis 出现问题时，系统会自动切换到本地缓存。

这个过程称为“降级”，意味着系统在失去优先级高的资源时仍能继续提供服务。

![技术派教程](https://cdn.tobebetterjavaer.com/stutymore/redis-20240421105333.png)

当从 Redis 获取数据失败时，尝试从本地缓存读取数据。

```java
LoadingCache<String, UserPermissions> permissionsCache = Caffeine.newBuilder()
    .maximumSize(1000)
    .expireAfterWrite(10, TimeUnit.MINUTES)
    .build(this::loadPermissionsFromRedis);

public UserPermissions loadPermissionsFromRedis(String userId) {
    try {
        return redisClient.getPermissions(userId);
    } catch (Exception ex) {
        // Redis 异常处理，尝试从本地缓存获取
        return permissionsCache.getIfPresent(userId);
    }
}
```

第二种：过期时间

对于缓存数据，设置不同的过期时间，避免大量缓存数据同时过期。可以通过在原有过期时间的基础上添加一个随机值来实现，这样可以分散缓存过期时间，减少同一时间对数据库的访问压力。

第三种：限流和降级

通过设置合理的系统限流策略，如令牌桶或漏斗算法，来控制访问流量，防止在缓存失效时数据库被打垮。

此外，系统可以实现降级策略，在缓存雪崩或系统压力过大时，暂时关闭一些非核心服务，确保核心服务的正常运行。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 22 暑期实习一面面试原题：缓存雪崩，如何解决
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的快手面经同学 7 Java 后端技术一面面试原题：说一下 缓存穿透、缓存击穿、缓存雪崩
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动同学 7 Java 后端实习一面的原题：Redis 宕机会不会对权限系统有影响？
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动同学 7 Java 后端实习一面的原题：说一下 Redis 雪崩、穿透、击穿等场景的解决方案
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小米同学 F 面试原题：缓存常见问题和解决方案（引申到多级缓存），多级缓存（redis，nginx，本地缓存）的实现思路
> 6. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的TP联洲同学 5 Java 后端一面的原题：如何解决缓存穿透
> 7. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的理想汽车面经同学 2 一面面试原题：如何理解缓存雪崩、缓存击穿和缓存穿透？

### 30.能说说布隆过滤器吗？

布隆过滤器是一种空间效率极高的概率型数据结构，用于快速检查一个元素是否存在于一个集合中。

![三分恶面渣逆袭：布隆过滤器](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-d0b8d85c-85dc-4843-b4be-d5d48338a44e.png)

布隆过滤器由一个长度为 m 的位数组和 k 个哈希函数组成。

- 开始时，布隆过滤器的每个位都被设置为 0。
- 当一个元素被添加到过滤器中时，它会被 k 个哈希函数分别计算得到 k 个位置，然后将位数组中对应的位设置为 1。
- 当检查一个元素是否存在于过滤器中时，同样使用 k 个哈希函数计算位置，如果任一位置的位为 0，则该元素肯定不在过滤器中；如果所有位置的位都为 1，则该元素可能在过滤器中。



#### 布隆过滤器存在误判吗？

布隆过滤器的优点是空间效率和查询时间都远远超过一般的算法，缺点是存在误判和删除困难。

![勇哥：布隆过滤器](https://cdn.tobebetterjavaer.com/stutymore/redis-20241019191741.png)

当布隆过滤器保存的元素越多，被置为 1 的 bit 位就会越多。假设元素 x 没有存储过，但其他元素的哈希函数映射到位数组的三个位刚好都为 1 且恰好覆盖了元素 x 映射的位置，那么对于布隆过滤器来讲，元素 x 这个值就是存在的，也就是说布隆过滤器存在一定的误判率。

布隆过滤器的误判率取决于以下几个因素：

1. 位数组的大小（m）：位数组的大小决定了可以存储的标志位数量。如果位数组过小，那么哈希碰撞的几率就会增加，从而导致更高的误判率。
2. 哈希函数的数量（k）：哈希函数的数量决定了每个元素在位数组中标记的位数。哈希函数越多，碰撞的概率也会相应变化。如果哈希函数太少，则过滤器很快会变得不精确；如果太多，误判率也会升高，效率下降。
3. 存入的元素数量（n）：存入的元素越多，哈希碰撞的几率越大，从而导致更高的误判率。

![勇哥：布隆过滤器的误判](https://cdn.tobebetterjavaer.com/stutymore/redis-20241019192648.png)

误判率公式如下：

$$
f(k) = \left( 1 - e^{- \frac{kn}{m}} \right)^k
$$

虽然布隆过滤器会产生误判，但在很多场景下一定的误判率是可以接受的，这是因为布隆过滤器的主要优点是其高效的查询速度和低内存占用。相比其他精确的集合数据结构（如哈希表、树等），布隆过滤器可以在空间效率和查询速度上表现更优。

#### 布隆过滤器支持删除吗？

布隆过滤器其实并不支持删除元素，因为多个元素可能哈希到一个布隆过滤器的同一个位置，如果直接删除该位置的元素，则会影响其他元素的判断。

#### 为什么不能用哈希表而是用布隆过滤器？

布隆过滤器是一种基于位数组和多个哈希函数的概率型数据结构，适合在内存资源有限、数据量大且能容忍一定误判的场景下使用。

相比哈希表，布隆过滤器的内存开销非常小，能快速判断一个元素是否存在。虽然它存在误判，但不会漏报，因此在防止缓存穿透、黑名单过滤和推荐系统去重等场景中广泛使用。

哈希表虽然可以精准判断元素存在与否，但需要存储实际数据，内存开销大，不适合大规模数据存储。

#### 布隆过滤器的优点？

1. **内存效率高**：布隆过滤器只需要存储每个元素的哈希值，而不需要存储元素本身，因此内存占用非常小。
2. **查询速度快**：布隆过滤器只需要将元素通过多个哈希函数映射到位数组，并检查位状态即可。它不需要哈希表那样的复杂键值操作，时间复杂度接近常数时间，速度非常快。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动同学 7 Java 后端实习一面的原题：有了解过布隆过滤器吗？
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的TP联洲同学 5 Java 后端一面的原题：布隆过滤器原理，这种方式下5%的错误率可接受？
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团同学 9 一面面试原题：布隆过滤器？布隆过滤器优点？为什么不能用哈希表要用布隆过滤器？
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的理想汽车面经同学 2 一面面试原题：追问：说明一下布隆过滤器

### 31.如何保证缓存和数据库的数据⼀致性？

在[技术派实战项目](https://javabetter.cn/zhishixingqiu/paicoding.html)中，我们采用的是先写 MySQL，再删除 Redis 的方式来保证缓存和数据库的数据一致性。

![技术派教程](https://cdn.tobebetterjavaer.com/stutymore/redis-20240325221330.png)

我举例说明一下。

对于第一次查询，请求 B 查询到的缓存数据是 10，但 MySQL 被请求 A 更新为了 11，此时数据库和缓存不一致。

但也只存在这一次不一致的情况，对于不是强一致性的业务，可以容忍。

当请求 B 第二次查询时，因为请求 A 更新完数据库把缓存删除了，所以请求 B 这次不会命中缓存，会重新查一次 MySQL，然后回写到 Redis。

缓存和数据库又一致了。

#### 那再来说说为什么要删除缓存而不是更新缓存

因为相对而言，删除缓存的速度比更新缓存的速度要快得多。举个例子：假设商品 product_123 的当前库存是 10，现在有一次购买操作，库存减 1，我们需要更新 Redis 中的库存信息。

```java
product_id = "product_123"
# 假设这是购买操作后的新库存值
new_stock = 9

# 更新Redis中的库存信息
redis.set(product_id, new_stock)
```

更新操作至少涉及到两个步骤：计算新的库存值和更新 Redis 中的库存值。

假如是直接删除操作，直接就一步到位了：

```java
product_id = "product_123"

# 删除Redis中的库存缓存
redis.del(product_id)
```

![三分恶面渣逆袭：删除缓存和更新缓存](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-ebad0a67-3012-4466-a4dc-e834104c48f8.png)

假如是更新缓存，那么可能请求 A 更新完 MySQL 后在更新 Redis 中，请求 B 已经读取到 Redis 中的旧值返回了，又一次导致了缓存和数据库不一致。

#### 那再说说为什么要先更新数据库，再删除缓存

因为更新数据库的速度比删除缓存的速度要慢得多。因为更新 MySQL 是磁盘 IO 操作，而 Redis 是内存操作。内存操作比磁盘 IO 快得多（这是硬件层面的天然差距）。

那假如是先删除缓存，再更新数据库，就会造成这样的情况：

缓存中不存在，数据库又没有完成更新，此时有请求进来读取数据，并写入到缓存，那么在更新完缓存后，缓存中这个 key 就成了一个脏数据。

![三分恶面渣逆袭：先更数据库还是先删缓存](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-5c929a9e-a723-43b3-8f3c-f22c83765f9d.png)

目前最流行的缓存读写策略 Cache Aside Pattern（[旁路缓存模式](https://coolshell.cn/articles/17416.html)）就是采用的先写数据库，再删缓存的方式。

- 失效：应用程序先从缓存读取数据，如果数据不存在，再从数据库中读取数据，成功后，放入缓存。
- 命中：应用程序从缓存读取数据，如果数据存在，直接返回。
- 更新：先把数据写入数据库，成功后，再让缓存失效。

![左耳朵耗子：Cache Aside Pattern](https://cdn.tobebetterjavaer.com/stutymore/redis-20240325224814.png)

#### 那假如对一致性要求很高，该怎么办呢？

缓存和数据库数据不一致的原因，常见的有两种：

- 缓存删除失败
- 并发导致写入了脏数据

那通常有四种方案可以解决。

![](https://cdn.tobebetterjavaer.com/stutymore/redis-20240325225250.png)

**①、引入消息队列保证缓存被删除**

使用消息队列（如 Kafka、RabbitMQ）保证数据库更新和缓存更新之间的最终一致性。当数据库更新完成后，将更新事件发送到消息队列。有专门的服务监听这些事件并负责更新或删除缓存。

![三分恶面渣逆袭：消息队列保证key被删除](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-e4a61193-515a-409f-a436-2733abc3a86e.png)

这种方案很不错，缺点是对业务代码有一定的侵入，毕竟引入了消息队列嘛。

**②、数据库订阅+消息队列保证缓存被删除**

可以专门起一个服务（比如 [Canal](https://github.com/alibaba/canal)，阿里巴巴 MySQL binlog 增量订阅&消费组件）去监听 MySQL 的 binlog，获取需要操作的数据。

![技术派教程](https://cdn.tobebetterjavaer.com/stutymore/redis-20240325225809.png)

然后用一个公共的服务获取订阅程序传来的信息，进行缓存删除。

![三分恶面渣逆袭：数据库订阅+消息队列保证key被删除](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-37c07418-9cd8-43d9-90e7-0cb43b329025.png)

这种方式虽然降低了对业务的侵入，但增加了整个系统的复杂度，适合基建完善的大厂。

**③、延时双删防止脏数据**

简单说，就是在第一次删除缓存之后，过一段时间之后，再次删除缓存。

主要针对缓存不存在，但写入了脏数据的情况。在先删缓存，再写数据库的更新策略下发生的比较多。

![三分恶面渣逆袭：延时双删](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-fab24753-9c53-4432-9413-5feba07ae1e3.png)

这种方式的延时时间需要仔细考量和测试。

**④：设置缓存过期时间兜底**

这是一个朴素但有用的兜底策略，给缓存设置一个合理的过期时间，即使发生了缓存和数据库的数据不一致问题，也不会永远不一致下去，缓存过期后，自然就一致了。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的华为面经同学 8 技术二面面试原题：怎样保证数据的最终一致性？
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 23 QQ 后台技术一面面试原题：数据一致性问题
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的微众银行同学 1 Java 后端一面的原题：MySQL 和缓存一致性问题了解吗？
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团面经同学 3 Java 后端技术一面面试原题：如何保证 redis 缓存与数据库的一致性，为什么这么设计
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的比亚迪面经同学 12 Java 技术面试原题：怎么解决redis和mysql的缓存一致性问题
> 6. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动同学 17 后端技术面试原题：双写一致性怎么解决的
> 7. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的京东面经同学 9 面试原题：redis的数据和缓存不一致应该处理

### 32.如何保证本地缓存和分布式缓存的一致？

在[技术派实战项目](https://javabetter.cn/zhishixingqiu/paicoding.html)中，为了减轻 Redis 的负载，我又追加了一层本地缓存 Caffeine。

![三分恶面渣逆袭：延时双删](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-6d4ab7e6-8337-4576-bbf0-79202a1c3331.png)

为了保证本地缓存和 Redis 缓存的一致性，通常采用的策略有：

①、设置本地缓存的过期时间，这是最简单也是最直接的方法，当本地缓存过期时，就从 Redis 缓存中去同步。

②、使用 Redis 的 Pub/Sub 机制，当 Redis 缓存发生变化时，发布一个消息，本地缓存订阅这个消息，然后删除对应的本地缓存。

③、Redis 缓存发生变化时，引入消息队列，比如 RocketMQ、RabbitMQ 去更新本地缓存。

![三分恶面渣逆袭：本地缓存/分布式缓存保持一致](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-20c15f0d-fb3c-4922-94b1-edcd856658be.png)

由于技术派本身对缓存的一致性要求不是特别高，所以我就采用第一种方式。

另外，在技术派实战项目中，我对缓存的使用场景做了细化。比如说，使用 CacheBuilder 来完成 Guava Cache 的构建，像一些简单的缓存场景，比如说获取菜单分类、获取登录验证码、获取用户转存图片等，都使用了 Guava Cache。

![技术派教程：Guava](https://cdn.tobebetterjavaer.com/stutymore/redis-20240507105407.png)

像首页侧边栏、专栏侧边栏、文章详情侧边栏等缓存场景，就使用了 Caffeine 作为本地缓存，通过 @Cacheable、@CacheEvit、@CachePut 等注解实现，非常轻巧。

![技术派教程：Caffeine](https://cdn.tobebetterjavaer.com/stutymore/redis-20240507110254.png)

而像用户 Session 和网站地图 SiteMap 等缓存场景，就使用了 Redis 来作为缓存。

![技术派教程：Redis](https://cdn.tobebetterjavaer.com/stutymore/redis-20240507110652.png)

#### 如果在项目中多个地方都要使用到二级缓存的逻辑，如何设计这一块？

在设计时，应该清楚地区分何时使用一级缓存和何时使用二级缓存。通常情况下，对于频繁访问但不经常更改的数据，可以放在本地缓存中以提供最快的访问速度。而对于需要共享或者一致性要求较高的数据，应当放在一级缓存中。

#### 本地缓存和 Redis 缓存的区别和效率对比？

Redis 可以部署在多个节点上，支持数据分片，适用于跨服务器的缓存共享。而本地缓存只能在单个服务器上使用。

Redis 还可以持久化数据，支持数据备份和恢复，适用于对数据安全性要求较高的场景。并且支持发布/订阅、事务、Lua 脚本等高级功能。

效率上，Redis 和本地缓存都是存储在内存中，读写速度都非常快。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动同学 7 Java 后端实习一面的原题：怎么保证二级缓存和 Redis 缓存的数据一致性？
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的华为面经同学 11 面试原题：使用的 guava cache 和 redis 是如何组合使用的？如果在项目中多个地方都要使用到二级缓存的逻辑，如何设计这一块？
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的去哪儿同学 1 技术二面的原题：redis 和本地缓存的区别，哪个效率高
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的拼多多面经同学 8 一面面试原题：缓存一致性如何保证

### 33.怎么处理热 key？

推荐阅读：

- [阿里：发现并处理 Redis 的大 Key 和热 Key](https://help.aliyun.com/zh/redis/user-guide/identify-and-handle-large-keys-and-hotkeys)
- [董宗磊：Redis 热 Key 发现以及解决办法](https://dongzl.github.io/2021/01/14/03-Redis-Hot-Key/index.html)

所谓的热 key，就是指在很短时间内被频繁访问的键。

比如，热门新闻或热门商品，这类 key 通常会有大流量的访问，对存储这类信息的 Redis 来说，是不小的压力。

> 某天某流量明星突然爆出一个大瓜，微博突然就崩了，这就是热 key 的压力。

再比如说 Redis 是集群部署，热 key 可能会造成整体流量的不均衡（网络带宽、CPU 和内存资源），个别节点出现 OPS 过大的情况，极端情况下热点 key 甚至会超过 Redis 本身能够承受的 OPS。

> OPS（Operations Per Second）是 Redis 的一个重要指标，表示 Redis 每秒钟能够处理的命令数。

通常以 Key 被请求的频率来判定，比如：

- **QPS 集中在特定的 Key**：总的 QPS（每秒查询率）为 10000，其中一个 Key 的 QPS 飙到了 8000。
- **带宽使用率集中在特定的 Key**：一个拥有上千成员且总大小为 1M 的哈希 Key，每秒发送大量的 HGETALL 请求。
- **CPU 使用率集中在特定的 Key**：一个拥有数万个成员的 ZSET Key，每秒发送大量的 ZRANGE 请求。

> - HGETALL 命令用于返回哈希表中，所有的字段和值。
> - ZRANGE 命令用于返回有序集中，指定区间内的成员。

#### 怎么处理热 key？

![三分恶面渣逆袭：热key处理](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-6fa972ec-5531-48f2-a608-4465d79d4518.png)

对热 key 的处理，最关键的是对热 key 的监控:

①、客户端

客户端其实是距离 key“最近”的地方，因为 Redis 命令就是从客户端发出的，例如在客户端设置全局字典（key 和调用次数），每次调用 Redis 命令时，使用这个字典进行记录。

②、代理端

像 Twemproxy、Codis 这些基于代理的 Redis 分布式架构，所有客户端的请求都是通过代理端完成的，可以在代理端进行监控。

③、Redis 服务端

使用 monitor 命令统计热点 key 是很多开发和运维人员首先想到的方案，monitor 命令可以监控到 Redis 执行的所有命令。

> monitor 命令的使用：`redis-cli monitor`

![二哥的 Java 进阶之路：monitor](https://cdn.tobebetterjavaer.com/stutymore/redis-20240309085135.png)

还可以通过 bigkeys 参数来分析热 Key。

> bigkeys 命令的使用：`redis-cli --bigkeys`

![二哥的 Java 进阶之路：bigkeys](https://cdn.tobebetterjavaer.com/stutymore/redis-20240309090340.png)

只要监控到了热 key，对热 key 的处理就简单了：

①、把热 key 打散到不同的服务器，降低压⼒。

基本思路就是给热 Key 加上前缀或者后缀，见下例：

```java
// N 为 Redis 实例个数，M 为 N 的 2倍
const M = N * 2
//生成随机数
random = GenRandom(0, M)
//构造备份新 Key
bakHotKey = hotKey + "_" + random
data = redis.GET(bakHotKey)
if data == NULL {
    data = redis.GET(hotKey)
    if data == NULL {
        data = GetFromDB()
        // 可以利用原子锁来写入数据保证数据一致性
        redis.SET(hotKey, data, expireTime)
        redis.SET(bakHotKey, data, expireTime + GenRandom(0, 5))
    } else {
        redis.SET(bakHotKey, data, expireTime + GenRandom(0, 5))
    }
}
```

②、加⼊⼆级缓存，当出现热 Key 后，把热 Key 加载到 JVM 中，后续针对这些热 Key 的请求，直接从 JVM 中读取。

这些本地的缓存工具有很多，比如 Caffeine、Guava 等，或者直接使用 HashMap 作为本地缓存都是可以的。

注意，如果对热 Key 进行本地缓存，需要防止本地缓存过大。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的华为 OD 的面试中出现过该题：讲一讲 Redis 的热 Key 和大 Key

### 34.缓存预热怎么做呢？

缓存预热是指在系统启动时，提前将一些预定义的数据加载到缓存中，以避免在系统运行初期由于缓存未命中（cache miss）导致的性能问题。

通过缓存预热，可以确保系统在上线后能够立即提供高效的服务，减少首次访问时的延迟。

缓存预热的方法有多种，在[技术派实战项目](https://javabetter.cn/zhishixingqiu/paicoding.html)中，我们采用了项目启动时自动加载和定时预热两种方式，比如说每天定时更新站点地图到 Redis 缓存中。

```java
/**
 * 采用定时器方案，每天5:15分刷新站点地图，确保数据的一致性
 */
@Scheduled(cron = "0 15 5 * * ?")
public void autoRefreshCache() {
    log.info("开始刷新sitemap.xml的url地址，避免出现数据不一致问题!");
    refreshSitemap();
    log.info("刷新完成！");
}

@Override
public void refreshSitemap() {
    initSiteMap();
}

private synchronized void initSiteMap() {
    long lastId = 0L;
    RedisClient.del(SITE_MAP_CACHE_KEY);
    while (true) {
        List<SimpleArticleDTO> list = articleDao.getBaseMapper().listArticlesOrderById(lastId, SCAN_SIZE);

        // 刷新站点地图信息
        Map<String, Long> map = list.stream().collect(Collectors.toMap(s -> String.valueOf(s.getId()), s -> s.getCreateTime().getTime(), (a, b) -> a));
        RedisClient.hMSet(SITE_MAP_CACHE_KEY, map);
        if (list.size() < SCAN_SIZE) {
            break;
        }
        lastId = list.get(list.size() - 1).getId();
    }
}
```

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 1 技术二面面试原题：什么是缓存预热？如何解决？

### 35.热点 key 重建？问题？解决？

开发的时候一般使用“缓存+过期时间”的策略，既可以加速数据读写，又保证数据的定期更新，这种模式基本能够满足绝大部分需求。

但是有两个问题如果同时出现，可能就会出现比较大的问题：

- 当前 key 是一个热点 key（例如一个热门的娱乐新闻），并发量非常大。

- 重建缓存不能在短时间完成，可能是一个复杂计算，例如复杂的 SQL、多次 IO、多个依赖等。 在缓存失效的瞬间，有大量线程来重建缓存，造成后端负载加大，甚至可能会让应用崩溃。

#### 怎么处理热key呢？

要解决这个问题也不是很复杂，解决问题的要点在于：

- 减少重建缓存的次数。
- 数据尽可能一致。
- 较少的潜在危险。

所以一般采用如下方式：

1.  互斥锁（mutex key）
    这种方法只允许一个线程重建缓存，其他线程等待重建缓存的线程执行完，重新从缓存获取数据即可。
2.  永远不过期
    “永远不过期”包含两层意思：

- 从缓存层面来看，确实没有设置过期时间，所以不会出现热点 key 过期后产生的问题，也就是“物理”不过期。
- 从功能层面来看，为每个 value 设置一个逻辑过期时间，当发现超过逻辑过期时间后，会使用单独的线程去构建缓存。

### 36.无底洞问题吗？如何解决？

2010 年，Facebook 的 Memcache 节点已经达到了 3000 个，承载着 TB 级别的缓存数据。但开发和运维人员发现了一个问题，为了满足业务要求添加了大量新 Memcache 节点，但是发现性能不但没有好转反而下降了，当时将这 种现象称为缓存的“**无底洞**”现象。

那么为什么会产生这种现象呢?

通常来说添加节点使得 Memcache 集群 性能应该更强了，但事实并非如此。键值数据库由于通常采用哈希函数将 key 映射到各个节点上，造成 key 的分布与业务无关，但是由于数据量和访问量的持续增长，造成需要添加大量节点做水平扩容，导致键值分布到更多的 节点上，所以无论是 Memcache 还是 Redis 的分布式，批量操作通常需要从不同节点上获取，相比于单机批量操作只涉及一次网络操作，分布式批量操作会涉及多次网络时间。

#### 无底洞问题如何优化呢？

先分析一下无底洞问题：

- 客户端一次批量操作会涉及多次网络操作，也就意味着批量操作会随着节点的增多，耗时会不断增大。

- 网络连接数变多，对节点的性能也有一定影响。

常见的优化思路如下：

- 命令本身的优化，例如优化操作语句等。

- 减少网络通信次数。

- 降低接入成本，例如客户端使用长连/连接池、NIO 等。

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括 Java 基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM 等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

## Redis 运维

### 37.Redis 报内存不足怎么处理？

Redis 内存不足有这么几种处理方式：

- 修改配置文件 redis.conf 的 maxmemory 参数，增加 Redis 可用内存
- 也可以通过命令 set maxmemory 动态设置内存上限
- 修改内存淘汰策略，及时释放内存空间
- 使用 Redis 集群模式，进行横向扩容。

### 38.Redis key 过期策略有哪些？

Redis 的 key 过期回收策略主要有两种：惰性删除和定期删除。

![二哥的 Java 进阶之路：Redis 的过期淘汰策略](https://cdn.tobebetterjavaer.com/stutymore/redis-20240326214119.png)

当某个键被访问时，如果发现它已经过期，Redis 会立即删除该键，俗称惰性删除。但这也意味着如果一个已过期的键从未被访问，它就不会被删除，会占用额外的内存空间。

那还有一种定期删除策略，即每隔一段时间，Redis 就会随机检查一些键是否过期，如果过期就删除。这种策略可以保证过期键及时被删除，但也会增加 Redis 的 CPU 消耗。

可以通过 `config get hz` 命令查看 Redis 内部定时任务的频率。

![二哥的 Java 进阶之路：config get hz](https://cdn.tobebetterjavaer.com/stutymore/redis-20240326214800.png)

结果显示 hz 的值为 "10"，意味着 Redis 服务器每秒执行定时任务的频率是 10 次。可以通过 `CONFIG SET hz 20` 进行调整。

![二哥本地 Redis 的配置文件路径和 hz 的默认值](https://cdn.tobebetterjavaer.com/stutymore/redis-20240326215240.png)

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 22 暑期实习一面面试原题：Redis key 删除策略
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的去哪儿面经同学 1 技术 2 面面试原题：redis 内存淘汰和过期策略
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的京东面经同学 5 Java 后端技术一面面试原题：redis key过期策略

### 39.Redis 有哪些内存淘汰策略？

当 Redis 的内存使用达到最大值时，它会根据配置的内存淘汰策略来决定如何处理新的请求。

>最大值通过 maxmemory 参数设置

![三分恶面渣逆袭：Redis六种内存溢出控制策略](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-5be7405c-ee11-4d2b-bea4-9598f10a1b17.png)

常见的策略有：

1. noeviction：默认策略，不进行任何数据淘汰，直接返回错误信息。
2. allkeys-lru：从所有键中，使用 LRU 算法淘汰最近最少使用的键。
3. allkeys-lfu：从所有键中，使用 LFU 算法淘汰最少使用的键。
4. volatile-lru：从设置了过期时间的键中淘汰最近最少使用的键。
5. volatile-ttl：从设置了过期时间的键中淘汰即将过期的键。

>TTL，Time To Live，存活时间

#### LRU 和 LFU 的区别是什么？

LRU（Least Recently Used）：基于时间维度，淘汰最近最少访问的键。适合访问具有时间特性的场景。

LFU（Least Frequently Used）：基于次数维度，淘汰访问频率最低的键。更适合长期热点数据场景。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小米春招同学 K 一面面试原题：为什么 redis 快，淘汰策略 持久化
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的去哪儿面经同学 1 技术 2 面面试原题：redis 内存淘汰和过期策略
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的作业帮面经同学 1 Java 后端一面面试原题：redis内存淘汰策略
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的阿里系面经同学 19 饿了么面试原题：redis内存淘汰机制  延伸到LRU   LFU

### 40.Redis 阻塞？怎么解决？

Redis 发生阻塞，可以从以下几个方面排查：
![Redis阻塞排查](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-e6a35258-7a78-4489-90b7-e47a4190802b.png)

- **API 或数据结构使用不合理**

  通常 Redis 执行命令速度非常快，但是不合理地使用命令，可能会导致执行速度很慢，导致阻塞，对于高并发的场景，应该尽量避免在大对象上执行算法复杂 度超过 O（n）的命令。

  对慢查询的处理分为两步：

  1. 发现慢查询： slowlog get{n}命令可以获取最近 的 n 条慢查询命令；
  2. 发现慢查询后，可以从两个方向去优化慢查询：
     1）修改为低算法复杂度的命令，如 hgetall 改为 hmget 等，禁用 keys、sort 等命 令
     2）调整大对象：缩减大对象数据或把大对象拆分为多个小对象，防止一次命令操作过多的数据。

- **CPU 饱和的问题**

  单线程的 Redis 处理命令时只能使用一个 CPU。而 CPU 饱和是指 Redis 单核 CPU 使用率跑到接近 100%。

  针对这种情况，处理步骤一般如下：

  1. 判断当前 Redis 并发量是否已经达到极限，可以使用统计命令 redis-cli-h{ip}-p{port}--stat 获取当前 Redis 使用情况
  2. 如果 Redis 的请求几万+，那么大概就是 Redis 的 OPS 已经到了极限，应该做集群化水品扩展来分摊 OPS 压力
  3. 如果只有几百几千，那么就得排查命令和内存的使用

- **持久化相关的阻塞**

  对于开启了持久化功能的 Redis 节点，需要排查是否是持久化导致的阻塞。

  1. fork 阻塞
     fork 操作发生在 RDB 和 AOF 重写时，Redis 主线程调用 fork 操作产生共享 内存的子进程，由子进程完成持久化文件重写工作。如果 fork 操作本身耗时过长，必然会导致主线程的阻塞。
  2. AOF 刷盘阻塞
     当我们开启 AOF 持久化功能时，文件刷盘的方式一般采用每秒一次，后台线程每秒对 AOF 文件做 fsync 操作。当硬盘压力过大时，fsync 操作需要等 待，直到写入完成。如果主线程发现距离上一次的 fsync 成功超过 2 秒，为了 数据安全性它会阻塞直到后台线程执行 fsync 操作完成。
  3. HugePage 写操作阻塞
     对于开启 Transparent HugePages 的 操作系统，每次写命令引起的复制内存页单位由 4K 变为 2MB，放大了 512 倍，会拖慢写操作的执行时间，导致大量写操作慢查询。

### 41.大 key 问题了解吗？

大 key 指的是存储了大量数据的键，比如：

- 单个简单的 key 存储的 value 很大，size 超过 10KB
- hash，set，zset，list 中存储过多的元素（以万为单位）

推荐阅读：[阿里：发现并处理 Redis 的大 Key 和热 Key](https://help.aliyun.com/zh/redis/user-guide/identify-and-handle-large-keys-and-hotkeys)

**大 key 会造成什么问题呢？**

- 客户端耗时增加，甚至超时
- 对大 key 进行 IO 操作时，会严重占用带宽和 CPU
- 造成 Redis 集群中数据倾斜
- 主动删除、被动删等，可能会导致阻塞

**如何找到大 key?**

①、bigkeys 参数：使用 bigkeys 命令以遍历的方式分析 Redis 实例中的所有 Key，并返回整体统计信息与每个数据类型中 Top1 的大 Key

> bigkeys 命令的使用：`redis-cli --bigkeys`

![](https://cdn.tobebetterjavaer.com/stutymore/redis-20240309091503.png)

②、redis-rdb-tools：redis-rdb-tools 是由 Python 语言编写的用来分析 Redis 中 rdb 快照文件的工具。

源码地址：[https://github.com/sripathikrishnan/redis-rdb-tools/](https://github.com/sripathikrishnan/redis-rdb-tools/)

> rdb，全称 Redis DataBase，是 Redis 在内存中的数据格式的一种持久化存储方式。

![](https://cdn.tobebetterjavaer.com/stutymore/redis-20240309092121.png)

推荐阅读：[RDB 详解](https://redisbook.readthedocs.io/en/latest/internal/rdb.html)

**如何处理大 key?**

![大key处理](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-e4aaafda-fce1-47f0-8b2b-7261d47b720b.png)

①、**删除大 key**

- 当 Redis 版本大于 4.0 时，可使用 UNLINK 命令安全地删除大 Key，该命令能够以非阻塞的方式，逐步地清理传入的大 Key。
- 当 Redis 版本小于 4.0 时，建议通过 SCAN 命令执行增量迭代扫描 key，然后判断进行删除。

②、**压缩和拆分 key**

- 当 vaule 是 string 时，比较难拆分，则使用序列化、压缩算法将 key 的大小控制在合理范围内，但是序列化和反序列化都会带来额外的性能消耗。
- 当 value 是 string，压缩之后仍然是大 key 时，则需要进行拆分，将一个大 key 分为不同的部分，记录每个部分的 key，使用 multiget 等操作实现事务读取。
- 当 value 是 list/set 等集合类型时，根据预估的数据规模来进行分片，不同的元素计算后分到不同的片。

> 1. 华为 OD 的面试中出现过该题：讲一讲 Redis 的热 Key 和大 Key

### 42.Redis 常见性能问题和解决方案？

1.  Master 最好不要做任何持久化工作，包括内存快照和 AOF 日志文件，特别是不要启用内存快照做持久化。
2.  如果数据比较关键，某个 Slave 开启 AOF 备份数据，策略为每秒同步一次。
3.  为了主从复制的速度和连接的稳定性，Slave 和 Master 最好在同一个局域网内。
4.  尽量避免在压力较大的主库上增加从库。
5.  Master 调用 BGREWRITEAOF 重写 AOF 文件，AOF 在重写的时候会占大量的 CPU 和内存资源，导致服务 load 过高，出现短暂服务暂停现象。
6.  为了 Master 的稳定性，主从复制不要用图状结构，用单向链表结构更稳定，即主从关为：Master<–Slave1<–Slave2<–Slave3…，这样的结构也方便解决单点故障问题，实现 Slave 对 Master 的替换，也即，如果 Master 挂了，可以立马启用 Slave1 做 Master，其他不变。

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括 Java 基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM 等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

## Redis 应用

### 43.使用 Redis 如何实现异步队列？

我们知道 redis 支持很多种结构的数据，那么如何使用 redis 作为异步队列使用呢？
一般有以下几种方式：

- **使用 list 作为队列，lpush 生产消息，rpop 消费消息**

这种方式，消费者死循环 rpop 从队列中消费消息。但是这样，即使队列里没有消息，也会进行 rpop，会导致 Redis CPU 的消耗。
![list作为队列](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-e4b192a1-3ba7-4f4e-98de-e93f437cff7c.png)
可以通过让消费者休眠的方式的方式来处理，但是这样又会又消息的延迟问题。

-**使用 list 作为队列，lpush 生产消息，brpop 消费消息**

brpop 是 rpop 的阻塞版本，list 为空的时候，它会一直阻塞，直到 list 中有值或者超时。
![list作为队列，brpop](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-e9581e51-ffc8-4326-9af4-07816743dc88.png)

这种方式只能实现一对一的消息队列。

- **使用 Redis 的 pub/sub 来进行消息的发布/订阅**

发布/订阅模式可以 1：N 的消息发布/订阅。发布者将消息发布到指定的频道频道（channel），订阅相应频道的客户端都能收到消息。

![pub/sub](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-bc6d05be-3701-4e23-b4ca-6330c949f020.png)
但是这种方式不是可靠的，它不保证订阅者一定能收到消息，也不进行消息的存储。

所以，一般的异步队列的实现还是交给专业的消息队列。

### 44.Redis 如何实现延时队列?

可以使用 Redis 的 zset（有序集合）来实现延时队列。

![三分恶面渣逆袭：zset实现延时队列](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-54bbcc36-0b00-4142-a6eb-bf2ef48c2213.png)

第一步，将任务添加到 zset 中，score 为任务的执行时间戳，value 为任务的内容。

```bash
ZADD delay_queue 1617024000 task1
```

第二步，定期（例如每秒）从 zset 中获取 score 小于当前时间戳的任务，然后执行任务。

```bash
ZREMRANGEBYSCORE delay_queue -inf 1617024000
```

第三步，任务执行后，从 zset 中删除任务。

```bash
ZREM delay_queue task1
```

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 23 QQ 后台技术一面面试原题：Redis 实现延迟队列
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 8 Java 后端实习一面面试原题：redis 数据结构，用什么结构实现延迟消息队列

### 45.Redis 支持事务吗？

Redis 支持简单的事务，可以将多个命令打包，然后一次性的，按照顺序执行。主要通过 multi、exec、discard、watch 等命令来实现：

- multi：标记一个事务块的开始
- exec：执行所有事务块内的命令
- discard：取消事务，放弃执行事务块内的所有命令
- watch：监视一个或多个 key，如果在事务执行之前这个 key 被其他命令所改动，那么事务将被打断

![二哥的 Java 进阶之路：Redis 事务](https://cdn.tobebetterjavaer.com/stutymore/redis-20240314101439.png)

#### 说一下 Redis 事务的原理？

![三分恶面渣逆袭：Redis事务](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-2ed7ae21-16a6-4716-ac89-117a8c76d3db.png)

- 使用 MULTI 命令开始一个事务。从这个命令执行之后开始，所有的后续命令都不会立即执行，而是被放入一个队列中。在这个阶段，Redis 只是记录下了这些命令。
- 使用 EXEC 命令触发事务的执行。一旦执行了 EXEC，之前 MULTI 后队列中的所有命令会被原子地（atomic）执行。这里的“原子”意味着这些命令要么全部执行，要么（在出现错误时）全部不执行。
- 如果在执行 EXEC 之前决定不执行事务，可以使用 DISCARD 命令来取消事务。这会清空事务队列并退出事务状态。
- WATCH 命令用于实现乐观锁。WATCH 命令可以监视一个或多个键，如果在执行事务的过程中（即在执行 MULTI 之后，执行 EXEC 之前），被监视的键被其他命令改变了，那么当执行 EXEC 时，事务将被取消，并且返回一个错误。

#### Redis 事务的注意点有哪些？

Redis 事务是不支持回滚的，一旦 EXEC 命令被调用，所有命令都会被执行，即使有些命令可能执行失败。

#### Redis 事务为什么不支持回滚？

引入事务回滚机制会大大增加 Redis 的复杂性，因为需要跟踪事务中每个命令的状态，并在发生错误时逆向执行命令以恢复原始状态。

Redis 是一个基于内存的数据存储系统，其设计重点是实现高性能。事务回滚需要额外的资源和时间来管理和执行，这与 Redis 的设计目标相违背。因此，Redis 选择不支持事务回滚。

换句话说，**就是我 Redis 不想支持事务，也没有这个必要**。

#### Redis 事务的 ACID 特性如何体现？

ACID 一般指 MySQL 事务中的四个特性：原子性、一致性、隔离性、持久性。虽然 Redis 提供了事务的支持，但它在 ACID 上的表现与 MySQL 有所不同。

Redis 事务中，所有命令会依次执行，但并不支持部分失败后的自动回滚。因此 Redis 在事务层面并不能保证一致性，我们必须通过程序逻辑来进行优化。

Redis 事务在一定程度上提供了隔离性，事务中的命令会按顺序执行，不会被其他客户端的命令插入。

Redis 的持久性依赖于其持久化机制（如 RDB 和 AOF），而不是事务本身。

#### Redis事务满足原子性吗？要怎么改进？

不满足，Redis 事务不支持回滚，一旦 EXEC 命令被调用，所有命令都会被执行，即使有些命令可能执行失败。

可以通过 Lua 脚本来实现事务的原子性，Lua 脚本在 Redis 中是原子执行的，执行过程中间不会插入其他命令。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的华为一面原题：说下 Redis 事务
> 2. [二哥编程星球](https://javabetter.cn/zhishixingqiu/)球友[枕云眠美团 AI 面试原题](https://t.zsxq.com/BaHOh)：什么是 redis 的事务，它的 ACID 属性如何体现


### 46.有 Lua 脚本操作 Redis 的经验吗？

Redis 的事务不具备强制性的原子性，但可以通过 Lua 脚本来增强 Redis 的原子能力。

在 Redis 中，Lua 脚本是以原子操作的方式执行的，也就是说，在脚本执行期间，不会插入其他命令，天然保证了事务性。

比如秒杀系统是一个经典场景，我们可以用 Lua 脚本来实现扣减 Redis 库存的功能。

```java
-- 库存未预热
if (redis.call('exists', KEYS[2]) == 1) then
    return -9;
end;
-- 秒杀商品库存存在
if (redis.call('exists', KEYS[1]) == 1) then
    local stock = tonumber(redis.call('get', KEYS[1]));
    local num = tonumber(ARGV[1]);
    -- 剩余库存少于请求数量
    if (stock < num) then
        return -3
    end;
    -- 扣减库存
    if (stock >= num) then
        redis.call('incrby', KEYS[1], 0 - num);
        -- 扣减成功
        return 1
    end;
    return -2;
end;
-- 秒杀商品库存不存在
return -1;
```

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的快手同学 4 一面原题：Redis事务满足原子性吗？要怎么改进？

### 47.Redis 的管道Pipeline了解吗？

Pipeline 是 Redis 提供的一种优化手段，允许客户端一次性向服务器发送多个命令，而不必等待每个命令的响应，从而减少网络延迟。它的工作原理类似于批量操作，即多个命令一次性打包发送，Redis 服务器依次执行后再将结果一次性返回给客户端。

通常在 Redis 中，每个请求都会遵循以下流程：

1. 客户端发送命令到服务器。
2. 服务器执行命令并将结果返回给客户端。
3. 客户端接收返回结果。

每一个请求和响应之间存在一次网络通信的往返时间（RTT，Round-Trip Time），如果大量请求依次发送，网络延迟会显著增加请求的总执行时间。

有了 Pipeline 后，流程变为：

>发送命令1、命令2、命令3…… -> 服务器处理 -> 一次性返回所有结果。

例如，批量写入大量数据或执行一系列查询时，可以将这些操作打包通过 Pipeline 执行。

![三分恶面渣逆袭：Pipelining示意图](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-38aee4c1-efd2-495e-8a6d-164d21a129b1.png)

在 Pipeline 模式下，客户端不会在每条命令发送后立即等待 Redis 的响应，而是将多个命令依次写入 TCP 缓冲区，所有命令一起发送到 Redis 服务器。

Redis 服务器接收到批量命令后，依次执行每个命令。

Redis 服务器执行完所有命令后，将每条命令的结果一次性打包通过 TCP 返回给客户端。

客户端一次性接收所有返回结果，并解析每个命令的执行结果。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的京东面经同学 8 面试原题：对pipeline的理解，什么场景适合使用pipeline？有了解过pipeline的底层？ 

### 48.Redis 实现分布式锁了解吗？

分布式锁是一种用于控制多个不同进程在分布式系统中访问共享资源的锁机制。它确保在同一时刻，只有一个节点可以对资源进行访问，从而避免并发问题。

**可以使用 Redis 的 SET 命令实现分布式锁**。同时添加过期时间，以防止死锁的发生。

![三分恶面渣逆袭：set原子命令](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-710cdd19-98ea-4e96-b579-ff1ebb0d5de9.png)

```
SET key value NX PX 30000
```

- `key` 是锁名。
- `value` 是锁的持有者标识，可以使用 UUID 作为 value。
- `NX` 只在 key 不存在时才创建（避免覆盖锁）。
- `PX 30000`：设置锁的过期时间为 30 秒（防止死锁）。

用 Java 来实现就是：

```java
String lockKey = "lock:order:123";
String uniqueId = UUID.randomUUID().toString();
boolean isLocked = redisTemplate.opsForValue()
    .setIfAbsent(lockKey, uniqueId, 10, TimeUnit.SECONDS);
if (isLocked) {
    try {
        // 执行业务逻辑
    } finally {
        // 释放锁
    }
}
```

#### 什么是 setnx？

setnx 从 Redis 版本 2.6.12 开始被弃用，因为可以通过 set 命令的 NX 选项来实现相同的功能。

![截图来自Redis docs](https://cdn.tobebetterjavaer.com/stutymore/redis-20241122182250.png)

使用 setnx 创建分布式锁时，虽然设置过期时间可以避免死锁问题，但可能存在这样的问题：线程 A 获取锁后开始任务，如果任务执行时间超过锁的过期时间，锁会提前释放，导致线程 B 也获取了锁并开始执行任务。这会破坏锁的独占性，导致并发访问资源，进而造成数据不一致。

![技术派：Redis 锁](https://cdn.tobebetterjavaer.com/stutymore/redis-20241122191044.png)

可以引入锁的自动续约机制，在任务执行过程中定期续期，确保锁在任务完成之前不会过期。

![技术派：redisson 看门狗](https://cdn.tobebetterjavaer.com/stutymore/redis-20241122192038.png)

比如说 Redisson 的 RedissonLock 就支持自动续期，通过看门狗机制定期续期锁的有效期。

![二哥的Java 进阶之路：renewExpirationAsync](https://cdn.tobebetterjavaer.com/stutymore/redis-20241122192708.png)

#### Redisson 了解吗？

开发中，我们可以使用专业的轮子——[Redisson](https://xie.infoq.cn/article/d8e897f768eb1a358a0fd6300)。

![图片来源于网络](https://cdn.tobebetterjavaer.com/stutymore/redis-20240308174708.png)

Redisson 是一个基于 Redis 的 Java 驻内存数据网格，提供了一系列 API 用来操作 Redis，其中最常用的功能就是分布式锁。

```java
RLock lock = redisson.getLock("lock");
lock.lock();
try {
    // do something
} finally {
    lock.unlock();
}
```

实现源码在 RedissonLock 类中，通过 Lua 脚本封装 Redis 命令来实现，比如说 tryLockInnerAsync 源码：

![二哥的 Java 进阶之路：RedissonLock](https://cdn.tobebetterjavaer.com/stutymore/redis-20240425120229.png)

其中 hincrby 命令用于对哈希表中的字段值执行自增操作，pexpire 命令用于设置键的过期时间。

#### PmHub 系统里面的分布式锁是怎么做的？

主要通过 Redisson 框架实现的 RedLock 来完成的。

```java
// 创建 Redisson 客户端配置
Config config = new Config();
config.useClusterServers()
        .addNodeAddress("redis://127.0.0.1:6379",
                "redis://127.0.0.1:6380",
                "redis://127.0.0.1:6381"); // 假设有三个 Redis 节点
// 创建 Redisson 客户端实例
RedissonClient redissonClient = Redisson.create(config);
// 创建 RedLock 对象
RLock redLock = redissonClient.getLock("lock_key");

try {
    // 尝试获取分布式锁，最多尝试 5 秒获取锁，并且锁的有效期为 5000 毫秒
    boolean lockAcquired = redLock.tryLock(5, 5000, TimeUnit.MILLISECONDS);
    if (lockAcquired) {
        // 加锁成功，执行业务代码...
    } else {
        System.out.println("Failed to acquire the lock!");
    }
} catch (InterruptedException e) {
    Thread.currentThread().interrupt();
    System.err.println("Interrupted while acquiring the lock");
} finally {
    // 无论是否成功获取到锁，在业务逻辑结束后都要释放锁
    if (redLock.isLocked()) {
        redLock.unlock();
    }
    // 关闭 Redisson 客户端连接
    redissonClient.shutdown();
}
```

#### 你提到了Redlock，那它机制是怎么样的？

Redlock 是 Redis 作者提出的一种分布式锁实现方案，用于确保在分布式环境下安全可靠地获取锁。它的目标是在分布式系统中提供一种高可用、高容错的锁机制，确保在同一时刻，只有一个客户端能够成功获得锁，从而实现对共享资源的互斥访问。

Redisson 中的 RedLock 是基于 RedissonMultiLock（联锁）实现的。

![二哥的 Java 进阶之路：RedissonRedLock](https://cdn.tobebetterjavaer.com/stutymore/redis-20240816113330.png)

RedissonMultiLock 的 tryLock 方法会在指定的 Redis 实例上逐一尝试获取锁。

在获取锁的过程中，Redlock 会根据配置的 waitTime（最大等待时间）和 leaseTime（锁的持有时间）进行灵活控制。比如，如果获取锁的时间小于锁的有效期（通过TTL命令获取锁的剩余时间），则表示获取锁成功。

通常，至少需要多数（如 5 个实例中的 3 个）实例成功获取锁，才能认为整个锁获取成功。

如果指定了锁的持有时间（leaseTime），在成功获取锁后，Redlock 会为锁进行续期，以防止锁在操作完成之前意外失效。

#### 红锁能不能保证百分百上锁？

Redlock 不能保证百分百上锁，因为在分布式系统中，网络延迟、时钟漂移、Redis 实例宕机等因素都可能导致锁的获取失败。

#### 加分布式锁时Redis如何保证不会发生冲突？

①、使用 SET NX PX 或 SETNX 命令确保锁的获取是一个原子操作，同时设置锁的过期时间防止死锁。

比如说 `SET lock_key unique_value NX PX 5000` 命令，其中 `NX` 确保了原子操作，，如果 lock_key 已存在，SET 操作会返回 nil；`PX 5000` 设置过期时间为 5000 毫秒，避免死锁。

②、使用 Lua 脚本将锁的检查和释放操作封装为一个原子操作，确保安全地释放锁。

```
EVAL "if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end" 1 lock_key unique_value
```

③、使用 Redlock 算法确保锁的正确获取和释放。

```java
RLock lock = redisson.getLock("lock_key");
try {
    // 500ms 等待时间，10000ms 锁过期时间
    boolean isLocked = lock.tryLock(500, 10000, TimeUnit.MILLISECONDS);
    if (isLocked) {
        // 执行需要同步的操作
    }
} finally {
    lock.unlock();
}
```

#### Redisson 中的看门狗机制了解吗？

Redisson 提供的分布式锁是支持锁自动续期的，也就是说，如果线程在锁到期之前还没有执行完，那么 Redisson 会自动给锁续期。

![郭慕荣博客园：看门狗](https://cdn.tobebetterjavaer.com/stutymore/redis-20240918110433.png)

这被称为“看门狗”机制。

```java
class RedissonWatchdogExample {
    public static void main(String[] args) {
        // 配置 Redisson 客户端
        Config config = new Config();
        config.useSingleServer().setAddress("redis://127.0.0.1:6379");
        RedissonClient redisson = Redisson.create(config);

        // 获取锁对象
        RLock lock = redisson.getLock("myLock");

        try {
            // 获取锁，默认看门狗机制会启动
            lock.lock();

            // 模拟任务执行
            System.out.println("Task is running...");
            Thread.sleep(40000); // 模拟长时间任务（40秒）

            System.out.println("Task completed.");
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            // 释放锁
            lock.unlock();
        }

        // 关闭 Redisson 客户端
        redisson.shutdown();
    }
}
```

看门狗启动后，每隔 10 秒会刷新锁的过期时间，将其延长到 30 秒，确保在锁持有期间不会因为过期而释放。

当任务执行完成时，客户端调用 `unlock()` 方法释放锁，看门狗也随之停止。

#### 检查锁的过程是原子操作吗？

在 Redis 的看门狗机制中，检查锁的过程并不是单独的一个步骤，而是与锁的续期操作绑定在一起，通过 Lua 脚本完成的。因此，检查与续期是一个整体的原子操作，以确保只有持有锁的客户端才能成功续期。

```java
if redis.call('get', KEYS[1]) == ARGV[1] then
    return redis.call('expire', KEYS[1], ARGV[2])
else
    return 0
end
```


> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯 Java 后端实习一面原题：分布式锁用了 Redis 的什么数据结构
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小公司面经合集同学 1 Java 后端面试原题：Redisson 的底层原理？以及与 SETNX 的区别？
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的百度面经同学 1 文心一言 25 实习 Java 后端面试原题：redis 分布式锁的实现原理？setnx？
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小米同学 F 面试原题：自己实现 redis 分布式锁的坑（主动提了 Redission）
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯云智面经同学 20 二面面试原题：redission 的原理是什么？ setnx + lua 脚本？
> 6. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的收钱吧面经同学 1 Java 后端一面面试原题：系统里面分布式锁是怎么做的？你提到了redlock，那它机制是怎么样的？红锁能不能保证百分百上锁？
> 7. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 21  抖音商城一面面试原题：加分布式锁时redis如何保证不会发生冲突？分布式锁过期怎么办？
> 8. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的拼多多面经同学 8 一面面试原题：Redis分布式锁如何实现的
> 9. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的百度同学 4 面试原题：Setnx,知道吗? 用这个加锁有什么问题吗?怎么解决?
> 10. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的阿里系面经同学 19 饿了么面试原题：分布式锁用redis实现思路
> 11. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的京东面经同学 9 面试原题：redis的分布式锁有了解过吗
> 12. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的同学 30 腾讯音乐面试原题：redis锁有几种实现方式


GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括 Java 基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM 等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

## 底层结构

这一部分就比较深了，如果不是简历上写了精通 Redis，应该不会怎么问。

### 49.说说 Redis 底层数据结构？

Redis 的底层数据结构有**动态字符串(sds)**、**链表(list)**、**字典(ht)**、**跳跃表(skiplist)**、**整数集合(intset)**、**压缩列表(ziplist)** 等。

![三分恶面渣逆袭：Redis Object对应的映射](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-a1b2d2f9-6895-4749-9bda-9314f08bca68.png)

比如说 string 是通过 SDS 实现的，list 是通过链表实现的，hash 是通过字典实现的，set 是通过字典实现的，zset 是通过跳跃表实现的。

![三分恶面渣逆袭：类型-编码-结构](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-7cf91aa9-8db5-4abe-803e-a9e8f3bcb9e4.png)

#### 简单介绍下 SDS？

Redis 是通过 C 语言实现的，但 Redis 并没有直接使用 C 语言的字符串，而是自己实现了一种叫做动态字符串 SDS 的类型。

```c
struct sdshdr {
    int len; // buf 中已使用的长度
    int free; // buf 中未使用的长度
    char buf[]; // 数据空间
};
```

因为 C 语⾔的字符串不记录⾃身的⻓度信息，当需要获取字符串⻓度时，需要遍历整个字符串，时间复杂度为 O(N)。

⽽ SDS 保存了⻓度信息，这样就将获取字符串⻓度的时间由 O(N) 降低到了 O(1)。

![三分恶面渣逆袭：SDS](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-7c038f2c-b5ee-4229-9449-713fab3b1855.png)

#### 简单介绍下链表 linkedlist

Redis 的链表是⼀个双向⽆环链表结构，和 Java 中的 [LinkedList](https://javabetter.cn/collection/linkedlist.html) 类似。

链表的节点由⼀个叫做 listNode 的结构来表示，每个节点都有指向其前置节点和后置节点的指针，同时头节点的前置和尾节点的后置均指向 null。

![三分恶面渣逆袭：链表linkedlist](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-1adef9c0-8feb-4836-8997-84bda96e2498.png)

#### 简单介绍下字典 dict

⽤于保存键值对的抽象数据结构。Redis 使⽤ hash 表作为底层实现，一个哈希表里可以有多个哈希表节点，而每个哈希表节点就保存了字典里中的一个键值对。

每个字典带有两个 hash 表，供平时使⽤和 rehash 时使⽤，hash 表使⽤链地址法来解决键冲突，被分配到同⼀个索引位置的多个键值对会形成⼀个单向链表，在对 hash 表进⾏扩容或者缩容的时候，为了服务的可⽤性，rehash 的过程不是⼀次性完成的，⽽是渐进式的。

![三分恶面渣逆袭：字典](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-9934b4a2-c253-4d42-acf4-c6c940840779.png)

#### 简单介绍下跳表 skiplist

推荐阅读：[全网最详细的跳表文章](https://www.jianshu.com/p/9d8296562806)

跳表是有序集合 Zset 的底层实现之⼀。在 Redis 7.0 之前，如果有序集合的元素个数小于 128 个，并且每个元素的值小于 64 字节时，Redis 会使用压缩列表作为 Zset 的底层实现，否则会使用跳表；在 Redis 7.0 之后，压缩列表已经废弃，交由 listpack 来替代。

![三分恶面渣逆袭：跳表](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-886ee2a8-fb02-4908-bbba-d4ad2a211094.png)

跳表由 zskiplist 和 zskiplistNode 组成，zskiplist ⽤于保存跳表的基本信息（表头、表尾、⻓度、层高等）。

```c
typedef struct zskiplist {
    struct zskiplistNode *header, *tail;
    unsigned long length;
    int level;
} zskiplist;
```

zskiplistNode ⽤于表示跳表节点，每个跳表节点的层⾼是不固定的，每个节点都有⼀个指向保存了当前节点的分值和成员对象的指针。

```c
typedef struct zskiplistNode {
    sds ele;
    double score;
    struct zskiplistNode *backward;
    struct zskiplistLevel {
        struct zskiplistNode *forward;
        unsigned int span;
    } level[];
} zskiplistNode;
```

#### 简单介绍下整数集合 intset

⽤于保存整数值的集合抽象数据结构，不会出现重复元素，底层实现为数组。

![整数集合intset](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-833dbfb2-7c79-4e7b-a143-8a4a2936cdd8.png)

#### 简单介绍下压缩列表 ziplist

压缩列表是为节约内存⽽开发的顺序性数据结构，它可以包含任意多个节点，每个节点可以保存⼀个字节数组或者整数值。

![压缩列表组成](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-99bcbe82-1d91-41bf-8900-a240856071f5.png)

#### 简单介绍下紧凑列表 listpack

listpack 是 Redis 用来替代压缩列表（ziplist）的一种内存更加紧凑的数据结构。

![极客时间：listpack](https://cdn.tobebetterjavaer.com/stutymore/redis-20240403105313.png)

为了避免 ziplist 引起的连锁更新问题，listpack 中的元素不再像 ziplist 那样，保存其前一个元素的长度，而是保存当前元素的编码类型、数据，以及编码类型和数据的长度。

![极客时间：listpack 的元素](https://cdn.tobebetterjavaer.com/stutymore/redis-20240403105754.png)

listpack 每个元素项不再保存上一个元素的长度，而是优化元素内字段的顺序，来保证既可以从前也可以向后遍历。

但因为 List/Hash/Set/ZSet 都严重依赖 ziplist，所以这个替换之路很漫长。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动商业化一面的原题：说说 Redis 的 zset，什么是跳表，插入一个节点要构建几层索引
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 9 飞书后端技术一面面试原题：Redis 的数据类型，ZSet 的实现
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小米暑期实习同学 E 一面面试原题：你知道 Redis 的 zset 底层实现吗
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 23 QQ 后台技术一面面试原题：zset 的底层原理
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的快手面经同学 7 Java 后端技术一面面试原题：说一下 ZSet 底层结构
> 6. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团同学 9 一面面试原题：redis的数据结构底层原理？
> 7. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 27 云后台技术一面面试原题：Zset的底层实现？
> 8. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的得物面经同学 9 面试题目原题：Zset的底层如何实现？

### 50.Redis 的 SDS 和 C 中字符串相比有什么优势？

C 语言使用了一个长度为 `N+1` 的字符数组来表示长度为 `N` 的字符串，并且字符数组最后一个元素总是 `\0`，这种简单的字符串表示方式 不符合 Redis 对字符串在安全性、效率以及功能方面的要求。

![C语言的字符串](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-2541fd26-4e84-467d-8d8c-c731154a85d7.png)

#### C 语言的字符串可能有什么问题？

这样简单的数据结构可能会造成以下一些问题：

- **获取字符串长度复杂度高** ：因为 C 不保存数组的长度，每次都需要遍历一遍整个数组，时间复杂度为 O(n)；
- 不能杜绝 **缓冲区溢出/内存泄漏** 的问题 : C 字符串不记录自身长度带来的另外一个问题是容易造成缓存区溢出（buffer overflow），例如在字符串拼接的时候，新的
- C 字符串 **只能保存文本数据** → 因为 C 语言中的字符串必须符合某种编码（比如 ASCII），例如中间出现的 `'\0'` 可能会被判定为提前结束的字符串而识别不了；

#### Redis 如何解决？优势？

![Redis sds](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-fc26a4e7-1c8d-4e82-b7f8-1f6b43d16d38.png)

简单来说一下 Redis 如何解决的：

1. **多增加 len 表示当前字符串的长度**：这样就可以直接获取长度了，复杂度 O(1)；
2. **自动扩展空间**：当 SDS 需要对字符串进行修改时，首先借助于 `len` 和 `alloc` 检查空间是否满足修改所需的要求，如果空间不够的话，SDS 会自动扩展空间，避免了像 C 字符串操作中的溢出情况；
3. **有效降低内存分配次数**：C 字符串在涉及增加或者清除操作时会改变底层数组的大小造成重新分配，SDS 使用了 **空间预分配** 和 **惰性空间释放** 机制，简单理解就是每次在扩展时是成倍的多分配的，在缩容是也是先留着并不正式归还给 OS；
4. **二进制安全**：C 语言字符串只能保存 `ascii` 码，对于图片、音频等信息无法保存，SDS 是二进制安全的，写入什么读取就是什么，不做任何过滤和限制；

### 51.字典是如何实现的？Rehash 了解吗？

字典是 Redis 服务器中出现最为频繁的复合型数据结构。除了 **hash** 结构的数据会用到字典外，整个 Redis 数据库的所有 `key` 和 `value` 也组成了一个 **全局字典**，还有带过期时间的 `key` 也是一个字典。_(存储在 RedisDb 数据结构中)_

#### 字典结构是什么样的呢？

**Redis** 中的字典相当于 Java 中的 **HashMap**，内部实现也差不多类似，采用哈希与运算计算下标位置；通过 **"数组 + 链表" **的**链地址法** 来解决哈希冲突，同时这样的结构也吸收了两种不同数据结构的优点。

![Redis字典结构](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-e08347a6-efd5-47c0-9adb-23baff82dbbd.png)

#### 字典是怎么扩容的？

字典结构内部包含 **两个 hashtable**，通常情况下只有一个哈希表 `ht[0]` 有值，在扩容的时候，把 `ht[0]`里的值 rehash 到 `ht[1]`，然后进行 **渐进式 rehash** ——所谓渐进式 rehash，指的是这个 rehash 的动作并不是一次性、集中式地完成的，而是分多次、渐进式地完成的。

待搬迁结束后，`h[1]`就取代 `h[0]`存储字典的元素。

### 52.跳表是如何实现的？原理？

跳表是一种有序的数据结构，它通过在每个节点中维持多个指向其它节点的指针，从而达到快速访问节点的目的。

![三分恶面渣逆袭：跳表](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-08391728-5ba8-42a0-a287-9284451e0ee7.png)

#### 为什么使用跳表？

首先，因为 zset 要支持随机的插入和删除，所以它 **不宜使用数组来实现**，关于排序问题，我们也很容易就想到 **红黑树/ 平衡树** 这样的树形结构，为什么 Redis 不使用这样一些结构呢？

1. **性能考虑：** 在高并发的情况下，树形结构需要执行一些类似于 rebalance 这样的可能涉及整棵树的操作，相对来说跳跃表的变化只涉及局部；
2. **实现考虑：** 在复杂度与红黑树相同的情况下，跳跃表实现起来更简单，看起来也更加直观；

基于以上的一些考虑，Redis 基于 **William Pugh** 的论文做出一些改进后采用了 **跳跃表** 这样的结构。

本质是解决查找问题。

#### 跳跃表是怎么实现的？

跳跃表的节点里有这些元素：

①、**层**

跳跃表节点的 level 数组可以包含多个元素，每个元素都包含一个指向其它节点的指针，程序可以通过这些层来加快访问其它节点的速度，一般来说，层的数量月多，访问其它节点的速度就越快。

每次创建一个新的跳跃表节点的时候，程序都根据幂次定律，随机生成一个介于 1 和 32 之间的值作为 level 数组的大小，这个大小就是层的“高度”

②、**前进指针**

每个层都有一个指向表尾的前进指针（`level[i].forward` 属性），用于从表头向表尾方向访问节点。

我们看一下跳跃表从表头到表尾，遍历所有节点的路径：

![三分恶面渣逆袭：通过前进指针遍历](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-b153f782-e2e5-4f98-b251-04f06e16c073.png)

③、**跨度**

层的跨度用于记录两个节点之间的距离。跨度是用来计算排位（rank）的：在查找某个节点的过程中，将沿途访问过的所有层的跨度累计起来，得到的结果就是目标节点在跳跃表中的排位。

例如查找，分值为 3.0、成员对象为 o3 的节点时，沿途经历的层：查找的过程只经过了一个层，并且层的跨度为 3，所以目标节点在跳跃表中的排位为 3。

![三分恶面渣逆袭：计算节点的排位](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-d2395b7e-2f31-4ca8-b06d-2cb47afaeb74.png)

④、**分值和成员**

节点的分值（score 属性）是一个 double 类型的浮点数，跳跃表中所有的节点都按分值从小到大来排序。

节点的成员对象（obj 属性）是一个指针，它指向一个字符串对象，而字符串对象则保存这一个 SDS 值。

#### 为什么 hash 表范围查询效率比跳表低？

哈希表是一种基于键值对的数据结构，主要用于快速查找、插入和删除操作。

哈希表通过计算键的哈希值来确定值的存储位置，这使得它在单个元素的访问上非常高效，时间复杂度为 O(1)。

然而，哈希表内的元素是无序的。因此，对于范围查询（如查找所有在某个范围内的元素），哈希表无法直接支持，必须遍历整个表来检查哪些元素满足条件，这使得其在范围查询上的效率低下，时间复杂度为 O(n)。

跳表是一种有序的数据结构，能够保持元素的排序顺序。

它通过多层的链表结构实现快速的插入、删除和查找操作，其中每一层都是下一层的一个子集，并且元素在每一层都是有序的。

当进行范围查询时，跳表可以从最高层开始，快速定位到范围的起始点，然后沿着下一层继续直到找到范围的结束点。这种分层的结构使得跳表在进行范围查询时非常高效，时间复杂度为 O(log n) 加上范围内元素的数量。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的小米暑期实习同学 E 一面面试原题：为什么 hash 表范围查询效率比跳表低
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 23 QQ 后台技术一面面试原题：zset 的底层原理
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的得物面经同学 8 一面面试原题：跳表的结构
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团面经同学 4 一面面试原题：Redis 跳表
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的阿里系面经同学 19 饿了么面试原题：跳表了解吗

### 53.压缩列表了解吗？

压缩列表是 Redis **为了节约内存** 而使用的一种数据结构，由一系列特殊编码的连续内存块组成的顺序型数据结构。

![三分恶面渣逆袭：压缩列表组成部分](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-6be492f7-9f92-4607-a4c4-81a612a3d7bd.png)

hash、list、zset 在元素较少时会使用压缩列表。

![截图来自 Redis 官网](https://cdn.tobebetterjavaer.com/stutymore/redis-20241225105623.png)

一个压缩列表包含任意多个节点，每个节点可以保存一个字节数组或者一个整数值。

![三分恶面渣逆袭：压缩列表示例](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-b5d224c2-53ee-40a3-9efc-2feb7dd3d7a8.png)

- **zlbyttes**：记录整个压缩列表占用的内存字节数
- **zltail**：记录压缩列表表尾节点距离压缩列表的起始地址有多少字节
- **zllen**：记录压缩列表包含的节点数量
- **entryX**：列表节点
- **zlend**：用于标记压缩列表的末端


> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的同学 30 腾讯音乐面试原题：什么情况下使用压缩列表

### 54.快速列表 quicklist 了解吗？

Redis 早期版本存储 list 列表数据结构使用的是压缩列表 ziplist 和普通的双向链表 linkedlist，也就是说当元素少时使用 ziplist，当元素多时用 linkedlist。

但考虑到链表的附加空间相对较高，`prev` 和 `next` 指针就要占去 `16` 个字节（64 位操作系统占用 `8` 个字节），另外每个节点的内存都是单独分配，会家具内存的碎片化，影响内存管理效率。

后来 Redis 新版本（3.2）对列表数据结构进行了改造，使用 `quicklist` 代替了 `ziplist` 和 `linkedlist`，quicklist 是综合考虑了时间效率与空间效率引入的新型数据结构。

quicklist 由 list 和 ziplist 结合而成，它是一个由 ziplist 充当节点的双向链表。
![quicklist](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/sidebar/sanfene/redis-3b9785b0-6573-4c2d-8b7d-d5d1be799e26.png)

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括 Java 基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM 等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

## 补充

### 55.假如 Redis 里面有 1 亿个 key，其中有 10w 个 key 是以某个固定的已知的前缀开头的，如何将它们全部找出来？

使用 `keys` 指令可以扫出指定模式的 key 列表。但是要注意 keys 指令会导致线程阻塞一段时间，线上服务会停顿，直到指令执行完毕，服务才能恢复。这个时候可以使用 `scan` 指令，`scan` 指令可以无阻塞的提取出指定模式的 `key` 列表，但是会有一定的重复概率，在客户端做一次去重就可以了，但是整体所花费的时间会比直接用 `keys` 指令长。

### 56.Redis 的秒杀场景下扮演了什么角色？（补充）

秒杀主要是指大量用户集中在短时间内对服务器进行访问，从而导致服务器负载剧增，可能出现系统响应缓慢甚至崩溃的情况。

针对秒杀的场景来说，最终抢到商品的用户是固定的，也就是说 100 个人和 10000 个人来抢一个商品，最终都只能有 100 个人抢到。

但是对于秒杀活动的初心来说，肯定是希望参与的用户越多越好，但真正开始下单时，最好能把请求控制在服务器能够承受的范围之内（😂）。

![许令波-秒杀系统的设计](https://cdn.tobebetterjavaer.com/stutymore/redis-20240420102552.png)

解决这一问题的关键就在于错峰削峰和限流。当然了，前端页面的静态化、按钮防抖也能够有效的减轻服务器的压力。

- 页面静态化：将商品详情等页面静态化，使用 CDN 分发。
- 按钮防抖：避免用户因频繁点击造成的额外请求，比如设定间隔时间后才能再次点击。

#### 如何实现错峰削峰呢？

针对车流量的晚高峰和早高峰，最强有力的办法就是限行，但限行不是无损的，毕竟限行的牌号无法出行。

无损的方式就是有的车辆早出发，有的车辆晚出发，这样就能够实现错峰出行。

在秒杀场景下，可以通过以下几种方式实现错峰削峰：

①、**预热缓存**：提前将热点数据加载到 Redis 缓存中，减少对数据库的访问压力。

②、**消息队列**：引入消息队列，将请求异步处理，减少瞬时请求压力。消息队列就像一个水库，可以削减上游的洪峰流量。

![许令波-排队](https://cdn.tobebetterjavaer.com/stutymore/redis-20240420104633.png)

③、**多阶段多时间窗口**：将秒杀活动分为多个阶段，每个阶段设置不同的时间窗口，让用户在不同的时间段内参与秒杀活动。

④、**插入答题系统**：在秒杀活动中加入答题环节，只有答对题目的用户才能参与秒杀活动，这样可以减少无效请求。

![许令波-答题](https://cdn.tobebetterjavaer.com/stutymore/redis-20240420104921.png)

#### 如何限流呢？

采用令牌桶算法，它就像在帝都买车，摇到号才有资格，没摇到就只能等下一次（😁）。

在实际开发中，我们需要维护一个容器，按照固定的速率往容器中放令牌（token），当请求到来时，从容器中取出一个令牌，如果容器中没有令牌，则拒绝请求。

![李子捌：令牌桶](https://cdn.tobebetterjavaer.com/stutymore/redis-20240420114025.png)

第一步，使用 Redis 初始化令牌桶：

```shell
redis-cli SET "token_bucket" "100"
```

第二步，使用 Lua 脚本实现令牌桶算法；假设每秒向桶中添加 10 个令牌，但不超过桶的最大容量。

```lua
-- Lua 脚本来添加令牌，并确保不超过最大容量
local bucket = KEYS[1]
local add_count = tonumber(ARGV[1])
local max_tokens = tonumber(ARGV[2])
local current = tonumber(redis.call('GET', bucket) or 0)
local new_count = math.min(current + add_count, max_tokens)
redis.call('SET', bucket, tostring(new_count))
return new_count
```

第三步，使用 Shell 脚本调用 Lua 脚本：

```shell
#!/bin/bash
while true; do
    redis-cli EVAL "$(cat add_tokens.lua)" 1 token_bucket 10 100
    sleep 1
done
```

第四步，当请求到达时，需要检查并消耗一个令牌。

```lua
-- Lua 脚本来消耗一个令牌
local bucket = KEYS[1]
local tokens = tonumber(redis.call('GET', bucket) or 0)
if tokens > 0 then
    redis.call('DECR', bucket)
    return 1  -- 成功消耗令牌
else
    return 0  -- 令牌不足
end
```

调用 Lua 脚本：

```shell
redis-cli EVAL "$(cat consume_token.lua)" 1 token_bucket
```

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的农业银行面经同学 3 Java 后端面试原题：秒杀问题（错峰、削峰、前端、流量控制）
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的滴滴面经同学 3 网约车后端开发一面原题：限流算法

### 57. 客户端宕机后 Redis 服务端如何感知到？

每个客户端在 Redis 中维护一个特定的键（称为心跳键），用于表示客户端的健康状态。该键具有一个设置的超时时间，例如 10 秒。

客户端定期（如每 5 秒）更新这个心跳键的超时时间，保持它的存活状态，通常通过 SET 命令重设键的过期时间。

```java
import redis.clients.jedis.Jedis;

public class ClientHeartbeat {
    private static final String HEARTBEAT_KEY = "client:heartbeat";
    private static final int EXPIRE_TIME = 10; // 10秒

    public static void main(String[] args) {
        // 创建 Redis 连接
        Jedis jedis = new Jedis("localhost");

        // 定时更新心跳键
        while (true) {
            try {
                // 设置心跳键并设置过期时间
                jedis.setex(HEARTBEAT_KEY, EXPIRE_TIME, "alive");

                // 打印心跳日志
                System.out.println("Heartbeat sent.");

                // 等待一段时间后再次发送心跳
                Thread.sleep(5000); // 每5秒发送一次心跳
            } catch (InterruptedException e) {
                e.printStackTrace();
                break;
            }
        }
    }
}
```

Redis 服务端定期检查这个心跳键。如果发现该键已超时并被 Redis 自动删除，说明客户端可能已宕机。

```java
import redis.clients.jedis.Jedis;

public class ServerMonitor {
    private static final String HEARTBEAT_KEY = "client:heartbeat";

    public static void main(String[] args) {
        // 创建 Redis 连接
        Jedis jedis = new Jedis("localhost");

        // 定期检查心跳键
        while (true) {
            try {
                // 检查心跳键是否存在
                if (jedis.exists(HEARTBEAT_KEY)) {
                    System.out.println("Client is alive.");
                } else {
                    System.out.println("Client is down or disconnected.");
                }

                // 每隔一段时间检查一次
                Thread.sleep(10000); // 每10秒检查一次
            } catch (InterruptedException e) {
                e.printStackTrace();
                break;
            }
        }
    }
}
```


> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 21  抖音商城一面面试原题：如果客户端宕机服务器如何感知？

---

图文详解 57 道 Redis 面试高频题，这次吊打面试官，我觉得稳了（手动 dog）。整理：沉默王二，戳[转载链接](https://mp.weixin.qq.com/s/19u34NXALB1nOlBCE6Eg-Q)，作者：三分恶，戳[原文链接](https://mp.weixin.qq.com/s/iJtNJYgirRugNBnzxkbB4Q)。

_没有什么使我停留——除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟_。

**系列内容**：

- [面渣逆袭 Java SE 篇 👍](https://javabetter.cn/sidebar/sanfene/javase.html)
- [面渣逆袭 Java 集合框架篇 👍](https://javabetter.cn/sidebar/sanfene/javathread.html)
- [面渣逆袭 Java 并发编程篇 👍](https://javabetter.cn/sidebar/sanfene/collection.html)
- [面渣逆袭 JVM 篇 👍](https://javabetter.cn/sidebar/sanfene/jvm.html)
- [面渣逆袭 Spring 篇 👍](https://javabetter.cn/sidebar/sanfene/spring.html)
- [面渣逆袭 Redis 篇 👍](https://javabetter.cn/sidebar/sanfene/redis.html)
- [面渣逆袭 MyBatis 篇 👍](https://javabetter.cn/sidebar/sanfene/mybatis.html)
- [面渣逆袭 MySQL 篇 👍](https://javabetter.cn/sidebar/sanfene/mysql.html)
- [面渣逆袭操作系统篇 👍](https://javabetter.cn/sidebar/sanfene/os.html)
- [面渣逆袭计算机网络篇 👍](https://javabetter.cn/sidebar/sanfene/network.html)
- [面渣逆袭 RocketMQ 篇 👍](https://javabetter.cn/sidebar/sanfene/rocketmq.html)
- [面渣逆袭分布式篇 👍](https://javabetter.cn/sidebar/sanfene/fenbushi.html)
- [面渣逆袭微服务篇 👍](https://javabetter.cn/sidebar/sanfene/weifuwu.html)
- [面渣逆袭设计模式篇 👍](https://javabetter.cn/sidebar/sanfene/shejimoshi.html)
- [面渣逆袭 Linux 篇 👍](https://javabetter.cn/sidebar/sanfene/linux.html)

---

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括 Java 基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM 等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
