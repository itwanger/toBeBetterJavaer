---
title: Qoder全面支持Skills了，我手搓了一个「面试官Skill」
shortTitle: Qoder Skills 实战
description: 手把手教你创建 Qoder Skill，通过实战演示如何制作一个精准的 LangGraph4J 面试题生成器，提升 AI 编程效率。
tag:
  - 程序员
category:
  - AI
author: 二哥
date: 2026-01-27
---

大家好，我是二哥呀。

你是不是也有这种困扰：同样的提示词要重复好多遍。比如你想让 AI 帮你梳理实战项目的面试题，换个项目都得解释一遍"我是阿里面试官"、"针对这个项目"、"要15道题"、"难度递进"这些要求，一遍两遍还行，次数多了真的挺烦人的。

![](https://cdn.paicoding.com/stutymore/qoder-skills-shice-20260127211309.png)

这个问题我通过 Qoder 完美解决了。

【截图：Qoder Skills 列表】

你可以把 Skills 理解成给 AI 定制的"工作手册"或者"技能包"，提前把角色设定、任务要求、输出格式这些写好，下次只需要输入一个指令，AI 就能按照既定套路干活。

![](https://cdn.paicoding.com/stutymore/qoder-skills-shice-20260127211510.png)

这就好比你给新员工写了一份详细的操作手册，他每次执行任务前翻一翻，就不会走样了。

我最近就手搓了一个「面试官」的 Skill，专门针对 PaiAgent 项目中的 LangGraph4J 部分生成面试题，效果还真不赖。

![](https://cdn.paicoding.com/stutymore/qoder-skills-shice-20260127215524.png)

今天就带大家从头到尾实操一遍，看看怎么从零创建一个 Qoder 的 Skill。

## 01、什么是 Skills

本质上，Skills 就是一个 Markdown 文件，里面包含了你希望 AI 遵循的提示词、任务描述、输入输出要求等等。

这个文件的命名和格式有严格规定：文件名必须是 SKILL.md，文件里必须包含 name 和 description 两个字段。

![](https://cdn.paicoding.com/stutymore/qoder-skills-shice-20260127211633.png)

Skills 分为两种级别。用户级 Skills 放在全局目录，所有项目都能用；项目级 Skills 放在项目的 `.qoder/skills/` 目录下，只能在当前项目用。

调用的时候，在 Qoder 里输入 `/技能名` 就行了，比如我创建的技能就叫 `/interviewer`。

之前给大家分享过一个 Skills 共享平台 skills.sh，上面有很多现成的技能可以直接用，比如 SEO 审计、代码审查、文章生成这些。但说实话，最香的还是自己动手定制，因为只有你最清楚自己需要什么。

![](https://cdn.paicoding.com/stutymore/agent-skills-top10-20260125171319.png)

## 02、快速体验：使用别人的 Skill

在动手创建之前，我们先体验一下现成的 Skill，感受下它到底有多方便。

skills.sh 上有个「SEO Audit」技能挺火的，专门用来检查文章的 SEO 优化情况。

![](https://cdn.paicoding.com/stutymore/qoder-skills-shice-20260127211840.png)


使用方法非常简单，打开Qoder的智能体模式，复制网站上给的命令：

```bash
npx skills add https://github.com/coreyhaines31/marketingskills --skill seo-audit -y
```

这条命令会自动把 SEO Audit 技能下载到当前项目的 Skills 目录。

![](https://cdn.paicoding.com/stutymore/qoder-skills-shice-20260127212552.png)

![](https://cdn.paicoding.com/stutymore/qoder-skills-shice-20260127212613.png)

![](https://cdn.paicoding.com/stutymore/qoder-skills-shice-20260127213655.png)

然后打开 Qoder，输入 `/seo-audit`，再配上你的文章路径，它就会按照预设定的 SEO 检查清单，从标题、关键词、内链、外链等维度给文章打分。

![](https://cdn.paicoding.com/stutymore/qoder-skills-shice-20260127213756.png)

整个过程中，你不需要解释什么是 SEO、不需要列出检查项、不需要告诉它输出格式，所有这些都已经在 SKILL.md 文件里写好了。

![](https://cdn.paicoding.com/stutymore/qoder-skills-shice-20260127213853.png)

这种零配置、开箱即用的体验，真的爽歪歪。

如果你的 Skills出不来，不显示，记得将Qoder升级到最新版。

来试试技术派的SEO如何，哈哈。

![](https://cdn.paicoding.com/stutymore/qoder-skills-shice-20260127213947.png)

果然存在一些问题，马上去优化一下。

![](https://cdn.paicoding.com/stutymore/qoder-skills-shice-20260127214052.png)

## 03、动手创建：我的第一个 Skill

好，看完别人的，我们自己做。

### 需求场景

我最近在折腾 PaiAgent 项目，里面用 LangGraph4J 实现了工作流编排引擎。

>https://github.com/itwanger/PaiAgent

![](https://cdn.paicoding.com/stutymore/qoder-skills-shice-20260127214206.png)

这个项目写简历的时候挺有亮点的，但面试的时候怎么考察候选人呢？

我想针对 LangGraph4J 部分出15道面试题，考察从基础概念到深度实现的理解程度。

### 创建 Skill 的两种方式

Qoder 提供了两种创建 Skill 的方式。第一种是通过自然语言描述，让 Qoder 帮你生成 SKILL.md 文件；第二种是直接用命令 `/create-skill`，Qoder 会引导你一步步填写信息。

我选择第一种，因为我的需求比较复杂，需要仔细描述清楚。我在 Qoder 里输入了这样一段话：

> 创建一个面试官 Skill，角色是阿里面试官，针对 PaiAgent 项目中的 LangGraph4J 部分提出15道面试题。需要阅读岗位描述 docs/jd.md、候选人简历 docs/resume.md、技术设计文档和核心源码，然后生成覆盖基础概念、架构设计、实现细节、深度思考四个维度的面试题。

Qoder Quest 理解了我的意图，然后就开始干活了。

![](https://cdn.paicoding.com/stutymore/qoder-skills-shice-20260127215310.png)

![](https://cdn.paicoding.com/stutymore/qoder-skills-shice-20260127215413.png)


### Skill 文件结构

让我把生成的 SKILL.md 文件拆解一下，你可以看到几个关键部分。

开头是元数据区域，用 markdown 注释包裹：

```markdown
---
name: langgraph-interviewer
description: 阿里 AI Agent 岗位模拟面试官。针对 PaiAgent 项目中 LangGraph4J 模块进行技术面试，覆盖基础概念、架构设计、实现细节、深度思考四个维度共15道面试题。当用户提到"模拟面试"、"面试准备"、"LangGraph面试"、"Agent面试"或需要练习技术面试时使用此 Skill。
---
```

这部分是必须的，name 就是技能名称，调用的时候用的就是它。description 会在 Skills 列表里显示，帮助你快速识别每个技能的作用。

接下来是提示词主体，我把它分成了几个模块：角色设定、任务描述、输入资源、面试题要求、约束条件。角色设定这块我写得比较详细，明确指出"你是一名专业的 AI 应用开发工程师，现在在阿里做面试官"，这样 AI 生成面试题的时候会有专业度和深度。

任务描述这块，我把任务拆成了6个步骤，从阅读资料到生成面试题，一步步列清楚。

特别重要的一点是，我强调了"仅关注 LangGraph4J 相关内容"，因为项目中还有 SpringAI、RAG 等其他技术，我怕 AI 混在一起。

![](https://cdn.paicoding.com/stutymore/qoder-skills-shice-20260127215936.png)


## 04、Skill 提示词编写技巧

通过这次实践，我总结了几个编写 Skill 提示词的技巧，分享给你。

第一个技巧是角色设定要具体。不要只说"你是一名面试官"，而要说"你是一名专业的 AI 应用开发工程师，现在在阿里做面试官"。角色越具体，AI 生成的内容就越贴合你的预期。你可以加上公司背景、技术栈、工作年限这些信息。

第二个技巧是任务描述要清晰。最好用步骤化的方式列出任务，比如"1. 阅读岗位描述 2. 阅读简历 3. 阅读技术文档"，这样 AI 执行起来会有条不紊。每个步骤要明确输入是什么、输出是什么，避免 AI 产生歧义。

第三个技巧是输出要求要具体。不要只说"生成面试题"，而要说"生成15道面试题，覆盖基础概念、架构设计、实现细节、深度思考四个维度，每道题包含考察点、参考答案要点、评分标准"。输出格式越明确，AI 生成的内容就越可用。

第四个技巧是利用参考示例和约束条件。参考示例能帮 AI 理解你想要什么样的内容，约束条件能帮 AI 避开你不想要的内容。我在 Skill 里加了"难度递进"的示例题，还有"不要问什么是 LangGraph"的约束，效果都很好。

第五个技巧是迭代优化。第一版 Skill 往往不够完美，多试几次，看看 AI 生成的内容哪里不符合预期，然后调整提示词。我自己就改了三版，从"10道题"改成"15道题"，从"简单描述"改成"包含评分标准"，一步步打磨出来的。

![](https://cdn.paicoding.com/stutymore/qoder-skills-shice-20260127220025.png)

如果你不知道怎么写，可以让 AI 帮你补充。我在 Qoder 里输入"帮我优化一下这个 Skill 的提示词"，它就会给出改进建议，比如"可以增加面试场景描述"、"可以加入评分标准示例"等等。让 AI 帮你写 Skill 提示词，这波操作有点像递归调用，挺好玩的。

## 05、实测效果展示

Skill 创建完成后，最激动人心的时刻到了——实测效果。

直接在 Qoder 里输入 `开始面试吧`。

![](https://cdn.paicoding.com/stutymore/qoder-skills-shice-20260127220332.png)

接着它开始生成面试题，第一道题就问到我看到你简历上写到基于 LangGraph4j 实现了工作流执行引擎。那先从最基础的开始，请你介绍一下 LangGraph4J 是什么？它和 LangChain4J 有什么区别和联系？在实际项目中，你是在什么场景下选择使用 LangGraph4J 而不是 LangChain4J 的？

我们来搞耍一下，说不知道，看看它什么反馈？

![](https://cdn.paicoding.com/stutymore/qoder-skills-shice-20260127220523.png)

好家伙，直接引导怎么回答了。舒服啊。

## 06、进阶技巧

掌握了基础用法后，我再分享几个进阶技巧，让你的 Skill 更强大。

第一个技巧是让 AI 帮你封装 GitHub 项目为 Skill。有些 GitHub 项目提供了很棒的功能，但没有对应的 Skill，这时候你可以让 Qoder 帮忙。

输入"把 github.com/xxx/yyy 这个项目封装成一个 Skill"，Qoder 会自动读取项目的 README 和文档，生成 SKILL.md 文件。

第二个技巧是把聊天记录沉淀到 Skill。有时候你和 AI 讨论一个问题，聊着聊着形成了一套固定的思路，这时候可以把聊天记录导出来，整理成 Skill。

![](https://cdn.paicoding.com/stutymore/qoder-skills-shice-20260127220824.png)

下次遇到类似问题，直接调用这个 Skill，AI 就会按照之前的思路来解决。这算是知识沉淀的一种方式吧，把个人经验转化为可复用的技能。

第三个技巧是项目级 vs 用户级的选择。如果你这个 Skill 只在当前项目用，就放在 `.qoder/skills/` 目录下；如果你多个项目都要用，就放在全局 Skills 目录。

我那个面试官 Skill 就放在项目级，因为它是针对 PaiAgent 项目定制的。但一些通用的 Skill，比如代码格式化、注释生成，我会放在用户级，所有项目都能用。

## ending

Qoder 支持 Skills 后，真的是提升 AI 编程效率的神器，它把重复性的提示词工作自动化了，让我们能更专注于业务逻辑本身。

我创建的面试官 Skill，一次编写，多次复用，每次调用都能稳定输出高质量的面试题，这种体验真的太爽了。

如果你也想尝试，建议从模仿开始。先去 skills.sh 上找几个现成的 Skill 用用，感受下它的格式和思路，然后针对自己的需求定制一个简单的 Skill，比如代码格式化、日志生成这些。熟练了之后，再尝试复杂一点的，比如我这类的面试题生成器。

相信我，一旦你用上了 Skills，就再也回不去了。那种"一个指令搞定复杂任务"的效率，真的会上瘾。

好了，今天就到这，赶紧去创建你的第一个 Skill 吧！

以后面试有救了呀。