---
title: PaiCLI 学习路线：手搓一个 Java 版 Claude Code
shortTitle: PaiCLI学习路线
description: PaiCLI 是一个从零手写的 Java Agent CLI，对标 Claude Code。这篇给出完整学习路线与学习周期，从跑通项目、包装简历到深挖源码、背面试题，五步搞定。
keywords:
  - PaiCLI
  - Java Agent CLI
  - Claude Code 原理
  - ReAct
  - MCP
  - Agent 学习路线
tag:
  - Agent
  - 学习路线
category:
  - AI
author: 沉默王二
date: 2026-06-03
---

大家好，我是二哥呀。

星球里有个球友来问我：“二哥，PaiCLI 我想跟着学，我该从哪下手？大概要学多久才能拿出去面试？”

所以今天这篇，我就把 PaiCLI 的学习路线从头到尾捋一遍。看完之后你应该能搞清楚三件事：

- 这个项目能学到什么
- 按什么顺序学最省力
- 学到什么程度就能拿去面试了。

先把结论放这儿：跟着这套方法走，小白一天跑通项目并把简历写好不是问题，一到两周能把简历上写的模块吃透。

![](https://cdn.paicoding.com/stutymore/paicli-xuexiluxian-20260603065331.png)

很多球友学项目的第一反应是去找视频，从第一集看到最后一集，看完感觉自己懂了，关掉视频啥也想不起来。

这不怪你，是视频这个形式本身就不适合深入学一个工程项目。看视频只适合入门，没法把源码、教程、面试题这三样东西串到一起。

建议大家养成看文档、看源码、看注释就能上手的习惯，这个习惯对你以后进团队快速接手别人的代码，帮助大到你难以想象。真实工作场景里没人给你录视频。

## 01、先把 PaiCLI 跑起来

这是最重要、也是最有成就感的一步。在你分析任何一行代码之前，你必须先让 PaiCLI 在你自己的电脑上跑起来。

PaiCLI 是一个纯 Java 写的 Agent 命令行工具，参考了 Claude Code 和 Qoder CLI，所以交互非常友好。

第一步拉取项目源码，目前我们托管在gitcode上。

申请链接：https://paicoding.com/ai-agent-projects-guide

![](https://cdn.paicoding.com/stutymore/paicli-xuexiluxian-20260603065747.png)

如果你之前申请过派聪明RAG、PaiAgent、PaiFlow、技术派、PmHub等项目，应该在同一个组织下就能看到。

第二步，用IntelliJ IDEA打开这个项目。

![](https://cdn.paicoding.com/stutymore/paicli-xuexiluxian-20260603070055.png)

JDK 我们用的Java 17，一个比较稳定的版本。

第三步，配置模型的 API Key。

把项目里的 `.env.example` 复制成 `.env`，然后把你的 Key 填进去就行。

```bash
cp .env.example .env
# 编辑 .env，填入你的 GLM_API_KEY
```

PaiCLI 支持的模型非常多，GLM、DeepSeek、阶跃星辰、Kimi、讯飞星辰 MaaS 都能接，任何一个都可以。

第四步是编译。先产出一个能手工验收的 jar 包。

```bash
mvn clean package
```

第五步是运行。

```bash
java -jar target/paicli-1.0-SNAPSHOT.jar
```

跑起来之后你会看到一个 π 主题的彩色开屏，底部有个状态栏，显示当前模型、MCP 连了几个、有多少工具、当前是 ReAct 还是 Plan 模式。这一刻你就已经拥有了一个简化版的 Claude Code。

![](https://cdn.paicoding.com/stutymore/paicli-xuexiluxian-20260603070451.png)

跑起来之后别急着看代码，先用。

第一件事，让它帮你创建一个项目。直接输入“创建一个 Java 项目叫 myapp”，看它是怎么调用工具的，观察它是如何 ReAct 的。

第二件事，进 Plan 模式。输入 `/plan` 再给它一个多步骤任务，比如“创建一个 demo 项目，然后读取 pom.xml，最后验证项目结构”。

第三件事，试试联网。让它“搜一下沉默王二是哪个逼”，观察它什么时候决定调 `web_search`，什么时候直接回答。

![](https://cdn.paicoding.com/stutymore/paicli-xuexiluxian-20260603070721.png)

这三件事玩下来，你对 ReAct 循环、Plan-and-Execute、工具调用就已经有了真实的感受。

如果你想把 RAG 代码检索也跑通，需要本地装个 Ollama 拉一个 embedding 模型，这个[RAG 代码检索](https://paicoding.com/paismart-rag-search)的教程里写得很清楚，不强求一开始就搞定。

## 02、把PaiCLI抄到简历上

项目跑通了，第二步不是马上扎进源码，而是先打开你的简历。

我推荐使用派简历：https://github.com/itwanger/PaiResume

这个超级好用，可以智能一页，可以AI校对，简历排版也是我精心打磨过的，市面上我觉得没有比这个更好的工具。

简历是你和 HR 心灵碰撞的第一步，有没有面试邀约就看这一步。

也是你面试官对话的入口，你简历上写了什么，面试官就问什么，你也就该重点学什么。先确定简历写什么，学习才有目标。

千万别一上来就想把整个项目吃透，更别想着从零到一把它重写一遍。我再强调一遍，实际工作中根本没有这种场景，你进了团队接手的都是已经在跑的系统。

那 PaiCLI 哪些模块适合写进简历？

![](https://cdn.paicoding.com/stutymore/paicli-xuexiluxian-20260603071138.png)

可以直接从案例里抄：https://paicoding.com/paicli-resume-write

别不好意思。

我按从易到难给你排了个序。

- ReAct 循环 + Function Calling 的 Agent 内核，这是最基础的，几乎所有 Agent 岗位都会问；
- Plan-and-Execute 加 DAG 的任务编排，体现你对复杂任务拆解的理解；
- 三层 Memory 加上下文工程，长对话压缩和 Token 预算是大模型应用的核心难点；
- RAG 代码检索加 AST 关系图谱，这块和向量检索、语义搜索强相关；
- MCP 协议的完整实现，这是 2025 年之后面试的绝对热点；

写简历这一步有个小心机：你写上去的每一条，都要确保自己能往下展开讲。

面试官不会顺着你写的往深处挖。

## 03、深挖源码，顺手把面试题背了

简历写好了，第三步就是针对你简历上写的每一条，回去深挖对应的源码，并且把相关的面试题准备好。

注意，是“针对简历”深挖，不是从头到尾通读全部源码。

举个具体例子。假设你简历上写了 MCP：

> 实现 MCP 协议，支持 stdio 子进程与 Streamable HTTP 远程两类 server，内置注册 60 多个常用的外部工具，比如 Chrome Devtools MCP。

那你就该重点啃[接入 MCP](https://paicoding.com/paiagent-mcp) 和 [DevTools MCP](https://paicoding.com/devtools-mcp) 这两篇教程，源码部分集中在 `com.paicli.mcp` 这个模块。

你要能讲清楚这么几件事：

- MCP 的 JSON-RPC 通信是怎么收发的
- stdio server 和远程 HTTP server 的区别在哪
- 工具是怎么自动注册成统一前缀的
- 参数 schema 为什么要清洗一遍再喂给模型

![](https://cdn.paicoding.com/stutymore/paicli-xuexiluxian-20260603071627.png)

这一步我特别推荐你找一个趁手的 AI 助手一起学。Claude Code、Qoder、Codex、PaiCLI 这些都行。

但用 AI 助手有个关键技巧：当你定位到一个关键类或方法时，别只让它给你“总结一下”。正确的姿势是问它更具体的问题。

比如针对 ReAct，你可以这么问：

- 请解释一下 Agent 类的主循环是怎么实现“思考-行动-观察”这三步的，循环的退出条件是什么？
- 同一轮模型返回了多个工具调用时，PaiCLI 是怎么并行执行又保证结果顺序的？
- 请画出从用户输入一句话，到 Agent 调用工具，再到输出最终结果的完整时序图。

![](https://cdn.paicoding.com/stutymore/paicli-xuexiluxian-20260603071844.png)

接下来是这一步的重头戏：面试题。

如果你源码理解得没那么透彻，没关系，只要你能把面试题梳理清楚、表达清楚，就已经很能打了。

记住这一点：**面试的核心目的不是向面试官证明你每个细节都记得，而是你能跟他就这个话题来回掰扯、有来有回**。

PaiCLI 围绕 Agent 的面试题密度很高，随便拎几个出来你感受一下：

- ReAct 和 Plan-and-Execute 的区别和适用场景
- Function Calling 的本质是什么
- 模型到底执不执行代码
- 上下文窗口满了怎么办
- 为什么要做 prompt cache
- MCP 解决了什么问题
- Multi-Agent 里规划者执行者检查者怎么分工

这些题你要是能结合 PaiCLI 的实现讲出自己的理解，面试官会眼前一亮。

拿“模型到底执不执行代码”这道题给你示范一下怎么掰扯：https://paicoding.com/tool-call-hitl

标准答案是模型本身不执行任何代码，它在 Function Calling 里返回的只是一个结构化的调用意图，告诉 Agent 要调哪个函数、传什么参数，真正去执行的是 PaiCLI 自己的工具层，执行完再把结果喂回模型。

![](https://cdn.paicoding.com/stutymore/paicli-xuexiluxian-20260603072130.png)

这里再分享一个我屡试不爽的笨办法，专门用来检验你是不是真懂：看完一个方法的实现，你把这个方法的主体逻辑删掉，然后自己动手实现一遍，看看交给你你能不能写出来。

能写出来，说明你是真懂了。切忌眼高手低。当然了，我相信你一定能实现的。

## 04、动手 debug

光看是学不会游泳的，必须上手实操。

很多球友背八股张嘴就有，一到自己写就不知道从哪下手，根源就在于从来没真正在这个项目里设过一个断点、跑过一次调试。

第一，设断点。挑你简历相关的入口下断点，比如在 Agent 主循环每一轮请求模型的地方、在工具注册表分发工具调用的地方、在 MCP 客户端发起初始化握手的地方。然后给 PaiCLI 一个简单任务，让程序停在断点上，一行一行看它怎么走。

第二个，观察变量。停在断点上的时候，重点盯着几个关键变量的变化：模型这一轮返回了哪些工具调用、上下文里现在攒了多少条消息、Token 预算还剩多少、工具执行完返回了什么。

第三，动手改它。当你对主流程了如指掌之后，就该尝试动一动这个项目了。

最简单的，改个文案。比如把启动界面改一下，或者改一句返回给用户的提示信息，重新编译运行，看你的改动有没有生效。

这一步看着简单，但它把“改代码 → 编译 → 运行 → 验证”这一套最基本的流程走通了。

再进一步，加个小功能。比如给 PaiCLI 加一个新的内置工具。

最有价值的，是改 bug。这个项目你认真跑起来，是会遇到 bug 的，这太正常了，任何真实项目都有 bug。你能定位一个 bug、想明白它为什么发生、再把它修掉，这个完整过程走一遍，你的工程能力会有一次实打实的跃迁。

测试也别落下。

PaiCLI 留了几个测试 profile，日常回归用 `mvn test -Pquick` 跳过那些慢测试，改动大了再 `mvn test -DskipTests=false` 跑全量。

```bash
# 常规快速回归
mvn test -Pquick
```

切记，全身心投进去，别浮在表面。别再纠结什么“我要从零到一一行一行敲出来”，工作后真没这种场景。踏踏实实按我说的，跑项目、设断点、改 bug、加功能，你一定会大有收获。

## 05、整理成你自己的知识库

如果你对自己还有更高的要求，一定要有输出和积累。

学习这件事，输入和输出是两个完全不同的层次。你看懂了、调试过了，那是输入；你能把它讲给别人听、写成文章、整理成一份自己的笔记，那才是真正的内化。能讲明白，才是真懂。

![](https://cdn.paicoding.com/stutymore/paicli-xuexiluxian-20260603075228.png)

像我，光公众号就输出了1800多篇原创，这数量在技术公众号里绝对是独此一家。

具体怎么积累？我给你几个方向。

第一，写踩坑贴。你跑 PaiCLI、调试 PaiCLI 的过程中，一定踩过坑——某个依赖装不上、Ollama 没配对、MCP server 起不来、某个模型的 Key 格式不对。把这些坑和你的解决办法记下来，就是一篇有价值的经验贴。别小看这种文章，它对后来人帮助极大，对你自己也是一次复盘。

第二，整理你自己的面试题库。你在面试里真实遇到的问题，按模块归归类，整理成一份只属于你的知识库。

第三，画图。把 ReAct、Plan 的 DAG 调度、MCP 的通信流程、Multi-Agent 的协作，用自己理解的方式画成图。

![](https://cdn.paicoding.com/stutymore/paicli-xuexiluxian-20260603075629.png)

这一步还有个隐藏好处：当你在面试里被问到一个当场答不上来的问题，别慌，记下来，回去补。补完了写进你的知识库。这么循环几轮，你会发现自己对 Agent 这套东西的理解，已经远远超过竞争对手了。

## ending

最后我想说，这套学习方法，其实不只适用于 PaiCLI。

先跑起来，

再抄简历，

然后围着简历挖源码、背面试题，
接着动手 debug、改 bug、加功能，
最后把踩过的坑整理成自己的知识库。

这套打法，你套到任何一个项目上都成立。

![](https://cdn.paicoding.com/stutymore/paicli-xuexiluxian-20260603075702.png)

学习这件事，最怕的不是难，是没有方向感。

希望大家都能靠 PaiCLI 这个项目，开一个大包。

记得回来给二哥报喜，笔芯。
