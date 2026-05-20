---
title: 为什么 2026 年我们要拼 Harness？
shortTitle: Harness 六大核心组件
description: 从 Prompt Engineering 到 Context Engineering 再到 Harness Engineering，Agent 工程这两三年经历的三次跃迁，为什么 2026 年我们在比拼 Harness。
tag:
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-04-15
---

大家好，我是二哥呀。

前阵子在 Datawhale 的社群里看到黄佳老师的一场分享，题目是《Agent Harness 革命》，看完收获非常多。

过去两年，我们其实已经在实践 Harness 了，像 Claude Code 就是 Harness 的最佳实践，基本上现在都人手一个。

![](https://cdn.paicoding.com/paicoding/4c8e4e165ff6ae3cd4d974ad6efb4d9d.jpg)

2026 年，模型的智力已经很顶了，不管是 GPT-5、Claude Opus 4.6、还是国内的 GLM-5.1，一个比一个猛。

这一点，相信大家都感同身受。

但猛归猛，我们仍然没办法放开手脚让他自由的奔跑 😄

需要有人盯着他。

这也是为什么，现阶段，我们会感觉到累的原因，Agent 干的活越多，我们盯的时间就越多。

## 01、比拼 Harness 的时代开始了

模型本身的迭代，已经不是我们最该关心的事了。

黄佳老师在分享里有一段话我印象特别深刻，大意是：2024 年那会儿，他觉得自己比 GPT 聪明，跟它说话的时候总想着「这玩意儿笨笨的，但知识还行」；到了 2025 年，他发现自己开始变傻了，模型的高度已经高出他一大截。到了 2026 年，他已经不需要模型再进化了，因为再进化他自己也感受不出来。

这话我是认可的。

不管是 Claude Code 还是 Codex，编码水平这块确实已经吊打我了。

![](https://cdn.paicoding.com/paicoding/07f5d4bfc7f5ab84c0da84e64748c905.png)

DeepMind 的 Agents 团队很早就实验这件事——把模型固定不懂，比如说只用 Claude Opus，只换外围的配套工具，性能能差出一个数量级。

就算是国产模型，套在 Claude Code 里，就是一个顶级 Agent。

Claude Code 为什么能这么火？

牛就牛在 Harness 上，那套把模型包裹起来的基础设施。

所以 2026 年的真相是：**比拼模型的时代过去了，比拼 Harness 的时代开始了。**

## 02、Prompt Engineering（2023）

回头看看 2023 年那会儿。

大家都在整活 Prompt——「你是一个 10 年经验的资深工程师」「请你以一位耐心的小学教师的身份」「让我们一步一步思考」。

某个大佬发了个牛逼的 Prompt，然后就引来一堆人抄作业。

![](https://cdn.paicoding.com/paicoding/9adeb227353a0905f4a139b3f29f50da.jpg)

GPT-3.5 那会儿，理解力有限，你得把话掰碎了喂给它，一层一层铺垫，它才能给你一个像样的答案。

所谓 Prompt Engineering，本质上就是在给幼儿园的小朋友比划手势，你比划得越清楚，他越能明白你说的啥。

那段时间流行一句话叫「Prompt 写得好，工资少不了」，有些公司还专门招 Prompt 工程师，开到五六十万年薪。

当然了，**Prompt Engineering 仍然很重要，但他已经不是主战场了。**

## 03、Context Engineering（2024-2025）

进入 2024 年后，大家很快就发现了新问题：**光把 Prompt 写清楚还不够，还得给模型喂药。**

你让它帮你写一个公司内部的业务模块，它不知道你公司的代码规范，不知道你的领域模型，不知道你上周刚改过一版接口。

它只能基于预训练时看过的那点通用知识，给你编一个「听起来对但其实没法跑」的玩意儿。

然后就进入 Context Engineering 时代了。

过去两年，大家都在干这个。

![](https://cdn.paicoding.com/paicoding/16b8e4206455dbeec214b37f5b2f02c4.jpg)

RAG 就是最典型的 Context Engineering 实践。

公司的文档、代码、FAQ，全都切片、向量化、塞进向量数据库，用户提问的时候先从向量库里捞最相关的几段，再连同问题一起丢给大模型。

我之前带大家做的派聪明 RAG 项目，干的就是这个事儿——把公司的知识库变成大模型的「语料库」。

![](https://cdn.paicoding.com/paicoding/2550c873a349d8bee29d46400f12ce76.png)

Context Engineering 的核心思想也很简单：**你给模型什么东西，你就能从模型那里拿到什么东西。**

到了 2025 年年底，Context Engineering 也碰到了天花板。

啥天花板呢？

**上下文爆了。**

一个真实的 Agent 任务跑起来，工具调用十几轮，每一轮的返回值、每一次中间推理，全都往 Context 里堆。一开始 8K 窗口，后来扩到 32K，再到 128K、200K，甚至 1M。

窗口越来越大，但任务也越来越复杂，压根儿不够用。

![](https://cdn.paicoding.com/paicoding/6730a8f0d17857287ee1a6f7f725d073.png)

更要命的是——**光有 Context 还不够，我们还控制不住模型用这个 Context 干啥。** 它可能反复调同一个工具死循环，可能偷偷跑了一个你没授权的命令，可能花了你几十美刀都没得出像样的结果。

这时候大家才反应过来：问题不在模型，不在 Prompt，也不在 Context——问题在于**我们没有一个系统来「驾驭」模型**。

## 04、Harness Engineering（2026）

于是 Harness 来了。

Harness 这个词，直译是「马具」，缰绳、马鞍、护具。意思就是——马再猛，你得能驾驭得了。

```
Agent = Model + Harness
```

Harness 做的就是**把模型的大脑变成 Agent 的身体**。

![](https://cdn.paicoding.com/paicoding/66d34fa84144ceb0da1dcd25807e3ca2.jpg)

说白了，Harness 就是包裹模型运行的基础设施：模型运行时、工具系统、上下文管理、权限控制、状态持久化，全都是 Harness 要干的活儿。

这就是 2026 年 Agent 工程的真相——**Harness 才是战略级资产。**

## 05、Harness 六大核心组件

Harness 不是一个单点技术，是一整套基础设施。拆成六个模块最容易理解：

### 第一，Agentic Loop——最重要的心脏

一个 Agent 的生命周期里，最核心的就是这个循环：**接收输入 → 模型推理 → 调用工具 → 观察结果 → 再次推理 → ……直到任务完成。**

这个循环跟那篇著名的 ReAct 论文（Reasoning + Acting）一脉相承，但真做到工程级别，远没那么容易。

Claude Code 的 Agentic Loop 我研究过源码，它每一轮循环都会做三件事：**gather context（收集上下文）→ take action（采取动作）→ verify work（验证结果）**。

这三件事在 Claude 官方的工程博客里被反复强调，是所有 Agent 设计的骨架。

![](https://cdn.paicoding.com/paicoding/cc9e6fe6313d4e0426d67587acc1e9ff.jpg)

很多同学自己写 Agent 的时候，循环——只有「调工具 → 看结果 → 调下一个工具」，缺了推理和验证。结果就是 Agent 跑着跑着就错了，工具调错、结果没检验、最后输出一堆垃圾。

一个好的 Agentic Loop 要带**每轮的 token 预算**、**工具调用次数上限**、**结果校验机制**、**上下文压缩触发条件**。

少一个都不行。

### 第二，Tool System——Agent 的手脚

模型本身只会输出文字。

Tool System 的作用，就是**把模型的文字输出翻译成可执行的动作**。

读文件、写文件、跑命令、查数据库、调外部 API，全都得通过工具。Claude Code 有一个非常巧妙的设计哲学——**少而精的工具，原子组合**。

它的内置工具不多，就那十几个（Read、Write、Edit、Bash、Grep、Glob 等等），但组合起来能解决绝大部分开发任务。

![](https://cdn.paicoding.com/paicoding/6b404838749f688cbcf6e0d98bb73e82.png)

反观很多第三方 Agent 框架，上来就堆一百多个工具，模型选工具的时候反而选择困难症，准确率直线下降。

这里面有一个经验之谈：**工具不是越多越好，是越少越好。**

能用一个工具解决的事儿，别硬拆成三个。

能用原子组合出的功能，别封装成 API。

### 第三，Memory & Context Management——Agent 的备忘录

这是 Claude Code 最强的一块，没有之一。

Context Engineering 这个概念就是 Anthropic 最早提出来的，他们在 Context 压缩上的工程细节，领先别人好几条街。

比如自动压缩（compaction）——当上下文逼近窗口上限时，系统会自动把前面的内容摘要化，保留关键信息，丢掉冗余细节。

我实测过一个场景：让 Claude Code 做一个大型重构，跑了 200 多轮工具调用，中间还穿插了几十个文件的读写。换做别的框架，这种任务早就因为上下文爆炸了。Claude Code 却能稳稳跑完，最后还能记得最初的需求。

![](https://cdn.paicoding.com/paicoding/84c97191f5c6cf0cbce57f7734b9d5b8.png)

除了自动压缩，还有 Sub-agent、Skills、CLAUDE.md 这些机制，本质上都是 Memory & Context Management 的一部分——**把一次性要喂给模型的东西，拆成按需加载、按需召回的模块**。

顺带一提，Sub-agent 也是 Claude 最先提出的，Skill 也是，按 Topic 分类的 Memory 也是，连 MCP 协议都是他们搞出来的。

真的，Claude 在 Agent 工程这块，碾压别人。

### 第四，Guardrails——缰绳控制

这个模块干的事儿是：**Allow、Deny、Ask**。

用 Claude Code 的小伙伴应该都熟悉——它每次要执行某个命令，尤其是涉及写文件、跑 shell 的时候，都会跳出来问「要不要执行？」。

有人觉得烦，但这个设计是救命的。

想象一下，你让 Agent 帮你清理一个目录，它脑子一抽生成了 `rm -rf /`，如果没有 Guardrails 拦着，一行命令下去，整个机器就凉了。

![](https://cdn.paicoding.com/paicoding/f03fe70888e9f5d1fb04e406796d724c.jpg)

Guardrails 不只是拦危险操作，还要做白名单、黑名单、操作范围控制。

比如你只允许 Agent 读项目目录下的文件，不允许它访问 `~/.ssh`。

这些控制能力，决定了你敢不敢把 Agent 放到生产环境里跑。

**敢放进去，Agent 才有商业价值；不敢放，它就是个玩具。**

### 第五，Hooks——Agent 的门卫

Hooks 是在 Agent 执行的特定时机自动触发的钩子。

Pre-tool、Post-tool、Session-start、Session-end，每个时机都可以挂一段自定义逻辑。

举个例子——黄佳老师提到的那个经典场景：**代码提交到 GitHub 的时候，不小心把 `.env` 文件也推上去了，里面全是数据库密码和 API 密钥。**

这种事儿在真实项目里年年发生，一旦发生就是 P0 事故。有了 Hooks，你可以在 PreCommit 这个钩子上挂一段检查逻辑——只要检测到要提交 `.env` 或者包含敏感关键字的文件，立刻拒绝。不用 Agent 去判断，规则直接拦死。

![](https://cdn.paicoding.com/paicoding/97508f0490667c37d22ca18457ccdb3c.png)

Hooks 是 Harness 里非常硬核的一块，它让 Agent 的行为可以被**确定性规则**兜底。

模型是概率性的，Hooks 是确定性的，两者结合，才是一个能放心用的系统。

### 第六，Session——把对话变成对谈

最后是 Session，会话的连续性。

这听起来最没技术含量，但实际上最影响体验。一个没有 Session 的 Agent，每次跟你说话都是一张白纸，你得从头讲起。一个好的 Session 设计，能让 Agent 记住你昨天的决策、上周的偏好、甚至上个月的某次冲突。

Claude Code 的 Session 管理相当巧妙——它把项目级 Memory（CLAUDE.md）、全局 Memory、临时 Memory 分开管理，不同粒度的记忆走不同通道。

![](https://cdn.paicoding.com/paicoding/ca2e249f9b755534d9a348dc38b7e536.png)

你在一个项目里跟它建立的默契，换一个项目也能带过去一部分。

这就是我特别喜欢 Claude Code 的地方——它不是一个一次性工具，是一个能跟你长期共事的搭档。

## 06、Harness 到底解决了什么

Harness 听起来很学术，但它解决的全是现实问题。

黄佳老师总结了五个点，我挨个说一下——这些痛点但凡做过 Agent 的人，都深有体会。

**第一，无限循环问题。**

Agent 有时候会陷进死循环——模型觉得「再试一次就行」，工具调用了 30 次都拿不到想要的结果，API 账单蹭蹭涨。

没有 Harness 的保护，这种事儿分分钟能把你的 token 烧完。

![](https://cdn.paicoding.com/paicoding/ca240c04788813a3c0f47ae094289ac5.png)

**第二，上下文爆炸问题。**

复杂任务跑下来，上下文能轻松冲到几十万 token。没有压缩机制的 Agent，跑到一半就报错「context length exceeded」，前面的工作全白费。

**第三，权限失控问题。**

Agent 没授权也能跑命令、改文件、连外网。这玩意儿放到生产环境里，分分钟能给你整出数据泄露。

**第四，质量不可控问题。**

Agent 输出的东西没人校验，对就是对、错也是错。没有验证机制的 Agent 就是个不靠谱的实习生，你得时时刻刻盯着它。

**第五，成本不透明问题。**

跑一次 Agent 花了多少钱？调用了哪些工具？每个工具花了多少 token？没有监控的 Agent，就是一个黑洞。

这五个点，Claude Code 都有成熟解决方案。

这也是为什么它在开源社区被无数团队照着抄——它把 Harness 的所有工程细节，都通过源码展示出来了。

你就算不用它，研究它的设计，都能少走两三年弯路。

## 07、为什么 Claude Code 是 Number One

说到 Harness，Claude Code 就是 Number One，绝对碾压别人。

这不是我一个人吹，黄佳老师在分享里也这么说。

我自己用过的 Agent 工具很多很多——Cursor、Windsurf、Codex、Copilot、Cline、Aider、OpenCode、Hermes、OpenClaw……Claude Code 在工程深度上仍然是一骑绝尘。

它到底牛在哪？

![](https://cdn.paicoding.com/paicoding/3ead7238fde7041791672b87a73965d3.jpg)

我总结三点：

**一是少而精的工具哲学。** 不堆工具。十几个内置工具，能拼出多种组合。这种设计美学，真的是有洁癖的工程师才做得出来。

**二是上下文管理的工程深度。** compaction、Sub-agent、Skills、CLAUDE.md，四层机制互相配合，把上下文这件事做到了极致。

**三是对不确定性的敬畏。** Guardrails、Hooks、权限审批，这些机制全都承认一件事——**模型会犯错，系统必须兜底**。

当然，Codex 也很强。

横向扩展的还有 OpenClaw、Hermes Agent 这种——能帮你链接飞书。

不过说老实话，我已经很少用 OpenClaw 了，我还是更喜欢 Claude Code 这种一来一往的深层次交互。我知道它每一步在干啥，我要跟它切磋、要跟它对线。

## 08、Agent 时代我们的出路是什么？

这是黄佳老师分享里最戳中我的一句话——**工程师永远不会失业，但码农可能会失业。**

区别在哪？

**码农是单纯写代码的人。** Agent 能生成代码了，码农的价值就被稀释了。

**工程师是能够设计并驾驭复杂系统的人。** 他的核心能力不在于写代码，而在于：理解系统的复杂性、抽象和结构化思维、驾驭不确定性。

![](https://cdn.paicoding.com/paicoding/e9f70243f9122903e1109543c0ee6179.jpg)

这三项能力，恰恰是 Harness Engineering 的底层能力。

**理解系统的复杂性**——你得知道一个 Agent 系统里有哪些模块，每个模块在什么时机做什么事儿，模块之间怎么通信、怎么传递状态。

**抽象和结构化思维**——你得能从一堆乱七八糟的需求里，抽出最核心的循环、最本质的工具边界、最关键的上下文结构。

**驾驭不确定性**——你得能在一个概率性的系统里，设计出确定性的兜底逻辑。这是最难的，因为传统软件工程训练的是「一切都要可预测」，而 Agent 系统本质上是「大部分时候可预测、少部分时候彻底失控」。

我特别认同黄佳老师那句话——「懂业务将成为护城河」。

Agent 越是强大，越是凸显出业务理解的重要性。模型可以写代码，但它写不出来你公司那套独特的业务规则；模型可以调工具，但它不知道你那个客户凌晨三点的特殊需求。

Agent 时代，我们作为个体，懂得要越多，不能越少。

## ending

Prompt Engineering 教会我们怎么跟模型说话。

Context Engineering 教会我们怎么给模型喂药。

Harness Engineering 教会我们怎么把模型关进一个可控的系统里，让它既能跑得飞起，又不至于翻车。

这三次跃迁不是替代关系，是叠加关系。就像软件工程三十年演进——设计模式没过时，企业架构没过时，分布式系统没过时，数据密集型应用也没过时。**Agent 时代，我们只是在前人的肩膀上，又搭了一层。**


![](https://cdn.paicoding.com/paicoding/b957bfed510d47ab66fb66bbb6fbcaf1.png)


模型智力已经在线。

现在，比拼的就是 Harness。

从码农升级为工程师，从被动执行跃迁为主动驾驭——这才是 Agent 时代，我们真正该修炼的内功。

**【凡此过往，皆为序章。模型是马，Harness 是缰；攥住缰绳的人，才能骑上这匹马。】**

朋友们，稳住，我们一起往前冲。

