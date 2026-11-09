"""Index every decoded frame and build labeled contact sheets for visual review."""
import argparse
import csv
import subprocess
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw


def window(value):
    start, end, step = map(int, value.split(":"))
    if start < 0 or end < start or step < 1:
        raise argparse.ArgumentTypeError("expected START:END:STEP in decoded frames")
    return range(start, end + 1, step)


def contact_sheet(frames, path):
    sheet = Image.new("RGB", (4 * 256, ((len(frames) + 3) // 4) * 166), "#202734")
    draw = ImageDraw.Draw(sheet)
    for i, (frame, pts, picture) in enumerate(frames):
        x, y = i % 4 * 256, i // 4 * 166
        sheet.paste(picture, (x, y))
        draw.text((x + 4, y + 145), f"F{frame:05d}  {pts:.3f}s", fill="white")
    sheet.save(path)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("video", type=Path)
    parser.add_argument("out", type=Path)
    parser.add_argument("--window", type=window, action="append", default=[])
    parser.add_argument("--overview-step", type=int, default=120)
    args = parser.parse_args()
    if args.overview_step <= 0:
        parser.error("overview-step must be positive")
    args.out.mkdir(parents=True, exist_ok=True)
    pts_text = subprocess.check_output([
        "ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
        "frame=best_effort_timestamp_time", "-of", "csv=p=0", str(args.video),
    ], text=True)
    pts = [float(line.split(",")[0]) for line in pts_text.splitlines() if line.strip()]
    if any(w.stop - 1 >= len(pts) for w in args.window):
        parser.error("window outside video")
    groups = {"overview": set(range(0, len(pts), args.overview_step)) | {len(pts) - 1}}
    for w in args.window:
        groups[f"detail-{w.start}-{w.stop - 1}-s{w.step}"] = set(w)
    wanted = set.union(*groups.values())
    images = {}
    cmd = ["ffmpeg", "-v", "error", "-i", str(args.video), "-map", "0:v:0",
           "-vf", "scale=256:144:force_original_aspect_ratio=decrease,pad=256:144:(ow-iw)/2:(oh-ih)/2",
           "-fps_mode", "passthrough", "-f", "rawvideo", "-pix_fmt", "rgb24", "pipe:1"]
    with (args.out / "frames.csv").open("w", newline="") as file, subprocess.Popen(cmd, stdout=subprocess.PIPE) as proc:
        rows = csv.writer(file)
        rows.writerow(["frame", "pts_seconds", "mean_abs_rgb_delta_0_255"])
        previous = None
        try:
            for i, t in enumerate(pts):
                buf = proc.stdout.read(256 * 144 * 3)
                if len(buf) != 256 * 144 * 3:
                    raise ValueError(f"incomplete decoded frame {i}")
                rgb = np.frombuffer(buf, dtype=np.uint8).reshape(144, 256, 3)
                if i in wanted:
                    images[i] = Image.fromarray(rgb)
                current = rgb.astype(np.int16)
                delta = 0 if previous is None else np.abs(current - previous).mean()
                rows.writerow([i, t, round(float(delta), 4)])
                previous = current
            if proc.stdout.read(1) or proc.wait():
                raise ValueError("decoder frame count or exit status mismatch")
        finally:
            proc.stdout.close()
    for name, selection in groups.items():
        frames = [(i, pts[i], images[i]) for i in sorted(selection)]
        for offset in range(0, len(frames), 24):
            contact_sheet(frames[offset:offset+24], args.out / f"{name}-{offset//24+1:02d}.jpg")
    print(f"{len(pts)} frames; final PTS {pts[-1]} s; {len(wanted)} review images")


if __name__ == "__main__":
    main()
