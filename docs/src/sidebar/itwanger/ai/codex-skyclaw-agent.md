---
title: Codex+天工Skyclaw 1.0=顶级国产Agent
shortTitle: Codex+SkyClaw国产Agent
description: 用 Codex 搭配天工 SkyClaw v1.0 打造国产顶级 Agent，实测 PaiSwitch 模型切换、PaiAgent 工作流适配，附 SkyClaw 跑分数据和接入教程。
keywords:
  - Codex
  - SkyClaw v1.0
  - 国产 Agent
  - 天工超级智能体
  - AI 编程工具
tag:
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-06-01
---

大家好，我是二哥呀。

用 Agent 开发的小伙伴应该有个共同的感受，模型选择是个大问题。

Codex 默认跑的是 GPT-5.5，能力没问题，费用相对也合理。但国内很多小伙伴还是用不上，所以我就在想。

想找一个模型，同时满足这三个条件：Agent 任务执行能力强、上下文窗口够大、价格实惠。

这里给大家提供一个不错的选项，昆仑万维新发布的 SkyClaw v1.0。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260528110725.png)

把它接进 Codex 之后，我先后完成了两个真实项目的开发——PaiSwitch 的模型切换功能和 PaiAgent 的工作流适配。

工具调用稳定、代码质量经得住考验。关键是，输入价格比 DeepSeek V4 Pro 还便宜。

## 01、为什么选择Codex+SkyClaw

先说清楚这个组合的逻辑，免得大家觉得我在强行凑 CP。

Codex 是 OpenAI 推出的 Agent 编程工具，它的执行架构做得非常扎实。恐怕是目前公认的，做得最好的 Agent 框架之一。

我们也可以通过一些手段，给他配备国产模型，比如说DeepSeek V4 Pro，或者今天的主角 SkyClaw v1.0。

SkyClaw v1.0 是昆仑万维专门为 Agent 工作流训练的模型，支持百万 token 上下文。训练环境基于 OpenClaw-style agent framework 构建，覆盖了文件读取、代码编辑、内容检索、测试执行、页面观察这些高频 Agent 操作。

加上高质量的合成数据微调和 Agentic 强化学习，SkyClaw 在“长链任务执行”这件事上确实有一套。用我自己的话说就是：交给它一个活，它能从头干到尾，中间不掉链子。

![SkyClaw Benchmark 对比](https://cdn.paicoding.com/stutymore/sucai-20260526132137.png)

跑分数据也能验证这一点：

| 评测项目           | SkyClaw v1.0 | 说明                        |
| ------------------ | ------------ | --------------------------- |
| PinchBench-V2      | 87.2         | 综合 Agent 能力评测         |
| Claw-Eval Pass^3   | 59.7         | 稳定性测试（连续 3 次通过） |
| Claw-Eval Avg      | 74.2         | 平均通过率                  |
| Skywork-Claw-Bench | 62.9         | Skywork 自研 Agent 评测     |

在多项 Agent 专项评测中，SkyClaw v1.0 超过了 Minimax 2.7、DeepSeek V4 Flash，以及 Qwen 3.6 系列的 35B A3B 和 27B 模型。

所以这个组合的逻辑是这样的。

Codex 提供顶级的 Agent 执行框架和沙箱环境，SkyClaw 提供专门为 Agent 任务训练的推理大脑。两个东西各自做最擅长的事，拼到一起就是一个国产顶级 Agent。

## 02、把SkyClaw接进CC

说干就干。

第一步，在 PaiSwitch 里增加 SkyClaw 的 API 配置。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527154736.png)

需要填三个参数：

- Base URL 填 `https://api.apifree.ai/agent`
- 模型名称填 `skyclaw-v1`，如果想用轻量版本就填 `skyclaw-v1-lite`
- API Key 就是在 ApiFree 平台申请的那个

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527154911.png)

ApiFree 的注册流程很简单，注册一个账号就能拿到 API Key。上线期间免费调用，不需要申请白名单，不需要排队等审批。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260526134153.png)

> https://www.apifree.ai/model/skywork-ai/skyclaw-v1?tab=api

想薅免费 token 的小伙伴赶紧，这种好事不知道能持续多久。

配置完成后启动 Claude Code。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527155034.png)

如果模型选项里能看到 `skyclaw-v1`，说明配置成功了。用 `/status` 命令可以确认当前的模型状态。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527155117.png)

到这一步，CC 的底层模型已经从 Opus 4.8 切换到 SkyClaw v1.0 了。

接下来就是真刀真枪地干活，看看 SkyClaw 到底能不能打。

## 03、Codex的兼容适配

Codex 本身只支持 OpenAI 的模型，要接入 SkyClaw 需要一个中间适配层。我做了一个叫 PaiSwitch 的工具来解决这个问题——它在后台做了一层协议转换，把 ApiFree 提供的 SkyClaw 接口转成 OpenAI 兼容格式，让 Codex 能够无缝调用。

第一个任务：给 PaiSwitch 增加 Codex 底层 LLM 切换功能。

这个需求意味着 SkyClaw 要做这么几件事：先把项目现有的代码读一遍，搞清楚 PaiSwitch 的架构和模块划分；然后参考 Claude Code 已有的 settings.json 模型切换机制，设计一个类似的方案；再把方案实现出来，写完代码还得跑通测试。

在 CC 里输入：

> 参考 Claude Code 的 settings.json 模型切换机制，给 PaiSwitch 增加 Codex 的底层 LLM 切换功能，支持通过配置文件切换 SkyClaw v1.0、DeepSeek V4 Pro 等模型。

SkyClaw 接到任务后没有急着动手写代码。它做的第一件事是读项目代码，从入口文件开始，逐步深入到各个模块，搞清楚现有的代码结构和各组件之间的调用关系。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527182005.png)

读完代码后，SkyClaw 自己梳理了一个任务清单，拆成了四个子任务：配置文件解析模块、模型路由层、API 适配器、命令行参数支持。每个子任务之间有清晰的依赖关系，按顺序做下来就能完成整个功能。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527182456.png)

然后就开始逐个模块地写代码了。

写代码的过程我全程观察了一下，有一个细节让我印象比较深。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527182117.png)

就是它对上下文的保持。从开始到结束，SkyClaw 一直记得自己在做什么、做到了哪一步、下一步该干什么。这在长链任务中非常关键。

最终交付了一个完整的模型切换功能。PaiSwitch 现在支持在 GPT-5.5、DeepSeek V4 Pro 和 SkyClaw v1.0 之间自由切换，通过配置文件或命令行参数都可以指定。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527154254.png)

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527182343.png)

总的来说，这个任务的完成质量超出了我的预期。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527183029.png)

## 04、SkyClaw 改造 PaiAgent

PaiSwitch 的功能开发完成后，我又给 SkyClaw 安排了第二个任务，把 SkyClaw 自己适配进 PaiAgent 的工作流系统。

PaiAgent 是我做的一个开源工作流编排项目，在 GitHub 上已经有 400 多个 star 了。它的核心功能是让用户通过可视化界面编排 AI 工作流，把多个 LLM 节点、工具节点串联起来完成复杂任务。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527185120.png)

> https://github.com/itwanger/PaiAgent

问题出在 PaiAgent 的 LLM 节点上。它原本适配了 OpenAI、DeepSeek、GLM 这些常见的模型提供商，每个提供商有各自的 API 格式、认证方式和参数规范。SkyClaw 通过 ApiFree 提供服务，API 格式跟现有的提供商不一样，直接配进去会报错。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527185208.png)

来，让 SkyClaw 自己解决这个问题。

先把 Codex 的底层模型切换到 SkyClaw。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527185638.png)

重启 Codex，确认模型切换成功。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527190139.png)

然后把报错信息作为提示词输入：

> 我给 PaiAgent 配置了 skyclaw 模型，但不适配 [18:49:34] ❌ 节点 [llm] 执行失败: 不支持的提供商类型: skyclaw-v1.0。这是 apifree 的官方 API。

SkyClaw 先去找 PaiAgent 的 LLM 提供商注册代码，把现有的适配层架构搞明白。每个提供商都实现了同一个接口，通过工厂模式按名称创建对应的适配器。然后 SkyClaw 照着这个模式，新写了一个 SkyClaw 适配器，处理了 API 格式转换、请求头认证、响应解析这些细节。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527193301.png)

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527193838.png)

改完之后重新跑工作流，通了。

PaiAgent 的 AI 播客工作流能够正常调用 SkyClaw 来生成播客脚本了，音频质量跟用 DeepSeek 跑出来的没有明显差别。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527193859.png)

等于是 SkyClaw 自己给自己铺了路，自己的命运自己掌握了，哈哈。

![](https://files.mdnice.com/user/3903/905123af-98d3-4bc1-b6ac-86c446d64e61.jpg)

## 05、SkyClaw的定价

Agent 模型好不好用是一回事，用不用得起是另一回事。

跑 Agent 任务跟普通的对话问答不一样。普通问答是一问一答，两次 API 调用就结束了。Agent 任务是一个长链条——模型要反复地读代码、分析问题、制定方案、写代码、跑测试、看结果、修代码，一个中等复杂度的任务跑下来，可能要调用模型几十次。每次调用都要消耗输入和输出 token。

所以 Agent 场景下，模型的单价是乘以调用次数的，token 成本不菲。

SkyClaw 的定价我仔细看了两遍。

![SkyClaw 定价对比](https://cdn.paicoding.com/stutymore/sucai-20260526132125.png)

输入价格只有 DeepSeek V4 Pro 的二十四分之一，大约是 MiniMax M2.7 的四分之一。

况且还有 SkyClaw-v1.0-lite 版本。同样的架构和训练方法，更小的参数量，推理速度更快，成本更低。对延迟敏感或者预算紧张的场景，Lite 版本是一个很实用的选择。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527182812.png)

上线期间通过 ApiFree 可以免费调用。想试的小伙伴赶紧去注册，这种免费额度不知道还能持续多久。

对于个人开发者来说，Agent 开发最大的门槛从来不是技术。框架有 Codex 和 Claude Code，工具链也很成熟。真正卡脖子的是模型成本。

好的模型调用贵，便宜的模型干不了 Agent 的活。SkyClaw 在这两个维度上同时做到了不错的水平，确实给个人开发者提供了一个很实际的选择。

## 06、天工超级智能体

聊了这么多 SkyClaw 在第三方 Agent 框架里的表现，也得说说它的“原生主场”——天工超级智能体。

天工是昆仑万维打造的一个多智能体协同平台。在对话框里给它一个任务目标，它会自动拆解任务、调度多个专家级智能体、端到端交付成品。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260526135635.png)

什么意思呢？举个我自己的真实案例。

最近在写 AI 编程工具的横评文章，需要一份 Claude Code、Codex、Qoder 的竞品分析。以往的做法是自己翻官网、查文档、整理数据、做对比表格、排 PPT，前前后后要忙大半天。

这次我甩给天工一句话就完事了。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260526143714.png)

天工调用了联网搜索、数据分析等多个 MCP 工具，大概跑了十五分钟。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527101446.png)

最终输出了两样东西。第一份是深度分析报告，一共九个章节，内嵌了七个用 Chart.js 做的交互式数据图表，覆盖产品概览、核心指标对比、功能差异、定价策略、生态适配、优劣势和选型建议。每个数据都标注了来源。

第二份是团队分享 PPT，十三页，从封面到综合评分，结构清晰，排版干净。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527101042.png)

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527101123.png)

这个 PPT 不是那种“能看但还得自己大改一遍”的半成品。字号统一、间距合理、配色也不辣眼睛，页面之间的逻辑衔接顺畅。直接拿去团队内部分享完全没问题，不丢面子。

天工内置了全模态编辑器，文档、PPT、表格、图片都能在线编辑和导出。不过我觉得大多数时候不太需要改，直接用就行了。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527101721.png)

### 云端虚拟机和定时任务

天工在云端给每个用户开了一台虚拟机，所有任务执行和文件读写都在云端完成。甚至可以关掉浏览器去做别的事情，回来它还在跑，文件也不会丢。

![](https://files.mdnice.com/user/3903/7a5e7171-5edd-4298-b64a-dd2bbc852c96.jpg)

支持多线程并行，多条复杂工作流可以同时跑：写文档、做 PPT、跑数据分析，不用排队等候。

天工还接入了飞书 IM，支持定时自动化。不需要打开浏览器，直接在飞书里下达任务。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527102923.png)

我配了一个实用的定时任务——每天早上八点，天工自动搜索过去二十四小时的 AI 行业动态，筛选五到八条有价值的热点（去掉营销稿和重复信息），推送到我的飞书。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527103451.png)

每天早上打开飞书，一份筛选好的 AI 行业日报已经安静地躺在那儿了。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527112250.png)

### 旗舰模型和技能广场

天工内置了多个顶级模型可以随意切换。除了自家的 SkyClaw 系列，还有 DeepSeek V4 Pro、GLM-5.1 等。不确定选哪个就用智能调度模式，让系统根据任务复杂度自动匹配。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527112950.png)

![](https://files.mdnice.com/user/3903/c414f467-e99e-47bc-95e9-f97d90c66c0e.png)

技能广场是天工另一个实用的地方。文档、PPT、图片生成、表格处理、网页搭建、视频制作（接入了 Seedance 2.0 和 Kling 3.0），各种专家级 Skill 都有。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527112150.png)

我测了一个场景，让天工做一份“新员工 AI 工具使用培训”PPT。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527112822.png)

它先梳理了培训大纲，逐页生成内容和排版，最后输出 .pptx 文件。做 PPT 的同时还能参考之前上传的文档、联网搜索数据、读取 Excel 提取指标。这种跨模态的协同在很多单点 AI 工具上是做不到的。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527113059.png)

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527113441.png)

天工还支持自定义 Skill，描述自己的工作场景和需求，天工帮忙创建专属技能。用的次数越多，天工对使用者的工作习惯和偏好就越了解，生成的结果也越贴合实际需要。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527195443.png)

去年我就体验过天工的海外版 Skywork，跟全球顶尖的 AI 产品正面交锋了一整年之后，国内版做了一次大的跨代升级。给我的体感是，它不是慢慢迭代出来的产品，是带着实战经验回来的。

## ending

Codex 加上 SkyClaw v1.0，确实跑出了一个让我比较满意的组合。

PaiSwitch 的模型切换功能，从读代码到拆任务到写代码到跑测试到修 bug。PaiAgent 的工作流适配，看了报错、找到代码、写了适配器、跑通工作流。

![](https://cdn.paicoding.com/stutymore/tiangong-skyclaw-v1-review-20260527191454.png)

SkyClaw 的 API 目前通过 ApiFree 平台免费开放。如果大家也在折腾 Agent 开发，或者只是想找一个性价比高的模型跑 Codex，都值得去试试。

【**一台电脑，一个好用的 Agent 模型，能干的事情比你想象的多**。】

我们下期见。
