"""Compare preserved historical evidence with approved shots. Manual observations are explicitly labelled."""
import argparse,hashlib,html,json,shutil
from pathlib import Path


def main():
    ap=argparse.ArgumentParser();ap.add_argument('--out',type=Path,required=True);a=ap.parse_args()
    bank=Path(__file__).resolve().parents[1]/'references/code-contract-evidence'
    manifest=json.loads((bank/'manifest.json').read_text());a.out.mkdir(parents=True,exist_ok=True)
    cards=[]
    for row in manifest:
        source=bank/row['file'];assert hashlib.sha256(source.read_bytes()).hexdigest()==row['sha256'],source
        shutil.copy2(source,a.out/row['file'])
        cards.append(f"<article><h2>{html.escape(row['title'])}</h2><img src='{row['file']}'><p>{html.escape(row['observation'])}</p><small>历史原帧 · 人工观察 · SHA-256 已核验</small></article>")
    (a.out/'index.html').write_text("<!doctype html><html lang='zh'><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'><title>两期历史镜头对照</title><style>body{font:16px -apple-system,sans-serif;background:#fff2d4;color:#25263b;margin:16px}.grid{display:flex;flex-wrap:wrap;gap:20px}article{width:390px;max-width:100%}img{width:100%}h2{font-size:18px}p{line-height:1.6}</style><h1>原始问题与定稿对照</h1><p>保留原图，没有重画。以下是历史证据人工复核；自动检查结果见独立的 live DOM 审片页。</p><div class='grid'>"+''.join(cards)+'</div></html>')
    print(f'PASS {len(manifest)} preserved images; {a.out/"index.html"}')


if __name__=='__main__':main()
