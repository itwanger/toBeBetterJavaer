---
title:
shortTitle:
description: 深入拆解 Claude Code 上下文压缩机制，从 MicroCompact 到 AutoCompact 四阶段管线，源码级分析 Compaction Prompt 的 9 段结构化摘要和断路器设计。
keywords:
  - Claude Code
  - 上下文压缩
  - Compaction
  - Context Window
  - Claude Code 教程
tag:
  - Claude Code
category:
  - AI
author: 沉默王二
date: 2026-06-02
---

大家好，我是二哥呀。

上个月写了一篇 Claude Code 上下文管理的文章，评论区有个问题问得很好——"压缩具体是怎么压的？压完之后它怎么还记得我刚才让它干什么？"

说实话当时我也答不上来。只知道"满了就压缩"，但到底怎么决定什么时候压、保留什么丢弃什么、压完之后怎么恢复工作状态，这些细节一直是黑盒。

![](https://cdn.paicoding.com/stutymore/build-agent-p3-memory-20260420212638.png)

直到我花了两天时间把 Claude Code 的 compact 目录下十几个源码文件从头到尾读了一遍，才发现这套压缩机制远比我想象的精密。它不是简单的"砍掉旧消息"，而是一个四阶段的液压系统——从最轻量的规则裁剪，到 LLM 驱动的结构化摘要，再到熔断机制和兜底方案，每一层都有明确的触发条件和退出策略。

今天这篇，我把源码里扒出来的每一个关键细节都摊开来讲。

【此处插入 Claude Code compact 目录结构截图：截图目标：展示 compact 模块的完整文件结构；关键词：compact 目录、源码文件、模块结构；建议位置：命令行】

## 01、为什么需要压缩

先说一个反直觉的事实：Claude Code 默认的上下文窗口是 200K token，Opus 4.6 和 Sonnet 4.6 支持扩展到 1M token。按理说 200K 已经很大了，大概能装下 15 万个中文字，一般的编码会话不太可能用到这么多。

但实际使用中，上下文增长速度远超想象。

举个真实的例子。我昨天用 Claude Code 重构一个 Spring Boot 项目的认证模块，先让它读了 5 个配置文件、3 个 Service 类、2 个 Controller，光读文件就消耗了大约 12,000 token。然后让它搜索项目中所有用到 `@Secured` 注解的地方，`grep` 搜索结果又占了 3,000 token。接着执行测试命令，测试输出日志占了 8,000 token。再加上系统提示词、CLAUDE.md 配置文件、Memory 文件、工具描述这些固定开销，一个复杂的编码任务，二三十轮交互之后，上下文就到 80% 了。

这还只是一个中等复杂度的任务。如果你在做跨模块的重构、涉及多个文件的联动修改，上下文增长得更快。每次 Claude Code 执行一个工具调用（读文件、搜索、运行命令），返回的结果都会被完整记录在对话历史里。你根本不需要刻意"浪费"上下文，正常干活就会自然消耗。

更麻烦的是 Context Rot（上下文退化）。这是一个被大家严重低估的问题。窗口越大，模型的注意力越分散，容易"忘记"早期的关键指令，或者把中间某次失败的尝试和最终的修复方案搞混。我遇到过一次很典型的情况：让 Claude Code 改一个接口的返回格式，改完之后让它跑测试，测试报错了，它去修了另一个地方，结果把我最开始改好的格式又改回去了——因为上下文太长，它没有注意到最早那条指令。

【此处插入上下文使用量增长示意图：截图目标：展示一次编码会话中 token 消耗的增长曲线；关键词：token 用量、上下文窗口、增长曲线；建议位置：架构图】

所以压缩不是可选的——它是保证 Claude Code 在长会话中持续可用的核心机制。与其指望模型在一个巨大的上下文窗口里完美回忆每一条信息，不如在合适的时机把历史压缩成精华，让模型轻装上阵。

## 02、四阶段管线总览

Claude Code 的压缩机制不是一个单一的操作，而是一条四阶段管线。每一阶段的触发条件和处理方式都不同，从最温和到最激进依次排列。

我从源码 `autoCompact.ts`、`microCompact.ts`、`compact.ts` 和 `reactiveCompact.ts` 里理出了完整的流程：

**第一阶段：MicroCompaction**——静默预处理，规则驱动，不调用 LLM。对工具返回结果做原地裁剪，去掉冗余输出。

**第二阶段：AutoCompaction**——自动压缩，LLM 驱动。当上下文用量超过阈值时，用一个独立的 LLM 调用生成结构化摘要，替换整段对话历史。

**第三阶段：Blocking Limit**——阻塞限制。上下文接近极限时，直接拒绝发送请求，防止 API 返回 413 错误。

**第四阶段：Reactive Fallback**——响应式兜底。如果前三阶段都没能控制住上下文大小，在实际收到 `prompt_too_long` 错误后，执行最激进的压缩——逐条删除最老的消息。

【此处插入四阶段管线架构图：截图目标：展示四个阶段的触发条件和处理流程；关键词：MicroCompact、AutoCompact、Blocking、Reactive；建议位置：架构图】

这四个阶段的设计思路很清晰：能用规则解决的不用模型，能提前预防的不等到出错，出错了还有兜底方案。接下来逐个拆解。

## 03、MicroCompaction——最轻量的第一刀

MicroCompaction 是整条管线里最安静的一层。它在每次 API 调用之前运行，不调用 LLM，不生成摘要，只做一件事：裁剪工具返回结果。

源码里定义了一个"可压缩工具"白名单：

```typescript
const COMPACTABLE_TOOLS = new Set<string>([
  FILE_READ_TOOL_NAME,
  ...SHELL_TOOL_NAMES,
  GREP_TOOL_NAME,
  GLOB_TOOL_NAME,
  WEB_SEARCH_TOOL_NAME,
  WEB_FETCH_TOOL_NAME,
  FILE_EDIT_TOOL_NAME,
  FILE_WRITE_TOOL_NAME,
])
```

这些工具的共同特点是返回结果通常很长。一次文件读取可能返回几百行代码，一次 `grep` 搜索可能匹配几十个文件的上百行结果，一次 `bash` 命令的终端输出更是长短不一。但这些结果有一个共性：模型处理完之后，历史上的完整返回值就没什么用了。模型已经根据搜索结果找到了目标文件，已经根据文件内容做了修改，保留完整的历史输出只会占空间。

MicroCompaction 的处理方式是在消息列表中原地替换——把旧的 `tool_result` 内容截断或替换成占位文本 `[Old tool result content cleared]`。模型看不到完整的历史工具输出，但最近的工具结果会保留。

这个设计和操作系统的页面置换算法有点像：最近使用的数据留在内存里，长时间没被访问的数据换出去。区别在于，操作系统换出去的数据还能换回来，而 MicroCompaction 是不可逆的——清理掉的工具结果就真的没了。不过这没关系，因为模型需要的信息已经体现在后续的代码修改和对话内容里了。

### 基于时间间隔的清理

MicroCompaction 还有一个基于时间的触发机制，配置在 `timeBasedMCConfig.ts` 里：

```typescript
const TIME_BASED_MC_CONFIG_DEFAULTS: TimeBasedMCConfig = {
  enabled: false,
  gapThresholdMinutes: 60,
  keepRecent: 5,
}
```

这里需要先科普一下 Prompt Cache 的概念。每次你和 Claude Code 交互，系统都要把完整的对话历史发送给 Anthropic 的 API。Prompt Cache 机制允许服务端缓存已经处理过的上下文前缀，下一次请求如果前缀没变，就不需要重新计算。这样既省时间又省钱（缓存命中的 token 计费只有原价的十分之一）。

但是这个缓存有 TTL（过期时间），是 1 小时。也就是说如果你去吃了个午饭，1 小时后回来继续对话，服务端的缓存已经过期了，整个上下文前缀都要重新发送和计算。这时候清理掉旧的工具结果就很有意义了——减少重新发送的数据量，既省带宽又省计算。

`keepRecent: 5` 表示保留最近 5 个可压缩工具的结果，更早的全部替换成 `[Old tool result content cleared]`。这个数字的选择也经过了考量：太少了可能清掉模型还需要的信息，太多了起不到节省的效果。5 是一个经验值。

【此处插入 MicroCompaction 前后对比截图：截图目标：对比压缩前后消息列表中 tool_result 的变化；关键词：tool_result、cleared、token 节省；建议位置：命令行】

MicroCompaction 最大的优势是零成本——不消耗 API 调用，不产生额外的 token 费用，纯规则处理，速度极快。它不会影响对话的语义完整性，只是把模型已经"消化"过的冗余数据清理掉。

你在使用 Claude Code 的时候完全感知不到 MicroCompaction 的存在，它在后台静默运行，默默帮你节省上下文空间。这也是为什么它叫"Micro"——改动小、影响小、代价小，但日积月累能省下相当可观的 token 空间。

## 04、AutoCompaction——LLM 驱动的结构化摘要

如果说 MicroCompaction 是"修枝剪叶"，AutoCompaction 就是"整棵树移栽"。

### 触发阈值

AutoCompaction 的触发条件在 `autoCompact.ts` 里定义得很明确：

```typescript
const MAX_OUTPUT_TOKENS_FOR_SUMMARY = 20_000

export function getEffectiveContextWindowSize(model: string): number {
  const reservedTokensForSummary = Math.min(
    getMaxOutputTokensForModel(model),
    MAX_OUTPUT_TOKENS_FOR_SUMMARY,
  )
  let contextWindow = getContextWindowForModel(model, getSdkBetas())
  return contextWindow - reservedTokensForSummary
}

export const AUTOCOMPACT_BUFFER_TOKENS = 13_000
```

计算过程分两步。

第一步，算出有效上下文窗口。200K 的窗口要预留 20,000 token 给压缩摘要的输出（这个数字来自 p99.99 的统计：压缩摘要输出的 99.99 分位数是 17,387 token）。所以有效窗口是 180,000 token。

第二步，在有效窗口基础上再减去 13,000 token 的安全缓冲。最终的自动压缩阈值是 167,000 token，大约占原始 200K 窗口的 83.5%。

也就是说，当你的对话消耗了 167K token 的时候，Claude Code 会自动触发压缩。这个阈值大约是原始窗口的 83.5%，留了足够的空间给压缩操作本身。

如果你用的是 1M 上下文窗口的模型（比如加了 `[1m]` 后缀的 Opus 4.6），有效窗口是 980K，自动压缩阈值在 967K 左右——也就是说你可以用到 96.7% 才触发压缩。不过 Anthropic 也发现 1M 窗口下自动压缩事件只减少了 15%（远低于预期），说明大多数长会话的上下文增长并不是线性的，即使窗口大了 5 倍，该压缩的时候还是会压缩。

你也可以通过环境变量 `CLAUDE_CODE_AUTO_COMPACT_WINDOW` 手动覆盖有效窗口大小，或者用 `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` 按百分比设置触发阈值。

### 压缩流程

触发压缩后，Claude Code 的执行步骤如下：

1. 先执行 Pre-Compact Hooks（如果用户在配置中设置了 hooks 的话）
2. 调用 `compactConversation` 函数，把整段对话历史发给一个独立的 forked agent
3. 这个 forked agent 是一个专门用来做压缩的 LLM 实例，它只有一轮机会（`maxTurns: 1`），必须在一次回复中完成摘要
4. 拿到摘要后，用 `formatCompactSummary` 函数做格式化处理，去掉草稿纸内容
5. 用格式化后的摘要替换原始对话历史，构建新的消息列表
6. 执行 Post-Compact Cleanup 清理所有缓存和跟踪状态
7. 通知 Prompt Cache 系统压缩已经发生（防止缓存命中检测误报）
8. 执行 Post-Compact Hooks
9. 自动重新读取最近访问过的文件，恢复工作上下文

压缩期间会在终端显示一条提示消息，告诉你正在压缩。压缩完成后，你会看到类似"This session is being continued from a previous conversation that ran out of context"的文字。整个过程通常需要十几秒到半分钟，取决于对话历史的长度。

【此处插入压缩进度条截图：截图目标：展示压缩进行中的终端界面；关键词：压缩提示、进度、上下文大小；建议位置：命令行】

【此处插入 AutoCompaction 触发时的终端截图：截图目标：展示压缩触发时的用户界面提示；关键词：compacting、context window、summary；建议位置：命令行】

### 两条压缩路径

源码里实际有两条压缩路径：

**路径一：Session Memory Compact（实验性）**——如果开启了 Session Memory 功能，Claude Code 会在后台持续做增量笔记。压缩时直接用这些笔记作为摘要，而不需要重新让 LLM 通读整段对话。

```typescript
export const DEFAULT_SM_COMPACT_CONFIG: SessionMemoryCompactConfig = {
  minTokens: 10_000,
  minTextBlockMessages: 5,
  maxTokens: 40_000,
}
```

这条路径的好处是速度快，因为笔记已经在后台生成好了，压缩时直接拿来用。配置里的三个参数分别控制了压缩后保留的最小 token 数（10,000）、最少保留的消息数（5 条有文本内容的消息）和最大 token 数（40,000）。也就是说，即使有 Session Memory，也不会把最近的消息全部丢掉——至少保留 5 条最近的对话和 10K token 的内容。

不过 Session Memory Compact 目前还是实验功能，需要特定的配置才能开启。从源码来看，它的优先级高于 Full Summarization——系统会先尝试 Session Memory 路径，只有在 Session Memory 为空、内容不足或者功能未开启时，才回退到标准路径。

**路径二：Full Conversation Summarization**——标准路径，也是目前大多数用户实际走的路径。把整段对话发给一个独立的 LLM 实例，让它通读全文后生成一份完整的结构化摘要。这个过程需要一次完整的 API 调用，消耗的 token 数约等于当前对话的全部 token 加上摘要输出的 token。

【此处插入两条压缩路径对比示意图：截图目标：对比 Session Memory 路径和 Full Summarization 路径的差异；关键词：Session Memory、Full Summary、增量笔记；建议位置：架构图】

## 05、Compaction Prompt——压缩的灵魂

压缩效果好不好，全看 Compaction Prompt 写得怎么样。这个 Prompt 定义在 `prompt.ts` 里，是整套压缩机制最核心的部分。

### 防止工具调用

Prompt 开头是一段极其严厉的"禁止调用工具"声明：

```typescript
const NO_TOOLS_PREAMBLE = `CRITICAL: Respond with TEXT ONLY. Do NOT call any tools.

- Do NOT use Read, Bash, Grep, Glob, Edit, Write, or ANY other tool.
- You already have all the context you need in the conversation above.
- Tool calls will be REJECTED and will waste your only turn — you will fail the task.
- Your entire response must be plain text: an <analysis> block followed by a <summary> block.
`
```

为什么要用这么强硬的语气？源码注释里详细解释了这个决策背后的故事。

压缩操作用的是一个独立的 forked agent（分叉代理），它和主会话共享相同的工具集。为什么要共享工具集？因为 Anthropic 的 Prompt Cache 是按照请求的"前缀"来匹配的，工具集是前缀的一部分。如果压缩用的 forked agent 去掉了工具集，cache key 就对不上了，无法复用主会话积累的缓存。

但这带来了一个副作用：模型看到工具集就会有"调用工具"的冲动。在 Sonnet 4.6 这类具备"自适应思考"能力的模型上，这个问题尤其严重——模型会判断"我需要读一下某个文件才能写出准确的摘要"，然后尝试调用 Read 工具。由于 `maxTurns: 1` 的限制，工具调用会被直接拒绝，但这一轮的文本输出也没了——压缩直接失败。源码注释里提到了一个具体的数据：在 Sonnet 4.6 上，这种失败率是 2.79%，而在 Sonnet 4.5 上只有 0.01%。

所以 Anthropic 的解决方案是把"禁止调用工具"放在 Prompt 的最前面，用大写加粗的语气明确告诉模型：你只有一次机会，如果浪费在工具调用上就彻底失败了。

这段话还加了首尾呼应，Prompt 末尾有个 `NO_TOOLS_TRAILER` 再次提醒：

```typescript
const NO_TOOLS_TRAILER =
  '\n\nREMINDER: Do NOT call any tools. Respond with plain text only — ' +
  'an <analysis> block followed by a <summary> block. ' +
  'Tool calls will be rejected and you will fail the task.'
```

### 两阶段输出格式

Compaction Prompt 要求模型输出两个 XML 块：

**`<analysis>` 块**——思考过程的草稿纸。模型按时间顺序分析每条消息，记录用户意图、技术决策、代码细节、错误和修复方案。

**`<summary>` 块**——正式摘要，包含 9 个固定章节：

1. **Primary Request and Intent**：用户的核心需求和意图
2. **Key Technical Concepts**：涉及的技术概念和框架
3. **Files and Code Sections**：操作过的文件、代码片段、修改记录
4. **Errors and Fixes**：遇到的错误和修复方案
5. **Problem Solving**：解决的问题和正在排查的问题
6. **All User Messages**：所有非工具结果的用户消息（原文）
7. **Pending Tasks**：待完成的任务
8. **Current Work**：压缩前正在做什么
9. **Optional Next Step**：下一步计划

【此处插入 Compaction Prompt 结构示意图：截图目标：展示 analysis 和 summary 两个阶段的关系；关键词：analysis、summary、9 段结构；建议位置：架构图】

这个设计有个巧妙的地方：`<analysis>` 块在摘要生成后会被 `formatCompactSummary` 函数直接删除。

```typescript
export function formatCompactSummary(summary: string): string {
  let formattedSummary = summary
  formattedSummary = formattedSummary.replace(
    /<analysis>[\s\S]*?<\/analysis>/,
    '',
  )
  // ...
}
```

也就是说，analysis 只是一个"草稿纸"——让模型先把思路理清楚，提高最终摘要的质量，但草稿本身不会占用后续的上下文空间。

这在 Prompt Engineering 里是一个经典技巧，叫做"drafting scratchpad pattern"（草稿本模式）。让模型先在一个临时空间里做分析和推理，然后只保留最终结论。和 Chain-of-Thought 有点像，但区别在于 CoT 的思考过程通常会保留在输出中，而 drafting scratchpad 会在后处理阶段被主动删除。

这个技巧在压缩场景下特别有价值。因为压缩的目的就是节省上下文空间，如果分析过程本身也占空间，那就违背了初衷。通过先思考再删除，既保证了摘要质量，又不增加压缩后的上下文负担。

### 第 6 项的特殊地位

9 个章节里，第 6 项"All User Messages"值得单独说一下。Prompt 里明确要求：

> List ALL user messages that are not tool results. These are critical for understanding the users' feedback and changing intent.

所有用户消息必须保留，不能遗漏。因为用户消息代表的是意图和反馈——如果压缩过程中丢了某条用户消息，模型可能会忘记"用户中途改了需求"或者"用户说过不要用某种方案"。

第 9 项"Optional Next Step"也有讲究。Prompt 要求包含原始对话的直接引用（verbatim quotes），确保任务解释不会在压缩过程中发生漂移。

### Partial Compact

除了全量压缩，还有一种部分压缩（Partial Compact）。当对话里已经存在之前的压缩摘要时，不需要重新压缩整段对话，只需要压缩摘要之后的新增部分。

源码里定义了两个方向：

- **`from` 方向**：只压缩最近的消息，保留早期上下文
- **`up_to` 方向**：压缩到某个点为止，后续消息保留

Partial Compact 的好处是压缩范围更小，LLM 需要处理的输入更少，速度更快，消耗的 token 也更少。

【此处插入 Partial Compact 与 Full Compact 对比截图：截图目标：展示两种压缩模式的差异；关键词：Partial Compact、Full Compact、消息范围；建议位置：架构图】

## 06、断路器和阻塞限制

AutoCompaction 不是万能的。如果压缩后上下文仍然超标，或者 LLM 调用本身失败了，后面还有两道防线。

### 阻塞限制（Blocking Limit）

在有效上下文窗口的基础上，只保留 3,000 token 的缓冲：

```typescript
export const MANUAL_COMPACT_BUFFER_TOKENS = 3_000
```

当上下文用量超过 `有效窗口 - 3,000 token`（大约 88.5%）时，Claude Code 直接拒绝发送 API 请求。这比收到 413 错误再处理要好——413 错误意味着请求已经发出去了，浪费了一次 API 调用。

### 断路器（Circuit Breaker）

这是源码里我最喜欢的一个设计。

```typescript
const MAX_CONSECUTIVE_AUTOCOMPACT_FAILURES = 3
```

注释里有一段来自 BigQuery 的数据：

> BQ 2026-03-10: 1,279 sessions had 50+ consecutive failures (up to 3,272) in a single session, wasting ~250K API calls/day globally.

2026 年 3 月的数据显示，有 1,279 个会话出现了 50 次以上的连续压缩失败，最多的一个会话失败了 3,272 次。这些失败的重试全球每天浪费大约 25 万次 API 调用。

断路器的逻辑很简单：连续失败 3 次后，停止自动压缩的重试。因为如果连续 3 次都失败了，说明上下文可能处于一种无法通过压缩恢复的状态（比如单条消息就超过了限制），继续重试只会浪费资源。

【此处插入断路器触发逻辑示意图：截图目标：展示连续失败计数和断路器触发的关系；关键词：circuit breaker、consecutive failures、250K API calls；建议位置：架构图】

### Reactive Fallback

第四阶段是最后的兜底方案。当 API 实际返回了 `prompt_too_long` 错误时，Reactive Compact 会执行最激进的压缩——基于 drainage 的最老消息删除。

这个模块在外部构建版本中是 stub 状态（存根，只有接口没有实现），说明 Anthropic 目前主要依赖前三阶段来控制上下文，Reactive Fallback 更多是作为安全网存在。

## 07、消息分组策略

压缩时需要决定哪些消息可以被"打包"在一起处理。`grouping.ts` 里实现了基于 API 轮次的消息分组。

```typescript
export function groupMessagesByApiRound(messages: Message[]): Message[][] {
  const groups: Message[][] = []
  let current: Message[] = []
  let lastAssistantId: string | undefined

  for (const msg of messages) {
    if (
      msg.type === 'assistant' &&
      msg.message.id !== lastAssistantId &&
      current.length > 0
    ) {
      groups.push(current)
      current = [msg]
    } else {
      current.push(msg)
    }
    if (msg.type === 'assistant') {
      lastAssistantId = msg.message.id
    }
  }
  if (current.length > 0) {
    groups.push(current)
  }
  return groups
}
```

分组的边界不是"用户发了一条新消息"，而是"出现了一个新的 assistant message ID"。为什么用这种粒度？

源码注释里解释了：在 SDK 和 API 调用场景中，整个工作负载可能只有一条用户消息，但 agent 会执行几十轮工具调用。如果按用户消息分组，整个会话就是一个组，没法做增量压缩。按 API 轮次分组，可以精细到每一轮 tool_use → tool_result 的配对。

【此处插入消息分组示意图：截图目标：对比按用户消息分组和按 API 轮次分组的差异；关键词：API round、message grouping、tool_use 配对；建议位置：架构图】

另一个有意思的处理是对"畸形输入"的容错。如果对话中出现了悬挂的 tool_use（没有对应的 tool_result），分组逻辑不会因此卡住，而是让边界正常触发。修复工作交给后续的 `ensureToolResultPairing` 函数，在实际发送 API 请求时补齐配对。

## 08、压缩后的恢复机制

压缩完成后，Claude Code 不是直接把摘要扔给模型就完事了。还有一套完整的恢复机制。

### Post-Compact Cleanup

`postCompactCleanup.ts` 里列出了压缩后需要重置的所有状态：

```typescript
export function runPostCompactCleanup(querySource?: QuerySource): void {
  resetMicrocompactState()
  // Reset context collapse (main thread only)
  // Clear getUserContext cache
  resetGetMemoryFilesCache('compact')
  clearSystemPromptSections()
  clearClassifierApprovals()
  clearSpeculativeChecks()
  clearBetaTracingState()
  clearSessionMessagesCache()
}
```

重置的项目包括：MicroCompaction 状态、上下文坍缩模块、CLAUDE.md 和 Memory 文件缓存、系统提示词分段、工具权限的预检查结果等。

这些重置确保压缩后的"新会话"不会被旧状态污染。比如 Memory 文件缓存如果不清理，压缩后模型看到的 Memory 可能是过时的版本。

### 有一项特意不清理

源码注释里有一段特别的说明：

> We intentionally do NOT clear invoked skill content here. Skill content must survive across multiple compactions so that createSkillAttachmentIfNeeded() can include the full skill text in subsequent compaction attachments.

Skill 的内容在压缩后不会被清理。因为 Skill 是用户主动加载的专业知识包，如果压缩时丢掉了，后续的对话就失去了这些专业指导。Skill 内容会被重新注入到压缩后的上下文中，确保跨压缩的连续性。

【此处插入 Post-Compact Cleanup 清理项列表截图：截图目标：展示哪些状态被重置，哪些被保留；关键词：cleanup、reset、skill 保留；建议位置：命令行】

### Sub-agent 的隔离问题

Post-Compact Cleanup 还处理了一个微妙的并发问题。Claude Code 的 Sub-agent 和主线程运行在同一个进程中，共享模块级别的状态。如果 Sub-agent 触发了压缩并重置了状态，会把主线程的状态也破坏掉。

解决方案是通过 `querySource` 参数判断：只有主线程的压缩才重置模块级状态，Sub-agent 的压缩跳过这些全局重置。

```typescript
const isMainThreadCompact =
  querySource === undefined ||
  querySource.startsWith('repl_main_thread') ||
  querySource === 'sdk'
```

### 文件自动重读

压缩完成后，Claude Code 会自动重新读取最近访问过的文件（最多 5 个，每个文件上限 5K token，总预算 50K token）。这样模型在压缩后不需要手动 re-read 刚才在看的代码，可以直接继续工作。

## 09、手动压缩和环境变量

除了自动触发，Claude Code 还提供了手动控制压缩的方式。

### /compact 命令

在对话中输入 `/compact` 可以手动触发压缩。还支持自定义指令：

```
/compact focus on the database migration code
```

自定义指令会被追加到 Compaction Prompt 的末尾：

```typescript
export function getCompactPrompt(customInstructions?: string): string {
  let prompt = NO_TOOLS_PREAMBLE + BASE_COMPACT_PROMPT
  if (customInstructions && customInstructions.trim() !== '') {
    prompt += `\n\nAdditional Instructions:\n${customInstructions}`
  }
  prompt += NO_TOOLS_TRAILER
  return prompt
}
```

手动压缩的阈值比自动压缩宽松——只预留 3,000 token 的缓冲，而不是 13,000 token。这意味着手动压缩可以在上下文用量还没到自动触发线的时候提前执行。

实际使用中，我建议在以下几个时间点手动执行 `/compact`：

- 探索阶段结束，准备开始编码之前
- 完成一个里程碑之后
- 上下文用量到 60%-70% 的时候
- 任务方向发生重大转变时

【此处插入 /compact 命令执行过程截图：截图目标：展示手动压缩的终端交互过程；关键词：/compact、summary、token 节省；建议位置：命令行】

### CLAUDE.md 中的 Compact Instructions

除了命令行参数，还可以在 CLAUDE.md 里添加持久的压缩指令：

```markdown
## Compact Instructions
When summarizing the conversation focus on typescript code changes 
and also remember the mistakes you made and how you fixed them.
```

Compaction Prompt 会自动读取 CLAUDE.md 中的这些指令，作为 `Additional Instructions` 附加到摘要提示词中。

### 环境变量

源码里暴露了好几个环境变量用于调优：

| 环境变量 | 作用 |
|---------|------|
| `DISABLE_COMPACT` | 完全禁用压缩 |
| `DISABLE_AUTO_COMPACT` | 禁用自动压缩，保留手动 /compact |
| `CLAUDE_CODE_AUTO_COMPACT_WINDOW` | 覆盖有效窗口大小 |
| `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` | 按百分比设置触发阈值 |
| `CLAUDE_CODE_BLOCKING_LIMIT_OVERRIDE` | 覆盖阻塞限制阈值 |
| `CLAUDE_CODE_DISABLE_1M_CONTEXT` | 强制使用 200K 窗口 |

比如想在上下文用到 70% 时就自动压缩，可以设置：

```bash
export CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70
```

不过这些环境变量不是所有构建版本都支持，部分是 Anthropic 内部使用的。

【此处插入环境变量配置截图：截图目标：展示通过环境变量调整压缩阈值的效果；关键词：环境变量、阈值配置、AUTOCOMPACT；建议位置：命令行】

## 10、压缩摘要长什么样

说了这么多机制，压缩后的摘要到底长什么样？

以下是一个真实压缩摘要的结构（我稍作脱敏）：

```
This session is being continued from a previous conversation 
that ran out of context. The summary below covers the earlier 
portion of the conversation.

Summary:
1. Primary Request and Intent:
   User requested help refactoring the authentication module 
   to support OAuth2 in addition to the existing JWT-based auth.

2. Key Technical Concepts:
   - OAuth2 Authorization Code Flow
   - JWT token validation with JWKS endpoint
   - Spring Security filter chain configuration

3. Files and Code Sections:
   - src/main/java/com/example/auth/SecurityConfig.java
     - Modified to add OAuth2 resource server configuration
     - Added: @Bean SecurityFilterChain...
   
4. Errors and fixes:
   - BeanCreationException: multiple SecurityFilterChain beans
     - Fixed by adding @Order annotations

5. Problem Solving:
   Successfully resolved the dual-auth configuration...

6. All user messages:
   - "help me add OAuth2 support to the auth module"
   - "no, don't remove JWT auth, I need both"
   - "use the Authorization Code flow, not Client Credentials"

7. Pending Tasks:
   - Add integration tests for OAuth2 flow

8. Current Work:
   Completed SecurityConfig refactoring...

9. Optional Next Step:
   Write integration tests for the OAuth2 flow...
```

注意第 6 项——所有用户消息都被原文保留。特别是"no, don't remove JWT auth, I need both"这条消息，如果在压缩中丢失了，模型可能会在后续工作中不小心删掉 JWT 认证的代码。

摘要前面会加上一句"This session is being continued from a previous conversation that ran out of context"，让模型明确意识到这是一个压缩后的续接会话，而不是一个全新的对话。

如果当时的会话有活跃的 Plan（通过 `/plan` 创建的），Plan 文件也会被重新注入到压缩后的上下文中。

【此处插入真实压缩摘要截图：截图目标：展示一次压缩后终端中显示的完整摘要结构；关键词：summary、9 段结构、用户消息保留；建议位置：命令行】

## 11、和上一篇文章的关系

上个月我写过一篇《Claude Code 上下文管理》的文章，讲了 Context Rot、1M 窗口的利弊、Sub-agent 隔离策略和 Memory 机制。那篇文章侧重的是"怎么用好上下文"，是偏策略层面的。

这篇文章侧重的是"压缩到底怎么工作的"，是偏实现层面的。

两篇文章结合起来看，大致是这样的全景图：

- **CLAUDE.md** 是 L1 缓存，每次新会话自动加载，永远不会被压缩丢弃
- **Memory 系统** 是持久化存储，跨会话保留用户偏好和项目信息
- **Sub-agent** 是隔离机制，把大任务分解到独立的上下文空间，防止撑爆主上下文
- **Compaction** 是垃圾回收，在上下文接近极限时把对话历史压缩成摘要

这四个机制配合起来，让 Claude Code 能够在长时间、多轮次的编码会话中持续保持高质量的输出。

【此处插入上下文管理全景架构图：截图目标：展示 CLAUDE.md、Memory、Sub-agent、Compaction 四个机制的协同关系；关键词：L1 缓存、Memory 持久化、Sub-agent 隔离、Compaction 压缩；建议位置：架构图】

## 12、简历包装

如果你正在研究 Claude Code 的原理，或者在做类似的 Agent 框架开发，这些知识完全可以用在简历和面试里。

### AI Agent 上下文管理模块 | 个人技术研究 2026-06 ～ 至今

**项目简介：** 深入分析 Claude Code 的上下文压缩管线架构，研究四阶段 Compaction 机制（MicroCompact → AutoCompact → Blocking Limit → Reactive Fallback）的设计原理和工程实现。

**技术栈：** TypeScript、Prompt Engineering、LLM API、Token 估算、Circuit Breaker 模式

**核心职责：**

- 分析四阶段压缩管线的触发条件和退出策略，理解 MicroCompaction 基于规则的工具结果裁剪和 AutoCompaction 基于 LLM 的结构化摘要生成的设计差异
- 研究 Compaction Prompt 的 9 段结构化摘要模板，掌握 analysis-summary 两阶段输出和草稿纸剥离技术在 Prompt Engineering 中的应用
- 拆解断路器（Circuit Breaker）设计，理解连续失败计数和最大重试次数限制如何防止 API 资源浪费（源码数据：每天全球减少约 25 万次无效 API 调用）
- 分析 Post-Compact Cleanup 的状态重置策略，理解 Sub-agent 与主线程共享模块级状态时的并发隔离方案
- 研究基于 API 轮次的消息分组算法，理解为什么选择 assistant message ID 而非用户消息作为分组边界

## ending

两天源码读下来，最让我感慨的不是某个具体的算法有多巧妙，而是这套系统在工程层面的务实。

Anthropic 的工程师没有追求一种"完美的压缩算法"，而是搭了一条管线——每一层做自己该做的事，做完交给下一层。规则能搞定的不用模型，预防能搞定的不等到出错，出错了还有兜底。断路器的设计更说明问题——他们面对的是真实的生产环境，每天 25 万次无效调用不是纸上谈兵的数字。

回过头看那个评论区的问题："压完之后它怎么还记得我刚才让它干什么？"

答案藏在 Compaction Prompt 的第 6 项和第 9 项里——所有用户消息原文保留，当前任务带直接引用。不靠记忆力，靠工程设计。

主要是 AI 发展得太快了，但如果你静下心来，就会发现，AI 的技术栈就那么多，ReAct、Function Calling、RAG、MCP、Multi-Agent、Memory、Context。每一个拆开来都值得深入研究，而不是停留在"我知道有这个东西"。

【**愿意花时间读源码的人，和只会用工具的人，终究会走上不同的路。**】

我们下期见。
