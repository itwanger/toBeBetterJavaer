---
title: 腾讯面试官：“用Claude Code半年了，CLAUDE.md你是怎么维护的？”我不假思索：“就/init 一下啊”，他愣住了。
shortTitle: CLAUDE.md 硬核指南
description: 深度拆解 Claude Code 的 CLAUDE.md 机制，从四层加载体系、指令预算、rules 目录到 Anthropic 官方写法，手把手教你写出高质量 CLAUDE.md。
keywords:
  - Claude Code
  - CLAUDE.md
  - Agent 配置
  - Claude Code 最佳实践
  - AI Coding
tag:
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-05-25
---

大家好，我是二哥呀。

前两天有个读者私信我，说腾讯二面问了这样一个问题：“CLAUDE.md 你是怎么维护的？”他知道的就是“`/init` 一下”，别的平常也没怎么关注。

这就好比面试官想让你回答“数据库怎么优化的”，结果你回答了“装个 MySQL 就行了”。

说了，但又好像没说。

![](https://files.mdnice.com/user/3903/0b1742f9-1b16-4c4d-afc1-17535aeb004b.png)

`/init` 只是起点。

CLAUDE.md 这个文件，写好了就是超级外挂，你的代码交付质量杠杠的。

写烂了就是 token 噪音。今天这篇内容，给大家来一次硬核拆解。

> 系好安全带，我们粗粗粗发～

## 01、CLAUDE.md 到底是个什么东西

先把概念捋清楚。

CLAUDE.md 不是 README，不是注释，不是文档，它是 Claude Code 每次启动时自动读取的**持久化指令文件**。

每次开一个新会话，Claude Code 做的第一件事就是把 CLAUDE.md 的内容塞进上下文窗口。写在里面的每一条指令，Claude 在整个会话过程中都能“看到”。

打个比方：CLAUDE.md 就是给 Claude 写的一份“入职须知”。新员工第一天上班，不可能把所有业务逻辑口头讲一遍，对吧？

得写一份文档，告诉他：我们用什么技术栈、代码风格怎么要求、测试怎么跑、哪些坑千万别踩。

CLAUDE.md 干的就是这个事。

![](https://files.mdnice.com/user/3903/b3cbf134-5af0-423d-a731-bd84122b446f.png)

TIPS：为了兼容 Codex，我通常会让 CLAUDE.md 去加载一下 AGENTS.md，省得一个项目维护两份规则。

那 `/init` 做了什么呢？

它会扫描代码仓库，分析 package.json、Makefile、README 这些文件，然后自动生成一份 CLAUDE.md。这份自动生成的文件通常包含：构建命令、测试命令、项目结构描述。

## 02、Claude Code 的四层加载体系

Claude Code 有一套完整的加载体系，可以分为四层，搞懂这个体系，才能真正用好 CLAUDE.md。

![](https://files.mdnice.com/user/3903/c1ae40ba-d166-4bc0-8e6a-459bbc1c238b.png)

### 第一层：全局配置

路径是 `~/.claude/CLAUDE.md`，所有项目都会加载。适合放个人的编码偏好，比如“我喜欢用 2 空格缩进”“commit message 用英文”“别给我写注释，代码要自解释”。

```markdown
# ~/.claude/CLAUDE.md

- 使用 2 空格缩进
- commit message 用英文，遵循 Conventional Commits
- 不写注释，用有意义的变量名和函数名代替
```

### 第二层：项目配置

路径是项目根目录下的 `CLAUDE.md` 或 `.claude/CLAUDE.md`，提交到 git 里，团队共享。这是用得最多的一层，写构建命令、代码规范、架构约定。

### 第三层：本地覆盖

路径是 `CLAUDE.local.md` 或 `.claude/CLAUDE.local.md`，加到 `.gitignore` 里，只在本地生效。适合放个人的环境变量、调试偏好、或者正在试验的新规则。

比如正在搞一个新功能，想让 Claude 这段时间多写日志方便调试，就可以临时加到 local 文件里，不影响团队其他人。

### 第四层：子目录配置

子目录下也可以有自己的 CLAUDE.md，但这一层是**按需加载**的，只有当 Claude 读取到那个目录下的文件时，对应的 CLAUDE.md 才会被加载进上下文。

这个设计对 monorepo 特别友好。前端目录可以有自己的规则，后端目录有另一套，互不干扰。

```
my-monorepo/
├── CLAUDE.md              # 全局项目规则
├── frontend/
│   └── CLAUDE.md          # React 相关规则，按需加载
├── backend/
│   └── CLAUDE.md          # Java/Spring 相关规则，按需加载
└── infra/
    └── CLAUDE.md          # 部署相关规则，按需加载
```

加载顺序是从文件系统根目录一路往下走到启动 Claude Code 的工作目录。所有文件的内容会**拼接在一起**。如果两个文件的指令冲突了，靠近工作目录的那个会因为“最后被读到”而有更高的优先级。

我把 Claude Code 的源码翻出来给大家看看。

核心逻辑在 `src/utils/claudemd.ts` 的 `getMemoryFiles()` 函数里：

```typescript
// 第一步：加载 Managed（系统级）和 User（用户级）的 CLAUDE.md + rules
const managedClaudeMd = getMemoryPath('Managed')
result.push(...(await processMemoryFile(managedClaudeMd, 'Managed', ...)))

const userClaudeMd = getMemoryPath('User')
result.push(...(await processMemoryFile(userClaudeMd, 'User', ...)))

// 第二步：从当前目录一路往上走到根目录，收集所有路径
const dirs: string[] = []
let currentDir = getOriginalCwd()
while (currentDir !== parse(currentDir).root) {
  dirs.push(currentDir)
  currentDir = dirname(currentDir)
}

// 第三步：反转！从根目录往下走，依次加载每个目录的 CLAUDE.md
for (const dir of dirs.reverse()) {
  // 加载 CLAUDE.md（Project 类型）
  const projectPath = join(dir, 'CLAUDE.md')
  result.push(...(await processMemoryFile(projectPath, 'Project', ...)))

  // 加载 .claude/CLAUDE.md（也是 Project 类型）
  const dotClaudePath = join(dir, '.claude', 'CLAUDE.md')
  result.push(...(await processMemoryFile(dotClaudePath, 'Project', ...)))

  // 加载 .claude/rules/*.md
  const rulesDir = join(dir, '.claude', 'rules')
  result.push(...(await processMdRules({ rulesDir, type: 'Project', ... })))

  // 加载 CLAUDE.local.md（Local 类型）
  const localPath = join(dir, 'CLAUDE.local.md')
  result.push(...(await processMemoryFile(localPath, 'Local', ...)))
}
```

先收集路径，然后 `dirs.reverse()` 反转，从根目录开始往工作目录走。越靠近工作目录的文件越晚加载，所以优先级越高。而且 Project 和 Local 是在同一个循环里处理的，CLAUDE.local.md 在 CLAUDE.md 之后加载，天然就能覆盖项目规则。

注意，**不要让不同层级的 CLAUDE.md 互相矛盾**。这是维护的第一原则。

## 03、LLM 的指令预算

CLAUDE.md 写多了会怎么样？Anthropic 官方文档原话是这么说的：

> If your CLAUDE.md is too long, Claude ignores half of it because important rules get lost in the noise.

翻译一下就是：CLAUDE.md 太长，Claude 会忽略一半，因为重要规则会被噪音淹没。

![](https://files.mdnice.com/user/3903/22fe9bd6-54e1-499a-9732-4de30f7e50ce.png)

到底多长算“太长”？

这里要先搞清楚一个概念：**什么是“指令”？**

CLAUDE.md 里写的每一条规则，就是一条指令。比如“日志用 SLF4J，不用 System.out”是一条，“改了命令入口要同步 Main.java + CliCommandParser + 测试 + 文档”也是一条。每条指令通常就是一两句话，大约 10-30 个 token。

arXiv 上有一篇论文《How Many Instructions Can LLMs Follow at Once?》（作者 Daniel Jaroslawicz 等人，论文编号 2507.11538），专门测了模型同时遵循多条指令的能力。

![](https://cdn.paicoding.com/stutymore/claude-code-claudemd-guide-20260525164924.png)

测试方法：给模型一个写报告的任务，同时附加 N 条约束，比如“必须包含关键词 X”“不得用被动语态”“段落不超过 5 句”，然后看模型到底能遵守多少条。

结论是：**即使是最强的前沿模型，在 500 条指令密度下准确率也只有 68%**。

指令越多，遵循率越低，而且模型会系统性地偏向序列前面的指令，后面的指令更容易被忽略。

注意，这里的瓶颈不是上下文窗口装不下——**而是模型的注意力分配不过来**。就像一个人同时记 500 条规矩，不是纸写不下，是脑子跟不上。

![](https://cdn.paicoding.com/paicoding/7ae2a5a14deeaecd49e320fdf25bb0a0.jpg)

再算一下 Claude Code 的情况。系统提示本身就带了大量内置指令（权限控制、工具使用规范、安全约束、代码风格要求等），这些已经占了相当多的指令位。

CLAUDE.md 的内容是**叠加**在这些之上的。所以留给 CLAUDE.md 的有效空间，真的没有大家想象得那么多。

> 论文来源：https://arxiv.org/abs/2507.11538

这就像给新员工写入职须知。

写 10 条，他能记住 8 条。写 50 条，他能记住 20 条。写 200 条，翻都不想翻，记住的可能还不到 10 条。

### 怎么判断一条指令该不该放进 CLAUDE.md？

问两个问题：

第一，如果不写这条，Claude 会不会搞错？如果 Claude 靠读代码就能推断出来，别写。

第二，这条指令是不是每次会话都需要？如果只在特定场景下需要，放到 `rules/` 目录里做路径限定（后面讲），别塞在 CLAUDE.md 里浪费预算。

![](https://files.mdnice.com/user/3903/f1e63521-9993-4d77-a21d-37410270c41b.jpg)

Anthropic 官方给了一个非常实用的建议：**像维护代码一样维护 CLAUDE.md**。

定期 review，发现 Claude 没遵守的指令，加“重要”或“务必要执行”强调；发现 Claude 本来就会做对的指令，果断删掉。

![](https://files.mdnice.com/user/3903/3c1383ee-d817-44a8-88ac-fa8ea49942e1.jpg)

> 来源：https://www.anthropic.com/engineering/claude-code-best-practices

## 04、什么样的规则会真正生效？

指令预算告诉我们 CLAUDE.md 要写的精简一些，那就要分清楚哪些规则有用、哪些是噪音。

![](https://files.mdnice.com/user/3903/69298a9c-2341-4dfb-b026-6935ad39c152.png)

拿 PaiCLI 项目来举例。PaiCLI 是一个纯 Java 实现的 Agent CLI。我直接把它的 AGENTS.md 里的规则拿出来，大家感受一下真实的高效规则是什么样的：

```markdown
- 构建：mvn clean package（默认跳过测试）
- 快速回归：mvn test -Pquick
- 指定测试：mvn test -Dtest=ToolRegistryTest
- search_code 是 RAG 语义辅助，不是主要的代码定位方式，优先用 glob_files → grep_code → read_file
- 改了行为 → 同步 AGENTS.md + README.md + ROADMAP.md
- 改了命令入口 → Main.java + CliCommandParser.java + 测试 + 文档
- 禁止提交 .env、真实 API Key、target/ 产物
```

每一条**不说清楚就一定会搞错**。

Claude 不可能从代码里猜到 `mvn clean package` 默认跳过测试。也不可能知道改了一个斜杠命令之后要同步四个地方。更不可能知道 `search_code` 在这个项目里只是辅助，真正的代码定位靠 glob + grep + read 三件套。

这就是高效规则的样子：**一句话说清楚，不解释不废话，但信息密度很高。**

再看看反面例子：

```markdown
- 使用 Java 17 编写代码
- 遵循分层架构
- 保持代码整洁
```

Claude 看了 `pom.xml` 里的 `<java.version>17</java.version>` 自然就知道用 Java 17，看了 `agent/tool/cli/memory` 这些目录自然就知道怎么分层。“保持代码整洁”更是等于没说。

![](https://files.mdnice.com/user/3903/111c36fc-abed-4194-897a-93e81d0d8753.jpg)

总结一下，好规则有三个特征：

第一，**一句话能写完**。如果一条规则需要三行才能说清楚，要么拆成三条，要么说明它本身就太复杂了，应该放到代码注释或文档里。

第二，**Claude 靠自己推断不出来**。能从 pom.xml、代码结构、配置文件推断的都不用写。

第三，**有明确的行动指导**。“注意安全”是空话，“PathGuard 限制在项目根目录，禁止绝对路径逃逸和符号链接穿越”才是规则。

## 05、A 厂是怎么写 CLAUDE.md 的？

来看看 Anthropic 的项目是怎么写的。

他们的 `claude-code-action` 仓库（就是 GitHub Actions 里跑 Claude Code 的那个项目）有一份 CLAUDE.md，我去翻了一下：

- **Commands**：构建、测试、lint 的具体命令
- **What This Is**：项目是什么，一句话说清楚
- **How It Runs**：运行机制，不是文档式的介绍，而是“改代码之前必须知道的事”
- **Key Concepts**：核心概念，3-5 个要点
- **Things That Will Bite You**：踩坑清单，列出会让人踩雷的细节
- **Code Conventions**：代码约定，只写和默认不一样的部分

![](https://cdn.paicoding.com/stutymore/claude-code-claudemd-guide-20260525155458.png)

## 06、rules/ 目录

CLAUDE.md 只有一个文件，项目复杂了之后很容易臃肿。这时候 `.claude/rules/` 目录就派上用场了。

rules 目录下的每个 `.md` 文件都是一份独立的指令集。没有 `paths` 前置字段的 rules 文件，和 CLAUDE.md 一样在启动时加载。带 `paths` 前置字段的，只在 Claude 操作匹配路径的文件时才加载。

```markdown
# .claude/rules/react-conventions.md

---

paths:

- "src/components/\*_/_.tsx"
- "src/hooks/\*_/_.ts"

---

- 组件用函数式写法，不用 class
- props 在函数签名中解构
- 自定义 hook 以 use 开头
- 状态管理用 zustand，不用 redux
```

这份规则只在 Claude 读写 `src/components/` 或 `src/hooks/` 下的文件时才会被加载。写后端 Java 代码的时候，这些前端规则不会占用上下文窗口，不浪费指令预算。

```
.claude/
├── CLAUDE.md              # 核心规则，控制在 80 行以内
└── rules/
    ├── code-style.md      # 通用代码风格，无路径限定
    ├── testing.md          # 测试约定，无路径限定
    ├── security.md         # 安全规则，无路径限定
    ├── frontend.md         # 前端规则，paths: ["src/**/*.tsx"]
    └── api.md              # API 规则，paths: ["src/api/**/*.ts"]
```

CLAUDE.md 只放最核心的 5-10 条规则和关键命令，其余按主题拆到 rules 目录。这样每条规则都能被精准投放，不浪费一个 token 的上下文空间。

还有一个进阶用法：**用 `@path` 语法导入外部文件**。

```markdown
# CLAUDE.md

@README.md
@docs/architecture.md

## 项目规则

- 所有 API 返回统一用 Result 包装
- 日志用 SLF4J，不用 System.out
```

`@README.md` 会在启动时被展开，把 README 的内容直接注入到上下文里。这适合那些 README 写得特别好、但不想在 CLAUDE.md 里重复一遍的项目。

## 07、/init 和 /memory

**`/init` 负责冷启动。**

新项目第一天，跑一下 `/init`，Claude 会扫描仓库结构、分析依赖、读 README，生成一份基础的 CLAUDE.md。包含构建命令、测试命令、项目基本描述。

**`/memory` 负责热更新。**

Claude Code 有一套自动记忆系统。每个项目在 `~/.claude/projects/` 目录下都有一个 `MEMORY.md` 文件，Claude 会把跨会话需要记住的信息自动写到这里。下次启动会话时，MEMORY.md 的前 200 行会被自动加载进上下文。

![](https://cdn.paicoding.com/stutymore/claude-code-claudemd-guide-20260525160021.png)

关键问题来了：**什么该写在 CLAUDE.md，什么该放在 memory 里？**

CLAUDE.md 放**团队共享的、长期稳定的规则**。这些内容会提交到 git，所有人都能看到、都要遵守。比如构建命令、代码规范、架构约定。

memory 放**个人的、会变化的、日常协作中积累的经验**。

![](https://cdn.paicoding.com/stutymore/claude-code-claudemd-guide-20260525160223.png)

实际维护的节奏是这样的：

第一周，跑 `/init` 生成基础版 CLAUDE.md。在日常使用中，Claude 会自动往 memory 里积累经验。

第二周开始，review 一遍 memory 里的内容。发现有些经验其实是通用规则，就把它提炼到 CLAUDE.md 里。memory 里过时的条目，主动清理掉。

## 08、Claude Code 配置体系

CLAUDE.md 不是孤立存在的。Claude Code 的整个配置体系有四个角色，搞清楚各自的边界很关键。

**CLAUDE.md 管“建议”。** 

**settings.json 管“强制”。** 权限控制、环境变量、MCP 服务器配置，这些放在 `.claude/settings.json` 里。没有商量余地，硬性约束。

```json
{
  "permissions": {
    "allow": ["Bash(npm run *)", "Bash(git *)"],
    "deny": ["Bash(rm -rf *)", "Bash(git push --force)"]
  }
}
```

**hooks 管“自动化”。** 如果某件事必须每次都执行，别在 CLAUDE.md 里写“请记得格式化代码”，直接配一个 hook，每次编辑文件后自动跑 Prettier。hooks 由 harness 执行，不依赖 Claude 的“记忆”。

**rules/ 管“精准投放”。** 前面详细讲过了，按路径限定加载规则，节省指令预算。

![](https://cdn.paicoding.com/stutymore/claude-code-claudemd-guide-20260525160833.png)

一句话记住它们的分工：**CLAUDE.md 管建议，settings.json 管强制，hooks 管自动化，rules/ 管精准投放。**

## 09、一份拿来就能用的模板

说了这么多，给大家一份实战模板，直接复制到项目里改改就能用：

```markdown
# CLAUDE.md

## Commands

- 构建：mvn clean package -DskipTests
- 测试：mvn test
- 单个测试：mvn test -Dtest=XxxTest
- 代码检查：mvn spotbugs:check
- 格式化：mvn spotless:apply

## What This Is

一句话说清楚项目是什么。
比如：PaiCLI 是一个纯 Java 实现的 Agent CLI，28K 行代码，不依赖 Spring AI/LangGraph4J。

## Architecture

- 入口：Main.java → CliCommandParser 分发命令
- Agent 循环：AgentLoop.java，工具注册在 ToolRegistry
- 记忆系统：MemoryManager，基于文件持久化
- 不要动 agent/core/ 下的接口定义，下游工具全部依赖它们

## Things That Will Bite You

- search_code 是 RAG 辅助，不是主要代码定位方式，优先用 glob → grep → read
- 改了命令入口 → 必须同步 Main.java + CliCommandParser + 测试 + 文档
- FileUtils 的路径处理已经做了沙箱限制，不要绕过它自己拼路径
- 测试里的 API Key 全部用 mock，禁止提交真实 Key

## Code Conventions

- 日志用 SLF4J，不用 System.out
- 异常不要吞掉，至少 log.warn
- 所有 public API 返回统一的 Result 包装类
- 新工具必须实现 Tool 接口并在 ToolRegistry 注册

## Don't

- 不要在业务代码里直接 new Thread，用 ExecutorService
- 不要改 .env.example 的格式，CI 依赖它
- 不要往 CLAUDE.md 里加“保持代码整洁”这种废话
```

整个文件不到 50 行，但该覆盖的全覆盖了。

**Commands** 让 Claude 知道怎么构建测试，**Architecture** 让它知道代码在哪，**Things That Will Bite You** 防止它踩坑，**Don't** 划出红线。

没有一句废话。

## 10、面试怎么回答?

回到开头那个问题：“CLAUDE.md 你是怎么维护的？”

如果面试官问到这个问题，三句话就够了：

**第一句讲机制**：CLAUDE.md 是 Claude Code 的持久化指令文件，启动时自动加载。它有四层加载体系，从系统级到子目录级，越靠近工作目录优先级越高。

**第二句讲原则**：arXiv 论文实测，500 条指令密度下最强模型准确率只有 68%，指令越多遵循率越低。所以核心规则放 CLAUDE.md，控制在 80 行以内；按场景拆分的规则放 .claude/rules/ 目录，用 paths 前置字段做路径限定，按需加载，避免所有规则挤在一个文件里互相淹没。

**第三句讲实践**：日常维护靠两个命令——/init 冷启动生成基础版，/memory 自动积累跨会话经验。好的规则只写 Claude 自己推断不出来的东西，定期 review，像维护代码一样维护 CLAUDE.md。

好了，今天的内容就到这里。

我们下期见 👋
