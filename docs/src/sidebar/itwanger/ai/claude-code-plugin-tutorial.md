---
title: 这份Claude Code指南火爆全网，已狂飙20k+ Star！
shortTitle: Claude Code 插件实战
description: 深入测试 Everything Claude Code 仓库，手把手教你通过插件系统打造专属的 AI 编程助手，提升开发效率 10 倍
tag:
  - 程序员
category:
  - AI
author: 二哥
date: 2026-01-23
---

大家好，我是二笔呀。

前两天刷 GitHub，发现了个宝藏仓库——**Everything Claude Code**，研究了一天我得出这样的结论：这哥们把 Claude Code 玩出了花啊！

![](https://cdn.paicoding.com/stutymore/claude-code-plugin-tutorial-20260123185150.png)

说真的，作为一个每天都在用 Claude Code 的人，我看到这个仓库的第一反应是：**这哪是配置集,简直就是 Claude Code 的"外挂"啊!**

## 01、这个仓库到底有多牛?

先说背景：这个仓库的作者 **affaan-m** 不是一般人，他是 Anthropic 黑客马拉松的冠军，用 Claude Code 构建了 **zenith.chat** 这个项目。

![](https://cdn.paicoding.com/stutymore/claude-code-plugin-tutorial-20260123185711.png)

这些配置都是在 10 个多月的高强度日常使用中，打磨出来的**生产级配置**。

仓库里有什么?
- **Agents** - 各种专业子代理(架构师、代码审查员、测试工程师等)
- **Skills** - 工作流定义和领域知识(TDD、安全审查、性能优化等)
- **Commands** - 斜杠命令(快速执行常见操作)
- **Rules** - 强制遵循的规范(代码风格、安全检查、测试要求)
- **Hooks** - 基于事件的自动化(会话管理、智能压缩等)
- **MCP 配置** - 各种服务器的配置(GitHub、Supabase、Vercel 等)

啧啧啧，光是想想这些功能组合在一起，就让人爽歪歪啊！

## 02、安装实战

如果你像我一样，喜欢完全掌控每个配置，可以手动安装:

```bash
# 克隆仓库
git clone https://github.com/affaan-m/everything-claude-code.git

# 复制 agents
cp everything-claude-code/agents/*.md ~/.claude/agents/

# 复制 rules
cp everything-claude-code/rules/*.md ~/.claude/rules/

# 复制 commands
cp everything-claude-code/commands/*.md ~/.claude/commands/

# 复制 skills
cp -r everything-claude-code/skills/* ~/.claude/skills/
```

![](https://cdn.paicoding.com/stutymore/claude-code-plugin-tutorial-20260123190025.png)


## 03、核心功能实测

我挑几个最实用的功能来测试。

### Agent

这个仓库提供了多个专业化的智能体:

**planner.md** - 功能规划智能体
```markdown
---
name: planner
description: Creates detailed implementation plans
tools: Read, Grep, Glob, Bash
model: sonnet
---
```

直接在对话中输入“使用 planner agent 分析：如何给网站添加搜索功能“。

![](https://cdn.paicoding.com/stutymore/claude-code-plugin-tutorial-20260123193055.png)

这一点至关重要:**专业的人做专业的事，智能体让 Claude Code 更专注**。

### 斜杠命令

![](https://cdn.paicoding.com/stutymore/claude-code-plugin-tutorial-20260123194214.png)

这些命令简直是效率神器:

- `/tdd` - TDD 开发流程
- `/e2e` - 生成 E2E 测试
- `/code-review` - 代码质量审查
- `/build-fix` - 修复构建错误
- `/refactor-clean` - 清理死代码

我试了 `/code-review` 命令,它会:
1. 自动扫描代码库
2. 检查代码质量问题
3. 识别潜在的安全漏洞
4. 提供改进建议

![](https://cdn.paicoding.com/stutymore/claude-code-plugin-tutorial-20260123194542.png)

好,我们直接来看效果:

```bash
# 使用命令
/code-review

# 输出
✓ 检查了 x 个文件
⚠ 发现 x 个安全问题
⚠ 发现 x 个代码异味
💡 提供了 x 个改进建议
```

![](https://cdn.paicoding.com/stutymore/claude-code-plugin-tutorial-20260123194619.png)

怎么样,是不是很赞?

### Rules 强制规范

Rules 是"始终遵循"的指导原则,包含:

- **security.md** - 安全检查(无硬编码密钥、输入验证等)
- **coding-style.md** - 代码风格(不可变性、文件组织等)
- **testing.md** - 测试要求(TDD、80% 覆盖率等)
- **git-workflow.md** - Git 工作流(提交格式、PR 流程等)

这些规则会被 Claude Code **始终遵守**,不像普通的提示词那样可能被忽略。

![](https://cdn.paicoding.com/stutymore/claude-code-plugin-tutorial-20260123194857.png)

我特别喜欢 `coding-style.md` 里的规则:

- 强调不可变性（Critical） - 明确禁止对象变异，强制使用对象展开运算符创建新对象，这是文档的首要优先级
- 代码组织原则 - 倾向于很多小文件而非少数大文件，规定了最佳行数范围（200-400行，最多800行）
- 实用的代码示例 - 每个规则都配有对比的代码片段，展示错误写法（WRONG）和正确写法（CORRECT），便于理解速参考和执行

讲真,这些规则让生成的代码质量**肉眼可见地提升**。

### Hooks 自动化

Hooks 是基于事件的自动化触发器,比如:

- **PreToolUse** - 工具使用前触发
- **PostToolUse** - 工具使用后触发
- **Stop** - 会话结束时触发

一个实用的例子:在编辑文件前检查 `console.log`

```json
{
  "matcher": "tool == \"Edit\" && file matches \"\\.(ts|js)$\"",
  "hooks": [{
    "type": "command",
    "command": "grep -n 'console.log' \"$file\" && echo 'Remove console.log!'"
  }]
}
```

这个细节特别加分:**防止调试代码泄漏到生产环境**。

还有更高级的功能:
- **Memory Persistence** - 自动保存/加载会话上下文
- **Strategic Compact** - 智能压缩建议
- **Continuous Learning** - 从会话中自动提取模式

详细讲一下 memory-persistence 会话记忆持久化，包含 3 个 hook 脚本：

1. session-start.sh - 会话启动时运行
- 查找最近 7 天内的会话文件
- 提醒 Claude 有可加载的历史上下文
- 显示已学习的技能数量
2. session-end.sh - 会话结束时运行
- 创建或更新当天的会话日志文件（~/.claude/sessions/YYYY-MM-DD-session.tmp）
- 记录已完成/进行中的任务
- 为下次会话保存上下文提示
3. pre-compact.sh - 上下文压缩前运行
- 在 Claude 压缩上下文之前保存重要状态
- 在压缩日志中记录压缩事件
- 在活动会话文件中标记压缩时间点

## 04、踩坑记录

**问题:** 仓库的脚本默认用 npm,但我项目用的是 pnpm。

**解决:** 这个仓库现在支持自动检测包管理器,优先级是:
1. 环境变量 `CLAUDE_PACKAGE_MANAGER`
2. 项目配置 `.claude/package-manager.json`
3. `package.json` 的 `packageManager` 字段
4. 锁文件检测
5. 全局配置
6. 回退到第一个可用的

设置首选包管理器:

```bash
# 通过环境变量
export CLAUDE_PACKAGE_MANAGER=pnpm

# 通过全局配置
node scripts/setup-package-manager.js --global pnpm

# 通过项目配置
node scripts/setup-package-manager.js --project bun

# 检测当前设置
node scripts/setup-package-manager.js --detect
```

或者直接用 `/setup-pm` 命令,更方便。


## 05、实战案例:用插件系统重构代码

让我展示一个真实的场景:**重构一个遗留模块**。

### 步骤 1: 用 /plan 创建计划

```bash
/plan "重构用户服务层,引入 Repository 模式"
```

planner agent 给出的计划:
1. 创建 `UserRepository` 接口
2. 实现 `UserRepositoryImpl`
3. 重构 `UserService` 依赖注入
4. 更新单元测试
5. 运行测试验证

### 步骤 2: 用 tdd agent 开发

```bash
/tdd
```

TDD workflow:
1. 先定义接口 ✓
2. 写失败测试(RED) ✓
3. 实现最小代码(GREEN) ✓
4. 重构优化(REFACTOR) ✓
5. 验证 80%+ 覆盖率 ✓

### 步骤 3: 用 code-review 检查

```bash
/code-review
```

审查结果:
- ✓ 代码质量良好
- ⚠ 发现 1 个潜在空指针
- 💡 建议添加缓存层

### 步骤 4: 用 verify 验证

```bash
/verify
```

验证循环:
- 检查点测试通过 ✓
- 持续评估通过 ✓
- 性能基准测试通过 ✓

整个流程下来,**代码质量和开发效率都提升了**。

## 06、如何写到简历上?

如果你在项目中使用了这套系统,可以这样写:

**项目名称:** AI 辅助开发平台搭建

**技术栈:** Claude Code, Node.js, TypeScript, MCP

**核心职责:**
- 搭建基于 Claude Code 的 AI 辅助开发平台,集成 15+ 专业 agents；实现自动化代码审查流程,代码缺陷率降低 40%
- 配置 TDD 工作流,单元测试覆盖率达到 85%+；通过 Hooks 实现会话管理和智能压缩


## ending

Everything Claude Code 这个仓库,**真的把 Claude Code 的潜力发挥到了极致**。

它不是一个简单的配置集,而是一套**完整的工程化方法论**:
- 通过 Agents 实现专业化分工
- 通过 Commands 提升操作效率
- 通过 Rules 保证代码质量
- 通过 Hooks 实现自动化

如果你也在用 Claude Code,**真心建议试试这个仓库**。

当然了,这些配置是作者的工作流总结,你需要:
1. 从中挑选适合你的部分
2. 根据你的技术栈调整
3. 删除用不到的功能
4. 添加你自己的模式

源码已经开源在 GitHub:https://github.com/affaan-m/everything-claude-code

还没有体验的同学,可以抓紧时间试试了。用好了,开发效率提升个 3-5 倍不是梦。

**这篇文章的所有配置我都测试过,可以直接复用**。如果你在安装或使用过程中遇到问题,欢迎在评论区交流。

---

**参考资料:**
- Everything Claude Code:https://github.com/affaan-m/everything-claude-code
- Claude Code 官方文档:https://docs.anthropic.com/claude-code
- 作者 Twitter:@affaanmustafa
- zenith.chat:https://zenith.chat
