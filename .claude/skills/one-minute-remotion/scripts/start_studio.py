#!/usr/bin/env python3
"""Start Studio in a detached session; return without waiting for server exit."""
import argparse
import json
from pathlib import Path
import shutil
import socket
import subprocess
import sys


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--project', required=True, type=Path)
    parser.add_argument('--shared-video', required=True, type=Path)
    parser.add_argument('--port', required=True, type=int)
    args = parser.parse_args()
    project = args.project.expanduser().resolve()
    entry = args.shared_video.expanduser().resolve() / 'tools/remotion.mjs'
    node = shutil.which('node')
    if not node or not entry.is_file() or not (project / 'project.json').is_file():
        parser.error('Need node, shared tools/remotion.mjs and project/project.json')
    if not 1 <= args.port <= 65535:
        parser.error('Port must be between 1 and 65535')
    try:
        with socket.create_connection(('localhost', args.port), timeout=1):
            parser.error('Port already in use; verify/reuse the existing project service or choose a free port')
    except OSError:
        pass
    folder = project / 'preview/studio'
    folder.mkdir(parents=True, exist_ok=True)
    log = folder / 'studio.log'
    state = folder / 'studio.json'
    # Keep each launch record, including failed attempts, for diagnosis.
    if state.exists():
        parser.error('Studio launch record exists; inspect its PID, log and readiness before starting again')
    with log.open('ab') as output:
        child = subprocess.Popen(
            [node, str(entry), 'studio', '--project', str(project), '--port', str(args.port)],
            cwd=project, stdin=subprocess.DEVNULL, stdout=output,
            stderr=subprocess.STDOUT, start_new_session=True,
        )
    record = {
        'status': 'starting', 'pid': child.pid, 'project': str(project),
        'port': args.port, 'candidateUrl': f'http://localhost:{args.port}',
        'log': str(log), 'state': str(state),
        'next': 'Check log, listening port and HTTP response; do not wait for the server process to exit',
    }
    state.write_text(json.dumps(record, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps(record, ensure_ascii=False, indent=2))
    return 0


if __name__ == '__main__':
    sys.exit(main())
