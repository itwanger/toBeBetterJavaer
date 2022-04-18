---
category:
  - 知识库搭建历程
tag:
  - 辅助工具
  - 轮子
---

# 阿里云服务器购买+宝塔面板安装+域名购买+域名备案+升级HTTPS

## 阿里云服务器购买

前段时间不是组团带小伙伴们白嫖了一波阿里云服务器嘛，今天给大家通报一下数据：已确认新客订单数 491，老客户 57 单，等于说离 500 的新客目标只差 9 单了。

这个数据反映出几个问题：

第一：阿里云那边说之前没有买过阿里云服务器的都算是新客，但最后判定的时候买过域名的，体验过一个学生服务器的都算是老客。很多人翻车在这个上面。

第二，有些人重新注册阿里云账户的时候手机号和身份证号没有唯一，导致被判定为老客。这种翻车是比较令人沮丧的~

总之一句话，“**老客不如狗，新客是真香**”~

新客的小伙伴应该早早的都拿到 60 元返现了，老客的小伙伴要么安排了书，要么二哥自掏腰包倒贴给补偿了~

u1s1，二哥是全天下最良心的博主——之一，是没毛病的。

对了，剩下的 9 单新客（仍然可以返 60 元），还有需要的小伙伴可以扫描下面的二维码添加二哥的微信，备注「**服务器**」即可。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-beian-3d9a98e4-2ae2-4e71-805c-70a918176b8d)


有些买过服务器的小伙伴，已经把个人博客整起来了，这里推荐三个给大家欣赏一下（可以直接复制图片下的链接到浏览器地址栏），真的惊艳~

![http://zhuoke.xyz/](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-beian-7379f1e6-6967-447e-9f62-e19ba1af927d.png)

**打开这个网站的时候要小心，小心差点鼻血流出来**~~~~

![https://laifeng.xyz/about_me/](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-beian-182e856b-771c-4445-b508-dbabded164f2.png)

![https://www.zm211314.top/](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-beian-67d47432-e571-48ad-8c12-4638264d82bf.png)

不得不说，都是二哥的铁粉，个人博客还不忘夸二哥一番。

😜

之前买阿里云服务器的时候，很多小伙伴就强烈要求二哥出一些教程把饭喂到嘴里，因为是第一次——玩服务器~

我出过一期视频，讲了程序员拥有一台云服务器能做哪些很酷的事情？

>[https://www.bilibili.com/video/BV1nb4y187rU/](https://www.bilibili.com/video/BV1nb4y187rU/)

没看过的小伙伴可以去 B 站欣赏一下二哥颜值了，顺带三连交代下。

## 宝塔面板

今天来给大家推荐一款玩转云服务器的神器——**宝塔面板**，有了这玩意，服务器能玩一整年，甚至余生！

![https://www.bt.cn/](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-beian-ad40a5f7-30a8-4c6c-9671-c389432e16de.png)

--------开始保姆级演示如何安装宝塔面板-------

为了给大家呈现出保姆级的教程，我自己新下单了一款轻量应用服务器。登录阿里云服务器后台，可以看到这台服务器正在运行当中。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-beian-11df60df-a51c-48d4-a704-343d01d44777.png)

点击「远程链接」的小图标，第一次需要手机验证码，之后进入到在线版的终端窗口。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-beian-1fc16ac7-10b1-4e61-98f5-d48bb09ab626.png)

可以按照提示输入 `sudo su root` 命令切换到 root 账户。

切换到宝塔Linux 面板页，可以看到对应的安装命令，如下图所示：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-beian-ce7e94b5-c90b-422e-a7e3-942c615c2837.png)

我的云服务器镜像选择的是 CentOS，所以可以直接复制 yum 命令 `yum install -y wget && wget -O install.sh http://download.bt.cn/install/install_6.0.sh && sh install.sh` 到云服务器的「终端」下进行在线安装。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-beian-b7dcf834-294a-4bd0-86f0-7b0b92c5b3fe.png)

yum 命令是 CentOS 的优势，可以在线安装和升级软件。当出现上图提示的内容（外网面板地址、用户名和密码）后就表示宝塔面板安装成功了！

前后大概 2 分钟左右的时间，还是比较快的。记住外网面板地址、用户名和密码，就可以通过宝塔面板访问云服务器了。

如果无法访问，表示服务器没有开放 8888 端口。选择我的轻量服务器，选择防火墙，选择「添加规则」。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-beian-65f67086-cc35-4b7f-89b4-d73e51a859e0.png)

能看到目前服务器只开放了 HTTP、HTTPS 和 SSH 的端口，8888 端口还没有放行。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-beian-5f7fa1a0-1810-40a0-b371-ae2ee5948f80.png)

再次访问外网面板地址，就可以看到登录页面了。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-beian-1233ea14-2e6b-48d9-b278-ab87b3cc3cbd.png)

登录成功后（让浏览器帮你记住账号和密码），如果之前有宝塔官方账号，可以选择绑定，如果没有的话，注册一个。之后就可以看到宝塔面板推荐我们安装的服务器软件了。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-beian-e618418b-1862-4db2-9d61-61358330b77d.png)

通常来说，直接安装 LNMP 组合包就可以了，包括可以一键安装到 Linux 环境的 Nginx、MySQL、PHP 等成员。

LNMP 一键安装包能为不会 Linux 的新手提供一个可以使用 Linux 生产的基础环境，无需一个一个的输入命令，无需值守，无需为软件之间的依赖而烦恼。

>https://lnmp.org

LAMP 和 LNMP 的差别就在于前者提供的是 Apache 的 
 Web 服务器，后来是 Nginx。Nginx 由 Igor Sysoev 为俄罗斯访问量第二的 Rambler.ru 站点开发的 Web服务器软件，国内外的门户网站、行业网站也都在使用Nginx，相当的稳定。

MySQL 基本上是中小型服务器必备的关系型数据库软件；PHP 虽然没落了，但仍然是很多服务器软件的前置环境，比如说最受欢迎的服务器建站工具 WordPress。

点击「一键安装」，宝塔面板就会帮我们自动安排上了。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-beian-036631d0-5160-4b9e-a750-0f15966e1ee3.png)

到此为止，宝塔面板的基础环境就准备完成了。可以在上面按照左侧的菜单项目对服务器进行操作了，比如说：

- 网站
- FTP
- 数据库
- 监控
- 安全
- 防火墙
- 文件
- 终端
- 计划任务
- 软件商店
- 等等

这里先说一下终端，第一次进来的时候需要进行 SSH 账号验证。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-beian-08cec2c4-0c4d-4b06-aefb-be29ef1052e6.png)

密码从哪里来的呢？

在「服务器运维」中选择「远程链接」页面下。有 3 种方式，第一种可以直接使用浏览器，第二种使用密钥，第三种使用账户和密码。

为了方便演示，这里选择选择「设置密码」。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-beian-0560b7fc-4c22-4dd3-be91-d35b631b93e2.png)

设置完成后，重启服务器生效。之后在宝塔面板的「终端」面板下填写密码就可以链接了。不过在浏览器的终端里敲命令总感觉有点不太方便，我们最好选择 iterm2、putty、xshell 这样的客户端。

再说一下软件商店，有付费的有免费的，不过对于我们个人服务器来说，免费版的都足够用了。需要什么安装什么就好了。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-beian-6f4f2ed4-74cf-4cc2-af6c-1750f14d3846.png)

上传下载文件也非常方便。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-beian-aefbcc8e-28c3-48ff-bf66-efdcb8fd57ae.png)

---再再割一下------

讲真，有了宝塔面板后，操作服务器是真特么的方便啊！装了以后可以：

- 创建管理网站
- 带颜色的终端命令行
- 数据库可视化管理
- 文件可视化管理
- 服务器软件可视化管理
- 一键安装 Nginx 反向代理软件
- 申请部署网站 SSL 证书
- 代理云服务器端口
- 更多强大功能，等待大家去解锁

接下来，我们开始整活个人博客，有小伙伴已经投稿过了，我随后整理出来。拿到服务器的小伙伴都用起来哈~

## 域名购买/解析

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

## 域名备案

新注册的域名在短时间内是可以访问到的（参照[上篇](https://mp.weixin.qq.com/s/9Tn5d2ey2lr06oGPZSp6Qw)），但过一段时间后，就会提示「网站暂时无法访问」。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-beian-1.png)

这就意味着我们需要对网站进行备案。关于网站备案，百度百科是这样解释的：

>网站备案的目的是为了防止在网上从事非法的网站经营活动，打击不良互联网信息的传播，如果网站不备案的话，很有可能被查处以后关停。

那网站如何备案呢？

登录你购买服务器的服务器厂商官网，就可以进行网站备案。我购买的是阿里云服务器，所以这里以阿里云为例。

登录阿里云，点击「ICP 备案」（指网站在信息产业部提交网站信息进行官方认可）菜单，点击「开始备案」。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-beian-2.png)

初次备案的小伙伴建议看一遍「秒懂备案」的视频，对备案进行简单地了解，方便后续操作的时候对备案有一个大致的印象。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-beian-3.png)

填写基本信息。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-beian-4.png)

点击「信息校验」，通过后进入下一步。如果不通过，按照对应提示信息进行修改，一般新注册的域名需要 3 天的实名认证审核周期。

填写主办者信息：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-beian-5.png)

填写网站信息：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-beian-6.png)

完成后会提示我们下载「阿里云 APP」上传一些资料，主要是方便上传身份证和人脸认证（注意不要带眼镜，否则容易校验不通过，踩坑人良心建议）。

提交初审后，记得接听电话。

这一步审核通过后，会受到工信部的短信核验，记得及时处理。然后等待管局审核，预计 9 天左右。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-beian-7.png)

我差不多等了一周左右，管局审核终于通过了。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-beian-8.png)

现在立刻马上，登录[全国互联网安全管理平台](http://www.beian.gov.cn/portal/index)注册登录提交公安联网备案申请。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-beian-9.png)


填写申请信息的时候最好不要用 Safari 浏览器，不然会提示要安装 flash 插件（果然政企网站的技术都非常地追求稳定啊）。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-beian-10.png)

macOS 系统可以选择用 Chrome 浏览器。

这里吐槽一点，就是在新办网站申请的「域名证书」填写时，要求的证书大小不能超过 400kb，但从阿里云上下载的 492kb，真的是。。。。

幸好，这一项是非必选项。

提交后再次等待审核。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-beian-11.png)

等了四天，上去看了一下，审核通过了。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-beian-12.png)

我们需要做的是下载备案编号图标和复制备案编号 HTML 代码到网站上。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-beian-13.png)

## HTTP升级到HTTPS

上一次，我们完成[域名解析](https://mp.weixin.qq.com/s/9Tn5d2ey2lr06oGPZSp6Qw)后，发现浏览器地址栏里的域名被提示为不安全，就是因为它还是个宝宝，没有升级为 HTTPS 证书。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-https-01.png)

那怎么升级为 HTTPS 证书呢？可以直接通过阿里云购买 SSL 证书，但特么巨贵！

本来想尝试一下 AWS 的免费 SSL 证书，但卡到验证码这一步就是收不到信息。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-https-02.png)

索性就还用 FreeSSL 吧。

FreeSSL.cn 是一个提供免费HTTPS证书申请的网站，网址如下：

>https://freessl.cn

输入域名 tobebetterjavaer.com 选择 trustAsia 品牌证书，点击「创建」，这次我选择的是三年期自动化（刚好我的服务器申请的是三年，域名也是三年），9.9 元，还是非常良心的。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-https-03.png)

微信/支付宝支付完成后会跳到证书的订单列表。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-https-04.png)

选择「更多操作」里的订单详情，会跳转到 CertCloud 页的管理订单。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-https-05.png)

点击「提交 CSR」后点击「提交」。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-https-06.png)

接下来就到了域名验证环节，点击「获取验证信息」。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-https-07.png)

切换到域名解析设置页，准备添加记录。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-https-08.png)

按照 CertCloud 提供的域名验证信息，添加记录。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-https-09.png)

添加完成后切换到 CertCloud，点击「域名验证」。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-https-10.png)

如果不确定上一步的记录是否添加成功，可以点击「诊断」按钮进行测试，如果没有问题会提示匹配成功的信息。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-https-11.png)

之后，点击「我已完成配置，检测一下」，如果没有问题，会先提示等待 CA 颁发证书，之后再次检测会提示「证书已签发，请刷新页面查看」。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-https-12.png)

好的，直接刷新页面，可以看到订单状态已经变成「已签发」的状态。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-https-13.png)

点击证书操作中的「下载证书」，选择适用于 Nginx 的 PEM 格式证书，点击下载。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-https-14.png)

使用 [Tabby 终端](https://mp.weixin.qq.com/s/HeUAPe4LqqjfzIeWDe8KIg)的「SFTP」将证书上传到网站的云服务器。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-https-15.png)

打开[宝塔面板](https://mp.weixin.qq.com/s/ditN9J80rSWwnYRumwb4ww)，准备配置 Nginx 的 SSL 证书。将以下信息复制到 Nginx 的配置文件中，保存后重新加载配置。

```
# HTTPS server

server {
    listen       443 ssl;
    server_name  localhost;

    ssl_certificate      /home/cert/nginx/tobebetterjavaer.com_cert_chain.pem;
    ssl_certificate_key  /home/cert/nginx/tobebetterjavaer.com_key.key;

    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;

    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;

    location / {
        root   /home/www;
        index  index.html index.htm;
    }
}
```

记得在宝塔面板和云服务器后台放行 443 端口。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-https-16.png)

在地址栏访问 `https://tobebetterjavaer.com` 就可以看到我们的域名已经升级为 HTTPS 了（安全锁的小图标也显示出来了）。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-https-17.png)

这时候，如果我们访问 80 端口的 http，仍然是可以的。只不过仍然会显示一个不安全的提示。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-https-18.png)

此时，我们需要将 HTTP 重定向到 HTTPS。

```
server {
    listen       80;
    server_name  tobebetterjavaer.com www.tobebetterjavaer.com;
    return 301 https://$server_name$request_uri;
}
```

注释掉原来的 80 端口监听，改为 return 跳转。


![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-https-19.png)

再次刷新原来的 HTTP 访问链接，可以看到已经跳转到 HTTPS 了，如果你查看地址栏的话，也会看到地址变成了 `https://tobebetterjavaer.com`。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-https-20.png)


顺带再给大家分享一个好消息，《Java 程序员进阶之路》网站 PV 访问人数已经突破了 1000，来到了 1168，又一个小小的里程碑~

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/szjy/tobebetterjavaer-beian-c0665162-9d0d-4ded-b485-5ea535954457.png)

三年之后又三年，希望这个小破站能自力更生地活下去。目前已有的花费有：

- 阿里云服务器：3 年 204 元
- 域名：3 年 273 元
- SSL 证书：3 年 9.9 元

希望能给学习 Java 的小伙伴提供一点点帮助，二哥就感觉值了！

到此为止，《Java 程序员进阶之路》网站的硬件设施就全部完善了，她已经是个成熟的宝宝了。

希望百度和谷歌等搜索引擎尽快收录，后面也会去学习一些 SEO 方面的知识，提高一下网站的排名，让网站获得更多的流量，从而提升品牌的影响力。

恭喜！

<img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png">
