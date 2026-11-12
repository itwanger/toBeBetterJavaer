// One geometry source for painted wires, animated packets, and component ports.
export type Point = [number, number];
export function route(points: Point[], radius = 20) {
 points=points.filter((v,i)=>i===0||v[0]!==points[i-1][0]||v[1]!==points[i-1][1]);
 const samples: Point[] = [points[0]];
 let d = `M${points[0].join(' ')}`;
 for (let i = 1; i < points.length - 1; i++) {
  const a = points[i - 1], b = points[i], c = points[i + 1];
  const ab = Math.hypot(b[0]-a[0],b[1]-a[1]), bc = Math.hypot(c[0]-b[0],c[1]-b[1]);
  const r = Math.min(radius, ab / 2, bc / 2);
  const enter: Point = [b[0]-(b[0]-a[0])*r/ab,b[1]-(b[1]-a[1])*r/ab];
  const leave: Point = [b[0]+(c[0]-b[0])*r/bc,b[1]+(c[1]-b[1])*r/bc];
  d += `L${enter.join(' ')}Q${b.join(' ')} ${leave.join(' ')}`;
  samples.push(enter);
  for(let n=1;n<=12;n++) { const t=n/12; samples.push([(1-t)**2*enter[0]+2*(1-t)*t*b[0]+t*t*leave[0],(1-t)**2*enter[1]+2*(1-t)*t*b[1]+t*t*leave[1]]); }
 }
 const end = points[points.length-1]; d += `L${end.join(' ')}`; samples.push(end);
 const lengths=samples.slice(1).map((v,i)=>Math.hypot(v[0]-samples[i][0],v[1]-samples[i][1]));
 const total=lengths.reduce((a,b)=>a+b,0);
 return {d, point(t:number): Point {
  let distance=Math.max(0,Math.min(1,t))*total;
  for(let i=0;i<lengths.length;i++) {
   if(distance<=lengths[i]||i===lengths.length-1) { const q=lengths[i]===0?0:Math.min(1,distance/lengths[i]); return [samples[i][0]+(samples[i+1][0]-samples[i][0])*q,samples[i][1]+(samples[i+1][1]-samples[i][1])*q]; }
   distance-=lengths[i];
  }
  return end;
 }};
}
export const OUTPUT_X=756;
