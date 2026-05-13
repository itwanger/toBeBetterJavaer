---
title: AI Agent 面试题第五弹：Prompt 分层架构、Skill 系统、提示词工程 13 题
shortTitle: 面试题：Prompt 与 Skill
description: 围绕 PaiCLI 实战，精选 13 道 Prompt 工程与 Skill 系统面试题，覆盖 system prompt 分层、KV Cache 优化、Skill 加载、SkillContextBuffer 容量控制和提示词最佳实践。
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

AI Agent 面试题系列第五弹，这次聊的是**Prompt 工程与 Skill 系统**。

前面四弹我们把 Agent 核心循环、工具安全、上下文管理、多模型适配都过了一遍。但你有没有想过一个问题——同样的工具集、同样的模型，为什么有些 Agent 做出来像专家，有些像实习生？差距就在 **prompt** 上。

Prompt 是 Agent 的灵魂。写得好，Agent 知道什么时候该用什么工具、碰到异常该怎么处理；写得烂，Agent 就跟无头苍蝇一样瞎转。

而 **Skill** 是把 prompt 工程化的手段——从“一坨几千字的 system prompt”进化成“按场景按需加载的专家手册”。这个设计直接影响 token 消耗和 Agent 行为质量。

本弹对应 PaiCLI 第 15 期（Skill 系统）和第 19 期（Prompt 分层架构）的源码实现，13 道题，直接开整。

【此处插入 截图目标：PaiCLI 的 system prompt 分层和 Skill 系统的整体架构关系图；关键词：PromptAssembler、SkillRegistry、SkillContextBuffer；建议位置：全文开头，概览图】

## 01、Agent 的 system prompt 一般包含哪些内容？

一个生产级 Agent 的 system prompt，跟你随手写的 “你是一个 AI 助手” 完全是两码事。

PaiCLI 的 system prompt 包含这些核心模块：

**第一，角色定义。** 你是谁、你能做什么。PaiCLI 的 base.md 第一段就明确了：“你是一个 Java Agent CLI，能读写文件、执行命令、管理项目。”——开门见山，不废话。

**第二，行为规范。** 输出格式、语言、语调。比如 PaiCLI 用 `## Language` section 强制 LLM 的 `reasoning_content` 语言跟随设置，这一节缺了直接报错。

**第三，工具使用指导。** 不是一句“合理使用工具”就完事的。得写具体：读文件用 `read_file`，不要用 `execute_command cat`。这种指导越具体，LLM 犯蠢的概率越低。

**第四，安全约束。** 哪些操作不能做、哪些需要确认。跟第三弹讲的 HITL 审批配套。

**第五，上下文信息。** 项目目录、当前模型、可用工具列表、记忆上下文。

**第六，模式指令。** ReAct 模式的推理流程、Plan 模式的规划要求、Multi-Agent 模式的角色分工。

问题来了——随着功能迭代，这些内容会越来越多。PaiCLI 到第 16 期时，system prompt 已经膨胀到几千字，全部硬编码在 Java 里，改一句话要重新编译。这就是为什么要做 Prompt 分层架构。

【此处插入 截图目标：PaiCLI 的 base.md 文件内容片段，展示角色定义和工具指导部分；关键词：base.md、角色定义、工具指导；建议位置：IDE 编辑器截图】

## 02、Prompt 分层架构是怎么设计的？

### PromptAssembler 的职责

PaiCLI 第 19 期做了一件事：把 system prompt 从 Java 硬编码**拆成 Markdown 文件**，按职责分层存放。

先看目录结构：

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

再看 `PromptAssembler.java` 的核心组装逻辑：

```java
public String assemble(PromptMode mode, PromptContext context) {
    String base = repository.loadRequired("base.md");
    validateLanguageSection(base, "base.md");

    StringBuilder prompt = new StringBuilder();
    append(prompt, base);
    append(prompt, repository.loadRequired("personalities/calm.md"));
    append(prompt, applyVariables(repository.loadRequired(mode.resourcePath()), ctx));
    append(prompt, repository.loadRequired("approvals/" + approvalMode(ctx) + ".md"));
    append(prompt, dynamicSection("Project Context", ctx.memoryContext(), ctx.externalContext()));
    append(prompt, dynamicSection("Skills", ctx.skillIndex()));
    append(prompt, repository.loadRequired("context/context-management.md"));
    append(prompt, repository.loadRequired("handoff.md"));

    String assembled = prompt.toString().trim();
    validateLanguageSection(assembled, "assembled prompt");
    return assembled;
}
```

组装顺序固定：

```
base → personality → mode → approval → project_context → skills → context_mgmt → handoff
```

### 这么拆有什么好处

说人话就三点：

1. **改 prompt 不用改 Java 代码**——改 Markdown 文件就行，不用重新编译。
2. **不同模式共享公共层**——base、personality、approval 所有模式复用，只替换 mode 层。
3. **每一层职责清晰**——出了问题定位到具体哪个 .md 文件，不用在一堆字符串里大海捞针。

注意 `validateLanguageSection` 方法——组装完成后会校验最终 prompt 必须包含 `## Language` section。少了这个 section，LLM 的推理语言就可能跑偏，所以用 `IllegalStateException` 硬卡。

【此处插入 截图目标：PromptAssembler.java 的 assemble 方法完整代码；关键词：PromptAssembler、assemble、validateLanguageSection；建议位置：IDE 代码截图】

## 03、为什么组装顺序是“稳定在前、动态在后”？

这道题看着简单，但背后藏着一个很实际的优化：**KV Cache**。

### KV Cache 是什么

LLM 推理时，每个 token 会计算出一对 Key-Value（KV），缓存起来。如果连续两次请求的 prompt 前缀完全相同，服务端可以**复用上次的 KV Cache**，跳过重复计算。

这意味着什么？前缀越稳定，cache 命中率越高，推理越快、成本越低。

### PaiCLI 的排列策略

PaiCLI 的组装顺序严格遵循 **“volatile content last”** 原则：

- `base.md`（几乎不变）—— 高 cache 命中率
- `personality`（不变）—— 继续命中
- `mode`（按模式切，但同模式内不变）—— 大部分时候命中
- `project_context`（偶尔变）—— 开始不命中
- `skills`（按需加载，经常变）—— 不命中
- `handoff`（每轮不同）—— 不命中

这样前面 60-70% 的 prompt 能持续命中 cache，只有后面 30-40% 需要重新计算。

如果你把 skills 或 handoff 这种动态内容放到前面去，整个 cache 就废了——哪怕 base.md 一个字没改，也得从头算。这不是理论上的问题，是真金白银的 token 费用。

【此处插入 截图目标：KV Cache 命中示意图，展示稳定前缀命中 cache、动态后缀重算的对比；关键词：KV Cache、volatile content last、cache 命中率；建议位置：白板/示意图】

## 04、用户怎么覆盖内置 prompt？

### 三层覆盖机制

PaiCLI 支持三层覆盖，优先级从低到高：

1. **jar 内置**（最低优先级）：`src/main/resources/prompts/`
2. **用户级**：`~/.paicli/prompts/`
3. **项目级**（最高优先级）：`<project>/.paicli/prompts/`

看 `PromptRepository.java` 的加载逻辑：

```java
public String loadRequired(String relativePath) {
    String normalized = normalize(relativePath);
    String content = loadBuiltin(normalized);           // 第一层：jar 内置
    content = overrideIfPresent(userPromptsDir, normalized, content);    // 第二层：用户级覆盖
    content = overrideIfPresent(projectPromptsDir, normalized, content); // 第三层：项目级覆盖
    if (content == null || content.isBlank()) {
        throw new IllegalStateException("Prompt resource missing: " + normalized);
    }
    return content.trim();
}
```

三行代码，逻辑清晰得像教科书——先加载内置，然后依次尝试用户级和项目级覆盖，后者直接替换前者。

### 覆盖粒度的取舍

覆盖粒度是**整文件替换**。比如你创建 `~/.paicli/prompts/modes/agent.md`，就会完全替换内置的 `agent.md`。

这个设计有取舍：

- **优点**：简单直观，用户完全控制，不用学什么 patch 语法
- **缺点**：不支持部分修改（比如只想在 agent.md 末尾加一段），必须复制整个文件再改

另外注意 `normalize` 方法里的安全校验——路径不能以 `/` 开头，不能包含 `..`，防止路径穿越攻击。这和第三弹讲的路径围栏是同一个安全思路。

【此处插入 截图目标：PromptRepository.java 的 loadRequired 和 overrideIfPresent 方法；关键词：PromptRepository、三层覆盖、overrideIfPresent；建议位置：IDE 代码截图】

## 05、什么是 Skill？它和 Tool 有什么区别？

这道题是 Skill 系统的入口题，面试官想看你对 Agent 架构的理解深度。

**Tool** 是给 Agent 的“手”——一个可执行的函数，输入参数，返回结果。比如 `read_file`、`execute_command`、`web_fetch`。

**Skill** 是给 Agent 的“专家手册”——一份按场景组织的知识和决策指引。它不是代码，是 **Markdown 文档**。

| 维度 | Tool | Skill |
|---|---|---|
| 形式 | 代码函数 | Markdown 文档 |
| 触发 | LLM 通过 tool_calls 调用 | LLM 通过 `load_skill` 工具加载 |
| 内容 | 执行逻辑 | 决策手册 + 最佳实践 + 经验数据 |
| 注入位置 | tools 字段 | user message 前置 |

看 PaiCLI 的 `Skill.java` 定义：

```java
public record Skill(
        String name,
        String description,
        String version,
        String author,
        List<String> tags,
        Source source,
        String body,          // SKILL.md 正文——真正注入给 LLM 的内容
        Path skillMdPath,
        Path referencesDir    // 参考资料目录
) {
    public enum Source {
        BUILTIN, USER, PROJECT
    }
}
```

举个具体例子：`web_fetch` 是 Tool（抓取网页的函数），`web-access` 是 Skill（告诉 Agent 什么时候用 web_fetch、什么时候用浏览器 MCP、各个站点的反爬经验）。

Skill 的设计意图是：**当工具堆成山时，用 Skill 给 LLM 一份按场景展开的“专家手册”，比往 system prompt 里塞更多规则更可扩展。**

【此处插入 截图目标：Tool 和 Skill 的对比示意图，突出形式和注入位置的差异；关键词：Tool、Skill、tool_calls、load_skill；建议位置：白板/对比图】

## 06、Skill 的延迟加载机制是怎么工作的？

### 为什么不把所有 Skill 塞进 system prompt

假设你有 20 个 Skill，每个完整手册 2000-3000 token，全塞进去就是 40k-60k token。绝大部分场景下用户只需要 1-2 个 Skill，剩下的全是浪费。

所以 PaiCLI 的 Skill 加载是**延迟加载（Lazy Loading）**的。

### 五步流程

1. **启动时**：`SkillIndexFormatter` 只把所有启用 Skill 的 `name + description` 渲染成索引段，注入 system prompt 末尾。整个索引控制在 4KB 以内。

```java
public static String format(List<Skill> enabled) {
    StringBuilder sb = new StringBuilder();
    sb.append("## 可用 Skills（按需调用 load_skill 加载完整指引）\n\n");
    for (Skill skill : effective) {
        String desc = truncateByCodepoint(skill.description().trim(), MAX_DESCRIPTION_CODEPOINTS);
        sb.append("- **").append(skill.name()).append("**：").append(desc).append('\n');
    }
    // ...
}
```

2. **运行时**：LLM 看到用户输入匹配某个 Skill 的 description，主动调用 `load_skill(name)` 工具。
3. **注入**：`load_skill` 把 Skill 的 `body`（即 SKILL.md 正文）写入 `SkillContextBuffer`。
4. **下一轮**：`SkillContextBuffer.drain()` 把内容拼成 Markdown 段，前置注入到下一轮 user message 前面。
5. **消费后清除**：`drain()` 是一次性消费——取出后自动清空，不会跨轮重复注入。

这个设计的本质是**用一个轻量索引换来的按需加载**——启动时只花 4KB 告诉 LLM “你有哪些 Skill 可以用”，LLM 自己判断要不要加载。

【此处插入 截图目标：Skill 延迟加载的时序图，展示启动注入索引 → LLM 调 load_skill → buffer push → drain 注入的完整流程；关键词：SkillIndexFormatter、load_skill、SkillContextBuffer、drain；建议位置：白板/时序图】

## 07、SkillContextBuffer 的容量控制怎么做的？

这道题考的是工程细节——Skill 加载了就要占 token，不加控制 buffer 会无限膨胀。

看 `SkillContextBuffer.java` 的核心实现：

```java
public final class SkillContextBuffer {
    private static final int MAX_SKILLS = 3;
    private final Map<String, String> entries = new LinkedHashMap<>();

    public synchronized void push(String skillName, String body) {
        if (skillName == null || skillName.isBlank() || body == null) {
            return;
        }
        entries.remove(skillName);       // 先删旧的（如果有）
        entries.put(skillName, body);    // 再加到末尾
        while (entries.size() > MAX_SKILLS) {
            String oldest = entries.keySet().iterator().next();
            entries.remove(oldest);      // LRU 淘汰最旧的
        }
    }
}
```

三个关键设计点：

**第一，最多保留 3 个 Skill body。** `MAX_SKILLS = 3` 是硬上限。超出后按 LRU（Least Recently Used）策略淘汰最旧的。用 `LinkedHashMap` 的插入顺序来实现 LRU——`iterator().next()` 取的就是最早插入的那个。

**第二，同名 Skill 重复 push 不会产生重复。** 先 `remove` 再 `put`，既避免了重复，又把它刷新到末尾（变成最新的），不会被误淘汰。

**第三，drain 是一次性消费。** 取出所有内容后立即 `entries.clear()`。这防止了跨轮重复注入——上一轮已经给 LLM 看过的 Skill，不需要下一轮再塞一次。

另外注意 `synchronized` 关键字——因为 PaiCLI 的异步工具调用可能在不同线程触发 `load_skill`，buffer 必须线程安全。

还有一个细节：三个 SubAgent 角色（Planner / Worker / Reviewer）加上主 Agent，各持一个独立的 `SkillContextBuffer` 实例，不共享 buffer，避免角色间的提示词污染。

【此处插入 截图目标：SkillContextBuffer.java 的完整源码；关键词：MAX_SKILLS、LinkedHashMap、LRU、drain、synchronized；建议位置：IDE 代码截图】

## 08、web-access Skill 具体包含什么内容？

web-access 是 PaiCLI 的首个内置 Skill，也是最能体现 Skill 设计理念的例子。

看 `SkillBuiltinExtractor.java` 里的文件清单：

```java
private static final List<BuiltinSkillSpec> BUILTIN_SKILLS = List.of(
    new BuiltinSkillSpec("web-access", List.of(
        "SKILL.md",
        "references/cdp-cheatsheet.md",
        "references/site-patterns/github.com.md",
        "references/site-patterns/juejin.cn.md",
        "references/site-patterns/mp.weixin.qq.com.md",
        "references/site-patterns/x.com.md",
        "references/site-patterns/xiaohongshu.com.md",
        "references/site-patterns/zhuanlan.zhihu.com.md"
    ))
);
```

**SKILL.md 的核心内容**包含四块：

1. **浏览哲学四步法**：先判断是否需要联网 -> 选择工具 -> 执行 -> 验证结果。不是上来就联网，先判断本地知识能不能搞定。
2. **工具选择表**：`web_fetch` vs 浏览器 MCP 的决策矩阵。静态页面用 web_fetch，动态渲染页面用浏览器。
3. **浏览器优先级**：`take_snapshot`（DOM 文本）优先于 `take_screenshot`（截图），因为文本更省 token、更容易被 LLM 理解。
4. **Jina 兜底**：web_fetch 和浏览器都失败时，通过 `execute_command` 调用 `r.jina.ai` 做兜底抓取。

**references 目录**是按站点积累的经验——微信公众号的文章链接格式和反爬特征、知乎专栏的页面结构、GitHub 不同页面（issue / PR / code）的 DOM 差异、小红书的动态加载特点。

这些经验不是一次写完的，是**在实际使用中踩坑后逐步沉淀**的。这就是 Skill 的价值：经验可以积累、可以复用。

【此处插入 截图目标：web-access Skill 的目录结构和 SKILL.md 文件片段；关键词：web-access、SKILL.md、references、site-patterns；建议位置：文件树 + 文件内容截图】

## 09、Skill 的三层覆盖是怎么工作的？

跟 Prompt 的三层覆盖是同一个思路：

```
jar 内置 < 用户级 ~/.paicli/skills/ < 项目级 <project>/.paicli/skills/
```

看 `SkillRegistry.java` 的 `reload` 方法：

```java
public synchronized void reload() {
    skillsByName.clear();
    warnings.clear();
    loadDirectory(builtinCacheRoot, Skill.Source.BUILTIN);   // 第一层
    loadDirectory(userSkillsDir, Skill.Source.USER);          // 第二层覆盖第一层
    loadDirectory(projectSkillsDir, Skill.Source.PROJECT);    // 第三层覆盖前两层
}
```

覆盖规则是**按 name 整体替换**——`skillsByName` 是一个 `LinkedHashMap`，后加载的同名 Skill 直接 `put` 覆盖前面的。

这意味着不同项目可以有不同的 Skill 配置。前端项目的 web-access Skill 可以在 references 里加上 Webpack DevServer 的经验，后端项目可以加上 Swagger 页面的经验。

### SkillBuiltinExtractor 的缓存策略

启动时 `SkillBuiltinExtractor` 会把 jar 内置的 Skill 解压到 `~/.paicli/skills-cache/`。用 `.version` 文件控制是否需要重建：

```java
Path versionFile = skillDir.resolve(".version");
if (Files.exists(versionFile)) {
    String existing = Files.readString(versionFile).trim();
    if (CURRENT_VERSION.equals(existing)) {
        return; // 版本一致，跳过解压
    }
}
```

版本不一致时，**先删再重建**——`deleteRecursive` 清掉整个目录，然后从 jar 里重新解压。简单粗暴但可靠。

【此处插入 截图目标：SkillRegistry.java 的 reload 方法和三层加载逻辑；关键词：SkillRegistry、reload、BUILTIN、USER、PROJECT；建议位置：IDE 代码截图】

## 10、怎么写一个好的 Agent system prompt？

这道题面试官经常问，看你有没有实战经验。说空话谁都会，关键是有没有踩过坑。

从 PaiCLI 第 19 期的实践总结六条：

**第一，角色定义要清晰。** 第一段就说清楚你是谁、能做什么、不能做什么。别让 LLM 自己去猜。PaiCLI 的 base.md 开头就是角色声明，不搞虚的。

**第二，工具指导要具体到场景。** 不要写“合理使用工具”，要写“读取文件用 read_file，不要用 execute_command cat”。PaiCLI 早期就因为描述太模糊，LLM 经常用 cat 代替 read_file 读文件。

**第三，有选择关系的工具用决策表。** web-access Skill 里的工具选择表就是典型——什么页面用 web_fetch、什么页面用浏览器 MCP，一目了然。

**第四，正面示例和负面示例配对。**

```
错误：直接用 rm 删除文件
正确：先用 read_file 确认内容，再用 write_file 修改
```

LLM 看过负面示例后，犯同类错误的概率明显下降。

**第五，规则优先级要明确。** 规则之间有冲突时，哪个优先。比如“安全优先于效率”、“路径围栏规则优先于用户自定义 prompt”。

**第六，不要太长。** system prompt 越长，LLM 越容易忽略中间部分（Lost in the Middle 问题）。2000-4000 token 是比较合理的范围。PaiCLI 的分层设计就是为了在不膨胀 system prompt 的前提下扩展能力。

【此处插入 截图目标：PaiCLI 的 prompt 审计模板或 base.md 中的工具指导片段；关键词：工具指导、决策表、正负示例；建议位置：文档/代码截图】

## 11、Prompt 改了怎么验证效果？

### 有没有评估方法

这道题的坑在于——大多数团队做不到系统化评估，但面试时你不能说“我们改完跑几个 case 看看就行了”。要展示你知道正确的做法，也知道现实的妥协。

PaiCLI 提供了 `docs/prompt-analysis-template.md` 作为 Prompt 质量审计模板。每次改 prompt 都应该做 Gap 分析：

1. **现状描述**：当前 prompt 在什么场景下表现不好？
2. **改动内容**：具体改了什么、为什么改？
3. **预期效果**：改完之后期望 LLM 在什么场景下行为不同？
4. **回归验证**：改完后原来正常的场景是否仍然正常？

### 系统化的评估方法

- **A/B 测试**：准备一组固定的测试用例，分别用旧 prompt 和新 prompt 跑，对比 LLM 输出
- **人工评分**：对每个测试用例的输出打分（准确性、完整性、安全性）
- **自动化指标**：工具调用准确率、任务完成率、平均轮次数

PaiCLI 的做法是折中的——改 prompt 前写清楚目标场景和预期行为，改完后用这些场景做回归验证。没有搞复杂的自动化评估管线，但每次改动都有记录、有验证。

关键是改 prompt 前有明确目标，改完后有验证动作。没有这两个动作的 prompt 修改就是在碰运气。

【此处插入 截图目标：prompt-analysis-template.md 的模板内容；关键词：Gap 分析、回归验证、A/B 测试；建议位置：文档截图】

## 12、Skill 和 RAG 有什么区别？

面试官爱问这道，因为形式上确实像——都是往 prompt 里注入额外内容。但本质区别很大。

| 维度 | RAG | Skill |
|---|---|---|
| 内容来源 | 用户的代码库/文档库 | 预编写的专家手册 |
| 检索方式 | 语义相似度（向量检索） | LLM 主动选择加载 |
| 内容性质 | 事实数据（代码、文档） | 决策指引（怎么做、最佳实践） |
| 更新频率 | 随代码变化自动更新 | 随经验积累手动更新 |
| 注入时机 | 每轮自动检索 | LLM 判断需要时按需加载 |

一句话总结：**RAG 提供“是什么”（事实），Skill 提供“怎么做”（方法论）**。

举个例子：用户说“帮我看看这个 Spring Boot 项目的配置问题”。RAG 检索出项目的 application.yml、pom.xml 等配置文件内容——这是事实。Skill 加载 web-access 或者未来可能有的 spring-boot Skill，告诉 Agent “Spring Boot 项目的配置优先级是什么、常见的配置陷阱有哪些”——这是方法论。

Agent 理想的知识体系是两者结合：RAG 告诉 Agent “这个项目用了什么技术栈”，Skill 告诉 Agent “面对这种技术栈应该怎么操作”。

【此处插入 截图目标：RAG 和 Skill 的对比示意图，突出内容来源和注入时机的差异；关键词：RAG、Skill、事实 vs 方法论；建议位置：白板/对比图】

## 13、如果让你设计一个 Skill 体系，你会怎么做？

面试开放题，没有标准答案，但有加分的回答结构。直接参考 PaiCLI 的设计来组织你的答案：

**第一，Skill 结构标准化。** 每个 Skill 是一个目录，包含 `SKILL.md`（决策手册）+ `references/`（参考资料）+ 可选 `scripts/`（辅助脚本）。标准化意味着新 Skill 的编写成本低、加载逻辑统一。

**第二，延迟加载。** 启动时只加载索引（name + description），控制在 4KB 以内。运行时按需加载正文。PaiCLI 的 `SkillIndexFormatter` 就是这个思路——`MAX_INDEX_BYTES = 4096`。

**第三，三层覆盖。** 内置 < 用户级 < 项目级。让不同项目可以定制。PaiCLI 的 `SkillRegistry` 用三次 `loadDirectory` 实现，后者覆盖前者。

**第四，LLM 主动加载。** 不做关键词硬匹配，让 LLM 根据 description 自己判断要不要加载。LLM 的语义理解能力比正则匹配强得多——你写个正则能匹配“帮我看看这个网页”和“抓一下这个 URL”吗？LLM 能。

**第五，经验可积累。** references 目录按场景积累经验数据。Skill 的价值随使用时间增长——今天踩了微信公众号反爬的坑，把经验加到 `mp.weixin.qq.com.md` 里，以后所有使用这个 Skill 的场景都受益。

**第六，和工具联动。** Skill 不直接执行操作，但它指导 LLM 怎么选择和使用工具。Skill + Tool = 既有手又有脑。

**第七，容量控制。** `SkillContextBuffer` 用 `MAX_SKILLS = 3` 做硬上限，LRU 淘汰，`drain` 一次性消费。不控容量的话，token 消耗会随会话时间线性增长。

【此处插入 截图目标：Skill 体系的完整架构图，展示索引、延迟加载、三层覆盖、buffer 控制的全链路；关键词：SkillRegistry、SkillIndexFormatter、SkillContextBuffer、三层覆盖；建议位置：白板/架构图】

---

这 13 道题覆盖了 Prompt 工程和 Skill 系统的核心：分层架构、KV Cache 优化、三层覆盖、Skill 延迟加载、SkillContextBuffer 容量控制、web-access 实战、prompt 评估方法。

Prompt 和 Skill 是 Agent 从“能用”到“好用”的分水岭。工具决定了 Agent 能做什么，而 Prompt 和 Skill 决定了 Agent 做得好不好。

下一篇我们进入**产品化工程**——TUI 渲染、LSP 诊断注入、Git 快照回滚、Runtime API、图片输入，从代码走向产品。

---

## 简历包装

**项目名称**：PaiCLI -- AI Agent CLI

**项目简介**：基于 Java 的 AI Agent 命令行工具，对标 Claude Code，支持 Prompt 分层架构、Skill 延迟加载系统、多模型适配、MCP 协议和完整的 HITL 安全体系。

**技术栈**：Java 17、Maven、OpenAI-compatible API（GLM / DeepSeek / StepFun / Kimi）、Markdown Prompt Engine、Skill 延迟加载框架、KV Cache 优化

**核心职责**：

1. 设计并实现 Prompt 分层架构（`PromptAssembler` + `PromptRepository`），将 system prompt 从 Java 硬编码拆分为 Markdown 文件，支持 base/personality/mode/approval/context 五层组装，遵循“stable first, volatile last”原则优化 KV Cache 命中率
2. 实现 Prompt 三层覆盖机制（jar 内置 < 用户级 < 项目级），通过 `PromptRepository` 的 `overrideIfPresent` 链式加载，支持不同项目自定义 prompt 而无需修改源码
3. 设计并实现 Skill 延迟加载系统（`SkillRegistry` + `SkillIndexFormatter` + `SkillContextBuffer`），启动时仅注入 4KB 索引到 system prompt，运行时由 LLM 主动触发 `load_skill` 按需加载，单会话 token 消耗降低约 80%
4. 实现 `SkillContextBuffer` 容量控制——基于 `LinkedHashMap` 的 LRU 淘汰策略，最多 3 个 Skill body，drain 一次性消费防止跨轮重复注入，`synchronized` 保证多线程安全
5. 构建 web-access Skill 实战体系，包含浏览哲学四步法决策手册 + 6 个站点经验沉淀（微信公众号/知乎/GitHub/小红书/掘金/X），通过 `SkillBuiltinExtractor` 实现 jar 内置资源的版本化解压和缓存管理
