---
name: video-cover-image
description: Generate matched 3:4, 16:9, and 4:3 short-video cover images from toBeBetterJavaer video scripts or AI/Java technical topics. Use when the user asks for 视频封面, 封面图, 横版和竖版, 小红书/抖音/B站/快手封面, pure-text covers with 白色大字+黄色小字, reference-image-matched covers, or wants a repeatable cover workflow for Markdown scripts under docs/src/ai/video/.
---

# Video Cover Image

## Overview

Create a matched three-cover set for one technical short-video script:

- Vertical cover: `3:4`, for 小红书、抖音、快手 and mobile feeds.
- Widescreen cover: `16:9`, for B站 and standard widescreen video thumbnails.
- Standard horizontal cover: `4:3`, for platforms or placements that prefer a less-wide thumbnail.

By default, generate all three covers as one matched set. Generate fewer ratios only when the user explicitly says only/只要/单独生成 specific ratios.

Use the `itwanger-image` style rules when available. Keep prompt context isolated: use only the target script, user-provided reference images, and this skill's rules. Do not pull in unrelated browser/editor/window/history content.

If the user provides a reference image or asks for `纯文本`, `白色大字+黄色小字`, `黑色/黑灰背景`, or `参考图这种布局`, use the pure-text reference style below instead of the default illustrated style. Use deterministic rendering for this mode so Chinese text stays exact.

For video covers, do not add copyright signatures, watermarks, corner marks, or small `©️沉默王二` labels unless the user explicitly asks for them. This cover-specific rule overrides any lower-level image-skill signature preference.

## Fixed Presenter Reference

For every illustrated cover, use this image as the canonical presenter reference:

`references/itwanger-cover-character.png`

- Preserve the same black spiky hairstyle, large black rectangular glasses, youthful face, large brown eyes, yellow shirt, black tie, head-to-body ratio, and bright Chinese knowledge-cover rendering style.
- The presenter is a fixed visual identity. Do not redraw him from a real portrait, infer a new face, switch to a mature realistic caricature, change the hairstyle, reduce the eye size, or substitute another male or female character.
- Adapt only the expression, gaze, hand gesture, and pose to the script topic.
- Pass the canonical reference image to `image_gen` for every generated ratio. When regenerating or editing an existing cover, this reference takes priority over the character appearance in any other cover reference.

## Workflow

1. Resolve exactly one script or topic.
   - If the user provides a file path, read that file.
   - If the user gives a filename under `docs/src/ai/video/`, resolve it there.
   - If several files match, ask which one.
   - If the user asks to batch a directory, process one file at a time and produce one `3:4` / `16:9` / `4:3` set per script.

2. Extract cover material from the script.
   - Topic: the exact subject and the mechanism, conflict, or question the script explains.
   - Main title: prefer one complete, click-driving question that names the subject and makes the video topic explicit, such as `Claude Code 的短期记忆是如何实现的？`. Avoid vague noun-only titles such as `短期记忆` or `自动压缩`.
   - Secondary hook: omit it by default. Add at most one short mechanism keyword only when the user explicitly requests a label or the title cannot state the topic clearly on its own.
   - Visual metaphor: one self-explanatory mechanism scene that previews the answer without relying on labels, such as many message cards being compressed into one summary card.
   - Presenter expression: match the topic while keeping the same 二哥 character. Use confident/focused for architecture and collaboration, serious/alert for pitfalls and bugs, excited/energetic for tutorials and capability reveals, and skeptical/surprised for wrong-answer interview hooks.

3. Select the cover mode.
   - Use pure-text reference mode when the user asks for a text-only cover, provides a black/gray reference card, or corrects toward "one white title line plus yellow keyword lines".
   - Use default illustrated mode for normal knowledge-zone covers with presenter, icon, and blue-sky energy.

4. Keep text short enough for image generation.
   - Prefer exactly 1 visible text block: one dominant question-style main title. Add one short secondary hook only when explicitly requested.
   - Let the main title wrap to 2-3 large lines when needed; do not shorten it into an ambiguous keyword pile.
   - Avoid dense labels, small body text, repeated keywords, bottom tags, and multiple equal-weight slogans.
   - Apply the thumbnail test: when viewed small, the title alone must state what the video explains, while the illustration should hint at the answer and create curiosity.
   - If exact wording is critical, simplify the generated text first; if still unstable, generate a cleaner illustration and add text in a separate deterministic editing step.

5. For pure-text reference mode, render with `scripts/render_text_cover.py`.
   - Title: one short white line, usually the exact interview question or topic, such as `什么是 ReAct?`.
   - Yellow text: one or two keyword lines. If one line is too small, split into two lines; do not force everything onto one line.
   - Example command:

```bash
python3 .agents/skills/video-cover-image/scripts/render_text_cover.py \
  --title "什么是 ReAct?" \
  --line "Thought、Action、Observation" \
  --line "CoT、工具调用、外部验证" \
  --prefix "what-is-react-cover"
```

6. For default illustrated mode, generate the vertical cover first with `image_gen`.
   - Ratio: `3:4`, target size similar to `1086 x 1448`.
   - Composition: dominant question title, one compact visual cue, and presenter in lower/right area.
   - Apply the default high-impact blue-sky knowledge-cover style.
   - Always include `references/itwanger-cover-character.png` as the presenter reference.

7. Generate the `16:9` widescreen cover with `image_gen`.
   - Ratio: `16:9`, target size similar to `1920 x 1080` or `1600 x 900`.
   - Composition: dominant question title, one compact visual cue, and center/right presenter.
   - Reuse the same title, visual cue, character, color system, and topic framing as the vertical cover.
   - Include the same canonical presenter reference; do not rely on the vertical output alone to preserve identity.

8. Generate the `4:3` horizontal cover with `image_gen`.
   - Ratio: `4:3`, target size similar to `1440 x 1080` or `1600 x 1200`.
   - Recompose for the less-wide canvas; do not crop the `16:9` image mechanically.
   - Reuse the same title, visual cue, character, color system, and topic framing as the other covers.
   - Include the same canonical presenter reference; do not reinterpret the character for the new canvas.

9. Run a quick visual quality gate before final response.
   - Aspect ratio is correct for each image.
   - The main title names the exact subject and question; the video topic is obvious from the title alone at thumbnail size.
   - The illustration previews the mechanism or answer instead of adding unrelated decoration.
   - There is no keyword pile or bottom tag: only the main title appears unless the user explicitly requested a secondary hook.
   - Chinese text has no obvious garbling in the large title/punch lines.
   - In pure-text mode: black/gray textured background, one bold white title, one or two large yellow keyword lines, no blue background, no icon, no presenter, no outer white UI frame.
   - In default illustrated mode: the presenter visibly matches `references/itwanger-cover-character.png`, including black spiky hair, large black glasses, large brown eyes, youthful face, yellow shirt, and black tie.
   - No female avatar, no unrelated fantasy costume, no real brand logo unless explicitly requested.
   - No copyright signature, watermark, corner mark, or small `©️沉默王二` label unless explicitly requested.
   - No outer frame, no rounded screenshot container, no dense small text.

10. Deliver all three images.
   - Show the `3:4`, `16:9`, and `4:3` images with Markdown image tags.
   - Include absolute generated file paths and dimensions.
   - Do not move images into the repo unless the user explicitly asks.

## Default Style

- Bright blue sky/cloud background with speed lines or a clean energetic gradient.
- Thick white English or Chinese title, black 3D shadow.
- No secondary hook or bottom tag by default; add one only when explicitly requested.
- Use one compact visual cue. When it is a brand/app logo, keep it small: roughly 14-18% of canvas width on vertical covers and 8-12% on horizontal covers, so it remains an identifier rather than a main visual block.
- 二哥 cartoon presenter: match `references/itwanger-cover-character.png` exactly in identity and rendering style: Q-version big head, black spiky hair, large black rectangular glasses, large brown eyes, youthful face, yellow shirt, and black tie.
- Presenter expression, gaze, hand gesture, and pose may change with the topic, but the face, hair, glasses, proportions, clothing, and overall illustration style stay fixed. Avoid mature realistic caricatures, softened side-parted hair, small eyes, exaggerated meme faces, angry faces, horror expressions, or changing the presenter into a different person.
- No copyright signature or watermark on video covers by default.
- Knowledge-zone feel: normal, clean, platform-ready, not neon cyberpunk, not overly AI-looking.

## Pure Text Reference Style

Use this style when matching a text-only reference card:

- Background: black/charcoal gray texture, center slightly lighter, edges darker. Avoid blue gradients, decorative symbols, characters, icons, or screenshots.
- Typography: use a real bold Chinese font if available, preferably `Hiragino Sans GB W6`; fall back to `PingFang SC Semibold`. Avoid heavy faux-bold offsets that deform Chinese glyphs.
- White title: one centered line, visually bold, roughly 75-86% of cover width.
- Yellow keyword block: one or two centered lines. If one line makes the yellow text small, split to two lines. The whole yellow block should occupy roughly 20-23% of the reference card height.
- Horizontal `16:9`: place the white title around 28-31% of height; place yellow lines around 51-64% of height.
- Vertical `3:4`: place the white title around 34% of height; place yellow lines around 52-60% of height.
- Keep the overall composition concentrated in the middle/upper-middle. Do not fill every corner; the reference layout relies on negative space.
- Prefer concise keyword lines extracted from the script, such as `Thought、Action、Observation` and `CoT、工具调用、外部验证`.

## Prompt Pattern

Build two prompts from the same extracted payload.

Vertical prompt outline:

```text
生成一张竖版中文短视频封面图，比例 3:4，适合小红书、抖音、快手和B站竖版物料。
主题来自口播稿：{topic}
核心关键词：{keywords}
画面风格：高冲击中文知识封面，明亮蓝色天空和云层背景，速度线和光效，厚重立体字。
主视觉：严格参考 `references/itwanger-cover-character.png` 的固定二哥形象：黑色刺发、大号黑框眼镜、大棕眼、青年动漫脸、黄色衬衫、黑色领带；只把表情调整为 {expression}，并调整手势指向 {visual_icon}，不要改变脸型、发型、眼睛比例、服装和画风。
封面文字必须少而大，默认只保留一块：
主标题（完整问题句，可分 2-3 行）：{main_title}
要求：不要自动添加副标题、底部标签或额外关键词；文字清楚，人物脸不被挡，安全边距足够，不要白底，不要外层边框，不要密集小字。
不要添加版权签名、水印、角标或 `©️沉默王二` 小字。
```

Horizontal `16:9` prompt outline:

```text
生成一张横版中文短视频封面图，比例 16:9，适合B站及其他平台的标准横版视频封面。
主题来自口播稿：{topic}
核心关键词：{keywords}
画面风格：延续竖版同一套风格，明亮蓝色天空和云层背景，速度线和放射光效。
横版构图：左侧 {visual_icon}，中间偏右放严格匹配 `references/itwanger-cover-character.png` 的固定二哥形象，只根据主题把表情设为 {expression} 并调整姿势；顶部或右侧放完整问题式主标题。
封面文字必须少而大，默认只保留一块：
主标题（完整问题句，可分 2-3 行）：{main_title}
要求：不要自动添加副标题、底部标签或额外关键词；中文清楚，人物脸不被挡，横版安全区充足，不要白底，不要外层边框，不要密集小字。
不要添加版权签名、水印、角标或 `©️沉默王二` 小字。
```

Horizontal `4:3` prompt outline:

```text
生成一张横版中文短视频封面图，比例 4:3，适合偏标准画幅的视频缩略图。
主题来自口播稿：{topic}
核心关键词：{keywords}
画面风格：延续同组封面的明亮蓝色天空、云层、速度线和放射光效。
4:3 构图：重新安排标题、{visual_icon} 和严格匹配 `references/itwanger-cover-character.png` 的固定二哥形象，不要机械裁切 16:9 图片，不要重新设计人物。
封面文字默认只保留一块：
主标题（完整问题句，可分 2-3 行）：{main_title}
要求：不要自动添加副标题、底部标签或额外关键词；中文清楚，人物脸不被挡，安全区充足，不要白底，不要外层边框，不要密集小字。
不要添加版权签名、水印、角标或 `©️沉默王二` 小字。
```

## Extraction Examples

For `docs/src/ai/video/plan-and-execute.md`:

- Topic: Agent 面试题 Plan-and-Execute
- Main title: `Agent 为什么需要 Plan & Execute？`
- Icon: glowing Agent flow icon with Planner / Executor / Replanner nodes

For a script about ReAct death loops:

- Topic: Agent 为什么会死循环
- Main title: `ReAct Agent 为什么会陷入死循环？`
- Icon: glowing loop arrow plus stuck task card or STOP hand symbol

For a script about Skill hit rate:

- Topic: Skills 太多如何保证命中率
- Main title: `Skills 太多，Agent 如何精准命中？`
- Icon: search radar selecting one highlighted skill card

For `docs/src/ai/video/claude-code-short-term-memory.md`:

- Topic: Claude Code 的短期记忆机制
- Main title: `Claude Code 的短期记忆是如何实现的？`
- Icon: compact Claude Code brand/app icon; keep it small and do not add a mechanism label
