---
title: 如何参与开源项目
shortTitle: 如何参与开源项目
author: 细说 GitHub 上的 PR 全过程
category:
  - 博客园
---

目录

*   [一、概述](#一概述)
*   [二、为什么要参与开源项目](#二为什么要参与开源项目)
*   [三、为什么我想介绍如何 PR](#三为什么我想介绍如何-pr)
*   [四、我想参与开源项目，怎么开始？](#四我想参与开源项目怎么开始)
*   [4.1、寻找一个合适的开源项目](#41寻找一个合适的开源项目)
*   [4.2、寻找贡献点](#42寻找贡献点)
*   [五、我要提交 PR，怎么上手？](#五我要提交-pr怎么上手)
*   [5.1、第一步：Fork 项目仓库](#51第一步fork-项目仓库)
*   [5.2、第二步：克隆项目仓库到本地](#52第二步克隆项目仓库到本地)
*   [5.3、第三步：更新本地分支代码](#53第三步更新本地分支代码)
*   [5.4、第四步：写代码](#54第四步写代码)
*   [5.5、第五步：Commit 和 Push](#55第五步commit-和-push)
*   [5.6、第六步：开一个 PR](#56第六步开一个-pr)
*   [5.7、第七步：PR 合入](#57第七步pr-合入)
*   [六、我提交了一个 PR，然后遇到了问题 A,B,C,D,E,F,G,...😭](#六我提交了一个-pr然后遇到了问题-abcdefg)
*   [6.1、Reviewers 提了一些修改意见，我如何更新 PR？](#61reviewers-提了一些修改意见我如何更新-pr)
*   [6.2、Commits 太多或者记录混乱，如何合并 Commits？](#62commits-太多或者记录混乱如何合并-commits)
*   [6.2.1、Git 命令行方式合并 Commits](#621git-命令行方式合并-commits)
*   [6.2.2 IDE 里合并 Commits](#622-ide-里合并-commits)
*   [6.3、PR 产生了冲突，如何解决？](#63pr-产生了冲突如何解决)
*   [6.3.1、在线解决冲突](#631在线解决冲突)
*   [6.3.2、本地解决冲突](#632本地解决冲突)
*   [6.4、CI 检查不过：commit message 相关问题如何修复？](#64ci-检查不过commit-message-相关问题如何修复)
*   [6.5、CI 检查不过：DCO(sign) 问题如何修复？](#65ci-检查不过dcosign-问题如何修复)
*   [七、最后](#七最后)

## 一、概述

**今天我准备和你详细介绍如何开始参与开源项目，帮助你在 GitHub 上完成第一个 PR 的合入**。

当然，除了正常的 PR 合入流程之外，我还准备详细介绍一下如果一个 PR 提交后遇到了冲突、需要追加 commits、需要合并 commits 等等相对复杂问题该如何解决。

总的来说，本文计划分为4个部分：

1.  谈谈为什么要参与开源项目以及我为什么要介绍如何 PR
2.  谈谈怎么开始参与开源项目，也就是如何寻找合适的开源项目、如何寻找贡献点
3.  介绍怎么上手 PR 流程，即从 fork 到 push 全流程
4.  介绍提交了 PR 之后遇到各种常见问题如何解决

Ok, let's get started!

## 二、为什么要参与开源项目

本文我不打算长篇大论“为什么要参与开源”，详细介绍参与开源项目的收获，我想仅从“提升编码能力”角度谈一谈“为什么要参与开源项目”。

在面试的时候我有个习惯，如果候选人在自己的简历里说到自己熟悉某一门语言，我就会习惯性问他一个问题：

**你有没有阅读过某个开源项目的源码？或者更进一步，有没有参与过某个开源社区，或者说给开源项目提过 PR**？

如果答案是肯定的，比如候选人说自己读过部分 Kubernetes 模块的源码，再进一步我确认他真的读过并且读懂了或者说真的提交过 bugfix/feature 类型的 PR，那我就不再问编程语言层面的问题了，因为我相信能看懂一个成熟的开源项目部分模块源码或者能够提交 bugfix/feature 类型的 PR 已经说明了一切。

我自己在学习 Golang 的时候，大致分为两个阶段：

1.  学习基础语法，开始写项目，直到能够熟练完成各种业务功能的开发；
2.  看了一些开源项目的源码，深感受益颇多，编码水平再上一个台阶。

差不多也就是在看 Kubernetes 项目源码的时候，我深刻认识到一般的企业内部项目和汇集全世界最优秀的程序员智慧结晶的开源项目之间的巨大差距，也意识到学习优秀开源项目源码对于一个程序员编码水平提升的重要性（当然，你可以说 Google 内部也存在非开源的非常优秀的代码，这毫无疑问，但是我想今天我们没有必要讨论特例）。

认真阅读开源项目源码，你总会发现一些小瑕疵，这时候提一个 PR(Pull Request)，让你的代码合入开源项目，运行在“世界每一个角落”，那是多么有趣的事情！而成功合入第一个 PR 往往就像打开潘多拉魔盒一样，你会进入到另外一个世界，开始接触到开源社区，感受开源的魅力！

## 三、为什么我想介绍如何 PR

我司开源了2个项目，分别是：

1.  [CNCF Project DevStream](https://github.com/devstream-io/devstream)

![CNCF Project DevStream](https://img2022.cnblogs.com/blog/998740/202207/998740-20220707100226021-228965712.png)

2.  [Apache DevLake](https://github.com/apache/incubator-devlake)

![Apache DevLake](https://img2022.cnblogs.com/blog/998740/202207/998740-20220707100225973-1547592173.png)

DevStream 项目和 DevLake 项目隔三差五就会有新贡献者提交 PR 过来，但是多数贡献者在提交第一个 PR 时往往会遇到一个或多个问题，比如产生冲突、commits 记录过多或者混乱、commit 没有签名、commit message 不规范、各种 ci 流程检查报错等等。

在看到新贡献者提交 PR 时，我们自然是非常开心且热情地对他表示欢迎并且告知如何修复各种问题，但是随着贡献者的增多，我们的开源社区几乎每天都需要回答一个问题：“**如何正确地提交一个 PR**”。可能此时你会开始怀疑我们是不是没有提供相应的文档？其实不然，我们有详细的文档，但是人总是有惰性的，多数的新贡献者并没有足够的意愿去仔细看翻看文档然后再提交 PR，甚至很多新贡献者由于刚开始接触开源项目，对于项目结构和文档组织结构比较陌生，甚至不会想到有这些文档的存在，总之各种各样的理由让多数的新贡献者会选择“**先提了 PR再说**”。

那么今天我想尝试彻底讲明白“如何正确地提交一个 PR”，尝试细说 GitHub 上的 PR 全过程，以及这里面可能会遇到的各种困难和解决办法。**一方面希望对第一次参与开源项目的新人有所帮助，另一方面希望能够进一步降低 DevStream 社区和 DevLake 社区的参与门槛**。

## 四、我想参与开源项目，怎么开始？

不管你为什么决定开始参与开源项目，不管出发点是出于学习、兴趣、成就感等等，还是为了让某个自己需要的特性合入某个开源项目，总之今天你下定决心，要给某个开源项目提交一个 PR 了，好，我们开始吧！

### 4.1、寻找一个合适的开源项目

如果你已经决定参与某个开源社区了，那么请直接跳过本小节。

如果你就只是想开始参与开源，暂时还不知道该参与哪个社区，那么我有几个小建议：

1.  **不要从特别成熟的项目开始**。比如现在去参与 Kubernetes 社区，一方面由于贡献者太多，很难抢到一个入门级的 issue 来开始第一个 PR；另外一方面也由于贡献者太多，你的声音会被淹没，社区维护者并不在意多你一个或者少你一个（当然可能没有人会承认，但是你不得不信），如果你提个 PR 都遇到了各种问题还不能自己独立解决，那么很可能你的 PR 会直接超时关闭，没有人在意你是不是有一个好的参与体验；
2.  **不要从特别小的项目开始**。这就不需要我解释了吧？很早期的开源项目可能面临着非常多的问题，比如代码不规范、协作流程不规范、重构频繁且不是 issue 驱动的，让外部参与者无所适从……
3.  **选择知名开源软件基金会的孵化项目**，这类项目一方面不是特别成熟，所以对新贡献者友好；另一方面也不会特别不成熟，不至于给人很差的参与体验，比如 **Apache 基金会、Linux 基金会、CNCF 等**。

比如可以从这些地方寻找自己感兴趣的开源项目：

*   [CNCF 沙箱项目](https://www.cncf.io/sandbox-projects/)
*   [CNCF 孵化项目(列表包括毕业项目)](https://www.cncf.io/projects/)
*   [Apache 项目(孵化期项目名字中带 Incubating)](https://projects.apache.org/projects.html)

当然，你也可以直接选择从 CNCF 沙箱项目 [DevStream](https://www.cncf.io/projects/devstream/) 或者 Apache 孵化项目 [Apache DevLake](https://projects.apache.org/project.html?incubator-devlake)，以此敲开开源世界的大门。

### 4.2、寻找贡献点

开源项目的参与方式很多，最典型的方式是提交一个特性开发或者 bug 修复相关的 PR，但是其实文档完善、测试用例完善、bug 反馈等等也都是非常有价值的贡献。不过本文还是从需要提 PR 的贡献点开始上手，以 DevStream 项目为例（其他项目也一样），在项目 GitHub 代码库首页都会有一个 [Issues 入口](https://github.com/devstream-io/devstream/issues)，这里会记录项目目前已知的 bug、proposal(可以理解成新需求)、计划补充的文档、亟需完善的 UT 等等，如下图：

![DevStream Issues](https://img2022.cnblogs.com/blog/998740/202207/998740-20220707100226117-350735931.png)

在 Issues 里我们一般可以找到一个“good first issue”标签标记的 issues，点击这个标签可以进一步直接筛选出所有的 good first issues，这是社区专门留给新贡献者的相对简单的入门级 issues：

![DevStream Good First Issues](https://img2022.cnblogs.com/blog/998740/202207/998740-20220707100226118-2015160519.png)

没错，从这里开始，浏览一下这些 good first issues，看下有没有你感兴趣的而且还没被分配的 issue，然后在下面留言，等待项目管理员分配任务后就可以开始编码了，就像这样：

![Claim an Issue in DevStream](https://img2022.cnblogs.com/blog/998740/202207/998740-20220707100226119-1945823002.png)

如图所示，如果一个 issue 还没有被认领，这时候你上去留个言，等待管理员会将这个任务分配给你，接着你就可以开始开发了。

## 五、我要提交 PR，怎么上手？

一般开源项目代码库根目录都会有一个 CONTRIBUTING.md 或者其他类似名字的文档来介绍如何开始贡献，像这样：

![DevStream Contributing](https://img2022.cnblogs.com/blog/998740/202207/998740-20220707100225973-371924002.png)

在 [DevStream 的 Contributing](https://github.com/devstream-io/devstream/blob/main/CONTRIBUTING.md) 文档里我们放了一个 [Development Workflow](https://github.com/devstream-io/devstream/blob/main/docs/development/development-workflow.md)，其实就是 PR 工作流的介绍，不过今天，我要更详细地聊聊 PR 工作流。

### 5.1、第一步：Fork 项目仓库

GitHub 上的项目都有一个 Fork 按钮，我们需要先将开源项目 fork 到自己的账号下，以 DevStream 为例：

![Fork DevStream](https://img2022.cnblogs.com/blog/998740/202207/998740-20220707100226050-322033380.png)

点一下 Fork 按钮，然后回到自己账号下，可以找到 fork 到的项目了：

![DevStream Fork](https://img2022.cnblogs.com/blog/998740/202207/998740-20220707100226014-1620627643.png)

这个项目在你自己的账号下，也就意味着你有任意修改的权限了。我们后面要做的事情，就是将代码变更提到自己 fork 出来的代码库里，然后再通过 Pull Request 的方式将 commits 合入上游项目。

### 5.2、第二步：克隆项目仓库到本地

对于任意一个开源项目，流程几乎都是一样的。我直接写了一些命令，大家可以复制粘贴直接执行。当然，命令里的一些变量还是需要根据你自己的实际需求修改，比如对于 DevStream 项目，我们可以先这样配置几个环境变量：

*   环境变量

```language-sh
export WORKING_PATH="~/gocode"
export USER="daniel-hutao"
export PROJECT="devstream"
export ORG="devstream-io"
```
 

同理对于 DevLake，这里的命令就变成了这样：

```language-sh
export WORKING_PATH="~/gocode"
export USER="daniel-hutao"
export PROJECT="incubator-devlake"
export ORG="apache"
```
 

记得 USER 改成你的 GitHub 用户名，WORKING\_PATH 当然也可以灵活配置，你想把代码放到哪里，就写对应路径。

接着就是几行通用的命令来完成 clone 等操作了：

*   clone 等

```language-sh
mkdir -p ${WORKING_PATH}
cd ${WORKING_PATH}
# You can also use the url: git@github.com:${USER}/${PROJECT}.git
# if your ssh configuration is proper
git clone https://github.com/${USER}/${PROJECT}.git
cd ${PROJECT}

git remote add upstream https://github.com/${ORG}/${PROJECT}.git
# Never push to upstream locally
git remote set-url --push upstream no_push
```
 

如果你配置好了 ssh 方式来 clone 代码，当然，git clone 命令用的 url 可以改成`git@github.com:${USER}/${PROJECT}.git`。

完成这一步后，我们在本地看到的 remote 信息应该是这样的：

*   git remote -v

```language-sh
origin	git@github.com:daniel-hutao/devstream.git (fetch)
origin	git@github.com:daniel-hutao/devstream.git (push)
upstream	https://github.com/devstream-io/devstream (fetch)
upstream	no_push (push)
```
 

记住啰，你本地的代码变更永远只提交到 origin，然后通过 origin 提交 Pull Request 到 upstream。

### 5.3、第三步：更新本地分支代码

如果你刚刚完成 fork 和 clone 操作，那么你本地的代码肯定是新的。但是“刚刚”只存在一次，接着每一次准备开始写代码之前，你都需要确认本地分支的代码是新的，因为基于老代码开发你会陷入无限的冲突困境之中。

*   更新本地 main 分支代码：

```language-sh
git fetch upstream
git checkout main
git rebase upstream/main
```
 

当然，我不建议你直接在 main 分支写代码，虽然你的第一个 PR 从 main 提交完全没有问题，但是如果你需要同时提交2个 PR 呢？总之鼓励新增一个 feat-xxx 或者 fix-xxx 等更可读的分支来完成开发工作。

*   创建分支

```language-sh
git checkout -b feat-xxx
```
 

这样，我们就得到了一个和上游 main 分支代码一样的特性分支 feat-xxx 了，接着可以开始愉快地写代码啦！

### 5.4、第四步：写代码

没啥好说的，写就是了，写！

### 5.5、第五步：Commit 和 Push

*   通用的流程：

```language-sh
git add <file>
git commit -s -m "some description here"
git push origin feat-xxx
```
 

当然，这里大家需要理解这几个命令和参数的含义，灵活调整。比如你也可以用`git add --all`完成 add 步骤，在 push 的时候也可以加`-f`参数，用来强制覆盖远程分支（假如已经存在，但是 commits 记录不合你意）。但是请记得`git commit`的`-s`参数一定要加哦！

如果你习惯用 IDE 来 commit，当然也没有任何问题，像这样：

![DevStream Commit with Goland](https://img2022.cnblogs.com/blog/998740/202207/998740-20220707100226012-371359624.png)

这里要注意 commit message 的规范，可能每个开源项目的要求不尽相同，比如 DevStream 的[规范](https://github.com/devstream-io/devstream/blob/main/docs/development/commit-messages.md)是类似这样的格式：

```language-sh
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```
 

举几个例子：

*   feat: some description here
*   docs: some description here
*   fix: some description here
*   fix(core): some description here
*   chore: some description here
*   ...

commit 和 push 两个步骤可以在 IDE 里一步到位，也可以分开，我习惯分开操作，给自己多一些余地。另外，我更习惯命令行操作：

*   git push origin feat-1

```language-sh
Counting objects: 80, done.
Delta compression using up to 10 threads.
Compressing objects: 100% (74/74), done.
Writing objects: 100% (80/80), 13.78 KiB | 4.59 MiB/s, done.
Total 80 (delta 55), reused 0 (delta 0)
remote: Resolving deltas: 100% (55/55), completed with 31 local objects.
remote: 
remote: Create a pull request for 'feat-1' on GitHub by visiting:
remote:      https://github.com/daniel-hutao/devstream/pull/new/feat-1
remote: 
To github.com:daniel-hutao/devstream.git
 * [new branch]      feat-1 -> feat-1
```
 

到这里，本地 commits 就推送到远程了。

### 5.6、第六步：开一个 PR

在完成 push 操作后，我们打开 GitHub，可以看到一个黄色的提示框，告诉我们可以开一个 Pull Request 了：

![Compare & pull request](https://img2022.cnblogs.com/blog/998740/202207/998740-20220707100226052-319748721.png)

如果你没有看到这个框，也可以直接切换到 feat-1 分支，然后点击下方的“Contribute”按钮来开启一个 PR，或者直接点 Issues 边上的 Pull requests 进入对应页面。

*   Pull Request 格式默认是这样的：

![DevStream Pull Request](https://img2022.cnblogs.com/blog/998740/202207/998740-20220707100226009-1563663903.png)

这里我们需要填写一个合适的标题（默认和 commit message 一样），然后按照模板填写 PR 描述。PR 模板其实在每个开源项目里都不太一样，我们需要仔细阅读上面的内容，避免犯低级错误。

比如 DevStream 的模板里目前分为4个部分：

1.  **Pre-Checklist**：这里列了3个前置检查项，提醒 PR 提交者要先阅读 Contributing 文档，然后代码要有完善的注释或者文档，尽可能添加测试用例等；
2.  **Description**：这里填写的是 PR 的描述信息，也就是介绍你的 PR 内容的，你可以在这里描述这个 PR 解决了什么问题等；
3.  **Related Issues**：记得吗？我们在开始写代码之前其实是需要认领 issue 的，这里要填写的也就是对应 issue 的 id，假如你领的 issue 链接是 [https://github.com/devstream-io/devstream/issues/796，并且这个](https://github.com/devstream-io/devstream/issues/796%EF%BC%8C%E5%B9%B6%E4%B8%94%E8%BF%99%E4%B8%AA) issue 通过你这个 PR 的修改后就完成了，可以关闭了，这时候可以在 Related Issues 下面写“**close #796**”；
4.  **New Behavior**：代码修改后绝大多数情况下是需要进行测试的，这时候我们可以在这里粘贴测试结果截图，这样 reviewers 就能够知道你的代码已经通过测试，功能符合预期，这样可以减少 review 工作量，快速合入。

这个模板并不复杂，我们直接对着填写就行。

*   比如：

![DevStream Pull Request Template](https://img2022.cnblogs.com/blog/998740/202207/998740-20220707100226013-1749348094.png)

然后点击右下角“Create pull request”就完成了一个 PR 的创建了。不过我这里不能去点这个按钮，我用来演示的修改内容没有意义，不能合入上游代码库。不过我还是想给你看下 PR 创建出来后的效果，我们以 [pr655](https://github.com/devstream-io/devstream/pull/655) 为例吧：

![DevStream Pull Request 655](https://img2022.cnblogs.com/blog/998740/202207/998740-20220707100226105-2124939362.png)

这是上个月我提的一个 PR，基本和模板格式一致。除了模板的内容，可能你已经注意到这里多了一个 Test 小节，没错，模板不是死的，模板只是为了降低沟通成本，你完全可以适当调整，只要结果是“往更清晰的方向走”的。我这里通过 Test 部分添加了本地详细测试结果记录，告诉 reviewers 我已经在本地充分测试了，请放心合入。

提交了 PR 之后，我们就可以在 PR 列表里找到自己的 PR 了，这时候还需要注意 ci 检查是不是全部能够通过，假如失败了，需要及时修复。以 DevStream 为例，ci 检查项大致如下：

![DevStream CI Checks](https://img2022.cnblogs.com/blog/998740/202207/998740-20220707100226166-28142608.png)

### 5.7、第七步：PR 合入

如果你的 PR 很完美，毫无争议，那么过不了太长时间，项目管理员会直接合入你的 PR，那么你这个 PR 的生命周期也就到此结束了。

但是，没错，这里有个“但是”，但是往往第一次 PR 不会那么顺利，我们接下来就详细介绍一下可能经常遇到的一些问题和对应的解决办法。

## 六、我提交了一个 PR，然后遇到了问题 A,B,C,D,E,F,G,...😭

多数情况下，提交一个 PR 后是不会被马上合入的，reviewers 可能会提出各种修改意见，或者我们的 PR 本身存在一些规范性问题，或者 ci 检查就直接报错了，怎么解决呢？继续往下看吧。

### 6.1、Reviewers 提了一些修改意见，我如何更新 PR？

很多时候，我们提交了一个 PR 后，还需要继续追加 commit，比如提交后发现代码还有点问题，想再改改，或者 reviewers 提了一些修改意见，我们需要更新代码。

一般我们遵守一个约定：在 review 开始之前，更新代码尽量不引入新的 commits 记录，也就是能合并就合并，保证 commits 记录清晰且有意义；在 review 开始之后，针对 reviewers 的修改意见所产生的新 commit，可以不向前合并，这样能够让二次 review 工作更有针对性。

不过不同社区要求不一样，可能有的开源项目会要求一个 PR 里只能包含一个 commit，大家根据实际场景灵活判断即可。

说回如何更新 PR，我们只需要在本地继续修改代码，然后通过和第一个 commit 一样的步骤，执行这几个命令：

```language-sh
git add <file>
git commit -s -m "some description here"
git push origin feat-xxx
```
 

这时候别看 push 的是 origin 的 feat-xxx 分支，其实 GitHub 会帮你把新增的 commits 全部追加到一个未合入 PR 里去。没错，你只管不断 push，PR 会自动更新。

至于如何合并 commits，我们下一小节具体介绍。

### 6.2、Commits 太多或者记录混乱，如何合并 Commits？

很多情况下我们需要去合并 commits，比如你的第一个 commit 里改了100行代码，然后发现少改了1行，这时候又提交了一个 commit，那么第二个 commit 就太“没意思”了，我们需要合并一下。

#### 6.2.1、Git 命令行方式合并 Commits

比如我这里有2个同名的 commits，第二个 commit 其实只改了一个标点：

![Commits to be Merged](https://img2022.cnblogs.com/blog/998740/202207/998740-20220707100226017-1710519800.png)

这时候我们可以通过 rebase 命令来完成2个 commits 的合并：

```language-sh
git rebase -i HEAD~2
```
 

执行这个命令会进入一个编辑页面，默认是 vim 编辑模式，内容大致如下：

```language-sh
pick 3114c0f docs: just for test
pick 9b7d63b docs: just for test

# Rebase d640931..9b7d63b onto d640931 (2 commands)
#
# Commands:
# p, pick = use commit
# r, reword = use commit, but edit the commit message
# e, edit = use commit, but stop for amending
# s, squash = use commit, but meld into previous commit
# f, fixup = like "squash", but discard this commit's log message
# x, exec = run command (the rest of the line) using shell
# d, drop = remove commit
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
```
 

我们需要把第二个 pick 改成 s，然后保存退出(vim 的 wq 命令)：

```language-sh
pick 3114c0f docs: just for test
s 9b7d63b docs: just for test
```
 

接着会进入第二个编辑页面：

```language-sh
# This is a combination of 2 commits.
# This is the 1st commit message:

docs: just for test

Signed-off-by: Daniel Hu <tao.hu@merico.dev>

# This is the commit message #2:

docs: just for test

Signed-off-by: Daniel Hu <tao.hu@merico.dev>

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
# ...
```
 

这里是用来编辑合并后的 commit message 的，我们直接删掉多余部分，只保留这样几行：

```language-sh
docs: just for test

Signed-off-by: Daniel Hu <tao.hu@merico.dev>
```
 

接着同样是 vim 的保存退出操作，这时候可以看到日志：

```language-sh
[detached HEAD 80f5e57] docs: just for test
 Date: Wed Jul 6 10:28:37 2022 +0800
 1 file changed, 2 insertions(+)
Successfully rebased and updated refs/heads/feat-1.
```
 

这时候可以通过`git log`命令查看下 commits 记录是不是符合预期：

![Rebased](https://img2022.cnblogs.com/blog/998740/202207/998740-20220707100226131-594390858.png)

好，我们在本地确认 commits 已经完成合并，这时候就可以继续推送到远程，让 PR 也更新掉：

```language-sh
git push -f origin feat-xxx
```
 

这里需要有一个`-f`参数来强制更新，合并了 commits 本质也是一种冲突，需要冲掉远程旧的 commits 记录。

#### 6.2.2 IDE 里合并 Commits

图形化方式当然也可以实现 Commits 的合并。

*   截图走起

![Squash with Goland](https://img2022.cnblogs.com/blog/998740/202207/998740-20220707100226324-474206642.png)

1.  点击右下角的 Git
2.  选择想要合并的 commits
3.  右键，然后点击 Squash Commits，记得嘴里默念一句：走你！

接着就可以看到这个页面了：

![Squash with Goland](https://img2022.cnblogs.com/blog/998740/202207/998740-20220707100226130-1021994265.png)

这是图形化方式修改 commit message 的页面，行吧，改成你喜欢的样子，然后点击右下角的 OK 按钮，事情就算结束了。

![Squash with Goland](https://img2022.cnblogs.com/blog/998740/202207/998740-20220707100226050-1087149627.png)

看，2个 commits，它们“融合”了，变成了一个“改头换面”的新 commit 了。

### 6.3、PR 产生了冲突，如何解决？

冲突可以在线解决，也可能本地解决，我们逐个来看。

#### 6.3.1、在线解决冲突

我们要尽可能避免冲突，养成每次写代码前更新本地代码的习惯。不过，冲突不可能完全避免，有时候你的 PR 被阻塞了几天，可能别人改了同一行代码，还抢先被合入了，这时候你的 PR 就出现冲突了，类似这样（同样，此刻我不能真的去上游项目构造冲突，所以下面用于演示的冲突在我在自己的 repo 里）：

![Conflict Happened](https://img2022.cnblogs.com/blog/998740/202207/998740-20220707100226336-1445711635.png)

每次看到这个页面都会让人觉得心头一紧。我们点击“Resolve conflicts”按钮，就可以看到具体冲突的内容了：

![Conflict File](https://img2022.cnblogs.com/blog/998740/202207/998740-20220707100226344-223384765.png)

可以看到具体冲突的行了，接下来要做的就是解决冲突。我们需要删掉所有的 `<<<<<<<`、`>>>>>>>` 和 `=======` 标记，只保留最终想要的内容，如下：

![Conflict Resolved](https://img2022.cnblogs.com/blog/998740/202207/998740-20220707100226094-1916960377.png)

接着点击右上角的“Mark as Resolved”：

![Mark as resolved](https://img2022.cnblogs.com/blog/998740/202207/998740-20220707100226130-1612516829.png)

最后点击“Commit merge”：

![Commit Merge](https://img2022.cnblogs.com/blog/998740/202207/998740-20220707100226023-519429988.png)

这样就完成冲突解决了，可以看到产生了一个新的 commit：

![Conflict Resolved](https://img2022.cnblogs.com/blog/998740/202207/998740-20220707100226132-1009679237.png)

到这里，冲突就解决掉了。

#### 6.3.2、本地解决冲突

更多时候，我们需要在本地解决冲突，尤其是冲突太多，太复杂的时候。

同样，我们构造一个冲突，这次尝试在本地解决冲突。

*   先在线看一下冲突的内容：

![Conflict Happened](https://img2022.cnblogs.com/blog/998740/202207/998740-20220707100226331-539616690.png)

*   接着我们在本地执行：

```language-sh
# 先切回到 main 分支
git checkout main
# 拉取上游代码（实际场景肯定是和上游冲突，我们这里的演示环境其实是 origin）
git fetch upstream
# 更新本地 main（这里也可以用 rebase，但是 reset 不管有没有冲突总是会成功）
git reset --hard upstream/main
```
 

到这里，本地 main 分支就和远程(或者上游) main 分支代码完全一致了，然后我们要做的是将 main 分支的代码合入自己的特性分支，同时解决冲突。

```language-sh
git checkout feat-1
git rebase main
```
 

*   这时候会看到这样的日志：

```language-sh
First, rewinding head to replay your work on top of it...
Applying: docs: conflict test 1
Using index info to reconstruct a base tree...
M       README.md
Falling back to patching base and 3-way merge...
Auto-merging README.md
CONFLICT (content): Merge conflict in README.md
error: Failed to merge in the changes.
Patch failed at 0001 docs: conflict test 1
The copy of the patch that failed is found in: .git/rebase-apply/patch

Resolve all conflicts manually, mark them as resolved with
"git add/rm <conflicted_files>", then run "git rebase --continue".
You can instead skip this commit: run "git rebase --skip".
To abort and get back to the state before "git rebase", run "git rebase --abort".
```
 

我们需要解决冲突，直接打开 README.md，找到冲突的地方，直接修改。这里的改法和上一小节介绍的在线解决冲突没有任何区别，我就不赘述了。

代码里同样只保留最终内容，然后继续 git 命令走起来：

![Conflict Resolved](https://img2022.cnblogs.com/blog/998740/202207/998740-20220707100226040-1811067113.png)

可能此时你并不放心，那就通过`git log`命令看一下 commits 历史记录吧：

![Commits History](https://img2022.cnblogs.com/blog/998740/202207/998740-20220707100226132-1133655673.png)

这里的“conflict test 2”是我提交到 main 分支的记录，可以看到这个时间比“conflict test 1”还要晚了一些，但是它先合入了。我们在 rebase 操作后，这个记录在前，我们特性分支的“conflict test 1”在后，看起来很和谐，我们继续将这个变更推送到远程，这个命令已经出现很多次了：

```language-sh
git push -f origin feat-xxx
```
 

这时候我们再回到 GitHub 看 PR 的话，可以发现冲突已经解决了，并且没有产生多余的 commit 记录，也就是说这个 PR 的 commit 记录非常干净，好似冲突从来没有出现过：

![请添加图片描述](https://img2022.cnblogs.com/blog/998740/202207/998740-20220707100226173-1973188152.png)



![Clear Commits Record](https://img2022.cnblogs.com/blog/998740/202207/998740-20220707100226174-1987185087.png)

至于什么时候可以在线解决冲突，什么时候适合本地解决冲突，就看大家如何看待“**需不需要保留解决冲突的记录**”了，不同社区的理解不一样，可能特别成熟的开源社区会希望使用本地解决冲突方式，因为在线解决冲突产生的这条 merge 记录其实“没营养”。至于 DevStream 社区和 DevLake 社区，我们推荐使用后一种，但是不做强制要求。

### 6.4、CI 检查不过：commit message 相关问题如何修复？

前面我们提到过 commit message 的规范，但是第一次提交 PR 的时候还是很容易出错，比如`feat: xxx`其实能通过 ci 检查，但是`feat: Xxx`就不行了。假设现在我们不小心提交了一个 PR，但是里面 commit 的 message 不规范，这时候怎么修改呢？

*   太简单了，直接执行：

```language-sh
git commit --amend
```
 

这条命令执行后就能进入编辑页面，随意更新 commit message 了。改完之后，继续 push：

```language-sh
git push -f origin feat-xxx
```
 

这样就能更新 PR 里的 commit message 了。

### 6.5、CI 检查不过：DCO(sign) 问题如何修复？

相当多的开源项目会要求所有合入的 commits 都包含一行类似这样的记录：

```language-sh
Daniel Hu <tao.hu@merico.dev>
```
 

所以 commit message 看起来会像这样：

```language-sh
feat: some description here
    
Signed-off-by: Daniel Hu <tao.hu@merico.dev>
```
 

这行信息相当于是对应 commit 的作者签名。要添加这样一行签名当然很简单，我们直接在`git commit`命令后面加一个`-s`参数就可以了，比如`git commit -s -m "some description here"`提交的 commit 就会带上你的签名。

但是如果如果你第一次提交的 PR 里忘记了在 commits 中添加 Signed-off-by 呢？这时候，如果对应开源项目配置了 [DCO 检查](https://wiki.linuxfoundation.org/dco)，那么你的 PR 就会在 ci 检查中被“揪出来”没有正确签名。

同样先构造一个没有加签名的 commit：

![请添加图片描述](https://img2022.cnblogs.com/blog/998740/202207/998740-20220707100226041-1739896335.png)

![Commit Without Sign](https://img2022.cnblogs.com/blog/998740/202207/998740-20220707100226183-1264896787.png)

我不能直接推到 DevStream 项目代码库里演示如何让 DCO 报错，但是如果提 PR，看到的效果是这样的：

![Commit With DCO Error](https://img2022.cnblogs.com/blog/998740/202207/998740-20220707100226259-636363990.png)

我们看下如何解决：

*   git commit --amend -s

这样一个简单的命令，就能直接在最近一个 commit 里加上 Signed-off-by 信息。执行这行命令后会直接进入 commit message 编辑页面，默认如下图：

```language-sh
docs: dco test

Signed-off-by: Daniel Hu <tao.hu@merico.dev>
```
 

这时候我们可以同时修改 commit message，如果不需要，那就直接保存退出好了，签名信息是会自动加上的。

完成签名后呢？当然是来一个强制 push 了：

```language-sh
git push -f origin feat-xxx
```
 

这样，你 PR 中的 DCO 报错就自然修复了。

## 七、最后

一个不小心这篇文章写的有点长了。行，打完收工！

*   欢迎到[我的个人网站](https://www.danielhu.cn)或者微信公众号“**胡说云原生**”浏览更多我的文章；
*   欢迎关注[DevStream 社区](https://github.com/devstream-io)，和我一起玩开源；
*   欢迎到[DevStream 官方博客](https://blog.devstream.io)浏览更多 DevStream 团队发布的文章。

![](https://img2022.cnblogs.com/blog/998740/202207/998740-20220708215826771-456239763.jpg)

>转载链接：[https://www.cnblogs.com/daniel-hutao/p/open-a-pr-in-github.html](https://www.cnblogs.com/daniel-hutao/p/open-a-pr-in-github.html)，整理：沉默王二
