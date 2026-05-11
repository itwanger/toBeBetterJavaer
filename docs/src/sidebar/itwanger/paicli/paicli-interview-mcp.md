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

这篇是 AI Agent 面试题系列的第四弹，聚焦**MCP 协议与生态**。MCP 是 2024-2025 年 Agent 领域最热的协议之一，对应 PaiCLI 的第 10、11、13、14 期，面试高频。

## 01、MCP 是什么？它解决了什么问题？

MCP（Model Context Protocol）是 Anthropic 在 2024 年底提出的开放协议，定义了 AI 应用（Host/Client）与外部工具/数据（Server）之间的标准通信接口。

它解决的核心问题是**工具集成的碎片化**。

没有 MCP 之前：每个 AI 应用要接入一个新工具，就得写一套定制代码——Claude Code 的 GitHub 集成、Cursor 的 GitHub 集成、PaiCLI 的 GitHub 集成，三份代码做的是同一件事。

有了 MCP：工具提供方写一个 MCP Server，所有支持 MCP 协议的 AI 应用都能直接用。N 个应用 × M 个工具，从 N×M 的集成量变成 N+M。

MCP 的三个核心能力：
- **Tools**：服务端暴露可调用的工具（函数）
- **Resources**：服务端暴露可读取的数据源
- **Prompts**：服务端暴露可复用的 prompt 模板

## 02、MCP 的 stdio 传输和 Streamable HTTP 传输有什么区别？

MCP 支持两种传输方式：

**stdio（标准输入输出）**：
- Host 通过 `ProcessBuilder` 启动 Server 为子进程
- 通过 stdin/stdout 发送/接收 JSON-RPC 消息
- Server 生命周期由 Host 管理（Host 退出，Server 跟着退出）
- 适合本地工具（如 `chrome-devtools-mcp`、`mcp-server-git`）

**Streamable HTTP**：
- Host 通过 HTTP POST 发送 JSON-RPC 请求
- Server 通过 SSE（Server-Sent Events）流式返回响应
- Server 是独立部署的远程服务
- 适合云端工具、团队共享的 MCP Server

PaiCLI 两种都支持。配置文件里 `command` 字段表示 stdio，`url` 字段表示 HTTP：

```json
{
  "mcpServers": {
    "git": { "command": "uvx", "args": ["mcp-server-git"] },
    "remote": { "url": "https://mcp.example.com/v1" }
  }
}
```

## 03、MCP 的 JSON-RPC 通信协议是怎么工作的？

MCP 底层用的是 JSON-RPC 2.0 协议，包含三种消息类型：

**Request**（请求）：
```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/list", "params": {}}
```

**Response**（响应）：
```json
{"jsonrpc": "2.0", "id": 1, "result": {"tools": [...]}}
```

**Notification**（通知，无 id，无需响应）：
```json
{"jsonrpc": "2.0", "method": "notifications/tools/list_changed"}
```

通信流程：
1. Host 发送 `initialize` 请求，协商 protocol version 和 capabilities
2. Server 返回支持的 capabilities（tools、resources、prompts）
3. Host 根据 capabilities 调用 `tools/list`、`resources/list` 等获取具体能力
4. 正常工作期间，Host 调用 `tools/call` 执行工具
5. Server 可以发送 notification 通知 Host 工具列表变更等事件

PaiCLI 的 `JsonRpcClient` 手写了请求-响应配对（id 匹配）、通知处理、超时机制。

## 04、MCP 工具注册到 Agent 后，命名空间怎么设计的？

PaiCLI 把 MCP 工具注册为 `mcp__{server}__{tool}` 格式：

```
chrome-devtools server 的 navigate_page 工具
→ mcp__chrome-devtools__navigate_page

git server 的 commit 工具
→ mcp__git__commit
```

双下划线 `__` 作为分隔符，而不是单下划线，因为工具名本身可能包含单下划线。

命名空间的好处：

1. **避免冲突**：两个 Server 可能都有叫 `search` 的工具，加上 server 前缀就不会冲突
2. **安全隔离**：HITL 和审计可以按 server 前缀做策略（如放行整个 `chrome-devtools` server）
3. **LLM 可理解**：LLM 看到 `mcp__chrome-devtools__navigate_page` 就知道这是浏览器操作

## 05、MCP 的 resources 是什么？和 tools 有什么区别？

**Tools** 是可执行的函数：输入参数，执行逻辑，返回结果。有副作用（可能改变状态）。

**Resources** 是可读取的数据源：通过 URI 访问，返回内容。只读，无副作用。

类比：tools 是 API 的 POST 端点，resources 是 GET 端点。

PaiCLI 对 resources 的实现是"双轨"策略：

**工具轨**：为每个支持 resources 的 Server 自动注册两个虚拟工具：
- `mcp__{server}__list_resources`：列出可用资源
- `mcp__{server}__read_resource`：读取指定资源内容

LLM 可以自己决定何时列出和读取资源。

**用户 @-mention 轨**：用户在输入里写 `@server:protocol://path`，PaiCLI 在提交给 Agent 前自动展开为 `<resource>` 内联块。

两条轨道覆盖了不同场景：LLM 主动探索用工具轨，用户明确指定用 @-mention 轨。

## 06、MCP Server 启动失败或超时怎么处理？

MCP Server 的启动可能很慢（chrome-devtools 首次启动要 `npx` 拉包 + Chrome 冷启动，20 秒以上）。

PaiCLI 的处理策略：

1. **超时设置**：`initialize` 默认 60 秒超时（从 30 秒提升，因为 chrome-devtools 经常 30 秒打不住）
2. **并行启动**：多个 Server 并行启动，慢的不阻塞快的
3. **进度提示**：启动期间每 5 秒打印一次等待状态，告诉用户哪些 Server 还没就绪
4. **优雅降级**：某个 Server 启动失败，只记日志，不阻塞其他 Server 和主程序
5. **手动重启**：`/mcp restart <name>` 可以单独重启失败的 Server

设计原则：**MCP Server 的故障不应该影响 Agent 的核心功能**。没有浏览器 MCP，Agent 还能读写文件、执行命令、搜索代码。

## 07、Chrome DevTools MCP 能干什么？和 web_fetch 怎么分工？

Chrome DevTools MCP 是 Google 官方的 MCP Server，提供 28 个浏览器操作工具：

| 类别 | 工具 | 用途 |
|---|---|---|
| 导航 | navigate_page, new_page, close_page | 打开/关闭页面 |
| 快照 | take_snapshot, take_screenshot | 获取 DOM 文本或截图 |
| 交互 | click, fill, fill_form, type_text | 模拟用户操作 |
| 调试 | evaluate_script, get_console_message | 执行 JS、查看控制台 |
| 网络 | list_network_requests, get_network_request | 监控网络请求 |

和 web_fetch 的分工：

```
需要拿页面内容？
├── 静态页面 / 服务端渲染 → web_fetch（快、成本低）
├── SPA / JS 渲染 → 浏览器 MCP → take_snapshot
├── 防爬墙站点（微信、知乎） → 浏览器 MCP
├── 需要登录 → 浏览器 MCP + CDP 会话复用
└── 需要表单交互 → 浏览器 MCP → fill_form + click
```

这个分工写在 system prompt 的工具选择决策表里，LLM 自己判断走哪条路。

## 08、CDP 会话复用是怎么实现的？为什么需要？

需要会话复用的原因：有些页面需要登录才能访问（GitHub Dashboard、企业内部系统、付费内容）。默认的 `--isolated=true` 每次启动一个干净的浏览器 profile，没有任何登录态。

PaiCLI 的会话复用机制：

1. 用户在自己的 Chrome 浏览器里完成登录
2. Chrome 144+ 通过 `chrome://inspect/#remote-debugging` 允许远程调试
3. PaiCLI 执行 `/browser connect`，把 chrome-devtools MCP 从 `--isolated=true` 切到 `--autoConnect`
4. MCP Server 连接到用户的 Chrome 实例，复用登录态

安全约束：

- **敏感页面识别**：命中敏感页面规则（银行、支付、邮箱等）后，改写型工具（click、fill_form、evaluate_script）必须单步 HITL 审批，不能全部放行
- **Tab 保护**：shared 模式下 `close_page` 只能关闭 PaiCLI 自己创建的 tab，防止误关用户正在使用的页面
- **模式切换清空信任**：切换 shared → isolated 或反过来时，自动清空 server 维度的全部放行

## 09、MCP 的 notifications 机制是怎么工作的？

MCP Server 可以主动向 Host 发送通知（Notification），告知状态变更：

- `notifications/tools/list_changed`：工具列表变了（新增/删除工具）
- `notifications/resources/list_changed`：资源列表变了
- `notifications/resources/updated`：某个资源内容更新了

PaiCLI 的处理方式是**被动响应**：

- `tools/list_changed` → 重新调用 `tools/list` 拉取最新工具列表 → 全量替换该 Server 的注册工具
- `resources/list_changed` / `resources/updated` → 清除本地资源缓存，下次读取时重新拉取

PaiCLI 明确**不做主动探活**（health ping / heartbeat）。原因：按量或按月计费的远程 MCP Server，主动 ping 会产生额外费用。Server 活不活，等用户真正调用时自然知道。

## 10、MCP 的 tools/call 返回结果是什么格式？怎么回灌给 LLM？

`tools/call` 的返回是一个 `content` 数组，每个元素可以是：

```json
{
  "content": [
    {"type": "text", "text": "操作成功"},
    {"type": "image", "data": "base64...", "mimeType": "image/png"},
    {"type": "resource", "resource": {"uri": "file://...", "text": "..."}}
  ]
}
```

PaiCLI 的处理：

- **text**：拼接成字符串，作为 tool message 的 content 回灌给 LLM
- **image**：保留 base64 数据，在 ReAct / Plan / SubAgent 的工具结果后追加一条带图片的 user message
- **resource**：提取文本内容，拼接到 text 结果里

image 处理是第 21 期实现的——如果模型支持图片输入，截图会作为图片块发给 LLM 让它"看到"页面；如果不支持，fallback 为引导 LLM 用 `take_snapshot` 拿 DOM 文本。

## 11、如果让你设计一个 MCP Server，你会怎么做？

面试开放题。参考 PaiCLI 接入多个 MCP Server 的经验：

**1. 确定传输方式**：本地工具用 stdio，远程服务用 Streamable HTTP。

**2. 定义 capabilities**：你的 Server 提供 tools、resources 还是 prompts？明确声明。

**3. 工具设计**：
- 每个工具职责单一
- 参数 schema 严格定义
- 返回值用 text + 可选 image

**4. 错误处理**：工具执行失败返回 `isError: true` 和有意义的错误信息，让 Host 和 LLM 能判断后续动作。

**5. 生命周期**：stdio 模式下，Server 要正确处理 stdin EOF（Host 退出时）并清理资源。HTTP 模式下要处理 session 超时。

**6. 安全考虑**：如果 Server 能访问敏感数据，在 tool description 里标注，让 Host 的 HITL 机制能做出正确的安全判断。

## 12、MCP 和 OpenAI 的 Function Calling 有什么关系？能共存吗？

两者不矛盾，层次不同：

- **Function Calling** 是 LLM API 的协议——定义了怎么告诉 LLM "你有哪些工具可用"以及 LLM 怎么返回"我要调用这个工具"。
- **MCP** 是工具提供方的协议——定义了怎么发现、描述和调用外部工具。

PaiCLI 的工作方式是两者共存：

```
MCP Server → tools/list → 拿到工具定义
→ 转换成 Function Calling 格式 → 塞进 LLM 请求的 tools 字段
→ LLM 返回 tool_calls → Agent 通过 MCP tools/call 执行
→ 结果回灌给 LLM
```

MCP 负责"工具从哪来、怎么调用"，Function Calling 负责"怎么告诉 LLM、LLM 怎么选择"。PaiCLI 的内置工具（read_file 等）走 Function Calling 不走 MCP，MCP 工具两者都走。

## 13、MCP 的 schema 清洗是什么？为什么需要？

MCP Server 返回的工具参数 schema 可能包含 LLM 不擅长处理的结构：

- `$ref`：JSON Schema 引用，指向其他位置的定义
- `anyOf` / `oneOf`：联合类型
- 超长 `description`：几千字的描述

这些结构如果原样塞进 LLM 的 tools 定义里，LLM 容易：

1. 不理解 `$ref` 引用，生成不合法的参数
2. 被 `anyOf` 搞混，选错类型
3. 被超长描述分散注意力

PaiCLI 在注册 MCP 工具时做 schema 清洗：

- 展开 `$ref` 引用为内联定义
- 简化 `anyOf` / `oneOf` 为最常用的类型
- 截断超长 description
- 移除 LLM 不需要的元数据字段

清洗后的 schema 更"LLM 友好"，工具调用的成功率显著提升。

## ending

这 13 道题覆盖了 MCP 协议的核心：传输机制、JSON-RPC 通信、工具注册、resources 双轨、Chrome DevTools 集成、CDP 会话复用、通知机制。

下一篇我们进入**Prompt 工程与 Skill 系统**——system prompt 分层架构、KV Cache 优化、Skill 加载机制。
