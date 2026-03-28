---
title: MCP+ACP，IDEA这波AI升级有点猛
shortTitle: IntelliJ IDEA AI升级测评
description: 深度测评IntelliJ IDEA 2026.1的AI Agent能力，包括MCP协议、ACP注册表、Air编排平台等，看看这位IDE老大哥如何在AI时代突围。
tag:
  - IntelliJ IDEA
  - AI Agent
category:
  - AI
author: 沉默王二
date: 2026-03-26
---

大家好，我是二哥呀。

最近一段时间，IDE 的圈子有点热闹。

Cursor、Qoder、TRAE 这些 AI IDE 轮番轰炸，搞得不少小伙伴开始为 IntelliJ IDEA 担心。甚至之前发 IntelliJ IDEA+Codex 的文章评论区，还出现了“思想还固化再 idea”的声音。

![](https://cdn.paicoding.com/paicoding/88219950e0631bb49f6214cfd1ab9741.png)

说真的，早年我从 eclipse 转到 IntelliJ IDEA 的时候很不适应，甚至一度觉得这玩意好难用，但真正高强度编程一段时间后，就爱上了 IntelliJ IDEA，没再用过eclipse（渣啊）。

截止到目前，用 IntelliJ IDEA 快十年了，感情还是很深的。

刚好 IntelliJ IDEA 2026.1 正式版更新了，我也把内置的 AI 能力彻底测了一遍。结论先说在前头：**JetBrains 正在努力把 IDE 变成一个 AI Agent 平台。**

![](https://cdn.paicoding.com/paicoding/6b92f11ed7e2735a7e17ffe6dac708b2.jpg)

这篇内容，我会从 MCP 和 ACP 这两个维度，把 IntelliJ IDEA 的 Agent 能力掰开揉碎。

看完你就知道，一个产品就是一个人，AI 时代，不仅我们人类需要痛定思痛，一个产品也需要积极拥抱。

先从 MCP 这个功能说起，我觉得这是 JetBrains 最聪明的一步棋。

![](https://cdn.paicoding.com/paicoding/ae118c8a9194d44ef9ee7c6c6908c0a6.png)

MCP，全称 Model Context Protocol，模型上下文协议。这是 Anthropic 提出的标准，目的是让 AI 模型能访问外部工具和数据源。

我们可以让 Claude Code、Codex 这些外部 AI Agent，通过 MCP 协议直接调用 IDE 的能力——调试、运行、查看变量、分析堆栈等等。

打个比方。以前我们用 Claude Code 写代码，它就是个黑盒，我们不知道具体发生了什么。

有了 MCP 之后，Claude Code 就像长了一双眼睛，可以直接看到你的 IDE 里发生了什么。

你不用再贴文件路径，也不用复制代码，直接围绕“我现在正在看的这段代码”展开。

![](https://cdn.paicoding.com/paicoding/c1c4db30657f8cd820f3d50f4bbae008.png)

> 提示词：读取我当前编辑器里的方法，解释它的调用链。

![](https://cdn.paicoding.com/paicoding/0b35facabfcee049ce1d3a31a81f8d05.jpg)

> 提示词：从当前方法往上找谁会调到这里。


![](https://cdn.paicoding.com/paicoding/d95e9255275409756d12faa7d855dfb8.jpg)

IndexController.index() 上游调用链，这是一个 HTTP 入口方法，没有代码层面的直接调用者。调用来源：URL：/、/index 或 /login。

![](https://cdn.paicoding.com/paicoding/a50b9bafb1363b3d012cdcdae4706772.png)

然后会出一个示意图给我们。


![](https://cdn.paicoding.com/paicoding/1d907efe930ebaa4e0994719a0084a3d.png)

阅读源码的时候，就会特别有用，效率拉满。

![](https://cdn.paicoding.com/paicoding/2868dfcb66f1dd1008611828799fb86a.png)

关于 IDEA MCP 的能力，我整理了一张图。


![](https://cdn.paicoding.com/paicoding/44e554a90d0ef946dc695eac3d49f31a.jpg)


这种信息获取能力，直接决定了 Agent 的上限。

![](https://cdn.paicoding.com/paicoding/e2581418ecc76fb414e06004c7ca3af8.png)

配置过程手把手说一下，跟着做就行。

**第一步：在 IDE 里开启 MCP 服务。**

打开 Settings，左侧找到 `工具` → `MCP 服务器`。

看到 `启用 MCP 服务器` 这个选项没？勾选。

IDE 会自动生成一个本地地址，类似 `http://127.0.0.1:64342/sse` 这样的格式。这个地址就是 MCP endpoint。

![](https://cdn.paicoding.com/paicoding/396eab356213e6708704c7ea1007e6ef.png)

**第二步：配置 Claude Code。**

可以点击客户端自动配置，比如说我这里勾选了 Claude Code 和 Codex（IntelliJ IDEA 帮我们自动配置）。

![](https://cdn.paicoding.com/paicoding/d4c7e6b48c16e1e284d872ef181d257d.png)

也可以手动配置，找到 Claude Code 的配置文件。位置一般在 `~/.claude/settings.json`。

用你喜欢的编辑器打开它，加上这段配置：

```json
{
  "mcpServers": {
    "intellij": {
      "url": "http://127.0.0.1:64342/sse"
    }
  }
}
```

注意把 url 换成你在第一步里看到的那个地址。保存文件，重启 Claude Code。

**第三步：验证连接。**

在 Claude Code 里输入 `/mcp`，如果看到 `idea` 这个服务状态是 `connected`，就说明配通了。

![](https://cdn.paicoding.com/paicoding/0ff555481eb1f6043677f89f51906dc9.png)

不需要折腾什么证书、鉴权之类的东西。

接通之后，神奇的事情发生了。

我在 Claude Code 里说：“能用 IDEA 测一下刚刚这两个类吗？”随后它就开始在 IntelliJ IDEA 中编译源码运行了。

![](https://cdn.paicoding.com/paicoding/39f18f0a7a9a12a8ab406733b19ec5e2.jpg)

![](https://cdn.paicoding.com/paicoding/c9b06429dc0cf1d5be8c91f5953e6cd8.png)

这个体验跟以前完全不一样。以前要测试代码，得先在 IDE 里写好测试用例，点运行，看结果，有问题再改。现在把需求扔给 Agent，它帮你把写测试、跑测试、看结果的流程全包了。

这个能力的价值在于，IDE 不再是一个孤岛。不管是 Claude Code 还是 Codex，都可以“借用” IDE 的深厚功力。

换个角度理解，以前 IDE 的杀手级能力——智能重构、语义搜索、类型推导、依赖分析，全都被锁在 IDE 的图形界面里。

我们用终端 Agent 写代码的时候，这些能力全没法用。MCP 做的事情，就是把这些能力“拆包外卖”，谁都可以点。

这一点很重要。

因为 AI Agent 的能力上限，很大程度上取决于它能调用什么工具。同样是让 Agent 帮我们改一个 bug，一个只能读写文件的 Agent 和一个能调用调试器、运行测试、查看堆栈的 Agent，给出的结果是天差地别的。

与其让别人来革自己的命，不如把自己的能力开放出去，让所有人都离不开你。

IntelliJ IDEA 有在积极改变。

接下来我要说的是 ACP，Agent Communication Protocol，这是 JetBrains 自己推出的协议，用来标准化 Agent 的安装和通信。

点开设置，找到代理，这里有一个 ACP 注册表，有点像插件市场，专门面向 AI Agent。

![](https://cdn.paicoding.com/paicoding/e42b14fa991c6ec2865f7e7bd2620107.png)

我在里面看到了 Codex、Cursor、Qoder 这些熟悉的身影。点击安装就能一键安装，不用折腾配置文件，不用研究 API 密钥。

![](https://cdn.paicoding.com/paicoding/9dba9abda9409bf77f91e6c47861fc0b.png)

Codex 之前已经带大家体验过了，这次就带大家体验一下 Qoder CLI。安装完成后，开一个新的 AI 聊天窗口，选择 qodercli，首次使用需要先登录 Qoder 账号。

![](https://cdn.paicoding.com/paicoding/08975c03f25a6e11c67131e392175fb2.png)

在这个入口里，可以直接完成对话，比如说我们问 8999 这个端口谁在占用，就可以自动执行 `lsof -i :8999` 帮我们调查。

![](https://cdn.paicoding.com/paicoding/1d2ec00894f4ff0b103f5223d774e086.png)

再比如说，我们直接让 Qoder 帮我们测试一下页面的评论区功能。

![](https://cdn.paicoding.com/paicoding/3a1280e4538ca5acb1748b527b18f29e.png)

他会帮我们自动化加载 agent-browser 这个 Skills，然后打开浏览器开始测试。

![](https://cdn.paicoding.com/paicoding/41df058d4eb0576e4fc4fc2455fdacd0.png)

翻页开始找评论了，打开回复框，然后填入了内容。

![](https://cdn.paicoding.com/paicoding/0edf0edb77ebe8b2c5a6070cd97c41fa.png)

点击评论然后提交内容了。

![](https://cdn.paicoding.com/paicoding/20fc3ab448407797df40ed3eed002e70.png)

整个测试过程，Qoder 都在 IDE 内完成，不需要切换窗口，不需要复制粘贴。这种“无感集成”的体验，比之前那种在 IDE 和浏览器之间来回切的方式，效率高太多了。

![](https://cdn.paicoding.com/paicoding/8c2a325b4ea4f1f853492d3dfddddda1.jpg)

如果你是 Java 的重度用户，日常工作都在 IntelliJ IDEA 里，那 AI Assistant 的这套组合我觉得是蛮顺手的。

这里再多说几句关于选择的问题。

现在市面上的 AI 编程工具太多了，Cursor、Qoder、TRAE、Claude Code，各有各的特色。我的建议是：不要急着 all in 某一个，而是根据自己的工作流来组合使用。

JetBrains 没有躺平，也没有故步自封。它在用一种很 JetBrains 的方式，应对 AI 时代的挑战。

不是重新造一个 AI IDE，而是把现有的 IDE 升级成 AI 平台。

【**开放，才是最大的竞争力**。】

MCP 协议让外部 Agent 可以调用 IDE 能力，ACP 注册表让安装 Agent 像装插件一样简单。

这两个能力组合起来，构成了一个完整的 AI 开发生态。

这种姿态，值得尊重。


![](https://cdn.paicoding.com/paicoding/50233bebe30e48ef4885e3bb5feca651.png)


技术从来不是零和博弈，AI IDE 也好，传统 IDE 也罢，最终服务的都是我们开发者。谁能让我们的效率更高，谁就是好工具。

IntelliJ IDEA 2026.1 的这次更新，让我看到了 JetBrains 的诚意。

毕竟，在这个快速变化的时代，开放和连接，才是生存之道。

我们下期见！


