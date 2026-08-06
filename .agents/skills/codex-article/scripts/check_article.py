#!/usr/bin/env python3
"""Check prose length, writing hard rules, and optional screenshot placeholders."""

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
H2_RE = re.compile(r"^##\s+(.+?)\s*$", re.MULTILINE)
NUMBERED_H2_RE = re.compile(r"^(?P<number>\d{2})、\S")
SCREENSHOT_RE = re.compile(
    r"【截图：(?P<name>[^；】]+)；"
    r"类型：(?P<type>[^；】]+)；"
    r"风格：(?P<style>[^；】]+)；"
    r"截图目标：(?P<goal>[^；】]+)；"
    r"关键词：(?P<keywords>[^】]+)】"
)
SCREENSHOT_PREFIX_RE = re.compile(r"【截图：")
VALID_SCREENSHOT_TYPES = {"证据截图", "解释配图"}
EXPLANATION_STYLES = {
    "whiteboard",
    "skill-card",
    "data-board",
    "three-layer",
    "swimlane",
    "checklist-card",
}
EVIDENCE_STYLE = "evidence-crop"
APPENDIX_HEADINGS = {
    "参考资料",
    "参考来源",
    "资料来源",
    "参考链接",
    "截图来源链接",
}
APPENDIX_LINE_RE = re.compile(
    r"^(?:#{1,6}\s+)?(?:\*\*)?"
    r"(?:参考资料|参考来源|资料来源|参考链接|截图来源链接)"
    r"(?:\*\*)?[：:]?\s*$",
    re.MULTILINE,
)


def strip_appendices(markdown: str) -> str:
    """Drop source-only appendices so they do not inflate prose length."""
    match = APPENDIX_LINE_RE.search(markdown)
    return markdown[: match.start()] if match else markdown


def structure_text(markdown: str) -> str:
    """Hide frontmatter and fenced examples while preserving line structure."""
    text = FRONTMATTER_RE.sub(
        lambda match: "\n" * match.group(0).count("\n"), markdown, count=1
    )
    return FENCED_CODE_RE.sub(lambda match: "\n" * match.group(0).count("\n"), text)


def prose_text(markdown: str) -> str:
    """Remove non-prose regions while keeping visible link labels."""
    text = FRONTMATTER_RE.sub("", markdown, count=1)
    text = FENCED_CODE_RE.sub("", text)
    text = strip_appendices(text)
    text = INLINE_CODE_RE.sub("", text)
    text = IMAGE_RE.sub("", text)
    text = SCREENSHOT_RE.sub("", text)
    text = LINK_RE.sub(r"\1", text)
    return HTML_RE.sub("", text)


def halfwidth_quote_lines(markdown: str) -> list[int]:
    """Return prose line numbers containing ASCII double quotes."""
    text = strip_appendices(structure_text(markdown))
    text = SCREENSHOT_RE.sub("", text)
    result: list[int] = []
    for number, line in enumerate(text.splitlines(), start=1):
        visible = INLINE_CODE_RE.sub("", line)
        visible = IMAGE_RE.sub("", visible)
        visible = re.sub(r"\([^)]*https?://[^)]*\)", "", visible)
        visible = HTML_RE.sub("", visible)
        if '"' in visible:
            result.append(number)
    return result


def heading_title(raw: str) -> str:
    """Normalize numbering and lightweight Markdown formatting in headings."""
    title = re.sub(r"^[0-9０-９]+[、.．]\s*", "", raw.strip())
    return title.strip(" *_`：:")


def content_sections(markdown: str) -> list[tuple[str, str]]:
    """Return top-level content sections, ignoring code and source appendices."""
    text = strip_appendices(structure_text(markdown))
    matches = list(H2_RE.finditer(text))
    sections: list[tuple[str, str]] = []
    for index, match in enumerate(matches):
        title = heading_title(match.group(1))
        if title in APPENDIX_HEADINGS:
            continue
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        sections.append((match.group(1).strip(), text[match.end() : end]))
    return sections


def frontmatter_failures(markdown: str) -> list[str]:
    """Validate the article frontmatter fields used by this workflow."""
    match = FRONTMATTER_RE.match(markdown)
    if not match:
        return ["缺少合法 YAML frontmatter"]

    block = match.group(0)
    failures: list[str] = []
    required = (
        "title",
        "shortTitle",
        "description",
        "keywords",
        "tag",
        "category",
        "author",
        "date",
    )
    for field in required:
        if not re.search(rf"^{re.escape(field)}\s*:", block, re.MULTILINE):
            failures.append(f"frontmatter 缺少字段：{field}")

    keywords_match = re.search(r"^keywords\s*:\s*(.+?)\s*$", block, re.MULTILINE)
    if keywords_match:
        keywords = [
            item.strip()
            for item in re.split(r"[,，]", keywords_match.group(1))
            if item.strip()
        ]
        if len(keywords) != 5:
            failures.append(f"frontmatter keywords 应为 5 个，当前为 {len(keywords)} 个")

    description_match = re.search(
        r"^description\s*:\s*(.+?)\s*$", block, re.MULTILINE
    )
    if description_match:
        description_count = len(CHINESE_RE.findall(description_match.group(1)))
        if not 50 <= description_count <= 120:
            failures.append(
                f"frontmatter description 应为 50～120 个中文字符，当前为 {description_count} 个"
            )

    author_match = re.search(r"^author\s*:\s*(.+?)\s*$", block, re.MULTILINE)
    if author_match and author_match.group(1).strip() != "沉默王二":
        failures.append("frontmatter author 必须为：沉默王二")

    date_match = re.search(r"^date\s*:\s*(.+?)\s*$", block, re.MULTILINE)
    if date_match and not re.fullmatch(r"\d{4}-\d{2}-\d{2}", date_match.group(1).strip()):
        failures.append("frontmatter date 必须使用 YYYY-MM-DD")

    return failures


def screenshot_failures(markdown: str) -> tuple[list[str], list[str]]:
    """Validate screenshot syntax, source appendix, and per-section density."""
    failures: list[str] = []
    warnings: list[str] = []
    structural = structure_text(markdown)
    placeholders = list(SCREENSHOT_RE.finditer(structural))
    prefix_count = len(SCREENSHOT_PREFIX_RE.findall(structural))
    if not placeholders:
        return ["未找到合法截图占位符"], warnings
    if prefix_count != len(placeholders):
        failures.append(
            f"存在格式不完整的截图占位符：共发现 {prefix_count} 个开头，"
            f"仅 {len(placeholders)} 个符合固定格式"
        )

    names: set[str] = set()
    for placeholder in placeholders:
        name = placeholder.group("name").strip()
        screenshot_type = placeholder.group("type").strip()
        style = placeholder.group("style").strip()
        goal = placeholder.group("goal").strip()
        keywords = [
            item.strip()
            for item in re.split(r"[、,，]", placeholder.group("keywords"))
            if item.strip()
        ]
        if name in names:
            failures.append(f"截图名称重复：{name}")
        names.add(name)
        if screenshot_type not in VALID_SCREENSHOT_TYPES:
            failures.append(f"截图「{name}」使用了非法类型：{screenshot_type}")
        elif screenshot_type == "证据截图" and style != EVIDENCE_STYLE:
            failures.append(f"证据截图「{name}」必须使用风格：{EVIDENCE_STYLE}")
        elif screenshot_type == "解释配图" and style not in EXPLANATION_STYLES:
            failures.append(f"解释配图「{name}」使用了非法风格：{style}")
        if len(goal) < 4:
            failures.append(f"截图「{name}」的截图目标过短或为空")
        if len(keywords) < 3:
            failures.append(f"截图「{name}」的关键词少于 3 个")

    source_heading = re.search(r"^##\s+截图来源链接\s*$", structural, re.MULTILINE)
    if not source_heading:
        failures.append("缺少二级标题「## 截图来源链接」")
    else:
        source_block = structural[source_heading.end() :]
        for placeholder in placeholders:
            name = placeholder.group("name").strip()
            source_line = re.search(
                rf"^-\s+{re.escape(name)}[：:]\s*(.+?)\s*$",
                source_block,
                re.MULTILINE,
            )
            if not source_line:
                failures.append(f"截图「{name}」未在截图来源链接中按名称映射")
                continue
            source_value = source_line.group(1)
            if not re.search(r"https?://|无外部截图|自行操作|需在", source_value):
                failures.append(
                    f"截图「{name}」的来源缺少 URL 或无外部截图/自行操作说明"
                )

    sections = content_sections(markdown)
    if not sections:
        failures.append("未找到正文二级标题")

    section_numbers: list[int] = []
    for title, body in sections:
        numbered = NUMBERED_H2_RE.match(title)
        if not numbered:
            failures.append(f"正文二级标题未使用「## 01、标题」格式：{title}")
        else:
            section_numbers.append(int(numbered.group("number")))
        count = len(SCREENSHOT_RE.findall(body))
        visible = prose_text(body)
        chinese_count = len(CHINESE_RE.findall(visible))
        if count == 0:
            failures.append(f"正文章节「{title}」没有截图占位符")
        elif chinese_count > 900 and count < 2:
            warnings.append(
                f"正文章节「{title}」有 {chinese_count} 个中文字符，"
                f"仅 {count} 个截图占位符，请确认是否存在多个独立认知转折"
            )
        if count > 3:
            warnings.append(
                f"正文章节「{title}」有 {count} 个截图占位符，请人工确认没有堆图或重复证明"
            )
        if count:
            first = SCREENSHOT_RE.search(body)
            if first and len(body) > 200 and first.start() / len(body) > 0.8:
                warnings.append(
                    f"正文章节「{title}」的首张截图位于章节末段，请检查是否应前移"
                )

    if section_numbers and section_numbers != list(range(1, len(section_numbers) + 1)):
        failures.append(f"正文二级标题编号不连续：{section_numbers}")

    first_h2 = H2_RE.search(strip_appendices(structural))
    intro = structural[: first_h2.start()] if first_h2 else structural
    if not SCREENSHOT_RE.search(intro):
        warnings.append("导语没有核心截图，请确认开场是否确实不需要证据图")

    prose_count = len(CHINESE_RE.findall(prose_text(markdown)))
    average = prose_count / len(placeholders)
    if average < 350:
        warnings.append(
            f"全篇平均每 {average:.0f} 个正文中文字符 1 张图，可能过密"
        )

    for previous, current in zip(placeholders, placeholders[1:]):
        between = structural[previous.end() : current.start()]
        if len(CHINESE_RE.findall(prose_text(between))) < 25:
            warnings.append(
                f"截图「{previous.group('name')}」与「{current.group('name')}」之间正文过少"
            )

    return failures, warnings


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("article", type=Path, help="Markdown article path")
    parser.add_argument("--min-chars", type=int, default=4000)
    parser.add_argument(
        "--require-screenshots",
        action="store_true",
        help="validate screenshot placeholders, source appendix, and section coverage",
    )
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

    screenshot_warnings: list[str] = []
    if args.require_screenshots:
        failures.extend(frontmatter_failures(markdown))
        screenshot_issues, screenshot_warnings = screenshot_failures(markdown)
        failures.extend(screenshot_issues)

    print(f"正文中文字数: {char_count}")
    print(f"最低要求: {args.min_chars}")
    print(f"固定开场: {'通过' if greeting_ok else '未通过'}")
    print(f"半角双引号: {len(quote_lines)} 处")
    if args.require_screenshots:
        screenshot_count = len(SCREENSHOT_RE.findall(structure_text(markdown)))
        print(f"截图占位符: {screenshot_count} 个")
        print(f"截图检查警告: {len(screenshot_warnings)} 条")
        for warning in screenshot_warnings:
            print(f"WARN: {warning}")

    if failures:
        for failure in failures:
            print(f"FAIL: {failure}")
        return 1

    print("PASS: 文章机械检查通过")
    return 0


if __name__ == "__main__":
    sys.exit(main())
