---
title: AI Agent 面试题第七弹：多模型适配、运行时切换、成本控制 12 题
shortTitle: 面试题：多模型与成本
description: 围绕 PaiCLI 实战，精选 12 道多模型适配与成本控制面试题，覆盖 Provider 抽象、模板方法模式、OpenAI 兼容协议、Token 计费和 Prompt Caching，每道题结合源码深度拆解。
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

这是 AI Agent 面试题系列的第七弹（共 8 篇），聚焦**多模型适配与成本控制**。对应 PaiCLI 的第 8 期（多模型适配 + 运行时切换）和第 12 期（长上下文工程）。

为什么要单独拿一篇来讲这个？因为现在国产模型百花齐放——GLM、DeepSeek、Kimi、StepFun，再加上 Claude、GPT，一个 Agent 只绑死一个模型在生产环境里根本不现实。面试官问“你的项目怎么做多模型适配”，如果你只会说“换个 API Key 就行”，那这道题就废了。

怎么做模型抽象、运行时切换、Token 预算管理、成本优化——这些才是面试官想听到的。下面 12 道题，我们一个一个来。

## 01、怎么设计一个支持多模型的 LLM 客户端接口？

核心是**策略模式**——定义统一接口，每个模型 provider 各自实现。

PaiCLI 的 `LlmClient.java` 接口是这么写的：

```java
public interface LlmClient {

    ChatResponse chat(List<Message> messages, List<Tool> tools) throws IOException;

    ChatResponse chat(List<Message> messages, List<Tool> tools,
                      StreamListener listener) throws IOException;

    String getModelName();

    String getProviderName();

    default int maxContextWindow() {
        return 128_000;
    }

    default boolean supportsPromptCaching() {
        return false;
    }

    default String promptCacheMode() {
        return "none";
    }
}
```

注意几个设计细节：

- **两个 `chat()` 方法**：一个不带 `StreamListener`（内部调另一个传 NO_OP），一个带——流式输出是可选能力，不强制所有调用方处理。
- **`maxContextWindow()` 用 default 方法给默认值 128k**：新增 provider 时如果忘记覆盖，不会编译错误但行为安全。
- **`supportsPromptCaching()` 和 `promptCacheMode()` 分两个方法**：前者是布尔判断“支不支持”，后者返回具体的缓存模式字符串（如 `automatic-prefix-cache`、`glm-prompt-cache`），方便上层做精细策略。

四个瘦子类——`GLMClient`、`DeepSeekClient`、`StepClient`、`KimiClient`，共享一个 `AbstractOpenAiCompatibleClient` 基类。

【此处插入 截图目标：LlmClient 接口与四个子类的 UML 类图，展示策略模式结构；关键词：LlmClient、AbstractOpenAiCompatibleClient、GLMClient、DeepSeekClient；建议位置：白板/类图】

### 为什么接口里要声明 maxContextWindow 和 promptCacheMode

因为上层的 `ContextProfile` 需要根据模型能力做策略调整。你看 `ContextProfile.from()` 的代码：

```java
public static ContextProfile from(LlmClient llmClient) {
    int window = Math.max(MIN_WINDOW,
            llmClient == null ? 128_000 : llmClient.maxContextWindow());
    return new ContextProfile(
            window,
            agentBudget(window),
            DEFAULT_COMPRESSION_TRIGGER_RATIO,
            shortTermBudget(window),
            memoryContextTokens(window),
            window >= MCP_RESOURCE_INDEX_MIN_WINDOW,
            llmClient != null && llmClient.supportsPromptCaching(),
            llmClient == null ? "none" : llmClient.promptCacheMode()
    );
}
```

所有参数都是 `maxContextWindow` 的函数——短期记忆预算是 `window * 0.45`，压缩阈值是 `window * 0.9`，MCP resource 索引只在 window >= 32k 时开启。模型能力声明直接驱动上下文策略，不需要任何 if-else 分支。

这在面试里是一个很好的答题点：**接口不只定义行为（chat），还声明能力（maxContextWindow），让上层做零分支的策略派生**。

## 02、模板方法模式在多模型适配里怎么用的？

`AbstractOpenAiCompatibleClient` 是模板方法模式的经典应用。

基类定义了通用流程，一个 `chat()` 方法包含完整的 SSE 请求-响应链路：

```
构建请求体 → 发送 HTTP 请求 → 逐行解析 SSE 流
→ 合并增量 tool_calls → 提取 usage 统计 → 返回 ChatResponse
```

子类只需要覆盖几个差异点：

```java
protected abstract String getApiUrl();   // API 端点地址
protected abstract String getModel();    // 默认模型名
protected abstract String getApiKey();   // API Key 来源
```

再看具体子类有多轻量。`DeepSeekClient` 全部代码：

```java
public class DeepSeekClient extends AbstractOpenAiCompatibleClient {

    private static final String API_URL =
            "https://api.deepseek.com/chat/completions";
    private static final String DEFAULT_MODEL = "deepseek-v4-flash";
    private final String apiKey;
    private final String model;

    @Override protected String getApiUrl() { return API_URL; }
    @Override protected String getModel()  { return model; }
    @Override protected String getApiKey() { return apiKey; }
    @Override public String getModelName()    { return model; }
    @Override public String getProviderName() { return "deepseek"; }
    @Override public int maxContextWindow()   { return 1_000_000; }
    @Override public boolean supportsPromptCaching() { return true; }
    @Override public String promptCacheMode() { return "automatic-prefix-cache"; }
}
```

整个类不到 60 行，SSE 解析、tool_calls 合并、HTTP 超时处理一行没写——全在基类里。

【此处插入 截图目标：AbstractOpenAiCompatibleClient 的 chat() 方法核心流程，展示模板方法的骨架；关键词：SSE、mergeToolCallDeltas、buildRequestBody；建议位置：源码截图/流程图】

### GLM 的差异在哪里

GLM 比 DeepSeek 多了一个差异点：**Coding 端点和多模态端点的 URL 不一样**。

```java
public class GLMClient extends AbstractOpenAiCompatibleClient {

    private static final String CODING_API_URL =
            "https://open.bigmodel.cn/api/coding/paas/v4/chat/completions";
    private static final String MULTIMODAL_API_URL =
            "https://open.bigmodel.cn/api/paas/v4/chat/completions";

    private static String selectApiUrl(String model) {
        String normalized = model == null ? "" : model.trim().toLowerCase();
        if (normalized.startsWith("glm-5v")) {
            return MULTIMODAL_API_URL;
        }
        return CODING_API_URL;
    }
}
```

`glm-5.1` 走 Coding 端点（专为代码优化），`glm-5v-turbo` 走多模态端点（支持图片输入）。这种差异完全封装在子类里，基类和上层一无所知。

另外 Kimi 有个特殊覆盖：`shouldSendReasoningContentInRequestHistory()` 返回 `true`。因为 Kimi 的 API 要求在请求历史中回传 `reasoning_content`，否则模型推理质量会下降。其他模型都是 false。

新增一个 provider 的成本？继承基类，实现 3 个 abstract 方法 + 覆盖几个 default 方法，20-30 行代码搞定。

## 03、OpenAI 兼容协议是什么？为什么大家都兼容它？

OpenAI 兼容协议就是 OpenAI Chat Completions API 的请求/响应格式，包括三层：

**请求格式**：`model`、`messages`（role/content）、`tools`（name/description/parameters）、`stream`

**非流式响应**：`choices[0].message.content`、`choices[0].message.tool_calls`

**流式响应**：SSE 格式，每个 chunk 包含 `choices[0].delta`，增量返回 content 和 tool_calls

为什么大家都兼容？三个原因。

第一，**生态效应**。OpenAI 是第一个大规模商用的 LLM API，全球最多的 SDK、框架、工具链都围绕这套格式构建。你兼容它，用户的已有代码换个 URL 就能跑。

第二，**标准化收益**。Agent 框架只需要实现一套协议适配就能接入多家模型。PaiCLI 的 `AbstractOpenAiCompatibleClient` 就是这个思路——一个基类覆盖四家 provider。

第三，**降低开发者的迁移成本**。GLM、DeepSeek、Kimi、StepFun 都兼容这套协议，差异主要在：

- 特有字段：DeepSeek 的 `reasoning_content`、GLM 的 Coding 端点分离
- 计费字段：`cached_tokens` 的位置不统一（有的在 `usage` 直接下面，有的在 `prompt_tokens_details` 里）
- Rate limit 头：各家格式不同

【此处插入 截图目标：OpenAI Chat Completions API 的请求/响应 JSON 示例对比四家 provider；关键词：messages、tools、tool_calls、SSE；建议位置：表格/JSON 对比】

### PaiCLI 怎么处理各家 cached_tokens 字段位置不统一的问题

看 `AbstractOpenAiCompatibleClient` 里的 `parseCachedInputTokens()` 方法：

```java
private int parseCachedInputTokens(JsonNode usage, int fallback) {
    int cached = usage.path("cached_tokens").asInt(fallback);
    cached = usage.path("prompt_cache_hit_tokens").asInt(cached);
    cached = usage.path("input_cache_hit_tokens").asInt(cached);
    JsonNode promptDetails = usage.path("prompt_tokens_details");
    if (!promptDetails.isMissingNode()) {
        cached = promptDetails.path("cached_tokens").asInt(cached);
    }
    JsonNode inputDetails = usage.path("input_tokens_details");
    if (!inputDetails.isMissingNode()) {
        cached = inputDetails.path("cached_tokens").asInt(cached);
    }
    return cached;
}
```

这段代码很“暴力”但很实用——把各家可能出现 cached tokens 的字段路径全扫一遍，谁有值就用谁的。新增 provider 时如果 cached tokens 放在新路径，加一行 `path()` 就行。

## 04、运行时切换模型是怎么实现的？

PaiCLI 支持 `/model <name>` 在运行时切换模型，不用重启进程。

核心是 `LlmClientFactory.create()` 方法：

```java
public static LlmClient create(String provider, PaiCliConfig config) {
    String normalized = normalizeProvider(provider);
    String apiKey = config.getApiKey(normalized);
    // ...
    return switch (normalized) {
        case "glm"      -> new GLMClient(apiKey, model);
        case "deepseek"  -> new DeepSeekClient(apiKey, model);
        case "step"      -> new StepClient(apiKey, model, baseUrl);
        case "kimi"      -> new KimiClient(apiKey, model, baseUrl);
        default -> null;
    };
}
```

`normalizeProvider()` 做了别名规范化——`stepfun`、`step-fun` 统一映射到 `step`；`moonshot`、`moonshotai` 统一映射到 `kimi`。用户输入不用严格匹配。

切换流程：

1. 用户输入 `/model deepseek`
2. `LlmClientFactory.create("deepseek", config)` 创建新的 `DeepSeekClient` 实例
3. Agent 的 `llmClient` 引用指向新实例
4. `ContextProfile.from(newClient)` 根据新模型的 `maxContextWindow()` 重新计算上下文策略
5. 选择持久化到 `~/.paicli/config.json`

【此处插入 截图目标：PaiCLI 终端里执行 /model deepseek 后状态栏切换的效果；关键词：/model、provider 切换、状态栏更新；建议位置：终端截图】

### 切换模型后对话历史怎么处理

**对话历史保持不变**。切换模型不清空对话历史，但有几个注意点：

- **Token 预算重算**：切到大窗口模型（如 DeepSeek 的 1M）后，可用预算自动提升，之前因为窗口限制被压缩的内容无法恢复
- **工具定义不变**：所有模型共用同一套 `ToolRegistry`
- **reasoning_content 兼容**：历史里有 DeepSeek 的 `reasoning_content`，切到 GLM 后这些字段不会被发给 GLM（除非模型实现了 `shouldSendReasoningContentInRequestHistory()` 返回 true，目前只有 Kimi 需要）

## 05、不同模型的 Token 计费差异有多大？怎么估算成本？

差异非常大。以 2025 年的定价为例（每百万 token）：

| 模型 | 输入价格 | 输出价格 | 窗口 |
|---|---|---|---|
| GLM-5.1 | 0.5 元 | 2.0 元 | 200k |
| DeepSeek V4 | 1.0 元 | 4.0 元 | 1M |
| Kimi K2.6 | 1.0 元 | 4.0 元 | 256k |
| StepFun Step-3.5 | 1.0 元 | 5.0 元 | 256k |

PaiCLI 的 `TokenBudget` 类负责 token 消耗统计：

```java
public class TokenBudget {
    private int totalInputTokens;
    private int totalOutputTokens;
    private int totalCachedInputTokens;
    private int llmCallCount;

    public void recordUsage(int inputTokens, int outputTokens,
                            int cachedInputTokens) {
        totalInputTokens += inputTokens;
        totalOutputTokens += outputTokens;
        totalCachedInputTokens += Math.max(0, cachedInputTokens);
        llmCallCount++;
    }
}
```

成本估算公式：

```
单轮成本 = input_tokens * input_price / 1M
         + output_tokens * output_price / 1M
         - cached_tokens * (input_price - cached_price) / 1M
```

Prompt Caching 的成本优势巨大：cached input 通常只有普通 input 价格的 10-20%。一个典型的 Agent session 可能有 50 轮对话，每轮的 system prompt + 工具定义（约 3k token）都是重复的，全部命中 cache 可以省 80%+ 的输入成本。

PaiCLI 每轮在状态栏输出 token 统计：`已用 X / Y token (window W, cached: Z, 估算 cost)`。

【此处插入 截图目标：PaiCLI 状态栏展示 token 统计和成本估算的效果；关键词：TokenBudget、状态栏、cached tokens；建议位置：终端截图】

### TokenBudget 怎么判断是否需要压缩

看 `needsCompression()` 方法：

```java
public boolean needsCompression(ConversationMemory memory, double triggerRatio) {
    int compressionBudget = Math.min(memory.getMaxTokens(),
                                     getAvailableForConversation());
    return memory.getTokenCount() >= compressionBudget * triggerRatio;
}
```

`triggerRatio` 默认是 `ContextProfile.DEFAULT_COMPRESSION_TRIGGER_RATIO = 0.90`——当前对话历史的 token 占用达到可用预算的 90%，就触发压缩。

`getAvailableForConversation()` 是总窗口减去系统提示、工具定义和回复预留：

```java
public int getAvailableForConversation() {
    return contextWindow - reservedForSystem - reservedForTools
           - reservedForResponse;
}
```

这几个预留值在构造时就定好了：系统提示 500 token，工具定义 800 token，回复预留 2000 token。剩下的才是对话历史可以用的。

## 06、Prompt Caching 在不同 provider 之间有什么差异？

这道题面试官很喜欢问，因为它体现了你对各家 API 的实际使用经验。

| Provider | Caching 机制 | 客户端操作 | PaiCLI 对应的 promptCacheMode |
|---|---|---|---|
| Anthropic (Claude) | 显式标记 cache breakpoint | 在 message 里加 `cache_control` | - |
| DeepSeek | 自动前缀缓存 | 无需操作，usage 返回 cached_tokens | `automatic-prefix-cache` |
| GLM | 显式 Prompt Cache API | 需要声明缓存区域 | `glm-prompt-cache` |
| StepFun | 前缀缓存 | 无需操作 | `step-prefix-cache` |
| Kimi | Context Cache | 需要特定 API 调用 | `moonshot-context-cache` |

PaiCLI 的策略是**保守兼容**。看四个 Client 的 `promptCacheMode()` 返回值都不一样，上层根据这个字符串做精细策略：

- 自动前缀缓存的 provider（DeepSeek）：只需要在 prompt 布局上保持“稳定在前”原则，服务端自动缓存
- 需要显式标记的 provider（Claude、GLM）：在对应位置注入缓存控制字段
- 不确认的 provider：`promptCacheMode()` 返回 `"none"`，不注入任何缓存相关字段

说白了就一句话：**能自动缓存的就靠 prompt 排布优化，需要手动标记的就按协议注入，不确定的就不碰**。

【此处插入 截图目标：不同 provider 的 Prompt Caching 机制对比表，带每家 API 文档的关键字段；关键词：cached_tokens、cache_control、prefix cache；建议位置：表格截图/对比图】

### 为什么 Prompt 布局要“稳定在前”

这和 LLM 推理时的 KV Cache 机制有关。

LLM 推理时会把 prompt 的每个 token 计算出 Key 和 Value，缓存起来。如果连续两次请求的 prompt **前缀完全相同**，服务端可以复用上次的 KV Cache，跳过重复计算。

所以 PaiCLI 第 19 期做 Prompt 分层时，组装顺序是“稳定在前、动态在后”：

```
base.md（几乎不变） → personality（不变） → mode（同模式不变）
→ project_context（偶尔变） → skills（按需加载） → handoff（每轮不同）
```

前面 60-70% 的 prompt 能持续命中 cache。如果把动态内容放前面，整个 cache 就废了。

## 07、上下文策略是怎么根据模型能力自动调整的？

注意，PaiCLI 的 `ContextProfile` 没有 `short`、`balanced`、`long` 三个固定模式。看源码的注释写得很清楚：

```java
/**
 * 设计原则：没有"长 / 短 / 平衡"模式分档。所有参数都是
 * maxContextWindow 的简单函数，全模型走同一套行为，只是
 * window 大小不同导致触发时机和容量不同。
 */
public record ContextProfile(
    int maxContextWindow,
    int agentTokenBudget,
    double compressionTriggerRatio,
    int shortTermMemoryBudget,
    int memoryContextTokens,
    boolean mcpResourceIndexEnabled,
    boolean promptCachingSupported,
    String promptCacheMode
) { }
```

核心派生公式：

| 参数 | 公式 | 含义 |
|---|---|---|
| agentTokenBudget | `window * 0.8` | Agent 单次 run 的 token 上限 |
| shortTermMemoryBudget | `window * 0.45` | 短期记忆可用 token |
| compressionTriggerRatio | 固定 0.90 | 占用率达 90% 触发压缩 |
| memoryContextTokens | `window / 200`，封顶 5000 | 注入 system prompt 的记忆上限 |
| mcpResourceIndexEnabled | `window >= 32k` | 小窗口关闭 MCP 资源索引 |

切模型时自动切策略。比如从 GLM-5.1（200k）切到一个假设的 32k 窗口模型：

- 短期记忆预算从 90k 降到 14.4k
- 压缩阈值从 180k 降到 28.8k
- MCP 资源索引勉强能开（刚好 32k）

**好处**：没有 if-else 分支，没有模式切换的边界 bug。模型窗口大小是唯一输入，所有策略是连续函数而不是离散分档。

【此处插入 截图目标：ContextProfile 的派生公式和四个模型的实际数值对比；关键词：maxContextWindow、shortTermMemoryBudget、compressionTriggerRatio；建议位置：表格/公式图】

## 08、流式响应（SSE）的增量 tool_calls 合并是怎么做的？

这是一个很容易被忽略但很重要的实现细节。

LLM 的流式响应把 tool_calls 拆成多个 chunk 返回，每个 chunk 只包含增量数据：

```
chunk 1: tool_calls[0].function.name = "read_"
chunk 2: tool_calls[0].function.name = "file"
chunk 3: tool_calls[0].function.arguments = '{"pa'
chunk 4: tool_calls[0].function.arguments = 'th":"pom.xml"}'
```

如果不合并直接解析 chunk 里的 arguments，永远会 JSON 解析失败。

看 `AbstractOpenAiCompatibleClient` 里的合并逻辑：

```java
private static final class ToolCallAccumulator {
    private String id;
    private final StringBuilder name = new StringBuilder();
    private final StringBuilder arguments = new StringBuilder();
}

private void mergeToolCallDeltas(List<ToolCallAccumulator> accumulators,
                                  JsonNode toolCallsNode) {
    if (toolCallsNode == null || !toolCallsNode.isArray()) return;

    for (JsonNode tc : toolCallsNode) {
        int index = tc.path("index").asInt(accumulators.size());
        while (accumulators.size() <= index) {
            accumulators.add(new ToolCallAccumulator());
        }

        ToolCallAccumulator acc = accumulators.get(index);
        String id = tc.path("id").asText("");
        if (!id.isEmpty()) acc.id = id;

        JsonNode function = tc.path("function");
        String name = function.path("name").asText("");
        if (!name.isEmpty()) acc.name.append(name);
        String arguments = function.path("arguments").asText("");
        if (!arguments.isEmpty()) acc.arguments.append(arguments);
    }
}
```

关键点：

1. **按 index 存储**：`List<ToolCallAccumulator>` 按 tool_call 的 index 维护，多个并行 tool_call 互不干扰
2. **StringBuilder 追加**：name 和 arguments 都用 StringBuilder 累积，每收到一个 chunk 就 append
3. **流结束后再解析**：`buildToolCalls()` 在 SSE 流结束后才把累积的 JSON 字符串构造成 `ToolCall` 对象

【此处插入 截图目标：SSE 流式 tool_calls 增量合并的时序图，展示 4 个 chunk 合并成一个完整 ToolCall 的过程；关键词：mergeToolCallDeltas、ToolCallAccumulator、SSE chunk；建议位置：时序图/流程图】

### 如果 LLM 返回的 arguments JSON 被截断了怎么办

这种情况偶尔会发生——LLM 的 max_tokens 限制或者网络中断导致 arguments 不是完整 JSON。

PaiCLI 的处理是在 `buildToolCalls()` 之后、实际执行工具之前做 JSON 解析校验。如果 `arguments` 解析失败，Agent 不会执行工具，而是生成一条错误的 tool message 回灌给 LLM，告诉它“你的参数 JSON 格式有误，请重新输出”。LLM 在下一轮就会修正。

## 09、API Key 的读取优先级是怎么设计的？

PaiCLI 的 API Key 读取优先级（从高到低）：

1. `~/.paicli/config.json` 中对应 provider 的 `apiKey`
2. 环境变量：`GLM_API_KEY` / `DEEPSEEK_API_KEY` / `STEP_API_KEY` / `KIMI_API_KEY`（Kimi 兼容 `MOONSHOT_API_KEY`）
3. 项目目录下的 `.env` 文件
4. 用户主目录下的 `.env` 文件

设计考虑：

- **config.json 最高**：通过 `/config` 命令设置的 key 应该覆盖其他来源，这是用户最明确的意图表达
- **环境变量次之**：CI/CD 和 Docker 环境通常通过环境变量注入 key
- **`.env` 最低**：开发环境的便利性，不需要 export 环境变量

看 `LlmClientFactory.createFromConfig()` 的降级逻辑：

```java
public static LlmClient createFromConfig(PaiCliConfig config) {
    LlmClient client = create(config.getDefaultProvider(), config);
    if (client != null) {
        return client;
    }
    // 用户没配默认 provider，按优先级扫描
    for (String provider : new String[]{"glm", "deepseek", "step", "kimi"}) {
        client = create(provider, config);
        if (client != null) {
            return client;
        }
    }
    return null;
}
```

如果用户没配默认 provider，按 `glm → deepseek → step → kimi` 顺序扫描，哪个有 Key 就用哪个。这保证了“配了 Key 就能用”的体验——新手不需要理解 provider 的概念，配好任意一个 Key 就能启动。

【此处插入 截图目标：API Key 读取优先级链路图，从 config.json 到环境变量到 .env 的降级过程；关键词：PaiCliConfig、getApiKey、createFromConfig；建议位置：流程图】

### 安全要点

- `.env` 文件绝不能提交到 git——`.gitignore` 里必须有 `.env`
- `config.json` 存在用户主目录 `~/.paicli/` 下，不在项目目录内，不会被 git 追踪
- Key 在日志里做脱敏处理，只显示前后各 4 位

## 10、如果模型不支持 Function Calling 怎么办？

并非所有模型都支持原生 Function Calling（也就是响应里返回 `tool_calls` 字段）。碰到不支持的模型，业界有两种常见适配方式。

**方式一：Prompt 注入法**。在 system prompt 里描述工具的使用格式，让 LLM 在回复文本里输出工具调用（如 XML 标签或 JSON 块），客户端解析文本提取工具调用。

```
当你需要读文件时，请严格按以下格式输出：
<tool_call>{"name": "read_file", "arguments": {"path": "xxx"}}</tool_call>
```

客户端用正则匹配 `<tool_call>...</tool_call>`，解析出工具名和参数，执行后再把结果塞回去。

**方式二：中间层适配**。在客户端和模型 API 之间加一个适配层，把 tools 定义转为 prompt 文本，把模型输出中的工具调用文本解析为标准的 tool_calls 结构。对上层透明——Agent 以为自己在和一个支持 FC 的模型对话。

PaiCLI 目前只接入支持 Function Calling 的模型。GLM、DeepSeek、Kimi、StepFun 都原生支持 tool_calls，所以没做 prompt 注入适配。

但面试时了解这个思路很重要——这是 LangChain 等框架处理不支持 FC 模型的标准做法。如果面试官追问“你怎么扩展到不支持 FC 的模型”，你可以说出 Prompt 注入法并分析其局限：**解析成功率依赖 LLM 的格式遵循能力，比原生 FC 低；多个工具并行调用时格式更容易出错**。

【此处插入 截图目标：Function Calling 原生支持 vs Prompt 注入法的对比示意图；关键词：tool_calls、XML 标签解析、FC 协议；建议位置：对比图/流程图】

## 11、Agent 的总成本怎么估算？有哪些优化手段？

Agent 的成本 = 所有 LLM 请求的 token 费用之和。一个复杂任务可能涉及 20-50 轮 LLM 调用，每轮都有 input 和 output 的费用。

PaiCLI 的 `TokenBudget.getUsageReport()` 给出完整统计：

```java
public String getUsageReport() {
    double avgInput = llmCallCount > 0
            ? (double) totalInputTokens / llmCallCount : 0;
    return String.format(
        "Token 统计: 调用 %d 次 | 总输入: %d | 总输出: %d "
        + "| cached: %d | 平均输入: %.0f | 预算: %d (可用: %d)",
        llmCallCount, totalInputTokens, totalOutputTokens,
        totalCachedInputTokens, avgInput,
        contextWindow, getAvailableForConversation()
    );
}
```

主要的优化手段，我按效果排序：

**1. Prompt Caching（效果最大）**。前面说了，能省 80%+ 的重复输入成本。把不变的 system prompt 和工具定义放在 prompt 最前面，让服务端自动缓存。

**2. 减少轮次**。好的 system prompt 能让 LLM 一次做对，减少重试。Multi-Agent 的 Reviewer 重试也是成本点——PaiCLI 限制 Reviewer 最多重试 2 次。

**3. 工具结果裁剪**。工具返回的内容不要全量塞进 prompt。比如 `list_dir` 返回 1000 个文件，只保留前 100 个并告知“还有 900 个文件未显示”。

**4. 选对模型**。简单任务用便宜模型（GLM-5.1，0.5 元/百万 input），复杂任务用贵的。PaiCLI 支持运行时切换，用户可以按需选择。

**5. 长上下文模式**。大窗口模型虽然单 token 不便宜，但省了摘要压缩的那次 LLM 调用——摘要压缩本身也消耗 input + output token。

**6. 历史裁剪**。定期清理不再需要的对话历史中的大块内容——旧截图的 base64（几千 token）、超长的工具结果。PaiCLI 的 `Message.withoutImageContent()` 就是干这个的，把历史图片替换为一行文字说明。

【此处插入 截图目标：一次复杂任务的 token 消耗分布饼图（system prompt、工具定义、对话历史、工具结果各占多少）；关键词：token 消耗、Prompt Caching、成本优化；建议位置：饼图/统计截图】

## 12、面试官问“你用过哪些模型？各自的优缺点？”怎么回答？

这道题不能泛泛而谈“XX 模型好”，得说**具体场景下的体验**。结合 PaiCLI 的实际使用经验来回答：

| 模型 | 优势 | 劣势 | 适合场景 |
|---|---|---|---|
| GLM-5.1 | 便宜（0.5 元/百万）、中文好、有 Coding 专版 | 窗口 200k 不算最大 | 日常开发、中文项目 |
| DeepSeek V4 | 1M 超大窗口、自动前缀缓存 | 高峰期限流 | 大型代码库分析 |
| Kimi K2.6 | 长文本理解好、中文好 | 工具调用偶尔不稳定 | 文档阅读、长文本任务 |
| StepFun Step-3.5 | 性价比高、响应快 | 生态工具少 | 快速原型、简单任务 |
| Claude Sonnet/Opus | 工具调用最稳、推理强 | 贵、中文略弱 | 复杂推理、架构设计 |
| GPT-4o | 多模态强、生态最大 | 贵、国内访问不稳定 | 图片理解、多模态 |

回答要点：

- 不要只说优缺点，要说**你在什么场景下用了什么模型，为什么选它**。比如“DeepSeek V4 在分析大型代码库时，1M 窗口的优势很明显，不需要做 RAG 分块就能直接塞进去”。
- 提到 **运行时切换** 是加分项——“PaiCLI 支持 `/model` 命令在运行时切换，日常开发用 GLM 省成本，遇到复杂架构问题切到 DeepSeek”。
- 提到 **成本意识** 也是加分项——“GLM-5.1 的输入价格只有 DeepSeek 的一半，简单任务没必要用贵的”。

【此处插入 截图目标：PaiCLI 使用不同模型处理同一任务的 token 消耗和时间对比；关键词：GLM、DeepSeek、Kimi、StepFun、对比测试；建议位置：对比表格截图】

### 面试官追问“怎么做模型评估”

如果追到这一步，可以说三个维度：

1. **准确率**：给一组标准任务（读文件、改代码、搜索），看各模型的完成率和轮次
2. **稳定性**：同一任务跑 10 次，看输出是否一致、工具调用是否正确
3. **性价比**：完成同一任务的 token 消耗和费用

PaiCLI 的 `TokenBudget` 天然提供了第三个维度的数据——每次 session 结束都有完整的调用次数、总 input/output token、cached 比例。

## ending

这 12 道题覆盖了多模型适配和成本控制的核心链路：Provider 接口抽象、模板方法模式、OpenAI 兼容协议、运行时切换、Token 计费差异、Prompt Caching 策略、上下文策略自动调整、SSE 增量合并、API Key 优先级、Function Calling 兼容、成本估算与优化、实际模型对比。

每一道题都能回到 PaiCLI 的源码上——`LlmClient.java` 的接口设计、`AbstractOpenAiCompatibleClient` 的模板方法、`LlmClientFactory` 的工厂模式、`ContextProfile` 的无分支策略派生、`TokenBudget` 的预算管理。面试时如果能把这些源码细节信手拈来，面试官对你的印象会完全不一样。

下一篇是这个系列的最后一弹——**综合设计题**，跨领域的架构选型、对比分析、场景设计，我们总结收尾。

---

## 简历包装参考

**项目名称**：PaiCLI - Java AI Agent CLI

**项目简介**：对标 Claude Code 的 Java 实现 AI Agent CLI，支持多模型适配、ReAct/Plan-and-Execute/Multi-Agent 多种推理模式、MCP 协议集成、长上下文管理和流式终端渲染。

**技术栈**：Java 17、OkHttp（SSE 流式通信）、Jackson（JSON 解析）、JGit（快照管理）、SQLite（任务持久化）、JLine/Lanterna（终端 TUI）

**核心职责（多模型与成本方向）**：

1. 设计并实现了基于策略模式 + 模板方法模式的多模型 LlmClient 抽象层，通过 `AbstractOpenAiCompatibleClient` 基类复用 SSE 解析和 tool_calls 合并逻辑，新增 Provider 只需 20-30 行代码
2. 实现运行时模型切换机制（`/model` 命令），基于 `LlmClientFactory` 工厂模式创建新实例，`ContextProfile` 根据模型窗口大小自动调整上下文策略，无 if-else 分支
3. 统一处理四家 Provider（GLM、DeepSeek、Kimi、StepFun）的 Prompt Caching 差异，通过 `promptCacheMode()` 声明式适配自动前缀缓存和手动缓存标记两种模式
4. 基于 `TokenBudget` 实现 token 预算管理和成本估算，结合 Prompt 布局优化（“稳定在前”原则）使 cached token 比例在长 session 中达到 70%+
5. 设计四级 API Key 读取优先级链（config.json > 环境变量 > 项目 .env > 用户 .env），兼顾生产部署安全性和本地开发便利性
