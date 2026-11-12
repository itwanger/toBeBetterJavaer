"""Copy the pixel kit into an initialized video project. Keep existing customizations."""
import argparse
import json
import os
from pathlib import Path
from tempfile import NamedTemporaryFile

ASSETS = Path(__file__).resolve().parents[1] / "assets"


def install(project):
    if not (project / "project.json").is_file() or not (project / "remotion/src").is_dir():
        raise SystemExit("Expected an initialized video project with project.json and remotion/src/")
    files = {
        **{project / "remotion/src" / p.name: p for p in ASSETS.glob("*.tsx")},
        **{project / "assets/images" / p.name: p for p in (ASSETS / "pixel-actor").glob("*.png")},
        **{project / "assets/sfx" / p.name: p for p in (ASSETS / "pixel-sfx").glob("*.wav")},
    }
    files.update({project / "assets/voice/harness-outro" / p.name: p for p in (ASSETS / "voice/harness-outro").iterdir() if p.is_file()})
    files.update({project / "assets/images/ergo-typing-v1" / p.name: p for p in (ASSETS / "ergo-typing-v1").iterdir() if p.is_file()})
    pending = []
    conflicts = []
    for dest, src in files.items():
        if dest.is_file() and dest.read_bytes() == src.read_bytes():
            continue
        if dest.exists() or dest.is_symlink():
            conflicts.append(str(dest))
        else:
            pending.append((dest, src))
    if conflicts:
        raise SystemExit("Project files differ from the kit:\n" + "\n".join(conflicts))
    for dest, src in pending:
        dest.parent.mkdir(exist_ok=True, parents=True)
        with NamedTemporaryFile(dir=dest.parent) as temp:
            temp.write(src.read_bytes())
            temp.flush()
            os.chmod(temp.name, 0o644)
            try:
                os.link(temp.name, dest)
            except FileExistsError:
                if not dest.is_file() or dest.read_bytes() != src.read_bytes():
                    raise SystemExit(f"Project file changed during installation: {dest}")
    # Per-project configuration is bootstrapped once; never overwrite authored scenes/events.
    for name, content in [('pixel-review.json', {'schemaVersion': 1, 'chapters': {}}),
                          ('pixel-actions.json', {'schemaVersion': 1, 'events': []})]:
        target = project / 'assets/references' / name
        target.parent.mkdir(parents=True, exist_ok=True)
        try:
            with target.open('x') as stream:
                stream.write(json.dumps(content, ensure_ascii=False, indent=2) + '\n')
        except FileExistsError:
            pass
    print(f"Copied {len(pending)} of {len(files)} pixel assets into {project}")
    print('Next: declare this chapter in assets/references/pixel-review.json; chapter_pipeline.py checks it automatically.')


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--project", required=True, type=Path)
    install(parser.parse_args().project.resolve())
