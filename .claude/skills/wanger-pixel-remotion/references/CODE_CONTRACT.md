# 代码固化与画面审片

入口仍是共享的 `chapter_pipeline.py`，默认只做类型检查和显式指定的静帧。音轨相关变化用 `--update-audio` 编译时点、动作并混音；需要排查复杂布局故障时才用 `--full-review` 生成密集审片页。检查频率遵循[协作与精简检查](COLLABORATION.md)。安装本 Skill 时带入舞台、事件、探针和初始配置；以下探针与清单用于定向诊断，不是每轮制作的必填作业。不覆盖已定稿工程，不改现有片子的字体或配音。

## 1. 先铺开，出现新信息时再让位

`PixelLayout.tsx` 提供 `stageArea()`、`containBox()`、`PixelSubject`、`revealSlots()`。

```tsx
const slots = revealSlots(frame, [
  {id: 'workbench', at: -18, weight: 3},
  {id: 'scores', at: scoreAt, duration: 18, weight: 1},
], stageArea(), 'column');
```

`scoreAt` 之前只有工作台，取得整个可用区域；之后连续缩小腾出下方读数空间。左右对照用 `row`，窗口内逐项出现的内容用 `column`。第一个常驻对象用 `at: -18`，从开场即有主体。

**显隐与布局分开处理。** `opacity`、淡入或条件渲染只决定是否看得见，不保证空间归还。固定最终行高、`minHeight`、空白网格行、预留侧栏以及提前计入的 `gap` 都可能继续占位。布局计算只纳入当前已出现或正在进入的对象；未出现对象的尺寸与间距贡献为零。入场时先连续分配空间，再在可读宽高下显露文字，避免窄槽里挤出断字或长期留下若隐若现的内容。退出或删除时，同步收回尺寸和间距，让保留对象重新排布。

**主角也要变化。** 不能只把背景色块或外框拉满，主体仍以最终小字号、小图标贴在顶部。当前独占的提问、模型或记录应按现有空间调整位置、图形尺度和文字排布；新内容到来时才连续缩小、上移或侧移。真实软件的外窗可保持稳定，动态分配发生在窗内；原生截图用原位聚焦保留上下文，不为填满而拉伸。

例如“问题 → 搜索结果 → 引用”：只有问题时以大主体居中，搜索到来才让出结果区，引用到来再调整两者高度。“响应记录 → 空正文字段 → signature”遵循同样的出现顺序；删去历史思考和搜索块后，保留的读链接记录随即重新铺开。不要先排好所有最终槽位再依次显示。

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

### 知识蘑菇片尾：按钮与声音成套接入

使用 `PowerUpOutro` 时，在 `pixel-actions.json` 声明当前章的时点文件，不手填点赞、关注声音：

```json
"powerUpOutros": [
  {"chapter": "ch6", "timing": "assets/references/ch6-phrase-timing.json"}
]
```

`pixel_events.py` 从该文件的 `like/follow` 词头自动生成 **各 +3 帧的按钮按下声**，对应 `LikeFollowTiles` 的下压动作。默认沿用 Harness 定稿的 `pixel_like` / `pixel_follow` 和 -25.19 dBFS 峰值；不要换成通用 `soft_click`，也不要把相同事件再写一遍。动画仍从同一份时点文件取词头；如果改变按钮的下压延迟，应同步修改 `outro_audio.py` 的 `PRESS_DELAY`。

章节入口检测到 `PowerUpOutro` 却没有声明时会报错。流水线混音后运行 `outro_audio.py`：核对当前音轨哈希、两次按下帧、音色和电平，并从实际混音 WAV 减去干声，核实音效确实写进了采样。不能以事件表存在、类型检查通过、浏览器音频可播放代替这项检查。报告保留音效与同窗人声的 RMS 差值，提示可能被掩盖；数值检查不等于听感验收，最后单独开声检查点赞关注几秒即可。调整只动提示音，不重新合成固定告别或改动人声响度。

```bash
python3 shared/tools/chapter_pipeline.py --project <项目> --chapter ch6 --update-audio
# 只查已混音的片尾，不重新生成：
python3 shared/tools/outro_audio.py --project <项目> --chapter ch6
```

## 3. 以实际渲染边界审片

`PixelWorld` 已内置探针，正常预览和出片不启动；只有检查命令通过 inputProps 开启。`PixelMediaWindow` 已标记单层窗口。自绘主体、必须完整的输入区和必要读数分别标记：

```tsx
<g {...pixelMark('pcb', 'subject', {required: true})}>…真实电路板…</g>
<div {...pixelMark('input', 'control', {required: true})}>…</div>
<text {...pixelMark('score', 'label')}>64.9%</text>
```

标记真实对象，不给空的全屏容器加标记充数。正在自然进入画面的对象到稳定后再设 `required`；关键对象始终要求完整时保持 true。背景可自然裁切，字幕覆盖真实视频背景也正常，不把整片背景标成必须完整。允许必要的 HUD 飞心重叠时，仅对该对象声明 `allowOverlay`。不要为规避错误删除标记。

需要密集诊断时，声明待查镜头时间范围（结束帧不包含）及让位时点：

```json
{"schemaVersion":1,"chapters":{"ch1":{"composition":"Chapter1Preview","scenes":[
  {"id":"model-reveal","from":0,"to":180,
   "transitions":[{"at":60,"duration":24},{"at":120,"duration":18}],
   "samples":[30],"fillArea":{"x":24,"y":100,"width":1872,"height":824}}
]}}}
```

显式执行完整诊断时，包含 transitions 的镜头自动附一段最多 6 秒的连续片段；可用 `clip: {from, to}` 指定不超过 12 秒的片段（结束帧包含）。检查自动取首末帧、起音附近、让位过程及动作接触前后帧。清单覆盖待查范围即可，不要求普通修改登记整章镜头。`fillArea` 可选，只在应该充分利用空间的图解上启用。竖图、远景、短暂转场无需按占幅硬判。

硬错误：必需对象被矩形父容器或画布裁切、与 HUD/字幕相撞、窗口套框、没有任何主体标记。提示：占幅偏小、文字与 HUD/字幕完全重复。提示不自动改变排版；需要读数、名称时仍保留文字。旧工程无清单时明确显示未覆盖，绝不称为通过。

目前不识别图像内部文字、复杂 SVG mask/clipPath、任意遮挡顺序，也不能判断隐喻是否正确、声音读音是否正确；这些仍在实际画布和有声连播时人工检查。源 SVG 几何框未必包含滤镜和阴影，完整 bounds 必须自己量好。代码通过不等于审美通过。

```bash
python3 shared/tools/chapter_pipeline.py --project <绝对项目路径> --chapter ch1
# 确有复杂布局故障时，显式启动密集诊断（含短片，不重配音）：
python3 shared/tools/review_pixel_chapter.py --project <绝对项目路径> --chapter ch1
# 需要连续观察让位/动作，导出不超过 12 秒的审片片段（不是整期出片）：
node shared/tools/render_review_clip.mjs --project <绝对项目路径> --composition Chapter1Preview --from 45 --to 150 --out <项目>/preview/ch1-pixel-review/reflow.mp4
```

## 回归依据与维护

普通内容修改不运行公共组件回归。公共布局或事件工具有改动时，先选相关测试；只有跨组件问题需要完整复现时，执行 `scripts/regress_pixel_contract.py --workspace <ai-better/script 绝对路径> --out <项目>/preview/code-contract`。它只刷新带 `.pixel-contract-fixture` 标记的隔离诊断工程，生成类型/布局/事件检查、复现帧与短片。旧缺陷卡片保留红色是预期命中。

`references/code-contract-evidence/` 只作为工具回归的故障样本与来源证据，不属于视频制作方案；正常制作不读取该目录。
