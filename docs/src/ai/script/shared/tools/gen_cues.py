"""Build a sample-accurate timeline and voiceover from beats in playback order.
Decode each MP3 once; all cue boundaries and the WAV use these same PCM samples.
"""
import argparse
from project_paths import project_path, load_config, link_public, load_beats, read_json, request_hash, sha256, find_tool
import hashlib
import json
import math
from pathlib import Path
import shutil
import subprocess
import wave



def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--project", required=True, type=project_path)
    parser.add_argument("--dry-run", action="store_true")
    args=parser.parse_args();ROOT=args.project;cfg=load_config(ROOT)
    SAMPLE_RATE=cfg["tts"]["audio"]["sampleRate"];FPS=cfg["video"]["fps"]
    BUILD=ROOT/"build"
    ffmpeg = find_tool('ffmpeg')
    if not ffmpeg:
        raise RuntimeError('ffmpeg is required')
    metadata,beats=load_beats(ROOT)
    if not beats:raise ValueError('No confirmed audio units in beats.json')
    missing=[b['id'] for b in beats if not (ROOT/'audio/processed'/f"beat_{b['id']:02d}.mp3").exists()]
    if missing:raise ValueError(f'Missing processed audio: {missing}')
    generated=read_json(BUILD/'audio-generation.json')['units']
    for b in beats:
        record=generated.get(str(b['id']),{});processed=ROOT/'audio/processed'/f"beat_{b['id']:02d}.mp3"
        if record.get('requestHash')!=request_hash(b.get('ttsText') or b['text'],cfg['tts']) or record.get('atempo')!=cfg['tts']['atempo'] or record.get('processedSha256')!=sha256(processed):
            raise ValueError(f"Stale audio for unit {b['id']}; run gen_audio before rebuilding timing")
    if args.dry_run:
        print(json.dumps({'project':str(ROOT),'units':len(beats),'output':str(BUILD),'dryRun':True}));return
    cues, durations, pcm_parts, hashes = [], {}, [], {}
    samples = 0
    for beat in beats:
        path = ROOT / 'audio/processed' / f"beat_{beat['id']:02d}.mp3"
        pcm = subprocess.run([ffmpeg, '-v', 'error', '-i', str(path), '-f', 's16le',
                              '-ar', str(SAMPLE_RATE), '-ac', '1', 'pipe:1'],
                             capture_output=True, check=True).stdout
        count = len(pcm) // 2
        if count == 0:
            raise ValueError(f'Empty audio: {path}')
        start = round(samples * FPS / SAMPLE_RATE)
        end = round((samples + count) * FPS / SAMPLE_RATE)
        if beat is beats[-1]:
            end = math.ceil((samples + count) * FPS / SAMPLE_RATE)
        cues.append({'id': beat['id'], 'chapter': beat['chapter'], 'text': beat['text'],
                     'startSec': samples / SAMPLE_RATE, 'durationSec': count / SAMPLE_RATE,
                     'startFrame': start, 'durationFrames': end - start,
                     'startSample': samples, 'durationSamples': count})
        durations[str(beat['id'])] = count / SAMPLE_RATE
        hashes[str(beat['id'])] = {'audioSha256': hashlib.sha256(path.read_bytes()).hexdigest(),
                                  'textSha256': hashlib.sha256((beat.get('ttsText') or beat['text']).encode()).hexdigest()}
        samples += count
        pcm_parts.append(pcm)
    public = BUILD
    link_public(ROOT)
    public.mkdir(exist_ok=True, parents=True)
    with wave.open(str(public / 'voiceover.wav'), 'wb') as out:
        out.setnchannels(1)
        out.setsampwidth(2)
        out.setframerate(SAMPLE_RATE)
        for pcm in pcm_parts:
            out.writeframes(pcm)
    subprocess.run([ffmpeg, '-v', 'error', '-y', '-i', str(public / 'voiceover.wav'),
                    '-c:a', 'libmp3lame', '-b:a', '96k', str(public / 'voiceover.mp3')], check=True)
    chapters = []
    for chapter in metadata['chapters']:
        rows = [cue for cue in cues if cue['chapter'] == chapter['id']]
        chapters.append({'id': chapter['id'], 'title': chapter['title'], 'beatIds': [r['id'] for r in rows],
                         'startFrame': rows[0]['startFrame'],
                         'endFrame': rows[-1]['startFrame'] + rows[-1]['durationFrames'],
                         'startSec': rows[0]['startSec'],
                         'durationSec': sum(r['durationSec'] for r in rows)})
    def write(name, value):
        (BUILD / name).write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    write('cues.json', cues)
    write('chapters.json', chapters)
    write('durations.json', durations)
    previous=json.loads((BUILD/'timeline-manifest.json').read_text(encoding='utf-8')) if (BUILD/'timeline-manifest.json').exists() else {}
    write('timeline-manifest.json', {**previous, 'config':cfg, 'speakerId':cfg['tts']['speakerId'], 'atempo':cfg['tts']['atempo'], 'sampleRate': SAMPLE_RATE, 'totalSamples': samples,
          'durationSec': samples / SAMPLE_RATE, 'playbackOrder': [b['id'] for b in beats],
          'audioSource': 'build/voiceover.wav', 'inputs': hashes,
          'note': 'Hashes record current inputs, not proof of ASR or historical voice identity.'})
    (BUILD / 'cues.ts').write_text('// Generated by gen_cues.py\n'
        + f'export const FPS = {FPS};\n'
        + f'export const TOTAL_FRAMES = {chapters[-1]["endFrame"]};\n'
        + 'export const CUES = ' + json.dumps(cues, ensure_ascii=False) + ';\n'
        + 'export const CHAPTERS = ' + json.dumps(chapters, ensure_ascii=False) + ';\n', encoding='utf-8')
    metadata['pendingAudioBeatIds'] = []
    metadata['targetDurationSec'] = samples / SAMPLE_RATE
    metadata['targetDurationNote'] = f'{len(beats)} 段实际解码音频累计时长；时间轴与 voiceover.wav 使用同一份 PCM。'
    (ROOT/'beats.json').write_text(json.dumps(metadata,ensure_ascii=False,indent=2)+'\n', encoding='utf-8')
    print(f'{len(cues)} beats, {samples / SAMPLE_RATE:.3f}s, {chapters[-1]["endFrame"]} frames')
    for c in chapters:
        print(c['id'], f"{c['durationSec']:.3f}s", c['startFrame'], c['endFrame'])


if __name__ == '__main__':
    main()
