"""
音画对齐工具 · 能量包络检测（B39 沉淀）

为什么需要它：
  逐格填入 / 单词弹入这类动画，必须让元素在"音频真正念到那个词"的时刻出现。
  用"分句单独合成测时长"会不准——每个分句带自己的句末停顿，整句连读时停顿不同，
  导致元素出现明显偏早/偏晚（用户会反复说"没同频"）。

正确做法：
  直接分析【真实 beat 音频】的波形，找出每个发声段的起点（词与词之间有静音间隔）。
  本脚本把 mp3 转 wav，按 100ms 块打印 RMS 能量，肉眼/程序映射到词。

用法：
  python align_words.py audio/beat_27.mp3
  然后看输出的时间块，把每个词的起点（秒）×30 转成帧，填进组件的 start 数组。

关键技巧（B39 验证有效）：
  - 阈值 thr≈0.10（归一化后），min_sil≈2-3 块（200-300ms）
  - 英文词可能被拆成多个音节段，要把相邻小段合并成一个词
  - 元素出现要【提前 4-6 帧 + 快弹簧 stiffness≥200】，念到词时已就位，
    不要等念到才从 0 弹起（那样词念完才出现）
  - 中文标题/前半句期间，容器/空骨架可以先占位，只让 label 跟词
"""
import wave, struct, subprocess, shutil, sys
from pathlib import Path


def find_bin(name: str) -> str:
    p = shutil.which(name)
    if p:
        return p
    cands = list(Path("./remotion/node_modules/@remotion").glob(f"compositor-*/{name}*"))
    if not cands:
        raise FileNotFoundError(f"找不到 {name}，请先 npm install")
    return str(cands[0])


def dump_energy(mp3: str, block_ms: int = 100):
    ffmpeg = find_bin("ffmpeg")
    wav = "_align.wav"
    subprocess.run(
        [ffmpeg, "-y", "-i", mp3, "-ar", "16000", "-ac", "1", wav],
        capture_output=True,
    )
    w = wave.open(wav, "rb")
    fr = w.getframerate()
    n = w.getnframes()
    raw = w.readframes(n)
    w.close()
    samples = struct.unpack("<%dh" % n, raw)

    blk = int(fr * block_ms / 1000)
    print("time  energy")
    for i in range(0, n - blk, blk):
        b = samples[i : i + blk]
        e = (sum(s * s for s in b) / len(b)) ** 0.5
        t = i / fr
        bar = "#" * int(e / 200)
        print(f"{t:4.1f}s {e:7.0f} {bar}")
    Path(wav).unlink()


def find_segments(mp3: str, thr: float = 0.10, min_sil_blocks: int = 2):
    """返回每个发声段的 (start_sec, end_sec)。"""
    ffmpeg = find_bin("ffmpeg")
    wav = "_align.wav"
    subprocess.run(
        [ffmpeg, "-y", "-i", mp3, "-ar", "16000", "-ac", "1", wav],
        capture_output=True,
    )
    w = wave.open(wav, "rb")
    fr = w.getframerate()
    n = w.getnframes()
    raw = w.readframes(n)
    w.close()
    samples = struct.unpack("<%dh" % n, raw)

    win = int(fr * 0.02)  # 20ms
    rms = []
    for i in range(0, n - win, win):
        b = samples[i : i + win]
        rms.append((sum(s * s for s in b) / len(b)) ** 0.5)
    mx = max(rms) or 1
    norm = [r / mx for r in rms]

    segs = []
    ins = False
    start = 0
    sil = 0
    for i, v in enumerate(norm):
        if v > thr:
            if not ins:
                ins, start, sil = True, i, 0
            else:
                sil = 0
        else:
            if ins:
                sil += 1
                if sil >= min_sil_blocks:
                    segs.append((start, i - sil))
                    ins = False
    if ins:
        segs.append((start, len(norm) - 1))

    for i, (s, e) in enumerate(segs):
        print(f"seg{i+1}: {s*win/fr:.3f}s = {round(s*win/fr*30)}f")
    Path(wav).unlink()
    return segs


if __name__ == "__main__":
    audio = sys.argv[1] if len(sys.argv) > 1 else "audio/beat_27.mp3"
    print("=== 能量包络（每 100ms）===")
    dump_energy(audio)
    print("\n=== 自动检测发声段 ===")
    find_segments(audio)
