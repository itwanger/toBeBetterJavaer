// 世界相机 CAM：解说片不是「一段段画＋转场」，而是「一张连续的世界画布＋一台相机」。
// 铁律：相机只由全片时间（或本段时间）算出来，场景每帧按相机矢量重画——缩放转场永远清楚，不会把 1920 的位图放大 20 倍糊掉；
//       引擎在转场窗口里会把上一段继续按 t 画进 A 缓冲，所以「上一镜的相机继续推」天然成立（live 推进）。
// cam = { x, y, z, r }：世界点 (x,y) 落在画面中心，缩放 z（>1 推近），绕中心旋转 r（弧度）。缺省 x=960,y=540,z=1,r=0。
(() => {
let W = 1920, H = 1080; U.onStage((w, h) => { W = w; H = h; });   // 画布尺寸跟 U.setStage 走（默认 1920×1080）
const { clamp, lerp } = U;
const CAM = window.CAM = {};
const n = cam => ({ x: cam.x ?? W / 2, y: cam.y ?? H / 2, z: cam.z ?? 1, r: cam.r || 0 });

// 把相机变换作用到 c 上（不 save/restore，调用方负责）
CAM.apply = (c, cam) => { const k = n(cam); c.translate(W / 2, H / 2); if (k.r) c.rotate(k.r); c.scale(k.z, k.z); c.translate(-k.x, -k.y); };
// 在相机下画 fn(c)，自动 save/restore
CAM.with = (c, cam, fn) => { c.save(); CAM.apply(c, cam); fn(c); c.restore(); };
// 世界 → 屏幕 / 屏幕 → 世界
CAM.toScreen = (cam, x, y) => { const k = n(cam); let dx = (x - k.x) * k.z, dy = (y - k.y) * k.z; if (k.r) { const cs = Math.cos(k.r), sn = Math.sin(k.r); [dx, dy] = [dx * cs - dy * sn, dx * sn + dy * cs]; } return [W / 2 + dx, H / 2 + dy]; };
CAM.toWorld = (cam, sx, sy) => { const k = n(cam); let dx = sx - W / 2, dy = sy - H / 2; if (k.r) { const cs = Math.cos(-k.r), sn = Math.sin(-k.r); [dx, dy] = [dx * cs - dy * sn, dx * sn + dy * cs]; } return [k.x + dx / k.z, k.y + dy / k.z]; };

// ---------- 缩放 ----------
// 对数插值：z0→z1 每帧放大同样的倍数，观众感到「匀速穿越尺度」；线性插值会前慢后猛。所有推拉缩放都用它。
CAM.zlerp = (z0, z1, e) => z0 * Math.pow(z1 / z0, e);
// 「从一个半径 r 的圆形开口穿进去，开口要在转场结束前盖满屏」需要的最小放大倍数 = 开口中心到最远屏幕角的距离 / r。
// 开口在画面中心时 ≈ 1101/r（卡片里写的「放大倍数 ≥ 1100/半径」）。小了，最后一帧开口没盖满会跳。
CAM.coverZoom = (r, cx = W / 2, cy = H / 2) => Math.max(Math.hypot(cx, cy), Math.hypot(W - cx, cy), Math.hypot(cx, H - cy), Math.hypot(W - cx, H - cy)) / r;
// 让世界点 (wx,wy) 在缩放 z 下出现在屏幕 (sx,sy)：返回相机。推近某物时让它平滑移到画面中心就靠它。
CAM.anchor = (wx, wy, z, sx, sy) => ({ x: wx - (sx - W / 2) / z, y: wy - (sy - H / 2) / z, z });
// 推进某个世界点：从 base 相机出发，缩放按对数插值到 Z（进度 e）；该点在屏幕上从原位置移向画面中心（进度 k，默认 = e；k=0 = 绕它原地推）。
// 用于「钻进镜头」（y1）、「推满照片再硬切」（y2）、「推进最新数据点」（t3，k=0）。
CAM.pushTo = (base, wx, wy, Z, e, k = e, to = [W / 2, H / 2]) => {
  const s0 = CAM.toScreen(base, wx, wy), z = CAM.zlerp(n(base).z, Z, e);
  return CAM.anchor(wx, wy, z, lerp(s0[0], to[0], k), lerp(s0[1], to[1], k));
};

// ---------- 关键帧 ----------
// keys = [{t, x, y, z, r, ease}]；ease 作用在「从上一键到这一键」，默认 cubicInOut；z 用对数插值。
// 沿路径平移（Vox 桌面、白板上的平移/甩镜）就是一串关键帧：平滑移动用 sineInOut，远跳用 cubicInOut＋运动模糊，沿线追用 MO.longTail。
CAM.at = (keys, t) => {
  if (t <= keys[0].t) return { ...keys[0] };
  for (let i = 1; i < keys.length; i++) {
    const a = keys[i - 1], b = keys[i];
    if (t <= b.t) { const e = (b.ease || MO.cubicInOut)(MO.seg(t, a.t, b.t));
      return { x: lerp(a.x, b.x, e), y: lerp(a.y, b.y, e), z: CAM.zlerp(a.z, b.z, e), r: lerp(a.r || 0, b.r || 0, e), v: e }; }
  }
  return { ...keys[keys.length - 1] };
};

// ---------- 镜头动作表（解说片用它；什么时候用哪一种见 references/镜头语言.md） ----------
// 默认是过渡类动作：缓推 push、找下一件 glide、拉远 pull（0.6–1.5s，sineInOut / 长尾）；重音类：快推 punch、快移 pan、砸入 slam，
// 留给揭晓、数字、反转。时长在 MO.PULSE。一支片子里推近要有来有回：推进去之后用 pull、glide 或硬切换开，别一镜接一镜只往里推。
// CAM.track(base, events, t) → cam：base 是起始相机 {x, y, z}；events 是按时间排的镜头动作，相机只由 t 算出来（确定性，可跳帧）。
// 每个动作从「上一个动作结束时的相机」出发，到 at + dur 落定；两个动作挨太近（上一个没走完下一个就开始）时，下一个从上一个此刻的位置接着走。
//   {at, kind: 'push', k?, x?, y?, dur?}    缓推（不写 kind 就是它）：z 乘以 (1+k)（k 默认 0.2），0.9s sineInOut；给 x, y 就同时把这个世界点移到画面中心。
//   {at, kind: 'pull', k?, x?, y?, z?, dur?} 拉远：z 乘以 (1+k)（k 默认 -1/6，正好抵消一次默认缓推；回全貌最稳是写 z: base.z），1.1s 长尾。推进去之后回到全貌、段落收束用它。
//   {at, kind: 'glide', x, y, dur?}         找下一件：缩放不变，画面中心平滑移到世界点 (x, y)，0.7s sineInOut。同一面墙上从一件移到下一件。
//   {at, kind: 'to', x?, y?, z?, dur?, ease?} 推到指定相机（推近截图上的一块：z 用 MD.zoomFor 算）；默认 0.9s sineInOut，写 dur: MO.PULSE.punch 就是重音。
//   {at, kind: 'punch', k?, x?, y?, dur?}   快推（重音）：0.28s cubicInOut，k 默认 0.25（0.18–0.32）。k 可以写负数（快拉）。
//   {at, kind: 'pan', x, y, dur?}            快移（重音）：同倍率 0.30s。视线突然转移、喜剧节奏用。
//   {at, kind: 'slam', dur?, from?}          整帧砸入：z 额外乘 MO.slamK（1.55→0.94→1.0，0.17s）。大字、数字、盖章落下那一帧用。
//   {at, kind: 'shake', amp?, dur?}          震镜：dur（默认 4 帧 ≈ 0.13s）内上下抖 amp 像素（默认 14），和砸入、盖章同帧用，一支片子别超过两次。
//   {at, kind: 'cut', x?, y?, z?}            硬切到这台相机（不过渡）。换景别不一定要运镜，跳近一档就是硬切。
// 返回的 cam 带 moving: true/false（这一刻是否在运动），给运动模糊、标签显隐用。
CAM.track = (base, events, t) => {
  let cam = { x: base.x ?? W / 2, y: base.y ?? H / 2, z: base.z ?? 1 }, zMul = 1, dy = 0, moving = false;
  const evs = [...events].sort((a, b) => a.at - b.at);
  for (const e of evs) {
    if (t < e.at) break;
    const P = MO.PULSE, kind = e.kind || 'push';
    if (kind === 'cut') { cam = { x: e.x ?? cam.x, y: e.y ?? cam.y, z: e.z ?? cam.z }; continue; }
    if (kind === 'slam') { const d = e.dur || P.slam, k = (t - e.at) / d; if (k < 1) { zMul *= MO.slamK(k, e.from); moving = true; } continue; }
    if (kind === 'shake') { const d = e.dur || 4 / 30, k = (t - e.at) / d; if (k < 1) { dy += (e.amp ?? 14) * Math.sin(k * Math.PI * 4) * (1 - k) / cam.z; moving = true; } continue; }
    const D = { pan: P.pan, punch: P.punch, glide: P.glide, pull: P.pull, push: P.push, to: P.push }[kind] ?? P.push;
    const E = kind === 'punch' || kind === 'pan' || (e.dur && e.dur <= 0.35) ? MO.cubicInOut : kind === 'pull' ? MO.longTail : MO.sineInOut;   // 写了重音时长的 to 也用快推的曲线
    const d = e.dur || D, p = (e.ease || E)(clamp((t - e.at) / d));
    let to;
    if (kind === 'pan' || kind === 'glide') to = { x: e.x ?? cam.x, y: e.y ?? cam.y, z: cam.z };
    else if (kind === 'to') to = { x: e.x ?? cam.x, y: e.y ?? cam.y, z: e.z ?? cam.z };
    else if (kind === 'pull') to = { x: e.x ?? cam.x, y: e.y ?? cam.y, z: e.z ?? cam.z * (1 + (e.k ?? -1 / 6)) };   // 默认 ×5/6，正好抵消一次默认缓推（×1.2）
    else to = { x: e.x ?? cam.x, y: e.y ?? cam.y, z: cam.z * (1 + (e.k ?? (kind === 'push' ? 0.2 : P.k))) };
    if (p < 1) moving = true;
    cam = { x: lerp(cam.x, to.x, p), y: lerp(cam.y, to.y, p), z: CAM.zlerp(cam.z, to.z, p) };
  }
  return { x: cam.x, y: cam.y + dy, z: cam.z * zMul, moving };
};

// ---------- 视差 ----------
// d=1 是主体平面，d<1 远、d>1 近。远层位移按 d 线性、缩放按 z^d：深推时远景几乎不动，这就是景深感（Kurzgesagt 5 层视差）。
CAM.layer = (c, cam, d, fn) => { const k = n(cam); c.save(); CAM.apply(c, { x: lerp(W / 2, k.x, d), y: lerp(H / 2, k.y, d), z: Math.pow(k.z, d) }); fn(c); c.restore(); };

// ---------- 运动 ----------
// 相机在屏幕上的瞬时速度（像素/帧，60fps）：camFn(t) → cam。给 motionBlur 用。
CAM.velocity = (camFn, t, dt = 1 / 60) => { const a = camFn(t), b = camFn(t - dt); const z = n(a).z; return [(n(a).x - n(b).x) * z, (n(a).y - n(b).y) * z]; };
// 动态模糊：沿速度方向把整帧叠 n 次（快摇/甩镜用；速度 <1.5px 自动退化成一次绘制）。模糊长度应短于相机位移（PremiumBeat）。
CAM.motionBlur = (c, src, vx, vy, k = 7) => {
  const sp = Math.hypot(vx, vy); if (sp < 1.5) { c.drawImage(src, 0, 0); return; }
  c.save(); for (let i = 0; i < k; i++) { const q = i / (k - 1) - 0.5; c.globalAlpha = i === 0 ? 1 : 1 / (i + 1); c.drawImage(src, -vx * q, -vy * q); } c.restore();
};
// 手持感微漂：两路不同周期的正弦（连续时间，不闪），返回 [dx, dy] 像素。只给艺术风格画面和纯氛围镜头；解说镜头停住时就停住，不加微漂
CAM.drift = (t, amp = 6, seed = 0) => [amp * Math.sin(t * 0.9 + seed) + amp * 0.4 * Math.sin(t * 2.3 + seed * 2), amp * 0.7 * Math.sin(t * 1.1 + seed * 3)];
})();
