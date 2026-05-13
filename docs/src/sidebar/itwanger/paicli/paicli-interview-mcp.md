---
title: AI Agent 面试题第四弹：MCP 协议、Chrome DevTools、CDP 会话复用 13 题
shortTitle: 面试题：MCP 协议与生态
description: 围绕 PaiCLI 实战，精选 13 道 MCP 协议面试题，覆盖 stdio/HTTP 传输、工具注册、resources、Chrome DevTools 集成和 CDP 会话复用。
tag:
  - Agent
  - 面试题
  - MCP
category:
  - AI
author: 沉默王二
date: 2026-05-11
---

大家好，我是二哥呀。

这是 AI Agent 面试题系列的第四弹。前三篇我们把 Agent 核心架构、工具与安全、记忆与上下文讲完了，这一篇轮到一个绕不开的话题——**MCP 协议与生态**。

MCP 是 2024 年底以来 Agent 领域最火的协议，没有之一。Claude Code、Cursor、Windsurf 全都支持，面试官但凡问 Agent 项目，MCP 出现的频率极高。你说你做了 Agent 项目但不懂 MCP，就像说你做了 Web 项目但不懂 HTTP 一样。

这 13 道题对应 PaiCLI 的第 10、11、13、14 期，从协议原理到源码实现到浏览器集成，全部有代码可查。

## 01、MCP 是什么

MCP，全称 Model Context Protocol，是 Anthropic 在 2024 年底提出的开放协议。一句话说清楚：它定义了 AI 应用（Host/Client）和外部工具/数据（Server）之间的标准通信接口。

为什么需要这么一个协议？因为工具集成太碎片化了。

没有 MCP 之前，每个 AI 应用接入一个新工具就得写一套定制代码。Claude Code 要用 GitHub，写一套。Cursor 要用 GitHub，再写一套。PaiCLI 要用 GitHub，又写一套。三份代码干的是同一件事——调 GitHub API。N 个应用乘以 M 个工具，集成量是 N*M。

有了 MCP，GitHub 官方写一个 MCP Server，所有支持 MCP 的 AI 应用直接接入。N*M 变成 N+M。这个降维打击和当年 USB 统一接口是一个道理。

【此处插入 描述：MCP 的 N+M 集成模型对比 N*M 碎片化模型的示意图；截图目标：展示 Host/Client/Server 三层架构和工具接入的简化效果；关键词：MCP、Host、Client、Server、N+M；建议位置：白板/架构图】

### 它解决了什么问题

核心解决三个问题：

**工具发现**——Host 启动 MCP Server 后，调一次 `tools/list` 就知道这个 Server 提供哪些工具，不用硬编码。PaiCLI 的 `McpClient.listTools()` 就是干这个的。

**工具调用**——统一的 `tools/call` 接口，不管底层是 Git 操作、浏览器操控还是数据库查询，调用方式一模一样。

**数据访问**——`resources/list` + `resources/read` 让 Server 暴露可读取的数据源，LLM 需要上下文信息时随时拿。

MCP 还定义了 **Prompts**（可复用的 prompt 模板），但目前用得最多的还是 Tools 和 Resources。

## 02、MCP 的 stdio 传输和 Streamable HTTP 传输有什么区别

MCP 支持两种传输方式，PaiCLI 两种都实现了。

### stdio（标准输入输出）

Host 通过 `ProcessBuilder` 把 MCP Server 启动为子进程，通过 stdin 发 JSON-RPC 消息，通过 stdout 收响应。Server 的生命周期完全由 Host 管理——Host 退出，stdin EOF，Server 跟着退出。

PaiCLI 的 `StdioTransport.java` 实现了这套机制。启动时构造进程命令，监听 stdout 解析 JSON，stderr 日志单独收集。

适合本地工具，比如 `chrome-devtools-mcp`、`mcp-server-git`。

### Streamable HTTP

Host 通过 HTTP POST 发 JSON-RPC 请求，Server 通过 SSE（Server-Sent Events）流式返回响应。Server 是独立部署的远程服务，和 Host 的生命周期无关。

PaiCLI 的 `StreamableHttpTransport.java` 实现了 HTTP 传输，支持自定义 headers（用于认证）。

适合云端工具、团队共享的 MCP Server。

配置文件里，`command` 字段表示 stdio，`url` 字段表示 HTTP，PaiCLI 自动判断走哪条路：

```json
{
  "mcpServers": {
    "git": { "command": "uvx", "args": ["mcp-server-git"] },
    "remote": { "url": "https://mcp.example.com/v1" }
  }
}
```

源码里 `McpServerManager.createTransport()` 就一个 if-else：

```java
// McpServerManager.java
private McpTransport createTransport(McpServerConfig config) throws IOException {
    if (config.isHttp()) {
        return new StreamableHttpTransport(config.getUrl(), config.getHeaders());
    }
    return new StdioTransport(config.getCommand(), config.getArgs(), config.getEnv(), projectDir);
}
```

【此处插入 描述：stdio 和 Streamable HTTP 两种传输方式的对比示意图；截图目标：展示 Host-Server 之间 stdin/stdout 和 HTTP POST/SSE 两条通信路径；关键词：stdio、HTTP、SSE、ProcessBuilder；建议位置：白板/流程图】

面试官可能追问“为什么不只用 HTTP”。答案是 stdio 更简单、更可靠。本地工具不需要端口管理、不需要网络认证，启动一个进程就完事。而且 stdio 天然隔离——进程挂了就是挂了，不会和其他 Server 互相影响。

## 03、MCP 的 JSON-RPC 通信协议是怎么工作的

MCP 底层用的是 JSON-RPC 2.0，协议本身很简单，只有三种消息类型。

**Request**（请求，有 id，需要响应）：

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/list", "params": {}}
```

**Response**（响应，id 和 Request 配对）：

```json
{"jsonrpc": "2.0", "id": 1, "result": {"tools": [...]}}
```

**Notification**（通知，没有 id，不需要响应）：

```json
{"jsonrpc": "2.0", "method": "notifications/tools/list_changed"}
```

### 请求-响应配对怎么实现

PaiCLI 的 `JsonRpcClient.java` 手写了完整的配对机制。核心数据结构是一个 `ConcurrentHashMap<Long, CompletableFuture<JsonNode>>`——发请求时用自增 id 注册一个 Future，收到响应时按 id 找到对应 Future 并完成它：

```java
// JsonRpcClient.java 核心逻辑
private final AtomicLong ids = new AtomicLong(1);
private final ConcurrentHashMap<Long, CompletableFuture<JsonNode>> pending = new ConcurrentHashMap<>();

public JsonNode request(String method, JsonNode params, long timeoutSeconds) throws IOException {
    long id = ids.getAndIncrement();
    CompletableFuture<JsonNode> future = new CompletableFuture<>();
    pending.put(id, future);
    // 超时调度：timeoutSeconds 后如果还没响应，Future 报 TimeoutException
    scheduler.schedule(() -> {
        CompletableFuture<JsonNode> removed = pending.remove(id);
        if (removed != null) {
            removed.completeExceptionally(new TimeoutException("JSON-RPC request timed out: " + method));
        }
    }, timeoutSeconds, TimeUnit.SECONDS);
    transport.send(request);
    return future.get(timeoutSeconds + 1, TimeUnit.SECONDS);
}
```

消息到达时，`handleMessage` 方法判断有没有 id——有 id 是响应，从 `pending` 里找 Future 完成；没有 id 是通知，交给 notification listener 处理。

```java
private void handleMessage(JsonNode message) {
    JsonNode idNode = message.get("id");
    if (idNode == null || idNode.isNull()) {
        // 没有 id → 通知
        for (Consumer<JsonNode> listener : notificationListeners) {
            listener.accept(message);
        }
        return;
    }
    // 有 id → 响应
    long id = idNode.asLong();
    CompletableFuture<JsonNode> future = pending.remove(id);
    if (future == null) return;
    JsonNode error = message.get("error");
    if (error != null && !error.isNull()) {
        future.completeExceptionally(new JsonRpcException(
                error.path("code").asInt(-32603),
                error.path("message").asText("JSON-RPC error")));
        return;
    }
    future.complete(message.get("result"));
}
```

【此处插入 描述：JSON-RPC 的 initialize → tools/list → tools/call 完整通信流程；截图目标：展示 Host 和 Server 之间的消息交互时序；关键词：JSON-RPC、initialize、tools/list、tools/call；建议位置：白板/时序图】

通信的完整生命周期是这样的：Host 发 `initialize` 协商协议版本和 capabilities → Server 返回支持的能力 → Host 发 `notifications/initialized` 告知准备就绪 → Host 根据 capabilities 调用 `tools/list`、`resources/list` 拉取能力清单 → 正常工作期间 Host 调用 `tools/call` 执行工具 → Server 可随时发 notification 通知状态变更。

## 04、MCP 工具注册到 Agent 后，命名空间怎么设计的

PaiCLI 把每个 MCP 工具注册为 `mcp__{server}__{tool}` 格式。

```
chrome-devtools server 的 navigate_page 工具
→ mcp__chrome-devtools__navigate_page

git server 的 commit 工具
→ mcp__git__commit
```

这个命名规则定义在 `McpToolDescriptor.java` 里，简单到就一行：

```java
// McpToolDescriptor.java
public static String namespaced(String serverName, String toolName) {
    return "mcp__" + serverName + "__" + toolName;
}
```

### 为什么用双下划线

因为工具名本身可能包含单下划线（比如 `navigate_page`、`take_screenshot`）。如果用单下划线做分隔符，`mcp_chrome-devtools_navigate_page` 就分不清 server 名到哪里结束、tool 名从哪里开始。双下划线 `__` 在 MCP 工具名里不会出现，是安全的分隔符。

命名空间带来三个好处：

第一，**避免冲突**。两个 Server 可能都有叫 `search` 的工具，加了 server 前缀就不冲突了。

第二，**安全隔离**。HITL 审批和审计日志可以按 server 前缀做策略。比如用户说“放行整个 chrome-devtools server”，`ApprovalPolicy` 匹配 `mcp__chrome-devtools__*` 前缀就行。

第三，**LLM 可理解**。LLM 看到 `mcp__chrome-devtools__navigate_page` 就知道这是浏览器相关的操作，不用额外解释。

【此处插入 描述：PaiCLI 的 /mcp 命令输出 MCP Server 状态列表；截图目标：展示已注册的 MCP server 及其工具数量；关键词：mcp__、server、tools、ready；建议位置：终端会话窗口】

## 05、MCP 的 resources 是什么

Resources 是 MCP 的第二大能力。Tools 是可执行的函数——有输入参数，有副作用，会改变状态。Resources 是可读取的数据源——通过 URI 访问，返回内容，只读无副作用。

打个比方：Tools 是 API 的 POST 端点，Resources 是 GET 端点。

PaiCLI 对 resources 的实现很有意思，走了一条**双轨策略**。

### 和 tools 有什么区别

从协议层面说，Tools 用 `tools/call` 调用，可以干任何事（读写文件、执行命令、发请求）。Resources 用 `resources/read` 读取，只返回内容，语义上保证无副作用。

但实际使用中 LLM 不能直接调用 `resources/read`——因为 Function Calling 协议里只有 tools 的概念，没有 resources。所以 PaiCLI 的双轨策略就是为了弥补这个 gap。

**工具轨**：为每个支持 resources 的 Server 自动注册两个虚拟工具：

```
mcp__{server}__list_resources → 列出可用资源
mcp__{server}__read_resource  → 读取指定资源内容
```

这两个虚拟工具定义在 `McpResourceTool.java` 里，LLM 可以像调普通工具一样调用它们。当 LLM 觉得需要探索某个 Server 有什么数据，先调 `list_resources`，看到感兴趣的 URI 再调 `read_resource` 读内容。

```java
// McpResourceTool.java — 自动注册的虚拟工具
public static List<McpToolDescriptor> descriptors(String serverName) {
    return List.of(
        new McpToolDescriptor(serverName, LIST_RESOURCES,
            McpToolDescriptor.namespaced(serverName, LIST_RESOURCES),
            "列出 MCP server 暴露的 resources，返回 URI、名称、MIME 类型和描述",
            emptyObjectSchema()),
        new McpToolDescriptor(serverName, READ_RESOURCE,
            McpToolDescriptor.namespaced(serverName, READ_RESOURCE),
            "读取 MCP resource 内容。参数 uri 必须来自 list_resources 或用户明确提供的 resource URI",
            readResourceSchema())
    );
}
```

**用户 @-mention 轨**：用户在输入里写 `@server:protocol://path`，PaiCLI 在提交给 Agent 之前自动展开为 `<resource>` 内联块。这条路径不经过 LLM 决策，用户明确指定了要读什么。

两条轨道覆盖不同场景：LLM 主动探索用工具轨，用户明确指定用 @-mention 轨。

【此处插入 描述：resources 双轨策略的流程图；截图目标：展示工具轨（LLM 调用 list_resources/read_resource）和 @-mention 轨（用户输入直接展开）的两条路径；关键词：resources、双轨、list_resources、@-mention；建议位置：白板/流程图】

## 06、MCP Server 启动失败或超时怎么处理

这道题面试官很喜欢问，因为它考的是工程健壮性。

MCP Server 的启动可能很慢。chrome-devtools-mcp 首次启动要 `npx` 拉包加 Chrome 冷启动，20 秒以上是常事。某些 Python 写的 MCP Server 用 `uvx` 启动，首次下载依赖也得十几秒。

### PaiCLI 怎么处理

PaiCLI 的 `McpServerManager.java` 做了五层处理。

第一，**超时设置**。`initialize` 默认 60 秒超时。这个值是从实战中调出来的——最早设的 30 秒，chrome-devtools 经常打不住，后来改成 60 秒。用户还可以通过环境变量 `PAICLI_MCP_INITIALIZE_TIMEOUT_SECONDS` 自定义。

```java
// McpClient.java — 超时配置
private static final int DEFAULT_INITIALIZE_TIMEOUT_SECONDS = 60;
private static final String INITIALIZE_TIMEOUT_ENV = "PAICLI_MCP_INITIALIZE_TIMEOUT_SECONDS";
```

第二，**并行启动**。多个 Server 用专属 daemon 线程池并行启动，慢的不阻塞快的。线程池上限 8 个线程，避免 fork 太多进程。

```java
// McpServerManager.java — 并行启动
ExecutorService executor = Executors.newFixedThreadPool(
    Math.min(targets.size(), 8),
    r -> {
        Thread t = new Thread(r, "paicli-mcp-startup-" + threadId.incrementAndGet());
        t.setDaemon(true);
        return t;
    });
List<CompletableFuture<Void>> futures = targets.stream()
    .map(server -> CompletableFuture.runAsync(() -> start(server), executor))
    .toList();
CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();
```

第三，**进度提示**。启动期间每 5 秒打印一次等待状态，告诉用户哪些 Server 还没就绪、已经等了多久。

第四，**优雅降级**。某个 Server 启动失败，`start()` 方法 catch 异常后只标记该 Server 为 ERROR 状态，不影响其他 Server 和主程序。

第五，**手动重启**。`/mcp restart <name>` 可以单独重启失败的 Server。

设计原则就一句话：**MCP Server 的故障不应该影响 Agent 的核心功能**。没有浏览器 MCP，Agent 照样能读写文件、执行命令、搜索代码。

【此处插入 描述：PaiCLI 启动时 MCP Server 状态摘要输出；截图目标：展示多个 server 的启动状态（ready/error/disabled）和工具数量统计；关键词：MCP server、启动、ready、error、工具；建议位置：终端会话窗口】

## 07、Chrome DevTools MCP 能干什么

Chrome DevTools MCP 是 Google 官方发布的 MCP Server，提供 28 个浏览器操作工具。PaiCLI 第 13 期接入了这个 Server。

| 类别 | 工具 | 用途 |
|---|---|---|
| 导航 | navigate_page, new_page, close_page | 打开/关闭页面 |
| 快照 | take_snapshot, take_screenshot | 获取 DOM 文本或截图 |
| 交互 | click, fill, fill_form, type_text | 模拟用户操作 |
| 调试 | evaluate_script, get_console_message | 执行 JS、查看控制台 |
| 网络 | list_network_requests, get_network_request | 监控网络请求 |

说白了就是让 LLM 能“操作浏览器”。打开网页、填表单、点按钮、截图、抓网络请求，全都能干。

### 和 web_fetch 怎么分工

PaiCLI 同时有 `web_fetch`（基于 OkHttp 的纯 HTTP 请求）和 Chrome DevTools MCP 两条路径。什么时候走哪条，写在 system prompt 的工具选择决策表里：

```
需要拿页面内容？
├── 静态页面 / 服务端渲染 → web_fetch（快、成本低）
├── SPA / JS 渲染 → 浏览器 MCP → take_snapshot
├── 防爬墙站点（微信、知乎） → 浏览器 MCP
├── 需要登录 → 浏览器 MCP + CDP 会话复用
└── 需要表单交互 → 浏览器 MCP → fill_form + click
```

LLM 根据任务特征自己判断走哪条路。大部分情况判断准确，偶尔会用 web_fetch 去抓 SPA 页面拿到一堆空 div，这时候 LLM 会自己意识到不对，自动切到浏览器 MCP 重试。

【此处插入 描述：Chrome DevTools MCP 操控浏览器的实际效果截图；截图目标：展示 PaiCLI 通过 MCP 工具调用打开页面、填表单或截图的终端输出；关键词：chrome-devtools、navigate_page、take_snapshot、浏览器操控；建议位置：终端会话窗口】

## 08、CDP 会话复用是怎么实现的

### 为什么需要会话复用

Chrome DevTools MCP 默认用 `--isolated=true` 启动，每次创建一个全新的浏览器 profile。干净是干净了，但没有任何登录态。想抓 GitHub Dashboard、企业内部系统、付费内容？抱歉，全是登录页。

### PaiCLI 怎么做

PaiCLI 第 14 期实现了 CDP（Chrome DevTools Protocol）会话复用：

1. 用户在自己的 Chrome 浏览器里正常登录各种网站
2. Chrome 144+ 支持通过 `chrome://inspect/#remote-debugging` 远程调试
3. 用户在 PaiCLI 里执行 `/browser connect`，把 chrome-devtools MCP 从 `--isolated=true` 切到 `--autoConnect` 模式
4. MCP Server 连接到用户已有的 Chrome 实例，复用全部登录态

这样 Agent 就能直接访问用户已登录的页面了。GitHub 的 private repo、微信公众号后台、公司内网——只要用户的 Chrome 登录过，Agent 都能访问。

但这带来了安全风险。Agent 能操作用户的真实浏览器，万一点了“确认转账”怎么办？所以 PaiCLI 的 `BrowserGuard.java` 做了三层安全约束。

**敏感页面识别**：`SensitivePagePolicy` 维护一组 URL 匹配规则（银行、支付、邮箱等）。命中敏感页面后，改写型工具（click、fill_form、evaluate_script 等）强制单步 HITL 审批，不能复用“全部放行”。

```java
// BrowserGuard.java — 敏感页面检查
private static final Set<String> WRITE_TOOLS = Set.of(
    "click", "drag", "fill", "fill_form", "handle_dialog",
    "hover", "press_key", "resize_page", "upload_file", "evaluate_script"
);

if (match.matched() && WRITE_TOOLS.contains(localTool)) {
    return BrowserCheckResult.requireApproval(
        "敏感页面命中规则 " + match.pattern() + "，本次浏览器改写操作必须单步审批",
        metadata);
}
```

**Tab 保护**：shared 模式下 `close_page` 只能关闭 PaiCLI 自己创建的 tab。用户正在看的页面 Agent 关不掉。

**模式切换清空信任**：从 shared 切到 isolated 或反过来时，自动清空该 server 维度的全部放行。防止用户在 isolated 模式下放行了 chrome-devtools，切到 shared 模式后这些放行还在生效。

【此处插入 描述：/browser connect 命令的执行效果和安全提示；截图目标：展示 PaiCLI 切换到 shared 浏览器模式的终端输出和安全警告；关键词：browser connect、shared、isolated、CDP 会话复用；建议位置：终端会话窗口】

## 09、MCP 的 notifications 机制是怎么工作的

MCP Server 可以主动向 Host 发送通知，告知状态变更。通知是单向的——没有 id，不需要 Host 回复。

三种标准通知：

- `notifications/tools/list_changed`：工具列表变了
- `notifications/resources/list_changed`：资源列表变了
- `notifications/resources/updated`：某个资源内容更新了

PaiCLI 的通知处理由 `NotificationRouter.java` 负责。这个类实现了 `Consumer<JsonNode>`，按 method 路由到对应的 handler。

```java
// McpServerManager.java — 注册通知处理器
private void registerNotificationHandlers(McpServer server, McpClient client) {
    NotificationRouter router = new NotificationRouter();
    router.on("notifications/tools/list_changed", ignored -> {
        List<McpToolDescriptor> tools = buildToolList(server, client);
        replaceTools(server, client, tools);
        server.tools(tools);
    });
    router.on("notifications/resources/list_changed",
        ignored -> resourceCache.invalidateServer(server.name()));
    router.on("notifications/resources/updated", params -> {
        String uri = params.path("uri").asText("");
        if (!uri.isBlank()) {
            resourceCache.invalidateResource(server.name(), uri);
        }
    });
    client.onNotification(router);
}
```

### 为什么 handler 要异步执行

`NotificationRouter` 源码里有一段很精彩的注释，我直接贴过来：

> handler 在独立 daemon executor 里执行，不在 transport 的 stdout reader 线程里同步执行。否则 handler 内部如果要发 JSON-RPC 请求并等响应，自己等自己的响应，stdout reader 被阻塞读不到响应 → 死锁。

典型场景就是：Server 启动后立即推送 `tools/list_changed`，handler 要调 `tools/list` 重新拉取工具列表。如果 handler 跑在 stdout reader 线程里，`tools/list` 的响应进了 buffer 但没人读——因为 reader 线程被 handler 占着——死锁。

所以 `NotificationRouter` 用一个 `newSingleThreadExecutor` 做异步派发，handler 和 reader 线程完全隔离。

PaiCLI 明确**不做主动探活**（health ping / heartbeat）。原因是按量或按月计费的远程 MCP Server，主动 ping 会产生额外费用。Server 挂没挂，等用户真正调用时自然知道。

【此处插入 描述：notifications 机制的时序图；截图目标：展示 Server 推送 tools/list_changed → NotificationRouter 异步派发 → 重新拉取工具列表的流程；关键词：notification、tools/list_changed、异步派发、NotificationRouter；建议位置：白板/时序图】

## 10、MCP 的 tools/call 返回结果是什么格式

`tools/call` 的返回是一个 `content` 数组，每个元素有 type 字段区分类型：

```json
{
  "content": [
    {"type": "text", "text": "操作成功"},
    {"type": "image", "data": "base64...", "mimeType": "image/png"},
    {"type": "resource", "resource": {"uri": "file://...", "text": "..."}}
  ]
}
```

### 怎么回灌给 LLM

PaiCLI 的 `McpCallToolResult.java` 负责把这个结构转成 `ToolOutput`。转换逻辑按 type 分流：

**text**：直接拼接成字符串，作为 tool message 的 content 回灌给 LLM。

**image**：这个比较复杂。先用 `ImageProcessor` 解码 base64，如果处理成功，生成一个 `ContentPart`（图片块），PaiCLI 在下一轮对话里把它作为图片附件发给 LLM。如果处理失败（图片太大或格式不支持），fallback 为文本提示“请用 take_snapshot 获取 DOM 文本快照”。

```java
// McpCallToolResult.java — image 处理
private static String formatImage(McpContent item, List<LlmClient.ContentPart> imageParts) {
    // ...
    if (hasData) {
        try {
            processed = ImageProcessor.fromBase64(item.data(), mimeType);
            imageParts.add(ImageProcessor.toContentPart(processed));
        } catch (Exception e) {
            error = e.getMessage();
        }
    }
    // fallback 文本描述...
}
```

**resource**：提取文本内容，拼接到 text 结果里。

如果 `isError` 为 true，整个结果会被包装成 `"MCP 工具返回错误: ..."` 的格式，LLM 看到后知道调用失败了，可以决定重试还是换思路。

【此处插入 描述：tools/call 返回的 text + image 混合结果在终端的渲染效果；截图目标：展示 MCP 工具返回截图后 PaiCLI 的处理输出（文本描述 + 图片标记）；关键词：tools/call、content、image、text、ToolOutput；建议位置：终端会话窗口】

## 11、如果让你设计一个 MCP Server，你会怎么做

面试开放题。能说清楚以下六步就很加分了。

**第一步，确定传输方式**。你的工具跑在用户本地，选 stdio。跑在云端给多个用户共享，选 Streamable HTTP。

**第二步，定义 capabilities**。你的 Server 提供 tools、resources 还是 prompts？在 `initialize` 响应里明确声明。不支持的能力不要假装支持——PaiCLI 的 `McpClient` 会检查 `serverCapabilities.has("resources")` 来决定要不要调 `resources/list`。

**第三步，设计工具**。每个工具职责单一，参数 schema 严格定义（类型、必填、描述），返回值用 text 加可选 image。工具描述写给 LLM 看，要清楚说明“这个工具干什么、什么时候该用、什么时候不该用”。

**第四步，做好错误处理**。工具执行失败返回 `isError: true` 和有意义的错误信息。别返回一堆 Java stack trace，LLM 看不懂。返回“文件不存在: /path/to/file”这种人话，LLM 才能判断下一步。

**第五步，管好生命周期**。stdio 模式下，Server 要正确处理 stdin EOF（Host 退出时）并清理资源——关数据库连接、停后台线程。HTTP 模式下要处理 session 超时和并发请求。

**第六步，标注安全信息**。如果 Server 能访问敏感数据或执行危险操作，在 tool description 里标注。PaiCLI 的 HITL 机制会根据描述里的关键词调整审批策略。

【此处插入 描述：一个自定义 MCP Server 的最小代码结构示意；截图目标：展示 Server 的 initialize → tools/list → tools/call 实现骨架；关键词：MCP Server、设计、capabilities、tools/list；建议位置：代码截图或白板】

## 12、MCP 和 OpenAI 的 Function Calling 有什么关系

这两个东西层次不同，不矛盾。

**Function Calling** 是 LLM API 层的协议。它定义了两件事：怎么告诉 LLM “你有哪些工具可用”（请求体的 `tools` 字段），以及 LLM 怎么告诉 Agent “我要调这个工具”（响应体的 `tool_calls` 字段）。GLM、DeepSeek、Kimi 都兼容这套协议。

**MCP** 是工具提供方的协议。它定义了怎么发现工具（`tools/list`）、怎么描述工具（name + description + inputSchema）、怎么调用工具（`tools/call`）。

### 能共存吗

PaiCLI 就是两者共存的典型例子。整条链路是这样的：

```
MCP Server → tools/list → 拿到工具定义（McpToolDescriptor）
→ 转换成 Function Calling 格式 → 塞进 LLM 请求的 tools 字段
→ LLM 返回 tool_calls（选了某个 MCP 工具）
→ Agent 通过 MCP tools/call 执行
→ 结果回灌给 LLM
```

MCP 负责“工具从哪来、怎么执行”，Function Calling 负责“怎么告诉 LLM、LLM 怎么选择”。PaiCLI 的内置工具（read_file、execute_command 等）只走 Function Calling 不走 MCP，MCP 工具两者都走。

所以如果面试官问“你们是用 MCP 还是 Function Calling”，正确答案不是“二选一”，而是“一起用，各管各的层”。

【此处插入 描述：MCP 和 Function Calling 的层次关系图；截图目标：展示 MCP Server → McpToolDescriptor → Function Calling tools 字段 → LLM tool_calls → MCP tools/call 的完整链路；关键词：MCP、Function Calling、tools、tool_calls；建议位置：白板/架构图】

## 13、MCP 的 schema 清洗是什么

MCP Server 返回的工具参数 schema 是标准 JSON Schema，但 LLM 不是 JSON Schema 解析器。有些结构 LLM 处理不好。

### 为什么需要清洗

三个典型问题：

**`$ref` 引用**。JSON Schema 允许用 `$ref` 引用其他位置的定义，但 LLM 不会去“查字典”，它看到 `$ref: "#/definitions/Foo"` 就懵了，生成的参数大概率不对。

**`anyOf` / `oneOf` 联合类型**。参数可以是 string 也可以是 number，LLM 容易选错类型，或者干脆两种都试一下搞出不合法的 JSON。

**超长 description**。有些 MCP Server 的工具描述写了几千字（把整个 API 文档塞进去了），LLM 被这些信息淹没，反而搞不清核心参数是什么。

### PaiCLI 怎么做

`McpSchemaSanitizer.java` 在注册工具时自动清洗 schema：

```java
// McpSchemaSanitizer.java — 核心清洗逻辑
private static JsonNode clean(JsonNode node) {
    if (node.isObject()) {
        ObjectNode object = (ObjectNode) node;
        // 移除 LLM 不理解的引用
        object.remove("$schema");
        object.remove("$id");
        object.remove("$ref");

        // 把 anyOf/oneOf 简化为描述文本
        for (String keyword : new String[]{"anyOf", "oneOf"}) {
            JsonNode union = object.remove(keyword);
            if (union != null && union.isArray()) {
                // 把 union type 的选项拼成人话塞进 description
                alternatives.append(keyword).append(" options: ");
                // ...
            }
        }

        // 截断超长描述
        if ("description".equals(field.getKey()) && child.isTextual()) {
            object.put("description", truncateDescription(child.asText()));
        }
    }
    return node;
}

private static String truncateDescription(String description) {
    if (description == null || description.length() <= MAX_DESCRIPTION_CHARS) {
        return description;
    }
    return description.substring(0, MAX_DESCRIPTION_CHARS) + "...";
}
```

`MAX_DESCRIPTION_CHARS` 设的 1000 字符。`$ref` 直接移除，`anyOf` / `oneOf` 转成自然语言描述放到 description 里。如果 schema 连 `type` 字段都没有，兜底补一个 `"type": "object"`。

清洗后的 schema 对 LLM 来说更友好，工具调用的参数合法率明显提升。在 `McpClient.listTools()` 里，每个工具的 schema 都会经过 `McpSchemaSanitizer.sanitize()` 处理后才注册：

```java
// McpClient.java — 注册时清洗 schema
JsonNode schema = McpSchemaSanitizer.sanitize(tool.path("inputSchema"));
descriptors.add(new McpToolDescriptor(serverName, name,
    McpToolDescriptor.namespaced(serverName, name), description, schema));
```

【此处插入 描述：清洗前后的 JSON Schema 对比；截图目标：展示原始 schema（含 $ref、anyOf）和清洗后 schema（展开后的简洁结构）的 diff；关键词：schema 清洗、$ref、anyOf、McpSchemaSanitizer；建议位置：代码对比截图】

## ending

这 13 道题把 MCP 协议从原理到实现过了一遍：传输机制两条路（stdio / HTTP），JSON-RPC 三种消息（request / response / notification），工具命名空间设计，resources 双轨策略，Chrome DevTools 浏览器操控，CDP 会话复用的安全约束，notifications 的异步派发防死锁，schema 清洗让 LLM 更好用。

对应的源码全在 PaiCLI 仓库里：`McpServerManager.java` 管 Server 生命周期，`JsonRpcClient.java` 管通信配对，`McpToolDescriptor.java` 管命名空间，`McpResourceTool.java` 管 resources 虚拟工具，`McpSchemaSanitizer.java` 管 schema 清洗，`BrowserGuard.java` 管浏览器安全，`NotificationRouter.java` 管通知路由。面试时能对着源码讲清楚这些设计决策，面试官就知道你不是纸上谈兵。

下一篇我们进入**Prompt 工程与 Skill 系统**——system prompt 分层架构、KV Cache 优化、Skill 加载机制。

---

**简历包装**

**项目名称**：PaiCLI — Java Agent CLI（对标 Claude Code）

**项目简介**：从零开始用 Java 实现的终端 AI Agent，支持 MCP 协议接入外部工具生态，集成 Chrome DevTools 浏览器操控和 CDP 会话复用，覆盖 ReAct、Plan-and-Execute、Multi-Agent 三种架构模式。

**技术栈**：Java 17、Maven、GLM-5.1/DeepSeek V4/Kimi K2.6 多模型、OkHttp + SSE 流式解析、JLine3 终端交互、JSON-RPC 2.0 协议、Chrome DevTools Protocol

**核心职责**：

1. 实现 MCP 协议客户端（`McpClient` + `JsonRpcClient`），支持 stdio 和 Streamable HTTP 双传输，手写 JSON-RPC 请求-响应 id 配对、超时调度和通知路由（`NotificationRouter` 异步派发防 reader 线程死锁）
2. 设计 MCP 工具命名空间 `mcp__{server}__{tool}` 并实现 resources 双轨策略（LLM 工具轨 + 用户 @-mention 轨），为每个支持 resources 的 Server 自动注册 `list_resources` / `read_resource` 虚拟工具
3. 集成 Chrome DevTools MCP（28 个浏览器操作工具），实现 CDP 会话复用（`/browser connect`），通过 `BrowserGuard` 实施敏感页面强制审批、Tab 保护和模式切换信任清空三层安全机制
4. 实现 `McpSchemaSanitizer` 对 MCP Server 返回的 JSON Schema 做 LLM 友好清洗（展开 $ref、简化 anyOf/oneOf、截断超长 description），工具调用参数合法率显著提升
5. 实现 MCP Server 并行启动、进度提示、优雅降级和手动重启机制（`McpServerManager`），单 Server 故障不影响 Agent 核心功能和其他 Server 运行
