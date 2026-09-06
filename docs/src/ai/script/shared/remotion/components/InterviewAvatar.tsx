import React from 'react';
import {Img} from 'remotion';

export interface InterviewAvatarProps {
  src: string;
  name: string;
  role: string;
  active?: boolean;
  accent?: string;
  halo?: string;
}

/** Avatar only. The owning scene supplies placement, timing and project media. */
export const InterviewAvatar: React.FC<InterviewAvatarProps> = ({
  src, name, role, active = false, accent = '#3665e8', halo = '#eaf0ff',
}) => <div style={{width:300,textAlign:'center'}}>
  <div style={{width:282,height:282,borderRadius:'50%',padding:8,
    border:`3px solid ${active?accent:'#d5dde9'}`,background:'white',
    boxShadow:active?`0 0 0 10px ${halo}, 0 18px 45px #233c6014`:'0 14px 34px #233c6010',
    transform:`scale(${active?1.025:1})`}}>
    <Img src={src} style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'50%'}}/>
  </div>
  <div style={{fontSize:28,fontWeight:750,marginTop:25}}>{name}</div>
  <div style={{fontSize:20,color:'#7c8796',marginTop:7}}>{role}</div>
</div>;
