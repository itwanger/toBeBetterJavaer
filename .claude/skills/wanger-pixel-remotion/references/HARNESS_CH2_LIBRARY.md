# 第二章工作台镜头库

《DeepSeek Harness 四个插件》第二章「自媒体工作台」分层版已获二哥认可。三个镜头共用真实截图的 CSS 像素坐标。下一期先量新工作台的视口和控件，再按新配音确定进入、打字、收回和定位的帧。

| 分类 | 什么时候用 | 实现与认可样片 |
| --- | --- | --- |
| 画面组件 · 工作台全景 | 要让观众一直认得左栏、主区和右栏。用相同视口截取前后两个状态；外窗按原图宽高比等比显示，第二张在同一位置渐显。 | [WorkspaceOverview](../assets/WorkspaceOverview.tsx) · [实际全景](approved-harness-ch2/workspace.webp) |
| 对象动效 · 输入框原位放大 | 先看字段在页面上的位置，再把整个控件从那里提起来。取样时连同两个圆角、模型选择器和发送按钮一起量。若手机上输入行太小，可在原字段内按原句放大排字。 | [NativeDetailLens](../assets/NativeDetailLens.tsx) · [空框、输入与收回](approved-harness-ch2/input-focus.webp) |
| 镜头调度 · 跨栏定位 | 在同一个工作台内先放大左侧输入，写入指令，收回；在右侧给目标卡描边，然后放大卡里的原始说明。其余分镜保留原来的位置。 | [ControlHandoff](../assets/ControlHandoff.tsx) · [左侧输入到右侧第 3 镜](approved-harness-ch2/cross-panel.webp) |

## 原位放大

给全景和放大层传同一对截图、同一渐显进度。底图和镜内的文字就会同时从空白变成已输入。镜内子元素按取样矩形左上角定位，适合只放大输入行。第二章用 1440 × 650 的 CSS 坐标量取高密度截图，`rect` 的次序是左、上、宽、高。

```tsx
const screen = {file: empty, nextFile: typed, nextOpacity: typing, sourceWidth: 1440, sourceHeight: 650};
<WorkspaceOverview {...screen}>
  <NativeDetailLens {...screen} rect={[453, 277, 805, 165]} center={[764, 416]}
    progress={focus} zoom={1.63} backdropOpacity={0.26} />
</WorkspaceOverview>
```

按协作规则，在必要检查帧中确认重点可读和边界完整。此例把镜心略往下移，让窗口标题保持完整；输入框右边仍有一段空隙，发送按钮在空框和打字状态都看得见。

## 左侧输入到右侧结果

本期 F1060 开始提起左栏输入框，F1110 开始显示“把第 3 镜改得通俗一点”。到 F1172，左栏放大层已经收回，右栏第 3 镜得到焦点。`targetOutline` 框住整张分镜卡，`target.rect` 只取要读的说明。两张截图来自同一套已保存分镜，此处展示指令所指的位置；画面中的文字取自原始分镜。

```tsx
const screen = {file: board, nextFile: edited, nextOpacity: typing, sourceWidth: 1440, sourceHeight: 650};
<WorkspaceOverview {...screen}>
  <ControlHandoff {...screen} frame={frame} inputFrame={cues.edit + 2} targetFrame={cues.target}
    input={{rect:[285,581,310,64], zoom:3.25, center:[635,450]}}
    targetOutline={[1154,54,254,273]}
    target={{rect:[1151,263,259,68], zoom:3.45, center:[911,407]}} />
</WorkspaceOverview>
```

组件随现有像素素材安装脚本进入新项目的 `remotion/src/`。本期的截图、六格位置和上述帧号都属于本期示例。[第二章 Studio](http://127.0.0.1:3031/Chapter2Preview)
