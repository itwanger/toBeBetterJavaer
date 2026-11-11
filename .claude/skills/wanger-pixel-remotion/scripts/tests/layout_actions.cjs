// Run with: node layout_actions.cjs <TypeScript module dir> <installed asset dir>
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const ts=require(path.join(process.argv[2],'typescript'));
const dir=process.argv[3];
function load(name){
  const source=fs.readFileSync(path.join(dir,name+'.tsx'),'utf8');
  const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React}}).outputText;
  const mod={exports:{}};new Function('require','module','exports',js)(name=>require(path.join(process.argv[2],name)),mod,mod.exports);return mod.exports;
}
const {revealSlots,containBox,stageArea}=load('PixelLayout');
const {heartsAt,actionAt}=load('PixelAction');
const area=stageArea();const items=[{id:'old',at:-18},{id:'new',at:60,duration:24}];
assert.deepEqual(revealSlots(59,items,area).map(x=>[x.id,x.x,x.width]),[['old',24,1872]]);
assert.equal(revealSlots(60,items,area).length,1);
let width=1872;
for(let f=61;f<=84;f++){
  const slots=revealSlots(f,items,area);assert.equal(slots.length,2);
  assert(slots[0].width<width);width=slots[0].width;
  assert(slots[0].x+slots[0].width<=slots[1].x);
  assert(Math.abs(slots[1].x+slots[1].width-(area.x+area.width))<.0001);
}
assert.equal(revealSlots(84,items,area)[0].width,924);
const vertical=revealSlots(59,items,area,'column');assert.equal(vertical[0].height,824);
assert.deepEqual(revealSlots(84,items,vertical[0]).map(s=>s.id),['old','new']);
assert.throws(()=>revealSlots(61,[items[0],items[0]],area));
const fit=containBox({x:-4,y:-4,width:2008,height:708},area);
assert(fit.x-4*fit.scale>=area.x-.001);
assert(fit.x+2004*fit.scale<=area.x+area.width+.001);
assert.throws(()=>containBox({x:0,y:0,width:0,height:50},area));
const events=[{id:'splash',frame:255,kind:'fall',heartDelta:-1},{id:'collect',frame:472,kind:'heart-collect',heartDelta:1}];
assert.deepEqual([254,255,471,472].map(f=>heartsAt(f,events)),[3,2,2,3]);
assert.equal(actionAt(events,'splash'),255);assert.throws(()=>actionAt(events,'missing'));
console.log('PASS: future slots, continuous reflow, alignment, vertical fill, full-object fit, contact-frame hearts');
