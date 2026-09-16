---
name: video-sync
description: 把「王二讲Agent」的 B 站视频链接同步到 docs/src/ai/video/readme.md，把抖音视频 ID 同步到 docs/src/.vuepress/agentInterview.ts 的 douyinVideoIds 映射表（页面会渲染成播放器）。当用户说 B 站更新了、抖音更新了、同步视频链接、把视频地址放进脚本、更新 readme 视频时使用。
---

# 视频链接同步

## 两个频道

- 抖音「王二讲Agent」：https://www.douyin.com/user/MS4wLjABAAAAxdUFFflycLY13_3btQv8eE41gaifL36eotb0FLA7ASOSdwkV8CF89-Wh_L7_Rt1X
- B 站「王二讲Agent」：https://space.bilibili.com/402000160

## 落点约定

- B 站链接只写进 `docs/src/ai/video/readme.md`，追加在题目的「完整答案」那一行末尾，格式 ` · [B站视频](https://www.bilibili.com/video/BVxxxx/)`。
- 抖音视频不写进 md。写进 `docs/src/.vuepress/agentInterview.ts` 的 `douyinVideoIds` 映射表，一行 `"脚本名": "视频ID",`，由 `agentInterviewPlugin` 渲染成页面里的抖音播放器（线上效果见 https://javabetter.cn/ai/video/what-is-agent.html ）。
- 映射表的键必须先在同文件的 `agentInterviewMeta` 里有 meta 条目、在 `agentInterviewGroups` 里有分组，否则插件不渲染。新脚本要先手工补这两处，meta 的标题和摘要照脚本内容写，不编数据。
- 已有链接和已有 ID 一律不动。

## 流程

1. 拉 B 站列表：`python3 .claude/skills/video-sync/scripts/video_sync.py bili`。接口无需登录，`NEW` 标记的就是 readme 还没引用的视频。
2. 拉抖音列表：抖音必须登录，curl 和内置浏览器拿不到数据。用 Claude in Chrome 打开抖音主页，关掉登录弹窗，滚到底部出现「暂时没有更多了」，再用 `javascript_tool` 执行 `scripts/douyin_extract.js`，分段取回「视频ID|标题」。
3. 看缺口：`python3 .claude/skills/video-sync/scripts/video_sync.py status`，输出 readme 里缺 B 站链接的题目和映射表里缺抖音 ID 的脚本，缺 meta 的会单独标出来。
4. 人工配对：按视频标题和简介对到脚本文件名，写成两个 TSV 映射文件，每行 `脚本名<TAB>BV号` 或 `脚本名<TAB>抖音视频ID`。只配缺口里的条目。
5. 写入：`python3 .claude/skills/video-sync/scripts/video_sync.py apply --bili B站映射.tsv --douyin 抖音映射.tsv`。脚本幂等，重复跑不会重复追加；缺 meta 的脚本会被跳过并提示。
6. 汇报三类剩余：readme 有题但两边都没视频的、视频有但没脚本的、两边有视频但 readme 没题的。这三类由用户决定要不要补。

## 禁令

- 同一题在某平台有多条视频（例如早期重录版）时，取标题和脚本最贴合的那条，其余在汇报里说明，不写入。
- 标题拿不准对应哪个脚本时不要猜，列出来问用户。
- 不给 readme 加抖音链接，不往口播稿 md 里写任何视频链接，除非用户明确要求。
- 抓取抖音一律走 Claude in Chrome，不用内置浏览器，不用 WebFetch。Chrome DevTools MCP 可能被别的实例占用，不要为此杀进程。
