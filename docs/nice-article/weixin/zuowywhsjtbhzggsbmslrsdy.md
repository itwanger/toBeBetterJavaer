---
title: 昨晚，因为核酸系统崩溃，这家公司被骂上了热搜第一
shortTitle: 昨晚，因为核酸系统崩溃，这家公司被骂上了热搜第一
description: 不管你信不信，我反正信了
author: 轩辕之风O
category:
  - 微信公众号
head:
---

大家好，我是轩辕。

昨天晚上，成都因为疫情又一次上了热搜，而这一次，热搜上的词条是一家软件公司的名字。

![](https://mmbiz.qpic.cn/mmbiz_png/jXQDbLkGBYXNicJ7Nl8RXKibsK7gDsdhbJiaIxv2piaqb1jO06wibPsIFRJITNZ993F2Sn2v4wFGicjYsxkLib87hiaceQ/640?wx_fmt=png)

事情的起因是这样的：

从9月1号开始，成都市政府宣布了为期四天的全员核酸检测。昨天下午，我们小区物业通知了预计14:00-17:00会进行检测，告诉我们会挨个楼栋通知下去检测。

结果一直拖到晚上也没收到通知，我一直忙别的也没留意，结果上网一看，关于成都核酸系统崩溃的各种段子已经满天飞了。

是的，成都核酸检测系统，又崩溃了！

辛苦的大白们没有办法，都用上了这种古老的方式来寻找“信号”。

![](https://mmbiz.qpic.cn/mmbiz_png/jXQDbLkGBYXNicJ7Nl8RXKibsK7gDsdhbJCvE7azKJAN8OiaCnOunYyXKPIPrhokjVh8IqIT0R04thQ5Hg8uTz85w/640?wx_fmt=png)

因为这个系统出了问题，导致核酸检测工作非常缓慢，大量的市民排队等待，平常排队半小时能完成的，昨晚都要排队好几个小时。

![](https://mmbiz.qpic.cn/mmbiz_png/jXQDbLkGBYXNicJ7Nl8RXKibsK7gDsdhbJ9r9thiahOcNUZTPKicZicnbNVWfMdjVibOIXEVcAvVJQ8PaJ0em7fmvCuA/640?wx_fmt=png)

到晚上23点半，物业直接通知只给部分人做，其他人可以洗洗睡了。好家伙，不知道有多少人白排了几个小时队。

![](https://mmbiz.qpic.cn/mmbiz_jpg/jXQDbLkGBYXNicJ7Nl8RXKibsK7gDsdhbJXiawovGVibibAhgT4VbrR4DSSE57Z4OS1nqGsUticCpudkFSGsBf7o0a3A/640?wx_fmt=jpeg)

这好好的系统它咋就崩溃了呢？

有网友挖出了一个中标公告，说这套系统背后使用的是浪潮的服务器：

![](https://mmbiz.qpic.cn/mmbiz_png/jXQDbLkGBYXNicJ7Nl8RXKibsK7gDsdhbJJzJhicJE23f5icLKomomqaQy1G0FZVWz8OyWUXG91mfj3ickSl18Jx7zA/640?wx_fmt=png)

一千多万的项目，结果就这？

但随后，有疑似浪潮的人出来回复：

![](https://mmbiz.qpic.cn/mmbiz_jpg/jXQDbLkGBYXNicJ7Nl8RXKibsK7gDsdhbJZqtRA04g2oH8TPdrPSI7rLibD3nicoyePcPibfxe7tnOh5J7qH2sbtFlA/640?wx_fmt=jpeg)

人家说的很清楚，上面中标的只是基础运维，这套软件系统的设计另有其人。

随后有人又开喷健康码，喷鹅厂。

但实际上，崩的不是健康码，而是大白使用的核酸采集录入系统，这是两套独立的系统。

![](https://mmbiz.qpic.cn/mmbiz_png/jXQDbLkGBYXNicJ7Nl8RXKibsK7gDsdhbJlXicPiaWYn5OA2oibK6VJ8nZkSufIDbAicI8XHYTPjL6pF4G5G2Q8zFbjA/640?wx_fmt=png)

再接着，有人爆出这套软件是东软公司做的。

![](https://mmbiz.qpic.cn/mmbiz_png/jXQDbLkGBYXNicJ7Nl8RXKibsK7gDsdhbJbOG34kPRW27g5x5XTFOgTrPqLGgamEacljRwBBes1gyIiapqmXPNGuQ/640?wx_fmt=png)

于是一时间，所有人把怒火对准了东软，很快就把东软这个词条送上了微博热搜榜第一的位置。

![](https://mmbiz.qpic.cn/mmbiz_png/jXQDbLkGBYXNicJ7Nl8RXKibsK7gDsdhbJDcwQBuyOOFPkJeosZiaFHKPRDbAWlEWYmv2m7WGMC7BD0G07wc1aCqQ/640?wx_fmt=png)

关于崩溃的原因，也有各种说法在朋友圈、微信群里流传，一时难辨真假。

有说是这套系统背后使用的MySQL使用了超宽的大表：

![](https://mmbiz.qpic.cn/mmbiz_jpg/jXQDbLkGBYXNicJ7Nl8RXKibsK7gDsdhbJWibMVO3CU2wM5KDbZlVaHMGnlL98a6luM9qL7Yic7zWicyK5pBApclQiaw/640?wx_fmt=jpeg)

有说是MySQL单表容量太大，造成性能下降：

![](https://mmbiz.qpic.cn/mmbiz_jpg/jXQDbLkGBYXNicJ7Nl8RXKibsK7gDsdhbJDVwFSyIEOeIyMXiacoDVSQFx2iauDntjeicrYoFRt0Hh53XZIIQqibL0rA/640?wx_fmt=jpeg)

还有的说是因为负载均衡不行，没法支撑高并发。

![](https://mmbiz.qpic.cn/mmbiz_png/jXQDbLkGBYXNicJ7Nl8RXKibsK7gDsdhbJIT7HBO8kaxgCaQ6gxyG9NTK3n7RiaZCr5GYiayPCOQxun2pGXMx1WNyg/640?wx_fmt=png)

总结起来基本上就两个原因：

**1、数据库的问题，数据量大后，查询检索效率低下。**

成都全市人口超过2000万，每天一次核酸，那就是单日新增两千万条记录，最近几天一直在做，数据容量很快就是几亿的规模，如果后端用MySQL还不分表，那确实够呛。

**2、高并发的问题，同一时间大量请求，服务器扛不住。**

一般情况下，使用nginx负载均衡，单机能做到几万的并发量。但成都2000W+的人口规模，全面做核酸的情况下，几万的并发肯定是不够用的。

倘若这套系统背后真的就是一个nginx+mysql(不分表)，那昨晚的情况也就不足为奇了。

**好了，吃瓜归吃瓜，我们还是要来点干货，作为一个程序员，要在吃瓜中学会成长。**

## 高并发之路

这篇文章，我们来回答一个问题：**到底该怎么做高并发？**

让我们从零开始。

### 1、单机时代

一开始的时候，用户量很少，一天就几百上千个请求，一台服务器就完全足够。

我们用Java、Python、PHP或者其他后端语言开发一个Web后端服务，再用一个MySQL来存储业务数据，它俩携手工作，运行在同一台服务器上，对外提供服务。

![](https://mmbiz.qpic.cn/mmbiz_png/jXQDbLkGBYXNicJ7Nl8RXKibsK7gDsdhbJCGLgJc21mMputJqZvVW5IV4BIhzUHoQ2S9cZs5CBU5oPPVvYPNEVcg/640?wx_fmt=png)

### 2、应用与数据库分离

慢慢的，用户量开始多了起来，一台服务器有点够呛，把它们拆开成两台服务器，一台专门运行Web服务，一台专门用来运行数据库，这样它们就能独享服务器上的CPU和内存资源，不用互抢了。

![](https://mmbiz.qpic.cn/mmbiz_jpg/jXQDbLkGBYXNicJ7Nl8RXKibsK7gDsdhbJLejnQFJOmHQkoGVPppauNAenVRDs64U6iaqGOIHnomA4yiaTS4xYzX5Q/640?wx_fmt=jpeg)

### 3、缓存系统

后来，用户量进一步增加，每一次都要去数据库里查，有点费时间，引入一个缓存系统，可以有效缩短服务的响应时间。

![](https://mmbiz.qpic.cn/mmbiz_jpg/jXQDbLkGBYXNicJ7Nl8RXKibsK7gDsdhbJeiaQecdg4ssA12gvIoUdAk93ichdhr0EVAVhqmx2cP3ZDWUl3UvOfZUw/640?wx_fmt=jpeg)

### 4、软件负载均衡

用户量还在增加，一个Web服务的吞吐量开始达到了上限，系统开始出现卡顿。这时候，可以复制多个Web服务出来，再用一个nginx来进行负载均衡，将请求分摊到所有Web服务器上，提高并发量。

![](https://mmbiz.qpic.cn/mmbiz_jpg/jXQDbLkGBYXNicJ7Nl8RXKibsK7gDsdhbJ8DhzvpCtbbL0N3fFb7EqXYgdF1XxGuy7SlMwWw9gY2zic6bMRxb4iaUw/640?wx_fmt=jpeg)

### 5、数据读写分离

随着系统的运行和用户的增长，数据量越来越多，数据库的瓶颈开始显现，读写明显变慢。这时候，可以增加新的数据库服务器，将读写进行分离，二者做好数据同步，提高数据库服务的整体I/O性能。

![](https://mmbiz.qpic.cn/mmbiz_jpg/jXQDbLkGBYXNicJ7Nl8RXKibsK7gDsdhbJUibuiawR2c8Stp7dj0N6Qv2BVdTuJQyGyx8y1LicDq90N2PiaeWGVuwgEA/640?wx_fmt=jpeg)

### 6、数据库分库分表

系统中的数据越来越多，即便是读写分离了，但一张表中的记录越来越多，从几百万到几千万，甚至要过亿了。把它们全部塞在同一张表里，检索查询耗时费力，是时候进行分库分表，把数据拆分一下，提高数据查询效率。

![](https://mmbiz.qpic.cn/mmbiz_jpg/jXQDbLkGBYXNicJ7Nl8RXKibsK7gDsdhbJhtJy9AULvLRLFHOuUNRe3VKOFBYGQ5hde8TWx8KX0wiaKwNbJBiaQ8oQ/640?wx_fmt=jpeg)

### 7、硬件负载均衡

再后来，业务发展很不错，用户量激增，以至于强劲的Nginx也扛不住了。

一台不够，那就多整几台，再引入一个硬件负载均衡的服务器，比如F5，将网络流量分发到不同的Nginx服务器上，再一次提高性能。

![](https://mmbiz.qpic.cn/mmbiz_jpg/jXQDbLkGBYXNicJ7Nl8RXKibsK7gDsdhbJDRuXyU2TGaX0tvR8jgEr5ibkoIY73NxTKb4ibibtGuCkF2Q4nn3QqXXgw/640?wx_fmt=jpeg)

### 8、DNS负载均衡

再再后来，用户量还在蹭蹭蹭的增长，强悍如F5这样的硬件负载均衡服务器也扛不住这样的高并发。

老办法，一个不够那就多整几个。这一次，咱们在域名解析上下功夫，不同地区的用户，在访问同一个域名时，解析到不同的IP地址，以此来将流量进一步拆分。

![](https://mmbiz.qpic.cn/mmbiz_jpg/jXQDbLkGBYXNicJ7Nl8RXKibsK7gDsdhbJEdP1UAo1qtOo89fByZD2HYdSTFzX8vXZNDicksDvwWpNUJF6krPb8uw/640?wx_fmt=jpeg)

上面就是从最简单的单机到复杂集群的高并发演进之路。

高并发是一个很大的话题，它所涵盖的东西其实远远不止上面这些内容。除了这些之外，像是消息队列、数据库选型、CDN、编程语言中的协程等等技术都能为提高并发助力。

回到这次崩溃事件上，我想着经过一夜的折腾，今天总该好点了吧，结果下午一开始，又继续摆烂了：

![](https://mmbiz.qpic.cn/mmbiz_jpg/jXQDbLkGBYXNicJ7Nl8RXKibsK7gDsdhbJdsqibnR7HokFpib1ArNgzrUbXvuGSribjKdhdt9vDtibyay6eU7ocYKJ6g/640?wx_fmt=jpeg)

在我写这篇文章的时候，当事公司已经发布了说明：

![](https://mmbiz.qpic.cn/mmbiz_png/jXQDbLkGBYXNicJ7Nl8RXKibsK7gDsdhbJBj9UdJv5dqBa5jMufIAvAZbG3jSDmp1ibPYOjGXzfCKk4HYzIIASZhA/640?wx_fmt=png)

网络：你的意思是怪我咯？

![](https://mmbiz.qpic.cn/mmbiz_gif/jXQDbLkGBYXNicJ7Nl8RXKibsK7gDsdhbJNoUbicI8JHj9EFTT5pY2rGZOGUNMxg2Jxz1ib7TDo8pbg6CyjCXU4ibuQ/640?wx_fmt=gif)

我是轩辕，欢迎关注我，我们下次再见。

## 往期推荐

*   [核弹级漏洞！我把log4j扒给你看！](https://mp.weixin.qq.com/s?__biz=MzIyNjMxOTY0NA==&mid=2247493241&idx=1&sn=25a4f5e770dabb10a8abe96f692d7391&scene=21#wechat_redirect)
*   [可怕！CPU暗藏了这些未公开的指令！](https://mp.weixin.qq.com/s?__biz=MzIyNjMxOTY0NA==&mid=2247495061&idx=1&sn=692ba561fed0f7ae6865f2b8da8fbffd&scene=21#wechat_redirect)
*   [我是Redis，MySQL大哥被我害惨了！](https://mp.weixin.qq.com/s?__biz=MzIyNjMxOTY0NA==&mid=2247486528&idx=1&sn=3f7b09eb21969fdb16f5b0805ff69fed&scene=21#wechat_redirect)
*   [CPU被挖矿，Redis竟是内鬼！](https://mp.weixin.qq.com/s?__biz=MzIyNjMxOTY0NA==&mid=2247493024&idx=1&sn=8b055fdaffb7455ffea23a9915adfca8&scene=21#wechat_redirect)
*   [主板上来了一个新邻居，CPU慌了！](https://mp.weixin.qq.com/s?__biz=MzIyNjMxOTY0NA==&mid=2247487726&idx=1&sn=f603721ed8603a671626a48ab97c7e61&scene=21#wechat_redirect)

>参考链接：[https://mp.weixin.qq.com/s?__biz=MzIyNjMxOTY0NA==&mid=2247496071&idx=1&sn=0843f637b4e60bf01bd83433b33e9746&chksm=e870fdf4df0774e27f40944c5ec0ef79d5a75c351b31e2010a0b43ecd1e77ea30a7b4666144e#rd](https://mp.weixin.qq.com/s?__biz=MzIyNjMxOTY0NA==&mid=2247496071&idx=1&sn=0843f637b4e60bf01bd83433b33e9746&chksm=e870fdf4df0774e27f40944c5ec0ef79d5a75c351b31e2010a0b43ecd1e77ea30a7b4666144e#rd)，出处：编程技术宇宙，整理：沉默王二
