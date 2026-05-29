---
name: multi-platform-publisher
description: Publish local Markdown articles from the toBeBetterJavaer workflow to multiple authenticated writing platforms with Chrome, especially CSDN, Juejin, and Bilibili opus/专栏. Use when the user asks to sync, post, publish, cross-post, or create drafts from a Markdown article on platforms such as CSDN, 掘金/Juejin, B 站/Bilibili, 知乎, 博客园, or similar sites, and when final status must be verified from the resulting article page rather than assumed from editor saves.
---

# Multi Platform Publisher

## Overview

Turn one local Markdown article into verified platform posts. Keep the work state-machine driven: prepare once, publish per platform, then verify the final article page.

## Workflow

1. Resolve exactly one Markdown file. If several files match, ask which one.
2. Run the preparation script:

   ```bash
   python3 .agents/skills/multi-platform-publisher/scripts/prepare_article.py /absolute/path/to/article.md
   ```

3. Stop before opening Chrome if the JSON reports:
   - empty `title`
   - `unclosed_code_fence: true`
   - any `local_images`
4. Use Chrome for all platform editor work because these sites require the user's logged-in browser session.
5. Load only the needed platform reference:
   - CSDN: `references/csdn.md`
   - Juejin: `references/juejin.md`
   - Bilibili: `references/bilibili.md`
   - Zhihu/知乎: `references/zhihu.md`
   - Cnblogs/博客园: `references/cnblogs.md`
6. Before opening platform editors, propose the prepared platform title to the user and wait for confirmation. If the user rejects it, use the title they provide; do not begin cross-posting with an unconfirmed title.
7. Fill title, body, tags, category, and summary from `platform_payloads`, after applying the confirmed title.
8. Publish only if the user explicitly asked to publish. Otherwise save draft and verify the draft.
9. Verify using the final article page, not editor state:
   - final URL is captured
   - title is present
   - status is public, published, or审核中 depending on platform
   - page does not say 草稿 when final publication was requested
   - body start matches the prepared body

## Preparation Contract

The script outputs JSON with:

- `body_path`: frontmatter-free Markdown body to paste into editors
- `title`, `description`, `tags`, `category`
- `remote_images`, `local_images`, `image_count`
- `code_fence_count`, `unclosed_code_fence`
- `platform_payloads.csdn`
- `platform_payloads.juejin`
- `platform_payloads.bilibili`
- `platform_payloads.zhihu`
- `platform_payloads.cnblogs`

Use platform payloads instead of reinterpreting metadata during Chrome work.

## Publishing Rules

- Preserve Markdown body content unless a platform-specific reference says to adapt it.
- Keep remote image Markdown links. Let platforms transfer or proxy images if they normally do that.
- Do not upload local images in this workflow. Convert them to CDN URLs first.
- Prefer element-level clicks/selectors over coordinates for final publish buttons.
- For rich editors that support file import, use the platform import workflow instead of direct Markdown paste when the article contains headings, code, tables, or images. Direct paste is only an emergency fallback after import fails for a clearly identified reason, and it must pass the platform-specific render checks.
- If login, CAPTCHA, real-name verification, account risk, or legal confirmation appears, stop and ask the user to complete it.
- After publishing, keep only the verified final article tabs open for user inspection.

## Status Report

Report each platform with:

- platform name
- final URL
- observed final status
- important caveats, such as 审核中 or image transfer

Do not claim success from "保存成功", "草稿箱", an editor `articleId`, or a draft URL alone.
