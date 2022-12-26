---
category:
  - 数据库
tag:
  - Redis
---

# Redis入门(适合新手)

说起来，可能有些小伙伴会不相信，我是第一次用 Redis，真的。因为公司小，业务量小，Redis 根本派不上用场。不过，最近打算把系统升级一下，顺带把当下时髦的技术入个门，“与时俱进”嘛，虽然进的有“一点点”晚（注意双引号）。

作为一名富有责任心的技术博主，我觉得有必要把我入门 Redis 的过程分享出来，供一些小伙伴作为参考。要是我哪里写错了，别客气，过来给我一巴掌，就行了（温柔点，别打肿，影响颜值就不好了）。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/rumen-fe7d042b-efed-469c-9460-fb3bc1d4c041.jpg)

### 01、Redis 是什么

Redis 是互联网技术领域中使用最广泛的存储中间件，它是 **Re**mote **Di**ctionary **S**ervice 三个单词中加粗字母的组合。你别说，组合起来后念着挺自然的。

Redis 以超高的性能、完美的文档、简洁的源码著称，国内外很多大型互联网公司都在用，比如说阿里、腾讯、GitHub、Stack Overflow 等等。它的版本更新非常的快，功能也越来越强大，最初只是用来作为缓存数据库，现在已经可以用它来实现消息队列了。

可以这么说吧，掌握 Redis 已经变成了一项后端工程师必须具备的基础技能。

Redis 的作者是一名意大利人，网名 Antirez，长相还是过得去的，感兴趣的小伙伴可以 Google 一下。知道为什么 Redis 的默认端口是 6379 吗？

据说是手机键盘上“MERZ”的位置决定的，小伙伴们可以打开自己手机上九宫格键盘感受一下。“MERZ”是什么意思呢？据说是“愚蠢”的意思。这？是不是感觉程序员的生活中还是有蛮多神秘色彩的？

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/rumen-ced599df-4791-4777-970f-20ceeeb39e68.jpg)

### 02、安装 Redis

Redis 针对不同的操作系统有不同的安装方式，我们这篇入门的文章就以 Windows 为例吧。

下载地址如下：

[https://github.com/MicrosoftArchive/redis/releases](https://github.com/MicrosoftArchive/redis/releases)

Windows 最新的版本是 3.2.100。从下图中可以看得出，Redis 的体积非常的轻量级，还不到 6 M。体积越小，让我感觉 Redis 越牛逼，你是不是也有这种感觉？

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/rumen-a6709cca-d3a3-4381-b110-0ff37d384f27.jpg)

有两种安装方式，第一种是 msi 的方式，双击运行后安装；第二种是免安装，绿色版，只需要把 zip 包解压就可以了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/rumen-f3fc9852-7505-45ed-8ce2-d16f1d888251.jpg)

里面有一份英文版的文档——Windows Service Documentation.docx，教我们如何安装 Redis 服务、如何启动、如何关闭，以及如何使用自定义端口启动服务。

打开命令行，进入到当前解压后的目录，输入启动命令：

```
redis-server redis.windows.conf
```

然后你就会看到 Redis 启动后的欢迎画面，左边这个盒子感觉好有艺术感啊！有小伙伴知道是怎么生成的吗？

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/rumen-69b11133-7aac-4f8a-aa1e-9e8af576ad32.jpg)

还有一些其他的提示信息：

- Redis 当前的版本号为 3.2.100
- 端口是 6379
- 进程 ID，也就是 PID 为 12636
- Redis 官方地址为：http://redis.io

那如何停止服务呢？可以直接按下 `Ctrl+C` 组合键——粗暴、壁咚（当然可以直接点右上角的叉号）。

PS：本来想用 Linux 版或者 OSX 版的，怕入门的小伙伴没有环境。后面可以整一个。

### 03、Redis 的数据结构

Redis 有 5 种基础数据结构，String、Hash、List、Set、SortedSet，也是学 Redis 必须掌握的。除此之外，还有 HyperLogLog、Geo、Pub/Sub，算是高级数据结构了。我们这篇入门的文章就以 String 为例吧。

String 结构使用非常广泛，比如说把用户的登陆信息转成 JSON 字符串后缓存起来，等需要取出的时候再反序列化一次。

小伙伴们应该都知道，Java 的 String 是不可变的，无法修改。Redis 的 String 是动态的，可以修改的，两者不同哦。关于 Redis 的 String 结构，我觉得老钱的 Redis 教程上讲得非常明白，大家一起拜读下。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/rumen-d9aca13e-053e-4aea-a8cb-d77b01e5035a.jpg)

>Redis 的 String 在内部结构实现上类似于 Java 的 ArrayList，采用预分配冗余空间的方式来减少内存的频繁分配。如上图所示，当前字符串实际分配的空间为 capacity，一般高于实际的字符串长度 len。当字符串长度小于 1M 时，扩容是对现有空间的成倍增长；如果长度超过 1M 时，扩容一次只会多增加 1M 的空间。最大长度为 512M。

### 04、实操 Redis

好了好了，我估计很多小伙伴们已经整装待发，准备实操一把了。这就来。

Redis 的解压目录下有一个名叫 redis-cli.exe 的文件，这是 Redis 自带的一个客户端工具，可以用来连接之前我们启动好的 Redis 服务。双击启动它。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/rumen-4fd63521-b07e-41c6-bcbd-b7acb2a81344.jpg)

这个客户端还是非常智能的，当键入命令的时候，会跳出对应的提示

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/rumen-6ca5d00d-4b5d-4475-a49c-9937e22f97af.jpg)

当按下空格跟进关键字的时候，对应位置上的提示会自动消失。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/rumen-656ec70a-c053-44ab-b078-a5c77386bee6.jpg)

以下是完整的键值对测试命令，小伙伴们可以按照格式动手实操一把。

```
> set name cmower
OK
> get name
"cmower"
> exists name
(integer) 1
> del name
(integer) 1
> get name
(nil)
```

1）set 命令用来存储一个键值对，在本例中，name 为 key，cmower 为 值。

2）get 命令用来获取一个键值对。

3）exists 命令用来测试一个键值对是否存在，`(integer) 1` 表示存在，`(integer) 0` 表示不存在。

4）del 命令用来删除一个键值对，`(integer) 1` 表示执行成功，`(integer) 0` 表示执行失败。

5）当键值对删除后，再通过 get 命令获取时，结果就为 `(nil)` 。

可能有小伙伴会好奇，`nil` 是什么意思？它是 Objective-C、Swift、Ruby、Lua 等编程语言中的一个关键字，更详细的解释可以看一下《Programming in Lua 程序设计第二版》：

>nil 是一种类型，它只有一个值 nil，它的主要功能是用于区别其他任何值，就像之前所说的，一个全局变量在第一次赋值前的默认值就是 nil，将 nil 赋予一个全局变量等同于删除它，Lua 将 nil 用于表示一种“无效值(non-value)”的情况，即没有任何有效值的情况。


想了解 Redis 命令的具体使用方法，可以参考以下链接：

[http://redisdoc.com/index.html](http://redisdoc.com/index.html)

是 [Redis Command Reference](http://redis.io/commands) 和 [Redis Documentation](http://redis.io/documentation) 的中文翻译版，良心吧？

### 05、在 Java 中使用 Redis

有些小伙伴可能会问，“二哥，我是一名 Java 程序员，我该如何在 Java 中使用 Redis 呢？”这个问题问得好，这就来，这就来。

第一步，在项目中添加 Jedis（Java 和 Redis 的混拼） 依赖：

```
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
    <version>3.2.0</version>
</dependency>
```

第二步，新建 UserInfo（用户信息）类：

```java
public class UserInfo {
    private String name;
    private int age;

    public UserInfo(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return "UserInfo{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }

    // getter / setter
}
```

第三步，在项目中添加 Gson（用于序列化和反序列化用户信息） 依赖：

```
<dependency>
    <groupId>com.google.code.gson</groupId>
    <artifactId>gson</artifactId>
    <version>2.8.6</version>
    <scope>compile</scope>
</dependency>
```

第四步，新建测试类 RedisTest：

```java
public class RedisTest {
    private static final String REDIS_KEY = "user";
    public static void main(String[] args) {
        Jedis jedis = new Jedis("localhost", 6379);

        Gson gson = new Gson();
        UserInfo userInfo = new UserInfo("沉默王二", 18);

        jedis.set(REDIS_KEY, gson.toJson(userInfo));
        UserInfo getUserInfoFromRedis = gson.fromJson(jedis.get(REDIS_KEY),UserInfo.class);

        System.out.println("get：" + getUserInfoFromRedis);

        System.out.println("exists：" + jedis.exists(REDIS_KEY));
        System.out.println("del：" + jedis.del(REDIS_KEY));
        System.out.println("get：" + jedis.get(REDIS_KEY));
    }
}
```

1）REDIS_KEY 常量为存储用户信息到 Redis 的 key。

2）在 Jedis 的帮助下，Java 连接 Redis 服务变得非常简单，只需要一行代码：

```java
Jedis jedis = new Jedis("localhost", 6379);
```

参数分别是主机名，端口号。

存储键值对用 `set()` 方法，获取键值对用 `get()` 方法，判断键值对是否存在用 `exists()` 方法，删除键值对用 `del()` 方法。

3）Gson 是谷歌提供的一个开源库，可以将 Java 对象序列化为 JSON 字符串，同样可以将 JSON 字符串反序列化（解析）为匹配的 Java 对象。

使用起来也非常简单，`toJson()` 方法将对象转成 JSON 字符串，`fromJson()` 方法将 JSON 字符串反序列化对象。

好了，来看一下程序的输出结果：

```
get：UserInfo{name='沉默王二', age=18}
exists：true
del：1
get：null
```

完全符合我们的预期，perfect！

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/redis/rumen-7135d995-f563-4021-b364-411b1be07b5a.jpg)


### 06、鸣谢

好了，我亲爱的小伙伴们，以上就是本文的全部内容了，是不是看完后很想实操一把 Redis，赶快行动吧！如果你在学习的过程中遇到了问题，欢迎随时和我交流，虽然我也是个菜鸟，但我有热情啊。

另外，如果你想写入门级别的文章，这篇就是最好的范例。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
