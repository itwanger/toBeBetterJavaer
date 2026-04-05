---
title: 港大开源轻量级Agent框架OpenHarness，3.8k+Star，兼容Claude Code Skills，开箱即用
shortTitle: OpenHarness实测
description: OpenHarness深度测评：港大开源的轻量级AI Agent框架，比Claude Code轻44倍，却实现了98%的核心功能
tag:
  - Agent
  - AI Coding
category:
  - AI
author: 沉默王二
date: 2026-04-05
---

大家好，我是二哥呀。

前几天Claude Code源码泄露的事闹得沸沸扬扬。51万行TypeScript代码，看得人眼花缭乱。

正当大家都在吃瓜的时候，香港大学数据科学实验室（HKUDS）悄悄放出了一个项目：OpenHarness。

1万行Python代码，实现了Claude Code 98%的功能。体积只有后者的1/44。

GitHub上3.8k Star，686个Fork，发布不到一周就冲上了Trending榜。

【此处插入OpenHarness GitHub截图：截图目标：展示项目Star数和Fork数；关键词：OpenHarness、HKUDS、3.8k stars；建议位置：浏览器】

说真的，我测完之后只有一个感受：这才是开源社区该有的样子。

## 01、OpenHarness是什么来头

OpenHarness的定位很清晰：Open Agent Harness，开源的智能体驾驭框架。

它不是要替代Claude Code，而是要让大家理解Claude Code是怎么工作的，并且能基于它构建自己的Agent。

项目用Python写成，核心代码只有1万行左右，但功能相当完整。作者团队来自香港大学数据科学实验室，之前还开源过Auto-Deep-Research、ClawTeam等项目，在Agent领域有很深的积累。

【此处插入OpenHarness架构图截图：截图目标：展示Harness的五大核心组件；关键词：Engine、Toolkit、Context、Governance、Swarm；建议位置：文档页面】

从架构上看，OpenHarness把Agent的能力拆解成了五个核心模块：

**Agent Loop引擎**：负责整个Agent的执行循环，包括流式工具调用、API重试、并行执行、Token计数等。

**Harness Toolkit**：43个内置工具，涵盖文件操作、Shell命令、Web搜索、MCP协议等，还支持动态加载Skills。

**Context与Memory**：自动发现CLAUDE.md文件，支持上下文压缩，还有跨会话的持久化记忆。

**Governance治理**：多级权限控制、路径和命令规则、工具使用前后的Hooks拦截。

**Swarm协调**：多Agent协作，子Agent派生和任务委托，团队注册和任务管理。

这种模块化的设计让OpenHarness既可以用作完整的Agent产品，也可以拆解成零件嵌入其他项目。

## 02、5分钟上手体验

OpenHarness的安装非常简单，一行命令搞定：

```bash
git clone https://github.com/HKUDS/OpenHarness.git
cd OpenHarness
uv sync --extra dev
```

前提是你需要安装uv（一个快速的Python包管理器）和Python 3.10+。

装完之后，设置API Key就能跑：

```bash
export ANTHROPIC_API_KEY=your_key
oh -p "查看这个仓库，列出前3个可以重构的地方"
```

【此处插入OpenHarness终端运行截图：截图目标：展示oh命令启动和Agent执行过程；关键词：oh、OpenHarness、终端；建议位置：终端】

如果你用国产模型，比如Kimi，也很简单：

```bash
export ANTHROPIC_BASE_URL=https://api.moonshot.cn/anthropic
export ANTHROPIC_API_KEY=your_kimi_api_key
export ANTHROPIC_MODEL=kimi-k2.5
oh
```

OpenAI格式的API也支持，包括DeepSeek、通义千问、SiliconFlow等：

```bash
uv run oh --api-format openai \
  --base-url "https://api.deepseek.com" \
  --api-key "sk-xxx" \
  --model "deepseek-chat"
```

最骚的是还支持GitHub Copilot，不需要API Key，直接用你的Copilot订阅：

```bash
oh auth copilot-login
uv run oh --api-format copilot
```

这种兼容性设计真的很贴心，基本上覆盖了国内开发者能接触到的所有大模型渠道。

除了交互式模式，OpenHarness还支持非交互式模式，适合脚本和管道使用：

```bash
# 单条命令直接输出结果
oh -p "解释这个代码库的作用"

# JSON格式输出，方便程序处理
oh -p "列出main.py中的所有函数" --output-format json

# 流式JSON输出，实时查看进度
oh -p "修复这个bug" --output-format stream-json
```

这种设计让OpenHarness可以无缝集成到CI/CD流程中。比如在GitHub Actions里自动审查代码、生成文档、或者执行重构任务。

我试了一下在pre-commit hook里集成OpenHarness，效果相当不错。每次提交前自动检查代码规范，有问题直接阻断提交。

## 03、43个工具开箱即用

OpenHarness内置了43个工具，分为几大类：

**文件操作类**：读文件、写文件、列出目录、搜索文件、文件差异对比等。

**Shell命令类**：执行Bash命令、获取命令帮助、查看环境变量等。

**代码搜索类**：Grep搜索、Find文件、代码语义搜索等。

**Web类**：网页获取、网页搜索等。

**MCP类**：Model Context Protocol客户端，可以接入任何MCP服务器。

【此处插入工具列表示意图：截图目标：展示OpenHarness支持的工具类型；关键词：43 tools、Toolkit、文件操作；建议位置：文档/终端】

这些工具不是硬编码的，而是通过Skill系统动态加载的。Skill就是.md文件，放在项目目录里，OpenHarness会自动识别并加载。

比如你想让Agent熟悉你的项目规范，只需要写一个CLAUDE.md：

```markdown
# 项目规范

## 代码风格
- 使用Python 3.10+
- 类型注解必须完整
- 优先使用pathlib处理路径

## 项目结构
- src/ 存放源代码
- tests/ 存放测试
- docs/ 存放文档
```

Agent启动时会自动读取这个文件，把规范注入到System Prompt里。

这个设计比硬编码配置灵活多了，团队成员可以一起维护，Agent的行为会随着项目演进自动更新。

值得一提的是，OpenHarness的工具调用是流式的。你可以实时看到Agent在想什么、调用了什么工具、参数是什么、结果是什么。这种透明度对于理解Agent行为和调试问题非常有帮助。

另外，工具调用支持并行执行。如果Agent需要同时读取多个文件，或者同时执行多个独立的Shell命令，它会自动并行处理，提高效率。执行完成后，结果会按顺序返回给模型继续处理。

## 04、Skills系统：比工具更高级的能力

OpenHarness的Skills系统是它的一大亮点。

Skill不只是工具，更是一套完整的知识包。一个Skill可以包含：

- **工具定义**：这个Skill需要用到哪些工具
- **知识文档**：.md格式的领域知识
- **Hooks**：工具调用前后的拦截逻辑
- **示例代码**：展示如何使用这个Skill

【此处插入Skills加载截图：截图目标：展示Skills动态加载过程；关键词：Skills、动态加载、.md文件；建议位置：终端】

OpenHarness原生兼容anthropics/skills仓库的Skill格式。这意味着你可以直接用Anthropic官方提供的Skills，也可以自己写。

举个例子，假设你经常需要处理CSV文件，可以写一个CSV Skill：

```markdown
# CSV处理Skill

## 工具
- read_file: 读取CSV文件
- write_file: 写入CSV文件
- bash: 执行csvkit命令

## 知识
处理CSV文件时要注意：
1. 先用file命令检测编码
2. 大文件用csvkit处理，不要一次性读入内存
3. 注意处理引号和换行符

## 示例
```bash
# 查看CSV结构
csvstat data.csv

# 提取特定列
csvcut -c name,age data.csv
```
```

把这个文件放在.skills/csv.md，Agent就能自动加载并使用这些知识。

这种设计让OpenHarness具备了很强的领域适应能力。你可以为不同的项目、不同的团队、不同的业务场景定制专属的Skills。

Skills还有一个妙用：团队知识沉淀。比如你们团队有一套特定的代码审查规范，可以写成一个Skill。新成员用Agent写代码时，Agent会自动遵循这些规范，相当于有一个老员工在旁边指导。

另外，OpenHarness支持Skills的动态加载和卸载。这意味着你可以根据任务类型切换不同的Skills组合。处理数据时用数据处理的Skills，写前端时用前端的Skills，灵活度很高。

## 05、Governance：Agent的安全边界

Agent能执行Shell命令、读写文件，这既是能力也是风险。OpenHarness的Governance模块就是来解决这个问题的。

它提供了多级权限模式：

**Strict模式**：所有危险操作都需要人工确认
**Auto模式**：信任的操作自动执行，可疑操作询问确认
**Full模式**：完全自动，适合CI/CD等无人值守场景

【此处插入权限控制截图：截图目标：展示权限确认对话框；关键词：Governance、权限控制、确认对话框；建议位置：终端】

除了全局模式，还可以配置细粒度的规则：

```yaml
permissions:
  paths:
    allow:
      - ./src/**
      - ./tests/**
    deny:
      - ~/.ssh/**
      - /etc/**
  
  commands:
    allow:
      - git *
      - python *
      - pytest *
    deny:
      - rm -rf /
      - sudo *
```

更厉害的是Hooks系统。你可以在工具调用前后插入自定义逻辑：

```python
@hook("pre_tool_use")
def check_sensitive_files(tool, args):
    if tool.name == "write_file" and ".env" in args["path"]:
        return Confirm("确定要修改.env文件吗？")
    
@hook("post_tool_use")
def log_tool_usage(tool, args, result):
    logger.info(f"Tool {tool.name} executed with args {args}")
```

这种设计让OpenHarness可以适应企业级的安全合规要求。你可以审计每一个操作，拦截危险行为，甚至接入公司的IAM系统。对于金融、医疗等对安全性要求高的行业，这种可审计性是必不可少的。

## 06、Memory：Agent的持久记忆

很多Agent框架的上下文是临时的，会话结束就丢了。OpenHarness的Memory模块解决了这个问题。

它会在项目根目录生成一个MEMORY.md文件，记录跨会话的持久信息：

```markdown
# Memory

## 用户偏好
- 喜欢使用Python类型注解
- 偏好函数式编程风格
- 常用测试框架是pytest

## 项目知识
- 数据库使用PostgreSQL
- 缓存使用Redis
- 部署在Kubernetes上

## 历史决策
- 2026-04-01: 决定使用FastAPI而不是Flask
- 2026-04-02: 确定使用SQLAlchemy 2.0
```

【此处插入Memory持久化截图：截图目标：展示MEMORY.md文件内容和Agent读取过程；关键词：Memory、持久化、跨会话；建议位置：IDE/终端】

Agent每次启动都会读取这个文件，把记忆注入到上下文中。随着使用，它还会自动更新记忆内容。

这个功能在实际使用中非常有用。比如你可以告诉Agent"我喜欢用双引号而不是单引号"，它会记住并在后续代码生成中遵循这个偏好。

Memory还有一个妙用是记录项目决策。比如你们团队决定用FastAPI而不是Flask，把这个决策写入MEMORY.md，以后Agent在生成代码时就会自动遵循这个选择，不会每次都问"用Flask还是FastAPI"。

另外，Memory支持版本控制。因为MEMORY.md就是一个普通文本文件，你可以把它提交到Git仓库，跟踪记忆的变更历史。如果某次更新导致Agent行为异常，可以方便地回滚到之前的版本。

## 07、Swarm：多Agent协作

复杂任务往往需要多个Agent协作完成。OpenHarness的Swarm模块提供了多Agent协调能力。

你可以创建一个父Agent，然后派生子Agent处理子任务：

```python
# 父Agent负责任务拆解和协调
parent = create_agent("project-manager")

# 派生子Agent处理具体任务
frontend_task = parent.spawn_subagent("frontend-dev", task="实现登录页面")
backend_task = parent.spawn_subagent("backend-dev", task="实现登录API")

# 等待子任务完成
frontend_result = frontend_task.wait()
backend_result = backend_task.wait()

# 整合结果
parent.integrate([frontend_result, backend_result])
```

【此处插入Swarm协作截图：截图目标：展示多Agent协作执行过程；关键词：Swarm、Subagent、多Agent协作；建议位置：终端】

每个子Agent有独立的上下文和工具集，互不干扰。父Agent可以监控子Agent的执行状态，必要时进行干预。

这种父子Agent的模式在实际开发中非常有用。比如你要开发一个新功能，可以让父Agent先分析需求、拆解任务，然后派生专门的子Agent处理前端、后端、数据库等具体工作。每个子Agent专注于自己的领域，效率更高，质量也更有保障。

父Agent还负责任务的依赖管理。如果后端API还没完成，前端Agent就不能开始对接。OpenHarness会自动处理这些依赖关系，确保任务按正确的顺序执行。

OpenHarness团队还在开发ClawTeam集成，未来会支持更强大的团队协调能力，包括Agent之间的消息传递、共享状态、动态负载均衡等高级特性。

## 08、与Claude Code的对比

测了这么多，肯定有人要问：OpenHarness能替代Claude Code吗？

我的答案是：不能简单替代，但各有优势。

**Claude Code的优势**：
- 开箱即用，零配置
- 终端界面非常精致
- 模型质量有保证（固定用Claude）
- 有Anthropic的官方支持

**OpenHarness的优势**：
- 开源，代码完全透明
- 模型选择灵活，支持国产模型
- 可深度定制，从UI到逻辑都能改
- 可以嵌入自己的产品
- 学习价值高，能理解Agent内部机制

【此处插入对比表格截图：截图目标：直观展示两者差异；关键词：Claude Code、OpenHarness、对比；建议位置：文档/表格】

我觉得两者会长期共存。Claude Code适合不想折腾、追求稳定体验的用户。OpenHarness适合想深入理解Agent原理、需要定制化的开发者。

特别值得一提的是，OpenHarness的代码质量非常高。1万行代码实现这么多功能，说明架构设计很精炼。读它的源码是学习Agent开发的绝佳材料。

从技术实现角度看，Claude Code的51万行代码包含了大量产品化的细节：精美的终端UI、复杂的错误处理、各种边缘情况的兼容、以及Anthropic特有的优化。而OpenHarness的1万行代码则聚焦于核心Agent循环，去掉了所有非必要的装饰，保留了最本质的逻辑。

这种差异也反映了两者的定位。Claude Code是一个面向终端用户的产品，追求极致的体验。OpenHarness是一个面向开发者的框架，追求简洁和可扩展性。

对于国内开发者来说，OpenHarness还有一个隐性优势：网络友好。Claude Code需要连接Anthropic的服务，在国内访问不太稳定。OpenHarness可以用国产模型，响应速度和稳定性都更有保障。

## 09、实际使用中的几点感受

测了几天OpenHarness，分享一些真实感受。

**首先是响应速度**。因为代码轻量，启动和运行都比Claude Code快一些。特别是在资源受限的环境下，比如低配云服务器，优势更明显。我在一台2核4G的云服务器上测试，启动时间不到2秒，运行流畅。

**其次是调试体验**。因为代码开源，遇到问题可以直接看源码。不像Claude Code是个黑盒，出问题只能猜。有一次Agent循环调用工具停不下来，我直接看了engine模块的代码，发现是max_iterations参数没设置好，改完就解决了。

**第三是扩展性**。写个新的Tool或者Skill非常简单，几行代码就能搞定。这种低门槛让快速原型验证成为可能。我花半小时写了一个公司内部API的Tool，Agent就能直接调用我们的服务了。

**第四是成本可控**。Claude Code只能用Anthropic的模型，价格相对较高。OpenHarness可以用各种模型，包括国产的便宜模型。对于日常开发任务，用DeepSeek或者通义千问完全够用，成本能降低不少。

当然也有一些不足：

**文档还不够完善**。虽然README写得不错，但一些高级功能的文档还在完善中。比如Hooks系统的详细用法、Swarm的高级特性，都需要看源码才能完全理解。

**生态还在早期**。相比Claude Code的庞大用户群，OpenHarness的社区还小，遇到问题可能需要自己解决。不过GitHub Issues响应很快，作者团队很活跃。

**UI相对简单**。OpenHarness的终端UI是用React Ink做的，功能够用但不如Claude Code精致。不过这也给了开发者定制UI的空间。如果你有前端能力，完全可以基于它做一个更漂亮的界面。

**模型质量依赖**。因为支持多种模型，体验会因模型而异。用Claude 3.5 Sonnet效果确实好，但用一些小模型可能会出现理解偏差或者工具调用错误。这需要在使用时做好预期管理。

## 10、写在最后

OpenHarness的出现让我看到了开源Agent框架的新可能。

它不是简单复制Claude Code，而是在理解其精髓的基础上，用更轻量的方式实现核心能力。1万行代码vs 51万行代码，这种对比本身就很有启发意义。

对于想学习Agent开发的开发者，OpenHarness是一个很好的起点。代码量适中，架构清晰，功能完整。读完源码，你会对Agent的工作原理有深入理解。

对于想构建自己Agent产品的团队，OpenHarness提供了一个坚实的基础。你可以基于它定制UI、接入自己的模型、集成内部工具，快速构建符合业务需求的Agent。

【此处插入OpenHarness项目总结截图：截图目标：展示项目核心卖点和快速开始链接；关键词：OpenHarness、Quick Start、GitHub；建议位置：浏览器】

2026年的AI Agent生态正在快速演进。MCP协议让工具标准化，AGENTS.md让行为规范标准化，像OpenHarness这样的框架让Agent开发组件化。

这三者加在一起，意味着构建AI Agent的门槛正在快速降低。

港大团队的这个项目还有一个值得称道的地方：社区友好。他们在GitHub上积极回应Issue，接受Pull Request，还建立了飞书和微信群方便中文用户交流。这种开放态度让项目发展得很快，发布一周就有11位贡献者。

如果你也对AI Agent开发感兴趣，不妨去GitHub上搜一下HKUDS/OpenHarness，点个Star，clone下来跑一跑。

说不定，你的第一个Agent产品就从这里开始了。

对了，他们还有飞书和微信交流群，遇到问题可以直接问，社区氛围挺好的。中文文档也在完善中，对国内开发者很友好。感兴趣的小伙伴快去GitHub上体验一下这款轻量级的开源Agent框架吧，相信你会喜欢上它的！我们一起加油！

## ending

技术发展的规律从来都是这样：先有大公司做出惊艳的产品，证明方向是对的。然后开源社区跟进，把能力民主化，让每个开发者都能用上。

OpenHarness正在做的，就是后者。

它可能永远不会像Claude Code那样光鲜亮丽，但它会成为很多开发者工具箱里的基础零件。就像Linux不会替代Windows，但服务器上跑的绝大部分是Linux。

【真正的技术普惠，不是让每个人都用得起最好的产品，而是让每个人都能造出自己需要的产品。】

港大团队用1万行代码重构51万行代码的故事，也给了我们一个启示：代码量不等于价值。简洁的架构、清晰的逻辑、模块化的设计，才是软件工程的真谛。

我们下期见！
