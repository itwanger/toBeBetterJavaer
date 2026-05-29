# CSDN Reference

## Entry

Open:

```text
https://editor.csdn.net/md/
```

If it redirects through 创作中心, navigate by visible labels: 写文章, Markdown编辑器, 标题, 内容, 保存草稿, 发布文章.

## Fill

- Title: `platform_payloads.csdn.title`
- Keep the title plain and descriptive. Avoid clickbait phrasing such as `让我效率翻倍` unless the user explicitly requests the original headline.
- Body: paste `body_path`, without YAML frontmatter
- Tags: `platform_payloads.csdn.tags`, usually 3-5 tags
- Summary: `platform_payloads.csdn.summary`
- Category/column: use `platform_payloads.csdn.category` if available
- Column: select `platform_payloads.csdn.column` when the editor offers a column/classification selector
- Article type: 原创 for original local articles
- Custom cover: use the first article image from `platform_payloads.csdn.cover_image_url`
- 创作声明: choose `个人观点，仅供参考`
- Article backup: check 同时备份到 GitCode
- 参与的活动: prefer `platform_payloads.csdn.preferred_activity`; if it is not visible, choose the closest related visible activity from `activity_candidates`
- 话题: prefer `platform_payloads.csdn.preferred_topic`; if it is not visible, choose the closest related visible topic from `topic_candidates`
- Visibility: 全部可见 / 公开

Known editor details:

- Title display must often be clicked before the hidden title input is fillable.
- Markdown editor body is commonly `pre.editor__inner`.
- CSDN may auto-transfer image URLs to `i-blog.csdnimg.cn`; this is expected.

## Publish

Use element-level clicking for the final modal button when possible:

```text
.modal__button-bar .btn-b-red
```

Do not treat `articleId` or editor URL as final publication.

## Verify

Open:

```text
https://blog.csdn.net/qing_gee/article/details/{articleId}
```

Success for final publish requires:

- page title includes article title
- header contains 发布 and 公开
- page does not contain 草稿 near the header
- tags are visible

If the success page says "发布成功！正在审核中", re-open the article page after a short wait and verify status again.
