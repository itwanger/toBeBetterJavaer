---
title: 面试官坏笑：“你用 AI 编程一年了，怎么保证 Claude Code 写出来的代码是对的？”我：“直接上 Claude Fable 5 啊！”
shortTitle: Claude Code 编程经验实战
description: 一年 Claude Code 编程经验总结，6 个实战 Case 展示 CLAUDE.md、Skill、Hook、Sub-agent 等核心技巧，附 Fable 5 模型体验。
keywords:
  - Claude Code
  - Claude Fable 5
  - AI编程
  - CLAUDE.md
  - Agent Skills
tag:
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-06-10
---

大家好，我是二哥呀。

我发现，对于 Claude Code，群里、评论区、私信，问得最多的两个问题是：Claude Code 到底怎么用？怎么保证它写出来的代码是对的？

第一个问题好回答，装上就能用。

![](https://cdn.paicoding.com/stutymore/claude-fable-5-code-correctness-20260610133711.png)

甚至你用 PaiSwitch 可以切换任何底层模型（开源的）。昨天刚升级，新增了桌面版。

第二个问题的答案就需要长篇大论了。

今天这篇，我就把自己摸索出来的经验浓缩成 6 个实战 Case，每个 Case 都有具体的提示词、执行过程和最终效果，看完大家就明白了。

![](https://cdn.paicoding.com/stutymore/sucai-20260610114310.png)

TIPS：Claude 今天刚升级了 Fable 5 模型，AI 圈都在吹这个模型超过了 GPT-5.5，大家用了吗？

对了，Claude 升级到最新版就能用。

## 01、CLAUDE.md 非常重要

很多小伙伴装完 Claude Code 就直接开干，一上来就让它写代码。

但我的经验是，第一步应该先写 CLAUDE.md。

CLAUDE.md 是 Claude Code 的项目级指令文件，放在项目根目录，每次新开会话的时候 Claude Code 都会自动加载。大家可以理解为给 Claude Code 写了一份“新员工入职手册”，里面需要写清楚项目的技术栈、代码规范、目录结构、禁止指令。

![](https://cdn.paicoding.com/stutymore/claude-code-claudemd-guide-20260525160223.png)

### Case1：给 PaiCLI 加一个 /export 命令

我用 PaiCLI 来做这个对比。

PaiCLI 是一个对标 Claude Code 的 Java Agent CLI。

![](https://cdn.paicoding.com/stutymore/claude-fable-5-code-correctness-20260610135614.png)

测试提示词：

> 给 PaiCLI 加一个 /export 命令，把当前会话的对话记录导出成 Markdown 文件，保存到 ~/.paicli/exports/ 目录下。

没有 PAI.md 的时候，模型拿到的上下文只有用户的这句话和它自己读到的代码文件。

有 PAI.md 的时候，PaiCLI 启动就会把 PAI.md 的内容注入 system prompt。

![](https://cdn.paicoding.com/stutymore/claude-fable-5-code-correctness-20260610141156.png)

我们来看一下 `/export` 命令的执行结果。

启动一个新的session，随便输入一个提示词。再执行 `/export` 命令。

![](https://cdn.paicoding.com/stutymore/claude-fable-5-code-correctness-20260610142440.png)

然后我们看一下导出的 Markdown 文件内容。

![](https://cdn.paicoding.com/stutymore/claude-fable-5-code-correctness-20260610142518.png)

其中 PAI.md 中的内容如下所示。

![](https://cdn.paicoding.com/stutymore/claude-fable-5-code-correctness-20260610142557.png)

也就是说，虽然我们在使用Agent的时候只发了一句很简单的内容，但因为Harness的存在，系统指令里其实已经塞了很多的上下文。

包括 Skills、MCP 工具的描述等等。

![](https://cdn.paicoding.com/stutymore/claude-fable-5-code-correctness-20260610142723.png)

这里也是提个醒，你的Agent没必要装太多的全局Skills和MCP，他们很有可能就是上下文的干扰信息。

最好是针对每个项目来。

## 02、用 PaiCLI 搓一个 3D 交互页面

最有视觉冲击力的还是前端和 3D，咱们就拿一个 Three.js 的任务来展示 PaiCLI 的代码生成能力。

![](https://cdn.paicoding.com/stutymore/claude-fable-5-code-correctness-20260610143336.png)

之所以没直接用 Claude Code，是因为这种级别的case 还不需要，哈哈。

刚好也可以证明一下PaiCLI的能力。

### Case2：Three.js 星空粒子交互页面

提示词如下。

> 用 Three.js 写一个星空粒子交互页面。要求：1）3000 个粒子随机分布在球形空间内，粒子颜色渐变（蓝-紫-粉）；2）鼠标移动时，周围的粒子被“吸引”靠近光标位置，形成涟漪效果；3）背景是深色渐变，底部有一行发光文字“Built with PaiCLI”；4）支持手机端触摸交互；5）输出一个完整的 HTML 文件，可以直接在浏览器打开。

![](https://cdn.paicoding.com/stutymore/claude-fable-5-code-correctness-20260610144116.png)

用 DeepSeek V4 Pro出来的效果，粒子的颜色渐变很自然，鼠标移过去确实有涟漪效果，手机端触摸也能正常交互。

![](https://cdn.paicoding.com/stutymore/claude-fable-5-code-correctness-20260610145118.png)

### 技巧，视觉类任务的提示词写法

视觉类任务的提示词有一个规律——把“看到什么”和“交互做什么”分开写。

先描述静态画面（粒子颜色、背景色、文字样式），再描述动态交互（鼠标移动效果、点击行为、动画）。

Claude Code/Codex 处理这种结构化描述的能力非常强。

## 03、Skill 让 PaiCLI 变专家

Skill 是 Claude Code 的“专业知识包”。装了对应的 Skill 之后，Claude Code 在处理特定领域的任务时会更加专业和准确。

![](https://cdn.paicoding.com/stutymore/claude-fable-5-code-correctness-20260610150915.png)

为了方便演示，我们这里仍然用PaiCLI来展示 Skill 的威力。PaiCLI 也支持 Skill，安装方式和 Claude Code 一样。

### Case，用 web-access Skill 做竞品调研

提示词如下。

> 使用 web-access 帮我调研一下 Dify 和 FastGPT 这两个 AI 工作流平台，重点关注节点类型、模型接入方式、是否支持私有化部署。整理成对比表格。

没有 web-access 的话，PaiCLI 可能会用 WebSearch 搜几下就交差了，给的信息没有什么深度。

但有了 web-access 就完全不一样了。

![](https://cdn.paicoding.com/stutymore/claude-fable-5-code-correctness-20260610151539.png)

![](https://cdn.paicoding.com/stutymore/claude-fable-5-code-correctness-20260610151742.png)

对比表格的信息密度非常高。

### 技巧，Skill 的安装和管理

Skill 的安装非常简单，直接告诉 Claude Code 去安装就行。比如：

> 帮我安装 web-access skill，仓库地址是 https://github.com/eze-is/web-access

安装完的 Skill 文件存在项目的 `.claude/skills/` 目录下。每个 Skill 有一个 `SKILL.md` 主文件定义指令逻辑，还可以有 `references/` 目录放参考文档。我们也可以自己写 Skill，格式就是一个 Markdown 文件加一个 YAML 头部。

![](https://cdn.paicoding.com/paicoding/84e0c8a7defbc70eab612571709fb5f2.jpg)

建议为每一个项目单独安装和配置 Skill，不要全局安装，因为全局会占用大量的上下文。

## 04、Hook——确定性规则兜底概率性模型

前面讲的 CLAUDE.md 和 Skill 都属于“提示词级别的约束”——本质上是在 system prompt 里告诉模型“该怎么做”。

Hook 不一样，它是代码级别的拦截，跑在模型之外。你设好规则，它每次都执行，没有抽卡。

打个比方，CLAUDE.md 相当于你给新员工口头交代的规则，“我们团队的代码不允许用 MD5 加密”。新员工听了，大多数时候都会遵守，但忙起来可能会忘。Hook 相当于 CI/CD 流水线上的自动化检查，代码里用了 MD5 直接编译不过，不管你忘没忘。

![](https://cdn.paicoding.com/stutymore/claude-fable-5-code-correctness-20260610160150.png)

### 三种触发时机

Hook 支持三种时机：

- **PreToolUse**——模型调用工具之前触发。适合做安全拦截，比如检测到 `git push` 要提交 `.env` 文件，直接拒绝，不用让模型去判断。
- **PostToolUse**——工具执行完之后触发。适合做质量检查，比如写完 Java 文件自动跑 `mvn compile`，编译失败把错误信息反馈给模型，它自动修复再编译。
- **Stop**——会话结束时触发。适合做状态持久化，比如把本轮会话的关键决策自动保存到日志，下次新会话启动时自动恢复上下文。

### 配置方式

Hook 配在 `.claude/settings.json` 里。一个 Java 后端项目的编译检查 Hook 长这样：

```json
{
  "hooks": {
    "afterWrite": [
      {
        "pattern": "**/*.java",
        "command": "mvn compile -q 2>&1 | tail -20"
      }
    ]
  }
}
```

前端项目可以把命令换成 `eslint --fix`，Python 项目换成 `pytest -x`。

原理都一样——工具执行完之后自动跑一次验证，失败了把错误喂回模型，模型修完再触发验证，循环直到通过。

## 05、Fable 5 做PaiCLI的宣传PPT

就在今天，Anthropic 发布了 Claude Fable 5，一个被AI圈称之为神的模型。

Claude 桌面版更新到最新版就能看到，使用截止日是 6 月 22 日。

![](https://cdn.paicoding.com/stutymore/claude-fable-5-code-correctness-20260610154932.png)

### Fable 5 强在哪

跑分咱就不看了，直接上实战。

提示词：

```
我要给PaiCLI这个项目设计一个宣传PPT，用 https://github.com/op7418/guizang-ppt-skill 这个Skill 
项目的基本信息：一个类似Claude Code的 Agent CLI
目标群体：27届大学生，想要学习Agent的同学
品牌调性：温暖治愈、自然松弛、外冷内热、有故事感

代码库你能用的可以用，（不是所有素材都用上），我只需要最终交付的PPT顶级审美，让人看了就想马上去学。
```

![](https://cdn.paicoding.com/stutymore/claude-fable-5-code-correctness-20260610155117.png)

Claude 桌面版会先获取归藏 PPT Skill，同时了解 PaiCLI 项目素材，然后按照 Skill 的方法论制作宣传 PPT。

token 消耗整体还可以。

![](https://cdn.paicoding.com/stutymore/claude-fable-5-code-correctness-20260610155250.png)


6 月 22 日之前 Pro 和 Max 用户可以免费用，建议大家在这个窗口期试试。

我截图大家看一下效果，整体我觉得还是很nice的，项目的重点也都捕获到了。

![](https://cdn.paicoding.com/stutymore/claude-fable-5-code-correctness-20260610155549.png)

## 06、上下文管理和提示词原则

Claude Code 的上下文窗口是有限的。会话变长之后，早期对话会被自动压缩，之前的细节可能丢失。

![](https://cdn.paicoding.com/paicoding/3b572e0746b572cd74519a4c678a960c.jpg)

这意味着上下文是 Agent 最贵的资源。

“不要装太多全局 Skill 和 MCP”，本质上就是在管理上下文开销——每多一个 Skill 描述、每多一个 MCP 工具定义，都会占用上下文预算。

几个应对原则：

- 复杂任务拆成独立子任务，每个子任务在新会话里做
- 项目的关键信息写在 CLAUDE.md 里，它每次自动加载，不会因为压缩而丢失
- 感觉模型开始“忘事”了，手动执行 `/compact` 触发压缩，保留最近的对话和关键决策，清掉早期冗余

一个好的提示词包含三个要素：

- **操作对象**——哪个文件、哪段代码
- **操作动作**——修改、删除、新增、重构
- **验证方式**——跑测试、编译、手动确认

三个要素齐了，执行准确率高很多。

![](https://cdn.paicoding.com/stutymore/claude-fable-5-code-correctness-20260610162119.png)

说到底，AI 编程时代的核心竞争力不是模型有多强，是你能不能把模型的能力和工程工具结合起来，形成一套可重复、可验证的工作流。

【**工具不会自己变厉害，是你驾驭它的方式让它变厉害**。】

我们下期见。
