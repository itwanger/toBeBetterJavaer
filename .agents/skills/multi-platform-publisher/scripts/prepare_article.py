#!/usr/bin/env python3
"""Prepare a Markdown article for multi-platform publishing."""

from __future__ import annotations

import argparse
import json
import re
import tempfile
from pathlib import Path
from typing import Any


FRONTMATTER_RE = re.compile(r"\A---\s*\n(.*?)\n---\s*(?:\n|\Z)", re.DOTALL)
IMAGE_RE = re.compile(r"!\[[^\]]*]\(([^)\s]+)(?:\s+\"[^\"]*\")?\)")
FENCE_RE = re.compile(r"^```", re.MULTILINE)


def parse_scalar(value: str) -> str:
    value = value.strip()
    if len(value) >= 2 and value[0] == value[-1] and value[0] in {"'", '"'}:
        return value[1:-1]
    return value


def parse_frontmatter(raw: str) -> tuple[dict[str, object], str]:
    match = FRONTMATTER_RE.match(raw)
    if not match:
        return {}, raw

    meta: dict[str, object] = {}
    lines = match.group(1).splitlines()
    i = 0
    while i < len(lines):
        line = lines[i]
        if not line.strip() or line.lstrip().startswith("#") or ":" not in line:
            i += 1
            continue

        key, value = line.split(":", 1)
        key = key.strip()
        value = value.strip()
        if value == "":
            items: list[str] = []
            j = i + 1
            while j < len(lines) and lines[j].startswith((" ", "\t")):
                item = lines[j].strip()
                if item.startswith("- "):
                    items.append(parse_scalar(item[2:]))
                j += 1
            if items:
                meta[key] = items
                i = j
                continue
        elif value.startswith("[") and value.endswith("]"):
            meta[key] = [
                parse_scalar(part) for part in value[1:-1].split(",") if part.strip()
            ]
        else:
            meta[key] = parse_scalar(value)
        i += 1

    return meta, raw[match.end() :]


def first_heading(markdown: str) -> str:
    for line in markdown.splitlines():
        match = re.match(r"^#\s+(.+?)\s*$", line)
        if match:
            return match.group(1).strip()
    return ""


def list_value(meta: dict[str, object], *keys: str) -> list[str]:
    for key in keys:
        value = meta.get(key)
        if isinstance(value, str):
            return [part.strip() for part in re.split(r"[,，、]", value) if part.strip()]
        if isinstance(value, list):
            return [str(part).strip() for part in value if str(part).strip()]
    return []


def truncate_text(value: str, limit: int) -> str:
    value = re.sub(r"\s+", " ", value).strip()
    if len(value) <= limit:
        return value
    return value[:limit].rstrip()


def unique(items: list[str]) -> list[str]:
    seen: set[str] = set()
    result: list[str] = []
    for item in items:
        if item and item not in seen:
            seen.add(item)
            result.append(item)
    return result


def load_tag_map(path: Path) -> dict[str, Any]:
    if not path.exists():
        return {}
    return json.loads(path.read_text(encoding="utf-8"))


def mapped_tags(tags: list[str], config: dict[str, Any], platform: str, limit: int) -> list[str]:
    platform_config = config.get(platform, {})
    tag_map = platform_config.get("tag_map", {})
    fallback = platform_config.get("fallback_tags", [])
    mapped = [str(tag_map.get(tag, tag)).strip() for tag in tags]
    mapped.extend(str(tag).strip() for tag in fallback)
    return unique(mapped)[:limit]


def mapped_values(
    tags: list[str],
    config: dict[str, Any],
    platform: str,
    map_key: str,
    fallback_key: str,
) -> list[str]:
    platform_config = config.get(platform, {})
    value_map = platform_config.get(map_key, {})
    fallback = platform_config.get(fallback_key, [])
    mapped = [str(value_map.get(tag, "")).strip() for tag in tags]
    mapped.extend(str(value).strip() for value in fallback)
    return unique(mapped)


def mapped_topics(tags: list[str], config: dict[str, Any], platform: str) -> list[str]:
    return mapped_values(tags, config, platform, "topic_map", "fallback_topics")


def mapped_activities(tags: list[str], config: dict[str, Any], platform: str) -> list[str]:
    return mapped_values(tags, config, platform, "activity_map", "fallback_activities")


def first_paragraph(body: str) -> str:
    blocks = [block.strip() for block in re.split(r"\n\s*\n", body) if block.strip()]
    for block in blocks:
        if not block.startswith(("#", "!", "```", "|")):
            return re.sub(r"[*_`>#\[\]()]|https?://\S+", "", block).strip()
    return ""


def plain_platform_title(title: str) -> str:
    """Make marketing-style titles calmer for publishing platforms."""
    title = title.strip().rstrip("。")
    if "验证码" in title and "浏览器自动化" in title:
        return "AI Agent 浏览器自动化工具 BrowserAct 实测"
    title = re.sub(
        r"^这\s*(\d+\s*个)\s+(.+?)\s*让我效率翻倍，一次配置\s*",
        r"\1实用 \2 推荐，",
        title,
    )
    title = title.replace("效率翻倍", "实用")
    title = re.sub(r"\s+", " ", title).strip()
    return title


def main() -> int:
    parser = argparse.ArgumentParser(description="Prepare Markdown for platform publishing.")
    parser.add_argument("markdown", help="Path to the Markdown article")
    parser.add_argument("--body-out", help="Optional path for frontmatter-free body")
    parser.add_argument(
        "--tag-map",
        default=str(Path(__file__).resolve().parents[1] / "references" / "tag-map.json"),
        help="Path to platform tag/category mapping JSON",
    )
    args = parser.parse_args()

    source = Path(args.markdown).expanduser().resolve()
    raw = source.read_text(encoding="utf-8")
    meta, body = parse_frontmatter(raw)
    body = body.lstrip("\n")

    title = str(meta.get("title") or first_heading(body)).strip()
    plain_title = plain_platform_title(title)
    description = str(meta.get("description") or meta.get("summary") or "").strip()
    if not description:
        description = first_paragraph(body)
    tags = list_value(meta, "tags", "tag")
    categories = list_value(meta, "categories", "category")
    images = IMAGE_RE.findall(body)
    remote_images = [url for url in images if re.match(r"https?://", url)]
    local_images = [url for url in images if not re.match(r"https?://", url)]
    code_fence_count = len(FENCE_RE.findall(body))

    if args.body_out:
        body_path = Path(args.body_out).expanduser().resolve()
    else:
        temp_dir = Path(tempfile.mkdtemp(prefix="multi-platform-publisher-"))
        body_path = temp_dir / f"{source.stem}.body.md"
    body_path.write_text(body, encoding="utf-8")

    tag_config = load_tag_map(Path(args.tag_map).expanduser().resolve())
    summary_limits = tag_config.get("default", {}).get("summary_limits", {})
    csdn_summary_limit = int(summary_limits.get("csdn", 256))
    juejin_summary_limit = int(summary_limits.get("juejin", 100))
    bilibili_summary_limit = int(summary_limits.get("bilibili", 80))
    zhihu_summary_limit = int(summary_limits.get("zhihu", 120))
    cnblogs_summary_limit = int(summary_limits.get("cnblogs", 200))

    csdn_config = tag_config.get("csdn", {})
    juejin_config = tag_config.get("juejin", {})
    bilibili_config = tag_config.get("bilibili", {})
    zhihu_config = tag_config.get("zhihu", {})
    cnblogs_config = tag_config.get("cnblogs", {})
    csdn_topics = mapped_topics(tags, tag_config, "csdn")
    csdn_activities = mapped_activities(tags, tag_config, "csdn")
    bilibili_topics = mapped_topics(tags, tag_config, "bilibili")
    zhihu_topics = mapped_topics(tags, tag_config, "zhihu")
    result = {
        "source_path": str(source),
        "body_path": str(body_path),
        "title": title,
        "short_title": str(meta.get("shortTitle") or "").strip(),
        "description": description,
        "tags": tags,
        "category": categories,
        "remote_images": remote_images,
        "local_images": local_images,
        "image_count": len(images),
        "code_fence_count": code_fence_count,
        "unclosed_code_fence": code_fence_count % 2 == 1,
        "body_char_count": len(body),
        "body_line_count": len(body.splitlines()),
        "frontmatter_keys": sorted(meta.keys()),
        "platform_payloads": {
            "csdn": {
                "title": plain_title,
                "summary": truncate_text(description, csdn_summary_limit),
                "tags": mapped_tags(tags, tag_config, "csdn", 5),
                "category": csdn_config.get("category") or (categories[0] if categories else ""),
                "column": csdn_config.get("column") or "",
                "cover_image_url": remote_images[0] if remote_images else "",
                "cover_source": "first_remote_image" if remote_images else "",
                "article_type": "原创",
                "creation_statement": "个人观点，仅供参考",
                "backup_gitcode": True,
                "topic_candidates": csdn_topics,
                "preferred_topic": csdn_topics[0] if csdn_topics else "",
                "activity_candidates": csdn_activities,
                "preferred_activity": csdn_activities[0] if csdn_activities else "",
            },
            "juejin": {
                "title": plain_title,
                "summary": truncate_text(description, juejin_summary_limit),
                "tags": mapped_tags(tags, tag_config, "juejin", 3),
                "category": juejin_config.get("category") or "开发工具",
                "column": juejin_config.get("column") or "",
            },
            "bilibili": {
                "title": plain_title,
                "summary": truncate_text(description, bilibili_summary_limit),
                "tags": mapped_tags(tags, tag_config, "bilibili", 3),
                "category": bilibili_config.get("category") or "专栏",
                "import_format": "docx",
                "cover_image_url": remote_images[0] if remote_images else "",
                "cover_source": "first_remote_image" if remote_images else "",
                "cover_strategy": "select_first_body_image_in_editor",
                "declaration": "original",
                "topic_candidates": bilibili_topics,
                "preferred_topic": bilibili_topics[0] if bilibili_topics else "",
                "collection": bilibili_config.get("collection") or "AI Agent",
            },
            "zhihu": {
                "title": plain_title,
                "summary": truncate_text(description, zhihu_summary_limit),
                "tags": mapped_tags(tags, tag_config, "zhihu", 3),
                "topic_candidates": zhihu_topics,
                "preferred_topic": zhihu_topics[0] if zhihu_topics else "",
                "column": zhihu_config.get("column") or "AI Agent",
                "import_format": "markdown",
                "body_format": "markdown_without_frontmatter",
                "remove_formatter": True,
                "cover_image_url": remote_images[0] if remote_images else "",
                "cover_source": "first_remote_image" if remote_images else "",
                "cover_strategy": "upload_first_article_image",
                "declaration": zhihu_config.get("declaration")
                or "包含 AI 辅助创作 作者对内容负责",
                "publish": True,
            },
            "cnblogs": {
                "title": plain_title,
                "summary": truncate_text(description, cnblogs_summary_limit),
                "tags": mapped_tags(tags, tag_config, "cnblogs", 3),
                "category": cnblogs_config.get("category") or "AI综合",
                "personal_category": cnblogs_config.get("personal_category") or "AI Agent",
                "editor": "Markdown",
                "body_format": "markdown",
                "fallback_body_format": "html_fragment",
                "fallback_body_conversion": "pandoc --from=gfm --to=html BODY.md -o BODY.html",
                "publish": True,
                "homepage_candidate": True,
                "site_home_original": False,
            },
        },
    }
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
