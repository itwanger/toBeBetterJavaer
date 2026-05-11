---
title: AI Agent 面试题第五弹：Prompt 分层架构、Skill 系统、提示词工程 12 题
shortTitle: 面试题：Prompt 与 Skill
description: 围绕 PaiCLI 实战，精选 12 道 Prompt 工程与 Skill 系统面试题，覆盖 system prompt 分层、KV Cache 优化、Skill 加载和提示词最佳实践。
tag:
  - Agent
  - 面试题
  - Prompt
category:
  - AI
author: 沉默王二
date: 2026-05-11
---

大家好，我是二哥呀。

第五弹，聚焦**Prompt 工程与 Skill 系统**。对应 PaiCLI 的第 15 期（Skill 系统）和第 19 期（Prompt 分层架构）。

Prompt 是 Agent 的"灵魂"——同样的工具集、同样的模型，prompt 写得好不好直接决定 Agent 的行为质量。而 Skill 是把 prompt 工程化的手段，从"一坨 system prompt"进化到"按场景加载的专家手册"。

## 01、Agent 的 system prompt 一般包含哪些内容？

一个生产级 Agent 的 system prompt 通常包含这些部分：

1. **角色定义**：你是谁、你能做什么（"你是一个 Java Agent CLI，能读写文件、执行命令..."）
2. **行为规范**：输出格式、语言、语调
3. **工具使用指导**：什么场景该用什么工具、工具之间怎么配合
4. **安全约束**：哪些操作不能做、哪些需要确认
5. **上下文信息**：项目目录、当前模型、可用工具列表
6. **模式指令**：ReAct 模式的推理流程、Plan 模式的规划要求

问题是，随着功能迭代，这些内容会越来越多。PaiCLI 到第 16 期时，system prompt 已经膨胀到几千字，全部硬编码在 Java 里，改一句话要重新编译。这就引出了 Prompt 分层架构。

## 02、Prompt 分层架构是怎么设计的？

PaiCLI 第 19 期把 system prompt 从 Java 硬编码拆成 Markdown 文件，按职责分层：

```
src/main/resources/prompts/
├── base.md                    # 核心规则（工具使用、输出格式）
├── personalities/calm.md      # 语调（冷静专业风格）
├── modes/
│   ├── agent.md              # ReAct 模式指令
│   ├── plan.md               # Plan task executor 指令
│   ├── planner.md            # Planner 规划器指令
│   ├── team-planner.md       # Multi-Agent Planner
│   ├── team-worker.md        # Multi-Agent Worker
│   └── team-reviewer.md      # Multi-Agent Reviewer
├── approvals/
│   ├── suggest.md            # HITL 建议审批
│   ├── auto.md               # 自动放行
│   └── never.md              # 永不放行
└── context/
    └── context-management.md # 上下文管理策略
```

`PromptAssembler` 按固定顺序组装：

```
base → personality → mode → approval → project_context → skills → context_mgmt → handoff
```

好处：改 prompt 不用改 Java 代码，改 Markdown 文件就行。不同模式只替换 mode 层，其余层共享。

## 03、为什么组装顺序是"稳定在前、动态在后"？

这和 **KV Cache** 有关。

LLM 推理时，会把 prompt 的每个 token 计算出 Key 和 Value（KV），缓存起来。如果连续两次请求的 prompt 前缀相同，服务端可以复用上次的 KV Cache，跳过重复计算。

PaiCLI 的组装顺序遵循**"volatile content last"**原则：

- `base.md`（几乎不变）→ 高 cache 命中率
- `personality`（不变）→ 继续命中
- `mode`（按模式切，但同模式不变）→ 大部分时候命中
- `project_context`（偶尔变）→ 开始不命中
- `skills`（按需加载）→ 经常变
- `handoff`（每轮不同）→ 不命中

这样前面 60-70% 的 prompt 能持续命中 cache，节省计算和成本。如果把动态内容放前面，整个 cache 就废了。

## 04、用户怎么覆盖内置 prompt？覆盖粒度是什么？

PaiCLI 支持三层覆盖：

1. **jar 内置**（最低优先级）：`src/main/resources/prompts/`
2. **用户级**：`~/.paicli/prompts/`
3. **项目级**（最高优先级）：`<project>/.paicli/prompts/`

覆盖粒度是**整文件替换**。比如你创建 `~/.paicli/prompts/modes/agent.md`，就会完全替换内置的 `agent.md`。

这个设计的取舍：

- **优点**：简单直观，用户完全控制
- **缺点**：不支持部分修改（比如只想在 agent.md 末尾加一段），必须复制整个文件再改

启动时有一个校验：最终组装的 prompt 必须包含 `## Language` section。这保证了 LLM 的 `reasoning_content` 语言跟随设置不会被意外覆盖掉。

## 05、什么是 Skill？它和 Tool 有什么区别？

**Tool** 是给 Agent 的"手"——一个可执行的函数，输入参数，返回结果。比如 `read_file`、`execute_command`。

**Skill** 是给 Agent 的"专家手册"——一份按场景组织的知识和决策指引。不是代码，而是 Markdown 文档。

| 维度 | Tool | Skill |
|---|---|---|
| 形式 | 代码函数 | Markdown 文档 |
| 触发 | LLM 通过 tool_calls 调用 | LLM 通过 `load_skill` 工具加载 |
| 内容 | 执行逻辑 | 决策手册 + 最佳实践 + 经验数据 |
| 注入位置 | tools 字段 | user message 前置 |

举个例子：`web_fetch` 是 Tool（抓取网页），`web-access` 是 Skill（告诉 Agent 什么时候用 web_fetch、什么时候用浏览器、各个站点的经验）。

Skill 的设计意图是：**当工具堆成山时，用 Skill 给 LLM 一份按场景展开的"专家手册"，比往 system prompt 里塞更多规则更可扩展。**

## 06、Skill 的加载机制是怎么工作的？

Skill 的加载是**延迟加载（Lazy Loading）**的：

1. **启动时**：只把所有启用 Skill 的 `name + description` 注入 system prompt 索引段（≤ 4KB）
2. **运行时**：LLM 看到用户输入匹配某个 Skill 的 description，主动调用 `load_skill(name)` 工具
3. **注入**：`load_skill` 把 Skill 的 `SKILL.md` 正文写入 `SkillContextBuffer`
4. **下一轮**：`SkillContextBuffer` 的内容自动前置注入到下一轮 user message 前面
5. **消费后清除**：注入一次后从 buffer 移除，不会反复注入

为什么要延迟加载？**省 token**。如果 20 个 Skill 的完整手册全部塞进 system prompt，可能占 50k+ token。延迟加载只在需要时注入当前场景的 1-2 个 Skill。

`SkillContextBuffer` 最多保留 3 个 Skill body，超出最早的被挤掉。`/clear` 会 reset buffer。

## 07、web-access Skill 具体包含什么内容？

web-access 是 PaiCLI 的首个内置 Skill，目录结构：

```
skills/web-access/
├── SKILL.md                # 决策手册（浏览哲学四步法 + 工具选择表）
└── references/
    ├── mp.weixin.md        # 微信公众号经验
    ├── zhuanlan.zhihu.md   # 知乎专栏经验
    ├── x.com.md            # Twitter/X 经验
    ├── xiaohongshu.md      # 小红书经验
    ├── github.md           # GitHub 经验
    ├── juejin.md           # 掘金经验
    └── cdp-cheatsheet.md   # Chrome DevTools 速查表
```

SKILL.md 的核心内容：

1. **浏览哲学四步法**：先判断是否需要联网 → 选择工具 → 执行 → 验证结果
2. **工具选择表**：web_fetch vs 浏览器 MCP 的决策矩阵
3. **浏览器优先级**：`take_snapshot`（DOM 文本）优先于 `take_screenshot`（截图），因为文本更省 token
4. **Jina 兜底**：`web_fetch` 和浏览器都失败时，可通过 `execute_command` 调用 `r.jina.ai` 做兜底抓取

references 目录里是按站点积累的经验——比如微信公众号的文章链接格式、知乎的反爬特征、GitHub 不同页面的结构差异。

## 08、Skill 的三层加载位置是怎么覆盖的？

```
jar 内置 < 用户级 ~/.paicli/skills/ < 项目级 <project>/.paicli/skills/
```

覆盖规则是**按 name 整体替换**：如果用户级有一个 `web-access` Skill，就完全替换 jar 内置的同名 Skill。项目级优先级最高。

这意味着不同项目可以有不同的 Skill 配置——前端项目的 web-access Skill 可以加上 Webpack DevServer 的经验，后端项目可以加上 Swagger 的经验。

启动时 `SkillBuiltinExtractor` 会把 jar 内置的 Skill 解压到 `~/.paicli/skills-cache/`，用 `.version` 文件控制是否需要重建。

## 09、怎么写一个好的 Agent system prompt？

从 PaiCLI 的 19 期实践和 Prompt 审计模板总结的最佳实践：

**1. 角色清晰**：第一段就说清楚你是谁、能做什么、不能做什么。

**2. 工具指导要具体**：不要写"合理使用工具"，要写"读取文件用 read_file，不要用 execute_command cat"。

**3. 有决策表**：当工具之间有选择关系时，用表格明确什么场景选什么工具。

**4. 负面示例和正面示例配对**：
```
错误：直接用 rm 删除文件
正确：先用 read_file 确认内容，再用 write_file 修改
```

**5. 优先级明确**：规则之间有冲突时，哪个优先。比如"安全优先于效率"。

**6. 不要太长**：system prompt 越长，LLM 越容易忽略中间部分。2000-4000 token 是比较合理的范围。

## 10、Prompt 改了怎么验证效果？有没有评估方法？

PaiCLI 提供了 `docs/prompt-analysis-template.md` 作为 Prompt 质量审计模板。每次改 prompt 都应该做 Gap 分析：

**1. 现状描述**：当前 prompt 在什么场景下表现不好？

**2. 改动内容**：具体改了什么、为什么改？

**3. 预期效果**：改完之后期望 LLM 在什么场景下行为不同？

**4. 回归验证**：改完后原来正常的场景是否仍然正常？

系统化的评估方法：

- **A/B 测试**：准备一组固定的测试用例，分别用旧 prompt 和新 prompt 跑，对比 LLM 输出
- **人工评分**：对每个测试用例的输出打分（准确性、完整性、安全性）
- **自动化指标**：工具调用准确率、任务完成率、平均轮次数

但说实话，大多数团队做不到系统化评估，"改一下跑几个 case 看看效果"是更现实的做法。关键是改 prompt 前有明确目标，改完后有验证动作。

## 11、Skill 和 RAG 有什么区别？都是往 prompt 里注入内容。

形式上确实像，但有本质区别：

| 维度 | RAG | Skill |
|---|---|---|
| 内容来源 | 用户的代码库/文档库 | 预编写的专家手册 |
| 检索方式 | 语义相似度 | LLM 主动选择加载 |
| 内容性质 | 事实数据（代码、文档） | 决策指引（怎么做、最佳实践） |
| 更新频率 | 随代码变化 | 随经验积累手动更新 |
| 注入时机 | 每轮自动检索 | LLM 判断需要时按需加载 |

一句话总结：**RAG 提供"是什么"（事实），Skill 提供"怎么做"（方法论）**。

Agent 理想的知识体系是两者结合：RAG 告诉 Agent "这个项目用了什么技术栈"，Skill 告诉 Agent "面对这种技术栈应该怎么操作"。

## 12、如果让你设计一个 Skill 体系，你会怎么做？

面试开放题。参考 PaiCLI 的设计：

**1. Skill 结构标准化**：每个 Skill 是一个目录，包含 `SKILL.md`（决策手册）+ `references/`（参考资料）+ 可选 `scripts/`（辅助脚本）。

**2. 延迟加载**：启动时只加载索引（name + description），运行时按需加载正文。控制 token 消耗。

**3. 三层覆盖**：内置 < 用户级 < 项目级。让不同项目可以定制。

**4. LLM 主动加载**：不做关键词硬匹配，让 LLM 根据 description 自己判断要不要加载。LLM 的语义理解能力比正则匹配强。

**5. 经验可积累**：references 目录按场景积累经验数据（站点经验、错误案例、最佳实践），Skill 的价值随使用时间增长。

**6. 和工具联动**：Skill 不直接执行操作，但它指导 LLM 怎么选择和使用工具。Skill + Tool = 既有手又有脑。

## ending

这 12 道题覆盖了 Prompt 工程和 Skill 系统的核心：分层架构、KV Cache 优化、用户覆盖、Skill 加载机制、web-access 实战、prompt 评估方法。

下一篇我们进入**产品化工程**——TUI、LSP 诊断、Git 快照、Runtime API、图片输入。
