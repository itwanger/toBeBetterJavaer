---
title: 我用豆包工作接管SSH轻松运维云服务器
shortTitle: 豆包工作SSH部署
description: 豆包工作实测，通过 SSH 登录 Linux 生产服务器，完成派聪明 RAG 项目的部署准备、正式发布、失败回滚和浏览器验收，附四轮完整提示词
keywords: 豆包工作, SSH, Linux服务器部署, AI运维, 桌面Agent
tag:
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-09-29
---

大家好，我是二哥呀。

最近一个月，我把豆包工作当成了主力桌面 Agent。一边用，一边试探它的能力边界，又找到了一个好玩的用法。

直接让豆包工作通过 SSH 登录我的 Linux 服务器，把派聪明 RAG 的新版本部署上线，并通过 Computer Use 和 Browser Use 完成发版测试。

我们直接开整。

![](https://cdn.paicoding.com/stutymore/doubao-work-ssh-deploy-20260929203329.png)

第一步，先试探一下豆包工作能不能通过 SSH 连上生产服务器。提示词如下。

```
请验证你能否通过本机 SSH 访问我的派聪明服务器。
执行下面的只读命令：
ssh -i /Users/your/Desktop/your.pem \
  -o BatchMode=yes -o ConnectTimeout=10 \
  root@xx.xxx.xx.xx \
  'hostname; whoami; cd /home/www/your && git log -1 --oneline'
密钥仅供 SSH 使用，不要读取或输出密钥内容。
本次只检查连接，不修改文件、不部署、不重启。
请展示实际命令结果；如果受权限限制，请说明具体限制。
```

这里简单解释一下几个需要替换的地方。

- your.pem 是服务器的 SSH 私钥，需要先从服务器导出一份放到本地。它相当于生产环境的登录凭证，一定要保存好
- xx.xxx.xx.xx 是服务器的 IP 地址
- /home/www/your 是项目在服务器上的根目录
- BatchMode=yes 让 SSH 在需要输入密码、或者需要确认主机指纹的时候直接报错退出。
- ConnectTimeout=10 表示 10 秒连不上就放弃。

![](https://cdn.paicoding.com/stutymore/sucai-20260929170139.png)

远程执行的三条命令是只读的。hostname 看是哪台机器，whoami 看是哪个用户，git log -1 看线上代码停在哪一次提交。

豆包工作返回了三条命令的实际结果，SSH 连接成功。这就说明，我们可以通过豆包工作远程操作生产服务器了。

换成以前，我们得用 Tabby、WindTerm 这样的终端工具去远程连接。操作起来挺麻烦的，尤其是碰到不熟悉的命令，得一边查一边敲。

我也试过在终端里配置 AI 助手，但非常难用。API Key 明明是对的，聊天服务依然报错。

![](https://cdn.paicoding.com/stutymore/sucai-20260929171254.png)

以至于我都准备卸载 Tabby 了。

豆包工作让我找到了新的舒适区。以后排查线上问题，也可以直接交给豆包工作来做啊。

SSH 通了，第二步让豆包工作把部署前的准备做完。

```
请为派聪明 RAG 更新线上版本做好部署准备。

本地仓库：/Users/your/Documents/GitHub/your
远程后端：/home/www/your
远程前端：/home/www/your-Front/dist
网站：https://smart.paicoding.com
SSH 沿用刚才验证成功的连接配置。

请先阅读本地 AGENTS.md、CLAUDE.md，以及服务器 deploy.md、launch.sh 和本地 deploy-front.sh。

完成以下准备：
1. 核对本地、远程仓库和线上运行版本，确定本次要部署的提交。
2. 检查新增配置、数据库结构和 Elasticsearch 索引兼容性。
3. 完成必要测试及前后端构建，记录构建对应的提交。
4. 准备备份、替换、启动、验收和回滚的具体命令。

保留线上 .env，不用本地配置覆盖；不要输出密码或密钥。
旧后端脚本会先停服务再编译，请调整为构建成功后再切换。
不要自动提交或推送代码。

本轮完成检查、构建和部署方案后汇报，暂不停止线上服务或替换线上文件。
```

这里再简单解释一下。

- 本地仓库是你本机电脑上的代码目录
- 远程后端是后端项目在生产服务器上的目录
- 远程前端是前端打包产物 dist 在生产服务器上的目录

这一轮豆包工作只做检查和构建。

![](https://cdn.paicoding.com/stutymore/sucai-20260929171912.png)

然后豆包工作就会建立一个任务清单，比如核对本地和 Git 的状态、梳理本次部署的变更、找出默认开启的新行为等等。

细到 Elasticsearch 的字段核查、MySQL 数据表的新建、Nginx 的配置。

![](https://cdn.paicoding.com/stutymore/sucai-20260929172237.png)

讲良心话，这些步骤以前至少得找个专业的运维工程师来做，否则很容易出错。

但现在有了豆包工作这类 Agent，就可以放心地把这部分工作交给 AI。

说实话，Agent 的细心程度，连我这个老登工程师都为之惊叹。

![](https://cdn.paicoding.com/stutymore/sucai-20260929172724.png)

它竟然会自己做集成测试，哪些通过，哪些失败，一目了然。

准备工作做完后，它还会提供一份报告供我们校对。

![](https://cdn.paicoding.com/stutymore/sucai-20260929172907.png)

比如混合检索 RRF（Reciprocal Rank Fusion，倒数排序融合）加重排、RAG 评测与文档冲突检测、上下文检索加父子检索，这些重要的版本更新都会告诉我们。

MySQL、Elasticsearch、application.yml 的改动，也都讲得清清楚楚。

![](https://cdn.paicoding.com/stutymore/sucai-20260929173112.png)

甚至还主动帮我们优化了部署脚本，把打包放到了 kill 旧进程之前。这样停服的窗口期只有不到 1 分钟，而我们原来需要 3 到 5 分钟。

我滴妈呀，豆包工作，你也太贴心了。

![](https://cdn.paicoding.com/stutymore/sucai-20260929173218.png)

确认豆包工作提供的部署方案没有问题后，就可以正式发布了。

```
现在直接执行，不再修改脚本、不提交或推送代码。
先阅读 scripts/DEPLOY.md 了解新入口。
8 项部署测试已通过，线上只读预检通过，执行：
cd /Users/yours/Documents/GitHub/your
DRY_RUN=0 bash scripts/deploy-release.sh all
请确保进程有足够执行时间，不用 head/tail 管道截断命令，不因等待就杀任务。
脚本会上传、备份数据库及旧产物、校验、切换、验证，失败会自动回滚。
保留线上 .env 和历史数据。不要额外安装软件、修改权限策略或重建 ES。
若返回失败，报告准确状态与脱敏错误，不自行改脚本或重复 all；交给我处理。
成功后报告 RELEASE VERIFIED、发布 ID、PID、哈希和备份位置。
```

提示词里提到的 8 项部署测试，是发布脚本自带的单元测试，专门验证脚本出错的时候会不会闯祸。

![](https://cdn.paicoding.com/stutymore/doubao-work-ssh-deploy-20260929204733.png)

DRY_RUN 默认是 1，只打印一份发布计划，不执行 ssh 和 scp。提示词里显式写了 DRY_RUN=0，脚本才会真正动手。

发布成功的标志是 RELEASE VERIFIED。它要求远程发布状态是成功，同时本地还要独立跑一轮校验，核对 JAR 包哈希、进程 PID、.env 有没有被改动、内网和公网接口、前端入口资源，全部对得上才算数。

任何一步出错，脚本都会自动恢复旧的 JAR 包和前端，重新启动再验收一遍。

![](https://cdn.paicoding.com/stutymore/sucai-20260929174847.png)

发布成功后还要验证页面能不能正常用，得像真实用户一样点一遍。

刚好豆包工作有 Computer Use 和 Chrome Use 功能，我们就直接让它控制浏览器，帮我们测试一下。

```
现在请直接控制我的浏览器，对线上派聪明 https://smart.paicoding.com 做一轮真实用户流程验收。在可见浏览器里完成：
1. 检查首页、知识库、聊天、聊天历史。若需登录使用已有授权账号，不改账户或权限。
2. 自己编写一份小型虚构测试文档，文件名含 Doubao-QA 和时间，包含独特编号及两三条可核对的事实；通过网页上传为私有文档，观察解析和向量化完成，不上传用户其他文件。
3. 网页创建测试对话，针对独特事实提问并追问，核对答案，点击来源检查预览和定位。格式不支持页码则如实注明，另用已有 PDF 只读核对预览和页码。
4. 刷新、切换历史会话，核对问题、答案、来源保留情况，检查加载、提示和布局。
5. 记录相关网络状态、控制台错误，必要时只读查看服务日志。不能用 API 测试替代浏览器操作。
报告逐项列出通过/失败/受阻、实际步骤、截图和复现证据，保存到 /Users/yours/Documents/GitHub/your/target/releases/1e36fa56-20260929-release1/browser-qa.md。保留本次测试文档和会话供复核并注明名称；不删除已有数据，不改代码、生产配置、模型或索引，不提交推送。浏览器控制若受阻，报告具体阻碍，不要猜测通过或改成仅跑 curl。现在开始执行。
```

豆包工作先自己编写了一份测试文档，通过网页上传，等解析和向量化完成。这一步能通过，说明 Embedding 没问题。

![](https://cdn.paicoding.com/stutymore/sucai-20260929181144.png)

接着新建对话，测试聊天服务。

![](https://cdn.paicoding.com/stutymore/sucai-20260929181938.png)

RAG 也正常。

针对测试文档里的事实提问，答案对得上，来源也能点开预览。

![](https://cdn.paicoding.com/stutymore/sucai-20260929182505.png)

所有流程有条不紊完成后，还会输出一份测试报告。

![](https://cdn.paicoding.com/stutymore/sucai-20260929183657.png)

太细了，我只能说。

![](https://cdn.paicoding.com/stutymore/sucai-20260929183827.png)

最后说说我的几个感受。

豆包工作这类桌面 Agent 的出现，正在对我们日常的工作流进行洗牌。

以前这种操作 Linux 服务器的活，得有一个专业的运维工程师，否则一个新手看着 SSH 就会懵逼的。

现在，Agent 不仅降低了开发的门槛，连部署运维的门槛也降低了。

关键是豆包工作比我们还细心。Elasticsearch 字段、数据库表结构、部署顺序、测试报告里的非阻塞问题，这些我们自己发版的时候很可能就被卡壳了。

少则一天多则一周就过去了。

**现在，二十多分钟就搞定了，关键是所有的问题都一清二楚。以后项目发版我就交给豆包工作了。**

我们下期见。
