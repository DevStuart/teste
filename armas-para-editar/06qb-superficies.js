/* ==========================================================================
   SUPERFÍCIES REALISTAS : texturas procedurais (canvas) de normal e rugosidade para as matérias das armas
   A carregar DEPOIS de 06qa-visual.js. Sem imagens externas. Nada de geometria: só relevo e brilho de superfície.
     poly / polyM / taupe / fde / drab / olive / tan : grão fino de polímero injetado (leve casca de laranja)
     grip / rubber                                   : pontilhado de empunhadura (stippling) e borracha texturizada
     metal / dark / gray / blued / steel             : parkerização / anodização (grão fino) + riscos e desgaste irregular
     wood*                                           : veio longitudinal suave
   O mapeamento UV das formas (06jb-formes.js) repete a cada ~11 cm; GUN_SURF.repeat multiplica isso (grão mais fino).
   Cilindros usam UV padrão (0..1 na volta): o grão se estica um pouco neles, o que num ruído isotrópico quase não aparece.
   ========================================================================== */
const GUN_SURF = {
  size: 256,
  repeat: { poly: 5, grip: 7, metal: 6, wood: 2 },
  normal: { poly: 0.55, grip: 1.1, metal: 0.35, wood: 0.4 },
};
const _surfCache = {};
function _rng(seed) { let s = seed >>> 0 || 1; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }

/* Altura (0..1) por tipo, em um canvas size x size, ladrilhável (ruído modulado nas bordas por wrap) */
function _heightField(kind, N) {
  const h = new Float32Array(N * N), r = _rng(kind.length * 7919 + 17);
  const at = (x, y) => ((y + N) % N) * N + ((x + N) % N);
  if (kind === 'grip') {
    // pontilhado: pequenas calotas em grade levemente irregular
    const cell = 8;
    for (let cy = 0; cy < N / cell; cy++) for (let cx = 0; cx < N / cell; cx++) {
      const px = cx * cell + cell / 2 + (r() - 0.5) * 1.5, py = cy * cell + cell / 2 + (r() - 0.5) * 1.5, rad = cell * 0.42;
      for (let y = -cell; y <= cell; y++) for (let x = -cell; x <= cell; x++) {
        const d = Math.hypot(x - (px % 1), y - (py % 1)); if (d > rad) continue;
        const i = at(Math.floor(px) + x, Math.floor(py) + y); h[i] = Math.max(h[i], Math.sqrt(1 - (d / rad) ** 2));
      }
    }
  } else if (kind === 'wood') {
    for (let y = 0; y < N; y++) { const row = Math.sin(y * 0.35) * 0.5 + Math.sin(y * 0.11 + 1) * 0.3 + r() * 0.25; for (let x = 0; x < N; x++) h[at(x, y)] = row * 0.5 + 0.5; }
  } else {
    // ruído de valor em duas oitavas, ladrilhável
    const oct = (s, amp) => {
      const g = N / s, v = Array.from({ length: g * g }, r);
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        const fx = x / s, fy = y / s, x0 = Math.floor(fx), y0 = Math.floor(fy), tx = fx - x0, ty = fy - y0;
        const a = v[(y0 % g) * g + (x0 % g)], b = v[(y0 % g) * g + ((x0 + 1) % g)], c = v[(((y0 + 1) % g) * g) + (x0 % g)], d = v[(((y0 + 1) % g) * g) + ((x0 + 1) % g)];
        h[y * N + x] += amp * ((a * (1 - tx) + b * tx) * (1 - ty) + (c * (1 - tx) + d * tx) * ty);
      }
    };
    oct(2, kind === 'poly' ? 0.45 : 0.3); oct(4, 0.3); oct(8, kind === 'poly' ? 0.25 : 0.4);
  }
  return h;
}

/* Normal map (sobel) + rugosidade (canal verde) a partir do campo de altura */
function _makeSurface(kind) {
  if (_surfCache[kind]) return _surfCache[kind];
  if (typeof document === 'undefined') return null;
  const N = GUN_SURF.size, h = _heightField(kind, N), str = GUN_SURF.normal[kind] * 6;
  const cn = document.createElement('canvas'), cr = document.createElement('canvas'); cn.width = cn.height = cr.width = cr.height = N;
  const xn = cn.getContext('2d'), xr = cr.getContext('2d'), In = xn.createImageData(N, N), Ir = xr.createImageData(N, N), r = _rng(99);
  const H = (x, y) => h[((y + N) % N) * N + ((x + N) % N)];
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const dx = (H(x + 1, y) - H(x - 1, y)) * str, dy = (H(x, y + 1) - H(x, y - 1)) * str, l = Math.hypot(dx, dy, 1), i = (y * N + x) * 4;
    In.data[i] = (-dx / l * 0.5 + 0.5) * 255; In.data[i + 1] = (dy / l * 0.5 + 0.5) * 255; In.data[i + 2] = (1 / l * 0.5 + 0.5) * 255; In.data[i + 3] = 255;
    let rough = 0.82 + (H(x, y) - 0.5) * 0.3 + (r() - 0.5) * 0.08; // 1 = valor de base; o material multiplica
    Ir.data[i] = Ir.data[i + 2] = 255; Ir.data[i + 1] = Math.max(0, Math.min(1, rough)) * 255; Ir.data[i + 3] = 255;
  }
  if (kind === 'metal') { // riscos finos e claros (brilho do metal nu onde o revestimento gastou)
    for (let k = 0; k < 40; k++) { let x = r() * N, y = r() * N; const a = r() * Math.PI, len = 10 + r() * 40, c = Math.cos(a), s = Math.sin(a);
      for (let t = 0; t < len; t++) { const px = Math.floor(x + c * t) & (N - 1), py = Math.floor(y + s * t) & (N - 1); Ir.data[(py * N + px) * 4 + 1] = 120 + r() * 40; } }
  }
  xn.putImageData(In, 0, 0); xr.putImageData(Ir, 0, 0);
  const mk = (cv, rep) => { const t = new THREE.CanvasTexture(cv); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rep, rep); t.anisotropy = 4; t.colorSpace = THREE.NoColorSpace; return t; };
  const rep = GUN_SURF.repeat[kind];
  return (_surfCache[kind] = { normal: mk(cn, rep), rough: mk(cr, rep) });
}

const _SURF_OF = { poly: 'poly', polyM: 'poly', taupe: 'poly', fde: 'poly', drab: 'poly', olive: 'poly', tan: 'poly', grip: 'grip', rubber: 'grip',
  metal: 'metal', steel: 'metal', dark: 'metal', gray: 'metal', blued: 'metal', wood: 'wood', woodR: 'wood', woodB: 'wood' };
function surfaceGunMaterials(M) {
  if (!M || M.__surfaced) return M;
  for (const k in _SURF_OF) {
    const m = M[k], kind = _SURF_OF[k]; if (!m || !('normalMap' in m)) continue;
    const s = _makeSurface(kind); if (!s) continue;
    m.normalMap = s.normal; m.normalScale && m.normalScale.set(1, 1);
    if (kind !== 'wood') m.roughnessMap = s.rough; // roughness final = roughness * canal verde
    m.needsUpdate = true;
  }
  Object.defineProperty(M, '__surfaced', { value: true, enumerable: false });
  return M;
}
if (typeof gunMaterials === 'function' && !gunMaterials.__surf) {
  const _prev = gunMaterials;
  gunMaterials = function () { return surfaceGunMaterials(_prev.apply(this, arguments)); };
  gunMaterials.__surf = true; gunMaterials.__wrapped = _prev.__wrapped;
}
