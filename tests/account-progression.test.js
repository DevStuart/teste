import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const source = (path) => fileURLToPath(new URL(path, root));

test('account arsenal sync reads the saved snapshot before merging it', async () => {
  const client = await readFile(source('src/06r-arsenal.js'), 'utf8');

  assert.match(client, /const r = await acctApi\('arsenal'\);/);
  assert.match(client, /arsApply\(r\.data\.data, true\)/);
});

test('account arsenal snapshots include weapon, challenge, class, and outfit progress', async () => {
  const [client, classes, outfits] = await Promise.all([
    readFile(source('src/06r-arsenal.js'), 'utf8'),
    readFile(source('src/09e-menus.js'), 'utf8'),
    readFile(source('src/09u-tenues.js'), 'utf8'),
  ]);

  assert.match(client, /wxp: ARS\.wxp/);
  assert.match(client, /custom, ch: ARS\.ch, cm: ARS\.chMaps/);
  assert.match(client, /loadout: Settings\.loadout, skin: Settings\.skin/);
  assert.match(classes, /Settings\.loadout = i; saveSettings\(\); arsLoadoutEdit\(\)/);
  assert.match(outfits, /Settings\.skin = s; saveSettings\(\);\s*arsLoadoutEdit\(\)/);
});

test('account XP remains server-authoritative rather than client-supplied', async () => {
  const endpoint = await readFile(source('api/arsenal.js'), 'utf8');

  assert.match(endpoint, /delete data\.px/);
  assert.match(endpoint, /UPDATE accounts SET arsenal =/);
});
