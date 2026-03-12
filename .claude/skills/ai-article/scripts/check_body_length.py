#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path


FENCED_BLOCK_RE = re.compile(r"(```[\s\S]*?```|~~~[\s\S]*?~~~)")
INLINE_CODE_RE = re.compile(r"`[^`]*`")
FRONTMATTER_RE = re.compile(r"\A---\n.*?\n---\n?", re.DOTALL)
URL_RE = re.compile(r"https?://[^\s)>\]]+")
MARKDOWN_LINK_RE = re.compile(r"!?\[([^\]]*)\]\([^)]+\)")
HTML_TAG_RE = re.compile(r"<[^>]+>")
CJK_RE = re.compile(r"[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]")
ASCII_WORD_RE = re.compile(r"[A-Za-z0-9][A-Za-z0-9._/+:-]*")


def strip_frontmatter(text: str) -> str:
    match = FRONTMATTER_RE.match(text)
    if not match:
        return text
    return text[match.end() :]


def strip_code(text: str) -> str:
    text = FENCED_BLOCK_RE.sub(" ", text)
    return INLINE_CODE_RE.sub(" ", text)


def strip_markup(text: str) -> str:
    text = MARKDOWN_LINK_RE.sub(r"\1", text)
    text = URL_RE.sub(" ", text)
    text = HTML_TAG_RE.sub(" ", text)
    text = re.sub(r"^#{1,6}\s*", "", text, flags=re.MULTILINE)
    text = re.sub(r"^\s*[-*+]\s+", "", text, flags=re.MULTILINE)
    text = re.sub(r"^\s*\d+\.\s+", "", text, flags=re.MULTILINE)
    return text


def extract_body(text: str) -> str:
    text = strip_frontmatter(text)
    text = strip_code(text)
    text = strip_markup(text)
    return text


def count_body_units(text: str) -> int:
    cjk_count = len(CJK_RE.findall(text))
    ascii_word_count = len(ASCII_WORD_RE.findall(text))
    return cjk_count + ascii_word_count


def main() -> int:
    parser = argparse.ArgumentParser(description="Check markdown prose length.")
    parser.add_argument("file", type=Path, help="Markdown file to inspect")
    parser.add_argument("--min", type=int, default=4000, help="Minimum body length")
    args = parser.parse_args()

    original = args.file.read_text(encoding="utf-8")
    body = extract_body(original)
    total = count_body_units(body)

    print(f"body_length={total}")

    if total < args.min:
        print(f"FAIL: body length {total} is below minimum {args.min}", file=sys.stderr)
        return 1

    print(f"PASS: body length {total} meets minimum {args.min}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
