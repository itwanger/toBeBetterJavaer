---
title: AI Agent 面试题第四弹：MCP 协议、Chrome DevTools、CDP 会话复用
shortTitle: 面试题：MCP 协议与生态
description: 围绕 PaiCLI 实战，精选 13 道 MCP 协议面试题，覆盖 stdio/HTTP 传输、工具注册、resources、Chrome DevTools 集成和 CDP 会话复用，口述版答案+面试官视角分析。
tag:
  - Agent
  - 面试题
  - MCP
category:
  - AI
author: 沉默王二
date: 2026-05-11
---

## content

### 01、MCP 是什么，解决了什么问题

我说："MCP 全称 Model Context Protocol，是 Anthropic 在 2024 年底提出的开放协议。它定义了 AI 应用和外部工具之间的标准通信接口。"

![](https://cdn.paicoding.com/paicoding/28f13a6f8b206dddd0612570a59593de.png)

#### 为什么需要这个协议？

没有 MCP 之前，每个 AI 应用想接入一个新工具就得写一套定制代码。

Claude Code 要接入 GitHub，写一套。Qoder 要接入 GitHub，再写一套。

有了 MCP，GitHub 官方写一个 MCP Server，所有支持 MCP 的 AI 应用直接接入。N 乘 M 变成 N 加 M。这个降维和当年 USB 统一接口是一个道理。

![](https://cdn.paicoding.com/stutymore/paicli-interview-mcp-20260521135647.png)

老王追问："**它具体解决了哪几个问题？**"

我说："三个。第一是工具发现，Host 启动 MCP Server 后，调一次 tools/list 就知道这个 Server 提供哪些工具，不用硬编码。第二是工具调用，统一的 tools/call 接口，不管底层是 Git 操作、浏览器操控还是数据库查询，调用方式一模一样。第三是数据访问，resources/list 加 resources/read 让 Server 暴露可读取的数据源，LLM 需要上下文信息时随时拿。"

> **为什么这样回答**：面试官问 MCP 是什么，不是让你背官方文档的定义。核心是讲清楚"为什么需要它"，N 乘 M 变成 N 加 M 这个降维思路，一说面试官就懂了。再把三个核心能力（工具发现、工具调用、数据访问）列出来，展示你对协议结构有完整的认知。

### 02、MCP 的 stdio 传输和 Streamable HTTP 传输有什么区别

老王继续问："MCP 支持几种传输方式？你们实现了哪种？"

我说："两种都实现了。stdio 和 Streamable HTTP。"

stdio 是标准输入输出传输。Host 通过 ProcessBuilder 把 MCP Server 启动为子进程，通过 stdin 发 JSON-RPC 消息，通过 stdout 收响应。Server 的生命周期完全由 Host 管理，Host 退出了，stdin 就 EOF 了，Server 跟着退出。适合本地工具，比如 chrome-devtools-mcp、mcp-server-git。

![](https://cdn.paicoding.com/stutymore/paicli-interview-mcp-20260521135929.png)

Streamable HTTP 是 HTTP 传输。Host 通过 HTTP POST 发 JSON-RPC 请求，Server 通过 SSE 流式返回响应。Server 是独立部署的远程服务，和 Host 的生命周期无关。适合云端工具、团队共享的 MCP Server。

配置文件里区分也很简单，有 command 字段就走 stdio，有 url 字段就走 HTTP，PaiCLI 自动判断。

老王追问："**为什么不只用 HTTP？**"

我说："stdio 更简单更可靠。本地工具不需要端口管理、不需要网络认证，启动一个进程就完事。而且 stdio 天然隔离，进程挂了就是挂了，不会和其他 Server 互相影响。HTTP 适合远程场景，但本地工具用 HTTP 就是过度设计了。"

> **为什么这样回答**：传输方式的区别是 MCP 的基础知识，但面试官真正想考的是"什么场景用什么"。把 stdio 和 HTTP 的适用场景讲清楚，再回答"为什么不只用 HTTP"这个追问，展示你对技术选型有判断力，不是无脑选新技术。

### 03、MCP 的 JSON-RPC 通信协议是怎么工作的

老王问："MCP 底层用的什么通信协议？"

我说："JSON-RPC 2.0，很简洁，只有三种消息类型。"

第一种是 Request，有 id 字段，需要对方响应。比如 tools/list 请求就是一个 Request，id 是 1，Host 发出去后等着 Server 返回 id 也是 1 的 Response。

第二种是 Response，id 和 Request 配对。Server 收到 id 为 1 的请求，处理完返回 id 为 1 的响应，Host 通过 id 找到对应的等待者把结果交付。

第三种是 Notification，没有 id，不需要响应。比如 Server 工具列表变了，推一条 notifications/tools/list_changed 通知 Host，Host 收到后自己去重新拉取工具列表就行。

![](https://cdn.paicoding.com/stutymore/paicli-interview-mcp-20260521140339.png)

老王追问："**请求和响应的配对怎么实现的？**"

我说："PaiCLI 的 JsonRpcClient 里用了一个 ConcurrentHashMap，key 是自增的 id，value 是 CompletableFuture。发请求时用自增 id 注册一个 Future，收到响应时按 id 找到对应 Future 完成它。同时还有超时调度，一段时间内没有收到响应就自动报超时异常，防止 Future 永远挂着。"

通信的完整生命周期是：Host 发 initialize 协商协议版本和能力 → Server 返回支持的能力 → Host 发 initialized 通知准备就绪 → Host 调 tools/list 拉取工具清单 → 正常工作期间用 tools/call 执行工具 → Server 随时可以发 notification 通知状态变更。

> **为什么这样回答**：JSON-RPC 本身不难，面试官考的是你有没有自己实现过。讲到 ConcurrentHashMap 加 CompletableFuture 做请求-响应配对，说明你不是只在上层调 SDK，而是真正理解了底层通信机制。超时调度这个细节也很加分，说明你考虑了异常场景。

### 04、MCP 工具注册到 Agent 后，命名空间怎么设计的

老王问："MCP 工具接入之后，工具名怎么管理的？不会冲突吗？"

我说："PaiCLI 把每个 MCP 工具注册为 mcp 双下划线 server 名双下划线 tool 名的格式。比如 chrome-devtools server 的 navigate_page 工具，注册名就是 mcp__chrome-devtools__navigate_page。"

![](https://cdn.paicoding.com/stutymore/paicli-interview-mcp-20260521140744.png)

老王追问："**为什么用双下划线？**"

我说："因为工具名本身可能包含单下划线，比如 navigate_page、take_screenshot。如果用单下划线做分隔符，就分不清 server 名在哪结束、tool 名从哪开始。双下划线在 MCP 工具名里不会出现，是安全的分隔符。"

命名空间带来三个好处。第一是避免冲突，两个 Server 可能都有叫 search 的工具，加了 server 前缀就区分开了。第二是安全隔离，HITL 审批和审计日志可以按 server 前缀做策略，比如用户说"放行整个 chrome-devtools server"，匹配前缀就行。第三是 LLM 可理解，LLM 看到 mcp__chrome-devtools__navigate_page 就知道这是浏览器相关的操作，不用额外解释。

### 05、MCP 的 resources 是什么，和 tools 有什么区别

老王问："MCP 除了 Tools 还有 Resources？这俩啥区别？"

我说："Tools 是可执行的函数，有输入参数、有副作用、会改变状态。Resources 是可读取的数据源，通过 URI 访问，返回内容，只读无副作用。打个比方，Tools 是 API 的 POST 端点，Resources 是 GET 端点。"

但实际使用中有一个 gap，LLM 不能直接调 resources/read，因为 Function Calling 协议里只有 tools 的概念，没有 resources。所以 PaiCLI 设计了一个双轨策略来弥补这个问题。

![](https://cdn.paicoding.com/stutymore/paicli-interview-mcp-20260521141012.png)

第一条是工具轨。为每个支持 resources 的 Server 自动注册两个虚拟工具：list_resources 列出可用资源、read_resource 读取指定资源内容。LLM 可以像调普通工具一样调用它们。想探索某个 Server 有什么数据，先调 list_resources，看到感兴趣的 URI 再调 read_resource 读内容。

第二条是用户 @-mention 轨。用户在输入里写 @server:protocol://path，PaiCLI 在提交给 Agent 之前自动展开为资源内容。这条路径不经过 LLM 决策，用户明确指定了要读什么。

两条轨道覆盖不同场景：LLM 主动探索用工具轨，用户明确指定用 @-mention 轨。

> **为什么这样回答**：resources 是 MCP 里容易被忽略的能力，很多候选人只知道 tools。讲清楚"LLM 不能直接调 resources/read"这个 gap，然后给出双轨策略的解决方案，展示你对协议有深入理解，而且遇到问题能给出工程化的解决办法。

### 06、MCP Server 启动失败或超时怎么处理

老王问了一个工程性的问题："MCP Server 启动很慢怎么办？启动失败呢？"

我说："启动慢是常态。chrome-devtools-mcp 首次启动要 npx 拉包加上 Chrome 冷启动，20 秒以上很正常。某些 Python 写的 MCP Server 用 uvx 启动，首次下载依赖也得十几秒。"

PaiCLI 做了五层处理。

第一是超时设置，initialize 默认 60 秒超时。这个值是从实战中调出来的，最早设的 30 秒，chrome-devtools 经常超时，后来改成 60 秒。

第二是并行启动。多个 Server 用专属 daemon 线程池并行启动，慢的不阻塞快的。线程池上限 8 个线程，避免 fork 太多进程。

第三是进度提示。启动期间每 5 秒打印一次等待状态，告诉用户哪些 Server 还没就绪。

第四是优雅降级。某个 Server 启动失败，只标记该 Server 为 ERROR 状态，不影响其他 Server 和主程序。

第五是手动重启。/mcp restart 加 server 名可以单独重启失败的 Server。

【此处插入 MCP Server 启动状态截图：截图目标：展示多个 server 的启动状态（ready/error/disabled）和工具数量统计；关键词：MCP server、启动、ready、error；建议位置：终端会话窗口】

设计原则就一句话——MCP Server 的故障不应该影响 Agent 的核心功能。没有浏览器 MCP，Agent 照样能读写文件、执行命令、搜索代码。

> **为什么这样回答**：这道题考的是工程健壮性。五层处理从超时、并行、提示、降级到手动恢复，层层递进，展示你对"分布式依赖管理"这类问题有系统性的思考。最后一句设计原则是点睛之笔，面试官听完就知道你不会因为一个外部依赖挂了就让整个系统不可用。

### 07、Chrome DevTools MCP 能干什么，和 web_fetch 怎么分工

老王问："你们接了 Chrome DevTools MCP？这东西能干啥？"

我说："Chrome DevTools MCP 是 Google 官方发布的 MCP Server，提供 28 个浏览器操作工具。简单说就是让 LLM 能操作浏览器，打开网页、填表单、点按钮、截图、抓网络请求，全都能干。"

![](https://cdn.paicoding.com/stutymore/paicli-interview-mcp-20260521141420.png)

老王追问："**你们不是已经有 web_fetch 了吗，为什么还要浏览器 MCP？**"

我说："web_fetch 是基于 OkHttp 的纯 HTTP 请求，只能拿静态 HTML。碰到 SPA、JS 渲染的页面、防爬站点就搞不定了。浏览器 MCP 是真正启动一个 Chrome 实例，JavaScript 照常执行，登录态照常保持，什么页面都能拿到内容。"

什么时候走哪条路，PaiCLI 写在 system prompt 的决策表里。静态页面用 web_fetch，成本低速度快。SPA 和 JS 渲染用浏览器 MCP 的 take_snapshot。防爬站点也走浏览器 MCP。需要登录的页面走浏览器 MCP 加 CDP 会话复用。需要表单交互的走 fill_form 加 click。LLM 根据任务特征自己判断走哪条路。

### 08、CDP 会话复用是怎么实现的

老王来了兴趣："你刚才说 CDP 会话复用，这个具体怎么做的？"

我说："Chrome DevTools MCP 默认用 isolated 模式启动，每次创建一个全新的浏览器 profile。干净是干净了，但没有任何登录态。想抓 GitHub Dashboard、企业内部系统、付费内容？全是登录页。"

![](https://cdn.paicoding.com/stutymore/paicli-interview-mcp-20260521141626.png)

PaiCLI 实现了 CDP（Chrome DevTools Protocol）会话复用。流程是这样的：用户在自己的 Chrome 浏览器里正常登录各种网站，然后在 PaiCLI 里执行 /browser connect，把 chrome-devtools MCP 从 isolated 模式切到 autoConnect 模式。MCP Server 连接到用户已有的 Chrome 实例，复用全部登录态。这样 Agent 就能直接访问用户已登录的页面了。

老王追问："**这不是很危险吗？Agent 能操作用户的真实浏览器，万一点了'确认转账'怎么办？**"

我说："所以我们做了三层安全约束。"

第一层是敏感页面识别。BrowserGuard 维护一组 URL 匹配规则，覆盖银行、支付、邮箱等敏感站点。命中敏感页面后，改写型工具比如 click、fill_form、evaluate_script，强制单步 HITL 审批，不能复用"全部放行"。

第二层是 Tab 保护。shared 模式下 close_page 只能关闭 PaiCLI 自己创建的 tab。用户正在看的页面 Agent 关不掉。

第三层是模式切换清空信任。从 shared 切到 isolated 或者反过来的时候，自动清空该 server 维度的全部放行。防止旧的信任跨安全上下文延续。

> **为什么这样回答**：CDP 会话复用是一个"能力很强但风险也很大"的功能，面试官一定会追问安全。先讲功能价值（复用登录态），再讲安全风险（操作真实浏览器），最后给出三层防护。这个"能力 → 风险 → 防护"的叙事结构，展示你做功能的时候安全意识是同步跟上的，不是事后补救。

### 09、MCP 的 notifications 机制是怎么工作的

老王问："MCP Server 能主动给 Host 推消息吗？"

我说："能，这就是 notifications 机制。通知是单向的，没有 id，不需要 Host 回复。"

三种标准通知：tools/list_changed 表示工具列表变了、resources/list_changed 表示资源列表变了、resources/updated 表示某个资源内容更新了。

PaiCLI 收到 tools/list_changed 后会自动重新拉取工具列表，收到 resources 相关通知后会清除对应的缓存。

老王追问："**通知的 handler 为什么要异步执行？**"

我说："这个问题非常好，我们踩过坑。如果 handler 跑在 stdout reader 线程里，handler 内部要是发了一个 JSON-RPC 请求并等待响应，就会死锁。因为 stdout reader 被 handler 占着，新的响应进了 buffer 但没人读，handler 等的响应永远读不到。典型场景就是 Server 启动后推送 tools/list_changed，handler 要调 tools/list 重新拉取工具列表，结果自己等自己，死锁了。"

所以 PaiCLI 的 NotificationRouter 用一个单线程的 executor 做异步派发，handler 和 reader 线程完全隔离，彻底避免了这个问题。

【此处插入 notifications 异步派发流程图：截图目标：展示 Server 推送通知 → NotificationRouter 异步派发 → handler 独立线程执行的流程；关键词：notification、异步派发、reader 线程、死锁；建议位置：白板/流程图】

另外 PaiCLI 明确不做主动探活，不发 health ping。原因是按量计费的远程 MCP Server，主动 ping 会产生额外费用。Server 挂没挂，等用户真正调用时自然知道。

> **为什么这样回答**：notifications 本身不难，但 handler 异步执行防死锁这个点是真正的工程经验。能讲清楚死锁的原因和解决方案，说明你不是只看了文档，是真的写过代码踩过坑。"不做主动探活"这个决策也加分，展示你会考虑成本因素。

### 10、MCP 的 tools/call 返回结果怎么处理

老王问："MCP 工具执行完，结果怎么传给 LLM？"

我说："tools/call 的返回是一个 content 数组，每个元素有 type 字段区分类型，主要有三种——text 文本、image 图片、resource 资源。"

text 类型最简单，直接拼接成字符串作为 tool message 返回给 LLM。

image 类型比较复杂。先解码 base64，如果处理成功就生成一个图片附件，在下一轮对话里发给 LLM。如果处理失败了，比如图片太大或者格式不支持，就降级为文本提示，告诉 LLM"请用 take_snapshot 获取 DOM 文本快照"。

resource 类型就是提取文本内容，拼到 text 结果里。

如果工具执行失败了，isError 为 true，整个结果会被包装成"MCP 工具返回错误"的格式，LLM 看到后知道调用失败了，可以决定重试还是换思路。

【此处插入 tools/call 返回结果处理截图：截图目标：展示 MCP 工具返回 text + image 混合结果在终端的处理输出；关键词：tools/call、content、image、text；建议位置：终端会话窗口】

### 11、MCP 和 OpenAI 的 Function Calling 有什么关系

老王抛了一个对比题："MCP 和 Function Calling 是什么关系？冲突吗？"

我说："不冲突，这两个东西层次不同。"

Function Calling 是 LLM API 层的协议。它定义了两件事：怎么告诉 LLM"你有哪些工具可用"，以及 LLM 怎么告诉 Agent"我要调这个工具"。GLM、DeepSeek、Kimi 都兼容这套协议。

MCP 是工具提供方的协议。它定义了怎么发现工具、怎么描述工具、怎么调用工具。

![](https://cdn.paicoding.com/stutymore/paicli-interview-mcp-20260521142117.png)

PaiCLI 就是两者共存的典型例子。整个流程是：MCP Server 通过 tools/list 返回工具定义 → PaiCLI 把这些定义转换成 Function Calling 格式 → 塞进 LLM 请求的 tools 字段 → LLM 返回 tool_calls 说它想调某个 MCP 工具 → PaiCLI 通过 MCP 的 tools/call 去执行 → 结果返回给 LLM。

MCP 负责"工具从哪来、怎么执行"，Function Calling 负责"怎么告诉 LLM、LLM 怎么选择"。PaiCLI 的内置工具只走 Function Calling 不走 MCP，MCP 工具两者都走。

所以如果面试官问"你们是用 MCP 还是 Function Calling"，正确答案不是二选一，而是一起用，各管各的层。

> **为什么这样回答**：这是一道经典的对比题，很多候选人会答成"MCP 比 Function Calling 更好"或者"MCP 是 Function Calling 的替代"，这都不对。能清楚地讲出"层次不同、各管各的"，说明你对整个 Agent 的技术栈有全局性的认知，不会把不同层次的东西混在一起比较。

### 12、MCP 的 schema 清洗是什么，为什么需要

老王问了最后一个问题："你提到过 schema 清洗，具体是什么？"

我说："MCP Server 返回的工具参数 schema 是标准 JSON Schema，但 LLM 不是 JSON Schema 解析器，有些结构它处理不好。"

三个典型问题。第一是 $ref 引用，JSON Schema 允许用 $ref 引用其他位置的定义，但 LLM 看到 $ref 就懵了，它不会去"查字典"，生成的参数大概率不对。第二是 anyOf 和 oneOf 联合类型，参数可以是 string 也可以是 number，LLM 容易选错类型。第三是超长 description，有些 MCP Server 的工具描述写了几千字，把整个 API 文档塞进去了，LLM 被这些信息淹没，反而搞不清核心参数是什么。

PaiCLI 的 McpSchemaSanitizer 在注册工具时自动清洗。$ref 直接移除，anyOf 和 oneOf 转成自然语言描述放到 description 里，超长描述截断到 1000 字符。如果 schema 连 type 字段都没有，兜底补一个 object。

清洗后的 schema 对 LLM 更友好，工具调用的参数合法率明显提升。

【此处插入 schema 清洗前后对比截图：截图目标：展示原始 schema（含 $ref、anyOf）和清洗后 schema 的对比；关键词：schema 清洗、$ref、anyOf、McpSchemaSanitizer；建议位置：代码对比截图】

> **为什么这样回答**：schema 清洗是很多 MCP 集成方案都不做的事，能讲出来说明你对 LLM 的使用有深入的理解——不是把 schema 原样丢给 LLM 就完了，还要考虑 LLM 能不能正确解析。三个问题（$ref、联合类型、超长描述）都是实战中遇到的，不是凭空想的。

### 13、如果让你设计一个 MCP Server，你会怎么做

老王靠回椅背："最后一题，开放题。"

我说："六步走。"

第一步，确定传输方式。工具跑在用户本地就选 stdio，跑在云端给多个用户共享就选 Streamable HTTP。

第二步，定义 capabilities。Server 提供 tools、resources 还是 prompts？在 initialize 响应里明确声明。不支持的能力不要假装支持，PaiCLI 的 McpClient 会检查 capabilities 来决定要不要调 resources/list。

第三步，设计工具。每个工具职责单一，参数 schema 严格定义。工具描述写给 LLM 看，要清楚说明"这个工具干什么、什么时候该用、什么时候不该用"。

第四步，做好错误处理。工具执行失败返回 isError 为 true 加上有意义的错误信息。别返回一堆 stack trace，LLM 看不懂。返回"文件不存在"这种人话，LLM 才能判断下一步该怎么做。

第五步，管好生命周期。stdio 模式下要正确处理 stdin EOF 并清理资源。HTTP 模式下要处理 session 超时和并发请求。

第六步，标注安全信息。如果 Server 能访问敏感数据或执行危险操作，在 tool description 里标注。Host 端的安全机制可以根据描述里的关键词调整审批策略。

【此处插入 MCP Server 设计骨架截图：截图目标：展示一个自定义 MCP Server 的 initialize → tools/list → tools/call 实现结构；关键词：MCP Server、设计、capabilities、tools/list；建议位置：白板/代码截图】

> **为什么这样回答**：开放题六步走，从传输选型、能力声明、工具设计、错误处理、生命周期到安全标注，覆盖了一个 MCP Server 从设计到上线的完整过程。结构清晰、有实战细节、没有废话，面试官听完就知道你有能力独立设计一个生产级别的 MCP Server。

## ending

这 13 道题把 MCP 协议从原理到实现过了一遍。

传输机制两条路，stdio 和 HTTP。JSON-RPC 三种消息，request、response、notification。工具命名空间用双下划线隔离，resources 双轨策略弥补 Function Calling 的 gap。Chrome DevTools 浏览器操控，CDP 会话复用的三层安全约束。notifications 异步派发防死锁，schema 清洗让 LLM 更好用。

【协议这种东西，看文档能看懂，但写出来踩过坑之后，才知道哪些设计决策是有道理的。】

下一篇进入 Prompt 工程与 Skill 系统。

---

**简历包装**

**项目名称**：PaiCLI — Java Agent CLI（对标 Claude Code）

**项目简介**：从零开始用 Java 实现的终端 AI Agent，支持 MCP 协议接入外部工具生态，集成 Chrome DevTools 浏览器操控和 CDP 会话复用，覆盖 ReAct、Plan-and-Execute、Multi-Agent 三种架构模式。

**技术栈**：Java 17、Maven、GLM-5.1/DeepSeek V4/Kimi K2.6 多模型、OkHttp + SSE 流式解析、JLine3 终端交互、JSON-RPC 2.0 协议、Chrome DevTools Protocol

**核心职责**：

1. 实现 MCP 协议客户端（McpClient + JsonRpcClient），支持 stdio 和 Streamable HTTP 双传输，手写 JSON-RPC 请求-响应 id 配对、超时调度和通知路由（NotificationRouter 异步派发防 reader 线程死锁）
2. 设计 MCP 工具命名空间 mcp__{server}__{tool} 并实现 resources 双轨策略（LLM 工具轨 + 用户 @-mention 轨），为每个支持 resources 的 Server 自动注册 list_resources / read_resource 虚拟工具
3. 集成 Chrome DevTools MCP（28 个浏览器操作工具），实现 CDP 会话复用（/browser connect），通过 BrowserGuard 实施敏感页面强制审批、Tab 保护和模式切换信任清空三层安全机制
4. 实现 McpSchemaSanitizer 对 MCP Server 返回的 JSON Schema 做 LLM 友好清洗（展开 $ref、简化 anyOf/oneOf、截断超长 description），工具调用参数合法率显著提升
5. 实现 MCP Server 并行启动、进度提示、优雅降级和手动重启机制（McpServerManager），单 Server 故障不影响 Agent 核心功能和其他 Server 运行
