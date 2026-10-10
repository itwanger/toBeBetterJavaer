---
title: Go 版终端 Agent PaiCLI 上线了，一个二进制搞定一切
shortTitle: Go 版 PaiCLI 上线
description: Go 版 PaiCLI 正式上线，6167 行代码实现完整终端 Agent CLI，基于 Bubble Tea 全屏 TUI、Go AST 级别 RAG 代码索引、goroutine 并行工具执行，go build 编译即部署，附简历包装模板。
keywords:
  - PaiCLI Go
  - Go AI Agent
  - 终端 Agent CLI
  - Bubble Tea TUI
  - Go AST RAG
tag:
  - Agent
  - Go
category:
  - AI
author: 沉默王二
date: 2026-07-09
---

大家好，我是二哥呀。

PaiCLI 的 Go 版本上线了。

到这里，PaiCLI 已经集齐了 Java、Python、TypeScript、Go 四个版本，核心架构完全一致，都是 ReAct + Tool Use + MCP + Memory + RAG + Skill 这一套。

![](https://cdn.paicoding.com/stutymore/paicli-go-launch-20260709152756.png)

> https://gitcode.com/javabetter/paicli-go

先叠个甲，Go 版的定位和 Python 版、TypeScript 版一样，不是要造一个 Claude Code，而是让大家用自己最顺手的语言，把 AI Agent 的核心技术栈亲手实现一遍。

当然了 Go、Python、TypeScript 这三个版本应该会有一些bug，欢迎大家踊跃提 issue，或者直接 PR。

这样你也可以直接把这个项目的GitHub地址写到简历上，因为不同于Java版，这三个版本都是开源的。

## 01、Go 版有什么不一样

PaiCLI-Go 的核心依赖只有 2 个库。

**Charm 全家桶**（Bubble Tea + Bubbles + Lip Gloss + Glamour），终端 UI 框架。

Bubble Tea 是 Go 生态里最成熟的 TUI 框架，基于 Elm 架构，状态驱动渲染。

PaiCLI 用它做了一个全屏终端应用，不是简单的命令行问答，而是有 ASCII Logo、thinking 可视化流式输出、鼠标滚轮翻页、滚动条、上下文窗口使用进度条的完整界面。

![](https://cdn.paicoding.com/stutymore/bytedance-performance-ai-agent-20260709150826.png)

Lip Gloss 负责终端样式渲染——颜色、边框、布局，Glamour 负责把 Markdown 渲染成带语法高亮的终端输出。

**cobra**，CLI 框架。Go 生态的事实标准，kubectl、docker、Hugo 用的都是它。

PaiCLI 用 cobra 定义了 8 个子命令：`doctor`（环境检查）、`index`（构建代码索引）、`search`（搜索代码）、`graph`（打印代码关系图）、`serve`（启动 Runtime API）、`wechat`（微信通道）、`snapshot`（快照管理）、`version`。

加上 doublestar 做 glob 匹配，Go 版的直接依赖总共 3 个。

![](https://cdn.paicoding.com/stutymore/test-image-codex-20260709152810-d8629ef4.png)

Go 在这个场景下最大的优势是**单二进制部署**。

`go build ./cmd/paicli` 编译完就是一个可执行文件，大小在 15MB左右。

想交叉编译到 Linux 服务器，`GOOS=linux go build ./cmd/paicli` 一行搞定。对运维和自动化场景来说这个优势很大。

还有一个 Go 独有的能力：**Go AST 级别的代码索引**。

PaiCLI-Go 的 RAG 模块不只是按行拆分文本，它会调用 `go/ast` 和 `go/parser` 标准库解析 Go 源码，提取出函数级别的符号信息，包括函数名、接收者类型（比如 `*Agent.Run`），并且建立 import 关系和 contains 关系的代码关系图。

```go
ast.Inspect(file, func(n ast.Node) bool {
    fn, ok := n.(*ast.FuncDecl)
    if !ok {
        return true
    }
    sym := fn.Name.Name
    if fn.Recv != nil && len(fn.Recv.List) > 0 {
        sym = exprString(fn.Recv.List[0].Type) + "." + sym
    }
    // 提取函数级 Chunk，带符号名、行号范围
    i.Chunks = append(i.Chunks, Chunk{...})
    i.Relations = append(i.Relations, Relation{From: rel, To: sym, Kind: "contains"})
    return false
})
```

这意味着搜索 `Agent` 时，不光能匹配文本里出现了 Agent 的行，还能直接定位到 `Agent.Run`、`Agent.Team` 这些函数定义，并且知道它们在哪个文件里、被谁 import。

## 02、实现了哪些功能

![](https://cdn.paicoding.com/stutymore/bytedance-performance-ai-agent-20260709150102.png)

**ReAct 推理循环**。接收用户输入 → 调用大模型推理 → 判断是否需要工具 → 执行工具 → 把结果喂回模型 → 继续推理。

Go 版在循环里加了一个**循环卫士（Loop Guard）**：如果检测到模型重复调用了相同参数的相同工具，直接中断循环并要求模型从已有上下文生成最终答案，防止无限循环。

**13 个内置工具**。read_file、write_file、list_dir、glob_files、grep_code、execute_command、create_project、web_search、web_fetch、save_memory、load_skill、search_code、revert_turn。

工具执行通过 goroutine 并行调度，4 个槽位的信号量控制并发度，每个工具调用有 90 秒超时。

```go
func (r *Registry) ExecuteAll(ctx context.Context, calls []llm.ToolCall) []Result {
    results := make([]Result, len(calls))
    var wg sync.WaitGroup
    sem := make(chan struct{}, 4)  // 4 槽位信号量
    for i, call := range calls {
        wg.Add(1)
        go func(i int, call llm.ToolCall) {
            defer wg.Done()
            sem <- struct{}{}
            defer func() { <-sem }()
            results[i] = r.Execute(cctx, call)
        }(i, call)
    }
    wg.Wait()
    return results
}
```

**Plan-and-Execute 任务规划**。输入 `/plan <task>`，先让模型生成分步计划，再把计划作为上下文注入 ReAct 循环逐步执行。

适合“重构整个模块”“迁移数据库 Schema”这种多步骤任务，比纯 ReAct 更有方向感。

**Multi-Agent 编排**。输入 `/team <task>`，内置 Planner、Worker、Reviewer 三个角色，依次执行，每个角色的输出作为下一个角色的输入上下文。

Planner 负责拆解任务和制定方案，Worker 拿着方案调工具执行，Reviewer 对执行结果做质量把控。三个角色的系统提示词是分开维护的，互不干扰。

**MCP 协议接入**。支持 stdio 和 HTTP 两种传输协议，读取用户级（`~/.paicli/mcp.json`）和项目级（`.paicli/mcp.json`）配置。

MCP 工具注册后以 `mcp__<server>__<tool>` 命名，和内置工具统一调度。如果配置了 Step API Key，还会自动注册 Step Search 作为 MCP 工具。

**Skill 系统**。三级扫描：内置 Skill、用户级 Skill（`~/.paicli/skills/`）、项目级 Skill（`.paicli/skills/`）。

每个 Skill 是一个目录，里面放 SKILL.md 定义描述和触发条件，frontmatter 支持 name、description、version、author、tags 字段。Agent 启动时自动发现所有 Skill 并生成索引摘要注入系统提示词，运行时通过 load_skill 工具延迟加载完整内容。

Skill 加载后注入下一轮用户消息的上下文，和 Claude Code 的机制思路一致。

**记忆系统**。JSON 文件持久化，支持 global 和 project 两种作用域。全局记忆跨项目共享，项目记忆只在当前工作目录下生效。搜索时用多关键词 overlap 匹配，至少命中 2 个关键词才返回结果，避免单字匹配的噪声。

**8 家模型厂商预配置**。DeepSeek（默认）、GLM（智谱）、Step（阶跃星辰）、Kimi（月之暗面）、Agnes、讯飞星火、FreeLLMAPI、OpenAI。每家的 Base URL、默认模型、上下文窗口大小都配好了。切换厂商只需要设置 `PAICLI_PROVIDER` 环境变量。DeepSeek V4 自动适配 100 万 token 上下文窗口。

**联网搜索**。web_search 工具按优先级依次尝试 SearXNG → SerpAPI → DuckDuckGo HTML 解析。

SearXNG 是自部署搜索引擎，隐私性最好。SerpAPI 是商用搜索服务，结果最稳定。DuckDuckGo 是最后的备用方案，纯 HTML 解析，不需要任何 API Key，直接解析搜索结果页面的 DOM 提取标题、链接和摘要。三个方案覆盖了从“什么都没配”到“全配齐”的所有场景。web_fetch 工具还做了安全过滤，屏蔽 file://、回环地址和私有网段的请求，防止 SSRF。

## 03、如何把 PaiCLI 写到简历上

对照目前市面上 AI Agent 岗位的 JD，PaiCLI 的功能模块基本全覆盖了。

下面是简历上可以直接用的项目描述模板。

项目名称：PaiCLI-Go 终端 Agent CLI（2026.05 - 2026.07）

项目描述：类似 Claude Code 的终端 Agent 命令行工具（Go 版），支持 ReAct 推理、Plan-and-Execute 任务规划、Multi-Agent 多角色编排、MCP 协议接入、Skill 系统、Go AST 代码索引、Snapshot 快照回滚，编译为单二进制文件，可在终端中通过自然语言驱动代码开发和调试。

技术栈：Go 1.26+、Bubble Tea + Lip Gloss + Glamour、cobra、go/ast、go/parser

![](https://cdn.paicoding.com/stutymore/bytedance-performance-ai-agent-20260709143000.png)

核心职责：

- 基于 Go 标准库 net/http 实现 OpenAI-compatible 流式 LLM 客户端，通过 SSE 逐行解析实现 thinking 和 content 双通道流式输出，统一适配 DeepSeek、GLM、Kimi、Step、OpenAI 等 8 家厂商，DeepSeek V4 适配百万 token 窗口
- 实现 ReAct 推理循环，支持 13 个内置工具的 goroutine 并行调度，通过 4 槽位 channel 信号量控制并发度
- 基于 Bubble Tea（Elm 架构）构建全屏终端 TUI，实现流式 thinking 可视化、Markdown 渲染、鼠标滚轮翻页、滚动条、上下文窗口使用进度条，支持全屏和 plain stdin 两种交互模式
- 实现 MCP 协议客户端，支持 stdio 和 HTTP 双传输协议，读取用户级和项目级配置自动发现并注册远端工具，实现 tools/list、tools/call、resources/list、resources/read 完整客户端能力
- 基于 go/ast 和 go/parser 标准库构建 RAG 代码索引，提取函数级符号信息和接收者类型，建立 import 和 contains 关系的代码关系图，搜索时综合余弦相似度和符号匹配打分
- 设计安全策略三件套，PathGuard 解析符号链接防止路径逃逸、CommandGuard 用 9 条正则拦截危险命令、AuditLog 按日期分割 JSONL 记录全量危险操作审计日志
- 实现 Runtime API HTTP 服务，提供 threads/turns/events 三层能力，支持 Bearer Token 和自定义 Header 双重认证，可作为后端 Agent 服务被外部系统调用

## ending

四个语言版本集齐了，Java、Python、TypeScript、Go，核心架构是一套，ReAct、MCP、Memory、RAG、Skill 的实现思路一模一样。

【选一门最顺手的语言，把这几个模块从头到尾写一遍，面试的时候你会发现，Agent 的原理你比面试官还清楚。】

加油吧，兄弟姐妹们。我们下期见。
