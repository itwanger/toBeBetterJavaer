---
category:
  - 数据库
tag:
  - MongoDB
---

# MongoDB最基础入门教程


我以为我对MongoDB十分了解，直到我遇到了字节面试官

有时候不得不感慨一下，系统升级真的是好处多多，不仅让我有机会重构了之前的烂代码，也满足了我积极好学的虚荣心。你看，[Redis 入门](https://mp.weixin.qq.com/s/NPJkMy5RppyFk9QhzHxhrw)了、[Elasticsearch 入门](https://mp.weixin.qq.com/s/ZjsZxle7m_dfmVwVkq2ayg)了，这次又要入门 MongoDB，感觉自己变秃的同时，也变强大了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mongodb/rumen-a1f2d203-e586-4ca1-8556-e1a94c6b411e.jpg)

小伙伴们在继续阅读之前，我必须要声明一点，我对 MongoDB 并没有进行很深入的研究，仅仅是因为要用，就学一下。但作为一名负责任的技术博主，我是花了心思的，这篇入门教程，小伙伴们读完后绝对会感到满意，忍不住点赞。

当然了，小伙伴们遇到文章中有错误的地方，不要手下留情，可以组团过来捶我，但要保证一点，不要打脸，我怕毁容。


### 01、MongoDB 是什么

>MongoDB 是一个基于分布式的文件存储数据库，旨在为 Web 应用提供可扩展的高性能数据存储解决方案。

以上引用来自于官方，不得不说，解释得文绉绉的。那就让我来换一种通俗的说法给小伙伴们解释一下，MongoDB 将数据存储为一个文档（类似于 JSON 对象），数据结构由键值对组成，类似于 Java 中的 Map，通过 key 的方式访问起来效率就高得多，对吧？这也是 MongoDB 最重要的特点。

MongoDB 提供了企业版（功能更强大）和社区版，对于我们开发者来说，拿社区版来学习和使用就足够了。MongoDB 的驱动包很多，常见的编程语言都有覆盖到，比如说 Java、JavaScript、C++、C#、Python 等等。

很多知名的互联网公司都在用 MongoDB，比如说谷歌、Facebook、eBay 等等。总之，值得信赖，小伙伴们放心入门，技多不压身啊，就当是给自己一次学习的机会。

### 02、安装 MongoDB

MongoDB 针对不同的操作系统有不同的安装包，我们这篇入门的文章就以 Windows 为例吧。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mongodb/rumen-557ab648-e2c4-4309-8695-aeb7fbcba25b.jpg)

官网下载地址如下：

[https://www.mongodb.com/download-center/community](https://www.mongodb.com/download-center/community)

最新的版本是 4.2.6，我选择的是安装版，msi 格式的，264M 左右。下载完就可以双击运行安装，傻瓜式的。

建议选择「Custom」自定义安装，如下图所示。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mongodb/rumen-42330ff2-598a-40bf-b252-480704c6a531.jpg)

以服务模式运行，并配置好数据和日志目录，如下图所示。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mongodb/rumen-c71a31d4-5a99-4c12-93a9-348aa79bc086.jpg)

建议取消勾选安装 MongoDB 的图形化客户端工具，否则安装速度慢到你想要去扣会手机。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mongodb/rumen-84ea8b51-6b53-4500-86fa-0dcfa61b84cd.jpg)

安装完成后进入到 bin 目录下，双击 mongo.exe 文件就可以连接到 MongoDB 服务了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mongodb/rumen-bcf34981-0c2b-4f86-94e0-711dfb307371.jpg)


1）MongoDB 的默认端口号为 27017。

2）MongoDB 的版本号为 4.2.6。

默认会连接到 test 文档（相当于数据），可以通过 db 命令查询。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mongodb/rumen-ded1c30c-9943-4061-8fa3-4562387b72cd.jpg)

还可以运行一些简单的算术运算：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mongodb/rumen-22c1d414-6ba4-47dd-beb8-f1003f21083e.jpg)

那如何停止服务呢？可以直接点击右上角的 X 号——粗暴、壁咚。

### 03、安装 Robo 3T

Robo 3T 提供了对 MongoDB 和 SCRAM-SHA-256（升级的 mongo shell）的支持，是一款轻量级的 MongoDB 客户端工具。

下载地址如下：

[https://robomongo.org/download](https://robomongo.org/download)

最新的版本是 1.3，选择 zip 格式进行下载，23M 左右。下载完成后，解压就行了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mongodb/rumen-b178e02c-23b6-4b54-92ec-3a170a8499d0.jpg)


包目录不再一一解释了，进入 bin 目录下，双击运行 robo3t.exe 文件，启动 Robo 3T 客户端。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mongodb/rumen-99717a12-c90d-4a03-941d-f3857f503d44.jpg)

点击「Create」创建一个 MongoDB 的连接。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mongodb/rumen-11866209-6a60-4a6a-9ca9-fcd9279796f6.jpg)

连接成功后，就可以操作 MongoDB 了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mongodb/rumen-753dfcd7-1557-4837-9a7e-94b2ff9db72a.jpg)

（不过，小伙伴们这时候也不太知道该怎么操作，毕竟 MongoDB 的一些相关概念还不清楚，无从下手啊）

### 04、MongoDB 的相关概念

随着互联网的极速发展，用户数据也越来越庞大，NoSQL 数据库的发展能够很好地处理这些大的数据，MongoDB 是 NoSQL 数据库中的一个典型的代表。

说到这，可能有些小伙伴们还不知道 NoSQL 是啥意思，我简单解释一下。NoSQL 可不是没有 SQL 的意思，它实际的含义是 Not Only SQL，也就是“不仅仅是 SQL”，指的是非关系型数据库，和传统的关系型数据库 MySQL、Oracle 不同。

MongoDB 命名源于英文单词 hu**mongo**us，意思是「巨大无比」，可以看得出 MongoDB 的野心。MongoDB 的数据以类似于 JSON 格式的二进制文档存储：

```
{
    name: "沉默王二",
    age: 18,
    hobbies: ["写作", "敲代码"]
}
```

在进行下一步之前，需要先来理解 MongoDB 中的几个关键概念，比如说什么是集合，什么是文档，什么是字段等等。MongoDB 虽然是非关系型数据库，但和关系型数据库非常相似。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mongodb/rumen-814acc38-8934-47f9-991c-666466601bd7.jpg)


看完上面这幅图（图片来源于好朋友 macrozheng 的文章），是不是瞬间就清晰了？


### 05、在 Java 中使用 MongoDB 

有些小伙伴可能会问，“二哥，我是一名 Java 程序员，我该如何在 Java 中使用 MongoDB 呢？”这个问题问得好，这就来，这就来。


第一步，在项目中添加 MongoDB 驱动依赖：

```
<dependency>
    <groupId>org.mongodb</groupId>
    <artifactId>mongodb-driver-sync</artifactId>
    <version>4.0.3</version>
</dependency>
```

第二步，新建测试类 MongoDBTest：

```java
public class MongoDBTest {
    public static void main(String[] args) {
        MongoClient mongoClient = MongoClients.create();
        MongoDatabase database = mongoClient.getDatabase("mydb");
        MongoCollection<Document> collection = database.getCollection("test");

        Document doc = new Document("name", "沉默王二")
                .append("age", "18")
                .append("hobbies", Arrays.asList("写作", "敲代码"));
        collection.insertOne(doc);

        System.out.println("集合大小：" +collection.countDocuments());

        Document myDoc = collection.find().first();
        System.out.println("文档内容：" + myDoc.toJson());
    }
}
```

1）MongoClient 为 MongoDB 提供的客户端连接对象，不指定主机名和端口号的话，默认就是“localhost”和“27017”。

如果小伙伴想自定义主机名和端口号的话，也可以通过字符串的形式：

```java
MongoClient mongoClient = MongoClients.create("mongodb://localhost:27017");
```

是不是感觉和 MySQL 的连接字符串挺像的？

2）`getDatabase()` 方法用于获取指定名称的数据库，如果数据库已经存在，则直接返回该 DB 对象（MongoDatabase），否则就创建一个再返回（省去了判空的操作，非常人性化）。

3）`getCollection()` 方法用于获取指定名称的文档对象，如果文档已经存在，则直接返回该 Document 的集合对象，否则就创建一个再返回（和 `getDatabase()` 方法类似）。

有了文档对象（`MongoCollection<Document>`）后，就可以往里面添加具体的文档内容了。

```java
 Document doc = new Document("name", "沉默王二")
                .append("age", "18")
                .append("hobbies", Arrays.asList("写作", "敲代码"));
```

Document 对象来源于 org.bson 包下，可以在实例化该对象之后通过 `append()` 方法添加对应的键值对，非常方便，就像 String 类的 `append()` 方法一样。

有了文档对象后，就可以通过 `insertOne()` 方法将文档添加到集合当中了。

4）`countDocuments()` 方法用于获取集合中的文档数目。

5）要查询文档，可以通过 `find()` 方法，它返回一个 `FindIterable` 对象，`first()` 方法可以返回当前集合中的第一个文档对象。

好了，来看一下程序的输出结果：

```
集合大小：1
文档内容：{"_id": {"$oid": "5ebcaa76465cab3f18b93e1a"}, "name": "沉默王二", "age": "18", "hobbies": ["写作", "敲代码"]}
```

完全符合我们的预期，perfect！

也可以通过 Robo 3T 查看“mydb”数据库，结果如下图所示。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/mongodb/rumen-95d49578-b1ef-43cc-91da-c7b3a7a7517e.jpg)


### 06、鸣谢

好了，我亲爱的小伙伴们，以上就是本文的全部内容了，是不是看完后很想实操一把 MongoDB，赶快行动吧！如果你在学习的过程中遇到了问题，欢迎随时和我交流，虽然我也是个菜鸟，但我有热情啊。

另外，如果你想写入门级别的文章，这篇就是最好的范例。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
