前天不是搭建了一个《Java 程序员进阶之路》的网站嘛，其中用到了 Git 来作为云服务器和 GitHub 远程仓库之间的同步工具。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/sparse-checkout-01.png)

作为开发者，相信大家都知道 Git 的重要性。Git 是一个分布式版本控制软件，初版由 Linus·Torvalds 开发，并于 2005 年以 GPL 许可协议发布。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/sparse-checkout-02.png)

Git 的牛逼这次就不吹了，毕竟已经吹了 7 篇了，实在是吹不动了！

*   [可能是 Git 历史上最伟大的一次代码提交](https://mp.weixin.qq.com/s/hzEnH3ThvuRDW4EeBLlumw)
*   [终于有人把 Git 的数据模型讲清楚了](https://mp.weixin.qq.com/s/ZRLiWIM0ehQF3vSx1H0oVA)
*   [昨晚看完 Linus 第一次提交的 Git 代码后，我失眠了！](https://mp.weixin.qq.com/s/Ta-VcyNelKbDNzQISDORlw)
*   [要熟练使用 Git，恐怕要记住这60个命令](https://mp.weixin.qq.com/s/tEk51NAKjcBQ94F2fCyJJg)
*   [崩溃！实习生把小组的代码仓库搞得一团糟。。。](https://mp.weixin.qq.com/s/Fhh5-7AFDUThmd4tsyA55Q)
*   [信不信，7 张图就能让你把 Git 分支管理拿捏的死死的。。](https://mp.weixin.qq.com/s/pLlUROkQfbfiW-bBT4BPFg)
*   [豆瓣9.1分！我昨天在挂急诊时啃完了这本书！](https://mp.weixin.qq.com/s/RpFzXOa2VlFNd7ylLmr9LQ)

任何一个人，单靠 Git 就可以封神，而 Linus 还是 Linux 内核的开发者，这简直就是神的最高境界。

今天这篇算是 Git 的番外篇，给大家介绍一个牛逼的命令——`git sparse-checkout`，帮我的云服务器剩下了至少一半的存储空间。




### 一、使用 Git 中遇到的一个大麻烦

首先给大家通报一下，一天前[上线的《Java 程序员进阶之路》网站](https://tobebetterjavaer.com)，目前访问次数已经突破 1000 了。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/sparse-checkout-03.png)


正所谓**不积跬步无以至千里，不积小流无以成江海**。

1000 次也许不值一提，但 1000 万也不过是 1 万个 1000，二哥取得的每一点点进步，都要感谢大家的倾力捧场。

看过[上一篇搭建过程](https://mp.weixin.qq.com/s/NtOD5q95xPEs4aQpu4lGcg)的小伙伴应该都知道了，我是通过在云服务器上 clone 了一份 GitHub 上的远程仓库，然后通过宝塔面板的定时任务执行 `git pull` 命令从 GitHub 上拉取到最新的内容，再通过 [Nginx 服务器](https://mp.weixin.qq.com/s/OYOcjUwPZyPo8K4KAgJ4kw)搭建的网站，网站内容是通过 docsify 渲染 md 文件得到的。

直接 `git pull` 会无脑把 GitHub 上的 codes、images 目录同步到云服务器上，但其实 codes、images 目录是不需要同步的。

具体是怎么一回事呢？

大家可以先看一下我这个 GitHub 仓库的目录结构哈。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/sparse-checkout-04.png)

- docs 是文档目录，里面是 md 文件，所有的教程原稿都在这里。
- codes 是代码目录，里面是教程的配套源码。
- images 是图片目录，里面是教程的配套手绘图。

这样就可以利用 GitHub 来做免费的图床，并且还可以白票  jsDelivr CDN 的全球加速，简直不要太爽！

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/sparse-checkout-05.png)

比如说 images 目录下有一张 logo 图 logo-01.png：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/sparse-checkout-06.png)

如果使用 GitHub 仓库的原始路径来访问的话，速度贼慢！

>https://github.com/itwanger/toBeBetterJavaer/tree/master/images/logo-01.png

使用 jsDelivr 加速后就不一样了，速度飞起！

>https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/logo-01.png

简单总结下 GitHub 作为图床的正确用法，就两条：

- 创建一个 GitHub 仓库作为图床仓库，上传提交图片到仓库中
- 在要使用 GitHub 图床图片的地方将链接换为 
 `https://cdn.jsdelivr.net/gh/{user}/{repo}/图片路径`

付费七牛云或者阿里云图床的小伙伴不妨试试这种方式，能白票咱绝不花一分冤枉钱。

那也就是说，《Java 程序员进阶之路》网站上的图片都是通过 GitHub 图床加载的，不需要将图片从 GitHub 仓库拉取到云服务器上。要知道，一台云服务器的空间是极其昂贵的，能省的空间咱必须得省。

### 二、学习 Git 中遇到的一个大惊喜

于是我今天早上就在琢磨着，怎么样才能把这昂贵的空间省下来呢？

我百度了很多帖子，绝大多数都乱七八糟，毫无价值，能说到点子上的几乎没有。

最后还是浏览 Git 官方手册（也可以看[Pro Git](https://mp.weixin.qq.com/s/RpFzXOa2VlFNd7ylLmr9LQ)）才找到了一个牛逼的命令：**git sparse-checkout，它可以帮助我们在拉取远程仓库的时候只同步那些我们想要的目录和文件**。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/sparse-checkout-07.png)
具体怎么用，可以看官方文档：

>https://git-scm.com/docs/git-sparse-checkout

但没必要，hhhh，我们直接实战。

第一步，通过 `git remote add -f orgin git@github.com:itwanger/toBeBetterJavaer.git` 命令从 GitHub 上拉取仓库。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/sparse-checkout-08.png)

第二步，启用 sparse-checkout，并初始化

拉取到仓库后，执行 `git config core.sparseCheckout true` 命令启用 sparse-checkout。

然后再执行 `git sparse-checkout init` 初始化。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/sparse-checkout-09.png)

第三步，使用 sparse-checkout 来拉取我们想要的仓库目录

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/sparse-checkout-10.png)

比如说，我们只想拉取 docs 目录，可以执行 `git sparse-checkout set docs` 命令。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/sparse-checkout-11.png)

如果是第一次使用 sparse-checkout 的话，还需要执行一下 `git pull orgin master` 命令拉取一次。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/sparse-checkout-12.png)
第四步，验证是否生效

可以执行 `ls -al` 命令来确认 sparse-checkout 是否生效。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/sparse-checkout-13.png)

如图所示，确实只拉取到了 docs 目录。

假如还想要拉取其他文件或者目录的话，可以通过 `git sparse-checkout add` 命令来添加。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/sparse-checkout-14.png)

这就实现了，**远程仓库和云服务器仓库之间的定制化同步，需要什么目录和文件就同步什么目录和文件，不需要的可以统统不要**。

GitHub 仓库可以免费用，空间也无限大，但云服务可是要抠抠搜搜的用，毕竟扩充存储空间是真的贵！

我对比了一下，远程仓库大概 145 M，图片就占了 72 M，妥妥地省下了一半的存储空间。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/sparse-checkout-15.png)

如何禁用 git sparse-checkout 呢？

也简单，只需要执行一下 `git sparse-checkout disable` 命令就可以了。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/sparse-checkout-16.png)

可以看到，那些我们不想要的目录和文件统统都又回来了。

如果重新启用呢？

也简单，只需要执行一下 `git sparse-checkout reapply` 命令就可以了。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/sparse-checkout-17.png)

简单总结下：如果你要把一个庞大到撑满你硬盘的远程仓库拉取到本地，而你只需要其中的一部分目录和文件，那就可以试一试
 `git sparse-checkout` 了。



### 三、使用 Git 后的一点心里话

不得不说，Git 实在是太强大了。就一行命令，解决了困扰我一天的烦恼，我的 80G 存储空间的云服务器又可以再战 3 年了，从此以后再也不用担心了。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/sparse-checkout-18.png)

Git 是真的牛逼，Linus 是真的牛逼，神不愧是神！