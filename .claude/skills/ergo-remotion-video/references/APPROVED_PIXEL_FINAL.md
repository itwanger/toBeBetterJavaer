# 像素风定稿 · 从分镜到整片

本页以 2026-11-07 获认可的 Tokenizer 五章 Studio 整片为例。选镜头时先找口播中的动作，然后决定该让人、材料还是读数发生变化。[本期逐步分镜](../../../../docs/src/ai/script/what-is-tokenizer/OUTLINE.md)

## 截图切换与模型工位

同一张总览里有两栏，而旁白要先读原文、再读实测时，给两个特写各准备一张独立的高清素材。外窗保持原位，切换时直接换素材。以文字、数字和高亮框的实际可见外沿核对左右净距，同时检查切换当帧和结果停稳帧。Tokenizer 第一章的外窗左右各留 27 px，两张特写稳定后内部各留 181 px；换素材时按内容重测。若需要交代局部在全图中的位置，仍可使用第三章的全图配细节镜头。[认可版四帧](approved-pixel-final/opening-layout.jpg) · [计费原图](approved-pixel-final/billing-4x.png) · [实测特写](approved-pixel-final/token-result-4x.png)

示例文字和接收它的模型容易同名时，给它们分配固定位置。本例左侧是待切分的“大模型”，切刀接触后出现“大”和“模型”两个词块；右侧用官方鲸鱼标识 DeepSeek，在同一拍显示模型收到的编号 547 和 8842。原稿术语出现时再亮出工具名。提问结束后，讲解人物退场，让观众直接跟随字串、切刀和读数。

用项目品牌库中核过出处的官方图标，保留外形、颜色与透明边缘。需要像素效果时，本例按最近邻缩到 48×48，再整数倍显示。图片只用于标识实际对应的产品；新题材重新确定接收方。[鲸鱼像素素材](approved-pixel-final/deepseek-pixel.png) · [裁切坐标、官方来源与实测编号](approved-pixel-final/opening-sources.json)

## 用表情提出问题，用动作揭晓答案

分镜里为疑问写三个时点：听到引子时角色面向谁，问到关键处时视线落在哪里，答案出现时手指向哪个对象。给观众留一拍看清表情。在比较、读数或结果需要空间时，人物可以转身、让位或退场。数量未知时可以保留空的读数位；正在查表的真实缺项仍可显示 `<unk>`。本期第五章先让二哥抬眼听，问到“为什么选择 BPE”时托腮，随后回看左侧配置，128K 出现后转向右侧指给观众。第三章则从托腮直接接回在三个框上跳动。[表情与读数连续成帧](approved-pixel-final/question-reveal.jpg)

[ReactionActor](../assets/ReactionActor.tsx) 放在舞台 HTML 前景。传 `pose="listen" | "think" | "point"`、脸朝向的 `facing`、鞋底锚点 `x/foot` 和 `height`。`frame` 从当前动作的真实起音开始计数；换姿势时重置，点头和轻微前倾各做一次。面向左侧时仍围绕同一鞋底锚点翻转。三张透明成图随安装包进项目；扩展表情时对照[双姿势母图](approved-pixel-final/reaction-atlas.png)，保持眼镜、头身比、鞋底基线与朝向。[精灵出处与文件校验](approved-pixel-final/provenance.json)

## 五关共用一根旗杆

固定镜头、地面、杆帽和旗杆。旗布写关卡得分（30 分、50 分、70 分、90 分、99 分），口播和字幕里的百分比表示击败学习者的比例。随进度变化的是旗面上缘和起跳弧线。用空中最高点比较高度，用坐上旗面的那一帧检查臀部支撑点、旗面受力和金币响声，然后看人物是否随布面下降再回到地面。[五关联动](approved-pixel-final/jump-motion.gif) · [五次落座](approved-pixel-final/fixed-pole-seats.jpg)

认可版在 1920×1080 画布上使用地面 y=856、杆帽上缘 y=300。30%、50%、70%、90%、99% 的旗面初始 y 分别为 626、558、490、422、354；y 越小，旗面越高。新稿只在实际报出进度时升级，使用当期百分比和当期配音起音。安装包在上述五个设计点间插值，其他百分比也能使用。[实测跳跃与落座帧](approved-pixel-final/heights.json)

`FlagCourse` 在舞台 SVG 中绘制旗面，`FlagRunner` 在 HTML 前景中绘制人物。两者传同一份 `frames`，百分比放在 `frames.percent`。同一个 `seat` 帧驱动落座、金币计数与提示音。旧工程单独传给 `FlagCourse` 的 `percent` 仍能显示对应的分数；要启用逐关升高，将百分比移入共用的 `frames`。[跳旗组件](../assets/FlagCourse.tsx) · [安装方法与帧字段](APPROVED_PIXEL_CH1.md#为下一期准备)

## 让一个事件同时改变所有相关对象

第四章先给观众能手算的小语料，再点亮相邻片段。压头碰到词块的同一帧，输入中的两个片段合为一个，语料各行同步更新，右侧词表追加新条目，原有条目仍可见。第二轮按第一轮的新语料重新计数。复用这类镜头时先写清“什么保留、什么合并、什么新增”，抽查接触前一帧、当帧及下一轮。[两轮压机成帧](approved-pixel-final/merge.jpg) · [原稿三种算法图](approved-pixel-final/algorithms.png) · [本例语料与教学边界](approved-pixel-final/training-examples.json)

第五章用同一个已核实的输入贯穿切分、编号和解码。讲权重开销时固定矩阵列宽，增加行数；讲上下文时固定格数，让同样的空间实际装进更多输入。模型版本、词表和真实输入输出写入项目的来源记录；为讲机制构造的计数和缩尺权重格单独记录。[锁定版本的编码样例](approved-pixel-final/encoding-examples.json)

## 原稿 GIF 与右栏共享状态

连续原动画可以按第二章的方法对齐原图时间。碰到**几个离散状态必须逐帧一致**的镜头，先解出原稿 GIF 中每张完整画面。保留原始尺寸、透明度和逐帧时长，另外把状态切换对齐口播。比如第五章左侧图内自带读取计数，右侧也有一套计数；两处共用一个已收到的字节数。第 4 个字节出现前只能显示等待，到齐才显示完整字符。[原稿 GIF](approved-pixel-final/rare.gif) · [还原前后两帧](approved-pixel-final/decode.jpg)

在项目里可运行 `python3 "$SKILL_DIR/scripts/extract_gif_states.py" "$SOURCE_GIF" "$VIDEO_PROJECT/assets/images/decoder"`。得到逐帧 PNG 和 `frames.json`。下面的四个 `receiveAt` 是本章真实语音锚点，源 GIF 的第 0 张表示还未收到字节。换图时先核对原状态与旁白事件的对应关系。[抽帧脚本](../scripts/extract_gif_states.py)

```tsx
const received = receiveAt.filter(at => frame >= at).length;
const source = staticFile(`images/decoder/${received}.png`);
return <><Img src={source} /><Decoder received={received} /></>;
```

## 提示音跟动作走

同一类知识动作沿用能辨认的声音。压机碰到词块落轻点，最后一个字节到齐时落短拨音，旗面承重时落金币声。混音按本期 beat 起始帧换算偏移；若重配一句，同步重建该句及后续 cue、字幕和提示音。回放时先听关键词是否清楚，再看听到声音的那一帧是否真的发生了变化。[第四、五章接触帧和响度示例](approved-pixel-final/sound-cues.json)

## 串联整片和交付审片

章节预览播放自己的音频切片，整片只挂一次完整混音。各章导出纯画面组件，按实际总时间轴的 `startFrame` 和 `endFrame - startFrame` 放入 Sequence。独立章按末帧向上取整时可能多一帧，因此整片边界直接读 `build/chapters.json`。封面放在整片最上层，使用源稿 16:9 封面，淡出时不推迟第一句。核对首帧、每个交界前后一帧、末帧及收音，并对照每章至少一张已认可的成帧。Studio 整片预览可在逐章认可后交付；正式导出继续按 Skill 的出片流程。[四个章节交界](approved-pixel-final/boundaries.jpg) · [本期完整组合入口](../../../../docs/src/ai/script/what-is-tokenizer/remotion/src/Root.tsx)

下一期的第一章试镜优先看三个问题：手机缩图能否看清人物为什么提问；关掉字幕，能否看出哪个对象变了；答案出现时眼睛是否能立即找到对应读数。记录具体帧号、修改前后和用户认可的版本，后续更新样例时能追到实际画面。

如果后续拿到了平台的留存曲线或具体评论，把发生变化的播放时间对回本期分镜。下一版优先改对应的镜头，例如把技术名词开场换成可读的输入例子，再看观众能否跟到第一次结果揭晓。
