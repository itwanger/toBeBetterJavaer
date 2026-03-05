---
title: OpenClaw 安装教程，全网最详细手把手教你接入飞书！
shortTitle: OpenClaw 飞书接入教程
description: 一份超详细的 OpenClaw 安装指南，从本地部署到飞书机器人接入，手把手教你打造 7×24 小时在线的 AI 助手
tag:
  - OpenClaw
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-02-24
---

大家好，我是二哥呀。

OpenClaw 火有一个多月了吧，甚至各大服务器厂商都纷纷下海卷了一吧，主打一个 Mac mini 你不用买，买一台云服务器就好。

并且多次强调，不要在你本地电脑部署，权限太大，容易把你本地的东西 `rm -rf` 了，但说实话这里面有极大的商业利益。😄

安装 OpenClaw 本身没有任何难度，Mac 版本的安装包都有了。

![](https://cdn.paicoding.com/paicoding/037694bfedad718bca96d2721f57cc36.png)

但信息差这东西永远都存在，哪怕是 AI 这么卷的情况下，仍然有不少小伙伴在本地装不起来 OpenClaw。

我甚至收到好几位读者的私信，要我出个保姆级教程，说他们公司，老板年后开工突然就要求在本地装个龙虾，以便每个人能发挥出最大的生产力。

![](https://cdn.paicoding.com/paicoding/944c66cbc08fac54239a82b77f41a662.png)

OpenClaw 本质上类似 Claude Code，但 CC 在名字上吃了大亏，不了解的小伙伴以为 CC 只面对程序员群体，但其实 CC 能干的活非常多，只要权限够大，脑洞够大。

OpenClaw 本质上也是一个 CC。让它爆火的原因是，它虽然工作在你本地电脑或者云服务器上，但可以通过 IM 工具，比如说飞书、钉钉进行远程管理。

你在飞书群里发一条消息，它就能帮你整理文档、抓取网页、生成代码、处理 Excel，甚至还能定时提醒你该摸鱼了。

![](https://cdn.paicoding.com/paicoding/af2ab68d1dd05d25dcdd6270a6a5919c.png)

不了解的小伙伴会以为部署这玩意儿特别麻烦，但其实核心步骤就那么几步。

真正卡住大家前进脚步的，是环境配置和飞书权限这些细节。

今天这篇，我把踩过的坑都帮你填平，跟着做就行了。真的有手就行，手摸手那种。

## 01、OpenClaw 到底是个啥？

先搞清楚我们要装的是什么东西。

OpenClaw 是一个开源的 AI 代理平台，核心能力就一句话：用自然语言驱动工具完成任务。

![](https://cdn.paicoding.com/paicoding/d847d3b7ea67cb6bd197dc788ad83b8d.jpg)

它不是那种只会回答问题的聊天机器人，而是真正能动手的 Agent。

读写文件、执行命令、操控浏览器、处理邮件，这些它都能干。

更重要的是，它支持通过飞书、钉钉、企业微信、QQ 这些 IM 工具来控制。

![](https://cdn.paicoding.com/paicoding/dcdf937bac558a7ff835097b9d93e78e.png)

你在飞书里说帮我整理一下今天的待办事项，它就会乖乖去执行。

OpenClaw 本身不具备独立的大语言模型推理能力，需要对接大模型才能听懂指令。

支持的大模型很多，阿里云百炼、智谱 GLM、OpenAI、Anthropic 都可以。

## 02、前置环境准备

开始之前，先把该装的装好，免得中途报错一脸懵逼。

### Node.js 升级到 22 以上

这是硬性要求，低于 22 版本会报错。

macOS 用户可以直接用 Homebrew：

```bash
brew install node@22
```

或者 warp 直接升级“node 升级到 22 版本”。

![](https://cdn.paicoding.com/paicoding/bc500447bdf583f93be3185b7e067251.png)

装完后验证一下：

```bash
node -v
```

显示 `v22.x.x` 就没问题。

![](https://cdn.paicoding.com/paicoding/c014f82f4908f447c6da7f3e51363f53.png)

Windows 用户建议用 WSL2，在 Linux 环境里装会更顺畅。直接在 Windows 原生环境安装可能会遇到各种兼容性问题。

### 准备大模型的 API Key

我这里以智谱 GLM 为例，因为我是他们家的 coding plan 套餐用户（非利益关系，纯粹是 OpenClaw 烧 token 太快，只有 plan 套餐才能顶得住）。

![](https://cdn.paicoding.com/paicoding/124994c429b13082fcffff90ed510fe9.png)

max 包真特喵的贵！

有需要的小伙伴建议先买个 lite 版本的，一个月 49 块钱试试。我把我的邀请链接贴一下，你下单能省 10%费用，我也能返 10%的血条。

> 链接：https://www.bigmodel.cn/glm-coding?ic=STBFQ0PXIN

购买后访问智谱开放平台，登录后在 API Keys 页面创建一个 Key，复制保存好。

![](https://cdn.paicoding.com/paicoding/f69e68dba5a566a4a1fd51e9f9d91849.jpg)

后面要用。

## 03、安装 OpenClaw

环境准备好后，开始正式安装。

### macOS 用户

打开终端，执行一键安装脚本：

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

![](https://cdn.paicoding.com/paicoding/122a4ac1028744398bb1cb2abee36fc0.png)

这个脚本会自动检测系统环境，安装 Node.js 和所有依赖，基本不用你操心。

我第一次执行似乎卡死到了这里，提示 `npm install failed`。

![](https://cdn.paicoding.com/paicoding/b61faf4e3dc07c732ccea4215901e105.png)

我就直接 ctrl-c 结束重新起了一个终端窗口开始执行。

这次执行成功了。

![](https://cdn.paicoding.com/paicoding/2e252486ce49598c0154d3b95af25426.png)

然后就可以看到龙虾成功安装后的界面了。

![](https://cdn.paicoding.com/paicoding/210c27f919c1c99619371c57897784d6.png)

这里有一个安全提示，可以直接跳过。选择 yes 后进入启动配置向导。

![](https://cdn.paicoding.com/paicoding/0a9a44f5c5a7467a9629e6a2a2d04a3f.png)

当然也可以后期配置。

网关类型这里选择 local 本地就行。然后是 AI 模型认证，把你准备好的 API Key 填进去。

![](https://cdn.paicoding.com/paicoding/0a4fbe34d53703da9da3a7d8937deb16.png)

我这里选择 Z.AI 就是智谱。这里选择国内的 plan 套餐。

![](https://cdn.paicoding.com/paicoding/704b5b1ce0bda8de8bf0b7a35c025417.png)

填入 API Key 后，模型保持最新的 GLM-5 就可以了。

![](https://cdn.paicoding.com/paicoding/52e0bf66e66bb97668f46462d0b1db01.png)

接下来进入 IM 的配置，这里选择飞书。

![](https://cdn.paicoding.com/paicoding/a0ddbcaff41b0d5c2e2242bf2724a783.png)

此时会下载飞书插件。

![](https://cdn.paicoding.com/paicoding/23082e82977be33d87af02376921eae4.png)

接下来会提示我们接入飞书的配置信息。

![](https://cdn.paicoding.com/paicoding/6b99126b6928629205dee1ff97973f81.jpg)

好，进入飞书开发平台 `https://open.feishu.cn/document/home/index`，可以过一眼基本的流程文档。

![](https://cdn.paicoding.com/paicoding/8a166ab6b5a1eb58f84ec9e89cd3e4b1.jpg)

不想看的话，可以直接跳过，进入飞书开放平台。

> https://open.feishu.cn/app?lang=zh-CN

创建一个应用，名字就暂时教 PaiFlow 吧。

![](https://cdn.paicoding.com/paicoding/9114d70c7caba1e36b8fdcab43ce5185.png)

然后我们需要给应用添加一些能力。

![](https://cdn.paicoding.com/paicoding/5386ed6c1573a18e65f2c44242e432b4.jpg)

我们就先添加一个机器人的能力吧。

![](https://cdn.paicoding.com/paicoding/83f25993fd24e949ba16bfa84ddf9063.jpg)

回到凭证管理这里，能看到 APP Id 和 APP secret。

![](https://cdn.paicoding.com/paicoding/4740b443fe6626e44fdfe43c874a0dd0.png)

复制粘贴到 OpenClaw 的配置中。

![](https://cdn.paicoding.com/paicoding/f604818a8d1043076769449138f562e9.png)

接下来会有一个群组访问策略的配置，其中 open 就是允许群组所有人访问，建议选择这个。

![](https://cdn.paicoding.com/paicoding/2b69345161026260e73454f80f071ae5.png)

我第一次选择了 allowlist，然后不知道接下来配置啥了，就重新跑了一遍，好方便给大家截图说明用。

![](https://cdn.paicoding.com/paicoding/283f0a9ded26ad40fa94e932fe9b1cbb.png)

接下来是 Skills 的安装，和 ClawHub 是打通的，后续也可以安装。

![](https://cdn.paicoding.com/paicoding/7e6b2e3960370dedb45c87146363b89c.jpg)

我这里看着选了几个，安装速度还是挺慢的，如果没有特别适合自己的 Skills，其实可以跳过的。

![](https://cdn.paicoding.com/paicoding/c35df43b207e5e3ee95e279d9f848057.jpg)

接下来选择 Skills 的安装方式。默认 npm 就行。

![](https://cdn.paicoding.com/paicoding/13fddb246c951d16e4d51bf14fda4c50.png)

接下来是 API key 的绑定，我这里通通跳过。

![](https://cdn.paicoding.com/paicoding/ed8716e74d53caae516501e0318210af.png)

接下来是 hooks 的安装，OpenClaw 目前附带了 3 个自动发现的捆绑 hooks，其中 session-memory 用于当你发出 `/new` 时将会话上下文保存到智能体工作区；command-logger 将所有命令事件记录到 commands.log 中；boot-md 当 Gateway 网关启动时运行 BOOT.md。

![](https://cdn.paicoding.com/paicoding/045310fb8d27c8c48bbcf5e0e6bf2eec.png)

接下来是 Gateway 的安装，我之前安装过，为了演示，这里大家可以选择 reinstall。

![](https://cdn.paicoding.com/paicoding/c769bf0f7f31c22ad579cafc1097f572.png)

接着是打开 Web 窗口。可以选择 TUI 模式。

![](https://cdn.paicoding.com/paicoding/8c2ad43dcb1e7c51d350e41f2fc847fc.png)

到这一步，OpenClaw 就算是安装成功了。

![](https://cdn.paicoding.com/paicoding/8ca01f3da8d92c2cecf4a90475a4e1e6.png)

### 手动安装

如果一键脚本有问题，也可以手动安装：

```bash
npm install -g @openclaw/cli
```

### 启动配置向导

安装完成后，执行配置向导：

```bash
openclaw onboard
```

这个命令会引导你完成核心配置。

## 04、启动 OpenClaw 服务

配置完成后，启动核心服务：

```bash
openclaw gateway start
```

这个命令会启动 OpenClaw 的网关服务，默认监听 18789 端口。

检查服务状态：

```bash
openclaw gateway status
```

如果显示 `running`，说明服务正常启动。

![](https://cdn.paicoding.com/paicoding/1fe78ab9dba96c20b5c39148e22a8e87.png)

### 验证安装成功

浏览器访问 `http://127.0.0.1:18789/`，如果能打开 OpenClaw 的 Web 控制面板，说明本地部署成功了。

![](https://cdn.paicoding.com/paicoding/e129abec66d885559e59cb36ab0ced1c.jpg)

在控制面板里发一条测试消息，比如“你好，介绍一下你自己”，如果能收到正常回复，就说明大模型也配置对了。

![](https://cdn.paicoding.com/paicoding/791f7df432c5fe77fda7da206c3ab940.jpg)

## 05、创建飞书应用

当然了，如果你不想在启动的时候配置飞书，也可以在 OpenClaw 安装成功后接入飞书。

### 第一步：进入飞书开放平台

访问飞书开放平台，用飞书账号登录。点击创建企业自建应用，填写应用名称和描述。应用类型选企业自建应用就行。

### 第二步：获取凭证

应用创建成功后，在凭证与基础信息页面，你能看到：

- **App ID：**应用的唯一标识
- **App Secret：**应用的密钥

把这两个值复制保存好，后面配置要用（前面演示过了）。

### 第三步：添加机器人能力

在应用的应用功能页面，点击添加应用能力，选择机器人。开通后，这个应用就能以机器人的身份出现在飞书群里了。

### 第四步：配置权限

在权限管理页面，开通以下权限：

- `im:message`：获取与发送单聊、群聊消息
- `im:message:send_as_bot`：以应用身份发消息
- `im:chat`：获取群组信息
- `im:chat:readonly`：读取群组信息

这些权限是 OpenClaw 接收和发送消息的基础。或者直接选择批量导入按钮，把 OpenClaw 官方推荐的权限全部接入进去。

![](https://cdn.paicoding.com/paicoding/fd3afd492d02756e40a5cf7548e56bdd.jpg)

### 第五步：配置事件订阅

在事件订阅页面，开启事件订阅。

![](https://cdn.paicoding.com/paicoding/26fdc24e8c98961ca471bfd17456e3d6.png)

直接选择长链接，当你的 OpenClaw 启动后，这里就可以保存成功。

添加事件 `im.message.receive_v1`：接收消息

这样当有人在飞书群里@机器人时，飞书会把消息推送到 OpenClaw。

![](https://cdn.paicoding.com/paicoding/6cc7730475e9ea27b7d259e66f81c412.png)

### 第六步：发布应用

配置完成后，在版本管理与发布页面，创建一个版本并提交审核。

![](https://cdn.paicoding.com/paicoding/6a4cd245f9f3d1018ec1735f994ecd49.png)

审核通过后（免审，比腾讯的 QQ 和企业微信方便），应用就可以在企业内使用了。

![](https://cdn.paicoding.com/paicoding/3632065c4042f24ef878f06785cbb25d.png)

## 06、在 OpenClaw 中配置飞书通道

在飞书里打开应用，然后@它发一条消息：

> 你好。

![](https://cdn.paicoding.com/paicoding/861523231db63c8ee88fc1e842eb50ae.png)

首次会提示你要配对，直接把这条消息发送到 OpenClaw 聊天窗口。

![](https://cdn.paicoding.com/paicoding/9d4f19897e0e84824c5dd866c9a5f035.png)

配对完成后，再回到飞书这里，随便发送一条信息，就完成通信了。

![](https://cdn.paicoding.com/paicoding/f807354d0468ea6a24c512384715908e.jpg)

## 07、常见问题排查

接入过程中可能会遇到一些问题，这里把最常见的情况列出来。

### 问题一：飞书响应很慢

可以把问题直接发给 OpenClaw，其中模型的问题我们没办法解决，但飞书权限的问题可以。

![](https://cdn.paicoding.com/paicoding/958b748db07445be00857ff505c68053.png)

直接在飞书这里添加通讯录基本信息的只读权限。

![](https://cdn.paicoding.com/paicoding/0165a7a4ad1f8273a0c07e7a44e82942.png)

随后我感觉确实快了一些。

![](https://cdn.paicoding.com/paicoding/4b360a6edd44c6ff79e4593a8865a004.png)

### 问题二：OpenClaw 服务启动失败

可能原因：

- Node.js 版本低于 22
- 端口被其他进程占用
- API Key 配置错误

解决方案：

```bash
node -v

# 检查端口占用
lsof -i:18789

# 查看服务日志
openclaw logs
```

![](https://cdn.paicoding.com/paicoding/ab0d8df7029fe0c06da466bf02263ed1.png)

### 问题三：模型调用失败

可能原因：

- API Key 无效或额度用尽
- 网络无法访问大模型服务

解决方案：

- 重新检查 API Key 是否正确
- 登录大模型平台确认额度是否充足
- 尝试用 curl 命令直接测试 API 是否可达

## 08、飞书应用场景推荐

OpenClaw 接入飞书后，能干的事情就多了。

给大家分享几个我觉得比较实用的场景。

### 场景一：群消息同步

比如说 PaiFlow 发布了，我们可以在飞书群里新增一个机器人。

![](https://cdn.paicoding.com/paicoding/51bef754e452c8d2aa3a2b2f98a67538.png)

复制 webhook 地址，发给 OpenClaw。

![](https://cdn.paicoding.com/paicoding/67069591123a2d05285a2e15cedf1b8c.png)

配置成功。

![](https://cdn.paicoding.com/paicoding/348ef19505d3923488bac021cfbfb3ef.png)

然后告诉大家 PaiFlow Agent 项目发布了。

![](https://cdn.paicoding.com/paicoding/25402980a0f3f35e83261f332d4de178.png)

可以工作。

![](https://cdn.paicoding.com/paicoding/e678686e63f7f458e04bbe88b7500b2a.png)

方便得很。

### 场景二：面试题每日一推

每天定时从题库中抽取一道面试题推送到群，附答案解析。

![](https://cdn.paicoding.com/paicoding/df15b154d00cecb859628a5d3ab67cb2.png)

我没有告诉 OpenClaw 从哪里获取面渣逆袭，也没告诉它什么形式，但出来的效果我很喜欢。

![](https://cdn.paicoding.com/paicoding/69adbabcba28c153a900a6f093b6e044.jpg)

并且文末的来源点击过去，真的就是二哥的 Java 进阶之路，非常 nice。

![](https://cdn.paicoding.com/paicoding/6b784a6e4fd5c206de9c8d4943e84d0f.jpg)

对于准备面试的小伙伴，这个功能相当于每天帮你复习一个知识点。

## 09、ending

以前我们用 ChatGPT，问它一个问题，它给你一段文字。

现在用 OpenClaw，你让它干一件事，它真的会去干。

读写文件、执行命令、操控浏览器，这些原本需要人手动操作的事情，AI 都能代劳了。

接入飞书之后，它更是变成了一个随时待命的数字员工。

你在群里@它一下，它就屁颠屁颠地跑来帮你干活。

这种体验，和打开一个网页版聊天框完全不一样。

【**当 AI 从回答问题变成解决问题，我们离真正的效率革命就更近了一步**。】

如果你也想体验这种指挥 AI 干活的感觉，跟着这篇教程走一遍就行。

很多小伙伴在等，等AI更成熟，等有人教，等公司培训。但我想告诉大家的是，努力先走出去第一步，你的认知、你的生产力也许就会发生翻天覆地的变化。

