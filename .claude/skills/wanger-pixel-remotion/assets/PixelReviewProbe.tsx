import React,{useEffect,useMemo} from 'react';
import {continueRender,delayRender,getInputProps,useCurrentFrame} from 'remotion';

// Opt-in only while rendering review stills; no timers, logging or added pixels in production.
export function PixelReviewProbe(){
  const props=getInputProps() as {pixelReview?:boolean};
  return props.pixelReview?<Probe/>:null;
}
function Probe(){
  const frame=useCurrentFrame();
  const handle=useMemo(()=>delayRender('pixel geometry'),[frame]);
  useEffect(()=>{
    let cancelled=false;
    document.fonts.ready.then(()=>requestAnimationFrame(()=>{
      if(cancelled)return;
      const root=document.querySelector('[data-pixel-world]');
      if(!root){continueRender(handle);return;}
      const base=root.getBoundingClientRect(),sx=1920/base.width,sy=1080/base.height;
      const box=(r:DOMRect)=>({x:(r.x-base.x)*sx,y:(r.y-base.y)*sy,width:r.width*sx,height:r.height*sy});
      const nodes=Array.from(root.querySelectorAll('[data-pixel-role]')).flatMap((el,index)=>{
        let ancestor:Element|null=el;const clips=[];let visible=true;
        while(ancestor&&ancestor!==root){
          const style=getComputedStyle(ancestor);
          if(style.display==='none'||style.visibility==='hidden'||Number(style.opacity)<0.02) visible=false;
          if(ancestor!==el&&(style.overflowX==='hidden'||style.overflowY==='hidden'||ancestor.hasAttribute('data-pixel-clip')))
            clips.push(box(ancestor.getBoundingClientRect()));
          ancestor=ancestor.parentElement;
        }
        const rect=el.getBoundingClientRect();if(!visible||rect.width<0.5||rect.height<0.5)return [];
        const parentFrame=el.parentElement?.closest('[data-pixel-role="frame"]');
        const style=getComputedStyle(el);
        const matrix=el instanceof SVGGraphicsElement?el.getScreenCTM():null;
        const textScale=matrix?Math.hypot(matrix.c,matrix.d):
          (el instanceof HTMLElement&&el.offsetHeight?rect.height/el.offsetHeight:1);
        return [{id:el.getAttribute('data-pixel-id')??`node-${index}`,role:el.getAttribute('data-pixel-role'),
          required:el.getAttribute('data-pixel-required')==='true',allowOverlay:el.getAttribute('data-pixel-overlay')==='true',
          box:box(rect),clips,nestedFrame:!!parentFrame,text:el.textContent?.trim().slice(0,200),
          hearts:el.getAttribute('data-pixel-hearts'),fontSize:parseFloat(style.fontSize)*sy*textScale}];
      });
      console.log('PIXEL_REVIEW:'+JSON.stringify({frame,width:1920,height:1080,nodes}));
      continueRender(handle);
    }));
    return ()=>{cancelled=true;continueRender(handle);};
  },[frame,handle]);
  return null;
}
