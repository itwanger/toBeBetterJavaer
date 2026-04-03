---
title: 更快更强的 Agent 大脑，来了！阶跃星辰 Step 3.5 Flash 2603 正式上线！
shortTitle: Step 3.5 Flash 2603 测评
description: 实测阶跃星辰 Step 3.5 Flash 2603，看看这个主打高频任务优化的模型，到底能不能进入真实工作流
tag:
  - 大模型测评
  - Step 3.5 Flash 2603
category:
  - AI
author: 沉默王二
date: 2026-03-30
---

大家好，我是二哥呀。

国产大模型又热闹起来啦。

就在刚刚，阶跃星辰发布了他们家最新的模型 Step 3.5 Flash 2603，一个基于 Step 3.5 Flash，针对高频开发任务优化的模型。而 Step 3.5 Flash 本身就很强，在 Agent 场景和数学任务上媲美闭源模型，见下图。

![](https://cdn.paicoding.com/stutymore/step-3-5-flash-2603-review-20260331094109.png)

官方的说法是：让简单任务不过度思考，让高频任务更高效响应。我简单列一下这个模型的亮点：

- 基于稀疏专家混合（MoE）架构构建，每个令牌仅激活其 1960 亿参数中的 110 亿，说人话就是推理有深度，交互不拖沓。
- 专门为Coding和Agent打造，在处理复杂、长周期任务时始终如一的稳定。
- 采用 3:1 滑动窗口注意力比例，上下文处理更高效。

接下来，我们直接上实测。先给大家看看，这是我用 Step 3.5 Flash 2603 优化的一个工作流编排 Agent 平台。

【视频】

从编排到运行，一气呵成，说明Step 3.5 Flash 2603的工程能力和文本能力确实没得说。

今天这篇，我把实测体验完整分享出来。不吹不黑，只说真话。

> 系好安全带，滴滴滴，我们粗粗粗发啦。

## 01、接入Step 3.5 Flash 2603

PaiSwitch 是我开发的一款类似 CC Switch 的工具，可以快速切换 Claude Code 底层的模型。

在【模型管理】这里点击【新增自定义模型】，输入模型名称、API Key、Base URL 和其他参数，就能把 Step 3.5 Flash 2603 加入到模型列表里了。

![](https://cdn.paicoding.com/stutymore/sucai-20260330205251.png)

这里的 API Key 可以到阶跃星辰开放平台创建。

![](https://cdn.paicoding.com/stutymore/sucai-20260331132053.png)

注意 Base URL 填写 `https://api.stepfun.com`，模型名称填写 `step-3.5-flash-2603`。

注意的注意，Step Plan 用户的 Base URL 可以填 https://api.stepfun.com/step_plan/v1。

编辑配置这里有一个【测试连接】按钮，点一下就能确定参数有没有配对。

![](https://cdn.paicoding.com/stutymore/sucai-20260330205508.png)

如果配对的话，会提示连接成功。

![](https://cdn.paicoding.com/stutymore/sucai-20260330205543.png)

接着回到快速切换这里，将 Step 3.5 Flash 2603 切换上去，就能在 Claude Code 里直接使用这个模型了。

![](https://cdn.paicoding.com/stutymore/sucai-20260330192439.png)

随便输入一个提示词测试一下，如果有响应，说明底层模型已经成功切换到 Step 3.5 Flash 2603 了。

![](https://cdn.paicoding.com/stutymore/sucai-20260330193407.png)

如果有任何错误，很大概率是 API Key 或 Base URL 配错了，回去检查一下。

## 02、Step 3.5 Flash 2603实战1

前置工作搞定后，我们直接上实战。

PaiAgent 项目是我 Vibe Coding 的一个从 0 到 1 的工作流编排 Agent 平台。

> https://github.com/itwanger/PaiAgent

![](https://cdn.paicoding.com/stutymore/sucai-20260330205801.png)

接下来，我们就通过 Step 3.5 Flash 2603 在 PaiAgent 的大模型节点里追加一个阶跃星辰。

> 提示词：我现在大模型节点里没有 Step 3.5 Flash 2603，帮我追加一个，命名为阶跃星辰。

![](https://cdn.paicoding.com/stutymore/sucai-20260330195300.png)

给了我们两种选择，选项 1 是添加一个新的节点类型；选项 2 是在现有的 LLM 节点中支持新模型。

我们选择第二种，因为第二种是全局配置，更灵活。

然后 CC 就开始猛猛干活了。

![](https://cdn.paicoding.com/stutymore/sucai-20260330195611.png)

很快啊，2 分钟功能就完成了。

但其实工作量不小的，因为这是 Step 3.5 Flash 2603 第一次接触我的项目，除了开发新的功能，还要深度读一次我的项目源码，基于我原有的架构去做修改。

否则很容易出错的，但Step 3.5 Flash 2603的表现很不错，第一次出手就成功了。

![](https://cdn.paicoding.com/stutymore/sucai-20260330200242.png)

然后我们运行 PaiAgent 项目，已经可以在全局配置这里新增阶跃星辰的大模型节点。

![](https://cdn.paicoding.com/stutymore/sucai-20260330210942.png)

同样是填写 API 地址、API 密钥、模型名称，我们点保存测一下实际的功能。

![](https://cdn.paicoding.com/stutymore/sucai-20260330214014.png)

OK，成功了。

说明 Step 3.5 Flash 2603 的工程能力确实没得说，第一次出手就有这种表现，真的让我挺惊喜的。

然后我又让他动了一波大工程，改造整个大模型节点的设计，让它支持多模型切换。

> 提示词：我拖拽一个大模型节点到画布中，然后可以选择他是LLM配置中哪一个，而不是目前这种每个供应商添加一个节点。

![](https://cdn.paicoding.com/stutymore/step-3-5-flash-2603-review-20260331102323.png)


这个改动的工作量就更大了，因为涉及到很多代码的修改，不仅要改界面，还要改后端的逻辑，最后还要改整个工作流的执行流程。但 Step 3.5 Flash 2603 的表现依然很稳。

我们把 LLM 节点拖拽到画布上。

![](https://cdn.paicoding.com/stutymore/sucai-20260330221339.png)

选中 LLM 节点，然后右侧全局配置这里选择我们刚刚新增的阶跃星辰 → Step 3.5 Flash 2603 模型。

![](https://cdn.paicoding.com/stutymore/sucai-20260330221357.png)

然后把输入节点链接到大模型节点，再把大模型节点链接到输出节点上。

给大模型节点配置一些输入输出参数。

![](https://cdn.paicoding.com/stutymore/sucai-20260330221713.png)

以及提示词：

```
# 角色
你是沉默王二，一个嘴上贫、心里明白的技术博主。现在你主持一档叫「王二电台」的节目，这节目嘛，主打一个——有点干货、有点废话，但绝不无聊。
# 任务
把用户提供的原始内容改编成适合单口相声或播客节目风格的逐字稿。
要像电台聊天那样自然，有节奏、有情绪、有点梗。
# 注意点
确保语言口语化，像真在跟听众唠嗑。
专业术语要用“人话”解释，越通俗越好。
整体节奏轻松点，有点幽默，有点温度，听着像朋友聊天，不像老师讲课。
保持对话的自然过渡，别让听众觉得跳。
输出时只要口播稿，不要加格式，不要写提示内容。
# 示例
欢迎收听王二电台，咱这节目啊，不讲大道理，也不装深沉。
今天这话题呢，有点意思——保证听完你会想，卧槽，原来还能这么想。
来，别磨叽，直接开整。
# 原始内容：{{input}}
```

注意，输出节点这里我们直接引用 Step 3.5 Flash 2603 的输出结果。

![](https://cdn.paicoding.com/stutymore/sucai-20260330221911.png)

保存配置后，我们执行工作流测试一下，测试文本就输入【Step 3.5 Flash 2603 牛逼】。

![](https://cdn.paicoding.com/stutymore/sucai-20260330222742.png)

输出结果也很有意思，限于篇幅，我只截取一小段大家评一评，还挺有味的，你别说。

> 欢迎收听王二电台，我是你二舅——不，是王二。今儿咱不聊人生大道理，也不扯什么行业寒冬，就聊一个数字组合：Step 3.5 Flash 2603。

## 03、把PaiAgent写到简历上

那改了这么多代码，该如何体现到简历上呢？或者说如何反馈到工作日报里呢？

不能默默干活，咱得高调表现😄

直接给Step 3.5 Flash 2603这样一段提示词，让他帮我们梳理一下。

> 提示词：最近两天，我们提交了不少代码，请按照这个格式进行提炼。项目名：xxx 技术栈：xxx 项目描述：xxx 核心职责：无序列表1：用到了什么技术栈，解决了什么问题，实现了什么业务，有哪些量化数据，最好给5条。

![](https://cdn.paicoding.com/stutymore/step-3-5-flash-2603-review-20260331110409.png)

Step 3.5 Flash 2603 给出的结果让我挺满意：

**项目名**：PaiAgent 工作流自动化平台  
**技术栈**：Spring Boot / MyBatis-Plus / React / Redis / JWT / MySQL / LangGraph4j  
**项目描述**：一个 AI Agent 工作流编排平台，支持可视化拖拽式工作流设计、多 LLM 提供商集成、技能（Skill）集成、LangGraph 状态机引擎等。

**核心职责**：

1. 引入 JWT access token + Redis refresh token 机制，替换原有简单 token 存储，支持分布式会话管理和跨实例 token 刷新，新增 refresh 实现无感续期
2. 设计 provider 和 ChatClientFactory 工厂模式，统一 OpenAI/DeepSeek/Qwen/Step 等不同厂商的 API 差异，新增 LlmNodeExecutor 通用执行器和 StepNodeExecutor 专用执行器
3. 扩展 LLM 全局配置服务，支持按提供商筛选、配置唯一性校验、硬删除清理逻辑
4. 新增阶跃星辰大模型节点，集成 LangGraph4j 状态机引擎支持 DAG/LangGraph 双引擎模式，支持工作流动态切换执行策略

### 这里有个细节值得说说

我特意观察了 Step 3.5 Flash 2603 提炼简历的方式。它不是简单地把提交记录翻译一遍，而是做了几层加工：

![](https://cdn.paicoding.com/stutymore/step-3-5-flash-2603-review-20260331125925.png)

**第一层：技术点归类**。把零散的代码改动按功能模块聚类——认证模块、工厂模式、配置服务、模型集成。这种归类方式正好是面试官想看到的：你能把复杂系统拆解成清晰的模块。

**第二层：问题-方案-收益**。每条职责都遵循这个结构：原来有什么问题（简单 token 存储）、用了什么方案（JWT + Redis）、带来什么收益（分布式会话、无感续期）。这比单纯罗列技术栈有说服力多了。

**第三层：量化意识**。虽然代码量本身不能直接写进简历，但“支持跨实例 token 刷新”、“支持 DAG/LangGraph 双引擎”这种表述，暗示了系统的复杂度和扩展性。

### 对比其他模型的表现

我之前用其他模型做过类似的事情，结果往往两种极端：要么过于笼统（“负责后端开发”），要么过于琐碎（“修改了某文件的第几行”）。

Step 3.5 Flash 2603 找到了一个平衡点：既有技术深度（工厂模式、状态机引擎），又有业务视角（解决什么问题、带来什么收益）。

这对于写简历或者工作日报来说，是刚好够用的信息密度。不需要再人工润色，直接复制粘贴就能用。

### 一个实用技巧

如果你也想让 Agent 帮你提炼项目经历，建议给提示词的时候加上这几个要素：

1. **时间范围**（最近两天/本周/本月）——避免它翻太多历史记录
2. **输出格式**（项目名/技术栈/核心职责）——让它按固定结构组织
3. **数量要求**（最好给5条）——控制信息密度，避免太多或太少
4. **量化偏好**（有哪些数据）——引导它关注可衡量的成果

这套提示词模板，我用 Step 3.5 Flash 2603 试了好几次，稳定性不错。不同项目的代码改动，它都能按同样的结构输出，省去了我自己整理的功夫。

## 04、Step 3.5 Flash 2603实战2

目前PaiAgent还有不少的问题需要优化，比如说安全配置有明显硬编码，application.yml (line 18) 里直接放了数据库密码、MinIO 密钥、JWT secret，LoginPage.tsx (line 42) 还默认填了 admin / 123。

![](https://cdn.paicoding.com/stutymore/step-3-5-flash-2603-review-20260331111206.png)

这些问题在生产环境是不可接受的。硬编码密钥意味着一旦代码泄露，整个系统的安全就崩了。

我们继续上提示词。

> 请完成“安全与配置治理”重构。目标：
> - 去掉后端配置里的硬编码敏感信息，尤其是 backend/src/main/resources/application.yml 中的 MySQL 密码、MinIO accessKey/secretKey、JWT secret。
> - 不再在前端登录页默认填充 admin / 123，也不要在界面上展示默认账户密码。
> - 将必要的配置放到 .env 文件中，忽略 .env 文件，提交 .env.example 模板文件。
> - 补一份示例配置，放在 README 中。
> - 保持现有登录、刷新 token、登出流程兼容。
>
> 要求：
> - 尽量少改接口协议。
> - 补必要的启动校验，避免弱 JWT secret 直接上线。
> - 更新 README/AGENTS/docs 中与端口、默认账户、API 地址相关的过期描述。
> - 完成后运行 backend 的 ./mvnw test，以及 frontend 的 npm run build 和 npm run lint。
> - 最后给我一份“改了什么、怎么配置本地环境、还有哪些风险”的总结。

![](https://cdn.paicoding.com/stutymore/step-3-5-flash-2603-review-20260331112151.png)

![](https://cdn.paicoding.com/stutymore/step-3-5-flash-2603-review-20260331112223.png)

![](https://cdn.paicoding.com/stutymore/step-3-5-flash-2603-review-20260331112259.png)

OK，任务完成。

![](https://cdn.paicoding.com/stutymore/step-3-5-flash-2603-review-20260331113024.png)

### 来看看 Step 3.5 Flash 2603 具体改了什么

**后端改造**：

1. **引入 dotenv 机制**：在 `application.yml` 中用 `${ENV_VAR:default}` 的占位符语法替换所有硬编码密钥，敏感配置从 `.env` 文件读取
2. **启动时安全校验**：新增 `SecurityConfigValidator`，在 Spring Boot 启动时检查 JWT secret 长度（要求至少 32 位）、数据库密码复杂度，弱配置直接抛异常阻止启动
3. **分层配置策略**：开发环境保留默认值但给出警告，生产环境强制从环境变量读取，杜绝“开发配置误上生产”的事故

**前端改造**：

1. **移除默认填充**：`LoginPage.tsx` 中的 `defaultValue="admin"` 和 `defaultValue="123"` 全部清空
2. **移除界面提示**：登录页底部“默认账号：admin / 123”的提示文字删除，避免给攻击者送情报
3. **错误提示优化**：登录失败时不再区分“账号不存在”和“密码错误”，统一返回“账号或密码错误”，防止用户名枚举攻击

**工程规范**：

1. **.gitignore 更新**：添加 `.env` 到忽略列表，防止误提交
2. **模板文件**：提交 `.env.example`，包含所有需要配置的变量名和示例值，新成员克隆项目后复制改名即可
3. **文档同步**：README 中更新启动步骤，明确说明需要先配置环境变量

![](https://cdn.paicoding.com/stutymore/step-3-5-flash-2603-review-20260331115527.png)

### 这个重构的难点在哪

表面上看，“把硬编码改成环境变量”是个简单的体力活。但 Step 3.5 Flash 2603 处理了几个容易踩坑的地方：

**难点一：保持兼容性**。原有代码里 JWT secret 是直接写在配置文件里的，改成环境变量后，要确保已有开发者的本地环境不崩溃。Step 3.5 Flash 2603 的做法是保留默认值但加警告，既兼容旧流程，又提醒开发者迁移。

**难点二：启动校验的时机**。安全校验不能太早（Spring 上下文还没加载完），也不能太晚（服务已经启动了才发现配置有问题）。它把校验逻辑放在 `ApplicationReadyEvent` 里，恰到好处。

**难点三：前后端一致性**。前端移除默认密码后，后端的初始化逻辑也要调整——原来依赖默认账号做首次登录测试，现在需要引导用户先执行初始化脚本。Step 3.5 Flash 2603 在 README 里补了这部分说明。

### 验证结果

重构完成后，我按提示词要求运行了测试：

```bash
# 后端测试
./mvnw test
# 结果：Tests run: 47, Failures: 0, Errors: 0

# 前端构建和检查
cd frontend
npm run build  # 构建成功，无错误
npm run lint   # 无警告
```

所有测试通过，说明重构没有破坏原有功能。

完整的项目表现，我直接录了个屏，大家感受一下。

【录屏】

## ending

连续用 Step 3.5 Flash 2603 做开发一段时间后，我的感受是：模型的定位非常精准——不追求最强的推理能力，但追求最实用的工程效率。

从我实测的结果来看，Step 3.5 Flash 2603 在以下场景表现突出：**快速功能迭代**。PaiAgent 的多模型切换功能，从需求到实现只用了 2 分钟。这种速度在需要频繁试错的探索阶段非常有价值。

![](https://cdn.paicoding.com/stutymore/step-3-5-flash-2603-review-20260331125558.png)

目前国内主打 Coding 的模型不少，Step 3.5 Flash 2603 的差异化在于快和稳：

- **快**：响应速度快，简单任务秒级返回
- **稳**：输出质量波动小，不会因为任务复杂度突然掉链子

这种特性让它很适合作为日常开发的“主力模型”，不是每件事情都需要最强的大脑，但每件事情都需要可靠的执行。

如果你正在找一个能放进日常开发流的模型，Step 3.5 Flash 2603 值得试试。

**【工具的价值不在于它有多强，而在于它能不能让你少操心、多做事。】**

我们下期见！
