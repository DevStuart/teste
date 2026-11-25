import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = new URL('../', import.meta.url);
const sourcePath = (path) => fileURLToPath(new URL(path, root));
const newWeaponIds = ['aug', 'p90', 'm249', 'g36c', 'mossberg590', 'falpara', 'glock17', 'arad'];

test('new weapons have complete catalog, progression, feel, and model entries', async () => {
  const catalogSource = await readFile(sourcePath('src/06i-armes.js'), 'utf8');
  const modelSource = (await Promise.all([
    readFile(sourcePath('src/06oa-modeles-pistolets.js'), 'utf8'),
    readFile(sourcePath('src/06z-modeles-nouveaux.js'), 'utf8'),
  ])).join('\n');
  const sandbox = { _t: (text) => text };
  vm.runInNewContext(`${catalogSource}\nglobalThis.catalog = { WEAPONS, FEEL };`, sandbox);

  for (const id of newWeaponIds) {
    const weapon = sandbox.catalog.WEAPONS[id];
    assert.ok(weapon, `${id} must be present in WEAPONS`);
    assert.ok(sandbox.catalog.FEEL[id], `${id} must have a feel profile`);
    assert.equal(weapon.id, id);
    assert.ok(weapon.name);
    assert.ok(weapon.desc);
    assert.ok(weapon.model);
    assert.ok(weapon.sound);
    assert.ok(weapon.mag > 0);
    assert.ok(weapon.reserve >= weapon.mag);
    assert.ok(weapon.unlock.level > 0);
    assert.ok(sandbox.catalog.WEAPONS[weapon.unlock.from], `${id} unlock source must exist`);
    assert.match(modelSource, new RegExp(`defineGun\\('${id}',`), `${id} must be registered as a model`);
  }

  const dedicatedBuilderIds = newWeaponIds.filter((id) => id !== 'glock17');
  const builders = dedicatedBuilderIds.map((id) => {
    const registration = modelSource.match(new RegExp(`defineGun\\('${id}',\\s*'[^']+',\\s*(\\w+)\\)`));
    assert.ok(registration, `${id} must use a dedicated model builder`);
    return registration[1];
  });
  assert.equal(new Set(builders).size, dedicatedBuilderIds.length, 'each new long gun must have its own model builder');
});
