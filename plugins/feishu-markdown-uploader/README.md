# Feishu Markdown Uploader

这个插件会把本地 Markdown 文档先转换成带图片的 `docx`，再导入到飞书，避免手动一张张贴图。

## 需要准备

1. 在飞书开放平台创建一个企业自建应用。
2. 为应用申请云空间 / 云文档相关权限，并拿到 `App ID` 与 `App Secret`。
3. 本机安装 `pandoc`。

## 配置方式

可以直接复制 `plugins/feishu-markdown-uploader/.env.example` 为 `.env.local`，再填入真实值：

```bash
export FEISHU_APP_ID="cli_xxx"
export FEISHU_APP_SECRET="xxx"
# 可选：默认上传目标文件夹
export FEISHU_FOLDER_TOKEN="fldcnxxx"
```

如果不配置 `FEISHU_FOLDER_TOKEN`，插件会默认上传到当前账号的“我的空间”根目录。

## 插件提供的工具

- `import_markdown_to_feishu`
  - 输入本地 Markdown 路径，自动转换、上传并导入飞书文档
  - 成功后会直接返回飞书文档 URL，同时保留完整 JSON 结果
- `convert_markdown_to_docx`
  - 只做本地转换，方便先检查图片是否都被正确带进 docx
- `get_feishu_root_folder`
  - 获取当前账号根目录的 folder token

## 推荐用法

先测试本地转换：

```text
调用 convert_markdown_to_docx，传入 markdown_path
```

再正式导入飞书：

```text
调用 import_markdown_to_feishu，传入 markdown_path 和可选 title / folder_token
```

## 实现思路

1. `pandoc` 将 Markdown 和本地图片转成 `docx`
2. 调用飞书云空间上传接口上传该 `docx`
3. 调用导入任务接口导入为飞书新版文档
4. 轮询导入结果并返回最终文档链接
