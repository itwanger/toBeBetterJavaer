#!/bin/bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLUGIN_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

if [[ -f "${PLUGIN_DIR}/.env.local" ]]; then
  # shellcheck disable=SC1091
  source "${PLUGIN_DIR}/.env.local"
fi

if [[ -f "${PLUGIN_DIR}/.env" ]]; then
  # shellcheck disable=SC1091
  source "${PLUGIN_DIR}/.env"
fi

cd "${PLUGIN_DIR}"
exec python3 "./scripts/feishu_markdown_uploader_server.py"
