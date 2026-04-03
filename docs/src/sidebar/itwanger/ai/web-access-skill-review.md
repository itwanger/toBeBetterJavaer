---
title: 这个 Skill 太硬核了，刚开源就斩获 1.8K 星标！Agent 联网能力拉满！
shortTitle: web-access Skill实测
description: web-access Skill 实测，解决 Agent 联网痛点，支持 CDP 浏览器直连、并行调研和站点经验沉淀。
tag:
  - Agent
  - Skills
category:
  - AI
author: 沉默王二
date: 2026-03-27
---

大家好，我是二哥呀。

用 Claude Code 写代码写了大半年，什么都好，就一个事让我一直如鲠在喉——联网能力太拉了。

WebSearch 搜出来的东西经常答非所问，WebFetch 抓网页动不动就返回一堆乱码，碰到需要登录的页面直接歇菜。更离谱的是小红书、微信公众号这种动态渲染的平台，Agent 根本看不到内容，跟瞎子摸象似的。

![](https://cdn.paicoding.com/stutymore/web-access-skill-review-20260327171101.png)

直到上周有个小伙伴在群里甩了一个 GitHub 链接，说“这个 Skill 装上之后，Agent 联网能力直接拉满”。我去 GitHub 一看，1.8K Star，刚开源没多久就起飞了。

我当天就装上了。现在回头看，这可能是我今年装过的最值的一个 Skill。

![](https://cdn.paicoding.com/stutymore/web-access-skill-review-20260327171239.png)

## 01、web-access 是什么

先说清楚，web-access 不是一个 MCP 服务器，是一个 Skill。

Skill 和 MCP 最大的区别在于：MCP 只提供工具，Skill 提供工具 + 策略 + 经验。打个比方，MCP 是给你一把锤子，Skill 是给你一把锤子的同时还告诉你钉子应该从哪个角度敲。

![](https://cdn.paicoding.com/stutymore/web-access-skill-review-20260327171440.png)

web-access 的核心设计哲学叫“像人一样思考”，拿到任务先明确目标，选最可能直达的方式验证，过程中根据反馈实时调整策略，达成目标后才停止。

整个 Skill 文件不光定义了工具接口，还写了大量的决策逻辑，教 Agent 在什么场景用什么工具、遇到什么问题怎么绕。

![](https://cdn.paicoding.com/stutymore/web-access-skill-review-20260327171833.png)

它的工具集分三层：

第一层是轻量级的搜索和抓取。WebSearch 搜关键词、WebFetch 抓已知 URL 的内容、curl 拿原始 HTML、Jina 把网页转 Markdown 省 token。

这些是现有 Agent 就有的能力，web-access 在上面加了调度策略——什么时候该用哪个，什么时候该放弃换思路。

第二层是浏览器 CDP 直连。这才是 web-access 的杀手锏。

先科普一下 CDP 是什么。CDP 全称 Chrome DevTools Protocol，是 Chrome 浏览器对外暴露的一套调试协议。你可以把它理解成 Chrome 的“后门”，通过这个协议，外部程序可以完全控制浏览器的行为：打开页面、执行 JavaScript、点击元素、截图、甚至操控视频播放。

web-access 通过 CDP 直接连接用户日常使用的 Chrome 浏览器，天然带登录态，能操作任何需要交互的页面。小红书、微信公众号、需要登录的后台管理系统，统统不在话下。

第三层是并行分治。多个调研任务可以拆给子 Agent 并行执行，每个子 Agent 自己开 tab、自己操作、自己关闭，主 Agent 只接收摘要结果。速度快，还不撑爆上下文。

## 02、安装 web-access

安装方式非常简单。Claude Code 直接说：

```bash
帮我安装 web-access skill，仓库地址是 https://github.com/eze-is/web-access。这个 skill 原为 Claude Code 设计，安装前请先理解其核心原理和工作逻辑，再结合你的 Agent 架构与电脑环境进行适配，使其真正融入当前环境，而非生硬移植。
```

![](https://cdn.paicoding.com/stutymore/web-access-skill-review-20260327171723.png)

Codex 的话，Skills 目录不太一样，安装方式都一样。我两个都装了。

![](https://cdn.paicoding.com/stutymore/web-access-skill-review-20260327171758.png)

装完之后还需要做一件事——开启 Chrome 的远程调试。

在 Chrome 地址栏输入 `chrome://inspect/#remote-debugging`，勾选“Allow remote debugging for this browser instance”，重启浏览器。

![](https://cdn.paicoding.com/stutymore/web-access-skill-review-20260327171907.png)

Skills 安装的时候会自动检查 Node.js 版本（需要 22+）、Chrome 端口连通性，如果 CDP Proxy 没启动还会自动拉起来。全部绿灯就可以用了。

![](https://cdn.paicoding.com/stutymore/web-access-skill-review-20260327172053.png)

有一个细节我觉得做得很好——CDP Proxy 启动后是常驻进程，不用每次都重启。

它直接连接你日常用的 Chrome，不是另外启动一个无头浏览器。所以你在 Chrome 里登录过的网站，Agent 直接就能访问，不需要再登录一次。

直接打开技术派官网，已经是登录状态。

![](https://cdn.paicoding.com/stutymore/web-access-skill-review-20260327172839.png)

## 03、帮 PaiAgent 做竞品调研

第一个实测场景，我让 Agent 帮 PaiAgent 项目做一次竞品调研。

背景是这样的：PaiAgent 是我做的一个 AI 工作流编排平台，现在想看看市面上的竞品——Dify、Coze、FastGPT——在节点类型、模型支持、部署方式上有什么差异，好确定下一步的功能优先级。

如果没有 web-access，我得自己一个个去打开这些平台的官网和文档，手动整理对比。现在我直接对 Agent 说：

> 帮我调研 Dify、Coze、FastGPT 这三个 AI 工作流平台，重点关注：支持的节点类型、模型接入方式、是否支持私有化部署、价格策略。整理成对比表格。

Agent 的反应让我眼前一亮。

它没有傻乎乎地用 WebSearch 搜三次然后拼凑摘要，而是直接启用了并行分治——派出三个子 Agent，每个负责一个平台。

![](https://cdn.paicoding.com/stutymore/web-access-skill-review-20260327173216.png)

每个子 Agent 自己开 tab 去对应的官网和文档站翻阅，主 Agent 只负责收集结果和整合。

三个子 Agent 同时干活，总耗时基本等于单个平台的调研时间。这要是串行来，得等三倍的时间。

更让我意外的是子 Agent 的调研深度。拿 Dify 来说，子 Agent 没有只看首页的功能列表，而是进入了 docs.dify.ai 翻了好几页文档，从“模型供应商”页面提取了支持的 LLM 列表，从“节点说明”页面整理了所有节点类型。

![](https://cdn.paicoding.com/stutymore/web-access-skill-review-20260327174248.png)

这种信息靠 WebSearch 的摘要是拿不到的，必须真正进到页面里去读。

最终 Agent 给了我一份对比表格，列得清清楚楚。我看完之后直接给 PaiAgent 加了两个 TODO：支持条件分支节点、增加 HTTP 请求节点。这些都是竞品有但我们还没做的。

说句掏心窝的话，这种调研以前是产品经理的活，至少得花半天到一天的时间。

![](https://cdn.paicoding.com/stutymore/web-access-skill-review-20260327174306.png)

现在 Agent 十来分钟就搞定了，而且信息密度比人工整理的还高——因为 Agent 会翻文档、会看详情页，不会像人一样看了首页就觉得够了。

## 04、抓取小红书上的 AI Agent 讨论

第二个 Case 更能体现 web-access 的价值——去小红书上看看用户对 AI 工作流工具的真实反馈。

小红书是出了名的反爬大户。WebFetch 去抓小红书页面，返回的要么是空白、要么是登录提示、要么就是一堆被混淆的 JavaScript。之前我想了解用户的真实使用体验，只能自己打开小红书 App 一条条翻。

装了 web-access 之后，我直接说：

> 去小红书搜索“沉默王二”，看看用户都在讨论什么，整理出前 10 条有价值的帖子标题和核心观点。

Agent 知道小红书是“已知静态方式不可达的平台”，直接走了 CDP 模式。

![](https://cdn.paicoding.com/stutymore/web-access-skill-review-20260327180928.png)

在我的 Chrome 中复用我的小红书标签页，用页面内的搜索框输入关键词，然后一条条提取搜索结果。

![](https://cdn.paicoding.com/stutymore/web-access-skill-review-20260327181009.png)

这个过程中有几个细节让我觉得设计得很精细。

Agent 会用我已经登录的小红书账号，所以搜索结果和推荐内容跟我自己看到的一样，不会因为未登录而被限制内容。

![](https://cdn.paicoding.com/stutymore/web-access-skill-review-20260327181145.png)

翻完搜索结果后，Agent 还主动点进了几条帖子的详情页，提取了评论区的讨论。这就比光看标题有深度多了。

![](https://cdn.paicoding.com/stutymore/web-access-skill-review-20260327181223.png)

![](https://cdn.paicoding.com/stutymore/web-access-skill-review-20260327181253.png)

最终给我整理出来一份报告。

试过之后就一个感受：以前 Agent 的联网能力是“能搜”，现在是“能逛”。

![](https://cdn.paicoding.com/stutymore/web-access-skill-review-20260327181359.png)

搜和逛的差距，就像你在百度搜“北京美食推荐”和你真正走进胡同里转一圈的差距。

![](https://cdn.paicoding.com/stutymore/web-access-skill-review-20260327181728.png)

## 05、自动生成 PaiAgent 技术文档

第三个 Case 是一个日常开发中非常实用的场景。

如果我想根据 GitHub 上 PaiAgent 的提交记录，生成一些技术周报或者更新日志，以前我得自己去翻 commit，看看每条提交改了什么，提炼出技术要点，然后整理成文档。这个过程既枯燥又费时间。现在我直接对 Agent 说：

> 帮我去 GitHub 看看 PaiAgent 项目最近的提交记录，整理出技术要点，帮我生成一份技术周报。

![](https://cdn.paicoding.com/stutymore/web-access-skill-review-20260327181532.png)

于是自动切换到 CDP 模式，用浏览器真实打开页面，等 JavaScript 渲染完成后再提取内容。

这个“先试轻量方式、不行再升级”的策略，在 web-access 的设计文档里叫“选择起点”，不是什么都一上来就开浏览器，而是先用成本最低的方式试试，试不通再用重武器。省 token，也省时间。

## 06、Chrome DevTools MCP

Chrome DevTools MCP 是 Chrome 官方团队做的一个 MCP 服务器，让 Agent 能通过 Chrome DevTools Protocol 操作浏览器。

![](https://cdn.paicoding.com/stutymore/web-access-skill-review-20260327184607.png)

Chrome DevTools MCP 是一个纯工具层的实现。它暴露了 CDP 的底层 API——创建 tab、执行 JavaScript、截图、点击。

web-access 在工具层之上加了三个东西。

第一个是调度策略。它会教 Agent 先用 WebSearch 搜、再用 WebFetch 抓、实在不行才开浏览器。

这种渐进式升级的策略，避免了 Agent 动不动就启动浏览器的高成本操作。

第二个是站点经验沉淀。web-access 在 `references/site-patterns/` 目录下维护了各个网站的操作经验——小红书怎么搜索、微信公众号的反爬特征、B 站的懒加载规则。

这些经验在操作成功后会自动更新，跨会话复用。

第三个是并行分治能力。多个调研任务可以拆给子 Agent 并行执行，每个子 Agent 自己管理自己的 tab。

![](https://cdn.paicoding.com/stutymore/web-access-skill-review-20260327185938.png)

一句话总结：Chrome DevTools MCP 是一把好锤子，web-access 是一整套装修方案。

## 07、CDP 是什么？

**CDP（Chrome DevTools Protocol）** 是 Chrome 浏览器提供的**远程调试协议**，允许外部程序通过 WebSocket 或 HTTP 与 Chrome 进行通信。

简单说：**CDP 让你能用代码“遥控” Chrome 浏览器。**

通过 CDP，我们可以：

- **操作页面**：导航、截图、生成 PDF
- **执行 JavaScript**：在页面里运行任意 JS 代码
- **操作 DOM**：读取和修改页面元素
- **模拟用户操作**：点击、输入、滚动
- **监控网络**：监听请求和响应
- **分析性能**：获取页面加载指标

基本上我们再 Chrome DevTools 里能做的所有事情，现在都可以通过代码来做。

![](https://cdn.paicoding.com/stutymore/web-access-skill-review-20260327190300.png)

### 怎么启用 CDP？

启动 Chrome 时加一个参数就行：

```bash
# macOS
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222

# Windows
"C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222

# Linux
google-chrome --remote-debugging-port=9222
```

启动后，访问 `http://localhost:9222/json` 就能看到所有打开的标签页信息。

### CDP Proxy 是什么？

**CDP Proxy** 封装了一层 HTTP API，让调用变得简单：

```
原始方式（复杂）：
你的代码 ←WebSocket→ Chrome (9222)

CDP Proxy 方式（简单）：
你的代码 ←HTTP→ CDP Proxy ←WebSocket→ Chrome (9222)
```

有了 CDP Proxy，就可以用简单的 HTTP 请求来操作浏览器：

```bash
# 列出所有标签页
curl http://localhost:3456/targets

# 执行 JS
curl "http://localhost:3456/eval?target=xxx" -d 'document.title'

# 点击元素
curl "http://localhost:3456/click?target=xxx" -d 'button.submit'

# 截图
curl "http://localhost:3456/screenshot?target=xxx"
```

### CDP Proxy vs MCP chrome-devtools vs Puppeteer

这三者都能操作浏览器，但定位不同：

| 特性         | CDP Proxy          | MCP chrome-devtools | Puppeteer     |
| ------------ | ------------------ | ------------------- | ------------- |
| **浏览器**   | 复用日常 Chrome    | 独立新实例          | 独立新实例    |
| **登录态**   | ✅ 天然携带        | ❌ 需重新登录       | ❌ 需重新登录 |
| **实例冲突** | ❌ 无              | ⚠️ 可能冲突         | ❌ 无         |
| **调用方式** | HTTP API           | MCP 工具            | Node.js API   |
| **适用场景** | 日常抓取、复用登录 | 隔离环境            | 自动化测试    |

### 为什么 web-access 优先用 CDP Proxy？

```
场景1：抓取需要登录的网站
────────────────────────
CDP Proxy ✅ → 复用已登录的 Chrome，直接访问
MCP/Playwright ❌ → 需要重新登录，甚至处理验证码

场景2：同时操作多个网站
────────────────────────
CDP Proxy ✅ → 在不同标签页操作，共享登录态
MCP ❌ → 可能产生实例冲突

场景3：需要隔离环境（测试、多账号）
────────────────────────
CDP Proxy ❌ → 会影响日常 Chrome
MCP/Playwright ✅ → 独立实例，互不影响
```

### CDP 的工作流程

![](https://cdn.paicoding.com/paicoding/73ed19103effab988ef8fbd5aa484613.png)

理解了 CDP，我们就能理解 web-access 为什么能做到“像人一样浏览网页”，它不是在模拟浏览器，而是在真正地控制 Chrome。

## ending

说真的，用了 web-access 之后，我对“Agent 联网”这件事的理解变了。

以前觉得 Agent 联网就是搜索引擎加网页抓取，搜到什么算什么，抓到什么看什么。现在才意识到，真正的联网应该是像人一样浏览——打开浏览器，翻页面，点链接，读内容，遇到障碍想办法绕过去。

web-access 做的就是这件事。它不是给 Agent 装了一个搜索引擎，而是给 Agent 装了一个浏览器，还教会它怎么用。

1.8K Star 不是没有道理的。这玩意确实好用。

![](https://cdn.paicoding.com/stutymore/web-access-skill-review-20260327190834.png)

如果你也在用 Claude Code 或者 Codex，强烈建议装上试试。装之前觉得“联网搜搜就行了”，装之后你会发现原来 Agent 能做的事情多得多，帮你做竞品调研、帮你抓社交媒体的用户反馈、帮你监控网页变更、帮你提交表单。

这才是 Agent 该有的样子。

**【好的工具不是让你多一个功能，而是让你少操一份心。】**

我们下期见。

