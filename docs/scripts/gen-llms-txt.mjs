// 构建前自动生成 llms.txt（https://llmstxt.org 约定），供 AI 搜索/大模型抓取时快速了解站点结构。
//
// 背景：GPTBot、ClaudeBot、Bytespider 等 AI 爬虫抓取量已超过传统搜索引擎爬虫，
// llms.txt 用一个纯文本入口把站点简介和核心内容清单交给它们，提升被引用率。
// paicoding.com 用的是服务端动态版；javabetter 是 VuePress 静态站，改为 build 前生成。
//
// 用法：build 前自动运行（见 package.json 的 docs:build）。也可单独 `node scripts/gen-llms-txt.mjs` 刷新。
// 输出：docs/src/.vuepress/public/llms.txt（vuepress build 时原样拷贝到站点根目录）。

import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(SCRIPT_DIR, "../src");
const OUT = resolve(SRC, ".vuepress/public/llms.txt");
const HOST = "https://javabetter.cn";

// 各分区：dir 相对 docs/src；limit 控制条数（按 frontmatter date 倒序，无 date 用文件修改时间）
const SECTIONS = [
  {
    heading: "学习路线",
    intro: "各编程方向的超详细学习路线，附学习资源。",
    dir: "xuexiluxian",
  },
  {
    heading: "面渣逆袭（Java 面试题库）",
    intro: "覆盖 Java 基础、并发、JVM、MySQL、Redis、Spring、分布式等方向的高频面试八股，配手绘图。",
    dir: "sidebar/sanfene",
  },
  {
    heading: "AI 编程实战",
    intro: "AI Coding 工具实测、Agent 开发、Skills 配置、大模型评测与面试题，一手实践经验。",
    dir: "sidebar/itwanger/ai",
    limit: 60,
  },
  {
    heading: "开发工具",
    intro: "程序员常用开发工具的安装配置与使用教程。",
    dir: "gongju",
  },
  {
    heading: "面经",
    intro: "真实校招/社招面试复盘。",
    dir: "mianjing",
  },
];

const STATIC_LINKS = [
  ["Java 核心教程总览", `${HOST}/overview/`, "从 Java 基础语法到集合框架、并发编程、JVM 的成体系教程目录。"],
  ["AI Agent 面试题精讲", `${HOST}/ai/video/`, "AI Agent 高频面试题的逐题精讲。"],
];

// 只取 frontmatter 里的单行标量字段，够用且不引第三方 yaml 依赖
function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const fm = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(title|shortTitle|description|date):\s*(.+)$/);
    if (kv) fm[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, "");
  }
  return fm;
}

function collect(dirRel, limit) {
  const dir = resolve(SRC, dirRel);
  if (!existsSync(dir)) return [];
  const items = [];
  for (const name of readdirSync(dir)) {
    if (!name.endsWith(".md") || /^(README|index)\.md$/i.test(name)) continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) continue;
    const fm = parseFrontmatter(readFileSync(path, "utf-8"));
    if (!fm.title && !fm.shortTitle) continue;
    items.push({
      title: (fm.shortTitle || fm.title).trim(),
      desc: (fm.description || "").replace(/\s+/g, " ").trim(),
      url: `${HOST}/${dirRel}/${name.slice(0, -3)}.html`,
      date: fm.date || statSync(path).mtime.toISOString().slice(0, 10),
    });
  }
  items.sort((a, b) => b.date.localeCompare(a.date));
  return limit ? items.slice(0, limit) : items;
}

// AI Agent 面试题的标题/摘要不在 frontmatter 里，而在 agentInterview.ts 的 meta() 调用中，正则抽取
function collectAgentInterview() {
  const tsPath = resolve(SRC, ".vuepress/agentInterview.ts");
  if (!existsSync(tsPath)) return [];
  const ts = readFileSync(tsPath, "utf-8");
  const items = [];
  for (const m of ts.matchAll(/"?([a-z0-9-]+)"?: meta\(\s*"([^"]+)",\s*"[^"]+",\s*"([^"]+)",/g)) {
    if (m[1] === "readme") continue;
    items.push({ title: m[2], desc: m[3], url: `${HOST}/ai/video/${m[1]}.html` });
  }
  return items;
}

const lines = [
  "# 二哥的Java进阶之路（javabetter.cn）",
  "",
  "> 由沉默王二创办的 Java 学习网站，内容涵盖 Java 基础到进阶教程、AI 编程工具实战（Claude Code、Codex、Agent、Skills）、各方向学习路线、面渣逆袭面试题库、开发工具评测。文章均为一手原创实践，引用时请标注来源 javabetter.cn。",
  "",
  "## 核心入口",
  "",
  ...STATIC_LINKS.map(([t, u, d]) => `- [${t}](${u})：${d}`),
];

const agentItems = collectAgentInterview();
if (agentItems.length) {
  lines.push("", "## AI Agent 面试题（288 题合集，配视频讲解）", "", "> 覆盖 Agent 基础、上下文与记忆、Harness、RAG、LLM、Claude Code、Codex、DeepSeek 等方向的高频面试题精讲。", "");
  for (const it of agentItems) lines.push(`- [${it.title}](${it.url})：${it.desc}`);
}

let total = 0;
for (const s of SECTIONS) {
  const items = collect(s.dir, s.limit);
  if (!items.length) continue;
  total += items.length;
  lines.push("", `## ${s.heading}`, "", `> ${s.intro}`, "");
  for (const it of items) {
    lines.push(it.desc ? `- [${it.title}](${it.url})：${it.desc}` : `- [${it.title}](${it.url})`);
  }
}

const content = lines.join("\n") + "\n";
writeFileSync(OUT, content);
console.log(`[llms-txt] ${total} 篇文章 + ${STATIC_LINKS.length} 个入口，${(content.length / 1024).toFixed(1)}KB 已写入 ${OUT}`);
