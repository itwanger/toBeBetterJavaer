#!/usr/bin/env python3
"""Check the minimum prose length and a few hard rules for an AI article."""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path


FRONTMATTER_RE = re.compile(r"\A---\s*\n.*?\n---\s*\n", re.DOTALL)
FENCED_CODE_RE = re.compile(r"```.*?```", re.DOTALL)
INLINE_CODE_RE = re.compile(r"`[^`\n]*`")
IMAGE_RE = re.compile(r"!\[[^\]]*\]\([^)]*\)")
LINK_RE = re.compile(r"\[([^\]]+)\]\([^)]*\)")
HTML_RE = re.compile(r"<[^>]+>")
CHINESE_RE = re.compile(r"[\u3400-\u4dbf\u4e00-\u9fff]")
GREETING = "大家好，我是二哥呀。"


def prose_text(markdown: str) -> str:
    """Remove non-prose regions while keeping visible link labels."""
    text = FRONTMATTER_RE.sub("", markdown, count=1)
    text = FENCED_CODE_RE.sub("", text)
    text = INLINE_CODE_RE.sub("", text)
    text = IMAGE_RE.sub("", text)
    text = LINK_RE.sub(r"\1", text)
    return HTML_RE.sub("", text)


def halfwidth_quote_lines(markdown: str) -> list[int]:
    """Return prose line numbers containing ASCII double quotes."""
    text = FRONTMATTER_RE.sub(
        lambda match: "\n" * match.group(0).count("\n"), markdown, count=1
    )
    text = FENCED_CODE_RE.sub(lambda m: "\n" * m.group(0).count("\n"), text)
    result: list[int] = []
    for number, line in enumerate(text.splitlines(), start=1):
        visible = INLINE_CODE_RE.sub("", line)
        visible = IMAGE_RE.sub("", visible)
        visible = re.sub(r"\([^)]*https?://[^)]*\)", "", visible)
        visible = HTML_RE.sub("", visible)
        if '"' in visible:
            result.append(number)
    return result


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("article", type=Path, help="Markdown article path")
    parser.add_argument("--min-chars", type=int, default=4000)
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    if args.min_chars < 0:
        print("ERROR: --min-chars must be non-negative")
        return 2
    if not args.article.is_file():
        print(f"ERROR: file not found: {args.article}")
        return 2

    markdown = args.article.read_text(encoding="utf-8")
    prose = prose_text(markdown)
    char_count = len(CHINESE_RE.findall(prose))
    quote_lines = halfwidth_quote_lines(markdown)
    first_prose_lines = [line.strip() for line in prose.splitlines() if line.strip()][:8]
    greeting_ok = GREETING in first_prose_lines

    failures: list[str] = []
    if char_count < args.min_chars:
        failures.append(f"正文中文字数 {char_count}，少于要求 {args.min_chars}")
    if not greeting_ok:
        failures.append(f"正文前几段缺少固定开场：{GREETING}")
    if quote_lines:
        shown = ", ".join(str(line) for line in quote_lines[:12])
        suffix = " ..." if len(quote_lines) > 12 else ""
        failures.append(f"正文含半角双引号，行号：{shown}{suffix}")

    print(f"正文中文字数: {char_count}")
    print(f"最低要求: {args.min_chars}")
    print(f"固定开场: {'通过' if greeting_ok else '未通过'}")
    print(f"半角双引号: {len(quote_lines)} 处")

    if failures:
        for failure in failures:
            print(f"FAIL: {failure}")
        return 1

    print("PASS: 文章机械检查通过")
    return 0


if __name__ == "__main__":
    sys.exit(main())
