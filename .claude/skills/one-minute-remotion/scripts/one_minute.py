#!/usr/bin/env python3
"""Lock full narration/voice; report duration against a 60-second target.

Standard library only; check uses the existing ffprobe installation. No TTS,
network, media editing, dependency installation, or source modification.
"""
import argparse
import hashlib
import json
import math
from pathlib import Path
import subprocess
import sys


VOICE_KEYS = ("speakerId", "resourceId", "apiBase", "speedRatio", "atempo", "audio")


def read_json(path):
    return json.loads(path.read_text(encoding="utf-8"))


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def projection(text):
    # Only layout newlines are removed. Spaces, punctuation, case, and all
    # other Unicode characters retain their original values.
    return text.replace("\r", "").replace("\n", "")


def voice_snapshot(meta):
    tts = meta["config"]["tts"]
    if not tts.get("speakerId"):
        raise ValueError("Project has no selected speakerId")
    return {key: tts[key] for key in VOICE_KEYS if key in tts}


def lock(args):
    project = args.project.expanduser().resolve()
    out = project / "narration-lock.json"
    if out.exists() and not args.replace:
        raise ValueError("Narration lock exists; preserve it before an authorized --replace")
    source = args.source.expanduser().resolve()
    spoken = args.spoken.expanduser().resolve()
    text = spoken.read_text(encoding="utf-8")
    if not projection(text).strip():
        raise ValueError("Spoken text is empty")
    if not spoken.is_relative_to(project):
        raise ValueError("Keep spoken.txt inside the current project")
    for line in text.splitlines():
        if line.lstrip().startswith(("#", "```", "~~~", "|", "<", "![", "---")):
            raise ValueError("Use an explicitly extracted plain narration, not Markdown markup")
    data = {
        "schemaVersion": 1,
        "sourcePath": str(source),
        "sourceSha256": digest(source),
        "spokenPath": str(spoken),
        "spokenSha256": digest(spoken),
        "projectionSha256": hashlib.sha256(projection(text).encode("utf-8")).hexdigest(),
        "projectionRule": "remove CR and LF only; retain every other Unicode character",
        "voiceExpected": voice_snapshot(read_json(project / "project.json")),
        "targetDurationSec": 60,
    }
    out.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return {"status": "locked", "path": str(out), "spokenCharacters": len(projection(text))}, 0


def probe(path):
    result = subprocess.run(
        ["ffprobe", "-v", "error", "-show_format", "-show_streams", "-of", "json", str(path)],
        capture_output=True, text=True, check=True,
    )
    return json.loads(result.stdout)


def check(args):
    project = args.project.expanduser().resolve()
    errors, pending, warnings = [], [], []
    result = {"project": str(project), "stage": "export" if args.media else "audio", "targetDurationSec": 60}
    locked = read_json(project / "narration-lock.json")
    meta = read_json(project / "project.json")
    for label in ("source", "spoken"):
        path = Path(locked[label + "Path"])
        if not path.is_file() or digest(path) != locked[label + "Sha256"]:
            errors.append(label + " changed or is missing after narration was locked")
    if voice_snapshot(meta) != locked["voiceExpected"]:
        errors.append("Voice or playback settings changed after narration was locked")
    fps = float(meta["config"]["video"]["fps"])
    if not math.isfinite(fps) or fps <= 0:
        raise ValueError("FPS must be a finite positive number")
    rows = read_json(project / "beats.json")["beats"]
    if not rows:
        errors.append("No narration beats")
    expected = Path(locked["spokenPath"])
    joined = projection("".join(row["text"] for row in rows))
    joined_hash = hashlib.sha256(joined.encode("utf-8")).hexdigest()
    if joined_hash != locked["projectionSha256"]:
        errors.append("Beat text differs from locked narration (including punctuation or spaces)")
    if expected.is_file() and projection(expected.read_text(encoding="utf-8")) != joined:
        errors.append("Spoken text and narration beats do not match")
    ids = [row["id"] for row in rows]
    if len(ids) != len(set(ids)):
        errors.append("Duplicate narration beat IDs")

    chapters_path = project / "build" / "chapters.json"
    cues_path = project / "build" / "cues.json"
    timeline_duration = None
    if chapters_path.is_file() and cues_path.is_file():
        chapters, cues = read_json(chapters_path), read_json(cues_path)
        if not chapters or not cues:
            errors.append("Empty generated timeline")
        else:
            boundary = 0
            for row in chapters:
                start, end = row["startFrame"], row["endFrame"]
                if any(type(v) is not int for v in (start, end)) or start != boundary or end <= start:
                    errors.append("Chapter timeline contains a gap, overlap, or invalid frame boundary")
                boundary = end
            timeline_duration = boundary / fps
            result["timelineDurationSec"] = timeline_duration
            if timeline_duration > 60 + 1e-9:
                warnings.append("Composition exceeds the 60-second target; keep full narration")
            if [row["id"] for row in cues] != ids:
                errors.append("Cue order does not match narration beats")
            if [row["text"] for row in cues] != [row["text"] for row in rows]:
                errors.append("Generated cues contain stale narration text")
            cue_boundary = 0
            for cue in cues:
                start, count = cue["startFrame"], cue["durationFrames"]
                if any(type(v) is not int for v in (start, count)) or start != cue_boundary or count <= 0:
                    errors.append("Cue frame boundaries are not contiguous")
                cue_boundary = start + count
            if cue_boundary != boundary:
                errors.append("Cue and chapter endpoints disagree")
    else:
        pending.append("Generate build/chapters.json and build/cues.json from actual audio")

    audio = project / "build" / "voiceover.wav"
    if audio.is_file():
        seconds = float(probe(audio)["format"]["duration"])
        if not math.isfinite(seconds) or seconds <= 0:
            errors.append("Audio has an invalid duration")
        result["audioDurationSec"] = seconds
        if seconds > 60 + 1e-9:
            warnings.append("Voiceover exceeds the 60-second target; preserve full text, audio and speed")
        if timeline_duration is not None and abs(seconds - timeline_duration) > 1 / fps + 0.002:
            errors.append("Voiceover and composition differ by more than one frame")
    else:
        pending.append("Generate actual build/voiceover.wav; word count cannot establish duration")

    if args.media:
        media = args.media.expanduser().resolve()
        if not media.is_file():
            errors.append("Requested exported media is missing")
        else:
            data = probe(media)
            seconds = float(data["format"]["duration"])
            result["exportDurationSec"] = seconds
            if not math.isfinite(seconds) or seconds <= 0:
                errors.append("Exported media is empty or has an invalid duration")
            elif seconds > 60 + 0.001:
                warnings.append("Export exceeds the 60-second target; report its full actual duration")
            streams = data["streams"]
            if not any(s["codec_type"] == "audio" for s in streams):
                errors.append("Final MP4 has no narration audio track")
            videos = [s for s in streams if s["codec_type"] == "video"]
            if not videos:
                errors.append("Final media has no video track")
            elif timeline_duration is not None:
                video = videos[0]
                if "nb_frames" not in video:
                    errors.append("Export frame count unavailable; inspect the export before delivery")
                elif int(video["nb_frames"]) != round(timeline_duration * fps):
                    errors.append("Export frame count does not match the generated composition")
                cfg = meta["config"]["video"]
                if (video["width"], video["height"]) != (cfg["width"], cfg["height"]):
                    errors.append("Export dimensions differ from the selected project configuration")
                num, den = video["r_frame_rate"].split("/")
                if abs(float(num) / float(den) - fps) > 1e-6:
                    errors.append("Export frame rate differs from project configuration")
    durations = {key: max(0.0, result[key] - 60) for key in
                 ("timelineDurationSec", "audioDurationSec", "exportDurationSec")
                 if key in result and math.isfinite(result[key]) and result[key] > 60}
    result.update(
        status="failed" if errors else ("pending" if pending else "passed"),
        errors=errors, pending=pending, warnings=warnings, overTargetSec=durations,
        scope="Mechanical text, configuration, duration and timeline checks; not listening, ASR or visual review",
    )
    return result, 1 if errors else (2 if pending else 0)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    commands = parser.add_subparsers(dest="command", required=True)
    p = commands.add_parser("lock", help="Record approved narration and selected voice settings")
    p.add_argument("--project", required=True, type=Path)
    p.add_argument("--source", required=True, type=Path)
    p.add_argument("--spoken", required=True, type=Path)
    p.add_argument("--replace", action="store_true", help="Replace only after an approved script/config revision")
    p = commands.add_parser("check", help="Check actual audio or final exported MP4")
    p.add_argument("--project", required=True, type=Path)
    p.add_argument("--media", type=Path)
    args = parser.parse_args()
    try:
        result, code = lock(args) if args.command == "lock" else check(args)
    except (OSError, ValueError, KeyError, TypeError, subprocess.CalledProcessError) as exc:
        result, code = {"status": "failed", "error": str(exc)}, 1
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return code


if __name__ == "__main__":
    sys.exit(main())
