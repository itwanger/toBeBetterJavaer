---
title: 再见了 WebUI，DeepSeek 桌面版真不错。
shortTitle: DeepSeek Harness 桌面版实测
description: DeepSeek Harness 桌面版实测，源码拆解桌面版和 WebUI 的区别、自动更新与登录机制，讲清 DSH 一切皆插件的插件机制，并推荐 better-sidebar、dsh-TUI 等插件。
keywords: DeepSeek Harness, DSH 桌面版, DSH 插件, DeepSeek V4.1 Flash, dsh-TUI
tag:
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-09-28
---

大家好，我是二哥呀。

从藏师傅那里看到了 DeepSeek Harness 桌面版的安装地址，顺手就装上了。

并且装上的那一刻，会自动升级到 v0.1.7-rc.2 版本。

![](https://cdn.paicoding.com/paicoding/5ff8f2c816cfe6b964c6c97886e9cccc.png)

这样就再也不用在Chrome浏览器里使用WebUI版本了，爽啊。

对于一套Harness来说，终端里跑起来，再在浏览器里使用，总有点不爽的感觉。

![](https://cdn.paicoding.com/stutymore/sucai-20260928102439.png)

如果你还没有的话，我把 Windows和 macOS 的下载链接放到这个链接了（官方毕竟还没有公开，所以不喜欢尝鲜的小伙伴可以暂时跳过，不着急，可以先安装后面推荐的几个官方都在推荐的插件，很惊艳）。

>https://paicoding.com/dsh-desktop-download

还支持登录。

![](https://cdn.paicoding.com/stutymore/sucai-20260928102544.png)

这样的话，未来不知道会不会有云端的版本。

一些不需要在本地工作的，可能就真的可以移动端、桌面端、云端同步。

想想还是挺期待的。

说一说我的AI员工吧。

编程主力仍然是Codex+GPT-6 Astra，包括绘图做视频。

文本主力是Claude Code+Opus 5.5。

三号员工就是DeepSeek Harness+DeepSeek V4.1 Flash了。

我个人还是喜欢DeepSeek，性价比高，还不用买Token plan，用多少算多少，关键是速度贼快。

文本能力和编程能力也都在线，作为三号员工，是绰绰有余！

## 01、DSH 插件推荐

接下来，再给大家推荐几个官方都认可的DeepSeek Harness插件。

### ①、DSH-better-sidebar

为 DeepSeek Harness 添加了侧边栏、底边栏、分栏、可浮动栏等 UI 定制化能力。

属于为其他插件提供基础能力的底座插件。

![](https://cdn.paicoding.com/stutymore/sucai-20260928103824.png)

安装方法也很简单。

```
帮我安装 dsh-better-sidebar 插件，地址：https://github.com/omdsh-dev/DSH-better-sidebar
```

![](https://cdn.paicoding.com/stutymore/sucai-20260928104111.png)

虽然官方的安装方法只支持WebUI版本，但DeepSeek V4.1 Flash显然有桌面版安装的能力，直接就自己搞定了。

![](https://cdn.paicoding.com/stutymore/sucai-20260928104750.png)

打开设置也能看到插件安装成功了。

![](https://cdn.paicoding.com/stutymore/sucai-20260928104924.png)

我们还可以在右侧重新打开一个窗口，左侧窗口的上下文是会自动注入的。

![](https://cdn.paicoding.com/stutymore/sucai-20260928105057.png)

喜欢开多窗口工作的小伙伴可以体验一下，我个人还是非常喜欢这个插件的。

### ②、dsh-TUI

内测期就一直跟版本打磨的终端界面，补的是官方缺的 TUI。喜欢键盘、SSH、远程、不想开浏览器的小伙伴，这个比一堆皮肤更有用。

![](https://cdn.paicoding.com/stutymore/sucai-20260928105401.png)

>https://dshtui.com/

而且更新速度也能跟得上官方的速度。

装上之后，像素鲸鱼顶栏、实时工作状态行、思考流式展开、终端图片预览（Sixel / Kitty）、双击 Esc 时间回溯、蓝白上下文进度条 + TPS 仪表，就都有了。

安装方法也很简单。

>帮我安装这个：https://dshtui.com/

![](https://cdn.paicoding.com/stutymore/sucai-20260928105717.png)

官方提供了多种安装方式，DSH 会自动帮我们做出最优选择。

![](https://cdn.paicoding.com/stutymore/sucai-20260928105937.png)

整体设计我觉得还是挺漂亮的，是我喜欢的风格。

### ③、DeepSeek Harness 插件库

如果你还想尝试更多，可以试试这个 `https://deepseek-harness-plugin.com/zh-CN/`

![](https://cdn.paicoding.com/stutymore/sucai-20260928110615.png)

当然了，对于插件，我个人觉得也没必要装太多，够用就行了，太花里胡哨也就偏离了 Agent 的本质。

随着模型能力的提升，一部分Skills、MCP、插件能力都会被吃掉。

就像 Memory 这块，我认为官方的做法一定就是最优解，千万别装什么第三方的 Memory 插件。

## 02、桌面版和 WebUI 的差别

装完桌面版，我第一反应是好奇，DeepSeek 是不是专门为桌面端重写了一套界面？

我把 DeepSeek Harness 的源码拉到本地，翻了翻 `apps/desktop` 这个目录，发现没有重写。

桌面版用 Electron 打包，主窗口加载的就是完整的 WebUI 页面。启动时，Electron 会以 Node 模式拉起一个子进程，子进程里跑的是 `dsh web` 背后那套本地服务，只是端口从 3080 换成了 19387。窗口里发出的请求，都转给这个本地服务处理。

![](https://cdn.paicoding.com/stutymore/deepseek-harness-desktop-20260928131047.png)

也就是说，Agent 还是那个 Agent，界面也还是那个界面。我们原来要在终端里执行 `pnpm dsh web`，再去浏览器里打开链接，这两步现在由桌面版替我们做了。

那桌面版多了什么？

最明显的是自动更新。网页没办法替自己换掉本地的程序，桌面版可以。更新模块（`apps/desktop/src/update-coordinator.ts`）用的是 electron-updater，通道固定为 nightly，允许安装预发布版本。它每 10 分钟检查一次，时间上加了一点随机抖动，检查失败就退到一小时一次。有新版本也不会自动下载，要我们点了才下。外壳、Agent 运行时和 pnpm 作为一个签过名的整体一起更新。

```ts
this.updater.autoDownload = false
this.updater.autoInstallOnAppQuit = false
this.updater.channel = 'nightly'
this.updater.allowPrerelease = true
// Selecting a channel can enable downgrade in electron-updater.
this.updater.allowDowngrade = false
```

关掉窗口后任务会继续跑，真要退出时如果还有任务没跑完，桌面版会弹窗提醒。长任务丢给它，窗口一关就可以去干别的。

运行环境也省心。桌面版自带 Python（带 numpy、pandas 和处理 Word、PPT、Excel 的库）、Node 和 pnpm，还默认注册了 Office 相关的 Skills。让它做个表格、改个 PPT，不用先在本机装一堆依赖。侧边栏里的内置浏览器，桌面版默认打开。

还有一点平时感觉不到，但我觉得挺讲究。WebUI 其实就是一个本地 HTTP 服务，只监听 127.0.0.1，每次启动会生成一个随机 token 放在链接里。浏览器第一次访问时拿 token 换一个 HttpOnly 的 cookie，之后每个请求还要校验 Host 和 Origin，防止别的网站借我们的浏览器去调用本地 Agent。桌面版把凭证挂在自己的主窗口上，页面拿不到文件系统、shell 和底层 IPC。

再说登录。桌面版登录用的是 DeepSeek 开放平台的账号，走标准的 OAuth PKCE 流程，点登录会打开系统浏览器授权，授权完成后由本地回调接收。登录令牌存在 `~/.dsh/.credentials.yaml`，文件权限是 0600，只有当前用户能读，还没有接入系统钥匙串。

![](https://cdn.paicoding.com/stutymore/deepseek-harness-desktop-20260928131617.png)

登录之后，模型列表里多了一套账号模型，推理直接扣账号余额，和 API Key 那套入口是分开的，余额、用量、充值页面也都嵌进了应用。rc.2 还专门修了一个问题，额度提醒会跟着当前任务的计费方式走，用 API Key 的小伙伴不会被提示去给登录账号充值。

## 03、Everything is a Plugin

回到插件。前面装 better-sidebar 的时候提过，官方安装方法只支持 WebUI。

```ts
function rejectElectronProfile(program: Command, profile: string): void {
  if (profile.toLowerCase() === 'desktop') {
    program.error('error: profile "desktop" is managed exclusively by the Electron application')
  }
}
```

名叫 desktop 的配置只归 Electron 应用管，命令行不许碰。

要看懂这段检查，得先知道 DSH 的插件是什么。

DeepSeek Harness 仓库的简介只有一句话，Everything is a Plugin，一切皆插件。在源码里这是字面意思，Agent loop、工具注册表、会话日志、上下文压缩、Sub-agent 都是插件，连 Skills 的加载和 MCP 客户端也是两个普通插件。

DSH 的插件建立在 Cordis 这个框架上。一个插件就是一个导出 `apply(ctx)` 函数的模块，用 `inject` 声明自己依赖哪些服务。better-sidebar 的服务端部分就声明了 webServer、sessions、webRuntime、tools 这四个依赖，DSH 把这些服务准备好之后才会加载它。

![](https://cdn.paicoding.com/stutymore/deepseek-harness-desktop-20260928133012-a85f4121.png)

发布的时候，插件要打成一个 npm 包，官方叫 bundle。package.json 里有一个 `dsh` 字段，指向一个 `cordis.patch.yml` 文件，文件里写着要往插件列表里加哪几行。DSH 启动时先加载基础 bundle，再依次叠加各个 bundle 自带的 patch、profile 目录里的 patch，最后是用户目录下的 patch。

插件装在 profile 里。profile 就是一套独立的配置目录，WebUI 用 `~/.dsh/profiles/web`，桌面版用 `~/.dsh/profiles/desktop`。两边的会话、设置和登录凭证是共享的，插件不共享。

![](https://cdn.paicoding.com/stutymore/deepseek-harness-desktop-20260928131915.png)

有一件事大家一定要知道，DSH 的插件没有沙箱。

插件的服务端代码直接跑在 Agent 宿主进程里，在工作区沙箱之外，权限和 DSH 本身一样。桌面版上，宿主和所有插件共用同一个 Electron Node 进程；插件的页面部分和应用在同一个页面里运行，没有 iframe 隔离。官方的 SAFETY.md 专门提醒过，不要装来路不明的插件。

| | 插件 | Skill | MCP |
|---|---|---|---|
| 形式 | npm 包，JS 代码 | SKILL.md 说明文件 | 外部进程或 HTTP 服务 |
| 安装 | 命令行、插件页、插件管理工具 | 放进 skills 目录，自动热加载 | 在 cordis.patch.yml 里加一行配置 |
| 权限 | 和宿主相同 | 只是注入的提示词 | 沙箱外的可执行程序，默认一个都不开 |

## 04、插件是怎么接进来的

对于 better-sidebar 来说。服务端在 DSH 的 Web 服务上注册了一组 HTTP 接口和两个 WebSocket，一个推送 Agent 打开文件的事件，一个监听文件变化；还给模型加了一个可选的 `sidebar_open` 工具，Agent 可以主动把文件在侧边栏里打开。页面把按钮和卡片挂进 DSH 预留的界面插槽，比如会话头部的工具栏和设置页。

![](https://cdn.paicoding.com/stutymore/deepseek-harness-desktop-20260928133246-4bbd05b9.png)

前面说右侧窗口会自动注入左侧的上下文，对应的是它的 Side Chat 功能。点击的那一刻，插件会新建一个子会话，把父会话截至这一刻的完整事件日志复制过去。

由于复制的是完整事件日志，所以子会话拿到的上下文和父会话完全一致。

![](https://cdn.paicoding.com/stutymore/deepseek-harness-desktop-20260928133414-980b108b.png)

dsh-TUI 和 DSH 之间没有走 HTTP 或 WebSocket，它本身就是跑在 DSH 进程里的一组插件。

第一次运行 `dsh-tui` 时，启动器会执行 `dsh plugin --profile dsh-tui add ...`，建一个名叫 dsh-tui 的 profile 把自己装进去，然后用这个 profile 启动 DSH。它的 patch 文件替换了基础 bundle 里的几行，包括系统提示词、DeepSeek 模型适配和 Agent loop，再挂上用户提问、用户审批和它自己的界面插件。界面用 React 写，渲染器是 fork 过来的 Ink，最后输出在终端上。

![](https://cdn.paicoding.com/stutymore/deepseek-harness-desktop-20260928133632-3b78454b.png)

DSH 官方目前没有单独的长期记忆工具。跨会话能带过去的，主要是指令文件，`~/.dsh/AGENTS.md` 加上项目里的 AGENTS.md、CLAUDE.md，会在第一次请求时作为一条用户消息注入，总预算 65536 字节。

单个会话之内，靠的是存在 `~/.dsh/sessions` 下的 JSONL 会话日志和上下文压缩，快满了自动压缩，也能手动执行 `/compact`。想借用另一个会话的内容，可以在 WebUI 里 @ 那个会话，把它的只读快照带进来。源码里其实有一个会话搜索工具（session_search），但目前没有在任何内置预设里启用。

![](https://cdn.paicoding.com/stutymore/deepseek-harness-desktop-20260928133839-ef65ff41.png)

## ending

说说我最真实的感受。

![](https://cdn.paicoding.com/stutymore/deepseek-harness-desktop-20260928134010-2ee257f7.png)

桌面版的界面和 WebUI 几乎一样。自动更新、关窗口不打断任务、自带 Office 运行环境，这几样 WebUI 给不了。**桌面版补上的，是一个 Agent 常驻在本机需要的那些能力。**

期待官方正式发布更新啊。

我们下期见。
