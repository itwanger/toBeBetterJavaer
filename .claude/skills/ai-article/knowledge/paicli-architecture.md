# PaiCLI 架构知识库

> 调研日期：2026-07-27
> 源码路径：/Users/itwanger/Documents/GitHub/paicli
> 调研方式：Sub-agent 全量读源码

---

## 一、Prompt 组装

分层拼接，共 9 层，按固定顺序组装。

**静态层（会话期间不变，排在最前面命中 Prompt Caching）**：

1. **身份层**（base.md）：身份定义、工具定义（11 个核心工具）、工具使用策略、浏览器策略、记忆策略、安全策略
2. **人格层**（personalities/calm.md）：语气风格控制
3. **模式层**：根据执行路径加载不同指令集（ReAct / Plan / Team 各一套），通过模式枚举切换
4. **审批层**（approvals/auto|suggest|never.md）：人机协作策略，定义工具调用前是否需要用户确认

**动态层（每轮会变）**：

5. **运行时上下文**：当前日期、时区
6. **项目记忆**：从 PAI.md → .paicli/PAI.md → PAI.local.md → .paicli/PAI.local.md 按优先级加载
7. **Skills 索引**：格式化后注入，上限 20 个 Skill / 4KB
8. **上下文管理策略**：告诉模型什么时候压缩、怎么压缩
9. **收尾指令**（handoff.md）：会话结束引导

**设计要点**：静态内容排最前面，Prompt Caching 按最长公共前缀命中，前缀越稳定缓存命中率越高。

**长期记忆注入**：每轮 LLM 调用前，记忆检索模块根据用户输入查询相关记忆，更新到系统提示词中。

---

## 二、上下文压缩（两层实现）

### 第一层：短期记忆压缩

- 压缩对象：短期记忆条目
- 压缩方式：Map-Reduce 策略 + LLM 摘要
- 触发条件：短期记忆 token 数超过预算时
- 保留最近 N 轮不压缩

### 第二层：对话历史压缩

- 压缩对象：实际发送给 LLM 的消息列表
- 触发时机：每轮 LLM 调用前检查是否需要压缩
- 触发条件：当前 token 数 > maxContextWindow - min(20k, window/4) - min(13k, window/8)
  - 200k 窗口 → 约 167k 触发
  - 1M 窗口 → 约 967k 触发
- 压缩算法：
  1. 找到所有 user 消息的索引
  2. 保留最近 3 轮 user 消息及其完整交互（含 tool_call/tool_result）
  3. 历史部分用 LLM 摘要替换，摘要保留：关键诉求、已完成操作、达成共识、待办事项
  4. 分割点必须在 user 消息边界，避免切断 tool_call/tool_result 对
- 三条执行路径（ReAct/Plan/SubAgent）共用此压缩层

---

## 三、工具调用流程

### 三阶段流程

**阶段 1：LLM 生成 tool_call**
- 工具注册表生成所有工具的 JSON Schema
- 11 个核心工具 + MCP 动态工具（命名格式 mcp__{server}__{tool}）
- Schema 包含 name、description、parameters（JSON Schema）

**阶段 2：解析 + 审批**
- 从 LLM 响应中提取工具调用列表
- 写操作（write_file、execute_command 等）走 HITL 审批流程
- 路径检查器 / 命令检查器做安全策略检查
- 浏览器工具走浏览器安全检查

**阶段 3：并行执行**
- 单工具直接执行
- 多工具并行：线程池，上限 4 个
- 批量超时 90 秒
- 执行结果按原始顺序返回
- 结果作为 tool 消息追加到对话历史，LLM 继续决策

### 审计

- 审计覆盖 write_file、execute_command、create_project、revert_turn、mcp__* 等写操作
- 审计日志记录 allow/denyByPolicy

---

## 四、Skills 体系

### Tool vs Skill 区别

| 维度 | Tool | Skill |
|------|------|-------|
| 本质 | 可执行能力（读写文件、跑命令） | 决策知识和指令集（怎么用工具、什么策略） |
| 调用方式 | LLM 通过 tool_call 协议调用 | LLM 调用 load_skill → 内容注入下轮 user 消息 |
| 内容 | 代码执行，返回结构化结果 | Markdown 指令，提示词级别的知识 |
| 生命周期 | 单次调用，结果回灌 | 加载后通过 Skill 上下文缓冲区注入，LRU 淘汰 |
| 存储位置 | 硬编码在工具注册表 | 文件：~/.paicli/skills/、.paicli/skills/、jar 内置 |

### 渐进式披露三层加载

1. **索引层**：Skill 名称 + 一句话描述放进 system prompt，控制在 4KB / 20 个 Skill
2. **正文层**：LLM 判断需要某个 Skill 后调用 load_skill，完整指令加载，单个上限 5KB
3. **参考文档层**：部分 Skill 带参考文档目录，Skill 指令明确要求时才按需加载

### 加载机制

- load_skill 执行后，Skill 正文推入上下文缓冲区（LRU，最多 3 个）
- 下轮 user 消息发送前，缓冲区内容前置拼接到 user 消息
- 拼接后清空缓冲区（一次性消费）

### 三级优先级覆盖

1. 内置（jar builtin）→ 2. 用户级（~/.paicli/skills/）→ 3. 项目级（.paicli/skills/）
- 从低到高覆盖，项目级可覆盖内置同名 Skill

### Skill 文件格式

```markdown
---
name: web-access
description: Guidelines for using browser MCP and web tools
version: 1.0.0
author: PaiCLI
tags: ["web", "browser", "scraping"]
---
（正文 Markdown）
```

---

## 五、多 Agent 编排

### Team 模式四角色

1. **规划器**（PLANNER）：接收任务，输出带依赖关系的 JSON 计划。不调工具，只做判断
2. **Worker**（WORKER，2 个）：真正干活，有独立对话历史和完整工具集。同批无依赖任务可并行，默认最多 2 个 Worker 同时工作
3. **审查器**（REVIEWER）：质量关卡，审查 Worker 产出，不合格打回重做，最多 2 次

### 编排流程

1. 规划器接收用户输入 → 返回执行计划 JSON
2. 编排器解析计划为 DAG（有向无环图）
3. 按拓扑排序分批执行：
   - 找出所有依赖已满足的任务
   - 分配给空闲 Worker 并行执行
4. 每批完成后审查器检查质量
5. 不合格 → 带反馈重新执行（最多重试 2 次）
6. 全部完成 → 汇总结果

### 共享与隔离

**共享**：工具注册表（所有工具）、记忆管理器（长期记忆）、LLM 客户端（同一模型）
**隔离**：对话历史（各自独立）、Skill 上下文缓冲区（各自独立）、系统提示词（角色专属，通过模式枚举区分 PLANNER/WORKER/REVIEWER）

### 角色隔离设计要点

规划器和审查器都不碰工具，工具执行权集中在 Worker 手里——避免审查器自己改代码、自己审自己。

---

## 六、Plan 模式

### 规划流程

1. 简单任务检测 → 直接创建单任务计划
2. 复杂任务：LLM 生成 JSON 计划，包含 summary + tasks 数组
3. 每个 task 有 id、description、type、dependencies
4. 解析为执行计划对象，构建依赖图

### 执行计划数据结构

```
执行计划：
  - id, goal, status (CREATED/RUNNING/COMPLETED/FAILED/CANCELLED)
  - tasks: Map<String, Task>
  - executionOrder: List<String>（拓扑排序结果）
  - 获取可执行任务: 返回所有依赖已完成的任务

Task：
  - id, description, type (PLANNING/FILE_READ/FILE_WRITE/COMMAND/ANALYSIS/VERIFICATION)
  - status (PENDING/RUNNING/COMPLETED/FAILED/SKIPPED)
  - dependencies / dependents
  - 是否可执行: 检查所有依赖是否已完成
```

### 依赖图构建

- 用 DFS 做拓扑排序，确定执行顺序
- 检测环依赖，有环则拒绝执行

### 增量修改机制

- 用户审查计划时可选择补充需求
- 规划器基于原计划和用户反馈重新规划
- 重新走审查-执行流程

---

## 七、核心工具清单

11 个核心工具：read_file、write_file、list_dir、glob_files、grep_code、execute_command、create_project、search_code、web_search、web_fetch、save_memory、revert_turn

MCP 动态工具：运行时通过 MCP 协议注册，命名格式 mcp__{server}__{tool}

---

## 八、记忆系统

### 长期记忆

- 存储：~/.paicli/memory/long_term_memory.json
- 检索：记忆检索模块根据用户输入查询相关记忆
- 注入：每轮 LLM 调用前注入系统提示词
- Token 预算：由配置文件控制

### 项目记忆

- 来源：PAI.md → .paicli/PAI.md → PAI.local.md → .paicli/PAI.local.md
- 按文件优先级加载，后加载的覆盖前面的
