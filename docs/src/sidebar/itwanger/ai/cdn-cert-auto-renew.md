---
title: 感谢 Claude，一行 acme.sh 命令搞定 SSL 证书自动化续签。
shortTitle: CDN证书自动续签
description: 用 Claude 解决 CDN 域名 HTTPS 证书自动续签问题，一条命令搞定阿里云 CDN 证书部署，省下每年 2000 块。
tag:
  - Agent
  - 实战
category:
  - AI
author: 沉默王二
date: 2026-04-12
---

大家好，我是二哥呀。

今天早上，技术群里有小伙伴在喊：二哥，技术派和面渣逆袭的图片全挂了。

![](https://cdn.paicoding.com/stutymore/sucai-20260412121747.png)

当时我不在电脑前，没办法及时处理。

于是另一个群也有小伙伴在问怎么回事。

![](https://cdn.paicoding.com/stutymore/sucai-20260412121951.png)

通过大家的描述，我就知道——CDN 的 HTTPS 证书过期了。

说一下背景。我有两个网站，一个是 javabetter.cn（二哥的 Java 进阶之路），另一个是 paicoding.com（技术派）。图床用的是阿里云 OSS + CDN，访问图片需要走 HTTPS，所以 CDN 上得挂 SSL 证书。

![](https://cdn.paicoding.com/stutymore/cdn-cert-auto-renew-20260412131606.png)

但免费证书的有效期现在只有 3 个月，一年得手动更新 4 次。两个域名就是 8 次。

每次的流程是这样的：先登录腾讯云，从服务器上把证书复制出来，然后登录阿里云 CDN 控制台，把证书和密钥贴上去，再绑定到对应的域名。

>我的服务器在腾讯云上，之前在阿里云，后来阿里云服务降级就迁过去了，但 OSS 和 CDN 没动，因为迁移图片实在太麻烦——几万张图片，几十 G，光下载上传就得好几个小时

频率不高，但每次都烦，而且特别容易忘记。

赶紧打开电脑补了一下证书。

![](https://cdn.paicoding.com/stutymore/sucai-20260412122110.png)

补完之后我就想，这事能不能一劳永逸搞成自动化啊？

很早之前就像通过 Codex 的自动化来做，但总感觉不是那回事。因为 Codex 装在我本地，要操作腾讯云和阿里云的控制台，中间隔着好几层，想想就头大，一直搁浅。

![](https://cdn.paicoding.com/stutymore/sucai-20260412122335.png)

但今天实在是忍不了了，我就问了一嘴 Claude，能不能把这个需求搞成自动化。

我一开始的想法还是老路子——从腾讯云下载证书，然后通过浏览器操作阿里云控制台来更新。类似 OpenClaw 那种托管服务。

但 Claude 给了我一个超级简单的方案，简单到我不敢相信。

![](https://cdn.paicoding.com/stutymore/sucai-20260412131757.png)

打开 QoderWork 又确认了一遍，两边的意见几乎一致。看来的确是可行的。

**一条命令，证书自动上传到阿里云，自动绑定到 CDN 域名，以后续签全自动，不用再管了。**

我当场就动手跑了。还成了。


![](https://cdn.paicoding.com/paicoding/9b552fcad7b9e9a7ab0a276c2fc57364.png)


这篇内容就把整个过程分享出来，包括 acme.sh 到底是啥、ECC 和 RSA 的区别、阿里云 deploy hook 的工作原理。

如果你之前用的是阿里云的证书服务和托管服务，按照我这个方案来，一年至少能省 2000 多块。

感谢 Claude！

## 01、一条命令搞定

先说结论，核心就这么几行：

```bash
export Ali_Key="你的AccessKeyId"
export Ali_Secret="你的AccessKeySecret"
export DEPLOY_ALI_CDN_DOMAIN="cdn.tobebetterjavaer.com"

acme.sh --deploy -d tobebetterjavaer.com --ecc --deploy-hook ali_cdn
```


跑完回到阿里云 CDN 证书那里确认一下，更新成功了。

![](https://cdn.paicoding.com/stutymore/sucai-20260412123714.png)

我滴妈呀，这么简单的方案，我竟然傻乎乎地手动操作了五六年。

阿里云没在文档里提这件事。

阿里云的商业方案是这样的——一个 SSL 证书 6 个月要 1873.5 元，一个证书托管服务一年 270 元。

![](https://cdn.paicoding.com/stutymore/sucai-20260412123835.png)

![](https://cdn.paicoding.com/stutymore/sucai-20260412123940.png)

而我们这个方案，免费，也全称托管。

## 02、acme.sh 到底是什么

acme.sh 是一个纯 shell 脚本写的 ACME 协议客户端，不依赖 Python，不依赖 Go，一个 bash 就能跑。

ACME 全称 Automatic Certificate Management Environment，是 Let's Encrypt 定义的自动化证书管理协议。

说人话就是：**acme.sh 帮我们自动向 CA（证书颁发机构）申请免费的 HTTPS 证书，自动续签，还能自动部署到各种云服务上。**

它支持的 CA 不止 Let's Encrypt 一家，ZeroSSL、Buypass、Google Trust Services 都行。

我服务器上用的是 litessl.com，从 `acme.sh --list` 的输出能看到。

![](https://cdn.paicoding.com/stutymore/cdn-cert-auto-renew-20260412132151.png)

全部是 ECC 算法，全部通过 litessl 签发，全部免费。

这个工具在 GitHub 上有 41k+ Star（截至 2026-04-12），是目前最流行的免费证书管理方案，没有之一。

![](https://cdn.paicoding.com/stutymore/cdn-cert-auto-renew-20260412132434.png)

安装特简单，一行搞定：

```bash
curl https://get.acme.sh | sh
```

装完之后它会自动往 crontab 里加一条定时任务，每天凌晨检查一次证书，快到期的自动续签。这意味着装好之后基本就不用管了。

acme.sh 还有几个常用命令，顺便列一下：

```bash
# 查看所有已管理的证书
acme.sh --list

# 手动续签某个证书
acme.sh --renew -d tobebetterjavaer.com --ecc

# 强制续签（即使还没到期）
acme.sh --renew -d tobebetterjavaer.com --ecc --force

# 删除一条证书管理记录（不删磁盘文件）
acme.sh --remove -d tobebetterjavaer.com --ecc

# 查看 acme.sh 版本
acme.sh --version
```

正常情况下不需要手动续签，cron 任务会自己来。但如果刚配好 deploy hook 想立刻测一下效果，可以用 `--force` 强制跑一遍。

## 03、完整提示词和思路

分享一下我给 Claude 的提示词，大家碰到类似的自动化需求可以参考这个思路：

> 是这样，我在阿里云上有两个 CDN 的证书服务，每次都要手动去维护，我现在的流程是，服务器上自动生成 \*.tobebetterjavaer.com 的证书，我下载到本地，然后登录阿里云 cdn.console.aliyun.com 然后上传证书，再绑定到 cdn.tobebetterjavaer.com 这个域名下。我想确认一下，有没有自动化方案，可以直接在服务器上 acme.sh 生成证书后，调用阿里云的 hook 服务，完成证书的上传和域名绑定，最后确认有没有生效。

![](https://cdn.paicoding.com/stutymore/sucai-20260412122911.png)

关键是把现有流程描述清楚——我现在是怎么做的、每一步做了什么、最终目标是什么。

Claude 拿到这些信息之后，先去搜了一下 acme.sh 的 deploy hook 列表，确认了 ali_cdn 这个 hook 确实存在，然后给出了完整的方案。

![](https://cdn.paicoding.com/stutymore/cdn-cert-auto-renew-20260412132614.png)

整个过程不超过 1 分钟。

而如果我自己去 acme.sh 的 wiki 翻文档，可能半小时都找不到——因为我一开始就不知道应该搜“deploy hook”这个关键词，我脑子里的方案是“浏览器操作阿里云控制台”。

这就是和 AI 协作最值的地方：**AI 能帮我们跳出自己的思维定式，给出一条我们想不到的路。**

## 04、中间踩的坑

不过第一次跑的时候就翻车了。

Claude 一开始给的命令是：

```bash
acme.sh --deploy -d "*.tobebetterjavaer.com" --deploy-hook ali_cdn
```

结果报错：

```
The domain '*.tobebetterjavaer.com' is not a cert name.
Cannot find path: '.sh/*.tobebetterjavaer.com'
```

原因是 acme.sh 在本地存证书的时候，目录名用的是主域名，不带星号。而且如果是 ECC 算法签的（现在默认就是 ECC），目录还会带个 `_ecc` 后缀。

先看一眼本地有什么：

```bash
ls ~/.acme.sh/ | grep tobebetterjavaer
# 输出：tobebetterjavaer.com_ecc
```

果然，目录名是 `tobebetterjavaer.com_ecc`，不是 `*.tobebetterjavaer.com`。

再用 `acme.sh --list` 确认一下证书信息：

```
Main_Domain           KeyLength  SAN_Domains
tobebetterjavaer.com  "ec-256"   *.tobebetterjavaer.com
```

Main_Domain 是 `tobebetterjavaer.com`，SAN 里面包含 `*.tobebetterjavaer.com`，说明这是一张通配符证书，覆盖所有子域名。

所以正确的命令应该是：

```bash
acme.sh --deploy -d tobebetterjavaer.com --ecc --deploy-hook ali_cdn
```

两个关键点：`-d` 后面跟的是主域名不带星号，`--ecc` 告诉 acme.sh 去找 `_ecc` 目录。

这个坑不大，但不知道的话会卡住。

我后来复盘了一下，Claude 第一次给的命令之所以不对，是因为从直觉上讲，通配符证书就应该用 `*.xxx.com` 来引用——毕竟我们申请的时候填的就是这个。但 acme.sh 的内部存储逻辑和我们的直觉不一样，它用的是主域名 + 后缀的方式来组织目录。

这种“看起来该对但就是不对”的问题，纯靠自己 debug 其实也能解决，但 Claude 在看到报错之后立刻就定位了原因，还顺手教我怎么检查 ECC 和 RSA——这种效率是真的高。

![](https://cdn.paicoding.com/stutymore/cdn-cert-auto-renew-20260412132818.png)

讲真，和 Claude 协作解决这种运维问题的体验，和写代码还不太一样。写代码的时候 Claude 可以直接帮你写，但运维问题得你自己去服务器上跑命令、看输出、贴回来。

## 04、ECC 是什么

顺便把 ECC 证书说清楚。

HTTPS 证书的核心是一对密钥——公钥和私钥。生成密钥的算法主要有两种：RSA 和 ECC。

RSA 是老牌算法，用了几十年，兼容性好，但密钥长度很长。一般要 2048 位甚至 4096 位才够安全，密钥文件大，握手的时候传输的数据也多。

ECC 全称 Elliptic Curve Cryptography，椭圆曲线加密。用更短的密钥就能达到同样的安全强度。

具体多短呢？

一个 256 位的 ECC 密钥，安全性相当于 3072 位的 RSA。密钥体积差了十几倍。

![](https://cdn.paicoding.com/stutymore/cdn-cert-auto-renew-20260412133059.png)

对 CDN 场景来说，这个差距直接反映在 TLS 握手速度上。用户第一次访问图片的时候，浏览器和 CDN 边缘节点之间要完成一次握手，交换证书和密钥。ECC 证书传输的数据量更小，握手更快，对移动端弱网环境尤其友好。

acme.sh 新版本默认就是 ECC（ec-256），这也是为什么本地目录带 `_ecc` 后缀。

从我的 `acme.sh --list` 能看到所有证书的 KeyLength 都是 `ec-256`，说明全部是 ECC。

如果需要查一张证书到底是 ECC 还是 RSA，看 conf 文件：

```bash
cat ~/.acme.sh/tobebetterjavaer.com_ecc/tobebetterjavaer.com.conf | grep Le_Keylength
# Le_Keylength='ec-256'  → ECC
# Le_Keylength='2048'    → RSA
```

`ec-` 开头就是 ECC，纯数字就是 RSA。

有的小伙伴可能会问：ECC 兼容性行不行？

2026 年了，所有主流浏览器和操作系统都支持 ECC。

另外还有个概念叫“通配符证书”，也顺便说一下。

一张 `*.tobebetterjavaer.com` 的通配符证书可以覆盖所有二级子域名——`cdn.tobebetterjavaer.com`、`api.tobebetterjavaer.com`、`www.tobebetterjavaer.com` 都行。但它不覆盖裸域名 `tobebetterjavaer.com` 本身，也不覆盖三级域名 `a.b.tobebetterjavaer.com`。

所以签证书的时候通常把裸域名和通配符一起写进去：

```bash
acme.sh --issue --dns dns_dp \
  -d tobebetterjavaer.com \
  -d '*.tobebetterjavaer.com' \
  --keylength ec-256
```

这样签出来的一张证书，裸域名和所有二级子域名全部覆盖，省事。

## 06、阿里云的 deploy hook 怎么工作

这是整个自动化里最核心的一环。

acme.sh 内置了几十种 deploy hook，覆盖了主流云服务商。`ali_cdn` 就是专门给阿里云 CDN 用的。

![](https://cdn.paicoding.com/stutymore/cdn-cert-auto-renew-20260412133147.png)

> https://github.com/acmesh-official/acme.sh/wiki/deployhooks

执行 `--deploy-hook ali_cdn` 的时候，acme.sh 做了三件事：

第一步，读取本地证书文件。acme.sh 会去 `~/.acme.sh/tobebetterjavaer.com_ecc/` 目录下找 fullchain.cer（完整证书链）和 `tobebetterjavaer.com.key`（私钥），然后调用阿里云 SSL 证书服务的 API 把证书上传上去。上传的时候会自动生成一个证书名，格式类似 `cert-cdn.tobebetterjavaer.com-6`。

第二步，调用阿里云 CDN 的 API，把刚上传的证书绑定到 `DEPLOY_ALI_CDN_DOMAIN` 指定的那个域名上。这一步会替换掉该域名当前绑定的旧证书，阿里云那边会自动把新证书分发到全网 CDN 节点。

第三步，把 Ali\*Key、Ali_Secret、DEPLOY_ALI_CDN_DOMAIN 这些变量写进证书对应的 conf 文件里，并且加上 `SAVED*`前缀（比如`SAVED_DEPLOY_ALI_CDN_DOMAIN`）。以后续签触发 hook 的时候，acme.sh 会自动从 conf 里读这些变量，不用再手动 export。

![](https://cdn.paicoding.com/stutymore/cdn-cert-auto-renew-20260412133259.png)

这三步全部在一次命令执行里完成，几秒钟搞定。

**变量是按证书分别保存的**，不是全局共享的。

`tobebetterjavaer.com_ecc` 的 conf 里存着 `cdn.tobebetterjavaer.com`，`paicoding.com_ecc` 的 conf 里存着 `cdn.paicoding.com`，两张证书续签的时候各读各的，互不干扰。

我一开始还担心第二个域名的配置会覆盖第一个，Claude 让我跑了一条命令验证：

```bash
grep SAVED_DEPLOY_ALI_CDN_DOMAIN \
  com_ecc/tobebetterjavaer.com.conf \
  paicoding.com.conf
```

两行输出，分别指向各自的 CDN 域名，清清楚楚。


![](https://cdn.paicoding.com/paicoding/5deccbdf31c5c543794f7d66dc77b6d2.png)


需要的 AccessKey 权限也很简单，就两个：`AliyunYundunCertFullAccess`（上传证书）和 `AliyunCDNFullAccess`（绑定域名）。

这里多说一句安全问题。

建议在阿里云 RAM 控制台单独创建一个子账号，只给这两个权限，不要用主账号的 AccessKey。万一服务器被入侵，子账号最多也就能操作 SSL 证书和 CDN，不会殃及其他资源。最小权限原则，该讲究还是得讲究。

另外 Ali_Key 和 Ali_Secret 第一次 export 之后就会被 acme.sh 写进 conf 文件，后续不需要再 export。所以也不用把它们写进 `.bashrc` 或者 `.zshrc`。

## 07、第二个域名也一起搞定

tobebetterjavaer.com 跑通之后，顺手把 paicoding.com 也搞了。

因为 Ali_Key 和 Ali_Secret 在上一次部署的时候已经被 acme.sh 记住了，这次只需要换一下 CDN 域名：

```bash
export DEPLOY_ALI_CDN_DOMAIN="cdn.paicoding.com"
acme.sh --deploy -d paicoding.com --ecc --deploy-hook ali_cdn
```

一样是秒过。Domain cdn.paicoding.com certificate has been deployed successfully，熟悉的成功提示。

![](https://cdn.paicoding.com/stutymore/cdn-cert-auto-renew-20260412133426.png)

两个域名的证书信息在阿里云控制台上都能看到，状态正常，有效期都刷新到了 6 月份。

顺便提一下，我在 `acme.sh --list` 里还发现了一条诡异的记录——`*.paicoding.com` 单独有一行，SAN 显示 `no`。


![](https://cdn.paicoding.com/paicoding/6f8f42c3fa56617cc0b2e8ef62d3bd40.png)


Claude 说这是之前签证书时留下的残留索引，实际上磁盘里只有一份证书（就是 `paicoding.com_ecc` 那个），这条残留可以用 `acme.sh --remove -d '*.paicoding.com' --ecc` 清理掉，不影响正常使用。

中间还发现一个有意思的细节——`cdn.paicoding.com` 显示的主域名是 `*.paicoding.com`，而 `cdn.tobebetterjavaer.com` 显示的是 `tobebetterjavaer.com`。

Claude 解释说这跟签证书时 `-d` 参数的顺序有关。

一张证书有两个地方记录域名：Subject CN（只能写一个域名）和 SAN（可以写多个）。

浏览器和 CDN 实际校验的是 SAN，但阿里云控制台展示“主域名”那一栏读的是 Subject CN。

acme.sh 签证书时，第一个 `-d` 参数会被写进 Subject CN。tobebetterjavaer.com 当时签的时候先写了裸域名再写通配符，所以 CN 是裸域名；paicoding.com 那张当时先写了通配符，所以 CN 是 `*.paicoding.com`。

![](https://cdn.paicoding.com/stutymore/cdn-cert-auto-renew-20260412133523.png)

功能上没有任何差别，纯粹是展示不同。如果有强迫症想统一，下次续签前可以删掉重签，把裸域名放到第一个 `-d`。

这种小细节，不问还真不知道。

自己翻文档可能翻半天也找不到答案，因为 Subject CN 这东西在 HTTPS 的普及教程里很少被提到，它更多是 PKI（公钥基础设施）领域的概念。但对我们这些实际操作的人来说，控制台上突然出现一个不一样的主域名，第一反应就是“是不是哪里搞错了”。Claude 这一下子把来龙去脉讲清楚，心里就踏实了。

## 08、验证和收尾

部署完不能就这么算了，得验证一下边缘节点是不是真的切到了新证书。

```bash
echo | openssl s_client -servername cdn.tobebetterjavaer.com \
  -connect cdn.tobebetterjavaer.com:443 2>/dev/null \
  | openssl x509 -noout -dates -subject
```

看 `notAfter` 是不是新证书的到期时间就行。阿里云 CDN 从提交到全网节点生效一般几分钟到十几分钟，第一次查还是旧的也别慌。

![](https://cdn.paicoding.com/stutymore/cdn-cert-auto-renew-20260412151321.png)

最后确认一下续签会不会自动触发 deploy：

```bash
grep Le_DeployHook ~/.acme.sh/tobebetterjavaer.com_ecc/tobebetterjavaer.com.conf
# 输出：Le_DeployHook='ali_cdn'
```

能看到 `ali_cdn` 就说明已经挂上了。以后 acme.sh 的 cron 每天检查证书，快到期自动续签，续签成功自动把新证书推到阿里云并绑定——全程无人值守。

从此告别“三个月手动更新一次”的噩梦。

最后总结一下整个自动化方案的完整流程：

![](https://cdn.paicoding.com/stutymore/cdn-cert-auto-renew-20260412151713.png)

从头到尾，零人工干预。

如果有小伙伴的情况和我类似——服务器在一家云、CDN 在另一家云、证书是用 acme.sh 管理的——完全可以照搬这套方案。

acme.sh 除了 `ali_cdn`，还内置了很多 deploy hook，比如 `ali_dcdn`（阿里云全站加速）、`tencent_cdn`（腾讯云 CDN）、`cloudflare`、`aws_s3` 等等。原理都一样：配好 AccessKey，指定域名，一条 `--deploy` 命令搞定。

如果是纯腾讯云的环境（服务器和 CDN 都在腾讯云），用 `tencent_cdn` 这个 hook 就行，连 AccessKey 都可以复用。

## ending

一条命令，解决了困扰我五六年的问题。

不是方案多复杂，是我压根不知道 acme.sh 有 ali_cdn 这个 deploy hook。

阿里云不会告诉我。它有 SSL 证书的付费服务，一年 270，六个月的证书 1873.5。

**【最贵的成本不是钱，是不知道。而拥有一个顶级的 Agent 就是 AI 时代给予我们最大的红利】**

当你脑子里有想法的时候，当有困扰你重复劳动的事情时，不妨问问 Claude Opus，看看它能不能给你一个意想不到的解决方案。

我们下期见。
