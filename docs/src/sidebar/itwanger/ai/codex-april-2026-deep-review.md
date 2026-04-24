---
title: Codex 版本大升级，Computer Use 让 Agent 直接操作 IDEA+Chrome，全栈 Agent 来了。
shortTitle: 没想到 Codex 这么猛，他要控制我的整个 Mac。
description: Codex 4 月大版本深度实测，Computer Use 后台操控 Mac、内置浏览器+图像生成、90+插件、远程开发机、CLI 新版 Plan Mode，每一项都值得聊。
tag:
  - Agent
  - OpenAI
category:
  - AI
author: 沉默王二
date: 2026-04-21
---

大家好，我是二哥呀。

Claude 刚放出 Opus 4.7 的大招，OpenAI 反手就把 Codex 升了个大版本——「Codex for (almost) everything」。

一点不谦虚啊。

我高强度用了几天，最大的感受就一个字：猛。

![](https://files.mdnice.com/user/3903/64bd8d91-c7f1-4b19-bf56-645e8d8e8244.png)

新版一口气加了 Computer Use、内置浏览器、图像生成、90 多个新插件、Memory、自动化，后续 CLI 连着迭代了好几版，今天凌晨又上线了 Chronicle——把屏幕内容也「放进记忆」了。

![](https://files.mdnice.com/user/3903/c7bb246c-f652-450e-9b5f-6b7eb9e3e415.png)

## 01、Computer Use

这次更新里最炸裂的，毫无疑问是 Computer Use。

先说它干了什么——Codex 现在能在你的 Mac 上自己点鼠标、敲键盘、看屏幕。

而且跑的是后台服务，不抢你的光标。

![](https://files.mdnice.com/user/3903/f7c57de6-f636-4cdb-8d29-b51ac69416d5.png)

这才是 Agent 该有的样子，不只是 Coding，还能操作我的电脑帮我干活，但碍着我干活。

### 开启和配置

Computer Use 需要单独开启。在 Codex 的设置里找到 Computer Use，点安装，几秒钟就好。

我一开始还以为要装什么大型驱动包，结果就一个小插件，轻量得有点出乎意料。

![](https://cdn.paicoding.com/paicoding/60b981c00ba70eb5865417a7fe53d57f.png)

第一次让 Codex 操控某个应用时，它会请示你。你可以勾选「始终允许」，之后这个应用就不用反复确认了。建议把 IntelliJ IDEA、Chrome 这类信任度高的直接放开，省得每次都弹窗。

然后 macOS 会弹一个辅助功能权限提示，需要去系统设置里把 Codex 的 Computer Use 勾上。

![](https://cdn.paicoding.com/paicoding/c60a75ac8c008e159bfe68218a8a8a0e.png)

![](https://cdn.paicoding.com/paicoding/c78263ea4119a6ae4b7d1b8dd3144e9a.jpg)

![](https://cdn.paicoding.com/paicoding/796f975250a1d99d2060c6db9a39f6b8.png)

### 让 Codex 操控 IntelliJ IDEA

适用场景有很多，比如说测试 macOS 应用、跑 iOS 模拟器、用浏览器验证 web 服务、改 GUI 才能改的设置、复现只在图形界面出现的 bug、跨多个应用跑流程等。

我选了一个最贴近日常开发的场景——让 Codex 帮我打开 IntelliJ IDEA 并加载项目。

提示词很简单：用 IntelliJ IDEA 打开我的 PaiFlow 项目。

然后我就看着 IntelliJ IDEA 自己启动了，Codex 在后台操控光标找到项目路径、点击 Open，全程丝滑。

![](https://cdn.paicoding.com/paicoding/6e03ba8f3f87a2e3641b3e2bd21dd3cb.png)

![](https://cdn.paicoding.com/paicoding/a55bdfc52e64d2df4b9c2c98f2590482.png)

![](https://cdn.paicoding.com/paicoding/3e8694e8fdc41cc367bdfdcfc6905a3a.png)

整个操作大概十来秒，跟我自己手动操作的速度差不多。

这意味着——以前 Agent 只能在命令行里干活，改代码可以，但调试、看 UI、验证效果这些事还是得我们自己来。

现在 Agent 能自己开 IDE、自己跑模拟器、自己切到浏览器看效果，全都能参与了。

### 让 Codex 操控 Chrome 浏览器

我又试了一个更复杂的场景——让 Codex 帮我打开 Chrome，访问技术派官网，截个图给我看。

提示词：帮我用 Chrome 打开 paicoding.com，然后截图。

Codex 照做了。打开 Chrome、输入地址、等页面加载、截图，一气呵成。


![](https://files.mdnice.com/user/3903/c5d37bc1-eaf3-4614-93bb-a08ed5009eb6.png)


注意 Chrome 右上角是 Codex 的光标。


![](https://files.mdnice.com/user/3903/d8be678a-c3a5-46ae-99e4-ea33a1a372c5.png)

状态栏这里也可以看得到。

![](https://files.mdnice.com/user/3903/32aa1a08-acdf-4d93-bace-8328b7388276.png)


然后截图这事也能干。

![](https://files.mdnice.com/user/3903/500179d3-ae6a-4499-897f-e2f5a41a13fc.png)

这是Codex最后截的图，还挺牛逼的。

![](https://files.mdnice.com/user/3903/1bca0ab0-24cf-49b0-bd91-74f3dc757669.jpg)


这个场景的意义在于——以后可以让 Agent 自己去验证前端页面了。改完代码，让 Codex 自己打开浏览器看效果，不用我们自己切过去刷新。

### 几个要注意的坑

Computer Use 目前的限制和注意事项，我也讲一下。

第一个，目前只有 macOS 用户能用。Windows 的小伙伴暂时只能眼巴巴看着，不过从 CLI 更新日志来看，Windows sandbox 的支持已经在改进了，0.119 版本增加了 Windows elevated sandbox carveouts，0.120 又修了 Windows 相关的路径问题，估计离 Windows 支持不远了。

![](https://files.mdnice.com/user/3903/7bedb4a4-eb09-4d22-b59c-d61481a28874.png)

第二个，Computer Use 不能操作终端应用和 Codex 自身。这合理，不然套娃起来就乱套了。

第三个，它无法以管理员身份执行操作，也处理不了系统隐私弹窗。碰到这种弹窗，还是得你亲自出马。

第四个，涉及账户、支付、密码的操作，一定一定要自己盯着。浏览器操作是在你已登录的状态下执行的。


## 02、内置浏览器

Codex 这次还内置了一个浏览器。

目前支持打开本地 localhost 起的前端页面，或者其他不需要登录的公开页面。

虽然还做不到像 CDP 那样复用登录态访问任意网站，但配合 Computer Use 的浏览器操控能力，基本覆盖了大部分场景。

![](https://cdn.paicoding.com/paicoding/f5f2ae81aa1ff8dc87edf62c17e94ee7.jpg)

这个功能对前端开发来说太关键了。以前用 Codex 生成前端代码，得切到浏览器自己刷新看效果，觉得不对再回来改，来来回回折腾好几轮。现在 Codex 直接在内部浏览器里打开页面，你觉得哪里不满意，选中那块内容直接告诉 Codex 怎么改，Codex 看到反馈就自己去改代码了。

操作方式分两步。第一步，开启页面反馈功能。第二步，选中页面上某一块元素，写上你的反馈，比如「这个按钮颜色太深了，换个浅蓝色」。

![](https://cdn.paicoding.com/paicoding/994b61873c27177f4614bcfec20e3c67.png)

![](https://cdn.paicoding.com/paicoding/8ed0e98855a06790e093658333de99ef.png)

![](https://cdn.paicoding.com/paicoding/239bec788adaf4b21e31da0340f205f1.png)

然后回到对话窗口，Codex 就会根据你的反馈去改代码，改完自动刷新，你直接在内置浏览器里看效果。

这跟以前比简直是质变。

以前是「改代码 → 切浏览器 → 刷新 → 不行 → 切回 Codex → 再改」，现在是「选中 → 说一嘴 → 自动改完自动刷新」，少了四步来回切换。

## 03、图像生成

Codex 接入了 gpt-image-1.5，OpenAI 去年发的图像模型。

我试了一下，让它给登录页生成一个和 π 相关的 logo。出来的效果还不错。

![](https://cdn.paicoding.com/paicoding/e24ae5dba8cb93378d099c5342497e55.png)

![](https://cdn.paicoding.com/paicoding/1cf06ba47427fbde95512db7fb4543f6.png)

直接采纳，放到项目里用。

## 04、90 多个新插件

Codex 的 plugin 是三样东西的组合：一组 skills（给 Codex 的任务说明书）、一组 app integrations（能操作的应用权限和接口）、一组 MCP servers（后端的数据和工具源）。

这次一口气多了 90 多个，包括 Atlassian Rovo（管 JIRA）、CircleCI、CodeRabbit、GitLab Issues、Microsoft Suite、Neon by Databricks、Remotion、Render 等。

![](https://cdn.paicoding.com/paicoding/658929eb36f937281b864164e4ed6ab4.png)

![](https://cdn.paicoding.com/paicoding/8b4f07e24ab38056481446fc3195937b.png)

CLI 0.121 版本还加了一个实用功能——支持从 GitHub 仓库、git URL、本地目录安装插件市场。

这意味着社区可以自己维护插件集，不再完全依赖官方分发。

0.122 版本更进一步，图像生成和工具发现功能默认开启了，不用再手动开启。插件的工作流也增强了，支持 tabbed browsing 和 toggles。

## 05、Memory

Codex 会记住你的偏好、你改过的地方、你上一回花很久才说清楚的那个背景，下一次就不用再讲一遍。

默认是不开启的，需要手动启用。

![](https://cdn.paicoding.com/paicoding/97875fb4e1eb3c825733e2f69cb68456.png)

这个功能对长期项目太有用了。

之前每次开新对话，Codex 都要从头了解项目背景、代码风格、命名约定。现在它会记住这些，下次直接用。


![](https://files.mdnice.com/user/3903/a23f24ae-9613-4d80-a33f-2ba2c0176f62.png)


## 06、Chronicle

这东西一句话就能说明白：Codex 的 Memory 之前只记对话历史，现在加了一层屏幕上下文。

它知道你现在屏幕上在看什么，刚才报什么错。

从此，你再跟 Codex 说话的时候，不用反复解释「这个」「那个」指的是什么了。

### 怎么启用

第一步，打开 Codex 的 Settings。

第二步，进入 Personalization，确认 Memories 已开。

第三步，打开 Memories 下方的 Chronicle。

![](https://files.mdnice.com/user/3903/b2fe2688-0a0f-44af-8e05-60ce0445ffe5.png)

第四步，点击确认对话框的 Continue。


### 技术细节

屏幕截图存在 `$TMPDIR/chronicle/screen_recording/`，6 小时后 Chronicle 自己删掉。这点还挺好的，不会一直占着磁盘。

生成的 memory 存在 `~/.codex/memories_extensions/chronicle/`，是未加密的 markdown 文件，用户可以读、可以改、可以删。OpenAI 建议不要手动加新条目，但局部改和删是支持的。


![](https://files.mdnice.com/user/3903/436a6eba-807a-4eb1-8347-637b4c760ade.png)


生成 memory 用的模型，默认跟 Codex 用的模型一致。想换别的可以在 config.toml 里设置：

```toml
[memories]
consolidation_model = "gpt-5.4-mini"
```

### 体验 Chronicle

Chronicle 加的是屏幕上下文——你屏幕上正在看什么、刚才浏览器打开了什么页面、终端里跑的是什么命令。

叠加上 Memory 之后，Codex 对「你现在的上下文」理解就从「你说过的」扩展到了「你看过的」。

比如我刚刚在Chrome上打开了 computer use，Codex 就能是被出来。

![](https://files.mdnice.com/user/3903/ef905953-0d37-4eb2-8ff0-03d6183b665f.png)


![](https://files.mdnice.com/user/3903/94fb5784-2d5c-450a-bda8-f077ee1703b6.png)


这就牛逼了，直接省掉「我说的是这个」「不是那个，是另一个」的无效沟通。



## 07、和 Claude Code 到底选谁

先说 Claude Code 的强项，模型推理能力和文本处理。

Opus 的推理确实猛，处理复杂逻辑、理解大项目架构的时候，Claude Code 更稳。尤其是那种需要反复迭代、中间不断调整方向的探索型任务，Claude Code 的交互模式更灵活。

但 Claude 有个大问题，用过的小伙伴应该都懂——付费和使用上的担忧，实名认证出来之后更是焦虑了一波。

再说 Codex 的强项，全栈能力，就比如说 Computer Use 可以让它能操作整个 macOS 系统，更关键的是，不断重置额度，根本用不完。

我从200刀切到100刀后仍然用不完。

![](https://cdn.paicoding.com/paicoding/60d96770a2e0fd307345eba94477c52c.png)

但不得不说，Codex的文本能力就是狗屎。

不及 4o 的十分之一。

每次看，每次恶心。

## ending

Codex 这次更新，硬生生把一个写代码的工具推到了超级 APP的高度。

Computer Use 让它能操作你的电脑，Memory让他记住你的喜好，Chronicle 让它知道你在屏幕上正在看什么。

说个大胆的判断，如果 Codex 这样进化下去，没准会 激发另外一个产品的生命力，那就是 IntelliJ IDEA。

直接让 Codex 在后台操控 IDE debug，我们只需要在关键节点做决策就行。

不错不错。
