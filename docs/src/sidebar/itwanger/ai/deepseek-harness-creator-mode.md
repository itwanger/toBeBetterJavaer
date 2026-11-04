---
title: DeepSeek 再放大招，上线 Creator Mode。
shortTitle: DeepSeek Harness Creator Mode 实测与拆解
description: DeepSeek Harness 0.2.2 新上线的 Creator Mode 实测，用一句话需求做出下班倒计时挂件、Style Lab 五套全局皮肤和 Transformer 3D Lab，顺带讲清创造模式背后的 Agent Preset 与 Cordis 插件机制。
keywords:
  - DeepSeek Harness
  - Creator Mode
  - DeepSeek-V4.1-Flash
  - Cordis 插件
  - Agent Preset
tag:
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-11-03
---

大家好，我是二哥呀。

DeepSeek 最近的动静有点大。先是 DeepSeek-V4.1-Flash-1017，版本号只是小改，能力却提升了一大截；然后是 Super-Agent 架构；今天又上了 Creator Mode（创造模式）。

![](https://cdn.paicoding.com/stutymore/deepseek-harness-creator-mode-20261103164054-dff5b802.png)

切到创造模式之后，你只要说清楚想要什么界面、什么工具或什么模式，DeepSeek 就会先查当前应用里有哪些插槽可以挂载，再写好前后端代码，最后调用内置的插件管理器装进当前环境。界面直接热更新，不用重启。

我在本地用它做了五个插件，从输入框旁的下班倒计时、给整个应用换皮肤的 Style Lab，一路做到 Transformer 3D Lab、3D 著名地标馆和 FUYU 体素沙盒游戏。下面从简单到复杂一个个来。

## 01、Creator Mode

目前有五个入口可以打开创造模式。

![](https://cdn.paicoding.com/stutymore/deepseek-harness-creator-mode-20261103170205.png)

最顺手的是新建一个空白会话，点开【模式选择】，把下拉菜单里的 `标准模式` 切成 `创造模式`。

创造模式在 DeepSeek Harness 里是一份内置的 Agent 预设，id 叫 `cordis`。

它包含标准模式的全部工具，另外多挂了三样东西。第一样是 `cordis_inspect_list` 和 `cordis_inspect_query` 两个查询工具，Agent 写代码之前用它们查当前运行中的服务、插件配置和界面插槽树。第二样是几份插件开发 Skill，告诉 Agent 宿主端插件和界面插件分别怎么写、怎么打包。第三样是插件管理器 `plugin_manager`，负责把写好的插件包装进当前 profile。

DeepSeek Harness 本身构建在 Cordis 插件框架上，模型适配、工具注册、会话日志乃至 Agent Loop 都是 Cordis 插件。所以 Agent 现写的插件和官方功能走的是同一套加载流程。

先拿下班倒计时挂件热个身。我们让创造模式在聊天输入框右上角挂一张倒计时卡片，实时显示离下班还有多久，到点后变成绿色的下班卡片。完整提示词如下，可以直接复制。

```text
请创建一个 DeepSeek Harness 插件 offwork-countdown，安装到当前 profile 并验证生效：
1. 插槽位置：挂载到聊天输入区右上角。
2. 界面与交互：渲染一张紧凑的圆角卡片，顶部显示时钟图标与“Until clock-out”标题，中间用等宽大字号实时显示距离下班的倒计时（格式 HH:MM:SS），下方配一条实时推进的进度条、下班时间说明（默认 18:30，支持点击微调时间）以及当日工作进度百分比。
3. 到点状态：当倒计时归零时，卡片边框与进度条变为绿色，标题切换为“Clocked out”，主文案显示“Great work today.”。
```

![](https://cdn.paicoding.com/stutymore/deepseek-harness-creator-mode-20261103170756.png)

建议在输入框左下角把权限切到 `完全权限`。

插件管理器的每次操作都要求完全权限，不切的话就得一次次点审批。切过去之后，DeepSeek 可以一次做完读插件开发指南、写前后端代码、安装验证这几步。

![](https://cdn.paicoding.com/stutymore/deepseek-harness-creator-mode-20261103164054-4279eefb.png)

倒计时归零后，卡片变成绿色，标题换成了 Clocked out。

![](https://cdn.paicoding.com/stutymore/deepseek-harness-creator-mode-20261103164054-11cbcfe1.png)

## 02、Style Lab

第二个案例是 Style Lab，一次做出五套全局皮肤。把下面这段提示词发给创造模式。

```text
请创建一个带左侧栏入口的 DSH 插件 dsh-plugin-style-lab，安装到当前 profile 并验证生效：
1. 入口与主面板：在左侧栏注册“Style Lab”入口，并在主工作区注册对应的面板页面，顶部提供“Default look”一键还原按钮。
2. 五套全局皮肤卡片：在主面板中展示 5 张带实时预览色块的主题卡片，点击任意卡片即可实时重绘整个 DeepSeek Harness（覆盖左侧栏、聊天流、输入框、代码卡与菜单），再次点击当前激活卡片或点击 Default look 即可恢复默认外观，所选皮肤自动保存在本地：
   - 8-Bit Pixel：像素街机风，全部圆角设为 0px，搭配复古描边边框、扫描线纹理与等宽像素感字体；
   - Neon Grid：午夜赛博面板，深蓝黑底色配青色与品红霓虹发光边框及背景网格；
   - Green Terminal：经典绿光 CRT 显示器风格，黑底荧光绿等宽文字与微弱扫描线；
   - Paper Press：暖米色纸张底板、深墨色衬线标题与纸张肌理；
   - Zen Glass：柔和鼠尾草绿配色、毛玻璃半透明面板与大圆角卡片。
```

安装完成后，左侧栏下方多了一个 `Style Lab` 入口。点进去是五张主题卡片，点 `Green Terminal`，不用重启，侧边栏、会话列表、聊天框和按钮一起变成了黑底绿字的老式终端。

![](https://cdn.paicoding.com/stutymore/deepseek-harness-creator-mode-20261103164055-67a08f1b.png)

再点 `8-Bit Pixel`，圆角全部消失，界面换成了街机的像素风。

![](https://cdn.paicoding.com/stutymore/deepseek-harness-creator-mode-20261103164056-34bdf27f.png)

## 03、Transformer 3D Lab

第三个案例的交互最多。

学 Transformer 的时候，词嵌入、Q/K/V 投影、自注意力权重和前馈网络，大多只能对着矩阵公式在脑子里想。

这次让创造模式把处理 5 个 Token 的 Transformer 模块在三维空间里展开，做成左侧栏里的一个 3D 实验室。提示词如下。

```text
请创建一个带左侧栏入口的 DSH 插件 dsh-plugin-transformer-3d-lab，在主工作区构建一个可交互的“Transformer 3D Lab”三维可视化实验室并安装生效：
1. 界面布局：深色太空网格画布。左侧栏注册“Transformer 3D Lab”入口；主界面顶部展示标题“Transformer 3D Lab（One five-token Transformer block, opened up in space）”以及模式切换按钮（Explore / Mission 0/4 / Head 1 · Dependency / Play the pipeline / Reset view / Back to chat）；右侧提供 Pipeline 六步拆解面板、Token Vector 激活条与 Inspector 详情卡。
2. 三维前向传播场景：以输入序列“the cat sat on the”预测下一个词“mat（概率 0.61）”为例，在三维空间中沿水平方向依次展开 6 个计算阶段：
   - 1 Embed：展示 5 个输入 Token 转化为 4 维向量柱；
   - 2 Q K V：展示每个 Token 分裂出 Query（橙色）、Key（青色）、Value（绿色）三组投影向量；
   - 3 Attention：绘制最后一个词“the”指向前文各词的半透明注意力弧线（其中指向“cat”和“sat”的弧线最粗最亮，匹配 softmax(Q·K / √d) 权重）；
   - 4 Mix：展示多头注意力拼接与残差相加后的混合表征；
   - 5 FFN：展示经过两层全连接网络放大再压缩的特征激活；
   - 6 Logits：在末端立起候选词概率柱，最高柱“mat”标黄显示 0.61，其余依次为“floor（0.18）”、“rug（0.09）”、“bed（0.06）”、“couch（0.03）”。
3. 交互控制：支持鼠标拖拽旋转 3D 视角、滚轮缩放、点击右侧 Pipeline 步骤（1~6）或三维场景中的任意模块自动平滑移动镜头并高亮对应计算层，在右下角 Inspector 实时显示该层公式与向量数值。
```

插件装好后，点击侧边栏的 `Transformer 3D Lab`，中间原本用来聊天的工作区就变成了一个三维场景。

5 个输入词 `the`、`cat`、`sat`、`on`、`the` 从左到右依次经过 `Embed`、`Q K V`、`Attention`、`Mix`、`FFN`，最后在 `Logits` 阶段立起一根黄色的概率柱 `mat (0.61)`。

![](https://cdn.paicoding.com/stutymore/deepseek-harness-creator-mode-20261103164057-7fee37f4.png)

按住鼠标左键可以拖动旋转视角，滚轮可以放大看某一层。

点右侧 Pipeline 面板里的第 3 步 `Attention` 或第 6 步 `Logits`，镜头会平移过去对准这一层，右下角的 Inspector 面板同步显示当前 Token 的四维向量和注意力权重公式。

点顶部的 `Play the pipeline`，能看到信号沿着六个阶段一层层亮起来。看完点右上角的 `Back to chat`，就回到聊天界面了。

## 04、World Architecture 3D

第四个案例是官方宣传片里热度很高的 3D 地标。

把万里长城、紫禁城太和殿、巴黎埃菲尔铁塔和罗马斗兽场一起搬进 DeepSeek Harness 的侧边栏，还带昼夜光影切换和建筑结构标注。可复现的提示词如下。

```text
请创建一个带左侧边栏入口的 DeepSeek Harness 插件 dsh-plugin-world-architecture-3d，用 3D 模型展示巴黎埃菲尔铁塔、中国长城、紫禁城太和殿与罗马斗兽场：
1. 界面布局：左侧栏注册“World Architecture 3D”入口；顶部工具栏提供 Day / Dusk / Night 三档光照切换、Auto-rotate 自动旋转、Annotations 标注开关、Reset view 与 Back to chat 按钮；底部提供四座地标的切换卡片；右侧展示建筑档案（FACT SHEET）、核心看点（WHAT TO NOTICE）与光影提示。
2. 三维建筑与锚点标注：在中央 3D 视口中构建带地形与定向光照的四座建筑模型，支持鼠标拖拽旋转与滚轮缩放，并在建筑关键结构上悬浮显示 3D 标注气泡（如长城的 Watchtower 敌楼、Ridge walkway 马道、Crenellations 垛口，紫禁城太和殿的 Double-eaved golden roof 重檐庑殿金顶、Three-tier marble terrace 三层汉白玉台基、Imperial dragon ramp 丹陛御道）。
```

装好之后点开左侧栏的 `World Architecture 3D`，先看白天模式下的慕田峪长城。

![](https://cdn.paicoding.com/stutymore/deepseek-harness-creator-mode-20261103181534-ab905182.png)

再切换到紫禁城太和殿，顺手把顶部的光照切到 `Dusk`。

![](https://cdn.paicoding.com/stutymore/deepseek-harness-creator-mode-20261103181534-c41d206d.png)

## 05、FUYU 沙盒游戏

如果你玩过《我的世界》或者《纪念碑谷》，对这种立体方块小岛一定不陌生。提示词如下。

```text
请创建一个带左侧栏入口的 DSH 插件 dsh-plugin-fuyu-sandbox，在主工作区构建一个可交互的等轴测 3D 体素海岛沙盒游戏“FUYU Voxel Island”并安装生效：
1. 界面与 HUD：左上角悬浮 FUYU 标识与“ISLAND · BERRY CAY”统计卡片，实时统计岛上的方块数（Blocks）、树木（Trees）与灯笼（Lanterns），并提供“+ Build Night Pavilion”一键建造按钮；右上角提供 SUNNY NOON（阳光正午）与 STARRY NIGHT（星夜提灯）昼夜切换胶囊；底部居中提供 8 格 Build Mode 方块工具栏（草地、沙滩、岩石、木柱、屋檐、发光灯笼、体素树、小羊）。
2. 三维体素场景与交互：在海面上渲染阶梯式沙滩、草地、7 棵体素树、3 只白色体素小羊与石质台基，支持点击放置或移除方块；点击切换至 STARRY NIGHT 星夜模式时，海面转为深蓝夜色，并在石质台基上立起一座双层飞檐中式木亭，四角与亭顶挂满带暖黄光晕的发光体素灯笼。
```

点开左侧栏的 `FUYU Sandbox`，默认进入 `SUNNY NOON` 正午模式。

![](https://cdn.paicoding.com/stutymore/deepseek-harness-creator-mode-20261103181534-a3061728.png)

点击左上角卡片里的绿色按钮或者右上角的 `STARRY NIGHT`，海岛瞬间入夜。

![](https://cdn.paicoding.com/stutymore/deepseek-harness-creator-mode-20261103181535-41846b42.png)

## ending

说说我的真实感受。

DeepSeek Harness 的创建模式有点像 QQ 空间，就是我们可以去自由装饰。

靓仔你又上线了？

以前侧边栏放什么入口、面板长什么样、内置哪几种工作模式，全得等官方发版。

Creator Mode 厉害的地方在于，它让软件具备了在运行时自己改造自己的能力。你只管提想法，搞插槽、读规范、写代码、打包热更新这些原本属于插件开发者的活，全部由 Agent 在后台替你跑通。

![](https://cdn.paicoding.com/stutymore/deepseek-harness-creator-mode-20261103175617.png)

DeepSeek Harness 是在 Cordis 框架上构建的，连它自己的模型适配、工具调用、会话管理乃至界面插槽全都是插件。这意味着我们在创造模式里造出来的东西，和官方的原生功能拥有同等的地位。

“Your Harness. You Define It”。

我们下期见。
