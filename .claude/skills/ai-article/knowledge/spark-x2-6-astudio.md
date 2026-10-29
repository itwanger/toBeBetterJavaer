# 讯飞星火 X2.6 (Spark-X2.6) 与 AStudio (AstronStudio) 调研缓存

- 调研日期：2026-10-27；Case 复核与补跑：2026-10-28（平台参数仍来自 10 月 27 日资料）
- 本地路径：`/Applications/AStudio.app`（v3.5.5，Build `3.5.5.70`，commit `e5eb7eac84237e7268f39b42d8ecb57c6c224d46`）、`/Users/itwanger/.acode`
- 官方平台：`https://maas.xfyun.cn/overview`
- 飞书 Brief：`https://dcnvzpfulrqf.feishu.cn/wiki/UmFzwVMo7ijYQNkrPzIcnDh1nmg`
- 飞书 Case 库：`https://dcnvzpfulrqf.feishu.cn/wiki/Pr24we4AkitOTskk4nfcl186nWe`

## 1. 讯飞星火 X2.6 (Spark-X2.6) 模型核心参数与活动政策

- **发布时间**：2026-10-20 发布，2026-10-21 更新上线讯飞星辰 MaaS 平台（围绕 1024 开发者节节点）
- **模型架构**：采用 `293B-A30B` 参数的 MoE（混合专家）架构，总参数 293B，每 token 激活参数 30B
- **算力与安全**：基于全国产算力完成训练；提供专业安全防护，支持按任务场景自定义安全策略
- **上下文窗口**：拓展至 `1M`（100 万 Token），面向更长程、更复杂的任务场景，重点升级代码开发与智能体任务执行能力
- **1024 开发者节福利与 API 定价**（出处：`https://maas.xfyun.cn/overview` 及飞书 Brief 截图）：
  - **个人开发者免费福利**：无门槛免费领取 **10 亿 Tokens** 额度（开通后 31 天内有效，每个用户仅限领取一次）
  - **限时 6 折定价**：输入原价 `1.5` 元/百万 tokens，6 折后 **`0.9` 元/百万 tokens**；输出原价 `6` 元/百万 tokens，6 折后 **`3.6` 元/百万 tokens**
- **AStudio 内置模型矩阵**（出处：`~/.acode/acode/userdata/provider-model-catalog-v1.json`）：
  - `astronclaw-auto`（显示名称 `Auto`，默认开启 `high` 思考）
  - `spark-x2.6`（显示名称 `Spark-X2.6`，带“抢先体验”角标，支持 `none` / `high` 思考强度）
  - `spark-x2.6-4b`（显示名称 `Spark-X2.6-Lite`，带“限免”角标，支持 `none` / `high` / `max` 思考强度）
  - `spark-x2.5`（显示名称 `Spark-X2.5`）
  - 此外内置支持切换 `GLM-5.2`、`DeepSeek-V4-Pro`、`DeepSeek-V4-Flash`，并支持通过 `responses` 或 `chat_completions` 协议接入第三方自定义模型

## 2. AStudio (AstronStudio v3.5.5) 架构与底层机制

- **定位与内核**：桌面端智能体工作台与 AI 协同开发工具（Bundle ID `cn.xfyun.acode`）。底层打包了 `/Applications/AStudio.app/Contents/Resources/bin/acode-darwin-arm64`（版本 `astron-code 1.0.6-rc.7`），基于 Apache-2.0 协议的 OpenAI Codex CLI 深度定制，伴随内置 `ripgrep`（`acode-path/rg`）。
- **双模视图与工作区**：包含对话与通用办公创作的 Studio 视图、看板视图（`KanbanView`）、定时自动化任务视图（`automations`）、插件市场（`plugins`）、PR 审查视图（`PullRequestDockPane`）、代码编辑器与内置终端抽屉（`ThreadTerminalDrawer`）。支持 `local` 本地目录直改与 `worktree`（自动创建隔离 Git Worktree 分支并行执行任务）。
- **交互模式与权限分级**：
  - 交互模式：默认执行模式、规划模式（Plan Mode，限制当前轮次不修改文件，输出 `<proposed_plan>`）、原生目标模式（Native Goal Mode，设定 `objective` 与 `tokenBudget`，持久跟踪 `tokensUsed` 和 `timeUsedSeconds`）。
  - 三级运行权限（`runtimeMode.ts`）：`approval-required`（人工审批）、`auto`（调用内置 AI 审查器 `guardian_approval` 自动判断命令安全性）、`full-access`（完全放行）。
- **四大类内置动态工具与 MCP 网关**（本地监听 `http://127.0.0.1:53263/mcp`）：
  1. `astron_*` 平台级控制工具（34 个）：含多线程并发编排（`astron_create_threads`、`astron_wait_for_threads` 等）、定时与循环自动化（`astron_create_automation`，支持 `standalone` 新线程模式与 `heartbeat` 持续自恢复循环模式）、内置浏览器自动化（`astron_browser_*` 10 个工具）、图像 OCR（`astron_image_ocr`）。
  2. 网页抓取工具 `astron_web_fetch`：支持 `quality`（渲染 JS、复用内置浏览器登录态、自动滚动懒加载）与 `fast` 模式。
  3. 交付物管理工具 `acode_artifacts`：支持 `file`、`standalone-html`、`h5-bundle`、`multi-entry` 预览与打包。
  4. 办公文档工具 `office_tool` 与 `office_batch`：内置 `/Applications/AStudio.app/Contents/Resources/tools/office-tool/officecli`（基于 OfficeCLI 1.0.152），以 dynamicTools 直连操作 `.docx`、`.xlsx`、`.pptx`，`office_batch` 默认原子回滚，配合前端内置 Flyfish 渲染引擎（`docx/pptx/sheet/pdf.worker`）实现应用内实时预览。
- **默认启用插件**（`~/.acode/acode/acode-home-overlay/config.toml`）：`edge-cloud-collaboration-plugin`、`image-understanding`、`imagegen`、`qa-answer-contract`、`qichacha`、`sites-skills`、`tonghuashun`、`web-search`。

## 3. 飞书十大实测场景库摘要

以下为甲方材料摘要，不是本机验证结果；尤其 4,672 张 SLA 工单与 1M 火山审查不能写成本次亲测。

1. **代码-Web前端（纯代码单文件无外部图片）**：`3DRoom`（纯 CSS 3D 室内房间+WASD漫游+灯光阴影）、`3D魔方`（纯 CSS 3D 27块三阶魔方+打乱复原检测）、`飞行器`（Three.js 六自由度飞行动力学模拟器+毛玻璃 HUD）、`鹈鹕骑自行车`（纯 SVG+CSS 动画）、`中国国风画`（SVG+JS 水墨荷塘三条锦鲤 S 形游弋与涟漪）。
2. **代码-AI算法开发**：`客服工单库 SLA 分档重算与达成率报表`（不仅写 SQL 重算，还主动和旧系统逐单比对找出 4,672 张标反工单，定位出首响时间卡在阈值线上的 `<` 与 `<=` 边界漏判）。
3. **代码-PRD文档**：`宠物寄养门店管理后台原型`、`企业内部文件在线预览与权限管控`（一次交付需求规格书、权限矩阵、动态水印策略、安全方案、交互原型、操作手册 6 份产物）、`银行账务系统升级技术选型（Java vs Go）`。
4. **代码-Bug排查与定位**：`毛毛虫爬行动画代码审查`（修复身体坍陷成一团）、`火山喷发代码审查（1M长上下文）`（修复岩浆喷出后卡在火山口高度不顺山体流动的物理碰撞计算错误）。
5. **代码-脚本自动化**：`员工证件照批量处理`（Python 自动人脸居中裁剪 413×531 二寸白底、工号命名并生成缩略图 PDF 合集）。
6. **代码-项目级软开（零追问端到端）**：`车牌识别系统`、`AI 法律咨询助手`。
7. **浏览器自动化**：`携程上海到青岛直达高铁车次抓取与导出 Excel`、`Unsplash 搜索 mountain 提取前 10 张原图 URL 下载命名`。
8. **个人助理与任务规划**：`跨时区出差行程生成 .ics 日历文件（北京飞伦敦 UTC+1 跨日起降换算）`、`部门晨会群聊记录提取待办事项（过滤干扰项、标记负责人与时间戳）`。
9. **文档与办公处理**：`32页并购合同PDF去水印+转Word+提取结构化风险条款Excel`、`员工身份证PDF提取信息校验18位并计算年龄汇总Excel`、`制作明明集团员工入职须知Word文档（严格字号行距排版+自动生成插入公司Logo）`。
10. **金融研报**：`新能源汽车产业链盈利拐点与四种车企双轨估值研报`、`工商银行与同业龙头财务指标对比报告`。

## 4. 本机实测产物与 Token 数据

原始临时路径为 `/tmp/spark_x26_cases/`，已迁入 `/Users/itwanger/Documents/GitHub/agent-llm-case/spark/x2-6-review/`。调用来自 AStudio 随包 astron-code CLI，不等于在 AStudio GUI 执行或交付物面板预览。每轮实际配置、日志、失败快照与独立验证见该目录；模型自述不能替代验收。

- **Case 2（银行级核心账务系统升级技术选型：Java vs Go）**：
  - 产物路径：`/tmp/spark_x26_cases/case2_bank/银行级核心账务系统技术栈选型报告_Java_vs_Go.md`（297 行，21,380 字节）
  - 运行日志：`/tmp/spark_x26_cases/case2.log`
  - 真实消耗：`30,130` Tokens（`spark-x2.6` 高思考模式）
  - 核心结论：提出“Java 强一致内核 + Go 高性能外环”混合架构。复核发现权重合计只有 90%，原始报告的 100% 标签错误；原始加权和为 8.275 和 7.025，按现有权重归一化为约 9.19 和 7.81。属于模型主观评分，不是性能或生产验证。原稿保留，另有 `bank/evidence/verification.json`。
- **Case 3（部门晨会待办提取 + 明明集团员工入职须知 Word 文档）**：
  - 产物路径：`/tmp/spark_x26_cases/case3_office/晨会待办追踪表.md`、`/tmp/spark_x26_cases/case3_office/员工入职须知.docx`（38,661 字节）、生成脚本 `/tmp/spark_x26_cases/case3_office/make_doc.py`
  - 运行日志：`/tmp/spark_x26_cases/case3.log`
  - 真实消耗：`48,000` Tokens（`spark-x2.6` 高思考模式）
  - 核心亮点：准确识别并过滤了 `[09:20] 小刘“报价发邮箱”` 被 `[09:22] 老板“发群里，别发邮箱”` 纠正的无效动作。DOCX 通过 `officecli validate` 的 OpenXML schema 检查；2026-10-28 另读实际 XML 属性，标题、正文、行距、考勤加粗与页脚通过。没有做逐页渲染验收，不能由 schema 校验推导视觉排版合规。
- **飞书原始抓取文本与截图**：
  - Brief 全文与截图：`/tmp/feishu_1_full.txt`、`/tmp/feishu_brief_top.png`、`/tmp/feishu_brief_bottom.png`
  - 十大类 Case 全文：`/tmp/feishu_2_full.txt`

## 5. 2026-10-28 补跑与 GUI 接管复核

- 权威本地记录为 `agent-llm-case/spark/x2-6-review/QA_REPORT.md` 与 `gui/acceptance.md`，不要只引用模型自述或本缓存旧段落。
- 前半段 CLI 固定 `spark-x2.6`，先用 `none`；魔方和飞行器多次失败后改 `high`，验收者补充了具体矩阵、配平和动画要求，不属于一次成功或仅思考强度不同的对照。
- 7:13 在可见 AStudio 窗口选择 Spark-X2.6 / High，项目为 `spark/x2-6-review`，任务 `e6429598-6172-45ad-b9eb-3903d2492b94`；7:17 完成四项 GUI 复核，未修改已有实现。内置浏览器实际打开魔方与飞行器，验收者也点击验证了转层、复原和飞行暂停。
- 魔方：23 项状态 + 10 项 UI/动画检查通过。曾失败于矩阵/状态提交、面朝向、点击捕获和取消 Promise，不能写成首轮就稳定生成。
- 飞行器：21 项物理/控制 + 10 项 UI 检查通过。修复过 Three.js API、四元数、量纲、迎角与配平、本体轴、灵敏度。十秒巡航与三轮十秒是模拟时间，不是长期浏览器性能压测，仍为娱乐模型。
- SLA：自建 96 行 CSV，12 个等阈值差异；31 条额外秒级边界 + 4 条非边界差异通过。不是甲方 4,672 张工单，无旧系统源码。报告错误也经过两轮修复，不能声称主动定位了真实旧系统运算符。
- 火山：作者自建缺陷基线与 Spark 修复版，6 项独立检查通过；不是甲方原工程，没有测试 1M 上下文。
- 实现和测试未提交、未推送。文章新增的 Auto / High ESP32 钢琴段落保留，单独记录，不计入 Spark-X2.6 单模型成绩。

