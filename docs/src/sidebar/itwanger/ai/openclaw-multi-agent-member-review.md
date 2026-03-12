---
title: 我的龙虾二号上岗了：1 个 OpenClaw 养多个 Agent（保姆级教程）
shortTitle: OpenClaw 接 GPT-5.4 + 多 Agent
description: OpenClaw 升级 GPT-5.4 全流程教程，再创建第二个 Agent 专门对接飞书审核技术派会员申请，手把手带你从单 Agent 走向多 Agent 工作流
tag:
  - OpenClaw
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-03-08
---

大家好，我是二哥呀。

这一周，一直在高强度玩 OpenClaw，希望从更多的场景应用中，让他帮助我解放双爪，哦不，双手。

我的第一个场景是把 OpenClaw 接入了飞书，让 PaiFlow Agent 帮我搞定 gitcode 账号的审核。目前这个场景已经跑的很丝滑。

既然一只龙虾能跑这么顺利，能不能再整一个专门用来审核技术派的龙虾，也就是我的龙虾二号，名字暂定为 paicoding 吧。

按理说龙虾一号PaiFlow也能兼顾这个活，但我还是想探索OpenClaw的多Agent工作模式，这样后面就可以更好的拓展其他应用场景。

内容很肝，跟着做，你也可以拥有属于自己的多只龙虾员工。这恐怕也是全网最详细，最手把手教的多Agent的教程。

龙虾现在真的是深入人心，我昨天说每天要改很多份简历，人头皮发麻，评论区很多小伙伴出谋划策，就希望引入小龙虾来帮我解放双手。

![](https://cdn.paicoding.com/paicoding/7e75dd4b65b2f73b5716a8240351deac.png)

但目前的龙虾还很难做到这个层面，需要继续发展，但未来我相信肯定是可以的。

先上路。

## 01、我的第二只龙虾员工

可能很多小伙伴问，OpenClaw 支不支持多 Agent？

答案显然是：**支持的，而且配置没有那么复杂。**

就算你是非程序员，按照我的步骤和方法也一定能够搞定。

OpenClaw 的多 Agent 核心逻辑是：每个 Agent 有自己独立的工作区（workspace），有自己独立的配置文件，通过 `bindings` 字段绑定到不同的 IM 通道上。

![](https://cdn.paicoding.com/paicoding/271c9ab0e9a611a21ef602a460835b48.png)

你可以理解成：

```
飞书应用 A → Agent A（PaiFlow，gitcode账号审核助理）
飞书应用 B → Agent B（paicoding，技术派会员审核助理）
```

这两个 Agent 同时运行，同一个 OpenClaw Gateway 管理，但各自响应自己负责的飞书群消息，互不干扰。

```
用户申请加入 → 飞书应用 B 发送消息 → Agent B（paicoding）处理 → 审核通知飞书
```

好，搞清楚底层的逻辑后。现在动手，创建专门做技术派会员审核的第二个 Agent 吧。

### 第一步：创建新 Agent 工作区

下面这条命令会在指定目录创建一个新的工作区，包含独立的配置文件和会话记忆。

```bash
openclaw agents add paicoding --workspace ~/openclaw-workspaces/paicoding
```

`paicoding` 是这个 Agent 的名字，你可以改成任何你喜欢的名字。

![](https://cdn.paicoding.com/paicoding/646580525725fa9b764f48d767942929.jpg)

配置完成后，可以通过 `openclaw agents list` 查看多个Agent。

![](https://cdn.paicoding.com/paicoding/f814102dfb024e636259fd37f5a010eb.jpg)

这里可以看到，我现在有两个Agent了，一个是默认的main，目前我是让他来审核gitcode账号，但其实可以让main干其他的事情，专门再创建一个PaiFlow来管理gitcode账号审核。

但目前main的应用场景我还没有想到，就暂时先交给他这个任务吧。

注意，配置多Agent后，龙虾的配置文件中，agents 节点的 list 节点就会多出来对应的Agent，包括他的工作区和名字。

![](https://cdn.paicoding.com/paicoding/e7a22186927b48171544fabb1ce1ab5a.png)

当然id是不能重复的。

### 第二步：在飞书开放平台创建第二个应用

这步和之前创建 PaiFlow 飞书应用的流程一样，进入飞书开放平台：

> https://open.feishu.cn/app?lang=zh-CN

创建一个新的企业自建应用，名字就叫 **技术派** 吧，和 Agent 保持一致，方便管理。

![](https://cdn.paicoding.com/paicoding/22324285ead293e902c3fe4c5fd2196a.png)

然后是添加机器人能力，在权限管理页面，点击批量导入按钮。

![](https://cdn.paicoding.com/paicoding/75d854d54d4923f645b2a7f736320638.png)

粘贴以下 JSON 配置一键导入所需权限（这是龙虾官网推荐的配置）：

```json
{
  "scopes": {
    "tenant": [
      "aily:file:read",
      "aily:file:write",
      "application:application.app_message_stats.overview:readonly",
      "application:application:self_manage",
      "application:bot.menu:write",
      "cardkit:card:write",
      "contact:user.employee_id:readonly",
      "corehr:file:download",
      "docs:document.content:read",
      "event:ip_list",
      "im:chat",
      "im:chat.access_event.bot_p2p_chat:read",
      "im:chat.members:bot_access",
      "im:message",
      "im:message.group_at_msg:readonly",
      "im:message.group_msg",
      "im:message.p2p_msg:readonly",
      "im:message:readonly",
      "im:message:send_as_bot",
      "im:resource",
      "sheets:spreadsheet",
      "wiki:wiki:readonly"
    ],
    "user": ["aily:file:read", "aily:file:write", "im:chat.access_event.bot_p2p_chat:read"]
  }
}
```

确认开通后，就可以看到对应的权限。

![](https://cdn.paicoding.com/paicoding/7701012fae75e99894d445f6d625b05c.jpg)

然后在【凭证与基础信息】这里复制好 App ID 和 App Secret，备用。

### 第三步：配置 bindings，把 paicoding 绑到新飞书应用

打开 OpenClaw 的配置文件，一般路径在 `~/.openclaw/openclaw.json`（也可以通过 `openclaw configure` 进入后找路径）。

![](https://cdn.paicoding.com/paicoding/1e4e20ecc31975affd3c5d33afdbaef5.png)

退出的话，按 ESC 键就可以了。

用VSCode打开配置文件，找到 `bindings` 字段，加上 paicoding 的绑定规则：

```json
"bindings": [
    {
      "agentId": "main",
      "match": {
        "channel": "feishu",
        "accountId": "main"
      }
    },
    {
      "agentId": "paicoding",
      "match": {
        "channel": "feishu",
        "accountId": "paicoding"
      }
    }
  ],
```

当然，如果你是第一次配置多Agent，这里可能为空，直接把我这个复制过去，改吧改吧就行了。

- agentId 就是每个 Agent 特有的名字，比如说main、paicoding 等。
- match 表示 Agent 和哪个频道关联，比如说 main 和飞书的main 关联，paicoding和飞书的paicoding关联。

很好理解。

换句话说，`main` 是我们之前配置 PaiFlow 飞书应用的 App ID，`paicoding` 是我们刚刚配置 paicoding 飞书应用的 App ID。

![](https://cdn.paicoding.com/paicoding/ce890e66bcd0c75ada2641ac46f6d729.png)

这样 OpenClaw 的 Gateway 在收到飞书消息时，会根据来源的 App ID 把消息路由到对应的 Agent，完全隔离。

同时，在频道的节点中，需要按照下面这个规则添加第二个飞书应用。

![](https://cdn.paicoding.com/paicoding/ab5732d1434046ded35087429c4a06ba.png)

- defaultAccount 表示出站路由的默认账号 ID，其实在我们目前的场景下，并不需要，因为我们已经指定了不同的飞书应用关联不同的Agent。
- accounts 表示我们有多个飞书应用，默认一个的情况下是没有这个配置的。
- paicoding 就是我们龙虾二号了。
- appId和appSecret就是飞书应用的配置关键信息。
- botName就是我们为Agent的命名。
- groupPolicy 表示我们是开放的权限，别人拿到我们的应用配置信息也是能够链接的。
- connectionMode 指连接的模式，目前是WebSocket。
- dmPolicy 为 pairing 表示配对模式。
- encryptKey 为配对密钥。

![](https://cdn.paicoding.com/paicoding/a44720fed2794b47628f680225ad2d27.jpg)

### 第四步：重启 Gateway

配置改完之后，重启一下 Gateway 让新配置生效：

```bash
openclaw gateway stop && openclaw gateway start
```

![](https://cdn.paicoding.com/paicoding/6d899ad9c3f37e555d1712aa9ef4bef2.png)

### 第五步：给飞书订阅方式修改为长连接，并加上 `im.message.receive_v1` 事件。

回到飞书，这时候我们需要添加事件与回调，配置方式选择长连接。

![](https://cdn.paicoding.com/paicoding/e5a9150d991751ee413d9a1876c13546.jpg)

这一步，其实就是飞书在和你的龙虾通信，飞书优秀的一点就在于这里，不需要审核，你只要能连通，你就可以用。不用等。

不然还要官方审核，那真的效率可太低了。

当然了，如果你这一步无法生效，没办法保存。可以重新执行一次 `openclaw channels add`。通过OpenClaw提供的引导模式，配置一遍飞书频道。

![](https://cdn.paicoding.com/paicoding/1edbe52c10b18d54ac0ccb1c57fe3d35.png)

填入新应用的appid、APP密钥，然后指定连接到哪一个Agent等等。

![](https://cdn.paicoding.com/paicoding/a1b8d81b9376ec0cae43319419bef62e.png)

然后再次重启 Gateway。

一般情况下，这一步就可以工作了。

如果没办法工作的小伙伴，可以评论区留言。

回到飞书，配置订阅方式为长连接，并添加 `im.message.receive_v1` 事件。

![](https://cdn.paicoding.com/paicoding/e5bdaf2ad8cac48d0973e5ee682f74ac.png)

### 第六步，验证龙虾二号

打开飞书应用paicoding，然后随便输入一句话，这时候一般会回来一个配对密钥。

![](https://cdn.paicoding.com/paicoding/c8de02b654732bdbb1334b98e30749a0.png)

再次打开OpenClaw的配置文件，可以执行 `code ~/.openclaw/openclaw.json` 用VSCode打开。

![](https://cdn.paicoding.com/paicoding/273735e75688d8094c6c4a821c6bb7ca.png)

保存。

重启Gateway。

在飞书频道里问一句，OK了吗？

![](https://cdn.paicoding.com/paicoding/844fbac1167bc956531aed0ba9e0966a.png)

这里应该就可以看到龙虾二号开始工作了。

龙虾一号也在工作。

![](https://cdn.paicoding.com/paicoding/9604712b6b6e8d4a69c65f8a71640651.png)

到此为止，可以给我们自己鼓个掌了，一切都进展的很顺利，如果你在这个过程中遇到任何问题，都可以评论区告诉我，我会竭尽所能，帮你开启龙虾二号。

## 02、教会龙虾二号员工干活

Agent 创建好了，接下来要让 paicoding 真正懂得怎么审核会员申请。

这里用 OpenClaw 的 ContextEngine 插件，让它在每次会话开始前加载审核规则。

进入 PaiReview 的工作区：

```bash
cd ~/openclaw-workspaces/paicoding
```

创建一个 `BOOT.md`，这是 OpenClaw 在 Agent 启动时自动加载的上下文文档：

```markdown
你是技术派（paicoding.com）的专属会员审核助手，名叫 paicoding。

## 你的职责

当有新用户申请开通技术派教程时，你需要：

1. 接收申请信息（星球编号）
2. 去 paicoding.com/admin 登录admin账户和密码，如果已经登录就不需要再登录了，然后进入星球白名单页面，在试用中的列表中，对照星球编号，然后审核通过。
3. 然后告诉我审核通知，格式如下：

---
【新会员申请】
星球编号：xxx
通过
---

## 审核参考维度

- 星球编号是否匹配

## 注意事项

如果有任何疑问，请直接告诉我。
```

规定定义好后，我们直接问一下技术派 Agent，看看他是否能读到这份文件。

![](https://cdn.paicoding.com/paicoding/077edd829f8037a412f6f95abc8fa54f.png)

很好，技术派看到了，并告诉我们现在可以发一个星球编号过去。

![](https://cdn.paicoding.com/paicoding/2e60c6e1bb6fcb83f287de6572e82bfe.png)

这时候，技术派 Agent 会打开一个浏览器，打开技术派的admin审核页，然后我们填入用户名和密码后，他就会自动打开星球白名单页面，然后查询星球编号，然后审核通过。

![](https://cdn.paicoding.com/paicoding/bf8c42c5216e6ee952bf671153293291.png)


到此为止，我们的龙虾二号员工就算是正式上岗干活了。

非常的nice。

PaiFlow 负责gitcode账号的审核，paicoding 负责技术派会员的审核，两个飞书应用各管各的。

一个 OpenClaw 进程，同时跑两个 Agent，没有冲突，资源占用也不高。

这种多 Agent 的架构，是 OpenClaw 对比其他 AI 工具的一个很大优势——不是一个聊天框，而是真正可以按业务场景拆分的 AI 工作流。

舒服啊。

查看当前运行的所有 Agent：

```bash
openclaw agents list
```

两个都显示 `running` 就对了。

![](https://cdn.paicoding.com/paicoding/6c6b2ef143890ef6b85ee1843ca0f002.jpg)

## 03、常见问题

**问：两个 Agent 会不会收到对方飞书应用的消息？**

不会。bindings 里通过 `appId` 做了隔离，消息路由严格按 App ID 分发。

**问：paicoding 能不能自动操作技术派后台完成审核？**

完全可以，通过 OpenClaw 的 Browser 工具（操控浏览器），让它自动登录技术派后台、点击通过按钮。这个权限比较大，我没有把admin用户的密码告诉他，只是我帮他登录，他来干活。

**问：两个 Agent 共用同一个大模型吗？**

默认共用 Gateway 配置的模型，但也可以在每个 Agent 的工作区单独配置，实现不同 Agent 用不同模型的效果。比如 paicoding 用 GLM-5 省成本，PaiFlow 用 GPT-5.4 追效果。

**问：GPT-5.4 需要什么条件才能用？**

目前OpenClaw官方还没有发正式版，但有分支已经实现了，也不着急这一时半会，等官方更新就行了，也许我文章发布的那一刻，就有了。

![](https://cdn.paicoding.com/paicoding/20e4435d22b18f32952da201dd9cb5d9.png)

再升级也不迟，我目前用的是GPT-5.3-Codex，效果确实很快。

## ending

我想起一件事。

2023 年刚开始用 ChatGPT 的时候，觉得能打字聊天就已经很神奇了。

今年，在飞书里@一个 Agent，它帮我把会员审核直接操控浏览器通过

也没用多少时间。

不是因为技术突然爆炸，而是因为很多事情终于都串起来了——大模型成熟了，工具链跟上了，你只需要花几个小时配置一遍，就能让一个数字助手替你处理曾经要手动盯着的事情。

说真的，技术派会员审核这件事，我每周可能要处理几十条申请，之前一直觉得也还好，也就几分钟。但等 paicoding 跑通之后，才发现那几分钟其实是一种习惯性的内耗——一件重复的事情，每次都要停下来，切换注意力，判断，回复。

积少成多，一年下来，这种切换耗掉的时间和精力远不止几分钟那么简单。

【**能自动化的事，就别让自己一直盯着。省出来的注意力，才是真正稀缺的东西**。】

多 Agent 这个方向我还会继续探索，后面打算把GitHub仓库中的issue接进来，让龙虾直接修改代码，然后测试，提交，😄

这周打算把派聪明RAG也上线。

![](https://cdn.paicoding.com/paicoding/cd469e7048513dc889a60026a210c24a.png)

目前整体的功能已经比第一版完善多了，新增了PDF实时预览、模型配置热加载、邀请码管理机制、用量监控等等。

等简历修改这件事过去，我就有更多时间去折腾更多有意思的事情，给大家带来更多AI的体验，更多AI的产品，更多龙虾的应用场景，帮助大家提升职场竞争力。

我们一起冲啊。

程序员就应该是这个世界，技术浪潮的弄潮儿，放心大胆地去折腾吧，你我都有一个光明的未来😄


