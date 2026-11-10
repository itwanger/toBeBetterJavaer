---
name: video-cover-image
description: Generate matched 3:4, 16:9, and 4:3 short-video covers from scripts or technical topics, including blue-sky illustrated, pure-text, and 二哥 pixel-game styles. Use for 视频封面, 封面图, platform aspect ratios, or matching a specified cover style.
---

# Video Cover Image

## Overview

Create a matched three-cover set for one technical short-video script:

- Vertical cover: `3:4`, for 小红书、抖音、快手 and mobile feeds.
- Widescreen cover: `16:9`, for B站 and standard widescreen video thumbnails.
- Standard horizontal cover: `4:3`, for platforms or placements that prefer a less-wide thumbnail.

By default, generate all three covers as one matched set. Generate fewer ratios only when the user explicitly says only/只要/单独生成 specific ratios.

For hand-drawn covers use `wanger-hand-drawn-image`; for pixel covers use `wanger-pixel-image`. Keep prompt context isolated: use only the target script, user-provided reference images, and this skill's rules. Do not pull in unrelated browser/editor/window/history content.

There are three selectable modes; a user-selected style or reference takes priority:

| Style | Selection | Appearance and method |
| --- | --- | --- |
| 天空风 | Default; also `天空风` or `蓝天封面` | Blue sky, 二哥 cartoon presenter and a compact mechanism illustration; generate with `image_gen`. |
| 黑底风 | `黑底`, `纯文字`, `白色大字+黄色小字`, or a black/gray text-only reference | Dark background, white title and yellow keyword lines, no presenter; render with `scripts/render_text_cover.py`. |
| 像素风 | Explicit `像素风`, `pixel`, `像素游戏风`, or 二哥 Remotion pixel style | Warm pixel-game world and pixel presenter; read `wanger-pixel-image` and apply the cover-specific rules below, then generate with `image_gen`. |

Other references are interpreted according to their actual content, not automatically as pure text. Pixel mode is selected only when explicitly requested. For a video cover, its proportions, minimal text and no-signature rule take precedence over the pixel article-illustration defaults; its six article layouts are not mandatory for a cover.

For video covers, do not add copyright signatures, watermarks, corner marks, or small `©️沉默王二` labels unless the user explicitly asks for them. This cover-specific rule overrides any lower-level image-skill signature preference.

## Fixed Presenter Reference

For blue-sky illustrated covers, use this image as the canonical presenter reference:

`references/itwanger-cover-character.png`

- Preserve the same black spiky hairstyle, large black rectangular glasses, youthful face, large brown eyes, yellow shirt, black tie, head-to-body ratio, and bright Chinese knowledge-cover rendering style.
- The presenter is a fixed visual identity. Do not redraw him from a real portrait, infer a new face, switch to a mature realistic caricature, change the hairstyle, reduce the eye size, or substitute another male or female character.
- Adapt expression, gaze, action, pose, viewing angle, framing, and placement to the script topic; preserve the recognizable identity rather than copying the reference pose.
- Pass the canonical reference image to `image_gen` for every generated ratio. When regenerating or editing an existing cover, this reference takes priority over the character appearance in any other cover reference.

## Presenter Variety Across Videos

Different videos should visibly vary the presenter to prevent visual fatigue. Keep 二哥 recognizable while deliberately changing expression, action, pose, gaze, viewing angle, framing, and placement. Do not mechanically reuse the reference's “point at an icon while touching glasses” pose or always place him on the right. Choose a topic-related action, such as operating a switch, inspecting a result, comparing alternatives, or presenting an object.

Before generating, choose the current video's presenter treatment and state it in the prompt. When a recent cover is already available in the current conversation, avoid repeating its overall pose and composition; do not import its technical content or search unrelated chats for references. The three ratios for one video may share a treatment, with composition adapted to each canvas. A later explicit appearance request takes priority.

## Workflow

1. Resolve exactly one script or topic.
   - If the user provides a file path, read that file.
   - If the user gives a filename under `docs/src/ai/video/`, resolve it there.
   - If several files match, ask which one.
   - If the user asks to batch a directory, process one file at a time and produce one `3:4` / `16:9` / `4:3` set per script.

2. Extract cover material from the script.
   - Topic: the exact subject and the mechanism, conflict, or question the script explains.
   - Main title: prefer one complete, click-driving question that names the subject and makes the video topic explicit, such as `Claude Code 的短期记忆是如何实现的？`. Avoid vague noun-only titles such as `短期记忆` or `自动压缩`.
   - Secondary hook: for illustrated modes omit it by default. Black-background mode normally uses one or two concise yellow keyword lines.
   - Visual metaphor: one self-explanatory mechanism scene that previews the answer without relying on labels, such as many message cards being compressed into one summary card.
   - Presenter expression: match the topic while keeping the same 二哥 character. Use confident/focused for architecture and collaboration, serious/alert for pitfalls and bugs, excited/energetic for tutorials and capability reveals, and skeptical/surprised for wrong-answer interview hooks.
   - Presenter treatment: apply Presenter Variety Across Videos; choose the action, angle, framing, and placement for this video instead of inheriting the reference pose.

3. Select the cover mode.
   - Use pixel-game mode when requested; follow the Pixel Game Style section below.
   - Use pure-text reference mode when the user asks for a text-only cover, provides a black/gray reference card, or corrects toward "one white title line plus yellow keyword lines".
   - Use default illustrated mode for normal knowledge-zone covers with presenter, icon, and blue-sky energy.

4. Keep text short enough for image generation.
   - For illustrated modes prefer one dominant question-style title; add a short secondary hook only when requested. In black-background mode use one white title and one or two concise yellow keyword lines.
   - Let the main title wrap to 2-3 large lines when needed; do not shorten it into an ambiguous keyword pile.
   - Avoid dense labels, small body text, repeated keywords, bottom tags, and multiple equal-weight slogans.
   - Apply the thumbnail test: when viewed small, the title alone must state what the video explains, while the illustration should hint at the answer and create curiosity.
   - If exact wording is critical, simplify the generated text first; if still unstable, generate a cleaner illustration and add text in a separate deterministic editing step.

5. For pure-text reference mode, render with `scripts/render_text_cover.py`.
   - Title: one short white line, usually the exact interview question or topic, such as `什么是 ReAct?`.
   - Yellow text: one or two keyword lines. If one line is too small, split into two lines; do not force everything onto one line.
   - Example command:

```bash
python3 /Users/itwanger/.codex/skills/video-cover-image/scripts/render_text_cover.py \
  --title "什么是 ReAct?" \
  --line "Thought、Action、Observation" \
  --line "CoT、工具调用、外部验证" \
  --prefix "what-is-react-cover" \
  --out-dir /absolute/path/to/output
```

6. For illustrated modes, generate the vertical cover first with `image_gen`. In pixel-game mode apply its references and style rules instead of the blue-sky character and background instructions in steps 6–8.
   - Ratio: `3:4`, target size similar to `1086 x 1448`.
   - Composition: dominant question title, one compact visual cue, and presenter placed according to this video's selected treatment and available space.
   - In blue-sky mode apply the high-impact blue-sky knowledge-cover style.
   - For blue-sky mode include `references/itwanger-cover-character.png` as the presenter reference.

7. Generate the `16:9` widescreen cover with `image_gen`.
   - Ratio: `16:9`, target size similar to `1920 x 1080` or `1600 x 900`.
   - Composition: dominant question title, one compact visual cue, and presenter recomposed for widescreen using this video's selected treatment.
   - Reuse the same title, visual cue, character, color system, and topic framing as the vertical cover.
   - Include the mode's presenter reference; do not rely on the vertical output alone to preserve identity.

8. Generate the `4:3` horizontal cover with `image_gen`.
   - Ratio: `4:3`, target size similar to `1440 x 1080` or `1600 x 1200`.
   - Recompose for the less-wide canvas; do not crop the `16:9` image mechanically.
   - Reuse the same title, visual cue, character, color system, and topic framing as the other covers.
   - Include the mode's presenter reference; do not reinterpret the character for the new canvas.

9. Run a quick visual quality gate before final response.
   - Aspect ratio is correct for each image.
   - The main title names the exact subject and question; the video topic is obvious from the title alone at thumbnail size.
   - The illustration previews the mechanism or answer instead of adding unrelated decoration.
   - There is no keyword pile or bottom tag. Illustrated modes normally show only the main title; black-background mode may include its yellow keyword lines.
   - Chinese text has no obvious garbling in the large title/punch lines.
   - In pure-text mode: black/gray textured background, one bold white title, one or two large yellow keyword lines, no blue background, no icon, no presenter, no outer white UI frame.
   - In default illustrated mode: the presenter visibly matches `references/itwanger-cover-character.png`, including black spiky hair, large black glasses, large brown eyes, youthful face, yellow shirt, and black tie. In pixel-game mode use the pixel character reference instead and check the pixel-game criteria below.
   - Presenter variety: the chosen expression, action, angle, framing, and placement are visible; when a recent different video's cover is available in context, this cover should not repeat its overall pose and composition. If it does, revise the presenter treatment before delivery.
   - No female avatar, no unrelated fantasy costume, no real brand logo unless explicitly requested.
   - No copyright signature, watermark, corner mark, or small `©️沉默王二` label unless explicitly requested.
   - No outer frame, no rounded screenshot container, no dense small text.

10. Deliver all three images.
   - Show the `3:4`, `16:9`, and `4:3` images with Markdown image tags.
   - Include absolute generated file paths and dimensions.
   - Do not move images into the repo unless the user explicitly asks.
   - When authorized to save cover links into a `toBeBetterJavaer/docs/src/ai/video/` script, put the cover heading and images inside `<!-- video-covers:start -->` / `<!-- video-covers:end -->`. These are video-production assets: preserve their source links, but exclude the entire section from the rendered 进阶之路 article and every Feishu answer. Keep explanatory illustrations outside this section. The repository's `feishu-question-bank-sync` Skill owns export and verification rules.

## Pixel Game Style

Read `/Users/itwanger/.codex/skills/wanger-pixel-image/SKILL.md` for the pixel palette and character conventions, adapting its article-illustration instructions to this cover-specific workflow. Adapt the approved 二哥 Remotion pixel world into a static, immediately legible cover. The user approved [this 16:9 cover example](references/approved-pixel-cover.png): retain its warm pixel-world treatment, readable oversized title, and character interacting with a topic-specific mechanism. Do not carry its tokenizer content into other topics. For each generated ratio pass these two references to `image_gen`:

- Cover style, palette and hierarchy: `references/approved-pixel-cover.png`. For additional context on the underlying Remotion world, inspect `/Users/itwanger/Documents/GitHub/toBeBetterJavaer/.agents/skills/ergo-remotion-video/references/approved-pixel-ch1/flag-course.jpg` when useful; do not add a third image to the generation call by default.
- Presenter identity: `/Users/itwanger/Documents/GitHub/toBeBetterJavaer/.agents/skills/ergo-remotion-video/assets/pixel-actor/pixel-ergo-carry.png`. The sheet contains multiple poses; render one character, with an action suited to the current subject. Preserve the glasses, yellow shirt and black tie.

Use warm apricot sky and cream backgrounds, dark ink outlines, teal stable structures, gold for emphasis, and limited flat colors. Use crisp stepped edges, a consistent pixel grid, and an original side-scrolling-game feel. A platform is optional when it supports the scene; do not copy unrelated game UI, flags, subtitles or the reference topic. Do not use commercial game characters or logos. Keep one compact topic-specific mechanism scene and a dominant complete question title. Set Chinese and numbers in clear, full-resolution bold type if pixel lettering impairs legibility; the illustration remains pixel art. No watermark or corner mark.

Recompose each requested ratio independently with the same title, subject and character. Inspect the complete image and at approximately 390 px width: title must remain readable, the character and mechanism distinguishable, and the pixel edges intentional. If generated text is wrong, regenerate or use a deterministic text overlay. This style is an optional third mode; it does not replace either existing mode or authorize replacing an existing article cover without a separate request.

## Default Style

- Bright blue sky/cloud background with speed lines or a clean energetic gradient.
- Thick white English or Chinese title, black 3D shadow.
- No secondary hook or bottom tag by default; add one only when explicitly requested.
- Use one compact visual cue. When it is a brand/app logo, keep it small: roughly 14-18% of canvas width on vertical covers and 8-12% on horizontal covers, so it remains an identifier rather than a main visual block.
- 二哥 cartoon presenter: match `references/itwanger-cover-character.png` exactly in identity and rendering style: Q-version big head, black spiky hair, large black rectangular glasses, large brown eyes, youthful face, yellow shirt, and black tie.
- Preserve the face, hair, glasses, proportions, clothing, and overall illustration style, while actively varying expression, gaze, action, pose, angle, framing, and placement across videos as described above. Avoid mature realistic caricatures, softened side-parted hair, small eyes, exaggerated meme faces, angry faces, horror expressions, or changing the presenter into a different person.
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

## Blue-Sky Prompt Pattern

For blue-sky mode, build three prompts from the same extracted payload and selected presenter treatment. Pixel mode uses its own references and palette above; black-background mode uses the rendering script.

Vertical prompt outline:

```text
生成一张竖版中文短视频封面图，比例 3:4，适合小红书、抖音、快手和B站竖版物料。
主题来自口播稿：{topic}
核心关键词：{keywords}
画面风格：高冲击中文知识封面，明亮蓝色天空和云层背景，速度线和光效，厚重立体字。
主视觉：严格参考 `references/itwanger-cover-character.png` 的二哥身份：黑色刺发、大号黑框眼镜、大棕眼、青年动漫脸、黄色衬衫、黑色领带。人物表现：{presenter_treatment}，包含表情、动作、视线、角度、取景和位置，并与 {visual_icon} 自然互动；保留身份与画风，不照搬参考图的姿势，不默认“指图标并扶眼镜”。
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
横版构图：按 {presenter_treatment} 安排匹配 `references/itwanger-cover-character.png` 身份的人物，并与 {visual_icon} 自然互动；根据横版空间重排标题、图标和人物，不固定人物在右侧，不照搬参考图姿势。保留本视频选定的表情、动作和角度。
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
4:3 构图：按 {presenter_treatment} 重新安排标题、{visual_icon} 和匹配 `references/itwanger-cover-character.png` 身份的人物；保留本视频选定的表情、动作和角度，不机械裁切 16:9 图片，不照搬参考图姿势。
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
