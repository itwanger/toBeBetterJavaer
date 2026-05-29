# Bilibili Opus / 专栏 Reference

## Entry

- Use Chrome with the user's logged-in Bilibili session.
- Start from `https://member.bilibili.com/platform/upload/text/new-article`.
- Click `新的创作` from the outer creator-center page. Do not start the workflow by opening `https://member.bilibili.com/york/read-draft?` directly.
- The editor lives in an iframe under `https://member.bilibili.com/platform/upload/text/new-edit`.

## Body Import

- For Markdown articles with images, generate a DOCX from the prepared Markdown body:

  ```bash
  pandoc --from=gfm --to=docx BODY.md -o BODY.docx
  ```

- Bilibili import accepts `.docx` and `.md`; keep the generated file under 15 MB.
- Use the import button in the outer editor toolbar, choose the DOCX, and wait for the import to finish.
- Do not locate the import button by fixed screen coordinates. Browser width and height change the toolbar layout. Prefer these approaches, in order:
  - Use a visible DOM/ARIA locator if Bilibili exposes one for `文档导入`, `导入`, or the import toolbar item.
  - If the accessible name is missing, inspect visible toolbar buttons/icons and click the candidate that opens the `文档导入 beta` dialog. Verify the dialog title before choosing a file.
  - In the dialog, click the upload drop zone or its file input, then set the DOCX file through the file chooser.
- If a toolbar click opens only a tooltip or no dialog, it is the wrong control; keep locating by DOM state and dialog verification instead of retrying the same pixel.
- Verify the document outline, body start, image positions, and bottom save state before publishing.

## Image Caveats

- Do not paste the Markdown body directly into the Bilibili rich editor when it contains remote images. Remote image HTML paste can become `upload-failed` placeholders.
- Do not use the direct iframe editor for image uploads. Direct uploads can insert `data:image/...` URLs and fail saving with an illegal image-link error.
- The DOCX import path is the reliable path observed for preserving body images.

## Publish And Verify

- Fill the title after the DOCX import. Use `platform_payloads.bilibili.title`; keep it plain and descriptive. Bilibili title limit is 50 characters.
- Set a custom cover before publishing, but do not download the cover image locally when the editor offers `正文内选择`.
- For cover selection, enable `自定义封面`, choose `正文内选择`, select the first image from the imported article body, then confirm the crop. Use `platform_payloads.bilibili.cover_image_url` only as a reference for which body image should be selected.
- Set 创作声明 to 原创.
- Pick one strongly related topic. Prefer `platform_payloads.bilibili.preferred_topic`; if it is not available in the UI, choose the closest visible topic from `topic_candidates`.
- Add the article to the `AI Agent` collection, or the collection named by `platform_payloads.bilibili.collection`.
- Publish from the outer page only after the bottom status shows a successful save.
- After submission, use `点击查看` if the success dialog appears.
- Verify in `https://member.bilibili.com/opus/management/opus`; the newest item should show the title, timestamp, and a non-draft status.
- The public URL follows `https://www.bilibili.com/opus/{dyn_id}` when it is exposed or opened by Bilibili.
