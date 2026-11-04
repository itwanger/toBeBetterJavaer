import React,{useEffect,useLayoutEffect,useRef,useState} from 'react';
import {AbsoluteFill,Audio,staticFile,useCurrentFrame,delayRender,continueRender,cancelRender} from 'remotion';
import timing from '../../assets/references/ch1-phrase-timing.json';
import {C} from '../../../shared/remotion/components';
import {MO,DG,CAM} from './huashu/runtime';

const FONT='ArchimedesSans';
export const CHAPTER1_FRAMES=814;
const E=timing.events as Record<string,number>;
const clamp=(value:number)=>Math.max(0,Math.min(1,value));
const progress=(frame:number,start:number,end:number)=>clamp((frame-start)/Math.max(1,end-start));
const ease=(frame:number,start:number,end:number)=>MO.smooth(progress(frame,start,end));
const lerp=(from:number,to:number,amount:number)=>from+(to-from)*amount;
type Ctx=CanvasRenderingContext2D;
type Pt=[number,number];

DG.FONT.zh=FONT;

function line(c:Ctx,pts:Pt[],color=C.ink,width=5,draw=1){
  c.save();c.strokeStyle=color;c.lineWidth=width;c.lineCap='round';c.lineJoin='round';
  const cumulative=DG.cum(pts);DG.drawPartial(c,pts,cumulative,cumulative[cumulative.length-1]*clamp(draw));c.restore();
}
function polygon(c:Ctx,pts:Pt[],fill:string,stroke=C.ink,width=5){DG.shape(c,pts,{fill,stroke,lw:width});}
function text(c:Ctx,value:string,x:number,y:number,size=48,color=C.ink,align:CanvasTextAlign='center'){
  c.save();c.font=`500 ${size}px ${FONT}`;c.fillStyle=color;c.textAlign=align;c.textBaseline='middle';c.fillText(value,x,y);c.restore();
}
function fade(c:Ctx,alpha:number,draw:()=>void){if(alpha<=0)return;c.save();c.globalAlpha*=clamp(alpha);draw();c.restore();}
function arrow(c:Ctx,x:number,y:number,dx:number,dy:number,color=C.blue,width=9){
  const length=Math.hypot(dx,dy);if(length<2)return;const ux=dx/length,uy=dy/length;
  line(c,[[x,y],[x+dx,y+dy]],color,width);
  polygon(c,[[x+dx,y+dy],[x+dx-ux*25-uy*14,y+dy-uy*25+ux*14],[x+dx-ux*25+uy*14,y+dy-uy*25-ux*14]],color,color,2);
}
function dashedRect(c:Ctx,cx:number,cy:number,w:number,h:number,color=C.blue){
  c.save();c.setLineDash([15,13]);line(c,[...DG.rectPts(cx,cy,w,h),DG.rectPts(cx,cy,w,h)[0]],color,4);c.restore();
}
function mathSymbol(c:Ctx,letter:string,zh:string,x:number,y:number,size:number,p:number){
  DG.math(c,[{s:letter,it:true,col:C.blue},{s:zh,zh:true,col:C.blue,gap:0}],x,y,size,{p,col:C.blue});
}
function coreFormula(c:Ctx,x:number,y:number,p:number){
  DG.math(c,[
    {s:'F',it:true,col:C.blue},{s:'浮',zh:true,col:C.blue,gap:0},
    {s:'=',col:C.ink,gap:24},
    {s:'G',it:true,col:C.blue},{s:'排',zh:true,col:C.blue,gap:0},
  ],x,y,84,{p,col:C.ink});
}

function drawScale(c:Ctx,frame:number,blockY:number){
  const centerX=1180;
  line(c,[[centerX,258],[centerX,blockY-75]],C.ink,5);
  c.save();c.beginPath();c.roundRect(centerX-100,132,200,132,20);c.fillStyle=C.card;c.fill();c.strokeStyle=C.ink;c.lineWidth=5;c.stroke();c.restore();
  text(c,'测力计',centerX,157,36,C.gray);
  text(c,'示数',centerX-48,207,36,C.gray);
  const reading=lerp(78,32,ease(frame,E.scaleDrop,E.scaleDrop+28));
  line(c,[[centerX+5,207],[centerX+5+reading,207]],C.rust,12);
  for(let index=0;index<4;index++)line(c,[[centerX+6+index*25,229],[centerX+6+index*25,238]],C.gray,3);
}

function drawTank(c:Ctx){
  c.save();c.globalAlpha=.72;c.fillStyle=C.select;c.fillRect(900,520,560,268);c.restore();
  line(c,[[900,520],[900,800],[1460,800],[1460,520]],C.ink,6);
  line(c,[[900,520],[1460,520]],C.blue,5);
  for(let index=0;index<5;index++){
    const x=940+index*110;line(c,[[x,546],[x+52,546]],C.blue,3);
  }
  text(c,'水',1510,555,48,C.blue,'left');
}

function drawBlock(c:Ctx,frame:number,blockY:number){
  drawScale(c,frame,blockY);
  polygon(c,DG.rectPts(1180,blockY,180,150),C.rust,C.ink,5);
  text(c,'金属块',1180,blockY,44,C.card);
  arrow(c,1325,blockY-40,0,180,C.ink,8);
  text(c,'重力',1375,blockY+72,42,C.ink,'left');
  const buoyancy=ease(frame,E.upLift,E.upLift+20);
  if(buoyancy>0){
    c.save();c.globalAlpha=buoyancy;
    arrow(c,1065,blockY+70,0,-190,C.blue,10);
    if(frame<E.fSymbol)text(c,'浮力',965,blockY-150,48,C.blue);
    c.restore();
  }
  if(frame>=E.fSymbol)mathSymbol(c,'F','浮',965,blockY-150,60,ease(frame,E.fSymbol,E.fSymbol+20));
}

function drawDisplacedWater(c:Ctx,frame:number,blockY:number){
  fade(c,ease(frame,E.displacedWeight,E.displacedWeight+18),()=>{
    dashedRect(c,480,620,240,210,C.faint);
    text(c,'排开的水',480,775,48,C.gray);
  });
  if(frame<E.immersedPart)return;
  const appear=ease(frame,E.immersedPart,E.immersedPart+22);
  const move=ease(frame,587,645);
  const source=DG.rectPts(1180,blockY,180,150) as Pt[];
  const target=DG.rectPts(480,620,240,210) as Pt[];
  const points=DG.morph(source,target,move) as Pt[];
  c.save();c.globalAlpha=appear*(.38+.5*move);polygon(c,points,C.blue,C.blue,5);c.restore();
  if(frame<E.vacated)text(c,'浸入部分',1455,blockY-100,42,C.blue,'right');
  fade(c,ease(frame,E.vacated,E.vacated+18),()=>text(c,'排开的水',480,775,48,C.blue));
  if(frame>=E.gSymbol)mathSymbol(c,'G','排',480,475,60,ease(frame,E.gSymbol,E.gSymbol+20));
}

function drawWorld(c:Ctx,frame:number){
  const blockY=lerp(400,620,ease(frame,E.enterWater,E.enterWater+52));
  drawTank(c);
  drawBlock(c,frame,blockY);
  drawDisplacedWater(c,frame,blockY);
  if(frame>=E.formula)coreFormula(c,480,320,ease(frame,E.formula,E.formula+24));
}

function draw(c:Ctx,frame:number){
  c.fillStyle=C.bg;c.fillRect(0,0,1920,1080);
  c.save();c.beginPath();c.rect(0,118,1920,772);c.clip();
  const camera=CAM.track({x:960,y:540,z:1},[
    {at:E.formula/30,kind:'push',k:.05,dur:.5},
    {at:E.formula/30+.65,kind:'pull',z:1,dur:.4},
  ],frame/30);
  CAM.with(c,camera,()=>drawWorld(c,frame));
  c.restore();
  text(c,'阿基米德原理',84,68,36,C.ink,'left');
  line(c,[[84,110],[1836,110]],C.line,2);
  line(c,[[84,110],[84+1752*frame/CHAPTER1_FRAMES,110]],C.rust,4);
}

export const ArchimedesChapter1:React.FC<{reviewOffset?:number}>=({reviewOffset=0})=>{
  const live=useCurrentFrame();
  const [review,setReview]=useState<number|null>(null);
  const frame=(review??live)+reviewOffset;
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const [handle]=useState(()=>delayRender('Archimedes fonts'));
  const [loaded,setLoaded]=useState(false);
  const released=useRef(false);
  useEffect(()=>{
    let alive=true;
    const faces=[
      new FontFace(FONT,`url(${staticFile('huashu-fonts/NotoSansSC-500.woff')})`),
      new FontFace('CMU-rm',`url(${staticFile('huashu-fonts/cmunrm.woff')})`),
      new FontFace('CMU-it',`url(${staticFile('huashu-fonts/cmunti.woff')})`),
    ];
    Promise.all(faces.map(face=>face.load())).then(loadedFaces=>{
      loadedFaces.forEach(face=>document.fonts.add(face));if(alive)setLoaded(true);
    }).catch(cancelRender);
    return()=>{alive=false;};
  },[]);
  useEffect(()=>{
    (window as any).__archimedesReview={seek:(value:number|null)=>setReview(value),events:E,total:CHAPTER1_FRAMES,version:'chapter1-v1'};
    return()=>{delete (window as any).__archimedesReview;};
  },[]);
  useLayoutEffect(()=>{
    if(!loaded||!canvasRef.current)return;
    const context=canvasRef.current.getContext('2d');
    if(!context)return;
    draw(context,frame);
    if(!released.current){released.current=true;continueRender(handle);}
  },[frame,loaded,handle]);
  const subtitle=timing.subtitles.find(row=>frame>=row.startFrame&&frame<row.endFrame)?.text??'';
  return <AbsoluteFill style={{background:C.bg,fontFamily:FONT}}>
    <Audio startFrom={reviewOffset} src={staticFile('audio/voiceover.wav')+'?v=c8eafbff69e2817c'}/>
    <canvas data-archimedes-canvas ref={canvasRef} width={1920} height={1080} style={{width:'100%',height:'100%'}}/>
    {loaded&&<div style={{position:'absolute',left:84,right:84,top:942,height:90,display:'flex',alignItems:'center',justifyContent:'center',fontSize:48,fontWeight:500}}>
      <div data-subtitle style={{background:C.ink,color:C.card,padding:'13px 25px',borderRadius:12,whiteSpace:'nowrap',lineHeight:1.4}}>{subtitle}</div>
    </div>}
  </AbsoluteFill>;
};
