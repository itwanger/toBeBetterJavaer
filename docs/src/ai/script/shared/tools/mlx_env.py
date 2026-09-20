"""Re-exec the current script under the interpreter that has mlx_audio installed.

mlx_audio is installed as a uv tool on this machine, not in the system Python.
Candidates, in order: $MLX_AUDIO_PYTHON, ~/.local/share/uv/tools/mlx-audio/bin/python.
Models are read from ~/.cache/mlx-models (override with $MLX_ASR_MODEL / $MLX_ALIGNER_MODEL).
"""
import os, sys
from pathlib import Path

ASR_MODEL = os.environ.get('MLX_ASR_MODEL', str(Path.home() / '.cache/mlx-models/Qwen3-ASR-1.7B-4bit'))
ALIGNER_MODEL = os.environ.get('MLX_ALIGNER_MODEL', 'mlx-community/Qwen3-ForcedAligner-0.6B-4bit')


def ensure_mlx_audio() -> None:
    try:
        import mlx_audio  # noqa: F401
        return
    except ImportError:
        pass
    candidates = [os.environ.get('MLX_AUDIO_PYTHON', ''), str(Path.home() / '.local/share/uv/tools/mlx-audio/bin/python')]
    for candidate in candidates:
        if candidate and Path(candidate).is_file() and Path(candidate).resolve() != Path(sys.executable).resolve():
            os.execv(candidate, [candidate, *sys.argv])
    raise SystemExit('mlx_audio not importable; set MLX_AUDIO_PYTHON to an interpreter with mlx-audio (uv tool install mlx-audio)')
