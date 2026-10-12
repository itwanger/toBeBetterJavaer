// Render several stills of one composition with a single bundle and browser, for chapter key-frame checks.
//   node shared/tools/render_frames.mjs --project <dir> --composition Chapter3Preview --out-dir <dir> b21:12 b22:350 ...
// Each positional is label:frame; files are written as <out-dir>/<label>-<frame>.png and the list is printed as JSON.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {parseArgs} from 'node:util';
import {createRequire} from 'node:module';
const workspace = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const require = createRequire(path.join(workspace, 'package.json'));
const {bundle} = require('@remotion/bundler');
const {openBrowser, renderStill, selectComposition} = require('@remotion/renderer');

const {values, positionals} = parseArgs({allowPositionals: true, options: {project: {type: 'string'}, composition: {type: 'string'}, 'out-dir': {type: 'string'}}});
if (!values.project || !values.composition || !values['out-dir'] || positionals.length === 0) {
  throw new Error('Usage: render_frames.mjs --project <dir> --composition <id> --out-dir <dir> label:frame ...');
}
const cwd = path.join(path.resolve(values.project), 'remotion');
const outDir = path.resolve(values['out-dir']);
fs.mkdirSync(outDir, {recursive: true});
const chrome = process.env.REMOTION_BROWSER_EXECUTABLE || ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'].find((p) => fs.existsSync(p));

const serveUrl = await bundle({entryPoint: path.join(cwd, 'src/Root.tsx'), rootDir: cwd, publicDir: path.join(cwd, 'public')});
const browser = await openBrowser('chrome', chrome ? {browserExecutable: chrome} : {});
const composition = await selectComposition({serveUrl, id: values.composition, puppeteerInstance: browser});
const written = [];
try {
  for (const spec of positionals) {
    const [label, frame] = [spec.slice(0, spec.lastIndexOf(':')), Number(spec.slice(spec.lastIndexOf(':') + 1))];
    const output = path.join(outDir, `${label}-${frame}.png`);
    await renderStill({serveUrl, composition, frame: Math.min(frame, composition.durationInFrames - 1), output, imageFormat: 'png', puppeteerInstance: browser});
    written.push(output);
  }
} finally {
  await browser.close({silent: true});
}
console.log(JSON.stringify({composition: values.composition, written}));
