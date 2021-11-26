

Git 是一个分布式版本控制系统，缔造者是大名鼎鼎的林纳斯·托瓦茲 (Linus Torvalds)，Git 最初的目的是为了能更好的管理 Linux 内核源码。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/git-qiyuan-01.png)

PS：**为了能够帮助更多的 Java 爱好者，已将《Java 程序员进阶之路》开源到了 GitHub（本篇已收录）。该专栏目前已经收获了 715 枚星标，如果你也喜欢这个专栏，觉得有帮助的话，可以去点个 star，这样也方便以后进行更系统化的学习**：

[https://github.com/itwanger/toBeBetterJavaer](https://github.com/itwanger/toBeBetterJavaer)

*每天看着 star 数的上涨我心里非常的开心，希望越来越多的 Java 爱好者能因为这个开源项目而受益，而越来越多人的 star，也会激励我继续更新下去*~

大家都知道，Linux 内核是开源的，参与者众多，到目前为止，共有两万多名开发者给 Linux Kernel 提交过代码。

但在 1991 年到 2002 年期间，Linus 作为项目的管理员并没有借助任何配置管理工具，而是以手工方式通过 patch 来合并大家提交的代码。

倒不是说 Linus 喜欢手工处理，而是因为他对代码版本管理工具非常挑剔，无论是商用的 clearcase，还是开源的 CVS、SVN 都入不了他的法眼。

直到 2002 年，Linus 才相中了一款分布式版本控制系统 BitKeeper，虽然是商用的，但 BitKeeper 愿意让 Linux 社区免费使用，这让 Linus 非常开心和满意。

时间来到 2005 年，由于 BitKeeper 提供的默认接口不能满足 Linux 社区用户的全部需要，一位开发者在未经允许的情况下反编译了 BitKeeper 并利用了未公开的接口，于是 BitKeeper 的著作权拥有者拉里·麦沃伊就气愤地收回了 Linux 社区免费使用的权力。

没办法，Linus 只好自己硬着头皮上了。他对新的版本控制系统制订了若干目标：

- 速度
- 设计简单
- 允许成千上万个并行开发的分支
- 完全分布式
- 有能力高效管理类似 Linux 内核一样的超大规模项目

结果，令人意想不到的是，Linus 只用了 10 天时间就用 C语言完成了第一个版本，嗯。。神就是神。并且给这个版本起了一个略带嘲讽意味的名字——Git（在英式英语俚语中表示“不愉快的人”）。

源代码的自述文件有进一步的阐述：

>The name "git" was given by Linus Torvalds when he wrote the very first version. He described the tool as "the stupid content tracker" and the name as (depending on your way)

从 Git 的设计上来看，有两种命令：分别是底层命令(Plumbing commands)和高层命令(Porcelain commands)。一开始，Linus 只设计了一些给开源社区的黑客们使用的符合 Unix KISS 原则的命令，因为黑客们本身就是动手高手，水管坏了就撸起袖子去修理，因此这些命令被称为 plumbing commands。

Linus 在提交了第一个 git commit 后，就向社区发布了 git 工具。当时，社区中有位叫 Junio Hamano 的开发者觉得这个工具很有意思，便下载了代码，结果发现一共才 1244 行代码，这更令他惊奇，也引发了极大的兴趣。Junio 在邮件列表与 Linus 交流并帮助增加了 merge 等功能，而后持续打磨 git，最后 Junio 完全接手了 Git 的维护工作，Linus 则回去继续维护 Linux Kernel 项目。

Junio Hamano 觉得 Linus 设计的这些命令对于普通用户不太友好，因此在此之上，封装了更易于使用、接口更精美的高层命令，也就是我们今天每天使用的 git add, git commit 之类。Git add 就是封装了 update-cache 命令，而 git commit 就是封装了 write-tree, commit-tree 命令。

如果选历史上最伟大的一次 Git 代码提交，那一定是这 Git 工具项目本身的第一次代码提交。这次代码提交无疑是开创性的，**如果说 Linux 项目促成了开源软件的成功并改写了软件行业的格局，那么 Git 则是改变了全世界开发者的工作方式和写作方式**。

如今，Git 已经成为全球软件开发者的标配。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/git-qiyuan-02.png)

原本的 Git 只适用于 Unix/Linux 平台，但随着 Cygwin、msysGit 环境的成熟，以及 TortoiseGit 这样易用的GUI工具，Git 在 Windows 平台下也逐渐成熟。

>PS1：Cygwin 的主要目的是通过重新编译，将 POSIX 系统（例如Linux、BSD，以及其他Unix系统）上的软件移植到Windows上。

>PS2：msysGit 前面的 4 个字幕来源于 MSYS 项目，而 MSYS 又源于 MinGW（Minimalist GNU for Windows，最简GNU工具集），通过增加了一个由bash提供的shell环境以及其他相关工具软件，组成了一个最简系统（Minimal System），利用MinGW提供的工具，以及Git针对MinGW的一个分支版本，可以在Windows平台为Git编译出一个原生应用，结合MSYS就组成了msysGit。

Git 和传统的版本控制工具 CVS、SVN 有不小的区别，前者关心的是文件的整体性是否发生了改变，后两者更关心文件内容上的差异。


![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/git-qiyuan-03.png)


除此之外，Git 更像是一个文件系统，每个使用它的主机都可以作为版本库，并且不依赖于远程仓库而离线工作。开发者在本地就有历史版本的副本，因此就不用再被远程仓库的网络传输而束缚。

Git 中的绝大多数操作都只需要访问本地文件和资源，一般不需要来自网络上其它计算机的信息。因为在本地磁盘上就有项目的完整历史，所以 Git 的大部分操作看起来就像是在瞬间完成的。

在多人协作的情况下，Git 可以将本地仓库复制给其他开发者，那些发生改变的文件可以作为新增的分支被导入，再与本地仓库的进行分支合并。

如果你希望后面的学习更顺利，请记住 Git 这三种状态：

- 已提交（committed），表示数据已经安全的保存在本地数据库中
- 已修改（modified），表示修改了文件，但还没保存到数据库中
- 已暂存（staged），表示对一个已修改文件的当前版本做了标记，使之包含在下次提交的快照中

由此引入了 Git 的三个工作区域：

- Git 仓库，用来保存项目的元数据和对象数据库
- 工作目录，对项目的某个版本进行独立提取
- 暂存区域，保存了下次将提交的文件列表信息，也可以叫“索引”

Git 的工作流程是这样的：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/git-qiyuan-04.png)


- 在工作目录中修改文件
- 暂存文件，将文件的快照放入暂存区域
- 提交更新，找到暂存区域的文件，将快照永久性存储到 Git 仓库目录

接下来，我们来看一下 **Git 的安装**，Linux 和 Windows 系统的安装大家可以到 Git 官网上查看安装方法，上面讲的非常详细。

>https://git-scm.com/downloads


![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/git-qiyuan-05.png)

我个人使用的 macOS 系统，可以直接使用 `brew install git` 命令安装，非常方便。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/git-qiyuan-06.png)

安装成功后，再使用 `git --version` 就可以查看版本号了，我本机上安装的是 2.23.0 版本。

----

参考资料：

>维基百科：https://zh.wikipedia.org/wiki/Git
>ProGit：https://www.progit.cn/
>hutusi：[改变世界的一次代码提交](https://mp.weixin.qq.com/s/gM__sQPILkAKWsMejOO8cA)




