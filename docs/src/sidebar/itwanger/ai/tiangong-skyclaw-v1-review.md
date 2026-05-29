---
title: 我花了一天注册了20+个AI平台，把免费Token全薅了一遍，真香的就天工SkyClaw v1.0
shortTitle: 天工+SkyClaw v1.0实测
description: 天工超级智能体实测，SkyClaw-v1.0 百万上下文 Agent 模型跑分对比，在 Claude Code 中接入 SkyClaw 实操，多智能体协同完成文档/PPT/表格/网页全流程工作。
keywords:
  - 天工超级智能体
  - SkyClaw v1.0
  - Agent 模型
  - 昆仑万维
  - AI 自动化办公
  - 百万上下文
tag:
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-05-26
---

大家好，我是二哥呀。

虽然我一直强调，token 就是生产力，这年头要至少备一个 Coding Plan 套餐，否则你的生产力会严重拖后。

但 Coding Plan 现在不好买，lite 版本基本上都抢不到。

所以我就花了一天时间，把市面上能薅的免费 token 全薅一遍，看看哪个平台的免费 token 最香。

目前得出的结论是：天工新上的 SkyClaw v1.0 真不错，上线期间可以免费调用，并且专门针对真实工作流做了深度优化。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260526134153.png)

通过 ApiFree 注册账号即可免费调用，不需要白名单。

> https://www.apifree.ai/model/skywork-ai/skyclaw-v1?tab=api

想体验无限 token 的小伙伴请趁早，趁早，趁早！

我已经接入到 Claude Code 肝了一个可以切 Codex 底层模型的 PaiSwitch，哈哈。


![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260528110725.png)


让 Codex 也能像 Claude Code 那样，底层切换 SkyClaw v1.0/DeepSeek V4 Pro 等模型来跑 Agent 任务了。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527154254.png)

PaiAgent 工作流编排系统里也接入了 SkyClaw v1.0。

![](https://files.mdnice.com/user/3903/905123af-98d3-4bc1-b6ac-86c446d64e61.jpg)


接下来，我会给大家详细分享 SkyClaw v1.0 的实测体验，以及他们的旗舰产品**天工超级智能体**的使用感受（为方便叙事，后简称天工 😄）。

> 系好安全带，我们粗粗粗发啦～

## 01、7x24 小时的云端 AI 团队

准确地说，天工是一个「7x24 小时随时待命的云端 AI 团队」。

在对话框里下达一个目标，天工就会自动拆解任务、调度多个专家级智能体、端到端输出成品。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260526135635.png)

举个真实场景。

最近正好在写 AI 编程工具的横评文章，需要一份 Claude Code、Codex、Qoder 的竞品分析。

以前这种活我得自己翻官网、查文档、整理数据、做对比表格、再排 PPT，少说大半天。

这次我直接甩给天工一句话：

> 帮我对比分析 Claude Code、Codex、Qoder 这三款 AI 编程工具的功能、定价和适用场景，输出一份带数据图表的深度分析文档，再做一份可以分享的 PPT。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260526143714.png)

他就开始吭哧吭哧干活了。

我就打开手机开始刷小姐姐了，哦不，一一回复读者的留言了。

这个过程中，天工会调用多种 MCP 工具，比如说联网搜索，来获取结果。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260526143838.png)

右侧可以实时查看工具干活的进度和结果。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260526143952.png)

这次一共跑了 15 分钟左右。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527101446.png)

OK，天工已经完成了联网调研、数据整理、对比分析，输出了一份结构完整的分析报告——功能对比、定价策略、适用人群、优劣势总结，全都有。

包括：

- 深度分析报告（HTML 格式）— 9 个章节、7 个交互式数据图表（Chart.js）、完整数据来源引用，覆盖产品概览、核心指标、Benchmark、功能、定价、生态、优缺点、时间线和选型建议。
- 团队分享 PPT — 13 页，结构清晰：封面 → 产品概览 → 核心指标 → Benchmark → 功能对比 → 定价 → 生态 → 三款工具各自的优缺点 → 时间线 → 场景化选型建议 → 综合评分总结。

这个 PPT，质量真的太高了。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527101042.png)

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527101123.png)

完全超出了我的预期。

天工在网页端自带了多模态编辑器，可以让你直接在网页上进行编辑，但我觉得不用，直接拿去用就行了。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527101721.png)

## 02、云端虚拟机+专家技能+顶级模型

天工在云端开了一台虚拟机，所有的任务执行、文件读写、代码运行都在云端完成。

我们只管派发任务就行。


![](https://files.mdnice.com/user/3903/7a5e7171-5edd-4298-b64a-dd2bbc852c96.jpg)


让天工分析一份 200 页的 PDF，中间关掉浏览器去吃个饭，回来它还能在跑，文件也不会丢。相当于有一个 24 小时在线的远程助理，你睡觉的时候他还在帮忙干活。

纯血牛马，哈哈～

天工还支持**多线程并行**，可以同时跑多条复杂工作流：写文档、做 PPT、跑数据分析，三件事并行推进，不用排队。

天工同时还支持**定时自动化 + 飞书 IM**，不用打开浏览器，直接在飞书里下达任务。

左下角，点连接 IM 渠道，选择飞书，填写 appid+appsecret 就连接好了。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527102923.png)

飞书机器人的申请方法，可以参考这篇文档（以前配过龙虾的小伙伴应该很轻车熟路）：

> https://www.tiangong.cn/help/tutorial/%E8%BF%9E%E6%8E%A5im

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527103407.png)

连通后可以在飞书里随便发送一个消息，能收到响应就表明配置成功了。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527111610.png)

我设了一个定时任务，把下面这段 prompt 发给天工：

> 你是我的 AI 行业资讯助手。每天早上 8 点搜索最近 24 小时 AI 行业的重要动态，筛选 5-8 条最有价值的热点（去除营销稿和重复信息），按分类汇总后推送给我。

设置完成后，天工会在定时任务里创建一条每日执行的任务。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527103451.png)

以后，每天早上打开飞书，一份 AI 行业日报已经安安静静躺在那了。

为了演示效果，我这里让定时任务立即执行一下。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527103537.png)

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527111943.png)

飞书侧收到消息了。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527112250.png)

消息有 GPT-5.6 曝光：150 万上下文窗口，6 月有望发布、OpenRouter 完成 1.13 亿美元 B 轮融资，估值翻倍至 13 亿美元、清华 HRM-Text 模型：极低算力逼近大规模模型性能等等，都是 AI 行业的大事件。

真正的“你睡觉，他干活”。

### 专家技能

天工的技能广场是我觉得非常实用的地方。

你可以让它写文档、做 PPT、画图、填表格、搭网页、甚至剪视频。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527112150.png)

我实测了一个场景：让天工帮我生成一份“新员工 AI 工具高效使用培训”的 PPT。

直接一句话，天工就开始干活了。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527112822.png)

它先梳理了培训大纲，然后逐页生成内容，配上合适的排版和配图，最后输出 .pptx 文件，可以直接打开编辑。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527113059.png)

天工在做 PPT 的时候，可以同时参考之前上传的文档、调用网页搜索补充数据、甚至读取 Excel 表格提取关键指标。

这种跨模态的协同是很多单点 AI 工具做不到的。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527113441.png)

除了文档和 PPT，天工还配置了：

- 图片生成（无限画布编辑器，AI 抠图、图层分离都有）
- 表格处理（比肩 Excel 的编辑能力）
- 网页生成（不写一行代码就能搭落地页）
- 视频制作（接入了 Seedance 2.0、Kling 3.0 等旗舰模型，还配了专业时间线编辑器）

更厉害的是**自定义 Skill**。

你可以向天工描述自己的工作场景和需求，它会帮你创建专属 Skill，无需编程。而且天工在使用过程中会随着你的反馈自主优化 Skill 的执行策略，**越用越懂你**。

### 顶级模型

天工内置了旗舰模型全家桶：主调度模型中，除了他们自家的 SkyClaw 模型外，还为你配置了可以随意切换的 DeepSeek V4 Pro、GLM-5.1 等顶级选手等。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527112950.png)

大家可以根据任务复杂度选择不同的模型，不确定选哪个的话，“智能调度”模式会自动匹配。

![](https://files.mdnice.com/user/3903/c414f467-e99e-47bc-95e9-f97d90c66c0e.png)


## 03、天工到底好在哪？

简单总结一下天工打动我的三个点。

**第一，交付即成品。**

很多 AI 工具的产出是“半成品”还得自己一页页改。

天工内置了全模态编辑器，文档、PPT、表格、图片、网页、视频，每种输出都能直接在线编辑和导出。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527195443.png)

**第二，全球验证过的架构。**

去年我就体验过海外版的 Skywork，战斗力很强，和全球顶尖的 AI 产品正面刚了一整年后，国内版直接跳过了中间的迭代版本，做了一次跨代升级。

这次给我的体感是：别人还在慢慢打怪升级，天工直接开着满级大号回了新手村。

## 04、SkyClaw v1.0

说到 SkyClaw v1.0，他是昆仑万维刚发布的自研 Agent 模型，支持**百万 token 上下文**，专门针对真实 Agent 工作流做了深度优化。

在多项 Agent 评测中表现亮眼：

| 评测项目           | SkyClaw v1.0 | 说明                        |
| ------------------ | ------------ | --------------------------- |
| PinchBench-V2      | 87.2         | 综合 Agent 能力评测         |
| Claw-Eval Pass^3   | 59.7         | 稳定性测试（连续 3 次通过） |
| Claw-Eval Avg      | 74.2         | 平均通过率                  |
| Skywork-Claw-Bench | 62.9         | Skywork 自研 Agent 评测     |

性能超过 Minimax 2.7、DeepSeek V4 Flash，以及 Qwen 3.6 35B A3B 和 27B 模型。

![SkyClaw Benchmark 对比](https://cdn.paicoding.com/stutymore/sucai-20260526132137.png)

SkyClaw 的训练环境是基于 OpenClaw-style agent framework 构建的，覆盖文件读取、代码编辑、检索、测试、页面观察等高频 Agent 动作。

LLM 不只是拿来生成答案，还需要选择工具、组合工具，并根据工具返回结果继续推进任务。还得加上高质量的合成数据微调（SFT）和 Agentic 强化学习。

经过我的实战测试，可以得出：SkyClaw 在 Claude Code、Codex 等 Agent 框架中使用时，在**持续执行、错误恢复和多轮迭代**时表现出色。

### 实战1：用 SkyClaw 给 PaiSwitch 加 Codex 模型切换

光看跑分不够，得看实际干活的效果，SkyClaw 真正有意思的地方在于，它本身是一个开源的 Agent 模型，不是只能锁在天工里用的“内置发动机”。如果你和我一样平时自己也在折腾 Agent，那它另一种打开方式你大概率会更感兴趣——直接调 API，把它接进你自己的 Agent 框架里。

还记得开头提到的 PaiSwitch 吗？

就是用 SkyClaw 作为 Claude Code 的底层模型，给 PaiSwitch 加了一个 Codex 底层 LLM 切换功能。

第一步，启动 PaiSwitch，增加 SkyClaw 的 API 配置。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527154736.png)

- Base URL 填写 `https://api.apifree.ai/agent`
- 模型名称填 `skyclaw-v1`（如果想用 Lite 版本就填 `skyclaw-v1-lite`）
- API Key 就是你在 ApiFree 上申请的那个 Key。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527154911.png)

然后启动 Claude Code。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527155034.png)

如果出现 `skyclaw-v1` 的模型选项，说明配置成功了。也可以键入 `/status` 来查看当前模型状态。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527155117.png)

我在 Claude Code 里给 SkyClaw 下了一个指令：

> 参考 Claude Code 的 settings.json 模型切换机制，给 PaiSwitch 增加 Codex 的底层 LLM 切换功能，支持通过配置文件切换 SkyClaw v1.0、DeepSeek V4 Pro 等模型。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527182005.png)

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527182456.png)

SkyClaw 先读了项目现有代码，理清了 Claude Code 的模型切换逻辑，然后自己拆出了任务清单：

配置文件解析 → 模型路由层 → API 适配器 → 命令行参数支持。

注意，APIFree 本身并没有提供 Anthropic 的兼容 API，我在 PaiSwitch 的后台做了一层适配，把 APIFree 的接口转换成 Anthropic 兼容的格式，这样 SkyClaw 就能无缝调用了。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527182117.png)

写代码的过程中，SkyClaw 调用了很多次工具：读文件、写代码、跑测试、看报错、改代码、再跑测试。

全程没有人工干预，这就是 Agent 模型的强大之处。

最后的交付结果是，SkyClaw 自己让自己在 Codex 里面适配了，可以给 Codex 切换 OpenAI 默认的 GPT-5.5 模型，也可以是 DeepSeek V4 和 SkyClaw v1.0。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527182343.png)

中间还有很多细节，我就不一一展示了，最后的代码质量我瞅了一眼，质量刚刚的。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527183029.png)

### SkyClaw-v1.0-lite

除了旗舰版，SkyClaw 还有一个 Lite 版本，**SkyClaw-v1.0-lite**。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527182812.png)

同样的架构，更小的参数量，推理速度更快，成本更低。适合对延迟敏感或者预算有限的场景。

说到成本，SkyClaw 非常有竞争力。

输入价格只有 DeepSeek V4 Pro 的 1/24，MiniMax M2.7 的约 1/4。但在 Agent 评测上的表现并没有因为价格低就缩水。

![SkyClaw 定价对比](https://cdn.paicoding.com/stutymore/sucai-20260526132125.png)

### 实战2：给 PaiAgent AI 播客加上 SkyClaw

PaiAgent 是我做的一个开源的工作流编排项目，GitHub 上已经有 400 多个 star 了。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527185120.png)

> https://github.com/itwanger/PaiAgent

在没有适配 SkyClaw 之前，PaiAgent 的工作流会报这个错误。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527185208.png)

那接下来，我们就用 SkyClaw 1.0 + Codex 来改造一下 PaiAgent，让它能兼容 SkyClaw 了。

我们先切到 SkyClaw 模型。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527185638.png)

重启 Codex。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527190139.png)

输入提示词：

> 我给 PaiAgent 配置了 skyclaw 模型，但不适配 [18:49:34] ❌ 节点 [llm] 执行失败: 不支持的提供商类型: skyclaw-v1.0
> [18:49:34] ❌ 工作流执行失败,总耗时 0 秒 这是 apifree 的官方 API

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527193301.png)

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527193838.png)

OK，问题搞定。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527193859.png)

你看，我们给 Claude Code 增加 SkyClaw 的适配，到搞定 Codex 的底层模型切换，再到通过 Codex+SkyClaw 改造 PaiAgent，整个过程都是在验证 SkyClaw 的能力。

显然，SkyClaw 不仅成功完成了任务，还在过程中展示了它的工具调用能力、错误恢复能力和持续执行能力。

不错不错。

## ending

说真的，用完天工之后我反复在想一件事。

以前我们说“一个人活成一支专业队伍”，听起来很不可思议。

但现在这件事正在真实地发生。

一句话甩给天工，它帮我跑完竞品分析 + 文档 + PPT 全流程。飞书里设个定时任务，每天醒来 AI 行业日报已经躺好了。在 Claude Code 里接入 SkyClaw 的 API，用它当 Agent 大脑肝了个 PaiSwitch。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527191454.png)

SkyClaw v1.0，百万 token 上下文 + 极致性价比，意味着不管是个人开发者还是企业团队，都能跑得起高质量的 Agent 任务。

一个普通人，一台电脑，一个天工账号，就能干过去需要一个小团队才能完成的活。

天工的 SkyClaw 模型的 API 也开放了免费试用，注册 ApiFree 就能用，想薅无限 token 的小伙伴们别错过。

我们下期见。
