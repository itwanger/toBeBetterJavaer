# 代码固化与手机审片

入口仍是共享的 `chapter_pipeline.py`。安装本 Skill 时带入舞台、事件、探针和初始 `pixel-review.json` / `pixel-actions.json`。新章按下列接法使用，流水线会在混音前编译动作，在逐章检查末尾生成 `preview/chN-pixel-review/index.html`。不覆盖两期已定稿工程，不改现有片子的字体或配音。

## 1. 先铺开，出现新信息时再让位

`PixelLayout.tsx` 提供 `stageArea()`、`containBox()`、`PixelSubject`、`revealSlots()`。

```tsx
const slots = revealSlots(frame, [
  {id: 'workbench', at: -18, weight: 3},
  {id: 'scores', at: scoreAt, duration: 18, weight: 1},
], stageArea(), 'column');
```

`scoreAt` 之前只有工作台，取得整个可用区域；之后连续缩小腾出下方读数空间。左右对照用 `row`。不要先固定最终宽高、再把后来的对象设成透明。第一个常驻对象用 `at: -18`，从开场即有主体。给新对象的文字设置可读的出现时点，不能把长句挤进刚开始展开的小槽。

完整主体用 `PixelSubject` 或 `FitPixelSubject`，`bounds` 包含描边、阴影、尺寸标注；默认等比完整放入舞台。原图窄时保持比例。截图要放大输入控件时继续用 `WorkspaceOverview + NativeDetailLens`，完整背景保持在底层。`stageArea('platform')` 把脚下道路留出来，配 `captionStyle="band"`。舞台数值是默认起点，不是要把所有图拉伸铺满。

## 2. 动作、生命值和声音共用事件

在 `assets/references/pixel-actions.json` 写真实配音对应的节拍锚点，`beatId` 类型与 cues 保持一致：

```json
{"schemaVersion":1,"events":[
  {"id":"splash","chapter":"ch3","at":{"beatId":21,"offsetFrames":255},
   "kind":"fall","heartDelta":-1,"sound":{"name":"pixel_splash","peakDbfs":-24}},
  {"id":"collect","chapter":"ch3","at":{"beatId":21,"offsetFrames":472},
   "kind":"heart-collect","heartDelta":1}
]}
```

这些帧只是回归样例，下一期从自己的配音重新取。流水线调用 `pixel_events.py`，输出 `build/pixel-events.json` 和带 `origin: pixel-actions` 的声音计划。只替换自己生成的声音项；与旧项重复会报错，不能悄悄叠加。落水必须扣一心并有声音，收心必须加一心。沿用第三章时，顶砖 hit 发奖励双音，心飞到 HUD 的 collect 只补心，不能再响一次。

动画导入同一个生成文件，使用 `actionAt(events,'splash')`、`actionProgress()` 与 `heartsAt()`。给 `RetryBridge` 的 timing 也从这些事件取得 splash/hit/collect，声音不再另写时间。源事件更新后先重跑编译，重新混音、检查接触帧，不能只改 HUD。固定告别词继续走已有的干声复用流程。

## 3. 以实际渲染边界审片

`PixelWorld` 已内置探针，正常预览和出片不启动；只有检查命令通过 inputProps 开启。`PixelMediaWindow` 已标记单层窗口。自绘主体、必须完整的输入区和必要读数分别标记：

```tsx
<g {...pixelMark('pcb', 'subject', {required: true})}>…真实电路板…</g>
<div {...pixelMark('input', 'control', {required: true})}>…</div>
<text {...pixelMark('score', 'label')}>64.9%</text>
```

标记真实对象，不给空的全屏容器加标记充数。正在自然进入画面的对象到稳定后再设 `required`；关键对象始终要求完整时保持 true。背景可自然裁切，字幕覆盖真实视频背景也正常，不把整片背景标成必须完整。允许必要的 HUD 飞心重叠时，仅对该对象声明 `allowOverlay`。不要为规避错误删除标记。

声明本章镜头时间范围（结束帧不包含）及让位时点：

```json
{"schemaVersion":1,"chapters":{"ch1":{"composition":"Chapter1Preview","scenes":[
  {"id":"model-reveal","from":0,"to":180,
   "transitions":[{"at":60,"duration":24},{"at":120,"duration":18}],
   "samples":[30],"fillArea":{"x":24,"y":100,"width":1872,"height":824}}
]}}}
```

包含 transitions 的镜头自动附一段最多 6 秒的连续审片片段；可用 `clip: {from, to}` 指定不超过 12 秒的片段（结束帧包含），用于落水到补心等完整动作。检查自动取镜头首帧、起音附近、末帧、让位前一帧/开始/中段/结束，以及动作接触前后帧。每个制作镜头都应声明，不能仅选几个漂亮帧。`fillArea` 可选，只在应该充分利用空间的图解上启用。竖图、建立空间关系的远景、短暂转场无需按占幅硬判。

硬错误：必需对象被矩形父容器或画布裁切、与 HUD/字幕相撞、窗口套框、没有任何主体标记。提示：占幅偏小、标记文字手机下偏小、文字与 HUD/字幕完全重复。提示不自动改变排版；需要读数、名称时仍保留文字。旧工程无清单时明确显示未覆盖，绝不称为通过。

目前不识别图像内部文字、复杂 SVG mask/clipPath、任意遮挡顺序，也不能判断隐喻是否正确、声音读音是否正确；这些仍在手机宽度和有声连播时人工检查。源 SVG 几何框未必包含滤镜和阴影，完整 bounds 必须自己量好。代码通过不等于审美通过。

```bash
python3 shared/tools/chapter_pipeline.py --project <绝对项目路径> --chapter ch1
# 单独重新检查几何，不重配音：
python3 shared/tools/review_pixel_chapter.py --project <绝对项目路径> --chapter ch1
# 需要连续观察让位/动作，导出不超过 12 秒的审片片段（不是整期出片）：
node shared/tools/render_review_clip.mjs --project <绝对项目路径> --composition Chapter1Preview --from 45 --to 150 --out <项目>/preview/ch1-pixel-review/reflow.mp4
```

## 回归依据与维护

执行 `scripts/regress_pixel_contract.py --workspace <ai-better/script 绝对路径> --out <项目>/preview/code-contract`。只刷新带 `.pixel-contract-fixture` 标记的隔离诊断工程。先做类型检查、布局与事件测试，再渲染旧缺陷的可执行复现及新组件，随后直接执行本次新接入的逐章审片入口，输出 `regression.json`、两段动作短片和 390px 审片总页 `index.html`，并核验、拷贝历史对照图。旧缺陷卡片保留红色是预期命中，不是让失败蒙混过关。

两期历史原帧与认可原帧放在 `references/code-contract-evidence/`，来源和 SHA-256 见 manifest。历史图片上的人工观察与 live DOM 自动检查分开标示；复现不冒充原工程。未来修改公共组件时重跑这组测试，再看原帧、动作片段与当期实际成帧，避免“检查通过但不像二哥”的退化。

本轮的已执行结果见[验收记录](CODE_CONTRACT_VALIDATION.md)。
