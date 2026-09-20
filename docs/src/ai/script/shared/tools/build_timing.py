"""Build chapter-local subtitle and event frames from forced alignment plus the real cue timeline.

  python3 shared/tools/build_timing.py --project <dir> --chapter ch2

Reads assets/references/<ch>-spec.json, preview/<ch>-forced-alignment.json, build/cues.json and
build/chapters.json; writes assets/references/<ch>-phrase-timing.json.

Spec format:
  {"subtitles": {"<unitId>": ["phrase", ["phrase", "spokenAnchor"], ...]},
   "events": {"name": ["<unitId>", "anchor" | null | "end", offsetFrames?]}}

Phrases must concatenate exactly to the unit's subtitle text (keep the original spaces) and each
must fit one subtitle line (width <= 34 units: ASCII 0.58, other 1). Subtitle switches happen at
the onset of the phrase's first characters in the spoken text (ttsText when present); pass a
[phrase, anchor] pair when the subtitle differs from what was read (87% vs 百分之八十七, paths).
Events: null = unit start, "end" = unit end, otherwise onset of the anchor in the spoken text,
plus offsetFrames (use -5 for entrances that should begin just before the word).
"""
import argparse, json, re
from project_paths import project_path, read_json, write_json, load_beats

FPS_DEFAULT = 30
MAX_WIDTH = 34
STRIP = re.compile(r'[\s，。？！：；、,.!?;:“”"\'()（）《》/\-—·]+')


def norm(text: str) -> str:
    return STRIP.sub('', text).lower()


def width_of(text: str) -> float:
    return sum(0.58 if ord(ch) < 128 else 1 for ch in text)


class Unit:
    def __init__(self, unit: dict, cue: dict, chapter_start: int, fps: int):
        self.id = unit['id']; self.fps = fps
        self.local_start = cue['startFrame'] - chapter_start
        self.local_end = self.local_start + cue['durationFrames']
        self.chars, self.starts = [], []
        for item in unit['items']:
            for ch in norm(item['text']):
                self.chars.append(ch); self.starts.append(item['start_time'])
        self.joined = ''.join(self.chars)

    def onset_frame(self, anchor: str, search_from: int = 0):
        key = norm(anchor)
        pos = self.joined.find(key, search_from)
        if pos < 0:
            raise SystemExit(f'unit {self.id}: anchor {anchor!r} not found in spoken text {self.joined!r}')
        return self.local_start + round(self.starts[pos] * self.fps), pos + len(key)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('--project', required=True, type=project_path)
    parser.add_argument('--chapter', required=True)
    args = parser.parse_args()
    project, ch = args.project, args.chapter
    fps = read_json(project / 'project.json')['config']['video'].get('fps', FPS_DEFAULT)
    chapters = {c['id']: c for c in read_json(project / 'build/chapters.json')}
    cues = {c['id']: c for c in read_json(project / 'build/cues.json')}
    alignment = read_json(project / 'preview' / f'{ch}-forced-alignment.json')
    spec = read_json(project / 'assets/references' / f'{ch}-spec.json')
    _, beats_list = load_beats(project)
    beats = {b['id']: b for b in beats_list}
    chapter = chapters[ch]
    units = {u['id']: Unit(u, cues[u['id']], chapter['startFrame'], fps) for u in alignment['units']}

    subtitles = []
    for unit_id_str, entries in spec['subtitles'].items():
        unit_id = int(unit_id_str); unit = units[unit_id]
        phrases = [e[0] if isinstance(e, list) else e for e in entries]
        anchors = [e[1] if isinstance(e, list) else None for e in entries]
        if ''.join(phrases) != beats[unit_id]['text']:
            raise SystemExit(f'unit {unit_id}: phrases do not concatenate to the subtitle text (check spaces)')
        for phrase in phrases:
            if width_of(phrase) > MAX_WIDTH:
                raise SystemExit(f'unit {unit_id}: subtitle too wide ({width_of(phrase):.1f} > {MAX_WIDTH}): {phrase}')
        starts = [unit.local_start]; cursor = 0
        for phrase, anchor in zip(phrases[1:], anchors[1:]):
            frame, cursor = unit.onset_frame(anchor if anchor else norm(phrase)[:3], cursor)
            starts.append(frame)
        for i, phrase in enumerate(phrases):
            end = starts[i + 1] if i + 1 < len(phrases) else unit.local_end
            subtitles.append({'startFrame': starts[i], 'endFrame': end, 'text': phrase, 'beatId': unit_id})
    subtitles.sort(key=lambda s: s['startFrame'])
    missing = [b['id'] for b in beats_list if b['chapter'] == ch and b['id'] not in {s['beatId'] for s in subtitles}]
    if missing:
        raise SystemExit(f'subtitle groups missing for units {missing}')
    for a, b in zip(subtitles, subtitles[1:]):
        if a['endFrame'] != b['startFrame']:
            raise SystemExit(f'subtitle gap between {a} and {b}')
    if subtitles[0]['startFrame'] != 0 or subtitles[-1]['endFrame'] != chapter['endFrame'] - chapter['startFrame']:
        raise SystemExit('subtitles do not cover the whole chapter')

    events = {}
    for name, (unit_id_str, anchor, *rest) in spec['events'].items():
        unit = units[int(unit_id_str)]; offset = rest[0] if rest else 0
        frame = unit.local_start if anchor is None else unit.local_end if anchor == 'end' else unit.onset_frame(anchor)[0]
        events[name] = frame + offset

    out = {'method': f"{alignment['model']} forced alignment on current audio; subtitles switch at phrase onset; events at anchor onset plus offset",
           'chapterStartFrame': chapter['startFrame'], 'chapterEndFrame': chapter['endFrame'],
           'chapterFrames': chapter['endFrame'] - chapter['startFrame'],
           'audioSha256': {str(u['id']): u['audioSha256'] for u in alignment['units']},
           'subtitles': subtitles, 'events': events}
    write_json(project / 'assets/references' / f'{ch}-phrase-timing.json', out)
    print(json.dumps({'chapter': ch, 'subtitles': len(subtitles), 'events': len(events), 'frames': out['chapterFrames']}, ensure_ascii=False))


if __name__ == '__main__':
    main()
