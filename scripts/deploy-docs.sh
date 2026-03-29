#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="${ENV_FILE:-$ROOT_DIR/.env}"
DOCS_DIR="$ROOT_DIR/docs"
DIST_DIR="$DOCS_DIR/dist"
DRY_RUN=false

if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN=true
fi

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing env file: $ENV_FILE"
  echo "Copy .env.example to .env and fill in your deployment settings."
  exit 1
fi

set -a
# shellcheck disable=SC1090
source "$ENV_FILE"
set +a

required_vars=(
  DOCS_DEPLOY_HOST
  DOCS_DEPLOY_PORT
  DOCS_DEPLOY_USER
  DOCS_DEPLOY_KEY_PATH
  DOCS_DEPLOY_REMOTE_DIR
)

for var_name in "${required_vars[@]}"; do
  if [[ -z "${!var_name:-}" ]]; then
    echo "Missing required env var: $var_name"
    exit 1
  fi
done

if [[ ! -f "$DOCS_DEPLOY_KEY_PATH" ]]; then
  echo "SSH key file not found: $DOCS_DEPLOY_KEY_PATH"
  exit 1
fi

for command_name in pnpm zip scp ssh node; do
  if ! command -v "$command_name" >/dev/null 2>&1; then
    echo "Required command not found: $command_name"
    exit 1
  fi
done

temp_dir="$(mktemp -d)"
archive_name="javabetter-docs-$(date +%Y%m%d%H%M%S).zip"
archive_path="$temp_dir/$archive_name"
remote_archive_path="/tmp/$archive_name"

cleanup() {
  rm -rf "$temp_dir"
}

trap cleanup EXIT

echo "==> Building docs"
rm -rf "$DIST_DIR"
pnpm --dir "$DOCS_DIR" docs:build

if [[ ! -d "$DIST_DIR" ]]; then
  echo "Build output directory not found: $DIST_DIR"
  exit 1
fi

echo "==> Patching service worker"
node "$ROOT_DIR/scripts/patch-service-worker.js" "$DIST_DIR/service-worker.js"

echo "==> Creating archive"
(
  cd "$DIST_DIR"
  zip -qr "$archive_path" .
)

if [[ "$DRY_RUN" == "true" ]]; then
  echo "==> Dry run complete"
  echo "Archive created at: $archive_path"
  exit 0
fi

echo "==> Uploading archive to ${DOCS_DEPLOY_USER}@${DOCS_DEPLOY_HOST}"
scp -P "$DOCS_DEPLOY_PORT" -i "$DOCS_DEPLOY_KEY_PATH" "$archive_path" \
  "${DOCS_DEPLOY_USER}@${DOCS_DEPLOY_HOST}:$remote_archive_path"

echo "==> Deploying on remote server"
ssh -p "$DOCS_DEPLOY_PORT" -i "$DOCS_DEPLOY_KEY_PATH" \
  "${DOCS_DEPLOY_USER}@${DOCS_DEPLOY_HOST}" \
  bash -s -- "$DOCS_DEPLOY_REMOTE_DIR" "$remote_archive_path" <<'EOF'
set -euo pipefail

remote_dir="$1"
archive_path="$2"

mkdir -p "$remote_dir"
if ! command -v unzip >/dev/null 2>&1; then
  echo "Required command not found on remote server: unzip"
  exit 1
fi
rm -rf "$remote_dir/dist"
mkdir -p "$remote_dir/dist"
unzip -oq "$archive_path" -d "$remote_dir/dist"
rm -f "$archive_path"
EOF

echo "==> Deployment finished"
echo "Remote dir: $DOCS_DEPLOY_REMOTE_DIR"
