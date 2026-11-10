## 工具权限设置

以下工具默认允许使用，不需要用户确认：
- mcp__playwright__* （所有 playwright 浏览器相关工具）

## 工具使用规则

### 获取网页内容

微信公众号文章（`mp.weixin.qq.com`）优先按全局 `~/.codex/AGENTS.md` 的 Pi Agent + DeepSeek 流程读取：使用 `/Users/itwanger/.local/bin/pi-web-read '完整URL' '当前问题'`，显式固定 DeepSeek；只有读取失败、正文不完整或需要图片/交互信息时再用 `mcp__playwright` 补读，无需询问。

遇到以下情况时，**直接使用 `mcp__playwright` 工具打开浏览器获取内容**，不要询问用户：

- 微信文章经 Pi + DeepSeek 读取后仍需浏览器补读
- 需要登录才能访问的页面
- WebFetch 返回错误或超时的页面
- 动态渲染的页面内容

**使用方式：**
```
1. mcp__playwright__browser_navigate 打开目标URL
2. mcp__playwright__browser_snapshot 获取页面内容
3. mcp__playwright__browser_close 关闭本次临时浏览器会话（必须收尾；连接用户已有浏览器时仅清理本次标签并断开）
```

这是默认行为，不需要再询问用户是否使用浏览器。

### 打开网页 / 演示

需要打开网页、本地预览或演示页面时，默认用内部浏览器（`agent-browser --session <任务名>`）打开，并用截图或录制把结果带回对话；不要再用 `open` 拉起系统默认浏览器占用户的标签页。只有用户明确要求“用我自己的浏览器”时才用 `open`。

内部浏览器会话用完按 Skill 要求 `agent-browser --session <任务名> close` 收尾；用户明确要边看边聊时，说明保留原因和关闭时机。

### 图片生成 / 文章配图

文章配图默认用 `wanger-hand-drawn-image` 生成二哥手绘风。用户或占位符明确指定像素风或 `pixel` 时，直接使用本机独立的 `wanger-pixel-image`。两者均默认精简版，可点名详解版，支持相同六种排版，按上下文自动选择静态图或循环 GIF。

构造图片生成提示词时，只使用当前图片占位符、用户明确提供的参考图和所选配图 Skill 的规则；不要把无关窗口、历史聊天、浏览器状态、编辑器内容或当前文章全文自动带入图片生成 prompt。确实需要参考文章内容时，只抽取与当前占位符直接相关的少量关键词。

### 视频 Skill

本仓库的新视频默认使用 [wanger-pixel-remotion](.agents/skills/wanger-pixel-remotion/SKILL.md)。调用语为「用二哥像素风视频 Skill 制作 xxx.md」。用户点名「用小超视频 Skill 制作 xxx.md」时使用独立的 [chao-remotion](https://github.com/itwanger/chao-remotion)。

### 视频制作文件存放

视频素材和制作产物不得直接写入仓库根目录。开始执行前先确认具体视频项目的绝对路径，所有生成、复制、下载和渲染命令都显式指定项目内的输出位置，不依赖当前工作目录。

- 普通视频项目放在 `docs/src/ai/script/<视频项目>/`；一分钟及两分钟科普系列统一放在 `docs/src/ai/script/one-minute/<主题>/<工具>/<版本>/`，先按主题归档，再在主题内按制作工具与版本分类；协作来源写入主题说明，工具不明时标注 `unattributed`；公共动画库、字体和基础色板放在 `script/one-minute/shared/`，配音、时间轴和场景仍归各版本，不再散放在 `script/` 第一层。`docs/src/ai/` 通过软链接对应 `ai-better/`。
- 配音放入项目的 `audio/` 或 `build/`，素材放入 `assets/`，截图与检查记录放入 `preview/`，Remotion 源码放入 `remotion/src/`，成片放入 `output/`；项目配置、分镜和进度文件也只放在该视频项目内。
- 如需额外交付副本，放在仓库的 `outputs/<视频项目>/`；不要把目录层级拍平后复制到根目录。
- 收尾检查仓库根目录及 Git 变更；发现误写文件先核对归属与内容，再归档或归位，不覆盖正式项目中的较新版本。

## 回复风格偏好

- 优先采用通畅连贯的段落式文本叙述，避免机械堆叠过多的 Markdown 标题、层级列表或符号排版，保持阅读体验平实自然。

