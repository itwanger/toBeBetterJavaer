---
title: GitHub 远程仓库端口从 22 改为 443，ssh connect to host github.com port 22 Connection timed outfatal Could not read from remote repository.Please make sure you have the correct access rights and the repository exists.
shortTitle: 远程仓库22端口切换到443
category:
  - 开发/构建工具
tag:
  - Git
description: 服务器上的 GitHub 仓库的端口 22 突然不能使用，导致无法 pull 代码，于是切换到了 443 端口，记录一下。
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,二哥的Java进阶之路,Java进阶之路,Git入门,Git教程,git,git教程,git远程仓库,端口切换
---

2024年01月16日，这天要更新《[二哥的 Java 进阶之路](https://javabetter.cn/)》，远程连接到服务器上后，执行 `git pull` 命令，结果报错：

```bash
git pull
ssh: connect to host github.com port 22: Connection timed out
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

以为服务器被入侵了，因为我之前操作的时候一直都是 OK 的，并且我看服务器上的 GitHub 密钥也都在。

![](https://cdn.tobebetterjavaer.com/stutymore/port-22-to-443-20240116201634.png)

就很奇怪，于是我在 GPT 的帮助下使用 `ssh -vvv git@github.com` 命令诊断了一下，结果如下所示：

![](https://cdn.tobebetterjavaer.com/stutymore/port-22-to-443-20240116202017.png)

猜测的原因是，GitHub 限制了 22 端口，因为我看了一下服务器上的 22 端口，防火墙下是打开的。

于是我又用这个命令 `ssh -T -p 443 git@ssh.github.com` 测试了一下，结果如下所示：

![](https://cdn.tobebetterjavaer.com/stutymore/port-22-to-443-20240116202042.png)

表明成功通过端口 443 建立了 SSH 连接到 GitHub，这意味着现在可以使用 SSH 方式进行 Git 操作（如克隆、推送、拉取等）。

只不过原有的配置是 22 端口，现在要改成 443 端口。怎么改呢？

先执行下面的命令，查看现在的远程仓库地址：

```bash
git remote -v
```

![](https://cdn.tobebetterjavaer.com/stutymore/port-22-to-443-20240116202311.png)

然后通过下面的命令修改远程仓库地址：

```bash
git remote set-url origin ssh://git@ssh.github.com:443/用户名/仓库名.git
```

然后就可以看到端口修改成功了。

![](https://cdn.tobebetterjavaer.com/stutymore/port-22-to-443-20240116202534.png)

再执行 `git pull` 命令，就可以正常拉取代码了。

![](https://cdn.tobebetterjavaer.com/stutymore/port-22-to-443-20240116202620.png)




----

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)