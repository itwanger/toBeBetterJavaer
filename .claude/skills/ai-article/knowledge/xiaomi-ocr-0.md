# Xiaomi-OCR-0 调研缓存

调研日期：2026-11-02；源码仓库：`/Users/itwanger/Documents/GitHub/agent-llm-case/xiaomi-ocr-0/source`（上游 `https://github.com/SeerRay-Lab/Xiaomi-OCR-0`，commit `b1a9bb4c07060c453785e9151715ccda6b96f0b1`）；增量补充用 `git log --since="2026-11-02"`。
模型主页：https://huggingface.co/SeerRay-Lab/Xiaomi-OCR-0 ，ModelScope：https://www.modelscope.cn/models/SeerRay-Lab/Xiaomi-OCR-0 ，技术报告：https://arxiv.org/abs/2609.36136 ，官方在线 Space：https://huggingface.co/spaces/loongwayX/Xiaomi-OCR-0-demo ，社区 Ollama 包：https://ollama.com/longwayxu/xiaomi-ocr-0:bf16 。开源协议：Apache-2.0。

## 1. 背景与定位

- 发布时间与开源范围：小米（SeerRay-Lab / xiaomi-research）开源的统一 0.8B 视觉语言模型，面向文档解析与 OCR 相关理解。模型权重、推理与评测代码、本地浏览器 Demo、MCP 服务、Agent Skill 全部按 Apache-2.0 协议开源。
- 基座与训练路线：基于 `Qwen/Qwen3.5-0.8B-Base`，在约 1.7 亿条 OCR 中心样本上训练，依次经过 Q-Mask 文本锚定（视觉与文本位置对齐）、继续预训练（CPT）和混合任务强化学习（Mix-RL）。注：0.8B 为不含外部版面检测器的报告口径（Hugging Face SafeTensors 显示 0.98B params）。
- 四项核心能力：
  - 文档解析（Document Parsing）：识别文档页面或 PDF 输出结构化 Markdown，模型输出的 OTSL 紧凑表格标记由后处理转为 HTML 表格，公式转为 LaTeX。支持整页（`page`）与区域（`region`）两种模式。
  - 关键信息抽取（KIE）：按指定字段名（Schema）或通用键值对从票据、表单中提取 JSON。
  - 视觉问答（OCR-VQA）：针对文档图像中的文字与内容提问，返回简短准确的答案。
  - 本地 Agent 工具与浏览器 Demo：提供 `demo/server.py` 本地网页工作台与 `skills/xiaomi-ocr/mcp_ocr_server.py` 本地 MCP 服务。

## 2. Benchmark 跑分与训练机制（arXiv:2609.36136 & README）

- 文档解析评测（两阶段方法，PP-DocLayoutV3 阈值 0.25）：
  - OmniDocBench v1.6：得分 **96.83**（1B 以下模型第 1，全榜仅次于 4B 解析教师模型 96.9745 和 1.2B 的 TeleOCR 96.87；超过 0.9B 的 PaddleOCR-VL-1.6 的 96.33、0.8B 的 OvisOCR2 的 96.58、1.2B 的 MinerU2.5-Pro 的 95.75、0.9B 的 GLM-OCR 的 95.22）。
  - Real5-OmniDocBench：得分 **95.24**，排名 **第 1**（超过 PaddleOCR-VL-1.6 的 93.19、OvisOCR2 的 92.29）。
  - Wild-OmniDocBench：得分 **87.94**，排名 **第 2**（仅次于 1.2B TeleOCR 的 88.53，超过 OvisOCR2 的 87.91 和 PaddleOCR-VL-1.6 的 87.36）。
- 单项与专项评测：
  - 公式识别 UniMER-Test：**97.84**；表格识别 PubTabNet：**92.27**。
  - 历史手写与书法 Chronicles-OCR Mature Scripts（隶书、草书、行书、楷书）：**73**，与 Seed 2.0 Pro（72）相当。
  - 五项 OCR 中心 VQA 基准（DocVQA 93.1、InfoVQA 75.1、ChartQA 84.6、OCRBench 84.6、TextVQA 78.6）：平均分 **83.2**，以 0.8B 参数超过 Qwen3.5-0.8B（72.9）和 Qwen3.5-2B（80.9）。
- 1.7 亿样本构建（报告第 2 节）：
  - 8 模型专家池交叉投票（报告 2.1 节）：先用 PaddleOCR-VL-1.6、MinerU2.5-Pro、GLM-OCR、dots.mocr、HunyuanOCR-1.5、TeleOCR、OvisOCR2、Qianfan-OCR 共 8 个现成 OCR 模型各自识别一遍，结果一致的区域直接采纳。
  - 渲染比对修正 Render-Guided Refine-and-Judge（报告 2.1.2 节）：存在分歧的区域交给 `Qwen3.5-122B-A10B` 处理，把识别结果重新渲染成图片，与原图放在一起比对修正，验证预算最多 `T = 3` 轮。
- 强化学习规则打分 Mix-RL（报告 3.3 节）：
  - 按任务类型路由奖励函数：普通文本计算编辑距离相似度，表格计算 TEDS（树编辑距离相似度），公式计算 CDM（字符检测匹配），字段抽取（KIE）先校验 JSON 合法性再逐字段比对。
  - 严格格式约束：只要输出无法解析、违反格式要求或超长，一律记 `0` 分（Table 12 消融实验显示：0.8B 模型从 CPT 的 94.61、MOPD 的 95.88 提升到 Mix-RL 的 96.83）。

## 3. 本地部署与三套推理后端（README_zh.md / OLLAMA.md / INSTALL.md）

- 方式一：Ollama 实验性后端（适合 Mac / 轻量化本地体验）
  - 社区打包的 BF16 GGUF 模型 `longwayxu/xiaomi-ocr-0:bf16` 同时包含语言模型与视觉投影器（mmproj），体积约 `1.8 GB`（`1.6 GiB`），需使用支持 `qwen35` 架构的 Ollama（如 `0.35.0` 及以上，本地实测为 `0.40.13`）。
  - 仅执行 `ollama pull longwayxu/xiaomi-ocr-0:bf16` 不会自动配置图像缩放、非思考提示词和后处理，必须配合官方仓库的 `demo/server.py` 或 MCP 服务调用。
  - 启动本地浏览器 Demo 命令：
    ```bash
    git clone https://github.com/SeerRay-Lab/Xiaomi-OCR-0.git
    cd Xiaomi-OCR-0
    python3 -m venv .venv
    source .venv/bin/activate
    python -m pip install -r requirements.txt
    export XIAOMI_OCR_BACKEND=ollama
    export XIAOMI_OCR_MODEL=longwayxu/xiaomi-ocr-0:bf16
    export XIAOMI_OCR_LOCAL_URL=http://127.0.0.1:11434/v1
    python demo/server.py --port 8787
    ```
- 方式二：SGLang / vLLM 后端（适合生产级 NVIDIA GPU 环境，保证与 Hugging Face 原始权重精度一致）
  - SGLang 启动：`python -m sglang.launch_server --model-path SeerRay-Lab/Xiaomi-OCR-0 --host 127.0.0.1 --port 8000 --context-length 16384`
  - vLLM 启动：`vllm serve SeerRay-Lab/Xiaomi-OCR-0 --host 127.0.0.1 --port 8000 --trust-remote-code --max-model-len 16384`
- 区域模式可选依赖（`requirements-paddlex.txt`）：
  - 区域解析额外依赖 `PaddlePaddle`、`paddlex[cv]`、`shapely` 以及 `PP-DocLayoutV3` 版面检测权重（CPU 环境可设 `XIAOMI_OCR_LAYOUT_DEVICE=cpu`）。整页解析、KIE 和 VQA 不需要安装 PaddleX。

## 4. 源码核心实现细节（demo / skills / postprocess / evaluation_pipeline）

- 环回地址安全校验（`skills/xiaomi-ocr/mcp_ocr_server.py:61-67`）：`_local_url()` 强制检查 `XIAOMI_OCR_LOCAL_URL` 必须为 `http://127.0.0.1`、`localhost` 或 `::1`，拒绝非本机地址，确保文档数据不出本机。
- 图像与 PDF 预处理（`evaluation_pipeline/cropping.py:5-47`、`mcp_ocr_server.py:128-139, 224-251`）：
  - 图像归一化：`fit_image()` 将长边超过 `2048` 像素的图片按 `LANCZOS` 等比缩放至 `2048` 以内，统一转为 RGB PNG。
  - PDF 渲染：使用 `pypdfium2` 按默认 `150 DPI` 逐页渲染为图片（因 PDFium 非线程安全，通过 `_PDF_LOCK` 串行渲染页面，渲染完成后释放锁再并发请求模型），宽度超过 `2200` 像素时等比缩放到 `2200`。
- 整页模式与区域模式的工程分工（`mcp_ocr_server.py:38-59, 141-219`）：
  - 解码参数（`_chat()`）：`temperature=0`、`top_p=0.8`、`repetition_penalty=1.0`，并通过 `"chat_template_kwargs": {"enable_thinking": False}` 显式关闭思考模式，默认 `MAX_TOKENS = 4096`。
  - 整页模式（`mode="page"`）：整张图配文档级 Prompt 一次送入模型，适合场景文字、手写笔记、书法、古籍和版式不规则文档，避免切错区域边界丢失上下文。
  - 区域模式（`mode="region"`）：进程内调用 `PP-DocLayoutV3`（默认阈值 `0.3`，评测管线为 `0.25`）检测版面框，过滤掉 `skip` 和 `abandon`（页眉、页脚、页码、边注等），按区域类别分配专用 Prompt 和最大输出长度（`title: 256`、`text: 1024`、`table: 2048`、`formula: 512`、`figure: 256`），裁剪后通过 `ThreadPoolExecutor`（默认并发 `8`，Demo 默认 `16`，上限 `32`）并发请求模型，最后按检测器给出的阅读顺序拼装成完整 Markdown。若版面检测未返回有效区域，自动回退到 `page_fallback` 整页模式。
- OTSL 表格转换与后处理（`postprocess/otsl.py`、`postprocess/document.py`、`postprocess/region.py`）：
  - 为什么模型不直接输出 HTML？HTML 标签冗长且容易闭合错位，模型内部输出紧凑的 OTSL 标记：`<fcel>` 表示带文本单元格，`<ecel>` 表示空单元格，`<lcel>` 表示向左合并（`colspan`），`<ucel>` 表示向上合并（`rowspan`），`<xcel>` 表示双向合并，`<nl>` 表示行结束。
  - `postprocess/otsl.py` 将 OTSL 解析为二维网格并计算每个单元格的 `rowspan` 和 `colspan`，还原为标准 `<table>...</table>` HTML 嵌入 Markdown。
  - `postprocess/document.py:84-123` 中的 `finalize_document()` 依次执行三步：先用 `_clean_truncated_repeats()` 截断长文本（`>= 8000` 字符）尾部的周期性复读（保留一个周期），再由 `postprocess_math_delimiters()` 将 `\[...\]` 和 `\(...\)` 规范化为 `$$ ... $$` 和 `$ ... $`，最后将 OTSL 块转换为 HTML 表格。

## 5. Agent Skill 与 RAG 知识库接入

- Agent 一键安装与 MCP 挂载（`SKILL.md`、`skills/xiaomi-ocr/install.sh`）：
  - 把 `https://raw.githubusercontent.com/SeerRay-Lab/Xiaomi-OCR-0/main/SKILL.md` 发给 Codex、Claude Code 或 DeepSeek Harness，Agent 会执行 `npx skills add SeerRay-Lab/Xiaomi-OCR-0 --skill xiaomi-ocr --full-depth --global --agent <current-agent> --yes` 安装全局 Skill，再运行 `skills/xiaomi-ocr/install.sh` 创建独立 `.venv`、生成 `mcp-config.json` 并通过 `stdio` 协议注册 `xiaomi-ocr` MCP 服务。
  - 暴露 4 个标准 MCP 工具：`ocr_image`（图片解析）、`ocr_pdf`（PDF 解析）、`kie_image`（JSON 字段抽取）、`vqa_image`（文档图片问答）。
- 与企业级 RAG 知识库（如派聪明 PaiSmart）结合：
  - 扫描件、复杂跨行跨列表格和带公式的技术 PDF 用传统 Apache Tika 解析会丢失文字或打乱表格行列对应关系；接入 Xiaomi-OCR-0 作为解析前置层后，正文转为结构化 Markdown，跨行跨列表格转为带 `rowspan`/`colspan` 的 HTML，分块（Chunking）和混合检索时能完整保留表头与单元格语义。
