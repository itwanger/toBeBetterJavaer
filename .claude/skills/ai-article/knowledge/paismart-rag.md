# 派聪明 RAG 架构知识库

> 调研日期：2026-08-06
> 源码路径：/Users/itwanger/Documents/GitHub/PaiSmart
> 调研方式：Sub-agent 全量读源码

---

## 一、混合检索

### 检索流程

1. **向量化**：用户查询通过阿里 DashScope 的 text-embedding-v4 转成 2048 维向量
2. **KNN 召回**：ES KNN 搜索，召回窗口 = topK × 30（如 topK=5 则召回 150 条）
3. **权限过滤**：三级 OR 查询（用户私有 + 公开 + 组织级），组织标签支持层级继承（通过组织标签缓存实现）
4. **BM25 重排序**：在 KNN 候选集上做关键词匹配，KNN 权重 0.2，BM25 权重 1.0
5. **附加文件名**：从文件上传表关联文件名

### 降级策略

向量生成失败时自动降级为纯文本检索。

---

## 二、Embedding 配置

- API：阿里 DashScope（阿里云百炼）
- 模型：text-embedding-v4
- 维度：2048
- 批量大小：10 条/批
- 重试：3 次，指数退避，基数 1 秒
- Token 用量追踪：记录每次嵌入消耗

---

## 三、文档分块

### 分块策略

- 分块大小：512 字符
- 重叠大小：100 字符
- 最小块：100 字符（不足则合并）
- 切分逻辑：先按段落（`\n\n+`），长段落按句子，短块合并

### 父子文档层级

- 父 chunk：1,048,576 字节（1MB），流式解析处理防 OOM
- 子 chunk：上述 512 字符分块

### PDF 解析

- 引擎：LiteParse（CLI 工具）
- OCR：默认开启，语言 chi_sim+eng
- DPI：150
- 页码和锚点文本保留

---

## 四、ES 文档结构

```
id:          String (UUID)
fileMd5:     String (文件指纹)
chunkId:     Integer (块序号)
textContent: String (BM25 全文检索)
vector:      float[] (2048 维 Embedding)
modelVersion: String ("dashscope:text-embedding-v4:2048")
userId:      String (上传者)
orgTag:      String (组织隔离)
isPublic:    boolean (公开标记)
pageNumber:  Integer (PDF 页码)
anchorText:  String (页内定位)
```

索引名：knowledge_base

---

## 五、Agent 框架

### ReAct 循环

- 最大轮次：4
- 最大工具调用：8
- 最大补全 token：2000

### 工具清单

1. **search_knowledge**：混合检索，入参 query + topK（1-20，默认 5）
2. **generate_summary**：主题摘要，内部再调一次 DeepSeek 做摘要
3. **submit_feedback**：用户反馈，Redis Hash 存储
4. **knowledge_stats**：索引统计

### Prompt 构建

- 规则层：简体中文、结论先行、引用标注
- 知识优先指令：强制先调 search_knowledge
- 上下文注入：检索结果包在 `<<REF>>` 标记之间
- 历史窗口：最近 20 条消息

---

## 六、记忆系统

### 会话记忆

- Redis：`conversation:{conversationId}`，JSON 数组，最多 20 条，7 天过期
- MySQL：conversations 表永久存储，含引用映射 JSON

### 会话管理

- 每个会话有 user_id + conversation_id + title + status(ACTIVE/ARCHIVED)
- 用户可创建多个会话，按 conversation_id 隔离

### 引用溯源

每条回答记录引用映射：
```
{
  "1": {
    "fileMd5": "abc123",
    "fileName": "doc1.pdf",
    "pageNumber": 5,
    "anchorText": "Section 2.1",
    "retrievalMode": "HYBRID",
    "matchedChunkText": "...",
    "score": 0.85,
    "chunkId": 42
  }
}
```

### 用户反馈

- Redis Hash：`feedback:{userId}`
- 最近 5 条注入系统提示词

---

## 七、权限隔离

三级访问控制（ES bool should）：

1. userId == currentUserId（用户私有）
2. isPublic == true（公开）
3. orgTag IN 用户有效组织标签（组织级，支持层级继承）

---

## 八、关键配置值

```yaml
file.parsing.chunk-size: 512
file.parsing.overlap-size: 100
file.parsing.min-chunk-size: 100
file.parsing.parent-chunk-size: 1048576
embedding.api.model: text-embedding-v4
embedding.api.dimension: 2048
embedding.api.batch-size: 10
ai.generation.temperature: 0.3
ai.generation.max-tokens: 2000
ai.generation.top-p: 0.9
rate-limit.chat-message.max: 30/min
rate-limit.embedding-batch.minute-max: 60
rate-limit.embedding-batch.day-max: 2000
```

---

## 九、查询改写

派聪明**没有**显式的查询改写模块。查询优化由 LLM 在 ReAct 循环中隐式完成——模型根据上下文决定用什么 query 去检索。工具描述中强调"保留用户原话中的核心实体、缩写和限定词"。
