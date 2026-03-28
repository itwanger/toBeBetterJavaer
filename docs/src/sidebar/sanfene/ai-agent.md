## 01、卸载龙虾的命令是什么？

“王哥，你这个问题问得好。很多人以为卸载就是跑一条 `npm uninstall -g openclaw`，错。”

这样卸载不干净，残留文件会藏在系统的各个角落，下次重装的时候各种报错——端口被占用、配置冲突、插件加载失败，一堆莫名其妙的问题。

正确的卸载姿势分三步。

第一步：停止 Gateway 服务

```bash
openclaw gateway stop
```

如果 Gateway 正在跑任务，强制停止可能会丢数据。建议先检查状态：

```bash
openclaw gateway status
```

确认显示 `stopped` 再继续。

![](https://cdn.paicoding.com/paicoding/feba6610f1d56038d87c8524c49cebc7.jpg)

第二步：执行官方卸载命令

```bash
openclaw uninstall
```

这个命令会弹出一个交互界面，让你选择要删除哪些内容。用空格键全选，然后回车确认。它会帮你：

- 停止并卸载 Gateway 服务
- 删除 `~/.openclaw/` 状态目录
- 清理工作区配置
- 移除插件和缓存

![](https://cdn.paicoding.com/paicoding/0303e1405a781412f0ff76650bc43f6e.png)

第三步：移除全局 CLI 包

```bash
npm rm -g openclaw
```

如果你用的是 pnpm 或 bun，对应换成：

```bash
pnpm rm -g openclaw
bun rm -g openclaw
```

遇到权限错误就加 `sudo`。

老王点点头：“那卸载后怎么验证干净？”

我说：“执行以下命令，确认没有残留：”

```bash
# 检查全局包
npm list -g openclaw

# 检查目录
ls ~/.openclaw/

# 检查端口占用
lsof -i:18789
```

全部返回空或“not found”，才算卸载干净。

老王听完点点头：“行，卸载这块确实熟。那我追问一下，`~/.openclaw/` 目录里都有什么？为什么删这个目录这么重要？”

memo：更新与3月26日，顺带给大家分享一下[二哥编程星球](https://javabetter.cn/zhishixingqiu/)的喜报，蔚来和机器人公司的日常实习拿下，恭喜这位球友。


![蔚来和机器人公司的日常实习](https://cdn.paicoding.com/paicoding/487771471af3516c1686f150431462f5.png)

## 02、龙虾的架构了解吗？

“王哥，你这是要考我架构啊。”

`~/.openclaw/` 是 OpenClaw 的“神经中枢”，里面存放着所有配置和状态。

```bash
~/.openclaw/
├── openclaw.json        # 全局配置文件
├── gateway/             # Gateway 相关
│   ├── config.json      # Gateway 配置
│   ├── logs/            # 日志目录
│   └── pid              # 进程 ID 文件
├── plugins/             # 插件目录
│   ├── @openclaw/       # 官方插件
│   └── @wecom/          # 第三方插件
├── workspaces/          # Agent 工作区
│   ├── default/         # 默认 Agent
│   └── paigit/          # 自定义 Agent
├── skills/              # 技能包
├── cache/               # 缓存目录
└── .env                 # 环境变量
```

![](https://cdn.paicoding.com/paicoding/6f12bbe4511f9ff26672931132a0f3ef.png)

老王继续追问：“这里面的每个目录都有什么用？你挑重点讲。”

### 2-1 openclaw.json有什么用？

这是 OpenClaw 的“大脑配置中心”。

```json
{
  "version": "2026.3.2",
  "gateway": {
    "port": 18789,
    "auth": "token",
    "host": "0.0.0.0"
  },
  "channels": {
    "feishu": {
      "appId": "cli_xxx",
      "appSecret": "xxx"
    },
    "wecom": {
      "botId": "xxx",
      "secret": "xxx"
    }
  },
  "model": {
    "provider": "glm",
    "profile": "coding-plan",
    "defaultModel": "glm-5"
  },
  "plugins": [
    "@openclaw/feishu-plugin",
    "@wecom/wecom-openclaw-plugin"
  ]
}
```

里面记录了：

- **Gateway 配置**：监听端口、认证方式、绑定地址
- **IM 通道配置**：飞书、企微等应用的凭证
- **大模型配置**：提供商、套餐、默认模型
- **插件列表**：已安装的插件及其加载顺序

王哥追问：“Gateway 配置里的 `auth: "token"` 是什么意思？Gateway 到底是干什么的？”

![](https://cdn.paicoding.com/paicoding/9df792d26db950bf764a87fa1e6807ec.png)

### 2-2 Gateway有什么用？

“王哥，Gateway 是 OpenClaw 架构里最关键的设计。”

很多人用 OpenClaw，只知道装完跑 `openclaw gateway start`，但不知道 Gateway 到底在干啥。

简单说，Gateway 是一个**常驻后台的消息路由服务**。

它的职责有三层：

![](https://cdn.paicoding.com/paicoding/fb951ffd139e684e77d8c8e1211983c3.png)

**第一层：接收消息**

你在飞书群里@机器人，飞书会把消息推送到 Gateway。Gateway 收到后，解析消息内容，识别是哪个 Agent、哪个会话。

**第二层：分发任务**

Gateway 把消息路由给对应的 Agent 处理。如果你配置了多个 Agent（比如一个负责代码审核，一个负责会员审批），Gateway 会根据消息来源判断该交给谁。

**第三层：返回结果**

Agent 处理完任务后，把结果交给 Gateway，Gateway 再通过 IM 通道发回飞书。

```
飞书消息 → Gateway → Agent → 大模型 → Agent → Gateway → 飞书回复
```

老王听完眼睛一亮：“小伙子有水平啊。为什么要这样分层？Gateway 和 Agent 为什么不耦合在一起？”

我说：“解耦。Gateway 负责 IM 通信，Agent 负责任务执行。这样你可以一个 Gateway 挂多个 Agent，每个 Agent 用不同的模型、跑不同的任务，互不干扰。”

老王点点头：“那如果 Gateway 挂了怎么办？有没有高可用方案？”

我说：“王哥，你这问题越来越深了。目前 OpenClaw 官方没有提供高可用方案，Gateway 是单点的。如果要上生产，我的建议是：”

- Gateway 集群部署，用负载均衡器分发请求
- 会话状态下沉到 Redis，Gateway 无状态
- 多实例之间用分布式锁协调任务执行

老王若有所思：“那插件呢？OpenClaw 的插件机制是怎么跑的？”

### 2-3 插件体系了解吗？

我说：“OpenClaw 采用的是微内核架构。”

核心只提供最基础的能力——消息收发、任务调度、工具调用。其他功能全部通过插件扩展。

- 飞书支持？插件。
- 企微支持？插件。
- 文档处理？插件。

插件安装在 `~/.openclaw/plugins/` 目录下，每个插件是一个独立的 npm 包。

```bash
# 安装飞书插件
openclaw plugins install @openclaw/feishu-plugin

# 安装企微插件
openclaw plugins install @wecom/wecom-openclaw-plugin

# 查看已安装插件
openclaw plugins list
```

![](https://cdn.paicoding.com/paicoding/9beb0e555a8c59e9dd938556c6789f56.jpg)

老王追问：“插件加载的时机是什么？Gateway 启动的时候？如果两个插件对同一条消息都想处理，怎么解决冲突？”

我说：“对，Gateway 启动时会扫描 plugins 目录，按 openclaw.json 里的顺序加载所有插件。每个插件会注册自己的消息处理器和工具函数。”

“冲突解决靠优先级机制——openclaw.json 里可以设置插件优先级，优先级高的先处理。另外每个插件有自己的命名空间，互不干扰。”

老王满意地点点头：“架构这块讲清楚了。那我再问你——Gateway 的生命周期管理是怎样的？启动、停止、重启流程是什么？中间有什么坑？”

### 2-4 Gateway 的生命周期了解吗？

我说：“王哥，这个问题很实用，很多人踩过坑。”

**启动 Gateway**

```bash
openclaw gateway start
```

启动时会做几件事：

1. 加载 `openclaw.json` 配置 
2. 扫描并加载插件 
3. 初始化 IM 通道（连接飞书、企微等） 
4. 启动 HTTP 服务监听端口 
5. 写入 pid 文件

**检查 Gateway 状态**

```bash
openclaw gateway status
```

会显示：

- 运行状态（running / stopped）
- 进程 ID
- 监听端口
- 已加载的插件数量

**停止 Gateway**

```bash
openclaw gateway stop
```

如果 Gateway 卡住，可以强制停止：

```bash
openclaw gateway stop --force
```

或者直接杀进程：

```bash
kill $(cat ~/.openclaw/gateway/pid)
```

**重启 Gateway**

修改配置后需要重启：

```bash
openclaw gateway restart
```

### 2-5 启动时报错怎么排查？

老王追问：“启动的时候常见的报错有哪些？怎么排查？”

我说：“最常见的有三个问题。”

**问题一：端口被占用**

```bash
Error: Port 18789 is already in use
```

解决方法：

```bash
# 查看谁占用了端口
lsof -i:18789

# 杀掉占用进程
kill -9 <PID>
```

**问题二：插件加载失败**

```bash
Error: Failed to load plugin @openclaw/feishu-plugin
```

解决方法：

```bash
# 重新安装插件
openclaw plugins uninstall @openclaw/feishu-plugin
openclaw plugins install @openclaw/feishu-plugin
```

**问题三：配置文件损坏**

```bash
Error: Invalid JSON in openclaw.json
```

解决方法：检查 JSON 格式，或者直接删掉重新配置。

老王点点头：“那消息流转呢？当你在飞书群里@机器人时，消息是怎么流转到 Agent 并返回结果的？整个链路涉及哪些组件？”

### 2-6 消息是怎么从飞书到龙虾再返回呢？

我说：“王哥，是这样的。”

![](https://cdn.paicoding.com/paicoding/84bf6b684cf0aef5a6df17e0086adc07.png)

**第一步：事件订阅**

飞书把消息推给 Gateway。这需要在飞书开放平台配置事件订阅，开启 `im.message.receive_v1` 事件。

**第二步：消息解析**

Gateway 收到消息后，解析消息内容，识别来源（哪个群、哪个用户）和意图（要干什么）。

**第三步：路由分发**

根据 bindings 配置，把消息发给对应的 Agent。如果你配置了多个 Agent，Gateway 会根据消息来源判断该交给谁。

**第四步：执行任务**

Agent 调用大模型处理任务。如果是复杂任务，Agent 会拆解成多个步骤，一步步执行。

**第五步：结果返回**

Gateway 把结果通过 IM 通道返回给飞书。

### 2-7 龙虾有记忆吗？

老王追问：“那状态是怎么维护的？多轮对话的上下文存在哪里？”

我说：“会话上下文存在 `~/.openclaw/workspaces/<agent>/memory/` 目录下。每次对话会序列化保存，Gateway 重启后可以恢复。多轮对话用 session_id 标识，防止串台。”

### 2-8 并发处理能力如何？

老王接着问：“如果同时有 100 个用户@机器人，Gateway 怎么处理并发？”

我说：“Gateway 用异步非阻塞 IO 处理请求。每个消息生成唯一 request_id，防止混淆。Agent 执行队列化，避免资源竞争。”

老王点点头：“那 Agent 响应很慢怎么办？有没有优化方案？”

我说：“有几种优化思路：”

- 换更快的模型（比如 GPT-5.4）
- 简化 BOOT.md 里的指令
- 用流式输出，边生成边返回
- 复杂任务后台异步执行，先返回 ACK

老王听完感慨：“你这理解得够深的。那我再问你一个实际应用的问题，你用 OpenClaw 干过什么真实的业务场景？别给我整那些 demo。”

memo：更新与3月26日，顺带给大家分享一下[二哥编程星球](https://javabetter.cn/zhishixingqiu/)的喜报，腾讯暑期实习拿下，恭喜这位球友。


![鹅厂暑期实习拿下](https://cdn.paicoding.com/paicoding/b591712862a1d4eba7b2fe483398d280.png)

## 03、你用OpenClaw都干过什么？

我说：“王哥，这个问题问到我心坎里了。”

讲一个真实的场景——技术派（paicoding.com）的 gitcode 账号审核。

技术派加入的会员需要开通 gitcode 代码仓库的访问权限。以前这个流程是这样的：

1. 会员申请加入 
2. 我收到通知 
3. 手动打开 gitcode 后台 
4. 搜索用户昵称 
5. 添加到对应的项目组 
6. 发消息通知会员审核通过

一个账号还好，如果一次来 20 个呢？光这个流程就要折腾半小时。

现在呢？我把这个任务交给了 OpenClaw。

**第一步：创建一个专属 Agent**

```bash
openclaw agents add PaiGit --workspace ~/openclaw-workspaces/paigit
```

**第二步：配置 BOOT.md 告诉 Agent 它的职责**

```markdown
# PaiGit 职责

你是技术派的 gitcode 账号审核助手。

当收到飞书消息包含用户昵称时：

1. 登录 gitcode 后台
2. 搜索用户
3. 添加到技术派-会员组
4. 回复审核结果
```

**第三步：绑定飞书通道**

在飞书群里，我直接发消息：

> 帮我审核以下用户：张三、李四、王五 

OpenClaw 收到消息后，自动执行整个审核流程。20 个账号，1 分钟搞定。

![](https://cdn.paicoding.com/paicoding/546761700b65d9c224a0fac06c849ed1.png)

老王听完眼睛都直了：“这效率提升有点狠啊。”

我说：“还不止。我还给它设了定时任务，每天早上 9 点自动检查有没有新的待审核申请，有的话直接处理，处理完推送到飞书群。”

老王来了兴趣：“还有没有别的场景？”

### 3-1 飞书群消息同步搞过吗？

我又给他讲了一个——飞书群消息同步。

技术派有好几个飞书群：开发群、运营群、会员群。有时候一个群里发的消息需要同步到其他群，比如新功能上线通知。

以前的做法是：手动复制粘贴，或者用飞书的转发功能。但转发格式不好看，而且容易漏。

现在我用 OpenClaw 搞定了这个流程。

#### 配置 Webhook

每个飞书群都有一个 Webhook 地址，可以在群设置里找到。

把这些 Webhook 地址告诉 OpenClaw：

> 记住以下群的 Webhook 地址：
>
> - 开发群：https://open.feishu.cn/open-apis/bot/v2/hook/xxx
> - 运营群：https://open.feishu.cn/open-apis/bot/v2/hook/yyy
> - 会员群：https://open.feishu.cn/open-apis/bot/v2/hook/zzz

#### 发送同步指令

> 在开发群、运营群、会员群同时发送：派聪明 v2.0 今天上线了，新增了 AI 面试助手功能，大家快去体验！

![](https://cdn.paicoding.com/paicoding/5895cb073400a3539381ac2c34a6773d.jpg)

OpenClaw 会自动调用 Webhook，把消息发到三个群。

老王点点头：“这个场景实用，省得一个个群转发。”

### 3-2 定时任务推送搞过吗？

“定时任务呢？你刚才说的每天早上 9 点给你推送最新的 hacknews 消息，是怎么实现的？”

OpenClaw 支持用自然语言创建定时任务。

直接告诉它：

> 每天早上 9 点，检查有 hacknews 有没有好玩的AI讯息，整理一下发送给我。

![](https://cdn.paicoding.com/paicoding/690d19632d84103a128a392c5f7b9637.png)

OpenClaw 会创建一个定时任务，到点自动执行。

定时任务的底层实现是 cron。OpenClaw 会把自然语言转成 cron 表达式，然后在后台调度执行。

老王追问：“定时任务如果执行失败了怎么办？有没有重试机制？”

我说：“目前 OpenClaw 没有内置重试机制，但可以通过 BOOT.md 里加错误处理逻辑来实现。比如告诉 Agent：'如果任务执行失败，等待 5 分钟后重试，最多重试 3 次'。”

“另外，定时任务执行结果会记录到日志里，可以在 `~/.openclaw/gateway/logs/` 目录下查看。”

老王听完感慨：“这三个场景都挺实用的，不是那种为了用工具而用工具。”

memo：更新与3月26日，顺带给大家分享一下[二哥编程星球](https://javabetter.cn/zhishixingqiu/)的喜报，京东云和华为春招拿下，恭喜这位球友。

![春招，京东云和华为](https://cdn.paicoding.com/paicoding/88b8af1efbdd66d6b1fa199dbd5d1371.png)

## 04、使用龙虾过程中遇到过哪些问题？

老王话锋一转：“那我再问你一个方向——OpenClaw 需要调用大模型 API，在实际使用中，你遇到过哪些问题？比如 token 限制、响应延迟、费用控制。你是怎么解决的？”

我说：“王哥，这个问题太实际了，我踩过不少坑。”

### 04-1 token 如何优化？

OpenClaw 烧 token 是真的快。一个稍微复杂的任务，Agent 在后台可能调用十几轮甚至几十轮大模型。

我的优化方法：

- **prompt 压缩**：去除冗余信息，只传必要上下文
- **上下文裁剪**：只保留最近 N 轮对话
- **结果缓存**：相同问题直接返回缓存结果

### 04-2 响应慢怎么办？

大模型响应慢是通病。我的方案：

- **流式输出**：边生成边返回，减少用户等待
- **异步处理**：复杂任务后台执行，先返回 ACK
- **模型选择**：简单任务用 Lite 模型，复杂任务用 Pro 模型

### 04-3 费用控制怎么做？

这个最头疼。我的做法：

- **配额管理**：每天/每月设置 token 上限
- **成本追踪**：记录每个任务的 token 消耗
- **自动降级**：额度用完时切换到便宜模型

老王追问：“如果大模型 API 挂了怎么办？有没有降级方案？”

我说：“有。大模型挂了，切换到本地模型（比如 Qwen）。网络不通，用缓存兜底。超时处理，返回友好提示而非报错。”

### 04-4 如果让你把 OpenClaw 部署到生产环境，你会考虑哪些问题？

老王最后问了一个很实际的问题：“如果让你把 OpenClaw 部署到生产环境，你会考虑哪些问题？”

我说：“王哥，这个问题我能讲半小时。我挑重点说。”

**高可用**

- Gateway 集群部署，用负载均衡器分发请求
- 会话状态下沉到 Redis，Gateway 无状态
- 多实例之间用分布式锁协调任务执行

**监控**

- Gateway 层：监听端口、连接数、QPS
- Agent 层：任务执行成功率、平均响应时间
- 模型层：token 消耗、费用统计、模型调用成功率

**日志**

- 按模块分割日志（gateway.log、agent.log、plugin.log）
- 关键操作记录审计日志
- 日志轮转和归档（保留 30 天）

**安全**

- API Key 加密存储，支持动态轮换
- 插件白名单机制，只允许官方插件
- 网络隔离，Gateway 只对外暴露必要端口

老王点点头：“最后一个问题——你在用 OpenClaw 的过程中踩过什么坑？怎么排查的？”

### 04-5 使用过程中踩过哪些坑？

我说：“我挑几个最典型的说。”

#### Gateway 启动后收不到消息怎么办？

老王问：“这个怎么排查？”

我说：“分三步走。”

**第一步：检查日志**

```bash
cat ~/.openclaw/gateway/logs/error.log
```

看有没有报错信息。常见错误有：飞书 App ID 填错、权限没开通、事件订阅没配置。

**第二步：检查通道状态**

```bash
openclaw channels status
```

看飞书/企微通道是不是正常连接。

**第三步：检查飞书配置**

去飞书开放平台，确认：

- 事件订阅已开启
- `im.message.receive_v1` 事件已添加
- 长链接模式已启用

![](https://cdn.paicoding.com/paicoding/9087d3c5b7edeb229f72ef37bf0f1835.png)

#### 模型调用失败怎么办？

老王问：“这个呢？”

我说：“模型调用失败一般是三个原因：”

**原因一：API Key 无效或过期**

去大模型平台检查 API Key 状态，必要时重新生成。

**原因二：额度用尽**

如果是 Coding Plan 套餐，检查本月额度是否用完。用完了要么等下个月，要么升级套餐。

**原因三：网络问题**

```bash
# 测试网络连通性
curl -I https://open.bigmodel.cn
```

如果连不上，检查代理配置或防火墙设置。

#### Agent 响应很慢怎么办？

老王问：“响应慢怎么优化？”

我说：“分情况处理。”

**如果是模型推理慢**：

- 换更快的模型（Doubao-Seed-2.0-Lite 比 Pro 快 30%）
- 简化 prompt，减少 token 数量
- 开启流式输出，边生成边返回

**如果是任务执行慢**：

- 拆分大任务，分批执行
- 用缓存减少重复计算
- 后台异步执行，先返回 ACK

**如果是网络延迟**：

- 用离你最近的模型服务节点
- 检查网络链路，优化代理配置

#### 多 Agent 消息串台怎么办？

老王问：“这个我遇到过，怎么解决？”

我说：“多 Agent 串台是因为 bindings 配置不清晰。”

在 `openclaw.json` 里用 `bindings` 字段明确指定每个 Agent 对应的通道：

```json
{
  "bindings": [
    {
      "agentId": "PaiGit",
      "match": {
        "channel": "feishu",
        "appId": "cli_xxx"
      }
    },
    {
      "agentId": "PaiReview",
      "match": {
        "channel": "feishu",
        "appId": "cli_yyy"
      }
    }
  ]
}
```

这样 Gateway 收到消息时，会根据 App ID 精准路由到对应 Agent，不会串台。

老王听完感慨：“你这排查思路挺清晰的，不是那种遇到问题就懵的人。”

### 04-6 飞书多应用接入了解吗？

老王没让我铺垫太久，直接追问：“为什么要一个飞书应用跑一个 Agent？”

我说：“因为隔离。企业场景里最怕的不是配不起来，而是权限、路由、审计和故障域全搅在一起。一个 Agent 对应一个飞书应用，边界才清楚。”

![](https://cdn.paicoding.com/paicoding/c3bef1463da303e0f021e8ee7d821940.png)

#### 多应用配置的核心逻辑了解吗？

OpenClaw 的飞书插件支持多应用配置，核心在于`defaultAccount`字段。当你在`openclaw.json`里配置了多个飞书应用时，必须指定一个默认应用：

```json
{
  "channels": {
    "feishu": {
      "defaultAccount": "app1",
      "accounts": [
        {
          "appId": "cli_xxx1",
          "appSecret": "xxx",
          "encryptKey": "xxx",
          "verificationToken": "xxx"
        },
        {
          "appId": "cli_xxx2",
          "appSecret": "xxx",
          "encryptKey": "xxx",
          "verificationToken": "xxx"
        }
      ]
    }
  }
}
```

老王打断我：“等会儿，这个`defaultAccount`到底起什么作用？”

我说：“当 Gateway 收到一条消息时，如果无法通过 bindings 规则匹配到特定 Agent，就会用 defaultAccount 指定的应用来响应。它是兜底策略。”

#### 配对策略了解吗？

老王继续追问：“配对我知道。我想听的不是名词解释，而是它在企业场景里到底解决什么问题？”

我说：“配对是 OpenClaw 的一个安全机制。默认情况下，机器人不会响应任何消息，除非你主动完成配对。”

![](https://cdn.paicoding.com/paicoding/e6dca2ce304fc69a6901a16912432ffd.png)

配对的方式有两种：

**第一种，私聊配对**。你在飞书里搜机器人，发一条私聊消息，机器人会回复一个配对码。把这个配对码告诉OpenClaw，你们就建立了一对一关系。

```
openclaw pairing approve feishu xxx
```

**第二种，群组配对**。把机器人拉到群里，@它发送配对指令。机器人会识别群 ID，把这个群加入白名单。

老王问：“为什么要这么麻烦？直接让机器人响应所有消息不行吗？”

我说：“安全第一。你想想，如果机器人对所有人开放，万一有人恶意刷接口，你的 token 分分钟被烧光。配对机制相当于加了一层访问控制。”

#### 如果让你在生产环境里部署龙虾你会怎么考虑多Agent？

如果让我做企业级部署，我会这样规划：

- **开发环境**：一个飞书应用，绑定测试群组
- **生产环境**：一个飞书应用，绑定正式群组
- **专用 Agent：**每个业务场景单独一个应用，比如代码审核 Agent、运维 Agent、客服 Agent

老王点点头：“这样确实清晰。那如果两个应用都加了同一个群，消息会发给谁？”

我说：“这就涉及到路由优先级了。OpenClaw 采用'最具体优先'原则——如果 bindings 里明确指定了群 ID 绑定到某个 Agent，就按 bindings 走；如果没指定，就用 defaultAccount 兜底。但两个应用同时响应同一个群，这种情况要尽量避免，容易乱。”

memo：更新与3月26日，顺带给大家分享一下[二哥编程星球](https://javabetter.cn/zhishixingqiu/)的喜报，华为和阿里云春招拿下，恭喜这位球友。


![华为和阿里云拿下](https://cdn.paicoding.com/paicoding/81b2e64d34c0b689e4881cc3a8950b54.png)

## 05、多 Agent 路由机制了解吗？

老王放下茶杯：“刚才你说到 bindings，这个多 Agent 路由到底是怎么工作的？”

我说：“这里最核心的不是名词，而是组合关系。真正决定多 Agent 路由的，就是 dmPolicy 和 bindings 这两个点。”

### 05-1 dmPolicy 了解吗？

dmPolicy 全称 Direct Message Policy，控制机器人如何处理私信。有三种策略可选：

```json
{
  "dmPolicy": {
    "app1": "allow",      // 允许所有私信
    "app2": "deny",       // 拒绝所有私信
    "app3": "pairing"     // 只允许配对过的用户私信
  }
}
```

老王问：“实际场景中怎么选？”

我说：“看场景。如果是内部工具，用`allow`最方便；如果是面向外部用户的客服机器人，必须用`pairing`，防止被滥用；`deny`一般用于纯群组场景的 Agent。”

### 05-2 bindings 精准路由规则了解吗？

bindings 是 OpenClaw 多 Agent 路由的核心机制。它定义了消息应该如何分配给不同的 Agent。

```json
{
  "bindings": [
    {
      "agentId": "CodeReview",
      "match": {
        "channel": "feishu",
        "accountId": "cli_xxx1",
        "peer": {
          "type": "group",
          "id": "oc_xxx"
        }
      }
    },
    {
      "agentId": "DevOps",
      "match": {
        "channel": "feishu",
        "accountId": "cli_xxx2"
      }
    }
  ]
}
```

老王指着配置问：“字段名我认识。你直接说，这几个字段是怎么参与路由匹配和优先级判断的？”

我说：“`channel`是消息来源，比如 feishu、wecom；`accountId`是飞书应用的 App ID；`peer`是发送者信息，`type`可以是 user 或 group，`id`是对应的 ID。”

“王哥，注意这个路由规则的优先级——bindings 采用最具体优先原则。如果一条消息同时匹配了两个 bindings，哪个 match 条件更具体，就用哪个。”

举个例子：

- Binding A：只指定了 channel=feishu
- Binding B：指定了 channel=feishu + accountId=cli_xxx
- Binding C：指定了 channel=feishu + accountId=cli_xxx + peer.id=oc_xxx

如果消息来自 feishu 的 cli_xxx 应用的 oc_xxx 群，会优先匹配 Binding C，因为它最具体。

![](https://cdn.paicoding.com/paicoding/336dba101cb2aa7194408797c767f8b5.jpg)

### 05-3 groupPolicy：群组策略了解吗？

除了 dmPolicy，还有 groupPolicy 控制群组行为：

```json
{
  "groupPolicy": {
    "requireMention": true,    // 群组中是否需要@机器人
    "allowAnonymous": false    // 是否允许匿名消息
  }
}
```

老王问：“requireMention 这个我遇到过。有时候群里@机器人它不理我，就是这个配置的问题？”

我说：“对。默认情况下，机器人在群里只响应被@的消息。如果你希望它监听所有消息，把`requireMention`设为 false。但要注意，这样会增加 token 消耗，也可能带来隐私问题。”

memo：更新与3月26日，顺带给大家分享一下[二哥编程星球](https://javabetter.cn/zhishixingqiu/)的喜报，又一位鹅厂暑期实习拿下，恭喜这位球友。


![又一位鹅厂暑期实习拿下](https://cdn.paicoding.com/paicoding/6790cd813058aa4c4c1f0414aa90dc7e.png)

## 06、Gateway 网关架构说说吧？

老王把茶杯往桌上一放：“配置层面先放一边。Gateway 才是核心，你从底层给我拆。”

我说：“Gateway 是 OpenClaw 的'神经中枢'，负责三件事：”

![](https://cdn.paicoding.com/paicoding/fb951ffd139e684e77d8c8e1211983c3.png)

整个链路是这样的：

```
飞书消息 → Gateway → Agent → 大模型 → Agent → Gateway → 飞书回复
```

### 06-1 Gateway 和飞书之间到底怎么通信？

老王继续追问：“Gateway 和飞书之间到底怎么通信？别只说长连接，把关键链路讲清楚。”

我说：“WebSocket 长连接。飞书开放平台提供了事件订阅机制，Gateway 启动时会向飞书注册一个 WebSocket 连接。之后飞书有消息就会主动推过来。”

认证方式用的是 Token 机制。在`openclaw.json`里配置的`verificationToken`和`encryptKey`，就是用来验证消息来源和解密消息内容的。

```json
{
  "gateway": {
    "port": 18789,
    "auth": "token",
    "host": "0.0.0.0"
  }
}
```

老王问：“这个 auth 字段除了 token 还能填什么？”

我说：“目前主要是 token 认证。如果是企业内网部署，还可以配合 IP 白名单、TLS 证书等方式加强安全。”

### 06-2 高可用架构设计了解吗？

老王继续压问：“如果真上生产，Gateway 单点怎么处理？你别跟我说‘官方以后会支持’。”

我说：“OpenClaw 官方目前没有提供原生高可用方案，Gateway 是单点的。但我们可以通过架构设计来实现高可用：”

**方案一：Gateway 集群+负载均衡**

部署多个 Gateway 实例，前面挂一个负载均衡器（如 Nginx）。飞书的 WebSocket 连接可以分发到不同实例。

```
飞书 → 负载均衡器 → Gateway集群（多实例）
```

**方案二：会话状态下沉**

把会话状态从本地磁盘迁移到 Redis，这样 Gateway 实例就变成无状态的了。任何一个实例挂掉，其他实例可以接管会话。

```json
{
  "memory": {
    "storage": "redis",
    "redis": {
      "host": "localhost",
      "port": 6379,
      "db": 0
    }
  }
}
```

**方案三：任务队列化**

对于耗时任务，用消息队列（如 RabbitMQ）做缓冲，避免 Gateway 被阻塞。

老王点点头：“这些方案实施起来复杂吗？”

我说：“看团队能力。如果是小团队，建议先用单实例+监控告警；业务量大起来后，再考虑集群方案。不要过早优化。”

### 06-3 会话管理与压缩机制了解吗？

老王没放过这个细节：“多轮对话的上下文到底落在哪里？Gateway 重启以后为什么还能接上？”

我说：“会话数据默认存在`~/.openclaw/workspaces/<agent>/memory/`目录下。每次对话会序列化保存，用 session_id 标识。Gateway 重启后可以恢复会话状态。”

但这里有个坑——会话数据会越积越多，尤其是长对话场景。OpenClaw 提供了压缩机制：

```json
{
  "memory": {
    "compression": true,
    "maxHistory": 20,      // 保留最近20轮对话
    "summarizeThreshold": 10   // 超过10轮后自动摘要
  }
}
```

老王问：“自动摘要是什么意思？”

我说：“当对话轮数超过 threshold 时，Agent 会把前面的内容压缩成一段摘要，只保留关键信息。这样可以控制 token 消耗，也能避免上下文窗口溢出。”

### 06-4 上下文窗口爆了，怎么办？

老王继续追问：“别只讲压缩配置。上下文窗口真要爆了，线上你怎么兜？”

![](https://cdn.paicoding.com/paicoding/eb31753f8d03d24db20ce6ceacfc1e64.png)

**经验一：分层记忆设计**

把记忆分成三层：

- **短期记忆**：最近 5 轮对话，完整保留
- **中期记忆**：6-20 轮对话，压缩存储
- **长期记忆**：超过 20 轮，只保留关键摘要

```json
{
  "memory": {
    "layers": [
      {"type": "short", "rounds": 5, "compression": "none"},
      {"type": "medium", "rounds": 15, "compression": "light"},
      {"type": "long", "compression": "heavy"}
    ]
  }
}
```

**经验二：关键信息提取**

在 BOOT.md 里告诉 Agent，哪些信息必须记住，哪些可以丢弃：

```markdown
## 记忆策略

必须记住的信息：

- 用户身份和偏好
- 当前任务的上下文
- 关键的业务参数

可以丢弃的信息：

- 礼貌用语
- 重复确认的内容
- 临时性的中间结果
```

**经验三：定期清理机制**

设置定时任务，自动清理过期的会话数据：

```bash
openclaw memory cleanup --before 7d

# 清理特定Agent的会话
openclaw memory cleanup --agent CodeReview --before 3d
```

老王听完感慨：“这些细节官方文档可不会写，都是踩坑踩出来的。”

### 06-5 Gateway 的生命周期了解吗？

老王继续压问：“别只讲命令。Gateway 的启动、停止、重启，底层生命周期你给我拆开说。”

![](https://cdn.paicoding.com/paicoding/5b91564581394d3cd9d8f52e66f58469.png)

老王问：“如果 Gateway 崩溃了，会话会丢吗？”

我说：“看配置。如果开启了持久化，会话数据会定期写入磁盘，崩溃后可以恢复。但正在处理中的任务可能会中断。”

1. 停止接收新连接 
2. 等待现有连接处理完成（默认 30 秒超时） 
3. 保存会话状态 
4. 清理资源后退出

```bash
# 优雅关闭
kill -TERM <pid>

# 强制关闭（不推荐）
kill -9 <pid>
```

老王问：“如果 30 秒内任务还没完成怎么办？”

我说：“超时后会强制退出，未完成的任务会丢失。所以复杂任务最好设计成可重入的，支持断点续传。”

memo：更新与3月26日，顺带给大家分享一下[二哥编程星球](https://javabetter.cn/zhishixingqiu/)的喜报，京东和字节暑期实习拿下，恭喜这位球友。


![京东和字节](https://cdn.paicoding.com/paicoding/ba765ebba26fe79a96a457a98db8aed4.png)

## 07、OpenClaw 的核心组件是什么？

老王推了推眼镜，继续问：“说说 OpenClaw 的核心组件吧。”

我回答。

![](https://cdn.paicoding.com/paicoding/be6bf5be7e6b6009fcd8123aaea7cce7.png)

**LLM：**这是 Agent 的大脑，负责理解指令、规划任务、生成回复。OpenClaw 支持多种模型，Claude、GPT、GLM 都可以接。

**任务规划**：把用户的自然语言需求，拆解成可执行的任务步骤。比如“帮我查天气”，会拆解成：调用天气 API → 解析返回数据 → 生成回复。

**工具执行器**：负责调用外部工具，比如搜索、文件操作、数据库查询等。每个工具都有明确的输入输出定义。

**记忆管理器**：管理 Agent 的短期记忆（Session）和长期记忆（Memory）。这是 Agent 能持续对话的关键。

**技能加载器**：动态加载 Skills，扩展 Agent 的能力。Skills 本质上是封装好的 Prompt 和工具组合。

老王点点头：“这些组件之间怎么通信？”

### 07-1 组件之间如何通信？

我说：“OpenClaw 采用了基于消息总线的轻量级通信机制。”

“每个组件都是独立的，通过消息总线交换数据。这种设计的优点是：”

- **解耦**：组件之间不直接依赖，方便替换和扩展
- **异步**：消息可以异步处理，不会阻塞主流程
- **可观测**：所有消息都经过总线，便于调试和监控

面试官追问：“消息总线具体是怎么实现的？”

#### 消息总线具体怎么实现？

我说：“消息总线本质上是一个事件队列。”

“当组件 A 需要调用组件 B 时，不是直接调用，而是发送一个消息到总线。消息包含：”

- **目标组件 ID：**消息要发给谁
- **消息类型**：是什么类型的消息（请求、响应、事件）
- **消息内容**：具体的数据
- **回调地址**：响应应该发给谁

“组件 B 从总线中读取消息，处理完成后，发送响应消息到总线。组件 A 从总线中读取响应，继续执行。”

![](https://cdn.paicoding.com/paicoding/b83e6b05d4e087fc00af123d6e60c488.png)

“这种设计的好处是：”

**第一，组件之间完全解耦**。组件 A 不需要知道组件 B 的存在，只需要知道消息格式。你可以随时替换组件 B，只要消息格式不变，组件 A 就感知不到变化。

**第二，支持异步处理**。组件 A 发送消息后，不需要等待响应，可以继续做其他事情。等响应到达时，再处理。

**第三，便于扩展**。新增一个组件 C，只需要让它监听总线上的消息，不需要修改其他组件。

老王追问：“那 Agent 本身是怎么运行的？是常驻进程吗？”

### 07-2 Agent 是常驻进程吗？

我说：“不是，Agent 是 per-session 的瞬态实例。”

老王挑了挑眉：“什么意思？”

我解释：“每个对话都是一次完整的加载-执行-销毁循环。”

“当用户发起一个对话时：”

1. **加载阶段**：读取 AGENTS.md、SOUL.md 等配置文件，初始化 Agent 的人格和能力
2. **执行阶段**：接收用户输入，调用 LLM 生成回复，执行工具，返回结果
3. **销毁阶段**：对话结束，保存 Session 到磁盘，释放资源

![](https://cdn.paicoding.com/paicoding/857416893bedd52c581efac20fb41589.png)

“这种设计有两个好处：”

**第一，资源节省**。Agent 不用一直占用内存，只有对话时才加载。

**第二，配置实时生效**。每次 run 都会重新读取 workspace 文件，改配置不用重启服务。

老王问：“那 Session 是怎么管理的？”

### 07-3 Session 是怎么实现按需加载的？

我说：“Session 的加载是懒加载机制。”

“当消息到达，路由到 SessionKey 之后，OpenClaw 会查找 sessions.json 获取当前 SessionId，然后把 SessionId 对应的.jsonl 文件加载到 Agent 中。”

老王问：“Session 太长，会不会挤爆 LLM 的 Context？”

### 07-4 Session 优化机制了解吗？

我说：“OpenClaw 在 Session 加载到 LLM 感知阶段，会做两件事：”

#### A. 压缩持久化

当 Session 接近 context 上限时，OpenClaw 会自动提示 Agent 写入 Memory，然后压缩 Session。压缩后的内容会保存到磁盘，不会丢失。

![](https://cdn.paicoding.com/paicoding/6d675500f189cabcee49c3041a9b5006.png)

具体来说，Compaction 会：

1. 分析 Session 中的所有消息
2. 识别重要信息（用户明确陈述的事实、对话结论等）
3. 把这些信息写入 Memory
4. 把原始消息压缩成摘要，减少 token 占用

#### B. 修剪

在发送给 LLM 之前，临时裁剪旧的 tool 结果。比如一个搜索工具返回了 100 条结果，但 LLM 只需要前 10 条，后面的就会被裁剪掉。

修剪的策略包括：

- 只保留最近的 N 条消息
- 只保留工具调用的结果摘要，不保留完整输出
- 合并相似的消息

老王问：“Compaction 和 Pruning 有什么区别？”

我说：“Compaction 是持久化的，会把重要信息写入 Memory，长期保存。Pruning 是临时的，只是临时裁剪发送给 LLM 的内容，不会修改 Session 文件。”

“打个比方：Compaction 是把重要笔记抄到笔记本上，永久保存。Pruning 是临时把草稿纸上的无关内容划掉，方便阅读。”

老王问：“Agent 是怎么决策使用 Memory 的？”

### 07-5 Memory 机制了解吗？

我说：“Memory 是 OpenClaw 最核心的机制之一，它让 Agent 有了‘记忆’的能力。”

**短期记忆（Session）**：当前对话的上下文，存储在内存中。包括用户输入、Agent 回复、工具调用结果等。

**长期记忆（Memory）**：跨对话的持久化记忆，存储在磁盘上。包括用户偏好、历史事实、重要结论等。

![](https://cdn.paicoding.com/paicoding/fb835f66f1c7b1981f3952f1278110ae.png)

老王问：“这两种记忆是怎么协作的？”

#### 两种记忆是怎么协作？

我说：“Memory 的工作分为三个阶段：”

![](https://cdn.paicoding.com/paicoding/9534c06cf9b9311184268353cf9c7c7f.png)

**阶段一：写入 Memory**

当 Session 接近 context 上限时，OpenClaw 会触发 Compaction 机制。Agent 会分析当前 Session 的内容，提取重要信息，写入 Memory。

写入的内容包括：

- 用户明确陈述的事实（“我喜欢王二”）
- 对话中的重要结论（“项目采用微服务架构”）
- Agent 生成的有价值信息（“搜索结果显示...”）

**阶段二：存储 Memory**

写入的 Memory 会存储在 memory.sqlite 文件中.

![](https://cdn.paicoding.com/paicoding/5165fa4d23a6b320379a6ad86bf9d145.png)

每条 Memory 包含：content：记忆内容、timestamp：写入时间、importance：重要程度（1-10）、tags：标签，用于检索。

**阶段三：读取 Memory**

当新的对话开始时，OpenClaw 会根据当前对话内容，检索相关的 Memory，加载到 Agent 的上下文中。

检索策略包括：

- 关键词匹配：根据用户输入的关键词检索
- 语义相似度：使用向量检索，找到语义相关的 Memory
- 时间衰减：越新的 Memory 优先级越高

老王问：“怎么避免 Memory 爆炸？”

### 07-6 Memory 优化策略了解吗？

我说：“Memory 管理不好，确实会导致检索效率下降。OpenClaw 有几个优化策略：”

**1. 重要性评分**。写入 Memory 时，Agent 会给每条 Memory 打分。只有重要程度超过阈值的 Memory 才会被保留。

**2. 定期清理**。OpenClaw 会定期清理过期的 Memory。默认保留 30 天，可以通过配置调整。

**3. 合并相似 Memory。**如果多条 Memory 内容相似，OpenClaw 会自动合并，避免重复。

**4. 分层存储**。高频访问的 Memory 放在内存，低频访问的 Memory 放在磁盘，平衡性能和容量。

老王问：“Agent 使用 Memory 有两种方式，你说说看？”

### 07-7 说说sessions_send 和 sessions_spawn 的区别？

我说：“Agent 使用 Memory 有两种方式：sessions_send 和 sessions_spawn。”

**sessions_send：**发送消息给另一个 Agent，等待回复。类似于函数调用，同步阻塞。

**sessions_spawn：**派生一个新的 Agent 实例，独立运行。类似于多线程，异步非阻塞。

老王问：“这两种方式分别适合什么场景？”

我说：

- **sessions_send**适合需要协作完成的任务。比如一个 Agent 负责搜索，另一个 Agent 负责总结，搜索 Agent 把结果 send 给总结 Agent。
- **sessions_spawn**适合需要并行处理的任务。比如同时监控多个数据源，每个数据源用一个 Agent 处理，互不干扰。

![](https://cdn.paicoding.com/paicoding/724813590781736b072cf28ed61a6ab9.png)

老王问：“sessions_send 通话的内容有过期机制吗？”

我说：“有。OpenClaw 会定期清理过期的 Session 数据，默认保留 7 天。可以通过配置调整保留时间。”

memo：更新与3月26日，顺带给大家分享一下[二哥编程星球](https://javabetter.cn/zhishixingqiu/)的喜报，同花顺暑期实习拿下，恭喜这位球友。


![同花顺暑期实习拿下](https://cdn.paicoding.com/paicoding/88fa5b3f2be301be63f635604ccfc16c.png)

## 08、说说龙虾的 8 个配置文件？

老王问：“你刚才提到 AGENTS.md、SOUL.md，这些配置文件都是干嘛的？”

我说：“每个 Agent 都有其对应的 workspace，里面有 8 个核心配置文件。”

![](https://cdn.paicoding.com/paicoding/eef70273ecdaa8bce05793a7b9dd7718.png)

“这 8 个文件构成了 Agent 的完整人格，缺一不可。”

![](https://cdn.paicoding.com/paicoding/e97f412bef7407c3ded5c29e03fd36ba.png)

**AGENTS.md：**定义 Agent 的能力边界。包括 Agent 的名称、描述、系统 Prompt、行为约束等。这是最重要的配置文件。

**SOUL.md：**注入 Agent 的灵魂。定义 Agent 的性格、语气、价值观。比如让 Agent 变得幽默、严谨、或者专业。

**TOOLS.json：**划定 Agent 的工具禁区。定义 Agent 可以使用哪些工具，每个工具的参数和返回值。

**SKILLS.json：**配置 Agent 加载的 Skills。可以精确控制加载哪些 Skills，避免 Skills 过多导致 Context 爆炸。

**MEMORY.json：**配置长期记忆的存储和检索策略。

**SESSION.json：**配置 Session 的管理策略，包括压缩阈值、保留时间等。

**ROUTER.json：**配置消息路由规则，决定消息由哪个 Agent 处理。

**CONFIG.json：**其他杂项配置，比如 LLM 模型选择、API Key 等。

我说：“AGENTS 定义能力边界，SOUL 注入灵魂，TOOLS 划定禁区，这 8 个文件构成 Agent 的完整人格。”

老王问：“AGENTS.md 具体包含什么内容？”

### 08-1 AGENTS.md 里写了什么？

我说：“AGENTS.md 这个文件，堪称 OpenClaw 最核心的 Prompt 文件。”

“它详细介绍了一个 Agent 的启动流程、Memory 管理的流程。”

![](https://cdn.paicoding.com/paicoding/edc7767aa770d9bb2b9f25ae56e00f5e.jpg)

**启动流程**：定义 Agent 启动时执行的步骤，包括加载配置、初始化 Memory、注册工具等。

![](https://cdn.paicoding.com/paicoding/60ab9810a3527271e4e221a6e66080c5.png)

**Memory 管理流程**：定义什么时候写入 Memory、什么时候读取 Memory、如何压缩 Session。

AGENTS.md 里会明确写出：

- 当 Session 长度超过多少 token 时，触发 Compaction
- 写入 Memory 时，如何评估重要性
- 读取 Memory 时，如何排序和筛选

![](https://cdn.paicoding.com/paicoding/1fa7720c1ccd4dd096edefe3348e1c9d.jpg)

**工具调用规范**：定义工具调用的格式、错误处理、超时机制。

包括：

- 工具调用的 JSON 格式
- 工具执行失败时的重试策略
- 工具执行超时的处理

![](https://cdn.paicoding.com/paicoding/2873c5870ce5adde6c5af8e26d12e93c.jpg)

**安全约束**：定义 Agent 不能做什么，比如不能删除系统文件、不能访问敏感数据。

老王问：“SOUL.md 是干嘛的？”

### 08-2 SOUL.md 是干嘛的？

我说：“如果说 AGENTS.md 定义了 Agent 的能力，那 SOUL.md 就定义了 Agent 的性格。”

![](https://cdn.paicoding.com/paicoding/52e74a3c7e2d24b6fc0e7bef999aa62e.jpg)

“SOUL.md 里可以定义：”

- **语气风格**：正式、随意、幽默、严肃
- **价值观**：用户优先、效率优先、安全优先
- **行为准则**：主动确认、谨慎操作、透明沟通

“比如你可以让 Agent 变得像一个经验丰富的老程序员，说话直接、不绕弯子。也可以让 Agent 变得像一个耐心的老师，解释详细、循序渐进。”

“这就是 SOUL.md 的价值：让同样的能力，呈现出不同的人格。”

老王问：“Skills 是怎么加载的？”

### 08-3 Skills 太多会不会有性能问题？

我说：“Skills 太多确实会给 Agent 造成 Context 负担，甚至错误的 Skills 会导致 Agent 错误调用工具。”

“所以我们要对 Agent 进行精细化的管控。”

![](https://cdn.paicoding.com/paicoding/c8576b0824321298aa97c1831df51d38.png)

我说：“比如 brave_search 这个 Skill，属于让 Agent 进行高效的联网检索，它就应该属于基础通用 Skill。”

“而像代码审查这种 Skill，只有开发场景的 Agent 才需要加载。”

老王问：“怎么避免低质 Skills 爆炸？”

我说：“三个原则：”

1. **精简原则**：只加载必要的 Skills，不要贪多。一般来说，一个 Agent 加载 5-10 个 Skills 就够了。

2. **评估原则**：用 Evals 机制测试 Skills 的质量。写一个测试用例，让 Agent 执行，看结果是否符合预期。不合格的 Skills 不用。

3. **版本原则**：Skills 版本化管理，避免冲突。比如 brave_search 有 v1 和 v2，要确保 Agent 加载的是正确的版本。

老王问：“TOOLS.json 和 SKILLS.json 有什么区别？”

![](https://cdn.paicoding.com/paicoding/82152841960496f72fa7d44e35b616ce.png)

我说：“这两个文件容易混淆，但其实职责不同。”

**TOOLS.json：**定义 Agent 可以使用的工具。工具是底层能力，比如文件读取、网络请求、数据库查询等。

**SKILLS.json：**定义 Agent 加载的 Skills。Skills 是高层封装，比如搜索、代码审查、数据分析等。一个 Skill 可能调用多个 Tool。

“打个比方：Tools 是‘手脚’，Skills 是‘技能’。”

“比如‘搜索’这个 Skill，可能调用了‘网络请求’Tool 和‘内容解析’Tool。”

老王问：“MEMORY.json 和 SESSION.json 呢？”

我说：“这两个文件配置 Memory 和 Session 的管理策略。”

![](https://cdn.paicoding.com/paicoding/940db0287e7ced00c6ac3edab02adc1b.png)

**MEMORY.json：**

- 存储路径：Memory 文件保存在哪里
- 最大容量：最多保存多少条 Memory
- 保留时间：Memory 保留多久
- 检索策略：如何根据输入检索相关 Memory

**SESSION.json：**

- 压缩阈值：Session 长度超过多少 token 时触发 Compaction
- 保留时间：Session 文件保留多久
- 修剪策略：如何裁剪旧的 tool 结果

“这两个配置直接影响 Agent 的‘记忆力’。配置得好，Agent 能记住重要信息；配置得不好，Agent 要么忘事，要么 Context 爆炸。”

老王问：“ROUTER.json 是干嘛的？”

### 08-4 ROUTER.json 是干嘛的？

我说：“ROUTER.json 配置消息路由规则，决定消息由哪个 Agent 处理。”

“在多 Agent 系统中，可能有多个 Agent 同时运行。ROUTER.json 定义了路由规则，比如：”

- 包含“代码”关键词的消息，路由给 CodeAgent
- 包含“搜索”关键词的消息，路由给 SearchAgent
- 默认路由给 GeneralAgent

“这样用户发一条消息，系统能自动找到最合适的 Agent 来处理。”

老王问：“CONFIG.json 呢？”

### 08-5 CONFIG.json 是干嘛的？

我说：“CONFIG.json 是其他杂项配置，包括：”

- LLM 模型选择：用 Claude 还是 GPT 还是 GLM
- API Key：各个模型的 API Key
- 日志级别：DEBUG、INFO、WARN、ERROR
- 超时时间：各种操作的超时设置

“这些配置比较通用，不同 Agent 的配置可能差不多。”

memo：更新与3月26日，顺带给大家分享一下[二哥编程星球](https://javabetter.cn/zhishixingqiu/)的喜报，春招中国铁塔总部直属研究院+中国工商银行北京分行拿下，恭喜这位球友。


![春招中国铁塔总部直属研究院+中国工商银行北京分行](https://cdn.paicoding.com/paicoding/169a5994064fc6a67bab1c9a6fd40db6.png)

## 09、Memory 和 Session 的区别？

“王哥，Memory 是 OpenClaw 最核心的机制之一，它让 Agent 有了‘记忆’的能力。”

![](https://cdn.paicoding.com/paicoding/fb835f66f1c7b1981f3952f1278110ae.png)

### 09-1 说说短期记忆？

短期记忆存储在`~/.openclaw/agents/{agentId}/sessions/*.jsonl`文件中，自动记录。

![](https://cdn.paicoding.com/paicoding/ce803a735c6cd65274ba1662ba8b0827.png)

每次和龙虾对话，OpenClaw 就会自动将对话内容追加到 JSONL 格式的会话日志文件中，这是最原始的、未经处理过的记忆。

### 09-2 说说长期记忆？

长期记忆存储在`~/.openclaw/workspace/MEMORY.md`和`memory/*.md`文件中，可以手动创建，但一般交给 OpenClaw 自动生成。

![](https://cdn.paicoding.com/paicoding/4a4fb296c6047edc817f093ba893f21c.png)

可以理解成是从短期的琐碎记忆中提炼出来的需要 OpenClaw 重点记住的内容，比如用户的性格、身份信息、回答偏好等。

举个例子，你告诉 Agent：“我是 Java 后端开发，回答问题时请用 Java 相关技术栈。”这句话就会被提炼成长期记忆，存储在 Markdown 文件中。下次对话时，龙虾会自动检索到这条记忆，按照你的偏好回答。

老王追问：“那长期记忆和短期记忆之间是怎么转换的？”

我说：“王哥，有研究啊。”

### 09-3 记忆是如何自动转换的？

“记忆转换有两种触发机制。”

#### 机制一：session-memory Hook

当用户执行`/new`命令重置会话时，OpenClaw 会触发 session-memory Hook，自动将上一个会话的关键内容转换为 Markdown 文件。

这个过程是自动化的，不需要手动干预。系统会分析 JSONL 文件中的对话内容，提取出关键信息，比如用户的偏好、重要的上下文、需要长期记住的事实等，然后写入`memory/YYYY-MM-DD.md`文件。

#### 机制二：Memory Flush

这是一个非常关键的自动化机制。

当 Session 接近 context 上限时，OpenClaw 会触发 Compaction 机制。Agent 会分析当前 Session 的内容，提取重要信息，写入 Memory。

![](https://cdn.paicoding.com/paicoding/9534c06cf9b9311184268353cf9c7c7f.png)

老王点点头：“那这些 Markdown 文件是怎么被检索的？总不能每次都遍历所有文件吧？”

### 09-4 Memory 的索引到底是怎么建起来的？

“王哥，真正难的不是‘记下来’，而是‘下次还能在几百份文件里把它找回来’。”


![](https://cdn.paicoding.com/paicoding/0e7db8970794e135e46b0c3af919de48.png)


OpenClaw 是这样处理 Memory 的：

- **Markdown 文件是记忆本体**，也就是 source of truth。
- **SQLite 是加速层**，负责把这些 Markdown 变成“可检索”的东西。

不了解的人会以为 SQLite 就是 Memory 本身，但其实不是。

![](https://cdn.paicoding.com/paicoding/e93a6eec84f916299721906a5d13eb41.png)

那些 markdown 文件才是 Memory 本身，其中

- `MEMORY.md`：记录的是长期记忆，偏“结论”和“偏好”
- `memory/YYYY-MM-DD.md` 属于日记式记忆，偏“当天发生了什么”

OpenClaw 不是“每次查询时去扫描一遍目录”，而是提前把 Markdown 切块、建索引、落到 SQLite 文件里。等 Agent 真要查历史时，直接查索引就行，不仅可以查关键字，还可以查语义，这样的 Agent 就很智能。

从命令行看也更直观：

```bash
openclaw memory status
```

这条命令会告诉我们现在 Memory 能不能用，正在用什么模型，索引建了多少，库文件放在哪，全文检索和向量检索是不是正常。

![](https://cdn.paicoding.com/paicoding/4a2128fcc09063ca461304fd6430728d.jpg)


我这台机器当前看到的是：

```bash
Provider: openai (requested: openai)
Model: nomic-embed-text
Store: ~/.openclaw/memory/paismart.sqlite
Indexed: 8/8 files · 14 chunks
Vector: ready
FTS: ready
```

`Provider: openai (requested: openai)` 表示memory 用的 embedding 提供方是 openai 这一套接口。

`Model: nomic-embed-text` 说明实际拿来做向量的模型，是 nomic-embed-text。

![](https://cdn.paicoding.com/paicoding/f7a0b3387f6c4b2415f90a9789be9f80.png)

`Store: ~/.openclaw/memory/paismart.sqlite` 表示 memory 索引实际存在这个 SQLite 文件里。

`Indexed: 8/8 files · 14 chunks` 意思是一共发现了 8 个 memory 文件，这 8 个都已经建好索引，总共切成了 14 个文本块。

`Vector: ready` 表示向量检索正常，也就是语义搜索这部分是能工作的。

`FTS: ready` 表示全文检索也正常。FTS 就是 Full-Text Search，全局文本搜索。

老王对我的信任感倍增，接着问：“Embedding时到底做了什么？”

### 09-5 建索引时到底做了什么？

可以分成四步。

**第一步，发现。**

OpenClaw 会监控 `MEMORY.md` 和 `memory/*.md` 的变化。新增了文件，或者文件内容有更新，就把这个文件标记成 dirty，准备重新建索引。

**第二步，切块。**

把markdown切成多个 chunk，让“一个块只表达一小段相对完整的意思”。


![](https://cdn.paicoding.com/paicoding/a75c3e78eb6271c1c55400ec97e7db96.png)


**第三步，索引。**

每个 chunk 不只会走一遍 embedding，还会同时走全文检索：

- 一路进入 **向量索引**，负责“意思差不多也能搜出来”
- 一路进入 **FTS 全文索引**，负责“关键词命中要准确”

也就是说，OpenClaw 不是只做向量检索，也不是只做关键词检索，而是混合检索。

**第四步，落库。**

最后这些 chunk、元信息、全文索引、向量索引，都会放到本地的 SQLite 中。

老王点点头：“那检索时到底怎么查？是纯向量，还是关键词？”

我说：“混合检索。”

### 09-6 混合检索为什么比纯向量靠谱？


![](https://cdn.paicoding.com/paicoding/a5a5b92d3b2d73f8b74891e10f8a40e6.png)


举个最简单的例子。

如果我们搜的是：`memory_search("nomic-embed-text")`

这类查询的关键，不是“语义接近”，而是“这个字符串必须命中”。

如果只靠向量检索，它可能把“embedding 模型”“本地向量索引”“OpenAI provider”这些语义都捞出来，但偏偏把最关键的关键字匹配丢掉。

如果搜的是：

> 上次说过的那个文章写作偏好是什么来着？

这时候关键词检索就不够用了，因为用户未必会原样说出“娓娓道来”“少用你、多用大家和我们”这些固定字眼。

所以 OpenClaw 的思路是：

- **FTS5 + BM25** 负责精确词项命中
- **sqlite-vec** 负责语义相似召回
- 最后再把两边的结果做融合，返回结果

#### 为什么是 FTS5？

因为 SQLite 的 FTS5，本质上就是一个轻量级全文搜索引擎。

它比 `LIKE '%xxx%'` 快，还知道“哪些词更重要，哪些结果应该排前面”。

BM25 的价值就在这。

一个词出现 10 次不一定比出现 2 次更重要，而是会结合：

- 词频
- 文档长度
- 这个词在整个语料里稀不稀有

于是像 `memory_flush`、`session-memory`、`nomic-embed-text` 这种比较稀缺的词，权重天然就更高。

#### 为什么还要 sqlite-vec？

因为 FTS5 主要解决的“字面命中”的问题，解决不了语义匹配的问题：

- “上次那个事”
- “之前你记住的偏好”
- “我不是说过不要那种爆款腔吗”

这种问法，字面上未必能正好撞到原文，但语义是接近的。这时候 embedding 的价值就出来了。

它先把 query 向量，再和每个 chunk 的向量做近邻比较，把语义接近的片段拉出来。可以粗暴理解成：

```text
query
  ↓
embedding(query)
  ↓
和 chunks_vec 里的每个向量算距离
  ↓
取 top-k
```

这套东西要是放到 SaaS 产品里，需要一个单独的向量数据库，比如说派聪明RAG用的就是ElasticSearch。

但 OpenClaw 没这么干。

它用 `sqlite-vec` 这类 SQLite 扩展，把向量检索能力放进了本地的 SQLite 里。

老王听到这儿笑了：“行，概念算你讲明白了。那 Agent 自己到底怎么用这些 Memory？”

### 09-7 检索到记忆之后，Agent 是怎么把它用起来的？

“王哥，这一步才是 Memory 真正发挥价值的地方。”

很多人以为 Memory 系统的终点是“查到了”。其实不是。


![](https://cdn.paicoding.com/paicoding/c00c084fe1d5eae6b24cc5f24e28c1fd.jpg)


OpenClaw 主要给 Agent 暴露了两个工具：

#### 1）`memory_search`

当 Agent 发现问题涉及过去的决策、偏好、历史上下文，它不会把整个 `memory/` 目录读一遍，而是先发起一次语义搜索。

例如：

```text
memory_search("二哥的文章写作偏好")
```

返回的不是整篇内容，而是**最相关的若干 snippet + 文件路径 + 行号范围**。

这样做有两个好处：

- 控制 token，不要把整个历史一口气塞进上下文
- 先粗召回，找到“值得展开读”的位置

#### 2）`memory_get`

如果 `memory_search` 返回说，关键信息在：

- `MEMORY.md#L1-L16`
- `memory/2026-03-19.md#L20-L48`

那 Agent 下一步就可以用 `memory_get` 去读具体的行段。


![](https://cdn.paicoding.com/paicoding/8b2de807da5d4dcfc2c29261adc77383.png)

注意，这里面有个特别容易被忽略的点：

**Memory 文件本身不是每回合全量注入。**

`memory/*.md` 这种 daily 文件默认并不会塞进上下文窗口，而是通过 `memory_search` 和 `memory_get` 按需读取。

这就解释了为什么 OpenClaw 的 Memory 能够“越记越多”，但又不会把上下文撑爆的原因。

#### Memory flush 为什么是这个体系里的关键一环？

OpenClaw 在会话接近 compaction 之前，会触发一次 **silent memory flush**。

也就是说，当 session 接近自动压缩时，系统会发起一个静默回合，提醒模型把值得长期保留的内容写进 `memory/YYYY-MM-DD.md`。

老王听完感慨：“你这理解得够深的。那我再问你一个实际应用的问题，你用 OpenClaw 的 Memory 干过什么真实的场景？”

### 09-8 讲一个Memory 的最佳实践？

“王哥，我给你讲一个真实的场景。”

我有一个 Agent 是专门帮我审核 gitcode 账号的。如果没有Memory，每次审核的时候，我都要告诉它一些重复的信息，比如：

- 审核完成后发消息到哪个飞书群
- 添加到哪个 gitcode 项目组
- 审核结果用什么格式回复

这些信息每次都要重复说，很烦。把这些写进 Memory就没事了：

```markdown
# 用户偏好

## gitcode 审核

- 审核完成后发消息到“技术派-运营群”
- 添加到项目组：技术派-会员组
- 回复格式：@用户 审核通过，已添加到技术派-会员组

## 其他偏好

- 我是 Java 后端开发，回答问题请用 Java 技术栈
- 回复时请简洁，不要废话
```

这样每次审核，Agent 就会自动检索这些偏好，按照我的要求执行。


![](https://cdn.paicoding.com/paicoding/534bfbc1b0113d4a4ce75a34d67d4097.png)


老王听完眼睛一亮：“这个场景实用。”

我说：“还不止。我还让 Agent 记住了我的工作习惯。比如我喜欢在早上处理审核任务，Agent 会在每天早上主动提醒我有多少待审核的申请。”

来，直接让龙虾帮我们现场演示一个。

直接这条命令 `openclaw memory search "nomic-embed-text"`

![](https://cdn.paicoding.com/paicoding/811dace2157863f34764f60eb209110a.jpg)

返回里直接命中了这两类内容：memory/2026-03-19.md、MEMORY.md

而且都正好包含：nomic-embed-text、embedding 模型、memory 搜索配置

这说明关键词搜索是起效的。

第二次，我们执行 `openclaw memory search "上次说过不要那种爆款腔的写法"`

![](https://cdn.paicoding.com/paicoding/9ff921f247ce86daadf3fe4ec9bf3d09.png)

注意，这句话里没有直接写“不要硬做爆款腔”、“娓娓道来”、“二哥味”

但返回找到了这些和“写作风格、表达偏好、memory 原理”接近的内容，比如：memory/memory-system-deep.md、memory/memory-system.md

这就证明向量检索也是可用的。


memo：更新与3月26日，顺带给大家分享一下[二哥编程星球](https://javabetter.cn/zhishixingqiu/)的喜报，智谱社招拿下，base涨了不少，恭喜这位球友。


![社招：智谱拿下](https://cdn.paicoding.com/paicoding/cc699c62dc6f8337cd5b6f83b96e5955.png)