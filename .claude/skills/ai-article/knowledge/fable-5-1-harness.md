# Claude Fable 5.1 Harness 适配知识库

> 调研日期：2026-09-02
> 来源：Anthropic 官方 claude-api skill 文档（`/private/tmp/claude-501/bundled-skills/2.1.255/f98be30a5a4ecb8a5de0423fbcbb9db9/claude-api/`），主要文件 `shared/model-migration.md`、`shared/prompt-caching.md`、`shared/agent-design.md`、`shared/tool-use-concepts.md`、`shared/cost-optimization.md`、`shared/models.md`
> 用途：Fable 5.1 一代模型发布后，Agent 的 Harness 要改什么

---

## 一、价格与窗口（models.md § Current Models）

| 模型 | ID | 输入/输出（每 MTok） | Cache read | 上下文 | 最大输出 |
|---|---|---|---|---|---|
| Fable 5.1 | `claude-fable-5-1` | $10 / $50 | $0.25（0.025×） | 1M（默认即最大） | 128K |
| Fable 5 | `claude-fable-5` | $10 / $50 | $1（0.1×） | 1M | 128K |
| Opus 5 | `claude-opus-5` | $5 / $25 | $0.5 | 1M | 128K |
| Sonnet 5 | `claude-sonnet-5` | $2 / $10 | $0.2 | 1M | 128K |

- Fable 5.1 除 cache read 外价格与 Fable 5 完全相同；cache read 是 Fable 5 的四分之一、Opus 5 的一半（model-migration L1670、L1734）
- 最小可缓存前缀：Fable 5.1 / Fable 5 / Opus 5 都是 512 token；Sonnet 5 是 1024
- 官方定位：默认升级目标仍是 Opus 5，Fable 5.1 用于“demanding reasoning and long-horizon agentic work, or when evals on Claude Opus 5 at higher effort still fall short”（L1547）
- Fable 5.1 要求 30 天数据保留，ZDR 组织请求直接 400；不支持 Priority Tier

## 二、三个 Breaking Change（§ Migrating to Claude Fable 5.1 from Claude Fable 5）

### BC1 强制工具调用被拒（L1551-1587）

`tool_choice: {"type":"any"}` 和 `{"type":"tool","name":...}` 一律 400，报错串：`tool_choice: type "tool" and "any" are not supported for this model.` 文档强调这是模型级限制，不是 always-on thinking 的副作用。

替代方案按意图分：
- 想引导用工具：保持 `auto` + 提示词点名工具；应用层要强制某轮必须调用，在最新 user 轮之后追加 `role:"system"` 消息点名工具
- 想要参数一定符合 schema：工具定义上 `strict: true` + `additionalProperties: false`
- 只是想拿 JSON：换 `output_config.format`（structured outputs）
- `disable_parallel_tool_use: true` 配 `auto` 仍生效，语义退化为“至多一次调用”
- Checklist 要求删掉依赖强制的 retry-on-missing-tool 循环（L1839）

### BC2 thinking 块绑定产出它的模型（L1589-1595）

每个 thinking block 记录产出模型。原文：“The binding is one-way: apart from Claude Mythos 5.1, no other model can read a Claude Fable 5.1 block.” 接收模型读不了时 API 在模型看到之前丢弃：请求成功、不计费、但目标模型会缺少那段推理重新规划。被丢的块会从它的位置起改变缓存前缀。建议：不要自己剥离，“removing blocks yourself can trigger ordering/signature 400s”，剥了也省不下 token。

### BC3 preserved thinking：thinking 块只在产出它的那段会话里有效（L1597-1660）

签名额外记录会话前缀：顶层 `system`、`tools` 集合、块之前的每一条 message，外加跨轮指向上一个 thinking block 的链。所以历史只能从最前面掐，不能从中间掐。

执行范围：2026-08-31 及之后创建的新账号默认强制；更早账号 API 只记录不动作，除非请求设置了 `thinking.block_binding.prefix_mismatch_behavior`（任何值都等于开启强制）。Claude Code、claude.ai、Managed Agents、Agent SDK 已经替你保持前缀完整；自己拼 `messages` 数组的代码必须自查。

会让 thinking 块失效的操作（L1603-1609）：
- 修改、重排、删除更早的一轮而保留后面的轮次，包括客户端删旧 tool result
- 往更早轮次注入每次请求都会重建/删除的文本（提醒语、状态行、token 计数）
- 两次请求之间重建顶层 `system` 或 `tools`
- 从运行起点以外的位置移除 thinking 块
- 更早轮次以 URL 引用的图片在后续请求返回了不同字节

安全的操作（L1611）：append-only 历史；从最前面掐掉连续 thinking 块；不改内容地重排 tools；改 `system`/`tools`/`messages` 之外的参数（`max_tokens`、`effort`、`tool_choice`）；增删 `cache_control`；server-side compaction 和 context editing。原文：“the check compares the conversation as you sent it, not the server's edited copy”。

报错：违规请求在产出任何 output 之前就 400 `invalid_request_error`。恢复路径一：剥掉历史里所有 thinking 块重试一次，文档定性为一次性手段，“an integration that invalidates its own history on every request loses that reasoning and restarts the prompt cache each time”。恢复路径二：`prefix_mismatch_behavior: "drop_block"` 配 `thinking-binding-controls-2026-08-01` header，丢掉第一个不匹配块及之后所有块，响应顶层 `input_transformations` 逐条上报。

三步检查（L1643-1647）：
1. 抓几轮正常对话的精确请求体，相邻请求的 `system`、`tools`、`messages` 共享前缀应逐字节相同
2. 带 header + `drop_block` 跑一遍多轮会话，每轮 `input_transformations` 为空数组即历史完好；CI 里改设 `"error"`
3. 生产显式设 `"error"` 或 `"drop_block"`，不要留空

append-only 改造表（L1649-1658）：

| 原来的做法 | 改成 |
|---|---|
| 会话中途改 system prompt | 冻结顶层 `system`，在变更位置追加 `{"role":"system","content":"..."}` 消息（GA，无需 header） |
| 会话中途改 `tools` 数组 | 开始时声明全集（隐藏的加 `defer_loading: true`），用 `tool_addition`/`tool_removal` 块变更（beta `mid-conversation-tool-changes-2026-07-01`） |
| 注入每轮提醒、下次请求删掉 | 轮内 system 消息 `clear_at: "next_user_message"`，放在 `tool_result` 之后并留在历史里 |
| 客户端删旧 tool result | 服务端 context editing 或 compaction |
| 压缩 | 优先服务端 compaction（beta `compact-2026-01-12`）或 context editing |
| 跨轮 URL 引用图片 | Files API `file_id` 或 base64 |

压缩应该长什么样（L1660）：客户端压缩的推荐形态是 simple compaction，会话太长时压成单条摘要消息，下一次请求以“摘要 + 新的 user 轮”开头，其余一律不重放。原文：“Nothing carried over is tied to the old transcript; Claude models are trained on long-horizon tasks with this scheme and it performs comparably to more elaborate ones.” 两条硬约束：任何压缩都会重置缓存；不要在一个 tool round 中间压缩。Keep-tail compaction（摘要旧轮 + 保留最近几轮原文）会在被保留轮次上 400，解法是剥掉被保留轮次的 thinking 块或设 `drop_block`。Background 异步压缩坏得更彻底。

## 三、thinking 与 effort

- thinking 永远开启：不设 `thinking` 自动 adaptive；`{type:"disabled"}` 和 `{type:"enabled", budget_tokens: N}` 都 400。原文：“`budget_tokens` has no replacement - the `output_config.effort` parameter is a separate output-level control, not a thinking budget.”（L1316）
- `display` 默认 `"omitted"`，thinking 字段是空串；要看摘要显式 `display: "summarized"`；原始 chain of thought 永不返回
- 五档 effort：`low`/`medium`/`high`/`xhigh`/`max`，Fable 5.1 API 默认 `high`（L1750）
- `xhigh` 是绝大多数编码与 agentic 场景的最佳档位，effort 表备注“used as the default in Claude Code”（L627，注意这条出自 Opus 4.7 的 effort 表）
- 低 effort 原话（L1460）：“Lower effort settings - including `low` - still perform very well on Claude Fable 5.1, often exceeding the `xhigh` or even `max` performance of previous models.”
- L1750：“at `medium`, results roughly match Claude Fable 5 at lower cost”；“At `low`, Claude Fable 5.1 is often competitive with Opus and Sonnet on cost per task while performing better”
- `xhigh`/`max` 的长交付物陷阱（L1752）：模型会先在 thinking 里写一遍草稿再重写一遍，输出 token 大致翻倍
- 缓存视角：thinking 或 effort 变更永远让 messages 缓存失效，所以按路由固定 effort，不要逐请求变；Fable 5.1 可用 `{"role":"system","content":[],"output_config":{"effort":...}}` 消息中途换档不打断缓存（beta `mid-conversation-output-config-2026-07-01`）

## 四、1M 上下文下的上下文管理（agent-design.md L77-83）

三件工具分工：
- Context editing：多轮之后旧 tool result、已完成 thinking 变陈旧时清掉。“Keeps the transcript lean without summarizing.” beta `context-management-2025-06-27`，策略 `clear_tool_uses_20250919`（可选 `clear_tool_inputs: true`）或 `clear_thinking_20251015`
- Compaction：会话可能触及窗口时，服务端把更早上下文摘要成一个 compaction block。beta `compact-2026-01-12`。必须把整个 `response.content` 回填，不是只取 text。文档没有给默认触发阈值数字，只说“Compaction triggers automatically when context grows large”；可配置 trigger `{"type": "input_tokens", "value": N}`，API 下限 50,000
- Memory：跨会话持久化，客户端工具操作 `/memories` 目录

原文（L83）：“Context editing and compaction operate within a session - editing prunes stale turns, compaction summarizes when you're near the limit. Memory is for cross-session persistence. Many long-running agents use all three.”

成本视角（cost-optimization § 2.3）：context editing 是上下文窗口工具，不是省钱杠杆。“Every clearing pass rewrites the cached conversation, which works against prompt caching - in the run measured for the platform docs, context editing cost more than it saved.” Compaction 在一次长 triage 运行中触发一次把账单砍了 38%。

## 五、Prompt Caching（prompt-caching.md）

- 唯一不变量：“Prompt caching is a prefix match. Any change anywhere in the prefix invalidates everything after it.”
- 渲染顺序 `tools` → `system` → `messages`；每请求最多 4 个断点
- 失效层级：工具定义变更和换模型让三层全失效；system 内容变更保 tools 失效 system 和 messages；`tool_choice`、图片、消息内容只让 messages 失效；thinking/effort 变更永远让 messages 失效
- 换模型没有逃生口，缓存按模型隔离；办法是主循环固定一个模型，便宜子任务派 Sub-agent
- Mid-conversation system message（Opus 5、Opus 4.8、Fable 5、Fable 5.1，无需 header；Sonnet 5 不支持）：把指令作为 `{"role":"system","content":"..."}` 追加到 `messages[]`。原文：“Editing top-level `system` changes the prefix ahead of the entire conversation history, so every cached turn is re-processed uncached; a `role: "system"` message sits after the history and leaves the cached prefix intact.” 同时是防注入通道，user/tool 内容里的文本“can be forged by anything that writes to user-visible input”
- 放置规则：必须跟在 user 消息之后；必须是最后一项或后面跟 assistant 轮；不能是 `messages[0]`
- `clear_at: "next_user_message"`（beta `mid-conversation-system-clear-at-2026-08-21`）：本轮以 system 权限渲染，出现更新 user 消息后停止渲染但继续原样发回。典型用法是工具循环里的每轮提醒，每条 `tool_result` 之后追加新副本，旧副本原地保留（不渲染、不花 input token）。不能带 `cache_control`
- 20-block lookback window：每个断点最多向后走 20 个位置找缓存条目；连续 `tool_use` 串算一个位置，连续 `tool_result` 串算一个位置。长轮次每约 15 个位置放一个中间断点
- 并发时序：缓存条目在第一个响应开始流式输出后才可读；fan-out 先发 1 个、等到第一个流式 token 再发剩下的
- Fable 5.1 因为 miss 相对 hit 贵得多，保温更重要（L1670）：5 到 60 分钟空闲用 `max_tokens: 0` keep-alive 重发上一次请求，通常比买 1 小时 TTL 便宜

## 六、Task budget（§ New feature: Task Budgets；cost-optimization § 2.6）

- beta `task-budgets-2026-03-13`，`output_config.task_budget: {"type":"tokens","total": N}`，最小 20,000
- 原文：“The model sees a running countdown and uses it to prioritize work and wrap up gracefully as the budget is consumed.”
- 和 `max_tokens` 的区别：“This is a suggestion the model is aware of, not a hard cap. It is distinct from `max_tokens`, which remains the enforced per-response limit and is not surfaced to the model.”
- 按循环的 90 分位 token 用量设再收紧；实测编码场景宽松预算牺牲约 2.7 个百分点通过率换 18% 成本，最紧预算牺牲 4.4 点换 47%
- 非常紧的预算会产生类似拒答的行为；只在第一次请求上设，中途改会让缓存失效
- 注意：task budget 的倒计时（模型主动感知）和 context anxiety 里“别给模型看剩余上下文倒计时”（L1488）是两回事

## 七、Behavioral shifts（L1452-1498、L1746-1834）

- 提示词过度规定会降低质量（L1503）：“Prompts and skills written for prior models are often too prescriptive for Claude Fable 5.1 and reduce output quality... prefer stating the goal and constraints over enumerating the steps.”
- 长任务单次请求可能跑几分钟（L1456）：“a 15-minute single request is normal when the task involves gathering context, building, and self-verifying”。要求规划超时、流式、进度指示，调用方异步 check in
- 并行工具调用变少（L1757）：长 agent 循环里下一批独立读取只是隐含时，“it may issue one call per turn where Claude Fable 5 batched several”。先测量“含一次以上工具调用的 assistant 轮”占比再加提示。“Placement matters more than wording”，提示放当前请求末尾比放 system prompt 有效。提示原句“privately”是承重词：“First privately list what you need next; then request every item that doesn't depend on another's result in this one response.”
- 测试蔓延 test sprawl（L1814）：“delivers what was asked and sometimes more - fixing nearby code, writing extra tests, committing scratch checks as permanent test files”。提示：“keep verification scripts outside the repository, e.g. under /tmp, and delete any you did add”
- 整文件重写（L1826）：“more likely than Claude Fable 5 to rewrite an entire file where a targeted edit would do”。提示：“try to surgically edit a file rather than rewrite the entire thing”
- 高 effort 下会做没要求的整理/重构（L1460）
- 进度声明需要落到工具结果上（L1468）：“Before reporting progress, audit each claim against a tool result from this session”，文档称“nearly eliminated fabricated status reports”
- 异步 Sub-agent（L1476、L1834）：“Sub-agents that communicate asynchronously with the orchestrator outperform spawn-and-block”；让启动 Sub-agent 的工具立即返回，结果稍后以 user 消息送达
- 给它一个 memory 面（哪怕一个 .md 文件）明显更好（L1480）
- 罕见 early stopping（L1484）：长会话深处只说“I'll now run X”却不发工具调用
- 罕见 context anxiety（L1488）：harness 显示剩余 token 倒计时时最容易触发，建议“Avoid showing explicit context-budget counts”
- 如果 harness 折叠或隐藏了工具输出，一定要告诉模型，否则它会跑命令去“展示”用户看不到的输出（L1761）
- 格式上和老模型相反：更少加粗、标题、列表，“If the prompt contains anti-formatting language, remove it”（L1775）
- 安全分类器误报（L1824）：“finding vulnerabilities in source code is permitted”；问“Are there any bugs in this program?”比“Does this program compile without errors?”更容易误报

## 八、refusal 与 server-side fallbacks（§ refusal stop reason）

- 被拒请求返回 HTTP 200，`stop_reason: "refusal"`，`stop_details.category` 为 `"cyber"`、`"bio"`、`"reasoning_extraction"`、`"frontier_llm"` 或 `null`
- 纪律：“Branch on `stop_reason`, never on `stop_details`”
- 可能在任何输出之前触发（content 为空，完全不计费），也可能流式中途触发（已流出部分计费，应丢弃）
- “Fallbacks are not automatic on the API - a request without them simply stops on a refusal.”
- 首选服务端 `fallbacks` 参数：`fallbacks: "default"` + header `server-side-fallback-2026-07-01`；允许目标 `claude-opus-4-8`、`claude-opus-5`；只对策略性拒答触发，限流过载不 fallback
- Sticky 路由：某段会话 fallback 过，后续带 `fallbacks` 的请求约 1 小时内直接由 fallback 模型服务
- Fallback credit（header `fallback-credit-2026-07-01`）：重试在新模型上之前缓存过的那段按 cache-read 费率计费，token 5 分钟过期

## 九、通用 harness 设计原则（agent-design.md）

bash vs 专用工具：“Start with bash for breadth. Promote to dedicated tools when you need to gate, render, audit, or parallelize the action.” 把动作提升为专用工具的四个理由：安全边界/可逆性、陈旧性检查、渲染、并行安全性。
