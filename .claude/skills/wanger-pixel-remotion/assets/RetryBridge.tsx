import React from "react";
import {heartsAt, type PixelAction} from "./PixelAction";
import { staticFile } from "remotion";
import { heartPath, pixelColors as C } from "./PixelWorld";
import { Svg, Txt, move, lerp } from "./PixelStage";

const floor = 399,
  leftBank = 359,
  rightBank = 598,
  switchX = 166,
  prizeX = 785;
const progress = (frame: number, start: number, end: number) =>
  Math.max(0, Math.min(1, (frame - start) / (end - start)));
const bridgeEvent = { splash: 255, hit: 453, collect: 472 } as const;
const waterY = 424;
function HeartPickup({
  f,
  target,
}: {
  f: number;
  target: readonly [number, number];
}) {
  if (f < bridgeEvent.hit || f >= bridgeEvent.collect) return null;
  const t = progress(f, bridgeEvent.hit, bridgeEvent.collect);
  // The HUD target uses 1920 × 1080 composition coordinates.
  const x = lerp(2 * prizeX, target[0], t) + 95 * Math.sin(Math.PI * t);
  const y = lerp(282, target[1], t) - 46 * Math.sin(Math.PI * t);
  const scale = lerp(2.8, 1, t);
  return (
    <svg
      width="1920"
      height="1080"
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <g transform={`translate(${x} ${y}) scale(${scale}) translate(-16 -17)`}>
        <path
          d={heartPath}
          fill="#ef6658"
          stroke={C.ink}
          strokeWidth={1.5 * (1 - t)}
        />
        <path d="M7 9h6v3H7z" fill="#ffbd96" opacity={1 - t} />
      </g>
    </svg>
  );
}
function Splash({ f }: { f: number }) {
  const t = progress(f, bridgeEvent.splash, bridgeEvent.splash + 16);
  if (f < bridgeEvent.splash || t >= 1) return null;
  return (
    <g opacity={1 - t * t} shapeRendering="crispEdges">
      {[-1, 1].flatMap((side) =>
        [0, 1, 2].map((i) => {
          const x = 440 + side * (9 + i * 5 + (31 + i * 8) * t);
          const y = waterY - (22 + i * 8) * 4 * t * (1 - t) - 4;
          return (
            <path
              key={side + ":" + i}
              d={`M${x} ${y}h7v5h-7z`}
              fill={i % 2 ? C.mint : C.paper}
            />
          );
        }),
      )}
    </g>
  );
}
function position(frame: number) {
  if (frame < 221)
    return { x: lerp(231, 323, move(frame, 147, 74)), foot: floor };
  if (frame < 265) {
    const t = progress(frame, 221, 265);
    return { x: 323 + 151 * t, foot: floor - 330 * t + 470 * t * t };
  }
  if (frame < 320) return { x: 315, foot: floor };
  if (frame < 355) {
    const t = move(frame, 320, 35);
    return {
      x: lerp(315, switchX, t),
      foot: floor - 14 * Math.sin(Math.PI * t) - 7 * t,
    };
  }
  if (frame < 376) return { x: switchX, foot: floor - 7 };
  const crossing = move(frame, 376, 60);
  return {
    x: lerp(switchX, prizeX, crossing),
    foot:
      floor -
      7 * (1 - crossing) -
      67 * Math.sin(Math.PI * progress(frame, 436, 471)),
  };
}
function RewardBlock({ f }: { f: number }) {
  const hit = bridgeEvent.hit,
    up = -12 * Math.sin(Math.PI * progress(f, hit, hit + 12)),
    won = f >= hit;
  return (
    <g data-pixel-id="reward-block" data-pixel-role="subject" data-pixel-required="true" transform={`translate(${prizeX} ${184 + up})`}>
      <path
        d="M-39-42h70l11 11v70h-82z"
        fill="#bc7036"
        stroke={C.ink}
        strokeWidth="5"
      />
      <path
        d="M-39-42h69v69h-69z"
        fill={won ? C.mint : C.gold}
        stroke={C.ink}
        strokeWidth="5"
      />
      <path
        d="M-31-33h51m-53 5v44"
        fill="none"
        stroke={C.paper}
        strokeWidth="4"
      />
      {won &&
        [-1, 1].map((side) => (
          <g
            key={side}
            transform={`translate(${side * (38 + 40 * move(f, hit, 16))} ${-44 - 16 * Math.sin(progress(f, hit, hit + 17) * Math.PI)})`}
            opacity={1 - move(f, hit + 10, 12)}
          >
            <path d="M-3-10h6v7h7v6H3v7h-6V3h-7v-6h7z" fill={C.gold} />
          </g>
        ))}
      <Txt x={-4} y={14} size={43} code fill={C.ink} anchor="middle">
        {won ? "✓" : "?"}
      </Txt>
    </g>
  );
}
function RewardCourse({ f }: { f: number }) {
  const id = React.useId(),
    { x, foot } = position(f),
    switchOn = move(f, 351, 8);
  const falling = f >= 221 && f < 265,
    jumping = falling || (f >= 436 && f < 471);
  const inspecting = f >= 278 && f < 320;
  const pose = jumping
    ? 2
    : f < 221 || (f >= 320 && f < 355) || (f >= 376 && f < 436)
      ? Math.floor(f / 3) % 8
      : 0;
  return (
    <Svg>
      <defs>
        <pattern id={id} width="55" height="26" patternUnits="userSpaceOnUse">
          <rect width="55" height="26" fill="#bd7e53" />
          <path
            d="M0 1h55m-26 0v12m-29 0h55m-50 0v12"
            stroke="#986344"
            strokeWidth="2"
          />
        </pattern>
        <clipPath id={id + "pit"}>
          <rect width="960" y="42" height={falling ? waterY - 42 : 429} />
        </clipPath>
      </defs>
      <rect x="0" y={floor} width="960" height="75" fill="#a07857" />
      <path d="M355 425h36v8h72v7h45v-9h55v-6h38v49H355z" fill="#92694e" />
      {[
        [-6, leftBank + 6],
        [rightBank, 970 - rightBank],
      ].map(([left, width]) => (
        <g key={left}>
          <rect
            x={left}
            y={floor}
            width={width}
            height="76"
            fill={`url(#${id})`}
            stroke={C.ink}
            strokeWidth="4"
          />
          <path
            d={`M${left} ${floor}h${width}v10h-${width}z`}
            fill={C.mint}
            stroke={C.ink}
            strokeWidth="3"
          />
        </g>
      ))}
      <path
        d={`M${switchX + 30} 406v22h132l13-13h22`}
        fill="none"
        stroke={switchOn > 0.5 ? C.gold : C.ink}
        strokeWidth="5"
      />
      <g transform={`translate(${switchX} ${floor})`}>
        <path d="M-41-6h82v11h-82z" fill={C.ink} />
        <path
          d={`M-32 -6v-${16 - 13 * switchOn}h64v${16 - 13 * switchOn}z`}
          fill={switchOn > 0.5 ? C.mint : C.orange}
          stroke={C.ink}
          strokeWidth="3"
        />
      </g>
      {Array.from({ length: 6 }, (_, i) => {
        const on = move(f, 354 + i * 4, 8);
        return (
          on > 0 && (
            <g
              key={i}
              opacity={on}
              transform={`translate(${leftBank + i * 40} ${floor + (1 - on) * 56})`}
            >
              <path
                d="M0 0h40v15H0z"
                fill={C.gold}
                stroke={C.ink}
                strokeWidth="3"
              />
              <path d="M4 4h31" stroke={C.paper} strokeWidth="3" />
              <path
                d="M6 17l14 13 14-13"
                fill="none"
                stroke="#976234"
                strokeWidth="4"
              />
            </g>
          )
        );
      })}
      {f >= 282 && f < 355 && (
        <g opacity={move(f, 282, 12) * (1 - move(f, 337, 18))}>
          <path
            d="M325 382q65-157 140 11"
            fill="none"
            stroke="#9d6247"
            strokeWidth="3"
            strokeDasharray="6 7"
          />
          <path
            d="M456 384l15 16m0-16l-15 16"
            stroke={C.orange}
            strokeWidth="5"
          />
        </g>
      )}
      <rect
        x={leftBank + 2}
        y={waterY}
        width={rightBank - leftBank - 4}
        height={50}
        fill="#438e8d"
      />
      <path
        d={`M${leftBank + 2} ${waterY}H${rightBank - 2}`}
        stroke={C.mint}
        strokeWidth="3"
      />
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={leftBank + 14 + i * 55 + 4 * Math.sin(f / 16 + i)}
          y={waterY + 8 + (i % 2) * 12}
          width="21"
          height="2"
          fill={C.mint}
        />
      ))}
      <RewardBlock f={f} />
      <g clipPath={`url(#${id}pit)`}>
        <g
          transform={`translate(${x} ${foot}) scale(${f >= 278 && f < 355 ? -1 : 1} 1)`}
          opacity={f >= 265 && f < 277 ? move(f, 265, 12) : 1}
        >
          {inspecting ? (
            <image
              href={staticFile("images/pixel-ergo-think.png")}
              x="-31"
              y="-115"
              width="62"
              height="115"
              style={{ imageRendering: "pixelated" }}
            />
          ) : (
            <svg
              x="-39"
              y="-115"
              width="78"
              height="115"
              viewBox="0 0 136 200"
              overflow="hidden"
            >
              <image
                href={staticFile(
                  "images/pixel-ergo-" + (jumping ? "carry" : "walk") + ".png",
                )}
                x={-136 * pose}
                width="1088"
                height="200"
                style={{ imageRendering: "pixelated" }}
              />
            </svg>
          )}
        </g>
      </g>
      <Splash f={f} />
      {f >= 265 && f < 305 && (
        <g transform="translate(438 342)" opacity={1 - move(f, 291, 14)}>
          <path
            d="M-12-16l11 11 11-11 7 7-11 11 11 11-7 7-11-11-11 11-7-7 11-11-11-11z"
            fill={C.orange}
            stroke={C.ink}
            strokeWidth="2"
          />
        </g>
      )}
    </Svg>
  );
}

export type BridgeTiming = {
  start: number;
  jump: number;
  splash: number;
  retry: number;
  press: number;
  hit: number;
  collect: number;
  end: number;
};
const reference: BridgeTiming = {
  start: 147,
  jump: 221,
  splash: 255,
  retry: 278,
  press: 354,
  hit: 453,
  collect: 472,
  end: 476,
};
export const bridgeActions = (timing:BridgeTiming):PixelAction[] => [
  {id:'splash',frame:timing.splash,kind:'fall',heartDelta:-1,sound:{name:'pixel_splash',peakDbfs:-21}},
  {id:'hit',frame:timing.hit,kind:'hit',sound:{name:'success_pair',peakDbfs:-24}},
  {id:'collect',frame:timing.collect,kind:'heart-collect',heartDelta:1},
];
export const bridgeHearts = (frame:number,timing:BridgeTiming) => heartsAt(frame,bridgeActions(timing));
function bridgeFrame(frame: number, timing: BridgeTiming) {
  const keys = Object.keys(reference) as (keyof BridgeTiming)[];
  for (let i = 1; i < keys.length; i++) {
    const prev = keys[i - 1],
      next = keys[i];
    if (frame <= timing[next])
      return lerp(
        reference[prev],
        reference[next],
        progress(frame, timing[prev], timing[next]),
      );
  }
  return reference.end;
}
export function RetryBridge({
  frame,
  timing,
}: {
  frame: number;
  timing: BridgeTiming;
}) {
  return frame >= timing.start && frame < timing.end ? (
    <RewardCourse f={bridgeFrame(frame, timing)} />
  ) : null;
}
export function BridgePickup({
  frame,
  timing,
  target = [1563, 50],
}: {
  frame: number;
  timing: BridgeTiming;
  target?: readonly [number, number];
}) {
  return <HeartPickup f={bridgeFrame(frame, timing)} target={target} />;
}
