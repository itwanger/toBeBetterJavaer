> 调研日期：2026-10-23｜仓库：/Users/itwanger/Documents/GitHub/paicli（main）｜commit：8c19e2d
`git -C /Users/itwanger/Documents/GitHub/paicli log --oneline --since=2026-10-23`

# PaiCLI 架构知识库

- 引用路径省略前缀 `src/main/java/com/paicli/`，资源文件省略 `src/main/resources/`，行号以 78786aa 为准
- 本地工作区可能带未提交改动，核对行号用 `git -C <仓库> show 78786aa:<路径>`，不要直接读工作区
- “修 bug 闭环”（定位、编辑、验证、评测）单独写在 `paicli-bugfix-loop.md`，本文不重复
- 仓库自己的事实摘要在 `AGENTS.md`（同一 commit），与本文冲突时以源码为准

---

## 一、整体结构与三条执行路径

- 交互式 CLI 入口 `cli/Main.java:216`。`main` 先分流两个非交互入口：`wechat` 子命令（`:218`）和 `serve --http` 的 Runtime API（`:226`、`:1045-1050`，`runtime/api/RuntimeApiServer.java:37` 暴露 `/v1/threads`）
- 三条执行路径共用同一个 `ToolRegistry`、`MemoryManager`、`SnapshotService`、`ConversationLedger`（`AGENTS.md:49`）
  - ReAct：`agent/Agent.java`，默认路径
  - Plan-and-Execute：`agent/PlanExecuteAgent.java`，`/plan` 或 plan 会话模式
  - Multi-Agent：`agent/AgentOrchestrator.java`，`/team`
- 路径选择 `cli/Main.java:995-1019`：本条输入显式写的 `/plan`、`/team` 优先，其次是上一条留下的一次性标记，最后看 plan 会话模式；每条输入都包在 `snapshotService.runTurn(...)` 里执行（`:1024`）
- 会话模式 `cli/SessionMode.java:14-23`：Shift+Tab 按 auto → plan → ask 循环，`/mode` 等价。模式只是“审批档位 + 是否走 plan”的组合，不单独保存权限状态（`SessionModeController.java:36-40`）。只在 inline 命令行界面生效，Lanterna 全屏界面没接（`AGENTS.md:95`）
- LLM 供应商 8 个：deepseek、glm、hunyuan、step、kimi、freellmapi、xfyun、agnes（`llm/LlmClientFactory.java:62-69`），多 Key 时 DeepSeek 优先（`:80`）

## 二、ReAct 主循环（Agent.java）

`runInternal`（`agent/Agent.java:181`）每轮顺序：

1. 用“用户实际提交的原文”构造本轮 `TurnToolPolicy`（`:183-191`），展开后的 `@path` 和 MCP resource 正文不参与授权
2. 检索相关长期记忆，替换 system prompt（`:201-203`、`:525-530`）
3. `while (true)` 循环（`:218`），每次调模型前：注入待发的 LSP 诊断（`:226`）→ 按需压缩（`:227`）→ 检查预算（`:228-232`）
4. `turnToolPolicy.expose(...)` 过滤本轮可见工具（`:240`），然后 `llmClient.chat(...)`（`:244-248`）
5. 有 tool_calls（`:260`）：记录预算签名（`:263`）→ 执行（`:951` 走 `turnToolPolicy.execute`）→ 成功的 `load_skill` 正文同轮注入（`:278-282`）→ 每条结果用 `ToolResultBoundary.wrap` 包成 `trust="untrusted-data"` 后回灌（`:285`）→ `RunawayGuard` 观察（`:290`）→ `continue`
6. 无 tool_calls：写入最终回答（`:301`），从用户原文自动抽取记忆（`:312`），正文残留未执行的工具调用文本时提示用户（`:323`）

退出条件：模型不再调用工具即结束。安全阀在 `agent/AgentBudget.java`

- Token 预算、硬轮数默认都是 `Integer.MAX_VALUE`，只有 `-Dpaicli.react.token.budget` / `-Dpaicli.react.hard.max.iterations` 显式配置才生效（`:75-84`）
- 停滞检测默认窗口 5（`:45`）：最近 5 轮“工具名 + 原始参数字符串”的整步签名完全相同才判停滞（`:107-121`、`:193-199`）
- 命中后只允许一次不带工具的收尾调用，要求列出已完成、已验证、未完成、下一步，且不得声称全部完成（`:186-191`；调用处 `Agent.java:347-398`，`:365` 传空工具列表）

`agent/RunawayGuard.java` 是提醒层，先于停滞检测触发

- 同一动作（工具名 + 按键排序后的参数，`:157-185`）或同一类错误（按 timeout、rate_limit、network、auth、permission、not_found、invalid_argument、process_exit 正则归类，`:37-45`、`:139-155`）连续 3 步（`:32`）时，注入一条 `[runaway guard]` user 消息（`:116-128`）
- 只提醒不拦截，每个任务最多一次（`:98-102`）；被策略或用户拒绝的结果不计数（`:130-137`）
- 一个键只要在某一步没出现，计数就归零（`:109-114`，只把本步出现的键写进下一轮计数）

SubAgent（`agent/SubAgent.java:294-309`）和 Plan 任务执行器（`agent/PlanExecuteAgent.java:704-730`）复用同一套预算、RunawayGuard、LSP 注入、压缩逻辑，每个任务或 worker 各算各的。

## 三、System Prompt 组装

`prompt/PromptAssembler.java:23-53`，按稳定度从高到低拼接，保住前缀缓存（6b8b9f2）：

1. `base.md`（身份、Language、Tools、Tool Policy、Browser Policy、Memory Policy、Safety Policy；模型不支持工具时剥掉工具段并加 Tool Availability 段，`:27-37`、`:127-140`）
2. `personalities/calm.md`
3. 模式文件，`PromptMode` 六种：AGENT、PLAN、PLANNER、TEAM_PLANNER、TEAM_WORKER、TEAM_REVIEWER（`prompt/PromptMode.java:3-9`）
4. `approvals/<mode>.md`
5. `context/context-management.md`
6. `handoff.md`
7. `## Skills` 索引（只在 `/skill` 启停或重载时变）
8. `## Runtime Context`（日期、时区，按天变，`:67-73`）
9. `## Project Context`：PAI.md 项目记忆 + 相关长期记忆 + MCP resource 索引（随每条输入变，必须放最后，`:43-48`）

补充事实

- 审批文件取值 `auto` / `never` / 其余一律 `suggest`（`:55-65`），而 `PromptContext.Builder.approvalMode` 在主代码里没有调用方，实际始终加载 `approvals/suggest.md`
- 组装结果必须含 `## Language` 段，否则抛异常（`:152-156`）
- 工具定义按名字排序后发送（`tool/ToolRegistry.java:1338-1343`），工具列表顺序稳定
- `base.md:9-29` 列 17 项工具说明（3 个 browser 工具合成一项，另含 `mcp__{server}__{tool}` 一项）

## 四、工具注册与参数 Schema

### 注册表

- `tool/ToolRegistry.java:87-88` 两张 `ConcurrentHashMap`：全部工具 `tools`、MCP 工具 `mcpTools`；构造函数按类注册内置工具（`:130-146`）
- 内置工具 18 个（`tools.put` 位于 `:333`、`:352`、`:395`、`:410`、`:434`、`:445`、`:667`、`:679`、`:728`、`:769`、`:780`、`:793`、`:801`、`:809`、`:820`、`:831`、`:955`、`:988`）：
  - 文件与代码：`read_file`、`write_file`、`edit_file`、`list_dir`、`glob_files`、`grep_code`、`search_code`
  - 执行：`execute_command`、`create_project`
  - 联网：`web_search`、`web_fetch`、`browser_connect`、`browser_disconnect`、`browser_status`
  - Skill：`load_skill`、`save_skill_reference`
  - 记忆与快照：`save_memory`、`revert_turn`
- MCP 工具运行时注册，名字 `mcp__{server}__{tool}`（`mcp/protocol/McpToolDescriptor.java:23-25`）；server 支持 resources 时额外注册 `list_resources`、`read_resource` 两个虚拟工具（`mcp/McpServerManager.java:584-589`，`mcp/resources/McpResourceTool.java:14-15`）
- `create_project.type` 与 `save_memory.scope` 用 `Param.oneOf` 生成 enum（`ToolRegistry.java:684`、`:961-962`、`:1965-1972`）

### 内置工具 Schema 与参数校验（e074207）

- 内置 Schema 由 `createParameters` 生成，只有 `type`、`description`、`enum`、`required`（`ToolRegistry.java:1313-1333`）
- 执行前统一走 `ToolArgumentValidator`（networknt json-schema-validator，`ToolRegistry.java:1437-1444`）
  - 先确认是合法 JSON 对象，非法 JSON 单独报错并回显前 200 字符（`tool/ToolArgumentValidator.java:73-93`）
  - `typeLoose` 开启，`"top_k": "5"` 照样算整数（`:44-48`）
  - 内置工具把顶层单值参数的 type 放宽成 string/number/boolean，只拦缺参数、传对象或数组、不在 enum 里（`:165-176`），原因是评测复算依赖 read_file 原有的字符串解析语义（`:33-35`）
  - 值为 null 的顶层参数校验时当作没传（`:114-133`）
  - 引用外部 `$ref` 或 Schema 加载失败时跳过校验并记日志（`:145-160`）
  - 错误按字段列出，最多 5 条（`:43`、`:102-111`、`:193-217`）
  - 校验通过后，内置工具拿到的仍是 `asText()` 后的字符串 Map（`ToolRegistry.java:1478-1480`）
- HITL 在弹确认框、调审查模型之前先校验一次，参数不合法的调用直接走执行路径拿错误，不打扰用户（`hitl/HitlToolRegistry.java:56-59`，`ToolRegistry.java:1512-1519`）

### MCP Schema 清洗与校验（966deed）

- `McpToolDescriptor` 同时保存两份 Schema：`inputSchema` 是清洗后给模型看的，`validationSchema` 是 server 原始的（`McpToolDescriptor.java:5-16`，`mcp/McpClient.java:84-93`）
- 执行前按原始 Schema 严格校验（`ToolRegistry.java:1521-1524`）
- `mcp/protocol/McpSchemaSanitizer.java`：删 `$schema`/`$id`/`$ref`（`:54-56`），描述超 1000 字符截断（`:17`、`:167-172`），缺 `type` 补 object、缺 `properties` 补空对象（`:39-44`）
- anyOf / oneOf 收起规则（`:86-128`）：先去掉 `type: null` 选项；只剩一个选项就合并进来（`Optional[X]` 最常见）；全是只带 type/title/description 的简单选项就写成 type 数组；其余复杂情况不写 type，只在 description 里列出各选项；节点已声明 type 时不覆盖

### 结果分类与兜底

- `doExecuteTool`（`ToolRegistry.java:1423-1507`）：用户取消、未知工具、参数校验失败、策略拒绝（`🛡️ 策略拒绝:`）、普通异常（`工具执行失败:`）都转成 `ToolOutput.failure` 文本回给模型，不抛出循环
- 旧式字符串结果按前缀判失败，前缀表见 `looksLikeFailureText`（`:1540-1561`）
- 审计：`write_file`、`edit_file`、`execute_command`、`create_project`、`revert_turn`、`save_skill_reference` 和全部 `mcp__*`（`:85-86`、`:1749-1751`）；写 `~/.paicli/audit/audit-YYYY-MM-DD.jsonl`（`policy/AuditLog.java:23-24`），条目类型有 allow、allowByMention、allowByAutoClassifier、denyByAutoClassifier、denyByHitl、denyByPolicy、error（`:156-190`）

## 五、工具执行：并行、串行与本轮策略

- 三条路径都经 `TurnToolPolicy.execute` → `ToolRegistry.executeTools`（`tool/TurnToolPolicy.java:301-351`）
- `executeTools`（`ToolRegistry.java:1603-1631`）
  - 单个调用或批次里有浏览器工具：整批串行（`:1612-1615`）
  - 只有 `PARALLEL_SAFE_TOOLS`（`read_file`、`list_dir`、`glob_files`、`grep_code`、`search_code`、`web_search`、`web_fetch`、`load_skill`，`:1635-1637`）可以并行
  - 混合批次：连续的只读调用组成一段并行，遇到有副作用的调用先等前面那段结束再单独执行，保持模型给出的先后语义（`:1619-1630`）
  - 并行段线程池 `min(调用数, 4)`，`invokeAll` 整段超时 90 秒，超时的标 `timedOut`，结果按原顺序返回（`:1666-1720`）；串行路径没有批次超时
- `TurnToolPolicy`（`tool/TurnToolPolicy.java:25-33`）是每个顶层 turn 的确定性工具边界，只依据用户实际提交的文本构造
  - `expose` 只做减法（`:243-276`）：用户明确不要联网时隐藏外部工具；没有可信 URL 时隐藏 `web_fetch`；浏览器工具按意图和已建立的页面上下文显隐
  - `authorize`（`:369-441`）：`web_fetch`、浏览器导航、`curl`/`wget` 等联网命令的 URL 必须来自用户原文或本分支 `web_search` 的结构化结果 `discoveredUrls`；工具未向本轮开放时拒绝
  - 会话读过网页、浏览器、MCP 或 curl 内容后，`save_memory` 需要用户本轮原文明确要求“记住”（`:431-440`、`:446-463`）
  - 被拒绝的调用生成合成失败结果，与放行的结果按原顺序合并（`:318-350`）
- 大结果卸载：`TurnToolPolicy` 先观察原始结果，再调 `registry.offloadForContext` 换成上下文视图（`:343-346`，`ToolRegistry.java:1728-1739`）。`tool/ToolResultOffloader.java` 默认开启（`:181-188`），超过 32000 字符（`:33`）写入 `.paicli/tool-outputs/<session>/NNN-<tool>.txt` 并自动生成 `.gitignore`（`:116-129`），上下文只留路径、`read_file` 读回建议、开头 2000 字符和结尾 800 字符预览（`:37-38`、`:131-146`）；带 offset/limit 的 `read_file` 和读卸载目录的 `read_file` 不再卸载（`:104-114`）
- `tool/ToolResultBoundary.java:23-44`：结果包成 `<tool_result tool="..." trust="untrusted-data">`，内容里伪造的开闭标签转义成 `&lt;`

## 六、审批（HITL）与安全策略

检查顺序（`AGENTS.md:94`）：TurnToolPolicy → HitlToolRegistry → ToolRegistry 参数校验 → PathGuard / CommandGuard。策略拒绝的操作用户也批不了。

### 审批名单（hitl/ApprovalPolicy.java）

- `DANGEROUS_TOOLS` 6 个：`write_file`、`edit_file`、`execute_command`、`create_project`、`revert_turn`、`save_skill_reference`（`:19-26`），加全部 `mcp__*`（`:48-50`）
- `HIGH_RISK_TOOLS`：`execute_command`、`revert_turn`（`:29-32`）；未开完整 HITL 时默认仍确认这两个和全部 MCP 工具（`:41-43`）
- 危险等级：execute_command、revert_turn 高危，write_file、edit_file、create_project、save_skill_reference 中危（`:55-64`）

### 两档确认（hitl/HitlToolRegistry.java:51-75）

- ask 模式（`/hitl on`）：`DANGEROUS_TOOLS` 和 MCP 全部弹确认
- auto 模式（`/hitl default`，启动默认，`cli/Main.java:246-248`）：读写文件直接执行；Chrome 的新建页面、导航、列出/选择标签页、等待、页面快照和截图（不带输出文件路径）直接执行，写 `auto-browser` 审计记录，仍检查本轮网址来源和共享标签页归属（8c19e2d）；`execute_command` 交给 `LlmApprovalClassifier` 审查（`HitlToolRegistry.java:82-121`，`AUTO_REVIEWED_TOOLS` 只有它，`:124`）
  - 放行：写一条 auto-classifier 审计后执行，PathGuard、CommandGuard 照常生效（`:93-100`）
  - 不放行、审查失败、其余 MCP 工具、`revert_turn`、敏感页面改写：以 `[AUTO] 自动审查未放行：...` 失败结果交回模型，不弹框（`:103-120`）
  - 同一轮连续被拦 3 次（`AUTO_ESCALATE_AFTER`，`:28`）才转人工确认；放行一次或新一轮输入清零（`:40-43`，`Main.java:992-993`）
- 交互式 CLI 没有“全部放行”档，`/hitl off` 已删除（`CliCommandParser.java:138-156` 只认 on/default；`HitlHandler.java:62-84`）
- 终端确认选项：`y/Enter` 批准、`a` 本会话同工具全部放行（MCP 可选按 server 放行）、`n` 拒绝、`s` 跳过、`m` 修改参数（`hitl/TerminalHitlHandler.java:20`、`:114`、`:134-196`）；拒绝和跳过返回 `[HITL] 操作已被拒绝/跳过`（`HitlToolRegistry.java:140-153`）

### 审查模型（hitl/LlmApprovalClassifier.java）

- 输入只有用户本轮原话（截断 2000 字符）、工具名、参数，不含任何工具结果（`:28`、`:137-143`）
- 系统提示词列五条 allow 条件（只读或项目内易撤销改动、不删数据不改 git 历史不推送、不联网不安装、不碰密钥、不写项目外），拿不准判 ask（`:43-57`）
- fail-closed：20 秒超时（`:41`）、异常、非约定 JSON、参数超 32000 字符（`:39`、`:94-97`）一律 ask；只认 `{"decision":"allow"}`（`:145-168`）
- 只缓存“放行”结论，换了用户请求就清缓存（`:78-85`、`:109-111`）
- 审查用当前会话供应商，可用 `PAICLI_AUTO_CLASSIFIER_MODEL` 换模型，按“供应商/模型”缓存客户端（`cli/Main.java:1946-1964`）

### 路径、命令、沙箱

- `policy/PathGuard.java`：路径规范化后，向上找最近存在的祖先做 `toRealPath`，防软链逃逸；不在项目根内抛 `PolicyException`（`:20`、`:53-89`）
- `policy/CommandGuard.java:19-41` 9 条正则黑名单（sudo、`rm -rf` 全盘或用户目录、mkfs、dd 写裸设备、fork bomb、`curl|sh`、`find /`、`chmod -R 777 /`、shutdown 类），不做 shell 解析；文件头注释说明它只辅助 HITL（`:6-16`）
- 命令沙箱 `tool/CommandSandboxMode.java`：`PAICLI_COMMAND_SANDBOX=off|auto|required`，默认 off（`:9-17`、`:36-45`）；macOS 用 Seatbelt、Linux 用 bubblewrap，只有工作区可写，HOME/TMPDIR 重定向到工作区私有目录，无网络，启用前跑探针、失败即不可用（`tool/CommandSandbox.java:16-28`）；required 模式下沙箱不可用时拒绝执行（`ToolRegistry.java:1782-1788`）
- `execute_command` 只在沙箱启用或评测入口 `setSanitizeCommandEnvironment(true)` 时删掉 `*_API_KEY`、`*_SECRET`、`*_PASSWORD` 等敏感环境变量（`ToolRegistry.java:1809-1811`、`:1903-1919`；评测调用见 `eval/benchmark/BenchmarkWorkerMain.java:112`）
- 微信通道没有确认界面，默认拒绝：只读工具允许，`execute_command`、`mcp__*` 需白名单，`revert_turn` 一律拒绝（`AGENTS.md:105`）

## 七、上下文与记忆

### 短期上下文

- 短期上下文就是各 Agent 实际发给模型的 `conversationHistory`，没有第二份副本（`AGENTS.md:76`）；c086e4d 删掉了旧的 `ContextCompressor`、`ConversationMemory`
- `history/ConversationLedger.java`：只追加的 JSONL 原始记录，写在 `~/.paicli/history/raw/<session>.jsonl`（`:5-16`、`:91`、`:107`），`/resume` 靠它还原 ReAct 对话；任何直接改动 `conversationHistory` 的操作之后要写 `view_checkpoint`（`AGENTS.md:77`，调用见 `Agent.java:472-487`、`:561-563`）
- 新一轮开始前删掉历史消息里的图片载荷（`Agent.java:576-593`）

### 项目记忆 PAI.md

- `prompt/ProjectMemoryLoader.java:66-76` 按顺序加载：`~/.paicli/PAI.md` → `PAI.md` → `.paicli/PAI.md` → `PAI.local.md` → `.paicli/PAI.local.md`，全部拼接（不是覆盖）
- 支持 `@相对路径` 导入，深度上限 3，防环、防越界（`:22`、`:78-113`）；总量 24000 字符，超出截断（`:21`、`:128-132`）

### 长期记忆

- 存储 `long_term_memory.json`，目录可用 `paicli.memory.dir` / `PAICLI_MEMORY_DIR` 覆盖（`memory/LongTermMemory.java:31-33`）；作用域 project / global，project 条目只在同一项目可见（`:272-287`）
- 多进程安全：所有修改走 `withStorageLock`（加锁 → 重读 → 修改 → 写回，`:68`、`:93`、`:145`、`:159`、`:229`；354b62b 加进程内锁、`.lock` 文件锁、临时文件原子替换）
- 检索：jieba 分词 + 关键词打分，不是向量检索（`memory/MemoryRetriever.java:65-74`，`memory/MemoryQueryTokenizer.java:3-4`）；注入上限 `window/200`，夹在 500 到 5000 token（`context/ContextProfile.java:74-76`）；超过 30 天未核实的条目标“可能已过时”（`MemoryRetriever.java:22-25`、`:103-108`）
- 冲突检测：数字或版本号不同，或字符二元组 Dice 相似度 ≥ 0.8 时不写入，由用户选 replace 或 keep_both（`memory/MemoryConflictDetector.java:15`、`:44`、`:54-55`；`save_memory` 参数见 `ToolRegistry.java:955-985`）
- 自动抽取（ea8e05a）：默认开启（`memory/AutoFactExtractor.java:148-159`），只从用户本轮原文逐字摘取，最多 3 条，排除凭证、手机号等敏感词和“现在、这次、临时”等临时表达（`:26-46`）；读过外部内容后暂停（`AGENTS.md:81`）

## 八、上下文压缩（三档）

协调器 `memory/AutoCompactionManager.java:12-19`、`:64-80`，每次调模型前执行，代价从小到大：

1. 卸载：单个工具结果超 32000 字符写文件（见第五节）
2. 清理旧工具结果（9fd726b）：`memory/ToolResultClearer.java`
   - 触发线 `min(100k, 摘要阈值 × 0.6)`，且始终低于摘要阈值（`:40-45`、`:67-74`）
   - 保留最近 3 条工具结果（`:41`），短于 400 字符的跳过（`:47`、`:115-120`）
   - 只替换 `role=tool` 消息正文为 `[已清理的旧工具结果]` 占位，`tool_call_id` 保留，tool_call 与 tool_result 仍一一配对（`:24-26`、`:92-113`）
3. 摘要（有损）
   - 会话记忆摘要是实验功能，默认关，`PAICLI_SESSION_MEMORY_COMPACTION_ENABLED` 打开（`AutoCompactionManager.java:21-22`、`:132-140`）；它在 60% 阈值时异步维护增量摘要（`memory/SessionMemoryCompactor.java:19-32`）
   - 默认走完整摘要 `memory/ConversationHistoryCompactor.java`（36a2677 重写）：保留最近 3 个用户轮（`:36`），切分点必须落在 user 消息边界（`:139-147`）；旧消息按 60000 字符分块，每块摘要不超过 8000 字符再逐级合并（`:37-38`、`:190-225`）；摘要必须按顺序含“当前目标与成功条件 / 用户要求与已确认决定 / 已完成工作及证据 / 未解决问题与下一步”四个标题，缺了先修复一次，再缺就放弃压缩（`:40-54`、`:227-248`）；压缩后 token 没减少也放弃（`:172-176`）
   - Skill 注入消息和 `[runaway guard]` 提醒不算用户轮、不交给摘要；落在摘要范围里的 Skill 正文直接删掉，摘要末尾列出名字提示重新 `load_skill`（`:150-152`、`:321-331`、`:333-352`；c08159f）
   - 手动 `/compact` 只保留最近 1 轮，始终走完整摘要（`:129-131`，`AutoCompactionManager.java:93-100`）

摘要阈值公式 `context/ContextProfile.java:83-89`：`window - min(20k, max(1k, window/4)) - min(13k, max(1k, window/8))`。200k 窗口约 167k 触发，1M 窗口约 967k 触发。

## 九、MCP

- 配置合并 `~/.paicli/mcp.json` 与项目 `.paicli/mcp.json`，检测到 `STEP_API_KEY` 时自动加 `step_search`（`AGENTS.md:63`）
- 启动：专属线程池 `min(n, 8)` 并行启动（`mcp/McpServerManager.java:126-138`），CLI 最多等 8 秒（`cli/Main.java:2853-2866`），initialize 超时 60 秒（`mcp/McpClient.java:27`），普通请求 60 秒（`mcp/jsonrpc/JsonRpcClient.java:22`）
- 项目级信任（36fd176）：项目配置里的 server（含覆盖用户级的同名 server）要 `/mcp trust <name>` 后才启动；确认绑定 command/args/env/url/headers 的 SHA-256 指纹，改了要重新确认，记录在 `~/.paicli/mcp-trust.json`（`mcp/config/McpTrustStore.java:14`、`:31-59`；未信任时不展开 `${VAR}`、不起进程，`McpServerManager.java:553-558`）
- 子进程环境白名单（36fd176）：`mcp/transport/McpChildEnvironment.java:16-31` 只带 PATH、HOME、代理、证书、Windows 必需变量和 `LC_*`，再叠加配置里显式写的 env；`StdioTransport.java:62-66` 先 `clear()` 再放入
- stdout 逐行容错：非 JSON 行记进 stderr 环形缓冲（200 行）后跳过，读线程不退出（`mcp/transport/StdioTransport.java:28`、`:226-261`）
- server 主动请求：先看有没有 `method`，有就按请求处理，`ping` 回空结果，其他方法回 `-32601`（`JsonRpcClient.java:23`、`:132-141`、`:184`）
- 崩溃与卡死（d5b625e）
  - 进程退出触发 `onUnexpectedClose`，移除工具、结束进程树后按 1s、2s、4s 退避自动重启，连续 3 次失败停止并提示 `/mcp restart`（`McpServerManager.java:47`、`:576`、`:657-705`）；稳定运行 60 秒以上再崩溃，计数从头算（`:49`、`:666`）
  - 每 30 秒 ping 本地 stdio server，有请求在处理时跳过，连续 2 次不回判定卡死（`:50-51`、`:706-726`）；HTTP 类型 server 不 ping、不自动重连
  - 关闭：先记下整棵进程树，关 stdin 等 1 秒，再从叶子进程开始 SIGTERM，2 秒后强杀（`StdioTransport.java:162-206`）；PID 连同启动时间和命令记在 `~/.paicli/mcp-pids.json`，下次启动核对后清理遗留进程（`mcp/transport/McpPidFile.java:25`、`:44`、`:78`、`:114-130`；`McpServerManager.java:118`、`:763-768`）
  - 后台提示攒在 `drainNotices()`，下一个输入框前打印（`AGENTS.md:64`）
- `tools/list_changed` 交给单线程 `NotificationRouter`，避免在读线程里同步重拉造成死锁（`mcp/notifications/NotificationRouter.java:17-26`、`McpServerManager.java:607-610`）
- auto 模式不自动执行 MCP 工具（见第六节）

## 十、Skill

- 三级来源，同名后加载覆盖先加载：jar 内置（解压到 `~/.paicli/skills-cache`）→ 用户级 `~/.paicli/skills/` → 项目级 `.paicli/skills/`（`skill/SkillRegistry.java:22-24`、`:52-54`、`:146`；`cli/Main.java:325-327`）。内置 Skill 有 `web-access`、`better-harness`（`src/main/resources/skills/`）
- 索引：system prompt 里放 name + description，最多 20 个、4KB，单条描述 500 码点（`skill/SkillIndexFormatter.java:18-20`）
- 正文：`load_skill(name)` 成功后，同一轮里紧跟工具结果追加一条 user 消息，首行带 `[PAICLI_SKILL_INJECTION]`（`tool/LoadedSkillMessages.java:18-29`、`:60-99`；`memory/InternalUserMessages.java:18-22`；cc864aa）。正文不放进工具结果，因为工具结果统一按不可信数据包裹
- 去重与预算：正文还在历史里时重复加载不再注入；单个正文截断到 5KB，会话内所有正文合计 16KB（`PAICLI_SKILL_BODY_BUDGET`），超了拒绝加载并提示 `/compact` 或 `/clear`（`LoadedSkillMessages.java:33-36`、`:75-88`、`:102-131`）；去重和预算都从历史推导，不持有共享状态（`:26-29`）
- 附属文件：`load_skill(name, file)` 读 Skill 目录内文件，路径围栏只放行该 Skill 目录；`references/` 合并用户级补充目录，补充文件 64KB 上限（`ToolRegistry.java:902-940`；`skill/SkillReferences.java:28-31`）
- 写回：`save_skill_reference` 只能写 `~/.paicli/skills/<name>/references/**.md`，单次 8000 字符，默认追加（`ToolRegistry.java:831-858`，`SkillReferences.java:29`）
- 项目级信任（aa82052）：项目级 Skill 要 `/skill trust` 才可信，信任绑定正文 SHA-256，正文改了要重新信任（`SkillRegistry.java:103-125`）；未信任时正文只作为不可信工具结果返回，并提示不要按它执行（`ToolRegistry.java:885-890`）
- 触发金标集只有文档 `docs/skill-trigger-golden-set.md`（20 条），真实评测需授权后执行（e37b4ae 提交说明）

## 十一、代码索引与检索（RAG）

- 切块 `rag/CodeChunker.java`：Java 按类/方法切，其余或解析失败按 2000 字符分段（`:22-23`、`:53-70`）
- 关系 `rag/CodeAnalyzer.java`：imports、extends、implements、contains、calls；calls 只记方法名，不做符号解析（`:25`、`:55-98`）
- JavaParser 按线程 `ThreadLocal` 持有，语言级别 Java 17（`rag/JavaSourceParser.java:16-17`）
- 增量索引（6f0eb28）：`rag/CodeIndex.java:70-79`
  - 按文件内容 SHA-256 + Embedding 模型判断，二者都没变就跳过（`:183-187`）；指纹存 `indexed_files` 表（`rag/VectorStore.java:122`）
  - 删除或超过 1MB 的文件清出索引（`:36`、`:320`）
  - 默认 4 线程并行解析，`PAICLI_INDEX_THREADS` 可调（`:34`、`:269-277`）
  - Embedding 跨文件攒批，默认 32 条一批（`EMBEDDING_BATCH_SIZE`），Ollama 走 `/api/embed`，老版本 404 后回退逐条（`rag/EmbeddingClient.java:29`、`:37`、`:49`、`:125`、`:205`）
  - 一批文件一个事务，Embedding 失败保留旧索引下次重试
  - 提交说明实测 pmhub 1892 个文件：全量 218.9 秒 → 128.7 秒，无改动重跑 0.8 秒；更多数据见 paicli `docs/interview-upgrade-plan.md` 的“实测记录”
- 检索：`search_code` 走 `CodeRetriever.hybridSearch`（`ToolRegistry.java:728-767`，默认 top_k 5，上限 30）；语义部分在 Java 里对当前项目全部 chunk 逐条反序列化 JSON 向量算余弦（`VectorStore.java:268-295`），关键词部分是 SQLite `LIKE`（`:301-315`），合并时关键词命中加 0.1 到 0.5 分、method/class 类型加分（`rag/CodeRetriever.java:50-115`）
- 提示词定位：精确符号优先 `grep_code`/`glob_files`，`search_code` 只做语义辅助（`base.md:35-38`）

## 十二、Plan-and-Execute

- 规划：所有 `/plan` 目标都交给模型规划，不做关键词“简单任务”短路（`AGENTS.md:119`）；`plan/Planner.java:71-110` 生成 JSON 计划，任务类型 FILE_READ、FILE_WRITE、COMMAND、ANALYSIS、VERIFICATION（`plan/Task.java:18-24`；未知类型按 ANALYSIS，`Planner.java:238-246`）
- 校验：tasks 非空、id 唯一非空字符串、依赖只引用已声明 id、无环，不合格直接失败（`AGENTS.md:120`；DFS 拓扑排序与环检测 `plan/ExecutionPlan.java:87-111`）
- 审阅：`Enter` 执行、`Ctrl+O` 展开、`ESC` 取消、`I` 补充要求后在原计划上修改（`AGENTS.md:118`；`Planner.revisePlan` `:80`）
- 执行：无依赖任务并行，线程池 `min(任务数, 4)`（`agent/PlanExecuteAgent.java:563`）；每个任务有自己的消息列表和 `TurnToolPolicy` 副本，只有声明了依赖才能用上游 `web_search` 找到的 URL（`:645-656`）；依赖任务结果完整拼进下游输入，不截断（`:1201-1225`）
- 失败处理（354b62b）：完成度低于 50% 时重新规划，最多 `PAICLI_PLAN_MAX_REPLANS` 次（默认 2，`:51-53`、`:481-494`）；到上限后不再启动新任务；完成度不低于 50% 时把失败任务的下游全部标 SKIPPED（`:497-499`）；用户取消不算失败

## 十三、Multi-Agent（Team）与 Sub-agent

- 角色三种：PLANNER、WORKER、REVIEWER（`agent/AgentRole.java:6-10`）；实例固定 4 个：planner、worker-1、worker-2、reviewer（`agent/AgentOrchestrator.java:121-126`），并行批次里每步另建一个独立 reviewer（`:425-426`）
- 只有 WORKER 拿工具，planner 和 reviewer 的请求不带工具（`agent/SubAgent.java:532-537`、`:312`）；这是评测审计的约定（`AGENTS.md:123`）
- 流程 `AgentOrchestrator.java:207-344`：planner 出计划 → `TeamPlanParser` 严格校验（a0fd238，非空 steps、id 唯一、依赖必须已声明、无环，`agent/TeamPlanParser.java:5-12`、`:38-131`）→ 按依赖分批，单步批次串行流式输出，多步批次 `min(批大小, 2)` 并行，每步输出写独立缓冲、完成后按顺序刷出（`:283-327`、`:397-485`）→ 每步 reviewer 审查，不通过带反馈重试，最多 2 次（`:51`、`:570-617`）
- Reviewer 结论 fail-closed（42bf855）：只认 JSON 布尔 `approved: true`，字符串 `"true"`、缺字段、非 JSON 都算不通过，没有关键词兜底（`agent/TeamReviewVerdict.java:7-30`）
- 上下文隔离：每个 SubAgent 有自己的 `conversationHistory`，步骤结束 `clearHistory()`（`AgentOrchestrator.java:309`、`:444`）；共享 `ToolRegistry`（含同一个 HITL 审批器）、`LlmClient`、`MemoryManager`
- 下游步骤上下文只放依赖步骤结果的前 500 字符（`:626-641`）
- ReAct 主 Agent 没有派生 Sub-agent 的工具（`ToolRegistry` 18 个内置工具里没有），Sub-agent 只存在于 `/team` 的固定角色中

## 十四、Side-Git 快照

- 每个顶层 turn 前同步打 PRE_TURN 快照，结束后单线程异步打 POST_TURN 快照（`snapshot/SnapshotService.java:29-62`）
- gitDir 在 `~/.paicli/snapshots/<父目录哈希>/<项目路径哈希>/.git`，JGit 把项目设为 work tree，不碰项目自己的 `.git`（`snapshot/SideGitManager.java:40-47`、`:181-189`）
- 快照 = `git add .` + `git add -u` + `commit --allow-empty`（`:62-79`）；默认排除 `.git`、`.paicli/snapshots`、`target`、`node_modules`、`dist`、`.idea`、`*.class`、`*.jar`（`snapshot/SnapshotConfig.java:16-25`）；`PAICLI_SNAPSHOT_ENABLED=false` 关闭（`:28`）
- `PAICLI_SNAPSHOT_MAX`（默认 50，`:31`）只是列表和查找窗口，代码里没有删除旧快照的逻辑（`SideGitManager.java:86`、`:97-99`、`:132`），清理靠 `/snapshot clean`
- 恢复 `restorePreTurn(offset)`（`:103-124`）：取第 offset 个 PRE_TURN，先打 PRE_RESTORE 快照，再逐文件把目标树写回工作区、删掉目标树里没有的已跟踪文件，不用 checkout
- 入口：`revert_turn` 工具（`ToolRegistry.java:988-1002`）和 `/snapshot`、`/restore <N>` 命令

## 十五、LLM 客户端

- OkHttp 超时：connect 60s、read 300s（SSE 两次读之间的间隔）、write 60s、call 600s，都可用系统属性改（`llm/AbstractOpenAiCompatibleClient.java:24-32`）
- 重试 `llm/LlmRetryPolicy.java:33-40`：最多 3 次，500ms 起指数退避，±20% 抖动，最长 30 秒；流式响应已经向用户交付内容后不重试（`:5-9`）
- 代码里没有跨供应商故障切换和熔断
- 请求体直接写出（6f0eb28）：`llm/JsonRequestBody.java:15-23` 用 Jackson 把 JSON 树直接写进 OkHttp 输出流，先写一遍计数流拿 Content-Length；提交说明实测约 1M token 对话加 3 张截图，每次请求分配从 90.5MB 降到 4.7MB
- 思考模型的 `reasoning_content` 需要在下一轮请求里带回（`AGENTS.md:65`）

## 十六、其他模块

- LSP：写文件后 JavaParser 语法诊断，下一轮以 user 消息注入，细节见 `paicli-bugfix-loop.md`
- 评测：`eval/LlmJudge`、`eval/PositionBalancedPairwiseJudge`、`eval/benchmark/`，细节见 `paicli-bugfix-loop.md`
- Better Harness：`/better-harness` 命令，三个只读证据专家并行收集，lead 模型汇总，Java 代码渲染报告，方法改编自 QoderAI/better-harness（`harness/BetterHarnessRunner.java:32-45`；内置 Skill `skills/better-harness/SKILL.md`）
- 联网：搜索服务按 `SEARCH_PROVIDER` 或 Key 自动选择（智谱、SerpAPI、SearXNG、DeepSeek，`AGENTS.md:109`）；`web_fetch` 默认 8000 字符（`ToolRegistry.java:91`、`:780-790`）
- 图片输入、TUI（Lanterna）、微信 iLink 文本通道、Runtime API 分别在 `image/`、`tui/`、`wechat/`、`runtime/`

---

## 演进记录（面试素材）

| commit | 日期 | 之前 | 之后 |
|---|---|---|---|
| c086e4d | 08-31 | 短期记忆 `ConversationMemory` + `ContextCompressor` 单独压缩，和发给模型的消息是两份 | 删掉这两个类，只压缩实际发送的 `conversationHistory`，新增实验性会话记忆摘要 |
| 98e96d5 | 09-23 | `execute_command` 超 8000 字符直接截断，工具结果原样回灌 | 超大结果卸载到 `.paicli/tool-outputs/`，上下文留首尾预览；结果包 `trust="untrusted-data"`；记忆加过时标记和冲突检测 |
| 36a2677 | 09-23 | 摘要只要求“关键诉求、已完成操作、共识、待办” | 四栏目结构化摘要，分块摘要再合并，栏目缺失先修复再放弃 |
| 9fd726b | 09-24 | 压缩只有“摘要”一档 | 摘要前加“清理旧工具结果”一档，保留最近 3 条 |
| 354b62b | 09-24 | 同一批非浏览器工具调用全部并行（最多 4 个），并发 `edit_file` 会丢更新 | 只有只读白名单并行，有副作用的按模型给出的顺序串行；长期记忆加文件锁；Plan 重规划封顶 2 次 |
| a0fd238 / 42bf855 | 09-24 | Team 计划里的未知依赖会让步骤永久阻塞；Reviewer 结论可被关键词放行 | 严格计划校验；Reviewer 只认 JSON 布尔 `approved: true` |
| 36f106f | 09-25 | 停滞窗口 3 | 新增 RunawayGuard 提醒层（3 步），停滞窗口改为 5，保证“先提醒、后停止” |
| 72a60c2 | 09-25 | 用“动作词表”决定给不给工具，漏判时正常任务悄悄失败；有 `/hitl off` | 自然语言判断只做减法；Shift+Tab 三种会话模式；auto 模式用分类器审查 Shell 命令；删 `/hitl off` |
| cc864aa | 09-25 | `load_skill` 正文进 `SkillContextBuffer`（LRU 3 个），下一条用户消息前才拼进去 | 同一轮紧跟工具结果注入，删掉 `SkillContextBuffer` |
| 6b8b9f2 | 10-07 | 运行时日期、记忆等动态段夹在中间 | system prompt 按稳定度排序，随输入变化的 Project Context 放最后 |
| aa82052 / fde0a6f / d9f3789 / c08159f | 10-07 至 10-08 | 项目级 Skill 直接可信；正文无预算；压缩会丢正文或原样保留 | 项目级 Skill 要 `/skill trust`；会话 16KB 正文预算；去重从历史推导；压缩时移出正文并提示重新加载 |
| 36fd176 | 10-09 | 项目 `.paicli/mcp.json` 启动即执行；子进程继承父进程全部环境变量；stdout 一行坏 JSON 读线程退出；server 请求被当成响应、id 可能撞号 | `/mcp trust` 指纹确认；环境变量白名单；逐行容错；正确回复 server 请求 |
| d5b625e | 10-10 | 没有退出检测和自动重启，只能 `/mcp restart`；关闭只杀直接子进程 | 1s/2s/4s 退避重启、30 秒 ping 卡死检测、整棵进程树清理、PID 文件清孤儿 |
| e074207 | 10-10 | `readTree` 后全部 `asText()`，没有通用 Schema 校验，MCP 参数原样发给 server | `ToolArgumentValidator` 执行前校验，字段级错误回给模型；HITL 前置校验 |
| 966deed | 10-10 | `McpSchemaSanitizer` 把 anyOf/oneOf 一律改成 `type: object`，`Optional[str]` 被标成 object | 按真实类型收起，复杂选项只写进 description；校验仍用原始 Schema |
| 6f0eb28 | 10-10 | `/index` 每次清空全量重建、单线程、每个 chunk 一次 HTTP；请求体每轮 `toString()` 成整串 | SHA-256 增量、4 线程解析、32 条一批 Embedding、失败保留旧索引；`JsonRequestBody` 直接写出 |

## 现有差距（面试答案可能要超出源码的地方）

- Sub-agent：ReAct 没有派生 Sub-agent 的工具，Team 是固定 1 planner + 2 worker + reviewer，并行度上限 2（`AgentOrchestrator.java:121-126`、`:402`）
- Team 下游只看到依赖结果前 500 字符（`AgentOrchestrator.java:635-638`）
- Team reviewer 不带工具，只看 worker 的文字结果；reviewer 的 LLM 调用出错时直接保留结果算完成，重试轮出错时按通过处理（`AgentOrchestrator.java:541-549`、`:600-607`）
- 向量检索没有 ANN 索引，每次查询全表扫描当前项目的 chunk 并在 Java 里算余弦（`VectorStore.java:268-295`）；calls 关系没有符号解析（`CodeAnalyzer.java:90-98`）
- 长期记忆检索是关键词打分，没有向量召回（`MemoryRetriever.java:65-74`）
- 审批提示词始终是 `approvals/suggest.md`，没有随 auto/ask 模式切换（`PromptAssembler.java:55-65`）
- auto 模式下 `write_file`、`edit_file`、`create_project` 既不弹框也不经过分类器（`HitlToolRegistry.java:53-55`，`ApprovalPolicy.java:41-43`），出错只能靠 Side-Git 回滚
- 交互式 CLI 默认不开命令沙箱，此时 `execute_command` 继承 PaiCLI 进程的全部环境变量（含各家 API Key），和 MCP 子进程的白名单不对称（`ToolRegistry.java:1809-1811`）；没有通用容器或虚拟机沙箱（`AGENTS.md:174`）
- CommandGuard 是正则黑名单，不做 shell 解析（`CommandGuard.java:12-15`）
- MCP：HTTP 类型 server 不 ping、不自动重连；没有 OAuth 登录和 sampling（`AGENTS.md:16`、`:174`）
- LLM：没有跨供应商故障切换和熔断
- Side-Git 快照没有自动删除旧快照（`SideGitManager.java:86`、`:132`）
- 会话模式只接了 inline CLI，Lanterna 全屏界面没接（`AGENTS.md:95`）
