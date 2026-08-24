import type { Page, PageOptions, PluginObject } from "vuepress/core";

export interface AgentInterviewMeta {
  title: string;
  shortTitle: string;
  summary: string;
  keywords: string[];
}

export interface AgentInterviewGroup {
  text: string;
  children: string[];
}

const meta = (
  title: string,
  shortTitle: string,
  summary: string,
  keywords: string[],
): AgentInterviewMeta => ({
  title,
  shortTitle,
  summary,
  keywords: ["AI Agent 面试题", ...keywords],
});

export const agentInterviewMeta: Record<string, AgentInterviewMeta> = {
  readme: meta(
    "AI Agent 面试 288 题：从基础原理到项目实战",
    "Agent 面试 288 题",
    "按 Agent 基础、上下文与记忆、Harness、RAG、LLM、Claude Code、Codex、DeepSeek、Prompt、MCP、LangChain、Spring AI 和模型微调分类整理 288 道高频面试题。",
    ["Agent 八股", "Harness 面试", "RAG 面试", "Claude Code 面试"],
  ),
  "what-is-agent": meta(
    "什么是 AI Agent？与直接调用大模型 API 有什么区别？",
    "什么是 Agent",
    "Agent 不只是一次模型调用，而是由模型、工具、记忆和运行时共同组成，能够观察环境、执行动作并根据结果继续决策。",
    ["AI Agent", "大模型 API", "工具调用", "Agent 原理"],
  ),
  "agent-chatbot-difference": meta(
    "Agent 和 ChatBot 有什么区别？如何让聊天机器人进化成 Agent？",
    "Agent 与 ChatBot",
    "Agent 比 ChatBot 多出的关键能力是工具调用、任务规划和记忆，并通过持续反馈自主推进任务。",
    ["ChatBot", "工具调用", "任务规划", "Agent Memory"],
  ),
  "workflow-vs-agent": meta(
    "Workflow 和 Agent 有什么区别？面试时该怎么回答？",
    "Workflow 与 Agent",
    "Workflow 依赖预先设计的步骤与分支，Agent 则由模型结合当前状态动态决定下一步，两者可以组合使用。",
    ["AI Workflow", "Agent 工作流", "智能体编排", "自主决策"],
  ),
  "how-agent-works": meta(
    "AI Agent 是如何工作的？完整执行过程拆解",
    "Agent 如何工作",
    "Agent 的工作过程包括接收目标、组装上下文、模型决策、执行工具、写回观察结果和判断是否继续。",
    ["Agent 执行流程", "Function Calling", "上下文工程", "Agent Loop"],
  ),
  "agent-core-components": meta(
    "一个 AI Agent 有哪些核心组件？",
    "Agent 核心组件",
    "生产级 Agent 通常由模型、工具、记忆、规划与 Harness 五部分组成，Harness 负责循环、权限、上下文和错误恢复。",
    ["Agent 架构", "Harness", "Planning", "Memory"],
  ),
  "agent-hnow-tool-call": meta(
    "Agent 怎么知道该调用哪个工具？Function Calling 原理拆解",
    "Agent 如何选工具",
    "工具选择主要由 LLM 根据工具名称、描述和参数 Schema 完成，Agent 运行时负责注册、执行、校验与结果回传。",
    ["Function Calling", "Tool Use", "Tool Registry", "JSON Schema"],
  ),
  "what-is-react": meta(
    "什么是 ReAct？它和 CoT 有什么区别？",
    "什么是 ReAct",
    "ReAct 把推理、行动和观察交替组织起来，CoT 主要展开推理过程；前者更适合需要工具和环境反馈的任务。",
    ["ReAct", "CoT", "Thought Action Observation", "Agent 模式"],
  ),
  "react-death-loop": meta(
    "ReAct 会死循环吗？如何设计可靠的终止机制？",
    "ReAct 死循环",
    "ReAct 可能因目标不清、工具失败或模型重复决策陷入死循环，需要最大轮次、预算、重复检测和降级退出共同约束。",
    ["ReAct 死循环", "Agent 终止条件", "最大迭代次数", "错误恢复"],
  ),
  "plan-and-execute": meta(
    "什么是 Plan-and-Execute？它和 ReAct 怎么选？",
    "Plan-and-Execute",
    "Plan-and-Execute 先生成全局计划再逐项执行，适合目标明确的复杂任务；ReAct 更适合边观察边调整的不确定任务。",
    ["Plan-and-Execute", "ReAct", "任务规划", "Agent Planning"],
  ),
  "multi-agent-collaboration": meta(
    "Multi-Agent 协作是怎么实现的？",
    "Multi-Agent 协作",
    "多 Agent 协作需要明确角色、任务分发、上下文隔离、结果聚合和冲突处理，而不只是同时启动多个模型会话。",
    ["Multi-Agent", "多智能体协作", "Sub-agent", "任务分发"],
  ),
  "what-is-prompt-engineering": meta(
    "什么是提示词工程（Prompt Engineering）？",
    "提示词工程",
    "提示词工程通过角色、目标、约束、示例和输出格式提高单次模型响应质量，但不能单独解决动态上下文与运行时控制问题。",
    ["Prompt Engineering", "提示词", "Few-shot", "结构化输出"],
  ),
  "what-is-context-engineering": meta(
    "什么是上下文工程（Context Engineering）？",
    "上下文工程",
    "上下文工程关注在正确时机把正确的信息放进有限窗口，包括系统指令、记忆、工具定义、检索结果和历史压缩。",
    ["Context Engineering", "上下文管理", "Prompt Engineering", "Agent 上下文"],
  ),
  "what-is-context-window": meta(
    "什么是上下文窗口？它不是聊天窗口",
    "什么是上下文窗口",
    "上下文窗口是模型单次推理可读取的 Token 总预算，系统提示、工具定义、历史消息和工具结果都会占用它。",
    ["上下文窗口", "Context Window", "Token", "大模型推理"],
  ),
  "context-window-limit": meta(
    "为什么 LLM 的上下文窗口不能无限大？",
    "上下文为何有限",
    "上下文越长，注意力计算、显存占用和推理延迟越高，还会出现中间信息利用率下降，因此窗口不能无限扩展。",
    ["LLM 上下文", "注意力机制", "KV Cache", "Lost in the Middle"],
  ),
  "agent-context-explosion": meta(
    "Agent 怎么避免上下文爆炸？四种常用方案",
    "避免上下文爆炸",
    "控制 Agent 上下文需要结合工具输出截断、历史摘要、Sub-agent 隔离和按需加载，而不是简单删除旧消息。",
    ["上下文爆炸", "上下文压缩", "Sub-agent", "按需加载"],
  ),
  "why-agent-gets-dumber": meta(
    "为什么聊着聊着 Agent 就变笨了？",
    "Agent 为什么变笨",
    "长对话会引入噪声、指令冲突、注意力稀释和压缩损失，导致 Agent 对关键约束的利用率下降。",
    ["Context Rot", "上下文污染", "Agent 退化", "上下文压缩"],
  ),
  "why-llm-has-no-memory": meta(
    "为什么说 LLM 本身没有记忆？",
    "LLM 为什么没记忆",
    "LLM 每次请求只根据当前输入计算输出，不会自动保存上轮状态；对话记忆来自应用层重新注入历史或外部存储。",
    ["LLM Memory", "无状态模型", "对话历史", "外部记忆"],
  ),
  "how-to-give-agent-memory": meta(
    "怎么让 Agent 拥有记忆？短期与长期记忆设计",
    "让 Agent 拥有记忆",
    "Agent 记忆需要区分当前任务状态与跨会话知识，通过筛选、存储、检索、注入和遗忘机制共同实现。",
    ["Agent Memory", "短期记忆", "长期记忆", "记忆检索"],
  ),
  "agent-short-term-memory": meta(
    "Agent 的短期记忆怎么实现？",
    "Agent 短期记忆",
    "Agent 短期记忆通常保存当前会话消息、任务状态和工具结果，并通过窗口裁剪与摘要压缩控制 Token 使用。",
    ["短期记忆", "Conversation History", "上下文压缩", "Agent State"],
  ),
  "agent-long-term-memory": meta(
    "Agent 的长期记忆是怎么实现的？",
    "Agent 长期记忆",
    "Agent 长期记忆把跨会话有效信息持久化，并在新任务中按相关性与权限检索，再以受控方式注入上下文。",
    ["长期记忆", "向量检索", "Memory Store", "跨会话记忆"],
  ),
  "claude-code-short-term-memory": meta(
    "Claude Code 的短期记忆是怎么实现的？",
    "Claude Code 短期记忆",
    "Claude Code 的短期记忆来自当前会话历史、工具结果和压缩摘要，核心是在有限上下文内保留任务状态。",
    ["Claude Code", "短期记忆", "会话压缩", "Agent 上下文"],
  ),
  "claude-code-long-term-memory": meta(
    "Claude Code 的长期记忆是怎么实现的？",
    "Claude Code 长期记忆",
    "Claude Code 通过项目指令文件与持久化记忆保存跨会话信息，并在后续任务中按作用域加载相关内容。",
    ["Claude Code", "长期记忆", "CLAUDE.md", "项目记忆"],
  ),
  "claude-code-memory-retrieval": meta(
    "Claude Code 如何检索长期记忆？",
    "Claude Code 记忆检索",
    "长期记忆不能全量塞入上下文，需要先建立索引，再根据当前问题筛选相关片段并控制注入数量。",
    ["Claude Code Memory", "记忆检索", "语义检索", "上下文注入"],
  ),
  "codex-short-term-memory": meta(
    "Codex 的短期记忆是怎么实现的？",
    "Codex 短期记忆",
    "Codex 通过会话消息、工具事件和自动压缩维持任务连续性，并在上下文预算接近上限时保留关键状态。",
    ["OpenAI Codex", "短期记忆", "上下文压缩", "会话状态"],
  ),
  "codex-long-term-memory": meta(
    "Codex 的长期记忆是怎么实现的？",
    "Codex 长期记忆",
    "Codex 的长期记忆将稳定偏好与项目经验持久化，在新任务中按相关性读取，以减少重复说明并保持执行一致。",
    ["OpenAI Codex", "长期记忆", "项目经验", "用户偏好"],
  ),
  "what-is-harness-engineering": meta(
    "什么是 Harness Engineering？为什么 Agent 需要运行时？",
    "Harness Engineering",
    "Harness Engineering 关注模型之外的循环控制、工具执行、权限、上下文、错误恢复和可观测性，是生产级 Agent 的运行基础。",
    ["Harness Engineering", "Agent Harness", "Agent Runtime", "错误恢复"],
  ),
  "what-is-loop-engineering": meta(
    "什么是 Loop Engineering？",
    "Loop Engineering",
    "Loop Engineering 通过明确目标、反馈、校验、预算与退出条件，让 Agent 可以持续迭代又不会无边界运行。",
    ["Loop Engineering", "Agent Loop", "反馈循环", "终止条件"],
  ),
  "agent-skill-hit-rate": meta(
    "Agent 挂了几十个 Skill，怎么保证命中率？",
    "Skill 命中率",
    "提高 Skill 命中率依赖清晰描述、分层发现、按需加载、候选召回与冲突消解，不能只靠硬编码路由。",
    ["Agent Skills", "Skill Routing", "渐进式披露", "工具选择"],
  ),
  "how-to-write-claudemd": meta(
    "CLAUDE.md 怎么写才真正有用？",
    "CLAUDE.md 写法",
    "高质量 CLAUDE.md 应只保留稳定、可执行、可验证的项目规则，并按作用域拆分，避免堆积临时信息和重复说明。",
    ["CLAUDE.md", "Claude Code", "项目指令", "上下文工程"],
  ),
  "agent-rag-pdf": meta(
    "Agent 的 RAG 遇到 PDF 怎么办？",
    "RAG 处理 PDF",
    "PDF RAG 需要同时处理版面、段落、表格、图片和引用位置，常见做法是结构化解析、分块检索与多模态补充。",
    ["Agentic RAG", "PDF 解析", "多模态 RAG", "文档分块"],
  ),
  "responses-api-vs-chat-completions": meta(
    "Responses API 和 Chat Completions API 有什么区别？",
    "Responses API 对比",
    "Responses API 面向多轮、工具和多模态任务提供统一响应模型，Chat Completions 更接近传统消息数组式对话接口。",
    ["Responses API", "Chat Completions", "Function Calling", "多模态 API"],
  ),
  "api-cache-hit-miss": meta(
    "大模型 API 缓存命中和未命中为什么差价巨大？",
    "API 缓存命中",
    "缓存命中可以复用前缀计算与 KV Cache，减少 Prefill 的计算和显存读写，因此延迟与输入成本通常显著下降。",
    ["Prompt Cache", "KV Cache", "Prefix Caching", "API 定价"],
  ),
  "why-post-training-beats-params": meta(
    "DeepSeek V4 Flash 正式版的激活参数比 V4 Pro 小得多，Agent 能力为什么超过了 Pro 预览版？",
    "后训练为何重要",
    "Agent 能力不只取决于激活参数规模，后训练数据、工具使用训练、推理策略和运行时适配同样会显著影响效果。",
    ["Post-training", "激活参数", "Agent 能力", "模型训练"],
  ),
  "what-is-moe": meta(
    "MoE 是什么？DeepSeek 模型为什么采用混合专家架构？",
    "什么是 MoE",
    "MoE 每次只激活部分专家网络，在控制单次计算量的同时扩大模型总容量，但需要解决路由、负载均衡和通信问题。",
    ["MoE", "混合专家模型", "Expert Routing", "DeepSeek"],
  ),
  "v4-csa-hca-kv-cache": meta(
    "CSA、HCA 与 KV Cache：DeepSeek V4 缓存为什么更便宜？",
    "CSA HCA 与缓存",
    "缓存命中不仅跳过 Prefill，还可复用注意力相关中间状态；CSA 与 HCA 的设计重点之一就是降低长上下文推理开销。",
    ["CSA", "HCA", "KV Cache", "DeepSeek V4"],
  ),
  "v4-why-replace-mla": meta(
    "DeepSeek V4 为什么用 CSA 和 HCA 替换 MLA？",
    "V4 为何替换 MLA",
    "注意力结构的取舍要同时考虑训练效果、长上下文、缓存占用与推理吞吐，CSA 和 HCA 针对这些目标重新平衡。",
    ["DeepSeek V4", "MLA", "CSA", "HCA"],
  ),
  "what-is-cordis": meta(
    "Cordis 是什么？DeepSeek Harness 的插件系统如何理解？",
    "什么是 Cordis",
    "Cordis 是面向模块与插件协作的运行基础，可通过依赖注入、生命周期和服务注册组织 Harness 中的可扩展能力。",
    ["Cordis", "DeepSeek Harness", "插件系统", "依赖注入"],
  ),
};

export const agentInterviewGroups: AgentInterviewGroup[] = [
  {
    text: "START / 题库入口",
    children: ["readme"],
  },
  {
    text: "01 / Agent 基础",
    children: [
      "what-is-agent",
      "agent-chatbot-difference",
      "workflow-vs-agent",
      "how-agent-works",
      "agent-core-components",
      "agent-hnow-tool-call",
      "what-is-react",
      "react-death-loop",
      "plan-and-execute",
      "multi-agent-collaboration",
    ],
  },
  {
    text: "02 / 上下文与记忆",
    children: [
      "what-is-prompt-engineering",
      "what-is-context-engineering",
      "what-is-context-window",
      "context-window-limit",
      "agent-context-explosion",
      "why-agent-gets-dumber",
      "why-llm-has-no-memory",
      "how-to-give-agent-memory",
      "agent-short-term-memory",
      "agent-long-term-memory",
    ],
  },
  {
    text: "03 / Harness 与 Skills",
    children: [
      "what-is-harness-engineering",
      "what-is-loop-engineering",
      "agent-skill-hit-rate",
    ],
  },
  {
    text: "04 / RAG知识库",
    children: ["agent-rag-pdf"],
  },
  {
    text: "05 / LLM 基础与 API",
    children: [
      "responses-api-vs-chat-completions",
      "api-cache-hit-miss",
      "what-is-moe",
    ],
  },
  {
    text: "06 / Claude Code与Codex",
    children: [
      "claude-code-short-term-memory",
      "claude-code-long-term-memory",
      "claude-code-memory-retrieval",
      "how-to-write-claudemd",
      "codex-short-term-memory",
      "codex-long-term-memory",
    ],
  },
  {
    text: "07 / DeepSeek专题",
    children: [
      "why-post-training-beats-params",
      "v4-csa-hca-kv-cache",
      "v4-why-replace-mla",
      "what-is-cordis",
    ],
  },
];

const douyinVideoIds: Partial<Record<keyof typeof agentInterviewMeta, string>> = {
  "what-is-agent": "7656663165568044324",
  "agent-chatbot-difference": "7657431432612039982",
  "workflow-vs-agent": "7657820250913639730",
  "how-agent-works": "7659293535715298587",
  "agent-core-components": "7658925498893929769",
  "agent-hnow-tool-call": "7654443885439094042",
  "what-is-react": "7658189484642651426",
  "react-death-loop": "7655196193752010027",
  "plan-and-execute": "7655306519898017074",
  "multi-agent-collaboration": "7656328223348821248",
  "what-is-prompt-engineering": "7660769784925097231",
  "what-is-context-engineering": "7660389232246050083",
  "what-is-context-window": "7663057047717547283",
  "context-window-limit": "7660013204101254406",
  "agent-context-explosion": "7659664856261348642",
  "why-agent-gets-dumber": "7666746723645148442",
  "why-llm-has-no-memory": "7662685584615427371",
  "how-to-give-agent-memory": "7663380317411003690",
  "agent-short-term-memory": "7663725283039563044",
  "agent-long-term-memory": "7667739270735514930",
  "claude-code-short-term-memory": "7664489707128016134",
  "claude-code-long-term-memory": "7668673990940003625",
  "claude-code-memory-retrieval": "7673366479827504384",
  "codex-short-term-memory": "7665302340374629675",
  "what-is-harness-engineering": "7661856429820661007",
  "what-is-loop-engineering": "7662238546815634729",
  "agent-skill-hit-rate": "7654468095473356070",
  "how-to-write-claudemd": "7669281306200165659",
  "agent-rag-pdf": "7657063729804152074",
  "responses-api-vs-chat-completions": "7675690881772506414",
  "api-cache-hit-miss": "7672403032797154601",
  "why-post-training-beats-params": "7670027713771621658",
  "what-is-moe": "7670768776341753122",
  "what-is-cordis": "7674857729629900038",
};

const getSlugFromFilePath = (filePath?: string): string | null => {
  const matched = filePath?.match(/(?:^|[/\\])ai[/\\]video[/\\]([^/\\]+)\.md$/u);
  return matched?.[1] ?? null;
};

export const getAgentInterviewMeta = (
  page: Pick<Page, "filePathRelative" | "slug">,
): AgentInterviewMeta | null => {
  if (!page.filePathRelative?.startsWith("ai/video/")) return null;
  return agentInterviewMeta[page.slug] ?? null;
};

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const getInlinePlainText = (inlineToken: {
  children?: Array<{ content: string; type: string }> | null;
  content: string;
}): string => {
  if (!inlineToken.children?.length) return inlineToken.content.trim();

  return inlineToken.children
    .map((child) => {
      if (["text", "code_inline", "emoji"].includes(child.type)) {
        return child.content;
      }
      if (["softbreak", "hardbreak"].includes(child.type)) return " ";
      return "";
    })
    .join("")
    .replace(/\s+/gu, " ")
    .trim();
};

const extractScriptOpening = (
  tokens: Array<{
    children?: Array<{ content: string; type: string }> | null;
    content: string;
    type: string;
  }>,
): string | null => {
  const removals: Array<[number, number]> = [];
  let opening: string | null = null;

  for (let index = 0; index < tokens.length - 2; index += 1) {
    if (
      tokens[index].type !== "paragraph_open" ||
      tokens[index + 1].type !== "inline" ||
      tokens[index + 2].type !== "paragraph_close"
    ) {
      continue;
    }

    const text = getInlinePlainText(tokens[index + 1]);
    if (!text) continue;

    if (/^(?:关键字|关键词)[：:]/u.test(text)) {
      removals.push([index, index + 3]);
      index += 2;
      continue;
    }

    opening = text;
    removals.push([index, index + 3]);
    break;
  }

  removals.reverse().forEach(([start, end]) => tokens.splice(start, end - start));
  return opening;
};

const renderAnswerCard = (
  slug: string,
  item: AgentInterviewMeta,
  opening: string,
): string => {
  const index = Object.keys(agentInterviewMeta).indexOf(slug);
  const number = slug === "readme" ? "INDEX" : String(index).padStart(3, "0");
  const label = slug === "readme" ? "AGENT INTERVIEW DATABASE" : "AI的药，绝不能停";
  const tags = item.keywords
    .slice(0, 4)
    .map((keyword) => `<span>${escapeHtml(keyword)}</span>`)
    .join("");
  const descriptionLabel =
    slug === "readme"
      ? '<p class="agent-answer-card__label">题库说明</p>\n  '
      : "";

  return `<aside class="agent-answer-card" aria-label="${slug === "readme" ? "本页核心摘要" : "视频脚本开场"}">
  <div class="agent-answer-card__meta"><span>${label}</span><b>#${number}</b></div>
  ${descriptionLabel}<p class="agent-answer-card__summary">${escapeHtml(opening)}</p>
  <div class="agent-answer-card__tags" aria-label="核心主题">${tags}</div>
</aside>`;
};

const renderDouyinVideo = (
  slug: string,
  item: AgentInterviewMeta,
): string => {
  const videoId = douyinVideoIds[slug];
  if (!videoId) return "";

  const videoUrl = `https://www.douyin.com/video/${videoId}`;
  const playerUrl = `https://open.douyin.com/player/video?vid=${videoId}`;

  return `<section class="agent-video-card" aria-label="本题视频讲解">
  <div class="agent-video-card__meta">
    <span>WATCH / 抖音视频</span>
    <a href="${videoUrl}" target="_blank" rel="noopener noreferrer">在抖音打开</a>
  </div>
  <div class="agent-video-card__player">
    <iframe src="${playerUrl}" title="${escapeHtml(item.shortTitle)}的视频讲解" loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
  </div>
</section>`;
};

const renderScriptCardOpen = (): string => `<article class="agent-script-card" aria-label="完整视频脚本">
  <header class="agent-script-card__header">
    <span>王二讲Agent</span>
    <b>每天3分钟，带你吃透Agent。</b>
  </header>
  <div class="agent-script-card__body">`;

const renderScriptCardClose = (): string => `  </div>
</article>`;

export const agentInterviewPlugin = (): PluginObject => ({
  name: "agent-interview-pages",

  extendsMarkdown: (markdown): void => {
    markdown.core.ruler.push("agent-interview-answer-card", (state): void => {
      const filePathRelative = state.env.filePathRelative as string | undefined;
      const slug = getSlugFromFilePath(filePathRelative);
      if (!slug) return;

      const item = agentInterviewMeta[slug];
      if (!item) return;

      const opening =
        slug === "readme"
          ? item.summary
          : extractScriptOpening(state.tokens) ?? item.summary;

      const token = new state.Token("html_block", "", 0);
      const video = slug === "readme" ? "" : renderDouyinVideo(slug, item);
      const scriptCard = slug === "readme" ? "" : renderScriptCardOpen();
      token.content = `${renderAnswerCard(slug, item, opening)}${video ? `\n${video}` : ""}${scriptCard ? `\n${scriptCard}` : ""}\n`;
      state.tokens.unshift(token);

      if (scriptCard) {
        const closingToken = new state.Token("html_block", "", 0);
        closingToken.content = `${renderScriptCardClose()}\n`;
        state.tokens.push(closingToken);
      }
    });
  },

  extendsPageOptions: (options: PageOptions): void => {
    const slug = getSlugFromFilePath(options.filePath);
    if (!slug) return;

    const item = agentInterviewMeta[slug];
    if (!item) return;

    options.frontmatter = {
      title: item.title,
      shortTitle: item.shortTitle,
      description: item.summary,
      keywords: item.keywords.join(", "),
      author: "沉默王二",
      category: ["AI", "面试"],
      tag: item.keywords.slice(0, 4),
      isOriginal: true,
      article: true,
      containerClass: "agent-interview-page",
      ...options.frontmatter,
    };
  },

});
