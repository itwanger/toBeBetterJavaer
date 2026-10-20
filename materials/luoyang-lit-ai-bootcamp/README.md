# 洛阳理工学院 · 两天 AI 实训

本次实训的开班稿、课件、排课表、演示包和制作过程统一放在这里。整理于 2026-10-20；迁移保留已有文件和版本，不代表课件或演示已通过最终验收。

| 内容 | 入口 |
| --- | --- |
| 开班稿与课程内容 | [manuscript/luoyang-lit-ai-bootcamp.md](manuscript/luoyang-lit-ai-bootcamp.md) |
| 豆包版 PPT 导出 | [洛阳理工AI实训杂志风PPT.pptx](slides/doubao/export/洛阳理工AI实训杂志风PPT.pptx) |
| 豆包版图片与制作过程 | [slides/doubao/](slides/doubao/)（assets、screenshots、xml、readback 与接口响应） |
| 本地版 PPT 导出 | [洛阳理工AI实训-杂志风.pptx](slides/local/deliverables/洛阳理工AI实训-杂志风.pptx) |
| 本地版 PPT 构建与预览 | [slides/local/.build/](slides/local/.build/)（构建脚本、图片、逐页预览与验证记录） |
| 排课表草稿与历史 | [schedule/](schedule/)（XML 草稿、历史 JSON、写作参考） |
| 混合检索课堂演示 | [courseware/hybrid-retrieval/index.html](courseware/hybrid-retrieval/index.html) |
| 学生任务单 | [student-handout.html](courseware/hybrid-retrieval/student-handout.html) |
| 教师教案与演示说明 | [teacher-guide.html](courseware/hybrid-retrieval/teacher-guide.html)、[README](courseware/hybrid-retrieval/README.md) |
| 演示包原始 v1 留档 | [evidence/v1/](courseware/hybrid-retrieval/evidence/v1/) |

课堂演示和任务单是自包含 HTML，可直接用浏览器打开。两份 PPT 分别保留，不合并、不指定其中一份为最终版。

## 后续文件放置

讲稿放 `manuscript/`，PPT 与配套图片放 `slides/`，排课与课程节奏放 `schedule/`，课堂实验和讲义放 `courseware/`。新增过程记录、截图、导出和临时文件也放在相应子目录，不再散放到仓库根目录或通用 `output/`、`outputs/` 中。

`slides/local/` 与 `courseware/` 延续迁移前的本地忽略状态，文件仍保存在磁盘。其他内容的提交由用户决定。历史接口响应与验证记录中的旧路径保留为当时记录；本地 PPT 构建脚本与图片清单已改为按当前目录解析路径。

## 共享资源

以下内容属于可复用的写作或视频工作流，保留原位置，从这里统一查找：

- [豆包备课体验文章工作稿](../../.claude/skills/ai-article/sucai.md)：共享写作缓冲区，内容可能随后续文章切换。
- [RRF 一分钟科普稿](../../docs/src/ai/one-minute/rrf.md)：位于 `docs/src/ai` 指向的 ai-better 仓库。
- [飞书排课表](https://my.feishu.cn/docx/DEB3dfX4lohPbfxR4LhcSfdgn7d)：线上资源，本次仅整理本地文件，未修改线上文档。

## 原位置

| 原路径 | 现路径（相对本目录） |
| --- | --- |
| `docs/src/sidebar/itwanger/ai/luoyang-lit-ai-bootcamp.md` | `manuscript/luoyang-lit-ai-bootcamp.md` |
| `luoyang-lit-ai-bootcamp-ppt/` | `slides/doubao/` |
| `luoyang-schedule/` | `schedule/` |
| `outputs/luoyang-ai-bootcamp/` | `slides/local/` |
| `output/doubao-teaching-demo/` | `courseware/hybrid-retrieval/` |
