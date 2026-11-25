import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateMatchXp, levelForXp, patentForLevel, xpForLevel } from '../api/_lib/progress.js';

test('level boundaries match the existing 1–100 XP curve', () => {
  for (let level = 1; level <= 100; level++) {
    const xp = xpForLevel(level);
    assert.equal(levelForXp(xp).level, level);
    if (level < 100) assert.equal(levelForXp(xpForLevel(level + 1) - 1).level, level);
  }
  assert.equal(levelForXp(xpForLevel(100) + 100000).level, 100);
});

test('patents cover every level and change at their defined thresholds', () => {
  assert.equal(patentForLevel(1).id, 'recruit');
  assert.equal(patentForLevel(5).id, 'recruit');
  assert.equal(patentForLevel(6).id, 'private');
  assert.equal(patentForLevel(91).id, 'marshal');
  assert.equal(patentForLevel(100).id, 'marshal');
});

test('match XP preserves the existing reward formula and halves solo awards', () => {
  const match = { kills: 4, headshots: 2, assists: 1, duration: 120, result: 'win' };
  assert.equal(calculateMatchXp({ ...match, online: true }), 540);
  assert.equal(calculateMatchXp({ ...match, online: false }), 270);
  assert.equal(calculateMatchXp({ ...match, online: true, duration: 29 }), 0);
  assert.equal(calculateMatchXp({ ...match, online: true, kills: 1000, headshots: 1000, assists: 1000, duration: 3600 }), 2500);
});
