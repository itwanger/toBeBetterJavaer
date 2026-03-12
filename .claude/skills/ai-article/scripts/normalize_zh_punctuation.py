#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path


CJK_CHARS = (
    "\u3400-\u4dbf"
    "\u4e00-\u9fff"
    "\uf900-\ufaff"
    "\u3040-\u30ff"
    "\uac00-\ud7af"
)
CJK_RE = f"[{CJK_CHARS}]"
ASCII_WORD_RE = r"[A-Za-z0-9][A-Za-z0-9._/+:-]*"
FENCED_BLOCK_RE = re.compile(r"(```[\s\S]*?```|~~~[\s\S]*?~~~)")
INLINE_CODE_RE = re.compile(r"(`[^`]*`)")
FRONTMATTER_RE = re.compile(r"\A---\n.*?\n---\n?", re.DOTALL)
URL_RE = re.compile(r"https?://[^\s)>\]]+")
MARKDOWN_LINK_RE = re.compile(r"!?\[[^\]]*\]\([^)]+\)")


def protect(text: str, patterns: list[re.Pattern[str]]) -> tuple[str, list[str]]:
    kept: list[str] = []

    def replacer(match: re.Match[str]) -> str:
        token = f"§KEEP{len(kept)}§"
        kept.append(match.group(0))
        return token

    for pattern in patterns:
        text = pattern.sub(replacer, text)
    return text, kept


def restore(text: str, kept: list[str]) -> str:
    for index, value in enumerate(kept):
        text = text.replace(f"§KEEP{index}§", value)
    return text


def normalize_quotes_line(text: str) -> str:
    result: list[str] = []
    double_open = True

    for char in text:
        if char in {'"', "“", "”"}:
            result.append("“" if double_open else "”")
            double_open = not double_open
            continue
        result.append(char)

    return "".join(result)


def normalize_quotes(text: str) -> str:
    lines = text.splitlines(keepends=True)
    return "".join(normalize_quotes_line(line) for line in lines)


def normalize_spacing(text: str) -> str:
    text = re.sub(rf"({CJK_RE})[ \t]+({ASCII_WORD_RE})", r"\1\2", text)
    text = re.sub(rf"({ASCII_WORD_RE})[ \t]+({CJK_RE})", r"\1\2", text)
    return text


def normalize_punctuation(text: str) -> str:
    replacements = [
        (rf"(?<=[{CJK_CHARS}A-Za-z0-9”’】）》])\s*,\s*(?=[{CJK_CHARS}A-Za-z0-9“‘【《（])", "，"),
        (rf"(?<=[{CJK_CHARS}A-Za-z0-9”’】）》])\s*:\s*(?=[{CJK_CHARS}A-Za-z0-9“‘【《（])", "："),
        (rf"(?<=[{CJK_CHARS}A-Za-z0-9”’】）》])\s*;\s*(?=[{CJK_CHARS}A-Za-z0-9“‘【《（])", "；"),
        (rf"(?<=[{CJK_CHARS}A-Za-z0-9”’】）》])\s*\?\s*(?=[{CJK_CHARS}”’】）》]|$)", "？"),
        (rf"(?<=[{CJK_CHARS}A-Za-z0-9”’】）》])\s*!\s*(?=[{CJK_CHARS}”’】）》]|$)", "！"),
        (rf"(?<=[{CJK_CHARS}])\s*\(\s*(?=[{CJK_CHARS}A-Za-z0-9])", "（"),
        (rf"(?<=[{CJK_CHARS}A-Za-z0-9])\s*\)\s*(?=[{CJK_CHARS}”’】）》]|$)", "）"),
    ]

    for pattern, replacement in replacements:
        text = re.sub(pattern, replacement, text)
    return text


def normalize_text_chunk(text: str) -> str:
    protected, kept = protect(text, [MARKDOWN_LINK_RE, URL_RE, INLINE_CODE_RE])
    protected = normalize_quotes(protected)
    protected = normalize_spacing(protected)
    protected = normalize_punctuation(protected)
    return restore(protected, kept)


def normalize_non_code_block(text: str) -> str:
    return normalize_text_chunk(text)


def normalize_markdown(text: str) -> str:
    frontmatter_match = FRONTMATTER_RE.match(text)
    frontmatter = ""
    body = text
    if frontmatter_match:
        frontmatter = frontmatter_match.group(0)
        body = text[frontmatter_match.end() :]

    parts = FENCED_BLOCK_RE.split(body)
    normalized_parts: list[str] = []

    for index, part in enumerate(parts):
        if index % 2 == 1:
            normalized_parts.append(part)
            continue
        normalized_parts.append(normalize_non_code_block(part))

    return frontmatter + "".join(normalized_parts)


def main() -> int:
    parser = argparse.ArgumentParser(description="Normalize Chinese punctuation in markdown prose.")
    parser.add_argument("file", type=Path, help="Markdown file to normalize")
    parser.add_argument("--check", action="store_true", help="Return non-zero if changes are needed")
    args = parser.parse_args()

    original = args.file.read_text(encoding="utf-8")
    normalized = normalize_markdown(original)

    if args.check:
        return 1 if normalized != original else 0

    if normalized != original:
        args.file.write_text(normalized, encoding="utf-8")
    return 0


if __name__ == "__main__":
    sys.exit(main())
