---
title: 狂揽33k+Star，这个把敏捷开发团队搬进AI的框架有点东西
shortTitle: BMad-METHOD深度测评
description: BMad-METHOD在GitHub上斩获33k+Star，它不是简单的AI插件，而是一整套能让AI按照敏捷开发标准协作的框架，一口气配备21个专业Agent，从产品经理到架构师到开发者，帮你从Vibe Coding升级到结构化工程化开发。
tag:
  - AI Coding
  - BMad
  - 敏捷开发
category:
  - AI
author: 沉默王二
date: 2026-02-02
---

大家好，我是二哥呀。

这两天刷GitHub，被一个项目给惊叹到了。

BMad-METHOD，上架不到一年，狂揽33,709个Star。

![](https://cdn.paicoding.com/stutymore/bmad-method-33k-stars-review-20260202210825.png)

讲真，这个数字在AI工具领域已经非常夸张了。

咱们对比一下，大名鼎鼎的Java进阶之路也就16k的Star（笑，二哥的）。BMad是2025年4月才发布，不到一年就干到了这个体量，增长速度属实惊人。

核心原因是，BMad定位非常清晰——它不是让你用AI"猜代码"，而是把一整个敏捷开发团队搬进你的AI工具里。

一口气给你配齐21个专业Agent，从产品经理John、架构师Winston、Scrum Master Bob，到开发者Amelia、UX设计师Sally、QA工程师Quinn。

换句话说，以前你用Cursor或者Claude Code，基本就是单兵作战，想一出是一出。

BMad直接把这个"游击队"升级成了正规军。

## 01、安装BMad，三分钟搞定

安装BMad非常简单，官方提供了NPM包，一行命令就能搞定。

```bash
npx bmad-method install
```

执行完之后，BMad会在你的项目根目录下创建一个`.bmad`文件夹，里面包含了所有的工作流配置和Agent定义。

![](https://cdn.paicoding.com/stutymore/bmad-method-33k-stars-review-20260202211137.png)

然后在Claude Code、Cursor、Windsurf这些AI IDE里打开项目，直接输入：

```bash
/bmad-help
```

就能看到BMad的智能助手界面。

![](https://cdn.paicoding.com/stutymore/bmad-method-33k-stars-review-20260202211500.png)

举个例子，你可以这样问：

"我有一个T恤生意，想做一个能撑住百万用户的Web应用，该怎么规划？"

BMad不会直接甩给你一堆代码，而是先派业务分析师Mary上场，帮你梳理需求、定义用户画像、明确MVP范围。

这就是BMad和其他AI工具最大的不同——它不是"替你思考"，而是"引导你思考"。

## 02、快速路径，小功能三步走

BMad针对不同规模的任务，提供了两套路径。

如果是修bug、加小功能这种"快准狠"的场景，用Quick Flow就行，三个命令搞定：

```bash
/quick-spec     # 分析代码库，生成技术规格和用户故事
/dev-story      # 实现每个故事
/code-review    # 验证质量
```

我拿手头的一个工作流项目试了一下。

这个项目里有个大模型节点，只能用DeepSeek和通义千问，我想加一个MiniMax的选项。

直接输入`/quick-spec`，BMad会先扫描代码库，搞清楚现有的大模型节点是怎么实现的。

![](https://cdn.paicoding.com/stutymore/bmad-method-33k-stars-review-20260202211607.png)

这个过程BMad非常严谨，它不光看你的Java代码，还会去看数据库表结构、前端配置，确保理解的是"全貌"而不是"局部"。

生成规格的时候，它会给你列清楚：

- 需要新增哪些配置项
- 前后端分别要改哪些文件
- 是否需要迁移数据库
- 节点之间的依赖关系

![](https://cdn.paicoding.com/stutymore/bmad-method-33k-stars-review-20260202211822.png)

然后你输入`/dev-story`，BMad就开始干活了。

它会先给你一个执行计划，比如这次要新增4个文件、修改3个文件。

![](https://cdn.paicoding.com/stutymore/bmad-method-33k-stars-review-20260202211911.png)

![](https://cdn.paicoding.com/stutymore/bmad-method-33k-stars-review-20260202212630.png)

确认后，它就开始写代码了。

我观察了一下BMad的代码风格，非常规范，基本遵守了阿里巴巴Java开发规约。变量命名、注释、异常处理，这些细节都很到位。

写完之后，BMad不会就这么结束，它会自动跑一遍代码检查。

这次改完，它主动提醒我："配置文件里的api.endpoint字段，新增GLM节点时要注意兼容性，因为Spring AI 1.0.0-M5对OpenAI兼容接口的路径处理和之前不一样。"

说实话，这个细节挺加分的。

我自己可能就忙着看功能能不能跑起来了，但BMad会从"工程化"的角度帮你把关。

最后用`/code-review`验证一下，BMad会给出完整的修改清单和测试建议。

![](https://cdn.paicoding.com/stutymore/bmad-method-33k-stars-review-20260202213118.png)

从开始到结束，十分钟不到。

以前这种小功能，我可能得改来改去折腾半个多小时，现在BMad带着我走一遍流程，质量和效率都上来了。

## 03、完整路径，从零到企业级

Quick Flow适合小打小闹，但如果你是从零开始做一个产品，或者要重构一个大模块，那BMad的完整路径就能体现出它的价值了。

完整路径分两个阶段：

**规划阶段：**

```bash
/product-brief              # 定义问题、用户和MVP范围
/create-prd                  # 完整需求文档（人物画像、指标、风险）
/create-architecture         # 技术决策和系统设计
/create-epics-and-stories    # 将工作分解为优先级故事
/sprint-planning             # 初始化Sprint跟踪
```

**实施阶段：**

```bash
/create-story → /dev-story → /code-review    # 循环每个故事
```

我拿"做一个AI播客生成平台"试了一下。

先执行`/product-brief`，产品经理John会出来帮你梳理：

- 目标用户是谁？（内容创作者、播客主播、知识博主）
- 核心痛点是什么？（文字转音频太贵、配音不自然、流程太繁琐）
- MVP要做什么？（文本输入→AI生成播客稿→TTS合成→输出音频）
- 成功指标怎么定？（用户转化率、生成时长、成本控制）

这个过程就像真的在和一个产品经理聊，他会问："你的播客是偏知识科普还是娱乐闲聊？这会影响后续的TTS音色选择。"

你看，BMad不是在机械地执行任务，而是在引导你把事情想清楚。

接下来`/create-prd`，会生成一份非常完整的需求文档。

然后架构师Winston登场，`/create-architecture`会给出系统设计方案。

这次让我比较意外的是，Winston不光画架构图，还会考虑技术选型的权衡。

比如在设计TTS模块时，它会问你：

"你是要成本优先（用阿里云TTS），还是要质量优先（用讯飞超拟人），还是两者都支持让用户选？"

这种"多方案对比+推荐"的思路，非常符合真实的工作场景。

之后`/create-epics-and-stories`会把整个需求拆分成可执行的Story。

最后`/sprint-planning`，生成Sprint计划。

到了实施阶段，就回到`/create-story → /dev-story → /code-review`的循环了。

整个流程走下来，你会有一种"被专业团队带着飞"的感觉，而不是一个人在那里瞎琢磨。

## 04、和Cursor、Claude Code怎么选？

很多人会问，BMad和Cursor、Claude Code是什么关系？

直接说结论：**BMad是"框架层"，Cursor和Claude Code是"工具层"。**

你可以这样理解：

- **Cursor**：给你一个会写代码的编辑器，适合快速原型、单兵作战
- **Claude Code**：给你一个自主的编码助手，适合复杂文件操作、长任务规划
- **BMad**：给你一套结构化开发流程，21个Agent带着你走完敏捷开发全流程

更重要的是，**BMad可以在Cursor或者Claude Code之上使用**。

你用Claude Code写代码，用BMad管理流程，两者是互补关系。

从社区反馈来看，Claude Code的代码重做率比Cursor低30%，文件操作更快。

BMad v6版本的改进后，Token消耗节省了90%，减少了"瞎猜"带来的无效生成。

我自己的体验是：

- 如果你只是想快速写个脚本、改个小功能，Cursor足够了
- 如果你要做一个完整的模块，涉及前后端联调，Claude Code更省心
- 如果你要从零做一个产品，或者重构一个大项目，BMad能帮你少走很多弯路

三者不是互斥，而是叠加。

## 05、实测感受：从游击队到正规军

我拿BMad试了一周，最大的感受是——它治好了我的"Vibe Coding"。

以前用AI写代码，很容易陷入"说一句干一句"的游击状态。

想到哪写到哪，没有规划，没有文档，最后代码能跑，但维护起来是灾难。

BMad强制你走一遍"分析→规划→实施→复盘"的完整流程。

一开始会觉得"好麻烦"，但走完一次之后，你会发现这种"麻烦"是值得的。

因为你写的不是"能跑的代码"，而是"可维护的系统"。

另一个感触是，BMad的21个Agent不是"摆设"。

每个Agent都有自己的专业视角，产品经理考虑业务价值，架构师考虑扩展性，开发者考虑实现成本，UX考虑用户体验。

这种多视角的碰撞，能让你避免很多"拍脑袋"的决策。

## 08、适用人群与成本

BMad是100%免费开源的，MIT许可，永久免费，没有付费墙。

但它的学习曲线不低。

如果你是：

- **正在做毕业设计的学生**：BMad能帮你把毕设做得像企业项目
- **想转AI开发的Java程序员**：BMad的Agent架构和工作流编排都是很好的学习材料
- **独立开发者**：一个人就是一支队伍，BMad帮你补齐团队短板
- **创业公司的技术负责人**：人手不够的时候，BMad能顶半个产品、半个架构

但如果你只是想改个bug、加个小功能，BMad可能有点"杀鸡用牛刀"。

## ending

说句掏心窝子的话，BMad让我看到了AI Coding的另一种可能性。

不是"让AI替你写代码"，而是"让AI帮你更专业地写代码"。

从游击队到正规军，这中间差的不是工具，而是方法。

BMad把敏捷开发这套经过验证的方法，搬进了AI工具里，让每个开发者都能享受到"专业团队"的协作体验。

33k+Star，这社区用脚投票的结果，说明了一切。

还没有体验过的同学，可以装上试一试。

```bash
npx bmad-method install
```

或许你会发现，AI Coding还有另一种打开方式。
