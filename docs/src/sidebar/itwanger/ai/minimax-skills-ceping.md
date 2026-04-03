---
title: 刚开源就 5K Star！MiniMax Skills 实测：AI 写代码的天花板，真的拉高了
shortTitle: MiniMax Skills 实测
description: 实测 MiniMax Skills 三大核心技能包：frontend-dev、fullstack-dev、minimax-pdf，给出真实体感，不夸不黑。
tag:
  - Skills
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-03-30
---

大家好，我是二哥呀。

这段时间，Skills 这个概念被炒得相当热。

Anthropic 出了一批，OpenAI 出了一批，现在 MiniMax 也把自家压箱底的技能包全部开源了，现在已经飙升到 7.8K+ Star。


![](https://cdn.paicoding.com/paicoding/19e3eaaea657d7bedcbafd5ebe053001.jpg)


他们的口号是：把 AI 写代码的质量，从「大学生水平」直接拉到「5 年以上资深工程师水平」。

我第一反应：吹牛吧？

但 Star 数不会说谎。当天就把仓库 clone 下来，拿自己的简历生成项目 PaiResume 来测试，重点跑了 frontend-dev、fullstack-dev、minimax-pdf 三个 Skill。


![](https://cdn.paicoding.com/paicoding/ed608e760e24a8f302bafb6a36905651.jpg)

其他Skills大家也可以自测一下。

## 01、MiniMax Skills 是什么

Skills 这个概念很好理解，就是给 AI 编程工具用的「任务规范手册」。

它告诉 AI：这类任务应该怎么分析、怎么设计、怎么动手、怎么验收。换句话说，它封装的不是代码，而是一个有经验的工程师做决策的那一层思维。

MiniMax 这次开源的是 15 个 Skill，分两大类。

开发类有 frontend-dev、fullstack-dev、android-native-dev、ios-application-dev、flutter-dev、react-native-dev、shader-dev、gif-sticker-maker 共 8 个；

办公类有 minimax-pdf、pptx-generator、minimax-xlsx、minimax-docx、minimax-multimodal-toolkit、vision-analysis，加上一个社区贡献版，共 7 个。

开源地址：`https://github.com/MiniMax-AI/skills`，MIT 协议，随便用。

安装方式因工具而异，不过都不难。

我这里用的Codex，直接输入这串提示词。

```bash
https://github.com/MiniMax-AI/skills 这是MiniMax给出的Skills库，我们重点安装这三个frontend-dev、fullstack-dev、minimax-pdf
```

很快就安装好了。


![](https://cdn.paicoding.com/paicoding/bb9c55051c4a18a7bba9406e2e1cc378.png)


好，环境搭好，正式开测。

## 02、frontend-dev 实测

光看 frontend-dev 的描述就觉得野心很大：React/Next.js + Tailwind CSS 技术栈，整合了 Framer Motion 和 GSAP 的动效体系，能调 MiniMax API 生成图片、视频、TTS 等 AI 媒体素材，还支持 p5.js、Three.js 做生成艺术。

说白了，这个 Skill 不只是「帮你写 UI」，而是定义了一整套「怎么把页面做到生产级」的工程规范，内部走的是六阶段工作流：设计架构 → 动效规划 → 素材生成 → 文案撰写 → 界面实现 → 质量检查，每一步都有明确的输入输出要求。

我的测试场景是 PaiResume——自己做的简历生成项目，React + @react-pdf/renderer + Tailwind CSS，简历展示页的交互动效几乎是零，视觉层次很平，正好用来测。

提示词只写了一句话：

> 简历展示页布局已完成，缺乏动效和视觉层次感，用 Framer Motion 做一套入场动画，要有简历卡片的交错出现效果，整体偏专业沉稳风。


![](https://cdn.paicoding.com/paicoding/df71466cc0a8c253cd0973713019d633.png)


Codex 在 frontend-dev 的约束下，没有直接开写代码。它先做的第一件事是扫描 PaiResume 的组件树，搞清楚哪些元素适合做交错入场、哪些区域要固定不动、动效总时长控制在多少秒以内才不会让用户觉得卡顿。

这个「先摸底再动手」的顺序，没有 Skill 约束的时候，AI 大概率会直接给你塞一堆 motion.div。


![](https://cdn.paicoding.com/paicoding/b9e3aaf304bbaf77706e9009bc0bcdda.jpg)


最终效果，专业、稳、动而不乱。实际上只花了不到 15 分钟，而且第一遍就过了，没有反复改。

如果你以前试过直接让 AI 加动效，十次里面有八次是给你堆一堆 transition 和 animation 属性，改来改去改不干净。

frontend-dev 的不同在于，它先帮你把「这页面应该有哪些层次的动效、各自的节奏是什么」想清楚，然后再落到代码。这个顺序反过来之后，结果天差地别。

## 03、fullstack-dev 实测

如果说 frontend-dev 让我有点意外，那 fullstack-dev 给我的感觉是：「这才是给工程师用的东西。」

这个 Skill 的覆盖面非常广：REST API 设计、JWT/Session/OAuth 认证流程、SSE/WebSocket 实时通信、SQL/NoSQL 数据库集成、生产环境加固，还提供了一套从「需求澄清 → 架构决策 → 项目搭建 → build/smoke/integration 验证」的完整工作流引导。

我的测试场景还是 PaiResume，我的提示词是：

```
请用 fullstack-dev 的方式审视并改进我的项目 PaiResume。

项目背景：
- 前端：React + Vite + TypeScript + Zustand + Axios + Tailwind
- 后端：Spring Boot 3 + MySQL + Redis + JWT
- 业务：一个在线简历系统，包含登录注册、简历列表、简历模块编辑、AI 优化、PDF 导出与解析
- 当前问题：前后端能跑，但在鉴权续期、错误处理、接口契约一致性、配置管理、联调稳定性方面还不够稳

我希望你按 fullstack-dev 的思路完成下面几件事：
1. 先基于当前项目做架构判断，明确：
   - 这是怎样的 full-stack 架构
   - 前后端边界是否清晰
   - 当前 auth、API client、错误处理、配置管理分别属于什么成熟度
2. 找出最值得优先修复的 3-5 个 full-stack 问题，重点看：
   - JWT + refresh token 链路
   - Axios 请求/响应拦截器设计
   - Spring Security 的 401/403 语义
   - 前后端统一返回格式 code/message/data
   - CORS、环境变量、启动配置
3. 直接在代码里修复你认为最关键的问题，而不是只给建议
4. 修复后完成验证：
   - 前端 build
   - 后端 compile / build
   - 实际接口 smoke test
   - 前端与后端联调验证
5. 最后输出：
   - 你做了哪些架构决策
   - 改了哪些关键文件
   - 还存在哪些后续建议

要求：
- 不要只做纯前端 UI 调整
- 不要只停留在分析，能修的直接修
- 优先保证鉴权、联调、错误处理、配置这几个核心链路
- 变更尽量贴合当前项目，不要为了“标准架构”而大拆大改
```


![](https://cdn.paicoding.com/paicoding/a11f46ab3ce7c0be21f3d717ff26075a.png)


Codex 在 fullstack-dev 的引导下，没有急着出代码，而是先抛出了三个问题。

- 前端：把 API base URL 和错误收敛再规范一点，避免环境切换和接口报错时行为不一致
- 后端：把 CORS、健康检查和匿名访问端点收口成可配置方案
- 配置：补全 .env.example，让前后端启动参数和联调方式更清楚


![](https://cdn.paicoding.com/paicoding/e1393abd4c2330d1f92dc4a2dd49bd4a.png)


这次修改的内容可不少，全部按照 fullstack-dev 的规范去完成优化的。

## 04、minimax-pdf 实测

这是我最期待的一个 Skill，原因很直接——PaiResume 本身就在做简历 PDF 导出，现有的实现用的是 @react-pdf/renderer，样式控制有限，生成出来的 PDF 有种「模板感」，缺那么一点高级感。

minimax-pdf 定义了三种工作模式：CREATE 是从零生成 PDF，FILL 是给现有 PDF 填写表单字段，REFORMAT 是把已有内容重新排版成高质量 PDF。

我的场景最对应 REFORMAT——把 PaiResume 已有的 JSON 格式简历数据，重排成视觉质量更高的 PDF。

提示词如下：

> 我有一份结构化简历数据，包含基本信息、教育背景、工作经历、项目经历、技能标签。用 minimax-pdf 的 REFORMAT 模式生成一份技术岗简历 PDF，风格简洁大气，配色用冷色调，不要花里胡哨的装饰。


![](https://cdn.paicoding.com/paicoding/89c55d5d345b7ccabc64c9056468f82d.png)


minimax-pdf 的响应方式和前两个 Skill 有个明显不同——它先做了一件事，叫「设计令牌选择」，就是根据我的诉求（冷色调、技术岗、简洁大气），从预设的色彩体系里给出推荐方案。

最终选定：主色调 Steel Blue（#4A90D9），辅色浅灰，字体组合选了 Inter 用于正文、JetBrains Mono 用于技术栈和代码相关内容。

技术实现上，minimax-pdf 把封面和正文拆成两套渲染引擎：封面用 Playwright 渲染 HTML+CSS，视觉层次感很清晰；正文用 ReportLab 排版，行间距和段落节奏控制得非常舒服，最终合并输出成完整 PDF。


![](https://cdn.paicoding.com/paicoding/d9ff51256200caec0b5a3f2550b7af14.jpg)




需要说明一点：minimax-pdf 依赖 Python 3.9+、Node.js 18+，以及 reportlab、pypdf、playwright（含 Chromium）这几个依赖，不是开箱即用，需要提前安装。

## 05、其余技能速览

除了这三个重点测试的技能，剩下的 12 个也简单过一遍，方便有需要的同学按图索骥。


![](https://cdn.paicoding.com/paicoding/ac3da7a059683863bc3f0cdd339013c2.jpg)


android-native-dev 走 Material Design 3 规范，Kotlin + Jetpack Compose，强调无障碍合规和性能优化，想做 Android 开发的可以关注。ios-application-dev 覆盖了 UIKit、SnapKit 和 SwiftUI，遵循 Apple HIG 标准，iOS 开发者直接用。

gif-sticker-maker 比较有意思，能把照片转成 Funko Pop 风格的动态 GIF 贴纸，背后调的是 MiniMax 的图片和视频生成 API，做自媒体内容的同学应该会喜欢。

shader-dev 给做 GLSL 视觉特效的开发者准备，覆盖光线步进、SDF 建模、粒子系统，方向比较垂直，有这块需求的直接用。

minimax-xlsx 绕开了所有 Python Excel 库，直接在 XML 层面操作电子表格，目的是保留样式、图表、宏等复杂格式，还附带了一套 34000 字的金融格式化标准文档，这个细节看起来有点极客。minimax-docx 选用 .NET OpenXML SDK，支持从零生成、编辑已有文档、套模板三种场景，Word 重度用户可以试试。

## ending

你有没有遇到过这种情况——有一件技术上的事你明确知道该做，但就是一直拖着没做。

不是不会，是没空。

【**工程师的天花板，往往不是你不会，而是你没时间想得那么细。**】

MiniMax Skills 这套东西，与其说是给 AI 的超级 Prompt，不如说是把有经验的工程师做决策的那一层——先分析、再设计、还要检查——写成了机器可以执行的标准。

你用了它，不会突然变成高级工程师。但你会开始用高级工程师的方式交付代码。

这种改变，慢慢的，会影响到你写的每一行代码。

如果这篇对你有用，点个赞，转发给身边需要的小伙伴。

我们下期见！
