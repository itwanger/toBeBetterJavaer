---
title: DeepSeek V4要来？我熬夜测了6个小时，用GLM-5开发了一个macOS应用，丝滑切换Claude Code底层模型
shortTitle: GLM-5实测
description: 用GLM-5迭代PaiSwitch项目，实测Agentic长任务、后端架构、全栈开发、Bug修复四项核心能力。DeepSeek V4灰度，GLM-5发布！我熬夜测了6个小时，开发了一个macOS应用，丝滑切换Claude Code底层模型
tag:
  - GLM
  - 大模型
category:
  - AI
author: 沉默王二
date: 2026-02-11
---

大家好，我是二哥呀。

昨天深夜，前脚 DeepSeek V4 悄悄灰度，后脚 GLM-5 悄悄发布。

争先恐后，好不热闹。

![](https://cdn.paicoding.com/stutymore/glm-5-review-20260211225730.png)

我熬夜测了 6 小时，先上结论：GLM-5 就是目前最聪明的国产模型，没有之一。

以前我还会用Claude Opus 规划开发文档，用 GLM 4.7 去具体执行，但经过这一夜，我决定 All in GLM-5。

这不，Coding 套餐已经狠心新升级到 Max，为的就是能畅快淋漓地体验GLM-5的强大。

![](https://cdn.paicoding.com/stutymore/glm-5-review-20260212085548.png)

没错！之前在OpenRouter上爆火的Pony Alpha就是GLM-5。

![](https://cdn.paicoding.com/stutymore/glm-5-review-20260211232254.png)

不过相信大家和我一样，不仅期待GLM-5，也期待DeepSeek V4 能早一点到来。

![](https://cdn.paicoding.com/stutymore/sucai-20260211191008.png)

毕竟去年春节的DeepSeek给了我们太多惊喜，那种国产模型也很能打的自豪感，真的是太棒了，每个人都是油然而生。

说真的，这一次DeepSeek V4 的上下文有 1M，可以一次性处理超大文档。

而GLM-5 则更进一步，参数规模从 355B（激活 32B）扩展到了 744B（激活 40B），翻了一倍还多。

![](https://cdn.paicoding.com/stutymore/glm-5-review-f929b83b4fd62121afeb56d187c43ff0.png)

这不是简单的堆参数。首次集成 DeepSeek Sparse Attention（稀疏注意力机制），在维持长文本效果无损的同时，大幅降低了模型的部署成本。

官方给GLM-5的定位非常明确：面向复杂系统工程与长程 Agent 任务的开源基座模型，提供对标顶尖闭源模型 Claude Opus 4.5的可靠生产力，为顶尖程序员而生。

![](https://cdn.paicoding.com/stutymore/glm-5-review-de47f54cc1324af98100759b466a0a9c.png)

说白了，GLM-5 不想再玩一句话生成网页这种小把戏了。它要干的是真正的系统工程。

这次我们也不玩虚的，直接拿真实项目来测——PaiSwitch，一个 macOS 原生应用，用来切换 Claude Code 的底层模型，对标 CC Switch。

![](https://cdn.paicoding.com/stutymore/sucai-20260211221614.png)

你别说，用自己开发的产品，就是有成就感😄。

你别说，随着 AI Coding 的发展，造轮子的门槛是越来越低。

你别说，任何人只要脑袋里有创意，就可以用 AI 快速把想法落地变成产品。

这种感觉，相信每个人都特别想拥有，而GLM-5就是帮我们实现这个梦想的工具。

## 01、长任务规划

PaiSwitch 涉及的技术点还是非常多的，比如说架构设计、Swift 前端、配置管理、Keychain 安全存储等。

我之前可是一行Swift代码没写过，真的全靠GLM-5自己来完成。

![这是由GLM-5已经完成的界面](https://cdn.paicoding.com/stutymore/glm-5-review-20260212091637.png)

给 GLM-5 扔一个需求：

> 我需要给 PaiSwitch 添加自定义底层模型提供商功能。用户可以添加任意兼容 Anthropic API 的模型服务，配置名称、Base URL、模型名称、API Key。需要支持增删改查，配置要持久化，API Key 要用 Keychain 安全存储。

GLM-5 没有急着写代码，而是先花了几分钟探索项目结构。

![](https://cdn.paicoding.com/stutymore/glm-5-review-20260211230645.png)

它搞清楚了几件事：

- 项目用 SwiftUI + MVVM 架构
- 已有 ModelProvider 枚举定义固定提供商
- ConfigManager 负责 JSON 配置文件读写
- KeychainManager 负责 API 密钥安全存储
- BackupManager 负责配置备份

然后给出了完整的设计方案：

![](https://cdn.paicoding.com/stutymore/glm-5-review-20260211231319.png)

**数据模型层**：新建 `CustomProviderConfiguration.swift`，定义自定义提供商的数据结构，包括 id、name、baseURL、defaultModel、fastModel 等字段。

![](https://cdn.paicoding.com/stutymore/glm-5-review-20260211230806.png)


**管理层**：新建 `CustomProviderManager.swift`，负责增删改查、持久化存储（JSON 文件）、与 KeychainManager 集成。

![](https://cdn.paicoding.com/stutymore/glm-5-review-20260211230741.png)

**视图层**：新建 `CustomProviderDetailView.swift`，提供添加/编辑自定义提供商的表单界面。

![](https://cdn.paicoding.com/stutymore/glm-5-review-20260211231007.png)

**集成点**：修改 `ModelProvider.swift` 枚举，新增 `.custom` case；修改 `TrayMenuView.swift`，在菜单中显示自定义提供商列表。

```
CaseIterable, Identifiable, Codable {
    case claude = "Claude 官方"
    case deepseek = "DeepSeek"
    case zhipu = "智谱 AI"
    case openrouter = "OpenRouter"
    case siliconflow = "硅基流动"
    case volcano = "火山引擎"
    case custom = "自定义"
}
```

说实话，这个设计思路和我预想的完全一致。GLM-5 就像一个富有经验的系统架构师，先摸清现状，再设计方案，给我一种沉甸甸的安全感。

方案定了，GLM-5 开始动工了。

第一步，创建数据模型。字段设计很合理：id 用于唯一标识，name 用于显示，baseURL 和 defaultModel 是切换模型的核心参数，fastModel 是可选的快速模型，iconName 用于显示图标。

```swift
struct CustomProviderConfiguration: Identifiable, Codable, Equatable {
    let id: UUID
    var name: String
    var baseURL: String
    var defaultModel: String
    var fastModel: String?
    var iconName: String

    init(
        id: UUID = UUID(),
        name: String,
        ...
    ) {
        self.id = id
        self.name = name
        ...
    }
}
```

第二步，创建 Manager 类。这是整个功能的核心。底层模型参数持久化到 `.claude/settings.json`文件中，符合 Claude Code 的规范。

自定义的服务商配置列表会序列化为 JSON 后保存到 com.paicoding.paiswitch.plist 中。

![](https://cdn.paicoding.com/stutymore/glm-5-review-20260211233001.png)

第三步，将 API Key 放在macOS 系统钥匙串中，从根上杜绝安全隐患。

```swift
// 在 KeychainManager 中添加
func saveAPIKey(_ key: String, for customProvider: CustomProviderConfiguration) {
    let service = "com.paicoding.paiswitch.custom.\(customProvider.id.uuidString)"
    save(key: key, service: service, account: "apiKey")
}
```

我虽然之前没写过Swift代码，但看了 GLM-5 写的代码，真的是如沐春风，风格规范，命名清晰，结构合理，注释也恰到好处。

## 02、全栈开发

后端搞定后，GLM-5 开始写前端。

先创建自定义提供商的详情视图，用于添加和编辑。表单验证、SecureField 保护密钥、toolbar 放置保存按钮，这些都是 Swift 的最佳实践。

![](https://cdn.paicoding.com/stutymore/glm-5-review-20260211233603.png)

然后修改主菜单视图，把自定义提供商加进去。最后是切换逻辑，调用 ConfigManager 更新配置文件。

![](https://cdn.paicoding.com/stutymore/glm-5-review-20260211233711.png)

整个前端开发过程，GLM-5 展现出了对 Swift 的熟练掌握。布局合理、状态管理清晰、用户体验到位。

## 03、Bug 修复

GLM-5和GLM-4.7最大的不同，就是它更像是一个Agent，不仅负责写代码，还负责编译和运行，之前GLM-4.7还做不到，需要我手动去xcode 中运行和编译。

![](https://cdn.paicoding.com/stutymore/glm-5-review-20260212092439.png)

遇到一些非编译和运行是错误，也会手把手教我们怎么去操作，这种细致入微的方式，对我这种Swift新手真的太友好了。

![](https://cdn.paicoding.com/stutymore/glm-5-review-20260211234041.png)

这也是GLM-5让我特别喜欢的地方，它具备极强的自我反思与纠错机制。

![](https://cdn.paicoding.com/stutymore/glm-5-review-20260212092600.png)

遇到编译失败或运行报错时，会自主分析日志、定位根因并迭代修复，直到系统跑通。

并且速度明显比上个版本快很多，以前我修个问题会切换到其他界面干点别的，过一会再回来检查是否完成。

但GLM-5没给我这个机会，😄

完全没有等的感觉。

修完 bug 后，我们来完整测试一遍流程：

添加一个自定义提供商，名称填Pony（GLM-5之前那个匿名的神秘模型），Base URL 填 OpenRouter 的 API 地址，模型名称填pony-alpha。

![](https://cdn.paicoding.com/stutymore/glm-5-review-20260211234459.png)

点击保存，列表里出现了 Pony 选项。

![](https://cdn.paicoding.com/stutymore/glm-5-review-20260211234644.png)

选中切换，Claude Code 底层模型变成了 Pony。

![](https://cdn.paicoding.com/stutymore/glm-5-review-20260211234708.png)

整个功能从设计到实现到调试，GLM-5 一把梭搞定。我只在关键节点确认需求，剩下的全是它自己完成的。

CC switch有的，PaiSwitch也要有。

如果大家觉得有需要，可以评论区告诉我，我把源码开源到GitHub上。

讲真，官方说GLM-5用很多Agent，执行了好几天的自动化任务，完成了一个C的编译器、并且可用；用很多Agent，执行了很多天，完成了一个操作系统内核，成功编译。

![](https://cdn.paicoding.com/stutymore/glm-5-review-26932bfe13570de0c87c382171b13cd0.png)

用之前我还抱着一丝怀疑的态度，但经过这次实测，我信了。

目前有两个地方可以体验GLM-5：

第一种，访问 `z.ai`，在对话框里选择 GLM-5 模型，就可以直接搞起来了。

![](https://cdn.paicoding.com/stutymore/sucai-20260211221322.png)

Agent 模式下，你可以让它执行长任务。Chat 模式下，就是常规的对话交互。

第二种，在Claude Code中接入GLM-5 API，如果你没有用 CC Switch，可以直接在 `~/.claude/settings.json` 文件里把默认模型改成 GLM-5。

![](https://cdn.paicoding.com/stutymore/glm-5-review-20260212094145.png)

别的不用动。

## 04、ending

有时我也在想，国产大模型到底应该是什么模样？

不该是只能写写前端页面的玩具。不该是只会在榜单上刷分的数字游戏。

国产大模型应该是能扛大旗的主力。应该是让我们在复杂系统开发中，拥有真正的选择权。

GLM-5做到了。

就连太平洋那边的AI大V @AICodeKing 都在X上评价说：

>GLM-5击败了Opus 4.6，在我的智能体榜单上名列第一

![](https://cdn.paicoding.com/stutymore/glm-5-review-20260211235155.png)

还有，在全球权威的 Artificial Analysis 榜单中，GLM-5 位居全球第四、开源第一。

![](https://cdn.paicoding.com/stutymore/glm-5-review-1050aa99d24090611fc7fa399c167425.png)

GLM-5的发布，对于我们国内的开发者来说，无疑是一个巨大的利好。

物美价廉，还省去了被国外模型限制的烦恼。

「在大模型进入 Agent、长任务的时代，GLM-5 绝对可以作为你的首选。」

这才是我们期待已久的国产大模型啊。

我们下期见～
