/* ==========================================================================
   MODÈLES PROVISÓRIOS : armas novas (AUG, P90, M249, G36C, Mossberg 590, FAL Para, ARAD)
   reutilizam o build 3D de uma arma parecida até terem malha própria.
   Sem isto, GUN_MODELS[model] fica undefined e o load da partida quebra em .fam.
   ========================================================================== */
(function () {
  const ALIAS = [
    ['aug', 'famas'],
    ['p90', 'mp7'],
    ['m249', 'scarh'],
    ['g36c', 'm4'],
    ['mossberg590', 'rem870'],
    ['falpara', 'ak47'],
    ['arad', 'm4'],
  ];
  for (const [id, src] of ALIAS) {
    const S = GUN_MODELS[src];
    if (!S) throw new Error('modelo base ausente para alias: ' + src + ' → ' + id);
    defineGun(id, S.fam, S.build);
  }
})();
