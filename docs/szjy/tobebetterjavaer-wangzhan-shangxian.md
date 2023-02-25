---
category:
  - 知识库搭建历程
tag:
  - 辅助工具
  - 轮子
---

# 使用docsify+Git+GitHub+码云+阿里云服务器搭建知识库网站

大家好，我是二哥呀！

2022 年 1 月 1 日，**二哥的《Java程序员进阶之路》网站终于上线了**！10 天过去了，网站在没有 SEO 的加持下访问量也突破了 1000 pu，算是一个小小的里程碑吧。

往下看，你不仅会直呼这个网站的颜值贼高，丝毫不输 B 站上那些舞蹈区的小姐姐，hhh，另外你还会学到如何从0 到 1搭建一个个人的学习网站。

经常逛 GitHub 的小伙伴应该已经发现了，二哥的《Java程序员进阶之路》最近在持续霸榜，今天仍然在 GitHub 的周榜上。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/szjy/tobebetterjavaer-wangzhan-shangxian-01.png)

这也是 2021-2022 年二哥收获的最后一点点小惊喜了。

原来的《Java程序员进阶之路》网站是托管在码云 Pages 上的，而码云 Pages 没办法自定义域名，这样就很不利于小伙伴们直接通过网址去访问。

>码云 Pages：https://itwanger.gitee.io/tobebetterjavaer

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/szjy/tobebetterjavaer-wangzhan-shangxian-02.png)

怎么解决这个问题呢？

。。。。。。

让我先来给大家铺垫一下这个码云 Pages 是如何服务的，搞清楚了状况后，我们就容易想到解决办法。

首先，《Java程序员进阶之路》专栏的源头是 GitHub 上的一个开源仓库。

>GitHub 地址：https://github.com/itwanger/toBeBetterJavaer

里面除了 md 文档和图片之外，还有代码示例，以及 docsify 的基础环境文件。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/szjy/tobebetterjavaer-wangzhan-shangxian-03.png)

- index.html 入口文件
- README.md 会做为主页内容渲染
- .nojekyll 用于阻止 GitHub Pages 忽略掉下划线开头的文件
- _sidebar.md 会做为侧边栏内容渲染
- _coverpage.md 会做为封面图渲染

docsify 是一个神奇的文档网站生成器，不同于 GitBook、Hexo 的是，它不会生成静态的 .html 文件，所有转换工作都是在运行时发生的。只需要一个 index.html 文件以及一些基础配置文件就可以开始编写文档，并直接托管在 GitHub Pages 上（省去了服务器的钱）。

不过，由于 GitHub 的网络访问原因，我就将 《Java程序员进阶之路》专栏同步到了码云，用码云 Pages 来替代 GitHub Pages，这样的网络访问速度会快很多。

>码云地址：https://gitee.com/itwanger/toBeBetterJavaer

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/szjy/tobebetterjavaer-wangzhan-shangxian-04.png)

同时，码云 Pages 也支持 Jekyll、Hugo、Hexo、docsify 等静态网站的服务。当 GitHub 仓库有更新后，直接在 GitHub Pages 上点一下刷新图标就会立即完成网站服务的同步工作。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/szjy/tobebetterjavaer-wangzhan-shangxian-05.png)

通过码云 Pages 提供的网址就可以访问《Java程序员进阶之路》网址了。

但由于种种原因，码云 Pages 没有提供自定义域名+ HTTPS 的服务，Pro 版支持，但也因为业务调整，关闭了个人用户的购买入口。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/szjy/tobebetterjavaer-wangzhan-shangxian-06.png)

这就很扯了。

### 解决方案一

这是最容易想到的办法，也是最笨的办法：**将本地仓库上传到云服务器，通过 Nginx 部署静态网站**。

在上传服务器之前，让我们先来确认一下本地的 docsify 目录是否是完整的。因此我们需要在本地运行起来 docsify 服务。

进入本地《Java程序员进阶之路》的仓库目录，执行 `docsify serve` 启动服务。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/szjy/tobebetterjavaer-wangzhan-shangxian-07.png)

在浏览器地址栏访问 `http://localhost:3000`：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/szjy/tobebetterjavaer-wangzhan-shangxian-08.png)

可以确认是没有问题的。

然后将本地的文件上传到云服务器上，再通过 Nginx 部署静态网站就 OK 了。

不过，这样做会存在一个很严重的问题，就是云服务器和本地、GitHub 仓库之间没办法进行同步。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/szjy/tobebetterjavaer-wangzhan-shangxian-09.png)
### 解决方案二

这是比较完善一点的解决方案：**在服务器上搭建一个 Git 仓库，从 GitHub 上拉取，再通过 Nginx 部署静态网站**。

这样就很容易解决掉仓库之间不同步的问题，因为 GitHub 仓库提交的一定是正式版本，也是最新版本，从上面拉取是最方便和稳妥的。本地会做一些测试工作，比如说调整 docsify 的配置等等，不适合作为云服务器拉取的对象。

关于 Git 环境的搭建，我在《Java程序员进阶之路》专栏的「Git」篇里已经详细的讲解了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/szjy/tobebetterjavaer-wangzhan-shangxian-10.png)

搭建过程我这里简单演示下。

**第一步，安装 Git**

CentOS 上可以直接通过 `yum install git` 命令来安装 Git 环境。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/szjy/tobebetterjavaer-wangzhan-shangxian-11.png)

**第二步，初始化 Git**

执行 `git init` 初始化 Git 目录。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/szjy/tobebetterjavaer-wangzhan-shangxian-12.png)


**第三步，克隆 GitHub 仓库到云服务器**

为了使 GitHub 相信所有的操作都是“你本人”操作的，所以在 clone 之前需要先配置 SSH 密钥。具体的步骤可参考：[崩溃！实习生把小组的代码仓库搞得一团糟。。。](https://mp.weixin.qq.com/s/Fhh5-7AFDUThmd4tsyA55Q)这篇中的「远程仓库」小节。

这里就不再演示了。


在 GitHub 仓库上点击「Code」菜单，复制 SSH 地址。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/szjy/tobebetterjavaer-wangzhan-shangxian-13.png)

然后执行 `git clone` 命令就可以从远程仓库上拉取到最新内容了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/szjy/tobebetterjavaer-wangzhan-shangxian-14.png)


**第四步，通过 Nginx 部署静态网站**

[Nginx](https://mp.weixin.qq.com/s/OYOcjUwPZyPo8K4KAgJ4kw) 非常适合用来部署静态网站，只需要将服务器的访问目录设定为 index.html 文件就可以了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/szjy/tobebetterjavaer-wangzhan-shangxian-15.png)

OK，此时再访问域名 `https://tobebetterjavaer.com` 就可以看到《Java程序员进阶之路》的内容了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/szjy/tobebetterjavaer-wangzhan-shangxian-16.png)

用这种方案的话，本地、GitHub、云服务器之间的同步就完全打通了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/szjy/tobebetterjavaer-wangzhan-shangxian-17.png)

当 GitHub 上有更新的时候，再将内容拉取到云服务器上。

举例来说，我们在《Java程序员进阶之路》专栏的 GitHub 仓库中修改 _sidebar.md 文件，追加一个感叹号的标点符号。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/szjy/tobebetterjavaer-wangzhan-shangxian-18.png)

有两种办法拉取。

第一种，先执行 `git fetch`，再执行 `git merge`。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/szjy/tobebetterjavaer-wangzhan-shangxian-19.png)

`9909f82..7f4b815  master     -> origin/master` 就表示内容有变动。

第二种，直接执行 `git pull` 命令。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/szjy/tobebetterjavaer-wangzhan-shangxian-20.png)

不过，这有一点不尽善尽美，每当 GitHub 上有更新的时候，还要手动在云服务器上拉取更新，能不能做到自动化呢？

可以利用[宝塔面板](https://mp.weixin.qq.com/s/ditN9J80rSWwnYRumwb4ww)的计划任务，添加一个 Shell 脚本。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/szjy/tobebetterjavaer-wangzhan-shangxian-21.png)

脚本内容很简单，就两行内容：

```
# 切换到 git 目录
cd /home/www/git/toBeBetterJavaer
# 执行git命令
git pull
```

保存后我们来测试下。

我们在《Java程序员进阶之路》专栏的 GitHub 仓库中修改 _sidebar.md 文件，修改中文的感叹号为英文的感叹号。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/szjy/tobebetterjavaer-wangzhan-shangxian-22.png)

点击计划任务的「执行」按钮。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/szjy/tobebetterjavaer-wangzhan-shangxian-23.png)

查看云服务器上的文件是否发生了变化。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/szjy/tobebetterjavaer-wangzhan-shangxian-24.png)

到此为止，我们就完成了《Java程序员进阶之路》网站从码云 Pages 到 VPS（Virtual private server，虚拟专用服务器）迁移的整个工作。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/szjy/tobebetterjavaer-wangzhan-shangxian-25.png)

最后，再带着大家使用[不蒜子](https://busuanzi.ibruce.info/)给网站加一个总访问次数和总访客数吧，看看一个月后《Java程序员进阶之路》的 PV 有多少。

```
<script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
<span id="busuanzi_container_site_pv">本站总访问量<span id="busuanzi_value_site_pv"></span>次</span>
```

两行代码，一行引入 JS 文件，一行展示数据。

刷新网页，发现已经有了哈，我是第一个。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/szjy/tobebetterjavaer-wangzhan-shangxian-26.png)

紧接着，可以把 GitHub/码云上的预览链接从码云 Pages 修改为 `https://tobebetterjavaer.com` 了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/szjy/tobebetterjavaer-wangzhan-shangxian-27.png)

简单总结一波：为了搭建这个网站，真的是能学到非常多的实战知识，比如说：

- HTTP 升级为 HTTPS
- Nginx 配置静态资源
- 域名解析
- SSL 证书生成
- Git 的基本使用
- 宝塔面板的基本使用
- Tabby 终端的基本使用
- 域名备案
- 等等等等

如果大家有时间的话，强烈建议大家动手去搭一个，尤其是之前白票过阿里云服务器的小伙伴，动过手后你才会真正地学到实战经验。

2022 年，二哥一定会继续肝出更多优质的原创，丰富《Java程序员进阶之路》的内容，希望这个专栏日后成为大家学习 Java 的第一选择！


------



*没有什么使我停留——除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟*。

我们下期见~

<img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png">