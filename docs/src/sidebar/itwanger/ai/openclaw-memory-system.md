---
title: OpenClaw 记忆系统终于整明白了：Markdown 存源数据，SQLite 做向量索引
shortTitle: OpenClaw记忆系统
description: 一篇讲清楚 OpenClaw 记忆系统的文章：为什么会同时出现 Markdown 和记忆索引 SQLite，为什么聊天模型是 GPT-5.4，而向量索引用的却是 Ollama 的 nomic-embed-text，以及这套设计到底解决了什么问题。
tag:
  - Agent
  - OpenClaw
  - Ollama
category:
  - AI
author: 沉默王二
date: 2026-03-19
---

大家好，我是二哥呀。

说真的，这两天我被 OpenClaw 的 memory 机制狠狠干懵了一次。

一开始我以为，记忆就是 `MEMORY.md` 加上 `memory/*.md` 这些 Markdown 文件。结果排查着排查着，突然又冒出来一个 `~/.openclaw/memory/paismart.sqlite`。我当时脑子里就一个问号：不是都已经有 md 了么，怎么又来一个 sqlite？这到底是升级了，还是我理解错了？

后来我一边查配置，一边看日志，一边折腾 Ollama 的 embedding，终于把这个事掰明白了：**OpenClaw 不是把记忆从 Markdown 升级成 SQLite，而是把“记忆内容”和“记忆搜索”拆成了两层。Markdown 负责存，SQLite 负责找。**

这个区别一旦理解透了，后面很多现象你就都能解释通了。比如为什么 workspace 下面明明有 `MEMORY.md`，`memory_search` 却搜不出来；比如为什么聊天模型我配的是 GPT-5.4，但向量索引那边跑的却是 Ollama 的 `nomic-embed-text`；再比如为什么我明明改了配置，结果 `provider` 还是 `none`。

如果你最近也在折腾 OpenClaw，或者正准备给自己的 Agent 加一套“长期记忆 + 语义检索”的能力，那这篇文章我建议你耐心看完。因为我会把这次踩过的坑、最后跑通的方案，以及这套设计背后的思路，都给你摊开讲明白。

## 01、我一开始到底搞混了什么

我最开始的误区，其实特别典型：我把“记忆文件”和“记忆索引”当成同一件事了。

在很多人的直觉里，既然已经有 `MEMORY.md` 和 `memory/YYYY-MM-DD.md` 这些文件，那记忆系统不就应该只围绕这些文件运转吗？你让我记住一件事，我把它写进 Markdown；你下次问我，我再从 Markdown 里找出来。逻辑上完全闭环，看起来也没毛病。

问题就出在这里。

**“能存下来”和“能高效找到”，其实是两回事。**

你把内容写进 Markdown，确实完成了“存储”这一步。但你后面要检索时，尤其是想用一种更像人说话的方式去问，比如“我之前是不是更喜欢小步汇报进度”“我们上次关于向量索引讨论过什么”“那个跟 Ollama 配 embedding 的方案怎么配来着”，这时候如果只靠关键词匹配，命中率其实会很一般。

因为真实的提问方式，往往不会和原文一模一样。你记下来的是“每完成一小步就汇报进度，不要等全部做完再反馈”，但你搜索时可能问的是“沟通偏好”“反馈节奏”“是不是不要一次性做完才说”。这时候，纯文本匹配就开始吃力了。

也正因为这个原因，OpenClaw 才把 memory 设计成了两层：一层是你真正能看到、能编辑、能长期保存的 Markdown 文件；另一层是后台自动维护的 SQLite 索引，用来支持语义搜索。

【此处插入记忆目录结构截图：截图目标：证明 OpenClaw 同时存在 workspace/memory 与 ~/.openclaw/memory 两套目录；关键词：workspace memory、sqlite、paismart.sqlite；建议位置：Finder 或终端目录列表】

## 02、OpenClaw 的记忆到底分成哪两层

先把结论摆这：

- `~/.openclaw/workspace/MEMORY.md` 和 `~/.openclaw/workspace/memory/*.md`，这是**源数据层**。
- `~/.openclaw/memory/*.sqlite`，这是**索引层**。

这两层不是替代关系，而是配合关系。

### Markdown：真正的记忆内容

Markdown 文件才是你真正的“记忆本体”。

它的好处非常朴素，但非常重要。

第一，它是纯文本，你能直接打开看，直接编辑，直接提交 Git。出了问题你也能肉眼检查，而不是对着一堆二进制结构发呆。

第二，它天然适合长期积累。比如 `MEMORY.md` 放长期偏好、重要结论、稳定上下文；`memory/YYYY-MM-DD.md` 放当天流水账、临时进展、排障记录。这种分层比把所有东西塞进一个数据库字段里要舒服太多了。

第三，它足够安全。就算后面的向量模型挂了，SQLite 崩了，embedding provider 换了，Markdown 还在，记忆就还在。你不会因为某个索引重建失败，就把真正的历史内容搞丢。

### SQLite：为了“搜得更像人”

SQLite 在这里不是主角，但它是效率担当。

它的任务不是“保存事实”，而是“把事实变得更容易被找回来”。

OpenClaw 会把 Markdown 内容切成若干 chunk，然后交给 embedding 模型做向量化，最后把这些向量和分块信息存到 sqlite 里。等你以后调用 `memory_search` 时，它会把你的查询也转成向量，去和索引里的 chunk 做相似度匹配，再把最相关的片段返回给你。

所以你会看到一个很有意思的现象：同样是问记忆，**`read MEMORY.md` 读到的是原文，`memory_search` 找到的是相关片段。**

一个偏“原始内容”，一个偏“检索入口”。

这个设计，其实跟搜索引擎很像。网页正文还在网页里，搜索引擎只是额外建了一套索引。没有人会说“Google 把网页升级成倒排索引了”，对吧？OpenClaw 这里的关系，也差不多就是这个意思。

【此处插入记忆结构示意图：截图目标：说明 Markdown 是源数据，SQLite 是索引层；关键词：Markdown source、SQLite index、memory_search；建议位置：流程图或手绘架构图】

## 03、为什么只靠 Markdown 不够

这个问题，只有你真正拿 `memory_search` 去搜一轮，才会体会得很深。

如果只用 Markdown，那么检索方式基本就落在两类：

一种是你自己肉眼翻。

另一种是关键词搜索。

这两种都能用，但都有明显上限。

肉眼翻的问题不用说，量一上来就崩。你现在觉得 `MEMORY.md` 只有几十行很好找，是因为记忆还没真正积累起来。等后面有一两百条长期记忆，加上每天的日志，你根本不可能还靠手翻。

关键词搜索看似高级一点，但它特别依赖措辞一致。你记录的是“向量索引当前使用 Ollama 的 nomic-embed-text”，结果你搜索时问的是“本地 embedding 模型是什么”“记忆向量是不是走 ollama 了”“为什么 provider 显示 openai”。这些问法里，关键词完全不统一，但语义上其实在问同一件事。

这时候，向量检索的价值就出来了。

它不是死盯某几个字，而是尽量去理解“你这句话大概在说什么”。也正因为这样，它才更适合拿来处理 Agent 的长期记忆，因为人和 Agent 的沟通，本来就不是写 SQL 条件，而是用自然语言在问。

更有意思的是，OpenClaw 现在跑起来后，`memory_search` 返回的是 `mode: hybrid`。这意味着它不是只靠向量，也不是只靠关键词，而是两套一起上。

- 关键词擅长精确命中，比如人名、模型名、文件名。
- 向量擅长语义相近，比如“沟通偏好”和“汇报进度”。

两者组合起来，效果会更稳。

【此处插入 memory_search 命中结果截图：截图目标：证明 memory_search 已返回 provider、model、mode 和命中片段；关键词：provider openai、nomic-embed-text、hybrid；建议位置：终端输出】

## 04、为什么我最后选了 Ollama 做向量模型

这次最开始其实不是这么配的。

我一开始走的是 OpenClaw 文档里更“标准”的思路：`memorySearch.provider = local`，然后让 `node-llama-cpp` 去吃本地 GGUF 模型。

从理论上说，这条路没毛病，甚至还挺正统。但实际折腾起来，真有点绕。

因为这条链路里，你得处理几个问题：

- `node-llama-cpp` 的编译
- 本地模型的下载
- Gateway 是否真正吃到新配置
- SQLite 索引是否按新的 provider 重建

而我本地已经有 Ollama 了。

这就让我想到一个更顺手的方案：既然 Ollama 已经在跑模型了，那 embedding 这件事，能不能也让 Ollama 来干？

结果一试，还真行。

我最后 pull 了 `nomic-embed-text`，然后测了 Ollama 的两个接口：

- 原生接口：`/api/embeddings`
- OpenAI 兼容接口：`/v1/embeddings`

都能正常返回向量。

这就很关键了。

因为 OpenClaw 的 memorySearch 虽然没有直接写“provider: ollama”，但它支持 OpenAI 兼容接口。也就是说，我完全可以把 memorySearch 配成 `provider: openai`，然后把 `baseUrl` 指到 Ollama 的 `/v1`。

于是最后就形成了现在这套组合：

- **聊天模型：GPT-5.4**
- **向量索引模型：Ollama / nomic-embed-text**

我特别喜欢这套搭配。

一方面，聊天质量继续交给 GPT-5.4，稳一点。

另一方面，embedding 这种纯本地可完成的活，交给 Ollama 来做，省钱、省事，也更符合“本地可控”的思路。

### 我实际用到的配置

```json5
{
  agents: {
    defaults: {
      model: {
        primary: "openai-codex/gpt-5.4"
      },
      memorySearch: {
        provider: "openai",
        model: "nomic-embed-text",
        remote: {
          baseUrl: "http://localhost:11434/v1",
          apiKey: "ollama"
        },
        sync: {
          watch: true
        }
      }
    }
  }
}
```

这段配置最容易让人误解的，就是 `provider: "openai"`。

很多人一看到这里，就会本能觉得：哦，原来还是在用 OpenAI。

其实不是。

这里的 `openai` 说的是**协议兼容方式**，不是说请求真的发去 OpenAI 云端。真正干活的，是你本地 Ollama 跑着的 `nomic-embed-text`。

这就像某些服务说“兼容 MySQL 协议”，不代表底层一定就是 MySQL 本体，而是说“你可以用这套方式接进来”。

【此处插入 openclaw.json 配置截图：截图目标：证明聊天模型和 memorySearch 模型分离；关键词：gpt-5.4、memorySearch、nomic-embed-text；建议位置：配置文件编辑器】

## 05、这次我踩过的几个坑，真的很典型

如果你也准备走这条路，我建议你把这一节认真看完。因为真正浪费时间的，从来不是“写配置”本身，而是那些你以为自己改对了、但系统其实没吃进去的细节。

### 坑一：Gateway 看起来重启了，其实旧进程还活着

这是我这次踩得最烦的坑。

我明明改了 `openclaw.json`，日志里也出现了 `config change detected`，但 `memory_search` 返回的还是：

- `provider: none`
- `mode: fts-only`

这就很邪门。

后来一查，发现 Gateway 的旧进程还在占着端口。你以为自己重启了，实际只是“你发出了重启命令”，真正服务旧的那个还活着。

结果就是：新配置写进文件了，运行中的进程却没真正换掉。

这个问题不把旧进程彻底清掉，后面你怎么测都像在空气里挥拳。

### 坑二：SQLite 里保留着旧索引元数据

第二个坑也很经典。

我把 provider 从 `none` 改成了 Ollama 方案，按理说应该重新索引了吧？结果 sqlite 里还是旧的元数据：

- `provider: none`
- `model: fts-only`

也就是说，你配置虽然改了，但索引库还是旧状态。

这个时候，不是内容有问题，而是**索引没有重建**。

解决思路也很直接：
- 清掉旧索引元数据
- 必要时重建 sqlite
- 再触发一次 `memory_search`

这一步一旦完成，结果就会明显变化。

### 坑三：聊天模型和 embedding 模型混在一起看

这个坑不是技术问题，是认知问题。

我自己一开始也绕了。

因为我明明配了 GPT-5.4，当 `memory_search` 返回 `provider: openai`、`model: nomic-embed-text` 的时候，我第一反应是：等等，不是说现在默认是 GPT 吗？怎么又冒出来个 nomic？

后来才彻底想通：**这是两套模型，不是一个模型。**

- 对话，走 GPT-5.4
- 记忆向量化，走 Ollama embedding

这一层一旦想明白，整个系统就通透很多了。

### 坑四：文章里讲原理很容易，真正跑通常常卡在“最后一公里”

说白了，原理谁都能讲。

但你真上手的时候，最折磨你的，往往不是“向量索引是什么”，而是：

- 配置到底写对没有
- 进程到底重启没有
- 模型到底接上没有
- SQLite 里到底有没有 chunk
- 搜索结果为什么还是空的

这也是为什么我现在越来越觉得，写技术文章不能只停留在“概念层面”。如果没有真实排障过程，这篇文章再工整，也很难让读者产生“我回去照着搞一遍，大概率能成”的信心。

【此处插入 sqlite 元数据或索引状态截图：截图目标：证明旧索引和新索引的差异；关键词：provider none、provider openai、fts-only、hybrid；建议位置：sqlite 查询结果或日志输出】

## 06、如果你刚开始用 OpenClaw，我建议你怎么选

如果你现在还没开始配 memory，我给你的建议其实很简单：**先别把自己一上来就卷进最复杂的方案里。**

### 第一阶段：只用 Markdown

刚开始，先把这两个文件用起来：

- `MEMORY.md`
- `memory/YYYY-MM-DD.md`

你先养成“有结论就写进去”的习惯，比你第一天就非得把向量索引拉满重要得多。

因为没有源数据，再高级的检索也没意义。

### 第二阶段：记忆多了，再开向量索引

等你确实开始遇到这些问题：

- 记忆文件越来越多
- 你开始记不住东西写在哪了
- 你希望 `memory_search` 更像“问人”而不是“搜文件”

这时候再上向量索引，收益就很明显了。

而且如果你本地已经有 Ollama，我现在更推荐你直接走 `nomic-embed-text` 这条路。理由很简单：

- 模型现成
- 体积不算大
- 接口标准
- 本地可控
- 后面想替换 embedding 模型也方便

### 第三阶段：把“写记忆”和“搜记忆”变成工作流的一部分

我觉得最理想的状态，不是把 memory 当成一个“高级功能”，而是把它当成 Agent 日常工作流的一部分。

### 第四阶段：学会判断自己到底有没有配对

这个也特别重要。

很多时候，最耽误时间的不是“不会配”，而是“以为自己已经配好了”。所以我现在会用一个很土但很有效的方法来验收：看结果，不猜状态。

具体怎么判断？

第一，看 `memory_search` 返回的 `provider` 和 `model`。如果还是 `provider: none`、`mode: fts-only`，那说明你现在只是关键词搜索，还没有真正进到向量模式。如果返回的是 `provider: openai`、`model: nomic-embed-text`、`mode: hybrid`，那就说明 embedding 这条链已经通了。

第二，看 sqlite 里是不是开始出现 chunk。因为真正的向量索引，不是“配置文件里写了就算成”，而是 sqlite 里真的有内容了，搜索也真的能命中相关片段。

第三，看你搜一句自然语言能不能命中语义相近的内容。比如你记的是“每完成一小步就汇报进度”，你搜“沟通偏好”“反馈节奏”也能中，那才说明这套东西已经开始像样了。

比如：

- 配完一项重要配置，就顺手写进 `MEMORY.md`
- 排完一次典型故障，就顺手写进 `memory/YYYY-MM-DD.md`
- 下一次问问题时，先 `memory_search`
- 命中后再决定要不要 `memory_get` 或直接读原文

这样慢慢积累下来，Agent 的记忆才会真的开始有“连续性”，而不是每次都像临时工一样重新上岗。

而不是每次开新会话，都像刚失忆完一样，重新猜一遍你到底喜欢什么、之前已经折腾到了哪一步。

【此处插入最终效果截图：截图目标：展示从 Markdown 写入到 memory_search 命中的完整闭环；关键词：MEMORY.md、memory_search、hybrid、命中结果；建议位置：终端+编辑器拼图】

## ending

我这次折腾 OpenClaw 的 memory，最深的感受其实不是“终于把向量索引跑通了”，而是我突然更能理解，为什么一个 Agent 要把“存”和“找”拆开。

我们平时做人也是这样。

真正重要的东西，往往不是你脑子里有没有，而是你在需要的时候，能不能把它快速找回来。

记忆本身，决定了你有没有积累。

检索能力，决定了这些积累能不能在关键时刻变成判断、变成动作、变成效率。

Markdown 像是在认真做笔记。

SQLite 像是在帮你建立索引。

一个负责记下来，一个负责找回来。

前者让东西不会丢，后者让东西不至于躺着积灰。

【真正有用的记忆，不是“我保存过”，而是“我下次还能用得上”。】

所以这篇文章如果你只带走一句话，我希望是这一句：

**OpenClaw 不是把 memory 从 Markdown 升级成 SQLite，而是用 Markdown 保存事实，再用 SQLite 帮你把事实找回来。**

这个区别，看起来只是一个技术实现细节。

但一旦想明白了，你后面不管是配 OpenClaw、做 Agent、还是给自己的系统加长期记忆，思路都会清楚很多。

好，今天这篇就先聊到这，先写到这里。

如果你也在折腾 OpenClaw，或者也被 memory 这套机制绕晕过，评论区告诉我，我后面可以继续把另外几个坑也拆开讲，继续聊。🦞
