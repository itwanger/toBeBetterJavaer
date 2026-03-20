---
title: IDEA + Codex = 王炸，这波我真的热血沸腾，Java 的 AI Coding 终于来了。
shortTitle: IDEA接入Codex实测
description: JetBrains官方宣布Codex集成到IDEs，我第一时间上手实测，从安装插件到一键启动ElasticSearch、Kafka、MinIO，体验Java后端的AI Coding新时代。
tag:
  - Codex
  - IDEA
  - AI Coding
category:
  - AI
author: 沉默王二
date: 2026-03-19
---
大家好，我是二哥呀。

昨天给大家演示了如何在 Qoder 中使用 Experts Mode 开启多 Agent 协作编码的模式，很多小伙伴惊都叹于 AI 编程的进步。

但 VSCode 这类工具的一个短板就是，它没办法配置 JDK，没办法配置 Maven。导致如果你的电脑上装了多个版本的 JDK，Java 类的项目经常启动不起来。

相信很多小伙伴都会遇到这类问题。

![](https://cdn.paicoding.com/stutymore/sucai-20260319103908.png)

尤其是碰到企业级的 Java 后端项目，有多个模块，VSCode 这类 AI Coding 工具就显得力不从心。

你想想，一个典型的微服务项目，（十）几个模块，每个模块可能有不同的依赖版本，Maven 配置一改，整个项目就跑不起来。

那作为 Java 市场占有率 70%的 IDE（他们官方自己说的，不是我吹），IntelliJ IDEA 自然也不愿意错过 AI 这波浪潮。

我在官网上看到他们明确说可以接入 Codex 进行编码了。

PS：已经接入了的小伙伴，你们继续嗨继续舞，恭喜你们。真的，有了 Codex 的 IntelliJ IDEA 可以说爽的飞起啊！

![](https://cdn.paicoding.com/stutymore/sucai-20260319101505.png)

巨大的横幅就摆在官网首页，说明他们对 AI 能力很重视。要知道，JetBrains 可是出了名的稳重，能在官网首页放这么大一个横幅，说明他们对这次集成是下了决心的。

可以使用 API 密钥接入，也可以直接通过 ChatGPT 账号接入。

![](https://cdn.paicoding.com/stutymore/sucai-20260319101414.png)

我就很心动了，因为我特么订阅了 ChatGPT Plus，一个月 200 刀啊。

如果能在 IntelliJ IDEA 中直接使用，我真的是笑嘻嘻。这相当于把我的 ChatGPT Plus 订阅价值最大化了，不用再单独开一个 IntelliJ IDEA 的 AI 订阅。

那说干就干，咱们直接动手。我会把踩过的坑全部都给大家亮出来。

>系好安全带，咱们出发。

## 01、安装 Codex 插件

打开 IDE 右上角的 JetBrains AI 小部件，点击“开始使用”，如果之前没有安装 AI Assistant 插件，需要先安装。

![](https://cdn.paicoding.com/paicoding/0d7661a74dd2bd99082c4741e5a6c493.png)

如果已经安装，就可以直接将 Codex 作为 JetBrains AI 订阅的一部分使用。

有两种接入方式：第一种是使用现有 ChatGPT 账户登录，不会扣 Assistant 的额度（我试了一下，没看到扣）；第二种是 Bring Your Own Key（BYOK），也就是使用你的 OpenAI API 密钥连接至 Codex。

官方是这样讲的：

> Codex Agent 现可通过 JetBrains AI 免费使用，包括免费试用版或免费层级版本，此优惠活动时间有限。促销活动自 1 月 22 日开始，将持续至你分配的促销额度用完为止。

这个促销力度还是挺大的，即使你没有订阅 ChatGPT Plus，也能免费试用一段时间。

好，我们进入实操。点击 AI 聊天的小图标，开启首次对话。在左下角可以看到【聊天】的图标，点开他，不出意外，你能看到 Codex 的图标。

![](https://cdn.paicoding.com/stutymore/sucai-20260319095452.png)

首次使用 Codex 需要先安装 Codex 插件。

![](https://cdn.paicoding.com/stutymore/sucai-20260319095838.png)

我这里安装失败了很多次，重试了很多次，才有点进度。应该提供一个本地安装包的方式，但我没有找到入口。

![](https://cdn.paicoding.com/stutymore/sucai-20260319100525.png)

等了好久，终于算是安装成功了！

![](https://cdn.paicoding.com/stutymore/sucai-20260319101634.png)

我们直接通过账号授权的方式登录。

![](https://cdn.paicoding.com/stutymore/sucai-20260319101731.png)

登录完成后，就可以看到最新的 GPT-5.4 模型。

![](https://cdn.paicoding.com/stutymore/sucai-20260319101823.png)

输入提示词，看看能不能工作（如果不能工作，请在评论区留言，我会尽力解答）。

![](https://cdn.paicoding.com/stutymore/sucai-20260319103208.png)

OK，如果有收到 Codex 的回复，说明我们的 Codex 已经可以在 IntelliJ IDEA 中使用了。

给自己鼓个掌吧，激动人心的时刻来了。

IntelliJ IDEA + Codex，Java 后端代码的 AI Coding 时代来了。

再也不用在黑乎乎的命令行，不用单独在 Codex APP，不用在 VSCode 这种重前端轻后端的工具中折磨了。

开心。

## 02、为什么能连 Codex

这主要是因为 IntelliJ IDEA 搞了一个 ACP 的东西。


![](https://cdn.paicoding.com/paicoding/e6231aebb57ac92e8e9cef1b97ce9b05.png)


Agent Client Protocol，翻译过来就是智能体客户端协议。这是 JetBrains 和 Zed 合作推出的一个开放标准，目的是让任何 Coding Agent 都能在任何 IDE 中运行。

打个比方，JDBC 统一了数据库访问接口，让 Java 程序可以连接 MySQL、Oracle、PostgreSQL 等各种数据库。

ACP 干的事情差不多，它统一了 Agent 和 IDE 之间的通信接口，让 Claude Code、Codex、Cursor 这些 Agent 都能接入到支持 ACP 协议的 IDE 中。

以前你想用 Claude Code，就得在终端里跑；想用 Codex，就得开一个单独的应用。现在有了 ACP，这些 Agent 都能直接嵌入到你熟悉的 IDE 里，像原生功能一样使用。

目前支持 ACP 协议的 IDE 有 JetBrains 全家桶（IntelliJ IDEA、PyCharm、WebStorm 等）和 Zed 编辑器。支持 ACP 协议的 Agent 有 Claude Code、Codex、Qoder 等。

![](https://cdn.paicoding.com/paicoding/70a5d66f0635393ad5f0f81f1502e665.jpg)

有了 ACP，以后不管哪个 Agent 火了，只要它支持 ACP 协议，就能直接接入到你熟悉的 IDE 中，不用再折腾各种插件和配置了。

这才是开放标准该有的样子。

## 03、IDEA 实战 Codex

刚好我有一个派聪明 RAG 的项目，启动前需要先启动 ElasticSearch、Kafka 和 MinIO，之前我都是在终端一个一个启动的，现在我就想让 Codex 帮我写个脚本，一键启动这三个服务。

这个需求很典型，很多 Java 后端项目都有类似的前置依赖。以前我们要么手动一个一个启动，要么自己写脚本，写脚本又得考虑各种边界情况，比如端口冲突、进程检测、日志输出等等。现在交给 Codex 来干，看看它能做到什么程度。

> 提示词：我现在有这样一个事情，我想写个脚本，放在 PaiSmart 项目中，一键就能启动 MinIO、ElasticSearch、Kafka 这些前置工具，我会告诉你他们在哪里，我启动他们的命令。

![](https://cdn.paicoding.com/stutymore/sucai-20260319103649.png)

Codex 会先读一下项目结构，确认脚本适合放的位置和启动方法。这一点很关键，它不是上来就写代码，而是先了解上下文。这就像一个有经验的程序员，接到需求后不会马上动手，而是先搞清楚项目结构、代码风格、已有的工具链。

然后我们就可以按照他要求的格式，把 MinIO、ElasticSearch、Kafka 的启动命令和路径都告诉他。

```
MinIO 路径：Downloads/minio1 启动命令：./minio server data/
Kafka 路径：Downloads/kafka/kafka_2.13-3.9.0 启动命令：./start-kafka.sh
ElasticSearch 路径：Downloads/elasticsearch-8.10.0 启动命令：ES_JAVA_HOME=$JAVA_HOME ES_JAVA_OPTS="-Xms500M -Xmx500M" ./bin/elasticsearch
```

好，Codex 准备帮我们创建 infra.sh 脚本了。

![](https://cdn.paicoding.com/stutymore/sucai-20260319105836.png)

给执行权限。

![](https://cdn.paicoding.com/stutymore/sucai-20260319105917.png)

![](https://cdn.paicoding.com/stutymore/sucai-20260319105934.png)

甚至还帮我们校验过了，太棒了。这个校验步骤很重要，它不是写完脚本就完事了，而是会检查语法、路径是否正确，避免运行时报错。

![](https://cdn.paicoding.com/stutymore/sucai-20260319110023.png)

还会提醒我们添加到 Git，贴心。这个细节说明 Codex 理解软件开发的完整流程，不仅仅是写代码，还包括版本控制。

直接让 Codex 帮我们验证，启动这三个前置服务，然后检查状态和首屏日志，确认有没有路径、权限或环境变量问题。

![](https://cdn.paicoding.com/stutymore/sucai-20260319110200.png)

非沙箱执行的权限我们也放给他。

这下三个服务都启动起来，Codex 还会确认到底有没有启动起来，去主动检查日志，避免刚启动起来就挂掉。

![](https://cdn.paicoding.com/stutymore/sucai-20260319110326.png)

遇到错误会自己修复。

![](https://cdn.paicoding.com/stutymore/sucai-20260319110509.png)

搞定。

三个服务在启动阶段都给出了成功迹象。

![](https://cdn.paicoding.com/stutymore/sucai-20260319110552.png)

任何不完美的细节，Codex 都不会放过。我们只需要放权，让他自己干活就行了。

![](https://cdn.paicoding.com/stutymore/sucai-20260319110833.png)

这种编程的效率可是大飞升啊。以前写这样一个脚本，至少得半小时，现在几句话就搞定了。而且 Codex 还会考虑各种边界情况，比我自己写的还完善。

好，我们直接启动一个终端，执行这个脚本，看看能不能成功。

![](https://cdn.paicoding.com/stutymore/sucai-20260319111119.png)

都没问题，我们再直接在 PaiSmart 点击启动后端。

![](https://cdn.paicoding.com/stutymore/sucai-20260319111214.png)

完美，后端也启动了。

再启动前端。

![](https://cdn.paicoding.com/stutymore/sucai-20260319111309.png)

首页出现了。

![](https://cdn.paicoding.com/stutymore/sucai-20260319111336.png)

没问题。

![](https://cdn.paicoding.com/stutymore/sucai-20260319111412.png)

到此为止，我们在 IntelliJ IDEA 中 Codex 第一次探索之旅也就可以圆满结束了。

任务很简单，但却是一次新的体验，这就预示着我们以后可以在 IntelliJ IDEA 中用 Codex 完成更多有挑战的任务了。

## 04、ACP 协议的核心能力

说回 ACP 协议，因为我觉得搞懂他真的很重要。

后面我也想开发一个桌面应用程序，到时候也通过 ACP 协议接入 Agent 能力，供大家学习。

ACP 协议的设计非常精巧，它定义了一套标准化的通信接口，让 Agent 和 IDE 之间能够高效协作。

协议的核心能力包括以下几个方面：

第一是文件操作能力。Agent 可以读取、创建、修改、删除项目中的文件，这是最基础也是最重要的能力。通过这个能力，Agent 才能真正帮你写代码、改代码。

第二是终端执行能力。Agent 可以在 IDE 的终端中执行命令，比如运行测试、启动服务、安装依赖等。这一点在前面演示的启动脚本案例中体现得很明显，Codex 不仅写了脚本，还直接执行了它。

第三是代码上下文理解能力。Agent 可以获取当前文件的代码、光标位置、选中的代码片段等信息，从而提供更精准的代码建议和修改。这比简单的文件读写要智能得多，因为 Agent 知道你在看什么、在改什么。

第四是用户交互能力。Agent 可以向用户提问、请求权限、展示进度，用户也可以随时中断 Agent 的执行。这种人机协作的模式，让 AI 编程变得更加可控和安全。


![](https://cdn.paicoding.com/paicoding/960138320e4c614af2e993e602371439.jpg)


### ACP vs LSP

可能有些小伙伴会问，ACP 和 LSP（Language Server Protocol）有什么区别？

LSP 是微软推出的协议，主要解决的是代码补全、跳转、诊断等编辑器功能的问题。它让不同的 IDE 都能享受到相同的语言服务，比如 VSCode 和 IntelliJ IDEA 都可以用同一个 Python 语言服务器。

ACP 解决的是另一个层面的问题，它让不同的 AI Agent 都能接入到同一个 IDE 中。LSP 关注的是“编辑器如何理解代码”，ACP 关注的是“AI 如何帮你写代码”。

两者是互补的关系，不是竞争的关系。一个完善的 AI 编程环境，既需要 LSP 来提供代码理解能力，也需要 ACP 来提供 AI 协作能力。


## 05、ending

IDEA 接入 Codex，对 Java 后端开发者来说，真的是一个重大利好。

我们终于不用在 VSCode 里折腾 JDK 版本了，不用为 Maven 配置发愁了，不用看着前端友好的界面干瞪眼了。

IntelliJ IDEA 才是 Java 后端的主场。

Codex 的加入，让这个主场如虎添翼。


![](https://cdn.paicoding.com/paicoding/84b8eb58eb8176462b24395c7b726a17.png)


写脚本、配环境、改代码、修 bug，这些曾经耗费我们大量精力的琐事，现在可以放心交给 Codex 去处理。我们只需要把注意力放在架构设计、业务逻辑、技术选型这些真正需要思考的地方。

【**AI 就应该这样，把我们从重复劳动中解放出来，让我们有时间去思考更有价值的问题，去创造更有意义的东西**。】

如果你还没有尝试过 IDEA 中的 Codex，现在就可以动手了。记得确保你的 IDE 是 2025.3 或更新的版本，然后按照我前面讲的步骤一步步来。

遇到问题别慌，多试几次，或者来评论区找我。

我们下期见！

