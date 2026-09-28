调研日期 2026-09-24，基于 paicli commit ea8e05a

# PaiCLI edit_file 与文件工具调研

源码仓库 /Users/itwanger/Documents/GitHub/paicli，HEAD 为 ea8e05a。edit_file 由 36a2677（2026-09-23，“feat: strengthen context compaction and add edit_file”）引入，之后 5 个提交（a0fd238 到 ea8e05a）没有改动 edit_file、write_file、read_file 的实现，ToolRegistry 的后续改动只涉及命令沙箱和 ExternalContextTracker。

## 一、edit_file 机制

### 1.1 注册位置与 JSON Schema

- 类：`com.paicli.tool.ToolRegistry`
- 文件：`src/main/java/com/paicli/tool/ToolRegistry.java`
- 注册：`registerFileTools()` 第 402–411 行；执行：`private String editFile(Map<String, String> args)` 第 467–504 行

```java
tools.put("edit_file", new Tool(
        "edit_file",
        "精确替换项目内已有文件的一处文本；old_text 必须恰好匹配一次，模型无需输出整个文件",
        createParameters(
                new Param("path", "string", "已有文件路径", true),
                new Param("old_text", "string", "要替换的原文片段，必须唯一匹配", true),
                new Param("new_text", "string", "替换后的文本；空字符串表示删除原文片段", true)
        ),
        this::editFile
));
```

`createParameters` 生成的 Schema 形如 `{"type":"object","properties":{"path":{...},"old_text":{...},"new_text":{...}},"required":["path","old_text","new_text"]}`，三个参数全部必填，类型都是 string。

注意参数名是 `old_text` / `new_text`，不是 Claude Code 的 `old_string` / `new_string`。没有 `replace_all` 参数，也没有 `expected_replacements` 之类的计数参数。

### 1.2 替换语义与报错原文

```java
private String editFile(Map<String, String> args) {
    String path = args.get("path");
    String oldText = args.get("old_text");
    String newText = args.get("new_text");
    if (oldText == null || oldText.isEmpty() || newText == null) {
        throw new IllegalArgumentException("old_text 必须非空，new_text 必须提供");
    }
    Path safe = pathGuard.resolveSafe(path);
    if (!Files.isRegularFile(safe)) {
        throw new IllegalArgumentException("目标不是已有的普通文件: " + path);
    }
    try {
        String before = Files.readString(safe, StandardCharsets.UTF_8);
        int first = before.indexOf(oldText);
        if (first < 0) {
            throw new IllegalArgumentException("old_text 在文件中不存在: " + path);
        }
        if (before.indexOf(oldText, first + 1) >= 0) {
            throw new IllegalArgumentException("old_text 在文件中出现多次，请提供更长的上下文: " + path);
        }
        String after = before.substring(0, first) + newText + before.substring(first + oldText.length());
        int contentBytes = after.getBytes(StandardCharsets.UTF_8).length;
        if (contentBytes > MAX_WRITE_FILE_BYTES) {
            throw new PolicyException("编辑后文件 " + contentBytes + " 字节超过 "
                    + (MAX_WRITE_FILE_BYTES / 1024 / 1024) + "MB 上限");
        }
        Files.writeString(safe, after, StandardCharsets.UTF_8);
        ...
        runPostEditLspHook(path, safe);
        return "文件已编辑: " + path;
    } catch (IOException e) {
        throw new IllegalStateException("编辑文件失败: " + e.getMessage(), e);
    }
}
```

要点：

- 纯字面量匹配（`String.indexOf`），不是正则，也不做空白或缩进归一化。
- 只替换一处。第二次查找从 `first + 1` 开始，所以重叠匹配也算“多次”（单测 `editFileRejectsOverlappingMatches`：文件内容 `aaa`、`old_text` 为 `aa` 会被拒绝）。
- `new_text` 可以是空字符串，语义是删除这段原文。`old_text` 不能为空字符串。
- 只能编辑已存在的普通文件，不能用来新建文件。新建文件仍然走 write_file。
- 编辑后的整个文件不能超过 5MB（与 write_file 共用常量 `MAX_WRITE_FILE_BYTES = 5 * 1024 * 1024`）。

模型最终看到的文本，由 `doExecuteTool`（第 1327–1402 行）统一包装：

| 触发条件 | 异常类型 | 模型收到的结果 | 审计 outcome |
|---|---|---|---|
| old_text 为空或 new_text 缺失 | IllegalArgumentException | `工具执行失败: old_text 必须非空，new_text 必须提供` | error |
| 路径为空 | PolicyException（PathGuard） | `🛡️ 策略拒绝: 路径不能为空` | deny |
| 路径越界 | PolicyException（PathGuard） | `🛡️ 策略拒绝: 路径越界: <path> 不在项目根 <root> 之内` | deny |
| 目标不存在或是目录 | IllegalArgumentException | `工具执行失败: 目标不是已有的普通文件: <path>` | error |
| 找不到匹配 | IllegalArgumentException | `工具执行失败: old_text 在文件中不存在: <path>` | error |
| 多处匹配 | IllegalArgumentException | `工具执行失败: old_text 在文件中出现多次，请提供更长的上下文: <path>` | error |
| 编辑后超 5MB | PolicyException | `🛡️ 策略拒绝: 编辑后文件 N 字节超过 5MB 上限` | deny |
| 读写 IO 异常（含非 UTF-8 文件解码失败） | IllegalStateException | `工具执行失败: 编辑文件失败: <IOException message>` | error |
| 成功 | 无 | `文件已编辑: <path>` | allow |

这几条失败结果都经过 `ToolOutput.failure(...)`，`successful=false`。

参数解析细节：`doExecuteTool` 用 `entry.getValue().asText()` 把每个 JSON 字段转成字符串放进 `Map<String,String>`。如果模型把 `new_text` 传成 JSON null，`asText()` 得到字符串 `"null"`，会被当作字面文本 `null` 写入（从代码推断，没有对应单测，未实测）。

### 1.3 是否要求先 read_file

不要求。源码里没有“读前校验”，没有记录已读文件，没有比对文件修改时间或内容哈希。`TurnToolPolicy` 里也没有 read_file / write_file / edit_file 相关的检查（grep 无命中）。

替代手段只有提示词约束，`src/main/resources/prompts/base.md` 第 73 行：

```
- 修改已有文件的局部内容优先用 `edit_file`；`old_text` 必须唯一匹配，失败时先重新读取相关片段，不要猜测原文。
```

因为 edit_file 在执行时才读文件，并且要求原文唯一精确匹配，模型如果凭记忆写了过时的 `old_text`，会直接得到“不存在”的报错，这是事实上的弱一致性保护，但不等于 Claude Code 那种“未读先改就拒绝”的硬校验。

### 1.4 换行、缩进、编码

- 读写都显式用 UTF-8（`Files.readString(safe, StandardCharsets.UTF_8)` / `Files.writeString(safe, after, StandardCharsets.UTF_8)`）。
- 不做 CRLF / LF 归一化。CRLF 文件里，模型给出 `\n` 分隔的 `old_text` 会匹配失败（从代码推断，未实测）。
- 不做缩进或行尾空白的模糊匹配。
- 非 UTF-8 文件（例如 GBK）在 `Files.readString` 解码时抛 `MalformedInputException`，结果是“编辑文件失败”（从代码推断，未实测）。
- 替换只动匹配区间，文件其余部分（包括 BOM、末尾换行）原样保留。

对比：write_file 用的是 `Files.readString(safe)` 和 `Files.writeString(safe, content)`，没有显式指定字符集，走 JDK 默认 UTF-8。

### 1.5 写入方式

- 直接 `Files.writeString` 覆盖原文件，默认选项 CREATE、TRUNCATE_EXISTING、WRITE。不是“写临时文件再原子 rename”，也不生成 `.bak` 备份。
- 没有文件级锁。`executeTools` 对同一批次的多个非浏览器工具调用最多 4 线程并行（`MAX_PARALLEL_TOOLS = 4`），同一批次里对同一文件的两次 edit_file 是否会互相覆盖，源码里没看到保护（未确认，未实测）。
- 可回滚性来自轮次级 Side-Git 快照：`SnapshotService.runTurn(...)` 在每轮开始前调用 `snapshotBeforeTurn`（`src/main/java/com/paicli/snapshot/SnapshotService.java` 第 29–49 行），Main.java 第 967 行和 TuiSessionController 第 277 行用它包裹一轮任务。之后可用 `revert_turn` 工具或 `/restore <N>` 恢复。这是按轮次恢复，不是按单次 edit 恢复。

### 1.6 路径安全

`pathGuard.resolveSafe(path)`，类 `com.paicli.policy.PathGuard`（`src/main/java/com/paicli/policy/PathGuard.java`）。

- 相对路径基于项目根解析，绝对路径直接 normalize。
- 向上找到最近的存在祖先调用 `toRealPath()`，能识别 `..` 穿越和符号链接逃逸。
- 根目录本身也先 `toRealPath()`，解决 macOS `/var` 与 `/private/var` 的问题。
- 越界抛 `PolicyException("路径越界: " + input + " 不在项目根 " + rootPath + " 之内")`。

单测 `editFileRejectsPathOutsideProject` 覆盖了 `../outside.txt`。

注意 PathGuard 的类注释自己说明“不是沙箱（不提供进程隔离）”，它只是 HITL 之前的输入合法性检查。

### 1.7 与 write_file 的分工

| 维度 | write_file | edit_file |
|---|---|---|
| 用途 | 新建文件或整文件覆盖 | 已有文件的局部精确替换 |
| 参数 | path、content | path、old_text、new_text |
| 文件不存在 | 自动 `createDirectories(parent)` 后新建 | 报错“目标不是已有的普通文件” |
| 大小上限 | content 超 5MB 拒绝（写前检查） | 编辑后整个文件超 5MB 拒绝 |
| 失败返回风格 | 内部 catch，返回“写入文件失败: …” | 抛异常，由外层包成“工具执行失败: …” |
| 字符集 | 默认（UTF-8） | 显式 UTF-8 |
| diff 观察者 | 调用，before 可能为 null | 调用，before 一定非 null |
| LSP post-edit 诊断 | 调用 | 调用 |
| HITL 等级 | 🟡 中危 | 🟡 中危 |
| 审计 | 是 | 是 |

提示词分工（base.md 第 73 行）：“修改已有文件的局部内容优先用 `edit_file`”。AGENTS.md 第 107 行的表述：“`edit_file` 仅精确替换已有文件中唯一匹配的 `old_text`，局部修改时模型无需输出整个文件；与 `write_file` 一样受路径限制、HITL 审批和审计约束。”

### 1.8 HITL 风险级别

`com.paicli.hitl.ApprovalPolicy`（`src/main/java/com/paicli/hitl/ApprovalPolicy.java`）：

```java
private static final Set<String> DANGEROUS_TOOLS = Set.of(
        "write_file",
        "edit_file",
        "execute_command",
        "create_project",
        "revert_turn"
);
...
case "execute_command" -> "🔴 高危";
case "revert_turn" -> "🔴 高危";
case "write_file", "edit_file" -> "🟡 中危";
case "create_project" -> "🟡 中危";
default -> isMcpTool(toolName) ? "🟡 MCP" : "🟢 安全";
...
case "edit_file" -> "将替换文件中唯一匹配的原文片段";
```

- `requiresApproval` = `DANGEROUS_TOOLS.contains(toolName) || isMcpTool(toolName)`。
- 审批框（`ApprovalRequest.toDisplayText()`）逐字段展示参数，字符串超过 120 字符截断为前 120 字符并附总长度，换行显示为 `⏎`。所以 edit_file 审批时用户看到的是 `old_text` / `new_text` 的文本预览，不是 diff。
- 微信通道（`WechatPolicyDecider` 第 27 行）对 write_file、edit_file、create_project 直接放行，仍受 PathGuard 限制。

### 1.9 diff 展示

有，但发生在写入之后，不在审批之前。

- `ToolRegistry.setWriteFileObserver(BiConsumer<String, String[]>)`，参数 `(path, [before, after])`。
- Main.java 第 380–381 行、TuiBootstrap.java 第 145–146 行注册为 `renderer.appendDiff(path, ba[0], ba[1])`。
- 观察者异常被吞掉，注释“diff 展示失败不影响已完成的文件编辑”。
- 工具调用折叠标签：`ToolCallRenderer.toolLabel` 中 `case "edit_file" -> "✏️ 编辑 " + count + " 个文件"`，关键参数取 `path`。PlainRenderer、PlanExecuteAgent、SubAgent 里有同样的分支。

### 1.10 审计日志

- `ToolRegistry.AUDIT_TOOLS = Set.of("write_file", "edit_file", "execute_command", "create_project", "revert_turn")`，MCP 工具按 `mcp__` 前缀动态纳入。
- `com.paicli.policy.AuditLog`：JSONL，按天分文件 `audit-YYYY-MM-DD.jsonl`，默认目录 `~/.paicli/audit`，可用 `-Dpaicli.audit.dir` 或 `PAICLI_AUDIT_DIR` 覆盖，单字段截断 1000 字符（`MAX_FIELD_CHARS`）。
- outcome：成功 allow；PolicyException deny（approver=policy）；其他异常 error；HITL 拒绝或跳过由 `HitlToolRegistry` 写 deny（approver=hitl）。

### 1.11 编辑后 LSP 诊断

成功写入后调用 `runPostEditLspHook(path, safe)`，异常被吞掉。README 第 251 行：“`write_file` / `edit_file` 成功后触发 post-edit 诊断，诊断结果不会阻塞工具主流程”。

### 1.12 相关单测

`src/test/java/com/paicli/tool/ToolRegistryTest.java`：

- `editFileReplacesOnlyUniqueTextAndReportsDiff`：唯一替换成功，observer 收到一次 before/after。
- `editFileRejectsMissingOrRepeatedTextWithoutChangingFile`：不存在、多次出现都失败，文件内容不变，多次出现的报错包含“出现多次”。
- `editFileRejectsPathOutsideProject`：`../outside.txt` 被拒，外部文件不变。
- `editFileRejectsOverlappingMatches`：`aaa` 中找 `aa` 视为多处匹配。

`src/test/java/com/paicli/hitl/ApprovalPolicyTest.java`：`requiresApproval("edit_file")` 为 true，等级 `🟡 中危`，`getDangerousTools()` 大小为 5，风险描述非空。

没有覆盖的场景：CRLF、非 UTF-8、`new_text` 为空字符串删除、5MB 上限、HITL 下的 edit_file 拦截。

## 二、当前完整工具清单

ToolRegistry 构造函数第 133–141 行依次调用 9 个注册方法，共注册 17 个内置工具，另有 MCP 工具动态注册。

| 注册方法 | 工具 | 一句话作用 |
|---|---|---|
| registerFileTools | read_file | 读取项目内文件，支持 offset/limit 按行读取，单次最多 2000 行 |
| | write_file | 新建或整文件覆盖，项目内，5MB 上限 |
| | edit_file | 已有文件唯一匹配片段的精确替换 |
| | list_dir | 列出目录，`[D]`/`[F]` 标记 |
| | glob_files | 按 glob 找文件，默认 50 条，上限 200，跳过 .git、target、node_modules 等 |
| | grep_code | 关键字或正则搜索代码，优先 ripgrep，返回行号和 suggested_reads |
| registerShellTools | execute_command | 在项目目录执行短时命令，默认 60 秒超时，CommandGuard 黑名单，可选 Seatbelt / bubblewrap 沙箱 |
| registerCodeTools | create_project | 按 java/python/node 创建项目骨架 |
| registerRagTools | search_code | RAG 语义检索，默认 top_k=5，上限 30，需先 /index |
| registerWebTools | web_search | 联网搜索，provider 可切换 |
| | web_fetch | 抓取可信来源 URL 正文转 Markdown，默认 8000 字符 |
| registerBrowserTools | browser_connect | 需要登录态时连接本机 Chrome，切 shared 模式 |
| | browser_disconnect | 切回 isolated 浏览器模式 |
| | browser_status | 查看浏览器 MCP 模式和连接状态 |
| registerMemoryTools | save_memory | 用户明确要求时写长期记忆，scope 为 project 或 global |
| registerSkillTools | load_skill | 加载 SKILL.md 全文，下一轮以“## 已加载 Skill：<name>”注入，截断 5KB |
| registerSnapshotTools | revert_turn | 恢复到最近第 N 个 pre-turn Side-Git 快照 |
| registerMcpTool / replaceMcpToolOutputsForServer | `mcp__{server}__{tool}` | MCP server 动态提供 |

AGENTS.md 第 107 行把其中 12 个称为“核心内置工具”（不含 3 个 browser_* 工具、save_memory、load_skill）。`getToolDefinitions()` 按工具名排序后发给 LLM。

## 三、read_file / write_file 当前实现要点

两者在 36a2677 前后实现没有变化，36a2677 只改了注释。

### read_file（第 340–356 行 + `readFileForTool` 第 506–536 行）

- 描述：“读取文件内容（仅限项目根目录之内）；可用 offset/limit 按行读取，避免把大文件整段塞进上下文”
- 参数：path（必填）、offset（integer，可选）、limit（integer，可选，最大 2000 行）
- 先过 PathGuard；不是普通文件返回“读取文件失败: 不是普通文件”
- 不带 offset/limit 时返回 `"文件内容:\n" + 全文`
- 带范围时输出 `文件内容: <文件名> (lines a-b of N)`，每行 `%5d | 内容`，未读完追加“...(已截断，可用 offset=… 继续读取)”
- 超大结果另有 ToolResultOffloader 卸载到 `.paicli/tool-outputs/`（提示词 base.md 说明）

### write_file（第 359–400 行）

- 描述：“写入文件内容（仅限项目根目录之内，单文件 5MB 上限）”
- 参数：path、content，都必填
- 先检查 content 的 UTF-8 字节数，超 5MB 抛 PolicyException
- PathGuard 校验后，读取旧内容作为 before（读不出就为 null）
- 自动创建父目录，`Files.writeString` 覆盖写
- 调 writeFileObserver 做 diff、调 LSP post-edit 诊断
- 成功返回“文件已写入: <path>”，IO 失败返回“写入文件失败: …”

## 四、文档对照

### 4.1 build-agent-from-scratch.md「04、工具注册表」

| 文档原句 / 代码 | 源码事实 | 源码位置 |
|---|---|---|
| “我们实现几个最基础的工具”，列 read_file、write_file、list_dir、execute_command、create_project 五个 | 当前 17 个内置工具，缺 edit_file、glob_files、grep_code 等 | ToolRegistry 第 340–896 行 |
| `private final Map<String, Tool> tools = new HashMap<>();` | `new ConcurrentHashMap<>()` | 第 85 行 |
| 构造函数只调 `registerFileTools / registerShellTools / registerCodeTools` | 调 9 个注册方法，且有 `(commandTimeoutSeconds, toolBatchTimeoutSeconds)` 重载 | 第 121–142 行 |
| read_file 描述“读取文件内容，用于查看代码、配置文件等”，只有 path 参数，`Files.readString(Path.of(path))` | 描述已改，新增 offset/limit，先过 PathGuard | 第 340–356、506–536 行 |
| execute_command 描述“执行Shell命令，用于编译、运行、Git操作等”，直接 `ProcessBuilder("bash","-c",command)` 阻塞读输出 | 描述“在当前项目目录中执行短时 Shell 命令（默认 60 秒超时，不允许全盘扫描）”；有 CommandGuard、沙箱、超时强杀、8000 字符输出上限、工作目录固定为项目根 | 第 673–679、1604–1690 行 |
| “每个工具包含三部分：**名字**、**描述**、**参数定义**、**执行逻辑**” | 列了四项却写“三部分”，与上文“四部分”自相矛盾（文档笔误） | 文档第 383 行 |
| write_file 描述“写入文件内容”，实现只有 `Files.writeString(Path.of(path), content)` | 描述“写入文件内容（仅限项目根目录之内，单文件 5MB 上限）”；有大小检查、PathGuard、自动建父目录、diff 观察者、LSP 诊断 | 第 359–400 行 |
| `createParameters` 代码 | 与源码一致 | 第 1221–1237 行 |
| 「工具的动态注册」提出 `ToolProvider` 接口、JsonToolProvider、AnnotationToolProvider | 源码中没有 ToolProvider。真实的动态注册是 MCP：`registerMcpTool`、`registerMcpToolOutput`、`unregisterMcpTool`、`replaceMcpToolOutputsForServer`，工具名为 `mcp__{server}__{tool}` | 第 1256–1306 行 |
| “Claude Code 的 Skills 系统本质上就是动态工具注册的一种实现” | PaiCLI 的 Skill 不注册新工具，而是通过固定的 load_skill 工具把 SKILL.md 正文注入下一轮上下文。这句话对 PaiCLI 不成立，对 Claude Code 的说法建议改写或删去（未核对 Claude Code 官方表述） | 第 826–861 行 |

应补 edit_file 的位置：
1. 开头工具列表加一行“`edit_file`：局部修改已有文件”。
2. 「文件操作工具」小节在 write_file 之后加 edit_file 的注册代码（1.1 节代码）和一句分工说明：新建或整文件重写用 write_file，改几行用 edit_file，模型不必把整个文件重新输出一遍。
3. 可加一段“为什么需要 edit_file”：write_file 改一行也要输出全文，输出 token 多、容易把没改的部分写错；edit_file 只输出要改的片段，唯一匹配规则保证改的是模型以为的那一处。

### 4.2 build-agent-from-scratch.md「07、运行测试 示例 3：读取和修改」

| 文档原句 | 源码事实 | 源码位置 |
|---|---|---|
| 第二步调 `write_file`，content 是整个 Hello.java | 当前提示词要求“修改已有文件的局部内容优先用 `edit_file`”，按现版本模型应调 `edit_file`，参数类似 `{"path":"demo/src/main/java/com/example/Hello.java","old_text":"System.out.println(\"Hello World\");","new_text":"System.out.println(\"Hello PaiCLI\");"}`，结果“文件已编辑: …” | base.md 第 15、73 行；ToolRegistry 第 500 行 |
| “先调 `read_file` 获取内容，再调 `write_file` 写入修改后的内容” | 同上，改为 edit_file；read_file 仍是第一步（提示词要求失败时先重读，但没有强制读前校验） | base.md 第 73 行 |
| 输出格式 `🔧 执行工具: …  参数: …  结果: …` | 当前 inline 渲染器用折叠标签，edit_file 显示为“✏️ 编辑 1 个文件”，写入后另有 diff 块；若开启 HITL，会先弹“🟡 中危”审批框。截图与文字属于早期版本 | ToolCallRenderer 第 99–135 行；Main.java 第 380 行 |

示例 3 是本次最该重写的地方，edit_file 的价值在这里最直观。

### 4.3 paicli-interview-tool-security.md 全文

| 文档位置 | 文档原句 | 源码事实 | 源码位置 |
|---|---|---|---|
| frontmatter description | “精选 12 道工具系统与安全策略面试题，覆盖 Function Calling、HITL 拦截层、路径围栏、命令黑名单和操作审计” | 正文只有 01–09 共 9 道题；路径围栏、命令黑名单、操作审计没有独立题目。描述与正文不符 | 文档本身 |
| 01 | “PaiCLI 的 ToolRegistry 维护了工具名到执行函数的映射表” | 仍成立，但 MCP 工具走 `mcpTools` 另一张表，调用入口为 `Function<String, ToolOutput>` | 第 85–86、1341–1371 行 |
| 02 | “file_path 比 p 好，max_lines 比 n 好” | 泛化建议，不是 PaiCLI 实际参数名（实际为 path、offset、limit、old_text、new_text），可顺势用 edit_file 举例 | 第 343–347、405–409 行 |
| 02 第三条 | “如果某个参数只接受几个特定值，必须用 enum 约束” | PaiCLI 的 `createParameters` 不支持 enum，create_project 的 type 只写在描述里“项目类型 (java/python/node)”。说法作为通用原则成立，但 PaiCLI 自己没这么做 | 第 1221–1237、690 行 |
| 03 | “文件写入和命令执行是不可逆的，写错了文件内容，原来的就覆盖了” | 现在有 Side-Git pre-turn 快照，可用 revert_turn 或 /restore 按轮次恢复，“不可逆”应改为“恢复成本高、粒度是轮次” | SnapshotService 第 29–49 行；ToolRegistry 第 895–910 行 |
| 04 | “先看两个条件——HITL 是不是开着的，当前工具是不是在危险列表里” | 危险判定已含 MCP 前缀；另有浏览器敏感页面逐次审批、按工具或按 MCP server 的“全部放行”短路 | HitlToolRegistry 第 36–54 行 |
| 04 | “用户可以选五种操作：APPROVED…SKIPPED” | 枚举有六种，多了 APPROVED_ALL_BY_SERVER（07 题提到了但 04 题说“五种”） | ApprovalResult.Decision 第 19–26 行 |
| 05 | “背后对接了三个搜索引擎：智谱 Web Search 是默认的，SerpAPI 和 SearXNG 可选的” | 与 SearchProviderFactory 一致（有 GLM_API_KEY 时自动选 zhipu）。但 web_search 工具描述写的是“支持 SerpAPI（默认）和 SearXNG（自托管）两种 provider”，源码内部自相矛盾，文档无需改 | SearchProviderFactory 第 14–20 行；ToolRegistry 第 777–778 行 |
| 05 | web_fetch 五条安全规则（http/https、屏蔽内网与 loopback、30 秒、5MB、每分钟 30 次） | 一致 | NetworkPolicy、WebFetcher 第 33–34 行 |
| 05 | “web_fetch 负责抓取一个已知 URL” | 现在更严格：只允许用户原文给出或本分支 web_search 结果发现的 URL，“不得使用模型猜测的 URL” | 第 786–795 行 |
| 07 | “放行了 write_file 这个工具，不影响其他工具” | 仍成立。补充：放行 write_file 不会放行 edit_file，两者是不同的工具名 | HitlToolRegistry 第 49–52 行 |
| 09 第四条 | “写入类默认走 HITL 审批” | 成立，现在写入类包括 write_file、edit_file、create_project、revert_turn | ApprovalPolicy 第 18–24 行 |
| 09 第六条 | “‘文件不存在: /path/to/file’比‘Error’有用得多” | 可直接用 edit_file 的真实报错举例：“old_text 在文件中出现多次，请提供更长的上下文: <path>”，模型看到就知道要补上下文重试 | 第 485 行 |

应补 edit_file 的位置：
1. 新增一题，例如“Agent 改文件为什么要单独做一个 edit_file”，讲整文件重写的问题、唯一匹配规则、两种报错如何引导模型自我修正、与 write_file 的分工、同为中危并进审计。
2. 02 题 Schema 设计可用 edit_file 的三个参数描述做正面例子（“空字符串表示删除原文片段”这种写法把边界语义写进描述）。
3. 09 题“错误信息要有用”换成 edit_file 真实报错。
4. description 里的“路径围栏、命令黑名单和操作审计”要么补题，要么删掉。路径围栏题可以用 edit_file 的 `../outside.txt` 单测举例。

### 4.4 paicli-hitl.md 涉及风险分级的部分

| 文档位置 | 文档原句 / 代码 | 源码事实 | 源码位置 |
|---|---|---|---|
| 02 代码 | `DANGEROUS_TOOLS = Set.of("write_file","execute_command","create_project")` | 5 个：再加 edit_file、revert_turn | ApprovalPolicy 第 18–24 行 |
| 02 代码 | `requiresApproval` 只查 DANGEROUS_TOOLS | 还要 `|| isMcpTool(toolName)` | 第 32–34 行 |
| 02 代码 | `getDangerLevel` 三个 case | `execute_command`、`revert_turn` 高危；`write_file, edit_file` 中危；`create_project` 中危；MCP 为“🟡 MCP” | 第 40–48 行 |
| 02 代码 | `getRiskDescription` 三个 case | 新增 revert_turn “将按 Side-Git 快照批量恢复工作区文件，可能覆盖当前未保存修改”、edit_file “将替换文件中唯一匹配的原文片段”、MCP 说明 | 第 53–64 行 |
| 02 正文 | “`read_file`、`list_dir`、`search_code` 这三个工具是只读操作” | 只读的还有 glob_files、grep_code（ApprovalPolicy 注释和单测都列了），web_search、web_fetch 等也不在审批名单 | ApprovalPolicy 第 9 行；ApprovalPolicyTest |
| 02 正文 | “`write_file`、`execute_command`、`create_project` 会写磁盘或跑命令，需要人工确认” / “`execute_command` 是高危…`write_file` 和 `create_project` 是中危” | 需补 edit_file（中危）、revert_turn（高危）、MCP 工具 | 同上 |
| 03 代码 | ApprovalRequest 6 个字段，`of` 直接 new | 现有 7 个字段（多 sensitiveNotice），`of` 有三个重载 | ApprovalRequest 第 16–50 行 |
| 03 正文 | “`write_file` 的 content 通常很长，超过 120 字符的部分用 `...` 截断” | 仍成立。edit_file 的 old_text、new_text 同样按 120 字符截断，审批时看不到 diff | 第 128–170 行 |
| 06 代码 | HitlToolRegistry “只覆写了 `executeTool` 一个方法”，调用 `super.executeTool` | 现在覆写 executeTool 和 executeToolOutput，实际调 `super.doExecuteTool`；拒绝和跳过写 audit；增加浏览器敏感页面和 MCP server 放行判断 | HitlToolRegistry 第 30–81 行 |
| 10 单测 | `testRequiresApproval` 只断言 3 个危险工具 | 现有测试同时断言 edit_file，`getDangerousTools()` 大小为 5 | ApprovalPolicyTest 第 12–15、87–95 行 |
| 简历第 1 条 | “将 `write_file`、`execute_command`、`create_project` 标记为需要人工确认的工具” | 应为 5 个内置工具加全部 MCP 工具 | ApprovalPolicy |

paicli-hitl.md 是第 9 期的阶段文章，代码是当时的快照。更新时可以保留当时的教学代码，在 02 节后加一段“后续演进”，列出 edit_file、revert_turn、MCP 的分级，避免整篇改写。

## 五、paicli 仓库内部发现的不一致（顺带记录）

- `docs/phase-17-lsp-diagnostics.md` 第 52 行仍写“也不支持 `edit_file` / `apply_patch` 工具，因为当前 PaiCLI 内置工具里还没有这两个工具”，与 36a2677 之后的事实不符。
- `BenchmarkToolProfile` 的 FILE_ONLY、LOCAL_COMMAND 等工具面没有 edit_file，基准评测里模型只能用 write_file 改文件（`src/main/java/com/paicli/eval/benchmark/BenchmarkToolProfile.java` 第 10–37 行）。是否有意为之，未确认。
- web_search 工具描述写“SerpAPI（默认）”，SearchProviderFactory 实际在有 GLM_API_KEY 时默认选智谱。
- ToolRegistry 第 1311 行注释列危险工具时漏了 revert_turn，AUDIT_TOOLS 里有。
