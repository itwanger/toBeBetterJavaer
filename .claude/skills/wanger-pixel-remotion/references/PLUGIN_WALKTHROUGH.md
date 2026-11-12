# 插件实测怎么拍

拍插件时，选一次已经完成的操作做主线。观众应该能认出自己在哪个页面、刚才输入了什么、结果出现在哪里。第三章「归藏设计」的做法如下。

1. **用真实界面带路。** 先给宿主和插件全貌。几个入口在同一屏时固定镜头，把当前入口的原生标签放大或点亮。入口实际在侧栏，镜头才移到侧栏。第二章的作者署名短暂叠在窗内空处，视窗尺寸保持稳定。
2. **让输入变成看得见的结果。** 找回实测输入，从中选观众能认出的词句。“苹果”“咬了一口”“打开电脑”先出现在输入框，再出现在成品的大字引用里。接着回到“我的作品”，读到同一标题和缩略图。讲两个输入就给两句原文，条形占位符会把真正值得看的内容藏起来。
3. **按口播给画面腾位置。** 字数、正文、分镜属于不同的拍。读数讲完就收走，再推到正文原句。当前重点看不清时，先用足主体区，再裁到当前操作；同一句附近的边框、字幕和注释不要叠在一起。
4. **把需要验证的行为做出来。** 讲离线排版时，复制原 HTML，在断网环境用相同视口打开，对比标题、字形和换行。用成品嵌入的字体排出“苹果”和“Transformer”，再让字样收进文件图标，解释打包过程。来源记录里区分真实成品、按留存输入重现的操作，以及解释机制的动画。
5. **按成片比例验收。** 检查能否读完当前输入、认出选中项、在结果里找到同一对象。按正常语速连播，核对口播说到结果时镜头已经落定。

[第三章认可画面](approved-plugin-walkthrough.jpg)

第二章的[工作台镜头库](HARNESS_CH2_LIBRARY.md)有这三种做法的可安装组件、参数示例和认可版动图。

## 下一期从哪里取素材和动效

在新项目初始化后，从 toBeBetterJavaer 根目录运行 `python3 .agents/skills/wanger-pixel-remotion/scripts/install_pixel_assets.py --project <新项目绝对路径>`。人物 PNG 会进入新项目的 `assets/images/`，提示音 WAV 进入 `assets/sfx/`，组件进入 `remotion/src/`。下表按《DeepSeek Harness 四个插件》的镜头列出取用入口。

| 镜头 | 下期可直接取用 | 随新口播调整 |
| --- | --- | --- |
| 用游戏场景讲插件市场与作者扶持 | [PluginMarket](../assets/PluginMarket.tsx) 画四个带遮阳棚和作者的摊位 | 传入市场招牌、四个插件名、图标路径和颜色，用开市、Token、流量三个章内帧驱动开门、收币与访客入场 |
| 插件列表切到某个按钮或输入框 | [PixelImageWindow](../assets/PixelImageWindow.tsx) 固定整窗，[NativeDetailLens](../assets/NativeDetailLens.tsx) 从控件原位放大 | 换成新实测截图，量取完整控件矩形，用说到控件的词头驱动放大 |
| 切换技术讲解与过关场景 | [WorldWipe](../assets/WorldWipe.tsx) 做菱格遮罩，横移、上移和推近沿用 [MotionSceneChain](../../../../docs/src/ai/script/shared/remotion/components/MotionSceneChain.tsx) | 在遮满帧换场，按动作落点配提示音 |
| 二哥登阶、跳旗与落座 | [FlagCourse](../assets/FlagCourse.tsx)、[人物姿势](../assets/pixel-actor/)和[提示音](../assets/pixel-sfx/) | 按新配音确定起跳、落座与得分，检查角色脚底 |
| 片尾点赞、关注与告别 | [LikeFollowTiles](../assets/LikeFollowTiles.tsx)；下期也可试用[成长片尾](../assets/PowerUpOutro.tsx) | 分别对齐点赞、关注和挥手。成长片尾可从本期 Studio 的 NextOutroPreview 单独试看 |

**放大镜用法。** 把同一份截图的相对路径和 CSS 像素尺寸同时传给外窗和镜头。比如用 3 倍密度截取的 1440 × 650 工作台，仍按 1440 × 650 量坐标。下面沿用第五关插件目录的实测坐标，`progress` 从 0 走到 1。

```tsx
const screenshot = {file: 'images/ch5/plugin-catalog.webp', sourceWidth: 1440, sourceHeight: 650};
<PixelImageWindow {...screenshot} width={1440} height={650} camera={{cx: 720, cy: 325, scale: 1}}>
  <NativeDetailLens {...screenshot} rect={[368, 497, 435, 111]} zoom={2.85} progress={progress} />
</PixelImageWindow>
```

本期的插件截图、论文页、增长曲线采样点和旁白时点留在本期工程。复看时可从 [第一关增长图](http://127.0.0.1:3031/Chapter1Preview) 或 [第五关原生控件与论文](http://127.0.0.1:3031/Chapter5Preview) 对照新镜头。

## 片名组件：工作台全景上的插件署名

第三章「归藏设计」的[认可开场](approved-harness-ch3/plugin-title.webp)：先给插件真实全景，外窗不动；只在截图内容区压暗底图。把真实图标、中文名和插件 ID 排成居中的一组，中文名最大，ID 用金色等宽字。窗口边框、HUD 和字幕始终留在遮罩外。

动效跟读出插件名的时点走。本例 30 fps，章内 F39–53 标题层淡入、文字上移 18 px，F98–110 淡出露回全景。下一期替换工作台、图标和署名，按当期口播调停留时间。

[第三章组件、阅读版式与对象动效](HARNESS_CH3_LIBRARY.md)收录了上述片名、整页与原文双栏，以及字形收进 HTML 的认可样例和可安装源码。
