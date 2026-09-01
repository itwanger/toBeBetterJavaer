#!/bin/bash
# 一键构建并部署 javabetter.cn：npm run docs:deploy
#
# 流程：docs:build（含 llms.txt 生成、paicoding canonical 探测、vuepress 构建、百度推送）
#       → rsync 增量同步 dist 到生产服务器 nginx 站点目录。
# 任何一步失败立即中止，不会把残缺产物同步上线。
set -e
cd "$(dirname "$0")/.."

SSH_KEY="$HOME/Desktop/paicoding.pem"
REMOTE="root@62.234.82.38"
REMOTE_DIR="/home/www/javabetter/dist/"

npm run docs:build

echo "[deploy] 同步 dist 到 $REMOTE:$REMOTE_DIR"
rsync -az --delete -e "ssh -i $SSH_KEY" dist/ "$REMOTE:$REMOTE_DIR"

echo "[deploy] 验证线上版本"
curl -s -o /dev/null -w "llms.txt: %{http_code}\n" https://javabetter.cn/llms.txt
curl -s -o /dev/null -w "首页: %{http_code}\n" https://javabetter.cn/
echo "[deploy] 完成：https://javabetter.cn"
