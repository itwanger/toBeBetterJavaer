---
title: 400 行 Java 代码手搓 AI Agent，ReAct 循环 + Tool Call，我跑起来了
shortTitle: 手搓 Java Agent CLI
description: 从零开始用 Java 实现一个 AI Agent CLI，包含 ReAct 循环、工具调用、GLM-5.1 集成，手把手教你打造自己的 Claude Code。
tag:
  - Agent
  - Java
category:
  - AI
author: 沉默王二
date: 2026-04-18
---

大家好，我是二哥呀。

说实话，用 Claude Code、Qoder CLI 和 Codex 进行 AI编程也有一段时间了，我一直很好奇这玩意儿到底是怎么实现的。

它们看起来就是简单的命令行界面，但背后却能理解我的需求、调用各种工具、读写文件、执行命令，甚至能自己改代码。


![](https://cdn.paicoding.com/paicoding/2572cab331cda3e29ea1562d69d4b596.png)


这到底是什么原理？

今天这篇文章，我们就从零开始，用 Java 实现一个最简单的 Agent CLI。它能配置 GLM-5.1 的 API Key，能接收你的输入，有 Agent Loop，能 Tool Call，能根据上下文编程或输出内容。

一个超级简化版的 Claude Code，大概 400 行代码就能跑起来。


![](https://cdn.paicoding.com/paicoding/5360e88a2597afef625e8d46d84995c5.png)


## 01、Agent 的核心原理

在动手写代码之前，先搞清楚 Agent 到底是什么东西。

Agent 的核心就三个东西：**推理（Reasoning）**、**行动（Acting）**、**观察（Observing）**。这三者循环起来，就是著名的 **ReAct 模式**。


![](https://cdn.paicoding.com/paicoding/2b87dffe07ccdfb8256df30f8602806c.png)


流程是这样的：

1. 你输入一个任务
2. LLM 思考：我需要做什么？要不要调用工具？
3. 如果需要工具，LLM 输出工具调用请求
4. Agent 执行工具，拿到结果
5. 把结果喂给 LLM，继续思考
6. 重复 2-5，直到 LLM 觉得任务完成
7. 输出最终结果

这个循环就是 Agent 的灵魂。Claude Code、Qoder CLI、OpenClaw，本质上都是这个循环的不同实现。

## 02、项目结构

我们用 Java 17 + Maven 来搭建项目，不依赖任何第三方 Agent 框架，从零手写。

```
paicli/
├── pom.xml
├── .env
└── src/main/java/com/paicli/
    ├── cli/Main.java          # 入口类
    ├── agent/Agent.java       # Agent 核心（ReAct 循环）
    ├── llm/GLMClient.java     # GLM-5.1 API 客户端
    └── tool/ToolRegistry.java # 工具注册表
```


![](https://cdn.paicoding.com/paicoding/b8c0ed761ef81ea9e0bab6b93a41530e.png)


### Maven 依赖

我们需要这几个依赖：

- Jackson：处理 JSON
- OkHttp：发送 HTTP 请求
- SLF4J：简单日志

```xml
<dependencies>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>2.16.0</version>
    </dependency>
    <dependency>
        <groupId>com.squareup.okhttp3</groupId>
        <artifactId>okhttp</artifactId>
        <version>4.12.0</version>
    </dependency>
    <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-simple</artifactId>
        <version>2.0.9</version>
    </dependency>
</dependencies>
```

## 03、GLM-5.1 API 客户端

Agent 要能理解我们的提示词，得能调用大模型。所以我们需要先封装一个 `GLMClient`，支持普通对话和工具调用。

```java
public class GLMClient {
    private static final String API_URL = 
        "https://open.bigmodel.cn/api/paas/v4/chat/completions";
    private static final String MODEL = "glm-5.1";
    private final String apiKey;
    private final OkHttpClient httpClient;

    public GLMClient(String apiKey) {
        this.apiKey = apiKey;
        this.httpClient = new OkHttpClient.Builder()
            .connectTimeout(60, TimeUnit.SECONDS)
            .readTimeout(120, TimeUnit.SECONDS)
            .build();
    }
}
```

核心是 `chat` 方法，它接收消息历史和一个工具列表，返回 LLM 响应。

### 消息格式

GLM-5.1 的 API 兼容 OpenAI 格式，消息有三种角色：

- `system`：系统提示，定义 Agent 的身份和能力
- `user`：用户输入
- `assistant`：助手回复，可以包含文本或工具调用
- `tool`：工具执行结果

```java
public record Message(String role, String content, 
                      List<ToolCall> toolCalls, String toolCallId) {
    
    public static Message system(String content) {
        return new Message("system", content, null, null);
    }
    
    public static Message user(String content) {
        return new Message("user", content, null, null);
    }
    
    public static Message assistant(String content) {
        return new Message("assistant", content, null, null);
    }
    
    public static Message tool(String toolCallId, String content) {
        return new Message("tool", content, null, toolCallId);
    }
}
```

### 工具定义格式

要让 LLM 知道有哪些工具可用，需要按照特定格式定义工具：

```java
public record Tool(String name, String description, JsonNode parameters) {}
```

`parameters` 是一个 JSON Schema，描述工具需要哪些参数、参数类型是什么。比如 `write_file` 工具的参数定义：

```json
{
  "type": "object",
  "properties": {
    "path": {
      "type": "string",
      "description": "文件路径"
    },
    "content": {
      "type": "string",
      "description": "文件内容"
    }
  },
  "required": ["path", "content"]
}
```

LLM 会根据这个定义，在需要时生成正确的参数。

### 完整的 chat 方法

```java
public ChatResponse chat(List<Message> messages, List<Tool> tools) 
        throws IOException {
    // 构建请求体
    ObjectNode requestBody = mapper.createObjectNode();
    requestBody.put("model", MODEL);
    
    // 添加消息历史
    ArrayNode messagesArray = requestBody.putArray("messages");
    for (Message msg : messages) {
        ObjectNode msgNode = messagesArray.addObject();
        msgNode.put("role", msg.role());
        msgNode.put("content", msg.content());
        
        // 如果有工具调用，序列化 tool_calls
        if (msg.toolCalls() != null && !msg.toolCalls().isEmpty()) {
            ArrayNode toolCallsArray = msgNode.putArray("tool_calls");
            for (ToolCall tc : msg.toolCalls()) {
                ObjectNode tcNode = toolCallsArray.addObject();
                tcNode.put("id", tc.id());
                tcNode.put("type", "function");
                ObjectNode functionNode = tcNode.putObject("function");
                functionNode.put("name", tc.function().name());
                functionNode.put("arguments", tc.function().arguments());
            }
        }
        
        // 如果是工具结果，添加 tool_call_id
        if (msg.toolCallId() != null) {
            msgNode.put("tool_call_id", msg.toolCallId());
        }
    }
    
    // 添加工具定义
    if (tools != null && !tools.isEmpty()) {
        ArrayNode toolsArray = requestBody.putArray("tools");
        for (Tool tool : tools) {
            ObjectNode toolNode = toolsArray.addObject();
            toolNode.put("type", "function");
            ObjectNode functionNode = toolNode.putObject("function");
            functionNode.put("name", tool.name());
            functionNode.put("description", tool.description());
            functionNode.set("parameters", tool.parameters());
        }
    }
    
    // 发送 HTTP 请求
    RequestBody body = RequestBody.create(
        requestBody.toString(),
        MediaType.parse("application/json")
    );
    
    Request request = new Request.Builder()
        .url(API_URL)
        .header("Authorization", "Bearer " + apiKey)
        .post(body)
        .build();
    
    // 解析响应
    try (Response response = httpClient.newCall(request).execute()) {
        String responseBody = response.body().string();
        JsonNode root = mapper.readTree(responseBody);
        
        // 提取消息内容、工具调用、token 使用等信息
        // ...
    }
}
```

这里有个关键点：**工具调用**。

当 LLM 决定调用工具时，它会返回一个 `tool_calls` 数组，包含工具名和参数。Agent 执行完工具后，要把结果以 `tool` 角色的消息返回给 LLM，这样 LLM 才能继续思考。

这个往返过程是 ReAct 模式的核心。

LLM 不直接执行任务，而是通过工具调用来“行动”，然后观察行动结果，再决定下一步。这种分离能让 LLM 专注于推理，工具专注于执行，各司其职。

### 为什么用 GLM-5.1

选择 GLM-5.1 有几个原因：

第一，**工具调用支持好**。GLM-5.1 对 Function Calling 的支持非常稳定，能准确理解工具定义，生成正确的参数。

第二，**刚好我是max会员**。哈哈哈。

当然，这个框架很容易扩展到其他模型。只要模型支持 OpenAI 格式的 API，改一下 `API_URL` 和 `MODEL` 就能用。

## 04、工具注册表

Agent 要能干实事，得有一套工具。我们实现几个最基础的工具：

- `read_file`：读取文件
- `write_file`：写入文件
- `list_dir`：列出目录
- `execute_command`：执行 Shell 命令
- `create_project`：创建项目结构

```java
public class ToolRegistry {
    private final Map<String, Tool> tools = new HashMap<>();

    public ToolRegistry() {
        registerFileTools();
        registerShellTools();
        registerCodeTools();
    }
}
```

### 工具的定义

每个工具包含四部分：**名字**、**描述**、**参数定义**、**执行逻辑**。

```java
public record Tool(
    String name, 
    String description, 
    JsonNode parameters, 
    ToolExecutor executor
) {}

public interface ToolExecutor {
    String execute(Map<String, String> args);
}
```

描述和参数定义会传给 LLM，让 LLM 知道什么时候该用这个工具、需要什么参数。执行逻辑是实际的 Java 代码，负责完成任务。

### 文件操作工具

文件操作是最基础的能力。

`read_file` 让 Agent 能看代码，`write_file` 让 Agent 能写代码，`list_dir` 让 Agent 能浏览项目结构。

```java
private void registerFileTools() {
    // read_file 工具
    tools.put("read_file", new Tool(
        "read_file",
        "读取文件内容，用于查看代码、配置文件等",
        createParameters(new Param("path", "string", "文件路径", true)),
        args -> {
            String path = args.get("path");
            try {
                String content = Files.readString(Path.of(path));
                return "文件内容:\n" + content;
            } catch (Exception e) {
                return "读取文件失败: " + e.getMessage();
            }
        }
    ));
}
```

注意工具描述要写清楚用途。LLM 根据描述来判断什么时候该调用这个工具。描述越清晰，LLM 的判断越准确。

### Shell 命令工具

`execute_command` 是最强大的工具，让 Agent 能执行任意 Shell 命令。这也最危险，实际产品中需要加权限控制。

```java
tools.put("execute_command", new Tool(
    "execute_command",
    "执行Shell命令，用于编译、运行、Git操作等",
    createParameters(new Param("command", "string", "要执行的命令", true)),
    args -> {
        String command = args.get("command");
        try {
            ProcessBuilder pb = new ProcessBuilder("bash", "-c", command);
            pb.redirectErrorStream(true);
            Process process = pb.start();

            // 读取命令输出
            StringBuilder output = new StringBuilder();
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    output.append(line).append("\n");
                }
            }

            int exitCode = process.waitFor();
            return String.format("命令执行完成 (exit code: %d)\n%s", 
                exitCode, output);
        } catch (Exception e) {
            return "执行命令失败: " + e.getMessage();
        }
    }
));
```

这里用 `ProcessBuilder` 执行命令，捕获标准输出和错误码。Agent 能根据错误码判断命令是否成功，根据输出决定下一步行动。

每个工具包含三部分：**名字**、**描述**、**参数定义**、**执行逻辑**。描述和参数定义会传给 LLM，让 LLM 知道什么时候该用这个工具。

比如 `write_file` 工具的定义：

```java
tools.put("write_file", new Tool(
    "write_file",
    "写入文件内容",
    createParameters(
        new Param("path", "string", "文件路径", true),
        new Param("content", "string", "文件内容", true)
    ),
    args -> {
        String path = args.get("path");
        String content = args.get("content");
        Files.writeString(Path.of(path), content);
        return "文件已写入: " + path;
    }
));
```


![](https://cdn.paicoding.com/paicoding/adae07518e11e467810576be759166e3.png)


工具执行的结果会作为 `tool` 消息返回给 LLM，LLM 根据结果决定下一步行动。

### 参数定义的生成

工具参数用 JSON Schema 定义，我们写了个辅助方法 `createParameters` 来生成：

```java
private JsonNode createParameters(Param... params) {
    ObjectNode parameters = mapper.createObjectNode();
    parameters.put("type", "object");
    ObjectNode properties = parameters.putObject("properties");
    ArrayNode required = parameters.putArray("required");

    for (Param param : params) {
        ObjectNode prop = properties.putObject(param.name());
        prop.put("type", param.type());
        prop.put("description", param.description());
        if (param.required()) {
            required.add(param.name());
        }
    }

    return parameters;
}
```

这个方法接收可变参数，每个参数包含名字、类型、描述、是否必填。生成的 JSON Schema 符合 OpenAI 的函数调用规范，GLM-5.1 能正确解析。

### 工具的动态注册

现在的工具是硬编码的，实际可以做成动态注册。比如从配置文件加载、从插件系统加载、甚至让 Agent 自己定义工具。

动态注册的核心是统一的接口：

```java
public interface ToolProvider {
    List<Tool> getTools();
}
```

不同的实现可以从不同来源加载工具：

```java
// 从 JSON 配置文件加载
public class JsonToolProvider implements ToolProvider {
    private final String configPath;
    
    @Override
    public List<Tool> getTools() {
        // 解析 JSON，创建 Tool 实例
    }
}

// 从注解扫描加载
public class AnnotationToolProvider implements ToolProvider {
    private final String packageName;
    
    @Override
    public List<Tool> getTools() {
        // 扫描 @Tool 注解，创建 Tool 实例
    }
}
```

这种设计让工具系统变得可扩展。Claude Code 的 Skills 系统本质上就是动态工具注册的一种实现。

## 05、Agent 核心：ReAct 循环

现在来到最核心的部分——Agent 类。它实现 ReAct 循环，协调 LLM 调用和工具执行。

```java
public class Agent {
    private final GLMClient llmClient;
    private final ToolRegistry toolRegistry;
    private final List<Message> conversationHistory;
    private static final int MAX_ITERATIONS = 10;

    public Agent(String apiKey) {
        this.llmClient = new GLMClient(apiKey);
        this.toolRegistry = new ToolRegistry();
        this.conversationHistory = new ArrayList<>();
        
        // 添加系统提示
        conversationHistory.add(Message.system(SYSTEM_PROMPT));
    }
}
```

系统提示词告诉 LLM 它是谁、能干什么、有哪些工具可用：

```java
private static final String SYSTEM_PROMPT = """
    你是一个智能编程助手，可以帮助用户完成各种任务。

    你可以使用以下工具来完成任务：
    1. read_file - 读取文件内容
    2. write_file - 写入文件内容
    3. list_dir - 列出目录内容
    4. execute_command - 执行Shell命令
    5. create_project - 创建新项目结构

    当需要操作文件、执行命令或创建项目时，请使用工具调用。
    使用工具后，根据工具返回的结果继续思考下一步行动。

    请用中文回复用户。
    """;
```


![](https://cdn.paicoding.com/paicoding/8dc1bfee99150a5c98986fac1a494219.png)


ReAct 循环的核心逻辑：

```java
public String run(String userInput) {
    // 添加用户输入
    conversationHistory.add(Message.user(userInput));

    int iteration = 0;
    while (iteration < MAX_ITERATIONS) {
        iteration++;
        
        // 调用 LLM
        ChatResponse response = llmClient.chat(
            conversationHistory,
            toolRegistry.getToolDefinitions()
        );

        // 如果有工具调用
        if (response.hasToolCalls()) {
            // 记录助手消息
            conversationHistory.add(
                Message.assistant(response.content(), response.toolCalls())
            );

            // 执行每个工具调用
            for (ToolCall toolCall : response.toolCalls()) {
                String result = toolRegistry.executeTool(
                    toolCall.function().name(),
                    toolCall.function().arguments()
                );
                
                // 记录工具结果
                conversationHistory.add(
                    Message.tool(toolCall.id(), result)
                );
            }
            // 继续循环，让 LLM 根据结果继续思考
            continue;
        } else {
            // 没有工具调用，任务完成
            conversationHistory.add(
                Message.assistant(response.content())
            );
            return response.content();
        }
    }
    
    return "达到最大迭代次数限制";
}
```

这个循环的关键点是：**只要 LLM 还在请求工具调用，循环就继续**。只有当 LLM 直接回复内容（没有 tool_calls）时，才认为任务完成。

### 为什么需要循环

你可能会问：为什么不能一次调用就完成？为什么需要循环？

因为复杂任务往往需要多步操作。比如“创建一个 Spring Boot 项目并写一个 HelloController”：

1. 先调用 `create_project` 创建项目结构
2. 再调用 `write_file` 写 `pom.xml`
3. 再调用 `write_file` 写主类
4. 再调用 `write_file` 写 Controller
5. 最后调用 `execute_command` 编译验证

每一步都依赖前一步的结果。LLM 需要根据上一步的结果决定下一步做什么，这就需要循环。

### 防止无限循环

循环必须有终止条件，否则可能陷入死循环。我们设置了 `MAX_ITERATIONS = 10`，超过就强制退出。

实际产品中，还需要其他保护机制：

- **时间限制**：单次任务不能超过 N 秒
- **Token 限制**：总 Token 消耗不能超过上限
- **用户确认**：危险操作前询问用户
- **状态检测**：检测循环是否陷入重复模式

### 上下文管理

对话历史 `conversationHistory` 是 Agent 的“记忆”。它包含完整的对话过程，让 LLM 能了解任务的上下文。

但上下文不能无限增长。当历史太长时，需要：

- **压缩**：把早期对话压缩成摘要
- **截断**：丢弃最旧的对话
- **向量化**：把历史存入向量数据库，按需检索

Claude Code 的上下文管理非常复杂，能处理几十万字的代码库。我们的简化版用简单列表，但原理是一样的。

### 错误处理

实际运行中会有很多错误：网络超时、API 限流、工具执行失败等。需要完善的错误处理：

```java
try {
    ChatResponse response = llmClient.chat(conversationHistory, tools);
    // ...
} catch (IOException e) {
    // 网络错误，可以重试
    if (retryCount < MAX_RETRIES) {
        retryCount++;
        continue;
    }
    return "网络错误: " + e.getMessage();
} catch (Exception e) {
    // 其他错误，返回错误信息
    return "执行错误: " + e.getMessage();
}
```

错误信息也要传给 LLM，让 LLM 知道发生了什么，可能的话给出修复建议。

## 06、交互式 CLI

最后，我们需要一个交互式命令行界面，让用户能输入指令、看到结果。

```java
public class Main {
    public static void main(String[] args) {
        printBanner();
        
        // 加载 API Key
        String apiKey = loadApiKey();
        if (apiKey == null || apiKey.isEmpty()) {
            System.err.println("❌ 错误: 未找到 GLM_API_KEY");
            System.exit(1);
        }
        
        // 创建 Agent
        Agent agent = new Agent(apiKey);
        
        // 交互式循环
        Scanner scanner = new Scanner(System.in);
        System.out.println("💡 提示: 输入 'clear' 清空历史, 'exit' 退出\n");
        
        while (true) {
            System.out.print("👤 你: ");
            String input = scanner.nextLine().trim();
            
            if (input.isEmpty()) continue;
            if (input.equalsIgnoreCase("exit")) break;
            if (input.equalsIgnoreCase("clear")) {
                agent.clearHistory();
                System.out.println("🗑️ 历史已清空\n");
                continue;
            }
            
            // 运行 Agent
            String response = agent.run(input);
            System.out.println("🤖 Agent: " + response + "\n");
        }
    }
}
```

### 用户体验设计

CLI 虽然简单，但用户体验很重要。我们加了几个细节：

**启动 Banner**：让程序看起来更专业

```java
private static void printBanner() {
    System.out.println("""
        ╔══════════════════════════════════════════════════════════╗
        ║   ██████╗  █████╗ ██╗      ██████╗██╗     ██╗            ║
        ║   ██╔══██╗██╔══██╗██║     ██╔════╝██║     ██║            ║
        ║   ██████╔╝███████║██║     ██║     ██║     ██║            ║
        ║   ██╔═══╝ ██╔══██║██║     ██║     ██║     ██║            ║
        ║   ██║     ██║  ██║███████╗╚██████╗███████╗██║            ║
        ║   ╚═╝     ╚═╝  ╚═╝╚══════╝ ╚═════╝╚══════╝╚═╝            ║
        ║              简单的 Java Agent CLI v1.0.0                ║
        ╚══════════════════════════════════════════════════════════╝
        """);
}
```

**Emoji 提示**：让输出更易读

- `👤 你:` 表示用户输入
- `🤖 Agent:` 表示 Agent 回复
- `🔧 执行工具:` 表示正在调用工具
- `📊 Token使用:` 显示资源消耗
- `🗑️` `✅` `❌` 等表示状态

**帮助信息**：启动时显示可用命令

```
💡 提示:
   - 输入你的问题或任务
   - 输入 'clear' 清空对话历史
   - 输入 'exit' 或 'quit' 退出
```

这些小细节让 CLI 用起来更舒服。


![](https://cdn.paicoding.com/paicoding/953fc7e0ad452b60e6fc3084f0899095.png)


API Key 从 `.env` 文件或环境变量加载：

```java
private static String loadApiKey() {
    // 先尝试从当前目录读取 .env
    File envFile = new File(".env");
    if (envFile.exists()) {
        return readApiKeyFromFile(envFile);
    }
    
    // 再尝试从环境变量读取
    return System.getenv("GLM_API_KEY");
}
```

## 07、运行测试

编译打包：

```bash
mvn clean package
```

创建 `.env` 文件：

```
GLM_API_KEY=your_api_key_here
```

运行：

```bash
java -jar target/paicli-1.0-SNAPSHOT.jar
```


![](https://cdn.paicoding.com/paicoding/6424ff20b7456c2ebc39fbd139711fd9.png)


试试这些指令：

### 示例 1：创建项目

```
👤 你: 创建一个Java项目叫demo

🤔 思考中...

🔧 执行工具: create_project
   参数: {"name":"demo","type":"java"}
   结果: 项目已创建: demo (类型: java)

📊 Token使用: 输入=156, 输出=89

🤖 Agent: 已成功创建 Java 项目 "demo"，包含基本的 Maven 结构。
```


![](https://cdn.paicoding.com/paicoding/d8d30f3edbe6db115fa3e4de3e5be1ff.png)


Agent 识别出你的意图是创建项目，调用了 `create_project` 工具，传入项目名和类型。工具执行成功后，Agent 给你确认信息。


![](https://cdn.paicoding.com/paicoding/bfb98971b5ac4f4e9fcf7c98a5567834.png)


### 示例 2：多步任务

再来一个复杂点的：

```
👤 你: 在demo/src/main/java/com/example下创建一个Hello.java，
     输出Hello World

🤔 思考中...

🔧 执行工具: write_file
   参数: {
     "path": "demo/src/main/java/com/example/Hello.java",
     "content": "package com.example;\n\npublic class Hello {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}"
   }
   结果: 文件已写入: demo/src/main/java/com/example/Hello.java

📊 Token使用: 输入=312, 输出=156

🤖 Agent: 已创建 Hello.java 文件，包含 main 方法输出 "Hello World"。
```

这个任务只需要一步，但 Agent 自动处理了路径和包名。你不需要告诉它具体怎么写，只需要描述需求。


![](https://cdn.paicoding.com/paicoding/e02a3c0f0929b07eb21282b95bd42893.jpg)


### 示例 3：读取和修改

试试读取文件再修改：

```
👤 你: 读取 demo/src/main/java/com/example/Hello.java 的内容，
     然后把输出改成 "Hello PaiCLI"

🤔 思考中...

🔧 执行工具: read_file
   参数: {"path": "demo/src/main/java/com/example/Hello.java"}
   结果: 文件内容:
   package com.example;
   
   public class Hello {
       public static void main(String[] args) {
           System.out.println("Hello World");
       }
   }

🔧 执行工具: write_file
   参数: {
     "path": "demo/src/main/java/com/example/Hello.java",
     "content": "package com.example;\n\npublic class Hello {\n    public static void main(String[] args) {\n        System.out.println(\"Hello PaiCLI\");\n    }\n}"
   }
   结果: 文件已写入: demo/src/main/java/com/example/Hello.java

📊 Token使用: 输入=523, 输出=234

🤖 Agent: 已将输出从 "Hello World" 修改为 "Hello PaiCLI"。
```


![](https://cdn.paicoding.com/paicoding/7513669e3ada75edd4e56ddd2d926207.png)


这个任务有两步：先读取，再修改。Agent 自动规划了执行顺序，先调 `read_file` 获取内容，再调 `write_file` 写入修改后的内容。

### 示例 4：执行命令

试试执行 Shell 命令：

```
👤 你: 进入demo目录，编译并运行Hello.java

🤔 思考中...

🔧 执行工具: execute_command
   参数: {"command": "cd demo && javac src/main/java/com/example/Hello.java"}
   结果: 命令执行完成 (exit code: 0)

🔧 执行工具: execute_command
   参数: {"command": "cd demo && java -cp src/main/java com.example.Hello"}
   结果: 命令执行完成 (exit code: 0)
   Hello PaiCLI

📊 Token使用: 输入=678, 输出=312

🤖 Agent: 编译成功，运行输出: Hello PaiCLI
```

Agent 自动分解任务：先编译，再运行。并且能根据命令输出判断执行结果。


![](https://cdn.paicoding.com/paicoding/7bfbacddd6ea734cb7f5bbcf2570e13e.jpg)


## 08、深入理解 ReAct 模式

我们的 PaiCLI 实现了最基础的 ReAct 循环，但 ReAct 本身有很多变种和优化。理解这些，才能做出更强大的 Agent。

### ReAct 的三种模式

**基础 ReAct**：我们实现的就是这种模式。LLM 每一步都输出 Thought + Action，然后执行 Action，观察结果，继续循环。

```
Thought: 用户要我创建一个 Java 项目，我需要用 create_project 工具
Action: create_project({"name": "demo", "type": "java"})
Observation: 项目已创建
```

**Plan-and-Execute**：先让 LLM 制定完整计划，然后按步骤执行。适合复杂多步任务。

```
Plan:
1. 创建项目结构
2. 写 pom.xml
3. 写主类
4. 写测试类

然后按顺序执行每一步，不再反复询问 LLM。
```

这种模式效率更高，因为减少了 LLM 调用次数。但缺点是灵活性差，如果某一步出错，需要重新制定计划。

**Reflexion**：在 ReAct 基础上增加了自我反思。Agent 会回顾自己的行动，总结成功经验和失败教训，保存到记忆中。下次遇到类似任务，就能做得更好。

```
Thought: 刚才创建项目时我没有检查目录是否存在，导致可能覆盖已有文件。下次应该先 list_dir 检查。
```

这种模式让 Agent 具备学习能力，越用越聪明。

### Tool Use 的进化

我们的工具调用是同步的：调用工具，等待结果，继续下一步。但现实中很多工具是异步的。

**异步工具调用**：比如编译一个大型项目可能需要几分钟，Agent 不应该干等着。可以提交任务后去做其他事，等结果回来再继续。

```java
// 提交异步任务
String taskId = tool.executeAsync(args);

// 做其他事...

// 轮询检查结果
while (!tool.isComplete(taskId)) {
    Thread.sleep(1000);
}
String result = tool.getResult(taskId);
```

**并行工具调用**：有些任务可以并行执行。比如同时读取多个文件、同时执行多个测试。

```java
List<CompletableFuture<String>> futures = toolCalls.stream()
    .map(tc -> CompletableFuture.supplyAsync(
        () -> executeTool(tc)
    ))
    .toList();

// 等待所有工具执行完成
List<String> results = futures.stream()
    .map(CompletableFuture::join)
    .toList();
```

LLM 可以同时请求多个工具调用，Agent 并行执行，最后把结果一起返回。这能大幅提升效率。

### 上下文工程的进阶

我们的上下文管理很简单，就是消息列表。但真正的 Agent 需要更复杂的上下文工程。

**分层上下文**：把上下文分成不同层次：

- **系统层**：Agent 的身份、能力、约束
- **会话层**：当前对话的历史
- **任务层**：当前任务的相关信息
- **工具层**：工具的定义和示例

不同层次有不同的更新频率和保留策略。系统层几乎不变，任务层经常更新。

**向量化检索**：当上下文太长时，可以把它存入向量数据库。需要时根据查询检索相关片段。

```java
// 存入向量库
vectorStore.add("文件:Hello.java", embedding(content));

// 检索相关上下文
List<String> relevant = vectorStore.search(
    embedding("Hello 类在哪里定义？"), 
    topK: 3
);
```

这让 Agent 能处理海量信息，比如整个代码库。

**结构化输出**：强制 LLM 按特定格式输出，方便解析。

```json
{
  "thought": "我需要创建项目",
  "action": {
    "tool": "create_project",
    "args": {"name": "demo", "type": "java"}
  },
  "confidence": 0.95
}
```

用 JSON Schema 约束输出，比解析自然语言更可靠。

### 安全与沙箱

我们的 Agent 直接执行 Shell 命令，这在生产环境非常危险。真正的 Agent 需要安全机制。

**权限控制**：不同操作需要不同权限级别。

- Level 1: 只读操作（read_file, list_dir）
- Level 2: 写操作（write_file）
- Level 3: 执行操作（execute_command）

用户可以为不同任务设置权限级别，防止误操作。

**沙箱执行**：在隔离环境中执行危险操作。

```java
// 在 Docker 容器中执行命令
ProcessBuilder pb = new ProcessBuilder(
    "docker", "run", "--rm", "-v", workDir + ":/work",
    "sandbox-image", "bash", "-c", command
);
```

即使命令有问题，也不会影响宿主机。

**人工确认**：危险操作前询问用户。

```
🤖 Agent: 我要执行命令: rm -rf /，确认吗？ [y/N]
👤 你: n
🤖 Agent: 操作已取消
```

Claude Code 就有这种机制，执行 `rm` 等危险命令前会要求确认。

### 从 PaiCLI 到生产级 Agent

我们的 400 行代码是个起点，要变成生产级产品，还需要：

**可观测性**：记录完整执行日志，方便调试和审计。

```java
logger.info("[Agent] 开始任务: {}", task);
logger.info("[Agent] 调用工具: {} 参数: {}", toolName, args);
logger.info("[Agent] 工具结果: {}", result);
```

**持久化**：对话历史和执行状态保存到数据库，支持断点续传。

**多用户**：支持多个用户同时使用，会话隔离。

**插件系统**：动态加载工具，用户可以自己扩展。

**Web 界面**：除了 CLI，还要提供 Web UI，更友好的交互。

这些都是 PaiCLI 正在做的方向。从简单的 CLI 到完整的产品，需要大量的工程工作，但核心原理不变：ReAct 循环 + 工具调用 + 上下文管理。

理解了这个核心，再看任何 Agent 框架，都能快速上手。因为万变不离其宗，都是在这些基础之上的扩展和优化。

## 09、扩展思路

这个基础框架可以往很多方向扩展：

**增加工具**：可以接入更多 API，比如搜索、数据库、Git 操作等。

**改进上下文**：现在的上下文是简单列表，可以实现更智能的上下文压缩和召回。

**多 Agent 协作**：可以设计多个 Agent，每个负责不同领域，通过消息协作。

**图形界面**：可以用 JavaFX 或 Swing 做个简单 GUI，体验会更好。


![](https://cdn.paicoding.com/paicoding/3a031c3a8238c4ca92e0832434fe1c57.jpg)


## ending

从零实现一个 Agent CLI，最核心的收获是理解 **ReAct 模式**。

推理、行动、观察，这三步循环起来，Agent 就能完成复杂任务。LLM 负责思考，工具负责执行，Agent 框架负责协调。

我们写的这 400 行代码，虽然简单，但包含了 Agent 的所有核心要素：

- LLM 调用
- 工具注册和执行
- ReAct 循环
- 上下文管理

**【理解原理比会用工具更重要。】**

当你明白 Agent 是怎么工作的，再用 Claude Code、Qoder CLI、OpenClaw 时，就能更好地理解它们的行为，也能更好地控制它们。


![](https://cdn.paicoding.com/paicoding/c8f8ed435012eabc686868e46227cdc1.png)


代码已开源在 GitHub：`github.com/itwanger/paicli`，欢迎 Star 和 PR。如果有问题，也可以在评论区交流，我会尽量回复。

希望这篇文章对你有帮助，我们下期见。

## 简历怎么写

**PaiCLI Agent 项目（第1期）| 2025.01 - 2025.01 | Agent开发**

**项目描述**：从零实现一个 Java 版 Agent CLI，支持 ReAct 和 Tool Call，能根据自然语言指令完成文件操作、代码生成和命令执行。

**技术栈**：Java 17、Maven、OkHttp、Jackson、GLM-5.1

**核心职责**：
- 基于 Qoder CLI/Codex/Claude Code从零搭建 Agent CLI 项目，实现 ReAct（思考-行动-观察）核心循环，支持最多 10 轮复杂任务
- 使用 OkHttp 封装 GLM-5.1 Coding Plan 客户端，实现支持 Tool Call 的消息序列化与解析，能够处理 system/user/assistant/tool 四种消息角色
- 设计 ToolRegistry 工具注册表，实现 read_file、write_file、list_dir、execute_command、create_project 五个内置工具，支持 JSON Schema 参数定义
- 实现交互式 CLI 界面，支持 API Key 从 .env 文件和环境变量自动加载，提供 clear、exit 等命令管理对话历史

