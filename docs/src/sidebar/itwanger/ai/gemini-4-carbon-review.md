---
title: Gemini 4 Carbon 正式开放，正面硬刚 Fable 5.2。
shortTitle: Gemini 4 Carbon 实测与顶级 Case 盘点
description: Google 王牌大模型 Gemini 4 Carbon 正式开放，详解百万上下文、API 定价与 CursorBench 4.0 成绩，附 Antigravity 3D 超跑展厅实测提示词与六大硬核 Case 拆解。
keywords:
  - Gemini 4 Carbon
  - Antigravity
  - Fable 5.2
  - AI编程
  - Vibe Coding
tag:
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-11-11
---

大家好，我是二哥呀。

进入 11 月，AI 圈是真热闹。Fable 5.2 前脚刚发布，谷歌就把自己的王牌模型 Gemini 4 Carbon 全量上线了。

我的 Antigravity 里已经可以用了。

![](https://cdn.paicoding.com/stutymore/sucai-20261111094722.png)

当初 Gemini 4 Argon 等了很久才全面开放，这次 Carbon 上线快多了。

先来看看我用 Carbon 做的一个 3D 超跑数字展厅，效果是真的好。

【录屏视频 1】

从定位上看，日常的大多数软件工程和知识处理任务，依然交给 Gemini 4 Argon 就行；Gemini 4 Carbon 则专门用来处理高难度场景，比如需要长时间连续执行的 Agent 工作流、复杂的系统工程、网络安全和科学推理。

上下文窗口仍然是 1M，单次最多可输出 `65536` 个 Token，思考深度分 `Low`、`Medium`、`High` 三档。

![Gemini 4 Carbon 官方跑分与定价对比看板](https://cdn.paicoding.com/stutymore/gemini4-carbon-bench-price-20261111103441-957a54f5.jpg)

在最新公布的 `CursorBench 4.0` 榜单上，Gemini 4 Carbon 的 High 档以 `60.4%` 的得分排名第一。

API 定价也很有诚意。2026 年 11 月 30 日之前是首发体验期，这段时间里 Gemini 4 Carbon 和 Gemini 4 Argon 的价格完全一样。

## 01、3D 超跑数字展厅

注意，在 Antigravity 里使用 Gemini 4 Carbon，需要开通 Google AI Ultra 会员。

我选的是 `Medium` 档，直接用 `/swarm` 多智能体模式，让它组建一个 4 人小团队来做这个可交互的 3D 超跑数字展厅。

![](https://cdn.paicoding.com/stutymore/gemini-4-carbon-review-20261111115804.png)

有 Ultra 会员的小伙伴，可以把下面的提示词复制到 Antigravity 里，自己做一遍。

```text
/swarm 目标：在当前空项目中，用 HTML、JavaScript 和 Three.js 做一个可在浏览器运行的交互式 3D 超跑数字展厅，无需后端。

团队规模与分工约束：
- 保持精简团队：1 个 Coordinator、2 个 Builder、1 个
Verifier，不要派生更多节点，不要调用外部 Blender。
- Coordinator
负责规划目录结构与接口约定，将代码拆分为独立模块避免合并冲突，规划完成后停止扩充需求。
- Builder 1 负责 3D
场景、超跑几何建模、清漆金属与碳纤维材质、展厅主光与轮廓光、日夜天际线切换。
- Builder 2 负责相机运镜预设（环绕、座舱内部、低角度宣传片推进）、5
种车漆换色、车门开合动画、整车结构分层展开动画以及热点说明卡片 UI。
- Verifier 负责在预览中检查渲染与交互，列出问题清单；Builder
完成一轮修复后立即结束任务并拉起预览。
```

![](https://cdn.paicoding.com/stutymore/gemini-4-carbon-review-20261111121343.png)

按回车发送后，输入框里的 `/swarm` 自动变成了一个像素小蜜蜂图标。

`Coordinator` 只用了 26 秒，就规划好了目录结构和模块之间的接口约定。所有模块都通过 `createShowroomApp(canvas)` 这个入口，统一约定场景、车体分组和每一帧的回调接口。

分工也很清楚。

- `builder-1` 负责 3D 场景、建模相关的文件；
- `builder-2` 负责与交互、镜头运动相关的文件。

右侧的 `Board` 面板会实时滚动显示每个节点的任务分配和进度汇报。10 分钟后，`@builder-2` 第一个完成了全部交互模块，并用 `node --check` 做完语法检查，随后在看板上向 `@coordinator` 汇报完成。

![](https://cdn.paicoding.com/stutymore/sucai-20261111104643.png)

切到 `Members` 标签页，可以看到团队的 4 个节点全部运行在 `gemini-4-carbon` 模型上。

![](https://cdn.paicoding.com/stutymore/sucai-20261111104659.png)

再打开 `Graph` 标签页，4 个角色之间的消息往来会画成一张实时更新的关系图，连线越粗，说明两个角色之间用 `@mention` 互相点名的次数越多。拖动顶部的时间轴，还能回放整个团队在这 9 分半钟里的协作过程。

![](https://cdn.paicoding.com/stutymore/sucai-20261111104715.png)

最终的成品完成度很高。

![](https://cdn.paicoding.com/stutymore/gemini-4-carbon-review-20261111121642.png)

点一下控制面板上的车漆色卡，车身颜色立刻切换；点一下车门开关，两侧车门平稳升起；切到分层展开模式，外壳、底盘、动力总成和四个轮毂会沿着轴线平稳分开；鼠标悬停在热点上，还会弹出对应的工程参数卡片。

我还整理了几个顶级 Case，大家一起开开眼界。

## 02、逆向经典游戏《Theme Park》

这个 Case 来自 DeepMind 的负责人，任务是直接对经营游戏《Theme Park》的二进制文件做逆向，还原出游戏逻辑，再往里面加一座定制的 DeepMind 游乐设施，最后移植成网页版。

![Theme Park 二进制逆向与网页版运行动图](https://cdn.paicoding.com/stutymore/gemini4-carbon-themepark-20261111103453-c9138609.gif)

老玩家应该对 1994 年牛蛙工作室开发的《Theme Park》有印象。把一款三十多年前的二进制程序，还原成能在浏览器里运行的网页游戏，难度远高于从零写一个新的小游戏。

模型要先从没有源码、没有注释的二进制数据里，理清地图网格、道路铺设、游乐设施、游客和资金结算这些逻辑；再把原本依赖硬件和老式图形接口的渲染流程，改写成 Canvas 或 WebGL 代码。

![Theme Park 逆向移植流程解析图](https://cdn.paicoding.com/stutymore/gemini4-carbon-themepark-flow-20261111103454-428bc042.png)

更难得的是，它不仅跑通了原版公园的建造和运营逻辑，还在原有的建筑体系里加了一座带 DeepMind 标识的新游乐设施，而且是一次生成就完成的。

这说明在长上下文里，Gemini 4 Carbon 能同时做好读懂老代码、换一种语言重写整体架构、在此基础上加新功能这三件事。

## 03、3D 开放世界游戏

这个 Case 是 Google 官方团队用 Antigravity 的 `/swarm` 做出来的浏览器 3D 开放世界游戏《Pelican Quest》（鹈鹕探索记）。

在 AI 圈，“让模型画一只骑自行车的鹈鹕”是一个经典老梗，原本用来测试模型的空间理解和 SVG 绘图能力。这次官方团队把难度提到了 3D 开放世界游戏的级别，让一只骑自行车的鹈鹕，在 Google 山景城园区里自由穿行。

![Pelican Quest 开放世界 3D 游戏实机录屏动图](https://cdn.paicoding.com/stutymore/gemini4-carbon-pelican-20261111103454-f957c05c.gif)

这个 Case 最值得关注的是它的生成方式。

团队在 Antigravity 里输入 `/swarm` 命令，只给了一条提示词，Antigravity 就自动创建出负责协调的 Coordinator、负责开发的 Builder 子智能体，以及负责找问题的 Critic 子智能体。每个节点在各自独立的 Git worktree 里并行开发，通过共享看板同步进度。

![Antigravity /swarm 多智能体协作看板与迭代流程](https://cdn.paicoding.com/stutymore/gemini4-carbon-swarm-20261111103455-70213346.png)

开发时，Builder 先在 Blender 里完成园区 3D 资产的建模，再用 Three.js 写出前端游戏代码。

Builder 写完，Critic 都会检查渲染出来的画面，发现穿模、光影错误或动作僵硬，就退回给 Builder 继续修改。两个角色在 Blender 和 Three.js 之间反复迭代，直到做出一个可以玩的园区。

## 04、19 世纪巴黎光学实验室

这个 Case 只提供了一张静态参考图，没有任何 UI 设计稿，由 Gemini 4 Carbon 独立做出了一个 19 世纪巴黎风格的交互式光学实验室 `Analyse Spectrale`。

![19 世纪巴黎光学实验室 Analyse Spectrale 交互动图](https://cdn.paicoding.com/stutymore/gemini4-carbon-optics-20261111103456-d626e4ae.gif)

在 `Analyse Spectrale` 里，Gemini 4 Carbon 用代码搭出了 `92` 个零件。镜片支架、刻度旋钮、金属底座的高光，以及玻璃的折射效果，都做得相当逼真。

![光学实验室档案风 Bento UI 与 60 FPS 瓦特表特写](https://cdn.paicoding.com/stutymore/gemini4-carbon-optics-ui-20261111103456-a18c8f11.jpg)

更让人惊艳的是物理仿真和界面设计。

实验室中间实时运行着两套物理计算，分别是比尔-朗伯定律（Beer-Lambert，描述光穿过介质时强度怎样衰减）和兰金涡旋（Rankine Vortex，一种常用的旋涡流动模型）。调节参数，就能看到光束穿过介质时的衰减，以及旋涡的变化。

## 05、百万粒子的 WebGPU 模拟

这个 Case 是在 Antigravity 里用 Gemini 4 Carbon 做的 `TIDEFORGE` 流体模拟网站。整个过程只给了一次提示词，没有抽卡。

![TIDEFORGE 百万级 WebGPU 粒子模拟运行动图](https://cdn.paicoding.com/stutymore/gemini4-carbon-tideforge-20261111103457-3db1f37a.gif)

平时用 CPU 或 WebGL 做粒子动画，粒子数一旦超过几万个，浏览器的帧率就会明显下降。想要上百万个粒子在网页里流畅运动，通常要用 WebGPU 的计算着色器（Compute Shader），把粒子的位置更新、速度场计算和碰撞受力全部交给 GPU 并行计算。

Gemini 4 Carbon 写出的代码在浏览器里实时跑起了 `1048576` 个粒子。这个数字刚好是 $2^{20}$，和它自己的上下文窗口大小一样。

## 06、CUDA

这个 Case 展示的是 Gemini 4 Carbon 在 C++ 和 GPU 并行计算上的能力。这个项目不借助 Unity、Unreal 这类游戏引擎，也不引入任何第三方 3D 渲染库，只用 CUDA 和 C++ 从零写出了一整片随风起伏的草地。

![CUDA 与 C++ 原生渲染 52,000 株野花草地动图](https://cdn.paicoding.com/stutymore/gemini4-carbon-grass-20261111103457-c6a86b40.gif)

没有现成的引擎可用，就意味着摄像机的矩阵变换、计算草弯曲的 CUDA 核函数（Kernel），以及光照着色，全都得由模型一行一行代码写出来。

![CUDA 风场物理计算与 C++ 实时风声合成联动图解](https://cdn.paicoding.com/stutymore/gemini4-carbon-wind-20261111103458-760793c2.png)

声音部分更有意思。模型没有加载现成的音频文件，而是在 C++ 里写了一个程序化的音频合成器，读取当前阵风的强度参数，实时合成风声。

## 07、3D 可视化

最后一个 Case 是 Gemini 4 Carbon 在科研和数学推理上的表现。

Google 团队拿了一篇 2026 年发表的针织纺织力学论文，在 Antigravity 里让 Gemini 4 Carbon 把论文中难懂的偏微分方程和材料力学公式，做成了一个可交互的 3D 纤维力学实验室。

![针织纺织力学 110 根纤维交互式 3D 可视化动图](https://cdn.paicoding.com/stutymore/gemini4-carbon-fibers-20261111103459-08762500.gif)

研究材料力学时，只看论文里的公式和二维图表，很难想象纱线在拉伸、扭转时，内部每一根纤维是怎样互相挤压、传递力的。

Gemini 4 Carbon 生成的这套 3D 系统，可以在浏览器里同时追踪 `110` 根纤维在受力状态下的变化。

![Gemini 4 Carbon 科学推理与 Signal 协议形式化验证看板](https://cdn.paicoding.com/stutymore/gemini4-carbon-science-evidence-20261111103459-953c4bf7.jpg)

## ending

这么说吧，我现在主力文本模型就是 Gemini。

以前当然是 Opus 5.5，但 Claude 搞这么严肃，只能小心翼翼的用，不敢放开用。

希望 Gemini 继续进化吧。

![Gemini 4 Carbon 全渠道开放与能力总览图](https://cdn.paicoding.com/stutymore/gemini4-carbon-overview-20261111103459-78f1adeb.png)

希望国产模型也继续进化吧，希望一年后能追上 Opus 5.5 的文本输出能力，我睡觉都能笑着醒。

我们下期见。
