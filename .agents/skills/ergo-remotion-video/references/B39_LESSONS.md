# 音画对齐与连续场景

## 以真实音频定位

独立合成一个分句得到的时长，不代表它在实际 beat 配音中的位置。合成后的真实音频才是字幕和动作的依据。

从仓库根目录运行：

```bash
python3 docs/src/ai/script/shared/tools/align_words.py --project docs/src/ai/script/what-is-kv-cache --id 69
```

工具读取项目 `audio/processed/beat_69.mp3`，解码后按 20ms 窗口分析能量，不在终端 cwd 写临时 WAV。输出发声区间只是候选边界；中文连读未必有静音，英文缩写也可能被拆成多段。结合试听、截段 ASR 定位短语，不把 ASR 拼写误差当作音频必然读错。

元素可在确认的起音点之前约 4–6 帧开始快速入场，避免等词念完才完全出现。时点保存在主题分镜或组件里，不写进共享组件。

## 连续画面共用一个 Sequence

相邻配音段讲同一画面时，将它们组合为一个场景 Sequence。组件只挂载一次，内部按局部 frame 改变状态。图片也保持同一实例，避免闪白或重新入场。

Sequence 内的 `useCurrentFrame()` 是局部帧；不要再次减去全片绝对 startFrame。外层用 `build/cues.ts` 的绝对帧定位，章节预览再减去章节起始帧。

## 文本和生成文件

- `beats.json` 的 `text` 保留字幕原文，`ttsText` 仅调整明确指定的朗读。
- `build/cues.json`、`build/chapters.json`、`build/cues.ts`、`build/voiceover.wav` 来自同一批解码采样，不分别估算。
- 按主 Skill 的意群拆分规则逐 beat 配音，字幕和动画依据各 beat 的实际音频定位。
- 时间轴由共享工具生成，不手改生成文件。修改配音后重新生成并验证连续帧边界。

## 导出检查

曾观察到 Remotion 导出的 AAC 音轨比原音频晚约 42.667ms。共享 render 入口保留渲染视频流、从原 WAV 编码音轨并封装最终文件。仍需运行共享 `verify_export.py` 比较实际波形及完整解码，不能凭文件存在宣告完成。

路径、输出位置及调用命令统一见 [共享工作流](../../../../docs/src/ai/script/shared/WORKFLOW.md)。
