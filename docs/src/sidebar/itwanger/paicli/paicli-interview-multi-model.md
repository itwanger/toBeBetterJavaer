---
title: AI Agent 面试题第七弹：多模型适配、运行时切换、成本控制 12 题
shortTitle: 面试题：多模型与成本
description: 围绕 PaiCLI 实战，精选 12 道多模型适配与成本控制面试题，覆盖 Provider 抽象、策略模式、OpenAI 兼容协议、Token 计费和 Prompt Caching。
tag:
  - Agent
  - 面试题
  - LLM
category:
  - AI
author: 沉默王二
date: 2026-05-11
---

大家好，我是二哥呀。

第七弹，聚焦**多模型适配与成本控制**。对应 PaiCLI 的第 8 期（多模型适配）和第 12 期（长上下文工程）。

现在国产模型百花齐放——GLM、DeepSeek、Kimi、StepFun，再加上 Claude、GPT，一个 Agent 只绑死一个模型是不现实的。怎么做模型抽象、运行时切换、成本优化，是面试中实操性很强的方向。

## 01、怎么设计一个支持多模型的 LLM 客户端接口？

核心是**策略模式**——定义统一接口，每个模型 provider 各自实现。

PaiCLI 的 `LlmClient` 接口：

```java
interface LlmClient {
    Stream<ChatResponse> chat(List<Message> messages, List<Tool> tools);
    String modelName();
    int maxContextWindow();
    boolean supportsPromptCaching();
    PromptCacheMode promptCacheMode();
}
```

四个瘦子类：`GLMClient`、`DeepSeekClient`、`StepClient`、`KimiClient`，共享一个 `AbstractOpenAiCompatibleClient` 基类。

设计要点：

- **接口只定义能力，不定义实现**：`chat()` 负责发送请求并返回流式响应，具体 URL、header、请求体格式由子类决定
- **能力声明**：`maxContextWindow()` 和 `supportsPromptCaching()` 让上层（如 ContextProfile）根据模型能力做策略调整
- **Message 类型统一**：所有 provider 共用同一套 `Message`/`ToolCall`/`Tool` 类型，不搞 provider 私有类型

## 02、模板方法模式在多模型适配里怎么用的？

`AbstractOpenAiCompatibleClient` 是模板方法模式的经典应用：

基类定义了通用流程：
```
构建请求体 → 发送 HTTP 请求 → 解析 SSE 流 → 合并增量 tool_calls → 返回结果
```

子类只需覆盖差异点：
- `apiUrl()`：API 端点地址
- `modelName()`：默认模型名
- `apiKey()`：API Key 来源
- `customizeRequestBody()`：provider 特有字段

比如 DeepSeek 需要在请求体里加 `stream_options.include_usage: true` 来获取 token 用量，GLM 的 coding endpoint 和多模态 endpoint URL 不同——这些差异都在子类里覆盖。

新增一个 provider 只需 ~20 行代码：继承基类，实现 4-5 个方法。

## 03、OpenAI 兼容协议是什么？为什么大家都兼容它？

OpenAI 兼容协议是 OpenAI Chat Completions API 的请求/响应格式，包括：

- 请求：`model`、`messages`（role/content）、`tools`、`stream`
- 响应：`choices[0].message.content`、`choices[0].message.tool_calls`
- 流式响应：SSE 格式，每个 chunk 包含增量内容

为什么大家都兼容：

1. **生态效应**：OpenAI 是第一个大规模商用的 LLM API，SDK 和工具链最成熟
2. **降低迁移成本**：用户已有的 OpenAI 代码，换个 URL 就能切到其他 provider
3. **标准化收益**：Agent 框架只需要实现一套协议适配

GLM、DeepSeek、Kimi、StepFun 都兼容这套协议，差异主要在：特有参数（如 DeepSeek 的 `reasoning_content`）、计费字段、rate limit 头。

PaiCLI 的 `AbstractOpenAiCompatibleClient` 就是基于这套协议实现的共享基类。

## 04、运行时切换模型是怎么实现的？

PaiCLI 支持 `/model <name>` 在运行时切换模型，不用重启。

实现流程：

1. 用户输入 `/model deepseek`
2. `LlmClientFactory` 根据 provider 名创建新的 `DeepSeekClient` 实例
3. Agent 的 `llmClient` 引用指向新实例
4. 新实例从配置文件/环境变量读取 API Key 和模型名
5. `ContextProfile` 根据新模型的 `maxContextWindow()` 重新计算上下文策略
6. 选择持久化到 `~/.paicli/config.json`

注意点：

- **对话历史保持不变**：切换模型不清空对话历史，但不同模型对历史的理解能力可能不同
- **工具定义不变**：所有模型共用同一套工具注册表
- **Token 预算重算**：切到大窗口模型后，可用预算自动提升

## 05、不同模型的 Token 计费差异有多大？怎么估算成本？

以 2025 年的定价为例（每百万 token）：

| 模型 | 输入价格 | 输出价格 | 窗口 |
|---|---|---|---|
| GLM-5.1 | ¥0.5 | ¥2.0 | 200k |
| DeepSeek V4 | ¥1.0 | ¥4.0 | 1M |
| Kimi K2.6 | ¥1.0 | ¥4.0 | 256k |
| StepFun Step-3.5 | ¥1.0 | ¥5.0 | 256k |

PaiCLI 的成本估算公式：

```
单轮成本 = input_tokens × input_price / 1M + output_tokens × output_price / 1M
                - cached_tokens × (input_price - cached_price) / 1M
```

Prompt Caching 的成本优势巨大：cached input 通常只有普通 input 价格的 10-20%。一个典型的 Agent session 可能有 50 轮对话，每轮的 system prompt + 工具定义（约 3k token）都是重复的，全部命中 cache 可以省 80%+ 的输入成本。

PaiCLI 每轮输出：`已用 X / Y token (window W, cached: Z, 估算 ¥A)`。

## 06、Prompt Caching 在不同 provider 之间有什么差异？

| Provider | Caching 机制 | 客户端操作 |
|---|---|---|
| Anthropic (Claude) | 显式标记 cache breakpoint | 在特定 message 里加 `cache_control` 字段 |
| OpenAI | 自动前缀缓存 | 无需客户端操作 |
| DeepSeek | 自动前缀缓存 | 无需客户端操作，usage 里返回 cached_tokens |
| GLM | 未公开 | 无法确认 |

PaiCLI 的策略是**保守兼容**：

- 通过 `LlmClient.supportsPromptCaching()` 和 `promptCacheMode()` 声明能力
- 自动前缀缓存的 provider（DeepSeek）：只需要在 prompt 布局上保持"稳定在前"，服务端自动缓存
- 需要显式标记的 provider（Claude）：在对应位置注入 cache_control
- 不确认的 provider：不注入任何缓存相关字段

## 07、上下文模式（short/balanced/long）是怎么切换的？

PaiCLI 的 `ContextProfile` 根据模型窗口大小自动选择上下文模式：

| 窗口大小 | 模式 | 行为 |
|---|---|---|
| < 32k | short | 积极摘要压缩，RAG topK=5 |
| 32k-100k | balanced | 适度压缩，RAG topK=10 |
| ≥ 100k | long | 跳过压缩，RAG topK=20 |

切换模型时自动切换模式。比如从 GLM-5.1（200k → long）切到一个 32k 窗口模型，会自动切回 balanced 模式并启用摘要压缩。

用户也可以手动覆盖：通过环境变量或配置文件强制指定模式。

这个设计的核心思想是：**不同窗口大小适合不同的上下文管理策略**。小窗口模型必须压缩，大窗口模型压缩反而浪费。

## 08、流式响应（SSE）的增量 tool_calls 合并是怎么做的？

LLM 的流式响应把 tool_calls 拆成多个 chunk 返回，每个 chunk 只包含增量数据：

```
chunk 1: tool_calls[0].function.name = "read_"
chunk 2: tool_calls[0].function.name = "file"
chunk 3: tool_calls[0].function.arguments = '{"pa'
chunk 4: tool_calls[0].function.arguments = 'th":"pom.xml"}'
```

`AbstractOpenAiCompatibleClient` 的合并逻辑：

1. 维护一个 `Map<Integer, ToolCall>` 按 index 存储正在构建的 tool_calls
2. 每收到一个 chunk，追加 name 和 arguments 字符串
3. 流结束后，对每个 tool_call 的 arguments 做 JSON 解析
4. 如果 JSON 不合法（LLM 偶尔会截断），返回解析错误给上层

这个增量合并在 SSE 解析里是必须做的——如果不合并直接解析 chunk 里的 arguments，永远会 JSON 解析失败。

## 09、API Key 的读取优先级是怎么设计的？

PaiCLI 的 API Key 读取优先级（从高到低）：

1. `~/.paicli/config.json` 中对应 provider 的 `apiKey`
2. 环境变量：`GLM_API_KEY` / `DEEPSEEK_API_KEY` / `STEP_API_KEY` / `KIMI_API_KEY`
3. 项目目录下的 `.env` 文件
4. 用户主目录下的 `.env` 文件

设计考虑：

- **config.json 最高**：通过 `/config` 设置的 key 应该覆盖其他来源
- **环境变量次之**：CI/CD 和 Docker 环境通常通过环境变量注入 key
- **`.env` 最低**：开发环境的便利性，不需要 export 环境变量

安全要点：`.env` 文件绝不能提交到 git（`.gitignore` 里必须有 `.env`），config.json 存在用户目录下，不在项目目录内。

## 10、如果模型不支持 Function Calling 怎么办？

并非所有模型都支持原生 Function Calling（tool_calls 字段）。对于不支持的模型，常见的适配方式：

**1. Prompt 注入法**：在 system prompt 里描述工具的使用格式，让 LLM 在回复文本里输出工具调用（如 XML 标签或 JSON 块），客户端解析文本提取工具调用。

```
当你需要读文件时，输出：
<tool_call>{"name": "read_file", "arguments": {"path": "xxx"}}</tool_call>
```

**2. 中间层适配**：在客户端和模型 API 之间加一个适配层，把 tools 定义转为 prompt 文本，把模型输出中的工具调用文本解析为 tool_calls 结构。

PaiCLI 目前只接入支持 Function Calling 的模型（GLM、DeepSeek、Kimi、StepFun 都支持），没做 prompt 注入适配。但面试时了解这个思路很重要——这是 LangChain 等框架处理不支持 FC 模型的标准做法。

## 11、Agent 的总成本怎么估算？有哪些优化手段？

Agent 的成本 = 所有 LLM 请求的 token 费用之和。一个复杂任务可能涉及 20-50 轮 LLM 调用。

主要的优化手段：

**1. Prompt Caching**：前面说了，能省 80%+ 的重复输入成本。

**2. 减少轮次**：好的 system prompt 能让 LLM 一次做对，减少重试。Multi-Agent 的 Reviewer 重试也是成本点——限制最大重试次数。

**3. 工具结果裁剪**：工具返回的内容不要全量塞进 prompt。比如 `list_dir` 返回 1000 个文件，只保留前 100 个。

**4. 选对模型**：简单任务用便宜模型，复杂任务用贵的。PaiCLI 支持运行时切换，用户可以按需选择。

**5. 长上下文模式**：大窗口模型虽然单 token 不便宜，但省了摘要压缩的那次 LLM 调用（摘要也是要花钱的）。

**6. 历史裁剪**：定期清理不再需要的对话历史（工具结果、旧截图的 base64）。

## 12、面试官问"你用过哪些模型？各自的优缺点？"怎么回答？

结合 PaiCLI 的实际使用经验：

| 模型 | 优势 | 劣势 | 适合场景 |
|---|---|---|---|
| GLM-5.1 | 便宜、中文好、Coding 专版 | 窗口相对小（200k）| 日常开发、中文项目 |
| DeepSeek V4 | 1M 超大窗口、自动缓存 | 高峰期限流 | 大型代码库分析 |
| Kimi K2.6 | 长文本理解好、中文好 | 工具调用偶尔不稳定 | 文档阅读、长文本任务 |
| StepFun | 性价比高、响应快 | 生态工具少 | 快速原型、简单任务 |
| Claude Sonnet/Opus | 工具调用最稳、推理强 | 贵、中文略弱 | 复杂推理、架构设计 |
| GPT-4o | 多模态强、生态最大 | 贵、国内访问不稳定 | 图片理解、多模态 |

回答要点：不要泛泛而谈"XX 模型好"，要说**具体场景下的体验**，比如"DeepSeek V4 在分析大型代码库时，1M 窗口的优势很明显，不需要做 RAG 就能直接塞进去"。

## ending

这 12 道题覆盖了多模型适配和成本控制的核心：Provider 抽象、策略模式、OpenAI 兼容协议、运行时切换、Token 计费、Prompt Caching、上下文模式、成本优化。

最后一篇是**综合设计题**——跨领域的架构选型、对比分析、场景设计。
