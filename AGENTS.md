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

处理图片生成、参考图、文章配图、技术图解、白板信息图请求时，默认使用 `itwanger-image` Skill。

构造图片生成提示词时，只使用当前图片占位符、用户明确提供的参考图和 `itwanger-image` Skill 规则；不要把无关窗口、历史聊天、浏览器状态、编辑器内容或当前文章全文自动带入图片生成 prompt。确实需要参考文章内容时，只抽取与当前占位符直接相关的少量关键词。

## 回复风格偏好

- 优先采用通畅连贯的段落式文本叙述，避免机械堆叠过多的 Markdown 标题、层级列表或符号排版，保持阅读体验平实自然。

