---
title: 阿里正式官宣开源，有点猛啊！
shortTitle: CoPaw+通义优化README实测
description: 阿里开源了桌面Agent工具CoPaw，支持钉钉、飞书等平台接入。我用钉钉接入CoPaw，结合通义千问 Coding Plan，把paigit中paicoding项目的README从单调的文本，优化成了带徽章、图标、表格的现代化文档。全程只用了3次对话，效果惊艳。
tag:
  - Agent
  - CoPaw
  - 通义千问
  - README优化
category:
  - AI
author: 沉默王二
date: 2026-03-02
---

大家好，我是二哥呀。

阿里正式开源了他们家的 OpenClaw——CoPaw，我在本地实测了一个多小时，效果还不错。

作为大家的求职工具人，我认为开源的最大好处不是二次开发，而是我们可以基于这个项目进行学习，然后写到简历上，作为求职的一个加分项。

和 OpenClaw 一样，CoPaw 也支持本地模型、Skills 和 IM，包括钉钉、飞书和 QQ。

![](https://files.mdnice.com/user/3903/c814bebe-0a4c-411e-a103-02b9993b99a9.png)

接下来，我会手把手教大家在本地部署，并且用它来完成新开的一个源码管理平台 PaiGit 的项目 readme 优化。

> 系好安全带，我们发车。

## 01、PaiGit 是什么？

我之前的项目源码是托管在 GitCode 的，但这玩意比较坑的是，组织配额只有 2000 人，并且不支持扩展，导致后续申请的小伙伴都没办法拿到源码权限了。

![](https://files.mdnice.com/user/3903/edc10587-fdd1-4be0-86c2-6334c46aadba.png)

于是我就萌生了一个大胆的项目，直接自己开发一个不就行了嘛。

说干就干，经过 2 个小时的开发，雏形基本上已经有了。一个 Agent 设计骨架，负责代码编写，一个 Agent 负责测试，速度真的飞快，可能都没有 2 个小时。

![](https://files.mdnice.com/user/3903/e5747d04-d3c0-44cc-ab5f-603977c8a1d2.png)

功能类似 GitCode，可以从 GitHub 导入项目，然后提供 README 展示、代码浏览、Issue 管理、AI 生成 Wiki 等功能。

技术栈是 SpringAI + Next.js，MySQL 来负责存储，JGit 来负责代码的展示等。

不过 readme 的展示效果不如预期，像网址都没有 URL 的效果，整体排版很一般。

![](https://files.mdnice.com/user/3903/e827e15e-795b-4a82-b7ec-f57309078fe5.png)

正好阿里的 CoPaw 开源了，我就想试试：**能不能用 CoPaw 帮我优化 README 的展示？**

配合通义千问的 Coding Plan 套餐，来看看 CoPaw+通义千问能把前端美化到什么样的程度。

## 02、CoPaw 是什么？

官方对 CoPaw 的介绍是：你的 AI 个人助理；安装极简、本地与云上均可部署；支持多端接入、能力轻松扩展。

![](https://files.mdnice.com/user/3903/d7604673-5283-46c6-b1eb-609f2096e330.jpg)

GitHub 的 star 飙升速度很快，2 天时间已经有 3.4k 了。CoPaw 的功能基本上和 OpenClaw 类似，我简单给大家介绍下。

### 第一，原生支持钉钉、飞书等聊天工具。

这是各种 Claw 爆火的最大原因。

比如说，你人在南极，可以在飞书群聊、私聊里直接@你的 Claw，让它帮你干活。

当然了，南极不一定有信号 😄。

![](https://files.mdnice.com/user/3903/fd84e704-d9af-42ac-978e-b9bf1cbb937b.jpg)

这种方式的好处是：**便利**。

电脑在家里躺着，还得 24 小时待机帮你干活，你是轻松了，电脑却更累了。像极了牛马的我，呜呜呜～

### 第二，主动心跳机制。

CoPaw 内置了定时任务调度系统，不仅能被动响应你的需求，还能主动完成一些任务。

比如：

- 定时查看邮件，提醒你有新邮件
- 定时整理待办事项，提醒你今天有哪些任务
- 定时检查项目更新，同步最新的代码变更

这种主动式 Agent 的设计，也是 claw 的标配了。主动提醒、主动执行。

![](https://files.mdnice.com/user/3903/2955429d-a1f7-44ff-a115-b8eaa2f31561.png)

## 03、如何部署 CoPaw

在正式开始实测之前，先教大家如何部署 CoPaw。

### 第一步：安装 CoPaw

CoPaw 提供了一键安装脚本，非常简单：

```bash
curl -fsSL https://copaw.agentscope.io/install.sh | bash
```

![](https://files.mdnice.com/user/3903/2c3415c8-0b19-471b-8a56-e8469cbf8bcd.png)

完成安装后，可以通过 `copaw init --defaults` 初始化。

![](https://files.mdnice.com/user/3903/f5027dac-2563-4189-8ae4-4f18c2216297.jpg)

使用 `copaw app` 启动 CoPaw。

![](https://files.mdnice.com/user/3903/08fe7871-4502-46d0-ba7e-076b6f1df59b.png)

很遗憾，我这里报错了。直接启用 qodercli，然后让它来启动并解决问题试试看。

![](https://files.mdnice.com/user/3903/b1202903-3e8d-4048-8187-cead83844a79.png)

OK，问题不大。

![](https://files.mdnice.com/user/3903/18dd4707-378c-4435-ac66-8d206ae899a8.png)

直接访问 Web 界面，已经能看到了。

![](https://files.mdnice.com/user/3903/a4d5fef7-942b-4921-8f9b-a8a0ef82b1ea.jpg)

### 第二步：配置通义千问 API Key

进入设置 → 模型这里，选择阿里云 coding plan 套餐。

![](https://files.mdnice.com/user/3903/655e80f2-3ed4-471a-ab50-5d773e9e524c.jpg)

填写 API Key。

![](https://files.mdnice.com/user/3903/87a3b6b2-3764-438f-adff-105e85287909.png)

通义千问的 API Key 可以在阿里云百炼平台（[https://bailian.console.aliyun.com/](https://bailian.console.aliyun.com/)）获取。

如果你订阅了通义千问的 Coding Plan，LLM 配置这里提供商默认为 coding plan，模型为 Qwen3.5-Plus，点击保存。

![](https://files.mdnice.com/user/3903/f6f19d3d-10e7-476a-b0e3-975c20623632.png)

### 第三步：配置钉钉接入

CoPaw 支持钉钉机器人接入，配置步骤如下：

### 1. 创建钉钉机器人

钉钉机器人的申请可以到钉钉开放平台申请。

![](https://files.mdnice.com/user/3903/bda4921a-49a2-49ee-887f-d5915c5e2648.jpg)

**2. 配置 CoPaw 钉钉频道**

进入控制 → 频道，选择钉钉。

![](https://files.mdnice.com/user/3903/13530978-dc56-4f3a-a8e4-be93e2674180.png)

把钉钉机器人的 id 和密钥填进来。

![](https://files.mdnice.com/user/3903/11b4ca5c-dfde-4c2e-9dbd-f32906f916e0.png)

**3. 启动 CoPaw**

忘记配置完成后需不需要重新启动了。如果配置通过，打开钉钉，找到机器人。

![](https://files.mdnice.com/user/3903/959225d0-d1d3-49aa-aad5-dac8fae05d54.png)

### 第四步：验证配置

发一条测试消息：

```
你好，请自我介绍一下
```

如果 CoPaw 回复了，说明配置成功！

![](https://files.mdnice.com/user/3903/0d4bcba8-245f-4119-89b8-dd140b11abd3.png)

![](https://files.mdnice.com/user/3903/ffabe4f6-c920-4016-8e07-b70811239ccf.png)

整个部署过程，从安装到配置完成，大概 5 分钟就能搞定。

如果你遇到问题，也可以评论区留言，我会尽量解答。

## 04、实测：用钉钉+通义千问优化 README

好了，理论讲完了，直接上手试试。

> 能看到/Users/itwanger/Documents/GitHub/paigit 这个目录吗

CoPaw 很快就回复了，能看到。

![](https://files.mdnice.com/user/3903/db150145-d56d-4e4b-bbaa-eb96af681873.png)

好，上我们的需求：**PaiGit 已经可以导入 GitHub 开源项目了，但 README 展示的还不够完美，尤其是链接都没有下划线，鼠标放上去倒是可以点击**。

CoPaw 很快回复了：

用户说 PaiGit 项目可以导入 GitHub 开源项目了，但 README 展示不够完美，特别是链接没有下划线，鼠标放上去可以点击。
这听起来像是一个前端显示问题。让我先看看 README.md 的内容，了解一下项目是做什么的，然后再看看前端代码中关于链接显示的部分。

![](https://files.mdnice.com/user/3903/14e42eb3-6881-47db-875c-6624accd1f53.png)

接着回复：问题找到了！README 中的链接没有下划线是因为 react-markdown 渲染的 Markdown 内容缺少对应的 CSS 样式。prose 类是来自 @tailwindcss/typography 插件的，但看起来项目可能没有正确配置或者需要手动添加链接样式。

![](https://files.mdnice.com/user/3903/d529f3de-d1f6-44ba-a74c-edf578a857e6.png)

最后回复我已经修复了 README 中链接没有下划线的问题。
修改内容：在 paigit-web/src/app/globals.css 中添加了 Markdown 链接的样式。

![](https://files.mdnice.com/user/3903/40f2f5e6-b2c1-456c-a3c6-9824789a2136.png)

好，我们来看看优化的效果。

![](https://files.mdnice.com/user/3903/5ceed0c0-71c4-4689-8c93-d0aeb73597be.jpg)

嗯，不错，果然有了呀。

还有其他的问题，比如说在代码的 tab 下，我点击某一个代码，显示空目录，应该这时候可以查看源码才对。

![](https://files.mdnice.com/user/3903/563707a0-4ee8-43ef-a248-f7e787626c22.png)

![](https://files.mdnice.com/user/3903/b7e37b36-ee11-479e-bf0f-42e473fd0175.png)

OK，发现问题了：在 getFileTree 方法中，当访问一个文件（而不是目录）时，逻辑有问题。

![](https://files.mdnice.com/user/3903/f4d2901b-d460-4e6b-9302-dc1bc0262dfe.png)

来看一下，完美修复。

![](https://files.mdnice.com/user/3903/f401fe06-f4e6-4fcc-8ece-8e44a5480860.png)

整个过程，我只在钉钉里发消息。

从提出需求，到分析问题，到生成代码，到最终优化，完全由 CoPaw 来完成。

我连 IDE 都没打开。这就是龙虾的真正威力啊。

## 04、CoPaw 的技术架构

实测完之后，我去研究了一下 CoPaw 的技术架构。

它的核心设计理念是：**模块化 + 插件化**。

![](https://files.mdnice.com/user/3903/8a484cee-b431-4267-930a-72ca5ad76930.jpg)

**Prompt、Hooks、Tools、Memory 等核心组件都是解耦的**。

开发者可以独立替换或扩展任意模块，按需组装自己的 Agent。

比如你可以：

- 替换 Prompt 模板，让它更符合你的风格
- 添加自定义 Tools，让它能调用你的 API
- 扩展 Memory 模块，接入你的数据库

**频道管理也是插件化的**。

CoPaw 原生支持钉钉、飞书、QQ、Discord、iMessage 等平台。

你还可以参照文档，开发自己的频道插件。比如接入企业微信、Slack、Telegram 等。

心跳机制是内置的定时任务调度系统。

它不仅能被动响应用户需求，还能主动完成一些任务。比如定时检查项目更新、定时整理待办事项、定时查看邮件等。

**记忆系统分为两层**。

- 短期记忆：临时信息缓存，存储当前会话的上下文
- 长期记忆：Markdown 持久化存储，记录项目信息、用户偏好、历史决策等

这种设计，让 CoPaw 既能快速响应，又能长期学习。

**模型接入非常灵活**。

云端 API、自建推理服务、Ollama、llama.cpp、MLX（Apple 芯片本地）都能适配。

我这次用的是通义千问 Coding Plan，直接在配置文件里填上 API Key 就行了。

整个架构设计，透露出一个理念：**让开发者自由定制**。

你可以基于它二次开发，打造属于自己的 AI 助手。

## 05、如何写到简历上？

下面给出一个简历模板：

项目名称：基于 CoPaw 的智能代码管理助手

项目简介：基于阿里开源的 CoPaw Agent 框架，开发了一套智能代码管理助手，支持钉钉接入，实现了 README 自动优化、代码审查、Issue 管理等功能。通过接入通义千问 Coding Plan，实现了高质量的代码生成和文档优化。

技术栈：Python、CoPaw、AgentScope、通义千问 API、钉钉开放平台、Markdown、YAML

核心职责：

- 基于 CoPaw 框架，配置并部署了本地 Agent 服务，实现钉钉机器人接入，支持自然语言交互和多轮对话记忆功能
- 接入通义千问 Coding Plan API，实现了代码生成、文档优化、代码审查等功能
- 基于 CoPaw 的插件化架构，开发 README 优化 Skill，支持自动添加 Badges、技术栈图标、格式美化等功能，减少了 80% 的手动排版时间
- 利用 CoPaw 的心跳机制，实现了定时检查项目更新、自动同步 README、定时代码审查等自动化任务

这样的项目经验，对求职来说是非常加分的。

## ending

这次实测，让我对 AI Agent 的理解更深了一层。

当然了，CoPaw 并不完美，毕竟阿里官方也说了，这是一个初期版本。

我自己在实测的过程也遇到过，钉钉发送了消息一直不回复的 bug。

![](https://files.mdnice.com/user/3903/a788e3fd-6a21-439b-ab60-756c9509a51c.png)

但开源的意义就在于我们可以基于当前的版本进行二次开发。我看官方已经有不少 issue 和 PR 了。

![](https://files.mdnice.com/user/3903/5240db28-1769-470c-86c1-acc7e1500856.png)

CoPaw 给我的最大感触就是，下一个 AI 实战项目，我们也可以做一个类似的 OpenClaw 了。

说实话，AI 给我们的启发永远不是追赶，因为我们人无法追赶上 AI 迭代的速度。

但我们可以让 AI 为我所用。

比如说，gitcode 最多支持 2000 人配额，官方沟通效率也很低，那我们就自研一款，大家也可以期待一下 PaiGit 的第一个上线版本。

再比如说，我们可以把 CoPaw 的学习变成我们的求职经验，把 CoPaw 作为我们 Agent 工具去优化迭代 PaiGit。

追是追不上的，赶也是赶不上的。

唯有脚踏实地的拥抱，学习，汲取，改变。

你我皆有可能，加油吧！

