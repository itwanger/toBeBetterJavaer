# 本机制作流程

## 工程入口

声音、字幕、时间轴和导出使用现有 `ergo-remotion-video` 管线；画面按 [花叔画面接入](huashu-runtime.md) 调用随 Skill 提供的上游库，或使用所选语法需要的上游渲染器。无需为每条视频重复安装整套依赖。

本机已核实：

- 视频仓库为 `/Users/itwanger/Documents/GitHub/ai-better`，项目位于 `script/<topic>/`，共享工具为 `script/shared/tools/`。
- `toBeBetterJavaer/docs/src/ai` 是该仓库的相对软链接。原 Skill 位于 `toBeBetterJavaer/.claude/skills/ergo-remotion-video/`。
- 配置入口是 `script/shared/config/video.config.json`；初始化会把它完整复制到项目 `project.json.config`。共享配置变化不自动改变旧项目。

换机器时优先从当前仓库及相邻目录定位，或读取用户指定的 `AI_BETTER_REPO`。路径找不到就报告具体缺失，不静默迁移到别的生产管线。

制作时按需读取共享 `WORKFLOW.md` 的音频、音画对齐、预览与导出段，以及旧 Skill 的 `AV_SYNC.md`、`VOLCENGINE_TTS_GUIDE.md`。它们提供命令与音频机制；一分钟的范围、布局和授权判断以本 Skill 为准。

以下命令按阶段按需执行，不能将整份文档当成一次运行到底的任务。“下一步”只推进当前产物之后的一个阶段。已有文字稿时，初始化、快照、提取口播、锁定及读音处理是配音阶段的准备；该轮完成完整音频、对齐、量时和检查后，交付试听并停下，不进入分镜、画面或导出段。

## 新项目与文字固定

文字稿统一保存到 `toBeBetterJavaer/docs/src/ai/one-minute/<topic>.md`。本机该目录通过软链接对应 `ai-better/one-minute/`，两者是同一份文件，不要重复创建互不相干的稿件目录。先保存完整文字稿，再初始化制作项目；原稿与已有同名稿件均不得无提示覆盖。

以下是参数化示例，实际使用时先设置正确的 `SOURCE`、`TOPIC`、`TITLE`，并将 `MINUTE_SKILL` 设置为本次实际加载的技能包目录。本机共享目录如下；导入到其他位置或换机器时使用实际位置，不依赖 Codex 专有环境变量。这些不是要自动制作的样片。

```bash
VIDEO_REPO="${AI_BETTER_REPO:-/Users/itwanger/Documents/GitHub/ai-better}"
SHARED_VIDEO="$VIDEO_REPO/script/shared"
MINUTE_SKILL="$HOME/.agents/skills/one-minute-remotion"
SOURCE="$VIDEO_REPO/one-minute/$TOPIC.md"
PROJECT="$VIDEO_REPO/script/one-minute-$TOPIC"

python3 "$SHARED_VIDEO/tools/init_project.py" \
  --project "$PROJECT" --source "$SOURCE" --title "$TITLE"
python3 "$SHARED_VIDEO/tools/doctor.py" --project "$PROJECT"
```

初始化不会调用TTS，不覆盖已有项目。已有 `one-minute-<topic>` 时先检查内容和进度，续做或采用新版本目录，不能覆盖用户改动。

将统一目录中的稿件完整快照为项目 `script.md`；`SOURCE` 和锁文件源路径仍指向统一目录中的稿件。明确提取可朗读正文为 `spoken.txt`；创建 `beats.json`，通常使用一个内部章节 `ch1`，按完整意群拆分。内部章节用于时间轴，不意味着画面必须展示多章导航。

若用户指定沿用某一期声音，先把该期 `config.tts` 中的声音与语速设置复制到当前项目，再锁定。不打印凭证或完整环境。默认继承共享声音配置，包含已有速度设置；不为赶一分钟额外改 `speedRatio` 或 `atempo`。如果用户明确要求正常原速，再只修改当前项目并记录，不能改共享默认值。

```bash
python3 "$MINUTE_SKILL/scripts/one_minute.py" lock \
  --project "$PROJECT" --source "$SOURCE" --spoken "$PROJECT/spoken.txt"
```

该命令只记录源文件、口播与项目所选声音的哈希/配置；不合成语音。源稿或声音经用户同意更新时，先保存旧锁文件和修改说明，再明确使用 `--replace`。不为使检查通过而重新锁定未经同意的改稿。

## 音频与实测时长

```bash
python3 "$SHARED_VIDEO/tools/pronunciations.py" --project "$PROJECT" --write
python3 "$SHARED_VIDEO/tools/gen_audio.py" --project "$PROJECT" --dry-run
python3 "$SHARED_VIDEO/tools/gen_audio.py" --project "$PROJECT"
python3 "$SHARED_VIDEO/tools/gen_cues.py" --project "$PROJECT"
python3 "$SHARED_VIDEO/tools/review_audio.py" --project "$PROJECT"
python3 "$MINUTE_SKILL/scripts/one_minute.py" check --project "$PROJECT"
```

当前只建 Skill 不执行这些真实生成命令。用户要求制作视频时，现有语音服务的调用属于该制作流程；凭证缺失只报告缺失的环境变量名，不输出变量值。API Key 仅由项目 `config.volc.apiKeyEnv` 引用。环境变量仅在交互shell设置时，按旧工作流使用 `zsh -ic`，仍不把密钥插进命令。

`check` 返回0仅表示当前阶段的机械检查通过；返回1表示文字、声音配置、无效媒体或时间轴一致性等失败；返回2表示缺少实际音频/时间轴。超过60秒是目标时长提醒，以 `warnings` 和 `overTargetSec` 报告，不单独导致失败。字数、估算时点和草图预览不能替代实测；报告通过时仍须披露超时提醒，不能声称已经达成60秒目标。

完整意群保留原文，`text` 与口播投影一致。`ttsText` 可按读音词典改变读法，字幕仍用原文，不得借此替换解释内容。ASR与实际试听检查漏读、重复及缩写读音；没有试听就不宣称音色/读音已验收。

单阶段模式在此结束：提供可播放的完整音频（本机默认 `build/voiceover.wav`）、绝对文件路径、实测时长、超时提醒和待核对项，记录“配音已生成，待用户试听”后结束本轮。不得顺手写 `OUTLINE.md`、启动动画预览或后台渲染。用户再次说“下一步”时才开始分镜设计，分镜交付后再次停下。

## Remotion画面

在用户已拿到分镜并再次推进到动画阶段，或明确要求连续出片时执行本段。单阶段模式的分镜阶段只写 `OUTLINE.md`，不执行下面的场景实现和预览命令。

先根据实际对齐生成本条 `ch1-spec.json` 与时点，再写场景。保留共享字幕与音轨接口，外层Stage可按一分钟需要定制，取消长片多章导航。无需复制旧片的主题数据、台词、封面或头像；素材使用和版式按当前内容决定。

画面用 `useCurrentFrame()` 读取帧，按真实语音事件编排。主题和字幕安全区在项目内统一定义；默认沿用现有字幕条高度，若用自定义字幕至少保留底部约180px给字幕，检查1080p下正文不侵入该区。屏幕文字与字幕分离；图片有需要时按 `$itwanger-image`，只提供当前分镜关键词和用户参考图。

```bash
python3 "$SHARED_VIDEO/tools/build_timing.py" --project "$PROJECT" --chapter ch1
python3 "$SHARED_VIDEO/tools/chapter_pipeline.py" --project "$PROJECT" --chapter ch1
node "$SHARED_VIDEO/tools/remotion.mjs" typecheck --project "$PROJECT"
```

`chapter_pipeline.py` 产出关键帧和起音帧检查，不会提供可播放的 Studio 或预览视频；命令成功不能视为完成预览。截图仅辅助检查布局、数值及字幕安全区。

### Studio 后台启动

Studio 是常驻服务，正常运行时不会退出。**必须后台启动，不能把前台命令退出作为启动完成条件**；不要使用 `studio ... | head -20`、等待服务退出的 `wait` 或持续不返回的 `tail -f`。共享工具当前的 `--detach` 只处理 `render`，不能给 `studio` 加上该参数就声称已后台化。

先检查本项目已有服务和 `preview/studio/studio.json`。已有可用服务直接复用，不重复启动。没有服务时选择确认空闲的 `STUDIO_PORT`，用本 Skill 的启动器：

```bash
python3 "$MINUTE_SKILL/scripts/start_studio.py" \
  --shared-video "$SHARED_VIDEO" --project "$PROJECT" --port "$STUDIO_PORT"
```

启动器使用独立后台会话，关闭标准输入，将输出和错误写入 `preview/studio/studio.log`，立即返回PID、端口、候选URL及记录文件路径。`status=starting` 只表示已发起启动，不能当作就绪。它不会等待Studio退出，也不会打开浏览器。

随后用独立、可返回的检查确认就绪：读取日志末尾（如 `tail -n 40`），检查该项目服务的端口监听，再对实际URL发起有超时的HTTP请求（如 `curl --max-time 2 -s -o /dev/null -w '%{http_code}' "$STUDIO_URL"`）。HTTP正常后直接打开浏览器，不因后台进程仍在运行而继续等待。首次检查可在最多30秒内有限重试；未就绪就回到日志和进程检查，报告具体错误，不能反复说“仍在打包”并无限等待。启动器记录的候选URL须与实际日志、监听端口一致；端口被其他项目占用时选空闲端口，不停止别人的服务。

如启动记录已存在但服务失效，先核对PID、项目与日志，保留旧记录和日志，再明确重试；不要覆盖诊断信息或循环拉起服务。进程检查只输出相关PID、可执行文件名、必要的项目参数和端口，不输出完整shell环境或凭证。

第四阶段必须执行以下交付检查：

1. 检查是否已有本项目的 Studio，复用可用实例；否则按上面的后台启动流程运行并确认就绪。共享工具给 Remotion 传入了 `--no-open`，**不会自动打开浏览器**，必须从实际启动日志读取URL，再主动在用户可访问的浏览器打开。不要猜端口，也不要误用其他视频项目的服务。
2. 选择 `project.json.compositionId` 对应的完整视频，在浏览器验证可以播放：时间和画面随播放推进，检查旁白音轨、字幕及关键转场，并查看全条。只有截图、typecheck或静帧渲染成功，均不能证明播放和音画同步；无法试听的部分如实列为未验证。
3. 交付实际可访问的 Studio 链接、Composition 名称、实测时长及检查结果，记录服务进程、端口和日志位置，暂停播放后保留预览服务与供用户查看的浏览器页面。不要在交付链接前或交付后立即关闭服务。临时自动化检查页可以关闭，用户预览页与服务在用户结束预览或不再需要时清理。

生成带音频的预览MP4时，同样沿用共享导出管线的原音频复用封装方式，再用 `verify_export.py --project "$PROJECT" --video <预览相对路径>` 核对全解码与波形同步；Remotion直接AAC编码成功不能证明音轨没有采样偏移。不得改原配音来迁就预览编码。

只有截图时，进度应写“关键帧已检查，动态预览待完成”，不得写“阶段④完成”。Studio 无法启动或无法访问时，保留错误记录并继续排查；仍无法解决则明确交付阻塞原因。必要时可提供经实际播放验证的带配音预览视频，记录改用视频的原因；这属于第四阶段预览，不等于第五阶段正式MP4导出验收，也不能声称Studio已启动。

## 导出与交付

用户推进到最终导出阶段、明确要求导出或要求连续出片时执行；单次“下一步”仍受当前阶段边界约束，配音、分镜或动画预览阶段不自动执行本段。

```bash
node "$SHARED_VIDEO/tools/remotion.mjs" render --project "$PROJECT" --detach
python3 "$SHARED_VIDEO/tools/verify_export.py" --project "$PROJECT"
python3 "$MINUTE_SKILL/scripts/one_minute.py" check \
  --project "$PROJECT" --media "$PROJECT/output/<project.outputName>"
```

输出文件名从实际 `project.json.outputName` 读取，不把尖括号示例原样传入命令。渲染状态和日志按共享工具返回路径读取，不重复启动渲染。

成片包含二哥旁白和字幕；无声视频只是中间产物。超60秒时保留全文、完整音频和语速，按实际音频长度设置画面与字幕，在本阶段导出并报告实测时长；不精简文稿，不提供删减建议、可删项或精简版本，不使用 `-shortest`、`-t 60` 或加速来掩盖。检查失败时修复对应的漏字、媒体或同步问题，不为时长提醒重新锁定删减稿。用户另行明确要求精确60秒且与完整稿件冲突时，只说明实际时长与要求的冲突，保留原稿等待用户指示，不附删减方案；补留白也必须让画面、音轨及生成时间轴一致。

`verify_export.py` 负责全解码及波形同步核对，本 Skill 检查文字、声音配置和一分钟预算；两者都不能替代正常播放审片。只对实际验证过的内容报告通过。
