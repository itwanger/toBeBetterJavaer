---
title: AI Agent 面试题第三弹：Tool Call、HITL 审批、安全策略 12 题
shortTitle: 面试题：工具与安全
description: 围绕 PaiCLI 第 6、9 期源码，精选 12 道工具系统与安全策略面试题，覆盖 Function Calling、HITL 拦截层、路径围栏、命令黑名单和操作审计，每道题结合源码深度拆解。
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

面试题第三弹，聊**工具系统与安全**。

Agent 的能力边界等于它的工具集——能读什么文件、能跑什么命令、能访问什么网站。但“能力越大责任越大”这句话在 Agent 身上体现得淋漓尽致。一个不加任何约束的 Agent，LLM 的一次幻觉就可能让它 `rm -rf` 整个项目目录。

PaiCLI 在第 6 期做了 HITL 审批 + 路径围栏 + 命令黑名单 + 操作审计，代码在 `com.paicli.policy` 和 `com.paicli.hitl` 包下。这一期的教程我写的标题是“没有 HITL 人工审批的 Agent，rm -rf 他都敢干”——不是开玩笑，我在测试的时候真遇到过 LLM 试图删文件夹的情况。

## 01、Function Calling 的原理是什么

很多人以为 LLM 能“调用工具”是因为它会执行代码。实际上 LLM 什么也不执行，它只是在**写一段特殊格式的文本**。

整个流程是一个协议约定：

1. 客户端在请求体的 `tools` 字段里声明可用工具（名称 + 描述 + 参数 JSON Schema）
2. LLM 生成响应时，如果判断需要工具，在 `tool_calls` 字段里输出工具名和参数 JSON
3. 客户端解析 `tool_calls`，找到对应的执行逻辑跑一遍
4. 把结果以 `role: tool` 消息塞回对话历史
5. 带着结果再请求 LLM，LLM 继续推理

PaiCLI 的 `ToolRegistry.java` 维护了工具名到执行函数的映射。LLM 返回 `{name: "read_file", arguments: {path: "pom.xml"}}`，Agent 从注册表找到 `read_file` 的处理逻辑执行，把文件内容包装成 tool message 塞回去。

### LLM 是怎么“学会”调用工具的

这不是魔法，是训练出来的。模型在 fine-tuning 阶段见过大量的 “tools 定义 + 正确的 tool_calls 输出” 样本，学会了根据工具描述和用户意图生成合理的工具调用 JSON。

所以**工具描述的质量直接影响调用准确率**。PaiCLI 早期踩过这个坑——`execute_command` 的描述太简洁，LLM 经常用 `cat` 命令代替 `read_file` 读文件。后来在描述里加了“不要用来读取文件内容”，问题就解决了。

【此处插入 Function Calling 流程图：截图目标：展示 tools 定义 → LLM tool_calls 响应 → 客户端执行 → 结果回传的完整链路；关键词：tools、tool_calls、ToolRegistry；建议位置：白板/流程图】

## 02、工具的 JSON Schema 怎么设计

每个工具需要定义参数的 JSON Schema，LLM 根据 schema 生成合法的参数。这个 schema 写得好不好，直接影响 LLM 生成参数的质量。

### 最佳实践

**描述要具体**。`description: "读取指定路径的文件内容，返回文件的完整文本"` 比 `description: "读文件"` 好得多。LLM 靠描述理解工具用途。

**参数名要自解释**。`file_path` 比 `p` 好，`max_lines` 比 `n` 好。LLM 生成参数时会参考参数名的语义。

**枚举值要穷举**。如果参数只接受特定值（如 `language: java|python|node`），用 `enum` 约束。别让 LLM 自由发挥写出个 `language: "JavaScript"` 来。

**描述里加示例**。`description: "项目类型，如 java、python、node"` 比 `description: "项目类型"` 的准确率高一截。

PaiCLI 的 `create_project` 工具在 `ToolRegistry.java` 里的定义：

```java
tools.put("create_project", new ToolDefinition(
    "create_project",
    "在当前目录下创建新项目的目录结构，包含基本的配置文件",
    Map.of(
        "name", Map.of("type", "string", "description", "项目名称"),
        "type", Map.of("type", "string", "enum", List.of("java", "python", "node"),
                        "description", "项目类型：java、python 或 node")
    ),
    List.of("name", "type")
));
```

`type` 参数用 `enum` 限死了三个值，LLM 不会写出 `"golang"` 或 `"rust"` 这种不支持的类型。

【此处插入工具定义的代码截图：截图目标：展示 ToolRegistry 中工具的 JSON Schema 定义方式；关键词：ToolDefinition、enum、description；建议位置：IDE/代码截图】

## 03、什么是 HITL

HITL（Human-in-the-Loop，人机协同）是在 Agent 执行高风险操作前暂停，等待人类确认后再继续。

### 为什么 Agent 需要人工审批

三个原因都很现实。LLM 会犯错——模型的幻觉虽然在下降但永远不会到零。文件写入和命令执行是不可逆的——写错了文件内容就覆盖了原文。生产环境需要审计——没有审批机制的 Agent 过不了安全合规审查。

PaiCLI 第 6 期在 `com.paicli.hitl` 包下实现了完整的 HITL 系统。`ApprovalPolicy.java` 定义静态危险规则，`HitlToolRegistry.java` 实现拦截层，`TerminalHitlHandler.java` 处理终端交互。

### 为什么用静态规则不用 LLM 动态判断

这个设计决策面试官很爱追问。答案在 `ApprovalPolicy.java` 里一目了然：

```java
private static final Set<String> DANGEROUS_TOOLS = Set.of(
    "write_file", "execute_command", "create_project", "revert_turn"
);

public static boolean requiresApproval(String toolName) {
    return DANGEROUS_TOOLS.contains(toolName);
}
```

一行 `Set.contains()` 比一次 LLM 调用更可靠。动态判断意味着每次调用工具前都要问 LLM “这个操作危险吗”——不仅慢（多一轮 API 调用），而且不可靠（今天问说危险，明天问可能说安全）。用确定性规则判断“是否需要人工审批”，结果可预期、行为可审计。

【此处插入 HITL 审批弹窗截图：截图目标：展示终端中的 HITL 审批请求格式和选项；关键词：HITL、审批、y/n/a/s/m；建议位置：终端会话窗口】

## 04、HITL 的拦截层是怎么实现的

这是整个 HITL 系统最精巧的部分。`HitlToolRegistry` 继承自 `ToolRegistry`，只覆写了一个方法 `executeTool`：

```java
public class HitlToolRegistry extends ToolRegistry {
    @Override
    public String executeTool(String name, String argumentsJson) {
        if (!hitlHandler.isEnabled() || !ApprovalPolicy.requiresApproval(name)) {
            return super.executeTool(name, argumentsJson);
        }
        ApprovalRequest request = ApprovalRequest.of(name, argumentsJson, null);
        ApprovalResult result = hitlHandler.requestApproval(request);
        
        if (result.isRejected()) return "[HITL] 操作已被拒绝：" + result.reason();
        if (result.isSkipped()) return "[HITL] 操作已被跳过";
        
        return super.executeTool(name, result.effectiveArguments(argumentsJson));
    }
}
```

20 行代码完成拦截。HITL 关闭时 `hitlHandler.isEnabled()` 返回 false，第一个 if 就短路了，直接 `super.executeTool()`——零开销，和普通 ToolRegistry 完全一致。

Agent、PlanExecuteAgent、SubAgent 三条执行路径都用的是同一个 `HitlToolRegistry` 实例，不需要每条路径单独加拦截逻辑。继承在这里的价值是不用改老代码，一个子类搞定。

### 审批选项有哪五种

`ApprovalResult.Decision` 枚举定义了五种：APPROVED（批准）、APPROVED_ALL（全部放行同类工具）、REJECTED（拒绝并带原因）、MODIFIED（修改参数后执行）、SKIPPED（跳过本步骤）。

APPROVED_ALL 是按工具名存的——放行了 `write_file` 不代表放行 `execute_command`。这个粒度是有意为之，文件写入和命令执行的风险差距很大。

【此处插入 HitlToolRegistry 类图：截图目标：展示继承关系和 executeTool 的拦截流程；关键词：HitlToolRegistry、ToolRegistry、继承、executeTool；建议位置：白板/类图】

## 05、路径围栏是怎么实现的

`PathGuard.java` 在 `com.paicli.policy` 包下，强制文件类工具（`read_file`、`write_file`、`list_dir`、`create_project`）只能操作项目目录内的文件。

```java
public static void validatePath(String path, Path projectRoot) throws SecurityException {
    Path resolved = projectRoot.resolve(path).normalize();
    Path realPath = resolved.toRealPath(); // 跟踪符号链接
    if (!realPath.startsWith(projectRoot.toRealPath())) {
        throw new SecurityException("路径越界: " + path);
    }
}
```

### 能防住什么攻击

三种常见的路径越界：

**绝对路径逃逸**：LLM 被 prompt 注入诱导读 `/etc/passwd`。`resolve` 后路径不在项目内，拒绝。

**相对路径穿越**：`../../etc/passwd`。`normalize` 消除 `..` 后，`resolve` 得到的路径在项目外，拒绝。

**符号链接逃逸**：项目内有个 symlink `data -> /etc/`。`toRealPath()` 跟踪到真实目标 `/etc/`，不在项目内，拒绝。

关键细节：**必须用 `Files.toRealPath()` 而不是 `getCanonicalPath()`**。前者在所有平台上都会跟踪符号链接到最终目标，后者在某些边界情况下行为不一致。这个坑我在开发时踩过——用 `getCanonicalPath` 在某些 macOS 路径上没有正确解析 symlink。

【此处插入 PathGuard 拦截日志截图：截图目标：展示路径越界被拦截的终端输出；关键词：PathGuard、路径越界、SecurityException；建议位置：终端会话窗口】

## 06、命令黑名单怎么设计

`CommandGuard.java` 在 HITL 之前做 fast-fail，直接拒绝明确危险的命令，连审批弹窗都不弹——因为这些命令在 Agent 场景下几乎不可能有合法用途。

黑名单用正则匹配覆盖变体（`rm -rf /` 和 `rm -r -f /` 都能匹配到）：

| 类别 | 示例命令 |
|---|---|
| 提权 | `sudo xxx` |
| 全盘删除 | `rm -rf /`、`rm -rf /*` |
| 磁盘格式化 | `mkfs.ext4 /dev/sda` |
| 裸设备写入 | `dd if=/dev/zero of=/dev/sda` |
| Fork bomb | `:(){ :\|:& };:` |
| 远程执行 | `curl ... \| sh`、`wget ... \| bash` |
| 全盘扫描 | `find /` |
| 全局权限 | `chmod 777 /` |
| 关机 | `shutdown`、`reboot` |

### 分层防御的思路

CommandGuard 是第一层（fast-fail），HITL 是第二层（人工审批），`execute_command` 的 60 秒超时是第三层（兜底）。三层叠加才形成有效的安全网。

面试官可能问“黑名单会不会误杀”。会——比如用户真想在 Agent 里跑 `sudo apt install xxx`，黑名单会拦住。但在 Agent 场景下，这个误杀是可以接受的。宁可误杀不可漏杀，被误杀的命令用户可以自己到终端里手动跑。

【此处插入 /policy 命令输出截图：截图目标：展示安全策略状态（路径围栏、命令黑名单、资源上限）；关键词：PathGuard、CommandGuard、policy；建议位置：终端会话窗口】

## 07、操作审计怎么做

`AuditLog.java` 把每次危险工具调用记录到 `~/.paicli/audit/audit-YYYY-MM-DD.jsonl`，按天分文件，JSONL 格式（每行一个 JSON）。

```json
{
  "timestamp": "2026-05-11T10:30:00",
  "tool": "execute_command",
  "params": {"command": "mvn compile"},
  "outcome": "allow",
  "approver": "hitl"
}
```

### 审计记录里有什么讲究

`outcome` 有三种值：`allow`（放行）、`deny`（拒绝）、`error`（执行出错）。`approver` 有三种：`hitl`（人工审批放行）、`policy`（策略自动放行，比如 APPROVED_ALL）、`none`（无需审批）。

参数里的敏感信息会自动脱敏——token、key、password、Authorization、Bearer 这些字段的值会被替换成 `***`。这个在审计日志被第三方审查时很重要。

写入是并发安全的，多个 Agent 线程同时写日志不会丢数据。`/audit 10` 命令可以在 CLI 里快速查看最近 10 条。

【此处插入 /audit 命令输出截图：截图目标：展示最近的审计记录列表；关键词：audit、outcome、approver、脱敏；建议位置：终端会话窗口】

## 08、web_search 和 web_fetch 怎么分工

两个工具在 `com.paicli.tool` 里，职责分明：

**web_search**：搜索引擎查询，返回结构化结果（标题 + 摘要 + URL）。背后是 `SearchProvider` 接口，PaiCLI 内置了智谱 Web Search（默认）、SerpAPI、SearXNG 三个实现。

**web_fetch**：抓取已知 URL 页面内容，用 Jsoup 做 readability 提取，返回正文 Markdown。

### 安全策略怎么做

核心是防 SSRF（Server-Side Request Forgery）——不能让 LLM 引导 Agent 访问内网服务。

`web_fetch` 的安全规则写在代码里：只允许 `http://` 和 `https://`，禁止 `file://`。屏蔽内网地址（10.x、192.168.x、172.16-31.x）和 loopback（127.0.0.1）。30 秒超时。5MB 响应上限。每分钟 30 次频率限制。

这些规则不走 HITL（太频繁会打断体验），直接在工具内部硬编码。

【此处插入 web_fetch 抓取效果截图：截图目标：展示 URL 抓取后的 Markdown 正文输出；关键词：web_fetch、Jsoup、readability、Markdown；建议位置：终端会话窗口】

## 09、web_fetch 拿不到内容怎么办

`web_fetch` 搞不定 SPA（JavaScript 动态渲染）和防爬墙站点（微信公众号、知乎、小红书）。这类站点返回的是空壳 HTML 或者反爬提示。

PaiCLI 的解决路径不是在代码里硬编码 fallback，而是通过 system prompt 里的**工具选择决策表**引导 LLM 自己判断。LLM 看到 `web_fetch` 返回的空正文 + “已知边界”提示后，会主动选择 Chrome DevTools MCP 的浏览器工具。

```
web_fetch → 拿到正文 → 直接用
         → 空正文/防爬 → LLM 自动切到 mcp__chrome-devtools__navigate_page
                        → mcp__chrome-devtools__take_snapshot → 拿到 DOM 文本
```

这个决策逻辑后来被封装进了第 15 期的 web-access Skill——一份按场景组织的“浏览专家手册”，里面有微信公众号、知乎、GitHub 等站点的经验。

【此处插入 web_fetch 到浏览器 fallback 的完整流程截图：截图目标：展示 web_fetch 失败后 Agent 自动切换到浏览器 MCP 的日志；关键词：web_fetch 失败、take_snapshot、fallback；建议位置：终端会话窗口】

## 10、HITL 的“全部放行”为什么区分工具和 server 两个维度

连续操作时频繁弹审批很烦。用户对 `write_file` 选了 `a`（APPROVED_ALL）后，后续所有 `write_file` 免审——这是**工具维度**放行。

第 13 期接入 Chrome DevTools MCP 后加了**server 维度**放行。浏览器操作是连续的——导航、点击、填表单、截图，每步都审批体验极差。用户对 `chrome-devtools` 选 `a → server` 后，该 MCP server 的所有工具一律免审。

### 安全边界

切换浏览器模式（shared → isolated 或反过来）时，PaiCLI 会自动清空 server 维度的全部放行——避免旧信任跨安全上下文延续。shared 模式下敏感页面命中规则后，改写型工具（click、fill_form、evaluate_script）必须单步 HITL 审批，即使 server 维度已放行也不生效。

`HitlToolRegistry` 里用 `approvedAllTools`（工具维度，`ConcurrentHashMap.newKeySet()`）和 `approvedAllByServer`（server 维度）两个集合分别管理。

## 11、如果 LLM 被 prompt 注入，安全策略能防住吗

Prompt 注入是攻击者在输入或工具返回内容里嵌入恶意指令，诱导 LLM 执行非预期操作。

### 能防住的

读 `/etc/passwd` → PathGuard 拦截。`rm -rf /` → CommandGuard 黑名单。SSRF 访问 `http://169.254.169.254/` → 内网地址屏蔽。

### 防不住的

LLM 被诱导在项目目录内写入恶意代码（路径合法，内容恶意）。LLM 被诱导执行看似正常但有副作用的命令（如 `curl` 上传代码到外部服务器，且不在黑名单里）。

结论：静态规则能拦截已知的危险模式，但防不住所有 prompt 注入。**HITL 是最后一道防线——人眼审查**。这也是 HITL 存在的核心价值，不只是“确认一下”，而是在模型可能被操纵时守住最后的关口。

【此处插入 prompt 注入防御层次图：截图目标：展示 CommandGuard → PathGuard → HITL → 审计的四层防御；关键词：prompt 注入、分层防御、最后防线；建议位置：白板/流程图】

## 12、设计一个新工具给 Agent 用，要考虑哪些事

这是开放题。从 PaiCLI 的 9 个内置工具 + 60+ MCP 工具的实战经验，总结六个要点。

**边界清晰**。一个工具只做一件事。`web_search` 搜索、`web_fetch` 抓页面，不要合成一个“万能网络工具”。LLM 面对功能模糊的工具会选择困难。

**Schema 严格**。必填/可选、类型、枚举、描述全部写清楚。LLM 靠 schema 生成参数，schema 模糊了参数就乱了。

**返回值对 LLM 友好**。返回结构化文本而不是 raw JSON。LLM 读 `"文件内容：\n public class Main..."` 比读 `{"status": 200, "body": "..."}` 更自然。

**安全分级**。确定这个工具是只读还是写入。写入类默认走 HITL，网络类加频率限制和地址过滤。

**超时和资源限制**。每个工具都要有超时，返回值要有大小上限。一个工具卡死不能拖垮整个 Agent。

**错误信息要有用**。工具失败时返回的错误信息要让 LLM 能判断该重试、换参数还是放弃。`"文件不存在: /path/to/file"` 比 `"Error"` 有用得多。

## ending

这 12 道题对应的源码在 `com.paicli.policy`（PathGuard、CommandGuard、AuditLog）和 `com.paicli.hitl`（ApprovalPolicy、HitlToolRegistry、TerminalHitlHandler）两个包里。

`HitlToolRegistry.java` 那 20 行拦截代码，是整个安全系统的核心。面试时把它拿出来讲——继承怎么用的、拦截怎么做的、零开销怎么实现的，比说十遍“我做了安全策略”有用得多。

下一篇进入**MCP 协议与生态**。

**简历包装**

**项目名称**：PaiCLI — Java Agent CLI（对标 Claude Code）

**项目简介**：从零实现的终端 AI Agent，内置四层安全防护（HITL 审批 + 路径围栏 + 命令黑名单 + 操作审计），支持 Function Calling 工具调用和联网搜索/抓取。

**技术栈**：Java 17、OkHttp 网络请求、Jsoup HTML 解析、JSONL 审计日志、ConcurrentHashMap 并发安全

**核心职责**：

1. 基于静态规则实现 HITL 拦截层（`HitlToolRegistry` 继承 `ToolRegistry`），覆写 `executeTool()` 注入审批逻辑，HITL 关闭时零开销，共享于 ReAct/Plan/Multi-Agent 三条执行路径
2. 实现路径围栏（`PathGuard`），通过 `Files.toRealPath()` 消除符号链接后校验文件路径是否在项目根目录内，拦截绝对路径逃逸、相对路径穿越和 symlink 逃逸三类攻击
3. 设计命令黑名单（`CommandGuard`），用正则匹配覆盖 sudo/rm -rf/mkfs/dd/fork bomb 等 9 类危险命令变体，在 HITL 之前做 fast-fail 拒绝
4. 实现结构化审计日志（`AuditLog`），危险工具调用按天写 JSONL 到 `~/.paicli/audit/`，含 outcome/approver 字段和参数自动脱敏，支持 `/audit` 快速查看
5. 实现联网工具 `web_search`（三条路：智谱/SerpAPI/SearXNG）和 `web_fetch`（OkHttp + Jsoup readability），内置 SSRF 防护（内网屏蔽）、5MB 响应上限和每分钟 30 次限流
