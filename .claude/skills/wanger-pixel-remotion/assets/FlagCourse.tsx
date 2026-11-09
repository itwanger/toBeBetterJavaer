import React from 'react';
import { Img, staticFile } from 'remotion';
import { LikeFollowTiles } from './LikeFollowTiles';
import { grid, pixelColors as C } from './PixelWorld';

export type FlagFrames = {
  percent?: number;
  run: number;
  jump: number;
  seat: number;
  descend: number;
  bottom: number;
  land: number;
  go: number;
  end: number;
  response?: { like: number; follow: number; greet: number };
};
type RunnerProps = { f: number; frames: FlagFrames };
const POLE = 1090;
const POLE_TOP = 318;
const FLOOR = 856;
const FLAG_WIDTH = 202;
const SEAT_X = POLE + 10 + 132;
// A higher flag and higher arc mark each successive checkpoint on the same runway.
const checkpoints = [
  { percent: 0, top: 714, arc: 90 },
  { percent: 30, top: 626, arc: 160 },
  { percent: 50, top: 558, arc: 195 },
  { percent: 70, top: 490, arc: 230 },
  { percent: 90, top: 422, arc: 265 },
  { percent: 99, top: 354, arc: 300 },
  { percent: 100, top: 348, arc: 304 },
];

function jumpFor(percent?: number) {
  // Older projects passed percent only to the flag label and used a fixed jump.
  if (percent === undefined) return { top: 506, arc: 135 };
  if (!Number.isFinite(percent)) throw new Error('Flag progress must be a finite percentage');
  const p = Math.max(0, Math.min(100, percent));
  const next = checkpoints.findIndex((k) => k.percent >= p);
  if (next === 0) return checkpoints[0];
  const a = checkpoints[next - 1],
    b = checkpoints[next];
  const t = (p - a.percent) / (b.percent - a.percent);
  return { top: lerp(a.top, b.top, t), arc: lerp(a.arc, b.arc, t) };
}

const LOW = 738;
const HIP_Y = 163; // Underside of the seated thigh in the trimmed 106×204 sprite.
const TOE_DROP = 204 - HIP_Y;

const progress = (f: number, a: number, b: number) => Math.max(0, Math.min(1, (f - a) / (b - a)));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function banner(f: number, E: FlagFrames) {
  const t = progress(f, E.descend, E.bottom);
  const drop = lerp(jumpFor(E.percent).top, LOW, t * t * (3 - 2 * t));
  const load = progress(f, E.seat, E.seat + 3) * (1 - progress(f, E.bottom, E.land));
  const give = grid(load * (8 + 6 * Math.sin(Math.PI * progress(f, E.seat, E.seat + 9))));
  return { edge: grid(drop), give, seatY: grid(drop) + give };
}

// Collision and artwork share these tread edges. The summit has room for both feet.
const stair = {left:408, width:92, rise:48, count:4, lip:828};
const summit = FLOOR - stair.count * stair.rise;
const lastX = stair.left + (stair.count - .5) * stair.width;

function Staircase() {
  return <g shapeRendering="crispEdges">
    {Array.from({length:stair.count},(_,i)=>{
      const x=stair.left+i*stair.width, top=FLOOR-(i+1)*stair.rise;
      const width=i===stair.count-1 ? stair.lip+26-x : stair.width;
      return <g key={i}>
        <rect x={x} y={top} width={width} height={FLOOR-top} fill="#b86341" stroke={C.ink} strokeWidth={6}/>
        <path d={`M${x+3} ${top+5}h${width-6}`} stroke="#f9be78" strokeWidth={8}/>
        {Array.from({length:i},(_,j)=><path key={j} d={`M${x+3} ${top+48*(j+1)}h${width-6}m${-(j%2?32:56)} 0v40`}
          fill="none" stroke="#844331" strokeWidth={4}/>)}
      </g>;
    })}
  </g>;
}

function body(f: number, E: FlagFrames) {
  if (f < E.jump) {
    const u=progress(f,E.run,E.jump);
    const walk={sheet:'walk',pose:Math.floor((f-E.run)/3)%8};
    if (u<.20) return {...walk,x:lerp(142,stair.left-52,u/.20),foot:FLOOR};
    if (u<.84) {
      const steps=Math.min(3.99999,(u-.20)/.64*stair.count);
      const i=Math.floor(steps), phase=steps-i, lift=Math.min(1,phase/.72);
      const x0=i===0?stair.left-52:stair.left+(i-.5)*stair.width;
      const x1=stair.left+(i+.5)*stair.width;
      const y0=FLOOR-i*stair.rise;
      // Rise before crossing the riser, settle on each tread, then push off again.
      const foot=lerp(y0,y0-stair.rise,lift)-34*Math.sin(Math.PI*lift);
      return {...walk,x:lerp(x0,x1,lift),foot};
    }
    return {...walk,x:lerp(lastX,stair.lip-12,Math.min(1,(u-.84)/.12)),foot:summit};
  }
  if (f < E.seat) {
    const t=progress(f,E.jump,E.seat);
    const {top,arc}=jumpFor(E.percent);
    const target=top+TOE_DROP;
    // A ballistic arc with a controlled apex: even the 99-point pose clears the HUD.
    const apex=Math.min(summit,target)-Math.round(arc*.37);
    const a=Math.sqrt(summit-apex), b=Math.sqrt(target-apex);
    return {
      x:lerp(stair.lip-12,SEAT_X,t),foot:apex+((a+b)*t-a)**2,
      sheet:f>=E.seat-3?'sit':'carry',pose:2,
    };
  }
  if (f <= E.bottom) return { x: SEAT_X, foot: banner(f, E).seatY + TOE_DROP, sheet: 'sit', pose: 0 };
  if (f <= E.land) {
    const t = progress(f, E.bottom, E.land);
    return {
      x: lerp(SEAT_X, 1416, t),
      foot: lerp(banner(E.bottom, E).seatY + TOE_DROP, FLOOR, t) - 4 * 70 * t * (1 - t),
      sheet: 'carry',
      pose: 2,
    };
  }
  if (f < E.go) {
    let pose = 3;
    if (E.response) {
      if (f >= E.response.greet) pose = 7;
      else if (f >= E.response.follow) pose = 5;
      else if (f >= E.response.like) pose = 1;
    }
    return { x: 1416, foot: FLOOR, sheet: 'release', pose };
  }
  const t = progress(f, E.go, E.end - 1);
  return { x: lerp(1416, 1652, t), foot: FLOOR, sheet: 'walk', pose: Math.floor((f - E.go) / 3) % 8 };
}

export function FlagRunner({ f, frames: E }: RunnerProps) {
  if (f < E.run || f >= E.end) return null;
  const actor = body(f, E);
  const enterDoor = progress(f, E.end - 7, E.end - 1);
  if (actor.sheet === 'sit')
    return (
      <Img
        src={staticFile('images/pixel-ergo-sit.png')}
        style={{
          position: 'absolute',
          left: actor.x - 45,
          top: actor.foot - 204,
          width: 106,
          height: 204,
          imageRendering: 'pixelated',
        }}
      />
    );
  return (
    <div
      style={{
        position: 'absolute',
        left: grid(actor.x - 68),
        top: grid(actor.foot) - 200,
        width: 136,
        height: 200,
        overflow: 'hidden',
        opacity: 1 - enterDoor,
      }}
    >
      <Img
        src={staticFile(`images/pixel-ergo-${actor.sheet}.png`)}
        style={{
          position: 'absolute',
          left: -136 * actor.pose,
          width: 1088,
          height: 200,
          imageRendering: 'pixelated',
        }}
      />
    </div>
  );
}

export function FlagCourse({ f, frames: E, percent }: RunnerProps & { percent?: number }) {
  if (f < E.run || f >= E.end) return null;
  const label = E.percent ?? percent;
  if (label === undefined) throw new Error('Pass the spoken percentage in frames.percent');
  const { edge, give } = banner(f, E);
  const seatAlongFlag = SEAT_X - (POLE + 10);
  return (
    <>
      <path d="M31 856h1858v58H31Z" fill={C.teal} stroke={C.ink} strokeWidth="8" />
      <path d="M35 863h1850" stroke={C.mint} strokeWidth="10" />
      <Staircase/>
      <g transform="translate(1512 0)">
        <path
          d="M0 856V680h16v-36h22v-22h168v22h22v36h16v176Z"
          fill={C.steel}
          stroke={C.ink}
          strokeWidth="8"
        />
        <path d="M36 856V702h16v-32h140v32h16v154Z" fill={C.ink} />
        <path d="M92 742h38v-16l34 30-34 30v-16H92Z" fill={f >= E.go ? C.gold : C.steel} />
      </g>
      <path d={`M${POLE - 7} ${POLE_TOP}h14V850h-14Z`} fill={C.mint} stroke={C.ink} strokeWidth="5" />
      <path d={`M${POLE - 13} ${POLE_TOP - 18}h26v20h-26Z`} fill={C.gold} stroke={C.ink} strokeWidth="6" />
      <g transform={`translate(${POLE + 10} ${edge})`}>
        <path
          d={`M0 0 Q54 0 ${seatAlongFlag - 14} ${give} H${seatAlongFlag + 14} Q180 0 ${FLAG_WIDTH} 0 l-16 29 16 29 H0Z`}
          fill={f >= E.seat ? C.gold : C.paper}
          stroke={C.ink}
          strokeWidth="6"
        />
        <text
          x="55"
          y="42"
          textAnchor="middle"
          fontFamily="Menlo, PingFang SC, sans-serif"
          fontWeight="bold"
          fontSize="32"
          fill={C.ink}
        >
          {label} 分
        </text>
      </g>
      {E.response && <LikeFollowTiles f={f} frames={{ ...E.response, go: E.go }} />}
    </>
  );
}
