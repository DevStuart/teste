/* ==========================================================================
   COMPLEXO : favela baiana densa, inspirada no layout "Complexo Miramar" (GustaVera).
   Zonas (espelho N/S): Rotatória + Bar + Quadra no miolo; Mirante (lajes altas) a leste;
   Trilho / beco longo no eixo; Galpão e Barbearia a oeste; bases nos fundos.
   Combate próximo (type 'close'). Id: complexo
   Os .ydr/.ymap da pasta Favelas NÃO são importados: só o layout/tema.
   ========================================================================== */

const CX = {
  faces: [
    [0.92, 0.78, 0.55], [0.88, 0.55, 0.48], [0.45, 0.62, 0.72],
    [0.4, 0.7, 0.62], [0.95, 0.85, 0.35], [0.78, 0.42, 0.32],
    [0.9, 0.9, 0.86], [0.55, 0.48, 0.42], [0.72, 0.55, 0.7], [0.5, 0.62, 0.55],
  ],
  tin: [0.55, 0.52, 0.48],
  graf: [0.15, 0.15, 0.16],
};

const ATMO_CX = Object.assign({}, ATMO_DEFAULT, {
  sun: [0.55, 0.45, -0.5], sunColor: 0xffc878, sunI: 1.7, vmSun: 0xffc878,
  fog: [0.78, 0.72, 0.62], fogD: 0.009, fogH: [14, 0], fogSun: 0.4,
  hemi: [0xf0d8b0, 0x6a5848, 0.8], vmHemi: [0xf0d8b0, 0x6a5848],
  sky: {
    zen: [0.4, 0.55, 0.8], mid: [0.65, 0.7, 0.85], hor: [0.98, 0.78, 0.5],
    gnd: [0.45, 0.4, 0.35], glow: [1.0, 0.85, 0.55], halo: [1.0, 0.9, 0.7],
    disk: [13, 11, 9], cloudLo: [0.65, 0.66, 0.7], cloudHi: [1.05, 1.0, 0.95],
    cloud: [0.7, 0.88, 0.5],
    ridge: [0, 0, 0], ridgeSnow: [1, 1, 1], ridgeRock: [0.5, 0.5, 0.5],
  },
  envGround: 0x6a5a48, hdri: 'sunset',
  bounce: [1.05, 0.98, 0.9], dust: [0.8, 0.7, 0.55], motes: [1.0, 0.92, 0.8],
  grade: { lo: [1.0, 0.97, 0.92], hi: [1.06, 1.0, 0.92], exp: 1.02, sat: 1.05, con: 1.06 },
  rays: [1.0, 0.88, 0.65], bloom: [0.42, 0.55, 0.88], aoFloor: 0.38,
  raysThr: 1.9, raysCap: 6.5, winLit: 0.25, wind: [120, 0.08],
});

function complexoLevel() {
  const M = DECOR;
  const R = rngOf(8821);
  SR.rng = R;

  // chão geral
  box('concrete', -34, 34, 0, 0.02, -42, 42, { collide: false, ao: false, tint: [0.52, 0.5, 0.46] });

  cxRotatoria(R);
  cxQuadra();
  cxBar(0, 6, R);
  cxTrilho(R);
  cxMirante(R);
  cxOeste(R);
  cxPier();
  cxBases(R);
  cxDecor(R);

  // perímetro
  box('concrete', -33.5, -33, 0, 2.8, -42, 42, { tint: [0.45, 0.43, 0.4] });
  box('concrete', 33, 33.5, 0, 2.8, -42, 42, { tint: [0.45, 0.43, 0.4] });
  for (const s of [1, -1]) box('concrete', -34, 34, 0, 2.6, s * 41.2, s * 41.7, { tint: [0.48, 0.46, 0.42] });
}

/* ---------- Rotatória / praça central (ponto B) ---------- */
function cxRotatoria(R) {
  const M = DECOR;
  // anel de asfalto
  box('asphalt', -7, 7, 0, 0.03, -7, 7, { collide: false, ao: false, tint: [0.28, 0.28, 0.26] });
  // ilhota central
  box('concrete', -2.2, 2.2, 0, 0.35, -2.2, 2.2, { tint: [0.62, 0.6, 0.55] });
  M.place(PF.lampPost(), 0, 0.35, 0, 0);
  // barreiras / jersey ao redor
  for (const a of [0, 1, 2, 3, 4, 5, 6, 7]) {
    const ang = (a / 8) * TAU, r = 5.5;
    M.place(PF.jersey(1.4), Math.cos(ang) * r, 0, Math.sin(ang) * r, ang + Math.PI / 2);
  }
  // carros abandonados na praça
  car(-5.5, 3.5, 0.4, [0.55, 0.15, 0.12], true, 'hatch');
  car(5.2, -4, -0.6, [0.25, 0.28, 0.32], true, 'suv');
  // toldos / estandes
  for (const [x, z, ry] of [[-9, 1, 0.2], [9, -1, Math.PI], [-8, -5, 0.5]]) {
    M.place(PF.stall(R.pick([[0.7, 0.2, 0.15], [0.2, 0.45, 0.4], [0.9, 0.75, 0.3]])), x, 0, z, ry);
  }
}

/* ---------- Quadra improvisada (ao sul da rotatória) ---------- */
function cxQuadra() {
  const M = DECOR;
  box('concrete', -5.5, 5.5, 0, 0.04, -16, -6, { collide: false, ao: false, tint: [0.32, 0.4, 0.3] });
  // linhas
  M.save().color([0.9, 0.9, 0.88]).local(1); M.cls = 1;
  M.boxB('paint', -0.08, 0.08, 0.041, 0.05, -16, -6);
  M.boxB('paint', -5.5, 5.5, 0.041, 0.05, -11.05, -10.95);
  M.restore();
  // traves
  for (const z of [-15.5, -6.5]) {
    M.save().color([0.85, 0.85, 0.82]).local(1);
    M.boxB('steel', -1.6, -1.5, 0, 1.7, z - 0.05, z + 0.05);
    M.boxB('steel', 1.5, 1.6, 0, 1.7, z - 0.05, z + 0.05);
    M.boxB('steel', -1.6, 1.6, 1.65, 1.75, z - 0.05, z + 0.05);
    M.restore();
  }
  // bancos na beira
  for (const x of [-7.5, 7.5]) {
    DECOR.place(PF.platformBench(), x, 0, -11, x < 0 ? Math.PI / 2 : -Math.PI / 2);
  }
}

/* ---------- Bar / birosca (GustaVera bar) ---------- */
function cxBar(cx, cz, R) {
  const M = DECOR;
  box('plaster', cx - 4, cx + 4, 0, 2.8, cz - 3, cz + 3, { tint: [0.32, 0.52, 0.48] });
  box('steel', cx - 4.2, cx + 4.2, 2.8, 3.05, cz - 3.2, cz + 3.2, { tint: CX.tin, m: 'metal' });
  // balcão aberto pra norte
  box('wood', cx - 3.6, cx + 3.6, 1.0, 1.18, cz + 3, cz + 3.4, { tint: [0.42, 0.3, 0.18] });
  M.dyn('cafeTable', cx - 2, 0, cz + 5, 0);
  M.dyn('chair', cx - 2, 0, cz + 5.8, Math.PI, { tint: [0.7, 0.68, 0.65] });
  M.dyn('cafeTable', cx + 2, 0, cz + 5, 0.15);
  M.dyn('chair', cx + 2, 0, cz + 5.8, Math.PI, { tint: [0.7, 0.68, 0.65] });
  M.place(PF.crate(0.95), cx + 5, 0, cz, 0.2, { tint: [0.15, 0.3, 0.5] });
  M.place(PF.crate(0.95), cx + 5, 0.95, cz, -0.1, { tint: [0.15, 0.3, 0.5] });
  M.place(PF.barrel(), cx - 5, 0, cz + 1, 0.4, { tint: [0.55, 0.2, 0.12] });
  // toldo
  M.save().color([0.85, 0.25, 0.2]).local(1); M.cls = 1;
  M.boxB('canvas', cx - 4, cx + 4, 2.5, 2.55, cz + 3, cz + 5.2);
  M.restore();
}

/* ---------- Trilho / beco longo (eixo N-S, ~3 m) ---------- */
function cxTrilho(R) {
  const M = DECOR;
  // faixa de "trilho" visual no chão do beco
  box('steel', -0.35, -0.15, 0.02, 0.05, -28, 28, { collide: false, tint: [0.35, 0.35, 0.32], m: 'metal' });
  box('steel', 0.15, 0.35, 0.02, 0.05, -28, 28, { collide: false, tint: [0.35, 0.35, 0.32], m: 'metal' });
  // casas apertadas dos dois lados (espelho)
  for (const s of [1, -1]) {
    for (const [x0, z0, w, d, h] of [
      [-14, s * 10, 5.5, 5, 3.4], [-14, s * 18, 5.5, 5.5, 5.2], [-14, s * 26, 5.5, 5, 3.6],
      [8.5, s * 10, 5.5, 5, 3.2], [8.5, s * 18, 5.5, 5.5, 5.6], [8.5, s * 26, 5.5, 5, 3.8],
    ]) {
      cxCasa(x0, z0, w, d, h, R);
    }
    // lajes jogáveis nos altos
    cxLaje(-14, s * 18, 5.5, 5.5, 5.2);
    cxLaje(8.5, s * 18, 5.5, 5.5, 5.6);
    cxStairs(-11, s * 18, s, 5.2);
    cxStairs(11, s * 18, s, 5.6);
    // barreiras no beco
    for (const z of [s * 8, s * 22]) {
      M.place(PF.jersey(1.6), -2.2, 0, z, Math.PI / 2);
      M.place(PF.jersey(1.6), 2.2, 0, z, Math.PI / 2);
    }
  }
}

/* ---------- Mirante leste (lajes altas + chefe / heliponto) ---------- */
function cxMirante(R) {
  const M = DECOR;
  for (const s of [1, -1]) {
    // bloco alto "casa do chefe"
    cxCasa(20, s * 14, 8, 7, 6.4, R);
    cxLaje(20, s * 14, 8, 7, 6.4);
    cxStairs(22, s * 14, s, 6.4);
    // casa média
    cxCasa(20, s * 24, 7, 6, 4.2, R);
    cxLaje(20, s * 24, 7, 6, 4.2);
    // sandbags na laje alta
    for (let i = 0; i < 4; i++) {
      M.place(PF.sandbagFat(), 21 + i * 0.7, 6.55, s * 14.5, 0);
    }
  }
  // heliponto (laje baixa a leste do centro)
  box('concrete', 24, 32, 0, 0.12, -4, 4, { tint: [0.45, 0.45, 0.42] });
  M.save().color([0.9, 0.85, 0.2]).local(1); M.cls = 1;
  M.boxB('paint', 27.7, 28.3, 0.12, 0.14, -3.5, 3.5);
  M.boxB('paint', 24.5, 31.5, 0.12, 0.14, -0.3, 0.3);
  M.restore();
  M.place(PF.antenna(), 30, 0.12, 0, 0);
  // antenas parabólicas
  for (const [x, z, y] of [[22, 16, 6.55], [22, -16, 6.55], [24, 26, 4.35]]) {
    M.place(PF.dish(), x, y, z, R() * Math.PI, { nocol: true });
  }
  for (const [x, z, y] of [[23, 15, 6.55], [23, -15, 6.55], [25, 25, 4.35]]) {
    M.place(PF.waterTank(), x, y, z, R() * TAU, { nocol: true });
  }
}

/* ---------- Oeste: galpão, barbearia, casas baixas ---------- */
function cxOeste(R) {
  const M = DECOR;
  for (const s of [1, -1]) {
    cxCasa(-28, s * 10, 7, 6, 3.2, R);
    cxCasa(-28, s * 18, 7, 6, 4.8, R);
    cxCasa(-28, s * 26, 7, 5.5, 3.4, R);
    cxLaje(-28, s * 18, 7, 6, 4.8);
    cxStairs(-25, s * 18, s, 4.8);
  }
  // galpão (sem espelho, um só no NW e espelho SW via s)
  for (const s of [1, -1]) {
    box('steel', -32, -22, 0, 4.5, s * 32, s * 38, { tint: [0.4, 0.42, 0.4], m: 'metal' });
    // porta aberta visual
    M.save().color([0.1, 0.1, 0.1]).world(1); M.cls = 1;
    M.boxB('dark', -27.5, -26.5, 0.2, 3.2, s * 32 - 0.05 * Math.sign(s), s * 32 + 0.05 * Math.sign(s));
    M.restore();
    M.place(PF.pallet(), -24, 0, s * 34, 0);
    M.place(PF.pallet(), -24, 0.2, s * 35.5, 0.3);
    M.place(PF.generator(), -30, 0, s * 35, Math.PI / 2);
  }
  // barbearia (landmark oeste)
  box('plaster', -20, -14, 0, 2.9, -3, 3, { tint: [0.95, 0.92, 0.88] });
  box('steel', -20.2, -13.8, 2.9, 3.1, -3.2, 3.2, { tint: CX.tin, m: 'metal' });
  M.save().color([0.8, 0.15, 0.15]).local(1); M.cls = 1;
  M.boxB('paint', -20.05, -13.95, 2.2, 2.7, 3.15, 3.25);
  M.restore();
  M.place(PF.chair(), -17, 0, 4.5, Math.PI, { tint: [0.2, 0.2, 0.22] });
}

/* ---------- Pier / pântano (borda oeste visual) ---------- */
function cxPier() {
  const M = DECOR;
  box('wood', -34, -30, 0, 0.25, -8, 8, { tint: [0.4, 0.3, 0.2] });
  for (const z of [-6, -2, 2, 6]) {
    M.save().move(-32, -0.4, z).color([0.35, 0.28, 0.2]).local(1);
    M.cyl('wood', 0.12, 1.4, 6);
    M.restore();
    M.place(PF.bollard(), -30.5, 0.25, z, 0);
  }
  M.place(PF.barque(), -32, 0.1, 0, Math.PI / 2);
}

/* ---------- Bases N/S ---------- */
function cxBases(R) {
  for (const s of [1, -1]) {
    cxCasa(-18, s * 34, 6, 5, 3.0, R);
    cxCasa(-6, s * 34, 7, 5, 3.2, R);
    cxCasa(8, s * 34, 6, 5, 2.9, R);
    cxCasa(20, s * 34, 6, 5, 3.1, R);
    // estacionamento / wrecks
    car(-12, s * 38, s > 0 ? 0.2 : Math.PI + 0.2, [0.4, 0.4, 0.38], true, 'hatch');
    car(4, s * 38.5, s > 0 ? -0.3 : Math.PI - 0.3, [0.55, 0.35, 0.2], true, 'suv');
    // cover sacs
    for (let i = 0; i < 5; i++) {
      DECOR.place(PF.sandbagFat(), -4 + i * 0.7, 0, s * 31.5, 0);
    }
  }
}

/* ---------- Props soltos, fios, toldos ---------- */
function cxDecor(R) {
  const M = DECOR;
  for (let i = 0; i < 36; i++) {
    const x = R.range(-30, 30), z = R.range(-38, 38);
    if (Math.abs(x) < 4 && Math.abs(z) < 8) continue;
    if (Math.hypot(x, z) < 8) continue;
    if (R() < 0.45) M.place(PF.crate(R.range(0.85, 1.15)), x, 0, z, R() * TAU, { tint: [0.5, 0.36, 0.22] });
    else if (R() < 0.7) M.place(PF.barrel(), x, 0, z, R() * TAU, { tint: R.pick([[0.55, 0.2, 0.12], [0.3, 0.35, 0.3], [0.4, 0.4, 0.38]]) });
    else M.place(PF.trashBag(), x, 0, z, R() * TAU);
  }
  // postes e fios (varal entre casas)
  for (const s of [1, -1]) {
    for (const x of [-16, 10]) {
      M.place(PF.pole(), x, 0, s * 12, 0);
    }
    M.save().color([0.85, 0.85, 0.8]).local(1); M.cls = 2;
    M.tube('plastic', 0.012, [[-16, 5.5, s * 12], [10, 5.8, s * 12]], 4);
    M.restore();
  }
  // tendas militares extras
  for (const s of [1, -1]) {
    M.place(PF.tent(), -22, 0, s * 6, s > 0 ? 0.2 : Math.PI);
  }
  // dumpsters
  M.place(PF.dumpster(), 14, 0, 2, Math.PI / 2);
  M.place(PF.dumpster(), -10, 0, -8, 0);
}

/* ---------- Casa tipica (volume + zinco + janelas) ---------- */
function cxCasa(x0, z0, w, d, h, R) {
  const tint = R.pick(CX.faces);
  const x1 = x0 + w, z1 = z0 + d;
  const za = Math.min(z0, z1), zb = Math.max(z0, z1);
  box('plaster', x0, x1, 0, h, za, zb, { tint });
  box('steel', x0 - 0.08, x1 + 0.08, h, h + 0.32, za - 0.08, zb + 0.08, { tint: CX.tin, m: 'metal' });
  const M = DECOR;
  M.save().color(CX.graf).world(1); M.cls = 1;
  const zf = z0 < z1 ? z0 : z1;
  if (w > 3) {
    M.boxB('dark', x0 + 0.7, x0 + 1.7, 1.0, 2.0, zf - 0.03, zf + 0.03);
    M.boxB('dark', x1 - 1.7, x1 - 0.7, 1.0, 2.0, zf - 0.03, zf + 0.03);
  }
  if (h > 4.2) {
    M.boxB('dark', x0 + 0.9, x0 + 1.9, 3.3, 4.2, zf - 0.03, zf + 0.03);
    M.boxB('dark', x1 - 1.9, x1 - 0.9, 3.3, 4.2, zf - 0.03, zf + 0.03);
  }
  M.boxB('dark', x0 + w * 0.38, x0 + w * 0.38 + 0.85, 0.05, 2.05, zf - 0.04, zf + 0.04);
  M.restore();
  // grafite faixa
  if (R() < 0.45) {
    M.save().color(R.pick([[0.9, 0.2, 0.15], [0.2, 0.5, 0.9], [0.9, 0.85, 0.2]])).local(1); M.cls = 2;
    M.boxB('paint', x0 + 0.2, x1 - 0.2, h * 0.45, h * 0.55, zf - 0.05, zf - 0.02);
    M.restore();
  }
}

function cxLaje(x0, z0, w, d, y) {
  const x1 = x0 + w, za = Math.min(z0, z0 + d), zb = Math.max(z0, z0 + d);
  box('concrete', x0 + 0.12, x1 - 0.12, y, y + 0.12, za + 0.12, zb - 0.12, { tint: [0.62, 0.6, 0.56] });
  const t = 0.12, mh = 0.75;
  box('concrete', x0, x1, y + 0.12, y + 0.12 + mh, za, za + t, { tint: [0.7, 0.68, 0.64] });
  box('concrete', x0, x1, y + 0.12, y + 0.12 + mh, zb - t, zb, { tint: [0.7, 0.68, 0.64] });
  box('concrete', x0, x0 + t, y + 0.12, y + 0.12 + mh, za, zb, { tint: [0.7, 0.68, 0.64] });
  box('concrete', x1 - t, x1, y + 0.12, y + 0.12 + mh, za, zb, { tint: [0.7, 0.68, 0.64] });
}

function cxStairs(x, z, s, h) {
  const len = 2.6;
  ramp(x - 0.55, x + 0.55, s > 0 ? z - len : z, s > 0 ? z : z + len, 'z', 0, h, 'concrete', [0.55, 0.53, 0.5]);
}

MAP_DEFS.complexo = {
  type: 'close',
  bounds: { x0: -34, x1: 34, z0: -42, z1: 42 },
  textures: [
    'plaster', 'concrete', 'steel', 'wood', 'crate', 'paintwood',
    'canvas', 'asphalt', 'timber', 'stone', 'brick',
  ],
  splat: { x0: -48, z0: -56, w: 96, d: 112, ppm: 4 },
  far: 260,
  art: { cam: [2, 11, 36], look: [0, 2, 0], fov: 56 },
  landmarks: [
    [0, 4, 6, 'birosca'],
    [24, 8, 14, 'mirante'],
    [-17, 4, 0, 'barbearia'],
    [28, 2, 0, 'heliponto'],
  ],
  build() { complexoLevel(); },
  spawns: [
    [-20, 36], [-10, 38], [0, 36], [10, 38], [20, 36],
    [-26, 34], [-14, 34], [-4, 34], [6, 34], [16, 34], [26, 34],
    [-8, 40], [8, 40],
  ],
  poi: [
    [-26, 0, 10, 'L'], [-26, 0, -10, 'L'], [-25, 4.9, 18, 'L', 1], [-25, 4.9, -18, 'L', 1], [-17, 0, 0, 'L'],
    [0, 0, 0, 'M'], [0, 0, 6, 'M'], [0, 0, -11, 'M'], [0, 0, 18, 'M'], [0, 0, -18, 'M'],
    [22, 0, 10, 'E'], [22, 0, -10, 'E'], [22, 6.55, 14, 'E', 1], [22, 6.55, -14, 'E', 1], [28, 0.2, 0, 'E'],
  ],
  dom: [[0, 28], [0, 0], [0, -28]],
  mecha: [[0, 0], [28, 0], [-26, 0], [0, -11]],
  lane: (x) => (x < -8 ? 'L' : x > 8 ? 'E' : 'M'),
  sniper: [22, 6.6, 14],
  coverZ: 32,
  heli: [28, 34],
  cam: 36,
  surface: (p) => {
    if (Math.abs(p.x) < 5.5 && p.z > -16 && p.z < -6) return 'concrete';
    if (Math.abs(p.x) < 7 && Math.abs(p.z) < 7) return 'concrete';
    return 'concrete';
  },
  zones: [
    [_t('Base Alpha'), -34, 34, 32, 42],
    [_t('Base Bravo'), -34, 34, -42, -32],
    [_t('Rotatoria'), -8, 8, -8, 8],
    [_t('Birosca'), -5, 5, 3, 10],
    [_t('Quadra'), -6, 6, -16, -6],
    [_t('Trilho'), -3, 3, -28, 28],
    [_t('Mirante'), 18, 34, 8, 28],
    [_t('Mirante'), 18, 34, -28, -8],
    [_t('Galpao'), -34, -20, 28, 40],
    [_t('Galpao'), -34, -20, -40, -28],
    [_t('Barbearia'), -22, -12, -4, 4],
    [_t('Heliponto'), 22, 34, -6, 6],
  ],
  atmo: ATMO_CX,
};
