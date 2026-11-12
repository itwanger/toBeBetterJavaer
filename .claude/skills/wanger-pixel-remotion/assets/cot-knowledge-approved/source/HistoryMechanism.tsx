import React,{createContext,useContext} from 'react';
import {Img,staticFile} from 'remotion';
import {TokenSymbol,ResultSymbol} from './PixelSymbols';
import {PixelMediaWindow} from './PixelImageWindow';
import {pixelColors as C} from './PixelWorld';
import {D} from './Chapter2Design';
import timing from '../../assets/references/ch5-phrase-timing.json';
const E=timing.events;
const {ink,paper,mint,gold,teal,orange}=C;
const W=820,R=1030,H=814;
const p=(f:number,a:number,d=24)=>Math.max(0,Math.min(1,(f-a)/d));
const s=(f:number,a:number,d=24)=>{const t=p(f,a,d);return t*t*(3-2*t)};
const mix=(a:number,b:number,t:number)=>a+(b-a)*t;
const Text=({x,y,children,size=50,color=ink,mono=false,anchor='start'}:{x:number;y:number;children:React.ReactNode;size?:number;color?:string;mono?:boolean;anchor?:'start'|'middle'|'end'})=><text x={x} y={y} fill={color} fontSize={size} fontWeight={680} fontFamily={mono?D.mono:D.font} textAnchor={anchor}>{children}</text>;
const geometry=(open=1)=>({open,extra:96*(1-open),right:R-96*(1-open)});
const ExchangeGeometry=createContext(geometry());
function Stage({children,space=1}:{children:React.ReactNode;space?:number}){return <ExchangeGeometry.Provider value={geometry(space)}><svg width={1858} height={834} viewBox="0 0 1858 834" style={{position:'absolute',left:24,top:94,overflow:'hidden',fontFamily:D.font}}>{children}</svg></ExchangeGeometry.Provider>}
function Plate({x=0,y=0,w,h,fill=paper,children}:{x?:number;y?:number;w:number;h:number;fill?:string;children?:React.ReactNode}){return <g transform={`translate(${x} ${y})`}><rect x={9} y={9} width={w} height={h} fill={ink}/><rect width={w} height={h} fill={fill} stroke={ink} strokeWidth={7}/>{children}</g>}
function Whale({x,y,size=100}:{x:number;y:number;size?:number}){return <image href={staticFile('images/dsh/pixel-whale-v1.png')} x={x} y={y} width={size} height={size} style={{imageRendering:'pixelated'}}/>}
function Lock({x=0,y=0,size=64,color=ink}:{x?:number;y?:number;size?:number;color?:string}){return <g transform={`translate(${x} ${y}) scale(${size/64})`} shapeRendering="crispEdges"><path d="M16 26V8h8V0h16v8h8v18H38V12H26v14Z" fill={color}/><path d="M8 24h48v40H8Z" fill={color}/><path d="M28 36h8v16h-8Z" fill={gold}/></g>}
function Doc({x,y,size=70,color=ink}:{x:number;y:number;size?:number;color?:string}){return <g transform={`translate(${x} ${y}) scale(${size/70})`}><path d="M8 3h37l17 17v47H8ZM45 3v18h17M20 34h28M20 47h21" fill="none" stroke={color} strokeWidth={6}/></g>}
function Tool({x,y,size=70,color=ink}:{x:number;y:number;size?:number;color?:string}){return <g transform={`translate(${x} ${y}) scale(${size/70})`}><path d="M0 0h70v60H0ZM10 15l15 15-15 15M35 45h22" stroke={color} strokeWidth={6} fill="none"/></g>}
function TokenLabel({x,y,color=mint,size=62}:{x:number;y:number;color?:string;size?:number}){return <g transform={`translate(${x} ${y})`}><TokenSymbol size={size} color={color}/><Text x={size+14} y={size*.74} size={44} mono>Token</Text></g>}
function Window({x=4,w=W,model=false,name='deepseek-flash',children}:{x?:number;w?:number;model?:boolean;name?:string;children?:React.ReactNode}){const g=useContext(ExchangeGeometry);if(w===W)w+=g.extra;return <Plate x={x} y={4} w={w-12} h={H-12} fill={model?gold:mint}><rect x={3} y={3} width={w-18} height={86} fill={model?gold:teal}/><path d={`M0 88H${w-12}`} stroke={ink} strokeWidth={6}/><Whale x={24} y={12} size={64}/><Text x={110} y={64} size={model?50:54} color={model?ink:paper} mono={model}>{model?name:'DSH'}</Text>{children}</Plate>}
function Signature({x,y,w=410,progress=1,bad=false}:{x:number;y:number;w?:number;progress?:number;bad?:boolean}){return <g transform={`translate(${x} ${y})`}><rect width={w} height={94} fill={orange} stroke={ink} strokeWidth={6}/>{progress<1?<g>{Array.from({length:Math.max(1,Math.ceil(progress*3))},(_,i)=><rect key={i} x={20+i*16} y={30-i*5} width={12} height={38+i*5} fill={ink}/>)}</g>:<Lock x={18} y={17} size={60}/>}<Text x={90} y={60} size={39} mono>signature</Text>{bad&&<ResultSymbol x={w-64} y={-20} size={66} correct={false}/>}</g>}
// Current rows fill the current sheet. The signature area exists only as the signature arrives.
function Thought({x=30,y=116,w=764,h=660,title='思考',rows=3,write=1,sig=1,sigParts=1,bad=false,discard=0}:{x?:number;y?:number;w?:number;h?:number;title?:string;rows?:number;write?:number;sig?:number;sigParts?:number;bad?:boolean;discard?:number}){
 const g=useContext(ExchangeGeometry);if(w===764)w+=g.extra;
 const kept=sig*(1-discard),bodyTop=110,bodyH=h-136-124*kept,n=Math.max(1,rows),rowH=bodyH/n;
 return <g transform={`translate(${x} ${y})`}><path d={`M0 0H${w-34}l34 34V${h}H0Z`} fill={paper} stroke={ink} strokeWidth={6}/><path d={`M${w-34} 0v34h34`} fill={mint} stroke={ink} strokeWidth={5}/><Doc x={22} y={21} size={53}/><Text x={92} y={66} size={48}>{title}</Text>{Array.from({length:rows},(_,i)=>{const cy=bodyTop+rowH*(i+.5);return <g key={i}><TokenSymbol x={28} y={cy-34} size={68} color={i%2?gold:mint}/>{rows===1&&<Text x={114} y={cy-24} size={44} mono>Token</Text>}<path d={`M114 ${cy+(rows===1?16:0)}h${Math.max(0,(w-150)*(i===rows-1?write:1))}`} stroke={i%2?teal:teal} strokeWidth={rows===1?38:30}/></g>})}{kept>0&&<g opacity={kept} transform={`translate(0 ${32*discard})`}><Signature x={w-436} y={h-114} progress={sigParts} bad={bad}/></g>}</g>;
}
function Archive({model='deepseek-flash',opacity=1}:{model?:string;opacity?:number}){const g=useContext(ExchangeGeometry);return <g transform="translate(30 116)" opacity={opacity}><rect width={764+g.extra} height={148} fill={gold} stroke={ink} strokeWidth={6}/><Doc x={24} y={26} size={72}/><Text x={120} y={60} size={46}>历史记录</Text><Text x={120} y={117} size={39} mono>{model}</Text><Lock x={658+g.extra} y={42} size={70}/></g>}
function Model({flash=true,compact=0,received=false,hideWhale=false,children}:{flash?:boolean;compact?:number;received?:boolean;hideWhale?:boolean;children?:React.ReactNode}){const g=useContext(ExchangeGeometry),z=mix(360,180,compact);return <Window x={g.right} model name={flash?'deepseek-flash':'deepseek-pro'}>{!hideWhale&&<Whale x={(W+g.extra-z)/2-6} y={mix(260,122,compact)} size={z}/>}{received&&<ResultSymbol x={650+g.extra} y={mix(630,300,compact)} size={90} correct/>}{children}</Window>}
function Flow({f,at,back=false,signed=false,y=425}:{f:number;at:number;back?:boolean;signed?:boolean;y?:number}){const g=useContext(ExchangeGeometry);if(f<at)return null;const a=back?g.right:W+g.extra-8,b=back?W+g.extra-8:g.right,q=p(f,at+12,28);return <g opacity={p(g.open,.15,.65)}><path d={`M${a} ${y}H${b}`} fill="none" stroke={teal} strokeWidth={14}/><path d={back?`M${b+24} ${y-23}l-24 23 24 23`:`M${b-24} ${y-23}l24 23-24 23`} fill="none" stroke={teal} strokeWidth={12}/>{f>=at&&q<1&&<g transform={`translate(${mix(a,b,q)-36} ${y-36})`}><TokenSymbol size={72}/>{signed&&<Lock x={44} y={46} size={42}/>}</g>}</g>}
export function HistoryOriginal({f}:{f:number}){const t=s(f,45,120),z=mix(.756,1.03,t),w=mix(1161,1582,t);return <PixelMediaWindow width={w} height={774} top={94}><Img src={staticFile('images/05-thinking-history.png')} style={{position:'absolute',width:1536*z,height:1024*z,maxWidth:'none',left:w/2-768*z,top:387-mix(512,530,t)*z}}/></PixelMediaWindow>}
function OptionIcon({type,color}:{type:number;color:string}){return <g transform="translate(-72 -72)" stroke={color} strokeWidth={9} fill="none">{type===0?<><path d="M18 48A56 56 0 0 1 120 38l9 15M128 20v35H94M126 98A56 56 0 0 1 24 108L15 93M16 126V91h34"/><path d="M56 46h34v52H56Z"/></>:type===1?<><path d="M6 42h124l-24-24M138 102H14l24 24"/><path d="M8 16v50M136 78v50"/></>:<><path d="M18 10h80v96H18ZM40 30h80v96H40ZM62 50h80v94H62M80 76h42M80 96h42M80 116h26"/></>}</g>}
export function HistoryOverview({f}:{f:number}){
 const a=s(f,E.switchOption,18),b=s(f,E.compactOption,18),count=1+a+b,gap=34,w=(1780-gap*(count-1))/count,left=(1858-(count*w+(count-1)*gap))/2;
 return <Stage>{['同模型继续','切换模型','压缩上下文'].map((name,i)=>{const at=[E.overview,E.switchOption,E.compactOption][i];if(i>0&&f<at)return null;const color=i===0?paper:ink;return <g key={name} opacity={i===0?1:s(f,at,14)}><Plate x={left+i*(w+gap)} y={72} w={w} h={662} fill={[teal,gold,orange][i]}><g transform={`translate(${w/2} 260)`}><OptionIcon type={i} color={color}/></g><Text x={w/2} y={445} anchor="middle" size={68} color={color}>{name}</Text></Plate></g>})}</Stage>;
}
function Filter({f}:{f:number}){return <Stage><Window w={1850}/>{['assistant','user','工具结果'].map((role,i)=>{const off=i===0?0:s(f,i===1?E.filter:E.filterTool,24),wide=608+724*off;return <Plate key={role} x={30} y={126+i*220} w={1788} h={190} fill={[teal,gold,orange][i]}><Doc x={24} y={60} size={64} color={i===0?paper:ink}/><Text x={110} y={112} size={45} color={i===0?paper:ink} mono={i<2}>{role}</Text><rect x={380} y={34} width={wide} height={122} fill={paper} stroke={ink} strokeWidth={5}/><Text x={410} y={109} size={46}>{i===2?'工具返回结果':'正文'}</Text>{off<1&&<g opacity={1-off} transform={`translate(${1022+100*off} 34)`}><rect width={280} height={122} fill={mint} stroke={ink} strokeWidth={5}/><Text x={30} y={79} size={46}>思考块</Text>{i>0&&off>0&&<path d="M12 12l255 96" stroke={orange} strokeWidth={9}/>}</g>}{i===0&&<Signature x={1330} y={48} w={430}/>}</Plate>})}</Stage>}
function Tools({f}:{f:number}){const g=useContext(ExchangeGeometry),half=367+g.extra/2,split=s(f,E.tools+38,20),first=mix(764+g.extra,half,split);return <g>{[0,1].map(i=>{if(f<E.tools+i*38)return null;const w=i?half*split:first,x=i?30+first+30:30;if(w<1)return null;return <svg key={i} x={x} y={602} width={w+12} height={186} overflow="hidden"><Plate w={w} h={174} fill={i?gold:teal}><Tool x={22} y={28} size={64} color={i?ink:paper}/><Text x={108} y={69} size={43} color={i?ink:paper}>工具调用</Text><Text x={108} y={133} size={41} color={i?ink:paper}>{f>=E.tools+i*38+24?'取得结果':'执行中'}</Text>{f>=E.tools+i*38+24&&<ResultSymbol x={w-72} y={102} size={52} correct/>}</Plate></svg>})}</g>}
function Cache({f}:{f:number}){const g=useContext(ExchangeGeometry);const at=E.prefix,q=s(f,at,24),n=1+s(f,at+30,18)+s(f,at+60,18),gw=(712+g.extra-22*(n-1))/n;return <g opacity={q}><g transform="translate(30 614)">{[mint,gold,orange].map((c,i)=>f<at+i*30?null:<g key={c} opacity={i?s(f,at+i*30,18):1}><TokenLabel x={Math.min(554+g.extra,(i+.5)*((764+g.extra)/n)-106)} y={30} color={c}/></g>)}</g><Flow f={f} at={at+30} y={680}/><g transform={`translate(${g.right+28} 420)`}><Plate w={760+g.extra} h={356} fill={mint}><g transform="translate(24 24)"><path d="M0 0h62v62H0ZM10 12h17v17H10ZM35 12h17v17H35ZM10 36h17v17H10ZM35 36h17v17H35Z" fill={teal} stroke={ink} strokeWidth={4}/><Text x={84} y={49} size={46}>KV Cache</Text></g>{[mint,gold,orange].map((c,i)=>{if(f<at+i*30)return null;const show=i?s(f,at+i*30,18):1,cw=gw*show;if(cw<36)return null;return <g key={c} opacity={show} transform={`translate(${24+i*(gw+22)} 122)`}><rect width={cw} height={204} fill={teal} stroke={ink} strokeWidth={6}/><rect x={14} y={28} width={Math.max(0,(cw-42)/2)} height={112} fill={c} stroke={ink} strokeWidth={4}/><rect x={cw/2+7} y={28} width={Math.max(0,(cw-42)/2)} height={112} fill={c} stroke={ink} strokeWidth={4}/>{f>=at+i*30+18&&<path d={`M14 174h${cw-28}`} stroke={gold} strokeWidth={12}/>}</g>})}</Plate></g></g>}
export function SameModel({f}:{f:number}){
 if(f>=E.filter&&f<E.benefits)return <Filter f={f}/>;
 const req=f>=E.nextRequest&&f<E.benefits,benefit=f>=E.benefits,cache=f>=E.prefix,tool=f>=E.tools;
 const copy=req?s(f,E.nextRequest,24):0,lower=benefit?s(f,E.tools,24):0;
 const rows=Math.min(3,Math.max(1,Math.floor((f-E.stream)/26)+1)),sig=s(f,E.signature,22);
 const space=benefit?(cache?s(f,E.prefix+30,24):0):req?Math.max(1-s(f,E.nextRequest,24),s(f,E.replay,24)):s(f,E.stream,24);
 return <Stage space={space}><Window/>{req&&<Archive opacity={copy}/>}<Thought y={116+174*copy} h={660-174*copy-192*lower} rows={rows} write={f<E.nextRequest?p(f,E.stream+(rows-1)*26,26):1} sig={sig} sigParts={s(f,E.signature,E.assembled-E.signature)} title={req?'本轮请求 · 思考':'assistant · 思考'}/><Model compact={cache?s(f,E.prefix,24):0} received={f>=E.replay+36&&!cache}/>{!benefit&&<Flow f={f} at={req?E.replay:E.stream} back={!req} signed={req}/ >}{tool&&!cache&&<Tools f={f}/ >}{cache&&<Cache f={f}/>}</Stage>;
}
function ModelStatus({f,discard}:{f:number;discard:number}){const g=useContext(ExchangeGeometry);const bad=f>=E.mismatch&&discard<1;return <Plate x={g.right+30} y={570} w={760+g.extra} h={206} fill={bad?orange:mint}>{discard>=1?<Doc x={28} y={62} size={76}/>:<Lock x={28} y={62} size={76}/>}<Text x={132} y={88} size={46}>{bad?'签名不匹配':discard>=1?'思考内容':'来源模型签名'}</Text><Text x={132} y={150} size={39} mono={discard<1}>{discard>=1?'保留':'deepseek-pro'}</Text>{f>=E.mismatch&&<ResultSymbol x={650+g.extra} y={72} size={80} correct={!bad}/>}</Plate>}
export function CrossModel({f}:{f:number}){const req=f>=E.prepare,copy=s(f,E.prepare,24),discard=s(f,E.strip,38),status=s(f,E.bind,24),space=s(f,E.sendText,24),g=geometry(space);return <Stage space={space}><Window/>{req&&<Archive model="deepseek-pro" opacity={copy}/>}<Thought y={116+174*copy} h={660-174*copy} title={req?'本轮请求 · 思考':'历史记录 · 思考'} discard={discard} bad={f>=E.mismatch&&discard<1}/><Model flash={f>=E.flash} compact={status*.72} received={false}/>{f>=E.bind&&<g opacity={status}><ModelStatus f={f} discard={discard}/></g>}{f>=E.compareSource&&f<E.strip&&<rect x={24} y={110} width={776+g.extra} height={160} fill="none" stroke={orange} strokeWidth={9}/ >}{f>=E.compareTarget&&f<E.strip&&<rect x={g.right+6} y={8} width={800+g.extra} height={80} fill="none" stroke={orange} strokeWidth={9}/ >}{f>=E.sendText&&<Flow f={f} at={E.sendText}/>}</Stage>}
function SummaryCard({x,y,w,h=460,tag=false,done=false}:{x:number;y:number;w:number;h?:number;tag?:boolean;done?:boolean}){const top=tag?168:116,row=(h-top-32)/3;return <Plate x={x} y={y} w={w} h={h} fill={gold}><Doc x={26} y={25} size={60}/><Text x={108} y={73} size={50}>{tag?'检查点':'摘要正文'}</Text>{done&&<ResultSymbol x={w-104} y={24} size={72} correct/>}{tag&&<Text x={30} y={132} size={36} mono>{'<compacted-summary>'}</Text>}{['任务目标','关键进展','待办事项'].map((name,i)=><g key={name} transform={`translate(28 ${top+i*row})`}><Text x={0} y={40} size={44}>{name}</Text><path d={`M228 24h${w-286}`} stroke={teal} strokeWidth={24}/></g>)}</Plate>}
export function CompactHistory({f}:{f:number}){const ready=f>=E.summary,moved=s(f,E.body,70),saved=s(f,E.checkpoint,40),discard=s(f,E.discard,35),reveal=s(f,E.summary,20);
 const space=Math.max(s(f,E.sendHistory,24)*(1-s(f,E.summary,24)),s(f,E.body,24)*(1-s(f,E.body+70,24))),g=geometry(space);
 const sx=mix(g.right+30,30,moved),sy=mix(322,126,moved),sw=764+g.extra+(1024-g.extra)*saved;
 return <Stage space={space}><Window w={W+1030*saved+g.extra*(1-saved)}/>{saved<1&&<g opacity={1-saved}><g opacity={1-moved}><Thought title="较早的任务历史" sig={0} rows={3}/></g><g opacity={1-moved}><Model compact={reveal} hideWhale={ready}/></g></g>}{f>=E.sendHistory&&!ready&&<Flow f={f} at={E.sendHistory}/ >}{ready&&discard<1&&<g opacity={1-discard}><Plate x={g.right+30} y={116-30*discard} w={764+g.extra} h={174} fill={mint}><Doc x={24} y={38} size={64}/><Text x={112} y={78} size={45}>摘要生成的思考</Text><path d="M112 124h610" stroke={teal} strokeWidth={24}/>{discard>0&&<path d="M18 18l720 134" stroke={orange} strokeWidth={10}/>}</Plate></g>}{ready&&<SummaryCard x={sx} y={sy} w={sw} h={mix(454,650,moved)} tag={f>=E.checkpoint} done={f>=E.free}/>}</Stage>}
export function CotRecap({f}:{f:number}){
 // A growing notebook, not sparse strokes stretched over an empty sheet.
 // Rows share both edges; only an arriving row receives layout space.
 const answer=s(f,E.answer-16,24),w=1840,h=814-202*answer;
 const arrivals=[E.recap,E.paper,E.steps],weights=arrivals.map((at,i)=>i===0?1:s(f,at,22));
 const count=weights.reduce((a,b)=>a+b,0),gap=18,body=h-146;
 const rowH=(body-gap*(count-1))/count;
 let used=0;
 return <Stage><g transform="translate(4 4)">
  <path d={`M0 0H${w-36}l36 36V${h}H0Z`} fill={paper} stroke={ink} strokeWidth={6}/>
  <path d={`M${w-36} 0v36h36`} fill={mint} stroke={ink} strokeWidth={5}/>
  <Doc x={28} y={23} size={62}/><Text x={112} y={72} size={54}>CoT · 推导步骤</Text>
  <path d={`M28 100H${w-28}`} stroke={teal} strokeWidth={6}/>
  {['拆解问题','分析条件','尝试思路'].map((label,i)=>{
   const weight=weights[i];if(weight<=0)return null;
   const y=122+used,rh=rowH*weight;used+=(rowH+gap)*weight;
   const cy=rh/2,write=p(f,arrivals[i]+8,i===0?65:48),tip=770+770*write;
   return <svg key={label} x={28} y={y} width={w-56} height={rh} overflow="hidden" opacity={weight}>
    <rect x={3} y={3} width={w-62} height={Math.max(0,rh-6)} fill={i===1?gold:mint} stroke={ink} strokeWidth={5}/>
    <TokenSymbol x={30} y={cy-54} size={108} color={i===1?gold:mint}/>
    <Text x={164} y={cy+22} size={62}>{label}</Text>
    <path d={`M504 24V${rh-24}`} stroke={teal} strokeWidth={6}/>
    <path d={`M548 ${cy-18}H${tip}`} stroke={teal} strokeWidth={30}/>
    <path d={`M548 ${cy+22}H${tip+60}`} stroke={ink} strokeWidth={7}/>
    <g transform={`translate(${tip+60} ${cy+18}) rotate(-38)`} shapeRendering="crispEdges">
     <path d="M-14-94h28V-20h-28Z" fill={gold} stroke={ink} strokeWidth={5}/>
     <path d="M-14-20 0 0 14-20Z" fill={paper} stroke={ink} strokeWidth={5}/>
     <rect x={-14} y={-110} width={28} height={18} fill={orange} stroke={ink} strokeWidth={4}/>
    </g>
   </svg>;
  })}
 </g>{answer>0&&<g opacity={answer}><Plate x={4} y={642+20*(1-answer)} w={1840} h={172} fill={gold}><ResultSymbol x={32} y={36} size={92} correct/><Text x={152} y={108} size={58}>最终答案</Text><path d="M490 86h1270" stroke={teal} strokeWidth={30}/></Plate></g>}</Stage>;
}
