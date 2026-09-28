"""Apply the shared pronunciation lexicon to a project's beats.json.

  python3 shared/tools/pronunciations.py --project <dir>            # report only
  python3 shared/tools/pronunciations.py --project <dir> --write    # write ttsText for unvoiced beats

Rules from shared/config/pronunciations.json rewrite ttsText (subtitle text stays unchanged) for
the project's speaker. Watch entries are only listed as beats that need listening.
Beats that already have generated raw audio are skipped unless --include-voiced is passed,
because changing ttsText invalidates their cache and triggers re-synthesis.
"""
import argparse, json, re
from project_paths import SHARED, project_path, load_config, load_beats, read_json, write_json

LEXICON = SHARED / 'config/pronunciations.json'


def entries_for(kind: str, speaker: str) -> list:
    entries = read_json(LEXICON)[kind]
    return [e for e in entries if e['speakers'] == '*' or speaker in e['speakers']]


def rewrite(text: str, rules: list) -> tuple:
    """Return rewritten text and the ids of rules that matched."""
    used = []
    for rule in rules:
        text, count = re.subn(rule['match'], rule['replace'], text)
        if count:
            used.append(rule['id'])
    return text, used


def report(project, speaker: str, beats: list) -> dict:
    """Plan ttsText changes and watch hits without writing anything."""
    rules, watch = entries_for('rules', speaker), entries_for('watch', speaker)
    status = {r['id']: r['status'] for r in rules}
    changes, hits = [], []
    for beat in beats:
        current = beat.get('ttsText') or beat['text']
        proposed, used = rewrite(current, rules)
        if proposed != current:
            voiced = (project / 'audio/raw' / f"beat_{beat['id']:02d}.mp3").exists()
            changes.append({'id': beat['id'], 'ttsText': proposed, 'rules': used, 'voiced': voiced,
                            'needsListening': [u for u in used if status[u] != 'confirmed']})
        spoken = proposed
        for entry in watch:
            if re.search(entry['match'], spoken):
                hits.append({'id': beat['id'], 'watch': entry['id'], 'note': entry['note']})
    return {'speaker': speaker, 'changes': changes, 'watch': hits}


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--project', required=True, type=project_path)
    ap.add_argument('--write', action='store_true')
    ap.add_argument('--include-voiced', action='store_true')
    args = ap.parse_args()
    project = args.project
    data, beats = load_beats(project)
    result = report(project, load_config(project)['tts']['speakerId'], beats)
    skipped = [c['id'] for c in result['changes'] if c['voiced'] and not args.include_voiced]
    if args.write:
        planned = {c['id']: c['ttsText'] for c in result['changes'] if c['id'] not in skipped}
        updated = [{**b, 'ttsText': planned[b['id']]} if b['id'] in planned else b for b in data['beats']]
        write_json(project / 'beats.json', {**data, 'beats': updated})
        result['written'] = sorted(planned)
    result['skippedVoiced'] = skipped
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
