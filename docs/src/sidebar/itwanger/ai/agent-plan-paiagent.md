---
title: Claude Code Token 自由，还能用上 DeepSeek V4+Seedance2，字节 Agent Plan 性价比真顶！
shortTitle: 字节Agent Plan实测
description: 字节火山引擎 Agent Plan 实测，配合 Claude Code 和 PaiAgent 项目实战，体验 DeepSeek V4 Pro + 联网搜索 + 记忆 + 视频生成一站式 Agent 能力。
tag:
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-05-16
---

大家好，我是二哥呀。

市面上目前所有的 Coding Plan 都只有语言模型。

换句话说，如果你的 Agent 需要音频能力，你需要额外接入 TTS 模型；

需要 RAG，你需要额外接入向量模型；需要视频/图片生成，你需要额外接入视觉模型。这还不包括联网搜索、记忆能力等其他 Harness。

麻中麻。

于是宇宙厂出手了，火山引擎推出了业界第一个 Agent 套餐：方舟 Agent Plan。

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516142132.png)

我把交付产物录了屏，大家先感受一下。

【视频】

真的，从编码、到最后的工作流编排，全部搞定。

彻底打破了通用月包服务只有语言模型的限制，提供一站式的 Agent 多模态能力。

包括但不限于：

- DeepSeek V4 Pro、GLM-5.1、Doubao-Seed-2.0-pro 等国内顶级大模型；
- 免费赠送豆包同源的联网搜索；以及做记忆和 RAG 的向量模型 Doubao-embedding-vision；
- Seedance 2.0 生成图片/视频。
  
这下好，Agent 干活需要的十八般武器全齐活了。

> 全文手把手教，系好安全带，我们粗粗粗发～

## 01、CC 接入方舟 Agent Plan

我这里购买的是 200元 的 Medium 套餐，高强度使用了一天的感受是完全够用。

>订阅地址：

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516201848.png)

有需要的小伙伴可以体验下。

接入方式非常简单，我用的是自研的 PaiSwitch，和 CC Switch 是同类产品。

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516202832.png)

base URL 填 `https://ark.cn-beijing.volces.com/api/plan`，API Key 就是方舟 Agent Plan 配置里专属的 API Key。

获取路径见下图：

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516202547.png)

大语言模型可以填 `ark-code-latest`，默认使用 Auto 模式，方舟会根据当前任务的复杂度自动选择最合适的模型。

简单的补全用轻量模型，复杂的多文件修改用 DeepSeek V4 Pro 这种重型选手，兼顾速度和效果。

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516150613.png)

当然，你也可以直接填 DeepSeek-V4 或者 GLM-5.1，固定就用指定的模型。

配置完成后，点【测试连接】，如果成功的话，说明我们已经配置成功了。

不确定的话，可以在 Claude Code 启动后输入 `/status`，看到 base URL 指向方舟 Agent Plan 就说明接入成功了。

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516203244.png)

然后。

我们就可以猛猛干活了。

这次的开发任务是：把方舟 Agent Plan 接入 PaiAgent。用户配置一次 Agent Plan 后，工作流可复用语言模型、联网搜索、知识库、图片生成、视频生成，并让 ReAct Agent 按需调用这些能力。

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516203602.png)

PS：PaiAgent 是我开源的一个类似扣子的工作流编排项目。里面覆盖了 Agent 开发所需的各种技术栈，比如说 SpringAI、LangGraph4j、ReAct、MCP、RAG、tool call、Skills 等等。

>大家可以跟着学：https://github.com/itwanger/PaiAgent

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516203633.png)

梳理一下这次要新增的能力：

- 全局配置新增「方舟 Agent Plan」。
- 扩展 Harness 能力，包括联网搜索（可通过 MCP 的方式接入）。
- 新增多模态节点图片生成+视频生成。
- LLM 节点新增 ReAct、MCP、RAG 知识库接入。

然后扔给 Claude Code，开始干活。

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516204311.png)

这次的开发量可不少。

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516204422.png)

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516205052.png)

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516205552.png)

OK，搞定。

总体用量还算合理，当然了，后期我也修了一些bug，就不一一截图展示了。

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516215409.png)

给我的体感就是，用 Claude Code + DeepSeek V4 写代码还是很丝滑的，没怎么返工。

## 02、PaiAgent 接入方舟 Agent Plan

代码写完只是第一步，接下来才是重头戏，把方舟 Agent Plan 的全套能力在 PaiAgent 里跑通。

我们的目标是：同时搞定 ReAct、MCP 联网搜索、知识库 Embedding、图片生成和视频生成。

现在就来一个个接入。

第一步是在全局配置里新增方舟 Agent Plan 供应商。

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516153145.png)

API 地址填写：`https://ark.cn-beijing.volces.com/api/plan/v3`

API 密钥和前面配置 Claude Code 的一样。

这里解释一下为什么要在 PaiAgent 里再配一次。Claude Code 那边是用来写代码的，走的是语言模型的额度。PaiAgent 这边是用来跑工作流的，除了语言模型，还会用到联网搜索、向量模型、图片和视频生成。

然后是图片和视频模型的配置。

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516193129.png)

图片生成模型填 `doubao-seedream-5.0-lite`，视频生成模型填 `doubao-seedance-2.0`，可以在【配置模型及base URL】点【视觉模型】获取。

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516155719.png)

向量模型填 `doubao-embedding-vision`，可以在【配置模型及base URL】点【向量化模型】获取。

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516155018.png)

真手把手，跟着实操就完事了。

## 03、接入方舟 Agent Plan 联网搜索

联网搜索这个能力对 Agent 来说太重要了。大模型的训练数据都有截止日期，我们问它“特立独行的猪在 2026 年还会上树吗”它答不上来，问它“最新的 Spring AI 版本是多少”它可能给一个过时的答案。有了联网搜索，LLM 就能在推理过程中主动去搜，拿到最新的信息再回答。

PaiAgent 以前的 LLM 节点是不支持联网搜索的，需要接入专门的联网搜索能力。

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516153006.png)

那现在方舟 Agent Plan 免费赠送了和豆包同源的联网搜索额度，我们就可以直接在 LLM 节点里调用了。

怎么用？

在 PaiAgent 中点击【MCP 配置】，添加联网搜索 MCP，填写联网搜索的API Key。

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516180732.png)

可以在【配置Harness】这里点【查看联网API key】获取。

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516160217.png)

添加成功后，就会多一个联网搜索 MCP 工具。

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516181016.png)

可以点【测试】验证一下，比如说搜索关键词是【沉默王二 Java 博主】，看看能不能搜到相关信息。

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516180651.png)

OK，搜到了，信息也是很准确的。说明联网搜索从配置到调用已经完全跑通了。

从配置 Harness 这里也可以看到联网搜索的额度在发生变化，说明确实走的是方舟 Agent Plan 赠送的搜索额度。

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516182129.png)

配置搞定了，接下来我们实战跑一个有意思的 case。我设计了一个“AI 自画像生成器”的工作流：输入一个人名，LLM 先联网搜索这个人的公开信息，然后根据搜到的信息生成一段图片提示词。

回到工作流编辑这里，新建一个工作流，LLM 节点这里选上联网搜索。

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516181609.png)

提示词填入：

```
你是一个专业的肖像生成提示词设计师。

用户输入的人物是：{{input}}

请使用联网搜索获取这个人物的公开信息，重点关注：
1. 真实身份与职业标签
2. 公开头像、照片或个人主页中的外貌特征
3. 常见穿搭、气质、年龄段、表情与场景
4. 与人物强相关的身份符号或背景元素

搜索后，请基于公开信息生成一段适合图片生成模型使用的“自画像提示词”。

要求：
- 不要编造无法从公开信息判断的具体五官细节
- 如果公开资料不足，请用“公开信息可见的身份气质 + 合理泛化外观”表达
- 提示词要适合直接传给后续图片生成节点
- 风格为真实人物肖像、自然光、半身像、专业但亲和
- 不要输出搜索过程
- 不要输出解释
- 只输出最终图片生成提示词

输出格式：
一位基于公开信息创作的中文技术博主/作家人物肖像，人物是{{input}}，……
```

然后我们输入【沉默王二】，先让 LLM 通过联网搜索获取公开信息，再根据信息生成提示词。

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516181727.png)

提示词很准确，LLM 搜到了我的公开信息后，自动提取了外貌特征、穿搭风格、职业标签这些关键要素，组织成了一段适合图片生成模型使用的提示词。

```
一位基于公开信息创作的中文技术博主/作家人物肖像，人物是沉默王二（网名“二哥”），约30-40岁的男性程序员，佩戴黑框眼镜，短发，面容清秀亲和，面带微笑，穿着休闲程序员风格（白色或浅色T恤/格子衬衫），半身构图，自然柔光，背景简洁柔和（或带书架与电脑屏幕元素），专业但亲和的气质，真实人物肖像摄影风格，焦距85mm，景深适度，眼神交流自然。
```

从搜索日志里也可以看到 LLM 确实调用了联网搜索 web_search，获取到了正确的数据。

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516181822.png)

等会接入图片生成节点后，我们看看这个提示词的效果哈。

## 04、接入方舟 Agent Plan 向量模型

联网搜索解决的是实时信息获取的问题，但如果我们有自己的私有知识库呢？

比如公司内部的技术文档、产品说明书、客户资料，这些东西互联网上搜不到，LLM 的训练数据里也没有。这时候就需要知识库了，把文档向量化存起来，LLM 需要的时候去检索相关片段，这就是 RAG。

![](https://cdn.paicoding.com/paicoding/118d8c939237b500fc5adabee1c69760.jpg)

新建一个知识库，就把前面的开发需求文档放进来吧。

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516210255.png)

选择方舟 Agent Plan 提供的 `doubao-embedding-vision` 向量模型。

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516210510.png)

选择文件后，点上传并导入。

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516210547.png)

点击分片预览查看一下。分片策略默认按段落切分，也可以自定义分片大小和重叠窗口。对于技术文档来说，默认配置就够用了。

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516210714.png)

确认没问题后，点击【建立索引】，完成向量化。这里用的就是方舟 Agent Plan 里的 `doubao-embedding-vision` 向量模型，不需要额外付费。

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516210815.png)

然后我们点【检索测试】，输入一个查询，比如说【联网搜索怎么做？】，看看能不能检索到相关的文档内容。

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516211810.png)

OK，检索结果很精准，把需求文档里关于联网搜索的那几段给捞了出来。

当然了，这块可以继续优化，比如说分片策略、相似度阈值、召回数量这些参数都可以调整，来提升检索的准确率和召回的相关性。

接下来是测试。回到工作流，把 LLM 勾选上这个知识库，看看在工作流里能不能正常调用向量检索，让 LLM 基于知识库内容来回答问题。

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516212323.png)

比如说【沉默王二是谁？】，看看能不能检索到相关内容。

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516212548.png)

不错，LLM 很诚实地回答了“知识库中没有找到相关信息”，没有瞎编。这一点很重要，没命中就是没命中，不能硬凑答案。

再换个查询，比如说【联网搜索怎么做？】

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516213756.png)

执行日志里能看到 LLM 确实调用了知识库向量检索，命中了相关分片，然后基于检索结果生成了回答。整个 RAG 流程没问题。

部分结果如下所示：

```
根据当前知识库资料，PaiAgent-one的联网搜索使用方法如下：

1. 前提配置
需要先在全局配置中选择「火山方舟Agent Plan」provider（volcengine_agent_plan）
开启web_search_enabled开关启用联网搜索能力
Agent Plan免费赠送与豆包同源的联网搜索额度，开箱即可获取实时、权威信息
1. 使用方式一：节点编排
可以通过新增的联网节点实现搜索能力：

web_search节点（通用搜索）
输入参数：query（搜索关键词）、limit（结果数量）、freshness（时效性）、siteFilter（站点过滤）、language（语言）
输出内容：results（搜索结果列表）、summary（结果摘要）、citations（引用来源）、query（原始查询）
。。。。
```

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516213833.png)

真不错。联网搜索和知识库向量检索这两大信息获取能力都接入成功了，LLM 在工作流里可以按需调用了。

## 05、接入方舟Agent Plan视觉模型

然后是多模态生成，图片和视频。

我们设计的工作流是这样的：先让 LLM 通过联网搜索拿到人物信息，生成一段图片提示词和一段视频提示词，然后把这段提示词直接传给图片生成节点/视频生成节点。一次输入，自动出图出视频。

先给工作流加上图片生成节点，它的输入提示词引用上一步 LLM 生成的提示词。

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516192840.png)

来看一下最终的输出结果，牛逼啊，感觉特么见到真人了，我去。

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516192925.png)

这个质量完全超出我预期了，尤其是眼镜、发型、气质这些细节特征都表现得很到位。Seedream 5.0 的出图能力确实可以。

好，图片生成搞定了，我们再加一个 LLM 节点 + 视频生成节点，看看 Seedance 2.0 的视频生成效果。

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516200906.png)

LLM 的提示词如下所示：

```
你是一个专业的视频生成提示词设计师。请根据用户输入，生成一段适合 AI 视频生成模型使用的中文视频提示词。

要求：
1. 只输出最终视频提示词，不要解释，不要分点。
2. 提示词要包含主体、场景、动作、镜头运动、光线、画面风格、质量要求。
3. 画面要真实自然，适合短视频生成。
4. 避免出现文字、水印、LOGO、字幕、畸形肢体、画面闪烁。
5. 如果用户只给出人物或主题，请补充合理的场景和镜头表达。

用户输入：{{input}}

请输出一段完整的视频生成提示词。
```

输入同样是【沉默王二】，看看视频提示词的效果。

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516201207.png)

视频生成和图片生成不太一样，图片是同步返回的，基本秒出。但视频生成是异步的，提交任务后需要等一会，生成时间大概在 30 秒到 2 分钟之间，取决于视频时长和画面复杂度。PaiAgent 这边做了 SSE 推送，任务状态变化会实时通知前端。

我把视频也贴一下，大家感受一下。

【视频2】

## 06、PaiAgent如何写到简历上？

到这里，我们用方舟 Agent Plan 把联网搜索、图片生成、视频生成、知识库向量检索全部跑通了。

语言模型、向量模型、视觉模型，三类模型统一管理，工作流里随便调用，不用到处去申请不同平台的 Key，这个体验确实省心。

![](https://cdn.paicoding.com/stutymore/agent-plan-paiagent-20260516222134.png)

我们来总结一下简历写法：

**项目名称**：PaiAgent — 类扣子的 AI 工作流编排平台

**项目简介**：可通过拖拽构建复杂的 AI 处理流程，支持多模型接入、联网搜索、知识库 RAG、图片/视频生成等多模态能力编排。

**技术栈**：Java 21、Spring AI 1.0、LangGraph4j、MySQL、MinIO、Redis

**核心职责**：

- **联网搜索**：基于 MCP 协议封装方舟 Agent Plan 联网搜索 API，实现 LLM 节点内按需调用联网搜索的能力。搜索结果自动注入 Prompt 上下文，LLM 能拿到实时信息再做推理
- 接入 Seedream 图片生成节点和 Seedance 视频生成节点，支持工作流内“LLM 生成提示词→图片生成→视频生成”的并行链式编排，视频和图片统一转存到 MinIO
- **向量检索**：集成 Doubao-embedding-vision 向量模型，实现文档上传→自动分片→向量化→建立索引的完整 RAG 流程，LLM 节点可勾选知识库进行 topK 向量召回，检索结果作为上下文参与推理
- 实现 ReAct 模式的 Agent 节点执行器，支持最大 20 步推理迭代和动态工具注册，将联网搜索、知识库检索、记忆召回等 9 个预置工具封装为 Agent 可自主调用的能力
- 基于 Spring AI 集成方舟 Agent Plan 实现 DeepSeek V4 Pro、GLM-5.1 等多个语言模型的配置化切换，一套 API 对接语言、向量、图片、视频四类模型
