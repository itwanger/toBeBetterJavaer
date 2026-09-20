---
title: 又一款国产大模型，性价比拉满。 
shortTitle: 又一款国产大模型，性价比拉满。 
description: Step 5 Preview vs DeepSeek V4 Pro 三场景同题实测，用 Kimi Code 做统一 Harness，看八分之一 Opus 5 价格的国产旗舰模型到底能打多少成
keywords: Step 5 Preview, DeepSeek V4 Pro, Kimi Code, AI 模型横评, 阶跃星辰
tag:
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-09-20
---

大家好，我是二哥呀。

国模在今年的发展有目共睹，大家可以先看下面这两个录屏，猜一猜，分别是用哪两个模型实现的。

【录屏1】

【录屏2】

如果我告诉你答案，一个是 DeepSeek V4 Pro，另外一个是阶跃星辰的 Step 5 Preview，是不是还挺意外的？

国模已经达到这个水平了吗？

是的，我可以给你肯定的答案。

Step 5 Preview 是阶跃星辰最新发布的旗舰基座模型，定位是“向前一步，智能效率的新一代帕累托前沿”，体感打平 GLM-5.3 和 Opus 5。稀疏 MoE 架构，总参数 600B，每个 Token 激活 27B 参数，支持 1M 上下文窗口和视觉输入。而且，模型将在 10 月 15 日正式开源。

![](https://cdn.paicoding.com/stutymore/step5-preview-vs-deepseek-20260920082011.png)

最让我惊叹的，是它的成本。

API 定价输入 $1.00/百万 tokens，输出 $2.70/百万 tokens。按 Artificial Analysis 的测算口径，完成同一个任务，Step 5 Preview 的成本是 GLM-5.3 和 Kimi K3 的 35%，Opus 5 的 12.5%。

芜湖。

![](https://cdn.paicoding.com/stutymore/step5-preview-vs-deepseek-20260920105850.png)

想要更强的智能，通常就得花更多的钱，Step 5 Preview 让同样的成本用上了更强的智能。

当然了，只看榜单，只看价格，只看跑分还不足以说明一个模型的优秀。

所以这次我做了一件事，用 Kimi Code 作为统一的 Harness，让 Step 5 Preview 和 DeepSeek V4 Pro 做同题实测。三个场景，复刻经典游戏魂斗罗（Coding场景）、做一个中秋互动页（前端场景）、完成一份经营分析报告（Work场景）。提示词完全一样，素材和验收标准也统一，同时开跑。

![](https://cdn.paicoding.com/stutymore/step5-preview-vs-deepseek-20260920082752.png)

为什么选 Kimi Code？

因为 Kimi Code 是第三方，两个模型都只是被调用的底层，Harness 侧不存在偏袒。

这次横评的测试素材和代码全部开源在 GitHub 仓库 agent-llm-case 里，每个场景都有独立的 TEST-REPORT.md 记录通过项、失败项和修复过程。

## 01、在 Kimi Code 中添加模型

为了公平测试 DeepSeek V4 Pro 和 Step 5 Preview，这次选择第三方的 Kimi Code 作为模型的 Harness 载体。

配置方法很简单，在 Kimi Code 中点设置，找到“供应商”。

![](https://cdn.paicoding.com/stutymore/sucai-20260918223328.png)

Step 5 Preview 的供应商选择 StepFun，填写 API Key，保存即可。DeepSeek V4 Pro 同理，供应商选择 DeepSeek。

配置完成后，回到提示词输入页，选择刚刚配置的新模型，输入“这是一条连接测试，请只回复 OK，不要调用任何工具”，收到 OK 就证明连通了。

![](https://cdn.paicoding.com/stutymore/sucai-20260918223941.png)

两个模型都用 High 思考模式。每个场景新建独立会话，工作区统一为 agent-llm-case 仓库根目录。Coding、前端、Work 按顺序执行。提示词除了项目目录不同，其余一字不差。

## 02、Coding 场景

任务是实现魂斗罗第一关的核心玩法。统一提供了 4 套角色图集、1 张背景图、8 个音效 WAV，要求实现 WASD 移动、八个方向射击、蹲伏、跳跃、S 散弹、步兵和炮台等敌人、补给无人机、检查点复活、Boss 战、Game Over 和重开。

![](https://cdn.paicoding.com/stutymore/sucai-20260919211048.png)

两个模型都做出了可玩的魂斗罗，基本操作都没有问题。差别在后半段内容的完成度。

![](https://cdn.paicoding.com/stutymore/sucai-20260919211142.png)

为了方便测试，我用 Playwright 驱动了一个机器人玩家，以正常模式操作真实游戏，通过只读状态钩子 `window.__game.getState()` 读取坐标、生命、武器、得分、Boss 血量等数据来做判定。所有截图和结构化结果都保存在各自的 shots/ 目录里。

### Step 5 Preview

提示词参考：

```
画面采用统一的复古像素风，横向 16:9。角色有清晰的人形、持枪姿势和跑步、跳跃、蹲伏、受击动画，敌兵、炮台与环境容易辨认，不用纯色矩形长期占位。关卡从丛林和瀑布进入吊桥与上下平台，最后抵达基地大门 Boss；有前后景层次，镜头随玩家向右推进，在关底锁定。主角、敌兵、炮台、Boss、地形、子弹和道具必须使用提供的图集及 JSON，声音使用提供的 WAV；允许镜像、缩放、受击闪烁、HUD 和简单粒子。不要重新绘制这些美术或调用外部图片生成器，不嵌入现成游戏或模拟器。实际图集不是规则等分网格，必须读配套 JSON。
```

从交付的实际情况来看，Step 5 Preview 的 Coding 能力已经相对不错。

![](https://cdn.paicoding.com/stutymore/step5-preview-vs-deepseek-20260920083707.png)

它对游戏需求的理解，已经深入到角色状态、坐标关系和系统之间的配合，而不只停留在页面外观。

有一项数据也能说明，自研的 StepCodeBench 覆盖了 553 个仓库、33 种编程语言，Step 5 Preview 得分 49.0%。官方还提到，在内部和外部专家参与的评测中，约 70% 的评测者认为 Step 5 Preview 可以自主完成中高复杂度的 Coding 任务。

![](https://cdn.paicoding.com/stutymore/step5-preview-vs-deepseek-20260920083517.png)

这和我们实测的感受基本一致。

### DeepSeek V4 Pro

提示词完全一样。

![](https://cdn.paicoding.com/stutymore/step5-preview-vs-deepseek-20260920084911.png)

DeepSeek V4 Pro 给我的观感，更偏向直接、清楚的街机原型。

对比总结一下。

同样一套素材，Step 5 Preview 的场景层次和角色实现细节更优；DeepSeek V4 Pro 则把战斗信息呈现得和我童年的记忆更加贴合。

不过，写出正确的代码是基本功，能在几个小时甚至一天的时间跨度里持续推进一个目标，根据反馈不断调整策略，这才是 Agent 时代真正需要的能力。

## 03、Work 场景

任务是分析一份 12 页的季度经营简报，判断是否应该将广告预算在 Q2 基础上增加 20%。交付物要求五件套，分析报告 report.md（1500-2200 字）、可编辑 Excel（预算增幅输入格联动）、8 页 PPT、PDF 和数据来源表 sources.csv。

提示词参考：

```
你是青禾课堂经营分析负责人。只根据 input/quarterly-brief.pdf 这份 12 页资料，为“下一季度是否增加广告预算”制作可继续使用的管理层汇报。材料全部为虚构测试数据，不联网补充经营信息。input/quarterly-brief-text.txt 是同一 PDF 的逐页提取，可用于读取；引用以 PDF 页码为准。

核对整份资料的数据版本、单位、脚注和指标定义，再判断封面“增长 25%”适用于什么口径，是否足以支持增加预算。结合月度、渠道、课程、退款主原因、用户反馈与 A/B 实验进行判断。区分事实、计算、观点、业务推断与缺失证据；不要把不同维度的拆分表相加，不要把实验子集重复计入季度总量，也不要凭空补齐课程与渠道交叉数据。
```

![](https://cdn.paicoding.com/stutymore/step5-preview-vs-deepseek-20260920085303.png)

![](https://cdn.paicoding.com/stutymore/step5-preview-vs-deepseek-20260920085356.png)

两个模型都交付了完整的五件套，Excel 有公式联动，PPT 里的图表都是原生 OOXML 图表，可以直接在 PowerPoint 里编辑数据。

### Step 5 Preview

PPT 产物：

![](https://cdn.paicoding.com/stutymore/step5-preview-vs-deepseek-20260920090052.png)

Excel 产物：

![](https://cdn.paicoding.com/stutymore/step5-preview-vs-deepseek-20260920090901.png)

Step 5 Preview 的分析展开得更细，能够把渠道效率、预算情景和执行安排组织成一套可继续使用的工作材料。

顺便补一个数据。Step 5 Preview 在金融领域的表现突出。第三方评测 FrontierFinance（覆盖 6 类投资场景、220 道专家设计题目）上拿了 66.4%，国模第一，超过 GLM-5.3 的 64.1% 和 Kimi K3 的 62.6%，甚至超过了 GPT-6 Astra 的 55.0%。

![](https://cdn.paicoding.com/stutymore/step5-preview-vs-deepseek-20260920090614.png)

### DeepSeek V4 Pro

PPT产物：

![](https://cdn.paicoding.com/stutymore/step5-preview-vs-deepseek-20260920085912.png)

Excel 产物：

![](https://cdn.paicoding.com/stutymore/step5-preview-vs-deepseek-20260920090950.png)

DeepSeek V4 Pro 则善于提炼主要矛盾，用简洁的图表和清楚的结论降低汇报的理解成本。

## 04、前端场景

任务是做一个“月下游园”中秋互动页面。

设计简报给了配色方案、6 个活动地点、3 个集章活动，分别是灯谜竞猜（答对两道得 1 章）、月饼制作（选模具和馅料做一块得 1 章）、河灯许愿（写祝福放灯得 1 章）。

提示词参考：

```
打开页面要像走进一幅会动的中秋夜游长卷：明月、深靛蓝夜空、桂花、暖金灯笼、临水亭台、玉兔与水面倒影。标题“月下游园”，副标题“灯火映团圆，今夜共此时”。画面占主导，中文有节日海报的排版感；用 CSS/SVG/Canvas 自行绘制有层次的场景与可辨认的道具，不要只放几个 emoji 或通用卡片。月光、灯影和河灯有克制动效，提供减少动态效果的方式。

围绕望月台、灯谜巷、月饼铺、河灯渡口、桂花茶肆、皮影小戏台六个地点组织页面，可采用横向长卷或分层游园地图。地点可打开详情，并有列表作为手机与键盘入口；支持“全部 / 赏景 / 手作 / 灯谜”分类和关键词组合筛选，无匹配时可清除恢复。
```

![Step 5 Preview](https://cdn.paicoding.com/stutymore/step5-preview-vs-deepseek-20260920091108.png)

![DeepSeek V4 Pro](https://cdn.paicoding.com/stutymore/step5-preview-vs-deepseek-20260920091239.png)

这是三个场景里两个模型表现最接近的一场。

这个任务比 Coding 场景更考验模型的综合能力。除了写代码，还要理解设计简报里的交互逻辑（答对两道灯谜才给一章、月饼可以换搭配重做、河灯祝福有字数限制）。

不过，我们的要求更高一点。

我让Step 5 Preview先生成了一些美术素材，再配合编码，出来的效果是不是就高级多了？

![](https://cdn.paicoding.com/stutymore/step5-preview-vs-deepseek-20260920103337.png)

我觉得还是不错的。

![](https://cdn.paicoding.com/stutymore/step5-preview-vs-deepseek-20260920103513.png)

有一说一，Step 5 Preview 相比上一代，前端能力确实提升幅度很大。

## ending

帕累托前沿描述的是多个目标之间所能达到的最佳平衡。对于 AI 模型来说，推进帕累托前沿，靠的是新的模型设计，Step 5 Preview，做到了这一点！

![](https://cdn.paicoding.com/stutymore/step5-preview-vs-deepseek-9d1341abf060ee9ca84a7212bfdcd9c3.jpg)

从 Step 3.5 Flash、Step 3.7 Flash 到 Step 5 Preview，阶跃星辰一直在实现这样一个目标：如何更高效地把计算转化成模型能力。不只是堆更多算力，而是让每一份算力产出更多的智能。

![](https://cdn.paicoding.com/stutymore/step5-preview-vs-deepseek-4b6fa9f7b8f5e1604eb4de57a6c417c9.png)

最新的 AA 榜单就可以证明这一点，排名非常靠前，处在 GLM-5.3 和 Kimi K3 之间。

对了，10 月 15 日，模型的权重也会正式开源，届时有需要的小伙伴也可以在自己的环境里跑一轮，看看实际效果。

开放平台 API 接入：`https://platform.stepfun.com/`

Model Blog：`https://www.stepfun.com/step-5-preview`

冲。
