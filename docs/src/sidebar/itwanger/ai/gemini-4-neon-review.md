---
title: 彻底成功，Gemini 4 Neon 太带劲了。
shortTitle: Gemini 4 Neon 深度实测
description: Google DeepMind 正式发布 Gemini 4 Neon，本文盘点 Google 表格跑 50 万公式渲染、10200 行 Shader 勃朗峰滑雪、图灵 1936 书房与 Terra Breaker 等全网高能实测，附 3D 霓虹元素实验室自测方案、跑分与 Orchestrator 成本拆解及元素周期表选型表。
keywords:
  - Gemini 4 Neon
  - Google DeepMind
  - Google Antigravity
  - Orchestrator
  - AI Agent
tag:
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-11-19
---

大家好，我是二哥呀。

你说神奇不神奇，Anthropic 搞文艺，Opus（神作）、Fable（寓言）；OpenAI 搞天文，Astra（星辰）、Sol（太阳）；Gemini 搞化学，Neon、Argon、Carbon。

为了搞懂每个模型到底啥意思，我甚至重新背了一遍元素周期表（你别问，问就是第一个元素都忘了）。

查了一下，`Gemini 4 Neon`，对应的元素是“氖”。在 Gemini 4 全家桶里，它的定位刚好在主打极速的 Hydrogen 和旗舰 Carbon 之间。

![](https://cdn.paicoding.com/stutymore/gemini-4-neon-review-01-release-20261119135053-fb3c174d.png)

嗯？

那 Gemini 4 Argon，岂不是很尴尬？

就像古代的皇子们，既不是嫡长子，又不是老爹老妈最爱的，处境堪忧啊。

来，看看大家都用 Neon 做出了什么顶级 Case。

## 01、四个神级 Case

下面这四个高赞 Case，个个都能看出 Neon 的实力。

一睹为快。

### 第一个，把 Google 表格当显卡

一个让你惊掉下巴的 Case，用多个 Neon Agent 协作跑出的“电子表格显卡”。

任务是把一张静态照片转换成包含 `10` 万个单元格的 Google 表格。苛刻的地方在于，全程不写一行 Script 脚本，只靠电子表格自带的公式硬算。

![](https://cdn.paicoding.com/stutymore/gemini-4-neon-review-02-sheets-rendering-20261119135148-78ca1a59.gif)

这群 Neon Agent 们往表格里写进了超过 `50` 万条公式，硬生生在网格里跑通了图像边缘检测、3D 深度映射，还做出了 `6` 种可切换的交互打光模式。

说人话就是，别人拿电子表格算工资和报销，Neon 拿它当显卡渲染画面。

### 10200 行 Shader 手写勃朗峰滑雪

再看一个硬核的图形学工程。

谷歌在官方展示中让 `Gemini 4 Neon` 从零手写了一款第一人称的 WebGL2 阿尔卑斯滑雪模拟器，地形基于勃朗峰与霞慕尼的真实数据构建。

![](https://cdn.paicoding.com/stutymore/gemini-4-neon-review-03-mont-blanc-ski-20261119135054-5c80e52b.gif)

整个项目没有用一张现成的贴图，也没有用外部模型，由 Neon 一口气写出 `10200` 行的 Shader 代码，实现了每秒 `120` 次更新频率的物理引擎，内置了 `6` 条阿尔卑斯的滑行路线。

滑行时，雪板会在积雪上留下一道清晰的划痕，陡坡时还会触发雪崩，耳边的音效也会随着速度和坡度发生变化。

### 复原图灵 1936 年的书房

下面这两个 Case，最能体现 `Gemini 4 Neon` 在 Antigravity 里指挥多 Agent 协作的能力。

谷歌团队先拿历史建筑练手，`1:1` 复原了阿兰·图灵 1936 年在剑桥国王学院的书房。Neon 参照历史档案中的照片，指挥多个 Agent 同时干了几个小时，从国王学院礼拜堂的外景，一直到书房里的壁炉和陈设，书桌上还摆着一台运行着的通用图灵机。

![](https://cdn.paicoding.com/stutymore/gemini-4-neon-review-04-swarm-and-blender-20261119135056-3ba92c81.gif)

另一个演示刚好呼应了开篇的元素周期表。Neon 在 Antigravity 里通过 MCP 操作 Blender，搭了一座写实风格的 3D 化学实验台，给 Carbon 和 Hydrogen 配上燃烧的火焰，给 Argon 和 Neon 配上能发光的气体放电管。

既有技术人的浪漫，又把自家的命名玩明白了。

### 《Terra Breaker》

某知名社区平台有位很活跃的 AI 博主 Chubby，拿 `Gemini 4 Neon` 在 Antigravity 里测了一整天，一口气做出了 `17` 个能交互的 Demo，有射击游戏，也有 3D 场景。

![](https://cdn.paicoding.com/stutymore/gemini-4-neon-review-05-terra-breaker-20261119135057-90f43224.gif)

其中转发量最高的一款叫《Terra Breaker》，是一个能把场景打碎成方格的竞技场，整个世界由一个个小方块（体素）组成。有意思的是，博主一开始只提了破坏和重置这两个简单的需求，Neon 却主动加上了三种风格不同的建筑和三种效果不同的破坏工具。

## 02、亲手实测

既然聊到了元素周期表，干脆就让 `Gemini 4 Neon` 从零搭建一座 3D 实验室。

![](https://cdn.paicoding.com/stutymore/gemini-4-neon-review-06-antigravity-neon-medium-20261119135059-f506d580.png)

完整提示词我放在下面，想自己复现的小伙伴可以复制去跑一下。

```text
请在当前空目录下，从零开发一个可直接离线在浏览器运行的 3D 交互科学艺术项目《Neon Lab 3D：赛博霓虹元素实验室》，使用 Three.js（本地打包或单文件离线可打开，不引用任何外部图片、外部 3D 模型或外部音频素材，全部几何体、GLSL Shader、玻璃材质与声效均由代码程序化生成）。

【核心视觉与场景】
1. 暗调赛博物理实验台：黑曜石拉丝台面、金属导轨、带微弱反光的湿润背景砖墙与可控环境光，整体采用写实暗调工业风加高质量 UnrealBloom 霓虹辉光后处理，画面通透有纵深，禁止廉价荧光糊成一团。
2. 中央四联高压气体放电台（呼应 Gemini 4 化学家族）：并排架设 4 支带金属电极接头、玻璃管壁菲涅尔折射与绝缘支架的 3D 玻璃反应腔：
   - H（氢 / Hydrogen）：高频品红偏紫等离子喷流与快速粒子脉冲；
   - C（碳 / Carbon）：高温橙蓝本生灯火焰，支持一键切换内部 3D 金刚石晶格与石墨烯六边形层状结构；
   - Ne（氖 / Neon，默认居中焦点）：标志性经典橙红霓虹辉光，管内带实时跳动的程序化分支电弧；
   - Ar（氩 / Argon）：冷冽电光紫蓝辉光放电管。
3. 3D 悬浮 118 号元素周期表星环：右侧或顶栏提供一键切换按钮，点击后实验室镜头平滑拉远并展开完整的 3D 弧形 118 号元素周期表卡片墙（按族类配色、标注原子序数/符号/中文名/相对原子质量，重点高亮 H、C、Ne、Ar）。点击任意元素，镜头推进到分子检验台，实时生成该元素的 3D 玻尔电子层轨道动画与对应特征颜色。

【三大硬核交互玩法】
1. 高压电源控制台（0 kV - 15 kV 连续旋钮）：
   - 0 - 3 kV：管内处于暗态，仅灯丝微红；
   - 3 - 7 kV：达到气体临界击穿电压，自定义 GLSL Shader 渲染随机分叉的跳跃电弧与不稳定闪烁；
   - 7 - 15 kV：进入稳定高亮度霓虹辉光状态，辉光半径与台面、砖墙的实时彩色反射同步增强。
   - 同步驱动 Web Audio API 实时程序化合成声音（不加载外部音频）：低电压轻嘶声、临界击穿时的随机啪嗒电弧声、高电压稳定 50Hz 变压器嗡鸣，提供静音开关。
2. 3D 霓虹灯牌工坊（Neon Sign Studio 模式）：
   - 允许用户输入自定义英文/数字短句（内置快捷预设按钮：`NEON 4`、`GEMINI`、`ERGE`），通过代码生成带厚度和弯折圆角的 3D 玻璃灯管字形、金属背面支架、高压导线与墙面投影。
   - 支持一键更换管内充入气体（充 Ne 变经典橙红、充 Ar 变电光紫蓝、充 H 变品红等离子、充 Kr 变冰白），以及切换“干燥墙面 / 雨夜湿滑反光墙面”材质。
3. 切开看结构（极客剖析 HUD）：
   - 一键切换“实体渲染 / 线框几何剖析（Wireframe）”，展示玻璃管、电极与晶体结构的干净拓扑网格；
   - 底部实时显示当前选中元素的真实特征发射光谱条（Emission Spectrum，标出主谱线波长 nm，如 Ne 的 585nm/640nm 红橙谱线集群）与实时帧率 FPS。

【交互体验与自检验收硬要求】
1. 鼠标拖拽 360 度轨道环视、滚轮缩放、镜头阻尼平滑，且默认初始机位构图居中饱满，打开页面无需点击“开始”即可看到正在发光的四支元素管与高清反射台面。
2. 右侧或底部收拢为半透明极简毛玻璃控制条，严禁大块文字遮挡 3D 主体；窗口缩窄时布局不重叠、不出现横向滚动条。
3. 开发完成后，必须自行启动本地服务并在真实无头浏览器里打开页面，检查浏览器控制台确保零 JS/WebGL 报错；分别截取 4 张关键状态图（默认四元素高压发光全景、3D 118 元素星环与原子轨道、霓虹灯牌工坊充入不同气体效果、线框剖析与光谱仪视图），逐张用视觉能力检查构图、辉光是否过曝、文字是否清晰、有无穿模，发现瑕疵主动返工精修后再交付最终版本与启动方式。
```

![](https://cdn.paicoding.com/stutymore/gemini-4-neon-review-07-lab-bench-20261119135059-7bca4971.png)

![](https://cdn.paicoding.com/stutymore/gemini-4-neon-review-08-neon-lab-20261119135149-2a24ceb2.gif)

## 03、跑分和速度

把 Google DeepMind 官方公布的成绩和第三方评测机构 Artificial Analysis 的榜单放在一起看，就能明白海外开发者为什么给 `Gemini 4 Neon` 起了个“甜点屠夫”的外号。

![](https://cdn.paicoding.com/stutymore/gemini-4-neon-review-09-benchmarks-20261119135100-ef14f005.png)

挑几个指标来看：

- 在 Artificial Analysis 的综合智能指数上，Neon 开到最高档 `xhigh` 拿到了 `61.4` 分，排进全球前三；在编程 Agent 榜单上以 `58.6` 分排名第一。
- 在 CursorBench 4.1 上，Neon 拿到 `65.4%`，超过了价格更高的 Claude Opus 5.5（`58.1%`）。
- 在多学科难题测试 HLE-Diamond 上拿到 `71.3%`，领先 Opus 5.5（`67.9%`）和 GPT-6.2 Sol（`64.0%`）。

### 多模型混编

速度方面，`Gemini 4 Neon` 平均每秒输出 `110` 个 Token，Carbon 每秒只有 `57` 个，Neon 快了将近一倍。

谷歌这次在 Antigravity 里一起推出了 **Orchestrator（动态编排）** 机制。

![](https://cdn.paicoding.com/stutymore/gemini-4-neon-review-10-orchestrator-20261119135101-9e10d86f.png)

打开 Orchestrator 之后，系统会按任务难度自动分配模型。

架构设计、进度判断和疑难排错，交给 `Carbon` 来把关；批量改文件、跑单元测试、搜索代码仓库这类重复性工作，则拆分给多个子 Agent，由价格只有 Neon 一半的 `Gemini 4 Hydrogen` 去做。

谷歌在 Terminal-Bench 4.0 上公布了一组对比数据，这套混合搭配的方案，成功率接近全程用旗舰模型，完成整个任务的时间却缩短了 `19%`，Token 花费也省下了约 `24%`。

## 04、选型与定价

我把 Gemini 4 全家桶的 API 定价和分工整理成了一份速查清单，大家可以看一下，记不住没关系哈。

![](https://cdn.paicoding.com/stutymore/gemini-4-neon-review-11-api-pricing-20261119135101-f12bee82.png)

- `Gemini 4 Hydrogen`（氢）：输入每百万 Token `$1.50`、命中缓存时 `$0.075`、输出 `$7.50`。定位是处理日常任务的极速模型，也是 Orchestrator 里负责并行干活的子 Agent，写简单脚本、提取信息、批量跑测试，用它最划算。
- `Gemini 4 Neon`（氖）：输入每百万 Token `$3.00`、命中缓存时 `$0.15`、输出 `$15.00`。默认用 `high` 档，思考档位支持 `low / medium / high / xhigh` 四档调节。日常写代码、做交互原型、数据分析，都可以把它当作主力。单价比旗舰 Carbon 低 `25%`，输出速度又快了将近一倍，既省钱又省时间。
- `Gemini 4 Argon`（氩）：定位是速度和能力折中的均衡款，适合多文件编码和长文档阅读。不过 Neon 的速度和编程能力都更强，新项目优先选 Neon。
- `Gemini 4 Carbon`（碳）：输入每百万 Token `$4.00`、输出 `$20.00`，每秒输出约 `57` 个 Token。遇到需要长时间推演的科研问题，或者核心架构要拍板，就用 Carbon。

## ending

大模型卷了这么多代，顶级旗舰确实好用，比如说 Astra、Fable，但又慢又贵。

像 Neon 这样的，不贵但好用的，才是顶级的 AI 牛马。

![](https://cdn.paicoding.com/stutymore/gemini-4-neon-review-12-access-20261119135102-541f1c9f.png)

我们下期见。
