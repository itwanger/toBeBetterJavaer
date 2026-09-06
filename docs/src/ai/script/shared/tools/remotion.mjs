// Project-aware Remotion entry point. Rendering is invoked only after user authorization.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {parseArgs} from 'node:util';
import {spawnSync} from 'node:child_process';
import {createRequire} from 'node:module';
const workspace=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const require=createRequire(path.join(workspace,'package.json'));
const {values,positionals}=parseArgs({allowPositionals:true,options:{project:{type:'string'},port:{type:'string'},composition:{type:'string'},frame:{type:'string'},'dry-run':{type:'boolean',default:false}}});
const action=positionals[0];
if(!['studio','still','render','typecheck'].includes(action)||!values.project)throw new Error('Usage: remotion.mjs studio|still|render|typecheck --project <directory> [--dry-run]');
const project=path.resolve(values.project),meta=JSON.parse(fs.readFileSync(path.join(project,'project.json'),'utf8')),cwd=path.join(project,'remotion');
const cli=path.join(path.dirname(require.resolve('@remotion/cli/package.json')),'remotion-cli.js');
const chrome=process.env.REMOTION_BROWSER_EXECUTABLE||(['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'].find(p=>fs.existsSync(p)));
const browser=chrome?[`--browser-executable=${chrome}`]:[];
let args;
const raw=path.join(project,'preview/render/remotion-raw.mp4');
if(action==='typecheck')args=[require.resolve('typescript/bin/tsc'),'--noEmit','-p',path.join(cwd,'tsconfig.json')];
else if(action==='studio')args=[cli,'studio','src/Root.tsx',...(values.port?[`--port=${values.port}`]:[])];
else if(action==='still')args=[cli,'still','src/Root.tsx',values.composition||meta.compositionId,path.join(project,'preview/path-check.png'),`--frame=${values.frame||0}`,...browser];
else args=[cli,'render','src/Root.tsx',meta.compositionId,raw,'--codec=h264','--crf=18','--pixel-format=yuv420p','--audio-codec=aac','--audio-bitrate=192k',...browser];
if(values['dry-run']){console.log(JSON.stringify({cwd,action,args,finalOutput:action==='render'?path.join(project,'output',meta.outputName):undefined}));process.exit(0);}
fs.mkdirSync(path.join(project,'preview/render'),{recursive:true});
const run=(cmd,argv)=>{const r=spawnSync(cmd,argv,{cwd,stdio:'inherit'});if(r.error)throw r.error;if(r.status!==0)process.exit(r.status||1);};
if(action==='render'){
  const chapters=JSON.parse(fs.readFileSync(path.join(project,'build/chapters.json'),'utf8'));
  const duration=chapters.at(-1).endFrame/meta.config.video.fps;
  const output=path.join(project,'output',meta.outputName),temp=output.replace(/\.mp4$/,'.tmp.mp4');
  if(!output.endsWith('.mp4')||path.dirname(output)!==path.join(project,'output'))throw new Error('outputName must be a plain MP4 filename');
  fs.mkdirSync(path.dirname(output),{recursive:true});run(process.execPath,args);
  run('ffmpeg',['-y','-v','error','-i',raw,'-i',path.join(project,'build/voiceover.wav'),'-map','0:v:0','-map','1:a:0','-c:v','copy','-c:a','aac','-b:a','192k','-ar','48000','-af','apad','-t',String(duration),'-movflags','+faststart',temp]);
  fs.renameSync(temp,output);console.log(`Final MP4: ${output}`);
}else run(process.execPath,args);
