---
title: Qoder 越来越猛了，Browser Use 让 Agent 的联网能力拉满。
shortTitle: QoderWork for Chrome 实测
description: QoderWork for Chrome 实测，让 Agent 像人一样操作浏览器，Multi-Agent 并行调研 GitHub AI 项目，配合定时任务和 IM 频道做成每日推送。
tag:
  - Agent
  - Browser
category:
  - AI
author: 沉默王二
date: 2026-05-11
---

大家好，我是二哥呀。

最近，Qoder 的进化越来越让人惊喜了！

尤其是他的 Browser Use 功能，让 Agent 的联网能力拉到满中满。

第一，Qoder 很早的版本就内置了浏览器，并且支持开发者模式、元素选择。

![](https://cdn.paicoding.com/stutymore/sucai-20260511084034.png)

第二，给 Qoder 安装 Chrome Devtools MCP，对于不需要登录场景的浏览器操作，会非常方便。

![](https://cdn.paicoding.com/stutymore/sucai-20260511084955.png)

第三，安装 QoderWork 的 Chrome 浏览器插件，让 Agent 像你一样操作浏览器。完全和人操作浏览器的方式一模一样。

![](https://cdn.paicoding.com/stutymore/sucai-20260511090613.png)

上图就是 QoderWork 自动在我的 Chrome 中打开技术派的 admin 页面，并帮我进行 ElasticSearch 的关键字搜索测试，关键字是【注意力机制】。

更重要的是：QoderWork for Chrome 不只是测试代码成果，**还能协调多个 Agent 并行测试复杂的网页交互场景，尤其是多人协作/多人在线应用这种人工测试比较麻烦的场景**。

我录了个屏，大家可以感受下，非常无敌。

【录屏】

## 01、安装 QoderWork for Chrome 插件

四步搞定。

第一步，访问 Chrome 应用商店，搜索 QoderWork Browser Connector，或者直接打开这个链接：

> https://chromewebstore.google.com/detail/qoderwork-browser-connect/gblapfbnbicdckfhkllcnfleiemhmgeb

![](https://cdn.paicoding.com/stutymore/sucai-20260511084454.png)

第二步，点击【添加到 Chrome】，弹出确认对话框后选择【添加扩展程序】。

![](https://cdn.paicoding.com/stutymore/sucai-20260511085234.png)

第三步，回到 QoderWork，新开一个任务，点击对话框中的【连接器】，启用【我的浏览器】。

![](https://cdn.paicoding.com/stutymore/sucai-20260511085556.png)

在设置的【连接器与 MCP】这里就能看到已启用的浏览器连接器了。

![](https://cdn.paicoding.com/stutymore/sucai-20260511085929.png)

第四步，在 QoderWork 中新开一个任务，输入你想让 Agent 做的事情。注意看 Chrome 浏览器的标签页会出现一个 QW 图标，头部会显示【QoderWork 浏览器连接器已开始调试此浏览器】的提示。

![](https://cdn.paicoding.com/stutymore/sucai-20260511090841.png)

这说明连接成功了，Agent 现在能看到你的浏览器，也能操作它。

芜湖。

接下来，能干的事情就多了呀。

## 02、QoderWork for Chrome 的工作原理

QoderWork for Chrome 和 Chrome DevTools MCP 有什么区别？

表面上都是操作浏览器，底层逻辑完全不一样。

Chrome DevTools MCP 是启动一个独立的 Chrome 实例，通过 CDP 协议远程控制。这意味着它没有你的登录态，访问需要认证的页面得重新登录。

（当然可以用 web-access 这种Skill来优化）

QoderWork for Chrome 是一个浏览器扩展，直接注入到你正在用的 Chrome 里面。

![](https://files.mdnice.com/user/3903/27598c0f-0a49-4c2a-bd82-5f3ab56cef54.png)


几个本质区别。

第一，从真实浏览器 DOM 获取完整页面内容。不是从网络层拦截 HTML 源码，而是拿到 JavaScript 动态渲染完成之后的真实 DOM 树。SPA 应用、动态加载的内容、懒加载的图片，全部可见。

第二，直接复用你 Chrome 的登录状态和 Cookie。不管是技术派的 admin 后台、公司的 Jira、还是小红书的个人主页，只要你在 Chrome 里登录过，Agent 直接就能访问，不需要任何额外认证。

第三，操作方式完全模拟真人。navigate 导航、type 输入、click 点击、scroll 滚动、screenshot 截图、upload 上传文件。所有交互都发生在真实的浏览器环境里，网站的前端逻辑、事件监听、状态管理全部正常触发。


![](https://files.mdnice.com/user/3903/7854b55a-2031-48fc-b02d-11db325bb917.jpg)


看一个实际的case。

>我已经打开技术派的admin端：http://127.0.0.1:3301 并登录了，你帮我测试一下文章列表的ElasticSearch搜索，关键字可以是注意力机制。

![](https://cdn.paicoding.com/stutymore/sucai-20260511090458.png)

注意 Chrome 浏览器的标签页会出现一个QW的图标，并且头部会出现【QoderWork浏览器连接器已开始调试此浏览器】的提示。

![](https://cdn.paicoding.com/stutymore/sucai-20260511090841.png)

如果发现问题，可以让QoderWork帮你直接修改。

>我搜的是注意力机制，为什么第一个结果没有这个关键字呢？另外，我不希望markdown格式的内容显示在table中，会占用很多空间，给用户的感官很不友好。

![](https://cdn.paicoding.com/stutymore/sucai-20260511092157.png)

注意这些细节，完全是按照人的方式在操作浏览器。

```
navigate → http://127.0.0.1:3301
type → 搜索框 → “注意力机制”
click → 搜索按钮
screenshot → 保存当前页面截图
```

![](https://cdn.paicoding.com/stutymore/sucai-20260511092601.png)

每一步 Agent 都会先截图观察当前页面状态，识别可交互的元素，然后执行操作，再截图确认结果。这个“观察-决策-执行-验证”的循环，和人类操作浏览器的方式一模一样。


![](https://files.mdnice.com/user/3903/8e9fdb3d-e315-4729-ba43-2c0d37d2c2b2.jpg)

问题解决后，自己再主动测试验证结果，真的超级方便。


## 03、登录态小红书场景实测

登录态复用是 QoderWork for Chrome 一个非常实用的能力。

要知道，小红书是出了名的反爬大户。WebFetch 去抓小红书页面，返回的要么是空白、要么是登录提示、要么就是一堆被混淆的 JavaScript。

但 QoderWork for Chrome 不一样。它用的就是我们日常的 Chrome，我的小红书已经登录了。


![](https://files.mdnice.com/user/3903/e05d9d91-cfa3-4556-99bd-db1f8140f387.jpg)


我给 QoderWork 发了一条指令：

> 去小红书搜索“AI Agent”，看看最近有什么热门讨论，整理前 10 条帖子的标题和核心观点。


![](https://files.mdnice.com/user/3903/03083ed3-e958-4130-b597-e0ab874a99b4.jpg)


Agent 直接在我已登录的小红书页面上操作：打开搜索框，输入关键词，回车，然后逐条提取搜索结果。


因为是登录状态，搜索结果和我自己搜的一模一样，没有任何限制。


![](https://files.mdnice.com/user/3903/604176e7-c5e8-4501-a3eb-d2f77ad394d1.jpg)


更关键的是，Agent 不只是看标题。它会主动点进去几条帖子，读评论区的讨论，提取用户的真实反馈。


![](https://files.mdnice.com/user/3903/b184a159-6179-4f9b-ade2-3c7a5b5e7b98.jpg)


这种深度是搜索引擎摘要给不了的。

整理完之后给了我一份报告：


![](https://files.mdnice.com/user/3903/1a8ef4ee-5540-41f4-9d42-2972e3d0a0b4.jpg)

所有需要登录才能看到内容的平台，同样的逻辑。只要你在 Chrome 里登录过，Agent 就能进去操作。

## 04、并行调研 GitHub AI Hot10

QoderWork 真正让我觉得“不一样”的，是它的 Multi-Agent 并行调研能力。

我最近有个想法：

每天整理一份“GitHub AI Hot10”榜单，看看当天有哪些好玩的 AI 开源项目值得关注。手动做这件事太痛苦了，GitHub Trending 只有大类排行，我想要的是细分到 Agent 框架、RAG 工具、LLM 推理引擎、AI Coding 助手这些具体方向的精选。

于是我启用了 QoderWork 的专家套件。


![](https://files.mdnice.com/user/3903/29df1aa2-25bc-4db9-9350-a7131eb248a7.png)


QoderWork 最近上线了“专家套件”的概念：把多个技能和连接器打包在一起，形成面向特定岗位的完整能力。


![](https://files.mdnice.com/user/3903/20ea0e54-dfe1-4da5-b9ab-749956534748.jpg)


我给 QoderWork 的任务描述是：

> 帮我调研 GitHub 上今天最热门的 AI 开源项目，分成 5 个方向（多个并行的子Agent）：Agent 框架、RAG/检索增强、LLM 推理引擎、AI Coding 工具、多模态应用。每个方向找 2 个最近一周 Star 增长最快的项目，整理项目名、Star 数、一句话描述、项目链接。


![](https://files.mdnice.com/user/3903/89181bcf-11bc-4158-808a-fffeccb5101b.jpg)


QoderWork 接到任务后，把任务拆成了 5 个并行的子 Agent。



![](https://files.mdnice.com/user/3903/bc408abd-ebe4-48e5-9128-8e07876120ba.png)



![](https://files.mdnice.com/user/3903/c5e710d6-1ffd-41d4-b4c4-18f12f731014.jpg)



每个子 Agent 各自打开一个 Chrome 标签页，分别去 GitHub Trending 按不同的关键词和 Topic 筛选。

Agent-A 在标签页 1 搜索 “agent framework”，Agent-B 在标签页 2 搜索 “RAG retrieval”，Agent-C 搜 “LLM inference”，Agent-D 搜 “AI coding”，Agent-E 搜 “multimodal”。

五个 Agent 同时干活，各自独立，互不干扰。

每个子 Agent 不只是看 Trending 列表。它会点进项目主页，看 README 的第一段描述，看最近一周的 Star 增长曲线，看最近的 commit 频率判断项目是否活跃。


![](https://files.mdnice.com/user/3903/9930d86e-8852-4b34-b4f7-821808805fd4.jpg)



![](https://files.mdnice.com/user/3903/8d2c0492-c833-4b08-b099-81e354217453.jpg)

这个调查是真的仔细啊，我的浏览器标签页真扛不住了快。😄

![](https://files.mdnice.com/user/3903/97df1f3c-d2c8-420d-ae8b-d98c8e79c998.png)

由于子 Agent 之间上下文完全隔离，每个 Agent 的输出质量不会因为前面的调研结果而产生偏向。

最后主 Agent 整合成一份结构化的“GitHub AI Hot10”报告。格式很清爽：方向、项目名、Star 数、一句话描述、链接。


![](https://files.mdnice.com/user/3903/9a69ee3c-9dac-4b8c-ab91-e1f3adb088c1.png)


![](https://files.mdnice.com/user/3903/f5225a09-8e0c-4424-aa02-6a91bf4d6a19.png)

专业，实在是专业。

这就是 Multi-Agent 并行分治的威力。

主 Agent 像团队 leader 一样分发任务，子 Agent 像调研员一样各自执行，最后汇总成果。整个过程中主 Agent 不参与任何具体的浏览器操作，它只负责拆分和整合。

## 05、定时任务做成每日推送

我把上面的 GitHub AI Hot10 调研任务配置成了一个每天早上 8 点自动执行的定时任务。

>我希望整理成Skill，并做成定时任务，每天8点开始。

![](https://files.mdnice.com/user/3903/3c64d112-e155-40a3-8372-9625cfc3fad6.jpg)

这是QoderWork生成的定时任务。

![](https://files.mdnice.com/user/3903/f0edb88d-02c8-41ab-bc59-38fc6d6a1468.png)

还有配套的Skill。

![](https://files.mdnice.com/user/3903/469c4422-32a3-427b-becc-d69366a25c78.png)

Skill 里定义好：调研的 5 个方向分别搜什么关键词、进入项目主页后提取哪些字段、异常情况怎么处理。

有了 Skill 之后，定时任务每天跑的就是一套固定的工作流程。

如果还想更进一步，可以把这个结果做成一个网站，大家以后也可以通过 `aihot.paicoding.com` 看到每天的 AI 开源热门项目。

![](https://files.mdnice.com/user/3903/66072c46-10be-48ff-b00c-01a6e17a0dbf.png)

>我希望将这个项目部署到服务器，就用子域名 aihot.paicoding.com 我的服务器地址可以参考 deploy-front.sh 就放在服务器的 www/aihot 目录下。


![](https://files.mdnice.com/user/3903/8a910282-db74-4d76-ad7e-595f65bf1ba6.png)


很快就搞定了，只需要在域名解析上加一条子域名记录就可以了。

![](https://files.mdnice.com/user/3903/5131784d-8f33-494e-babe-f0fd6ee749ca.png)


页面结构很简单：日期 → 5 个方向 → 每个方向 2 个项目 → 项目卡片（名称、Star、描述、链接）。


![](https://files.mdnice.com/user/3903/3fcb3723-fb0e-476e-9618-496a72acf9fc.jpg)

OK，大家已经可以访问了，是不是非常快？

全程我们就配了一个子域名，QoderWork帮我们全部搞定。

整条流程就是：QoderWork 定时任务触发 → QoderWork Chrome 浏览器连接器 → Multi-Agent 并行调研 → 静态页面渲染 → 每日自动更新。


![](https://files.mdnice.com/user/3903/8d1de146-c3ce-499f-80ed-1f3ad2da5913.png)


全程无人值守。

最花时间的，其实就是调研阶段，Skill 我们随后会进行迭代。

以后大家想知道GitHub上有什么好的、新鲜出炉的 AI 开源项目，就很方便了。

记住这个网址：`https://aihot.paicoding.com/`

## 06、IM 频道推送结果

网站有了，但我希望每天能主动收到推送，而不是自己去刷页面。

QoderWork 也支持 IM 接入，包括微信、钉钉、飞书等等。


![](https://files.mdnice.com/user/3903/0078ce82-0edf-477c-9cc5-bad82d53b4c7.png)

拿微信来举例，点击【配置】，拿起手机，微信扫个码就好了。


![](https://files.mdnice.com/user/3903/7e50e86d-23d1-49b4-b188-41d3944fd586.png)

配置完成后，每天早上 8 点定时任务跑完 GitHub AI Hot10 调研，结果会自动推送到我的微信。

打开手机就能看到今天有哪些值得关注的 AI 项目，不用打开电脑，不用切换任何东西。

（用QoderWork for Chrome 跑任务是最花时间，调研阶段前面演示过了，这里为了演示就跳过了，先测试一下IM 是否接通）

![](https://files.mdnice.com/user/3903/9a2acb13-ad11-41ec-8c49-4a015ab8554f.png)


微信已经收到通知了。


![](https://files.mdnice.com/user/3903/a4599404-ed4a-45df-bbd9-94fab3bcc926.png)

点开看一下。


![](https://files.mdnice.com/user/3903/fa13e4f9-4888-4ea9-ba9b-de127329c1c1.png)

手机端打开，也是完全没有问题。


![](https://files.mdnice.com/user/3903/e318a767-6af1-4dc0-a851-758ba4308ca2.png)

完全一站式搞定，只能说 QoderWork还是太能打了。

从一个想法的萌芽，到产品的调研，到网站的上线，就没有他搞不定的。

![](https://files.mdnice.com/user/3903/2fb394c0-d0b9-40d3-b6f6-fcf0049d1af8.png)

- 设计 Multi-Agent 并行调研架构，将 5 个方向的 GitHub 项目调研任务拆分给独立子 Agent，各自操作浏览器标签页并行执行
- 基于 QoderWork 专家套件封装“产品调研”工作流，定义关键词策略、数据提取规则和输出格式规范，保证每日输出质量一致
- 配置 QoderWork 定时任务实现每日 8 点自动触发，结合 IM 频道将结构化报告推送到团队钉钉群，全程无人值守
- 利用 QoderWork Browser Connector 复用真实 Chrome 登录态，支持 GitHub 私有仓库和需要认证的平台调研，解决传统爬虫的登录态难题
- 设计子 Agent 上下文隔离机制，每个子 Agent 独立管理浏览器标签页，避免并行调研时的信息交叉污染

## ending

回头看，QoderWork for Chrome 让我最兴奋的不是某个单点能力。

单纯的浏览器操控？市面上有很多工具能做。登录态复用？CDP Proxy 也能实现。

真正让我觉得“这东西不一样”的是：它把浏览器操作、Multi-Agent 并行、专家套件、定时任务、IM 频道这些能力组合在一起之后，产生的化学反应。

单独每一项都不算新鲜，但串起来之后就是一条完整的自动化工作流。每天早上 8 点，5 个 Agent 同时出动，各自调研一个方向，30 分钟后搞定报告，推送到微信。我睡醒打开手机就能看到今天有什么好玩的 AI 项目。


![](https://files.mdnice.com/user/3903/849b3e87-76a5-411b-87be-25dd472f026f.png)


QoderWork 做到了，记得勾选一下保持系统唤醒，这样定时任务会到点启用，电脑也不用24小时待机。

**【好的 AI 不是你需要它的时候去找它，而是它每天准时出现在你的消息列表里。】**

我们下期见。

  
