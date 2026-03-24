---
title: 狂揽35k+Star，从零手搓一个Claude Code，这个开源项目让我热血沸腾！
shortTitle: learn-claude-code测评
description: 从零到一教你构建Agent Harness，12层渐进式架构拆解Claude Code核心原理，35k+Star的硬核开源项目深度实测。
tag:
  - Claude Code
  - Agent
  - 开源项目
category:
  - AI
author: 沉默王二
date: 2026-03-21
---

大家好，我是二哥呀。

这几天，GitHub 上有个项目刷屏了。

learn-claude-code，35k+ Star，5.6k+ Fork，一个教你从零手搓 Claude Code 的开源教程。


![](https://cdn.paicoding.com/paicoding/7d43c21857ae2bbe7bdd2322a0c88eac.jpg)


说实话，看到这个项目的时候，我心里是有点激动的。

用了这么久 Claude Code，一直好奇它到底是怎么做到“你说一句话，它就能帮你改代码、跑命令、修 bug”的。现在终于有人把它拆开来讲了，而且是手把手教你从零实现。

这个项目的核心理念只有一句话：**The model is the agent. The code is the harness.**

用我蹩脚的英文翻译就是：模型是智能体，代码是工具层。

什么意思？Agent 不是你画的那些工作流，也不是你拖拽的那些节点。Agent 是那个被训练好的模型本身。你写的代码，只是给它提供工具、知识、权限、上下文的运行环境。

这篇我就带大家拆解一下这个项目，看看它到底教了什么，值不值得花时间去学。

## 01、项目到底在教什么

learn-claude-code 是一个渐进式的教学项目，从最基础的 Agent 循环开始，一层一层往上加能力，最终实现一个类似 Claude Code 的完整 Agent。

一共 12 个会话，对应 12 层架构：


![](https://cdn.paicoding.com/paicoding/fa69b4ce38b49e75f44b6615d31df1c4.png)


我来逐层解读一下：

**s01：Agent 循环**

最基础的一层。模型接收输入，生成输出，然后循环。这是所有 Agent 的起点，没有工具调用，没有上下文管理，就是一个纯粹的对话循环。

**s02：工具分发**

给模型加上工具。模型输出一个工具调用请求，系统解析并执行，然后把结果返回给模型。这是 Agent 从“聊天机器人”变成“能干活的人”的关键一步。

**s03：计划管理**

让模型学会规划。不是收到任务就直接干，而是先制定计划，把大任务拆成小任务，逐个执行。这层解决的是“复杂任务怎么拆解”的问题。

**s04：子代理**

引入子 Agent。主 Agent 可以把特定任务委托给子 Agent，子 Agent 有独立的上下文，执行完再把结果汇报回来。这层解决的是“任务分工”的问题。

**s05：按需技能加载**

动态加载技能文件。不是把所有工具都塞给模型，而是根据任务类型，按需加载相关的技能定义。这层解决的是“工具太多怎么办”的问题。

**s06：上下文压缩**

当对话历史太长时，自动压缩。不是简单截断，而是提取关键信息，保留重要的上下文。这层解决的是“token 不够用”的问题。

**s07：任务图**

把任务组织成有向无环图（DAG），支持并行执行。不是所有任务都要串行，有些可以同时跑。这层解决的是“效率”问题。

**s08：后台任务**

支持后台执行长任务。模型可以先启动一个任务，然后继续处理其他事情，等任务完成再回来处理结果。这层解决的是“等待”问题。

**s09：团队协作**

多个 Agent 协作。每个 Agent 有自己的角色和职责，通过消息传递协调工作。这层解决的是“复杂系统”的问题。

**s10：协议**

定义 Agent 之间的通信协议。不是随便发消息，而是遵循统一的格式和语义。这层解决的是“标准化”问题。

**s11：自主认领**

Agent 可以主动认领任务，而不是被动等待分配。这层解决的是“主动性”问题。

**s12：工作树隔离**

每个任务有独立的工作目录，互不干扰。这层解决的是“并发安全”问题。

看完这 12 层，你就会明白为什么 Claude Code 能做到“你说一句话，它就能帮你改代码、跑命令、修 bug”，不是魔法，是一层一层的能力叠加。

## 02、核心理念

这个项目最让我有启发的，不是具体的代码实现，而是它提出的“Harness Engineering”概念。

以前我们做 AI 应用，思路是：我要设计一个工作流，A 节点连 B 节点，B 节点连 C 节点，然后让模型在每个节点上干活。

![](https://cdn.paicoding.com/paicoding/c29818abfca0c12f05a993adca59a390.png)

这个项目告诉你：错了。

Agent 是模型本身。模型已经学会了怎么推理、怎么规划、怎么调用工具。你做的工作，不是替它规划，而是给它提供一个好的运行环境——工具、知识、权限、上下文。

这就像你雇了一个很厉害的员工。你不需要告诉他每一步怎么做，你需要做的是：给他配好电脑、给他开通系统权限、给他准备好文档资料、给他足够的信息支持。

然后让他自己干。


![](https://cdn.paicoding.com/paicoding/0d3ff4487c3dc64c3c724eb62c874022.png)


这个认知转变，对工程师的要求也变了。

以前你需要懂工作流编排、节点设计、状态管理。现在你需要懂的是：怎么设计好用的工具、怎么组织知识库、怎么管理权限边界、怎么优化上下文传递。

技能点完全不同。

## 03、实测：从 s01 开始跑一遍

光说不练假把式。我把项目 clone 下来，从 s01 开始跑了一遍。

推荐大家使用GitHub桌面版，非常方便。

![](https://cdn.paicoding.com/paicoding/18fac8e6024ba291b0f93742cbc3b3a6.png)

然后再教大家一个学习开源项目的快捷方式，直接进入到项目根目录，启动Claude Code。

>提示词：这项目我clone下来了，怎么从s01跑一遍

![](https://cdn.paicoding.com/paicoding/e81bd4a6a82479acaa680357473a361e.jpg)

看到没，Claude Code会教你一步步怎么做，甚至会帮你把环境搭建好。

按照他说的，直接打开 .env 文件，把我们的模型 API Key 放进去，我这里用的智谱GLM-5。

国内模型，学习开源项目还是绰绰有余的。

![](https://cdn.paicoding.com/paicoding/426acd75a8b2a3cab48f590d028619c2.png)

完事直接让Claude Code先帮我们踩坑一下，然后我们再按照正确的结果去执行。


![](https://cdn.paicoding.com/paicoding/9927b90a94b51293f9ac025e1b0978fc.png)

然后在终端尝试一下，OK，确认可以执行。后面我就不一一演示了，大家一定要手动去尝试下。

![](https://cdn.paicoding.com/paicoding/ffb416e61f5299fdff9a975ee5907e71.png)


### s01：最基础的 Agent 循环

s01 的代码非常简单，就是一个 while 循环：

```python
import anthropic

client = anthropic.Anthropic()

while True:
    user_input = input("You: ")
    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1024,
        messages=[{"role": "user", "content": user_input}]
    )
    print(f"Claude: {response.content[0].text}")
```

没有工具，没有上下文管理，就是纯粹的对话循环。跑起来就是一个普通的聊天机器人。你问它问题，它回答；你再问，它再答。

这个循环看起来简单，但它定义了 Agent 的基本形态：模型是核心，代码只是胶水。

### s02：工具分发机制

s02 开始有意思了。加上工具调用：

```python
tools = [
    {
        "name": "read_file",
        "description": "读取指定路径的文件内容",
        "input_schema": {
            "type": "object",
            "properties": {
                "path": {
                    "type": "string",
                    "description": "要读取的文件路径"
                }
            },
            "required": ["path"]
        }
    },
    {
        "name": "write_file",
        "description": "将内容写入指定路径的文件",
        "input_schema": {
            "type": "object",
            "properties": {
                "path": {"type": "string"},
                "content": {"type": "string"}
            },
            "required": ["path", "content"]
        }
    }
]
```

工具定义的格式遵循 Anthropic 的工具调用规范，包含 name、description、input_schema 三个字段。description 很关键，模型根据这个描述决定什么时候调用这个工具。

模型收到输入后，可以选择调用工具。系统解析工具调用请求，执行，然后把结果返回给模型：

```python
def process_tool_call(tool_name, tool_input):
    if tool_name == "read_file":
        with open(tool_input["path"], "r") as f:
            return f.read()
    elif tool_name == "write_file":
        with open(tool_input["path"], "w") as f:
            f.write(tool_input["content"])
        return "File written successfully"
    else:
        return f"Unknown tool: {tool_name}"

# 在主循环中处理工具调用
if response.stop_reason == "tool_use":
    tool_use = next(block for block in response.content if block.type == "tool_use")
    tool_result = process_tool_call(tool_use.name, tool_use.input)
    # 把工具结果返回给模型继续处理
```


![](https://cdn.paicoding.com/paicoding/67f23b3d708c757f7880deef8a330117.png)


这一层的核心是“工具分发”，模型决定调用什么工具，系统负责执行并返回结果。模型不需要知道工具怎么实现，只需要知道工具能干什么。

### s03：计划管理

s03 引入了计划管理。模型不是收到任务就直接干，而是先制定计划：

```python
PLAN_SYSTEM_PROMPT = """
你是一个任务规划助手。收到用户任务后，先制定执行计划，把大任务拆成小步骤。
输出格式：
1. 步骤一：xxx
2. 步骤二：xxx
...
"""

def create_plan(task):
    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        system=PLAN_SYSTEM_PROMPT,
        messages=[{"role": "user", "content": task}]
    )
    return parse_plan(response.content[0].text)

def execute_plan(plan):
    for step in plan:
        result = execute_step(step)
        print(f"执行: {step}")
        print(f"结果: {result}")
```

计划管理解决的是“复杂任务怎么拆解”的问题。比如用户说“帮我重构这个项目”，模型会先拆成：分析项目结构、识别需要重构的模块、制定重构方案、逐个执行重构。


![](https://cdn.paicoding.com/paicoding/9c319be7bedf5b6fe221dfeab36806b1.jpg)


### s04：子代理协作

跑到 s04，引入子 Agent 之后，整个系统开始有“团队协作”的味道了：

```python
class SubAgent:
    def __init__(self, name, system_prompt):
        self.name = name
        self.system_prompt = system_prompt
        self.context = []  # 独立的上下文
    
    def execute(self, task):
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            system=self.system_prompt,
            messages=self.context + [{"role": "user", "content": task}]
        )
        self.context.append({"role": "user", "content": task})
        self.context.append({"role": "assistant", "content": response.content[0].text})
        return response.content[0].text

# 主 Agent 可以委托任务给子 Agent
code_reviewer = SubAgent("code_reviewer", "你是一个代码审查专家...")
test_writer = SubAgent("test_writer", "你是一个测试用例编写专家...")

# 委托任务
review_result = code_reviewer.execute("审查这段代码：" + code)
test_cases = test_writer.execute("为这段代码写测试：" + code)
```

子 Agent 有独立的上下文，执行完再把结果汇报给主 Agent。这层解决的是“任务分工”的问题，不同类型的任务交给不同角色的子 Agent 处理。


![](https://cdn.paicoding.com/paicoding/63302ed5c2011f8139e1b41531f9e261.png)


一路跑下来，最大的感受是：每一层加的能力，都是解决一个具体的问题。不是堆功能，而是解决痛点。

上下文太长？加压缩。任务太复杂？加计划管理。需要并行？加任务图。等待太久？加后台任务。

每一层都有明确的“问题-方案”对应关系。

## 04、为什么这个项目值得学

讲真，市面上讲 Agent 的教程很多，但大部分要么太浅，要么太偏理论。

这个项目不一样。

**第一，它有完整的代码实现。**

不是光讲概念，每一层都有对应的代码，可以直接跑，可以直接改。你可以把 s01 的代码改成你自己的 Agent，然后一层一层往上加能力。

**第二，它是渐进式的。**

不是一上来就给你一个完整的系统，而是从最简单的循环开始，一层一层加。每一层的变化都清晰可见，学习曲线很平滑。

**第三，它有 Web 可视化平台。**

项目自带一个 Web 学习平台，可以在浏览器里体验每一层的效果，不用在终端里敲命令。


![](https://cdn.paicoding.com/paicoding/1a8c8ec01c59aacdb9f4a56adda5f3ab.jpg)


**第四，它有多语言文档。**

英文、中文、日文，文档齐全。对于中文开发者来说，读起来没有障碍。

**第五，它的理念是对的。**

“The model is the agent. The code is the harness.”这句话，把 Agent 开发的本质说透了。不是画工作流，不是拖节点，而是构建好的运行环境。

## 05、怎么把这个项目用到工作中

学完这个项目，你能得到什么？

不是又一个 demo 项目，而是一套完整的 Agent 开发方法论。

**如果你是做 AI 应用开发的**，这个项目能帮你理解 Agent 的底层原理。以后不管用什么框架——LangChain、Spring AI、还是自研——你都知道每一层在解决什么问题，为什么需要这一层。

**如果你是做技术选型的**，这个项目能帮你判断一个 Agent 框架是否完善。上下文压缩有没有？子代理支持吗？任务图能并行吗？一看就知道。

**如果你是想自己造轮子的**，这个项目就是一个完整的参考实现。从 s01 到 s12，每一层都有代码，可以直接借鉴。


![](https://cdn.paicoding.com/paicoding/ae00ed8b4313e541dc89b6bf05761c94.jpg)


我自己跑完之后，最大的收获是对“工具设计”的理解。

以前设计工具，就是写一堆函数，然后扔给模型用。现在明白了，工具设计是有讲究的：描述要清晰、参数要简洁、边界要明确、错误处理要完善。

这些细节，直接影响模型能不能用好你的工具。

## 06、简历包装建议

如果你跟着这个项目走了一遍，甚至自己实现了一个简化版的 Claude Code，那这个经历完全可以写到简历上。

项目名称：Mini Claude Code - 渐进式 Agent 框架

项目描述：基于 learn-claude-code 开源项目，从零实现一个类 Claude Code 的 AI 编程助手，支持工具调用、计划管理、子代理协作、上下文压缩等核心能力。

技术栈：Python、Anthropic API、FastAPI

核心职责：

- 实现 12 层渐进式 Agent 架构，从基础对话循环到完整的工具编排系统，代码量约 2000 行
- 设计工具分发机制，支持模型动态调用文件读写、命令执行等系统工具，工具调用成功率 95%+
- 实现子代理协作模式，主 Agent 可委托子 Agent 执行特定任务，支持独立上下文隔离
- 设计上下文压缩策略，通过关键信息提取将长对话压缩 60%，降低 token 消耗

这个项目经验，放在 AI 应用开发岗位上，绝对是加分项。

## ending

跑完这个项目，我最大的感受是：Agent 开发，没有想象中那么神秘。

它不是什么高深的黑科技，而是一层一层的能力叠加。从最简单的对话循环开始，加工具、加计划、加子代理、加压缩，每一层解决一个具体问题。

最终呈现出来的，就是 Claude Code 这样“能干活”的 Agent。

以前觉得 Claude Code 是魔法，现在知道它是工程。

以前觉得 Agent 开发离自己很远，现在知道从 s01 开始，一步一步就能走到 s12。

【**Agent 的本质不是工作流，而是模型 + 工具层。模型负责思考，工具层负责执行。**】

这个认知转变，对每一个想做 AI 应用开发的人来说，都是一次升级。

如果你也想深入理解 Agent 开发，这个项目绝对值得花时间走一遍。不只是看懂，更要动手跑一遍，改一遍，甚至自己实现一遍。

>GitHub 地址：https://github.com/shareAI-lab/learn-claude-code

有问题评论区见，我们下期见！
