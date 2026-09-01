// 百度普通收录 API 主动推送：把 sitemap 里的 URL 推给百度，缩短爬虫发现时间。
//
// 背景：javabetter.cn 百度索引量长期只有 ~300，sitemap 提交配额为 0，
// API 推送是站长平台仅剩的主动收录通道（配额以接口返回的 remain 为准）。
//
// token 是站长平台的准入密钥，本仓库公开，严禁写死在代码里：
// 优先读环境变量 BAIDU_PUSH_TOKEN，其次读 scripts/.baidu-push-token（已加入 .gitignore）。
//
// 用法：node scripts/push-baidu.mjs（build 后自动跑，见 package.json 的 docs:build）。

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const SITE = "https://javabetter.cn";
const LOCAL_SITEMAP = resolve(SCRIPT_DIR, "../dist/sitemap.xml");
const TOKEN_FILE = resolve(SCRIPT_DIR, ".baidu-push-token");
const STATE_FILE = resolve(SCRIPT_DIR, ".baidu-pushed.json"); // 已推送记录（url → 推送时的 lastmod），已 gitignore
const MAX_URLS = 2000; // 接口单次上限

function getToken() {
  if (process.env.BAIDU_PUSH_TOKEN) return process.env.BAIDU_PUSH_TOKEN.trim();
  if (existsSync(TOKEN_FILE)) return readFileSync(TOKEN_FILE, "utf-8").trim();
  return null;
}

async function getSitemapXml() {
  if (existsSync(LOCAL_SITEMAP)) {
    console.log("[baidu-push] 使用本地 dist/sitemap.xml");
    return readFileSync(LOCAL_SITEMAP, "utf-8");
  }
  console.log("[baidu-push] 本地无构建产物，抓取线上 sitemap");
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`拉取 sitemap 失败：HTTP ${res.status}`);
  return res.text();
}

const token = getToken();
if (!token) {
  console.warn("[baidu-push] 未找到 token（环境变量 BAIDU_PUSH_TOKEN 或 scripts/.baidu-push-token），跳过推送");
  process.exit(0);
}

const xml = await getSitemapXml();
const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)]
  .map((m) => ({
    loc: (m[1].match(/<loc>(.*?)<\/loc>/) || [])[1],
    lastmod: (m[1].match(/<lastmod>(.*?)<\/lastmod>/) || [])[1] || "",
  }))
  .filter((u) => u.loc && u.loc.startsWith(SITE));

// 配额只有个位数~十位数/天，按三档轮转，保证 891 个 URL 都能轮到：
// ① 没推过或内容更新过（lastmod 变了）的，新文章优先；② 都推过则从推送记录最老的轮起。
const state = existsSync(STATE_FILE) ? JSON.parse(readFileSync(STATE_FILE, "utf-8")) : {};
const fresh = entries.filter((u) => !state[u.loc] || state[u.loc].lastmod !== u.lastmod);
const stale = entries
  .filter((u) => state[u.loc] && state[u.loc].lastmod === u.lastmod)
  .sort((a, b) => (state[a.loc].pushedAt || "").localeCompare(state[b.loc].pushedAt || ""));
fresh.sort((a, b) => b.lastmod.localeCompare(a.lastmod));
const urls = [...fresh, ...stale].map((u) => u.loc).slice(0, MAX_URLS);
const lastmodByUrl = Object.fromEntries(entries.map((u) => [u.loc, u.lastmod]));

// 配额超限时接口整批拒绝（over quota），所以从大到小逐级试，直到成功或确认当日配额已用完。
// 2026-09 实测配额为 10 条/天；站点信任度上来后配额会涨，脚本无需改动。
const BATCH_SIZES = [2000, 500, 100, 50, 10, 1];

let pushed = false;
for (const n of BATCH_SIZES) {
  if (n > urls.length && n !== BATCH_SIZES[BATCH_SIZES.length - 1]) continue;
  const batch = urls.slice(0, Math.min(n, urls.length));
  const res = await fetch(`http://data.zz.baidu.com/urls?site=${SITE}&token=${token}`, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: batch.join("\n"),
  });
  const body = await res.text();
  if (res.ok) {
    const result = JSON.parse(body);
    const accepted = batch.slice(0, result.success ?? 0);
    const now = new Date().toISOString();
    for (const u of accepted) state[u] = { lastmod: lastmodByUrl[u] || "", pushedAt: now };
    writeFileSync(STATE_FILE, JSON.stringify(state, null, 1) + "\n");
    console.log(
      `[baidu-push] 成功收下 ${result.success ?? 0} 条，今日剩余配额 ${result.remain ?? "?"}` +
        (result.not_same_site?.length ? `，非本站 ${result.not_same_site.length} 条` : "") +
        (result.not_valid?.length ? `，无效 ${result.not_valid.length} 条` : "")
    );
    pushed = true;
    break;
  }
  if (!body.includes("over quota")) {
    console.error(`[baidu-push] 推送失败：HTTP ${res.status} ${body}`);
    break; // 非配额问题（token 错误等），降批量也没用
  }
}
if (!pushed) console.warn("[baidu-push] 今日配额已用完或推送未成功，明天构建时会自动重试");
process.exit(0); // 推送结果不阻塞构建
