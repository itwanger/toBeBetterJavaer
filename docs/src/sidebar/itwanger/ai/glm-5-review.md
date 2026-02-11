---
title: DeepSeek V4要来？我熬夜测了6个小时，用GLM-5开发了一个macOS应用，丝滑切换Claude Code底层模型
shortTitle: GLM-5实测
description: 用GLM-5迭代PaiSwitch项目，实测Agentic长任务、后端架构、全栈开发、Bug修复四项核心能力
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

![](https://cdn.paicoding.com/stutymore/glm-5-review-20260211225730.png)

争先恐后，好不热闹。

我熬夜测了 6 小时，先放结论：GLM-5 就是目前最聪明的国产模型，没有之一。

以前我还会用Claude Opus 规划项目开发文档，用 GLM 4.7 去具体执行，但经过这一夜，我决定 All in GLM-5。

想必大家也都测出来了，之前在OpenRouter上爆火的Pony Alpha就是GLM-5。

![](https://cdn.paicoding.com/stutymore/glm-5-review-20260211232254.png)

不过相信大家和我一样，不仅期待GLM-5，也期待DeepSeek V4 能早一点到来。

毕竟去年春节的DeepSeek给了我们太多的惊喜，那种国产模型也很能打的自豪感，真的是太棒了，每个人都是油然而生。

这次我们也不玩虚的，我直接拿真实项目来测——PaiSwitch，一个 macOS 原生应用，用来切换 Claude Code 的底层模型，对标 CC Switch。

![](https://cdn.paicoding.com/stutymore/sucai-20260211221614.png)

你别说，用自己开发的产品，就是有成就感😄。

我相信，随着 AI Coding 的发展，造轮子的门槛一定会越来越低。

任何人，只要脑袋里有创意，就可以用 AI 快速把想法变成产品。

这种感觉，相信每个人都想体验一下。

## 01、Agentic 长任务规划

这次涉及的技术点非常多，比如说架构设计、SwiftUI 前端、配置管理、Keychain 安全存储等。能很好地测试 GLM-5 的 Agentic 长任务规划、后端架构设计、全栈开发和 Bug 修复能力。

我之前可是一行Swift代码没写过，真的全靠GLM-5自己来完成。

我先给 GLM-5 扔了一个需求：

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

![](https://cdn.paicoding.com/stutymore/glm-5-review-20260211231319.png)

舒服。

## 02、后端架构设计与实现

方案定了，GLM-5 开始动工了。

第一步，它会创建数据模型。字段设计很合理：id 用于唯一标识，name 用于显示，baseURL 和 defaultModel 是切换模型的核心参数，fastModel 是可选的快速模型，iconName 用于显示图标。

```swift
import Foundation

/// Configuration for custom model providers
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
        baseURL: String,
        defaultModel: String,
        fastModel: String? = nil,
        iconName: String = "gearshape.2"
    ) {
        self.id = id
        self.name = name
        self.baseURL = baseURL
        self.defaultModel = defaultModel
        self.fastModel = fastModel
        self.iconName = iconName
    }

    var hasFastModel: Bool {
        fastModel != nil && !fastModel!.isEmpty
    }
}
```

第二步，它会创建 Manager 类。这是整个功能的核心。

```swift
// CustomProviderManager.swift
class CustomProviderManager: ObservableObject {
    static let shared = CustomProviderManager()

    @Published var providers: [CustomProviderConfiguration] = []

    private let fileURL: URL
    private let fileName = "custom_providers.json"

    private init() {
        let documentsDirectory = FileManager.default
            .urls(for: .documentDirectory, in: .userDomainMask).first!
        fileURL = documentsDirectory.appendingPathComponent(fileName)
        loadProviders()
    }

    // 加载配置
    func loadProviders() { ... }

    // 保存配置
    func saveProviders() { ... }

    // 增删改查
    func addProvider(_ provider: CustomProviderConfiguration) { ... }
    func updateProvider(_ provider: CustomProviderConfiguration) { ... }
    func deleteProvider(_ provider: CustomProviderConfiguration) { ... }
    func getProvider(by id: UUID) -> CustomProviderConfiguration? { ... }
}
```

底层模型参数持久化在 `.claude/settings.json`，符合 Claude Code 的规范。

自定义的服务商配置列表会序列化为 JSON 后保存到 com.paicoding.paiswitch.plist 中。

![](https://cdn.paicoding.com/stutymore/glm-5-review-20260211233001.png)

第三步，它对 API Key 做了安全存储，放在macOS 系统钥匙串中，从根上杜绝安全隐患。

```swift
// 在 KeychainManager 中添加
func saveAPIKey(_ key: String, for customProvider: CustomProviderConfiguration) {
    let service = "com.paicoding.paiswitch.custom.\(customProvider.id.uuidString)"
    save(key: key, service: service, account: "apiKey")
}

func getAPIKey(for customProvider: CustomProviderConfiguration) -> String? {
    let service = "com.paicoding.paiswitch.custom.\(customProvider.id.uuidString)"
    return get(service: service, account: "apiKey")
}
```

用 UUID 作为 service 的一部分，确保每个自定义提供商的密钥是隔离的，不会出现密钥混淆的问题。

我虽然之前没写过Swift代码，但看了 GLM-5 写的代码，真的是如沐春风，风格规范，命名清晰，结构合理，注释也恰到好处。

## 03、全栈开发：前端视图与联调

后端搞定后，GLM-5 开始写前端。

它先创建了自定义提供商的详情视图，用于添加和编辑。

![](https://cdn.paicoding.com/stutymore/glm-5-review-20260211233603.png)

表单验证、SecureField 保护密钥、toolbar 放置保存按钮，这些都是 SwiftUI 的最佳实践。

然后修改主菜单视图，把自定义提供商加进去。

```swift
// TrayMenuView.swift 修改
Section("自定义提供商") {
    ForEach(CustomProviderManager.shared.providers) { provider in
        Button(provider.name) {
            switchToCustomProvider(provider)
        }
    }

    Button("添加自定义提供商...") {
        showAddCustomProvider = true
    }
}
```

最后是切换逻辑，调用 ConfigManager 更新配置文件。

![](https://cdn.paicoding.com/stutymore/glm-5-review-20260211233711.png)

GLM-5 还顺手加了备份机制，切换前自动备份当前配置。这个细节很贴心，万一切换出问题还能恢复。

整个前端开发过程，GLM-5 展现出了对 SwiftUI 的熟练掌握。布局合理、状态管理清晰、用户体验到位。不是那种只会抄文档的水平，而是真正理解了声明式 UI 的精髓。

## 04、Bug 修复：踩坑实录

代码写完了，编译运行时出现的问题，交给GLM-5来自动处理也很让人放心。

![](https://cdn.paicoding.com/stutymore/glm-5-review-20260211233940.png)

遇到一些非编译和运行是错误，也会手把手教我们怎么去操作，这种细致入微的方式，对我这种Swift新手真的太友好了。

1. 在 Xcode 中，右键点击 Views 文件夹                              
2. 选择 "Add Files to ClaudeModelSwitcher..."                 
3. 导航到 ClaudeModelSwitcher/Views
4. 选择 CustomProviderDetailView.swift                            
5. ❌ 取消勾选 "Copy items if needed"
6. 点击 Add

![](https://cdn.paicoding.com/stutymore/glm-5-review-20260211234041.png)

## 05、最终效果

修完 bug 后，我们来完整测试了一遍流程：

添加一个自定义提供商，名称填Pony（之前匿名测试的那个神秘模型），Base URL 填 OpenRouter 的 API 地址，模型名称填pony-alpha。

![](https://cdn.paicoding.com/stutymore/glm-5-review-20260211234459.png)

点击保存，列表里出现了 Pony 选项。

选中切换，Claude Code 底层模型变成了 Pony。

![](https://cdn.paicoding.com/stutymore/glm-5-review-20260211234644.png)

![](https://cdn.paicoding.com/stutymore/glm-5-review-20260211234708.png)

整个功能从设计到实现到调试，GLM-5 一把梭搞定。我只在关键节点确认了一下，剩下的全是它自己完成的。

当然，限于篇幅，我只详细说了PaiSwitch中的一个功能点，实际上整个应用程序都是由GLM-5独立开发完成的，包括主界面、菜单、配置管理、模型切换逻辑等多个模块。

## 06、ending

有时我也在想，国产大模型到底应该是什么模样？

不该是只能写写前端页面的玩具。不该是只会在榜单上刷分的数字游戏。

Youtube 大V @AICodeKing 在 X 上是这样评价 GLM-5 的：

>GLM-5击败了Opus 4.6，在我的智能体榜单上名列第一

![](https://cdn.paicoding.com/stutymore/glm-5-review-20260211235155.png)

国产大模型应该是能扛大旗的主力。应该是让我们在复杂系统开发中，拥有真正的选择权。

比如用 GLM-5 完成一个完整的 SwiftUI 功能模块。比如让 GLM-5 自己探索代码库、设计方案、写代码、修 bug。比如把原本需要 Claude Opus 才能干的事，交给一个开源模型。

「在大模型进入 Agent、大任务的时代，GLM-5 是你可以使用的开源选择。」

这才是我们期待已久的国产大模型啊。

我们下期见。