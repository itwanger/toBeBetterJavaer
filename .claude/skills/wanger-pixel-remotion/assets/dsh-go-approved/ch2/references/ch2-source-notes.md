# 第二章来源与表现边界

固定仓库：ccch1mneyyy/dsh-Go，commit db3c81fc76ae500e1fe3fde7196b8252a49d6e6c。

- docs/guide/zh/03-engine-hosts.md → engine-hosts.md：本机/远程、直接启动与兼容回退、精简历史。
- docs/guide/zh/11-faq.md → faq.md：运行环境、网络、远程故障与使用限制。
- runtime/direct/preload.mjs → preload.mjs：直接启动的路径映射和 DNS 处理。
- 品牌包图标：Simple Icons；来源与哈希见 runtime-icons.json。

镜头采用依据文档重建的手机与机制动画，不冒充真实设备录屏；没有安装 Android SDK/AVD。路径 /root/work 是教学示例，右侧 Ubuntu/root/work 是目录层次表达，不声称它是应用私有目录的真实绝对路径。动画节奏不代表设备性能或实际网络延迟。

本机运行 Agent 引擎，推理仍联网。直接启动受阻自动回退兼容模式。DSH Remote 先直连，失败才引入中继；保持端到端加密含义。精简历史默认关闭、仅支持相应 DSH Remote 主机，重连后生效；电脑原始记录保留，只传递摘要，实时回复继续。不要把该开关用于 SSH。

本轮桌面 Harness 界面以已认可上期 live-chat.webp 的导航、工作区与输入区为依据，用 HTML 重建动态任务。输入文件名10月花销.csv为解释文件访问的例子，非声称仓库原始输入文件名；金额、任务和输出文件继续依据仓库花销案例。App 内错误反馈表达 Android 执行限制，不添加伪造的系统授权弹窗。用户态通过整个文件路径过程仍处于 App 范围内表达。

当前模型形象复用 Skill assets/cot-knowledge-approved/images/pixel-whale-v1.png，复制到本项目 assets/images/dsh/pixel-whale-v1.png，SHA256 d38c79c7a4a2d2da3244d7232eff5d60aeed4c009d1f32e82004c904c3e96d23。DeepSeek Flash 名称按本轮用户指定用于机制表达，不表示执行了新的在线模型测试。摘要画面显示任务字段如何缩成短事实，不声称压缩比例或耗时。
