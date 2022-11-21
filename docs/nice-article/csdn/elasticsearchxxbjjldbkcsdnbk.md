---
title: Elasticsearch学习笔记_巨輪的博客-CSDN博客
shortTitle: Elasticsearch学习笔记_巨輪的博客-CSDN博客
description: ----第1章 Elasticsearch概述-01-开篇02-技术选型03-教学大纲-第2章 Elasticsearch入门-04-入门-环境准备05-入门-RESTful &amp; JSON06-入门-Postman客户端工具07-入门-倒排索引08-入门-HTTP-索引-创建09-入门-HTTP-索引-查询 &amp; 删除10-入门-HTTP-文档-创建（Put &amp; Post）11-入门-HTTP-查询-主键查询 &...
tags:
  - 优质文章
category:
  - CSDN
head:
  - - meta
    - name: keywords
      content: Elasticsearch学习笔记
---

\-|\-|\-|
---|---|---|
\-|**[第1章 Elasticsearch概述](#1_Elasticsearch_33)**|\-|
[01-开篇](#01_35)|[02-技术选型](#02_53)|[03-教学大纲](#03_94)|
\-|**[第2章 Elasticsearch入门](#2_Elasticsearch_104)**|\-|
[04-入门-环境准备](#04_106)|[05-入门-RESTful & JSON](#05RESTful__JSON_152)|[06-入门-Postman客户端工具](#06Postman_163)|
[07-入门-倒排索引](#07_172)|[08-入门-HTTP-索引-创建](#08HTTP_195)|[09-入门-HTTP-索引-查询 & 删除](#09HTTP___241)|
[10-入门-HTTP-文档-创建（Put & Post）](#10HTTPPut__Post_316)|[11-入门-HTTP-查询-主键查询 & 全查询](#11HTTP___392)|[12-入门-HTTP-全量修改 & 局部修改 & 删除](#12HTTP_____485)|
[13-入门-HTTP-条件查询 & 分页查询 & 查询排序](#13HTTP_____618)|[14-入门-HTTP-多条件查询 & 范围查询](#14HTTP___1264)|[15-入门-HTTP-全文检索 & 完全匹配 & 高亮查询](#15HTTP_____1522)|
[16-入门-HTTP-聚合查询](#16HTTP_1810)|[17-入门-HTTP-映射关系](#17HTTP_2049)|[18-入门-JavaAPI-环境准备](#18JavaAPI_2369)|
[19-入门-JavaAPI-索引-创建](#19JavaAPI_2441)|[20-入门-JavaAPI-索引-查询 & 删除](#20JavaAPI___2486)|[21-入门-JavaAPI-文档-新增 & 修改](#21JavaAPI___2569)|
[22-入门-JavaAPI-文档-查询 & 删除](#22JavaAPI___2727)|[23-入门-JavaAPI-文档-批量新增 & 批量删除](#23JavaAPI___2799)|[24-入门-JavaAPI-文档-高级查询-全量查询](#24JavaAPI_2882)|
[25-入门-JavaAPI-文档-高级查询-分页查询 & 条件查询 & 查询排序](#25JavaAPI_____2982)|[26-入门-JavaAPI-文档-高级查询-组合查询 & 范围查询](#26JavaAPI___3173)|[27-入门-JavaAPI-文档-高级查询-模糊查询 & 高亮查询](#27JavaAPI___3317)|
[28-入门-JavaAPI-文档-高级查询-最大值查询 & 分组查询](#28JavaAPI___3477)|\-|\-|
\-|**[第3章 Elasticsearch环境](#3_Elasticsearch_3587)**|\-|
[29-环境-简介](#29_3589)|[30-环境-Windows集群部署](#30Windows_3622)|[31-环境-Linux单节点部署](#31Linux_3821)|
[32-环境-Linux集群部署](#32Linux_3945)|\-|\-|
\-|**[第4章 Elasticsearch进阶](#4_Elasticsearch_4073)**|\-|
[33-进阶-核心概念](#33_4075)|[34-进阶-系统架构-简介](#34_4156)|[35-进阶-单节点集群](#35_4169)|
[36-进阶-故障转移](#36_4209)|[37-进阶-水平扩容](#37_4228)|[38-进阶-应对故障](#38_4288)|
[39-进阶-路由计算 & 分片控制](#39___4323)|[40-进阶-数据写流程](#40_4352)|[41-进阶-数据读流程](#41_4372)|
[42-进阶-更新流程 & 批量操作流程](#42___4378)|[43-进阶-倒排索引](#43_4428)|[44-进阶-文档搜索](#44_4501)|
[45-进阶-文档刷新 & 文档刷写 & 文档合并](#45_____4557)|[46-进阶-文档分析](#46_4689)|[47-进阶-文档控制](#47_5124)|
[48-进阶-文档展示-Kibana](#48Kibana_5311)|\-|\-|
\-|**[第5章 Elasticsearch集成](#5_Elasticsearch_5340)**|\-|
[49-框架集成-SpringData-整体介绍](#49SpringData_5342)|[50-框架集成-SpringData-代码功能集成](#50SpringData_5374)|[51-框架集成-SpringData-集成测试-索引操作](#51SpringData_5598)|
[52-框架集成-SpringData-集成测试-文档操作](#52SpringData_5639)|[53-框架集成-SpringData-集成测试-文档搜索](#53SpringData_5749)|[54-框架集成-SparkStreaming-集成](#54SparkStreaming_5800)|
[55-框架集成-Flink-集成](#55Flink_5931)|\-|\-|
\-|**[第6章 Elasticsearch优化](#6_Elasticsearch_6060)**|\-|
[56-优化-硬件选择](#56_6062)|[57-优化-分片策略](#57_6084)|[58-优化-路由选择](#58_6119)|
[59-优化-写入速度优化](#59_6140)|[60-优化-内存设置](#60_6191)|[61-优化-重要配置](#61_6214)|
\-|**[第7章 Elasticsearch面试题](#7_Elasticsearch_6228)**|\-|
[62-面试题](#62_6230)|\-|\-|

# 第1章 Elasticsearch概述

## 01-开篇

[教学视频](https://www.bilibili.com/video/BV1hh411D7sb)

结构化数据

![](https://img-blog.csdnimg.cn/img_convert/a421a414ea8fb8e25c466add5b00d31f.png)

非结构化数据

![](https://img-blog.csdnimg.cn/img_convert/109d3c62c1f36b4f352170488b516709.png)

半结构化数据

![](https://img-blog.csdnimg.cn/img_convert/48742ba6bbdc47e0dae2754027f30a31.png)

## 02-技术选型

### Elasticsearch 是什么

The Elastic Stack, 包括 Elasticsearch、 Kibana、 Beats 和 Logstash（也称为 ELK Stack）。能够安全可靠地获取任何来源、任何格式的数据，然后实时地对数据进行搜索、分析和可视化。

Elaticsearch，简称为 ES， ES 是一个**开源的高扩展的分布式全文搜索引擎**， 是整个 ElasticStack 技术栈的核心。

它可以近乎实时的存储、检索数据；本身扩展性很好，可以扩展到上百台服务器，处理 PB 级别的数据。

> elastic
> 
> 英 \[ɪˈlæstɪk\] 美 \[ɪˈlæstɪk\]
> 
> n. 橡皮圈(或带);松紧带
> 
> adj. 橡皮圈(或带)的;有弹性的;有弹力的;灵活的;可改变的;可伸缩的

### 全文搜索引擎

Google，百度类的网站搜索，它们都是根据网页中的关键字生成索引，我们在搜索的时候输入关键字，它们会将该关键字即索引匹配到的所有网页返回；还有常见的项目中应用日志的搜索等等。对于这些非结构化的数据文本，关系型数据库搜索不是能很好的支持。

一般传统数据库，全文检索都实现的很鸡肋，因为一般也没人用数据库存文本字段。进行全文检索需要扫描整个表，如果数据量大的话即使对 SQL 的语法优化，也收效甚微。建立了索引，但是维护起来也很麻烦，对于 insert 和 update 操作都会重新构建索引。

基于以上原因可以分析得出，在一些生产环境中，使用常规的搜索方式，性能是非常差的：

*   搜索的数据对象是大量的非结构化的文本数据。
*   文件记录量达到数十万或数百万个甚至更多。
*   支持大量基于交互式文本的查询。
*   需求非常灵活的全文搜索查询。
*   对高度相关的搜索结果的有特殊需求，但是没有可用的关系数据库可以满足。
*   对不同记录类型、非文本数据操作或安全事务处理的需求相对较少的情况。为了解决结构化数据搜索和非结构化数据搜索性能问题，我们就需要专业，健壮，强大的全文搜索引擎 。

**这里说到的全文搜索引擎指的是目前广泛应用的主流搜索引擎**。它的工作原理是计算机索引程序通过扫描文章中的每一个词，对每一个词建立一个索引，指明该词在文章中出现的次数和位置，当用户查询时，检索程序就根据事先建立的索引进行查找，并将查找的结果反馈给用户的检索方式。这个过程类似于通过字典中的检索字表查字的过程。

### Elasticsearch 应用案例

*   GitHub: 2013 年初，抛弃了 Solr，采取 Elasticsearch 来做 PB 级的搜索。 “GitHub 使用Elasticsearch 搜索 20TB 的数据，包括 13 亿文件和 1300 亿行代码”。
*   维基百科：启动以 Elasticsearch 为基础的核心搜索架构
*   百度：目前广泛使用 Elasticsearch 作为文本数据分析，采集百度所有服务器上的各类指标数据及用户自定义数据，通过对各种数据进行多维分析展示，辅助定位分析实例异常或业务层面异常。目前覆盖百度内部 20 多个业务线（包括云分析、网盟、预测、文库、直达号、钱包、 风控等），单集群最大 100 台机器， 200 个 ES 节点，每天导入 30TB+数据。
*   新浪：使用 Elasticsearch 分析处理 32 亿条实时日志。
*   阿里：使用 Elasticsearch 构建日志采集和分析体系。
*   Stack Overflow：解决 Bug 问题的网站，全英文，编程人员交流的网站。

## 03-教学大纲

*   第1章 Elasticsearch概述
*   第2章 Elasticsearch入门
*   第3章 Elasticsearch环境
*   第4章 Elasticsearch进阶
*   第5章 Elasticsearch集成
*   第6章 Elasticsearch优化
*   第7章 Elasticsearch面试题

# 第2章 Elasticsearch入门

## 04-入门-环境准备

[官方网址](https://www.elastic.co/cn/)

[官方文档](https://www.elastic.co/guide/index.html)

[Elasticsearch 7.8.0下载页面](https://www.elastic.co/cn/downloads/past-releases/elasticsearch-7-8-0)

Windows 版的 Elasticsearch 压缩包，解压即安装完毕，解压后的 Elasticsearch 的目录结构如下 ：

目录|含义|
---|---|
bin|可执行脚本目录|
config|配置目录|
jdk|内置 JDK 目录|
lib|类库|
logs|日志目录|
modules|模块目录|
plugins|插件目录|

解压后，进入 bin 文件目录，点击 elasticsearch.bat 文件启动 ES 服务 。

注意： 9300 端口为 Elasticsearch 集群间组件的通信端口， 9200 端口为浏览器访问的 http协议 RESTful 端口。

打开浏览器，输入地址： http://localhost:9200，测试返回结果，返回结果如下：

```json
{
  "name" : "DESKTOP-LNJQ0VF",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "nCZqBhfdT1-pw8Yas4QU9w",
  "version" : {
    "number" : "7.8.0",
    "build_flavor" : "default",
    "build_type" : "zip",
    "build_hash" : "757314695644ea9a1dc2fecd26d1a43856725e65",
    "build_date" : "2020-06-14T19:35:50.234439Z",
    "build_snapshot" : false,
    "lucene_version" : "8.5.1",
    "minimum_wire_compatibility_version" : "6.8.0",
    "minimum_index_compatibility_version" : "6.0.0-beta1"
  },
  "tagline" : "You Know, for Search"
}
```
 

## 05-入门-RESTful & JSON

REST 指的是一组架构约束条件和原则。满足这些约束条件和原则的应用程序或设计就是 RESTful。 Web 应用程序最重要的 REST 原则是，客户端和服务器之间的交互在请求之间是无状态的。从客户端到服务器的每个请求都必须包含理解请求所必需的信息。如果服务器在请求之间的任何时间点重启，客户端不会得到通知。此外，无状态请求可以由任何可用服务器回答，这十分适合云计算之类的环境。客户端可以缓存数据以改进性能。

在服务器端，应用程序状态和功能可以分为各种资源。资源是一个有趣的概念实体，它向客户端公开。资源的例子有：应用程序对象、数据库记录、算法等等。每个资源都使用 URI(Universal Resource Identifier) 得到一个唯一的地址。所有资源都共享统一的接口，以便在客户端和服务器之间传输状态。使用的是标准的 HTTP 方法，比如 GET、 PUT、 POST 和DELETE。

在 REST 样式的 Web 服务中，每个资源都有一个地址。资源本身都是方法调用的目

标，方法列表对所有资源都是一样的。这些方法都是标准方法，包括 HTTP GET、 POST、PUT、 DELETE，还可能包括 HEAD 和 OPTIONS。简单的理解就是，**如果想要访问互联网上的资源，就必须向资源所在的服务器发出请求，请求体中必须包含资源的网络路径， 以及对资源进行的操作(增删改查)**。

REST 样式的 Web 服务若有返回结果，大多数以JSON字符串形式返回。

## 06-入门-Postman客户端工具

如果直接通过浏览器向 Elasticsearch 服务器发请求，那么需要在发送的请求中包含

HTTP 标准的方法，而 HTTP 的大部分特性且仅支持 GET 和 POST 方法。所以为了能方便地进行客户端的访问，可以使用 Postman 软件Postman 是一款强大的网页调试工具，提供功能强大的 Web API 和 HTTP 请求调试。

软件功能强大，界面简洁明晰、操作方便快捷，设计得很人性化。 Postman 中文版能够发送任何类型的 HTTP 请求 (GET, HEAD, POST, PUT…)，不仅能够表单提交，且可以附带任意类型请求体。

[Postman下载页面](https://www.postman.com/downloads/)

## 07-入门-倒排索引

正排索引（传统）

id|content|
---|---|
1001|my name is zhang san|
1002|my name is li si|

倒排索引

keyword|id|
---|---|
name|1001, 1002|
zhang|1001|

Elasticsearch 是**面向文档型数据库**，一条数据在这里就是一个文档。 为了方便大家理解，我们将 Elasticsearch 里存储文档数据和关系型数据库 MySQL 存储数据的概念进行一个类比

![](https://img-blog.csdnimg.cn/img_convert/146a779da01f53e7f7a8d53132d3c7cf.png)

ES 里的 Index 可以看做一个库，而 Types 相当于表， Documents 则相当于表的行。这里 Types 的概念已经被逐渐弱化， Elasticsearch 6.X 中，一个 index 下已经只能包含一个type， Elasticsearch 7.X 中, Type 的概念已经被删除了。

## 08-入门-HTTP-索引-创建

对比关系型数据库，创建索引就等同于创建数据库。

在 Postman 中，向 ES 服务器发 PUT 请求 ： http://127.0.0.1:9200/shopping

请求后，服务器返回响应：

```json
{
    "acknowledged": true,//响应结果
    "shards_acknowledged": true,//分片结果
    "index": "shopping"//索引名称
}
```
 

后台日志：

```cmd
[2021-04-08T13:57:06,954][INFO ][o.e.c.m.MetadataCreateIndexService] [DESKTOP-LNJQ0VF] [shopping] creating index, cause [api], templates [], shards [1]/[1], mappings []
```
 

如果重复发 PUT 请求 ： http://127.0.0.1:9200/shopping 添加索引，会返回错误信息 :

```json
{
    "error": {
        "root_cause": [
            {
                "type": "resource_already_exists_exception",
                "reason": "index [shopping/J0WlEhh4R7aDrfIc3AkwWQ] already exists",
                "index_uuid": "J0WlEhh4R7aDrfIc3AkwWQ",
                "index": "shopping"
            }
        ],
        "type": "resource_already_exists_exception",
        "reason": "index [shopping/J0WlEhh4R7aDrfIc3AkwWQ] already exists",
        "index_uuid": "J0WlEhh4R7aDrfIc3AkwWQ",
        "index": "shopping"
    },
    "status": 400
}
```
 

## 09-入门-HTTP-索引-查询 & 删除

### 查看所有索引

在 Postman 中，向 ES 服务器发 GET 请求 ： http://127.0.0.1:9200/\_cat/indices?v

这里请求路径中的\_cat 表示查看的意思， indices 表示索引，所以整体含义就是查看当前 ES服务器中的所有索引，就好像 MySQL 中的 show tables 的感觉，服务器响应结果如下 :

```
health status index    uuid                   pri rep docs.count docs.deleted store.size pri.store.size
yellow open   shopping J0WlEhh4R7aDrfIc3AkwWQ   1   1          0            0       208b           208b
```
 

表头|含义|
---|---|
health|当前服务器健康状态： green(集群完整) yellow(单点正常、集群不完整) red(单点不正常)|
status|索引打开、关闭状态|
index|索引名|
uuid|索引统一编号|
pri|主分片数量|
rep|副本数量|
docs.count|可用文档数量|
docs.deleted|文档删除状态（逻辑删除）|
store.size|主分片和副分片整体占空间大小|
pri.store.size|主分片占空间大小|

### 查看单个索引

在 Postman 中，向 ES 服务器发 GET 请求 ： http://127.0.0.1:9200/shopping

返回结果如下：

```json
{
    "shopping": {//索引名
        "aliases": {},//别名
        "mappings": {},//映射
        "settings": {//设置
            "index": {//设置 - 索引
                "creation_date": "1617861426847",//设置 - 索引 - 创建时间
                "number_of_shards": "1",//设置 - 索引 - 主分片数量
                "number_of_replicas": "1",//设置 - 索引 - 主分片数量
                "uuid": "J0WlEhh4R7aDrfIc3AkwWQ",//设置 - 索引 - 主分片数量
                "version": {//设置 - 索引 - 主分片数量
                    "created": "7080099"
                },
                "provided_name": "shopping"//设置 - 索引 - 主分片数量
            }
        }
    }
}
```
 

### 删除索引

在 Postman 中，向 ES 服务器发 DELETE 请求 ： http://127.0.0.1:9200/shopping

返回结果如下：

```json
{
    "acknowledged": true
}
```
 

再次查看所有索引，GET http://127.0.0.1:9200/\_cat/indices?v，返回结果如下：

```
health status index uuid pri rep docs.count docs.deleted store.size pri.store.size
```
 

成功删除。

## 10-入门-HTTP-文档-创建（Put & Post）

假设索引已经创建好了，接下来我们来创建文档，并添加数据。这里的文档可以类比为关系型数据库中的表数据，添加的数据格式为 JSON 格式

在 Postman 中，向 ES 服务器发 POST 请求 ： http://127.0.0.1:9200/shopping/\_doc，请求体JSON内容为：

```json
{
    "title":"小米手机",
    "category":"小米",
    "images":"http://www.gulixueyuan.com/xm.jpg",
    "price":3999.00
}
```
 

![](https://img-blog.csdnimg.cn/img_convert/20d54cba223bd9d70ea356d3e40a8161.png)

注意，此处发送请求的方式必须为 POST，不能是 PUT，否则会发生错误 。

返回结果：

```json
{
    "_index": "shopping",//索引
    "_type": "_doc",//类型-文档
    "_id": "ANQqsHgBaKNfVnMbhZYU",//唯一标识，可以类比为 MySQL 中的主键，随机生成
    "_version": 1,//版本
    "result": "created",//结果，这里的 create 表示创建成功
    "_shards": {//
        "total": 2,//分片 - 总数
        "successful": 1,//分片 - 总数
        "failed": 0//分片 - 总数
    },
    "_seq_no": 0,
    "_primary_term": 1
}
```
 

上面的数据创建后，由于没有指定数据唯一性标识（ID），默认情况下， ES 服务器会随机生成一个。

如果想要自定义唯一性标识，需要在创建时指定： http://127.0.0.1:9200/shopping/\_doc/1，请求体JSON内容为：

```json
{
    "title":"小米手机",
    "category":"小米",
    "images":"http://www.gulixueyuan.com/xm.jpg",
    "price":3999.00
}
```
 

返回结果如下：

```json
{
    "_index": "shopping",
    "_type": "_doc",
    "_id": "1",//<------------------自定义唯一性标识
    "_version": 1,
    "result": "created",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 1,
    "_primary_term": 1
}
```
 

**此处需要注意：如果增加数据时明确数据主键，那么请求方式也可以为 PUT。**

## 11-入门-HTTP-查询-主键查询 & 全查询

查看文档时，需要指明文档的唯一性标识，类似于 MySQL 中数据的主键查询

在 Postman 中，向 ES 服务器发 GET 请求 ： http://127.0.0.1:9200/shopping/\_doc/1 。

返回结果如下：

```json
{
    "_index": "shopping",
    "_type": "_doc",
    "_id": "1",
    "_version": 1,
    "_seq_no": 1,
    "_primary_term": 1,
    "found": true,
    "_source": {
        "title": "小米手机",
        "category": "小米",
        "images": "http://www.gulixueyuan.com/xm.jpg",
        "price": 3999
    }
}
```
 

查找不存在的内容，向 ES 服务器发 GET 请求 ： http://127.0.0.1:9200/shopping/\_doc/1001。

返回结果如下：

```json
{
    "_index": "shopping",
    "_type": "_doc",
    "_id": "1001",
    "found": false
}
```
 

查看索引下所有数据，向 ES 服务器发 GET 请求 ： http://127.0.0.1:9200/shopping/\_search。

返回结果如下：

```json
{
    "took": 133,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 2,
            "relation": "eq"
        },
        "max_score": 1,
        "hits": [
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "ANQqsHgBaKNfVnMbhZYU",
                "_score": 1,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 3999
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "1",
                "_score": 1,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 3999
                }
            }
        ]
    }
}
```
 

## 12-入门-HTTP-全量修改 & 局部修改 & 删除

### 全量修改

和新增文档一样，输入相同的 URL 地址请求，如果请求体变化，会将原有的数据内容覆盖

在 Postman 中，向 ES 服务器发 POST 请求 ： http://127.0.0.1:9200/shopping/\_doc/1

请求体JSON内容为:

```json
{
    "title":"华为手机",
    "category":"华为",
    "images":"http://www.gulixueyuan.com/hw.jpg",
    "price":1999.00
}
```
 

修改成功后，服务器响应结果：

```json
{
    "_index": "shopping",
    "_type": "_doc",
    "_id": "1",
    "_version": 2,
    "result": "updated",//<-----------updated 表示数据被更新
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 2,
    "_primary_term": 1
}
```
 

### 局部修改

修改数据时，也可以只修改某一给条数据的局部信息

在 Postman 中，向 ES 服务器发 POST 请求 ： http://127.0.0.1:9200/shopping/\_update/1。

请求体JSON内容为:

```json
{
	"doc": {
		"title":"小米手机",
		"category":"小米"
	}
}
```
 

返回结果如下：

```json
{
    "_index": "shopping",
    "_type": "_doc",
    "_id": "1",
    "_version": 3,
    "result": "updated",//<-----------updated 表示数据被更新
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 3,
    "_primary_term": 1
}
```
 

在 Postman 中，向 ES 服务器发 GET请求 ： http://127.0.0.1:9200/shopping/\_doc/1，查看修改内容：

```json
{
    "_index": "shopping",
    "_type": "_doc",
    "_id": "1",
    "_version": 3,
    "_seq_no": 3,
    "_primary_term": 1,
    "found": true,
    "_source": {
        "title": "小米手机",
        "category": "小米",
        "images": "http://www.gulixueyuan.com/hw.jpg",
        "price": 1999
    }
}
```
 

### 删除

删除一个文档不会立即从磁盘上移除，它只是被标记成已删除（逻辑删除）。

在 Postman 中，向 ES 服务器发 DELETE 请求 ： http://127.0.0.1:9200/shopping/\_doc/1

返回结果：

```json
{
    "_index": "shopping",
    "_type": "_doc",
    "_id": "1",
    "_version": 4,
    "result": "deleted",//<---删除成功
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 4,
    "_primary_term": 1
}
```
 

在 Postman 中，向 ES 服务器发 GET请求 ： http://127.0.0.1:9200/shopping/\_doc/1，查看是否删除成功：

```json
{
    "_index": "shopping",
    "_type": "_doc",
    "_id": "1",
    "found": false
}
```
 

## 13-入门-HTTP-条件查询 & 分页查询 & 查询排序

### 条件查询

假设有以下文档内容，（在 Postman 中，向 ES 服务器发 GET请求 ： http://127.0.0.1:9200/shopping/\_search）：

```json
{
    "took": 5,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 6,
            "relation": "eq"
        },
        "max_score": 1,
        "hits": [
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "ANQqsHgBaKNfVnMbhZYU",
                "_score": 1,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 3999
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "A9R5sHgBaKNfVnMb25Ya",
                "_score": 1,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "BNR5sHgBaKNfVnMb7pal",
                "_score": 1,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "BtR6sHgBaKNfVnMbX5Y5",
                "_score": 1,
                "_source": {
                    "title": "华为手机",
                    "category": "华为",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "B9R6sHgBaKNfVnMbZpZ6",
                "_score": 1,
                "_source": {
                    "title": "华为手机",
                    "category": "华为",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "CdR7sHgBaKNfVnMbsJb9",
                "_score": 1,
                "_source": {
                    "title": "华为手机",
                    "category": "华为",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                }
            }
        ]
    }
}
```
 

#### URL带参查询

**查找category为小米的文档**，在 Postman 中，向 ES 服务器发 GET请求 ： http://127.0.0.1:9200/shopping/\_search?q=category:小米，返回结果如下：

```json
{
    "took": 94,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 3,
            "relation": "eq"
        },
        "max_score": 1.3862942,
        "hits": [
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "ANQqsHgBaKNfVnMbhZYU",
                "_score": 1.3862942,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 3999
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "A9R5sHgBaKNfVnMb25Ya",
                "_score": 1.3862942,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "BNR5sHgBaKNfVnMb7pal",
                "_score": 1.3862942,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                }
            }
        ]
    }
}
```
 

上述为URL带参数形式查询，这很容易让不善者心怀恶意，或者参数值出现中文会出现乱码情况。为了避免这些情况，我们可用使用带JSON请求体请求进行查询。

#### 请求体带参查询

接下带JSON请求体，还是**查找category为小米的文档**，在 Postman 中，向 ES 服务器发 GET请求 ： http://127.0.0.1:9200/shopping/\_search，附带JSON体如下：

```json
{
	"query":{
		"match":{
			"category":"小米"
		}
	}
}
```
 

返回结果如下：

```json
{
    "took": 3,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 3,
            "relation": "eq"
        },
        "max_score": 1.3862942,
        "hits": [
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "ANQqsHgBaKNfVnMbhZYU",
                "_score": 1.3862942,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 3999
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "A9R5sHgBaKNfVnMb25Ya",
                "_score": 1.3862942,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "BNR5sHgBaKNfVnMb7pal",
                "_score": 1.3862942,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                }
            }
        ]
    }
}
```
 

#### 带请求体方式的查找所有内容

**查找所有文档内容**，也可以这样，在 Postman 中，向 ES 服务器发 GET请求 ： http://127.0.0.1:9200/shopping/\_search，附带JSON体如下：

```json
{
	"query":{
		"match_all":{}
	}
}
```
 

则返回所有文档内容：

```json
{
    "took": 2,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 6,
            "relation": "eq"
        },
        "max_score": 1,
        "hits": [
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "ANQqsHgBaKNfVnMbhZYU",
                "_score": 1,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 3999
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "A9R5sHgBaKNfVnMb25Ya",
                "_score": 1,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "BNR5sHgBaKNfVnMb7pal",
                "_score": 1,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "BtR6sHgBaKNfVnMbX5Y5",
                "_score": 1,
                "_source": {
                    "title": "华为手机",
                    "category": "华为",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "B9R6sHgBaKNfVnMbZpZ6",
                "_score": 1,
                "_source": {
                    "title": "华为手机",
                    "category": "华为",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "CdR7sHgBaKNfVnMbsJb9",
                "_score": 1,
                "_source": {
                    "title": "华为手机",
                    "category": "华为",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                }
            }
        ]
    }
}
```
 

#### 查询指定字段

**如果你想查询指定字段**，在 Postman 中，向 ES 服务器发 GET请求 ： http://127.0.0.1:9200/shopping/\_search，附带JSON体如下：

```json
{
	"query":{
		"match_all":{}
	},
	"_source":["title"]
}
```
 

返回结果如下：

```json
{
    "took": 5,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 6,
            "relation": "eq"
        },
        "max_score": 1,
        "hits": [
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "ANQqsHgBaKNfVnMbhZYU",
                "_score": 1,
                "_source": {
                    "title": "小米手机"
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "A9R5sHgBaKNfVnMb25Ya",
                "_score": 1,
                "_source": {
                    "title": "小米手机"
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "BNR5sHgBaKNfVnMb7pal",
                "_score": 1,
                "_source": {
                    "title": "小米手机"
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "BtR6sHgBaKNfVnMbX5Y5",
                "_score": 1,
                "_source": {
                    "title": "华为手机"
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "B9R6sHgBaKNfVnMbZpZ6",
                "_score": 1,
                "_source": {
                    "title": "华为手机"
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "CdR7sHgBaKNfVnMbsJb9",
                "_score": 1,
                "_source": {
                    "title": "华为手机"
                }
            }
        ]
    }
}
```
 

### 分页查询

在 Postman 中，向 ES 服务器发 GET请求 ： http://127.0.0.1:9200/shopping/\_search，附带JSON体如下：

```json
{
	"query":{
		"match_all":{}
	},
	"from":0,
	"size":2
}
```
 

返回结果如下：

```java
{
    "took": 1,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 6,
            "relation": "eq"
        },
        "max_score": 1,
        "hits": [
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "ANQqsHgBaKNfVnMbhZYU",
                "_score": 1,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 3999
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "A9R5sHgBaKNfVnMb25Ya",
                "_score": 1,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                }
            }
        ]
    }
}
```
 

### 查询排序

如果你想通过排序查出价格最高的手机，在 Postman 中，向 ES 服务器发 GET请求 ： http://127.0.0.1:9200/shopping/\_search，附带JSON体如下：

```json
{
	"query":{
		"match_all":{}
	},
	"sort":{
		"price":{
			"order":"desc"
		}
	}
}
```
 

返回结果如下：

```json
{
    "took": 96,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 6,
            "relation": "eq"
        },
        "max_score": null,
        "hits": [
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "ANQqsHgBaKNfVnMbhZYU",
                "_score": null,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 3999
                },
                "sort": [
                    3999
                ]
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "A9R5sHgBaKNfVnMb25Ya",
                "_score": null,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                },
                "sort": [
                    1999
                ]
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "BNR5sHgBaKNfVnMb7pal",
                "_score": null,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                },
                "sort": [
                    1999
                ]
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "BtR6sHgBaKNfVnMbX5Y5",
                "_score": null,
                "_source": {
                    "title": "华为手机",
                    "category": "华为",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                },
                "sort": [
                    1999
                ]
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "B9R6sHgBaKNfVnMbZpZ6",
                "_score": null,
                "_source": {
                    "title": "华为手机",
                    "category": "华为",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                },
                "sort": [
                    1999
                ]
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "CdR7sHgBaKNfVnMbsJb9",
                "_score": null,
                "_source": {
                    "title": "华为手机",
                    "category": "华为",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                },
                "sort": [
                    1999
                ]
            }
        ]
    }
}
```
 

## 14-入门-HTTP-多条件查询 & 范围查询

### 多条件查询

假设想找出小米牌子，价格为3999元的。（must相当于数据库的&&）

在 Postman 中，向 ES 服务器发 GET请求 ： http://127.0.0.1:9200/shopping/\_search，附带JSON体如下：

```json
{
	"query":{
		"bool":{
			"must":[{
				"match":{
					"category":"小米"
				}
			},{
				"match":{
					"price":3999.00
				}
			}]
		}
	}
}
```
 

返回结果如下：

```json
{
    "took": 134,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 1,
            "relation": "eq"
        },
        "max_score": 2.3862944,
        "hits": [
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "ANQqsHgBaKNfVnMbhZYU",
                "_score": 2.3862944,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 3999
                }
            }
        ]
    }
}
```
 

假设想找出小米和华为的牌子。（should相当于数据库的||）

在 Postman 中，向 ES 服务器发 GET请求 ： http://127.0.0.1:9200/shopping/\_search，附带JSON体如下：

```json
{
	"query":{
		"bool":{
			"should":[{
				"match":{
					"category":"小米"
				}
			},{
				"match":{
					"category":"华为"
				}
			}]
		},
        "filter":{
            "range":{
                "price":{
                    "gt":2000
                }
            }
        }
	}
}
```
 

返回结果如下：

```json
{
    "took": 8,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 6,
            "relation": "eq"
        },
        "max_score": 1.3862942,
        "hits": [
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "ANQqsHgBaKNfVnMbhZYU",
                "_score": 1.3862942,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 3999
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "A9R5sHgBaKNfVnMb25Ya",
                "_score": 1.3862942,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "BNR5sHgBaKNfVnMb7pal",
                "_score": 1.3862942,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "BtR6sHgBaKNfVnMbX5Y5",
                "_score": 1.3862942,
                "_source": {
                    "title": "华为手机",
                    "category": "华为",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "B9R6sHgBaKNfVnMbZpZ6",
                "_score": 1.3862942,
                "_source": {
                    "title": "华为手机",
                    "category": "华为",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "CdR7sHgBaKNfVnMbsJb9",
                "_score": 1.3862942,
                "_source": {
                    "title": "华为手机",
                    "category": "华为",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                }
            }
        ]
    }
}
```
 

### 范围查询

假设想找出小米和华为的牌子，价格大于2000元的手机。

在 Postman 中，向 ES 服务器发 GET请求 ： http://127.0.0.1:9200/shopping/\_search，附带JSON体如下：

```json
{
	"query":{
		"bool":{
			"should":[{
				"match":{
					"category":"小米"
				}
			},{
				"match":{
					"category":"华为"
				}
			}],
            "filter":{
            	"range":{
                	"price":{
                    	"gt":2000
                	}
	            }
    	    }
		}
	}
}
```
 

返回结果如下：

```json
{
    "took": 72,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 1,
            "relation": "eq"
        },
        "max_score": 1.3862942,
        "hits": [
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "ANQqsHgBaKNfVnMbhZYU",
                "_score": 1.3862942,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 3999
                }
            }
        ]
    }
}
```
 

## 15-入门-HTTP-全文检索 & 完全匹配 & 高亮查询

### 全文检索

这功能像搜索引擎那样，如品牌输入“小华”，返回结果带回品牌有“小米”和华为的。

在 Postman 中，向 ES 服务器发 GET请求 ： http://127.0.0.1:9200/shopping/\_search，附带JSON体如下：

```json
{
	"query":{
		"match":{
			"category" : "小华"
		}
	}
}
```
 

返回结果如下：

```json
{
    "took": 7,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 6,
            "relation": "eq"
        },
        "max_score": 0.6931471,
        "hits": [
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "ANQqsHgBaKNfVnMbhZYU",
                "_score": 0.6931471,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 3999
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "A9R5sHgBaKNfVnMb25Ya",
                "_score": 0.6931471,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "BNR5sHgBaKNfVnMb7pal",
                "_score": 0.6931471,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "BtR6sHgBaKNfVnMbX5Y5",
                "_score": 0.6931471,
                "_source": {
                    "title": "华为手机",
                    "category": "华为",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "B9R6sHgBaKNfVnMbZpZ6",
                "_score": 0.6931471,
                "_source": {
                    "title": "华为手机",
                    "category": "华为",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "CdR7sHgBaKNfVnMbsJb9",
                "_score": 0.6931471,
                "_source": {
                    "title": "华为手机",
                    "category": "华为",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                }
            }
        ]
    }
}
```
 

### 完全匹配

在 Postman 中，向 ES 服务器发 GET请求 ： http://127.0.0.1:9200/shopping/\_search，附带JSON体如下：

```json
{
	"query":{
		"match_phrase":{
			"category" : "为"
		}
	}
}
```
 

返回结果如下：

```json
{
    "took": 2,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 3,
            "relation": "eq"
        },
        "max_score": 0.6931471,
        "hits": [
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "BtR6sHgBaKNfVnMbX5Y5",
                "_score": 0.6931471,
                "_source": {
                    "title": "华为手机",
                    "category": "华为",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "B9R6sHgBaKNfVnMbZpZ6",
                "_score": 0.6931471,
                "_source": {
                    "title": "华为手机",
                    "category": "华为",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "CdR7sHgBaKNfVnMbsJb9",
                "_score": 0.6931471,
                "_source": {
                    "title": "华为手机",
                    "category": "华为",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                }
            }
        ]
    }
}
```
 

### 高亮查询

在 Postman 中，向 ES 服务器发 GET请求 ： http://127.0.0.1:9200/shopping/\_search，附带JSON体如下：

```json
{
	"query":{
		"match_phrase":{
			"category" : "为"
		}
	},
    "highlight":{
        "fields":{
            "category":{}//<----高亮这字段
        }
    }
}
```
 

返回结果如下：

```json
{
    "took": 100,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 3,
            "relation": "eq"
        },
        "max_score": 0.6931471,
        "hits": [
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "BtR6sHgBaKNfVnMbX5Y5",
                "_score": 0.6931471,
                "_source": {
                    "title": "华为手机",
                    "category": "华为",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                },
                "highlight": {
                    "category": [
                        "华<em>为</em>"//<------高亮一个为字。
                    ]
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "B9R6sHgBaKNfVnMbZpZ6",
                "_score": 0.6931471,
                "_source": {
                    "title": "华为手机",
                    "category": "华为",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                },
                "highlight": {
                    "category": [
                        "华<em>为</em>"
                    ]
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "CdR7sHgBaKNfVnMbsJb9",
                "_score": 0.6931471,
                "_source": {
                    "title": "华为手机",
                    "category": "华为",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                },
                "highlight": {
                    "category": [
                        "华<em>为</em>"
                    ]
                }
            }
        ]
    }
}
```
 

## 16-入门-HTTP-聚合查询

聚合允许使用者对 es 文档进行统计分析，类似与关系型数据库中的 group by，当然还有很多其他的聚合，例如取最大值max、平均值avg等等。

接下来按price字段进行分组：

在 Postman 中，向 ES 服务器发 GET请求 ： http://127.0.0.1:9200/shopping/\_search，附带JSON体如下：

```json
{
	"aggs":{//聚合操作
		"price_group":{//名称，随意起名
			"terms":{//分组
				"field":"price"//分组字段
			}
		}
	}
}
```
 

返回结果如下：

```json
{
    "took": 63,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 6,
            "relation": "eq"
        },
        "max_score": 1,
        "hits": [
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "ANQqsHgBaKNfVnMbhZYU",
                "_score": 1,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 3999
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "A9R5sHgBaKNfVnMb25Ya",
                "_score": 1,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "BNR5sHgBaKNfVnMb7pal",
                "_score": 1,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "BtR6sHgBaKNfVnMbX5Y5",
                "_score": 1,
                "_source": {
                    "title": "华为手机",
                    "category": "华为",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "B9R6sHgBaKNfVnMbZpZ6",
                "_score": 1,
                "_source": {
                    "title": "华为手机",
                    "category": "华为",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                }
            },
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "CdR7sHgBaKNfVnMbsJb9",
                "_score": 1,
                "_source": {
                    "title": "华为手机",
                    "category": "华为",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 1999
                }
            }
        ]
    },
    "aggregations": {
        "price_group": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 0,
            "buckets": [
                {
                    "key": 1999,
                    "doc_count": 5
                },
                {
                    "key": 3999,
                    "doc_count": 1
                }
            ]
        }
    }
}
```
 

上面返回结果会附带原始数据的。若不想要不附带原始数据的结果，在 Postman 中，向 ES 服务器发 GET请求 ： http://127.0.0.1:9200/shopping/\_search，附带JSON体如下：

```json
{
	"aggs":{
		"price_group":{
			"terms":{
				"field":"price"
			}
		}
	},
    "size":0
}
```
 

返回结果如下：

```json
{
    "took": 60,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 6,
            "relation": "eq"
        },
        "max_score": null,
        "hits": []
    },
    "aggregations": {
        "price_group": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 0,
            "buckets": [
                {
                    "key": 1999,
                    "doc_count": 5
                },
                {
                    "key": 3999,
                    "doc_count": 1
                }
            ]
        }
    }
}
```
 

若想对所有手机价格求**平均值**。

在 Postman 中，向 ES 服务器发 GET请求 ： http://127.0.0.1:9200/shopping/\_search，附带JSON体如下：

```json
{
	"aggs":{
		"price_avg":{//名称，随意起名
			"avg":{//求平均
				"field":"price"
			}
		}
	},
    "size":0
}
```
 

返回结果如下：

```json
{
    "took": 14,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 6,
            "relation": "eq"
        },
        "max_score": null,
        "hits": []
    },
    "aggregations": {
        "price_avg": {
            "value": 2332.3333333333335
        }
    }
}
```
 

## 17-入门-HTTP-映射关系

有了索引库，等于有了数据库中的 database。

接下来就需要建索引库(index)中的映射了，类似于数据库(database)中的表结构(table)。

创建数据库表需要设置字段名称，类型，长度，约束等；索引库也一样，需要知道这个类型下有哪些字段，每个字段有哪些约束信息，这就叫做映射(mapping)。

先创建一个索引：

```json
# PUT http://127.0.0.1:9200/user
```
 

返回结果：

```json
{
    "acknowledged": true,
    "shards_acknowledged": true,
    "index": "user"
}
```
 

**创建映射**

```json
# PUT http://127.0.0.1:9200/user/_mapping

{
    "properties": {
        "name":{
        	"type": "text",
        	"index": true
        },
        "sex":{
        	"type": "keyword",
        	"index": true
        },
        "tel":{
        	"type": "keyword",
        	"index": false
        }
    }
}
```
 

返回结果如下：

```json
{
    "acknowledged": true
}
```
 

**查询映射**

```json
#GET http://127.0.0.1:9200/user/_mapping
```
 

返回结果如下：

```json
{
    "user": {
        "mappings": {
            "properties": {
                "name": {
                    "type": "text"
                },
                "sex": {
                    "type": "keyword"
                },
                "tel": {
                    "type": "keyword",
                    "index": false
                }
            }
        }
    }
}
```
 

增加数据

```json
#PUT http://127.0.0.1:9200/user/_create/1001
{
	"name":"小米",
	"sex":"男的",
	"tel":"1111"
}
```
 

返回结果如下：

```json
{
    "_index": "user",
    "_type": "_doc",
    "_id": "1001",
    "_version": 1,
    "result": "created",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 0,
    "_primary_term": 1
}
```
 

查找name含有”小“数据：

```json
#GET http://127.0.0.1:9200/user/_search
{
	"query":{
		"match":{
			"name":"小"
		}
	}
}
```
 

返回结果如下：

```json
{
    "took": 495,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 1,
            "relation": "eq"
        },
        "max_score": 0.2876821,
        "hits": [
            {
                "_index": "user",
                "_type": "_doc",
                "_id": "1001",
                "_score": 0.2876821,
                "_source": {
                    "name": "小米",
                    "sex": "男的",
                    "tel": "1111"
                }
            }
        ]
    }
}
```
 

查找sex含有”男“数据：

```json
#GET http://127.0.0.1:9200/user/_search
{
	"query":{
		"match":{
			"sex":"男"
		}
	}
}
```
 

返回结果如下：

```json
{
    "took": 1,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 0,
            "relation": "eq"
        },
        "max_score": null,
        "hits": []
    }
}
```
 

找不想要的结果，只因创建映射时"sex"的类型为"keyword"。

"sex"只能完全为”男的“，才能得出原数据。

```json
#GET http://127.0.0.1:9200/user/_search
{
	"query":{
		"match":{
			"sex":"男的"
		}
	}
}
```
 

返回结果如下：

```json
{
    "took": 2,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 1,
            "relation": "eq"
        },
        "max_score": 0.2876821,
        "hits": [
            {
                "_index": "user",
                "_type": "_doc",
                "_id": "1001",
                "_score": 0.2876821,
                "_source": {
                    "name": "小米",
                    "sex": "男的",
                    "tel": "1111"
                }
            }
        ]
    }
}
```
 

查询电话

```json
# GET http://127.0.0.1:9200/user/_search
{
	"query":{
		"match":{
			"tel":"11"
		}
	}
}
```
 

返回结果如下：

```json
{
    "error": {
        "root_cause": [
            {
                "type": "query_shard_exception",
                "reason": "failed to create query: Cannot search on field [tel] since it is not indexed.",
                "index_uuid": "ivLnMfQKROS7Skb2MTFOew",
                "index": "user"
            }
        ],
        "type": "search_phase_execution_exception",
        "reason": "all shards failed",
        "phase": "query",
        "grouped": true,
        "failed_shards": [
            {
                "shard": 0,
                "index": "user",
                "node": "4P7dIRfXSbezE5JTiuylew",
                "reason": {
                    "type": "query_shard_exception",
                    "reason": "failed to create query: Cannot search on field [tel] since it is not indexed.",
                    "index_uuid": "ivLnMfQKROS7Skb2MTFOew",
                    "index": "user",
                    "caused_by": {
                        "type": "illegal_argument_exception",
                        "reason": "Cannot search on field [tel] since it is not indexed."
                    }
                }
            }
        ]
    },
    "status": 400
}
```
 

报错只因创建映射时"tel"的"index"为false。

## 18-入门-JavaAPI-环境准备

新建Maven工程。

添加依赖：

```xml
<dependencies>
    <dependency>
        <groupId>org.elasticsearch</groupId>
        <artifactId>elasticsearch</artifactId>
        <version>7.8.0</version>
    </dependency>
    <!-- elasticsearch 的客户端 -->
    <dependency>
        <groupId>org.elasticsearch.client</groupId>
        <artifactId>elasticsearch-rest-high-level-client</artifactId>
        <version>7.8.0</version>
    </dependency>
    <!-- elasticsearch 依赖 2.x 的 log4j -->
    <dependency>
        <groupId>org.apache.logging.log4j</groupId>
        <artifactId>log4j-api</artifactId>
        <version>2.8.2</version>
    </dependency>
    <dependency>
        <groupId>org.apache.logging.log4j</groupId>
        <artifactId>log4j-core</artifactId>
        <version>2.8.2</version>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>2.9.9</version>
    </dependency>
    <!-- junit 单元测试 -->
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.12</version>
    </dependency>
</dependencies>
```
 

HelloElasticsearch

```java
import java.io.IOException;

import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;

public class HelloElasticsearch {

	public static void main(String[] args) throws IOException {
		// 创建客户端对象
		RestHighLevelClient client = new RestHighLevelClient(
				RestClient.builder(new HttpHost("localhost", 9200, "http")));
//		...
		System.out.println(client);

		// 关闭客户端连接
		client.close();
	}
}
```
 

## 19-入门-JavaAPI-索引-创建

```java
import org.apache.http.HttpHost;
import org.elasticsearch.action.admin.indices.create.CreateIndexRequest;
import org.elasticsearch.action.admin.indices.create.CreateIndexResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;

import java.io.IOException;

public class CreateIndex {

    public static void main(String[] args) throws IOException {
        // 创建客户端对象
        RestHighLevelClient client = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http")));

        // 创建索引 - 请求对象
        CreateIndexRequest request = new CreateIndexRequest("user2");
        // 发送请求，获取响应
        CreateIndexResponse response = client.indices().create(request,
                RequestOptions.DEFAULT);
        boolean acknowledged = response.isAcknowledged();
        // 响应状态
        System.out.println("操作状态 = " + acknowledged);

        // 关闭客户端连接
        client.close();
    }

}
```
 

后台打印：

```\
四月 09, 2021 2:12:08 下午 org.elasticsearch.client.RestClient logResponse
警告: request [PUT http://localhost:9200/user2?master_timeout=30s&include_type_name=true&timeout=30s] returned 1 warnings: [299 Elasticsearch-7.8.0-757314695644ea9a1dc2fecd26d1a43856725e65 "[types removal] Using include_type_name in create index requests is deprecated. The parameter will be removed in the next major version."]
操作状态 = true

Process finished with exit code 0
```
 

## 20-入门-JavaAPI-索引-查询 & 删除

### 查询

```java
import org.apache.http.HttpHost;

import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.client.indices.GetIndexRequest;
import org.elasticsearch.client.indices.GetIndexResponse;

import java.io.IOException;

public class SearchIndex {
    public static void main(String[] args) throws IOException {
        // 创建客户端对象
        RestHighLevelClient client = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http")));

        // 查询索引 - 请求对象
        GetIndexRequest request = new GetIndexRequest("user2");
        // 发送请求，获取响应
        GetIndexResponse response = client.indices().get(request,
                RequestOptions.DEFAULT);
        
        System.out.println("aliases:"+response.getAliases());
        System.out.println("mappings:"+response.getMappings());
        System.out.println("settings:"+response.getSettings());

        client.close();
    }
}
```
 

后台打印：

```
aliases:{user2=[]}
mappings:{user2=org.elasticsearch.cluster.metadata.MappingMetadata@ad700514}
settings:{user2={"index.creation_date":"1617948726976","index.number_of_replicas":"1","index.number_of_shards":"1","index.provided_name":"user2","index.uuid":"UGZ1ntcySnK6hWyP2qoVpQ","index.version.created":"7080099"}}

Process finished with exit code 0
```
 

### 删除

```java
import org.apache.http.HttpHost;
import org.elasticsearch.action.admin.indices.delete.DeleteIndexRequest;
import org.elasticsearch.action.support.master.AcknowledgedResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;

import java.io.IOException;

public class DeleteIndex {
    public static void main(String[] args) throws IOException {
        RestHighLevelClient client = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http")));
        // 删除索引 - 请求对象
        DeleteIndexRequest request = new DeleteIndexRequest("user2");
        // 发送请求，获取响应
        AcknowledgedResponse response = client.indices().delete(request,RequestOptions.DEFAULT);
        // 操作结果
        System.out.println("操作结果 ： " + response.isAcknowledged());
        client.close();
    }
}
```
 

后台打印：

```
操作结果 ： true

Process finished with exit code 0
```
 

## 21-入门-JavaAPI-文档-新增 & 修改

### 重构

上文由于频繁使用以下连接Elasticsearch和关闭它的代码，于是**个人**对它进行重构。

```java
public class SomeClass {
    public static void main(String[] args) throws IOException {
        RestHighLevelClient client = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http")));
		
        ...
        
        client.close();
    }
}
```
 

重构后的代码：

```java
import org.elasticsearch.client.RestHighLevelClient;

public interface ElasticsearchTask {

    void doSomething(RestHighLevelClient client) throws Exception;

}
```
 

```java
public class ConnectElasticsearch{

    public static void connect(ElasticsearchTask task){
        // 创建客户端对象
        RestHighLevelClient client = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http")));
        try {
            task.doSomething(client);
            // 关闭客户端连接
            client.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```
 

接下来，如果想让Elasticsearch完成一些操作，就编写一个lambda式即可。

```java
public class SomeClass {

    public static void main(String[] args) {
        ConnectElasticsearch.connect(client -> {
			//do something
        });
    }
}
```
 

### 新增

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lun.elasticsearch.hello.ConnectElasticsearch;
import com.lun.elasticsearch.model.User;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.common.xcontent.XContentType;

public class InsertDoc {

    public static void main(String[] args) {
        ConnectElasticsearch.connect(client -> {
            // 新增文档 - 请求对象
            IndexRequest request = new IndexRequest();
            // 设置索引及唯一性标识
            request.index("user").id("1001");

            // 创建数据对象
            User user = new User();
            user.setName("zhangsan");
            user.setAge(30);
            user.setSex("男");

            ObjectMapper objectMapper = new ObjectMapper();
            String productJson = objectMapper.writeValueAsString(user);
            // 添加文档数据，数据格式为 JSON 格式
            request.source(productJson, XContentType.JSON);
            // 客户端发送请求，获取响应对象
            IndexResponse response = client.index(request, RequestOptions.DEFAULT);
            3.打印结果信息
            System.out.println("_index:" + response.getIndex());
            System.out.println("_id:" + response.getId());
            System.out.println("_result:" + response.getResult());
        });
    }
}
```
 

后台打印：

```
_index:user
_id:1001
_result:UPDATED

Process finished with exit code 0
```
 

### 修改

```java
import com.lun.elasticsearch.hello.ConnectElasticsearch;
import org.elasticsearch.action.update.UpdateRequest;
import org.elasticsearch.action.update.UpdateResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.common.xcontent.XContentType;

public class UpdateDoc {

    public static void main(String[] args) {
        ConnectElasticsearch.connect(client -> {
            // 修改文档 - 请求对象
            UpdateRequest request = new UpdateRequest();
            // 配置修改参数
            request.index("user").id("1001");
            // 设置请求体，对数据进行修改
            request.doc(XContentType.JSON, "sex", "女");
            // 客户端发送请求，获取响应对象
            UpdateResponse response = client.update(request, RequestOptions.DEFAULT);
            System.out.println("_index:" + response.getIndex());
            System.out.println("_id:" + response.getId());
            System.out.println("_result:" + response.getResult());
        });
    }

}
```
 

后台打印：

```
_index:user
_id:1001
_result:UPDATED

Process finished with exit code 0
```
 

## 22-入门-JavaAPI-文档-查询 & 删除

### 查询

```java
import com.lun.elasticsearch.hello.ConnectElasticsearch;
import org.elasticsearch.action.get.GetRequest;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.client.RequestOptions;

public class GetDoc {

    public static void main(String[] args) {
        ConnectElasticsearch.connect(client -> {
            //1.创建请求对象
            GetRequest request = new GetRequest().index("user").id("1001");
            //2.客户端发送请求，获取响应对象
            GetResponse response = client.get(request, RequestOptions.DEFAULT);
            3.打印结果信息
            System.out.println("_index:" + response.getIndex());
            System.out.println("_type:" + response.getType());
            System.out.println("_id:" + response.getId());
            System.out.println("source:" + response.getSourceAsString());
        });
    }
}
```
 

后台打印：

```
_index:user
_type:_doc
_id:1001
source:{"name":"zhangsan","age":30,"sex":"男"}

Process finished with exit code 0
```
 

### 删除

```java
import com.lun.elasticsearch.hello.ConnectElasticsearch;
import org.elasticsearch.action.delete.DeleteRequest;
import org.elasticsearch.action.delete.DeleteResponse;
import org.elasticsearch.client.RequestOptions;

public class DeleteDoc {
    public static void main(String[] args) {
        ConnectElasticsearch.connect(client -> {
            //创建请求对象
            DeleteRequest request = new DeleteRequest().index("user").id("1001");
            //客户端发送请求，获取响应对象
            DeleteResponse response = client.delete(request, RequestOptions.DEFAULT);
            //打印信息
            System.out.println(response.toString());
        });
    }
}
```
 

后台打印：

```
DeleteResponse[index=user,type=_doc,id=1001,version=16,result=deleted,shards=ShardInfo{total=2, successful=1, failures=[]}]

Process finished with exit code 0
```
 

## 23-入门-JavaAPI-文档-批量新增 & 批量删除

### 批量新增

```java
import com.lun.elasticsearch.hello.ConnectElasticsearch;
import org.elasticsearch.action.bulk.BulkRequest;
import org.elasticsearch.action.bulk.BulkResponse;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.common.xcontent.XContentType;

public class BatchInsertDoc {

    public static void main(String[] args) {
        ConnectElasticsearch.connect(client -> {
            //创建批量新增请求对象
            BulkRequest request = new BulkRequest();
            request.add(new
                    IndexRequest().index("user").id("1001").source(XContentType.JSON, "name",
                    "zhangsan"));
            request.add(new
                    IndexRequest().index("user").id("1002").source(XContentType.JSON, "name",
                            "lisi"));
            request.add(new
                    IndexRequest().index("user").id("1003").source(XContentType.JSON, "name",
                    "wangwu"));
            //客户端发送请求，获取响应对象
            BulkResponse responses = client.bulk(request, RequestOptions.DEFAULT);
            //打印结果信息
            System.out.println("took:" + responses.getTook());
            System.out.println("items:" + responses.getItems());
        });
    }
}
```
 

后台打印

```
took:294ms
items:[Lorg.elasticsearch.action.bulk.BulkItemResponse;@2beee7ff

Process finished with exit code 0
```
 

### 批量删除

```java
import com.lun.elasticsearch.hello.ConnectElasticsearch;
import org.elasticsearch.action.bulk.BulkRequest;
import org.elasticsearch.action.bulk.BulkResponse;
import org.elasticsearch.action.delete.DeleteRequest;
import org.elasticsearch.client.RequestOptions;

public class BatchDeleteDoc {
    public static void main(String[] args) {
        ConnectElasticsearch.connect(client -> {
            //创建批量删除请求对象
            BulkRequest request = new BulkRequest();
            request.add(new DeleteRequest().index("user").id("1001"));
            request.add(new DeleteRequest().index("user").id("1002"));
            request.add(new DeleteRequest().index("user").id("1003"));
            //客户端发送请求，获取响应对象
            BulkResponse responses = client.bulk(request, RequestOptions.DEFAULT);
            //打印结果信息
            System.out.println("took:" + responses.getTook());
            System.out.println("items:" + responses.getItems());
        });
    }
}
```
 

后台打印

```
took:108ms
items:[Lorg.elasticsearch.action.bulk.BulkItemResponse;@7b02881e

Process finished with exit code 0
```
 

## 24-入门-JavaAPI-文档-高级查询-全量查询

先批量增加数据

```java
public class BatchInsertDoc {

    public static void main(String[] args) {
        ConnectElasticsearch.connect(client -> {
            //创建批量新增请求对象
            BulkRequest request = new BulkRequest();
            request.add(new IndexRequest().index("user").id("1001").source(XContentType.JSON, "name", "zhangsan", "age", "10", "sex","女"));
            request.add(new IndexRequest().index("user").id("1002").source(XContentType.JSON, "name", "lisi", "age", "30", "sex","女"));
            request.add(new IndexRequest().index("user").id("1003").source(XContentType.JSON, "name", "wangwu1", "age", "40", "sex","男"));
            request.add(new IndexRequest().index("user").id("1004").source(XContentType.JSON, "name", "wangwu2", "age", "20", "sex","女"));
            request.add(new IndexRequest().index("user").id("1005").source(XContentType.JSON, "name", "wangwu3", "age", "50", "sex","男"));
            request.add(new IndexRequest().index("user").id("1006").source(XContentType.JSON, "name", "wangwu4", "age", "20", "sex","男"));
            //客户端发送请求，获取响应对象
            BulkResponse responses = client.bulk(request, RequestOptions.DEFAULT);
            //打印结果信息
            System.out.println("took:" + responses.getTook());
            System.out.println("items:" + responses.getItems());
        });
    }
}
```
 

后台打印

```
took:168ms
items:[Lorg.elasticsearch.action.bulk.BulkItemResponse;@2beee7ff

Process finished with exit code 0
```
 

**查询所有索引数据**

```java
import com.lun.elasticsearch.hello.ConnectElasticsearch;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;

public class QueryDoc {

    public static void main(String[] args) {
        ConnectElasticsearch.connect(client -> {
            // 创建搜索请求对象
            SearchRequest request = new SearchRequest();
            request.indices("user");
            // 构建查询的请求体
            SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
            // 查询所有数据
            sourceBuilder.query(QueryBuilders.matchAllQuery());
            request.source(sourceBuilder);
            SearchResponse response = client.search(request, RequestOptions.DEFAULT);
            // 查询匹配
            SearchHits hits = response.getHits();
            System.out.println("took:" + response.getTook());
            System.out.println("timeout:" + response.isTimedOut());
            System.out.println("total:" + hits.getTotalHits());
            System.out.println("MaxScore:" + hits.getMaxScore());
            System.out.println("hits========>>");
            for (SearchHit hit : hits) {
            //输出每条查询的结果信息
                System.out.println(hit.getSourceAsString());
            }
            System.out.println("<<========");
        });
    }

}
```
 

后台打印

```
took:2ms
timeout:false
total:6 hits
MaxScore:1.0
hits========>>
{"name":"zhangsan","age":"10","sex":"女"}
{"name":"lisi","age":"30","sex":"女"}
{"name":"wangwu1","age":"40","sex":"男"}
{"name":"wangwu2","age":"20","sex":"女"}
{"name":"wangwu3","age":"50","sex":"男"}
{"name":"wangwu4","age":"20","sex":"男"}
<<========

Process finished with exit code 0
```
 

## 25-入门-JavaAPI-文档-高级查询-分页查询 & 条件查询 & 查询排序

### 条件查询

```java
import com.lun.elasticsearch.hello.ConnectElasticsearch;
import com.lun.elasticsearch.hello.ElasticsearchTask;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.sort.SortOrder;

public class QueryDoc {
    
	public static final ElasticsearchTask SEARCH_BY_CONDITION = client -> {
        // 创建搜索请求对象
        SearchRequest request = new SearchRequest();
        request.indices("user");
        // 构建查询的请求体
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        sourceBuilder.query(QueryBuilders.termQuery("age", "30"));
        request.source(sourceBuilder);
        SearchResponse response = client.search(request, RequestOptions.DEFAULT);
        // 查询匹配
        SearchHits hits = response.getHits();
        System.out.println("took:" + response.getTook());
        System.out.println("timeout:" + response.isTimedOut());
        System.out.println("total:" + hits.getTotalHits());
        System.out.println("MaxScore:" + hits.getMaxScore());
        System.out.println("hits========>>");
        for (SearchHit hit : hits) {
            //输出每条查询的结果信息
            System.out.println(hit.getSourceAsString());
        }
        System.out.println("<<========");
    };
    
    public static void main(String[] args) {
        ConnectElasticsearch.connect(SEARCH_BY_CONDITION);
    }
}
```
 

后台打印

```
took:1ms
timeout:false
total:1 hits
MaxScore:1.0
hits========>>
{"name":"lisi","age":"30","sex":"女"}
<<========
```
 

### 分页查询

```java
import com.lun.elasticsearch.hello.ConnectElasticsearch;
import com.lun.elasticsearch.hello.ElasticsearchTask;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.sort.SortOrder;

public class QueryDoc {
    
	public static final ElasticsearchTask SEARCH_BY_PAGING = client -> {
        // 创建搜索请求对象
        SearchRequest request = new SearchRequest();
        request.indices("user");
        // 构建查询的请求体
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        sourceBuilder.query(QueryBuilders.matchAllQuery());
        // 分页查询
        // 当前页其实索引(第一条数据的顺序号)， from
        sourceBuilder.from(0);

        // 每页显示多少条 size
        sourceBuilder.size(2);
        request.source(sourceBuilder);
        SearchResponse response = client.search(request, RequestOptions.DEFAULT);
        // 查询匹配
        SearchHits hits = response.getHits();
        System.out.println("took:" + response.getTook());
        System.out.println("timeout:" + response.isTimedOut());
        System.out.println("total:" + hits.getTotalHits());
        System.out.println("MaxScore:" + hits.getMaxScore());
        System.out.println("hits========>>");
        for (SearchHit hit : hits) {
            //输出每条查询的结果信息
            System.out.println(hit.getSourceAsString());
        }
        System.out.println("<<========");
    };
    
    public static void main(String[] args) {
        ConnectElasticsearch.connect(SEARCH_BY_CONDITION);
    }

}
```
 

后台打印

```
took:1ms
timeout:false
total:6 hits
MaxScore:1.0
hits========>>
{"name":"zhangsan","age":"10","sex":"女"}
{"name":"lisi","age":"30","sex":"女"}
<<========
```
 

### 查询排序

```java
import com.lun.elasticsearch.hello.ConnectElasticsearch;
import com.lun.elasticsearch.hello.ElasticsearchTask;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.sort.SortOrder;

public class QueryDoc {
    
	public static final ElasticsearchTask SEARCH_WITH_ORDER = client -> {
        // 创建搜索请求对象
        SearchRequest request = new SearchRequest();
        request.indices("user");

        // 构建查询的请求体
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        sourceBuilder.query(QueryBuilders.matchAllQuery());
        // 排序
        sourceBuilder.sort("age", SortOrder.ASC);
        request.source(sourceBuilder);
        SearchResponse response = client.search(request, RequestOptions.DEFAULT);
        // 查询匹配
        SearchHits hits = response.getHits();
        System.out.println("took:" + response.getTook());
        System.out.println("timeout:" + response.isTimedOut());
        System.out.println("total:" + hits.getTotalHits());
        System.out.println("MaxScore:" + hits.getMaxScore());
        System.out.println("hits========>>");
        for (SearchHit hit : hits) {
        //输出每条查询的结果信息
            System.out.println(hit.getSourceAsString());
        }
        System.out.println("<<========");
    };

    public static void main(String[] args) {
        ConnectElasticsearch.connect(SEARCH_WITH_ORDER);
    }

}
```
 

后台打印

```
took:1ms
timeout:false
total:6 hits
MaxScore:NaN
hits========>>
{"name":"zhangsan","age":"10","sex":"女"}
{"name":"wangwu2","age":"20","sex":"女"}
{"name":"wangwu4","age":"20","sex":"男"}
{"name":"lisi","age":"30","sex":"女"}
{"name":"wangwu1","age":"40","sex":"男"}
{"name":"wangwu3","age":"50","sex":"男"}
<<========
```
 

## 26-入门-JavaAPI-文档-高级查询-组合查询 & 范围查询

### 组合查询

```java
import com.lun.elasticsearch.hello.ConnectElasticsearch;
import com.lun.elasticsearch.hello.ElasticsearchTask;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.sort.SortOrder;

public class QueryDoc {
    
	public static final ElasticsearchTask SEARCH_BY_BOOL_CONDITION = client -> {
        // 创建搜索请求对象
        SearchRequest request = new SearchRequest();
        request.indices("user");
        // 构建查询的请求体
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery();
        // 必须包含
        boolQueryBuilder.must(QueryBuilders.matchQuery("age", "30"));
        // 一定不含
        boolQueryBuilder.mustNot(QueryBuilders.matchQuery("name", "zhangsan"));
        // 可能包含
        boolQueryBuilder.should(QueryBuilders.matchQuery("sex", "男"));
        sourceBuilder.query(boolQueryBuilder);
        request.source(sourceBuilder);
        SearchResponse response = client.search(request, RequestOptions.DEFAULT);
        // 查询匹配
        SearchHits hits = response.getHits();
        System.out.println("took:" + response.getTook());
        System.out.println("timeout:" + response.isTimedOut());
        System.out.println("total:" + hits.getTotalHits());
        System.out.println("MaxScore:" + hits.getMaxScore());
        System.out.println("hits========>>");
        for (SearchHit hit : hits) {
            //输出每条查询的结果信息
            System.out.println(hit.getSourceAsString());
        }
        System.out.println("<<========");

    };

    public static void main(String[] args) {
        ConnectElasticsearch.connect(SEARCH_BY_BOOL_CONDITION);
    }
}
```
 

后台打印

```
took:28ms
timeout:false
total:1 hits
MaxScore:1.0
hits========>>
{"name":"lisi","age":"30","sex":"女"}
<<========

Process finished with exit code 0
```
 

### 范围查询

```java
import com.lun.elasticsearch.hello.ConnectElasticsearch;
import com.lun.elasticsearch.hello.ElasticsearchTask;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.RangeQueryBuilder;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.sort.SortOrder;

public class QueryDoc {
    
	public static final ElasticsearchTask SEARCH_BY_RANGE = client -> {
        // 创建搜索请求对象
        SearchRequest request = new SearchRequest();
        request.indices("user");
        // 构建查询的请求体
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        RangeQueryBuilder rangeQuery = QueryBuilders.rangeQuery("age");
        // 大于等于
        //rangeQuery.gte("30");
        // 小于等于
        rangeQuery.lte("40");
        sourceBuilder.query(rangeQuery);
        request.source(sourceBuilder);
        SearchResponse response = client.search(request, RequestOptions.DEFAULT);
        // 查询匹配
        SearchHits hits = response.getHits();
        System.out.println("took:" + response.getTook());
        System.out.println("timeout:" + response.isTimedOut());
        System.out.println("total:" + hits.getTotalHits());
        System.out.println("MaxScore:" + hits.getMaxScore());
        System.out.println("hits========>>");
        for (SearchHit hit : hits) {
        //输出每条查询的结果信息
            System.out.println(hit.getSourceAsString());
        }
        System.out.println("<<========");
    };

    public static void main(String[] args) {
        ConnectElasticsearch.connect(SEARCH_BY_RANGE);
    }

}
```
 

后台打印

```
took:1ms
timeout:false
total:5 hits
MaxScore:1.0
hits========>>
{"name":"zhangsan","age":"10","sex":"女"}
{"name":"lisi","age":"30","sex":"女"}
{"name":"wangwu1","age":"40","sex":"男"}
{"name":"wangwu2","age":"20","sex":"女"}
{"name":"wangwu4","age":"20","sex":"男"}
<<========

Process finished with exit code 0
```
 

## 27-入门-JavaAPI-文档-高级查询-模糊查询 & 高亮查询

### 模糊查询

```java
import com.lun.elasticsearch.hello.ConnectElasticsearch;
import com.lun.elasticsearch.hello.ElasticsearchTask;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.common.unit.Fuzziness;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.RangeQueryBuilder;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.sort.SortOrder;

public class QueryDoc {
    
    public static final ElasticsearchTask SEARCH_BY_FUZZY_CONDITION = client -> {
        // 创建搜索请求对象
        SearchRequest request = new SearchRequest();
        request.indices("user");
        // 构建查询的请求体
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        sourceBuilder.query(QueryBuilders.fuzzyQuery("name","wangwu").fuzziness(Fuzziness.ONE));
        request.source(sourceBuilder);
        SearchResponse response = client.search(request, RequestOptions.DEFAULT);
        // 查询匹配
        SearchHits hits = response.getHits();
        System.out.println("took:" + response.getTook());
        System.out.println("timeout:" + response.isTimedOut());
        System.out.println("total:" + hits.getTotalHits());
        System.out.println("MaxScore:" + hits.getMaxScore());
        System.out.println("hits========>>");
        for (SearchHit hit : hits) {
            //输出每条查询的结果信息
            System.out.println(hit.getSourceAsString());
        }
        System.out.println("<<========");
    };

    public static void main(String[] args) {
//        ConnectElasticsearch.connect(SEARCH_ALL);
//        ConnectElasticsearch.connect(SEARCH_BY_CONDITION);
//        ConnectElasticsearch.connect(SEARCH_BY_PAGING);
//        ConnectElasticsearch.connect(SEARCH_WITH_ORDER);
//        ConnectElasticsearch.connect(SEARCH_BY_BOOL_CONDITION);
//        ConnectElasticsearch.connect(SEARCH_BY_RANGE);
        ConnectElasticsearch.connect(SEARCH_BY_FUZZY_CONDITION);
    }

}
```
 

后台打印

```
took:152ms
timeout:false
total:4 hits
MaxScore:1.2837042
hits========>>
{"name":"wangwu1","age":"40","sex":"男"}
{"name":"wangwu2","age":"20","sex":"女"}
{"name":"wangwu3","age":"50","sex":"男"}
{"name":"wangwu4","age":"20","sex":"男"}
<<========

Process finished with exit code 0
```
 

### 高亮查询

```java
import com.lun.elasticsearch.hello.ConnectElasticsearch;
import com.lun.elasticsearch.hello.ElasticsearchTask;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.common.unit.Fuzziness;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.RangeQueryBuilder;
import org.elasticsearch.index.query.TermsQueryBuilder;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightField;
import org.elasticsearch.search.sort.SortOrder;

import java.util.Map;

public class QueryDoc {
    
    public static final ElasticsearchTask SEARCH_WITH_HIGHLIGHT = client -> {
        // 高亮查询
        SearchRequest request = new SearchRequest().indices("user");
        //2.创建查询请求体构建器
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        //构建查询方式：高亮查询
        TermsQueryBuilder termsQueryBuilder =
                QueryBuilders.termsQuery("name","zhangsan");
        //设置查询方式
        sourceBuilder.query(termsQueryBuilder);
        //构建高亮字段
        HighlightBuilder highlightBuilder = new HighlightBuilder();
        highlightBuilder.preTags("<font color='red'>");//设置标签前缀
        highlightBuilder.postTags("</font>");//设置标签后缀
        highlightBuilder.field("name");//设置高亮字段
        //设置高亮构建对象
        sourceBuilder.highlighter(highlightBuilder);
        //设置请求体
        request.source(sourceBuilder);
        //3.客户端发送请求，获取响应对象
        SearchResponse response = client.search(request, RequestOptions.DEFAULT);
        //4.打印响应结果
        SearchHits hits = response.getHits();
        System.out.println("took::"+response.getTook());
        System.out.println("time_out::"+response.isTimedOut());
        System.out.println("total::"+hits.getTotalHits());
        System.out.println("max_score::"+hits.getMaxScore());
        System.out.println("hits::::>>");
        for (SearchHit hit : hits) {
            String sourceAsString = hit.getSourceAsString();
            System.out.println(sourceAsString);
            //打印高亮结果
            Map<String, HighlightField> highlightFields = hit.getHighlightFields();
            System.out.println(highlightFields);
        }
        System.out.println("<<::::");
    };

    public static void main(String[] args) {
        ConnectElasticsearch.connect(SEARCH_WITH_HIGHLIGHT);
    }

}
```
 

后台打印

```
took::672ms
time_out::false
total::1 hits
max_score::1.0
hits::::>>
{"name":"zhangsan","age":"10","sex":"女"}
{name=[name], fragments[[<font color='red'>zhangsan</font>]]}
<<::::

Process finished with exit code 0
```
 

## 28-入门-JavaAPI-文档-高级查询-最大值查询 & 分组查询

### 最大值查询

```java
import com.lun.elasticsearch.hello.ConnectElasticsearch;
import com.lun.elasticsearch.hello.ElasticsearchTask;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.common.unit.Fuzziness;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.RangeQueryBuilder;
import org.elasticsearch.index.query.TermsQueryBuilder;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightField;
import org.elasticsearch.search.sort.SortOrder;

import java.util.Map;

public class QueryDoc {
    
    public static final ElasticsearchTask SEARCH_WITH_MAX = client -> {
        // 高亮查询
        SearchRequest request = new SearchRequest().indices("user");
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        sourceBuilder.aggregation(AggregationBuilders.max("maxAge").field("age"));
        //设置请求体
        request.source(sourceBuilder);
        //3.客户端发送请求，获取响应对象
        SearchResponse response = client.search(request, RequestOptions.DEFAULT);
        //4.打印响应结果
        SearchHits hits = response.getHits();
        System.out.println(response);
    };

    public static void main(String[] args) {
        ConnectElasticsearch.connect(SEARCH_WITH_MAX);
    }

}
```
 

后台打印

```
{"took":16,"timed_out":false,"_shards":{"total":1,"successful":1,"skipped":0,"failed":0},"hits":{"total":{"value":6,"relation":"eq"},"max_score":1.0,"hits":[{"_index":"user","_type":"_doc","_id":"1001","_score":1.0,"_source":{"name":"zhangsan","age":"10","sex":"女"}},{"_index":"user","_type":"_doc","_id":"1002","_score":1.0,"_source":{"name":"lisi","age":"30","sex":"女"}},{"_index":"user","_type":"_doc","_id":"1003","_score":1.0,"_source":{"name":"wangwu1","age":"40","sex":"男"}},{"_index":"user","_type":"_doc","_id":"1004","_score":1.0,"_source":{"name":"wangwu2","age":"20","sex":"女"}},{"_index":"user","_type":"_doc","_id":"1005","_score":1.0,"_source":{"name":"wangwu3","age":"50","sex":"男"}},{"_index":"user","_type":"_doc","_id":"1006","_score":1.0,"_source":{"name":"wangwu4","age":"20","sex":"男"}}]},"aggregations":{"max#maxAge":{"value":50.0}}}

Process finished with exit code 0
```
 

### 分组查询

```java
import com.lun.elasticsearch.hello.ConnectElasticsearch;
import com.lun.elasticsearch.hello.ElasticsearchTask;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.common.unit.Fuzziness;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.RangeQueryBuilder;
import org.elasticsearch.index.query.TermsQueryBuilder;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightField;
import org.elasticsearch.search.sort.SortOrder;

import java.util.Map;

public class QueryDoc {

	public static final ElasticsearchTask SEARCH_WITH_GROUP = client -> {
        SearchRequest request = new SearchRequest().indices("user");
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        sourceBuilder.aggregation(AggregationBuilders.terms("age_groupby").field("age"));
        //设置请求体
        request.source(sourceBuilder);
        //3.客户端发送请求，获取响应对象
        SearchResponse response = client.search(request, RequestOptions.DEFAULT);
        //4.打印响应结果
        SearchHits hits = response.getHits();
        System.out.println(response);
    };

    public static void main(String[] args) {
        ConnectElasticsearch.connect(SEARCH_WITH_GROUP);
    }

}
```
 

后台打印

```
{"took":10,"timed_out":false,"_shards":{"total":1,"successful":1,"skipped":0,"failed":0},"hits":{"total":{"value":6,"relation":"eq"},"max_score":1.0,"hits":[{"_index":"user","_type":"_doc","_id":"1001","_score":1.0,"_source":{"name":"zhangsan","age":"10","sex":"女"}},{"_index":"user","_type":"_doc","_id":"1002","_score":1.0,"_source":{"name":"lisi","age":"30","sex":"女"}},{"_index":"user","_type":"_doc","_id":"1003","_score":1.0,"_source":{"name":"wangwu1","age":"40","sex":"男"}},{"_index":"user","_type":"_doc","_id":"1004","_score":1.0,"_source":{"name":"wangwu2","age":"20","sex":"女"}},{"_index":"user","_type":"_doc","_id":"1005","_score":1.0,"_source":{"name":"wangwu3","age":"50","sex":"男"}},{"_index":"user","_type":"_doc","_id":"1006","_score":1.0,"_source":{"name":"wangwu4","age":"20","sex":"男"}}]},"aggregations":{"lterms#age_groupby":{"doc_count_error_upper_bound":0,"sum_other_doc_count":0,"buckets":[{"key":20,"doc_count":2},{"key":10,"doc_count":1},{"key":30,"doc_count":1},{"key":40,"doc_count":1},{"key":50,"doc_count":1}]}}}

Process finished with exit code 0
```
 

# 第3章 Elasticsearch环境

## 29-环境-简介

### 单机 & 集群

单台 Elasticsearch 服务器提供服务，往往都有最大的负载能力，超过这个阈值，服务器

性能就会大大降低甚至不可用，所以生产环境中，一般都是运行在指定服务器集群中。

除了负载能力，单点服务器也存在其他问题：

*   单台机器存储容量有限
*   单服务器容易出现单点故障，无法实现高可用
*   单服务的并发处理能力有限

配置服务器集群时，集群中节点数量没有限制，大于等于 2 个节点就可以看做是集群了。一

般出于高性能及高可用方面来考虑集群中节点数量都是 3 个以上

总之，集群能提高性能，增加容错。

### 集群 Cluster

\*\*一个集群就是由一个或多个服务器节点组织在一起，共同持有整个的数据，并一起提供索引和搜索功能。\*\*一个 Elasticsearch 集群有一个唯一的名字标识，这个名字默认就是”elasticsearch”。这个名字是重要的，因为一个节点只能通过指定某个集群的名字，来加入这个集群。

### 节点 Node

集群中包含很多服务器， 一个节点就是其中的一个服务器。 作为集群的一部分，它存储数据，参与集群的索引和搜索功能。

一个节点也是由一个名字来标识的，默认情况下，这个名字是一个随机的漫威漫画角色的名字，这个名字会在启动的时候赋予节点。这个名字对于管理工作来说挺重要的，因为在这个管理过程中，你会去确定网络中的哪些服务器对应于 Elasticsearch 集群中的哪些节点。

一个节点可以通过配置集群名称的方式来加入一个指定的集群。默认情况下，每个节点都会被安排加入到一个叫做“elasticsearch”的集群中，这意味着，如果你在你的网络中启动了若干个节点，并假定它们能够相互发现彼此，它们将会自动地形成并加入到一个叫做“elasticsearch”的集群中。

在一个集群里，只要你想，可以拥有任意多个节点。而且，如果当前你的网络中没有运

行任何 Elasticsearch 节点，这时启动一个节点，会默认创建并加入一个叫做“elasticsearch”的

集群。

## 30-环境-Windows集群部署

### 部署集群

一、创建 elasticsearch-cluster 文件夹

创建 elasticsearch-7.8.0-cluster 文件夹，在内部复制三个 elasticsearch 服务。

![](https://img-blog.csdnimg.cn/img_convert/6d6022b6d30a9e2c1a4e18092d5f130f.png)

二、修改集群文件目录中每个节点的 config/elasticsearch.yml 配置文件

**node-1001 节点**

```yaml
#节点 1 的配置信息：
#集群名称，节点之间要保持一致
cluster.name: my-elasticsearch
#节点名称，集群内要唯一
node.name: node-1001
node.master: true
node.data: true
#ip 地址
network.host: localhost
#http 端口
http.port: 1001
#tcp 监听端口
transport.tcp.port: 9301
#discovery.seed_hosts: ["localhost:9301", "localhost:9302","localhost:9303"]
#discovery.zen.fd.ping_timeout: 1m
#discovery.zen.fd.ping_retries: 5
#集群内的可以被选为主节点的节点列表
#cluster.initial_master_nodes: ["node-1", "node-2","node-3"]
#跨域配置
#action.destructive_requires_name: true
http.cors.enabled: true
http.cors.allow-origin: "*"
```
 

**node-1002 节点**

```yaml
#节点 2 的配置信息：
#集群名称，节点之间要保持一致
cluster.name: my-elasticsearch
#节点名称，集群内要唯一
node.name: node-1002
node.master: true
node.data: true
#ip 地址
network.host: localhost
#http 端口
http.port: 1002
#tcp 监听端口
transport.tcp.port: 9302
discovery.seed_hosts: ["localhost:9301"]
discovery.zen.fd.ping_timeout: 1m
discovery.zen.fd.ping_retries: 5
#集群内的可以被选为主节点的节点列表
#cluster.initial_master_nodes: ["node-1", "node-2","node-3"]
#跨域配置
#action.destructive_requires_name: true
http.cors.enabled: true
http.cors.allow-origin: "*"
```
 

**node-1003 节点**

```yaml
#节点 3 的配置信息：
#集群名称，节点之间要保持一致
cluster.name: my-elasticsearch
#节点名称，集群内要唯一
node.name: node-1003
node.master: true
node.data: true
#ip 地址
network.host: localhost
#http 端口
http.port: 1003
#tcp 监听端口
transport.tcp.port: 9303
#候选主节点的地址，在开启服务后可以被选为主节点
discovery.seed_hosts: ["localhost:9301", "localhost:9302"]
discovery.zen.fd.ping_timeout: 1m
discovery.zen.fd.ping_retries: 5
#集群内的可以被选为主节点的节点列表
#cluster.initial_master_nodes: ["node-1", "node-2","node-3"]
#跨域配置
#action.destructive_requires_name: true
http.cors.enabled: true
http.cors.allow-origin: "*"
```
 

三、如果有必要，删除每个节点中的 data 目录中所有内容 。

### 启动集群

分别依次双击执行节点的bin/elasticsearch.bat, 启动节点服务器（可以编写一个脚本启动），启动后，会自动加入指定名称的集群。

### 测试集群

一、用Postman，查看集群状态

1.  GET http://127.0.0.1:1001/_cluster/health
2.  GET http://127.0.0.1:1002/_cluster/health
3.  GET http://127.0.0.1:1003/_cluster/health

返回结果皆为如下：

```json
{
    "cluster_name": "my-application",
    "status": "green",
    "timed_out": false,
    "number_of_nodes": 3,
    "number_of_data_nodes": 3,
    "active_primary_shards": 0,
    "active_shards": 0,
    "relocating_shards": 0,
    "initializing_shards": 0,
    "unassigned_shards": 0,
    "delayed_unassigned_shards": 0,
    "number_of_pending_tasks": 0,
    "number_of_in_flight_fetch": 0,
    "task_max_waiting_in_queue_millis": 0,
    "active_shards_percent_as_number": 100.0
}
```
 

**status字段**指示着当前集群在总体上是否工作正常。它的三种颜色含义如下：

1.  green：所有的主分片和副本分片都正常运行。
2.  yellow：所有的主分片都正常运行，但不是所有的副本分片都正常运行。
3.  red：有主分片没能正常运行。

二、用Postman，在一节点增加索引，另一节点获取索引

向集群中的node-1001节点增加索引：

```json
#PUT http://127.0.0.1:1001/user
```
 

返回结果：

```json
{
    "acknowledged": true,
    "shards_acknowledged": true,
    "index": "user"
}
```
 

向集群中的node-1003节点获取索引：

```json
#GET http://127.0.0.1:1003/user
```
 

返回结果：

```json
{
    "user": {
        "aliases": {},
        "mappings": {},
        "settings": {
            "index": {
                "creation_date": "1617993035885",
                "number_of_shards": "1",
                "number_of_replicas": "1",
                "uuid": "XJKERwQlSJ6aUxZEN2EV0w",
                "version": {
                    "created": "7080099"
                },
                "provided_name": "user"
            }
        }
    }
}
```
 

如果在1003创建索引，同样在1001也能获取索引信息，这就是集群能力。

## 31-环境-Linux单节点部署

### 软件安装

一、下载软件

[下载Linux版的Elasticsearch](https://www.elastic.co/cn/downloads/past-releases/elasticsearch-7-8-0)

二、解压软件

```shell
# 解压缩
tar -zxvf elasticsearch-7.8.0-linux-x86_64.tar.gz -C /opt/module
# 改名
mv elasticsearch-7.8.0 es
```
 

三、创建用户

因为安全问题， Elasticsearch 不允许 root 用户直接运行，所以要创建新用户，在 root 用户中创建新用户。

```shell
useradd es #新增 es 用户
passwd es #为 es 用户设置密码
userdel -r es #如果错了，可以删除再加
chown -R es:es /opt/module/es #文件夹所有者
```
 

四、修改配置文件

修改/opt/module/es/config/elasticsearch.yml文件。

```yaml
# 加入如下配置
cluster.name: elasticsearch
node.name: node-1
network.host: 0.0.0.0
http.port: 9200
cluster.initial_master_nodes: ["node-1"]
```
 

修改/etc/security/limits.conf

```
# 在文件末尾中增加下面内容
# 每个进程可以打开的文件数的限制
es soft nofile 65536
es hard nofile 65536
```
 

修改/etc/security/limits.d/20-nproc.conf

```
# 在文件末尾中增加下面内容
# 每个进程可以打开的文件数的限制
es soft nofile 65536
es hard nofile 65536
# 操作系统级别对每个用户创建的进程数的限制
* hard nproc 4096
# 注： * 带表 Linux 所有用户名称
```
 

修改/etc/sysctl.conf

```
# 在文件中增加下面内容
# 一个进程可以拥有的 VMA(虚拟内存区域)的数量,默认值为 65536
vm.max_map_count=655360
```
 

重新加载

```
sysctl -p
```
 

### 启动软件

使用 ES 用户启动

```
cd /opt/module/es/
#启动
bin/elasticsearch
#后台启动
bin/elasticsearch -d
```
 

启动时，会动态生成文件，如果文件所属用户不匹配，会发生错误，需要重新进行修改用户和用户组

![](https://img-blog.csdnimg.cn/img_convert/75e24cd1fbc430577681bb4f8a0d3e2b.png)

关闭防火墙

```
#暂时关闭防火墙
systemctl stop firewalld
#永久关闭防火墙
systemctl enable firewalld.service #打开防火墙永久性生效，重启后不会复原
systemctl disable firewalld.service #关闭防火墙，永久性生效，重启后不会复原
```
 

### 测试软件

浏览器中输入地址： http://linux1:9200/

![](https://img-blog.csdnimg.cn/img_convert/477065a2cb499a32871549c21e2fc487.png)

## 32-环境-Linux集群部署

### 软件安装

一、下载软件

[下载Linux版的Elasticsearch](https://www.elastic.co/cn/downloads/past-releases/elasticsearch-7-8-0)

二、解压软件

```shell
# 解压缩
tar -zxvf elasticsearch-7.8.0-linux-x86_64.tar.gz -C /opt/module
# 改名
mv elasticsearch-7.8.0 es-cluster
```
 

将软件分发到其他节点： linux2, linux3

三、创建用户

因为安全问题， Elasticsearch 不允许 root 用户直接运行，所以要创建新用户，在 root 用户中创建新用户。

```shell
useradd es #新增 es 用户
passwd es #为 es 用户设置密码
userdel -r es #如果错了，可以删除再加
chown -R es:es /opt/module/es #文件夹所有者
```
 

四、修改配置文件

修改/opt/module/es/config/elasticsearch.yml 文件，分发文件。

```yaml
# 加入如下配置
#集群名称
cluster.name: cluster-es
#节点名称， 每个节点的名称不能重复
node.name: node-1
#ip 地址， 每个节点的地址不能重复
network.host: linux1
#是不是有资格主节点
node.master: true
node.data: true
http.port: 9200
# head 插件需要这打开这两个配置
http.cors.allow-origin: "*"
http.cors.enabled: true
http.max_content_length: 200mb
#es7.x 之后新增的配置，初始化一个新的集群时需要此配置来选举 master
cluster.initial_master_nodes: ["node-1"]
#es7.x 之后新增的配置，节点发现
discovery.seed_hosts: ["linux1:9300","linux2:9300","linux3:9300"]
gateway.recover_after_nodes: 2
network.tcp.keep_alive: true
network.tcp.no_delay: true
transport.tcp.compress: true
#集群内同时启动的数据任务个数，默认是 2 个
cluster.routing.allocation.cluster_concurrent_rebalance: 16
#添加或删除节点及负载均衡时并发恢复的线程个数，默认 4 个
cluster.routing.allocation.node_concurrent_recoveries: 16
#初始化数据恢复时，并发恢复线程的个数，默认 4 个
cluster.routing.allocation.node_initial_primaries_recoveries: 16
```
 

修改/etc/security/limits.conf ，分发文件

```
# 在文件末尾中增加下面内容
es soft nofile 65536
es hard nofile 65536
```
 

修改/etc/security/limits.d/20-nproc.conf，分发文件

```
# 在文件末尾中增加下面内容
es soft nofile 65536
es hard nofile 65536
\* hard nproc 4096
\# 注： * 带表 Linux 所有用户名称
```
 

修改/etc/sysctl.conf

```
# 在文件中增加下面内容
vm.max_map_count=655360
```
 

重新加载

```
sysctl -p
```
 

### 启动软件

分别在不同节点上启动 ES 软件

```
cd /opt/module/es-cluster
#启动
bin/elasticsearch
#后台启动
bin/elasticsearch -d
```
 

### 测试集群

![](https://img-blog.csdnimg.cn/img_convert/0412e37cb5249d1ff0e813ee87f49a50.png)

# 第4章 Elasticsearch进阶

## 33-进阶-核心概念

![](https://img-blog.csdnimg.cn/img_convert/146a779da01f53e7f7a8d53132d3c7cf.png)

### 索引Index

一个索引就是一个拥有几分相似特征的文档的集合。比如说，你可以有一个客户数据的索引，另一个产品目录的索引，还有一个订单数据的索引。一个索引由一个名字来标识（必须全部是小写字母），并且当我们要对这个索引中的文档进行索引、搜索、更新和删除（CRUD）的时候，都要使用到这个名字。在一个集群中，可以定义任意多的索引。

能搜索的数据必须索引，这样的好处是可以提高查询速度，比如：新华字典前面的目录就是索引的意思，目录可以提高查询速度。

**Elasticsearch 索引的精髓：一切设计都是为了提高搜索的性能。**

### 类型Type

在一个索引中，你可以定义一种或多种类型。

一个类型是你的索引的一个逻辑上的分类/分区，其语义完全由你来定。通常，会为具

有一组共同字段的文档定义一个类型。不同的版本，类型发生了不同的变化。

版本|Type|
---|---|
5.x|支持多种 type|
6.x|只能有一种 type|
7.x|默认不再支持自定义索引类型（默认类型为： \_doc）|

### 文档Document

一个文档是一个可被索引的基础信息单元，也就是一条数据。

比如：你可以拥有某一个客户的文档，某一个产品的一个文档，当然，也可以拥有某个订单的一个文档。文档以 JSON（Javascript Object Notation）格式来表示，而 JSON 是一个到处存在的互联网数据交互格式。

在一个 index/type 里面，你可以存储任意多的文档。

### 字段Field

相当于是数据表的字段，对文档数据根据不同属性进行的分类标识。

### 映射Mapping

mapping 是处理数据的方式和规则方面做一些限制，如：某个字段的数据类型、默认值、分析器、是否被索引等等。这些都是映射里面可以设置的，其它就是处理 ES 里面数据的一些使用规则设置也叫做映射，按着最优规则处理数据对性能提高很大，因此才需要建立映射，并且需要思考如何建立映射才能对性能更好。

### 分片Shards

一个索引可以存储超出单个节点硬件限制的大量数据。比如，一个具有 10 亿文档数据

的索引占据 1TB 的磁盘空间，而任一节点都可能没有这样大的磁盘空间。 或者单个节点处理搜索请求，响应太慢。为了解决这个问题，\*\*Elasticsearch 提供了将索引划分成多份的能力，每一份就称之为分片。\*\*当你创建一个索引的时候，你可以指定你想要的分片的数量。**每个分片本身也是一个功能完善并且独立的“索引”**，这个“索引”可以被放置到集群中的任何节点上。

分片很重要，主要有两方面的原因：

1.  允许你水平分割 / 扩展你的内容容量。
2.  允许你在分片之上进行分布式的、并行的操作，进而提高性能/吞吐量。

至于一个分片怎样分布，它的文档怎样聚合和搜索请求，是完全由 Elasticsearch 管理的，对于作为用户的你来说，这些都是透明的，无需过分关心。

被混淆的概念是，一个 Lucene 索引 我们在 Elasticsearch 称作 分片 。 一个Elasticsearch 索引 是分片的集合。 当 Elasticsearch 在索引中搜索的时候， 他发送查询到每一个属于索引的分片（Lucene 索引），然后合并每个分片的结果到一个全局的结果集。

Lucene 是 Apache 软件基金会 Jakarta 项目组的一个子项目，提供了一个简单却强大的应用程式接口，能够做全文索引和搜寻。在 Java 开发环境里 Lucene 是一个成熟的免费开源工具。就其本身而言， Lucene 是当前以及最近几年最受欢迎的免费 Java 信息检索程序库。但 Lucene 只是一个提供全文搜索功能类库的核心工具包，而真正使用它还需要一个完善的服务框架搭建起来进行应用。

目前市面上流行的搜索引擎软件，主流的就两款： Elasticsearch 和 Solr,这两款都是基于 Lucene 搭建的，可以独立部署启动的搜索引擎服务软件。由于内核相同，所以两者除了服务器安装、部署、管理、集群以外，对于数据的操作 修改、添加、保存、查询等等都十分类似。

### 副本Replicas

在一个网络 / 云的环境里，失败随时都可能发生，在某个分片/节点不知怎么的就处于

离线状态，或者由于任何原因消失了，这种情况下，有一个故障转移机制是非常有用并且是强烈推荐的。为此目的， Elasticsearch 允许你创建分片的一份或多份拷贝，这些拷贝叫做复制分片(副本)。

复制分片之所以重要，有两个主要原因：

*   在分片/节点失败的情况下，**提供了高可用性**。因为这个原因，注意到复制分片从不与原/主要（original/primary）分片置于同一节点上是非常重要的。
*   扩展你的搜索量/吞吐量，因为搜索可以在所有的副本上并行运行。

总之，每个索引可以被分成多个分片。一个索引也可以被复制 0 次（意思是没有复制）或多次。一旦复制了，每个索引就有了主分片（作为复制源的原来的分片）和复制分片（主分片的拷贝）之别。

分片和复制的数量可以在索引创建的时候指定。在索引创建之后，你可以在任何时候动态地改变复制的数量，但是你事后不能改变分片的数量。

默认情况下，Elasticsearch 中的每个索引被分片 1 个主分片和 1 个复制，这意味着，如果你的集群中至少有两个节点，你的索引将会有 1 个主分片和另外 1 个复制分片（1 个完全拷贝），这样的话每个索引总共就有 2 个分片， 我们需要根据索引需要确定分片个数。

### 分配Allocation

将分片分配给某个节点的过程，包括分配主分片或者副本。如果是副本，还包含从主分片复制数据的过程。这个过程是由 master 节点完成的。

## 34-进阶-系统架构-简介

![](https://img-blog.csdnimg.cn/img_convert/e4d13427545dc174eb9ccface85c1f0c.png)

一个运行中的 Elasticsearch 实例称为一个节点，而集群是由一个或者多个拥有相同

cluster.name 配置的节点组成， 它们共同承担数据和负载的压力。当有节点加入集群中或者从集群中移除节点时，集群将会重新平均分布所有的数据。

当一个节点被选举成为主节点时， 它将负责管理集群范围内的所有变更，例如增加、

删除索引，或者增加、删除节点等。 而主节点并不需要涉及到文档级别的变更和搜索等操作，所以当集群只拥有一个主节点的情况下，即使流量的增加它也不会成为瓶颈。 任何节点都可以成为主节点。我们的示例集群就只有一个节点，所以它同时也成为了主节点。

作为用户，我们可以将请求发送到集群中的任何节点 ，包括主节点。 每个节点都知道

任意文档所处的位置，并且能够将我们的请求直接转发到存储我们所需文档的节点。 无论我们将请求发送到哪个节点，它都能负责从各个包含我们所需文档的节点收集回数据，并将最终结果返回給客户端。 Elasticsearch 对这一切的管理都是透明的。

## 35-进阶-单节点集群

我们在包含一个空节点的集群内创建名为 users 的索引，为了演示目的，我们将分配 3个主分片和一份副本（每个主分片拥有一个副本分片）。

```json
#PUT http://127.0.0.1:1001/users
{
    "settings" : {
        "number_of_shards" : 3,
        "number_of_replicas" : 1
    }
}
```
 

集群现在是拥有一个索引的单节点集群。所有 3 个主分片都被分配在 node-1 。

![](https://img-blog.csdnimg.cn/img_convert/54ee6753be248cc7d345b38a0eae7d96.png)

通过 elasticsearch-head 插件（一个Chrome插件）查看集群情况 。

![](https://img-blog.csdnimg.cn/img_convert/e8b15d0b243d486e91f478a220da63bf.png)

*   集群健康值:yellow( 3 of 6 )：表示当前集群的全部主分片都正常运行，但是副本分片没有全部处在正常状态。
*   ![](https://img-blog.csdnimg.cn/img_convert/489b6de480112879a00067b793bde685.png)

：3 个主分片正常。
*   ![](https://img-blog.csdnimg.cn/img_convert/3ce9a78d26ee762f0a7a8abf7817a58e.png)

：3 个副本分片都是 Unassigned，它们都没有被分配到任何节点。 在同 一个节点上既保存原始数据又保存副本是没有意义的，因为一旦失去了那个节点，我们也将丢失该节点 上的所有副本数据。

当前集群是正常运行的，但存在丢失数据的风险。

* * *

**elasticsearch-head chrome插件安装**

[插件获取网址](https://github.com/mobz/elasticsearch-head)，下载压缩包，解压后将内容放入自定义命名为elasticsearch-head文件夹。

接着点击Chrome右上角选项->工具->管理扩展（或则地址栏输入chrome://extensions/），选择打开“开发者模式”，让后点击“加载已解压得扩展程序”，选择elasticsearch-head/\_site，即可完成chrome插件安装。

## 36-进阶-故障转移

当集群中只有一个节点在运行时，意味着会有一个单点故障问题——没有冗余。 幸运的是，我们只需再启动一个节点即可防止数据丢失。当你在同一台机器上启动了第二个节点时，只要它和第一个节点有同样的 cluster.name 配置，它就会自动发现集群并加入到其中。但是在不同机器上启动节点的时候，为了加入到同一集群，你需要配置一个可连接到的单播主机列表。之所以配置为使用单播发现，以防止节点无意中加入集群。只有在同一台机器上

运行的节点才会自动组成集群。

如果启动了第二个节点，集群将会拥有两个节点 : 所有主分片和副本分片都已被分配 。

![](https://img-blog.csdnimg.cn/img_convert/bf76cb1bfbdf07555918d9055817ab44.png)

通过 elasticsearch-head 插件查看集群情况

![](https://img-blog.csdnimg.cn/img_convert/18db400822b83e727d6206f486b7b2ea.png)

*   集群健康值:green( 3 of 6 )：表示所有 6 个分片（包括 3 个主分片和 3 个副本分片）都在正常运行。
*   ![](https://img-blog.csdnimg.cn/img_convert/e485d8263a4aa3a94af0be951bd5a241.png)

：3 个主分片正常。
*   ![](https://img-blog.csdnimg.cn/img_convert/e485d8263a4aa3a94af0be951bd5a241.png)

：第二个节点加入到集群后， 3 个副本分片将会分配到这个节点上——每 个主分片对应一个副本分片。这意味着当集群内任何一个节点出现问题时，我们的数据都完好无损。所 有新近被索引的文档都将会保存在主分片上，然后被并行的复制到对应的副本分片上。这就保证了我们 既可以从主分片又可以从副本分片上获得文档。

## 37-进阶-水平扩容

怎样为我们的正在增长中的应用程序按需扩容呢？当启动了第三个节点，我们的集群将会拥有三个节点的集群 : 为了分散负载而对分片进行重新分配 。

![](https://img-blog.csdnimg.cn/img_convert/d527e26aa2bccdf54b11410024eadc92.png)

通过 elasticsearch-head 插件查看集群情况。

![](https://img-blog.csdnimg.cn/img_convert/6985fe14454c1269204478320d089bd7.png)

*   集群健康值:green( 3 of 6 )：表示所有 6 个分片（包括 3 个主分片和 3 个副本分片）都在正常运行。
*   ![](https://img-blog.csdnimg.cn/img_convert/9494419153adb44bedb395ac5d7bc488.png)

Node 1 和 Node 2 上各有一个分片被迁移到了新的 Node 3 节点，现在每个节点上都拥有 2 个分片， 而不是之前的 3 个。 这表示每个节点的硬件资源（CPU, RAM, I/O）将被更少的分片所共享，每个分片 的性能将会得到提升。

分片是一个功能完整的搜索引擎，它拥有使用一个节点上的所有资源的能力。 我们这个拥有 6 个分 片（3 个主分片和 3 个副本分片）的索引可以最大扩容到 6 个节点，每个节点上存在一个分片，并且每个 分片拥有所在节点的全部资源。

**但是如果我们想要扩容超过 6 个节点怎么办呢？**

主分片的数目在索引创建时就已经确定了下来。实际上，这个数目定义了这个索引能够

存储 的最大数据量。（实际大小取决于你的数据、硬件和使用场景。） 但是，读操作——

搜索和返回数据——可以同时被主分片 或 副本分片所处理，所以当你拥有越多的副本分片

时，也将拥有越高的吞吐量。

在运行中的集群上是可以动态调整副本分片数目的，我们可以按需伸缩集群。让我们把

副本数从默认的 1 增加到 2。

```json
#PUT http://127.0.0.1:1001/users/_settings

{
    "number_of_replicas" : 2
}
```
 

users 索引现在拥有 9 个分片： 3 个主分片和 6 个副本分片。 这意味着我们可以将集群

扩容到 9 个节点，每个节点上一个分片。相比原来 3 个节点时，集群搜索性能可以提升 3 倍。

![](https://img-blog.csdnimg.cn/img_convert/97fd01e34e5d8df23d226c4fef157801.png)

通过 elasticsearch-head 插件查看集群情况：

![](https://img-blog.csdnimg.cn/img_convert/8bf9dbf0cec5b7875bf8aa9d17a9a67c.png)

当然，如果只是在相同节点数目的集群上增加更多的副本分片并不能提高性能，因为每

个分片从节点上获得的资源会变少。 你需要增加更多的硬件资源来提升吞吐量。

但是更多的副本分片数提高了数据冗余量：按照上面的节点配置，我们可以在失去 2 个节点

的情况下不丢失任何数据。

## 38-进阶-应对故障

我们关闭第一个节点，这时集群的状态为:关闭了一个节点后的集群。

![](https://img-blog.csdnimg.cn/img_convert/44e841004be934e6bce08187ca3852bb.png)

我们关闭的节点是一个主节点。而集群必须拥有一个主节点来保证正常工作，所以发生

的第一件事情就是选举一个新的主节点： Node 2 。在我们关闭 Node 1 的同时也失去了主

分片 1 和 2 ，并且在缺失主分片的时候索引也不能正常工作。 如果此时来检查集群的状况，我们看到的状态将会为 red ：不是所有主分片都在正常工作。

幸运的是，在其它节点上存在着这两个主分片的完整副本， 所以新的主节点立即将这些分片在 Node 2 和 Node 3 上对应的副本分片提升为主分片， 此时集群的状态将会为yellow。这个提升主分片的过程是瞬间发生的，如同按下一个开关一般。

![](https://img-blog.csdnimg.cn/img_convert/e956bda7e0d005699e27760d4193d101.png)

**为什么我们集群状态是 yellow 而不是 green 呢？**

虽然我们拥有所有的三个主分片，但是同时设置了每个主分片需要对应 2 份副本分片，而此

时只存在一份副本分片。 所以集群不能为 green 的状态，不过我们不必过于担心：如果我

们同样关闭了 Node 2 ，我们的程序 依然 可以保持在不丢任何数据的情况下运行，因为

Node 3 为每一个分片都保留着一份副本。

如果想回复原来的样子，要确保Node-1的配置文件有如下配置：

```yaml
discovery.seed_hosts: ["localhost:9302", "localhost:9303"]
```
 

集群可以将缺失的副本分片再次进行分配，那么集群的状态也将恢复成之前的状态。 如果 Node 1 依然拥有着之前的分片，它将尝试去重用它们，同时仅从主分片复制发生了修改的数据文件。和之前的集群相比，只是 Master 节点切换了。

![](https://img-blog.csdnimg.cn/img_convert/37eea6a8dae7ba908312f2ebf0eced11.png)

## 39-进阶-路由计算 & 分片控制

### 路由计算

当索引一个文档的时候，文档会被存储到一个主分片中。 Elasticsearch 如何知道一个

文档应该存放到哪个分片中呢？当我们创建文档时，它如何决定这个文档应当被存储在分片 1 还是分片 2 中呢？首先这肯定不会是随机的，否则将来要获取文档的时候我们就不知道从何处寻找了。实际上，这个过程是根据下面这个公式决定的：

```
shard = hash(routing) % number_of_primary_shards
```
 

routing 是一个可变值，默认是文档的 \_id ，也可以设置成一个自定义的值。 routing 通过hash 函数生成一个数字，然后这个数字再除以 number\_of\_primary\_shards （主分片的数量）后得到余数 。这个分布在 0 到 number\_of\_primary\_shards-1 之间的余数，就是我们所寻求的文档所在分片的位置。

![](https://img-blog.csdnimg.cn/img_convert/9c34e8603887c2bed475416e3b67cd9a.png)

这就解释了为什么我们要在创建索引的时候就确定好主分片的数量并且永远不会改变这个数量:因为如果数量变化了，那么所有之前路由的值都会无效，文档也再也找不到了。

所有的文档API ( get . index . delete 、 bulk , update以及 mget ）都接受一个叫做routing 的路由参数，通过这个参数我们可以自定义文档到分片的映射。一个自定义的路由参数可以用来确保所有相关的文档—一例如所有属于同一个用户的文档——都被存储到同一个分片中。

### 分片控制

我们可以发送请求到集群中的任一节点。每个节点都有能力处理任意请求。每个节点都知道集群中任一文档位置，所以可以直接将请求转发到需要的节点上。在下面的例子中，如果将所有的请求发送到Node 1001，我们将其称为协调节点**coordinating node**。

![](https://img-blog.csdnimg.cn/img_convert/3940d6cdb197259368542b86384911a4.png)

当发送请求的时候， 为了扩展负载，更好的做法是轮询集群中所有的节点。

## 40-进阶-数据写流程

新建、索引和删除请求都是写操作， 必须在主分片上面完成之后才能被复制到相关的副本分片。

![](https://img-blog.csdnimg.cn/img_convert/418356a32516c222a8d366df021276c2.png)

在客户端收到成功响应时，文档变更已经在主分片和所有副本分片执行完成，变更是安全的。有一些可选的**请求参数**允许您影响这个过程，可能以数据安全为代价提升性能。这些选项很少使用，因为 Elasticsearch 已经很快，但是为了完整起见， 请参考下文：

1.  consistency

*   即一致性。在默认设置下，即使仅仅是在试图执行一个写操作之前，主分片都会要求必须要有规定数量quorum（或者换种说法，也即必须要有大多数）的分片副本处于活跃可用状态，才会去执行写操作（其中分片副本 可以是主分片或者副本分片）。这是为了避免在发生网络分区故障（network partition）的时候进行写操作，进而导致数据不一致。 规定数量即： **int((primary + number\_of\_replicas) / 2 ) + 1**
*   consistency 参数的值可以设为：
*   one ：只要主分片状态 ok 就允许执行写操作。
*   all：必须要主分片和所有副本分片的状态没问题才允许执行写操作。
*   quorum：默认值为quorum , 即大多数的分片副本状态没问题就允许执行写操作。
*   注意，规定数量的计算公式中number\_of\_replicas指的是在索引设置中的设定副本分片数，而不是指当前处理活动状态的副本分片数。如果你的索引设置中指定了当前索引拥有3个副本分片，那规定数量的计算结果即：**int((1 primary + 3 replicas) / 2) + 1 = 3**，如果此时你只启动两个节点，那么处于活跃状态的分片副本数量就达不到规定数量，也因此您将无法索引和删除任何文档。

2.  timeout
*   如果没有足够的副本分片会发生什么？Elasticsearch 会等待，希望更多的分片出现。默认情况下，它最多等待 1 分钟。 如果你需要，你可以使用timeout参数使它更早终止：100是100 毫秒，30s是30秒。

新索引默认有1个副本分片，这意味着为满足规定数量应该需要两个活动的分片副本。 但是，这些默认的设置会阻止我们在单一节点上做任何事情。为了避免这个问题，要求只有当number\_of\_replicas 大于1的时候，规定数量才会执行。

## 41-进阶-数据读流程

![](https://img-blog.csdnimg.cn/img_convert/7139df83ee6f7a59c5d3252d34cc8762.png)

在处理读取请求时，协调结点在每次请求的时候都会通过轮询所有的副本分片来达到负载均衡。在文档被检索时，已经被索引的文档可能已经存在于主分片上但是还没有复制到副本分片。 在这种情况下，副本分片可能会报告文档不存在，但是主分片可能成功返回文档。 一旦索引请求成功返回给用户，文档在主分片和副本分片都是可用的。

## 42-进阶-更新流程 & 批量操作流程

### 更新流程

部分更新一个文档结合了先前说明的读取和写入流程：

![](https://img-blog.csdnimg.cn/img_convert/ca41993144aee98311671278725437cd.png)

部分更新一个文档的步骤如下：

1.  客户端向Node 1发送更新请求。
2.  它将请求转发到主分片所在的Node 3 。
3.  Node 3从主分片检索文档，修改\_source字段中的JSON，并且尝试重新索引主分片的文档。如果文档已经被另一个进程修改,它会重试步骤3 ,超过retry\_on\_conflict次后放弃。
4.  如果 Node 3成功地更新文档，它将新版本的文档并行转发到Node 1和 Node 2上的副本分片，重新建立索引。一旦所有副本分片都返回成功，Node 3向协调节点也返回成功，协调节点向客户端返回成功。

当主分片把更改转发到副本分片时， 它不会转发更新请求。 相反，它转发完整文档的新版本。请记住，这些更改将会异步转发到副本分片，并且不能保证它们以发送它们相同的顺序到达。 如果 Elasticsearch 仅转发更改请求，则可能以错误的顺序应用更改，导致得到损坏的文档。

### 批量操作流程

\*\*mget和 bulk API的模式类似于单文档模式。\*\*区别在于协调节点知道每个文档存在于哪个分片中。它将整个多文档请求分解成每个分片的多文档请求，并且将这些请求并行转发到每个参与节点。

协调节点一旦收到来自每个节点的应答，就将每个节点的响应收集整理成单个响应，返回给客户端。

![](https://img-blog.csdnimg.cn/img_convert/b90ea9c79138d8361ca339cff205fdb0.png)

**用单个 mget 请求取回多个文档所需的步骤顺序:**

1.  客户端向 Node 1 发送 mget 请求。
2.  Node 1为每个分片构建多文档获取请求，然后并行转发这些请求到托管在每个所需的主分片或者副本分片的节点上。一旦收到所有答复，Node 1 构建响应并将其返回给客户端。

可以对docs数组中每个文档设置routing参数。

bulk API， 允许在单个批量请求中执行多个创建、索引、删除和更新请求。

![](https://img-blog.csdnimg.cn/img_convert/83499315a7b8ab81471a88f3e142f0a8.png)

**bulk API 按如下步骤顺序执行：**

1.  客户端向Node 1 发送 bulk请求。
2.  Node 1为每个节点创建一个批量请求，并将这些请求并行转发到每个包含主分片的节点主机。
3.  主分片一个接一个按顺序执行每个操作。当每个操作成功时,主分片并行转发新文档（或删除）到副本分片，然后执行下一个操作。一旦所有的副本分片报告所有操作成功，该节点将向协调节点报告成功，协调节点将这些响应收集整理并返回给客户端。

## 43-进阶-倒排索引

分片是Elasticsearch最小的工作单元。但是究竟什么是一个分片，它是如何工作的？

传统的数据库每个字段存储单个值，但这对全文检索并不够。文本字段中的每个单词需要被搜索，对数据库意味着需要单个字段有索引多值的能力。最好的支持是一个字段多个值需求的数据结构是**倒排索引**。

### 倒排索引原理

Elasticsearch使用一种称为倒排索引的结构，它适用于快速的全文搜索。

见其名，知其意，有倒排索引，肯定会对应有正向索引。正向索引（forward index），反向索引（inverted index）更熟悉的名字是**倒排索引**。

所谓的**正向索引**，就是搜索引擎会将待搜索的文件都对应一个文件ID，搜索时将这个ID和搜索关键字进行对应，形成K-V对，然后对关键字进行统计计数。（统计？？下文有解释）

![](https://img-blog.csdnimg.cn/img_convert/cba02cc6d7c5f054dfe5d58fafac9a6a.png)

但是互联网上收录在搜索引擎中的文档的数目是个天文数字，这样的索引结构根本无法满足实时返回排名结果的要求。所以，搜索引擎会将正向索引重新构建为倒排索引，即把文件ID对应到关键词的映射转换为关键词到文件ID的映射，每个关键词都对应着一系列的文件，这些文件中都出现这个关键词。

![](https://img-blog.csdnimg.cn/img_convert/a1f52e96e0ac218b5024d708202afba4.png)

### 倒排索引的例子

一个倒排索引由文档中所有不重复词的列表构成，对于其中每个词，有一个包含它的文档列表。例如，假设我们有两个文档，每个文档的content域包含如下内容：

*   The quick brown fox jumped over the lazy dog
*   Quick brown foxes leap over lazy dogs in summer

为了创建倒排索引，我们首先将每个文档的content域拆分成单独的词（我们称它为词条或tokens )，创建一个包含所有不重复词条的排序列表，然后列出每个词条出现在哪个文档。结果如下所示：

![](https://img-blog.csdnimg.cn/img_convert/3cc642e9bae776c3e617f9d117d41e21.png)

现在，如果我们想搜索 `quick` `brown` ，我们只需要查找包含每个词条的文档：

![](https://img-blog.csdnimg.cn/img_convert/f26aaa01e011edfa68736956b2f1ddea.png)

两个文档都匹配，但是第一个文档比第二个匹配度更高。如果我们使用仅计算匹配词条数量的简单相似性算法，那么我们可以说，对于我们查询的相关性来讲，第一个文档比第二个文档更佳。

但是，我们目前的倒排索引有一些问题：

*   `Quick`和`quick`以独立的词条出现，然而用户可能认为它们是相同的词。
*   `fox`和`foxes`非常相似，就像`dog`和`dogs`；他们有相同的词根。
*   `jumped`和`leap`，尽管没有相同的词根，但他们的意思很相近。他们是同义词。

使用前面的索引搜索`+Quick` `+fox`不会得到任何匹配文档。(记住，＋前缀表明这个词必须存在）。

只有同时出现`Quick`和`fox` 的文档才满足这个查询条件，但是第一个文档包含`quick` `fox` ，第二个文档包含`Quick` `foxes` 。

我们的用户可以合理的期望两个文档与查询匹配。我们可以做的更好。

如果我们将词条规范为标准模式，那么我们可以找到与用户搜索的词条不完全一致，但具有足够相关性的文档。例如：

*   `Quick`可以小写化为`quick`。
*   `foxes`可以词干提取变为词根的格式为`fox`。类似的，`dogs`可以为提取为`dog`。
*   `jumped`和`leap`是同义词，可以索引为相同的单词`jump` 。

现在索引看上去像这样：

![](https://img-blog.csdnimg.cn/img_convert/19813d1918c89461303377444cf85c8c.png)

这还远远不够。我们搜索`+Quick` `+fox` 仍然会失败，因为在我们的索引中，已经没有`Quick`了。但是，如果我们对搜索的字符串使用与content域相同的标准化规则，会变成查询`+quick` `+fox`，这样两个文档都会匹配！分词和标准化的过程称为**分析**，这非常重要。你只能搜索在索引中出现的词条，所以索引文本和查询字符串必须标准化为相同的格式。

## 44-进阶-文档搜索

### 不可改变的倒排索引

早期的全文检索会为整个文档集合建立一个很大的倒排索引并将其写入到磁盘。 一旦新的索引就绪，旧的就会被其替换，这样最近的变化便可以被检索到。

倒排索引被写入磁盘后是不可改变的：它永远不会修改。

*   不需要锁。如果你从来不更新索引，你就不需要担心多进程同时修改数据的问题。
*   一旦索引被读入内核的文件系统缓存，便会留在哪里，由于其不变性。只要文件系统缓存中还有足够的空间，那么大部分读请求会直接请求内存，而不会命中磁盘。这提供了很大的性能提升。
*   其它缓存(像filter缓存)，在索引的生命周期内始终有效。它们不需要在每次数据改变时被重建，因为数据不会变化。
*   写入单个大的倒排索引允许数据被压缩，减少磁盘IO和需要被缓存到内存的索引的使用量。

当然，一个不变的索引也有不好的地方。主要事实是它是不可变的! 你不能修改它。如果你需要让一个新的文档可被搜索，你需要重建整个索引。这要么对一个索引所能包含的数据量造成了很大的限制，要么对索引可被更新的频率造成了很大的限制。

### 动态更新索引

如何在保留不变性的前提下实现倒排索引的更新？

答案是：用更多的索引。通过增加新的补充索引来反映新近的修改，而不是直接重写整个倒排索引。每一个倒排索引都会被轮流查询到,从最早的开始查询完后再对结果进行合并。

Elasticsearch基于Lucene，这个java库引入了**按段搜索**的概念。每一段本身都是一个倒排索引，但索引在 Lucene 中除表示所有段的集合外，还增加了提交点的概念—一个列出了所有已知段的文件。

![](https://img-blog.csdnimg.cn/img_convert/9ee1adbb2d55e710257e01b812a6d8cf.png)

按段搜索会以如下流程执行：

一、新文档被收集到内存索引缓存。

![](https://img-blog.csdnimg.cn/img_convert/9d499fde966ee9825fa5a424d8357489.png)

二、不时地, 缓存被提交。

1.  一个新的段，一个追加的倒排索引，被写入磁盘。
2.  一个新的包含新段名字的提交点被写入磁盘。
3.  磁盘进行同步，所有在文件系统缓存中等待的写入都刷新到磁盘，以确保它们被写入物理文件

三、新的段被开启，让它包含的文档可见以被搜索。

四、内存缓存被清空，等待接收新的文档。

![](https://img-blog.csdnimg.cn/img_convert/f74828ff58cc4635a97e88706a221e50.png)

当一个查询被触发，所有已知的段按顺序被查询。词项统计会对所有段的结果进行聚合，以保证每个词和每个文档的关联都被准确计算。这种方式可以用相对较低的成本将新文档添加到索引。

段是不可改变的，所以既不能从把文档从旧的段中移除，也不能修改旧的段来进行反映文档的更新。取而代之的是，每个提交点会包含一个.del 文件，文件中会列出这些被删除文档的段信息。

当一个\*\*文档被“删除”\*\*时，它实际上只是在 .del 文件中被标记删除。一个被标记删除的文档仍然可以被查询匹配到，但它会在最终结果被返回前从结果集中移除。

**文档更新**也是类似的操作方式:当一个文档被更新时，旧版本文档被标记删除，文档的新版本被索引到一个新的段中。可能两个版本的文档都会被一个查询匹配到，但被删除的那个旧版本文档在结果集返回前就已经被移除。

## 45-进阶-文档刷新 & 文档刷写 & 文档合并

![](https://img-blog.csdnimg.cn/img_convert/b3b31c1e592d5aa794e7c9fcb259c924.png)

![](https://img-blog.csdnimg.cn/img_convert/521c25f0f16247240234d1b8eb3c5f25.png)

### 近实时搜索

随着按段（per-segment）搜索的发展，一个新的文档从索引到可被搜索的延迟显著降低了。新文档在几分钟之内即可被检索，但这样还是不够快。磁盘在这里成为了瓶颈。**提交（Commiting）一个新的段到磁盘需要一个fsync来确保段被物理性地写入磁盘**，这样在断电的时候就不会丢失数据。但是fsync操作代价很大；如果每次索引一个文档都去执行一次的话会造成很大的性能问题。

我们需要的是一个更轻量的方式来使一个文档可被搜索，这意味着fsync要从整个过程中被移除。在Elasticsearch和磁盘之间是**文件系统缓存**。像之前描述的一样，在内存索引缓冲区中的文档会被写入到一个新的段中。但是这里新段会被先写入到文件系统缓存—这一步代价会比较低，稍后再被刷新到磁盘—这一步代价比较高。不过只要文件已经在缓存中，就可以像其它文件一样被打开和读取了。

![](https://img-blog.csdnimg.cn/img_convert/a679d4f5f4bfa6913a53316251beef2a.png)

Lucene允许新段被写入和打开，使其包含的文档在未进行一次完整提交时便对搜索可见。这种方式比进行一次提交代价要小得多，并且在不影响性能的前提下可以被频繁地执行。

![](https://img-blog.csdnimg.cn/img_convert/673d3a77e254fa3a5a6f5293ffb125ab.png)

在 Elasticsearch 中，写入和打开一个新段的轻量的过程叫做refresh。默认情况下每个分片会每秒自动刷新一次。这就是为什么我们说 Elasticsearch是近实时搜索：文档的变化并不是立即对搜索可见，但会在一秒之内变为可见。

这些行为可能会对新用户造成困惑：他们索引了一个文档然后尝试搜索它，但却没有搜到。这个问题的解决办法是用refresh API执行一次手动刷新：/usersl\_refresh

尽管刷新是比提交轻量很多的操作，它还是会有性能开销。当写测试的时候，手动刷新很有用，但是不要在生产环境下每次索引一个文档都去手动刷新。相反，你的应用需要意识到Elasticsearch 的近实时的性质，并接受它的不足。

并不是所有的情况都需要每秒刷新。可能你正在使用Elasticsearch索引大量的日志文件，你可能想优化索引速度而不是近实时搜索，可以通过设置refresh\_interval ，降低每个索引的刷新频率

```json
{
    "settings": {
    	"refresh_interval": "30s"
    }
}
```
 

refresh\_interval可以在既存索引上进行动态更新。在生产环境中，当你正在建立一个大的新索引时，可以先关闭自动刷新，待开始使用该索引时，再把它们调回来。

```
# 关闭自动刷新
PUT /users/_settings
{ "refresh_interval": -1 }

# 每一秒刷新
PUT /users/_settings
{ "refresh_interval": "1s" }
```
 

### 持久化变更

如果没有用fsync把数据从文件系统缓存刷（flush）到硬盘，我们不能保证数据在断电甚至是程序正常退出之后依然存在。为了保证Elasticsearch 的可靠性，需要确保数据变化被持久化到磁盘。在动态更新索引，我们说一次完整的提交会将段刷到磁盘，并写入一个包含所有段列表的提交点。Elasticsearch 在启动或重新打开一个索引的过程中使用这个提交点来判断哪些段隶属于当前分片。

即使通过每秒刷新(refresh）实现了近实时搜索，我们仍然需要经常进行完整提交来确保能从失败中恢复。但在两次提交之间发生变化的文档怎么办?我们也不希望丢失掉这些数据。Elasticsearch 增加了一个translog ，或者叫事务日志，在每一次对Elasticsearch进行操作时均进行了日志记录。

整个流程如下:

一、一个文档被索引之后，就会被添加到内存缓冲区，并且追加到了 translog

![](https://img-blog.csdnimg.cn/img_convert/baeab48c8d6b87660ac4fb954e9c9731.png)

二、刷新（refresh）使分片每秒被刷新（refresh）一次：

*   这些在内存缓冲区的文档被写入到一个新的段中，且没有进行fsync操作。
*   这个段被打开，使其可被搜索。
*   内存缓冲区被清空。

![](https://img-blog.csdnimg.cn/img_convert/17be4247e6b23f31b1e589c70d61e817.png)

三、这个进程继续工作，更多的文档被添加到内存缓冲区和追加到事务日志。

![](https://img-blog.csdnimg.cn/img_convert/4b5c4a3a3ffb4c84625bb283f6a67018.png)

四、每隔一段时间—例如translog变得越来越大，索引被刷新（flush）；一个新的translog被创建，并且一个全量提交被执行。

*   所有在内存缓冲区的文档都被写入一个新的段。
*   缓冲区被清空。
*   一个提交点被写入硬盘。
*   文件系统缓存通过fsync被刷新（flush） 。
*   老的translog被删除。

translog 提供所有还没有被刷到磁盘的操作的一个持久化纪录。当Elasticsearch启动的时候，它会从磁盘中使用最后一个提交点去恢复己知的段，并且会重放translog 中所有在最后一次提交后发生的变更操作。

translog 也被用来提供实时CRUD。当你试着通过ID查询、更新、删除一个文档，它会在尝试从相应的段中检索之前，首先检查 translog任何最近的变更。这意味着它总是能够实时地获取到文档的最新版本。

![](https://img-blog.csdnimg.cn/img_convert/11c7d2cc05244e669eb8402dd8049de9.png)

执行一个提交并且截断translog 的行为在 Elasticsearch被称作一次flush。分片每30分钟被自动刷新（flush)，或者在 translog 太大的时候也会刷新。

你很少需要自己手动执行flush操作，通常情况下，自动刷新就足够了。这就是说，在重启节点或关闭索引之前执行 flush有益于你的索引。当Elasticsearch尝试恢复或重新打开一个索引，它需要重放translog中所有的操作，所以如果日志越短，恢复越快。

translog 的目的是保证操作不会丢失，在文件被fsync到磁盘前，被写入的文件在重启之后就会丢失。默认translog是每5秒被fsync刷新到硬盘，或者在每次写请求完成之后执行（e.g. index, delete, update, bulk）。这个过程在主分片和复制分片都会发生。最终，基本上，这意味着在整个请求被fsync到主分片和复制分片的translog之前，你的客户端不会得到一个200 OK响应。

在每次请求后都执行一个fsync会带来一些性能损失，尽管实践表明这种损失相对较小（特别是 bulk 导入，它在一次请求中平摊了大量文档的开销）。

但是对于一些大容量的偶尔丢失几秒数据问题也并不严重的集群，使用异步的 fsync还是比较有益的。比如，写入的数据被缓存到内存中，再每5秒执行一次 fsync 。如果你决定使用异步translog 的话，你需要保证在发生 crash 时，丢失掉 sync\_interval时间段的数据也无所谓。请在决定前知晓这个特性。如果你不确定这个行为的后果，最好是使用默认的参数{“index.translog.durability”: “request”}来避免数据丢失。

### 段合并

由于自动刷新流程每秒会创建一个新的段，这样会导致短时间内的段数量暴增。而段数目太多会带来较大的麻烦。每一个段都会消耗文件句柄、内存和 cpu运行周期。更重要的是，每个搜索请求都必须轮流检查每个段；所以段越多，搜索也就越慢。

Elasticsearch通过在后台进行段合并来解决这个问题。小的段被合并到大的段，然后这些大的段再被合并到更大的段。

段合并的时候会将那些旧的已删除文档从文件系统中清除。被删除的文档（或被更新文档的旧版本）不会被拷贝到新的大段中。

启动段合并不需要你做任何事。进行索引和搜索时会自动进行。

一、当索引的时候，刷新（refresh）操作会创建新的段并将段打开以供搜索使用。

二、合并进程选择一小部分大小相似的段，并且在后台将它们合并到更大的段中。这并不会中断索引和搜索。

![](https://img-blog.csdnimg.cn/img_convert/c907ca35bd7c0393d46aec2c7038af19.png)

三、一旦合并结束，老的段被删除

*   新的段被刷新(flush)到了磁盘。
*   写入一个包含新段且排除旧的和较小的段的新提交点。
*   新的段被打开用来搜索。老的段被删除。

![](https://img-blog.csdnimg.cn/img_convert/a00cc1c19652c47fcfb663aaf337a41b.png)

合并大的段需要消耗大量的 I/O 和 CPU 资源，如果任其发展会影响搜索性能。 Elasticsearch在默认情况下会对合并流程进行资源限制，所以搜索仍然有足够的资源很好地执行。

## 46-进阶-文档分析

分析包含下面的过程：

*   将一块文本分成适合于倒排索引的独立的词条。
*   将这些词条统一化为标准格式以提高它们的“可搜索性”，或者recall。

分析器执行上面的工作。分析器实际上是将三个功能封装到了一个包里：

*   字符过滤器：首先，字符串按顺序通过每个 字符过滤器 。他们的任务是在分词前整理字符串。一个字符过滤器可以用来去掉 HTML，或者将 & 转化成 and。
*   分词器：其次，字符串被分词器分为单个的词条。一个简单的分词器遇到空格和标点的时候，可能会将文本拆分成词条。
*   Token 过滤器：最后，词条按顺序通过每个 token 过滤器 。这个过程可能会改变词条（例如，小写化Quick ），删除词条（例如， 像 a， and， the 等无用词），或者增加词条（例如，像jump和leap这种同义词）

### 内置分析器

Elasticsearch还附带了可以直接使用的预包装的分析器。接下来我们会列出最重要的分析器。为了证明它们的差异，我们看看每个分析器会从下面的字符串得到哪些词条：

```
"Set the shape to semi-transparent by calling set_trans(5)"
```
 

*   标准分析器

标准分析器是Elasticsearch 默认使用的分析器。它是分析各种语言文本最常用的选择。它根据Unicode 联盟定义的单词边界划分文本。删除绝大部分标点。最后，将词条小写。它会产生：

```
set, the, shape, to, semi, transparent, by, calling, set_trans, 5
```
 

*   简单分析器

简单分析器在任何不是字母的地方分隔文本，将词条小写。它会产生：

```
set, the, shape, to, semi, transparent, by, calling, set, trans
```
 

*   空格分析器

空格分析器在空格的地方划分文本。它会产生:

```
Set, the, shape, to, semi-transparent, by, calling, set_trans(5)
```
 

*   语言分析器

特定语言分析器可用于很多语言。它们可以考虑指定语言的特点。例如，英语分析器附带了一组英语无用词（常用单词，例如and或者the ,它们对相关性没有多少影响），它们会被删除。由于理解英语语法的规则，这个分词器可以提取英语单词的词干。

英语分词器会产生下面的词条：

```
set, shape, semi, transpar, call, set_tran, 5
```
 

注意看transparent、calling和 set\_trans已经变为词根格式。

### 分析器使用场景

当我们索引一个文档，它的全文域被分析成词条以用来创建倒排索引。但是，当我们在全文域搜索的时候，我们需要将查询字符串通过相同的分析过程，以保证我们搜索的词条格式与索引中的词条格式一致。

全文查询，理解每个域是如何定义的，因此它们可以做正确的事：

*   当你查询一个全文域时，会对查询字符串应用相同的分析器，以产生正确的搜索词条列表。
*   当你查询一个精确值域时，不会分析查询字符串，而是搜索你指定的精确值。

### 测试分析器

有些时候很难理解分词的过程和实际被存储到索引中的词条，特别是你刚接触Elasticsearch。为了理解发生了什么，你可以使用analyze API来看文本是如何被分析的。在消息体里，指定分析器和要分析的文本。

```json
#GET http://localhost:9200/_analyze
{
    "analyzer": "standard",
    "text": "Text to analyze"
}
```
 

结果中每个元素代表一个单独的词条：

```json
{
    "tokens": [
        {
            "token": "text", 
            "start_offset": 0, 
            "end_offset": 4, 
            "type": "<ALPHANUM>", 
            "position": 1
        }, 
        {
            "token": "to", 
            "start_offset": 5, 
            "end_offset": 7, 
            "type": "<ALPHANUM>", 
            "position": 2
        }, 
        {
            "token": "analyze", 
            "start_offset": 8, 
            "end_offset": 15, 
            "type": "<ALPHANUM>", 
            "position": 3
        }
    ]
}
```
 

*   token是实际存储到索引中的词条。
*   start\_ offset 和end\_ offset指明字符在原始字符串中的位置。
*   position指明词条在原始文本中出现的位置。

### 指定分析器

当Elasticsearch在你的文档中检测到一个新的字符串域，它会自动设置其为一个全文字符串域，使用 标准 分析器对它进行分析。你不希望总是这样。可能你想使用一个不同的分析器，适用于你的数据使用的语言。有时候你想要一个字符串域就是一个字符串域，不使用分析，直接索引你传入的精确值，例如用户 ID 或者一个内部的状态域或标签。要做到这一点，我们必须手动指定这些域的映射。

（细粒度指定分析器）

### IK分词器

首先通过 Postman 发送 GET 请求查询分词效果

```json
# GET http://localhost:9200/_analyze
{
	"text":"测试单词"
}
```
 

ES 的默认分词器无法识别中文中测试、 单词这样的词汇，而是简单的将每个字拆完分为一个词。

```json
{
    "tokens": [
        {
            "token": "测", 
            "start_offset": 0, 
            "end_offset": 1, 
            "type": "<IDEOGRAPHIC>", 
            "position": 0
        }, 
        {
            "token": "试", 
            "start_offset": 1, 
            "end_offset": 2, 
            "type": "<IDEOGRAPHIC>", 
            "position": 1
        }, 
        {
            "token": "单", 
            "start_offset": 2, 
            "end_offset": 3, 
            "type": "<IDEOGRAPHIC>", 
            "position": 2
        }, 
        {
            "token": "词", 
            "start_offset": 3, 
            "end_offset": 4, 
            "type": "<IDEOGRAPHIC>", 
            "position": 3
        }
    ]
}
```
 

这样的结果显然不符合我们的使用要求，所以我们需要下载 ES 对应版本的中文分词器。

[IK 中文分词器下载网址](https://github.com/medcl/elasticsearch-analysis-ik/releases/tag/v7.8.0)

将解压后的后的文件夹放入 ES 根目录下的 plugins 目录下，重启 ES 即可使用。

我们这次加入新的查询参数"analyzer":“ik\_max\_word”。

```json
# GET http://localhost:9200/_analyze
{
	"text":"测试单词",
	"analyzer":"ik_max_word"
}
```
 

*   ik\_max\_word：会将文本做最细粒度的拆分。
*   ik\_smart：会将文本做最粗粒度的拆分。

使用中文分词后的结果为：

```json
{
    "tokens": [
        {
            "token": "测试", 
            "start_offset": 0, 
            "end_offset": 2, 
            "type": "CN_WORD", 
            "position": 0
        }, 
        {
            "token": "单词", 
            "start_offset": 2, 
            "end_offset": 4, 
            "type": "CN_WORD", 
            "position": 1
        }
    ]
}
```
 

ES 中也可以进行扩展词汇，首先查询

```json
#GET http://localhost:9200/_analyze

{
    "text":"弗雷尔卓德",
    "analyzer":"ik_max_word"
}
```
 

仅仅可以得到每个字的分词结果，我们需要做的就是使分词器识别到弗雷尔卓德也是一个词语。

```json
{
    "tokens": [
        {
            "token": "弗",
            "start_offset": 0,
            "end_offset": 1,
            "type": "CN_CHAR",
            "position": 0
        },
        {
            "token": "雷",
            "start_offset": 1,
            "end_offset": 2,
            "type": "CN_CHAR",
            "position": 1
        },
        {
            "token": "尔",
            "start_offset": 2,
            "end_offset": 3,
            "type": "CN_CHAR",
            "position": 2
        },
        {
            "token": "卓",
            "start_offset": 3,
            "end_offset": 4,
            "type": "CN_CHAR",
            "position": 3
        },
        {
            "token": "德",
            "start_offset": 4,
            "end_offset": 5,
            "type": "CN_CHAR",
            "position": 4
        }
    ]
}
```
 

1.  首先进入 ES 根目录中的 plugins 文件夹下的 ik 文件夹，进入 config 目录，创建 custom.dic文件，写入“弗雷尔卓德”。
2.  同时打开 IKAnalyzer.cfg.xml 文件，将新建的 custom.dic 配置其中。
3.  重启 ES 服务器 。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
	<comment>IK Analyzer 扩展配置</comment>
	<!--用户可以在这里配置自己的扩展字典 -->
	<entry key="ext_dict">custom.dic</entry>
	 <!--用户可以在这里配置自己的扩展停止词字典-->
	<entry key="ext_stopwords"></entry>
	<!--用户可以在这里配置远程扩展字典 -->
	<!-- <entry key="remote_ext_dict">words_location</entry> -->
	<!--用户可以在这里配置远程扩展停止词字典-->
	<!-- <entry key="remote_ext_stopwords">words_location</entry> -->
</properties>
```
 

扩展后再次查询

```json
# GET http://localhost:9200/_analyze
{
	"text":"测试单词",
	"analyzer":"ik_max_word"
}
```
 

返回结果如下：

```json
{
    "tokens": [
        {
            "token": "弗雷尔卓德",
            "start_offset": 0,
            "end_offset": 5,
            "type": "CN_WORD",
            "position": 0
        }
    ]
}
```
 

### 自定义分析器

虽然Elasticsearch带有一些现成的分析器，然而在分析器上Elasticsearch真正的强大之处在于，你可以通过在一个适合你的特定数据的设置之中组合字符过滤器、分词器、词汇单元过滤器来创建自定义的分析器。在分析与分析器我们说过，一个分析器就是在一个包里面组合了三种函数的一个包装器，三种函数按照顺序被执行：

#### 字符过滤器

字符过滤器用来整理一个尚未被分词的字符串。例如，如果我们的文本是HTML格式的，它会包含像`<p>`或者`<div>`这样的HTML标签，这些标签是我们不想索引的。我们可以使用html清除字符过滤器来移除掉所有的HTML标签，并且像把`&Aacute;`转换为相对应的Unicode字符Á 这样，转换HTML实体。一个分析器可能有0个或者多个字符过滤器。

#### 分词器

一个分析器必须有一个唯一的分词器。分词器把字符串分解成单个词条或者词汇单元。标准分析器里使用的标准分词器把一个字符串根据单词边界分解成单个词条，并且移除掉大部分的标点符号，然而还有其他不同行为的分词器存在。

例如，关键词分词器完整地输出接收到的同样的字符串，并不做任何分词。空格分词器只根据空格分割文本。正则分词器根据匹配正则表达式来分割文本。

#### 词单元过滤器

经过分词，作为结果的词单元流会按照指定的顺序通过指定的词单元过滤器。词单元过滤器可以修改、添加或者移除词单元。我们已经提到过lowercase和stop词过滤器，但是在Elasticsearch 里面还有很多可供选择的词单元过滤器。词干过滤器把单词遏制为词干。ascii\_folding过滤器移除变音符，把一个像"très”这样的词转换为“tres”。

ngram和 edge\_ngram词单元过滤器可以产生适合用于部分匹配或者自动补全的词单元。

#### 自定义分析器例子

接下来，我们看看如何创建自定义的分析器：

```json
#PUT http://localhost:9200/my_index

{
    "settings": {
        "analysis": {
            "char_filter": {
                "&_to_and": {
                    "type": "mapping", 
                    "mappings": [
                        "&=> and "
                    ]
                }
            }, 
            "filter": {
                "my_stopwords": {
                    "type": "stop", 
                    "stopwords": [
                        "the", 
                        "a"
                    ]
                }
            }, 
            "analyzer": {
                "my_analyzer": {
                    "type": "custom", 
                    "char_filter": [
                        "html_strip", 
                        "&_to_and"
                    ], 
                    "tokenizer": "standard", 
                    "filter": [
                        "lowercase", 
                        "my_stopwords"
                    ]
                }
            }
        }
    }
}
```
 

索引被创建以后，使用 analyze API 来 测试这个新的分析器：

```json
# GET http://127.0.0.1:9200/my_index/_analyze
{
    "text":"The quick & brown fox",
    "analyzer": "my_analyzer"
}
```
 

返回结果为：

```json
{
    "tokens": [
        {
            "token": "quick",
            "start_offset": 4,
            "end_offset": 9,
            "type": "<ALPHANUM>",
            "position": 1
        },
        {
            "token": "and",
            "start_offset": 10,
            "end_offset": 11,
            "type": "<ALPHANUM>",
            "position": 2
        },
        {
            "token": "brown",
            "start_offset": 12,
            "end_offset": 17,
            "type": "<ALPHANUM>",
            "position": 3
        },
        {
            "token": "fox",
            "start_offset": 18,
            "end_offset": 21,
            "type": "<ALPHANUM>",
            "position": 4
        }
    ]
}
```
 

## 47-进阶-文档控制

### 文档冲突

当我们使用index API更新文档，可以一次性读取原始文档，做我们的修改，然后重新索引整个文档。最近的索引请求将获胜：无论最后哪一个文档被索引，都将被唯一存储在 Elasticsearch 中。如果其他人同时更改这个文档，他们的更改将丢失。

很多时候这是没有问题的。也许我们的主数据存储是一个关系型数据库，我们只是将数据复制到Elasticsearch中并使其可被搜索。也许两个人同时更改相同的文档的几率很小。或者对于我们的业务来说偶尔丢失更改并不是很严重的问题。

但有时丢失了一个变更就是非常严重的。试想我们使用Elasticsearch 存储我们网上商城商品库存的数量，每次我们卖一个商品的时候，我们在 Elasticsearch 中将库存数量减少。有一天，管理层决定做一次促销。突然地，我们一秒要卖好几个商品。假设有两个web程序并行运行，每一个都同时处理所有商品的销售。

![](https://img-blog.csdnimg.cn/img_convert/49ca2ec50db3ddd0fcd1f364ac600b96.png)

web\_1 对stock\_count所做的更改已经丢失，因为 web\_2不知道它的 stock\_count的拷贝已经过期。结果我们会认为有超过商品的实际数量的库存，因为卖给顾客的库存商品并不存在，我们将让他们非常失望。

变更越频繁，读数据和更新数据的间隙越长，也就越可能丢失变更。在数据库领域中，有两种方法通常被用来确保并发更新时变更不会丢失：

*   悲观并发控制：这种方法被关系型数据库广泛使用，它假定有变更冲突可能发生，因此阻塞访问资源以防止冲突。一个典型的例子是读取一行数据之前先将其锁住，确保只有放置锁的线程能够对这行数据进行修改。
*   乐观并发控制：Elasticsearch 中使用的这种方法假定冲突是不可能发生的，并且不会阻塞正在尝试的操作。然而，如果源数据在读写当中被修改，更新将会失败。应用程序接下来将决定该如何解决冲突。例如，可以重试更新、使用新的数据、或者将相关情况报告给用户。

### 乐观并发控制

Elasticsearch是分布式的。当文档创建、更新或删除时，新版本的文档必须复制到集群中的其他节点。Elasticsearch也是异步和并发的，这意味着这些复制请求被并行发送，并且到达目的地时也许顺序是乱的。Elasticsearch需要一种方法确保文档的旧版本不会覆盖新的版本。

当我们之前讨论index , GET和DELETE请求时，我们指出每个文档都有一个\_version（版本号），当文档被修改时版本号递增。Elasticsearch使用这个version号来确保变更以正确顺序得到执行。如果旧版本的文档在新版本之后到达，它可以被简单的忽略。

我们可以利用version号来确保应用中相互冲突的变更不会导致数据丢失。我们通过指定想要修改文档的 version号来达到这个目的。如果该版本不是当前版本号，我们的请求将会失败。

老的版本es使用version，但是新版本不支持了，会报下面的错误，提示我们用if\_seq \_no和if \_primary\_term

创建索引

```json
#PUT http://127.0.0.1:9200/shopping/_create/1001
```
 

返回结果

```json
{
    "_index": "shopping",
    "_type": "_doc",
    "_id": "1001",
    "_version": 1,
    "result": "created",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 10,
    "_primary_term": 15
}
```
 

更新数据

```json
#POST http://127.0.0.1:9200/shopping/_update/1001
{
    "doc":{
        "title":"华为手机"
    }
}
```
 

返回结果：

```json
{
    "_index": "shopping",
    "_type": "_doc",
    "_id": "1001",
    "_version": 2,
    "result": "updated",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 11,
    "_primary_term": 15
}
```
 

旧版本使用的防止冲突更新方法：

```json
#POST http://127.0.0.1:9200/shopping/_update/1001?version=1
{
    "doc":{
        "title":"华为手机2"
    }
}
```
 

返回结果：

```json
{
    "error": {
        "root_cause": [
            {
                "type": "action_request_validation_exception",
                "reason": "Validation Failed: 1: internal versioning can not be used for optimistic concurrency control. Please use `if_seq_no` and `if_primary_term` instead;"
            }
        ],
        "type": "action_request_validation_exception",
        "reason": "Validation Failed: 1: internal versioning can not be used for optimistic concurrency control. Please use `if_seq_no` and `if_primary_term` instead;"
    },
    "status": 400
}
```
 

新版本使用的防止冲突更新方法：

```json
#POST http://127.0.0.1:9200/shopping/_update/1001?if_seq_no=11&if_primary_term=15
{
    "doc":{
        "title":"华为手机2"
    }
}
```
 

返回结果：

```json
{
    "_index": "shopping",
    "_type": "_doc",
    "_id": "1001",
    "_version": 3,
    "result": "updated",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 12,
    "_primary_term": 16
}
```
 

### 外部系统版本控制

一个常见的设置是使用其它数据库作为主要的数据存储，使用Elasticsearch做数据检索，这意味着主数据库的所有更改发生时都需要被复制到Elasticsearch，如果多个进程负责这一数据同步，你可能遇到类似于之前描述的并发问题。

如果你的主数据库已经有了版本号，或一个能作为版本号的字段值比如timestamp，那么你就可以在 Elasticsearch 中通过增加 version\_type=extermal到查询字符串的方式重用这些相同的版本号，版本号必须是大于零的整数，且小于9.2E+18，一个Java中 long类型的正值。

外部版本号的处理方式和我们之前讨论的内部版本号的处理方式有些不同，Elasticsearch不是检查当前\_version和请求中指定的版本号是否相同，而是检查当前\_version是否小于指定的版本号。如果请求成功，外部的版本号作为文档的新\_version进行存储。

```json
#POST http://127.0.0.1:9200/shopping/_doc/1001?version=300&version_type=external
{
	"title":"华为手机2"
}
```
 

返回结果：

```json
{
    "_index": "shopping",
    "_type": "_doc",
    "_id": "1001",
    "_version": 300,
    "result": "updated",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 13,
    "_primary_term": 16
}
```
 

## 48-进阶-文档展示-Kibana

Kibana是一个免费且开放的用户界面，能够让你对Elasticsearch 数据进行可视化，并让你在Elastic Stack 中进行导航。你可以进行各种操作，从跟踪查询负载，到理解请求如何流经你的整个应用，都能轻松完成。

[Kibana下载网址](https://artifacts.elastic.co/downloads/kibana/kibana-7.8.0-windows-x86_64.zip)

一、解压缩下载的 zip 文件。

二、修改 config/kibana.yml 文件。

```yaml
# 默认端口
server.port: 5601
# ES 服务器的地址
elasticsearch.hosts: ["http://localhost:9200"]
# 索引名
kibana.index: ".kibana"
# 支持中文
i18n.locale: "zh-CN"
```
 

三、Windows 环境下执行 bin/kibana.bat 文件。（首次启动有点耗时）

四、通过浏览器访问：http://localhost:5601。

![](https://img-blog.csdnimg.cn/img_convert/d066ba5e26916624b5d056d04c5580ac.png)

# 第5章 Elasticsearch集成

## 49-框架集成-SpringData-整体介绍

Spring Data是一个用于简化数据库、非关系型数据库、索引库访问，并支持云服务的开源框架。其主要目标是使得对数据的访问变得方便快捷，并支持 map-reduce框架和云计算数据服务。Spring Data可以极大的简化JPA(Elasticsearch…)的写法，可以在几乎不用写实现的情况下，实现对数据的访问和操作。除了CRUD 外，还包括如分页、排序等一些常用的功能。

[Spring Data 的官网](https://spring.io/projects/spring-data)

Spring Data 常用的功能模块如下：

*   Spring Data JDBC
*   Spring Data JPA
*   Spring Data LDAP
*   Spring Data MongoDB
*   Spring Data Redis
*   Spring Data R2DBC
*   Spring Data REST
*   Spring Data for Apache Cassandra
*   Spring Data for Apache Geode
*   Spring Data for Apache Solr
*   Spring Data for Pivotal GemFire
*   Spring Data Couchbase
*   Spring Data Elasticsearch
*   Spring Data Envers
*   Spring Data Neo4j
*   Spring Data JDBC Extensions
*   Spring for Apache Hadoop

### Spring Data Elasticsearch 介绍

Spring Data Elasticsearch基于Spring Data API简化 Elasticsearch 操作，将原始操作Elasticsearch 的客户端API进行封装。Spring Data为Elasticsearch 项目提供集成搜索引擎。Spring Data Elasticsearch POJO的关键功能区域为中心的模型与Elastichsearch交互文档和轻松地编写一个存储索引库数据访问层。

[Spring Data Elasticsearch 官网](https://spring.io/projects/spring-data-elasticsearch)

## 50-框架集成-SpringData-代码功能集成

一、创建Maven项目。

二、修改pom文件，增加依赖关系。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.3.6.RELEASE</version>
        <relativePath/>
    </parent>

    <groupId>com.lun</groupId>
    <artifactId>SpringDataWithES</artifactId>
    <version>1.0.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-elasticsearch</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-test</artifactId>
        </dependency>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-test</artifactId>
        </dependency>
    </dependencies>
</project>
```
 

三、增加配置文件。

在 resources 目录中增加application.properties文件

```properties
# es 服务地址
elasticsearch.host=127.0.0.1
# es 服务端口
elasticsearch.port=9200
# 配置日志级别,开启 debug 日志
logging.level.com.atguigu.es=debug
```
 

四、Spring Boot 主程序。

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MainApplication {
    public static void main(String[] args) {
        SpringApplication.run(MainApplication.class, args);
    }
}
```
 

五、数据实体类。

```java
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document(indexName = "shopping", shards = 3, replicas = 1)
public class Product {
    //必须有 id,这里的 id 是全局唯一的标识，等同于 es 中的"_id"
    @Id
    private Long id;//商品唯一标识

    /**
     * type : 字段数据类型
     * analyzer : 分词器类型
     * index : 是否索引(默认:true)
     * Keyword : 短语,不进行分词
     */
    @Field(type = FieldType.Text, analyzer = "ik_max_word")
    private String title;//商品名称

    @Field(type = FieldType.Keyword)
    private String category;//分类名称

    @Field(type = FieldType.Double)
    private Double price;//商品价格

    @Field(type = FieldType.Keyword, index = false)
    private String images;//图片地址
}
```
 

六、配置类

*   ElasticsearchRestTemplate是spring-data-elasticsearch项目中的一个类,和其他spring项目中的 template类似。
*   在新版的spring-data-elasticsearch 中，ElasticsearchRestTemplate 代替了原来的ElasticsearchTemplate。
*   原因是ElasticsearchTemplate基于TransportClient，TransportClient即将在8.x 以后的版本中移除。所以，我们推荐使用ElasticsearchRestTemplate。
*   ElasticsearchRestTemplate基于RestHighLevelClient客户端的。需要自定义配置类，继承AbstractElasticsearchConfiguration，并实现elasticsearchClient()抽象方法，创建RestHighLevelClient对象。

AbstractElasticsearchConfiguration源码：

```json
package org.springframework.data.elasticsearch.config;

import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.context.annotation.Bean;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.ElasticsearchRestTemplate;
import org.springframework.data.elasticsearch.core.convert.ElasticsearchConverter;

/**
 * @author Christoph Strobl
 * @author Peter-Josef Meisch
 * @since 3.2
 * @see ElasticsearchConfigurationSupport
 */
public abstract class AbstractElasticsearchConfiguration extends ElasticsearchConfigurationSupport {

	//需重写本方法
	public abstract RestHighLevelClient elasticsearchClient();

	@Bean(name = { "elasticsearchOperations", "elasticsearchTemplate" })
	public ElasticsearchOperations elasticsearchOperations(ElasticsearchConverter elasticsearchConverter) {
		return new ElasticsearchRestTemplate(elasticsearchClient(), elasticsearchConverter);
	}
}
```
 

需要自定义配置类，继承AbstractElasticsearchConfiguration，并实现elasticsearchClient()抽象方法，创建RestHighLevelClient对象。

```java
import lombok.Data;
import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestClientBuilder;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.config.AbstractElasticsearchConfiguration;

@ConfigurationProperties(prefix = "elasticsearch")
@Configuration
@Data
public class ElasticsearchConfig extends AbstractElasticsearchConfiguration{

    private String host ;
    private Integer port ;
    //重写父类方法
    @Override
    public RestHighLevelClient elasticsearchClient() {
        RestClientBuilder builder = RestClient.builder(new HttpHost(host, port));
        RestHighLevelClient restHighLevelClient = new
                RestHighLevelClient(builder);
        return restHighLevelClient;
    }
}
```
 

七、DAO 数据访问对象

```java
import com.lun.model.Product;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductDao extends ElasticsearchRepository<Product, Long>{

}
```
 

## 51-框架集成-SpringData-集成测试-索引操作

```java
import com.lun.model.Product;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.elasticsearch.core.ElasticsearchRestTemplate;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SpringDataESIndexTest {
    //注入 ElasticsearchRestTemplate
    @Autowired
    private ElasticsearchRestTemplate elasticsearchRestTemplate;
    //创建索引并增加映射配置
    @Test
    public void createIndex(){
        //创建索引，系统初始化会自动创建索引
        System.out.println("创建索引");
    }

    @Test
    public void deleteIndex(){
        //创建索引，系统初始化会自动创建索引
        boolean flg = elasticsearchRestTemplate.deleteIndex(Product.class);
        System.out.println("删除索引 = " + flg);
    }
}
```
 

用Postman 检测有没有创建和删除。

```json
#GET http://localhost:9200/_cat/indices?v
```
 

## 52-框架集成-SpringData-集成测试-文档操作

```java
import com.lun.dao.ProductDao;
import com.lun.model.Product;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SpringDataESProductDaoTest {

    @Autowired
    private ProductDao productDao;
    /**
     * 新增
     */
    @Test
    public void save(){
        Product product = new Product();
        product.setId(2L);
        product.setTitle("华为手机");
        product.setCategory("手机");
        product.setPrice(2999.0);
        product.setImages("http://www.atguigu/hw.jpg");
        productDao.save(product);
    }
    //POSTMAN, GET http://localhost:9200/product/_doc/2

    //修改
    @Test
    public void update(){
        Product product = new Product();
        product.setId(2L);
        product.setTitle("小米 2 手机");
        product.setCategory("手机");
        product.setPrice(9999.0);
        product.setImages("http://www.atguigu/xm.jpg");
        productDao.save(product);
    }
    //POSTMAN, GET http://localhost:9200/product/_doc/2

    //根据 id 查询
    @Test
    public void findById(){
        Product product = productDao.findById(2L).get();
        System.out.println(product);
    }

    @Test
    public void findAll(){
        Iterable<Product> products = productDao.findAll();
        for (Product product : products) {
            System.out.println(product);
        }
    }

    //删除
    @Test
    public void delete(){
        Product product = new Product();
        product.setId(2L);
        productDao.delete(product);
    }
    //POSTMAN, GET http://localhost:9200/product/_doc/2

    //批量新增
    @Test
    public void saveAll(){
        List<Product> productList = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            Product product = new Product();
            product.setId(Long.valueOf(i));
            product.setTitle("["+i+"]小米手机");
            product.setCategory("手机");
            product.setPrice(1999.0 + i);
            product.setImages("http://www.atguigu/xm.jpg");
            productList.add(product);
        }
        productDao.saveAll(productList);
    }

    //分页查询
    @Test
    public void findByPageable(){
        //设置排序(排序方式，正序还是倒序，排序的 id)
        Sort sort = Sort.by(Sort.Direction.DESC,"id");
        int currentPage=0;//当前页，第一页从 0 开始， 1 表示第二页
        int pageSize = 5;//每页显示多少条
        //设置查询分页
        PageRequest pageRequest = PageRequest.of(currentPage, pageSize,sort);
        //分页查询
        Page<Product> productPage = productDao.findAll(pageRequest);
        for (Product Product : productPage.getContent()) {
            System.out.println(Product);
        }
    }
}
```
 

## 53-框架集成-SpringData-集成测试-文档搜索

```java
import com.lun.dao.ProductDao;
import com.lun.model.Product;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.TermQueryBuilder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SpringDataESSearchTest {

    @Autowired
    private ProductDao productDao;
    /**
     * term 查询
     * search(termQueryBuilder) 调用搜索方法，参数查询构建器对象
     */
    @Test
    public void termQuery(){
        TermQueryBuilder termQueryBuilder = QueryBuilders.termQuery("title", "小米");
                Iterable<Product> products = productDao.search(termQueryBuilder);
        for (Product product : products) {
            System.out.println(product);
        }
    }
    /**
     * term 查询加分页
     */
    @Test
    public void termQueryByPage(){
        int currentPage= 0 ;
        int pageSize = 5;
        //设置查询分页
        PageRequest pageRequest = PageRequest.of(currentPage, pageSize);
        TermQueryBuilder termQueryBuilder = QueryBuilders.termQuery("title", "小米");
                Iterable<Product> products =
                        productDao.search(termQueryBuilder,pageRequest);
        for (Product product : products) {
            System.out.println(product);
        }
    }

}
```
 

## 54-框架集成-SparkStreaming-集成

Spark Streaming 是Spark core API的扩展，支持实时数据流的处理，并且具有可扩展，高吞吐量，容错的特点。数据可以从许多来源获取,如Kafka， Flume，Kinesis或TCP sockets，并且可以使用复杂的算法进行处理，这些算法使用诸如 map，reduce，join和 window等高级函数表示。最后，处理后的数据可以推送到文件系统，数据库等。实际上，您可以将Spark的机器学习和图形处理算法应用于数据流。

一、创建Maven项目。

二、修改 pom 文件，增加依赖关系。

```xml
<?xml version="1.0" encoding="utf-8"?>
<project
    xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.lun.es</groupId>
    <artifactId>sparkstreaming-elasticsearch</artifactId>
    <version>1.0</version>
    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.apache.spark</groupId>
            <artifactId>spark-core_2.12</artifactId>
            <version>3.0.0</version>
        </dependency>
        <dependency>
            <groupId>org.apache.spark</groupId>
            <artifactId>spark-streaming_2.12</artifactId>
            <version>3.0.0</version>
        </dependency>
        <dependency>
            <groupId>org.elasticsearch</groupId>
            <artifactId>elasticsearch</artifactId>
            <version>7.8.0</version>
        </dependency>
        <!-- elasticsearch 的客户端 -->
        <dependency>
            <groupId>org.elasticsearch.client</groupId>
            <artifactId>elasticsearch-rest-high-level-client</artifactId>
            <version>7.8.0</version>
        </dependency>
        <!-- elasticsearch 依赖 2.x 的 log4j -->
        <dependency>
            <groupId>org.apache.logging.log4j</groupId>
            <artifactId>log4j-api</artifactId>
            <version>2.8.2</version>
        </dependency>
        <dependency>
            <groupId>org.apache.logging.log4j</groupId>
            <artifactId>log4j-core</artifactId>
            <version>2.8.2</version>
        </dependency>
        <!-- <dependency>-->
        <!-- <groupId>com.fasterxml.jackson.core</groupId>-->
        <!-- <artifactId>jackson-databind</artifactId>-->
        <!-- <version>2.11.1</version>-->
        <!-- </dependency>-->
        <!-- &lt;!&ndash; junit 单元测试 &ndash;&gt;-->
        <!-- <dependency>-->
        <!-- <groupId>junit</groupId>-->
        <!-- <artifactId>junit</artifactId>-->
        <!-- <version>4.12</version>-->
        <!-- </dependency>-->
    </dependencies>
</project>
```
 

三、功能实现

```scala
import org.apache.http.HttpHost
import org.apache.spark.SparkConf
import org.apache.spark.streaming.dstream.ReceiverInputDStream
import org.apache.spark.streaming.{Seconds, StreamingContext}
import org.elasticsearch.action.index.IndexRequest
import org.elasticsearch.client.indices.CreateIndexRequest
import org.elasticsearch.client.{RequestOptions, RestClient, RestHighLevelClient}
import org.elasticsearch.common.xcontent.XContentType
import java.util.Date

object SparkStreamingESTest {

    def main(args: Array[String]): Unit = {
        val sparkConf = new SparkConf().setMaster("local[*]").setAppName("ESTest")
        val ssc = new StreamingContext(sparkConf, Seconds(3))
        val ds: ReceiverInputDStream[String] = ssc.socketTextStream("localhost", 9999)
        ds.foreachRDD(
            rdd => {
                println("*************** " + new Date())
                rdd.foreach(
                    data => {
                        val client = new RestHighLevelClient(RestClient.builder(new HttpHost("localhost", 9200, "http")));
                        // 新增文档 - 请求对象
                        val request = new IndexRequest();
                        
                        // 设置索引及唯一性标识
                        val ss = data.split(" ")
                        println("ss = " + ss.mkString(","))
                        request.index("sparkstreaming").id(ss(0));
                        
                        val productJson =
                            s"""
                            | { "data":"${ss(1)}" }
                            |""".stripMargin;
                        
                        // 添加文档数据，数据格式为 JSON 格式
                        request.source(productJson,XContentType.JSON);
                        
                        // 客户端发送请求，获取响应对象
                        val response = client.index(request,
                        RequestOptions.DEFAULT);
                        System.out.println("_index:" + response.getIndex());
                        System.out.println("_id:" + response.getId());
                        System.out.println("_result:" + response.getResult());
                        client.close()
                    }
                )
            }
        )
        ssc.start()
        ssc.awaitTermination()
    }
}
```
 

## 55-框架集成-Flink-集成

Apache Spark是一-种基于内存的快速、通用、可扩展的大数据分析计算引擎。Apache Spark掀开了内存计算的先河，以内存作为赌注，贏得了内存计算的飞速发展。但是在其火热的同时，开发人员发现，在Spark中，计算框架普遍存在的缺点和不足依然没有完全解决，而这些问题随着5G时代的来临以及决策者对实时数据分析结果的迫切需要而凸显的更加明显：

*   乱序数据，迟到数据
*   低延迟，高吞吐，准确性
*   容错性
*   数据精准一次性处理（Exactly-Once）

Apache Flink是一个框架和分布式处理引擎，用于对无界和有界数据流进行有状态计算。在Spark火热的同时，也默默地发展自己，并尝试着解决其他计算框架的问题。慢慢地，随着这些问题的解决，Flink 慢慢被绝大数程序员所熟知并进行大力推广，阿里公司在2015年改进Flink，并创建了内部分支Blink，目前服务于阿里集团内部搜索、推荐、广告和蚂蚁等大量核心实时业务。

一、创建Maven项目。

二、修改 pom 文件，增加相关依赖类库。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project
    xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.lun.es</groupId>
    <artifactId>flink-elasticsearch</artifactId>
    <version>1.0</version>
    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.apache.flink</groupId>
            <artifactId>flink-scala_2.12</artifactId>
            <version>1.12.0</version>
        </dependency>
        <dependency>
            <groupId>org.apache.flink</groupId>
            <artifactId>flink-streaming-scala_2.12</artifactId>
            <version>1.12.0</version>
        </dependency>
        <dependency>
            <groupId>org.apache.flink</groupId>
            <artifactId>flink-clients_2.12</artifactId>
            <version>1.12.0</version>
        </dependency>
        <dependency>
            <groupId>org.apache.flink</groupId>
            <artifactId>flink-connector-elasticsearch7_2.11</artifactId>
            <version>1.12.0</version>
        </dependency>
        <!-- jackson -->
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-core</artifactId>
            <version>2.11.1</version>
        </dependency>
    </dependencies>
</project>
```
 

三、功能实现

```java
import org.apache.flink.api.common.functions.RuntimeContext;
import org.apache.flink.streaming.api.datastream.DataStreamSource;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.streaming.connectors.elasticsearch.ElasticsearchSinkFunction;
import org.apache.flink.streaming.connectors.elasticsearch.RequestIndexer;
import org.apache.flink.streaming.connectors.elasticsearch7.ElasticsearchSink;
import org.apache.http.HttpHost;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.client.Requests;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FlinkElasticsearchSinkTest {

	public static void main(String[] args) throws Exception {

		StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
		DataStreamSource<String> source = env.socketTextStream("localhost", 9999);
		List<HttpHost> httpHosts = new ArrayList<>();
		httpHosts.add(new HttpHost("127.0.0.1", 9200, "http"));
		//httpHosts.add(new HttpHost("10.2.3.1", 9200, "http"));

		// use a ElasticsearchSink.Builder to create an ElasticsearchSink
		ElasticsearchSink.Builder<String> esSinkBuilder = new ElasticsearchSink.Builder<>(httpHosts, 
			new ElasticsearchSinkFunction<String>() {
				public IndexRequest createIndexRequest(String element) {
					Map<String, String> json = new HashMap<>();
					json.put("data", element);
					return Requests.indexRequest()
						.index("my-index")
						//.type("my-type")
						.source(json);
				}

				@Override
				public void process(String element, RuntimeContext ctx, RequestIndexer indexer) {
					indexer.add(createIndexRequest(element));
				}
			}
		);
		
		// configuration for the bulk requests; this instructs the sink to emit after every element, otherwise they would be buffered
		esSinkBuilder.setBulkFlushMaxActions(1);

		// provide a RestClientFactory for custom configuration on the internally createdREST client
		// esSinkBuilder.setRestClientFactory(
		// restClientBuilder -> {
			// restClientBuilder.setDefaultHeaders(...)
			// restClientBuilder.setMaxRetryTimeoutMillis(...)
			// restClientBuilder.setPathPrefix(...)
			// restClientBuilder.setHttpClientConfigCallback(...)
		// }
		// );
		source.addSink(esSinkBuilder.build());
		env.execute("flink-es");
	}
}
```
 

# 第6章 Elasticsearch优化

## 56-优化-硬件选择

Elasticsearch 的基础是 Lucene，所有的索引和文档数据是存储在本地的磁盘中，具体的路径可在 ES 的配置文件…/config/elasticsearch.yml中配置，如下：

```yaml
#
# Path to directory where to store the data (separate multiple locations by comma):
#
path.data: /path/to/data
#
# Path to log files:
#
path.logs: /path/to/logs
```
 

磁盘在现代服务器上通常都是瓶颈。Elasticsearch重度使用磁盘，你的磁盘能处理的吞吐量越大，你的节点就越稳定。这里有一些优化磁盘I/O的技巧：

*   使用SSD就像其他地方提过的，他们比机械磁盘优秀多了。
*   使用RAID0。条带化RAID会提高磁盘IO，代价显然就是当一块硬盘故障时整个就故障了。不要使用镜像或者奇偶校验RAID，因为副本已经提供了这个功能。
*   另外，使用多块硬盘，并允许Elasticsearch 通过多个path data目录配置把数据条带化分配到它们上面。
*   不要使用远程挂载的存储，比如NFS或者SMB/CIFS。这个引入的延迟对性能来说完全是背道而驰的。

## 57-优化-分片策略

### 合理设置分片数

分片和副本的设计为 ES 提供了支持分布式和故障转移的特性，但并不意味着分片和副本是可以无限分配的。而且索引的分片完成分配后由于索引的路由机制，我们是不能重新修改分片数的。

可能有人会说，我不知道这个索引将来会变得多大，并且过后我也不能更改索引的大小，所以为了保险起见，还是给它设为 1000 个分片吧。但是需要知道的是，一个分片并不是没有代价的。需要了解：

*   一个分片的底层即为一个 Lucene 索引，会消耗一定文件句柄、内存、以及 CPU运转。
*   每一个搜索请求都需要命中索引中的每一个分片，如果每一个分片都处于不同的节点还好， 但如果多个分片都需要在同一个节点上竞争使用相同的资源就有些糟糕了。
*   用于计算相关度的词项统计信息是基于分片的。如果有许多分片，每一个都只有很少的数据会导致很低的相关度。

一个业务索引具体需要分配多少分片可能需要架构师和技术人员对业务的增长有个预先的判断，横向扩展应当分阶段进行。为下一阶段准备好足够的资源。 只有当你进入到下一个阶段，你才有时间思考需要作出哪些改变来达到这个阶段。一般来说，我们遵循一些原则：

*   控制每个分片占用的硬盘容量不超过 ES 的最大 JVM 的堆空间设置（一般设置不超过 32G，参考下文的 JVM 设置原则），因此，如果索引的总容量在 500G 左右，那分片大小在 16 个左右即可；当然，最好同时考虑原则 2。
*   考虑一下 node 数量，一般一个节点有时候就是一台物理机，如果分片数过多，大大超过了节点数，很可能会导致一个节点上存在多个分片，一旦该节点故障，即使保持了 1 个以上的副本，同样有可能会导致数据丢失，集群无法恢复。所以， 一般都设置分片数不超过节点数的 3 倍。
*   主分片，副本和节点最大数之间数量，我们分配的时候可以参考以下关系：

`节点数<=主分片数 *（副本数+1）`

### 推迟分片分配

对于节点瞬时中断的问题，默认情况，集群会等待一分钟来查看节点是否会重新加入，如果这个节点在此期间重新加入，重新加入的节点会保持其现有的分片数据，不会触发新的分片分配。这样就可以减少 ES 在自动再平衡可用分片时所带来的极大开销。

通过修改参数 delayed\_timeout ，可以延长再均衡的时间，可以全局设置也可以在索引级别进行修改：

```json
#PUT /_all/_settings
{
	"settings": {
		"index.unassigned.node_left.delayed_timeout": "5m"
	}
}
```
 

## 58-优化-路由选择

当我们查询文档的时候， Elasticsearch 如何知道一个文档应该存放到哪个分片中呢？它其实是通过下面这个公式来计算出来：

```
shard = hash(routing) % number_of_primary_shards
```
 

routing 默认值是文档的 id，也可以采用自定义值，比如用户 id。

### 不带routing查询

在查询的时候因为不知道要查询的数据具体在哪个分片上，所以整个过程分为2个步骤

*   分发：请求到达协调节点后，协调节点将查询请求分发到每个分片上。
*   聚合：协调节点搜集到每个分片上查询结果，在将查询的结果进行排序，之后给用户返回结果。

### 带routing查询

查询的时候，可以直接根据routing 信息定位到某个分配查询，不需要查询所有的分配，经过协调节点排序。向上面自定义的用户查询，如果routing 设置为userid 的话，就可以直接查询出数据来，效率提升很多。

## 59-优化-写入速度优化

ES 的默认配置，是综合了数据可靠性、写入速度、搜索实时性等因素。实际使用时，我们需要根据公司要求，进行偏向性的优化。

针对于搜索性能要求不高，但是对写入要求较高的场景，我们需要尽可能的选择恰当写优化策略。综合来说，可以考虑以下几个方面来提升写索引的性能：

*   加大Translog Flush，目的是降低Iops、Writeblock。
*   增加Index Refesh间隔，目的是减少Segment Merge的次数。
*   调整Bulk 线程池和队列。
*   优化节点间的任务分布。
*   优化Lucene层的索引建立，目的是降低CPU及IO。

### 优化存储设备

ES 是一种密集使用磁盘的应用，在段合并的时候会频繁操作磁盘，所以对磁盘要求较高，当磁盘速度提升之后，集群的整体性能会大幅度提高。

### 合理使用合并

Lucene 以段的形式存储数据。当有新的数据写入索引时， Lucene 就会自动创建一个新的段。

随着数据量的变化，段的数量会越来越多，消耗的多文件句柄数及 CPU 就越多，查询效率就会下降。

由于 Lucene 段合并的计算量庞大，会消耗大量的 I/O，所以 ES 默认采用较保守的策略，让后台定期进行段合并。

### 减少 Refresh 的次数

Lucene 在新增数据时，采用了延迟写入的策略，默认情况下索引的refresh\_interval 为1 秒。

Lucene 将待写入的数据先写到内存中，超过 1 秒（默认）时就会触发一次 Refresh，然后 Refresh 会把内存中的的数据刷新到操作系统的文件缓存系统中。

如果我们对搜索的实效性要求不高，可以将 Refresh 周期延长，例如 30 秒。

这样还可以有效地减少段刷新次数，但这同时意味着需要消耗更多的 Heap 内存。

### 加大 Flush 设置

Flush 的主要目的是把文件缓存系统中的段持久化到硬盘，当 Translog 的数据量达到 512MB 或者 30 分钟时，会触发一次 Flush。

index.translog.flush\_threshold\_size 参数的默认值是 512MB，我们进行修改。

增加参数值意味着文件缓存系统中可能需要存储更多的数据，所以我们需要为操作系统的文件缓存系统留下足够的空间。

### 减少副本的数量

ES 为了保证集群的可用性，提供了 Replicas（副本）支持，然而每个副本也会执行分析、索引及可能的合并过程，所以 Replicas 的数量会严重影响写索引的效率。

当写索引时，需要把写入的数据都同步到副本节点，副本节点越多，写索引的效率就越慢。

如果我们需要大批量进行写入操作，可以先禁止Replica复制，设置

index.number\_of\_replicas: 0 关闭副本。在写入完成后， Replica 修改回正常的状态。

## 60-优化-内存设置

ES 默认安装后设置的内存是 1GB，对于任何一个现实业务来说，这个设置都太小了。如果是通过解压安装的 ES，则在 ES 安装文件中包含一个 jvm.option 文件，添加如下命令来设置 ES 的堆大小， Xms 表示堆的初始大小， Xmx 表示可分配的最大内存，都是 1GB。

确保 Xmx 和 Xms 的大小是相同的，其目的是为了能够在 Java 垃圾回收机制清理完堆区后不需要重新分隔计算堆区的大小而浪费资源，可以减轻伸缩堆大小带来的压力。

假设你有一个 64G 内存的机器，按照正常思维思考，你可能会认为把 64G 内存都给ES 比较好，但现实是这样吗， 越大越好？虽然内存对 ES 来说是非常重要的，但是答案是否定的！

因为 ES 堆内存的分配需要满足以下两个原则：

*   不要超过物理内存的 50%： Lucene 的设计目的是把底层 OS 里的数据缓存到内存中。Lucene 的段是分别存储到单个文件中的，这些文件都是不会变化的，所以很利于缓存，同时操作系统也会把这些段文件缓存起来，以便更快的访问。如果我们设置的堆内存过大， Lucene 可用的内存将会减少，就会严重影响降低 Lucene 的全文本查询性能。
*   堆内存的大小最好不要超过 32GB：在 Java 中，所有对象都分配在堆上，然后有一个 Klass Pointer 指针指向它的类元数据。这个指针在 64 位的操作系统上为 64 位， 64 位的操作系统可以使用更多的内存（2^64）。在 32 位

的系统上为 32 位， 32 位的操作系统的最大寻址空间为 4GB（2^32）。

但是 64 位的指针意味着更大的浪费，因为你的指针本身大了。浪费内存不算，更糟糕的是，更大的指针在主内存和缓存器（例如 LLC, L1 等）之间移动数据的时候，会占用更多的带宽。

最终我们都会采用 31 G 设置

*   \-Xms 31g
*   \-Xmx 31g

假设你有个机器有 128 GB 的内存，你可以创建两个节点，每个节点内存分配不超过 32 GB。也就是说不超过 64 GB 内存给 ES 的堆内存，剩下的超过 64 GB 的内存给 Lucene。

## 61-优化-重要配置

参数名|参数值|说明|
---|---|---|
cluster.name|elasticsearch|配置 ES 的集群名称，默认值是 ES，建议改成与所存数据相关的名称， ES 会自动发现在同一网段下的 集群名称相同的节点。|
node.name|node-1|集群中的节点名，在同一个集群中不能重复。节点 的名称一旦设置，就不能再改变了。当然，也可以 设 置 成 服 务 器 的 主 机 名 称 ， 例 如 node.name:${HOSTNAME}。|
node.master|true|指定该节点是否有资格被选举成为 Master 节点，默 认是 True，如果被设置为 True，则只是有资格成为 Master 节点，具体能否成为 Master 节点，需要通 过选举产生。|
node.data|true|指定该节点是否存储索引数据，默认为 True。数据 的增、删、改、查都是在 Data 节点完成的。|
index.number\_of\_shards|1|设置都索引分片个数，默认是 1 片。也可以在创建 索引时设置该值，具体设置为多大都值要根据数据 量的大小来定。如果数据量不大，则设置成 1 时效 率最高|
index.number\_of\_replicas|1|设置默认的索引副本个数，默认为 1 个。副本数越 多，集群的可用性越好，但是写索引时需要同步的 数据越多。|
transport.tcp.compress|true|设置在节点间传输数据时是否压缩，默认为 False， 不压缩|
discovery.zen.minimum\_master\_nodes|1|设置在选举 Master 节点时需要参与的最少的候选 主节点数，默认为 1。如果使用默认值，则当网络 不稳定时有可能会出现脑裂。 合 理 的 数 值 为 (master\_eligible\_nodes/2)+1 ， 其 中 master\_eligible\_nodes 表示集群中的候选主节点数|
discovery.zen.ping.timeout|3s|设置在集群中自动发现其他节点时 Ping 连接的超 时时间，默认为 3 秒。 在较差的网络环境下需要设置得大一点，防止因误 判该节点的存活状态而导致分片的转移|

# 第7章 Elasticsearch面试题

## 62-面试题

### 为什么要使用 Elasticsearch？

系统中的数据， 随着业务的发展，时间的推移， 将会非常多， 而业务中往往采用模糊查询进行数据的搜索， 而模糊查询会导致查询引擎放弃索引，导致系统查询数据时都是全表扫描，在百万级别的数据库中，查询效率是非常低下的，而我们使用 ES 做一个全文索引，将经常查询的系统功能的某些字段，比如说电商系统的商品表中商品名，描述、价格还有 id 这些字段我们放入 ES 索引库里，可以提高查询速度。

### Elasticsearch 的 master 选举流程？

*   Elasticsearch的选主是ZenDiscovery模块负责的，主要包含Ping（节点之间通过这个RPC来发现彼此）

和Unicast（单播模块包含-一个主机列表以控制哪些节点需要ping通）这两部分。
*   对所有可以成为master的节点（node master: true）根据nodeId字典排序，每次选举每个节点都把自

己所知道节点排一次序，然后选出第一个（第0位）节点，暂且认为它是master节点。
*   如果对某个节点的投票数达到一定的值（可以成为master节点数n/2+1）并且该节点自己也选举自己，

那这个节点就是master。否则重新选举一直到满足上述条件。
*   master节点的职责主要包括集群、节点和索引的管理，不负责文档级别的管理；data节点可以关闭http

功能。

### Elasticsearch 集群脑裂问题？

“脑裂”问题可能的成因：

*   网络问题：集群间的网络延迟导致一些节点访问不到master, 认为master 挂掉了从而选举出新的master,并对master上的分片和副本标红，分配新的主分片。
*   节点负载：主节点的角色既为master又为data,访问量较大时可能会导致ES停止响应造成大面积延迟，此时其他节点得不到主节点的响应认为主节点挂掉了，会重新选取主节点。
*   内存回收：data 节点上的ES进程占用的内存较大，引发JVM的大规模内存回收，造成ES进程失去响应。

脑裂问题解决方案：

*   减少误判：discovery.zen ping\_ timeout 节点状态的响应时间，默认为3s，可以适当调大，如果master在该响应时间的范围内没有做出响应应答，判断该节点已经挂掉了。调大参数（如6s，discovery.zen.ping\_timeout:6），可适当减少误判。
*   选举触发：discovery.zen.minimum. \_master\_ nodes:1，该参數是用于控制选举行为发生的最小集群主节点数量。当备选主节点的个數大于等于该参数的值，且备选主节点中有该参数个节点认为主节点挂了，进行选举。官方建议为(n / 2) +1, n为主节点个数（即有资格成为主节点的节点个数）。
*   角色分离：即master节点与data节点分离，限制角色

*   主节点配置为：node master: true，node data: false
*   从节点配置为：node master: false，node data: true

### Elasticsearch 索引文档的流程？

![](https://img-blog.csdnimg.cn/img_convert/1bdc6c30d1be9b1bff83a683c64d2ac7.png)

*   协调节点默认使用文档 ID 参与计算（也支持通过 routing），以便为路由提供合适的分片：shard = hash(document\_id) % (num\_of\_primary\_shards)
*   当分片所在的节点接收到来自协调节点的请求后，会将请求写入到 Memory Buffer，然后定时（默认是每隔 1 秒）写入到 Filesystem Cache，这个从 Memory Buffer 到 Filesystem Cache 的过程就叫做 refresh；
*   当然在某些情况下，存在 Momery Buffer 和 Filesystem Cache 的数据可能会丢失， ES 是通过 translog的机制来保证数据的可靠性的。其实现机制是接收到请求后，同时也会写入到 translog 中，当 Filesystemcache 中的数据写入到磁盘中时，才会清除掉，这个过程叫做 flush；
*   在 flush 过程中，内存中的缓冲将被清除，内容被写入一个新段，段的 fsync 将创建一个新的提交点，并将内容刷新到磁盘，旧的 translog 将被删除并开始一个新的 translog。
*   flush 触发的时机是定时触发（默认 30 分钟）或者 translog 变得太大（默认为 512M）时；

### Elasticsearch 更新和删除文档的流程？

*   删除和更新也都是写操作，但是 Elasticsearch 中的文档是不可变的，因此不能被删除或者改动以展示其变更；
*   磁盘上的每个段都有一个相应的.del 文件。当删除请求发送后，文档并没有真的被删除，而是在.del文件中被标记为删除。该文档依然能匹配查询，但是会在结果中被过滤掉。当段合并时，在.del 文件中被标记为删除的文档将不会被写入新段。
*   在新的文档被创建时， Elasticsearch 会为该文档指定一个版本号，当执行更新时，旧版本的文档在.del文件中被标记为删除，新版本的文档被索引到一个新段。旧版本的文档依然能匹配查询，但是会在结果中被过滤掉。

### Elasticsearch 搜索的流程？

![](https://img-blog.csdnimg.cn/img_convert/053a14eee04ace7b4e5aec0ce53a5284.png)

*   搜索被执行成一个两阶段过程，我们称之为 Query Then Fetch；
*   在初始查询阶段时，查询会广播到索引中每一个分片拷贝（主分片或者副本分片）。 每个分片在本地执行搜索并构建一个匹配文档的大小为 from + size 的优先队列。 PS：在搜索的时候是会查询Filesystem Cache 的，但是有部分数据还在 Memory Buffer，所以搜索是近实时的。
*   每个分片返回各自优先队列中 所有文档的 ID 和排序值 给协调节点，它合并这些值到自己的优先队列中来产生一个全局排序后的结果列表。
*   接下来就是取回阶段， 协调节点辨别出哪些文档需要被取回并向相关的分片提交多个 GET 请求。每个分片加载并丰富文档，如果有需要的话，接着返回文档给协调节点。一旦所有的文档都被取回了，协调节点返回结果给客户端。
*   Query Then Fetch 的搜索类型在文档相关性打分的时候参考的是本分片的数据，这样在文档数量较少的时候可能不够准确， DFS Query Then Fetch 增加了一个预查询的处理，询问 Term 和 Document frequency，这个评分更准确，但是性能会变差。

### Elasticsearch 在部署时，对 Linux 的设置有哪些优化方法？

*   64 GB 内存的机器是非常理想的， 但是 32 GB 和 16 GB 机器也是很常见的。少于 8 GB 会适得其反。
*   如果你要在更快的 CPUs 和更多的核心之间选择，选择更多的核心更好。多个内核提供的额外并发远胜过稍微快一点点的时钟频率。
*   如果你负担得起 SSD，它将远远超出任何旋转介质。 基于 SSD 的节点，查询和索引性能都有提升。如果你负担得起， SSD 是一个好的选择。
*   即使数据中心们近在咫尺，也要避免集群跨越多个数据中心。绝对要避免集群跨越大的地理距离。
*   请确保运行你应用程序的 JVM 和服务器的 JVM 是完全一样的。 在 Elasticsearch 的几个地方，使用 Java 的本地序列化。
*   通过设置 gateway.recover\_after\_nodes、 gateway.expected\_nodes、 gateway.recover\_after\_time 可以在集群重启的时候避免过多的分片交换，这可能会让数据恢复从数个小时缩短为几秒钟。
*   Elasticsearch 默认被配置为使用单播发现，以防止节点无意中加入集群。只有在同一台机器上运行的节点才会自动组成集群。最好使用单播代替组播。
*   不要随意修改垃圾回收器（CMS）和各个线程池的大小。
*   把你的内存的（少于）一半给 Lucene（但不要超过 32 GB！），通过 ES\_HEAP\_SIZE 环境变量设置。
*   内存交换到磁盘对服务器性能来说是致命的。如果内存交换到磁盘上，一个 100 微秒的操作可能变成 10 毫秒。 再想想那么多 10 微秒的操作时延累加起来。 不难看出 swapping 对于性能是多么可怕。
*   Lucene 使用了大量的文件。同时， Elasticsearch 在节点和 HTTP 客户端之间进行通信也使用了大量的套接字。 所有这一切都需要足够的文件描述符。你应该增加你的文件描述符，设置一个很大的值，如 64,000。

### GC 方面，在使用 Elasticsearch 时要注意什么？

倒排词典的索引需要常驻内存，无法 GC，需要监控 data node 上 segment memory 增长趋势。

各类缓存， field cache, filter cache, indexing cache, bulk queue 等等，要设置合理的大小，并且要应该根据最坏的情况来看 heap 是否够用，也就是各类缓存全部占满的时候，还有 heap 空间可以分配给其他任务吗？避免采用 clear cache 等“自欺欺人”的方式来释放内存。

避免返回大量结果集的搜索与聚合。确实需要大量拉取数据的场景，可以采用 scan & scroll api 来实现。

cluster stats 驻留内存并无法水平扩展，超大规模集群可以考虑分拆成多个集群通过 tribe node 连接。

想知道 heap 够不够，必须结合实际应用场景，并对集群的 heap 使用情况做持续的监控。

### Elasticsearch 对于大数据量（上亿量级）的聚合如何实现？

Elasticsearch 提供的首个近似聚合是 cardinality 度量。它提供一个字段的基数，即该字段的 distinct或者 unique 值的数目。它是基于 HLL 算法的。 HLL 会先对我们的输入作哈希运算，然后根据哈希运算的结果中的 bits 做概率估算从而得到基数。其特点是：可配置的精度，用来控制内存的使用（更精确 ＝ 更多内存）；小的数据集精度是非常高的；我们可以通过配置参数，来设置去重需要的固定内存使用量。无论数千还是数十亿的唯一值，内存使用量只与你配置的精确度相关。

### 在并发情况下， Elasticsearch 如果保证读写一致？

*   可以通过版本号使用乐观并发控制，以确保新版本不会被旧版本覆盖，由应用层来处理具体的冲突；
*   另外对于写操作，一致性级别支持 quorum/one/all，默认为 quorum，即只有当大多数分片可用时才允许写操作。但即使大多数可用，也可能存在因为网络等原因导致写入副本失败，这样该副本被认为故障，分片将会在一个不同的节点上重建。
*   对于读操作，可以设置 replication 为 sync(默认)，这使得操作在主分片和副本分片都完成后才会返回；如果设置 replication 为 async 时，也可以通过设置搜索请求参数\_preference 为 primary 来查询主分片，确保文档是最新版本。

### 如何监控 Elasticsearch 集群状态？

1.  elasticsearch-head 插件。
2.  通过 Kibana 监控 Elasticsearch。你可以实时查看你的集群健康状态和性能，也可以分析过去的集群、索引和节点指标

### 是否了解字典树？

字典树又称单词查找树， Trie 树，是一种树形结构，是一种哈希树的变种。典型应用是用于统计，排序和保存大量的字符串（但不仅限于字符串），所以经常被搜索引擎系统用于文本词频统计。它的优点是：利用字符串的公共前缀来减少查询时间，最大限度地减少无谓的字符串比较，查询效率比哈希树高。

Trie 的核心思想是空间换时间，利用字符串的公共前缀来降低查询时间的开销以达到提高效率的目的。它有 3 个基本性质：

*   根节点不包含字符，除根节点外每一个节点都只包含一个字符。
*   从根节点到某一节点，路径上经过的字符连接起来，为该节点对应的字符串。
*   每个节点的所有子节点包含的字符都不相同。

对于中文的字典树，每个节点的子节点用一个哈希表存储，这样就不用浪费太大的空间，而且查询速度上可以保留哈希的复杂度 O(1)。

### Elasticsearch 中的集群、节点、索引、文档、类型是什么？

*   集群是一个或多个节点（服务器）的集合，它们共同保存您的整个数据，并提供跨所有节点的联合索引和搜索功能。群集由唯一名 称标识，默认情况下为"elasticsearch"。此名称很重要，因为如果节点设置为按名称加入群集，则该节点只能是群集的一部分。
*   节点是属于集群一部分的单个服务器。它存储数据并参与群集索引和搜索功能。
*   索引就像关系数据库中的“数据库”。它有一个定义多种类型的映射。索引是逻辑名称空间，映射到一个或多个主分片，并且可以有零个或多个副本分片。MySQL =>数据库，Elasticsearch=>索引。
*   文档类似于关系数据库中的一行。不同之处在于索引中的每个文档可以具有不同的结构(字段)，但是对于通用字段应该具有相同的数据类型。MySQL => Databases => Tables => Columns / Rows，Elasticsearch=> Indices => Types =>具有属性的文档Doc。
*   类型是索引的逻辑类别/分区，其语义完全取决于用户。

### Elasticsearch 中的倒排索引是什么？

倒排索引是搜索引擎的核心。搜索引擎的主要目标是在查找发生搜索条件的文档时提供快速搜索。ES中的倒排索引其实就是 lucene 的倒排索引，区别于传统的正向索引， 倒排索引会再存储数据时将关键词和数据进行关联，保存到倒排表中，然后查询时，将查询内容进行分词后在倒排表中进行查询，最后匹配数据即可。

>参考链接：[https://blog.csdn.net/u011863024/article/details/115721328](https://blog.csdn.net/u011863024/article/details/115721328)，整理：沉默王二
