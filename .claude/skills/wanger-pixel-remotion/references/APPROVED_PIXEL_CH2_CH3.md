# 像素风认可镜头 · Tokenizer 第二、三章

两章的成帧来自用户认可的有声 Studio 版本，画布为 1920×1080，30 fps。按本期要解释的动作选择镜头；章节编号与这些构图各自独立。组件随[像素素材安装脚本](../scripts/install_pixel_assets.py)进入新项目的 `remotion/src/`，题材原图与认可成帧留在本参考目录。

## 顶部状态栏与主窗口共用外边线

以左上主题牌的左边、右上状态栏的右边做两条垂直参考线，主窗口连同描边对齐这两条线。看实际成帧量左右净距，SVG 的描边向外扩半个线宽，HTML 窗要计入边框。认可版在 1920×1080 画布上两边各约 26–27 px。三块并列时等宽等距，图文两栏按原图比例分配宽度，窗口顶底对齐。调整框宽时一起移动内部标签、词块、连接线和人物落脚点；在跳跃、裁图与结果停留三个状态复查。以下对照图右列为最新认可版，后文旧分镜用于看动作顺序。[第二章横向对照](approved-pixel-ch2/horizontal-review.jpg) · [第三章横向对照](approved-pixel-ch3/horizontal-review.jpg)

## 第二章 · 让观众认得同一块词

先建立文字、分词器、模型三站。“开源”向右经过分词器，变为 83649；讲解码时从模型端沿原路送出新的候选 389，回到文字端显示“是”。讲整句时，把八个词块留在原位，明确标出空格；说到“王”和“二”的编号，逐项点亮词块与对应编号。到向量镜头时仍从上一镜的“开源 / 83649”接起。[第二章分镜](approved-pixel-ch2/storyboard.jpg) · [词块与编号成帧](approved-pixel-ch2/king-1112.png)

原稿已有生成过程 GIF。左窗保留完整动图，右侧按口播展示这一刻的向量、候选或解码动作。先在 GIF 中找到各步出现的秒数，再用 [NarratedGif](../assets/NarratedGif.tsx) 将本章触发帧映射到原图时间。`cues` 按本章 `frame` 严格递增，`seconds` 取源 GIF 内的时间；相邻锚点间插值，同一源时刻可重复用来停留。`width/height` 按原图比例成对传入，拖动时间线也能回到同一画面。若原图和旁栏要在某一帧同时揭晓结果，按[离散状态同步方法](APPROVED_PIXEL_FINAL.md#原稿-gif-与右栏共享状态)核对。[原稿 GIF](approved-pixel-ch2/ch2-generation.gif) · [源动图分步图](approved-pixel-ch2/generation-sequence.jpg)

解码多个字节时，先累积已收到的字节，到齐后才显示完整的“𠮷”。本期词表版本、真实 ID 与独立解码例子留在[数据与出处](approved-pixel-ch2/examples.json)；候选选择与嵌入色块是教学构造。换题时重新核对素材与数据。

## 第三章 · 让跳跃指向正在讲的框

输入、词表、结果三个框的顶边就是落脚面。查词时二哥从输入框走到边沿、跃向词表；落地那一帧词条点亮。读结果时再跳到结果框，下一次查询可以往回跳。资料较密或等观众读结果时让人物停稳。审片连看起跳、空中、落地以及返回四种状态，尤其检查脚底、标题和状态栏。[认可版跳跃连帧](approved-pixel-ch3/lookup-hops.jpg)

[PanelHopper](../assets/PanelHopper.tsx) 放在舞台的 HTML 前景。传共用顶边 `top`、每个框的中心 `center`、从中心走向边缘的距离 `edgeOffset`、站定朝向 `facing` 与精灵姿势 `idlePose`。按口播顺序传 `hops=[{from,to,land}, …]`，起终点是框的索引，`land` 是章节局部的落地帧。让前一次落地与下一次起跳留出间隔；本例提前 24 帧开始助跑、空中 15 帧、落地后 8 帧收步，换项目时用实际框宽和词间停顿试跳。

**主体和字幕的间距。** 先摆字幕，再看主体底边与字幕上缘之间还剩多少。字节镜头把高度给 16×16 词表、四行字节和底部读数，两栏底部对齐。认可帧 F1114 在 1080p 画布上保留约 30px 净距；这是一帧的量测，具体留白要看字号、字幕行数和运动范围。需要额外结果行的镜头才为它留位置。[纵向排版复核图](approved-pixel-ch3/layout-review.jpg)

## 第三章 · 左侧保留全图，右侧读细节

带人物的多栏插图先在左侧完整放下，连续讲三种切法时左图位置和倍率固定。按源图像素给每个知识点选一个矩形，让其包住完整的一组结果，逐边检查是否切到人物脸、手或相邻栏。右窗直接取同一个矩形等比放大。进入原图之外的新例子时，细框退场，左侧全貌依然可见，右侧交给可动词块。[三次取景成帧](approved-pixel-ch3/figure-detail.jpg) · [原稿完整插图](approved-pixel-ch3/ch3-splits.png)

[FigureDetail](../assets/FigureDetail.tsx) 接收图片文件、整图尺寸和当前 `detail`。例如在 1536×1024 的本期插图中，整词结果取 `{title: '整词查表', x: 291, y: 504, w: 283, h: 281, color: '#128175'}`。左框和右窗共用这一组坐标；传 `detail={null}` 即可收起右窗。换图后重新测量目标区域。本章的整词词表是无回退的教学构造，真实分词器的版本与结果见[第三章数据与出处](approved-pixel-ch3/examples.json)。

本期逐词分镜、时间轴和有声工程入口见[项目分镜](../../../../docs/src/ai/script/what-is-tokenizer/OUTLINE.md)、[第二章源码](../../../../docs/src/ai/script/what-is-tokenizer/remotion/src/Chapter2.tsx)与[第三章源码](../../../../docs/src/ai/script/what-is-tokenizer/remotion/src/Chapter3.tsx)。新章的接触帧、落地帧和读数切换均从当期配音重新取。
