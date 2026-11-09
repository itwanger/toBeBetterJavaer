"""Extract composited PNG states and original frame durations from a source GIF."""
import argparse
import hashlib
import json
from pathlib import Path
from tempfile import TemporaryDirectory

from PIL import Image


def extract(source, output):
    output.parent.mkdir(parents=True, exist_ok=True)
    with TemporaryDirectory(dir=output.parent) as temp:
        staged = Path(temp) / "states"
        staged.mkdir()
        frames = []
        with Image.open(source) as image:
            if image.format != "GIF":
                raise ValueError("Expected a source GIF")
            width, height = image.size
            for index in range(image.n_frames):
                image.seek(index)
                name = f"{index}.png"
                image.convert("RGBA").save(staged / name)
                frames.append({"file": name, "durationMs": image.info.get("duration")})
        manifest = {
            "sourceSha256": hashlib.sha256(source.read_bytes()).hexdigest(),
            "size": [width, height],
            "frames": frames,
        }
        (staged / "frames.json").write_text(json.dumps(manifest, indent=2) + "\n")
        if output.exists():
            expected = {item.name for item in staged.iterdir()}
            matches = output.is_dir() and {item.name for item in output.iterdir()} == expected and all(
                (output / item.name).is_file() and (output / item.name).read_bytes() == item.read_bytes()
                for item in staged.iterdir()
            )
            if not matches:
                raise SystemExit(f"Output differs from this GIF. Choose a new directory: {output}")
        else:
            staged.rename(output)
    print(f"{len(frames)} source states in {output}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    extract(args.source.resolve(), args.output.resolve())
