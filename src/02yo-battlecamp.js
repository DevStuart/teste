/* ==========================================================================
   BATTLE CAMP : acampamento militar abandonado no deserto tropical.
   Mapa aberto grande (~110 x 120 m), type 'open', com RING (zona que mata fora do círculo).
   Tema: areia, palmeiras, tendas, containers, posto avançado, pista improvisada.
   Espelho norte-sul: Alpha +z, Bravo -z.
   Id: battlecamp  |  Nome de menu: Battle Camp
   ========================================================================== */

const BC = {
  T: 0.3,
  end: 58,
  halfW: 54,
};

/* Deserto tropical: sol alto e quente, névoa arenosa, céu claro com calor */
const ATMO_BC = Object.assign({}, ATMO_DEFAULT, {
  sun: [0.35, 0.78, -0.25], sunColor: 0xffe4b0, sunI: 2.1, vmSun: 0xffe4b0,
  fog: [0.82, 0.76, 0.62], fogD: 0.0055, fogH: [18, 0], fogSun: 0.45,
  hemi: [0xe8d8b8, 0x8a7050, 0.85], vmHemi: [0xe8d8b8, 0x8a7050],
  sky: {
    zen: [0.35, 0.55, 0.85], mid: [0.55, 0.7, 0.9], hor: [0.95, 0.82, 0.6],
    gnd: [0.55, 0.48, 0.35], glow: [1.0, 0.9, 0.7], halo: [1.0, 0.95, 0.8],
    disk: [14, 12, 10], cloudLo: [0.7, 0.72, 0.75], cloudHi: [1.05, 1.02, 0.98],
    cloud: [0.75, 0.9, 0.55],
    ridge: [0, 0, 0], ridgeSnow: [1, 1, 1], ridgeRock: [0.5, 0.5, 0.5],
  },
  envGround: 0x8a7348, hdri: 'sunset',
  bounce: [1.05, 1.0, 0.9], dust: [0.85, 0.75, 0.55], motes: [1.0, 0.95, 0.85],
  grade: { lo: [1.02, 0.98, 0.92], hi: [1.05, 1.0, 0.95], exp: 1.05, sat: 0.95, con: 1.05 },
  rays: [1.0, 0.92, 0.75], bloom: [0.4, 0.55, 0.9], aoFloor: 0.28,
  raysThr: 2.0, raysCap: 7, winLit: 0.08, wind: [40, 0.12],
});

function battleCampLevel() {
  const M = DECOR;
  const R = rngOf(9021);
  SR.rng = R; // car() / props que leem SR.rng (02s-sable.js)

  // ----- chão visual (areia) ; colisão = solo implícito y=0 -----
  box('sand', -BC.halfW - 2, BC.halfW + 2, 0, 0.02, -62, 62, {
    collide: false, ao: false, tint: [0.92, 0.82, 0.62],
  });

  // ----- pista improvisada (asfalto rachado) no eixo central -----
  box('asphalt', -6, 6, 0, 0.03, -40, 40, {
    collide: false, ao: false, tint: [0.32, 0.32, 0.3],
  });
  M.save().color([0.9, 0.88, 0.7]).local(1); M.cls = 1;
  for (let z = -36; z <= 36; z += 8) {
    M.boxB('paint', -0.15, 0.15, 0.031, 0.04, z - 1.2, z + 1.2);
  }
  M.restore();

  bcHQ(0, 0);
  bcContainerYard(22, 0, R);
  bcBazaar(-22, 0, R);

  for (const s of [1, -1]) {
    bcOutpost(s, R);
    bcTentCamp(s, R);
    bcPalmCluster(-18, s * 28, R);
    bcPalmCluster(16, s * 32, R);
    bcPalmCluster(0, s * 48, R);
    bcSandbagLine(-8, s * 18, 8, s * 18, 2);
    bcSandbagLine(10, s * 12, 18, s * 12, 1);
  }

  bcWaterTower(-38, 8);
  bcAntenna(40, -6);

  vehicle(PF.truck('army', { load: 'tarp', dust: true }), -4, 0, 14, Math.PI * 0.15, {
    tint: [0.45, 0.48, 0.38],
  });
  vehicle(PF.truck('box', { dust: true }), 8, 0, -18, -Math.PI * 0.4, {
    tint: [0.7, 0.55, 0.35],
  });
  car(-12, 6, Math.PI * 0.6, [0.55, 0.35, 0.2], true, 'suv');
  car(14, -8, -Math.PI * 0.2, [0.3, 0.32, 0.28], true, 'offroad');

  for (let i = 0; i < 18; i++) {
    const x = R.range(-40, 40), z = R.range(-50, 50);
    if (Math.abs(x) < 8 && Math.abs(z) < 10) continue;
    if (R() < 0.45) M.place(PF.crate(R.range(0.9, 1.2)), x, 0, z, R() * TAU, {
      tint: [0.55, 0.4, 0.25],
    });
    else M.place(PF.barrel(), x, 0, z, R() * TAU, {
      tint: R.pick([[0.4, 0.45, 0.35], [0.55, 0.25, 0.12], [0.35, 0.35, 0.38]]),
    });
  }

  const edge = BC.halfW + 1.5;
  for (const [x0, x1, z0, z1] of [
    [-edge - 0.4, -edge, -62, 62],
    [edge, edge + 0.4, -62, 62],
    [-edge, edge, -62.4, -62],
    [-edge, edge, 62, 62.4],
  ]) {
    box('concrete', x0, x1, 0, 1.2, z0, z1, { tint: [0.55, 0.5, 0.42], m: 'concrete' });
  }
}

function bcHQ(cx, cz) {
  const M = DECOR;
  box('concrete', cx - 9, cx + 9, 0, 0.15, cz - 7, cz + 7, { tint: [0.62, 0.6, 0.55] });
  box('plaster', cx - 6, cx + 6, 0.15, 3.4, cz - 4.5, cz + 4.5, {
    tint: [0.88, 0.84, 0.74],
  });
  M.save().color([0.15, 0.16, 0.18]).world(1); M.cls = 1;
  for (const z of [cz - 4.52, cz + 4.52]) {
    M.boxB('dark', cx - 1.2, cx + 1.2, 0.4, 2.6, z - 0.02, z + 0.02);
  }
  for (const x of [cx - 6.02, cx + 6.02]) {
    M.boxB('dark', x - 0.02, x + 0.02, 1.0, 2.4, cz - 1.5, cz + 1.5);
  }
  M.restore();
  box('concrete', cx - 6.3, cx + 6.3, 3.4, 3.55, cz - 4.8, cz + 4.8, {
    tint: [0.5, 0.5, 0.48],
  });
  for (const x of [-4, -2, 0, 2, 4]) {
    M.place(PF.sandbagFat(), cx + x, 0.15, cz - 5.2, 0);
  }
  M.place(PF.generator(), cx + 7.5, 0, cz + 2, Math.PI / 2);
  M.save().move(cx, 3.55, cz).color([0.4, 0.42, 0.44]).local(1);
  M.cyl('steel', 0.04, 4.5, 6);
  M.restore();
}

function bcContainerYard(cx, cz, R) {
  const M = DECOR;
  const colors = [
    [0.2, 0.35, 0.55], [0.55, 0.2, 0.15], [0.7, 0.65, 0.4], [0.25, 0.45, 0.3],
  ];
  const slots = [
    [0, 0, 0], [0, 0, 7], [7, 0, 0], [7, 0, 7],
    [-7, 0, 3.5], [3.5, 2.6, 3.5],
  ];
  slots.forEach(([dx, dy, dz], i) => {
    M.save().move(cx + dx, dy, cz + dz).rotY(i % 2 ? Math.PI / 2 : 0);
    M.put(PF.container(i === 2), { tint: colors[i % colors.length] });
    M.restore();
  });
  for (let k = 0; k < 6; k++) {
    M.place(PF.crate(), cx + R.range(-10, 10), 0, cz + R.range(-10, 10), R() * TAU);
  }
}

function bcBazaar(cx, cz, R) {
  const M = DECOR;
  for (const [dx, dz, ry] of [
    [-4, -3, 0.2], [0, -4, 0], [4, -2, -0.3], [-3, 3, Math.PI + 0.1], [3, 4, Math.PI],
  ]) {
    M.place(PF.stall(R.pick([
      [0.7, 0.25, 0.15], [0.2, 0.45, 0.4], [0.85, 0.7, 0.35], [0.3, 0.35, 0.55],
    ])), cx + dx, 0, cz + dz, ry);
  }
  for (let i = 0; i < 5; i++) {
    M.dyn('jar', cx + R.range(-5, 5), 0, cz + R.range(-5, 5), R() * TAU, { s: R.range(0.7, 1.1) });
  }
}

function bcOutpost(s, R) {
  const M = DECOR;
  const Z = (z) => z * s;
  box('plaster', -28, -18, 0, 2.8, Z(38), Z(46), { tint: [0.9, 0.86, 0.76] });
  box('concrete', -28.2, -17.8, 2.8, 2.95, Z(37.8), Z(46.2), { tint: [0.48, 0.48, 0.46] });
  M.save().move(-23, 0, Z(42)).color([0.45, 0.4, 0.35]).local(1);
  M.cyl('wood', 0.12, 6.5, 8);
  M.boxB('wood', -1.2, 1.2, 6.5, 6.7, -1.2, 1.2);
  M.boxB('wood', -1.15, 1.15, 6.7, 8.2, -1.15, 1.15, { skip: 'y' });
  M.restore();
  DECOR.col(-24.2, -21.8, 0, 8.2, Z(40.8), Z(43.2), 'wood');
  M.place(PF.tent(), -12, 0, Z(42), s > 0 ? 0 : Math.PI);
  for (let i = 0; i < 5; i++) {
    M.place(PF.sandbagFat(), -30 + i * 0.65, 0, Z(36.5), 0);
  }
}

function bcTentCamp(s, R) {
  const M = DECOR;
  const Z = (z) => z * s;
  const positions = [
    [8, 36], [14, 38], [20, 35], [10, 44], [18, 46],
  ];
  positions.forEach(([x, z], i) => {
    M.place(PF.tent(), x, 0, Z(z), (i % 2 ? 0.15 : -0.1) + (s < 0 ? Math.PI : 0));
  });
  M.save().move(15, 0, Z(41)).color([0.35, 0.32, 0.28]).local(1);
  for (let k = 0; k < 8; k++) {
    const a = (k / 8) * TAU;
    M.boxB('stone', Math.cos(a) * 0.7 - 0.12, Math.cos(a) * 0.7 + 0.12, 0, 0.18,
      Math.sin(a) * 0.7 - 0.12, Math.sin(a) * 0.7 + 0.12, { bevel: 0.03 });
  }
  M.restore();
}

function bcSandbagLine(x0, z0, x1, z1, rows) {
  const M = DECOR;
  const L = Math.hypot(x1 - x0, z1 - z0);
  const n = Math.max(2, Math.round(L / 0.65));
  for (let row = 0; row < rows; row++) {
    for (let i = 0; i < n; i++) {
      const t = i / Math.max(1, n - 1);
      const x = x0 + (x1 - x0) * t + (row % 2) * 0.15;
      const z = z0 + (z1 - z0) * t;
      M.place(PF.sandbagFat(), x, row * 0.22, z, Math.atan2(x1 - x0, z1 - z0));
    }
  }
}

function bcPalmCluster(cx, cz, R) {
  const M = DECOR;
  const n = 3 + (R() * 3 | 0);
  for (let i = 0; i < n; i++) {
    const a = R() * TAU, d = R.range(1.5, 5);
    M.place(PF.palm(R.range(5.5, 9), 100 + i * 17 + (Math.abs(cx * 3 + cz) | 0)),
      cx + Math.cos(a) * d, 0, cz + Math.sin(a) * d, R() * TAU, { nocol: true });
  }
}

function bcWaterTower(x, z) {
  const M = DECOR;
  M.save().move(x, 0, z).color([0.72, 0.7, 0.65]).local(1);
  M.cyl('concrete', 1.4, 12, 12, { r1: 1.1 });
  M.save().move(0, 12, 0);
  M.lathe('concrete', [[1.1, 0], [3.2, 1.5], [3.4, 4], [3.2, 4.5], [0, 4.8]], 16);
  M.restore();
  M.restore();
  DECOR.col(x - 1.5, x + 1.5, 0, 12, z - 1.5, z + 1.5, 'concrete');
}

function bcAntenna(x, z) {
  const M = DECOR;
  M.save().move(x, 0, z).color([0.4, 0.42, 0.44]).local(1);
  M.cyl('steel', 0.08, 18, 6);
  for (const y of [8, 12, 16]) {
    M.boxB('steel', -1.8, 1.8, y, y + 0.08, -0.06, 0.06);
  }
  M.restore();
  DECOR.col(x - 0.4, x + 0.4, 0, 18, z - 0.4, z + 0.4, 'metal');
}

MAP_DEFS.battlecamp = {
  type: 'open',
  bounds: { x0: -54, x1: 54, z0: -60, z1: 60 },
  ring: { r: 72, hard: 80, t: 12 },
  textures: [
    'sand', 'plaster', 'concrete', 'asphalt', 'steel', 'wood', 'crate',
    'canvas', 'burlap', 'timber', 'paintwood', 'stone', 'palmbark',
  ],
  splat: { x0: -72, z0: -80, w: 144, d: 160, ppm: 2.5 },
  far: 420,
  art: { cam: [0, 14, 55], look: [0, 2, 0], fov: 58 },
  landmarks: [
    [0, 8, 0, 'QG'],
    [-38, 17, 8, "torre d'água"],
    [40, 18, -6, 'antena'],
  ],
  build() { battleCampLevel(); },
  spawns: [
    [-30, 50], [-18, 52], [-6, 50], [6, 52], [18, 50], [30, 52],
    [-36, 44], [-24, 46], [-12, 44], [0, 46], [12, 44], [24, 46], [36, 44],
    [-20, 54], [10, 54],
  ],
  poi: [
    [-22, 0, 0, 'L'], [-28, 0, 42, 'L'], [-28, 0, -42, 'L'], [-38, 0, 8, 'L'],
    [0, 0, 0, 'M', 1], [0, 0, 20, 'M'], [0, 0, -20, 'M'], [0, 0, 42, 'M'], [0, 0, -42, 'M'],
    [22, 0, 0, 'E'], [22, 0, 20, 'E'], [-12, 0, 42, 'E'], [14, 0, -38, 'E'], [40, 0, -6, 'E'],
  ],
  dom: [[-8, 36], [0, 0], [-8, -36]],
  mecha: [[0, 0], [-22, 0], [22, 0], [0, 42]],
  lane: (x) => (x < -12 ? 'L' : x > 12 ? 'E' : 'M'),
  sniper: [-23, 6.7, 42],
  coverZ: 48,
  heli: [40, 50],
  cam: 55,
  surface: (p) => {
    if (Math.abs(p.x) < 6 && Math.abs(p.z) < 40) return 'concrete';
    if (Math.abs(p.x) < 9 && Math.abs(p.z) < 7) return 'concrete';
    return 'sand';
  },
  zones: [
    [_t('Base Alpha'), -54, 54, 45, 60],
    [_t('Base Bravo'), -54, 54, -60, -45],
    [_t('QG central'), -10, 10, -8, 8],
    [_t('Bazar'), -32, -12, -10, 10],
    [_t('Conteneurs'), 12, 32, -12, 12],
    [_t('Avant-poste nord'), -32, -14, 34, 48],
    [_t('Avant-poste sud'), -32, -14, -48, -34],
    [_t('Campement nord'), 4, 26, 32, 50],
    [_t('Campement sud'), 4, 26, -50, -32],
    [_t('Piste'), -8, 8, -40, 40],
  ],
  atmo: ATMO_BC,
};
