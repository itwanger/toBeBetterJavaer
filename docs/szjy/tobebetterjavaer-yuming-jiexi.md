给大家通报下战绩，自从[2022年01月01日上线小破站](https://mp.weixin.qq.com/s/NtOD5q95xPEs4aQpu4lGcg)以来，PU 马上突破 1000 人了，发完这篇文章后应该就能突破了，一会赶紧去截图纪念下。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-yuming-jiexi-01.png)

这个小小的里程碑，是《Java 程序员进阶之路》迈出去的一大步。这点小成绩让我感觉 273 块钱买的这个 tobebetterjavaer.com 域名真的是值了！

今天顺带给大家补一个小知识：**域名解析**。老手可以直接拉到文末给个三连就可以撤了，新手可以把这篇收藏起来，往后自己搭建博客时必然会遇到的。

购买域名可以通过多个服务商，比如说阿里云、百度云、腾讯云。

我这里以阿里云为例，购入一个 tobebetterjavaer.com 的域名（寓意通过 Java 程序员进阶之路，成为一个更好的 Java 工程师）。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-yuming-jiexi-02.png)

在此之前呢，我已经购买了一台阿里云的服务器，2核4G内存的轻量级云服务器。就是上次带大家白票的那波，我自己也购入了一台。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-yuming-jiexi-03.png)

这台服务器上目前已经安装了[宝塔面板](https://mp.weixin.qq.com/s/ditN9J80rSWwnYRumwb4ww)、[Nginx](https://mp.weixin.qq.com/s/OYOcjUwPZyPo8K4KAgJ4kw)，并且可以通过 IP 地址成功访问 80 端口。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-yuming-jiexi-04.png)

我想做什么呢？

**我希望可以通过域名直接访问而不是 IP**！

直接在浏览器地址栏里输入域名访问肯定是不行的。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-yuming-jiexi-05.png)

那该怎么办呢？

进行**域名解析**。当我们购买了一台云服务器后，系统会默认给这台服务器分配一个已经绑定的 IP 地址。但由于 IP 地址是由数组组成的，不方便记忆，所以就使用域名来代替。

不过，讲真 tobebetterjavaer.com 这个域名也不好记忆，好歹是寓意比较好：成为一个更好的 Java 工程师嘛。再加上 com 域名本身也比较稀缺了，短域名基本上都已经用尽了。

那**域名解析**就是把域名指向网站的 IP 地址，让用户通过域名就可以访问到网站的一种服务。

阿里云是通过云解析 DNS 提供域名解析服务的。DNS，全称 Domain Name System，也就是域名系统，是一个将域名和IP地址相互映射的分布式数据库，以便用户访问互联网。

云解析 DNS 支持 A、AAAA 、CNAME 等记录类型。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-yuming-jiexi-06.png)

进入域名控制台，选择要解析的域名，点击「解析」会跳转到解析设置页面。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-yuming-jiexi-07.png)

直接点击「新手指导」按钮，填写服务器的 IP 地址。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-yuming-jiexi-08.png)

该方法可以同时添加 www 和 @ 记录，成功后，可以通过带 www 和不带 www 的方式访问网站。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-yuming-jiexi-09.png)

- 主机记录 @ 表示可以直接通过不带 www 的域名访问，也就是 tobebetterjavaer.com；
- 主机记录 www 表示可以带 www 的域名访问，也就是 www.tobebetterjavaer.com；

TTL 为缓存时间，数值越小，表示修改记录生效的时间越快，默认为10分钟。

记得对域名进行实名认证，认证通过后（否则域名会处于锁定状态 serverhold），再次刷新页面，就可以访问成功了！

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-yuming-jiexi-10.png)

nice！

顺带再给大家分享一个好消息，《Java 程序员进阶之路》专栏在 GitHub 上也突破了 1000 star 的大关，来到了 1100 个。再次感谢小伙伴们的捧场，笔芯~


![](https://files.mdnice.com/user/3903/fb388c68-abbf-452c-b43a-c9d21b9c7f91.png)

老读者应该都知道，《Java 程序员进阶之路》专栏在元旦前后登上了 GitHub trending 榜单，这也间接地证明这个专栏开始受到越来越多读者的认可和喜爱。

这也让二哥有了更强的动力去维护和更新了！2022 年，我们一起加油呀！



