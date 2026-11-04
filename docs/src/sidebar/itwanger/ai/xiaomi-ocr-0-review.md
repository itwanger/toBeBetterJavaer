---
title: 小米真顶啊，Xiaomi-OCR-0 正式开源。
shortTitle: Xiaomi-OCR-0 开源与实测
description: 小米正式开源 0.8B 视觉文档解析模型 Xiaomi-OCR-0，OmniDocBench v1.6 得分 96.83。本文详解 Ollama 本地部署、整页与区域模式源码机制、1.7 亿多模型交叉标注、强化学习规则打分及 Agent MCP 与 RAG 知识库接入实战。
keywords:
  - Xiaomi-OCR-0
  - 小米开源
  - 文档解析
  - Ollama
  - RAG知识库
tag:
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-11-02
---

大家好，我是二哥呀。

做过 RAG 知识库或者文档处理的小伙伴应该都清楚。

纯文本的 PDF 用 Apache Tika 就能应付，可一旦遇到扫描件、带合并单元格的财务报表、学术论文或者密密麻麻的数学公式，解析出来的文本就经常出错，喂给大模型之后检索出来的效果就很差。

10 月 30 日，小米开源了文档解析与 OCR 视觉语言模型 `Xiaomi-OCR-0`。

![](https://cdn.paicoding.com/stutymore/xiaomi-ocr-0-20261031122851.png)

这个模型只有 `0.8B` 参数，在权威文档解析评测集 OmniDocBench v1.6 上拿到了 `96.83` 分（在 1B 以下模型中排第一），Real5-OmniDocBench 更是拿到了 `95.24` 分的全榜第一。

更良心的是，小米这次把模型权重、推理与评测代码、本地浏览器工作台、MCP 服务和 Agent Skill 全部按 Apache-2.0 协议开源了出来。

![](https://cdn.paicoding.com/stutymore/xiaomi-ocr-0-review-20261102161831.png)

社区打包好的 Ollama 版本加上视觉编码器只有 `1.8 G` 左右，普通的电脑在本地就能跑起来。

我第一时间在本地用 Ollama 把它部署了起来，测了整页解析、区域解析、票据 JSON 抽取和 Agent MCP 调用，还顺手把它的仓库源码和技术报告翻了一遍。

## 01、在线体验

不想上来就配环境的小伙伴，可以先去官方搭在 Hugging Face Space 上的在线工作台试试手。

> 在线演示地址 `https://huggingface.co/spaces/loongwayX/Xiaomi-OCR-0-demo`
> GitHub 仓库地址 `https://github.com/SeerRay-Lab/Xiaomi-OCR-0`

打开页面可以看到三个功能页签，分别是文档解析、字段提取和图像问答。

![](https://cdn.paicoding.com/stutymore/xiaomi-ocr-0-review-20261102162015.png)

上传一张图片或者一份 PDF，文档解析页签支持切换“整页”和“区域”两种模式，正文会输出成结构化的 Markdown，表格转成 HTML，数学公式转成 LaTeX。

切换到字段提取页签，输入你想抽取的字段名，模型就会从购物小票或发票里把对应的值抽出来拼成 JSON；切换到图像问答页签，还能针对图表或票据上的细节提问。

![](https://cdn.paicoding.com/stutymore/xiaomi-ocr-0-review-online-kie-20261102165225-c4968262.png)

### 本地部署

`Xiaomi-OCR-0` 提供了两条本地推理路径，一条是用 SGLang 或 vLLM 加载 Hugging Face 原始权重（适合有 NVIDIA 显卡的机器），另一条是用 Ollama 跑社区转换好的 BF16 GGUF 包（适合轻量化本地体验）。

要注意一个版本细节，因为 `Xiaomi-OCR-0` 基于 `Qwen3.5-0.8B-Base` 训练，架构标识是 `qwen35`，本地的 Ollama 版本需要升到 `0.35.0` 以上（我本机实测用的是 `0.40.13`），老版本加载时会报不认识模型架构。装好新版 Ollama 后，在终端执行下面这条命令就能把模型拉下来。

```bash
ollama pull longwayxu/xiaomi-ocr-0:bf16
```

这个 `longwayxu/xiaomi-ocr-0:bf16` 镜像包里同时打包了文本语言模型和视觉投影层，下载体积只有 `1.8 G` 左右，基本不用担心本机内容和硬盘大小。

![](https://cdn.paicoding.com/stutymore/xiaomi-ocr-0-local-deployment-upgraded-20261031123354-16a4965f.jpg)

光用 Ollama 把模型拉下来还不能马上拿来识别文档。

翻看仓库源码就能发现，图片的等比缩放、关闭思考模式的解码参数、任务专用的提示词以及表格格式转换，全都封装在官方仓库的 `demo/server.py` 和 MCP 服务里。

所以正确的做法是把官方仓库克隆到本地，装好图片与 PDF 处理依赖，再把环境变量指向本机 Ollama 的 `11434` 端口，启动本地浏览器工作台。

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

终端打印出监听地址后，打开浏览器访问 `http://127.0.0.1:8787`，就能看到和 Hugging Face 上一模一样的本地工作台了。

我拿仓库自带的 `example_pics/receipt.jpg` 购物小票跑了一次整页识别，本机接口返回 `200`，店名、注册号、商品明细、税率 `GST@6%` 和实付金额 `RM 5.90` 都准确转写了出来。

![](https://cdn.paicoding.com/stutymore/xiaomi-ocr-0-review-local-result-20261102164621-082b3d8a.jpg)

如果你手头有带 GPU 的 Linux 开发机，追求和官方技术报告一致的推理精度，可以用 SGLang 或 vLLM 启动服务，把上下文长度设为 `16384`，工作台默认连 `8000` 端口就能用。

```bash
vllm serve SeerRay-Lab/Xiaomi-OCR-0 \
  --host 127.0.0.1 --port 8000 \
  --trust-remote-code --max-model-len 16384
```

## 02、整页模式与区域模式

打开仓库里的 `skills/xiaomi-ocr/mcp_ocr_server.py`（本地工作台 `demo/server.py` 底层同样动态加载并复用了这个文件），就能了解清楚整页模式（`page`）与区域模式（`region`）的区别。

不管是哪种模式，图片进模型之前都会先走一遍 `_image_png()` 和 `evaluation_pipeline/cropping.py` 里的 `fit_image()` 函数。

当图片长边超过 `2048` 像素时，代码会用 `LANCZOS` 重采样算法把长边等比缩放到 `2048` 像素以内，统一转成 RGB PNG；如果是 PDF 文件，则用 `pypdfium2` 按默认 `150 DPI` 逐页渲染成图片（长边上限 `2200` 像素）。

接着看发给本地模型的请求参数。在 `mcp_ocr_server.py` 的 `_chat()` 函数中，除了把 `temperature` 设为 `0`、`top_p` 设为 `0.8` 保证确定性解码外，还特意传了一个参数 `"chat_template_kwargs": {"enable_thinking": False}`。

因为基座 `Qwen3.5` 支持思考模式，而 OCR 转写属于确定性的视觉识别任务，关掉思考过程既能省掉大量的推理 Token，又能避免模型在转写文字时夹带解释性的废话。

```python
payload = {
    "model": model or OCR_MODEL,
    "messages": [{"role": "user", "content": [
        {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{encoded}"}},
        {"type": "text", "text": prompt},
    ]}],
    "max_tokens": max_tokens, "temperature": 0, "top_p": 0.8,
    "presence_penalty": 0.0, "repetition_penalty": 1.0,
    "chat_template_kwargs": {"enable_thinking": False},
}
```

![](https://cdn.paicoding.com/stutymore/xiaomi-ocr-0-review-page-region-20261102164948-0ddb184d.png)

在整页模式下，代码会把整张图片配上一段提示词发给模型，要求模型忽略页眉页脚，按阅读顺序把正文提取为 Markdown、表格转成 OTSL、公式转成 LaTeX。

这种模式适合处理手写笔记、书法作品、古籍善本、街景文字以及排版不规则的海报。因为这类材料的文字行距和版式没有固定规律，一旦先用版面检测器硬切区域，很容易把同一行字或相连的字截断，丢掉上下文信息。

而在处理排版规整的印刷体文档、双栏论文或多页财报时，区域模式的优势就体现出来了。

开启区域模式后，进程内会调用 `PaddleX` 加载 `PP-DocLayoutV3` 版面检测模型（默认置信度阈值 `0.3`），先把页面里的标题、正文段落、表格、公式和插图框出来，并过滤掉页眉、页脚、页码和边注。

随后，代码按每个区块的类型分配专门的提示词与最大输出长度，把裁剪出来的小图丢进 `ThreadPoolExecutor` 线程池并发请求模型，最后按照版面检测器给出的阅读顺序拼成完整的 Markdown。

```python
REGION_MAX_TOKENS = {
    "title": 256, "text": 1024, "table": 2048, "formula": 512, "figure": 256
}
```

需要注意，区域模式依赖 `PaddlePaddle`、`paddlex[cv]` 和 `shapely`，如果只装了基础的 `requirements.txt` 没有装 `requirements-paddlex.txt`，切到区域模式会提示缺少版面检测依赖，需要执行下面这条命令补齐。

```bash
python -m pip install -r requirements-paddlex.txt
```

### 为什么表格先输出成 OTSL 再转 HTML？

读提示词的时候我注意到一个细节，不管是整页模式还是区域模式，提示词都要求模型把表格写成 `OTSL` 格式，随后再由 `postprocess/otsl.py` 转换成 HTML。

打开 `postprocess/otsl.py` 一看就明白了。HTML 表格的 `<table>`、`<tr>`、`<td>`、`rowspan`、`colspan` 标签相当冗长，一个 `0.8B` 的模型在生成几十行的大表格时，很容易漏掉闭合标签或者把跨行跨列的数量算错。

OTSL 则是一套精简的单元格标记语言，一共只有 `6` 个标签：

- `<fcel>`：包含文本内容的单元格
- `<ecel>`：空单元格
- `<lcel>`：延续左侧单元格（对应横向合并 `colspan`）
- `<ucel>`：延续上方单元格（对应纵向合并 `rowspan`）
- `<xcel>`：同时延续左侧和上方单元格
- `<nl>`：当前行结束

模型只需要按网格顺序找出这几个短标签和单元格文字，`otsl.py` 拿到输出后，先用 `pad_rows()` 把每一行的列数补齐成规整的矩形网格，再扫描 `<lcel>` 和 `<ucel>` 算出每个起始单元格的 `colspan` 与 `rowspan` 数值，最后拼成合法的 HTML `<table>` 嵌回 Markdown。

![](https://cdn.paicoding.com/stutymore/xiaomi-ocr-0-review-otsl-html-20261102165453-955cfc0f.png)

除了表格转换，`postprocess/document.py` 里的 `finalize_document()` 还做了一道兜底保护。

小尺寸视觉模型在遇到大片空白或密集线条时，偶尔会在输出末尾陷入周期性复读。`_clean_truncated_repeats()` 函数会检查长度超过 `8000` 字符的长输出，一旦发现末尾有连续重复 `5` 次以上且总长超过 `100` 字符的周期性片段，就只保留一个周期并截断后面的复读内容。

## 03、Xiaomi-OCR-0 的训练背后

在最受关注的文档解析基准 OmniDocBench v1.6 上，`Xiaomi-OCR-0` 以 `0.8B` 参数拿到了 `96.83` 分，超过了 `0.9B` 的 PaddleOCR-VL-1.6（`96.33` 分）、`0.8B` 的 OvisOCR2（`96.58` 分）、`1.2B` 的 MinerU2.5-Pro（`95.75` 分）以及 `0.9B` 的 GLM-OCR（`95.22` 分），在 `1B` 以下参数规模的模型里排第一。

放到真实复杂场景的 Real5-OmniDocBench 上，它拿到了 `95.24` 分的全榜第一；在公式识别基准 UniMER-Test 上拿到 `97.84` 分，表格识别基准 PubTabNet 拿到 `92.27` 分；在五项 OCR 视觉问答基准（DocVQA、InfoVQA、ChartQA、OCRBench、TextVQA）上拿到 `83.2` 的平均分，以 `0.8B` 的体量跨级跑赢了 `Qwen3.5-2B`（`80.9` 分）。

![](https://cdn.paicoding.com/stutymore/xiaomi-ocr-0-review-official-benchmarks-20261102165330-eb7d5a2e.png)

`Xiaomi-OCR-0` 的底座是 `Qwen3.5-0.8B-Base`。

通用的视觉语言模型看图没问题，但做逐字逐行的文档 OCR 时，经常出现“认得出字、对不上位置”的毛病，比如双栏排版左右串行、密集小字漏行。

为此，小米在训练初期加入了 Q-Mask 文字位置匹配训练，强迫模型把视觉特征里的文字区域和它在页面上的坐标对应起来，建立起严格的版面空间感，随后再用海量 OCR 语料继续预训练（CPT）。

### 交叉投票与渲染校验

决定 OCR 模型上限的还是训练数据的规模和质量。`Xiaomi-OCR-0` 的训练样本高达 `1.7` 亿条，涵盖印刷文档、学术论文、财务表格、手写笔记、古籍书法和街景文字。

这么庞大的数据量，靠人工逐字标注根本不可能完成，单拿一个现成的大模型去生成伪标签，又会把模型自带的幻觉和错别字一起学进来。

小米在技术报告第 2.1 节公开了一套多专家交叉投票+视觉重渲染校验的标注流水线。

![](https://cdn.paicoding.com/stutymore/xiaomi-ocr-0-cross-annotation-20261031121807-3510ba39.png)

这套流水线先由模型专家池交叉投票。

小米把 PaddleOCR-VL-1.6、MinerU2.5-Pro、GLM-OCR、dots.mocr、HunyuanOCR-1.5、TeleOCR、OvisOCR2 和 Qianfan-OCR 这 `8` 个各有所长的现成 OCR 模型拉进同一个专家池，让它们各自独立识别同一批文档图片。

如果几个模型在某个区域识别出来的结果一致，说明这部分没有争议，就作为高置信度样本入库。

遇到 `8` 个模型对某一段复杂公式、模糊手写或跨页表格给出的答案不一致时，系统不会简单按少数服从多数硬选，而是启动“渲染比对修正”（Render-Guided Refine-and-Judge），把存在分歧的识别结果重新渲染成一张图片，连同原始文档图片一起交给参数量更大的 `Qwen3.5-122B-A10B` 模型。

`122B` 模型对着原图和渲染图做像素级的视觉比对，找出是哪个字符认错了、哪个表格线漏了，修改之后再次渲染比对，最多校验 `3` 轮，直到渲染图与原图一致才收进训练集。

这套做法既省掉了人工标注费，又用“识别结果重渲染回图片再比对”的方式绕开了纯文本自检看不出排版错位的盲区，把 `8` 个专用 OCR 模型和 `122B` 大模型的本事浓缩进了 `1.7` 亿条高质量样本里。

## 04、强化学习阶段

有了高精度的预训练样本，模型已经能认准绝大多数文字，但预训练阶段用的是交叉熵损失（逐个 Token 预测概率），模型在生成长表格或 JSON 时，哪怕只错了一个括号或标签，整个结构化解析就会失败，怎么办呢？

答案就在技术报告第 3.3 节介绍的混合任务强化学习（Mix-RL）。

强化学习（RLHF）通常要训练一个奖励模型（Reward Model），因为一段内容好不好没有标准答案，得靠人类偏好打分。

但 OCR 不一样，它的对错有明确的客观标准。小米在强化学习阶段跳过了奖励模型，按任务类型设计了四套奖励函数（Rule-based Reward），给模型的每一次采样输出算分：

- **普通文本识别**：计算模型输出文本与标准答案之间的编辑距离相似度（Normalized Edit Similarity），少一个字、多一个字或者错一个字都会按比例扣分。
- **表格结构还原**：计算 TEDS（Tree Edit Distance-based Similarity，基于树编辑距离的相似度）。把 HTML 表格解析成 DOM 树，同时考核表格的行列拓扑结构（合并单元格有没有对上）和每个单元格里的文字内容。
- **数学公式识别**：计算 CDM（Character Detection Matching，字符检测匹配度）。因为同一个数学公式在 LaTeX 里可能有几种等价写法，纯比对字符串容易误判，CDM 会把预测的 LaTeX 渲染出来，在视觉符号和空间位置层面比对。
- **关键信息抽取（KIE）**：先用 JSON 解析器检查模型输出是不是合法的 JSON 对象，合法后再逐个比对目标字段（Key-Value）的准确率。

![](https://cdn.paicoding.com/stutymore/xiaomi-ocr-0-training-ablation-20261031121739-205616fd.jpg)

只要模型的输出无法被解析（比如 JSON 少了个闭合引号、OTSL 表格标签损坏）、违反了指令规定的格式，或者输出长度超出了上限，奖励分数一律记为 `0` 分。

同样是 `0.8B` 的模型，只做继续预训练（CPT）时 OmniDocBench v1.6 得分是 `94.61`，加上多教师在线策略蒸馏（MOPD）后能提升到 `95.88`，最后经过这套混合任务强化学习打磨，分数涨到了 `96.83`，。

## 05、接入 Agent 与派聪明

小米在开源模型的同时，在仓库根目录和 `skills/xiaomi-ocr/` 下内置了一套标准的 Agent Skill 与本地 MCP 服务。

### 一句话给 Agent 装上四个 OCR 工具

如果你平时在用 Codex、Claude Code 或者 DeepSeek Harness，不需要自己去手写 MCP 配置文件，只需要把下面这句提示词发给你的 Agent。

```text
Read and execute https://raw.githubusercontent.com/SeerRay-Lab/Xiaomi-OCR-0/main/SKILL.md
```

Agent 读取 `SKILL.md` 后，会先通过 Skills CLI 执行安装命令，把 `xiaomi-ocr` 挂载到当前 Agent 的全局技能目录中。

```bash
npx skills add SeerRay-Lab/Xiaomi-OCR-0 --skill xiaomi-ocr --full-depth --global --agent codex --yes
```

接着，Agent 会检查你本机已经跑起来的推理服务（比如刚才在 `11434` 端口启动的 Ollama，或者 `8000` 端口的 vLLM），然后调用仓库里的 `skills/xiaomi-ocr/install.sh` 脚本。

打开 `install.sh` 的源码可以看到，这个脚本在 `skills/xiaomi-ocr/.venv` 下创建一个独立的 Python 虚拟环境并装好 `pypdfium2`、`Pillow` 等依赖，接着把本机模型地址和仓库路径写进 `mcp-config.json`，当传入 `--agent=codex` 参数时，还会自动调用 `register_codex_mcp.py` 把服务注册进 Codex 的配置文件里，同时完整保留你原本配好的其他 MCP 服务。

```bash
XIAOMI_OCR_LOCAL_URL=http://127.0.0.1:11434/v1 \
XIAOMI_OCR_MODEL=longwayxu/xiaomi-ocr-0:bf16 \
bash skills/xiaomi-ocr/install.sh --agent=codex
```

![](https://cdn.paicoding.com/stutymore/xiaomi-ocr-0-review-codex-mcp-20261102165351-84add727.png)

注册完成后，你的 Agent 就多了四个本地视觉工具：

- `ocr_image`：解析单张图片为 Markdown，支持指定 `page`（整页）或 `region`（区域）模式
- `ocr_pdf`：将本地 PDF 按指定 DPI 逐页渲染并并发解析为 Markdown，按页码拼接返回
- `kie_image`：传入图片路径与可选的 `fields` 字段列表，返回提取并校验好的 JSON 对象
- `vqa_image`：传入文档图片路径与问题 `question`，返回简短准确的答案

### 改造派聪明 RAG 知识库的文档解析层

除了给终端和桌面 Agent 当工具，`Xiaomi-OCR-0` 最契合的落地场景就是给企业级 RAG 知识库当文档解析前置层。

![](https://cdn.paicoding.com/stutymore/xiaomi-ocr-0-rag-20261031122054-c2e9a773.png)

拿派聪明来说，在 `ParseService.java` 里，非 PDF 文档默认走 Apache Tika 的 `AutoDetectParser` 流式解析，PDF 文档走外部进程 `LiteParse`。

这套方案处理常规的电子版文档很快，但遇到复杂的跨行跨列表格时，就会丢掉行列对应关系；遇到图片扫描件或包含大量数学公式的论文 PDF 时，普通 OCR 只能认出零散的字符，公式和双栏阅读顺序全是乱的。

把 `Xiaomi-OCR-0` 接入 RAG 的文档消费流程后，这个问题就迎刃而解了。

当 Kafka 消费者 `FileProcessingConsumer` 从 MinIO 拿到合并后的文档，遇到扫描件、图片或复杂版面 PDF 时，先调用 `Xiaomi-OCR-0` 服务，将其统一解析为结构化的 Markdown 文本。

因为 `Xiaomi-OCR-0` 已经把跨行跨列表格转换成了带 `rowspan` 和 `colspan` 属性的内嵌 HTML `<table>`，把公式转成了标准 LaTeX，后续进到派聪明的父子文档时，只需要把整个 `<table>...</table>` 块作为不可分割的语义单元保留在同一个父块里，再写入 Elasticsearch 做 BM25 关键词与 KNN 向量双路召回就可以了。

### 派聪明写到简历上？

**项目名称**：派聪明企业级多模态 RAG 知识库系统

**项目简介**：面向企业内部技术文档、财务报表与扫描件归档场景的检索增强生成（RAG）系统，支持大文件分片断点续传、异步文档解析、父子文档切块、Elasticsearch BM25 + KNN 混合检索、RRF 融合与 Cross-Encoder 重排序，以及基于 ReAct 循环的多轮流式引用问答。

**技术栈**：Java 21、Spring Boot 3、Kafka、Elasticsearch、Redis、MinIO、Xiaomi-OCR-0（vLLM / Ollama）、PP-DocLayoutV3、MCP

**核心职责**：

- 针对传统 Apache Tika 解析扫描件、双栏 PDF 及跨行表格时丢失版面结构的问题，引入 Xiaomi-OCR-0 构建本地多模态解析通道，在 OmniDocBench 同类复杂版面场景下解析准确率达 96.8%。
- 针对规整印刷体 PDF 启用 PP-DocLayoutV3 版面检测，过滤页眉页脚与页码噪点，按标题、正文、表格、公式分配独立 Token 预算并由线程池并发调用模型推理；针对手写批注与不规则版面切换整页模式保留全局上下文。
- 利用 OTSL 紧凑单元格标记到 HTML table 的后处理转换机制，完整保留跨行（rowspan）与跨列（colspan）表头结构，并在父子文档分块器中增加 HTML 表格与 LaTeX 公式边界保护，解决切块切断表头导致的检索问题。
- 将单图解析、PDF 批量解析、票据 JSON 字段抽取（KIE）和文档视觉问答（VQA）封装为标准 stdio MCP 工具，接入 Agent，支持用户在对话中上传实时票据图片进行按 Schema 字段提取与问答。
