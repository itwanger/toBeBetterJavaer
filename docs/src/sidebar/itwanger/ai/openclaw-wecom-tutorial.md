---
title: OpenClaw 接入企业微信，十分钟跑通，不需要公网 IP
shortTitle: OpenClaw 接入企业微信
description: OpenClaw 接入企业微信完整教程，从创建智能机器人到配对上线，再到群通知和会议日程两个实战场景，手把手带你跑通全流程。
tag:
  - OpenClaw
  - 企业微信
category:
  - AI
author: 沉默王二
date: 2026-03-10
---

大家好，我是二哥呀。

企业微信里突然收到一条通知，说官方插件支持 OpenClaw 了，3 步就能快速接入。

我就知道，企业微信终于坐不住了。

![](https://cdn.paicoding.com/stutymore/sucai-89ce56d929f99d2a490be5402c210265.jpg)

OpenClaw 这波热度都烧到鹅厂的大门口了——腾讯云下场，排队装龙虾——然而不管是企业微信、QQ 还是微信，在接入 OpenClaw 上，都显得不够开放。

这下好了，3 步接入，那企业微信真的可以用一用。

看来企微也很有进去心嘛——新上线的长连接方案，**不需要公网 IP，不需要回调 URL**，本地跑的 OpenClaw 就能直接连上企微。

之前写了 OpenClaw 接飞书的保姆级教程，评论区点赞最多的一条留言就是：“二哥，企微呢？我们公司用的是企微，不是飞书。”

好好好，今天安排上。

> 系好安全带，我们出发。

## 01、前置准备

开始之前，确保你已经具备以下条件：

**OpenClaw 已安装并正常运行。** 如果你还没装，可以先看看我的龙虾橙皮书，里面有完整的安装流程。

```bash
https://paicoding.com/column/15/1
```

![](https://cdn.paicoding.com/paicoding/224be18c906ab253a48a79564f889556.jpg)


装完之后执行 `openclaw status`，确认 Gateway 在跑就行。


![](https://cdn.paicoding.com/paicoding/596ec2a252628fd27bc3e3262364eedc.jpg)


**企业微信客户端已更新到最新版。** 这一点很容易被忽略，老版本客户端里找不到「智能机器人」入口。

![](https://cdn.paicoding.com/paicoding/27ff8c08bf9d31a763ac8c49039d6cb8.png)


**你是企微的管理员（或至少有创建应用的权限）。** 普通成员没有权限创建智能机器人。如果你不是管理员，找你们公司的 IT 同事帮忙开一下权限。

准备好了？开干。

## 02、创建企微智能机器人

这是整个流程的第一步，也是最关键的一步——在企微里创建一个「智能机器人」，拿到 Bot ID 和 Secret。

### 进入智能机器人管理

打开企业微信客户端，找到【工作台】。


![](https://cdn.paicoding.com/paicoding/390eea53d80e31c52ce41eac92be558d.png)


找到【智能机器人】（如果没找到，说明你的企微版本太旧，或者管理员没开启这个功能）。

点进去，你会看到一个机器人管理页面。

![](https://cdn.paicoding.com/paicoding/7f43dcfbd61efe91986ace45849456a7.png)

### 选择 API 模式创建

点击【创建机器人】，这时候会弹出创建方式的选择。

重点来了：**选择「API 模式创建」**，不要选普通模式。这个入口有点隐蔽，我第一次都直接忽略过去了，所以这里敲一下黑板黑板黑板。

![](https://cdn.paicoding.com/paicoding/1853c7d3b88c306518a5f1cbbcf69667.png)


普通模式创建的是 Webhook 类型的机器人，只能接收消息，不能主动交互。API 模式才是 OpenClaw 需要的。

### 选择长连接方式

在连接方式这一步，**选择「长连接」**。


![](https://cdn.paicoding.com/paicoding/c7578db92fcbbf3def84504558702888.png)


这是企微最近新上线的能力，也是本篇教程的核心。

长连接的好处是：你的 OpenClaw 不需要暴露公网 IP，不需要配置回调 URL，不需要折腾 Nginx 反向代理。OpenClaw 会主动和企微服务器建立一条持久的 WebSocket 连接，消息直接通过这条连接收发。

对于本地部署的用户来说，这简直是福音——你的电脑在家里跑着 OpenClaw，不用做内网穿透，企微消息一样能送到。

### 复制 Bot ID 和 Secret

创建完成后，页面上会显示两个关键信息：

- **Bot ID**：机器人的唯一标识
- **Secret**：机器人的密钥

**把这两个值复制下来，保存好。** 后面 OpenClaw 配置要用。

注意：Secret 只会在创建时显示一次，如果忘记复制，只能重新生成。

![](https://cdn.paicoding.com/paicoding/5f27f77256a45a43b6af8513e1551f23.png)

点击保存后，在通讯录可以看到刚刚创建好的机器人。


![](https://cdn.paicoding.com/paicoding/2283f6f6780c4cba79a143623ded7fff.png)



## 03、OpenClaw 端配置

企微那边搞定了，现在回到 OpenClaw 这边。

### 安装企微插件

OpenClaw 通过插件机制来对接不同的 IM 工具。接企微需要安装官方的企微插件。

打开终端，执行：

```bash
openclaw plugins install @wecom/wecom-openclaw-plugin
```


![](https://cdn.paicoding.com/paicoding/ec2628b04ae3833d0e35f90c70548814.png)


安装速度取决于你的网络环境，一般几十秒就搞定了。

如果你的网络环境访问 npm 比较慢，可以先设一下镜像源：

```bash
npm config set registry https://registry.npmmirror.com
```

然后再装插件。

### 重启 Gateway

插件装完之后，需要重启一下 Gateway 让它加载新插件：

```bash
openclaw gateway
```

![](https://cdn.paicoding.com/paicoding/1ec609e85f0de6c20d63b66e2537bdf1.png)

如果之前 Gateway 已经在跑了，先停再启：

```bash
openclaw gateway stop && openclaw gateway
```

不出意外，这里应该能看到刚刚安装的企微插件。

![](https://cdn.paicoding.com/paicoding/db5a0823490251fdf91b5266a0591f8a.jpg)


### 添加企微通道

接下来，用 `openclaw channels add` 命令把企微通道加进来：

```bash
openclaw channels add
```


![](https://cdn.paicoding.com/paicoding/b484e21ba4b46d8e864bdf1d5d3fdc97.png)





执行后会弹出交互式菜单，选择 **「企业微信（WeCom）」**。

![](https://cdn.paicoding.com/paicoding/6336fe2e358fe110c17f794c3c8193ac.png)

然后按提示依次粘贴刚才复制的 **Bot ID** 和 **Secret**。


![](https://cdn.paicoding.com/paicoding/3505fd64fa8dcbe748808e8e86c4755e.png)


## 04、配对验证

配置好之后，还需要做一次配对验证，确保 OpenClaw 和企微机器人之间的连接没问题。


![](https://cdn.paicoding.com/paicoding/a7dfa6321b65b37d2be6388b9262474e.png)


### 发送测试消息

在企微里找到你刚创建的智能机器人（可以在工作台-智能机器人里找到，也可以直接在聊天里搜索机器人名称）。

给它发一条消息：

> 你好

机器人会回复一条包含**配对码**的消息。


![](https://cdn.paicoding.com/paicoding/ee5e4cbde3dfd5997fd2ee3c354b22b1.png)


### 完成配对

回到终端，执行配对命令：

```bash
openclaw pairing approve wecom [你的配对码]
```

把机器人回复的配对码替换进去。


![](https://cdn.paicoding.com/paicoding/3df454a9346144f6cdda8b831d9b327b.png)


配对成功后，再回到企微，给机器人发一条消息：

> 你好，介绍一下你自己。

如果机器人正常回复了自我介绍，恭喜你，企微接入成功了。

![](https://cdn.paicoding.com/paicoding/ff6bb12c5b44766f2edfc9fe6d18990f.png)

注意，这里接入的是default的Agent，我之前已经给他配置了身份，就是审核gitcode账号。那其实我可以让default Agent干别的事情，然后再添加一个 Agent去专门审核gitcode账号，这个其实我之前讲过了方法。

内容已经收录到我的龙虾橙皮书：`https://paicoding.com/column/15/3`

![](https://cdn.paicoding.com/paicoding/1d994611f5d9aa4e194dce51015d387a.jpg)

整个过程总结一下，就四步：

1. 企微后台创建智能机器人（API 模式 + 长连接），拿到 Bot ID 和 Secret
2. OpenClaw 安装企微插件
3. `openclaw channels add` 填入 Bot ID 和 Secret
4. 发消息拿配对码，`openclaw pairing approve` 完成配对

如果你之前跑通过飞书版本的接入，这个流程应该分分钟搞定。

## 05、常见问题排查

企微接入虽然简单，但还是有几个坑容易踩到。

### 问题一：找不到「智能机器人」入口

**原因**：企微客户端版本太旧，或者管理员没有开启智能机器人功能。

**解决**：
- 先更新企微客户端到最新版本
- 如果更新后还是没有，让公司管理员在企微管理后台 → 安全与管理 → 管理工具里开启「智能机器人」

### 问题二：插件安装失败

**原因**：npm 网络问题，国内访问 npm 官方源会比较慢。

**解决**：

```bash
npm config set registry https://registry.npmmirror.com
openclaw plugins install @wecom/wecom-openclaw-plugin
```

### 问题三：配对码过期

**原因**：配对码有时效性，生成后太久没用就过期了。

**解决**：在企微里重新给机器人发一条消息，拿一个新的配对码，再执行 `openclaw pairing approve`。

### 问题四：消息能发出去但收不到回复

**原因**：Gateway 没有正常运行，或者大模型 API Key 配置有问题。

**解决**：

```bash
# 检查 Gateway 状态
openclaw gateway status

# 查看日志排查
openclaw logs
```

确认 Gateway 显示 `running`，然后检查日志里有没有 API 调用错误。

## 06、企微场景实战

接入成功了，光聊天没意思。OpenClaw 接企微的真正价值，是和企微的办公能力结合起来用。

我试了两个实际场景。

### 场景一：群助手

你可以把机器人拉进内部群，然后@他，让他回答你的问题。

![](https://cdn.paicoding.com/paicoding/fc822f490051c5b64bb4d4dcf297549f.png)

但是我更想把他拉进外部群里，因为除了企业内部成员外，对于我这种技术博主来说，更多需要服务的是企业外部的微信用户。

但目前这个开放程度还远远不够。

我最想要的需求是：

>派聪明，帮我给19个技术交流群发个通知，PaiFlow项目上架了，地址是：https://paicoding.com/column/13/1

>群里谁谁谁发了问题，暂时还没有得到回复，派聪明主动给出回复。

### 场景二：一句话插入智能表格

这个场景在企微生态里特别实用。

你直接告诉机器人：

> 帮我插入一条数据。


![](https://cdn.paicoding.com/paicoding/f21ddb6fc54f2e320b35c58d506bbd54.png)


OpenClaw 会通过企微的智能表格接口，自动插入这条数据。

![](https://cdn.paicoding.com/paicoding/b2823c2e9f2d3dfb235c1d46b379eb01.png)


需要先在智能表格中点击【接收外部数据】。


![](https://cdn.paicoding.com/paicoding/7b51f48e6795c6bd7eec734f50788adb.png)

把 webhook 地址和示例数据告诉 Agent。


![](https://cdn.paicoding.com/paicoding/10cf8a0c06faaa7c01c7d7fb0f5f0eef.png)

![](https://cdn.paicoding.com/paicoding/a4aa8fa746ec4409856a7ec7678b2ec1.png)

当然了，企微也可以做到飞书一样的功能，帮我审核gitcode账号，审核技术派账号。

>打开 paicoding.com/admin 我帮你登录，然后进入星球白名单页面，找到 xxxx 这个星球编号，点击未通过。


![](https://cdn.paicoding.com/paicoding/d9230d3d74e092600a2516e523c57ac4.png)




## ending

写完飞书的教程，又写了企微的教程，我有一个很直观的感受：

AI Agent 接入 IM 工具这件事，正在变得越来越简单。

半年前你想让 AI 接进企微，得自己写一个 Node.js 服务，处理消息加解密，配置公网域名和 SSL 证书，整个流程下来没个一两天搞不定。

现在呢？装个插件，填两个 Key，发条消息配个对，十分钟搞定。

企微官方愿意去做长连接方案，去掉公网 IP 和回调 URL 的要求，说明他们也意识到了：**门槛越低，用的人才越多。**

这和 OpenClaw 的理念是一样的——你不需要懂后端、不需要懂运维、不需要懂消息队列，你只需要会说人话就行。

告诉它你想干什么，它就去干。

【**工具在变简单，但你要先迈出第一步。**】

有问题评论区见。


