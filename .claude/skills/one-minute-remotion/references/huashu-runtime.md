# 花叔画面接入

声音、完整文稿、字幕与导出继续使用二哥管线。画面不能停留在引用方法：先读具体语法卡，再实际调用库或上游渲染器，按本条内容写场景。

先读随包的上游原版 [t1_3b1b 语法卡](grammar-t1_3b1b.md)，再按当前题材构图。卡中完整引擎的 API 不等于适配器已提供；可用范围以本页为准，用户的文稿、音色和分阶段规则优先。

## 随包可用的 3b1b / 连续图解模块

`assets/huashu/` 保存上游固定版本原文件与哈希、MIT 许可，字体另附 OFL。安装到本条项目：

```bash
python3 "$MINUTE_SKILL/scripts/install_huashu.py" --project "$PROJECT"
```

生成 `remotion/src/huashu/runtime.ts` 和 `public/huashu-fonts/`。适配只隔离原来的浏览器全局变量并提供十六进制颜色桥接，不修改形变、公式、描画或相机算法。不要手改生成的库；需要改动时修改适配器并记录。

可直接导入 `MO, DG, CAM`：

- `MO.smooth / lagged / thereAndBack`：停稳、错开、强调。
- `DG.rectPts / circlePts / morph / shape`：等点数轮廓从源物体变到目标物体。数据与身份跟着轮廓保留，不用淡出旧卡片再淡入新卡片冒充形变。
- `DG.cum / drawPartial / flash`：按弧长描出路线或沿路线传递贡献。
- `DG.math / write / brace / indicate / circumscribe`：公式书写、括号、局部强调。公式分子分母自行排版，必要符号在变换前后保持对应。
- `CAM.track / at / apply / toScreen`：同一世界画布的镜头；推近细节后返回全貌，读数期间固定。字幕在相机之外绘制。

适配器不提供完整 `PAINT/KIT` 的画材通道，不能调用依赖它们的 `DG.hand / board`。需要 y3 手绘笔触、其他艺术配方时，读取所选语法卡和对应依赖，从同一固定版本补齐模块或用上游完整引擎出画面轨；不能因依赖缺失降级成卡片翻页。

## 接到 Remotion

Canvas 尺寸按 1920×1080，`useCurrentFrame()/fps` 是唯一时间源。每次帧变化在 `useLayoutEffect` 重绘，保证任意跳帧结果相同。只画同步图形时无需浏览器定时器；字体用 `FontFace` 从 `staticFile('huashu-fonts/...')` 加载，在首次绘制前通过 Remotion `delayRender/continueRender` 等待，失败要报错。中文使用思源黑体 GB2312 子集，数学用 CMU；新增生僻字检查覆盖，不能静默缺字。

Canvas 主画面截止 y=890，字幕在独立 React 层的底部安全区内。相机对世界对象进行变换，不能把字幕一起放大。沿用现有 `Audio` 和完整 Composition 时长，禁用上游可能截断音轨的合成参数。

## 制作证据

在 `OUTLINE.md` 记录主要语法、造型规则、核心物体变换和镜头目的；在 `assets/references/visual-provenance.json` 记录上游 commit、实际导入函数、各函数对应的本条动作，区分上游库与新写的场景。先验证最能讲清原理的一段，再扩展成整片。记录静帧检查和真实播放的不同结果；整片按上游要求由未参与制作的 Agent 审片，修复遮挡、错数、过早揭晓和不连续动作。

上游语法卡：[t1_3b1b](https://github.com/alchaincyf/huashu-art-motion/blob/8a0d7d72ca65fcce6f8ba82c4a6c8dfe35b8422c/references/动画语法/t1_3b1b.md)、[y3_whiteboard](https://github.com/alchaincyf/huashu-art-motion/blob/8a0d7d72ca65fcce6f8ba82c4a6c8dfe35b8422c/references/动画语法/y3_whiteboard.md)。这些是方法来源，示范场景和作者素材不放进新片。
