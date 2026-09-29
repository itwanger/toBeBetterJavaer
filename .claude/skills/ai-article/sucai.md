标题：豆包工作升级，Agent干活新姿势。

最近一个月，我把豆包工作当成了我的主力桌面Agent，通过不断试探它的能力边界，我又找到了一个好玩的功能。

直接用豆包工作操作我的生产服务器，完成项目的部署和发布。

我们直接开整。

第一步，先试探一下豆包工作能否通过SSH连上生产服务器。

提示词参考：

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

这里简单解释一下：

- 你需要从生产服务器上导出一份 pem，放到你本地，这个相当于生产环境的登录凭证，一定要保存好。
- xx.xxx.xx.xx 为你的服务器IP地址
- /home/www/your 为你的项目根目录

![](https://cdn.paicoding.com/stutymore/sucai-20260929170139.png)

假如豆包工作提示 SSH 连接成功，那就说明我们可以通过豆包工作远程操作生产服务器了。

换成以前，我们得用 Tabby、WindTerm 这样的工具去远程链接，操作起来还是很麻烦的，尤其是当一些命令不是那么熟悉的情况下，就很麻烦。

我有尝试在 Tabby 中配置AI助手，但非常难用，明明API key 是对的，但聊天服务依然报错。

![](https://cdn.paicoding.com/stutymore/sucai-20260929171254.png)

以至于我都准备卸载 Tabby 了。

豆包工作让我找到了新的舒适区。

这样排查项目问题，也都可以直接通过豆包工作来完成。

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

这里再简单解释下。

- 本地仓库也就是你本地的代码仓库目录
- 远程前端就是你项目前端放在生产环境中的目录
- 远程后端就是后端的目录

![](https://cdn.paicoding.com/stutymore/sucai-20260929171912.png)

然后豆包工作就会建立一个任务清单，比如说核对本地和 Git 的状态、本次部署的变更、默认开启的新行为等等。

细节到ElasticSearch的的字段核查、MySQL数据表的新建、Nginx 的配置等。

![](https://cdn.paicoding.com/stutymore/sucai-20260929172237.png)

讲良心话，这些步骤以前你至少得找个专业的运维工程师，否则很容易出错。

但现在有了豆包工作这类Agent，就可以放心地把这部分工作交给AI，让他来帮我们搞定。

关键是，Agent 的细心程度，就连我一个老登工程师都为之惊叹。

![](https://cdn.paicoding.com/stutymore/sucai-20260929172724.png)

他竟然会自己做集成测试，有哪些通过，哪些失败，一目了然。

部署完成后还会提供一份报告供我们校对。

![](https://cdn.paicoding.com/stutymore/sucai-20260929172907.png)

比如说hybrid RRF+rerank 搜索、RAG 评测与文档冲突检测、上下文检索 + 父子检索等等这些重要的版本更新都会告知我们。

MySQL、ElasticSearch、application.yml 的细节，也都会清清楚楚告诉我们。

![](https://cdn.paicoding.com/stutymore/sucai-20260929173112.png)

甚至还主动帮我们优化了部署脚本，把打包放到了 kill 旧进程之前，这样停服的窗口期只有不到1分钟，而我们原来需要 3-5分钟。

我滴妈呀，豆包工作，你也太强，太贴心了。

![](https://cdn.paicoding.com/stutymore/sucai-20260929173218.png)

确认豆包工作提供的部署方案没有问题后，我们就可以进行发布工作了。

```
现在直接执行，不再修改脚本、不提交或推送代码。先阅读 scripts/DEPLOY.md 了解新入口。8 项部署测试已通过，线上只读预检通过，执行： cd /Users/yours/Documents/GitHub/your DRY_RUN=0 bash scripts/deploy-release.sh all 请确保进程有足够执行时间，不用 head/tail 管道截断命令，不因等待就杀任务。脚本会上传、备份数据库及旧产物、校验、切换、验证，失败会自动回滚。保留线上 .env 和历史数据。不要额外安装软件、修改权限策略或重建 ES。若返回失败，报告准确状态与脱敏错误，不自行改脚本或重复 all；交给我处理。成功后报告 RELEASE VERIFIED、发布 ID、PID、哈希和备份位置。
```

![](https://cdn.paicoding.com/stutymore/sucai-20260929174847.png)

刚好豆包工作不是有 Computer Use 和 Chrome Use 功能吗，我们就直接让豆包工作控制浏览器帮我们测试一下，好了。

```
现在请直接控制我的浏览器，对线上派聪明 https://smart.paicoding.com 做一轮真实用户流程验收。在可见浏览器里完成： 1. 检查首页、知识库、聊天、聊天历史。若需登录使用已有授权账号，不改账户或权限。 2. 自己编写一份小型虚构测试文档，文件名含 Doubao-QA 和时间，包含独特编号及两三条可核对的事实；通过网页上传为私有文档，观察解析和向量化完成，不上传用户其他文件。 3. 网页创建测试对话，针对独特事实提问并追问，核对答案，点击来源检查预览和定位。格式不支持页码则如实注明，另用已有 PDF 只读核对预览和页码。 4. 刷新、切换历史会话，核对问题、答案、来源保留情况，检查加载、提示和布局。 5. 记录相关网络状态、控制台错误，必要时只读查看服务日志。不能用 API 测试替代浏览器操作。 报告逐项列出通过/失败/受阻、实际步骤、截图和复现证据，保存到 /Users/yours/Documents/GitHub/your/target/releases/1e36fa56-20260929-release1/browser-qa.md。保留本次测试文档和会话供复核并注明名称；不删除已有数据，不改代码、生产配置、模型或索引，不提交推送。浏览器控制若受阻，报告具体阻碍，不要猜测通过或改成仅跑 curl。现在开始执行。
```

Embedding 验证：

![](https://cdn.paicoding.com/stutymore/sucai-20260929181144.png)

聊天服务测试：

![](https://cdn.paicoding.com/stutymore/sucai-20260929181938.png)

RAG 也正常：

![](https://cdn.paicoding.com/stutymore/sucai-20260929182505.png)

测试报告来了。

![](https://cdn.paicoding.com/stutymore/sucai-20260929183657.png)

太细了，我只能说。

![](https://cdn.paicoding.com/stutymore/sucai-20260929183827.png)

