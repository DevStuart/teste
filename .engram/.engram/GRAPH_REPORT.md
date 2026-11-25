# Graph Report - .  (2026-11-25)

## Corpus Check
- Large corpus: 400 files · ~1.262.768 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 9443 nodes · 15370 edges · 400 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: contains: 6246 · calls: 6176 · method: 2596 · rationale_for: 203 · imports: 78 · imports_from: 71


## Input Scope
- Requested: tracked
- Resolved: tracked (source: cli)
- Included files: 400 · Candidates: 1152
- Excluded: 414 untracked · 1118 ignored · 0 sensitive · 0 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `33d4a74`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `re` - 109 edges
2. `re` - 109 edges
3. `qt` - 91 edges
4. `qt` - 91 edges
5. `Lt` - 88 edges
6. `Lt` - 88 edges
7. `openGame()` - 69 edges
8. `ne` - 64 edges
9. `ne` - 64 edges
10. `si` - 47 edges

## Surprising Connections (you probably didn't know these)
- `Prefab` --calls--> `Maker`  [EXTRACTED]
  mapas-para-criar/0-infra/02a-kit.js → mapas-para-criar/0-infra/02a-kit.js  _Bridges community 216 → community 139_
- `updateRigs()` --calls--> `initNadeRig()`  [EXTRACTED]
  armas-para-editar/PARA_CLAUDE/1-materiais-e-helpers/06c-models.js → armas-para-editar/PARA_CLAUDE/1-materiais-e-helpers/06c-models.js  _Bridges community 228 → community 246_
- `dynDown()` --calls--> `clamp()`  [EXTRACTED]
  armas-para-editar/PARA_CLAUDE/2-renderer-cena/01-core.js → armas-para-editar/PARA_CLAUDE/2-renderer-cena/01-core.js  _Bridges community 260 → community 162_
- `onResize()` --calls--> `viewSync()`  [EXTRACTED]
  armas-para-editar/PARA_CLAUDE/2-renderer-cena/01-core.js → armas-para-editar/PARA_CLAUDE/2-renderer-cena/01-core.js  _Bridges community 162 → community 187_
- `smoothstep()` --calls--> `clamp()`  [EXTRACTED]
  armas-para-editar/PARA_CLAUDE/2-renderer-cena/01-core.js → armas-para-editar/PARA_CLAUDE/2-renderer-cena/01-core.js  _Bridges community 390 → community 162_

## Communities

### Community 0 - "Community 0"
Cohesion: 0.01
Nodes (79): _activateAction(), _addInactiveAction(), _addInactiveBinding(), as(), _bindAction(), bn(), br(), clipAction() (+71 more)

### Community 1 - "Community 1"
Cohesion: 0.01
Nodes (79): _activateAction(), _addInactiveAction(), _addInactiveBinding(), as(), _bindAction(), bn(), br(), clipAction() (+71 more)

### Community 2 - "Community 2"
Cohesion: 0.05
Nodes (79): AU, auAfford(), auOut(), clack(), dspGun(), dspMix(), dspNoise(), dspRng() (+71 more)

### Community 3 - "Community 3"
Cohesion: 0.02
Nodes (3): go, oo, re

### Community 4 - "Community 4"
Cohesion: 0.02
Nodes (3): go, oo, re

### Community 5 - "Community 5"
Cohesion: 0.02
Nodes (63): ATMO_DEFAULT, AUTO_LADDER, camera, canvas, CAP, CSM_HW, DECK, DESYNC (+55 more)

### Community 6 - "Community 6"
Cohesion: 0.06
Nodes (87): af(), _amort(), aplatir(), bombes(), boucler(), build(), chatterbox_correctif(), compresser() (+79 more)

### Community 7 - "Community 7"
Cohesion: 0.02
Nodes (63): ATMO_DEFAULT, AUTO_LADDER, camera, canvas, CAP, CSM_HW, DECK, DESYNC (+55 more)

### Community 8 - "Community 8"
Cohesion: 0.04
Nodes (20): bl, constructor(), Di, Do, ee, el(), ie, _initMemoryManager() (+12 more)

### Community 9 - "Community 9"
Cohesion: 0.04
Nodes (20): bl, constructor(), Di, Do, ee, el(), ie, _initMemoryManager() (+12 more)

### Community 10 - "Community 10"
Cohesion: 0.03
Nodes (28): al(), Bs, cl(), dl(), hl(), il(), jo(), kl (+20 more)

### Community 11 - "Community 11"
Cohesion: 0.03
Nodes (28): al(), Bs, cl(), dl(), hl(), il(), jo(), kl (+20 more)

### Community 12 - "Community 12"
Cohesion: 0.03
Nodes (51): json, { openGame }, E, fs, { openGame, HERE }, OUT, path, { openGame } (+43 more)

### Community 13 - "Community 13"
Cohesion: 0.03
Nodes (4): gc, jt(), qt, ta

### Community 14 - "Community 14"
Cohesion: 0.03
Nodes (9): ns(), qs, sa, setDirection(), setFromCamera(), si, updateMatrixWorld(), Xc (+1 more)

### Community 15 - "Community 15"
Cohesion: 0.03
Nodes (4): gc, jt(), qt, ta

### Community 16 - "Community 16"
Cohesion: 0.03
Nodes (9): ns(), qs, sa, setDirection(), setFromCamera(), si, updateMatrixWorld(), Xc (+1 more)

### Community 17 - "Community 17"
Cohesion: 0.03
Nodes (4): bo, lo, Lt, Po

### Community 18 - "Community 18"
Cohesion: 0.03
Nodes (4): bo, lo, Lt, Po

### Community 19 - "Community 19"
Cohesion: 0.03
Nodes (72): _aB, _aD, _aE, _af, _aG, _aH, _ahM, _ahR (+64 more)

### Community 20 - "Community 20"
Cohesion: 0.07
Nodes (72): after(), ATMO_TEPHRA, build(), GROUND_TEPHRA, tephraAshfall(), tephraAshUpdate(), tephraBackdrop(), tephraBase() (+64 more)

### Community 21 - "Community 21"
Cohesion: 0.07
Nodes (72): after(), ATMO_TEPHRA, build(), GROUND_TEPHRA, tephraAshfall(), tephraAshUpdate(), tephraBackdrop(), tephraBase() (+64 more)

### Community 22 - "Community 22"
Cohesion: 0.08
Nodes (67): a_niveau(), af(), aigus(), _antum(), boucle_mono(), build(), circ(), convolue() (+59 more)

### Community 23 - "Community 23"
Cohesion: 0.06
Nodes (57): hangBlast(), hangCenter(), hangNetHit(), hangPush(), HANGS, hangShot(), _hg1, _hg2 (+49 more)

### Community 24 - "Community 24"
Cohesion: 0.04
Nodes (17): cc, er(), gs(), Hc, ia, It(), Js(), ks() (+9 more)

### Community 25 - "Community 25"
Cohesion: 0.04
Nodes (17): cc, er(), gs(), Hc, ia, It(), Js(), ks() (+9 more)

### Community 26 - "Community 26"
Cohesion: 0.03
Nodes (56): _fo, _fo2, _fo3, _fq, _fq2, _fq3, G_CAP, G_CYL12 (+48 more)

### Community 27 - "Community 27"
Cohesion: 0.09
Nodes (63): af(), aligne_variantes(), armes(), attaque(), build(), chutes(), corps(), coupe_bandes() (+55 more)

### Community 28 - "Community 28"
Cohesion: 0.03
Nodes (56): _fo, _fo2, _fo3, _fq, _fq2, _fq3, G_CAP, G_CYL12 (+48 more)

### Community 29 - "Community 29"
Cohesion: 0.08
Nodes (62): _aa(), af(), attaque(), balles(), build(), claquement(), corps(), coupe() (+54 more)

### Community 30 - "Community 30"
Cohesion: 0.05
Nodes (23): bindSkeletons(), ea, fc, fs(), hn, load(), loadAsync(), mc (+15 more)

### Community 31 - "Community 31"
Cohesion: 0.05
Nodes (23): bindSkeletons(), ea, fc, fs(), hn, load(), loadAsync(), mc (+15 more)

### Community 32 - "Community 32"
Cohesion: 0.06
Nodes (54): AIR, aircraftGeometry(), airPattern(), airstrike(), buildSatelliteMap(), clearAircraft(), drawTabletScreen(), drawTacMap() (+46 more)

### Community 33 - "Community 33"
Cohesion: 0.06
Nodes (17): an, bt(), cn, Gn, jn(), Ki, Nt(), Pn() (+9 more)

### Community 34 - "Community 34"
Cohesion: 0.06
Nodes (17): an, bt(), cn, Gn, jn(), Ki, Nt(), Pn() (+9 more)

### Community 35 - "Community 35"
Cohesion: 0.06
Nodes (51): allied(), chooseSpawn(), DEATH_LOG, DOM, DOM_COL, DOM_MM, domBuild(), domChanged() (+43 more)

### Community 36 - "Community 36"
Cohesion: 0.05
Nodes (4): At(), bi, Et(), ra

### Community 37 - "Community 37"
Cohesion: 0.05
Nodes (4): At(), bi, Et(), ra

### Community 38 - "Community 38"
Cohesion: 0.09
Nodes (52): adoucit(), af(), ajoute(), build(), compresse(), corps(), couche_grave(), dbg() (+44 more)

### Community 39 - "Community 39"
Cohesion: 0.04
Nodes (3): fn, Rn(), Rt

### Community 40 - "Community 40"
Cohesion: 0.04
Nodes (3): fn, Rn(), Rt

### Community 41 - "Community 41"
Cohesion: 0.08
Nodes (45): armW(), gBand(), gBox(), gCyl(), _ge, _gm, gMat(), _gq (+37 more)

### Community 42 - "Community 42"
Cohesion: 0.05
Nodes (40): buildGunTextures(), buildWorldGun(), bx(), cz(), env(), G_BOX, G_CYL, G_CYL_O (+32 more)

### Community 43 - "Community 43"
Cohesion: 0.11
Nodes (48): af(), attaque(), boutons(), _bsb(), build(), couche(), coupe(), dbg() (+40 more)

### Community 44 - "Community 44"
Cohesion: 0.05
Nodes (40): buildGunTextures(), buildWorldGun(), bx(), cz(), env(), G_BOX, G_CYL, G_CYL_O (+32 more)

### Community 45 - "Community 45"
Cohesion: 0.05
Nodes (43): _bk, BOLT_CYCLE, HAND_POSE_IDS, INSPECT_LONG, INSPECT_PISTOL, keyM(), keyN(), keyStep() (+35 more)

### Community 46 - "Community 46"
Cohesion: 0.08
Nodes (39): dArmor(), dCurve(), dExtrude(), dFlat(), dGoggles(), dHem(), dHorn(), dPlate() (+31 more)

### Community 47 - "Community 47"
Cohesion: 0.08
Nodes (45): after(), alleyArch(), ATMO_SABLE, backdrop(), barrel(), BEAMS, build(), buildLevel() (+37 more)

### Community 48 - "Community 48"
Cohesion: 0.05
Nodes (6): EffectComposer, FullScreenQuad, ShaderPass, SimplexNoise, SSAOPass, UnrealBloomPass

### Community 49 - "Community 49"
Cohesion: 0.05
Nodes (6): EffectComposer, FullScreenQuad, ShaderPass, SimplexNoise, SSAOPass, UnrealBloomPass

### Community 50 - "Community 50"
Cohesion: 0.04
Nodes (40): _ag, _ar, _eu, _fpG, _ft, _fyW, _gl, _gripLw (+32 more)

### Community 51 - "Community 51"
Cohesion: 0.08
Nodes (44): renderSkins(), SK_AIM, SK_FAN, SK_POSE, SK_TINT, _skC, SKIN_ALL, skinAcct() (+36 more)

### Community 52 - "Community 52"
Cohesion: 0.05
Nodes (1): ne

### Community 53 - "Community 53"
Cohesion: 0.05
Nodes (1): ne

### Community 54 - "Community 54"
Cohesion: 0.08
Nodes (33): archFill(), archGeom(), awningStriped(), balcony(), brokenWindow(), building(), casing(), drainPipe() (+25 more)

### Community 55 - "Community 55"
Cohesion: 0.08
Nodes (33): archFill(), archGeom(), awningStriped(), balcony(), brokenWindow(), building(), casing(), drainPipe() (+25 more)

### Community 56 - "Community 56"
Cohesion: 0.11
Nodes (38): GPU_EV, GPU_LEAN_OF, GPU_PAGE, gpuAudioLine(), gpuAutoRetry(), gpuBarrier(), gpuCompileScene(), gpuDrawScan() (+30 more)

### Community 57 - "Community 57"
Cohesion: 0.11
Nodes (38): GPU_EV, GPU_LEAN_OF, GPU_PAGE, gpuAudioLine(), gpuAutoRetry(), gpuBarrier(), gpuCompileScene(), gpuDrawScan() (+30 more)

### Community 58 - "Community 58"
Cohesion: 0.10
Nodes (38): adsLookMul(), applyCamera(), busy(), camFwd(), cookNade(), curW(), giveLoadout(), inspectWeapon() (+30 more)

### Community 59 - "Community 59"
Cohesion: 0.08
Nodes (38): ATMO_SIMOUN, build(), GROUND_SIMOUN, simounLevel(), SM_CALM, SM_DRIFTS, SM_DUNES, SM_ERG (+30 more)

### Community 60 - "Community 60"
Cohesion: 0.10
Nodes (31): _cc, _cl, CLOTH, CLOTH_BREEZE, CLOTH_BREEZE_DEF, CLOTH_TPL, clothAttach(), clothBones() (+23 more)

### Community 61 - "Community 61"
Cohesion: 0.05
Nodes (33): BOT_ARM, BOT_NAMES, BOT_STATE, BOT_WEAPON_MIX, BOT_WEAPONS, DIFF, entities, FLASH (+25 more)

### Community 62 - "Community 62"
Cohesion: 0.10
Nodes (38): adsLookMul(), applyCamera(), busy(), camFwd(), cookNade(), curW(), giveLoadout(), inspectWeapon() (+30 more)

### Community 63 - "Community 63"
Cohesion: 0.07
Nodes (30): MIG, NET, NET_PAGES, NET_RESUME_WAIT, NET_WSPECIAL, netCodeNow(), netCopy(), NETD (+22 more)

### Community 64 - "Community 64"
Cohesion: 0.10
Nodes (38): netInLobby(), SRV, SRV_PAGES, SRV_PHASES, srvChief(), srvClock(), srvConnect(), srvCreate() (+30 more)

### Community 65 - "Community 65"
Cohesion: 0.08
Nodes (4): dh, _lendControlInterpolant(), _takeBackControlInterpolant(), yl

### Community 66 - "Community 66"
Cohesion: 0.06
Nodes (7): es, je, rs(), ss, ts, ws, xi

### Community 67 - "Community 67"
Cohesion: 0.08
Nodes (4): dh, _lendControlInterpolant(), _takeBackControlInterpolant(), yl

### Community 68 - "Community 68"
Cohesion: 0.06
Nodes (7): es, je, rs(), ss, ts, ws, xi

### Community 69 - "Community 69"
Cohesion: 0.07
Nodes (32): box(), boxC(), BRIDGES, ceilingAbove(), COL, collideCircle(), CURMAP, groundHeight() (+24 more)

### Community 70 - "Community 70"
Cohesion: 0.07
Nodes (32): box(), boxC(), BRIDGES, ceilingAbove(), COL, collideCircle(), CURMAP, groundHeight() (+24 more)

### Community 71 - "Community 71"
Cohesion: 0.10
Nodes (37): after(), ATMO_STRATUS, build(), GROUND_STRATUS, stAirship(), stAllBridges(), stAnimate(), stBanner() (+29 more)

### Community 72 - "Community 72"
Cohesion: 0.10
Nodes (34): AC_ERR, AC_HM(), AC_PCT(), ACCT, acctAcceptHtml(), acctApi(), acctApply(), acctAvatar() (+26 more)

### Community 73 - "Community 73"
Cohesion: 0.06
Nodes (4): add(), getValue(), rh, uh

### Community 74 - "Community 74"
Cohesion: 0.06
Nodes (4): add(), getValue(), rh, uh

### Community 75 - "Community 75"
Cohesion: 0.07
Nodes (26): pondAdd(), PONDAREAS, pondGeometry(), PONDS, poolAdd(), poolAt(), POOLS, WATER (+18 more)

### Community 76 - "Community 76"
Cohesion: 0.09
Nodes (36): callHeli(), HELI, HELI_HIT, HELI_ROTOR, heliActive(), heliApplyMesh(), heliBrain(), heliBurstStep() (+28 more)

### Community 77 - "Community 77"
Cohesion: 0.09
Nodes (35): DRONES, _fpA, _fpB, _fpC, _fpN, FPV, FPV_BOOM, fpvAi() (+27 more)

### Community 78 - "Community 78"
Cohesion: 0.11
Nodes (33): PAD, PAD_ACCEL, PAD_CURVES, PAD_HELP, PAD_KEYS, PAD_LAYOUTS, PAD_TRIG, padAction() (+25 more)

### Community 79 - "Community 79"
Cohesion: 0.07
Nodes (35): credit(), cut(), db(), fade(), fetch(), fetch_all(), ff(), load() (+27 more)

### Community 80 - "Community 80"
Cohesion: 0.07
Nodes (4): _a, De, so(), ya()

### Community 81 - "Community 81"
Cohesion: 0.07
Nodes (4): _a, De, so(), ya()

### Community 82 - "Community 82"
Cohesion: 0.07
Nodes (26): ATT, ATT_BUILD, ATT_FLAGS, ATT_FX, ATT_GROUP, ATT_GROUP_NAMES, ATT_GROUP_SLOTS, ATT_GROUPS (+18 more)

### Community 83 - "Community 83"
Cohesion: 0.07
Nodes (26): ATT, ATT_BUILD, ATT_FLAGS, ATT_FX, ATT_GROUP, ATT_GROUP_NAMES, ATT_GROUP_SLOTS, ATT_GROUPS (+18 more)

### Community 84 - "Community 84"
Cohesion: 0.07
Nodes (23): alpineRoof(), alpineRoofLocal(), chalet(), chaletFace(), CONIF, DEC2, decal2Quad(), farChalet() (+15 more)

### Community 85 - "Community 85"
Cohesion: 0.07
Nodes (26): ATT, ATT_BUILD, ATT_FLAGS, ATT_FX, ATT_GROUP, ATT_GROUP_NAMES, ATT_GROUP_SLOTS, ATT_GROUPS (+18 more)

### Community 86 - "Community 86"
Cohesion: 0.06
Nodes (27): _mbA, _mbB, MECHA, MECHA_AIM, MECHA_BOT, MECHA_D, MECHA_F, MECHA_FOOT (+19 more)

### Community 87 - "Community 87"
Cohesion: 0.08
Nodes (27): BOATS, DEC3, decal3Quad(), fishBody(), fishIce(), fishPile(), groundDecal3(), HULL_CANOT (+19 more)

### Community 88 - "Community 88"
Cohesion: 0.08
Nodes (19): makeSimounMaterials(), SIMOUN_SURFACES, SM, SM_BANDS, SM_COLS, smFan(), smFoot(), smGlassTex() (+11 more)

### Community 89 - "Community 89"
Cohesion: 0.11
Nodes (29): thumbRender(), thumbsAllowed(), thumbsDeploy(), thumbsStep(), thumbsWant(), VTHUMB, VW, _vwAim (+21 more)

### Community 90 - "Community 90"
Cohesion: 0.15
Nodes (29): ATMO_FD, build(), FD_POI, fdBackdrop(), fdBush(), fdCap(), fdChantier(), fdCorde() (+21 more)

### Community 91 - "Community 91"
Cohesion: 0.15
Nodes (29): ATMO_FD, build(), FD_POI, fdBackdrop(), fdBush(), fdCap(), fdChantier(), fdCorde() (+21 more)

### Community 92 - "Community 92"
Cohesion: 0.09
Nodes (23): ATLAS_R, atlasUV(), camoUV(), drawCamo(), drawFace(), GEAR, GEAR_SCAN, GEAR_SCAN_K (+15 more)

### Community 93 - "Community 93"
Cohesion: 0.11
Nodes (26): ATMO_MELTEM, build(), farChapel(), farCyclad(), farWindmill(), GROUND_MELTEM, MEL, MELTEM_ROWS (+18 more)

### Community 94 - "Community 94"
Cohesion: 0.10
Nodes (26): endKillcam(), KC, KC_VUE, kcAbort(), kcAssign(), kcDef(), kcHermite(), kcKnifeEnd() (+18 more)

### Community 95 - "Community 95"
Cohesion: 0.09
Nodes (18): bakeRig(), _la, _lp, _lq, _RIG_ID, rigGeometry(), rigidSkeleton(), rigMesh() (+10 more)

### Community 96 - "Community 96"
Cohesion: 0.07
Nodes (1): oe

### Community 97 - "Community 97"
Cohesion: 0.07
Nodes (1): oe

### Community 98 - "Community 98"
Cohesion: 0.10
Nodes (28): bin, dir, index, out, bakeClip(), BALL, DRAW_BONES, footQ() (+20 more)

### Community 99 - "Community 99"
Cohesion: 0.09
Nodes (23): buildTextures(), canvasOnce(), decalAtlas(), decalQuad(), FOL, foliageAtlas(), foliagePalms(), GROUND_SABLE (+15 more)

### Community 100 - "Community 100"
Cohesion: 0.09
Nodes (21): HOOD_RINGS, hoodPt(), PONCHO, _pwA, _pwB, SKIN_GEAR, SKIN_IDS, SKIN_OF_CAT (+13 more)

### Community 101 - "Community 101"
Cohesion: 0.08
Nodes (20): applyDamage(), boot(), BOOT_T, botKs(), botStreak(), buildMenu(), CHAIN, closeKeyCodes() (+12 more)

### Community 102 - "Community 102"
Cohesion: 0.12
Nodes (11): NETR, NETR_CTL, NETR_SEP, netRelayOnly(), netrJoin(), netrPush(), netrRandom(), netrUrl() (+3 more)

### Community 103 - "Community 103"
Cohesion: 0.07
Nodes (15): CPV, DIFF_HINT, KEYS_HELP, lobbyMe(), MAP_ART, OPT_TABS, OPTS, PAD_HELP_BTN (+7 more)

### Community 104 - "Community 104"
Cohesion: 0.09
Nodes (21): localStorageHas(), TC, TC_BTNS, TC_DEFAULT_LAY, TC_ICONS, TC_TAP, TC_UNAIM, TOUCH (+13 more)

### Community 105 - "Community 105"
Cohesion: 0.07
Nodes (19): { execSync }, fs, { openGame, REPO }, os, path, REPO, fails, { openGame, REPO } (+11 more)

### Community 106 - "Community 106"
Cohesion: 0.17
Nodes (23): armyTruckBuild(), boxTruckBuild(), cabShell(), CAR_SPECS, carBuild(), carChaikin(), carGeo(), cargoTruckBuild() (+15 more)

### Community 107 - "Community 107"
Cohesion: 0.10
Nodes (16): G_FRUIT, _pdm, _peul, _phM, PHYS, PROP_MATS, propCell(), propDef() (+8 more)

### Community 108 - "Community 108"
Cohesion: 0.17
Nodes (23): armyTruckBuild(), boxTruckBuild(), cabShell(), CAR_SPECS, carBuild(), carChaikin(), carGeo(), cargoTruckBuild() (+15 more)

### Community 109 - "Community 109"
Cohesion: 0.10
Nodes (16): G_FRUIT, _pdm, _peul, _phM, PHYS, PROP_MATS, propCell(), propDef() (+8 more)

### Community 110 - "Community 110"
Cohesion: 0.08
Nodes (2): getInput(), Qc

### Community 111 - "Community 111"
Cohesion: 0.08
Nodes (4): gi, _i, La, Me()

### Community 112 - "Community 112"
Cohesion: 0.08
Nodes (2): getInput(), Qc

### Community 113 - "Community 113"
Cohesion: 0.08
Nodes (4): gi, _i, La, Me()

### Community 114 - "Community 114"
Cohesion: 0.10
Nodes (22): buildGunModel(), GRIP_SHAPES, GUN_BUTT, GUN_MAGP, GUN_MODELS, gunFam(), gunGrips(), gunSpec() (+14 more)

### Community 115 - "Community 115"
Cohesion: 0.10
Nodes (22): buildGunModel(), GRIP_SHAPES, GUN_BUTT, GUN_MAGP, GUN_MODELS, gunFam(), gunGrips(), gunSpec() (+14 more)

### Community 116 - "Community 116"
Cohesion: 0.11
Nodes (23): BEND, BEND_NEUTRAL, bendBlast(), bendDirty(), bendFlush(), bendStamp(), bendUpdate(), FLORA_SURFACES (+15 more)

### Community 117 - "Community 117"
Cohesion: 0.11
Nodes (9): FLO_HOLES, lawnFree(), lawnTufts(), plantBed(), plantFits(), polyDist(), pondBasin(), Splat (+1 more)

### Community 118 - "Community 118"
Cohesion: 0.14
Nodes (24): ATMO_EMBRUNS, build(), edgeRun(), EM, EMBRUNS_NO_DOOR, embrunsBackdrop(), embrunsBase(), embrunsBoats() (+16 more)

### Community 119 - "Community 119"
Cohesion: 0.12
Nodes (16): applyAtmoFx(), bloodFx(), bodyDustFx(), DECAL_U, Decals, explosionFx(), impactFx(), initFx() (+8 more)

### Community 120 - "Community 120"
Cohesion: 0.10
Nodes (22): buildGunModel(), GRIP_SHAPES, GUN_BUTT, GUN_MAGP, GUN_MODELS, gunFam(), gunGrips(), gunSpec() (+14 more)

### Community 121 - "Community 121"
Cohesion: 0.11
Nodes (23): MECHA_J, MECHA_P, mechaAlarmTex(), mechaBoard(), mechaCockpit(), mechaCockpitTex(), mechaCockpitTick(), mechaExit() (+15 more)

### Community 122 - "Community 122"
Cohesion: 0.15
Nodes (24): LM, lmAct(), lmBox(), lmCard(), lmClick(), lmClose(), lmFill(), lmItemByKey() (+16 more)

### Community 123 - "Community 123"
Cohesion: 0.13
Nodes (19): CY_H, cyArchFace(), cyBuildTown(), cyClearSpot(), cyDoorClear(), cyDoorMark(), cyHouses(), cyMerge() (+11 more)

### Community 124 - "Community 124"
Cohesion: 0.13
Nodes (22): botChasing(), botSearchNext(), botSearchPt(), botSearchStart(), botToken(), _cand, _ce, COVER_GRID (+14 more)

### Community 125 - "Community 125"
Cohesion: 0.16
Nodes (22): AV, avBlob(), avBuild(), avChanged(), avClose(), avCrop(), avDecode(), avDims() (+14 more)

### Community 126 - "Community 126"
Cohesion: 0.16
Nodes (21): AMIS, amisChanged(), amisDecline(), amisDone(), amisFriendDo(), amisFriendsRender(), amisFriendsScreen(), amisInviteCard() (+13 more)

### Community 127 - "Community 127"
Cohesion: 0.12
Nodes (15): ANN, annTick(), SFX, SFX_GAME, SFX_PACKS, sfxAnnounce(), sfxBoot(), sfxBootGame() (+7 more)

### Community 128 - "Community 128"
Cohesion: 0.17
Nodes (20): NF_IC, SOC, SOC_CALL, socAv(), socAvFallback(), socBadge(), socBind(), socChanged() (+12 more)

### Community 129 - "Community 129"
Cohesion: 0.10
Nodes (5): ac, ec, jl(), oc(), ql()

### Community 130 - "Community 130"
Cohesion: 0.10
Nodes (5): ac, ec, jl(), oc(), ql()

### Community 131 - "Community 131"
Cohesion: 0.13
Nodes (20): args, axesOf(), centerOf(), controle(), esquisse(), file, fit(), fs (+12 more)

### Community 132 - "Community 132"
Cohesion: 0.13
Nodes (21): CONE_GEO, gripProf(), guard(), IRON, IRON_GEO, ironFoot(), ironRing(), ironRingGeo() (+13 more)

### Community 133 - "Community 133"
Cohesion: 0.13
Nodes (21): CONE_GEO, gripProf(), guard(), IRON, IRON_GEO, ironFoot(), ironRing(), ironRingGeo() (+13 more)

### Community 134 - "Community 134"
Cohesion: 0.13
Nodes (21): CONE_GEO, gripProf(), guard(), IRON, IRON_GEO, ironFoot(), ironRing(), ironRingGeo() (+13 more)

### Community 135 - "Community 135"
Cohesion: 0.17
Nodes (23): netBotOff(), netBroadcast(), netCheckGo(), netHeartbeat(), netHostDrop(), netHostForget(), netHostMsg(), netJoinRunning() (+15 more)

### Community 136 - "Community 136"
Cohesion: 0.19
Nodes (22): OZ, ozAdd(), ozBuild(), ozCopy(), ozDel(), ozDown(), ozDraw(), ozGround() (+14 more)

### Community 137 - "Community 137"
Cohesion: 0.09
Nodes (1): te

### Community 138 - "Community 138"
Cohesion: 0.09
Nodes (1): te

### Community 139 - "Community 139"
Cohesion: 0.14
Nodes (1): Maker

### Community 140 - "Community 140"
Cohesion: 0.12
Nodes (20): CAMO_BASE, CAMO_CANVAS, CAMO_DRAW, CAMO_MATS, CAMO_SWATCH, CAMO_TEX, CAMO_U, CAMO_WORLD (+12 more)

### Community 141 - "Community 141"
Cohesion: 0.12
Nodes (20): CAMO_BASE, CAMO_CANVAS, CAMO_DRAW, CAMO_MATS, CAMO_SWATCH, CAMO_TEX, CAMO_U, CAMO_WORLD (+12 more)

### Community 142 - "Community 142"
Cohesion: 0.14
Nodes (1): Maker

### Community 143 - "Community 143"
Cohesion: 0.13
Nodes (15): CRX, makeStratusMaterials(), ST, ST_CUTS, stBandV(), stCrystalCut(), stCrystalTexLoad(), stFloatRock() (+7 more)

### Community 144 - "Community 144"
Cohesion: 0.12
Nodes (20): CAMO_BASE, CAMO_CANVAS, CAMO_DRAW, CAMO_MATS, CAMO_SWATCH, CAMO_TEX, CAMO_U, CAMO_WORLD (+12 more)

### Community 145 - "Community 145"
Cohesion: 0.10
Nodes (3): bc, on, sc

### Community 146 - "Community 146"
Cohesion: 0.10
Nodes (1): We

### Community 147 - "Community 147"
Cohesion: 0.10
Nodes (3): bc, on, sc

### Community 148 - "Community 148"
Cohesion: 0.10
Nodes (1): We

### Community 149 - "Community 149"
Cohesion: 0.15
Nodes (19): FL, floatingLilies(), glassQuad(), glassWall(), ROCHER, rockFace(), rockPile(), SERRE_IRON (+11 more)

### Community 150 - "Community 150"
Cohesion: 0.15
Nodes (20): archGlass(), ATMO_FLOREAL, build(), FLO_AMB, FLO_POI, florealAmbience(), florealAmbienceStop(), florealBase() (+12 more)

### Community 151 - "Community 151"
Cohesion: 0.16
Nodes (19): buildNav(), computeComponents(), findPath(), HEAP, heapPop(), heapPush(), NAV, NAV_LEAP (+11 more)

### Community 152 - "Community 152"
Cohesion: 0.11
Nodes (11): LOCO, LOCO_CDY, locoFam(), locoFamSel(), locoInit(), locoLiftTab(), locoPose(), locoRaise() (+3 more)

### Community 153 - "Community 153"
Cohesion: 0.14
Nodes (14): BOT_STYLES, botBump(), botFlee(), botLedge(), botNearNode(), botRoom(), botSide(), botSpotFree() (+6 more)

### Community 154 - "Community 154"
Cohesion: 0.15
Nodes (14): CY_BLUE, CY_DOME, CY_WHITE, cyArchShape(), CYC, cyCabin(), cyChapel(), cyChurch() (+6 more)

### Community 155 - "Community 155"
Cohesion: 0.24
Nodes (16): round4(), touchEditAct(), touchEditClose(), touchEditDown(), touchEditMove(), touchEditOpen(), touchEditSelect(), touchHit() (+8 more)

### Community 156 - "Community 156"
Cohesion: 0.18
Nodes (15): NDBG, NDBG_ON, NDBG_POSE_KEYS, NDBG_SPEC(), ndbgGet(), ndbgInit(), ndbgLoad(), ndbgRef() (+7 more)

### Community 157 - "Community 157"
Cohesion: 0.17
Nodes (14): KDBG, KDBG_ON, KDBG_SPEC, KDBG_THUMBS, kdbgGet(), kdbgInit(), kdbgLoad(), kdbgMerge() (+6 more)

### Community 158 - "Community 158"
Cohesion: 0.16
Nodes (3): CSM, CSMFrustum, ls()

### Community 159 - "Community 159"
Cohesion: 0.16
Nodes (3): CSM, CSMFrustum, ls()

### Community 160 - "Community 160"
Cohesion: 0.11
Nodes (11): CHUNK_NEAR, DECOR, _kv, LAMPS, LIVING, _mk, NEAR_SHADOW, OCC (+3 more)

### Community 161 - "Community 161"
Cohesion: 0.13
Nodes (8): fdHouse(), fdKit(), FDP, fdRoof(), FDS, FDS_CELL(), fdSign(), fdSignAtlas()

### Community 162 - "Community 162"
Cohesion: 0.21
Nodes (19): applyQuality(), applyResolution(), applyScale(), basePixelRatio(), canvasPixelRatio(), clamp(), gfxSet(), maxBoost() (+11 more)

### Community 163 - "Community 163"
Cohesion: 0.21
Nodes (19): applyQuality(), applyResolution(), applyScale(), basePixelRatio(), canvasPixelRatio(), clamp(), gfxSet(), maxBoost() (+11 more)

### Community 164 - "Community 164"
Cohesion: 0.11
Nodes (11): CHUNK_NEAR, DECOR, _kv, LAMPS, LIVING, _mk, NEAR_SHADOW, OCC (+3 more)

### Community 165 - "Community 165"
Cohesion: 0.13
Nodes (8): fdHouse(), fdKit(), FDP, fdRoof(), FDS, FDS_CELL(), fdSign(), fdSignAtlas()

### Community 166 - "Community 166"
Cohesion: 0.18
Nodes (15): arsCur(), arsEscape(), arsKsFill(), arsLeave(), arsLevelHtml(), arsNextUnlock(), arsOpen(), arsPopClose() (+7 more)

### Community 167 - "Community 167"
Cohesion: 0.12
Nodes (16): ACCEPTE, args, audit(), CARTES, fs, NOMS, OUT, OUTILS (+8 more)

### Community 168 - "Community 168"
Cohesion: 0.17
Nodes (15): gy0(), holeInCell(), RELIEF, reliefAt(), reliefBuild(), reliefFlat(), reliefMaxAt(), reliefMaxUpdate() (+7 more)

### Community 169 - "Community 169"
Cohesion: 0.18
Nodes (3): circleShape(), profileRows(), signedArea()

### Community 170 - "Community 170"
Cohesion: 0.17
Nodes (15): gy0(), holeInCell(), RELIEF, reliefAt(), reliefBuild(), reliefFlat(), reliefMaxAt(), reliefMaxUpdate() (+7 more)

### Community 171 - "Community 171"
Cohesion: 0.18
Nodes (3): circleShape(), profileRows(), signedArea()

### Community 172 - "Community 172"
Cohesion: 0.15
Nodes (14): FABRICS, _tfr, TISSU_GENRES, tissusBuild(), _tlw, TOILE_MATS, toileAdd(), toileBodies() (+6 more)

### Community 173 - "Community 173"
Cohesion: 0.20
Nodes (13): hbCell(), hbFrond(), hbHsl(), hbLeaf(), hbPalm(), hbSpray(), hbStem(), HERB (+5 more)

### Community 174 - "Community 174"
Cohesion: 0.19
Nodes (17): ATMO_GIVRE, build(), givreBackdrop(), givreCenter(), givreGround(), givreHalf(), givreLevel(), givrePerimeter() (+9 more)

### Community 175 - "Community 175"
Cohesion: 0.17
Nodes (14): AMB, ambLoad(), ambSet(), ambStart(), ambStop(), ambTick(), ambUnload(), AMBW (+6 more)

### Community 176 - "Community 176"
Cohesion: 0.18
Nodes (17): RAG, RAG_HEAVY, RAG_HINGE, RAG_MASS, RAG_MIN, RAG_RAD, RAG_RIGID, ragBounds() (+9 more)

### Community 177 - "Community 177"
Cohesion: 0.20
Nodes (16): CHANGELOG, NEWS_TAG, newsBadge(), newsChanges(), newsClose(), newsDate(), newsInit(), newsMajor() (+8 more)

### Community 178 - "Community 178"
Cohesion: 0.23
Nodes (16): PWA, PWA_IC, pwaBrowser(), pwaBrowserOk(), pwaCan(), pwaCard(), pwaDone(), pwaGate() (+8 more)

### Community 179 - "Community 179"
Cohesion: 0.11
Nodes (8): DIST, fs, hits, http, { openGame, REPO }, path, srv, TYPES

### Community 180 - "Community 180"
Cohesion: 0.13
Nodes (14): CLASSES, FEEL, KS_DEFAULT, KS_IDS, KSDEF, ksFill(), ksPick(), ksSort() (+6 more)

### Community 181 - "Community 181"
Cohesion: 0.18
Nodes (11): PF, _pm, SANDBAG_TINT, sandbagArc(), sandbagFallen(), sandbagHalves(), sandbagPile(), sandbagTint() (+3 more)

### Community 182 - "Community 182"
Cohesion: 0.13
Nodes (14): CLASSES, FEEL, KS_DEFAULT, KS_IDS, KSDEF, ksFill(), ksPick(), ksSort() (+6 more)

### Community 183 - "Community 183"
Cohesion: 0.20
Nodes (16): all_keys(), js_unescape(), keys_of(), literals(), Extrait les clés de traduction de src/*.js : textes passés à _t('...') et à _tn(, Textes statiques de shell.html (nœuds de texte et attributs aria-label, placehol, texte statique d'un modèle commençant en src[i] (les expressions ${...} en sont, tous les modèles de src, imbriqués compris : (position, texte statique, début de (+8 more)

### Community 184 - "Community 184"
Cohesion: 0.18
Nodes (11): PF, _pm, SANDBAG_TINT, sandbagArc(), sandbagFallen(), sandbagHalves(), sandbagPile(), sandbagTint() (+3 more)

### Community 185 - "Community 185"
Cohesion: 0.18
Nodes (15): florealJapon(), florealMaze(), florealRavin(), florealRoseraie(), gazebo(), hipRoof(), JAPON_ISLE, JAPON_POND (+7 more)

### Community 186 - "Community 186"
Cohesion: 0.26
Nodes (16): ATMO_CX, build(), complexoLevel(), CX, cxBar(), cxBases(), cxCasa(), cxDecor() (+8 more)

### Community 187 - "Community 187"
Cohesion: 0.13
Nodes (10): DepthPrepass, RaysPass, rsTex(), ScenePass, setupComposer(), ssaoCutMat(), ssaoCutPass(), viewCheck() (+2 more)

### Community 188 - "Community 188"
Cohesion: 0.13
Nodes (14): a, acorn, b, { execFileSync }, files, filtre, fs, min (+6 more)

### Community 189 - "Community 189"
Cohesion: 0.13
Nodes (10): DepthPrepass, RaysPass, rsTex(), ScenePass, setupComposer(), ssaoCutMat(), ssaoCutPass(), viewCheck() (+2 more)

### Community 190 - "Community 190"
Cohesion: 0.17
Nodes (12): CY_BOATS, CYD, cyDecalAtlas(), CYF, cyFlagTex(), cyFloraAtlas(), CYS, cySignAtlas() (+4 more)

### Community 191 - "Community 191"
Cohesion: 0.15
Nodes (9): CY_GREENS, _cyA, _cyB, cyCanopy(), cyFlag(), cyFlagCloth(), cyPatch(), cyPergola() (+1 more)

### Community 192 - "Community 192"
Cohesion: 0.22
Nodes (15): clearDrops(), _dpF, _dpQ, _dpQ2, _dpV, DROP, dropKilledWeapon(), dropSwapAllowed() (+7 more)

### Community 193 - "Community 193"
Cohesion: 0.23
Nodes (16): netAutoJoin(), netCan(), netdReset(), netHost(), netHostP2p(), netHostUp(), netInit(), netJoinCode() (+8 more)

### Community 194 - "Community 194"
Cohesion: 0.19
Nodes (16): netDisableBots(), netdLog(), netdPath(), netFail(), netHostLink(), netJoinRelay(), netLeaveMatch(), netLost() (+8 more)

### Community 195 - "Community 195"
Cohesion: 0.26
Nodes (15): CHAT, chatClean(), chatClear(), chatClose(), chatFade(), chatHostRelay(), chatIn(), chatInit() (+7 more)

### Community 196 - "Community 196"
Cohesion: 0.13
Nodes (1): Dc

### Community 197 - "Community 197"
Cohesion: 0.20
Nodes (1): _l

### Community 198 - "Community 198"
Cohesion: 0.13
Nodes (1): Dc

### Community 199 - "Community 199"
Cohesion: 0.20
Nodes (1): _l

### Community 200 - "Community 200"
Cohesion: 0.17
Nodes (10): TEPHRA_SURFACES, tephraKit(), TP, tpAtlasQuad(), TPD, tpDecalAtlas(), TPS, tpSignAtlas() (+2 more)

### Community 201 - "Community 201"
Cohesion: 0.17
Nodes (10): TEPHRA_SURFACES, tephraKit(), TP, tpAtlasQuad(), TPD, tpDecalAtlas(), TPS, tpSignAtlas() (+2 more)

### Community 202 - "Community 202"
Cohesion: 0.26
Nodes (14): armsW(), ctlAction(), ctlMove(), ctlShoot(), ctlStartReload(), ctlSwitch(), ctlWeapon(), initCtl() (+6 more)

### Community 203 - "Community 203"
Cohesion: 0.21
Nodes (9): BIND, BIND_DEFS, BIND_RESERVED, bindDefault(), bindOf(), bindRebuild(), bindReset(), bindSet() (+1 more)

### Community 204 - "Community 204"
Cohesion: 0.22
Nodes (15): netAckOf(), netAirstrike(), netEvent(), netHeliCall(), netHeliDown(), netHeliFire(), netHeliHit(), netIdOf() (+7 more)

### Community 205 - "Community 205"
Cohesion: 0.21
Nodes (10): RIP, _ripC, rippleAdd(), rippleClear(), rippleMask(), ripplePrime(), rippleSources(), rippleUpdate() (+2 more)

### Community 206 - "Community 206"
Cohesion: 0.25
Nodes (13): ATMO_BC, battleCampLevel(), BC, bcAntenna(), bcBazaar(), bcContainerYard(), bcHQ(), bcOutpost() (+5 more)

### Community 207 - "Community 207"
Cohesion: 0.19
Nodes (11): _anA, _anB, ANIM, animClip(), animInit(), animMix(), animPhase(), animRead() (+3 more)

### Community 208 - "Community 208"
Cohesion: 0.18
Nodes (14): boardList(), drawMinimap(), fillScoreboard(), fmtTime(), hostBgInit(), hudCls(), hudHtml(), hudStyle() (+6 more)

### Community 209 - "Community 209"
Cohesion: 0.25
Nodes (12): ADS_UNAIM, adsToggleMode(), TPAD, trackpadBurst(), trackpadClick(), trackpadHint(), trackpadHold(), trackpadNote() (+4 more)

### Community 210 - "Community 210"
Cohesion: 0.20
Nodes (11): MBG, MBG_FOCUS, mbgDraw(), mbgHash(), mbgInit(), mbgLoad(), mbgMotion(), mbgNoise() (+3 more)

### Community 211 - "Community 211"
Cohesion: 0.25
Nodes (12): CD, cdClear(), cdGo(), cdLen(), cdNetIn(), cdOn(), cdShow(), cdShowWait() (+4 more)

### Community 212 - "Community 212"
Cohesion: 0.31
Nodes (12): COMM, commAct(), commBind(), commEditHtml(), commLoad(), commPostHtml(), commRender(), commScreen() (+4 more)

### Community 213 - "Community 213"
Cohesion: 0.21
Nodes (11): PFR, PFR_BINS, PFR_STEPS, pfrFrame(), pfrReport(), pfrSecond(), pfrSecReset(), pfrShow() (+3 more)

### Community 214 - "Community 214"
Cohesion: 0.18
Nodes (2): Ga, Oa

### Community 215 - "Community 215"
Cohesion: 0.18
Nodes (2): Ga, Oa

### Community 216 - "Community 216"
Cohesion: 0.15
Nodes (1): Prefab

### Community 217 - "Community 217"
Cohesion: 0.15
Nodes (1): Prefab

### Community 218 - "Community 218"
Cohesion: 0.21
Nodes (10): arsKsFill(), arsNextUnlock(), ATT_GROUP_NAMES, ATT_GROUP_SLOTS, ATT_GROUPS, ATT_MAX, classEditable(), ksFill() (+2 more)

### Community 219 - "Community 219"
Cohesion: 0.24
Nodes (11): DEFI_BY_ID, DEFI_FR, defiAdd(), defiCount(), defiDone(), DEFIS, defisKill(), defisMatchEnd() (+3 more)

### Community 220 - "Community 220"
Cohesion: 0.23
Nodes (13): netApply(), netClean(), netEntity(), netEventIn(), netLocal(), netMakeRemote(), netPos(), netPubStage() (+5 more)

### Community 221 - "Community 221"
Cohesion: 0.17
Nodes (2): ao, vo()

### Community 222 - "Community 222"
Cohesion: 0.19
Nodes (1): co

### Community 223 - "Community 223"
Cohesion: 0.17
Nodes (2): ao, vo()

### Community 224 - "Community 224"
Cohesion: 0.19
Nodes (1): co

### Community 225 - "Community 225"
Cohesion: 0.15
Nodes (11): acc, args, camo, carte, fs, { openGame }, out, path (+3 more)

### Community 226 - "Community 226"
Cohesion: 0.15
Nodes (8): args, cases, fs, ids, imgDir, jsonOut, { openGame }, path

### Community 227 - "Community 227"
Cohesion: 0.20
Nodes (6): applyAtmosphere(), _atmoC, mapSetup(), SKYP, skyPhotoFree(), skyPhotoLoad()

### Community 228 - "Community 228"
Cohesion: 0.20
Nodes (12): keyLerp(), keySpline(), knifeFlat(), knifeGripMatrix(), knifeGripSet(), knifeHeld(), knifeMix(), knifePut() (+4 more)

### Community 229 - "Community 229"
Cohesion: 0.17
Nodes (7): commentaire(), ecrire(), phrase(), Liste des assets du jeu (docs/assets.md), produite à partir du code : prefabs du, Écrit docs/assets.md s'il a changé ; rend le résumé et les doublons (build.py le, Première phrase d'un commentaire, raccourcie au mot près, Commentaire juste au-dessus de la ligne i (bloc /* */ ou lignes //), sans les en

### Community 230 - "Community 230"
Cohesion: 0.17
Nodes (5): bidon, jarre, pneu, sac, tronc

### Community 231 - "Community 231"
Cohesion: 0.35
Nodes (9): TEXLAB, texLabHeight(), texLabMacro(), texLabPack(), texLabSurface(), TLAB, _tlQuad(), _tlRender() (+1 more)

### Community 232 - "Community 232"
Cohesion: 0.23
Nodes (8): emitDrift(), foliageCard(), foliageQuad(), PALM_KINDS, palmCrown(), palmFrond(), sandDrifts(), SCATTER_KINDS

### Community 233 - "Community 233"
Cohesion: 0.20
Nodes (6): applyAtmosphere(), _atmoC, mapSetup(), SKYP, skyPhotoFree(), skyPhotoLoad()

### Community 234 - "Community 234"
Cohesion: 0.20
Nodes (12): keyLerp(), keySpline(), knifeFlat(), knifeGripMatrix(), knifeGripSet(), knifeHeld(), knifeMix(), knifePut() (+4 more)

### Community 235 - "Community 235"
Cohesion: 0.23
Nodes (12): armFrames(), armOnDevice(), _basisQ(), bestSwivel(), drawArm(), elbowAt(), handAt(), parabolaStep() (+4 more)

### Community 236 - "Community 236"
Cohesion: 0.18
Nodes (12): botDiff(), botGuess(), botHurt(), botLookAt(), botNadeType(), botSense(), pickGoal(), smokeBlocks() (+4 more)

### Community 237 - "Community 237"
Cohesion: 0.18
Nodes (12): mechaApply(), mechaDropStep(), mechaFootHome(), mechaImpact(), mechaLand(), mechaPose(), mechaSounds(), mechaSpawn() (+4 more)

### Community 238 - "Community 238"
Cohesion: 0.26
Nodes (12): addKillfeed(), chainLabel(), deathPrompt(), esc(), killEnt(), killInfo(), showDeathScreen(), streakKill() (+4 more)

### Community 239 - "Community 239"
Cohesion: 0.20
Nodes (9): AIM, AIM_K, aimAssist(), aimAutoFire(), _aimC, _aimD, _aimO, aimTarget() (+1 more)

### Community 240 - "Community 240"
Cohesion: 0.17
Nodes (3): In, Lc, rc

### Community 241 - "Community 241"
Cohesion: 0.27
Nodes (11): credits_paquets(), enc_of(), encode(), encode_pack(), main(), meta_of(), Construit assets/sfx/ : les sons du jeu, enregistrements libres de droits (CC0 p, Encode les masters d'un paquet en MP3 (assets/sfx/<paquet>/, meta.json) ; renvoi (+3 more)

### Community 242 - "Community 242"
Cohesion: 0.23
Nodes (10): css(), js(), Réduction du code de la page (build.py) : retire les commentaires et les blancs, Faut-il un blanc entre a et b pour qu'ils restent deux jetons distincts ?, Feuille de style : commentaires retirés, blancs réduits à une espace, rien autou, Jetons significatifs ; chacun note si un blanc ou un commentaire le précède (gap, _sep(), _Tok (+2 more)

### Community 243 - "Community 243"
Cohesion: 0.17
Nodes (3): In, Lc, rc

### Community 244 - "Community 244"
Cohesion: 0.17
Nodes (10): acc, ancre, args, cote, fs, id, { openGame }, out (+2 more)

### Community 245 - "Community 245"
Cohesion: 0.17
Nodes (10): args, essai, fs, imgDir, jsonOut, modes, { openGame }, path (+2 more)

### Community 246 - "Community 246"
Cohesion: 0.22
Nodes (11): buildGrenadeModel(), buildPhoneRig(), curvedMag(), cy(), initNadeRig(), ksDevMats(), rail(), rb() (+3 more)

### Community 247 - "Community 247"
Cohesion: 0.22
Nodes (8): VM_ANIM, VMA_CAM, _vmaC, vmaCfg(), vmaMerge(), vmaPeak(), _vmaU, vmChoc()

### Community 248 - "Community 248"
Cohesion: 0.18
Nodes (8): files, fs, LABELS, N, opt, path, ROOT, [W, H]

### Community 249 - "Community 249"
Cohesion: 0.25
Nodes (8): build(), env(), grave(), L(), master(), Famille « mecha » : le mecha de la série à 11 (paquet mecha, chargé avec les son, Ralentit et abaisse d'un facteur k (k < 1 : plus lourd, comme une bande ralentie, Enveloppe par points (temps en s, gain linéaire), interpolée.

### Community 250 - "Community 250"
Cohesion: 0.22
Nodes (11): buildGrenadeModel(), buildPhoneRig(), curvedMag(), cy(), initNadeRig(), ksDevMats(), rail(), rb() (+3 more)

### Community 251 - "Community 251"
Cohesion: 0.22
Nodes (8): VM_ANIM, VMA_CAM, _vmaC, vmaCfg(), vmaMerge(), vmaPeak(), _vmaU, vmChoc()

### Community 252 - "Community 252"
Cohesion: 0.24
Nodes (11): armGeometry(), handApply(), handBaked(), handBones(), handGeometry(), makeArm(), makeHand(), thumbQ() (+3 more)

### Community 253 - "Community 253"
Cohesion: 0.33
Nodes (8): mapBuild(), mapCompile(), MAPL, mapProg(), mapRelease(), mapTick(), mapUnload(), mapWanted()

### Community 254 - "Community 254"
Cohesion: 0.27
Nodes (8): FIN_CLS, FIN_TEXT, finByLimit(), finClear(), finDone(), finKicker(), matchFinish(), matchOutcome()

### Community 255 - "Community 255"
Cohesion: 0.29
Nodes (10): LANE, laneHeld(), lanePump(), laneSuspend(), rankUpBuild(), rankUpClear(), rankUpNext(), rankUpShow() (+2 more)

### Community 256 - "Community 256"
Cohesion: 0.22
Nodes (7): ESSAI, ESSAI_S, ESSAI_TOUT, essaiMecha(), essaiSeries(), essaiStart(), essaiTick()

### Community 257 - "Community 257"
Cohesion: 0.33
Nodes (10): armor(), blur(), dark(), load(), main(), normal_from(), panels(), Construit assets/tex/mecha/ et assets/tex/mechadark/ : les surfaces du mecha (sé (+2 more)

### Community 258 - "Community 258"
Cohesion: 0.18
Nodes (6): args, fs, ids, imgDir, { openGame }, path

### Community 259 - "Community 259"
Cohesion: 0.31
Nodes (3): finalizeWorld(), GeoBuf, _growF()

### Community 260 - "Community 260"
Cohesion: 0.22
Nodes (10): capMs(), capTake(), capWait(), dynDown(), frameBudget(), hfUpdate(), lagDrop(), lagMark() (+2 more)

### Community 261 - "Community 261"
Cohesion: 0.20
Nodes (4): arbuste, boite, lampadaire, poubelle

### Community 262 - "Community 262"
Cohesion: 0.22
Nodes (6): I18N_EN, I18N_MISS, LANG, LANG_PREF, _t(), _tn()

### Community 263 - "Community 263"
Cohesion: 0.22
Nodes (10): capMs(), capTake(), capWait(), dynDown(), frameBudget(), hfUpdate(), lagDrop(), lagMark() (+2 more)

### Community 264 - "Community 264"
Cohesion: 0.31
Nodes (3): finalizeWorld(), GeoBuf, _growF()

### Community 265 - "Community 265"
Cohesion: 0.22
Nodes (10): mechaBlast(), mechaBotsShoot(), mechaClear(), mechaDamage(), mechaFree(), mechaHeat(), mechaNetDead(), mechaNetHit() (+2 more)

### Community 266 - "Community 266"
Cohesion: 0.22
Nodes (10): botAirstrike(), botUav(), hudMsg(), lockAsk(), lockFailed(), pauseGame(), requestLock(), resumeGame() (+2 more)

### Community 267 - "Community 267"
Cohesion: 0.24
Nodes (10): clearHitmarker(), endMatch(), frame(), hideDeathScreen(), ordinal(), renderFrame(), showScoreboard(), toMenu() (+2 more)

### Community 268 - "Community 268"
Cohesion: 0.29
Nodes (10): classGraceLeft(), cls(), cname(), commitClass(), pmClassRefresh(), pmEscape(), pmOpen(), pmSummary() (+2 more)

### Community 269 - "Community 269"
Cohesion: 0.40
Nodes (9): UPD, updApply(), updBanner(), updCheck(), updInit(), updMsgSet(), updOn(), updReload() (+1 more)

### Community 270 - "Community 270"
Cohesion: 0.20
Nodes (1): ic

### Community 271 - "Community 271"
Cohesion: 0.20
Nodes (1): ic

### Community 272 - "Community 272"
Cohesion: 0.20
Nodes (9): args, fs, only, { openGame, HERE }, OUT, path, SERIES, withCols (+1 more)

### Community 273 - "Community 273"
Cohesion: 0.22
Nodes (1): LIGHT

### Community 274 - "Community 274"
Cohesion: 0.31
Nodes (6): GRASS, GRASS_U, grassBuild(), grassMask(), grassMaterial(), grassTemplates()

### Community 275 - "Community 275"
Cohesion: 0.25
Nodes (6): leafBasis(), leafPatch(), TREE_KINDS, _va, _vb, _vc

### Community 276 - "Community 276"
Cohesion: 0.33
Nodes (7): florealParis(), PARIS, PARIS_TINTS, parisBuilding(), parisRing(), parisRoof(), parisTower()

### Community 277 - "Community 277"
Cohesion: 0.25
Nodes (9): animSoldier(), armToGrip(), armToGripRoll(), footPlant(), hitDelta(), ik2(), poseSoldier(), rollWrist() (+1 more)

### Community 278 - "Community 278"
Cohesion: 0.28
Nodes (9): netAdoptBots(), netBotOn(), netHeliDrop(), netHostRelay(), netMigBar(), netMigShow(), netRemoveById(), netSentDrop() (+1 more)

### Community 279 - "Community 279"
Cohesion: 0.25
Nodes (9): netCfg(), netClientMsg(), netDisposeModel(), netPhase(), netRemoteAway(), netRemoveRemote(), netSetupSet(), netStartOnline() (+1 more)

### Community 280 - "Community 280"
Cohesion: 0.25
Nodes (3): fl(), gl(), ml

### Community 281 - "Community 281"
Cohesion: 0.25
Nodes (3): fl(), gl(), ml

### Community 282 - "Community 282"
Cohesion: 0.22
Nodes (6): args, distLines, fs, { openGame, REPO }, path, wanted

### Community 283 - "Community 283"
Cohesion: 0.22
Nodes (7): enWords, FR, frWords, fs, { openGame }, pairs, path

### Community 284 - "Community 284"
Cohesion: 0.22
Nodes (4): DECK_ONLY, { openGame }, path, SIZES

### Community 285 - "Community 285"
Cohesion: 0.22
Nodes (7): args, essai, fs, modes, { openGame }, path, TIMES

### Community 286 - "Community 286"
Cohesion: 0.22
Nodes (2): { openGame }, path

### Community 287 - "Community 287"
Cohesion: 0.39
Nodes (7): GUN_SURF, _heightField(), _makeSurface(), _rng(), _SURF_OF, surfaceGunMaterials(), _surfCache

### Community 288 - "Community 288"
Cohesion: 0.39
Nodes (7): GUN_SURF, _heightField(), _makeSurface(), _rng(), _SURF_OF, surfaceGunMaterials(), _surfCache

### Community 289 - "Community 289"
Cohesion: 0.25
Nodes (6): files, fs, opt, path, ROOT, SONS

### Community 290 - "Community 290"
Cohesion: 0.43
Nodes (7): FILTRE_MOTS, FILTRE_SUB, filtreHate(), filtreNom(), filtreNorm(), filtreRes(), filtreTexte()

### Community 291 - "Community 291"
Cohesion: 0.36
Nodes (6): florealVie(), KOI, koiAdd(), koiGeometry(), VIE, vieSwarm()

### Community 292 - "Community 292"
Cohesion: 0.32
Nodes (8): digitFK(), digitGap(), graspDigit(), gripSdf(), handCapsules(), handGrasp(), indexToTrigger(), trigCost()

### Community 293 - "Community 293"
Cohesion: 0.39
Nodes (7): GUN_SURF, _heightField(), _makeSurface(), _rng(), _SURF_OF, surfaceGunMaterials(), _surfCache

### Community 294 - "Community 294"
Cohesion: 0.36
Nodes (6): SQ, squadDirty(), squadGoal(), squadMaybe(), squadPlan(), squadReset()

### Community 295 - "Community 295"
Cohesion: 0.36
Nodes (8): mechaDust(), mechaEye(), mechaFight(), mechaPick(), mechaRemote(), mechaShoot(), mechaSplash(), mechaTick()

### Community 296 - "Community 296"
Cohesion: 0.43
Nodes (7): buildMinimapStatic(), mapPlanPaint(), mmDensity(), mmHeightColor(), MMPAL, mmRelief(), mmTier()

### Community 297 - "Community 297"
Cohesion: 0.32
Nodes (7): allyMarksHide(), allyMarksUpdate(), AM, _amC, amEl(), _amH, _amP

### Community 298 - "Community 298"
Cohesion: 0.46
Nodes (7): MOD, MOD_WHY(), modBind(), modDo(), modLoad(), modRender(), modScreen()

### Community 299 - "Community 299"
Cohesion: 0.39
Nodes (7): actGlyph(), inputMode(), KB_FIXED, keyGlyph(), PAD_FIXED, PAD_GLYPH, padGlyph()

### Community 300 - "Community 300"
Cohesion: 0.36
Nodes (6): load(), load_en(), load_pt(), Dictionnaire anglais du jeu (i18n/en.txt) : une entrée par ligne, « français ⇒ a, Retorne (dict, erreurs). Les fichiers sont i18n/<prefix>*.txt, lus dans l'ordre, unesc()

### Community 301 - "Community 301"
Cohesion: 0.29
Nodes (3): { openGame }, openMap(), until()

### Community 302 - "Community 302"
Cohesion: 0.25
Nodes (4): fails, { openGame, REPO }, PAGE, path

### Community 303 - "Community 303"
Cohesion: 0.29
Nodes (2): H, Contrôle de l'installeur Steam Deck (dist/deck/installer.sh, README « Steam Deck

### Community 304 - "Community 304"
Cohesion: 0.48
Nodes (6): controle(), deux_points_explicatif(), lisibles(), (origine, texte) de chaque texte vu par le joueur, un deux-points qui suit une proposition (3 mots ou plus) et précède une minuscul, sans_balises()

### Community 305 - "Community 305"
Cohesion: 0.29
Nodes (5): crop(), Images du raccourci Steam (version Steam Deck, voir README « Steam Deck ») : tir, Dégradé sombre vertical sur une bande (lisibilité du logo), Plus grand cadre de proportions aspect (largeur / hauteur) centré au mieux sur (, shade()

### Community 306 - "Community 306"
Cohesion: 0.29
Nodes (5): { chromium }, fs, ICON, path, ROOT

### Community 307 - "Community 307"
Cohesion: 0.33
Nodes (3): RAIL, railBogie(), railWheel()

### Community 308 - "Community 308"
Cohesion: 0.29
Nodes (2): WIND_AMP, WIND_U

### Community 309 - "Community 309"
Cohesion: 0.29
Nodes (7): botThrowNade(), nadeFuse(), nadeWarm(), setPath(), spawnNade(), spawnThrowKnife(), tknifeTemplate()

### Community 310 - "Community 310"
Cohesion: 0.33
Nodes (7): mechaArmorTex(), mechaBuild(), mechaDecalTex(), mechaGeometry(), mechaPart(), mechaTexApply(), mechaTexLoad()

### Community 311 - "Community 311"
Cohesion: 0.33
Nodes (7): netHello(), netPlayerRows(), netPubFetch(), netPubRender(), netPubTick(), netPubUrl(), netStage()

### Community 312 - "Community 312"
Cohesion: 0.33
Nodes (7): classesHeader(), menuMainRefresh(), menuNetChanged(), pickClass(), renderDeploy(), renderSolo(), uiRefresh()

### Community 313 - "Community 313"
Cohesion: 0.33
Nodes (7): menuDeploy(), menuLaunch(), menuLoading(), menuWaitPlayers(), setMapArt(), uiHide(), uiWait()

### Community 314 - "Community 314"
Cohesion: 0.29
Nodes (5): fails, fs, { openGame, HERE }, OUT, path

### Community 315 - "Community 315"
Cohesion: 0.33
Nodes (4): LIMIT(), load(), { openGame }, path

### Community 316 - "Community 316"
Cohesion: 0.33
Nodes (6): buildEnvCubes(), buildEnvironment(), fetchTexPack(), hdriFetch(), loadHDRIEnvironment(), setEnvMap()

### Community 317 - "Community 317"
Cohesion: 0.33
Nodes (1): Assemble le jeu en un seul fichier HTML : dist/riposte-frontline.html three.js r

### Community 318 - "Community 318"
Cohesion: 0.33
Nodes (6): buildEnvCubes(), buildEnvironment(), fetchTexPack(), hdriFetch(), loadHDRIEnvironment(), setEnvMap()

### Community 319 - "Community 319"
Cohesion: 0.33
Nodes (6): classDetailHtml(), menuInit(), mountClassPicker(), mountOptions(), renderPicker(), thumbImg()

### Community 320 - "Community 320"
Cohesion: 0.53
Nodes (5): DECK_UI, deckCard(), deckDownload(), deckInit(), deckInstallFile()

### Community 321 - "Community 321"
Cohesion: 0.47
Nodes (4): ecoApply(), ecoAsk(), ecoBusy(), ecoClose()

### Community 322 - "Community 322"
Cohesion: 0.33
Nodes (1): nc

### Community 323 - "Community 323"
Cohesion: 0.53
Nodes (5): gray(), main(), norm(), Construit assets/arme/surface.webp : l'usure des armes, tirée de textures CC0 d', seamless()

### Community 324 - "Community 324"
Cohesion: 0.33
Nodes (1): nc

### Community 325 - "Community 325"
Cohesion: 0.33
Nodes (5): fs, { openGame }, path, [SW, SH], times

### Community 326 - "Community 326"
Cohesion: 0.33
Nodes (5): fs, { openGame }, path, SC, times

### Community 327 - "Community 327"
Cohesion: 0.33
Nodes (4): FLORE, MAPS, { openGame }, VUES

### Community 328 - "Community 328"
Cohesion: 0.40
Nodes (1): GUN_LOOK

### Community 329 - "Community 329"
Cohesion: 0.40
Nodes (1): GUN_LOOK

### Community 330 - "Community 330"
Cohesion: 0.40
Nodes (2): PAGE_LEAVE, PRE

### Community 331 - "Community 331"
Cohesion: 0.40
Nodes (1): GUN_LOOK

### Community 332 - "Community 332"
Cohesion: 0.40
Nodes (5): explode(), flashBang(), flashSeen(), nadeBurst(), smokeStart()

### Community 333 - "Community 333"
Cohesion: 0.40
Nodes (5): nadeHit(), nadeSoftAt(), tknifeDrop(), updateNades(), updateThrowKnives()

### Community 334 - "Community 334"
Cohesion: 0.40
Nodes (5): boardName(), endHead(), endRow(), fillEnd(), fillEndFfa()

### Community 335 - "Community 335"
Cohesion: 0.50
Nodes (5): menuCancelFlow(), menuLoadBack(), uiBack(), uiGo(), uiOpen()

### Community 336 - "Community 336"
Cohesion: 0.40
Nodes (1): MUS

### Community 337 - "Community 337"
Cohesion: 0.40
Nodes (1): EXRLoader

### Community 338 - "Community 338"
Cohesion: 0.60
Nodes (4): crop(), main(), Construit assets/tenue/ : les scans de tissu CC0 (Poly Haven) dont la matière de, webp()

### Community 339 - "Community 339"
Cohesion: 0.40
Nodes (1): EXRLoader

### Community 340 - "Community 340"
Cohesion: 0.40
Nodes (2): fails, { openGame }

### Community 341 - "Community 341"
Cohesion: 0.40
Nodes (2): fails, { openGame }

### Community 342 - "Community 342"
Cohesion: 0.40
Nodes (1): { openGame }

### Community 343 - "Community 343"
Cohesion: 0.40
Nodes (2): { openGame }, path

### Community 344 - "Community 344"
Cohesion: 0.40
Nodes (3): CASES, { openGame }, P0

### Community 345 - "Community 345"
Cohesion: 0.40
Nodes (4): fs, { openGame, HERE }, path, VUES

### Community 346 - "Community 346"
Cohesion: 0.40
Nodes (4): fs, names, { openGame, HERE }, path

### Community 347 - "Community 347"
Cohesion: 0.40
Nodes (4): fs, { openGame, HERE }, OUT, path

### Community 348 - "Community 348"
Cohesion: 0.50
Nodes (3): MP7_MAG, UMP_MAG, VEC_MAG

### Community 349 - "Community 349"
Cohesion: 0.67
Nodes (3): ATMO_MEU, build(), meuMapaLevel()

### Community 350 - "Community 350"
Cohesion: 0.50
Nodes (3): MP7_MAG, UMP_MAG, VEC_MAG

### Community 352 - "Community 352"
Cohesion: 0.50
Nodes (3): fs, path, ROOT

### Community 353 - "Community 353"
Cohesion: 0.50
Nodes (1): CLOTH_U

### Community 354 - "Community 354"
Cohesion: 0.50
Nodes (3): MP7_MAG, UMP_MAG, VEC_MAG

### Community 355 - "Community 355"
Cohesion: 0.50
Nodes (1): RECOIL

### Community 356 - "Community 356"
Cohesion: 0.50
Nodes (4): mechaCall(), mechaMark(), mechaSlant(), mnavSnap()

### Community 357 - "Community 357"
Cohesion: 0.67
Nodes (4): mnavBuild(), mnavClear(), mnavLink(), mnavZones()

### Community 358 - "Community 358"
Cohesion: 0.50
Nodes (4): gfxApply(), langApply(), syncOptions(), syncSettings()

### Community 359 - "Community 359"
Cohesion: 0.50
Nodes (1): LEGAL

### Community 360 - "Community 360"
Cohesion: 0.50
Nodes (1): Pass

### Community 361 - "Community 361"
Cohesion: 0.67
Nodes (3): cell(), main(), Construit assets/fx/usure.webp : la couche d'usure commune à toutes les matières

### Community 362 - "Community 362"
Cohesion: 0.50
Nodes (1): Pass

### Community 363 - "Community 363"
Cohesion: 0.50
Nodes (1): { openGame }

### Community 364 - "Community 364"
Cohesion: 0.50
Nodes (2): fails, { openGame }

### Community 365 - "Community 365"
Cohesion: 0.50
Nodes (1): { openGame }

### Community 366 - "Community 366"
Cohesion: 0.50
Nodes (2): fails, { openGame }

### Community 367 - "Community 367"
Cohesion: 0.50
Nodes (2): fails, { openGame }

### Community 368 - "Community 368"
Cohesion: 0.50
Nodes (2): fails, { openGame }

### Community 369 - "Community 369"
Cohesion: 0.50
Nodes (3): fs, { openGame, HERE }, path

### Community 370 - "Community 370"
Cohesion: 0.50
Nodes (3): fs, { openGame, HERE }, path

### Community 371 - "Community 371"
Cohesion: 0.50
Nodes (3): fs, { openGame, HERE }, path

### Community 372 - "Community 372"
Cohesion: 0.50
Nodes (2): { openGame }, path

### Community 373 - "Community 373"
Cohesion: 0.50
Nodes (3): fs, { openGame, HERE }, path

### Community 374 - "Community 374"
Cohesion: 0.67
Nodes (1): projUV()

### Community 375 - "Community 375"
Cohesion: 1.00
Nodes (3): buildFxTextures(), canvasTex(), flashTex()

### Community 376 - "Community 376"
Cohesion: 0.67
Nodes (3): csmMaterial(), csmSetup(), envCubeHook()

### Community 377 - "Community 377"
Cohesion: 1.00
Nodes (3): buildFxTextures(), canvasTex(), flashTex()

### Community 378 - "Community 378"
Cohesion: 0.67
Nodes (3): csmMaterial(), csmSetup(), envCubeHook()

### Community 379 - "Community 379"
Cohesion: 0.67
Nodes (1): projUV()

### Community 380 - "Community 380"
Cohesion: 1.00
Nodes (2): rankUpPrepare(), rankUpSound()

### Community 381 - "Community 381"
Cohesion: 0.67
Nodes (3): botsTick(), hostBgTick(), matchTick()

### Community 382 - "Community 382"
Cohesion: 0.67
Nodes (1): Construit assets/tex/ : textures CC0 (Poly Haven, ambientCG) redimensionnées en

### Community 383 - "Community 383"
Cohesion: 0.67
Nodes (1): Bibliothèques tierces servies par le site lui-même (plus de jsDelivr) : refait a

### Community 384 - "Community 384"
Cohesion: 1.00
Nodes (2): buildKnifeModel(), knifeBladeGeometry()

### Community 385 - "Community 385"
Cohesion: 1.00
Nodes (2): frameFgrip(), frameQ()

### Community 386 - "Community 386"
Cohesion: 1.00
Nodes (2): lHandFrame(), placeHands()

### Community 388 - "Community 388"
Cohesion: 1.00
Nodes (2): damp(), lerp()

### Community 389 - "Community 389"
Cohesion: 1.00
Nodes (2): makeNoise(), mulberry32()

### Community 390 - "Community 390"
Cohesion: 1.00
Nodes (2): smoothstep(), updatePostFx()

### Community 392 - "Community 392"
Cohesion: 1.00
Nodes (1): Signale les déclarations de premier niveau (const, let, class, function) en doub

### Community 396 - "Community 396"
Cohesion: 1.00
Nodes (2): damp(), lerp()

### Community 397 - "Community 397"
Cohesion: 1.00
Nodes (2): makeNoise(), mulberry32()

### Community 398 - "Community 398"
Cohesion: 1.00
Nodes (2): smoothstep(), updatePostFx()

### Community 399 - "Community 399"
Cohesion: 1.00
Nodes (2): hitSpheres(), rayEntities()

### Community 400 - "Community 400"
Cohesion: 1.00
Nodes (2): buildKnifeModel(), knifeBladeGeometry()

### Community 401 - "Community 401"
Cohesion: 1.00
Nodes (2): frameFgrip(), frameQ()

### Community 402 - "Community 402"
Cohesion: 1.00
Nodes (2): lHandFrame(), placeHands()

### Community 403 - "Community 403"
Cohesion: 1.00
Nodes (1): SKIN_UNIQUE

### Community 405 - "Community 405"
Cohesion: 1.00
Nodes (2): botArmForMap(), botPickCat()

### Community 406 - "Community 406"
Cohesion: 1.00
Nodes (2): fireRay(), propDamage()

## Knowledge Gaps
- **1843 isolated node(s):** `FILTRE_MOTS`, `FILTRE_SUB`, `WEAPON_CATS`, `SLOTS_BY_FAM`, `WEAPONS` (+1838 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 52`** (1 nodes): `ne`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 53`** (1 nodes): `ne`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 96`** (1 nodes): `oe`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 97`** (1 nodes): `oe`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 110`** (2 nodes): `getInput()`, `Qc`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 112`** (2 nodes): `getInput()`, `Qc`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 137`** (1 nodes): `te`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 138`** (1 nodes): `te`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 139`** (1 nodes): `Maker`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 142`** (1 nodes): `Maker`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 146`** (1 nodes): `We`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 148`** (1 nodes): `We`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 196`** (1 nodes): `Dc`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 197`** (1 nodes): `_l`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 198`** (1 nodes): `Dc`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 199`** (1 nodes): `_l`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 214`** (2 nodes): `Ga`, `Oa`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 215`** (2 nodes): `Ga`, `Oa`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 216`** (1 nodes): `Prefab`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 217`** (1 nodes): `Prefab`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 221`** (2 nodes): `ao`, `vo()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 222`** (1 nodes): `co`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 223`** (2 nodes): `ao`, `vo()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 224`** (1 nodes): `co`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 270`** (1 nodes): `ic`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 271`** (1 nodes): `ic`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 273`** (1 nodes): `LIGHT`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 286`** (2 nodes): `{ openGame }`, `path`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 303`** (2 nodes): `H`, `Contrôle de l'installeur Steam Deck (dist/deck/installer.sh, README « Steam Deck`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 308`** (2 nodes): `WIND_AMP`, `WIND_U`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 317`** (1 nodes): `Assemble le jeu en un seul fichier HTML : dist/riposte-frontline.html three.js r`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 322`** (1 nodes): `nc`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 324`** (1 nodes): `nc`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 328`** (1 nodes): `GUN_LOOK`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 329`** (1 nodes): `GUN_LOOK`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 330`** (2 nodes): `PAGE_LEAVE`, `PRE`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 331`** (1 nodes): `GUN_LOOK`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 336`** (1 nodes): `MUS`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 337`** (1 nodes): `EXRLoader`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 339`** (1 nodes): `EXRLoader`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 340`** (2 nodes): `fails`, `{ openGame }`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 341`** (2 nodes): `fails`, `{ openGame }`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 342`** (1 nodes): `{ openGame }`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 343`** (2 nodes): `{ openGame }`, `path`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 353`** (1 nodes): `CLOTH_U`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 355`** (1 nodes): `RECOIL`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 359`** (1 nodes): `LEGAL`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 360`** (1 nodes): `Pass`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 362`** (1 nodes): `Pass`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 363`** (1 nodes): `{ openGame }`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 364`** (2 nodes): `fails`, `{ openGame }`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 365`** (1 nodes): `{ openGame }`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 366`** (2 nodes): `fails`, `{ openGame }`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 367`** (2 nodes): `fails`, `{ openGame }`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 368`** (2 nodes): `fails`, `{ openGame }`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 372`** (2 nodes): `{ openGame }`, `path`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 374`** (1 nodes): `projUV()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 379`** (1 nodes): `projUV()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 380`** (2 nodes): `rankUpPrepare()`, `rankUpSound()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 382`** (1 nodes): `Construit assets/tex/ : textures CC0 (Poly Haven, ambientCG) redimensionnées en`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 383`** (1 nodes): `Bibliothèques tierces servies par le site lui-même (plus de jsDelivr) : refait a`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 384`** (2 nodes): `buildKnifeModel()`, `knifeBladeGeometry()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 385`** (2 nodes): `frameFgrip()`, `frameQ()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 386`** (2 nodes): `lHandFrame()`, `placeHands()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 388`** (2 nodes): `damp()`, `lerp()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 389`** (2 nodes): `makeNoise()`, `mulberry32()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 390`** (2 nodes): `smoothstep()`, `updatePostFx()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 392`** (1 nodes): `Signale les déclarations de premier niveau (const, let, class, function) en doub`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 396`** (2 nodes): `damp()`, `lerp()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 397`** (2 nodes): `makeNoise()`, `mulberry32()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 398`** (2 nodes): `smoothstep()`, `updatePostFx()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 399`** (2 nodes): `hitSpheres()`, `rayEntities()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 400`** (2 nodes): `buildKnifeModel()`, `knifeBladeGeometry()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 401`** (2 nodes): `frameFgrip()`, `frameQ()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 402`** (2 nodes): `lHandFrame()`, `placeHands()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 403`** (1 nodes): `SKIN_UNIQUE`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 405`** (2 nodes): `botArmForMap()`, `botPickCat()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 406`** (2 nodes): `fireRay()`, `propDamage()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `re` connect `Community 4` to `Community 1`, `Community 9`, `Community 11`, `Community 198`, `Community 130`, `Community 34`, `Community 113`, `Community 25`, `Community 16`, `Community 40`, `Community 148`, `Community 81`?**
  _High betweenness centrality (0.003) - this node is a cross-community bridge._
- **Why does `re` connect `Community 3` to `Community 0`, `Community 8`, `Community 10`, `Community 196`, `Community 129`, `Community 33`, `Community 111`, `Community 24`, `Community 14`, `Community 39`, `Community 146`, `Community 80`?**
  _High betweenness centrality (0.003) - this node is a cross-community bridge._
- **Why does `qt` connect `Community 15` to `Community 1`, `Community 34`, `Community 9`, `Community 11`, `Community 281`, `Community 113`, `Community 130`, `Community 31`, `Community 16`?**
  _High betweenness centrality (0.002) - this node is a cross-community bridge._
- **What connects `FILTRE_MOTS`, `FILTRE_SUB`, `WEAPON_CATS` to the rest of the system?**
  _1843 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.014972419227738377 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.014972419227738377 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.051893408134642355 - nodes in this community are weakly interconnected._