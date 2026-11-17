# Qwen4-Max Release, Architecture & Live Delivery Plugin Knowledge Cache

> 核对日期：2026-11-16
> 一手信源：
> - X 官宣帖：`https://x.com/Alibaba_Qwen/status/2122148127520289151`
> - 千问官方技术博客：`https://qwen.ai/blog?id=qwen4-max`
> - 千问 AI 平台国内模型页：`https://www.qianwenai.com/models/qwen4-max`
> - 开源持续交付插件：`https://github.com/QwenLM/Qwen-Live-Delivery-Plugin`

## 1. 核心规格与定位
- **发布时间**：2026 年 11 月 16 日。
- **参数规模**：稀疏 MoE 架构，主干总参数 `2.4T`（2.4 万亿），每个 Token 激活 `71B`（710 亿，较 Qwen3.8-Max 减少约 `25%`），另有 `328B`（3280 亿）N-gram Embedding 参数。
- **上下文与多模态**：原生支持文本、图像、视频输入，文本输出；`1M` 上下文窗口（标准最大输入 `991K`、最大输出 `393K`；思考模式下最大输入 `983K`、最大输出 `393K`、最大思维链 `262K`）；默认开启推理，支持 `low`、`high`、`xhigh` 推理强度档位。
- **开源边界**：`Qwen4-Max` 本身为闭源商业 API 模型；官方明确同源技术路线的 Qwen4 系列小尺寸模型权重后续将陆续开源；同步开源 `QwenLM/Qwen-Live-Delivery-Plugin`（Apache-2.0）。

## 2. Qwen4 三项底层架构创新
1. **GDN + Qwen Sparse Attention（QSA）混合注意力（3:1 循环）**：每 4 层中，3 层 `Gated DeltaNet` 将历史信息压缩为固定大小的状态，1 层 `QSA` 通过轻量级 Indexer 以 block（块）为粒度选择相关上下文，降低百万长序列的 Attention 计算与索引开销。
2. **N-gram Embedding（328B，仅第 2 层生效）**：根据局部上下文查表，在模型第 2 层（Layer 2 only）提供局部 Token 模式表示，以较低额外计算开销扩展模型容量。
3. **Gated Residual（GR，四分支门控残差）**：将残差流扩展为 4 条并行分支，通过 `GR Read` 与 `GR Write` 动态读写门控增强跨层信息传递，2.4T 预训练全程平稳下降、未出现 loss spike；知识、代码、问答、STEM 四类内部评测 BPB 较 Qwen3.8-Max-Base 下降约 `5%–13%`。顶部配 `MTP Modules` 与 `Prediction Head`。

## 3. 官方 16 项基准跑分（对比 Qwen3.8-Max-0902 / Opus 5.5 / GPT-6.1-Sol / GPT-6-Astra / Kimi K3.1）
- **领先项**：
  - `DeepSWE v1.1`（Agentic coding）：**75.7**（第 1；GPT-6.1-Sol `75.2`、Kimi K3.1 `75.5`、Opus 5.5 `74.2`、GPT-6-Astra `74.1`、Qwen3.8-Max `69.3`）
  - `Agents' Last Exam v1.1`（长程高价值任务）：**46.7**（第 1；Opus 5.5 `43.4`、Kimi K3.1 `43.4`、GPT-6.1-Sol `42.6`、Qwen3.8-Max `27.9`）
  - `HLAB-Vals-1.1`（法律 Agent 工作）：**21.3**（第 1；Qwen3.8-Max `15.4`、Kimi K3.1 `11.7`、Opus 5.5 `9.2`、GPT-6-Astra `7.1`、GPT-6.1-Sol `6.3`）
  - `BioMysteryBench`（生物信息学研究）：**85.0**（第 1；GPT-6.1-Sol `84.4`、Qwen3.8-Max `84.1`、Opus 5.5 `81.9`）
  - `Work360`（阿里构建的 26 一级 / 182 二级 / 721 三级行业场景基准）：**52.69** vs Qwen3.8-Max **47.74**。
- **追赶/分化项**：
  - `APEX-Agents v1.1`：`72.1`（Opus 5.5 `73.5`）
  - `Automationbench-AA`：`72.5`（Kimi K3.1 `73.3`、Opus 5.5 `69.5`）
  - `CodeArena (Elo)`：`1750`（Opus 5.5 `1816`、GPT-6-Astra `1763`）
  - `AA-Briefcase v1.1 (Elo)`：`1686`（Opus 5.5 `1801`、Kimi K3.1 `1674`）
  - `JobBench`：`68.5`（Opus 5.5 `75.4`）
  - `HealthBench Professional`：`60.0`（GPT-6-Astra `66.0`、Opus 5.5 `59.9`）
  - `Humanity's Last Exam`：`51.7`（Opus 5.5 `59.8`、GPT-6.1-Sol `54.0`）
  - `Terminal-Bench 4.0`：`48.5`（Kimi K3.1 `67.2`、Opus 5.5 `59.6`、GPT-6-Astra `59.1`、Qwen3.8-Max `38.9`）
  - `ProgramBench`：`31.5`（Opus 5.5 `65.0`、GPT-6-Astra `55.0`）
  - `Chartography`：`54.2`（GPT-6-Astra `71.1`、Opus 5.5 `66.3`）
  - `Video-Index`：`68.1`（GPT-6-Astra `76.7`、Opus 5.5 `74.8`）

## 4. 官方实战 Case 汇总
- **Blender 3D 建模与 3D 打印**：串联几何建模、场景搭建、材质配置、灯光渲染并衔接 3D 打印实物。
- **专业引擎 3D 游戏开发**：驾驭 Unity、Unreal Engine、Godot，实机运行游戏并根据画面反馈调整镜头跟随、角色动作、命中打击感与光影节奏。
- **汽车制造（三丰智能装备、统联精密）**：二维图纸搭三维产线、PLC 虚拟调试、车门总成/摩擦轮建模与刀路生成，上机前发现过切/少切，单工件加工编程人工耗时由约 `475` 分钟降至 `24` 分钟（减少约 `95%`）。
- **金融、法律、医疗**：金融调用 `90` 个 MCP 工具做沪深 300 衍生品分析并输出带单元格溯源的 Excel 底稿与对齐 PPT；IPO 法律尽调将 `198` 份散乱底稿归入 `14` 个目录、识别“对赌协议恢复条款”，交付 `86` 页、`6` 万余字带底稿引用的报告；危重症医疗单次对话通读病历与 `1433` 张原始影像，多窗口并行读胸部 CT 识别出“双肺背侧实变”，四条处置建议与医嘱逐条对应。
- **前沿科研**：依托深度原理 Mira 干湿实验环境连续运行 `48` 小时，在 `270` 万分子空间做 4 轮闭环合成出新型数据中心冷却液实物样品；在深势科技 PharmMaster 平台围绕阿尔茨海默病 NLRP3 炎症小体调用工具 `454` 次、评估 `3239` 项指标、优化 `24` 个候选分子，RBFE 名义结合亲和力达专利起点的约 `3.6` 倍。

## 5. 开源插件 `Qwen-Live-Delivery-Plugin`（持续交付）
- 仓库：`https://github.com/QwenLM/Qwen-Live-Delivery-Plugin`（Apache-2.0，首发支持 Codex CLI，Node.js 22+）。
- 三大核心模块：
  1. **Live Delivery Skill（`$ld:go`）**：引导 Agent 先交付最小可用首版，再基于运行结果逐版规划、验证与交付。
  2. **Live Delivery MCP（`ld_begin`、`ld_publish`、`ld_status`、`ld_done`）**：管理交付计划与状态，保存每版完整快照并在本地浏览器工作台提供实时预览，支持最高 `7` 天时间预算。
  3. **Lifecycle Hooks**：在预算未耗尽且任务活跃时拦截提前结束回合；将用户在本地浏览器工作台追加的新需求在恢复轮次或工具调用后注入上下文。

## 6. API 定价、Token 效率与接入地址
- **国内千问 AI 平台（`qianwenai.com`）人民币定价**：输入 `¥10` / 百万 Tokens，输出 `¥30` / 百万 Tokens，隐式输入缓存命中 `¥0.5` / 百万 Tokens（5 分钟显式缓存创建 `¥12.5`，1 小时显式缓存创建 `¥20`，显式缓存命中 `¥0.5`）；TPM 限额 `5,000,000`。
- **国际站（`qwencloud.com`）美元定价**：输入 `$1.5` / M tokens，输出 `$4.5` / M tokens，隐式缓存命中 `$0.075` / M tokens（较 Qwen3.8-Max 降幅 `70%`）。
- **Token 效率与综合任务成本**：Work360 上 Xhigh/High 档 Token 消耗减少约 `24%` / `35%`，Terminal-Bench 4.0 上减少约 `48%` / `49%`；Work360 单任务平均费用由 `26.58` 元降至 `11.16` 元（降低 `58%`，国际口径降幅超 `60%`）。
- **接口地址**：OpenAI 兼容地址 `https://cn-beijing.maas.qianwenaiapi.com/compatible-mode/v1`（或百炼 `https://dashscope.aliyuncs.com/compatible-mode/v1`），模型名 `qwen4-max`；Token Plan 国内专属地址 `https://token-plan.cn-beijing.maas.aliyuncs.com/compatible-mode/v1`。

## 7. Qoder 系列原生协同与调用方式
- **“模型-框架-产品”协同设计**：千问团队与 Qoder 团队在 Qwen4-Max 研发阶段联合打磨模型、Agent 运行框架与产品，围绕 Office 文档、宣传网页（Landing Page）、个人网站（Portfolio）与小游戏（Mini Game）做端到端交付调优。
- **使用方式**：
  - **Qoder IDE / QoderWork**：在会话界面的模型选择器中原生点选 `Qwen4-Max` 切换使用。
  - **Qoder CLI**：输入 `/model` 调出模型选择器切换到 `Qwen4-Max`，或启动时传 `--model` 与 `--reasoning-effort`（`low` / `high` / `xhigh`）。
  - **BYOK（自带密钥）**：个人版支持在 `/model` 的 `Custom` 页签绑定自有千问 Token Plan 或按量 API Key，不额外收取路由费。
