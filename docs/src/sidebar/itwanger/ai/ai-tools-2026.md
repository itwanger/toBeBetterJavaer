---
title: 23个AI Agent工具，从夯到拉，真香的就这几个。
shortTitle: AI工具梯队盘点
description: 2026年AI工具梯队盘点：从Codex到Claude Code，从Qoder到Gemini，覆盖编程、绘图、音视频、学习四大场景，帮你选对工具，效率翻倍。
tag:
  - AI工具
  - Codex
  - Claude Code
category:
  - AI
author: 沉默王二
date: 2026-04-04
---

大家好，我是二哥呀。

假期了，正是总结和盘点的好时候。之前给大家分享爱马仕 Harness 的内容，非常硬核，点赞、转发和比心的小伙伴非常多。

但也有小伙伴表示学不动了，除了 AI 确实能卷的原因之外，手里配一套趁手的工具也非常重要，能提高不少学习效率。

![](https://cdn.paicoding.com/stutymore/ai-tools-2026-20260404202405.png)

索性今天就把我压箱底的 AI 工具清单整理出来，一共 xx 个，从夯到拉，毫无保留分享给大家，全部都是我经过大量实践经验教训验证过的。

> 已经分享过教程的 AI 工具，我也会贴出教程地址。大家直接收藏去实践就行了。

看完这篇，你就知道哪些工具值得投入时间，哪些工具可以暂时放一放了（比如说龙虾🦐，我对他的热情也是完全降了下来）。

## 01、第一梯队：主力生产力工具

第一梯队是我每天都在用的工具，属于生产力核心，用好了提升的效率不是一星半点。

这三个 AI Agent 工具各有特色，但有一个共同点：能真正提高生产力，每个人必备。

### 先说 OpenAI 的 Codex

这货量大管饱，代码质量高，特别适合有编码需求的小伙伴。

> 教程：https://paicoding.com/article/detail/2603700053739522

就说近一个月吧，我所有的项目开发都交给它了，包括技术派、派聪明 RAG、PaiFlow Agent、PaiAgent 工作流、PaiSwitch（一个类似 CC Switch 的项目）、派简历。

![](https://cdn.paicoding.com/stutymore/sucai-20260404193545.png)

可以在 IntelliJ IDEA 装一个 Codex 插件，日常开发一些后端代码的时候非常方便。

> 教程：https://paicoding.com/article/detail/2607900057933824

![](https://cdn.paicoding.com/stutymore/sucai-20260319103649.png)

Codex 还有个杀手锏：配合 Chrome Devtools MCP 可以进行网页测试。有些页面上的 bug 很难用语言描述清楚，让 Codex 直接操作浏览器调试，比你自己折腾半天强多了。

> 教程：https://paicoding.com/article/detail/2606800001310720

![](https://cdn.paicoding.com/stutymore/sucai-20260307125718.png)

### 再说 Anthropic 的 Claude

讲真，Claude 在文本方面的表现无可替代。虽然 Anthropic 有点小家子气，经常搞一些莫名其妙的小动作，但 Claude Opus 在文本能力上确实无敌，解决一些 bug 的时候，那也是真神。

有时候，一些线上的 bug 我描述不清楚，Codex 经常也是胡言乱语，但 Claude 这玩意就好像装了监控，真的能 get 到我真正的诉求。

另外，

不得不提的就是 Claude Code。这就是目前最强的 Agent 工具。

国内的模型配上 Claude Code，战斗力直接翻倍。比如 GLM-5.1，在 Claude Code 的助阵下，能力就很强。

我之前用这套组合完成了一个简历 Agent 项目。

> 教程：https://paicoding.com/article/detail/2609300013893632

![](https://cdn.paicoding.com/paicoding/abab4ce496d939dd16a19ead3b5d3286.jpg)

Claude Code 最大的优势在于端到端能力：从拆解需求、生成规范、编写代码到执行测试，一条龙搞定。

复杂任务、多文件重构、自主调试，这些场景 Claude Code 是目前的天花板。

还有六个 Codex 和 Claude Code 都能用的 Skills，我之前也整理过，覆盖了代码审查、文档生成、测试自动化等常见场景。

> 教程：https://paicoding.com/article/detail/2607600014942213

![](https://cdn.paicoding.com/paicoding/dd7793b78da4e7450fa83a995c94784f.png)

### 第三个是阿里的 Qoder

据说底层模型用的是 Claude Opus，文本能力可以作为 Claude 的平替。日常编码完全够用，关键是性价比高。对于预算有限的团队来说，Qoder 是一个务实的选择。

![](https://cdn.paicoding.com/paicoding/28feafc9c02a337293469e8e4b8929f9.png)

![](https://cdn.paicoding.com/stutymore/sucai-20260404193827.png)

Qoder 有两个功能我特别喜欢。

一个是 Quest 模式。这个功能适合搭建项目骨架，PaiAgent 就是通过 Qoder 的 Quest 模式搭建的。你只需要描述目标，Agent 就会端到端完成开发任务。从数据库设计到接口开发，从前端页面到部署脚本，一站式搞定。

![](https://cdn.paicoding.com/paicoding/8ac0ae4e60098c7f770c4b9bfc530522.png)

> 教程：https://paicoding.com/column/14/1

另一个是专家团模式。三个后端工程师、一个前端工程师和一个测试工程师并行工作，效率直接起飞。

![](https://cdn.paicoding.com/stutymore/sucai-20260404194719.png)

> 教程：https://paicoding.com/article/detail/2609400035913730

Qoder 还有个桌面版 Agent QoderWork，非常适合非程序员做日常使用。产品经理、运营、测试同学都可以用它来完成一些自动化任务。

> 教程：https://paicoding.com/article/detail/2603208495824901

![](https://cdn.paicoding.com/stutymore/qoderwork-review-20260130052022.png)

对了，还有个 Repo Wiki 功能，读源码的时候特别好用。

自动生成项目文档，省得自己一点点啃代码。接手新项目的时候，用这个功能快速了解项目结构，比看别人写的文档靠谱多了。

![](https://cdn.paicoding.com/stutymore/sucai-20260404200944.png)

## 02、第二梯队：场景增强工具

第二梯队是场景增强型的工具，虽然不是每天都用，但在特定场景下非常给力。这些工具的特点是：用对了就是神助攻，用错了就是浪费时间。

### Google 的 Gemini 排在前面

我最喜欢用的是 TRAE 国际版中的 Gemini flash 2.5，读源码效果最好（其他都比不上，我也不知道为什么，我尝试过 Gemini 3.1 pro，效果就不如 2.5）。

不知道为什么。

可能是训练数据的原因，Gemini 2.5 对大型代码库的理解能力确实强。处理几十万行代码的项目，Gemini 能快速定位关键模块，告诉你哪些文件需要重点关注。

![](https://cdn.paicoding.com/stutymore/sucai-20260404193643.png)

Gemini 还有个优势是上下文窗口大，能一次性处理更多内容。对于需要全局视角的分析任务，Gemini 是不错的选择。

### draw.io 是我的绘图神器

我文章里的大部分流程图、架构图都是由它完成的。面渣逆袭系列里相当多的图片，也是用它画的。

配合 GLM-5.1，用自然语言描述需求，它就能生成专业的图表。省去了自己拖拽组件、调整布局的时间，对技术写作来说简直是福音。

![](https://cdn.paicoding.com/paicoding/3bc1fd06858afe5448251caf7fcf45cb.png)

以前画一个复杂的架构图，折腾半天是常事。现在用自然语言描述一下，几十秒钟就出来了，而且质量稳定。这个效率提升是实打实的。

![](https://cdn.paicoding.com/stutymore/skills-20260403100905.png)

### VSCode + GitHub 桌面版

VSCode，我所有的文本都是在这个工具里完成的，轻量，但颜值高。

![](https://cdn.paicoding.com/stutymore/ai-tools-2026-20260404205436.png)

提交代码、进行仓库管理的话，GitHub 桌面版是我的首选。提交的时候，可以直接生成提交信息，省得自己写了还要担心格式不对。

![](https://cdn.paicoding.com/stutymore/ai-tools-2026-20260404205612.png)

zread.ai 也是读源码的利器，和 Qoder 的 Repo Wiki 功能比较类似。

我之前一直用，现在也用的少了，这里简单提一嘴。

## 03、第三梯队：需要但非必须

第三梯队是辅助型工具，用好了能锦上添花。这些工具不是生产力核心，但在特定场景下能解决大问题。

秘塔搜索我之前用得比较多，现在很多时候直接用 Google 的 AI 搜索就搞定了。AI 搜索已经成为获取信息的首选入口，传统的搜索方式慢慢被替代了。秘塔的优势是中文内容覆盖全，适合查技术文档和行业资讯。

![](https://cdn.paicoding.com/stutymore/ai-tools-2026-20260404204633.png)

绘图方面推荐 Lovart。

我文章中部分图片是由 Lovart 完成的，里面可以选择 Nano Banana 2 模型，出图质量稳定。

AI 绘图工具现在选择很多，Midjourney、DALL-E、Stable Diffusion 都是老牌选手。Lovart 的优势是中文友好，不需要折腾英文提示词，对国内用户更友好。

![](https://cdn.paicoding.com/paicoding/3f244e583557032d2a3b16eb5f415599.jpg)

写技术文章需要配图的时候，Lovart 能快速生成贴合主题的图片，不用满世界找素材了。

## 04、第四梯队：特定场景下的工具

第四梯队是特定场景下的工具，各有各的用处。这些工具不是主力，但在某些场景下是刚需。

智谱的学习搭子是学习神器。把学习资料丢进去，它能帮你整理笔记、生成练习题、划重点，适合需要系统学习的场景。准备面试、学新技术、啃专业书籍，都可以用它来提升效率。

> 教程：https://paicoding.com/article/detail/2609400035913732

![](https://cdn.paicoding.com/stutymore/chatglm-xuexidazi-review-20260126172020.png)

学习搭子最实用的功能是知识梳理。你把一堆资料喂给它，它会自动提炼核心知识点，生成结构化的学习笔记。比自己一点点整理省事多了。

NotebookLM 是 Google 出的学习工具，适合做知识管理和深度阅读。它的优势是可以整合多个来源的资料，建立知识关联，形成完整的知识图谱。适合研究型学习，比如读论文、做调研。

音视频生成方面，工具选择很丰富。

ElevenLabs 做语音合成，效果接近真人。做视频配音、播客开场、有声书朗读，都能用。Suno 做音乐生成，输入风格描述就能产出完整的曲子，搞视频背景音乐很方便。

HeyGen 做数字人视频，适合做课程讲解、产品演示。Gamma 做 PPT，输入主题就能生成完整的演示文稿，省去排版时间。

![](https://cdn.paicoding.com/stutymore/ai-tools-2026-20260404205126.png)

Perplexity 和 Comet 是搜索和问答类的工具，在某些场景下可以替代传统搜索引擎。它们的特点是能直接给出答案，而不是甩给你一堆链接。

这些工具的特点是：用对了场景就是神器，用错了场景就是鸡肋。关键是搞清楚自己的需求，再选对应的工具。

## 05、怎么选：场景匹配最重要

工具这么多，怎么选才不会踩坑？

核心原则就一条：场景匹配。

编程场景，Codex 和 Claude Code 是首选。

Codex 适合配合 IDE 做日常开发，写接口、改 bug、重构代码，效率提升明显。

Claude Code 适合复杂任务和端到端编程，从需求分析到代码实现到测试验证，一条龙搞定。Qoder 是性价比之选，Quest 模式和专家团模式是差异化竞争力，特别适合新项目启动阶段。

三个至少备一个，对学习的提升很大。

性价比最高的，当然是 Claude Code + 国内的 Coding Plan。

![](https://cdn.paicoding.com/stutymore/ai-tools-2026-20260404204954.png)

我个人的习惯是这样：日常开发用 Codex + IDEA，辅助用 Claude Code，新项目启动用 Qoder Quest + 专家团。三个工具互补，覆盖了大部分场景。

读源码场景，Gemini 和 zread.ai 表现最好。Gemini 对大型代码库理解能力强，上下文窗口大，适合全局分析。zread.ai 适合快速梳理项目结构，定位关键文件。两个工具配合使用，基本能把一个陌生项目吃透。

接手新项目的时候，我的做法是先用 zread.ai 快速了解项目结构，再用 Gemini 深入分析关键模块。这套组合拳下来，两三天就能对一个几十万行代码的项目有比较清晰的认识。

![](https://cdn.paicoding.com/stutymore/ai-tools-2026-20260404205105.png)

选工具的时候有个坑要避开：不要贪多。

有些小伙伴喜欢把所有工具都装一遍，结果每个都用不精，反而浪费时间。我的建议是每个场景选一个主力工具，先把它用熟，再考虑补充其他工具。

工具是拿来用的，不是拿来收藏的（哈哈，这篇你可以收藏😄）。

## ending

AI 工具发展到现在，已经不是用不用的问题，而是怎么用的问题。

从夯到拉，从量变到质变。

工具选对了，一个人可以顶一个小团队。工具选错了，就是瞎折腾浪费时间。

我的建议是：先把第一梯队的工具用熟，再根据场景补充其他工具。不要贪多，每个场景选一个主力工具就够了。

【**工具是死的，人是活的。把工具用到极致，才是真正的本事。**】

如果这篇内容对你有用，记得点赞，转发给需要的人。

我们下期见！
