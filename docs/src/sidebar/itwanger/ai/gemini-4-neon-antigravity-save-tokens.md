---
title: 谷歌真争气啊，这下可以爽用Gemini了。
shortTitle: Gemini 4 Neon 爆火 Case 与省额度深度实战
description: 深度拆解某知名社区刷屏的五个 Gemini 4 Neon 实测作品（3D 骑行横评、粒子艺术短片、像素风生态城、1784 皇家护卫舰与 3D V12 发动机），并梳理 Google Antigravity App 与 Antigravity CLI（agy）的硬核省 Token 实战技巧。
keywords:
  - Gemini 4 Neon
  - Google Antigravity
  - Antigravity CLI
  - Orchestrator
  - Prefix Caching
  - AI Agent
tag:
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-11-21
---

大家好，我是二哥呀。

这两天的我，对 Antigravity 和 Gemini 4 Neon 是爱不释手啊。

教程、代码、视频都交给它来干了，关键是交付的结果比我预期的还要好。

![](https://cdn.paicoding.com/stutymore/sucai-20261121112948.png)

指令遵循已经可以和 Opus 5.5 坐一桌了。

这就好像之前只能考 60 分的你，突然能考 90 分，老师和同学都在不停夸你（当然了，Opus 5.5 还是 99 分的那个）。

另外，我必须告诉你一个好消息。

谷歌现在推出了黑五最高 50% 的折扣，以及反重力的重置功能。

详细点说，从今天到 11 月 26 号，谷歌的 plus 和 pro 计划最高会有 50% 的优惠，新用户还有额外的优惠。

另外，Antigravity 还会大幅提升缓存池大小，Gemini 4 Neon 的命中率能提高 4%。

![](https://cdn.paicoding.com/stutymore/sucai-20261121113331.png)

后面还会推出重置卡，虽然我对重置一直很抵触，这玩意就是纯营销，对 500 刀订阅的我来说，就是伤害。

我要的不是重置，我要的是量大管饱。

关键是重置这玩意，又不是固定周期的重置，我这次狠狠瞪完了，结果你不重置了，那我岂不是傻眼了。

我是真希望 Gemini 能雄起啊！

## 01、Neon 实测 Case

从昨天分享的内容来看，大家对 Gemini 的热情也非常高涨，所以今天继续来给大家挖掘一些 Gemini 4 Neon 好玩的 Case。

![](https://cdn.paicoding.com/stutymore/gemini-4-neon-antigravity-save-tokens-20261121131733.png)

我就一个想法，希望大家真正去用起来，至少背一个号在手里，我是 TRAE 刚发布的时候就用上 Gemini 了，那时候我就发现，Gemini 在读代码方面比之一和之二都要好。

（你们应该知道之一和之二指代的啥哈）

后来，我更是觉得 Gemini 3.8 Flash 的文本能力是 Opus 5.5 之外最好的。

### 3D 骑行动画

某知名社区博主 @AI_Screening 把 Gemini 4 Neon、Claude Opus 5.5 和旗舰版的 Gemini 4 Carbon 放在同一画面里，用同一个 Three.js 公路车骑行动画来做比较。

![](https://cdn.paicoding.com/stutymore/gemini-4-neon-antigravity-save-tokens-04-cycling-20261121143010-854bc178.png)

在图形学里，用纯代码画“人骑公路车”是一道很容易出错的运动学约束题。

对照三幅画面，差距一眼就能看出来。

Gemini 4 Neon 把骑手俯身骑行的姿态、头盔和护目镜、骑行服配色、橙色车架上的碟刹盘和水壶架都还原得很准确，脚掌稳稳踩在锁踏上，远处的落日、群山和风力发电机也有明显的层次，整体造型和空间感已经很接近定价更高的 Carbon。

### 粒子艺术短片

开发者 @thtbee_ 在 Antigravity 里用 Gemini 4 Neon 做了一部名为《Artistic Butterflies》的 Three.js 作品。

![](https://cdn.paicoding.com/stutymore/gemini-4-neon-antigravity-save-tokens-05-butterflies-20261121143010-65f2e103.gif)

这类连续的粒子动画，难点在于长时间迭代时要保持前后一致。模型既要用力场方程控制数万个粒子的生成、速度和衰减节奏，还要在长达 `57` 分钟的多轮修改里保持各章节之间的转场和光影统一。

### 太阳朋克像素城

如果你更在意画面细节和成本之间的平衡，可以看看 @notjazii 的太阳朋克风的河畔像素城。

![](https://cdn.paicoding.com/stutymore/gemini-4-neon-antigravity-save-tokens-06-riverside-20261121143010-69976477.png)

他把同一条提示词发给 Gemini 4 Neon 和 Claude Opus 5.5，两边都开到各自最高的推理档位。Neon 跑了 `20` 分钟，花费约 `$3.5`；Opus 5.5 跑了 `18` 分钟，花费约 `$7.2`。

Opus 5.5 在远景的纵深、云朵的体积和樱花枝的舒展程度上确实更好。不过 Neon 同样做出了玻璃穹顶、爬满绿植的塔楼、飞艇和风车，还加了石栏杆和蹲在栏杆上的小橘猫，水面上有暖色的夕阳波光和倒影。

### 皇家护卫舰模拟器

第四个作品来自 @abhinavflac。作者没有提供任何参考示例，只用一条提示词就让 Neon 写出了一艘可交互的 3D 帆船。

![](https://cdn.paicoding.com/stutymore/gemini-4-neon-antigravity-save-tokens-07-meridian-20261121143010-092380f8.gif)

Neon 交出的是一套完整的 WebGL 模拟器，主角是 1784 年配有 36 门火炮的皇家护卫舰《HMS Meridian》。

### 3D V12 发动机

最后一个作品是一台用 Three.js 打造、可以实时交互的 V12 发动机《AURIGA 65》。

![](https://cdn.paicoding.com/stutymore/gemini-4-neon-antigravity-save-tokens-08-auriga-20261121143010-d0b4ed61.gif)

画面质感已经很接近工业级的 CAD 渲染。

作者把 Gemini 4 Neon 设为 Orchestrator 负责架构和质量把关，下面配了一组 Gemini 4 Hydrogen 作为 Swarm 成员并行建模和自检，整个过程跑了 `2.5` 小时。

## 02、agy 里省 Token 的秘诀

### 第一条，Orchestrator 的模型搭配

很多人用 Agent 时习惯从头到尾只用一个主力模型，搜文件路径、改变量名、跑单元测试全交给高阶模型。

Antigravity 里的 Orchestrator 已经支持分别配置两个模型。

![](https://cdn.paicoding.com/stutymore/gemini-4-neon-antigravity-save-tokens-09-orchestrator-20261121143010-fd1062a2.png)

在 App 里打开 Settings > Models > Orchestrator Settings，可以把规划模型（Planner）和执行模型（Executor）分开搭配。

Planner 默认是 Gemini 4 Neon，也能选 Carbon、Argon 或 Claude Opus 5.5；Executor 默认是价格只有 Neon 一半的 Gemini 4 Hydrogen，也能换成 Claude Sonnet 5.5。

在终端里用 `agy` CLI 也可以配置，敲 `/model` 后选中 Orchestrator 这一行，用左右方向键选择，Tab 就能切换规划模型。

![](https://cdn.paicoding.com/stutymore/gemini-4-neon-antigravity-save-tokens-20261121141214.png)

或者启动时带上参数：

```bash
agy --model "Orchestrator (Neon)"
```

从架构上看，Orchestrator 在同一轮任务里会按四个步骤在两个模型之间交接：

1. 每收到一条提示词，Planner 先以只读方式检查代码库、写好实施计划，并写清楚遇到哪些异常时需要重新规划。如果只是问答就直接回答，小改动则写一份简短的计划后马上交接。
2. 计划就绪后，Executor（Hydrogen）接管工作区，负责代码搜索、批量改文件、跑编译和执行测试，按计划逐条验证。
3. 一旦 Hydrogen 遇到搞不定的情况，比如同一项验证连续两次失败、接口行为和预期不符，或者遇到计划里没定下来的设计问题，控制权会自动交回给 Planner。Planner 检查当前会话状态、修补实施计划，再交给 Hydrogen 继续执行。
4. 在长任务推进过程中，或者你在 Hydrogen 执行中途发了新指示，Executor 会先向 Planner 汇报当前进度，由 Planner 对照计划决定是收尾、继续还是调整方案。

日常绝大多数功能开发、修 Bug 和多文件重构，首选 `Orchestrator (Neon)`，让它在单轮里自动交接。

遇到能拆分成多个独立的工程，用 `/swarm` 拉起多个 Agent 通过公告板并行开发，再用 `@verifier` 验收；只有复杂的分布式架构这类每一步都需要最高推理深度的任务，才单独切到 Gemini 4 Neon 或 Carbon。

### 思考档位

在 `agy` CLI 里，随时敲 `/effort` 就能调出滑块切换默认档位，也可以直接带上参数让它立即生效：

```text
/effort low
/effort medium
/effort high
```

如果你只想给某一次简单查询临时降低档位，不想改动全局默认配置，启动 CLI 时传入 `--effort` 参数就行：

```bash
agy -p "总结最近三次提交的核心改动和影响范围" --effort low
```

我平时是这样分配四个档位的。

Low 用来做日志总结、文档检索和单文件小脚本，Medium 负责日常业务编码和 UI 原型，High 处理跨模块重构和线上排障，只有排查疑难并发 Bug 或者做高精度的 3D 工程时才开到 Extra。

### 用 /context 查看占用

长对话越往后额度掉得越快，很多时候是因为工具输出的日志和常驻的 MCP 工具定义把上下文窗口塞满了。

![](https://cdn.paicoding.com/stutymore/gemini-4-neon-antigravity-save-tokens-20261121141933.png)

在 `agy` CLI 里敲一条 `/context`，终端会画一张按比例显示的网格图和分类明细，用三种符号区分 Token 都花在了哪里。

- `◉` 代表活跃对话，包括你发的提示词和附件、模型的回复和推理过程，以及工具调用的参数和命令输出。
- `⛁` 代表固定的系统开销，包括内置系统提示词、内置工具定义、加载进来的 Rules / Skills / Subagents / Plugins，以及所有已连接 MCP 服务的工具定义 Schema（`MCP tools`）。
- `⊠` 代表检查点缓冲区（`Checkpoint buffer`），单独记录已经压缩的历史摘要，不计入网格的活跃占用百分比。

如果你平时在全局配置里挂了十来个 MCP Server，哪怕当前项目一个都用不上，它们的工具 Schema 依然会作为固定前缀出现在每一轮请求里，浪费不少 Token。发现 `MCP tools` 占比偏高，就敲 `/mcp` 把当前用不上的服务先禁用掉。

至于活跃对话，探索完代码库或者完成一个阶段性目标后，别等上下文快满了才让系统自动压缩。在 CLI 里主动敲 `/compact`，系统会把冗长的中间日志压成一份包含两部分内容的检查点，整个过程不调用工具，也不修改磁盘文件。

检查点的前半部分是结构化的续写摘要，会保留任务目标、改过的文件路径、测试结果以及“已经试过并放弃的方案”；后半部分是会话快照，完整保留近期附件、正在运行的后台任务、仍然存活的 Subagent 和 Artifacts。

单独敲 `/compact` 会在压缩完成后停下，带上指令则会按要求保留重点并接着干活：

```text
/compact 保留订单并发锁的排查结论和涉及的三个文件路径，接下来给扣减库存接口补齐并发单元测试并跑通。
```

压缩完成后，CLI 会在终端里打印压缩前后的对比，比如 `142 steps summarized · context 182.4k → ~31.2k`，省了多少一目了然。

再分享一些技巧给大家。

- 临时查个配置或函数定义，敲 `/btw <问题>` 走只读的旁路，查询过程不会进入主对话历史；
- 方向走偏了或者出现编译错误，敲 `/rewind`（App 里点 Revert）把对话回退到出错之前，不要在错误的历史上不断追加消息来纠正；
- 拿不准实现方案时，敲 `/fork` 复制出一个分支去试，失败了再切回主线；
- 切换到不相关的新需求时，直接敲 `/clear`（或者开一个新会话），把上一个任务的上下文清掉。

### 规则与技能的 Token 预算

最后来看自定义配置里最容易被忽略的 Token 消耗。

项目根目录的 `AGENTS.md` 和 `GEMINI.md` 没有 frontmatter，属于每次都会完整注入的 `always_on` 规则。根据 Antigravity 官方 Rules 文档，框架对规则设了两条预算上限。第一条是单个规则文件展开引用后最多 `24 KB`，超过就会被截断。

第二条是所有已激活的全局规则和 `always_on` 规则共享 `20000` Token 的规则预算（和插件、Skills、MCP 的预算分开计算），一旦超出，框架会把体积最大的规则文件自动替换成 `- <path>: <description>` 形式的简短引用。

![](https://cdn.paicoding.com/stutymore/gemini-4-neon-antigravity-save-tokens-12-rule-budget-20261121143010-facb2906.png)

这里还有两个官方机制的细节，了解和不了解 Token 差别很大。

第一，规则文件里引用外部文档时，写成 `@[标签](路径)` 会把目标文件的全文内联进规则里，每一轮都要占用固定的输入额度；写成 `@filename` 则不会内联内容，只会解析成工作区里的绝对路径，等模型需要时再主动去读。不是核心的全局约束尽量用 `@filename` 只给路径。

第二，把数据库迁移、Protobuf 兼容、发布审核这类只在特定场景用得上的规范，从 `AGENTS.md` 挪进 `.agents/rules/*.md`，在 YAML frontmatter 里按需选择触发模式：

```markdown
---
trigger: glob
globs: "*.sql, migrations/*.py"
description: "数据库表结构变更与迁移脚本规范"
---

1. 修改已有表结构时不要在单次发布里删除或重命名旧字段。
2. 给大表加索引时必须附带在线创建参数，避免锁表。
```

除了按文件后缀自动激活的 `glob`，还可以选 `model_decision`（平时只把路径和 `description` 摘要放进上下文，任务相关时再读全文）或者 `manual`（只有手动 `@` 提及时才加载，适合发版清单）。

另外提醒一句，`.agents/rules/` 下的文件必须带合法的 YAML frontmatter，如果漏写或者把 `model_decision` 错写成驼峰的 `modelDecision`，Antigravity 会直接忽略这条规则。

多步骤的操作流程也一样，写成 Skill 放进 `.agents/skills/<name>/SKILL.md`，平时只暴露名称和一段描述。官方文档还给了一个很实用的省 Token 技巧，如果 Skill 目录里带了辅助脚本，就在指令里让 Agent 先执行 `--help`，把脚本当成黑盒直接调用，不要把整份源码读进上下文里。

## 03、agy CLI 进阶技巧

如果你是在终端里敲 `agy`（Antigravity CLI）命令，下面这四招也很实用。

### 用 /usage 盯紧配额

在 `agy` 里敲 `/usage`（别名 `/quota`），CLI 会主动从后端拉取最新的模型配置与配额状态，打开一个交互面板，按模型组（比如 Gemini 模型组、Claude 与 GPT 模型组）展示剩余的限额和周限额。

![](https://cdn.paicoding.com/stutymore/gemini-4-neon-antigravity-save-tokens-20261122090706.png)

敲 `/credits` 可以查看当前剩余的 AI Premium Credits 余额以及当前计费周期的消耗明细。

![](https://cdn.paicoding.com/stutymore/gemini-4-neon-antigravity-save-tokens-20261122090730.png)

平时不用专门点开面板，终端右下角的状态栏也会显示剩余积分数，一旦低于预警会自动高亮提醒。

（说实话，这个设计真的很逆人类，我第一次看到的时候还以为自己 Gemini 额度用光了，原来我根本用不到这玩意）

### 用 /codesearch 和 /diff 做核查

查符号和字符串，在 `agy` 里敲 `/codesearch`（别名 `/cs`）就能唤出检索面板，不用触发模型推理，不消耗 Token。

![](https://cdn.paicoding.com/stutymore/gemini-4-neon-antigravity-save-tokens-17-code-review-20261122091907-b60d9cb2.png)

它默认支持正则和智能大小写匹配，遇到包含括号或星号的代码片段可以加 `-F` 做字面量搜索，还可以用 `f:` 限定路径或者 `-f:` 排除测试文件：

```text
/codesearch -F map[string]*UserSession
/codesearch -f:*_test.go NewUserSession
```

搜到目标后按 `Enter` 可以在面板里预览对应代码行，按 `Ctrl + G` 会用外部编辑器打开该文件的对应行号。

![](https://cdn.paicoding.com/stutymore/gemini-4-neon-antigravity-save-tokens-20261122091156.png)

代码改完要验收时，敲 `/diff` 可以打开交互式 Diff 视图，按 `Tab` 在三个视图间切换：

- All Changes：列出当前工作区所有已修改和未跟踪的文件，自动兼容 Git、Hg 和 JJ。
- Per Turn：按对话轮次分组展示 Agent 每一步具体改了哪些地方。
- Commit Tree：以提交树形式查看仓库历史，选中任意一次提交按 `Enter` 就能查看当次改动的具体文件。

### 用 agy -p 无头模式

`agy` 支持无头模式（Headless Mode），在终端里加 `-p`（别名 `--print`、`--prompt`）传入单条提示词，跑完即退出。

![](https://cdn.paicoding.com/stutymore/gemini-4-neon-antigravity-save-tokens-18-headless-output-20261122091907-7a61af05.png)

无头模式会把模型回复输出到 `stdout`，把报错、进度和权限提示分流到 `stderr`，适合接进 Shell 管道或 Git Hooks。

加上 `--output-format json` 可以拿到包含元数据的单行 JSON，加上 `--output-format stream-json` 则能逐行输出事件流，方便脚本实时监控工具调用和 Token 消耗。

## ending

AI 时代，我觉得御三家至少要用一家。

如果你能同时拥有之一、之二、之三，我可以下一个暴论，你的生产力已经超过 99% 的竞争者了。

师夷长技以制夷。

这句话我不记得是谁说了，但我觉得值得推荐给我的读者朋友们。

有时候，改变都是从一个很细微的动作开始的，一旦你开始去执行，你就会激发那个隐藏的，一个强大的自己。

如果你长期读我的内容，你会发现，我从来是杜绝任何一个负面词汇的。

我希望给大家注入的是希望，是勇气。

这不容易，但我愿意做那个仰望星空的人，我也希望你是热爱生活，关爱自己的一个人。

我们下期见。
