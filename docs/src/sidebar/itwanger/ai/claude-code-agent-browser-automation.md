---
title: Top 3热门Claude Code浏览器Agent，我试了个遍，发现真的强得离谱！
shortTitle: Claude Code 浏览器自动化方案
description: 本文详细介绍了使用 Claude Code + Agent Browser 实现技术派自动化发文的完整方案，对比了 Agent Browser、DevTools MCP 和 Playwright MCP 三种浏览器自动化方案的优缺点，分享了选择 Agent Browser 的原因以及实战踩坑经验。
tag:
  - Claude Code
  - Agent Browser
  - 浏览器自动化
category:
  - 技术文章
author: 二哥
date: 2026-01-29
---

大家好，我是二哥呀。

今天在研究 Claude Code 的自动化能力时，我想到了一个特别有意思的需求：能不能用 Claude Code 直接把我写好的文章自动发布到技术派网站上?

这可不是简单的 HTTP 请求就能搞定的，需要登录、填写表单、上传图片、预览、发布，一整套浏览器操作流程。

![](https://cdn.paicoding.com/stutymore/claude-code-agent-browser-automation-20260129201721.png)


讲真，这个需求一抛出来，我心里就犯嘀咕：Claude Code 虽然能写代码、读代码、改代码，但浏览器自动化这种强交互场景，它能搞定吗？

结果试了一圈之后，我发现了一个宝藏工具：Agent Browser。
不仅完美解决了我的自动发文需求，而且比传统的 Playwright 方案省了大约 90% 的 tokens。

![](https://cdn.paicoding.com/stutymore/claude-code-agent-browser-automation-20260129201443.png)

今天这篇文章，我就把这个方案从头到尾给大家梳理一遍，让你看看 Claude Code + Agent Browser 到底有多强。

## 01、浏览器自动化方案对比

在正式上手之前，我先调研了一下目前主流的浏览器自动化方案，主要有三种:

### DevTools MCP

这是Google官方提供的浏览器调试方案，通过 Chrome DevTools Protocol 来控制浏览器。

![](https://cdn.paicoding.com/stutymore/claude-code-agent-browser-automation-20260129202122.png)

优点是和 Chrome 集成得很好，调试起来很方便。

### Playwright MCP

Playwright 是微软推出的浏览器自动化框架，这个 MCP 方案就是把它封装成了 Claude Code 可以调用的工具。

![](https://cdn.paicoding.com/stutymore/claude-code-agent-browser-automation-20260129202234.png)

Playwright 的能力很强，支持 Chrome、Firefox、Safari 多种浏览器，API 也非常完善。

### Agent Browser

这是 Vercel Labs 推出的浏览器自动化工具，也是我最终选择的方案。

![](https://cdn.paicoding.com/stutymore/claude-code-agent-browser-automation-20260129202606.png)

它最大的创新在于使用了 snapshot-based references 机制。简单说，就是它会给页面上的每个可交互元素打上一个引用标签，比如 @e1、@e2，你只需要告诉它"点击 @e1"，它就能精准定位，不需要知道具体的 DOM 选择器。

![](https://cdn.paicoding.com/stutymore/claude-code-agent-browser-automation-20260129202514.png)

这种方式不仅稳定，而且 token 消耗极低。同样的登录操作，Agent Browser 只需要 500 tokens 左右，比 Playwright 节省了 90%。

而且 Agent Browser 还支持 Agent Mode，可以通过结构化的命令控制浏览器，非常适合和 Claude Code 配合使用。

## 02、Agent Browser 的安装和配置

Agent Browser 的安装非常简单，它是一个 npm 包，直接全局安装就可以了:

```bash
npm install -g @agent-browser/cli
```

安装完成后，可以用 `agent-browser --help` 查看所有可用命令。

使用 `agent-browser open paicoding.com` 打开一个网页，`agent-browser snapshot` 可以获取当前页面的可交互元素引用。

![](https://cdn.paicoding.com/stutymore/claude-code-agent-browser-automation-20260129202954.png)

核心的工作流程就四个步骤:

1. `agent-browser open <url>` - 打开网页
2. `agent-browser snapshot -i` - 获取页面的可交互元素及其引用(@e1、@e2...)
3. `agent-browser click @e1` 或 `fill @e2 "text"` - 通过引用操作元素
4. 重复步骤 2-3，直到完成所有操作

这个流程看起来很简单，但有一个非常重要的细节：每次页面变化后（比如点击按钮跳转、填写表单提交），都需要重新执行 snapshot 获取新的元素引用。

![](https://cdn.paicoding.com/stutymore/claude-code-agent-browser-automation-20260129203459.png)

因为这个细节，我一开始踩了不少坑，后面会详细讲。

## 03、技术派自动发文实战

好，原理讲完了，我们直接上实战。

我们的目标是：用 Claude Code 控制 Agent Browser，完成技术派的登录、文章创建、填写内容、发布的全流程。

![](https://cdn.paicoding.com/stutymore/claude-code-agent-browser-automation-20260129203627.png)

首先，我需要明确一下技术派的发文流程:

1. 打开登录页面
2. 输入账号密码，点击登录
3. 进入文章管理页面，点击新建文章
4. 填写标题、分类、标签、正文
5. 点击发布

这个流程看起来不复杂，但真正实现起来有很多细节要注意。

### 步骤 1：实现登录逻辑

我先实现登录功能，这是整个流程的第一步。

在 Claude Code 中输入:

```
帮我用 agent-browser 打开技术派的登录页面,然后填写账号密码登录
```

Claude Code 会自动调用 Bash 工具执行 agent-browser 命令。

![](https://cdn.paicoding.com/stutymore/claude-code-agent-browser-automation-20260129203847.png)

首先打开登录页面：

```bash
agent-browser open https://paicoding.com/login
```

然后获取页面元素：

```bash
agent-browser snapshot -i
```

这个命令会返回页面上所有可交互元素的引用，比如：

```
@e1: 输入框 - username
@e2: 输入框 - password
@e3: 按钮 - 登录
```

接着填写账号密码：

```bash
agent-browser fill @e1 "myusername"
agent-browser fill @e2 "mypassword"
agent-browser click @e3
```

![](https://cdn.paicoding.com/stutymore/claude-code-agent-browser-automation-20260129204105.png)

我这里已经登录了，所以Agent找不到登录按钮，哈哈哈。

### 步骤 2:保存登录会话

Agent Browser 提供了会话保存功能，可以把登录后的 cookies 保存下来，下次直接使用。

保存会话:

```bash
# 获取当前 cookies
agent-browser cookies get

# 保存到文件
agent-browser cookies save ~/.paicoding-state.json
```

下次使用时直接加载:

```bash
agent-browser --state ~/.paicoding-state.json open https://paicoding.com
```

这个功能特别实用，我后续的所有操作都是基于这个已登录的会话，省去了重复登录的麻烦。

命令行操作浏览器最大的困惑也是这个，记不住Cookie，这样很多内容是没法查看的，因为网站的很多内容都需要登录才能查看。

### 步骤 3:发表文章并填写基本信息

登录问题解决后，接下来就是发表文章了。直接一句话搞定:

>把这篇文章kuaishou-year-end-bonus发表到技术派吧

![](https://cdn.paicoding.com/stutymore/claude-code-agent-browser-automation-20260129204820.png)

Claude Code 会生成一系列 agent-browser 命令，比如说找到"新建文章"按钮，点击它:

```bash
agent-browser open https://paicoding.com/admin/articles
agent-browser snapshot -i
agent-browser click @e4  # 假设 @e4 是新建文章按钮
```

接着点击【导入MD】按钮，上传文章文件:

```bash
agent-browser snapshot -i
agent-browser click @e5  # 假设 @e5 是导入MD按钮
agent-browser upload @e6 "/path/to/kuaishou-year-end-bonus.md"
```

接着就是把内容、标题、分类、标签、摘要这些信息填写完整:

```bash
agent-browser snapshot -i
agent-browser fill @e7 "文章标题"
agent-browser fill @e8 "文章摘要"
agent-browser select @e9 "分类名称"
agent-browser fill @e10 "标签1, 标签2"
```

![](https://cdn.paicoding.com/stutymore/claude-code-agent-browser-automation-20260129205256.png)

![](https://cdn.paicoding.com/stutymore/claude-code-agent-browser-automation-20260129205754.png)

![](https://cdn.paicoding.com/stutymore/claude-code-agent-browser-automation-20260129205904.png)

![](https://cdn.paicoding.com/stutymore/claude-code-agent-browser-automation-20260129210845.png)

到这一步，整个自动发文流程就完成了。

## 04、总结的 Skill 经验

为了把这个自动化能力固化下来，我决定创建一个 Claude Code 的 Skill。

直接告诉 Claude Code，把我们的经历总结成Skills就好了，他就会调用我们之前分享的 `/create-skill` 工具。

在 `.claude/skills/` 目录下创建 `paicoding-publish` 文件夹，然后创建 `SKILL.md` 文件:

```markdown
# PaiCoding 自动发布 Skill

## 功能描述
自动化将 Markdown 文章发布到技术派网站的 Skill。

## 前置条件
- 已安装 agent-browser: `npm install -g @agent-browser/cli`
- 技术派账号配置在环境变量中
- 文章文件路径作为参数传入

## 工作流程
1. 使用 agent-browser 打开技术派登录页
2. 通过 snapshot 获取登录表单的元素引用
3. 填写账号密码并登录
4. 进入文章管理页,点击新建文章
5. 填写文章信息并发布
```

![](https://cdn.paicoding.com/stutymore/claude-code-agent-browser-automation-20260129211015.png)

![](https://cdn.paicoding.com/stutymore/claude-code-agent-browser-automation-20260129211222.png)

通过这次实战，我总结了一些关于编写 Claude Code Skill 的经验，希望能帮到大家。

### 经验 1:命令之间要考虑异步等待**

浏览器自动化涉及大量网络请求和页面渲染，大部分操作都是异步的。

在编写 Skill 时，每个命令之间要考虑是否需要等待。可以使用 sleep 命令，或者利用 Agent Browser 的等待机制。

### 经验 2:使用 snapshot 而不是硬编码选择器

不要在 Skill 中硬编码 DOM 选择器，比如 `#username`、`.submit-button` 这种。

页面的结构随时可能变化，硬编码的选择器很容易失效。

应该每次操作前都执行 snapshot，获取动态的元素引用，这样即使页面结构调整，脚本也能正常工作。

### 经验 3:会话管理很重要

对于需要登录的系统，一定要做好会话管理。

可以在 Skill 的说明文档中指导用户保存会话文件，或者在 Skill 内部自动保存和加载会话。

这样可以避免每次都要重新登录，提升用户体验。

### 经验 4:错误处理和重试机制

浏览器操作很容易失败，比如网络超时、元素未找到、页面加载缓慢等。

在 Skill 中要加入适当的错误处理和重试机制，比如:

```bash
# 重试逻辑
for i in {1..3}; do
  agent-browser snapshot -i && break
  sleep 1
done
```

这样可以大大提高 Skill 的稳定性。

### 经验 5:提供清晰的步骤说明

Skill 的文档要写清楚每一步在做什么，为什么这么做。

这样用户不仅能使用 Skill，还能理解背后的原理，遇到问题时也能自行排查。

## 05、ending

真心话，Claude Code + Agent Browser 这个组合，比我想象中要强大得多。

一开始我觉得浏览器自动化这种强交互场景，AI 肯定搞不定。结果试了之后发现，只要工具选对了，AI 不仅能做，而且能做得很好。

Agent Browser 的 snapshot-based references 机制，完美规避了传统自动化工具的脆弱性，而且 token 消耗极低，这在大模型时代特别重要。

我这次实现的自动发文 Skill，从调研方案到落地完成，大概花了一天时间。但这个 Skill 一旦写好，后面每次发文就是几分钟的事情，效率提升非常明显。

还没有体验过 Claude Code 的同学，可以抓紧时间试一试了。浏览器自动化、文件操作、代码重构，这些场景它都能轻松应对。

如果你也有类似的自动化需求，不妨试试用 Claude Code + Agent Browser 来实现，说不定会有意想不到的收获。

如果这篇内容对你有用，记得点赞、转发，让更多人看到。

我们下期见!
