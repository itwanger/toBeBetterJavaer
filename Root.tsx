import React from 'react';
import {Composition, registerRoot} from 'remotion';
import project from '../../project.json';
import {ArchimedesChapter1,CHAPTER1_FRAMES} from './Chapter1';

const Root:React.FC=()=> <Composition
  id="Chapter1Preview"
  component={ArchimedesChapter1}
  durationInFrames={CHAPTER1_FRAMES}
  defaultProps={{reviewOffset:0}}
  {...project.config.video}
/>;

registerRoot(Root);
