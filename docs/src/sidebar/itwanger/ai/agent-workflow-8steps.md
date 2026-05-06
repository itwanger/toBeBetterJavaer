---
title: 国企领导：“现在都是 Agent 自动开发了，你还在对话模式，是不是太落后了？”我一点不慌：“我去补，假期后见分晓！”领导：“执行力拉满”
shortTitle: 我的8环节Agent工作流
description: 从知识问答到代码生成，从架构设计到集成测试，一套完整的 Agent 工作流实战拆解，8 个环节全部用 Agent 模式替代对话模式。
tag:
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-04-30
---

大家好，我是二哥呀。

马上假期了，我相信很多小伙伴肯定不会学习了，哦不，肯定不出去玩，要在家里学习 AI 对吧？（dog）

肯定的吧？

那在开始今天的内容之前，我也想问大家一下。

你平常更接近哪种开发模式：

- 人写代码+ AI 做校验？
- 人设计架构 + AI 写大部分代码？
- Agent 负责架构、代码编写，人负责 review？
- Agent 全部接管，测试也由 Agent 来完成？

![截图来自shibow](https://cdn.paicoding.com/paicoding/17a819062b66bbe2d1913e7c3cd19677.png)

因为我知道有些公司内部是不允许接入 AI 的，别质疑，真的有。

## 01、我的 Coding 工作流

先说一下我自己的模式。

1、知识问答：我现在只用 Claude APP，确实好用，上知天文下知地理，并且大部分情况下都是非常准确的。

2、内容创作：Claude Code + Opus 4.6。

在 Warp 终端直接用这个命令切到 4.6：

```
claude --model claude-opus-4-6
```

如果只用 `claude` 命令默认会用 4.7，但 4.7 的文本是一坨大便，甚至不如 GPT-5.5，一股子稳稳接住你的恶臭味。

或者 Claude Code+DeepSeek V4，DeepSeek 的文本能力一直都很对味，没有稳稳接住你的感觉。

3、架构设计：Codex + GPT-5.5 先调查一波

然后 Claude Code+ Opus 4.7 再调差一波，比较两个之间的共同点和差一点，如果都有，说明是完全可以执行的架构，否则就需要我人工介入去调研和调整。

4、代码生成：主力是 Codex+GPT-5.5，这个量大管饱，bug 很少。另外就是 Claude Code+GLM-5.1。

![](https://cdn.paicoding.com/paicoding/bb0680f4e447829d2becdff750174b47.png)

5、代码 review：我通常会用 Claude Code+Opus 4.7，我试了一下，Codex+GPT-5.5 基本上检查不出来，但 Claude Code+Opus 4.7 都能检查出来，给的解决方案也都很到位。

6、集成测试：Claude Code+Opus 4.7 以及 Qoder 的专家团模式。

![](https://cdn.paicoding.com/paicoding/06e41474c08dd83645aad2cf1f6c4e1c.png)

也会配合 IntelliJ IDEA+Codex 调试，看代码比较舒服。

如果需要浏览器自动化测试，我会上 Codex+GPT-5.5+Chrome Devtools MCP，或者 computer use。

7、前端：IntelliJ IDEA+Kimi 2.6

8、图片生成：GPT-Image2，以及 draw.io + GLM-5.1/DeepSeek V4

![](https://cdn.paicoding.com/paicoding/6b16f1a666754d66a7e364046ee59d4c.jpg)

![](https://cdn.paicoding.com/paicoding/eb4a211c26f194e4fd81691491749652.png)

这套工作流，能把开发效率拉到满中满。

## 02、对话模式和 Agent 模式

**对话模式**就是大家最熟悉的用法：

打开 ChatGPT 或者 Claude，输入一段话，等它回复，不满意再补一句，再等回复。本质上是人在驱动，AI 在响应。每一步都需要人来判断"下一步该干什么"。

**Agent 模式**完全反过来：给一个目标，Agent 自己拆解任务、自己决定用什么工具、自己执行、自己验证结果，遇到问题还能自己调整策略重来。

![](https://cdn.paicoding.com/paicoding/5889193722f838f3cd801fe4ff22a110.jpg)

人的角色从"主驾"变成了"副驾"，我们只需要告诉 Agent 目的地，路线 Agent 自己规划，自己开车。

举个真实的例子。

我们要给 PaiCLI 加一个"Chrome Devtools MCP"的功能。

对话模式我就不演示了。Agent 模式只需要讲一句话：

```
来调查一下第13期的开发任务吧
```

Agent 就会从去调研清楚，具体该用什么，然后给出解决方案。

![](https://cdn.paicoding.com/paicoding/821c4748b326679ccf95f4b7ac3cc33d.jpg)

等方案确认没问题后，我通常会让 Agent 把这个开发任务写到文件里，然后交给另外一个 Agent 去执行。

![](https://cdn.paicoding.com/paicoding/0faba38cc7607d1cd28418b294be14ed.jpg)

量大管饱的 Agent，国内的大模型或者 GPT-5.5 完成度都会非常高。

## 03、架构设计

**第一步，用 Codex + GPT-5.5 先调查一波。**

GPT-5.5 是 OpenAI 在 4 月 24 号发的最新模型，目前 Codex 每周有 400 万开发者在用。

GPT-5.5 在 Agentic Coding 上的提升非常明显，NVIDIA 的工程师实测反馈说"原来跨天的调试周期现在几小时就能关闭"。

调研阶段也不需要特别复杂的提示词，就是告诉他我们想要做什么：

```
如果要做Web search 和 Web fetch ，最轻量级的方案是什么
```

Codex 会自动去 GitHub 翻源码、去官方文档查 API 设计。拿回来的东西，通常来说，还不错。

![](https://cdn.paicoding.com/paicoding/08f67563959d73f74112224d470b5f5f.png)

**第二步，用 Claude Code + Opus 4.7 再调查一波。**

Opus 4.7 是 4 月 16 号发布的，Anthropic 官方说在长序列任务中丢子任务的概率比 4.6 低了 60%。

![](https://cdn.paicoding.com/paicoding/279ed4136c9db98c1711bf7733ebd7a7.jpg)

需求沟通这个阶段是最重要的，假如你知道的很少，完全依赖某一个模型，很可能就会把方案走偏。

像上下文压缩这个问题，不管是 GPT-5.5 还是 Opus 4.7 都没有给出满意的答案。

这个时候，就必须依靠我们的开发经验去纠正他。

另外，就是，不管 GPT-5.5 还是 Opus 4.7，对中文的解决方案都不够，比如说做 Web search，智谱明明提供了解决方案，但两个都没有给出来。

最后还是需要我自己智谱的解决方案链接丢给 Agent。

用多个模型去验证架构方案，看起来多花了时间，但能有效过滤掉模型幻觉。

## 04、代码生成

代码生成是整个工作流里工作量最大的环节，我的主力组合是 **Codex + GPT-5.5**。

为什么不用 Claude Code？

主要还是量大管饱，生成的代码大部分情况下直接能跑。

比如说我用 Codex + GPT-5.5 写完代码后，用 Claude Code+Opus 4.7 来测试，基本上都是全量通过，改动很小。

![](https://cdn.paicoding.com/paicoding/01197ca169dd9a2e3b26a1e5cd9cc671.png)

我通常会这样给 Codex 下指令：

```
开始第13期的代码编写吧
```

Codex 拿到指令后不是直接去写代码，而是先读项目结构、分析现有的代码风格和依赖版本，然后一个文件一个文件地生成，生成完还会自己跑一遍测试。

![](https://cdn.paicoding.com/paicoding/84508a02ef651d7b586dd2e5377dc5a5.png)

如果测试不通过，它会自己看报错、自己改、再跑一遍，直到全部通过为止。

![](https://cdn.paicoding.com/paicoding/9b0571bbcd0f89432aeb8ccc713fb505.png)

这里必须说一点，GPT-5.5 有一个特别明显的毛病：前端生成的时候特别喜欢套框框，一个框套一个框，嵌套层级深得离谱。让它改还是改不掉，像是训练数据里带来的"审美基因"。

![这得有多少个框](https://cdn.paicoding.com/paicoding/c52759cb4f57a8e7e3659433e665655a.jpg)

用一些 Skill 辅助吧，出来的效果也不太满意。我觉得本质上还是模型能力的问题，不是 Skill 设计的问题。

但如果花心思去调整的话，效果也还不错。比如说技术派上的折叠菜单，以及右侧的这种小图标，都能在原有的网站风格上做出来符合预期的效果。

![](https://cdn.paicoding.com/paicoding/80d6ec09db6a0ef8b68714fcab4e5655.png)

另一个候选组合是 **Claude Code + GLM-5.1**。

GLM-5.1 是智谱在 4 月 7 号发布的开源模型，MIT 协议，SWE-Bench Pro 拿了 58.4 分，全球第一，超过了 GPT-5.4 的 57.7 和 Opus 4.6 的 57.3。

在 Claude Code 框架下的编码测试中，GLM-5.1 得了 45.3 分，达到了 Opus 4.6 的 94.6%。

当 Codex 的额度不够的时候，我就会上这个组合。

在 DeepSeek V4 没有 Coding Plan 的情况下，这算是目前国内用户的最优解了。

## 05、代码 Review 和集成测试

Opus 4.7 新增了一个 `/ultrareview` 命令，相当于请了一个高级工程师帮忙做代码评审。

它会通读所有变更文件，标记潜在的 bug 和设计问题，给出具体的修改建议。

![](https://cdn.paicoding.com/paicoding/0315b5a13011f4a38d8b1a7d263b96d6.jpg)

![](https://cdn.paicoding.com/paicoding/c241690d60edeeb7db5d64df7b5691de.jpg)

集成测试我的组合是 **Qoder 专家团模式**。

Qoder 是阿里做的 AI 编码平台，它的专家团模式（Experts Mode）是今年 3 月份发布的。和单 Agent 最大的区别在于：它会自动组建一个"团队"来干活。

![](https://cdn.paicoding.com/paicoding/fefaf31ca054874f405f8728ab678bf8.jpg)

提一个测试需求，Team Lead 会把任务拆成多个子任务，分配给不同的"专家"。有的负责写测试用例、有的负责检查代码规范、有的负责安全扫描。

这些专家并行工作，最后由 Team Lead 整合所有结果。

另外我还会配合 **IntelliJ IDEA + Codex** 做调试。

如果涉及浏览器端的自动化测试，我会上 **Codex + GPT-5.5 + Chrome DevTools MCP**，或者直接用 Computer Use。

![](https://cdn.paicoding.com/paicoding/3d48c5441cea5c45cb8c9e57821d525d.jpg)

![](https://cdn.paicoding.com/paicoding/843588525e1d3584e6f2bf6d25211c15.png)

Chrome DevTools MCP 是 Chrome 官方团队做的 MCP 服务器，通过 CDP 协议让 Agent 直接操控浏览器，点击按钮、填写表单、验证页面渲染结果，整个 E2E 测试流程完全自动化。

## 06、前端和图片生成

前端开发我会用 **IntelliJ IDEA + Kimi 2.6**。

这个组合可能出乎很多人意料。

Kimi K2.6 在前端领域的表现太猛了。4 月 20 号发布的 1T 参数 MoE 模型，Next.js 基准测试比上一代提升超过 50%，SWE-Bench Pro 拿到 58.6 分，在前端生成方面的能力已经接近第一梯队。

![](https://cdn.paicoding.com/stutymore/kimi-k26-agent-swarm-20260421112352.png)

我写前端的时候喜欢在 IDEA 里直接用 Kimi 插件，好处是它能读到整个项目的上下文，组件结构、路由配置、状态管理、样式变量全部可见，生成的代码能直接和现有代码衔接上，不会出现命名风格不一致或者重复造轮子的问题。

**图片生成**我用两套方案。

创意类的图片，封面图、流程示意图、概念图，直接用 **GPT-Image2**，出图质量和理解力目前没有对手。

![](https://cdn.paicoding.com/paicoding/a86be4997fdb72117f5cbc4281a35585.jpg)

技术架构图、时序图这种有明确结构的图，我用 **draw.io + GLM-5.1 或 DeepSeek V4**。

![](https://cdn.paicoding.com/stutymore/kimi-k26-agent-swarm-20260421132258.png)

## ending

我觉得吧，

大家手头上至少得有一个顶级模型。

Codex + GPT-5.5 或者 Claude Code + Opus 4.7。

然后国产的大模型，DeepSeek V4 或者 GLM-5.1 或者 Kimi 2.6 至少有一个，绑定到 Claude Code 中。

这里给一张我个人的工具搭配速查表：

| 环节        | 主力组合                                 | 备选组合                              | 适用场景                       |
| ----------- | ---------------------------------------- | ------------------------------------- | ------------------------------ |
| 知识问答    | Claude APP                               | 豆包                                  | 快问快答，不需要 Agent         |
| 内容创作    | Claude Code + Opus 4.6                   | Claude Code + DeepSeek V4             | 中文写作 DeepSeek 更对味       |
| 架构设计    | Codex + GPT-5.5 → Claude Code + Opus 4.7 | -                                     | 双 Agent 交叉验证              |
| 代码生成    | Codex + GPT-5.5                          | Claude Code + GLM-5.1                 | 成本低                         |
| 代码 Review | Claude Code + Opus 4.7                   | -                                     | /ultrareview 命令很香          |
| 集成测试    | Claude Code + Opus 4.7 + Qoder 专家团    | Codex + GPT-5.5 + Chrome DevTools MCP | 浏览器测试用后者               |
| 前端开发    | IntelliJ IDEA + Kimi 2.6                 | -                                     | 审美在线                       |
| 图片生成    | GPT-Image2 / draw.io + GLM-5.1           | draw.io + DeepSeek V4                 | 创意图用 GPT，架构图用 draw.io |

Agent 模式听起来很高级，本质上就是把注意力从"代码怎么写"转移到"需求怎么描述"。

写好一段 prompt 的能力，可能比写好一段代码的能力更值钱。

没啥大事的话，我们就假期见。

