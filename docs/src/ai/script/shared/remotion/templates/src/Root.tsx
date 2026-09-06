import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {Stage, Label} from '../../../shared/remotion/components';
import project from '../../project.json';
// Draft shell only. Replace after script approval and build/cues.ts generation.
const Draft:React.FC=()=> <Stage><div style={{padding:180}}><Label>{project.title}</Label><h1>等待口播稿与章节制作</h1></div></Stage>;
const Root:React.FC=()=> <Composition id="DraftPreview" component={Draft} durationInFrames={project.config.video.fps*3} {...project.config.video}/>;
registerRoot(Root);
