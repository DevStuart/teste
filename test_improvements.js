// Teste de balanceamento de armas
const WEAPONS = require('../src/06i-armes.js');

function testWeaponBalance() {
  // Teste M4 vs AK-47
  const m4 = WEAPONS.m4;
  const ak47 = WEAPONS.ak47;
  
  console.log('=== M4 vs AK-47 ===');
  console.log('M4 dmg:', m4.dmg);
  console.log('AK-47 dmg:', ak47.dmg);
  console.log('M4 kick:', m4.recoil.kick);
  console.log('AK-47 kick:', ak47.recoil.kick);
  console.log('M4 recoil vertical:', m4.recoil.v);
  console.log('AK-47 recoil vertical:', ak47.recoil.v);
  
  // Teste MP5 vs UMP-45
  const mp5 = WEAPONS.mp5;
  const ump45 = WEAPONS.ump45;
  
  console.log('\n=== MP5 vs UMP-45 ===');
  console.log('MP5 dmg:', mp5.dmg);
  console.log('UMP-45 dmg:', ump45.dmg);
  console.log('MP5 recoil:', mp5.recoil);
  console.log('UMP-45 recoil:', ump45.recoil);
  
  // Verificação de balanceamento
  const m4Diff = Math.abs(m4.dmg[0] - ak47.dmg[0]);
  const akDiff = Math.abs(m4.dmg[0] - ak47.dmg[0]) / m4.dmg[0];
  
  if (akDiff > 0.2) {
    console.log('⚠️  AK-47 tem dano significativamente diferente de M4');
  }
  
  const mp5Diff = Math.abs(mp5.dmg[0] - ump45.dmg[0]) / ump45.dmg[0];
  if (mp5Diff > 0.15) {
    console.log('⚠️  MP5 e UMP-45 têm diferentes perfis de dano');
  }
}

testWeaponBalance();