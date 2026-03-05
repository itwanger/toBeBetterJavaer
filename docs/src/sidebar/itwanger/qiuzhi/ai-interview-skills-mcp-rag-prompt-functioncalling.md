---
title: 汉武帝发难：“连Skills都没玩过，还敢说自己掌握AI辅助编程？”东方朔反驳：“不就是渐进式披露的Prompt嘛，没啥了不起。”
shortTitle: AI面试高频考点全解析
description: 2026年Java后端面试竟然问Skills、MCP、RAG、Prompt、Function Calling？这份面试宝典帮你系统梳理AI编程核心概念，从基础到进阶一网打尽。
tag:
  - 面试
  - AI编程
  - Skills
  - MCP
  - RAG
category:
  - 求职
author: 沉默王二
date: 2026-03-03
---

大家好，我是二哥呀。

话说公元前 141 年，未央宫里正在进行一场特殊的面试。

汉武帝刘彻端坐龙椅，手里拿着一份竹简，眉头紧锁：“东方朔，朕听闻你精通 AI 辅助编程，可解天下难题？”

东方朔躬身答道：“回陛下，臣虽不敢言精通，但确有一些心得。”

“哦？那你倒是说说，什么是 Skills？和普通的 Prompt 有何区别？”

东方朔略一思索：“启禀陛下，Skills 是预置的最佳实践指南（SKILL.md 文件），包含针对特定任务的详细操作步骤和注意事项。通过渐进式披露机制，让 LLM 节点更智能、能力更强。”

![](https://cdn.paicoding.com/paicoding/9e287bb9fd6b89468d6af2e7b991445a.jpg)

PS：最近在读王朔的《起初》，突然就想到这么一个段子，目的当然希望给大家的阅读增添一些趣味性，后续也会在这个框架上继续发挥创造力，给大家带来干货的同时，也能够活泼一点，逗一点。

我把东方朔当时的面经贴出来一部分大家感受下。

![](https://cdn.paicoding.com/stutymore/sucai-20260303090636.png)

这还只是冰山一角。

但能管中窥豹，穿回 2026 年，AI 相关的概念和工具，比如说 Skills、MCP、Prompt、RAG、OpenClaw 等等，不仅是日常讨论的热点话题，也是求职面试中的必问内容。

今天这篇内容，将会把当前这些热点概念进行一个系统梳理，收藏起来慢慢看，你会发现，那个自信的精神小伙又回来了啦。

> 全文较肝，系好安全带，我们发车。

## 01、什么是 AI Agent？

**考察点**：Agent 概念

**参考答案**：

普通的 LLM 调用就是一问一答：你给它一个问题，它给你一个回答，完事。

![](https://cdn.paicoding.com/paicoding/be7385e9e34829960030a74a459d6cd6.png)

AI Agent 是让大模型能够自主行动：它不只是回答问题，还能**规划任务、使用工具、循环思考**，直到完成目标。

从技术上说，Agent 比普通 LLM 多了几个核心能力：

**第一是工具调用**。Agent 能使用外部工具，比如搜索引擎、数据库、API。LLM 本身只会生成文本，但 Agent 框架会解析 LLM 的输出，识别出它想调用某个工具，然后真的去调用，把结果再喂回给 LLM。这就是 Function Calling。

**第二是规划能力**。面对一个复杂任务，Agent 会把它拆解成多个步骤，然后一步步执行。比如生成播客，它会规划：先理解用户给的主题 → 生成对话脚本 → 调用 TTS 合成语音 → 拼接音频。这个过程不是一次 LLM 调用能完成的，需要多轮交互和决策。

![](https://cdn.paicoding.com/paicoding/c29818abfca0c12f05a993adca59a390.png)

**第三是记忆**。普通 LLM 调用是无状态的，上一轮对话说了什么，下一轮它就忘了（除非你把历史都塞进 prompt）。Agent 可以有短期记忆（当前任务的上下文）和长期记忆（跨任务的知识积累），这让它能处理更复杂的场景。

**第四是自主循环**。Agent 不是调一次就结束，它会根据执行结果来决定下一步做什么。调用工具失败了，可能会换个方式重试；发现信息不够，可能会去搜索更多资料。这种感知-决策-行动的循环，是 Agent 的核心特征。

回到 PaiFlow，我们的工作流引擎其实就是一种 **Agent 的实现方式**。用户通过可视化界面编排一个工作流，里面有 LLM 节点、工具节点、条件分支，这本质上就是在定义一个 Agent 的"行为逻辑"。工作流引擎负责调度执行，就相当于 Agent 的"大脑"在驱动整个流程。

比如播客生成这个场景：用户输入一个主题，工作流先调 LLM 节点生成脚本，再调 TTS 工具节点合成语音，中间还有条件判断（内容是否合规）。这整个流程就是一个 Agent 在工作——它理解了用户意图，规划了执行步骤，调用了外部工具，最终完成了任务。

所以简单总结：**LLM 是大脑，Agent 是有手有脚、能干活的完整个体**。PaiFlow 做的事情，就是让用户能方便地组装出这样一个能干活的 Agent。

## 02、Function Calling 是什么？

**考察点**：工具调用

**参考答案**：

Function Calling 是让大模型能够调用外部函数/API 的能力。

![](https://cdn.paicoding.com/paicoding/edc94936cf2c7aa7c6830fe664fba6e9.png)

普通的 LLM 只能输出文本，你问它帮我查一下今天北京的天气，它最多回你好的，我帮你查一下——但它真的查不了，因为它没有手。Function Calling 的作用就是让 LLM 能说出它想调用哪个工具、传什么参数，然后由外部框架去真正执行。

整个流程是这样的：

**第一步，告诉 LLM 有哪些工具可用**。调用 LLM 的时候，除了传 prompt，还会传一个 tools 列表，每个工具有名字、描述和参数定义。比如：

```
{
  "name": "get_weather",
  "description": "查询指定城市的天气信息",
  "parameters": {
    "type": "object",
    "properties": {
      "city": {"type": "string", "description": "城市名称"}
    },
    "required": ["city"]
  }
}
```

**第二步，LLM 决定要不要用工具**。用户问今天北京天气怎么样，LLM 看到有个叫 get_weather 的工具，描述是查询指定城市的天气信息，它就明白了——这个工具能帮我回答这个问题。然后它输出一个结构化的调用请求：

```
{
  "tool_calls": [{
    "function": {
      "name": "get_weather",
      "arguments": "{\"city\": \"北京\"}"
    }
  }]
}
```

**第三步，框架执行工具，把结果喂回 LLM。**外部框架解析这个输出，真的去调天气 API，拿到结果后再塞回对话里，LLM 根据结果生成最终回答。

## 03、MCP 是什么？

**考察点**：MCP 协议

**参考答案**：

MCP 是 Anthropic 提出的模型上下文协议，目的是**标准化大模型和外部工具的交互方式**。

![](https://cdn.paicoding.com/paicoding/46cb4475078bb6817ebde1a766d0ff78.png)

以前每个工具都要单独对接，写一堆适配代码。MCP 定义了统一的协议，工具实现 MCP Server，应用实现 MCP Client，就能互联互通。

**MCP 的核心概念**有三个：

- **Resources：**只读数据源（文件、数据库）
- **Tools：**可执行的功能（API 调用、代码执行）
- **Prompts：**预定义的提示词模板

**通信方式有两种**：

- **stdio：**通过标准输入输出通信，适合本地工具
- **SSE：**通过 HTTP SSE 通信，适合远程服务

**我们的 MCP Client 实现思路是这样**：

```java
public class McpClient {
    private final String transport;  // "stdio" or "sse"

    // 发现可用工具
    public List listTools() {
        return sendRequest("tools/list");
    }

    // 调用工具
    public Object callTool(String name, Map args) {
        return sendRequest("tools/call", Map.of("name", name, "arguments", args));
    }

    private Object sendRequest(String method, Object params) {
        if ("stdio".equals(transport)) {
            // 写入子进程的 stdin，从 stdout 读取结果
        } else {
            // 发送 HTTP 请求
        }
    }
}
```

通过配置化方式接入 MCP 工具：

```
mcp_servers:
- name: "filesystem"
transport: "stdio"
command: ["python", "filesystem_server.py"]
- name: "search"
transport: "sse"
url: "http://search-mcp:8080"
```

### 追问 1：Function Calling 和 MCP 什么区别？

参考答案：

**FunctionCall：**函数调用，它允许 LLM 根据用户的自然语言输入识别它需要什么工具以及格式化的工具调用的能力；

**MCP：**提供了一个通用的协议框架来发现、定义、以及调用外部系统提供的工具能力；

![](https://cdn.paicoding.com/paicoding/4fdb66b74aba0e4084ecbac2c8a84864.png)

## 04、什么是 Claude Skills？

**考察点**：前沿技术、Agent 能力边界

**参考答案**：

Skills 是 Anthropic 为 Claude 预置的一套最佳实践指南，本质上是一些 SKILL.md 文件，里面包含了针对特定任务的详细操作步骤和注意事项。

![](https://cdn.paicoding.com/paicoding/ac8ac07e3907df51b53f4be22b73237b.png)

比如我们需要创建 Word 文档、PPT、Excel、PDF 这些文件时，Claude Code 会先读取对应的 Skill 文件，里面会告诉 Claude Code 用什么库、怎么处理格式、有哪些坑要避免。

Skills 更像是操作手册或最佳实践文档，是静态的知识，不是实时调用的能力。

Function Calling 是让大模型调用外部函数的能力。我们定义好函数的名称、参数、描述，模型在对话中判断需要调用时，会输出结构化的调用请求，然后由程序或者框架去执行函数并把结果返回给模型。

MCP 的目标是标准化大模型与外部工具、数据源的连接方式。Skills 是内置知识，告诉模型怎么做好某件事，是静态的指南；Function Calling 是调用机制，让模型能够触发外部操作；MCP 是连接标准，让模型更方便地对接各种工具。

### 参考答案版本 2

Claude Skills 是 Anthropic 推出的一种结构化知识包机制，用于增强 Claude 在特定任务上的能力。它不是 API 调用，而是把专业知识、指令、脚本打包成一个文件夹，让 Claude 按需加载。

**核心概念**：

- Skills 是一个**文件夹**，包含 SKILL.md 文件（必需）和可选的资源文件
- SKILL.md 包含 YAML 元数据（name、description）和 Markdown 指令
- Claude 根据任务需要，动态加载相关 Skill 的内容

**三者对比**：

| 对比项     | Function Calling | MCP            | Claude Skills    |
| ---------- | ---------------- | -------------- | ---------------- |
| 本质       | API 调用         | 工具协议       | 知识包           |
| 格式       | JSON Schema      | 复杂协议       | Markdown + YAML  |
| Token 消耗 | 低（只传参数）   | 高（协议开销） | 按需加载，高效   |
| 适用场景   | 调用外部 API     | 复杂工具集成   | 增强特定任务能力 |
| 学习成本   | 中等             | 高             | 低               |

**举个例子**：假设要让 Claude 更擅长处理 PDF，用 Skills 的方式：

```
pdf-skill/
├── SKILL.md          # 定义如何处理 PDF 的指令
├── examples/         # 示例用法
└── scripts/          # 辅助脚本
```

而不是写一个 parsePdf() 的 Function。Skills 更像是教会 Claude 一项技能，而不是给 Claude 一个工具。

## 07、Skills 的渐进式披露原理是什么？

**考察点**：理解 Skills 的核心设计理念

**参考答案**：

渐进式披露是 Skills 最核心的设计思想，解决的是**上下文窗口有限**的问题。

**问题背景**：传统做法是把所有工具说明、使用指南都塞进 System Prompt，导致：Token 消耗巨大（可能几万 Token 的说明）、无关信息干扰模型判断、上下文空间被挤占。

**渐进式披露的三层加载**：

![](https://cdn.paicoding.com/paicoding/3da7990f61ca7d2d960804bbbed7eaec.png)

就像一本技术手册，目录页（元数据）让你快速知道有哪些内容，章节概述（主文档）告诉你怎么用，详细示例（附加文件）只在需要时翻阅。

**好处**是 **Token 高效**：不需要时不加载，**响应更准确**：没有无关信息干扰，**扩展性好**：可以有几百个 Skills，不会撑爆上下文。

## 08、Skills 的实战篇

以上面试题，全部来自 PaiFlow Agent 专栏，当然了，这只是其中的一部分面试题。

> https://paicoding.com/column/13/29

![](https://cdn.paicoding.com/paicoding/071b3cbefd1b438b663a8fd0a17d06fc.jpg)

另外，为了方面大家近距离接触 Agent 开发，我在 GitHub 还开源了另外一个 Vibe Coding 项目 PaiAgent，算是 PaiFlow 的前身。

新版也增加了 Skills 的应用实战，可在 llm 节点中新增 Skills。

> https://github.com/itwanger/PaiAgent

![](https://cdn.paicoding.com/paicoding/d488dcb323b9e436998f3b5e607770a2.png)

如果用 Java 代码来实现的话，Skills 其实很简单。

第一步是，找到 Skills。

```java
@PostConstruct
public void init() {
    // 从 classpath 扫描所有 SKILL.md 文件
    Resource[] resources = resolver.getResources("classpath*:" + skillsPath + "/*/SKILL.md");
    for (Resource resource : resources) {
        Skill skill = skillLoader.load(skillDir);
        register(skill);
    }
}
```

第二步是，加载所有 references。

```java
public Map<String, String> loadAllReferences(String skillName) {
    Skill skill = skills.get(skillName);
    Map<String, String> references = new HashMap<>();
    for (String refName : skill.getReferences()) {
        String content = skillLoader.loadReference(skill.getSkillPath(), refName);
        references.put(refName, content);
    }
    return references;
}
```

第三步，构建完整执行 Prompt

```java
public String getFullExecutionPrompt(Map<String, String> referenceContents) {
    StringBuilder sb = new StringBuilder();
    sb.append("# 技能: ").append(name).append("\n\n");
    sb.append(description).append("\n\n---\n\n");
    sb.append("## 技能指南\n\n").append(content).append("\n\n");

    // 直接嵌入所有 reference 内容
    for (Map.Entry<String, String> entry : referenceContents.entrySet()) {
        sb.append("### ").append(entry.getKey()).append("\n\n");
        sb.append(entry.getValue()).append("\n\n");
    }
    return sb.toString();
}
```

第四步，执行时打包 Skills。

```java
if (config.getSkillName() != null && !config.getSkillName().isBlank()) {
    skill = skillRegistry.getSkill(config.getSkillName());
    // 直接加载所有 references，打包进 Prompt
    skillReferences = skillRegistry.loadAllReferences(config.getSkillName());
}
String systemPrompt = buildSystemPrompt(skill, skillReferences);
```

所以，从程序的角度来看，Skills 确实也是一种 Prompt，只不过，从更宏观的角度来看，Skills 让 Prompt 更模板化。

更有工程范。

## 09、ending

说回未央宫。

汉武帝听完东方朔对 Skills、MCP、Function Calling、RAG 等概念的详细解答，龙颜大悦：“妙哉！朕问了这么多，你竟对答如流。”

东方朔拱手道：“陛下谬赞。其实这些概念说难不难，关键是要理解它们各自解决什么问题。”

“哦？你且说说。”

东方朔捋了捋胡须，娓娓道来：

**Function Calling** 解决的是让 LLM 长出手脚的问题——模型能想，但不能做，Function Calling 就是那双能做事的手。

**MCP** 解决的是标准化的问题——以前每个工具都要单独对接，现在有了统一协议，一次对接，处处可用。

**Skills** 解决的是知识复用的问题——把最佳实践打包成模板，按需加载，既省 Token 又准确。

“行，你被录用了。”汉武帝大手一挥，“明日起，任侍中，随侍左右。”

东方朔躬身谢恩，心中暗喜：这 offer，稳了。

