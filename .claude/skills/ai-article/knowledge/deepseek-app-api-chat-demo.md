# DeepSeek 全家桶应用 API 与 chat-demo 源码调研

- **调研日期**：2026-11-14
- **仓库地址**：`https://github.com/deepseek-ai/chat-demo`
- **Commit**：`5d5dd754ebc1948e977ddb880a9eb5aa25f37b4c`
- **官方文档**：`https://api-docs.deepseek.com/zh-cn/news/news261113`、`https://api-docs.deepseek.com/zh-cn/guides/build_a_chatbot`

---

## 一、官方发布与全景能力概览（2026-11-13）

DeepSeek 于 2026-11-13 正式发布“全家桶应用 API”，将 DeepSeek App（含网页端）背后的完整应用层能力开放给开发者，分为两层能力：

1. **对话内置服务端工具与扩展参数**（基于 `deepseek-flash`，底层版本 `DeepSeek-V4.1-Flash-1017`，同时兼容 Anthropic `Messages` `/anthropic/v1/messages`、OpenAI `Responses` `/responses`、OpenAI `Chat Completions` `/chat/completions` 三大协议）：
   - **联网搜索（`deepseek_web_search` + 非思考模式）**：模型自动发起多查询词网页搜索或图片搜索（`image_search`），返回带 `citations` 角标的回答。
   - **深度思考搜索（`deepseek_web_search` + 思考模式）**：模型在多步推理中自主执行 `search`、`open_page`（打开搜索结果网页）、`find_in_page`（页内查找），单轮最多调用约 20 次工具。
   - **阅读链接（`deepseek_read_url`）**：自动识别最后一条用户消息中的前 10 个不同 URL，抓取网页正文，加密签名保存在 `signature` 字段，多轮回传时由服务端解密拼回上下文。
   - **文件输入（Files API + 对话引用 `file_id`）**：支持 `POST /files` 或 `POST /anthropic/v1/files`（需请求头 `anthropic-beta: files-api-2025-04-14`），提供三种 `purpose`：`user_data`（图片、txt/md/csv/代码、XLSX/XLS、EPUB/MOBI 转 Markdown，免费，单文件上限 32 MiB / 图片 64 MiB）、`text_recognition`（只提取文字，丢弃文档内图片，100 MiB / 1000 页）、`rich_layout_recognition`（图文混排解析，自动识别并裁切文档内图表按原位置与文字一起交给模型）。单请求最多引用 20 个文档、文字合计不超过 8 MiB。
   - **模型内容安全（`safety_check: {"level": "high"}`）**：审核输入与完整输出。输入违规返回 `400 Content Exists Risk`；输出违规在流式结束时返回拒答标识（Messages 为 `stop_reason: "refusal"`，Responses 为 `incomplete` + `content_filter`，Chat Completions 为 `finish_reason: "content_filter"`）。审核 Token 计入输出 Token（`safety_tokens`）。
   - **用户元信息标记（`latest_reminder`）**：紧贴 `user` 消息前传入 `<date>,<weekday>,<location>,<platform>,<language>`（如 `2026-11-09,星期一,新加坡,Web,中文`），同步给模型当前时间、地点与语言环境。
   - **会话标题（`title: {"enabled": true}`）**：回答结束时顺带在 `message_delta`（或 `delta.title`）返回简短标题，最多等待 5 秒，不额外计费。

2. **独立工具 API（`/v1/tools/*`，支持单独接入自有 Agent 或 RAG 工作流）**：
   - **Search API（`POST /v1/tools/search`）**：DeepSeek 自研搜索引擎，支持 `site:`、`-site:`、`lang:`、`after:`、`before:` 等操作符，返回 `rerank_score`（0~3 分，>=1.5 为优质结果）、`authority`（0~4，>=3 为极权威）、`snippet`（100~200 字前端摘要）、`summary`（600~800 字供模型阅读长摘要）及可选 `content` 正文。账号级限速 100 QPS。
   - **Fetch API（`POST /v1/tools/fetch`）**：抓取单个 URL 并转为 Markdown 正文返回。账号级限速 25 QPS。
   - **OCR API（`POST /v1/tools/ocr`）**：支持 PDF、Word、PPT 和图片（最大 100 MiB、1000 页），分 `text_recognition` 与 `rich_layout_recognition`，逐页识别结果保留 `<｜ref｜>` 与 `<｜box｜>[[x1, y1, x2, y2]]` 归一化坐标（0~1000），方便定位和裁图。账号并发上限 15。
   - **语音识别 ASR API（`POST /v1/tools/asr`）**：支持 21 种语言（含中文、粤语、英语、日语等）自动识别，接收 16-bit PCM WAV 或 Ogg Opus（最大 8 MiB、最长 120 秒），账号并发上限 50。
   - **语音合成 TTS API（`POST /v1/tools/tts` 与 `wss://api.deepseek.com/v1/tools/tts`）**：支持整段 HTTP 流式返回与 WebSocket 边生成边合成，内置 `stella`（海星，默认女声）和 `tide`（暗潮，男声）两种音色，10 种语言自动识别，默认 `filter_markdown: true`，输出 24 kHz 16-bit 单声道 PCM / WAV / Opus。账号并发上限 50。

3. **官方定价（全部基于源码与价格页核对）**：
   - `deepseek-flash`（`DeepSeek-V4.1-Flash-1017`，1M 上下文，最大 384K 输出，支持视觉）：
     - 缓存命中输入：空闲时段 `0.02` 元 / 百万 Tokens，高峰时段 `0.04` 元 / 百万 Tokens
     - 缓存未命中输入：空闲时段 `1` 元 / 百万 Tokens，高峰时段 `2` 元 / 百万 Tokens
     - 输出：空闲时段 `4` 元 / 百万 Tokens，高峰时段 `8` 元 / 百万 Tokens
   - 工具 API 定价：
     - 文字 / 图片搜索：`5` 元 / 千次（按查询词条数或图片区域数计，失败或无结果不计费）
     - 网页抓取（Fetch / 阅读链接 / 深度思考打开新网页）：`5` 元 / 千次
     - 文件解析 / OCR 文字识别：`1.5` 元 / 千页（按成功识别页数计，`user_data` 免费）
     - 语音识别（ASR）：刊例价 `0.78` 元 / 小时，限时 5 折 `0.39` 元 / 小时（按秒计费）
     - 语音合成（TTS）：刊例价 `3.0` 元 / 万字符，限时 5 折 `1.5` 元 / 万字符（汉字算 2 字符，其他算 1 字符）

---

## 二、`deepseek-ai/chat-demo` 开源实现核心细节

### 1. 聊天协议与请求组装（`src/services/api/client.ts`、`src/services/chat/store.ts`）
- **纯前端直连架构**：无应用后端，浏览器直接调用 `https://api.deepseek.com/anthropic/v1/messages`，API Key 存在 `localStorage`，会话与附件原件存在 `IndexedDB`。
- **按需注入 Beta Header**：`src/services/api/client.ts:133-158` 通过 `hasFile(body)` 检查 `messages` 是否包含 `image` 或 `document` 块，只有带文件或调 Files API 时才加 `'anthropic-beta': 'files-api-2025-04-14'`。
- **默认参数配置**（`src/services/chat/store.ts:35-58, 999-1010`）：
  - 默认模型 `MODEL = 'deepseek-flash'`，系统提示词 `SYSTEM_PROMPT = '该助手为DeepSeek，由深度求索公司创造。'`
  - 固定开启 `SAFETY_CHECK = { level: 'high' }`
  - `deepseek_read_url` 常驻开启，用户勾选联网搜索时追加 `deepseek_web_search`
  - 新会话无标题时自动挂载 `title: { enabled: true }`
- **`file_id` 失效自愈重试**（`src/services/chat/store.ts:44-46, 900-938`）：若服务端返回 `file_id` 过期或不存在，前端自动清空失效 `serverId`，从本地 `IndexedDB` 取出原件重新上传并按指数退避重试（最多 `FILE_RETRY_LIMIT = 2` 次，初始间隔 `1000` ms）。

### 2. SSE 解析、多轮上下文瘦身与 `signature` 还原（`src/services/chat/reply.ts`）
- **多轮回传裁剪策略**（`src/services/chat/reply.ts:197-284`）：
  - 历史轮次的 `thinking` 块、`citations` 数组以及所有搜索类工具块（`search`、`deep_search`、`image_search`、`deep_image_search`）在下一轮请求时全部剔除，不占后续上下文 Token。
  - 唯独 `kind === 'read_link'` 且带有效 `signature` 的 `server_tool_use` 与 `web_fetch_tool_result` 块原样回传。因为阅读链接拿到的网页正文不在 JSON 明文里返回（`data` 为空字符串），而是由服务端加密存在 `signature` 中，下一轮原样带回 `signature`，服务端才能解密还原网页内容并拼回上下文。
- **内容安全拒答（`refusal`）处理**（`src/services/chat/reply.ts:143-160`）：
  - 收到 `stop_reason: "refusal"` 时，`settleReply` 立即清空已经流式下发的 `thinking` 和 `text` 块，防止违规半截内容残留或进入下一轮上下文，前端替换为统一的拒答提示并禁用重新生成与朗读按钮。

### 3. 文件上传路由策略（`src/services/attachments.ts`）
- `LAYOUT_RECOGNITION_EXTS = new Set(['pdf', 'doc', 'docx', 'ppt', 'pptx'])` 自动走 `purpose: 'rich_layout_recognition'`（图文混排解析，单文件上限 `MAX_SIZE_MB = 64`）。
- 其余 980+ 种代码、文本、表格（`xls`/`xlsx`/`csv`）走 `purpose: 'user_data'`（免费转换，单文件上限 `MAX_USER_DATA_SIZE_MB = 32`）。
- 图片文件不传 `purpose`（默认按 `user_data` 处理，上限 64 MB）。
- 表单构造时严格将 `purpose` 放在 `file` 字段之前（`src/services/api/client.ts:103, 111-115`），因为服务端流式解析 multipart 时要求先读到 `purpose`。

### 4. Web Audio 语音采集与 24kHz PCM 流式无缝排程播放（`src/services/speech/`）
- **ASR 前端 16kHz WAV 内存编码**（`src/services/speech/recorder.ts:7-132`）：通过 `AudioContext({ sampleRate: 16000 })` 重采样单声道音频，串联 `AnalyserNode`（`fftSize = 512`）驱动移动端录音实时频谱，录满 `MAX_SECONDS = 120` 秒自动停止，在内存拼接 44 字节 RIFF/WAVE 头生成 `recording.wav`（120 秒仅约 3.84 MB）发往 `/v1/tools/asr`。
- **TTS 裸 PCM 字节流排程播放**（`src/services/speech/readAloud.ts:24-144`）：请求 `POST /v1/tools/tts`（`format: 'pcm', filter_markdown: true`），读取 24kHz 16-bit 单声道字节流；用 `rest` 缓存跨网络分片的奇数字节（防止 16-bit 采样点被切断产生爆音），转为 `Float32Array` 后通过 `AudioBufferSourceNode` 按 `nextTime` 时间轴精确排程无缝播放（首帧缓冲 `START_DELAY = 0.1` 秒）。

### 5. 跨端对话历史 ZIP 迁移与消息分支树还原（`src/services/chat/history/`、`src/services/chat/branches.ts`）
- **兼容网页端导出 ZIP**：支持直接导入从 DeepSeek 官方网页端导出的 `export_format_version: 3` ZIP 归档（`src/services/chat/history/importArchive.ts:75-159`），把官方的 `THINK`、`TOOL_SEARCH`、`READ_LINK`（保留 `signature`）等 `fragments` 转换为本地消息块，图片通过文件头前 16 字节魔数识别 MIME 存入 `IndexedDB`。
- **消息分支树算法**（`src/services/chat/branches.ts:18-35`、`src/services/chat/history/toLocal.ts:246-279`）：会话内所有分支扁平存在 `messages` 数组，靠 `parentId` 和 `selectedChildId` 维护树形结构；修改提示词或重新生成时只改父节点的 `selectedChildId`，切回旧分支时能完整恢复该分支原本选中的整条下游对话。
