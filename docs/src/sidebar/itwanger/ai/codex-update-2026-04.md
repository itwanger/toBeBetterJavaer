---
title: Codex 版本大更新，Computer Use 让 Agent 直接操作 IntelliJ IDEA+Chrome浏览器，真的无敌。
shortTitle: Codex Computer Use 实测
description: OpenAI Codex 重大更新实测，Computer Use 让 Agent 自己操作你的 Mac，还有内置浏览器、图像生成、记忆、自动化等六大新能力。
tag:
  - Agent
  - OpenAI
category:
  - AI
author: 沉默王二
date: 2026-04-17
---

大家好，我是二哥呀。

Claude 上了 Opus 4.7，紧接着 Codex 就更新了大版本。

这俩不愧是现在 AI 届的一哥和一姐，你追我赶，好不热闹。

Codex 这次升级，OpenAI 给起了一个霸气外漏的标题「Codex for (almost) everything」。

一口气塞进六大能力：Computer Use、内置浏览器、图像生成、90 多个新插件、Memory、自动化。

![](https://cdn.paicoding.com/paicoding/843588525e1d3584e6f2bf6d25211c15.png)

这是 OpenAI 完成 1220 亿美元融资、宣布转向 Super App 战略后，迈出去的第一步。

## 01、Computer Use

这次更新最炸裂的能力，就是 Computer Use。

我第一时间就去试了试。

简单说，Codex 现在能在你的 Mac 上自己点鼠标、按键盘、看屏幕。并且跑的是后台服务，不抢你的光标。

什么意思呢？

就是你可以控制IntelliJ IDEA，Codex也可以控制IntelliJ IDEA，你俩并不冲突，Codex 霸占你的电脑。

之前我用一个什么来着的工具去操作Chrome，他就会不停地跳出来，这会忘记叫什么了。

这个设计解决了一个大问题——你不会因为 Agent 在干活，自己就不能用电脑了。

### 开启方法

Computer Use 需要单独开启。步骤很简单，在 Codex 进入电脑使用，点安装，很快就好了。

>我一开始以为要安装一个什么大型插件包呢。

然后就可以在对话中用 Computer Use 了。

![](https://cdn.paicoding.com/paicoding/60b981c00ba70eb5865417a7fe53d57f.png)

当然，第一次打开应用，Codex 会向你请示。我们可以勾选「始终允许」让下次直接用，以后就不用反复确认了。

![](https://cdn.paicoding.com/paicoding/c60a75ac8c008e159bfe68218a8a8a0e.png)

然后 macOS 会再有一次弹窗提示。

![](https://cdn.paicoding.com/paicoding/c78263ea4119a6ae4b7d1b8dd3144e9a.jpg)

提示我们在辅助功能里把 Codex 的 Computer Use 启用。

![](https://cdn.paicoding.com/paicoding/796f975250a1d99d2060c6db9a39f6b8.png)

### 实测场景

官方文档列了几类适用场景：测试 macOS 应用、跑 iOS 模拟器的流程、用浏览器验证 web 服务、修改只能在 GUI 改的应用设置、复现只在图形界面里出现的 bug、跨多个应用跑一个流程。

**【实操环节 1】**：我这里实测的场景是，让 Codex 帮我打开 IntelliJ IDEA，我的提示词是：用 IntelliJ idea 打开我的 PaiFlow 项目。

然后 IntelliJ IDEA 就自己打开了。

![](https://cdn.paicoding.com/paicoding/6e03ba8f3f87a2e3641b3e2bd21dd3cb.png)

整体非常快。

![](https://cdn.paicoding.com/paicoding/a55bdfc52e64d2df4b9c2c98f2590482.png)

![](https://cdn.paicoding.com/paicoding/3e8694e8fdc41cc367bdfdcfc6905a3a.png)

等于说，以后可以把所有的操作都交给 Codex 了，这波开发者真的赢麻了。

有一点需要注意：第一批 Computer Use 只有 macOS 用户可以用，Windows 用户又是一次暴击 🤣。

### 和 Claude Computer Use 的区别

Anthropic 3 月的 Claude Computer Use 走的是 research preview，也跑在 macOS 上，Pro 和 Max 订阅可用。

但两家的路走的不一样：Anthropic 把 Computer Use 做成 Claude 的一个独立模式，OpenAI 直接打包进 Codex，跟其他的能力一起推出。

我的感觉是，OpenAI 这波更激进。

当然，我觉得这样是对的，以后直接就别再打开ChatGPT了呗。

这也是 Codex 走向 Super App 的一个基础设施——我们不需要切换模式才能用Computer Use。

## 02、内置浏览器

Codex 这一版还内置了浏览器。

目前只能打开本地 localhost 起的前端页面，或者其他不需要登录的公开页。

![](https://cdn.paicoding.com/paicoding/f5f2ae81aa1ff8dc87edf62c17e94ee7.jpg)

觉得页面上某个地方不满意，可以在选择这块内容，然后直接告诉 Codex 你要怎么修改，Codex 会针对这块继续改。

![](https://cdn.paicoding.com/paicoding/994b61873c27177f4614bcfec20e3c67.png)

这个功能对前端开发太香了。

之前用 Codex 生成前端代码，得切到浏览器自己刷新看效果，有问题回来再改。

现在 Codex 直接在内部浏览器里打开，我们就可以在页面上直接告诉 Codex「这个按钮颜色太深了」，Codex 看到反馈后就会自己去改代码。

怎么用呢？

第一步，先开启反馈功能。

第二步，选中某一块元素，反馈：这里能否加一个 logo，和浏览器标签页的 logo 差不多。

![](https://cdn.paicoding.com/paicoding/8ed0e98855a06790e093658333de99ef.png)

然后回到当前对话窗口，执行就可以了。

![](https://cdn.paicoding.com/paicoding/239bec788adaf4b21e31da0340f205f1.png)

## 03、图像生成

Codex 这次接上了 `gpt-image-1.5`，OpenAI 去年 12 月发的图像模型。

提示词：登录页需要一个 logo，你可以生成一个新的 logo，和 π 相关，我看看。

![](https://cdn.paicoding.com/paicoding/e24ae5dba8cb93378d099c5342497e55.png)

整体效果不错。

![](https://cdn.paicoding.com/paicoding/1cf06ba47427fbde95512db7fb4543f6.png)

我直接就采纳了。

## 04、90 多个新插件

Codex 的 plugin 是三类东西的组合：一组 skills（给 Codex 的任务说明书）、一组 app integrations（能操作的应用权限和接口）、一组 MCP servers（后端的数据和工具源）。

![](https://cdn.paicoding.com/paicoding/658929eb36f937281b864164e4ed6ab4.png)

这次一口气多了 90 多个，包括：Atlassian Rovo（管 JIRA）、CircleCI、CodeRabbit、GitLab Issues、Microsoft Suite、Neon by Databricks、Remotion、Render、Superpowers。

![](https://cdn.paicoding.com/paicoding/8b4f07e24ab38056481446fc3195937b.png)

## 05、开发者工作流

这次更新里有几个对开发者很友好的改进：

**PR 评审**：Codex 能识别 GitHub PR 上同事写的 review comments 并逐条处理。以前改 PR 评论是自己一条条看、一条条改，现在可以让 Codex 自己去处理，你只要在最后 review 一下它的改动。

**SSH 连远程 devbox**：可以把 Codex 挂到一台远程开发机上（alpha 阶段）。这对大项目特别有用，本地机器不用扛编译压力，Codex 直接在远程机器上干活。

**侧栏文件富预览**：PDF、表格、PPT、文档直接在侧栏展开看。不用切到别的应用打开，Codex 自己就能读这些文件。

**Summary pane**：展开就是 agent 的 plan、用了哪些 source、产出了哪些 artifact。对理解 Codex 在干什么特别有用，尤其是跑复杂任务的时候。

## 06、记忆和自动化

两块新能力一起上。

**Memory**：Codex 会记住你的偏好、你改过的地方、你上一回花很久才说清楚的那个背景，下一次就不用再讲一遍。

![](https://cdn.paicoding.com/paicoding/97875fb4e1eb3c825733e2f69cb68456.png)

默认是不开启的。

需要的小伙伴可以启用，并且尽量勾选跳过工具辅助聊天。

这个功能对长期项目特别有用。之前每次开新对话，Codex 都要从头了解项目背景、代码风格、命名约定。现在它会记住这些，下次直接用。

**自动化**：已经不是新概念，但这次有变化——自动化任务可以沿用一个已经跑过一轮的对话线程，把之前的上下文带进去继续。

![](https://cdn.paicoding.com/paicoding/bdea5e7e1c67ad1867a47d5ad1f46c96.png)

一个自动化可以给自己安排几天后的下一次触发，也可以跨周执行。

**主动建议**：Codex 根据你连接的插件、你的项目、你积累的记忆，一上来就给你几条今天值得开工的线索。

![](https://cdn.paicoding.com/paicoding/bbfc4204372883d904753e1ba9e73f24.png)

## 07、和 Claude Code 的对比

Claude Code 的优势在于模型能力和 agent 设计——Opus 的推理能力确实强，文本能力也是吊打 GPT-5.4。

但 Claude 系列的最大问题是，你想付费，你想用，也是很担心的，尤其是实名认证出现后，很多人很焦虑。

OpenAI 目前确实比较 open，Codex 中的额度也是隔几天就重置。

100 刀的套餐额度我也是压根用不完。

Codex 的优势在于这次更新后的全栈能力——Computer Use 让它能操作整个系统，插件生态让它能连各种工具，内置浏览器让前端开发更顺畅。

![](https://cdn.paicoding.com/paicoding/60d96770a2e0fd307345eba94477c52c.png)

但有一点我必须强调：这俩不是非此即彼的关系。

我现在两个都在用。

偏文本就交给 Claude Code，Coding 场景就交给 Codex。

## ending

OpenAI 这次更新，很值得被吹捧一波。

Computer Use 让它能操作你的电脑，插件让它能连你的工具，记忆让它能懂你的习惯。这些能力组合在一起，Codex 就不再是一个只能在终端里写代码的工具，而是一个能真正参与软件开发全周期的伙伴。

**【好的 Agent 就应该这样，不只是帮我们多写几行代码，而是让我们少操心。】**

这样下去，IntelliJ IDEA 真的要没了，感觉。

因为 Computer Use 可以直接控制 IntelliJ IDEA，以前 Agent 调试不方便，以后就很方便了呀。

Codex 直接吭哧吭哧全周期参与开发。无敌～

我们下期见。
