/* ==========================================================================
   MODELO MÍNIMO DE MAPA NOVO — copie este arquivo para src/ e renomeie.
   Ordem alfabética: 02yo-... carrega depois de 02yn (French Dream) e antes de 02z-load.js.
   Passos:
     1. Copiar para src/02yo-meu-mapa.js (troque "meu-mapa" pelo id)
     2. Em src/02-map.js, adicionar em MAPS:
          { id: 'meumapa', name: 'Meu Mapa', tag: _t('Descrição curta'), ok: true,
            desc: _t('Texto do menu.') },
     3. Ajustar MAP_DEFS.meumapa abaixo (id deve bater com MAPS[].id)
     4. python build.py  →  abrir o jogo e escolher o mapa
   Convenções:
     - Espelho norte-sul: Alpha em +z, Bravo em -z (spawns Bravo = espelho automático)
     - Unidades em metros; bounds em inteiros (grade de navegação)
     - type: 'close' | 'mid' | 'open'  (escolhe armas dos bots)
     - Tudo é código: box(), DECOR.place(PF.xxx), wallOpen(), etc. Sem .glb
   ========================================================================== */

function meuMapaLevel() {
  const M = DECOR;
  // ----- chão (só visual; o chão implícito y=0 já colide) -----
  box('concrete', -20, 20, 0, 0.02, -30, 30, { collide: false, ao: false, tint: [0.55, 0.55, 0.52] });

  // ----- muro central com passagem (exemplo) -----
  box('concrete', -8, -2, 0, 3, -0.4, 0.4, { tint: [0.7, 0.7, 0.68] });
  box('concrete', 2, 8, 0, 3, -0.4, 0.4, { tint: [0.7, 0.7, 0.68] });

  // ----- espelho: duas caixas, uma em cada base -----
  for (const s of [1, -1]) {
    box('crate', -4, -2, 0, 1.2, s * 22 - 1, s * 22 + 1, { tint: [0.55, 0.4, 0.25] });
    // prefab reutilizável (ver 3-prefabs-compartilhados / docs-assets.md)
    M.place(PF.barrel(), 4, 0, s * 20, 0);
  }

  // ----- perímetro simples (impede cair fora) -----
  box('concrete', -20.4, -20, 0, 2.5, -30, 30, { tint: [0.45, 0.45, 0.42] });
  box('concrete', 20, 20.4, 0, 2.5, -30, 30, { tint: [0.45, 0.45, 0.42] });
  box('concrete', -20, 20, 0, 2.5, -30.4, -30, { tint: [0.45, 0.45, 0.42] });
  box('concrete', -20, 20, 0, 2.5, 30, 30.4, { tint: [0.45, 0.45, 0.42] });
}

MAP_DEFS.meumapa = {
  type: 'close', // 'close' | 'mid' | 'open'
  bounds: { x0: -20, x1: 20, z0: -30, z1: 30 },
  // só textures que existirem em assets/tex/ (veja docs-assets.md → Cartes / Surfaces)
  textures: ['concrete', 'asphalt', 'steel', 'wood', 'crate'],
  splat: { x0: -32, z0: -40, w: 64, d: 80, ppm: 4 },
  far: 200,
  art: { cam: [0, 8, 28], look: [0, 1, 0], fov: 55 }, // câmera da vignette do menu
  build() { meuMapaLevel(); },
  // Alpha (+z). Bravo = espelho em z automático
  spawns: [
    [-8, 24], [-4, 26], [0, 24], [4, 26], [8, 24],
    [-6, 28], [0, 28], [6, 28],
  ],
  // [x, y, z, lane 'L'|'M'|'E', hold?]
  poi: [
    [-6, 0, 10, 'L'], [-6, 0, -10, 'L'],
    [0, 0, 8, 'M'], [0, 0, -8, 'M'],
    [6, 0, 10, 'E'], [6, 0, -10, 'E'],
  ],
  // Domination: A perto Alpha, B centro, C perto Bravo
  dom: [[0, 16], [0, 0], [0, -16]],
  lane: (x) => (x < -4 ? 'L' : x > 4 ? 'E' : 'M'),
  sniper: [0, 0, 10],
  coverZ: 22,
  heli: [18, 28],
  cam: 28,
  surface: () => 'concrete',
  zones: [
    [_t('Base Alpha'), -20, 20, 20, 30],
    [_t('Base Bravo'), -20, 20, -30, -20],
    [_t('Centro'), -20, 20, -8, 8],
  ],
  atmo: ATMO_MEU,
};

/* Ambiance: sempre Object.assign({}, ATMO_DEFAULT, { ... }) — ver ATMO_FD em 02yn-french-dream.js */
const ATMO_MEU = Object.assign({}, ATMO_DEFAULT, {
  sun: [0.4, 0.7, -0.4], sunColor: 0xffe2b8, sunI: 1.8, vmSun: 0xffe2b8,
  fog: [0.7, 0.74, 0.78], fogD: 0.008,
  hemi: [0xb8c8e0, 0x6a5a48, 0.75], vmHemi: [0xb8c8e0, 0x6a5a48],
  envGround: 0x555555, hdri: 'park', // park | sky | sunset (assets/vendor/hdri)
  bloom: [0.4, 0.55, 0.9], aoFloor: 0.35,
});
