---
title: AI Agent 面试题第三弹：Tool Call、HITL 审批、安全策略 12 题
shortTitle: 面试题：工具与安全
description: 围绕 PaiCLI 实战，精选 12 道 AI Agent 工具系统与安全策略面试题，覆盖 Function Calling、HITL、路径围栏、命令黑名单和操作审计。
tag:
  - Agent
  - 面试题
  - 安全
category:
  - AI
author: 沉默王二
date: 2026-05-11
---

大家好，我是二哥呀。

这篇是 AI Agent 面试题系列的第三弹，聚焦**工具系统与安全**。对应 PaiCLI 的第 6 期（HITL 审批）和第 9 期（联网能力），以及贯穿全项目的工具设计思路。

Agent 的能力边界基本等于它的工具集——能读什么文件、能执行什么命令、能访问什么网站。而安全策略决定了 Agent 在什么条件下才能动用这些能力。面试官对这块的追问通常很深。

## 01、Function Calling 的原理是什么？LLM 是怎么"调用工具"的？

LLM 本身不执行代码，所谓"工具调用"其实是一个**协议约定**：

1. 客户端在请求体里声明可用工具（tools 字段），包含工具名、描述和参数 JSON Schema
2. LLM 生成响应时，如果判断需要调用工具，会在 `tool_calls` 字段里输出工具名和参数 JSON
3. 客户端解析 `tool_calls`，执行对应逻辑，把结果以 `role: tool` 消息塞回对话历史
4. 客户端带上工具结果再请求 LLM，LLM 继续推理

本质上，LLM 只是在"写一段特殊格式的文本"（工具调用 JSON），真正的执行由客户端完成。

PaiCLI 的 `ToolRegistry` 维护了工具名到执行函数的映射：LLM 返回 `tool_calls: [{name: "read_file", arguments: {path: "pom.xml"}}]`，Agent 从注册表找到 `read_file` 的处理逻辑，执行后把文件内容包装成 tool message 塞回去。

## 02、工具的 JSON Schema 怎么设计？有什么最佳实践？

每个工具需要定义参数的 JSON Schema，LLM 根据 schema 生成合法的参数 JSON。

最佳实践：

**1. 描述要具体**：`description: "读取指定路径的文件内容"` 比 `description: "读文件"` 好。LLM 靠描述理解工具用途。

**2. 参数名要自解释**：`file_path` 比 `p` 好，`max_lines` 比 `n` 好。

**3. 必填和可选要分清**：`required` 字段明确标注哪些参数必须传。LLM 对可选参数有时会忘记传或瞎传。

**4. 枚举值要穷举**：如果参数只接受特定值（如 `language: java|python|node`），用 `enum` 约束，别让 LLM 自由发挥。

**5. 描述里加例子**：`description: "项目类型，如 java、python、node"` 比 `description: "项目类型"` 的准确率更高。

PaiCLI 踩过的坑：早期 `execute_command` 的 `command` 参数描述写得太简洁，LLM 经常生成不合理的命令。加了"在项目根目录执行的短时 Shell 命令，如 ls、cat、mvn compile"后准确率明显提升。

## 03、什么是 HITL？为什么 Agent 需要人工审批？

HITL（Human-in-the-Loop，人机协同）是在 Agent 执行高风险操作前暂停，等待人类确认后再继续。

为什么需要：

- **LLM 会犯错**：LLM 可能误解用户意图，执行 `rm -rf` 或写入错误内容。
- **不可逆操作**：文件写入、命令执行、网络请求一旦执行就很难撤销。
- **安全合规**：生产环境的 Agent 必须有审批机制，否则无法通过安全审计。

PaiCLI 的 HITL 设计：

- **默认关闭**：`/hitl on` 启用，避免频繁弹窗影响日常使用体验
- **三级危险等级**：高危（`execute_command`）、中危（`write_file`/`create_project`）、安全（`read_file`/`list_dir`）
- **审批选项**：批准(y)、全部放行(a)、拒绝(n)、跳过(s)、修改参数后执行(m)

全部放行支持两个维度：工具维度（放行所有 `write_file`）和 server 维度（放行某个 MCP server 的所有工具）。

## 04、路径围栏是怎么实现的？能防住什么攻击？

`PathGuard` 是 PaiCLI 的路径安全层，强制文件类工具只能操作项目目录内的文件。

实现原理：

```
用户传入路径 → 解析为绝对路径 → Files.toRealPath() 消除符号链接
→ 检查是否在项目根目录之下 → 通过则放行，否则拒绝
```

能防住的攻击：

1. **绝对路径逃逸**：LLM 被 prompt 注入诱导读 `/etc/passwd`，PathGuard 拒绝。
2. **相对路径穿越**：`../../etc/passwd`，PathGuard 解析后发现不在项目内，拒绝。
3. **符号链接逃逸**：项目内有一个 symlink 指向 `/etc/`，`Files.toRealPath()` 跟踪到真实路径后发现在项目外，拒绝。

关键细节：**必须用 `Files.toRealPath()` 而不是 `getCanonicalPath()`**。前者会跟踪符号链接到最终目标，后者在某些边界情况下行为不一致。

## 05、命令黑名单怎么设计？怎么防止 Agent 执行危险命令？

`CommandGuard` 在 HITL 之前做 fast-fail 检查，直接拒绝明确危险的命令，连审批弹窗都不弹。

PaiCLI 的黑名单：

| 类别 | 匹配规则 | 示例 |
|---|---|---|
| 提权 | `sudo` 开头 | `sudo rm -rf /` |
| 全盘删除 | `rm -rf /` 或 `rm -rf /*` | |
| 磁盘格式化 | `mkfs` | `mkfs.ext4 /dev/sda` |
| 裸设备写入 | `dd of=/dev` | `dd if=/dev/zero of=/dev/sda` |
| Fork bomb | `:(){ :|:& };:` | |
| 远程执行 | `curl ... \| sh` 或 `wget ... \| bash` | |
| 全盘扫描 | `find /` | |
| 全局权限 | `chmod 777 /` | |
| 关机 | `shutdown` / `reboot` | |

设计原则：

- **宁可误杀不可漏杀**：黑名单里的命令在 Agent 场景下几乎不会有合法用途。
- **正则匹配**：用正则而不是精确匹配，覆盖变体（`rm -rf /` 和 `rm -r -f /` 都匹配）。
- **分层防御**：黑名单是第一层，HITL 是第二层，`execute_command` 的 60 秒超时是第三层。

## 06、为什么 PaiCLI 不做沙箱？真正的沙箱长什么样？

PaiCLI 不做沙箱的原因：

1. **本地 Agent CLI 做沙箱是伪命题**：你让 Agent 帮你改代码，沙箱把文件系统隔离了，Agent 改不了你的文件，就没用了。
2. **业界共识**：Claude Code、Cursor、Aider、Codex CLI 都不做容器沙箱。
3. **虚假安全感**：沙箱让人以为"随便用，出不了事"，反而降低警惕。

真正的沙箱：

- **Devin**：每个会话在 Firecracker microVM 里运行，完全隔离的虚拟机。
- **Anthropic Computer Use**：gVisor 容器，限制系统调用。
- **Modal / E2B**：云端沙箱环境，Agent 在远程容器里操作。

这些方案的共同点是**Agent 操作的不是你的本地文件系统**——它操作的是一个副本或远程环境。这和"本地 Agent CLI"的定位是根本矛盾的。

PaiCLI 的安全模型是：**HITL 审批 + PathGuard 路径围栏 + CommandGuard 命令黑名单 + AuditLog 操作审计**，四层防护，不搞隔离。

## 07、操作审计怎么设计的？审计日志记什么？

`AuditLog` 把每次危险工具调用记录到 `~/.paicli/audit/audit-YYYY-MM-DD.jsonl`，按天分文件。

每条审计记录包含：

```json
{
  "timestamp": "2026-05-11T10:30:00",
  "tool": "execute_command",
  "params": {"command": "mvn compile"},
  "outcome": "allow",
  "approver": "hitl",
  "browser_mode": null,
  "sensitive": false
}
```

关键字段：

- **outcome**：`allow`（放行）/ `deny`（拒绝）/ `error`（执行出错）
- **approver**：`hitl`（人工审批放行）/ `policy`（策略自动放行）/ `none`（无需审批）
- **脱敏**：参数里的 token、key、password、Authorization、Bearer 等字段会自动脱敏

审计日志是 JSONL 格式（每行一个 JSON），方便用 `jq` 等工具分析。`/audit 10` 可以在 CLI 里快速查看最近 10 条。

设计亮点：审计写入是并发安全的，多个 Agent 线程同时写日志不会串行或丢数据。

## 08、web_search 和 web_fetch 分别解决什么问题？安全策略怎么做？

两个工具职责分明：

- **web_search**：搜索引擎查询，返回结构化搜索结果（标题 + 摘要 + URL）。适合"最新版本是什么"、"XXX 怎么用"这类开放问题。
- **web_fetch**：抓取已知 URL 的页面内容，提取正文 Markdown。适合"帮我看下这篇文章"这类有明确目标的需求。

安全策略：

| 策略 | 细节 |
|---|---|
| 协议限制 | 只允许 `http://` 和 `https://`，禁止 `file://` |
| 地址限制 | 屏蔽内网地址（10.x、192.168.x、172.16-31.x）和 loopback（127.0.0.1） |
| 超时 | 30 秒连接 + 读取超时 |
| 响应上限 | 5MB，超过截断 |
| 频率限制 | 每分钟 30 次 |

安全设计的核心原则是**防止 SSRF（Server-Side Request Forgery）**：Agent 不能被 LLM 引导去访问内网服务。

## 09、web_fetch 拿不到内容（SPA/防爬墙）怎么办？

`web_fetch` 用 OkHttp 发请求 + Jsoup 解析 HTML，对服务端渲染的页面有效，但搞不定：

- **SPA（单页应用）**：页面内容由 JavaScript 动态生成，`web_fetch` 拿到的是空壳 HTML。
- **防爬墙**：微信公众号、知乎、小红书等平台有防爬机制，直接请求拿不到正文。

PaiCLI 的解决路径：

```
web_fetch 尝试 → 拿到正文 → 直接用
                → 拿不到（空正文/防爬提示） → Agent 自动 fallback 到浏览器 MCP
                                              → mcp__chrome-devtools__navigate_page
                                              → mcp__chrome-devtools__take_snapshot
                                              → 拿到 DOM 文本内容
```

这个 fallback 逻辑不是硬编码的——而是通过 system prompt 里的"工具选择决策表"引导 LLM 自己判断。LLM 看到 `web_fetch` 返回的空正文 + "已知边界"提示后，会主动选择浏览器工具。

## 10、HITL 的"全部放行"为什么要区分工具维度和 server 维度？

连续操作时频繁弹审批窗口体验极差。"全部放行"让用户一次确认后，后续同类操作免审。

但放行粒度很重要：

- **工具维度**：放行 `write_file` 后，所有文件写入免审。适合用户信任 Agent 改代码的场景。
- **Server 维度**：放行 `chrome-devtools` 后，该 MCP server 的所有工具（navigate_page、click、fill_form...）免审。适合连续浏览器操作——导航、点击、填表单，一个接一个，每次审批太烦。

为什么不能只有"全部放行所有工具"？**因为信任范围不同**。用户可能信任 `read_file` 和 `list_dir` 不做坏事，但不想放行 `execute_command`。工具维度让用户精确控制放行范围。

PaiCLI 在切换浏览器模式（shared → isolated 或反过来）时，会自动清空 server 维度的全部放行，避免旧信任跨安全上下文延续。

## 11、如果 LLM 被 prompt 注入，你的安全策略能防住吗？

Prompt 注入是攻击者在用户输入或工具返回内容里嵌入恶意指令，诱导 LLM 执行非预期操作。

PaiCLI 能防住的场景：

- **读敏感文件**：LLM 被诱导 `read_file /etc/passwd` → PathGuard 拦截（路径不在项目内）
- **执行危险命令**：LLM 被诱导 `rm -rf /` → CommandGuard 黑名单拦截
- **SSRF**：LLM 被诱导 `web_fetch http://169.254.169.254/latest/meta-data/` → 内网地址屏蔽

**防不住的场景**：

- LLM 被诱导在项目目录内写入恶意代码（路径合法，内容恶意）
- LLM 被诱导执行看似正常但有副作用的命令（如 `curl` 上传代码到外部服务器，且不在黑名单里）

**结论**：静态规则能拦截已知的危险模式，但防不住所有 prompt 注入。HITL 是最后一道防线——人眼审查。这也是 HITL 存在的核心价值。

## 12、设计一个新工具给 Agent 用，你要考虑哪些事？

面试开放题。从 PaiCLI 的工具设计实践出发：

**1. 定义清晰的边界**：一个工具只做一件事。`web_search` 搜索、`web_fetch` 抓页面，不要合成一个"万能网络工具"。

**2. 参数 Schema 要严格**：必填/可选、类型、枚举值、描述全部写清楚。LLM 靠 schema 生成参数。

**3. 返回值要对 LLM 友好**：返回结构化文本而不是 raw JSON。LLM 更擅长理解自然语言格式的结果。

**4. 安全分级**：确定这个工具是只读还是写入、是本地还是网络。写入类默认走 HITL，网络类考虑频率限制和地址过滤。

**5. 超时和资源限制**：每个工具都要有超时，返回值要有大小上限。一个工具卡死不能拖垮整个 Agent。

**6. 错误信息要有用**：工具失败时返回的错误信息要让 LLM 能判断该重试、换参数还是放弃。"文件不存在: /path/to/file" 比 "Error" 有用得多。

## ending

这 12 道题覆盖了 Agent 工具系统和安全策略的核心：Function Calling 协议、HITL 审批设计、路径围栏、命令黑名单、操作审计、联网安全。

下一篇我们进入**MCP 协议与生态**——stdio/HTTP 传输、工具自动注册、Chrome DevTools 集成、CDP 会话复用。
