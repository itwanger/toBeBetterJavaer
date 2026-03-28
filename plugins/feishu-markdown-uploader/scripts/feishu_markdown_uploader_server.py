#!/usr/bin/env python3
from __future__ import annotations

import json
import mimetypes
import os
import pathlib
import subprocess
import sys
import tempfile
import time
import traceback
import urllib.error
import urllib.parse
import urllib.request
from typing import Any


SERVER_NAME = "feishu-markdown-uploader"
SERVER_VERSION = "0.1.0"
PROTOCOL_VERSION = "2024-11-05"


class FeishuUploaderError(RuntimeError):
    pass


def read_message() -> dict[str, Any] | None:
    headers: dict[str, str] = {}
    while True:
        line = sys.stdin.buffer.readline()
        if not line:
            return None
        if line in (b"\r\n", b"\n"):
            break
        decoded = line.decode("utf-8").strip()
        if not decoded:
            continue
        if ":" not in decoded:
            raise FeishuUploaderError(f"Invalid MCP header line: {decoded}")
        key, value = decoded.split(":", 1)
        headers[key.strip().lower()] = value.strip()

    content_length = int(headers.get("content-length", "0"))
    if content_length <= 0:
        raise FeishuUploaderError("Missing Content-Length header")
    body = sys.stdin.buffer.read(content_length)
    return json.loads(body.decode("utf-8"))


def write_message(message: dict[str, Any]) -> None:
    payload = json.dumps(message, ensure_ascii=False).encode("utf-8")
    sys.stdout.buffer.write(f"Content-Length: {len(payload)}\r\n\r\n".encode("utf-8"))
    sys.stdout.buffer.write(payload)
    sys.stdout.buffer.flush()


def make_json_response(request_id: Any, result: Any) -> dict[str, Any]:
    return {"jsonrpc": "2.0", "id": request_id, "result": result}


def make_error_response(request_id: Any, code: int, message: str) -> dict[str, Any]:
    return {"jsonrpc": "2.0", "id": request_id, "error": {"code": code, "message": message}}


def expand_path(path_text: str) -> pathlib.Path:
    return pathlib.Path(os.path.expandvars(os.path.expanduser(path_text))).resolve()


def get_required_argument(arguments: dict[str, Any], name: str) -> str:
    value = arguments.get(name)
    if value is None or str(value).strip() == "":
        raise FeishuUploaderError(f"Missing required argument: {name}")
    return str(value)


def read_env_value(name: str) -> str | None:
    value = os.environ.get(name)
    if not value:
        return None
    stripped = value.strip()
    return stripped or None


def json_request(
    method: str,
    url: str,
    *,
    token: str | None = None,
    payload: dict[str, Any] | None = None,
    timeout: int = 30,
) -> dict[str, Any]:
    data = None
    headers = {"Content-Type": "application/json; charset=utf-8"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    if payload is not None:
        data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    request = urllib.request.Request(url=url, method=method.upper(), headers=headers, data=data)
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        raise FeishuUploaderError(f"HTTP {exc.code} calling {url}: {body}") from exc
    except urllib.error.URLError as exc:
        raise FeishuUploaderError(f"Unable to reach {url}: {exc}") from exc


def curl_upload_file(token: str, file_path: pathlib.Path, file_name: str, folder_token: str) -> dict[str, Any]:
    mime_type = mimetypes.guess_type(file_name)[0] or "application/octet-stream"
    cmd = [
        "curl",
        "--silent",
        "--show-error",
        "--location",
        "https://open.feishu.cn/open-apis/drive/v1/files/upload_all",
        "--header",
        f"Authorization: Bearer {token}",
        "--form",
        f"file_name={file_name}",
        "--form",
        "parent_type=explorer",
        "--form",
        f"parent_node={folder_token}",
        "--form",
        f"size={file_path.stat().st_size}",
        "--form",
        f"file=@{file_path};type={mime_type}",
    ]
    try:
        completed = subprocess.run(cmd, check=True, capture_output=True, text=True)
    except subprocess.CalledProcessError as exc:
        raise FeishuUploaderError(exc.stderr.strip() or "Feishu file upload failed") from exc
    try:
        return json.loads(completed.stdout)
    except json.JSONDecodeError as exc:
        raise FeishuUploaderError(f"Unexpected upload response: {completed.stdout}") from exc


def ensure_feishu_success(response: dict[str, Any], action: str) -> dict[str, Any]:
    if response.get("code") not in (0, "0", None):
        raise FeishuUploaderError(
            f"{action} failed with code {response.get('code')}: {response.get('msg') or response.get('message') or response}"
        )
    return response


def get_access_token(arguments: dict[str, Any]) -> str:
    direct_token = arguments.get("access_token") or read_env_value("FEISHU_ACCESS_TOKEN")
    if direct_token:
        return str(direct_token)

    app_id = arguments.get("app_id") or read_env_value("FEISHU_APP_ID")
    app_secret = arguments.get("app_secret") or read_env_value("FEISHU_APP_SECRET")
    if not app_id or not app_secret:
        raise FeishuUploaderError(
            "Missing Feishu credentials. Set FEISHU_APP_ID and FEISHU_APP_SECRET, or provide access_token."
        )

    response = json_request(
        "POST",
        "https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal",
        payload={"app_id": app_id, "app_secret": app_secret},
    )
    ensure_feishu_success(response, "Get tenant access token")
    token = response.get("tenant_access_token")
    if not token:
        raise FeishuUploaderError(f"tenant_access_token missing in response: {response}")
    return str(token)


def get_root_folder_meta(token: str) -> dict[str, Any]:
    response = json_request(
        "GET",
        "https://open.feishu.cn/open-apis/drive/explorer/v2/root_folder/meta",
        token=token,
    )
    ensure_feishu_success(response, "Get root folder")
    data = response.get("data") or {}
    folder_token = data.get("token")
    if not folder_token:
        raise FeishuUploaderError(f"Root folder token missing in response: {response}")
    return data


def convert_markdown_to_docx(
    markdown_path: pathlib.Path,
    output_docx_path: pathlib.Path,
    *,
    title: str,
) -> pathlib.Path:
    resource_path = str(markdown_path.parent)
    cmd = [
        "pandoc",
        str(markdown_path),
        "--from=gfm",
        "--to=docx",
        "--standalone",
        "--resource-path",
        resource_path,
        "--metadata",
        f"title={title}",
        "--output",
        str(output_docx_path),
    ]
    try:
        subprocess.run(cmd, check=True, capture_output=True, text=True)
    except FileNotFoundError as exc:
        raise FeishuUploaderError("pandoc is not installed. Install it first to convert Markdown into DOCX.") from exc
    except subprocess.CalledProcessError as exc:
        stderr = exc.stderr.strip() or exc.stdout.strip()
        raise FeishuUploaderError(f"pandoc conversion failed: {stderr}") from exc
    if not output_docx_path.exists():
        raise FeishuUploaderError("DOCX conversion finished but output file was not created.")
    return output_docx_path


def create_import_task(token: str, file_token: str, folder_token: str, file_name: str) -> dict[str, Any]:
    payload = {
        "file_token": file_token,
        "type": "docx",
        "file_extension": "docx",
        "file_name": file_name,
        "point": {
            "mount_type": 1,
            "mount_key": folder_token,
        },
    }
    response = json_request(
        "POST",
        "https://open.feishu.cn/open-apis/drive/v1/import_tasks",
        token=token,
        payload=payload,
    )
    ensure_feishu_success(response, "Create import task")
    return response


def get_import_task(token: str, ticket: str) -> dict[str, Any]:
    response = json_request(
        "GET",
        f"https://open.feishu.cn/open-apis/drive/v1/import_tasks/{urllib.parse.quote(ticket)}",
        token=token,
    )
    ensure_feishu_success(response, "Get import task")
    return response


def normalize_import_task_payload(data: dict[str, Any]) -> dict[str, Any]:
    result = data.get("result")
    if not isinstance(result, dict):
        return data

    normalized = dict(data)
    for key in ("job_status", "url", "token", "job_error_msg", "type", "extra"):
        if key not in normalized and key in result:
            normalized[key] = result[key]
    return normalized


def summarize_result(data: dict[str, Any]) -> dict[str, Any]:
    normalized = normalize_import_task_payload(data)
    result = normalized.get("result") or {}
    extra = {
        "job_status": normalized.get("job_status"),
        "ticket": normalized.get("ticket"),
        "document_url": result.get("url") or normalized.get("url"),
        "document_token": result.get("token") or normalized.get("token"),
        "raw": normalized,
    }
    return extra


def poll_import_result(token: str, ticket: str, timeout_seconds: int, poll_interval_seconds: int) -> dict[str, Any]:
    deadline = time.time() + timeout_seconds
    latest: dict[str, Any] | None = None
    first_poll = True
    while time.time() < deadline:
        if first_poll:
            time.sleep(max(1, poll_interval_seconds))
            first_poll = False
        latest_response = get_import_task(token, ticket)
        latest = normalize_import_task_payload(latest_response.get("data") or {})
        job_status = str(latest.get("job_status"))
        if job_status == "0":
            return summarize_result(latest)
        if job_status == "2":
            raise FeishuUploaderError(f"Import task failed: {latest}")
        time.sleep(max(1, poll_interval_seconds))
    raise FeishuUploaderError(f"Timed out waiting for import task {ticket}. Last response: {latest}")


def handle_get_root_folder(arguments: dict[str, Any]) -> dict[str, Any]:
    token = get_access_token(arguments)
    data = get_root_folder_meta(token)
    return {
        "content": [
            {
                "type": "text",
                "text": json.dumps(
                    {
                        "token": data.get("token"),
                        "id": data.get("id"),
                        "user_id": data.get("user_id"),
                    },
                    ensure_ascii=False,
                    indent=2,
                ),
            }
        ]
    }


def handle_convert_markdown(arguments: dict[str, Any]) -> dict[str, Any]:
    markdown_path = expand_path(get_required_argument(arguments, "markdown_path"))
    if not markdown_path.is_file():
        raise FeishuUploaderError(f"Markdown file not found: {markdown_path}")

    title = str(arguments.get("title") or markdown_path.stem)
    output_docx_arg = arguments.get("output_docx_path")
    if output_docx_arg:
        output_docx_path = expand_path(str(output_docx_arg))
        output_docx_path.parent.mkdir(parents=True, exist_ok=True)
    else:
        output_docx_path = markdown_path.with_suffix(".docx")

    convert_markdown_to_docx(markdown_path, output_docx_path, title=title)
    return {
        "content": [
            {
                "type": "text",
                "text": json.dumps(
                    {
                        "markdown_path": str(markdown_path),
                        "docx_path": str(output_docx_path),
                        "title": title,
                    },
                    ensure_ascii=False,
                    indent=2,
                ),
            }
        ]
    }


def handle_import_markdown(arguments: dict[str, Any]) -> dict[str, Any]:
    markdown_path = expand_path(get_required_argument(arguments, "markdown_path"))
    if not markdown_path.is_file():
        raise FeishuUploaderError(f"Markdown file not found: {markdown_path}")

    title = str(arguments.get("title") or markdown_path.stem)
    timeout_seconds = int(arguments.get("timeout_seconds") or 120)
    poll_interval_seconds = int(arguments.get("poll_interval_seconds") or 2)
    keep_docx = bool(arguments.get("keep_docx") or False)

    token = get_access_token(arguments)
    folder_token = str(arguments.get("folder_token") or read_env_value("FEISHU_FOLDER_TOKEN") or "")
    folder_meta = None
    if not folder_token:
        folder_meta = get_root_folder_meta(token)
        folder_token = str(folder_meta["token"])

    output_docx_arg = arguments.get("output_docx_path")
    temp_dir: tempfile.TemporaryDirectory[str] | None = None
    if output_docx_arg:
        docx_path = expand_path(str(output_docx_arg))
        docx_path.parent.mkdir(parents=True, exist_ok=True)
        cleanup_docx = False
    elif keep_docx:
        docx_path = markdown_path.with_suffix(".docx")
        cleanup_docx = False
    else:
        temp_dir = tempfile.TemporaryDirectory(prefix="feishu-md-")
        docx_path = pathlib.Path(temp_dir.name) / f"{markdown_path.stem}.docx"
        cleanup_docx = True

    try:
        convert_markdown_to_docx(markdown_path, docx_path, title=title)

        upload_response = ensure_feishu_success(
            curl_upload_file(token, docx_path, docx_path.name, folder_token),
            "Upload DOCX file",
        )
        upload_data = upload_response.get("data") or {}
        file_token = upload_data.get("file_token")
        if not file_token:
            raise FeishuUploaderError(f"file_token missing in upload response: {upload_response}")

        import_response = create_import_task(token, str(file_token), folder_token, title)
        import_data = import_response.get("data") or {}
        ticket = import_data.get("ticket")
        if not ticket:
            raise FeishuUploaderError(f"ticket missing in import task response: {import_response}")

        result = poll_import_result(token, str(ticket), timeout_seconds, poll_interval_seconds)
        payload = {
            "markdown_path": str(markdown_path),
            "docx_path": str(docx_path),
            "folder_token": folder_token,
            "root_folder_id": None if folder_meta is None else folder_meta.get("id"),
            "uploaded_file_token": file_token,
            "ticket": ticket,
            "job_status": result.get("job_status"),
            "document_url": result.get("document_url"),
            "document_token": result.get("document_token"),
        }
        summary_lines = [
            f"Feishu document created: {payload['document_url']}",
            f"Document token: {payload['document_token']}",
            f"Source markdown: {payload['markdown_path']}",
        ]
        return {
            "content": [
                {
                    "type": "text",
                    "text": "\n".join(summary_lines),
                },
                {
                    "type": "text",
                    "text": json.dumps(payload, ensure_ascii=False, indent=2),
                }
            ]
        }
    finally:
        if cleanup_docx and temp_dir is not None:
            temp_dir.cleanup()


TOOLS = [
    {
        "name": "import_markdown_to_feishu",
        "description": "Convert a local Markdown file with local images into a DOCX, upload it to Feishu Drive, import it as a Feishu doc, and return the document link.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "markdown_path": {
                    "type": "string",
                    "description": "Absolute or relative path to the local Markdown file.",
                },
                "title": {
                    "type": "string",
                    "description": "Optional Feishu document title. Defaults to the Markdown filename.",
                },
                "folder_token": {
                    "type": "string",
                    "description": "Optional Feishu Drive folder token. Defaults to FEISHU_FOLDER_TOKEN or the user's root folder.",
                },
                "output_docx_path": {
                    "type": "string",
                    "description": "Optional path for the generated DOCX file.",
                },
                "keep_docx": {
                    "type": "boolean",
                    "description": "Whether to keep the generated DOCX when output_docx_path is not specified.",
                },
                "timeout_seconds": {
                    "type": "integer",
                    "description": "How long to wait for Feishu import completion.",
                    "minimum": 10,
                },
                "poll_interval_seconds": {
                    "type": "integer",
                    "description": "Polling interval for the Feishu import task.",
                    "minimum": 1,
                },
                "access_token": {
                    "type": "string",
                    "description": "Optional direct Feishu access token. If omitted, the server uses FEISHU_ACCESS_TOKEN or app credentials.",
                },
                "app_id": {
                    "type": "string",
                    "description": "Optional Feishu app ID override.",
                },
                "app_secret": {
                    "type": "string",
                    "description": "Optional Feishu app secret override.",
                },
            },
            "required": [
                "markdown_path"
            ],
            "additionalProperties": False,
        },
    },
    {
        "name": "convert_markdown_to_docx",
        "description": "Convert a local Markdown file into a DOCX locally, preserving local image references through pandoc.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "markdown_path": {
                    "type": "string",
                    "description": "Absolute or relative path to the local Markdown file.",
                },
                "title": {
                    "type": "string",
                    "description": "Optional document title to embed in the DOCX metadata.",
                },
                "output_docx_path": {
                    "type": "string",
                    "description": "Optional target path for the generated DOCX.",
                },
            },
            "required": [
                "markdown_path"
            ],
            "additionalProperties": False,
        },
    },
    {
        "name": "get_feishu_root_folder",
        "description": "Fetch the current Feishu Drive root folder token so uploads can target a specific folder later.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "access_token": {
                    "type": "string",
                    "description": "Optional direct Feishu access token.",
                },
                "app_id": {
                    "type": "string",
                    "description": "Optional Feishu app ID override.",
                },
                "app_secret": {
                    "type": "string",
                    "description": "Optional Feishu app secret override.",
                },
            },
            "additionalProperties": False,
        },
    },
]


def handle_request(message: dict[str, Any]) -> dict[str, Any] | None:
    method = message.get("method")
    request_id = message.get("id")

    if method == "initialize":
        return make_json_response(
            request_id,
            {
                "protocolVersion": PROTOCOL_VERSION,
                "capabilities": {
                    "tools": {}
                },
                "serverInfo": {
                    "name": SERVER_NAME,
                    "version": SERVER_VERSION,
                },
            },
        )

    if method == "notifications/initialized":
        return None

    if method == "ping":
        return make_json_response(request_id, {})

    if method == "tools/list":
        return make_json_response(request_id, {"tools": TOOLS})

    if method == "tools/call":
        params = message.get("params") or {}
        tool_name = params.get("name")
        arguments = params.get("arguments") or {}
        if tool_name == "import_markdown_to_feishu":
            return make_json_response(request_id, handle_import_markdown(arguments))
        if tool_name == "convert_markdown_to_docx":
            return make_json_response(request_id, handle_convert_markdown(arguments))
        if tool_name == "get_feishu_root_folder":
            return make_json_response(request_id, handle_get_root_folder(arguments))
        return make_error_response(request_id, -32602, f"Unknown tool: {tool_name}")

    return make_error_response(request_id, -32601, f"Method not found: {method}")


def main() -> int:
    try:
        while True:
            message = read_message()
            if message is None:
                return 0
            if "id" not in message and message.get("method") == "notifications/initialized":
                continue
            try:
                response = handle_request(message)
            except FeishuUploaderError as exc:
                response = make_error_response(message.get("id"), -32000, str(exc))
            except Exception:
                response = make_error_response(message.get("id"), -32001, traceback.format_exc())
            if response is not None and message.get("id") is not None:
                write_message(response)
    except KeyboardInterrupt:
        return 0


if __name__ == "__main__":
    raise SystemExit(main())
