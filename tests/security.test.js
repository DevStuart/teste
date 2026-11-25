import test from 'node:test';
import assert from 'node:assert/strict';
import { hashPassword, recoveryHash, validatePassword, validateUsername, verifyPassword } from '../api/_lib/security.js';
import { HttpError } from '../api/_lib/http.js';

test('password hashes are salted and verify without storing plaintext', async () => {
  const encoded = await hashPassword('correct horse battery');
  assert.match(encoded, /^scrypt\$16384\$8\$1\$/);
  assert.notEqual(encoded, 'correct horse battery');
  assert.equal(await verifyPassword('correct horse battery', encoded), true);
  assert.equal(await verifyPassword('wrong password', encoded), false);
  assert.equal(await verifyPassword(undefined, encoded), false);
});

test('username normalization preserves the chosen nick while enforcing uniqueness key rules', () => {
  assert.deepEqual(validateUsername('Pilot_One'), { username: 'Pilot_One', usernameNorm: 'pilot_one' });
  for (const username of ['ab', 'has space', 'àbc', 'a'.repeat(17)]) {
    assert.throws(() => validateUsername(username), HttpError);
  }
});

test('recovery codes are normalized before hashing and passwords have bounded length', () => {
  assert.equal(recoveryHash('ABCD-EFGH'), recoveryHash('abcd efgh'));
  validatePassword('12345678');
  assert.throws(() => validatePassword('short'), HttpError);
  assert.throws(() => validatePassword('x'.repeat(129)), HttpError);
});
