---
title: DeepSeek V4要来？我花了1个小时，用神秘模型Pony开发了一个macOS应用，丝滑切换Claude Code底层模型
shortTitle: Pony Alpha实测
description: 外界猜测是DeepSeek V4的神秘模型，免费使用还能开发macOS应用，这波测评告诉你真相，PaiClaude，一个macOS微应用，丝滑切换Claude Code底层模型，比如说DeepSeek，智谱，OpenRouter；第二版要实现应用上下文的管理。
tag:
  - 大模型
  - OpenRouter
  - DeepSeek
category:
  - AI
author: 沉默王二
date: 2026-02-09
---

大家好，我是二哥呀。

最近 AI 圈有个神秘模型在 OpenRouter 上悄悄火了。

Pony Alpha。

免费，能力强得离谱，外界都在猜它到底是不是 DeepSeek V4 的马甲。

![](https://cdn.paicoding.com/stutymore/sucai-20260209150822.png)

我花了一个小时，用这个模型在 Claude Code 里做了一件事——从零开发一个 macOS 原生应用。全程用 Swift 语言，要知道我之前可是一行Swift代码都没写过。

结果呢？

一次性搞定。

![](https://cdn.paicoding.com/stutymore/pony-alpha-review-20260209154510.png)

以后我再想切换Claude Code的底层模型，直接点左侧的菜单就可以了，超级方便。

下一个版本我打算再追加一个填写新模型的功能，这样如果有新的模型要测，我直接填一下模型的名字，API前缀和API Key 就好了呀。

方便，实在是方便。

事情就从我想在 Claude Code 里切换底层模型说起吧。

大家都知道，Claude Code可以兼容很多底层模型，除了Claude之外，还有DeepSeek、智谱、OpenRouter等等。

手动去改配置文件当然可以，但每次都要打开 `settings.json`，改来改去，烦得要死。我一开始的解决方案是，能不能写几个脚本，想用什么模型就执行哪个脚本。

![](https://cdn.paicoding.com/stutymore/sucai-20260209144616.png)

但实际体验下来，这样用起来仍然不够方便。

并且我遇到了一个之前从来没有遇到的问题，就是我用脚本切换到OpenRouter的神秘模型 Pony Alpha 时，一直报错。

```
API Error: 403 {"error":{"message":"This model is not available in your region.","code":403}}
Please run /login
```

这就很奇怪。我用 `curl` 直接测试 OpenRouter 的 API 明明没问题啊。

![](https://cdn.paicoding.com/stutymore/sucai-20260209145142.png)

官方文档也没说有什么额外配置。

![](https://cdn.paicoding.com/stutymore/sucai-20260209145358.png)

我就纳闷了！

![](https://cdn.paicoding.com/stutymore/sucai-20260209145534.png)

折腾了好久，最后问了 Codex 才恍然大悟——原来还需要指定基础模型：

```
ANTHROPIC_MODEL=openrouter/pony-alpha
```

![](https://cdn.paicoding.com/stutymore/sucai-20260209145627.png)

讲真，在修 bug 这块，Codex 确实有一套。Claude 压根没告诉我这个原因。

![](https://cdn.paicoding.com/stutymore/sucai-20260209145900.png)

这次终于切换成功了！

我切换到了Pony Alpha模型，啊，这要是没有编程经验的小白可咋办啊，光一个配置都要折腾死。

![](https://cdn.paicoding.com/stutymore/sucai-20260209150000.png)

问了问题，也能响应我了。

![](https://cdn.paicoding.com/stutymore/sucai-20260209150040.png)

经历了这个事情后，我就萌生了一个大胆的想法，能不能做一个原生的应用，不用每次在配置文件里改来改去，直接通过GUI界面来切换底层模型？

于是我就开始折腾了。

![](https://cdn.paicoding.com/stutymore/sucai-20260209150247.png)

进入plan 模式，告诉Claude Code我有这样一个需求。

>我需要一个 macOS 原生应用来管理 Claude Code 的模型切换，替代手动执行脚本的繁琐操作。

并且我选了最难的方案，用Swift来开发这个应用。而不是Web开发，因为我就想测试一下Pony Alpha到底有多强，因为外界都在猜测这个新模型到底是不是DeepSeek V4？

![](https://cdn.paicoding.com/stutymore/sucai-20260209150740.png)

还是免费的，你敢信？

![](https://cdn.paicoding.com/stutymore/sucai-20260209150856.png)

很快，Claude Code 就把设计稿整出来了，看了一眼，没什么问题。

![](https://cdn.paicoding.com/stutymore/sucai-20260209150948.png)

实现步骤也很清晰：

![](https://cdn.paicoding.com/stutymore/sucai-20260209151028.png)

然后就让他吭哧吭哧干活了。

![](https://cdn.paicoding.com/stutymore/sucai-20260209151126.png)

没过多久，v0.0.1 版本就完成了。

![](https://cdn.paicoding.com/stutymore/sucai-20260209151200.png)

功能包括：

- 一键切换模型：支持 Claude、DeepSeek、智谱 AI、OpenRouter、硅基流动、火山引擎
- API Key 安全存储：使用 Keychain 存储，不保存在配置文件
- 自动备份：每次切换前自动备份配置
- 配置历史：查看和恢复历史配置
- 系统托盘：菜单栏快速切换

用 Xcode 运行一下。

![](https://cdn.paicoding.com/stutymore/sucai-20260209151309.png)

编译通过后，主界面出来了。

![](https://cdn.paicoding.com/stutymore/sucai-20260209151354.png)

很清爽啊，我滴乖乖。

切到智谱 GLM 试一试。

![](https://cdn.paicoding.com/stutymore/sucai-20260209151445.png)

首次切换需要填写 API Key，后续就不用了。因为存在 Keychain 里，不会泄露。



重启 Claude Code，`/status` 查看没问题，输入提示词测一下，也没问题。

![](https://cdn.paicoding.com/stutymore/sucai-20260209151641.png)

再切回 Pony Alpha，一样丝滑。

![](https://cdn.paicoding.com/stutymore/sucai-20260209151751.png)

从整个开发过程来看，Pony Alpha 给我的感觉非常明确。

它不是在猜怎么写，而是真正理解了你要做什么。

比如我让它用 Swift 开发原生应用，它会先搞清楚 SwiftUI 的生命周期、Keychain API 的用法、系统托盘的实现方式。然后才动手写代码。

这种感觉很像和一个有经验的 iOS 开发者结对编程。

你只需要说我想要什么，它会自己搞定怎么做。

比如配置 OpenRouter 的时候，它知道要用环境变量的方式传递 API Key，而不是硬编码。知道要处理各种边界情况，比如 Key 不存在、网络请求失败、配置文件损坏。

这些都是工程化思维，不是简单的代码补全。

那它到底是不是 DeepSeek V4？

这个问题，说实话，没人知道确切答案。

OpenRouter 上只显示了模型名称和定价——免费。

![](https://cdn.paicoding.com/stutymore/sucai-20260209150856.png)

但从我的体感来说，它的编程能力确实很强。

我这套应用看似简单，但也包含了前后端逻辑、数据持久化，而且用的是我不熟悉的 Swift 语言。

整个过程几乎没有卡壳。

如果它真的是 DeepSeek V4 的测试版，那国产模型的进步速度，确实让人惊喜。

![](https://cdn.paicoding.com/stutymore/pony-alpha-review-20260209161245.png)

目前 v0.0.1 版本已经能完成了最基础的模型切换功能。后续我打算加入更多能力：

- 上下文查询
- Session 管理
- Skills 管理
- 直接在应用内进行 Vibe Coding

如果你有什么想要的功能，也可以在评论区告诉我。

项目后续会开源到 GitHub 上，有需要的小伙伴可以关注一下。

大家有没有想过，AI 编程到底应该是什么模样？

不该是AI写出垃圾代码让我们去收拾。不该是我们变成只会按回车的工具人。

AI应该是我们的放大器。应该是让我们能把脑子里那些天马行空的想法，快速变成现实。

比如我一个没写过 Swift 的人，用 Pony Alpha 花了一个小时，就做出了一个能用的 macOS 应用。这在以前，至少得学一周 Swift 基础吧？

![](https://cdn.paicoding.com/stutymore/pony-alpha-review-20260209160646.png)

「工具的价值，是让我们专注于创造，而不是重复劳动。」

Pony Alpha 还在免费期，趁着还没收费，赶紧去体验一波。
