# Juejin Reference

## Entry

Open:

```text
https://juejin.cn/editor/drafts/new?v=2
```

## Fill

- Title: `platform_payloads.juejin.title`
- Keep the title plain and descriptive. Avoid clickbait phrasing such as `让我效率翻倍` unless the user explicitly requests the original headline.
- Body: paste `body_path` into the CodeMirror editor
- Category: `platform_payloads.juejin.category`; for AI tooling articles use 开发工具 unless the user says otherwise
- Column: select `platform_payloads.juejin.column` when the publish panel offers a 专栏 selector
- Tags: use `platform_payloads.juejin.tags`, mapped to existing Juejin tags
- Summary: `platform_payloads.juejin.summary`, max 100 chars

Known editor details:

- The editor is ByteMD/CodeMirror. If direct CodeMirror JS access is unavailable, paste into `.CodeMirror textarea`.
- Verify after paste with the editor status line: character count, line count, and body word count should be nonzero.
- Juejin may transfer remote images to private `p*-xtjj-private.juejin.cn` URLs; this is expected.
- The first publish click opens a publish panel. It is not final.

## Publish

Required panel fields:

- 分类
- 添加标签
- 编辑摘要

Prefer element-level click on the final visible text `确定并发布`. Coordinates are fragile because the button can sit near or below the viewport edge.

## Verify

The success page is:

```text
https://juejin.cn/published
```

Extract the article link from the success page. It usually looks like:

```text
https://juejin.cn/spost/{id}
```

Open that article URL and verify:

- title is present
- author page shows the article body
- status can be 审核中 immediately after publishing

`https://juejin.cn/editor/drafts/{id}` is only a draft/editor URL and is not a successful publication.
