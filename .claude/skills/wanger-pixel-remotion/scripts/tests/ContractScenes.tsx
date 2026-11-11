// Executable reproductions of old defects. These are diagnostic fixtures, not replacement episode shots.
import React from 'react';
import {Audio,Composition,registerRoot,useCurrentFrame,Img,staticFile} from 'remotion';
import {PixelWorld,pixelColors as C} from './PixelWorld';
import {PixelMediaWindow} from './PixelImageWindow';
import {PixelSubject,stageArea,revealSlots,pixelMark} from './PixelLayout';
import {actionAt,heartsAt} from './PixelAction';
import {RetryBridge,BridgePickup} from './RetryBridge';
import events from '../../build/pixel-events.json';
import {ModelSpecReveal} from './ModelSpecReveal';
import {WorkspaceOverview} from './WorkspaceOverview';
import {NativeDetailLens} from './NativeDetailLens';

const Box=({x,y,width,height,label,color=C.mint,id,required=true}:any)=><g {...pixelMark(id,'subject',{required})}>
  <rect x={x+4} y={y+4} width={width-8} height={height-8} fill={color} stroke={C.ink} strokeWidth={6}/>
  {width>300&&<text x={x+width/2} y={y+height/2+20} textAnchor="middle" fontSize={60} fill={C.ink}>{label}</text>}
</g>;
function Reflow({broken=false}:{broken?:boolean}){
  const f=useCurrentFrame(),area=stageArea();
  const columns=revealSlots(f,[{id:'main',at:-18,weight:3},{id:'abilities',at:120,weight:1}],area,'column',24);
  const main=columns.find(s=>s.id==='main')!;
  const rows=revealSlots(f,[{id:'models',at:-18},{id:'specs',at:60,duration:24}],main,'row',24);
  return <PixelWorld mode="diagram" topic={{title:'模型发布',term:'Claude 5.2'}} coins={0} caption="主体先充分呈现，再为新的信息让位。">
    {broken?<Box id="models" x={70} y={300} width={900} height={350} label="Fable 5.2"/>:<>
      {rows.map(s=><Box key={s.id} {...s} label={s.id==='models'?'Fable 5.2':'1M · 128K'} required={s.progress===1}/>)}
      {columns.filter(s=>s.id==='abilities').map(s=><Box key={s.id} {...s} color={C.gold} label="软件工程 · 硬件设计 · 前沿科研" required={s.progress===1}/>)}
    </>}
  </PixelWorld>;
}
function Input({broken=false}:{broken?:boolean}){
  const f=useCurrentFrame();
  const input=<g {...pixelMark('whole-input','control',{required:true})}>
    <rect width={1440} height={650} fill="#161618"/>
    <image href={staticFile('images/harness-chat.webp')} width={1440} height={650}/>
  </g>;
  return <PixelWorld mode="diagram" topic={{title:'自媒体工作台',term:'DeepSeek Harness'}} coins={0} caption="输入框两侧和工具栏都要完整保留。">
    {broken?<g transform="translate(145 120) scale(1.8)">{input}</g>:
      <PixelSubject id="workspace" bounds={{x:0,y:0,width:1440,height:650}} area={stageArea()}>{input}</PixelSubject>}
  </PixelWorld>;
}
function Frame({broken=false}:{broken?:boolean}){
  const content=<div {...pixelMark('terminal','subject',{required:true})} style={{height:610,background:C.paper,padding:36,boxSizing:'border-box',fontSize:64,color:C.ink}}>
    <p>❯ Fable 5.2 真这么强吗？</p><p style={{color:C.teal}}>Fable 5.2</p>
  </div>;
  return <PixelWorld mode="diagram" topic={{title:'思考与调度',term:'Claude 5.2'}} coins={2} caption="一个轻量 Mac 窗口。" foreground={
    <PixelMediaWindow width={1850} height={770} top={112}>
      {broken?<PixelMediaWindow width={1450} height={620} left={45} top={65}>{content}</PixelMediaWindow>:content}
    </PixelMediaWindow>
  }>{null}</PixelWorld>;
}
function Bridge(){
  const f=useCurrentFrame();const actions=events.chapters.ch3;
  const timing={start:147,jump:221,splash:actionAt(actions,'splash'),retry:278,press:354,
    hit:actionAt(actions,'hit'),collect:actionAt(actions,'collect'),end:501};
  return <PixelWorld mode="platform" topic={{title:'能力改进',term:'Claude 5.2'}} coins={2}
    hearts={heartsAt(f,actions)} captionStyle="band" caption="失败后换条路，解决问题再补回一颗心。"
    foreground={<><Audio src={staticFile('audio/voiceover-with-effects.wav')}/><div {...pixelMark('course','subject')}><RetryBridge frame={f} timing={timing}/></div><BridgePickup frame={f} timing={timing}/></>}>
    {null}
  </PixelWorld>;
}
function ApprovedModel(){
  const f=useCurrentFrame();
  return <PixelWorld mode="diagram" topic={{title:'模型发布',term:'Claude 5.2'}} coins={0}
    caption="主要面向高难度的软件工程、硬件设计、前沿科研，" foreground={<ModelSpecReveal frame={f}
      models={['Fable 5.2','Mythos 5.2']} specs={[{value:'1M',label:'上下文容量'},{value:'128K',label:'最大输出'}]}
      events={{firstModel:70,secondModel:111,base:140,firstSpec:223,secondSpec:255}}
      abilities={[{at:333,label:'软件工程',mark:'code',color:C.mint},{at:357,label:'硬件设计',mark:'chip',color:C.gold},{at:381,label:'前沿科研',mark:'orbit',color:C.orange}]}
    />}>{null}</PixelWorld>;
}
function ApprovedHarness(){
  const screen={file:'images/harness-chat.webp',sourceWidth:1440,sourceHeight:650};
  return <PixelWorld mode="diagram" topic={{title:'自媒体工作台',term:'DeepSeek Harness'}} coins={1}
    caption="需要在对话框里一轮一轮地发提示词；" foreground={<WorkspaceOverview {...screen}>
      <NativeDetailLens {...screen} rect={[453,277,805,165]} progress={1} zoom={1.63} center={[764,416]} backdropOpacity={.26}/>
    </WorkspaceOverview>}>{null}</PixelWorld>;
}
function Root(){return <>{[
  ['Reflow',()=> <Reflow/>,180],['ReservedSpace',()=> <Reflow broken/>,180],
  ['ClippedInput',()=> <Input broken/>,60],['WholeInput',()=> <Input/>,60],
  ['DoubleFrame',()=> <Frame broken/>,60],['SingleFrame',()=> <Frame/>,60],['Bridge',Bridge,501],['ApprovedModel',ApprovedModel,500],['ApprovedHarness',ApprovedHarness,240],
].map(([id,component,duration])=><Composition key={id as string} id={id as string} component={component as React.FC}
  durationInFrames={duration as number} width={1920} height={1080} fps={30}/>)}</>}
registerRoot(Root);
