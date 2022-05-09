---
category:
  - Java企业级开发
tag:
  - 辅助工具/轮子
title: Chocolatey Homebrew：两款惊艳的Shell软件管理器
---

小二是公司新来的实习生，之前面试的过程中对答如流，所以我非常看好他。第一天，我给他了一台新电脑，要他先在本地搭建个 Java 开发环境。

二话不说，他就开始马不停蹄地行动了。真没想到，他竟然是通过命令行的方式安装的 JDK，这远远超出了我对他的预期。

我以为，他会使用图形化的方式来安装 JDK 的，就像这样。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/Chocolatey-Homebrew-3d58d8db-e851-4c3d-97a5-66c8bf94d420.png)

还有这样。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/Chocolatey-Homebrew-eda6f2a0-a192-4b92-b3cc-46f679ec5bcb.png)

结果他是这样的。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/Chocolatey-Homebrew-371831e9-4580-4097-a0bf-d9c460f493fb.png)

卧槽！牛逼高大上啊！

看着他熟练地在命令行里安装 JDK 的样子，我的嘴角开始微微上扬，真不错！这次总算招到了一个靠谱的。

于是我就安排他做一个记录，打算发表在我的小破站《Java 程序员进阶之路》上。从他嘴里了解到，他用的命令行软件管理器叫 chocolatey，这是一个Windows下的命令行软件管理器，可以方便开发者像在Linux下使用yum命令来安装软件，或者像在macOS下使用brew 命令来安装软件，我感觉非常酷炫。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/Chocolatey-Homebrew-509ea602-39b0-462e-9b8d-2a55fc31a4c8.png)


以下是他的记录，一起来欣赏下。

### 关于shell

对于一名 Java 后端程序员来说，初学阶段，你可以选择在 IDE 中直接编译运行 Java 代码，但有时候也需要在 Shell 下编译和运行 Java 代码。

>Windows 下自带的 Shell 叫命令提示符，或者 cmd 或者 powershell，macOS 下叫终端 terminal。

- [终端与 Shell 的区别](https://mp.weixin.qq.com/s?__biz=MzIxNzQwNjM3NA==&mid=2247491253&idx=1&sn=9a46879174f7240267fe5b5205d16d22&scene=21#wechat_redirect)
- [初次体验 macOS 下的 Shell](https://mp.weixin.qq.com/s/oEo8N3nE0wR1zl7qD4nh3w)

但当你需要在生产环境下部署 Java项目或者查看日志的话，就必然会用到 Shell，这个阶段，Shell 的使用频率高到可以用一个成语来形容——朝夕相伴。

一些第三方软件会在原生的 Shell 基础上提供更强大的功能，常见的有 tabby、Warp、xhsell、FinalShell、MobaXterm、Aechoterm、WindTerm、termius、iterm2 等等，有些只能在 Windows 上使用，有些只能在 macOS 上使用，有些支持全平台。还有 ohmyzsh 这种超神的 Shell 美化工具。

这里，我们列举一些 Shell 的基本操作命令（Windows 和 macOS/Linux 有些许差异）：

- 切换目录，可以使用 cd 命令切换目录，`cd ..` 返回上级目录。


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/Chocolatey-Homebrew-d4f0634f-7b5b-4bbd-97eb-74ec1fe059c5.png)

- 目录列表，macos/linux 下可以使用 ls 命令列出目录下所有的文件和子目录（Windows 下使用 dir 命令），使用通配符 `*` 对展示的内容进行过滤，比如 `ls *.java` 列出所有 `.java`后缀的文件，如果想更进一步的话，可以使用 `ls H*.java` 列出所有以 H 开头 `.java` 后缀的文件。
- 新建目录，macOS/Linux 下可以使用 mkdir 命令新建一个目录（比如 `mkdir hello` 可以新建一个 hello 的目录），Windows 下可以使用 md 命令。
- 删除文件，macOS/Linux 下可以使用 `rm` 命令删除文件（比如 `rm hello.java` 删除 hello.java 文件），Windows 下可以使用 del 命令。
- 删除目录，macOS/Linux 下可以使用 `rm -r` 命令删除目录以及它所包含的所有文件（比如说 `rm -r hello` 删除 hello 目录）。Windows 下可以使用 deltree 命令。
- 重复命令，macOS/Linux/Windows 下都可以使用上下箭头来选择以往执行过的命令。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/Chocolatey-Homebrew-738501d4-c210-449c-9d6c-56d5d16c623b.png)

- 命令历史，macOS/Linux 下可以使用 `history` 命令查看所有使用过的命令。Windows 可以按下 F7 键。


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/Chocolatey-Homebrew-e90c8f1f-c46c-47da-be88-0e8a00d85089.png)

- 解压文件，后缀名为“.zip”的文件是一个包含了其他文件的压缩包，macOS/Linux 系统自身已经提供了用于解压的 unzip 命令， Windows 的话需要手动安装。

### 安装JDK

**1）Windows**

推荐先安装 chocolatey。这是一个Windows下的命令行软件管理器，可以方便开发者像在Linux下使用yum命令来安装软件，或者像在macOS下使用brew 命令来安装软件，非常酷炫。

>The biggest challenge is reducing duplication of effort, so users turn to Chocolatey for simplicity

传统的安装方式要么非常耗时，要么非常低效，在命令行安装软件除了简单高效，还能自动帮我们配置环境变量。

>- 官方地址：[https://chocolatey.org/](https://chocolatey.org/)
>- 安装文档：[https://chocolatey.org/install#individual](https://chocolatey.org/install#individual)

安装完成后如下图所示：

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/Chocolatey-Homebrew-5fd2b098-5685-49be-b424-f13ac288858d.png)

如果不确定是否安装成功的话，可以通过键入 `choco` 命令来确认。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/Chocolatey-Homebrew-a7ea03ef-aa60-47a8-adfc-8b6dde1cf4cc.png)

这里推荐几个非常高效的操作命令：

- choco search xxx，查找 xxx 安装包
- choco info xxx，查看 xxx 安装包信息
- choco install xxx，安装 xxx 软件
- choco upgrade xxx，升级 xxx 软件
- choco uninstall xxx， 卸载 xxx 软件

如何知道 chocolatey 仓库中都有哪些安装包可用呢？

可以通过上面提到的命令行的方式，也可以访问官方仓库进行筛选。

>[https://community.chocolatey.org/packages](https://community.chocolatey.org/packages)

比如说我们来查找 Java。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/Chocolatey-Homebrew-a5d6ff0f-f36d-4eb0-a69e-2ba30dd315ea.png)

好，现在可以直接在shell中键入 `choco install jdk8` 来安装 JDK8 了，并且会自动将Java加入到环境变量中，不用再去「我的电脑」「环境变量」中新建 JAVA_HOME 并复制 JDK 安装路径配置 PATH 变量了，是不是非常 nice？

稍等片刻，键入 `java -version` 就可以确认Java是否安装成功了。


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/Chocolatey-Homebrew-31441e14-b692-4abc-8640-a8b70e08dfae.png)

不得不承认！非常nice！

**2）macOS**

首先推荐安装 homebrew，这是macOS下的命令行软件管理器，用来简化 macOS 上软件的安装过程。homebrew 是开源的，在 GitHub 已收获 32k star。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/Chocolatey-Homebrew-0f9c86a0-e4b2-4103-a77e-8771ab8253f5.png)

homebrew 的安装也非常的简单，只需要一行命令即可。

>官方网址：[https://brew.sh/index_zh-cn](https://brew.sh/index_zh-cn)


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/Chocolatey-Homebrew-b1e8ea1c-2aec-4f79-bdc8-eb3e4fe1a0f0.png)

- 使用 `brew install xxx` 可以安装 macOS 上没有预装的软件
- 使用 `brew install --cask yyy` 可以安装 macOS 其他非开源软件。

这里是 homebrew 常用命令的一个清单，可供参考。

命令| 描述
---|---
brew update|  更新 Homebrew
brew search package|  搜索软件包
brew install package| 安装软件包
brew uninstall package| 卸载软件包
brew upgrade| 升级所有软件包
brew upgrade package| 升级指定软件包
brew list|  列出已安装的软件包列表
brew services command package|  管理 brew 安装软件包
brew services list| 列出 brew 管理运行的服务
brew info package|  查看软件包信息
brew deps package|  列出软件包的依赖关系
brew help|  查看帮助
brew cleanup| 清除过时软件包
brew link package|  创建软件包符号链接
brew unlink package|  取消软件包符号链接
brew doctor|  检查系统是否存在问题

安装完 homebrew 后，建议替换homebrew 的默认源为中科大的，原因就不用我多说了吧？替换方法如下所示：

```
替换brew.git:
cd "$(brew --repo)"
git remote set-url origin https://mirrors.ustc.edu.cn/brew.git

替换homebrew-core.git:
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git
```

如何知道 homebrew 仓库中都有哪些安装包可用呢？

第一种，通过 `brew search xxx` 命令搜索，比如说我们要搜索 jdk


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/Chocolatey-Homebrew-11bdc7b9-5060-4563-9e14-1bc9013882ce.png)

第二种，通过 homebrew 官网搜索，比如说我们要搜索 openjdk。


>官方地址：[https://formulae.brew.sh](https://formulae.brew.sh)


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/Chocolatey-Homebrew-80b4318e-0491-4ebd-8047-7e4528426921.png)

这里有一份不错的 homebrew 帮助文档，可供参考：


>[https://sspai.com/post/56009](https://sspai.com/post/56009)



OK，我们来安装JDK，只需要简单的一行命令就可以搞定。

`brew install openjdk@8`

对比下载安装包，通过图形化界面的方式安装 JDK，是不是感觉在 Shell 下安装 JDK 更炫酷一些？

关键是还省去了环境变量的配置。

记得还没有走出新手村的时候，就经常被环境变量配置烦不胜烦。那下载这种命令行的方式，要比手动在环境变量中配置要省事一百倍，也更不容易出错。

### 关于编辑器

安装完 Java 之后，你还需要一个编辑器，用来编写 Java 代码。

编辑器多种多样，常见的有集成开发环境（IDE,比如 Intellij IDEA 和 vscode），和简单的文本编辑工具（比如 sublime text）。

我建议这三个工具都要装，日常开发中，我会在这三个编辑器中来回切换。

Intellij IDEA：主要用来编写Java代码，并且最好安装旗舰版，社区版用来学习JavaSE部分是绰绰有余的，但要想拥有更强大的生产力，旗舰版是必须的，因为功能更加强大。

比如说 idea 旗舰版中可以直接通过 Initializr 来创建springboot项目，但社区版就没有此功能。


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/Chocolatey-Homebrew-d493229a-d62e-42cc-a6f0-7e3c0893a0c5.png)


vscode：更加轻量级的 IDE，在编写Java代码上可以和idea媲美，但要想调试Java代码的话，vscode 和idea的差距还是非常明显的。


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/Chocolatey-Homebrew-5e913932-58a8-415a-a1aa-30a7e0f2b8aa.png)

我会使用 Intellij IDEA 开发编程喵的后端代码，vscode 来开发编程喵的前端代码。


sublime text：功能更强大的文本编辑器，比记事本这种强大一万倍，也更符合21世纪开发者的外观审美。如果只是简单的修改一下代码格式，或者注释，显然更加方便，因为idea还是比较吃内存的，出差旅行的时候，在笔记本上紧急修改一些代码时，更易用。


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/Chocolatey-Homebrew-85aaca81-9e18-4ba9-aaf2-2989abb85fc5.png)

我会配合 GitHub 桌面版来使用 sublime text，编辑 MD 文档的时候会比较舒服。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png)
