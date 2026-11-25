/* ==========================================================================
   ACABAMENTO VISUAL DAS ARMAS : materiais PBR, reflexo de ambiente, tone mapping, flash de tiro
   A carregar DEPOIS de 06q-camos.js. Não altera nenhum modelo: só reajusta as matérias devolvidas por gunMaterials() (as variantes
   camufladas de camoMaterials() as clonam depois, então herdam o ajuste) e oferece setupGunLook() para o renderer.
   ========================================================================== */
const GUN_LOOK = {
  metal:  { metalness: 1.0,  roughness: 0.30, envMapIntensity: 1.4 },
  steel:  { metalness: 1.0,  roughness: 0.16, envMapIntensity: 1.8 },
  blued:  { metalness: 1.0,  roughness: 0.22, envMapIntensity: 1.6 },
  dark:   { metalness: 0.85, roughness: 0.42, envMapIntensity: 1.1 },
  gray:   { metalness: 0.8,  roughness: 0.38, envMapIntensity: 1.2 },
  poly:   { metalness: 0.0,  roughness: 0.62, envMapIntensity: 0.6 },
  polyM:  { metalness: 0.0,  roughness: 0.70, envMapIntensity: 0.5 },
  grip:   { metalness: 0.0,  roughness: 0.88, envMapIntensity: 0.3 },
  rubber: { metalness: 0.0,  roughness: 0.95, envMapIntensity: 0.2 },
  brass:  { metalness: 1.0,  roughness: 0.25, envMapIntensity: 1.5 },
};
function polishGunMaterials(M) {
  if (!M || M.__polished) return M;
  for (const k in GUN_LOOK) {
    const m = M[k]; if (!m) continue;
    Object.assign(m, GUN_LOOK[k]);
    if (k === 'brass' && m.color) m.color.set(0xc9a23a);
    if ((k === 'blued' || k === 'dark') && 'clearcoat' in m) { m.clearcoat = 0.4; m.clearcoatRoughness = 0.35; }
    m.needsUpdate = true;
  }
  Object.defineProperty(M, '__polished', { value: true, enumerable: false });
  return M;
}
// gunMaterials() é definida fora dos arquivos enviados: embrulhada aqui, o ajuste vale para todas as armas
if (typeof gunMaterials === 'function' && !gunMaterials.__wrapped) {
  const _raw = gunMaterials;
  gunMaterials = function () { return polishGunMaterials(_raw.apply(this, arguments)); };
  gunMaterials.__wrapped = true;
}

/* O mapa/HDRI do jogo já preenche scene.environment e vmScene.environment (01-core.js).
   Não trocar tone mapping global aqui: mudaria o look de todo o mapa. */
function setupGunLook() { /* no-op : reflexo vem do envMap da partida */ }

/* Flash de tiro: luz laranja curta na posição de info.muzzle (chamar a cada disparo) */
function gunMuzzleLight(info, scene) {
  const L = new THREE.PointLight(0xffa04a, 6, 3, 2);
  info.muzzle.getWorldPosition(L.position); scene.add(L);
  setTimeout(() => { scene.remove(L); L.dispose && L.dispose(); }, 50);
}
