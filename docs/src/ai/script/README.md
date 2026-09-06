# 文章视频工作区

通用配置、工具、默认素材和 Remotion 组件放在 `shared/`；每条视频使用独立主题目录。

入口说明：[共享工作流](shared/WORKFLOW.md)。新视频先用 `shared/tools/init_project.py` 初始化，之后所有工具通过 `--project` 选择项目。默认配置只影响新项目，已有项目使用 `project.json` 中的配置快照。

现有 KV Cache 成片：`what-is-kv-cache/output/kv-cache.mp4`；过程文件和历史试听仍在该视频目录中。
