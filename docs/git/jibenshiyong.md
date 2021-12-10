对于新手来说，Git 操作确实容易给代码的版本库带来一些不必要的混乱，毕竟大学的时候，学习的重点在编程语言上，在计算机基础上。可一旦参加了工作，就必须得在代码版本库上狠下一番功夫了，毕竟要多人运动啊，不，多人协作啊。


### 一、创建仓库

仓库，也就是 repository，可以简单理解为一个目录，这个目录里面的所有文件都将被 Git 管理起来，每个文件的一举一动，都将被 Git 记录下来，以便在任何时刻进行追踪和回滚。

新建一个文件夹，比如说 testgit，然后使用 `git init` 命令就可以把这个文件夹初始化为 Git 仓库了。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/jibenshiyong-01.png)


初始化Git 仓库成功后，可以看到多了一个 .git 的目录，没事不要乱动，免得破坏了 Git 仓库的结构。

接下来，我们来新增一个文件 readme.txt，内容为“老铁，记得给二哥三连啊”，并将其提交到 Git 仓库。

第一步，使用 `git add` 命令将新增文件添加到暂存区。

第二步，使用 `git commit` 命令告诉 Git，把文件提交到仓库。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/jibenshiyong-02.png)

可以使用 `git status` 来查看是否还有文件未提交。

也可以在文件中新增一行内容“传统美德不能丢，记得点赞哦~”，再使用 `git status` 来查看结果。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/jibenshiyong-03.png)

如果想查看文件到底哪里做了修改，可以使用 `git diff` 命令：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/jibenshiyong-04.png)

确认修改的内容后，可以使用 `git add` 和 `git commit` 再次提交。

### 二、版本回滚

再次对文件进行修改，追加一行内容为：“xxx，我爱你❤”，并且提交到 Git 仓库。

现在我已经对 readme.txt 文件做了三次修改了。可以通过 `git log` 命令来查看历史记录：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/jibenshiyong-05.png)

也可以通过 `gitk` 这个命令来启动图形化界面来查看版本历史。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/jibenshiyong-06.png)


如果想回滚的话，比如说回滚到上一个版本，可以执行以下两种命令：

1）`git reset --hard HEAD^`，上上个版本就是 `git reset --hard HEAD^^`，以此类推。

2）`git reset --hard HEAD~100`，如果回滚到前 100 个版本，用这个命令比上一个命令更方便。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/jibenshiyong-07.png)

那假如回滚错了，想恢复，不记得版本号了，可以先执行 `git reflog` 命令查看版本号：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/jibenshiyong-08.png)

然后再通过 `git reset --hard` 命令来恢复：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/jibenshiyong-09.png)

### 三、工作区和暂存区的区别

工作区和暂存区的概念其实在前面的章节里强调过了，但考虑到有些小伙伴在 `git add` 和 `git commit` 命令之间仍然有一些疑惑，我们这里就再强调一次——学习知识就是这样，只有不厌其烦地重复，才能真正地理解和掌握。

1）**工作区**，比如说前面提到的 testgit 目录就属于工作区，我们操作的 readme.txt 文件就放在这个里面。

2）**暂存区**，隐藏目录 .git 不属于工作区，它（Git 仓库）里面存了很多东西，其中最重要的就是暂存区。

Git 在提交文件的时候分两步，第一步 `git add` 命令是把文件添加到暂存区，第二步 `git commit` 才会把暂存区的所有内容提交到 Git 仓库中。

“**为什么要先 add 才能 commit 呢？**”

最直接的原因就是Linus 搞了这个“暂存区”的概念。那为什么要搞这个概念呢？没有暂存区不行吗？

嗯，要回答这个问题，我们就需要追本溯源了。

在 Git 之前， SVN 是代码版本管理系统的集大成者。SVN 比之前的 CVS 更优秀的一点是，每次的提交可以由多个文件组成，并且这次提交是原子性的，要么全部成功，要么全部失败。

原子性带来的好处是显而易见的，这使得我们可以把项目整体还原到某个时间点，就这一点，SVN 就完虐 CVS 这些代码版本管理系统了。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/jibenshiyong-10.png)

Git 作为逼格最高的代码版本管理系统，自然要借鉴 SVN 这个优良特性的。但不同于 SVN 的是，Git 一开始搞的都是命令行，没有图形化界面，如果想要像 SVN 那样一次性选择多个文件或者不选某些文件（见上图），还真特喵的是个麻烦事。

对于像 Linus 这种天才级选手来说，图形化界面无疑是 low 逼，可命令行在这种情况下又实在是麻烦~

嗯，怎么办呢？

神之所以为神，就是他能在遇到问题的时候想到完美的解决方案——搞个**暂存区**不就完事了？

暂存区可以随意地将各种文件的修改放进去，只需要通过 `git add` 这种简单的命令就可以精心地挑选要提交哪些文件了，然后再一次性（原子性）的 `git commit` 到版本库，所有的问题都迎刃而解嘛。

我们在 testgit 目录下再新增一个文件 readyou.txt，内容为“二哥，我要和你约饭~~~”；并且在 readme.txt 文件中再追加一行内容“点赞、在看、留言、转发一条龙服务~”。

我们先用 `git status` 命令查看一下状态，再用 `git add` 将文件添加到暂存区，最后再用 `git commit` 一次性提交到 Git 仓库。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/jibenshiyong-11.png)

### 四、撤销修改

现在，我在 readyou.txt 文件中追加了一行内容：“二哥，我想和你约会~~~”。在我想要提交的时候，突然发现追加的内容有误，我得恢复到以前的版本，该怎么办呢？

1）我知道要修改的内容，直接修改，然后 add 和 commit 覆盖。

2）我忘记要修改哪些内容了，通过 `git reset -- hard HEAD` 恢复到上一个版本。

还有其他办法吗？

答案当然是有了，其实在我们执行 `git status` 命令查看 Git 状态的时候，结果就提示我们可以使用 `git restore` 命令来撤销这次操作的。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/jibenshiyong-12.png)

那其实在 git version 2.23.0 版本之前，是可以通过 `git checkout` 命令来完成撤销操作的。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/jibenshiyong-13.png)

checkout 可以创建分支、导出分支、切换分支、从暂存区删除文件等等，一个命令有太多功能就容易让人产生混淆。2.23.0 版本改变了这种混乱局面，git switch 和 git restore 两个新的命令应运而生。

switch 专注于分支的切换，restore 专注于撤销修改。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/jibenshiyong-14.png)

### 五、远程仓库

Git 是一款分布式版本控制系统，所以同一个 Git 仓库，可以分布到不同的机器上。一开始，只有一台机器和一个原始版本库，往后去，别的机器就可以从这台机器上拷贝原始版本，就像黑客帝国里的那个特工史密斯一样，没有任何区别。

这也是 Git 比集中式版本控制系统 SVN 特别的地方之一。

我们可以自己搭建一台每天 24 小时可以运转的 Git 服务器，然后其他人就从这台“服务器”中拷贝就行了。不过，因为 GitHub 的存在，自主搭建 Git 服务器这个步骤就可以省了。

从名字上就可以看得出来，GitHub 是用来提供 Git 仓库托管服务的，我们**只需要注册一个 GitHub 账号**，就可以免费获取一台每天可以运转 24 小时的 Git 远程服务器。

那其实在 GitHub 上有对应的中文帮助文档，来介绍如何通过 SSH 协议将本机和 GitHub 链接起来，从而不必在每次访问时提供用户名和密码。

>https://docs.github.com/cn/authentication/connecting-to-github-with-ssh/about-ssh

**第一步，通过 `ls -al ~/.ssh` 命令检查 SSH 密钥是否存在**

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/jibenshiyong-15.png)

如果没有 id_rsa.pub、id_ecdsa.pub、id_ed25519.pub 这 3 个文件，表示密钥不存在。

**第二步，生成新 SSH 密钥**

执行以下命令，注意替换成你的邮箱：

```
ssh-keygen -t ed25519 -C "your_email@example.com
```

然后一路回车：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/jibenshiyong-16.png)

记得复制一下密钥，在 id_ed25519.pub 文件中：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/jibenshiyong-17.png)

**第三步，添加 SSH 密钥到 GitHub 帐户**

在个人账户的 settings 菜单下找到 SSH and GPG keys，将刚刚复制的密钥添加到 key 这一栏中，点击「add SSH key」提交。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/jibenshiyong-18.png)

Title 可不填写，提交成功后会列出对应的密钥：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/jibenshiyong-19.png)

**为什么 GitHub 需要 SSH 密钥呢**？

因为 GitHub 需要确认是“你本人”在往你自己的远程仓库上提交版本的，而不是别人冒充的。

**第四步，在 GitHub 上创建个人仓库**

点击新建仓库，填写仓库名称等信息：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/jibenshiyong-20.png)

**第五步，把本地仓库同步到 GitHub**

复制远程仓库的地址：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/jibenshiyong-21.png)

在本地仓库中执行 `git remote add` 命令将 GitHub 仓库添加到本地：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/jibenshiyong-22.png)

当我们第一次使用Git 的 push 命令连接 GitHub 时，会得到一个警告⚠️：

```
The authenticity of host 'github.com (20.205.243.166)' can't be established.
ECDSA key fingerprint is SHA256:p2QAMXNIC1TJYWeIOttrVc98/R1BUFWu3/LiyKgUfQM.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
```

这是因为需要你手动确认，输入 yes 即可。

接下来，我们使用 `git push` 命令将当前本地分支推送到 GitHub。加上了 -u 参数后，Git 不但会把本地的 master 分支推送的远程 master 分支上，还会把本地的 master 分支和远程的master 分支关联起来，在以后的推送或者拉取时就可以简化命令（比如说 `git push github master`）。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/jibenshiyong-23.png)

此时，我们刷一下 GitHub，可以看到多了一个 master 分支，并且本地的两个文件都推送成功了！

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/jibenshiyong-24.png)

从现在开始，只要本地做了修改，就可以通过 `git push` 命令推送到 GitHub 远程仓库了。

还可以使用 `git clone` 命令将远程仓库拷贝到本地。比如说我现在有一个 3.4k star 的仓库 JavaBooks，

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/jibenshiyong-25.png)

然后我使用 `git clone` 命令将其拷贝到本地。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/git/jibenshiyong-26.png)