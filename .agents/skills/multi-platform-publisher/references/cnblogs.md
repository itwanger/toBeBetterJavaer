# Cnblogs / 博客园 Reference

## Entry

- Use Chrome with the user's logged-in Cnblogs session.
- Start from `https://i.cnblogs.com/posts/edit`.
- Before filling the body, choose editor `Markdown` from the editor switcher if the page is not already in Markdown mode.

## Body Format

- Fill the Markdown editor with the prepared Markdown body from `body_path`.
- Do not use the `TextBox` editor for raw Markdown. `TextBox` can publish literal Markdown, including raw `![](url)` image syntax.
- If Markdown mode cannot be selected, fall back to converting Markdown to an HTML fragment and filling `TextBox`:

  ```bash
  pandoc --from=gfm --to=html BODY.md -o BODY.html
  ```

- Public-page verification is mandatory either way. The quality gate is `rawMarkdownMarkers == false`.

## Fields

- Use a plain, non-clickbait title. Prefer `platform_payloads.cnblogs.title`.
- Fill summary from `platform_payloads.cnblogs.summary`.
- Personal category: select `AI Agent`.
- Use an AI-related site category. Prefer `AI综合` when available; `Agentic` is also acceptable for AI Agent / Skills articles.
- Submit to the regular homepage candidate area:
  - `投稿至首页候选区`: checked
  - `投稿至博客园首页(原创精品)`: unchecked
- Keep normal visibility and syndication defaults:
  - `发布`: checked
  - `博客主页显示`: checked
  - `允许评论`: checked
  - `RSS聚合`: checked
  - access: `公开`

## Tags

- The tag selector may autocomplete to unrelated existing tags when pressing `Enter`.
- To create a new tag, type the tag text and use the UI's `新建标签` path, usually `Tab`.
- Verify selected tag chips after input. If the selector mis-picks a tag such as `Java`, remove it before publishing.

## Publish And Verify

- New posts use the bottom `发布` button. Editing an already-published post uses `保存修改`.
- A backend `发布成功` or `保存成功` page is not enough. Always open the public URL, usually `https://www.cnblogs.com/qing-gee/p/{postId}`.
- Verify the public page:
  - title matches the plain title
  - body start matches the prepared article
  - headings render as headings
  - article images render
  - raw Markdown markers such as `![](https://...)` are absent
