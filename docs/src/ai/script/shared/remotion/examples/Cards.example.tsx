// 卡片与色调样张，可直接渲染，用来调参和核对各组件的色调是否一致。在 docs/src/ai/script 下运行：
//   node node_modules/@remotion/cli/remotion-cli.js still shared/remotion/examples/Cards.example.tsx CardsRank out.png --frame=100 \
//     --public-dir=shared/assets --browser-executable='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
import React from 'react';
import {AbsoluteFill, Composition, registerRoot, useCurrentFrame} from 'remotion';
import {C, FONT, MONO, ChapterStrip} from '../components';
import {Caret, Card, Kicker, NoteCard, RankTable, SegmentBar, Selected, SYNTAX, segmentsAt, typed} from '../components/Cards';
import {FocusNote} from '../components/FigureFocus';
import {HostCard} from '../components/Scenes';
import {QuizBoard} from '../components/Quest';

const CHAPTERS = ['现象与面试', '什么是前缀缓存', '分块与前缀树', '前缀污染', '总结建议'];

// 模拟 ChapterShell 的导航和字幕，样张不挂音频。
const Frame: React.FC<{active: number; subtitle: string; children: React.ReactNode}> = ({active, subtitle, children}) => (
  <AbsoluteFill style={{background: C.bg, fontFamily: FONT, color: C.ink}}>
    {children}
    <ChapterStrip brand={<>PREFIX <span style={{color: C.blue}}>CACHING</span></>} chapters={CHAPTERS} active={active} />
    <div style={{position: 'absolute', bottom: 58, left: 72, right: 72, display: 'flex', justifyContent: 'center'}}>
      <div style={{background: C.ink, color: 'white', padding: '15px 30px', borderRadius: 18, fontSize: 39, fontWeight: 600}}>{subtitle}</div>
    </div>
  </AbsoluteFill>
);

const code: React.CSSProperties = {fontFamily: MONO, fontSize: 32, lineHeight: 1.75, whiteSpace: 'pre'};

// 请求卡打字换模型，右侧输出卡跟着换标签。
const MODEL = 'anthropic/claude-sonnet-5-5';
export const CardsRequest: React.FC = () => {
  const f = useCurrentFrame();
  const value = typed(MODEL, f, 10);
  const done = value.length === MODEL.length;
  return (
    <Frame active={1} subtitle="换模型只改一个字段，请求的其他部分原样不动">
      <div style={{position: 'absolute', left: 130, top: 250, width: 960}}>
        <Card style={{padding: '40px 48px'}}>
          <div style={code}>
            <span style={{color: SYNTAX.method}}>POST</span> /v1/messages{'\n'}
            {'{\n  '}<span style={{color: SYNTAX.key}}>"model"</span>: <Selected>"{value}{(!done || f % 30 < 15) && <Caret />}"</Selected>,{'\n  '}
            <span style={{color: SYNTAX.key}}>"system"</span>: <span style={{color: SYNTAX.string}}>"你是一名 Java 面试官"</span>,{'\n  '}
            <span style={{color: SYNTAX.key}}>"stream"</span>: true{'\n}'}
          </div>
        </Card>
        <div style={{marginTop: 34, fontFamily: MONO, fontSize: 26, color: C.gray, opacity: done ? 1 : 0}}>
          → <span style={{color: C.blue}}>200 OK</span> · 同一个请求，只换了模型
        </div>
      </div>
      <Card style={{position: 'absolute', left: 1170, top: 250, width: 620, height: 452, padding: '40px 44px', opacity: done ? 1 : 0.35}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Kicker>回答 · 第 1 轮</Kicker>
          <Kicker color={C.blue} style={{textTransform: 'none', letterSpacing: 1}}>{done ? 'claude-sonnet-5-5' : '…'}</Kicker>
        </div>
        <div style={{fontSize: 34, fontWeight: 700, color: C.blue, marginTop: 34}}># 什么是前缀缓存</div>
        <div style={{fontSize: 29, lineHeight: 1.7, marginTop: 18}}>
          请求开头相同的部分，第二次不再重新计算，直接复用上一次留下的 KV Cache。
        </div>
      </Card>
    </Frame>
  );
};

// 两条分格进度条，第一次逐格填满，第二次缓存命中直接满格。
export const CardsCache: React.FC = () => {
  const f = useCurrentFrame();
  const row: React.CSSProperties = {fontFamily: MONO, fontSize: 30};
  const status: React.CSSProperties = {fontFamily: MONO, fontSize: 28, marginTop: 24, color: C.blue};
  return (
    <Frame active={1} subtitle="第二次请求开头一样，这一段直接从缓存里取">
      <Card style={{position: 'absolute', left: 150, top: 230, width: 1620, padding: '36px 48px'}}>
        <div style={row}><span style={{color: C.blue}}>POST</span> /v1/messages · 系统提示词 + 工具定义</div>
        <div style={{marginTop: 26}}><SegmentBar total={40} filled={segmentsAt(f, 6, 60, 40)} /></div>
        <div style={status}>预填充 · {segmentsAt(f, 6, 60, 40)} / 40 块 <span style={{color: C.gray}}>· 逐块计算 KV</span></div>
      </Card>
      <Card style={{position: 'absolute', left: 150, top: 520, width: 1620, padding: '36px 48px', opacity: f >= 70 ? 1 : 0}}>
        <div style={row}><span style={{color: C.blue}}>POST</span> /v1/messages · 系统提示词 + 工具定义 <span style={{color: C.gray}}>（第二次）</span></div>
        <div style={{marginTop: 26}}><SegmentBar total={40} filled={40} /></div>
        <div style={status}>缓存命中 ✓ <span style={{color: C.gray}}>· 相同前缀，</span><span style={{color: C.rust}}>不再重复计算</span></div>
      </Card>
    </Frame>
  );
};

// 排行表加便签结论卡。数据来自 OpenDocRouter 发布视频里的 ParseBench 截图，只用于样张。
const ROWS = [
  {name: 'Claude Opus 5.5', id: 'anthropic/claude-opus-5-5', tag: 'FRONTIER', value: 0.86, score: '84.20', extra: '$48.82'},
  {name: 'Gemini 3 Flash', id: 'google/gemini-3-flash', tag: 'FRONTIER', value: 0.74, score: '79.70', extra: '$19.67'},
  {name: 'GPT-5.6 Terra', id: 'openai/gpt-5.6-terra', tag: 'FRONTIER', value: 0.65, score: '75.88', extra: '$19.89'},
  {name: 'GPT-6 Luna', id: 'openai/gpt-6-luna', tag: 'FRONTIER', value: 0.53, score: '71.34', extra: '$0.80'},
  {name: 'MinerU2.5-Pro', id: 'opendatalab/mineru2.5-pro', tag: 'OPEN', tone: 'blue' as const, value: 0.50, score: '70.05', extra: '$0.86'},
  {name: 'PaddleOCR-VL-1.6', id: 'paddlepaddle/paddleocr-vl-1.6', tag: 'OPEN', tone: 'blue' as const, value: 0.39, score: '65.50', extra: '$2.11'},
  {name: 'dots.mocr', id: 'rednote-hilab/dots.mocr', tag: 'OPEN', tone: 'blue' as const, value: 0.30, score: '61.92', extra: '$3.97'},
];
export const CardsRank: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Frame active={2} subtitle="开源模型拿到八成多的分数，价格不到五十分之一">
      <div style={{position: 'absolute', left: 90, top: 190}}>
        <RankTable columns={['模型', '类型', '总分 · 50 → 90', '分数', '每千页']} rows={ROWS} frame={f} start={4} highlight={[0, 4]}
          highlightAt={50} />
      </div>
      <NoteCard frame={f} at={62} style={{position: 'absolute', left: 1330, top: 236, width: 500}}
        lines={['83% 的分数', <><i>1/57</i> 的价格</>]}
        detail={<>MinerU2.5-Pro：70.1 · $0.86<br />Claude Opus 5.5：84.2 · $48.82<br />每千页，ParseBench</>}
        footer="按质量挑，还是按价格挑" />
    </Frame>
  );
};

// 其他共享组件放在同一色调下核对：自介卡、聚焦说明卡、问答卡。
const dot = (color: string) => <div style={{width: 90, height: 90, borderRadius: '50%', border: `6px solid ${color}`}} />;
export const CardsOthers: React.FC = () => (
  <Frame active={4} subtitle="自介卡、说明卡和问答卡用同一套色调">
    <HostCard src="ergo-avatar.jpg" size={240} left={120} top={200} />
    <div style={{position: 'absolute', left: 120, top: 560, width: 420}}>
      <FocusNote title="第一块" opacity={1}>前缀相同才能命中</FocusNote>
      <FocusNote title="第二块" color={C.rust} opacity={1}>中间改一个字就失效</FocusNote>
    </div>
    <div style={{position: 'absolute', left: 560, top: 0, width: 1920, height: 1080, transform: 'scale(0.66)', transformOrigin: '0 30%'}}>
      <QuizBoard offset={100} answers={['B']} answerAt={60} options={[
        {key: 'A', label: '整段重新计算', icon: dot(C.gray), at: 0},
        {key: 'B', label: '复用前缀缓存', icon: dot(C.green), at: 4},
        {key: 'C', label: '换一个模型', icon: dot(C.rust), at: 8},
      ]} />
    </div>
  </Frame>
);

const VIDEO = {width: 1920, height: 1080, fps: 30};
const Root: React.FC = () => (
  <>
    <Composition id="CardsRequest" component={CardsRequest} durationInFrames={90} {...VIDEO} />
    <Composition id="CardsCache" component={CardsCache} durationInFrames={110} {...VIDEO} />
    <Composition id="CardsRank" component={CardsRank} durationInFrames={110} {...VIDEO} />
    <Composition id="CardsOthers" component={CardsOthers} durationInFrames={30} {...VIDEO} />
  </>
);
registerRoot(Root);
