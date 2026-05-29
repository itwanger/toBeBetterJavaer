# Zhihu Publishing

Use the user's logged-in Chrome session and the Zhihu article editor at `https://zhuanlan.zhihu.com/write`.

## Payload

Use `platform_payloads.zhihu` from `prepare_article.py`:

- `title`: plain, factual platform title
- `body_path`: import the frontmatter-free Markdown body
- `topic_candidates`: topic search order; use separate AI-related and Agent-related topics
- `column`: target column, usually `AI Agent`
- `declaration`: `包含 AI 辅助创作 作者对内容负责`
- `cover_image_url`: first remote article image
- `cover_strategy`: upload the first article image as the article cover

## Editor Workflow

1. Open the editor and use the toolbar `导入` button, then choose Markdown/document import. Locate the button by visible text, accessible role/name, or DOM structure around the toolbar; do not hard-code screen coordinates because browser size changes.
2. Import a Markdown file made from `body_path`; do not include YAML frontmatter or article formatter metadata.
3. Fill the title after import if Zhihu leaves the title box empty.
4. Open `发布设置`.
5. Add the cover from the article's first image. If Zhihu does not offer "use body image", download the first remote image to a temporary/local output file and upload it through the file chooser.
6. Set `创作声明` to `包含 AI 辅助创作 作者对内容负责`.
7. Add strongly related topics from `topic_candidates`. For Zhihu topics, do not use `AI Agent` as one combined topic query. Pick separate AI-related and Agent-related topics, such as `人工智能`, `AI`, `Agent`, `智能体`, plus `大模型` when relevant.
8. Select `发布到专栏` and choose `AI Agent`.
9. Publish.

## Import Guardrails

- Do not directly paste long Markdown into the Zhihu rich editor as the normal path. It can leave raw Markdown markers, broken heading levels, or unresolved image syntax even when the text appears on screen.
- If import fails, identify the concrete failure first: no file chooser opened, wrong import dialog, unsupported file, page became unresponsive, upload timeout, or Zhihu error message. Retry the import path once after refreshing or reopening the editor before considering a fallback.
- After import, verify the editor is truly parsed: word count is greater than zero, publish/preview buttons are enabled, body images render as images rather than literal `![](url)`, and headings/code blocks are formatted.
- If direct paste is used as an emergency fallback, click `确认并解析` if Zhihu enters Markdown input mode, then run the same parse checks above. If images or formatting are still raw, stop and ask the user to take over instead of publishing a degraded article.

## Verification

Verify from the final article page, not from the editor:

- URL is no longer `/edit`
- title matches `platform_payloads.zhihu.title`
- page shows `所属专栏` with `AI Agent`
- page shows the AI-assisted declaration
- selected topics are visible
- body starts with the prepared Markdown body
- images are rendered as images, not raw Markdown image syntax
- raw Markdown markers such as `![](https://...)`, leading `## ` headings, and fenced code backticks are absent from rendered prose unless intentionally part of a code block
