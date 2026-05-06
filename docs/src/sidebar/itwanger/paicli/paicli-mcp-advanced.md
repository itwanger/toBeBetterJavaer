---
title:
shortTitle:
description: PaiCLI 第 11 期，MCP 高级能力实现：resources 双轨读取、@-mention 展开、被动通知、运行中取消，附源码解析和简历包装。
tag:
  - Agent
  - MCP
category:
  - AI
author: 沉默王二
date: 2026-04-29
---

大家好，我是二哥呀。

上一期我们给 PaiCLI 接入了 MCP 协议的核心能力，能调用外部工具了。但用了几天之后我就发现，光能调工具还不够。

MCP Server 除了暴露工具，还能暴露数据。比如一个文件系统 Server，它不光能帮你读写文件（工具），还能把整个目录结构作为资源列表暴露出来（resources）。再比如一个数据库 Server，工具是执行 SQL，resources 是表结构和字段说明。

这些数据如果 Agent 能直接读到，很多任务根本不需要先"调工具查一下"，直接把数据喂给模型就行了。

说实话这一期的内容我自己写的时候也比较懵，因为 MCP 协议的 resources 和 notifications 在日常使用中很少被提到，大部分文章和教程都只讲 tools/call。但如果你想完整实现 MCP 协议，或者看 Claude Code 的 MCP 对接代码，会发现 resources 和 notifications 是绕不过去的。

这一期我们就来补齐 MCP 的高级能力：resources 读取、@-mention 语法、被动通知和运行中取消。我尽量用大白话来讲，把每个概念拆到最小。

【此处插入PaiCLI v11运行截图：截图目标：展示banner升级到v11和MCP-Native标语；关键词：v11.0.0、MCP-Native Agent CLI；建议位置：命令行】

## 01、先看效果

先不讲原理，看看这期做完之后 PaiCLI 能干什么。

第一个能力，resources 工具层。如果 MCP Server 声明了 resources 能力，PaiCLI 会自动注册两个虚拟工具：`list_resources` 和 `read_resource`。Agent 在执行任务时可以主动调用这两个工具来浏览和读取 Server 暴露的资源。

第二个能力，@-mention。我们可以在输入的时候直接引用资源：

```text
帮我看下 @filesystem:file://README.md 这份文档
```

PaiCLI 会在提交给 Agent 之前，自动把 `@filesystem:file://README.md` 展开成文档的实际内容，用 `<resource>` 标签包裹起来。Agent 拿到的就是真实的文件内容，不需要再额外调工具去读。

第三个能力，被动通知。Server 如果更新了工具列表或者资源内容，会主动推送通知过来，PaiCLI 收到后自动刷新缓存，不需要重启。

第四个能力，运行中取消。任务执行期间输入 `/cancel` 就能中断当前任务，Agent 不会继续往下执行了。以前如果 Agent 跑偏了，要么等它自己结束，要么 Ctrl+C 退出整个程序丢掉所有上下文。现在可以优雅中断，Agent 停下来之后上下文还在，可以继续对话。

还有两个 CLI 小命令：`/mcp resources <server>` 查看 Server 有哪些资源，`/mcp prompts <server>` 查看 Server 有哪些 Prompt 模板。

【此处插入@-mention展开效果截图：截图目标：展示用户输入@语法后Agent收到展开内容；关键词：@filesystem、resource标签、文件内容；建议位置：命令行】

这四个能力加在一起，PaiCLI 对 MCP 协议的实现就从"能用"进化到"好用"了。上一期只有 Tools，这一期补齐了 Resources 和 Notifications，MCP 协议三大核心概念（Tools、Resources、Prompts）我们已经覆盖了两个半（Prompts 只做了查看，还没做注入）。

## 02、Resources 到底是什么

MCP 协议里有三个核心概念：Tools（工具）、Resources（资源）、Prompts（提示词模板）。上一期我们实现了 Tools，这一期的重头戏是 Resources。

Resources 和 Tools 的区别在哪？一句话：Tools 是动作，Resources 是数据。

调用一个 Tool，Server 会执行某个操作（读文件、跑命令、发请求），然后返回结果。读取一个 Resource，Server 只是把已有的数据交出来，没有副作用。

为什么要把数据单独抽成 Resources，而不是全部用 Tools？因为 Agent 调用 Tool 是有成本的。每次调用 Tool 都要走一轮 LLM 推理（模型决定调哪个工具、拼参数、等返回、再推理下一步），Token 消耗和延迟都不小。

如果某些数据是静态的、可预知的，比如数据库的表结构、项目的目录树、配置文件的内容，提前喂给 Agent 比让它自己去查效率高得多。

打个比方，你让同事帮你改一个 bug。Tool 的方式相当于你跟同事说"自己去看代码"，然后同事打开 IDE，一个文件一个文件翻。Resource 的方式相当于你直接把报错日志和相关代码贴给他，他看完就能动手。哪种方式更快？显然是后者。

MCP 协议里 Resources 有自己的 URI 体系，格式跟我们熟悉的 URL 类似：`file://README.md`、`postgres://users/schema`、`git://HEAD/src/main`。每个 Resource 有 URI、名称、MIME 类型和描述，Client 可以通过 `resources/list` 拿到完整列表，通过 `resources/read` 拿到具体内容。

PaiCLI 实现 Resources 用了"双轨"的方式。

【此处插入MCP资源概念图：截图目标：对比Tool和Resource的区别；关键词：Tool是动作、Resource是数据、URI体系；建议位置：白板/画图】

### 工具层：自动注册虚拟工具

PaiCLI 在启动 MCP Server 的时候，会检查 Server 在 `initialize` 握手时返回的 capabilities 字段。如果声明了 `resources` 能力，PaiCLI 会做两件事：

第一，调用 `resources/list` 拿到资源列表，缓存起来。

第二，自动注册两个虚拟工具到 ToolRegistry：

- `mcp__{server}__list_resources`：列出 Server 暴露的所有资源
- `mcp__{server}__read_resource`：根据 URI 读取某个资源的内容

这两个虚拟工具跟普通 MCP 工具一样，受 HITL 人工审批管理，也会被 AuditLog 记录。Agent 在执行任务时，如果觉得需要了解 Server 有什么资源，就会自动调用 `list_resources`；如果想读某个具体资源，就调 `read_resource`。

【此处插入McpResourceTool源码截图：截图目标：展示虚拟工具的schema定义和invoker实现；关键词：descriptors、LIST_RESOURCES、READ_RESOURCE；建议位置：IDE】

代码在 `McpResourceTool.java` 里，核心逻辑不到 80 行。`descriptors()` 方法定义了两个工具的 schema，`invoker()` 方法返回一个 `Function<String, String>`，接收 JSON 格式的参数，内部就是转发到 McpClient 的 `listResources()` 和 `readResource(uri)`。

`read_resource` 的 schema 里有一个必填参数 `uri`，类型是 string。Agent 在调用的时候需要先通过 `list_resources` 拿到可用的 URI 列表，然后从中选一个传给 `read_resource`。这个设计确保了 Agent 不会凭空编造 URI，减少幻觉。

有一点需要注意：虚拟工具的命名格式是 `mcp__{server}__{tool}`，两个下划线分隔。比如 filesystem Server 的资源工具叫 `mcp__filesystem__list_resources`。这跟上一期实现的普通 MCP 工具命名规则一样，ToolRegistry 里统一管理，不会跟内置工具冲突。

### 缓存层：脏标记而非删除

`McpResourceCache` 用 ConcurrentHashMap 存每个 Server 的资源列表，但刷新策略不是简单的"清空重拉"，而是用脏标记（stale flag）。

收到 `resources/list_changed` 通知时，只标记该 Server 为 stale，不立刻清空缓存。下次有人访问这个 Server 的资源列表时，发现标记为 stale 才去重拉。

收到 `resources/updated` 通知时，只标记具体的 URI 为 stale，不影响同 Server 下的其他资源。

这个设计的好处是：通知可能来得很密集（Server 批量更新资源），但实际读取可能很久以后才发生，没必要每次通知都去重拉。懒加载嘛，用到的时候再刷新，省了大量无用的网络请求。

缓存用 `ConcurrentHashMap` 存储，线程安全。stale 标记也用的是 `ConcurrentHashMap.newKeySet()`，本质是一个并发安全的 Set。因为通知可能从任意线程推过来（NotificationRouter 的 executor 线程），而资源读取可能在 Agent 的执行线程里发生，两个线程同时操作缓存，必须保证线程安全。

【此处插入McpResourceCache源码截图：截图目标：展示stale标记和invalidate逻辑；关键词：staleServers、staleUrisByServer、invalidateServer；建议位置：IDE】

## 03、@-mention 怎么用

双轨的第二轨是用户输入层的 @-mention 语法。

语法格式是 `@{server}:{protocol}://{path}`，比如：

```text
帮我看下 @filesystem:file://README.md 这份文档
@db:postgres://users/schema 这个表结构有什么问题
```

PaiCLI 在把用户输入提交给 Agent 之前，会先经过 `AtMentionExpander` 处理。它做的事情很简单：找到所有 @-mention，依次调用对应 Server 的 `readResource` 拿到内容，然后把原文中的 @-mention 替换成展开后的 `<resource>` 块。

展开后 Agent 看到的是这样的：

```xml
<resource server="filesystem" uri="file://README.md" mimeType="text/markdown">
# PaiCLI
一个基于 Java 的 AI Agent 命令行工具...
</resource>
```

`AtMentionParser` 负责解析，用正则 `@([a-zA-Z][\w-]*):([a-z]+)://([^\s@]+)` 匹配。有个细节值得说一下：它会跳过引号内的 @-mention。如果用户写的是 `"@filesystem:file://test.txt"`，引号里的不会被展开。这个设计是为了兼容代码片段里可能出现的 @ 符号。

【此处插入AtMentionParser源码截图：截图目标：展示正则匹配和引号跳过逻辑；关键词：RESOURCE_PATTERN、isInsideQuotes、MentionToken；建议位置：IDE】

`AtMentionExpander` 展开时还有一个 20 万字符的截断保护。如果某个资源内容超过 200,000 字符，会截断并在末尾加上 `[resource truncated by PaiCLI at 200000 chars]`。这是为了防止一个巨大的资源把上下文撑爆。

为什么是 @-mention 而不是自动注入？因为自动注入的问题是：你不知道 Agent 当前任务需要哪些资源。全部注入太浪费上下文，按需注入又需要额外的推理判断。@-mention 把选择权交给用户，用户知道 Agent 这次需要看什么，直接指定就行。

这个设计参考了 Claude Code 的做法。Claude Code 里用 `@` 可以引用文件，Cursor 里也有类似的语法。但 PaiCLI 的 @-mention 不只是引用本地文件，它引用的是 MCP Server 暴露的任意资源。文件系统、数据库、Git 仓库、API 文档，只要 Server 把数据暴露成 Resource，用户就能用 @-mention 引用。

另外，@-mention 只在用户输入里识别，不识别模型输出。这个限制是故意的，防止模型在回复中构造 @-mention 来偷偷读取资源。Plan 模式和 Team 模式的单键交互也不接 @-mention 的自动补全，避免干扰 ESC 和 Ctrl+O 这些快捷键。

【此处插入@-mention自动补全截图：截图目标：展示输入@后的补全候选列表；关键词：@filesystem、@db、补全列表；建议位置：命令行】

## 04、被动通知

MCP 协议是双向的，这一点很多人忽略了。Client 可以调 Server 的方法（request），Server 也可以主动推消息给 Client（notification）。

这种 Server 主动推过来的消息叫 Notification（通知）。PaiCLI 目前处理两种通知：

- `notifications/tools/list_changed`：Server 的工具列表变了
- `notifications/resources/list_changed` 和 `notifications/resources/updated`：Server 的资源列表变了或某个资源内容更新了

收到工具列表变更通知后，PaiCLI 会重新调 `tools/list`，拿到最新的工具列表，然后用 `ToolRegistry.replaceMcpToolsForServer()` 做原子替换，不影响其他 Server 的工具。

收到资源变更通知后，标记对应缓存为 stale，下次访问时重拉。

`NotificationRouter` 的实现有一个很关键的设计决策：handler 必须在独立线程里执行，不能在 transport 的 reader 线程里同步执行。

为什么？因为 handler 内部可能需要发 JSON-RPC 请求。比如收到 `tools/list_changed`，handler 要调 `tools/list` 重拉工具列表。如果 handler 在 reader 线程里同步执行，那它发出 `tools/list` 请求后，需要等 reader 线程来读取响应。但 reader 线程正在执行 handler，被阻塞了，读不到响应。自己等自己，这就是经典的死锁。

【此处插入NotificationRouter源码截图：截图目标：展示异步派发设计和注释中的死锁说明；关键词：dispatcher、daemon线程、避免死锁；建议位置：IDE】

解决方案是用一个单线程的 daemon executor 来异步派发 handler。reader 线程收到通知后只做一件事：往 executor 的队列里丢一个任务，然后立刻返回继续读下一条消息。handler 在 executor 线程里执行，不阻塞 reader。

这个坑是在对接 `server-everything`（MCP 官方的测试 Server）时踩到的。这个 Server 启动后会立刻推送 `tools/list_changed`，如果 handler 同步执行，第一次 `tools/list` 就会超时。

用一张图来说明死锁的过程：

```text
reader 线程：收到 tools/list_changed → 同步执行 handler
                                         ↓
handler：调用 tools/list 发请求 → 等 reader 线程读响应
                                         ↓
reader 线程：还在执行 handler，没法读响应 → 死锁
```

异步派发之后：

```text
reader 线程：收到 tools/list_changed → 丢到 executor 队列 → 继续读消息
executor 线程：从队列取出 handler → 调 tools/list → reader 线程读到响应 → 完成
```

`NotificationRouter` 实现了 `Consumer<JsonNode>` 接口，同时实现了 `AutoCloseable`。PaiCLI 退出时会调用 `close()` 来 `shutdownNow()` executor，避免 daemon 线程泄漏。handler 执行失败也不会影响 transport 的消息流，这是 best-effort 的设计。

## 05、运行中取消

之前 PaiCLI 有个问题：Agent 开始执行任务后，没有办法中途叫停。如果 Agent 理解错了需求，或者正在执行一个耗时很长的操作，只能等它自己跑完，或者直接 Ctrl+C 退出整个程序。

这一期加了 `/cancel` 命令。任务执行期间输入 `/cancel` 并回车，PaiCLI 就会尝试中断当前任务。

实现方式用了两个类：`CancellationToken` 和 `CancellationContext`。

`CancellationToken` 非常简单，就一个 `AtomicBoolean`。调用 `cancel()` 设为 true，`isCancelled()` 检查是否被取消。它还额外检查了 `Thread.currentThread().isInterrupted()`，这样即使底层代码用的是 Java 的中断机制而不是我们的 Token，也能被感知到。

`CancellationContext` 是一个全局的上下文管理器，用 `InheritableThreadLocal` + `AtomicReference` 双轨存储当前运行的 Token。为什么要用 InheritableThreadLocal？因为 Agent 的执行可能会跨线程，比如 Multi-Agent 的子任务会在线程池里执行，子线程需要能感知到父线程的取消信号。

【此处插入CancellationContext源码截图：截图目标：展示双轨存储和线程继承设计；关键词：InheritableThreadLocal、AtomicReference、startRun；建议位置：IDE】

ReAct 循环、Plan-and-Execute 的任务分发、Multi-Agent 编排、工具批量执行，这些执行入口都在循环边界处加了 `CancellationContext.isCancelled()` 检查。一旦检测到取消信号，就跳出循环，不再继续执行后续步骤。

需要说明的是，取消是 best-effort 的。如果 Agent 正在等 LLM 的流式响应，Java 的 interrupt 不一定能立刻中断 HTTP 连接。OkHttp 的流式读取在收到 interrupt 后会抛 `InterruptedIOException`，但这取决于操作系统的网络栈，不能保证每次都立刻生效。

所以 PaiCLI 的取消策略是"两道防线"：第一道是 Thread.interrupt()，尝试中断底层 IO；第二道是 CancellationToken 的 flag 检查，即使 interrupt 没生效，下一个循环边界也会检测到 flag 然后退出。两道防线至少有一道会生效，确保 Agent 不会在用户明确取消之后继续执行高风险操作，比如写文件或者执行命令。

【此处插入/cancel执行效果截图：截图目标：展示输入/cancel后Agent停止执行；关键词：/cancel、任务已取消、停止执行；建议位置：命令行】

## 06、/mcp prompts 和 /mcp resources

顺带说一下两个新的 CLI 命令。

`/mcp resources <server>` 列出指定 Server 暴露的资源列表，包括 URI、名称、MIME 类型和描述。

`/mcp prompts <server>` 列出指定 Server 暴露的 Prompt 模板。Prompt 模板是 MCP 协议里的第三个核心概念，Server 可以预定义一些 Prompt 模板供 Client 使用。比如一个代码审查 Server 可能会暴露一个叫 `review-pr` 的 Prompt 模板，里面包含了代码审查的评审标准和输出格式。目前 PaiCLI 只做了查看功能，只调 `prompts/list` 展示名称、标题和描述，不调 `prompts/get` 拿具体内容，也不把 Prompt 注入到对话流里。这个能力留到后续版本，到时候可以做成 `/mcp use-prompt <server> <prompt-name>` 这样的命令。

这两个命令的 CLI 解析复用了上一期做的 `CliCommandParser`，新增了 `MCP_RESOURCES`、`MCP_PROMPTS` 和 `CANCEL` 三个命令类型。解析逻辑跟之前一样，根据空格分词后匹配命令前缀。

### 源码结构一览

这一期新增的代码按功能分成了四个包：

```text
mcp/resources/     ← Resource 缓存和虚拟工具
mcp/mention/       ← @-mention 解析、展开、补全
mcp/notifications/ ← 通知路由和异步派发
runtime/           ← 取消上下文和 Token
```

加上对 McpClient、McpServerManager、ToolRegistry、Main、CliCommandParser、AuditLog 的改动，一共新增和修改了约 20 个文件。其中 McpClient 新增了 `listResources()`、`readResource(uri)`、`subscribeResource(uri)` 和 `listPrompts()` 四个方法，以及 capability 判断逻辑。McpServerManager 在启动时会根据 Server 的 capabilities 决定是否注册 resources 虚拟工具和通知路由。

测试覆盖也同步更新，新增了 McpResourceCacheTest、AtMentionParserTest、AtMentionExpanderTest、NotificationRouterTest 等测试类，目前跑到 336 个测试，全部通过。

### 简历包装

如果你在做类似的 MCP 高级能力，简历上可以这样写：

**项目名称**：PaiCLI — MCP-Native Agent CLI

**项目简介**：基于 Java 实现的 AI Agent 命令行工具，完整实现 MCP 协议（工具 + 资源 + 通知 + 取消），支持多模型接入和交互式对话。

**技术栈**：Java 21、MCP Protocol、JSON-RPC 2.0、ConcurrentHashMap、AtomicBoolean、InheritableThreadLocal、ExecutorService

**核心职责**：

- 实现 MCP Resources 双轨读取机制，Server 声明 resources 能力后自动注册 list_resources/read_resource 虚拟工具，同时支持用户通过 @-mention 语法在输入中直接引用资源并展开为 XML 内联块
- 设计 McpResourceCache 脏标记缓存策略，对 resources/list_changed 和 resources/updated 通知分别标记 Server 级和 URI 级 stale，避免高频通知场景下的重复拉取
- 开发 NotificationRouter 异步通知派发器，使用独立 daemon 线程池处理 Server 推送的 JSON-RPC 通知，解决 reader 线程同步执行 handler 导致的自我死锁问题
- 实现 CancellationToken + CancellationContext 协作取消机制，通过 InheritableThreadLocal 跨线程传播取消信号，支持 ReAct/Plan/Multi-Agent 等多种执行模式的 best-effort 中断
- 新增 @-mention 解析器，正则匹配 `@server:protocol://path` 格式并自动跳过引号内文本，展开时对超过 200K 字符的资源做截断保护，防止上下文溢出

【此处插入PaiCLI测试通过截图：截图目标：展示336个测试全部通过；关键词：336 tests、0 failures、BUILD SUCCESS；建议位置：命令行】

## ending

MCP 的高级能力做完之后，PaiCLI 已经不只是一个"能调工具的 Agent"了。

它能读数据、能收通知、能被中断。
这三个能力加在一起，
Agent 才算是一个可以放心用的工具，
而不是一个"启动了就只能等它跑完"的黑盒。

下一期打算做长上下文工程，
resources 自动注入 system prompt，
让 Agent 在对话开始前就知道自己能调什么、能读什么。

【**好的 Agent 不是什么都能做的 Agent，是知道什么时候该停下来的 Agent。**】

我们下期见。
