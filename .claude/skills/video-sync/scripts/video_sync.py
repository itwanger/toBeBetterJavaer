#!/usr/bin/env python3
"""B 站 / 抖音视频链接同步工具。

子命令：
  bili    拉取 B 站投稿列表，标出 readme 里还没引用的视频
  status  列出 readme 里缺 B 站链接的题目、脚本里缺抖音链接的文件
  apply   按映射文件写入链接（幂等，已有链接的条目会跳过）

抖音链接不写进 md，而是写进 docs/src/.vuepress/agentInterview.ts 的
douyinVideoIds 映射表，由 agentInterviewPlugin 渲染成页面里的播放器。
"""
import argparse
import datetime
import json
import re
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[4]
VIDEO_DIR = ROOT / "docs/src/ai/video"
README = VIDEO_DIR / "readme.md"
INTERVIEW_TS = ROOT / "docs/src/.vuepress/agentInterview.ts"
DOUYIN_MAP_RE = re.compile(r"(const douyinVideoIds[^\n]*\{\n)(.*?)(\n\};)", re.S)
BILI_MID = "402000160"
BILI_API = (
    "https://api.bilibili.com/x/series/recArchivesByKeywords"
    f"?mid={BILI_MID}&keywords=&ps=100&pn=1"
)
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/128.0 Safari/537.36"
ANSWER_RE = re.compile(r"^完整答案：\[查看图文解析\]\(\./([a-z0-9\-]+)\.md\)(.*)$")


def read(path):
    return path.read_text(encoding="utf-8")


def readme_entries(text):
    """按 ### 标题切分 readme，返回 [(标题, 正文块)]。"""
    heads = list(re.finditer(r"^### (\d+)\. (.+)$", text, re.M))
    blocks = []
    for i, m in enumerate(heads):
        end = heads[i + 1].start() if i + 1 < len(heads) else len(text)
        blocks.append((m.group(2), text[m.end():end]))
    return blocks


def cmd_bili(_args):
    req = urllib.request.Request(BILI_API, headers={"User-Agent": UA, "Referer": f"https://space.bilibili.com/{BILI_MID}/"})
    with urllib.request.urlopen(req, timeout=20) as resp:
        data = json.load(resp)
    if data.get("code") != 0:
        sys.exit(f"B 站接口返回异常：{data.get('code')} {data.get('message')}")
    archives = sorted(data["data"]["archives"], key=lambda a: a["pubdate"])
    known = set(re.findall(r"BV[0-9A-Za-z]{10}", read(README)))
    for a in archives:
        flag = "  " if a["bvid"] in known else "NEW"
        day = datetime.datetime.fromtimestamp(a["pubdate"]).strftime("%Y-%m-%d")
        desc = (a.get("desc") or "").replace("\n", " ")[:80]
        print(f"{flag}\t{a['bvid']}\t{day}\t{a['title']}\t{desc}")
    print(f"\n共 {len(archives)} 条，readme 已引用 {len(known & {a['bvid'] for a in archives})} 条", file=sys.stderr)


def cmd_status(_args):
    print("== readme 里有图文解析但没有 B 站链接的题目 ==")
    for title, block in readme_entries(read(README)):
        m = re.search(r"\./([a-z0-9\-]+)\.md", block)
        if m and "bilibili.com" not in block:
            print(f"{m.group(1)}\t{title}")
    ts = read(INTERVIEW_TS)
    current = douyin_map(ts)
    print("\n== agentInterview.ts 里没有抖音视频 ID 的脚本 ==")
    for path in sorted(VIDEO_DIR.glob("*.md")):
        if path.name == "readme.md" or path.stem in current:
            continue
        note = "" if has_meta(ts, path.stem) else "\t（缺 meta 条目，需先在 agentInterviewMeta 和分组里登记）"
        print(f"{path.stem}{note}")


def douyin_map(ts):
    body = DOUYIN_MAP_RE.search(ts).group(2)
    return dict(re.findall(r'"([a-z0-9\-]+)": "(\d+)"', body))


def has_meta(ts, slug):
    return re.search(rf'^  "?{re.escape(slug)}"?: meta\(', ts, re.M) is not None


def load_map(path):
    rows = [line.split("\t") for line in read(Path(path)).splitlines() if line.strip() and not line.startswith("#")]
    return {r[0].strip(): r[1].strip() for r in rows}


def apply_bili(mapping):
    text = read(README)
    lines = text.split("\n")
    heads = [i for i, l in enumerate(lines) if l.startswith("### ")]
    changed = []
    out = list(lines)
    for i, line in enumerate(lines):
        m = ANSWER_RE.match(line)
        if not m or m.group(1) not in mapping:
            continue
        start = max(h for h in heads if h < i)
        nxt = [h for h in heads if h > i]
        block = "\n".join(lines[start:nxt[0] if nxt else len(lines)])
        if "bilibili.com" in block:
            continue
        bvid = mapping[m.group(1)]
        out[i] = f"{line} · [B站视频](https://www.bilibili.com/video/{bvid}/)"
        changed.append(f"{m.group(1)} -> {bvid}")
    if changed:
        README.write_text("\n".join(out), encoding="utf-8")
    return changed


def apply_douyin(mapping):
    ts = read(INTERVIEW_TS)
    current = douyin_map(ts)
    changed = []
    additions = []
    for stem, vid in mapping.items():
        if stem in current:
            continue
        if not (VIDEO_DIR / f"{stem}.md").exists():
            print(f"跳过：{stem}.md 不存在", file=sys.stderr)
            continue
        if not has_meta(ts, stem):
            print(f"跳过：{stem} 在 agentInterviewMeta 里没有条目，先登记 meta 和分组", file=sys.stderr)
            continue
        additions.append(f'  "{stem}": "{vid}",')
        changed.append(f"{stem} -> {vid}")
    if additions:
        new_ts = DOUYIN_MAP_RE.sub(lambda m: m.group(1) + m.group(2) + "\n" + "\n".join(additions) + m.group(3), ts, count=1)
        INTERVIEW_TS.write_text(new_ts, encoding="utf-8")
    return changed


def cmd_apply(args):
    if args.bili:
        for c in apply_bili(load_map(args.bili)):
            print("readme +B站", c)
    if args.douyin:
        for c in apply_douyin(load_map(args.douyin)):
            print("agentInterview.ts +抖音", c)


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = p.add_subparsers(dest="cmd", required=True)
    sub.add_parser("bili").set_defaults(fn=cmd_bili)
    sub.add_parser("status").set_defaults(fn=cmd_status)
    ap = sub.add_parser("apply")
    ap.add_argument("--bili", help="映射文件：脚本名<TAB>BV 号")
    ap.add_argument("--douyin", help="映射文件：脚本名<TAB>抖音视频 ID")
    ap.set_defaults(fn=cmd_apply)
    args = p.parse_args()
    args.fn(args)


if __name__ == "__main__":
    main()
